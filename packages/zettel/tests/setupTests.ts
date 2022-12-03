/**
 * Mock fs.promises.writeFile to avoid writing on __mocks__/notes.
 */
jest.mock('fs', () => {
  return {
    ...jest.requireActual('fs'),
    promises: {
      ...jest.requireActual('fs').promises,
      writeFile: jest.fn(),
    },
  };
});
