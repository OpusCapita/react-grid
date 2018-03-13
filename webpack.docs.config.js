const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const flexbugs = require('postcss-flexbugs-fixes');

const isProd = process.env.NODE_ENV === 'production';

const PATHS = {
  build: path.join(__dirname, 'docs'),
  context: path.join(__dirname, 'src_docs'),
  jsFileName: 'examples.js',
  entry: path.join(__dirname, 'src_docs', 'index.jsx'),
  root: __dirname,
};

/*
* BASE CONFIG FOR ALL ENVS
*/
const baseConfig = {
  context: PATHS.context,
  entry: [
    'babel-polyfill',
    PATHS.entry,
  ],
  output: {
    path: PATHS.build,
    filename: PATHS.jsFileName,
  },
  module: {
    rules: [
      {
        test: /\.ejs$/,
        use: [
          'ejs-loader?variable=data',
        ],
      },
      {
        test: /(\.jsx|\.js)$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        use: [
          'babel-loader',
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
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.svg$/,
        exclude: path.resolve(__dirname, 'node_modules', 'font-awesome'),
        use: ['babel-loader', 'react-svg-loader'],
      },
      {
        test: /\.svg$/,
        include: path.resolve(__dirname, 'node_modules', 'font-awesome'),
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
          },
        }],
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
            limit: 100,
            mimetype: 'application/font-woff',
          },
        }],
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
            limit: 100,
            mimetype: 'application/octet-stream',
          },
        }],
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
          },
        }],
      },
      {
        test: /\.ico$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        }],
      },
    ],
  },
  node: {
    fs: 'empty',
  },
  plugins: [
    new CleanWebpackPlugin([PATHS.build], {
      root: PATHS.root,
      verbose: true,
      dry: false,
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
    }),
  ],
  resolve: {
    modules: [
      path.resolve('./src'),
      'node_modules',
    ],
    extensions: ['.js', '.jsx'],
    mainFields: ['es', 'cjs', 'browser', 'module', 'es:next', 'main'],
  },
};

/*
* DEVELOPMENT CONFIG
*/
const devConfig = {
  devtool: 'eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new WebpackNotifierPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
};

/*
* PRODUCTION CONFIG
*/
const prodConfig = {
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js',
    }),
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

module.exports = merge(baseConfig, isProd ? prodConfig : devConfig);
