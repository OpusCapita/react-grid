const { NODE_ENV, BUILD_ENV } = process.env;

const cacheKey = `${NODE_ENV}-${BUILD_ENV}`;

const presetOptions = BUILD_ENV === 'hot' || BUILD_ENV === 'umd' || BUILD_ENV === 'es'
  ? { loose: true, modules: false }
  : { loose: true };

const plugins = [
  // Stage 1
  '@babel/plugin-proposal-export-default-from',
  // '@babel/plugin-proposal-logical-assignment-operators',
  // ['@babel/plugin-proposal-optional-chaining', { loose: false }],
  // ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
  // ['@babel/plugin-proposal-nullish-coalescing-operator', { loose: false }],
  // '@babel/plugin-proposal-do-expressions',

  // Stage 2
  ['@babel/plugin-proposal-decorators', { legacy: true }],
  // '@babel/plugin-proposal-function-sent',
  '@babel/plugin-proposal-export-namespace-from',
  // '@babel/plugin-proposal-numeric-separator',
  // '@babel/plugin-proposal-throw-expressions',

  // Stage 3
  '@babel/plugin-syntax-dynamic-import',
  // '@babel/plugin-syntax-import-meta',
  ['@babel/plugin-proposal-class-properties', { loose: false }],
  // '@babel/plugin-proposal-json-strings',
];

// Note that production babel conf have been moved to webpack.config.js due to mysterios error in CI
if (NODE_ENV === 'production') {
  plugins.push('transform-react-remove-prop-types');
}

if (BUILD_ENV === 'hot') {
  plugins.push('react-hot-loader/babel');
}

module.exports = (api) => {
  api.cache(() => cacheKey);
  return {
    presets: [
      ['@babel/preset-env', presetOptions],
      '@babel/preset-react',
    ],
    plugins,
  };
};
