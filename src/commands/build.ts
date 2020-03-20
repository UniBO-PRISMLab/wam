import { rollup } from 'rollup';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import rollupWoT from '../utils/rollup-wot-plugin';
import { Command } from 'commander';

export async function build(file: string, output: string, cmd: Command) {
  if (!file) {
    throw new Error('No input file selected');
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

  pluginList.push(rollupWoT({ mainFile: file }));

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
