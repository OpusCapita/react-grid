const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const flexbugs = require('postcss-flexbugs-fixes');
const packageConfig = require('./package.json');

const isProd = process.env.NODE_ENV === 'production';

const PATHS = {
  build: path.join(__dirname, 'docs'),
  context: path.join(__dirname, 'src_docs'),
  jsFileName: 'examples.js',
  jsChunkFileName: 'examples.[name].js',
  cssFileName: 'examples.css',
  cssChunkFileName: 'examples.[name].css',
  entry: path.join(__dirname, 'src_docs', 'index.jsx'),
  root: __dirname,
};

/*
* BASE CONFIG FOR ALL ENVS
*/
const baseConfig = {
  context: PATHS.context,
  entry: [
    '@babel/polyfill',
    PATHS.entry,
  ],
  output: {
    path: PATHS.build,
    filename: PATHS.jsFileName,
    chunkFilename: PATHS.jsChunkFileName,
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
        test: /\.svg$/,
        use: [{
          loader: 'babel-loader',
        },
        {
          loader: 'react-svg-loader',
        }],
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
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
          loader: 'file-loader',
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
    new CleanWebpackPlugin({
      verbose: true,
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
  mode: 'development',
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
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
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new WebpackNotifierPlugin({
      title: packageConfig.name,
      contentImage: path.join(__dirname, 'src_docs', 'images', 'favicon.ico'),
    }),
  ],
};

/*
* PRODUCTION CONFIG
*/
const prodConfig = {
  mode: 'production',
  devtool: false,
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
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
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new OptimizeCssAssetsPlugin(),
    new MiniCssExtractPlugin({
      filename: PATHS.cssFileName,
      chunkFilename: PATHS.cssChunkFileName,
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};

module.exports = merge(baseConfig, isProd ? prodConfig : devConfig);
