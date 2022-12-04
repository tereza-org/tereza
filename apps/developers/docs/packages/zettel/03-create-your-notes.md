---
title: Create Your Notes
---

Your notes are the foundation of your Zettelkasten. In this document, you'll learn how to create your notes and how to use the engine to handle them.

## Folder Structure

First, you should create a folder to store your notes. For example, you can create a folder called `my/notes` in the root of your project.

This way, you can instantiate the engine with the `notesDir` option:

```ts
import { Zettelkasten } from '@tereza-tech/zettel';
import * as path from 'path';

const notesDir = path.join(process.cwd(), 'my', 'notes');

const zettelkasten = new Zettelkasten({ notesDir });
```

Then, create your notes in the `my/notes` folder, using as many subfolders to organize your notes as you see fit. The engine will recursively search for notes in the `my/notes` folder.

The structure of your notes will define two metadata properties: `groups` and `slug`. The `groups` property will be the name of the subfolders where you saved the note, starting with slash. For exampe, if you save your note in `my/notes/blog/note.md`, the `groups` property will be `/blog`. The `slug` property will be the name of the note file, without the extension. For example, if you save your note in `my/notes/blog/note.md`, the `slug` property will be `note`.

Note that you can save your notes at the root of the `my/notes` folder. In this case, the `groups` property will be `/`.

:::note
You can't modify the `groups` and `slug` properties. They are automatically generated by the engine.
:::

## Notes Extension

Each note should be a Markdown file with a `.md` extension. We've opted to use Markdown because it's a simple and widely used format that is easy to read and write and you won't be locked into a proprietary format.

## Notes Format

Each note has two parts: [frontmatter](https://daily-dev-tips.com/posts/what-exactly-is-frontmatter/) and body. The frontmatter is a YAML snippet at the beginning of the file, denoted by the triple dashes at the start and end of the block, that contains [metadata](#metadata) about the note. The body is the content, that you write in Markdown. For example:

```md
---
title: My First Note
description: This is my first note.
date: 2021-01-01
tags:
  - first
  - note
---

This is the content of my first note.
```

In this example, the frontmatter contains the `title`, `description`, `date`, and `tags` metadata. The `content` is "This is the content of my first note.".

## Drafts

You can use the `draft` metadata to indicate that a note is a draft. For example:

```md
---
title: My Draft Note
description: This is my draft note.
date: 2021-01-01
tags:
  - first
  - note
draft: true
---

This is the body of my draft note.
```

The engine uses the `draft` metadata to ignore notes in some methods. For example, the `getNotes` method will ignore notes with the `draft` metadata set to `true`:

includeDrafts

```ts
const notDraftNotes = await zettelkasten.getNotes();
// If you want to include drafts, you can pass the `includeDrafts` option:
const allNotes = await zettelkasten.getNotes({ includeDrafts: true });
```

### Automatic Drafts

The engine will automatically set the `draft` metadata to `true` if the note doesn't have the required metadata fields or if the note doesn't have content. You set the required metadata fields in the `requiredMetadata` option of the Zettelkasten constructor. For example:

```ts
// omitting code for brevity
const zettelkasten = new Zettelkasten({
  notesDir,
  requiredMetadata: ['title', 'date', 'description'],
});
```

In the example above, the engine will set the `draft` metadata to `true` if the note doesn't have the `title`, `date` and `description` metadata.

## Metadata

You can add any metadata you want to your notes. However, there are some metadata that the engine uses to organize them.

### `id`

The `id` metadata is used to identify the note. If you don't provide an `id` metadata, the engine will generate a id for the note, which is the `groups` and `slug` metadata joined with a slash. For example, if you save your note in `my/notes/blog/note.md`, the `id` metadata will be `/blog/note`.

You can use the `id` metadata to get a note by its id:

```ts
const note = zettelkasten.getNote('/blog/note');
// or
const note = zettelkasten.getNote({ id: '/blog/note' });
```

### `draft`

The `draft` metadata is used to indicate that the note is a draft. If you don't provide a `draft` metadata, the engine will assert if the note is a draft. You can read more about drafts in the [Drafts](#drafts) section.

### `tags`

The `tags` metadata is used to organize your notes by tags. It's the base of the engine because it's used to make the connections between your notes. It's an array of strings.

### `href`

The `href` metadata is used to indicate the URL of the note. If you don't provide a `href` metadata, the engine will generate a URL for the note, which is the `groups` and `slug` metadata joined with a slash. The system use the `href` metadata to generate the [backlinks](./get-your-notes#backlinks) and [references](./get-your-notes#references).