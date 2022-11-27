import { Zettelkasten } from '../src';
import { config, zettelkasten } from './zettelkasten';

const z = new Zettelkasten({ ...config, ignoreGroups: undefined });

test('getGroups', () => {
  expect(zettelkasten.getGroups()).toMatchObject(
    expect.arrayContaining(['/', '/blog', '/books', '/zettel'])
  );

  expect(zettelkasten.getGroups()).not.toMatchObject(
    expect.arrayContaining(['/ignored'])
  );
});

test('should return all groups', () => {
  expect(z.getGroups()).toMatchObject(
    expect.arrayContaining(['/blog', '/books', '/zettel', '/ignored'])
  );
});
