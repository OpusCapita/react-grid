'use strict';

exports.__esModule = true;
exports.saveColumnSettings = exports.closeColumnSettingsModal = exports.openColumnSettingsModal = exports.setEditData = exports.updateExistingCellValue = exports.validateCreatedRows = exports.removeEmptyCreatedRows = exports.validateEditedRows = exports.toggleFiltering = exports.clearSelectedItems = exports.selectAllItemsChange = exports.itemSelectionChange = exports.cellSelectionChange = exports.createCellHideMessage = exports.createCellShowMessage = exports.cellHideMessage = exports.cellShowMessages = exports.cellShowMessage = exports.createCellValueValidate = exports.createCellValueChange = exports.editCellValueValidate = exports.editCellValueChange = exports.removeFail = exports.removeSuccess = exports.remove = exports.removeNewItems = exports.removeNewItem = exports.removeItem = exports.addNewItem = exports.create = exports.saveFail = exports.savePartialSuccess = exports.saveSuccess = exports.save = exports.cancel = exports.edit = exports.resizeColumn = exports.extendData = exports.setFocusTo = exports.setData = exports.sortChange = exports.applySort = exports.filterCellValueChange = exports.setAndApplyFilters = exports.applyFilters = exports.setReady = exports.setBusy = exports.forceRefresh = exports.invalidate = exports.TYPES = undefined;

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
  PLATFORM_DATAGRID_FORCE_REFRESH: 'PLATFORM_DATAGRID_FORCE_REFRESH',
  PLATFORM_DATAGRID_SET_FOCUS_TO: 'PLATFORM_DATAGRID_SET_FOCUS_TO'
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
    // and to force redraw all mounted grids
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
/**
 * Action to set focus to either last editedRow, createdRow or to validation error
 * @param {Object} grid
 * @param {String} focusToType - type of focus request. Possible values:
 * 'focusToEditCell' || 'focusToErrorCell' || 'focusToCreateCell'
 * @param {boolean} focusToLastRow - sets focus to last data row instead of selected row
 */
var setFocusTo = exports.setFocusTo = function setFocusTo(grid, focusTo) {
  var focusToLastRow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return function (dispatch) {
    _datagrid2.default.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_SET_FOCUS_TO,
      focusTo: focusTo,
      focusToLastRow: focusToLastRow,
      id: grid.id
    });
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
            var params = validator.params ? Object.values(validator.params) : [];
            validationState = validator.validateWithRowData.apply(validator, [value, rowData].concat(params));
          }
        } else {
          var _params = validator.params ? Object.values(validator.params) : [];
          validationState = validator.validate.apply(validator, [value].concat(_params));
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
          var params = validator.params ? Object.values(validator.params) : [];
          validationState = validator.validateWithRowData.apply(validator, [value, rowData].concat(params));
        } else {
          var _params2 = validator.params ? Object.values(validator.params) : [];
          validationState = validator.validate.apply(validator, [value].concat(_params2));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5hY3Rpb25zLmpzIl0sIm5hbWVzIjpbIlRZUEVTIiwiUExBVEZPUk1fREFUQUdSSURfSU5WQUxJREFURSIsIlBMQVRGT1JNX0RBVEFHUklEX0JVU1kiLCJQTEFURk9STV9EQVRBR1JJRF9SRUFEWSIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9EQVRBIiwiUExBVEZPUk1fREFUQUdSSURfQVBQTFlfU09SVCIsIlBMQVRGT1JNX0RBVEFHUklEX1NPUlRfQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfUkVTSVpFX0NPTFVNTiIsIlBMQVRGT1JNX0RBVEFHUklEX0VESVQiLCJQTEFURk9STV9EQVRBR1JJRF9DQU5DRUwiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFIiwiUExBVEZPUk1fREFUQUdSSURfRVhURU5EX0RBVEEiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFX1NVQ0NFU1MiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFX1BBUlRJQUxfU1VDQ0VTUyIsIlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfRkFJTCIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURSIsIlBMQVRGT1JNX0RBVEFHUklEX0FERF9ORVdfSVRFTSIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9JVEVNIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNUyIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRSIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9TVUNDRVNTIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUwiLCJQTEFURk9STV9EQVRBR1JJRF9FRElUX0NFTExfVkFMVUVfQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0UiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRVMiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX0hJREVfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX0NIQU5HRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX1ZBTElEQVRFIiwiUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TRUxFQ1RJT05fQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9DTEVBUl9TRUxFQ1RFRF9JVEVNUyIsIlBMQVRGT1JNX0RBVEFHUklEX1RPR0dMRV9GSUxURVJJTkciLCJQTEFURk9STV9EQVRBR1JJRF9GSUxURVJfREFUQV9DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9GSUxURVJTIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX0ZJTFRFUlMiLCJQTEFURk9STV9EQVRBR1JJRF9VUERBVEVfRVhJU1RJTkdfQ0VMTF9WQUxVRSIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9FRElUX0RBVEEiLCJQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfT1BFTiIsIlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFIiwiUExBVEZPUk1fREFUQUdSSURfRk9SQ0VfUkVGUkVTSCIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9GT0NVU19UTyIsImludmFsaWRhdGUiLCJkaXNwYXRjaCIsIlV0aWxzIiwiY2hlY2tHcmlkUGFyYW0iLCJncmlkIiwidHlwZSIsImlkIiwiZm9yY2VSZWZyZXNoIiwic2V0VGltZW91dCIsImRvY3VtZW50IiwiY3JlYXRlRXZlbnQiLCJldnQiLCJpbml0RXZlbnQiLCJ3aW5kb3ciLCJkaXNwYXRjaEV2ZW50Iiwic2V0QnVzeSIsInNldFJlYWR5IiwiYXBwbHlGaWx0ZXJzIiwiY29sdW1ucyIsImdldFN0YXRlIiwiZm9yRWFjaCIsImdyaWREYXRhIiwiZGF0YWdyaWQiLCJnZXQiLCJmaWx0ZXJEYXRhIiwiZ2V0SW4iLCJhbGxEYXRhIiwiZGF0YSIsImlzRW1wdHkiLCJkYXRlRm9ybWF0IiwiZ2V0RGF0ZUZvcm1hdCIsInVzZXIiLCJmaWx0ZXIiLCJyb3ciLCJoaXRzIiwiZmlsdGVyVmFsdWUiLCJmaWx0ZXJDb2x1bW4iLCJjb2x1bW4iLCJnZXRDb2x1bW5LZXkiLCJ2YWx1ZSIsInZhbHVlS2V5UGF0aCIsImZpbHRlck1hdGNoZXIiLCJnZXRGaWx0ZXJNYXRjaGVyIiwic2l6ZSIsInNldEFuZEFwcGx5RmlsdGVycyIsImZpbHRlcmluZ0RhdGEiLCJub3JtYWxpemVGaWx0ZXJpbmdEYXRhIiwiZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlIiwib3JpZ0ZpbHRlckRhdGEiLCJjb2x1bW5LZXkiLCJ2YWx1ZUVtcHR5Q2hlY2tlciIsImdldFZhbHVlRW1wdHlDaGVja2VyIiwiZGVsZXRlIiwic2V0Iiwic2F2ZUZpbHRlckRhdGEiLCJhcHBseVNvcnQiLCJzb3J0RGF0YSIsInNvcnRDb2x1bW4iLCJzb3J0T3JkZXIiLCJjb2wiLCJvcmlnQWxsRGF0YSIsImNvbXBhcmF0b3IiLCJnZXRTb3J0Q29tcGFyYXRvciIsInZhbHVlR2V0dGVyIiwiZ2V0U29ydFZhbHVlR2V0dGVyIiwic29ydCIsImEiLCJiIiwidmFsQSIsInZhbEIiLCJzb3J0Q2hhbmdlIiwibmV3U29ydCIsInNhdmVTb3J0RGF0YSIsInNldERhdGEiLCJjaGVja0NvbHVtbnNQYXJhbSIsImNvbmZpZ0RhdGEiLCJsb2FkR3JpZENvbmZpZyIsImltbXV0YWJsZURhdGEiLCJJbW11dGFibGUiLCJJdGVyYWJsZSIsImlzSXRlcmFibGUiLCJmcm9tSlMiLCJzZWxlY3RlZEl0ZW1zIiwibG9hZFNlbGVjdGVkSXRlbXMiLCJmaW5kIiwiZGF0YUl0ZW0iLCJpZEtleVBhdGgiLCJpdGVtIiwiY29uZmlnIiwic2V0Rm9jdXNUbyIsImZvY3VzVG8iLCJmb2N1c1RvTGFzdFJvdyIsImV4dGVuZERhdGEiLCJwcmVwZW5kIiwicmVzaXplQ29sdW1uIiwid2lkdGgiLCJjb2x1bW5XaWR0aHMiLCJzYXZlQ29sdW1uV2lkdGhzIiwiZWRpdCIsImNhbmNlbCIsInNhdmUiLCJjYiIsInNhdmVTdWNjZXNzIiwic2F2ZWRJdGVtcyIsInNhdmVQYXJ0aWFsU3VjY2VzcyIsInNhdmVGYWlsIiwiY3JlYXRlIiwiY29sdW1uRGVmYXVsdFZhbHVlcyIsImFkZE5ld0l0ZW0iLCJyZW1vdmVJdGVtIiwicm93SWQiLCJyZW1vdmVOZXdJdGVtIiwiaW5kZXgiLCJyZW1vdmVOZXdJdGVtcyIsImluZGV4ZXMiLCJyZW1vdmUiLCJyZW1vdmVTdWNjZXNzIiwicmVtb3ZlZElkcyIsInJlbW92ZUZhaWwiLCJlZGl0Q2VsbFZhbHVlQ2hhbmdlIiwiZGF0YUlkIiwia2V5UGF0aCIsImVkaXRDZWxsVmFsdWVWYWxpZGF0ZSIsInZhbGlkYXRvcnMiLCJ2YWxpZGF0aW9uU3RhdGUiLCJ2YWxpZCIsInZhbGlkYXRvciIsInVuaXF1ZSIsInVuZGVmaW5lZCIsImVkaXREYXRhIiwiZWRpdERhdGFJdGVtIiwiZWRpdERhdGFJdGVtSWQiLCJmb3VuZEluZGV4IiwiZmluZEluZGV4IiwiZCIsIm1lcmdlRGVlcEluIiwiZmluZGluZyIsImxlbmd0aCIsIm1lc3NhZ2UiLCJ2YWxpZGF0ZVdpdGhSb3dEYXRhIiwicm93RGF0YSIsIm1lcmdlRGVlcCIsInBhcmFtcyIsIk9iamVjdCIsInZhbHVlcyIsInZhbGlkYXRlIiwibWVzc2FnZVZhbHVlcyIsIm1lc3NhZ2VUeXBlIiwibWVzc2FnZUlkIiwiY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlIiwicm93SW5kZXgiLCJjcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZSIsImZpbmQyIiwiaSIsImNlbGxTaG93TWVzc2FnZSIsImNlbGxTaG93TWVzc2FnZXMiLCJtZXNzYWdlcyIsImNlbGxIaWRlTWVzc2FnZSIsImNyZWF0ZUNlbGxTaG93TWVzc2FnZSIsImNyZWF0ZUNlbGxIaWRlTWVzc2FnZSIsImNlbGxTZWxlY3Rpb25DaGFuZ2UiLCJzZWxlY3RlZENlbGwiLCJpdGVtU2VsZWN0aW9uQ2hhbmdlIiwiY3RybFByZXNzZWQiLCJzaGlmdFByZXNzZWQiLCJzYXZlU2VsZWN0ZWRJdGVtcyIsInNlbGVjdEFsbEl0ZW1zQ2hhbmdlIiwiY2xlYXJTZWxlY3RlZEl0ZW1zIiwidG9nZ2xlRmlsdGVyaW5nIiwiaXNGaWx0ZXJpbmciLCJzYXZlSXNGaWx0ZXJpbmciLCJ2YWxpZGF0ZUVkaXRlZFJvd3MiLCJhbGxHb29kIiwiZWRpdERhdGFSb3ciLCJpc1ZhbGlkIiwicmVtb3ZlRW1wdHlDcmVhdGVkUm93cyIsImNyZWF0ZURhdGEiLCJjcmVhdGVEYXRhUm93IiwicHVzaCIsInZhbGlkYXRlQ3JlYXRlZFJvd3MiLCJ1cGRhdGVFeGlzdGluZ0NlbGxWYWx1ZSIsInNldEVkaXREYXRhIiwiY2VsbE1lc3NhZ2VzIiwib3BlbkNvbHVtblNldHRpbmdzTW9kYWwiLCJjbG9zZUNvbHVtblNldHRpbmdzTW9kYWwiLCJzYXZlQ29sdW1uU2V0dGluZ3MiLCJoaWRkZW5Db2x1bW5zIiwiY29sdW1uT3JkZXIiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0FBRU8sSUFBTUEsd0JBQVE7QUFDbkJDLGdDQUE4Qiw4QkFEWDtBQUVuQkMsMEJBQXdCLHdCQUZMO0FBR25CQywyQkFBeUIseUJBSE47QUFJbkJDLDhCQUE0Qiw0QkFKVDtBQUtuQkMsZ0NBQThCLDhCQUxYO0FBTW5CQyxpQ0FBK0IsK0JBTlo7QUFPbkJDLG1DQUFpQyxpQ0FQZDtBQVFuQkMsMEJBQXdCLHdCQVJMO0FBU25CQyw0QkFBMEIsMEJBVFA7QUFVbkJDLDBCQUF3Qix3QkFWTDtBQVduQkMsaUNBQStCLCtCQVhaO0FBWW5CQyxrQ0FB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QUFDQUYsdUJBQU11TCxrQkFBTixDQUF5QnJMLElBQXpCLEVBQStCc0wsYUFBL0IsRUFBOENDLFdBQTlDO0FBQ0ExTCxhQUFTO0FBQ1BJLFlBQU1uRCxNQUFNMkMsc0NBREw7QUFFUFMsVUFBSUYsS0FBS0UsRUFGRjtBQUdQcUw7QUFITyxLQUFUO0FBS0QsR0FUK0I7QUFBQSxDQUEzQiIsImZpbGUiOiJkYXRhZ3JpZC5hY3Rpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEltbXV0YWJsZSwgeyBNYXAgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4vZGF0YWdyaWQudXRpbHMnO1xuXG5leHBvcnQgY29uc3QgVFlQRVMgPSB7XG4gIFBMQVRGT1JNX0RBVEFHUklEX0lOVkFMSURBVEU6ICdQTEFURk9STV9EQVRBR1JJRF9JTlZBTElEQVRFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQlVTWTogJ1BMQVRGT1JNX0RBVEFHUklEX0JVU1knLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRUFEWTogJ1BMQVRGT1JNX0RBVEFHUklEX1JFQURZJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0VUX0RBVEE6ICdQTEFURk9STV9EQVRBR1JJRF9TRVRfREFUQScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0FQUExZX1NPUlQ6ICdQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9TT1JUJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU09SVF9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9TT1JUX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFU0laRV9DT0xVTU46ICdQTEFURk9STV9EQVRBR1JJRF9SRVNJWkVfQ09MVU1OJyxcbiAgUExBVEZPUk1fREFUQUdSSURfRURJVDogJ1BMQVRGT1JNX0RBVEFHUklEX0VESVQnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DQU5DRUw6ICdQTEFURk9STV9EQVRBR1JJRF9DQU5DRUwnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TQVZFOiAnUExBVEZPUk1fREFUQUdSSURfU0FWRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0VYVEVORF9EQVRBOiAnUExBVEZPUk1fREFUQUdSSURfRVhURU5EX0RBVEEnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TQVZFX1NVQ0NFU1M6ICdQTEFURk9STV9EQVRBR1JJRF9TQVZFX1NVQ0NFU1MnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TQVZFX1BBUlRJQUxfU1VDQ0VTUzogJ1BMQVRGT1JNX0RBVEFHUklEX1NBVkVfUEFSVElBTF9TVUNDRVNTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0FWRV9GQUlMOiAnUExBVEZPUk1fREFUQUdSSURfU0FWRV9GQUlMJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFOiAnUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQUREX05FV19JVEVNOiAnUExBVEZPUk1fREFUQUdSSURfQUREX05FV19JVEVNJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0lURU06ICdQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfSVRFTScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTTogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTVM6ICdQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU1TJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFOiAnUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX1NVQ0NFU1M6ICdQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfU1VDQ0VTUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9GQUlMOiAnUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUwnLFxuICBQTEFURk9STV9EQVRBR1JJRF9FRElUX0NFTExfVkFMVUVfQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfRURJVF9DRUxMX1ZBTFVFX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFOiAnUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRVM6ICdQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRVMnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NFTExfSElERV9NRVNTQUdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfU0hPV19NRVNTQUdFOiAnUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfU0hPV19NRVNTQUdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfSElERV9NRVNTQUdFOiAnUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfSElERV9NRVNTQUdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfVkFMSURBVEU6ICdQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9WQUxJREFURScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0VMRUNUSU9OX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NFTExfU0VMRUNUSU9OX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0lURU1fU0VMRUNUSU9OX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX0lURU1fU0VMRUNUSU9OX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NFTEVDVF9BTExfSVRFTVNfQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DTEVBUl9TRUxFQ1RFRF9JVEVNUzogJ1BMQVRGT1JNX0RBVEFHUklEX0NMRUFSX1NFTEVDVEVEX0lURU1TJyxcbiAgUExBVEZPUk1fREFUQUdSSURfVE9HR0xFX0ZJTFRFUklORzogJ1BMQVRGT1JNX0RBVEFHUklEX1RPR0dMRV9GSUxURVJJTkcnLFxuICBQTEFURk9STV9EQVRBR1JJRF9GSUxURVJfREFUQV9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9GSUxURVJfREFUQV9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9GSUxURVJTOiAnUExBVEZPUk1fREFUQUdSSURfQVBQTFlfRklMVEVSUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NFVF9GSUxURVJTOiAnUExBVEZPUk1fREFUQUdSSURfU0VUX0ZJTFRFUlMnLFxuICBQTEFURk9STV9EQVRBR1JJRF9VUERBVEVfRVhJU1RJTkdfQ0VMTF9WQUxVRTogJ1BMQVRGT1JNX0RBVEFHUklEX1VQREFURV9FWElTVElOR19DRUxMX1ZBTFVFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0VUX0VESVRfREFUQTogJ1BMQVRGT1JNX0RBVEFHUklEX1NFVF9FRElUX0RBVEEnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfT1BFTjogJ1BMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9PUEVOJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX0NMT1NFOiAnUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX0NMT1NFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX1NBVkU6ICdQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfU0FWRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0ZPUkNFX1JFRlJFU0g6ICdQTEFURk9STV9EQVRBR1JJRF9GT1JDRV9SRUZSRVNIJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0VUX0ZPQ1VTX1RPOiAnUExBVEZPUk1fREFUQUdSSURfU0VUX0ZPQ1VTX1RPJyxcbn07XG5cbmV4cG9ydCBjb25zdCBpbnZhbGlkYXRlID0gZ3JpZCA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9JTlZBTElEQVRFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBmb3JjZVJlZnJlc2ggPSAoKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgLy8gRmlyZSByZXNpemUgZXZlbnQgdG8gcmVjYWxjdWxhdGUgY29tcG9uZW50IHNpemVzXG4gIC8vIGFuZCB0byBmb3JjZSByZWRyYXcgYWxsIG1vdW50ZWQgZ3JpZHNcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgaWYgKGRvY3VtZW50LmNyZWF0ZUV2ZW50KSB7XG4gICAgICBjb25zdCBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnSFRNTEV2ZW50cycpO1xuICAgICAgZXZ0LmluaXRFdmVudCgncmVzaXplJywgdHJ1ZSwgZmFsc2UpO1xuICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgICB9XG4gIH0sIDEpO1xuICBkaXNwYXRjaCh7IHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0ZPUkNFX1JFRlJFU0ggfSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0QnVzeSA9IGdyaWQgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQlVTWSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3Qgc2V0UmVhZHkgPSBncmlkID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFQURZLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBhcHBseUZpbHRlcnMgPSAoZ3JpZCwgY29sdW1ucykgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGlmICghY29sdW1ucyB8fCAhY29sdW1ucy5mb3JFYWNoKSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3QgZ3JpZERhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldChncmlkLmlkKTtcbiAgICBpZiAoIWdyaWREYXRhKSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3QgZmlsdGVyRGF0YSA9IGdyaWREYXRhLmdldEluKFsnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnZmlsdGVyRGF0YSddLCBNYXAoKSk7XG4gICAgY29uc3QgYWxsRGF0YSA9IGdyaWREYXRhLmdldCgnYWxsRGF0YScpO1xuICAgIHNldEJ1c3koZ3JpZCkoZGlzcGF0Y2gpO1xuICAgIGxldCBkYXRhO1xuICAgIGlmIChmaWx0ZXJEYXRhLmlzRW1wdHkoKSkge1xuICAgICAgZGF0YSA9IGFsbERhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRhdGVGb3JtYXQgPSBVdGlscy5nZXREYXRlRm9ybWF0KGdyaWQsIGdldFN0YXRlKCkudXNlcik7XG4gICAgICBkYXRhID0gYWxsRGF0YS5maWx0ZXIoKHJvdykgPT4ge1xuICAgICAgICBsZXQgaGl0cyA9IDA7XG4gICAgICAgIGZpbHRlckRhdGEuZm9yRWFjaCgoZmlsdGVyVmFsdWUsIGZpbHRlckNvbHVtbikgPT4ge1xuICAgICAgICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sdW1uKSA9PiB7XG4gICAgICAgICAgICBpZiAoVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbHVtbikgPT09IGZpbHRlckNvbHVtbikge1xuICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHJvdy5nZXRJbihjb2x1bW4udmFsdWVLZXlQYXRoKTtcbiAgICAgICAgICAgICAgaWYgKHZhbHVlIHx8IHZhbHVlID09PSAwIHx8IHZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlck1hdGNoZXIgPSBVdGlscy5nZXRGaWx0ZXJNYXRjaGVyKGNvbHVtbiwgZGF0ZUZvcm1hdCk7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlck1hdGNoZXIocm93LCBmaWx0ZXJWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgIGhpdHMgKz0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBoaXRzID09PSBmaWx0ZXJEYXRhLnNpemU7XG4gICAgICB9KTtcbiAgICB9XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQVBQTFlfRklMVEVSUyxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgZGF0YSxcbiAgICB9KTtcbiAgICBzZXRSZWFkeShncmlkKShkaXNwYXRjaCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBzZXRBbmRBcHBseUZpbHRlcnMgPSAoZ3JpZCwgY29sdW1ucywgZmlsdGVyaW5nRGF0YSkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX0ZJTFRFUlMsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGZpbHRlcmluZ0RhdGE6IFV0aWxzLm5vcm1hbGl6ZUZpbHRlcmluZ0RhdGEoZmlsdGVyaW5nRGF0YSksXG4gICAgfSk7XG4gICAgZGlzcGF0Y2goYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGZpbHRlckNlbGxWYWx1ZUNoYW5nZSA9IChncmlkLCBjb2x1bW5zLCBjb2x1bW4sIHZhbHVlKSA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgY29uc3Qgb3JpZ0ZpbHRlckRhdGEgPSBnZXRTdGF0ZSgpXG4gICAgICAuZGF0YWdyaWRcbiAgICAgIC5nZXRJbihbZ3JpZC5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2ZpbHRlckRhdGEnXSwgTWFwKCkpO1xuICAgIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2x1bW4pO1xuICAgIGNvbnN0IHZhbHVlRW1wdHlDaGVja2VyID0gVXRpbHMuZ2V0VmFsdWVFbXB0eUNoZWNrZXIoY29sdW1uKTtcbiAgICBsZXQgZmlsdGVyRGF0YTtcbiAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsdWUpKSB7XG4gICAgICBmaWx0ZXJEYXRhID0gb3JpZ0ZpbHRlckRhdGEuZGVsZXRlKGNvbHVtbktleSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpbHRlckRhdGEgPSBvcmlnRmlsdGVyRGF0YS5zZXQoY29sdW1uS2V5LCB2YWx1ZSk7XG4gICAgfVxuICAgIFV0aWxzLnNhdmVGaWx0ZXJEYXRhKGdyaWQsIGZpbHRlckRhdGEpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0ZJTFRFUl9EQVRBX0NIQU5HRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgZmlsdGVyRGF0YSxcbiAgICB9KTtcbiAgICBhcHBseUZpbHRlcnMoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGFwcGx5U29ydCA9IChncmlkLCBjb2x1bW5zKSA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgaWYgKCFjb2x1bW5zIHx8ICFjb2x1bW5zLmZvckVhY2gpIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBncmlkRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0KGdyaWQuaWQpO1xuICAgIGlmICghZ3JpZERhdGEpIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBzb3J0RGF0YSA9IGdyaWREYXRhLmdldEluKFsnY29uZmlnJywgJ3NvcnRpbmdEYXRhJ10pO1xuICAgIGlmICghc29ydERhdGEpIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBzb3J0Q29sdW1uID0gc29ydERhdGEuZ2V0KCdzb3J0Q29sdW1uJyk7XG4gICAgaWYgKCFzb3J0Q29sdW1uKSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3Qgc29ydE9yZGVyID0gc29ydERhdGEuZ2V0KCdzb3J0T3JkZXInLCAnYXNjJyk7XG4gICAgbGV0IGNvbHVtbjtcbiAgICBjb2x1bW5zLmZvckVhY2goKGNvbCkgPT4ge1xuICAgICAgaWYgKFV0aWxzLmdldENvbHVtbktleShjb2wpID09PSBzb3J0Q29sdW1uKSB7XG4gICAgICAgIGNvbHVtbiA9IGNvbDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoIWNvbHVtbikgcmV0dXJuIGZhbHNlO1xuXG4gICAgc2V0QnVzeShncmlkKShkaXNwYXRjaCk7XG4gICAgY29uc3Qgb3JpZ0FsbERhdGEgPSBncmlkRGF0YS5nZXQoJ2FsbERhdGEnKTtcbiAgICBjb25zdCBjb21wYXJhdG9yID0gVXRpbHMuZ2V0U29ydENvbXBhcmF0b3IoY29sdW1uKTtcbiAgICBjb25zdCB2YWx1ZUdldHRlciA9IFV0aWxzLmdldFNvcnRWYWx1ZUdldHRlcihjb2x1bW4pO1xuICAgIGNvbnN0IHZhbHVlRW1wdHlDaGVja2VyID0gVXRpbHMuZ2V0VmFsdWVFbXB0eUNoZWNrZXIoY29sdW1uKTtcbiAgICBjb25zdCBhbGxEYXRhID0gb3JpZ0FsbERhdGEuc29ydCgoYSwgYikgPT4ge1xuICAgICAgY29uc3QgdmFsQSA9IHZhbHVlR2V0dGVyKGEpO1xuICAgICAgY29uc3QgdmFsQiA9IHZhbHVlR2V0dGVyKGIpO1xuICAgICAgaWYgKHNvcnRPcmRlciA9PT0gJ2FzYycpIHtcbiAgICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEEpKSByZXR1cm4gLTE7XG4gICAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxCKSkgcmV0dXJuIDE7XG4gICAgICAgIHJldHVybiBjb21wYXJhdG9yKHZhbEEsIHZhbEIpO1xuICAgICAgfVxuICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEEpKSByZXR1cm4gMTtcbiAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxCKSkgcmV0dXJuIC0xO1xuICAgICAgcmV0dXJuIGNvbXBhcmF0b3IodmFsQiwgdmFsQSk7XG4gICAgfSk7XG4gICAgbGV0IGRhdGE7XG4gICAgLy8gU29ydCBhbHNvIGZpbHRlcmVkIGRhdGEgc2VwYXJhdGVseVxuICAgIGlmIChncmlkRGF0YS5nZXRJbihbJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2lzRmlsdGVyaW5nJ10sIGZhbHNlKSkge1xuICAgICAgZGF0YSA9IGdyaWREYXRhLmdldCgnZGF0YScpLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgY29uc3QgdmFsQSA9IHZhbHVlR2V0dGVyKGEpO1xuICAgICAgICBjb25zdCB2YWxCID0gdmFsdWVHZXR0ZXIoYik7XG4gICAgICAgIGlmIChzb3J0T3JkZXIgPT09ICdhc2MnKSB7XG4gICAgICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEEpKSByZXR1cm4gLTE7XG4gICAgICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEIpKSByZXR1cm4gMTtcbiAgICAgICAgICByZXR1cm4gY29tcGFyYXRvcih2YWxBLCB2YWxCKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQSkpIHJldHVybiAxO1xuICAgICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQikpIHJldHVybiAtMTtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmF0b3IodmFsQiwgdmFsQSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YSA9IGFsbERhdGE7XG4gICAgfVxuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0FQUExZX1NPUlQsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGRhdGEsXG4gICAgICBhbGxEYXRhLFxuICAgIH0pO1xuICAgIHNldFJlYWR5KGdyaWQpKGRpc3BhdGNoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHNvcnRDaGFuZ2UgPSAoZ3JpZCwgY29sdW1ucywgY29sdW1uLCBuZXdTb3J0KSA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgY29uc3Qgc29ydE9yZGVyID0gbmV3U29ydCB8fCAnYXNjJztcbiAgICBjb25zdCBzb3J0Q29sdW1uID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbHVtbik7XG4gICAgVXRpbHMuc2F2ZVNvcnREYXRhKGdyaWQsIHsgc29ydENvbHVtbiwgc29ydE9yZGVyIH0pO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NPUlRfQ0hBTkdFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBzb3J0Q29sdW1uLFxuICAgICAgc29ydE9yZGVyLFxuICAgIH0pO1xuICAgIGFwcGx5U29ydChncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICB9O1xuXG5leHBvcnQgY29uc3Qgc2V0RGF0YSA9IChncmlkLCBjb2x1bW5zLCBkYXRhKSA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgVXRpbHMuY2hlY2tDb2x1bW5zUGFyYW0oY29sdW1ucyk7XG4gICAgY29uc3QgY29uZmlnRGF0YSA9IFV0aWxzLmxvYWRHcmlkQ29uZmlnKGdyaWQsIGNvbHVtbnMpO1xuICAgIGNvbnN0IGltbXV0YWJsZURhdGEgPSBJbW11dGFibGUuSXRlcmFibGUuaXNJdGVyYWJsZShkYXRhKSA/IGRhdGEgOiBJbW11dGFibGUuZnJvbUpTKGRhdGEpO1xuICAgIGNvbnN0IHNlbGVjdGVkSXRlbXMgPSBVdGlscy5sb2FkU2VsZWN0ZWRJdGVtcyhncmlkKS5maWx0ZXIoaXRlbSA9PiAoXG4gICAgICAhIWltbXV0YWJsZURhdGEuZmluZChkYXRhSXRlbSA9PiBkYXRhSXRlbS5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGl0ZW0pXG4gICAgKSk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX0RBVEEsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGRhdGE6IGltbXV0YWJsZURhdGEsXG4gICAgICBjb25maWc6IGNvbmZpZ0RhdGEsXG4gICAgICBzZWxlY3RlZEl0ZW1zLFxuICAgIH0pO1xuICAgIGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICAgIGFwcGx5U29ydChncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICB9O1xuLyoqXG4gKiBBY3Rpb24gdG8gc2V0IGZvY3VzIHRvIGVpdGhlciBsYXN0IGVkaXRlZFJvdywgY3JlYXRlZFJvdyBvciB0byB2YWxpZGF0aW9uIGVycm9yXG4gKiBAcGFyYW0ge09iamVjdH0gZ3JpZFxuICogQHBhcmFtIHtTdHJpbmd9IGZvY3VzVG9UeXBlIC0gdHlwZSBvZiBmb2N1cyByZXF1ZXN0LiBQb3NzaWJsZSB2YWx1ZXM6XG4gKiAnZm9jdXNUb0VkaXRDZWxsJyB8fCAnZm9jdXNUb0Vycm9yQ2VsbCcgfHwgJ2ZvY3VzVG9DcmVhdGVDZWxsJ1xuICogQHBhcmFtIHtib29sZWFufSBmb2N1c1RvTGFzdFJvdyAtIHNldHMgZm9jdXMgdG8gbGFzdCBkYXRhIHJvdyBpbnN0ZWFkIG9mIHNlbGVjdGVkIHJvd1xuICovXG5leHBvcnQgY29uc3Qgc2V0Rm9jdXNUbyA9IChncmlkLCBmb2N1c1RvLCBmb2N1c1RvTGFzdFJvdyA9IGZhbHNlKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfRk9DVVNfVE8sXG4gICAgZm9jdXNUbyxcbiAgICBmb2N1c1RvTGFzdFJvdyxcbiAgICBpZDogZ3JpZC5pZCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZXh0ZW5kRGF0YSA9IChncmlkLCBjb2x1bW5zLCBkYXRhLCBwcmVwZW5kID0gZmFsc2UpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBjb25zdCBpbW11dGFibGVEYXRhID0gSW1tdXRhYmxlLkl0ZXJhYmxlLmlzSXRlcmFibGUoZGF0YSkgPyBkYXRhIDogSW1tdXRhYmxlLmZyb21KUyhkYXRhKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9FWFRFTkRfREFUQSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgZGF0YTogaW1tdXRhYmxlRGF0YSxcbiAgICAgIHByZXBlbmQsXG4gICAgfSk7XG4gICAgYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gICAgYXBwbHlTb3J0KGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCByZXNpemVDb2x1bW4gPSAoZ3JpZCwgY29sdW1uS2V5LCB3aWR0aCkgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGNvbnN0IGNvbHVtbldpZHRocyA9IGdldFN0YXRlKClcbiAgICAgIC5kYXRhZ3JpZFxuICAgICAgLmdldEluKFtncmlkLmlkLCAnY29uZmlnJywgJ2NvbHVtbldpZHRocyddLCBNYXAoKSlcbiAgICAgIC5zZXQoY29sdW1uS2V5LCB3aWR0aCk7XG4gICAgVXRpbHMuc2F2ZUNvbHVtbldpZHRocyhncmlkLCBjb2x1bW5XaWR0aHMpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFU0laRV9DT0xVTU4sXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGNvbHVtbldpZHRocyxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGVkaXQgPSBncmlkID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0VESVQsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGNhbmNlbCA9IGdyaWQgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0FOQ0VMLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBzYXZlID0gKGdyaWQsIGNiID0gKCkgPT4ge30pID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NBVkUsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICB9KTtcbiAgICBjYigpO1xuICB9O1xuXG5leHBvcnQgY29uc3Qgc2F2ZVN1Y2Nlc3MgPSAoZ3JpZCwgY29sdW1ucywgc2F2ZWRJdGVtcykgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfU1VDQ0VTUyxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgICAgIHNhdmVkSXRlbXMsXG4gICAgfSk7XG4gICAgYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gICAgYXBwbHlTb3J0KGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBzYXZlUGFydGlhbFN1Y2Nlc3MgPSAoZ3JpZCwgY29sdW1ucywgc2F2ZWRJdGVtcykgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfUEFSVElBTF9TVUNDRVNTLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBpZEtleVBhdGg6IGdyaWQuaWRLZXlQYXRoLFxuICAgICAgc2F2ZWRJdGVtcyxcbiAgICB9KTtcbiAgICBhcHBseUZpbHRlcnMoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgICBhcHBseVNvcnQoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHNhdmVGYWlsID0gZ3JpZCA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TQVZFX0ZBSUwsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZSA9IChncmlkLCBjb2x1bW5EZWZhdWx0VmFsdWVzKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEUsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGNvbHVtbkRlZmF1bHRWYWx1ZXMsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBhZGROZXdJdGVtID0gKGdyaWQsIGNvbHVtbkRlZmF1bHRWYWx1ZXMpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0FERF9ORVdfSVRFTSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgY29sdW1uRGVmYXVsdFZhbHVlcyxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZUl0ZW0gPSAoZ3JpZCwgcm93SWQpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9JVEVNLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBpZEtleVBhdGg6IGdyaWQuaWRLZXlQYXRoLFxuICAgICAgcm93SWQsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVOZXdJdGVtID0gKGdyaWQsIGluZGV4KSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU0sXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGluZGV4LFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlTmV3SXRlbXMgPSAoZ3JpZCwgaW5kZXhlcykgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNUyxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgaW5kZXhlcyxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZSA9IChncmlkLCBjYiA9ICgpID0+IHt9KSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkUsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICB9KTtcbiAgICBjYigpO1xuICB9O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlU3VjY2VzcyA9IChncmlkLCByZW1vdmVkSWRzKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfU1VDQ0VTUyxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgICAgIHJlbW92ZWRJZHMsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVGYWlsID0gZ3JpZCA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfRkFJTCxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgZWRpdENlbGxWYWx1ZUNoYW5nZSA9IChncmlkLCBkYXRhSWQsIGtleVBhdGgsIHZhbHVlKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9FRElUX0NFTExfVkFMVUVfQ0hBTkdFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBkYXRhSWQsXG4gICAgICBrZXlQYXRoLFxuICAgICAgdmFsdWUsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBlZGl0Q2VsbFZhbHVlVmFsaWRhdGUgPSAoXG4gIGdyaWQsXG4gIGRhdGFJZCxcbiAga2V5UGF0aCxcbiAgdmFsdWUsXG4gIHZhbGlkYXRvcnMgPSBbXSxcbikgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGxldCB2YWxpZGF0aW9uU3RhdGUgPSB7IHZhbGlkOiB0cnVlIH07XG4gICAgdmFsaWRhdG9ycy5mb3JFYWNoKCh2YWxpZGF0b3IpID0+IHtcbiAgICAgIGlmICh2YWxpZGF0aW9uU3RhdGUudmFsaWQpIHtcbiAgICAgICAgaWYgKHZhbGlkYXRvci51bmlxdWUpIHtcbiAgICAgICAgICBpZiAodmFsdWUgIT09ICcnIHx8IHZhbHVlICE9PSBudWxsIHx8IHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIGNvbWJpbmUgcmVhbCBkYXRhIHdpdGggY3VycmVudCB1bnNhdmVkIGVkaXRlZCBkYXRhXG4gICAgICAgICAgICBjb25zdCBncmlkRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0KGdyaWQuaWQpO1xuICAgICAgICAgICAgY29uc3QgZWRpdERhdGEgPSBncmlkRGF0YS5nZXQoJ2VkaXREYXRhJyk7XG4gICAgICAgICAgICBsZXQgYWxsRGF0YSA9IGdyaWREYXRhLmdldCgnYWxsRGF0YScpO1xuICAgICAgICAgICAgaWYgKGVkaXREYXRhKSB7XG4gICAgICAgICAgICAgIGVkaXREYXRhLmZvckVhY2goKGVkaXREYXRhSXRlbSwgZWRpdERhdGFJdGVtSWQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3VuZEluZGV4ID1cbiAgICAgICAgICAgICAgICAgIGFsbERhdGEuZmluZEluZGV4KGQgPT4gZC5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGVkaXREYXRhSXRlbUlkKTtcbiAgICAgICAgICAgICAgICBpZiAoZm91bmRJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgIGFsbERhdGEgPSBhbGxEYXRhLm1lcmdlRGVlcEluKFtmb3VuZEluZGV4XSwgZWRpdERhdGFJdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gZGV0ZXJtaW5lIHVuaXF1ZW5lc3NcbiAgICAgICAgICAgIGNvbnN0IGZpbmRpbmcgPSBhbGxEYXRhLmZpbmQoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgaWYgKGdyaWQuaWRLZXlQYXRoLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIC8vIGRvbid0IHNlbGYgY29tcGFyZVxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmdldEluKGdyaWQuaWRLZXlQYXRoKSA9PT0gZGF0YUlkKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBpdGVtLmdldEluKGtleVBhdGgpID09PSB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGZpbmRpbmcpIHtcbiAgICAgICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0ge1xuICAgICAgICAgICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnVmFsaWRhdGlvbi5VbmlxdWUnLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh2YWxpZGF0b3IudmFsaWRhdGVXaXRoUm93RGF0YSkge1xuICAgICAgICAgIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG4gICAgICAgICAgY29uc3QgZWRpdERhdGEgPSBncmlkRGF0YS5nZXRJbihbJ2VkaXREYXRhJywgZGF0YUlkXSwgTWFwKCkpO1xuICAgICAgICAgIGxldCByb3dEYXRhID0gZ3JpZERhdGEuZ2V0KCdhbGxEYXRhJykuZmluZChpdGVtID0+IGl0ZW0uZ2V0SW4oZ3JpZC5pZEtleVBhdGgpID09PSBkYXRhSWQpO1xuICAgICAgICAgIGlmIChyb3dEYXRhKSB7XG4gICAgICAgICAgICByb3dEYXRhID0gcm93RGF0YS5tZXJnZURlZXAoZWRpdERhdGEpO1xuICAgICAgICAgICAgY29uc3QgcGFyYW1zID0gdmFsaWRhdG9yLnBhcmFtcyA/IE9iamVjdC52YWx1ZXModmFsaWRhdG9yLnBhcmFtcykgOiBbXTtcbiAgICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZVdpdGhSb3dEYXRhKHZhbHVlLCByb3dEYXRhLCAuLi5wYXJhbXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBwYXJhbXMgPSB2YWxpZGF0b3IucGFyYW1zID8gT2JqZWN0LnZhbHVlcyh2YWxpZGF0b3IucGFyYW1zKSA6IFtdO1xuICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZSh2YWx1ZSwgLi4ucGFyYW1zKTtcbiAgICAgICAgICBpZiAodmFsaWRhdG9yLnBhcmFtcykge1xuICAgICAgICAgICAgdmFsaWRhdGlvblN0YXRlLm1lc3NhZ2VWYWx1ZXMgPSB2YWxpZGF0b3IucGFyYW1zO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICh2YWxpZGF0aW9uU3RhdGUudmFsaWQpIHtcbiAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0VMTF9ISURFX01FU1NBR0UsXG4gICAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgICBtZXNzYWdlVHlwZTogJ2Vycm9yJyxcbiAgICAgICAgZGF0YUlkLFxuICAgICAgICBrZXlQYXRoLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0UsXG4gICAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgICBtZXNzYWdlVHlwZTogJ2Vycm9yJyxcbiAgICAgICAgZGF0YUlkLFxuICAgICAgICBrZXlQYXRoLFxuICAgICAgICBtZXNzYWdlSWQ6IHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlLFxuICAgICAgICBtZXNzYWdlVmFsdWVzOiB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZVZhbHVlcyxcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdmFsaWRhdGlvblN0YXRlLnZhbGlkO1xuICB9O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlID0gKGdyaWQsIHJvd0luZGV4LCBrZXlQYXRoLCB2YWx1ZSkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfQ0hBTkdFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICByb3dJbmRleCxcbiAgICAgIGtleVBhdGgsXG4gICAgICB2YWx1ZSxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNlbGxWYWx1ZVZhbGlkYXRlID0gKGdyaWQsIHJvd0luZGV4LCBrZXlQYXRoLCB2YWx1ZSwgdmFsaWRhdG9ycyA9IFtdKSA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgbGV0IHZhbGlkYXRpb25TdGF0ZSA9IHsgdmFsaWQ6IHRydWUgfTtcbiAgICB2YWxpZGF0b3JzLmZvckVhY2goKHZhbGlkYXRvcikgPT4ge1xuICAgICAgaWYgKHZhbGlkYXRpb25TdGF0ZS52YWxpZCkge1xuICAgICAgICBpZiAodmFsaWRhdG9yLnVuaXF1ZSkge1xuICAgICAgICAgIGlmICh2YWx1ZSAhPT0gJycgfHwgdmFsdWUgIT09IG51bGwgfHwgdmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3QgZmluZGluZyA9IGdldFN0YXRlKClcbiAgICAgICAgICAgICAgLmRhdGFncmlkXG4gICAgICAgICAgICAgIC5nZXRJbihbZ3JpZC5pZCwgJ2FsbERhdGEnXSlcbiAgICAgICAgICAgICAgLmZpbmQoaXRlbSA9PiBpdGVtLmdldEluKGtleVBhdGgpID09PSB2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoZmluZGluZykge1xuICAgICAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgdmFsaWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdWYWxpZGF0aW9uLlVuaXF1ZScsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zdCBmaW5kMiA9IGdldFN0YXRlKClcbiAgICAgICAgICAgICAgICAuZGF0YWdyaWRcbiAgICAgICAgICAgICAgICAuZ2V0SW4oW2dyaWQuaWQsICdjcmVhdGVEYXRhJ10pXG4gICAgICAgICAgICAgICAgLmZpbmQoKGl0ZW0sIGkpID0+IGkgIT09IHJvd0luZGV4ICYmIGl0ZW0uZ2V0SW4oa2V5UGF0aCkgPT09IHZhbHVlKTtcbiAgICAgICAgICAgICAgaWYgKGZpbmQyKSB7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0ge1xuICAgICAgICAgICAgICAgICAgdmFsaWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ1ZhbGlkYXRpb24uVW5pcXVlJyxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHZhbGlkYXRvci52YWxpZGF0ZVdpdGhSb3dEYXRhKSB7XG4gICAgICAgICAgY29uc3Qgcm93RGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdjcmVhdGVEYXRhJywgcm93SW5kZXhdKTtcbiAgICAgICAgICBjb25zdCBwYXJhbXMgPSB2YWxpZGF0b3IucGFyYW1zID8gT2JqZWN0LnZhbHVlcyh2YWxpZGF0b3IucGFyYW1zKSA6IFtdO1xuICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZVdpdGhSb3dEYXRhKHZhbHVlLCByb3dEYXRhLCAuLi5wYXJhbXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IHZhbGlkYXRvci5wYXJhbXMgPyBPYmplY3QudmFsdWVzKHZhbGlkYXRvci5wYXJhbXMpIDogW107XG4gICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0gdmFsaWRhdG9yLnZhbGlkYXRlKHZhbHVlLCAuLi5wYXJhbXMpO1xuICAgICAgICAgIGlmICh2YWxpZGF0b3IucGFyYW1zKSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZVZhbHVlcyA9IHZhbGlkYXRvci5wYXJhbXM7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKHZhbGlkYXRpb25TdGF0ZS52YWxpZCkge1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9ISURFX01FU1NBR0UsXG4gICAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgICBtZXNzYWdlVHlwZTogJ2Vycm9yJyxcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIGtleVBhdGgsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9TSE9XX01FU1NBR0UsXG4gICAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgICBtZXNzYWdlVHlwZTogJ2Vycm9yJyxcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIGtleVBhdGgsXG4gICAgICAgIG1lc3NhZ2VJZDogdmFsaWRhdGlvblN0YXRlLm1lc3NhZ2UsXG4gICAgICAgIG1lc3NhZ2VWYWx1ZXM6IHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlVmFsdWVzLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB2YWxpZGF0aW9uU3RhdGUudmFsaWQ7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBjZWxsU2hvd01lc3NhZ2UgPSAoZ3JpZCwgbWVzc2FnZVR5cGUsIGRhdGFJZCwga2V5UGF0aCwgbWVzc2FnZUlkLCBtZXNzYWdlVmFsdWVzKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgbWVzc2FnZVR5cGUsXG4gICAgICBkYXRhSWQsXG4gICAgICBrZXlQYXRoLFxuICAgICAgbWVzc2FnZUlkLFxuICAgICAgbWVzc2FnZVZhbHVlcyxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGNlbGxTaG93TWVzc2FnZXMgPSAoZ3JpZCwgbWVzc2FnZXMpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFUyxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgbWVzc2FnZXMsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBjZWxsSGlkZU1lc3NhZ2UgPSAoZ3JpZCwgbWVzc2FnZVR5cGUgPSBudWxsLCBkYXRhSWQgPSBudWxsLCBrZXlQYXRoID0gbnVsbCkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0VMTF9ISURFX01FU1NBR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIG1lc3NhZ2VUeXBlLFxuICAgICAgZGF0YUlkLFxuICAgICAga2V5UGF0aCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNlbGxTaG93TWVzc2FnZSA9IChcbiAgZ3JpZCxcbiAgbWVzc2FnZVR5cGUsXG4gIHJvd0luZGV4LFxuICBrZXlQYXRoLFxuICBtZXNzYWdlSWQsXG4gIG1lc3NhZ2VWYWx1ZXMsXG4pID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgbWVzc2FnZVR5cGUsXG4gICAgICByb3dJbmRleCxcbiAgICAgIGtleVBhdGgsXG4gICAgICBtZXNzYWdlSWQsXG4gICAgICBtZXNzYWdlVmFsdWVzLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQ2VsbEhpZGVNZXNzYWdlID0gKGdyaWQsIG1lc3NhZ2VUeXBlID0gbnVsbCwgcm93SW5kZXggPSBudWxsLCBrZXlQYXRoID0gbnVsbCkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfSElERV9NRVNTQUdFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBtZXNzYWdlVHlwZSxcbiAgICAgIHJvd0luZGV4LFxuICAgICAga2V5UGF0aCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGNlbGxTZWxlY3Rpb25DaGFuZ2UgPSAoZ3JpZCwgc2VsZWN0ZWRDZWxsID0gbnVsbCkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgc2VsZWN0ZWRDZWxsLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX1NFTEVDVElPTl9DSEFOR0UsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBpdGVtU2VsZWN0aW9uQ2hhbmdlID0gKFxuICBncmlkLFxuICByb3dJbmRleCxcbiAgY3RybFByZXNzZWQgPSBmYWxzZSxcbiAgc2hpZnRQcmVzc2VkID0gZmFsc2UsXG4pID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9JVEVNX1NFTEVDVElPTl9DSEFOR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIHJvd0luZGV4LFxuICAgICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgICAgIGN0cmxQcmVzc2VkLFxuICAgICAgc2hpZnRQcmVzc2VkLFxuICAgIH0pO1xuICAgIFV0aWxzLnNhdmVTZWxlY3RlZEl0ZW1zKGdyaWQsIGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdzZWxlY3RlZEl0ZW1zJ10pKTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdEFsbEl0ZW1zQ2hhbmdlID0gZ3JpZCA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgfSk7XG4gICAgVXRpbHMuc2F2ZVNlbGVjdGVkSXRlbXMoZ3JpZCwgZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ3NlbGVjdGVkSXRlbXMnXSkpO1xuICB9O1xuXG5leHBvcnQgY29uc3QgY2xlYXJTZWxlY3RlZEl0ZW1zID0gZ3JpZCA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0xFQVJfU0VMRUNURURfSVRFTVMsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICB9KTtcbiAgICBVdGlscy5zYXZlU2VsZWN0ZWRJdGVtcyhncmlkLCBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnc2VsZWN0ZWRJdGVtcyddKSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCB0b2dnbGVGaWx0ZXJpbmcgPSBncmlkID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBjb25zdCBpc0ZpbHRlcmluZyA9ICFnZXRTdGF0ZSgpXG4gICAgICAuZGF0YWdyaWRcbiAgICAgIC5nZXRJbihbZ3JpZC5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2lzRmlsdGVyaW5nJ10sIGZhbHNlKTtcbiAgICBVdGlscy5zYXZlSXNGaWx0ZXJpbmcoZ3JpZCwgaXNGaWx0ZXJpbmcpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1RPR0dMRV9GSUxURVJJTkcsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGlzRmlsdGVyaW5nLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgdmFsaWRhdGVFZGl0ZWRSb3dzID0gKGdyaWQsIGNvbHVtbnMpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBjb25zdCBncmlkRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0KGdyaWQuaWQpO1xuICAgIGNvbnN0IGVkaXREYXRhID0gZ3JpZERhdGEuZ2V0KCdlZGl0RGF0YScsIE1hcCgpKTtcbiAgICBsZXQgYWxsR29vZCA9IHRydWU7XG4gICAgZWRpdERhdGEuZm9yRWFjaCgoZWRpdERhdGFSb3csIGRhdGFJZCkgPT4ge1xuICAgICAgY29sdW1ucy5mb3JFYWNoKChjb2wpID0+IHtcbiAgICAgICAgbGV0IHZhbHVlID0gZWRpdERhdGFSb3cuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdmFsdWUgPSBncmlkRGF0YVxuICAgICAgICAgICAgLmdldCgnYWxsRGF0YScpXG4gICAgICAgICAgICAuZmluZChkYXRhID0+IGRhdGEuZ2V0SW4oZ3JpZC5pZEtleVBhdGgpID09PSBkYXRhSWQpXG4gICAgICAgICAgICAuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXNWYWxpZCA9IGVkaXRDZWxsVmFsdWVWYWxpZGF0ZShcbiAgICAgICAgICBncmlkLFxuICAgICAgICAgIGRhdGFJZCxcbiAgICAgICAgICBjb2wudmFsdWVLZXlQYXRoLFxuICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgIGNvbC52YWxpZGF0b3JzLFxuICAgICAgICApKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gICAgICAgIGlmIChhbGxHb29kICYmICFpc1ZhbGlkKSB7XG4gICAgICAgICAgYWxsR29vZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gYWxsR29vZDtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZUVtcHR5Q3JlYXRlZFJvd3MgPSAoZ3JpZCwgY29sdW1ucykgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGNvbnN0IGNyZWF0ZURhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnY3JlYXRlRGF0YSddLCBNYXAoKSk7XG4gICAgY29uc3QgaW5kZXhlcyA9IFtdO1xuICAgIGNyZWF0ZURhdGEuZm9yRWFjaCgoY3JlYXRlRGF0YVJvdywgcm93SW5kZXgpID0+IHtcbiAgICAgIGxldCBpc0VtcHR5ID0gdHJ1ZTtcbiAgICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gY3JlYXRlRGF0YVJvdy5nZXRJbihjb2wudmFsdWVLZXlQYXRoKTtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09ICcnICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgaXNFbXB0eSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChpc0VtcHR5KSB7XG4gICAgICAgIGluZGV4ZXMucHVzaChyb3dJbmRleCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGluZGV4ZXMubGVuZ3RoID4gMCkge1xuICAgICAgcmVtb3ZlTmV3SXRlbXMoZ3JpZCwgaW5kZXhlcykoZGlzcGF0Y2gpO1xuICAgIH1cbiAgfTtcblxuZXhwb3J0IGNvbnN0IHZhbGlkYXRlQ3JlYXRlZFJvd3MgPSAoZ3JpZCwgY29sdW1ucykgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIHJlbW92ZUVtcHR5Q3JlYXRlZFJvd3MoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgICBjb25zdCBjcmVhdGVEYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ2NyZWF0ZURhdGEnXSwgTWFwKCkpO1xuICAgIGxldCBhbGxHb29kID0gdHJ1ZTtcbiAgICBjcmVhdGVEYXRhLmZvckVhY2goKGNyZWF0ZURhdGFSb3csIHJvd0luZGV4KSA9PiB7XG4gICAgICBjb2x1bW5zLmZvckVhY2goKGNvbCkgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGNyZWF0ZURhdGFSb3cuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG4gICAgICAgIGNvbnN0IGlzVmFsaWQgPSBjcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZShcbiAgICAgICAgICBncmlkLFxuICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgIGNvbC52YWx1ZUtleVBhdGgsXG4gICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgY29sLnZhbGlkYXRvcnMsXG4gICAgICAgICkoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgICAgICAgaWYgKGFsbEdvb2QgJiYgIWlzVmFsaWQpIHtcbiAgICAgICAgICBhbGxHb29kID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBhbGxHb29kO1xuICB9O1xuXG5leHBvcnQgY29uc3QgdXBkYXRlRXhpc3RpbmdDZWxsVmFsdWUgPSAoZ3JpZCwgZGF0YUlkLCBrZXlQYXRoLCB2YWx1ZSkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfVVBEQVRFX0VYSVNUSU5HX0NFTExfVkFMVUUsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGRhdGFJZCxcbiAgICAgIGtleVBhdGgsXG4gICAgICB2YWx1ZSxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHNldEVkaXREYXRhID0gKGdyaWQsIGRhdGEsIGNlbGxNZXNzYWdlcyA9IE1hcCgpKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICBkYXRhLFxuICAgICAgY2VsbE1lc3NhZ2VzLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfRURJVF9EQVRBLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3Qgb3BlbkNvbHVtblNldHRpbmdzTW9kYWwgPSBncmlkID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9PUEVOLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBjbG9zZUNvbHVtblNldHRpbmdzTW9kYWwgPSBncmlkID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3Qgc2F2ZUNvbHVtblNldHRpbmdzID0gKGdyaWQsIGhpZGRlbkNvbHVtbnMsIGNvbHVtbk9yZGVyKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBVdGlscy5zYXZlQ29sdW1uU2V0dGluZ3MoZ3JpZCwgaGlkZGVuQ29sdW1ucywgY29sdW1uT3JkZXIpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBjb2x1bW5PcmRlcixcbiAgICB9KTtcbiAgfTtcblxuIl19