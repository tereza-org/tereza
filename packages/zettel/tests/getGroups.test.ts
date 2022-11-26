import { zettelkasten } from './zettelkasten';

test('getGroups', () => {
  expect(zettelkasten.getGroups()).toMatchObject(
    expect.arrayContaining(['blog', 'books', 'zettel'])
  );
});
