import { rollup } from 'rollup';
import nodeResolve from 'rollup-plugin-node-resolve';

export async function build() {
  const bundle = await rollup({
    input: '../testWade/src/thing.js',
    plugins: [
      nodeResolve(),
    ],
  });

  // console.log(bundle.watchFiles); // an array of file names this bundle depends on

  await bundle.write({
    file: '../testWade/dist/thing.bundle.js',
    format: 'iife',
  });
}
