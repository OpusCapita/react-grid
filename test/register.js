require('babel-register')({
  ignore: /node_modules/,
});
require('ignore-styles');
require('raf/polyfill');
require('global-jsdom')(undefined, {
  url: 'http://localhost',
});
