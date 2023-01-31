import { S3NotesClient } from '../src';

const s3NotesClient = new S3NotesClient({
  bucket: 'zettelkasten',
  region: 'us-east-1',
});

test('should implement NotesClient interface', () => {
  expect(s3NotesClient.getDirectories).toBeDefined();
  expect(s3NotesClient.readAllMarkdownFilesFromDirectory).toBeDefined();
  expect(s3NotesClient.writeMarkdownFile).toBeDefined();
});
