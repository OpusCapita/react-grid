/* eslint-disable no-unused-expressions, function-paren-newline */
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Map, fromJS } from 'immutable';
import { Provider } from 'react-intl-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { Datagrid } from '../../src';
import { GRID, columns, data } from './datagrid.constants';
import translations from '../../src_docs/translations.json';

describe('Datagrid in Edit mode', () => {
  const mockStore = configureMockStore([thunk]);
  const store = mockStore({
    configuration: { apiAddress: '' },
    intl: {
      locale: 'en',
      messages: translations,
    },
    user: Map({
      user: Map({ language: 'en' }),
    }),
    datagrid: fromJS({
      TestGrid: {
        data,
        allData: data,
        session: {
          isEditing: true,
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
    inlineEdit: true,
  };
  const wrapper = mount(
    <Provider store={store}>
      <Datagrid {...props} />
    </Provider>,
  );

  beforeEach(() => {
    // Without this find does not find all element
    wrapper.update();
  });

  it('should render edit controls', () => {
    const saveButton = wrapper.find('button#oc-datagrid-controls-save-TestGrid');
    expect(saveButton.childAt(0).text()).to.eql('Save');
    const cancelButton = wrapper.find('button#oc-datagrid-controls-cancel-TestGrid');
    expect(cancelButton.childAt(0).text()).to.eql('Cancel');
  });

  it('should render text cell', () => {
    const el = wrapper.find('input#ocDatagridEditInput-TestGrid-text-0');
    expect(el.prop('value')).to.eql(data[0].text);
  });

  it('should render number cell', () => {
    const el = wrapper.find('input#ocDatagridEditInput-TestGrid-number-0');
    expect(parseInt(el.prop('value'), 10)).to.eql(data[0].number);
  });

  it('should render float cell', () => {
    const el = wrapper.find('input#ocDatagridEditInput-TestGrid-float-0');
    expect(parseFloat(el.prop('value'))).to.eql(data[0].float);
  });

  it('should render boolean cell', () => {
    const el = wrapper.find('input[name="ocDatagridEditInput-TestGrid-boolean-0"]').first();
    expect(!!el.prop('value')).to.eql(data[0].boolean);
  });

  it('should render date cell', () => {
    const el = wrapper.find('input#ocDatagridEditInput-TestGrid-date-0');
    expect(el.prop('value')).to.eql('04/20/2011');
  });

  it('should render select cell', () => {
    const el = wrapper.find('input[name="ocDatagridEditInput-TestGrid-select-0"]').first();
    expect(el.prop('value')).to.eql(data[0].select);
  });
});
