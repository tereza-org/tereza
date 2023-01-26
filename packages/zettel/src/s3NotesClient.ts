import {
  GetObjectCommand,
  ListObjectsCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { MarkdownFile, NotesClient } from './NotesClient';
import { Readable } from 'stream';
import { Zettelkasten } from './Zettelkasten';
import matter from 'gray-matter';

/**
 * https://github.com/aws/aws-sdk-js-v3/issues/1877#issuecomment-755430937
 */
const streamToString = async (stream: Readable): Promise<string> => {
  return await new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    stream.on('data', (chunk) => {
      return chunks.push(chunk);
    });
    stream.on('error', reject);
    stream.on('end', () => {
      return resolve(Buffer.concat(chunks).toString('utf-8'));
    });
  });
};

export const S3NotesClient = ({
  bucket,
  region,
}: {
  bucket: string;
  region: string;
}): NotesClient => {
  const s3 = new S3Client({ region });

  const readAllMarkdownFilesFromDirectory = async (dir: string) => {
    const { Contents = [] } = await s3.send(
      new ListObjectsCommand({
        Bucket: bucket,
        Prefix: dir,
      })
    );

    const promises = Contents?.filter((object) => {
      return object.Key && object.Key.endsWith('.md');
    }).map(async (object) => {
      const { Body } = await s3.send(
        new GetObjectCommand({
          Bucket: bucket,
          Key: object.Key,
        })
      );

      if (!Body) {
        return undefined;
      }

      const { data, content } = matter(await streamToString(Body as any));

      /**
       * Get the slug from the filename
       */
      const slug = object.Key?.replace(dir, '').replace('.md', '');

      if (!slug) {
        return undefined;
      }

      data.slug = slug;

      return { data, content };
    });

    const markdowns = (await Promise.all(promises)).filter(
      (markdown): markdown is MarkdownFile => {
        return markdown !== undefined;
      }
    );

    return markdowns;
  };

  const getDirectories = async (dir: string) => {
    const { Contents = [] } = await s3.send(
      new ListObjectsCommand({
        Bucket: bucket,
        // Delimiter: '/',
        Prefix: dir,
      })
    );

    const directories = Contents.map((object) => {
      return object.Key;
    }).filter((key): key is string => {
      return !!key && key.endsWith('/');
    });

    return directories;
  };

  const writeMarkdownFile = async (
    filePath: string,
    markdown: MarkdownFile
  ) => {
    const fileContents = matter.stringify(markdown.content, markdown.data);
    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: filePath,
        Body: fileContents,
      })
    );
  };

  return {
    readAllMarkdownFilesFromDirectory,
    getDirectories,
    writeMarkdownFile,
  };
};

// const z = new Zettelkasten({
//   notesClient: S3NotesClient({
//     bucket: 'terezacloudbucket-production-s3bucket-6te9v1ziehmj',
//     region: 'us-east-1',
//   }),
//   notesDir: 'zettel/',
// });

// z.saveNote({
//   content: 'Hello world',
//   title: 'Hello world',
//   group: 'b',
// })
//   .then(() => {
//     return z.getNotes();
//   })
//   .then((notes) => {
//     console.log(notes);
//   });
