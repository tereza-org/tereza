import { zettelkasten } from './zettelkasten';

test('get all posts', async () => {
  const allPosts = await zettelkasten.getPosts();
  const ids = allPosts.map((post) => post.id);
  expect(ids).toMatchObject(
    expect.arrayContaining(['blog/post-a', 'books/book-a', 'zettel/zettel-1'])
  );
});

test('get only blog posts', async () => {
  const allPosts = await zettelkasten.getPosts({
    groups: 'blog',
  });
  const ids = allPosts.map((post) => post.id);
  expect(ids).toMatchObject(expect.arrayContaining(['blog/post-a']));
});

test('get blog and book posts', async () => {
  const allPosts = await zettelkasten.getPosts({
    groups: ['blog', 'books'],
  });
  const ids = allPosts.map((post) => post.id);
  expect(ids).toMatchObject(
    expect.arrayContaining(['blog/post-a', 'books/book-a'])
  );
});

test('get posts not including drafts', async () => {
  const allPosts = await zettelkasten.getPosts({
    drafts: false,
  });
  const ids = allPosts.map((post) => post.id);
  expect(ids).toMatchObject(expect.arrayContaining(['blog/post-not-a-draft']));
  expect(ids).not.toMatchObject(expect.arrayContaining(['blog/post-draft']));
});

test('get posts including drafts', async () => {
  const allPosts = await zettelkasten.getPosts({
    drafts: true,
  });
  const ids = allPosts.map((post) => post.id);
  expect(ids).toMatchObject(
    expect.arrayContaining(['blog/post-draft', 'blog/post-not-a-draft'])
  );
});

test('false and undefined should be the same', async () => {
  const allPosts = await zettelkasten.getPosts({
    drafts: false,
  });
  const allPosts2 = await zettelkasten.getPosts({});
  expect(allPosts).toEqual(allPosts2);
});
