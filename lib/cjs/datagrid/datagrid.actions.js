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

var removeItem = exports.removeItem = function removeItem(grid, index) {
  return function (dispatch) {
    _datagrid2.default.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_REMOVE_ITEM,
      id: grid.id,
      idKeyPath: grid.idKeyPath,
      index: index
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5hY3Rpb25zLmpzIl0sIm5hbWVzIjpbIlRZUEVTIiwiUExBVEZPUk1fREFUQUdSSURfSU5WQUxJREFURSIsIlBMQVRGT1JNX0RBVEFHUklEX0JVU1kiLCJQTEFURk9STV9EQVRBR1JJRF9SRUFEWSIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9EQVRBIiwiUExBVEZPUk1fREFUQUdSSURfQVBQTFlfU09SVCIsIlBMQVRGT1JNX0RBVEFHUklEX1NPUlRfQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfUkVTSVpFX0NPTFVNTiIsIlBMQVRGT1JNX0RBVEFHUklEX0VESVQiLCJQTEFURk9STV9EQVRBR1JJRF9DQU5DRUwiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFIiwiUExBVEZPUk1fREFUQUdSSURfRVhURU5EX0RBVEEiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFX1NVQ0NFU1MiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFX1BBUlRJQUxfU1VDQ0VTUyIsIlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfRkFJTCIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURSIsIlBMQVRGT1JNX0RBVEFHUklEX0FERF9ORVdfSVRFTSIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9JVEVNIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNUyIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRSIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9TVUNDRVNTIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUwiLCJQTEFURk9STV9EQVRBR1JJRF9FRElUX0NFTExfVkFMVUVfQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0UiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRVMiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX0hJREVfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX0NIQU5HRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX1ZBTElEQVRFIiwiUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TRUxFQ1RJT05fQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9DTEVBUl9TRUxFQ1RFRF9JVEVNUyIsIlBMQVRGT1JNX0RBVEFHUklEX1RPR0dMRV9GSUxURVJJTkciLCJQTEFURk9STV9EQVRBR1JJRF9GSUxURVJfREFUQV9DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9GSUxURVJTIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX0ZJTFRFUlMiLCJQTEFURk9STV9EQVRBR1JJRF9VUERBVEVfRVhJU1RJTkdfQ0VMTF9WQUxVRSIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9FRElUX0RBVEEiLCJQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfT1BFTiIsIlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFIiwiUExBVEZPUk1fREFUQUdSSURfRk9SQ0VfUkVGUkVTSCIsImludmFsaWRhdGUiLCJkaXNwYXRjaCIsIlV0aWxzIiwiY2hlY2tHcmlkUGFyYW0iLCJncmlkIiwidHlwZSIsImlkIiwiZm9yY2VSZWZyZXNoIiwic2V0VGltZW91dCIsImRvY3VtZW50IiwiY3JlYXRlRXZlbnQiLCJldnQiLCJpbml0RXZlbnQiLCJ3aW5kb3ciLCJkaXNwYXRjaEV2ZW50Iiwic2V0QnVzeSIsInNldFJlYWR5IiwiYXBwbHlGaWx0ZXJzIiwiY29sdW1ucyIsImdldFN0YXRlIiwiZm9yRWFjaCIsImdyaWREYXRhIiwiZGF0YWdyaWQiLCJnZXQiLCJmaWx0ZXJEYXRhIiwiZ2V0SW4iLCJhbGxEYXRhIiwiZGF0YSIsImlzRW1wdHkiLCJkYXRlRm9ybWF0IiwiZ2V0RGF0ZUZvcm1hdCIsInVzZXIiLCJmaWx0ZXIiLCJyb3ciLCJoaXRzIiwiZmlsdGVyVmFsdWUiLCJmaWx0ZXJDb2x1bW4iLCJjb2x1bW4iLCJnZXRDb2x1bW5LZXkiLCJyb3dEYXRhIiwidmFsdWVLZXlQYXRoIiwiZmlsdGVyTWF0Y2hlciIsImdldEZpbHRlck1hdGNoZXIiLCJzaXplIiwic2V0QW5kQXBwbHlGaWx0ZXJzIiwiZmlsdGVyaW5nRGF0YSIsIm5vcm1hbGl6ZUZpbHRlcmluZ0RhdGEiLCJmaWx0ZXJDZWxsVmFsdWVDaGFuZ2UiLCJ2YWx1ZSIsIm9yaWdGaWx0ZXJEYXRhIiwiY29sdW1uS2V5IiwidmFsdWVFbXB0eUNoZWNrZXIiLCJnZXRWYWx1ZUVtcHR5Q2hlY2tlciIsImRlbGV0ZSIsInNldCIsInNhdmVGaWx0ZXJEYXRhIiwiYXBwbHlTb3J0Iiwic29ydERhdGEiLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwiY29sIiwib3JpZ0FsbERhdGEiLCJjb21wYXJhdG9yIiwiZ2V0U29ydENvbXBhcmF0b3IiLCJ2YWx1ZUdldHRlciIsImdldFNvcnRWYWx1ZUdldHRlciIsInNvcnQiLCJhIiwiYiIsInZhbEEiLCJ2YWxCIiwic29ydENoYW5nZSIsIm5ld1NvcnQiLCJzYXZlU29ydERhdGEiLCJzZXREYXRhIiwiY2hlY2tDb2x1bW5zUGFyYW0iLCJjb25maWdEYXRhIiwibG9hZEdyaWRDb25maWciLCJpbW11dGFibGVEYXRhIiwiSW1tdXRhYmxlIiwiSXRlcmFibGUiLCJpc0l0ZXJhYmxlIiwiZnJvbUpTIiwic2VsZWN0ZWRJdGVtcyIsImxvYWRTZWxlY3RlZEl0ZW1zIiwiZmluZCIsImRhdGFJdGVtIiwiaWRLZXlQYXRoIiwiaXRlbSIsImNvbmZpZyIsImV4dGVuZERhdGEiLCJyZXNpemVDb2x1bW4iLCJ3aWR0aCIsImNvbHVtbldpZHRocyIsInNhdmVDb2x1bW5XaWR0aHMiLCJlZGl0IiwiY2FuY2VsIiwic2F2ZSIsImNiIiwic2F2ZVN1Y2Nlc3MiLCJzYXZlZEl0ZW1zIiwic2F2ZVBhcnRpYWxTdWNjZXNzIiwic2F2ZUZhaWwiLCJjcmVhdGUiLCJjb2x1bW5EZWZhdWx0VmFsdWVzIiwiYWRkTmV3SXRlbSIsInJlbW92ZUl0ZW0iLCJpbmRleCIsInJlbW92ZU5ld0l0ZW0iLCJyZW1vdmVOZXdJdGVtcyIsImluZGV4ZXMiLCJyZW1vdmUiLCJyZW1vdmVTdWNjZXNzIiwicmVtb3ZlZElkcyIsInJlbW92ZUZhaWwiLCJlZGl0Q2VsbFZhbHVlQ2hhbmdlIiwiZGF0YUlkIiwia2V5UGF0aCIsImVkaXRDZWxsVmFsdWVWYWxpZGF0ZSIsInZhbGlkYXRvcnMiLCJ2YWxpZGF0aW9uU3RhdGUiLCJ2YWxpZCIsInZhbGlkYXRvciIsInVuaXF1ZSIsInVuZGVmaW5lZCIsImVkaXREYXRhIiwiZWRpdERhdGFJdGVtIiwiZWRpdERhdGFJdGVtSWQiLCJmb3VuZEluZGV4IiwiZmluZEluZGV4IiwiZCIsIm1lcmdlRGVlcEluIiwiZmluZGluZyIsImxlbmd0aCIsIm1lc3NhZ2UiLCJ2YWxpZGF0ZVdpdGhSb3dEYXRhIiwibWVyZ2VEZWVwIiwicGFyYW1zIiwiT2JqZWN0IiwidmFsdWVzIiwidmFsaWRhdGUiLCJtZXNzYWdlVmFsdWVzIiwibWVzc2FnZVR5cGUiLCJtZXNzYWdlSWQiLCJjcmVhdGVDZWxsVmFsdWVDaGFuZ2UiLCJyb3dJbmRleCIsImNyZWF0ZUNlbGxWYWx1ZVZhbGlkYXRlIiwiZmluZDIiLCJpIiwiY2VsbFNob3dNZXNzYWdlIiwiY2VsbFNob3dNZXNzYWdlcyIsIm1lc3NhZ2VzIiwiY2VsbEhpZGVNZXNzYWdlIiwiY3JlYXRlQ2VsbFNob3dNZXNzYWdlIiwiY3JlYXRlQ2VsbEhpZGVNZXNzYWdlIiwiY2VsbFNlbGVjdGlvbkNoYW5nZSIsInNlbGVjdGVkQ2VsbCIsIml0ZW1TZWxlY3Rpb25DaGFuZ2UiLCJjdHJsUHJlc3NlZCIsInNoaWZ0UHJlc3NlZCIsInNhdmVTZWxlY3RlZEl0ZW1zIiwic2VsZWN0QWxsSXRlbXNDaGFuZ2UiLCJjbGVhclNlbGVjdGVkSXRlbXMiLCJ0b2dnbGVGaWx0ZXJpbmciLCJpc0ZpbHRlcmluZyIsInNhdmVJc0ZpbHRlcmluZyIsInZhbGlkYXRlRWRpdGVkUm93cyIsImFsbEdvb2QiLCJlZGl0RGF0YVJvdyIsImlzVmFsaWQiLCJyZW1vdmVFbXB0eUNyZWF0ZWRSb3dzIiwiY3JlYXRlRGF0YSIsImNyZWF0ZURhdGFSb3ciLCJwdXNoIiwidmFsaWRhdGVDcmVhdGVkUm93cyIsInVwZGF0ZUV4aXN0aW5nQ2VsbFZhbHVlIiwic2V0RWRpdERhdGEiLCJjZWxsTWVzc2FnZXMiLCJvcGVuQ29sdW1uU2V0dGluZ3NNb2RhbCIsImNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbCIsInNhdmVDb2x1bW5TZXR0aW5ncyIsImhpZGRlbkNvbHVtbnMiLCJjb2x1bW5PcmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7QUFFTyxJQUFNQSx3QkFBUTtBQUNuQkMsZ0NBQThCLDhCQURYO0FBRW5CQywwQkFBd0Isd0JBRkw7QUFHbkJDLDJCQUF5Qix5QkFITjtBQUluQkMsOEJBQTRCLDRCQUpUO0FBS25CQyxnQ0FBOEIsOEJBTFg7QUFNbkJDLGlDQUErQiwrQkFOWjtBQU9uQkMsbUNBQWlDLGlDQVBkO0FBUW5CQywwQkFBd0Isd0JBUkw7QUFTbkJDLDRCQUEwQiwwQkFUUDtBQVVuQkMsMEJBQXdCLHdCQVZMO0FBV25CQyxpQ0FBK0IsK0JBWFo7QUFZbkJDLGtDQUFnQyxnQ0FaYjtBQWFuQkMsMENBQXdDLHdDQWJyQjtBQWNuQkMsK0JBQTZCLDZCQWRWO0FBZW5CQyw0QkFBMEIsMEJBZlA7QUFnQm5CQyxrQ0FBZ0MsZ0NBaEJi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UUFBRCxFQUFjO0FBQ1pDLHVCQUFNQyxjQUFOLENBQXFCQyxJQUFyQjtBQUNBSCxhQUFTO0FBQ1BJLFlBQU1sRCxNQUFNMEMsNkNBREw7QUFFUFMsVUFBSUYsS0FBS0U7QUFGRixLQUFUO0FBSUQsR0FQcUM7QUFBQSxDQUFqQzs7QUFTQSxJQUFNOEssa0RBQXFCLFNBQXJCQSxrQkFBcUIsQ0FBQ2hMLElBQUQsRUFBT2lMLGFBQVAsRUFBc0JDLFdBQXRCO0FBQUEsU0FDaEMsVUFBQ3JMLFFBQUQsRUFBYztBQUNaQyx1QkFBTUMsY0FBTixDQUFxQkMsSUFBckI7QUFDQUYsdUJBQU1rTCxrQkFBTixDQUF5QmhMLElBQXpCLEVBQStCaUwsYUFBL0IsRUFBOENDLFdBQTlDO0FBQ0FyTCxhQUFTO0FBQ1BJLFlBQU1sRCxNQUFNMkMsc0NBREw7QUFFUFEsVUFBSUYsS0FBS0UsRUFGRjtBQUdQZ0w7QUFITyxLQUFUO0FBS0QsR0FUK0I7QUFBQSxDQUEzQiIsImZpbGUiOiJkYXRhZ3JpZC5hY3Rpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEltbXV0YWJsZSwgeyBNYXAgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4vZGF0YWdyaWQudXRpbHMnO1xuXG5leHBvcnQgY29uc3QgVFlQRVMgPSB7XG4gIFBMQVRGT1JNX0RBVEFHUklEX0lOVkFMSURBVEU6ICdQTEFURk9STV9EQVRBR1JJRF9JTlZBTElEQVRFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQlVTWTogJ1BMQVRGT1JNX0RBVEFHUklEX0JVU1knLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRUFEWTogJ1BMQVRGT1JNX0RBVEFHUklEX1JFQURZJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0VUX0RBVEE6ICdQTEFURk9STV9EQVRBR1JJRF9TRVRfREFUQScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0FQUExZX1NPUlQ6ICdQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9TT1JUJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU09SVF9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9TT1JUX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFU0laRV9DT0xVTU46ICdQTEFURk9STV9EQVRBR1JJRF9SRVNJWkVfQ09MVU1OJyxcbiAgUExBVEZPUk1fREFUQUdSSURfRURJVDogJ1BMQVRGT1JNX0RBVEFHUklEX0VESVQnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DQU5DRUw6ICdQTEFURk9STV9EQVRBR1JJRF9DQU5DRUwnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TQVZFOiAnUExBVEZPUk1fREFUQUdSSURfU0FWRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0VYVEVORF9EQVRBOiAnUExBVEZPUk1fREFUQUdSSURfRVhURU5EX0RBVEEnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TQVZFX1NVQ0NFU1M6ICdQTEFURk9STV9EQVRBR1JJRF9TQVZFX1NVQ0NFU1MnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TQVZFX1BBUlRJQUxfU1VDQ0VTUzogJ1BMQVRGT1JNX0RBVEFHUklEX1NBVkVfUEFSVElBTF9TVUNDRVNTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0FWRV9GQUlMOiAnUExBVEZPUk1fREFUQUdSSURfU0FWRV9GQUlMJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFOiAnUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQUREX05FV19JVEVNOiAnUExBVEZPUk1fREFUQUdSSURfQUREX05FV19JVEVNJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0lURU06ICdQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfSVRFTScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTTogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTVM6ICdQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU1TJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFOiAnUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX1NVQ0NFU1M6ICdQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfU1VDQ0VTUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9GQUlMOiAnUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUwnLFxuICBQTEFURk9STV9EQVRBR1JJRF9FRElUX0NFTExfVkFMVUVfQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfRURJVF9DRUxMX1ZBTFVFX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFOiAnUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRVM6ICdQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRVMnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NFTExfSElERV9NRVNTQUdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfU0hPV19NRVNTQUdFOiAnUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfU0hPV19NRVNTQUdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfSElERV9NRVNTQUdFOiAnUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfSElERV9NRVNTQUdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfVkFMSURBVEU6ICdQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9WQUxJREFURScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0VMRUNUSU9OX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NFTExfU0VMRUNUSU9OX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0lURU1fU0VMRUNUSU9OX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX0lURU1fU0VMRUNUSU9OX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NFTEVDVF9BTExfSVRFTVNfQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DTEVBUl9TRUxFQ1RFRF9JVEVNUzogJ1BMQVRGT1JNX0RBVEFHUklEX0NMRUFSX1NFTEVDVEVEX0lURU1TJyxcbiAgUExBVEZPUk1fREFUQUdSSURfVE9HR0xFX0ZJTFRFUklORzogJ1BMQVRGT1JNX0RBVEFHUklEX1RPR0dMRV9GSUxURVJJTkcnLFxuICBQTEFURk9STV9EQVRBR1JJRF9GSUxURVJfREFUQV9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9GSUxURVJfREFUQV9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9GSUxURVJTOiAnUExBVEZPUk1fREFUQUdSSURfQVBQTFlfRklMVEVSUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NFVF9GSUxURVJTOiAnUExBVEZPUk1fREFUQUdSSURfU0VUX0ZJTFRFUlMnLFxuICBQTEFURk9STV9EQVRBR1JJRF9VUERBVEVfRVhJU1RJTkdfQ0VMTF9WQUxVRTogJ1BMQVRGT1JNX0RBVEFHUklEX1VQREFURV9FWElTVElOR19DRUxMX1ZBTFVFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0VUX0VESVRfREFUQTogJ1BMQVRGT1JNX0RBVEFHUklEX1NFVF9FRElUX0RBVEEnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfT1BFTjogJ1BMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9PUEVOJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX0NMT1NFOiAnUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX0NMT1NFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX1NBVkU6ICdQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfU0FWRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0ZPUkNFX1JFRlJFU0g6ICdQTEFURk9STV9EQVRBR1JJRF9GT1JDRV9SRUZSRVNIJyxcbn07XG5cbmV4cG9ydCBjb25zdCBpbnZhbGlkYXRlID0gZ3JpZCA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9JTlZBTElEQVRFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBmb3JjZVJlZnJlc2ggPSAoKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgLy8gRmlyZSByZXNpemUgZXZlbnQgdG8gcmVjYWxjdWxhdGUgY29tcG9uZW50IHNpemVzXG4gIC8vIGFuZCB0byBmb3JjZSByZWRyYXcgdGhlIGdyaWRcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgaWYgKGRvY3VtZW50LmNyZWF0ZUV2ZW50KSB7XG4gICAgICBjb25zdCBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnSFRNTEV2ZW50cycpO1xuICAgICAgZXZ0LmluaXRFdmVudCgncmVzaXplJywgdHJ1ZSwgZmFsc2UpO1xuICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgICB9XG4gIH0sIDEpO1xuICBkaXNwYXRjaCh7IHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0ZPUkNFX1JFRlJFU0ggfSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0QnVzeSA9IGdyaWQgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQlVTWSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3Qgc2V0UmVhZHkgPSBncmlkID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFQURZLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBhcHBseUZpbHRlcnMgPSAoZ3JpZCwgY29sdW1ucykgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGlmICghY29sdW1ucyB8fCAhY29sdW1ucy5mb3JFYWNoKSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3QgZ3JpZERhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldChncmlkLmlkKTtcbiAgICBpZiAoIWdyaWREYXRhKSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3QgZmlsdGVyRGF0YSA9IGdyaWREYXRhLmdldEluKFsnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnZmlsdGVyRGF0YSddLCBNYXAoKSk7XG4gICAgY29uc3QgYWxsRGF0YSA9IGdyaWREYXRhLmdldCgnYWxsRGF0YScpO1xuICAgIHNldEJ1c3koZ3JpZCkoZGlzcGF0Y2gpO1xuICAgIGxldCBkYXRhO1xuICAgIGlmIChmaWx0ZXJEYXRhLmlzRW1wdHkoKSkge1xuICAgICAgZGF0YSA9IGFsbERhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRhdGVGb3JtYXQgPSBVdGlscy5nZXREYXRlRm9ybWF0KGdyaWQsIGdldFN0YXRlKCkudXNlcik7XG4gICAgICBkYXRhID0gYWxsRGF0YS5maWx0ZXIoKHJvdykgPT4ge1xuICAgICAgICBsZXQgaGl0cyA9IDA7XG4gICAgICAgIGZpbHRlckRhdGEuZm9yRWFjaCgoZmlsdGVyVmFsdWUsIGZpbHRlckNvbHVtbikgPT4ge1xuICAgICAgICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sdW1uKSA9PiB7XG4gICAgICAgICAgICBpZiAoVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbHVtbikgPT09IGZpbHRlckNvbHVtbikge1xuICAgICAgICAgICAgICBjb25zdCByb3dEYXRhID0gcm93LmdldEluKGNvbHVtbi52YWx1ZUtleVBhdGgpO1xuICAgICAgICAgICAgICBpZiAocm93RGF0YSB8fCByb3dEYXRhID09PSAwIHx8IHJvd0RhdGEgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyTWF0Y2hlciA9IFV0aWxzLmdldEZpbHRlck1hdGNoZXIoY29sdW1uLCBkYXRlRm9ybWF0KTtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyTWF0Y2hlcihyb3dEYXRhLCBmaWx0ZXJWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgIGhpdHMgKz0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBoaXRzID09PSBmaWx0ZXJEYXRhLnNpemU7XG4gICAgICB9KTtcbiAgICB9XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQVBQTFlfRklMVEVSUyxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgZGF0YSxcbiAgICB9KTtcbiAgICBzZXRSZWFkeShncmlkKShkaXNwYXRjaCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBzZXRBbmRBcHBseUZpbHRlcnMgPSAoZ3JpZCwgY29sdW1ucywgZmlsdGVyaW5nRGF0YSkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX0ZJTFRFUlMsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGZpbHRlcmluZ0RhdGE6IFV0aWxzLm5vcm1hbGl6ZUZpbHRlcmluZ0RhdGEoZmlsdGVyaW5nRGF0YSksXG4gICAgfSk7XG4gICAgZGlzcGF0Y2goYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGZpbHRlckNlbGxWYWx1ZUNoYW5nZSA9IChncmlkLCBjb2x1bW5zLCBjb2x1bW4sIHZhbHVlKSA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgY29uc3Qgb3JpZ0ZpbHRlckRhdGEgPSBnZXRTdGF0ZSgpXG4gICAgICAuZGF0YWdyaWRcbiAgICAgIC5nZXRJbihbZ3JpZC5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2ZpbHRlckRhdGEnXSwgTWFwKCkpO1xuICAgIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2x1bW4pO1xuICAgIGNvbnN0IHZhbHVlRW1wdHlDaGVja2VyID0gVXRpbHMuZ2V0VmFsdWVFbXB0eUNoZWNrZXIoY29sdW1uKTtcbiAgICBsZXQgZmlsdGVyRGF0YTtcbiAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsdWUpKSB7XG4gICAgICBmaWx0ZXJEYXRhID0gb3JpZ0ZpbHRlckRhdGEuZGVsZXRlKGNvbHVtbktleSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpbHRlckRhdGEgPSBvcmlnRmlsdGVyRGF0YS5zZXQoY29sdW1uS2V5LCB2YWx1ZSk7XG4gICAgfVxuICAgIFV0aWxzLnNhdmVGaWx0ZXJEYXRhKGdyaWQsIGZpbHRlckRhdGEpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0ZJTFRFUl9EQVRBX0NIQU5HRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgZmlsdGVyRGF0YSxcbiAgICB9KTtcbiAgICBhcHBseUZpbHRlcnMoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGFwcGx5U29ydCA9IChncmlkLCBjb2x1bW5zKSA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgaWYgKCFjb2x1bW5zIHx8ICFjb2x1bW5zLmZvckVhY2gpIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBncmlkRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0KGdyaWQuaWQpO1xuICAgIGlmICghZ3JpZERhdGEpIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBzb3J0RGF0YSA9IGdyaWREYXRhLmdldEluKFsnY29uZmlnJywgJ3NvcnRpbmdEYXRhJ10pO1xuICAgIGlmICghc29ydERhdGEpIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBzb3J0Q29sdW1uID0gc29ydERhdGEuZ2V0KCdzb3J0Q29sdW1uJyk7XG4gICAgaWYgKCFzb3J0Q29sdW1uKSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3Qgc29ydE9yZGVyID0gc29ydERhdGEuZ2V0KCdzb3J0T3JkZXInLCAnYXNjJyk7XG4gICAgbGV0IGNvbHVtbjtcbiAgICBjb2x1bW5zLmZvckVhY2goKGNvbCkgPT4ge1xuICAgICAgaWYgKFV0aWxzLmdldENvbHVtbktleShjb2wpID09PSBzb3J0Q29sdW1uKSB7XG4gICAgICAgIGNvbHVtbiA9IGNvbDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoIWNvbHVtbikgcmV0dXJuIGZhbHNlO1xuXG4gICAgc2V0QnVzeShncmlkKShkaXNwYXRjaCk7XG4gICAgY29uc3Qgb3JpZ0FsbERhdGEgPSBncmlkRGF0YS5nZXQoJ2FsbERhdGEnKTtcbiAgICBjb25zdCBjb21wYXJhdG9yID0gVXRpbHMuZ2V0U29ydENvbXBhcmF0b3IoY29sdW1uKTtcbiAgICBjb25zdCB2YWx1ZUdldHRlciA9IFV0aWxzLmdldFNvcnRWYWx1ZUdldHRlcihjb2x1bW4pO1xuICAgIGNvbnN0IHZhbHVlRW1wdHlDaGVja2VyID0gVXRpbHMuZ2V0VmFsdWVFbXB0eUNoZWNrZXIoY29sdW1uKTtcbiAgICBjb25zdCBhbGxEYXRhID0gb3JpZ0FsbERhdGEuc29ydCgoYSwgYikgPT4ge1xuICAgICAgY29uc3QgdmFsQSA9IHZhbHVlR2V0dGVyKGEpO1xuICAgICAgY29uc3QgdmFsQiA9IHZhbHVlR2V0dGVyKGIpO1xuICAgICAgaWYgKHNvcnRPcmRlciA9PT0gJ2FzYycpIHtcbiAgICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEEpKSByZXR1cm4gLTE7XG4gICAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxCKSkgcmV0dXJuIDE7XG4gICAgICAgIHJldHVybiBjb21wYXJhdG9yKHZhbEEsIHZhbEIpO1xuICAgICAgfVxuICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEEpKSByZXR1cm4gMTtcbiAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxCKSkgcmV0dXJuIC0xO1xuICAgICAgcmV0dXJuIGNvbXBhcmF0b3IodmFsQiwgdmFsQSk7XG4gICAgfSk7XG4gICAgbGV0IGRhdGE7XG4gICAgLy8gU29ydCBhbHNvIGZpbHRlcmVkIGRhdGEgc2VwYXJhdGVseVxuICAgIGlmIChncmlkRGF0YS5nZXRJbihbJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2lzRmlsdGVyaW5nJ10sIGZhbHNlKSkge1xuICAgICAgZGF0YSA9IGdyaWREYXRhLmdldCgnZGF0YScpLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgY29uc3QgdmFsQSA9IHZhbHVlR2V0dGVyKGEpO1xuICAgICAgICBjb25zdCB2YWxCID0gdmFsdWVHZXR0ZXIoYik7XG4gICAgICAgIGlmIChzb3J0T3JkZXIgPT09ICdhc2MnKSB7XG4gICAgICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEEpKSByZXR1cm4gLTE7XG4gICAgICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEIpKSByZXR1cm4gMTtcbiAgICAgICAgICByZXR1cm4gY29tcGFyYXRvcih2YWxBLCB2YWxCKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQSkpIHJldHVybiAxO1xuICAgICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQikpIHJldHVybiAtMTtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmF0b3IodmFsQiwgdmFsQSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YSA9IGFsbERhdGE7XG4gICAgfVxuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0FQUExZX1NPUlQsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGRhdGEsXG4gICAgICBhbGxEYXRhLFxuICAgIH0pO1xuICAgIHNldFJlYWR5KGdyaWQpKGRpc3BhdGNoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHNvcnRDaGFuZ2UgPSAoZ3JpZCwgY29sdW1ucywgY29sdW1uLCBuZXdTb3J0KSA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgY29uc3Qgc29ydE9yZGVyID0gbmV3U29ydCB8fCAnYXNjJztcbiAgICBjb25zdCBzb3J0Q29sdW1uID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbHVtbik7XG4gICAgVXRpbHMuc2F2ZVNvcnREYXRhKGdyaWQsIHsgc29ydENvbHVtbiwgc29ydE9yZGVyIH0pO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NPUlRfQ0hBTkdFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBzb3J0Q29sdW1uLFxuICAgICAgc29ydE9yZGVyLFxuICAgIH0pO1xuICAgIGFwcGx5U29ydChncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICB9O1xuXG5leHBvcnQgY29uc3Qgc2V0RGF0YSA9IChncmlkLCBjb2x1bW5zLCBkYXRhKSA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgVXRpbHMuY2hlY2tDb2x1bW5zUGFyYW0oY29sdW1ucyk7XG4gICAgY29uc3QgY29uZmlnRGF0YSA9IFV0aWxzLmxvYWRHcmlkQ29uZmlnKGdyaWQsIGNvbHVtbnMpO1xuICAgIGNvbnN0IGltbXV0YWJsZURhdGEgPSBJbW11dGFibGUuSXRlcmFibGUuaXNJdGVyYWJsZShkYXRhKSA/IGRhdGEgOiBJbW11dGFibGUuZnJvbUpTKGRhdGEpO1xuICAgIGNvbnN0IHNlbGVjdGVkSXRlbXMgPSBVdGlscy5sb2FkU2VsZWN0ZWRJdGVtcyhncmlkKS5maWx0ZXIoaXRlbSA9PiAoXG4gICAgICAhIWltbXV0YWJsZURhdGEuZmluZChkYXRhSXRlbSA9PiBkYXRhSXRlbS5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGl0ZW0pXG4gICAgKSk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX0RBVEEsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGRhdGE6IGltbXV0YWJsZURhdGEsXG4gICAgICBjb25maWc6IGNvbmZpZ0RhdGEsXG4gICAgICBzZWxlY3RlZEl0ZW1zLFxuICAgIH0pO1xuICAgIGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICAgIGFwcGx5U29ydChncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICB9O1xuXG5leHBvcnQgY29uc3QgZXh0ZW5kRGF0YSA9IChncmlkLCBjb2x1bW5zLCBkYXRhKSA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgY29uc3QgaW1tdXRhYmxlRGF0YSA9IEltbXV0YWJsZS5JdGVyYWJsZS5pc0l0ZXJhYmxlKGRhdGEpID8gZGF0YSA6IEltbXV0YWJsZS5mcm9tSlMoZGF0YSk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfRVhURU5EX0RBVEEsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGRhdGE6IGltbXV0YWJsZURhdGEsXG4gICAgfSk7XG4gICAgYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gICAgYXBwbHlTb3J0KGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCByZXNpemVDb2x1bW4gPSAoZ3JpZCwgY29sdW1uS2V5LCB3aWR0aCkgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGNvbnN0IGNvbHVtbldpZHRocyA9IGdldFN0YXRlKClcbiAgICAgIC5kYXRhZ3JpZFxuICAgICAgLmdldEluKFtncmlkLmlkLCAnY29uZmlnJywgJ2NvbHVtbldpZHRocyddLCBNYXAoKSlcbiAgICAgIC5zZXQoY29sdW1uS2V5LCB3aWR0aCk7XG4gICAgVXRpbHMuc2F2ZUNvbHVtbldpZHRocyhncmlkLCBjb2x1bW5XaWR0aHMpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFU0laRV9DT0xVTU4sXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGNvbHVtbldpZHRocyxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGVkaXQgPSBncmlkID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0VESVQsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGNhbmNlbCA9IGdyaWQgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0FOQ0VMLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBzYXZlID0gKGdyaWQsIGNiID0gKCkgPT4ge30pID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NBVkUsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICB9KTtcbiAgICBjYigpO1xuICB9O1xuXG5leHBvcnQgY29uc3Qgc2F2ZVN1Y2Nlc3MgPSAoZ3JpZCwgY29sdW1ucywgc2F2ZWRJdGVtcykgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfU1VDQ0VTUyxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgICAgIHNhdmVkSXRlbXMsXG4gICAgfSk7XG4gICAgYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gICAgYXBwbHlTb3J0KGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBzYXZlUGFydGlhbFN1Y2Nlc3MgPSAoZ3JpZCwgY29sdW1ucywgc2F2ZWRJdGVtcykgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfUEFSVElBTF9TVUNDRVNTLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBpZEtleVBhdGg6IGdyaWQuaWRLZXlQYXRoLFxuICAgICAgc2F2ZWRJdGVtcyxcbiAgICB9KTtcbiAgICBhcHBseUZpbHRlcnMoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgICBhcHBseVNvcnQoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHNhdmVGYWlsID0gZ3JpZCA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TQVZFX0ZBSUwsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZSA9IChncmlkLCBjb2x1bW5EZWZhdWx0VmFsdWVzKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEUsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGNvbHVtbkRlZmF1bHRWYWx1ZXMsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBhZGROZXdJdGVtID0gKGdyaWQsIGNvbHVtbkRlZmF1bHRWYWx1ZXMpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0FERF9ORVdfSVRFTSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgY29sdW1uRGVmYXVsdFZhbHVlcyxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZUl0ZW0gPSAoZ3JpZCwgaW5kZXgpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9JVEVNLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBpZEtleVBhdGg6IGdyaWQuaWRLZXlQYXRoLFxuICAgICAgaW5kZXgsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVOZXdJdGVtID0gKGdyaWQsIGluZGV4KSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU0sXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGluZGV4LFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlTmV3SXRlbXMgPSAoZ3JpZCwgaW5kZXhlcykgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNUyxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgaW5kZXhlcyxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZSA9IChncmlkLCBjYiA9ICgpID0+IHt9KSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkUsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICB9KTtcbiAgICBjYigpO1xuICB9O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlU3VjY2VzcyA9IChncmlkLCByZW1vdmVkSWRzKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfU1VDQ0VTUyxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgICAgIHJlbW92ZWRJZHMsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVGYWlsID0gZ3JpZCA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfRkFJTCxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgZWRpdENlbGxWYWx1ZUNoYW5nZSA9IChncmlkLCBkYXRhSWQsIGtleVBhdGgsIHZhbHVlKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9FRElUX0NFTExfVkFMVUVfQ0hBTkdFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBkYXRhSWQsXG4gICAgICBrZXlQYXRoLFxuICAgICAgdmFsdWUsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBlZGl0Q2VsbFZhbHVlVmFsaWRhdGUgPSAoXG4gIGdyaWQsXG4gIGRhdGFJZCxcbiAga2V5UGF0aCxcbiAgdmFsdWUsXG4gIHZhbGlkYXRvcnMgPSBbXSxcbikgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGxldCB2YWxpZGF0aW9uU3RhdGUgPSB7IHZhbGlkOiB0cnVlIH07XG4gICAgdmFsaWRhdG9ycy5mb3JFYWNoKCh2YWxpZGF0b3IpID0+IHtcbiAgICAgIGlmICh2YWxpZGF0aW9uU3RhdGUudmFsaWQpIHtcbiAgICAgICAgaWYgKHZhbGlkYXRvci51bmlxdWUpIHtcbiAgICAgICAgICBpZiAodmFsdWUgIT09ICcnIHx8IHZhbHVlICE9PSBudWxsIHx8IHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIGNvbWJpbmUgcmVhbCBkYXRhIHdpdGggY3VycmVudCB1bnNhdmVkIGVkaXRlZCBkYXRhXG4gICAgICAgICAgICBjb25zdCBncmlkRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0KGdyaWQuaWQpO1xuICAgICAgICAgICAgY29uc3QgZWRpdERhdGEgPSBncmlkRGF0YS5nZXQoJ2VkaXREYXRhJyk7XG4gICAgICAgICAgICBsZXQgYWxsRGF0YSA9IGdyaWREYXRhLmdldCgnYWxsRGF0YScpO1xuICAgICAgICAgICAgaWYgKGVkaXREYXRhKSB7XG4gICAgICAgICAgICAgIGVkaXREYXRhLmZvckVhY2goKGVkaXREYXRhSXRlbSwgZWRpdERhdGFJdGVtSWQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3VuZEluZGV4ID1cbiAgICAgICAgICAgICAgICAgIGFsbERhdGEuZmluZEluZGV4KGQgPT4gZC5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGVkaXREYXRhSXRlbUlkKTtcbiAgICAgICAgICAgICAgICBpZiAoZm91bmRJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgIGFsbERhdGEgPSBhbGxEYXRhLm1lcmdlRGVlcEluKFtmb3VuZEluZGV4XSwgZWRpdERhdGFJdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gZGV0ZXJtaW5lIHVuaXF1ZW5lc3NcbiAgICAgICAgICAgIGNvbnN0IGZpbmRpbmcgPSBhbGxEYXRhLmZpbmQoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgaWYgKGdyaWQuaWRLZXlQYXRoLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIC8vIGRvbid0IHNlbGYgY29tcGFyZVxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmdldEluKGdyaWQuaWRLZXlQYXRoKSA9PT0gZGF0YUlkKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBpdGVtLmdldEluKGtleVBhdGgpID09PSB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGZpbmRpbmcpIHtcbiAgICAgICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0ge1xuICAgICAgICAgICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnVmFsaWRhdGlvbi5VbmlxdWUnLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh2YWxpZGF0b3IudmFsaWRhdGVXaXRoUm93RGF0YSkge1xuICAgICAgICAgIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG4gICAgICAgICAgY29uc3QgZWRpdERhdGEgPSBncmlkRGF0YS5nZXRJbihbJ2VkaXREYXRhJywgZGF0YUlkXSwgTWFwKCkpO1xuICAgICAgICAgIGxldCByb3dEYXRhID0gZ3JpZERhdGEuZ2V0KCdhbGxEYXRhJykuZmluZChpdGVtID0+IGl0ZW0uZ2V0SW4oZ3JpZC5pZEtleVBhdGgpID09PSBkYXRhSWQpO1xuICAgICAgICAgIGlmIChyb3dEYXRhKSB7XG4gICAgICAgICAgICByb3dEYXRhID0gcm93RGF0YS5tZXJnZURlZXAoZWRpdERhdGEpO1xuICAgICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0gdmFsaWRhdG9yLnZhbGlkYXRlV2l0aFJvd0RhdGEodmFsdWUsIHJvd0RhdGEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBwYXJhbXMgPSB2YWxpZGF0b3IucGFyYW1zID8gT2JqZWN0LnZhbHVlcyh2YWxpZGF0b3IucGFyYW1zKSA6IFtdO1xuICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZSh2YWx1ZSwgLi4ucGFyYW1zKTtcbiAgICAgICAgICBpZiAodmFsaWRhdG9yLnBhcmFtcykge1xuICAgICAgICAgICAgdmFsaWRhdGlvblN0YXRlLm1lc3NhZ2VWYWx1ZXMgPSB2YWxpZGF0b3IucGFyYW1zO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICh2YWxpZGF0aW9uU3RhdGUudmFsaWQpIHtcbiAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0VMTF9ISURFX01FU1NBR0UsXG4gICAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgICBtZXNzYWdlVHlwZTogJ2Vycm9yJyxcbiAgICAgICAgZGF0YUlkLFxuICAgICAgICBrZXlQYXRoLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0UsXG4gICAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgICBtZXNzYWdlVHlwZTogJ2Vycm9yJyxcbiAgICAgICAgZGF0YUlkLFxuICAgICAgICBrZXlQYXRoLFxuICAgICAgICBtZXNzYWdlSWQ6IHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlLFxuICAgICAgICBtZXNzYWdlVmFsdWVzOiB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZVZhbHVlcyxcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdmFsaWRhdGlvblN0YXRlLnZhbGlkO1xuICB9O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlID0gKGdyaWQsIHJvd0luZGV4LCBrZXlQYXRoLCB2YWx1ZSkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfQ0hBTkdFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICByb3dJbmRleCxcbiAgICAgIGtleVBhdGgsXG4gICAgICB2YWx1ZSxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNlbGxWYWx1ZVZhbGlkYXRlID0gKGdyaWQsIHJvd0luZGV4LCBrZXlQYXRoLCB2YWx1ZSwgdmFsaWRhdG9ycyA9IFtdKSA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgbGV0IHZhbGlkYXRpb25TdGF0ZSA9IHsgdmFsaWQ6IHRydWUgfTtcbiAgICB2YWxpZGF0b3JzLmZvckVhY2goKHZhbGlkYXRvcikgPT4ge1xuICAgICAgaWYgKHZhbGlkYXRpb25TdGF0ZS52YWxpZCkge1xuICAgICAgICBpZiAodmFsaWRhdG9yLnVuaXF1ZSkge1xuICAgICAgICAgIGlmICh2YWx1ZSAhPT0gJycgfHwgdmFsdWUgIT09IG51bGwgfHwgdmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3QgZmluZGluZyA9IGdldFN0YXRlKClcbiAgICAgICAgICAgICAgLmRhdGFncmlkXG4gICAgICAgICAgICAgIC5nZXRJbihbZ3JpZC5pZCwgJ2FsbERhdGEnXSlcbiAgICAgICAgICAgICAgLmZpbmQoaXRlbSA9PiBpdGVtLmdldEluKGtleVBhdGgpID09PSB2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoZmluZGluZykge1xuICAgICAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgdmFsaWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdWYWxpZGF0aW9uLlVuaXF1ZScsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zdCBmaW5kMiA9IGdldFN0YXRlKClcbiAgICAgICAgICAgICAgICAuZGF0YWdyaWRcbiAgICAgICAgICAgICAgICAuZ2V0SW4oW2dyaWQuaWQsICdjcmVhdGVEYXRhJ10pXG4gICAgICAgICAgICAgICAgLmZpbmQoKGl0ZW0sIGkpID0+IGkgIT09IHJvd0luZGV4ICYmIGl0ZW0uZ2V0SW4oa2V5UGF0aCkgPT09IHZhbHVlKTtcbiAgICAgICAgICAgICAgaWYgKGZpbmQyKSB7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0ge1xuICAgICAgICAgICAgICAgICAgdmFsaWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ1ZhbGlkYXRpb24uVW5pcXVlJyxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHZhbGlkYXRvci52YWxpZGF0ZVdpdGhSb3dEYXRhKSB7XG4gICAgICAgICAgY29uc3Qgcm93RGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdjcmVhdGVEYXRhJywgcm93SW5kZXhdKTtcbiAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB2YWxpZGF0b3IudmFsaWRhdGVXaXRoUm93RGF0YSh2YWx1ZSwgcm93RGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgcGFyYW1zID0gdmFsaWRhdG9yLnBhcmFtcyA/IE9iamVjdC52YWx1ZXModmFsaWRhdG9yLnBhcmFtcykgOiBbXTtcbiAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB2YWxpZGF0b3IudmFsaWRhdGUodmFsdWUsIC4uLnBhcmFtcyk7XG4gICAgICAgICAgaWYgKHZhbGlkYXRvci5wYXJhbXMpIHtcbiAgICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlVmFsdWVzID0gdmFsaWRhdG9yLnBhcmFtcztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAodmFsaWRhdGlvblN0YXRlLnZhbGlkKSB7XG4gICAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX0hJREVfTUVTU0FHRSxcbiAgICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICAgIG1lc3NhZ2VUeXBlOiAnZXJyb3InLFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAga2V5UGF0aCxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRSxcbiAgICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICAgIG1lc3NhZ2VUeXBlOiAnZXJyb3InLFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAga2V5UGF0aCxcbiAgICAgICAgbWVzc2FnZUlkOiB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZSxcbiAgICAgICAgbWVzc2FnZVZhbHVlczogdmFsaWRhdGlvblN0YXRlLm1lc3NhZ2VWYWx1ZXMsXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbGlkYXRpb25TdGF0ZS52YWxpZDtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGNlbGxTaG93TWVzc2FnZSA9IChncmlkLCBtZXNzYWdlVHlwZSwgZGF0YUlkLCBrZXlQYXRoLCBtZXNzYWdlSWQsIG1lc3NhZ2VWYWx1ZXMpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBtZXNzYWdlVHlwZSxcbiAgICAgIGRhdGFJZCxcbiAgICAgIGtleVBhdGgsXG4gICAgICBtZXNzYWdlSWQsXG4gICAgICBtZXNzYWdlVmFsdWVzLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgY2VsbFNob3dNZXNzYWdlcyA9IChncmlkLCBtZXNzYWdlcykgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0VTLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBtZXNzYWdlcyxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGNlbGxIaWRlTWVzc2FnZSA9IChncmlkLCBtZXNzYWdlVHlwZSA9IG51bGwsIGRhdGFJZCA9IG51bGwsIGtleVBhdGggPSBudWxsKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgbWVzc2FnZVR5cGUsXG4gICAgICBkYXRhSWQsXG4gICAgICBrZXlQYXRoLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQ2VsbFNob3dNZXNzYWdlID0gKFxuICBncmlkLFxuICBtZXNzYWdlVHlwZSxcbiAgcm93SW5kZXgsXG4gIGtleVBhdGgsXG4gIG1lc3NhZ2VJZCxcbiAgbWVzc2FnZVZhbHVlcyxcbikgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfU0hPV19NRVNTQUdFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBtZXNzYWdlVHlwZSxcbiAgICAgIHJvd0luZGV4LFxuICAgICAga2V5UGF0aCxcbiAgICAgIG1lc3NhZ2VJZCxcbiAgICAgIG1lc3NhZ2VWYWx1ZXMsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVDZWxsSGlkZU1lc3NhZ2UgPSAoZ3JpZCwgbWVzc2FnZVR5cGUgPSBudWxsLCByb3dJbmRleCA9IG51bGwsIGtleVBhdGggPSBudWxsKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9ISURFX01FU1NBR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIG1lc3NhZ2VUeXBlLFxuICAgICAgcm93SW5kZXgsXG4gICAgICBrZXlQYXRoLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgY2VsbFNlbGVjdGlvbkNoYW5nZSA9IChncmlkLCBzZWxlY3RlZENlbGwgPSBudWxsKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICBzZWxlY3RlZENlbGwsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0VMRUNUSU9OX0NIQU5HRSxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGl0ZW1TZWxlY3Rpb25DaGFuZ2UgPSAoXG4gIGdyaWQsXG4gIHJvd0luZGV4LFxuICBjdHJsUHJlc3NlZCA9IGZhbHNlLFxuICBzaGlmdFByZXNzZWQgPSBmYWxzZSxcbikgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0lURU1fU0VMRUNUSU9OX0NIQU5HRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgcm93SW5kZXgsXG4gICAgICBpZEtleVBhdGg6IGdyaWQuaWRLZXlQYXRoLFxuICAgICAgY3RybFByZXNzZWQsXG4gICAgICBzaGlmdFByZXNzZWQsXG4gICAgfSk7XG4gICAgVXRpbHMuc2F2ZVNlbGVjdGVkSXRlbXMoZ3JpZCwgZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ3NlbGVjdGVkSXRlbXMnXSkpO1xuICB9O1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0QWxsSXRlbXNDaGFuZ2UgPSBncmlkID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRUxFQ1RfQUxMX0lURU1TX0NIQU5HRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgICB9KTtcbiAgICBVdGlscy5zYXZlU2VsZWN0ZWRJdGVtcyhncmlkLCBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnc2VsZWN0ZWRJdGVtcyddKSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBjbGVhclNlbGVjdGVkSXRlbXMgPSBncmlkID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DTEVBUl9TRUxFQ1RFRF9JVEVNUyxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgIH0pO1xuICAgIFV0aWxzLnNhdmVTZWxlY3RlZEl0ZW1zKGdyaWQsIGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdzZWxlY3RlZEl0ZW1zJ10pKTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHRvZ2dsZUZpbHRlcmluZyA9IGdyaWQgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGNvbnN0IGlzRmlsdGVyaW5nID0gIWdldFN0YXRlKClcbiAgICAgIC5kYXRhZ3JpZFxuICAgICAgLmdldEluKFtncmlkLmlkLCAnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnaXNGaWx0ZXJpbmcnXSwgZmFsc2UpO1xuICAgIFV0aWxzLnNhdmVJc0ZpbHRlcmluZyhncmlkLCBpc0ZpbHRlcmluZyk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfVE9HR0xFX0ZJTFRFUklORyxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgaXNGaWx0ZXJpbmcsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUVkaXRlZFJvd3MgPSAoZ3JpZCwgY29sdW1ucykgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG4gICAgY29uc3QgZWRpdERhdGEgPSBncmlkRGF0YS5nZXQoJ2VkaXREYXRhJywgTWFwKCkpO1xuICAgIGxldCBhbGxHb29kID0gdHJ1ZTtcbiAgICBlZGl0RGF0YS5mb3JFYWNoKChlZGl0RGF0YVJvdywgZGF0YUlkKSA9PiB7XG4gICAgICBjb2x1bW5zLmZvckVhY2goKGNvbCkgPT4ge1xuICAgICAgICBsZXQgdmFsdWUgPSBlZGl0RGF0YVJvdy5nZXRJbihjb2wudmFsdWVLZXlQYXRoKTtcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB2YWx1ZSA9IGdyaWREYXRhXG4gICAgICAgICAgICAuZ2V0KCdhbGxEYXRhJylcbiAgICAgICAgICAgIC5maW5kKGRhdGEgPT4gZGF0YS5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGRhdGFJZClcbiAgICAgICAgICAgIC5nZXRJbihjb2wudmFsdWVLZXlQYXRoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpc1ZhbGlkID0gZWRpdENlbGxWYWx1ZVZhbGlkYXRlKFxuICAgICAgICAgIGdyaWQsXG4gICAgICAgICAgZGF0YUlkLFxuICAgICAgICAgIGNvbC52YWx1ZUtleVBhdGgsXG4gICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgY29sLnZhbGlkYXRvcnMsXG4gICAgICAgICkoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgICAgICAgaWYgKGFsbEdvb2QgJiYgIWlzVmFsaWQpIHtcbiAgICAgICAgICBhbGxHb29kID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBhbGxHb29kO1xuICB9O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlRW1wdHlDcmVhdGVkUm93cyA9IChncmlkLCBjb2x1bW5zKSA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgY29uc3QgY3JlYXRlRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdjcmVhdGVEYXRhJ10sIE1hcCgpKTtcbiAgICBjb25zdCBpbmRleGVzID0gW107XG4gICAgY3JlYXRlRGF0YS5mb3JFYWNoKChjcmVhdGVEYXRhUm93LCByb3dJbmRleCkgPT4ge1xuICAgICAgbGV0IGlzRW1wdHkgPSB0cnVlO1xuICAgICAgY29sdW1ucy5mb3JFYWNoKChjb2wpID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBjcmVhdGVEYXRhUm93LmdldEluKGNvbC52YWx1ZUtleVBhdGgpO1xuICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gJycgJiYgdmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICBpc0VtcHR5ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKGlzRW1wdHkpIHtcbiAgICAgICAgaW5kZXhlcy5wdXNoKHJvd0luZGV4KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoaW5kZXhlcy5sZW5ndGggPiAwKSB7XG4gICAgICByZW1vdmVOZXdJdGVtcyhncmlkLCBpbmRleGVzKShkaXNwYXRjaCk7XG4gICAgfVxuICB9O1xuXG5leHBvcnQgY29uc3QgdmFsaWRhdGVDcmVhdGVkUm93cyA9IChncmlkLCBjb2x1bW5zKSA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgcmVtb3ZlRW1wdHlDcmVhdGVkUm93cyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICAgIGNvbnN0IGNyZWF0ZURhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnY3JlYXRlRGF0YSddLCBNYXAoKSk7XG4gICAgbGV0IGFsbEdvb2QgPSB0cnVlO1xuICAgIGNyZWF0ZURhdGEuZm9yRWFjaCgoY3JlYXRlRGF0YVJvdywgcm93SW5kZXgpID0+IHtcbiAgICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gY3JlYXRlRGF0YVJvdy5nZXRJbihjb2wudmFsdWVLZXlQYXRoKTtcbiAgICAgICAgY29uc3QgaXNWYWxpZCA9IGNyZWF0ZUNlbGxWYWx1ZVZhbGlkYXRlKFxuICAgICAgICAgIGdyaWQsXG4gICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgY29sLnZhbHVlS2V5UGF0aCxcbiAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICBjb2wudmFsaWRhdG9ycyxcbiAgICAgICAgKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICAgICAgICBpZiAoYWxsR29vZCAmJiAhaXNWYWxpZCkge1xuICAgICAgICAgIGFsbEdvb2QgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGFsbEdvb2Q7XG4gIH07XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVFeGlzdGluZ0NlbGxWYWx1ZSA9IChncmlkLCBkYXRhSWQsIGtleVBhdGgsIHZhbHVlKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9VUERBVEVfRVhJU1RJTkdfQ0VMTF9WQUxVRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgZGF0YUlkLFxuICAgICAga2V5UGF0aCxcbiAgICAgIHZhbHVlLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3Qgc2V0RWRpdERhdGEgPSAoZ3JpZCwgZGF0YSwgY2VsbE1lc3NhZ2VzID0gTWFwKCkpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIGRhdGEsXG4gICAgICBjZWxsTWVzc2FnZXMsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NFVF9FRElUX0RBVEEsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBvcGVuQ29sdW1uU2V0dGluZ3NNb2RhbCA9IGdyaWQgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX09QRU4sXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbCA9IGdyaWQgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX0NMT1NFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBzYXZlQ29sdW1uU2V0dGluZ3MgPSAoZ3JpZCwgaGlkZGVuQ29sdW1ucywgY29sdW1uT3JkZXIpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIFV0aWxzLnNhdmVDb2x1bW5TZXR0aW5ncyhncmlkLCBoaWRkZW5Db2x1bW5zLCBjb2x1bW5PcmRlcik7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX1NBVkUsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGNvbHVtbk9yZGVyLFxuICAgIH0pO1xuICB9O1xuXG4iXX0=