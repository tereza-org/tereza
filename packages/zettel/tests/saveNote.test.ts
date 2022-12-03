import * as fs from 'fs';
import { zettelkasten } from './zettelkasten';

const noteToBeSaved = `
---
id: /blog/note-to-be-saved
title: Note A
group: /blog
slug: note-to-be-saved
date: '2021-01-01'
tags:
  - tag-a
  - tag-b
description: This is the description
---
This is the content
`.trimStart();

test('saveNote', async () => {
  const note = {
    id: '/blog/note-to-be-saved',
    title: 'Note A',
    group: '/blog',
    slug: 'note-to-be-saved',
    content: 'This is the content',
    date: '2021-01-01',
    tags: ['tag-a', 'tag-b'],
    description: 'This is the description',
  };

  await zettelkasten.saveNote(note);

  const writeFileMock = jest.spyOn(fs.promises, 'writeFile');

  expect(writeFileMock).toHaveBeenCalledWith(expect.any(String), noteToBeSaved);
});
