import * as path from 'path';
import { Zettelkasten, ZettelkastenConfig } from '../src';

export { Zettelkasten };

const notesDir = path.join(__dirname, '__mocks__', 'notes');

export const config: ZettelkastenConfig = {
  notesDir,
  ignoreGroups: ['/ignored'],
  requiredMetadata: ['title', 'date', 'description'],
  normalizeOnInit: false,
};

export const zettelkasten = new Zettelkasten(config);
