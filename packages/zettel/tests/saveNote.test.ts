import * as fs from 'fs';
import { zettelkasten } from './zettelkasten';

const noteToBeSaved = `
---
id: blog/note-to-be-saved
title: Note A
group: blog/
slug: note-to-be-saved
date: '2021-01-01'
tags:
  - tag-a
  - tag-b
description: This is the description
---
This is the content
`.trimStart();

const writeFileMock = jest.spyOn(fs.promises, 'writeFile');

test('saveNote', async () => {
  const note = {
    id: 'blog/note-to-be-saved',
    title: 'Note A',
    group: 'blog/',
    slug: 'note-to-be-saved',
    content: 'This is the content',
    date: '2021-01-01',
    tags: ['tag-a', 'tag-b'],
    description: 'This is the description',
  };

  await zettelkasten.saveNote(note);

  expect(writeFileMock).toHaveBeenCalledWith(expect.any(String), noteToBeSaved);
});

test('should add slash to group if it not ends with slash', async () => {
  const note = {
    id: 'blog/note-to-be-saved',
    title: 'Note A',
    group: 'blog',
    slug: 'note-to-be-saved',
    content: 'This is the content',
    date: '2021-01-01',
    tags: ['tag-a', 'tag-b'],
    description: 'This is the description',
  };

  await zettelkasten.saveNote(note);

  expect(writeFileMock).toHaveBeenCalledWith(expect.any(String), noteToBeSaved);
});

test('should add slash to group if it is undefined', async () => {
  const note = {
    title: 'Some note without group',
  };

  await zettelkasten.saveNote(note);

  expect(writeFileMock).toHaveBeenCalledWith(
    expect.any(String),
    expect.stringContaining('group: /')
  );
});

test('should add slug from title', async () => {
  const note = {
    title: 'Note Without Slug',
  };

  await zettelkasten.saveNote(note);

  expect(writeFileMock).toHaveBeenCalledWith(
    expect.any(String),
    expect.stringContaining('slug: note-without-slug')
  );
});
