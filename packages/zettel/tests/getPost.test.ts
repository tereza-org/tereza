import { zettelkasten } from './zettelkasten';

test('getPost by id', async () => {
  const id = '/blog/post-a';
  const post = await zettelkasten.getPost({ id });
  expect(post?.id).toEqual(id);
});

test('getPost by title', async () => {
  const title = 'Post A';
  const post = await zettelkasten.getPost({ title });
  expect(post?.title).toEqual(title);
});

test('getPost by group and slug', async () => {
  const group = '/blog';
  const slug = 'post-a';
  const post = await zettelkasten.getPost({ group, slug });
  expect(post?.group).toEqual(group);
  expect(post?.slug).toEqual(slug);
});

test('post with not all required metadata should be draft', async () => {
  const post = await zettelkasten.getPost({ id: '/blog/post-draft' });
  expect(post?.draft).toEqual(true);
});

test('post with all required metadata cannot be draft', async () => {
  const post = await zettelkasten.getPost({ id: '/blog/post-not-a-draft' });
  expect(post?.draft).toEqual(false);
});

test('post with all required metadata can be a draft if draft metadata is true', async () => {
  const post = await zettelkasten.getPost({
    id: '/blog/post-has-all-required-metadata-but-is-draft',
  });
  expect(post?.draft).toEqual(true);
});

test('backlinks and references', async () => {
  const referencedPost = await zettelkasten.getPost({
    id: '/blog/post-not-a-draft',
  });

  const referencingPost = await zettelkasten.getPost({
    id: '/blog/post-not-a-draft-and-reference-another',
  });

  expect(referencedPost?.backlinks).toContain(referencingPost?.id);

  expect(referencingPost?.references).toContain(referencedPost?.id);
});

test('recommendations', async () => {
  const post = await zettelkasten.getPost({ id: '/zettel/related-zettel-1' });

  expect(post?.recommendations.length).toEqual(
    zettelkasten.config.recommendationsLimit
  );
});
