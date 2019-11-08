import { rollup } from 'rollup';
import nodeResolve from 'rollup-plugin-node-resolve';

export async function build(file: string, output: string) {
  if (!file) {
    throw new Error('No input file selected');
  }

  const bundle = await rollup({
    input: file,
    plugins: [nodeResolve()],
  });

  await bundle.write({
    file: output,
    format: 'cjs',
    sourcemap: true,
  });
}
