const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const params = {
  root: __dirname,
  buildPath: 'examples-build',
  output: {
    path: path.join(__dirname, '/examples-build'),
    filename: 'examples.js',
  },
  entry: {
    app: path.join(__dirname, '/examples/index.jsx'),
  },
};

const getBaseConfiguration = require('./webpack/base.config.js');

const plugins = [
  new HtmlWebpackPlugin({ filename: 'index.html', template: 'examples/index.html' }),
  new webpack.HotModuleReplacementPlugin(),
  new WriteFilePlugin({ log: false }),
  new ProgressBarPlugin({ clear: false }),
];

const config = merge(getBaseConfiguration(params), {
  plugins,
});

const wdsEntries = [
  'webpack-dev-server/client?http://localhost:5555',
  'webpack/hot/only-dev-server',
];

// All entries must include webpack dev server entries
Object.keys(config.entry).forEach((key) => {
  if (Array.isArray(config.entry[key])) {
    config.entry[key] = wdsEntries.concat(config.entry[key]);
  } else {
    const originalEntry = config.entry[key];
    config.entry[key] = wdsEntries.slice(0);
    config.entry[key].push(originalEntry);
  }
});

config.module.rules[0].use = {
  loader: 'babel-loader',
  options: {
    plugins: [
      ['react-transform', {
        transforms: [
          {
            transform: 'react-transform-hmr',
            imports: ['react'],
            locals: ['module'],
          },
          // visually show and count when and why component is rendered
          // { transform: 'react-transform-render-visualizer-fork' },
        ],
      }],
    ],
  },
};

config.devServer = {
  noInfo: true,
  quiet: false,
  port: 5555,
  historyApiFallback: true,
  clientLogLevel: 'error',
  hot: true,
  stats: { colors: true },
  // host: '192.168.0.101', // make dev server available on specific IP
};

module.exports = config;
