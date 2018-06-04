'use strict';

exports.__esModule = true;
exports.saveColumnSettings = exports.closeColumnSettingsModal = exports.openColumnSettingsModal = exports.setEditData = exports.updateExistingCellValue = exports.validateCreatedRows = exports.removeEmptyCreatedRows = exports.validateEditedRows = exports.toggleFiltering = exports.clearSelectedItems = exports.selectAllItemsChange = exports.itemSelectionChange = exports.cellSelectionChange = exports.createCellHideMessage = exports.createCellShowMessage = exports.cellHideMessage = exports.cellShowMessages = exports.cellShowMessage = exports.createCellValueValidate = exports.createCellValueChange = exports.editCellValueValidate = exports.editCellValueChange = exports.removeFail = exports.removeSuccess = exports.remove = exports.removeNewItems = exports.removeNewItem = exports.addNewItem = exports.create = exports.saveFail = exports.savePartialSuccess = exports.saveSuccess = exports.save = exports.cancel = exports.edit = exports.resizeColumn = exports.setData = exports.sortChange = exports.applySort = exports.filterCellValueChange = exports.applyFilters = exports.setReady = exports.setBusy = exports.invalidate = exports.TYPES = undefined;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _datagrid = require('./datagrid.utils');

var _datagrid2 = _interopRequireDefault(_datagrid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TYPES = exports.TYPES = {
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

var invalidate = exports.invalidate = function invalidate(grid) {
  return function (dispatch) {
    _datagrid2.default.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_INVALIDATE,
      id: grid.id
    });
  };
};

var setBusy = exports.setBusy = function setBusy(grid) {
  return function (dispatch) {
    _datagrid2.default.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_BUSY,
      id: grid.id
    });
  };
};

var setReady = exports.setReady = function setReady(grid) {
  return function (dispatch) {
    _datagrid2.default.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_READY,
      id: grid.id
    });
  };
};

var applyFilters = exports.applyFilters = function applyFilters(grid, columns) {
  return function (dispatch, getState) {
    _datagrid2.default.checkGridParam(grid);
    if (!columns || !columns.forEach) return false;
    var gridData = getState().datagrid.get(grid.id);
    if (!gridData) return false;
    var filterData = gridData.getIn(['config', 'filteringData', 'filterData'], (0, _immutable.Map)());
    var allData = gridData.get('allData');
    setBusy(grid)(dispatch);
    var data = void 0;
    if (filterData.isEmpty()) {
      data = allData;
    } else {
      var dateFormat = _datagrid2.default.getDateFormat(grid, getState().user);
      data = allData.filter(function (row) {
        var hits = 0;
        filterData.forEach(function (filterValue, filterColumn) {
          columns.forEach(function (column) {
            if (_datagrid2.default.getColumnKey(column) === filterColumn) {
              var rowData = row.getIn(column.valueKeyPath);
              if (rowData || rowData === 0 || rowData === false) {
                var filterMatcher = _datagrid2.default.getFilterMatcher(column, dateFormat);
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

var filterCellValueChange = exports.filterCellValueChange = function filterCellValueChange(grid, columns, column, value) {
  return function (dispatch, getState) {
    _datagrid2.default.checkGridParam(grid);
    var origFilterData = getState().datagrid.getIn([grid.id, 'config', 'filteringData', 'filterData'], (0, _immutable.Map)());
    var columnKey = _datagrid2.default.getColumnKey(column);
    var valueEmptyChecker = _datagrid2.default.getValueEmptyChecker(column);
    var filterData = void 0;
    if (valueEmptyChecker(value)) {
      filterData = origFilterData.delete(columnKey);
    } else {
      filterData = origFilterData.set(columnKey, value);
    }
    _datagrid2.default.saveFilterData(grid, filterData);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_FILTER_DATA_CHANGE,
      id: grid.id,
      filterData: filterData
    });
    applyFilters(grid, columns)(dispatch, getState);
  };
};

var applySort = exports.applySort = function applySort(grid, columns) {
  return function (dispatch, getState) {
    _datagrid2.default.checkGridParam(grid);
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
      if (_datagrid2.default.getColumnKey(col) === sortColumn) {
        column = col;
      }
    });
    if (!column) return false;

    setBusy(grid)(dispatch);
    var origAllData = gridData.get('allData');
    var comparator = _datagrid2.default.getSortComparator(column);
    var valueGetter = _datagrid2.default.getSortValueGetter(column);
    var valueEmptyChecker = _datagrid2.default.getValueEmptyChecker(column);
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

var sortChange = exports.sortChange = function sortChange(grid, columns, column, newSort) {
  return function (dispatch, getState) {
    _datagrid2.default.checkGridParam(grid);
    var sortOrder = newSort || 'asc';
    var sortColumn = _datagrid2.default.getColumnKey(column);
    _datagrid2.default.saveSortData(grid, { sortColumn: sortColumn, sortOrder: sortOrder });
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_SORT_CHANGE,
      id: grid.id,
      sortColumn: sortColumn,
      sortOrder: sortOrder
    });
    applySort(grid, columns)(dispatch, getState);
  };
};

var setData = exports.setData = function setData(grid, columns, data) {
  return function (dispatch, getState) {
    _datagrid2.default.checkGridParam(grid);
    _datagrid2.default.checkColumnsParam(columns);
    var configData = _datagrid2.default.loadGridConfig(grid, columns);
    var immutableData = _immutable2.default.Iterable.isIterable(data) ? data : _immutable2.default.fromJS(data);
    var selectedItems = _datagrid2.default.loadSelectedItems(grid).filter(function (item) {
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

var resizeColumn = exports.resizeColumn = function resizeColumn(grid, columnKey, width) {
  return function (dispatch, getState) {
    _datagrid2.default.checkGridParam(grid);
    var columnWidths = getState().datagrid.getIn([grid.id, 'config', 'columnWidths'], (0, _immutable.Map)()).set(columnKey, width);
    _datagrid2.default.saveColumnWidths(grid, columnWidths);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_RESIZE_COLUMN,
      id: grid.id,
      columnWidths: columnWidths
    });
  };
};

var edit = exports.edit = function edit(grid) {
  return function (dispatch) {
    _datagrid2.default.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_EDIT,
      id: grid.id
    });
  };
};

var cancel = exports.cancel = function cancel(grid) {
  return function (dispatch) {
    _datagrid2.default.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CANCEL,
      id: grid.id
    });
  };
};

var save = exports.save = function save(grid) {
  var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  return function (dispatch) {
    _datagrid2.default.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_SAVE,
      id: grid.id
    });
    cb();
  };
};

var saveSuccess = exports.saveSuccess = function saveSuccess(grid, columns, savedItems) {
  return function (dispatch, getState) {
    _datagrid2.default.checkGridParam(grid);
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

var savePartialSuccess = exports.savePartialSuccess = function savePartialSuccess(grid, columns, savedItems) {
  return function (dispatch, getState) {
    _datagrid2.default.checkGridParam(grid);
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

var saveFail = exports.saveFail = function saveFail(grid) {
  return function (dispatch) {
    _datagrid2.default.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_SAVE_FAIL,
      id: grid.id
    });
  };
};

var create = exports.create = function create(grid, columnDefaultValues) {
  return function (dispatch) {
    _datagrid2.default.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CREATE,
      id: grid.id,
      columnDefaultValues: columnDefaultValues
    });
  };
};

var addNewItem = exports.addNewItem = function addNewItem(grid, columnDefaultValues) {
  return function (dispatch) {
    _datagrid2.default.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_ADD_NEW_ITEM,
      id: grid.id,
      columnDefaultValues: columnDefaultValues
    });
  };
};

var removeNewItem = exports.removeNewItem = function removeNewItem(grid, index) {
  return function (dispatch) {
    _datagrid2.default.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_REMOVE_NEW_ITEM,
      id: grid.id,
      index: index
    });
  };
};

var removeNewItems = exports.removeNewItems = function removeNewItems(grid, indexes) {
  return function (dispatch) {
    _datagrid2.default.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_REMOVE_NEW_ITEMS,
      id: grid.id,
      indexes: indexes
    });
  };
};

var remove = exports.remove = function remove(grid) {
  var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  return function (dispatch) {
    _datagrid2.default.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_REMOVE,
      id: grid.id
    });
    cb();
  };
};

var removeSuccess = exports.removeSuccess = function removeSuccess(grid, removedIds) {
  return function (dispatch) {
    _datagrid2.default.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_REMOVE_SUCCESS,
      id: grid.id,
      idKeyPath: grid.idKeyPath,
      removedIds: removedIds
    });
  };
};

var removeFail = exports.removeFail = function removeFail(grid) {
  return function (dispatch) {
    _datagrid2.default.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_REMOVE_FAIL,
      id: grid.id
    });
  };
};

var editCellValueChange = exports.editCellValueChange = function editCellValueChange(grid, dataId, keyPath, value) {
  return function (dispatch) {
    _datagrid2.default.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_EDIT_CELL_VALUE_CHANGE,
      id: grid.id,
      dataId: dataId,
      keyPath: keyPath,
      value: value
    });
  };
};

var editCellValueValidate = exports.editCellValueValidate = function editCellValueValidate(grid, dataId, keyPath, value) {
  var validators = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
  return function (dispatch, getState) {
    _datagrid2.default.checkGridParam(grid);
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
          var _editData = _gridData.getIn(['editData', dataId], (0, _immutable.Map)());
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

var createCellValueChange = exports.createCellValueChange = function createCellValueChange(grid, rowIndex, keyPath, value) {
  return function (dispatch) {
    _datagrid2.default.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CREATE_CELL_VALUE_CHANGE,
      id: grid.id,
      rowIndex: rowIndex,
      keyPath: keyPath,
      value: value
    });
  };
};

var createCellValueValidate = exports.createCellValueValidate = function createCellValueValidate(grid, rowIndex, keyPath, value) {
  var validators = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
  return function (dispatch, getState) {
    _datagrid2.default.checkGridParam(grid);
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

var cellShowMessage = exports.cellShowMessage = function cellShowMessage(grid, messageType, dataId, keyPath, messageId, messageValues) {
  return function (dispatch) {
    _datagrid2.default.checkGridParam(grid);
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

var cellShowMessages = exports.cellShowMessages = function cellShowMessages(grid, messages) {
  return function (dispatch) {
    _datagrid2.default.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CELL_SHOW_MESSAGES,
      id: grid.id,
      messages: messages
    });
  };
};

var cellHideMessage = exports.cellHideMessage = function cellHideMessage(grid) {
  var messageType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var dataId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var keyPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  return function (dispatch) {
    _datagrid2.default.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CELL_HIDE_MESSAGE,
      id: grid.id,
      messageType: messageType,
      dataId: dataId,
      keyPath: keyPath
    });
  };
};

var createCellShowMessage = exports.createCellShowMessage = function createCellShowMessage(grid, messageType, rowIndex, keyPath, messageId, messageValues) {
  return function (dispatch) {
    _datagrid2.default.checkGridParam(grid);
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

var createCellHideMessage = exports.createCellHideMessage = function createCellHideMessage(grid) {
  var messageType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var rowIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var keyPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  return function (dispatch) {
    _datagrid2.default.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CREATE_CELL_HIDE_MESSAGE,
      id: grid.id,
      messageType: messageType,
      rowIndex: rowIndex,
      keyPath: keyPath
    });
  };
};

var cellSelectionChange = exports.cellSelectionChange = function cellSelectionChange(grid) {
  var selectedCell = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return function (dispatch) {
    _datagrid2.default.checkGridParam(grid);
    dispatch({
      selectedCell: selectedCell,
      id: grid.id,
      type: TYPES.PLATFORM_DATAGRID_CELL_SELECTION_CHANGE
    });
  };
};

var itemSelectionChange = exports.itemSelectionChange = function itemSelectionChange(grid, rowIndex) {
  var ctrlPressed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var shiftPressed = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  return function (dispatch, getState) {
    _datagrid2.default.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_ITEM_SELECTION_CHANGE,
      id: grid.id,
      rowIndex: rowIndex,
      idKeyPath: grid.idKeyPath,
      ctrlPressed: ctrlPressed,
      shiftPressed: shiftPressed
    });
    _datagrid2.default.saveSelectedItems(grid, getState().datagrid.getIn([grid.id, 'selectedItems']));
  };
};

var selectAllItemsChange = exports.selectAllItemsChange = function selectAllItemsChange(grid) {
  return function (dispatch, getState) {
    _datagrid2.default.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_SELECT_ALL_ITEMS_CHANGE,
      id: grid.id,
      idKeyPath: grid.idKeyPath
    });
    _datagrid2.default.saveSelectedItems(grid, getState().datagrid.getIn([grid.id, 'selectedItems']));
  };
};

var clearSelectedItems = exports.clearSelectedItems = function clearSelectedItems(grid) {
  return function (dispatch, getState) {
    _datagrid2.default.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CLEAR_SELECTED_ITEMS,
      id: grid.id
    });
    _datagrid2.default.saveSelectedItems(grid, getState().datagrid.getIn([grid.id, 'selectedItems']));
  };
};

var toggleFiltering = exports.toggleFiltering = function toggleFiltering(grid) {
  return function (dispatch, getState) {
    _datagrid2.default.checkGridParam(grid);
    var isFiltering = !getState().datagrid.getIn([grid.id, 'config', 'filteringData', 'isFiltering'], false);
    _datagrid2.default.saveIsFiltering(grid, isFiltering);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_TOGGLE_FILTERING,
      id: grid.id,
      isFiltering: isFiltering
    });
  };
};

var validateEditedRows = exports.validateEditedRows = function validateEditedRows(grid, columns) {
  return function (dispatch, getState) {
    _datagrid2.default.checkGridParam(grid);
    var gridData = getState().datagrid.get(grid.id);
    var editData = gridData.get('editData', (0, _immutable.Map)());
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

var removeEmptyCreatedRows = exports.removeEmptyCreatedRows = function removeEmptyCreatedRows(grid, columns) {
  return function (dispatch, getState) {
    _datagrid2.default.checkGridParam(grid);
    var createData = getState().datagrid.getIn([grid.id, 'createData'], (0, _immutable.Map)());
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

var validateCreatedRows = exports.validateCreatedRows = function validateCreatedRows(grid, columns) {
  return function (dispatch, getState) {
    _datagrid2.default.checkGridParam(grid);
    removeEmptyCreatedRows(grid, columns)(dispatch, getState);
    var createData = getState().datagrid.getIn([grid.id, 'createData'], (0, _immutable.Map)());
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

var updateExistingCellValue = exports.updateExistingCellValue = function updateExistingCellValue(grid, dataId, keyPath, value) {
  return function (dispatch) {
    _datagrid2.default.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_UPDATE_EXISTING_CELL_VALUE,
      id: grid.id,
      dataId: dataId,
      keyPath: keyPath,
      value: value
    });
  };
};

var setEditData = exports.setEditData = function setEditData(grid, data) {
  var cellMessages = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : (0, _immutable.Map)();
  return function (dispatch) {
    _datagrid2.default.checkGridParam(grid);
    dispatch({
      data: data,
      cellMessages: cellMessages,
      id: grid.id,
      type: TYPES.PLATFORM_DATAGRID_SET_EDIT_DATA
    });
  };
};

var openColumnSettingsModal = exports.openColumnSettingsModal = function openColumnSettingsModal(grid) {
  return function (dispatch) {
    _datagrid2.default.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_COLUMN_SETTINGS_MODAL_OPEN,
      id: grid.id
    });
  };
};

var closeColumnSettingsModal = exports.closeColumnSettingsModal = function closeColumnSettingsModal(grid) {
  return function (dispatch) {
    _datagrid2.default.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_COLUMN_SETTINGS_MODAL_CLOSE,
      id: grid.id
    });
  };
};

var saveColumnSettings = exports.saveColumnSettings = function saveColumnSettings(grid, hiddenColumns, columnOrder) {
  return function (dispatch) {
    _datagrid2.default.checkGridParam(grid);
    _datagrid2.default.saveColumnSettings(grid, hiddenColumns, columnOrder);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_COLUMN_SETTINGS_SAVE,
      id: grid.id,
      columnOrder: columnOrder
    });
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5hY3Rpb25zLmpzIl0sIm5hbWVzIjpbIlRZUEVTIiwiUExBVEZPUk1fREFUQUdSSURfSU5WQUxJREFURSIsIlBMQVRGT1JNX0RBVEFHUklEX0JVU1kiLCJQTEFURk9STV9EQVRBR1JJRF9SRUFEWSIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9EQVRBIiwiUExBVEZPUk1fREFUQUdSSURfQVBQTFlfU09SVCIsIlBMQVRGT1JNX0RBVEFHUklEX1NPUlRfQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfUkVTSVpFX0NPTFVNTiIsIlBMQVRGT1JNX0RBVEFHUklEX0VESVQiLCJQTEFURk9STV9EQVRBR1JJRF9DQU5DRUwiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFIiwiUExBVEZPUk1fREFUQUdSSURfU0FWRV9TVUNDRVNTIiwiUExBVEZPUk1fREFUQUdSSURfU0FWRV9QQVJUSUFMX1NVQ0NFU1MiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFX0ZBSUwiLCJQTEFURk9STV9EQVRBR1JJRF9DUkVBVEUiLCJQTEFURk9STV9EQVRBR1JJRF9BRERfTkVXX0lURU0iLCJQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU0iLCJQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU1TIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX1NVQ0NFU1MiLCJQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfRkFJTCIsIlBMQVRGT1JNX0RBVEFHUklEX0VESVRfQ0VMTF9WQUxVRV9DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFUyIsIlBMQVRGT1JNX0RBVEFHUklEX0NFTExfSElERV9NRVNTQUdFIiwiUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfU0hPV19NRVNTQUdFIiwiUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfSElERV9NRVNTQUdFIiwiUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfVkFMSURBVEUiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NFTEVDVElPTl9DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9JVEVNX1NFTEVDVElPTl9DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9TRUxFQ1RfQUxMX0lURU1TX0NIQU5HRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NMRUFSX1NFTEVDVEVEX0lURU1TIiwiUExBVEZPUk1fREFUQUdSSURfVE9HR0xFX0ZJTFRFUklORyIsIlBMQVRGT1JNX0RBVEFHUklEX0ZJTFRFUl9EQVRBX0NIQU5HRSIsIlBMQVRGT1JNX0RBVEFHUklEX0FQUExZX0ZJTFRFUlMiLCJQTEFURk9STV9EQVRBR1JJRF9VUERBVEVfRVhJU1RJTkdfQ0VMTF9WQUxVRSIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9FRElUX0RBVEEiLCJQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfT1BFTiIsIlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFIiwiaW52YWxpZGF0ZSIsImRpc3BhdGNoIiwiVXRpbHMiLCJjaGVja0dyaWRQYXJhbSIsImdyaWQiLCJ0eXBlIiwiaWQiLCJzZXRCdXN5Iiwic2V0UmVhZHkiLCJhcHBseUZpbHRlcnMiLCJjb2x1bW5zIiwiZ2V0U3RhdGUiLCJmb3JFYWNoIiwiZ3JpZERhdGEiLCJkYXRhZ3JpZCIsImdldCIsImZpbHRlckRhdGEiLCJnZXRJbiIsImFsbERhdGEiLCJkYXRhIiwiaXNFbXB0eSIsImRhdGVGb3JtYXQiLCJnZXREYXRlRm9ybWF0IiwidXNlciIsImZpbHRlciIsInJvdyIsImhpdHMiLCJmaWx0ZXJWYWx1ZSIsImZpbHRlckNvbHVtbiIsImNvbHVtbiIsImdldENvbHVtbktleSIsInJvd0RhdGEiLCJ2YWx1ZUtleVBhdGgiLCJmaWx0ZXJNYXRjaGVyIiwiZ2V0RmlsdGVyTWF0Y2hlciIsInNpemUiLCJmaWx0ZXJDZWxsVmFsdWVDaGFuZ2UiLCJ2YWx1ZSIsIm9yaWdGaWx0ZXJEYXRhIiwiY29sdW1uS2V5IiwidmFsdWVFbXB0eUNoZWNrZXIiLCJnZXRWYWx1ZUVtcHR5Q2hlY2tlciIsImRlbGV0ZSIsInNldCIsInNhdmVGaWx0ZXJEYXRhIiwiYXBwbHlTb3J0Iiwic29ydERhdGEiLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwiY29sIiwib3JpZ0FsbERhdGEiLCJjb21wYXJhdG9yIiwiZ2V0U29ydENvbXBhcmF0b3IiLCJ2YWx1ZUdldHRlciIsImdldFNvcnRWYWx1ZUdldHRlciIsInNvcnQiLCJhIiwiYiIsInZhbEEiLCJ2YWxCIiwic29ydENoYW5nZSIsIm5ld1NvcnQiLCJzYXZlU29ydERhdGEiLCJzZXREYXRhIiwiY2hlY2tDb2x1bW5zUGFyYW0iLCJjb25maWdEYXRhIiwibG9hZEdyaWRDb25maWciLCJpbW11dGFibGVEYXRhIiwiSW1tdXRhYmxlIiwiSXRlcmFibGUiLCJpc0l0ZXJhYmxlIiwiZnJvbUpTIiwic2VsZWN0ZWRJdGVtcyIsImxvYWRTZWxlY3RlZEl0ZW1zIiwiZmluZCIsImRhdGFJdGVtIiwiaWRLZXlQYXRoIiwiaXRlbSIsImNvbmZpZyIsInJlc2l6ZUNvbHVtbiIsIndpZHRoIiwiY29sdW1uV2lkdGhzIiwic2F2ZUNvbHVtbldpZHRocyIsImVkaXQiLCJjYW5jZWwiLCJzYXZlIiwiY2IiLCJzYXZlU3VjY2VzcyIsInNhdmVkSXRlbXMiLCJzYXZlUGFydGlhbFN1Y2Nlc3MiLCJzYXZlRmFpbCIsImNyZWF0ZSIsImNvbHVtbkRlZmF1bHRWYWx1ZXMiLCJhZGROZXdJdGVtIiwicmVtb3ZlTmV3SXRlbSIsImluZGV4IiwicmVtb3ZlTmV3SXRlbXMiLCJpbmRleGVzIiwicmVtb3ZlIiwicmVtb3ZlU3VjY2VzcyIsInJlbW92ZWRJZHMiLCJyZW1vdmVGYWlsIiwiZWRpdENlbGxWYWx1ZUNoYW5nZSIsImRhdGFJZCIsImtleVBhdGgiLCJlZGl0Q2VsbFZhbHVlVmFsaWRhdGUiLCJ2YWxpZGF0b3JzIiwidmFsaWRhdGlvblN0YXRlIiwidmFsaWQiLCJ2YWxpZGF0b3IiLCJ1bmlxdWUiLCJ1bmRlZmluZWQiLCJlZGl0RGF0YSIsImVkaXREYXRhSXRlbSIsImVkaXREYXRhSXRlbUlkIiwiZm91bmRJbmRleCIsImZpbmRJbmRleCIsImQiLCJtZXJnZURlZXBJbiIsImZpbmRpbmciLCJsZW5ndGgiLCJtZXNzYWdlIiwidmFsaWRhdGVXaXRoUm93RGF0YSIsIm1lcmdlRGVlcCIsInBhcmFtcyIsIk9iamVjdCIsInZhbHVlcyIsInZhbGlkYXRlIiwibWVzc2FnZVZhbHVlcyIsIm1lc3NhZ2VUeXBlIiwibWVzc2FnZUlkIiwiY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlIiwicm93SW5kZXgiLCJjcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZSIsImZpbmQyIiwiaSIsImNlbGxTaG93TWVzc2FnZSIsImNlbGxTaG93TWVzc2FnZXMiLCJtZXNzYWdlcyIsImNlbGxIaWRlTWVzc2FnZSIsImNyZWF0ZUNlbGxTaG93TWVzc2FnZSIsImNyZWF0ZUNlbGxIaWRlTWVzc2FnZSIsImNlbGxTZWxlY3Rpb25DaGFuZ2UiLCJzZWxlY3RlZENlbGwiLCJpdGVtU2VsZWN0aW9uQ2hhbmdlIiwiY3RybFByZXNzZWQiLCJzaGlmdFByZXNzZWQiLCJzYXZlU2VsZWN0ZWRJdGVtcyIsInNlbGVjdEFsbEl0ZW1zQ2hhbmdlIiwiY2xlYXJTZWxlY3RlZEl0ZW1zIiwidG9nZ2xlRmlsdGVyaW5nIiwiaXNGaWx0ZXJpbmciLCJzYXZlSXNGaWx0ZXJpbmciLCJ2YWxpZGF0ZUVkaXRlZFJvd3MiLCJhbGxHb29kIiwiZWRpdERhdGFSb3ciLCJpc1ZhbGlkIiwicmVtb3ZlRW1wdHlDcmVhdGVkUm93cyIsImNyZWF0ZURhdGEiLCJjcmVhdGVEYXRhUm93IiwicHVzaCIsInZhbGlkYXRlQ3JlYXRlZFJvd3MiLCJ1cGRhdGVFeGlzdGluZ0NlbGxWYWx1ZSIsInNldEVkaXREYXRhIiwiY2VsbE1lc3NhZ2VzIiwib3BlbkNvbHVtblNldHRpbmdzTW9kYWwiLCJjbG9zZUNvbHVtblNldHRpbmdzTW9kYWwiLCJzYXZlQ29sdW1uU2V0dGluZ3MiLCJoaWRkZW5Db2x1bW5zIiwiY29sdW1uT3JkZXIiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0FBRU8sSUFBTUEsd0JBQVE7QUFDbkJDLGdDQUE4Qiw4QkFEWDtBQUVuQkMsMEJBQXdCLHdCQUZMO0FBR25CQywyQkFBeUIseUJBSE47QUFJbkJDLDhCQUE0Qiw0QkFKVDtBQUtuQkMsZ0NBQThCLDhCQUxYO0FBTW5CQyxpQ0FBK0IsK0JBTlo7QUFPbkJDLG1DQUFpQyxpQ0FQZDtBQVFuQkMsMEJBQXdCLHdCQVJMO0FBU25CQyw0QkFBMEIsMEJBVFA7QUFVbkJDLDBCQUF3Qix3QkFWTDtBQVduQkMsa0NBQWdDLGdDQVhiO0FBWW5CQywwQ0FBd0Msd0NBWnJCO0FBYW5CQywrQkFBNkIsNkJBYlY7QUFjbkJDLDRCQUEwQiwwQkFkUDtBQWVuQkMsa0NBQWdDLGdDQWZiO0FBZ0JuQkMscUNBQW1DLG1DQWhCaEI7QUFpQm5CQyxzQ0FBb0Msb0NBakJqQjtBQWtCbkJDLDRCQUEwQiwwQkFsQlA7QUFtQm5CQyxvQ0FBa0Msa0NBbkJmO0FBb0JuQkMsaUNBQStCLCtCQXBCWjtBQXFCbkJDLDRDQUEwQywwQ0FyQnZCO0FBc0JuQkMsdUNBQXFDLHFDQXRCbEI7QUF1Qm5CQyx3Q0FBc0Msc0NBdkJuQjtBQXdCbkJDLHVDQUFxQyxxQ0F4QmxCO0FBeUJuQkMsOENBQTRDLDRDQXpCekI7QUEwQm5CQyw4Q0FBNEMsNENBMUJ6QjtBQTJCbkJDLDhDQUE0Qyw0Q0EzQnpCO0FBNEJuQkMsZ0RBQThDLDhDQTVCM0I7QUE2Qm5CQywyQ0FBeUMseUNBN0J0QjtBQThCbkJDLDJDQUF5Qyx5Q0E5QnRCO0FBK0JuQkMsNkNBQTJDLDJDQS9CeEI7QUFnQ25CQywwQ0FBd0Msd0NBaENyQjtBQWlDbkJDLHNDQUFvQyxvQ0FqQ2pCO0FBa0NuQkMsd0NBQXNDLHNDQWxDbkI7QUFtQ25CQyxtQ0FBaUMsaUNBbkNkO0FBb0NuQkMsZ0RBQThDLDhDQXBDM0I7QUFxQ25CQyxtQ0FBaUMsaUNBckNkO0FBc0NuQkMsZ0RBQThDLDhDQXRDM0I7QUF1Q25CQyxpREFBK0MsK0NBdkM1QjtBQXdDbkJDLDBDQUF3QztBQXhDckIsQ0FBZDs7QUEyQ0EsSUFBTUMsa0NBQWEsU0FBYkEsVUFBYTtBQUFBLFNBQ3hCLFVBQUNDLFFBQUQsRUFBYztBQUNaQyx1QkFBTUMsY0FBTixDQUFxQkMsSUFBckI7QUFDQUgsYUFBUztBQUNQSSxZQUFNOUMsTUFBTUMsNEJBREw7QUFFUDhDLFVBQUlGLEtBQUtFO0FBRkYsS0FBVDtBQUlELEdBUHVCO0FBQUEsQ0FBbkI7O0FBU0EsSUFBTUMsNEJBQVUsU0FBVkEsT0FBVTtBQUFBLFNBQ3JCLFVBQUNOLFFBQUQsRUFBYztBQUNaQyx1QkFBTUMsY0FBTixDQUFxQkMsSUFBckI7QUFDQUgsYUFBUztBQUNQSSxZQUFNOUMsTUFBTUUsc0JBREw7QUFFUDZDLFVBQUlGLEtBQUtFO0FBRkYsS0FBVDtBQUlELEdBUG9CO0FBQUEsQ0FBaEI7O0FBU0EsSUFBTUUsOEJBQVcsU0FBWEEsUUFBVztBQUFBLFNBQ3RCLFVBQUNQLFFBQUQsRUFBYztBQUNaQyx1QkFBTUMsY0FBTixDQUFxQkMsSUFBckI7QUFDQUgsYUFBUztBQUNQSSxZQUFNOUMsTUFBTUcsdUJBREw7QUFFUDRDLFVBQUlGLEtBQUtFO0FBRkYsS0FBVDtBQUlELEdBUHFCO0FBQUEsQ0FBakI7O0FBU0EsSUFBTUcsc0NBQWUsU0FBZkEsWUFBZSxDQUFDTCxJQUFELEVBQU9NLE9BQVA7QUFBQSxTQUMxQixVQUFDVCxRQUFELEVBQVdVLFFBQVgsRUFBd0I7QUFDdEJULHVCQUFNQyxjQUFOLENBQXFCQyxJQUFyQjtBQUNBLFFBQUksQ0FBQ00sT0FBRCxJQUFZLENBQUNBLFFBQVFFLE9BQXpCLEVBQWtDLE9BQU8sS0FBUDtBQUNsQyxRQUFNQyxXQUFXRixXQUFXRyxRQUFYLENBQW9CQyxHQUFwQixDQUF3QlgsS0FBS0UsRUFBN0IsQ0FBakI7QUFDQSxRQUFJLENBQUNPLFFBQUwsRUFBZSxPQUFPLEtBQVA7QUFDZixRQUFNRyxhQUFhSCxTQUFTSSxLQUFULENBQWUsQ0FBQyxRQUFELEVBQVcsZUFBWCxFQUE0QixZQUE1QixDQUFmLEVBQTBELHFCQUExRCxDQUFuQjtBQUNBLFFBQU1DLFVBQVVMLFNBQVNFLEdBQVQsQ0FBYSxTQUFiLENBQWhCO0FBQ0FSLFlBQVFILElBQVIsRUFBY0gsUUFBZDtBQUNBLFFBQUlrQixhQUFKO0FBQ0EsUUFBSUgsV0FBV0ksT0FBWCxFQUFKLEVBQTBCO0FBQ3hCRCxhQUFPRCxPQUFQO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsVUFBTUcsYUFBYW5CLG1CQUFNb0IsYUFBTixDQUFvQmxCLElBQXBCLEVBQTBCTyxXQUFXWSxJQUFyQyxDQUFuQjtBQUNBSixhQUFPRCxRQUFRTSxNQUFSLENBQWUsVUFBQ0MsR0FBRCxFQUFTO0FBQzdCLFlBQUlDLE9BQU8sQ0FBWDtBQUNBVixtQkFBV0osT0FBWCxDQUFtQixVQUFDZSxXQUFELEVBQWNDLFlBQWQsRUFBK0I7QUFDaERsQixrQkFBUUUsT0FBUixDQUFnQixVQUFDaUIsTUFBRCxFQUFZO0FBQzFCLGdCQUFJM0IsbUJBQU00QixZQUFOLENBQW1CRCxNQUFuQixNQUErQkQsWUFBbkMsRUFBaUQ7QUFDL0Msa0JBQU1HLFVBQVVOLElBQUlSLEtBQUosQ0FBVVksT0FBT0csWUFBakIsQ0FBaEI7QUFDQSxrQkFBSUQsV0FBV0EsWUFBWSxDQUF2QixJQUE0QkEsWUFBWSxLQUE1QyxFQUFtRDtBQUNqRCxvQkFBTUUsZ0JBQWdCL0IsbUJBQU1nQyxnQkFBTixDQUF1QkwsTUFBdkIsRUFBK0JSLFVBQS9CLENBQXRCO0FBQ0Esb0JBQUlZLGNBQWNGLE9BQWQsRUFBdUJKLFdBQXZCLENBQUosRUFBeUM7QUFDdkNELDBCQUFRLENBQVI7QUFDRDtBQUNGO0FBQ0Y7QUFDRixXQVZEO0FBV0QsU0FaRDtBQWFBLGVBQU9BLFNBQVNWLFdBQVdtQixJQUEzQjtBQUNELE9BaEJNLENBQVA7QUFpQkQ7QUFDRGxDLGFBQVM7QUFDUEksWUFBTTlDLE1BQU1tQywrQkFETDtBQUVQWSxVQUFJRixLQUFLRSxFQUZGO0FBR1BhO0FBSE8sS0FBVDtBQUtBWCxhQUFTSixJQUFULEVBQWVILFFBQWY7QUFDQSxXQUFPLElBQVA7QUFDRCxHQXZDeUI7QUFBQSxDQUFyQjs7QUF5Q0EsSUFBTW1DLHdEQUF3QixTQUF4QkEscUJBQXdCLENBQUNoQyxJQUFELEVBQU9NLE9BQVAsRUFBZ0JtQixNQUFoQixFQUF3QlEsS0FBeEI7QUFBQSxTQUNuQyxVQUFDcEMsUUFBRCxFQUFXVSxRQUFYLEVBQXdCO0FBQ3RCVCx1QkFBTUMsY0FBTixDQUFxQkMsSUFBckI7QUFDQSxRQUFNa0MsaUJBQWlCM0IsV0FDcEJHLFFBRG9CLENBRXBCRyxLQUZvQixDQUVkLENBQUNiLEtBQUtFLEVBQU4sRUFBVSxRQUFWLEVBQW9CLGVBQXBCLEVBQXFDLFlBQXJDLENBRmMsRUFFc0MscUJBRnRDLENBQXZCO0FBR0EsUUFBTWlDLFlBQVlyQyxtQkFBTTRCLFlBQU4sQ0FBbUJELE1BQW5CLENBQWxCO0FBQ0EsUUFBTVcsb0JBQW9CdEMsbUJBQU11QyxvQkFBTixDQUEyQlosTUFBM0IsQ0FBMUI7QUFDQSxRQUFJYixtQkFBSjtBQUNBLFFBQUl3QixrQkFBa0JILEtBQWxCLENBQUosRUFBOEI7QUFDNUJyQixtQkFBYXNCLGVBQWVJLE1BQWYsQ0FBc0JILFNBQXRCLENBQWI7QUFDRCxLQUZELE1BRU87QUFDTHZCLG1CQUFhc0IsZUFBZUssR0FBZixDQUFtQkosU0FBbkIsRUFBOEJGLEtBQTlCLENBQWI7QUFDRDtBQUNEbkMsdUJBQU0wQyxjQUFOLENBQXFCeEMsSUFBckIsRUFBMkJZLFVBQTNCO0FBQ0FmLGFBQVM7QUFDUEksWUFBTTlDLE1BQU1rQyxvQ0FETDtBQUVQYSxVQUFJRixLQUFLRSxFQUZGO0FBR1BVO0FBSE8sS0FBVDtBQUtBUCxpQkFBYUwsSUFBYixFQUFtQk0sT0FBbkIsRUFBNEJULFFBQTVCLEVBQXNDVSxRQUF0QztBQUNELEdBckJrQztBQUFBLENBQTlCOztBQXVCQSxJQUFNa0MsZ0NBQVksU0FBWkEsU0FBWSxDQUFDekMsSUFBRCxFQUFPTSxPQUFQO0FBQUEsU0FDdkIsVUFBQ1QsUUFBRCxFQUFXVSxRQUFYLEVBQXdCO0FBQ3RCVCx1QkFBTUMsY0FBTixDQUFxQkMsSUFBckI7QUFDQSxRQUFJLENBQUNNLE9BQUQsSUFBWSxDQUFDQSxRQUFRRSxPQUF6QixFQUFrQyxPQUFPLEtBQVA7QUFDbEMsUUFBTUMsV0FBV0YsV0FBV0csUUFBWCxDQUFvQkMsR0FBcEIsQ0FBd0JYLEtBQUtFLEVBQTdCLENBQWpCO0FBQ0EsUUFBSSxDQUFDTyxRQUFMLEVBQWUsT0FBTyxLQUFQO0FBQ2YsUUFBTWlDLFdBQVdqQyxTQUFTSSxLQUFULENBQWUsQ0FBQyxRQUFELEVBQVcsYUFBWCxDQUFmLENBQWpCO0FBQ0EsUUFBSSxDQUFDNkIsUUFBTCxFQUFlLE9BQU8sS0FBUDtBQUNmLFFBQU1DLGFBQWFELFNBQVMvQixHQUFULENBQWEsWUFBYixDQUFuQjtBQUNBLFFBQUksQ0FBQ2dDLFVBQUwsRUFBaUIsT0FBTyxLQUFQO0FBQ2pCLFFBQU1DLFlBQVlGLFNBQVMvQixHQUFULENBQWEsV0FBYixFQUEwQixLQUExQixDQUFsQjtBQUNBLFFBQUljLGVBQUo7QUFDQW5CLFlBQVFFLE9BQVIsQ0FBZ0IsVUFBQ3FDLEdBQUQsRUFBUztBQUN2QixVQUFJL0MsbUJBQU00QixZQUFOLENBQW1CbUIsR0FBbkIsTUFBNEJGLFVBQWhDLEVBQTRDO0FBQzFDbEIsaUJBQVNvQixHQUFUO0FBQ0Q7QUFDRixLQUpEO0FBS0EsUUFBSSxDQUFDcEIsTUFBTCxFQUFhLE9BQU8sS0FBUDs7QUFFYnRCLFlBQVFILElBQVIsRUFBY0gsUUFBZDtBQUNBLFFBQU1pRCxjQUFjckMsU0FBU0UsR0FBVCxDQUFhLFNBQWIsQ0FBcEI7QUFDQSxRQUFNb0MsYUFBYWpELG1CQUFNa0QsaUJBQU4sQ0FBd0J2QixNQUF4QixDQUFuQjtBQUNBLFFBQU13QixjQUFjbkQsbUJBQU1vRCxrQkFBTixDQUF5QnpCLE1BQXpCLENBQXBCO0FBQ0EsUUFBTVcsb0JBQW9CdEMsbUJBQU11QyxvQkFBTixDQUEyQlosTUFBM0IsQ0FBMUI7QUFDQSxRQUFNWCxVQUFVZ0MsWUFBWUssSUFBWixDQUFpQixVQUFDQyxDQUFELEVBQUlDLENBQUosRUFBVTtBQUN6QyxVQUFNQyxPQUFPTCxZQUFZRyxDQUFaLENBQWI7QUFDQSxVQUFNRyxPQUFPTixZQUFZSSxDQUFaLENBQWI7QUFDQSxVQUFJVCxjQUFjLEtBQWxCLEVBQXlCO0FBQ3ZCLFlBQUlSLGtCQUFrQmtCLElBQWxCLENBQUosRUFBNkIsT0FBTyxDQUFDLENBQVI7QUFDN0IsWUFBSWxCLGtCQUFrQm1CLElBQWxCLENBQUosRUFBNkIsT0FBTyxDQUFQO0FBQzdCLGVBQU9SLFdBQVdPLElBQVgsRUFBaUJDLElBQWpCLENBQVA7QUFDRDtBQUNELFVBQUluQixrQkFBa0JrQixJQUFsQixDQUFKLEVBQTZCLE9BQU8sQ0FBUDtBQUM3QixVQUFJbEIsa0JBQWtCbUIsSUFBbEIsQ0FBSixFQUE2QixPQUFPLENBQUMsQ0FBUjtBQUM3QixhQUFPUixXQUFXUSxJQUFYLEVBQWlCRCxJQUFqQixDQUFQO0FBQ0QsS0FYZSxDQUFoQjtBQVlBLFFBQUl2QyxhQUFKO0FBQ0E7QUFDQSxRQUFJTixTQUFTSSxLQUFULENBQWUsQ0FBQyxRQUFELEVBQVcsZUFBWCxFQUE0QixhQUE1QixDQUFmLEVBQTJELEtBQTNELENBQUosRUFBdUU7QUFDckVFLGFBQU9OLFNBQVNFLEdBQVQsQ0FBYSxNQUFiLEVBQXFCd0MsSUFBckIsQ0FBMEIsVUFBQ0MsQ0FBRCxFQUFJQyxDQUFKLEVBQVU7QUFDekMsWUFBTUMsT0FBT0wsWUFBWUcsQ0FBWixDQUFiO0FBQ0EsWUFBTUcsT0FBT04sWUFBWUksQ0FBWixDQUFiO0FBQ0EsWUFBSVQsY0FBYyxLQUFsQixFQUF5QjtBQUN2QixjQUFJUixrQkFBa0JrQixJQUFsQixDQUFKLEVBQTZCLE9BQU8sQ0FBQyxDQUFSO0FBQzdCLGNBQUlsQixrQkFBa0JtQixJQUFsQixDQUFKLEVBQTZCLE9BQU8sQ0FBUDtBQUM3QixpQkFBT1IsV0FBV08sSUFBWCxFQUFpQkMsSUFBakIsQ0FBUDtBQUNEO0FBQ0QsWUFBSW5CLGtCQUFrQmtCLElBQWxCLENBQUosRUFBNkIsT0FBTyxDQUFQO0FBQzdCLFlBQUlsQixrQkFBa0JtQixJQUFsQixDQUFKLEVBQTZCLE9BQU8sQ0FBQyxDQUFSO0FBQzdCLGVBQU9SLFdBQVdRLElBQVgsRUFBaUJELElBQWpCLENBQVA7QUFDRCxPQVhNLENBQVA7QUFZRCxLQWJELE1BYU87QUFDTHZDLGFBQU9ELE9BQVA7QUFDRDtBQUNEakIsYUFBUztBQUNQSSxZQUFNOUMsTUFBTUssNEJBREw7QUFFUDBDLFVBQUlGLEtBQUtFLEVBRkY7QUFHUGEsZ0JBSE87QUFJUEQ7QUFKTyxLQUFUO0FBTUFWLGFBQVNKLElBQVQsRUFBZUgsUUFBZjtBQUNBLFdBQU8sSUFBUDtBQUNELEdBOURzQjtBQUFBLENBQWxCOztBQWdFQSxJQUFNMkQsa0NBQWEsU0FBYkEsVUFBYSxDQUFDeEQsSUFBRCxFQUFPTSxPQUFQLEVBQWdCbUIsTUFBaEIsRUFBd0JnQyxPQUF4QjtBQUFBLFNBQ3hCLFVBQUM1RCxRQUFELEVBQVdVLFFBQVgsRUFBd0I7QUFDdEJULHVCQUFNQyxjQUFOLENBQXFCQyxJQUFyQjtBQUNBLFFBQU00QyxZQUFZYSxXQUFXLEtBQTdCO0FBQ0EsUUFBTWQsYUFBYTdDLG1CQUFNNEIsWUFBTixDQUFtQkQsTUFBbkIsQ0FBbkI7QUFDQTNCLHVCQUFNNEQsWUFBTixDQUFtQjFELElBQW5CLEVBQXlCLEVBQUUyQyxzQkFBRixFQUFjQyxvQkFBZCxFQUF6QjtBQUNBL0MsYUFBUztBQUNQSSxZQUFNOUMsTUFBTU0sNkJBREw7QUFFUHlDLFVBQUlGLEtBQUtFLEVBRkY7QUFHUHlDLDRCQUhPO0FBSVBDO0FBSk8sS0FBVDtBQU1BSCxjQUFVekMsSUFBVixFQUFnQk0sT0FBaEIsRUFBeUJULFFBQXpCLEVBQW1DVSxRQUFuQztBQUNELEdBYnVCO0FBQUEsQ0FBbkI7O0FBZUEsSUFBTW9ELDRCQUFVLFNBQVZBLE9BQVUsQ0FBQzNELElBQUQsRUFBT00sT0FBUCxFQUFnQlMsSUFBaEI7QUFBQSxTQUNyQixVQUFDbEIsUUFBRCxFQUFXVSxRQUFYLEVBQXdCO0FBQ3RCVCx1QkFBTUMsY0FBTixDQUFxQkMsSUFBckI7QUFDQUYsdUJBQU04RCxpQkFBTixDQUF3QnRELE9BQXhCO0FBQ0EsUUFBTXVELGFBQWEvRCxtQkFBTWdFLGNBQU4sQ0FBcUI5RCxJQUFyQixFQUEyQk0sT0FBM0IsQ0FBbkI7QUFDQSxRQUFNeUQsZ0JBQWdCQyxvQkFBVUMsUUFBVixDQUFtQkMsVUFBbkIsQ0FBOEJuRCxJQUE5QixJQUFzQ0EsSUFBdEMsR0FBNkNpRCxvQkFBVUcsTUFBVixDQUFpQnBELElBQWpCLENBQW5FO0FBQ0EsUUFBTXFELGdCQUFnQnRFLG1CQUFNdUUsaUJBQU4sQ0FBd0JyRSxJQUF4QixFQUE4Qm9CLE1BQTlCLENBQXFDO0FBQUEsYUFDekQsQ0FBQyxDQUFDMkMsY0FBY08sSUFBZCxDQUFtQjtBQUFBLGVBQVlDLFNBQVMxRCxLQUFULENBQWViLEtBQUt3RSxTQUFwQixNQUFtQ0MsSUFBL0M7QUFBQSxPQUFuQixDQUR1RDtBQUFBLEtBQXJDLENBQXRCO0FBR0E1RSxhQUFTO0FBQ1BJLFlBQU05QyxNQUFNSSwwQkFETDtBQUVQMkMsVUFBSUYsS0FBS0UsRUFGRjtBQUdQYSxZQUFNZ0QsYUFIQztBQUlQVyxjQUFRYixVQUpEO0FBS1BPO0FBTE8sS0FBVDtBQU9BL0QsaUJBQWFMLElBQWIsRUFBbUJNLE9BQW5CLEVBQTRCVCxRQUE1QixFQUFzQ1UsUUFBdEM7QUFDQWtDLGNBQVV6QyxJQUFWLEVBQWdCTSxPQUFoQixFQUF5QlQsUUFBekIsRUFBbUNVLFFBQW5DO0FBQ0QsR0FsQm9CO0FBQUEsQ0FBaEI7O0FBb0JBLElBQU1vRSxzQ0FBZSxTQUFmQSxZQUFlLENBQUMzRSxJQUFELEVBQU9tQyxTQUFQLEVBQWtCeUMsS0FBbEI7QUFBQSxTQUMxQixVQUFDL0UsUUFBRCxFQUFXVSxRQUFYLEVBQXdCO0FBQ3RCVCx1QkFBTUMsY0FBTixDQUFxQkMsSUFBckI7QUFDQSxRQUFNNkUsZUFBZXRFLFdBQ2xCRyxRQURrQixDQUVsQkcsS0FGa0IsQ0FFWixDQUFDYixLQUFLRSxFQUFOLEVBQVUsUUFBVixFQUFvQixjQUFwQixDQUZZLEVBRXlCLHFCQUZ6QixFQUdsQnFDLEdBSGtCLENBR2RKLFNBSGMsRUFHSHlDLEtBSEcsQ0FBckI7QUFJQTlFLHVCQUFNZ0YsZ0JBQU4sQ0FBdUI5RSxJQUF2QixFQUE2QjZFLFlBQTdCO0FBQ0FoRixhQUFTO0FBQ1BJLFlBQU05QyxNQUFNTywrQkFETDtBQUVQd0MsVUFBSUYsS0FBS0UsRUFGRjtBQUdQMkU7QUFITyxLQUFUO0FBS0QsR0FieUI7QUFBQSxDQUFyQjs7QUFlQSxJQUFNRSxzQkFBTyxTQUFQQSxJQUFPO0FBQUEsU0FDbEIsVUFBQ2xGLFFBQUQsRUFBYztBQUNaQyx1QkFBTUMsY0FBTixDQUFxQkMsSUFBckI7QUFDQUgsYUFBUztBQUNQSSxZQUFNOUMsTUFBTVEsc0JBREw7QUFFUHVDLFVBQUlGLEtBQUtFO0FBRkYsS0FBVDtBQUlELEdBUGlCO0FBQUEsQ0FBYjs7QUFTQSxJQUFNOEUsMEJBQVMsU0FBVEEsTUFBUztBQUFBLFNBQ3BCLFVBQUNuRixRQUFELEVBQWM7QUFDWkMsdUJBQU1DLGNBQU4sQ0FBcUJDLElBQXJCO0FBQ0FILGFBQVM7QUFDUEksWUFBTTlDLE1BQU1TLHdCQURMO0FBRVBzQyxVQUFJRixLQUFLRTtBQUZGLEtBQVQ7QUFJRCxHQVBtQjtBQUFBLENBQWY7O0FBU0EsSUFBTStFLHNCQUFPLFNBQVBBLElBQU8sQ0FBQ2pGLElBQUQ7QUFBQSxNQUFPa0YsRUFBUCx1RUFBWSxZQUFNLENBQUUsQ0FBcEI7QUFBQSxTQUNsQixVQUFDckYsUUFBRCxFQUFjO0FBQ1pDLHVCQUFNQyxjQUFOLENBQXFCQyxJQUFyQjtBQUNBSCxhQUFTO0FBQ1BJLFlBQU05QyxNQUFNVSxzQkFETDtBQUVQcUMsVUFBSUYsS0FBS0U7QUFGRixLQUFUO0FBSUFnRjtBQUNELEdBUmlCO0FBQUEsQ0FBYjs7QUFVQSxJQUFNQyxvQ0FBYyxTQUFkQSxXQUFjLENBQUNuRixJQUFELEVBQU9NLE9BQVAsRUFBZ0I4RSxVQUFoQjtBQUFBLFNBQ3pCLFVBQUN2RixRQUFELEVBQVdVLFFBQVgsRUFBd0I7QUFDdEJULHVCQUFNQyxjQUFOLENBQXFCQyxJQUFyQjtBQUNBSCxhQUFTO0FBQ1BJLFlBQU05QyxNQUFNVyw4QkFETDtBQUVQb0MsVUFBSUYsS0FBS0UsRUFGRjtBQUdQc0UsaUJBQVd4RSxLQUFLd0UsU0FIVDtBQUlQWTtBQUpPLEtBQVQ7QUFNQS9FLGlCQUFhTCxJQUFiLEVBQW1CTSxPQUFuQixFQUE0QlQsUUFBNUIsRUFBc0NVLFFBQXRDO0FBQ0FrQyxjQUFVekMsSUFBVixFQUFnQk0sT0FBaEIsRUFBeUJULFFBQXpCLEVBQW1DVSxRQUFuQztBQUNELEdBWHdCO0FBQUEsQ0FBcEI7O0FBYUEsSUFBTThFLGtEQUFxQixTQUFyQkEsa0JBQXFCLENBQUNyRixJQUFELEVBQU9NLE9BQVAsRUFBZ0I4RSxVQUFoQjtBQUFBLFNBQ2hDLFVBQUN2RixRQUFELEVBQVdVLFFBQVgsRUFBd0I7QUFDdEJULHVCQUFNQyxjQUFOLENBQXFCQyxJQUFyQjtBQUNBSCxhQUFTO0FBQ1BJLFlBQU05QyxNQUFNWSxzQ0FETDtBQUVQbUMsVUFBSUYsS0FBS0UsRUFGRjtBQUdQc0UsaUJBQVd4RSxLQUFLd0UsU0FIVDtBQUlQWTtBQUpPLEtBQVQ7QUFNQS9FLGlCQUFhTCxJQUFiLEVBQW1CTSxPQUFuQixFQUE0QlQsUUFBNUIsRUFBc0NVLFFBQXRDO0FBQ0FrQyxjQUFVekMsSUFBVixFQUFnQk0sT0FBaEIsRUFBeUJULFFBQXpCLEVBQW1DVSxRQUFuQztBQUNELEdBWCtCO0FBQUEsQ0FBM0I7O0FBYUEsSUFBTStFLDhCQUFXLFNBQVhBLFFBQVc7QUFBQSxTQUN0QixVQUFDekYsUUFBRCxFQUFjO0FBQ1pDLHVCQUFNQyxjQUFOLENBQXFCQyxJQUFyQjtBQUNBSCxhQUFTO0FBQ1BJLFlBQU05QyxNQUFNYSwyQkFETDtBQUVQa0MsVUFBSUYsS0FBS0U7QUFGRixLQUFUO0FBSUQsR0FQcUI7QUFBQSxDQUFqQjs7QUFTQSxJQUFNcUYsMEJBQVMsU0FBVEEsTUFBUyxDQUFDdkYsSUFBRCxFQUFPd0YsbUJBQVA7QUFBQSxTQUNwQixVQUFDM0YsUUFBRCxFQUFjO0FBQ1pDLHVCQUFNQyxjQUFOLENBQXFCQyxJQUFyQjtBQUNBSCxhQUFTO0FBQ1BJLFlBQU05QyxNQUFNYyx3QkFETDtBQUVQaUMsVUFBSUYsS0FBS0UsRUFGRjtBQUdQc0Y7QUFITyxLQUFUO0FBS0QsR0FSbUI7QUFBQSxDQUFmOztBQVVBLElBQU1DLGtDQUFhLFNBQWJBLFVBQWEsQ0FBQ3pGLElBQUQsRUFBT3dGLG1CQUFQO0FBQUEsU0FDeEIsVUFBQzNGLFFBQUQsRUFBYztBQUNaQyx1QkFBTUMsY0FBTixDQUFxQkMsSUFBckI7QUFDQUgsYUFBUztBQUNQSSxZQUFNOUMsTUFBTWUsOEJBREw7QUFFUGdDLFVBQUlGLEtBQUtFLEVBRkY7QUFHUHNGO0FBSE8sS0FBVDtBQUtELEdBUnVCO0FBQUEsQ0FBbkI7O0FBVUEsSUFBTUUsd0NBQWdCLFNBQWhCQSxhQUFnQixDQUFDMUYsSUFBRCxFQUFPMkYsS0FBUDtBQUFBLFNBQzNCLFVBQUM5RixRQUFELEVBQWM7QUFDWkMsdUJBQU1DLGNBQU4sQ0FBcUJDLElBQXJCO0FBQ0FILGFBQVM7QUFDUEksWUFBTTlDLE1BQU1nQixpQ0FETDtBQUVQK0IsVUFBSUYsS0FBS0UsRUFGRjtBQUdQeUY7QUFITyxLQUFUO0FBS0QsR0FSMEI7QUFBQSxDQUF0Qjs7QUFVQSxJQUFNQywwQ0FBaUIsU0FBakJBLGNBQWlCLENBQUM1RixJQUFELEVBQU82RixPQUFQO0FBQUEsU0FDNUIsVUFBQ2hHLFFBQUQsRUFBYztBQUNaQyx1QkFBTUMsY0FBTixDQUFxQkMsSUFBckI7QUFDQUgsYUFBUztBQUNQSSxZQUFNOUMsTUFBTWlCLGtDQURMO0FBRVA4QixVQUFJRixLQUFLRSxFQUZGO0FBR1AyRjtBQUhPLEtBQVQ7QUFLRCxHQVIyQjtBQUFBLENBQXZCOztBQVVBLElBQU1DLDBCQUFTLFNBQVRBLE1BQVMsQ0FBQzlGLElBQUQ7QUFBQSxNQUFPa0YsRUFBUCx1RUFBWSxZQUFNLENBQUUsQ0FBcEI7QUFBQSxTQUNwQixVQUFDckYsUUFBRCxFQUFjO0FBQ1pDLHVCQUFNQyxjQUFOLENBQXFCQyxJQUFyQjtBQUNBSCxhQUFTO0FBQ1BJLFlBQU05QyxNQUFNa0Isd0JBREw7QUFFUDZCLFVBQUlGLEtBQUtFO0FBRkYsS0FBVDtBQUlBZ0Y7QUFDRCxHQVJtQjtBQUFBLENBQWY7O0FBVUEsSUFBTWEsd0NBQWdCLFNBQWhCQSxhQUFnQixDQUFDL0YsSUFBRCxFQUFPZ0csVUFBUDtBQUFBLFNBQzNCLFVBQUNuRyxRQUFELEVBQWM7QUFDWkMsdUJBQU1DLGNBQU4sQ0FBcUJDLElBQXJCO0FBQ0FILGFBQVM7QUFDUEksWUFBTTlDLE1BQU1tQixnQ0FETDtBQUVQNEIsVUFBSUYsS0FBS0UsRUFGRjtBQUdQc0UsaUJBQVd4RSxLQUFLd0UsU0FIVDtBQUlQd0I7QUFKTyxLQUFUO0FBTUQsR0FUMEI7QUFBQSxDQUF0Qjs7QUFXQSxJQUFNQyxrQ0FBYSxTQUFiQSxVQUFhO0FBQUEsU0FDeEIsVUFBQ3BHLFFBQUQsRUFBYztBQUNaQyx1QkFBTUMsY0FBTixDQUFxQkMsSUFBckI7QUFDQUgsYUFBUztBQUNQSSxZQUFNOUMsTUFBTW9CLDZCQURMO0FBRVAyQixVQUFJRixLQUFLRTtBQUZGLEtBQVQ7QUFJRCxHQVB1QjtBQUFBLENBQW5COztBQVNBLElBQU1nRyxvREFBc0IsU0FBdEJBLG1CQUFzQixDQUFDbEcsSUFBRCxFQUFPbUcsTUFBUCxFQUFlQyxPQUFmLEVBQXdCbkUsS0FBeEI7QUFBQSxTQUNqQyxVQUFDcEMsUUFBRCxFQUFjO0FBQ1pDLHVCQUFNQyxjQUFOLENBQXFCQyxJQUFyQjtBQUNBSCxhQUFTO0FBQ1BJLFlBQU05QyxNQUFNcUIsd0NBREw7QUFFUDBCLFVBQUlGLEtBQUtFLEVBRkY7QUFHUGlHLG9CQUhPO0FBSVBDLHNCQUpPO0FBS1BuRTtBQUxPLEtBQVQ7QUFPRCxHQVZnQztBQUFBLENBQTVCOztBQVlBLElBQU1vRSx3REFBd0IsU0FBeEJBLHFCQUF3QixDQUNuQ3JHLElBRG1DLEVBRW5DbUcsTUFGbUMsRUFHbkNDLE9BSG1DLEVBSW5DbkUsS0FKbUM7QUFBQSxNQUtuQ3FFLFVBTG1DLHVFQUt0QixFQUxzQjtBQUFBLFNBT25DLFVBQUN6RyxRQUFELEVBQVdVLFFBQVgsRUFBd0I7QUFDdEJULHVCQUFNQyxjQUFOLENBQXFCQyxJQUFyQjtBQUNBLFFBQUl1RyxrQkFBa0IsRUFBRUMsT0FBTyxJQUFULEVBQXRCO0FBQ0FGLGVBQVc5RixPQUFYLENBQW1CLFVBQUNpRyxTQUFELEVBQWU7QUFDaEMsVUFBSUYsZ0JBQWdCQyxLQUFwQixFQUEyQjtBQUN6QixZQUFJQyxVQUFVQyxNQUFkLEVBQXNCO0FBQ3BCLGNBQUl6RSxVQUFVLEVBQVYsSUFBZ0JBLFVBQVUsSUFBMUIsSUFBa0NBLFVBQVUwRSxTQUFoRCxFQUEyRDtBQUN6RDtBQUNBLGdCQUFNbEcsV0FBV0YsV0FBV0csUUFBWCxDQUFvQkMsR0FBcEIsQ0FBd0JYLEtBQUtFLEVBQTdCLENBQWpCO0FBQ0EsZ0JBQU0wRyxXQUFXbkcsU0FBU0UsR0FBVCxDQUFhLFVBQWIsQ0FBakI7QUFDQSxnQkFBSUcsVUFBVUwsU0FBU0UsR0FBVCxDQUFhLFNBQWIsQ0FBZDtBQUNBLGdCQUFJaUcsUUFBSixFQUFjO0FBQ1pBLHVCQUFTcEcsT0FBVCxDQUFpQixVQUFDcUcsWUFBRCxFQUFlQyxjQUFmLEVBQWtDO0FBQ2pELG9CQUFNQyxhQUNKakcsUUFBUWtHLFNBQVIsQ0FBa0I7QUFBQSx5QkFBS0MsRUFBRXBHLEtBQUYsQ0FBUWIsS0FBS3dFLFNBQWIsTUFBNEJzQyxjQUFqQztBQUFBLGlCQUFsQixDQURGO0FBRUEsb0JBQUlDLGVBQWUsQ0FBQyxDQUFwQixFQUF1QjtBQUNyQmpHLDRCQUFVQSxRQUFRb0csV0FBUixDQUFvQixDQUFDSCxVQUFELENBQXBCLEVBQWtDRixZQUFsQyxDQUFWO0FBQ0Q7QUFDRixlQU5EO0FBT0Q7QUFDRDtBQUNBLGdCQUFNTSxVQUFVckcsUUFBUXdELElBQVIsQ0FBYSxVQUFDRyxJQUFELEVBQVU7QUFDckMsa0JBQUl6RSxLQUFLd0UsU0FBTCxDQUFlNEMsTUFBbkIsRUFBMkI7QUFDekI7QUFDQSxvQkFBSTNDLEtBQUs1RCxLQUFMLENBQVdiLEtBQUt3RSxTQUFoQixNQUErQjJCLE1BQW5DLEVBQTJDO0FBQ3pDLHlCQUFPLEtBQVA7QUFDRDtBQUNGO0FBQ0QscUJBQU8xQixLQUFLNUQsS0FBTCxDQUFXdUYsT0FBWCxNQUF3Qm5FLEtBQS9CO0FBQ0QsYUFSZSxDQUFoQjtBQVNBLGdCQUFJa0YsT0FBSixFQUFhO0FBQ1haLGdDQUFrQjtBQUNoQkMsdUJBQU8sS0FEUztBQUVoQmEseUJBQVM7QUFGTyxlQUFsQjtBQUlEO0FBQ0Y7QUFDRixTQWhDRCxNQWdDTyxJQUFJWixVQUFVYSxtQkFBZCxFQUFtQztBQUN4QyxjQUFNN0csWUFBV0YsV0FBV0csUUFBWCxDQUFvQkMsR0FBcEIsQ0FBd0JYLEtBQUtFLEVBQTdCLENBQWpCO0FBQ0EsY0FBTTBHLFlBQVduRyxVQUFTSSxLQUFULENBQWUsQ0FBQyxVQUFELEVBQWFzRixNQUFiLENBQWYsRUFBcUMscUJBQXJDLENBQWpCO0FBQ0EsY0FBSXhFLFVBQVVsQixVQUFTRSxHQUFULENBQWEsU0FBYixFQUF3QjJELElBQXhCLENBQTZCO0FBQUEsbUJBQVFHLEtBQUs1RCxLQUFMLENBQVdiLEtBQUt3RSxTQUFoQixNQUErQjJCLE1BQXZDO0FBQUEsV0FBN0IsQ0FBZDtBQUNBLGNBQUl4RSxPQUFKLEVBQWE7QUFDWEEsc0JBQVVBLFFBQVE0RixTQUFSLENBQWtCWCxTQUFsQixDQUFWO0FBQ0FMLDhCQUFrQkUsVUFBVWEsbUJBQVYsQ0FBOEJyRixLQUE5QixFQUFxQ04sT0FBckMsQ0FBbEI7QUFDRDtBQUNGLFNBUk0sTUFRQTtBQUNMLGNBQU02RixTQUFTZixVQUFVZSxNQUFWLEdBQW1CQyxPQUFPQyxNQUFQLENBQWNqQixVQUFVZSxNQUF4QixDQUFuQixHQUFxRCxFQUFwRTtBQUNBakIsNEJBQWtCRSxVQUFVa0IsUUFBVixtQkFBbUIxRixLQUFuQixTQUE2QnVGLE1BQTdCLEVBQWxCO0FBQ0EsY0FBSWYsVUFBVWUsTUFBZCxFQUFzQjtBQUNwQmpCLDRCQUFnQnFCLGFBQWhCLEdBQWdDbkIsVUFBVWUsTUFBMUM7QUFDRDtBQUNGO0FBQ0Y7QUFDRixLQWxERDtBQW1EQSxRQUFJakIsZ0JBQWdCQyxLQUFwQixFQUEyQjtBQUN6QjNHLGVBQVM7QUFDUEksY0FBTTlDLE1BQU13QixtQ0FETDtBQUVQdUIsWUFBSUYsS0FBS0UsRUFGRjtBQUdQMkgscUJBQWEsT0FITjtBQUlQMUIsc0JBSk87QUFLUEM7QUFMTyxPQUFUO0FBT0QsS0FSRCxNQVFPO0FBQ0x2RyxlQUFTO0FBQ1BJLGNBQU05QyxNQUFNc0IsbUNBREw7QUFFUHlCLFlBQUlGLEtBQUtFLEVBRkY7QUFHUDJILHFCQUFhLE9BSE47QUFJUDFCLHNCQUpPO0FBS1BDLHdCQUxPO0FBTVAwQixtQkFBV3ZCLGdCQUFnQmMsT0FOcEI7QUFPUE8sdUJBQWVyQixnQkFBZ0JxQjtBQVB4QixPQUFUO0FBU0Q7QUFDRCxXQUFPckIsZ0JBQWdCQyxLQUF2QjtBQUNELEdBakZrQztBQUFBLENBQTlCOztBQW1GQSxJQUFNdUIsd0RBQXdCLFNBQXhCQSxxQkFBd0IsQ0FBQy9ILElBQUQsRUFBT2dJLFFBQVAsRUFBaUI1QixPQUFqQixFQUEwQm5FLEtBQTFCO0FBQUEsU0FDbkMsVUFBQ3BDLFFBQUQsRUFBYztBQUNaQyx1QkFBTUMsY0FBTixDQUFxQkMsSUFBckI7QUFDQUgsYUFBUztBQUNQSSxZQUFNOUMsTUFBTTJCLDBDQURMO0FBRVBvQixVQUFJRixLQUFLRSxFQUZGO0FBR1A4SCx3QkFITztBQUlQNUIsc0JBSk87QUFLUG5FO0FBTE8sS0FBVDtBQU9ELEdBVmtDO0FBQUEsQ0FBOUI7O0FBWUEsSUFBTWdHLDREQUEwQixTQUExQkEsdUJBQTBCLENBQUNqSSxJQUFELEVBQU9nSSxRQUFQLEVBQWlCNUIsT0FBakIsRUFBMEJuRSxLQUExQjtBQUFBLE1BQWlDcUUsVUFBakMsdUVBQThDLEVBQTlDO0FBQUEsU0FDckMsVUFBQ3pHLFFBQUQsRUFBV1UsUUFBWCxFQUF3QjtBQUN0QlQsdUJBQU1DLGNBQU4sQ0FBcUJDLElBQXJCO0FBQ0EsUUFBSXVHLGtCQUFrQixFQUFFQyxPQUFPLElBQVQsRUFBdEI7QUFDQUYsZUFBVzlGLE9BQVgsQ0FBbUIsVUFBQ2lHLFNBQUQsRUFBZTtBQUNoQyxVQUFJRixnQkFBZ0JDLEtBQXBCLEVBQTJCO0FBQ3pCLFlBQUlDLFVBQVVDLE1BQWQsRUFBc0I7QUFDcEIsY0FBSXpFLFVBQVUsRUFBVixJQUFnQkEsVUFBVSxJQUExQixJQUFrQ0EsVUFBVTBFLFNBQWhELEVBQTJEO0FBQ3pELGdCQUFNUSxVQUFVNUcsV0FDYkcsUUFEYSxDQUViRyxLQUZhLENBRVAsQ0FBQ2IsS0FBS0UsRUFBTixFQUFVLFNBQVYsQ0FGTyxFQUdib0UsSUFIYSxDQUdSO0FBQUEscUJBQVFHLEtBQUs1RCxLQUFMLENBQVd1RixPQUFYLE1BQXdCbkUsS0FBaEM7QUFBQSxhQUhRLENBQWhCO0FBSUEsZ0JBQUlrRixPQUFKLEVBQWE7QUFDWFosZ0NBQWtCO0FBQ2hCQyx1QkFBTyxLQURTO0FBRWhCYSx5QkFBUztBQUZPLGVBQWxCO0FBSUQsYUFMRCxNQUtPO0FBQ0wsa0JBQU1hLFFBQVEzSCxXQUNYRyxRQURXLENBRVhHLEtBRlcsQ0FFTCxDQUFDYixLQUFLRSxFQUFOLEVBQVUsWUFBVixDQUZLLEVBR1hvRSxJQUhXLENBR04sVUFBQ0csSUFBRCxFQUFPMEQsQ0FBUDtBQUFBLHVCQUFhQSxNQUFNSCxRQUFOLElBQWtCdkQsS0FBSzVELEtBQUwsQ0FBV3VGLE9BQVgsTUFBd0JuRSxLQUF2RDtBQUFBLGVBSE0sQ0FBZDtBQUlBLGtCQUFJaUcsS0FBSixFQUFXO0FBQ1QzQixrQ0FBa0I7QUFDaEJDLHlCQUFPLEtBRFM7QUFFaEJhLDJCQUFTO0FBRk8saUJBQWxCO0FBSUQ7QUFDRjtBQUNGO0FBQ0YsU0F4QkQsTUF3Qk8sSUFBSVosVUFBVWEsbUJBQWQsRUFBbUM7QUFDeEMsY0FBTTNGLFVBQVVwQixXQUFXRyxRQUFYLENBQW9CRyxLQUFwQixDQUEwQixDQUFDYixLQUFLRSxFQUFOLEVBQVUsWUFBVixFQUF3QjhILFFBQXhCLENBQTFCLENBQWhCO0FBQ0F6Qiw0QkFBa0JFLFVBQVVhLG1CQUFWLENBQThCckYsS0FBOUIsRUFBcUNOLE9BQXJDLENBQWxCO0FBQ0QsU0FITSxNQUdBO0FBQ0wsY0FBTTZGLFNBQVNmLFVBQVVlLE1BQVYsR0FBbUJDLE9BQU9DLE1BQVAsQ0FBY2pCLFVBQVVlLE1BQXhCLENBQW5CLEdBQXFELEVBQXBFO0FBQ0FqQiw0QkFBa0JFLFVBQVVrQixRQUFWLG1CQUFtQjFGLEtBQW5CLFNBQTZCdUYsTUFBN0IsRUFBbEI7QUFDQSxjQUFJZixVQUFVZSxNQUFkLEVBQXNCO0FBQ3BCakIsNEJBQWdCcUIsYUFBaEIsR0FBZ0NuQixVQUFVZSxNQUExQztBQUNEO0FBQ0Y7QUFDRjtBQUNGLEtBckNEO0FBc0NBLFFBQUlqQixnQkFBZ0JDLEtBQXBCLEVBQTJCO0FBQ3pCM0csZUFBUztBQUNQSSxjQUFNOUMsTUFBTTBCLDBDQURMO0FBRVBxQixZQUFJRixLQUFLRSxFQUZGO0FBR1AySCxxQkFBYSxPQUhOO0FBSVBHLDBCQUpPO0FBS1A1QjtBQUxPLE9BQVQ7QUFPRCxLQVJELE1BUU87QUFDTHZHLGVBQVM7QUFDUEksY0FBTTlDLE1BQU15QiwwQ0FETDtBQUVQc0IsWUFBSUYsS0FBS0UsRUFGRjtBQUdQMkgscUJBQWEsT0FITjtBQUlQRywwQkFKTztBQUtQNUIsd0JBTE87QUFNUDBCLG1CQUFXdkIsZ0JBQWdCYyxPQU5wQjtBQU9QTyx1QkFBZXJCLGdCQUFnQnFCO0FBUHhCLE9BQVQ7QUFTRDtBQUNELFdBQU9yQixnQkFBZ0JDLEtBQXZCO0FBQ0QsR0E5RG9DO0FBQUEsQ0FBaEM7O0FBZ0VBLElBQU00Qiw0Q0FBa0IsU0FBbEJBLGVBQWtCLENBQUNwSSxJQUFELEVBQU82SCxXQUFQLEVBQW9CMUIsTUFBcEIsRUFBNEJDLE9BQTVCLEVBQXFDMEIsU0FBckMsRUFBZ0RGLGFBQWhEO0FBQUEsU0FDN0IsVUFBQy9ILFFBQUQsRUFBYztBQUNaQyx1QkFBTUMsY0FBTixDQUFxQkMsSUFBckI7QUFDQUgsYUFBUztBQUNQSSxZQUFNOUMsTUFBTXNCLG1DQURMO0FBRVB5QixVQUFJRixLQUFLRSxFQUZGO0FBR1AySCw4QkFITztBQUlQMUIsb0JBSk87QUFLUEMsc0JBTE87QUFNUDBCLDBCQU5PO0FBT1BGO0FBUE8sS0FBVDtBQVNELEdBWjRCO0FBQUEsQ0FBeEI7O0FBY0EsSUFBTVMsOENBQW1CLFNBQW5CQSxnQkFBbUIsQ0FBQ3JJLElBQUQsRUFBT3NJLFFBQVA7QUFBQSxTQUM5QixVQUFDekksUUFBRCxFQUFjO0FBQ1pDLHVCQUFNQyxjQUFOLENBQXFCQyxJQUFyQjtBQUNBSCxhQUFTO0FBQ1BJLFlBQU05QyxNQUFNdUIsb0NBREw7QUFFUHdCLFVBQUlGLEtBQUtFLEVBRkY7QUFHUG9JO0FBSE8sS0FBVDtBQUtELEdBUjZCO0FBQUEsQ0FBekI7O0FBVUEsSUFBTUMsNENBQWtCLFNBQWxCQSxlQUFrQixDQUFDdkksSUFBRDtBQUFBLE1BQU82SCxXQUFQLHVFQUFxQixJQUFyQjtBQUFBLE1BQTJCMUIsTUFBM0IsdUVBQW9DLElBQXBDO0FBQUEsTUFBMENDLE9BQTFDLHVFQUFvRCxJQUFwRDtBQUFBLFNBQzdCLFVBQUN2RyxRQUFELEVBQWM7QUFDWkMsdUJBQU1DLGNBQU4sQ0FBcUJDLElBQXJCO0FBQ0FILGFBQVM7QUFDUEksWUFBTTlDLE1BQU13QixtQ0FETDtBQUVQdUIsVUFBSUYsS0FBS0UsRUFGRjtBQUdQMkgsOEJBSE87QUFJUDFCLG9CQUpPO0FBS1BDO0FBTE8sS0FBVDtBQU9ELEdBVjRCO0FBQUEsQ0FBeEI7O0FBWUEsSUFBTW9DLHdEQUF3QixTQUF4QkEscUJBQXdCLENBQ25DeEksSUFEbUMsRUFFbkM2SCxXQUZtQyxFQUduQ0csUUFIbUMsRUFJbkM1QixPQUptQyxFQUtuQzBCLFNBTG1DLEVBTW5DRixhQU5tQztBQUFBLFNBUW5DLFVBQUMvSCxRQUFELEVBQWM7QUFDWkMsdUJBQU1DLGNBQU4sQ0FBcUJDLElBQXJCO0FBQ0FILGFBQVM7QUFDUEksWUFBTTlDLE1BQU15QiwwQ0FETDtBQUVQc0IsVUFBSUYsS0FBS0UsRUFGRjtBQUdQMkgsOEJBSE87QUFJUEcsd0JBSk87QUFLUDVCLHNCQUxPO0FBTVAwQiwwQkFOTztBQU9QRjtBQVBPLEtBQVQ7QUFTRCxHQW5Ca0M7QUFBQSxDQUE5Qjs7QUFxQkEsSUFBTWEsd0RBQXdCLFNBQXhCQSxxQkFBd0IsQ0FBQ3pJLElBQUQ7QUFBQSxNQUFPNkgsV0FBUCx1RUFBcUIsSUFBckI7QUFBQSxNQUEyQkcsUUFBM0IsdUVBQXNDLElBQXRDO0FBQUEsTUFBNEM1QixPQUE1Qyx1RUFBc0QsSUFBdEQ7QUFBQSxTQUNuQyxVQUFDdkcsUUFBRCxFQUFjO0FBQ1pDLHVCQUFNQyxjQUFOLENBQXFCQyxJQUFyQjtBQUNBSCxhQUFTO0FBQ1BJLFlBQU05QyxNQUFNMEIsMENBREw7QUFFUHFCLFVBQUlGLEtBQUtFLEVBRkY7QUFHUDJILDhCQUhPO0FBSVBHLHdCQUpPO0FBS1A1QjtBQUxPLEtBQVQ7QUFPRCxHQVZrQztBQUFBLENBQTlCOztBQVlBLElBQU1zQyxvREFBc0IsU0FBdEJBLG1CQUFzQixDQUFDMUksSUFBRDtBQUFBLE1BQU8ySSxZQUFQLHVFQUFzQixJQUF0QjtBQUFBLFNBQ2pDLFVBQUM5SSxRQUFELEVBQWM7QUFDWkMsdUJBQU1DLGNBQU4sQ0FBcUJDLElBQXJCO0FBQ0FILGFBQVM7QUFDUDhJLGdDQURPO0FBRVB6SSxVQUFJRixLQUFLRSxFQUZGO0FBR1BELFlBQU05QyxNQUFNNkI7QUFITCxLQUFUO0FBS0QsR0FSZ0M7QUFBQSxDQUE1Qjs7QUFVQSxJQUFNNEosb0RBQXNCLFNBQXRCQSxtQkFBc0IsQ0FDakM1SSxJQURpQyxFQUVqQ2dJLFFBRmlDO0FBQUEsTUFHakNhLFdBSGlDLHVFQUduQixLQUhtQjtBQUFBLE1BSWpDQyxZQUppQyx1RUFJbEIsS0FKa0I7QUFBQSxTQU1qQyxVQUFDakosUUFBRCxFQUFXVSxRQUFYLEVBQXdCO0FBQ3RCVCx1QkFBTUMsY0FBTixDQUFxQkMsSUFBckI7QUFDQUgsYUFBUztBQUNQSSxZQUFNOUMsTUFBTThCLHVDQURMO0FBRVBpQixVQUFJRixLQUFLRSxFQUZGO0FBR1A4SCx3QkFITztBQUlQeEQsaUJBQVd4RSxLQUFLd0UsU0FKVDtBQUtQcUUsOEJBTE87QUFNUEM7QUFOTyxLQUFUO0FBUUFoSix1QkFBTWlKLGlCQUFOLENBQXdCL0ksSUFBeEIsRUFBOEJPLFdBQVdHLFFBQVgsQ0FBb0JHLEtBQXBCLENBQTBCLENBQUNiLEtBQUtFLEVBQU4sRUFBVSxlQUFWLENBQTFCLENBQTlCO0FBQ0QsR0FqQmdDO0FBQUEsQ0FBNUI7O0FBbUJBLElBQU04SSxzREFBdUIsU0FBdkJBLG9CQUF1QjtBQUFBLFNBQ2xDLFVBQUNuSixRQUFELEVBQVdVLFFBQVgsRUFBd0I7QUFDdEJULHVCQUFNQyxjQUFOLENBQXFCQyxJQUFyQjtBQUNBSCxhQUFTO0FBQ1BJLFlBQU05QyxNQUFNK0IseUNBREw7QUFFUGdCLFVBQUlGLEtBQUtFLEVBRkY7QUFHUHNFLGlCQUFXeEUsS0FBS3dFO0FBSFQsS0FBVDtBQUtBMUUsdUJBQU1pSixpQkFBTixDQUF3Qi9JLElBQXhCLEVBQThCTyxXQUFXRyxRQUFYLENBQW9CRyxLQUFwQixDQUEwQixDQUFDYixLQUFLRSxFQUFOLEVBQVUsZUFBVixDQUExQixDQUE5QjtBQUNELEdBVGlDO0FBQUEsQ0FBN0I7O0FBV0EsSUFBTStJLGtEQUFxQixTQUFyQkEsa0JBQXFCO0FBQUEsU0FDaEMsVUFBQ3BKLFFBQUQsRUFBV1UsUUFBWCxFQUF3QjtBQUN0QlQsdUJBQU1DLGNBQU4sQ0FBcUJDLElBQXJCO0FBQ0FILGFBQVM7QUFDUEksWUFBTTlDLE1BQU1nQyxzQ0FETDtBQUVQZSxVQUFJRixLQUFLRTtBQUZGLEtBQVQ7QUFJQUosdUJBQU1pSixpQkFBTixDQUF3Qi9JLElBQXhCLEVBQThCTyxXQUFXRyxRQUFYLENBQW9CRyxLQUFwQixDQUEwQixDQUFDYixLQUFLRSxFQUFOLEVBQVUsZUFBVixDQUExQixDQUE5QjtBQUNELEdBUitCO0FBQUEsQ0FBM0I7O0FBVUEsSUFBTWdKLDRDQUFrQixTQUFsQkEsZUFBa0I7QUFBQSxTQUM3QixVQUFDckosUUFBRCxFQUFXVSxRQUFYLEVBQXdCO0FBQ3RCVCx1QkFBTUMsY0FBTixDQUFxQkMsSUFBckI7QUFDQSxRQUFNbUosY0FBYyxDQUFDNUksV0FDbEJHLFFBRGtCLENBRWxCRyxLQUZrQixDQUVaLENBQUNiLEtBQUtFLEVBQU4sRUFBVSxRQUFWLEVBQW9CLGVBQXBCLEVBQXFDLGFBQXJDLENBRlksRUFFeUMsS0FGekMsQ0FBckI7QUFHQUosdUJBQU1zSixlQUFOLENBQXNCcEosSUFBdEIsRUFBNEJtSixXQUE1QjtBQUNBdEosYUFBUztBQUNQSSxZQUFNOUMsTUFBTWlDLGtDQURMO0FBRVBjLFVBQUlGLEtBQUtFLEVBRkY7QUFHUGlKO0FBSE8sS0FBVDtBQUtELEdBWjRCO0FBQUEsQ0FBeEI7O0FBY0EsSUFBTUUsa0RBQXFCLFNBQXJCQSxrQkFBcUIsQ0FBQ3JKLElBQUQsRUFBT00sT0FBUDtBQUFBLFNBQ2hDLFVBQUNULFFBQUQsRUFBV1UsUUFBWCxFQUF3QjtBQUN0QlQsdUJBQU1DLGNBQU4sQ0FBcUJDLElBQXJCO0FBQ0EsUUFBTVMsV0FBV0YsV0FBV0csUUFBWCxDQUFvQkMsR0FBcEIsQ0FBd0JYLEtBQUtFLEVBQTdCLENBQWpCO0FBQ0EsUUFBTTBHLFdBQVduRyxTQUFTRSxHQUFULENBQWEsVUFBYixFQUF5QixxQkFBekIsQ0FBakI7QUFDQSxRQUFJMkksVUFBVSxJQUFkO0FBQ0ExQyxhQUFTcEcsT0FBVCxDQUFpQixVQUFDK0ksV0FBRCxFQUFjcEQsTUFBZCxFQUF5QjtBQUN4QzdGLGNBQVFFLE9BQVIsQ0FBZ0IsVUFBQ3FDLEdBQUQsRUFBUztBQUN2QixZQUFJWixRQUFRc0gsWUFBWTFJLEtBQVosQ0FBa0JnQyxJQUFJakIsWUFBdEIsQ0FBWjtBQUNBLFlBQUlLLFVBQVUwRSxTQUFkLEVBQXlCO0FBQ3ZCMUUsa0JBQVF4QixTQUNMRSxHQURLLENBQ0QsU0FEQyxFQUVMMkQsSUFGSyxDQUVBO0FBQUEsbUJBQVF2RCxLQUFLRixLQUFMLENBQVdiLEtBQUt3RSxTQUFoQixNQUErQjJCLE1BQXZDO0FBQUEsV0FGQSxFQUdMdEYsS0FISyxDQUdDZ0MsSUFBSWpCLFlBSEwsQ0FBUjtBQUlEO0FBQ0QsWUFBTTRILFVBQVVuRCxzQkFDZHJHLElBRGMsRUFFZG1HLE1BRmMsRUFHZHRELElBQUlqQixZQUhVLEVBSWRLLEtBSmMsRUFLZFksSUFBSXlELFVBTFUsRUFNZHpHLFFBTmMsRUFNSlUsUUFOSSxDQUFoQjtBQU9BLFlBQUkrSSxXQUFXLENBQUNFLE9BQWhCLEVBQXlCO0FBQ3ZCRixvQkFBVSxLQUFWO0FBQ0Q7QUFDRixPQWxCRDtBQW1CRCxLQXBCRDtBQXFCQSxXQUFPQSxPQUFQO0FBQ0QsR0E1QitCO0FBQUEsQ0FBM0I7O0FBOEJBLElBQU1HLDBEQUF5QixTQUF6QkEsc0JBQXlCLENBQUN6SixJQUFELEVBQU9NLE9BQVA7QUFBQSxTQUNwQyxVQUFDVCxRQUFELEVBQVdVLFFBQVgsRUFBd0I7QUFDdEJULHVCQUFNQyxjQUFOLENBQXFCQyxJQUFyQjtBQUNBLFFBQU0wSixhQUFhbkosV0FBV0csUUFBWCxDQUFvQkcsS0FBcEIsQ0FBMEIsQ0FBQ2IsS0FBS0UsRUFBTixFQUFVLFlBQVYsQ0FBMUIsRUFBbUQscUJBQW5ELENBQW5CO0FBQ0EsUUFBTTJGLFVBQVUsRUFBaEI7QUFDQTZELGVBQVdsSixPQUFYLENBQW1CLFVBQUNtSixhQUFELEVBQWdCM0IsUUFBaEIsRUFBNkI7QUFDOUMsVUFBSWhILFVBQVUsSUFBZDtBQUNBVixjQUFRRSxPQUFSLENBQWdCLFVBQUNxQyxHQUFELEVBQVM7QUFDdkIsWUFBTVosUUFBUTBILGNBQWM5SSxLQUFkLENBQW9CZ0MsSUFBSWpCLFlBQXhCLENBQWQ7QUFDQSxZQUFJSyxVQUFVMEUsU0FBVixJQUF1QjFFLFVBQVUsRUFBakMsSUFBdUNBLFVBQVUsSUFBckQsRUFBMkQ7QUFDekRqQixvQkFBVSxLQUFWO0FBQ0Q7QUFDRixPQUxEO0FBTUEsVUFBSUEsT0FBSixFQUFhO0FBQ1g2RSxnQkFBUStELElBQVIsQ0FBYTVCLFFBQWI7QUFDRDtBQUNGLEtBWEQ7QUFZQSxRQUFJbkMsUUFBUXVCLE1BQVIsR0FBaUIsQ0FBckIsRUFBd0I7QUFDdEJ4QixxQkFBZTVGLElBQWYsRUFBcUI2RixPQUFyQixFQUE4QmhHLFFBQTlCO0FBQ0Q7QUFDRixHQXBCbUM7QUFBQSxDQUEvQjs7QUFzQkEsSUFBTWdLLG9EQUFzQixTQUF0QkEsbUJBQXNCLENBQUM3SixJQUFELEVBQU9NLE9BQVA7QUFBQSxTQUNqQyxVQUFDVCxRQUFELEVBQVdVLFFBQVgsRUFBd0I7QUFDdEJULHVCQUFNQyxjQUFOLENBQXFCQyxJQUFyQjtBQUNBeUosMkJBQXVCekosSUFBdkIsRUFBNkJNLE9BQTdCLEVBQXNDVCxRQUF0QyxFQUFnRFUsUUFBaEQ7QUFDQSxRQUFNbUosYUFBYW5KLFdBQVdHLFFBQVgsQ0FBb0JHLEtBQXBCLENBQTBCLENBQUNiLEtBQUtFLEVBQU4sRUFBVSxZQUFWLENBQTFCLEVBQW1ELHFCQUFuRCxDQUFuQjtBQUNBLFFBQUlvSixVQUFVLElBQWQ7QUFDQUksZUFBV2xKLE9BQVgsQ0FBbUIsVUFBQ21KLGFBQUQsRUFBZ0IzQixRQUFoQixFQUE2QjtBQUM5QzFILGNBQVFFLE9BQVIsQ0FBZ0IsVUFBQ3FDLEdBQUQsRUFBUztBQUN2QixZQUFNWixRQUFRMEgsY0FBYzlJLEtBQWQsQ0FBb0JnQyxJQUFJakIsWUFBeEIsQ0FBZDtBQUNBLFlBQU00SCxVQUFVdkIsd0JBQ2RqSSxJQURjLEVBRWRnSSxRQUZjLEVBR2RuRixJQUFJakIsWUFIVSxFQUlkSyxLQUpjLEVBS2RZLElBQUl5RCxVQUxVLEVBTWR6RyxRQU5jLEVBTUpVLFFBTkksQ0FBaEI7QUFPQSxZQUFJK0ksV0FBVyxDQUFDRSxPQUFoQixFQUF5QjtBQUN2QkYsb0JBQVUsS0FBVjtBQUNEO0FBQ0YsT0FaRDtBQWFELEtBZEQ7QUFlQSxXQUFPQSxPQUFQO0FBQ0QsR0F0QmdDO0FBQUEsQ0FBNUI7O0FBd0JBLElBQU1RLDREQUEwQixTQUExQkEsdUJBQTBCLENBQUM5SixJQUFELEVBQU9tRyxNQUFQLEVBQWVDLE9BQWYsRUFBd0JuRSxLQUF4QjtBQUFBLFNBQ3JDLFVBQUNwQyxRQUFELEVBQWM7QUFDWkMsdUJBQU1DLGNBQU4sQ0FBcUJDLElBQXJCO0FBQ0FILGFBQVM7QUFDUEksWUFBTTlDLE1BQU1vQyw0Q0FETDtBQUVQVyxVQUFJRixLQUFLRSxFQUZGO0FBR1BpRyxvQkFITztBQUlQQyxzQkFKTztBQUtQbkU7QUFMTyxLQUFUO0FBT0QsR0FWb0M7QUFBQSxDQUFoQzs7QUFZQSxJQUFNOEgsb0NBQWMsU0FBZEEsV0FBYyxDQUFDL0osSUFBRCxFQUFPZSxJQUFQO0FBQUEsTUFBYWlKLFlBQWIsdUVBQTRCLHFCQUE1QjtBQUFBLFNBQ3pCLFVBQUNuSyxRQUFELEVBQWM7QUFDWkMsdUJBQU1DLGNBQU4sQ0FBcUJDLElBQXJCO0FBQ0FILGFBQVM7QUFDUGtCLGdCQURPO0FBRVBpSixnQ0FGTztBQUdQOUosVUFBSUYsS0FBS0UsRUFIRjtBQUlQRCxZQUFNOUMsTUFBTXFDO0FBSkwsS0FBVDtBQU1ELEdBVHdCO0FBQUEsQ0FBcEI7O0FBV0EsSUFBTXlLLDREQUEwQixTQUExQkEsdUJBQTBCO0FBQUEsU0FDckMsVUFBQ3BLLFFBQUQsRUFBYztBQUNaQyx1QkFBTUMsY0FBTixDQUFxQkMsSUFBckI7QUFDQUgsYUFBUztBQUNQSSxZQUFNOUMsTUFBTXNDLDRDQURMO0FBRVBTLFVBQUlGLEtBQUtFO0FBRkYsS0FBVDtBQUlELEdBUG9DO0FBQUEsQ0FBaEM7O0FBU0EsSUFBTWdLLDhEQUEyQixTQUEzQkEsd0JBQTJCO0FBQUEsU0FDdEMsVUFBQ3JLLFFBQUQsRUFBYztBQUNaQyx1QkFBTUMsY0FBTixDQUFxQkMsSUFBckI7QUFDQUgsYUFBUztBQUNQSSxZQUFNOUMsTUFBTXVDLDZDQURMO0FBRVBRLFVBQUlGLEtBQUtFO0FBRkYsS0FBVDtBQUlELEdBUHFDO0FBQUEsQ0FBakM7O0FBU0EsSUFBTWlLLGtEQUFxQixTQUFyQkEsa0JBQXFCLENBQUNuSyxJQUFELEVBQU9vSyxhQUFQLEVBQXNCQyxXQUF0QjtBQUFBLFNBQ2hDLFVBQUN4SyxRQUFELEVBQWM7QUFDWkMsdUJBQU1DLGNBQU4sQ0FBcUJDLElBQXJCO0FBQ0FGLHVCQUFNcUssa0JBQU4sQ0FBeUJuSyxJQUF6QixFQUErQm9LLGFBQS9CLEVBQThDQyxXQUE5QztBQUNBeEssYUFBUztBQUNQSSxZQUFNOUMsTUFBTXdDLHNDQURMO0FBRVBPLFVBQUlGLEtBQUtFLEVBRkY7QUFHUG1LO0FBSE8sS0FBVDtBQUtELEdBVCtCO0FBQUEsQ0FBM0IiLCJmaWxlIjoiZGF0YWdyaWQuYWN0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJbW11dGFibGUsIHsgTWFwIH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCBVdGlscyBmcm9tICcuL2RhdGFncmlkLnV0aWxzJztcblxuZXhwb3J0IGNvbnN0IFRZUEVTID0ge1xuICBQTEFURk9STV9EQVRBR1JJRF9JTlZBTElEQVRFOiAnUExBVEZPUk1fREFUQUdSSURfSU5WQUxJREFURScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0JVU1k6ICdQTEFURk9STV9EQVRBR1JJRF9CVVNZJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVBRFk6ICdQTEFURk9STV9EQVRBR1JJRF9SRUFEWScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NFVF9EQVRBOiAnUExBVEZPUk1fREFUQUdSSURfU0VUX0RBVEEnLFxuICBQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9TT1JUOiAnUExBVEZPUk1fREFUQUdSSURfQVBQTFlfU09SVCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NPUlRfQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfU09SVF9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRVNJWkVfQ09MVU1OOiAnUExBVEZPUk1fREFUQUdSSURfUkVTSVpFX0NPTFVNTicsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0VESVQ6ICdQTEFURk9STV9EQVRBR1JJRF9FRElUJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0FOQ0VMOiAnUExBVEZPUk1fREFUQUdSSURfQ0FOQ0VMJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0FWRTogJ1BMQVRGT1JNX0RBVEFHUklEX1NBVkUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TQVZFX1NVQ0NFU1M6ICdQTEFURk9STV9EQVRBR1JJRF9TQVZFX1NVQ0NFU1MnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TQVZFX1BBUlRJQUxfU1VDQ0VTUzogJ1BMQVRGT1JNX0RBVEFHUklEX1NBVkVfUEFSVElBTF9TVUNDRVNTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0FWRV9GQUlMOiAnUExBVEZPUk1fREFUQUdSSURfU0FWRV9GQUlMJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFOiAnUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQUREX05FV19JVEVNOiAnUExBVEZPUk1fREFUQUdSSURfQUREX05FV19JVEVNJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNOiAnUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNUzogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTVMnLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkU6ICdQTEFURk9STV9EQVRBR1JJRF9SRU1PVkUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfU1VDQ0VTUzogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9TVUNDRVNTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUw6ICdQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfRkFJTCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0VESVRfQ0VMTF9WQUxVRV9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9FRElUX0NFTExfVkFMVUVfQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFUzogJ1BMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NFTExfSElERV9NRVNTQUdFOiAnUExBVEZPUk1fREFUQUdSSURfQ0VMTF9ISURFX01FU1NBR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9TSE9XX01FU1NBR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9TSE9XX01FU1NBR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9ISURFX01FU1NBR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9ISURFX01FU1NBR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9WQUxJREFURTogJ1BMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX1ZBTElEQVRFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TRUxFQ1RJT05fQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TRUxFQ1RJT05fQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9TRUxFQ1RfQUxMX0lURU1TX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NMRUFSX1NFTEVDVEVEX0lURU1TOiAnUExBVEZPUk1fREFUQUdSSURfQ0xFQVJfU0VMRUNURURfSVRFTVMnLFxuICBQTEFURk9STV9EQVRBR1JJRF9UT0dHTEVfRklMVEVSSU5HOiAnUExBVEZPUk1fREFUQUdSSURfVE9HR0xFX0ZJTFRFUklORycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0ZJTFRFUl9EQVRBX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX0ZJTFRFUl9EQVRBX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0FQUExZX0ZJTFRFUlM6ICdQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9GSUxURVJTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfVVBEQVRFX0VYSVNUSU5HX0NFTExfVkFMVUU6ICdQTEFURk9STV9EQVRBR1JJRF9VUERBVEVfRVhJU1RJTkdfQ0VMTF9WQUxVRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NFVF9FRElUX0RBVEE6ICdQTEFURk9STV9EQVRBR1JJRF9TRVRfRURJVF9EQVRBJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX09QRU46ICdQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfT1BFTicsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFOiAnUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX1NBVkUnLFxufTtcblxuZXhwb3J0IGNvbnN0IGludmFsaWRhdGUgPSBncmlkID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0lOVkFMSURBVEUsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHNldEJ1c3kgPSBncmlkID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0JVU1ksXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHNldFJlYWR5ID0gZ3JpZCA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRUFEWSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgYXBwbHlGaWx0ZXJzID0gKGdyaWQsIGNvbHVtbnMpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBpZiAoIWNvbHVtbnMgfHwgIWNvbHVtbnMuZm9yRWFjaCkgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG4gICAgaWYgKCFncmlkRGF0YSkgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IGZpbHRlckRhdGEgPSBncmlkRGF0YS5nZXRJbihbJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2ZpbHRlckRhdGEnXSwgTWFwKCkpO1xuICAgIGNvbnN0IGFsbERhdGEgPSBncmlkRGF0YS5nZXQoJ2FsbERhdGEnKTtcbiAgICBzZXRCdXN5KGdyaWQpKGRpc3BhdGNoKTtcbiAgICBsZXQgZGF0YTtcbiAgICBpZiAoZmlsdGVyRGF0YS5pc0VtcHR5KCkpIHtcbiAgICAgIGRhdGEgPSBhbGxEYXRhO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkYXRlRm9ybWF0ID0gVXRpbHMuZ2V0RGF0ZUZvcm1hdChncmlkLCBnZXRTdGF0ZSgpLnVzZXIpO1xuICAgICAgZGF0YSA9IGFsbERhdGEuZmlsdGVyKChyb3cpID0+IHtcbiAgICAgICAgbGV0IGhpdHMgPSAwO1xuICAgICAgICBmaWx0ZXJEYXRhLmZvckVhY2goKGZpbHRlclZhbHVlLCBmaWx0ZXJDb2x1bW4pID0+IHtcbiAgICAgICAgICBjb2x1bW5zLmZvckVhY2goKGNvbHVtbikgPT4ge1xuICAgICAgICAgICAgaWYgKFV0aWxzLmdldENvbHVtbktleShjb2x1bW4pID09PSBmaWx0ZXJDb2x1bW4pIHtcbiAgICAgICAgICAgICAgY29uc3Qgcm93RGF0YSA9IHJvdy5nZXRJbihjb2x1bW4udmFsdWVLZXlQYXRoKTtcbiAgICAgICAgICAgICAgaWYgKHJvd0RhdGEgfHwgcm93RGF0YSA9PT0gMCB8fCByb3dEYXRhID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlck1hdGNoZXIgPSBVdGlscy5nZXRGaWx0ZXJNYXRjaGVyKGNvbHVtbiwgZGF0ZUZvcm1hdCk7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlck1hdGNoZXIocm93RGF0YSwgZmlsdGVyVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICBoaXRzICs9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gaGl0cyA9PT0gZmlsdGVyRGF0YS5zaXplO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0FQUExZX0ZJTFRFUlMsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGRhdGEsXG4gICAgfSk7XG4gICAgc2V0UmVhZHkoZ3JpZCkoZGlzcGF0Y2gpO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG5leHBvcnQgY29uc3QgZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlID0gKGdyaWQsIGNvbHVtbnMsIGNvbHVtbiwgdmFsdWUpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBjb25zdCBvcmlnRmlsdGVyRGF0YSA9IGdldFN0YXRlKClcbiAgICAgIC5kYXRhZ3JpZFxuICAgICAgLmdldEluKFtncmlkLmlkLCAnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnZmlsdGVyRGF0YSddLCBNYXAoKSk7XG4gICAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbHVtbik7XG4gICAgY29uc3QgdmFsdWVFbXB0eUNoZWNrZXIgPSBVdGlscy5nZXRWYWx1ZUVtcHR5Q2hlY2tlcihjb2x1bW4pO1xuICAgIGxldCBmaWx0ZXJEYXRhO1xuICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWx1ZSkpIHtcbiAgICAgIGZpbHRlckRhdGEgPSBvcmlnRmlsdGVyRGF0YS5kZWxldGUoY29sdW1uS2V5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmlsdGVyRGF0YSA9IG9yaWdGaWx0ZXJEYXRhLnNldChjb2x1bW5LZXksIHZhbHVlKTtcbiAgICB9XG4gICAgVXRpbHMuc2F2ZUZpbHRlckRhdGEoZ3JpZCwgZmlsdGVyRGF0YSk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfRklMVEVSX0RBVEFfQ0hBTkdFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBmaWx0ZXJEYXRhLFxuICAgIH0pO1xuICAgIGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICB9O1xuXG5leHBvcnQgY29uc3QgYXBwbHlTb3J0ID0gKGdyaWQsIGNvbHVtbnMpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBpZiAoIWNvbHVtbnMgfHwgIWNvbHVtbnMuZm9yRWFjaCkgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG4gICAgaWYgKCFncmlkRGF0YSkgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IHNvcnREYXRhID0gZ3JpZERhdGEuZ2V0SW4oWydjb25maWcnLCAnc29ydGluZ0RhdGEnXSk7XG4gICAgaWYgKCFzb3J0RGF0YSkgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IHNvcnRDb2x1bW4gPSBzb3J0RGF0YS5nZXQoJ3NvcnRDb2x1bW4nKTtcbiAgICBpZiAoIXNvcnRDb2x1bW4pIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBzb3J0T3JkZXIgPSBzb3J0RGF0YS5nZXQoJ3NvcnRPcmRlcicsICdhc2MnKTtcbiAgICBsZXQgY29sdW1uO1xuICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICBpZiAoVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCkgPT09IHNvcnRDb2x1bW4pIHtcbiAgICAgICAgY29sdW1uID0gY29sO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICghY29sdW1uKSByZXR1cm4gZmFsc2U7XG5cbiAgICBzZXRCdXN5KGdyaWQpKGRpc3BhdGNoKTtcbiAgICBjb25zdCBvcmlnQWxsRGF0YSA9IGdyaWREYXRhLmdldCgnYWxsRGF0YScpO1xuICAgIGNvbnN0IGNvbXBhcmF0b3IgPSBVdGlscy5nZXRTb3J0Q29tcGFyYXRvcihjb2x1bW4pO1xuICAgIGNvbnN0IHZhbHVlR2V0dGVyID0gVXRpbHMuZ2V0U29ydFZhbHVlR2V0dGVyKGNvbHVtbik7XG4gICAgY29uc3QgdmFsdWVFbXB0eUNoZWNrZXIgPSBVdGlscy5nZXRWYWx1ZUVtcHR5Q2hlY2tlcihjb2x1bW4pO1xuICAgIGNvbnN0IGFsbERhdGEgPSBvcmlnQWxsRGF0YS5zb3J0KChhLCBiKSA9PiB7XG4gICAgICBjb25zdCB2YWxBID0gdmFsdWVHZXR0ZXIoYSk7XG4gICAgICBjb25zdCB2YWxCID0gdmFsdWVHZXR0ZXIoYik7XG4gICAgICBpZiAoc29ydE9yZGVyID09PSAnYXNjJykge1xuICAgICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQSkpIHJldHVybiAtMTtcbiAgICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEIpKSByZXR1cm4gMTtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmF0b3IodmFsQSwgdmFsQik7XG4gICAgICB9XG4gICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQSkpIHJldHVybiAxO1xuICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEIpKSByZXR1cm4gLTE7XG4gICAgICByZXR1cm4gY29tcGFyYXRvcih2YWxCLCB2YWxBKTtcbiAgICB9KTtcbiAgICBsZXQgZGF0YTtcbiAgICAvLyBTb3J0IGFsc28gZmlsdGVyZWQgZGF0YSBzZXBhcmF0ZWx5XG4gICAgaWYgKGdyaWREYXRhLmdldEluKFsnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnaXNGaWx0ZXJpbmcnXSwgZmFsc2UpKSB7XG4gICAgICBkYXRhID0gZ3JpZERhdGEuZ2V0KCdkYXRhJykuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICBjb25zdCB2YWxBID0gdmFsdWVHZXR0ZXIoYSk7XG4gICAgICAgIGNvbnN0IHZhbEIgPSB2YWx1ZUdldHRlcihiKTtcbiAgICAgICAgaWYgKHNvcnRPcmRlciA9PT0gJ2FzYycpIHtcbiAgICAgICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQSkpIHJldHVybiAtMTtcbiAgICAgICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQikpIHJldHVybiAxO1xuICAgICAgICAgIHJldHVybiBjb21wYXJhdG9yKHZhbEEsIHZhbEIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxBKSkgcmV0dXJuIDE7XG4gICAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxCKSkgcmV0dXJuIC0xO1xuICAgICAgICByZXR1cm4gY29tcGFyYXRvcih2YWxCLCB2YWxBKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXRhID0gYWxsRGF0YTtcbiAgICB9XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQVBQTFlfU09SVCxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgZGF0YSxcbiAgICAgIGFsbERhdGEsXG4gICAgfSk7XG4gICAgc2V0UmVhZHkoZ3JpZCkoZGlzcGF0Y2gpO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG5leHBvcnQgY29uc3Qgc29ydENoYW5nZSA9IChncmlkLCBjb2x1bW5zLCBjb2x1bW4sIG5ld1NvcnQpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBjb25zdCBzb3J0T3JkZXIgPSBuZXdTb3J0IHx8ICdhc2MnO1xuICAgIGNvbnN0IHNvcnRDb2x1bW4gPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sdW1uKTtcbiAgICBVdGlscy5zYXZlU29ydERhdGEoZ3JpZCwgeyBzb3J0Q29sdW1uLCBzb3J0T3JkZXIgfSk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU09SVF9DSEFOR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIHNvcnRDb2x1bW4sXG4gICAgICBzb3J0T3JkZXIsXG4gICAgfSk7XG4gICAgYXBwbHlTb3J0KGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBzZXREYXRhID0gKGdyaWQsIGNvbHVtbnMsIGRhdGEpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBVdGlscy5jaGVja0NvbHVtbnNQYXJhbShjb2x1bW5zKTtcbiAgICBjb25zdCBjb25maWdEYXRhID0gVXRpbHMubG9hZEdyaWRDb25maWcoZ3JpZCwgY29sdW1ucyk7XG4gICAgY29uc3QgaW1tdXRhYmxlRGF0YSA9IEltbXV0YWJsZS5JdGVyYWJsZS5pc0l0ZXJhYmxlKGRhdGEpID8gZGF0YSA6IEltbXV0YWJsZS5mcm9tSlMoZGF0YSk7XG4gICAgY29uc3Qgc2VsZWN0ZWRJdGVtcyA9IFV0aWxzLmxvYWRTZWxlY3RlZEl0ZW1zKGdyaWQpLmZpbHRlcihpdGVtID0+IChcbiAgICAgICEhaW1tdXRhYmxlRGF0YS5maW5kKGRhdGFJdGVtID0+IGRhdGFJdGVtLmdldEluKGdyaWQuaWRLZXlQYXRoKSA9PT0gaXRlbSlcbiAgICApKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfREFUQSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgZGF0YTogaW1tdXRhYmxlRGF0YSxcbiAgICAgIGNvbmZpZzogY29uZmlnRGF0YSxcbiAgICAgIHNlbGVjdGVkSXRlbXMsXG4gICAgfSk7XG4gICAgYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gICAgYXBwbHlTb3J0KGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCByZXNpemVDb2x1bW4gPSAoZ3JpZCwgY29sdW1uS2V5LCB3aWR0aCkgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGNvbnN0IGNvbHVtbldpZHRocyA9IGdldFN0YXRlKClcbiAgICAgIC5kYXRhZ3JpZFxuICAgICAgLmdldEluKFtncmlkLmlkLCAnY29uZmlnJywgJ2NvbHVtbldpZHRocyddLCBNYXAoKSlcbiAgICAgIC5zZXQoY29sdW1uS2V5LCB3aWR0aCk7XG4gICAgVXRpbHMuc2F2ZUNvbHVtbldpZHRocyhncmlkLCBjb2x1bW5XaWR0aHMpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFU0laRV9DT0xVTU4sXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGNvbHVtbldpZHRocyxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGVkaXQgPSBncmlkID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0VESVQsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGNhbmNlbCA9IGdyaWQgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0FOQ0VMLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBzYXZlID0gKGdyaWQsIGNiID0gKCkgPT4ge30pID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NBVkUsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICB9KTtcbiAgICBjYigpO1xuICB9O1xuXG5leHBvcnQgY29uc3Qgc2F2ZVN1Y2Nlc3MgPSAoZ3JpZCwgY29sdW1ucywgc2F2ZWRJdGVtcykgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfU1VDQ0VTUyxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgICAgIHNhdmVkSXRlbXMsXG4gICAgfSk7XG4gICAgYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gICAgYXBwbHlTb3J0KGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBzYXZlUGFydGlhbFN1Y2Nlc3MgPSAoZ3JpZCwgY29sdW1ucywgc2F2ZWRJdGVtcykgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfUEFSVElBTF9TVUNDRVNTLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBpZEtleVBhdGg6IGdyaWQuaWRLZXlQYXRoLFxuICAgICAgc2F2ZWRJdGVtcyxcbiAgICB9KTtcbiAgICBhcHBseUZpbHRlcnMoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgICBhcHBseVNvcnQoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHNhdmVGYWlsID0gZ3JpZCA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TQVZFX0ZBSUwsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZSA9IChncmlkLCBjb2x1bW5EZWZhdWx0VmFsdWVzKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEUsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGNvbHVtbkRlZmF1bHRWYWx1ZXMsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBhZGROZXdJdGVtID0gKGdyaWQsIGNvbHVtbkRlZmF1bHRWYWx1ZXMpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0FERF9ORVdfSVRFTSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgY29sdW1uRGVmYXVsdFZhbHVlcyxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZU5ld0l0ZW0gPSAoZ3JpZCwgaW5kZXgpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgaW5kZXgsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVOZXdJdGVtcyA9IChncmlkLCBpbmRleGVzKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU1TLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBpbmRleGVzLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlID0gKGdyaWQsIGNiID0gKCkgPT4ge30pID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgIH0pO1xuICAgIGNiKCk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVTdWNjZXNzID0gKGdyaWQsIHJlbW92ZWRJZHMpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9TVUNDRVNTLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBpZEtleVBhdGg6IGdyaWQuaWRLZXlQYXRoLFxuICAgICAgcmVtb3ZlZElkcyxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZUZhaWwgPSBncmlkID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9GQUlMLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBlZGl0Q2VsbFZhbHVlQ2hhbmdlID0gKGdyaWQsIGRhdGFJZCwga2V5UGF0aCwgdmFsdWUpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0VESVRfQ0VMTF9WQUxVRV9DSEFOR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGRhdGFJZCxcbiAgICAgIGtleVBhdGgsXG4gICAgICB2YWx1ZSxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGVkaXRDZWxsVmFsdWVWYWxpZGF0ZSA9IChcbiAgZ3JpZCxcbiAgZGF0YUlkLFxuICBrZXlQYXRoLFxuICB2YWx1ZSxcbiAgdmFsaWRhdG9ycyA9IFtdLFxuKSA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgbGV0IHZhbGlkYXRpb25TdGF0ZSA9IHsgdmFsaWQ6IHRydWUgfTtcbiAgICB2YWxpZGF0b3JzLmZvckVhY2goKHZhbGlkYXRvcikgPT4ge1xuICAgICAgaWYgKHZhbGlkYXRpb25TdGF0ZS52YWxpZCkge1xuICAgICAgICBpZiAodmFsaWRhdG9yLnVuaXF1ZSkge1xuICAgICAgICAgIGlmICh2YWx1ZSAhPT0gJycgfHwgdmFsdWUgIT09IG51bGwgfHwgdmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gY29tYmluZSByZWFsIGRhdGEgd2l0aCBjdXJyZW50IHVuc2F2ZWQgZWRpdGVkIGRhdGFcbiAgICAgICAgICAgIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG4gICAgICAgICAgICBjb25zdCBlZGl0RGF0YSA9IGdyaWREYXRhLmdldCgnZWRpdERhdGEnKTtcbiAgICAgICAgICAgIGxldCBhbGxEYXRhID0gZ3JpZERhdGEuZ2V0KCdhbGxEYXRhJyk7XG4gICAgICAgICAgICBpZiAoZWRpdERhdGEpIHtcbiAgICAgICAgICAgICAgZWRpdERhdGEuZm9yRWFjaCgoZWRpdERhdGFJdGVtLCBlZGl0RGF0YUl0ZW1JZCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvdW5kSW5kZXggPVxuICAgICAgICAgICAgICAgICAgYWxsRGF0YS5maW5kSW5kZXgoZCA9PiBkLmdldEluKGdyaWQuaWRLZXlQYXRoKSA9PT0gZWRpdERhdGFJdGVtSWQpO1xuICAgICAgICAgICAgICAgIGlmIChmb3VuZEluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgYWxsRGF0YSA9IGFsbERhdGEubWVyZ2VEZWVwSW4oW2ZvdW5kSW5kZXhdLCBlZGl0RGF0YUl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBkZXRlcm1pbmUgdW5pcXVlbmVzc1xuICAgICAgICAgICAgY29uc3QgZmluZGluZyA9IGFsbERhdGEuZmluZCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZ3JpZC5pZEtleVBhdGgubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgLy8gZG9uJ3Qgc2VsZiBjb21wYXJlXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uZ2V0SW4oZ3JpZC5pZEtleVBhdGgpID09PSBkYXRhSWQpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uZ2V0SW4oa2V5UGF0aCkgPT09IHZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoZmluZGluZykge1xuICAgICAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgdmFsaWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdWYWxpZGF0aW9uLlVuaXF1ZScsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHZhbGlkYXRvci52YWxpZGF0ZVdpdGhSb3dEYXRhKSB7XG4gICAgICAgICAgY29uc3QgZ3JpZERhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldChncmlkLmlkKTtcbiAgICAgICAgICBjb25zdCBlZGl0RGF0YSA9IGdyaWREYXRhLmdldEluKFsnZWRpdERhdGEnLCBkYXRhSWRdLCBNYXAoKSk7XG4gICAgICAgICAgbGV0IHJvd0RhdGEgPSBncmlkRGF0YS5nZXQoJ2FsbERhdGEnKS5maW5kKGl0ZW0gPT4gaXRlbS5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGRhdGFJZCk7XG4gICAgICAgICAgaWYgKHJvd0RhdGEpIHtcbiAgICAgICAgICAgIHJvd0RhdGEgPSByb3dEYXRhLm1lcmdlRGVlcChlZGl0RGF0YSk7XG4gICAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB2YWxpZGF0b3IudmFsaWRhdGVXaXRoUm93RGF0YSh2YWx1ZSwgcm93RGF0YSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IHZhbGlkYXRvci5wYXJhbXMgPyBPYmplY3QudmFsdWVzKHZhbGlkYXRvci5wYXJhbXMpIDogW107XG4gICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0gdmFsaWRhdG9yLnZhbGlkYXRlKHZhbHVlLCAuLi5wYXJhbXMpO1xuICAgICAgICAgIGlmICh2YWxpZGF0b3IucGFyYW1zKSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZVZhbHVlcyA9IHZhbGlkYXRvci5wYXJhbXM7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKHZhbGlkYXRpb25TdGF0ZS52YWxpZCkge1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRSxcbiAgICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICAgIG1lc3NhZ2VUeXBlOiAnZXJyb3InLFxuICAgICAgICBkYXRhSWQsXG4gICAgICAgIGtleVBhdGgsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRSxcbiAgICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICAgIG1lc3NhZ2VUeXBlOiAnZXJyb3InLFxuICAgICAgICBkYXRhSWQsXG4gICAgICAgIGtleVBhdGgsXG4gICAgICAgIG1lc3NhZ2VJZDogdmFsaWRhdGlvblN0YXRlLm1lc3NhZ2UsXG4gICAgICAgIG1lc3NhZ2VWYWx1ZXM6IHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlVmFsdWVzLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB2YWxpZGF0aW9uU3RhdGUudmFsaWQ7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVDZWxsVmFsdWVDaGFuZ2UgPSAoZ3JpZCwgcm93SW5kZXgsIGtleVBhdGgsIHZhbHVlKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9DSEFOR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIHJvd0luZGV4LFxuICAgICAga2V5UGF0aCxcbiAgICAgIHZhbHVlLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUgPSAoZ3JpZCwgcm93SW5kZXgsIGtleVBhdGgsIHZhbHVlLCB2YWxpZGF0b3JzID0gW10pID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBsZXQgdmFsaWRhdGlvblN0YXRlID0geyB2YWxpZDogdHJ1ZSB9O1xuICAgIHZhbGlkYXRvcnMuZm9yRWFjaCgodmFsaWRhdG9yKSA9PiB7XG4gICAgICBpZiAodmFsaWRhdGlvblN0YXRlLnZhbGlkKSB7XG4gICAgICAgIGlmICh2YWxpZGF0b3IudW5pcXVlKSB7XG4gICAgICAgICAgaWYgKHZhbHVlICE9PSAnJyB8fCB2YWx1ZSAhPT0gbnVsbCB8fCB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zdCBmaW5kaW5nID0gZ2V0U3RhdGUoKVxuICAgICAgICAgICAgICAuZGF0YWdyaWRcbiAgICAgICAgICAgICAgLmdldEluKFtncmlkLmlkLCAnYWxsRGF0YSddKVxuICAgICAgICAgICAgICAuZmluZChpdGVtID0+IGl0ZW0uZ2V0SW4oa2V5UGF0aCkgPT09IHZhbHVlKTtcbiAgICAgICAgICAgIGlmIChmaW5kaW5nKSB7XG4gICAgICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICB2YWxpZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ1ZhbGlkYXRpb24uVW5pcXVlJyxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnN0IGZpbmQyID0gZ2V0U3RhdGUoKVxuICAgICAgICAgICAgICAgIC5kYXRhZ3JpZFxuICAgICAgICAgICAgICAgIC5nZXRJbihbZ3JpZC5pZCwgJ2NyZWF0ZURhdGEnXSlcbiAgICAgICAgICAgICAgICAuZmluZCgoaXRlbSwgaSkgPT4gaSAhPT0gcm93SW5kZXggJiYgaXRlbS5nZXRJbihrZXlQYXRoKSA9PT0gdmFsdWUpO1xuICAgICAgICAgICAgICBpZiAoZmluZDIpIHtcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgICB2YWxpZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnVmFsaWRhdGlvbi5VbmlxdWUnLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodmFsaWRhdG9yLnZhbGlkYXRlV2l0aFJvd0RhdGEpIHtcbiAgICAgICAgICBjb25zdCByb3dEYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ2NyZWF0ZURhdGEnLCByb3dJbmRleF0pO1xuICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZVdpdGhSb3dEYXRhKHZhbHVlLCByb3dEYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBwYXJhbXMgPSB2YWxpZGF0b3IucGFyYW1zID8gT2JqZWN0LnZhbHVlcyh2YWxpZGF0b3IucGFyYW1zKSA6IFtdO1xuICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZSh2YWx1ZSwgLi4ucGFyYW1zKTtcbiAgICAgICAgICBpZiAodmFsaWRhdG9yLnBhcmFtcykge1xuICAgICAgICAgICAgdmFsaWRhdGlvblN0YXRlLm1lc3NhZ2VWYWx1ZXMgPSB2YWxpZGF0b3IucGFyYW1zO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICh2YWxpZGF0aW9uU3RhdGUudmFsaWQpIHtcbiAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfSElERV9NRVNTQUdFLFxuICAgICAgICBpZDogZ3JpZC5pZCxcbiAgICAgICAgbWVzc2FnZVR5cGU6ICdlcnJvcicsXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICBrZXlQYXRoLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfU0hPV19NRVNTQUdFLFxuICAgICAgICBpZDogZ3JpZC5pZCxcbiAgICAgICAgbWVzc2FnZVR5cGU6ICdlcnJvcicsXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICBrZXlQYXRoLFxuICAgICAgICBtZXNzYWdlSWQ6IHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlLFxuICAgICAgICBtZXNzYWdlVmFsdWVzOiB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZVZhbHVlcyxcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdmFsaWRhdGlvblN0YXRlLnZhbGlkO1xuICB9O1xuXG5leHBvcnQgY29uc3QgY2VsbFNob3dNZXNzYWdlID0gKGdyaWQsIG1lc3NhZ2VUeXBlLCBkYXRhSWQsIGtleVBhdGgsIG1lc3NhZ2VJZCwgbWVzc2FnZVZhbHVlcykgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIG1lc3NhZ2VUeXBlLFxuICAgICAgZGF0YUlkLFxuICAgICAga2V5UGF0aCxcbiAgICAgIG1lc3NhZ2VJZCxcbiAgICAgIG1lc3NhZ2VWYWx1ZXMsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBjZWxsU2hvd01lc3NhZ2VzID0gKGdyaWQsIG1lc3NhZ2VzKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRVMsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIG1lc3NhZ2VzLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgY2VsbEhpZGVNZXNzYWdlID0gKGdyaWQsIG1lc3NhZ2VUeXBlID0gbnVsbCwgZGF0YUlkID0gbnVsbCwga2V5UGF0aCA9IG51bGwpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfSElERV9NRVNTQUdFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBtZXNzYWdlVHlwZSxcbiAgICAgIGRhdGFJZCxcbiAgICAgIGtleVBhdGgsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVDZWxsU2hvd01lc3NhZ2UgPSAoXG4gIGdyaWQsXG4gIG1lc3NhZ2VUeXBlLFxuICByb3dJbmRleCxcbiAga2V5UGF0aCxcbiAgbWVzc2FnZUlkLFxuICBtZXNzYWdlVmFsdWVzLFxuKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9TSE9XX01FU1NBR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIG1lc3NhZ2VUeXBlLFxuICAgICAgcm93SW5kZXgsXG4gICAgICBrZXlQYXRoLFxuICAgICAgbWVzc2FnZUlkLFxuICAgICAgbWVzc2FnZVZhbHVlcyxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNlbGxIaWRlTWVzc2FnZSA9IChncmlkLCBtZXNzYWdlVHlwZSA9IG51bGwsIHJvd0luZGV4ID0gbnVsbCwga2V5UGF0aCA9IG51bGwpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX0hJREVfTUVTU0FHRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgbWVzc2FnZVR5cGUsXG4gICAgICByb3dJbmRleCxcbiAgICAgIGtleVBhdGgsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBjZWxsU2VsZWN0aW9uQ2hhbmdlID0gKGdyaWQsIHNlbGVjdGVkQ2VsbCA9IG51bGwpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHNlbGVjdGVkQ2VsbCxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TRUxFQ1RJT05fQ0hBTkdFLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgaXRlbVNlbGVjdGlvbkNoYW5nZSA9IChcbiAgZ3JpZCxcbiAgcm93SW5kZXgsXG4gIGN0cmxQcmVzc2VkID0gZmFsc2UsXG4gIHNoaWZ0UHJlc3NlZCA9IGZhbHNlLFxuKSA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICByb3dJbmRleCxcbiAgICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgICBjdHJsUHJlc3NlZCxcbiAgICAgIHNoaWZ0UHJlc3NlZCxcbiAgICB9KTtcbiAgICBVdGlscy5zYXZlU2VsZWN0ZWRJdGVtcyhncmlkLCBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnc2VsZWN0ZWRJdGVtcyddKSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBzZWxlY3RBbGxJdGVtc0NoYW5nZSA9IGdyaWQgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NFTEVDVF9BTExfSVRFTVNfQ0hBTkdFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBpZEtleVBhdGg6IGdyaWQuaWRLZXlQYXRoLFxuICAgIH0pO1xuICAgIFV0aWxzLnNhdmVTZWxlY3RlZEl0ZW1zKGdyaWQsIGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdzZWxlY3RlZEl0ZW1zJ10pKTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGNsZWFyU2VsZWN0ZWRJdGVtcyA9IGdyaWQgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NMRUFSX1NFTEVDVEVEX0lURU1TLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgfSk7XG4gICAgVXRpbHMuc2F2ZVNlbGVjdGVkSXRlbXMoZ3JpZCwgZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ3NlbGVjdGVkSXRlbXMnXSkpO1xuICB9O1xuXG5leHBvcnQgY29uc3QgdG9nZ2xlRmlsdGVyaW5nID0gZ3JpZCA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgY29uc3QgaXNGaWx0ZXJpbmcgPSAhZ2V0U3RhdGUoKVxuICAgICAgLmRhdGFncmlkXG4gICAgICAuZ2V0SW4oW2dyaWQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdpc0ZpbHRlcmluZyddLCBmYWxzZSk7XG4gICAgVXRpbHMuc2F2ZUlzRmlsdGVyaW5nKGdyaWQsIGlzRmlsdGVyaW5nKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9UT0dHTEVfRklMVEVSSU5HLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBpc0ZpbHRlcmluZyxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHZhbGlkYXRlRWRpdGVkUm93cyA9IChncmlkLCBjb2x1bW5zKSA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgY29uc3QgZ3JpZERhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldChncmlkLmlkKTtcbiAgICBjb25zdCBlZGl0RGF0YSA9IGdyaWREYXRhLmdldCgnZWRpdERhdGEnLCBNYXAoKSk7XG4gICAgbGV0IGFsbEdvb2QgPSB0cnVlO1xuICAgIGVkaXREYXRhLmZvckVhY2goKGVkaXREYXRhUm93LCBkYXRhSWQpID0+IHtcbiAgICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICAgIGxldCB2YWx1ZSA9IGVkaXREYXRhUm93LmdldEluKGNvbC52YWx1ZUtleVBhdGgpO1xuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHZhbHVlID0gZ3JpZERhdGFcbiAgICAgICAgICAgIC5nZXQoJ2FsbERhdGEnKVxuICAgICAgICAgICAgLmZpbmQoZGF0YSA9PiBkYXRhLmdldEluKGdyaWQuaWRLZXlQYXRoKSA9PT0gZGF0YUlkKVxuICAgICAgICAgICAgLmdldEluKGNvbC52YWx1ZUtleVBhdGgpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGlzVmFsaWQgPSBlZGl0Q2VsbFZhbHVlVmFsaWRhdGUoXG4gICAgICAgICAgZ3JpZCxcbiAgICAgICAgICBkYXRhSWQsXG4gICAgICAgICAgY29sLnZhbHVlS2V5UGF0aCxcbiAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICBjb2wudmFsaWRhdG9ycyxcbiAgICAgICAgKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICAgICAgICBpZiAoYWxsR29vZCAmJiAhaXNWYWxpZCkge1xuICAgICAgICAgIGFsbEdvb2QgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGFsbEdvb2Q7XG4gIH07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVFbXB0eUNyZWF0ZWRSb3dzID0gKGdyaWQsIGNvbHVtbnMpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBjb25zdCBjcmVhdGVEYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ2NyZWF0ZURhdGEnXSwgTWFwKCkpO1xuICAgIGNvbnN0IGluZGV4ZXMgPSBbXTtcbiAgICBjcmVhdGVEYXRhLmZvckVhY2goKGNyZWF0ZURhdGFSb3csIHJvd0luZGV4KSA9PiB7XG4gICAgICBsZXQgaXNFbXB0eSA9IHRydWU7XG4gICAgICBjb2x1bW5zLmZvckVhY2goKGNvbCkgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGNyZWF0ZURhdGFSb3cuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSAnJyAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgIGlzRW1wdHkgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAoaXNFbXB0eSkge1xuICAgICAgICBpbmRleGVzLnB1c2gocm93SW5kZXgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChpbmRleGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJlbW92ZU5ld0l0ZW1zKGdyaWQsIGluZGV4ZXMpKGRpc3BhdGNoKTtcbiAgICB9XG4gIH07XG5cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUNyZWF0ZWRSb3dzID0gKGdyaWQsIGNvbHVtbnMpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICByZW1vdmVFbXB0eUNyZWF0ZWRSb3dzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gICAgY29uc3QgY3JlYXRlRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdjcmVhdGVEYXRhJ10sIE1hcCgpKTtcbiAgICBsZXQgYWxsR29vZCA9IHRydWU7XG4gICAgY3JlYXRlRGF0YS5mb3JFYWNoKChjcmVhdGVEYXRhUm93LCByb3dJbmRleCkgPT4ge1xuICAgICAgY29sdW1ucy5mb3JFYWNoKChjb2wpID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBjcmVhdGVEYXRhUm93LmdldEluKGNvbC52YWx1ZUtleVBhdGgpO1xuICAgICAgICBjb25zdCBpc1ZhbGlkID0gY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUoXG4gICAgICAgICAgZ3JpZCxcbiAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICBjb2wudmFsdWVLZXlQYXRoLFxuICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgIGNvbC52YWxpZGF0b3JzLFxuICAgICAgICApKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gICAgICAgIGlmIChhbGxHb29kICYmICFpc1ZhbGlkKSB7XG4gICAgICAgICAgYWxsR29vZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gYWxsR29vZDtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZUV4aXN0aW5nQ2VsbFZhbHVlID0gKGdyaWQsIGRhdGFJZCwga2V5UGF0aCwgdmFsdWUpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1VQREFURV9FWElTVElOR19DRUxMX1ZBTFVFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBkYXRhSWQsXG4gICAgICBrZXlQYXRoLFxuICAgICAgdmFsdWUsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBzZXRFZGl0RGF0YSA9IChncmlkLCBkYXRhLCBjZWxsTWVzc2FnZXMgPSBNYXAoKSkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgZGF0YSxcbiAgICAgIGNlbGxNZXNzYWdlcyxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX0VESVRfREFUQSxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IG9wZW5Db2x1bW5TZXR0aW5nc01vZGFsID0gZ3JpZCA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfT1BFTixcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsID0gZ3JpZCA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfQ0xPU0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHNhdmVDb2x1bW5TZXR0aW5ncyA9IChncmlkLCBoaWRkZW5Db2x1bW5zLCBjb2x1bW5PcmRlcikgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgVXRpbHMuc2F2ZUNvbHVtblNldHRpbmdzKGdyaWQsIGhpZGRlbkNvbHVtbnMsIGNvbHVtbk9yZGVyKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfU0FWRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgY29sdW1uT3JkZXIsXG4gICAgfSk7XG4gIH07XG5cbiJdfQ==