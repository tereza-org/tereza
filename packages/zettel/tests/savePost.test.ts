import * as fs from 'fs';
import { zettelkasten } from './zettelkasten';

const postToBeSaved = `
---
id: /blog/post-to-be-saved
title: Post A
group: /blog
slug: post-to-be-saved
date: '2021-01-01'
tags:
  - tag-a
  - tag-b
excerpt: This is the excerpt
---
This is the content
`.trimStart();

test('savePost', async () => {
  const post = {
    id: '/blog/post-to-be-saved',
    title: 'Post A',
    group: '/blog',
    slug: 'post-to-be-saved',
    content: 'This is the content',
    date: '2021-01-01',
    tags: ['tag-a', 'tag-b'],
    excerpt: 'This is the excerpt',
  };

  await zettelkasten.savePost(post);

  const writeFileMock = jest.spyOn(fs.promises, 'writeFile');

  expect(writeFileMock).toHaveBeenCalledWith(expect.any(String), postToBeSaved);
});
