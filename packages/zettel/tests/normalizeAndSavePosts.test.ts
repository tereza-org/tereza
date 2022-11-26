import * as fs from 'fs';
import { Zettelkasten } from '../src';
import { config, zettelkasten } from './zettelkasten';
import matter from 'gray-matter';

afterEach(() => {
  jest.clearAllMocks();
});

test('should not normalize on init', async () => {
  const normalizeAndSavePostsMock = jest.spyOn(
    Zettelkasten.prototype,
    'normalizeAndSavePosts'
  );
  new Zettelkasten({ ...config, normalizeOnInit: false });
  expect(normalizeAndSavePostsMock).not.toHaveBeenCalled();
});

test('should normalize on init', async () => {
  const normalizeAndSavePostsMock = jest.spyOn(
    Zettelkasten.prototype,
    'normalizeAndSavePosts'
  );
  new Zettelkasten({ ...config, normalizeOnInit: true });
  expect(normalizeAndSavePostsMock).toHaveBeenCalled();
});

test('if a slug is tag in another post, add it as tag', async () => {
  let zettelATags: string[] = [];

  const writeFileMock = jest
    .spyOn(fs.promises, 'writeFile')
    .mockImplementation((_, post: any) => {
      const { data } = matter(post);
      if (data.id === 'zettel/zettel-a') {
        zettelATags = data.tags;
      }

      return Promise.resolve();
    });

  await zettelkasten.normalizeAndSavePosts();

  expect(writeFileMock).toHaveBeenCalled();

  expect(zettelATags).toContain('zettel-a');
});
