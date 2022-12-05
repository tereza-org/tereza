# Zettel

Create your own digital garden with Zettel, an open source engine that implements the [Zettelkasten method](https://arantespp.com/zettel/zettelkasten).

## Installation

```bash
yarn add @tereza-tech/zettel
```

## Quickstart

Create your Zettelkasten notes in a folder, for example `notes`, then instantiate your Zettelkasen engine:

```ts
import { Zettelkasten } from '@tereza-tech/zettel';
import * as path from 'path';

const notesDir = path.join(process.cwd(), 'notes');

const zettelkasten = new Zettelkasten({ notesDir });

(async () => {
  const notes = await zettelkasten.getNotes();

  const blogNote = await zettelkasten.getNotes({ groups: ['blog'] });

  const tags = await zettelkasten.getTags();

  const flashcard = await zettelkasten.getFlashcard();

  const graph = await zettelkasten.getGraphData();
})();
```
