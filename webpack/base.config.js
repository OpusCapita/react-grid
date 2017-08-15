const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

function getBaseConfiguration(config) {
  return {
    entry: config.entry,
    devtool: 'source-map',
    output: config.output,
    module: {
      rules: [
        {
          test: /(\.jsx|\.js)$/,
          use: [
            'babel-loader',
          ],
          exclude: /(node_modules|bower_components)/,
        },
        {
          test: /\.svg$/,
          use: ['babel-loader', 'react-svg-loader'],
        },
      ],
    },
    resolve: {
      modules: [
        path.resolve('./src'),
        'node_modules',
      ],
      extensions: ['.js', '.jsx'],
    },
    plugins: [
      new CleanWebpackPlugin([config.buildPath], {
        root: config.root,
        verbose: false,
        dry: false,
      }),
    ],
  };
}

module.exports = getBaseConfiguration;
