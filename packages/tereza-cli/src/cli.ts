import * as yargs from 'yargs';

export const cli = () => {
  return yargs
    .strict()
    .scriptName('tereza')
    .command({
      command: 'zettel',
      describe: false,
      handler: (argv) => {
        // eslint-disable-next-line no-console
        return console.log(JSON.stringify(argv, null, 2));
      },
    });
};
