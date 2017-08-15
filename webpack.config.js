const path = require('path');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const flexbugs = require('postcss-flexbugs-fixes');
const merge = require('webpack-merge');

const libraryName = 'react-icons';
const outputJsFile = `${libraryName}.js`;
const outputStyleFile = `${libraryName}.css`;

const getBaseConfiguration = require('./webpack/base.config.js');

const params = {
  root: __dirname,
  buildPath: 'lib',
  output: {
    path: path.join(__dirname, '/lib'),
    filename: outputJsFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  entry: {
    app: path.join(__dirname, '/src/index.js'),
  },
};

const config = merge(getBaseConfiguration(params), {
  devtool: 'source-map',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: process.env.NODE_ENV === 'production',
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [flexbugs, precss, autoprefixer],
              },
            },
            'sass-loader',
          ],
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({ filename: outputStyleFile }),
  ],
});

module.exports = config;
