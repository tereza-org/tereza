import { zettelkasten } from './../zettelkasten';

test('getRecommendations by tag', async () => {
  const notes = await zettelkasten.getRecommendations({ tag: 'related-tag' });
  expect(notes.length).toEqual(7);
});

test('getRecommendations by tag and limit', async () => {
  const notes = await zettelkasten.getRecommendations({
    tag: 'related-tag',
    limit: true,
  });
  expect(notes.length).toEqual(zettelkasten.config.recommendationsLimit);
});

test('getRecommendations by group', async () => {
  const notes = await zettelkasten.getRecommendations({ group: 'blog/' });
  expect(notes.length > 1).toBeTruthy();
});

test('recommendations without params', async () => {
  const recommendations = await zettelkasten.getRecommendations();
  expect(Array.isArray(recommendations)).toBeTruthy();
});
