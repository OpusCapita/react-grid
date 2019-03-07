/* eslint-disable no-unused-expressions, func-names, no-nested-ternary */

import { Map, fromJS } from 'immutable';
import { expect } from 'chai';
import sinon from 'sinon';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actions from '../../src/datagrid/datagrid.actions';
import { INITIAL_STATE } from '../../src/datagrid/datagrid.constants';

describe('Datagrid actions', () => {
  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);
  const GRID = {
    id: 'testgrid',
    idKeyPath: ['id'],
  };
  const COLUMNS = [
    {
      header: 'ID',
      valueKeyPath: ['id'],
      valueType: 'number',
      componentType: 'number',
    },
    {
      header: 'Name',
      valueKeyPath: ['name'],
      valueType: 'text',
      componentType: 'text',
    },
    {
      header: 'age',
      valueKeyPath: ['age'],
      valueType: 'number',
      componentType: 'number',
    },
    {
      header: 'married',
      valueKeyPath: ['married'],
      valueType: 'boolean',
      componentType: 'boolean',
    },
    {
      header: 'dob',
      valueKeyPath: ['dob'],
      valueType: 'date',
      componentType: 'date',
    },
  ];
  const GRID_DATA = [
    { id: 1, name: 'Mary', age: 35, married: true, dob: '1980-10-11T00:00:00Z' },
    { id: 2, name: 'John', age: 9, married: false, dob: '1985-10-11T00:00:00Z' },
    { id: 3, name: 'Michael', age: 56, married: false, dob: '1962-10-11T00:00:00Z' },
    { id: 4, name: 'Jake', age: 66, married: true, dob: '1975-10-11T00:00:00Z' },
    { id: 5, name: 'Ava', age: 16, married: false, dob: '1998-10-11T00:00:00Z' },
  ];

  const getState = (id, data, custom = {}) => ({
    datagrid: INITIAL_STATE.mergeDeepIn([id], {
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
      },
      selectedItems: [],
    }).mergeDeepIn([id], custom),
  });

  beforeEach(function () {
    // set grid data to store state, imitate setData reducer
    const state = getState(GRID.id, GRID_DATA);
    this.store = mockStore(state);
  });

  afterEach(function () {
    this.store.clearActions();
  });

  it('invalidate data', function () {
    const action = actions.invalidate(GRID);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_INVALIDATE,
      id: GRID.id,
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('set data', function () {
    const action = actions.setData(GRID, COLUMNS, GRID_DATA);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_SET_DATA,
      id: GRID.id,
      data: fromJS(GRID_DATA),
      config: {
        filteringData: {
          isFiltering: false,
        },
        visibleColumns: [
          'id',
          'name',
          'age',
          'married',
          'dob',
        ],
      },
      selectedItems: [],
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('set as busy', function () {
    const action = actions.setBusy(GRID);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_BUSY,
      id: GRID.id,
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('set as ready', function () {
    const action = actions.setReady(GRID);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_READY,
      id: GRID.id,
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('sort string data', function () {
    const state = getState(GRID.id, GRID_DATA, {
      config: {
        sortingData: {
          sortColumn: 'name',
          sortOrder: 'asc',
        },
      },
    });
    this.store = mockStore(state);
    const expectedSortedData = fromJS([
      { id: 5, name: 'Ava', age: 16, married: false, dob: '1998-10-11T00:00:00Z' },
      { id: 4, name: 'Jake', age: 66, married: true, dob: '1975-10-11T00:00:00Z' },
      { id: 2, name: 'John', age: 9, married: false, dob: '1985-10-11T00:00:00Z' },
      { id: 1, name: 'Mary', age: 35, married: true, dob: '1980-10-11T00:00:00Z' },
      { id: 3, name: 'Michael', age: 56, married: false, dob: '1962-10-11T00:00:00Z' },
    ]);
    const action = actions.sortChange(
      GRID,
      COLUMNS,
      COLUMNS[1],
      'asc',
    );
    const expectedActions = [
      {
        type: actions.TYPES.PLATFORM_DATAGRID_SORT_CHANGE,
        id: GRID.id,
        sortColumn: 'name',
        sortOrder: 'asc',
      },
      {
        type: actions.TYPES.PLATFORM_DATAGRID_BUSY,
        id: GRID.id,
      },
      {
        type: actions.TYPES.PLATFORM_DATAGRID_APPLY_SORT,
        id: GRID.id,
        data: expectedSortedData,
        allData: expectedSortedData,
      },
      {
        type: actions.TYPES.PLATFORM_DATAGRID_READY,
        id: GRID.id,
      },
    ];

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedActions[0]);
    expect(this.store.getActions()[1]).to.eql(expectedActions[1]);
    expect(this.store.getActions()[2].type).to.eql(expectedActions[2].type);
    expect(this.store.getActions()[2].id).to.eql(expectedActions[2].id);
    expect(this.store.getActions()[2].data).to.eql(expectedActions[2].data);
    expect(this.store.getActions()[2].allData).to.eql(expectedActions[2].allData);
    expect(this.store.getActions()[3]).to.eql(expectedActions[3]);
  });

  it('sort number data', function () {
    const state = getState(GRID.id, GRID_DATA, {
      config: {
        sortingData: {
          sortColumn: 'age',
          sortOrder: 'asc',
        },
      },
    });
    this.store = mockStore(state);
    const expectedSortedData = fromJS([
      { id: 2, name: 'John', age: 9, married: false, dob: '1985-10-11T00:00:00Z' },
      { id: 5, name: 'Ava', age: 16, married: false, dob: '1998-10-11T00:00:00Z' },
      { id: 1, name: 'Mary', age: 35, married: true, dob: '1980-10-11T00:00:00Z' },
      { id: 3, name: 'Michael', age: 56, married: false, dob: '1962-10-11T00:00:00Z' },
      { id: 4, name: 'Jake', age: 66, married: true, dob: '1975-10-11T00:00:00Z' },
    ]);
    const action = actions.sortChange(
      GRID,
      COLUMNS,
      COLUMNS[2],
      'asc',
    );
    const expectedActions = [
      {
        type: actions.TYPES.PLATFORM_DATAGRID_SORT_CHANGE,
        id: GRID.id,
        sortColumn: 'age',
        sortOrder: 'asc',
      },
      {
        type: actions.TYPES.PLATFORM_DATAGRID_BUSY,
        id: GRID.id,
      },
      {
        type: actions.TYPES.PLATFORM_DATAGRID_APPLY_SORT,
        id: GRID.id,
        data: expectedSortedData,
        allData: expectedSortedData,
      },
      {
        type: actions.TYPES.PLATFORM_DATAGRID_READY,
        id: GRID.id,
      },
    ];

    this.store.dispatch(action);

    expect(this.store.getActions()[0]).to.eql(expectedActions[0]);
    expect(this.store.getActions()[1]).to.eql(expectedActions[1]);
    expect(this.store.getActions()[2].type).to.eql(expectedActions[2].type);
    expect(this.store.getActions()[2].id).to.eql(expectedActions[2].id);
    expect(this.store.getActions()[2].data).to.eql(expectedActions[2].data);
    expect(this.store.getActions()[2].allData).to.eql(expectedActions[2].allData);
    expect(this.store.getActions()[3]).to.eql(expectedActions[3]);
  });

  it('sort boolean data', function () {
    const state = getState(GRID.id, GRID_DATA, {
      config: {
        sortingData: {
          sortColumn: 'married',
          sortOrder: 'asc',
        },
      },
    });
    this.store = mockStore(state);
    const expectedSortedData = fromJS([
      { id: 1, name: 'Mary', age: 35, married: true, dob: '1980-10-11T00:00:00Z' },
      { id: 4, name: 'Jake', age: 66, married: true, dob: '1975-10-11T00:00:00Z' },
      { id: 2, name: 'John', age: 9, married: false, dob: '1985-10-11T00:00:00Z' },
      { id: 3, name: 'Michael', age: 56, married: false, dob: '1962-10-11T00:00:00Z' },
      { id: 5, name: 'Ava', age: 16, married: false, dob: '1998-10-11T00:00:00Z' },
    ]);
    const action = actions.sortChange(
      GRID,
      COLUMNS,
      COLUMNS[3],
      'asc',
    );
    const expectedActions = [
      {
        type: actions.TYPES.PLATFORM_DATAGRID_SORT_CHANGE,
        id: GRID.id,
        sortColumn: 'married',
        sortOrder: 'asc',
      },
      {
        type: actions.TYPES.PLATFORM_DATAGRID_BUSY,
        id: GRID.id,
      },
      {
        type: actions.TYPES.PLATFORM_DATAGRID_APPLY_SORT,
        id: GRID.id,
        data: expectedSortedData,
        allData: expectedSortedData,
      },
      {
        type: actions.TYPES.PLATFORM_DATAGRID_READY,
        id: GRID.id,
      },
    ];

    this.store.dispatch(action);

    expect(this.store.getActions()[0]).to.eql(expectedActions[0]);
    expect(this.store.getActions()[1]).to.eql(expectedActions[1]);
    expect(this.store.getActions()[2].type).to.eql(expectedActions[2].type);
    expect(this.store.getActions()[2].id).to.eql(expectedActions[2].id);
    expect(this.store.getActions()[2].data).to.eql(expectedActions[2].data);
    expect(this.store.getActions()[2].allData).to.eql(expectedActions[2].allData);
    expect(this.store.getActions()[3]).to.eql(expectedActions[3]);
  });

  it('sort datetime data', function () {
    const state = getState(GRID.id, GRID_DATA, {
      config: {
        sortingData: {
          sortColumn: 'dob',
          sortOrder: 'desc',
        },
      },
    });
    this.store = mockStore(state);
    const expectedSortedData = fromJS([
      { id: 5, name: 'Ava', age: 16, married: false, dob: '1998-10-11T00:00:00Z' },
      { id: 2, name: 'John', age: 9, married: false, dob: '1985-10-11T00:00:00Z' },
      { id: 1, name: 'Mary', age: 35, married: true, dob: '1980-10-11T00:00:00Z' },
      { id: 4, name: 'Jake', age: 66, married: true, dob: '1975-10-11T00:00:00Z' },
      { id: 3, name: 'Michael', age: 56, married: false, dob: '1962-10-11T00:00:00Z' },
    ]);
    const action = actions.sortChange(
      GRID,
      COLUMNS,
      COLUMNS[4],
      'desc',
    );
    const expectedActions = [
      {
        type: actions.TYPES.PLATFORM_DATAGRID_SORT_CHANGE,
        id: GRID.id,
        sortColumn: 'dob',
        sortOrder: 'desc',
      },
      {
        type: actions.TYPES.PLATFORM_DATAGRID_BUSY,
        id: GRID.id,
      },
      {
        type: actions.TYPES.PLATFORM_DATAGRID_APPLY_SORT,
        id: GRID.id,
        data: expectedSortedData,
        allData: expectedSortedData,
      },
      {
        type: actions.TYPES.PLATFORM_DATAGRID_READY,
        id: GRID.id,
      },
    ];

    this.store.dispatch(action);

    expect(this.store.getActions()[0]).to.eql(expectedActions[0]);
    expect(this.store.getActions()[1]).to.eql(expectedActions[1]);
    expect(this.store.getActions()[2].type).to.eql(expectedActions[2].type);
    expect(this.store.getActions()[2].id).to.eql(expectedActions[2].id);
    expect(this.store.getActions()[2].data).to.eql(expectedActions[2].data);
    expect(this.store.getActions()[2].allData).to.eql(expectedActions[2].allData);
    expect(this.store.getActions()[3]).to.eql(expectedActions[3]);
  });

  it('resize column', function () {
    const action = actions.resizeColumn(GRID, 'colname', 1234);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_RESIZE_COLUMN,
      id: GRID.id,
      columnWidths: Map({ colname: 1234 }),
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0].type).to.eql(expectedAction.type);
    expect(this.store.getActions()[0].id).to.eql(expectedAction.id);
    expect(this.store.getActions()[0].columnWidths).to.eql(expectedAction.columnWidths);
  });

  it('call edit', function () {
    const action = actions.edit(GRID);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_EDIT,
      id: GRID.id,
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('call cancel', function () {
    const action = actions.cancel(GRID);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_CANCEL,
      id: GRID.id,
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('call save', function () {
    const spy = sinon.spy();
    const action = actions.save(GRID, spy);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_SAVE,
      id: GRID.id,
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
    expect(spy.calledOnce).to.be.true;
  });

  it('call save success', function () {
    const action = actions.saveSuccess(GRID, COLUMNS, [1, 2, 3]);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_SAVE_SUCCESS,
      id: GRID.id,
      idKeyPath: GRID.idKeyPath,
      savedItems: [1, 2, 3],
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('call save partial success', function () {
    const action = actions.savePartialSuccess(GRID, COLUMNS, [1, 2, 3]);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_SAVE_PARTIAL_SUCCESS,
      id: GRID.id,
      idKeyPath: GRID.idKeyPath,
      savedItems: [1, 2, 3],
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('call save fail', function () {
    const action = actions.saveFail(GRID);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_SAVE_FAIL,
      id: GRID.id,
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('call create', function () {
    const action = actions.create(GRID, {});
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_CREATE,
      id: GRID.id,
      columnDefaultValues: {},
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('call add new item', function () {
    const action = actions.addNewItem(GRID, {});
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_ADD_NEW_ITEM,
      id: GRID.id,
      columnDefaultValues: {},
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('call remove new item', function () {
    const action = actions.removeNewItem(GRID, 1);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_REMOVE_NEW_ITEM,
      id: GRID.id,
      index: 1,
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('call remove new items', function () {
    const action = actions.removeNewItems(GRID, [0, 1, 2]);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_REMOVE_NEW_ITEMS,
      id: GRID.id,
      indexes: [0, 1, 2],
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('call remove', function () {
    const action = actions.remove(GRID);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_REMOVE,
      id: GRID.id,
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('call remove success', function () {
    const action = actions.removeSuccess(GRID, [1, 2, 3]);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_REMOVE_SUCCESS,
      id: GRID.id,
      idKeyPath: GRID.idKeyPath,
      removedIds: [1, 2, 3],
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('call remove fail', function () {
    const action = actions.removeFail(GRID);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_REMOVE_FAIL,
      id: GRID.id,
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('call edit cell value change', function () {
    const action = actions.editCellValueChange(GRID, 1, ['data'], 'newval');
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_EDIT_CELL_VALUE_CHANGE,
      id: GRID.id,
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
    const action = actions.editCellValueValidate(GRID, 1, ['name'], 'John', [validator]);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_CELL_HIDE_MESSAGE,
      id: GRID.id,
      messageType: 'error',
      dataId: 1,
      keyPath: ['name'],
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
    expect(validatorSpy.calledOnce).to.be.true;
  });

  it('call create cell value change', function () {
    const action = actions.createCellValueChange(GRID, 1, ['data'], 'newval');
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_CREATE_CELL_VALUE_CHANGE,
      id: GRID.id,
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
    const action = actions.createCellValueValidate(GRID, 1, ['name'], 'John', [validator]);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_CREATE_CELL_HIDE_MESSAGE,
      id: GRID.id,
      messageType: 'error',
      rowIndex: 1,
      keyPath: ['name'],
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
    expect(validatorSpy.calledOnce).to.be.true;
  });

  it('show cell message', function () {
    const action = actions.cellShowMessage(GRID, 'warning', 123, ['id'], 'Warning', 1);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_CELL_SHOW_MESSAGE,
      id: GRID.id,
      messageType: 'warning',
      dataId: 123,
      keyPath: ['id'],
      messageId: 'Warning',
      messageValues: 1,
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('show cell messages', function () {
    const messages = {
      info: {
        1: {
          id: 'Id message',
          name: 'Name message',
        },
      },
    };
    const action = actions.cellShowMessages(GRID, messages);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_CELL_SHOW_MESSAGES,
      id: GRID.id,
      messages,
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('hide cell message', function () {
    const action = actions.cellHideMessage(GRID, 'warning', 123, ['id']);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_CELL_HIDE_MESSAGE,
      id: GRID.id,
      messageType: 'warning',
      dataId: 123,
      keyPath: ['id'],
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('show create cell message', function () {
    const action = actions.createCellShowMessage(GRID, 'warning', 123, ['id'], 'Warning', 1);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_CREATE_CELL_SHOW_MESSAGE,
      id: GRID.id,
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
    const action = actions.createCellHideMessage(GRID, 'warning', 123, ['id']);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_CREATE_CELL_HIDE_MESSAGE,
      id: GRID.id,
      keyPath: ['id'],
      messageType: 'warning',
      rowIndex: 123,
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('call cell selection change', function () {
    const selectedCell = Map({ rowIndex: 0, columnKey: 'text1' });
    const action = actions.cellSelectionChange(GRID, selectedCell);
    const expectedAction = {
      selectedCell,
      id: GRID.id,
      type: actions.TYPES.PLATFORM_DATAGRID_CELL_SELECTION_CHANGE,
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('call item selection change', function () {
    const action = actions.itemSelectionChange(GRID, 5, true, true);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_ITEM_SELECTION_CHANGE,
      id: GRID.id,
      rowIndex: 5,
      idKeyPath: GRID.idKeyPath,
      ctrlPressed: true,
      shiftPressed: true,
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('call select all items change', function () {
    const action = actions.selectAllItemsChange(GRID);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_SELECT_ALL_ITEMS_CHANGE,
      id: GRID.id,
      idKeyPath: GRID.idKeyPath,
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('call toggle filtering', function () {
    const action = actions.toggleFiltering(GRID);
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_TOGGLE_FILTERING,
      id: GRID.id,
      isFiltering: true,
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('filter data on filter cell value change', function () {
    const state = getState(GRID.id, GRID_DATA, {
      config: {
        filteringData: {
          filterData: { name: 'm' },
        },
      },
    });
    this.store = mockStore(state);
    const expectedFilteredData = fromJS([
      { id: 1, name: 'Mary', age: 35, married: true, dob: '1980-10-11T00:00:00Z' },
      { id: 3, name: 'Michael', age: 56, married: false, dob: '1962-10-11T00:00:00Z' },
    ]);
    const expectedFilterData = Map({
      name: 'm',
    });
    const action = actions.filterCellValueChange(GRID, COLUMNS, COLUMNS[1], 'm');
    const expectedActions = [
      {
        type: actions.TYPES.PLATFORM_DATAGRID_FILTER_DATA_CHANGE,
        id: GRID.id,
        filterData: expectedFilterData,
      },
      {
        type: actions.TYPES.PLATFORM_DATAGRID_BUSY,
        id: GRID.id,
      },
      {
        type: actions.TYPES.PLATFORM_DATAGRID_APPLY_FILTERS,
        id: GRID.id,
        data: expectedFilteredData,
      },
      {
        type: actions.TYPES.PLATFORM_DATAGRID_READY,
        id: GRID.id,
      },
    ];

    this.store.dispatch(action);
    expect(this.store.getActions()[0].type).to.eql(expectedActions[0].type);
    expect(this.store.getActions()[0].id).to.eql(expectedActions[0].id);
    expect(this.store.getActions()[0].filterData).to.eql(expectedActions[0].filterData);
    expect(this.store.getActions()[1]).to.eql(expectedActions[1]);
    expect(this.store.getActions()[2].type).to.eql(expectedActions[2].type);
    expect(this.store.getActions()[2].id).to.eql(expectedActions[2].id);
    expect(this.store.getActions()[2].data).to.eql(expectedActions[2].data);
    expect(this.store.getActions()[3]).to.eql(expectedActions[3]);
  });

  it('update existing cell value', function () {
    const action = actions.updateExistingCellValue(GRID, 123, ['name'], 'Seth');
    const expectedAction = {
      type: actions.TYPES.PLATFORM_DATAGRID_UPDATE_EXISTING_CELL_VALUE,
      id: GRID.id,
      dataId: 123,
      keyPath: ['name'],
      value: 'Seth',
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('set edited data', function () {
    const newData = Map().setIn([1, 'name'], 'abc');
    const action = actions.setEditData(GRID, newData);
    const expectedAction = {
      cellMessages: Map(),
      data: newData,
      id: GRID.id,
      type: actions.TYPES.PLATFORM_DATAGRID_SET_EDIT_DATA,
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('set and apply filters', function () {
    const state = getState(GRID.id, GRID_DATA);
    const initialFilteringData = state.datagrid.getIn([GRID.id, 'config', 'filteringData']);
    const filteringData = initialFilteringData
      .set('isFiltering', true)
      .set('filterData', Map({
        name: 'John',
      }));

    const action = actions.setAndApplyFilters(GRID, COLUMNS, filteringData);
    const expectedAction = {
      filteringData,
      id: GRID.id,
      type: actions.TYPES.PLATFORM_DATAGRID_SET_FILTERS,
    };

    this.store.dispatch(action);
    const allActions = this.store.getActions();

    expect(allActions.length).to.eql(4);
    expect(allActions[0]).to.eql(expectedAction);
    expect(allActions[2].type).to.eql(actions.TYPES.PLATFORM_DATAGRID_APPLY_FILTERS);
  });

  it('set page', function () {
    const page = 3;
    const action = actions.setPage(GRID, page);
    const expectedAction = {
      page,
      id: GRID.id,
      type: actions.TYPES.PLATFORM_DATAGRID_SET_PAGE,
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });

  it('set rows on page', function () {
    const rowsOnPage = 50;
    const action = actions.setRowsOnPage(GRID, rowsOnPage);
    const expectedAction = {
      rowsOnPage,
      id: GRID.id,
      type: actions.TYPES.PLATFORM_DATAGRID_SET_ROWS_ON_PAGE,
    };

    this.store.dispatch(action);
    expect(this.store.getActions()[0]).to.eql(expectedAction);
  });
});
