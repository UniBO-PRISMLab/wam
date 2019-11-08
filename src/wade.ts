#!/usr/bin/env node
import program from 'commander';

import { init } from './commands/init';
import { build } from './commands/build';

program.name('Wade').version('0.1.0');

program
  .command('init [directory]')
  .description('initialize a new project in a directory (default: ".")')
  .action(init)
  .alias('i');

program
  .command('build')
  .description('package the application in a single Thing Application Script')
  .action(build)
  .alias('b');

program.parse(process.argv);

if (program.args.length === 0) {
  program.help();
}
