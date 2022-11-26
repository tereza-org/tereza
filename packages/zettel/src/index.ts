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
};

export const DEFAULT_CONFIG: Partial<ZettelkastenConfig> = {
  requiredMetadata: ['title', 'date', 'excerpt'],
  normalizeOnInit: true,
};

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
  id?: string;
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
const getPosts = async (
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
        if (!id) {
          return acc;
        }

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
        .map(({ id }) => id);

      return { ...post, references, backlinks };
    });

  return allPostsWithFullMetadata;
};

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

/**
 * GroupPosts when read from markdown file. It doesn't have backlinks and
 * references, for example.
 */
type Post = ThenArg<ReturnType<typeof getPosts>>[number];

type GetPostParams =
  | {
      group: string;
      slug: string;
    }
  | { id: string }
  | { title: string };

const getPost = async (
  config: ZettelkastenConfig,
  params: GetPostParams
): Promise<Post | undefined> => {
  const allPosts = await getPosts(config);

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

// const getRecommendations = async (
//   config: ZettelkastenConfig,
//   params: GetPostParams
// ): Promise<PostMetadata> => {
//   const [post, allPosts] = await Promise.all([
//     getPost(config, params),
//     getPosts(config),
//   ]);

//   const scoreMap = allPosts.reduce<{ [key: string]: number }>((acc, { id }) => {
//     acc[id] = 0;
//     return acc;
//   }, {});

//   post?.references.forEach((reference) => {
//     scoreMap[reference] += 6;
//   });

//   post?.backlinks.forEach((backlink) => {
//     scoreMap[backlink.id] += 3;
//   });

//   post?.tags.forEach((tag) => {
//     allPosts.forEach(({ tags, href }) => {
//       if (tags.includes(tag)) {
//         scoreMap[href] += 1;
//       }
//     });
//   });
// };

export class Zettelkasten {
  private config: ZettelkastenConfig;

  constructor(config: ZettelkastenConfig) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.init();
  }

  private async init() {
    if (this.config.normalizeOnInit) {
      await this.normalizeAndSavePosts();
    }
  }

  public getConfig() {
    return this.config;
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
}
