import * as fs from 'fs';
import { zettelkasten } from './zettelkasten';

const noteInput = {
  id: 'blog/note-to-be-saved',
  title: 'Note A',
  group: 'blog/',
  slug: 'note-to-be-saved',
  content: 'This is the content',
  date: '2021-01-01',
  tags: ['tag-a', 'tag-b'],
  description: 'This is the description',
};

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

test('should return simple note', async () => {
  const a = await zettelkasten.saveNote({
    title: 'some title',
    content: 'some content',
  });

  expect(a).toMatchObject({
    id: '/some-title',
    title: 'some title',
    group: '/',
    slug: 'some-title',
    content: 'some content',
  });
});

test('saveNote', async () => {
  await zettelkasten.saveNote(noteInput);

  expect(writeFileMock).toHaveBeenCalledWith(expect.any(String), noteToBeSaved);
});

test('should add slash to group if it not ends with slash', async () => {
  await zettelkasten.saveNote({
    ...noteInput,
    group: 'blog',
  });

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
