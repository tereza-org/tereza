import * as dateFns from 'date-fns';
import * as flashcardModule from './flashcard';
import * as fs from 'fs';
import * as path from 'path';
import { normalizeTags } from './normalizeTags';
import { sortObjectByKey } from './sortObjectByKey';
import { titleCase } from 'title-case';
import matter from 'gray-matter';
import readingTime from 'reading-time';

export type ZettelkastenConfig = {
  postsDir: string;
  ignoreGroups?: string[];
  requiredMetadata?: string[];
  normalizeOnInit?: boolean;
  recommendationsLimit?: number;
  /**
   * https://date-fns.org/v2.29.3/docs/format
   */
  dateFormat?: string;
};

export const DEFAULT_CONFIG = {
  requiredMetadata: ['title', 'date', 'excerpt'],
  normalizeOnInit: false,
  recommendationsLimit: 5,
  dateFormat: 'PPP',
};

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

export type Book = {
  authors: string[];
  link: string;
  image?: string;
  ASIN?: string;
  ISBN?: string;
};

export type PostMetadata = {
  group: string;
  slug: string;
  id: string;
  title?: string;
  excerpt?: string;
  draft?: boolean;
  date?: string;
  tags: string[];
  book?: Book;
  [key: string]: any;
};

const metadataSortOrder = [
  'title',
  'id',
  'group',
  'slug',
  'draft',
  'date',
  'excerpt',
  'tags',
  'book',
];

type SimplePost = PostMetadata & {
  content: string;
};

const getDirectories = async (dir: string) => {
  return (await fs.promises.readdir(dir, { withFileTypes: true }))
    .filter((dirent) => {
      return dirent.isDirectory();
    })
    .map((dirent) => {
      return dirent.name;
    });
};

/**
 * Groups are all folders in the postsDir directory.
 */
const getGroups = async (config: ZettelkastenConfig) => {
  const groups = [
    '/',
    ...(await getDirectories(config.postsDir)).map((group) => {
      return `/${group}`;
    }),
  ];

  return groups.filter((group) => {
    if (config.ignoreGroups) {
      return !config.ignoreGroups.includes(group);
    }

    return true;
  });
};

type MarkdownFile = {
  data: {
    [key: string]: any;
  };
  content: string;
};

const readMarkdownFile = async (
  filePath: string
): Promise<MarkdownFile | undefined> => {
  try {
    const fileContents = await fs.promises.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    return { data, content };
  } catch (err) {
    return undefined;
  }
};

const readAllMarkdownFilesFromDir = async (dir: string) => {
  const files = await fs.promises.readdir(dir);

  const promises = files
    .filter((filename) => {
      return filename.endsWith('.md');
    })
    .map(async (filename) => {
      const filePath = path.join(dir, filename);

      const markdown = await readMarkdownFile(filePath);

      if (markdown?.data) {
        markdown.data.slug = filename.replace('.md', '');
      }

      return markdown;
    });

  const markdowns = await Promise.all(promises);

  return markdowns.filter((markdown): markdown is MarkdownFile => {
    return markdown !== undefined;
  });
};

const readAllMarkdownFiles = async (config: ZettelkastenConfig) => {
  const groups = await getGroups(config);

  const promises = groups.map(async (group) => {
    const groupDir = path.join(config.postsDir, group);

    const markdowns = await readAllMarkdownFilesFromDir(groupDir);

    markdowns.forEach((markdown) => {
      return (markdown.data.group = group);
    });

    return markdowns;
  });

  const allMarkdowns = (await Promise.all(promises)).flat();

  return allMarkdowns;
};

const getSimplePostFromMarkdownFile = (
  config: ZettelkastenConfig,
  markdownFile: MarkdownFile
): SimplePost => {
  const { data, content } = markdownFile;

  const post: SimplePost = {
    ...data,
    group: data.group,
    slug: data.slug,
    content,
  } as SimplePost;

  post.title = post.title || titleCase(post.slug);

  post.id = post.id || path.join(post.group, post.slug);

  const date = (() => {
    if (post.date) {
      const d = new Date(post.date);
      return dateFns.addMinutes(d, d.getTimezoneOffset());
    }

    return undefined;
  })();

  if (date) {
    post.date = dateFns.format(date, 'yyyy-MM-dd');
    post.formattedDate = dateFns.format(
      date,
      config.dateFormat || DEFAULT_CONFIG.dateFormat
    );
  }

  post.tags = normalizeTags(post.tags);

  post.draft = (() => {
    /**
     * If draft is explicitly set to true, then return true.
     */
    if (typeof post.draft === 'boolean' && post.draft === true) {
      return true;
    }

    if (!post.content) {
      return true;
    }

    const hasAllRequiredMetadata = config.requiredMetadata?.every((key) => {
      return key in post;
    });

    /**
     * Even ff draft is explicitly set to false, but the post is missing
     * required metadata, then return false.
     */
    return !hasAllRequiredMetadata;
  })();

  return post;
};

/**
 * Get all posts including drafts.
 */
const getAllSimplePosts = async (config: ZettelkastenConfig) => {
  const markdowns = await readAllMarkdownFiles(config);

  const posts = markdowns.map((markdown) => {
    return getSimplePostFromMarkdownFile(config, markdown);
  });

  return posts;
};

type GetPostsParams = {
  groups?: string | string[];
  includeDrafts?: boolean;
};

const removeContent = (post: SimplePost): PostMetadata => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { content, ...rest } = post;
  return rest;
};

/**
 * Add new metadata to posts, like references and backlinks
 * and apply draft rules.
 */
const getPostsWithoutRecommendations = async (
  config: ZettelkastenConfig,
  params?: GetPostsParams
) => {
  const allSimplePosts = await getAllSimplePosts(config);

  const allPostsWithFullMetadata = allSimplePosts
    /**
     * All posts with drafts rules applied.
     */
    .filter((post) => {
      const { groups = [], includeDrafts = false } = params || {};

      const finalGroups = Array.isArray(groups) ? groups : [groups];

      /**
       * Filter out posts that are not in the specified groups.
       */
      if (finalGroups.length > 0 && !finalGroups.includes(post.group)) {
        return false;
      }

      /**
       * Filter out drafts if includeDrafts is false.
       */
      if (!includeDrafts && post.draft) {
        return false;
      }

      return true;
    })
    .map((post) => {
      return {
        ...post,
        href: post.id,
        formattedDate: post.formattedDate as string | undefined,
        readingTime: Math.round(readingTime(post.content).minutes) || 1,
      };
    })
    .map((post, _, allPosts) => {
      /**
       * Array of all post ids that `post` use as references.
       */
      const references = allPosts.reduce((acc, recommendation) => {
        if (post.content.includes(`(${recommendation.href})`)) {
          return [removeContent(recommendation), ...acc];
        }

        return acc;
      }, [] as PostMetadata[]);

      /**
       * Add backlinks to post. Backlinks are all posts that
       * reference current `post`.
       */
      const backlinks = allPosts
        .filter(({ content }) => {
          return content.includes(`(${post.href})`);
        })
        .map((post) => {
          return removeContent(post);
        });

      return { ...post, references, backlinks };
    });

  return allPostsWithFullMetadata;
};

type PostWithoutRecommendations = ThenArg<
  ReturnType<typeof getPostsWithoutRecommendations>
>[number];

type GetPostParams =
  | {
      group: string;
      slug: string;
    }
  | { id: string }
  | { title: string };

const filterPostFromPostsArray = <P extends SimplePost>(
  allPosts: P[],
  params: GetPostParams
): P | undefined => {
  if ('id' in params) {
    return allPosts.find((post) => {
      return post.id === params.id;
    });
  }

  if ('title' in params) {
    return allPosts.find((post) => {
      return post.title === params.title;
    });
  }

  const post = allPosts.find((post) => {
    return post.group === params.group && post.slug === params.slug;
  });

  return post;
};

const getPostRecommendations = async (
  config: ZettelkastenConfig,
  params: GetPostParams
): Promise<PostMetadata[]> => {
  const allPosts = await getPostsWithoutRecommendations(config);

  const post = filterPostFromPostsArray(allPosts, params);

  const scoreMap = allPosts.reduce<{ [key: string]: number }>((acc, { id }) => {
    acc[id] = 0;
    return acc;
  }, {});

  /**
   * All posts that the current post references scores.
   */
  post?.references.forEach((reference) => {
    scoreMap[reference.id] += 6;
  });

  /**
   * All posts that reference the current post scores.
   */
  post?.backlinks.forEach((backlink) => {
    scoreMap[backlink.id] += 3;
  });

  /**
   * All posts that have the same tags as the current post scores.
   */
  post?.tags?.forEach((tag) => {
    allPosts.forEach(({ tags, id }) => {
      if (tags?.includes(tag)) {
        scoreMap[id] += 1;
      }
    });
  });

  const recommendations = Object.entries(scoreMap)
    .map(([id, score]) => {
      const post = allPosts.find((post) => {
        return post.id === id;
      });
      return { post, score };
    })
    .filter(({ score }) => {
      return score > 0;
    })
    .sort(({ score: scoreA }, { score: scoreB }) => {
      return scoreB - scoreA;
    })
    .map(({ post }) => {
      return post;
    })
    .filter((post): post is PostWithoutRecommendations => {
      return !!post;
    })
    .map((post) => {
      return removeContent(post);
    })
    /**
     * Remove itself from recommendations.
     */
    .filter(({ href }) => {
      return href !== post?.href;
    })
    .slice(0, config.recommendationsLimit)
    .map((recommendation) => {
      /**
       * Check if the recommendation is referenced by the current post.
       */
      const isReference = post?.references.find((reference) => {
        return reference.id === recommendation.id;
      });
      return { ...recommendation, isReference };
    });

  return recommendations;
};

const getPosts = async (
  config: ZettelkastenConfig,
  params?: GetPostsParams
) => {
  const posts = await getPostsWithoutRecommendations(config, params);

  const postsWithRecommendations = await Promise.all(
    posts.map(async (post) => {
      const recommendations = await getPostRecommendations(config, {
        id: post.id,
      });

      return { ...post, recommendations };
    })
  );

  return postsWithRecommendations;
};

export type Post = ThenArg<ReturnType<typeof getPosts>>[number];

const getPost = async (
  config: ZettelkastenConfig,
  params: GetPostParams
): Promise<Post | undefined> => {
  const allPosts = await getPosts(config, { includeDrafts: true });
  const post = filterPostFromPostsArray(allPosts, params);
  return post;
};

/**
 * Save post as markdown file.
 */
const savePost = async (
  config: ZettelkastenConfig,
  post: SimplePost
): Promise<void> => {
  const { content, ...metadata } = post;
  const filePath = path.join(config.postsDir, post.group, `${post.slug}.md`);
  const md = matter.stringify(
    content || '',
    sortObjectByKey(metadata, metadataSortOrder)
  );
  return await fs.promises.writeFile(filePath, md);
};

const getTags = async (config: ZettelkastenConfig, params?: GetPostsParams) => {
  const posts = await getPosts(config, params);

  const tags = posts
    .flatMap((post) => {
      return post.tags;
    })
    /**
     * Remove duplicates.
     */
    .filter((tag, index, arr) => {
      return arr.indexOf(tag) === index;
    })
    .filter((tag): tag is string => {
      return tag !== undefined;
    })
    .sort((tagA, tagB) => {
      return tagA.localeCompare(tagB);
    });

  return tags;
};

const normalizePosts = async (config: ZettelkastenConfig) => {
  const [allPosts, allTags] = await Promise.all([
    getAllSimplePosts(config),
    getTags(config, { includeDrafts: true }),
  ]);

  /**
   * Normalize the set of tags: if another post has a tag that is the same as
   * current post slug, then add the tag to the current post.
   */
  allPosts.forEach((post) => {
    const doAllTagsContainsPostSlug = allTags.includes(post.slug);

    if (doAllTagsContainsPostSlug) {
      post.tags = normalizeTags([...(post.tags || []), post.slug]);
    }
  });

  const promises = allPosts.map((post) => {
    return savePost(config, post);
  });

  await Promise.all(promises);
};

export type GetRecommendationsParams = {
  group?: string;
  tag?: string;
  limit?: boolean;
};

/**
 * Group or tags recommendations.
 */
const getRecommendations = async (
  config: ZettelkastenConfig,
  params?: GetRecommendationsParams
) => {
  const { tag, group } = params || {};

  const allRecommendations = await (async () => {
    /**
     * Tag recommendations.
     */
    if (tag) {
      const allPosts = await getPosts(config);
      return allPosts.filter(({ tags }) => {
        return (tags || []).includes(tag);
      });
    }

    /**
     * Group recommendations.
     */
    if (group) {
      return getPosts(config, { groups: [group] });
    }

    return getPosts(config);
  })();

  const limit = params?.limit ? config.recommendationsLimit : undefined;

  const recommendations = allRecommendations
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(({ content, ...metadata }) => {
      return metadata;
    })
    .slice(0, limit)
    /**
     * Sort by date.
     */
    .sort((postA, postB) => {
      if (!postA.date || !postB.date) {
        return 0;
      }

      return postA?.date > postB?.date ? -1 : 1;
    });

  return recommendations;
};

interface PostWithDate extends Post {
  date: string;
}

const getFlashcard = async (config: ZettelkastenConfig) => {
  const posts = (await getPosts(config)).filter(
    (post): post is PostWithDate => {
      return !!post.date;
    }
  );

  return flashcardModule.getFlashcard(posts);
};

export class Zettelkasten {
  private _config: ZettelkastenConfig;

  constructor(config: ZettelkastenConfig) {
    this._config = { ...DEFAULT_CONFIG, ...config };
    this.init();
  }

  private async init() {
    if (this.config.normalizeOnInit) {
      await this.normalizePosts();
    }
  }

  get config() {
    return this._config;
  }

  static readMarkdownFile = readMarkdownFile;

  static readAllMarkdownFilesFromDir = readAllMarkdownFilesFromDir;

  public async getGroups() {
    return getGroups(this.config);
  }

  public async getPosts(params?: GetPostsParams) {
    return getPosts(this.config, params);
  }

  public async getPost(params: GetPostParams) {
    return getPost(this.config, params);
  }

  public async getTags(params?: GetPostsParams) {
    return getTags(this.config, params);
  }

  public async savePost(post: SimplePost) {
    return savePost(this.config, post);
  }

  public async normalizePosts() {
    return normalizePosts(this.config);
  }

  public async getRecommendations(params?: GetRecommendationsParams) {
    return getRecommendations(this.config, params);
  }

  public async getFlashcard() {
    return getFlashcard(this.config);
  }
}
