import { Zettelkasten, zettelkasten } from './zettelkasten';

test('getNote by id object', async () => {
  const id = '/blog/note-a';
  const note = await zettelkasten.getNote({ id });
  expect(note?.id).toEqual(id);
});

test('getNote by id string', async () => {
  const id = '/blog/note-a';
  const note = await zettelkasten.getNote(id);
  expect(note?.id).toEqual(id);
});

test('parse date', async () => {
  const id = '/blog/note-a';
  const note = await zettelkasten.getNote({ id });
  expect(note?.date).toEqual('2020-01-01');
  expect(note?.formattedDate).toEqual('January 1st, 2020');
});

test('parse date with another format', async () => {
  const z = new Zettelkasten({
    ...zettelkasten.config,
    dateFormat: 'PPPP',
  });
  const note = await z.getNote({ id: '/blog/note-a' });
  expect(note?.date).toEqual('2020-01-01');
  expect(note?.formattedDate).toEqual('Wednesday, January 1st, 2020');
});

test('reading time', async () => {
  const id = '/blog/note-a';
  const note = await zettelkasten.getNote({ id });
  expect(note?.readingTime).toEqual(1);
});

test('getNote by title', async () => {
  const title = 'Note A';
  const note = await zettelkasten.getNote({ title });
  expect(note?.title).toEqual(title);
});

test('getNote by group and slug', async () => {
  const group = '/blog';
  const slug = 'note-a';
  const note = await zettelkasten.getNote({ group, slug });
  expect(note?.group).toEqual(group);
  expect(note?.slug).toEqual(slug);
});

test('note with not all required metadata should be draft', async () => {
  const note = await zettelkasten.getNote({ id: '/blog/note-draft' });
  expect(note?.draft).toEqual(true);
});

test('note with all required metadata cannot be draft', async () => {
  const note = await zettelkasten.getNote({ id: '/blog/note-not-a-draft' });
  expect(note?.draft).toEqual(false);
});

test('note with all required metadata can be a draft if draft metadata is true', async () => {
  const note = await zettelkasten.getNote({
    id: '/blog/note-has-all-required-metadata-but-is-draft',
  });
  expect(note?.draft).toEqual(true);
});

test('backlinks and references', async () => {
  const referencedNote = await zettelkasten.getNote({
    id: '/blog/note-not-a-draft',
  });

  const referencingNote = await zettelkasten.getNote({
    id: '/blog/note-not-a-draft-and-reference-note-not-a-draft',
  });

  expect(
    referencedNote?.backlinks.find((p) => {
      return p.id === referencingNote?.id;
    })
  ).toBeTruthy();

  expect(
    referencingNote?.references.find((p) => {
      return p.id === referencedNote?.id;
    })
  ).toBeTruthy();
});

test('recommendations', async () => {
  const recommendations = await zettelkasten.getRecommendations({
    note: { id: '/zettel/related-zettel-1' },
  });
  expect(recommendations.length).toEqual(
    zettelkasten.config.recommendationsLimit
  );
});

test('should get root note by group and slug', async () => {
  const note = await zettelkasten.getNote({ group: '/', slug: 'note-on-root' });
  expect(note).toBeTruthy();
});

test('should get root note by id', async () => {
  const note = await zettelkasten.getNote({ id: '/note-on-root' });
  expect(note).toBeTruthy();
});

test('should keep custom id', async () => {
  const id = 'custom-id';
  const note = await zettelkasten.getNote({ id });
  expect(note?.id).toEqual(id);
});

test('note without content should be draft', async () => {
  const note = await zettelkasten.getNote({ id: '/blog/note-without-content' });
  expect(note?.draft).toEqual(true);
});

test('return empty array if no tags', async () => {
  const note = await zettelkasten.getNote({ id: '/blog/note-without-tags' });
  expect(note?.tags).toEqual([]);
});
