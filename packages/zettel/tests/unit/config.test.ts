import { DEFAULT_CONFIG } from '../../src/config';
import { NodeCache } from '../../src/NodeCache';
import { Zettelkasten, config, zettelkasten } from './../zettelkasten';

test('getConfig', () => {
  expect(zettelkasten.config).toEqual({
    ...DEFAULT_CONFIG,
    ...config,
    cache: new NodeCache(),
  });
});

test('should instantiate with NodeCache', () => {
  const z = new Zettelkasten({ ...config, cache: true });
  expect(z.config.cache).toBeInstanceOf(NodeCache);
});

test('should NOT instantiate with NodeCache', () => {
  const z = new Zettelkasten({ ...config, cache: false });
  expect(z.config.cache).toEqual(false);
});
