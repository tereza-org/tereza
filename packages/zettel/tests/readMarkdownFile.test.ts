import { Zettelkasten } from '../src';

test('return undefinde if file not exist', async () => {
  const file = await Zettelkasten.readMarkdownFile(
    '/path/that/i/hope/not/exist'
  );
  expect(file).toBeUndefined();
});
