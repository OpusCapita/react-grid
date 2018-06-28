'use strict';

exports.__esModule = true;
exports.saveColumnSettings = exports.closeColumnSettingsModal = exports.openColumnSettingsModal = exports.setEditData = exports.updateExistingCellValue = exports.validateCreatedRows = exports.removeEmptyCreatedRows = exports.validateEditedRows = exports.toggleFiltering = exports.clearSelectedItems = exports.selectAllItemsChange = exports.itemSelectionChange = exports.cellSelectionChange = exports.createCellHideMessage = exports.createCellShowMessage = exports.cellHideMessage = exports.cellShowMessages = exports.cellShowMessage = exports.createCellValueValidate = exports.createCellValueChange = exports.editCellValueValidate = exports.editCellValueChange = exports.removeFail = exports.removeSuccess = exports.remove = exports.removeNewItems = exports.removeNewItem = exports.addNewItem = exports.create = exports.saveFail = exports.savePartialSuccess = exports.saveSuccess = exports.save = exports.cancel = exports.edit = exports.resizeColumn = exports.extendData = exports.setData = exports.sortChange = exports.applySort = exports.filterCellValueChange = exports.applyFilters = exports.setReady = exports.setBusy = exports.invalidate = exports.TYPES = undefined;

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

var extendData = exports.extendData = function extendData(grid, columns, data) {
  return function (dispatch, getState) {
    _datagrid2.default.checkGridParam(grid);
    var immutableData = _immutable2.default.Iterable.isIterable(data) ? data : _immutable2.default.fromJS(data);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_EXTEND_DATA,
      id: grid.id,
      data: immutableData
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5hY3Rpb25zLmpzIl0sIm5hbWVzIjpbIlRZUEVTIiwiUExBVEZPUk1fREFUQUdSSURfSU5WQUxJREFURSIsIlBMQVRGT1JNX0RBVEFHUklEX0JVU1kiLCJQTEFURk9STV9EQVRBR1JJRF9SRUFEWSIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9EQVRBIiwiUExBVEZPUk1fREFUQUdSSURfQVBQTFlfU09SVCIsIlBMQVRGT1JNX0RBVEFHUklEX1NPUlRfQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfUkVTSVpFX0NPTFVNTiIsIlBMQVRGT1JNX0RBVEFHUklEX0VESVQiLCJQTEFURk9STV9EQVRBR1JJRF9DQU5DRUwiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFIiwiUExBVEZPUk1fREFUQUdSSURfRVhURU5EX0RBVEEiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFX1NVQ0NFU1MiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFX1BBUlRJQUxfU1VDQ0VTUyIsIlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfRkFJTCIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURSIsIlBMQVRGT1JNX0RBVEFHUklEX0FERF9ORVdfSVRFTSIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTSIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTVMiLCJQTEFURk9STV9EQVRBR1JJRF9SRU1PVkUiLCJQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfU1VDQ0VTUyIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9GQUlMIiwiUExBVEZPUk1fREFUQUdSSURfRURJVF9DRUxMX1ZBTFVFX0NIQU5HRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFIiwiUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0VTIiwiUExBVEZPUk1fREFUQUdSSURfQ0VMTF9ISURFX01FU1NBR0UiLCJQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9TSE9XX01FU1NBR0UiLCJQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9ISURFX01FU1NBR0UiLCJQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9WQUxJREFURSIsIlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0VMRUNUSU9OX0NIQU5HRSIsIlBMQVRGT1JNX0RBVEFHUklEX0lURU1fU0VMRUNUSU9OX0NIQU5HRSIsIlBMQVRGT1JNX0RBVEFHUklEX1NFTEVDVF9BTExfSVRFTVNfQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfQ0xFQVJfU0VMRUNURURfSVRFTVMiLCJQTEFURk9STV9EQVRBR1JJRF9UT0dHTEVfRklMVEVSSU5HIiwiUExBVEZPUk1fREFUQUdSSURfRklMVEVSX0RBVEFfQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfQVBQTFlfRklMVEVSUyIsIlBMQVRGT1JNX0RBVEFHUklEX1VQREFURV9FWElTVElOR19DRUxMX1ZBTFVFIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX0VESVRfREFUQSIsIlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9PUEVOIiwiUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX0NMT1NFIiwiUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX1NBVkUiLCJpbnZhbGlkYXRlIiwiZGlzcGF0Y2giLCJVdGlscyIsImNoZWNrR3JpZFBhcmFtIiwiZ3JpZCIsInR5cGUiLCJpZCIsInNldEJ1c3kiLCJzZXRSZWFkeSIsImFwcGx5RmlsdGVycyIsImNvbHVtbnMiLCJnZXRTdGF0ZSIsImZvckVhY2giLCJncmlkRGF0YSIsImRhdGFncmlkIiwiZ2V0IiwiZmlsdGVyRGF0YSIsImdldEluIiwiYWxsRGF0YSIsImRhdGEiLCJpc0VtcHR5IiwiZGF0ZUZvcm1hdCIsImdldERhdGVGb3JtYXQiLCJ1c2VyIiwiZmlsdGVyIiwicm93IiwiaGl0cyIsImZpbHRlclZhbHVlIiwiZmlsdGVyQ29sdW1uIiwiY29sdW1uIiwiZ2V0Q29sdW1uS2V5Iiwicm93RGF0YSIsInZhbHVlS2V5UGF0aCIsImZpbHRlck1hdGNoZXIiLCJnZXRGaWx0ZXJNYXRjaGVyIiwic2l6ZSIsImZpbHRlckNlbGxWYWx1ZUNoYW5nZSIsInZhbHVlIiwib3JpZ0ZpbHRlckRhdGEiLCJjb2x1bW5LZXkiLCJ2YWx1ZUVtcHR5Q2hlY2tlciIsImdldFZhbHVlRW1wdHlDaGVja2VyIiwiZGVsZXRlIiwic2V0Iiwic2F2ZUZpbHRlckRhdGEiLCJhcHBseVNvcnQiLCJzb3J0RGF0YSIsInNvcnRDb2x1bW4iLCJzb3J0T3JkZXIiLCJjb2wiLCJvcmlnQWxsRGF0YSIsImNvbXBhcmF0b3IiLCJnZXRTb3J0Q29tcGFyYXRvciIsInZhbHVlR2V0dGVyIiwiZ2V0U29ydFZhbHVlR2V0dGVyIiwic29ydCIsImEiLCJiIiwidmFsQSIsInZhbEIiLCJzb3J0Q2hhbmdlIiwibmV3U29ydCIsInNhdmVTb3J0RGF0YSIsInNldERhdGEiLCJjaGVja0NvbHVtbnNQYXJhbSIsImNvbmZpZ0RhdGEiLCJsb2FkR3JpZENvbmZpZyIsImltbXV0YWJsZURhdGEiLCJJbW11dGFibGUiLCJJdGVyYWJsZSIsImlzSXRlcmFibGUiLCJmcm9tSlMiLCJzZWxlY3RlZEl0ZW1zIiwibG9hZFNlbGVjdGVkSXRlbXMiLCJmaW5kIiwiZGF0YUl0ZW0iLCJpZEtleVBhdGgiLCJpdGVtIiwiY29uZmlnIiwiZXh0ZW5kRGF0YSIsInJlc2l6ZUNvbHVtbiIsIndpZHRoIiwiY29sdW1uV2lkdGhzIiwic2F2ZUNvbHVtbldpZHRocyIsImVkaXQiLCJjYW5jZWwiLCJzYXZlIiwiY2IiLCJzYXZlU3VjY2VzcyIsInNhdmVkSXRlbXMiLCJzYXZlUGFydGlhbFN1Y2Nlc3MiLCJzYXZlRmFpbCIsImNyZWF0ZSIsImNvbHVtbkRlZmF1bHRWYWx1ZXMiLCJhZGROZXdJdGVtIiwicmVtb3ZlTmV3SXRlbSIsImluZGV4IiwicmVtb3ZlTmV3SXRlbXMiLCJpbmRleGVzIiwicmVtb3ZlIiwicmVtb3ZlU3VjY2VzcyIsInJlbW92ZWRJZHMiLCJyZW1vdmVGYWlsIiwiZWRpdENlbGxWYWx1ZUNoYW5nZSIsImRhdGFJZCIsImtleVBhdGgiLCJlZGl0Q2VsbFZhbHVlVmFsaWRhdGUiLCJ2YWxpZGF0b3JzIiwidmFsaWRhdGlvblN0YXRlIiwidmFsaWQiLCJ2YWxpZGF0b3IiLCJ1bmlxdWUiLCJ1bmRlZmluZWQiLCJlZGl0RGF0YSIsImVkaXREYXRhSXRlbSIsImVkaXREYXRhSXRlbUlkIiwiZm91bmRJbmRleCIsImZpbmRJbmRleCIsImQiLCJtZXJnZURlZXBJbiIsImZpbmRpbmciLCJsZW5ndGgiLCJtZXNzYWdlIiwidmFsaWRhdGVXaXRoUm93RGF0YSIsIm1lcmdlRGVlcCIsInBhcmFtcyIsIk9iamVjdCIsInZhbHVlcyIsInZhbGlkYXRlIiwibWVzc2FnZVZhbHVlcyIsIm1lc3NhZ2VUeXBlIiwibWVzc2FnZUlkIiwiY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlIiwicm93SW5kZXgiLCJjcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZSIsImZpbmQyIiwiaSIsImNlbGxTaG93TWVzc2FnZSIsImNlbGxTaG93TWVzc2FnZXMiLCJtZXNzYWdlcyIsImNlbGxIaWRlTWVzc2FnZSIsImNyZWF0ZUNlbGxTaG93TWVzc2FnZSIsImNyZWF0ZUNlbGxIaWRlTWVzc2FnZSIsImNlbGxTZWxlY3Rpb25DaGFuZ2UiLCJzZWxlY3RlZENlbGwiLCJpdGVtU2VsZWN0aW9uQ2hhbmdlIiwiY3RybFByZXNzZWQiLCJzaGlmdFByZXNzZWQiLCJzYXZlU2VsZWN0ZWRJdGVtcyIsInNlbGVjdEFsbEl0ZW1zQ2hhbmdlIiwiY2xlYXJTZWxlY3RlZEl0ZW1zIiwidG9nZ2xlRmlsdGVyaW5nIiwiaXNGaWx0ZXJpbmciLCJzYXZlSXNGaWx0ZXJpbmciLCJ2YWxpZGF0ZUVkaXRlZFJvd3MiLCJhbGxHb29kIiwiZWRpdERhdGFSb3ciLCJpc1ZhbGlkIiwicmVtb3ZlRW1wdHlDcmVhdGVkUm93cyIsImNyZWF0ZURhdGEiLCJjcmVhdGVEYXRhUm93IiwicHVzaCIsInZhbGlkYXRlQ3JlYXRlZFJvd3MiLCJ1cGRhdGVFeGlzdGluZ0NlbGxWYWx1ZSIsInNldEVkaXREYXRhIiwiY2VsbE1lc3NhZ2VzIiwib3BlbkNvbHVtblNldHRpbmdzTW9kYWwiLCJjbG9zZUNvbHVtblNldHRpbmdzTW9kYWwiLCJzYXZlQ29sdW1uU2V0dGluZ3MiLCJoaWRkZW5Db2x1bW5zIiwiY29sdW1uT3JkZXIiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0FBRU8sSUFBTUEsd0JBQVE7QUFDbkJDLGdDQUE4Qiw4QkFEWDtBQUVuQkMsMEJBQXdCLHdCQUZMO0FBR25CQywyQkFBeUIseUJBSE47QUFJbkJDLDhCQUE0Qiw0QkFKVDtBQUtuQkMsZ0NBQThCLDhCQUxYO0FBTW5CQyxpQ0FBK0IsK0JBTlo7QUFPbkJDLG1DQUFpQyxpQ0FQZDtBQVFuQkMsMEJBQXdCLHdCQVJMO0FBU25CQyw0QkFBMEIsMEJBVFA7QUFVbkJDLDBCQUF3Qix3QkFWTDtBQVduQkMsaUNBQStCLCtCQVhaO0FBWW5CQyxrQ0FBZ0MsZ0NBWmI7QUFhbkJDLDBDQUF3Qyx3Q0FickI7QUFjbkJDLCtCQUE2Qiw2QkFkVjtBQWVuQkMsNEJBQTBCLDBCQWZQO0FBZ0JuQkMsa0NBQWdDLGdDQWhCYjtBQWlCbkJDLHFDQUFtQyxtQ0FqQmhCO0FBa0JuQkMsc0NBQW9DLG9DQWxCakI7QUFtQm5CQyw0QkFBMEIsMEJBbkJQO0FBb0JuQkMsb0NBQWtDLGtDQXBCZjtBQXFCbkJDLGlDQUErQiwrQkFyQlo7QUFzQm5CQyw0Q0FBMEMsMENBdEJ2QjtBQXVCbkJDLHVDQUFxQyxxQ0F2QmxCO0FBd0JuQkMsd0NBQXNDLHNDQXhCbkI7QUF5Qm5CQyx1Q0FBcUMscUNBekJsQjtBQTBCbkJDLDhDQUE0Qyw0Q0ExQnpCO0FBMkJuQkMsOENBQTRDLDRDQTNCekI7QUE0Qm5CQyw4Q0FBNEMsNENB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SE8sS0FBVDtBQUtELEdBVCtCO0FBQUEsQ0FBM0IiLCJmaWxlIjoiZGF0YWdyaWQuYWN0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJbW11dGFibGUsIHsgTWFwIH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCBVdGlscyBmcm9tICcuL2RhdGFncmlkLnV0aWxzJztcblxuZXhwb3J0IGNvbnN0IFRZUEVTID0ge1xuICBQTEFURk9STV9EQVRBR1JJRF9JTlZBTElEQVRFOiAnUExBVEZPUk1fREFUQUdSSURfSU5WQUxJREFURScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0JVU1k6ICdQTEFURk9STV9EQVRBR1JJRF9CVVNZJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVBRFk6ICdQTEFURk9STV9EQVRBR1JJRF9SRUFEWScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NFVF9EQVRBOiAnUExBVEZPUk1fREFUQUdSSURfU0VUX0RBVEEnLFxuICBQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9TT1JUOiAnUExBVEZPUk1fREFUQUdSSURfQVBQTFlfU09SVCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NPUlRfQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfU09SVF9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRVNJWkVfQ09MVU1OOiAnUExBVEZPUk1fREFUQUdSSURfUkVTSVpFX0NPTFVNTicsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0VESVQ6ICdQTEFURk9STV9EQVRBR1JJRF9FRElUJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0FOQ0VMOiAnUExBVEZPUk1fREFUQUdSSURfQ0FOQ0VMJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0FWRTogJ1BMQVRGT1JNX0RBVEFHUklEX1NBVkUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9FWFRFTkRfREFUQTogJ1BMQVRGT1JNX0RBVEFHUklEX0VYVEVORF9EQVRBJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0FWRV9TVUNDRVNTOiAnUExBVEZPUk1fREFUQUdSSURfU0FWRV9TVUNDRVNTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0FWRV9QQVJUSUFMX1NVQ0NFU1M6ICdQTEFURk9STV9EQVRBR1JJRF9TQVZFX1BBUlRJQUxfU1VDQ0VTUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NBVkVfRkFJTDogJ1BMQVRGT1JNX0RBVEFHUklEX1NBVkVfRkFJTCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NSRUFURTogJ1BMQVRGT1JNX0RBVEFHUklEX0NSRUFURScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0FERF9ORVdfSVRFTTogJ1BMQVRGT1JNX0RBVEFHUklEX0FERF9ORVdfSVRFTScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTTogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTVM6ICdQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU1TJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFOiAnUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX1NVQ0NFU1M6ICdQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfU1VDQ0VTUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9GQUlMOiAnUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUwnLFxuICBQTEFURk9STV9EQVRBR1JJRF9FRElUX0NFTExfVkFMVUVfQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfRURJVF9DRUxMX1ZBTFVFX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFOiAnUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRVM6ICdQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRVMnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NFTExfSElERV9NRVNTQUdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfU0hPV19NRVNTQUdFOiAnUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfU0hPV19NRVNTQUdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfSElERV9NRVNTQUdFOiAnUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfSElERV9NRVNTQUdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfVkFMSURBVEU6ICdQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9WQUxJREFURScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0VMRUNUSU9OX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NFTExfU0VMRUNUSU9OX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0lURU1fU0VMRUNUSU9OX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX0lURU1fU0VMRUNUSU9OX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NFTEVDVF9BTExfSVRFTVNfQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DTEVBUl9TRUxFQ1RFRF9JVEVNUzogJ1BMQVRGT1JNX0RBVEFHUklEX0NMRUFSX1NFTEVDVEVEX0lURU1TJyxcbiAgUExBVEZPUk1fREFUQUdSSURfVE9HR0xFX0ZJTFRFUklORzogJ1BMQVRGT1JNX0RBVEFHUklEX1RPR0dMRV9GSUxURVJJTkcnLFxuICBQTEFURk9STV9EQVRBR1JJRF9GSUxURVJfREFUQV9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9GSUxURVJfREFUQV9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9GSUxURVJTOiAnUExBVEZPUk1fREFUQUdSSURfQVBQTFlfRklMVEVSUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1VQREFURV9FWElTVElOR19DRUxMX1ZBTFVFOiAnUExBVEZPUk1fREFUQUdSSURfVVBEQVRFX0VYSVNUSU5HX0NFTExfVkFMVUUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRVRfRURJVF9EQVRBOiAnUExBVEZPUk1fREFUQUdSSURfU0VUX0VESVRfREFUQScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9PUEVOOiAnUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX09QRU4nLFxuICBQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfQ0xPU0U6ICdQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfQ0xPU0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfU0FWRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFJyxcbn07XG5cbmV4cG9ydCBjb25zdCBpbnZhbGlkYXRlID0gZ3JpZCA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9JTlZBTElEQVRFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBzZXRCdXN5ID0gZ3JpZCA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9CVVNZLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBzZXRSZWFkeSA9IGdyaWQgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVBRFksXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGFwcGx5RmlsdGVycyA9IChncmlkLCBjb2x1bW5zKSA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgaWYgKCFjb2x1bW5zIHx8ICFjb2x1bW5zLmZvckVhY2gpIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBncmlkRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0KGdyaWQuaWQpO1xuICAgIGlmICghZ3JpZERhdGEpIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBmaWx0ZXJEYXRhID0gZ3JpZERhdGEuZ2V0SW4oWydjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdmaWx0ZXJEYXRhJ10sIE1hcCgpKTtcbiAgICBjb25zdCBhbGxEYXRhID0gZ3JpZERhdGEuZ2V0KCdhbGxEYXRhJyk7XG4gICAgc2V0QnVzeShncmlkKShkaXNwYXRjaCk7XG4gICAgbGV0IGRhdGE7XG4gICAgaWYgKGZpbHRlckRhdGEuaXNFbXB0eSgpKSB7XG4gICAgICBkYXRhID0gYWxsRGF0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGF0ZUZvcm1hdCA9IFV0aWxzLmdldERhdGVGb3JtYXQoZ3JpZCwgZ2V0U3RhdGUoKS51c2VyKTtcbiAgICAgIGRhdGEgPSBhbGxEYXRhLmZpbHRlcigocm93KSA9PiB7XG4gICAgICAgIGxldCBoaXRzID0gMDtcbiAgICAgICAgZmlsdGVyRGF0YS5mb3JFYWNoKChmaWx0ZXJWYWx1ZSwgZmlsdGVyQ29sdW1uKSA9PiB7XG4gICAgICAgICAgY29sdW1ucy5mb3JFYWNoKChjb2x1bW4pID0+IHtcbiAgICAgICAgICAgIGlmIChVdGlscy5nZXRDb2x1bW5LZXkoY29sdW1uKSA9PT0gZmlsdGVyQ29sdW1uKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHJvd0RhdGEgPSByb3cuZ2V0SW4oY29sdW1uLnZhbHVlS2V5UGF0aCk7XG4gICAgICAgICAgICAgIGlmIChyb3dEYXRhIHx8IHJvd0RhdGEgPT09IDAgfHwgcm93RGF0YSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJNYXRjaGVyID0gVXRpbHMuZ2V0RmlsdGVyTWF0Y2hlcihjb2x1bW4sIGRhdGVGb3JtYXQpO1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJNYXRjaGVyKHJvd0RhdGEsIGZpbHRlclZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgaGl0cyArPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGhpdHMgPT09IGZpbHRlckRhdGEuc2l6ZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9BUFBMWV9GSUxURVJTLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBkYXRhLFxuICAgIH0pO1xuICAgIHNldFJlYWR5KGdyaWQpKGRpc3BhdGNoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGZpbHRlckNlbGxWYWx1ZUNoYW5nZSA9IChncmlkLCBjb2x1bW5zLCBjb2x1bW4sIHZhbHVlKSA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgY29uc3Qgb3JpZ0ZpbHRlckRhdGEgPSBnZXRTdGF0ZSgpXG4gICAgICAuZGF0YWdyaWRcbiAgICAgIC5nZXRJbihbZ3JpZC5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2ZpbHRlckRhdGEnXSwgTWFwKCkpO1xuICAgIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2x1bW4pO1xuICAgIGNvbnN0IHZhbHVlRW1wdHlDaGVja2VyID0gVXRpbHMuZ2V0VmFsdWVFbXB0eUNoZWNrZXIoY29sdW1uKTtcbiAgICBsZXQgZmlsdGVyRGF0YTtcbiAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsdWUpKSB7XG4gICAgICBmaWx0ZXJEYXRhID0gb3JpZ0ZpbHRlckRhdGEuZGVsZXRlKGNvbHVtbktleSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpbHRlckRhdGEgPSBvcmlnRmlsdGVyRGF0YS5zZXQoY29sdW1uS2V5LCB2YWx1ZSk7XG4gICAgfVxuICAgIFV0aWxzLnNhdmVGaWx0ZXJEYXRhKGdyaWQsIGZpbHRlckRhdGEpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0ZJTFRFUl9EQVRBX0NIQU5HRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgZmlsdGVyRGF0YSxcbiAgICB9KTtcbiAgICBhcHBseUZpbHRlcnMoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGFwcGx5U29ydCA9IChncmlkLCBjb2x1bW5zKSA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgaWYgKCFjb2x1bW5zIHx8ICFjb2x1bW5zLmZvckVhY2gpIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBncmlkRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0KGdyaWQuaWQpO1xuICAgIGlmICghZ3JpZERhdGEpIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBzb3J0RGF0YSA9IGdyaWREYXRhLmdldEluKFsnY29uZmlnJywgJ3NvcnRpbmdEYXRhJ10pO1xuICAgIGlmICghc29ydERhdGEpIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBzb3J0Q29sdW1uID0gc29ydERhdGEuZ2V0KCdzb3J0Q29sdW1uJyk7XG4gICAgaWYgKCFzb3J0Q29sdW1uKSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3Qgc29ydE9yZGVyID0gc29ydERhdGEuZ2V0KCdzb3J0T3JkZXInLCAnYXNjJyk7XG4gICAgbGV0IGNvbHVtbjtcbiAgICBjb2x1bW5zLmZvckVhY2goKGNvbCkgPT4ge1xuICAgICAgaWYgKFV0aWxzLmdldENvbHVtbktleShjb2wpID09PSBzb3J0Q29sdW1uKSB7XG4gICAgICAgIGNvbHVtbiA9IGNvbDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoIWNvbHVtbikgcmV0dXJuIGZhbHNlO1xuXG4gICAgc2V0QnVzeShncmlkKShkaXNwYXRjaCk7XG4gICAgY29uc3Qgb3JpZ0FsbERhdGEgPSBncmlkRGF0YS5nZXQoJ2FsbERhdGEnKTtcbiAgICBjb25zdCBjb21wYXJhdG9yID0gVXRpbHMuZ2V0U29ydENvbXBhcmF0b3IoY29sdW1uKTtcbiAgICBjb25zdCB2YWx1ZUdldHRlciA9IFV0aWxzLmdldFNvcnRWYWx1ZUdldHRlcihjb2x1bW4pO1xuICAgIGNvbnN0IHZhbHVlRW1wdHlDaGVja2VyID0gVXRpbHMuZ2V0VmFsdWVFbXB0eUNoZWNrZXIoY29sdW1uKTtcbiAgICBjb25zdCBhbGxEYXRhID0gb3JpZ0FsbERhdGEuc29ydCgoYSwgYikgPT4ge1xuICAgICAgY29uc3QgdmFsQSA9IHZhbHVlR2V0dGVyKGEpO1xuICAgICAgY29uc3QgdmFsQiA9IHZhbHVlR2V0dGVyKGIpO1xuICAgICAgaWYgKHNvcnRPcmRlciA9PT0gJ2FzYycpIHtcbiAgICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEEpKSByZXR1cm4gLTE7XG4gICAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxCKSkgcmV0dXJuIDE7XG4gICAgICAgIHJldHVybiBjb21wYXJhdG9yKHZhbEEsIHZhbEIpO1xuICAgICAgfVxuICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEEpKSByZXR1cm4gMTtcbiAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxCKSkgcmV0dXJuIC0xO1xuICAgICAgcmV0dXJuIGNvbXBhcmF0b3IodmFsQiwgdmFsQSk7XG4gICAgfSk7XG4gICAgbGV0IGRhdGE7XG4gICAgLy8gU29ydCBhbHNvIGZpbHRlcmVkIGRhdGEgc2VwYXJhdGVseVxuICAgIGlmIChncmlkRGF0YS5nZXRJbihbJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2lzRmlsdGVyaW5nJ10sIGZhbHNlKSkge1xuICAgICAgZGF0YSA9IGdyaWREYXRhLmdldCgnZGF0YScpLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgY29uc3QgdmFsQSA9IHZhbHVlR2V0dGVyKGEpO1xuICAgICAgICBjb25zdCB2YWxCID0gdmFsdWVHZXR0ZXIoYik7XG4gICAgICAgIGlmIChzb3J0T3JkZXIgPT09ICdhc2MnKSB7XG4gICAgICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEEpKSByZXR1cm4gLTE7XG4gICAgICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEIpKSByZXR1cm4gMTtcbiAgICAgICAgICByZXR1cm4gY29tcGFyYXRvcih2YWxBLCB2YWxCKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQSkpIHJldHVybiAxO1xuICAgICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQikpIHJldHVybiAtMTtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmF0b3IodmFsQiwgdmFsQSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YSA9IGFsbERhdGE7XG4gICAgfVxuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0FQUExZX1NPUlQsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGRhdGEsXG4gICAgICBhbGxEYXRhLFxuICAgIH0pO1xuICAgIHNldFJlYWR5KGdyaWQpKGRpc3BhdGNoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHNvcnRDaGFuZ2UgPSAoZ3JpZCwgY29sdW1ucywgY29sdW1uLCBuZXdTb3J0KSA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgY29uc3Qgc29ydE9yZGVyID0gbmV3U29ydCB8fCAnYXNjJztcbiAgICBjb25zdCBzb3J0Q29sdW1uID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbHVtbik7XG4gICAgVXRpbHMuc2F2ZVNvcnREYXRhKGdyaWQsIHsgc29ydENvbHVtbiwgc29ydE9yZGVyIH0pO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NPUlRfQ0hBTkdFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBzb3J0Q29sdW1uLFxuICAgICAgc29ydE9yZGVyLFxuICAgIH0pO1xuICAgIGFwcGx5U29ydChncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICB9O1xuXG5leHBvcnQgY29uc3Qgc2V0RGF0YSA9IChncmlkLCBjb2x1bW5zLCBkYXRhKSA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgVXRpbHMuY2hlY2tDb2x1bW5zUGFyYW0oY29sdW1ucyk7XG4gICAgY29uc3QgY29uZmlnRGF0YSA9IFV0aWxzLmxvYWRHcmlkQ29uZmlnKGdyaWQsIGNvbHVtbnMpO1xuICAgIGNvbnN0IGltbXV0YWJsZURhdGEgPSBJbW11dGFibGUuSXRlcmFibGUuaXNJdGVyYWJsZShkYXRhKSA/IGRhdGEgOiBJbW11dGFibGUuZnJvbUpTKGRhdGEpO1xuICAgIGNvbnN0IHNlbGVjdGVkSXRlbXMgPSBVdGlscy5sb2FkU2VsZWN0ZWRJdGVtcyhncmlkKS5maWx0ZXIoaXRlbSA9PiAoXG4gICAgICAhIWltbXV0YWJsZURhdGEuZmluZChkYXRhSXRlbSA9PiBkYXRhSXRlbS5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGl0ZW0pXG4gICAgKSk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX0RBVEEsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGRhdGE6IGltbXV0YWJsZURhdGEsXG4gICAgICBjb25maWc6IGNvbmZpZ0RhdGEsXG4gICAgICBzZWxlY3RlZEl0ZW1zLFxuICAgIH0pO1xuICAgIGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICAgIGFwcGx5U29ydChncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICB9O1xuXG5leHBvcnQgY29uc3QgZXh0ZW5kRGF0YSA9IChncmlkLCBjb2x1bW5zLCBkYXRhKSA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgY29uc3QgaW1tdXRhYmxlRGF0YSA9IEltbXV0YWJsZS5JdGVyYWJsZS5pc0l0ZXJhYmxlKGRhdGEpID8gZGF0YSA6IEltbXV0YWJsZS5mcm9tSlMoZGF0YSk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfRVhURU5EX0RBVEEsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGRhdGE6IGltbXV0YWJsZURhdGEsXG4gICAgfSk7XG4gICAgYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gICAgYXBwbHlTb3J0KGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCByZXNpemVDb2x1bW4gPSAoZ3JpZCwgY29sdW1uS2V5LCB3aWR0aCkgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGNvbnN0IGNvbHVtbldpZHRocyA9IGdldFN0YXRlKClcbiAgICAgIC5kYXRhZ3JpZFxuICAgICAgLmdldEluKFtncmlkLmlkLCAnY29uZmlnJywgJ2NvbHVtbldpZHRocyddLCBNYXAoKSlcbiAgICAgIC5zZXQoY29sdW1uS2V5LCB3aWR0aCk7XG4gICAgVXRpbHMuc2F2ZUNvbHVtbldpZHRocyhncmlkLCBjb2x1bW5XaWR0aHMpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFU0laRV9DT0xVTU4sXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGNvbHVtbldpZHRocyxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGVkaXQgPSBncmlkID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0VESVQsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGNhbmNlbCA9IGdyaWQgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0FOQ0VMLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBzYXZlID0gKGdyaWQsIGNiID0gKCkgPT4ge30pID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NBVkUsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICB9KTtcbiAgICBjYigpO1xuICB9O1xuXG5leHBvcnQgY29uc3Qgc2F2ZVN1Y2Nlc3MgPSAoZ3JpZCwgY29sdW1ucywgc2F2ZWRJdGVtcykgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfU1VDQ0VTUyxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgICAgIHNhdmVkSXRlbXMsXG4gICAgfSk7XG4gICAgYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gICAgYXBwbHlTb3J0KGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBzYXZlUGFydGlhbFN1Y2Nlc3MgPSAoZ3JpZCwgY29sdW1ucywgc2F2ZWRJdGVtcykgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfUEFSVElBTF9TVUNDRVNTLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBpZEtleVBhdGg6IGdyaWQuaWRLZXlQYXRoLFxuICAgICAgc2F2ZWRJdGVtcyxcbiAgICB9KTtcbiAgICBhcHBseUZpbHRlcnMoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgICBhcHBseVNvcnQoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHNhdmVGYWlsID0gZ3JpZCA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TQVZFX0ZBSUwsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZSA9IChncmlkLCBjb2x1bW5EZWZhdWx0VmFsdWVzKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEUsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGNvbHVtbkRlZmF1bHRWYWx1ZXMsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBhZGROZXdJdGVtID0gKGdyaWQsIGNvbHVtbkRlZmF1bHRWYWx1ZXMpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0FERF9ORVdfSVRFTSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgY29sdW1uRGVmYXVsdFZhbHVlcyxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZU5ld0l0ZW0gPSAoZ3JpZCwgaW5kZXgpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgaW5kZXgsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVOZXdJdGVtcyA9IChncmlkLCBpbmRleGVzKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU1TLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBpbmRleGVzLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlID0gKGdyaWQsIGNiID0gKCkgPT4ge30pID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgIH0pO1xuICAgIGNiKCk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVTdWNjZXNzID0gKGdyaWQsIHJlbW92ZWRJZHMpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9TVUNDRVNTLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBpZEtleVBhdGg6IGdyaWQuaWRLZXlQYXRoLFxuICAgICAgcmVtb3ZlZElkcyxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZUZhaWwgPSBncmlkID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9GQUlMLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBlZGl0Q2VsbFZhbHVlQ2hhbmdlID0gKGdyaWQsIGRhdGFJZCwga2V5UGF0aCwgdmFsdWUpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0VESVRfQ0VMTF9WQUxVRV9DSEFOR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGRhdGFJZCxcbiAgICAgIGtleVBhdGgsXG4gICAgICB2YWx1ZSxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGVkaXRDZWxsVmFsdWVWYWxpZGF0ZSA9IChcbiAgZ3JpZCxcbiAgZGF0YUlkLFxuICBrZXlQYXRoLFxuICB2YWx1ZSxcbiAgdmFsaWRhdG9ycyA9IFtdLFxuKSA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgbGV0IHZhbGlkYXRpb25TdGF0ZSA9IHsgdmFsaWQ6IHRydWUgfTtcbiAgICB2YWxpZGF0b3JzLmZvckVhY2goKHZhbGlkYXRvcikgPT4ge1xuICAgICAgaWYgKHZhbGlkYXRpb25TdGF0ZS52YWxpZCkge1xuICAgICAgICBpZiAodmFsaWRhdG9yLnVuaXF1ZSkge1xuICAgICAgICAgIGlmICh2YWx1ZSAhPT0gJycgfHwgdmFsdWUgIT09IG51bGwgfHwgdmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gY29tYmluZSByZWFsIGRhdGEgd2l0aCBjdXJyZW50IHVuc2F2ZWQgZWRpdGVkIGRhdGFcbiAgICAgICAgICAgIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG4gICAgICAgICAgICBjb25zdCBlZGl0RGF0YSA9IGdyaWREYXRhLmdldCgnZWRpdERhdGEnKTtcbiAgICAgICAgICAgIGxldCBhbGxEYXRhID0gZ3JpZERhdGEuZ2V0KCdhbGxEYXRhJyk7XG4gICAgICAgICAgICBpZiAoZWRpdERhdGEpIHtcbiAgICAgICAgICAgICAgZWRpdERhdGEuZm9yRWFjaCgoZWRpdERhdGFJdGVtLCBlZGl0RGF0YUl0ZW1JZCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvdW5kSW5kZXggPVxuICAgICAgICAgICAgICAgICAgYWxsRGF0YS5maW5kSW5kZXgoZCA9PiBkLmdldEluKGdyaWQuaWRLZXlQYXRoKSA9PT0gZWRpdERhdGFJdGVtSWQpO1xuICAgICAgICAgICAgICAgIGlmIChmb3VuZEluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgYWxsRGF0YSA9IGFsbERhdGEubWVyZ2VEZWVwSW4oW2ZvdW5kSW5kZXhdLCBlZGl0RGF0YUl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBkZXRlcm1pbmUgdW5pcXVlbmVzc1xuICAgICAgICAgICAgY29uc3QgZmluZGluZyA9IGFsbERhdGEuZmluZCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZ3JpZC5pZEtleVBhdGgubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgLy8gZG9uJ3Qgc2VsZiBjb21wYXJlXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uZ2V0SW4oZ3JpZC5pZEtleVBhdGgpID09PSBkYXRhSWQpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uZ2V0SW4oa2V5UGF0aCkgPT09IHZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoZmluZGluZykge1xuICAgICAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgdmFsaWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdWYWxpZGF0aW9uLlVuaXF1ZScsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHZhbGlkYXRvci52YWxpZGF0ZVdpdGhSb3dEYXRhKSB7XG4gICAgICAgICAgY29uc3QgZ3JpZERhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldChncmlkLmlkKTtcbiAgICAgICAgICBjb25zdCBlZGl0RGF0YSA9IGdyaWREYXRhLmdldEluKFsnZWRpdERhdGEnLCBkYXRhSWRdLCBNYXAoKSk7XG4gICAgICAgICAgbGV0IHJvd0RhdGEgPSBncmlkRGF0YS5nZXQoJ2FsbERhdGEnKS5maW5kKGl0ZW0gPT4gaXRlbS5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGRhdGFJZCk7XG4gICAgICAgICAgaWYgKHJvd0RhdGEpIHtcbiAgICAgICAgICAgIHJvd0RhdGEgPSByb3dEYXRhLm1lcmdlRGVlcChlZGl0RGF0YSk7XG4gICAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB2YWxpZGF0b3IudmFsaWRhdGVXaXRoUm93RGF0YSh2YWx1ZSwgcm93RGF0YSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IHZhbGlkYXRvci5wYXJhbXMgPyBPYmplY3QudmFsdWVzKHZhbGlkYXRvci5wYXJhbXMpIDogW107XG4gICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0gdmFsaWRhdG9yLnZhbGlkYXRlKHZhbHVlLCAuLi5wYXJhbXMpO1xuICAgICAgICAgIGlmICh2YWxpZGF0b3IucGFyYW1zKSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZVZhbHVlcyA9IHZhbGlkYXRvci5wYXJhbXM7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKHZhbGlkYXRpb25TdGF0ZS52YWxpZCkge1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRSxcbiAgICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICAgIG1lc3NhZ2VUeXBlOiAnZXJyb3InLFxuICAgICAgICBkYXRhSWQsXG4gICAgICAgIGtleVBhdGgsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRSxcbiAgICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICAgIG1lc3NhZ2VUeXBlOiAnZXJyb3InLFxuICAgICAgICBkYXRhSWQsXG4gICAgICAgIGtleVBhdGgsXG4gICAgICAgIG1lc3NhZ2VJZDogdmFsaWRhdGlvblN0YXRlLm1lc3NhZ2UsXG4gICAgICAgIG1lc3NhZ2VWYWx1ZXM6IHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlVmFsdWVzLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB2YWxpZGF0aW9uU3RhdGUudmFsaWQ7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVDZWxsVmFsdWVDaGFuZ2UgPSAoZ3JpZCwgcm93SW5kZXgsIGtleVBhdGgsIHZhbHVlKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9DSEFOR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIHJvd0luZGV4LFxuICAgICAga2V5UGF0aCxcbiAgICAgIHZhbHVlLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUgPSAoZ3JpZCwgcm93SW5kZXgsIGtleVBhdGgsIHZhbHVlLCB2YWxpZGF0b3JzID0gW10pID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBsZXQgdmFsaWRhdGlvblN0YXRlID0geyB2YWxpZDogdHJ1ZSB9O1xuICAgIHZhbGlkYXRvcnMuZm9yRWFjaCgodmFsaWRhdG9yKSA9PiB7XG4gICAgICBpZiAodmFsaWRhdGlvblN0YXRlLnZhbGlkKSB7XG4gICAgICAgIGlmICh2YWxpZGF0b3IudW5pcXVlKSB7XG4gICAgICAgICAgaWYgKHZhbHVlICE9PSAnJyB8fCB2YWx1ZSAhPT0gbnVsbCB8fCB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zdCBmaW5kaW5nID0gZ2V0U3RhdGUoKVxuICAgICAgICAgICAgICAuZGF0YWdyaWRcbiAgICAgICAgICAgICAgLmdldEluKFtncmlkLmlkLCAnYWxsRGF0YSddKVxuICAgICAgICAgICAgICAuZmluZChpdGVtID0+IGl0ZW0uZ2V0SW4oa2V5UGF0aCkgPT09IHZhbHVlKTtcbiAgICAgICAgICAgIGlmIChmaW5kaW5nKSB7XG4gICAgICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICB2YWxpZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ1ZhbGlkYXRpb24uVW5pcXVlJyxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnN0IGZpbmQyID0gZ2V0U3RhdGUoKVxuICAgICAgICAgICAgICAgIC5kYXRhZ3JpZFxuICAgICAgICAgICAgICAgIC5nZXRJbihbZ3JpZC5pZCwgJ2NyZWF0ZURhdGEnXSlcbiAgICAgICAgICAgICAgICAuZmluZCgoaXRlbSwgaSkgPT4gaSAhPT0gcm93SW5kZXggJiYgaXRlbS5nZXRJbihrZXlQYXRoKSA9PT0gdmFsdWUpO1xuICAgICAgICAgICAgICBpZiAoZmluZDIpIHtcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgICB2YWxpZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnVmFsaWRhdGlvbi5VbmlxdWUnLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodmFsaWRhdG9yLnZhbGlkYXRlV2l0aFJvd0RhdGEpIHtcbiAgICAgICAgICBjb25zdCByb3dEYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ2NyZWF0ZURhdGEnLCByb3dJbmRleF0pO1xuICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZVdpdGhSb3dEYXRhKHZhbHVlLCByb3dEYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBwYXJhbXMgPSB2YWxpZGF0b3IucGFyYW1zID8gT2JqZWN0LnZhbHVlcyh2YWxpZGF0b3IucGFyYW1zKSA6IFtdO1xuICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZSh2YWx1ZSwgLi4ucGFyYW1zKTtcbiAgICAgICAgICBpZiAodmFsaWRhdG9yLnBhcmFtcykge1xuICAgICAgICAgICAgdmFsaWRhdGlvblN0YXRlLm1lc3NhZ2VWYWx1ZXMgPSB2YWxpZGF0b3IucGFyYW1zO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICh2YWxpZGF0aW9uU3RhdGUudmFsaWQpIHtcbiAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfSElERV9NRVNTQUdFLFxuICAgICAgICBpZDogZ3JpZC5pZCxcbiAgICAgICAgbWVzc2FnZVR5cGU6ICdlcnJvcicsXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICBrZXlQYXRoLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfU0hPV19NRVNTQUdFLFxuICAgICAgICBpZDogZ3JpZC5pZCxcbiAgICAgICAgbWVzc2FnZVR5cGU6ICdlcnJvcicsXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICBrZXlQYXRoLFxuICAgICAgICBtZXNzYWdlSWQ6IHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlLFxuICAgICAgICBtZXNzYWdlVmFsdWVzOiB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZVZhbHVlcyxcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdmFsaWRhdGlvblN0YXRlLnZhbGlkO1xuICB9O1xuXG5leHBvcnQgY29uc3QgY2VsbFNob3dNZXNzYWdlID0gKGdyaWQsIG1lc3NhZ2VUeXBlLCBkYXRhSWQsIGtleVBhdGgsIG1lc3NhZ2VJZCwgbWVzc2FnZVZhbHVlcykgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIG1lc3NhZ2VUeXBlLFxuICAgICAgZGF0YUlkLFxuICAgICAga2V5UGF0aCxcbiAgICAgIG1lc3NhZ2VJZCxcbiAgICAgIG1lc3NhZ2VWYWx1ZXMsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBjZWxsU2hvd01lc3NhZ2VzID0gKGdyaWQsIG1lc3NhZ2VzKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRVMsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIG1lc3NhZ2VzLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgY2VsbEhpZGVNZXNzYWdlID0gKGdyaWQsIG1lc3NhZ2VUeXBlID0gbnVsbCwgZGF0YUlkID0gbnVsbCwga2V5UGF0aCA9IG51bGwpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfSElERV9NRVNTQUdFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBtZXNzYWdlVHlwZSxcbiAgICAgIGRhdGFJZCxcbiAgICAgIGtleVBhdGgsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVDZWxsU2hvd01lc3NhZ2UgPSAoXG4gIGdyaWQsXG4gIG1lc3NhZ2VUeXBlLFxuICByb3dJbmRleCxcbiAga2V5UGF0aCxcbiAgbWVzc2FnZUlkLFxuICBtZXNzYWdlVmFsdWVzLFxuKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9TSE9XX01FU1NBR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIG1lc3NhZ2VUeXBlLFxuICAgICAgcm93SW5kZXgsXG4gICAgICBrZXlQYXRoLFxuICAgICAgbWVzc2FnZUlkLFxuICAgICAgbWVzc2FnZVZhbHVlcyxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNlbGxIaWRlTWVzc2FnZSA9IChncmlkLCBtZXNzYWdlVHlwZSA9IG51bGwsIHJvd0luZGV4ID0gbnVsbCwga2V5UGF0aCA9IG51bGwpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX0hJREVfTUVTU0FHRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgbWVzc2FnZVR5cGUsXG4gICAgICByb3dJbmRleCxcbiAgICAgIGtleVBhdGgsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBjZWxsU2VsZWN0aW9uQ2hhbmdlID0gKGdyaWQsIHNlbGVjdGVkQ2VsbCA9IG51bGwpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHNlbGVjdGVkQ2VsbCxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TRUxFQ1RJT05fQ0hBTkdFLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgaXRlbVNlbGVjdGlvbkNoYW5nZSA9IChcbiAgZ3JpZCxcbiAgcm93SW5kZXgsXG4gIGN0cmxQcmVzc2VkID0gZmFsc2UsXG4gIHNoaWZ0UHJlc3NlZCA9IGZhbHNlLFxuKSA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICByb3dJbmRleCxcbiAgICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgICBjdHJsUHJlc3NlZCxcbiAgICAgIHNoaWZ0UHJlc3NlZCxcbiAgICB9KTtcbiAgICBVdGlscy5zYXZlU2VsZWN0ZWRJdGVtcyhncmlkLCBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnc2VsZWN0ZWRJdGVtcyddKSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBzZWxlY3RBbGxJdGVtc0NoYW5nZSA9IGdyaWQgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NFTEVDVF9BTExfSVRFTVNfQ0hBTkdFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBpZEtleVBhdGg6IGdyaWQuaWRLZXlQYXRoLFxuICAgIH0pO1xuICAgIFV0aWxzLnNhdmVTZWxlY3RlZEl0ZW1zKGdyaWQsIGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdzZWxlY3RlZEl0ZW1zJ10pKTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGNsZWFyU2VsZWN0ZWRJdGVtcyA9IGdyaWQgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NMRUFSX1NFTEVDVEVEX0lURU1TLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgfSk7XG4gICAgVXRpbHMuc2F2ZVNlbGVjdGVkSXRlbXMoZ3JpZCwgZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ3NlbGVjdGVkSXRlbXMnXSkpO1xuICB9O1xuXG5leHBvcnQgY29uc3QgdG9nZ2xlRmlsdGVyaW5nID0gZ3JpZCA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgY29uc3QgaXNGaWx0ZXJpbmcgPSAhZ2V0U3RhdGUoKVxuICAgICAgLmRhdGFncmlkXG4gICAgICAuZ2V0SW4oW2dyaWQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdpc0ZpbHRlcmluZyddLCBmYWxzZSk7XG4gICAgVXRpbHMuc2F2ZUlzRmlsdGVyaW5nKGdyaWQsIGlzRmlsdGVyaW5nKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9UT0dHTEVfRklMVEVSSU5HLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBpc0ZpbHRlcmluZyxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHZhbGlkYXRlRWRpdGVkUm93cyA9IChncmlkLCBjb2x1bW5zKSA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgY29uc3QgZ3JpZERhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldChncmlkLmlkKTtcbiAgICBjb25zdCBlZGl0RGF0YSA9IGdyaWREYXRhLmdldCgnZWRpdERhdGEnLCBNYXAoKSk7XG4gICAgbGV0IGFsbEdvb2QgPSB0cnVlO1xuICAgIGVkaXREYXRhLmZvckVhY2goKGVkaXREYXRhUm93LCBkYXRhSWQpID0+IHtcbiAgICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICAgIGxldCB2YWx1ZSA9IGVkaXREYXRhUm93LmdldEluKGNvbC52YWx1ZUtleVBhdGgpO1xuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHZhbHVlID0gZ3JpZERhdGFcbiAgICAgICAgICAgIC5nZXQoJ2FsbERhdGEnKVxuICAgICAgICAgICAgLmZpbmQoZGF0YSA9PiBkYXRhLmdldEluKGdyaWQuaWRLZXlQYXRoKSA9PT0gZGF0YUlkKVxuICAgICAgICAgICAgLmdldEluKGNvbC52YWx1ZUtleVBhdGgpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGlzVmFsaWQgPSBlZGl0Q2VsbFZhbHVlVmFsaWRhdGUoXG4gICAgICAgICAgZ3JpZCxcbiAgICAgICAgICBkYXRhSWQsXG4gICAgICAgICAgY29sLnZhbHVlS2V5UGF0aCxcbiAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICBjb2wudmFsaWRhdG9ycyxcbiAgICAgICAgKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICAgICAgICBpZiAoYWxsR29vZCAmJiAhaXNWYWxpZCkge1xuICAgICAgICAgIGFsbEdvb2QgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGFsbEdvb2Q7XG4gIH07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVFbXB0eUNyZWF0ZWRSb3dzID0gKGdyaWQsIGNvbHVtbnMpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBjb25zdCBjcmVhdGVEYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ2NyZWF0ZURhdGEnXSwgTWFwKCkpO1xuICAgIGNvbnN0IGluZGV4ZXMgPSBbXTtcbiAgICBjcmVhdGVEYXRhLmZvckVhY2goKGNyZWF0ZURhdGFSb3csIHJvd0luZGV4KSA9PiB7XG4gICAgICBsZXQgaXNFbXB0eSA9IHRydWU7XG4gICAgICBjb2x1bW5zLmZvckVhY2goKGNvbCkgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGNyZWF0ZURhdGFSb3cuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSAnJyAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgIGlzRW1wdHkgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAoaXNFbXB0eSkge1xuICAgICAgICBpbmRleGVzLnB1c2gocm93SW5kZXgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChpbmRleGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJlbW92ZU5ld0l0ZW1zKGdyaWQsIGluZGV4ZXMpKGRpc3BhdGNoKTtcbiAgICB9XG4gIH07XG5cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUNyZWF0ZWRSb3dzID0gKGdyaWQsIGNvbHVtbnMpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICByZW1vdmVFbXB0eUNyZWF0ZWRSb3dzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gICAgY29uc3QgY3JlYXRlRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdjcmVhdGVEYXRhJ10sIE1hcCgpKTtcbiAgICBsZXQgYWxsR29vZCA9IHRydWU7XG4gICAgY3JlYXRlRGF0YS5mb3JFYWNoKChjcmVhdGVEYXRhUm93LCByb3dJbmRleCkgPT4ge1xuICAgICAgY29sdW1ucy5mb3JFYWNoKChjb2wpID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBjcmVhdGVEYXRhUm93LmdldEluKGNvbC52YWx1ZUtleVBhdGgpO1xuICAgICAgICBjb25zdCBpc1ZhbGlkID0gY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUoXG4gICAgICAgICAgZ3JpZCxcbiAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICBjb2wudmFsdWVLZXlQYXRoLFxuICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgIGNvbC52YWxpZGF0b3JzLFxuICAgICAgICApKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gICAgICAgIGlmIChhbGxHb29kICYmICFpc1ZhbGlkKSB7XG4gICAgICAgICAgYWxsR29vZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gYWxsR29vZDtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZUV4aXN0aW5nQ2VsbFZhbHVlID0gKGdyaWQsIGRhdGFJZCwga2V5UGF0aCwgdmFsdWUpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1VQREFURV9FWElTVElOR19DRUxMX1ZBTFVFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBkYXRhSWQsXG4gICAgICBrZXlQYXRoLFxuICAgICAgdmFsdWUsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBzZXRFZGl0RGF0YSA9IChncmlkLCBkYXRhLCBjZWxsTWVzc2FnZXMgPSBNYXAoKSkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgZGF0YSxcbiAgICAgIGNlbGxNZXNzYWdlcyxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX0VESVRfREFUQSxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IG9wZW5Db2x1bW5TZXR0aW5nc01vZGFsID0gZ3JpZCA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfT1BFTixcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsID0gZ3JpZCA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfQ0xPU0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHNhdmVDb2x1bW5TZXR0aW5ncyA9IChncmlkLCBoaWRkZW5Db2x1bW5zLCBjb2x1bW5PcmRlcikgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgVXRpbHMuc2F2ZUNvbHVtblNldHRpbmdzKGdyaWQsIGhpZGRlbkNvbHVtbnMsIGNvbHVtbk9yZGVyKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfU0FWRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgY29sdW1uT3JkZXIsXG4gICAgfSk7XG4gIH07XG5cbiJdfQ==