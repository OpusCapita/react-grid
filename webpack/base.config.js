/* eslint-disable global-require, no-console */
const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const flexbugs = require('postcss-flexbugs-fixes');
const colors = require('colors/safe');
const utils = require('./utils.js');

const target = utils.getTarget();
const isMinimized = !!target === 'production';

let getBaseEnvConfiguration;

switch (target) {
  case 'production':
    getBaseEnvConfiguration = require('./base.production.config.js');
    break;
  case 'release':
    getBaseEnvConfiguration = require('./base.release.config.js');
    break;
  default:
    getBaseEnvConfiguration = require('./base.development.config.js');
}

function getBaseConfiguration(config) {
  console.log(`${colors.green.underline('Building:')} ${colors.yellow(`${config.buildPath}/${config.output.filename}`)} ${colors.grey(`[${target}]`)}`);
  return merge(getBaseEnvConfiguration(config), {
    entry: config.entry,
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
        {
          test: /\.ejs$/,
          use: [
            'ejs-loader?variable=data',
          ],
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [flexbugs, precss, autoprefixer],
                minimize: isMinimized,
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.ico$/,
          use: [
            'file-loader?name=[name].[ext]',
          ],
          include: /images/,
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [flexbugs, precss, autoprefixer],
                minimize: isMinimized,
              },
            },
          ],
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
  });
}

module.exports = getBaseConfiguration;
