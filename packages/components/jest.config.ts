import { jestConfig } from '@ttoss/config';

const config = jestConfig({
  // setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
  testEnvironment: 'jsdom',
});

export default config;
