'use strict';

exports.__esModule = true;
exports.setRowsOnPage = exports.setPage = exports.saveColumnSettings = exports.closeColumnSettingsModal = exports.openColumnSettingsModal = exports.setEditData = exports.updateExistingCellValue = exports.validateCreatedRows = exports.removeEmptyCreatedRows = exports.validateEditedRows = exports.toggleFiltering = exports.clearSelectedItems = exports.selectAllItemsChange = exports.itemSelectionChange = exports.cellSelectionChange = exports.createCellHideMessage = exports.createCellShowMessage = exports.cellHideMessage = exports.cellShowMessages = exports.cellShowMessage = exports.createCellValueValidate = exports.createCellValueChange = exports.editCellValueValidate = exports.editCellValueChange = exports.removeFail = exports.removeSuccess = exports.remove = exports.removeNewItems = exports.removeNewItem = exports.removeItem = exports.addNewItem = exports.create = exports.saveFail = exports.savePartialSuccess = exports.saveSuccess = exports.save = exports.cancel = exports.edit = exports.resizeColumn = exports.extendData = exports.setFocusTo = exports.setData = exports.sortChange = exports.applySort = exports.filterCellValueChange = exports.setAndApplyFilters = exports.applyFilters = exports.setReady = exports.setBusy = exports.forceRefresh = exports.invalidate = exports.TYPES = undefined;

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
  PLATFORM_DATAGRID_SET_FOCUS_TO: 'PLATFORM_DATAGRID_SET_FOCUS_TO',
  PLATFORM_DATAGRID_SET_PAGE: 'PLATFORM_DATAGRID_SET_PAGE',
  PLATFORM_DATAGRID_SET_ROWS_ON_PAGE: 'PLATFORM_DATAGRID_SET_ROWS_ON_PAGE'
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
    if (grid.pagination) {
      return true;
    }if (filterData.isEmpty()) {
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

var setAndApplyFilters = exports.setAndApplyFilters = function setAndApplyFilters(grid, columns, data) {
  return function (dispatch) {
    var filteringData = _datagrid2.default.normalizeFilteringData(data);
    _datagrid2.default.saveFilterData(grid, filteringData.get('filterData'));
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_SET_FILTERS,
      id: grid.id,
      filteringData: filteringData
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
    if (grid.pagination) {
      return true;
    }
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
    if (!grid.pagination) {
      applyFilters(grid, columns)(dispatch, getState);
      applySort(grid, columns)(dispatch, getState);
    } else {
      var gridData = getState().datagrid.get(grid.id);
      if (!gridData) return false;
      var filterData = gridData.getIn(['config', 'filteringData', 'filterData'], (0, _immutable.Map)());
      if (!filterData.isEmpty()) {
        dispatch({
          type: TYPES.PLATFORM_DATAGRID_APPLY_FILTERS,
          id: grid.id,
          data: immutableData
        });
      }
      var sortData = gridData.getIn(['config', 'sortingData']);
      if (sortData) {
        dispatch({
          type: TYPES.PLATFORM_DATAGRID_APPLY_SORT,
          id: grid.id,
          data: immutableData,
          allData: immutableData
        });
      }
    }
    return true;
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

// eslint-disable-next-line max-len
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

// eslint-disable-next-line max-len
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

// eslint-disable-next-line max-len
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

// eslint-disable-next-line max-len
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

var setPage = exports.setPage = function setPage(grid, page) {
  return function (dispatch) {
    _datagrid2.default.savePage(grid, page);
    dispatch({
      page: page,
      id: grid.id,
      type: TYPES.PLATFORM_DATAGRID_SET_PAGE
    });
  };
};

var setRowsOnPage = exports.setRowsOnPage = function setRowsOnPage(grid, rowsOnPage) {
  return function (dispatch) {
    _datagrid2.default.saveRowsOnPage(grid, rowsOnPage);
    dispatch({
      rowsOnPage: rowsOnPage,
      id: grid.id,
      type: TYPES.PLATFORM_DATAGRID_SET_ROWS_ON_PAGE
    });
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5hY3Rpb25zLmpzIl0sIm5hbWVzIjpbIlRZUEVTIiwiUExBVEZPUk1fREFUQUdSSURfSU5WQUxJREFURSIsIlBMQVRGT1JNX0RBVEFHUklEX0JVU1kiLCJQTEFURk9STV9EQVRBR1JJRF9SRUFEWSIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9EQVRBIiwiUExBVEZPUk1fREFUQUdSSURfQVBQTFlfU09SVCIsIlBMQVRGT1JNX0RBVEFHUklEX1NPUlRfQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfUkVTSVpFX0NPTFVNTiIsIlBMQVRGT1JNX0RBVEFHUklEX0VESVQiLCJQTEFURk9STV9EQVRBR1JJRF9DQU5DRUwiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFIiwiUExBVEZPUk1fREFUQUdSSURfRVhURU5EX0RBVEEiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFX1NVQ0NFU1MiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFX1BBUlRJQUxfU1VDQ0VTUyIsIlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfRkFJTCIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURSIsIlBMQVRGT1JNX0RBVEFHUklEX0FERF9ORVdfSVRFTSIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9JVEVNIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNUyIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRSIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9TVUNDRVNTIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUwiLCJQTEFURk9STV9EQVRBR1JJRF9FRElUX0NFTExfVkFMVUVfQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0UiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRVMiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX0hJREVfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX0NIQU5HRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX1ZBTElEQVRFIiwiUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TRUxFQ1RJT05fQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9DTEVBUl9TRUxFQ1RFRF9JVEVNUyIsIlBMQVRGT1JNX0RBVEFHUklEX1RPR0dMRV9GSUxURVJJTkciLCJQTEFURk9STV9EQVRBR1JJRF9GSUxURVJfREFUQV9DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9GSUxURVJTIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX0ZJTFRFUlMiLCJQTEFURk9STV9EQVRBR1JJRF9VUERBVEVfRVhJU1RJTkdfQ0VMTF9WQUxVRSIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9FRElUX0RBVEEiLCJQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfT1BFTiIsIlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFIiwiUExBVEZPUk1fREFUQUdSSURfRk9SQ0VfUkVGUkVTSCIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9GT0NVU19UTyIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9QQUdFIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX1JPV1NfT05fUEFHRSIsImludmFsaWRhdGUiLCJkaXNwYXRjaCIsIlV0aWxzIiwiY2hlY2tHcmlkUGFyYW0iLCJncmlkIiwidHlwZSIsImlkIiwiZm9yY2VSZWZyZXNoIiwic2V0VGltZW91dCIsImRvY3VtZW50IiwiY3JlYXRlRXZlbnQiLCJldnQiLCJpbml0RXZlbnQiLCJ3aW5kb3ciLCJkaXNwYXRjaEV2ZW50Iiwic2V0QnVzeSIsInNldFJlYWR5IiwiYXBwbHlGaWx0ZXJzIiwiY29sdW1ucyIsImdldFN0YXRlIiwiZm9yRWFjaCIsImdyaWREYXRhIiwiZGF0YWdyaWQiLCJnZXQiLCJmaWx0ZXJEYXRhIiwiZ2V0SW4iLCJhbGxEYXRhIiwiZGF0YSIsInBhZ2luYXRpb24iLCJpc0VtcHR5IiwiZGF0ZUZvcm1hdCIsImdldERhdGVGb3JtYXQiLCJ1c2VyIiwiZmlsdGVyIiwicm93IiwiaGl0cyIsImZpbHRlclZhbHVlIiwiZmlsdGVyQ29sdW1uIiwiY29sdW1uIiwiZ2V0Q29sdW1uS2V5IiwidmFsdWUiLCJ2YWx1ZUtleVBhdGgiLCJmaWx0ZXJNYXRjaGVyIiwiZ2V0RmlsdGVyTWF0Y2hlciIsInNpemUiLCJzZXRBbmRBcHBseUZpbHRlcnMiLCJmaWx0ZXJpbmdEYXRhIiwibm9ybWFsaXplRmlsdGVyaW5nRGF0YSIsInNhdmVGaWx0ZXJEYXRhIiwiZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlIiwib3JpZ0ZpbHRlckRhdGEiLCJjb2x1bW5LZXkiLCJ2YWx1ZUVtcHR5Q2hlY2tlciIsImdldFZhbHVlRW1wdHlDaGVja2VyIiwiZGVsZXRlIiwic2V0IiwiYXBwbHlTb3J0Iiwic29ydERhdGEiLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwiY29sIiwib3JpZ0FsbERhdGEiLCJjb21wYXJhdG9yIiwiZ2V0U29ydENvbXBhcmF0b3IiLCJ2YWx1ZUdldHRlciIsImdldFNvcnRWYWx1ZUdldHRlciIsInNvcnQiLCJhIiwiYiIsInZhbEEiLCJ2YWxCIiwic29ydENoYW5nZSIsIm5ld1NvcnQiLCJzYXZlU29ydERhdGEiLCJzZXREYXRhIiwiY2hlY2tDb2x1bW5zUGFyYW0iLCJjb25maWdEYXRhIiwibG9hZEdyaWRDb25maWciLCJpbW11dGFibGVEYXRhIiwiSW1tdXRhYmxlIiwiSXRlcmFibGUiLCJpc0l0ZXJhYmxlIiwiZnJvbUpTIiwic2VsZWN0ZWRJdGVtcyIsImxvYWRTZWxlY3RlZEl0ZW1zIiwiZmluZCIsImRhdGFJdGVtIiwiaWRLZXlQYXRoIiwiaXRlbSIsImNvbmZpZyIsInNldEZvY3VzVG8iLCJmb2N1c1RvIiwiZm9jdXNUb0xhc3RSb3ciLCJleHRlbmREYXRhIiwicHJlcGVuZCIsInJlc2l6ZUNvbHVtbiIsIndpZHRoIiwiY29sdW1uV2lkdGhzIiwic2F2ZUNvbHVtbldpZHRocyIsImVkaXQiLCJjYW5jZWwiLCJzYXZlIiwiY2IiLCJzYXZlU3VjY2VzcyIsInNhdmVkSXRlbXMiLCJzYXZlUGFydGlhbFN1Y2Nlc3MiLCJzYXZlRmFpbCIsImNyZWF0ZSIsImNvbHVtbkRlZmF1bHRWYWx1ZXMiLCJhZGROZXdJdGVtIiwicmVtb3ZlSXRlbSIsInJvd0lkIiwicmVtb3ZlTmV3SXRlbSIsImluZGV4IiwicmVtb3ZlTmV3SXRlbXMiLCJpbmRleGVzIiwicmVtb3ZlIiwicmVtb3ZlU3VjY2VzcyIsInJlbW92ZWRJZHMiLCJyZW1vdmVGYWlsIiwiZWRpdENlbGxWYWx1ZUNoYW5nZSIsImRhdGFJZCIsImtleVBhdGgiLCJlZGl0Q2VsbFZhbHVlVmFsaWRhdGUiLCJ2YWxpZGF0b3JzIiwidmFsaWRhdGlvblN0YXRlIiwidmFsaWQiLCJ2YWxpZGF0b3IiLCJ1bmlxdWUiLCJ1bmRlZmluZWQiLCJlZGl0RGF0YSIsImVkaXREYXRhSXRlbSIsImVkaXREYXRhSXRlbUlkIiwiZm91bmRJbmRleCIsImZpbmRJbmRleCIsImQiLCJtZXJnZURlZXBJbiIsImZpbmRpbmciLCJsZW5ndGgiLCJtZXNzYWdlIiwidmFsaWRhdGVXaXRoUm93RGF0YSIsInJvd0RhdGEiLCJtZXJnZURlZXAiLCJwYXJhbXMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJ2YWxpZGF0ZSIsIm1lc3NhZ2VWYWx1ZXMiLCJtZXNzYWdlVHlwZSIsIm1lc3NhZ2VJZCIsImNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSIsInJvd0luZGV4IiwiY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUiLCJmaW5kMiIsImkiLCJjZWxsU2hvd01lc3NhZ2UiLCJjZWxsU2hvd01lc3NhZ2VzIiwibWVzc2FnZXMiLCJjZWxsSGlkZU1lc3NhZ2UiLCJjcmVhdGVDZWxsU2hvd01lc3NhZ2UiLCJjcmVhdGVDZWxsSGlkZU1lc3NhZ2UiLCJjZWxsU2VsZWN0aW9uQ2hhbmdlIiwic2VsZWN0ZWRDZWxsIiwiaXRlbVNlbGVjdGlvbkNoYW5nZSIsImN0cmxQcmVzc2VkIiwic2hpZnRQcmVzc2VkIiwic2F2ZVNlbGVjdGVkSXRlbXMiLCJzZWxlY3RBbGxJdGVtc0NoYW5nZSIsImNsZWFyU2VsZWN0ZWRJdGVtcyIsInRvZ2dsZUZpbHRlcmluZyIsImlzRmlsdGVyaW5nIiwic2F2ZUlzRmlsdGVyaW5nIiwidmFsaWRhdGVFZGl0ZWRSb3dzIiwiYWxsR29vZCIsImVkaXREYXRhUm93IiwiaXNWYWxpZCIsInJlbW92ZUVtcHR5Q3JlYXRlZFJvd3MiLCJjcmVhdGVEYXRhIiwiY3JlYXRlRGF0YVJvdyIsInB1c2giLCJ2YWxpZGF0ZUNyZWF0ZWRSb3dzIiwidXBkYXRlRXhpc3RpbmdDZWxsVmFsdWUiLCJzZXRFZGl0RGF0YSIsImNlbGxNZXNzYWdlcyIsIm9wZW5Db2x1bW5TZXR0aW5nc01vZGFsIiwiY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsIiwic2F2ZUNvbHVtblNldHRpbmdzIiwiaGlkZGVuQ29sdW1ucyIsImNvbHVtbk9yZGVyIiwic2V0UGFnZSIsInBhZ2UiLCJzYXZlUGFnZSIsInNldFJvd3NPblBhZ2UiLCJyb3dzT25QYWdlIiwic2F2ZVJvd3NPblBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0FBRU8sSUFBTUEsd0JBQVE7QUFDbkJDLGdDQUE4Qiw4QkFEWDtBQUVuQkMsMEJBQXdCLHdCQUZMO0FBR25CQywyQkFBeUIseUJBSE47QUFJbkJDLDhCQUE0Qiw0QkFK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QUFRQSxJQUFNb0wsa0RBQXFCLFNBQXJCQSxrQkFBcUIsQ0FBQ3RMLElBQUQsRUFBT3VMLGFBQVAsRUFBc0JDLFdBQXRCO0FBQUEsU0FBc0MsVUFBQzNMLFFBQUQsRUFBYztBQUNwRkMsdUJBQU1DLGNBQU4sQ0FBcUJDLElBQXJCO0FBQ0FGLHVCQUFNd0wsa0JBQU4sQ0FBeUJ0TCxJQUF6QixFQUErQnVMLGFBQS9CLEVBQThDQyxXQUE5QztBQUNBM0wsYUFBUztBQUNQSSxZQUFNckQsTUFBTTJDLHNDQURMO0FBRVBXLFVBQUlGLEtBQUtFLEVBRkY7QUFHUHNMO0FBSE8sS0FBVDtBQUtELEdBUmlDO0FBQUEsQ0FBM0I7O0FBVUEsSUFBTUMsNEJBQVUsU0FBVkEsT0FBVSxDQUFDekwsSUFBRCxFQUFPMEwsSUFBUDtBQUFBLFNBQWdCLFVBQUM3TCxRQUFELEVBQWM7QUFDbkRDLHVCQUFNNkwsUUFBTixDQUFlM0wsSUFBZixFQUFxQjBMLElBQXJCO0FBQ0E3TCxhQUFTO0FBQ1A2TCxnQkFETztBQUVQeEwsVUFBSUYsS0FBS0UsRUFGRjtBQUdQRCxZQUFNckQsTUFBTThDO0FBSEwsS0FBVDtBQUtELEdBUHNCO0FBQUEsQ0FBaEI7O0FBU0EsSUFBTWtNLHdDQUFnQixTQUFoQkEsYUFBZ0IsQ0FBQzVMLElBQUQsRUFBTzZMLFVBQVA7QUFBQSxTQUFzQixVQUFDaE0sUUFBRCxFQUFjO0FBQy9EQyx1QkFBTWdNLGNBQU4sQ0FBcUI5TCxJQUFyQixFQUEyQjZMLFVBQTNCO0FBQ0FoTSxhQUFTO0FBQ1BnTSw0QkFETztBQUVQM0wsVUFBSUYsS0FBS0UsRUFGRjtBQUdQRCxZQUFNckQsTUFBTStDO0FBSEwsS0FBVDtBQUtELEdBUDRCO0FBQUEsQ0FBdEIiLCJmaWxlIjoiZGF0YWdyaWQuYWN0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJbW11dGFibGUsIHsgTWFwIH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCBVdGlscyBmcm9tICcuL2RhdGFncmlkLnV0aWxzJztcblxuZXhwb3J0IGNvbnN0IFRZUEVTID0ge1xuICBQTEFURk9STV9EQVRBR1JJRF9JTlZBTElEQVRFOiAnUExBVEZPUk1fREFUQUdSSURfSU5WQUxJREFURScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0JVU1k6ICdQTEFURk9STV9EQVRBR1JJRF9CVVNZJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVBRFk6ICdQTEFURk9STV9EQVRBR1JJRF9SRUFEWScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NFVF9EQVRBOiAnUExBVEZPUk1fREFUQUdSSURfU0VUX0RBVEEnLFxuICBQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9TT1JUOiAnUExBVEZPUk1fREFUQUdSSURfQVBQTFlfU09SVCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NPUlRfQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfU09SVF9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRVNJWkVfQ09MVU1OOiAnUExBVEZPUk1fREFUQUdSSURfUkVTSVpFX0NPTFVNTicsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0VESVQ6ICdQTEFURk9STV9EQVRBR1JJRF9FRElUJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0FOQ0VMOiAnUExBVEZPUk1fREFUQUdSSURfQ0FOQ0VMJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0FWRTogJ1BMQVRGT1JNX0RBVEFHUklEX1NBVkUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9FWFRFTkRfREFUQTogJ1BMQVRGT1JNX0RBVEFHUklEX0VYVEVORF9EQVRBJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0FWRV9TVUNDRVNTOiAnUExBVEZPUk1fREFUQUdSSURfU0FWRV9TVUNDRVNTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0FWRV9QQVJUSUFMX1NVQ0NFU1M6ICdQTEFURk9STV9EQVRBR1JJRF9TQVZFX1BBUlRJQUxfU1VDQ0VTUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NBVkVfRkFJTDogJ1BMQVRGT1JNX0RBVEFHUklEX1NBVkVfRkFJTCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NSRUFURTogJ1BMQVRGT1JNX0RBVEFHUklEX0NSRUFURScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0FERF9ORVdfSVRFTTogJ1BMQVRGT1JNX0RBVEFHUklEX0FERF9ORVdfSVRFTScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9JVEVNOiAnUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0lURU0nLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU06ICdQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU0nLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU1TOiAnUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRTogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9TVUNDRVNTOiAnUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX1NVQ0NFU1MnLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfRkFJTDogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9GQUlMJyxcbiAgUExBVEZPUk1fREFUQUdSSURfRURJVF9DRUxMX1ZBTFVFX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX0VESVRfQ0VMTF9WQUxVRV9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0VTOiAnUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0VTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0VMTF9ISURFX01FU1NBR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX0hJREVfTUVTU0FHRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX0hJREVfTUVTU0FHRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX1ZBTElEQVRFOiAnUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfVkFMSURBVEUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NFTEVDVElPTl9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NFTEVDVElPTl9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9JVEVNX1NFTEVDVElPTl9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9JVEVNX1NFTEVDVElPTl9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRUxFQ1RfQUxMX0lURU1TX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX1NFTEVDVF9BTExfSVRFTVNfQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0xFQVJfU0VMRUNURURfSVRFTVM6ICdQTEFURk9STV9EQVRBR1JJRF9DTEVBUl9TRUxFQ1RFRF9JVEVNUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1RPR0dMRV9GSUxURVJJTkc6ICdQTEFURk9STV9EQVRBR1JJRF9UT0dHTEVfRklMVEVSSU5HJyxcbiAgUExBVEZPUk1fREFUQUdSSURfRklMVEVSX0RBVEFfQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfRklMVEVSX0RBVEFfQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQVBQTFlfRklMVEVSUzogJ1BMQVRGT1JNX0RBVEFHUklEX0FQUExZX0ZJTFRFUlMnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRVRfRklMVEVSUzogJ1BMQVRGT1JNX0RBVEFHUklEX1NFVF9GSUxURVJTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfVVBEQVRFX0VYSVNUSU5HX0NFTExfVkFMVUU6ICdQTEFURk9STV9EQVRBR1JJRF9VUERBVEVfRVhJU1RJTkdfQ0VMTF9WQUxVRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NFVF9FRElUX0RBVEE6ICdQTEFURk9STV9EQVRBR1JJRF9TRVRfRURJVF9EQVRBJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX09QRU46ICdQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfT1BFTicsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFOiAnUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX1NBVkUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9GT1JDRV9SRUZSRVNIOiAnUExBVEZPUk1fREFUQUdSSURfRk9SQ0VfUkVGUkVTSCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NFVF9GT0NVU19UTzogJ1BMQVRGT1JNX0RBVEFHUklEX1NFVF9GT0NVU19UTycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NFVF9QQUdFOiAnUExBVEZPUk1fREFUQUdSSURfU0VUX1BBR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRVRfUk9XU19PTl9QQUdFOiAnUExBVEZPUk1fREFUQUdSSURfU0VUX1JPV1NfT05fUEFHRScsXG59O1xuXG5leHBvcnQgY29uc3QgaW52YWxpZGF0ZSA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfSU5WQUxJREFURSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZm9yY2VSZWZyZXNoID0gKCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIC8vIEZpcmUgcmVzaXplIGV2ZW50IHRvIHJlY2FsY3VsYXRlIGNvbXBvbmVudCBzaXplc1xuICAvLyBhbmQgdG8gZm9yY2UgcmVkcmF3IGFsbCBtb3VudGVkIGdyaWRzXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGlmIChkb2N1bWVudC5jcmVhdGVFdmVudCkge1xuICAgICAgY29uc3QgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKTtcbiAgICAgIGV2dC5pbml0RXZlbnQoJ3Jlc2l6ZScsIHRydWUsIGZhbHNlKTtcbiAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gICAgfVxuICB9LCAxKTtcbiAgZGlzcGF0Y2goeyB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9GT1JDRV9SRUZSRVNIIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldEJ1c3kgPSBncmlkID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0JVU1ksXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldFJlYWR5ID0gZ3JpZCA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRUFEWSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgYXBwbHlGaWx0ZXJzID0gKGdyaWQsIGNvbHVtbnMpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGlmICghY29sdW1ucyB8fCAhY29sdW1ucy5mb3JFYWNoKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG4gIGlmICghZ3JpZERhdGEpIHJldHVybiBmYWxzZTtcbiAgY29uc3QgZmlsdGVyRGF0YSA9IGdyaWREYXRhLmdldEluKFsnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnZmlsdGVyRGF0YSddLCBNYXAoKSk7XG4gIGNvbnN0IGFsbERhdGEgPSBncmlkRGF0YS5nZXQoJ2FsbERhdGEnKTtcbiAgc2V0QnVzeShncmlkKShkaXNwYXRjaCk7XG4gIGxldCBkYXRhO1xuICBpZiAoZ3JpZC5wYWdpbmF0aW9uKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gaWYgKGZpbHRlckRhdGEuaXNFbXB0eSgpKSB7XG4gICAgZGF0YSA9IGFsbERhdGE7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZGF0ZUZvcm1hdCA9IFV0aWxzLmdldERhdGVGb3JtYXQoZ3JpZCwgZ2V0U3RhdGUoKS51c2VyKTtcbiAgICBkYXRhID0gYWxsRGF0YS5maWx0ZXIoKHJvdykgPT4ge1xuICAgICAgbGV0IGhpdHMgPSAwO1xuICAgICAgZmlsdGVyRGF0YS5mb3JFYWNoKChmaWx0ZXJWYWx1ZSwgZmlsdGVyQ29sdW1uKSA9PiB7XG4gICAgICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sdW1uKSA9PiB7XG4gICAgICAgICAgaWYgKFV0aWxzLmdldENvbHVtbktleShjb2x1bW4pID09PSBmaWx0ZXJDb2x1bW4pIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gcm93LmdldEluKGNvbHVtbi52YWx1ZUtleVBhdGgpO1xuICAgICAgICAgICAgaWYgKHZhbHVlIHx8IHZhbHVlID09PSAwIHx8IHZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJNYXRjaGVyID0gVXRpbHMuZ2V0RmlsdGVyTWF0Y2hlcihjb2x1bW4sIGRhdGVGb3JtYXQpO1xuICAgICAgICAgICAgICBpZiAoZmlsdGVyTWF0Y2hlcihyb3csIGZpbHRlclZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGhpdHMgKz0gMTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBoaXRzID09PSBmaWx0ZXJEYXRhLnNpemU7XG4gICAgfSk7XG4gIH1cbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0FQUExZX0ZJTFRFUlMsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgZGF0YSxcbiAgfSk7XG4gIHNldFJlYWR5KGdyaWQpKGRpc3BhdGNoKTtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0QW5kQXBwbHlGaWx0ZXJzID0gKGdyaWQsIGNvbHVtbnMsIGRhdGEpID0+IChkaXNwYXRjaCkgPT4ge1xuICBjb25zdCBmaWx0ZXJpbmdEYXRhID0gVXRpbHMubm9ybWFsaXplRmlsdGVyaW5nRGF0YShkYXRhKTtcbiAgVXRpbHMuc2F2ZUZpbHRlckRhdGEoZ3JpZCwgZmlsdGVyaW5nRGF0YS5nZXQoJ2ZpbHRlckRhdGEnKSk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfRklMVEVSUyxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBmaWx0ZXJpbmdEYXRhLFxuICB9KTtcbiAgZGlzcGF0Y2goYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKTtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5leHBvcnQgY29uc3QgZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlID0gKGdyaWQsIGNvbHVtbnMsIGNvbHVtbiwgdmFsdWUpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGNvbnN0IG9yaWdGaWx0ZXJEYXRhID0gZ2V0U3RhdGUoKVxuICAgIC5kYXRhZ3JpZFxuICAgIC5nZXRJbihbZ3JpZC5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2ZpbHRlckRhdGEnXSwgTWFwKCkpO1xuICBjb25zdCBjb2x1bW5LZXkgPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sdW1uKTtcbiAgY29uc3QgdmFsdWVFbXB0eUNoZWNrZXIgPSBVdGlscy5nZXRWYWx1ZUVtcHR5Q2hlY2tlcihjb2x1bW4pO1xuICBsZXQgZmlsdGVyRGF0YTtcbiAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbHVlKSkge1xuICAgIGZpbHRlckRhdGEgPSBvcmlnRmlsdGVyRGF0YS5kZWxldGUoY29sdW1uS2V5KTtcbiAgfSBlbHNlIHtcbiAgICBmaWx0ZXJEYXRhID0gb3JpZ0ZpbHRlckRhdGEuc2V0KGNvbHVtbktleSwgdmFsdWUpO1xuICB9XG4gIFV0aWxzLnNhdmVGaWx0ZXJEYXRhKGdyaWQsIGZpbHRlckRhdGEpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfRklMVEVSX0RBVEFfQ0hBTkdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGZpbHRlckRhdGEsXG4gIH0pO1xuICBhcHBseUZpbHRlcnMoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbn07XG5cbmV4cG9ydCBjb25zdCBhcHBseVNvcnQgPSAoZ3JpZCwgY29sdW1ucykgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgaWYgKCFjb2x1bW5zIHx8ICFjb2x1bW5zLmZvckVhY2gpIHJldHVybiBmYWxzZTtcbiAgY29uc3QgZ3JpZERhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldChncmlkLmlkKTtcbiAgaWYgKCFncmlkRGF0YSkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBzb3J0RGF0YSA9IGdyaWREYXRhLmdldEluKFsnY29uZmlnJywgJ3NvcnRpbmdEYXRhJ10pO1xuICBpZiAoIXNvcnREYXRhKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IHNvcnRDb2x1bW4gPSBzb3J0RGF0YS5nZXQoJ3NvcnRDb2x1bW4nKTtcbiAgaWYgKCFzb3J0Q29sdW1uKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IHNvcnRPcmRlciA9IHNvcnREYXRhLmdldCgnc29ydE9yZGVyJywgJ2FzYycpO1xuICBsZXQgY29sdW1uO1xuICBjb2x1bW5zLmZvckVhY2goKGNvbCkgPT4ge1xuICAgIGlmIChVdGlscy5nZXRDb2x1bW5LZXkoY29sKSA9PT0gc29ydENvbHVtbikge1xuICAgICAgY29sdW1uID0gY29sO1xuICAgIH1cbiAgfSk7XG4gIGlmICghY29sdW1uKSByZXR1cm4gZmFsc2U7XG5cbiAgc2V0QnVzeShncmlkKShkaXNwYXRjaCk7XG4gIGlmIChncmlkLnBhZ2luYXRpb24pIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBjb25zdCBvcmlnQWxsRGF0YSA9IGdyaWREYXRhLmdldCgnYWxsRGF0YScpO1xuICBjb25zdCBjb21wYXJhdG9yID0gVXRpbHMuZ2V0U29ydENvbXBhcmF0b3IoY29sdW1uKTtcbiAgY29uc3QgdmFsdWVHZXR0ZXIgPSBVdGlscy5nZXRTb3J0VmFsdWVHZXR0ZXIoY29sdW1uKTtcbiAgY29uc3QgdmFsdWVFbXB0eUNoZWNrZXIgPSBVdGlscy5nZXRWYWx1ZUVtcHR5Q2hlY2tlcihjb2x1bW4pO1xuICBjb25zdCBhbGxEYXRhID0gb3JpZ0FsbERhdGEuc29ydCgoYSwgYikgPT4ge1xuICAgIGNvbnN0IHZhbEEgPSB2YWx1ZUdldHRlcihhKTtcbiAgICBjb25zdCB2YWxCID0gdmFsdWVHZXR0ZXIoYik7XG4gICAgaWYgKHNvcnRPcmRlciA9PT0gJ2FzYycpIHtcbiAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxBKSkgcmV0dXJuIC0xO1xuICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEIpKSByZXR1cm4gMTtcbiAgICAgIHJldHVybiBjb21wYXJhdG9yKHZhbEEsIHZhbEIpO1xuICAgIH1cbiAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQSkpIHJldHVybiAxO1xuICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxCKSkgcmV0dXJuIC0xO1xuICAgIHJldHVybiBjb21wYXJhdG9yKHZhbEIsIHZhbEEpO1xuICB9KTtcbiAgbGV0IGRhdGE7XG4gIC8vIFNvcnQgYWxzbyBmaWx0ZXJlZCBkYXRhIHNlcGFyYXRlbHlcbiAgaWYgKGdyaWREYXRhLmdldEluKFsnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnaXNGaWx0ZXJpbmcnXSwgZmFsc2UpKSB7XG4gICAgZGF0YSA9IGdyaWREYXRhLmdldCgnZGF0YScpLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIGNvbnN0IHZhbEEgPSB2YWx1ZUdldHRlcihhKTtcbiAgICAgIGNvbnN0IHZhbEIgPSB2YWx1ZUdldHRlcihiKTtcbiAgICAgIGlmIChzb3J0T3JkZXIgPT09ICdhc2MnKSB7XG4gICAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxBKSkgcmV0dXJuIC0xO1xuICAgICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQikpIHJldHVybiAxO1xuICAgICAgICByZXR1cm4gY29tcGFyYXRvcih2YWxBLCB2YWxCKTtcbiAgICAgIH1cbiAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxBKSkgcmV0dXJuIDE7XG4gICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQikpIHJldHVybiAtMTtcbiAgICAgIHJldHVybiBjb21wYXJhdG9yKHZhbEIsIHZhbEEpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGRhdGEgPSBhbGxEYXRhO1xuICB9XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9BUFBMWV9TT1JULFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGRhdGEsXG4gICAgYWxsRGF0YSxcbiAgfSk7XG4gIHNldFJlYWR5KGdyaWQpKGRpc3BhdGNoKTtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5leHBvcnQgY29uc3Qgc29ydENoYW5nZSA9IChncmlkLCBjb2x1bW5zLCBjb2x1bW4sIG5ld1NvcnQpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGNvbnN0IHNvcnRPcmRlciA9IG5ld1NvcnQgfHwgJ2FzYyc7XG4gIGNvbnN0IHNvcnRDb2x1bW4gPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sdW1uKTtcbiAgVXRpbHMuc2F2ZVNvcnREYXRhKGdyaWQsIHsgc29ydENvbHVtbiwgc29ydE9yZGVyIH0pO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU09SVF9DSEFOR0UsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgc29ydENvbHVtbixcbiAgICBzb3J0T3JkZXIsXG4gIH0pO1xuICBhcHBseVNvcnQoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXREYXRhID0gKGdyaWQsIGNvbHVtbnMsIGRhdGEpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIFV0aWxzLmNoZWNrQ29sdW1uc1BhcmFtKGNvbHVtbnMpO1xuICBjb25zdCBjb25maWdEYXRhID0gVXRpbHMubG9hZEdyaWRDb25maWcoZ3JpZCwgY29sdW1ucyk7XG4gIGNvbnN0IGltbXV0YWJsZURhdGEgPSBJbW11dGFibGUuSXRlcmFibGUuaXNJdGVyYWJsZShkYXRhKSA/IGRhdGEgOiBJbW11dGFibGUuZnJvbUpTKGRhdGEpO1xuICBjb25zdCBzZWxlY3RlZEl0ZW1zID0gVXRpbHMubG9hZFNlbGVjdGVkSXRlbXMoZ3JpZCkuZmlsdGVyKGl0ZW0gPT4gKFxuICAgICEhaW1tdXRhYmxlRGF0YS5maW5kKGRhdGFJdGVtID0+IGRhdGFJdGVtLmdldEluKGdyaWQuaWRLZXlQYXRoKSA9PT0gaXRlbSlcbiAgKSk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfREFUQSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBkYXRhOiBpbW11dGFibGVEYXRhLFxuICAgIGNvbmZpZzogY29uZmlnRGF0YSxcbiAgICBzZWxlY3RlZEl0ZW1zLFxuICB9KTtcbiAgaWYgKCFncmlkLnBhZ2luYXRpb24pIHtcbiAgICBhcHBseUZpbHRlcnMoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgICBhcHBseVNvcnQoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBncmlkRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0KGdyaWQuaWQpO1xuICAgIGlmICghZ3JpZERhdGEpIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBmaWx0ZXJEYXRhID0gZ3JpZERhdGEuZ2V0SW4oWydjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdmaWx0ZXJEYXRhJ10sIE1hcCgpKTtcbiAgICBpZiAoIWZpbHRlckRhdGEuaXNFbXB0eSgpKSB7XG4gICAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0FQUExZX0ZJTFRFUlMsXG4gICAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgICBkYXRhOiBpbW11dGFibGVEYXRhLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0IHNvcnREYXRhID0gZ3JpZERhdGEuZ2V0SW4oWydjb25maWcnLCAnc29ydGluZ0RhdGEnXSk7XG4gICAgaWYgKHNvcnREYXRhKSB7XG4gICAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0FQUExZX1NPUlQsXG4gICAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgICBkYXRhOiBpbW11dGFibGVEYXRhLFxuICAgICAgICBhbGxEYXRhOiBpbW11dGFibGVEYXRhLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufTtcblxuLyoqXG4gKiBBY3Rpb24gdG8gc2V0IGZvY3VzIHRvIGVpdGhlciBsYXN0IGVkaXRlZFJvdywgY3JlYXRlZFJvdyBvciB0byB2YWxpZGF0aW9uIGVycm9yXG4gKiBAcGFyYW0ge09iamVjdH0gZ3JpZFxuICogQHBhcmFtIHtTdHJpbmd9IGZvY3VzVG9UeXBlIC0gdHlwZSBvZiBmb2N1cyByZXF1ZXN0LiBQb3NzaWJsZSB2YWx1ZXM6XG4gKiAnZm9jdXNUb0VkaXRDZWxsJyB8fCAnZm9jdXNUb0Vycm9yQ2VsbCcgfHwgJ2ZvY3VzVG9DcmVhdGVDZWxsJ1xuICogQHBhcmFtIHtib29sZWFufSBmb2N1c1RvTGFzdFJvdyAtIHNldHMgZm9jdXMgdG8gbGFzdCBkYXRhIHJvdyBpbnN0ZWFkIG9mIHNlbGVjdGVkIHJvd1xuICovXG5leHBvcnQgY29uc3Qgc2V0Rm9jdXNUbyA9IChncmlkLCBmb2N1c1RvLCBmb2N1c1RvTGFzdFJvdyA9IGZhbHNlKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfRk9DVVNfVE8sXG4gICAgZm9jdXNUbyxcbiAgICBmb2N1c1RvTGFzdFJvdyxcbiAgICBpZDogZ3JpZC5pZCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZXh0ZW5kRGF0YSA9IChncmlkLCBjb2x1bW5zLCBkYXRhLCBwcmVwZW5kID0gZmFsc2UpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGNvbnN0IGltbXV0YWJsZURhdGEgPSBJbW11dGFibGUuSXRlcmFibGUuaXNJdGVyYWJsZShkYXRhKSA/IGRhdGEgOiBJbW11dGFibGUuZnJvbUpTKGRhdGEpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfRVhURU5EX0RBVEEsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgZGF0YTogaW1tdXRhYmxlRGF0YSxcbiAgICBwcmVwZW5kLFxuICB9KTtcbiAgYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gIGFwcGx5U29ydChncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlc2l6ZUNvbHVtbiA9IChncmlkLCBjb2x1bW5LZXksIHdpZHRoKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBjb25zdCBjb2x1bW5XaWR0aHMgPSBnZXRTdGF0ZSgpXG4gICAgLmRhdGFncmlkXG4gICAgLmdldEluKFtncmlkLmlkLCAnY29uZmlnJywgJ2NvbHVtbldpZHRocyddLCBNYXAoKSlcbiAgICAuc2V0KGNvbHVtbktleSwgd2lkdGgpO1xuICBVdGlscy5zYXZlQ29sdW1uV2lkdGhzKGdyaWQsIGNvbHVtbldpZHRocyk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRVNJWkVfQ09MVU1OLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGNvbHVtbldpZHRocyxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZWRpdCA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfRURJVCxcbiAgICBpZDogZ3JpZC5pZCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgY2FuY2VsID0gZ3JpZCA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DQU5DRUwsXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNhdmUgPSAoZ3JpZCwgY2IgPSAoKSA9PiB7fSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0FWRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgfSk7XG4gIGNiKCk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2F2ZVN1Y2Nlc3MgPSAoZ3JpZCwgY29sdW1ucywgc2F2ZWRJdGVtcykgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfU1VDQ0VTUyxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBpZEtleVBhdGg6IGdyaWQuaWRLZXlQYXRoLFxuICAgIHNhdmVkSXRlbXMsXG4gIH0pO1xuICBhcHBseUZpbHRlcnMoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgYXBwbHlTb3J0KGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2F2ZVBhcnRpYWxTdWNjZXNzID0gKGdyaWQsIGNvbHVtbnMsIHNhdmVkSXRlbXMpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TQVZFX1BBUlRJQUxfU1VDQ0VTUyxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBpZEtleVBhdGg6IGdyaWQuaWRLZXlQYXRoLFxuICAgIHNhdmVkSXRlbXMsXG4gIH0pO1xuICBhcHBseUZpbHRlcnMoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgYXBwbHlTb3J0KGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2F2ZUZhaWwgPSBncmlkID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfRkFJTCxcbiAgICBpZDogZ3JpZC5pZCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlID0gKGdyaWQsIGNvbHVtbkRlZmF1bHRWYWx1ZXMpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBjb2x1bW5EZWZhdWx0VmFsdWVzLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBhZGROZXdJdGVtID0gKGdyaWQsIGNvbHVtbkRlZmF1bHRWYWx1ZXMpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0FERF9ORVdfSVRFTSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBjb2x1bW5EZWZhdWx0VmFsdWVzLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVJdGVtID0gKGdyaWQsIHJvd0lkKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfSVRFTSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBpZEtleVBhdGg6IGdyaWQuaWRLZXlQYXRoLFxuICAgIHJvd0lkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVOZXdJdGVtID0gKGdyaWQsIGluZGV4KSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU0sXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgaW5kZXgsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZU5ld0l0ZW1zID0gKGdyaWQsIGluZGV4ZXMpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTVMsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgaW5kZXhlcyxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlID0gKGdyaWQsIGNiID0gKCkgPT4ge30pID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgfSk7XG4gIGNiKCk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlU3VjY2VzcyA9IChncmlkLCByZW1vdmVkSWRzKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfU1VDQ0VTUyxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBpZEtleVBhdGg6IGdyaWQuaWRLZXlQYXRoLFxuICAgIHJlbW92ZWRJZHMsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZUZhaWwgPSBncmlkID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9GQUlMLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBlZGl0Q2VsbFZhbHVlQ2hhbmdlID0gKGdyaWQsIGRhdGFJZCwga2V5UGF0aCwgdmFsdWUpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0VESVRfQ0VMTF9WQUxVRV9DSEFOR0UsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgZGF0YUlkLFxuICAgIGtleVBhdGgsXG4gICAgdmFsdWUsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGVkaXRDZWxsVmFsdWVWYWxpZGF0ZSA9IChcbiAgZ3JpZCxcbiAgZGF0YUlkLFxuICBrZXlQYXRoLFxuICB2YWx1ZSxcbiAgdmFsaWRhdG9ycyA9IFtdLFxuKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBsZXQgdmFsaWRhdGlvblN0YXRlID0geyB2YWxpZDogdHJ1ZSB9O1xuICB2YWxpZGF0b3JzLmZvckVhY2goKHZhbGlkYXRvcikgPT4ge1xuICAgIGlmICh2YWxpZGF0aW9uU3RhdGUudmFsaWQpIHtcbiAgICAgIGlmICh2YWxpZGF0b3IudW5pcXVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gJycgfHwgdmFsdWUgIT09IG51bGwgfHwgdmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIC8vIGNvbWJpbmUgcmVhbCBkYXRhIHdpdGggY3VycmVudCB1bnNhdmVkIGVkaXRlZCBkYXRhXG4gICAgICAgICAgY29uc3QgZ3JpZERhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldChncmlkLmlkKTtcbiAgICAgICAgICBjb25zdCBlZGl0RGF0YSA9IGdyaWREYXRhLmdldCgnZWRpdERhdGEnKTtcbiAgICAgICAgICBsZXQgYWxsRGF0YSA9IGdyaWREYXRhLmdldCgnYWxsRGF0YScpO1xuICAgICAgICAgIGlmIChlZGl0RGF0YSkge1xuICAgICAgICAgICAgZWRpdERhdGEuZm9yRWFjaCgoZWRpdERhdGFJdGVtLCBlZGl0RGF0YUl0ZW1JZCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBmb3VuZEluZGV4ID0gYWxsRGF0YS5maW5kSW5kZXgoZCA9PiBkLmdldEluKGdyaWQuaWRLZXlQYXRoKSA9PT0gZWRpdERhdGFJdGVtSWQpO1xuICAgICAgICAgICAgICBpZiAoZm91bmRJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBhbGxEYXRhID0gYWxsRGF0YS5tZXJnZURlZXBJbihbZm91bmRJbmRleF0sIGVkaXREYXRhSXRlbSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBkZXRlcm1pbmUgdW5pcXVlbmVzc1xuICAgICAgICAgIGNvbnN0IGZpbmRpbmcgPSBhbGxEYXRhLmZpbmQoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGlmIChncmlkLmlkS2V5UGF0aC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgLy8gZG9uJ3Qgc2VsZiBjb21wYXJlXG4gICAgICAgICAgICAgIGlmIChpdGVtLmdldEluKGdyaWQuaWRLZXlQYXRoKSA9PT0gZGF0YUlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5nZXRJbihrZXlQYXRoKSA9PT0gdmFsdWU7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKGZpbmRpbmcpIHtcbiAgICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHtcbiAgICAgICAgICAgICAgdmFsaWQ6IGZhbHNlLFxuICAgICAgICAgICAgICBtZXNzYWdlOiAnVmFsaWRhdGlvbi5VbmlxdWUnLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodmFsaWRhdG9yLnZhbGlkYXRlV2l0aFJvd0RhdGEpIHtcbiAgICAgICAgY29uc3QgZ3JpZERhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldChncmlkLmlkKTtcbiAgICAgICAgY29uc3QgZWRpdERhdGEgPSBncmlkRGF0YS5nZXRJbihbJ2VkaXREYXRhJywgZGF0YUlkXSwgTWFwKCkpO1xuICAgICAgICBsZXQgcm93RGF0YSA9IGdyaWREYXRhLmdldCgnYWxsRGF0YScpLmZpbmQoaXRlbSA9PiBpdGVtLmdldEluKGdyaWQuaWRLZXlQYXRoKSA9PT0gZGF0YUlkKTtcbiAgICAgICAgaWYgKHJvd0RhdGEpIHtcbiAgICAgICAgICByb3dEYXRhID0gcm93RGF0YS5tZXJnZURlZXAoZWRpdERhdGEpO1xuICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IHZhbGlkYXRvci5wYXJhbXMgPyBPYmplY3QudmFsdWVzKHZhbGlkYXRvci5wYXJhbXMpIDogW107XG4gICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0gdmFsaWRhdG9yLnZhbGlkYXRlV2l0aFJvd0RhdGEodmFsdWUsIHJvd0RhdGEsIC4uLnBhcmFtcyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHZhbGlkYXRvci5wYXJhbXMgPyBPYmplY3QudmFsdWVzKHZhbGlkYXRvci5wYXJhbXMpIDogW107XG4gICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZSh2YWx1ZSwgLi4ucGFyYW1zKTtcbiAgICAgICAgaWYgKHZhbGlkYXRvci5wYXJhbXMpIHtcbiAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZVZhbHVlcyA9IHZhbGlkYXRvci5wYXJhbXM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICBpZiAodmFsaWRhdGlvblN0YXRlLnZhbGlkKSB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0VMTF9ISURFX01FU1NBR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIG1lc3NhZ2VUeXBlOiAnZXJyb3InLFxuICAgICAgZGF0YUlkLFxuICAgICAga2V5UGF0aCxcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgbWVzc2FnZVR5cGU6ICdlcnJvcicsXG4gICAgICBkYXRhSWQsXG4gICAgICBrZXlQYXRoLFxuICAgICAgbWVzc2FnZUlkOiB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZSxcbiAgICAgIG1lc3NhZ2VWYWx1ZXM6IHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlVmFsdWVzLFxuICAgIH0pO1xuICB9XG4gIHJldHVybiB2YWxpZGF0aW9uU3RhdGUudmFsaWQ7XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlID0gKGdyaWQsIHJvd0luZGV4LCBrZXlQYXRoLCB2YWx1ZSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfQ0hBTkdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIHJvd0luZGV4LFxuICAgIGtleVBhdGgsXG4gICAgdmFsdWUsXG4gIH0pO1xufTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbmV4cG9ydCBjb25zdCBjcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZSA9IChncmlkLCByb3dJbmRleCwga2V5UGF0aCwgdmFsdWUsIHZhbGlkYXRvcnMgPSBbXSkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgbGV0IHZhbGlkYXRpb25TdGF0ZSA9IHsgdmFsaWQ6IHRydWUgfTtcbiAgdmFsaWRhdG9ycy5mb3JFYWNoKCh2YWxpZGF0b3IpID0+IHtcbiAgICBpZiAodmFsaWRhdGlvblN0YXRlLnZhbGlkKSB7XG4gICAgICBpZiAodmFsaWRhdG9yLnVuaXF1ZSkge1xuICAgICAgICBpZiAodmFsdWUgIT09ICcnIHx8IHZhbHVlICE9PSBudWxsIHx8IHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjb25zdCBmaW5kaW5nID0gZ2V0U3RhdGUoKVxuICAgICAgICAgICAgLmRhdGFncmlkXG4gICAgICAgICAgICAuZ2V0SW4oW2dyaWQuaWQsICdhbGxEYXRhJ10pXG4gICAgICAgICAgICAuZmluZChpdGVtID0+IGl0ZW0uZ2V0SW4oa2V5UGF0aCkgPT09IHZhbHVlKTtcbiAgICAgICAgICBpZiAoZmluZGluZykge1xuICAgICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0ge1xuICAgICAgICAgICAgICB2YWxpZDogZmFsc2UsXG4gICAgICAgICAgICAgIG1lc3NhZ2U6ICdWYWxpZGF0aW9uLlVuaXF1ZScsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBmaW5kMiA9IGdldFN0YXRlKClcbiAgICAgICAgICAgICAgLmRhdGFncmlkXG4gICAgICAgICAgICAgIC5nZXRJbihbZ3JpZC5pZCwgJ2NyZWF0ZURhdGEnXSlcbiAgICAgICAgICAgICAgLmZpbmQoKGl0ZW0sIGkpID0+IGkgIT09IHJvd0luZGV4ICYmIGl0ZW0uZ2V0SW4oa2V5UGF0aCkgPT09IHZhbHVlKTtcbiAgICAgICAgICAgIGlmIChmaW5kMikge1xuICAgICAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgdmFsaWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdWYWxpZGF0aW9uLlVuaXF1ZScsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHZhbGlkYXRvci52YWxpZGF0ZVdpdGhSb3dEYXRhKSB7XG4gICAgICAgIGNvbnN0IHJvd0RhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnY3JlYXRlRGF0YScsIHJvd0luZGV4XSk7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHZhbGlkYXRvci5wYXJhbXMgPyBPYmplY3QudmFsdWVzKHZhbGlkYXRvci5wYXJhbXMpIDogW107XG4gICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZVdpdGhSb3dEYXRhKHZhbHVlLCByb3dEYXRhLCAuLi5wYXJhbXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gdmFsaWRhdG9yLnBhcmFtcyA/IE9iamVjdC52YWx1ZXModmFsaWRhdG9yLnBhcmFtcykgOiBbXTtcbiAgICAgICAgdmFsaWRhdGlvblN0YXRlID0gdmFsaWRhdG9yLnZhbGlkYXRlKHZhbHVlLCAuLi5wYXJhbXMpO1xuICAgICAgICBpZiAodmFsaWRhdG9yLnBhcmFtcykge1xuICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlVmFsdWVzID0gdmFsaWRhdG9yLnBhcmFtcztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIGlmICh2YWxpZGF0aW9uU3RhdGUudmFsaWQpIHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9ISURFX01FU1NBR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIG1lc3NhZ2VUeXBlOiAnZXJyb3InLFxuICAgICAgcm93SW5kZXgsXG4gICAgICBrZXlQYXRoLFxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgbWVzc2FnZVR5cGU6ICdlcnJvcicsXG4gICAgICByb3dJbmRleCxcbiAgICAgIGtleVBhdGgsXG4gICAgICBtZXNzYWdlSWQ6IHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlLFxuICAgICAgbWVzc2FnZVZhbHVlczogdmFsaWRhdGlvblN0YXRlLm1lc3NhZ2VWYWx1ZXMsXG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHZhbGlkYXRpb25TdGF0ZS52YWxpZDtcbn07XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG5leHBvcnQgY29uc3QgY2VsbFNob3dNZXNzYWdlID0gKGdyaWQsIG1lc3NhZ2VUeXBlLCBkYXRhSWQsIGtleVBhdGgsIG1lc3NhZ2VJZCwgbWVzc2FnZVZhbHVlcykgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0UsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgbWVzc2FnZVR5cGUsXG4gICAgZGF0YUlkLFxuICAgIGtleVBhdGgsXG4gICAgbWVzc2FnZUlkLFxuICAgIG1lc3NhZ2VWYWx1ZXMsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGNlbGxTaG93TWVzc2FnZXMgPSAoZ3JpZCwgbWVzc2FnZXMpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFUyxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBtZXNzYWdlcyxcbiAgfSk7XG59O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuZXhwb3J0IGNvbnN0IGNlbGxIaWRlTWVzc2FnZSA9IChncmlkLCBtZXNzYWdlVHlwZSA9IG51bGwsIGRhdGFJZCA9IG51bGwsIGtleVBhdGggPSBudWxsKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBtZXNzYWdlVHlwZSxcbiAgICBkYXRhSWQsXG4gICAga2V5UGF0aCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQ2VsbFNob3dNZXNzYWdlID0gKFxuICBncmlkLFxuICBtZXNzYWdlVHlwZSxcbiAgcm93SW5kZXgsXG4gIGtleVBhdGgsXG4gIG1lc3NhZ2VJZCxcbiAgbWVzc2FnZVZhbHVlcyxcbikgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfU0hPV19NRVNTQUdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIG1lc3NhZ2VUeXBlLFxuICAgIHJvd0luZGV4LFxuICAgIGtleVBhdGgsXG4gICAgbWVzc2FnZUlkLFxuICAgIG1lc3NhZ2VWYWx1ZXMsXG4gIH0pO1xufTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbmV4cG9ydCBjb25zdCBjcmVhdGVDZWxsSGlkZU1lc3NhZ2UgPSAoZ3JpZCwgbWVzc2FnZVR5cGUgPSBudWxsLCByb3dJbmRleCA9IG51bGwsIGtleVBhdGggPSBudWxsKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9ISURFX01FU1NBR0UsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgbWVzc2FnZVR5cGUsXG4gICAgcm93SW5kZXgsXG4gICAga2V5UGF0aCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgY2VsbFNlbGVjdGlvbkNoYW5nZSA9IChncmlkLCBzZWxlY3RlZENlbGwgPSBudWxsKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICBzZWxlY3RlZENlbGwsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TRUxFQ1RJT05fQ0hBTkdFLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBpdGVtU2VsZWN0aW9uQ2hhbmdlID0gKFxuICBncmlkLFxuICByb3dJbmRleCxcbiAgY3RybFByZXNzZWQgPSBmYWxzZSxcbiAgc2hpZnRQcmVzc2VkID0gZmFsc2UsXG4pID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9JVEVNX1NFTEVDVElPTl9DSEFOR0UsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgcm93SW5kZXgsXG4gICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgICBjdHJsUHJlc3NlZCxcbiAgICBzaGlmdFByZXNzZWQsXG4gIH0pO1xuICBVdGlscy5zYXZlU2VsZWN0ZWRJdGVtcyhncmlkLCBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnc2VsZWN0ZWRJdGVtcyddKSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0QWxsSXRlbXNDaGFuZ2UgPSBncmlkID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRUxFQ1RfQUxMX0lURU1TX0NIQU5HRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBpZEtleVBhdGg6IGdyaWQuaWRLZXlQYXRoLFxuICB9KTtcbiAgVXRpbHMuc2F2ZVNlbGVjdGVkSXRlbXMoZ3JpZCwgZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ3NlbGVjdGVkSXRlbXMnXSkpO1xufTtcblxuZXhwb3J0IGNvbnN0IGNsZWFyU2VsZWN0ZWRJdGVtcyA9IGdyaWQgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NMRUFSX1NFTEVDVEVEX0lURU1TLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbiAgVXRpbHMuc2F2ZVNlbGVjdGVkSXRlbXMoZ3JpZCwgZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ3NlbGVjdGVkSXRlbXMnXSkpO1xufTtcblxuZXhwb3J0IGNvbnN0IHRvZ2dsZUZpbHRlcmluZyA9IGdyaWQgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgY29uc3QgaXNGaWx0ZXJpbmcgPSAhZ2V0U3RhdGUoKVxuICAgIC5kYXRhZ3JpZFxuICAgIC5nZXRJbihbZ3JpZC5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2lzRmlsdGVyaW5nJ10sIGZhbHNlKTtcbiAgVXRpbHMuc2F2ZUlzRmlsdGVyaW5nKGdyaWQsIGlzRmlsdGVyaW5nKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1RPR0dMRV9GSUxURVJJTkcsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgaXNGaWx0ZXJpbmcsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHZhbGlkYXRlRWRpdGVkUm93cyA9IChncmlkLCBjb2x1bW5zKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBjb25zdCBncmlkRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0KGdyaWQuaWQpO1xuICBjb25zdCBlZGl0RGF0YSA9IGdyaWREYXRhLmdldCgnZWRpdERhdGEnLCBNYXAoKSk7XG4gIGxldCBhbGxHb29kID0gdHJ1ZTtcbiAgZWRpdERhdGEuZm9yRWFjaCgoZWRpdERhdGFSb3csIGRhdGFJZCkgPT4ge1xuICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICBsZXQgdmFsdWUgPSBlZGl0RGF0YVJvdy5nZXRJbihjb2wudmFsdWVLZXlQYXRoKTtcbiAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlID0gZ3JpZERhdGFcbiAgICAgICAgICAuZ2V0KCdhbGxEYXRhJylcbiAgICAgICAgICAuZmluZChkYXRhID0+IGRhdGEuZ2V0SW4oZ3JpZC5pZEtleVBhdGgpID09PSBkYXRhSWQpXG4gICAgICAgICAgLmdldEluKGNvbC52YWx1ZUtleVBhdGgpO1xuICAgICAgfVxuICAgICAgY29uc3QgaXNWYWxpZCA9IGVkaXRDZWxsVmFsdWVWYWxpZGF0ZShcbiAgICAgICAgZ3JpZCxcbiAgICAgICAgZGF0YUlkLFxuICAgICAgICBjb2wudmFsdWVLZXlQYXRoLFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgY29sLnZhbGlkYXRvcnMsXG4gICAgICApKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gICAgICBpZiAoYWxsR29vZCAmJiAhaXNWYWxpZCkge1xuICAgICAgICBhbGxHb29kID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gYWxsR29vZDtcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVFbXB0eUNyZWF0ZWRSb3dzID0gKGdyaWQsIGNvbHVtbnMpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGNvbnN0IGNyZWF0ZURhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnY3JlYXRlRGF0YSddLCBNYXAoKSk7XG4gIGNvbnN0IGluZGV4ZXMgPSBbXTtcbiAgY3JlYXRlRGF0YS5mb3JFYWNoKChjcmVhdGVEYXRhUm93LCByb3dJbmRleCkgPT4ge1xuICAgIGxldCBpc0VtcHR5ID0gdHJ1ZTtcbiAgICBjb2x1bW5zLmZvckVhY2goKGNvbCkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSBjcmVhdGVEYXRhUm93LmdldEluKGNvbC52YWx1ZUtleVBhdGgpO1xuICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09ICcnICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIGlzRW1wdHkgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoaXNFbXB0eSkge1xuICAgICAgaW5kZXhlcy5wdXNoKHJvd0luZGV4KTtcbiAgICB9XG4gIH0pO1xuICBpZiAoaW5kZXhlcy5sZW5ndGggPiAwKSB7XG4gICAgcmVtb3ZlTmV3SXRlbXMoZ3JpZCwgaW5kZXhlcykoZGlzcGF0Y2gpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgdmFsaWRhdGVDcmVhdGVkUm93cyA9IChncmlkLCBjb2x1bW5zKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICByZW1vdmVFbXB0eUNyZWF0ZWRSb3dzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gIGNvbnN0IGNyZWF0ZURhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnY3JlYXRlRGF0YSddLCBNYXAoKSk7XG4gIGxldCBhbGxHb29kID0gdHJ1ZTtcbiAgY3JlYXRlRGF0YS5mb3JFYWNoKChjcmVhdGVEYXRhUm93LCByb3dJbmRleCkgPT4ge1xuICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGNyZWF0ZURhdGFSb3cuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG4gICAgICBjb25zdCBpc1ZhbGlkID0gY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUoXG4gICAgICAgIGdyaWQsXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICBjb2wudmFsdWVLZXlQYXRoLFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgY29sLnZhbGlkYXRvcnMsXG4gICAgICApKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gICAgICBpZiAoYWxsR29vZCAmJiAhaXNWYWxpZCkge1xuICAgICAgICBhbGxHb29kID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gYWxsR29vZDtcbn07XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVFeGlzdGluZ0NlbGxWYWx1ZSA9IChncmlkLCBkYXRhSWQsIGtleVBhdGgsIHZhbHVlKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9VUERBVEVfRVhJU1RJTkdfQ0VMTF9WQUxVRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBkYXRhSWQsXG4gICAga2V5UGF0aCxcbiAgICB2YWx1ZSxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0RWRpdERhdGEgPSAoZ3JpZCwgZGF0YSwgY2VsbE1lc3NhZ2VzID0gTWFwKCkpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIGRhdGEsXG4gICAgY2VsbE1lc3NhZ2VzLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NFVF9FRElUX0RBVEEsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IG9wZW5Db2x1bW5TZXR0aW5nc01vZGFsID0gZ3JpZCA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfT1BFTixcbiAgICBpZDogZ3JpZC5pZCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsID0gZ3JpZCA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfQ0xPU0UsXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNhdmVDb2x1bW5TZXR0aW5ncyA9IChncmlkLCBoaWRkZW5Db2x1bW5zLCBjb2x1bW5PcmRlcikgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBVdGlscy5zYXZlQ29sdW1uU2V0dGluZ3MoZ3JpZCwgaGlkZGVuQ29sdW1ucywgY29sdW1uT3JkZXIpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX1NBVkUsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgY29sdW1uT3JkZXIsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldFBhZ2UgPSAoZ3JpZCwgcGFnZSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLnNhdmVQYWdlKGdyaWQsIHBhZ2UpO1xuICBkaXNwYXRjaCh7XG4gICAgcGFnZSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfUEFHRSxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0Um93c09uUGFnZSA9IChncmlkLCByb3dzT25QYWdlKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuc2F2ZVJvd3NPblBhZ2UoZ3JpZCwgcm93c09uUGFnZSk7XG4gIGRpc3BhdGNoKHtcbiAgICByb3dzT25QYWdlLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NFVF9ST1dTX09OX1BBR0UsXG4gIH0pO1xufTtcbiJdfQ==