/* eslint-disable no-underscore-dangle */
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux';
import { Provider } from 'react-redux';
import { IntlProvider, intlReducer } from 'react-intl-redux';
import thunk from 'redux-thunk';
import { datagridReducer } from '../src/index';
import translations from './translations.json';
import ExampleContainer from './containers/example.container';

import './app.component.scss';
import './images/favicon.ico';

const composeEnhancers = (process.env.NODE_ENV !== 'production' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
  combineReducers({
    intl: intlReducer,
    datagrid: datagridReducer,
  }),
  {
    intl: {
      locale: 'en',
      messages: translations,
    },
  },
  composeEnhancers(applyMiddleware(thunk)),
);

const renderApp = (Component) => {
  render(
    <AppContainer>
      <Provider store={store}>
        <IntlProvider locale="en">
          <Router>
            <Route path="/" component={Component} />
          </Router>
        </IntlProvider>
      </Provider>
    </AppContainer>,
    document.getElementById('oc-examples'),
  );
};

renderApp(ExampleContainer);

// Webpack Hot Module Replacement API
/* eslint-disable global-require */
if (module.hot) {
  module.hot.accept('./containers/example.container', () => {
    const Comp = require('./containers/example.container').default;
    renderApp(Comp);
  });
}
