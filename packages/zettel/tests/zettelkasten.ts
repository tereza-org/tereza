import * as path from 'path';
import { Zettelkasten, ZettelkastenConfig } from '../src';

export { Zettelkasten };

const postsDir = path.join(__dirname, '__mocks__', 'posts');

export const config: ZettelkastenConfig = {
  postsDir,
  ignoreGroups: ['/ignored'],
  requiredMetadata: ['title', 'date', 'excerpt'],
  normalizeOnInit: false,
};

export const zettelkasten = new Zettelkasten(config);
