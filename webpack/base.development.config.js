/* eslint-disable no-unused-vars */
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const CleanWebpackPlugin = require('clean-webpack-plugin');

function getBaseEnvConfiguration(config) {
  return {
    devtool: 'eval-source-map',
    plugins: [
      new CleanWebpackPlugin([config.buildPath], {
        root: config.root,
        verbose: false,
        dry: false,
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development'),
        },
      }),
      new WebpackNotifierPlugin(),
      new webpack.NamedModulesPlugin(),
    ],
  };
}

module.exports = getBaseEnvConfiguration;
