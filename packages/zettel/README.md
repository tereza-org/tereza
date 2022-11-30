# Zettel

This package provides a engine to handle your Zettelkasten notes.

## Installation

```bash
yarn add @tereza-tech/zettel
```

## Quick start

Create your Zettelkasten notes in a folder, for example `posts`, then instantiate your Zettelkasen engine:

```ts
import { Zettelkasten } from '@tereza-tech/zettel';
import * as path from 'path';

const postsDir = path.join(process.cwd(), 'posts');

const zettelkasten = new Zettelkasten({ postsDir });

(async () => {
  const posts = await zettelkasten.getPosts();

  const blogPost = await zettelkasten.getPosts({ groups: ['blog'] });

  const tags = await zettelkasten.getTags();
})();
```
