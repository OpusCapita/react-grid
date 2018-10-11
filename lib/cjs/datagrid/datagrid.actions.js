'use strict';

exports.__esModule = true;
exports.saveColumnSettings = exports.closeColumnSettingsModal = exports.openColumnSettingsModal = exports.setEditData = exports.updateExistingCellValue = exports.validateCreatedRows = exports.removeEmptyCreatedRows = exports.validateEditedRows = exports.toggleFiltering = exports.clearSelectedItems = exports.selectAllItemsChange = exports.itemSelectionChange = exports.cellSelectionChange = exports.createCellHideMessage = exports.createCellShowMessage = exports.cellHideMessage = exports.cellShowMessages = exports.cellShowMessage = exports.createCellValueValidate = exports.createCellValueChange = exports.editCellValueValidate = exports.editCellValueChange = exports.removeFail = exports.removeSuccess = exports.remove = exports.removeNewItems = exports.removeNewItem = exports.removeItem = exports.addNewItem = exports.create = exports.saveFail = exports.savePartialSuccess = exports.saveSuccess = exports.save = exports.cancel = exports.edit = exports.resizeColumn = exports.extendData = exports.setData = exports.sortChange = exports.applySort = exports.filterCellValueChange = exports.setAndApplyFilters = exports.applyFilters = exports.setReady = exports.setBusy = exports.forceRefresh = exports.invalidate = exports.TYPES = undefined;

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
  PLATFORM_DATAGRID_FORCE_REFRESH: 'PLATFORM_DATAGRID_FORCE_REFRESH'
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

var forceRefresh = exports.forceRefresh = function forceRefresh() {
  return function (dispatch) {
    // Fire resize event to recalculate component sizes
    // and to force redraw the grid
    setTimeout(function () {
      if (document.createEvent) {
        var evt = document.createEvent('HTMLEvents');
        evt.initEvent('resize', true, false);
        window.dispatchEvent(evt);
      }
    }, 1);
    dispatch({ type: TYPES.PLATFORM_DATAGRID_FORCE_REFRESH });
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
              var value = row.getIn(column.valueKeyPath);
              if (value || value === 0 || value === false) {
                var filterMatcher = _datagrid2.default.getFilterMatcher(column, dateFormat);
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
      data: data
    });
    setReady(grid)(dispatch);
    return true;
  };
};

var setAndApplyFilters = exports.setAndApplyFilters = function setAndApplyFilters(grid, columns, filteringData) {
  return function (dispatch) {
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_SET_FILTERS,
      id: grid.id,
      filteringData: _datagrid2.default.normalizeFilteringData(filteringData)
    });
    dispatch(applyFilters(grid, columns));
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
  var prepend = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  return function (dispatch, getState) {
    _datagrid2.default.checkGridParam(grid);
    var immutableData = _immutable2.default.Iterable.isIterable(data) ? data : _immutable2.default.fromJS(data);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_EXTEND_DATA,
      id: grid.id,
      data: immutableData,
      prepend: prepend
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

var removeItem = exports.removeItem = function removeItem(grid, rowId) {
  return function (dispatch) {
    _datagrid2.default.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_REMOVE_ITEM,
      id: grid.id,
      idKeyPath: grid.idKeyPath,
      rowId: rowId
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5hY3Rpb25zLmpzIl0sIm5hbWVzIjpbIlRZUEVTIiwiUExBVEZPUk1fREFUQUdSSURfSU5WQUxJREFURSIsIlBMQVRGT1JNX0RBVEFHUklEX0JVU1kiLCJQTEFURk9STV9EQVRBR1JJRF9SRUFEWSIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9EQVRBIiwiUExBVEZPUk1fREFUQUdSSURfQVBQTFlfU09SVCIsIlBMQVRGT1JNX0RBVEFHUklEX1NPUlRfQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfUkVTSVpFX0NPTFVNTiIsIlBMQVRGT1JNX0RBVEFHUklEX0VESVQiLCJQTEFURk9STV9EQVRBR1JJRF9DQU5DRUwiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFIiwiUExBVEZPUk1fREFUQUdSSURfRVhURU5EX0RBVEEiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFX1NVQ0NFU1MiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFX1BBUlRJQUxfU1VDQ0VTUyIsIlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfRkFJTCIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURSIsIlBMQVRGT1JNX0RBVEFHUklEX0FERF9ORVdfSVRFTSIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9JVEVNIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNUyIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRSIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9TVUNDRVNTIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUwiLCJQTEFURk9STV9EQVRBR1JJRF9FRElUX0NFTExfVkFMVUVfQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0UiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRVMiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX0hJREVfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX0NIQU5HRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX1ZBTElEQVRFIiwiUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TRUxFQ1RJT05fQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9DTEVBUl9TRUxFQ1RFRF9JVEVNUyIsIlBMQVRGT1JNX0RBVEFHUklEX1RPR0dMRV9GSUxURVJJTkciLCJQTEFURk9STV9EQVRBR1JJRF9GSUxURVJfREFUQV9DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9GSUxURVJTIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX0ZJTFRFUlMiLCJQTEFURk9STV9EQVRBR1JJRF9VUERBVEVfRVhJU1RJTkdfQ0VMTF9WQUxVRSIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9FRElUX0RBVEEiLCJQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfT1BFTiIsIlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFIiwiUExBVEZPUk1fREFUQUdSSURfRk9SQ0VfUkVGUkVTSCIsImludmFsaWRhdGUiLCJkaXNwYXRjaCIsIlV0aWxzIiwiY2hlY2tHcmlkUGFyYW0iLCJncmlkIiwidHlwZSIsImlkIiwiZm9yY2VSZWZyZXNoIiwic2V0VGltZW91dCIsImRvY3VtZW50IiwiY3JlYXRlRXZlbnQiLCJldnQiLCJpbml0RXZlbnQiLCJ3aW5kb3ciLCJkaXNwYXRjaEV2ZW50Iiwic2V0QnVzeSIsInNldFJlYWR5IiwiYXBwbHlGaWx0ZXJzIiwiY29sdW1ucyIsImdldFN0YXRlIiwiZm9yRWFjaCIsImdyaWREYXRhIiwiZGF0YWdyaWQiLCJnZXQiLCJmaWx0ZXJEYXRhIiwiZ2V0SW4iLCJhbGxEYXRhIiwiZGF0YSIsImlzRW1wdHkiLCJkYXRlRm9ybWF0IiwiZ2V0RGF0ZUZvcm1hdCIsInVzZXIiLCJmaWx0ZXIiLCJyb3ciLCJoaXRzIiwiZmlsdGVyVmFsdWUiLCJmaWx0ZXJDb2x1bW4iLCJjb2x1bW4iLCJnZXRDb2x1bW5LZXkiLCJ2YWx1ZSIsInZhbHVlS2V5UGF0aCIsImZpbHRlck1hdGNoZXIiLCJnZXRGaWx0ZXJNYXRjaGVyIiwic2l6ZSIsInNldEFuZEFwcGx5RmlsdGVycyIsImZpbHRlcmluZ0RhdGEiLCJub3JtYWxpemVGaWx0ZXJpbmdEYXRhIiwiZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlIiwib3JpZ0ZpbHRlckRhdGEiLCJjb2x1bW5LZXkiLCJ2YWx1ZUVtcHR5Q2hlY2tlciIsImdldFZhbHVlRW1wdHlDaGVja2VyIiwiZGVsZXRlIiwic2V0Iiwic2F2ZUZpbHRlckRhdGEiLCJhcHBseVNvcnQiLCJzb3J0RGF0YSIsInNvcnRDb2x1bW4iLCJzb3J0T3JkZXIiLCJjb2wiLCJvcmlnQWxsRGF0YSIsImNvbXBhcmF0b3IiLCJnZXRTb3J0Q29tcGFyYXRvciIsInZhbHVlR2V0dGVyIiwiZ2V0U29ydFZhbHVlR2V0dGVyIiwic29ydCIsImEiLCJiIiwidmFsQSIsInZhbEIiLCJzb3J0Q2hhbmdlIiwibmV3U29ydCIsInNhdmVTb3J0RGF0YSIsInNldERhdGEiLCJjaGVja0NvbHVtbnNQYXJhbSIsImNvbmZpZ0RhdGEiLCJsb2FkR3JpZENvbmZpZyIsImltbXV0YWJsZURhdGEiLCJJbW11dGFibGUiLCJJdGVyYWJsZSIsImlzSXRlcmFibGUiLCJmcm9tSlMiLCJzZWxlY3RlZEl0ZW1zIiwibG9hZFNlbGVjdGVkSXRlbXMiLCJmaW5kIiwiZGF0YUl0ZW0iLCJpZEtleVBhdGgiLCJpdGVtIiwiY29uZmlnIiwiZXh0ZW5kRGF0YSIsInByZXBlbmQiLCJyZXNpemVDb2x1bW4iLCJ3aWR0aCIsImNvbHVtbldpZHRocyIsInNhdmVDb2x1bW5XaWR0aHMiLCJlZGl0IiwiY2FuY2VsIiwic2F2ZSIsImNiIiwic2F2ZVN1Y2Nlc3MiLCJzYXZlZEl0ZW1zIiwic2F2ZVBhcnRpYWxTdWNjZXNzIiwic2F2ZUZhaWwiLCJjcmVhdGUiLCJjb2x1bW5EZWZhdWx0VmFsdWVzIiwiYWRkTmV3SXRlbSIsInJlbW92ZUl0ZW0iLCJyb3dJZCIsInJlbW92ZU5ld0l0ZW0iLCJpbmRleCIsInJlbW92ZU5ld0l0ZW1zIiwiaW5kZXhlcyIsInJlbW92ZSIsInJlbW92ZVN1Y2Nlc3MiLCJyZW1vdmVkSWRzIiwicmVtb3ZlRmFpbCIsImVkaXRDZWxsVmFsdWVDaGFuZ2UiLCJkYXRhSWQiLCJrZXlQYXRoIiwiZWRpdENlbGxWYWx1ZVZhbGlkYXRlIiwidmFsaWRhdG9ycyIsInZhbGlkYXRpb25TdGF0ZSIsInZhbGlkIiwidmFsaWRhdG9yIiwidW5pcXVlIiwidW5kZWZpbmVkIiwiZWRpdERhdGEiLCJlZGl0RGF0YUl0ZW0iLCJlZGl0RGF0YUl0ZW1JZCIsImZvdW5kSW5kZXgiLCJmaW5kSW5kZXgiLCJkIiwibWVyZ2VEZWVwSW4iLCJmaW5kaW5nIiwibGVuZ3RoIiwibWVzc2FnZSIsInZhbGlkYXRlV2l0aFJvd0RhdGEiLCJyb3dEYXRhIiwibWVyZ2VEZWVwIiwicGFyYW1zIiwiT2JqZWN0IiwidmFsdWVzIiwidmFsaWRhdGUiLCJtZXNzYWdlVmFsdWVzIiwibWVzc2FnZVR5cGUiLCJtZXNzYWdlSWQiLCJjcmVhdGVDZWxsVmFsdWVDaGFuZ2UiLCJyb3dJbmRleCIsImNyZWF0ZUNlbGxWYWx1ZVZhbGlkYXRlIiwiZmluZDIiLCJpIiwiY2VsbFNob3dNZXNzYWdlIiwiY2VsbFNob3dNZXNzYWdlcyIsIm1lc3NhZ2VzIiwiY2VsbEhpZGVNZXNzYWdlIiwiY3JlYXRlQ2VsbFNob3dNZXNzYWdlIiwiY3JlYXRlQ2VsbEhpZGVNZXNzYWdlIiwiY2VsbFNlbGVjdGlvbkNoYW5nZSIsInNlbGVjdGVkQ2VsbCIsIml0ZW1TZWxlY3Rpb25DaGFuZ2UiLCJjdHJsUHJlc3NlZCIsInNoaWZ0UHJlc3NlZCIsInNhdmVTZWxlY3RlZEl0ZW1zIiwic2VsZWN0QWxsSXRlbXNDaGFuZ2UiLCJjbGVhclNlbGVjdGVkSXRlbXMiLCJ0b2dnbGVGaWx0ZXJpbmciLCJpc0ZpbHRlcmluZyIsInNhdmVJc0ZpbHRlcmluZyIsInZhbGlkYXRlRWRpdGVkUm93cyIsImFsbEdvb2QiLCJlZGl0RGF0YVJvdyIsImlzVmFsaWQiLCJyZW1vdmVFbXB0eUNyZWF0ZWRSb3dzIiwiY3JlYXRlRGF0YSIsImNyZWF0ZURhdGFSb3ciLCJwdXNoIiwidmFsaWRhdGVDcmVhdGVkUm93cyIsInVwZGF0ZUV4aXN0aW5nQ2VsbFZhbHVlIiwic2V0RWRpdERhdGEiLCJjZWxsTWVzc2FnZXMiLCJvcGVuQ29sdW1uU2V0dGluZ3NNb2RhbCIsImNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbCIsInNhdmVDb2x1bW5TZXR0aW5ncyIsImhpZGRlbkNvbHVtbnMiLCJjb2x1bW5PcmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7QUFFTyxJQUFNQSx3QkFBUTtBQUNuQkMsZ0NBQThCLDhCQURYO0FBRW5CQywwQkFBd0Isd0JBRkw7QUFHbkJDLDJCQUF5Qix5QkFITjtBQUluQkMsOEJBQTRCLDRCQUpUO0FBS25CQyxnQ0FBOEIsOEJBTFg7QUFNbkJDLGlDQUErQiwrQkFOWjtBQU9uQkMsbUNBQWlDLGlDQVBkO0FBUW5CQywwQkFBd0Isd0JBUkw7QUFTbkJDLDRCQUEwQiwwQkFUUDtBQVVuQkMsMEJBQXdCLHdCQVZMO0FBV25CQyxpQ0FBK0IsK0JBWFo7QUFZbkJDLGtDQUFnQyxnQ0FaYjtBQWFuQkMsMENBQXdDLHdDQWJyQjtBQWNuQkMsK0JBQTZCLDZCQWRWO0FBZW5CQyw0QkFBMEIsMEJBZlA7QUFn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QUlELEdBUG9DO0FBQUEsQ0FBaEM7O0FBU0EsSUFBTStLLDhEQUEyQixTQUEzQkEsd0JBQTJCO0FBQUEsU0FDdEMsVUFBQ3BMLFFBQUQsRUFBYztBQUNaQyx1QkFBTUMsY0FBTixDQUFxQkMsSUFBckI7QUFDQUgsYUFBUztBQUNQSSxZQUFNbEQsTUFBTTBDLDZDQURMO0FBRVBTLFVBQUlGLEtBQUtFO0FBRkYsS0FBVDtBQUlELEdBUHFDO0FBQUEsQ0FBakM7O0FBU0EsSUFBTWdMLGtEQUFxQixTQUFyQkEsa0JBQXFCLENBQUNsTCxJQUFELEVBQU9tTCxhQUFQLEVBQXNCQyxXQUF0QjtBQUFBLFNBQ2hDLFVBQUN2TCxRQUFELEVBQWM7QUFDWkMsdUJBQU1DLGNBQU4sQ0FBcUJDLElBQXJCO0FBQ0FGLHVCQUFNb0wsa0JBQU4sQ0FBeUJsTCxJQUF6QixFQUErQm1MLGFBQS9CLEVBQThDQyxXQUE5QztBQUNBdkwsYUFBUztBQUNQSSxZQUFNbEQsTUFBTTJDLHNDQURMO0FBRVBRLFVBQUlGLEtBQUtFLEVBRkY7QUFHUGtMO0FBSE8sS0FBVDtBQUtELEdBVCtCO0FBQUEsQ0FBM0IiLCJmaWxlIjoiZGF0YWdyaWQuYWN0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJbW11dGFibGUsIHsgTWFwIH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCBVdGlscyBmcm9tICcuL2RhdGFncmlkLnV0aWxzJztcblxuZXhwb3J0IGNvbnN0IFRZUEVTID0ge1xuICBQTEFURk9STV9EQVRBR1JJRF9JTlZBTElEQVRFOiAnUExBVEZPUk1fREFUQUdSSURfSU5WQUxJREFURScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0JVU1k6ICdQTEFURk9STV9EQVRBR1JJRF9CVVNZJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVBRFk6ICdQTEFURk9STV9EQVRBR1JJRF9SRUFEWScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NFVF9EQVRBOiAnUExBVEZPUk1fREFUQUdSSURfU0VUX0RBVEEnLFxuICBQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9TT1JUOiAnUExBVEZPUk1fREFUQUdSSURfQVBQTFlfU09SVCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NPUlRfQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfU09SVF9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRVNJWkVfQ09MVU1OOiAnUExBVEZPUk1fREFUQUdSSURfUkVTSVpFX0NPTFVNTicsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0VESVQ6ICdQTEFURk9STV9EQVRBR1JJRF9FRElUJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0FOQ0VMOiAnUExBVEZPUk1fREFUQUdSSURfQ0FOQ0VMJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0FWRTogJ1BMQVRGT1JNX0RBVEFHUklEX1NBVkUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9FWFRFTkRfREFUQTogJ1BMQVRGT1JNX0RBVEFHUklEX0VYVEVORF9EQVRBJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0FWRV9TVUNDRVNTOiAnUExBVEZPUk1fREFUQUdSSURfU0FWRV9TVUNDRVNTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0FWRV9QQVJUSUFMX1NVQ0NFU1M6ICdQTEFURk9STV9EQVRBR1JJRF9TQVZFX1BBUlRJQUxfU1VDQ0VTUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NBVkVfRkFJTDogJ1BMQVRGT1JNX0RBVEFHUklEX1NBVkVfRkFJTCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NSRUFURTogJ1BMQVRGT1JNX0RBVEFHUklEX0NSRUFURScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0FERF9ORVdfSVRFTTogJ1BMQVRGT1JNX0RBVEFHUklEX0FERF9ORVdfSVRFTScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9JVEVNOiAnUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0lURU0nLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU06ICdQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU0nLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU1TOiAnUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRTogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9TVUNDRVNTOiAnUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX1NVQ0NFU1MnLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfRkFJTDogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9GQUlMJyxcbiAgUExBVEZPUk1fREFUQUdSSURfRURJVF9DRUxMX1ZBTFVFX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX0VESVRfQ0VMTF9WQUxVRV9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0VTOiAnUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0VTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0VMTF9ISURFX01FU1NBR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX0hJREVfTUVTU0FHRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX0hJREVfTUVTU0FHRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX1ZBTElEQVRFOiAnUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfVkFMSURBVEUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NFTEVDVElPTl9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NFTEVDVElPTl9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9JVEVNX1NFTEVDVElPTl9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9JVEVNX1NFTEVDVElPTl9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRUxFQ1RfQUxMX0lURU1TX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX1NFTEVDVF9BTExfSVRFTVNfQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0xFQVJfU0VMRUNURURfSVRFTVM6ICdQTEFURk9STV9EQVRBR1JJRF9DTEVBUl9TRUxFQ1RFRF9JVEVNUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1RPR0dMRV9GSUxURVJJTkc6ICdQTEFURk9STV9EQVRBR1JJRF9UT0dHTEVfRklMVEVSSU5HJyxcbiAgUExBVEZPUk1fREFUQUdSSURfRklMVEVSX0RBVEFfQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfRklMVEVSX0RBVEFfQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQVBQTFlfRklMVEVSUzogJ1BMQVRGT1JNX0RBVEFHUklEX0FQUExZX0ZJTFRFUlMnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRVRfRklMVEVSUzogJ1BMQVRGT1JNX0RBVEFHUklEX1NFVF9GSUxURVJTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfVVBEQVRFX0VYSVNUSU5HX0NFTExfVkFMVUU6ICdQTEFURk9STV9EQVRBR1JJRF9VUERBVEVfRVhJU1RJTkdfQ0VMTF9WQUxVRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NFVF9FRElUX0RBVEE6ICdQTEFURk9STV9EQVRBR1JJRF9TRVRfRURJVF9EQVRBJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX09QRU46ICdQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfT1BFTicsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFOiAnUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX1NBVkUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9GT1JDRV9SRUZSRVNIOiAnUExBVEZPUk1fREFUQUdSSURfRk9SQ0VfUkVGUkVTSCcsXG59O1xuXG5leHBvcnQgY29uc3QgaW52YWxpZGF0ZSA9IGdyaWQgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfSU5WQUxJREFURSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgZm9yY2VSZWZyZXNoID0gKCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIC8vIEZpcmUgcmVzaXplIGV2ZW50IHRvIHJlY2FsY3VsYXRlIGNvbXBvbmVudCBzaXplc1xuICAvLyBhbmQgdG8gZm9yY2UgcmVkcmF3IHRoZSBncmlkXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGlmIChkb2N1bWVudC5jcmVhdGVFdmVudCkge1xuICAgICAgY29uc3QgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKTtcbiAgICAgIGV2dC5pbml0RXZlbnQoJ3Jlc2l6ZScsIHRydWUsIGZhbHNlKTtcbiAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gICAgfVxuICB9LCAxKTtcbiAgZGlzcGF0Y2goeyB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9GT1JDRV9SRUZSRVNIIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldEJ1c3kgPSBncmlkID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0JVU1ksXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHNldFJlYWR5ID0gZ3JpZCA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRUFEWSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgYXBwbHlGaWx0ZXJzID0gKGdyaWQsIGNvbHVtbnMpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBpZiAoIWNvbHVtbnMgfHwgIWNvbHVtbnMuZm9yRWFjaCkgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG4gICAgaWYgKCFncmlkRGF0YSkgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IGZpbHRlckRhdGEgPSBncmlkRGF0YS5nZXRJbihbJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2ZpbHRlckRhdGEnXSwgTWFwKCkpO1xuICAgIGNvbnN0IGFsbERhdGEgPSBncmlkRGF0YS5nZXQoJ2FsbERhdGEnKTtcbiAgICBzZXRCdXN5KGdyaWQpKGRpc3BhdGNoKTtcbiAgICBsZXQgZGF0YTtcbiAgICBpZiAoZmlsdGVyRGF0YS5pc0VtcHR5KCkpIHtcbiAgICAgIGRhdGEgPSBhbGxEYXRhO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkYXRlRm9ybWF0ID0gVXRpbHMuZ2V0RGF0ZUZvcm1hdChncmlkLCBnZXRTdGF0ZSgpLnVzZXIpO1xuICAgICAgZGF0YSA9IGFsbERhdGEuZmlsdGVyKChyb3cpID0+IHtcbiAgICAgICAgbGV0IGhpdHMgPSAwO1xuICAgICAgICBmaWx0ZXJEYXRhLmZvckVhY2goKGZpbHRlclZhbHVlLCBmaWx0ZXJDb2x1bW4pID0+IHtcbiAgICAgICAgICBjb2x1bW5zLmZvckVhY2goKGNvbHVtbikgPT4ge1xuICAgICAgICAgICAgaWYgKFV0aWxzLmdldENvbHVtbktleShjb2x1bW4pID09PSBmaWx0ZXJDb2x1bW4pIHtcbiAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSByb3cuZ2V0SW4oY29sdW1uLnZhbHVlS2V5UGF0aCk7XG4gICAgICAgICAgICAgIGlmICh2YWx1ZSB8fCB2YWx1ZSA9PT0gMCB8fCB2YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJNYXRjaGVyID0gVXRpbHMuZ2V0RmlsdGVyTWF0Y2hlcihjb2x1bW4sIGRhdGVGb3JtYXQpO1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJNYXRjaGVyKHJvdywgZmlsdGVyVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICBoaXRzICs9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gaGl0cyA9PT0gZmlsdGVyRGF0YS5zaXplO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0FQUExZX0ZJTFRFUlMsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGRhdGEsXG4gICAgfSk7XG4gICAgc2V0UmVhZHkoZ3JpZCkoZGlzcGF0Y2gpO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG5leHBvcnQgY29uc3Qgc2V0QW5kQXBwbHlGaWx0ZXJzID0gKGdyaWQsIGNvbHVtbnMsIGZpbHRlcmluZ0RhdGEpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NFVF9GSUxURVJTLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBmaWx0ZXJpbmdEYXRhOiBVdGlscy5ub3JtYWxpemVGaWx0ZXJpbmdEYXRhKGZpbHRlcmluZ0RhdGEpLFxuICAgIH0pO1xuICAgIGRpc3BhdGNoKGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBmaWx0ZXJDZWxsVmFsdWVDaGFuZ2UgPSAoZ3JpZCwgY29sdW1ucywgY29sdW1uLCB2YWx1ZSkgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGNvbnN0IG9yaWdGaWx0ZXJEYXRhID0gZ2V0U3RhdGUoKVxuICAgICAgLmRhdGFncmlkXG4gICAgICAuZ2V0SW4oW2dyaWQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdmaWx0ZXJEYXRhJ10sIE1hcCgpKTtcbiAgICBjb25zdCBjb2x1bW5LZXkgPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sdW1uKTtcbiAgICBjb25zdCB2YWx1ZUVtcHR5Q2hlY2tlciA9IFV0aWxzLmdldFZhbHVlRW1wdHlDaGVja2VyKGNvbHVtbik7XG4gICAgbGV0IGZpbHRlckRhdGE7XG4gICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbHVlKSkge1xuICAgICAgZmlsdGVyRGF0YSA9IG9yaWdGaWx0ZXJEYXRhLmRlbGV0ZShjb2x1bW5LZXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaWx0ZXJEYXRhID0gb3JpZ0ZpbHRlckRhdGEuc2V0KGNvbHVtbktleSwgdmFsdWUpO1xuICAgIH1cbiAgICBVdGlscy5zYXZlRmlsdGVyRGF0YShncmlkLCBmaWx0ZXJEYXRhKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9GSUxURVJfREFUQV9DSEFOR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGZpbHRlckRhdGEsXG4gICAgfSk7XG4gICAgYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBhcHBseVNvcnQgPSAoZ3JpZCwgY29sdW1ucykgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGlmICghY29sdW1ucyB8fCAhY29sdW1ucy5mb3JFYWNoKSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3QgZ3JpZERhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldChncmlkLmlkKTtcbiAgICBpZiAoIWdyaWREYXRhKSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3Qgc29ydERhdGEgPSBncmlkRGF0YS5nZXRJbihbJ2NvbmZpZycsICdzb3J0aW5nRGF0YSddKTtcbiAgICBpZiAoIXNvcnREYXRhKSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3Qgc29ydENvbHVtbiA9IHNvcnREYXRhLmdldCgnc29ydENvbHVtbicpO1xuICAgIGlmICghc29ydENvbHVtbikgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IHNvcnRPcmRlciA9IHNvcnREYXRhLmdldCgnc29ydE9yZGVyJywgJ2FzYycpO1xuICAgIGxldCBjb2x1bW47XG4gICAgY29sdW1ucy5mb3JFYWNoKChjb2wpID0+IHtcbiAgICAgIGlmIChVdGlscy5nZXRDb2x1bW5LZXkoY29sKSA9PT0gc29ydENvbHVtbikge1xuICAgICAgICBjb2x1bW4gPSBjb2w7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKCFjb2x1bW4pIHJldHVybiBmYWxzZTtcblxuICAgIHNldEJ1c3koZ3JpZCkoZGlzcGF0Y2gpO1xuICAgIGNvbnN0IG9yaWdBbGxEYXRhID0gZ3JpZERhdGEuZ2V0KCdhbGxEYXRhJyk7XG4gICAgY29uc3QgY29tcGFyYXRvciA9IFV0aWxzLmdldFNvcnRDb21wYXJhdG9yKGNvbHVtbik7XG4gICAgY29uc3QgdmFsdWVHZXR0ZXIgPSBVdGlscy5nZXRTb3J0VmFsdWVHZXR0ZXIoY29sdW1uKTtcbiAgICBjb25zdCB2YWx1ZUVtcHR5Q2hlY2tlciA9IFV0aWxzLmdldFZhbHVlRW1wdHlDaGVja2VyKGNvbHVtbik7XG4gICAgY29uc3QgYWxsRGF0YSA9IG9yaWdBbGxEYXRhLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIGNvbnN0IHZhbEEgPSB2YWx1ZUdldHRlcihhKTtcbiAgICAgIGNvbnN0IHZhbEIgPSB2YWx1ZUdldHRlcihiKTtcbiAgICAgIGlmIChzb3J0T3JkZXIgPT09ICdhc2MnKSB7XG4gICAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxBKSkgcmV0dXJuIC0xO1xuICAgICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQikpIHJldHVybiAxO1xuICAgICAgICByZXR1cm4gY29tcGFyYXRvcih2YWxBLCB2YWxCKTtcbiAgICAgIH1cbiAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxBKSkgcmV0dXJuIDE7XG4gICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQikpIHJldHVybiAtMTtcbiAgICAgIHJldHVybiBjb21wYXJhdG9yKHZhbEIsIHZhbEEpO1xuICAgIH0pO1xuICAgIGxldCBkYXRhO1xuICAgIC8vIFNvcnQgYWxzbyBmaWx0ZXJlZCBkYXRhIHNlcGFyYXRlbHlcbiAgICBpZiAoZ3JpZERhdGEuZ2V0SW4oWydjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdpc0ZpbHRlcmluZyddLCBmYWxzZSkpIHtcbiAgICAgIGRhdGEgPSBncmlkRGF0YS5nZXQoJ2RhdGEnKS5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbEEgPSB2YWx1ZUdldHRlcihhKTtcbiAgICAgICAgY29uc3QgdmFsQiA9IHZhbHVlR2V0dGVyKGIpO1xuICAgICAgICBpZiAoc29ydE9yZGVyID09PSAnYXNjJykge1xuICAgICAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxBKSkgcmV0dXJuIC0xO1xuICAgICAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxCKSkgcmV0dXJuIDE7XG4gICAgICAgICAgcmV0dXJuIGNvbXBhcmF0b3IodmFsQSwgdmFsQik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEEpKSByZXR1cm4gMTtcbiAgICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEIpKSByZXR1cm4gLTE7XG4gICAgICAgIHJldHVybiBjb21wYXJhdG9yKHZhbEIsIHZhbEEpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGEgPSBhbGxEYXRhO1xuICAgIH1cbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9BUFBMWV9TT1JULFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBkYXRhLFxuICAgICAgYWxsRGF0YSxcbiAgICB9KTtcbiAgICBzZXRSZWFkeShncmlkKShkaXNwYXRjaCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBzb3J0Q2hhbmdlID0gKGdyaWQsIGNvbHVtbnMsIGNvbHVtbiwgbmV3U29ydCkgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGNvbnN0IHNvcnRPcmRlciA9IG5ld1NvcnQgfHwgJ2FzYyc7XG4gICAgY29uc3Qgc29ydENvbHVtbiA9IFV0aWxzLmdldENvbHVtbktleShjb2x1bW4pO1xuICAgIFV0aWxzLnNhdmVTb3J0RGF0YShncmlkLCB7IHNvcnRDb2x1bW4sIHNvcnRPcmRlciB9KTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TT1JUX0NIQU5HRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgc29ydENvbHVtbixcbiAgICAgIHNvcnRPcmRlcixcbiAgICB9KTtcbiAgICBhcHBseVNvcnQoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHNldERhdGEgPSAoZ3JpZCwgY29sdW1ucywgZGF0YSkgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIFV0aWxzLmNoZWNrQ29sdW1uc1BhcmFtKGNvbHVtbnMpO1xuICAgIGNvbnN0IGNvbmZpZ0RhdGEgPSBVdGlscy5sb2FkR3JpZENvbmZpZyhncmlkLCBjb2x1bW5zKTtcbiAgICBjb25zdCBpbW11dGFibGVEYXRhID0gSW1tdXRhYmxlLkl0ZXJhYmxlLmlzSXRlcmFibGUoZGF0YSkgPyBkYXRhIDogSW1tdXRhYmxlLmZyb21KUyhkYXRhKTtcbiAgICBjb25zdCBzZWxlY3RlZEl0ZW1zID0gVXRpbHMubG9hZFNlbGVjdGVkSXRlbXMoZ3JpZCkuZmlsdGVyKGl0ZW0gPT4gKFxuICAgICAgISFpbW11dGFibGVEYXRhLmZpbmQoZGF0YUl0ZW0gPT4gZGF0YUl0ZW0uZ2V0SW4oZ3JpZC5pZEtleVBhdGgpID09PSBpdGVtKVxuICAgICkpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NFVF9EQVRBLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBkYXRhOiBpbW11dGFibGVEYXRhLFxuICAgICAgY29uZmlnOiBjb25maWdEYXRhLFxuICAgICAgc2VsZWN0ZWRJdGVtcyxcbiAgICB9KTtcbiAgICBhcHBseUZpbHRlcnMoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgICBhcHBseVNvcnQoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGV4dGVuZERhdGEgPSAoZ3JpZCwgY29sdW1ucywgZGF0YSwgcHJlcGVuZCA9IGZhbHNlKSA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgY29uc3QgaW1tdXRhYmxlRGF0YSA9IEltbXV0YWJsZS5JdGVyYWJsZS5pc0l0ZXJhYmxlKGRhdGEpID8gZGF0YSA6IEltbXV0YWJsZS5mcm9tSlMoZGF0YSk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfRVhURU5EX0RBVEEsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGRhdGE6IGltbXV0YWJsZURhdGEsXG4gICAgICBwcmVwZW5kLFxuICAgIH0pO1xuICAgIGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICAgIGFwcGx5U29ydChncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICB9O1xuXG5leHBvcnQgY29uc3QgcmVzaXplQ29sdW1uID0gKGdyaWQsIGNvbHVtbktleSwgd2lkdGgpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBjb25zdCBjb2x1bW5XaWR0aHMgPSBnZXRTdGF0ZSgpXG4gICAgICAuZGF0YWdyaWRcbiAgICAgIC5nZXRJbihbZ3JpZC5pZCwgJ2NvbmZpZycsICdjb2x1bW5XaWR0aHMnXSwgTWFwKCkpXG4gICAgICAuc2V0KGNvbHVtbktleSwgd2lkdGgpO1xuICAgIFV0aWxzLnNhdmVDb2x1bW5XaWR0aHMoZ3JpZCwgY29sdW1uV2lkdGhzKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRVNJWkVfQ09MVU1OLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBjb2x1bW5XaWR0aHMsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBlZGl0ID0gZ3JpZCA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9FRElULFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBjYW5jZWwgPSBncmlkID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NBTkNFTCxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3Qgc2F2ZSA9IChncmlkLCBjYiA9ICgpID0+IHt9KSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TQVZFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgfSk7XG4gICAgY2IoKTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHNhdmVTdWNjZXNzID0gKGdyaWQsIGNvbHVtbnMsIHNhdmVkSXRlbXMpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TQVZFX1NVQ0NFU1MsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgICBzYXZlZEl0ZW1zLFxuICAgIH0pO1xuICAgIGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICAgIGFwcGx5U29ydChncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICB9O1xuXG5leHBvcnQgY29uc3Qgc2F2ZVBhcnRpYWxTdWNjZXNzID0gKGdyaWQsIGNvbHVtbnMsIHNhdmVkSXRlbXMpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TQVZFX1BBUlRJQUxfU1VDQ0VTUyxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgICAgIHNhdmVkSXRlbXMsXG4gICAgfSk7XG4gICAgYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gICAgYXBwbHlTb3J0KGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBzYXZlRmFpbCA9IGdyaWQgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0FWRV9GQUlMLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGUgPSAoZ3JpZCwgY29sdW1uRGVmYXVsdFZhbHVlcykgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBjb2x1bW5EZWZhdWx0VmFsdWVzLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgYWRkTmV3SXRlbSA9IChncmlkLCBjb2x1bW5EZWZhdWx0VmFsdWVzKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9BRERfTkVXX0lURU0sXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGNvbHVtbkRlZmF1bHRWYWx1ZXMsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVJdGVtID0gKGdyaWQsIHJvd0lkKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfSVRFTSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgICAgIHJvd0lkLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlTmV3SXRlbSA9IChncmlkLCBpbmRleCkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBpbmRleCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZU5ld0l0ZW1zID0gKGdyaWQsIGluZGV4ZXMpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTVMsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGluZGV4ZXMsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCByZW1vdmUgPSAoZ3JpZCwgY2IgPSAoKSA9PiB7fSkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgfSk7XG4gICAgY2IoKTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZVN1Y2Nlc3MgPSAoZ3JpZCwgcmVtb3ZlZElkcykgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX1NVQ0NFU1MsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgICByZW1vdmVkSWRzLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlRmFpbCA9IGdyaWQgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUwsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGVkaXRDZWxsVmFsdWVDaGFuZ2UgPSAoZ3JpZCwgZGF0YUlkLCBrZXlQYXRoLCB2YWx1ZSkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfRURJVF9DRUxMX1ZBTFVFX0NIQU5HRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgZGF0YUlkLFxuICAgICAga2V5UGF0aCxcbiAgICAgIHZhbHVlLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgZWRpdENlbGxWYWx1ZVZhbGlkYXRlID0gKFxuICBncmlkLFxuICBkYXRhSWQsXG4gIGtleVBhdGgsXG4gIHZhbHVlLFxuICB2YWxpZGF0b3JzID0gW10sXG4pID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBsZXQgdmFsaWRhdGlvblN0YXRlID0geyB2YWxpZDogdHJ1ZSB9O1xuICAgIHZhbGlkYXRvcnMuZm9yRWFjaCgodmFsaWRhdG9yKSA9PiB7XG4gICAgICBpZiAodmFsaWRhdGlvblN0YXRlLnZhbGlkKSB7XG4gICAgICAgIGlmICh2YWxpZGF0b3IudW5pcXVlKSB7XG4gICAgICAgICAgaWYgKHZhbHVlICE9PSAnJyB8fCB2YWx1ZSAhPT0gbnVsbCB8fCB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBjb21iaW5lIHJlYWwgZGF0YSB3aXRoIGN1cnJlbnQgdW5zYXZlZCBlZGl0ZWQgZGF0YVxuICAgICAgICAgICAgY29uc3QgZ3JpZERhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldChncmlkLmlkKTtcbiAgICAgICAgICAgIGNvbnN0IGVkaXREYXRhID0gZ3JpZERhdGEuZ2V0KCdlZGl0RGF0YScpO1xuICAgICAgICAgICAgbGV0IGFsbERhdGEgPSBncmlkRGF0YS5nZXQoJ2FsbERhdGEnKTtcbiAgICAgICAgICAgIGlmIChlZGl0RGF0YSkge1xuICAgICAgICAgICAgICBlZGl0RGF0YS5mb3JFYWNoKChlZGl0RGF0YUl0ZW0sIGVkaXREYXRhSXRlbUlkKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZm91bmRJbmRleCA9XG4gICAgICAgICAgICAgICAgICBhbGxEYXRhLmZpbmRJbmRleChkID0+IGQuZ2V0SW4oZ3JpZC5pZEtleVBhdGgpID09PSBlZGl0RGF0YUl0ZW1JZCk7XG4gICAgICAgICAgICAgICAgaWYgKGZvdW5kSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICBhbGxEYXRhID0gYWxsRGF0YS5tZXJnZURlZXBJbihbZm91bmRJbmRleF0sIGVkaXREYXRhSXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGRldGVybWluZSB1bmlxdWVuZXNzXG4gICAgICAgICAgICBjb25zdCBmaW5kaW5nID0gYWxsRGF0YS5maW5kKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChncmlkLmlkS2V5UGF0aC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAvLyBkb24ndCBzZWxmIGNvbXBhcmVcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGRhdGFJZCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gaXRlbS5nZXRJbihrZXlQYXRoKSA9PT0gdmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChmaW5kaW5nKSB7XG4gICAgICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICB2YWxpZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ1ZhbGlkYXRpb24uVW5pcXVlJyxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodmFsaWRhdG9yLnZhbGlkYXRlV2l0aFJvd0RhdGEpIHtcbiAgICAgICAgICBjb25zdCBncmlkRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0KGdyaWQuaWQpO1xuICAgICAgICAgIGNvbnN0IGVkaXREYXRhID0gZ3JpZERhdGEuZ2V0SW4oWydlZGl0RGF0YScsIGRhdGFJZF0sIE1hcCgpKTtcbiAgICAgICAgICBsZXQgcm93RGF0YSA9IGdyaWREYXRhLmdldCgnYWxsRGF0YScpLmZpbmQoaXRlbSA9PiBpdGVtLmdldEluKGdyaWQuaWRLZXlQYXRoKSA9PT0gZGF0YUlkKTtcbiAgICAgICAgICBpZiAocm93RGF0YSkge1xuICAgICAgICAgICAgcm93RGF0YSA9IHJvd0RhdGEubWVyZ2VEZWVwKGVkaXREYXRhKTtcbiAgICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZVdpdGhSb3dEYXRhKHZhbHVlLCByb3dEYXRhKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgcGFyYW1zID0gdmFsaWRhdG9yLnBhcmFtcyA/IE9iamVjdC52YWx1ZXModmFsaWRhdG9yLnBhcmFtcykgOiBbXTtcbiAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB2YWxpZGF0b3IudmFsaWRhdGUodmFsdWUsIC4uLnBhcmFtcyk7XG4gICAgICAgICAgaWYgKHZhbGlkYXRvci5wYXJhbXMpIHtcbiAgICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlVmFsdWVzID0gdmFsaWRhdG9yLnBhcmFtcztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAodmFsaWRhdGlvblN0YXRlLnZhbGlkKSB7XG4gICAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfSElERV9NRVNTQUdFLFxuICAgICAgICBpZDogZ3JpZC5pZCxcbiAgICAgICAgbWVzc2FnZVR5cGU6ICdlcnJvcicsXG4gICAgICAgIGRhdGFJZCxcbiAgICAgICAga2V5UGF0aCxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFLFxuICAgICAgICBpZDogZ3JpZC5pZCxcbiAgICAgICAgbWVzc2FnZVR5cGU6ICdlcnJvcicsXG4gICAgICAgIGRhdGFJZCxcbiAgICAgICAga2V5UGF0aCxcbiAgICAgICAgbWVzc2FnZUlkOiB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZSxcbiAgICAgICAgbWVzc2FnZVZhbHVlczogdmFsaWRhdGlvblN0YXRlLm1lc3NhZ2VWYWx1ZXMsXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbGlkYXRpb25TdGF0ZS52YWxpZDtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSA9IChncmlkLCByb3dJbmRleCwga2V5UGF0aCwgdmFsdWUpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX0NIQU5HRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgcm93SW5kZXgsXG4gICAgICBrZXlQYXRoLFxuICAgICAgdmFsdWUsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZSA9IChncmlkLCByb3dJbmRleCwga2V5UGF0aCwgdmFsdWUsIHZhbGlkYXRvcnMgPSBbXSkgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGxldCB2YWxpZGF0aW9uU3RhdGUgPSB7IHZhbGlkOiB0cnVlIH07XG4gICAgdmFsaWRhdG9ycy5mb3JFYWNoKCh2YWxpZGF0b3IpID0+IHtcbiAgICAgIGlmICh2YWxpZGF0aW9uU3RhdGUudmFsaWQpIHtcbiAgICAgICAgaWYgKHZhbGlkYXRvci51bmlxdWUpIHtcbiAgICAgICAgICBpZiAodmFsdWUgIT09ICcnIHx8IHZhbHVlICE9PSBudWxsIHx8IHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpbmRpbmcgPSBnZXRTdGF0ZSgpXG4gICAgICAgICAgICAgIC5kYXRhZ3JpZFxuICAgICAgICAgICAgICAuZ2V0SW4oW2dyaWQuaWQsICdhbGxEYXRhJ10pXG4gICAgICAgICAgICAgIC5maW5kKGl0ZW0gPT4gaXRlbS5nZXRJbihrZXlQYXRoKSA9PT0gdmFsdWUpO1xuICAgICAgICAgICAgaWYgKGZpbmRpbmcpIHtcbiAgICAgICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0ge1xuICAgICAgICAgICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnVmFsaWRhdGlvbi5VbmlxdWUnLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc3QgZmluZDIgPSBnZXRTdGF0ZSgpXG4gICAgICAgICAgICAgICAgLmRhdGFncmlkXG4gICAgICAgICAgICAgICAgLmdldEluKFtncmlkLmlkLCAnY3JlYXRlRGF0YSddKVxuICAgICAgICAgICAgICAgIC5maW5kKChpdGVtLCBpKSA9PiBpICE9PSByb3dJbmRleCAmJiBpdGVtLmdldEluKGtleVBhdGgpID09PSB2YWx1ZSk7XG4gICAgICAgICAgICAgIGlmIChmaW5kMikge1xuICAgICAgICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdWYWxpZGF0aW9uLlVuaXF1ZScsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh2YWxpZGF0b3IudmFsaWRhdGVXaXRoUm93RGF0YSkge1xuICAgICAgICAgIGNvbnN0IHJvd0RhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnY3JlYXRlRGF0YScsIHJvd0luZGV4XSk7XG4gICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0gdmFsaWRhdG9yLnZhbGlkYXRlV2l0aFJvd0RhdGEodmFsdWUsIHJvd0RhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IHZhbGlkYXRvci5wYXJhbXMgPyBPYmplY3QudmFsdWVzKHZhbGlkYXRvci5wYXJhbXMpIDogW107XG4gICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0gdmFsaWRhdG9yLnZhbGlkYXRlKHZhbHVlLCAuLi5wYXJhbXMpO1xuICAgICAgICAgIGlmICh2YWxpZGF0b3IucGFyYW1zKSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZVZhbHVlcyA9IHZhbGlkYXRvci5wYXJhbXM7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKHZhbGlkYXRpb25TdGF0ZS52YWxpZCkge1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9ISURFX01FU1NBR0UsXG4gICAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgICBtZXNzYWdlVHlwZTogJ2Vycm9yJyxcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIGtleVBhdGgsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9TSE9XX01FU1NBR0UsXG4gICAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgICBtZXNzYWdlVHlwZTogJ2Vycm9yJyxcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIGtleVBhdGgsXG4gICAgICAgIG1lc3NhZ2VJZDogdmFsaWRhdGlvblN0YXRlLm1lc3NhZ2UsXG4gICAgICAgIG1lc3NhZ2VWYWx1ZXM6IHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlVmFsdWVzLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB2YWxpZGF0aW9uU3RhdGUudmFsaWQ7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBjZWxsU2hvd01lc3NhZ2UgPSAoZ3JpZCwgbWVzc2FnZVR5cGUsIGRhdGFJZCwga2V5UGF0aCwgbWVzc2FnZUlkLCBtZXNzYWdlVmFsdWVzKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgbWVzc2FnZVR5cGUsXG4gICAgICBkYXRhSWQsXG4gICAgICBrZXlQYXRoLFxuICAgICAgbWVzc2FnZUlkLFxuICAgICAgbWVzc2FnZVZhbHVlcyxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGNlbGxTaG93TWVzc2FnZXMgPSAoZ3JpZCwgbWVzc2FnZXMpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFUyxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgbWVzc2FnZXMsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBjZWxsSGlkZU1lc3NhZ2UgPSAoZ3JpZCwgbWVzc2FnZVR5cGUgPSBudWxsLCBkYXRhSWQgPSBudWxsLCBrZXlQYXRoID0gbnVsbCkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0VMTF9ISURFX01FU1NBR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIG1lc3NhZ2VUeXBlLFxuICAgICAgZGF0YUlkLFxuICAgICAga2V5UGF0aCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNlbGxTaG93TWVzc2FnZSA9IChcbiAgZ3JpZCxcbiAgbWVzc2FnZVR5cGUsXG4gIHJvd0luZGV4LFxuICBrZXlQYXRoLFxuICBtZXNzYWdlSWQsXG4gIG1lc3NhZ2VWYWx1ZXMsXG4pID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgbWVzc2FnZVR5cGUsXG4gICAgICByb3dJbmRleCxcbiAgICAgIGtleVBhdGgsXG4gICAgICBtZXNzYWdlSWQsXG4gICAgICBtZXNzYWdlVmFsdWVzLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQ2VsbEhpZGVNZXNzYWdlID0gKGdyaWQsIG1lc3NhZ2VUeXBlID0gbnVsbCwgcm93SW5kZXggPSBudWxsLCBrZXlQYXRoID0gbnVsbCkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfSElERV9NRVNTQUdFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBtZXNzYWdlVHlwZSxcbiAgICAgIHJvd0luZGV4LFxuICAgICAga2V5UGF0aCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGNlbGxTZWxlY3Rpb25DaGFuZ2UgPSAoZ3JpZCwgc2VsZWN0ZWRDZWxsID0gbnVsbCkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgc2VsZWN0ZWRDZWxsLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX1NFTEVDVElPTl9DSEFOR0UsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBpdGVtU2VsZWN0aW9uQ2hhbmdlID0gKFxuICBncmlkLFxuICByb3dJbmRleCxcbiAgY3RybFByZXNzZWQgPSBmYWxzZSxcbiAgc2hpZnRQcmVzc2VkID0gZmFsc2UsXG4pID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9JVEVNX1NFTEVDVElPTl9DSEFOR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIHJvd0luZGV4LFxuICAgICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgICAgIGN0cmxQcmVzc2VkLFxuICAgICAgc2hpZnRQcmVzc2VkLFxuICAgIH0pO1xuICAgIFV0aWxzLnNhdmVTZWxlY3RlZEl0ZW1zKGdyaWQsIGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdzZWxlY3RlZEl0ZW1zJ10pKTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdEFsbEl0ZW1zQ2hhbmdlID0gZ3JpZCA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgfSk7XG4gICAgVXRpbHMuc2F2ZVNlbGVjdGVkSXRlbXMoZ3JpZCwgZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ3NlbGVjdGVkSXRlbXMnXSkpO1xuICB9O1xuXG5leHBvcnQgY29uc3QgY2xlYXJTZWxlY3RlZEl0ZW1zID0gZ3JpZCA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0xFQVJfU0VMRUNURURfSVRFTVMsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICB9KTtcbiAgICBVdGlscy5zYXZlU2VsZWN0ZWRJdGVtcyhncmlkLCBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnc2VsZWN0ZWRJdGVtcyddKSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCB0b2dnbGVGaWx0ZXJpbmcgPSBncmlkID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBjb25zdCBpc0ZpbHRlcmluZyA9ICFnZXRTdGF0ZSgpXG4gICAgICAuZGF0YWdyaWRcbiAgICAgIC5nZXRJbihbZ3JpZC5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2lzRmlsdGVyaW5nJ10sIGZhbHNlKTtcbiAgICBVdGlscy5zYXZlSXNGaWx0ZXJpbmcoZ3JpZCwgaXNGaWx0ZXJpbmcpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1RPR0dMRV9GSUxURVJJTkcsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGlzRmlsdGVyaW5nLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgdmFsaWRhdGVFZGl0ZWRSb3dzID0gKGdyaWQsIGNvbHVtbnMpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBjb25zdCBncmlkRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0KGdyaWQuaWQpO1xuICAgIGNvbnN0IGVkaXREYXRhID0gZ3JpZERhdGEuZ2V0KCdlZGl0RGF0YScsIE1hcCgpKTtcbiAgICBsZXQgYWxsR29vZCA9IHRydWU7XG4gICAgZWRpdERhdGEuZm9yRWFjaCgoZWRpdERhdGFSb3csIGRhdGFJZCkgPT4ge1xuICAgICAgY29sdW1ucy5mb3JFYWNoKChjb2wpID0+IHtcbiAgICAgICAgbGV0IHZhbHVlID0gZWRpdERhdGFSb3cuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdmFsdWUgPSBncmlkRGF0YVxuICAgICAgICAgICAgLmdldCgnYWxsRGF0YScpXG4gICAgICAgICAgICAuZmluZChkYXRhID0+IGRhdGEuZ2V0SW4oZ3JpZC5pZEtleVBhdGgpID09PSBkYXRhSWQpXG4gICAgICAgICAgICAuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXNWYWxpZCA9IGVkaXRDZWxsVmFsdWVWYWxpZGF0ZShcbiAgICAgICAgICBncmlkLFxuICAgICAgICAgIGRhdGFJZCxcbiAgICAgICAgICBjb2wudmFsdWVLZXlQYXRoLFxuICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgIGNvbC52YWxpZGF0b3JzLFxuICAgICAgICApKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gICAgICAgIGlmIChhbGxHb29kICYmICFpc1ZhbGlkKSB7XG4gICAgICAgICAgYWxsR29vZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gYWxsR29vZDtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZUVtcHR5Q3JlYXRlZFJvd3MgPSAoZ3JpZCwgY29sdW1ucykgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGNvbnN0IGNyZWF0ZURhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnY3JlYXRlRGF0YSddLCBNYXAoKSk7XG4gICAgY29uc3QgaW5kZXhlcyA9IFtdO1xuICAgIGNyZWF0ZURhdGEuZm9yRWFjaCgoY3JlYXRlRGF0YVJvdywgcm93SW5kZXgpID0+IHtcbiAgICAgIGxldCBpc0VtcHR5ID0gdHJ1ZTtcbiAgICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gY3JlYXRlRGF0YVJvdy5nZXRJbihjb2wudmFsdWVLZXlQYXRoKTtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09ICcnICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgaXNFbXB0eSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChpc0VtcHR5KSB7XG4gICAgICAgIGluZGV4ZXMucHVzaChyb3dJbmRleCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGluZGV4ZXMubGVuZ3RoID4gMCkge1xuICAgICAgcmVtb3ZlTmV3SXRlbXMoZ3JpZCwgaW5kZXhlcykoZGlzcGF0Y2gpO1xuICAgIH1cbiAgfTtcblxuZXhwb3J0IGNvbnN0IHZhbGlkYXRlQ3JlYXRlZFJvd3MgPSAoZ3JpZCwgY29sdW1ucykgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIHJlbW92ZUVtcHR5Q3JlYXRlZFJvd3MoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgICBjb25zdCBjcmVhdGVEYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ2NyZWF0ZURhdGEnXSwgTWFwKCkpO1xuICAgIGxldCBhbGxHb29kID0gdHJ1ZTtcbiAgICBjcmVhdGVEYXRhLmZvckVhY2goKGNyZWF0ZURhdGFSb3csIHJvd0luZGV4KSA9PiB7XG4gICAgICBjb2x1bW5zLmZvckVhY2goKGNvbCkgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGNyZWF0ZURhdGFSb3cuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG4gICAgICAgIGNvbnN0IGlzVmFsaWQgPSBjcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZShcbiAgICAgICAgICBncmlkLFxuICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgIGNvbC52YWx1ZUtleVBhdGgsXG4gICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgY29sLnZhbGlkYXRvcnMsXG4gICAgICAgICkoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgICAgICAgaWYgKGFsbEdvb2QgJiYgIWlzVmFsaWQpIHtcbiAgICAgICAgICBhbGxHb29kID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBhbGxHb29kO1xuICB9O1xuXG5leHBvcnQgY29uc3QgdXBkYXRlRXhpc3RpbmdDZWxsVmFsdWUgPSAoZ3JpZCwgZGF0YUlkLCBrZXlQYXRoLCB2YWx1ZSkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfVVBEQVRFX0VYSVNUSU5HX0NFTExfVkFMVUUsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGRhdGFJZCxcbiAgICAgIGtleVBhdGgsXG4gICAgICB2YWx1ZSxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHNldEVkaXREYXRhID0gKGdyaWQsIGRhdGEsIGNlbGxNZXNzYWdlcyA9IE1hcCgpKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICBkYXRhLFxuICAgICAgY2VsbE1lc3NhZ2VzLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfRURJVF9EQVRBLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3Qgb3BlbkNvbHVtblNldHRpbmdzTW9kYWwgPSBncmlkID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9PUEVOLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBjbG9zZUNvbHVtblNldHRpbmdzTW9kYWwgPSBncmlkID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3Qgc2F2ZUNvbHVtblNldHRpbmdzID0gKGdyaWQsIGhpZGRlbkNvbHVtbnMsIGNvbHVtbk9yZGVyKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBVdGlscy5zYXZlQ29sdW1uU2V0dGluZ3MoZ3JpZCwgaGlkZGVuQ29sdW1ucywgY29sdW1uT3JkZXIpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBjb2x1bW5PcmRlcixcbiAgICB9KTtcbiAgfTtcblxuIl19