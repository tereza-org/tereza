import { zettelkasten } from './zettelkasten';

test('getPost by id', async () => {
  const id = 'blog/post-a';
  const post = await zettelkasten.getPost({ id });
  expect(post?.id).toEqual(id);
});

test('getPost by title', async () => {
  const title = 'Post A';
  const post = await zettelkasten.getPost({ title });
  expect(post?.title).toEqual(title);
});

test('getPost by group and slug', async () => {
  const group = 'blog';
  const slug = 'post-a';
  const post = await zettelkasten.getPost({ group, slug });
  expect(post?.group).toEqual(group);
  expect(post?.slug).toEqual(slug);
});

test('post with not all required metadata should be draft', async () => {
  const post = await zettelkasten.getPost({ id: 'blog/post-draft' });
  expect(post?.draft).toEqual(true);
});

test('post with all required metadata cannot be draft', async () => {
  const post = await zettelkasten.getPost({ id: 'blog/post-not-a-draft' });
  expect(post?.draft).toEqual(false);
});

test('post with all required metadata can be a draft if draft metadata is true', async () => {
  const post = await zettelkasten.getPost({
    id: 'blog/post-has-all-required-metadata-but-is-draft',
  });
  expect(post?.draft).toEqual(true);
});
