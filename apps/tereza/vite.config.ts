import { babelConfig } from '@ttoss/config';
import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';
import react from '@vitejs/plugin-react-swc';
import relay from 'vite-plugin-relay';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: {},
  },
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
  ],
  resolve: {
    alias: {
      './runtimeConfig': './runtimeConfig.browser',
    },
  },
});
