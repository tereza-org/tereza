import { zettelkasten } from './zettelkasten';

test('get all posts including drafts', async () => {
  const allPosts = await zettelkasten.getPosts({ includeDrafts: true });
  const ids = allPosts.map((post) => post.id);
  expect(ids).toMatchObject(
    expect.arrayContaining([
      '/blog/post-a',
      '/books/book-a',
      '/zettel/zettel-a',
    ])
  );
});

test('get only blog posts', async () => {
  const allPosts = await zettelkasten.getPosts({
    groups: '/blog',
  });
  const ids = allPosts.map((post) => post.id);
  expect(ids).toMatchObject(expect.arrayContaining(['/blog/post-a']));
});

test('get blog and book posts', async () => {
  const allPosts = await zettelkasten.getPosts({
    groups: ['/blog', '/books'],
    includeDrafts: true,
  });
  const ids = allPosts.map((post) => post.id);
  expect(ids).toMatchObject(
    expect.arrayContaining(['/blog/post-a', '/books/book-a'])
  );
});

test('get posts not including drafts', async () => {
  const allPosts = await zettelkasten.getPosts({ includeDrafts: false });
  const ids = allPosts.map((post) => post.id);
  expect(ids).toMatchObject(expect.arrayContaining(['/blog/post-not-a-draft']));
  expect(ids).not.toMatchObject(expect.arrayContaining(['/blog/post-draft']));
});

test('get posts including drafts', async () => {
  const allPosts = await zettelkasten.getPosts({ includeDrafts: true });
  const ids = allPosts.map((post) => post.id);
  expect(ids).toMatchObject(
    expect.arrayContaining(['/blog/post-draft', '/blog/post-not-a-draft'])
  );
});

test('false and undefined should be the same', async () => {
  const allPosts = await zettelkasten.getPosts({ includeDrafts: false });
  const allPosts2 = await zettelkasten.getPosts({});
  expect(allPosts).toEqual(allPosts2);
});

test('include root posts', async () => {
  const allPosts = await zettelkasten.getPosts();
  const groups = allPosts.map((post) => post.group);
  expect(groups).toMatchObject(expect.arrayContaining(['/']));
});

test('not include not markdown files', async () => {
  const allPosts = await zettelkasten.getPosts({ includeDrafts: true });
  const notMarkdown = allPosts.filter((post) =>
    post.slug.includes('not-markdown')
  );
  expect(notMarkdown.length).toEqual(0);
});

test('should not return posts that is draft but with draft metadata equals false', async () => {
  const allPosts = await zettelkasten.getPosts({ includeDrafts: false });
  const notDraft = allPosts.filter((post) =>
    post.id.includes('/blog/forced-not-draft-post')
  );
  expect(notDraft.length).toEqual(0);
});
