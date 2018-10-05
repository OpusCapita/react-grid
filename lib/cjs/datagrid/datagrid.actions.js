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