import { rollup } from 'rollup';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from '@rollup/plugin-json';
import rollupWoT from '../utils/rollup-wot-plugin';
import { Command } from 'commander';
import { existsSync, readFileSync } from 'fs';

export async function build(file: string | undefined, output: string | undefined, cmd: Command) {
  if (!file) {
    if (!existsSync('./package.json')) {
      throw new Error('No input file selected');
    }

    const packageInfo = JSON.parse(readFileSync('./package.json', 'utf8'));

    if (!packageInfo.main) {
      throw new Error('No input file selected: missing main property in package.json');
    }

    file = packageInfo.main;
  }

  if (!output) {
    output = './dist/bundle.js';
  }

  const pluginList = [
    nodeResolve({
      preferBuiltins: true,
    }),
    commonjs(),
    json(),
  ];

  if (cmd.opts().typescript) {
    // Use user defined ts compiler
    module.paths = [`${process.cwd()}\\node_modules`, ...module.paths];
    try {
      const typescriptPlugin = require('@rollup/plugin-typescript');
      const ts = require('typescript');

      pluginList.push(typescriptPlugin({ typescript: ts }));
    } catch (error) {
      // tslint:disable:no-console
      console.error(error);
      console.log();
      console.log('Mmmh.. have you tried:');
      console.log();
      console.log('npm i typescript');
      console.log('npm i @rollup/plugin-typescript');
      return;
    }
  }

  pluginList.push(rollupWoT({ mainFile: file! }));

  const bundle = await rollup({
    context: process.cwd(),
    input: file,
    plugins: pluginList,
  });

  await bundle.write({
    file: output,
    format: 'cjs',
    sourcemap: true,
  });
}
