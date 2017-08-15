/* eslint-disable no-unused-expressions, func-names, no-nested-ternary */

import Immutable from 'immutable';
import { expect } from 'chai';
import sinon from 'sinon';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actions from '../../src/datagrid/datagrid.actions';
import { INITIAL_STATE } from '../../src/datagrid/datagrid.constants';

describe('Datagrid actions', () => {
  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);
  const GRID_ID = 'testgrid';
  const GRID_DATA = [
    { id: 1, name: 'Mary', age: 35, married: true, dob: '1980-10-11T00:00:00Z' },
    { id: 2, name: 'John', age: 9, married: false, dob: '1985-10-11T00:00:00Z' },
    { id: 3, name: 'Michael', age: 56, married: false, dob: '1962-10-11T00:00:00Z' },
    { id: 4, name: 'Jake', age: 66, married: true, dob: '1975-10-11T00:00:00Z' },
    { id: 5, name: 'Ava', age: 16, married: false, dob: '1998-10-11T00:00:00Z' },
  ];

  before(function () {
    // set grid data to store state, imitate setData reducer
    const data = Immutable.fromJS(GRID_DATA);
    const state = {
      datagrid: INITIAL_STATE.mergeDeepIn([GRID_ID], {
        data,
        allData: data,
        session: {
          isEditing: false,
          isCreating: false,
          isFiltering: false,
          isBusy: false,
        },
      }),
    };
    this.store = mockStore(state);
  });

  afterEach(function () {
    this.store.clearActions();
  });

  it('invalidate data', function () {
    const action = actions.invalidate(GRID_ID);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_INVALIDATE,
      id: GRID_ID,
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('set data', function () {
    const action = actions.setData(GRID_ID, GRID_DATA);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_SET_DATA,
      id: GRID_ID,
      data: GRID_DATA,
    };

    this.store.dispatch(action);

    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('set as busy', function () {
    const action = actions.setBusy(GRID_ID);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_BUSY,
      id: GRID_ID,
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('set as ready', function () {
    const action = actions.setReady(GRID_ID);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_READY,
      id: GRID_ID,
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('sort string data', function () {
    const expectedSortedData = Immutable.fromJS([
      { id: 5, name: 'Ava', age: 16, married: false, dob: '1998-10-11T00:00:00Z' },
      { id: 4, name: 'Jake', age: 66, married: true, dob: '1975-10-11T00:00:00Z' },
      { id: 2, name: 'John', age: 9, married: false, dob: '1985-10-11T00:00:00Z' },
      { id: 1, name: 'Mary', age: 35, married: true, dob: '1980-10-11T00:00:00Z' },
      { id: 3, name: 'Michael', age: 56, married: false, dob: '1962-10-11T00:00:00Z' },
    ]);
    const action = actions.sort(
      GRID_ID,
      'name',
      d => d.get('name'),            // valueGetter
      (a, b) => a.localeCompare(b),  // string comparator
    );
    const expectedActions = [
      {
        type: actions.TYPES.PLATFORM_DATAGRID_BUSY,
        id: GRID_ID,
      },
      {
        type: actions.TYPES.PLATFORM_DATAGRID_SORT_COLUMN,
        id: GRID_ID,
        column: 'name',
        order: 'asc',
        data: expectedSortedData,
        allData: expectedSortedData,
      },
      {
        type: actions.TYPES.PLATFORM_DATAGRID_READY,
        id: GRID_ID,
      },
    ];

    this.store.dispatch(action);

    expect(this.store.getActions()[0]).to.eql(expectedActions[0]);
    expect(this.store.getActions()[1].type).to.eql(expectedActions[1].type);
    expect(this.store.getActions()[1].id).to.eql(expectedActions[1].id);
    expect(this.store.getActions()[1].column).to.eql(expectedActions[1].column);
    expect(this.store.getActions()[1].order).to.eql(expectedActions[1].order);
    expect(this.store.getActions()[1].data).to.eql(expectedActions[1].data);
    expect(this.store.getActions()[1].allData).to.eql(expectedActions[1].allData);
    expect(this.store.getActions()[2]).to.eql(expectedActions[2]);
  });

  it('sort number data', function () {
    const expectedSortedData = Immutable.fromJS([
      { id: 2, name: 'John', age: 9, married: false, dob: '1985-10-11T00:00:00Z' },
      { id: 5, name: 'Ava', age: 16, married: false, dob: '1998-10-11T00:00:00Z' },
      { id: 1, name: 'Mary', age: 35, married: true, dob: '1980-10-11T00:00:00Z' },
      { id: 3, name: 'Michael', age: 56, married: false, dob: '1962-10-11T00:00:00Z' },
      { id: 4, name: 'Jake', age: 66, married: true, dob: '1975-10-11T00:00:00Z' },
    ]);
    const action = actions.sort(
      GRID_ID,
      'age',
      d => d.get('age'),                         // valueGetter
      (a, b) => (a === b ? 0 : (a < b ? -1 : 1)),  // number comparator
    );
    const expectedActions = [
      {
        type: actions.TYPES.PLATFORM_DATAGRID_BUSY,
        id: GRID_ID,
      },
      {
        type: actions.TYPES.PLATFORM_DATAGRID_SORT_COLUMN,
        id: GRID_ID,
        column: 'age',
        order: 'asc',
        data: expectedSortedData,
        allData: expectedSortedData,
      },
      {
        type: actions.TYPES.PLATFORM_DATAGRID_READY,
        id: GRID_ID,
      },
    ];

    this.store.dispatch(action);

    expect(this.store.getActions()[0]).to.eql(expectedActions[0]);
    expect(this.store.getActions()[1].type).to.eql(expectedActions[1].type);
    expect(this.store.getActions()[1].id).to.eql(expectedActions[1].id);
    expect(this.store.getActions()[1].column).to.eql(expectedActions[1].column);
    expect(this.store.getActions()[1].order).to.eql(expectedActions[1].order);
    expect(this.store.getActions()[1].data).to.eql(expectedActions[1].data);
    expect(this.store.getActions()[1].allData).to.eql(expectedActions[1].allData);
    expect(this.store.getActions()[2]).to.eql(expectedActions[2]);
  });

  it('sort boolean data', function () {
    const expectedSortedData = Immutable.fromJS([
      { id: 1, name: 'Mary', age: 35, married: true, dob: '1980-10-11T00:00:00Z' },
      { id: 4, name: 'Jake', age: 66, married: true, dob: '1975-10-11T00:00:00Z' },
      { id: 2, name: 'John', age: 9, married: false, dob: '1985-10-11T00:00:00Z' },
      { id: 3, name: 'Michael', age: 56, married: false, dob: '1962-10-11T00:00:00Z' },
      { id: 5, name: 'Ava', age: 16, married: false, dob: '1998-10-11T00:00:00Z' },
    ]);
    const action = actions.sort(
      GRID_ID,
      'married',
      d => d.get('married'),                     // valueGetter
      (a, b) => (a === b ? 0 : (a ? -1 : 1)),    // boolean comparator
    );
    const expectedActions = [
      {
        type: actions.TYPES.PLATFORM_DATAGRID_BUSY,
        id: GRID_ID,
      },
      {
        type: actions.TYPES.PLATFORM_DATAGRID_SORT_COLUMN,
        id: GRID_ID,
        column: 'married',
        order: 'asc',
        data: expectedSortedData,
        allData: expectedSortedData,
      },
      {
        type: actions.TYPES.PLATFORM_DATAGRID_READY,
        id: GRID_ID,
      },
    ];

    this.store.dispatch(action);

    expect(this.store.getActions()).to.eql(expectedActions);
  });

  it('sort datetime data', function () {
    const expectedSortedData = Immutable.fromJS([
      { id: 5, name: 'Ava', age: 16, married: false, dob: '1998-10-11T00:00:00Z' },
      { id: 2, name: 'John', age: 9, married: false, dob: '1985-10-11T00:00:00Z' },
      { id: 1, name: 'Mary', age: 35, married: true, dob: '1980-10-11T00:00:00Z' },
      { id: 4, name: 'Jake', age: 66, married: true, dob: '1975-10-11T00:00:00Z' },
      { id: 3, name: 'Michael', age: 56, married: false, dob: '1962-10-11T00:00:00Z' },
    ]);
    const action = actions.sort(
      GRID_ID,
      'dob',
      d => d.get('dob'),                   // valueGetter
      (a, b) => new Date(b) - new Date(a), // boolean comparator
    );
    const expectedActions = [
      {
        type: actions.TYPES.PLATFORM_DATAGRID_BUSY,
        id: GRID_ID,
      },
      {
        type: actions.TYPES.PLATFORM_DATAGRID_SORT_COLUMN,
        id: GRID_ID,
        column: 'dob',
        order: 'asc',
        data: expectedSortedData,
        allData: expectedSortedData,
      },
      {
        type: actions.TYPES.PLATFORM_DATAGRID_READY,
        id: GRID_ID,
      },
    ];

    this.store.dispatch(action);

    expect(this.store.getActions()[0]).to.eql(expectedActions[0]);
    expect(this.store.getActions()[1].type).to.eql(expectedActions[1].type);
    expect(this.store.getActions()[1].id).to.eql(expectedActions[1].id);
    expect(this.store.getActions()[1].column).to.eql(expectedActions[1].column);
    expect(this.store.getActions()[1].order).to.eql(expectedActions[1].order);
    expect(this.store.getActions()[1].data).to.eql(expectedActions[1].data);
    expect(this.store.getActions()[1].allData).to.eql(expectedActions[1].allData);
    expect(this.store.getActions()[2]).to.eql(expectedActions[2]);
  });

  it('resize column', function () {
    const action = actions.resizeColumn(GRID_ID, 'colname', 1234);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_RESIZE_COLUMN,
      id: GRID_ID,
      column: 'colname',
      width: 1234,
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('call edit', function () {
    const action = actions.edit(GRID_ID);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_EDIT,
      id: GRID_ID,
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('call cancel', function () {
    const action = actions.cancel(GRID_ID);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_CANCEL,
      id: GRID_ID,
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('call save', function () {
    const spy = sinon.spy();
    const action = actions.save(GRID_ID, spy);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_SAVE,
      id: GRID_ID,
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
    expect(spy.calledOnce).to.be.true;
  });

  it('call save success', function () {
    const action = actions.saveSuccess(GRID_ID, ['id'], [1, 2, 3]);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_SAVE_SUCCESS,
      id: GRID_ID,
      idKeyPath: ['id'],
      savedItems: [1, 2, 3],
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('call save partial success', function () {
    const action = actions.savePartialSuccess(GRID_ID, ['id'], [1, 2, 3]);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_SAVE_PARTIAL_SUCCESS,
      id: GRID_ID,
      idKeyPath: ['id'],
      savedItems: [1, 2, 3],
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('call save fail', function () {
    const action = actions.saveFail(GRID_ID);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_SAVE_FAIL,
      id: GRID_ID,
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('call create', function () {
    const action = actions.create(GRID_ID, {});
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_CREATE,
      id: GRID_ID,
      columnDefaultValues: {},
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('call add new item', function () {
    const action = actions.addNewItem(GRID_ID, {});
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_ADD_NEW_ITEM,
      id: GRID_ID,
      columnDefaultValues: {},
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('call remove new item ', function () {
    const action = actions.removeNewItem(GRID_ID, 1);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_REMOVE_NEW_ITEM,
      id: GRID_ID,
      index: 1,
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('call remove', function () {
    const action = actions.remove(GRID_ID);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_REMOVE,
      id: GRID_ID,
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('call remove success', function () {
    const action = actions.removeSuccess(GRID_ID, ['id'], [1, 2, 3]);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_REMOVE_SUCCESS,
      id: GRID_ID,
      idKeyPath: ['id'],
      removedIds: [1, 2, 3],
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('call remove fail', function () {
    const action = actions.removeFail(GRID_ID);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_REMOVE_FAIL,
      id: GRID_ID,
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('call edit cell value change', function () {
    const action = actions.editCellValueChange(GRID_ID, 1, ['data'], 'newval');
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_EDIT_CELL_VALUE_CHANGE,
      id: GRID_ID,
      dataId: 1,
      keyPath: ['data'],
      value: 'newval',
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('validate edited cell value', function () {
    const validator = {
      validate: () => ({ valid: true }),
    };
    const validatorSpy = sinon.spy(validator, 'validate');
    const action = actions.editCellValueValidate(GRID_ID, 1, ['name'], 'John', [validator]);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_CELL_HIDE_MESSAGE,
      id: GRID_ID,
      messageType: 'error',
      dataId: 1,
      keyPath: ['name'],
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
    expect(validatorSpy.calledOnce).to.be.true;
  });

  it('call create cell value change', function () {
    const action = actions.createCellValueChange(GRID_ID, 1, ['data'], 'newval');
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_CREATE_CELL_VALUE_CHANGE,
      id: GRID_ID,
      rowIndex: 1,
      keyPath: ['data'],
      value: 'newval',
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('validate created cell value', function () {
    const validator = {
      validate: () => ({ valid: true }),
    };
    const validatorSpy = sinon.spy(validator, 'validate');
    const action = actions.createCellValueValidate(GRID_ID, 1, ['name'], 'John', [validator]);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_CREATE_CELL_HIDE_MESSAGE,
      id: GRID_ID,
      messageType: 'error',
      rowIndex: 1,
      keyPath: ['name'],
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
    expect(validatorSpy.calledOnce).to.be.true;
  });

  it('show cell message', function () {
    const action = actions.cellShowMessage(GRID_ID, 'warning', 123, ['id'], 'Warning', 1);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_CELL_SHOW_MESSAGE,
      id: GRID_ID,
      messageType: 'warning',
      dataId: 123,
      keyPath: ['id'],
      messageId: 'Warning',
      messageValues: 1,
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('hide cell message', function () {
    const action = actions.cellHideMessage(GRID_ID, 'warning', 123, ['id']);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_CELL_HIDE_MESSAGE,
      id: GRID_ID,
      messageType: 'warning',
      dataId: 123,
      keyPath: ['id'],
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('show create cell message', function () {
    const action = actions.createCellShowMessage(GRID_ID, 'warning', 123, ['id'], 'Warning', 1);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_CREATE_CELL_SHOW_MESSAGE,
      id: GRID_ID,
      messageType: 'warning',
      rowIndex: 123,
      keyPath: ['id'],
      messageId: 'Warning',
      messageValues: 1,
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('hide create cell message', function () {
    const action = actions.createCellHideMessage(GRID_ID, 'warning', 123, ['id']);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_CREATE_CELL_HIDE_MESSAGE,
      id: GRID_ID,
      keyPath: ['id'],
      messageType: 'warning',
      rowIndex: 123,
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('call item selection change', function () {
    const action = actions.itemSelectionChange(GRID_ID, 5, ['id'], true, true);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_ITEM_SELECTION_CHANGE,
      id: GRID_ID,
      rowIndex: 5,
      idKeyPath: ['id'],
      ctrlPressed: true,
      shiftPressed: true,
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('call select all items change', function () {
    const action = actions.selectAllItemsChange(GRID_ID, ['id']);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_SELECT_ALL_ITEMS_CHANGE,
      id: GRID_ID,
      idKeyPath: ['id'],
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('call toggle filtering', function () {
    const action = actions.toggleFiltering(GRID_ID);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_TOGGLE_FILTERING,
      id: GRID_ID,
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('filter data on filter cell value change', function () {
    const expectedFilteredData = Immutable.fromJS([
      { id: 1, name: 'Mary', age: 35, married: true, dob: '1980-10-11T00:00:00Z' },
      { id: 3, name: 'Michael', age: 56, married: false, dob: '1962-10-11T00:00:00Z' },
    ]);
    const expectedFilterData = Immutable.Map({
      name: 'm',
    });
    const action = actions.filterCellValueChange(GRID_ID, ['name'], 'm', {
      name: {
        valueEmptyChecker: val => val !== '',
        filterMatcher: (val, filterVal) => (new RegExp(filterVal, 'i')).test(val),
      },
    });
    const expectedActions = [
      {
        type: actions.TYPES.PLATFORM_DATAGRID_BUSY,
        id: GRID_ID,
      },
      {
        type: actions.TYPES.PLATFORM_DATAGRID_FILTER_CELL_VALUE_CHANGE,
        id: GRID_ID,
        filterData: expectedFilterData,
        data: expectedFilteredData,
      },
      {
        type: actions.TYPES.PLATFORM_DATAGRID_READY,
        id: GRID_ID,
      },
    ];

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedActions[0]);
    expect(this.store.getActions()[2].type).to.eql(expectedActions[2].type);
    expect(this.store.getActions()[2].id).to.eql(expectedActions[2].id);
    expect(this.store.getActions()[2].filterData).to.eql(expectedActions[2].filterData);
    expect(this.store.getActions()[2].data).to.eql(expectedActions[2].data);
    expect(this.store.getActions()[2]).to.eql(expectedActions[2]);
  });

  it('update existing cell value', function () {
    const action = actions.updateExistingCellValue(GRID_ID, 123, ['name'], 'Seth');
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_UPDATE_EXISTING_CELL_VALUE,
      id: GRID_ID,
      dataId: 123,
      keyPath: ['name'],
      value: 'Seth',
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });
});
