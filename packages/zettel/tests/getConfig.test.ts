import { config, zettelkasten } from './zettelkasten';

test('getConfig', () => {
  expect(zettelkasten.getConfig()).toEqual(config);
});
