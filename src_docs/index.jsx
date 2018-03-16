/* eslint-disable no-underscore-dangle */
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
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

@hot(module)
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <IntlProvider locale="en">
          <Router>
            <Route path="/" component={ExampleContainer} />
          </Router>
        </IntlProvider>
      </Provider>
    );
  }
}

render(
  <App />,
  document.getElementById('oc-examples'),
);
