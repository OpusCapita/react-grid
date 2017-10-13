const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

function getBaseEnvConfiguration(config) {
  return {
    devtool: 'eval',
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
      new webpack.optimize.ModuleConcatenationPlugin(),
    ],
  };
}

module.exports = getBaseEnvConfiguration;
