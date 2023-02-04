import * as fs from 'fs';
import { Zettelkasten, config, zettelkasten } from './../zettelkasten';
import matter from 'gray-matter';

afterEach(() => {
  jest.clearAllMocks();
});

test('should not normalize on init', async () => {
  const normalizeNotesMock = jest.spyOn(
    Zettelkasten.prototype,
    'normalizeNotes'
  );
  new Zettelkasten({ ...config, normalizeOnInit: false });
  expect(normalizeNotesMock).not.toHaveBeenCalled();
});

test('should normalize on init', async () => {
  const normalizeNotesMock = jest.spyOn(
    Zettelkasten.prototype,
    'normalizeNotes'
  );
  new Zettelkasten({ ...config, normalizeOnInit: true });
  expect(normalizeNotesMock).toHaveBeenCalled();
});

test('if a slug is tag in another note, add it as tag', async () => {
  let zettelATags: string[] = [];

  const writeFileMock = jest
    .spyOn(fs.promises, 'writeFile')
    .mockImplementation((_, note: any) => {
      const { data } = matter(note);
      if (data.id === 'zettel/zettel-a') {
        zettelATags = data.tags;
      }

      return Promise.resolve();
    });

  await zettelkasten.normalizeNotes();

  expect(writeFileMock).toHaveBeenCalled();

  expect(zettelATags).toContain('zettel-a');
});
