require('babel-register')({
  ignore: /node_modules\/(?!@opuscapita\/react-perfect-scrollbar)/,
});
require('ignore-styles');
require('global-jsdom')();
