import { rollup } from 'rollup';
import nodeResolve from 'rollup-plugin-node-resolve';

export async function build() {
  const bundle = await rollup({
    input: '../testWade/src/thing.js',
    plugins: [nodeResolve()],
  });

  await bundle.write({
    file: '../testWade/dist/thing.bundle.js',
    format: 'cjs',
    sourcemap: true,
  });
}
