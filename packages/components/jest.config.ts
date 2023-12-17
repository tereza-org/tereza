import { jestConfig } from '@ttoss/config';

const config = jestConfig({
  // setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['node_modules/(?!rehype-raw)/'],
});

// eslint-disable-next-line import/no-default-export
export default config;
