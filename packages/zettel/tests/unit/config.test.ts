import { DEFAULT_CONFIG } from '../../src/config';
import { NodeCache } from '../../src/NodeCache';
import { config, zettelkasten } from './../zettelkasten';

test('getConfig', () => {
  expect(zettelkasten.config).toEqual({
    ...DEFAULT_CONFIG,
    ...config,
    cache: new NodeCache(),
  });
});
