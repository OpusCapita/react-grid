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
          var _params3 = validator.params ? Object.values(validator.params) : [];

          validationState = validator.validate.apply(validator, [value].concat(_params3));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5hY3Rpb25zLmpzIl0sIm5hbWVzIjpbIlRZUEVTIiwiUExBVEZPUk1fREFUQUdSSURfSU5WQUxJREFURSIsIlBMQVRGT1JNX0RBVEFHUklEX0JVU1kiLCJQTEFURk9STV9EQVRBR1JJRF9SRUFEWSIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9EQVRBIiwiUExBVEZPUk1fREFUQUdSSURfQVBQTFlfU09SVCIsIlBMQVRGT1JNX0RBVEFHUklEX1NPUlRfQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfUkVTSVpFX0NPTFVNTiIsIlBMQVRGT1JNX0RBVEFHUklEX0VESVQiLCJQTEFURk9STV9EQVRBR1JJRF9DQU5DRUwiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFIiwiUExBVEZPUk1fREFUQUdSSURfRVhURU5EX0RBVEEiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFX1NVQ0NFU1MiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFX1BBUlRJQUxfU1VDQ0VTUyIsIlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfRkFJTCIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURSIsIlBMQVRGT1JNX0RBVEFHUklEX0FERF9ORVdfSVRFTSIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9JVEVNIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNUyIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRSIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9TVUNDRVNTIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUwiLCJQTEFURk9STV9EQVRBR1JJRF9FRElUX0NFTExfVkFMVUVfQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0UiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRVMiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX0hJREVfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX0NIQU5HRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX1ZBTElEQVRFIiwiUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TRUxFQ1RJT05fQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9DTEVBUl9TRUxFQ1RFRF9JVEVNUyIsIlBMQVRGT1JNX0RBVEFHUklEX1RPR0dMRV9GSUxURVJJTkciLCJQTEFURk9STV9EQVRBR1JJRF9GSUxURVJfREFUQV9DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9GSUxURVJTIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX0ZJTFRFUlMiLCJQTEFURk9STV9EQVRBR1JJRF9VUERBVEVfRVhJU1RJTkdfQ0VMTF9WQUxVRSIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9FRElUX0RBVEEiLCJQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfT1BFTiIsIlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFIiwiUExBVEZPUk1fREFUQUdSSURfRk9SQ0VfUkVGUkVTSCIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9GT0NVU19UTyIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9QQUdFIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX1JPV1NfT05fUEFHRSIsImludmFsaWRhdGUiLCJncmlkIiwiZGlzcGF0Y2giLCJVdGlscyIsImNoZWNrR3JpZFBhcmFtIiwidHlwZSIsImlkIiwiZm9yY2VSZWZyZXNoIiwic2V0VGltZW91dCIsImRvY3VtZW50IiwiY3JlYXRlRXZlbnQiLCJldnQiLCJpbml0RXZlbnQiLCJ3aW5kb3ciLCJkaXNwYXRjaEV2ZW50Iiwic2V0QnVzeSIsInNldFJlYWR5IiwiYXBwbHlGaWx0ZXJzIiwiY29sdW1ucyIsImdldFN0YXRlIiwiZm9yRWFjaCIsImdyaWREYXRhIiwiZGF0YWdyaWQiLCJnZXQiLCJmaWx0ZXJEYXRhIiwiZ2V0SW4iLCJhbGxEYXRhIiwiZGF0YSIsInBhZ2luYXRpb24iLCJpc0VtcHR5IiwiZGF0ZUZvcm1hdCIsImdldERhdGVGb3JtYXQiLCJ1c2VyIiwiZmlsdGVyIiwicm93IiwiaGl0cyIsImZpbHRlclZhbHVlIiwiZmlsdGVyQ29sdW1uIiwiY29sdW1uIiwiZ2V0Q29sdW1uS2V5IiwidmFsdWUiLCJ2YWx1ZUtleVBhdGgiLCJmaWx0ZXJNYXRjaGVyIiwiZ2V0RmlsdGVyTWF0Y2hlciIsInNpemUiLCJzZXRBbmRBcHBseUZpbHRlcnMiLCJmaWx0ZXJpbmdEYXRhIiwibm9ybWFsaXplRmlsdGVyaW5nRGF0YSIsInNhdmVGaWx0ZXJEYXRhIiwiZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlIiwib3JpZ0ZpbHRlckRhdGEiLCJjb2x1bW5LZXkiLCJ2YWx1ZUVtcHR5Q2hlY2tlciIsImdldFZhbHVlRW1wdHlDaGVja2VyIiwic2V0IiwidG9KUyIsImFwcGx5U29ydCIsInNvcnREYXRhIiwic29ydENvbHVtbiIsInNvcnRPcmRlciIsImNvbCIsIm9yaWdBbGxEYXRhIiwiY29tcGFyYXRvciIsImdldFNvcnRDb21wYXJhdG9yIiwidmFsdWVHZXR0ZXIiLCJnZXRTb3J0VmFsdWVHZXR0ZXIiLCJzb3J0IiwiYSIsImIiLCJ2YWxBIiwidmFsQiIsInNvcnRDaGFuZ2UiLCJuZXdTb3J0Iiwic2F2ZVNvcnREYXRhIiwic2V0RGF0YSIsImNoZWNrQ29sdW1uc1BhcmFtIiwiY29uZmlnRGF0YSIsImxvYWRHcmlkQ29uZmlnIiwiaW1tdXRhYmxlRGF0YSIsIkltbXV0YWJsZSIsIkl0ZXJhYmxlIiwiaXNJdGVyYWJsZSIsImZyb21KUyIsInNlbGVjdGVkSXRlbXMiLCJsb2FkU2VsZWN0ZWRJdGVtcyIsIml0ZW0iLCJmaW5kIiwiZGF0YUl0ZW0iLCJpZEtleVBhdGgiLCJjb25maWciLCJzZXRGb2N1c1RvIiwiZm9jdXNUbyIsImZvY3VzVG9MYXN0Um93IiwiZXh0ZW5kRGF0YSIsInByZXBlbmQiLCJyZXNpemVDb2x1bW4iLCJ3aWR0aCIsImNvbHVtbldpZHRocyIsInNhdmVDb2x1bW5XaWR0aHMiLCJlZGl0IiwiY2FuY2VsIiwic2F2ZSIsImNiIiwic2F2ZVN1Y2Nlc3MiLCJzYXZlZEl0ZW1zIiwic2F2ZVBhcnRpYWxTdWNjZXNzIiwic2F2ZUZhaWwiLCJjcmVhdGUiLCJjb2x1bW5EZWZhdWx0VmFsdWVzIiwiYWRkTmV3SXRlbSIsInJlbW92ZUl0ZW0iLCJyb3dJZCIsInJlbW92ZU5ld0l0ZW0iLCJpbmRleCIsInJlbW92ZU5ld0l0ZW1zIiwiaW5kZXhlcyIsInJlbW92ZSIsInJlbW92ZVN1Y2Nlc3MiLCJyZW1vdmVkSWRzIiwicmVtb3ZlRmFpbCIsImVkaXRDZWxsVmFsdWVDaGFuZ2UiLCJkYXRhSWQiLCJrZXlQYXRoIiwiZWRpdENlbGxWYWx1ZVZhbGlkYXRlIiwidmFsaWRhdG9ycyIsInZhbGlkYXRpb25TdGF0ZSIsInZhbGlkIiwidmFsaWRhdG9yIiwidW5pcXVlIiwidW5kZWZpbmVkIiwiZWRpdERhdGEiLCJlZGl0RGF0YUl0ZW0iLCJlZGl0RGF0YUl0ZW1JZCIsImZvdW5kSW5kZXgiLCJmaW5kSW5kZXgiLCJkIiwibWVyZ2VEZWVwSW4iLCJmaW5kaW5nIiwibGVuZ3RoIiwibWVzc2FnZSIsInZhbGlkYXRlV2l0aFJvd0RhdGEiLCJyb3dEYXRhIiwibWVyZ2VEZWVwIiwicGFyYW1zIiwiT2JqZWN0IiwidmFsdWVzIiwidmFsaWRhdGVXaXRoR3JpZERhdGEiLCJlZGl0Um93IiwiZWRpdEtleSIsImVkaXRSb3dEYXRhIiwidmFsaWRhdGUiLCJtZXNzYWdlVmFsdWVzIiwibWVzc2FnZVR5cGUiLCJtZXNzYWdlSWQiLCJjcmVhdGVDZWxsVmFsdWVDaGFuZ2UiLCJyb3dJbmRleCIsImNyZWF0ZUNlbGxWYWx1ZVZhbGlkYXRlIiwiZmluZDIiLCJpIiwiY2VsbFNob3dNZXNzYWdlIiwiY2VsbFNob3dNZXNzYWdlcyIsIm1lc3NhZ2VzIiwiY2VsbEhpZGVNZXNzYWdlIiwiY3JlYXRlQ2VsbFNob3dNZXNzYWdlIiwiY3JlYXRlQ2VsbEhpZGVNZXNzYWdlIiwiY2VsbFNlbGVjdGlvbkNoYW5nZSIsInNlbGVjdGVkQ2VsbCIsIml0ZW1TZWxlY3Rpb25DaGFuZ2UiLCJjdHJsUHJlc3NlZCIsInNoaWZ0UHJlc3NlZCIsInNhdmVTZWxlY3RlZEl0ZW1zIiwic2VsZWN0QWxsSXRlbXNDaGFuZ2UiLCJjbGVhclNlbGVjdGVkSXRlbXMiLCJ0b2dnbGVGaWx0ZXJpbmciLCJpc0ZpbHRlcmluZyIsInNhdmVJc0ZpbHRlcmluZyIsInZhbGlkYXRlRWRpdGVkUm93cyIsImFsbEdvb2QiLCJlZGl0RGF0YVJvdyIsImlzVmFsaWQiLCJyZW1vdmVFbXB0eUNyZWF0ZWRSb3dzIiwiY3JlYXRlRGF0YSIsImNyZWF0ZURhdGFSb3ciLCJwdXNoIiwidmFsaWRhdGVDcmVhdGVkUm93cyIsInVwZGF0ZUV4aXN0aW5nQ2VsbFZhbHVlIiwic2V0RWRpdERhdGEiLCJjZWxsTWVzc2FnZXMiLCJvcGVuQ29sdW1uU2V0dGluZ3NNb2RhbCIsImNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbCIsInNhdmVDb2x1bW5TZXR0aW5ncyIsImhpZGRlbkNvbHVtbnMiLCJjb2x1bW5PcmRlciIsInNldFBhZ2UiLCJwYWdlIiwic2F2ZVBhZ2UiLCJzZXRSb3dzT25QYWdlIiwicm93c09uUGFnZSIsInNhdmVSb3dzT25QYWdlIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUNBOzs7Ozs7OztBQUVPLElBQU1BLEtBQUssR0FBRztBQUNuQkMsRUFBQUEsNEJBQTRCLEVBQUUsOEJBRFg7QUFFbkJDLEVBQUFBLHNCQUFzQixFQUFFLHdCQUZMO0FBR25CQyxFQUFBQSx1QkFBdUIsRUFBRSx5QkFITjtBQUluQkMsRUFBQUEsMEJBQTBCLEVBQUUsNEJBSlQ7QUFLbkJDLEVBQUFBLDRCQUE0QixFQUFFLDhCQUxYO0FBTW5CQyxFQUFBQSw2QkFBNkIsRUFBRSwrQkFOWjtBQU9uQkMsRUFBQUEsK0JBQStCLEVBQUUsaUNBUGQ7QUFRbkJDLEVBQUFBLHNCQUFzQixFQUFFLHdCQVJMO0FBU25CQyxFQUFBQSx3QkFBd0IsRUFBRSwwQkFUUDtBQVVuQkMsRUFBQUEsc0JBQXNCLEVBQUUsd0JBVkw7QUFXbkJDLEVBQUFBLDZCQUE2QixFQUFFLCtCQVhaO0FBWW5CQyxFQUFBQSw4QkFBOEIsRUFBRSxnQ0FaYjtBQWFuQkMsRUFBQUEsc0NBQXNDLEVBQUUsd0NBYnJCO0FBY25CQyxFQUFBQSwyQkFBMkIsRUFBRSw2QkFkVjtBQWVuQkMsRUFBQUEsd0JBQXdCLEVBQUUsMEJBZlA7QUFnQm5CQyxFQUFBQSw4QkFBOEIsRUFBRSxnQ0FoQmI7QUFpQm5CQyxFQUFBQSw2QkFBNkIsRUFBRSwrQkFqQlo7QUFrQm5CQyxFQUFBQSxpQ0FBaUMsRUFBRSxtQ0FsQmhCO0FBbUJuQkMsRUFBQUEsa0NBQWtDLEVBQUUsb0NBbkJqQjtBQW9CbkJDLEVBQUFBLHdCQUF3QixFQUFFLDBCQXBCUDtBQXFCbkJDLEVBQUFBLGdDQUFnQyxFQUFFLGtDQXJCZjtBQXNCbkJDLEVBQUFBLDZCQUE2QixFQUFFLCtCQXRCWjtBQXVCbkJDLEVBQUFBLHdDQUF3QyxFQUFFLDBDQXZCdkI7QUF3Qm5CQyxFQUFBQSxtQ0FBbUMsRUFBRSxxQ0F4QmxCO0FBeUJuQkMsRUFBQUEsb0NBQW9DLEVBQUUsc0NBekJuQjtBQTBCbkJDLEVBQUFBLG1DQUFtQyxFQUFFLHFDQTFCbEI7QUEyQm5CQyxFQUFBQSwwQ0FBMEMsRUFBRSw0Q0EzQnpCO0FBNEJuQkMsRUFBQUEsMENBQTBDLEVBQUUsNENBNUJ6QjtBQTZCbkJDLEVBQUFBLDBDQUEwQyxFQUFFLDRDQTdCekI7QUE4Qm5CQyxFQUFBQSw0Q0FBNEMsRUFBRSw4Q0E5QjNCO0FBK0JuQkMsRUFBQUEsdUNBQXVDLEVBQUUseUNBL0J0QjtBQWdDbkJDLEVBQUFBLHVDQUF1QyxFQUFFLHlDQWhDdEI7QUFpQ25CQyxFQUFBQSx5Q0FBeUMsRUFBRSwyQ0FqQ3hCO0FBa0NuQkMsRUFBQUEsc0NBQXNDLEVBQUUsd0NBbENyQjtBQW1DbkJDLEVBQUFBLGtDQUFrQyxFQUFFLG9DQW5DakI7QUFvQ25CQyxFQUFBQSxvQ0FBb0MsRUFBRSxzQ0FwQ25CO0FBcUNuQkMsRUFBQUEsK0JBQStCLEVBQUUsaUNBckNkO0FBc0NuQkMsRUFBQUEsNkJBQTZCLEVBQUUsK0JBdENaO0FBdUNuQkMsRUFBQUEsNENBQTRDLEVBQUUsOENBdkMzQjtBQXdDbkJDLEVBQUFBLCtCQUErQixFQUFFLGlDQXhDZDtBQXlDbkJDLEVBQUFBLDRDQUE0QyxFQUFFLDhDQXpDM0I7QUEwQ25CQyxFQUFBQSw2Q0FBNkMsRUFBRSwrQ0ExQzVCO0FBMkNuQkMsRUFBQUEsc0NBQXNDLEVBQUUsd0NBM0NyQjtBQTRDbkJDLEVBQUFBLCtCQUErQixFQUFFLGlDQTVDZDtBQTZDbkJDLEVBQUFBLDhCQUE4QixFQUFFLGdDQTdDYjtBQThDbkJDLEVBQUFBLDBCQUEwQixFQUFFLDRCQTlDVDtBQStDbkJDLEVBQUFBLGtDQUFrQyxFQUFFO0FBL0NqQixDQUFkOzs7QUFrREEsSUFBTUMsVUFBVSxHQUFHLFNBQWJBLFVBQWEsQ0FBQUMsSUFBSTtBQUFBLFNBQUksVUFBQ0MsUUFBRCxFQUFjO0FBQzlDQyx5QkFBTUMsY0FBTixDQUFxQkgsSUFBckI7O0FBQ0FDLElBQUFBLFFBQVEsQ0FBQztBQUNQRyxNQUFBQSxJQUFJLEVBQUVyRCxLQUFLLENBQUNDLDRCQURMO0FBRVBxRCxNQUFBQSxFQUFFLEVBQUVMLElBQUksQ0FBQ0s7QUFGRixLQUFELENBQVI7QUFJRCxHQU42QjtBQUFBLENBQXZCOzs7O0FBUUEsSUFBTUMsWUFBWSxHQUFHLFNBQWZBLFlBQWU7QUFBQSxTQUFNLFVBQUNMLFFBQUQsRUFBYztBQUM5QztBQUNBO0FBQ0FNLElBQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2YsVUFBSUMsUUFBUSxDQUFDQyxXQUFiLEVBQTBCO0FBQ3hCLFlBQU1DLEdBQUcsR0FBR0YsUUFBUSxDQUFDQyxXQUFULENBQXFCLFlBQXJCLENBQVo7QUFDQUMsUUFBQUEsR0FBRyxDQUFDQyxTQUFKLENBQWMsUUFBZCxFQUF3QixJQUF4QixFQUE4QixLQUE5QjtBQUNBQyxRQUFBQSxNQUFNLENBQUNDLGFBQVAsQ0FBcUJILEdBQXJCO0FBQ0Q7QUFDRixLQU5TLEVBTVAsQ0FOTyxDQUFWO0FBT0FULElBQUFBLFFBQVEsQ0FBQztBQUFFRyxNQUFBQSxJQUFJLEVBQUVyRCxLQUFLLENBQUM0QztBQUFkLEtBQUQsQ0FBUjtBQUNELEdBWDJCO0FBQUEsQ0FBckI7Ozs7QUFhQSxJQUFNbUIsT0FBTyxHQUFHLFNBQVZBLE9BQVUsQ0FBQWQsSUFBSTtBQUFBLFNBQUksVUFBQ0MsUUFBRCxFQUFjO0FBQzNDQyx5QkFBTUMsY0FBTixDQUFxQkgsSUFBckI7O0FBQ0FDLElBQUFBLFFBQVEsQ0FBQztBQUNQRyxNQUFBQSxJQUFJLEVBQUVyRCxLQUFLLENBQUNFLHNCQURMO0FBRVBvRCxNQUFBQSxFQUFFLEVBQUVMLElBQUksQ0FBQ0s7QUFGRixLQUFELENBQVI7QUFJRCxHQU4wQjtBQUFBLENBQXBCOzs7O0FBUUEsSUFBTVUsUUFBUSxHQUFHLFNBQVhBLFFBQVcsQ0FBQWYsSUFBSTtBQUFBLFNBQUksVUFBQ0MsUUFBRCxFQUFjO0FBQzVDQyx5QkFBTUMsY0FBTixDQUFxQkgsSUFBckI7O0FBQ0FDLElBQUFBLFFBQVEsQ0FBQztBQUNQRyxNQUFBQSxJQUFJLEVBQUVyRCxLQUFLLENBQUNHLHVCQURMO0FBRVBtRCxNQUFBQSxFQUFFLEVBQUVMLElBQUksQ0FBQ0s7QUFGRixLQUFELENBQVI7QUFJRCxHQU4yQjtBQUFBLENBQXJCOzs7O0FBUUEsSUFBTVcsWUFBWSxHQUFHLFNBQWZBLFlBQWUsQ0FBQ2hCLElBQUQsRUFBT2lCLE9BQVA7QUFBQSxTQUFtQixVQUFDaEIsUUFBRCxFQUFXaUIsUUFBWCxFQUF3QjtBQUNyRWhCLHlCQUFNQyxjQUFOLENBQXFCSCxJQUFyQjs7QUFDQSxRQUFJLENBQUNpQixPQUFELElBQVksQ0FBQ0EsT0FBTyxDQUFDRSxPQUF6QixFQUFrQyxPQUFPLEtBQVA7QUFDbEMsUUFBTUMsUUFBUSxHQUFHRixRQUFRLEdBQUdHLFFBQVgsQ0FBb0JDLEdBQXBCLENBQXdCdEIsSUFBSSxDQUFDSyxFQUE3QixDQUFqQjtBQUNBLFFBQUksQ0FBQ2UsUUFBTCxFQUFlLE9BQU8sS0FBUDtBQUNmLFFBQU1HLFVBQVUsR0FBR0gsUUFBUSxDQUFDSSxLQUFULENBQWUsQ0FBQyxRQUFELEVBQVcsZUFBWCxFQUE0QixZQUE1QixDQUFmLEVBQTBELHFCQUExRCxDQUFuQjtBQUNBLFFBQU1DLE9BQU8sR0FBR0wsUUFBUSxDQUFDRSxHQUFULENBQWEsU0FBYixDQUFoQjtBQUNBLFFBQUlJLElBQUo7O0FBQ0EsUUFBSTFCLElBQUksQ0FBQzJCLFVBQVQsRUFBcUI7QUFDbkIsYUFBTyxJQUFQO0FBQ0Q7O0FBQ0RiLElBQUFBLE9BQU8sQ0FBQ2QsSUFBRCxDQUFQLENBQWNDLFFBQWQ7O0FBQ0EsUUFBSXNCLFVBQVUsQ0FBQ0ssT0FBWCxFQUFKLEVBQTBCO0FBQ3hCRixNQUFBQSxJQUFJLEdBQUdELE9BQVA7QUFDRCxLQUZELE1BRU87QUFDTCxVQUFNSSxVQUFVLEdBQUczQixxQkFBTTRCLGFBQU4sQ0FBb0I5QixJQUFwQixFQUEwQmtCLFFBQVEsR0FBR2EsSUFBckMsQ0FBbkI7O0FBQ0FMLE1BQUFBLElBQUksR0FBR0QsT0FBTyxDQUFDTyxNQUFSLENBQWUsVUFBQ0MsR0FBRCxFQUFTO0FBQzdCLFlBQUlDLElBQUksR0FBRyxDQUFYO0FBQ0FYLFFBQUFBLFVBQVUsQ0FBQ0osT0FBWCxDQUFtQixVQUFDZ0IsV0FBRCxFQUFjQyxZQUFkLEVBQStCO0FBQ2hEbkIsVUFBQUEsT0FBTyxDQUFDRSxPQUFSLENBQWdCLFVBQUNrQixNQUFELEVBQVk7QUFDMUIsZ0JBQUluQyxxQkFBTW9DLFlBQU4sQ0FBbUJELE1BQW5CLE1BQStCRCxZQUFuQyxFQUFpRDtBQUMvQyxrQkFBTUcsS0FBSyxHQUFHTixHQUFHLENBQUNULEtBQUosQ0FBVWEsTUFBTSxDQUFDRyxZQUFqQixDQUFkOztBQUNBLGtCQUFJRCxLQUFLLElBQUlBLEtBQUssS0FBSyxDQUFuQixJQUF3QkEsS0FBSyxLQUFLLEtBQXRDLEVBQTZDO0FBQzNDLG9CQUFNRSxhQUFhLEdBQUd2QyxxQkFBTXdDLGdCQUFOLENBQXVCTCxNQUF2QixFQUErQlIsVUFBL0IsQ0FBdEI7O0FBQ0Esb0JBQUlZLGFBQWEsQ0FBQ1IsR0FBRCxFQUFNRSxXQUFOLENBQWpCLEVBQXFDO0FBQ25DRCxrQkFBQUEsSUFBSSxJQUFJLENBQVI7QUFDRDtBQUNGO0FBQ0Y7QUFDRixXQVZEO0FBV0QsU0FaRDtBQWFBLGVBQU9BLElBQUksS0FBS1gsVUFBVSxDQUFDb0IsSUFBM0I7QUFDRCxPQWhCTSxDQUFQO0FBaUJEOztBQUNEMUMsSUFBQUEsUUFBUSxDQUFDO0FBQ1BHLE1BQUFBLElBQUksRUFBRXJELEtBQUssQ0FBQ3FDLCtCQURMO0FBRVBpQixNQUFBQSxFQUFFLEVBQUVMLElBQUksQ0FBQ0ssRUFGRjtBQUdQcUIsTUFBQUEsSUFBSSxFQUFKQTtBQUhPLEtBQUQsQ0FBUjtBQUtBWCxJQUFBQSxRQUFRLENBQUNmLElBQUQsQ0FBUixDQUFlQyxRQUFmO0FBQ0EsV0FBTyxJQUFQO0FBQ0QsR0F6QzJCO0FBQUEsQ0FBckI7Ozs7QUEyQ0EsSUFBTTJDLGtCQUFrQixHQUFHLFNBQXJCQSxrQkFBcUIsQ0FBQzVDLElBQUQsRUFBT2lCLE9BQVAsRUFBZ0JTLElBQWhCO0FBQUEsU0FBeUIsVUFBQ3pCLFFBQUQsRUFBYztBQUN2RSxRQUFNNEMsYUFBYSxHQUFHM0MscUJBQU00QyxzQkFBTixDQUE2QnBCLElBQTdCLENBQXRCOztBQUNBeEIseUJBQU02QyxjQUFOLENBQXFCL0MsSUFBckIsRUFBMkI2QyxhQUFhLENBQUN2QixHQUFkLENBQWtCLFlBQWxCLENBQTNCOztBQUNBckIsSUFBQUEsUUFBUSxDQUFDO0FBQ1BHLE1BQUFBLElBQUksRUFBRXJELEtBQUssQ0FBQ3NDLDZCQURMO0FBRVBnQixNQUFBQSxFQUFFLEVBQUVMLElBQUksQ0FBQ0ssRUFGRjtBQUdQd0MsTUFBQUEsYUFBYSxFQUFiQTtBQUhPLEtBQUQsQ0FBUjtBQUtBNUMsSUFBQUEsUUFBUSxDQUFDZSxZQUFZLENBQUNoQixJQUFELEVBQU9pQixPQUFQLENBQWIsQ0FBUjtBQUNBLFdBQU8sSUFBUDtBQUNELEdBVmlDO0FBQUEsQ0FBM0I7Ozs7QUFZQSxJQUFNK0IscUJBQXFCLEdBQUcsU0FBeEJBLHFCQUF3QixDQUFDaEQsSUFBRCxFQUFPaUIsT0FBUCxFQUFnQm9CLE1BQWhCLEVBQXdCRSxLQUF4QjtBQUFBLFNBQWtDLFVBQUN0QyxRQUFELEVBQVdpQixRQUFYLEVBQXdCO0FBQzdGaEIseUJBQU1DLGNBQU4sQ0FBcUJILElBQXJCOztBQUNBLFFBQU1pRCxjQUFjLEdBQUcvQixRQUFRLEdBQUdHLFFBQVgsQ0FBb0JHLEtBQXBCLENBQ3JCLENBQUN4QixJQUFJLENBQUNLLEVBQU4sRUFBVSxRQUFWLEVBQW9CLGVBQXBCLEVBQXFDLFlBQXJDLENBRHFCLEVBRXJCLHFCQUZxQixDQUF2Qjs7QUFJQSxRQUFNNkMsU0FBUyxHQUFHaEQscUJBQU1vQyxZQUFOLENBQW1CRCxNQUFuQixDQUFsQjs7QUFDQSxRQUFNYyxpQkFBaUIsR0FBR2pELHFCQUFNa0Qsb0JBQU4sQ0FBMkJmLE1BQTNCLENBQTFCOztBQUNBLFFBQUlkLFVBQUo7O0FBQ0EsUUFBSTRCLGlCQUFpQixDQUFDWixLQUFELENBQXJCLEVBQThCO0FBQzVCaEIsTUFBQUEsVUFBVSxHQUFHMEIsY0FBYyxVQUFkLENBQXNCQyxTQUF0QixDQUFiO0FBQ0QsS0FGRCxNQUVPO0FBQ0wzQixNQUFBQSxVQUFVLEdBQUcwQixjQUFjLENBQUNJLEdBQWYsQ0FBbUJILFNBQW5CLEVBQThCWCxLQUE5QixDQUFiO0FBQ0Q7O0FBQ0RyQyx5QkFBTTZDLGNBQU4sQ0FBcUIvQyxJQUFyQixFQUEyQnVCLFVBQTNCOztBQUNBdEIsSUFBQUEsUUFBUSxDQUFDO0FBQ1BHLE1BQUFBLElBQUksRUFBRXJELEtBQUssQ0FBQ29DLG9DQURMO0FBRVBrQixNQUFBQSxFQUFFLEVBQUVMLElBQUksQ0FBQ0ssRUFGRjtBQUdQO0FBQ0E7QUFDQTtBQUNBa0IsTUFBQUEsVUFBVSxFQUFFQSxVQUFVLENBQUMrQixJQUFYO0FBTkwsS0FBRCxDQUFSO0FBUUF0QyxJQUFBQSxZQUFZLENBQUNoQixJQUFELEVBQU9pQixPQUFQLENBQVosQ0FBNEJoQixRQUE1QixFQUFzQ2lCLFFBQXRDO0FBQ0QsR0F4Qm9DO0FBQUEsQ0FBOUI7Ozs7QUEwQkEsSUFBTXFDLFNBQVMsR0FBRyxTQUFaQSxTQUFZLENBQUN2RCxJQUFELEVBQU9pQixPQUFQO0FBQUEsU0FBbUIsVUFBQ2hCLFFBQUQsRUFBV2lCLFFBQVgsRUFBd0I7QUFDbEVoQix5QkFBTUMsY0FBTixDQUFxQkgsSUFBckI7O0FBQ0EsUUFBSSxDQUFDaUIsT0FBRCxJQUFZLENBQUNBLE9BQU8sQ0FBQ0UsT0FBekIsRUFBa0MsT0FBTyxLQUFQO0FBQ2xDLFFBQU1DLFFBQVEsR0FBR0YsUUFBUSxHQUFHRyxRQUFYLENBQW9CQyxHQUFwQixDQUF3QnRCLElBQUksQ0FBQ0ssRUFBN0IsQ0FBakI7QUFDQSxRQUFJLENBQUNlLFFBQUwsRUFBZSxPQUFPLEtBQVA7QUFDZixRQUFNb0MsUUFBUSxHQUFHcEMsUUFBUSxDQUFDSSxLQUFULENBQWUsQ0FBQyxRQUFELEVBQVcsYUFBWCxDQUFmLENBQWpCO0FBQ0EsUUFBSSxDQUFDZ0MsUUFBTCxFQUFlLE9BQU8sS0FBUDtBQUNmLFFBQU1DLFVBQVUsR0FBR0QsUUFBUSxDQUFDbEMsR0FBVCxDQUFhLFlBQWIsQ0FBbkI7QUFDQSxRQUFJLENBQUNtQyxVQUFMLEVBQWlCLE9BQU8sS0FBUDtBQUNqQixRQUFNQyxTQUFTLEdBQUdGLFFBQVEsQ0FBQ2xDLEdBQVQsQ0FBYSxXQUFiLEVBQTBCLEtBQTFCLENBQWxCO0FBQ0EsUUFBSWUsTUFBSjtBQUNBcEIsSUFBQUEsT0FBTyxDQUFDRSxPQUFSLENBQWdCLFVBQUN3QyxHQUFELEVBQVM7QUFDdkIsVUFBSXpELHFCQUFNb0MsWUFBTixDQUFtQnFCLEdBQW5CLE1BQTRCRixVQUFoQyxFQUE0QztBQUMxQ3BCLFFBQUFBLE1BQU0sR0FBR3NCLEdBQVQ7QUFDRDtBQUNGLEtBSkQ7QUFLQSxRQUFJLENBQUN0QixNQUFMLEVBQWEsT0FBTyxLQUFQOztBQUViLFFBQUlyQyxJQUFJLENBQUMyQixVQUFULEVBQXFCO0FBQ25CLGFBQU8sSUFBUDtBQUNEOztBQUVEYixJQUFBQSxPQUFPLENBQUNkLElBQUQsQ0FBUCxDQUFjQyxRQUFkO0FBQ0EsUUFBTTJELFdBQVcsR0FBR3hDLFFBQVEsQ0FBQ0UsR0FBVCxDQUFhLFNBQWIsQ0FBcEI7O0FBQ0EsUUFBTXVDLFVBQVUsR0FBRzNELHFCQUFNNEQsaUJBQU4sQ0FBd0J6QixNQUF4QixDQUFuQjs7QUFDQSxRQUFNMEIsV0FBVyxHQUFHN0QscUJBQU04RCxrQkFBTixDQUF5QjNCLE1BQXpCLENBQXBCOztBQUNBLFFBQU1jLGlCQUFpQixHQUFHakQscUJBQU1rRCxvQkFBTixDQUEyQmYsTUFBM0IsQ0FBMUI7O0FBQ0EsUUFBTVosT0FBTyxHQUFHbUMsV0FBVyxDQUFDSyxJQUFaLENBQWlCLFVBQUNDLENBQUQsRUFBSUMsQ0FBSixFQUFVO0FBQ3pDLFVBQU1DLElBQUksR0FBR0wsV0FBVyxDQUFDRyxDQUFELENBQXhCO0FBQ0EsVUFBTUcsSUFBSSxHQUFHTixXQUFXLENBQUNJLENBQUQsQ0FBeEI7O0FBQ0EsVUFBSVQsU0FBUyxLQUFLLEtBQWxCLEVBQXlCO0FBQ3ZCLFlBQUlQLGlCQUFpQixDQUFDaUIsSUFBRCxDQUFyQixFQUE2QixPQUFPLENBQUMsQ0FBUjtBQUM3QixZQUFJakIsaUJBQWlCLENBQUNrQixJQUFELENBQXJCLEVBQTZCLE9BQU8sQ0FBUDtBQUM3QixlQUFPUixVQUFVLENBQUNPLElBQUQsRUFBT0MsSUFBUCxDQUFqQjtBQUNEOztBQUNELFVBQUlsQixpQkFBaUIsQ0FBQ2lCLElBQUQsQ0FBckIsRUFBNkIsT0FBTyxDQUFQO0FBQzdCLFVBQUlqQixpQkFBaUIsQ0FBQ2tCLElBQUQsQ0FBckIsRUFBNkIsT0FBTyxDQUFDLENBQVI7QUFDN0IsYUFBT1IsVUFBVSxDQUFDUSxJQUFELEVBQU9ELElBQVAsQ0FBakI7QUFDRCxLQVhlLENBQWhCO0FBWUEsUUFBSTFDLElBQUosQ0F2Q2tFLENBd0NsRTs7QUFDQSxRQUFJTixRQUFRLENBQUNJLEtBQVQsQ0FBZSxDQUFDLFFBQUQsRUFBVyxlQUFYLEVBQTRCLGFBQTVCLENBQWYsRUFBMkQsS0FBM0QsQ0FBSixFQUF1RTtBQUNyRUUsTUFBQUEsSUFBSSxHQUFHTixRQUFRLENBQUNFLEdBQVQsQ0FBYSxNQUFiLEVBQXFCMkMsSUFBckIsQ0FBMEIsVUFBQ0MsQ0FBRCxFQUFJQyxDQUFKLEVBQVU7QUFDekMsWUFBTUMsSUFBSSxHQUFHTCxXQUFXLENBQUNHLENBQUQsQ0FBeEI7QUFDQSxZQUFNRyxJQUFJLEdBQUdOLFdBQVcsQ0FBQ0ksQ0FBRCxDQUF4Qjs7QUFDQSxZQUFJVCxTQUFTLEtBQUssS0FBbEIsRUFBeUI7QUFDdkIsY0FBSVAsaUJBQWlCLENBQUNpQixJQUFELENBQXJCLEVBQTZCLE9BQU8sQ0FBQyxDQUFSO0FBQzdCLGNBQUlqQixpQkFBaUIsQ0FBQ2tCLElBQUQsQ0FBckIsRUFBNkIsT0FBTyxDQUFQO0FBQzdCLGlCQUFPUixVQUFVLENBQUNPLElBQUQsRUFBT0MsSUFBUCxDQUFqQjtBQUNEOztBQUNELFlBQUlsQixpQkFBaUIsQ0FBQ2lCLElBQUQsQ0FBckIsRUFBNkIsT0FBTyxDQUFQO0FBQzdCLFlBQUlqQixpQkFBaUIsQ0FBQ2tCLElBQUQsQ0FBckIsRUFBNkIsT0FBTyxDQUFDLENBQVI7QUFDN0IsZUFBT1IsVUFBVSxDQUFDUSxJQUFELEVBQU9ELElBQVAsQ0FBakI7QUFDRCxPQVhNLENBQVA7QUFZRCxLQWJELE1BYU87QUFDTDFDLE1BQUFBLElBQUksR0FBR0QsT0FBUDtBQUNEOztBQUNEeEIsSUFBQUEsUUFBUSxDQUFDO0FBQ1BHLE1BQUFBLElBQUksRUFBRXJELEtBQUssQ0FBQ0ssNEJBREw7QUFFUGlELE1BQUFBLEVBQUUsRUFBRUwsSUFBSSxDQUFDSyxFQUZGO0FBR1BxQixNQUFBQSxJQUFJLEVBQUpBLElBSE87QUFJUEQsTUFBQUEsT0FBTyxFQUFQQTtBQUpPLEtBQUQsQ0FBUjtBQU1BVixJQUFBQSxRQUFRLENBQUNmLElBQUQsQ0FBUixDQUFlQyxRQUFmO0FBQ0EsV0FBTyxJQUFQO0FBQ0QsR0FqRXdCO0FBQUEsQ0FBbEI7Ozs7QUFtRUEsSUFBTXFFLFVBQVUsR0FBRyxTQUFiQSxVQUFhLENBQUN0RSxJQUFELEVBQU9pQixPQUFQLEVBQWdCb0IsTUFBaEIsRUFBd0JrQyxPQUF4QjtBQUFBLFNBQW9DLFVBQUN0RSxRQUFELEVBQVdpQixRQUFYLEVBQXdCO0FBQ3BGaEIseUJBQU1DLGNBQU4sQ0FBcUJILElBQXJCOztBQUNBLFFBQU0wRCxTQUFTLEdBQUdhLE9BQU8sSUFBSSxLQUE3Qjs7QUFDQSxRQUFNZCxVQUFVLEdBQUd2RCxxQkFBTW9DLFlBQU4sQ0FBbUJELE1BQW5CLENBQW5COztBQUNBbkMseUJBQU1zRSxZQUFOLENBQW1CeEUsSUFBbkIsRUFBeUI7QUFBRXlELE1BQUFBLFVBQVUsRUFBVkEsVUFBRjtBQUFjQyxNQUFBQSxTQUFTLEVBQVRBO0FBQWQsS0FBekI7O0FBQ0F6RCxJQUFBQSxRQUFRLENBQUM7QUFDUEcsTUFBQUEsSUFBSSxFQUFFckQsS0FBSyxDQUFDTSw2QkFETDtBQUVQZ0QsTUFBQUEsRUFBRSxFQUFFTCxJQUFJLENBQUNLLEVBRkY7QUFHUG9ELE1BQUFBLFVBQVUsRUFBVkEsVUFITztBQUlQQyxNQUFBQSxTQUFTLEVBQVRBO0FBSk8sS0FBRCxDQUFSO0FBTUFILElBQUFBLFNBQVMsQ0FBQ3ZELElBQUQsRUFBT2lCLE9BQVAsQ0FBVCxDQUF5QmhCLFFBQXpCLEVBQW1DaUIsUUFBbkM7QUFDRCxHQVp5QjtBQUFBLENBQW5COzs7O0FBY0EsSUFBTXVELE9BQU8sR0FBRyxTQUFWQSxPQUFVLENBQUN6RSxJQUFELEVBQU9pQixPQUFQLEVBQWdCUyxJQUFoQjtBQUFBLFNBQXlCLFVBQUN6QixRQUFELEVBQVdpQixRQUFYLEVBQXdCO0FBQ3RFaEIseUJBQU1DLGNBQU4sQ0FBcUJILElBQXJCOztBQUNBRSx5QkFBTXdFLGlCQUFOLENBQXdCekQsT0FBeEI7O0FBQ0EsUUFBTTBELFVBQVUsR0FBR3pFLHFCQUFNMEUsY0FBTixDQUFxQjVFLElBQXJCLEVBQTJCaUIsT0FBM0IsQ0FBbkI7O0FBQ0EsUUFBTTRELGFBQWEsR0FBR0Msc0JBQVVDLFFBQVYsQ0FBbUJDLFVBQW5CLENBQThCdEQsSUFBOUIsSUFBc0NBLElBQXRDLEdBQTZDb0Qsc0JBQVVHLE1BQVYsQ0FBaUJ2RCxJQUFqQixDQUFuRTs7QUFDQSxRQUFNd0QsYUFBYSxHQUFHaEYscUJBQU1pRixpQkFBTixDQUF3Qm5GLElBQXhCLEVBQThCZ0MsTUFBOUIsQ0FDcEIsVUFBQW9ELElBQUk7QUFBQSxhQUFJLENBQUMsQ0FBQ1AsYUFBYSxDQUFDUSxJQUFkLENBQW1CLFVBQUFDLFFBQVE7QUFBQSxlQUFJQSxRQUFRLENBQUM5RCxLQUFULENBQWV4QixJQUFJLENBQUN1RixTQUFwQixNQUFtQ0gsSUFBdkM7QUFBQSxPQUEzQixDQUFOO0FBQUEsS0FEZ0IsQ0FBdEI7O0FBR0FuRixJQUFBQSxRQUFRLENBQUM7QUFDUEcsTUFBQUEsSUFBSSxFQUFFckQsS0FBSyxDQUFDSSwwQkFETDtBQUVQa0QsTUFBQUEsRUFBRSxFQUFFTCxJQUFJLENBQUNLLEVBRkY7QUFHUHFCLE1BQUFBLElBQUksRUFBRW1ELGFBSEM7QUFJUFcsTUFBQUEsTUFBTSxFQUFFYixVQUpEO0FBS1BPLE1BQUFBLGFBQWEsRUFBYkE7QUFMTyxLQUFELENBQVI7O0FBT0EsUUFBSSxDQUFDbEYsSUFBSSxDQUFDMkIsVUFBVixFQUFzQjtBQUNwQlgsTUFBQUEsWUFBWSxDQUFDaEIsSUFBRCxFQUFPaUIsT0FBUCxDQUFaLENBQTRCaEIsUUFBNUIsRUFBc0NpQixRQUF0QztBQUNBcUMsTUFBQUEsU0FBUyxDQUFDdkQsSUFBRCxFQUFPaUIsT0FBUCxDQUFULENBQXlCaEIsUUFBekIsRUFBbUNpQixRQUFuQztBQUNEOztBQUNELFdBQU8sSUFBUDtBQUNELEdBcEJzQjtBQUFBLENBQWhCO0FBc0JQOzs7Ozs7Ozs7OztBQU9PLElBQU11RSxVQUFVLEdBQUcsU0FBYkEsVUFBYSxDQUFDekYsSUFBRCxFQUFPMEYsT0FBUCxFQUFnQkMsY0FBaEI7QUFBQSxNQUFnQkEsY0FBaEI7QUFBZ0JBLElBQUFBLGNBQWhCLEdBQWlDLEtBQWpDO0FBQUE7O0FBQUEsU0FBMkMsVUFBQzFGLFFBQUQsRUFBYztBQUNqRkMseUJBQU1DLGNBQU4sQ0FBcUJILElBQXJCOztBQUNBQyxJQUFBQSxRQUFRLENBQUM7QUFDUEcsTUFBQUEsSUFBSSxFQUFFckQsS0FBSyxDQUFDNkMsOEJBREw7QUFFUDhGLE1BQUFBLE9BQU8sRUFBUEEsT0FGTztBQUdQQyxNQUFBQSxjQUFjLEVBQWRBLGNBSE87QUFJUHRGLE1BQUFBLEVBQUUsRUFBRUwsSUFBSSxDQUFDSztBQUpGLEtBQUQsQ0FBUjtBQU1ELEdBUnlCO0FBQUEsQ0FBbkI7Ozs7QUFVQSxJQUFNdUYsVUFBVSxHQUFHLFNBQWJBLFVBQWEsQ0FBQzVGLElBQUQsRUFBT2lCLE9BQVAsRUFBZ0JTLElBQWhCLEVBQXNCbUUsT0FBdEI7QUFBQSxNQUFzQkEsT0FBdEI7QUFBc0JBLElBQUFBLE9BQXRCLEdBQWdDLEtBQWhDO0FBQUE7O0FBQUEsU0FBMEMsVUFBQzVGLFFBQUQsRUFBV2lCLFFBQVgsRUFBd0I7QUFDMUZoQix5QkFBTUMsY0FBTixDQUFxQkgsSUFBckI7O0FBQ0EsUUFBTTZFLGFBQWEsR0FBR0Msc0JBQVVDLFFBQVYsQ0FBbUJDLFVBQW5CLENBQThCdEQsSUFBOUIsSUFBc0NBLElBQXRDLEdBQTZDb0Qsc0JBQVVHLE1BQVYsQ0FBaUJ2RCxJQUFqQixDQUFuRTtBQUNBekIsSUFBQUEsUUFBUSxDQUFDO0FBQ1BHLE1BQUFBLElBQUksRUFBRXJELEtBQUssQ0FBQ1csNkJBREw7QUFFUDJDLE1BQUFBLEVBQUUsRUFBRUwsSUFBSSxDQUFDSyxFQUZGO0FBR1BxQixNQUFBQSxJQUFJLEVBQUVtRCxhQUhDO0FBSVBnQixNQUFBQSxPQUFPLEVBQVBBO0FBSk8sS0FBRCxDQUFSO0FBTUE3RSxJQUFBQSxZQUFZLENBQUNoQixJQUFELEVBQU9pQixPQUFQLENBQVosQ0FBNEJoQixRQUE1QixFQUFzQ2lCLFFBQXRDO0FBQ0FxQyxJQUFBQSxTQUFTLENBQUN2RCxJQUFELEVBQU9pQixPQUFQLENBQVQsQ0FBeUJoQixRQUF6QixFQUFtQ2lCLFFBQW5DO0FBQ0QsR0FYeUI7QUFBQSxDQUFuQjs7OztBQWFBLElBQU00RSxZQUFZLEdBQUcsU0FBZkEsWUFBZSxDQUFDOUYsSUFBRCxFQUFPa0QsU0FBUCxFQUFrQjZDLEtBQWxCO0FBQUEsU0FBNEIsVUFBQzlGLFFBQUQsRUFBV2lCLFFBQVgsRUFBd0I7QUFDOUVoQix5QkFBTUMsY0FBTixDQUFxQkgsSUFBckI7O0FBQ0EsUUFBTWdHLFlBQVksR0FBRzlFLFFBQVEsR0FDMUJHLFFBRGtCLENBQ1RHLEtBRFMsQ0FDSCxDQUFDeEIsSUFBSSxDQUFDSyxFQUFOLEVBQVUsUUFBVixFQUFvQixjQUFwQixDQURHLEVBQ2tDLHFCQURsQyxFQUVsQmdELEdBRmtCLENBRWRILFNBRmMsRUFFSDZDLEtBRkcsQ0FBckI7O0FBR0E3Rix5QkFBTStGLGdCQUFOLENBQXVCakcsSUFBdkIsRUFBNkJnRyxZQUE3Qjs7QUFDQS9GLElBQUFBLFFBQVEsQ0FBQztBQUNQRyxNQUFBQSxJQUFJLEVBQUVyRCxLQUFLLENBQUNPLCtCQURMO0FBRVArQyxNQUFBQSxFQUFFLEVBQUVMLElBQUksQ0FBQ0ssRUFGRjtBQUdQMkYsTUFBQUEsWUFBWSxFQUFaQTtBQUhPLEtBQUQsQ0FBUjtBQUtELEdBWDJCO0FBQUEsQ0FBckI7Ozs7QUFhQSxJQUFNRSxJQUFJLEdBQUcsU0FBUEEsSUFBTyxDQUFBbEcsSUFBSTtBQUFBLFNBQUksVUFBQ0MsUUFBRCxFQUFjO0FBQ3hDQyx5QkFBTUMsY0FBTixDQUFxQkgsSUFBckI7O0FBQ0FDLElBQUFBLFFBQVEsQ0FBQztBQUNQRyxNQUFBQSxJQUFJLEVBQUVyRCxLQUFLLENBQUNRLHNCQURMO0FBRVA4QyxNQUFBQSxFQUFFLEVBQUVMLElBQUksQ0FBQ0s7QUFGRixLQUFELENBQVI7QUFJRCxHQU51QjtBQUFBLENBQWpCOzs7O0FBUUEsSUFBTThGLE1BQU0sR0FBRyxTQUFUQSxNQUFTLENBQUFuRyxJQUFJO0FBQUEsU0FBSSxVQUFDQyxRQUFELEVBQWM7QUFDMUNDLHlCQUFNQyxjQUFOLENBQXFCSCxJQUFyQjs7QUFDQUMsSUFBQUEsUUFBUSxDQUFDO0FBQ1BHLE1BQUFBLElBQUksRUFBRXJELEtBQUssQ0FBQ1Msd0JBREw7QUFFUDZDLE1BQUFBLEVBQUUsRUFBRUwsSUFBSSxDQUFDSztBQUZGLEtBQUQsQ0FBUjtBQUlELEdBTnlCO0FBQUEsQ0FBbkI7Ozs7QUFRQSxJQUFNK0YsSUFBSSxHQUFHLFNBQVBBLElBQU8sQ0FBQ3BHLElBQUQsRUFBT3FHLEVBQVA7QUFBQSxNQUFPQSxFQUFQO0FBQU9BLElBQUFBLEVBQVAsR0FBWSxjQUFNLENBQUUsQ0FBcEI7QUFBQTs7QUFBQSxTQUF5QixVQUFDcEcsUUFBRCxFQUFjO0FBQ3pEQyx5QkFBTUMsY0FBTixDQUFxQkgsSUFBckI7O0FBQ0FDLElBQUFBLFFBQVEsQ0FBQztBQUNQRyxNQUFBQSxJQUFJLEVBQUVyRCxLQUFLLENBQUNVLHNCQURMO0FBRVA0QyxNQUFBQSxFQUFFLEVBQUVMLElBQUksQ0FBQ0s7QUFGRixLQUFELENBQVI7QUFJQWdHLElBQUFBLEVBQUU7QUFDSCxHQVBtQjtBQUFBLENBQWI7Ozs7QUFTQSxJQUFNQyxXQUFXLEdBQUcsU0FBZEEsV0FBYyxDQUFDdEcsSUFBRCxFQUFPaUIsT0FBUCxFQUFnQnNGLFVBQWhCO0FBQUEsU0FBK0IsVUFBQ3RHLFFBQUQsRUFBV2lCLFFBQVgsRUFBd0I7QUFDaEZoQix5QkFBTUMsY0FBTixDQUFxQkgsSUFBckI7O0FBQ0FDLElBQUFBLFFBQVEsQ0FBQztBQUNQRyxNQUFBQSxJQUFJLEVBQUVyRCxLQUFLLENBQUNZLDhCQURMO0FBRVAwQyxNQUFBQSxFQUFFLEVBQUVMLElBQUksQ0FBQ0ssRUFGRjtBQUdQa0YsTUFBQUEsU0FBUyxFQUFFdkYsSUFBSSxDQUFDdUYsU0FIVDtBQUlQZ0IsTUFBQUEsVUFBVSxFQUFWQTtBQUpPLEtBQUQsQ0FBUjtBQU1BdkYsSUFBQUEsWUFBWSxDQUFDaEIsSUFBRCxFQUFPaUIsT0FBUCxDQUFaLENBQTRCaEIsUUFBNUIsRUFBc0NpQixRQUF0QztBQUNBcUMsSUFBQUEsU0FBUyxDQUFDdkQsSUFBRCxFQUFPaUIsT0FBUCxDQUFULENBQXlCaEIsUUFBekIsRUFBbUNpQixRQUFuQztBQUNELEdBVjBCO0FBQUEsQ0FBcEI7Ozs7QUFZQSxJQUFNc0Ysa0JBQWtCLEdBQUcsU0FBckJBLGtCQUFxQixDQUFDeEcsSUFBRCxFQUFPaUIsT0FBUCxFQUFnQnNGLFVBQWhCO0FBQUEsU0FBK0IsVUFBQ3RHLFFBQUQsRUFBV2lCLFFBQVgsRUFBd0I7QUFDdkZoQix5QkFBTUMsY0FBTixDQUFxQkgsSUFBckI7O0FBQ0FDLElBQUFBLFFBQVEsQ0FBQztBQUNQRyxNQUFBQSxJQUFJLEVBQUVyRCxLQUFLLENBQUNhLHNDQURMO0FBRVB5QyxNQUFBQSxFQUFFLEVBQUVMLElBQUksQ0FBQ0ssRUFGRjtBQUdQa0YsTUFBQUEsU0FBUyxFQUFFdkYsSUFBSSxDQUFDdUYsU0FIVDtBQUlQZ0IsTUFBQUEsVUFBVSxFQUFWQTtBQUpPLEtBQUQsQ0FBUjtBQU1BdkYsSUFBQUEsWUFBWSxDQUFDaEIsSUFBRCxFQUFPaUIsT0FBUCxDQUFaLENBQTRCaEIsUUFBNUIsRUFBc0NpQixRQUF0QztBQUNBcUMsSUFBQUEsU0FBUyxDQUFDdkQsSUFBRCxFQUFPaUIsT0FBUCxDQUFULENBQXlCaEIsUUFBekIsRUFBbUNpQixRQUFuQztBQUNELEdBVmlDO0FBQUEsQ0FBM0I7Ozs7QUFZQSxJQUFNdUYsUUFBUSxHQUFHLFNBQVhBLFFBQVcsQ0FBQXpHLElBQUk7QUFBQSxTQUFJLFVBQUNDLFFBQUQsRUFBYztBQUM1Q0MseUJBQU1DLGNBQU4sQ0FBcUJILElBQXJCOztBQUNBQyxJQUFBQSxRQUFRLENBQUM7QUFDUEcsTUFBQUEsSUFBSSxFQUFFckQsS0FBSyxDQUFDYywyQkFETDtBQUVQd0MsTUFBQUEsRUFBRSxFQUFFTCxJQUFJLENBQUNLO0FBRkYsS0FBRCxDQUFSO0FBSUQsR0FOMkI7QUFBQSxDQUFyQjs7OztBQVFBLElBQU1xRyxNQUFNLEdBQUcsU0FBVEEsTUFBUyxDQUFDMUcsSUFBRCxFQUFPMkcsbUJBQVA7QUFBQSxTQUErQixVQUFDMUcsUUFBRCxFQUFjO0FBQ2pFQyx5QkFBTUMsY0FBTixDQUFxQkgsSUFBckI7O0FBQ0FDLElBQUFBLFFBQVEsQ0FBQztBQUNQRyxNQUFBQSxJQUFJLEVBQUVyRCxLQUFLLENBQUNlLHdCQURMO0FBRVB1QyxNQUFBQSxFQUFFLEVBQUVMLElBQUksQ0FBQ0ssRUFGRjtBQUdQc0csTUFBQUEsbUJBQW1CLEVBQW5CQTtBQUhPLEtBQUQsQ0FBUjtBQUtELEdBUHFCO0FBQUEsQ0FBZjs7OztBQVNBLElBQU1DLFVBQVUsR0FBRyxTQUFiQSxVQUFhLENBQUM1RyxJQUFELEVBQU8yRyxtQkFBUDtBQUFBLFNBQStCLFVBQUMxRyxRQUFELEVBQWM7QUFDckVDLHlCQUFNQyxjQUFOLENBQXFCSCxJQUFyQjs7QUFDQUMsSUFBQUEsUUFBUSxDQUFDO0FBQ1BHLE1BQUFBLElBQUksRUFBRXJELEtBQUssQ0FBQ2dCLDhCQURMO0FBRVBzQyxNQUFBQSxFQUFFLEVBQUVMLElBQUksQ0FBQ0ssRUFGRjtBQUdQc0csTUFBQUEsbUJBQW1CLEVBQW5CQTtBQUhPLEtBQUQsQ0FBUjtBQUtELEdBUHlCO0FBQUEsQ0FBbkI7Ozs7QUFTQSxJQUFNRSxVQUFVLEdBQUcsU0FBYkEsVUFBYSxDQUFDN0csSUFBRCxFQUFPOEcsS0FBUDtBQUFBLFNBQWlCLFVBQUM3RyxRQUFELEVBQWM7QUFDdkRDLHlCQUFNQyxjQUFOLENBQXFCSCxJQUFyQjs7QUFDQUMsSUFBQUEsUUFBUSxDQUFDO0FBQ1BHLE1BQUFBLElBQUksRUFBRXJELEtBQUssQ0FBQ2lCLDZCQURMO0FBRVBxQyxNQUFBQSxFQUFFLEVBQUVMLElBQUksQ0FBQ0ssRUFGRjtBQUdQa0YsTUFBQUEsU0FBUyxFQUFFdkYsSUFBSSxDQUFDdUYsU0FIVDtBQUlQdUIsTUFBQUEsS0FBSyxFQUFMQTtBQUpPLEtBQUQsQ0FBUjtBQU1ELEdBUnlCO0FBQUEsQ0FBbkI7Ozs7QUFVQSxJQUFNQyxhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLENBQUMvRyxJQUFELEVBQU9nSCxLQUFQO0FBQUEsU0FBaUIsVUFBQy9HLFFBQUQsRUFBYztBQUMxREMseUJBQU1DLGNBQU4sQ0FBcUJILElBQXJCOztBQUNBQyxJQUFBQSxRQUFRLENBQUM7QUFDUEcsTUFBQUEsSUFBSSxFQUFFckQsS0FBSyxDQUFDa0IsaUNBREw7QUFFUG9DLE1BQUFBLEVBQUUsRUFBRUwsSUFBSSxDQUFDSyxFQUZGO0FBR1AyRyxNQUFBQSxLQUFLLEVBQUxBO0FBSE8sS0FBRCxDQUFSO0FBS0QsR0FQNEI7QUFBQSxDQUF0Qjs7OztBQVNBLElBQU1DLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsQ0FBQ2pILElBQUQsRUFBT2tILE9BQVA7QUFBQSxTQUFtQixVQUFDakgsUUFBRCxFQUFjO0FBQzdEQyx5QkFBTUMsY0FBTixDQUFxQkgsSUFBckI7O0FBQ0FDLElBQUFBLFFBQVEsQ0FBQztBQUNQRyxNQUFBQSxJQUFJLEVBQUVyRCxLQUFLLENBQUNtQixrQ0FETDtBQUVQbUMsTUFBQUEsRUFBRSxFQUFFTCxJQUFJLENBQUNLLEVBRkY7QUFHUDZHLE1BQUFBLE9BQU8sRUFBUEE7QUFITyxLQUFELENBQVI7QUFLRCxHQVA2QjtBQUFBLENBQXZCOzs7O0FBU0EsSUFBTUMsTUFBTSxHQUFHLFNBQVRBLE1BQVMsQ0FBQ25ILElBQUQsRUFBT3FHLEVBQVA7QUFBQSxNQUFPQSxFQUFQO0FBQU9BLElBQUFBLEVBQVAsR0FBWSxjQUFNLENBQUUsQ0FBcEI7QUFBQTs7QUFBQSxTQUF5QixVQUFDcEcsUUFBRCxFQUFjO0FBQzNEQyx5QkFBTUMsY0FBTixDQUFxQkgsSUFBckI7O0FBQ0FDLElBQUFBLFFBQVEsQ0FBQztBQUNQRyxNQUFBQSxJQUFJLEVBQUVyRCxLQUFLLENBQUNvQix3QkFETDtBQUVQa0MsTUFBQUEsRUFBRSxFQUFFTCxJQUFJLENBQUNLO0FBRkYsS0FBRCxDQUFSO0FBSUFnRyxJQUFBQSxFQUFFO0FBQ0gsR0FQcUI7QUFBQSxDQUFmOzs7O0FBU0EsSUFBTWUsYUFBYSxHQUFHLFNBQWhCQSxhQUFnQixDQUFDcEgsSUFBRCxFQUFPcUgsVUFBUDtBQUFBLFNBQXNCLFVBQUNwSCxRQUFELEVBQWM7QUFDL0RDLHlCQUFNQyxjQUFOLENBQXFCSCxJQUFyQjs7QUFDQUMsSUFBQUEsUUFBUSxDQUFDO0FBQ1BHLE1BQUFBLElBQUksRUFBRXJELEtBQUssQ0FBQ3FCLGdDQURMO0FBRVBpQyxNQUFBQSxFQUFFLEVBQUVMLElBQUksQ0FBQ0ssRUFGRjtBQUdQa0YsTUFBQUEsU0FBUyxFQUFFdkYsSUFBSSxDQUFDdUYsU0FIVDtBQUlQOEIsTUFBQUEsVUFBVSxFQUFWQTtBQUpPLEtBQUQsQ0FBUjtBQU1ELEdBUjRCO0FBQUEsQ0FBdEI7Ozs7QUFVQSxJQUFNQyxVQUFVLEdBQUcsU0FBYkEsVUFBYSxDQUFBdEgsSUFBSTtBQUFBLFNBQUksVUFBQ0MsUUFBRCxFQUFjO0FBQzlDQyx5QkFBTUMsY0FBTixDQUFxQkgsSUFBckI7O0FBQ0FDLElBQUFBLFFBQVEsQ0FBQztBQUNQRyxNQUFBQSxJQUFJLEVBQUVyRCxLQUFLLENBQUNzQiw2QkFETDtBQUVQZ0MsTUFBQUEsRUFBRSxFQUFFTCxJQUFJLENBQUNLO0FBRkYsS0FBRCxDQUFSO0FBSUQsR0FONkI7QUFBQSxDQUF2Qjs7OztBQVFBLElBQU1rSCxtQkFBbUIsR0FBRyxTQUF0QkEsbUJBQXNCLENBQUN2SCxJQUFELEVBQU93SCxNQUFQLEVBQWVDLE9BQWYsRUFBd0JsRixLQUF4QjtBQUFBLFNBQWtDLFVBQUN0QyxRQUFELEVBQWM7QUFDakZDLHlCQUFNQyxjQUFOLENBQXFCSCxJQUFyQjs7QUFDQUMsSUFBQUEsUUFBUSxDQUFDO0FBQ1BHLE1BQUFBLElBQUksRUFBRXJELEtBQUssQ0FBQ3VCLHdDQURMO0FBRVArQixNQUFBQSxFQUFFLEVBQUVMLElBQUksQ0FBQ0ssRUFGRjtBQUdQbUgsTUFBQUEsTUFBTSxFQUFOQSxNQUhPO0FBSVBDLE1BQUFBLE9BQU8sRUFBUEEsT0FKTztBQUtQbEYsTUFBQUEsS0FBSyxFQUFMQTtBQUxPLEtBQUQsQ0FBUjtBQU9ELEdBVGtDO0FBQUEsQ0FBNUI7Ozs7QUFXQSxJQUFNbUYscUJBQXFCLEdBQUcsU0FBeEJBLHFCQUF3QixDQUFDMUgsSUFBRCxFQUFPd0gsTUFBUCxFQUFlQyxPQUFmLEVBQXdCbEYsS0FBeEIsRUFBK0JvRixVQUEvQjtBQUFBLE1BQStCQSxVQUEvQjtBQUErQkEsSUFBQUEsVUFBL0IsR0FBNEMsRUFBNUM7QUFBQTs7QUFBQSxTQUFtRCxVQUN0RjFILFFBRHNGLEVBRXRGaUIsUUFGc0YsRUFHbkY7QUFDSGhCLHlCQUFNQyxjQUFOLENBQXFCSCxJQUFyQjs7QUFDQSxRQUFJNEgsZUFBZSxHQUFHO0FBQUVDLE1BQUFBLEtBQUssRUFBRTtBQUFULEtBQXRCO0FBQ0FGLElBQUFBLFVBQVUsQ0FBQ3hHLE9BQVgsQ0FBbUIsVUFBQzJHLFNBQUQsRUFBZTtBQUNoQyxVQUFJRixlQUFlLENBQUNDLEtBQXBCLEVBQTJCO0FBQ3pCLFlBQUlDLFNBQVMsQ0FBQ0MsTUFBZCxFQUFzQjtBQUNwQixjQUFJeEYsS0FBSyxLQUFLLEVBQVYsSUFBZ0JBLEtBQUssS0FBSyxJQUExQixJQUFrQ0EsS0FBSyxLQUFLeUYsU0FBaEQsRUFBMkQ7QUFDekQ7QUFDQSxnQkFBTTVHLFFBQVEsR0FBR0YsUUFBUSxHQUFHRyxRQUFYLENBQW9CQyxHQUFwQixDQUF3QnRCLElBQUksQ0FBQ0ssRUFBN0IsQ0FBakI7QUFDQSxnQkFBTTRILFFBQVEsR0FBRzdHLFFBQVEsQ0FBQ0UsR0FBVCxDQUFhLFVBQWIsQ0FBakI7QUFDQSxnQkFBSUcsT0FBTyxHQUFHTCxRQUFRLENBQUNFLEdBQVQsQ0FBYSxTQUFiLENBQWQ7O0FBQ0EsZ0JBQUkyRyxRQUFKLEVBQWM7QUFDWkEsY0FBQUEsUUFBUSxDQUFDOUcsT0FBVCxDQUFpQixVQUFDK0csWUFBRCxFQUFlQyxjQUFmLEVBQWtDO0FBQ2pELG9CQUFNQyxVQUFVLEdBQUczRyxPQUFPLENBQUM0RyxTQUFSLENBQWtCLFVBQUFDLENBQUM7QUFBQSx5QkFBSUEsQ0FBQyxDQUFDOUcsS0FBRixDQUFReEIsSUFBSSxDQUFDdUYsU0FBYixNQUE0QjRDLGNBQWhDO0FBQUEsaUJBQW5CLENBQW5COztBQUNBLG9CQUFJQyxVQUFVLEtBQUssQ0FBQyxDQUFwQixFQUF1QjtBQUNyQjNHLGtCQUFBQSxPQUFPLEdBQUdBLE9BQU8sQ0FBQzhHLFdBQVIsQ0FBb0IsQ0FBQ0gsVUFBRCxDQUFwQixFQUFrQ0YsWUFBbEMsQ0FBVjtBQUNEO0FBQ0YsZUFMRDtBQU1ELGFBWndELENBYXpEOzs7QUFDQSxnQkFBTU0sT0FBTyxHQUFHL0csT0FBTyxDQUFDNEQsSUFBUixDQUFhLFVBQUNELElBQUQsRUFBVTtBQUNyQyxrQkFBSXBGLElBQUksQ0FBQ3VGLFNBQUwsQ0FBZWtELE1BQW5CLEVBQTJCO0FBQ3pCO0FBQ0Esb0JBQUlyRCxJQUFJLENBQUM1RCxLQUFMLENBQVd4QixJQUFJLENBQUN1RixTQUFoQixNQUErQmlDLE1BQW5DLEVBQTJDO0FBQ3pDLHlCQUFPLEtBQVA7QUFDRDtBQUNGOztBQUNELHFCQUFPcEMsSUFBSSxDQUFDNUQsS0FBTCxDQUFXaUcsT0FBWCxNQUF3QmxGLEtBQS9CO0FBQ0QsYUFSZSxDQUFoQjs7QUFTQSxnQkFBSWlHLE9BQUosRUFBYTtBQUNYWixjQUFBQSxlQUFlLEdBQUc7QUFDaEJDLGdCQUFBQSxLQUFLLEVBQUUsS0FEUztBQUVoQmEsZ0JBQUFBLE9BQU8sRUFBRTtBQUZPLGVBQWxCO0FBSUQ7QUFDRjtBQUNGLFNBL0JELE1BK0JPLElBQUlaLFNBQVMsQ0FBQ2EsbUJBQWQsRUFBbUM7QUFDeEM7QUFDQSxjQUFNdkgsU0FBUSxHQUFHRixRQUFRLEdBQUdHLFFBQVgsQ0FBb0JDLEdBQXBCLENBQXdCdEIsSUFBSSxDQUFDSyxFQUE3QixDQUFqQjs7QUFDQSxjQUFNNEgsU0FBUSxHQUFHN0csU0FBUSxDQUFDSSxLQUFULENBQWUsQ0FBQyxVQUFELEVBQWFnRyxNQUFiLENBQWYsRUFBcUMscUJBQXJDLENBQWpCOztBQUNBLGNBQUlvQixPQUFPLEdBQUd4SCxTQUFRLENBQUNFLEdBQVQsQ0FBYSxTQUFiLEVBQXdCK0QsSUFBeEIsQ0FBNkIsVUFBQUQsSUFBSTtBQUFBLG1CQUFJQSxJQUFJLENBQUM1RCxLQUFMLENBQVd4QixJQUFJLENBQUN1RixTQUFoQixNQUErQmlDLE1BQW5DO0FBQUEsV0FBakMsQ0FBZDs7QUFDQSxjQUFJb0IsT0FBSixFQUFhO0FBQ1hBLFlBQUFBLE9BQU8sR0FBR0EsT0FBTyxDQUFDQyxTQUFSLENBQWtCWixTQUFsQixDQUFWO0FBQ0EsZ0JBQU1hLE1BQU0sR0FBR2hCLFNBQVMsQ0FBQ2dCLE1BQVYsR0FBbUJDLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjbEIsU0FBUyxDQUFDZ0IsTUFBeEIsQ0FBbkIsR0FBcUQsRUFBcEU7QUFDQWxCLFlBQUFBLGVBQWUsR0FBR0UsU0FBUyxDQUFDYSxtQkFBVixPQUFBYixTQUFTLEdBQXFCdkYsS0FBckIsRUFBNEJxRyxPQUE1QixTQUF3Q0UsTUFBeEMsRUFBM0I7QUFDRDtBQUNGLFNBVk0sTUFVQSxJQUFJaEIsU0FBUyxDQUFDbUIsb0JBQWQsRUFBb0M7QUFDekM7QUFDQSxjQUFNN0gsVUFBUSxHQUFHRixRQUFRLEdBQUdHLFFBQVgsQ0FBb0JDLEdBQXBCLENBQXdCdEIsSUFBSSxDQUFDSyxFQUE3QixDQUFqQjs7QUFFQSxjQUFJb0IsUUFBTyxHQUFHTCxVQUFRLENBQUNFLEdBQVQsQ0FBYSxTQUFiLEVBQXdCLHNCQUF4QixDQUFkOztBQUNBLGNBQU0yRyxVQUFRLEdBQUc3RyxVQUFRLENBQUNFLEdBQVQsQ0FBYSxVQUFiLEVBQXlCLHFCQUF6QixDQUFqQjs7QUFFQTJHLFVBQUFBLFVBQVEsQ0FBQzlHLE9BQVQsQ0FBaUIsVUFBQytILE9BQUQsRUFBVUMsT0FBVixFQUFzQjtBQUNyQyxnQkFBTWYsVUFBVSxHQUFHM0csUUFBTyxDQUFDNEcsU0FBUixDQUFrQixVQUFBQyxDQUFDO0FBQUEscUJBQUlBLENBQUMsQ0FBQzlHLEtBQUYsQ0FBUXhCLElBQUksQ0FBQ3VGLFNBQWIsTUFBNEI0RCxPQUFoQztBQUFBLGFBQW5CLENBQW5COztBQUNBLGdCQUFJZixVQUFVLEtBQUssQ0FBQyxDQUFwQixFQUF1QjtBQUNyQjNHLGNBQUFBLFFBQU8sR0FBR0EsUUFBTyxDQUFDOEcsV0FBUixDQUFvQixDQUFDSCxVQUFELENBQXBCLEVBQWtDYyxPQUFsQyxDQUFWO0FBQ0Q7QUFDRixXQUxEOztBQU1BLGNBQU1FLFdBQVcsR0FBR25CLFVBQVEsQ0FBQzNHLEdBQVQsQ0FBYWtHLE1BQWIsRUFBcUIscUJBQXJCLENBQXBCOztBQUNBLGNBQUlvQixRQUFPLEdBQUduSCxRQUFPLENBQUM0RCxJQUFSLENBQWEsVUFBQUQsSUFBSTtBQUFBLG1CQUFJQSxJQUFJLENBQUM1RCxLQUFMLENBQVd4QixJQUFJLENBQUN1RixTQUFoQixNQUErQmlDLE1BQW5DO0FBQUEsV0FBakIsQ0FBZDs7QUFDQSxjQUFJb0IsUUFBSixFQUFhO0FBQ1hBLFlBQUFBLFFBQU8sR0FBR0EsUUFBTyxDQUFDQyxTQUFSLENBQWtCTyxXQUFsQixDQUFWO0FBQ0QsV0FGRCxNQUVPO0FBQ0xSLFlBQUFBLFFBQU8sR0FBR1EsV0FBVjtBQUNEOztBQUNELGNBQU1OLE9BQU0sR0FBR2hCLFNBQVMsQ0FBQ2dCLE1BQVYsR0FBbUJDLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjbEIsU0FBUyxDQUFDZ0IsTUFBeEIsQ0FBbkIsR0FBcUQsRUFBcEU7O0FBQ0FsQixVQUFBQSxlQUFlLEdBQUdFLFNBQVMsQ0FBQ21CLG9CQUFWLE9BQUFuQixTQUFTLEdBQXNCdkYsS0FBdEIsRUFBNkJxRyxRQUE3QixFQUFzQ25ILFFBQXRDLFNBQWtEcUgsT0FBbEQsRUFBM0I7QUFDRCxTQXRCTSxNQXNCQTtBQUNMLGNBQU1BLFFBQU0sR0FBR2hCLFNBQVMsQ0FBQ2dCLE1BQVYsR0FBbUJDLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjbEIsU0FBUyxDQUFDZ0IsTUFBeEIsQ0FBbkIsR0FBcUQsRUFBcEU7O0FBQ0FsQixVQUFBQSxlQUFlLEdBQUdFLFNBQVMsQ0FBQ3VCLFFBQVYsT0FBQXZCLFNBQVMsR0FBVXZGLEtBQVYsU0FBb0J1RyxRQUFwQixFQUEzQjs7QUFDQSxjQUFJaEIsU0FBUyxDQUFDZ0IsTUFBZCxFQUFzQjtBQUNwQmxCLFlBQUFBLGVBQWUsQ0FBQzBCLGFBQWhCLEdBQWdDeEIsU0FBUyxDQUFDZ0IsTUFBMUM7QUFDRDtBQUNGO0FBQ0Y7QUFDRixLQXpFRDs7QUEwRUEsUUFBSWxCLGVBQWUsQ0FBQ0MsS0FBcEIsRUFBMkI7QUFDekI1SCxNQUFBQSxRQUFRLENBQUM7QUFDUEcsUUFBQUEsSUFBSSxFQUFFckQsS0FBSyxDQUFDMEIsbUNBREw7QUFFUDRCLFFBQUFBLEVBQUUsRUFBRUwsSUFBSSxDQUFDSyxFQUZGO0FBR1BrSixRQUFBQSxXQUFXLEVBQUUsT0FITjtBQUlQL0IsUUFBQUEsTUFBTSxFQUFOQSxNQUpPO0FBS1BDLFFBQUFBLE9BQU8sRUFBUEE7QUFMTyxPQUFELENBQVI7QUFPRCxLQVJELE1BUU87QUFDTHhILE1BQUFBLFFBQVEsQ0FBQztBQUNQRyxRQUFBQSxJQUFJLEVBQUVyRCxLQUFLLENBQUN3QixtQ0FETDtBQUVQOEIsUUFBQUEsRUFBRSxFQUFFTCxJQUFJLENBQUNLLEVBRkY7QUFHUGtKLFFBQUFBLFdBQVcsRUFBRSxPQUhOO0FBSVAvQixRQUFBQSxNQUFNLEVBQU5BLE1BSk87QUFLUEMsUUFBQUEsT0FBTyxFQUFQQSxPQUxPO0FBTVArQixRQUFBQSxTQUFTLEVBQUU1QixlQUFlLENBQUNjLE9BTnBCO0FBT1BZLFFBQUFBLGFBQWEsRUFBRTFCLGVBQWUsQ0FBQzBCO0FBUHhCLE9BQUQsQ0FBUjtBQVNEOztBQUNELFdBQU8xQixlQUFlLENBQUNDLEtBQXZCO0FBQ0QsR0FwR29DO0FBQUEsQ0FBOUI7Ozs7QUFzR0EsSUFBTTRCLHFCQUFxQixHQUFHLFNBQXhCQSxxQkFBd0IsQ0FBQ3pKLElBQUQsRUFBTzBKLFFBQVAsRUFBaUJqQyxPQUFqQixFQUEwQmxGLEtBQTFCO0FBQUEsU0FBb0MsVUFBQ3RDLFFBQUQsRUFBYztBQUNyRkMseUJBQU1DLGNBQU4sQ0FBcUJILElBQXJCOztBQUNBQyxJQUFBQSxRQUFRLENBQUM7QUFDUEcsTUFBQUEsSUFBSSxFQUFFckQsS0FBSyxDQUFDNkIsMENBREw7QUFFUHlCLE1BQUFBLEVBQUUsRUFBRUwsSUFBSSxDQUFDSyxFQUZGO0FBR1BxSixNQUFBQSxRQUFRLEVBQVJBLFFBSE87QUFJUGpDLE1BQUFBLE9BQU8sRUFBUEEsT0FKTztBQUtQbEYsTUFBQUEsS0FBSyxFQUFMQTtBQUxPLEtBQUQsQ0FBUjtBQU9ELEdBVG9DO0FBQUEsQ0FBOUIsQyxDQVdQOzs7OztBQUNPLElBQU1vSCx1QkFBdUIsR0FBRyxTQUExQkEsdUJBQTBCLENBQUMzSixJQUFELEVBQU8wSixRQUFQLEVBQWlCakMsT0FBakIsRUFBMEJsRixLQUExQixFQUFpQ29GLFVBQWpDO0FBQUEsTUFBaUNBLFVBQWpDO0FBQWlDQSxJQUFBQSxVQUFqQyxHQUE4QyxFQUE5QztBQUFBOztBQUFBLFNBQXFELFVBQzFGMUgsUUFEMEYsRUFFMUZpQixRQUYwRixFQUd2RjtBQUNIaEIseUJBQU1DLGNBQU4sQ0FBcUJILElBQXJCOztBQUNBLFFBQUk0SCxlQUFlLEdBQUc7QUFBRUMsTUFBQUEsS0FBSyxFQUFFO0FBQVQsS0FBdEI7QUFDQUYsSUFBQUEsVUFBVSxDQUFDeEcsT0FBWCxDQUFtQixVQUFDMkcsU0FBRCxFQUFlO0FBQ2hDLFVBQUlGLGVBQWUsQ0FBQ0MsS0FBcEIsRUFBMkI7QUFDekIsWUFBSUMsU0FBUyxDQUFDQyxNQUFkLEVBQXNCO0FBQ3BCLGNBQUl4RixLQUFLLEtBQUssRUFBVixJQUFnQkEsS0FBSyxLQUFLLElBQTFCLElBQWtDQSxLQUFLLEtBQUt5RixTQUFoRCxFQUEyRDtBQUN6RCxnQkFBTVEsT0FBTyxHQUFHdEgsUUFBUSxHQUNyQkcsUUFEYSxDQUNKRyxLQURJLENBQ0UsQ0FBQ3hCLElBQUksQ0FBQ0ssRUFBTixFQUFVLFNBQVYsQ0FERixFQUViZ0YsSUFGYSxDQUVSLFVBQUFELElBQUk7QUFBQSxxQkFBSUEsSUFBSSxDQUFDNUQsS0FBTCxDQUFXaUcsT0FBWCxNQUF3QmxGLEtBQTVCO0FBQUEsYUFGSSxDQUFoQjs7QUFHQSxnQkFBSWlHLE9BQUosRUFBYTtBQUNYWixjQUFBQSxlQUFlLEdBQUc7QUFDaEJDLGdCQUFBQSxLQUFLLEVBQUUsS0FEUztBQUVoQmEsZ0JBQUFBLE9BQU8sRUFBRTtBQUZPLGVBQWxCO0FBSUQsYUFMRCxNQUtPO0FBQ0wsa0JBQU1rQixLQUFLLEdBQUcxSSxRQUFRLEdBQ25CRyxRQURXLENBQ0ZHLEtBREUsQ0FDSSxDQUFDeEIsSUFBSSxDQUFDSyxFQUFOLEVBQVUsWUFBVixDQURKLEVBRVhnRixJQUZXLENBRU4sVUFBQ0QsSUFBRCxFQUFPeUUsQ0FBUDtBQUFBLHVCQUFhQSxDQUFDLEtBQUtILFFBQU4sSUFBa0J0RSxJQUFJLENBQUM1RCxLQUFMLENBQVdpRyxPQUFYLE1BQXdCbEYsS0FBdkQ7QUFBQSxlQUZNLENBQWQ7O0FBR0Esa0JBQUlxSCxLQUFKLEVBQVc7QUFDVGhDLGdCQUFBQSxlQUFlLEdBQUc7QUFDaEJDLGtCQUFBQSxLQUFLLEVBQUUsS0FEUztBQUVoQmEsa0JBQUFBLE9BQU8sRUFBRTtBQUZPLGlCQUFsQjtBQUlEO0FBQ0Y7QUFDRjtBQUNGLFNBdEJELE1Bc0JPLElBQUlaLFNBQVMsQ0FBQ2EsbUJBQWQsRUFBbUM7QUFDeEMsY0FBTUMsT0FBTyxHQUFHMUgsUUFBUSxHQUFHRyxRQUFYLENBQW9CRyxLQUFwQixDQUEwQixDQUFDeEIsSUFBSSxDQUFDSyxFQUFOLEVBQVUsWUFBVixFQUF3QnFKLFFBQXhCLENBQTFCLENBQWhCO0FBQ0EsY0FBTVosTUFBTSxHQUFHaEIsU0FBUyxDQUFDZ0IsTUFBVixHQUFtQkMsTUFBTSxDQUFDQyxNQUFQLENBQWNsQixTQUFTLENBQUNnQixNQUF4QixDQUFuQixHQUFxRCxFQUFwRTtBQUNBbEIsVUFBQUEsZUFBZSxHQUFHRSxTQUFTLENBQUNhLG1CQUFWLE9BQUFiLFNBQVMsR0FBcUJ2RixLQUFyQixFQUE0QnFHLE9BQTVCLFNBQXdDRSxNQUF4QyxFQUEzQjtBQUNELFNBSk0sTUFJQTtBQUNMLGNBQU1BLFFBQU0sR0FBR2hCLFNBQVMsQ0FBQ2dCLE1BQVYsR0FBbUJDLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjbEIsU0FBUyxDQUFDZ0IsTUFBeEIsQ0FBbkIsR0FBcUQsRUFBcEU7O0FBQ0FsQixVQUFBQSxlQUFlLEdBQUdFLFNBQVMsQ0FBQ3VCLFFBQVYsT0FBQXZCLFNBQVMsR0FBVXZGLEtBQVYsU0FBb0J1RyxRQUFwQixFQUEzQjs7QUFDQSxjQUFJaEIsU0FBUyxDQUFDZ0IsTUFBZCxFQUFzQjtBQUNwQmxCLFlBQUFBLGVBQWUsQ0FBQzBCLGFBQWhCLEdBQWdDeEIsU0FBUyxDQUFDZ0IsTUFBMUM7QUFDRDtBQUNGO0FBQ0Y7QUFDRixLQXBDRDs7QUFxQ0EsUUFBSWxCLGVBQWUsQ0FBQ0MsS0FBcEIsRUFBMkI7QUFDekI1SCxNQUFBQSxRQUFRLENBQUM7QUFDUEcsUUFBQUEsSUFBSSxFQUFFckQsS0FBSyxDQUFDNEIsMENBREw7QUFFUDBCLFFBQUFBLEVBQUUsRUFBRUwsSUFBSSxDQUFDSyxFQUZGO0FBR1BrSixRQUFBQSxXQUFXLEVBQUUsT0FITjtBQUlQRyxRQUFBQSxRQUFRLEVBQVJBLFFBSk87QUFLUGpDLFFBQUFBLE9BQU8sRUFBUEE7QUFMTyxPQUFELENBQVI7QUFPRCxLQVJELE1BUU87QUFDTHhILE1BQUFBLFFBQVEsQ0FBQztBQUNQRyxRQUFBQSxJQUFJLEVBQUVyRCxLQUFLLENBQUMyQiwwQ0FETDtBQUVQMkIsUUFBQUEsRUFBRSxFQUFFTCxJQUFJLENBQUNLLEVBRkY7QUFHUGtKLFFBQUFBLFdBQVcsRUFBRSxPQUhOO0FBSVBHLFFBQUFBLFFBQVEsRUFBUkEsUUFKTztBQUtQakMsUUFBQUEsT0FBTyxFQUFQQSxPQUxPO0FBTVArQixRQUFBQSxTQUFTLEVBQUU1QixlQUFlLENBQUNjLE9BTnBCO0FBT1BZLFFBQUFBLGFBQWEsRUFBRTFCLGVBQWUsQ0FBQzBCO0FBUHhCLE9BQUQsQ0FBUjtBQVNEOztBQUNELFdBQU8xQixlQUFlLENBQUNDLEtBQXZCO0FBQ0QsR0EvRHNDO0FBQUEsQ0FBaEMsQyxDQWlFUDs7Ozs7QUFDTyxJQUFNaUMsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixDQUM3QjlKLElBRDZCLEVBRTdCdUosV0FGNkIsRUFHN0IvQixNQUg2QixFQUk3QkMsT0FKNkIsRUFLN0IrQixTQUw2QixFQU03QkYsYUFONkI7QUFBQSxTQU8xQixVQUFDckosUUFBRCxFQUFjO0FBQ2pCQyx5QkFBTUMsY0FBTixDQUFxQkgsSUFBckI7O0FBQ0FDLElBQUFBLFFBQVEsQ0FBQztBQUNQRyxNQUFBQSxJQUFJLEVBQUVyRCxLQUFLLENBQUN3QixtQ0FETDtBQUVQOEIsTUFBQUEsRUFBRSxFQUFFTCxJQUFJLENBQUNLLEVBRkY7QUFHUGtKLE1BQUFBLFdBQVcsRUFBWEEsV0FITztBQUlQL0IsTUFBQUEsTUFBTSxFQUFOQSxNQUpPO0FBS1BDLE1BQUFBLE9BQU8sRUFBUEEsT0FMTztBQU1QK0IsTUFBQUEsU0FBUyxFQUFUQSxTQU5PO0FBT1BGLE1BQUFBLGFBQWEsRUFBYkE7QUFQTyxLQUFELENBQVI7QUFTRCxHQWxCOEI7QUFBQSxDQUF4Qjs7OztBQW9CQSxJQUFNUyxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQW1CLENBQUMvSixJQUFELEVBQU9nSyxRQUFQO0FBQUEsU0FBb0IsVUFBQy9KLFFBQUQsRUFBYztBQUNoRUMseUJBQU1DLGNBQU4sQ0FBcUJILElBQXJCOztBQUNBQyxJQUFBQSxRQUFRLENBQUM7QUFDUEcsTUFBQUEsSUFBSSxFQUFFckQsS0FBSyxDQUFDeUIsb0NBREw7QUFFUDZCLE1BQUFBLEVBQUUsRUFBRUwsSUFBSSxDQUFDSyxFQUZGO0FBR1AySixNQUFBQSxRQUFRLEVBQVJBO0FBSE8sS0FBRCxDQUFSO0FBS0QsR0FQK0I7QUFBQSxDQUF6QixDLENBU1A7Ozs7O0FBQ08sSUFBTUMsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixDQUM3QmpLLElBRDZCLEVBRTdCdUosV0FGNkIsRUFHN0IvQixNQUg2QixFQUk3QkMsT0FKNkI7QUFBQSxNQUU3QjhCLFdBRjZCO0FBRTdCQSxJQUFBQSxXQUY2QixHQUVmLElBRmU7QUFBQTs7QUFBQSxNQUc3Qi9CLE1BSDZCO0FBRzdCQSxJQUFBQSxNQUg2QixHQUdwQixJQUhvQjtBQUFBOztBQUFBLE1BSTdCQyxPQUo2QjtBQUk3QkEsSUFBQUEsT0FKNkIsR0FJbkIsSUFKbUI7QUFBQTs7QUFBQSxTQUsxQixVQUFDeEgsUUFBRCxFQUFjO0FBQ2pCQyx5QkFBTUMsY0FBTixDQUFxQkgsSUFBckI7O0FBQ0FDLElBQUFBLFFBQVEsQ0FBQztBQUNQRyxNQUFBQSxJQUFJLEVBQUVyRCxLQUFLLENBQUMwQixtQ0FETDtBQUVQNEIsTUFBQUEsRUFBRSxFQUFFTCxJQUFJLENBQUNLLEVBRkY7QUFHUGtKLE1BQUFBLFdBQVcsRUFBWEEsV0FITztBQUlQL0IsTUFBQUEsTUFBTSxFQUFOQSxNQUpPO0FBS1BDLE1BQUFBLE9BQU8sRUFBUEE7QUFMTyxLQUFELENBQVI7QUFPRCxHQWQ4QjtBQUFBLENBQXhCOzs7O0FBZ0JBLElBQU15QyxxQkFBcUIsR0FBRyxTQUF4QkEscUJBQXdCLENBQ25DbEssSUFEbUMsRUFFbkN1SixXQUZtQyxFQUduQ0csUUFIbUMsRUFJbkNqQyxPQUptQyxFQUtuQytCLFNBTG1DLEVBTW5DRixhQU5tQztBQUFBLFNBT2hDLFVBQUNySixRQUFELEVBQWM7QUFDakJDLHlCQUFNQyxjQUFOLENBQXFCSCxJQUFyQjs7QUFDQUMsSUFBQUEsUUFBUSxDQUFDO0FBQ1BHLE1BQUFBLElBQUksRUFBRXJELEtBQUssQ0FBQzJCLDBDQURMO0FBRVAyQixNQUFBQSxFQUFFLEVBQUVMLElBQUksQ0FBQ0ssRUFGRjtBQUdQa0osTUFBQUEsV0FBVyxFQUFYQSxXQUhPO0FBSVBHLE1BQUFBLFFBQVEsRUFBUkEsUUFKTztBQUtQakMsTUFBQUEsT0FBTyxFQUFQQSxPQUxPO0FBTVArQixNQUFBQSxTQUFTLEVBQVRBLFNBTk87QUFPUEYsTUFBQUEsYUFBYSxFQUFiQTtBQVBPLEtBQUQsQ0FBUjtBQVNELEdBbEJvQztBQUFBLENBQTlCLEMsQ0FvQlA7Ozs7O0FBQ08sSUFBTWEscUJBQXFCLEdBQUcsU0FBeEJBLHFCQUF3QixDQUNuQ25LLElBRG1DLEVBRW5DdUosV0FGbUMsRUFHbkNHLFFBSG1DLEVBSW5DakMsT0FKbUM7QUFBQSxNQUVuQzhCLFdBRm1DO0FBRW5DQSxJQUFBQSxXQUZtQyxHQUVyQixJQUZxQjtBQUFBOztBQUFBLE1BR25DRyxRQUhtQztBQUduQ0EsSUFBQUEsUUFIbUMsR0FHeEIsSUFId0I7QUFBQTs7QUFBQSxNQUluQ2pDLE9BSm1DO0FBSW5DQSxJQUFBQSxPQUptQyxHQUl6QixJQUp5QjtBQUFBOztBQUFBLFNBS2hDLFVBQUN4SCxRQUFELEVBQWM7QUFDakJDLHlCQUFNQyxjQUFOLENBQXFCSCxJQUFyQjs7QUFDQUMsSUFBQUEsUUFBUSxDQUFDO0FBQ1BHLE1BQUFBLElBQUksRUFBRXJELEtBQUssQ0FBQzRCLDBDQURMO0FBRVAwQixNQUFBQSxFQUFFLEVBQUVMLElBQUksQ0FBQ0ssRUFGRjtBQUdQa0osTUFBQUEsV0FBVyxFQUFYQSxXQUhPO0FBSVBHLE1BQUFBLFFBQVEsRUFBUkEsUUFKTztBQUtQakMsTUFBQUEsT0FBTyxFQUFQQTtBQUxPLEtBQUQsQ0FBUjtBQU9ELEdBZG9DO0FBQUEsQ0FBOUI7Ozs7QUFnQkEsSUFBTTJDLG1CQUFtQixHQUFHLFNBQXRCQSxtQkFBc0IsQ0FBQ3BLLElBQUQsRUFBT3FLLFlBQVA7QUFBQSxNQUFPQSxZQUFQO0FBQU9BLElBQUFBLFlBQVAsR0FBc0IsSUFBdEI7QUFBQTs7QUFBQSxTQUErQixVQUFDcEssUUFBRCxFQUFjO0FBQzlFQyx5QkFBTUMsY0FBTixDQUFxQkgsSUFBckI7O0FBQ0FDLElBQUFBLFFBQVEsQ0FBQztBQUNQb0ssTUFBQUEsWUFBWSxFQUFaQSxZQURPO0FBRVBoSyxNQUFBQSxFQUFFLEVBQUVMLElBQUksQ0FBQ0ssRUFGRjtBQUdQRCxNQUFBQSxJQUFJLEVBQUVyRCxLQUFLLENBQUMrQjtBQUhMLEtBQUQsQ0FBUjtBQUtELEdBUGtDO0FBQUEsQ0FBNUI7Ozs7QUFTQSxJQUFNd0wsbUJBQW1CLEdBQUcsU0FBdEJBLG1CQUFzQixDQUFDdEssSUFBRCxFQUFPMEosUUFBUCxFQUFpQmEsV0FBakIsRUFBc0NDLFlBQXRDO0FBQUEsTUFBaUJELFdBQWpCO0FBQWlCQSxJQUFBQSxXQUFqQixHQUErQixLQUEvQjtBQUFBOztBQUFBLE1BQXNDQyxZQUF0QztBQUFzQ0EsSUFBQUEsWUFBdEMsR0FBcUQsS0FBckQ7QUFBQTs7QUFBQSxTQUErRCxVQUNoR3ZLLFFBRGdHLEVBRWhHaUIsUUFGZ0csRUFHN0Y7QUFDSGhCLHlCQUFNQyxjQUFOLENBQXFCSCxJQUFyQjs7QUFDQUMsSUFBQUEsUUFBUSxDQUFDO0FBQ1BHLE1BQUFBLElBQUksRUFBRXJELEtBQUssQ0FBQ2dDLHVDQURMO0FBRVBzQixNQUFBQSxFQUFFLEVBQUVMLElBQUksQ0FBQ0ssRUFGRjtBQUdQcUosTUFBQUEsUUFBUSxFQUFSQSxRQUhPO0FBSVBuRSxNQUFBQSxTQUFTLEVBQUV2RixJQUFJLENBQUN1RixTQUpUO0FBS1BnRixNQUFBQSxXQUFXLEVBQVhBLFdBTE87QUFNUEMsTUFBQUEsWUFBWSxFQUFaQTtBQU5PLEtBQUQsQ0FBUjs7QUFRQXRLLHlCQUFNdUssaUJBQU4sQ0FBd0J6SyxJQUF4QixFQUE4QmtCLFFBQVEsR0FBR0csUUFBWCxDQUFvQkcsS0FBcEIsQ0FBMEIsQ0FBQ3hCLElBQUksQ0FBQ0ssRUFBTixFQUFVLGVBQVYsQ0FBMUIsQ0FBOUI7QUFDRCxHQWRrQztBQUFBLENBQTVCOzs7O0FBZ0JBLElBQU1xSyxvQkFBb0IsR0FBRyxTQUF2QkEsb0JBQXVCLENBQUExSyxJQUFJO0FBQUEsU0FBSSxVQUFDQyxRQUFELEVBQVdpQixRQUFYLEVBQXdCO0FBQ2xFaEIseUJBQU1DLGNBQU4sQ0FBcUJILElBQXJCOztBQUNBQyxJQUFBQSxRQUFRLENBQUM7QUFDUEcsTUFBQUEsSUFBSSxFQUFFckQsS0FBSyxDQUFDaUMseUNBREw7QUFFUHFCLE1BQUFBLEVBQUUsRUFBRUwsSUFBSSxDQUFDSyxFQUZGO0FBR1BrRixNQUFBQSxTQUFTLEVBQUV2RixJQUFJLENBQUN1RjtBQUhULEtBQUQsQ0FBUjs7QUFLQXJGLHlCQUFNdUssaUJBQU4sQ0FBd0J6SyxJQUF4QixFQUE4QmtCLFFBQVEsR0FBR0csUUFBWCxDQUFvQkcsS0FBcEIsQ0FBMEIsQ0FBQ3hCLElBQUksQ0FBQ0ssRUFBTixFQUFVLGVBQVYsQ0FBMUIsQ0FBOUI7QUFDRCxHQVJ1QztBQUFBLENBQWpDOzs7O0FBVUEsSUFBTXNLLGtCQUFrQixHQUFHLFNBQXJCQSxrQkFBcUIsQ0FBQTNLLElBQUk7QUFBQSxTQUFJLFVBQUNDLFFBQUQsRUFBV2lCLFFBQVgsRUFBd0I7QUFDaEVoQix5QkFBTUMsY0FBTixDQUFxQkgsSUFBckI7O0FBQ0FDLElBQUFBLFFBQVEsQ0FBQztBQUNQRyxNQUFBQSxJQUFJLEVBQUVyRCxLQUFLLENBQUNrQyxzQ0FETDtBQUVQb0IsTUFBQUEsRUFBRSxFQUFFTCxJQUFJLENBQUNLO0FBRkYsS0FBRCxDQUFSOztBQUlBSCx5QkFBTXVLLGlCQUFOLENBQXdCekssSUFBeEIsRUFBOEJrQixRQUFRLEdBQUdHLFFBQVgsQ0FBb0JHLEtBQXBCLENBQTBCLENBQUN4QixJQUFJLENBQUNLLEVBQU4sRUFBVSxlQUFWLENBQTFCLENBQTlCO0FBQ0QsR0FQcUM7QUFBQSxDQUEvQjs7OztBQVNBLElBQU11SyxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLENBQUE1SyxJQUFJO0FBQUEsU0FBSSxVQUFDQyxRQUFELEVBQVdpQixRQUFYLEVBQXdCO0FBQzdEaEIseUJBQU1DLGNBQU4sQ0FBcUJILElBQXJCOztBQUNBLFFBQU02SyxXQUFXLEdBQUcsQ0FBQzNKLFFBQVEsR0FBR0csUUFBWCxDQUFvQkcsS0FBcEIsQ0FDbkIsQ0FBQ3hCLElBQUksQ0FBQ0ssRUFBTixFQUFVLFFBQVYsRUFBb0IsZUFBcEIsRUFBcUMsYUFBckMsQ0FEbUIsRUFFbkIsS0FGbUIsQ0FBckI7O0FBSUFILHlCQUFNNEssZUFBTixDQUFzQjlLLElBQXRCLEVBQTRCNkssV0FBNUI7O0FBQ0E1SyxJQUFBQSxRQUFRLENBQUM7QUFDUEcsTUFBQUEsSUFBSSxFQUFFckQsS0FBSyxDQUFDbUMsa0NBREw7QUFFUG1CLE1BQUFBLEVBQUUsRUFBRUwsSUFBSSxDQUFDSyxFQUZGO0FBR1B3SyxNQUFBQSxXQUFXLEVBQVhBO0FBSE8sS0FBRCxDQUFSO0FBS0QsR0Faa0M7QUFBQSxDQUE1Qjs7OztBQWNBLElBQU1FLGtCQUFrQixHQUFHLFNBQXJCQSxrQkFBcUIsQ0FBQy9LLElBQUQsRUFBT2lCLE9BQVA7QUFBQSxTQUFtQixVQUFDaEIsUUFBRCxFQUFXaUIsUUFBWCxFQUF3QjtBQUMzRWhCLHlCQUFNQyxjQUFOLENBQXFCSCxJQUFyQjs7QUFDQSxRQUFNb0IsUUFBUSxHQUFHRixRQUFRLEdBQUdHLFFBQVgsQ0FBb0JDLEdBQXBCLENBQXdCdEIsSUFBSSxDQUFDSyxFQUE3QixDQUFqQjtBQUNBLFFBQU00SCxRQUFRLEdBQUc3RyxRQUFRLENBQUNFLEdBQVQsQ0FBYSxVQUFiLEVBQXlCLHFCQUF6QixDQUFqQjtBQUNBLFFBQUkwSixPQUFPLEdBQUcsSUFBZDtBQUNBL0MsSUFBQUEsUUFBUSxDQUFDOUcsT0FBVCxDQUFpQixVQUFDOEosV0FBRCxFQUFjekQsTUFBZCxFQUF5QjtBQUN4Q3ZHLE1BQUFBLE9BQU8sQ0FBQ0UsT0FBUixDQUFnQixVQUFDd0MsR0FBRCxFQUFTO0FBQ3ZCLFlBQUlwQixLQUFLLEdBQUcwSSxXQUFXLENBQUN6SixLQUFaLENBQWtCbUMsR0FBRyxDQUFDbkIsWUFBdEIsQ0FBWjs7QUFDQSxZQUFJRCxLQUFLLEtBQUt5RixTQUFkLEVBQXlCO0FBQ3ZCekYsVUFBQUEsS0FBSyxHQUFHbkIsUUFBUSxDQUNiRSxHQURLLENBQ0QsU0FEQyxFQUVMK0QsSUFGSyxDQUVBLFVBQUEzRCxJQUFJO0FBQUEsbUJBQUlBLElBQUksQ0FBQ0YsS0FBTCxDQUFXeEIsSUFBSSxDQUFDdUYsU0FBaEIsTUFBK0JpQyxNQUFuQztBQUFBLFdBRkosRUFHTGhHLEtBSEssQ0FHQ21DLEdBQUcsQ0FBQ25CLFlBSEwsQ0FBUjtBQUlEOztBQUNELFlBQU0wSSxPQUFPLEdBQUd4RCxxQkFBcUIsQ0FBQzFILElBQUQsRUFBT3dILE1BQVAsRUFBZTdELEdBQUcsQ0FBQ25CLFlBQW5CLEVBQWlDRCxLQUFqQyxFQUF3Q29CLEdBQUcsQ0FBQ2dFLFVBQTVDLENBQXJCLENBQ2QxSCxRQURjLEVBRWRpQixRQUZjLENBQWhCOztBQUlBLFlBQUk4SixPQUFPLElBQUksQ0FBQ0UsT0FBaEIsRUFBeUI7QUFDdkJGLFVBQUFBLE9BQU8sR0FBRyxLQUFWO0FBQ0Q7QUFDRixPQWZEO0FBZ0JELEtBakJEO0FBa0JBLFdBQU9BLE9BQVA7QUFDRCxHQXhCaUM7QUFBQSxDQUEzQjs7OztBQTBCQSxJQUFNRyxzQkFBc0IsR0FBRyxTQUF6QkEsc0JBQXlCLENBQUNuTCxJQUFELEVBQU9pQixPQUFQO0FBQUEsU0FBbUIsVUFBQ2hCLFFBQUQsRUFBV2lCLFFBQVgsRUFBd0I7QUFDL0VoQix5QkFBTUMsY0FBTixDQUFxQkgsSUFBckI7O0FBQ0EsUUFBTW9MLFVBQVUsR0FBR2xLLFFBQVEsR0FBR0csUUFBWCxDQUFvQkcsS0FBcEIsQ0FBMEIsQ0FBQ3hCLElBQUksQ0FBQ0ssRUFBTixFQUFVLFlBQVYsQ0FBMUIsRUFBbUQscUJBQW5ELENBQW5CO0FBQ0EsUUFBTTZHLE9BQU8sR0FBRyxFQUFoQjtBQUNBa0UsSUFBQUEsVUFBVSxDQUFDakssT0FBWCxDQUFtQixVQUFDa0ssYUFBRCxFQUFnQjNCLFFBQWhCLEVBQTZCO0FBQzlDLFVBQUk5SCxPQUFPLEdBQUcsSUFBZDtBQUNBWCxNQUFBQSxPQUFPLENBQUNFLE9BQVIsQ0FBZ0IsVUFBQ3dDLEdBQUQsRUFBUztBQUN2QixZQUFNcEIsS0FBSyxHQUFHOEksYUFBYSxDQUFDN0osS0FBZCxDQUFvQm1DLEdBQUcsQ0FBQ25CLFlBQXhCLENBQWQ7O0FBQ0EsWUFBSUQsS0FBSyxLQUFLeUYsU0FBVixJQUF1QnpGLEtBQUssS0FBSyxFQUFqQyxJQUF1Q0EsS0FBSyxLQUFLLElBQXJELEVBQTJEO0FBQ3pEWCxVQUFBQSxPQUFPLEdBQUcsS0FBVjtBQUNEO0FBQ0YsT0FMRDs7QUFNQSxVQUFJQSxPQUFKLEVBQWE7QUFDWHNGLFFBQUFBLE9BQU8sQ0FBQ29FLElBQVIsQ0FBYTVCLFFBQWI7QUFDRDtBQUNGLEtBWEQ7O0FBWUEsUUFBSXhDLE9BQU8sQ0FBQ3VCLE1BQVIsR0FBaUIsQ0FBckIsRUFBd0I7QUFDdEJ4QixNQUFBQSxjQUFjLENBQUNqSCxJQUFELEVBQU9rSCxPQUFQLENBQWQsQ0FBOEJqSCxRQUE5QjtBQUNEO0FBQ0YsR0FuQnFDO0FBQUEsQ0FBL0I7Ozs7QUFxQkEsSUFBTXNMLG1CQUFtQixHQUFHLFNBQXRCQSxtQkFBc0IsQ0FBQ3ZMLElBQUQsRUFBT2lCLE9BQVA7QUFBQSxTQUFtQixVQUFDaEIsUUFBRCxFQUFXaUIsUUFBWCxFQUF3QjtBQUM1RWhCLHlCQUFNQyxjQUFOLENBQXFCSCxJQUFyQjs7QUFDQW1MLElBQUFBLHNCQUFzQixDQUFDbkwsSUFBRCxFQUFPaUIsT0FBUCxDQUF0QixDQUFzQ2hCLFFBQXRDLEVBQWdEaUIsUUFBaEQ7QUFDQSxRQUFNa0ssVUFBVSxHQUFHbEssUUFBUSxHQUFHRyxRQUFYLENBQW9CRyxLQUFwQixDQUEwQixDQUFDeEIsSUFBSSxDQUFDSyxFQUFOLEVBQVUsWUFBVixDQUExQixFQUFtRCxxQkFBbkQsQ0FBbkI7QUFDQSxRQUFJMkssT0FBTyxHQUFHLElBQWQ7QUFDQUksSUFBQUEsVUFBVSxDQUFDakssT0FBWCxDQUFtQixVQUFDa0ssYUFBRCxFQUFnQjNCLFFBQWhCLEVBQTZCO0FBQzlDekksTUFBQUEsT0FBTyxDQUFDRSxPQUFSLENBQWdCLFVBQUN3QyxHQUFELEVBQVM7QUFDdkIsWUFBTXBCLEtBQUssR0FBRzhJLGFBQWEsQ0FBQzdKLEtBQWQsQ0FBb0JtQyxHQUFHLENBQUNuQixZQUF4QixDQUFkO0FBQ0EsWUFBTTBJLE9BQU8sR0FBR3ZCLHVCQUF1QixDQUNyQzNKLElBRHFDLEVBRXJDMEosUUFGcUMsRUFHckMvRixHQUFHLENBQUNuQixZQUhpQyxFQUlyQ0QsS0FKcUMsRUFLckNvQixHQUFHLENBQUNnRSxVQUxpQyxDQUF2QixDQU1kMUgsUUFOYyxFQU1KaUIsUUFOSSxDQUFoQjs7QUFPQSxZQUFJOEosT0FBTyxJQUFJLENBQUNFLE9BQWhCLEVBQXlCO0FBQ3ZCRixVQUFBQSxPQUFPLEdBQUcsS0FBVjtBQUNEO0FBQ0YsT0FaRDtBQWFELEtBZEQ7QUFlQSxXQUFPQSxPQUFQO0FBQ0QsR0FyQmtDO0FBQUEsQ0FBNUI7Ozs7QUF1QkEsSUFBTVEsdUJBQXVCLEdBQUcsU0FBMUJBLHVCQUEwQixDQUFDeEwsSUFBRCxFQUFPd0gsTUFBUCxFQUFlQyxPQUFmLEVBQXdCbEYsS0FBeEI7QUFBQSxTQUFrQyxVQUFDdEMsUUFBRCxFQUFjO0FBQ3JGQyx5QkFBTUMsY0FBTixDQUFxQkgsSUFBckI7O0FBQ0FDLElBQUFBLFFBQVEsQ0FBQztBQUNQRyxNQUFBQSxJQUFJLEVBQUVyRCxLQUFLLENBQUN1Qyw0Q0FETDtBQUVQZSxNQUFBQSxFQUFFLEVBQUVMLElBQUksQ0FBQ0ssRUFGRjtBQUdQbUgsTUFBQUEsTUFBTSxFQUFOQSxNQUhPO0FBSVBDLE1BQUFBLE9BQU8sRUFBUEEsT0FKTztBQUtQbEYsTUFBQUEsS0FBSyxFQUFMQTtBQUxPLEtBQUQsQ0FBUjtBQU9ELEdBVHNDO0FBQUEsQ0FBaEM7Ozs7QUFXQSxJQUFNa0osV0FBVyxHQUFHLFNBQWRBLFdBQWMsQ0FBQ3pMLElBQUQsRUFBTzBCLElBQVAsRUFBYWdLLFlBQWI7QUFBQSxNQUFhQSxZQUFiO0FBQWFBLElBQUFBLFlBQWIsR0FBNEIscUJBQTVCO0FBQUE7O0FBQUEsU0FBc0MsVUFBQ3pMLFFBQUQsRUFBYztBQUM3RUMseUJBQU1DLGNBQU4sQ0FBcUJILElBQXJCOztBQUNBQyxJQUFBQSxRQUFRLENBQUM7QUFDUHlCLE1BQUFBLElBQUksRUFBSkEsSUFETztBQUVQZ0ssTUFBQUEsWUFBWSxFQUFaQSxZQUZPO0FBR1ByTCxNQUFBQSxFQUFFLEVBQUVMLElBQUksQ0FBQ0ssRUFIRjtBQUlQRCxNQUFBQSxJQUFJLEVBQUVyRCxLQUFLLENBQUN3QztBQUpMLEtBQUQsQ0FBUjtBQU1ELEdBUjBCO0FBQUEsQ0FBcEI7Ozs7QUFVQSxJQUFNb00sdUJBQXVCLEdBQUcsU0FBMUJBLHVCQUEwQixDQUFBM0wsSUFBSTtBQUFBLFNBQUksVUFBQ0MsUUFBRCxFQUFjO0FBQzNEQyx5QkFBTUMsY0FBTixDQUFxQkgsSUFBckI7O0FBQ0FDLElBQUFBLFFBQVEsQ0FBQztBQUNQRyxNQUFBQSxJQUFJLEVBQUVyRCxLQUFLLENBQUN5Qyw0Q0FETDtBQUVQYSxNQUFBQSxFQUFFLEVBQUVMLElBQUksQ0FBQ0s7QUFGRixLQUFELENBQVI7QUFJRCxHQU4wQztBQUFBLENBQXBDOzs7O0FBUUEsSUFBTXVMLHdCQUF3QixHQUFHLFNBQTNCQSx3QkFBMkIsQ0FBQTVMLElBQUk7QUFBQSxTQUFJLFVBQUNDLFFBQUQsRUFBYztBQUM1REMseUJBQU1DLGNBQU4sQ0FBcUJILElBQXJCOztBQUNBQyxJQUFBQSxRQUFRLENBQUM7QUFDUEcsTUFBQUEsSUFBSSxFQUFFckQsS0FBSyxDQUFDMEMsNkNBREw7QUFFUFksTUFBQUEsRUFBRSxFQUFFTCxJQUFJLENBQUNLO0FBRkYsS0FBRCxDQUFSO0FBSUQsR0FOMkM7QUFBQSxDQUFyQzs7OztBQVFBLElBQU13TCxrQkFBa0IsR0FBRyxTQUFyQkEsa0JBQXFCLENBQUM3TCxJQUFELEVBQU84TCxhQUFQLEVBQXNCQyxXQUF0QjtBQUFBLFNBQXNDLFVBQUM5TCxRQUFELEVBQWM7QUFDcEZDLHlCQUFNQyxjQUFOLENBQXFCSCxJQUFyQjs7QUFDQUUseUJBQU0yTCxrQkFBTixDQUF5QjdMLElBQXpCLEVBQStCOEwsYUFBL0IsRUFBOENDLFdBQTlDOztBQUNBOUwsSUFBQUEsUUFBUSxDQUFDO0FBQ1BHLE1BQUFBLElBQUksRUFBRXJELEtBQUssQ0FBQzJDLHNDQURMO0FBRVBXLE1BQUFBLEVBQUUsRUFBRUwsSUFBSSxDQUFDSyxFQUZGO0FBR1AwTCxNQUFBQSxXQUFXLEVBQVhBO0FBSE8sS0FBRCxDQUFSO0FBS0QsR0FSaUM7QUFBQSxDQUEzQjs7OztBQVVBLElBQU1DLE9BQU8sR0FBRyxTQUFWQSxPQUFVLENBQUNoTSxJQUFELEVBQU9pTSxJQUFQO0FBQUEsU0FBZ0IsVUFBQ2hNLFFBQUQsRUFBYztBQUNuREMseUJBQU1nTSxRQUFOLENBQWVsTSxJQUFmLEVBQXFCaU0sSUFBckI7O0FBQ0FoTSxJQUFBQSxRQUFRLENBQUM7QUFDUGdNLE1BQUFBLElBQUksRUFBSkEsSUFETztBQUVQNUwsTUFBQUEsRUFBRSxFQUFFTCxJQUFJLENBQUNLLEVBRkY7QUFHUEQsTUFBQUEsSUFBSSxFQUFFckQsS0FBSyxDQUFDOEM7QUFITCxLQUFELENBQVI7QUFLRCxHQVBzQjtBQUFBLENBQWhCOzs7O0FBU0EsSUFBTXNNLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsQ0FBQ25NLElBQUQsRUFBT29NLFVBQVA7QUFBQSxTQUFzQixVQUFDbk0sUUFBRCxFQUFjO0FBQy9EQyx5QkFBTW1NLGNBQU4sQ0FBcUJyTSxJQUFyQixFQUEyQm9NLFVBQTNCOztBQUNBbk0sSUFBQUEsUUFBUSxDQUFDO0FBQ1BtTSxNQUFBQSxVQUFVLEVBQVZBLFVBRE87QUFFUC9MLE1BQUFBLEVBQUUsRUFBRUwsSUFBSSxDQUFDSyxFQUZGO0FBR1BELE1BQUFBLElBQUksRUFBRXJELEtBQUssQ0FBQytDO0FBSEwsS0FBRCxDQUFSO0FBS0QsR0FQNEI7QUFBQSxDQUF0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJbW11dGFibGUsIHsgTWFwLCBMaXN0IH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCBVdGlscyBmcm9tICcuL2RhdGFncmlkLnV0aWxzJztcblxuZXhwb3J0IGNvbnN0IFRZUEVTID0ge1xuICBQTEFURk9STV9EQVRBR1JJRF9JTlZBTElEQVRFOiAnUExBVEZPUk1fREFUQUdSSURfSU5WQUxJREFURScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0JVU1k6ICdQTEFURk9STV9EQVRBR1JJRF9CVVNZJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVBRFk6ICdQTEFURk9STV9EQVRBR1JJRF9SRUFEWScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NFVF9EQVRBOiAnUExBVEZPUk1fREFUQUdSSURfU0VUX0RBVEEnLFxuICBQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9TT1JUOiAnUExBVEZPUk1fREFUQUdSSURfQVBQTFlfU09SVCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NPUlRfQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfU09SVF9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRVNJWkVfQ09MVU1OOiAnUExBVEZPUk1fREFUQUdSSURfUkVTSVpFX0NPTFVNTicsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0VESVQ6ICdQTEFURk9STV9EQVRBR1JJRF9FRElUJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0FOQ0VMOiAnUExBVEZPUk1fREFUQUdSSURfQ0FOQ0VMJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0FWRTogJ1BMQVRGT1JNX0RBVEFHUklEX1NBVkUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9FWFRFTkRfREFUQTogJ1BMQVRGT1JNX0RBVEFHUklEX0VYVEVORF9EQVRBJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0FWRV9TVUNDRVNTOiAnUExBVEZPUk1fREFUQUdSSURfU0FWRV9TVUNDRVNTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0FWRV9QQVJUSUFMX1NVQ0NFU1M6ICdQTEFURk9STV9EQVRBR1JJRF9TQVZFX1BBUlRJQUxfU1VDQ0VTUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NBVkVfRkFJTDogJ1BMQVRGT1JNX0RBVEFHUklEX1NBVkVfRkFJTCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NSRUFURTogJ1BMQVRGT1JNX0RBVEFHUklEX0NSRUFURScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0FERF9ORVdfSVRFTTogJ1BMQVRGT1JNX0RBVEFHUklEX0FERF9ORVdfSVRFTScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9JVEVNOiAnUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0lURU0nLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU06ICdQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU0nLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU1TOiAnUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRTogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9TVUNDRVNTOiAnUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX1NVQ0NFU1MnLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfRkFJTDogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9GQUlMJyxcbiAgUExBVEZPUk1fREFUQUdSSURfRURJVF9DRUxMX1ZBTFVFX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX0VESVRfQ0VMTF9WQUxVRV9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0VTOiAnUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0VTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0VMTF9ISURFX01FU1NBR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX0hJREVfTUVTU0FHRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX0hJREVfTUVTU0FHRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX1ZBTElEQVRFOiAnUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfVkFMSURBVEUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NFTEVDVElPTl9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NFTEVDVElPTl9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9JVEVNX1NFTEVDVElPTl9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9JVEVNX1NFTEVDVElPTl9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRUxFQ1RfQUxMX0lURU1TX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX1NFTEVDVF9BTExfSVRFTVNfQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0xFQVJfU0VMRUNURURfSVRFTVM6ICdQTEFURk9STV9EQVRBR1JJRF9DTEVBUl9TRUxFQ1RFRF9JVEVNUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1RPR0dMRV9GSUxURVJJTkc6ICdQTEFURk9STV9EQVRBR1JJRF9UT0dHTEVfRklMVEVSSU5HJyxcbiAgUExBVEZPUk1fREFUQUdSSURfRklMVEVSX0RBVEFfQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfRklMVEVSX0RBVEFfQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQVBQTFlfRklMVEVSUzogJ1BMQVRGT1JNX0RBVEFHUklEX0FQUExZX0ZJTFRFUlMnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRVRfRklMVEVSUzogJ1BMQVRGT1JNX0RBVEFHUklEX1NFVF9GSUxURVJTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfVVBEQVRFX0VYSVNUSU5HX0NFTExfVkFMVUU6ICdQTEFURk9STV9EQVRBR1JJRF9VUERBVEVfRVhJU1RJTkdfQ0VMTF9WQUxVRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NFVF9FRElUX0RBVEE6ICdQTEFURk9STV9EQVRBR1JJRF9TRVRfRURJVF9EQVRBJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX09QRU46ICdQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfT1BFTicsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFOiAnUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX1NBVkUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9GT1JDRV9SRUZSRVNIOiAnUExBVEZPUk1fREFUQUdSSURfRk9SQ0VfUkVGUkVTSCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NFVF9GT0NVU19UTzogJ1BMQVRGT1JNX0RBVEFHUklEX1NFVF9GT0NVU19UTycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NFVF9QQUdFOiAnUExBVEZPUk1fREFUQUdSSURfU0VUX1BBR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRVRfUk9XU19PTl9QQUdFOiAnUExBVEZPUk1fREFUQUdSSURfU0VUX1JPV1NfT05fUEFHRScsXG59O1xuXG5leHBvcnQgY29uc3QgaW52YWxpZGF0ZSA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfSU5WQUxJREFURSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZm9yY2VSZWZyZXNoID0gKCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIC8vIEZpcmUgcmVzaXplIGV2ZW50IHRvIHJlY2FsY3VsYXRlIGNvbXBvbmVudCBzaXplc1xuICAvLyBhbmQgdG8gZm9yY2UgcmVkcmF3IGFsbCBtb3VudGVkIGdyaWRzXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGlmIChkb2N1bWVudC5jcmVhdGVFdmVudCkge1xuICAgICAgY29uc3QgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKTtcbiAgICAgIGV2dC5pbml0RXZlbnQoJ3Jlc2l6ZScsIHRydWUsIGZhbHNlKTtcbiAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gICAgfVxuICB9LCAxKTtcbiAgZGlzcGF0Y2goeyB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9GT1JDRV9SRUZSRVNIIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldEJ1c3kgPSBncmlkID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0JVU1ksXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldFJlYWR5ID0gZ3JpZCA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRUFEWSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgYXBwbHlGaWx0ZXJzID0gKGdyaWQsIGNvbHVtbnMpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGlmICghY29sdW1ucyB8fCAhY29sdW1ucy5mb3JFYWNoKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG4gIGlmICghZ3JpZERhdGEpIHJldHVybiBmYWxzZTtcbiAgY29uc3QgZmlsdGVyRGF0YSA9IGdyaWREYXRhLmdldEluKFsnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnZmlsdGVyRGF0YSddLCBNYXAoKSk7XG4gIGNvbnN0IGFsbERhdGEgPSBncmlkRGF0YS5nZXQoJ2FsbERhdGEnKTtcbiAgbGV0IGRhdGE7XG4gIGlmIChncmlkLnBhZ2luYXRpb24pIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBzZXRCdXN5KGdyaWQpKGRpc3BhdGNoKTtcbiAgaWYgKGZpbHRlckRhdGEuaXNFbXB0eSgpKSB7XG4gICAgZGF0YSA9IGFsbERhdGE7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZGF0ZUZvcm1hdCA9IFV0aWxzLmdldERhdGVGb3JtYXQoZ3JpZCwgZ2V0U3RhdGUoKS51c2VyKTtcbiAgICBkYXRhID0gYWxsRGF0YS5maWx0ZXIoKHJvdykgPT4ge1xuICAgICAgbGV0IGhpdHMgPSAwO1xuICAgICAgZmlsdGVyRGF0YS5mb3JFYWNoKChmaWx0ZXJWYWx1ZSwgZmlsdGVyQ29sdW1uKSA9PiB7XG4gICAgICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sdW1uKSA9PiB7XG4gICAgICAgICAgaWYgKFV0aWxzLmdldENvbHVtbktleShjb2x1bW4pID09PSBmaWx0ZXJDb2x1bW4pIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gcm93LmdldEluKGNvbHVtbi52YWx1ZUtleVBhdGgpO1xuICAgICAgICAgICAgaWYgKHZhbHVlIHx8IHZhbHVlID09PSAwIHx8IHZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJNYXRjaGVyID0gVXRpbHMuZ2V0RmlsdGVyTWF0Y2hlcihjb2x1bW4sIGRhdGVGb3JtYXQpO1xuICAgICAgICAgICAgICBpZiAoZmlsdGVyTWF0Y2hlcihyb3csIGZpbHRlclZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGhpdHMgKz0gMTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBoaXRzID09PSBmaWx0ZXJEYXRhLnNpemU7XG4gICAgfSk7XG4gIH1cbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0FQUExZX0ZJTFRFUlMsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgZGF0YSxcbiAgfSk7XG4gIHNldFJlYWR5KGdyaWQpKGRpc3BhdGNoKTtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0QW5kQXBwbHlGaWx0ZXJzID0gKGdyaWQsIGNvbHVtbnMsIGRhdGEpID0+IChkaXNwYXRjaCkgPT4ge1xuICBjb25zdCBmaWx0ZXJpbmdEYXRhID0gVXRpbHMubm9ybWFsaXplRmlsdGVyaW5nRGF0YShkYXRhKTtcbiAgVXRpbHMuc2F2ZUZpbHRlckRhdGEoZ3JpZCwgZmlsdGVyaW5nRGF0YS5nZXQoJ2ZpbHRlckRhdGEnKSk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfRklMVEVSUyxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBmaWx0ZXJpbmdEYXRhLFxuICB9KTtcbiAgZGlzcGF0Y2goYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKTtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5leHBvcnQgY29uc3QgZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlID0gKGdyaWQsIGNvbHVtbnMsIGNvbHVtbiwgdmFsdWUpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGNvbnN0IG9yaWdGaWx0ZXJEYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihcbiAgICBbZ3JpZC5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2ZpbHRlckRhdGEnXSxcbiAgICBNYXAoKSxcbiAgKTtcbiAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbHVtbik7XG4gIGNvbnN0IHZhbHVlRW1wdHlDaGVja2VyID0gVXRpbHMuZ2V0VmFsdWVFbXB0eUNoZWNrZXIoY29sdW1uKTtcbiAgbGV0IGZpbHRlckRhdGE7XG4gIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWx1ZSkpIHtcbiAgICBmaWx0ZXJEYXRhID0gb3JpZ0ZpbHRlckRhdGEuZGVsZXRlKGNvbHVtbktleSk7XG4gIH0gZWxzZSB7XG4gICAgZmlsdGVyRGF0YSA9IG9yaWdGaWx0ZXJEYXRhLnNldChjb2x1bW5LZXksIHZhbHVlKTtcbiAgfVxuICBVdGlscy5zYXZlRmlsdGVyRGF0YShncmlkLCBmaWx0ZXJEYXRhKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0ZJTFRFUl9EQVRBX0NIQU5HRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICAvLyBUaGUgZmlsdGVyRGF0YSBtaWdodCBoYXZlIHByb3BlcnR5LCB3aGljaCB2YWx1ZSBpcyBhcnJheSAodGhpcyBoYXBwZW5zIHdoZW4gbG9hZGVkIGZyb21cbiAgICAvLyBzZXNzaW9uIHN0b3JhZ2UpLiBJbiBvcmRlciB0byBhbGxvdyBuZXN0ZWQgY29udmVydGlvbiBvZiBmaWx0ZXJEYXRhIGFuZCBhcnJheSB0eXBlIG9mXG4gICAgLy8gcHJvcGVydHkgdG8gYmUgY29udmVydGVkIHRvIGltbXV0YWJsZSBsaXN0LCB0aGUgZmlsdGVyRGF0YSBtdXN0IGJlIG9iamVjdCBpbnN0ZWFkIG9mIG1hcC5cbiAgICBmaWx0ZXJEYXRhOiBmaWx0ZXJEYXRhLnRvSlMoKSxcbiAgfSk7XG4gIGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xufTtcblxuZXhwb3J0IGNvbnN0IGFwcGx5U29ydCA9IChncmlkLCBjb2x1bW5zKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBpZiAoIWNvbHVtbnMgfHwgIWNvbHVtbnMuZm9yRWFjaCkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBncmlkRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0KGdyaWQuaWQpO1xuICBpZiAoIWdyaWREYXRhKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IHNvcnREYXRhID0gZ3JpZERhdGEuZ2V0SW4oWydjb25maWcnLCAnc29ydGluZ0RhdGEnXSk7XG4gIGlmICghc29ydERhdGEpIHJldHVybiBmYWxzZTtcbiAgY29uc3Qgc29ydENvbHVtbiA9IHNvcnREYXRhLmdldCgnc29ydENvbHVtbicpO1xuICBpZiAoIXNvcnRDb2x1bW4pIHJldHVybiBmYWxzZTtcbiAgY29uc3Qgc29ydE9yZGVyID0gc29ydERhdGEuZ2V0KCdzb3J0T3JkZXInLCAnYXNjJyk7XG4gIGxldCBjb2x1bW47XG4gIGNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgaWYgKFV0aWxzLmdldENvbHVtbktleShjb2wpID09PSBzb3J0Q29sdW1uKSB7XG4gICAgICBjb2x1bW4gPSBjb2w7XG4gICAgfVxuICB9KTtcbiAgaWYgKCFjb2x1bW4pIHJldHVybiBmYWxzZTtcblxuICBpZiAoZ3JpZC5wYWdpbmF0aW9uKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBzZXRCdXN5KGdyaWQpKGRpc3BhdGNoKTtcbiAgY29uc3Qgb3JpZ0FsbERhdGEgPSBncmlkRGF0YS5nZXQoJ2FsbERhdGEnKTtcbiAgY29uc3QgY29tcGFyYXRvciA9IFV0aWxzLmdldFNvcnRDb21wYXJhdG9yKGNvbHVtbik7XG4gIGNvbnN0IHZhbHVlR2V0dGVyID0gVXRpbHMuZ2V0U29ydFZhbHVlR2V0dGVyKGNvbHVtbik7XG4gIGNvbnN0IHZhbHVlRW1wdHlDaGVja2VyID0gVXRpbHMuZ2V0VmFsdWVFbXB0eUNoZWNrZXIoY29sdW1uKTtcbiAgY29uc3QgYWxsRGF0YSA9IG9yaWdBbGxEYXRhLnNvcnQoKGEsIGIpID0+IHtcbiAgICBjb25zdCB2YWxBID0gdmFsdWVHZXR0ZXIoYSk7XG4gICAgY29uc3QgdmFsQiA9IHZhbHVlR2V0dGVyKGIpO1xuICAgIGlmIChzb3J0T3JkZXIgPT09ICdhc2MnKSB7XG4gICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQSkpIHJldHVybiAtMTtcbiAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxCKSkgcmV0dXJuIDE7XG4gICAgICByZXR1cm4gY29tcGFyYXRvcih2YWxBLCB2YWxCKTtcbiAgICB9XG4gICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEEpKSByZXR1cm4gMTtcbiAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQikpIHJldHVybiAtMTtcbiAgICByZXR1cm4gY29tcGFyYXRvcih2YWxCLCB2YWxBKTtcbiAgfSk7XG4gIGxldCBkYXRhO1xuICAvLyBTb3J0IGFsc28gZmlsdGVyZWQgZGF0YSBzZXBhcmF0ZWx5XG4gIGlmIChncmlkRGF0YS5nZXRJbihbJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2lzRmlsdGVyaW5nJ10sIGZhbHNlKSkge1xuICAgIGRhdGEgPSBncmlkRGF0YS5nZXQoJ2RhdGEnKS5zb3J0KChhLCBiKSA9PiB7XG4gICAgICBjb25zdCB2YWxBID0gdmFsdWVHZXR0ZXIoYSk7XG4gICAgICBjb25zdCB2YWxCID0gdmFsdWVHZXR0ZXIoYik7XG4gICAgICBpZiAoc29ydE9yZGVyID09PSAnYXNjJykge1xuICAgICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQSkpIHJldHVybiAtMTtcbiAgICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEIpKSByZXR1cm4gMTtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmF0b3IodmFsQSwgdmFsQik7XG4gICAgICB9XG4gICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQSkpIHJldHVybiAxO1xuICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEIpKSByZXR1cm4gLTE7XG4gICAgICByZXR1cm4gY29tcGFyYXRvcih2YWxCLCB2YWxBKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBkYXRhID0gYWxsRGF0YTtcbiAgfVxuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQVBQTFlfU09SVCxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBkYXRhLFxuICAgIGFsbERhdGEsXG4gIH0pO1xuICBzZXRSZWFkeShncmlkKShkaXNwYXRjaCk7XG4gIHJldHVybiB0cnVlO1xufTtcblxuZXhwb3J0IGNvbnN0IHNvcnRDaGFuZ2UgPSAoZ3JpZCwgY29sdW1ucywgY29sdW1uLCBuZXdTb3J0KSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBjb25zdCBzb3J0T3JkZXIgPSBuZXdTb3J0IHx8ICdhc2MnO1xuICBjb25zdCBzb3J0Q29sdW1uID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbHVtbik7XG4gIFV0aWxzLnNhdmVTb3J0RGF0YShncmlkLCB7IHNvcnRDb2x1bW4sIHNvcnRPcmRlciB9KTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NPUlRfQ0hBTkdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIHNvcnRDb2x1bW4sXG4gICAgc29ydE9yZGVyLFxuICB9KTtcbiAgYXBwbHlTb3J0KGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0RGF0YSA9IChncmlkLCBjb2x1bW5zLCBkYXRhKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBVdGlscy5jaGVja0NvbHVtbnNQYXJhbShjb2x1bW5zKTtcbiAgY29uc3QgY29uZmlnRGF0YSA9IFV0aWxzLmxvYWRHcmlkQ29uZmlnKGdyaWQsIGNvbHVtbnMpO1xuICBjb25zdCBpbW11dGFibGVEYXRhID0gSW1tdXRhYmxlLkl0ZXJhYmxlLmlzSXRlcmFibGUoZGF0YSkgPyBkYXRhIDogSW1tdXRhYmxlLmZyb21KUyhkYXRhKTtcbiAgY29uc3Qgc2VsZWN0ZWRJdGVtcyA9IFV0aWxzLmxvYWRTZWxlY3RlZEl0ZW1zKGdyaWQpLmZpbHRlcihcbiAgICBpdGVtID0+ICEhaW1tdXRhYmxlRGF0YS5maW5kKGRhdGFJdGVtID0+IGRhdGFJdGVtLmdldEluKGdyaWQuaWRLZXlQYXRoKSA9PT0gaXRlbSksXG4gICk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfREFUQSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBkYXRhOiBpbW11dGFibGVEYXRhLFxuICAgIGNvbmZpZzogY29uZmlnRGF0YSxcbiAgICBzZWxlY3RlZEl0ZW1zLFxuICB9KTtcbiAgaWYgKCFncmlkLnBhZ2luYXRpb24pIHtcbiAgICBhcHBseUZpbHRlcnMoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgICBhcHBseVNvcnQoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8qKlxuICogQWN0aW9uIHRvIHNldCBmb2N1cyB0byBlaXRoZXIgbGFzdCBlZGl0ZWRSb3csIGNyZWF0ZWRSb3cgb3IgdG8gdmFsaWRhdGlvbiBlcnJvclxuICogQHBhcmFtIHtPYmplY3R9IGdyaWRcbiAqIEBwYXJhbSB7U3RyaW5nfSBmb2N1c1RvVHlwZSAtIHR5cGUgb2YgZm9jdXMgcmVxdWVzdC4gUG9zc2libGUgdmFsdWVzOlxuICogJ2ZvY3VzVG9FZGl0Q2VsbCcgfHwgJ2ZvY3VzVG9FcnJvckNlbGwnIHx8ICdmb2N1c1RvQ3JlYXRlQ2VsbCdcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gZm9jdXNUb0xhc3RSb3cgLSBzZXRzIGZvY3VzIHRvIGxhc3QgZGF0YSByb3cgaW5zdGVhZCBvZiBzZWxlY3RlZCByb3dcbiAqL1xuZXhwb3J0IGNvbnN0IHNldEZvY3VzVG8gPSAoZ3JpZCwgZm9jdXNUbywgZm9jdXNUb0xhc3RSb3cgPSBmYWxzZSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX0ZPQ1VTX1RPLFxuICAgIGZvY3VzVG8sXG4gICAgZm9jdXNUb0xhc3RSb3csXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGV4dGVuZERhdGEgPSAoZ3JpZCwgY29sdW1ucywgZGF0YSwgcHJlcGVuZCA9IGZhbHNlKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBjb25zdCBpbW11dGFibGVEYXRhID0gSW1tdXRhYmxlLkl0ZXJhYmxlLmlzSXRlcmFibGUoZGF0YSkgPyBkYXRhIDogSW1tdXRhYmxlLmZyb21KUyhkYXRhKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0VYVEVORF9EQVRBLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGRhdGE6IGltbXV0YWJsZURhdGEsXG4gICAgcHJlcGVuZCxcbiAgfSk7XG4gIGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICBhcHBseVNvcnQoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbn07XG5cbmV4cG9ydCBjb25zdCByZXNpemVDb2x1bW4gPSAoZ3JpZCwgY29sdW1uS2V5LCB3aWR0aCkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgY29uc3QgY29sdW1uV2lkdGhzID0gZ2V0U3RhdGUoKVxuICAgIC5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ2NvbmZpZycsICdjb2x1bW5XaWR0aHMnXSwgTWFwKCkpXG4gICAgLnNldChjb2x1bW5LZXksIHdpZHRoKTtcbiAgVXRpbHMuc2F2ZUNvbHVtbldpZHRocyhncmlkLCBjb2x1bW5XaWR0aHMpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVTSVpFX0NPTFVNTixcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBjb2x1bW5XaWR0aHMsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGVkaXQgPSBncmlkID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0VESVQsXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGNhbmNlbCA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0FOQ0VMLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzYXZlID0gKGdyaWQsIGNiID0gKCkgPT4ge30pID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NBVkUsXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xuICBjYigpO1xufTtcblxuZXhwb3J0IGNvbnN0IHNhdmVTdWNjZXNzID0gKGdyaWQsIGNvbHVtbnMsIHNhdmVkSXRlbXMpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TQVZFX1NVQ0NFU1MsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgICBzYXZlZEl0ZW1zLFxuICB9KTtcbiAgYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gIGFwcGx5U29ydChncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xufTtcblxuZXhwb3J0IGNvbnN0IHNhdmVQYXJ0aWFsU3VjY2VzcyA9IChncmlkLCBjb2x1bW5zLCBzYXZlZEl0ZW1zKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0FWRV9QQVJUSUFMX1NVQ0NFU1MsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgICBzYXZlZEl0ZW1zLFxuICB9KTtcbiAgYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gIGFwcGx5U29ydChncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xufTtcblxuZXhwb3J0IGNvbnN0IHNhdmVGYWlsID0gZ3JpZCA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TQVZFX0ZBSUwsXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZSA9IChncmlkLCBjb2x1bW5EZWZhdWx0VmFsdWVzKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEUsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgY29sdW1uRGVmYXVsdFZhbHVlcyxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgYWRkTmV3SXRlbSA9IChncmlkLCBjb2x1bW5EZWZhdWx0VmFsdWVzKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9BRERfTkVXX0lURU0sXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgY29sdW1uRGVmYXVsdFZhbHVlcyxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlSXRlbSA9IChncmlkLCByb3dJZCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0lURU0sXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgICByb3dJZCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlTmV3SXRlbSA9IChncmlkLCBpbmRleCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGluZGV4LFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVOZXdJdGVtcyA9IChncmlkLCBpbmRleGVzKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU1TLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGluZGV4ZXMsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZSA9IChncmlkLCBjYiA9ICgpID0+IHt9KSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkUsXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xuICBjYigpO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZVN1Y2Nlc3MgPSAoZ3JpZCwgcmVtb3ZlZElkcykgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX1NVQ0NFU1MsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgICByZW1vdmVkSWRzLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVGYWlsID0gZ3JpZCA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfRkFJTCxcbiAgICBpZDogZ3JpZC5pZCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZWRpdENlbGxWYWx1ZUNoYW5nZSA9IChncmlkLCBkYXRhSWQsIGtleVBhdGgsIHZhbHVlKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9FRElUX0NFTExfVkFMVUVfQ0hBTkdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGRhdGFJZCxcbiAgICBrZXlQYXRoLFxuICAgIHZhbHVlLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBlZGl0Q2VsbFZhbHVlVmFsaWRhdGUgPSAoZ3JpZCwgZGF0YUlkLCBrZXlQYXRoLCB2YWx1ZSwgdmFsaWRhdG9ycyA9IFtdKSA9PiAoXG4gIGRpc3BhdGNoLFxuICBnZXRTdGF0ZSxcbikgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgbGV0IHZhbGlkYXRpb25TdGF0ZSA9IHsgdmFsaWQ6IHRydWUgfTtcbiAgdmFsaWRhdG9ycy5mb3JFYWNoKCh2YWxpZGF0b3IpID0+IHtcbiAgICBpZiAodmFsaWRhdGlvblN0YXRlLnZhbGlkKSB7XG4gICAgICBpZiAodmFsaWRhdG9yLnVuaXF1ZSkge1xuICAgICAgICBpZiAodmFsdWUgIT09ICcnIHx8IHZhbHVlICE9PSBudWxsIHx8IHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAvLyBjb21iaW5lIHJlYWwgZGF0YSB3aXRoIGN1cnJlbnQgdW5zYXZlZCBlZGl0ZWQgZGF0YVxuICAgICAgICAgIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG4gICAgICAgICAgY29uc3QgZWRpdERhdGEgPSBncmlkRGF0YS5nZXQoJ2VkaXREYXRhJyk7XG4gICAgICAgICAgbGV0IGFsbERhdGEgPSBncmlkRGF0YS5nZXQoJ2FsbERhdGEnKTtcbiAgICAgICAgICBpZiAoZWRpdERhdGEpIHtcbiAgICAgICAgICAgIGVkaXREYXRhLmZvckVhY2goKGVkaXREYXRhSXRlbSwgZWRpdERhdGFJdGVtSWQpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgZm91bmRJbmRleCA9IGFsbERhdGEuZmluZEluZGV4KGQgPT4gZC5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGVkaXREYXRhSXRlbUlkKTtcbiAgICAgICAgICAgICAgaWYgKGZvdW5kSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgYWxsRGF0YSA9IGFsbERhdGEubWVyZ2VEZWVwSW4oW2ZvdW5kSW5kZXhdLCBlZGl0RGF0YUl0ZW0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gZGV0ZXJtaW5lIHVuaXF1ZW5lc3NcbiAgICAgICAgICBjb25zdCBmaW5kaW5nID0gYWxsRGF0YS5maW5kKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoZ3JpZC5pZEtleVBhdGgubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIC8vIGRvbid0IHNlbGYgY29tcGFyZVxuICAgICAgICAgICAgICBpZiAoaXRlbS5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGRhdGFJZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uZ2V0SW4oa2V5UGF0aCkgPT09IHZhbHVlO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChmaW5kaW5nKSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB7XG4gICAgICAgICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgICAgICAgICAgbWVzc2FnZTogJ1ZhbGlkYXRpb24uVW5pcXVlJyxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHZhbGlkYXRvci52YWxpZGF0ZVdpdGhSb3dEYXRhKSB7XG4gICAgICAgIC8vIEN1c3RvbSB2YWxpZGF0b3IgZnVuY3Rpb24gd2l0aCByb3dEYXRhIGFzIHBhcmFtZXRlcnNcbiAgICAgICAgY29uc3QgZ3JpZERhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldChncmlkLmlkKTtcbiAgICAgICAgY29uc3QgZWRpdERhdGEgPSBncmlkRGF0YS5nZXRJbihbJ2VkaXREYXRhJywgZGF0YUlkXSwgTWFwKCkpO1xuICAgICAgICBsZXQgcm93RGF0YSA9IGdyaWREYXRhLmdldCgnYWxsRGF0YScpLmZpbmQoaXRlbSA9PiBpdGVtLmdldEluKGdyaWQuaWRLZXlQYXRoKSA9PT0gZGF0YUlkKTtcbiAgICAgICAgaWYgKHJvd0RhdGEpIHtcbiAgICAgICAgICByb3dEYXRhID0gcm93RGF0YS5tZXJnZURlZXAoZWRpdERhdGEpO1xuICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IHZhbGlkYXRvci5wYXJhbXMgPyBPYmplY3QudmFsdWVzKHZhbGlkYXRvci5wYXJhbXMpIDogW107XG4gICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0gdmFsaWRhdG9yLnZhbGlkYXRlV2l0aFJvd0RhdGEodmFsdWUsIHJvd0RhdGEsIC4uLnBhcmFtcyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodmFsaWRhdG9yLnZhbGlkYXRlV2l0aEdyaWREYXRhKSB7XG4gICAgICAgIC8vIEN1c3RvbSB2YWxpZGF0b3IgZnVuY3Rpb24gd2l0aCByb3dEYXRhIGFuZCBncmlkRGF0YSBhcyBwYXJhbWV0ZXJzXG4gICAgICAgIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG5cbiAgICAgICAgbGV0IGFsbERhdGEgPSBncmlkRGF0YS5nZXQoJ2FsbERhdGEnLCBMaXN0KCkpO1xuICAgICAgICBjb25zdCBlZGl0RGF0YSA9IGdyaWREYXRhLmdldCgnZWRpdERhdGEnLCBNYXAoKSk7XG5cbiAgICAgICAgZWRpdERhdGEuZm9yRWFjaCgoZWRpdFJvdywgZWRpdEtleSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGZvdW5kSW5kZXggPSBhbGxEYXRhLmZpbmRJbmRleChkID0+IGQuZ2V0SW4oZ3JpZC5pZEtleVBhdGgpID09PSBlZGl0S2V5KTtcbiAgICAgICAgICBpZiAoZm91bmRJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIGFsbERhdGEgPSBhbGxEYXRhLm1lcmdlRGVlcEluKFtmb3VuZEluZGV4XSwgZWRpdFJvdyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgZWRpdFJvd0RhdGEgPSBlZGl0RGF0YS5nZXQoZGF0YUlkLCBNYXAoKSk7XG4gICAgICAgIGxldCByb3dEYXRhID0gYWxsRGF0YS5maW5kKGl0ZW0gPT4gaXRlbS5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGRhdGFJZCk7XG4gICAgICAgIGlmIChyb3dEYXRhKSB7XG4gICAgICAgICAgcm93RGF0YSA9IHJvd0RhdGEubWVyZ2VEZWVwKGVkaXRSb3dEYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByb3dEYXRhID0gZWRpdFJvd0RhdGE7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGFyYW1zID0gdmFsaWRhdG9yLnBhcmFtcyA/IE9iamVjdC52YWx1ZXModmFsaWRhdG9yLnBhcmFtcykgOiBbXTtcbiAgICAgICAgdmFsaWRhdGlvblN0YXRlID0gdmFsaWRhdG9yLnZhbGlkYXRlV2l0aEdyaWREYXRhKHZhbHVlLCByb3dEYXRhLCBhbGxEYXRhLCAuLi5wYXJhbXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gdmFsaWRhdG9yLnBhcmFtcyA/IE9iamVjdC52YWx1ZXModmFsaWRhdG9yLnBhcmFtcykgOiBbXTtcbiAgICAgICAgdmFsaWRhdGlvblN0YXRlID0gdmFsaWRhdG9yLnZhbGlkYXRlKHZhbHVlLCAuLi5wYXJhbXMpO1xuICAgICAgICBpZiAodmFsaWRhdG9yLnBhcmFtcykge1xuICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlVmFsdWVzID0gdmFsaWRhdG9yLnBhcmFtcztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIGlmICh2YWxpZGF0aW9uU3RhdGUudmFsaWQpIHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgbWVzc2FnZVR5cGU6ICdlcnJvcicsXG4gICAgICBkYXRhSWQsXG4gICAgICBrZXlQYXRoLFxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBtZXNzYWdlVHlwZTogJ2Vycm9yJyxcbiAgICAgIGRhdGFJZCxcbiAgICAgIGtleVBhdGgsXG4gICAgICBtZXNzYWdlSWQ6IHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlLFxuICAgICAgbWVzc2FnZVZhbHVlczogdmFsaWRhdGlvblN0YXRlLm1lc3NhZ2VWYWx1ZXMsXG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHZhbGlkYXRpb25TdGF0ZS52YWxpZDtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVDZWxsVmFsdWVDaGFuZ2UgPSAoZ3JpZCwgcm93SW5kZXgsIGtleVBhdGgsIHZhbHVlKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9DSEFOR0UsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgcm93SW5kZXgsXG4gICAga2V5UGF0aCxcbiAgICB2YWx1ZSxcbiAgfSk7XG59O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNlbGxWYWx1ZVZhbGlkYXRlID0gKGdyaWQsIHJvd0luZGV4LCBrZXlQYXRoLCB2YWx1ZSwgdmFsaWRhdG9ycyA9IFtdKSA9PiAoXG4gIGRpc3BhdGNoLFxuICBnZXRTdGF0ZSxcbikgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgbGV0IHZhbGlkYXRpb25TdGF0ZSA9IHsgdmFsaWQ6IHRydWUgfTtcbiAgdmFsaWRhdG9ycy5mb3JFYWNoKCh2YWxpZGF0b3IpID0+IHtcbiAgICBpZiAodmFsaWRhdGlvblN0YXRlLnZhbGlkKSB7XG4gICAgICBpZiAodmFsaWRhdG9yLnVuaXF1ZSkge1xuICAgICAgICBpZiAodmFsdWUgIT09ICcnIHx8IHZhbHVlICE9PSBudWxsIHx8IHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjb25zdCBmaW5kaW5nID0gZ2V0U3RhdGUoKVxuICAgICAgICAgICAgLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnYWxsRGF0YSddKVxuICAgICAgICAgICAgLmZpbmQoaXRlbSA9PiBpdGVtLmdldEluKGtleVBhdGgpID09PSB2YWx1ZSk7XG4gICAgICAgICAgaWYgKGZpbmRpbmcpIHtcbiAgICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHtcbiAgICAgICAgICAgICAgdmFsaWQ6IGZhbHNlLFxuICAgICAgICAgICAgICBtZXNzYWdlOiAnVmFsaWRhdGlvbi5VbmlxdWUnLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZmluZDIgPSBnZXRTdGF0ZSgpXG4gICAgICAgICAgICAgIC5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ2NyZWF0ZURhdGEnXSlcbiAgICAgICAgICAgICAgLmZpbmQoKGl0ZW0sIGkpID0+IGkgIT09IHJvd0luZGV4ICYmIGl0ZW0uZ2V0SW4oa2V5UGF0aCkgPT09IHZhbHVlKTtcbiAgICAgICAgICAgIGlmIChmaW5kMikge1xuICAgICAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgdmFsaWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdWYWxpZGF0aW9uLlVuaXF1ZScsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHZhbGlkYXRvci52YWxpZGF0ZVdpdGhSb3dEYXRhKSB7XG4gICAgICAgIGNvbnN0IHJvd0RhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnY3JlYXRlRGF0YScsIHJvd0luZGV4XSk7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHZhbGlkYXRvci5wYXJhbXMgPyBPYmplY3QudmFsdWVzKHZhbGlkYXRvci5wYXJhbXMpIDogW107XG4gICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZVdpdGhSb3dEYXRhKHZhbHVlLCByb3dEYXRhLCAuLi5wYXJhbXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gdmFsaWRhdG9yLnBhcmFtcyA/IE9iamVjdC52YWx1ZXModmFsaWRhdG9yLnBhcmFtcykgOiBbXTtcbiAgICAgICAgdmFsaWRhdGlvblN0YXRlID0gdmFsaWRhdG9yLnZhbGlkYXRlKHZhbHVlLCAuLi5wYXJhbXMpO1xuICAgICAgICBpZiAodmFsaWRhdG9yLnBhcmFtcykge1xuICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlVmFsdWVzID0gdmFsaWRhdG9yLnBhcmFtcztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIGlmICh2YWxpZGF0aW9uU3RhdGUudmFsaWQpIHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9ISURFX01FU1NBR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIG1lc3NhZ2VUeXBlOiAnZXJyb3InLFxuICAgICAgcm93SW5kZXgsXG4gICAgICBrZXlQYXRoLFxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgbWVzc2FnZVR5cGU6ICdlcnJvcicsXG4gICAgICByb3dJbmRleCxcbiAgICAgIGtleVBhdGgsXG4gICAgICBtZXNzYWdlSWQ6IHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlLFxuICAgICAgbWVzc2FnZVZhbHVlczogdmFsaWRhdGlvblN0YXRlLm1lc3NhZ2VWYWx1ZXMsXG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHZhbGlkYXRpb25TdGF0ZS52YWxpZDtcbn07XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG5leHBvcnQgY29uc3QgY2VsbFNob3dNZXNzYWdlID0gKFxuICBncmlkLFxuICBtZXNzYWdlVHlwZSxcbiAgZGF0YUlkLFxuICBrZXlQYXRoLFxuICBtZXNzYWdlSWQsXG4gIG1lc3NhZ2VWYWx1ZXMsXG4pID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIG1lc3NhZ2VUeXBlLFxuICAgIGRhdGFJZCxcbiAgICBrZXlQYXRoLFxuICAgIG1lc3NhZ2VJZCxcbiAgICBtZXNzYWdlVmFsdWVzLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBjZWxsU2hvd01lc3NhZ2VzID0gKGdyaWQsIG1lc3NhZ2VzKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRVMsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgbWVzc2FnZXMsXG4gIH0pO1xufTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbmV4cG9ydCBjb25zdCBjZWxsSGlkZU1lc3NhZ2UgPSAoXG4gIGdyaWQsXG4gIG1lc3NhZ2VUeXBlID0gbnVsbCxcbiAgZGF0YUlkID0gbnVsbCxcbiAga2V5UGF0aCA9IG51bGwsXG4pID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfSElERV9NRVNTQUdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIG1lc3NhZ2VUeXBlLFxuICAgIGRhdGFJZCxcbiAgICBrZXlQYXRoLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVDZWxsU2hvd01lc3NhZ2UgPSAoXG4gIGdyaWQsXG4gIG1lc3NhZ2VUeXBlLFxuICByb3dJbmRleCxcbiAga2V5UGF0aCxcbiAgbWVzc2FnZUlkLFxuICBtZXNzYWdlVmFsdWVzLFxuKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9TSE9XX01FU1NBR0UsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgbWVzc2FnZVR5cGUsXG4gICAgcm93SW5kZXgsXG4gICAga2V5UGF0aCxcbiAgICBtZXNzYWdlSWQsXG4gICAgbWVzc2FnZVZhbHVlcyxcbiAgfSk7XG59O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNlbGxIaWRlTWVzc2FnZSA9IChcbiAgZ3JpZCxcbiAgbWVzc2FnZVR5cGUgPSBudWxsLFxuICByb3dJbmRleCA9IG51bGwsXG4gIGtleVBhdGggPSBudWxsLFxuKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9ISURFX01FU1NBR0UsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgbWVzc2FnZVR5cGUsXG4gICAgcm93SW5kZXgsXG4gICAga2V5UGF0aCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgY2VsbFNlbGVjdGlvbkNoYW5nZSA9IChncmlkLCBzZWxlY3RlZENlbGwgPSBudWxsKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICBzZWxlY3RlZENlbGwsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TRUxFQ1RJT05fQ0hBTkdFLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBpdGVtU2VsZWN0aW9uQ2hhbmdlID0gKGdyaWQsIHJvd0luZGV4LCBjdHJsUHJlc3NlZCA9IGZhbHNlLCBzaGlmdFByZXNzZWQgPSBmYWxzZSkgPT4gKFxuICBkaXNwYXRjaCxcbiAgZ2V0U3RhdGUsXG4pID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9JVEVNX1NFTEVDVElPTl9DSEFOR0UsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgcm93SW5kZXgsXG4gICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgICBjdHJsUHJlc3NlZCxcbiAgICBzaGlmdFByZXNzZWQsXG4gIH0pO1xuICBVdGlscy5zYXZlU2VsZWN0ZWRJdGVtcyhncmlkLCBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnc2VsZWN0ZWRJdGVtcyddKSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0QWxsSXRlbXNDaGFuZ2UgPSBncmlkID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRUxFQ1RfQUxMX0lURU1TX0NIQU5HRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBpZEtleVBhdGg6IGdyaWQuaWRLZXlQYXRoLFxuICB9KTtcbiAgVXRpbHMuc2F2ZVNlbGVjdGVkSXRlbXMoZ3JpZCwgZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ3NlbGVjdGVkSXRlbXMnXSkpO1xufTtcblxuZXhwb3J0IGNvbnN0IGNsZWFyU2VsZWN0ZWRJdGVtcyA9IGdyaWQgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NMRUFSX1NFTEVDVEVEX0lURU1TLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbiAgVXRpbHMuc2F2ZVNlbGVjdGVkSXRlbXMoZ3JpZCwgZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ3NlbGVjdGVkSXRlbXMnXSkpO1xufTtcblxuZXhwb3J0IGNvbnN0IHRvZ2dsZUZpbHRlcmluZyA9IGdyaWQgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgY29uc3QgaXNGaWx0ZXJpbmcgPSAhZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihcbiAgICBbZ3JpZC5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2lzRmlsdGVyaW5nJ10sXG4gICAgZmFsc2UsXG4gICk7XG4gIFV0aWxzLnNhdmVJc0ZpbHRlcmluZyhncmlkLCBpc0ZpbHRlcmluZyk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9UT0dHTEVfRklMVEVSSU5HLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGlzRmlsdGVyaW5nLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUVkaXRlZFJvd3MgPSAoZ3JpZCwgY29sdW1ucykgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgY29uc3QgZ3JpZERhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldChncmlkLmlkKTtcbiAgY29uc3QgZWRpdERhdGEgPSBncmlkRGF0YS5nZXQoJ2VkaXREYXRhJywgTWFwKCkpO1xuICBsZXQgYWxsR29vZCA9IHRydWU7XG4gIGVkaXREYXRhLmZvckVhY2goKGVkaXREYXRhUm93LCBkYXRhSWQpID0+IHtcbiAgICBjb2x1bW5zLmZvckVhY2goKGNvbCkgPT4ge1xuICAgICAgbGV0IHZhbHVlID0gZWRpdERhdGFSb3cuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG4gICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YWx1ZSA9IGdyaWREYXRhXG4gICAgICAgICAgLmdldCgnYWxsRGF0YScpXG4gICAgICAgICAgLmZpbmQoZGF0YSA9PiBkYXRhLmdldEluKGdyaWQuaWRLZXlQYXRoKSA9PT0gZGF0YUlkKVxuICAgICAgICAgIC5nZXRJbihjb2wudmFsdWVLZXlQYXRoKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGlzVmFsaWQgPSBlZGl0Q2VsbFZhbHVlVmFsaWRhdGUoZ3JpZCwgZGF0YUlkLCBjb2wudmFsdWVLZXlQYXRoLCB2YWx1ZSwgY29sLnZhbGlkYXRvcnMpKFxuICAgICAgICBkaXNwYXRjaCxcbiAgICAgICAgZ2V0U3RhdGUsXG4gICAgICApO1xuICAgICAgaWYgKGFsbEdvb2QgJiYgIWlzVmFsaWQpIHtcbiAgICAgICAgYWxsR29vZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIGFsbEdvb2Q7XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlRW1wdHlDcmVhdGVkUm93cyA9IChncmlkLCBjb2x1bW5zKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBjb25zdCBjcmVhdGVEYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ2NyZWF0ZURhdGEnXSwgTWFwKCkpO1xuICBjb25zdCBpbmRleGVzID0gW107XG4gIGNyZWF0ZURhdGEuZm9yRWFjaCgoY3JlYXRlRGF0YVJvdywgcm93SW5kZXgpID0+IHtcbiAgICBsZXQgaXNFbXB0eSA9IHRydWU7XG4gICAgY29sdW1ucy5mb3JFYWNoKChjb2wpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gY3JlYXRlRGF0YVJvdy5nZXRJbihjb2wudmFsdWVLZXlQYXRoKTtcbiAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSAnJyAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICBpc0VtcHR5ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGlzRW1wdHkpIHtcbiAgICAgIGluZGV4ZXMucHVzaChyb3dJbmRleCk7XG4gICAgfVxuICB9KTtcbiAgaWYgKGluZGV4ZXMubGVuZ3RoID4gMCkge1xuICAgIHJlbW92ZU5ld0l0ZW1zKGdyaWQsIGluZGV4ZXMpKGRpc3BhdGNoKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHZhbGlkYXRlQ3JlYXRlZFJvd3MgPSAoZ3JpZCwgY29sdW1ucykgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgcmVtb3ZlRW1wdHlDcmVhdGVkUm93cyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICBjb25zdCBjcmVhdGVEYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ2NyZWF0ZURhdGEnXSwgTWFwKCkpO1xuICBsZXQgYWxsR29vZCA9IHRydWU7XG4gIGNyZWF0ZURhdGEuZm9yRWFjaCgoY3JlYXRlRGF0YVJvdywgcm93SW5kZXgpID0+IHtcbiAgICBjb2x1bW5zLmZvckVhY2goKGNvbCkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSBjcmVhdGVEYXRhUm93LmdldEluKGNvbC52YWx1ZUtleVBhdGgpO1xuICAgICAgY29uc3QgaXNWYWxpZCA9IGNyZWF0ZUNlbGxWYWx1ZVZhbGlkYXRlKFxuICAgICAgICBncmlkLFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgY29sLnZhbHVlS2V5UGF0aCxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIGNvbC52YWxpZGF0b3JzLFxuICAgICAgKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICAgICAgaWYgKGFsbEdvb2QgJiYgIWlzVmFsaWQpIHtcbiAgICAgICAgYWxsR29vZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIGFsbEdvb2Q7XG59O1xuXG5leHBvcnQgY29uc3QgdXBkYXRlRXhpc3RpbmdDZWxsVmFsdWUgPSAoZ3JpZCwgZGF0YUlkLCBrZXlQYXRoLCB2YWx1ZSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfVVBEQVRFX0VYSVNUSU5HX0NFTExfVkFMVUUsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgZGF0YUlkLFxuICAgIGtleVBhdGgsXG4gICAgdmFsdWUsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldEVkaXREYXRhID0gKGdyaWQsIGRhdGEsIGNlbGxNZXNzYWdlcyA9IE1hcCgpKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICBkYXRhLFxuICAgIGNlbGxNZXNzYWdlcyxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfRURJVF9EQVRBLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBvcGVuQ29sdW1uU2V0dGluZ3NNb2RhbCA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX09QRU4sXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbCA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX0NMT1NFLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzYXZlQ29sdW1uU2V0dGluZ3MgPSAoZ3JpZCwgaGlkZGVuQ29sdW1ucywgY29sdW1uT3JkZXIpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgVXRpbHMuc2F2ZUNvbHVtblNldHRpbmdzKGdyaWQsIGhpZGRlbkNvbHVtbnMsIGNvbHVtbk9yZGVyKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGNvbHVtbk9yZGVyLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXRQYWdlID0gKGdyaWQsIHBhZ2UpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5zYXZlUGFnZShncmlkLCBwYWdlKTtcbiAgZGlzcGF0Y2goe1xuICAgIHBhZ2UsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX1BBR0UsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldFJvd3NPblBhZ2UgPSAoZ3JpZCwgcm93c09uUGFnZSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLnNhdmVSb3dzT25QYWdlKGdyaWQsIHJvd3NPblBhZ2UpO1xuICBkaXNwYXRjaCh7XG4gICAgcm93c09uUGFnZSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfUk9XU19PTl9QQUdFLFxuICB9KTtcbn07XG4iXX0=