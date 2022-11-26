type ZettelkastenConfig = {
  postsDir: string;
};

export class Zettelkasten {
  private postsDir: string;

  constructor(config: ZettelkastenConfig) {
    this.postsDir = config.postsDir;
  }
}
