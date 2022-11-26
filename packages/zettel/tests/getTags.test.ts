import { zettelkasten } from './zettelkasten';

test('getTags', async () => {
  const tags = await zettelkasten.getTags();
  expect(tags).toMatchObject(
    expect.arrayContaining(['blog', 'tag-1', 'zettel'])
  );
});

test('not normalized tag should not exist', async () => {
  const tags = await zettelkasten.getTags();
  expect(tags).not.toContain('Tag 1');
});
