import Immutable, { Map } from 'immutable';
import Utils from './datagrid.utils';

export var TYPES = {
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
  PLATFORM_DATAGRID_UPDATE_EXISTING_CELL_VALUE: 'PLATFORM_DATAGRID_UPDATE_EXISTING_CELL_VALUE',
  PLATFORM_DATAGRID_SET_EDIT_DATA: 'PLATFORM_DATAGRID_SET_EDIT_DATA',
  PLATFORM_DATAGRID_COLUMN_SETTINGS_MODAL_OPEN: 'PLATFORM_DATAGRID_COLUMN_SETTINGS_MODAL_OPEN',
  PLATFORM_DATAGRID_COLUMN_SETTINGS_MODAL_CLOSE: 'PLATFORM_DATAGRID_COLUMN_SETTINGS_MODAL_CLOSE',
  PLATFORM_DATAGRID_COLUMN_SETTINGS_SAVE: 'PLATFORM_DATAGRID_COLUMN_SETTINGS_SAVE'
};

export var invalidate = function invalidate(grid) {
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_INVALIDATE,
      id: grid.id
    });
  };
};

export var setBusy = function setBusy(grid) {
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_BUSY,
      id: grid.id
    });
  };
};

export var setReady = function setReady(grid) {
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_READY,
      id: grid.id
    });
  };
};

export var applyFilters = function applyFilters(grid, columns) {
  return function (dispatch, getState) {
    Utils.checkGridParam(grid);
    if (!columns || !columns.forEach) return false;
    var gridData = getState().datagrid.get(grid.id);
    if (!gridData) return false;
    var filterData = gridData.getIn(['config', 'filteringData', 'filterData'], Map());
    var allData = gridData.get('allData');
    setBusy(grid)(dispatch);
    var data = void 0;
    if (filterData.isEmpty()) {
      data = allData;
    } else {
      var dateFormat = Utils.getDateFormat(grid, getState().user);
      data = allData.filter(function (row) {
        var hits = 0;
        filterData.forEach(function (filterValue, filterColumn) {
          columns.forEach(function (column) {
            if (Utils.getColumnKey(column) === filterColumn) {
              var rowData = row.getIn(column.valueKeyPath);
              if (rowData || rowData === 0 || rowData === false) {
                var filterMatcher = Utils.getFilterMatcher(column, dateFormat);
                if (filterMatcher(rowData, filterValue)) {
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
      data: data
    });
    setReady(grid)(dispatch);
    return true;
  };
};

export var filterCellValueChange = function filterCellValueChange(grid, columns, column, value) {
  return function (dispatch, getState) {
    Utils.checkGridParam(grid);
    var origFilterData = getState().datagrid.getIn([grid.id, 'config', 'filteringData', 'filterData'], Map());
    var columnKey = Utils.getColumnKey(column);
    var valueEmptyChecker = Utils.getValueEmptyChecker(column);
    var filterData = void 0;
    if (valueEmptyChecker(value)) {
      filterData = origFilterData.delete(columnKey);
    } else {
      filterData = origFilterData.set(columnKey, value);
    }
    Utils.saveFilterData(grid, filterData);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_FILTER_DATA_CHANGE,
      id: grid.id,
      filterData: filterData
    });
    applyFilters(grid, columns)(dispatch, getState);
  };
};

export var applySort = function applySort(grid, columns) {
  return function (dispatch, getState) {
    Utils.checkGridParam(grid);
    if (!columns || !columns.forEach) return false;
    var gridData = getState().datagrid.get(grid.id);
    if (!gridData) return false;
    var sortData = gridData.getIn(['config', 'sortingData']);
    if (!sortData) return false;
    var sortColumn = sortData.get('sortColumn');
    if (!sortColumn) return false;
    var sortOrder = sortData.get('sortOrder', 'asc');
    var column = void 0;
    columns.forEach(function (col) {
      if (Utils.getColumnKey(col) === sortColumn) {
        column = col;
      }
    });
    if (!column) return false;

    setBusy(grid)(dispatch);
    var origAllData = gridData.get('allData');
    var comparator = Utils.getSortComparator(column);
    var valueGetter = Utils.getSortValueGetter(column);
    var valueEmptyChecker = Utils.getValueEmptyChecker(column);
    var allData = origAllData.sort(function (a, b) {
      var valA = valueGetter(a);
      var valB = valueGetter(b);
      if (sortOrder === 'asc') {
        if (valueEmptyChecker(valA)) return -1;
        if (valueEmptyChecker(valB)) return 1;
        return comparator(valA, valB);
      }
      if (valueEmptyChecker(valA)) return 1;
      if (valueEmptyChecker(valB)) return -1;
      return comparator(valB, valA);
    });
    var data = void 0;
    // Sort also filtered data separately
    if (gridData.getIn(['config', 'filteringData', 'isFiltering'], false)) {
      data = gridData.get('data').sort(function (a, b) {
        var valA = valueGetter(a);
        var valB = valueGetter(b);
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
      data: data,
      allData: allData
    });
    setReady(grid)(dispatch);
    return true;
  };
};

export var sortChange = function sortChange(grid, columns, column, newSort) {
  return function (dispatch, getState) {
    Utils.checkGridParam(grid);
    var sortOrder = newSort || 'asc';
    var sortColumn = Utils.getColumnKey(column);
    Utils.saveSortData(grid, { sortColumn: sortColumn, sortOrder: sortOrder });
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_SORT_CHANGE,
      id: grid.id,
      sortColumn: sortColumn,
      sortOrder: sortOrder
    });
    applySort(grid, columns)(dispatch, getState);
  };
};

export var setData = function setData(grid, columns, data) {
  return function (dispatch, getState) {
    Utils.checkGridParam(grid);
    Utils.checkColumnsParam(columns);
    var configData = Utils.loadGridConfig(grid, columns);
    var immutableData = Immutable.Iterable.isIterable(data) ? data : Immutable.fromJS(data);
    var selectedItems = Utils.loadSelectedItems(grid).filter(function (item) {
      return !!immutableData.find(function (dataItem) {
        return dataItem.getIn(grid.idKeyPath) === item;
      });
    });
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_SET_DATA,
      id: grid.id,
      data: immutableData,
      config: configData,
      selectedItems: selectedItems
    });
    applyFilters(grid, columns)(dispatch, getState);
    applySort(grid, columns)(dispatch, getState);
  };
};

export var extendData = function extendData(grid, columns, data) {
  return function (dispatch, getState) {
    Utils.checkGridParam(grid);
    var immutableData = Immutable.Iterable.isIterable(data) ? data : Immutable.fromJS(data);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_EXTEND_DATA,
      id: grid.id,
      data: immutableData
    });
    applyFilters(grid, columns)(dispatch, getState);
    applySort(grid, columns)(dispatch, getState);
  };
};

export var resizeColumn = function resizeColumn(grid, columnKey, width) {
  return function (dispatch, getState) {
    Utils.checkGridParam(grid);
    var columnWidths = getState().datagrid.getIn([grid.id, 'config', 'columnWidths'], Map()).set(columnKey, width);
    Utils.saveColumnWidths(grid, columnWidths);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_RESIZE_COLUMN,
      id: grid.id,
      columnWidths: columnWidths
    });
  };
};

export var edit = function edit(grid) {
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_EDIT,
      id: grid.id
    });
  };
};

export var cancel = function cancel(grid) {
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CANCEL,
      id: grid.id
    });
  };
};

export var save = function save(grid) {
  var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_SAVE,
      id: grid.id
    });
    cb();
  };
};

export var saveSuccess = function saveSuccess(grid, columns, savedItems) {
  return function (dispatch, getState) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_SAVE_SUCCESS,
      id: grid.id,
      idKeyPath: grid.idKeyPath,
      savedItems: savedItems
    });
    applyFilters(grid, columns)(dispatch, getState);
    applySort(grid, columns)(dispatch, getState);
  };
};

export var savePartialSuccess = function savePartialSuccess(grid, columns, savedItems) {
  return function (dispatch, getState) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_SAVE_PARTIAL_SUCCESS,
      id: grid.id,
      idKeyPath: grid.idKeyPath,
      savedItems: savedItems
    });
    applyFilters(grid, columns)(dispatch, getState);
    applySort(grid, columns)(dispatch, getState);
  };
};

export var saveFail = function saveFail(grid) {
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_SAVE_FAIL,
      id: grid.id
    });
  };
};

export var create = function create(grid, columnDefaultValues) {
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CREATE,
      id: grid.id,
      columnDefaultValues: columnDefaultValues
    });
  };
};

export var addNewItem = function addNewItem(grid, columnDefaultValues) {
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_ADD_NEW_ITEM,
      id: grid.id,
      columnDefaultValues: columnDefaultValues
    });
  };
};

export var removeNewItem = function removeNewItem(grid, index) {
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_REMOVE_NEW_ITEM,
      id: grid.id,
      index: index
    });
  };
};

export var removeNewItems = function removeNewItems(grid, indexes) {
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_REMOVE_NEW_ITEMS,
      id: grid.id,
      indexes: indexes
    });
  };
};

export var remove = function remove(grid) {
  var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_REMOVE,
      id: grid.id
    });
    cb();
  };
};

export var removeSuccess = function removeSuccess(grid, removedIds) {
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_REMOVE_SUCCESS,
      id: grid.id,
      idKeyPath: grid.idKeyPath,
      removedIds: removedIds
    });
  };
};

export var removeFail = function removeFail(grid) {
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_REMOVE_FAIL,
      id: grid.id
    });
  };
};

export var editCellValueChange = function editCellValueChange(grid, dataId, keyPath, value) {
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_EDIT_CELL_VALUE_CHANGE,
      id: grid.id,
      dataId: dataId,
      keyPath: keyPath,
      value: value
    });
  };
};

export var editCellValueValidate = function editCellValueValidate(grid, dataId, keyPath, value) {
  var validators = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
  return function (dispatch, getState) {
    Utils.checkGridParam(grid);
    var validationState = { valid: true };
    validators.forEach(function (validator) {
      if (validationState.valid) {
        if (validator.unique) {
          if (value !== '' || value !== null || value !== undefined) {
            // combine real data with current unsaved edited data
            var gridData = getState().datagrid.get(grid.id);
            var editData = gridData.get('editData');
            var allData = gridData.get('allData');
            if (editData) {
              editData.forEach(function (editDataItem, editDataItemId) {
                var foundIndex = allData.findIndex(function (d) {
                  return d.getIn(grid.idKeyPath) === editDataItemId;
                });
                if (foundIndex !== -1) {
                  allData = allData.mergeDeepIn([foundIndex], editDataItem);
                }
              });
            }
            // determine uniqueness
            var finding = allData.find(function (item) {
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
                message: 'Validation.Unique'
              };
            }
          }
        } else if (validator.validateWithRowData) {
          var _gridData = getState().datagrid.get(grid.id);
          var _editData = _gridData.getIn(['editData', dataId], Map());
          var rowData = _gridData.get('allData').find(function (item) {
            return item.getIn(grid.idKeyPath) === dataId;
          });
          if (rowData) {
            rowData = rowData.mergeDeep(_editData);
            validationState = validator.validateWithRowData(value, rowData);
          }
        } else {
          var params = validator.params ? Object.values(validator.params) : [];
          validationState = validator.validate.apply(validator, [value].concat(params));
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
        dataId: dataId,
        keyPath: keyPath
      });
    } else {
      dispatch({
        type: TYPES.PLATFORM_DATAGRID_CELL_SHOW_MESSAGE,
        id: grid.id,
        messageType: 'error',
        dataId: dataId,
        keyPath: keyPath,
        messageId: validationState.message,
        messageValues: validationState.messageValues
      });
    }
    return validationState.valid;
  };
};

export var createCellValueChange = function createCellValueChange(grid, rowIndex, keyPath, value) {
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CREATE_CELL_VALUE_CHANGE,
      id: grid.id,
      rowIndex: rowIndex,
      keyPath: keyPath,
      value: value
    });
  };
};

export var createCellValueValidate = function createCellValueValidate(grid, rowIndex, keyPath, value) {
  var validators = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
  return function (dispatch, getState) {
    Utils.checkGridParam(grid);
    var validationState = { valid: true };
    validators.forEach(function (validator) {
      if (validationState.valid) {
        if (validator.unique) {
          if (value !== '' || value !== null || value !== undefined) {
            var finding = getState().datagrid.getIn([grid.id, 'allData']).find(function (item) {
              return item.getIn(keyPath) === value;
            });
            if (finding) {
              validationState = {
                valid: false,
                message: 'Validation.Unique'
              };
            } else {
              var find2 = getState().datagrid.getIn([grid.id, 'createData']).find(function (item, i) {
                return i !== rowIndex && item.getIn(keyPath) === value;
              });
              if (find2) {
                validationState = {
                  valid: false,
                  message: 'Validation.Unique'
                };
              }
            }
          }
        } else if (validator.validateWithRowData) {
          var rowData = getState().datagrid.getIn([grid.id, 'createData', rowIndex]);
          validationState = validator.validateWithRowData(value, rowData);
        } else {
          var params = validator.params ? Object.values(validator.params) : [];
          validationState = validator.validate.apply(validator, [value].concat(params));
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
        rowIndex: rowIndex,
        keyPath: keyPath
      });
    } else {
      dispatch({
        type: TYPES.PLATFORM_DATAGRID_CREATE_CELL_SHOW_MESSAGE,
        id: grid.id,
        messageType: 'error',
        rowIndex: rowIndex,
        keyPath: keyPath,
        messageId: validationState.message,
        messageValues: validationState.messageValues
      });
    }
    return validationState.valid;
  };
};

export var cellShowMessage = function cellShowMessage(grid, messageType, dataId, keyPath, messageId, messageValues) {
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CELL_SHOW_MESSAGE,
      id: grid.id,
      messageType: messageType,
      dataId: dataId,
      keyPath: keyPath,
      messageId: messageId,
      messageValues: messageValues
    });
  };
};

export var cellShowMessages = function cellShowMessages(grid, messages) {
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CELL_SHOW_MESSAGES,
      id: grid.id,
      messages: messages
    });
  };
};

export var cellHideMessage = function cellHideMessage(grid) {
  var messageType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var dataId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var keyPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CELL_HIDE_MESSAGE,
      id: grid.id,
      messageType: messageType,
      dataId: dataId,
      keyPath: keyPath
    });
  };
};

export var createCellShowMessage = function createCellShowMessage(grid, messageType, rowIndex, keyPath, messageId, messageValues) {
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CREATE_CELL_SHOW_MESSAGE,
      id: grid.id,
      messageType: messageType,
      rowIndex: rowIndex,
      keyPath: keyPath,
      messageId: messageId,
      messageValues: messageValues
    });
  };
};

export var createCellHideMessage = function createCellHideMessage(grid) {
  var messageType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var rowIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var keyPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CREATE_CELL_HIDE_MESSAGE,
      id: grid.id,
      messageType: messageType,
      rowIndex: rowIndex,
      keyPath: keyPath
    });
  };
};

export var cellSelectionChange = function cellSelectionChange(grid) {
  var selectedCell = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      selectedCell: selectedCell,
      id: grid.id,
      type: TYPES.PLATFORM_DATAGRID_CELL_SELECTION_CHANGE
    });
  };
};

export var itemSelectionChange = function itemSelectionChange(grid, rowIndex) {
  var ctrlPressed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var shiftPressed = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  return function (dispatch, getState) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_ITEM_SELECTION_CHANGE,
      id: grid.id,
      rowIndex: rowIndex,
      idKeyPath: grid.idKeyPath,
      ctrlPressed: ctrlPressed,
      shiftPressed: shiftPressed
    });
    Utils.saveSelectedItems(grid, getState().datagrid.getIn([grid.id, 'selectedItems']));
  };
};

export var selectAllItemsChange = function selectAllItemsChange(grid) {
  return function (dispatch, getState) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_SELECT_ALL_ITEMS_CHANGE,
      id: grid.id,
      idKeyPath: grid.idKeyPath
    });
    Utils.saveSelectedItems(grid, getState().datagrid.getIn([grid.id, 'selectedItems']));
  };
};

export var clearSelectedItems = function clearSelectedItems(grid) {
  return function (dispatch, getState) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CLEAR_SELECTED_ITEMS,
      id: grid.id
    });
    Utils.saveSelectedItems(grid, getState().datagrid.getIn([grid.id, 'selectedItems']));
  };
};

export var toggleFiltering = function toggleFiltering(grid) {
  return function (dispatch, getState) {
    Utils.checkGridParam(grid);
    var isFiltering = !getState().datagrid.getIn([grid.id, 'config', 'filteringData', 'isFiltering'], false);
    Utils.saveIsFiltering(grid, isFiltering);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_TOGGLE_FILTERING,
      id: grid.id,
      isFiltering: isFiltering
    });
  };
};

export var validateEditedRows = function validateEditedRows(grid, columns) {
  return function (dispatch, getState) {
    Utils.checkGridParam(grid);
    var gridData = getState().datagrid.get(grid.id);
    var editData = gridData.get('editData', Map());
    var allGood = true;
    editData.forEach(function (editDataRow, dataId) {
      columns.forEach(function (col) {
        var value = editDataRow.getIn(col.valueKeyPath);
        if (value === undefined) {
          value = gridData.get('allData').find(function (data) {
            return data.getIn(grid.idKeyPath) === dataId;
          }).getIn(col.valueKeyPath);
        }
        var isValid = editCellValueValidate(grid, dataId, col.valueKeyPath, value, col.validators)(dispatch, getState);
        if (allGood && !isValid) {
          allGood = false;
        }
      });
    });
    return allGood;
  };
};

export var removeEmptyCreatedRows = function removeEmptyCreatedRows(grid, columns) {
  return function (dispatch, getState) {
    Utils.checkGridParam(grid);
    var createData = getState().datagrid.getIn([grid.id, 'createData'], Map());
    var indexes = [];
    createData.forEach(function (createDataRow, rowIndex) {
      var isEmpty = true;
      columns.forEach(function (col) {
        var value = createDataRow.getIn(col.valueKeyPath);
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
};

export var validateCreatedRows = function validateCreatedRows(grid, columns) {
  return function (dispatch, getState) {
    Utils.checkGridParam(grid);
    removeEmptyCreatedRows(grid, columns)(dispatch, getState);
    var createData = getState().datagrid.getIn([grid.id, 'createData'], Map());
    var allGood = true;
    createData.forEach(function (createDataRow, rowIndex) {
      columns.forEach(function (col) {
        var value = createDataRow.getIn(col.valueKeyPath);
        var isValid = createCellValueValidate(grid, rowIndex, col.valueKeyPath, value, col.validators)(dispatch, getState);
        if (allGood && !isValid) {
          allGood = false;
        }
      });
    });
    return allGood;
  };
};

export var updateExistingCellValue = function updateExistingCellValue(grid, dataId, keyPath, value) {
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_UPDATE_EXISTING_CELL_VALUE,
      id: grid.id,
      dataId: dataId,
      keyPath: keyPath,
      value: value
    });
  };
};

export var setEditData = function setEditData(grid, data) {
  var cellMessages = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Map();
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      data: data,
      cellMessages: cellMessages,
      id: grid.id,
      type: TYPES.PLATFORM_DATAGRID_SET_EDIT_DATA
    });
  };
};

export var openColumnSettingsModal = function openColumnSettingsModal(grid) {
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_COLUMN_SETTINGS_MODAL_OPEN,
      id: grid.id
    });
  };
};

export var closeColumnSettingsModal = function closeColumnSettingsModal(grid) {
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_COLUMN_SETTINGS_MODAL_CLOSE,
      id: grid.id
    });
  };
};

export var saveColumnSettings = function saveColumnSettings(grid, hiddenColumns, columnOrder) {
  return function (dispatch) {
    Utils.checkGridParam(grid);
    Utils.saveColumnSettings(grid, hiddenColumns, columnOrder);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_COLUMN_SETTINGS_SAVE,
      id: grid.id,
      columnOrder: columnOrder
    });
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5hY3Rpb25zLmpzIl0sIm5hbWVzIjpbIkltbXV0YWJsZSIsIk1hcCIsIlV0aWxzIiwiVFlQRVMiLCJQTEFURk9STV9EQVRBR1JJRF9JTlZBTElEQVRFIiwiUExBVEZPUk1fREFUQUdSSURfQlVTWSIsIlBMQVRGT1JNX0RBVEFHUklEX1JFQURZIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX0RBVEEiLCJQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9TT1JUIiwiUExBVEZPUk1fREFUQUdSSURfU09SVF9DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9SRVNJWkVfQ09MVU1OIiwiUExBVEZPUk1fREFUQUdSSURfRURJVCIsIlBMQVRGT1JNX0RBVEFHUklEX0NBTkNFTCIsIlBMQVRGT1JNX0RBVEFHUklEX1NBVkUiLCJQTEFURk9STV9EQVRBR1JJRF9FWFRFTkRfREFUQSIsIlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfU1VDQ0VTUyIsIlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfUEFSVElBTF9TVUNDRVNTIiwiUExBVEZPUk1fREFUQUdSSURfU0FWRV9GQUlMIiwiUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFIiwiUExBVEZPUk1fREFUQUdSSURfQUREX05FV19JVEVNIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNUyIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRSIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9TVUNDRVNTIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUwiLCJQTEFURk9STV9EQVRBR1JJRF9FRElUX0NFTExfVkFMVUVfQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0UiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRVMiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX0hJREVfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX0NIQU5HRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX1ZBTElEQVRFIiwiUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TRUxFQ1RJT05fQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9DTEVBUl9TRUxFQ1RFRF9JVEVNUyIsIlBMQVRGT1JNX0RBVEFHUklEX1RPR0dMRV9GSUxURVJJTkciLCJQTEFURk9STV9EQVRBR1JJRF9GSUxURVJfREFUQV9DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9GSUxURVJTIiwiUExBVEZPUk1fREFUQUdSSURfVVBEQVRFX0VYSVNUSU5HX0NFTExfVkFMVUUiLCJQTEFURk9STV9EQVRBR1JJRF9TRVRfRURJVF9EQVRBIiwiUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX09QRU4iLCJQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfQ0xPU0UiLCJQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfU0FWRSIsImludmFsaWRhdGUiLCJkaXNwYXRjaCIsImNoZWNrR3JpZFBhcmFtIiwiZ3JpZCIsInR5cGUiLCJpZCIsInNldEJ1c3kiLCJzZXRSZWFkeSIsImFwcGx5RmlsdGVycyIsImNvbHVtbnMiLCJnZXRTdGF0ZSIsImZvckVhY2giLCJncmlkRGF0YSIsImRhdGFncmlkIiwiZ2V0IiwiZmlsdGVyRGF0YSIsImdldEluIiwiYWxsRGF0YSIsImRhdGEiLCJpc0VtcHR5IiwiZGF0ZUZvcm1hdCIsImdldERhdGVGb3JtYXQiLCJ1c2VyIiwiZmlsdGVyIiwicm93IiwiaGl0cyIsImZpbHRlclZhbHVlIiwiZmlsdGVyQ29sdW1uIiwiY29sdW1uIiwiZ2V0Q29sdW1uS2V5Iiwicm93RGF0YSIsInZhbHVlS2V5UGF0aCIsImZpbHRlck1hdGNoZXIiLCJnZXRGaWx0ZXJNYXRjaGVyIiwic2l6ZSIsImZpbHRlckNlbGxWYWx1ZUNoYW5nZSIsInZhbHVlIiwib3JpZ0ZpbHRlckRhdGEiLCJjb2x1bW5LZXkiLCJ2YWx1ZUVtcHR5Q2hlY2tlciIsImdldFZhbHVlRW1wdHlDaGVja2VyIiwiZGVsZXRlIiwic2V0Iiwic2F2ZUZpbHRlckRhdGEiLCJhcHBseVNvcnQiLCJzb3J0RGF0YSIsInNvcnRDb2x1bW4iLCJzb3J0T3JkZXIiLCJjb2wiLCJvcmlnQWxsRGF0YSIsImNvbXBhcmF0b3IiLCJnZXRTb3J0Q29tcGFyYXRvciIsInZhbHVlR2V0dGVyIiwiZ2V0U29ydFZhbHVlR2V0dGVyIiwic29ydCIsImEiLCJiIiwidmFsQSIsInZhbEIiLCJzb3J0Q2hhbmdlIiwibmV3U29ydCIsInNhdmVTb3J0RGF0YSIsInNldERhdGEiLCJjaGVja0NvbHVtbnNQYXJhbSIsImNvbmZpZ0RhdGEiLCJsb2FkR3JpZENvbmZpZyIsImltbXV0YWJsZURhdGEiLCJJdGVyYWJsZSIsImlzSXRlcmFibGUiLCJmcm9tSlMiLCJzZWxlY3RlZEl0ZW1zIiwibG9hZFNlbGVjdGVkSXRlbXMiLCJmaW5kIiwiZGF0YUl0ZW0iLCJpZEtleVBhdGgiLCJpdGVtIiwiY29uZmlnIiwiZXh0ZW5kRGF0YSIsInJlc2l6ZUNvbHVtbiIsIndpZHRoIiwiY29sdW1uV2lkdGhzIiwic2F2ZUNvbHVtbldpZHRocyIsImVkaXQiLCJjYW5jZWwiLCJzYXZlIiwiY2IiLCJzYXZlU3VjY2VzcyIsInNhdmVkSXRlbXMiLCJzYXZlUGFydGlhbFN1Y2Nlc3MiLCJzYXZlRmFpbCIsImNyZWF0ZSIsImNvbHVtbkRlZmF1bHRWYWx1ZXMiLCJhZGROZXdJdGVtIiwicmVtb3ZlTmV3SXRlbSIsImluZGV4IiwicmVtb3ZlTmV3SXRlbXMiLCJpbmRleGVzIiwicmVtb3ZlIiwicmVtb3ZlU3VjY2VzcyIsInJlbW92ZWRJZHMiLCJyZW1vdmVGYWlsIiwiZWRpdENlbGxWYWx1ZUNoYW5nZSIsImRhdGFJZCIsImtleVBhdGgiLCJlZGl0Q2VsbFZhbHVlVmFsaWRhdGUiLCJ2YWxpZGF0b3JzIiwidmFsaWRhdGlvblN0YXRlIiwidmFsaWQiLCJ2YWxpZGF0b3IiLCJ1bmlxdWUiLCJ1bmRlZmluZWQiLCJlZGl0RGF0YSIsImVkaXREYXRhSXRlbSIsImVkaXREYXRhSXRlbUlkIiwiZm91bmRJbmRleCIsImZpbmRJbmRleCIsImQiLCJtZXJnZURlZXBJbiIsImZpbmRpbmciLCJsZW5ndGgiLCJtZXNzYWdlIiwidmFsaWRhdGVXaXRoUm93RGF0YSIsIm1lcmdlRGVlcCIsInBhcmFtcyIsIk9iamVjdCIsInZhbHVlcyIsInZhbGlkYXRlIiwibWVzc2FnZVZhbHVlcyIsIm1lc3NhZ2VUeXBlIiwibWVzc2FnZUlkIiwiY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlIiwicm93SW5kZXgiLCJjcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZSIsImZpbmQyIiwiaSIsImNlbGxTaG93TWVzc2FnZSIsImNlbGxTaG93TWVzc2FnZXMiLCJtZXNzYWdlcyIsImNlbGxIaWRlTWVzc2FnZSIsImNyZWF0ZUNlbGxTaG93TWVzc2FnZSIsImNyZWF0ZUNlbGxIaWRlTWVzc2FnZSIsImNlbGxTZWxlY3Rpb25DaGFuZ2UiLCJzZWxlY3RlZENlbGwiLCJpdGVtU2VsZWN0aW9uQ2hhbmdlIiwiY3RybFByZXNzZWQiLCJzaGlmdFByZXNzZWQiLCJzYXZlU2VsZWN0ZWRJdGVtcyIsInNlbGVjdEFsbEl0ZW1zQ2hhbmdlIiwiY2xlYXJTZWxlY3RlZEl0ZW1zIiwidG9nZ2xlRmlsdGVyaW5nIiwiaXNGaWx0ZXJpbmciLCJzYXZlSXNGaWx0ZXJpbmciLCJ2YWxpZGF0ZUVkaXRlZFJvd3MiLCJhbGxHb29kIiwiZWRpdERhdGFSb3ciLCJpc1ZhbGlkIiwicmVtb3ZlRW1wdHlDcmVhdGVkUm93cyIsImNyZWF0ZURhdGEiLCJjcmVhdGVEYXRhUm93IiwicHVzaCIsInZhbGlkYXRlQ3JlYXRlZFJvd3MiLCJ1cGRhdGVFeGlzdGluZ0NlbGxWYWx1ZSIsInNldEVkaXREYXRhIiwiY2VsbE1lc3NhZ2VzIiwib3BlbkNvbHVtblNldHRpbmdzTW9kYWwiLCJjbG9zZUNvbHVtblNldHRpbmdzTW9kYWwiLCJzYXZlQ29sdW1uU2V0dGluZ3MiLCJoaWRkZW5Db2x1bW5zIiwiY29sdW1uT3JkZXIiXSwibWFwcGluZ3MiOiJBQUFBLE9BQU9BLFNBQVAsSUFBb0JDLEdBQXBCLFFBQStCLFdBQS9CO0FBQ0EsT0FBT0MsS0FBUCxNQUFrQixrQkFBbEI7O0FBRUEsT0FBTyxJQUFNQyxRQUFRO0FBQ25CQyxnQ0FBOEIsOEJBRFg7QUFFbkJDLDBCQUF3Qix3QkFGTDtBQUduQkMsMkJBQXlCLHlCQUhOO0FBSW5CQyw4QkFBNEIsNEJBSlQ7QUFLbkJDLGdDQUE4Qiw4QkFMWDtBQU1uQkMsaUNBQStCLCtCQU5aO0FBT25CQyxtQ0FBaUMsaUNBUGQ7QUFRbkJDLDBCQUF3Qix3QkFSTDtBQVNuQkMsNEJBQTBCLDBCQVRQO0FBVW5CQywwQkFBd0Isd0JBVkw7QUFXbkJDLGlDQUErQiwrQkFYWjtBQVluQkMsa0NBQWdDLGdDQVpiO0FBYW5CQywwQ0FBd0Msd0NBYnJCO0FBY25CQywrQkFBNkIsNkJBZFY7QUFlbkJDLDRCQUEwQiwwQkFmUDtBQWdCbkJDLGtDQUFnQyxnQ0FoQmI7QUFpQm5CQyxxQ0FBbUMsbUNBakJoQjtBQWtCbkJDLHNDQUFvQyxvQ0FsQmpCO0FBbUJuQkMsNEJBQTBCLDBCQW5CUDtBQW9CbkJDLG9DQUFrQyxrQ0FwQmY7QUFxQm5CQyxpQ0FBK0IsK0JBckJaO0FBc0JuQkMsNENBQTBDLDBDQXRCdkI7QUF1Qm5CQyx1Q0FBcUMscUNBdkJsQjtBQXdCbkJDLHdDQUFzQyxzQ0F4Qm5CO0FBeUJuQkMsdUNBQXFDLHFDQXpCbEI7QUEwQm5C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S0U7QUFGRixLQUFUO0FBSUQsR0FQcUM7QUFBQSxDQUFqQzs7QUFTUCxPQUFPLElBQU1pSyxxQkFBcUIsU0FBckJBLGtCQUFxQixDQUFDbkssSUFBRCxFQUFPb0ssYUFBUCxFQUFzQkMsV0FBdEI7QUFBQSxTQUNoQyxVQUFDdkssUUFBRCxFQUFjO0FBQ1o1QyxVQUFNNkMsY0FBTixDQUFxQkMsSUFBckI7QUFDQTlDLFVBQU1pTixrQkFBTixDQUF5Qm5LLElBQXpCLEVBQStCb0ssYUFBL0IsRUFBOENDLFdBQTlDO0FBQ0F2SyxhQUFTO0FBQ1BHLFlBQU05QyxNQUFNeUMsc0NBREw7QUFFUE0sVUFBSUYsS0FBS0UsRUFGRjtBQUdQbUs7QUFITyxLQUFUO0FBS0QsR0FUK0I7QUFBQSxDQUEzQiIsImZpbGUiOiJkYXRhZ3JpZC5hY3Rpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEltbXV0YWJsZSwgeyBNYXAgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4vZGF0YWdyaWQudXRpbHMnO1xuXG5leHBvcnQgY29uc3QgVFlQRVMgPSB7XG4gIFBMQVRGT1JNX0RBVEFHUklEX0lOVkFMSURBVEU6ICdQTEFURk9STV9EQVRBR1JJRF9JTlZBTElEQVRFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQlVTWTogJ1BMQVRGT1JNX0RBVEFHUklEX0JVU1knLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRUFEWTogJ1BMQVRGT1JNX0RBVEFHUklEX1JFQURZJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0VUX0RBVEE6ICdQTEFURk9STV9EQVRBR1JJRF9TRVRfREFUQScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0FQUExZX1NPUlQ6ICdQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9TT1JUJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU09SVF9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9TT1JUX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFU0laRV9DT0xVTU46ICdQTEFURk9STV9EQVRBR1JJRF9SRVNJWkVfQ09MVU1OJyxcbiAgUExBVEZPUk1fREFUQUdSSURfRURJVDogJ1BMQVRGT1JNX0RBVEFHUklEX0VESVQnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DQU5DRUw6ICdQTEFURk9STV9EQVRBR1JJRF9DQU5DRUwnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TQVZFOiAnUExBVEZPUk1fREFUQUdSSURfU0FWRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0VYVEVORF9EQVRBOiAnUExBVEZPUk1fREFUQUdSSURfRVhURU5EX0RBVEEnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TQVZFX1NVQ0NFU1M6ICdQTEFURk9STV9EQVRBR1JJRF9TQVZFX1NVQ0NFU1MnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TQVZFX1BBUlRJQUxfU1VDQ0VTUzogJ1BMQVRGT1JNX0RBVEFHUklEX1NBVkVfUEFSVElBTF9TVUNDRVNTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0FWRV9GQUlMOiAnUExBVEZPUk1fREFUQUdSSURfU0FWRV9GQUlMJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFOiAnUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQUREX05FV19JVEVNOiAnUExBVEZPUk1fREFUQUdSSURfQUREX05FV19JVEVNJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNOiAnUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNUzogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTVMnLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkU6ICdQTEFURk9STV9EQVRBR1JJRF9SRU1PVkUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfU1VDQ0VTUzogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9TVUNDRVNTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUw6ICdQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfRkFJTCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0VESVRfQ0VMTF9WQUxVRV9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9FRElUX0NFTExfVkFMVUVfQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFUzogJ1BMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NFTExfSElERV9NRVNTQUdFOiAnUExBVEZPUk1fREFUQUdSSURfQ0VMTF9ISURFX01FU1NBR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9TSE9XX01FU1NBR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9TSE9XX01FU1NBR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9ISURFX01FU1NBR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9ISURFX01FU1NBR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9WQUxJREFURTogJ1BMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX1ZBTElEQVRFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TRUxFQ1RJT05fQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TRUxFQ1RJT05fQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9TRUxFQ1RfQUxMX0lURU1TX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NMRUFSX1NFTEVDVEVEX0lURU1TOiAnUExBVEZPUk1fREFUQUdSSURfQ0xFQVJfU0VMRUNURURfSVRFTVMnLFxuICBQTEFURk9STV9EQVRBR1JJRF9UT0dHTEVfRklMVEVSSU5HOiAnUExBVEZPUk1fREFUQUdSSURfVE9HR0xFX0ZJTFRFUklORycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0ZJTFRFUl9EQVRBX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX0ZJTFRFUl9EQVRBX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0FQUExZX0ZJTFRFUlM6ICdQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9GSUxURVJTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfVVBEQVRFX0VYSVNUSU5HX0NFTExfVkFMVUU6ICdQTEFURk9STV9EQVRBR1JJRF9VUERBVEVfRVhJU1RJTkdfQ0VMTF9WQUxVRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NFVF9FRElUX0RBVEE6ICdQTEFURk9STV9EQVRBR1JJRF9TRVRfRURJVF9EQVRBJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX09QRU46ICdQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfT1BFTicsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFOiAnUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX1NBVkUnLFxufTtcblxuZXhwb3J0IGNvbnN0IGludmFsaWRhdGUgPSBncmlkID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0lOVkFMSURBVEUsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHNldEJ1c3kgPSBncmlkID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0JVU1ksXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHNldFJlYWR5ID0gZ3JpZCA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRUFEWSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgYXBwbHlGaWx0ZXJzID0gKGdyaWQsIGNvbHVtbnMpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBpZiAoIWNvbHVtbnMgfHwgIWNvbHVtbnMuZm9yRWFjaCkgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG4gICAgaWYgKCFncmlkRGF0YSkgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IGZpbHRlckRhdGEgPSBncmlkRGF0YS5nZXRJbihbJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2ZpbHRlckRhdGEnXSwgTWFwKCkpO1xuICAgIGNvbnN0IGFsbERhdGEgPSBncmlkRGF0YS5nZXQoJ2FsbERhdGEnKTtcbiAgICBzZXRCdXN5KGdyaWQpKGRpc3BhdGNoKTtcbiAgICBsZXQgZGF0YTtcbiAgICBpZiAoZmlsdGVyRGF0YS5pc0VtcHR5KCkpIHtcbiAgICAgIGRhdGEgPSBhbGxEYXRhO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkYXRlRm9ybWF0ID0gVXRpbHMuZ2V0RGF0ZUZvcm1hdChncmlkLCBnZXRTdGF0ZSgpLnVzZXIpO1xuICAgICAgZGF0YSA9IGFsbERhdGEuZmlsdGVyKChyb3cpID0+IHtcbiAgICAgICAgbGV0IGhpdHMgPSAwO1xuICAgICAgICBmaWx0ZXJEYXRhLmZvckVhY2goKGZpbHRlclZhbHVlLCBmaWx0ZXJDb2x1bW4pID0+IHtcbiAgICAgICAgICBjb2x1bW5zLmZvckVhY2goKGNvbHVtbikgPT4ge1xuICAgICAgICAgICAgaWYgKFV0aWxzLmdldENvbHVtbktleShjb2x1bW4pID09PSBmaWx0ZXJDb2x1bW4pIHtcbiAgICAgICAgICAgICAgY29uc3Qgcm93RGF0YSA9IHJvdy5nZXRJbihjb2x1bW4udmFsdWVLZXlQYXRoKTtcbiAgICAgICAgICAgICAgaWYgKHJvd0RhdGEgfHwgcm93RGF0YSA9PT0gMCB8fCByb3dEYXRhID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlck1hdGNoZXIgPSBVdGlscy5nZXRGaWx0ZXJNYXRjaGVyKGNvbHVtbiwgZGF0ZUZvcm1hdCk7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlck1hdGNoZXIocm93RGF0YSwgZmlsdGVyVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICBoaXRzICs9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gaGl0cyA9PT0gZmlsdGVyRGF0YS5zaXplO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0FQUExZX0ZJTFRFUlMsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGRhdGEsXG4gICAgfSk7XG4gICAgc2V0UmVhZHkoZ3JpZCkoZGlzcGF0Y2gpO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG5leHBvcnQgY29uc3QgZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlID0gKGdyaWQsIGNvbHVtbnMsIGNvbHVtbiwgdmFsdWUpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBjb25zdCBvcmlnRmlsdGVyRGF0YSA9IGdldFN0YXRlKClcbiAgICAgIC5kYXRhZ3JpZFxuICAgICAgLmdldEluKFtncmlkLmlkLCAnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnZmlsdGVyRGF0YSddLCBNYXAoKSk7XG4gICAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbHVtbik7XG4gICAgY29uc3QgdmFsdWVFbXB0eUNoZWNrZXIgPSBVdGlscy5nZXRWYWx1ZUVtcHR5Q2hlY2tlcihjb2x1bW4pO1xuICAgIGxldCBmaWx0ZXJEYXRhO1xuICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWx1ZSkpIHtcbiAgICAgIGZpbHRlckRhdGEgPSBvcmlnRmlsdGVyRGF0YS5kZWxldGUoY29sdW1uS2V5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmlsdGVyRGF0YSA9IG9yaWdGaWx0ZXJEYXRhLnNldChjb2x1bW5LZXksIHZhbHVlKTtcbiAgICB9XG4gICAgVXRpbHMuc2F2ZUZpbHRlckRhdGEoZ3JpZCwgZmlsdGVyRGF0YSk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfRklMVEVSX0RBVEFfQ0hBTkdFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBmaWx0ZXJEYXRhLFxuICAgIH0pO1xuICAgIGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICB9O1xuXG5leHBvcnQgY29uc3QgYXBwbHlTb3J0ID0gKGdyaWQsIGNvbHVtbnMpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBpZiAoIWNvbHVtbnMgfHwgIWNvbHVtbnMuZm9yRWFjaCkgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG4gICAgaWYgKCFncmlkRGF0YSkgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IHNvcnREYXRhID0gZ3JpZERhdGEuZ2V0SW4oWydjb25maWcnLCAnc29ydGluZ0RhdGEnXSk7XG4gICAgaWYgKCFzb3J0RGF0YSkgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IHNvcnRDb2x1bW4gPSBzb3J0RGF0YS5nZXQoJ3NvcnRDb2x1bW4nKTtcbiAgICBpZiAoIXNvcnRDb2x1bW4pIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBzb3J0T3JkZXIgPSBzb3J0RGF0YS5nZXQoJ3NvcnRPcmRlcicsICdhc2MnKTtcbiAgICBsZXQgY29sdW1uO1xuICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICBpZiAoVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCkgPT09IHNvcnRDb2x1bW4pIHtcbiAgICAgICAgY29sdW1uID0gY29sO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICghY29sdW1uKSByZXR1cm4gZmFsc2U7XG5cbiAgICBzZXRCdXN5KGdyaWQpKGRpc3BhdGNoKTtcbiAgICBjb25zdCBvcmlnQWxsRGF0YSA9IGdyaWREYXRhLmdldCgnYWxsRGF0YScpO1xuICAgIGNvbnN0IGNvbXBhcmF0b3IgPSBVdGlscy5nZXRTb3J0Q29tcGFyYXRvcihjb2x1bW4pO1xuICAgIGNvbnN0IHZhbHVlR2V0dGVyID0gVXRpbHMuZ2V0U29ydFZhbHVlR2V0dGVyKGNvbHVtbik7XG4gICAgY29uc3QgdmFsdWVFbXB0eUNoZWNrZXIgPSBVdGlscy5nZXRWYWx1ZUVtcHR5Q2hlY2tlcihjb2x1bW4pO1xuICAgIGNvbnN0IGFsbERhdGEgPSBvcmlnQWxsRGF0YS5zb3J0KChhLCBiKSA9PiB7XG4gICAgICBjb25zdCB2YWxBID0gdmFsdWVHZXR0ZXIoYSk7XG4gICAgICBjb25zdCB2YWxCID0gdmFsdWVHZXR0ZXIoYik7XG4gICAgICBpZiAoc29ydE9yZGVyID09PSAnYXNjJykge1xuICAgICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQSkpIHJldHVybiAtMTtcbiAgICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEIpKSByZXR1cm4gMTtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmF0b3IodmFsQSwgdmFsQik7XG4gICAgICB9XG4gICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQSkpIHJldHVybiAxO1xuICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEIpKSByZXR1cm4gLTE7XG4gICAgICByZXR1cm4gY29tcGFyYXRvcih2YWxCLCB2YWxBKTtcbiAgICB9KTtcbiAgICBsZXQgZGF0YTtcbiAgICAvLyBTb3J0IGFsc28gZmlsdGVyZWQgZGF0YSBzZXBhcmF0ZWx5XG4gICAgaWYgKGdyaWREYXRhLmdldEluKFsnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnaXNGaWx0ZXJpbmcnXSwgZmFsc2UpKSB7XG4gICAgICBkYXRhID0gZ3JpZERhdGEuZ2V0KCdkYXRhJykuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICBjb25zdCB2YWxBID0gdmFsdWVHZXR0ZXIoYSk7XG4gICAgICAgIGNvbnN0IHZhbEIgPSB2YWx1ZUdldHRlcihiKTtcbiAgICAgICAgaWYgKHNvcnRPcmRlciA9PT0gJ2FzYycpIHtcbiAgICAgICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQSkpIHJldHVybiAtMTtcbiAgICAgICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQikpIHJldHVybiAxO1xuICAgICAgICAgIHJldHVybiBjb21wYXJhdG9yKHZhbEEsIHZhbEIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxBKSkgcmV0dXJuIDE7XG4gICAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxCKSkgcmV0dXJuIC0xO1xuICAgICAgICByZXR1cm4gY29tcGFyYXRvcih2YWxCLCB2YWxBKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXRhID0gYWxsRGF0YTtcbiAgICB9XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQVBQTFlfU09SVCxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgZGF0YSxcbiAgICAgIGFsbERhdGEsXG4gICAgfSk7XG4gICAgc2V0UmVhZHkoZ3JpZCkoZGlzcGF0Y2gpO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG5leHBvcnQgY29uc3Qgc29ydENoYW5nZSA9IChncmlkLCBjb2x1bW5zLCBjb2x1bW4sIG5ld1NvcnQpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBjb25zdCBzb3J0T3JkZXIgPSBuZXdTb3J0IHx8ICdhc2MnO1xuICAgIGNvbnN0IHNvcnRDb2x1bW4gPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sdW1uKTtcbiAgICBVdGlscy5zYXZlU29ydERhdGEoZ3JpZCwgeyBzb3J0Q29sdW1uLCBzb3J0T3JkZXIgfSk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU09SVF9DSEFOR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIHNvcnRDb2x1bW4sXG4gICAgICBzb3J0T3JkZXIsXG4gICAgfSk7XG4gICAgYXBwbHlTb3J0KGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBzZXREYXRhID0gKGdyaWQsIGNvbHVtbnMsIGRhdGEpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBVdGlscy5jaGVja0NvbHVtbnNQYXJhbShjb2x1bW5zKTtcbiAgICBjb25zdCBjb25maWdEYXRhID0gVXRpbHMubG9hZEdyaWRDb25maWcoZ3JpZCwgY29sdW1ucyk7XG4gICAgY29uc3QgaW1tdXRhYmxlRGF0YSA9IEltbXV0YWJsZS5JdGVyYWJsZS5pc0l0ZXJhYmxlKGRhdGEpID8gZGF0YSA6IEltbXV0YWJsZS5mcm9tSlMoZGF0YSk7XG4gICAgY29uc3Qgc2VsZWN0ZWRJdGVtcyA9IFV0aWxzLmxvYWRTZWxlY3RlZEl0ZW1zKGdyaWQpLmZpbHRlcihpdGVtID0+IChcbiAgICAgICEhaW1tdXRhYmxlRGF0YS5maW5kKGRhdGFJdGVtID0+IGRhdGFJdGVtLmdldEluKGdyaWQuaWRLZXlQYXRoKSA9PT0gaXRlbSlcbiAgICApKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfREFUQSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgZGF0YTogaW1tdXRhYmxlRGF0YSxcbiAgICAgIGNvbmZpZzogY29uZmlnRGF0YSxcbiAgICAgIHNlbGVjdGVkSXRlbXMsXG4gICAgfSk7XG4gICAgYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gICAgYXBwbHlTb3J0KGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBleHRlbmREYXRhID0gKGdyaWQsIGNvbHVtbnMsIGRhdGEpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBjb25zdCBpbW11dGFibGVEYXRhID0gSW1tdXRhYmxlLkl0ZXJhYmxlLmlzSXRlcmFibGUoZGF0YSkgPyBkYXRhIDogSW1tdXRhYmxlLmZyb21KUyhkYXRhKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9FWFRFTkRfREFUQSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgZGF0YTogaW1tdXRhYmxlRGF0YSxcbiAgICB9KTtcbiAgICBhcHBseUZpbHRlcnMoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgICBhcHBseVNvcnQoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHJlc2l6ZUNvbHVtbiA9IChncmlkLCBjb2x1bW5LZXksIHdpZHRoKSA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgY29uc3QgY29sdW1uV2lkdGhzID0gZ2V0U3RhdGUoKVxuICAgICAgLmRhdGFncmlkXG4gICAgICAuZ2V0SW4oW2dyaWQuaWQsICdjb25maWcnLCAnY29sdW1uV2lkdGhzJ10sIE1hcCgpKVxuICAgICAgLnNldChjb2x1bW5LZXksIHdpZHRoKTtcbiAgICBVdGlscy5zYXZlQ29sdW1uV2lkdGhzKGdyaWQsIGNvbHVtbldpZHRocyk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVTSVpFX0NPTFVNTixcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgY29sdW1uV2lkdGhzLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgZWRpdCA9IGdyaWQgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfRURJVCxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgY2FuY2VsID0gZ3JpZCA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DQU5DRUwsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHNhdmUgPSAoZ3JpZCwgY2IgPSAoKSA9PiB7fSkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0FWRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgIH0pO1xuICAgIGNiKCk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBzYXZlU3VjY2VzcyA9IChncmlkLCBjb2x1bW5zLCBzYXZlZEl0ZW1zKSA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0FWRV9TVUNDRVNTLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBpZEtleVBhdGg6IGdyaWQuaWRLZXlQYXRoLFxuICAgICAgc2F2ZWRJdGVtcyxcbiAgICB9KTtcbiAgICBhcHBseUZpbHRlcnMoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgICBhcHBseVNvcnQoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHNhdmVQYXJ0aWFsU3VjY2VzcyA9IChncmlkLCBjb2x1bW5zLCBzYXZlZEl0ZW1zKSA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0FWRV9QQVJUSUFMX1NVQ0NFU1MsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgICBzYXZlZEl0ZW1zLFxuICAgIH0pO1xuICAgIGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICAgIGFwcGx5U29ydChncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICB9O1xuXG5leHBvcnQgY29uc3Qgc2F2ZUZhaWwgPSBncmlkID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfRkFJTCxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlID0gKGdyaWQsIGNvbHVtbkRlZmF1bHRWYWx1ZXMpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgY29sdW1uRGVmYXVsdFZhbHVlcyxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGFkZE5ld0l0ZW0gPSAoZ3JpZCwgY29sdW1uRGVmYXVsdFZhbHVlcykgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQUREX05FV19JVEVNLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBjb2x1bW5EZWZhdWx0VmFsdWVzLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlTmV3SXRlbSA9IChncmlkLCBpbmRleCkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBpbmRleCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZU5ld0l0ZW1zID0gKGdyaWQsIGluZGV4ZXMpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTVMsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGluZGV4ZXMsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCByZW1vdmUgPSAoZ3JpZCwgY2IgPSAoKSA9PiB7fSkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgfSk7XG4gICAgY2IoKTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZVN1Y2Nlc3MgPSAoZ3JpZCwgcmVtb3ZlZElkcykgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX1NVQ0NFU1MsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgICByZW1vdmVkSWRzLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlRmFpbCA9IGdyaWQgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUwsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGVkaXRDZWxsVmFsdWVDaGFuZ2UgPSAoZ3JpZCwgZGF0YUlkLCBrZXlQYXRoLCB2YWx1ZSkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfRURJVF9DRUxMX1ZBTFVFX0NIQU5HRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgZGF0YUlkLFxuICAgICAga2V5UGF0aCxcbiAgICAgIHZhbHVlLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgZWRpdENlbGxWYWx1ZVZhbGlkYXRlID0gKFxuICBncmlkLFxuICBkYXRhSWQsXG4gIGtleVBhdGgsXG4gIHZhbHVlLFxuICB2YWxpZGF0b3JzID0gW10sXG4pID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBsZXQgdmFsaWRhdGlvblN0YXRlID0geyB2YWxpZDogdHJ1ZSB9O1xuICAgIHZhbGlkYXRvcnMuZm9yRWFjaCgodmFsaWRhdG9yKSA9PiB7XG4gICAgICBpZiAodmFsaWRhdGlvblN0YXRlLnZhbGlkKSB7XG4gICAgICAgIGlmICh2YWxpZGF0b3IudW5pcXVlKSB7XG4gICAgICAgICAgaWYgKHZhbHVlICE9PSAnJyB8fCB2YWx1ZSAhPT0gbnVsbCB8fCB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBjb21iaW5lIHJlYWwgZGF0YSB3aXRoIGN1cnJlbnQgdW5zYXZlZCBlZGl0ZWQgZGF0YVxuICAgICAgICAgICAgY29uc3QgZ3JpZERhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldChncmlkLmlkKTtcbiAgICAgICAgICAgIGNvbnN0IGVkaXREYXRhID0gZ3JpZERhdGEuZ2V0KCdlZGl0RGF0YScpO1xuICAgICAgICAgICAgbGV0IGFsbERhdGEgPSBncmlkRGF0YS5nZXQoJ2FsbERhdGEnKTtcbiAgICAgICAgICAgIGlmIChlZGl0RGF0YSkge1xuICAgICAgICAgICAgICBlZGl0RGF0YS5mb3JFYWNoKChlZGl0RGF0YUl0ZW0sIGVkaXREYXRhSXRlbUlkKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZm91bmRJbmRleCA9XG4gICAgICAgICAgICAgICAgICBhbGxEYXRhLmZpbmRJbmRleChkID0+IGQuZ2V0SW4oZ3JpZC5pZEtleVBhdGgpID09PSBlZGl0RGF0YUl0ZW1JZCk7XG4gICAgICAgICAgICAgICAgaWYgKGZvdW5kSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICBhbGxEYXRhID0gYWxsRGF0YS5tZXJnZURlZXBJbihbZm91bmRJbmRleF0sIGVkaXREYXRhSXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGRldGVybWluZSB1bmlxdWVuZXNzXG4gICAgICAgICAgICBjb25zdCBmaW5kaW5nID0gYWxsRGF0YS5maW5kKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChncmlkLmlkS2V5UGF0aC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAvLyBkb24ndCBzZWxmIGNvbXBhcmVcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGRhdGFJZCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gaXRlbS5nZXRJbihrZXlQYXRoKSA9PT0gdmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChmaW5kaW5nKSB7XG4gICAgICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICB2YWxpZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ1ZhbGlkYXRpb24uVW5pcXVlJyxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodmFsaWRhdG9yLnZhbGlkYXRlV2l0aFJvd0RhdGEpIHtcbiAgICAgICAgICBjb25zdCBncmlkRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0KGdyaWQuaWQpO1xuICAgICAgICAgIGNvbnN0IGVkaXREYXRhID0gZ3JpZERhdGEuZ2V0SW4oWydlZGl0RGF0YScsIGRhdGFJZF0sIE1hcCgpKTtcbiAgICAgICAgICBsZXQgcm93RGF0YSA9IGdyaWREYXRhLmdldCgnYWxsRGF0YScpLmZpbmQoaXRlbSA9PiBpdGVtLmdldEluKGdyaWQuaWRLZXlQYXRoKSA9PT0gZGF0YUlkKTtcbiAgICAgICAgICBpZiAocm93RGF0YSkge1xuICAgICAgICAgICAgcm93RGF0YSA9IHJvd0RhdGEubWVyZ2VEZWVwKGVkaXREYXRhKTtcbiAgICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZVdpdGhSb3dEYXRhKHZhbHVlLCByb3dEYXRhKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgcGFyYW1zID0gdmFsaWRhdG9yLnBhcmFtcyA/IE9iamVjdC52YWx1ZXModmFsaWRhdG9yLnBhcmFtcykgOiBbXTtcbiAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB2YWxpZGF0b3IudmFsaWRhdGUodmFsdWUsIC4uLnBhcmFtcyk7XG4gICAgICAgICAgaWYgKHZhbGlkYXRvci5wYXJhbXMpIHtcbiAgICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlVmFsdWVzID0gdmFsaWRhdG9yLnBhcmFtcztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAodmFsaWRhdGlvblN0YXRlLnZhbGlkKSB7XG4gICAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfSElERV9NRVNTQUdFLFxuICAgICAgICBpZDogZ3JpZC5pZCxcbiAgICAgICAgbWVzc2FnZVR5cGU6ICdlcnJvcicsXG4gICAgICAgIGRhdGFJZCxcbiAgICAgICAga2V5UGF0aCxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFLFxuICAgICAgICBpZDogZ3JpZC5pZCxcbiAgICAgICAgbWVzc2FnZVR5cGU6ICdlcnJvcicsXG4gICAgICAgIGRhdGFJZCxcbiAgICAgICAga2V5UGF0aCxcbiAgICAgICAgbWVzc2FnZUlkOiB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZSxcbiAgICAgICAgbWVzc2FnZVZhbHVlczogdmFsaWRhdGlvblN0YXRlLm1lc3NhZ2VWYWx1ZXMsXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbGlkYXRpb25TdGF0ZS52YWxpZDtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSA9IChncmlkLCByb3dJbmRleCwga2V5UGF0aCwgdmFsdWUpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX0NIQU5HRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgcm93SW5kZXgsXG4gICAgICBrZXlQYXRoLFxuICAgICAgdmFsdWUsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZSA9IChncmlkLCByb3dJbmRleCwga2V5UGF0aCwgdmFsdWUsIHZhbGlkYXRvcnMgPSBbXSkgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGxldCB2YWxpZGF0aW9uU3RhdGUgPSB7IHZhbGlkOiB0cnVlIH07XG4gICAgdmFsaWRhdG9ycy5mb3JFYWNoKCh2YWxpZGF0b3IpID0+IHtcbiAgICAgIGlmICh2YWxpZGF0aW9uU3RhdGUudmFsaWQpIHtcbiAgICAgICAgaWYgKHZhbGlkYXRvci51bmlxdWUpIHtcbiAgICAgICAgICBpZiAodmFsdWUgIT09ICcnIHx8IHZhbHVlICE9PSBudWxsIHx8IHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpbmRpbmcgPSBnZXRTdGF0ZSgpXG4gICAgICAgICAgICAgIC5kYXRhZ3JpZFxuICAgICAgICAgICAgICAuZ2V0SW4oW2dyaWQuaWQsICdhbGxEYXRhJ10pXG4gICAgICAgICAgICAgIC5maW5kKGl0ZW0gPT4gaXRlbS5nZXRJbihrZXlQYXRoKSA9PT0gdmFsdWUpO1xuICAgICAgICAgICAgaWYgKGZpbmRpbmcpIHtcbiAgICAgICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0ge1xuICAgICAgICAgICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnVmFsaWRhdGlvbi5VbmlxdWUnLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc3QgZmluZDIgPSBnZXRTdGF0ZSgpXG4gICAgICAgICAgICAgICAgLmRhdGFncmlkXG4gICAgICAgICAgICAgICAgLmdldEluKFtncmlkLmlkLCAnY3JlYXRlRGF0YSddKVxuICAgICAgICAgICAgICAgIC5maW5kKChpdGVtLCBpKSA9PiBpICE9PSByb3dJbmRleCAmJiBpdGVtLmdldEluKGtleVBhdGgpID09PSB2YWx1ZSk7XG4gICAgICAgICAgICAgIGlmIChmaW5kMikge1xuICAgICAgICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdWYWxpZGF0aW9uLlVuaXF1ZScsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh2YWxpZGF0b3IudmFsaWRhdGVXaXRoUm93RGF0YSkge1xuICAgICAgICAgIGNvbnN0IHJvd0RhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnY3JlYXRlRGF0YScsIHJvd0luZGV4XSk7XG4gICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0gdmFsaWRhdG9yLnZhbGlkYXRlV2l0aFJvd0RhdGEodmFsdWUsIHJvd0RhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IHZhbGlkYXRvci5wYXJhbXMgPyBPYmplY3QudmFsdWVzKHZhbGlkYXRvci5wYXJhbXMpIDogW107XG4gICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0gdmFsaWRhdG9yLnZhbGlkYXRlKHZhbHVlLCAuLi5wYXJhbXMpO1xuICAgICAgICAgIGlmICh2YWxpZGF0b3IucGFyYW1zKSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZVZhbHVlcyA9IHZhbGlkYXRvci5wYXJhbXM7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKHZhbGlkYXRpb25TdGF0ZS52YWxpZCkge1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9ISURFX01FU1NBR0UsXG4gICAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgICBtZXNzYWdlVHlwZTogJ2Vycm9yJyxcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIGtleVBhdGgsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9TSE9XX01FU1NBR0UsXG4gICAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgICBtZXNzYWdlVHlwZTogJ2Vycm9yJyxcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIGtleVBhdGgsXG4gICAgICAgIG1lc3NhZ2VJZDogdmFsaWRhdGlvblN0YXRlLm1lc3NhZ2UsXG4gICAgICAgIG1lc3NhZ2VWYWx1ZXM6IHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlVmFsdWVzLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB2YWxpZGF0aW9uU3RhdGUudmFsaWQ7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBjZWxsU2hvd01lc3NhZ2UgPSAoZ3JpZCwgbWVzc2FnZVR5cGUsIGRhdGFJZCwga2V5UGF0aCwgbWVzc2FnZUlkLCBtZXNzYWdlVmFsdWVzKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgbWVzc2FnZVR5cGUsXG4gICAgICBkYXRhSWQsXG4gICAgICBrZXlQYXRoLFxuICAgICAgbWVzc2FnZUlkLFxuICAgICAgbWVzc2FnZVZhbHVlcyxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGNlbGxTaG93TWVzc2FnZXMgPSAoZ3JpZCwgbWVzc2FnZXMpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFUyxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgbWVzc2FnZXMsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBjZWxsSGlkZU1lc3NhZ2UgPSAoZ3JpZCwgbWVzc2FnZVR5cGUgPSBudWxsLCBkYXRhSWQgPSBudWxsLCBrZXlQYXRoID0gbnVsbCkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0VMTF9ISURFX01FU1NBR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIG1lc3NhZ2VUeXBlLFxuICAgICAgZGF0YUlkLFxuICAgICAga2V5UGF0aCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNlbGxTaG93TWVzc2FnZSA9IChcbiAgZ3JpZCxcbiAgbWVzc2FnZVR5cGUsXG4gIHJvd0luZGV4LFxuICBrZXlQYXRoLFxuICBtZXNzYWdlSWQsXG4gIG1lc3NhZ2VWYWx1ZXMsXG4pID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgbWVzc2FnZVR5cGUsXG4gICAgICByb3dJbmRleCxcbiAgICAgIGtleVBhdGgsXG4gICAgICBtZXNzYWdlSWQsXG4gICAgICBtZXNzYWdlVmFsdWVzLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQ2VsbEhpZGVNZXNzYWdlID0gKGdyaWQsIG1lc3NhZ2VUeXBlID0gbnVsbCwgcm93SW5kZXggPSBudWxsLCBrZXlQYXRoID0gbnVsbCkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfSElERV9NRVNTQUdFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBtZXNzYWdlVHlwZSxcbiAgICAgIHJvd0luZGV4LFxuICAgICAga2V5UGF0aCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGNlbGxTZWxlY3Rpb25DaGFuZ2UgPSAoZ3JpZCwgc2VsZWN0ZWRDZWxsID0gbnVsbCkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgc2VsZWN0ZWRDZWxsLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX1NFTEVDVElPTl9DSEFOR0UsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBpdGVtU2VsZWN0aW9uQ2hhbmdlID0gKFxuICBncmlkLFxuICByb3dJbmRleCxcbiAgY3RybFByZXNzZWQgPSBmYWxzZSxcbiAgc2hpZnRQcmVzc2VkID0gZmFsc2UsXG4pID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9JVEVNX1NFTEVDVElPTl9DSEFOR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIHJvd0luZGV4LFxuICAgICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgICAgIGN0cmxQcmVzc2VkLFxuICAgICAgc2hpZnRQcmVzc2VkLFxuICAgIH0pO1xuICAgIFV0aWxzLnNhdmVTZWxlY3RlZEl0ZW1zKGdyaWQsIGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdzZWxlY3RlZEl0ZW1zJ10pKTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdEFsbEl0ZW1zQ2hhbmdlID0gZ3JpZCA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgfSk7XG4gICAgVXRpbHMuc2F2ZVNlbGVjdGVkSXRlbXMoZ3JpZCwgZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ3NlbGVjdGVkSXRlbXMnXSkpO1xuICB9O1xuXG5leHBvcnQgY29uc3QgY2xlYXJTZWxlY3RlZEl0ZW1zID0gZ3JpZCA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0xFQVJfU0VMRUNURURfSVRFTVMsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICB9KTtcbiAgICBVdGlscy5zYXZlU2VsZWN0ZWRJdGVtcyhncmlkLCBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnc2VsZWN0ZWRJdGVtcyddKSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCB0b2dnbGVGaWx0ZXJpbmcgPSBncmlkID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBjb25zdCBpc0ZpbHRlcmluZyA9ICFnZXRTdGF0ZSgpXG4gICAgICAuZGF0YWdyaWRcbiAgICAgIC5nZXRJbihbZ3JpZC5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2lzRmlsdGVyaW5nJ10sIGZhbHNlKTtcbiAgICBVdGlscy5zYXZlSXNGaWx0ZXJpbmcoZ3JpZCwgaXNGaWx0ZXJpbmcpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1RPR0dMRV9GSUxURVJJTkcsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGlzRmlsdGVyaW5nLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgdmFsaWRhdGVFZGl0ZWRSb3dzID0gKGdyaWQsIGNvbHVtbnMpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBjb25zdCBncmlkRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0KGdyaWQuaWQpO1xuICAgIGNvbnN0IGVkaXREYXRhID0gZ3JpZERhdGEuZ2V0KCdlZGl0RGF0YScsIE1hcCgpKTtcbiAgICBsZXQgYWxsR29vZCA9IHRydWU7XG4gICAgZWRpdERhdGEuZm9yRWFjaCgoZWRpdERhdGFSb3csIGRhdGFJZCkgPT4ge1xuICAgICAgY29sdW1ucy5mb3JFYWNoKChjb2wpID0+IHtcbiAgICAgICAgbGV0IHZhbHVlID0gZWRpdERhdGFSb3cuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdmFsdWUgPSBncmlkRGF0YVxuICAgICAgICAgICAgLmdldCgnYWxsRGF0YScpXG4gICAgICAgICAgICAuZmluZChkYXRhID0+IGRhdGEuZ2V0SW4oZ3JpZC5pZEtleVBhdGgpID09PSBkYXRhSWQpXG4gICAgICAgICAgICAuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXNWYWxpZCA9IGVkaXRDZWxsVmFsdWVWYWxpZGF0ZShcbiAgICAgICAgICBncmlkLFxuICAgICAgICAgIGRhdGFJZCxcbiAgICAgICAgICBjb2wudmFsdWVLZXlQYXRoLFxuICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgIGNvbC52YWxpZGF0b3JzLFxuICAgICAgICApKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gICAgICAgIGlmIChhbGxHb29kICYmICFpc1ZhbGlkKSB7XG4gICAgICAgICAgYWxsR29vZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gYWxsR29vZDtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZUVtcHR5Q3JlYXRlZFJvd3MgPSAoZ3JpZCwgY29sdW1ucykgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGNvbnN0IGNyZWF0ZURhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnY3JlYXRlRGF0YSddLCBNYXAoKSk7XG4gICAgY29uc3QgaW5kZXhlcyA9IFtdO1xuICAgIGNyZWF0ZURhdGEuZm9yRWFjaCgoY3JlYXRlRGF0YVJvdywgcm93SW5kZXgpID0+IHtcbiAgICAgIGxldCBpc0VtcHR5ID0gdHJ1ZTtcbiAgICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gY3JlYXRlRGF0YVJvdy5nZXRJbihjb2wudmFsdWVLZXlQYXRoKTtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09ICcnICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgaXNFbXB0eSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChpc0VtcHR5KSB7XG4gICAgICAgIGluZGV4ZXMucHVzaChyb3dJbmRleCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGluZGV4ZXMubGVuZ3RoID4gMCkge1xuICAgICAgcmVtb3ZlTmV3SXRlbXMoZ3JpZCwgaW5kZXhlcykoZGlzcGF0Y2gpO1xuICAgIH1cbiAgfTtcblxuZXhwb3J0IGNvbnN0IHZhbGlkYXRlQ3JlYXRlZFJvd3MgPSAoZ3JpZCwgY29sdW1ucykgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIHJlbW92ZUVtcHR5Q3JlYXRlZFJvd3MoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgICBjb25zdCBjcmVhdGVEYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ2NyZWF0ZURhdGEnXSwgTWFwKCkpO1xuICAgIGxldCBhbGxHb29kID0gdHJ1ZTtcbiAgICBjcmVhdGVEYXRhLmZvckVhY2goKGNyZWF0ZURhdGFSb3csIHJvd0luZGV4KSA9PiB7XG4gICAgICBjb2x1bW5zLmZvckVhY2goKGNvbCkgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGNyZWF0ZURhdGFSb3cuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG4gICAgICAgIGNvbnN0IGlzVmFsaWQgPSBjcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZShcbiAgICAgICAgICBncmlkLFxuICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgIGNvbC52YWx1ZUtleVBhdGgsXG4gICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgY29sLnZhbGlkYXRvcnMsXG4gICAgICAgICkoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgICAgICAgaWYgKGFsbEdvb2QgJiYgIWlzVmFsaWQpIHtcbiAgICAgICAgICBhbGxHb29kID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBhbGxHb29kO1xuICB9O1xuXG5leHBvcnQgY29uc3QgdXBkYXRlRXhpc3RpbmdDZWxsVmFsdWUgPSAoZ3JpZCwgZGF0YUlkLCBrZXlQYXRoLCB2YWx1ZSkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfVVBEQVRFX0VYSVNUSU5HX0NFTExfVkFMVUUsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGRhdGFJZCxcbiAgICAgIGtleVBhdGgsXG4gICAgICB2YWx1ZSxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHNldEVkaXREYXRhID0gKGdyaWQsIGRhdGEsIGNlbGxNZXNzYWdlcyA9IE1hcCgpKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICBkYXRhLFxuICAgICAgY2VsbE1lc3NhZ2VzLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfRURJVF9EQVRBLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3Qgb3BlbkNvbHVtblNldHRpbmdzTW9kYWwgPSBncmlkID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9PUEVOLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBjbG9zZUNvbHVtblNldHRpbmdzTW9kYWwgPSBncmlkID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3Qgc2F2ZUNvbHVtblNldHRpbmdzID0gKGdyaWQsIGhpZGRlbkNvbHVtbnMsIGNvbHVtbk9yZGVyKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBVdGlscy5zYXZlQ29sdW1uU2V0dGluZ3MoZ3JpZCwgaGlkZGVuQ29sdW1ucywgY29sdW1uT3JkZXIpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBjb2x1bW5PcmRlcixcbiAgICB9KTtcbiAgfTtcblxuIl19