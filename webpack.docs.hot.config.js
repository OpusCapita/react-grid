const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');
const path = require('path');
const merge = require('webpack-merge');
const devConfig = require('./webpack.docs.config');

const hotConfig = {
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new WriteFilePlugin({ log: false }),
  ],
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
      'react-redux': path.resolve('./node_modules/react-redux'),
    },
  },
  devServer: {
    noInfo: true,
    quiet: false,
    port: 5555,
    historyApiFallback: true,
    clientLogLevel: 'error',
    hotOnly: true,
    inline: true,
    stats: { colors: true },
    // host: '192.168.0.101', // make dev server available on specific IP
  },
};

const mergedConfig = merge(devConfig, hotConfig);

module.exports = mergedConfig;
