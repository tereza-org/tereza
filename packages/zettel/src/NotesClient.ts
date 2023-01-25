export type MarkdownFile = {
  data: {
    [key: string]: any;
  };
  content: string;
};

export type NotesClient = {
  readMarkdownFile: (filePath: string) => Promise<MarkdownFile | undefined>;
  readAllMarkdownFilesFromDirectory: (dir: string) => Promise<MarkdownFile[]>;
  getDirectories: (dir: string) => Promise<string[]>;
  writeMarkdownFile: (
    filePath: string,
    markdown: MarkdownFile
  ) => Promise<void>;
};
