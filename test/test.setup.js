import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import { JSDOM } from 'jsdom';

import mockStorage from './storage.mock';

chai.use(chaiImmutable);

// Configure JSDOM and set global variables
// to simulate a browser environment for tests.

const exposedProperties = ['window', 'navigator', 'document'];
const jsdom = new JSDOM('');

global.localStorage = mockStorage();
global.sessionStorage = mockStorage();
global.document = jsdom.window.document;
global.window = jsdom.window;

Object.keys(global.window).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js',
};
