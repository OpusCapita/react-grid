import Immutable, { Map } from 'immutable';
import Utils from './datagrid.utils';

export const TYPES = {
  PLATFORM_DATAGRID_INVALIDATE: 'PLATFORM_DATAGRID_INVALIDATE',
  PLATFORM_DATAGRID_BUSY: 'PLATFORM_DATAGRID_BUSY',
  PLATFORM_DATAGRID_READY: 'PLATFORM_DATAGRID_READY',
  PLATFORM_DATAGRID_SET_DATA: 'PLATFORM_DATAGRID_SET_DATA',
  PLATFORM_DATAGRID_APPLY_SORT: 'PLATFORM_DATAGRID_APPLY_SORT',
  PLATFORM_DATAGRID_SORT_CHANGE: 'PLATFORM_DATAGRID_SORT_CHANGE',
  PLATFORM_DATAGRID_RESIZE_COLUMN: 'PLATFORM_DATAGRID_RESIZE_COLUMN',
  PLATFORM_DATAGRID_EDIT: 'PLATFORM_DATAGRID_EDIT',
  PLATFORM_DATAGRID_CANCEL: 'PLATFORM_DATAGRID_CANCEL',
  PLATFORM_DATAGRID_SAVE: 'PLATFORM_DATAGRID_SAVE',
  PLATFORM_DATAGRID_EXTEND_DATA: 'PLATFORM_DATAGRID_EXTEND_DATA',
  PLATFORM_DATAGRID_SAVE_SUCCESS: 'PLATFORM_DATAGRID_SAVE_SUCCESS',
  PLATFORM_DATAGRID_SAVE_PARTIAL_SUCCESS: 'PLATFORM_DATAGRID_SAVE_PARTIAL_SUCCESS',
  PLATFORM_DATAGRID_SAVE_FAIL: 'PLATFORM_DATAGRID_SAVE_FAIL',
  PLATFORM_DATAGRID_CREATE: 'PLATFORM_DATAGRID_CREATE',
  PLATFORM_DATAGRID_ADD_NEW_ITEM: 'PLATFORM_DATAGRID_ADD_NEW_ITEM',
  PLATFORM_DATAGRID_REMOVE_ITEM: 'PLATFORM_DATAGRID_REMOVE_ITEM',
  PLATFORM_DATAGRID_REMOVE_NEW_ITEM: 'PLATFORM_DATAGRID_REMOVE_NEW_ITEM',
  PLATFORM_DATAGRID_REMOVE_NEW_ITEMS: 'PLATFORM_DATAGRID_REMOVE_NEW_ITEMS',
  PLATFORM_DATAGRID_REMOVE: 'PLATFORM_DATAGRID_REMOVE',
  PLATFORM_DATAGRID_REMOVE_SUCCESS: 'PLATFORM_DATAGRID_REMOVE_SUCCESS',
  PLATFORM_DATAGRID_REMOVE_FAIL: 'PLATFORM_DATAGRID_REMOVE_FAIL',
  PLATFORM_DATAGRID_EDIT_CELL_VALUE_CHANGE: 'PLATFORM_DATAGRID_EDIT_CELL_VALUE_CHANGE',
  PLATFORM_DATAGRID_CELL_SHOW_MESSAGE: 'PLATFORM_DATAGRID_CELL_SHOW_MESSAGE',
  PLATFORM_DATAGRID_CELL_SHOW_MESSAGES: 'PLATFORM_DATAGRID_CELL_SHOW_MESSAGES',
  PLATFORM_DATAGRID_CELL_HIDE_MESSAGE: 'PLATFORM_DATAGRID_CELL_HIDE_MESSAGE',
  PLATFORM_DATAGRID_CREATE_CELL_SHOW_MESSAGE: 'PLATFORM_DATAGRID_CREATE_CELL_SHOW_MESSAGE',
  PLATFORM_DATAGRID_CREATE_CELL_HIDE_MESSAGE: 'PLATFORM_DATAGRID_CREATE_CELL_HIDE_MESSAGE',
  PLATFORM_DATAGRID_CREATE_CELL_VALUE_CHANGE: 'PLATFORM_DATAGRID_CREATE_CELL_VALUE_CHANGE',
  PLATFORM_DATAGRID_CREATE_CELL_VALUE_VALIDATE: 'PLATFORM_DATAGRID_CREATE_CELL_VALUE_VALIDATE',
  PLATFORM_DATAGRID_CELL_SELECTION_CHANGE: 'PLATFORM_DATAGRID_CELL_SELECTION_CHANGE',
  PLATFORM_DATAGRID_ITEM_SELECTION_CHANGE: 'PLATFORM_DATAGRID_ITEM_SELECTION_CHANGE',
  PLATFORM_DATAGRID_SELECT_ALL_ITEMS_CHANGE: 'PLATFORM_DATAGRID_SELECT_ALL_ITEMS_CHANGE',
  PLATFORM_DATAGRID_CLEAR_SELECTED_ITEMS: 'PLATFORM_DATAGRID_CLEAR_SELECTED_ITEMS',
  PLATFORM_DATAGRID_TOGGLE_FILTERING: 'PLATFORM_DATAGRID_TOGGLE_FILTERING',
  PLATFORM_DATAGRID_FILTER_DATA_CHANGE: 'PLATFORM_DATAGRID_FILTER_DATA_CHANGE',
  PLATFORM_DATAGRID_APPLY_FILTERS: 'PLATFORM_DATAGRID_APPLY_FILTERS',
  PLATFORM_DATAGRID_SET_FILTERS: 'PLATFORM_DATAGRID_SET_FILTERS',
  PLATFORM_DATAGRID_UPDATE_EXISTING_CELL_VALUE: 'PLATFORM_DATAGRID_UPDATE_EXISTING_CELL_VALUE',
  PLATFORM_DATAGRID_SET_EDIT_DATA: 'PLATFORM_DATAGRID_SET_EDIT_DATA',
  PLATFORM_DATAGRID_COLUMN_SETTINGS_MODAL_OPEN: 'PLATFORM_DATAGRID_COLUMN_SETTINGS_MODAL_OPEN',
  PLATFORM_DATAGRID_COLUMN_SETTINGS_MODAL_CLOSE: 'PLATFORM_DATAGRID_COLUMN_SETTINGS_MODAL_CLOSE',
  PLATFORM_DATAGRID_COLUMN_SETTINGS_SAVE: 'PLATFORM_DATAGRID_COLUMN_SETTINGS_SAVE',
  PLATFORM_DATAGRID_FORCE_REFRESH: 'PLATFORM_DATAGRID_FORCE_REFRESH',
  PLATFORM_DATAGRID_SET_FOCUS_TO: 'PLATFORM_DATAGRID_SET_FOCUS_TO',
  PLATFORM_DATAGRID_SET_PAGE: 'PLATFORM_DATAGRID_SET_PAGE',
  PLATFORM_DATAGRID_SET_ROWS_ON_PAGE: 'PLATFORM_DATAGRID_SET_ROWS_ON_PAGE',
};

export const invalidate = grid => (dispatch) => {
  Utils.checkGridParam(grid);
  dispatch({
    type: TYPES.PLATFORM_DATAGRID_INVALIDATE,
    id: grid.id,
  });
};

export const forceRefresh = () => (dispatch) => {
  // Fire resize event to recalculate component sizes
  // and to force redraw all mounted grids
  setTimeout(() => {
    if (document.createEvent) {
      const evt = document.createEvent('HTMLEvents');
      evt.initEvent('resize', true, false);
      window.dispatchEvent(evt);
    }
  }, 1);
  dispatch({ type: TYPES.PLATFORM_DATAGRID_FORCE_REFRESH });
};

export const setBusy = grid => (dispatch) => {
  Utils.checkGridParam(grid);
  dispatch({
    type: TYPES.PLATFORM_DATAGRID_BUSY,
    id: grid.id,
  });
};

export const setReady = grid => (dispatch) => {
  Utils.checkGridParam(grid);
  dispatch({
    type: TYPES.PLATFORM_DATAGRID_READY,
    id: grid.id,
  });
};

export const applyFilters = (grid, columns) => (dispatch, getState) => {
  Utils.checkGridParam(grid);
  if (!columns || !columns.forEach) return false;
  const gridData = getState().datagrid.get(grid.id);
  if (!gridData) return false;
  const filterData = gridData.getIn(['config', 'filteringData', 'filterData'], Map());
  const allData = gridData.get('allData');
  setBusy(grid)(dispatch);
  let data;
  if (grid.pagination) {
    return true;
  } if (filterData.isEmpty()) {
    data = allData;
  } else {
    const dateFormat = Utils.getDateFormat(grid, getState().user);
    data = allData.filter((row) => {
      let hits = 0;
      filterData.forEach((filterValue, filterColumn) => {
        columns.forEach((column) => {
          if (Utils.getColumnKey(column) === filterColumn) {
            const value = row.getIn(column.valueKeyPath);
            if (value || value === 0 || value === false) {
              const filterMatcher = Utils.getFilterMatcher(column, dateFormat);
              if (filterMatcher(row, filterValue)) {
                hits += 1;
              }
            }
          }
        });
      });
      return hits === filterData.size;
    });
  }
  dispatch({
    type: TYPES.PLATFORM_DATAGRID_APPLY_FILTERS,
    id: grid.id,
    data,
  });
  setReady(grid)(dispatch);
  return true;
};

export const setAndApplyFilters = (grid, columns, filteringData) => (dispatch) => {
  dispatch({
    type: TYPES.PLATFORM_DATAGRID_SET_FILTERS,
    id: grid.id,
    filteringData: Utils.normalizeFilteringData(filteringData),
  });
  dispatch(applyFilters(grid, columns));
  return true;
};

export const filterCellValueChange = (grid, columns, column, value) => (dispatch, getState) => {
  Utils.checkGridParam(grid);
  const origFilterData = getState()
    .datagrid
    .getIn([grid.id, 'config', 'filteringData', 'filterData'], Map());
  const columnKey = Utils.getColumnKey(column);
  const valueEmptyChecker = Utils.getValueEmptyChecker(column);
  let filterData;
  if (valueEmptyChecker(value)) {
    filterData = origFilterData.delete(columnKey);
  } else {
    filterData = origFilterData.set(columnKey, value);
  }
  Utils.saveFilterData(grid, filterData);
  dispatch({
    type: TYPES.PLATFORM_DATAGRID_FILTER_DATA_CHANGE,
    id: grid.id,
    filterData,
  });
  applyFilters(grid, columns)(dispatch, getState);
};

export const applySort = (grid, columns) => (dispatch, getState) => {
  Utils.checkGridParam(grid);
  if (!columns || !columns.forEach) return false;
  const gridData = getState().datagrid.get(grid.id);
  if (!gridData) return false;
  const sortData = gridData.getIn(['config', 'sortingData']);
  if (!sortData) return false;
  const sortColumn = sortData.get('sortColumn');
  if (!sortColumn) return false;
  const sortOrder = sortData.get('sortOrder', 'asc');
  let column;
  columns.forEach((col) => {
    if (Utils.getColumnKey(col) === sortColumn) {
      column = col;
    }
  });
  if (!column) return false;

  setBusy(grid)(dispatch);
  if (grid.pagination) {
    return true;
  }
  const origAllData = gridData.get('allData');
  const comparator = Utils.getSortComparator(column);
  const valueGetter = Utils.getSortValueGetter(column);
  const valueEmptyChecker = Utils.getValueEmptyChecker(column);
  const allData = origAllData.sort((a, b) => {
    const valA = valueGetter(a);
    const valB = valueGetter(b);
    if (sortOrder === 'asc') {
      if (valueEmptyChecker(valA)) return -1;
      if (valueEmptyChecker(valB)) return 1;
      return comparator(valA, valB);
    }
    if (valueEmptyChecker(valA)) return 1;
    if (valueEmptyChecker(valB)) return -1;
    return comparator(valB, valA);
  });
  let data;
  // Sort also filtered data separately
  if (gridData.getIn(['config', 'filteringData', 'isFiltering'], false)) {
    data = gridData.get('data').sort((a, b) => {
      const valA = valueGetter(a);
      const valB = valueGetter(b);
      if (sortOrder === 'asc') {
        if (valueEmptyChecker(valA)) return -1;
        if (valueEmptyChecker(valB)) return 1;
        return comparator(valA, valB);
      }
      if (valueEmptyChecker(valA)) return 1;
      if (valueEmptyChecker(valB)) return -1;
      return comparator(valB, valA);
    });
  } else {
    data = allData;
  }
  dispatch({
    type: TYPES.PLATFORM_DATAGRID_APPLY_SORT,
    id: grid.id,
    data,
    allData,
  });
  setReady(grid)(dispatch);
  return true;
};

export const sortChange = (grid, columns, column, newSort) => (dispatch, getState) => {
  Utils.checkGridParam(grid);
  const sortOrder = newSort || 'asc';
  const sortColumn = Utils.getColumnKey(column);
  Utils.saveSortData(grid, { sortColumn, sortOrder });
  dispatch({
    type: TYPES.PLATFORM_DATAGRID_SORT_CHANGE,
    id: grid.id,
    sortColumn,
    sortOrder,
  });
  applySort(grid, columns)(dispatch, getState);
};

export const setData = (grid, columns, data) => (dispatch, getState) => {
  Utils.checkGridParam(grid);
  Utils.checkColumnsParam(columns);
  const configData = Utils.loadGridConfig(grid, columns);
  const immutableData = Immutable.Iterable.isIterable(data) ? data : Immutable.fromJS(data);
  const selectedItems = Utils.loadSelectedItems(grid).filter(item => (
    !!immutableData.find(dataItem => dataItem.getIn(grid.idKeyPath) === item)
  ));
  dispatch({
    type: TYPES.PLATFORM_DATAGRID_SET_DATA,
    id: grid.id,
    data: immutableData,
    config: configData,
    selectedItems,
  });
  if (!grid.pagination) {
    applyFilters(grid, columns)(dispatch, getState);
    applySort(grid, columns)(dispatch, getState);
  } else {
    const gridData = getState().datagrid.get(grid.id);
    if (!gridData) return false;
    const filterData = gridData.getIn(['config', 'filteringData', 'filterData'], Map());
    if (!filterData.isEmpty()) {
      dispatch({
        type: TYPES.PLATFORM_DATAGRID_APPLY_FILTERS,
        id: grid.id,
        data: immutableData,
      });
    }
    const sortData = gridData.getIn(['config', 'sortingData']);
    if (sortData) {
      dispatch({
        type: TYPES.PLATFORM_DATAGRID_APPLY_SORT,
        id: grid.id,
        data: immutableData,
        allData: immutableData,
      });
    }
  }
  return true;
};

/**
 * Action to set focus to either last editedRow, createdRow or to validation error
 * @param {Object} grid
 * @param {String} focusToType - type of focus request. Possible values:
 * 'focusToEditCell' || 'focusToErrorCell' || 'focusToCreateCell'
 * @param {boolean} focusToLastRow - sets focus to last data row instead of selected row
 */
export const setFocusTo = (grid, focusTo, focusToLastRow = false) => (dispatch) => {
  Utils.checkGridParam(grid);
  dispatch({
    type: TYPES.PLATFORM_DATAGRID_SET_FOCUS_TO,
    focusTo,
    focusToLastRow,
    id: grid.id,
  });
};

export const extendData = (grid, columns, data, prepend = false) => (dispatch, getState) => {
  Utils.checkGridParam(grid);
  const immutableData = Immutable.Iterable.isIterable(data) ? data : Immutable.fromJS(data);
  dispatch({
    type: TYPES.PLATFORM_DATAGRID_EXTEND_DATA,
    id: grid.id,
    data: immutableData,
    prepend,
  });
  applyFilters(grid, columns)(dispatch, getState);
  applySort(grid, columns)(dispatch, getState);
};

export const resizeColumn = (grid, columnKey, width) => (dispatch, getState) => {
  Utils.checkGridParam(grid);
  const columnWidths = getState()
    .datagrid
    .getIn([grid.id, 'config', 'columnWidths'], Map())
    .set(columnKey, width);
  Utils.saveColumnWidths(grid, columnWidths);
  dispatch({
    type: TYPES.PLATFORM_DATAGRID_RESIZE_COLUMN,
    id: grid.id,
    columnWidths,
  });
};

export const edit = grid => (dispatch) => {
  Utils.checkGridParam(grid);
  dispatch({
    type: TYPES.PLATFORM_DATAGRID_EDIT,
    id: grid.id,
  });
};

export const cancel = grid => (dispatch) => {
  Utils.checkGridParam(grid);
  dispatch({
    type: TYPES.PLATFORM_DATAGRID_CANCEL,
    id: grid.id,
  });
};

export const save = (grid, cb = () => {}) => (dispatch) => {
  Utils.checkGridParam(grid);
  dispatch({
    type: TYPES.PLATFORM_DATAGRID_SAVE,
    id: grid.id,
  });
  cb();
};

export const saveSuccess = (grid, columns, savedItems) => (dispatch, getState) => {
  Utils.checkGridParam(grid);
  dispatch({
    type: TYPES.PLATFORM_DATAGRID_SAVE_SUCCESS,
    id: grid.id,
    idKeyPath: grid.idKeyPath,
    savedItems,
  });
  applyFilters(grid, columns)(dispatch, getState);
  applySort(grid, columns)(dispatch, getState);
};

export const savePartialSuccess = (grid, columns, savedItems) => (dispatch, getState) => {
  Utils.checkGridParam(grid);
  dispatch({
    type: TYPES.PLATFORM_DATAGRID_SAVE_PARTIAL_SUCCESS,
    id: grid.id,
    idKeyPath: grid.idKeyPath,
    savedItems,
  });
  applyFilters(grid, columns)(dispatch, getState);
  applySort(grid, columns)(dispatch, getState);
};

export const saveFail = grid => (dispatch) => {
  Utils.checkGridParam(grid);
  dispatch({
    type: TYPES.PLATFORM_DATAGRID_SAVE_FAIL,
    id: grid.id,
  });
};

export const create = (grid, columnDefaultValues) => (dispatch) => {
  Utils.checkGridParam(grid);
  dispatch({
    type: TYPES.PLATFORM_DATAGRID_CREATE,
    id: grid.id,
    columnDefaultValues,
  });
};

export const addNewItem = (grid, columnDefaultValues) => (dispatch) => {
  Utils.checkGridParam(grid);
  dispatch({
    type: TYPES.PLATFORM_DATAGRID_ADD_NEW_ITEM,
    id: grid.id,
    columnDefaultValues,
  });
};

export const removeItem = (grid, rowId) => (dispatch) => {
  Utils.checkGridParam(grid);
  dispatch({
    type: TYPES.PLATFORM_DATAGRID_REMOVE_ITEM,
    id: grid.id,
    idKeyPath: grid.idKeyPath,
    rowId,
  });
};

export const removeNewItem = (grid, index) => (dispatch) => {
  Utils.checkGridParam(grid);
  dispatch({
    type: TYPES.PLATFORM_DATAGRID_REMOVE_NEW_ITEM,
    id: grid.id,
    index,
  });
};

export const removeNewItems = (grid, indexes) => (dispatch) => {
  Utils.checkGridParam(grid);
  dispatch({
    type: TYPES.PLATFORM_DATAGRID_REMOVE_NEW_ITEMS,
    id: grid.id,
    indexes,
  });
};

export const remove = (grid, cb = () => {}) => (dispatch) => {
  Utils.checkGridParam(grid);
  dispatch({
    type: TYPES.PLATFORM_DATAGRID_REMOVE,
    id: grid.id,
  });
  cb();
};

export const removeSuccess = (grid, removedIds) => (dispatch) => {
  Utils.checkGridParam(grid);
  dispatch({
    type: TYPES.PLATFORM_DATAGRID_REMOVE_SUCCESS,
    id: grid.id,
    idKeyPath: grid.idKeyPath,
    removedIds,
  });
};

export const removeFail = grid => (dispatch) => {
  Utils.checkGridParam(grid);
  dispatch({
    type: TYPES.PLATFORM_DATAGRID_REMOVE_FAIL,
    id: grid.id,
  });
};

export const editCellValueChange = (grid, dataId, keyPath, value) => (dispatch) => {
  Utils.checkGridParam(grid);
  dispatch({
    type: TYPES.PLATFORM_DATAGRID_EDIT_CELL_VALUE_CHANGE,
    id: grid.id,
    dataId,
    keyPath,
    value,
  });
};

export const editCellValueValidate = (
  grid,
  dataId,
  keyPath,
  value,
  validators = [],
) => (dispatch, getState) => {
  Utils.checkGridParam(grid);
  let validationState = { valid: true };
  validators.forEach((validator) => {
    if (validationState.valid) {
      if (validator.unique) {
        if (value !== '' || value !== null || value !== undefined) {
          // combine real data with current unsaved edited data
          const gridData = getState().datagrid.get(grid.id);
          const editData = gridData.get('editData');
          let allData = gridData.get('allData');
          if (editData) {
            editData.forEach((editDataItem, editDataItemId) => {
              const foundIndex = allData.findIndex(d => d.getIn(grid.idKeyPath) === editDataItemId);
              if (foundIndex !== -1) {
                allData = allData.mergeDeepIn([foundIndex], editDataItem);
              }
            });
          }
          // determine uniqueness
          const finding = allData.find((item) => {
            if (grid.idKeyPath.length) {
              // don't self compare
              if (item.getIn(grid.idKeyPath) === dataId) {
                return false;
              }
            }
            return item.getIn(keyPath) === value;
          });
          if (finding) {
            validationState = {
              valid: false,
              message: 'Validation.Unique',
            };
          }
        }
      } else if (validator.validateWithRowData) {
        const gridData = getState().datagrid.get(grid.id);
        const editData = gridData.getIn(['editData', dataId], Map());
        let rowData = gridData.get('allData').find(item => item.getIn(grid.idKeyPath) === dataId);
        if (rowData) {
          rowData = rowData.mergeDeep(editData);
          const params = validator.params ? Object.values(validator.params) : [];
          validationState = validator.validateWithRowData(value, rowData, ...params);
        }
      } else {
        const params = validator.params ? Object.values(validator.params) : [];
        validationState = validator.validate(value, ...params);
        if (validator.params) {
          validationState.messageValues = validator.params;
        }
      }
    }
  });
  if (validationState.valid) {
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CELL_HIDE_MESSAGE,
      id: grid.id,
      messageType: 'error',
      dataId,
      keyPath,
    });
  } else {
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CELL_SHOW_MESSAGE,
      id: grid.id,
      messageType: 'error',
      dataId,
      keyPath,
      messageId: validationState.message,
      messageValues: validationState.messageValues,
    });
  }
  return validationState.valid;
};

export const createCellValueChange = (grid, rowIndex, keyPath, value) => (dispatch) => {
  Utils.checkGridParam(grid);
  dispatch({
    type: TYPES.PLATFORM_DATAGRID_CREATE_CELL_VALUE_CHANGE,
    id: grid.id,
    rowIndex,
    keyPath,
    value,
  });
};

// eslint-disable-next-line max-len
export const createCellValueValidate = (grid, rowIndex, keyPath, value, validators = []) => (dispatch, getState) => {
  Utils.checkGridParam(grid);
  let validationState = { valid: true };
  validators.forEach((validator) => {
    if (validationState.valid) {
      if (validator.unique) {
        if (value !== '' || value !== null || value !== undefined) {
          const finding = getState()
            .datagrid
            .getIn([grid.id, 'allData'])
            .find(item => item.getIn(keyPath) === value);
          if (finding) {
            validationState = {
              valid: false,
              message: 'Validation.Unique',
            };
          } else {
            const find2 = getState()
              .datagrid
              .getIn([grid.id, 'createData'])
              .find((item, i) => i !== rowIndex && item.getIn(keyPath) === value);
            if (find2) {
              validationState = {
                valid: false,
                message: 'Validation.Unique',
              };
            }
          }
        }
      } else if (validator.validateWithRowData) {
        const rowData = getState().datagrid.getIn([grid.id, 'createData', rowIndex]);
        const params = validator.params ? Object.values(validator.params) : [];
        validationState = validator.validateWithRowData(value, rowData, ...params);
      } else {
        const params = validator.params ? Object.values(validator.params) : [];
        validationState = validator.validate(value, ...params);
        if (validator.params) {
          validationState.messageValues = validator.params;
        }
      }
    }
  });
  if (validationState.valid) {
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CREATE_CELL_HIDE_MESSAGE,
      id: grid.id,
      messageType: 'error',
      rowIndex,
      keyPath,
    });
  } else {
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CREATE_CELL_SHOW_MESSAGE,
      id: grid.id,
      messageType: 'error',
      rowIndex,
      keyPath,
      messageId: validationState.message,
      messageValues: validationState.messageValues,
    });
  }
  return validationState.valid;
};

// eslint-disable-next-line max-len
export const cellShowMessage = (grid, messageType, dataId, keyPath, messageId, messageValues) => (dispatch) => {
  Utils.checkGridParam(grid);
  dispatch({
    type: TYPES.PLATFORM_DATAGRID_CELL_SHOW_MESSAGE,
    id: grid.id,
    messageType,
    dataId,
    keyPath,
    messageId,
    messageValues,
  });
};

export const cellShowMessages = (grid, messages) => (dispatch) => {
  Utils.checkGridParam(grid);
  dispatch({
    type: TYPES.PLATFORM_DATAGRID_CELL_SHOW_MESSAGES,
    id: grid.id,
    messages,
  });
};

// eslint-disable-next-line max-len
export const cellHideMessage = (grid, messageType = null, dataId = null, keyPath = null) => (dispatch) => {
  Utils.checkGridParam(grid);
  dispatch({
    type: TYPES.PLATFORM_DATAGRID_CELL_HIDE_MESSAGE,
    id: grid.id,
    messageType,
    dataId,
    keyPath,
  });
};

export const createCellShowMessage = (
  grid,
  messageType,
  rowIndex,
  keyPath,
  messageId,
  messageValues,
) => (dispatch) => {
  Utils.checkGridParam(grid);
  dispatch({
    type: TYPES.PLATFORM_DATAGRID_CREATE_CELL_SHOW_MESSAGE,
    id: grid.id,
    messageType,
    rowIndex,
    keyPath,
    messageId,
    messageValues,
  });
};

// eslint-disable-next-line max-len
export const createCellHideMessage = (grid, messageType = null, rowIndex = null, keyPath = null) => (dispatch) => {
  Utils.checkGridParam(grid);
  dispatch({
    type: TYPES.PLATFORM_DATAGRID_CREATE_CELL_HIDE_MESSAGE,
    id: grid.id,
    messageType,
    rowIndex,
    keyPath,
  });
};

export const cellSelectionChange = (grid, selectedCell = null) => (dispatch) => {
  Utils.checkGridParam(grid);
  dispatch({
    selectedCell,
    id: grid.id,
    type: TYPES.PLATFORM_DATAGRID_CELL_SELECTION_CHANGE,
  });
};

export const itemSelectionChange = (
  grid,
  rowIndex,
  ctrlPressed = false,
  shiftPressed = false,
) => (dispatch, getState) => {
  Utils.checkGridParam(grid);
  dispatch({
    type: TYPES.PLATFORM_DATAGRID_ITEM_SELECTION_CHANGE,
    id: grid.id,
    rowIndex,
    idKeyPath: grid.idKeyPath,
    ctrlPressed,
    shiftPressed,
  });
  Utils.saveSelectedItems(grid, getState().datagrid.getIn([grid.id, 'selectedItems']));
};

export const selectAllItemsChange = grid => (dispatch, getState) => {
  Utils.checkGridParam(grid);
  dispatch({
    type: TYPES.PLATFORM_DATAGRID_SELECT_ALL_ITEMS_CHANGE,
    id: grid.id,
    idKeyPath: grid.idKeyPath,
  });
  Utils.saveSelectedItems(grid, getState().datagrid.getIn([grid.id, 'selectedItems']));
};

export const clearSelectedItems = grid => (dispatch, getState) => {
  Utils.checkGridParam(grid);
  dispatch({
    type: TYPES.PLATFORM_DATAGRID_CLEAR_SELECTED_ITEMS,
    id: grid.id,
  });
  Utils.saveSelectedItems(grid, getState().datagrid.getIn([grid.id, 'selectedItems']));
};

export const toggleFiltering = grid => (dispatch, getState) => {
  Utils.checkGridParam(grid);
  const isFiltering = !getState()
    .datagrid
    .getIn([grid.id, 'config', 'filteringData', 'isFiltering'], false);
  Utils.saveIsFiltering(grid, isFiltering);
  dispatch({
    type: TYPES.PLATFORM_DATAGRID_TOGGLE_FILTERING,
    id: grid.id,
    isFiltering,
  });
};

export const validateEditedRows = (grid, columns) => (dispatch, getState) => {
  Utils.checkGridParam(grid);
  const gridData = getState().datagrid.get(grid.id);
  const editData = gridData.get('editData', Map());
  let allGood = true;
  editData.forEach((editDataRow, dataId) => {
    columns.forEach((col) => {
      let value = editDataRow.getIn(col.valueKeyPath);
      if (value === undefined) {
        value = gridData
          .get('allData')
          .find(data => data.getIn(grid.idKeyPath) === dataId)
          .getIn(col.valueKeyPath);
      }
      const isValid = editCellValueValidate(
        grid,
        dataId,
        col.valueKeyPath,
        value,
        col.validators,
      )(dispatch, getState);
      if (allGood && !isValid) {
        allGood = false;
      }
    });
  });
  return allGood;
};

export const removeEmptyCreatedRows = (grid, columns) => (dispatch, getState) => {
  Utils.checkGridParam(grid);
  const createData = getState().datagrid.getIn([grid.id, 'createData'], Map());
  const indexes = [];
  createData.forEach((createDataRow, rowIndex) => {
    let isEmpty = true;
    columns.forEach((col) => {
      const value = createDataRow.getIn(col.valueKeyPath);
      if (value !== undefined && value !== '' && value !== null) {
        isEmpty = false;
      }
    });
    if (isEmpty) {
      indexes.push(rowIndex);
    }
  });
  if (indexes.length > 0) {
    removeNewItems(grid, indexes)(dispatch);
  }
};

export const validateCreatedRows = (grid, columns) => (dispatch, getState) => {
  Utils.checkGridParam(grid);
  removeEmptyCreatedRows(grid, columns)(dispatch, getState);
  const createData = getState().datagrid.getIn([grid.id, 'createData'], Map());
  let allGood = true;
  createData.forEach((createDataRow, rowIndex) => {
    columns.forEach((col) => {
      const value = createDataRow.getIn(col.valueKeyPath);
      const isValid = createCellValueValidate(
        grid,
        rowIndex,
        col.valueKeyPath,
        value,
        col.validators,
      )(dispatch, getState);
      if (allGood && !isValid) {
        allGood = false;
      }
    });
  });
  return allGood;
};

export const updateExistingCellValue = (grid, dataId, keyPath, value) => (dispatch) => {
  Utils.checkGridParam(grid);
  dispatch({
    type: TYPES.PLATFORM_DATAGRID_UPDATE_EXISTING_CELL_VALUE,
    id: grid.id,
    dataId,
    keyPath,
    value,
  });
};

export const setEditData = (grid, data, cellMessages = Map()) => (dispatch) => {
  Utils.checkGridParam(grid);
  dispatch({
    data,
    cellMessages,
    id: grid.id,
    type: TYPES.PLATFORM_DATAGRID_SET_EDIT_DATA,
  });
};

export const openColumnSettingsModal = grid => (dispatch) => {
  Utils.checkGridParam(grid);
  dispatch({
    type: TYPES.PLATFORM_DATAGRID_COLUMN_SETTINGS_MODAL_OPEN,
    id: grid.id,
  });
};

export const closeColumnSettingsModal = grid => (dispatch) => {
  Utils.checkGridParam(grid);
  dispatch({
    type: TYPES.PLATFORM_DATAGRID_COLUMN_SETTINGS_MODAL_CLOSE,
    id: grid.id,
  });
};

export const saveColumnSettings = (grid, hiddenColumns, columnOrder) => (dispatch) => {
  Utils.checkGridParam(grid);
  Utils.saveColumnSettings(grid, hiddenColumns, columnOrder);
  dispatch({
    type: TYPES.PLATFORM_DATAGRID_COLUMN_SETTINGS_SAVE,
    id: grid.id,
    columnOrder,
  });
};

export const setPage = (grid, page) => (dispatch) => {
  Utils.savePage(grid, page);
  dispatch({
    page,
    id: grid.id,
    type: TYPES.PLATFORM_DATAGRID_SET_PAGE,
  });
};

export const setRowsOnPage = (grid, rowsOnPage) => (dispatch) => {
  Utils.saveRowsOnPage(grid, rowsOnPage);
  dispatch({
    rowsOnPage,
    id: grid.id,
    type: TYPES.PLATFORM_DATAGRID_SET_ROWS_ON_PAGE,
  });
};
