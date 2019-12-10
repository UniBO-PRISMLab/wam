import { rollup } from 'rollup';
import nodeResolve from 'rollup-plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { Command } from 'commander';

export async function build(file: string, output: string, cmd: Command) {
  if (!file) {
    throw new Error('No input file selected');
  }

  const pluginList = [nodeResolve()];

  if (cmd.opts().typescript) {
    pluginList.push(typescript());
  }

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
