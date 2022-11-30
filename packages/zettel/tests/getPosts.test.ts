import { zettelkasten } from './zettelkasten';

test('get all posts including drafts', async () => {
  const allPosts = await zettelkasten.getPosts({ includeDrafts: true });
  const ids = allPosts.map((post) => {
    return post.id;
  });
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
  const ids = allPosts.map((post) => {
    return post.id;
  });
  expect(ids).toMatchObject(expect.arrayContaining(['/blog/post-a']));
});

test('get blog and book posts', async () => {
  const allPosts = await zettelkasten.getPosts({
    groups: ['/blog', '/books'],
    includeDrafts: true,
  });
  const ids = allPosts.map((post) => {
    return post.id;
  });
  expect(ids).toMatchObject(
    expect.arrayContaining(['/blog/post-a', '/books/book-a'])
  );
});

test('get posts not including drafts', async () => {
  const allPosts = await zettelkasten.getPosts({ includeDrafts: false });
  const ids = allPosts.map((post) => {
    return post.id;
  });
  expect(ids).toMatchObject(expect.arrayContaining(['/blog/post-not-a-draft']));
  expect(ids).not.toMatchObject(expect.arrayContaining(['/blog/post-draft']));
});

test('get posts including drafts', async () => {
  const allPosts = await zettelkasten.getPosts({ includeDrafts: true });
  const ids = allPosts.map((post) => {
    return post.id;
  });
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
  const groups = allPosts.map((post) => {
    return post.group;
  });
  expect(groups).toMatchObject(expect.arrayContaining(['/']));
});

test('not include not markdown files', async () => {
  const allPosts = await zettelkasten.getPosts({ includeDrafts: true });
  const notMarkdown = allPosts.filter((post) => {
    return post.slug.includes('not-markdown');
  });
  expect(notMarkdown.length).toEqual(0);
});

test('should not return posts that is draft but with draft metadata equals false', async () => {
  const allPosts = await zettelkasten.getPosts({ includeDrafts: false });
  const notDraft = allPosts.filter((post) => {
    return post.id.includes('/blog/forced-not-draft-post');
  });
  expect(notDraft.length).toEqual(0);
});

test('post recommendations should not include the post itself', async () => {
  const posts = await zettelkasten.getPosts();
  posts.forEach((post) => {
    expect(Array.isArray(post.recommendations)).toBeTruthy();
    expect(
      post.recommendations.map((p) => {
        return p.id;
      })
    ).not.toContain(post.id);
  });
});

test('post recommendations should not return isReference equals undefined or null', async () => {
  const posts = await zettelkasten.getPosts();
  posts.forEach((post) => {
    post.recommendations.forEach((p) => {
      expect(p.isReference).not.toBeUndefined();
      expect(p.isReference).not.toBeNull();
      expect(typeof p.isReference).toEqual('boolean');
    });
  });
});

test.each(['references', 'backlinks', 'recommendations'])(
  'no %s should contain content',
  async (param) => {
    const posts = await zettelkasten.getPosts();
    posts.forEach((post) => {
      const value = (post as any)[param] as any[];
      expect(Array.isArray(value)).toBeTruthy();
      value.forEach((v) => {
        expect(v.content).toBeUndefined();
      });
    });
  }
);
