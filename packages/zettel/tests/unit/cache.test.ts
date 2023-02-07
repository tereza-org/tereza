import { Zettelkasten, fsNotesClient } from '../../src';
import { config, zettelkasten } from '../zettelkasten';

const zettelkastenMethods = async (z: Zettelkasten) => {
  await z.getNotes({ includeDrafts: true });
  await z.getGroups();
  await z.getTags();
};

test('should cache readings', async () => {
  const getDirectoriesSpy = jest.spyOn(fsNotesClient, 'getDirectories');
  const readAllMarkdownFilesFromDirectorySpy = jest.spyOn(
    fsNotesClient,
    'readAllMarkdownFilesFromDirectory'
  );

  await zettelkastenMethods(zettelkasten);

  getDirectoriesSpy.mockClear();
  readAllMarkdownFilesFromDirectorySpy.mockClear();

  await zettelkastenMethods(zettelkasten);

  expect(getDirectoriesSpy).not.toHaveBeenCalled();
  expect(readAllMarkdownFilesFromDirectorySpy).not.toHaveBeenCalled();
});

test('should NOT cache readings', async () => {
  const z = new Zettelkasten({ ...config, cache: false });

  const getDirectoriesSpy = jest.spyOn(fsNotesClient, 'getDirectories');
  const readAllMarkdownFilesFromDirectorySpy = jest.spyOn(
    fsNotesClient,
    'readAllMarkdownFilesFromDirectory'
  );

  await zettelkastenMethods(z);

  getDirectoriesSpy.mockClear();
  readAllMarkdownFilesFromDirectorySpy.mockClear();

  await zettelkastenMethods(z);

  expect(getDirectoriesSpy).toHaveBeenCalled();
  expect(readAllMarkdownFilesFromDirectorySpy).toHaveBeenCalled();
});
