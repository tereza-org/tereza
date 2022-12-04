import * as path from 'path';
import { Zettelkasten } from '@tereza-tech/zettel';

const notesDir = path.join(process.cwd(), 'notes');

export const zettel = new Zettelkasten({
  notesDir,
  requiredMetadata: ['title'],
});
