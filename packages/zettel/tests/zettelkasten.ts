import * as path from 'path';
import { Zettelkasten } from '../src';

const postsDir = path.join(__dirname, '__mocks__', 'posts');

export const zettelkasten = new Zettelkasten({ postsDir });
