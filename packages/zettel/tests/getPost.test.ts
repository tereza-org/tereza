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
