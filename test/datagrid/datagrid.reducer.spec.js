/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { fromJS, Map, List } from 'immutable';
import datagridReducer from '../../src/datagrid/datagrid.reducer';
import { TYPES } from '../../src/datagrid/datagrid.actions';
import { INITIAL_STATE } from '../../src/datagrid/datagrid.constants';

describe('Datagrid reducers', () => {
  const id = 'TestGrid';
  const data = fromJS([
    { id: 1, name: 'Mary', age: 11 },
    { id: 2, name: 'John', age: 99 },
  ]);
  const filteringData = fromJS({
    isFiltering: true,
    filterData: {
      name: 'John',
    },
  });

  it('invalidates data', () => {
    const action = {
      type: TYPES.PLATFORM_DATAGRID_INVALIDATE,
      id,
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'data'])).to.be.an('undefined');
    expect(newState.getIn([id, 'allData'])).to.be.an('undefined');
  });

  it('sets data', () => {
    const action = {
      type: TYPES.PLATFORM_DATAGRID_SET_DATA,
      id,
      data,
      config: {},
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'data'])).to.eql(data);
    expect(newState.getIn([id, 'allData'])).to.eql(data);
  });

  it('sets busy state', () => {
    const action = {
      type: TYPES.PLATFORM_DATAGRID_BUSY,
      id,
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'session', 'isBusy'])).to.be.true;
  });

  it('sets ready state', () => {
    const action = {
      type: TYPES.PLATFORM_DATAGRID_READY,
      id,
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'session', 'isBusy'])).to.be.false;
  });

  it('sets sorted data', () => {
    const action = {
      type: TYPES.PLATFORM_DATAGRID_APPLY_SORT,
      id,
      data,
      allData: data,
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'data'])).to.eql(data);
    expect(newState.getIn([id, 'allData'])).to.eql(data);
  });

  it('sets sorting data', () => {
    const action = {
      type: TYPES.PLATFORM_DATAGRID_SORT_CHANGE,
      id,
      sortColumn: 'name',
      sortOrder: 'desc',
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'config', 'sortingData', 'sortColumn'])).to.eql('name');
    expect(newState.getIn([id, 'config', 'sortingData', 'sortOrder'])).to.eql('desc');
  });

  it('sets column widths', () => {
    const columnWidths = Map({ name: 1234 });
    const action = {
      type: TYPES.PLATFORM_DATAGRID_RESIZE_COLUMN,
      id,
      columnWidths,
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'config', 'columnWidths'])).to.eql(columnWidths);
  });

  it('sets grid in editing mode', () => {
    const action = {
      type: TYPES.PLATFORM_DATAGRID_EDIT,
      id,
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'session', 'isEditing'])).to.be.true;
  });

  it('sets grid in create mode and creates first item with default values', () => {
    const columnDefaultValues = {
      age: 50,
    };
    const action = {
      type: TYPES.PLATFORM_DATAGRID_CREATE,
      id,
      columnDefaultValues,
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'session', 'isCreating'])).to.be.true;
    expect(newState.getIn([id, 'createData'])).to.eql(fromJS([columnDefaultValues]));
  });

  it('creates new item with default values', () => {
    const columnDefaultValues = {
      age: 50,
    };
    const action = {
      type: TYPES.PLATFORM_DATAGRID_ADD_NEW_ITEM,
      id,
      columnDefaultValues,
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'createData'])).to.eql(fromJS([columnDefaultValues]));
  });

  it('removes new item', () => {
    const state = INITIAL_STATE.updateIn([
      id,
      'createData',
    ], List(), items => items.push(Map()));
    const action = {
      type: TYPES.PLATFORM_DATAGRID_REMOVE_NEW_ITEM,
      id,
      index: 0,
    };
    const newState = datagridReducer(state, action);
    expect(newState.getIn([id, 'createData'])).to.eql(fromJS([]));
  });

  it('removes new items', () => {
    const state = INITIAL_STATE.updateIn([
      id,
      'createData',
    ], List(), items => items.push(Map()).push(Map()).push(Map()));
    const action = {
      type: TYPES.PLATFORM_DATAGRID_REMOVE_NEW_ITEMS,
      id,
      indexes: [0, 1, 2],
    };
    const newState = datagridReducer(state, action);
    expect(newState.getIn([id, 'createData'])).to.eql(fromJS([]));
  });

  it('cancels edit/create operations', () => {
    const action = {
      type: TYPES.PLATFORM_DATAGRID_CANCEL,
      id,
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'session', 'isEditing'])).to.be.false;
    expect(newState.getIn([id, 'session', 'isCreating'])).to.be.false;
  });

  it('sets grid busy mode on save', () => {
    const action = {
      type: TYPES.PLATFORM_DATAGRID_SAVE,
      id,
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'session', 'isBusy'])).to.be.true;
  });

  it('sets new items on save success');
  it('sets new items on partial save success');

  it('sets grid ready mode on save fail', () => {
    const action = {
      type: TYPES.PLATFORM_DATAGRID_SAVE_FAIL,
      id,
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'session', 'isBusy'])).to.be.false;
  });

  it('sets grid busy mode on remove', () => {
    const action = {
      type: TYPES.PLATFORM_DATAGRID_REMOVE,
      id,
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'session', 'isBusy'])).to.be.true;
  });

  it('removes items on remove success');

  it('sets grid ready mode on remove fail', () => {
    const action = {
      type: TYPES.PLATFORM_DATAGRID_REMOVE_FAIL,
      id,
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'session', 'isBusy'])).to.be.false;
  });

  it('sets edit cell value', () => {
    const action = {
      type: TYPES.PLATFORM_DATAGRID_EDIT_CELL_VALUE_CHANGE,
      id,
      dataId: 23,
      keyPath: ['name'],
      value: 'John',
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'editData', 23, 'name'])).to.eql('John');
  });

  it('sets create cell value', () => {
    const action = {
      type: TYPES.PLATFORM_DATAGRID_CREATE_CELL_VALUE_CHANGE,
      id,
      rowIndex: 2,
      keyPath: ['age'],
      value: 65,
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'createData', 2, 'age'])).to.eql(65);
  });

  it('sets cell message', () => {
    const action = {
      type: TYPES.PLATFORM_DATAGRID_CELL_SHOW_MESSAGE,
      id,
      messageType: 'error',
      dataId: 2,
      keyPath: ['age'],
      messageId: 'ValidationError',
      messageValues: null,
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'cellMessages', 'error', 2, 'age'])).to.eql({
      id: 'ValidationError',
      values: null,
    });
  });

  it('sets cell messages', () => {
    const messages = Map()
      .setIn(['info', 1], Map({ id: 'Id message', name: 'Name message' }));
    const action = {
      type: TYPES.PLATFORM_DATAGRID_CELL_SHOW_MESSAGES,
      id,
      messages,
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'cellMessages', 'info', 1, 'id'])).to.eql('Id message');
    expect(newState.getIn([id, 'cellMessages', 'info', 1, 'name'])).to.eql('Name message');
  });

  it('hides cell message', () => {
    const state = INITIAL_STATE
      .setIn([id, 'cellMessages', 'error', 2, 'age'], {
        id: 'ValidationError',
        values: null,
      })
      .setIn([id, 'cellMessages', 'warning', 2, 'age'], {
        id: 'TooOld',
        values: null,
      });
    const action = {
      type: TYPES.PLATFORM_DATAGRID_CELL_HIDE_MESSAGE,
      id,
      messageType: 'error',
      dataId: 2,
      keyPath: ['age'],
    };
    const newState = datagridReducer(state, action);
    expect(newState.getIn([id, 'cellMessages', 'error', 2, 'age'])).to.be.undefined;
  });

  it('sets create cell message', () => {
    const action = {
      type: TYPES.PLATFORM_DATAGRID_CREATE_CELL_SHOW_MESSAGE,
      id,
      messageType: 'error',
      rowIndex: 2,
      keyPath: ['age'],
      messageId: 'ValidationError',
      messageValues: null,
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'createCellMessages', 'error', 2, 'age'])).to.eql({
      id: 'ValidationError',
      values: null,
    });
  });

  it('hides create cell message', () => {
    const state = INITIAL_STATE
      .setIn([id, 'createCellMessages', 'error', 2, 'age'], {
        id: 'ValidationError',
        values: null,
      })
      .setIn([id, 'createCellMessages', 'warning', 2, 'age'], {
        id: 'TooOld',
        values: null,
      });
    const action = {
      type: TYPES.PLATFORM_DATAGRID_CREATE_CELL_HIDE_MESSAGE,
      id,
      messageType: 'error',
      rowIndex: 2,
      keyPath: ['age'],
    };
    const newState = datagridReducer(state, action);
    expect(newState.getIn([id, 'createCellMessages', 'error', 2, 'age'])).to.be.undefined;
  });

  it('sets selected cell', () => {
    const state = INITIAL_STATE.setIn([id, 'selectedCell'], Map());
    const action = {
      id,
      selectedCell: Map({ rowIndex: 0, columnKey: 'text1' }),
      type: TYPES.PLATFORM_DATAGRID_CELL_SELECTION_CHANGE,
    };
    const newState = datagridReducer(state, action);
    expect(newState.getIn([id, 'selectedCell'])).to.eql(Map({ rowIndex: 0, columnKey: 'text1' }));
  });

  it('sets selected items', () => {
    const state = INITIAL_STATE.setIn([id, 'data'], data);
    const action = {
      type: TYPES.PLATFORM_DATAGRID_ITEM_SELECTION_CHANGE,
      id,
      rowIndex: 1,
      shiftPressed: false,
      ctrlPressed: false,
      idKeyPath: ['id'],
    };
    const newState = datagridReducer(state, action);
    expect(newState.getIn([id, 'selectedItems'])).to.eql(List([2]));
  });

  it('sets all items selected', () => {
    const state = INITIAL_STATE.setIn([id, 'data'], data);
    const action = {
      type: TYPES.PLATFORM_DATAGRID_SELECT_ALL_ITEMS_CHANGE,
      id,
      idKeyPath: ['id'],
    };
    const newState = datagridReducer(state, action);
    expect(newState.getIn([id, 'selectedItems'])).to.eql(List([1, 2]));
  });

  it('sets selected items', () => {
    const state = INITIAL_STATE.setIn([id, 'selectedItems'], List([1, 2]));
    const action = {
      type: TYPES.PLATFORM_DATAGRID_CLEAR_SELECTED_ITEMS,
      id,
    };
    const newState = datagridReducer(state, action);
    expect(newState.getIn([id, 'selectedItems'])).to.be.undefined;
  });

  it('sets filtering', () => {
    const action = {
      type: TYPES.PLATFORM_DATAGRID_TOGGLE_FILTERING,
      id,
      isFiltering: true,
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'config', 'filteringData', 'isFiltering'])).to.be.true;
  });

  it('sets filtering', () => {
    const filterData = fromJS([{ age: 65 }]);
    const action = {
      type: TYPES.PLATFORM_DATAGRID_FILTER_DATA_CHANGE,
      id,
      filterData,
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'config', 'filteringData', 'filterData'])).to.eq(filterData);
  });

  it('apply filtered data', () => {
    const action = {
      type: TYPES.PLATFORM_DATAGRID_APPLY_FILTERS,
      id,
      data,
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'data'])).to.eql(data);
  });

  it('set filtered data', () => {
    const action = {
      type: TYPES.PLATFORM_DATAGRID_SET_FILTERS,
      id,
      filteringData,
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([id, 'config', 'filteringData'])).to.eql(filteringData);
  });

  it('set existing cell value', () => {
    const state = INITIAL_STATE.setIn([id, 'data'], data);
    const action = {
      type: TYPES.PLATFORM_DATAGRID_UPDATE_EXISTING_CELL_VALUE,
      id,
      dataId: 1,
      keyPath: ['name'],
      value: 'Edith',
    };
    const newState = datagridReducer(state, action);
    expect(newState.getIn([id, 'data', 1, 'name'])).to.eql('Edith');
    expect(newState.getIn([id, 'allData', 1, 'name'])).to.eql('Edith');
  });

  it('set edited data', () => {
    const state = INITIAL_STATE.setIn([id, 'data'], data);
    const newData = Map().setIn([1, 'name'], 'abc');
    const action = {
      id,
      cellMessages: Map(),
      data: newData,
      type: TYPES.PLATFORM_DATAGRID_SET_EDIT_DATA,
    };
    const newState = datagridReducer(state, action);
    expect(newState.getIn([id, 'data', 0, 'name'])).to.eql('Mary');
    expect(newState.getIn([id, 'editData', 1, 'name'])).to.eql('abc');
    expect(newState.getIn([id, 'cellMessages'])).to.eql(Map());
  });

  it('set page', () => {
    const state = INITIAL_STATE.setIn([id, 'data'], data);
    const action = {
      id,
      page: 3,
      type: TYPES.PLATFORM_DATAGRID_SET_PAGE,
    };
    const newState = datagridReducer(state, action);
    expect(newState.getIn([id, 'config', 'page'])).to.eql(3);
  });

  it('set rows on page', () => {
    const state = INITIAL_STATE.setIn([id, 'data'], data);
    const action = {
      id,
      rowsOnPage: 50,
      type: TYPES.PLATFORM_DATAGRID_SET_ROWS_ON_PAGE,
    };
    const newState = datagridReducer(state, action);
    expect(newState.getIn([id, 'config', 'rowsOnPage'])).to.eql(50);
  });
});
