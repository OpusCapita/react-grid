const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const getBaseConfiguration = require('./webpack/base.config.js');

const params = {
  root: __dirname,
  buildPath: 'docs',
  output: {
    path: path.join(__dirname, '/docs'),
    filename: 'examples.js',
  },
  entry: {
    app: path.join(__dirname, '/examples/index.jsx'),
  },
};

const plugins = [
  new webpack.LoaderOptionsPlugin({
    debug: false,
    noInfo: true,
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.bundle.js',
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'examples/index.html',
  }),
  new ExtractTextPlugin({
    filename: 'styles/[name].[contenthash].css',
    allChunks: true,
  }),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
  }),
];

const config = merge(getBaseConfiguration(params), {
  plugins,
});

module.exports = config;
