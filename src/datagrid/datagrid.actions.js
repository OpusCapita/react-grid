import { Map } from 'immutable';
import Utils from './datagrid.utils';

export const TYPES = {
  PLATFORM_DATAGRID_INVALIDATE: 'PLATFORM_DATAGRID_INVALIDATE',
  PLATFORM_DATAGRID_BUSY: 'PLATFORM_DATAGRID_BUSY',
  PLATFORM_DATAGRID_READY: 'PLATFORM_DATAGRID_READY',
  PLATFORM_DATAGRID_SET_DATA: 'PLATFORM_DATAGRID_SET_DATA',
  PLATFORM_DATAGRID_SORT_COLUMN: 'PLATFORM_DATAGRID_SORT_COLUMN',
  PLATFORM_DATAGRID_RESIZE_COLUMN: 'PLATFORM_DATAGRID_RESIZE_COLUMN',
  PLATFORM_DATAGRID_EDIT: 'PLATFORM_DATAGRID_EDIT',
  PLATFORM_DATAGRID_CANCEL: 'PLATFORM_DATAGRID_CANCEL',
  PLATFORM_DATAGRID_SAVE: 'PLATFORM_DATAGRID_SAVE',
  PLATFORM_DATAGRID_SAVE_SUCCESS: 'PLATFORM_DATAGRID_SAVE_SUCCESS',
  PLATFORM_DATAGRID_SAVE_PARTIAL_SUCCESS: 'PLATFORM_DATAGRID_SAVE_PARTIAL_SUCCESS',
  PLATFORM_DATAGRID_SAVE_FAIL: 'PLATFORM_DATAGRID_SAVE_FAIL',
  PLATFORM_DATAGRID_CREATE: 'PLATFORM_DATAGRID_CREATE',
  PLATFORM_DATAGRID_ADD_NEW_ITEM: 'PLATFORM_DATAGRID_ADD_NEW_ITEM',
  PLATFORM_DATAGRID_REMOVE_NEW_ITEM: 'PLATFORM_DATAGRID_REMOVE_NEW_ITEM',
  PLATFORM_DATAGRID_REMOVE: 'PLATFORM_DATAGRID_REMOVE',
  PLATFORM_DATAGRID_REMOVE_SUCCESS: 'PLATFORM_DATAGRID_REMOVE_SUCCESS',
  PLATFORM_DATAGRID_REMOVE_FAIL: 'PLATFORM_DATAGRID_REMOVE_FAIL',
  PLATFORM_DATAGRID_EDIT_CELL_VALUE_CHANGE: 'PLATFORM_DATAGRID_EDIT_CELL_VALUE_CHANGE',
  PLATFORM_DATAGRID_CELL_SHOW_MESSAGE: 'PLATFORM_DATAGRID_CELL_SHOW_MESSAGE',
  PLATFORM_DATAGRID_CELL_HIDE_MESSAGE: 'PLATFORM_DATAGRID_CELL_HIDE_MESSAGE',
  PLATFORM_DATAGRID_CREATE_CELL_SHOW_MESSAGE: 'PLATFORM_DATAGRID_CREATE_CELL_SHOW_MESSAGE',
  PLATFORM_DATAGRID_CREATE_CELL_HIDE_MESSAGE: 'PLATFORM_DATAGRID_CREATE_CELL_HIDE_MESSAGE',
  PLATFORM_DATAGRID_CREATE_CELL_VALUE_CHANGE: 'PLATFORM_DATAGRID_CREATE_CELL_VALUE_CHANGE',
  PLATFORM_DATAGRID_CREATE_CELL_VALUE_VALIDATE: 'PLATFORM_DATAGRID_CREATE_CELL_VALUE_VALIDATE',
  PLATFORM_DATAGRID_ITEM_SELECTION_CHANGE: 'PLATFORM_DATAGRID_ITEM_SELECTION_CHANGE',
  PLATFORM_DATAGRID_SELECT_ALL_ITEMS_CHANGE: 'PLATFORM_DATAGRID_SELECT_ALL_ITEMS_CHANGE',
  PLATFORM_DATAGRID_CLEAR_SELECTED_ITEMS: 'PLATFORM_DATAGRID_CLEAR_SELECTED_ITEMS',
  PLATFORM_DATAGRID_TOGGLE_FILTERING: 'PLATFORM_DATAGRID_TOGGLE_FILTERING',
  PLATFORM_DATAGRID_FILTER_CELL_VALUE_CHANGE: 'PLATFORM_DATAGRID_FILTER_CELL_VALUE_CHANGE',
  PLATFORM_DATAGRID_UPDATE_EXISTING_CELL_VALUE: 'PLATFORM_DATAGRID_UPDATE_EXISTING_CELL_VALUE',
};

export const invalidate = id =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_INVALIDATE,
      id,
    });

export const setData = (id, data, columns) =>
  (dispatch) => {
    const config = Utils.loadGridConfig(id);
    const selectedItems = Utils.loadSelectedItems(id);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_SET_DATA,
      id,
      data,
      config,
      selectedItems,
    });
    dispatch(refreshFilterAndSort(id, columns));
  };

export const setBusy = id =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_BUSY,
      id,
    });

export const setReady = id =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_READY,
      id,
    });

export const refreshFilterAndSort = (id, columns) =>
  (dispatch, getState) => {
    if (!columns) return false;
    const sortColumn = getState().datagrid.getIn([id, 'config', 'sortingData', 'sortColumn']);
    if (!sortColumn) return false;
    let foundColumn;
    columns.forEach((column) => {
      if (Utils.getColumnKey(column) === sortColumn) {
        foundColumn = column;
      }
    });
    if (foundColumn) {
      const sortOrder = getState().datagrid.getIn([id, 'config', 'sortingData', 'sortOrder']);
      dispatch(sort(id, foundColumn, sortOrder));
    }
  };

export const sort = (id, column, newSort) =>
  (dispatch, getState) => {
    setBusy(id)(dispatch);
    const sortOrder = newSort || 'asc';
    const sortColumn = Utils.getColumnKey(column);
    const comparator = Utils.getSortComparator(column);
    const valueGetter = Utils.getSortValueGetter(column);
    const origAllData = getState().datagrid.getIn([id, 'allData']);
    const allData = origAllData.sort((a, b) => {
      if (sortOrder === 'asc') {
        return comparator(valueGetter(a), valueGetter(b));
      }
      return comparator(valueGetter(b), valueGetter(a));
    });
    let data;
    // Sort also filtered data separately
    if (getState().datagrid.getIn([id, 'session', 'isFiltering'], false)) {
      data = getState().datagrid.getIn([id, 'data']).sort((a, b) => {
        if (sortOrder === 'asc') {
          return comparator(valueGetter(a), valueGetter(b));
        }
        return comparator(valueGetter(b), valueGetter(a));
      });
    } else {
      data = allData;
    }
    Utils.saveSortData(id, { sortColumn, sortOrder });
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_SORT_COLUMN,
      id,
      sortColumn,
      sortOrder,
      data,
      allData,
    });
    setReady(id)(dispatch);
  };

export const resizeColumn = (id, columnKey, width) =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_RESIZE_COLUMN,
      id,
      columnKey,
      width,
    });

export const edit = id =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_EDIT,
      id,
    });

export const cancel = id =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CANCEL,
      id,
    });

export const save = (id, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_SAVE,
      id,
    });
    cb();
  };

export const saveSuccess = (id, idKeyPath, savedItems) =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_SAVE_SUCCESS,
      id,
      idKeyPath,
      savedItems,
    });

export const savePartialSuccess = (id, idKeyPath, savedItems) =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_SAVE_PARTIAL_SUCCESS,
      id,
      idKeyPath,
      savedItems,
    });

export const saveFail = id =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_SAVE_FAIL,
      id,
    });

export const create = (id, columnDefaultValues) =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CREATE,
      id,
      columnDefaultValues,
    });

export const addNewItem = (id, columnDefaultValues) =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_ADD_NEW_ITEM,
      id,
      columnDefaultValues,
    });

export const removeNewItem = (id, index) =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_REMOVE_NEW_ITEM,
      id,
      index,
    });

export const remove = (id, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_REMOVE,
      id,
    });
    cb();
  };

export const removeSuccess = (id, idKeyPath, removedIds) =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_REMOVE_SUCCESS,
      id,
      idKeyPath,
      removedIds,
    });

export const removeFail = id =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_REMOVE_FAIL,
      id,
    });

export const editCellValueChange = (id, dataId, keyPath, value) =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_EDIT_CELL_VALUE_CHANGE,
      id,
      dataId,
      keyPath,
      value,
    });

export const editCellValueValidate = (
  id,
  dataId,
  keyPath,
  value,
  validators = [],
  idKeyPath = [],
) =>
  (dispatch, getState) => {
    let validationState = { valid: true };
    validators.forEach((validator) => {
      if (validationState.valid) {
        if (validator.unique) {
          if (value !== '' || value !== null || value !== undefined) {
            // combine real data with current unsaved edited data
            const gridData = getState().datagrid.get(id);
            const editData = gridData.get('editData');
            let allData = gridData.get('allData');
            if (editData) {
              editData.forEach((editDataItem, editDataItemId) => {
                const foundIndex = allData.findIndex(d =>
                  d.getIn(idKeyPath) === editDataItemId,
                );
                if (foundIndex !== -1) {
                  allData = allData.mergeDeepIn([foundIndex], editDataItem);
                }
              });
            }
            // determine uniqueness
            const finding = allData.find((item) => {
              if (idKeyPath.length) {
                // don't self compare
                if (item.getIn(idKeyPath) === dataId) {
                  return false;
                }
              }
              return item.getIn(keyPath) === value;
            });
            if (finding) {
              validationState = {
                valid: false,
                message: 'ValidationUnique',
              };
            }
          }
        } else if (validator.validateWithRowData) {
          const gridData = getState().datagrid.get(id);
          const editData = gridData.getIn(['editData', dataId], Map());
          let rowData = gridData.get('allData').find(item => item.getIn(idKeyPath) === dataId);
          if (rowData) {
            rowData = rowData.mergeDeep(editData);
            validationState = validator.validateWithRowData(value, rowData);
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
        id,
        messageType: 'error',
        dataId,
        keyPath,
      });
    } else {
      dispatch({
        type: TYPES.PLATFORM_DATAGRID_CELL_SHOW_MESSAGE,
        id,
        messageType: 'error',
        dataId,
        keyPath,
        messageId: validationState.message,
        messageValues: validationState.messageValues,
      });
    }
    return validationState.valid;
  };

export const createCellValueChange = (id, rowIndex, keyPath, value) =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CREATE_CELL_VALUE_CHANGE,
      id,
      rowIndex,
      keyPath,
      value,
    });

export const createCellValueValidate = (id, rowIndex, keyPath, value, validators = []) =>
  (dispatch, getState) => {
    let validationState = { valid: true };
    validators.forEach((validator) => {
      if (validationState.valid) {
        if (validator.unique) {
          if (value !== '' || value !== null || value !== undefined) {
            const finding = getState()
              .datagrid
              .getIn([id, 'allData'])
              .find(item => item.getIn(keyPath) === value);
            if (finding) {
              validationState = {
                valid: false,
                message: 'ValidationUnique',
              };
            } else {
              const find2 = getState()
                              .datagrid
                              .getIn([id, 'createData'])
                              .find((item, i) =>
                                i !== rowIndex && item.getIn(keyPath) === value,
                              );
              if (find2) {
                validationState = {
                  valid: false,
                  message: 'ValidationUnique',
                };
              }
            }
          }
        } else if (validator.validateWithRowData) {
          const rowData = getState().datagrid.getIn([id, 'createData', rowIndex]);
          validationState = validator.validateWithRowData(value, rowData);
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
        id,
        messageType: 'error',
        rowIndex,
        keyPath,
      });
    } else {
      dispatch({
        type: TYPES.PLATFORM_DATAGRID_CREATE_CELL_SHOW_MESSAGE,
        id,
        messageType: 'error',
        rowIndex,
        keyPath,
        messageId: validationState.message,
        messageValues: validationState.messageValues,
      });
    }
    return validationState.valid;
  };

export const cellShowMessage = (id, messageType, dataId, keyPath, messageId, messageValues) =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CELL_SHOW_MESSAGE,
      id,
      messageType,
      dataId,
      keyPath,
      messageId,
      messageValues,
    });

export const cellHideMessage = (id, messageType = null, dataId = null, keyPath = null) =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CELL_HIDE_MESSAGE,
      id,
      messageType,
      dataId,
      keyPath,
    });

export const createCellShowMessage = (
  id,
  messageType,
  rowIndex,
  keyPath,
  messageId,
  messageValues,
) =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CREATE_CELL_SHOW_MESSAGE,
      id,
      messageType,
      rowIndex,
      keyPath,
      messageId,
      messageValues,
    });

export const createCellHideMessage = (id, messageType = null, rowIndex = null, keyPath = null) =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CREATE_CELL_HIDE_MESSAGE,
      id,
      messageType,
      rowIndex,
      keyPath,
    });

export const itemSelectionChange = (
  id,
  rowIndex,
  idKeyPath,
  ctrlPressed = false,
  shiftPressed = false,
) =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_ITEM_SELECTION_CHANGE,
      id,
      rowIndex,
      idKeyPath,
      ctrlPressed,
      shiftPressed,
    });

export const selectAllItemsChange = (id, idKeyPath) =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_SELECT_ALL_ITEMS_CHANGE,
      id,
      idKeyPath,
    });

export const clearSelectedItems = id =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CLEAR_SELECTED_ITEMS,
      id,
    });

export const toggleFiltering = id =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_TOGGLE_FILTERING,
      id,
    });

export const filterCellValueChange = (id, keyPath, value, columnFilterFunctions) =>
  (dispatch, getState) => {
    setBusy(id)(dispatch);
    const state = getState();
    const allData = state.datagrid.getIn([id, 'allData']);
    const origFilterData = state.datagrid.getIn([id, 'filterData'], Map());
    let filterData;
    if (
      columnFilterFunctions[keyPath.join('/')] &&
      columnFilterFunctions[keyPath.join('/')].valueEmptyChecker(value)
    ) {
      filterData = origFilterData.delete(keyPath.join('/'));
    } else {
      filterData = origFilterData.set(keyPath.join('/'), value);
    }
    let data;
    if (filterData.isEmpty()) {
      data = allData;
    } else {
      data = allData.filter((row) => {
        let hits = 0;
        filterData.forEach((filterValue, filterKey) => {
          const rowData = row.getIn(filterKey.split('/'));
          if (rowData || rowData === 0 || rowData === false) {
            if (
              columnFilterFunctions[filterKey] &&
              columnFilterFunctions[filterKey].filterMatcher(rowData, filterValue)
            ) {
              hits += 1;
            }
          }
        });
        return hits === filterData.size;
      });
    }
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_FILTER_CELL_VALUE_CHANGE,
      id,
      filterData,
      data,
    });
    setReady(id)(dispatch);
  };

export const validateEditedRows = (id, idKeyPath, columns) =>
  (dispatch, getState) => {
    const gridData = getState().datagrid.get(id);
    const editData = gridData.get('editData', Map());
    let allGood = true;
    editData.forEach((editDataRow, dataId) => {
      columns.forEach((col) => {
        let value = editDataRow.getIn(col.valueKeyPath);
        if (value === undefined) {
          value = gridData
            .get('allData')
            .find(data => data.getIn(idKeyPath) === dataId)
            .getIn(col.valueKeyPath);
        }
        const isValid = editCellValueValidate(
          id,
          dataId,
          col.valueKeyPath,
          value,
          col.validators,
          idKeyPath,
        )(dispatch, getState);
        if (allGood && !isValid) {
          allGood = false;
        }
      });
    });
    return allGood;
  };

export const validateCreatedRows = (id, columns) =>
  (dispatch, getState) => {
    const createData = getState().datagrid.getIn([id, 'createData'], Map());
    let allGood = true;
    createData.forEach((createDataRow, rowIndex) => {
      columns.forEach((col) => {
        const value = createDataRow.getIn(col.valueKeyPath);
        const isValid = createCellValueValidate(
          id,
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

export const updateExistingCellValue = (id, dataId, keyPath, value) =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_UPDATE_EXISTING_CELL_VALUE,
      id,
      dataId,
      keyPath,
      value,
    });
