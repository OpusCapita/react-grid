/* eslint-disable no-unused-expressions, prefer-arrow-callback, react/jsx-filename-extension */
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Map, fromJS } from 'immutable';
import { Provider } from 'react-intl-redux';
import configureMockStore from 'redux-mock-store';

import { Datagrid } from '../../src';
import { GRID, columns, data } from './datagrid.constants';

describe('Datagrid component', () => {
  const mockStore = configureMockStore();
  const store = mockStore({
    configuration: { apiAddress: '' },
    intl: {
      locale: 'en',
      messages: {
        Yes: 'Yes',
        No: 'No',
        Save: 'Save',
      },
    },
    user: Map({
      user: Map({ language: 'en' }),
    }),
    datagrid: fromJS({
      TestGrid: {
        data,
        allData: data,
        session: {
          isEditing: false,
          isCreating: false,
          isBusy: false,
        },
        config: {
          filteringData: {
            isFiltering: false,
          },
          visibleColumns: columns.map(c => c.valueKeyPath.join('/')),
          selectedItems: [],
        },
      },
    }),
  });
  const props = {
    grid: GRID,
    columns,
    isEditable: true,
  };
  const wrapper = mount(
    <Provider store={store}>
      <Datagrid {...props} />
    </Provider>,
  );

  // TODO: Row elemets does not exist, why??
  // const cellEls = wrapper.find('.oc-datagrid-row').first().find('.oc-datagrid-tooltip');

  it('should render text cell'); /*, function it() {
    expect(cellEls
      .at(0)
      .text(),
    ).to.eql('Text 1');
  });*/

  it('should render number cell');
  it('should render float cell');
  it('should render boolean cell');
  it('should render date cell');

  it('should render edit text cell');
  it('should render edit number cell');
  it('should render edit float cell');
  it('should render edit boolean cell');
  it('should render edit date cell');
  it('should render edit select cell');

  it('should render create text cell');
  it('should render create number cell');
  it('should render create float cell');
  it('should render create boolean cell');
  it('should render create date cell');
  it('should render create select cell');

  it('should render filtering text cell');
  it('should render filtering number cell');
  it('should render filtering float cell');
  it('should render filtering boolean cell');
  it('should render filtering date cell');
  it('should render filtering select cell');

});
