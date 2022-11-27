import { Zettelkasten } from '../src';
import { config, zettelkasten } from './zettelkasten';

const z = new Zettelkasten({ ...config, ignoreGroups: undefined });

test('getGroups', async () => {
  expect(await zettelkasten.getGroups()).toMatchObject(
    expect.arrayContaining(['/', '/blog', '/books', '/zettel'])
  );

  expect(await zettelkasten.getGroups()).not.toMatchObject(
    expect.arrayContaining(['/ignored'])
  );
});

test('should return all groups', async () => {
  expect(await z.getGroups()).toMatchObject(
    expect.arrayContaining(['/blog', '/books', '/zettel', '/ignored'])
  );
});

test('ignore root group', async () => {
  const z2 = new Zettelkasten({ ...config, ignoreGroups: ['/'] });
  expect(await z2.getGroups()).not.toContain('/');
});
