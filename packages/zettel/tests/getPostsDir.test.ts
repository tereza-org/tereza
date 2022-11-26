import { postsDir, zettelkasten } from './zettelkasten';

test('getPostsDir', () => {
  expect(zettelkasten.getPostsDir()).toEqual(postsDir);
});
