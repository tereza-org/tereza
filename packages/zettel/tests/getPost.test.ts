import { Zettelkasten } from '../src';
import { zettelkasten } from './zettelkasten';

test('getPost by id', async () => {
  const id = '/blog/post-a';
  const post = await zettelkasten.getPost({ id });
  expect(post?.id).toEqual(id);
});

test('parse date', async () => {
  const id = '/blog/post-a';
  const post = await zettelkasten.getPost({ id });
  expect(post?.date).toEqual('2020-01-01');
  expect(post?.formattedDate).toEqual('January 1st, 2020');
});

test('parse date with another format', async () => {
  const z = new Zettelkasten({
    ...zettelkasten.config,
    dateFormat: 'PPPP',
  });
  const post = await z.getPost({ id: '/blog/post-a' });
  expect(post?.date).toEqual('2020-01-01');
  expect(post?.formattedDate).toEqual('Wednesday, January 1st, 2020');
});

test('reading time', async () => {
  const id = '/blog/post-a';
  const post = await zettelkasten.getPost({ id });
  expect(post?.readingTime).toEqual(1);
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

  expect(
    referencedPost?.backlinks.find((p) => p.id === referencingPost?.id)
  ).toBeTruthy();

  expect(
    referencingPost?.references.find((p) => p.id === referencedPost?.id)
  ).toBeTruthy();
});

test('recommendations', async () => {
  const post = await zettelkasten.getPost({ id: '/zettel/related-zettel-1' });
  expect(post?.recommendations.length).toEqual(
    zettelkasten.config.recommendationsLimit
  );
});

test('should get root post by group and slug', async () => {
  const post = await zettelkasten.getPost({ group: '/', slug: 'post-on-root' });
  expect(post).toBeTruthy();
});

test('should get root post by id', async () => {
  const post = await zettelkasten.getPost({ id: '/post-on-root' });
  expect(post).toBeTruthy();
});

test('should keep custom id', async () => {
  const id = 'custom-id';
  const post = await zettelkasten.getPost({ id });
  expect(post?.id).toEqual(id);
});

test('post without content should be draft', async () => {
  const post = await zettelkasten.getPost({ id: '/blog/post-without-content' });
  expect(post?.draft).toEqual(true);
});

test('return empty array if no tags', async () => {
  const post = await zettelkasten.getPost({ id: '/blog/post-without-tags' });
  expect(post?.tags).toEqual([]);
});
