import * as path from 'path';
import { DEFAULT_CONFIG, ZettelkastenConfig } from './config';
import {
  GetNoteParams,
  GetNotesParams,
  GetRecommendationsParams,
  SimpleNote,
  getGroups,
  getNote,
  getNotes,
  getRecommendations,
  getTags,
  normalizeNotes,
  readAllMarkdownFilesFromDir,
  readMarkdownFile,
  saveNote,
} from './notes';
import { getFlashcardFromConfig } from './flashcard';
import { getGraphData } from './graph';

export class Zettelkasten {
  private _config: ZettelkastenConfig;

  constructor(config: ZettelkastenConfig) {
    this._config = { ...DEFAULT_CONFIG, ...config };

    /**
     * Resolve the notesDir to an absolute path.
     */
    this._config.notesDir = path.resolve(process.cwd(), this._config.notesDir);

    this.init();
  }

  private async init() {
    if (this.config.normalizeOnInit) {
      await this.normalizeNotes();
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

  public async getNotes(params?: GetNotesParams) {
    return getNotes(this.config, params);
  }

  public async getNote(params: GetNoteParams) {
    return getNote(this.config, params);
  }

  public async getTags(params?: GetNotesParams) {
    return getTags(this.config, params);
  }

  public async saveNote(note: SimpleNote) {
    return saveNote(this.config, note);
  }

  public async normalizeNotes() {
    return normalizeNotes(this.config);
  }

  public async getRecommendations(params?: GetRecommendationsParams) {
    return getRecommendations(this.config, params);
  }

  public async getFlashcard() {
    return getFlashcardFromConfig(this.config);
  }

  public async getGraphData() {
    return getGraphData(this.config);
  }
}
