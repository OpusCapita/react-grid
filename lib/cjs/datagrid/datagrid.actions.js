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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5hY3Rpb25zLmpzIl0sIm5hbWVzIjpbIlRZUEVTIiwiUExBVEZPUk1fREFUQUdSSURfSU5WQUxJREFURSIsIlBMQVRGT1JNX0RBVEFHUklEX0JVU1kiLCJQTEFURk9STV9EQVRBR1JJRF9SRUFEWSIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9EQVRBIiwiUExBVEZPUk1fREFUQUdSSURfQVBQTFlfU09SVCIsIlBMQVRGT1JNX0RBVEFHUklEX1NPUlRfQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfUkVTSVpFX0NPTFVNTiIsIlBMQVRGT1JNX0RBVEFHUklEX0VESVQiLCJQTEFURk9STV9EQVRBR1JJRF9DQU5DRUwiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFIiwiUExBVEZPUk1fREFUQUdSSURfRVhURU5EX0RBVEEiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFX1NVQ0NFU1MiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFX1BBUlRJQUxfU1VDQ0VTUyIsIlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfRkFJTCIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURSIsIlBMQVRGT1JNX0RBVEFHUklEX0FERF9ORVdfSVRFTSIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9JVEVNIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNUyIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRSIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9TVUNDRVNTIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUwiLCJQTEFURk9STV9EQVRBR1JJRF9FRElUX0NFTExfVkFMVUVfQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0UiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRVMiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX0hJREVfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX0NIQU5HRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX1ZBTElEQVRFIiwiUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TRUxFQ1RJT05fQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9DTEVBUl9TRUxFQ1RFRF9JVEVNUyIsIlBMQVRGT1JNX0RBVEFHUklEX1RPR0dMRV9GSUxURVJJTkciLCJQTEFURk9STV9EQVRBR1JJRF9GSUxURVJfREFUQV9DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9GSUxURVJTIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX0ZJTFRFUlMiLCJQTEFURk9STV9EQVRBR1JJRF9VUERBVEVfRVhJU1RJTkdfQ0VMTF9WQUxVRSIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9FRElUX0RBVEEiLCJQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfT1BFTiIsIlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFIiwiUExBVEZPUk1fREFUQUdSSURfRk9SQ0VfUkVGUkVTSCIsImludmFsaWRhdGUiLCJkaXNwYXRjaCIsIlV0aWxzIiwiY2hlY2tHcmlkUGFyYW0iLCJncmlkIiwidHlwZSIsImlkIiwiZm9yY2VSZWZyZXNoIiwic2V0VGltZW91dCIsImRvY3VtZW50IiwiY3JlYXRlRXZlbnQiLCJldnQiLCJpbml0RXZlbnQiLCJ3aW5kb3ciLCJkaXNwYXRjaEV2ZW50Iiwic2V0QnVzeSIsInNldFJlYWR5IiwiYXBwbHlGaWx0ZXJzIiwiY29sdW1ucyIsImdldFN0YXRlIiwiZm9yRWFjaCIsImdyaWREYXRhIiwiZGF0YWdyaWQiLCJnZXQiLCJmaWx0ZXJEYXRhIiwiZ2V0SW4iLCJhbGxEYXRhIiwiZGF0YSIsImlzRW1wdHkiLCJkYXRlRm9ybWF0IiwiZ2V0RGF0ZUZvcm1hdCIsInVzZXIiLCJmaWx0ZXIiLCJyb3ciLCJoaXRzIiwiZmlsdGVyVmFsdWUiLCJmaWx0ZXJDb2x1bW4iLCJjb2x1bW4iLCJnZXRDb2x1bW5LZXkiLCJyb3dEYXRhIiwidmFsdWVLZXlQYXRoIiwiZmlsdGVyTWF0Y2hlciIsImdldEZpbHRlck1hdGNoZXIiLCJzaXplIiwic2V0QW5kQXBwbHlGaWx0ZXJzIiwiZmlsdGVyaW5nRGF0YSIsIm5vcm1hbGl6ZUZpbHRlcmluZ0RhdGEiLCJmaWx0ZXJDZWxsVmFsdWVDaGFuZ2UiLCJ2YWx1ZSIsIm9yaWdGaWx0ZXJEYXRhIiwiY29sdW1uS2V5IiwidmFsdWVFbXB0eUNoZWNrZXIiLCJnZXRWYWx1ZUVtcHR5Q2hlY2tlciIsImRlbGV0ZSIsInNldCIsInNhdmVGaWx0ZXJEYXRhIiwiYXBwbHlTb3J0Iiwic29ydERhdGEiLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwiY29sIiwib3JpZ0FsbERhdGEiLCJjb21wYXJhdG9yIiwiZ2V0U29ydENvbXBhcmF0b3IiLCJ2YWx1ZUdldHRlciIsImdldFNvcnRWYWx1ZUdldHRlciIsInNvcnQiLCJhIiwiYiIsInZhbEEiLCJ2YWxCIiwic29ydENoYW5nZSIsIm5ld1NvcnQiLCJzYXZlU29ydERhdGEiLCJzZXREYXRhIiwiY2hlY2tDb2x1bW5zUGFyYW0iLCJjb25maWdEYXRhIiwibG9hZEdyaWRDb25maWciLCJpbW11dGFibGVEYXRhIiwiSW1tdXRhYmxlIiwiSXRlcmFibGUiLCJpc0l0ZXJhYmxlIiwiZnJvbUpTIiwic2VsZWN0ZWRJdGVtcyIsImxvYWRTZWxlY3RlZEl0ZW1zIiwiZmluZCIsImRhdGFJdGVtIiwiaWRLZXlQYXRoIiwiaXRlbSIsImNvbmZpZyIsImV4dGVuZERhdGEiLCJwcmVwZW5kIiwicmVzaXplQ29sdW1uIiwid2lkdGgiLCJjb2x1bW5XaWR0aHMiLCJzYXZlQ29sdW1uV2lkdGhzIiwiZWRpdCIsImNhbmNlbCIsInNhdmUiLCJjYiIsInNhdmVTdWNjZXNzIiwic2F2ZWRJdGVtcyIsInNhdmVQYXJ0aWFsU3VjY2VzcyIsInNhdmVGYWlsIiwiY3JlYXRlIiwiY29sdW1uRGVmYXVsdFZhbHVlcyIsImFkZE5ld0l0ZW0iLCJyZW1vdmVJdGVtIiwicm93SWQiLCJyZW1vdmVOZXdJdGVtIiwiaW5kZXgiLCJyZW1vdmVOZXdJdGVtcyIsImluZGV4ZXMiLCJyZW1vdmUiLCJyZW1vdmVTdWNjZXNzIiwicmVtb3ZlZElkcyIsInJlbW92ZUZhaWwiLCJlZGl0Q2VsbFZhbHVlQ2hhbmdlIiwiZGF0YUlkIiwia2V5UGF0aCIsImVkaXRDZWxsVmFsdWVWYWxpZGF0ZSIsInZhbGlkYXRvcnMiLCJ2YWxpZGF0aW9uU3RhdGUiLCJ2YWxpZCIsInZhbGlkYXRvciIsInVuaXF1ZSIsInVuZGVmaW5lZCIsImVkaXREYXRhIiwiZWRpdERhdGFJdGVtIiwiZWRpdERhdGFJdGVtSWQiLCJmb3VuZEluZGV4IiwiZmluZEluZGV4IiwiZCIsIm1lcmdlRGVlcEluIiwiZmluZGluZyIsImxlbmd0aCIsIm1lc3NhZ2UiLCJ2YWxpZGF0ZVdpdGhSb3dEYXRhIiwibWVyZ2VEZWVwIiwicGFyYW1zIiwiT2JqZWN0IiwidmFsdWVzIiwidmFsaWRhdGUiLCJtZXNzYWdlVmFsdWVzIiwibWVzc2FnZVR5cGUiLCJtZXNzYWdlSWQiLCJjcmVhdGVDZWxsVmFsdWVDaGFuZ2UiLCJyb3dJbmRleCIsImNyZWF0ZUNlbGxWYWx1ZVZhbGlkYXRlIiwiZmluZDIiLCJpIiwiY2VsbFNob3dNZXNzYWdlIiwiY2VsbFNob3dNZXNzYWdlcyIsIm1lc3NhZ2VzIiwiY2VsbEhpZGVNZXNzYWdlIiwiY3JlYXRlQ2VsbFNob3dNZXNzYWdlIiwiY3JlYXRlQ2VsbEhpZGVNZXNzYWdlIiwiY2VsbFNlbGVjdGlvbkNoYW5nZSIsInNlbGVjdGVkQ2VsbCIsIml0ZW1TZWxlY3Rpb25DaGFuZ2UiLCJjdHJsUHJlc3NlZCIsInNoaWZ0UHJlc3NlZCIsInNhdmVTZWxlY3RlZEl0ZW1zIiwic2VsZWN0QWxsSXRlbXNDaGFuZ2UiLCJjbGVhclNlbGVjdGVkSXRlbXMiLCJ0b2dnbGVGaWx0ZXJpbmciLCJpc0ZpbHRlcmluZyIsInNhdmVJc0ZpbHRlcmluZyIsInZhbGlkYXRlRWRpdGVkUm93cyIsImFsbEdvb2QiLCJlZGl0RGF0YVJvdyIsImlzVmFsaWQiLCJyZW1vdmVFbXB0eUNyZWF0ZWRSb3dzIiwiY3JlYXRlRGF0YSIsImNyZWF0ZURhdGFSb3ciLCJwdXNoIiwidmFsaWRhdGVDcmVhdGVkUm93cyIsInVwZGF0ZUV4aXN0aW5nQ2VsbFZhbHVlIiwic2V0RWRpdERhdGEiLCJjZWxsTWVzc2FnZXMiLCJvcGVuQ29sdW1uU2V0dGluZ3NNb2RhbCIsImNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbCIsInNhdmVDb2x1bW5TZXR0aW5ncyIsImhpZGRlbkNvbHVtbnMiLCJjb2x1bW5PcmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7QUFFTyxJQUFNQSx3QkFBUTtBQUNuQkMsZ0NBQThCLDhCQURYO0FBRW5CQywwQkFBd0Isd0JBRkw7QUFHbkJDLDJCQUF5Qix5QkFITjtBQUluQkMsOEJBQTRCLDRCQUpUO0FBS25CQyxnQ0FBOEIsOEJBTFg7QUFNbkJDLGlDQUErQiwrQkFOWjtBQU9uQkMsbUNBQWlDLGlDQVBkO0FBUW5CQywwQkFBd0Isd0JBUkw7QUFTbkJDLDRCQUEwQiwwQkFUUDtBQVVuQkMsMEJBQXdCLHdCQVZMO0FBV25CQyxpQ0FBK0IsK0JBWFo7QUFZbkJDLGtDQUFnQyxnQ0FaYjtBQWFuQkMsMENBQXdDLHdDQWJyQjtBQWNuQkMsK0JBQTZCLDZCQWRWO0FBZW5CQyw0QkFBMEIsMEJBZlA7QUFn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QUEsQ0FBaEM7O0FBU0EsSUFBTStLLDhEQUEyQixTQUEzQkEsd0JBQTJCO0FBQUEsU0FDdEMsVUFBQ3BMLFFBQUQsRUFBYztBQUNaQyx1QkFBTUMsY0FBTixDQUFxQkMsSUFBckI7QUFDQUgsYUFBUztBQUNQSSxZQUFNbEQsTUFBTTBDLDZDQURMO0FBRVBTLFVBQUlGLEtBQUtFO0FBRkYsS0FBVDtBQUlELEdBUHFDO0FBQUEsQ0FBakM7O0FBU0EsSUFBTWdMLGtEQUFxQixTQUFyQkEsa0JBQXFCLENBQUNsTCxJQUFELEVBQU9tTCxhQUFQLEVBQXNCQyxXQUF0QjtBQUFBLFNBQ2hDLFVBQUN2TCxRQUFELEVBQWM7QUFDWkMsdUJBQU1DLGNBQU4sQ0FBcUJDLElBQXJCO0FBQ0FGLHVCQUFNb0wsa0JBQU4sQ0FBeUJsTCxJQUF6QixFQUErQm1MLGFBQS9CLEVBQThDQyxXQUE5QztBQUNBdkwsYUFBUztBQUNQSSxZQUFNbEQsTUFBTTJDLHNDQURMO0FBRVBRLFVBQUlGLEtBQUtFLEVBRkY7QUFHUGtMO0FBSE8sS0FBVDtBQUtELEdBVCtCO0FBQUEsQ0FBM0IiLCJmaWxlIjoiZGF0YWdyaWQuYWN0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJbW11dGFibGUsIHsgTWFwIH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCBVdGlscyBmcm9tICcuL2RhdGFncmlkLnV0aWxzJztcblxuZXhwb3J0IGNvbnN0IFRZUEVTID0ge1xuICBQTEFURk9STV9EQVRBR1JJRF9JTlZBTElEQVRFOiAnUExBVEZPUk1fREFUQUdSSURfSU5WQUxJREFURScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0JVU1k6ICdQTEFURk9STV9EQVRBR1JJRF9CVVNZJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVBRFk6ICdQTEFURk9STV9EQVRBR1JJRF9SRUFEWScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NFVF9EQVRBOiAnUExBVEZPUk1fREFUQUdSSURfU0VUX0RBVEEnLFxuICBQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9TT1JUOiAnUExBVEZPUk1fREFUQUdSSURfQVBQTFlfU09SVCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NPUlRfQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfU09SVF9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRVNJWkVfQ09MVU1OOiAnUExBVEZPUk1fREFUQUdSSURfUkVTSVpFX0NPTFVNTicsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0VESVQ6ICdQTEFURk9STV9EQVRBR1JJRF9FRElUJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0FOQ0VMOiAnUExBVEZPUk1fREFUQUdSSURfQ0FOQ0VMJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0FWRTogJ1BMQVRGT1JNX0RBVEFHUklEX1NBVkUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9FWFRFTkRfREFUQTogJ1BMQVRGT1JNX0RBVEFHUklEX0VYVEVORF9EQVRBJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0FWRV9TVUNDRVNTOiAnUExBVEZPUk1fREFUQUdSSURfU0FWRV9TVUNDRVNTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0FWRV9QQVJUSUFMX1NVQ0NFU1M6ICdQTEFURk9STV9EQVRBR1JJRF9TQVZFX1BBUlRJQUxfU1VDQ0VTUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NBVkVfRkFJTDogJ1BMQVRGT1JNX0RBVEFHUklEX1NBVkVfRkFJTCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NSRUFURTogJ1BMQVRGT1JNX0RBVEFHUklEX0NSRUFURScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0FERF9ORVdfSVRFTTogJ1BMQVRGT1JNX0RBVEFHUklEX0FERF9ORVdfSVRFTScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9JVEVNOiAnUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0lURU0nLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU06ICdQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU0nLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU1TOiAnUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRTogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9TVUNDRVNTOiAnUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX1NVQ0NFU1MnLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfRkFJTDogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9GQUlMJyxcbiAgUExBVEZPUk1fREFUQUdSSURfRURJVF9DRUxMX1ZBTFVFX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX0VESVRfQ0VMTF9WQUxVRV9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0VTOiAnUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0VTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0VMTF9ISURFX01FU1NBR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX0hJREVfTUVTU0FHRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX0hJREVfTUVTU0FHRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX1ZBTElEQVRFOiAnUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfVkFMSURBVEUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NFTEVDVElPTl9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NFTEVDVElPTl9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9JVEVNX1NFTEVDVElPTl9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9JVEVNX1NFTEVDVElPTl9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRUxFQ1RfQUxMX0lURU1TX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX1NFTEVDVF9BTExfSVRFTVNfQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0xFQVJfU0VMRUNURURfSVRFTVM6ICdQTEFURk9STV9EQVRBR1JJRF9DTEVBUl9TRUxFQ1RFRF9JVEVNUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1RPR0dMRV9GSUxURVJJTkc6ICdQTEFURk9STV9EQVRBR1JJRF9UT0dHTEVfRklMVEVSSU5HJyxcbiAgUExBVEZPUk1fREFUQUdSSURfRklMVEVSX0RBVEFfQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfRklMVEVSX0RBVEFfQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQVBQTFlfRklMVEVSUzogJ1BMQVRGT1JNX0RBVEFHUklEX0FQUExZX0ZJTFRFUlMnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRVRfRklMVEVSUzogJ1BMQVRGT1JNX0RBVEFHUklEX1NFVF9GSUxURVJTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfVVBEQVRFX0VYSVNUSU5HX0NFTExfVkFMVUU6ICdQTEFURk9STV9EQVRBR1JJRF9VUERBVEVfRVhJU1RJTkdfQ0VMTF9WQUxVRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NFVF9FRElUX0RBVEE6ICdQTEFURk9STV9EQVRBR1JJRF9TRVRfRURJVF9EQVRBJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX09QRU46ICdQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfT1BFTicsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFOiAnUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX1NBVkUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9GT1JDRV9SRUZSRVNIOiAnUExBVEZPUk1fREFUQUdSSURfRk9SQ0VfUkVGUkVTSCcsXG59O1xuXG5leHBvcnQgY29uc3QgaW52YWxpZGF0ZSA9IGdyaWQgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfSU5WQUxJREFURSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgZm9yY2VSZWZyZXNoID0gKCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIC8vIEZpcmUgcmVzaXplIGV2ZW50IHRvIHJlY2FsY3VsYXRlIGNvbXBvbmVudCBzaXplc1xuICAvLyBhbmQgdG8gZm9yY2UgcmVkcmF3IHRoZSBncmlkXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGlmIChkb2N1bWVudC5jcmVhdGVFdmVudCkge1xuICAgICAgY29uc3QgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKTtcbiAgICAgIGV2dC5pbml0RXZlbnQoJ3Jlc2l6ZScsIHRydWUsIGZhbHNlKTtcbiAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gICAgfVxuICB9LCAxKTtcbiAgZGlzcGF0Y2goeyB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9GT1JDRV9SRUZSRVNIIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldEJ1c3kgPSBncmlkID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0JVU1ksXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHNldFJlYWR5ID0gZ3JpZCA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRUFEWSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgYXBwbHlGaWx0ZXJzID0gKGdyaWQsIGNvbHVtbnMpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBpZiAoIWNvbHVtbnMgfHwgIWNvbHVtbnMuZm9yRWFjaCkgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG4gICAgaWYgKCFncmlkRGF0YSkgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IGZpbHRlckRhdGEgPSBncmlkRGF0YS5nZXRJbihbJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2ZpbHRlckRhdGEnXSwgTWFwKCkpO1xuICAgIGNvbnN0IGFsbERhdGEgPSBncmlkRGF0YS5nZXQoJ2FsbERhdGEnKTtcbiAgICBzZXRCdXN5KGdyaWQpKGRpc3BhdGNoKTtcbiAgICBsZXQgZGF0YTtcbiAgICBpZiAoZmlsdGVyRGF0YS5pc0VtcHR5KCkpIHtcbiAgICAgIGRhdGEgPSBhbGxEYXRhO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkYXRlRm9ybWF0ID0gVXRpbHMuZ2V0RGF0ZUZvcm1hdChncmlkLCBnZXRTdGF0ZSgpLnVzZXIpO1xuICAgICAgZGF0YSA9IGFsbERhdGEuZmlsdGVyKChyb3cpID0+IHtcbiAgICAgICAgbGV0IGhpdHMgPSAwO1xuICAgICAgICBmaWx0ZXJEYXRhLmZvckVhY2goKGZpbHRlclZhbHVlLCBmaWx0ZXJDb2x1bW4pID0+IHtcbiAgICAgICAgICBjb2x1bW5zLmZvckVhY2goKGNvbHVtbikgPT4ge1xuICAgICAgICAgICAgaWYgKFV0aWxzLmdldENvbHVtbktleShjb2x1bW4pID09PSBmaWx0ZXJDb2x1bW4pIHtcbiAgICAgICAgICAgICAgY29uc3Qgcm93RGF0YSA9IHJvdy5nZXRJbihjb2x1bW4udmFsdWVLZXlQYXRoKTtcbiAgICAgICAgICAgICAgaWYgKHJvd0RhdGEgfHwgcm93RGF0YSA9PT0gMCB8fCByb3dEYXRhID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlck1hdGNoZXIgPSBVdGlscy5nZXRGaWx0ZXJNYXRjaGVyKGNvbHVtbiwgZGF0ZUZvcm1hdCk7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlck1hdGNoZXIocm93RGF0YSwgZmlsdGVyVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICBoaXRzICs9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gaGl0cyA9PT0gZmlsdGVyRGF0YS5zaXplO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0FQUExZX0ZJTFRFUlMsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGRhdGEsXG4gICAgfSk7XG4gICAgc2V0UmVhZHkoZ3JpZCkoZGlzcGF0Y2gpO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG5leHBvcnQgY29uc3Qgc2V0QW5kQXBwbHlGaWx0ZXJzID0gKGdyaWQsIGNvbHVtbnMsIGZpbHRlcmluZ0RhdGEpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NFVF9GSUxURVJTLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBmaWx0ZXJpbmdEYXRhOiBVdGlscy5ub3JtYWxpemVGaWx0ZXJpbmdEYXRhKGZpbHRlcmluZ0RhdGEpLFxuICAgIH0pO1xuICAgIGRpc3BhdGNoKGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBmaWx0ZXJDZWxsVmFsdWVDaGFuZ2UgPSAoZ3JpZCwgY29sdW1ucywgY29sdW1uLCB2YWx1ZSkgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGNvbnN0IG9yaWdGaWx0ZXJEYXRhID0gZ2V0U3RhdGUoKVxuICAgICAgLmRhdGFncmlkXG4gICAgICAuZ2V0SW4oW2dyaWQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdmaWx0ZXJEYXRhJ10sIE1hcCgpKTtcbiAgICBjb25zdCBjb2x1bW5LZXkgPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sdW1uKTtcbiAgICBjb25zdCB2YWx1ZUVtcHR5Q2hlY2tlciA9IFV0aWxzLmdldFZhbHVlRW1wdHlDaGVja2VyKGNvbHVtbik7XG4gICAgbGV0IGZpbHRlckRhdGE7XG4gICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbHVlKSkge1xuICAgICAgZmlsdGVyRGF0YSA9IG9yaWdGaWx0ZXJEYXRhLmRlbGV0ZShjb2x1bW5LZXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaWx0ZXJEYXRhID0gb3JpZ0ZpbHRlckRhdGEuc2V0KGNvbHVtbktleSwgdmFsdWUpO1xuICAgIH1cbiAgICBVdGlscy5zYXZlRmlsdGVyRGF0YShncmlkLCBmaWx0ZXJEYXRhKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9GSUxURVJfREFUQV9DSEFOR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGZpbHRlckRhdGEsXG4gICAgfSk7XG4gICAgYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBhcHBseVNvcnQgPSAoZ3JpZCwgY29sdW1ucykgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGlmICghY29sdW1ucyB8fCAhY29sdW1ucy5mb3JFYWNoKSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3QgZ3JpZERhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldChncmlkLmlkKTtcbiAgICBpZiAoIWdyaWREYXRhKSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3Qgc29ydERhdGEgPSBncmlkRGF0YS5nZXRJbihbJ2NvbmZpZycsICdzb3J0aW5nRGF0YSddKTtcbiAgICBpZiAoIXNvcnREYXRhKSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3Qgc29ydENvbHVtbiA9IHNvcnREYXRhLmdldCgnc29ydENvbHVtbicpO1xuICAgIGlmICghc29ydENvbHVtbikgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IHNvcnRPcmRlciA9IHNvcnREYXRhLmdldCgnc29ydE9yZGVyJywgJ2FzYycpO1xuICAgIGxldCBjb2x1bW47XG4gICAgY29sdW1ucy5mb3JFYWNoKChjb2wpID0+IHtcbiAgICAgIGlmIChVdGlscy5nZXRDb2x1bW5LZXkoY29sKSA9PT0gc29ydENvbHVtbikge1xuICAgICAgICBjb2x1bW4gPSBjb2w7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKCFjb2x1bW4pIHJldHVybiBmYWxzZTtcblxuICAgIHNldEJ1c3koZ3JpZCkoZGlzcGF0Y2gpO1xuICAgIGNvbnN0IG9yaWdBbGxEYXRhID0gZ3JpZERhdGEuZ2V0KCdhbGxEYXRhJyk7XG4gICAgY29uc3QgY29tcGFyYXRvciA9IFV0aWxzLmdldFNvcnRDb21wYXJhdG9yKGNvbHVtbik7XG4gICAgY29uc3QgdmFsdWVHZXR0ZXIgPSBVdGlscy5nZXRTb3J0VmFsdWVHZXR0ZXIoY29sdW1uKTtcbiAgICBjb25zdCB2YWx1ZUVtcHR5Q2hlY2tlciA9IFV0aWxzLmdldFZhbHVlRW1wdHlDaGVja2VyKGNvbHVtbik7XG4gICAgY29uc3QgYWxsRGF0YSA9IG9yaWdBbGxEYXRhLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIGNvbnN0IHZhbEEgPSB2YWx1ZUdldHRlcihhKTtcbiAgICAgIGNvbnN0IHZhbEIgPSB2YWx1ZUdldHRlcihiKTtcbiAgICAgIGlmIChzb3J0T3JkZXIgPT09ICdhc2MnKSB7XG4gICAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxBKSkgcmV0dXJuIC0xO1xuICAgICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQikpIHJldHVybiAxO1xuICAgICAgICByZXR1cm4gY29tcGFyYXRvcih2YWxBLCB2YWxCKTtcbiAgICAgIH1cbiAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxBKSkgcmV0dXJuIDE7XG4gICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQikpIHJldHVybiAtMTtcbiAgICAgIHJldHVybiBjb21wYXJhdG9yKHZhbEIsIHZhbEEpO1xuICAgIH0pO1xuICAgIGxldCBkYXRhO1xuICAgIC8vIFNvcnQgYWxzbyBmaWx0ZXJlZCBkYXRhIHNlcGFyYXRlbHlcbiAgICBpZiAoZ3JpZERhdGEuZ2V0SW4oWydjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdpc0ZpbHRlcmluZyddLCBmYWxzZSkpIHtcbiAgICAgIGRhdGEgPSBncmlkRGF0YS5nZXQoJ2RhdGEnKS5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbEEgPSB2YWx1ZUdldHRlcihhKTtcbiAgICAgICAgY29uc3QgdmFsQiA9IHZhbHVlR2V0dGVyKGIpO1xuICAgICAgICBpZiAoc29ydE9yZGVyID09PSAnYXNjJykge1xuICAgICAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxBKSkgcmV0dXJuIC0xO1xuICAgICAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxCKSkgcmV0dXJuIDE7XG4gICAgICAgICAgcmV0dXJuIGNvbXBhcmF0b3IodmFsQSwgdmFsQik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEEpKSByZXR1cm4gMTtcbiAgICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEIpKSByZXR1cm4gLTE7XG4gICAgICAgIHJldHVybiBjb21wYXJhdG9yKHZhbEIsIHZhbEEpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGEgPSBhbGxEYXRhO1xuICAgIH1cbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9BUFBMWV9TT1JULFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBkYXRhLFxuICAgICAgYWxsRGF0YSxcbiAgICB9KTtcbiAgICBzZXRSZWFkeShncmlkKShkaXNwYXRjaCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBzb3J0Q2hhbmdlID0gKGdyaWQsIGNvbHVtbnMsIGNvbHVtbiwgbmV3U29ydCkgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGNvbnN0IHNvcnRPcmRlciA9IG5ld1NvcnQgfHwgJ2FzYyc7XG4gICAgY29uc3Qgc29ydENvbHVtbiA9IFV0aWxzLmdldENvbHVtbktleShjb2x1bW4pO1xuICAgIFV0aWxzLnNhdmVTb3J0RGF0YShncmlkLCB7IHNvcnRDb2x1bW4sIHNvcnRPcmRlciB9KTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TT1JUX0NIQU5HRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgc29ydENvbHVtbixcbiAgICAgIHNvcnRPcmRlcixcbiAgICB9KTtcbiAgICBhcHBseVNvcnQoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHNldERhdGEgPSAoZ3JpZCwgY29sdW1ucywgZGF0YSkgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIFV0aWxzLmNoZWNrQ29sdW1uc1BhcmFtKGNvbHVtbnMpO1xuICAgIGNvbnN0IGNvbmZpZ0RhdGEgPSBVdGlscy5sb2FkR3JpZENvbmZpZyhncmlkLCBjb2x1bW5zKTtcbiAgICBjb25zdCBpbW11dGFibGVEYXRhID0gSW1tdXRhYmxlLkl0ZXJhYmxlLmlzSXRlcmFibGUoZGF0YSkgPyBkYXRhIDogSW1tdXRhYmxlLmZyb21KUyhkYXRhKTtcbiAgICBjb25zdCBzZWxlY3RlZEl0ZW1zID0gVXRpbHMubG9hZFNlbGVjdGVkSXRlbXMoZ3JpZCkuZmlsdGVyKGl0ZW0gPT4gKFxuICAgICAgISFpbW11dGFibGVEYXRhLmZpbmQoZGF0YUl0ZW0gPT4gZGF0YUl0ZW0uZ2V0SW4oZ3JpZC5pZEtleVBhdGgpID09PSBpdGVtKVxuICAgICkpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NFVF9EQVRBLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBkYXRhOiBpbW11dGFibGVEYXRhLFxuICAgICAgY29uZmlnOiBjb25maWdEYXRhLFxuICAgICAgc2VsZWN0ZWRJdGVtcyxcbiAgICB9KTtcbiAgICBhcHBseUZpbHRlcnMoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgICBhcHBseVNvcnQoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGV4dGVuZERhdGEgPSAoZ3JpZCwgY29sdW1ucywgZGF0YSwgcHJlcGVuZCA9IGZhbHNlKSA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgY29uc3QgaW1tdXRhYmxlRGF0YSA9IEltbXV0YWJsZS5JdGVyYWJsZS5pc0l0ZXJhYmxlKGRhdGEpID8gZGF0YSA6IEltbXV0YWJsZS5mcm9tSlMoZGF0YSk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfRVhURU5EX0RBVEEsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGRhdGE6IGltbXV0YWJsZURhdGEsXG4gICAgICBwcmVwZW5kLFxuICAgIH0pO1xuICAgIGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICAgIGFwcGx5U29ydChncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICB9O1xuXG5leHBvcnQgY29uc3QgcmVzaXplQ29sdW1uID0gKGdyaWQsIGNvbHVtbktleSwgd2lkdGgpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBjb25zdCBjb2x1bW5XaWR0aHMgPSBnZXRTdGF0ZSgpXG4gICAgICAuZGF0YWdyaWRcbiAgICAgIC5nZXRJbihbZ3JpZC5pZCwgJ2NvbmZpZycsICdjb2x1bW5XaWR0aHMnXSwgTWFwKCkpXG4gICAgICAuc2V0KGNvbHVtbktleSwgd2lkdGgpO1xuICAgIFV0aWxzLnNhdmVDb2x1bW5XaWR0aHMoZ3JpZCwgY29sdW1uV2lkdGhzKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRVNJWkVfQ09MVU1OLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBjb2x1bW5XaWR0aHMsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBlZGl0ID0gZ3JpZCA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9FRElULFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBjYW5jZWwgPSBncmlkID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NBTkNFTCxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3Qgc2F2ZSA9IChncmlkLCBjYiA9ICgpID0+IHt9KSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TQVZFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgfSk7XG4gICAgY2IoKTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHNhdmVTdWNjZXNzID0gKGdyaWQsIGNvbHVtbnMsIHNhdmVkSXRlbXMpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TQVZFX1NVQ0NFU1MsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgICBzYXZlZEl0ZW1zLFxuICAgIH0pO1xuICAgIGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICAgIGFwcGx5U29ydChncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICB9O1xuXG5leHBvcnQgY29uc3Qgc2F2ZVBhcnRpYWxTdWNjZXNzID0gKGdyaWQsIGNvbHVtbnMsIHNhdmVkSXRlbXMpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TQVZFX1BBUlRJQUxfU1VDQ0VTUyxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgICAgIHNhdmVkSXRlbXMsXG4gICAgfSk7XG4gICAgYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gICAgYXBwbHlTb3J0KGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBzYXZlRmFpbCA9IGdyaWQgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0FWRV9GQUlMLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGUgPSAoZ3JpZCwgY29sdW1uRGVmYXVsdFZhbHVlcykgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBjb2x1bW5EZWZhdWx0VmFsdWVzLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgYWRkTmV3SXRlbSA9IChncmlkLCBjb2x1bW5EZWZhdWx0VmFsdWVzKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9BRERfTkVXX0lURU0sXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGNvbHVtbkRlZmF1bHRWYWx1ZXMsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVJdGVtID0gKGdyaWQsIHJvd0lkKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfSVRFTSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgICAgIHJvd0lkLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlTmV3SXRlbSA9IChncmlkLCBpbmRleCkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBpbmRleCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZU5ld0l0ZW1zID0gKGdyaWQsIGluZGV4ZXMpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTVMsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGluZGV4ZXMsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCByZW1vdmUgPSAoZ3JpZCwgY2IgPSAoKSA9PiB7fSkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgfSk7XG4gICAgY2IoKTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZVN1Y2Nlc3MgPSAoZ3JpZCwgcmVtb3ZlZElkcykgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX1NVQ0NFU1MsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgICByZW1vdmVkSWRzLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlRmFpbCA9IGdyaWQgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUwsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGVkaXRDZWxsVmFsdWVDaGFuZ2UgPSAoZ3JpZCwgZGF0YUlkLCBrZXlQYXRoLCB2YWx1ZSkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfRURJVF9DRUxMX1ZBTFVFX0NIQU5HRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgZGF0YUlkLFxuICAgICAga2V5UGF0aCxcbiAgICAgIHZhbHVlLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgZWRpdENlbGxWYWx1ZVZhbGlkYXRlID0gKFxuICBncmlkLFxuICBkYXRhSWQsXG4gIGtleVBhdGgsXG4gIHZhbHVlLFxuICB2YWxpZGF0b3JzID0gW10sXG4pID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBsZXQgdmFsaWRhdGlvblN0YXRlID0geyB2YWxpZDogdHJ1ZSB9O1xuICAgIHZhbGlkYXRvcnMuZm9yRWFjaCgodmFsaWRhdG9yKSA9PiB7XG4gICAgICBpZiAodmFsaWRhdGlvblN0YXRlLnZhbGlkKSB7XG4gICAgICAgIGlmICh2YWxpZGF0b3IudW5pcXVlKSB7XG4gICAgICAgICAgaWYgKHZhbHVlICE9PSAnJyB8fCB2YWx1ZSAhPT0gbnVsbCB8fCB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBjb21iaW5lIHJlYWwgZGF0YSB3aXRoIGN1cnJlbnQgdW5zYXZlZCBlZGl0ZWQgZGF0YVxuICAgICAgICAgICAgY29uc3QgZ3JpZERhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldChncmlkLmlkKTtcbiAgICAgICAgICAgIGNvbnN0IGVkaXREYXRhID0gZ3JpZERhdGEuZ2V0KCdlZGl0RGF0YScpO1xuICAgICAgICAgICAgbGV0IGFsbERhdGEgPSBncmlkRGF0YS5nZXQoJ2FsbERhdGEnKTtcbiAgICAgICAgICAgIGlmIChlZGl0RGF0YSkge1xuICAgICAgICAgICAgICBlZGl0RGF0YS5mb3JFYWNoKChlZGl0RGF0YUl0ZW0sIGVkaXREYXRhSXRlbUlkKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZm91bmRJbmRleCA9XG4gICAgICAgICAgICAgICAgICBhbGxEYXRhLmZpbmRJbmRleChkID0+IGQuZ2V0SW4oZ3JpZC5pZEtleVBhdGgpID09PSBlZGl0RGF0YUl0ZW1JZCk7XG4gICAgICAgICAgICAgICAgaWYgKGZvdW5kSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICBhbGxEYXRhID0gYWxsRGF0YS5tZXJnZURlZXBJbihbZm91bmRJbmRleF0sIGVkaXREYXRhSXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGRldGVybWluZSB1bmlxdWVuZXNzXG4gICAgICAgICAgICBjb25zdCBmaW5kaW5nID0gYWxsRGF0YS5maW5kKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChncmlkLmlkS2V5UGF0aC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAvLyBkb24ndCBzZWxmIGNvbXBhcmVcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGRhdGFJZCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gaXRlbS5nZXRJbihrZXlQYXRoKSA9PT0gdmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChmaW5kaW5nKSB7XG4gICAgICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICB2YWxpZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ1ZhbGlkYXRpb24uVW5pcXVlJyxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodmFsaWRhdG9yLnZhbGlkYXRlV2l0aFJvd0RhdGEpIHtcbiAgICAgICAgICBjb25zdCBncmlkRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0KGdyaWQuaWQpO1xuICAgICAgICAgIGNvbnN0IGVkaXREYXRhID0gZ3JpZERhdGEuZ2V0SW4oWydlZGl0RGF0YScsIGRhdGFJZF0sIE1hcCgpKTtcbiAgICAgICAgICBsZXQgcm93RGF0YSA9IGdyaWREYXRhLmdldCgnYWxsRGF0YScpLmZpbmQoaXRlbSA9PiBpdGVtLmdldEluKGdyaWQuaWRLZXlQYXRoKSA9PT0gZGF0YUlkKTtcbiAgICAgICAgICBpZiAocm93RGF0YSkge1xuICAgICAgICAgICAgcm93RGF0YSA9IHJvd0RhdGEubWVyZ2VEZWVwKGVkaXREYXRhKTtcbiAgICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZVdpdGhSb3dEYXRhKHZhbHVlLCByb3dEYXRhKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgcGFyYW1zID0gdmFsaWRhdG9yLnBhcmFtcyA/IE9iamVjdC52YWx1ZXModmFsaWRhdG9yLnBhcmFtcykgOiBbXTtcbiAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB2YWxpZGF0b3IudmFsaWRhdGUodmFsdWUsIC4uLnBhcmFtcyk7XG4gICAgICAgICAgaWYgKHZhbGlkYXRvci5wYXJhbXMpIHtcbiAgICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlVmFsdWVzID0gdmFsaWRhdG9yLnBhcmFtcztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAodmFsaWRhdGlvblN0YXRlLnZhbGlkKSB7XG4gICAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfSElERV9NRVNTQUdFLFxuICAgICAgICBpZDogZ3JpZC5pZCxcbiAgICAgICAgbWVzc2FnZVR5cGU6ICdlcnJvcicsXG4gICAgICAgIGRhdGFJZCxcbiAgICAgICAga2V5UGF0aCxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFLFxuICAgICAgICBpZDogZ3JpZC5pZCxcbiAgICAgICAgbWVzc2FnZVR5cGU6ICdlcnJvcicsXG4gICAgICAgIGRhdGFJZCxcbiAgICAgICAga2V5UGF0aCxcbiAgICAgICAgbWVzc2FnZUlkOiB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZSxcbiAgICAgICAgbWVzc2FnZVZhbHVlczogdmFsaWRhdGlvblN0YXRlLm1lc3NhZ2VWYWx1ZXMsXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbGlkYXRpb25TdGF0ZS52YWxpZDtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSA9IChncmlkLCByb3dJbmRleCwga2V5UGF0aCwgdmFsdWUpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX0NIQU5HRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgcm93SW5kZXgsXG4gICAgICBrZXlQYXRoLFxuICAgICAgdmFsdWUsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZSA9IChncmlkLCByb3dJbmRleCwga2V5UGF0aCwgdmFsdWUsIHZhbGlkYXRvcnMgPSBbXSkgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGxldCB2YWxpZGF0aW9uU3RhdGUgPSB7IHZhbGlkOiB0cnVlIH07XG4gICAgdmFsaWRhdG9ycy5mb3JFYWNoKCh2YWxpZGF0b3IpID0+IHtcbiAgICAgIGlmICh2YWxpZGF0aW9uU3RhdGUudmFsaWQpIHtcbiAgICAgICAgaWYgKHZhbGlkYXRvci51bmlxdWUpIHtcbiAgICAgICAgICBpZiAodmFsdWUgIT09ICcnIHx8IHZhbHVlICE9PSBudWxsIHx8IHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpbmRpbmcgPSBnZXRTdGF0ZSgpXG4gICAgICAgICAgICAgIC5kYXRhZ3JpZFxuICAgICAgICAgICAgICAuZ2V0SW4oW2dyaWQuaWQsICdhbGxEYXRhJ10pXG4gICAgICAgICAgICAgIC5maW5kKGl0ZW0gPT4gaXRlbS5nZXRJbihrZXlQYXRoKSA9PT0gdmFsdWUpO1xuICAgICAgICAgICAgaWYgKGZpbmRpbmcpIHtcbiAgICAgICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0ge1xuICAgICAgICAgICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnVmFsaWRhdGlvbi5VbmlxdWUnLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc3QgZmluZDIgPSBnZXRTdGF0ZSgpXG4gICAgICAgICAgICAgICAgLmRhdGFncmlkXG4gICAgICAgICAgICAgICAgLmdldEluKFtncmlkLmlkLCAnY3JlYXRlRGF0YSddKVxuICAgICAgICAgICAgICAgIC5maW5kKChpdGVtLCBpKSA9PiBpICE9PSByb3dJbmRleCAmJiBpdGVtLmdldEluKGtleVBhdGgpID09PSB2YWx1ZSk7XG4gICAgICAgICAgICAgIGlmIChmaW5kMikge1xuICAgICAgICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdWYWxpZGF0aW9uLlVuaXF1ZScsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh2YWxpZGF0b3IudmFsaWRhdGVXaXRoUm93RGF0YSkge1xuICAgICAgICAgIGNvbnN0IHJvd0RhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnY3JlYXRlRGF0YScsIHJvd0luZGV4XSk7XG4gICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0gdmFsaWRhdG9yLnZhbGlkYXRlV2l0aFJvd0RhdGEodmFsdWUsIHJvd0RhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IHZhbGlkYXRvci5wYXJhbXMgPyBPYmplY3QudmFsdWVzKHZhbGlkYXRvci5wYXJhbXMpIDogW107XG4gICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0gdmFsaWRhdG9yLnZhbGlkYXRlKHZhbHVlLCAuLi5wYXJhbXMpO1xuICAgICAgICAgIGlmICh2YWxpZGF0b3IucGFyYW1zKSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZVZhbHVlcyA9IHZhbGlkYXRvci5wYXJhbXM7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKHZhbGlkYXRpb25TdGF0ZS52YWxpZCkge1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9ISURFX01FU1NBR0UsXG4gICAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgICBtZXNzYWdlVHlwZTogJ2Vycm9yJyxcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIGtleVBhdGgsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9TSE9XX01FU1NBR0UsXG4gICAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgICBtZXNzYWdlVHlwZTogJ2Vycm9yJyxcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIGtleVBhdGgsXG4gICAgICAgIG1lc3NhZ2VJZDogdmFsaWRhdGlvblN0YXRlLm1lc3NhZ2UsXG4gICAgICAgIG1lc3NhZ2VWYWx1ZXM6IHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlVmFsdWVzLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB2YWxpZGF0aW9uU3RhdGUudmFsaWQ7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBjZWxsU2hvd01lc3NhZ2UgPSAoZ3JpZCwgbWVzc2FnZVR5cGUsIGRhdGFJZCwga2V5UGF0aCwgbWVzc2FnZUlkLCBtZXNzYWdlVmFsdWVzKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgbWVzc2FnZVR5cGUsXG4gICAgICBkYXRhSWQsXG4gICAgICBrZXlQYXRoLFxuICAgICAgbWVzc2FnZUlkLFxuICAgICAgbWVzc2FnZVZhbHVlcyxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGNlbGxTaG93TWVzc2FnZXMgPSAoZ3JpZCwgbWVzc2FnZXMpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFUyxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgbWVzc2FnZXMsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBjZWxsSGlkZU1lc3NhZ2UgPSAoZ3JpZCwgbWVzc2FnZVR5cGUgPSBudWxsLCBkYXRhSWQgPSBudWxsLCBrZXlQYXRoID0gbnVsbCkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0VMTF9ISURFX01FU1NBR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIG1lc3NhZ2VUeXBlLFxuICAgICAgZGF0YUlkLFxuICAgICAga2V5UGF0aCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNlbGxTaG93TWVzc2FnZSA9IChcbiAgZ3JpZCxcbiAgbWVzc2FnZVR5cGUsXG4gIHJvd0luZGV4LFxuICBrZXlQYXRoLFxuICBtZXNzYWdlSWQsXG4gIG1lc3NhZ2VWYWx1ZXMsXG4pID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgbWVzc2FnZVR5cGUsXG4gICAgICByb3dJbmRleCxcbiAgICAgIGtleVBhdGgsXG4gICAgICBtZXNzYWdlSWQsXG4gICAgICBtZXNzYWdlVmFsdWVzLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQ2VsbEhpZGVNZXNzYWdlID0gKGdyaWQsIG1lc3NhZ2VUeXBlID0gbnVsbCwgcm93SW5kZXggPSBudWxsLCBrZXlQYXRoID0gbnVsbCkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfSElERV9NRVNTQUdFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBtZXNzYWdlVHlwZSxcbiAgICAgIHJvd0luZGV4LFxuICAgICAga2V5UGF0aCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGNlbGxTZWxlY3Rpb25DaGFuZ2UgPSAoZ3JpZCwgc2VsZWN0ZWRDZWxsID0gbnVsbCkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgc2VsZWN0ZWRDZWxsLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX1NFTEVDVElPTl9DSEFOR0UsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBpdGVtU2VsZWN0aW9uQ2hhbmdlID0gKFxuICBncmlkLFxuICByb3dJbmRleCxcbiAgY3RybFByZXNzZWQgPSBmYWxzZSxcbiAgc2hpZnRQcmVzc2VkID0gZmFsc2UsXG4pID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9JVEVNX1NFTEVDVElPTl9DSEFOR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIHJvd0luZGV4LFxuICAgICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgICAgIGN0cmxQcmVzc2VkLFxuICAgICAgc2hpZnRQcmVzc2VkLFxuICAgIH0pO1xuICAgIFV0aWxzLnNhdmVTZWxlY3RlZEl0ZW1zKGdyaWQsIGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdzZWxlY3RlZEl0ZW1zJ10pKTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdEFsbEl0ZW1zQ2hhbmdlID0gZ3JpZCA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgfSk7XG4gICAgVXRpbHMuc2F2ZVNlbGVjdGVkSXRlbXMoZ3JpZCwgZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ3NlbGVjdGVkSXRlbXMnXSkpO1xuICB9O1xuXG5leHBvcnQgY29uc3QgY2xlYXJTZWxlY3RlZEl0ZW1zID0gZ3JpZCA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0xFQVJfU0VMRUNURURfSVRFTVMsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICB9KTtcbiAgICBVdGlscy5zYXZlU2VsZWN0ZWRJdGVtcyhncmlkLCBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnc2VsZWN0ZWRJdGVtcyddKSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCB0b2dnbGVGaWx0ZXJpbmcgPSBncmlkID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBjb25zdCBpc0ZpbHRlcmluZyA9ICFnZXRTdGF0ZSgpXG4gICAgICAuZGF0YWdyaWRcbiAgICAgIC5nZXRJbihbZ3JpZC5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2lzRmlsdGVyaW5nJ10sIGZhbHNlKTtcbiAgICBVdGlscy5zYXZlSXNGaWx0ZXJpbmcoZ3JpZCwgaXNGaWx0ZXJpbmcpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1RPR0dMRV9GSUxURVJJTkcsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGlzRmlsdGVyaW5nLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgdmFsaWRhdGVFZGl0ZWRSb3dzID0gKGdyaWQsIGNvbHVtbnMpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBjb25zdCBncmlkRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0KGdyaWQuaWQpO1xuICAgIGNvbnN0IGVkaXREYXRhID0gZ3JpZERhdGEuZ2V0KCdlZGl0RGF0YScsIE1hcCgpKTtcbiAgICBsZXQgYWxsR29vZCA9IHRydWU7XG4gICAgZWRpdERhdGEuZm9yRWFjaCgoZWRpdERhdGFSb3csIGRhdGFJZCkgPT4ge1xuICAgICAgY29sdW1ucy5mb3JFYWNoKChjb2wpID0+IHtcbiAgICAgICAgbGV0IHZhbHVlID0gZWRpdERhdGFSb3cuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdmFsdWUgPSBncmlkRGF0YVxuICAgICAgICAgICAgLmdldCgnYWxsRGF0YScpXG4gICAgICAgICAgICAuZmluZChkYXRhID0+IGRhdGEuZ2V0SW4oZ3JpZC5pZEtleVBhdGgpID09PSBkYXRhSWQpXG4gICAgICAgICAgICAuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXNWYWxpZCA9IGVkaXRDZWxsVmFsdWVWYWxpZGF0ZShcbiAgICAgICAgICBncmlkLFxuICAgICAgICAgIGRhdGFJZCxcbiAgICAgICAgICBjb2wudmFsdWVLZXlQYXRoLFxuICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgIGNvbC52YWxpZGF0b3JzLFxuICAgICAgICApKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gICAgICAgIGlmIChhbGxHb29kICYmICFpc1ZhbGlkKSB7XG4gICAgICAgICAgYWxsR29vZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gYWxsR29vZDtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZUVtcHR5Q3JlYXRlZFJvd3MgPSAoZ3JpZCwgY29sdW1ucykgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGNvbnN0IGNyZWF0ZURhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnY3JlYXRlRGF0YSddLCBNYXAoKSk7XG4gICAgY29uc3QgaW5kZXhlcyA9IFtdO1xuICAgIGNyZWF0ZURhdGEuZm9yRWFjaCgoY3JlYXRlRGF0YVJvdywgcm93SW5kZXgpID0+IHtcbiAgICAgIGxldCBpc0VtcHR5ID0gdHJ1ZTtcbiAgICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gY3JlYXRlRGF0YVJvdy5nZXRJbihjb2wudmFsdWVLZXlQYXRoKTtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09ICcnICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgaXNFbXB0eSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChpc0VtcHR5KSB7XG4gICAgICAgIGluZGV4ZXMucHVzaChyb3dJbmRleCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGluZGV4ZXMubGVuZ3RoID4gMCkge1xuICAgICAgcmVtb3ZlTmV3SXRlbXMoZ3JpZCwgaW5kZXhlcykoZGlzcGF0Y2gpO1xuICAgIH1cbiAgfTtcblxuZXhwb3J0IGNvbnN0IHZhbGlkYXRlQ3JlYXRlZFJvd3MgPSAoZ3JpZCwgY29sdW1ucykgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIHJlbW92ZUVtcHR5Q3JlYXRlZFJvd3MoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgICBjb25zdCBjcmVhdGVEYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ2NyZWF0ZURhdGEnXSwgTWFwKCkpO1xuICAgIGxldCBhbGxHb29kID0gdHJ1ZTtcbiAgICBjcmVhdGVEYXRhLmZvckVhY2goKGNyZWF0ZURhdGFSb3csIHJvd0luZGV4KSA9PiB7XG4gICAgICBjb2x1bW5zLmZvckVhY2goKGNvbCkgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGNyZWF0ZURhdGFSb3cuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG4gICAgICAgIGNvbnN0IGlzVmFsaWQgPSBjcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZShcbiAgICAgICAgICBncmlkLFxuICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgIGNvbC52YWx1ZUtleVBhdGgsXG4gICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgY29sLnZhbGlkYXRvcnMsXG4gICAgICAgICkoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgICAgICAgaWYgKGFsbEdvb2QgJiYgIWlzVmFsaWQpIHtcbiAgICAgICAgICBhbGxHb29kID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBhbGxHb29kO1xuICB9O1xuXG5leHBvcnQgY29uc3QgdXBkYXRlRXhpc3RpbmdDZWxsVmFsdWUgPSAoZ3JpZCwgZGF0YUlkLCBrZXlQYXRoLCB2YWx1ZSkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfVVBEQVRFX0VYSVNUSU5HX0NFTExfVkFMVUUsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGRhdGFJZCxcbiAgICAgIGtleVBhdGgsXG4gICAgICB2YWx1ZSxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHNldEVkaXREYXRhID0gKGdyaWQsIGRhdGEsIGNlbGxNZXNzYWdlcyA9IE1hcCgpKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICBkYXRhLFxuICAgICAgY2VsbE1lc3NhZ2VzLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfRURJVF9EQVRBLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3Qgb3BlbkNvbHVtblNldHRpbmdzTW9kYWwgPSBncmlkID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9PUEVOLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBjbG9zZUNvbHVtblNldHRpbmdzTW9kYWwgPSBncmlkID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3Qgc2F2ZUNvbHVtblNldHRpbmdzID0gKGdyaWQsIGhpZGRlbkNvbHVtbnMsIGNvbHVtbk9yZGVyKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBVdGlscy5zYXZlQ29sdW1uU2V0dGluZ3MoZ3JpZCwgaGlkZGVuQ29sdW1ucywgY29sdW1uT3JkZXIpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBjb2x1bW5PcmRlcixcbiAgICB9KTtcbiAgfTtcblxuIl19