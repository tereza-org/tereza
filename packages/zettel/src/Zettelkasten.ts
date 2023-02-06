import { DEFAULT_CONFIG, ZettelkastenConfig } from './config';
import {
  GetNoteParams,
  GetNotesParams,
  GetRecommendationsParams,
  SaveNoteNote,
  deleteNote,
  getGroups,
  getNote,
  getNotes,
  getRecommendations,
  getTags,
  normalizeNotes,
  saveNote,
} from './notes';
import { getFlashcardFromConfig } from './flashcard';
import { getGraphData } from './knowledgeGraph';

/**
 * https://stackoverflow.com/a/61108377/8786986
 */
type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export class Zettelkasten {
  private _config: ZettelkastenConfig;

  constructor(config: Optional<ZettelkastenConfig, 'notesClient'>) {
    this._config = { ...DEFAULT_CONFIG, ...config };

    this.init();
  }

  private init() {
    if (this.config.normalizeOnInit) {
      this.normalizeNotes();
    }
  }

  get config() {
    return this._config;
  }

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

  public async saveNote(note: SaveNoteNote) {
    return saveNote(this.config, note);
  }

  public async deleteNote(params: GetNoteParams) {
    const note = await this.getNote(params);
    await deleteNote(this.config, note);
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
