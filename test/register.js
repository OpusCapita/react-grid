require('@babel/register')({
  ignore: [/node_modules/],
});
require('raf/polyfill');
require('ignore-styles');
require('global-jsdom')(undefined, {
  url: 'http://localhost',
});
