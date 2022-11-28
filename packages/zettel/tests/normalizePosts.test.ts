import * as fs from 'fs';
import { Zettelkasten } from '../src';
import { config, zettelkasten } from './zettelkasten';
import matter from 'gray-matter';

afterEach(() => {
  jest.clearAllMocks();
});

test('should not normalize on init', async () => {
  const normalizePostsMock = jest.spyOn(
    Zettelkasten.prototype,
    'normalizePosts'
  );
  new Zettelkasten({ ...config, normalizeOnInit: false });
  expect(normalizePostsMock).not.toHaveBeenCalled();
});

test('should normalize on init', async () => {
  const normalizePostsMock = jest.spyOn(
    Zettelkasten.prototype,
    'normalizePosts'
  );
  new Zettelkasten({ ...config, normalizeOnInit: true });
  expect(normalizePostsMock).toHaveBeenCalled();
});

test('if a slug is tag in another post, add it as tag', async () => {
  let zettelATags: string[] = [];

  const writeFileMock = jest
    .spyOn(fs.promises, 'writeFile')
    .mockImplementation((_, post: any) => {
      const { data } = matter(post);
      if (data.id === '/zettel/zettel-a') {
        zettelATags = data.tags;
      }

      return Promise.resolve();
    });

  await zettelkasten.normalizePosts();

  expect(writeFileMock).toHaveBeenCalled();

  expect(zettelATags).toContain('zettel-a');
});
