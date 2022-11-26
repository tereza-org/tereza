/**
 * Mock fs.promises.writeFile to avoid writing on __mocks__/posts.
 */
jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  promises: {
    ...jest.requireActual('fs').promises,
    writeFile: jest.fn(),
  },
}));
