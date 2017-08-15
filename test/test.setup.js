import chai from 'chai';
import chaiImmutable from 'chai-immutable';

import mockStorage from './storage.mock';

chai.use(chaiImmutable);

// Configure JSDOM and set global variables
// to simulate a browser environment for tests.
const jsdom = require('jsdom').jsdom;

const exposedProperties = ['window', 'navigator', 'document'];

global.localStorage = mockStorage();
global.sessionStorage = mockStorage();
global.document = jsdom('');
global.window = document.defaultView;

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js',
};
