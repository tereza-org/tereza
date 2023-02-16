import { tsupConfig } from '@ttoss/config';

export const tsup = tsupConfig({
  external: [
    '@lexical/code',
    '@lexical/link',
    '@lexical/list',
    '@lexical/markdown',
    '@lexical/rich-text',
    '@lexical/selection',
    '@lexical/table',
    '@lexical/utils',
  ],
});
