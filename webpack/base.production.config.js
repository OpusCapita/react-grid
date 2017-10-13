/* eslint-disable no-unused-vars */
const webpack = require('webpack');

function getBaseEnvConfiguration(config) {
  return {
    devtool: 'source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        output: {
          comments: false,
        },
      }),
    ],
  };
}

module.exports = getBaseEnvConfiguration;
