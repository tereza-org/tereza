import { babelConfig } from '@ttoss/config';
import { defineConfig } from 'vitest/config';
import babel from 'vite-plugin-babel';
import react from '@vitejs/plugin-react-swc';
import relay from 'vite-plugin-relay';

// https://vitejs.dev/config/
export default defineConfig({
  define: {},
  plugins: [
    react(),
    babel({
      babelConfig: {
        babelrc: false,
        configFile: false,
        plugins: babelConfig().plugins,
      },
    }),
    relay,
  ] as any,
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
