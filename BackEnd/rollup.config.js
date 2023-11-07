// rollup.config.js
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'build',
    format: 'esm',
    sourcemap: true
  },
  plugins: [typescript({
    tsconfig:'./tsconfig.json'
  })]
};