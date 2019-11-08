#!/usr/bin/env node
import * as program from 'commander';

import { init } from './commands/init';

program.name('wam').version('0.1.0');

program
  .command('init [directory]')
  .description('initialize a new project in a directory (default: ".")')
  .action(init)
  .alias('i');

program.parse(process.argv);

if (program.args.length === 0) {
  program.help();
}
