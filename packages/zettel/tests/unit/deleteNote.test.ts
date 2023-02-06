import * as fs from 'fs';
import { zettelkasten } from './../zettelkasten';

const rmMock = jest.spyOn(fs.promises, 'rm');

test('should delete note and update cache', async () => {
  const id = 'blog/note-a';

  const note = await zettelkasten.getNote(id);

  expect(note).toBeDefined();

  await zettelkasten.deleteNote(id);

  expect(rmMock).toHaveBeenCalledWith(
    expect.stringContaining('notes/blog/note-a.md')
  );

  const deletedNote = await zettelkasten.getNote(id);

  expect(deletedNote).toBeUndefined();
});
