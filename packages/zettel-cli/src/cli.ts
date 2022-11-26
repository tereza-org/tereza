import * as yargs from 'yargs';

export const cli = () =>
  yargs
    .strict()
    .scriptName('zettelkasten')
    .command({
      command: 'normalize',
      describe: false,
      // eslint-disable-next-line no-console
      handler: (argv) => console.log(JSON.stringify(argv, null, 2)),
    });
