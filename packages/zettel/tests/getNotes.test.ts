import { Zettelkasten, zettelkasten } from './zettelkasten';

test('get all notes including drafts', async () => {
  const allNotes = await zettelkasten.getNotes({ includeDrafts: true });
  const ids = allNotes.map((note) => {
    return note.id;
  });
  expect(ids).toMatchObject(
    expect.arrayContaining([
      '/blog/note-a',
      '/books/book-a',
      '/zettel/zettel-a',
    ])
  );
});

test('get only blog notes', async () => {
  const allNotes = await zettelkasten.getNotes({
    groups: '/blog',
  });
  const ids = allNotes.map((note) => {
    return note.id;
  });
  expect(ids).toMatchObject(expect.arrayContaining(['/blog/note-a']));
});

test('get blog and book notes', async () => {
  const allNotes = await zettelkasten.getNotes({
    groups: ['/blog', '/books'],
    includeDrafts: true,
  });
  const ids = allNotes.map((note) => {
    return note.id;
  });
  expect(ids).toMatchObject(
    expect.arrayContaining(['/blog/note-a', '/books/book-a'])
  );
});

test('get notes not including drafts', async () => {
  const allNotes = await zettelkasten.getNotes({ includeDrafts: false });
  const ids = allNotes.map((note) => {
    return note.id;
  });
  expect(ids).toMatchObject(expect.arrayContaining(['/blog/note-not-a-draft']));
  expect(ids).not.toMatchObject(expect.arrayContaining(['/blog/note-draft']));
});

test('get notes including drafts', async () => {
  const allNotes = await zettelkasten.getNotes({ includeDrafts: true });
  const ids = allNotes.map((note) => {
    return note.id;
  });
  expect(ids).toMatchObject(
    expect.arrayContaining(['/blog/note-draft', '/blog/note-not-a-draft'])
  );
});

test('false and undefined should be the same', async () => {
  const allNotes = await zettelkasten.getNotes({ includeDrafts: false });
  const allNotes2 = await zettelkasten.getNotes({});
  expect(allNotes).toEqual(allNotes2);
});

test('include root notes', async () => {
  const allNotes = await zettelkasten.getNotes();
  const groups = allNotes.map((note) => {
    return note.group;
  });
  expect(groups).toMatchObject(expect.arrayContaining(['/']));
});

test('not include not markdown files', async () => {
  const allNotes = await zettelkasten.getNotes({ includeDrafts: true });
  const notMarkdown = allNotes.filter((note) => {
    return note.slug.includes('not-markdown');
  });
  expect(notMarkdown.length).toEqual(0);
});

test('should not return notes that is draft but with draft metadata equals false', async () => {
  const allNotes = await zettelkasten.getNotes({ includeDrafts: false });
  const notDraft = allNotes.filter((note) => {
    return note.id.includes('/blog/forced-not-draft-note');
  });
  expect(notDraft.length).toEqual(0);
});

test('note recommendations should not include the note itself', async () => {
  const notes = await zettelkasten.getNotes();
  notes.forEach((note) => {
    expect(Array.isArray(note.recommendations)).toBeTruthy();
    expect(
      note.recommendations.map((p) => {
        return p.id;
      })
    ).not.toContain(note.id);
  });
});

test('note recommendations should not return isReference equals undefined or null', async () => {
  const notes = await zettelkasten.getNotes();
  notes.forEach((note) => {
    note.recommendations.forEach((p) => {
      expect(p.isReference).not.toBeUndefined();
      expect(p.isReference).not.toBeNull();
      expect(typeof p.isReference).toEqual('boolean');
    });
  });
});

test.each(['references', 'backlinks', 'recommendations'])(
  'no %s should contain content',
  async (param) => {
    const notes = await zettelkasten.getNotes();
    notes.forEach((note) => {
      const value = (note as any)[param] as any[];
      expect(Array.isArray(value)).toBeTruthy();
      value.forEach((v) => {
        expect(v.content).toBeUndefined();
      });
    });
  }
);

test.each([
  './tests/__mocks__/notes',
  'tests/__mocks__/notes',
  '../zettel/tests/__mocks__/notes',
  '../../packages/zettel/tests/__mocks__/notes',
])('should return notes if notesDir is relative', async (relativeDir) => {
  const notes0 = await zettelkasten.getNotes();
  const z = new Zettelkasten({ notesDir: relativeDir });
  const notes1 = await z.getNotes();
  expect(notes0).toEqual(notes1);
});
