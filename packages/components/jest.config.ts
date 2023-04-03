import { jestConfig } from '@ttoss/config';

const config = jestConfig({
  // setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
  moduleNameMapper: {
    'react-markdown': [
      '<rootDir>/../../node_modules/react-markdown/react-markdown.min.js',
      '<rootDir>/node_modules/react-markdown/react-markdown.min.js',
    ],
  },
  testEnvironment: 'jsdom',
});

export default config;
