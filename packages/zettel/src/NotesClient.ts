export type MarkdownFile = {
  data: {
    [key: string]: any;
  };
  content: string;
};

export type NotesClient = {
  /**
   * It should return `slug` for each note.
   * @param dir
   * @returns
   */
  readAllMarkdownFilesFromDirectory: (dir: string) => Promise<MarkdownFile[]>;
  getDirectories: (dir: string) => Promise<string[]>;
  writeMarkdownFile: (
    filePath: string,
    markdown: MarkdownFile
  ) => Promise<void>;
};
