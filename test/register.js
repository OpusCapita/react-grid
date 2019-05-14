// By default all requires to node_modules will be ignored
// https://babeljs.io/docs/en/babel-register#ignores-node-modules-by-default
require('@babel/register')();
require('raf/polyfill');
require('ignore-styles');
require('global-jsdom')(undefined, {
  url: 'http://localhost',
});
