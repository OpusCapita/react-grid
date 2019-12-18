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

var setData = function setData(grid, columns, data, isEditing, isCreating) {
  if (isEditing === void 0) {
    isEditing = false;
  }

  if (isCreating === void 0) {
    isCreating = false;
  }

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
      selectedItems: selectedItems,
      isEditing: isEditing,
      isCreating: isCreating
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
        } else if (validator.validateWithGridData) {
          var createData = getState().datagrid.getIn([grid.id, 'createData']);

          var _rowData2 = createData.get(rowIndex);

          var allData = getState().datagrid.getIn([grid.id, 'allData']);
          var combinedData = allData.concat(createData);

          var _params3 = validator.params ? Object.values(validator.params) : [];

          validationState = validator.validateWithGridData.apply(validator, [value, _rowData2, combinedData].concat(_params3));
        } else {
          var _params4 = validator.params ? Object.values(validator.params) : [];

          validationState = validator.validate.apply(validator, [value].concat(_params4));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5hY3Rpb25zLmpzIl0sIm5hbWVzIjpbIlRZUEVTIiwiUExBVEZPUk1fREFUQUdSSURfSU5WQUxJREFURSIsIlBMQVRGT1JNX0RBVEFHUklEX0JVU1kiLCJQTEFURk9STV9EQVRBR1JJRF9SRUFEWSIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9EQVRBIiwiUExBVEZPUk1fREFUQUdSSURfQVBQTFlfU09SVCIsIlBMQVRGT1JNX0RBVEFHUklEX1NPUlRfQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfUkVTSVpFX0NPTFVNTiIsIlBMQVRGT1JNX0RBVEFHUklEX0VESVQiLCJQTEFURk9STV9EQVRBR1JJRF9DQU5DRUwiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFIiwiUExBVEZPUk1fREFUQUdSSURfRVhURU5EX0RBVEEiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFX1NVQ0NFU1MiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFX1BBUlRJQUxfU1VDQ0VTUyIsIlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfRkFJTCIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURSIsIlBMQVRGT1JNX0RBVEFHUklEX0FERF9ORVdfSVRFTSIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9JVEVNIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNUyIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRSIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9TVUNDRVNTIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUwiLCJQTEFURk9STV9EQVRBR1JJRF9FRElUX0NFTExfVkFMVUVfQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0UiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRVMiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX0hJREVfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX0NIQU5HRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX1ZBTElEQVRFIiwiUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TRUxFQ1RJT05fQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9DTEVBUl9TRUxFQ1RFRF9JVEVNUyIsIlBMQVRGT1JNX0RBVEFHUklEX1RPR0dMRV9GSUxURVJJTkciLCJQTEFURk9STV9EQVRBR1JJRF9GSUxURVJfREFUQV9DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9GSUxURVJTIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX0ZJTFRFUlMiLCJQTEFURk9STV9EQVRBR1JJRF9VUERBVEVfRVhJU1RJTkdfQ0VMTF9WQUxVRSIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9FRElUX0RBVEEiLCJQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfT1BFTiIsIlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFIiwiUExBVEZPUk1fREFUQUdSSURfRk9SQ0VfUkVGUkVTSCIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9GT0NVU19UTyIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9QQUdFIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX1JPV1NfT05fUEFHRSIsImludmFsaWRhdGUiLCJncmlkIiwiZGlzcGF0Y2giLCJVdGlscyIsImNoZWNrR3JpZFBhcmFtIiwidHlwZSIsImlkIiwiZm9yY2VSZWZyZXNoIiwic2V0VGltZW91dCIsImRvY3VtZW50IiwiY3JlYXRlRXZlbnQiLCJldnQiLCJpbml0RXZlbnQiLCJ3aW5kb3ciLCJkaXNwYXRjaEV2ZW50Iiwic2V0QnVzeSIsInNldFJlYWR5IiwiYXBwbHlGaWx0ZXJzIiwiY29sdW1ucyIsImdldFN0YXRlIiwiZm9yRWFjaCIsImdyaWREYXRhIiwiZGF0YWdyaWQiLCJnZXQiLCJmaWx0ZXJEYXRhIiwiZ2V0SW4iLCJhbGxEYXRhIiwiZGF0YSIsInBhZ2luYXRpb24iLCJpc0VtcHR5IiwiZGF0ZUZvcm1hdCIsImdldERhdGVGb3JtYXQiLCJ1c2VyIiwiZmlsdGVyIiwicm93IiwiaGl0cyIsImZpbHRlclZhbHVlIiwiZmlsdGVyQ29sdW1uIiwiY29sdW1uIiwiZ2V0Q29sdW1uS2V5IiwidmFsdWUiLCJ2YWx1ZUtleVBhdGgiLCJmaWx0ZXJNYXRjaGVyIiwiZ2V0RmlsdGVyTWF0Y2hlciIsInNpemUiLCJzZXRBbmRBcHBseUZpbHRlcnMiLCJmaWx0ZXJpbmdEYXRhIiwibm9ybWFsaXplRmlsdGVyaW5nRGF0YSIsInNhdmVGaWx0ZXJEYXRhIiwiZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlIiwib3JpZ0ZpbHRlckRhdGEiLCJjb2x1bW5LZXkiLCJ2YWx1ZUVtcHR5Q2hlY2tlciIsImdldFZhbHVlRW1wdHlDaGVja2VyIiwic2V0IiwidG9KUyIsImFwcGx5U29ydCIsInNvcnREYXRhIiwic29ydENvbHVtbiIsInNvcnRPcmRlciIsImNvbCIsIm9yaWdBbGxEYXRhIiwiY29tcGFyYXRvciIsImdldFNvcnRDb21wYXJhdG9yIiwidmFsdWVHZXR0ZXIiLCJnZXRTb3J0VmFsdWVHZXR0ZXIiLCJzb3J0IiwiYSIsImIiLCJ2YWxBIiwidmFsQiIsInNvcnRDaGFuZ2UiLCJuZXdTb3J0Iiwic2F2ZVNvcnREYXRhIiwic2V0RGF0YSIsImlzRWRpdGluZyIsImlzQ3JlYXRpbmciLCJjaGVja0NvbHVtbnNQYXJhbSIsImNvbmZpZ0RhdGEiLCJsb2FkR3JpZENvbmZpZyIsImltbXV0YWJsZURhdGEiLCJJbW11dGFibGUiLCJJdGVyYWJsZSIsImlzSXRlcmFibGUiLCJmcm9tSlMiLCJzZWxlY3RlZEl0ZW1zIiwibG9hZFNlbGVjdGVkSXRlbXMiLCJpdGVtIiwiZmluZCIsImRhdGFJdGVtIiwiaWRLZXlQYXRoIiwiY29uZmlnIiwic2V0Rm9jdXNUbyIsImZvY3VzVG8iLCJmb2N1c1RvTGFzdFJvdyIsImV4dGVuZERhdGEiLCJwcmVwZW5kIiwicmVzaXplQ29sdW1uIiwid2lkdGgiLCJjb2x1bW5XaWR0aHMiLCJzYXZlQ29sdW1uV2lkdGhzIiwiZWRpdCIsImNhbmNlbCIsInNhdmUiLCJjYiIsInNhdmVTdWNjZXNzIiwic2F2ZWRJdGVtcyIsInNhdmVQYXJ0aWFsU3VjY2VzcyIsInNhdmVGYWlsIiwiY3JlYXRlIiwiY29sdW1uRGVmYXVsdFZhbHVlcyIsImFkZE5ld0l0ZW0iLCJyZW1vdmVJdGVtIiwicm93SWQiLCJyZW1vdmVOZXdJdGVtIiwiaW5kZXgiLCJyZW1vdmVOZXdJdGVtcyIsImluZGV4ZXMiLCJyZW1vdmUiLCJyZW1vdmVTdWNjZXNzIiwicmVtb3ZlZElkcyIsInJlbW92ZUZhaWwiLCJlZGl0Q2VsbFZhbHVlQ2hhbmdlIiwiZGF0YUlkIiwia2V5UGF0aCIsImVkaXRDZWxsVmFsdWVWYWxpZGF0ZSIsInZhbGlkYXRvcnMiLCJ2YWxpZGF0aW9uU3RhdGUiLCJ2YWxpZCIsInZhbGlkYXRvciIsInVuaXF1ZSIsInVuZGVmaW5lZCIsImVkaXREYXRhIiwiZWRpdERhdGFJdGVtIiwiZWRpdERhdGFJdGVtSWQiLCJmb3VuZEluZGV4IiwiZmluZEluZGV4IiwiZCIsIm1lcmdlRGVlcEluIiwiZmluZGluZyIsImxlbmd0aCIsIm1lc3NhZ2UiLCJ2YWxpZGF0ZVdpdGhSb3dEYXRhIiwicm93RGF0YSIsIm1lcmdlRGVlcCIsInBhcmFtcyIsIk9iamVjdCIsInZhbHVlcyIsInZhbGlkYXRlV2l0aEdyaWREYXRhIiwiZWRpdFJvdyIsImVkaXRLZXkiLCJlZGl0Um93RGF0YSIsInZhbGlkYXRlIiwibWVzc2FnZVZhbHVlcyIsImNlbGxNZXNzYWdlIiwibWVzc2FnZVR5cGUiLCJtZXNzYWdlSWQiLCJjcmVhdGVDZWxsVmFsdWVDaGFuZ2UiLCJyb3dJbmRleCIsImNyZWF0ZUNlbGxWYWx1ZVZhbGlkYXRlIiwiZmluZDIiLCJpIiwiY3JlYXRlRGF0YSIsImNvbWJpbmVkRGF0YSIsImNvbmNhdCIsImNyZWF0ZUNlbGxNZXNzYWdlIiwiY2VsbFNob3dNZXNzYWdlIiwiY2VsbFNob3dNZXNzYWdlcyIsIm1lc3NhZ2VzIiwiY2VsbEhpZGVNZXNzYWdlIiwiY3JlYXRlQ2VsbFNob3dNZXNzYWdlIiwiY3JlYXRlQ2VsbEhpZGVNZXNzYWdlIiwiY2VsbFNlbGVjdGlvbkNoYW5nZSIsInNlbGVjdGVkQ2VsbCIsIml0ZW1TZWxlY3Rpb25DaGFuZ2UiLCJjdHJsUHJlc3NlZCIsInNoaWZ0UHJlc3NlZCIsInNhdmVTZWxlY3RlZEl0ZW1zIiwic2VsZWN0QWxsSXRlbXNDaGFuZ2UiLCJjbGVhclNlbGVjdGVkSXRlbXMiLCJ0b2dnbGVGaWx0ZXJpbmciLCJpc0ZpbHRlcmluZyIsInNhdmVJc0ZpbHRlcmluZyIsInZhbGlkYXRlRWRpdGVkUm93cyIsImFsbEdvb2QiLCJlZGl0RGF0YVJvdyIsImlzVmFsaWQiLCJyZW1vdmVFbXB0eUNyZWF0ZWRSb3dzIiwiY3JlYXRlRGF0YVJvdyIsInB1c2giLCJ2YWxpZGF0ZUNyZWF0ZWRSb3dzIiwidXBkYXRlRXhpc3RpbmdDZWxsVmFsdWUiLCJzZXRFZGl0RGF0YSIsImNlbGxNZXNzYWdlcyIsIm9wZW5Db2x1bW5TZXR0aW5nc01vZGFsIiwiY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsIiwic2F2ZUNvbHVtblNldHRpbmdzIiwiaGlkZGVuQ29sdW1ucyIsImNvbHVtbk9yZGVyIiwic2V0UGFnZSIsInBhZ2UiLCJzYXZlUGFnZSIsInNldFJvd3NPblBhZ2UiLCJyb3dzT25QYWdlIiwic2F2ZVJvd3NP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QWEsR0FBRyxTQUFoQkEsYUFBZ0IsQ0FBQ3pNLElBQUQsRUFBTzBNLFVBQVA7QUFBQSxTQUFzQixVQUFDek0sUUFBRCxFQUFjO0FBQy9EQyx5QkFBTXlNLGNBQU4sQ0FBcUIzTSxJQUFyQixFQUEyQjBNLFVBQTNCOztBQUNBek0sSUFBQUEsUUFBUSxDQUFDO0FBQ1B5TSxNQUFBQSxVQUFVLEVBQVZBLFVBRE87QUFFUHJNLE1BQUFBLEVBQUUsRUFBRUwsSUFBSSxDQUFDSyxFQUZGO0FBR1BELE1BQUFBLElBQUksRUFBRXJELEtBQUssQ0FBQytDO0FBSEwsS0FBRCxDQUFSO0FBS0QsR0FQNEI7QUFBQSxDQUF0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJbW11dGFibGUsIHsgTWFwLCBMaXN0IH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCBVdGlscyBmcm9tICcuL2RhdGFncmlkLnV0aWxzJztcblxuZXhwb3J0IGNvbnN0IFRZUEVTID0ge1xuICBQTEFURk9STV9EQVRBR1JJRF9JTlZBTElEQVRFOiAnUExBVEZPUk1fREFUQUdSSURfSU5WQUxJREFURScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0JVU1k6ICdQTEFURk9STV9EQVRBR1JJRF9CVVNZJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVBRFk6ICdQTEFURk9STV9EQVRBR1JJRF9SRUFEWScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NFVF9EQVRBOiAnUExBVEZPUk1fREFUQUdSSURfU0VUX0RBVEEnLFxuICBQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9TT1JUOiAnUExBVEZPUk1fREFUQUdSSURfQVBQTFlfU09SVCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NPUlRfQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfU09SVF9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRVNJWkVfQ09MVU1OOiAnUExBVEZPUk1fREFUQUdSSURfUkVTSVpFX0NPTFVNTicsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0VESVQ6ICdQTEFURk9STV9EQVRBR1JJRF9FRElUJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0FOQ0VMOiAnUExBVEZPUk1fREFUQUdSSURfQ0FOQ0VMJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0FWRTogJ1BMQVRGT1JNX0RBVEFHUklEX1NBVkUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9FWFRFTkRfREFUQTogJ1BMQVRGT1JNX0RBVEFHUklEX0VYVEVORF9EQVRBJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0FWRV9TVUNDRVNTOiAnUExBVEZPUk1fREFUQUdSSURfU0FWRV9TVUNDRVNTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0FWRV9QQVJUSUFMX1NVQ0NFU1M6ICdQTEFURk9STV9EQVRBR1JJRF9TQVZFX1BBUlRJQUxfU1VDQ0VTUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NBVkVfRkFJTDogJ1BMQVRGT1JNX0RBVEFHUklEX1NBVkVfRkFJTCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NSRUFURTogJ1BMQVRGT1JNX0RBVEFHUklEX0NSRUFURScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0FERF9ORVdfSVRFTTogJ1BMQVRGT1JNX0RBVEFHUklEX0FERF9ORVdfSVRFTScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9JVEVNOiAnUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0lURU0nLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU06ICdQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU0nLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU1TOiAnUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRTogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9TVUNDRVNTOiAnUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX1NVQ0NFU1MnLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfRkFJTDogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9GQUlMJyxcbiAgUExBVEZPUk1fREFUQUdSSURfRURJVF9DRUxMX1ZBTFVFX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX0VESVRfQ0VMTF9WQUxVRV9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0VTOiAnUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0VTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0VMTF9ISURFX01FU1NBR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX0hJREVfTUVTU0FHRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX0hJREVfTUVTU0FHRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX1ZBTElEQVRFOiAnUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfVkFMSURBVEUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NFTEVDVElPTl9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NFTEVDVElPTl9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9JVEVNX1NFTEVDVElPTl9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9JVEVNX1NFTEVDVElPTl9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRUxFQ1RfQUxMX0lURU1TX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX1NFTEVDVF9BTExfSVRFTVNfQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0xFQVJfU0VMRUNURURfSVRFTVM6ICdQTEFURk9STV9EQVRBR1JJRF9DTEVBUl9TRUxFQ1RFRF9JVEVNUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1RPR0dMRV9GSUxURVJJTkc6ICdQTEFURk9STV9EQVRBR1JJRF9UT0dHTEVfRklMVEVSSU5HJyxcbiAgUExBVEZPUk1fREFUQUdSSURfRklMVEVSX0RBVEFfQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfRklMVEVSX0RBVEFfQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQVBQTFlfRklMVEVSUzogJ1BMQVRGT1JNX0RBVEFHUklEX0FQUExZX0ZJTFRFUlMnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRVRfRklMVEVSUzogJ1BMQVRGT1JNX0RBVEFHUklEX1NFVF9GSUxURVJTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfVVBEQVRFX0VYSVNUSU5HX0NFTExfVkFMVUU6ICdQTEFURk9STV9EQVRBR1JJRF9VUERBVEVfRVhJU1RJTkdfQ0VMTF9WQUxVRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NFVF9FRElUX0RBVEE6ICdQTEFURk9STV9EQVRBR1JJRF9TRVRfRURJVF9EQVRBJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX09QRU46ICdQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfT1BFTicsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFOiAnUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX1NBVkUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9GT1JDRV9SRUZSRVNIOiAnUExBVEZPUk1fREFUQUdSSURfRk9SQ0VfUkVGUkVTSCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NFVF9GT0NVU19UTzogJ1BMQVRGT1JNX0RBVEFHUklEX1NFVF9GT0NVU19UTycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NFVF9QQUdFOiAnUExBVEZPUk1fREFUQUdSSURfU0VUX1BBR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRVRfUk9XU19PTl9QQUdFOiAnUExBVEZPUk1fREFUQUdSSURfU0VUX1JPV1NfT05fUEFHRScsXG59O1xuXG5leHBvcnQgY29uc3QgaW52YWxpZGF0ZSA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfSU5WQUxJREFURSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZm9yY2VSZWZyZXNoID0gKCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIC8vIEZpcmUgcmVzaXplIGV2ZW50IHRvIHJlY2FsY3VsYXRlIGNvbXBvbmVudCBzaXplc1xuICAvLyBhbmQgdG8gZm9yY2UgcmVkcmF3IGFsbCBtb3VudGVkIGdyaWRzXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGlmIChkb2N1bWVudC5jcmVhdGVFdmVudCkge1xuICAgICAgY29uc3QgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKTtcbiAgICAgIGV2dC5pbml0RXZlbnQoJ3Jlc2l6ZScsIHRydWUsIGZhbHNlKTtcbiAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gICAgfVxuICB9LCAxKTtcbiAgZGlzcGF0Y2goeyB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9GT1JDRV9SRUZSRVNIIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldEJ1c3kgPSBncmlkID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0JVU1ksXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldFJlYWR5ID0gZ3JpZCA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRUFEWSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgYXBwbHlGaWx0ZXJzID0gKGdyaWQsIGNvbHVtbnMpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGlmICghY29sdW1ucyB8fCAhY29sdW1ucy5mb3JFYWNoKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG4gIGlmICghZ3JpZERhdGEpIHJldHVybiBmYWxzZTtcbiAgY29uc3QgZmlsdGVyRGF0YSA9IGdyaWREYXRhLmdldEluKFsnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnZmlsdGVyRGF0YSddLCBNYXAoKSk7XG4gIGNvbnN0IGFsbERhdGEgPSBncmlkRGF0YS5nZXQoJ2FsbERhdGEnKTtcbiAgbGV0IGRhdGE7XG4gIGlmIChncmlkLnBhZ2luYXRpb24pIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBzZXRCdXN5KGdyaWQpKGRpc3BhdGNoKTtcbiAgaWYgKGZpbHRlckRhdGEuaXNFbXB0eSgpKSB7XG4gICAgZGF0YSA9IGFsbERhdGE7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZGF0ZUZvcm1hdCA9IFV0aWxzLmdldERhdGVGb3JtYXQoZ3JpZCwgZ2V0U3RhdGUoKS51c2VyKTtcbiAgICBkYXRhID0gYWxsRGF0YS5maWx0ZXIoKHJvdykgPT4ge1xuICAgICAgbGV0IGhpdHMgPSAwO1xuICAgICAgZmlsdGVyRGF0YS5mb3JFYWNoKChmaWx0ZXJWYWx1ZSwgZmlsdGVyQ29sdW1uKSA9PiB7XG4gICAgICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sdW1uKSA9PiB7XG4gICAgICAgICAgaWYgKFV0aWxzLmdldENvbHVtbktleShjb2x1bW4pID09PSBmaWx0ZXJDb2x1bW4pIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gcm93LmdldEluKGNvbHVtbi52YWx1ZUtleVBhdGgpO1xuICAgICAgICAgICAgaWYgKHZhbHVlIHx8IHZhbHVlID09PSAwIHx8IHZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJNYXRjaGVyID0gVXRpbHMuZ2V0RmlsdGVyTWF0Y2hlcihjb2x1bW4sIGRhdGVGb3JtYXQpO1xuICAgICAgICAgICAgICBpZiAoZmlsdGVyTWF0Y2hlcihyb3csIGZpbHRlclZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGhpdHMgKz0gMTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBoaXRzID09PSBmaWx0ZXJEYXRhLnNpemU7XG4gICAgfSk7XG4gIH1cbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0FQUExZX0ZJTFRFUlMsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgZGF0YSxcbiAgfSk7XG4gIHNldFJlYWR5KGdyaWQpKGRpc3BhdGNoKTtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0QW5kQXBwbHlGaWx0ZXJzID0gKGdyaWQsIGNvbHVtbnMsIGRhdGEpID0+IChkaXNwYXRjaCkgPT4ge1xuICBjb25zdCBmaWx0ZXJpbmdEYXRhID0gVXRpbHMubm9ybWFsaXplRmlsdGVyaW5nRGF0YShkYXRhKTtcbiAgVXRpbHMuc2F2ZUZpbHRlckRhdGEoZ3JpZCwgZmlsdGVyaW5nRGF0YS5nZXQoJ2ZpbHRlckRhdGEnKSk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfRklMVEVSUyxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBmaWx0ZXJpbmdEYXRhLFxuICB9KTtcbiAgZGlzcGF0Y2goYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKTtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5leHBvcnQgY29uc3QgZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlID0gKGdyaWQsIGNvbHVtbnMsIGNvbHVtbiwgdmFsdWUpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGNvbnN0IG9yaWdGaWx0ZXJEYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihcbiAgICBbZ3JpZC5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2ZpbHRlckRhdGEnXSxcbiAgICBNYXAoKSxcbiAgKTtcbiAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbHVtbik7XG4gIGNvbnN0IHZhbHVlRW1wdHlDaGVja2VyID0gVXRpbHMuZ2V0VmFsdWVFbXB0eUNoZWNrZXIoY29sdW1uKTtcbiAgbGV0IGZpbHRlckRhdGE7XG4gIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWx1ZSkpIHtcbiAgICBmaWx0ZXJEYXRhID0gb3JpZ0ZpbHRlckRhdGEuZGVsZXRlKGNvbHVtbktleSk7XG4gIH0gZWxzZSB7XG4gICAgZmlsdGVyRGF0YSA9IG9yaWdGaWx0ZXJEYXRhLnNldChjb2x1bW5LZXksIHZhbHVlKTtcbiAgfVxuICBVdGlscy5zYXZlRmlsdGVyRGF0YShncmlkLCBmaWx0ZXJEYXRhKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0ZJTFRFUl9EQVRBX0NIQU5HRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICAvLyBUaGUgZmlsdGVyRGF0YSBtaWdodCBoYXZlIHByb3BlcnR5LCB3aGljaCB2YWx1ZSBpcyBhcnJheSAodGhpcyBoYXBwZW5zIHdoZW4gbG9hZGVkIGZyb21cbiAgICAvLyBzZXNzaW9uIHN0b3JhZ2UpLiBJbiBvcmRlciB0byBhbGxvdyBuZXN0ZWQgY29udmVydGlvbiBvZiBmaWx0ZXJEYXRhIGFuZCBhcnJheSB0eXBlIG9mXG4gICAgLy8gcHJvcGVydHkgdG8gYmUgY29udmVydGVkIHRvIGltbXV0YWJsZSBsaXN0LCB0aGUgZmlsdGVyRGF0YSBtdXN0IGJlIG9iamVjdCBpbnN0ZWFkIG9mIG1hcC5cbiAgICBmaWx0ZXJEYXRhOiBmaWx0ZXJEYXRhLnRvSlMoKSxcbiAgfSk7XG4gIGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xufTtcblxuZXhwb3J0IGNvbnN0IGFwcGx5U29ydCA9IChncmlkLCBjb2x1bW5zKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBpZiAoIWNvbHVtbnMgfHwgIWNvbHVtbnMuZm9yRWFjaCkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBncmlkRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0KGdyaWQuaWQpO1xuICBpZiAoIWdyaWREYXRhKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IHNvcnREYXRhID0gZ3JpZERhdGEuZ2V0SW4oWydjb25maWcnLCAnc29ydGluZ0RhdGEnXSk7XG4gIGlmICghc29ydERhdGEpIHJldHVybiBmYWxzZTtcbiAgY29uc3Qgc29ydENvbHVtbiA9IHNvcnREYXRhLmdldCgnc29ydENvbHVtbicpO1xuICBpZiAoIXNvcnRDb2x1bW4pIHJldHVybiBmYWxzZTtcbiAgY29uc3Qgc29ydE9yZGVyID0gc29ydERhdGEuZ2V0KCdzb3J0T3JkZXInLCAnYXNjJyk7XG4gIGxldCBjb2x1bW47XG4gIGNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgaWYgKFV0aWxzLmdldENvbHVtbktleShjb2wpID09PSBzb3J0Q29sdW1uKSB7XG4gICAgICBjb2x1bW4gPSBjb2w7XG4gICAgfVxuICB9KTtcbiAgaWYgKCFjb2x1bW4pIHJldHVybiBmYWxzZTtcblxuICBpZiAoZ3JpZC5wYWdpbmF0aW9uKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBzZXRCdXN5KGdyaWQpKGRpc3BhdGNoKTtcbiAgY29uc3Qgb3JpZ0FsbERhdGEgPSBncmlkRGF0YS5nZXQoJ2FsbERhdGEnKTtcbiAgY29uc3QgY29tcGFyYXRvciA9IFV0aWxzLmdldFNvcnRDb21wYXJhdG9yKGNvbHVtbik7XG4gIGNvbnN0IHZhbHVlR2V0dGVyID0gVXRpbHMuZ2V0U29ydFZhbHVlR2V0dGVyKGNvbHVtbik7XG4gIGNvbnN0IHZhbHVlRW1wdHlDaGVja2VyID0gVXRpbHMuZ2V0VmFsdWVFbXB0eUNoZWNrZXIoY29sdW1uKTtcbiAgY29uc3QgYWxsRGF0YSA9IG9yaWdBbGxEYXRhLnNvcnQoKGEsIGIpID0+IHtcbiAgICBjb25zdCB2YWxBID0gdmFsdWVHZXR0ZXIoYSk7XG4gICAgY29uc3QgdmFsQiA9IHZhbHVlR2V0dGVyKGIpO1xuICAgIGlmIChzb3J0T3JkZXIgPT09ICdhc2MnKSB7XG4gICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQSkpIHJldHVybiAtMTtcbiAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxCKSkgcmV0dXJuIDE7XG4gICAgICByZXR1cm4gY29tcGFyYXRvcih2YWxBLCB2YWxCKTtcbiAgICB9XG4gICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEEpKSByZXR1cm4gMTtcbiAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQikpIHJldHVybiAtMTtcbiAgICByZXR1cm4gY29tcGFyYXRvcih2YWxCLCB2YWxBKTtcbiAgfSk7XG4gIGxldCBkYXRhO1xuICAvLyBTb3J0IGFsc28gZmlsdGVyZWQgZGF0YSBzZXBhcmF0ZWx5XG4gIGlmIChncmlkRGF0YS5nZXRJbihbJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2lzRmlsdGVyaW5nJ10sIGZhbHNlKSkge1xuICAgIGRhdGEgPSBncmlkRGF0YS5nZXQoJ2RhdGEnKS5zb3J0KChhLCBiKSA9PiB7XG4gICAgICBjb25zdCB2YWxBID0gdmFsdWVHZXR0ZXIoYSk7XG4gICAgICBjb25zdCB2YWxCID0gdmFsdWVHZXR0ZXIoYik7XG4gICAgICBpZiAoc29ydE9yZGVyID09PSAnYXNjJykge1xuICAgICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQSkpIHJldHVybiAtMTtcbiAgICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEIpKSByZXR1cm4gMTtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmF0b3IodmFsQSwgdmFsQik7XG4gICAgICB9XG4gICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQSkpIHJldHVybiAxO1xuICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEIpKSByZXR1cm4gLTE7XG4gICAgICByZXR1cm4gY29tcGFyYXRvcih2YWxCLCB2YWxBKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBkYXRhID0gYWxsRGF0YTtcbiAgfVxuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQVBQTFlfU09SVCxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBkYXRhLFxuICAgIGFsbERhdGEsXG4gIH0pO1xuICBzZXRSZWFkeShncmlkKShkaXNwYXRjaCk7XG4gIHJldHVybiB0cnVlO1xufTtcblxuZXhwb3J0IGNvbnN0IHNvcnRDaGFuZ2UgPSAoZ3JpZCwgY29sdW1ucywgY29sdW1uLCBuZXdTb3J0KSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBjb25zdCBzb3J0T3JkZXIgPSBuZXdTb3J0IHx8ICdhc2MnO1xuICBjb25zdCBzb3J0Q29sdW1uID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbHVtbik7XG4gIFV0aWxzLnNhdmVTb3J0RGF0YShncmlkLCB7IHNvcnRDb2x1bW4sIHNvcnRPcmRlciB9KTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NPUlRfQ0hBTkdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIHNvcnRDb2x1bW4sXG4gICAgc29ydE9yZGVyLFxuICB9KTtcbiAgYXBwbHlTb3J0KGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0RGF0YSA9IChcbiAgZ3JpZCxcbiAgY29sdW1ucyxcbiAgZGF0YSxcbiAgaXNFZGl0aW5nID0gZmFsc2UsXG4gIGlzQ3JlYXRpbmcgPSBmYWxzZSxcbikgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgVXRpbHMuY2hlY2tDb2x1bW5zUGFyYW0oY29sdW1ucyk7XG4gIGNvbnN0IGNvbmZpZ0RhdGEgPSBVdGlscy5sb2FkR3JpZENvbmZpZyhncmlkLCBjb2x1bW5zKTtcbiAgY29uc3QgaW1tdXRhYmxlRGF0YSA9IEltbXV0YWJsZS5JdGVyYWJsZS5pc0l0ZXJhYmxlKGRhdGEpID8gZGF0YSA6IEltbXV0YWJsZS5mcm9tSlMoZGF0YSk7XG4gIGNvbnN0IHNlbGVjdGVkSXRlbXMgPSBVdGlscy5sb2FkU2VsZWN0ZWRJdGVtcyhncmlkKS5maWx0ZXIoXG4gICAgaXRlbSA9PiAhIWltbXV0YWJsZURhdGEuZmluZChkYXRhSXRlbSA9PiBkYXRhSXRlbS5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGl0ZW0pLFxuICApO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX0RBVEEsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgZGF0YTogaW1tdXRhYmxlRGF0YSxcbiAgICBjb25maWc6IGNvbmZpZ0RhdGEsXG4gICAgc2VsZWN0ZWRJdGVtcyxcbiAgICBpc0VkaXRpbmcsXG4gICAgaXNDcmVhdGluZyxcbiAgfSk7XG4gIGlmICghZ3JpZC5wYWdpbmF0aW9uKSB7XG4gICAgYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gICAgYXBwbHlTb3J0KGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59O1xuXG4vKipcbiAqIEFjdGlvbiB0byBzZXQgZm9jdXMgdG8gZWl0aGVyIGxhc3QgZWRpdGVkUm93LCBjcmVhdGVkUm93IG9yIHRvIHZhbGlkYXRpb24gZXJyb3JcbiAqIEBwYXJhbSB7T2JqZWN0fSBncmlkXG4gKiBAcGFyYW0ge1N0cmluZ30gZm9jdXNUb1R5cGUgLSB0eXBlIG9mIGZvY3VzIHJlcXVlc3QuIFBvc3NpYmxlIHZhbHVlczpcbiAqICdmb2N1c1RvRWRpdENlbGwnIHx8ICdmb2N1c1RvRXJyb3JDZWxsJyB8fCAnZm9jdXNUb0NyZWF0ZUNlbGwnXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGZvY3VzVG9MYXN0Um93IC0gc2V0cyBmb2N1cyB0byBsYXN0IGRhdGEgcm93IGluc3RlYWQgb2Ygc2VsZWN0ZWQgcm93XG4gKi9cbmV4cG9ydCBjb25zdCBzZXRGb2N1c1RvID0gKGdyaWQsIGZvY3VzVG8sIGZvY3VzVG9MYXN0Um93ID0gZmFsc2UpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NFVF9GT0NVU19UTyxcbiAgICBmb2N1c1RvLFxuICAgIGZvY3VzVG9MYXN0Um93LFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBleHRlbmREYXRhID0gKGdyaWQsIGNvbHVtbnMsIGRhdGEsIHByZXBlbmQgPSBmYWxzZSkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgY29uc3QgaW1tdXRhYmxlRGF0YSA9IEltbXV0YWJsZS5JdGVyYWJsZS5pc0l0ZXJhYmxlKGRhdGEpID8gZGF0YSA6IEltbXV0YWJsZS5mcm9tSlMoZGF0YSk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9FWFRFTkRfREFUQSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBkYXRhOiBpbW11dGFibGVEYXRhLFxuICAgIHByZXBlbmQsXG4gIH0pO1xuICBhcHBseUZpbHRlcnMoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgYXBwbHlTb3J0KGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVzaXplQ29sdW1uID0gKGdyaWQsIGNvbHVtbktleSwgd2lkdGgpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGNvbnN0IGNvbHVtbldpZHRocyA9IGdldFN0YXRlKClcbiAgICAuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdjb25maWcnLCAnY29sdW1uV2lkdGhzJ10sIE1hcCgpKVxuICAgIC5zZXQoY29sdW1uS2V5LCB3aWR0aCk7XG4gIFV0aWxzLnNhdmVDb2x1bW5XaWR0aHMoZ3JpZCwgY29sdW1uV2lkdGhzKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFU0laRV9DT0xVTU4sXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgY29sdW1uV2lkdGhzLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBlZGl0ID0gZ3JpZCA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9FRElULFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBjYW5jZWwgPSBncmlkID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NBTkNFTCxcbiAgICBpZDogZ3JpZC5pZCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2F2ZSA9IChncmlkLCBjYiA9ICgpID0+IHt9KSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TQVZFLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbiAgY2IoKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzYXZlU3VjY2VzcyA9IChncmlkLCBjb2x1bW5zLCBzYXZlZEl0ZW1zKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0FWRV9TVUNDRVNTLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgc2F2ZWRJdGVtcyxcbiAgfSk7XG4gIGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICBhcHBseVNvcnQoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzYXZlUGFydGlhbFN1Y2Nlc3MgPSAoZ3JpZCwgY29sdW1ucywgc2F2ZWRJdGVtcykgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfUEFSVElBTF9TVUNDRVNTLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgc2F2ZWRJdGVtcyxcbiAgfSk7XG4gIGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICBhcHBseVNvcnQoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzYXZlRmFpbCA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0FWRV9GQUlMLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGUgPSAoZ3JpZCwgY29sdW1uRGVmYXVsdFZhbHVlcykgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGNvbHVtbkRlZmF1bHRWYWx1ZXMsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGFkZE5ld0l0ZW0gPSAoZ3JpZCwgY29sdW1uRGVmYXVsdFZhbHVlcykgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQUREX05FV19JVEVNLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGNvbHVtbkRlZmF1bHRWYWx1ZXMsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZUl0ZW0gPSAoZ3JpZCwgcm93SWQpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9JVEVNLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgcm93SWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZU5ld0l0ZW0gPSAoZ3JpZCwgaW5kZXgpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBpbmRleCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlTmV3SXRlbXMgPSAoZ3JpZCwgaW5kZXhlcykgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNUyxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBpbmRleGVzLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmUgPSAoZ3JpZCwgY2IgPSAoKSA9PiB7fSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbiAgY2IoKTtcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVTdWNjZXNzID0gKGdyaWQsIHJlbW92ZWRJZHMpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9TVUNDRVNTLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgcmVtb3ZlZElkcyxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlRmFpbCA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUwsXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGVkaXRDZWxsVmFsdWVDaGFuZ2UgPSAoZ3JpZCwgZGF0YUlkLCBrZXlQYXRoLCB2YWx1ZSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfRURJVF9DRUxMX1ZBTFVFX0NIQU5HRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBkYXRhSWQsXG4gICAga2V5UGF0aCxcbiAgICB2YWx1ZSxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZWRpdENlbGxWYWx1ZVZhbGlkYXRlID0gKGdyaWQsIGRhdGFJZCwga2V5UGF0aCwgdmFsdWUsIHZhbGlkYXRvcnMgPSBbXSkgPT4gKFxuICBkaXNwYXRjaCxcbiAgZ2V0U3RhdGUsXG4pID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGxldCB2YWxpZGF0aW9uU3RhdGUgPSB7IHZhbGlkOiB0cnVlIH07XG4gIHZhbGlkYXRvcnMuZm9yRWFjaCgodmFsaWRhdG9yKSA9PiB7XG4gICAgaWYgKHZhbGlkYXRpb25TdGF0ZS52YWxpZCkge1xuICAgICAgaWYgKHZhbGlkYXRvci51bmlxdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSAnJyB8fCB2YWx1ZSAhPT0gbnVsbCB8fCB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgLy8gY29tYmluZSByZWFsIGRhdGEgd2l0aCBjdXJyZW50IHVuc2F2ZWQgZWRpdGVkIGRhdGFcbiAgICAgICAgICBjb25zdCBncmlkRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0KGdyaWQuaWQpO1xuICAgICAgICAgIGNvbnN0IGVkaXREYXRhID0gZ3JpZERhdGEuZ2V0KCdlZGl0RGF0YScpO1xuICAgICAgICAgIGxldCBhbGxEYXRhID0gZ3JpZERhdGEuZ2V0KCdhbGxEYXRhJyk7XG4gICAgICAgICAgaWYgKGVkaXREYXRhKSB7XG4gICAgICAgICAgICBlZGl0RGF0YS5mb3JFYWNoKChlZGl0RGF0YUl0ZW0sIGVkaXREYXRhSXRlbUlkKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGZvdW5kSW5kZXggPSBhbGxEYXRhLmZpbmRJbmRleChkID0+IGQuZ2V0SW4oZ3JpZC5pZEtleVBhdGgpID09PSBlZGl0RGF0YUl0ZW1JZCk7XG4gICAgICAgICAgICAgIGlmIChmb3VuZEluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIGFsbERhdGEgPSBhbGxEYXRhLm1lcmdlRGVlcEluKFtmb3VuZEluZGV4XSwgZWRpdERhdGFJdGVtKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGRldGVybWluZSB1bmlxdWVuZXNzXG4gICAgICAgICAgY29uc3QgZmluZGluZyA9IGFsbERhdGEuZmluZCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYgKGdyaWQuaWRLZXlQYXRoLmxlbmd0aCkge1xuICAgICAgICAgICAgICAvLyBkb24ndCBzZWxmIGNvbXBhcmVcbiAgICAgICAgICAgICAgaWYgKGl0ZW0uZ2V0SW4oZ3JpZC5pZEtleVBhdGgpID09PSBkYXRhSWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpdGVtLmdldEluKGtleVBhdGgpID09PSB2YWx1ZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoZmluZGluZykge1xuICAgICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0ge1xuICAgICAgICAgICAgICB2YWxpZDogZmFsc2UsXG4gICAgICAgICAgICAgIG1lc3NhZ2U6ICdWYWxpZGF0aW9uLlVuaXF1ZScsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh2YWxpZGF0b3IudmFsaWRhdGVXaXRoUm93RGF0YSkge1xuICAgICAgICAvLyBDdXN0b20gdmFsaWRhdG9yIGZ1bmN0aW9uIHdpdGggcm93RGF0YSBhcyBwYXJhbWV0ZXJzXG4gICAgICAgIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG4gICAgICAgIGNvbnN0IGVkaXREYXRhID0gZ3JpZERhdGEuZ2V0SW4oWydlZGl0RGF0YScsIGRhdGFJZF0sIE1hcCgpKTtcbiAgICAgICAgbGV0IHJvd0RhdGEgPSBncmlkRGF0YS5nZXQoJ2FsbERhdGEnKS5maW5kKGl0ZW0gPT4gaXRlbS5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGRhdGFJZCk7XG4gICAgICAgIGlmIChyb3dEYXRhKSB7XG4gICAgICAgICAgcm93RGF0YSA9IHJvd0RhdGEubWVyZ2VEZWVwKGVkaXREYXRhKTtcbiAgICAgICAgICBjb25zdCBwYXJhbXMgPSB2YWxpZGF0b3IucGFyYW1zID8gT2JqZWN0LnZhbHVlcyh2YWxpZGF0b3IucGFyYW1zKSA6IFtdO1xuICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZVdpdGhSb3dEYXRhKHZhbHVlLCByb3dEYXRhLCAuLi5wYXJhbXMpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHZhbGlkYXRvci52YWxpZGF0ZVdpdGhHcmlkRGF0YSkge1xuICAgICAgICAvLyBDdXN0b20gdmFsaWRhdG9yIGZ1bmN0aW9uIHdpdGggcm93RGF0YSBhbmQgZ3JpZERhdGEgYXMgcGFyYW1ldGVyc1xuICAgICAgICBjb25zdCBncmlkRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0KGdyaWQuaWQpO1xuXG4gICAgICAgIGxldCBhbGxEYXRhID0gZ3JpZERhdGEuZ2V0KCdhbGxEYXRhJywgTGlzdCgpKTtcbiAgICAgICAgY29uc3QgZWRpdERhdGEgPSBncmlkRGF0YS5nZXQoJ2VkaXREYXRhJywgTWFwKCkpO1xuXG4gICAgICAgIGVkaXREYXRhLmZvckVhY2goKGVkaXRSb3csIGVkaXRLZXkpID0+IHtcbiAgICAgICAgICBjb25zdCBmb3VuZEluZGV4ID0gYWxsRGF0YS5maW5kSW5kZXgoZCA9PiBkLmdldEluKGdyaWQuaWRLZXlQYXRoKSA9PT0gZWRpdEtleSk7XG4gICAgICAgICAgaWYgKGZvdW5kSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICBhbGxEYXRhID0gYWxsRGF0YS5tZXJnZURlZXBJbihbZm91bmRJbmRleF0sIGVkaXRSb3cpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGVkaXRSb3dEYXRhID0gZWRpdERhdGEuZ2V0KGRhdGFJZCwgTWFwKCkpO1xuICAgICAgICBsZXQgcm93RGF0YSA9IGFsbERhdGEuZmluZChpdGVtID0+IGl0ZW0uZ2V0SW4oZ3JpZC5pZEtleVBhdGgpID09PSBkYXRhSWQpO1xuICAgICAgICBpZiAocm93RGF0YSkge1xuICAgICAgICAgIHJvd0RhdGEgPSByb3dEYXRhLm1lcmdlRGVlcChlZGl0Um93RGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcm93RGF0YSA9IGVkaXRSb3dEYXRhO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHZhbGlkYXRvci5wYXJhbXMgPyBPYmplY3QudmFsdWVzKHZhbGlkYXRvci5wYXJhbXMpIDogW107XG4gICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZVdpdGhHcmlkRGF0YSh2YWx1ZSwgcm93RGF0YSwgYWxsRGF0YSwgLi4ucGFyYW1zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHZhbGlkYXRvci5wYXJhbXMgPyBPYmplY3QudmFsdWVzKHZhbGlkYXRvci5wYXJhbXMpIDogW107XG4gICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZSh2YWx1ZSwgLi4ucGFyYW1zKTtcbiAgICAgICAgaWYgKHZhbGlkYXRvci5wYXJhbXMpIHtcbiAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZVZhbHVlcyA9IHZhbGlkYXRvci5wYXJhbXM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IGNlbGxNZXNzYWdlID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ2NlbGxNZXNzYWdlcycsICdlcnJvcicsIGRhdGFJZCwgLi4ua2V5UGF0aF0pO1xuICBpZiAodmFsaWRhdGlvblN0YXRlLnZhbGlkICYmIGNlbGxNZXNzYWdlICE9PSB1bmRlZmluZWQpIHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgbWVzc2FnZVR5cGU6ICdlcnJvcicsXG4gICAgICBkYXRhSWQsXG4gICAgICBrZXlQYXRoLFxuICAgIH0pO1xuICB9IGVsc2UgaWYgKCF2YWxpZGF0aW9uU3RhdGUudmFsaWQpIHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgbWVzc2FnZVR5cGU6ICdlcnJvcicsXG4gICAgICBkYXRhSWQsXG4gICAgICBrZXlQYXRoLFxuICAgICAgbWVzc2FnZUlkOiB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZSxcbiAgICAgIG1lc3NhZ2VWYWx1ZXM6IHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlVmFsdWVzLFxuICAgIH0pO1xuICB9XG4gIHJldHVybiB2YWxpZGF0aW9uU3RhdGUudmFsaWQ7XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlID0gKGdyaWQsIHJvd0luZGV4LCBrZXlQYXRoLCB2YWx1ZSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfQ0hBTkdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIHJvd0luZGV4LFxuICAgIGtleVBhdGgsXG4gICAgdmFsdWUsXG4gIH0pO1xufTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbmV4cG9ydCBjb25zdCBjcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZSA9IChncmlkLCByb3dJbmRleCwga2V5UGF0aCwgdmFsdWUsIHZhbGlkYXRvcnMgPSBbXSkgPT4gKFxuICBkaXNwYXRjaCxcbiAgZ2V0U3RhdGUsXG4pID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGxldCB2YWxpZGF0aW9uU3RhdGUgPSB7IHZhbGlkOiB0cnVlIH07XG4gIHZhbGlkYXRvcnMuZm9yRWFjaCgodmFsaWRhdG9yKSA9PiB7XG4gICAgaWYgKHZhbGlkYXRpb25TdGF0ZS52YWxpZCkge1xuICAgICAgaWYgKHZhbGlkYXRvci51bmlxdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSAnJyB8fCB2YWx1ZSAhPT0gbnVsbCB8fCB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY29uc3QgZmluZGluZyA9IGdldFN0YXRlKClcbiAgICAgICAgICAgIC5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ2FsbERhdGEnXSlcbiAgICAgICAgICAgIC5maW5kKGl0ZW0gPT4gaXRlbS5nZXRJbihrZXlQYXRoKSA9PT0gdmFsdWUpO1xuICAgICAgICAgIGlmIChmaW5kaW5nKSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB7XG4gICAgICAgICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgICAgICAgICAgbWVzc2FnZTogJ1ZhbGlkYXRpb24uVW5pcXVlJyxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGZpbmQyID0gZ2V0U3RhdGUoKVxuICAgICAgICAgICAgICAuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdjcmVhdGVEYXRhJ10pXG4gICAgICAgICAgICAgIC5maW5kKChpdGVtLCBpKSA9PiBpICE9PSByb3dJbmRleCAmJiBpdGVtLmdldEluKGtleVBhdGgpID09PSB2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoZmluZDIpIHtcbiAgICAgICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0ge1xuICAgICAgICAgICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnVmFsaWRhdGlvbi5VbmlxdWUnLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh2YWxpZGF0b3IudmFsaWRhdGVXaXRoUm93RGF0YSkge1xuICAgICAgICBjb25zdCByb3dEYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ2NyZWF0ZURhdGEnLCByb3dJbmRleF0pO1xuICAgICAgICBjb25zdCBwYXJhbXMgPSB2YWxpZGF0b3IucGFyYW1zID8gT2JqZWN0LnZhbHVlcyh2YWxpZGF0b3IucGFyYW1zKSA6IFtdO1xuICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB2YWxpZGF0b3IudmFsaWRhdGVXaXRoUm93RGF0YSh2YWx1ZSwgcm93RGF0YSwgLi4ucGFyYW1zKTtcbiAgICAgIH0gZWxzZSBpZiAodmFsaWRhdG9yLnZhbGlkYXRlV2l0aEdyaWREYXRhKSB7XG4gICAgICAgIGNvbnN0IGNyZWF0ZURhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnY3JlYXRlRGF0YSddKTtcbiAgICAgICAgY29uc3Qgcm93RGF0YSA9IGNyZWF0ZURhdGEuZ2V0KHJvd0luZGV4KTtcbiAgICAgICAgY29uc3QgYWxsRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdhbGxEYXRhJ10pO1xuICAgICAgICBjb25zdCBjb21iaW5lZERhdGEgPSBhbGxEYXRhLmNvbmNhdChjcmVhdGVEYXRhKTtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gdmFsaWRhdG9yLnBhcmFtcyA/IE9iamVjdC52YWx1ZXModmFsaWRhdG9yLnBhcmFtcykgOiBbXTtcbiAgICAgICAgdmFsaWRhdGlvblN0YXRlID0gdmFsaWRhdG9yLnZhbGlkYXRlV2l0aEdyaWREYXRhKHZhbHVlLCByb3dEYXRhLCBjb21iaW5lZERhdGEsIC4uLnBhcmFtcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSB2YWxpZGF0b3IucGFyYW1zID8gT2JqZWN0LnZhbHVlcyh2YWxpZGF0b3IucGFyYW1zKSA6IFtdO1xuICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB2YWxpZGF0b3IudmFsaWRhdGUodmFsdWUsIC4uLnBhcmFtcyk7XG4gICAgICAgIGlmICh2YWxpZGF0b3IucGFyYW1zKSB7XG4gICAgICAgICAgdmFsaWRhdGlvblN0YXRlLm1lc3NhZ2VWYWx1ZXMgPSB2YWxpZGF0b3IucGFyYW1zO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgY29uc3QgY3JlYXRlQ2VsbE1lc3NhZ2UgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnY3JlYXRlQ2VsbE1lc3NhZ2VzJywgJ2Vycm9yJywgcm93SW5kZXgsIC4uLmtleVBhdGhdKTtcbiAgaWYgKHZhbGlkYXRpb25TdGF0ZS52YWxpZCAmJiBjcmVhdGVDZWxsTWVzc2FnZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfSElERV9NRVNTQUdFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBtZXNzYWdlVHlwZTogJ2Vycm9yJyxcbiAgICAgIHJvd0luZGV4LFxuICAgICAga2V5UGF0aCxcbiAgICB9KTtcbiAgfSBlbHNlIGlmICghdmFsaWRhdGlvblN0YXRlLnZhbGlkKSB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfU0hPV19NRVNTQUdFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBtZXNzYWdlVHlwZTogJ2Vycm9yJyxcbiAgICAgIHJvd0luZGV4LFxuICAgICAga2V5UGF0aCxcbiAgICAgIG1lc3NhZ2VJZDogdmFsaWRhdGlvblN0YXRlLm1lc3NhZ2UsXG4gICAgICBtZXNzYWdlVmFsdWVzOiB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZVZhbHVlcyxcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gdmFsaWRhdGlvblN0YXRlLnZhbGlkO1xufTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbmV4cG9ydCBjb25zdCBjZWxsU2hvd01lc3NhZ2UgPSAoXG4gIGdyaWQsXG4gIG1lc3NhZ2VUeXBlLFxuICBkYXRhSWQsXG4gIGtleVBhdGgsXG4gIG1lc3NhZ2VJZCxcbiAgbWVzc2FnZVZhbHVlcyxcbikgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0UsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgbWVzc2FnZVR5cGUsXG4gICAgZGF0YUlkLFxuICAgIGtleVBhdGgsXG4gICAgbWVzc2FnZUlkLFxuICAgIG1lc3NhZ2VWYWx1ZXMsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGNlbGxTaG93TWVzc2FnZXMgPSAoZ3JpZCwgbWVzc2FnZXMpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFUyxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBtZXNzYWdlcyxcbiAgfSk7XG59O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuZXhwb3J0IGNvbnN0IGNlbGxIaWRlTWVzc2FnZSA9IChcbiAgZ3JpZCxcbiAgbWVzc2FnZVR5cGUgPSBudWxsLFxuICBkYXRhSWQgPSBudWxsLFxuICBrZXlQYXRoID0gbnVsbCxcbikgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0VMTF9ISURFX01FU1NBR0UsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgbWVzc2FnZVR5cGUsXG4gICAgZGF0YUlkLFxuICAgIGtleVBhdGgsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNlbGxTaG93TWVzc2FnZSA9IChcbiAgZ3JpZCxcbiAgbWVzc2FnZVR5cGUsXG4gIHJvd0luZGV4LFxuICBrZXlQYXRoLFxuICBtZXNzYWdlSWQsXG4gIG1lc3NhZ2VWYWx1ZXMsXG4pID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBtZXNzYWdlVHlwZSxcbiAgICByb3dJbmRleCxcbiAgICBrZXlQYXRoLFxuICAgIG1lc3NhZ2VJZCxcbiAgICBtZXNzYWdlVmFsdWVzLFxuICB9KTtcbn07XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG5leHBvcnQgY29uc3QgY3JlYXRlQ2VsbEhpZGVNZXNzYWdlID0gKFxuICBncmlkLFxuICBtZXNzYWdlVHlwZSA9IG51bGwsXG4gIHJvd0luZGV4ID0gbnVsbCxcbiAga2V5UGF0aCA9IG51bGwsXG4pID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX0hJREVfTUVTU0FHRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBtZXNzYWdlVHlwZSxcbiAgICByb3dJbmRleCxcbiAgICBrZXlQYXRoLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBjZWxsU2VsZWN0aW9uQ2hhbmdlID0gKGdyaWQsIHNlbGVjdGVkQ2VsbCA9IG51bGwpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHNlbGVjdGVkQ2VsbCxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX1NFTEVDVElPTl9DSEFOR0UsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGl0ZW1TZWxlY3Rpb25DaGFuZ2UgPSAoZ3JpZCwgcm93SW5kZXgsIGN0cmxQcmVzc2VkID0gZmFsc2UsIHNoaWZ0UHJlc3NlZCA9IGZhbHNlKSA9PiAoXG4gIGRpc3BhdGNoLFxuICBnZXRTdGF0ZSxcbikgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0lURU1fU0VMRUNUSU9OX0NIQU5HRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICByb3dJbmRleCxcbiAgICBpZEtleVBhdGg6IGdyaWQuaWRLZXlQYXRoLFxuICAgIGN0cmxQcmVzc2VkLFxuICAgIHNoaWZ0UHJlc3NlZCxcbiAgfSk7XG4gIFV0aWxzLnNhdmVTZWxlY3RlZEl0ZW1zKGdyaWQsIGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdzZWxlY3RlZEl0ZW1zJ10pKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZWxlY3RBbGxJdGVtc0NoYW5nZSA9IGdyaWQgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NFTEVDVF9BTExfSVRFTVNfQ0hBTkdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gIH0pO1xuICBVdGlscy5zYXZlU2VsZWN0ZWRJdGVtcyhncmlkLCBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnc2VsZWN0ZWRJdGVtcyddKSk7XG59O1xuXG5leHBvcnQgY29uc3QgY2xlYXJTZWxlY3RlZEl0ZW1zID0gZ3JpZCA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0xFQVJfU0VMRUNURURfSVRFTVMsXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xuICBVdGlscy5zYXZlU2VsZWN0ZWRJdGVtcyhncmlkLCBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnc2VsZWN0ZWRJdGVtcyddKSk7XG59O1xuXG5leHBvcnQgY29uc3QgdG9nZ2xlRmlsdGVyaW5nID0gZ3JpZCA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBjb25zdCBpc0ZpbHRlcmluZyA9ICFnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFxuICAgIFtncmlkLmlkLCAnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnaXNGaWx0ZXJpbmcnXSxcbiAgICBmYWxzZSxcbiAgKTtcbiAgVXRpbHMuc2F2ZUlzRmlsdGVyaW5nKGdyaWQsIGlzRmlsdGVyaW5nKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1RPR0dMRV9GSUxURVJJTkcsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgaXNGaWx0ZXJpbmcsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHZhbGlkYXRlRWRpdGVkUm93cyA9IChncmlkLCBjb2x1bW5zKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBjb25zdCBncmlkRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0KGdyaWQuaWQpO1xuICBjb25zdCBlZGl0RGF0YSA9IGdyaWREYXRhLmdldCgnZWRpdERhdGEnLCBNYXAoKSk7XG4gIGxldCBhbGxHb29kID0gdHJ1ZTtcbiAgZWRpdERhdGEuZm9yRWFjaCgoZWRpdERhdGFSb3csIGRhdGFJZCkgPT4ge1xuICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICBsZXQgdmFsdWUgPSBlZGl0RGF0YVJvdy5nZXRJbihjb2wudmFsdWVLZXlQYXRoKTtcbiAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlID0gZ3JpZERhdGFcbiAgICAgICAgICAuZ2V0KCdhbGxEYXRhJylcbiAgICAgICAgICAuZmluZChkYXRhID0+IGRhdGEuZ2V0SW4oZ3JpZC5pZEtleVBhdGgpID09PSBkYXRhSWQpXG4gICAgICAgICAgLmdldEluKGNvbC52YWx1ZUtleVBhdGgpO1xuICAgICAgfVxuICAgICAgY29uc3QgaXNWYWxpZCA9IGVkaXRDZWxsVmFsdWVWYWxpZGF0ZShncmlkLCBkYXRhSWQsIGNvbC52YWx1ZUtleVBhdGgsIHZhbHVlLCBjb2wudmFsaWRhdG9ycykoXG4gICAgICAgIGRpc3BhdGNoLFxuICAgICAgICBnZXRTdGF0ZSxcbiAgICAgICk7XG4gICAgICBpZiAoYWxsR29vZCAmJiAhaXNWYWxpZCkge1xuICAgICAgICBhbGxHb29kID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gYWxsR29vZDtcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVFbXB0eUNyZWF0ZWRSb3dzID0gKGdyaWQsIGNvbHVtbnMpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGNvbnN0IGNyZWF0ZURhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnY3JlYXRlRGF0YSddLCBNYXAoKSk7XG4gIGNvbnN0IGluZGV4ZXMgPSBbXTtcbiAgY3JlYXRlRGF0YS5mb3JFYWNoKChjcmVhdGVEYXRhUm93LCByb3dJbmRleCkgPT4ge1xuICAgIGxldCBpc0VtcHR5ID0gdHJ1ZTtcbiAgICBjb2x1bW5zLmZvckVhY2goKGNvbCkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSBjcmVhdGVEYXRhUm93LmdldEluKGNvbC52YWx1ZUtleVBhdGgpO1xuICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09ICcnICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIGlzRW1wdHkgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoaXNFbXB0eSkge1xuICAgICAgaW5kZXhlcy5wdXNoKHJvd0luZGV4KTtcbiAgICB9XG4gIH0pO1xuICBpZiAoaW5kZXhlcy5sZW5ndGggPiAwKSB7XG4gICAgcmVtb3ZlTmV3SXRlbXMoZ3JpZCwgaW5kZXhlcykoZGlzcGF0Y2gpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgdmFsaWRhdGVDcmVhdGVkUm93cyA9IChncmlkLCBjb2x1bW5zKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICByZW1vdmVFbXB0eUNyZWF0ZWRSb3dzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gIGNvbnN0IGNyZWF0ZURhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnY3JlYXRlRGF0YSddLCBNYXAoKSk7XG4gIGxldCBhbGxHb29kID0gdHJ1ZTtcbiAgY3JlYXRlRGF0YS5mb3JFYWNoKChjcmVhdGVEYXRhUm93LCByb3dJbmRleCkgPT4ge1xuICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGNyZWF0ZURhdGFSb3cuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG4gICAgICBjb25zdCBpc1ZhbGlkID0gY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUoXG4gICAgICAgIGdyaWQsXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICBjb2wudmFsdWVLZXlQYXRoLFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgY29sLnZhbGlkYXRvcnMsXG4gICAgICApKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gICAgICBpZiAoYWxsR29vZCAmJiAhaXNWYWxpZCkge1xuICAgICAgICBhbGxHb29kID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gYWxsR29vZDtcbn07XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVFeGlzdGluZ0NlbGxWYWx1ZSA9IChncmlkLCBkYXRhSWQsIGtleVBhdGgsIHZhbHVlKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9VUERBVEVfRVhJU1RJTkdfQ0VMTF9WQUxVRSxcbiAgICBncmlkLFxuICAgIGRhdGFJZCxcbiAgICBrZXlQYXRoLFxuICAgIHZhbHVlLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXRFZGl0RGF0YSA9IChncmlkLCBkYXRhLCBjZWxsTWVzc2FnZXMgPSBNYXAoKSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgZGF0YSxcbiAgICBjZWxsTWVzc2FnZXMsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX0VESVRfREFUQSxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3Qgb3BlbkNvbHVtblNldHRpbmdzTW9kYWwgPSBncmlkID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9PUEVOLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBjbG9zZUNvbHVtblNldHRpbmdzTW9kYWwgPSBncmlkID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2F2ZUNvbHVtblNldHRpbmdzID0gKGdyaWQsIGhpZGRlbkNvbHVtbnMsIGNvbHVtbk9yZGVyKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIFV0aWxzLnNhdmVDb2x1bW5TZXR0aW5ncyhncmlkLCBoaWRkZW5Db2x1bW5zLCBjb2x1bW5PcmRlcik7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfU0FWRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBjb2x1bW5PcmRlcixcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0UGFnZSA9IChncmlkLCBwYWdlKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuc2F2ZVBhZ2UoZ3JpZCwgcGFnZSk7XG4gIGRpc3BhdGNoKHtcbiAgICBwYWdlLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NFVF9QQUdFLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXRSb3dzT25QYWdlID0gKGdyaWQsIHJvd3NPblBhZ2UpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5zYXZlUm93c09uUGFnZShncmlkLCByb3dzT25QYWdlKTtcbiAgZGlzcGF0Y2goe1xuICAgIHJvd3NPblBhZ2UsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX1JPV1NfT05fUEFHRSxcbiAgfSk7XG59O1xuIl19