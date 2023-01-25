import * as fs from 'fs';
import * as path from 'path';
import { MarkdownFile, NotesClient } from './NotesClient';
import matter from 'gray-matter';

const getDirectories = async (dir: string) => {
  const directories = (await fs.promises.readdir(dir, { withFileTypes: true }))
    .filter((dirent) => {
      return dirent.isDirectory();
    })
    .map((dirent) => {
      return dirent.name;
    });

  return directories;
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

const readAllMarkdownFilesFromDirectory = async (dir: string) => {
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

  const markdowns = (await Promise.all(promises)).filter(
    (markdown): markdown is MarkdownFile => {
      return markdown !== undefined;
    }
  );

  return markdowns;
};

const writeMarkdownFile = async (filePath: string, markdown: MarkdownFile) => {
  const fileContents = matter.stringify(markdown.content, markdown.data);
  await fs.promises.writeFile(filePath, fileContents);
};

export const fsNotesClient: NotesClient = {
  readMarkdownFile,
  readAllMarkdownFilesFromDirectory,
  getDirectories,
  writeMarkdownFile,
};
