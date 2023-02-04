import { zettelkasten } from './../zettelkasten';

test('get tags from not drafts', async () => {
  const tags = await zettelkasten.getTags();
  expect(tags).toMatchObject(
    expect.arrayContaining(['blog', 'tag-1', 'related-tag'])
  );
});

test('not return tags from drafts by default', async () => {
  const tags = await zettelkasten.getTags();
  expect(tags).not.toContain('tag-for-draft');
});

test('not return tags from drafts', async () => {
  const tags = await zettelkasten.getTags({ includeDrafts: false });
  expect(tags).not.toContain('tag-for-draft');
});

test('return tags including from drafts', async () => {
  const tags = await zettelkasten.getTags({ includeDrafts: true });
  expect(tags).toContain('tag-for-draft');
});

test('not normalized tag should not exist', async () => {
  const tags = await zettelkasten.getTags();
  expect(tags).not.toContain('Tag 1');
});
