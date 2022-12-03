import { DEFAULT_CONFIG } from '../src/config';
import { config, zettelkasten } from './zettelkasten';

test('getConfig', () => {
  expect(zettelkasten.config).toEqual({ ...DEFAULT_CONFIG, ...config });
});
