import * as fs from 'fs';
import * as path from 'path';
import { normalizeTags } from './normalizeTags';
import { titleCase } from 'title-case';
import matter from 'gray-matter';

export type ZettelkastenConfig = {
  postsDir: string;
  ignoreGroups?: string[];
  requiredMetadata?: string[];
  normalizeOnInit?: boolean;
  recommendationsLimit?: number;
};

export const DEFAULT_CONFIG: Partial<ZettelkastenConfig> = {
  requiredMetadata: ['title', 'date', 'excerpt'],
  normalizeOnInit: true,
  recommendationsLimit: 5,
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
  tags?: string[];
  content?: string;
  book?: Book;
  [key: string]: any;
};

type SimplePost = PostMetadata & {
  content: string;
};

/**
 * Groups are all folders in the postsDir directory.
 */
const getGroups = (config: ZettelkastenConfig) => {
  const groups = fs.readdirSync(config.postsDir);

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

  const promises = files.map(async (slug) => {
    const filePath = path.join(dir, slug);

    const markdown = await readMarkdownFile(filePath);

    if (markdown?.data) {
      markdown.data.slug = slug.replace('.md', '');
    }

    return markdown;
  });

  const markdowns = await Promise.all(promises);

  return markdowns.filter(
    (markdown): markdown is MarkdownFile => markdown !== undefined
  );
};

const readAllMarkdownFiles = async (config: ZettelkastenConfig) => {
  const groups = getGroups(config);

  const promises = groups.map(async (group) => {
    const groupDir = path.join(config.postsDir, group);

    const markdowns = await readAllMarkdownFilesFromDir(groupDir);

    markdowns.forEach((markdown) => (markdown.data.group = group));

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
    id: `${data.group}/${data.slug}`,
    content,
  };

  post.id = post.id || `${post.group}/${post.slug}`;

  post.title = post.title || titleCase(post.slug);

  post.tags = normalizeTags(post.tags);

  post.draft = (() => {
    /**
     * If draft is explicitly set to true, then return true.
     */
    if (typeof post.draft === 'boolean' && post.draft === true) {
      return true;
    }

    const hasAllRequiredMetadata = config.requiredMetadata?.every(
      (key) => key in post
    );

    /**
     * If draft is explicitly set to false, but the post is missing required
     * metadata, then return false.
     */
    if (!hasAllRequiredMetadata && post.draft === false) {
      return false;
    }

    return !hasAllRequiredMetadata;
  })();

  return post;
};

const getAllSimplePosts = async (config: ZettelkastenConfig) => {
  const markdowns = await readAllMarkdownFiles(config);

  const posts = markdowns.map((markdown) =>
    getSimplePostFromMarkdownFile(config, markdown)
  );

  return posts;
};

type GetPostsParams = {
  groups?: string | string[];
  drafts?: boolean;
};

/**
 * Add new metadata to posts, like references and backlinks.
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
      if (!params) {
        return true;
      }

      if (params.groups) {
        const groups = Array.isArray(params.groups)
          ? params.groups
          : [params.groups];

        return groups.includes(post.group);
      }

      if (!params.drafts) {
        if (post.draft) {
          return false;
        }
      }

      return true;
    })
    .map((post) => {
      const href = `/${post.group}/${post.slug}`;
      return { ...post, href };
    })
    .map((post, _, allPosts) => {
      /**
       * Array of all post ids that `post` use as references.
       */
      const references = allPosts.reduce((acc, { id, href }) => {
        if (post.content.includes(`(${href})`)) {
          return [id, ...acc];
        }

        return acc;
      }, [] as string[]);

      /**
       * Add backlinks to post. Backlinks are all posts that
       * reference current `post`.
       */
      const backlinks = allPosts
        .filter(({ content }) => content.includes(`(${post.href})`))
        .map(({ id }) => id as string);

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
    return allPosts.find((post) => post.id === params.id);
  }

  if ('title' in params) {
    return allPosts.find((post) => post.title === params.title);
  }

  const post = allPosts.find(
    (post) => post.group === params.group && post.slug === params.slug
  );

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
    scoreMap[reference] += 6;
  });

  /**
   * All posts that reference the current post scores.
   */
  post?.backlinks.forEach((backlink) => {
    scoreMap[backlink] += 3;
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
      const post = allPosts.find((post) => post.id === id);
      return { post, score };
    })
    .filter(({ score }) => score > 0)
    .sort(({ score: scoreA }, { score: scoreB }) => {
      return scoreB - scoreA;
    })
    .map(({ post }) => post)
    .filter((post): post is PostWithoutRecommendations => !!post)
    .map((post) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { content, ...metadata } = post;
      return metadata as PostMetadata;
    })
    /**
     * Remove itself from recommendations.
     */
    .filter(({ href }) => href !== post?.href)
    .slice(0, config.recommendationsLimit)
    .map((recommendation) => {
      /**
       * Check if the recommendation is referenced by the current post.
       */
      const isReference = post?.references.includes(recommendation.id);

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

type Post = ThenArg<ReturnType<typeof getPosts>>[number];

const getPost = async (
  config: ZettelkastenConfig,
  params: GetPostParams
): Promise<Post | undefined> => {
  const allPosts = await getPosts(config);

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
  const md = matter.stringify(content || '', metadata);
  return await fs.promises.writeFile(filePath, md);
};

const getTags = async (config: ZettelkastenConfig) => {
  const posts = await getPosts(config);

  const tags = posts
    .flatMap((post) => post.tags)
    /**
     * Remove duplicates.
     */
    .filter((tag, index, arr) => arr.indexOf(tag) === index)
    .filter((tag): tag is string => tag !== undefined)
    .sort((tagA, tagB) => tagA.localeCompare(tagB));

  return tags;
};

const normalizeAndSavePosts = async (config: ZettelkastenConfig) => {
  const [allPosts, allTags] = await Promise.all([
    getAllSimplePosts(config),
    getTags(config),
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

  const promises = allPosts.map((post) => savePost(config, post));

  await Promise.all(promises);
};

type GetRecommendationsParams = {
  group?: string;
  tag?: string;
  limit?: boolean;
};

/**
 * Group or tags recommendations.
 */
const getRecommendations = async (
  config: ZettelkastenConfig,
  params: GetRecommendationsParams
) => {
  const { tag, group } = params;

  const allRecommendations = await (async () => {
    /**
     * Tag recommendations.
     */
    if (tag) {
      const allPosts = await getPosts(config);
      return allPosts.filter(({ tags }) => (tags || []).includes(tag));
    }

    /**
     * Group recommendations.
     */
    if (group) {
      return getPosts(config, { groups: [group] });
    }

    return getPosts(config);
  })();

  const limit = params.limit ? config.recommendationsLimit : undefined;

  const recommendations = allRecommendations
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(({ content, ...metadata }) => metadata)
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

export class Zettelkasten {
  private _config: ZettelkastenConfig;

  constructor(config: ZettelkastenConfig) {
    this._config = { ...DEFAULT_CONFIG, ...config };
    this.init();
  }

  private async init() {
    if (this.config.normalizeOnInit) {
      await this.normalizeAndSavePosts();
    }
  }

  get config() {
    return this._config;
  }

  public getGroups() {
    return getGroups(this.config);
  }

  public async getPosts(params?: GetPostsParams) {
    return getPosts(this.config, params);
  }

  public async getPost(params: GetPostParams) {
    return getPost(this.config, params);
  }

  public async getTags() {
    return getTags(this.config);
  }

  public async savePost(post: SimplePost) {
    return savePost(this.config, post);
  }

  public async normalizeAndSavePosts() {
    return normalizeAndSavePosts(this.config);
  }

  public async getRecommendations(params: GetRecommendationsParams) {
    return getRecommendations(this.config, params);
  }
}
