# Digital Garden

This is a digital garden using Tereza's tools. We're using the [zettel](https://github.com/terezatech/tereza-tech/tree/main/packages/zettel) package as the engine of our Zettelkasten notes. The notes are written in markdown and are stored in the `notes` directory. The notes are then compiled into a static site using [Next.js](https://nextjs.org/).

## Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fterezatech%2Ftereza-tech%2Ftree%2Fmain%2Fapps%2Fdigital-garden)

## Getting Started

To get started, clone the repo and install the dependencies:

```bash
git clone https://github.com/terezatech/tereza-tech.git
cd tereza-tech/apps/digital-garden
yarn
```

To start the development server, run:

```bash
yarn dev
```

Open your browser and navigate to the same paths as the notes in the `notes` directory. For example, if you have a note at `notes/programming/javascript.md`, you can navigate to `http://localhost:3000/programming/javascript` to see the note.
