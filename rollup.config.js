import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

const env = process.env.NODE_ENV;

const config = {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    typescript({
      typescript: require('typescript'),
    }),
  ],
};

if (env === 'production') {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
      },
      warnings: false,
    })
  );

  config.plugins.push(
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    })
  );
}

export default config;
