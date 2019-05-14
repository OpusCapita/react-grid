const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const flexbugs = require('postcss-flexbugs-fixes');
const packageConfig = require('./package.json');

const libraryName = packageConfig.name.replace('@opuscapita/', '');

const isProd = process.env.NODE_ENV === 'production';

const PATHS = {
  root: __dirname,
  build: path.join(__dirname, 'lib', 'umd'),
  context: path.join(__dirname, 'src'),
  jsFileName: isProd ? `${libraryName}.min.js` : `${libraryName}.js`,
  entry: path.join(__dirname, 'src', 'index.js'),
};

/*
* BASE CONFIG FOR ALL ENVS
*/
const baseConfig = {
  context: PATHS.context,
  entry: [
    PATHS.entry,
  ],
  output: {
    path: PATHS.build,
    filename: PATHS.jsFileName,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
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
  resolve: {
    modules: [
      path.resolve('./src'),
      'node_modules',
    ],
    extensions: ['.js', '.jsx'],
    mainFields: ['es', 'cjs', 'browser', 'module', 'es:next', 'main'],
  },
  // Add your peer dependencies here to avoid bundling them to build
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
      umd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
      umd: 'react-dom',
    },
  },
};

/*
* DEVELOPMENT CONFIG
*/
const devConfig = {
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
};

/*
* PRODUCTION CONFIG
*/
const prodConfig = {
  mode: 'production',
  devtool: false,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
};

module.exports = merge(baseConfig, isProd ? prodConfig : devConfig);
