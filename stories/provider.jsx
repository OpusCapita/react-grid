import React from 'react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl-redux';
import PropTypes from 'prop-types';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
// App
import reducers from './reducers';
import translations from './translations.json';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = {
  intl: {
    locale: 'en',
    messages: translations,
  },
};
export const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(thunk)),
);

export default class ProviderHOC extends React.PureComponent {
  static propTypes = { children: PropTypes.node.isRequired };

  render() {
    const { children } = this.props;
    return (
      <Provider store={store}>
        <IntlProvider locale="en">
          {children}
        </IntlProvider>
      </Provider>
    );
  }
}
