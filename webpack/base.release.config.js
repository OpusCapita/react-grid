/* eslint-disable no-unused-vars */
const webpack = require('webpack');

function getBaseEnvConfiguration(config) {
  return {
    devtool: 'source-map',
    plugins: [
      new webpack.optimize.ModuleConcatenationPlugin(),
    ],
  };
}

module.exports = getBaseEnvConfiguration;
