#!/usr/bin/env node
import * as program from 'commander';

import { init } from './commands/init';

program.name('Wade').version('0.1.0');

program
  .command('init')
  .description('initialize a new project')
  .option('-d, --directory [path]', 'the directory name to create the project in', '.')
  .action(init)
  .alias('i');

program.parse(process.argv);

if (program.args.length === 0) {
  program.help();
}
