"use strict";

exports.__esModule = true;
exports.setRowsOnPage = exports.setPage = exports.saveColumnSettings = exports.closeColumnSettingsModal = exports.openColumnSettingsModal = exports.setEditData = exports.updateExistingCellValue = exports.validateCreatedRows = exports.removeEmptyCreatedRows = exports.validateEditedRows = exports.toggleFiltering = exports.clearSelectedItems = exports.selectAllItemsChange = exports.itemSelectionChange = exports.cellSelectionChange = exports.createCellHideMessage = exports.createCellShowMessage = exports.cellHideMessage = exports.cellShowMessages = exports.cellShowMessage = exports.createCellValueValidate = exports.createCellValueChange = exports.editCellValueValidate = exports.editCellValueChange = exports.removeFail = exports.removeSuccess = exports.remove = exports.removeNewItems = exports.removeNewItem = exports.removeItem = exports.addNewItem = exports.create = exports.saveFail = exports.savePartialSuccess = exports.saveSuccess = exports.save = exports.cancel = exports.edit = exports.resizeColumn = exports.extendData = exports.setFocusTo = exports.setData = exports.sortChange = exports.applySort = exports.filterCellValueChange = exports.setAndApplyFilters = exports.applyFilters = exports.setReady = exports.setBusy = exports.forceRefresh = exports.invalidate = exports.TYPES = void 0;

var _immutable = _interopRequireWildcard(require("immutable"));

var _datagrid = _interopRequireDefault(require("./datagrid.utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var TYPES = {
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
exports.TYPES = TYPES;

var invalidate = function invalidate(grid) {
  return function (dispatch) {
    _datagrid["default"].checkGridParam(grid);

    dispatch({
      type: TYPES.PLATFORM_DATAGRID_INVALIDATE,
      id: grid.id
    });
  };
};

exports.invalidate = invalidate;

var forceRefresh = function forceRefresh() {
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
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_FORCE_REFRESH
    });
  };
};

exports.forceRefresh = forceRefresh;

var setBusy = function setBusy(grid) {
  return function (dispatch) {
    _datagrid["default"].checkGridParam(grid);

    dispatch({
      type: TYPES.PLATFORM_DATAGRID_BUSY,
      id: grid.id
    });
  };
};

exports.setBusy = setBusy;

var setReady = function setReady(grid) {
  return function (dispatch) {
    _datagrid["default"].checkGridParam(grid);

    dispatch({
      type: TYPES.PLATFORM_DATAGRID_READY,
      id: grid.id
    });
  };
};

exports.setReady = setReady;

var applyFilters = function applyFilters(grid, columns) {
  return function (dispatch, getState) {
    _datagrid["default"].checkGridParam(grid);

    if (!columns || !columns.forEach) return false;
    var gridData = getState().datagrid.get(grid.id);
    if (!gridData) return false;
    var filterData = gridData.getIn(['config', 'filteringData', 'filterData'], (0, _immutable.Map)());
    var allData = gridData.get('allData');
    setBusy(grid)(dispatch);
    var data;

    if (grid.pagination) {
      return true;
    }

    if (filterData.isEmpty()) {
      data = allData;
    } else {
      var dateFormat = _datagrid["default"].getDateFormat(grid, getState().user);

      data = allData.filter(function (row) {
        var hits = 0;
        filterData.forEach(function (filterValue, filterColumn) {
          columns.forEach(function (column) {
            if (_datagrid["default"].getColumnKey(column) === filterColumn) {
              var value = row.getIn(column.valueKeyPath);

              if (value || value === 0 || value === false) {
                var filterMatcher = _datagrid["default"].getFilterMatcher(column, dateFormat);

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

exports.applyFilters = applyFilters;

var setAndApplyFilters = function setAndApplyFilters(grid, columns, data) {
  return function (dispatch) {
    var filteringData = _datagrid["default"].normalizeFilteringData(data);

    _datagrid["default"].saveFilterData(grid, filteringData.get('filterData'));

    dispatch({
      type: TYPES.PLATFORM_DATAGRID_SET_FILTERS,
      id: grid.id,
      filteringData: filteringData
    });
    dispatch(applyFilters(grid, columns));
    return true;
  };
};

exports.setAndApplyFilters = setAndApplyFilters;

var filterCellValueChange = function filterCellValueChange(grid, columns, column, value) {
  return function (dispatch, getState) {
    _datagrid["default"].checkGridParam(grid);

    var origFilterData = getState().datagrid.getIn([grid.id, 'config', 'filteringData', 'filterData'], (0, _immutable.Map)());

    var columnKey = _datagrid["default"].getColumnKey(column);

    var valueEmptyChecker = _datagrid["default"].getValueEmptyChecker(column);

    var filterData;

    if (valueEmptyChecker(value)) {
      filterData = origFilterData["delete"](columnKey);
    } else {
      filterData = origFilterData.set(columnKey, value);
    }

    _datagrid["default"].saveFilterData(grid, filterData);

    dispatch({
      type: TYPES.PLATFORM_DATAGRID_FILTER_DATA_CHANGE,
      id: grid.id,
      filterData: filterData
    });
    applyFilters(grid, columns)(dispatch, getState);
  };
};

exports.filterCellValueChange = filterCellValueChange;

var applySort = function applySort(grid, columns) {
  return function (dispatch, getState) {
    _datagrid["default"].checkGridParam(grid);

    if (!columns || !columns.forEach) return false;
    var gridData = getState().datagrid.get(grid.id);
    if (!gridData) return false;
    var sortData = gridData.getIn(['config', 'sortingData']);
    if (!sortData) return false;
    var sortColumn = sortData.get('sortColumn');
    if (!sortColumn) return false;
    var sortOrder = sortData.get('sortOrder', 'asc');
    var column;
    columns.forEach(function (col) {
      if (_datagrid["default"].getColumnKey(col) === sortColumn) {
        column = col;
      }
    });
    if (!column) return false;

    if (grid.pagination) {
      return true;
    }

    setBusy(grid)(dispatch);
    var origAllData = gridData.get('allData');

    var comparator = _datagrid["default"].getSortComparator(column);

    var valueGetter = _datagrid["default"].getSortValueGetter(column);

    var valueEmptyChecker = _datagrid["default"].getValueEmptyChecker(column);

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
    var data; // Sort also filtered data separately

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

exports.applySort = applySort;

var sortChange = function sortChange(grid, columns, column, newSort) {
  return function (dispatch, getState) {
    _datagrid["default"].checkGridParam(grid);

    var sortOrder = newSort || 'asc';

    var sortColumn = _datagrid["default"].getColumnKey(column);

    _datagrid["default"].saveSortData(grid, {
      sortColumn: sortColumn,
      sortOrder: sortOrder
    });

    dispatch({
      type: TYPES.PLATFORM_DATAGRID_SORT_CHANGE,
      id: grid.id,
      sortColumn: sortColumn,
      sortOrder: sortOrder
    });
    applySort(grid, columns)(dispatch, getState);
  };
};

exports.sortChange = sortChange;

var setData = function setData(grid, columns, data) {
  return function (dispatch, getState) {
    _datagrid["default"].checkGridParam(grid);

    _datagrid["default"].checkColumnsParam(columns);

    var configData = _datagrid["default"].loadGridConfig(grid, columns);

    var immutableData = _immutable["default"].Iterable.isIterable(data) ? data : _immutable["default"].fromJS(data);

    var selectedItems = _datagrid["default"].loadSelectedItems(grid).filter(function (item) {
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


exports.setData = setData;

var setFocusTo = function setFocusTo(grid, focusTo, focusToLastRow) {
  if (focusToLastRow === void 0) {
    focusToLastRow = false;
  }

  return function (dispatch) {
    _datagrid["default"].checkGridParam(grid);

    dispatch({
      type: TYPES.PLATFORM_DATAGRID_SET_FOCUS_TO,
      focusTo: focusTo,
      focusToLastRow: focusToLastRow,
      id: grid.id
    });
  };
};

exports.setFocusTo = setFocusTo;

var extendData = function extendData(grid, columns, data, prepend) {
  if (prepend === void 0) {
    prepend = false;
  }

  return function (dispatch, getState) {
    _datagrid["default"].checkGridParam(grid);

    var immutableData = _immutable["default"].Iterable.isIterable(data) ? data : _immutable["default"].fromJS(data);
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

exports.extendData = extendData;

var resizeColumn = function resizeColumn(grid, columnKey, width) {
  return function (dispatch, getState) {
    _datagrid["default"].checkGridParam(grid);

    var columnWidths = getState().datagrid.getIn([grid.id, 'config', 'columnWidths'], (0, _immutable.Map)()).set(columnKey, width);

    _datagrid["default"].saveColumnWidths(grid, columnWidths);

    dispatch({
      type: TYPES.PLATFORM_DATAGRID_RESIZE_COLUMN,
      id: grid.id,
      columnWidths: columnWidths
    });
  };
};

exports.resizeColumn = resizeColumn;

var edit = function edit(grid) {
  return function (dispatch) {
    _datagrid["default"].checkGridParam(grid);

    dispatch({
      type: TYPES.PLATFORM_DATAGRID_EDIT,
      id: grid.id
    });
  };
};

exports.edit = edit;

var cancel = function cancel(grid) {
  return function (dispatch) {
    _datagrid["default"].checkGridParam(grid);

    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CANCEL,
      id: grid.id
    });
  };
};

exports.cancel = cancel;

var save = function save(grid, cb) {
  if (cb === void 0) {
    cb = function cb() {};
  }

  return function (dispatch) {
    _datagrid["default"].checkGridParam(grid);

    dispatch({
      type: TYPES.PLATFORM_DATAGRID_SAVE,
      id: grid.id
    });
    cb();
  };
};

exports.save = save;

var saveSuccess = function saveSuccess(grid, columns, savedItems) {
  return function (dispatch, getState) {
    _datagrid["default"].checkGridParam(grid);

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

exports.saveSuccess = saveSuccess;

var savePartialSuccess = function savePartialSuccess(grid, columns, savedItems) {
  return function (dispatch, getState) {
    _datagrid["default"].checkGridParam(grid);

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

exports.savePartialSuccess = savePartialSuccess;

var saveFail = function saveFail(grid) {
  return function (dispatch) {
    _datagrid["default"].checkGridParam(grid);

    dispatch({
      type: TYPES.PLATFORM_DATAGRID_SAVE_FAIL,
      id: grid.id
    });
  };
};

exports.saveFail = saveFail;

var create = function create(grid, columnDefaultValues) {
  return function (dispatch) {
    _datagrid["default"].checkGridParam(grid);

    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CREATE,
      id: grid.id,
      columnDefaultValues: columnDefaultValues
    });
  };
};

exports.create = create;

var addNewItem = function addNewItem(grid, columnDefaultValues) {
  return function (dispatch) {
    _datagrid["default"].checkGridParam(grid);

    dispatch({
      type: TYPES.PLATFORM_DATAGRID_ADD_NEW_ITEM,
      id: grid.id,
      columnDefaultValues: columnDefaultValues
    });
  };
};

exports.addNewItem = addNewItem;

var removeItem = function removeItem(grid, rowId) {
  return function (dispatch) {
    _datagrid["default"].checkGridParam(grid);

    dispatch({
      type: TYPES.PLATFORM_DATAGRID_REMOVE_ITEM,
      id: grid.id,
      idKeyPath: grid.idKeyPath,
      rowId: rowId
    });
  };
};

exports.removeItem = removeItem;

var removeNewItem = function removeNewItem(grid, index) {
  return function (dispatch) {
    _datagrid["default"].checkGridParam(grid);

    dispatch({
      type: TYPES.PLATFORM_DATAGRID_REMOVE_NEW_ITEM,
      id: grid.id,
      index: index
    });
  };
};

exports.removeNewItem = removeNewItem;

var removeNewItems = function removeNewItems(grid, indexes) {
  return function (dispatch) {
    _datagrid["default"].checkGridParam(grid);

    dispatch({
      type: TYPES.PLATFORM_DATAGRID_REMOVE_NEW_ITEMS,
      id: grid.id,
      indexes: indexes
    });
  };
};

exports.removeNewItems = removeNewItems;

var remove = function remove(grid, cb) {
  if (cb === void 0) {
    cb = function cb() {};
  }

  return function (dispatch) {
    _datagrid["default"].checkGridParam(grid);

    dispatch({
      type: TYPES.PLATFORM_DATAGRID_REMOVE,
      id: grid.id
    });
    cb();
  };
};

exports.remove = remove;

var removeSuccess = function removeSuccess(grid, removedIds) {
  return function (dispatch) {
    _datagrid["default"].checkGridParam(grid);

    dispatch({
      type: TYPES.PLATFORM_DATAGRID_REMOVE_SUCCESS,
      id: grid.id,
      idKeyPath: grid.idKeyPath,
      removedIds: removedIds
    });
  };
};

exports.removeSuccess = removeSuccess;

var removeFail = function removeFail(grid) {
  return function (dispatch) {
    _datagrid["default"].checkGridParam(grid);

    dispatch({
      type: TYPES.PLATFORM_DATAGRID_REMOVE_FAIL,
      id: grid.id
    });
  };
};

exports.removeFail = removeFail;

var editCellValueChange = function editCellValueChange(grid, dataId, keyPath, value) {
  return function (dispatch) {
    _datagrid["default"].checkGridParam(grid);

    dispatch({
      type: TYPES.PLATFORM_DATAGRID_EDIT_CELL_VALUE_CHANGE,
      id: grid.id,
      dataId: dataId,
      keyPath: keyPath,
      value: value
    });
  };
};

exports.editCellValueChange = editCellValueChange;

var editCellValueValidate = function editCellValueValidate(grid, dataId, keyPath, value, validators) {
  if (validators === void 0) {
    validators = [];
  }

  return function (dispatch, getState) {
    _datagrid["default"].checkGridParam(grid);

    var validationState = {
      valid: true
    };
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
            } // determine uniqueness


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

exports.editCellValueValidate = editCellValueValidate;

var createCellValueChange = function createCellValueChange(grid, rowIndex, keyPath, value) {
  return function (dispatch) {
    _datagrid["default"].checkGridParam(grid);

    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CREATE_CELL_VALUE_CHANGE,
      id: grid.id,
      rowIndex: rowIndex,
      keyPath: keyPath,
      value: value
    });
  };
}; // eslint-disable-next-line max-len


exports.createCellValueChange = createCellValueChange;

var createCellValueValidate = function createCellValueValidate(grid, rowIndex, keyPath, value, validators) {
  if (validators === void 0) {
    validators = [];
  }

  return function (dispatch, getState) {
    _datagrid["default"].checkGridParam(grid);

    var validationState = {
      valid: true
    };
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
}; // eslint-disable-next-line max-len


exports.createCellValueValidate = createCellValueValidate;

var cellShowMessage = function cellShowMessage(grid, messageType, dataId, keyPath, messageId, messageValues) {
  return function (dispatch) {
    _datagrid["default"].checkGridParam(grid);

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

exports.cellShowMessage = cellShowMessage;

var cellShowMessages = function cellShowMessages(grid, messages) {
  return function (dispatch) {
    _datagrid["default"].checkGridParam(grid);

    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CELL_SHOW_MESSAGES,
      id: grid.id,
      messages: messages
    });
  };
}; // eslint-disable-next-line max-len


exports.cellShowMessages = cellShowMessages;

var cellHideMessage = function cellHideMessage(grid, messageType, dataId, keyPath) {
  if (messageType === void 0) {
    messageType = null;
  }

  if (dataId === void 0) {
    dataId = null;
  }

  if (keyPath === void 0) {
    keyPath = null;
  }

  return function (dispatch) {
    _datagrid["default"].checkGridParam(grid);

    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CELL_HIDE_MESSAGE,
      id: grid.id,
      messageType: messageType,
      dataId: dataId,
      keyPath: keyPath
    });
  };
};

exports.cellHideMessage = cellHideMessage;

var createCellShowMessage = function createCellShowMessage(grid, messageType, rowIndex, keyPath, messageId, messageValues) {
  return function (dispatch) {
    _datagrid["default"].checkGridParam(grid);

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
}; // eslint-disable-next-line max-len


exports.createCellShowMessage = createCellShowMessage;

var createCellHideMessage = function createCellHideMessage(grid, messageType, rowIndex, keyPath) {
  if (messageType === void 0) {
    messageType = null;
  }

  if (rowIndex === void 0) {
    rowIndex = null;
  }

  if (keyPath === void 0) {
    keyPath = null;
  }

  return function (dispatch) {
    _datagrid["default"].checkGridParam(grid);

    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CREATE_CELL_HIDE_MESSAGE,
      id: grid.id,
      messageType: messageType,
      rowIndex: rowIndex,
      keyPath: keyPath
    });
  };
};

exports.createCellHideMessage = createCellHideMessage;

var cellSelectionChange = function cellSelectionChange(grid, selectedCell) {
  if (selectedCell === void 0) {
    selectedCell = null;
  }

  return function (dispatch) {
    _datagrid["default"].checkGridParam(grid);

    dispatch({
      selectedCell: selectedCell,
      id: grid.id,
      type: TYPES.PLATFORM_DATAGRID_CELL_SELECTION_CHANGE
    });
  };
};

exports.cellSelectionChange = cellSelectionChange;

var itemSelectionChange = function itemSelectionChange(grid, rowIndex, ctrlPressed, shiftPressed) {
  if (ctrlPressed === void 0) {
    ctrlPressed = false;
  }

  if (shiftPressed === void 0) {
    shiftPressed = false;
  }

  return function (dispatch, getState) {
    _datagrid["default"].checkGridParam(grid);

    dispatch({
      type: TYPES.PLATFORM_DATAGRID_ITEM_SELECTION_CHANGE,
      id: grid.id,
      rowIndex: rowIndex,
      idKeyPath: grid.idKeyPath,
      ctrlPressed: ctrlPressed,
      shiftPressed: shiftPressed
    });

    _datagrid["default"].saveSelectedItems(grid, getState().datagrid.getIn([grid.id, 'selectedItems']));
  };
};

exports.itemSelectionChange = itemSelectionChange;

var selectAllItemsChange = function selectAllItemsChange(grid) {
  return function (dispatch, getState) {
    _datagrid["default"].checkGridParam(grid);

    dispatch({
      type: TYPES.PLATFORM_DATAGRID_SELECT_ALL_ITEMS_CHANGE,
      id: grid.id,
      idKeyPath: grid.idKeyPath
    });

    _datagrid["default"].saveSelectedItems(grid, getState().datagrid.getIn([grid.id, 'selectedItems']));
  };
};

exports.selectAllItemsChange = selectAllItemsChange;

var clearSelectedItems = function clearSelectedItems(grid) {
  return function (dispatch, getState) {
    _datagrid["default"].checkGridParam(grid);

    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CLEAR_SELECTED_ITEMS,
      id: grid.id
    });

    _datagrid["default"].saveSelectedItems(grid, getState().datagrid.getIn([grid.id, 'selectedItems']));
  };
};

exports.clearSelectedItems = clearSelectedItems;

var toggleFiltering = function toggleFiltering(grid) {
  return function (dispatch, getState) {
    _datagrid["default"].checkGridParam(grid);

    var isFiltering = !getState().datagrid.getIn([grid.id, 'config', 'filteringData', 'isFiltering'], false);

    _datagrid["default"].saveIsFiltering(grid, isFiltering);

    dispatch({
      type: TYPES.PLATFORM_DATAGRID_TOGGLE_FILTERING,
      id: grid.id,
      isFiltering: isFiltering
    });
  };
};

exports.toggleFiltering = toggleFiltering;

var validateEditedRows = function validateEditedRows(grid, columns) {
  return function (dispatch, getState) {
    _datagrid["default"].checkGridParam(grid);

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

exports.validateEditedRows = validateEditedRows;

var removeEmptyCreatedRows = function removeEmptyCreatedRows(grid, columns) {
  return function (dispatch, getState) {
    _datagrid["default"].checkGridParam(grid);

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

exports.removeEmptyCreatedRows = removeEmptyCreatedRows;

var validateCreatedRows = function validateCreatedRows(grid, columns) {
  return function (dispatch, getState) {
    _datagrid["default"].checkGridParam(grid);

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

exports.validateCreatedRows = validateCreatedRows;

var updateExistingCellValue = function updateExistingCellValue(grid, dataId, keyPath, value) {
  return function (dispatch) {
    _datagrid["default"].checkGridParam(grid);

    dispatch({
      type: TYPES.PLATFORM_DATAGRID_UPDATE_EXISTING_CELL_VALUE,
      id: grid.id,
      dataId: dataId,
      keyPath: keyPath,
      value: value
    });
  };
};

exports.updateExistingCellValue = updateExistingCellValue;

var setEditData = function setEditData(grid, data, cellMessages) {
  if (cellMessages === void 0) {
    cellMessages = (0, _immutable.Map)();
  }

  return function (dispatch) {
    _datagrid["default"].checkGridParam(grid);

    dispatch({
      data: data,
      cellMessages: cellMessages,
      id: grid.id,
      type: TYPES.PLATFORM_DATAGRID_SET_EDIT_DATA
    });
  };
};

exports.setEditData = setEditData;

var openColumnSettingsModal = function openColumnSettingsModal(grid) {
  return function (dispatch) {
    _datagrid["default"].checkGridParam(grid);

    dispatch({
      type: TYPES.PLATFORM_DATAGRID_COLUMN_SETTINGS_MODAL_OPEN,
      id: grid.id
    });
  };
};

exports.openColumnSettingsModal = openColumnSettingsModal;

var closeColumnSettingsModal = function closeColumnSettingsModal(grid) {
  return function (dispatch) {
    _datagrid["default"].checkGridParam(grid);

    dispatch({
      type: TYPES.PLATFORM_DATAGRID_COLUMN_SETTINGS_MODAL_CLOSE,
      id: grid.id
    });
  };
};

exports.closeColumnSettingsModal = closeColumnSettingsModal;

var saveColumnSettings = function saveColumnSettings(grid, hiddenColumns, columnOrder) {
  return function (dispatch) {
    _datagrid["default"].checkGridParam(grid);

    _datagrid["default"].saveColumnSettings(grid, hiddenColumns, columnOrder);

    dispatch({
      type: TYPES.PLATFORM_DATAGRID_COLUMN_SETTINGS_SAVE,
      id: grid.id,
      columnOrder: columnOrder
    });
  };
};

exports.saveColumnSettings = saveColumnSettings;

var setPage = function setPage(grid, page) {
  return function (dispatch) {
    _datagrid["default"].savePage(grid, page);

    dispatch({
      page: page,
      id: grid.id,
      type: TYPES.PLATFORM_DATAGRID_SET_PAGE
    });
  };
};

exports.setPage = setPage;

var setRowsOnPage = function setRowsOnPage(grid, rowsOnPage) {
  return function (dispatch) {
    _datagrid["default"].saveRowsOnPage(grid, rowsOnPage);

    dispatch({
      rowsOnPage: rowsOnPage,
      id: grid.id,
      type: TYPES.PLATFORM_DATAGRID_SET_ROWS_ON_PAGE
    });
  };
};

exports.setRowsOnPage = setRowsOnPage;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5hY3Rpb25zLmpzIl0sIm5hbWVzIjpbIlRZUEVTIiwiUExBVEZPUk1fREFUQUdSSURfSU5WQUxJREFURSIsIlBMQVRGT1JNX0RBVEFHUklEX0JVU1kiLCJQTEFURk9STV9EQVRBR1JJRF9SRUFEWSIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9EQVRBIiwiUExBVEZPUk1fREFUQUdSSURfQVBQTFlfU09SVCIsIlBMQVRGT1JNX0RBVEFHUklEX1NPUlRfQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfUkVTSVpFX0NPTFVNTiIsIlBMQVRGT1JNX0RBVEFHUklEX0VESVQiLCJQTEFURk9STV9EQVRBR1JJRF9DQU5DRUwiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFIiwiUExBVEZPUk1fREFUQUdSSURfRVhURU5EX0RBVEEiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFX1NVQ0NFU1MiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFX1BBUlRJQUxfU1VDQ0VTUyIsIlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfRkFJTCIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURSIsIlBMQVRGT1JNX0RBVEFHUklEX0FERF9ORVdfSVRFTSIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9JVEVNIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNUyIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRSIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9TVUNDRVNTIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUwiLCJQTEFURk9STV9EQVRBR1JJRF9FRElUX0NFTExfVkFMVUVfQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0UiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRVMiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX0hJREVfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX0NIQU5HRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX1ZBTElEQVRFIiwiUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TRUxFQ1RJT05fQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9DTEVBUl9TRUxFQ1RFRF9JVEVNUyIsIlBMQVRGT1JNX0RBVEFHUklEX1RPR0dMRV9GSUxURVJJTkciLCJQTEFURk9STV9EQVRBR1JJRF9GSUxURVJfREFUQV9DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9GSUxURVJTIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX0ZJTFRFUlMiLCJQTEFURk9STV9EQVRBR1JJRF9VUERBVEVfRVhJU1RJTkdfQ0VMTF9WQUxVRSIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9FRElUX0RBVEEiLCJQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfT1BFTiIsIlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFIiwiUExBVEZPUk1fREFUQUdSSURfRk9SQ0VfUkVGUkVTSCIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9GT0NVU19UTyIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9QQUdFIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX1JPV1NfT05fUEFHRSIsImludmFsaWRhdGUiLCJncmlkIiwiZGlzcGF0Y2giLCJVdGlscyIsImNoZWNrR3JpZFBhcmFtIiwidHlwZSIsImlkIiwiZm9yY2VSZWZyZXNoIiwic2V0VGltZW91dCIsImRvY3VtZW50IiwiY3JlYXRlRXZlbnQiLCJldnQiLCJpbml0RXZlbnQiLCJ3aW5kb3ciLCJkaXNwYXRjaEV2ZW50Iiwic2V0QnVzeSIsInNldFJlYWR5IiwiYXBwbHlGaWx0ZXJzIiwiY29sdW1ucyIsImdldFN0YXRlIiwiZm9yRWFjaCIsImdyaWREYXRhIiwiZGF0YWdyaWQiLCJnZXQiLCJmaWx0ZXJEYXRhIiwiZ2V0SW4iLCJhbGxEYXRhIiwiZGF0YSIsInBhZ2luYXRpb24iLCJpc0VtcHR5IiwiZGF0ZUZvcm1hdCIsImdldERhdGVGb3JtYXQiLCJ1c2VyIiwiZmlsdGVyIiwicm93IiwiaGl0cyIsImZpbHRlclZhbHVlIiwiZmlsdGVyQ29sdW1uIiwiY29sdW1uIiwiZ2V0Q29sdW1uS2V5IiwidmFsdWUiLCJ2YWx1ZUtleVBhdGgiLCJmaWx0ZXJNYXRjaGVyIiwiZ2V0RmlsdGVyTWF0Y2hlciIsInNpemUiLCJzZXRBbmRBcHBseUZpbHRlcnMiLCJmaWx0ZXJpbmdEYXRhIiwibm9ybWFsaXplRmlsdGVyaW5nRGF0YSIsInNhdmVGaWx0ZXJEYXRhIiwiZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlIiwib3JpZ0ZpbHRlckRhdGEiLCJjb2x1bW5LZXkiLCJ2YWx1ZUVtcHR5Q2hlY2tlciIsImdldFZhbHVlRW1wdHlDaGVja2VyIiwic2V0IiwiYXBwbHlTb3J0Iiwic29ydERhdGEiLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwiY29sIiwib3JpZ0FsbERhdGEiLCJjb21wYXJhdG9yIiwiZ2V0U29ydENvbXBhcmF0b3IiLCJ2YWx1ZUdldHRlciIsImdldFNvcnRWYWx1ZUdldHRlciIsInNvcnQiLCJhIiwiYiIsInZhbEEiLCJ2YWxCIiwic29ydENoYW5nZSIsIm5ld1NvcnQiLCJzYXZlU29ydERhdGEiLCJzZXREYXRhIiwiY2hlY2tDb2x1bW5zUGFyYW0iLCJjb25maWdEYXRhIiwibG9hZEdyaWRDb25maWciLCJpbW11dGFibGVEYXRhIiwiSW1tdXRhYmxlIiwiSXRlcmFibGUiLCJpc0l0ZXJhYmxlIiwiZnJvbUpTIiwic2VsZWN0ZWRJdGVtcyIsImxvYWRTZWxlY3RlZEl0ZW1zIiwiaXRlbSIsImZpbmQiLCJkYXRhSXRlbSIsImlkS2V5UGF0aCIsImNvbmZpZyIsInNldEZvY3VzVG8iLCJmb2N1c1RvIiwiZm9jdXNUb0xhc3RSb3ciLCJleHRlbmREYXRhIiwicHJlcGVuZCIsInJlc2l6ZUNvbHVtbiIsIndpZHRoIiwiY29sdW1uV2lkdGhzIiwic2F2ZUNvbHVtbldpZHRocyIsImVkaXQiLCJjYW5jZWwiLCJzYXZlIiwiY2IiLCJzYXZlU3VjY2VzcyIsInNhdmVkSXRlbXMiLCJzYXZlUGFydGlhbFN1Y2Nlc3MiLCJzYXZlRmFpbCIsImNyZWF0ZSIsImNvbHVtbkRlZmF1bHRWYWx1ZXMiLCJhZGROZXdJdGVtIiwicmVtb3ZlSXRlbSIsInJvd0lkIiwicmVtb3ZlTmV3SXRlbSIsImluZGV4IiwicmVtb3ZlTmV3SXRlbXMiLCJpbmRleGVzIiwicmVtb3ZlIiwicmVtb3ZlU3VjY2VzcyIsInJlbW92ZWRJZHMiLCJyZW1vdmVGYWlsIiwiZWRpdENlbGxWYWx1ZUNoYW5nZSIsImRhdGFJZCIsImtleVBhdGgiLCJlZGl0Q2VsbFZhbHVlVmFsaWRhdGUiLCJ2YWxpZGF0b3JzIiwidmFsaWRhdGlvblN0YXRlIiwidmFsaWQiLCJ2YWxpZGF0b3IiLCJ1bmlxdWUiLCJ1bmRlZmluZWQiLCJlZGl0RGF0YSIsImVkaXREYXRhSXRlbSIsImVkaXREYXRhSXRlbUlkIiwiZm91bmRJbmRleCIsImZpbmRJbmRleCIsImQiLCJtZXJnZURlZXBJbiIsImZpbmRpbmciLCJsZW5ndGgiLCJtZXNzYWdlIiwidmFsaWRhdGVXaXRoUm93RGF0YSIsInJvd0RhdGEiLCJtZXJnZURlZXAiLCJwYXJhbXMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJ2YWxpZGF0ZSIsIm1lc3NhZ2VWYWx1ZXMiLCJtZXNzYWdlVHlwZSIsIm1lc3NhZ2VJZCIsImNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSIsInJvd0luZGV4IiwiY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUiLCJmaW5kMiIsImkiLCJjZWxsU2hvd01lc3NhZ2UiLCJjZWxsU2hvd01lc3NhZ2VzIiwibWVzc2FnZXMiLCJjZWxsSGlkZU1lc3NhZ2UiLCJjcmVhdGVDZWxsU2hvd01lc3NhZ2UiLCJjcmVhdGVDZWxsSGlkZU1lc3NhZ2UiLCJjZWxsU2VsZWN0aW9uQ2hhbmdlIiwic2VsZWN0ZWRDZWxsIiwiaXRlbVNlbGVjdGlvbkNoYW5nZSIsImN0cmxQcmVzc2VkIiwic2hpZnRQcmVzc2VkIiwic2F2ZVNlbGVjdGVkSXRlbXMiLCJzZWxlY3RBbGxJdGVtc0NoYW5nZSIsImNsZWFyU2VsZWN0ZWRJdGVtcyIsInRvZ2dsZUZpbHRlcmluZyIsImlzRmlsdGVyaW5nIiwic2F2ZUlzRmlsdGVyaW5nIiwidmFsaWRhdGVFZGl0ZWRSb3dzIiwiYWxsR29vZCIsImVkaXREYXRhUm93IiwiaXNWYWxpZCIsInJlbW92ZUVtcHR5Q3JlYXRlZFJvd3MiLCJjcmVhdGVEYXRhIiwiY3JlYXRlRGF0YVJvdyIsInB1c2giLCJ2YWxpZGF0ZUNyZWF0ZWRSb3dzIiwidXBkYXRlRXhpc3RpbmdDZWxsVmFsdWUiLCJzZXRFZGl0RGF0YSIsImNlbGxNZXNzYWdlcyIsIm9wZW5Db2x1bW5TZXR0aW5nc01vZGFsIiwiY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsIiwic2F2ZUNvbHVtblNldHRpbmdzIiwiaGlkZGVuQ29sdW1ucyIsImNvbHVtbk9yZGVyIiwic2V0UGFnZSIsInBhZ2UiLCJzYXZlUGFnZSIsInNldFJvd3NPblBhZ2UiLCJyb3dzT25QYWdlIiwic2F2ZVJvd3NPblBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7O0FBRU8sSUFBTUEsS0FBSyxHQUFHO0FBQ25CQyxFQUFBQSw0QkFBNEIsRUFBRSw4QkFEWDtBQUVuQkMsRUFBQUEsc0JBQXNCLEVBQUUsd0JBRkw7QUFHbkJDLEVBQUFBLHVCQUF1QixF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QUEsU0FBc0IsVUFBQzlMLFFBQUQsRUFBYztBQUMvREMseUJBQU04TCxjQUFOLENBQXFCaE0sSUFBckIsRUFBMkIrTCxVQUEzQjs7QUFDQTlMLElBQUFBLFFBQVEsQ0FBQztBQUNQOEwsTUFBQUEsVUFBVSxFQUFWQSxVQURPO0FBRVAxTCxNQUFBQSxFQUFFLEVBQUVMLElBQUksQ0FBQ0ssRUFGRjtBQUdQRCxNQUFBQSxJQUFJLEVBQUVyRCxLQUFLLENBQUMrQztBQUhMLEtBQUQsQ0FBUjtBQUtELEdBUDRCO0FBQUEsQ0FBdEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSW1tdXRhYmxlLCB7IE1hcCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9kYXRhZ3JpZC51dGlscyc7XG5cbmV4cG9ydCBjb25zdCBUWVBFUyA9IHtcbiAgUExBVEZPUk1fREFUQUdSSURfSU5WQUxJREFURTogJ1BMQVRGT1JNX0RBVEFHUklEX0lOVkFMSURBVEUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9CVVNZOiAnUExBVEZPUk1fREFUQUdSSURfQlVTWScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFQURZOiAnUExBVEZPUk1fREFUQUdSSURfUkVBRFknLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRVRfREFUQTogJ1BMQVRGT1JNX0RBVEFHUklEX1NFVF9EQVRBJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQVBQTFlfU09SVDogJ1BMQVRGT1JNX0RBVEFHUklEX0FQUExZX1NPUlQnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TT1JUX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX1NPUlRfQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVTSVpFX0NPTFVNTjogJ1BMQVRGT1JNX0RBVEFHUklEX1JFU0laRV9DT0xVTU4nLFxuICBQTEFURk9STV9EQVRBR1JJRF9FRElUOiAnUExBVEZPUk1fREFUQUdSSURfRURJVCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NBTkNFTDogJ1BMQVRGT1JNX0RBVEFHUklEX0NBTkNFTCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NBVkU6ICdQTEFURk9STV9EQVRBR1JJRF9TQVZFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfRVhURU5EX0RBVEE6ICdQTEFURk9STV9EQVRBR1JJRF9FWFRFTkRfREFUQScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NBVkVfU1VDQ0VTUzogJ1BMQVRGT1JNX0RBVEFHUklEX1NBVkVfU1VDQ0VTUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NBVkVfUEFSVElBTF9TVUNDRVNTOiAnUExBVEZPUk1fREFUQUdSSURfU0FWRV9QQVJUSUFMX1NVQ0NFU1MnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TQVZFX0ZBSUw6ICdQTEFURk9STV9EQVRBR1JJRF9TQVZFX0ZBSUwnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEU6ICdQTEFURk9STV9EQVRBR1JJRF9DUkVBVEUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9BRERfTkVXX0lURU06ICdQTEFURk9STV9EQVRBR1JJRF9BRERfTkVXX0lURU0nLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfSVRFTTogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9JVEVNJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNOiAnUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNUzogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTVMnLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkU6ICdQTEFURk9STV9EQVRBR1JJRF9SRU1PVkUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfU1VDQ0VTUzogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9TVUNDRVNTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUw6ICdQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfRkFJTCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0VESVRfQ0VMTF9WQUxVRV9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9FRElUX0NFTExfVkFMVUVfQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFUzogJ1BMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NFTExfSElERV9NRVNTQUdFOiAnUExBVEZPUk1fREFUQUdSSURfQ0VMTF9ISURFX01FU1NBR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9TSE9XX01FU1NBR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9TSE9XX01FU1NBR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9ISURFX01FU1NBR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9ISURFX01FU1NBR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9WQUxJREFURTogJ1BMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX1ZBTElEQVRFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TRUxFQ1RJT05fQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TRUxFQ1RJT05fQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9TRUxFQ1RfQUxMX0lURU1TX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NMRUFSX1NFTEVDVEVEX0lURU1TOiAnUExBVEZPUk1fREFUQUdSSURfQ0xFQVJfU0VMRUNURURfSVRFTVMnLFxuICBQTEFURk9STV9EQVRBR1JJRF9UT0dHTEVfRklMVEVSSU5HOiAnUExBVEZPUk1fREFUQUdSSURfVE9HR0xFX0ZJTFRFUklORycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0ZJTFRFUl9EQVRBX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX0ZJTFRFUl9EQVRBX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0FQUExZX0ZJTFRFUlM6ICdQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9GSUxURVJTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0VUX0ZJTFRFUlM6ICdQTEFURk9STV9EQVRBR1JJRF9TRVRfRklMVEVSUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1VQREFURV9FWElTVElOR19DRUxMX1ZBTFVFOiAnUExBVEZPUk1fREFUQUdSSURfVVBEQVRFX0VYSVNUSU5HX0NFTExfVkFMVUUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRVRfRURJVF9EQVRBOiAnUExBVEZPUk1fREFUQUdSSURfU0VUX0VESVRfREFUQScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9PUEVOOiAnUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX09QRU4nLFxuICBQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfQ0xPU0U6ICdQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfQ0xPU0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfU0FWRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfRk9SQ0VfUkVGUkVTSDogJ1BMQVRGT1JNX0RBVEFHUklEX0ZPUkNFX1JFRlJFU0gnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRVRfRk9DVVNfVE86ICdQTEFURk9STV9EQVRBR1JJRF9TRVRfRk9DVVNfVE8nLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRVRfUEFHRTogJ1BMQVRGT1JNX0RBVEFHUklEX1NFVF9QQUdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0VUX1JPV1NfT05fUEFHRTogJ1BMQVRGT1JNX0RBVEFHUklEX1NFVF9ST1dTX09OX1BBR0UnLFxufTtcblxuZXhwb3J0IGNvbnN0IGludmFsaWRhdGUgPSBncmlkID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0lOVkFMSURBVEUsXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGZvcmNlUmVmcmVzaCA9ICgpID0+IChkaXNwYXRjaCkgPT4ge1xuICAvLyBGaXJlIHJlc2l6ZSBldmVudCB0byByZWNhbGN1bGF0ZSBjb21wb25lbnQgc2l6ZXNcbiAgLy8gYW5kIHRvIGZvcmNlIHJlZHJhdyBhbGwgbW91bnRlZCBncmlkc1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBpZiAoZG9jdW1lbnQuY3JlYXRlRXZlbnQpIHtcbiAgICAgIGNvbnN0IGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdIVE1MRXZlbnRzJyk7XG4gICAgICBldnQuaW5pdEV2ZW50KCdyZXNpemUnLCB0cnVlLCBmYWxzZSk7XG4gICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChldnQpO1xuICAgIH1cbiAgfSwgMSk7XG4gIGRpc3BhdGNoKHsgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfRk9SQ0VfUkVGUkVTSCB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXRCdXN5ID0gZ3JpZCA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9CVVNZLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXRSZWFkeSA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVBRFksXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGFwcGx5RmlsdGVycyA9IChncmlkLCBjb2x1bW5zKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBpZiAoIWNvbHVtbnMgfHwgIWNvbHVtbnMuZm9yRWFjaCkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBncmlkRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0KGdyaWQuaWQpO1xuICBpZiAoIWdyaWREYXRhKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IGZpbHRlckRhdGEgPSBncmlkRGF0YS5nZXRJbihbJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2ZpbHRlckRhdGEnXSwgTWFwKCkpO1xuICBjb25zdCBhbGxEYXRhID0gZ3JpZERhdGEuZ2V0KCdhbGxEYXRhJyk7XG4gIHNldEJ1c3koZ3JpZCkoZGlzcGF0Y2gpO1xuICBsZXQgZGF0YTtcbiAgaWYgKGdyaWQucGFnaW5hdGlvbikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChmaWx0ZXJEYXRhLmlzRW1wdHkoKSkge1xuICAgIGRhdGEgPSBhbGxEYXRhO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IGRhdGVGb3JtYXQgPSBVdGlscy5nZXREYXRlRm9ybWF0KGdyaWQsIGdldFN0YXRlKCkudXNlcik7XG4gICAgZGF0YSA9IGFsbERhdGEuZmlsdGVyKChyb3cpID0+IHtcbiAgICAgIGxldCBoaXRzID0gMDtcbiAgICAgIGZpbHRlckRhdGEuZm9yRWFjaCgoZmlsdGVyVmFsdWUsIGZpbHRlckNvbHVtbikgPT4ge1xuICAgICAgICBjb2x1bW5zLmZvckVhY2goKGNvbHVtbikgPT4ge1xuICAgICAgICAgIGlmIChVdGlscy5nZXRDb2x1bW5LZXkoY29sdW1uKSA9PT0gZmlsdGVyQ29sdW1uKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHJvdy5nZXRJbihjb2x1bW4udmFsdWVLZXlQYXRoKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSB8fCB2YWx1ZSA9PT0gMCB8fCB2YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgY29uc3QgZmlsdGVyTWF0Y2hlciA9IFV0aWxzLmdldEZpbHRlck1hdGNoZXIoY29sdW1uLCBkYXRlRm9ybWF0KTtcbiAgICAgICAgICAgICAgaWYgKGZpbHRlck1hdGNoZXIocm93LCBmaWx0ZXJWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBoaXRzICs9IDE7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gaGl0cyA9PT0gZmlsdGVyRGF0YS5zaXplO1xuICAgIH0pO1xuICB9XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9BUFBMWV9GSUxURVJTLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGRhdGEsXG4gIH0pO1xuICBzZXRSZWFkeShncmlkKShkaXNwYXRjaCk7XG4gIHJldHVybiB0cnVlO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldEFuZEFwcGx5RmlsdGVycyA9IChncmlkLCBjb2x1bW5zLCBkYXRhKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgY29uc3QgZmlsdGVyaW5nRGF0YSA9IFV0aWxzLm5vcm1hbGl6ZUZpbHRlcmluZ0RhdGEoZGF0YSk7XG4gIFV0aWxzLnNhdmVGaWx0ZXJEYXRhKGdyaWQsIGZpbHRlcmluZ0RhdGEuZ2V0KCdmaWx0ZXJEYXRhJykpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX0ZJTFRFUlMsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgZmlsdGVyaW5nRGF0YSxcbiAgfSk7XG4gIGRpc3BhdGNoKGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKSk7XG4gIHJldHVybiB0cnVlO1xufTtcblxuZXhwb3J0IGNvbnN0IGZpbHRlckNlbGxWYWx1ZUNoYW5nZSA9IChncmlkLCBjb2x1bW5zLCBjb2x1bW4sIHZhbHVlKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBjb25zdCBvcmlnRmlsdGVyRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oXG4gICAgW2dyaWQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdmaWx0ZXJEYXRhJ10sXG4gICAgTWFwKCksXG4gICk7XG4gIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2x1bW4pO1xuICBjb25zdCB2YWx1ZUVtcHR5Q2hlY2tlciA9IFV0aWxzLmdldFZhbHVlRW1wdHlDaGVja2VyKGNvbHVtbik7XG4gIGxldCBmaWx0ZXJEYXRhO1xuICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsdWUpKSB7XG4gICAgZmlsdGVyRGF0YSA9IG9yaWdGaWx0ZXJEYXRhLmRlbGV0ZShjb2x1bW5LZXkpO1xuICB9IGVsc2Uge1xuICAgIGZpbHRlckRhdGEgPSBvcmlnRmlsdGVyRGF0YS5zZXQoY29sdW1uS2V5LCB2YWx1ZSk7XG4gIH1cbiAgVXRpbHMuc2F2ZUZpbHRlckRhdGEoZ3JpZCwgZmlsdGVyRGF0YSk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9GSUxURVJfREFUQV9DSEFOR0UsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgZmlsdGVyRGF0YSxcbiAgfSk7XG4gIGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xufTtcblxuZXhwb3J0IGNvbnN0IGFwcGx5U29ydCA9IChncmlkLCBjb2x1bW5zKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBpZiAoIWNvbHVtbnMgfHwgIWNvbHVtbnMuZm9yRWFjaCkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBncmlkRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0KGdyaWQuaWQpO1xuICBpZiAoIWdyaWREYXRhKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IHNvcnREYXRhID0gZ3JpZERhdGEuZ2V0SW4oWydjb25maWcnLCAnc29ydGluZ0RhdGEnXSk7XG4gIGlmICghc29ydERhdGEpIHJldHVybiBmYWxzZTtcbiAgY29uc3Qgc29ydENvbHVtbiA9IHNvcnREYXRhLmdldCgnc29ydENvbHVtbicpO1xuICBpZiAoIXNvcnRDb2x1bW4pIHJldHVybiBmYWxzZTtcbiAgY29uc3Qgc29ydE9yZGVyID0gc29ydERhdGEuZ2V0KCdzb3J0T3JkZXInLCAnYXNjJyk7XG4gIGxldCBjb2x1bW47XG4gIGNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgaWYgKFV0aWxzLmdldENvbHVtbktleShjb2wpID09PSBzb3J0Q29sdW1uKSB7XG4gICAgICBjb2x1bW4gPSBjb2w7XG4gICAgfVxuICB9KTtcbiAgaWYgKCFjb2x1bW4pIHJldHVybiBmYWxzZTtcblxuICBpZiAoZ3JpZC5wYWdpbmF0aW9uKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgc2V0QnVzeShncmlkKShkaXNwYXRjaCk7XG5cbiAgY29uc3Qgb3JpZ0FsbERhdGEgPSBncmlkRGF0YS5nZXQoJ2FsbERhdGEnKTtcbiAgY29uc3QgY29tcGFyYXRvciA9IFV0aWxzLmdldFNvcnRDb21wYXJhdG9yKGNvbHVtbik7XG4gIGNvbnN0IHZhbHVlR2V0dGVyID0gVXRpbHMuZ2V0U29ydFZhbHVlR2V0dGVyKGNvbHVtbik7XG4gIGNvbnN0IHZhbHVlRW1wdHlDaGVja2VyID0gVXRpbHMuZ2V0VmFsdWVFbXB0eUNoZWNrZXIoY29sdW1uKTtcbiAgY29uc3QgYWxsRGF0YSA9IG9yaWdBbGxEYXRhLnNvcnQoKGEsIGIpID0+IHtcbiAgICBjb25zdCB2YWxBID0gdmFsdWVHZXR0ZXIoYSk7XG4gICAgY29uc3QgdmFsQiA9IHZhbHVlR2V0dGVyKGIpO1xuICAgIGlmIChzb3J0T3JkZXIgPT09ICdhc2MnKSB7XG4gICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQSkpIHJldHVybiAtMTtcbiAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxCKSkgcmV0dXJuIDE7XG4gICAgICByZXR1cm4gY29tcGFyYXRvcih2YWxBLCB2YWxCKTtcbiAgICB9XG4gICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEEpKSByZXR1cm4gMTtcbiAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQikpIHJldHVybiAtMTtcbiAgICByZXR1cm4gY29tcGFyYXRvcih2YWxCLCB2YWxBKTtcbiAgfSk7XG4gIGxldCBkYXRhO1xuICAvLyBTb3J0IGFsc28gZmlsdGVyZWQgZGF0YSBzZXBhcmF0ZWx5XG4gIGlmIChncmlkRGF0YS5nZXRJbihbJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2lzRmlsdGVyaW5nJ10sIGZhbHNlKSkge1xuICAgIGRhdGEgPSBncmlkRGF0YS5nZXQoJ2RhdGEnKS5zb3J0KChhLCBiKSA9PiB7XG4gICAgICBjb25zdCB2YWxBID0gdmFsdWVHZXR0ZXIoYSk7XG4gICAgICBjb25zdCB2YWxCID0gdmFsdWVHZXR0ZXIoYik7XG4gICAgICBpZiAoc29ydE9yZGVyID09PSAnYXNjJykge1xuICAgICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQSkpIHJldHVybiAtMTtcbiAgICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEIpKSByZXR1cm4gMTtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmF0b3IodmFsQSwgdmFsQik7XG4gICAgICB9XG4gICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQSkpIHJldHVybiAxO1xuICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEIpKSByZXR1cm4gLTE7XG4gICAgICByZXR1cm4gY29tcGFyYXRvcih2YWxCLCB2YWxBKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBkYXRhID0gYWxsRGF0YTtcbiAgfVxuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQVBQTFlfU09SVCxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBkYXRhLFxuICAgIGFsbERhdGEsXG4gIH0pO1xuICBzZXRSZWFkeShncmlkKShkaXNwYXRjaCk7XG4gIHJldHVybiB0cnVlO1xufTtcblxuZXhwb3J0IGNvbnN0IHNvcnRDaGFuZ2UgPSAoZ3JpZCwgY29sdW1ucywgY29sdW1uLCBuZXdTb3J0KSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBjb25zdCBzb3J0T3JkZXIgPSBuZXdTb3J0IHx8ICdhc2MnO1xuICBjb25zdCBzb3J0Q29sdW1uID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbHVtbik7XG4gIFV0aWxzLnNhdmVTb3J0RGF0YShncmlkLCB7IHNvcnRDb2x1bW4sIHNvcnRPcmRlciB9KTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NPUlRfQ0hBTkdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIHNvcnRDb2x1bW4sXG4gICAgc29ydE9yZGVyLFxuICB9KTtcbiAgYXBwbHlTb3J0KGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0RGF0YSA9IChncmlkLCBjb2x1bW5zLCBkYXRhKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBVdGlscy5jaGVja0NvbHVtbnNQYXJhbShjb2x1bW5zKTtcbiAgY29uc3QgY29uZmlnRGF0YSA9IFV0aWxzLmxvYWRHcmlkQ29uZmlnKGdyaWQsIGNvbHVtbnMpO1xuICBjb25zdCBpbW11dGFibGVEYXRhID0gSW1tdXRhYmxlLkl0ZXJhYmxlLmlzSXRlcmFibGUoZGF0YSkgPyBkYXRhIDogSW1tdXRhYmxlLmZyb21KUyhkYXRhKTtcbiAgY29uc3Qgc2VsZWN0ZWRJdGVtcyA9IFV0aWxzLmxvYWRTZWxlY3RlZEl0ZW1zKGdyaWQpLmZpbHRlcihcbiAgICBpdGVtID0+ICEhaW1tdXRhYmxlRGF0YS5maW5kKGRhdGFJdGVtID0+IGRhdGFJdGVtLmdldEluKGdyaWQuaWRLZXlQYXRoKSA9PT0gaXRlbSksXG4gICk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfREFUQSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBkYXRhOiBpbW11dGFibGVEYXRhLFxuICAgIGNvbmZpZzogY29uZmlnRGF0YSxcbiAgICBzZWxlY3RlZEl0ZW1zLFxuICB9KTtcbiAgaWYgKCFncmlkLnBhZ2luYXRpb24pIHtcbiAgICBhcHBseUZpbHRlcnMoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgICBhcHBseVNvcnQoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBncmlkRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0KGdyaWQuaWQpO1xuICAgIGlmICghZ3JpZERhdGEpIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBmaWx0ZXJEYXRhID0gZ3JpZERhdGEuZ2V0SW4oWydjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdmaWx0ZXJEYXRhJ10sIE1hcCgpKTtcbiAgICBpZiAoIWZpbHRlckRhdGEuaXNFbXB0eSgpKSB7XG4gICAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0FQUExZX0ZJTFRFUlMsXG4gICAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgICBkYXRhOiBpbW11dGFibGVEYXRhLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0IHNvcnREYXRhID0gZ3JpZERhdGEuZ2V0SW4oWydjb25maWcnLCAnc29ydGluZ0RhdGEnXSk7XG4gICAgaWYgKHNvcnREYXRhKSB7XG4gICAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0FQUExZX1NPUlQsXG4gICAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgICBkYXRhOiBpbW11dGFibGVEYXRhLFxuICAgICAgICBhbGxEYXRhOiBpbW11dGFibGVEYXRhLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufTtcblxuLyoqXG4gKiBBY3Rpb24gdG8gc2V0IGZvY3VzIHRvIGVpdGhlciBsYXN0IGVkaXRlZFJvdywgY3JlYXRlZFJvdyBvciB0byB2YWxpZGF0aW9uIGVycm9yXG4gKiBAcGFyYW0ge09iamVjdH0gZ3JpZFxuICogQHBhcmFtIHtTdHJpbmd9IGZvY3VzVG9UeXBlIC0gdHlwZSBvZiBmb2N1cyByZXF1ZXN0LiBQb3NzaWJsZSB2YWx1ZXM6XG4gKiAnZm9jdXNUb0VkaXRDZWxsJyB8fCAnZm9jdXNUb0Vycm9yQ2VsbCcgfHwgJ2ZvY3VzVG9DcmVhdGVDZWxsJ1xuICogQHBhcmFtIHtib29sZWFufSBmb2N1c1RvTGFzdFJvdyAtIHNldHMgZm9jdXMgdG8gbGFzdCBkYXRhIHJvdyBpbnN0ZWFkIG9mIHNlbGVjdGVkIHJvd1xuICovXG5leHBvcnQgY29uc3Qgc2V0Rm9jdXNUbyA9IChncmlkLCBmb2N1c1RvLCBmb2N1c1RvTGFzdFJvdyA9IGZhbHNlKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfRk9DVVNfVE8sXG4gICAgZm9jdXNUbyxcbiAgICBmb2N1c1RvTGFzdFJvdyxcbiAgICBpZDogZ3JpZC5pZCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZXh0ZW5kRGF0YSA9IChncmlkLCBjb2x1bW5zLCBkYXRhLCBwcmVwZW5kID0gZmFsc2UpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGNvbnN0IGltbXV0YWJsZURhdGEgPSBJbW11dGFibGUuSXRlcmFibGUuaXNJdGVyYWJsZShkYXRhKSA/IGRhdGEgOiBJbW11dGFibGUuZnJvbUpTKGRhdGEpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfRVhURU5EX0RBVEEsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgZGF0YTogaW1tdXRhYmxlRGF0YSxcbiAgICBwcmVwZW5kLFxuICB9KTtcbiAgYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gIGFwcGx5U29ydChncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlc2l6ZUNvbHVtbiA9IChncmlkLCBjb2x1bW5LZXksIHdpZHRoKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBjb25zdCBjb2x1bW5XaWR0aHMgPSBnZXRTdGF0ZSgpXG4gICAgLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnY29uZmlnJywgJ2NvbHVtbldpZHRocyddLCBNYXAoKSlcbiAgICAuc2V0KGNvbHVtbktleSwgd2lkdGgpO1xuICBVdGlscy5zYXZlQ29sdW1uV2lkdGhzKGdyaWQsIGNvbHVtbldpZHRocyk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRVNJWkVfQ09MVU1OLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGNvbHVtbldpZHRocyxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZWRpdCA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfRURJVCxcbiAgICBpZDogZ3JpZC5pZCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgY2FuY2VsID0gZ3JpZCA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DQU5DRUwsXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNhdmUgPSAoZ3JpZCwgY2IgPSAoKSA9PiB7fSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0FWRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgfSk7XG4gIGNiKCk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2F2ZVN1Y2Nlc3MgPSAoZ3JpZCwgY29sdW1ucywgc2F2ZWRJdGVtcykgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfU1VDQ0VTUyxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBpZEtleVBhdGg6IGdyaWQuaWRLZXlQYXRoLFxuICAgIHNhdmVkSXRlbXMsXG4gIH0pO1xuICBhcHBseUZpbHRlcnMoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgYXBwbHlTb3J0KGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2F2ZVBhcnRpYWxTdWNjZXNzID0gKGdyaWQsIGNvbHVtbnMsIHNhdmVkSXRlbXMpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TQVZFX1BBUlRJQUxfU1VDQ0VTUyxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBpZEtleVBhdGg6IGdyaWQuaWRLZXlQYXRoLFxuICAgIHNhdmVkSXRlbXMsXG4gIH0pO1xuICBhcHBseUZpbHRlcnMoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgYXBwbHlTb3J0KGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2F2ZUZhaWwgPSBncmlkID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfRkFJTCxcbiAgICBpZDogZ3JpZC5pZCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlID0gKGdyaWQsIGNvbHVtbkRlZmF1bHRWYWx1ZXMpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBjb2x1bW5EZWZhdWx0VmFsdWVzLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBhZGROZXdJdGVtID0gKGdyaWQsIGNvbHVtbkRlZmF1bHRWYWx1ZXMpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0FERF9ORVdfSVRFTSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBjb2x1bW5EZWZhdWx0VmFsdWVzLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVJdGVtID0gKGdyaWQsIHJvd0lkKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfSVRFTSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBpZEtleVBhdGg6IGdyaWQuaWRLZXlQYXRoLFxuICAgIHJvd0lkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVOZXdJdGVtID0gKGdyaWQsIGluZGV4KSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU0sXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgaW5kZXgsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZU5ld0l0ZW1zID0gKGdyaWQsIGluZGV4ZXMpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTVMsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgaW5kZXhlcyxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlID0gKGdyaWQsIGNiID0gKCkgPT4ge30pID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgfSk7XG4gIGNiKCk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlU3VjY2VzcyA9IChncmlkLCByZW1vdmVkSWRzKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfU1VDQ0VTUyxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBpZEtleVBhdGg6IGdyaWQuaWRLZXlQYXRoLFxuICAgIHJlbW92ZWRJZHMsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZUZhaWwgPSBncmlkID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9GQUlMLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBlZGl0Q2VsbFZhbHVlQ2hhbmdlID0gKGdyaWQsIGRhdGFJZCwga2V5UGF0aCwgdmFsdWUpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0VESVRfQ0VMTF9WQUxVRV9DSEFOR0UsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgZGF0YUlkLFxuICAgIGtleVBhdGgsXG4gICAgdmFsdWUsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGVkaXRDZWxsVmFsdWVWYWxpZGF0ZSA9IChncmlkLCBkYXRhSWQsIGtleVBhdGgsIHZhbHVlLCB2YWxpZGF0b3JzID0gW10pID0+IChcbiAgZGlzcGF0Y2gsXG4gIGdldFN0YXRlLFxuKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBsZXQgdmFsaWRhdGlvblN0YXRlID0geyB2YWxpZDogdHJ1ZSB9O1xuICB2YWxpZGF0b3JzLmZvckVhY2goKHZhbGlkYXRvcikgPT4ge1xuICAgIGlmICh2YWxpZGF0aW9uU3RhdGUudmFsaWQpIHtcbiAgICAgIGlmICh2YWxpZGF0b3IudW5pcXVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gJycgfHwgdmFsdWUgIT09IG51bGwgfHwgdmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIC8vIGNvbWJpbmUgcmVhbCBkYXRhIHdpdGggY3VycmVudCB1bnNhdmVkIGVkaXRlZCBkYXRhXG4gICAgICAgICAgY29uc3QgZ3JpZERhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldChncmlkLmlkKTtcbiAgICAgICAgICBjb25zdCBlZGl0RGF0YSA9IGdyaWREYXRhLmdldCgnZWRpdERhdGEnKTtcbiAgICAgICAgICBsZXQgYWxsRGF0YSA9IGdyaWREYXRhLmdldCgnYWxsRGF0YScpO1xuICAgICAgICAgIGlmIChlZGl0RGF0YSkge1xuICAgICAgICAgICAgZWRpdERhdGEuZm9yRWFjaCgoZWRpdERhdGFJdGVtLCBlZGl0RGF0YUl0ZW1JZCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBmb3VuZEluZGV4ID0gYWxsRGF0YS5maW5kSW5kZXgoZCA9PiBkLmdldEluKGdyaWQuaWRLZXlQYXRoKSA9PT0gZWRpdERhdGFJdGVtSWQpO1xuICAgICAgICAgICAgICBpZiAoZm91bmRJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBhbGxEYXRhID0gYWxsRGF0YS5tZXJnZURlZXBJbihbZm91bmRJbmRleF0sIGVkaXREYXRhSXRlbSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBkZXRlcm1pbmUgdW5pcXVlbmVzc1xuICAgICAgICAgIGNvbnN0IGZpbmRpbmcgPSBhbGxEYXRhLmZpbmQoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGlmIChncmlkLmlkS2V5UGF0aC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgLy8gZG9uJ3Qgc2VsZiBjb21wYXJlXG4gICAgICAgICAgICAgIGlmIChpdGVtLmdldEluKGdyaWQuaWRLZXlQYXRoKSA9PT0gZGF0YUlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5nZXRJbihrZXlQYXRoKSA9PT0gdmFsdWU7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKGZpbmRpbmcpIHtcbiAgICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHtcbiAgICAgICAgICAgICAgdmFsaWQ6IGZhbHNlLFxuICAgICAgICAgICAgICBtZXNzYWdlOiAnVmFsaWRhdGlvbi5VbmlxdWUnLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodmFsaWRhdG9yLnZhbGlkYXRlV2l0aFJvd0RhdGEpIHtcbiAgICAgICAgY29uc3QgZ3JpZERhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldChncmlkLmlkKTtcbiAgICAgICAgY29uc3QgZWRpdERhdGEgPSBncmlkRGF0YS5nZXRJbihbJ2VkaXREYXRhJywgZGF0YUlkXSwgTWFwKCkpO1xuICAgICAgICBsZXQgcm93RGF0YSA9IGdyaWREYXRhLmdldCgnYWxsRGF0YScpLmZpbmQoaXRlbSA9PiBpdGVtLmdldEluKGdyaWQuaWRLZXlQYXRoKSA9PT0gZGF0YUlkKTtcbiAgICAgICAgaWYgKHJvd0RhdGEpIHtcbiAgICAgICAgICByb3dEYXRhID0gcm93RGF0YS5tZXJnZURlZXAoZWRpdERhdGEpO1xuICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IHZhbGlkYXRvci5wYXJhbXMgPyBPYmplY3QudmFsdWVzKHZhbGlkYXRvci5wYXJhbXMpIDogW107XG4gICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0gdmFsaWRhdG9yLnZhbGlkYXRlV2l0aFJvd0RhdGEodmFsdWUsIHJvd0RhdGEsIC4uLnBhcmFtcyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHZhbGlkYXRvci5wYXJhbXMgPyBPYmplY3QudmFsdWVzKHZhbGlkYXRvci5wYXJhbXMpIDogW107XG4gICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZSh2YWx1ZSwgLi4ucGFyYW1zKTtcbiAgICAgICAgaWYgKHZhbGlkYXRvci5wYXJhbXMpIHtcbiAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZVZhbHVlcyA9IHZhbGlkYXRvci5wYXJhbXM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICBpZiAodmFsaWRhdGlvblN0YXRlLnZhbGlkKSB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0VMTF9ISURFX01FU1NBR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIG1lc3NhZ2VUeXBlOiAnZXJyb3InLFxuICAgICAgZGF0YUlkLFxuICAgICAga2V5UGF0aCxcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgbWVzc2FnZVR5cGU6ICdlcnJvcicsXG4gICAgICBkYXRhSWQsXG4gICAgICBrZXlQYXRoLFxuICAgICAgbWVzc2FnZUlkOiB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZSxcbiAgICAgIG1lc3NhZ2VWYWx1ZXM6IHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlVmFsdWVzLFxuICAgIH0pO1xuICB9XG4gIHJldHVybiB2YWxpZGF0aW9uU3RhdGUudmFsaWQ7XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlID0gKGdyaWQsIHJvd0luZGV4LCBrZXlQYXRoLCB2YWx1ZSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfQ0hBTkdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIHJvd0luZGV4LFxuICAgIGtleVBhdGgsXG4gICAgdmFsdWUsXG4gIH0pO1xufTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbmV4cG9ydCBjb25zdCBjcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZSA9IChncmlkLCByb3dJbmRleCwga2V5UGF0aCwgdmFsdWUsIHZhbGlkYXRvcnMgPSBbXSkgPT4gKFxuICBkaXNwYXRjaCxcbiAgZ2V0U3RhdGUsXG4pID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGxldCB2YWxpZGF0aW9uU3RhdGUgPSB7IHZhbGlkOiB0cnVlIH07XG4gIHZhbGlkYXRvcnMuZm9yRWFjaCgodmFsaWRhdG9yKSA9PiB7XG4gICAgaWYgKHZhbGlkYXRpb25TdGF0ZS52YWxpZCkge1xuICAgICAgaWYgKHZhbGlkYXRvci51bmlxdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSAnJyB8fCB2YWx1ZSAhPT0gbnVsbCB8fCB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY29uc3QgZmluZGluZyA9IGdldFN0YXRlKClcbiAgICAgICAgICAgIC5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ2FsbERhdGEnXSlcbiAgICAgICAgICAgIC5maW5kKGl0ZW0gPT4gaXRlbS5nZXRJbihrZXlQYXRoKSA9PT0gdmFsdWUpO1xuICAgICAgICAgIGlmIChmaW5kaW5nKSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB7XG4gICAgICAgICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgICAgICAgICAgbWVzc2FnZTogJ1ZhbGlkYXRpb24uVW5pcXVlJyxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGZpbmQyID0gZ2V0U3RhdGUoKVxuICAgICAgICAgICAgICAuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdjcmVhdGVEYXRhJ10pXG4gICAgICAgICAgICAgIC5maW5kKChpdGVtLCBpKSA9PiBpICE9PSByb3dJbmRleCAmJiBpdGVtLmdldEluKGtleVBhdGgpID09PSB2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoZmluZDIpIHtcbiAgICAgICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0ge1xuICAgICAgICAgICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnVmFsaWRhdGlvbi5VbmlxdWUnLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh2YWxpZGF0b3IudmFsaWRhdGVXaXRoUm93RGF0YSkge1xuICAgICAgICBjb25zdCByb3dEYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ2NyZWF0ZURhdGEnLCByb3dJbmRleF0pO1xuICAgICAgICBjb25zdCBwYXJhbXMgPSB2YWxpZGF0b3IucGFyYW1zID8gT2JqZWN0LnZhbHVlcyh2YWxpZGF0b3IucGFyYW1zKSA6IFtdO1xuICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB2YWxpZGF0b3IudmFsaWRhdGVXaXRoUm93RGF0YSh2YWx1ZSwgcm93RGF0YSwgLi4ucGFyYW1zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHZhbGlkYXRvci5wYXJhbXMgPyBPYmplY3QudmFsdWVzKHZhbGlkYXRvci5wYXJhbXMpIDogW107XG4gICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZSh2YWx1ZSwgLi4ucGFyYW1zKTtcbiAgICAgICAgaWYgKHZhbGlkYXRvci5wYXJhbXMpIHtcbiAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZVZhbHVlcyA9IHZhbGlkYXRvci5wYXJhbXM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICBpZiAodmFsaWRhdGlvblN0YXRlLnZhbGlkKSB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfSElERV9NRVNTQUdFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBtZXNzYWdlVHlwZTogJ2Vycm9yJyxcbiAgICAgIHJvd0luZGV4LFxuICAgICAga2V5UGF0aCxcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9TSE9XX01FU1NBR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIG1lc3NhZ2VUeXBlOiAnZXJyb3InLFxuICAgICAgcm93SW5kZXgsXG4gICAgICBrZXlQYXRoLFxuICAgICAgbWVzc2FnZUlkOiB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZSxcbiAgICAgIG1lc3NhZ2VWYWx1ZXM6IHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlVmFsdWVzLFxuICAgIH0pO1xuICB9XG4gIHJldHVybiB2YWxpZGF0aW9uU3RhdGUudmFsaWQ7XG59O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuZXhwb3J0IGNvbnN0IGNlbGxTaG93TWVzc2FnZSA9IChcbiAgZ3JpZCxcbiAgbWVzc2FnZVR5cGUsXG4gIGRhdGFJZCxcbiAga2V5UGF0aCxcbiAgbWVzc2FnZUlkLFxuICBtZXNzYWdlVmFsdWVzLFxuKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBtZXNzYWdlVHlwZSxcbiAgICBkYXRhSWQsXG4gICAga2V5UGF0aCxcbiAgICBtZXNzYWdlSWQsXG4gICAgbWVzc2FnZVZhbHVlcyxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgY2VsbFNob3dNZXNzYWdlcyA9IChncmlkLCBtZXNzYWdlcykgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0VTLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIG1lc3NhZ2VzLFxuICB9KTtcbn07XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG5leHBvcnQgY29uc3QgY2VsbEhpZGVNZXNzYWdlID0gKFxuICBncmlkLFxuICBtZXNzYWdlVHlwZSA9IG51bGwsXG4gIGRhdGFJZCA9IG51bGwsXG4gIGtleVBhdGggPSBudWxsLFxuKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBtZXNzYWdlVHlwZSxcbiAgICBkYXRhSWQsXG4gICAga2V5UGF0aCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQ2VsbFNob3dNZXNzYWdlID0gKFxuICBncmlkLFxuICBtZXNzYWdlVHlwZSxcbiAgcm93SW5kZXgsXG4gIGtleVBhdGgsXG4gIG1lc3NhZ2VJZCxcbiAgbWVzc2FnZVZhbHVlcyxcbikgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfU0hPV19NRVNTQUdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIG1lc3NhZ2VUeXBlLFxuICAgIHJvd0luZGV4LFxuICAgIGtleVBhdGgsXG4gICAgbWVzc2FnZUlkLFxuICAgIG1lc3NhZ2VWYWx1ZXMsXG4gIH0pO1xufTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbmV4cG9ydCBjb25zdCBjcmVhdGVDZWxsSGlkZU1lc3NhZ2UgPSAoXG4gIGdyaWQsXG4gIG1lc3NhZ2VUeXBlID0gbnVsbCxcbiAgcm93SW5kZXggPSBudWxsLFxuICBrZXlQYXRoID0gbnVsbCxcbikgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfSElERV9NRVNTQUdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIG1lc3NhZ2VUeXBlLFxuICAgIHJvd0luZGV4LFxuICAgIGtleVBhdGgsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGNlbGxTZWxlY3Rpb25DaGFuZ2UgPSAoZ3JpZCwgc2VsZWN0ZWRDZWxsID0gbnVsbCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgc2VsZWN0ZWRDZWxsLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0VMRUNUSU9OX0NIQU5HRSxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgaXRlbVNlbGVjdGlvbkNoYW5nZSA9IChncmlkLCByb3dJbmRleCwgY3RybFByZXNzZWQgPSBmYWxzZSwgc2hpZnRQcmVzc2VkID0gZmFsc2UpID0+IChcbiAgZGlzcGF0Y2gsXG4gIGdldFN0YXRlLFxuKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIHJvd0luZGV4LFxuICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgY3RybFByZXNzZWQsXG4gICAgc2hpZnRQcmVzc2VkLFxuICB9KTtcbiAgVXRpbHMuc2F2ZVNlbGVjdGVkSXRlbXMoZ3JpZCwgZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ3NlbGVjdGVkSXRlbXMnXSkpO1xufTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdEFsbEl0ZW1zQ2hhbmdlID0gZ3JpZCA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0UsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgfSk7XG4gIFV0aWxzLnNhdmVTZWxlY3RlZEl0ZW1zKGdyaWQsIGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdzZWxlY3RlZEl0ZW1zJ10pKTtcbn07XG5cbmV4cG9ydCBjb25zdCBjbGVhclNlbGVjdGVkSXRlbXMgPSBncmlkID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DTEVBUl9TRUxFQ1RFRF9JVEVNUyxcbiAgICBpZDogZ3JpZC5pZCxcbiAgfSk7XG4gIFV0aWxzLnNhdmVTZWxlY3RlZEl0ZW1zKGdyaWQsIGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdzZWxlY3RlZEl0ZW1zJ10pKTtcbn07XG5cbmV4cG9ydCBjb25zdCB0b2dnbGVGaWx0ZXJpbmcgPSBncmlkID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGNvbnN0IGlzRmlsdGVyaW5nID0gIWdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oXG4gICAgW2dyaWQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdpc0ZpbHRlcmluZyddLFxuICAgIGZhbHNlLFxuICApO1xuICBVdGlscy5zYXZlSXNGaWx0ZXJpbmcoZ3JpZCwgaXNGaWx0ZXJpbmcpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfVE9HR0xFX0ZJTFRFUklORyxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBpc0ZpbHRlcmluZyxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgdmFsaWRhdGVFZGl0ZWRSb3dzID0gKGdyaWQsIGNvbHVtbnMpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG4gIGNvbnN0IGVkaXREYXRhID0gZ3JpZERhdGEuZ2V0KCdlZGl0RGF0YScsIE1hcCgpKTtcbiAgbGV0IGFsbEdvb2QgPSB0cnVlO1xuICBlZGl0RGF0YS5mb3JFYWNoKChlZGl0RGF0YVJvdywgZGF0YUlkKSA9PiB7XG4gICAgY29sdW1ucy5mb3JFYWNoKChjb2wpID0+IHtcbiAgICAgIGxldCB2YWx1ZSA9IGVkaXREYXRhUm93LmdldEluKGNvbC52YWx1ZUtleVBhdGgpO1xuICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsdWUgPSBncmlkRGF0YVxuICAgICAgICAgIC5nZXQoJ2FsbERhdGEnKVxuICAgICAgICAgIC5maW5kKGRhdGEgPT4gZGF0YS5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGRhdGFJZClcbiAgICAgICAgICAuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG4gICAgICB9XG4gICAgICBjb25zdCBpc1ZhbGlkID0gZWRpdENlbGxWYWx1ZVZhbGlkYXRlKGdyaWQsIGRhdGFJZCwgY29sLnZhbHVlS2V5UGF0aCwgdmFsdWUsIGNvbC52YWxpZGF0b3JzKShcbiAgICAgICAgZGlzcGF0Y2gsXG4gICAgICAgIGdldFN0YXRlLFxuICAgICAgKTtcbiAgICAgIGlmIChhbGxHb29kICYmICFpc1ZhbGlkKSB7XG4gICAgICAgIGFsbEdvb2QgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBhbGxHb29kO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZUVtcHR5Q3JlYXRlZFJvd3MgPSAoZ3JpZCwgY29sdW1ucykgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgY29uc3QgY3JlYXRlRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdjcmVhdGVEYXRhJ10sIE1hcCgpKTtcbiAgY29uc3QgaW5kZXhlcyA9IFtdO1xuICBjcmVhdGVEYXRhLmZvckVhY2goKGNyZWF0ZURhdGFSb3csIHJvd0luZGV4KSA9PiB7XG4gICAgbGV0IGlzRW1wdHkgPSB0cnVlO1xuICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGNyZWF0ZURhdGFSb3cuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG4gICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gJycgJiYgdmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgaXNFbXB0eSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChpc0VtcHR5KSB7XG4gICAgICBpbmRleGVzLnB1c2gocm93SW5kZXgpO1xuICAgIH1cbiAgfSk7XG4gIGlmIChpbmRleGVzLmxlbmd0aCA+IDApIHtcbiAgICByZW1vdmVOZXdJdGVtcyhncmlkLCBpbmRleGVzKShkaXNwYXRjaCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUNyZWF0ZWRSb3dzID0gKGdyaWQsIGNvbHVtbnMpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIHJlbW92ZUVtcHR5Q3JlYXRlZFJvd3MoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgY29uc3QgY3JlYXRlRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdjcmVhdGVEYXRhJ10sIE1hcCgpKTtcbiAgbGV0IGFsbEdvb2QgPSB0cnVlO1xuICBjcmVhdGVEYXRhLmZvckVhY2goKGNyZWF0ZURhdGFSb3csIHJvd0luZGV4KSA9PiB7XG4gICAgY29sdW1ucy5mb3JFYWNoKChjb2wpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gY3JlYXRlRGF0YVJvdy5nZXRJbihjb2wudmFsdWVLZXlQYXRoKTtcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSBjcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZShcbiAgICAgICAgZ3JpZCxcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIGNvbC52YWx1ZUtleVBhdGgsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBjb2wudmFsaWRhdG9ycyxcbiAgICAgICkoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgICAgIGlmIChhbGxHb29kICYmICFpc1ZhbGlkKSB7XG4gICAgICAgIGFsbEdvb2QgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBhbGxHb29kO1xufTtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZUV4aXN0aW5nQ2VsbFZhbHVlID0gKGdyaWQsIGRhdGFJZCwga2V5UGF0aCwgdmFsdWUpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1VQREFURV9FWElTVElOR19DRUxMX1ZBTFVFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGRhdGFJZCxcbiAgICBrZXlQYXRoLFxuICAgIHZhbHVlLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXRFZGl0RGF0YSA9IChncmlkLCBkYXRhLCBjZWxsTWVzc2FnZXMgPSBNYXAoKSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgZGF0YSxcbiAgICBjZWxsTWVzc2FnZXMsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX0VESVRfREFUQSxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3Qgb3BlbkNvbHVtblNldHRpbmdzTW9kYWwgPSBncmlkID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9PUEVOLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBjbG9zZUNvbHVtblNldHRpbmdzTW9kYWwgPSBncmlkID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2F2ZUNvbHVtblNldHRpbmdzID0gKGdyaWQsIGhpZGRlbkNvbHVtbnMsIGNvbHVtbk9yZGVyKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIFV0aWxzLnNhdmVDb2x1bW5TZXR0aW5ncyhncmlkLCBoaWRkZW5Db2x1bW5zLCBjb2x1bW5PcmRlcik7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfU0FWRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBjb2x1bW5PcmRlcixcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0UGFnZSA9IChncmlkLCBwYWdlKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuc2F2ZVBhZ2UoZ3JpZCwgcGFnZSk7XG4gIGRpc3BhdGNoKHtcbiAgICBwYWdlLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NFVF9QQUdFLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXRSb3dzT25QYWdlID0gKGdyaWQsIHJvd3NPblBhZ2UpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5zYXZlUm93c09uUGFnZShncmlkLCByb3dzT25QYWdlKTtcbiAgZGlzcGF0Y2goe1xuICAgIHJvd3NPblBhZ2UsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX1JPV1NfT05fUEFHRSxcbiAgfSk7XG59O1xuIl19