import { fsNotesClient } from '../../src';
import { zettelkasten } from '../zettelkasten';

const zettelkastenMethods = async () => {
  await zettelkasten.getNotes({ includeDrafts: true });
  await zettelkasten.getGroups();
  await zettelkasten.getTags();
};

test('should cache readings', async () => {
  const getDirectoriesSpy = jest.spyOn(fsNotesClient, 'getDirectories');
  const readAllMarkdownFilesFromDirectorySpy = jest.spyOn(
    fsNotesClient,
    'readAllMarkdownFilesFromDirectory'
  );

  await zettelkastenMethods();

  getDirectoriesSpy.mockClear();
  readAllMarkdownFilesFromDirectorySpy.mockClear();

  await zettelkastenMethods();

  expect(getDirectoriesSpy).not.toHaveBeenCalled();
  expect(readAllMarkdownFilesFromDirectorySpy).not.toHaveBeenCalled();
});
