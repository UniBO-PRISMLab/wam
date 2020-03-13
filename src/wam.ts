#!/usr/bin/env node
// tslint:disable:no-console
import program from 'commander';

import { init } from './commands/init';
import { build } from './commands/build';
import figlet from 'figlet';
import chalk from 'chalk';

program.name('wam').version('0.2.0');

program.on('command:*', cmd => {
  console.log('Invalid command', cmd[0]);
  program.help();
});

program
  .command('init [directory]')
  .description('initialize a new project in a directory (default: ".")')
  .action(init)
  .alias('i');

program
  .command('build [file] [output]')
  .description('package the application in a single Thing Application Script')
  .option('-t, --typescript', 'Activate TypeScript mode')
  .action(build)
  .alias('b');

figlet.text(
  'WAM',
  {
    font: 'Standard',
  },
  (err, data) => {
    if (data) {
      console.log(chalk.green(data));
    }

    program.parse(process.argv);

    if (program.args.length === 0) {
      program.help();
    }
  },
);
