import * as fs from 'fs';
import * as path from 'path';
import { normalizeTags } from './normalizeTags';
import { titleCase } from 'title-case';
import matter from 'gray-matter';

export type Book = {
  authors: string[];
  link: string;
  image?: string;
  ASIN?: string;
  ISBN?: string;
};

type SimplePost = {
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
};

/**
 * Groups are all folders in the postsDir directory.
 */
const getGroups = (postsDir: string) => {
  const groups = fs.readdirSync(postsDir);
  return groups;
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

const readAllMarkdownFiles = async (postsDir: string) => {
  const groups = getGroups(postsDir);
  const promises = groups.map(async (group) => {
    const groupDir = path.join(postsDir, group);
    const markdowns = await readAllMarkdownFilesFromDir(groupDir);
    markdowns.forEach((markdown) => (markdown.data.group = group));
    return markdowns;
  });
  const allMarkdowns = (await Promise.all(promises)).flat();
  return allMarkdowns;
};

const getSimplePostFromMarkdownFile = (
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

  post.title = post.title || titleCase(post.slug);

  post.tags = normalizeTags(post.tags);

  return post;
};

const getAllSimplePosts = async (postsDir: string) => {
  const markdowns = await readAllMarkdownFiles(postsDir);
  const posts = markdowns.map(getSimplePostFromMarkdownFile);
  return posts;
};

/**
 * Add new metadata to posts, like references and backlinks.
 */
const getAllPosts = async (postsDir: string) => {
  const allPosts = await getAllSimplePosts(postsDir);

  const posts = allPosts.map((post) => {
    return {
      ...post,
      references: [],
      backlinks: [],
    };
  });

  return posts;
};

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

/**
 * GroupPosts when read from markdown file. It doesn't have backlinks and
 * references, for example.
 */
type Post = ThenArg<ReturnType<typeof getAllPosts>>[number];

type GetPostParams =
  | {
      group: string;
      slug: string;
    }
  | { id: string }
  | { title: string };

const getPost = async (
  params: GetPostParams,
  postsDir: string
): Promise<Post | undefined> => {
  const allPosts = await getAllPosts(postsDir);

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

const getTags = async (postsDir: string) => {
  const posts = await getAllPosts(postsDir);

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

export type ZettelkastenConfig = {
  postsDir: string;
};

export class Zettelkasten {
  private postsDir: string;

  constructor(config: ZettelkastenConfig) {
    this.postsDir = config.postsDir;
  }

  public getPostsDir() {
    return this.postsDir;
  }

  public getGroups() {
    return getGroups(this.postsDir);
  }

  public async getPosts() {
    return getAllPosts(this.postsDir);
  }

  public async getPost(params: GetPostParams) {
    return await getPost(params, this.postsDir);
  }

  public async getTags() {
    return await getTags(this.postsDir);
  }
}
