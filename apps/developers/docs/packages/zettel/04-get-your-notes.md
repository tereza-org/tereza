---
title: Get Your Notes
---

Once you have your notes and you have instantiated the Zettelkasten engine, you can retrieve your notes. You can do this by calling the `getNotes` or `getNote` methods. The `getNotes` method returns an array of notes, while the `getNote` method returns a single note. Examples:

```ts
const notes = await zettelkasten.getNotes();
const blogNotes = await zettelkasten.getNotes({ group: ['blog'] });
const note = await zettelkasten.getNote('my-first-note');
```

## Additional Metadata

The notes that both methods return have additional metadata that are not present in the original note. The additional metadata are:

### Backlinks

The `backlinks` metadata is an array of notes' metadata that reference the current note. For example, if you have a note with the following content:

```md
---
id: /blog/referencing-note
title: Referencing Note
---

This note references [Referenced Note](/blog/referenced-note).
```

The `backlinks` metadata of the note `/blog/referenced-note` will contain the metadata (including `/blog/referencing-note`) of the notes that references it.

### References

The `references` metadata is an array of notes' metadata that the current note references. For example, if you have a note with the following content:

```md
---
id: /blog/referencing-note
title: Referencing Note
---

This note references [Referenced Note](/blog/referenced-note).
```

The `references` metadata of the note `/blog/referencing-note` will contain the metadata (including `/blog/referenced-note`) of the notes that it references.

## Example of a Note Object

<details><summary>Note Object</summary>

```ts
const note = {
  title: 'Note not a draft and reference another',
  date: '2020-01-01',
  description: 'This is note not a draft.',
  slug: 'note-not-a-draft-and-reference-note-not-a-draft',
  group: '/blog',
  content:
    '\n' +
    'This note is not a draft and reference [Note not a draft](/blog/note-not-a-draft). The `references` metadata of this note should contain "Note not a draft" id and "Note not a draft" backlinks should contain the id of this note.\n',
  id: '/blog/note-not-a-draft-and-reference-note-not-a-draft',
  formattedDate: 'January 1st, 2020',
  tags: [],
  draft: false,
  href: '/blog/note-not-a-draft-and-reference-note-not-a-draft',
  readingTime: 1,
  references: [
    {
      title: 'Note not a draft',
      date: '2020-01-01',
      description: 'This is note not a draft.',
      slug: 'note-not-a-draft',
      group: '/blog',
      id: '/blog/note-not-a-draft',
      formattedDate: 'January 1st, 2020',
      tags: [],
      draft: false,
      href: '/blog/note-not-a-draft',
      readingTime: 1,
    },
  ],
  backlinks: [],
  recommendations: [
    {
      title: 'Note not a draft',
      date: '2020-01-01',
      description: 'This is note not a draft.',
      slug: 'note-not-a-draft',
      group: '/blog',
      id: '/blog/note-not-a-draft',
      formattedDate: 'January 1st, 2020',
      tags: [],
      draft: false,
      href: '/blog/note-not-a-draft',
      readingTime: 1,
      references: [],
      backlinks: [Array],
      isReference: true,
    },
  ],
};
```

</details>
