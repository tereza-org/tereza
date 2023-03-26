// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { babelConfig } from '@ttoss/config';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import relay from 'vite-plugin-relay';

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  plugins: [
    react({
      babel: {
        plugins: babelConfig().plugins,
      },
    }),
    relay,
  ],
  resolve: {
    alias: {
      './runtimeConfig': './runtimeConfig.browser',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.js', './tests/setupTests.tsx'],
  },
});
