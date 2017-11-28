/* eslint-disable global-require, no-console */
const path = require('path');
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const flexbugs = require('postcss-flexbugs-fixes');
const colors = require('colors/safe');
const utils = require('./utils.js');

const isProduction = utils.isProduction();

let getBaseEnvConfiguration;

if (isProduction) {
  getBaseEnvConfiguration = require('./base.production.config.js');
} else {
  getBaseEnvConfiguration = require('./base.development.config.js');
}

function getBaseConfiguration(config) {
  console.log(`${colors.green.underline('Building:')} ${colors.yellow(`${config.buildPath}/${config.output.filename}`)} ${colors.grey(`[${isProduction ? 'production' : 'development'}]`)}`);
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
          exclude: {
            test: path.resolve(__dirname, '..', 'node_modules'),
            exclude: path.resolve(__dirname, '..', 'node_modules', '@opuscapita', 'react-perfect-scrollbar'),
          },
        },
        {
          test: /\.ejs$/,
          use: [
            'ejs-loader?variable=data',
          ],
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
                minimize: !!isProduction,
              },
            },
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
                minimize: !!isProduction,
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.svg$/,
          exclude: path.resolve(__dirname, '..', 'node_modules', 'font-awesome'),
          use: ['babel-loader', 'react-svg-loader'],
        },
        {
          test: /\.svg$/,
          include: path.resolve(__dirname, '..', 'node_modules', 'font-awesome'),
          use: ['file-loader?name=[name].[ext]'],
        },
        {
          test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            'url-loader?limit=100&mimetype=application/font-woff&name=[name].[ext]',
          ],
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            'url-loader?limit=100&mimetype=application/octet-stream&name=[name].[ext]',
          ],
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            'file-loader?name=[name].[ext]',
          ],
        },
        {
          test: /\.ico$/,
          use: [
            'file-loader?name=[name].[ext]',
          ],
          include: /images/,
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
  });
}

module.exports = getBaseConfiguration;
