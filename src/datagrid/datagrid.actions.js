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
  PLATFORM_DATAGRID_FILTER_DATA_CHANGE: 'PLATFORM_DATAGRID_FILTER_DATA_CHANGE',
  PLATFORM_DATAGRID_APPLY_FILTERS: 'PLATFORM_DATAGRID_APPLY_FILTERS',
  PLATFORM_DATAGRID_UPDATE_EXISTING_CELL_VALUE: 'PLATFORM_DATAGRID_UPDATE_EXISTING_CELL_VALUE',
};

export const invalidate = grid =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_INVALIDATE,
      id: grid.id,
    });

export const setBusy = grid =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_BUSY,
      id: grid.id,
    });

export const setReady = grid =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_READY,
      id: grid.id,
    });

export const applyFilters = (grid, columns) =>
  (dispatch, getState) => {
    if (!columns || !columns.forEach) return false;
    const gridData = getState().datagrid.get(grid.id);
    const filterData = gridData.getIn(['config', 'filteringData', 'filterData'], Map());
    const allData = gridData.get('allData');
    setBusy(grid)(dispatch);
    let data;
    if (filterData.isEmpty()) {
      data = allData;
    } else {
      data = allData.filter((row) => {
        let hits = 0;
        filterData.forEach((filterValue, filterColumn) => {
          columns.forEach((column) => {
            if (Utils.getColumnKey(column) === filterColumn) {
              const rowData = row.getIn(column.valueKeyPath);
              if (rowData || rowData === 0 || rowData === false) {
                const filterFunctions = Utils.getFilterFunctions(column);
                if (filterFunctions.filterMatcher(rowData, filterValue)) {
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

export const filterCellValueChange = (grid, columns, column, value) =>
  (dispatch, getState) => {
    const origFilterData = getState()
      .datagrid
      .getIn([grid.id, 'config', 'filteringData', 'filterData'], Map());
    const columnKey = Utils.getColumnKey(column);
    const filterFunctions = Utils.getFilterFunctions(column);
    let filterData;
    if (filterFunctions.valueEmptyChecker(value)) {
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

export const applySort = (grid, columns) =>
  (dispatch, getState) => {
    if (!columns || !columns.forEach) return false;
    const gridData = getState().datagrid.get(grid.id);
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
    const origAllData = gridData.get('allData');
    const comparator = Utils.getSortComparator(column);
    const valueGetter = Utils.getSortValueGetter(column);
    const allData = origAllData.sort((a, b) => {
      if (sortOrder === 'asc') {
        return comparator(valueGetter(a), valueGetter(b));
      }
      return comparator(valueGetter(b), valueGetter(a));
    });
    let data;
    // Sort also filtered data separately
    if (gridData.getIn(['config', 'filteringData', 'isFiltering'], false)) {
      data = gridData.get('data').sort((a, b) => {
        if (sortOrder === 'asc') {
          return comparator(valueGetter(a), valueGetter(b));
        }
        return comparator(valueGetter(b), valueGetter(a));
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

export const sortChange = (grid, columns, column, newSort) =>
  (dispatch, getState) => {
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

export const setData = (grid, columns, data) =>
  (dispatch, getState) => {
    const configData = Utils.loadGridConfig(grid);
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
    applyFilters(grid, columns)(dispatch, getState);
    applySort(grid, columns)(dispatch, getState);
  };

export const resizeColumn = (grid, columnKey, width) =>
  (dispatch, getState) => {
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

export const edit = grid =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_EDIT,
      id: grid.id,
    });

export const cancel = grid =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CANCEL,
      id: grid.id,
    });

export const save = (grid, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_SAVE,
      id: grid.id,
    });
    cb();
  };

export const saveSuccess = (grid, savedItems) =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_SAVE_SUCCESS,
      id: grid.id,
      idKeyPath: grid.idKeyPath,
      savedItems,
    });

export const savePartialSuccess = (grid, savedItems) =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_SAVE_PARTIAL_SUCCESS,
      id: grid.id,
      idKeyPath: grid.idKeyPath,
      savedItems,
    });

export const saveFail = grid =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_SAVE_FAIL,
      id: grid.id,
    });

export const create = (grid, columnDefaultValues) =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CREATE,
      id: grid.id,
      columnDefaultValues,
    });

export const addNewItem = (grid, columnDefaultValues) =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_ADD_NEW_ITEM,
      id: grid.id,
      columnDefaultValues,
    });

export const removeNewItem = (grid, index) =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_REMOVE_NEW_ITEM,
      id: grid.id,
      index,
    });

export const remove = (grid, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_REMOVE,
      id: grid.id,
    });
    cb();
  };

export const removeSuccess = (grid, removedIds) =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_REMOVE_SUCCESS,
      id: grid.id,
      idKeyPath: grid.idKeyPath,
      removedIds,
    });

export const removeFail = grid =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_REMOVE_FAIL,
      id: grid.id,
    });

export const editCellValueChange = (grid, dataId, keyPath, value) =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_EDIT_CELL_VALUE_CHANGE,
      id: grid.id,
      dataId,
      keyPath,
      value,
    });

export const editCellValueValidate = (
  grid,
  dataId,
  keyPath,
  value,
  validators = [],
) =>
  (dispatch, getState) => {
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
                const foundIndex = allData.findIndex(d =>
                  d.getIn(grid.idKeyPath) === editDataItemId,
                );
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
                message: 'ValidationUnique',
              };
            }
          }
        } else if (validator.validateWithRowData) {
          const gridData = getState().datagrid.get(grid.id);
          const editData = gridData.getIn(['editData', dataId], Map());
          let rowData = gridData.get('allData').find(item => item.getIn(grid.idKeyPath) === dataId);
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

export const createCellValueChange = (grid, rowIndex, keyPath, value) =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CREATE_CELL_VALUE_CHANGE,
      id: grid.id,
      rowIndex,
      keyPath,
      value,
    });

export const createCellValueValidate = (grid, rowIndex, keyPath, value, validators = []) =>
  (dispatch, getState) => {
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
                message: 'ValidationUnique',
              };
            } else {
              const find2 = getState()
                              .datagrid
                              .getIn([grid.id, 'createData'])
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
          const rowData = getState().datagrid.getIn([grid.id, 'createData', rowIndex]);
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

export const cellShowMessage = (grid, messageType, dataId, keyPath, messageId, messageValues) =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CELL_SHOW_MESSAGE,
      id: grid.id,
      messageType,
      dataId,
      keyPath,
      messageId,
      messageValues,
    });

export const cellHideMessage = (grid, messageType = null, dataId = null, keyPath = null) =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CELL_HIDE_MESSAGE,
      id: grid.id,
      messageType,
      dataId,
      keyPath,
    });

export const createCellShowMessage = (
  grid,
  messageType,
  rowIndex,
  keyPath,
  messageId,
  messageValues,
) =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CREATE_CELL_SHOW_MESSAGE,
      id: grid.id,
      messageType,
      rowIndex,
      keyPath,
      messageId,
      messageValues,
    });

export const createCellHideMessage = (grid, messageType = null, rowIndex = null, keyPath = null) =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CREATE_CELL_HIDE_MESSAGE,
      id: grid.id,
      messageType,
      rowIndex,
      keyPath,
    });

export const itemSelectionChange = (
  grid,
  rowIndex,
  ctrlPressed = false,
  shiftPressed = false,
) =>
  (dispatch, getState) => {
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

export const selectAllItemsChange = grid =>
  (dispatch, getState) => {
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_SELECT_ALL_ITEMS_CHANGE,
      id: grid.id,
      idKeyPath: grid.idKeyPath,
    });
    Utils.saveSelectedItems(grid, getState().datagrid.getIn([grid.id, 'selectedItems']));
  };

export const clearSelectedItems = grid =>
  (dispatch, getState) => {
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CLEAR_SELECTED_ITEMS,
      id: grid.id,
    });
    Utils.saveSelectedItems(grid, getState().datagrid.getIn([grid.id, 'selectedItems']));
  };

export const toggleFiltering = grid =>
  (dispatch, getState) => {
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

export const validateEditedRows = (grid, columns) =>
  (dispatch, getState) => {
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

export const validateCreatedRows = (grid, columns) =>
  (dispatch, getState) => {
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

export const updateExistingCellValue = (grid, dataId, keyPath, value) =>
  dispatch =>
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_UPDATE_EXISTING_CELL_VALUE,
      id: grid.id,
      dataId,
      keyPath,
      value,
    });
