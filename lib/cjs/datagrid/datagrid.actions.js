"use strict";

exports.__esModule = true;
exports.setRowsOnPage = exports.setPage = exports.saveColumnSettings = exports.closeColumnSettingsModal = exports.openColumnSettingsModal = exports.setEditData = exports.updateExistingCellValue = exports.validateCreatedRows = exports.removeEmptyCreatedRows = exports.validateEditedRows = exports.toggleFiltering = exports.clearSelectedItems = exports.selectAllItemsChange = exports.itemSelectionChange = exports.cellSelectionChange = exports.createCellHideMessage = exports.createCellShowMessage = exports.cellHideMessage = exports.cellShowMessages = exports.cellShowMessage = exports.createCellValueValidate = exports.createCellValueChange = exports.editCellValueValidate = exports.editCellValueChange = exports.removeFail = exports.removeSuccess = exports.remove = exports.removeNewItems = exports.removeNewItem = exports.removeItem = exports.addNewItem = exports.create = exports.saveFail = exports.savePartialSuccess = exports.saveSuccess = exports.save = exports.cancel = exports.edit = exports.resizeColumn = exports.extendData = exports.setFocusTo = exports.setData = exports.sortChange = exports.applySort = exports.filterCellValueChange = exports.setAndApplyFilters = exports.applyFilters = exports.setReady = exports.setBusy = exports.forceRefresh = exports.invalidate = exports.TYPES = void 0;

var _immutable = _interopRequireWildcard(require("immutable"));

var _datagrid = _interopRequireDefault(require("./datagrid.utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
    var data;

    if (grid.pagination) {
      return true;
    }

    setBusy(grid)(dispatch);

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
      // The filterData might have property, which value is array (this happens when loaded from
      // session storage). In order to allow nested convertion of filterData and array type of
      // property to be converted to immutable list, the filterData must be object instead of map.
      filterData: filterData.toJS()
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
          // Custom validator function with rowData as parameters
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
        } else if (validator.validateWithGridData) {
          // Custom validator function with rowData and gridData as parameters
          var _gridData2 = getState().datagrid.get(grid.id);

          var _allData = _gridData2.get('allData', (0, _immutable.List)());

          var _editData2 = _gridData2.get('editData', (0, _immutable.Map)());

          _editData2.forEach(function (editRow, editKey) {
            var foundIndex = _allData.findIndex(function (d) {
              return d.getIn(grid.idKeyPath) === editKey;
            });

            if (foundIndex !== -1) {
              _allData = _allData.mergeDeepIn([foundIndex], editRow);
            }
          });

          var editRowData = _editData2.get(dataId, (0, _immutable.Map)());

          var _rowData = _allData.find(function (item) {
            return item.getIn(grid.idKeyPath) === dataId;
          });

          if (_rowData) {
            _rowData = _rowData.mergeDeep(editRowData);
          } else {
            _rowData = editRowData;
          }

          var _params = validator.params ? Object.values(validator.params) : [];

          validationState = validator.validateWithGridData.apply(validator, [value, _rowData, _allData].concat(_params));
        } else {
          var _params2 = validator.params ? Object.values(validator.params) : [];

          validationState = validator.validate.apply(validator, [value].concat(_params2));

          if (validator.params) {
            validationState.messageValues = validator.params;
          }
        }
      }
    });
    var cellMessage = getState().datagrid.getIn([grid.id, 'cellMessages', 'error', dataId].concat(keyPath));

    if (validationState.valid && cellMessage !== undefined) {
      dispatch({
        type: TYPES.PLATFORM_DATAGRID_CELL_HIDE_MESSAGE,
        id: grid.id,
        messageType: 'error',
        dataId: dataId,
        keyPath: keyPath
      });
    } else if (!validationState.valid) {
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
          var _params3 = validator.params ? Object.values(validator.params) : [];

          validationState = validator.validate.apply(validator, [value].concat(_params3));

          if (validator.params) {
            validationState.messageValues = validator.params;
          }
        }
      }
    });
    var createCellMessage = getState().datagrid.getIn([grid.id, 'createCellMessages', 'error', rowIndex].concat(keyPath));

    if (validationState.valid && createCellMessage !== undefined) {
      dispatch({
        type: TYPES.PLATFORM_DATAGRID_CREATE_CELL_HIDE_MESSAGE,
        id: grid.id,
        messageType: 'error',
        rowIndex: rowIndex,
        keyPath: keyPath
      });
    } else if (!validationState.valid) {
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
      grid: grid,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5hY3Rpb25zLmpzIl0sIm5hbWVzIjpbIlRZUEVTIiwiUExBVEZPUk1fREFUQUdSSURfSU5WQUxJREFURSIsIlBMQVRGT1JNX0RBVEFHUklEX0JVU1kiLCJQTEFURk9STV9EQVRBR1JJRF9SRUFEWSIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9EQVRBIiwiUExBVEZPUk1fREFUQUdSSURfQVBQTFlfU09SVCIsIlBMQVRGT1JNX0RBVEFHUklEX1NPUlRfQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfUkVTSVpFX0NPTFVNTiIsIlBMQVRGT1JNX0RBVEFHUklEX0VESVQiLCJQTEFURk9STV9EQVRBR1JJRF9DQU5DRUwiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFIiwiUExBVEZPUk1fREFUQUdSSURfRVhURU5EX0RBVEEiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFX1NVQ0NFU1MiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFX1BBUlRJQUxfU1VDQ0VTUyIsIlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfRkFJTCIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURSIsIlBMQVRGT1JNX0RBVEFHUklEX0FERF9ORVdfSVRFTSIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9JVEVNIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNUyIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRSIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9TVUNDRVNTIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUwiLCJQTEFURk9STV9EQVRBR1JJRF9FRElUX0NFTExfVkFMVUVfQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0UiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRVMiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX0hJREVfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX0NIQU5HRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX1ZBTElEQVRFIiwiUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TRUxFQ1RJT05fQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9DTEVBUl9TRUxFQ1RFRF9JVEVNUyIsIlBMQVRGT1JNX0RBVEFHUklEX1RPR0dMRV9GSUxURVJJTkciLCJQTEFURk9STV9EQVRBR1JJRF9GSUxURVJfREFUQV9DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9GSUxURVJTIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX0ZJTFRFUlMiLCJQTEFURk9STV9EQVRBR1JJRF9VUERBVEVfRVhJU1RJTkdfQ0VMTF9WQUxVRSIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9FRElUX0RBVEEiLCJQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfT1BFTiIsIlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFIiwiUExBVEZPUk1fREFUQUdSSURfRk9SQ0VfUkVGUkVTSCIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9GT0NVU19UTyIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9QQUdFIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX1JPV1NfT05fUEFHRSIsImludmFsaWRhdGUiLCJncmlkIiwiZGlzcGF0Y2giLCJVdGlscyIsImNoZWNrR3JpZFBhcmFtIiwidHlwZSIsImlkIiwiZm9yY2VSZWZyZXNoIiwic2V0VGltZW91dCIsImRvY3VtZW50IiwiY3JlYXRlRXZlbnQiLCJldnQiLCJpbml0RXZlbnQiLCJ3aW5kb3ciLCJkaXNwYXRjaEV2ZW50Iiwic2V0QnVzeSIsInNldFJlYWR5IiwiYXBwbHlGaWx0ZXJzIiwiY29sdW1ucyIsImdldFN0YXRlIiwiZm9yRWFjaCIsImdyaWREYXRhIiwiZGF0YWdyaWQiLCJnZXQiLCJmaWx0ZXJEYXRhIiwiZ2V0SW4iLCJhbGxEYXRhIiwiZGF0YSIsInBhZ2luYXRpb24iLCJpc0VtcHR5IiwiZGF0ZUZvcm1hdCIsImdldERhdGVGb3JtYXQiLCJ1c2VyIiwiZmlsdGVyIiwicm93IiwiaGl0cyIsImZpbHRlclZhbHVlIiwiZmlsdGVyQ29sdW1uIiwiY29sdW1uIiwiZ2V0Q29sdW1uS2V5IiwidmFsdWUiLCJ2YWx1ZUtleVBhdGgiLCJmaWx0ZXJNYXRjaGVyIiwiZ2V0RmlsdGVyTWF0Y2hlciIsInNpemUiLCJzZXRBbmRBcHBseUZpbHRlcnMiLCJmaWx0ZXJpbmdEYXRhIiwibm9ybWFsaXplRmlsdGVyaW5nRGF0YSIsInNhdmVGaWx0ZXJEYXRhIiwiZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlIiwib3JpZ0ZpbHRlckRhdGEiLCJjb2x1bW5LZXkiLCJ2YWx1ZUVtcHR5Q2hlY2tlciIsImdldFZhbHVlRW1wdHlDaGVja2VyIiwic2V0IiwidG9KUyIsImFwcGx5U29ydCIsInNvcnREYXRhIiwic29ydENvbHVtbiIsInNvcnRPcmRlciIsImNvbCIsIm9yaWdBbGxEYXRhIiwiY29tcGFyYXRvciIsImdldFNvcnRDb21wYXJhdG9yIiwidmFsdWVHZXR0ZXIiLCJnZXRTb3J0VmFsdWVHZXR0ZXIiLCJzb3J0IiwiYSIsImIiLCJ2YWxBIiwidmFsQiIsInNvcnRDaGFuZ2UiLCJuZXdTb3J0Iiwic2F2ZVNvcnREYXRhIiwic2V0RGF0YSIsImNoZWNrQ29sdW1uc1BhcmFtIiwiY29uZmlnRGF0YSIsImxvYWRHcmlkQ29uZmlnIiwiaW1tdXRhYmxlRGF0YSIsIkltbXV0YWJsZSIsIkl0ZXJhYmxlIiwiaXNJdGVyYWJsZSIsImZyb21KUyIsInNlbGVjdGVkSXRlbXMiLCJsb2FkU2VsZWN0ZWRJdGVtcyIsIml0ZW0iLCJmaW5kIiwiZGF0YUl0ZW0iLCJpZEtleVBhdGgiLCJjb25maWciLCJzZXRGb2N1c1RvIiwiZm9jdXNUbyIsImZvY3VzVG9MYXN0Um93IiwiZXh0ZW5kRGF0YSIsInByZXBlbmQiLCJyZXNpemVDb2x1bW4iLCJ3aWR0aCIsImNvbHVtbldpZHRocyIsInNhdmVDb2x1bW5XaWR0aHMiLCJlZGl0IiwiY2FuY2VsIiwic2F2ZSIsImNiIiwic2F2ZVN1Y2Nlc3MiLCJzYXZlZEl0ZW1zIiwic2F2ZVBhcnRpYWxTdWNjZXNzIiwic2F2ZUZhaWwiLCJjcmVhdGUiLCJjb2x1bW5EZWZhdWx0VmFsdWVzIiwiYWRkTmV3SXRlbSIsInJlbW92ZUl0ZW0iLCJyb3dJZCIsInJlbW92ZU5ld0l0ZW0iLCJpbmRleCIsInJlbW92ZU5ld0l0ZW1zIiwiaW5kZXhlcyIsInJlbW92ZSIsInJlbW92ZVN1Y2Nlc3MiLCJyZW1vdmVkSWRzIiwicmVtb3ZlRmFpbCIsImVkaXRDZWxsVmFsdWVDaGFuZ2UiLCJkYXRhSWQiLCJrZXlQYXRoIiwiZWRpdENlbGxWYWx1ZVZhbGlkYXRlIiwidmFsaWRhdG9ycyIsInZhbGlkYXRpb25TdGF0ZSIsInZhbGlkIiwidmFsaWRhdG9yIiwidW5pcXVlIiwidW5kZWZpbmVkIiwiZWRpdERhdGEiLCJlZGl0RGF0YUl0ZW0iLCJlZGl0RGF0YUl0ZW1JZCIsImZvdW5kSW5kZXgiLCJmaW5kSW5kZXgiLCJkIiwibWVyZ2VEZWVwSW4iLCJmaW5kaW5nIiwibGVuZ3RoIiwibWVzc2FnZSIsInZhbGlkYXRlV2l0aFJvd0RhdGEiLCJyb3dEYXRhIiwibWVyZ2VEZWVwIiwicGFyYW1zIiwiT2JqZWN0IiwidmFsdWVzIiwidmFsaWRhdGVXaXRoR3JpZERhdGEiLCJlZGl0Um93IiwiZWRpdEtleSIsImVkaXRSb3dEYXRhIiwidmFsaWRhdGUiLCJtZXNzYWdlVmFsdWVzIiwiY2VsbE1lc3NhZ2UiLCJtZXNzYWdlVHlwZSIsIm1lc3NhZ2VJZCIsImNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSIsInJvd0luZGV4IiwiY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUiLCJmaW5kMiIsImkiLCJjcmVhdGVDZWxsTWVzc2FnZSIsImNlbGxTaG93TWVzc2FnZSIsImNlbGxTaG93TWVzc2FnZXMiLCJtZXNzYWdlcyIsImNlbGxIaWRlTWVzc2FnZSIsImNyZWF0ZUNlbGxTaG93TWVzc2FnZSIsImNyZWF0ZUNlbGxIaWRlTWVzc2FnZSIsImNlbGxTZWxlY3Rpb25DaGFuZ2UiLCJzZWxlY3RlZENlbGwiLCJpdGVtU2VsZWN0aW9uQ2hhbmdlIiwiY3RybFByZXNzZWQiLCJzaGlmdFByZXNzZWQiLCJzYXZlU2VsZWN0ZWRJdGVtcyIsInNlbGVjdEFsbEl0ZW1zQ2hhbmdlIiwiY2xlYXJTZWxlY3RlZEl0ZW1zIiwidG9nZ2xlRmlsdGVyaW5nIiwiaXNGaWx0ZXJpbmciLCJzYXZlSXNGaWx0ZXJpbmciLCJ2YWxpZGF0ZUVkaXRlZFJvd3MiLCJhbGxHb29kIiwiZWRpdERhdGFSb3ciLCJpc1ZhbGlkIiwicmVtb3ZlRW1wdHlDcmVhdGVkUm93cyIsImNyZWF0ZURhdGEiLCJjcmVhdGVEYXRhUm93IiwicHVzaCIsInZhbGlkYXRlQ3JlYXRlZFJvd3MiLCJ1cGRhdGVFeGlzdGluZ0NlbGxWYWx1ZSIsInNldEVkaXREYXRhIiwiY2VsbE1lc3NhZ2VzIiwib3BlbkNvbHVtblNldHRpbmdzTW9kYWwiLCJjbG9zZUNvbHVtblNldHRpbmdzTW9kYWwiLCJzYXZlQ29sdW1uU2V0dGluZ3MiLCJoaWRkZW5Db2x1bW5zIiwiY29sdW1uT3JkZXIiLCJzZXRQYWdlIiwicGFnZSIsInNhdmVQYWdlIiwic2V0Um93c09uUGFnZSIsInJvd3NPblBhZ2UiLCJzYXZlUm93c09uUGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7QUFFTyxJ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QzhDO0FBSEwsS0FBRCxDQUFSO0FBS0QsR0FQc0I7QUFBQSxDQUFoQjs7OztBQVNBLElBQU13TSxhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLENBQUNyTSxJQUFELEVBQU9zTSxVQUFQO0FBQUEsU0FBc0IsVUFBQ3JNLFFBQUQsRUFBYztBQUMvREMseUJBQU1xTSxjQUFOLENBQXFCdk0sSUFBckIsRUFBMkJzTSxVQUEzQjs7QUFDQXJNLElBQUFBLFFBQVEsQ0FBQztBQUNQcU0sTUFBQUEsVUFBVSxFQUFWQSxVQURPO0FBRVBqTSxNQUFBQSxFQUFFLEVBQUVMLElBQUksQ0FBQ0ssRUFGRjtBQUdQRCxNQUFBQSxJQUFJLEVBQUVyRCxLQUFLLENBQUMrQztBQUhMLEtBQUQsQ0FBUjtBQUtELEdBUDRCO0FBQUEsQ0FBdEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSW1tdXRhYmxlLCB7IE1hcCwgTGlzdCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9kYXRhZ3JpZC51dGlscyc7XG5cbmV4cG9ydCBjb25zdCBUWVBFUyA9IHtcbiAgUExBVEZPUk1fREFUQUdSSURfSU5WQUxJREFURTogJ1BMQVRGT1JNX0RBVEFHUklEX0lOVkFMSURBVEUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9CVVNZOiAnUExBVEZPUk1fREFUQUdSSURfQlVTWScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFQURZOiAnUExBVEZPUk1fREFUQUdSSURfUkVBRFknLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRVRfREFUQTogJ1BMQVRGT1JNX0RBVEFHUklEX1NFVF9EQVRBJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQVBQTFlfU09SVDogJ1BMQVRGT1JNX0RBVEFHUklEX0FQUExZX1NPUlQnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TT1JUX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX1NPUlRfQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVTSVpFX0NPTFVNTjogJ1BMQVRGT1JNX0RBVEFHUklEX1JFU0laRV9DT0xVTU4nLFxuICBQTEFURk9STV9EQVRBR1JJRF9FRElUOiAnUExBVEZPUk1fREFUQUdSSURfRURJVCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NBTkNFTDogJ1BMQVRGT1JNX0RBVEFHUklEX0NBTkNFTCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NBVkU6ICdQTEFURk9STV9EQVRBR1JJRF9TQVZFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfRVhURU5EX0RBVEE6ICdQTEFURk9STV9EQVRBR1JJRF9FWFRFTkRfREFUQScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NBVkVfU1VDQ0VTUzogJ1BMQVRGT1JNX0RBVEFHUklEX1NBVkVfU1VDQ0VTUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NBVkVfUEFSVElBTF9TVUNDRVNTOiAnUExBVEZPUk1fREFUQUdSSURfU0FWRV9QQVJUSUFMX1NVQ0NFU1MnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TQVZFX0ZBSUw6ICdQTEFURk9STV9EQVRBR1JJRF9TQVZFX0ZBSUwnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEU6ICdQTEFURk9STV9EQVRBR1JJRF9DUkVBVEUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9BRERfTkVXX0lURU06ICdQTEFURk9STV9EQVRBR1JJRF9BRERfTkVXX0lURU0nLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfSVRFTTogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9JVEVNJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNOiAnUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNUzogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTVMnLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkU6ICdQTEFURk9STV9EQVRBR1JJRF9SRU1PVkUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfU1VDQ0VTUzogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9TVUNDRVNTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUw6ICdQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfRkFJTCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0VESVRfQ0VMTF9WQUxVRV9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9FRElUX0NFTExfVkFMVUVfQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFUzogJ1BMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NFTExfSElERV9NRVNTQUdFOiAnUExBVEZPUk1fREFUQUdSSURfQ0VMTF9ISURFX01FU1NBR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9TSE9XX01FU1NBR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9TSE9XX01FU1NBR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9ISURFX01FU1NBR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9ISURFX01FU1NBR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9WQUxJREFURTogJ1BMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX1ZBTElEQVRFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TRUxFQ1RJT05fQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TRUxFQ1RJT05fQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9TRUxFQ1RfQUxMX0lURU1TX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NMRUFSX1NFTEVDVEVEX0lURU1TOiAnUExBVEZPUk1fREFUQUdSSURfQ0xFQVJfU0VMRUNURURfSVRFTVMnLFxuICBQTEFURk9STV9EQVRBR1JJRF9UT0dHTEVfRklMVEVSSU5HOiAnUExBVEZPUk1fREFUQUdSSURfVE9HR0xFX0ZJTFRFUklORycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0ZJTFRFUl9EQVRBX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX0ZJTFRFUl9EQVRBX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0FQUExZX0ZJTFRFUlM6ICdQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9GSUxURVJTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0VUX0ZJTFRFUlM6ICdQTEFURk9STV9EQVRBR1JJRF9TRVRfRklMVEVSUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1VQREFURV9FWElTVElOR19DRUxMX1ZBTFVFOiAnUExBVEZPUk1fREFUQUdSSURfVVBEQVRFX0VYSVNUSU5HX0NFTExfVkFMVUUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRVRfRURJVF9EQVRBOiAnUExBVEZPUk1fREFUQUdSSURfU0VUX0VESVRfREFUQScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9PUEVOOiAnUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX09QRU4nLFxuICBQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfQ0xPU0U6ICdQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfQ0xPU0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfU0FWRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfRk9SQ0VfUkVGUkVTSDogJ1BMQVRGT1JNX0RBVEFHUklEX0ZPUkNFX1JFRlJFU0gnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRVRfRk9DVVNfVE86ICdQTEFURk9STV9EQVRBR1JJRF9TRVRfRk9DVVNfVE8nLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRVRfUEFHRTogJ1BMQVRGT1JNX0RBVEFHUklEX1NFVF9QQUdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0VUX1JPV1NfT05fUEFHRTogJ1BMQVRGT1JNX0RBVEFHUklEX1NFVF9ST1dTX09OX1BBR0UnLFxufTtcblxuZXhwb3J0IGNvbnN0IGludmFsaWRhdGUgPSBncmlkID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0lOVkFMSURBVEUsXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGZvcmNlUmVmcmVzaCA9ICgpID0+IChkaXNwYXRjaCkgPT4ge1xuICAvLyBGaXJlIHJlc2l6ZSBldmVudCB0byByZWNhbGN1bGF0ZSBjb21wb25lbnQgc2l6ZXNcbiAgLy8gYW5kIHRvIGZvcmNlIHJlZHJhdyBhbGwgbW91bnRlZCBncmlkc1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBpZiAoZG9jdW1lbnQuY3JlYXRlRXZlbnQpIHtcbiAgICAgIGNvbnN0IGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdIVE1MRXZlbnRzJyk7XG4gICAgICBldnQuaW5pdEV2ZW50KCdyZXNpemUnLCB0cnVlLCBmYWxzZSk7XG4gICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChldnQpO1xuICAgIH1cbiAgfSwgMSk7XG4gIGRpc3BhdGNoKHsgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfRk9SQ0VfUkVGUkVTSCB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXRCdXN5ID0gZ3JpZCA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9CVVNZLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXRSZWFkeSA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVBRFksXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGFwcGx5RmlsdGVycyA9IChncmlkLCBjb2x1bW5zKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBpZiAoIWNvbHVtbnMgfHwgIWNvbHVtbnMuZm9yRWFjaCkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBncmlkRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0KGdyaWQuaWQpO1xuICBpZiAoIWdyaWREYXRhKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IGZpbHRlckRhdGEgPSBncmlkRGF0YS5nZXRJbihbJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2ZpbHRlckRhdGEnXSwgTWFwKCkpO1xuICBjb25zdCBhbGxEYXRhID0gZ3JpZERhdGEuZ2V0KCdhbGxEYXRhJyk7XG4gIGxldCBkYXRhO1xuICBpZiAoZ3JpZC5wYWdpbmF0aW9uKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgc2V0QnVzeShncmlkKShkaXNwYXRjaCk7XG4gIGlmIChmaWx0ZXJEYXRhLmlzRW1wdHkoKSkge1xuICAgIGRhdGEgPSBhbGxEYXRhO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IGRhdGVGb3JtYXQgPSBVdGlscy5nZXREYXRlRm9ybWF0KGdyaWQsIGdldFN0YXRlKCkudXNlcik7XG4gICAgZGF0YSA9IGFsbERhdGEuZmlsdGVyKChyb3cpID0+IHtcbiAgICAgIGxldCBoaXRzID0gMDtcbiAgICAgIGZpbHRlckRhdGEuZm9yRWFjaCgoZmlsdGVyVmFsdWUsIGZpbHRlckNvbHVtbikgPT4ge1xuICAgICAgICBjb2x1bW5zLmZvckVhY2goKGNvbHVtbikgPT4ge1xuICAgICAgICAgIGlmIChVdGlscy5nZXRDb2x1bW5LZXkoY29sdW1uKSA9PT0gZmlsdGVyQ29sdW1uKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHJvdy5nZXRJbihjb2x1bW4udmFsdWVLZXlQYXRoKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSB8fCB2YWx1ZSA9PT0gMCB8fCB2YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgY29uc3QgZmlsdGVyTWF0Y2hlciA9IFV0aWxzLmdldEZpbHRlck1hdGNoZXIoY29sdW1uLCBkYXRlRm9ybWF0KTtcbiAgICAgICAgICAgICAgaWYgKGZpbHRlck1hdGNoZXIocm93LCBmaWx0ZXJWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBoaXRzICs9IDE7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gaGl0cyA9PT0gZmlsdGVyRGF0YS5zaXplO1xuICAgIH0pO1xuICB9XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9BUFBMWV9GSUxURVJTLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGRhdGEsXG4gIH0pO1xuICBzZXRSZWFkeShncmlkKShkaXNwYXRjaCk7XG4gIHJldHVybiB0cnVlO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldEFuZEFwcGx5RmlsdGVycyA9IChncmlkLCBjb2x1bW5zLCBkYXRhKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgY29uc3QgZmlsdGVyaW5nRGF0YSA9IFV0aWxzLm5vcm1hbGl6ZUZpbHRlcmluZ0RhdGEoZGF0YSk7XG4gIFV0aWxzLnNhdmVGaWx0ZXJEYXRhKGdyaWQsIGZpbHRlcmluZ0RhdGEuZ2V0KCdmaWx0ZXJEYXRhJykpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX0ZJTFRFUlMsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgZmlsdGVyaW5nRGF0YSxcbiAgfSk7XG4gIGRpc3BhdGNoKGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKSk7XG4gIHJldHVybiB0cnVlO1xufTtcblxuZXhwb3J0IGNvbnN0IGZpbHRlckNlbGxWYWx1ZUNoYW5nZSA9IChncmlkLCBjb2x1bW5zLCBjb2x1bW4sIHZhbHVlKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBjb25zdCBvcmlnRmlsdGVyRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oXG4gICAgW2dyaWQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdmaWx0ZXJEYXRhJ10sXG4gICAgTWFwKCksXG4gICk7XG4gIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2x1bW4pO1xuICBjb25zdCB2YWx1ZUVtcHR5Q2hlY2tlciA9IFV0aWxzLmdldFZhbHVlRW1wdHlDaGVja2VyKGNvbHVtbik7XG4gIGxldCBmaWx0ZXJEYXRhO1xuICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsdWUpKSB7XG4gICAgZmlsdGVyRGF0YSA9IG9yaWdGaWx0ZXJEYXRhLmRlbGV0ZShjb2x1bW5LZXkpO1xuICB9IGVsc2Uge1xuICAgIGZpbHRlckRhdGEgPSBvcmlnRmlsdGVyRGF0YS5zZXQoY29sdW1uS2V5LCB2YWx1ZSk7XG4gIH1cbiAgVXRpbHMuc2F2ZUZpbHRlckRhdGEoZ3JpZCwgZmlsdGVyRGF0YSk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9GSUxURVJfREFUQV9DSEFOR0UsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgLy8gVGhlIGZpbHRlckRhdGEgbWlnaHQgaGF2ZSBwcm9wZXJ0eSwgd2hpY2ggdmFsdWUgaXMgYXJyYXkgKHRoaXMgaGFwcGVucyB3aGVuIGxvYWRlZCBmcm9tXG4gICAgLy8gc2Vzc2lvbiBzdG9yYWdlKS4gSW4gb3JkZXIgdG8gYWxsb3cgbmVzdGVkIGNvbnZlcnRpb24gb2YgZmlsdGVyRGF0YSBhbmQgYXJyYXkgdHlwZSBvZlxuICAgIC8vIHByb3BlcnR5IHRvIGJlIGNvbnZlcnRlZCB0byBpbW11dGFibGUgbGlzdCwgdGhlIGZpbHRlckRhdGEgbXVzdCBiZSBvYmplY3QgaW5zdGVhZCBvZiBtYXAuXG4gICAgZmlsdGVyRGF0YTogZmlsdGVyRGF0YS50b0pTKCksXG4gIH0pO1xuICBhcHBseUZpbHRlcnMoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbn07XG5cbmV4cG9ydCBjb25zdCBhcHBseVNvcnQgPSAoZ3JpZCwgY29sdW1ucykgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgaWYgKCFjb2x1bW5zIHx8ICFjb2x1bW5zLmZvckVhY2gpIHJldHVybiBmYWxzZTtcbiAgY29uc3QgZ3JpZERhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldChncmlkLmlkKTtcbiAgaWYgKCFncmlkRGF0YSkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBzb3J0RGF0YSA9IGdyaWREYXRhLmdldEluKFsnY29uZmlnJywgJ3NvcnRpbmdEYXRhJ10pO1xuICBpZiAoIXNvcnREYXRhKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IHNvcnRDb2x1bW4gPSBzb3J0RGF0YS5nZXQoJ3NvcnRDb2x1bW4nKTtcbiAgaWYgKCFzb3J0Q29sdW1uKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IHNvcnRPcmRlciA9IHNvcnREYXRhLmdldCgnc29ydE9yZGVyJywgJ2FzYycpO1xuICBsZXQgY29sdW1uO1xuICBjb2x1bW5zLmZvckVhY2goKGNvbCkgPT4ge1xuICAgIGlmIChVdGlscy5nZXRDb2x1bW5LZXkoY29sKSA9PT0gc29ydENvbHVtbikge1xuICAgICAgY29sdW1uID0gY29sO1xuICAgIH1cbiAgfSk7XG4gIGlmICghY29sdW1uKSByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKGdyaWQucGFnaW5hdGlvbikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgc2V0QnVzeShncmlkKShkaXNwYXRjaCk7XG4gIGNvbnN0IG9yaWdBbGxEYXRhID0gZ3JpZERhdGEuZ2V0KCdhbGxEYXRhJyk7XG4gIGNvbnN0IGNvbXBhcmF0b3IgPSBVdGlscy5nZXRTb3J0Q29tcGFyYXRvcihjb2x1bW4pO1xuICBjb25zdCB2YWx1ZUdldHRlciA9IFV0aWxzLmdldFNvcnRWYWx1ZUdldHRlcihjb2x1bW4pO1xuICBjb25zdCB2YWx1ZUVtcHR5Q2hlY2tlciA9IFV0aWxzLmdldFZhbHVlRW1wdHlDaGVja2VyKGNvbHVtbik7XG4gIGNvbnN0IGFsbERhdGEgPSBvcmlnQWxsRGF0YS5zb3J0KChhLCBiKSA9PiB7XG4gICAgY29uc3QgdmFsQSA9IHZhbHVlR2V0dGVyKGEpO1xuICAgIGNvbnN0IHZhbEIgPSB2YWx1ZUdldHRlcihiKTtcbiAgICBpZiAoc29ydE9yZGVyID09PSAnYXNjJykge1xuICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEEpKSByZXR1cm4gLTE7XG4gICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQikpIHJldHVybiAxO1xuICAgICAgcmV0dXJuIGNvbXBhcmF0b3IodmFsQSwgdmFsQik7XG4gICAgfVxuICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxBKSkgcmV0dXJuIDE7XG4gICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEIpKSByZXR1cm4gLTE7XG4gICAgcmV0dXJuIGNvbXBhcmF0b3IodmFsQiwgdmFsQSk7XG4gIH0pO1xuICBsZXQgZGF0YTtcbiAgLy8gU29ydCBhbHNvIGZpbHRlcmVkIGRhdGEgc2VwYXJhdGVseVxuICBpZiAoZ3JpZERhdGEuZ2V0SW4oWydjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdpc0ZpbHRlcmluZyddLCBmYWxzZSkpIHtcbiAgICBkYXRhID0gZ3JpZERhdGEuZ2V0KCdkYXRhJykuc29ydCgoYSwgYikgPT4ge1xuICAgICAgY29uc3QgdmFsQSA9IHZhbHVlR2V0dGVyKGEpO1xuICAgICAgY29uc3QgdmFsQiA9IHZhbHVlR2V0dGVyKGIpO1xuICAgICAgaWYgKHNvcnRPcmRlciA9PT0gJ2FzYycpIHtcbiAgICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEEpKSByZXR1cm4gLTE7XG4gICAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxCKSkgcmV0dXJuIDE7XG4gICAgICAgIHJldHVybiBjb21wYXJhdG9yKHZhbEEsIHZhbEIpO1xuICAgICAgfVxuICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEEpKSByZXR1cm4gMTtcbiAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxCKSkgcmV0dXJuIC0xO1xuICAgICAgcmV0dXJuIGNvbXBhcmF0b3IodmFsQiwgdmFsQSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgZGF0YSA9IGFsbERhdGE7XG4gIH1cbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0FQUExZX1NPUlQsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgZGF0YSxcbiAgICBhbGxEYXRhLFxuICB9KTtcbiAgc2V0UmVhZHkoZ3JpZCkoZGlzcGF0Y2gpO1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmV4cG9ydCBjb25zdCBzb3J0Q2hhbmdlID0gKGdyaWQsIGNvbHVtbnMsIGNvbHVtbiwgbmV3U29ydCkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgY29uc3Qgc29ydE9yZGVyID0gbmV3U29ydCB8fCAnYXNjJztcbiAgY29uc3Qgc29ydENvbHVtbiA9IFV0aWxzLmdldENvbHVtbktleShjb2x1bW4pO1xuICBVdGlscy5zYXZlU29ydERhdGEoZ3JpZCwgeyBzb3J0Q29sdW1uLCBzb3J0T3JkZXIgfSk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TT1JUX0NIQU5HRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBzb3J0Q29sdW1uLFxuICAgIHNvcnRPcmRlcixcbiAgfSk7XG4gIGFwcGx5U29ydChncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldERhdGEgPSAoZ3JpZCwgY29sdW1ucywgZGF0YSkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgVXRpbHMuY2hlY2tDb2x1bW5zUGFyYW0oY29sdW1ucyk7XG4gIGNvbnN0IGNvbmZpZ0RhdGEgPSBVdGlscy5sb2FkR3JpZENvbmZpZyhncmlkLCBjb2x1bW5zKTtcbiAgY29uc3QgaW1tdXRhYmxlRGF0YSA9IEltbXV0YWJsZS5JdGVyYWJsZS5pc0l0ZXJhYmxlKGRhdGEpID8gZGF0YSA6IEltbXV0YWJsZS5mcm9tSlMoZGF0YSk7XG4gIGNvbnN0IHNlbGVjdGVkSXRlbXMgPSBVdGlscy5sb2FkU2VsZWN0ZWRJdGVtcyhncmlkKS5maWx0ZXIoXG4gICAgaXRlbSA9PiAhIWltbXV0YWJsZURhdGEuZmluZChkYXRhSXRlbSA9PiBkYXRhSXRlbS5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGl0ZW0pLFxuICApO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX0RBVEEsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgZGF0YTogaW1tdXRhYmxlRGF0YSxcbiAgICBjb25maWc6IGNvbmZpZ0RhdGEsXG4gICAgc2VsZWN0ZWRJdGVtcyxcbiAgfSk7XG4gIGlmICghZ3JpZC5wYWdpbmF0aW9uKSB7XG4gICAgYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gICAgYXBwbHlTb3J0KGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59O1xuXG4vKipcbiAqIEFjdGlvbiB0byBzZXQgZm9jdXMgdG8gZWl0aGVyIGxhc3QgZWRpdGVkUm93LCBjcmVhdGVkUm93IG9yIHRvIHZhbGlkYXRpb24gZXJyb3JcbiAqIEBwYXJhbSB7T2JqZWN0fSBncmlkXG4gKiBAcGFyYW0ge1N0cmluZ30gZm9jdXNUb1R5cGUgLSB0eXBlIG9mIGZvY3VzIHJlcXVlc3QuIFBvc3NpYmxlIHZhbHVlczpcbiAqICdmb2N1c1RvRWRpdENlbGwnIHx8ICdmb2N1c1RvRXJyb3JDZWxsJyB8fCAnZm9jdXNUb0NyZWF0ZUNlbGwnXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGZvY3VzVG9MYXN0Um93IC0gc2V0cyBmb2N1cyB0byBsYXN0IGRhdGEgcm93IGluc3RlYWQgb2Ygc2VsZWN0ZWQgcm93XG4gKi9cbmV4cG9ydCBjb25zdCBzZXRGb2N1c1RvID0gKGdyaWQsIGZvY3VzVG8sIGZvY3VzVG9MYXN0Um93ID0gZmFsc2UpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NFVF9GT0NVU19UTyxcbiAgICBmb2N1c1RvLFxuICAgIGZvY3VzVG9MYXN0Um93LFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBleHRlbmREYXRhID0gKGdyaWQsIGNvbHVtbnMsIGRhdGEsIHByZXBlbmQgPSBmYWxzZSkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgY29uc3QgaW1tdXRhYmxlRGF0YSA9IEltbXV0YWJsZS5JdGVyYWJsZS5pc0l0ZXJhYmxlKGRhdGEpID8gZGF0YSA6IEltbXV0YWJsZS5mcm9tSlMoZGF0YSk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9FWFRFTkRfREFUQSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBkYXRhOiBpbW11dGFibGVEYXRhLFxuICAgIHByZXBlbmQsXG4gIH0pO1xuICBhcHBseUZpbHRlcnMoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgYXBwbHlTb3J0KGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVzaXplQ29sdW1uID0gKGdyaWQsIGNvbHVtbktleSwgd2lkdGgpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGNvbnN0IGNvbHVtbldpZHRocyA9IGdldFN0YXRlKClcbiAgICAuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdjb25maWcnLCAnY29sdW1uV2lkdGhzJ10sIE1hcCgpKVxuICAgIC5zZXQoY29sdW1uS2V5LCB3aWR0aCk7XG4gIFV0aWxzLnNhdmVDb2x1bW5XaWR0aHMoZ3JpZCwgY29sdW1uV2lkdGhzKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFU0laRV9DT0xVTU4sXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgY29sdW1uV2lkdGhzLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBlZGl0ID0gZ3JpZCA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9FRElULFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBjYW5jZWwgPSBncmlkID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NBTkNFTCxcbiAgICBpZDogZ3JpZC5pZCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2F2ZSA9IChncmlkLCBjYiA9ICgpID0+IHt9KSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TQVZFLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbiAgY2IoKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzYXZlU3VjY2VzcyA9IChncmlkLCBjb2x1bW5zLCBzYXZlZEl0ZW1zKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0FWRV9TVUNDRVNTLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgc2F2ZWRJdGVtcyxcbiAgfSk7XG4gIGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICBhcHBseVNvcnQoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzYXZlUGFydGlhbFN1Y2Nlc3MgPSAoZ3JpZCwgY29sdW1ucywgc2F2ZWRJdGVtcykgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfUEFSVElBTF9TVUNDRVNTLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgc2F2ZWRJdGVtcyxcbiAgfSk7XG4gIGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICBhcHBseVNvcnQoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzYXZlRmFpbCA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0FWRV9GQUlMLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGUgPSAoZ3JpZCwgY29sdW1uRGVmYXVsdFZhbHVlcykgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGNvbHVtbkRlZmF1bHRWYWx1ZXMsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGFkZE5ld0l0ZW0gPSAoZ3JpZCwgY29sdW1uRGVmYXVsdFZhbHVlcykgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQUREX05FV19JVEVNLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGNvbHVtbkRlZmF1bHRWYWx1ZXMsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZUl0ZW0gPSAoZ3JpZCwgcm93SWQpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9JVEVNLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgcm93SWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZU5ld0l0ZW0gPSAoZ3JpZCwgaW5kZXgpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBpbmRleCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlTmV3SXRlbXMgPSAoZ3JpZCwgaW5kZXhlcykgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNUyxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBpbmRleGVzLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmUgPSAoZ3JpZCwgY2IgPSAoKSA9PiB7fSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbiAgY2IoKTtcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVTdWNjZXNzID0gKGdyaWQsIHJlbW92ZWRJZHMpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9TVUNDRVNTLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgcmVtb3ZlZElkcyxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlRmFpbCA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUwsXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGVkaXRDZWxsVmFsdWVDaGFuZ2UgPSAoZ3JpZCwgZGF0YUlkLCBrZXlQYXRoLCB2YWx1ZSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfRURJVF9DRUxMX1ZBTFVFX0NIQU5HRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBkYXRhSWQsXG4gICAga2V5UGF0aCxcbiAgICB2YWx1ZSxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZWRpdENlbGxWYWx1ZVZhbGlkYXRlID0gKGdyaWQsIGRhdGFJZCwga2V5UGF0aCwgdmFsdWUsIHZhbGlkYXRvcnMgPSBbXSkgPT4gKFxuICBkaXNwYXRjaCxcbiAgZ2V0U3RhdGUsXG4pID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGxldCB2YWxpZGF0aW9uU3RhdGUgPSB7IHZhbGlkOiB0cnVlIH07XG4gIHZhbGlkYXRvcnMuZm9yRWFjaCgodmFsaWRhdG9yKSA9PiB7XG4gICAgaWYgKHZhbGlkYXRpb25TdGF0ZS52YWxpZCkge1xuICAgICAgaWYgKHZhbGlkYXRvci51bmlxdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSAnJyB8fCB2YWx1ZSAhPT0gbnVsbCB8fCB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgLy8gY29tYmluZSByZWFsIGRhdGEgd2l0aCBjdXJyZW50IHVuc2F2ZWQgZWRpdGVkIGRhdGFcbiAgICAgICAgICBjb25zdCBncmlkRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0KGdyaWQuaWQpO1xuICAgICAgICAgIGNvbnN0IGVkaXREYXRhID0gZ3JpZERhdGEuZ2V0KCdlZGl0RGF0YScpO1xuICAgICAgICAgIGxldCBhbGxEYXRhID0gZ3JpZERhdGEuZ2V0KCdhbGxEYXRhJyk7XG4gICAgICAgICAgaWYgKGVkaXREYXRhKSB7XG4gICAgICAgICAgICBlZGl0RGF0YS5mb3JFYWNoKChlZGl0RGF0YUl0ZW0sIGVkaXREYXRhSXRlbUlkKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGZvdW5kSW5kZXggPSBhbGxEYXRhLmZpbmRJbmRleChkID0+IGQuZ2V0SW4oZ3JpZC5pZEtleVBhdGgpID09PSBlZGl0RGF0YUl0ZW1JZCk7XG4gICAgICAgICAgICAgIGlmIChmb3VuZEluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIGFsbERhdGEgPSBhbGxEYXRhLm1lcmdlRGVlcEluKFtmb3VuZEluZGV4XSwgZWRpdERhdGFJdGVtKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGRldGVybWluZSB1bmlxdWVuZXNzXG4gICAgICAgICAgY29uc3QgZmluZGluZyA9IGFsbERhdGEuZmluZCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYgKGdyaWQuaWRLZXlQYXRoLmxlbmd0aCkge1xuICAgICAgICAgICAgICAvLyBkb24ndCBzZWxmIGNvbXBhcmVcbiAgICAgICAgICAgICAgaWYgKGl0ZW0uZ2V0SW4oZ3JpZC5pZEtleVBhdGgpID09PSBkYXRhSWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpdGVtLmdldEluKGtleVBhdGgpID09PSB2YWx1ZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoZmluZGluZykge1xuICAgICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0ge1xuICAgICAgICAgICAgICB2YWxpZDogZmFsc2UsXG4gICAgICAgICAgICAgIG1lc3NhZ2U6ICdWYWxpZGF0aW9uLlVuaXF1ZScsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh2YWxpZGF0b3IudmFsaWRhdGVXaXRoUm93RGF0YSkge1xuICAgICAgICAvLyBDdXN0b20gdmFsaWRhdG9yIGZ1bmN0aW9uIHdpdGggcm93RGF0YSBhcyBwYXJhbWV0ZXJzXG4gICAgICAgIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG4gICAgICAgIGNvbnN0IGVkaXREYXRhID0gZ3JpZERhdGEuZ2V0SW4oWydlZGl0RGF0YScsIGRhdGFJZF0sIE1hcCgpKTtcbiAgICAgICAgbGV0IHJvd0RhdGEgPSBncmlkRGF0YS5nZXQoJ2FsbERhdGEnKS5maW5kKGl0ZW0gPT4gaXRlbS5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGRhdGFJZCk7XG4gICAgICAgIGlmIChyb3dEYXRhKSB7XG4gICAgICAgICAgcm93RGF0YSA9IHJvd0RhdGEubWVyZ2VEZWVwKGVkaXREYXRhKTtcbiAgICAgICAgICBjb25zdCBwYXJhbXMgPSB2YWxpZGF0b3IucGFyYW1zID8gT2JqZWN0LnZhbHVlcyh2YWxpZGF0b3IucGFyYW1zKSA6IFtdO1xuICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZVdpdGhSb3dEYXRhKHZhbHVlLCByb3dEYXRhLCAuLi5wYXJhbXMpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHZhbGlkYXRvci52YWxpZGF0ZVdpdGhHcmlkRGF0YSkge1xuICAgICAgICAvLyBDdXN0b20gdmFsaWRhdG9yIGZ1bmN0aW9uIHdpdGggcm93RGF0YSBhbmQgZ3JpZERhdGEgYXMgcGFyYW1ldGVyc1xuICAgICAgICBjb25zdCBncmlkRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0KGdyaWQuaWQpO1xuXG4gICAgICAgIGxldCBhbGxEYXRhID0gZ3JpZERhdGEuZ2V0KCdhbGxEYXRhJywgTGlzdCgpKTtcbiAgICAgICAgY29uc3QgZWRpdERhdGEgPSBncmlkRGF0YS5nZXQoJ2VkaXREYXRhJywgTWFwKCkpO1xuXG4gICAgICAgIGVkaXREYXRhLmZvckVhY2goKGVkaXRSb3csIGVkaXRLZXkpID0+IHtcbiAgICAgICAgICBjb25zdCBmb3VuZEluZGV4ID0gYWxsRGF0YS5maW5kSW5kZXgoZCA9PiBkLmdldEluKGdyaWQuaWRLZXlQYXRoKSA9PT0gZWRpdEtleSk7XG4gICAgICAgICAgaWYgKGZvdW5kSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICBhbGxEYXRhID0gYWxsRGF0YS5tZXJnZURlZXBJbihbZm91bmRJbmRleF0sIGVkaXRSb3cpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGVkaXRSb3dEYXRhID0gZWRpdERhdGEuZ2V0KGRhdGFJZCwgTWFwKCkpO1xuICAgICAgICBsZXQgcm93RGF0YSA9IGFsbERhdGEuZmluZChpdGVtID0+IGl0ZW0uZ2V0SW4oZ3JpZC5pZEtleVBhdGgpID09PSBkYXRhSWQpO1xuICAgICAgICBpZiAocm93RGF0YSkge1xuICAgICAgICAgIHJvd0RhdGEgPSByb3dEYXRhLm1lcmdlRGVlcChlZGl0Um93RGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcm93RGF0YSA9IGVkaXRSb3dEYXRhO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHZhbGlkYXRvci5wYXJhbXMgPyBPYmplY3QudmFsdWVzKHZhbGlkYXRvci5wYXJhbXMpIDogW107XG4gICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZVdpdGhHcmlkRGF0YSh2YWx1ZSwgcm93RGF0YSwgYWxsRGF0YSwgLi4ucGFyYW1zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHZhbGlkYXRvci5wYXJhbXMgPyBPYmplY3QudmFsdWVzKHZhbGlkYXRvci5wYXJhbXMpIDogW107XG4gICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZSh2YWx1ZSwgLi4ucGFyYW1zKTtcbiAgICAgICAgaWYgKHZhbGlkYXRvci5wYXJhbXMpIHtcbiAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZVZhbHVlcyA9IHZhbGlkYXRvci5wYXJhbXM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IGNlbGxNZXNzYWdlID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ2NlbGxNZXNzYWdlcycsICdlcnJvcicsIGRhdGFJZCwgLi4ua2V5UGF0aF0pO1xuICBpZiAodmFsaWRhdGlvblN0YXRlLnZhbGlkICYmIGNlbGxNZXNzYWdlICE9PSB1bmRlZmluZWQpIHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgbWVzc2FnZVR5cGU6ICdlcnJvcicsXG4gICAgICBkYXRhSWQsXG4gICAgICBrZXlQYXRoLFxuICAgIH0pO1xuICB9IGVsc2UgaWYgKCF2YWxpZGF0aW9uU3RhdGUudmFsaWQpIHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgbWVzc2FnZVR5cGU6ICdlcnJvcicsXG4gICAgICBkYXRhSWQsXG4gICAgICBrZXlQYXRoLFxuICAgICAgbWVzc2FnZUlkOiB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZSxcbiAgICAgIG1lc3NhZ2VWYWx1ZXM6IHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlVmFsdWVzLFxuICAgIH0pO1xuICB9XG4gIHJldHVybiB2YWxpZGF0aW9uU3RhdGUudmFsaWQ7XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlID0gKGdyaWQsIHJvd0luZGV4LCBrZXlQYXRoLCB2YWx1ZSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfQ0hBTkdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIHJvd0luZGV4LFxuICAgIGtleVBhdGgsXG4gICAgdmFsdWUsXG4gIH0pO1xufTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbmV4cG9ydCBjb25zdCBjcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZSA9IChncmlkLCByb3dJbmRleCwga2V5UGF0aCwgdmFsdWUsIHZhbGlkYXRvcnMgPSBbXSkgPT4gKFxuICBkaXNwYXRjaCxcbiAgZ2V0U3RhdGUsXG4pID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGxldCB2YWxpZGF0aW9uU3RhdGUgPSB7IHZhbGlkOiB0cnVlIH07XG4gIHZhbGlkYXRvcnMuZm9yRWFjaCgodmFsaWRhdG9yKSA9PiB7XG4gICAgaWYgKHZhbGlkYXRpb25TdGF0ZS52YWxpZCkge1xuICAgICAgaWYgKHZhbGlkYXRvci51bmlxdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSAnJyB8fCB2YWx1ZSAhPT0gbnVsbCB8fCB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY29uc3QgZmluZGluZyA9IGdldFN0YXRlKClcbiAgICAgICAgICAgIC5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ2FsbERhdGEnXSlcbiAgICAgICAgICAgIC5maW5kKGl0ZW0gPT4gaXRlbS5nZXRJbihrZXlQYXRoKSA9PT0gdmFsdWUpO1xuICAgICAgICAgIGlmIChmaW5kaW5nKSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB7XG4gICAgICAgICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgICAgICAgICAgbWVzc2FnZTogJ1ZhbGlkYXRpb24uVW5pcXVlJyxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGZpbmQyID0gZ2V0U3RhdGUoKVxuICAgICAgICAgICAgICAuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdjcmVhdGVEYXRhJ10pXG4gICAgICAgICAgICAgIC5maW5kKChpdGVtLCBpKSA9PiBpICE9PSByb3dJbmRleCAmJiBpdGVtLmdldEluKGtleVBhdGgpID09PSB2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoZmluZDIpIHtcbiAgICAgICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0ge1xuICAgICAgICAgICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnVmFsaWRhdGlvbi5VbmlxdWUnLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh2YWxpZGF0b3IudmFsaWRhdGVXaXRoUm93RGF0YSkge1xuICAgICAgICBjb25zdCByb3dEYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ2NyZWF0ZURhdGEnLCByb3dJbmRleF0pO1xuICAgICAgICBjb25zdCBwYXJhbXMgPSB2YWxpZGF0b3IucGFyYW1zID8gT2JqZWN0LnZhbHVlcyh2YWxpZGF0b3IucGFyYW1zKSA6IFtdO1xuICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB2YWxpZGF0b3IudmFsaWRhdGVXaXRoUm93RGF0YSh2YWx1ZSwgcm93RGF0YSwgLi4ucGFyYW1zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHZhbGlkYXRvci5wYXJhbXMgPyBPYmplY3QudmFsdWVzKHZhbGlkYXRvci5wYXJhbXMpIDogW107XG4gICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZSh2YWx1ZSwgLi4ucGFyYW1zKTtcbiAgICAgICAgaWYgKHZhbGlkYXRvci5wYXJhbXMpIHtcbiAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZVZhbHVlcyA9IHZhbGlkYXRvci5wYXJhbXM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICBjb25zdCBjcmVhdGVDZWxsTWVzc2FnZSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdjcmVhdGVDZWxsTWVzc2FnZXMnLCAnZXJyb3InLCByb3dJbmRleCwgLi4ua2V5UGF0aF0pO1xuICBpZiAodmFsaWRhdGlvblN0YXRlLnZhbGlkICYmIGNyZWF0ZUNlbGxNZXNzYWdlICE9PSB1bmRlZmluZWQpIHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9ISURFX01FU1NBR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIG1lc3NhZ2VUeXBlOiAnZXJyb3InLFxuICAgICAgcm93SW5kZXgsXG4gICAgICBrZXlQYXRoLFxuICAgIH0pO1xuICB9IGVsc2UgaWYgKCF2YWxpZGF0aW9uU3RhdGUudmFsaWQpIHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9TSE9XX01FU1NBR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIG1lc3NhZ2VUeXBlOiAnZXJyb3InLFxuICAgICAgcm93SW5kZXgsXG4gICAgICBrZXlQYXRoLFxuICAgICAgbWVzc2FnZUlkOiB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZSxcbiAgICAgIG1lc3NhZ2VWYWx1ZXM6IHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlVmFsdWVzLFxuICAgIH0pO1xuICB9XG4gIHJldHVybiB2YWxpZGF0aW9uU3RhdGUudmFsaWQ7XG59O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuZXhwb3J0IGNvbnN0IGNlbGxTaG93TWVzc2FnZSA9IChcbiAgZ3JpZCxcbiAgbWVzc2FnZVR5cGUsXG4gIGRhdGFJZCxcbiAga2V5UGF0aCxcbiAgbWVzc2FnZUlkLFxuICBtZXNzYWdlVmFsdWVzLFxuKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBtZXNzYWdlVHlwZSxcbiAgICBkYXRhSWQsXG4gICAga2V5UGF0aCxcbiAgICBtZXNzYWdlSWQsXG4gICAgbWVzc2FnZVZhbHVlcyxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgY2VsbFNob3dNZXNzYWdlcyA9IChncmlkLCBtZXNzYWdlcykgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0VTLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIG1lc3NhZ2VzLFxuICB9KTtcbn07XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG5leHBvcnQgY29uc3QgY2VsbEhpZGVNZXNzYWdlID0gKFxuICBncmlkLFxuICBtZXNzYWdlVHlwZSA9IG51bGwsXG4gIGRhdGFJZCA9IG51bGwsXG4gIGtleVBhdGggPSBudWxsLFxuKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBtZXNzYWdlVHlwZSxcbiAgICBkYXRhSWQsXG4gICAga2V5UGF0aCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQ2VsbFNob3dNZXNzYWdlID0gKFxuICBncmlkLFxuICBtZXNzYWdlVHlwZSxcbiAgcm93SW5kZXgsXG4gIGtleVBhdGgsXG4gIG1lc3NhZ2VJZCxcbiAgbWVzc2FnZVZhbHVlcyxcbikgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfU0hPV19NRVNTQUdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIG1lc3NhZ2VUeXBlLFxuICAgIHJvd0luZGV4LFxuICAgIGtleVBhdGgsXG4gICAgbWVzc2FnZUlkLFxuICAgIG1lc3NhZ2VWYWx1ZXMsXG4gIH0pO1xufTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbmV4cG9ydCBjb25zdCBjcmVhdGVDZWxsSGlkZU1lc3NhZ2UgPSAoXG4gIGdyaWQsXG4gIG1lc3NhZ2VUeXBlID0gbnVsbCxcbiAgcm93SW5kZXggPSBudWxsLFxuICBrZXlQYXRoID0gbnVsbCxcbikgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfSElERV9NRVNTQUdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIG1lc3NhZ2VUeXBlLFxuICAgIHJvd0luZGV4LFxuICAgIGtleVBhdGgsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGNlbGxTZWxlY3Rpb25DaGFuZ2UgPSAoZ3JpZCwgc2VsZWN0ZWRDZWxsID0gbnVsbCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgc2VsZWN0ZWRDZWxsLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0VMRUNUSU9OX0NIQU5HRSxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgaXRlbVNlbGVjdGlvbkNoYW5nZSA9IChncmlkLCByb3dJbmRleCwgY3RybFByZXNzZWQgPSBmYWxzZSwgc2hpZnRQcmVzc2VkID0gZmFsc2UpID0+IChcbiAgZGlzcGF0Y2gsXG4gIGdldFN0YXRlLFxuKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIHJvd0luZGV4LFxuICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgY3RybFByZXNzZWQsXG4gICAgc2hpZnRQcmVzc2VkLFxuICB9KTtcbiAgVXRpbHMuc2F2ZVNlbGVjdGVkSXRlbXMoZ3JpZCwgZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ3NlbGVjdGVkSXRlbXMnXSkpO1xufTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdEFsbEl0ZW1zQ2hhbmdlID0gZ3JpZCA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0UsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgfSk7XG4gIFV0aWxzLnNhdmVTZWxlY3RlZEl0ZW1zKGdyaWQsIGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdzZWxlY3RlZEl0ZW1zJ10pKTtcbn07XG5cbmV4cG9ydCBjb25zdCBjbGVhclNlbGVjdGVkSXRlbXMgPSBncmlkID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DTEVBUl9TRUxFQ1RFRF9JVEVNUyxcbiAgICBpZDogZ3JpZC5pZCxcbiAgfSk7XG4gIFV0aWxzLnNhdmVTZWxlY3RlZEl0ZW1zKGdyaWQsIGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdzZWxlY3RlZEl0ZW1zJ10pKTtcbn07XG5cbmV4cG9ydCBjb25zdCB0b2dnbGVGaWx0ZXJpbmcgPSBncmlkID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGNvbnN0IGlzRmlsdGVyaW5nID0gIWdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oXG4gICAgW2dyaWQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdpc0ZpbHRlcmluZyddLFxuICAgIGZhbHNlLFxuICApO1xuICBVdGlscy5zYXZlSXNGaWx0ZXJpbmcoZ3JpZCwgaXNGaWx0ZXJpbmcpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfVE9HR0xFX0ZJTFRFUklORyxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBpc0ZpbHRlcmluZyxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgdmFsaWRhdGVFZGl0ZWRSb3dzID0gKGdyaWQsIGNvbHVtbnMpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG4gIGNvbnN0IGVkaXREYXRhID0gZ3JpZERhdGEuZ2V0KCdlZGl0RGF0YScsIE1hcCgpKTtcbiAgbGV0IGFsbEdvb2QgPSB0cnVlO1xuICBlZGl0RGF0YS5mb3JFYWNoKChlZGl0RGF0YVJvdywgZGF0YUlkKSA9PiB7XG4gICAgY29sdW1ucy5mb3JFYWNoKChjb2wpID0+IHtcbiAgICAgIGxldCB2YWx1ZSA9IGVkaXREYXRhUm93LmdldEluKGNvbC52YWx1ZUtleVBhdGgpO1xuICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsdWUgPSBncmlkRGF0YVxuICAgICAgICAgIC5nZXQoJ2FsbERhdGEnKVxuICAgICAgICAgIC5maW5kKGRhdGEgPT4gZGF0YS5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGRhdGFJZClcbiAgICAgICAgICAuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG4gICAgICB9XG4gICAgICBjb25zdCBpc1ZhbGlkID0gZWRpdENlbGxWYWx1ZVZhbGlkYXRlKGdyaWQsIGRhdGFJZCwgY29sLnZhbHVlS2V5UGF0aCwgdmFsdWUsIGNvbC52YWxpZGF0b3JzKShcbiAgICAgICAgZGlzcGF0Y2gsXG4gICAgICAgIGdldFN0YXRlLFxuICAgICAgKTtcbiAgICAgIGlmIChhbGxHb29kICYmICFpc1ZhbGlkKSB7XG4gICAgICAgIGFsbEdvb2QgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBhbGxHb29kO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZUVtcHR5Q3JlYXRlZFJvd3MgPSAoZ3JpZCwgY29sdW1ucykgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgY29uc3QgY3JlYXRlRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdjcmVhdGVEYXRhJ10sIE1hcCgpKTtcbiAgY29uc3QgaW5kZXhlcyA9IFtdO1xuICBjcmVhdGVEYXRhLmZvckVhY2goKGNyZWF0ZURhdGFSb3csIHJvd0luZGV4KSA9PiB7XG4gICAgbGV0IGlzRW1wdHkgPSB0cnVlO1xuICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGNyZWF0ZURhdGFSb3cuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG4gICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gJycgJiYgdmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgaXNFbXB0eSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChpc0VtcHR5KSB7XG4gICAgICBpbmRleGVzLnB1c2gocm93SW5kZXgpO1xuICAgIH1cbiAgfSk7XG4gIGlmIChpbmRleGVzLmxlbmd0aCA+IDApIHtcbiAgICByZW1vdmVOZXdJdGVtcyhncmlkLCBpbmRleGVzKShkaXNwYXRjaCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUNyZWF0ZWRSb3dzID0gKGdyaWQsIGNvbHVtbnMpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIHJlbW92ZUVtcHR5Q3JlYXRlZFJvd3MoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgY29uc3QgY3JlYXRlRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdjcmVhdGVEYXRhJ10sIE1hcCgpKTtcbiAgbGV0IGFsbEdvb2QgPSB0cnVlO1xuICBjcmVhdGVEYXRhLmZvckVhY2goKGNyZWF0ZURhdGFSb3csIHJvd0luZGV4KSA9PiB7XG4gICAgY29sdW1ucy5mb3JFYWNoKChjb2wpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gY3JlYXRlRGF0YVJvdy5nZXRJbihjb2wudmFsdWVLZXlQYXRoKTtcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSBjcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZShcbiAgICAgICAgZ3JpZCxcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIGNvbC52YWx1ZUtleVBhdGgsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBjb2wudmFsaWRhdG9ycyxcbiAgICAgICkoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgICAgIGlmIChhbGxHb29kICYmICFpc1ZhbGlkKSB7XG4gICAgICAgIGFsbEdvb2QgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBhbGxHb29kO1xufTtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZUV4aXN0aW5nQ2VsbFZhbHVlID0gKGdyaWQsIGRhdGFJZCwga2V5UGF0aCwgdmFsdWUpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1VQREFURV9FWElTVElOR19DRUxMX1ZBTFVFLFxuICAgIGdyaWQsXG4gICAgZGF0YUlkLFxuICAgIGtleVBhdGgsXG4gICAgdmFsdWUsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldEVkaXREYXRhID0gKGdyaWQsIGRhdGEsIGNlbGxNZXNzYWdlcyA9IE1hcCgpKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICBkYXRhLFxuICAgIGNlbGxNZXNzYWdlcyxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfRURJVF9EQVRBLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBvcGVuQ29sdW1uU2V0dGluZ3NNb2RhbCA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX09QRU4sXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbCA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX0NMT1NFLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzYXZlQ29sdW1uU2V0dGluZ3MgPSAoZ3JpZCwgaGlkZGVuQ29sdW1ucywgY29sdW1uT3JkZXIpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgVXRpbHMuc2F2ZUNvbHVtblNldHRpbmdzKGdyaWQsIGhpZGRlbkNvbHVtbnMsIGNvbHVtbk9yZGVyKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGNvbHVtbk9yZGVyLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXRQYWdlID0gKGdyaWQsIHBhZ2UpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5zYXZlUGFnZShncmlkLCBwYWdlKTtcbiAgZGlzcGF0Y2goe1xuICAgIHBhZ2UsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX1BBR0UsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldFJvd3NPblBhZ2UgPSAoZ3JpZCwgcm93c09uUGFnZSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLnNhdmVSb3dzT25QYWdlKGdyaWQsIHJvd3NPblBhZ2UpO1xuICBkaXNwYXRjaCh7XG4gICAgcm93c09uUGFnZSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfUk9XU19PTl9QQUdFLFxuICB9KTtcbn07XG4iXX0=