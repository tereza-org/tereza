import { Cache } from './Cache';
import { NotesClient } from './NotesClient';
import { fsNotesClient } from './fsNotesClient';

export type ZettelkastenConfig = {
  notesDir: string;
  notesClient: NotesClient;
  ignoreGroups?: string[];
  requiredMetadata?: string[];
  normalizeOnInit?: boolean;
  recommendationsLimit?: number;
  /**
   * https://date-fns.org/v2.29.3/docs/format
   */
  dateFormat?: string;
  cache?: boolean | Cache;
};

export const DEFAULT_CONFIG = {
  notesClient: fsNotesClient,
  requiredMetadata: [],
  normalizeOnInit: false,
  recommendationsLimit: 5,
  dateFormat: 'PPP',
  cache: true,
};
