"use strict";

exports.__esModule = true;
exports.setRowsOnPage = exports.setPage = exports.saveColumnSettings = exports.closeColumnSettingsModal = exports.openColumnSettingsModal = exports.setEditData = exports.updateExistingCellValue = exports.validateCreatedRows = exports.removeEmptyCreatedRows = exports.validateEditedRows = exports.toggleFiltering = exports.clearSelectedItems = exports.selectAllItemsChange = exports.itemSelectionChange = exports.cellSelectionChange = exports.createCellHideMessage = exports.createCellShowMessage = exports.cellHideMessage = exports.cellShowMessages = exports.cellShowMessage = exports.createCellValueValidate = exports.createCellValueChange = exports.editCellValueValidate = exports.editCellValueChange = exports.removeFail = exports.removeSuccess = exports.remove = exports.removeNewItems = exports.removeNewItem = exports.removeItem = exports.addNewItem = exports.create = exports.saveFail = exports.savePartialSuccess = exports.saveSuccess = exports.save = exports.cancel = exports.edit = exports.resizeColumn = exports.extendData = exports.setFocusTo = exports.setData = exports.sortChange = exports.applySort = exports.filterCellValueChange = exports.setAndApplyFilters = exports.applyFilters = exports.setReady = exports.setBusy = exports.forceRefresh = exports.invalidate = exports.TYPES = void 0;

var _immutable = _interopRequireWildcard(require("immutable"));

var _datagrid = _interopRequireDefault(require("./datagrid.utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5hY3Rpb25zLmpzIl0sIm5hbWVzIjpbIlRZUEVTIiwiUExBVEZPUk1fREFUQUdSSURfSU5WQUxJREFURSIsIlBMQVRGT1JNX0RBVEFHUklEX0JVU1kiLCJQTEFURk9STV9EQVRBR1JJRF9SRUFEWSIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9EQVRBIiwiUExBVEZPUk1fREFUQUdSSURfQVBQTFlfU09SVCIsIlBMQVRGT1JNX0RBVEFHUklEX1NPUlRfQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfUkVTSVpFX0NPTFVNTiIsIlBMQVRGT1JNX0RBVEFHUklEX0VESVQiLCJQTEFURk9STV9EQVRBR1JJRF9DQU5DRUwiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFIiwiUExBVEZPUk1fREFUQUdSSURfRVhURU5EX0RBVEEiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFX1NVQ0NFU1MiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFX1BBUlRJQUxfU1VDQ0VTUyIsIlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfRkFJTCIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURSIsIlBMQVRGT1JNX0RBVEFHUklEX0FERF9ORVdfSVRFTSIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9JVEVNIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNUyIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRSIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9TVUNDRVNTIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUwiLCJQTEFURk9STV9EQVRBR1JJRF9FRElUX0NFTExfVkFMVUVfQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0UiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRVMiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX0hJREVfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX0NIQU5HRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX1ZBTElEQVRFIiwiUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TRUxFQ1RJT05fQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9DTEVBUl9TRUxFQ1RFRF9JVEVNUyIsIlBMQVRGT1JNX0RBVEFHUklEX1RPR0dMRV9GSUxURVJJTkciLCJQTEFURk9STV9EQVRBR1JJRF9GSUxURVJfREFUQV9DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9GSUxURVJTIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX0ZJTFRFUlMiLCJQTEFURk9STV9EQVRBR1JJRF9VUERBVEVfRVhJU1RJTkdfQ0VMTF9WQUxVRSIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9FRElUX0RBVEEiLCJQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfT1BFTiIsIlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFIiwiUExBVEZPUk1fREFUQUdSSURfRk9SQ0VfUkVGUkVTSCIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9GT0NVU19UTyIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9QQUdFIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX1JPV1NfT05fUEFHRSIsImludmFsaWRhdGUiLCJncmlkIiwiZGlzcGF0Y2giLCJVdGlscyIsImNoZWNrR3JpZFBhcmFtIiwidHlwZSIsImlkIiwiZm9yY2VSZWZyZXNoIiwic2V0VGltZW91dCIsImRvY3VtZW50IiwiY3JlYXRlRXZlbnQiLCJldnQiLCJpbml0RXZlbnQiLCJ3aW5kb3ciLCJkaXNwYXRjaEV2ZW50Iiwic2V0QnVzeSIsInNldFJlYWR5IiwiYXBwbHlGaWx0ZXJzIiwiY29sdW1ucyIsImdldFN0YXRlIiwiZm9yRWFjaCIsImdyaWREYXRhIiwiZGF0YWdyaWQiLCJnZXQiLCJmaWx0ZXJEYXRhIiwiZ2V0SW4iLCJhbGxEYXRhIiwiZGF0YSIsInBhZ2luYXRpb24iLCJpc0VtcHR5IiwiZGF0ZUZvcm1hdCIsImdldERhdGVGb3JtYXQiLCJ1c2VyIiwiZmlsdGVyIiwicm93IiwiaGl0cyIsImZpbHRlclZhbHVlIiwiZmlsdGVyQ29sdW1uIiwiY29sdW1uIiwiZ2V0Q29sdW1uS2V5IiwidmFsdWUiLCJ2YWx1ZUtleVBhdGgiLCJmaWx0ZXJNYXRjaGVyIiwiZ2V0RmlsdGVyTWF0Y2hlciIsInNpemUiLCJzZXRBbmRBcHBseUZpbHRlcnMiLCJmaWx0ZXJpbmdEYXRhIiwibm9ybWFsaXplRmlsdGVyaW5nRGF0YSIsInNhdmVGaWx0ZXJEYXRhIiwiZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlIiwib3JpZ0ZpbHRlckRhdGEiLCJjb2x1bW5LZXkiLCJ2YWx1ZUVtcHR5Q2hlY2tlciIsImdldFZhbHVlRW1wdHlDaGVja2VyIiwic2V0IiwiYXBwbHlTb3J0Iiwic29ydERhdGEiLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwiY29sIiwib3JpZ0FsbERhdGEiLCJjb21wYXJhdG9yIiwiZ2V0U29ydENvbXBhcmF0b3IiLCJ2YWx1ZUdldHRlciIsImdldFNvcnRWYWx1ZUdldHRlciIsInNvcnQiLCJhIiwiYiIsInZhbEEiLCJ2YWxCIiwic29ydENoYW5nZSIsIm5ld1NvcnQiLCJzYXZlU29ydERhdGEiLCJzZXREYXRhIiwiY2hlY2tDb2x1bW5zUGFyYW0iLCJjb25maWdEYXRhIiwibG9hZEdyaWRDb25maWciLCJpbW11dGFibGVEYXRhIiwiSW1tdXRhYmxlIiwiSXRlcmFibGUiLCJpc0l0ZXJhYmxlIiwiZnJvbUpTIiwic2VsZWN0ZWRJdGVtcyIsImxvYWRTZWxlY3RlZEl0ZW1zIiwiaXRlbSIsImZpbmQiLCJkYXRhSXRlbSIsImlkS2V5UGF0aCIsImNvbmZpZyIsInNldEZvY3VzVG8iLCJmb2N1c1RvIiwiZm9jdXNUb0xhc3RSb3ciLCJleHRlbmREYXRhIiwicHJlcGVuZCIsInJlc2l6ZUNvbHVtbiIsIndpZHRoIiwiY29sdW1uV2lkdGhzIiwic2F2ZUNvbHVtbldpZHRocyIsImVkaXQiLCJjYW5jZWwiLCJzYXZlIiwiY2IiLCJzYXZlU3VjY2VzcyIsInNhdmVkSXRlbXMiLCJzYXZlUGFydGlhbFN1Y2Nlc3MiLCJzYXZlRmFpbCIsImNyZWF0ZSIsImNvbHVtbkRlZmF1bHRWYWx1ZXMiLCJhZGROZXdJdGVtIiwicmVtb3ZlSXRlbSIsInJvd0lkIiwicmVtb3ZlTmV3SXRlbSIsImluZGV4IiwicmVtb3ZlTmV3SXRlbXMiLCJpbmRleGVzIiwicmVtb3ZlIiwicmVtb3ZlU3VjY2VzcyIsInJlbW92ZWRJZHMiLCJyZW1vdmVGYWlsIiwiZWRpdENlbGxWYWx1ZUNoYW5nZSIsImRhdGFJZCIsImtleVBhdGgiLCJlZGl0Q2VsbFZhbHVlVmFsaWRhdGUiLCJ2YWxpZGF0b3JzIiwidmFsaWRhdGlvblN0YXRlIiwidmFsaWQiLCJ2YWxpZGF0b3IiLCJ1bmlxdWUiLCJ1bmRlZmluZWQiLCJlZGl0RGF0YSIsImVkaXREYXRhSXRlbSIsImVkaXREYXRhSXRlbUlkIiwiZm91bmRJbmRleCIsImZpbmRJbmRleCIsImQiLCJtZXJnZURlZXBJbiIsImZpbmRpbmciLCJsZW5ndGgiLCJtZXNzYWdlIiwidmFsaWRhdGVXaXRoUm93RGF0YSIsInJvd0RhdGEiLCJtZXJnZURlZXAiLCJwYXJhbXMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJ2YWxpZGF0ZSIsIm1lc3NhZ2VWYWx1ZXMiLCJtZXNzYWdlVHlwZSIsIm1lc3NhZ2VJZCIsImNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSIsInJvd0luZGV4IiwiY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUiLCJmaW5kMiIsImkiLCJjZWxsU2hvd01lc3NhZ2UiLCJjZWxsU2hvd01lc3NhZ2VzIiwibWVzc2FnZXMiLCJjZWxsSGlkZU1lc3NhZ2UiLCJjcmVhdGVDZWxsU2hvd01lc3NhZ2UiLCJjcmVhdGVDZWxsSGlkZU1lc3NhZ2UiLCJjZWxsU2VsZWN0aW9uQ2hhbmdlIiwic2VsZWN0ZWRDZWxsIiwiaXRlbVNlbGVjdGlvbkNoYW5nZSIsImN0cmxQcmVzc2VkIiwic2hpZnRQcmVzc2VkIiwic2F2ZVNlbGVjdGVkSXRlbXMiLCJzZWxlY3RBbGxJdGVtc0NoYW5nZSIsImNsZWFyU2VsZWN0ZWRJdGVtcyIsInRvZ2dsZUZpbHRlcmluZyIsImlzRmlsdGVyaW5nIiwic2F2ZUlzRmlsdGVyaW5nIiwidmFsaWRhdGVFZGl0ZWRSb3dzIiwiYWxsR29vZCIsImVkaXREYXRhUm93IiwiaXNWYWxpZCIsInJlbW92ZUVtcHR5Q3JlYXRlZFJvd3MiLCJjcmVhdGVEYXRhIiwiY3JlYXRlRGF0YVJvdyIsInB1c2giLCJ2YWxpZGF0ZUNyZWF0ZWRSb3dzIiwidXBkYXRlRXhpc3RpbmdDZWxsVmFsdWUiLCJzZXRFZGl0RGF0YSIsImNlbGxNZXNzYWdlcyIsIm9wZW5Db2x1bW5TZXR0aW5nc01vZGFsIiwiY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsIiwic2F2ZUNvbHVtblNldHRpbmdzIiwiaGlkZGVuQ29sdW1ucyIsImNvbHVtbk9yZGVyIiwic2V0UGFnZSIsInBhZ2UiLCJzYXZlUGFnZSIsInNldFJvd3NPblBhZ2UiLCJyb3dzT25QYWdlIiwic2F2ZVJvd3NPblBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7O0FBQ0E7Ozs7OztBQUVPLElBQU1BLEtBQUssR0FBRztBQUNuQkMsRUFBQUEsNEJBQTRCLEVBQUUsOEJBRFg7QUFFbkJDLEVBQUFBLHNCQUFzQixFQUFFLHdCQUZMO0FBR25CQyxFQUFBQSx1QkFBdUIsRUFB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LFNBQXNCLFVBQUM5TCxRQUFELEVBQWM7QUFDL0RDLHlCQUFNOEwsY0FBTixDQUFxQmhNLElBQXJCLEVBQTJCK0wsVUFBM0I7O0FBQ0E5TCxJQUFBQSxRQUFRLENBQUM7QUFDUDhMLE1BQUFBLFVBQVUsRUFBVkEsVUFETztBQUVQMUwsTUFBQUEsRUFBRSxFQUFFTCxJQUFJLENBQUNLLEVBRkY7QUFHUEQsTUFBQUEsSUFBSSxFQUFFckQsS0FBSyxDQUFDK0M7QUFITCxLQUFELENBQVI7QUFLRCxHQVA0QjtBQUFBLENBQXRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEltbXV0YWJsZSwgeyBNYXAgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4vZGF0YWdyaWQudXRpbHMnO1xuXG5leHBvcnQgY29uc3QgVFlQRVMgPSB7XG4gIFBMQVRGT1JNX0RBVEFHUklEX0lOVkFMSURBVEU6ICdQTEFURk9STV9EQVRBR1JJRF9JTlZBTElEQVRFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQlVTWTogJ1BMQVRGT1JNX0RBVEFHUklEX0JVU1knLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRUFEWTogJ1BMQVRGT1JNX0RBVEFHUklEX1JFQURZJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0VUX0RBVEE6ICdQTEFURk9STV9EQVRBR1JJRF9TRVRfREFUQScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0FQUExZX1NPUlQ6ICdQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9TT1JUJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU09SVF9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9TT1JUX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFU0laRV9DT0xVTU46ICdQTEFURk9STV9EQVRBR1JJRF9SRVNJWkVfQ09MVU1OJyxcbiAgUExBVEZPUk1fREFUQUdSSURfRURJVDogJ1BMQVRGT1JNX0RBVEFHUklEX0VESVQnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DQU5DRUw6ICdQTEFURk9STV9EQVRBR1JJRF9DQU5DRUwnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TQVZFOiAnUExBVEZPUk1fREFUQUdSSURfU0FWRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0VYVEVORF9EQVRBOiAnUExBVEZPUk1fREFUQUdSSURfRVhURU5EX0RBVEEnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TQVZFX1NVQ0NFU1M6ICdQTEFURk9STV9EQVRBR1JJRF9TQVZFX1NVQ0NFU1MnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TQVZFX1BBUlRJQUxfU1VDQ0VTUzogJ1BMQVRGT1JNX0RBVEFHUklEX1NBVkVfUEFSVElBTF9TVUNDRVNTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0FWRV9GQUlMOiAnUExBVEZPUk1fREFUQUdSSURfU0FWRV9GQUlMJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFOiAnUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQUREX05FV19JVEVNOiAnUExBVEZPUk1fREFUQUdSSURfQUREX05FV19JVEVNJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0lURU06ICdQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfSVRFTScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTTogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTVM6ICdQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU1TJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFOiAnUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX1NVQ0NFU1M6ICdQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfU1VDQ0VTUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9GQUlMOiAnUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUwnLFxuICBQTEFURk9STV9EQVRBR1JJRF9FRElUX0NFTExfVkFMVUVfQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfRURJVF9DRUxMX1ZBTFVFX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFOiAnUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRVM6ICdQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRVMnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NFTExfSElERV9NRVNTQUdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfU0hPV19NRVNTQUdFOiAnUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfU0hPV19NRVNTQUdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfSElERV9NRVNTQUdFOiAnUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfSElERV9NRVNTQUdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfVkFMSURBVEU6ICdQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9WQUxJREFURScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0VMRUNUSU9OX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NFTExfU0VMRUNUSU9OX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0lURU1fU0VMRUNUSU9OX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX0lURU1fU0VMRUNUSU9OX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NFTEVDVF9BTExfSVRFTVNfQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DTEVBUl9TRUxFQ1RFRF9JVEVNUzogJ1BMQVRGT1JNX0RBVEFHUklEX0NMRUFSX1NFTEVDVEVEX0lURU1TJyxcbiAgUExBVEZPUk1fREFUQUdSSURfVE9HR0xFX0ZJTFRFUklORzogJ1BMQVRGT1JNX0RBVEFHUklEX1RPR0dMRV9GSUxURVJJTkcnLFxuICBQTEFURk9STV9EQVRBR1JJRF9GSUxURVJfREFUQV9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9GSUxURVJfREFUQV9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9GSUxURVJTOiAnUExBVEZPUk1fREFUQUdSSURfQVBQTFlfRklMVEVSUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NFVF9GSUxURVJTOiAnUExBVEZPUk1fREFUQUdSSURfU0VUX0ZJTFRFUlMnLFxuICBQTEFURk9STV9EQVRBR1JJRF9VUERBVEVfRVhJU1RJTkdfQ0VMTF9WQUxVRTogJ1BMQVRGT1JNX0RBVEFHUklEX1VQREFURV9FWElTVElOR19DRUxMX1ZBTFVFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0VUX0VESVRfREFUQTogJ1BMQVRGT1JNX0RBVEFHUklEX1NFVF9FRElUX0RBVEEnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfT1BFTjogJ1BMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9PUEVOJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX0NMT1NFOiAnUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX0NMT1NFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX1NBVkU6ICdQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfU0FWRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0ZPUkNFX1JFRlJFU0g6ICdQTEFURk9STV9EQVRBR1JJRF9GT1JDRV9SRUZSRVNIJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0VUX0ZPQ1VTX1RPOiAnUExBVEZPUk1fREFUQUdSSURfU0VUX0ZPQ1VTX1RPJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0VUX1BBR0U6ICdQTEFURk9STV9EQVRBR1JJRF9TRVRfUEFHRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NFVF9ST1dTX09OX1BBR0U6ICdQTEFURk9STV9EQVRBR1JJRF9TRVRfUk9XU19PTl9QQUdFJyxcbn07XG5cbmV4cG9ydCBjb25zdCBpbnZhbGlkYXRlID0gZ3JpZCA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9JTlZBTElEQVRFLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBmb3JjZVJlZnJlc2ggPSAoKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgLy8gRmlyZSByZXNpemUgZXZlbnQgdG8gcmVjYWxjdWxhdGUgY29tcG9uZW50IHNpemVzXG4gIC8vIGFuZCB0byBmb3JjZSByZWRyYXcgYWxsIG1vdW50ZWQgZ3JpZHNcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgaWYgKGRvY3VtZW50LmNyZWF0ZUV2ZW50KSB7XG4gICAgICBjb25zdCBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnSFRNTEV2ZW50cycpO1xuICAgICAgZXZ0LmluaXRFdmVudCgncmVzaXplJywgdHJ1ZSwgZmFsc2UpO1xuICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgICB9XG4gIH0sIDEpO1xuICBkaXNwYXRjaCh7IHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0ZPUkNFX1JFRlJFU0ggfSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0QnVzeSA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQlVTWSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0UmVhZHkgPSBncmlkID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFQURZLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBhcHBseUZpbHRlcnMgPSAoZ3JpZCwgY29sdW1ucykgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgaWYgKCFjb2x1bW5zIHx8ICFjb2x1bW5zLmZvckVhY2gpIHJldHVybiBmYWxzZTtcbiAgY29uc3QgZ3JpZERhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldChncmlkLmlkKTtcbiAgaWYgKCFncmlkRGF0YSkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBmaWx0ZXJEYXRhID0gZ3JpZERhdGEuZ2V0SW4oWydjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdmaWx0ZXJEYXRhJ10sIE1hcCgpKTtcbiAgY29uc3QgYWxsRGF0YSA9IGdyaWREYXRhLmdldCgnYWxsRGF0YScpO1xuICBzZXRCdXN5KGdyaWQpKGRpc3BhdGNoKTtcbiAgbGV0IGRhdGE7XG4gIGlmIChncmlkLnBhZ2luYXRpb24pIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoZmlsdGVyRGF0YS5pc0VtcHR5KCkpIHtcbiAgICBkYXRhID0gYWxsRGF0YTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBkYXRlRm9ybWF0ID0gVXRpbHMuZ2V0RGF0ZUZvcm1hdChncmlkLCBnZXRTdGF0ZSgpLnVzZXIpO1xuICAgIGRhdGEgPSBhbGxEYXRhLmZpbHRlcigocm93KSA9PiB7XG4gICAgICBsZXQgaGl0cyA9IDA7XG4gICAgICBmaWx0ZXJEYXRhLmZvckVhY2goKGZpbHRlclZhbHVlLCBmaWx0ZXJDb2x1bW4pID0+IHtcbiAgICAgICAgY29sdW1ucy5mb3JFYWNoKChjb2x1bW4pID0+IHtcbiAgICAgICAgICBpZiAoVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbHVtbikgPT09IGZpbHRlckNvbHVtbikge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSByb3cuZ2V0SW4oY29sdW1uLnZhbHVlS2V5UGF0aCk7XG4gICAgICAgICAgICBpZiAodmFsdWUgfHwgdmFsdWUgPT09IDAgfHwgdmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGZpbHRlck1hdGNoZXIgPSBVdGlscy5nZXRGaWx0ZXJNYXRjaGVyKGNvbHVtbiwgZGF0ZUZvcm1hdCk7XG4gICAgICAgICAgICAgIGlmIChmaWx0ZXJNYXRjaGVyKHJvdywgZmlsdGVyVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgaGl0cyArPSAxO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGhpdHMgPT09IGZpbHRlckRhdGEuc2l6ZTtcbiAgICB9KTtcbiAgfVxuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQVBQTFlfRklMVEVSUyxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBkYXRhLFxuICB9KTtcbiAgc2V0UmVhZHkoZ3JpZCkoZGlzcGF0Y2gpO1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXRBbmRBcHBseUZpbHRlcnMgPSAoZ3JpZCwgY29sdW1ucywgZGF0YSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIGNvbnN0IGZpbHRlcmluZ0RhdGEgPSBVdGlscy5ub3JtYWxpemVGaWx0ZXJpbmdEYXRhKGRhdGEpO1xuICBVdGlscy5zYXZlRmlsdGVyRGF0YShncmlkLCBmaWx0ZXJpbmdEYXRhLmdldCgnZmlsdGVyRGF0YScpKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NFVF9GSUxURVJTLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGZpbHRlcmluZ0RhdGEsXG4gIH0pO1xuICBkaXNwYXRjaChhcHBseUZpbHRlcnMoZ3JpZCwgY29sdW1ucykpO1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmV4cG9ydCBjb25zdCBmaWx0ZXJDZWxsVmFsdWVDaGFuZ2UgPSAoZ3JpZCwgY29sdW1ucywgY29sdW1uLCB2YWx1ZSkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgY29uc3Qgb3JpZ0ZpbHRlckRhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFxuICAgIFtncmlkLmlkLCAnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnZmlsdGVyRGF0YSddLFxuICAgIE1hcCgpLFxuICApO1xuICBjb25zdCBjb2x1bW5LZXkgPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sdW1uKTtcbiAgY29uc3QgdmFsdWVFbXB0eUNoZWNrZXIgPSBVdGlscy5nZXRWYWx1ZUVtcHR5Q2hlY2tlcihjb2x1bW4pO1xuICBsZXQgZmlsdGVyRGF0YTtcbiAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbHVlKSkge1xuICAgIGZpbHRlckRhdGEgPSBvcmlnRmlsdGVyRGF0YS5kZWxldGUoY29sdW1uS2V5KTtcbiAgfSBlbHNlIHtcbiAgICBmaWx0ZXJEYXRhID0gb3JpZ0ZpbHRlckRhdGEuc2V0KGNvbHVtbktleSwgdmFsdWUpO1xuICB9XG4gIFV0aWxzLnNhdmVGaWx0ZXJEYXRhKGdyaWQsIGZpbHRlckRhdGEpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfRklMVEVSX0RBVEFfQ0hBTkdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGZpbHRlckRhdGEsXG4gIH0pO1xuICBhcHBseUZpbHRlcnMoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbn07XG5cbmV4cG9ydCBjb25zdCBhcHBseVNvcnQgPSAoZ3JpZCwgY29sdW1ucykgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgaWYgKCFjb2x1bW5zIHx8ICFjb2x1bW5zLmZvckVhY2gpIHJldHVybiBmYWxzZTtcbiAgY29uc3QgZ3JpZERhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldChncmlkLmlkKTtcbiAgaWYgKCFncmlkRGF0YSkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBzb3J0RGF0YSA9IGdyaWREYXRhLmdldEluKFsnY29uZmlnJywgJ3NvcnRpbmdEYXRhJ10pO1xuICBpZiAoIXNvcnREYXRhKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IHNvcnRDb2x1bW4gPSBzb3J0RGF0YS5nZXQoJ3NvcnRDb2x1bW4nKTtcbiAgaWYgKCFzb3J0Q29sdW1uKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IHNvcnRPcmRlciA9IHNvcnREYXRhLmdldCgnc29ydE9yZGVyJywgJ2FzYycpO1xuICBsZXQgY29sdW1uO1xuICBjb2x1bW5zLmZvckVhY2goKGNvbCkgPT4ge1xuICAgIGlmIChVdGlscy5nZXRDb2x1bW5LZXkoY29sKSA9PT0gc29ydENvbHVtbikge1xuICAgICAgY29sdW1uID0gY29sO1xuICAgIH1cbiAgfSk7XG4gIGlmICghY29sdW1uKSByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKGdyaWQucGFnaW5hdGlvbikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHNldEJ1c3koZ3JpZCkoZGlzcGF0Y2gpO1xuXG4gIGNvbnN0IG9yaWdBbGxEYXRhID0gZ3JpZERhdGEuZ2V0KCdhbGxEYXRhJyk7XG4gIGNvbnN0IGNvbXBhcmF0b3IgPSBVdGlscy5nZXRTb3J0Q29tcGFyYXRvcihjb2x1bW4pO1xuICBjb25zdCB2YWx1ZUdldHRlciA9IFV0aWxzLmdldFNvcnRWYWx1ZUdldHRlcihjb2x1bW4pO1xuICBjb25zdCB2YWx1ZUVtcHR5Q2hlY2tlciA9IFV0aWxzLmdldFZhbHVlRW1wdHlDaGVja2VyKGNvbHVtbik7XG4gIGNvbnN0IGFsbERhdGEgPSBvcmlnQWxsRGF0YS5zb3J0KChhLCBiKSA9PiB7XG4gICAgY29uc3QgdmFsQSA9IHZhbHVlR2V0dGVyKGEpO1xuICAgIGNvbnN0IHZhbEIgPSB2YWx1ZUdldHRlcihiKTtcbiAgICBpZiAoc29ydE9yZGVyID09PSAnYXNjJykge1xuICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEEpKSByZXR1cm4gLTE7XG4gICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQikpIHJldHVybiAxO1xuICAgICAgcmV0dXJuIGNvbXBhcmF0b3IodmFsQSwgdmFsQik7XG4gICAgfVxuICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxBKSkgcmV0dXJuIDE7XG4gICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEIpKSByZXR1cm4gLTE7XG4gICAgcmV0dXJuIGNvbXBhcmF0b3IodmFsQiwgdmFsQSk7XG4gIH0pO1xuICBsZXQgZGF0YTtcbiAgLy8gU29ydCBhbHNvIGZpbHRlcmVkIGRhdGEgc2VwYXJhdGVseVxuICBpZiAoZ3JpZERhdGEuZ2V0SW4oWydjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdpc0ZpbHRlcmluZyddLCBmYWxzZSkpIHtcbiAgICBkYXRhID0gZ3JpZERhdGEuZ2V0KCdkYXRhJykuc29ydCgoYSwgYikgPT4ge1xuICAgICAgY29uc3QgdmFsQSA9IHZhbHVlR2V0dGVyKGEpO1xuICAgICAgY29uc3QgdmFsQiA9IHZhbHVlR2V0dGVyKGIpO1xuICAgICAgaWYgKHNvcnRPcmRlciA9PT0gJ2FzYycpIHtcbiAgICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEEpKSByZXR1cm4gLTE7XG4gICAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxCKSkgcmV0dXJuIDE7XG4gICAgICAgIHJldHVybiBjb21wYXJhdG9yKHZhbEEsIHZhbEIpO1xuICAgICAgfVxuICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEEpKSByZXR1cm4gMTtcbiAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxCKSkgcmV0dXJuIC0xO1xuICAgICAgcmV0dXJuIGNvbXBhcmF0b3IodmFsQiwgdmFsQSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgZGF0YSA9IGFsbERhdGE7XG4gIH1cbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0FQUExZX1NPUlQsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgZGF0YSxcbiAgICBhbGxEYXRhLFxuICB9KTtcbiAgc2V0UmVhZHkoZ3JpZCkoZGlzcGF0Y2gpO1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmV4cG9ydCBjb25zdCBzb3J0Q2hhbmdlID0gKGdyaWQsIGNvbHVtbnMsIGNvbHVtbiwgbmV3U29ydCkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgY29uc3Qgc29ydE9yZGVyID0gbmV3U29ydCB8fCAnYXNjJztcbiAgY29uc3Qgc29ydENvbHVtbiA9IFV0aWxzLmdldENvbHVtbktleShjb2x1bW4pO1xuICBVdGlscy5zYXZlU29ydERhdGEoZ3JpZCwgeyBzb3J0Q29sdW1uLCBzb3J0T3JkZXIgfSk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TT1JUX0NIQU5HRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBzb3J0Q29sdW1uLFxuICAgIHNvcnRPcmRlcixcbiAgfSk7XG4gIGFwcGx5U29ydChncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldERhdGEgPSAoZ3JpZCwgY29sdW1ucywgZGF0YSkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgVXRpbHMuY2hlY2tDb2x1bW5zUGFyYW0oY29sdW1ucyk7XG4gIGNvbnN0IGNvbmZpZ0RhdGEgPSBVdGlscy5sb2FkR3JpZENvbmZpZyhncmlkLCBjb2x1bW5zKTtcbiAgY29uc3QgaW1tdXRhYmxlRGF0YSA9IEltbXV0YWJsZS5JdGVyYWJsZS5pc0l0ZXJhYmxlKGRhdGEpID8gZGF0YSA6IEltbXV0YWJsZS5mcm9tSlMoZGF0YSk7XG4gIGNvbnN0IHNlbGVjdGVkSXRlbXMgPSBVdGlscy5sb2FkU2VsZWN0ZWRJdGVtcyhncmlkKS5maWx0ZXIoXG4gICAgaXRlbSA9PiAhIWltbXV0YWJsZURhdGEuZmluZChkYXRhSXRlbSA9PiBkYXRhSXRlbS5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGl0ZW0pLFxuICApO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX0RBVEEsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgZGF0YTogaW1tdXRhYmxlRGF0YSxcbiAgICBjb25maWc6IGNvbmZpZ0RhdGEsXG4gICAgc2VsZWN0ZWRJdGVtcyxcbiAgfSk7XG4gIGlmICghZ3JpZC5wYWdpbmF0aW9uKSB7XG4gICAgYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gICAgYXBwbHlTb3J0KGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZ3JpZERhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldChncmlkLmlkKTtcbiAgICBpZiAoIWdyaWREYXRhKSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3QgZmlsdGVyRGF0YSA9IGdyaWREYXRhLmdldEluKFsnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnZmlsdGVyRGF0YSddLCBNYXAoKSk7XG4gICAgaWYgKCFmaWx0ZXJEYXRhLmlzRW1wdHkoKSkge1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9BUFBMWV9GSUxURVJTLFxuICAgICAgICBpZDogZ3JpZC5pZCxcbiAgICAgICAgZGF0YTogaW1tdXRhYmxlRGF0YSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCBzb3J0RGF0YSA9IGdyaWREYXRhLmdldEluKFsnY29uZmlnJywgJ3NvcnRpbmdEYXRhJ10pO1xuICAgIGlmIChzb3J0RGF0YSkge1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9BUFBMWV9TT1JULFxuICAgICAgICBpZDogZ3JpZC5pZCxcbiAgICAgICAgZGF0YTogaW1tdXRhYmxlRGF0YSxcbiAgICAgICAgYWxsRGF0YTogaW1tdXRhYmxlRGF0YSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8qKlxuICogQWN0aW9uIHRvIHNldCBmb2N1cyB0byBlaXRoZXIgbGFzdCBlZGl0ZWRSb3csIGNyZWF0ZWRSb3cgb3IgdG8gdmFsaWRhdGlvbiBlcnJvclxuICogQHBhcmFtIHtPYmplY3R9IGdyaWRcbiAqIEBwYXJhbSB7U3RyaW5nfSBmb2N1c1RvVHlwZSAtIHR5cGUgb2YgZm9jdXMgcmVxdWVzdC4gUG9zc2libGUgdmFsdWVzOlxuICogJ2ZvY3VzVG9FZGl0Q2VsbCcgfHwgJ2ZvY3VzVG9FcnJvckNlbGwnIHx8ICdmb2N1c1RvQ3JlYXRlQ2VsbCdcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gZm9jdXNUb0xhc3RSb3cgLSBzZXRzIGZvY3VzIHRvIGxhc3QgZGF0YSByb3cgaW5zdGVhZCBvZiBzZWxlY3RlZCByb3dcbiAqL1xuZXhwb3J0IGNvbnN0IHNldEZvY3VzVG8gPSAoZ3JpZCwgZm9jdXNUbywgZm9jdXNUb0xhc3RSb3cgPSBmYWxzZSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX0ZPQ1VTX1RPLFxuICAgIGZvY3VzVG8sXG4gICAgZm9jdXNUb0xhc3RSb3csXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGV4dGVuZERhdGEgPSAoZ3JpZCwgY29sdW1ucywgZGF0YSwgcHJlcGVuZCA9IGZhbHNlKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBjb25zdCBpbW11dGFibGVEYXRhID0gSW1tdXRhYmxlLkl0ZXJhYmxlLmlzSXRlcmFibGUoZGF0YSkgPyBkYXRhIDogSW1tdXRhYmxlLmZyb21KUyhkYXRhKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0VYVEVORF9EQVRBLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGRhdGE6IGltbXV0YWJsZURhdGEsXG4gICAgcHJlcGVuZCxcbiAgfSk7XG4gIGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICBhcHBseVNvcnQoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbn07XG5cbmV4cG9ydCBjb25zdCByZXNpemVDb2x1bW4gPSAoZ3JpZCwgY29sdW1uS2V5LCB3aWR0aCkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgY29uc3QgY29sdW1uV2lkdGhzID0gZ2V0U3RhdGUoKVxuICAgIC5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ2NvbmZpZycsICdjb2x1bW5XaWR0aHMnXSwgTWFwKCkpXG4gICAgLnNldChjb2x1bW5LZXksIHdpZHRoKTtcbiAgVXRpbHMuc2F2ZUNvbHVtbldpZHRocyhncmlkLCBjb2x1bW5XaWR0aHMpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVTSVpFX0NPTFVNTixcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBjb2x1bW5XaWR0aHMsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGVkaXQgPSBncmlkID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0VESVQsXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGNhbmNlbCA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0FOQ0VMLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzYXZlID0gKGdyaWQsIGNiID0gKCkgPT4ge30pID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NBVkUsXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xuICBjYigpO1xufTtcblxuZXhwb3J0IGNvbnN0IHNhdmVTdWNjZXNzID0gKGdyaWQsIGNvbHVtbnMsIHNhdmVkSXRlbXMpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TQVZFX1NVQ0NFU1MsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgICBzYXZlZEl0ZW1zLFxuICB9KTtcbiAgYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gIGFwcGx5U29ydChncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xufTtcblxuZXhwb3J0IGNvbnN0IHNhdmVQYXJ0aWFsU3VjY2VzcyA9IChncmlkLCBjb2x1bW5zLCBzYXZlZEl0ZW1zKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0FWRV9QQVJUSUFMX1NVQ0NFU1MsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgICBzYXZlZEl0ZW1zLFxuICB9KTtcbiAgYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gIGFwcGx5U29ydChncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xufTtcblxuZXhwb3J0IGNvbnN0IHNhdmVGYWlsID0gZ3JpZCA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TQVZFX0ZBSUwsXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZSA9IChncmlkLCBjb2x1bW5EZWZhdWx0VmFsdWVzKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEUsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgY29sdW1uRGVmYXVsdFZhbHVlcyxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgYWRkTmV3SXRlbSA9IChncmlkLCBjb2x1bW5EZWZhdWx0VmFsdWVzKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9BRERfTkVXX0lURU0sXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgY29sdW1uRGVmYXVsdFZhbHVlcyxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlSXRlbSA9IChncmlkLCByb3dJZCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0lURU0sXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgICByb3dJZCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlTmV3SXRlbSA9IChncmlkLCBpbmRleCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGluZGV4LFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVOZXdJdGVtcyA9IChncmlkLCBpbmRleGVzKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU1TLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGluZGV4ZXMsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZSA9IChncmlkLCBjYiA9ICgpID0+IHt9KSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkUsXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xuICBjYigpO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZVN1Y2Nlc3MgPSAoZ3JpZCwgcmVtb3ZlZElkcykgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX1NVQ0NFU1MsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgICByZW1vdmVkSWRzLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVGYWlsID0gZ3JpZCA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfRkFJTCxcbiAgICBpZDogZ3JpZC5pZCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZWRpdENlbGxWYWx1ZUNoYW5nZSA9IChncmlkLCBkYXRhSWQsIGtleVBhdGgsIHZhbHVlKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9FRElUX0NFTExfVkFMVUVfQ0hBTkdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGRhdGFJZCxcbiAgICBrZXlQYXRoLFxuICAgIHZhbHVlLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBlZGl0Q2VsbFZhbHVlVmFsaWRhdGUgPSAoZ3JpZCwgZGF0YUlkLCBrZXlQYXRoLCB2YWx1ZSwgdmFsaWRhdG9ycyA9IFtdKSA9PiAoXG4gIGRpc3BhdGNoLFxuICBnZXRTdGF0ZSxcbikgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgbGV0IHZhbGlkYXRpb25TdGF0ZSA9IHsgdmFsaWQ6IHRydWUgfTtcbiAgdmFsaWRhdG9ycy5mb3JFYWNoKCh2YWxpZGF0b3IpID0+IHtcbiAgICBpZiAodmFsaWRhdGlvblN0YXRlLnZhbGlkKSB7XG4gICAgICBpZiAodmFsaWRhdG9yLnVuaXF1ZSkge1xuICAgICAgICBpZiAodmFsdWUgIT09ICcnIHx8IHZhbHVlICE9PSBudWxsIHx8IHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAvLyBjb21iaW5lIHJlYWwgZGF0YSB3aXRoIGN1cnJlbnQgdW5zYXZlZCBlZGl0ZWQgZGF0YVxuICAgICAgICAgIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG4gICAgICAgICAgY29uc3QgZWRpdERhdGEgPSBncmlkRGF0YS5nZXQoJ2VkaXREYXRhJyk7XG4gICAgICAgICAgbGV0IGFsbERhdGEgPSBncmlkRGF0YS5nZXQoJ2FsbERhdGEnKTtcbiAgICAgICAgICBpZiAoZWRpdERhdGEpIHtcbiAgICAgICAgICAgIGVkaXREYXRhLmZvckVhY2goKGVkaXREYXRhSXRlbSwgZWRpdERhdGFJdGVtSWQpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgZm91bmRJbmRleCA9IGFsbERhdGEuZmluZEluZGV4KGQgPT4gZC5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGVkaXREYXRhSXRlbUlkKTtcbiAgICAgICAgICAgICAgaWYgKGZvdW5kSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgYWxsRGF0YSA9IGFsbERhdGEubWVyZ2VEZWVwSW4oW2ZvdW5kSW5kZXhdLCBlZGl0RGF0YUl0ZW0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gZGV0ZXJtaW5lIHVuaXF1ZW5lc3NcbiAgICAgICAgICBjb25zdCBmaW5kaW5nID0gYWxsRGF0YS5maW5kKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoZ3JpZC5pZEtleVBhdGgubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIC8vIGRvbid0IHNlbGYgY29tcGFyZVxuICAgICAgICAgICAgICBpZiAoaXRlbS5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGRhdGFJZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uZ2V0SW4oa2V5UGF0aCkgPT09IHZhbHVlO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChmaW5kaW5nKSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB7XG4gICAgICAgICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgICAgICAgICAgbWVzc2FnZTogJ1ZhbGlkYXRpb24uVW5pcXVlJyxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHZhbGlkYXRvci52YWxpZGF0ZVdpdGhSb3dEYXRhKSB7XG4gICAgICAgIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG4gICAgICAgIGNvbnN0IGVkaXREYXRhID0gZ3JpZERhdGEuZ2V0SW4oWydlZGl0RGF0YScsIGRhdGFJZF0sIE1hcCgpKTtcbiAgICAgICAgbGV0IHJvd0RhdGEgPSBncmlkRGF0YS5nZXQoJ2FsbERhdGEnKS5maW5kKGl0ZW0gPT4gaXRlbS5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGRhdGFJZCk7XG4gICAgICAgIGlmIChyb3dEYXRhKSB7XG4gICAgICAgICAgcm93RGF0YSA9IHJvd0RhdGEubWVyZ2VEZWVwKGVkaXREYXRhKTtcbiAgICAgICAgICBjb25zdCBwYXJhbXMgPSB2YWxpZGF0b3IucGFyYW1zID8gT2JqZWN0LnZhbHVlcyh2YWxpZGF0b3IucGFyYW1zKSA6IFtdO1xuICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZVdpdGhSb3dEYXRhKHZhbHVlLCByb3dEYXRhLCAuLi5wYXJhbXMpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSB2YWxpZGF0b3IucGFyYW1zID8gT2JqZWN0LnZhbHVlcyh2YWxpZGF0b3IucGFyYW1zKSA6IFtdO1xuICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB2YWxpZGF0b3IudmFsaWRhdGUodmFsdWUsIC4uLnBhcmFtcyk7XG4gICAgICAgIGlmICh2YWxpZGF0b3IucGFyYW1zKSB7XG4gICAgICAgICAgdmFsaWRhdGlvblN0YXRlLm1lc3NhZ2VWYWx1ZXMgPSB2YWxpZGF0b3IucGFyYW1zO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgaWYgKHZhbGlkYXRpb25TdGF0ZS52YWxpZCkge1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfSElERV9NRVNTQUdFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBtZXNzYWdlVHlwZTogJ2Vycm9yJyxcbiAgICAgIGRhdGFJZCxcbiAgICAgIGtleVBhdGgsXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIG1lc3NhZ2VUeXBlOiAnZXJyb3InLFxuICAgICAgZGF0YUlkLFxuICAgICAga2V5UGF0aCxcbiAgICAgIG1lc3NhZ2VJZDogdmFsaWRhdGlvblN0YXRlLm1lc3NhZ2UsXG4gICAgICBtZXNzYWdlVmFsdWVzOiB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZVZhbHVlcyxcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gdmFsaWRhdGlvblN0YXRlLnZhbGlkO1xufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSA9IChncmlkLCByb3dJbmRleCwga2V5UGF0aCwgdmFsdWUpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX0NIQU5HRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICByb3dJbmRleCxcbiAgICBrZXlQYXRoLFxuICAgIHZhbHVlLFxuICB9KTtcbn07XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG5leHBvcnQgY29uc3QgY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUgPSAoZ3JpZCwgcm93SW5kZXgsIGtleVBhdGgsIHZhbHVlLCB2YWxpZGF0b3JzID0gW10pID0+IChcbiAgZGlzcGF0Y2gsXG4gIGdldFN0YXRlLFxuKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBsZXQgdmFsaWRhdGlvblN0YXRlID0geyB2YWxpZDogdHJ1ZSB9O1xuICB2YWxpZGF0b3JzLmZvckVhY2goKHZhbGlkYXRvcikgPT4ge1xuICAgIGlmICh2YWxpZGF0aW9uU3RhdGUudmFsaWQpIHtcbiAgICAgIGlmICh2YWxpZGF0b3IudW5pcXVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gJycgfHwgdmFsdWUgIT09IG51bGwgfHwgdmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGNvbnN0IGZpbmRpbmcgPSBnZXRTdGF0ZSgpXG4gICAgICAgICAgICAuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdhbGxEYXRhJ10pXG4gICAgICAgICAgICAuZmluZChpdGVtID0+IGl0ZW0uZ2V0SW4oa2V5UGF0aCkgPT09IHZhbHVlKTtcbiAgICAgICAgICBpZiAoZmluZGluZykge1xuICAgICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0ge1xuICAgICAgICAgICAgICB2YWxpZDogZmFsc2UsXG4gICAgICAgICAgICAgIG1lc3NhZ2U6ICdWYWxpZGF0aW9uLlVuaXF1ZScsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBmaW5kMiA9IGdldFN0YXRlKClcbiAgICAgICAgICAgICAgLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnY3JlYXRlRGF0YSddKVxuICAgICAgICAgICAgICAuZmluZCgoaXRlbSwgaSkgPT4gaSAhPT0gcm93SW5kZXggJiYgaXRlbS5nZXRJbihrZXlQYXRoKSA9PT0gdmFsdWUpO1xuICAgICAgICAgICAgaWYgKGZpbmQyKSB7XG4gICAgICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICB2YWxpZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ1ZhbGlkYXRpb24uVW5pcXVlJyxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodmFsaWRhdG9yLnZhbGlkYXRlV2l0aFJvd0RhdGEpIHtcbiAgICAgICAgY29uc3Qgcm93RGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdjcmVhdGVEYXRhJywgcm93SW5kZXhdKTtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gdmFsaWRhdG9yLnBhcmFtcyA/IE9iamVjdC52YWx1ZXModmFsaWRhdG9yLnBhcmFtcykgOiBbXTtcbiAgICAgICAgdmFsaWRhdGlvblN0YXRlID0gdmFsaWRhdG9yLnZhbGlkYXRlV2l0aFJvd0RhdGEodmFsdWUsIHJvd0RhdGEsIC4uLnBhcmFtcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSB2YWxpZGF0b3IucGFyYW1zID8gT2JqZWN0LnZhbHVlcyh2YWxpZGF0b3IucGFyYW1zKSA6IFtdO1xuICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB2YWxpZGF0b3IudmFsaWRhdGUodmFsdWUsIC4uLnBhcmFtcyk7XG4gICAgICAgIGlmICh2YWxpZGF0b3IucGFyYW1zKSB7XG4gICAgICAgICAgdmFsaWRhdGlvblN0YXRlLm1lc3NhZ2VWYWx1ZXMgPSB2YWxpZGF0b3IucGFyYW1zO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgaWYgKHZhbGlkYXRpb25TdGF0ZS52YWxpZCkge1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX0hJREVfTUVTU0FHRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgbWVzc2FnZVR5cGU6ICdlcnJvcicsXG4gICAgICByb3dJbmRleCxcbiAgICAgIGtleVBhdGgsXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfU0hPV19NRVNTQUdFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBtZXNzYWdlVHlwZTogJ2Vycm9yJyxcbiAgICAgIHJvd0luZGV4LFxuICAgICAga2V5UGF0aCxcbiAgICAgIG1lc3NhZ2VJZDogdmFsaWRhdGlvblN0YXRlLm1lc3NhZ2UsXG4gICAgICBtZXNzYWdlVmFsdWVzOiB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZVZhbHVlcyxcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gdmFsaWRhdGlvblN0YXRlLnZhbGlkO1xufTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbmV4cG9ydCBjb25zdCBjZWxsU2hvd01lc3NhZ2UgPSAoXG4gIGdyaWQsXG4gIG1lc3NhZ2VUeXBlLFxuICBkYXRhSWQsXG4gIGtleVBhdGgsXG4gIG1lc3NhZ2VJZCxcbiAgbWVzc2FnZVZhbHVlcyxcbikgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0UsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgbWVzc2FnZVR5cGUsXG4gICAgZGF0YUlkLFxuICAgIGtleVBhdGgsXG4gICAgbWVzc2FnZUlkLFxuICAgIG1lc3NhZ2VWYWx1ZXMsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGNlbGxTaG93TWVzc2FnZXMgPSAoZ3JpZCwgbWVzc2FnZXMpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFUyxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBtZXNzYWdlcyxcbiAgfSk7XG59O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuZXhwb3J0IGNvbnN0IGNlbGxIaWRlTWVzc2FnZSA9IChcbiAgZ3JpZCxcbiAgbWVzc2FnZVR5cGUgPSBudWxsLFxuICBkYXRhSWQgPSBudWxsLFxuICBrZXlQYXRoID0gbnVsbCxcbikgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0VMTF9ISURFX01FU1NBR0UsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgbWVzc2FnZVR5cGUsXG4gICAgZGF0YUlkLFxuICAgIGtleVBhdGgsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNlbGxTaG93TWVzc2FnZSA9IChcbiAgZ3JpZCxcbiAgbWVzc2FnZVR5cGUsXG4gIHJvd0luZGV4LFxuICBrZXlQYXRoLFxuICBtZXNzYWdlSWQsXG4gIG1lc3NhZ2VWYWx1ZXMsXG4pID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBtZXNzYWdlVHlwZSxcbiAgICByb3dJbmRleCxcbiAgICBrZXlQYXRoLFxuICAgIG1lc3NhZ2VJZCxcbiAgICBtZXNzYWdlVmFsdWVzLFxuICB9KTtcbn07XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG5leHBvcnQgY29uc3QgY3JlYXRlQ2VsbEhpZGVNZXNzYWdlID0gKFxuICBncmlkLFxuICBtZXNzYWdlVHlwZSA9IG51bGwsXG4gIHJvd0luZGV4ID0gbnVsbCxcbiAga2V5UGF0aCA9IG51bGwsXG4pID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX0hJREVfTUVTU0FHRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBtZXNzYWdlVHlwZSxcbiAgICByb3dJbmRleCxcbiAgICBrZXlQYXRoLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBjZWxsU2VsZWN0aW9uQ2hhbmdlID0gKGdyaWQsIHNlbGVjdGVkQ2VsbCA9IG51bGwpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHNlbGVjdGVkQ2VsbCxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX1NFTEVDVElPTl9DSEFOR0UsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGl0ZW1TZWxlY3Rpb25DaGFuZ2UgPSAoZ3JpZCwgcm93SW5kZXgsIGN0cmxQcmVzc2VkID0gZmFsc2UsIHNoaWZ0UHJlc3NlZCA9IGZhbHNlKSA9PiAoXG4gIGRpc3BhdGNoLFxuICBnZXRTdGF0ZSxcbikgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0lURU1fU0VMRUNUSU9OX0NIQU5HRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICByb3dJbmRleCxcbiAgICBpZEtleVBhdGg6IGdyaWQuaWRLZXlQYXRoLFxuICAgIGN0cmxQcmVzc2VkLFxuICAgIHNoaWZ0UHJlc3NlZCxcbiAgfSk7XG4gIFV0aWxzLnNhdmVTZWxlY3RlZEl0ZW1zKGdyaWQsIGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdzZWxlY3RlZEl0ZW1zJ10pKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZWxlY3RBbGxJdGVtc0NoYW5nZSA9IGdyaWQgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NFTEVDVF9BTExfSVRFTVNfQ0hBTkdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gIH0pO1xuICBVdGlscy5zYXZlU2VsZWN0ZWRJdGVtcyhncmlkLCBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnc2VsZWN0ZWRJdGVtcyddKSk7XG59O1xuXG5leHBvcnQgY29uc3QgY2xlYXJTZWxlY3RlZEl0ZW1zID0gZ3JpZCA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0xFQVJfU0VMRUNURURfSVRFTVMsXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xuICBVdGlscy5zYXZlU2VsZWN0ZWRJdGVtcyhncmlkLCBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnc2VsZWN0ZWRJdGVtcyddKSk7XG59O1xuXG5leHBvcnQgY29uc3QgdG9nZ2xlRmlsdGVyaW5nID0gZ3JpZCA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBjb25zdCBpc0ZpbHRlcmluZyA9ICFnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFxuICAgIFtncmlkLmlkLCAnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnaXNGaWx0ZXJpbmcnXSxcbiAgICBmYWxzZSxcbiAgKTtcbiAgVXRpbHMuc2F2ZUlzRmlsdGVyaW5nKGdyaWQsIGlzRmlsdGVyaW5nKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1RPR0dMRV9GSUxURVJJTkcsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgaXNGaWx0ZXJpbmcsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHZhbGlkYXRlRWRpdGVkUm93cyA9IChncmlkLCBjb2x1bW5zKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBjb25zdCBncmlkRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0KGdyaWQuaWQpO1xuICBjb25zdCBlZGl0RGF0YSA9IGdyaWREYXRhLmdldCgnZWRpdERhdGEnLCBNYXAoKSk7XG4gIGxldCBhbGxHb29kID0gdHJ1ZTtcbiAgZWRpdERhdGEuZm9yRWFjaCgoZWRpdERhdGFSb3csIGRhdGFJZCkgPT4ge1xuICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICBsZXQgdmFsdWUgPSBlZGl0RGF0YVJvdy5nZXRJbihjb2wudmFsdWVLZXlQYXRoKTtcbiAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlID0gZ3JpZERhdGFcbiAgICAgICAgICAuZ2V0KCdhbGxEYXRhJylcbiAgICAgICAgICAuZmluZChkYXRhID0+IGRhdGEuZ2V0SW4oZ3JpZC5pZEtleVBhdGgpID09PSBkYXRhSWQpXG4gICAgICAgICAgLmdldEluKGNvbC52YWx1ZUtleVBhdGgpO1xuICAgICAgfVxuICAgICAgY29uc3QgaXNWYWxpZCA9IGVkaXRDZWxsVmFsdWVWYWxpZGF0ZShncmlkLCBkYXRhSWQsIGNvbC52YWx1ZUtleVBhdGgsIHZhbHVlLCBjb2wudmFsaWRhdG9ycykoXG4gICAgICAgIGRpc3BhdGNoLFxuICAgICAgICBnZXRTdGF0ZSxcbiAgICAgICk7XG4gICAgICBpZiAoYWxsR29vZCAmJiAhaXNWYWxpZCkge1xuICAgICAgICBhbGxHb29kID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gYWxsR29vZDtcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVFbXB0eUNyZWF0ZWRSb3dzID0gKGdyaWQsIGNvbHVtbnMpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGNvbnN0IGNyZWF0ZURhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnY3JlYXRlRGF0YSddLCBNYXAoKSk7XG4gIGNvbnN0IGluZGV4ZXMgPSBbXTtcbiAgY3JlYXRlRGF0YS5mb3JFYWNoKChjcmVhdGVEYXRhUm93LCByb3dJbmRleCkgPT4ge1xuICAgIGxldCBpc0VtcHR5ID0gdHJ1ZTtcbiAgICBjb2x1bW5zLmZvckVhY2goKGNvbCkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSBjcmVhdGVEYXRhUm93LmdldEluKGNvbC52YWx1ZUtleVBhdGgpO1xuICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09ICcnICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIGlzRW1wdHkgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoaXNFbXB0eSkge1xuICAgICAgaW5kZXhlcy5wdXNoKHJvd0luZGV4KTtcbiAgICB9XG4gIH0pO1xuICBpZiAoaW5kZXhlcy5sZW5ndGggPiAwKSB7XG4gICAgcmVtb3ZlTmV3SXRlbXMoZ3JpZCwgaW5kZXhlcykoZGlzcGF0Y2gpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgdmFsaWRhdGVDcmVhdGVkUm93cyA9IChncmlkLCBjb2x1bW5zKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICByZW1vdmVFbXB0eUNyZWF0ZWRSb3dzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gIGNvbnN0IGNyZWF0ZURhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnY3JlYXRlRGF0YSddLCBNYXAoKSk7XG4gIGxldCBhbGxHb29kID0gdHJ1ZTtcbiAgY3JlYXRlRGF0YS5mb3JFYWNoKChjcmVhdGVEYXRhUm93LCByb3dJbmRleCkgPT4ge1xuICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGNyZWF0ZURhdGFSb3cuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG4gICAgICBjb25zdCBpc1ZhbGlkID0gY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUoXG4gICAgICAgIGdyaWQsXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICBjb2wudmFsdWVLZXlQYXRoLFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgY29sLnZhbGlkYXRvcnMsXG4gICAgICApKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gICAgICBpZiAoYWxsR29vZCAmJiAhaXNWYWxpZCkge1xuICAgICAgICBhbGxHb29kID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gYWxsR29vZDtcbn07XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVFeGlzdGluZ0NlbGxWYWx1ZSA9IChncmlkLCBkYXRhSWQsIGtleVBhdGgsIHZhbHVlKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9VUERBVEVfRVhJU1RJTkdfQ0VMTF9WQUxVRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBkYXRhSWQsXG4gICAga2V5UGF0aCxcbiAgICB2YWx1ZSxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0RWRpdERhdGEgPSAoZ3JpZCwgZGF0YSwgY2VsbE1lc3NhZ2VzID0gTWFwKCkpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIGRhdGEsXG4gICAgY2VsbE1lc3NhZ2VzLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NFVF9FRElUX0RBVEEsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IG9wZW5Db2x1bW5TZXR0aW5nc01vZGFsID0gZ3JpZCA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfT1BFTixcbiAgICBpZDogZ3JpZC5pZCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsID0gZ3JpZCA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfQ0xPU0UsXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNhdmVDb2x1bW5TZXR0aW5ncyA9IChncmlkLCBoaWRkZW5Db2x1bW5zLCBjb2x1bW5PcmRlcikgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBVdGlscy5zYXZlQ29sdW1uU2V0dGluZ3MoZ3JpZCwgaGlkZGVuQ29sdW1ucywgY29sdW1uT3JkZXIpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX1NBVkUsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgY29sdW1uT3JkZXIsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldFBhZ2UgPSAoZ3JpZCwgcGFnZSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLnNhdmVQYWdlKGdyaWQsIHBhZ2UpO1xuICBkaXNwYXRjaCh7XG4gICAgcGFnZSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfUEFHRSxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0Um93c09uUGFnZSA9IChncmlkLCByb3dzT25QYWdlKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuc2F2ZVJvd3NPblBhZ2UoZ3JpZCwgcm93c09uUGFnZSk7XG4gIGRpc3BhdGNoKHtcbiAgICByb3dzT25QYWdlLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NFVF9ST1dTX09OX1BBR0UsXG4gIH0pO1xufTtcbiJdfQ==