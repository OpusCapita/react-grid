import { intlReducer } from 'react-intl-redux';
import { combineReducers } from 'redux';
import { datagridReducer } from '../../src/index';

export default combineReducers({
  intl: intlReducer,
  datagrid: datagridReducer,
});
