import { rollup } from 'rollup';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
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
    pluginList.push(typescript());
  }

  pluginList.push(rollupWoT({ mainFile: file! }));

  const bundle = await rollup({
    input: file,
    plugins: pluginList,
  });

  await bundle.write({
    file: output,
    format: 'cjs',
    sourcemap: true,
  });
}
