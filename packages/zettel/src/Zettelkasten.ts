import { DEFAULT_CONFIG, ZettelkastenConfig } from './config';
import {
  GetPostParams,
  GetPostsParams,
  GetRecommendationsParams,
  SimplePost,
  getGroups,
  getPost,
  getPosts,
  getRecommendations,
  getTags,
  normalizePosts,
  readAllMarkdownFilesFromDir,
  readMarkdownFile,
  savePost,
} from './files';
import { getFlashcardFromConfig } from './flashcard';
import { getGraph } from './graph';

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
    return getFlashcardFromConfig(this.config);
  }

  public async getGraph() {
    return getGraph(this.config);
  }
}
