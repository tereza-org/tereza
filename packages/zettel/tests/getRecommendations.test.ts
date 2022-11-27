import { zettelkasten } from './zettelkasten';

test('getRecommendations by tag', async () => {
  const posts = await zettelkasten.getRecommendations({ tag: 'related-tag' });
  expect(posts.length).toEqual(7);
});

test('getRecommendations by tag and limit', async () => {
  const posts = await zettelkasten.getRecommendations({
    tag: 'related-tag',
    limit: true,
  });
  expect(posts.length).toEqual(zettelkasten.config.recommendationsLimit);
});

test('getRecommendations by group', async () => {
  const posts = await zettelkasten.getRecommendations({ group: 'blog' });
  expect(posts.length > 1).toBeTruthy();
});
