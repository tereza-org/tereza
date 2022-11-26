import { DEFAULT_CONFIG } from '../src';
import { config, zettelkasten } from './zettelkasten';

test('getConfig', () => {
  expect(zettelkasten.getConfig()).toEqual({ ...DEFAULT_CONFIG, ...config });
});
