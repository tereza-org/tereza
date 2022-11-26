# Zettel

This package provides a engine to handle your Zettelkasten notes.

## Installation

```bash
yarn add @terezatech/zettel
```

## Quick start

Create your Zettelkasten notes in a folder, for example `posts`, then instantiate your Zettelkasen engine:

```ts
import { Zettelkasten } from '@terezatech/zettel';
import * as path from 'path';

const postsDir = path.join(__dirname, 'posts');

const zettelkasten = new Zettelkasten({ postsDir });

console.log(zettelkasten.getPosts()); // Prints all posts.

console.log(zettelkasten.getPosts({ groups: ['blog'] })); // Prints all posts in the `blog` group.

console.log(zettelkasten.getTags()); // Prints all tags.
```
