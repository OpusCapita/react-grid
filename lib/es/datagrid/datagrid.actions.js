import Immutable, { Map } from 'immutable';
import Utils from './datagrid.utils';

export var TYPES = {
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

export var invalidate = function invalidate(grid) {
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_INVALIDATE,
      id: grid.id
    });
  };
};

export var forceRefresh = function forceRefresh() {
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

export var setBusy = function setBusy(grid) {
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_BUSY,
      id: grid.id
    });
  };
};

export var setReady = function setReady(grid) {
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_READY,
      id: grid.id
    });
  };
};

export var applyFilters = function applyFilters(grid, columns) {
  return function (dispatch, getState) {
    Utils.checkGridParam(grid);
    if (!columns || !columns.forEach) return false;
    var gridData = getState().datagrid.get(grid.id);
    if (!gridData) return false;
    var filterData = gridData.getIn(['config', 'filteringData', 'filterData'], Map());
    var allData = gridData.get('allData');
    setBusy(grid)(dispatch);
    var data = void 0;
    if (grid.pagination) {
      return true;
    }if (filterData.isEmpty()) {
      data = allData;
    } else {
      var dateFormat = Utils.getDateFormat(grid, getState().user);
      data = allData.filter(function (row) {
        var hits = 0;
        filterData.forEach(function (filterValue, filterColumn) {
          columns.forEach(function (column) {
            if (Utils.getColumnKey(column) === filterColumn) {
              var value = row.getIn(column.valueKeyPath);
              if (value || value === 0 || value === false) {
                var filterMatcher = Utils.getFilterMatcher(column, dateFormat);
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

export var setAndApplyFilters = function setAndApplyFilters(grid, columns, data) {
  return function (dispatch) {
    var filteringData = Utils.normalizeFilteringData(data);
    Utils.saveFilterData(grid, filteringData.get('filterData'));
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_SET_FILTERS,
      id: grid.id,
      filteringData: filteringData
    });
    dispatch(applyFilters(grid, columns));
    return true;
  };
};

export var filterCellValueChange = function filterCellValueChange(grid, columns, column, value) {
  return function (dispatch, getState) {
    Utils.checkGridParam(grid);
    var origFilterData = getState().datagrid.getIn([grid.id, 'config', 'filteringData', 'filterData'], Map());
    var columnKey = Utils.getColumnKey(column);
    var valueEmptyChecker = Utils.getValueEmptyChecker(column);
    var filterData = void 0;
    if (valueEmptyChecker(value)) {
      filterData = origFilterData.delete(columnKey);
    } else {
      filterData = origFilterData.set(columnKey, value);
    }
    Utils.saveFilterData(grid, filterData);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_FILTER_DATA_CHANGE,
      id: grid.id,
      filterData: filterData
    });
    applyFilters(grid, columns)(dispatch, getState);
  };
};

export var applySort = function applySort(grid, columns) {
  return function (dispatch, getState) {
    Utils.checkGridParam(grid);
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
      if (Utils.getColumnKey(col) === sortColumn) {
        column = col;
      }
    });
    if (!column) return false;

    setBusy(grid)(dispatch);
    if (grid.pagination) {
      return true;
    }
    var origAllData = gridData.get('allData');
    var comparator = Utils.getSortComparator(column);
    var valueGetter = Utils.getSortValueGetter(column);
    var valueEmptyChecker = Utils.getValueEmptyChecker(column);
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

export var sortChange = function sortChange(grid, columns, column, newSort) {
  return function (dispatch, getState) {
    Utils.checkGridParam(grid);
    var sortOrder = newSort || 'asc';
    var sortColumn = Utils.getColumnKey(column);
    Utils.saveSortData(grid, { sortColumn: sortColumn, sortOrder: sortOrder });
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_SORT_CHANGE,
      id: grid.id,
      sortColumn: sortColumn,
      sortOrder: sortOrder
    });
    applySort(grid, columns)(dispatch, getState);
  };
};

export var setData = function setData(grid, columns, data) {
  return function (dispatch, getState) {
    Utils.checkGridParam(grid);
    Utils.checkColumnsParam(columns);
    var configData = Utils.loadGridConfig(grid, columns);
    var immutableData = Immutable.Iterable.isIterable(data) ? data : Immutable.fromJS(data);
    var selectedItems = Utils.loadSelectedItems(grid).filter(function (item) {
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
      var filterData = gridData.getIn(['config', 'filteringData', 'filterData'], Map());
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
export var setFocusTo = function setFocusTo(grid, focusTo) {
  var focusToLastRow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_SET_FOCUS_TO,
      focusTo: focusTo,
      focusToLastRow: focusToLastRow,
      id: grid.id
    });
  };
};

export var extendData = function extendData(grid, columns, data) {
  var prepend = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  return function (dispatch, getState) {
    Utils.checkGridParam(grid);
    var immutableData = Immutable.Iterable.isIterable(data) ? data : Immutable.fromJS(data);
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

export var resizeColumn = function resizeColumn(grid, columnKey, width) {
  return function (dispatch, getState) {
    Utils.checkGridParam(grid);
    var columnWidths = getState().datagrid.getIn([grid.id, 'config', 'columnWidths'], Map()).set(columnKey, width);
    Utils.saveColumnWidths(grid, columnWidths);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_RESIZE_COLUMN,
      id: grid.id,
      columnWidths: columnWidths
    });
  };
};

export var edit = function edit(grid) {
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_EDIT,
      id: grid.id
    });
  };
};

export var cancel = function cancel(grid) {
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CANCEL,
      id: grid.id
    });
  };
};

export var save = function save(grid) {
  var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_SAVE,
      id: grid.id
    });
    cb();
  };
};

export var saveSuccess = function saveSuccess(grid, columns, savedItems) {
  return function (dispatch, getState) {
    Utils.checkGridParam(grid);
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

export var savePartialSuccess = function savePartialSuccess(grid, columns, savedItems) {
  return function (dispatch, getState) {
    Utils.checkGridParam(grid);
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

export var saveFail = function saveFail(grid) {
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_SAVE_FAIL,
      id: grid.id
    });
  };
};

export var create = function create(grid, columnDefaultValues) {
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CREATE,
      id: grid.id,
      columnDefaultValues: columnDefaultValues
    });
  };
};

export var addNewItem = function addNewItem(grid, columnDefaultValues) {
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_ADD_NEW_ITEM,
      id: grid.id,
      columnDefaultValues: columnDefaultValues
    });
  };
};

export var removeItem = function removeItem(grid, rowId) {
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_REMOVE_ITEM,
      id: grid.id,
      idKeyPath: grid.idKeyPath,
      rowId: rowId
    });
  };
};

export var removeNewItem = function removeNewItem(grid, index) {
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_REMOVE_NEW_ITEM,
      id: grid.id,
      index: index
    });
  };
};

export var removeNewItems = function removeNewItems(grid, indexes) {
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_REMOVE_NEW_ITEMS,
      id: grid.id,
      indexes: indexes
    });
  };
};

export var remove = function remove(grid) {
  var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_REMOVE,
      id: grid.id
    });
    cb();
  };
};

export var removeSuccess = function removeSuccess(grid, removedIds) {
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_REMOVE_SUCCESS,
      id: grid.id,
      idKeyPath: grid.idKeyPath,
      removedIds: removedIds
    });
  };
};

export var removeFail = function removeFail(grid) {
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_REMOVE_FAIL,
      id: grid.id
    });
  };
};

export var editCellValueChange = function editCellValueChange(grid, dataId, keyPath, value) {
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_EDIT_CELL_VALUE_CHANGE,
      id: grid.id,
      dataId: dataId,
      keyPath: keyPath,
      value: value
    });
  };
};

export var editCellValueValidate = function editCellValueValidate(grid, dataId, keyPath, value) {
  var validators = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
  return function (dispatch, getState) {
    Utils.checkGridParam(grid);
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
          var _editData = _gridData.getIn(['editData', dataId], Map());
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

export var createCellValueChange = function createCellValueChange(grid, rowIndex, keyPath, value) {
  return function (dispatch) {
    Utils.checkGridParam(grid);
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
export var createCellValueValidate = function createCellValueValidate(grid, rowIndex, keyPath, value) {
  var validators = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
  return function (dispatch, getState) {
    Utils.checkGridParam(grid);
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
export var cellShowMessage = function cellShowMessage(grid, messageType, dataId, keyPath, messageId, messageValues) {
  return function (dispatch) {
    Utils.checkGridParam(grid);
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

export var cellShowMessages = function cellShowMessages(grid, messages) {
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CELL_SHOW_MESSAGES,
      id: grid.id,
      messages: messages
    });
  };
};

// eslint-disable-next-line max-len
export var cellHideMessage = function cellHideMessage(grid) {
  var messageType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var dataId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var keyPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CELL_HIDE_MESSAGE,
      id: grid.id,
      messageType: messageType,
      dataId: dataId,
      keyPath: keyPath
    });
  };
};

export var createCellShowMessage = function createCellShowMessage(grid, messageType, rowIndex, keyPath, messageId, messageValues) {
  return function (dispatch) {
    Utils.checkGridParam(grid);
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
export var createCellHideMessage = function createCellHideMessage(grid) {
  var messageType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var rowIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var keyPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CREATE_CELL_HIDE_MESSAGE,
      id: grid.id,
      messageType: messageType,
      rowIndex: rowIndex,
      keyPath: keyPath
    });
  };
};

export var cellSelectionChange = function cellSelectionChange(grid) {
  var selectedCell = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      selectedCell: selectedCell,
      id: grid.id,
      type: TYPES.PLATFORM_DATAGRID_CELL_SELECTION_CHANGE
    });
  };
};

export var itemSelectionChange = function itemSelectionChange(grid, rowIndex) {
  var ctrlPressed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var shiftPressed = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  return function (dispatch, getState) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_ITEM_SELECTION_CHANGE,
      id: grid.id,
      rowIndex: rowIndex,
      idKeyPath: grid.idKeyPath,
      ctrlPressed: ctrlPressed,
      shiftPressed: shiftPressed
    });
    Utils.saveSelectedItems(grid, getState().datagrid.getIn([grid.id, 'selectedItems']));
  };
};

export var selectAllItemsChange = function selectAllItemsChange(grid) {
  return function (dispatch, getState) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_SELECT_ALL_ITEMS_CHANGE,
      id: grid.id,
      idKeyPath: grid.idKeyPath
    });
    Utils.saveSelectedItems(grid, getState().datagrid.getIn([grid.id, 'selectedItems']));
  };
};

export var clearSelectedItems = function clearSelectedItems(grid) {
  return function (dispatch, getState) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_CLEAR_SELECTED_ITEMS,
      id: grid.id
    });
    Utils.saveSelectedItems(grid, getState().datagrid.getIn([grid.id, 'selectedItems']));
  };
};

export var toggleFiltering = function toggleFiltering(grid) {
  return function (dispatch, getState) {
    Utils.checkGridParam(grid);
    var isFiltering = !getState().datagrid.getIn([grid.id, 'config', 'filteringData', 'isFiltering'], false);
    Utils.saveIsFiltering(grid, isFiltering);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_TOGGLE_FILTERING,
      id: grid.id,
      isFiltering: isFiltering
    });
  };
};

export var validateEditedRows = function validateEditedRows(grid, columns) {
  return function (dispatch, getState) {
    Utils.checkGridParam(grid);
    var gridData = getState().datagrid.get(grid.id);
    var editData = gridData.get('editData', Map());
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

export var removeEmptyCreatedRows = function removeEmptyCreatedRows(grid, columns) {
  return function (dispatch, getState) {
    Utils.checkGridParam(grid);
    var createData = getState().datagrid.getIn([grid.id, 'createData'], Map());
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

export var validateCreatedRows = function validateCreatedRows(grid, columns) {
  return function (dispatch, getState) {
    Utils.checkGridParam(grid);
    removeEmptyCreatedRows(grid, columns)(dispatch, getState);
    var createData = getState().datagrid.getIn([grid.id, 'createData'], Map());
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

export var updateExistingCellValue = function updateExistingCellValue(grid, dataId, keyPath, value) {
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_UPDATE_EXISTING_CELL_VALUE,
      id: grid.id,
      dataId: dataId,
      keyPath: keyPath,
      value: value
    });
  };
};

export var setEditData = function setEditData(grid, data) {
  var cellMessages = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Map();
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      data: data,
      cellMessages: cellMessages,
      id: grid.id,
      type: TYPES.PLATFORM_DATAGRID_SET_EDIT_DATA
    });
  };
};

export var openColumnSettingsModal = function openColumnSettingsModal(grid) {
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_COLUMN_SETTINGS_MODAL_OPEN,
      id: grid.id
    });
  };
};

export var closeColumnSettingsModal = function closeColumnSettingsModal(grid) {
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_COLUMN_SETTINGS_MODAL_CLOSE,
      id: grid.id
    });
  };
};

export var saveColumnSettings = function saveColumnSettings(grid, hiddenColumns, columnOrder) {
  return function (dispatch) {
    Utils.checkGridParam(grid);
    Utils.saveColumnSettings(grid, hiddenColumns, columnOrder);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_COLUMN_SETTINGS_SAVE,
      id: grid.id,
      columnOrder: columnOrder
    });
  };
};

export var setPage = function setPage(grid, page) {
  return function (dispatch) {
    Utils.savePage(grid, page);
    dispatch({
      page: page,
      id: grid.id,
      type: TYPES.PLATFORM_DATAGRID_SET_PAGE
    });
  };
};

export var setRowsOnPage = function setRowsOnPage(grid, rowsOnPage) {
  return function (dispatch) {
    Utils.saveRowsOnPage(grid, rowsOnPage);
    dispatch({
      rowsOnPage: rowsOnPage,
      id: grid.id,
      type: TYPES.PLATFORM_DATAGRID_SET_ROWS_ON_PAGE
    });
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5hY3Rpb25zLmpzIl0sIm5hbWVzIjpbIkltbXV0YWJsZSIsIk1hcCIsIlV0aWxzIiwiVFlQRVMiLCJQTEFURk9STV9EQVRBR1JJRF9JTlZBTElEQVRFIiwiUExBVEZPUk1fREFUQUdSSURfQlVTWSIsIlBMQVRGT1JNX0RBVEFHUklEX1JFQURZIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX0RBVEEiLCJQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9TT1JUIiwiUExBVEZPUk1fREFUQUdSSURfU09SVF9DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9SRVNJWkVfQ09MVU1OIiwiUExBVEZPUk1fREFUQUdSSURfRURJVCIsIlBMQVRGT1JNX0RBVEFHUklEX0NBTkNFTCIsIlBMQVRGT1JNX0RBVEFHUklEX1NBVkUiLCJQTEFURk9STV9EQVRBR1JJRF9FWFRFTkRfREFUQSIsIlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfU1VDQ0VTUyIsIlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfUEFSVElBTF9TVUNDRVNTIiwiUExBVEZPUk1fREFUQUdSSURfU0FWRV9GQUlMIiwiUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFIiwiUExBVEZPUk1fREFUQUdSSURfQUREX05FV19JVEVNIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0lURU0iLCJQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU0iLCJQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU1TIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX1NVQ0NFU1MiLCJQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfRkFJTCIsIlBMQVRGT1JNX0RBVEFHUklEX0VESVRfQ0VMTF9WQUxVRV9DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFUyIsIlBMQVRGT1JNX0RBVEFHUklEX0NFTExfSElERV9NRVNTQUdFIiwiUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfU0hPV19NRVNTQUdFIiwiUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfSElERV9NRVNTQUdFIiwiUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfVkFMSURBVEUiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NFTEVDVElPTl9DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9JVEVNX1NFTEVDVElPTl9DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9TRUxFQ1RfQUxMX0lURU1TX0NIQU5HRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NMRUFSX1NFTEVDVEVEX0lURU1TIiwiUExBVEZPUk1fREFUQUdSSURfVE9HR0xFX0ZJTFRFUklORyIsIlBMQVRGT1JNX0RBVEFHUklEX0ZJTFRFUl9EQVRBX0NIQU5HRSIsIlBMQVRGT1JNX0RBVEFHUklEX0FQUExZX0ZJTFRFUlMiLCJQTEFURk9STV9EQVRBR1JJRF9TRVRfRklMVEVSUyIsIlBMQVRGT1JNX0RBVEFHUklEX1VQREFURV9FWElTVElOR19DRUxMX1ZBTFVFIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX0VESVRfREFUQSIsIlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9PUEVOIiwiUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX0NMT1NFIiwiUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX1NBVkUiLCJQTEFURk9STV9EQVRBR1JJRF9GT1JDRV9SRUZSRVNIIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX0ZPQ1VTX1RPIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX1BBR0UiLCJQTEFURk9STV9EQVRBR1JJRF9TRVRfUk9XU19PTl9QQUdFIiwiaW52YWxpZGF0ZSIsImRpc3BhdGNoIiwiY2hlY2tHcmlkUGFyYW0iLCJncmlkIiwidHlwZSIsImlkIiwiZm9yY2VSZWZyZXNoIiwic2V0VGltZW91dCIsImRvY3VtZW50IiwiY3JlYXRlRXZlbnQiLCJldnQiLCJpbml0RXZlbnQiLCJ3aW5kb3ciLCJkaXNwYXRjaEV2ZW50Iiwic2V0QnVzeSIsInNldFJlYWR5IiwiYXBwbHlGaWx0ZXJzIiwiY29sdW1ucyIsImdldFN0YXRlIiwiZm9yRWFjaCIsImdyaWREYXRhIiwiZGF0YWdyaWQiLCJnZXQiLCJmaWx0ZXJEYXRhIiwiZ2V0SW4iLCJhbGxEYXRhIiwiZGF0YSIsInBhZ2luYXRpb24iLCJpc0VtcHR5IiwiZGF0ZUZvcm1hdCIsImdldERhdGVGb3JtYXQiLCJ1c2VyIiwiZmlsdGVyIiwicm93IiwiaGl0cyIsImZpbHRlclZhbHVlIiwiZmlsdGVyQ29sdW1uIiwiY29sdW1uIiwiZ2V0Q29sdW1uS2V5IiwidmFsdWUiLCJ2YWx1ZUtleVBhdGgiLCJmaWx0ZXJNYXRjaGVyIiwiZ2V0RmlsdGVyTWF0Y2hlciIsInNpemUiLCJzZXRBbmRBcHBseUZpbHRlcnMiLCJmaWx0ZXJpbmdEYXRhIiwibm9ybWFsaXplRmlsdGVyaW5nRGF0YSIsInNhdmVGaWx0ZXJEYXRhIiwiZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlIiwib3JpZ0ZpbHRlckRhdGEiLCJjb2x1bW5LZXkiLCJ2YWx1ZUVtcHR5Q2hlY2tlciIsImdldFZhbHVlRW1wdHlDaGVja2VyIiwiZGVsZXRlIiwic2V0IiwiYXBwbHlTb3J0Iiwic29ydERhdGEiLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwiY29sIiwib3JpZ0FsbERhdGEiLCJjb21wYXJhdG9yIiwiZ2V0U29ydENvbXBhcmF0b3IiLCJ2YWx1ZUdldHRlciIsImdldFNvcnRWYWx1ZUdldHRlciIsInNvcnQiLCJhIiwiYiIsInZhbEEiLCJ2YWxCIiwic29ydENoYW5nZSIsIm5ld1NvcnQiLCJzYXZlU29ydERhdGEiLCJzZXREYXRhIiwiY2hlY2tDb2x1bW5zUGFyYW0iLCJjb25maWdEYXRhIiwibG9hZEdyaWRDb25maWciLCJpbW11dGFibGVEYXRhIiwiSXRlcmFibGUiLCJpc0l0ZXJhYmxlIiwiZnJvbUpTIiwic2VsZWN0ZWRJdGVtcyIsImxvYWRTZWxlY3RlZEl0ZW1zIiwiZmluZCIsImRhdGFJdGVtIiwiaWRLZXlQYXRoIiwiaXRlbSIsImNvbmZpZyIsInNldEZvY3VzVG8iLCJmb2N1c1RvIiwiZm9jdXNUb0xhc3RSb3ciLCJleHRlbmREYXRhIiwicHJlcGVuZCIsInJlc2l6ZUNvbHVtbiIsIndpZHRoIiwiY29sdW1uV2lkdGhzIiwic2F2ZUNvbHVtbldpZHRocyIsImVkaXQiLCJjYW5jZWwiLCJzYXZlIiwiY2IiLCJzYXZlU3VjY2VzcyIsInNhdmVkSXRlbXMiLCJzYXZlUGFydGlhbFN1Y2Nlc3MiLCJzYXZlRmFpbCIsImNyZWF0ZSIsImNvbHVtbkRlZmF1bHRWYWx1ZXMiLCJhZGROZXdJdGVtIiwicmVtb3ZlSXRlbSIsInJvd0lkIiwicmVtb3ZlTmV3SXRlbSIsImluZGV4IiwicmVtb3ZlTmV3SXRlbXMiLCJpbmRleGVzIiwicmVtb3ZlIiwicmVtb3ZlU3VjY2VzcyIsInJlbW92ZWRJZHMiLCJyZW1vdmVGYWlsIiwiZWRpdENlbGxWYWx1ZUNoYW5nZSIsImRhdGFJZCIsImtleVBhdGgiLCJlZGl0Q2VsbFZhbHVlVmFsaWRhdGUiLCJ2YWxpZGF0b3JzIiwidmFsaWRhdGlvblN0YXRlIiwidmFsaWQiLCJ2YWxpZGF0b3IiLCJ1bmlxdWUiLCJ1bmRlZmluZWQiLCJlZGl0RGF0YSIsImVkaXREYXRhSXRlbSIsImVkaXREYXRhSXRlbUlkIiwiZm91bmRJbmRleCIsImZpbmRJbmRleCIsImQiLCJtZXJnZURlZXBJbiIsImZpbmRpbmciLCJsZW5ndGgiLCJtZXNzYWdlIiwidmFsaWRhdGVXaXRoUm93RGF0YSIsInJvd0RhdGEiLCJtZXJnZURlZXAiLCJwYXJhbXMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJ2YWxpZGF0ZSIsIm1lc3NhZ2VWYWx1ZXMiLCJtZXNzYWdlVHlwZSIsIm1lc3NhZ2VJZCIsImNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSIsInJvd0luZGV4IiwiY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUiLCJmaW5kMiIsImkiLCJjZWxsU2hvd01lc3NhZ2UiLCJjZWxsU2hvd01lc3NhZ2VzIiwibWVzc2FnZXMiLCJjZWxsSGlkZU1lc3NhZ2UiLCJjcmVhdGVDZWxsU2hvd01lc3NhZ2UiLCJjcmVhdGVDZWxsSGlkZU1lc3NhZ2UiLCJjZWxsU2VsZWN0aW9uQ2hhbmdlIiwic2VsZWN0ZWRDZWxsIiwiaXRlbVNlbGVjdGlvbkNoYW5nZSIsImN0cmxQcmVzc2VkIiwic2hpZnRQcmVzc2VkIiwic2F2ZVNlbGVjdGVkSXRlbXMiLCJzZWxlY3RBbGxJdGVtc0NoYW5nZSIsImNsZWFyU2VsZWN0ZWRJdGVtcyIsInRvZ2dsZUZpbHRlcmluZyIsImlzRmlsdGVyaW5nIiwic2F2ZUlzRmlsdGVyaW5nIiwidmFsaWRhdGVFZGl0ZWRSb3dzIiwiYWxsR29vZCIsImVkaXREYXRhUm93IiwiaXNWYWxpZCIsInJlbW92ZUVtcHR5Q3JlYXRlZFJvd3MiLCJjcmVhdGVEYXRhIiwiY3JlYXRlRGF0YVJvdyIsInB1c2giLCJ2YWxpZGF0ZUNyZWF0ZWRSb3dzIiwidXBkYXRlRXhpc3RpbmdDZWxsVmFsdWUiLCJzZXRFZGl0RGF0YSIsImNlbGxNZXNzYWdlcyIsIm9wZW5Db2x1bW5TZXR0aW5nc01vZGFsIiwiY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsIiwic2F2ZUNvbHVtblNldHRpbmdzIiwiaGlkZGVuQ29sdW1ucyIsImNvbHVtbk9yZGVyIiwic2V0UGFnZSIsInBhZ2UiLCJzYXZlUGFnZSIsInNldFJvd3NPblBhZ2UiLCJyb3dzT25QYWdlIiwic2F2ZVJvd3NPblBhZ2UiXSwibWFwcGluZ3MiOiJBQUFBLE9BQU9BLFNBQVAsSUFBb0JDLEdBQXBCLFFBQStCLFdBQS9CO0FBQ0EsT0FBT0MsS0FBUCxNQUFrQixrQkFBbEI7O0FBRUEsT0FBTyxJQUFNQyxRQUFRO0FBQ25CQyxnQ0FBOEIsOEJBRFg7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QzlMLFFBQUQsRUFBYztBQUMvRGxELFVBQU1pUCxjQUFOLENBQXFCN0wsSUFBckIsRUFBMkI0TCxVQUEzQjtBQUNBOUwsYUFBUztBQUNQOEwsNEJBRE87QUFFUDFMLFVBQUlGLEtBQUtFLEVBRkY7QUFHUEQsWUFBTXBELE1BQU0rQztBQUhMLEtBQVQ7QUFLRCxHQVA0QjtBQUFBLENBQXRCIiwiZmlsZSI6ImRhdGFncmlkLmFjdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSW1tdXRhYmxlLCB7IE1hcCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9kYXRhZ3JpZC51dGlscyc7XG5cbmV4cG9ydCBjb25zdCBUWVBFUyA9IHtcbiAgUExBVEZPUk1fREFUQUdSSURfSU5WQUxJREFURTogJ1BMQVRGT1JNX0RBVEFHUklEX0lOVkFMSURBVEUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9CVVNZOiAnUExBVEZPUk1fREFUQUdSSURfQlVTWScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFQURZOiAnUExBVEZPUk1fREFUQUdSSURfUkVBRFknLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRVRfREFUQTogJ1BMQVRGT1JNX0RBVEFHUklEX1NFVF9EQVRBJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQVBQTFlfU09SVDogJ1BMQVRGT1JNX0RBVEFHUklEX0FQUExZX1NPUlQnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TT1JUX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX1NPUlRfQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVTSVpFX0NPTFVNTjogJ1BMQVRGT1JNX0RBVEFHUklEX1JFU0laRV9DT0xVTU4nLFxuICBQTEFURk9STV9EQVRBR1JJRF9FRElUOiAnUExBVEZPUk1fREFUQUdSSURfRURJVCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NBTkNFTDogJ1BMQVRGT1JNX0RBVEFHUklEX0NBTkNFTCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NBVkU6ICdQTEFURk9STV9EQVRBR1JJRF9TQVZFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfRVhURU5EX0RBVEE6ICdQTEFURk9STV9EQVRBR1JJRF9FWFRFTkRfREFUQScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NBVkVfU1VDQ0VTUzogJ1BMQVRGT1JNX0RBVEFHUklEX1NBVkVfU1VDQ0VTUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NBVkVfUEFSVElBTF9TVUNDRVNTOiAnUExBVEZPUk1fREFUQUdSSURfU0FWRV9QQVJUSUFMX1NVQ0NFU1MnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TQVZFX0ZBSUw6ICdQTEFURk9STV9EQVRBR1JJRF9TQVZFX0ZBSUwnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEU6ICdQTEFURk9STV9EQVRBR1JJRF9DUkVBVEUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9BRERfTkVXX0lURU06ICdQTEFURk9STV9EQVRBR1JJRF9BRERfTkVXX0lURU0nLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfSVRFTTogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9JVEVNJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNOiAnUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNUzogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTVMnLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkU6ICdQTEFURk9STV9EQVRBR1JJRF9SRU1PVkUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfU1VDQ0VTUzogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9TVUNDRVNTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUw6ICdQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfRkFJTCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0VESVRfQ0VMTF9WQUxVRV9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9FRElUX0NFTExfVkFMVUVfQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFUzogJ1BMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NFTExfSElERV9NRVNTQUdFOiAnUExBVEZPUk1fREFUQUdSSURfQ0VMTF9ISURFX01FU1NBR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9TSE9XX01FU1NBR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9TSE9XX01FU1NBR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9ISURFX01FU1NBR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9ISURFX01FU1NBR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9WQUxJREFURTogJ1BMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX1ZBTElEQVRFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TRUxFQ1RJT05fQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TRUxFQ1RJT05fQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9TRUxFQ1RfQUxMX0lURU1TX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NMRUFSX1NFTEVDVEVEX0lURU1TOiAnUExBVEZPUk1fREFUQUdSSURfQ0xFQVJfU0VMRUNURURfSVRFTVMnLFxuICBQTEFURk9STV9EQVRBR1JJRF9UT0dHTEVfRklMVEVSSU5HOiAnUExBVEZPUk1fREFUQUdSSURfVE9HR0xFX0ZJTFRFUklORycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0ZJTFRFUl9EQVRBX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX0ZJTFRFUl9EQVRBX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0FQUExZX0ZJTFRFUlM6ICdQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9GSUxURVJTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0VUX0ZJTFRFUlM6ICdQTEFURk9STV9EQVRBR1JJRF9TRVRfRklMVEVSUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1VQREFURV9FWElTVElOR19DRUxMX1ZBTFVFOiAnUExBVEZPUk1fREFUQUdSSURfVVBEQVRFX0VYSVNUSU5HX0NFTExfVkFMVUUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRVRfRURJVF9EQVRBOiAnUExBVEZPUk1fREFUQUdSSURfU0VUX0VESVRfREFUQScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9PUEVOOiAnUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX09QRU4nLFxuICBQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfQ0xPU0U6ICdQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfQ0xPU0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfU0FWRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfRk9SQ0VfUkVGUkVTSDogJ1BMQVRGT1JNX0RBVEFHUklEX0ZPUkNFX1JFRlJFU0gnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRVRfRk9DVVNfVE86ICdQTEFURk9STV9EQVRBR1JJRF9TRVRfRk9DVVNfVE8nLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRVRfUEFHRTogJ1BMQVRGT1JNX0RBVEFHUklEX1NFVF9QQUdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0VUX1JPV1NfT05fUEFHRTogJ1BMQVRGT1JNX0RBVEFHUklEX1NFVF9ST1dTX09OX1BBR0UnLFxufTtcblxuZXhwb3J0IGNvbnN0IGludmFsaWRhdGUgPSBncmlkID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0lOVkFMSURBVEUsXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGZvcmNlUmVmcmVzaCA9ICgpID0+IChkaXNwYXRjaCkgPT4ge1xuICAvLyBGaXJlIHJlc2l6ZSBldmVudCB0byByZWNhbGN1bGF0ZSBjb21wb25lbnQgc2l6ZXNcbiAgLy8gYW5kIHRvIGZvcmNlIHJlZHJhdyBhbGwgbW91bnRlZCBncmlkc1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBpZiAoZG9jdW1lbnQuY3JlYXRlRXZlbnQpIHtcbiAgICAgIGNvbnN0IGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdIVE1MRXZlbnRzJyk7XG4gICAgICBldnQuaW5pdEV2ZW50KCdyZXNpemUnLCB0cnVlLCBmYWxzZSk7XG4gICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChldnQpO1xuICAgIH1cbiAgfSwgMSk7XG4gIGRpc3BhdGNoKHsgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfRk9SQ0VfUkVGUkVTSCB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXRCdXN5ID0gZ3JpZCA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9CVVNZLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXRSZWFkeSA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVBRFksXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGFwcGx5RmlsdGVycyA9IChncmlkLCBjb2x1bW5zKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBpZiAoIWNvbHVtbnMgfHwgIWNvbHVtbnMuZm9yRWFjaCkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBncmlkRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0KGdyaWQuaWQpO1xuICBpZiAoIWdyaWREYXRhKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IGZpbHRlckRhdGEgPSBncmlkRGF0YS5nZXRJbihbJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2ZpbHRlckRhdGEnXSwgTWFwKCkpO1xuICBjb25zdCBhbGxEYXRhID0gZ3JpZERhdGEuZ2V0KCdhbGxEYXRhJyk7XG4gIHNldEJ1c3koZ3JpZCkoZGlzcGF0Y2gpO1xuICBsZXQgZGF0YTtcbiAgaWYgKGdyaWQucGFnaW5hdGlvbikge1xuICAgIHJldHVybiB0cnVlO1xuICB9IGlmIChmaWx0ZXJEYXRhLmlzRW1wdHkoKSkge1xuICAgIGRhdGEgPSBhbGxEYXRhO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IGRhdGVGb3JtYXQgPSBVdGlscy5nZXREYXRlRm9ybWF0KGdyaWQsIGdldFN0YXRlKCkudXNlcik7XG4gICAgZGF0YSA9IGFsbERhdGEuZmlsdGVyKChyb3cpID0+IHtcbiAgICAgIGxldCBoaXRzID0gMDtcbiAgICAgIGZpbHRlckRhdGEuZm9yRWFjaCgoZmlsdGVyVmFsdWUsIGZpbHRlckNvbHVtbikgPT4ge1xuICAgICAgICBjb2x1bW5zLmZvckVhY2goKGNvbHVtbikgPT4ge1xuICAgICAgICAgIGlmIChVdGlscy5nZXRDb2x1bW5LZXkoY29sdW1uKSA9PT0gZmlsdGVyQ29sdW1uKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHJvdy5nZXRJbihjb2x1bW4udmFsdWVLZXlQYXRoKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSB8fCB2YWx1ZSA9PT0gMCB8fCB2YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgY29uc3QgZmlsdGVyTWF0Y2hlciA9IFV0aWxzLmdldEZpbHRlck1hdGNoZXIoY29sdW1uLCBkYXRlRm9ybWF0KTtcbiAgICAgICAgICAgICAgaWYgKGZpbHRlck1hdGNoZXIocm93LCBmaWx0ZXJWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBoaXRzICs9IDE7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gaGl0cyA9PT0gZmlsdGVyRGF0YS5zaXplO1xuICAgIH0pO1xuICB9XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9BUFBMWV9GSUxURVJTLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGRhdGEsXG4gIH0pO1xuICBzZXRSZWFkeShncmlkKShkaXNwYXRjaCk7XG4gIHJldHVybiB0cnVlO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldEFuZEFwcGx5RmlsdGVycyA9IChncmlkLCBjb2x1bW5zLCBkYXRhKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgY29uc3QgZmlsdGVyaW5nRGF0YSA9IFV0aWxzLm5vcm1hbGl6ZUZpbHRlcmluZ0RhdGEoZGF0YSk7XG4gIFV0aWxzLnNhdmVGaWx0ZXJEYXRhKGdyaWQsIGZpbHRlcmluZ0RhdGEuZ2V0KCdmaWx0ZXJEYXRhJykpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX0ZJTFRFUlMsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgZmlsdGVyaW5nRGF0YSxcbiAgfSk7XG4gIGRpc3BhdGNoKGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKSk7XG4gIHJldHVybiB0cnVlO1xufTtcblxuZXhwb3J0IGNvbnN0IGZpbHRlckNlbGxWYWx1ZUNoYW5nZSA9IChncmlkLCBjb2x1bW5zLCBjb2x1bW4sIHZhbHVlKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBjb25zdCBvcmlnRmlsdGVyRGF0YSA9IGdldFN0YXRlKClcbiAgICAuZGF0YWdyaWRcbiAgICAuZ2V0SW4oW2dyaWQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdmaWx0ZXJEYXRhJ10sIE1hcCgpKTtcbiAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbHVtbik7XG4gIGNvbnN0IHZhbHVlRW1wdHlDaGVja2VyID0gVXRpbHMuZ2V0VmFsdWVFbXB0eUNoZWNrZXIoY29sdW1uKTtcbiAgbGV0IGZpbHRlckRhdGE7XG4gIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWx1ZSkpIHtcbiAgICBmaWx0ZXJEYXRhID0gb3JpZ0ZpbHRlckRhdGEuZGVsZXRlKGNvbHVtbktleSk7XG4gIH0gZWxzZSB7XG4gICAgZmlsdGVyRGF0YSA9IG9yaWdGaWx0ZXJEYXRhLnNldChjb2x1bW5LZXksIHZhbHVlKTtcbiAgfVxuICBVdGlscy5zYXZlRmlsdGVyRGF0YShncmlkLCBmaWx0ZXJEYXRhKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0ZJTFRFUl9EQVRBX0NIQU5HRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBmaWx0ZXJEYXRhLFxuICB9KTtcbiAgYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG59O1xuXG5leHBvcnQgY29uc3QgYXBwbHlTb3J0ID0gKGdyaWQsIGNvbHVtbnMpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGlmICghY29sdW1ucyB8fCAhY29sdW1ucy5mb3JFYWNoKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG4gIGlmICghZ3JpZERhdGEpIHJldHVybiBmYWxzZTtcbiAgY29uc3Qgc29ydERhdGEgPSBncmlkRGF0YS5nZXRJbihbJ2NvbmZpZycsICdzb3J0aW5nRGF0YSddKTtcbiAgaWYgKCFzb3J0RGF0YSkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBzb3J0Q29sdW1uID0gc29ydERhdGEuZ2V0KCdzb3J0Q29sdW1uJyk7XG4gIGlmICghc29ydENvbHVtbikgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBzb3J0T3JkZXIgPSBzb3J0RGF0YS5nZXQoJ3NvcnRPcmRlcicsICdhc2MnKTtcbiAgbGV0IGNvbHVtbjtcbiAgY29sdW1ucy5mb3JFYWNoKChjb2wpID0+IHtcbiAgICBpZiAoVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCkgPT09IHNvcnRDb2x1bW4pIHtcbiAgICAgIGNvbHVtbiA9IGNvbDtcbiAgICB9XG4gIH0pO1xuICBpZiAoIWNvbHVtbikgcmV0dXJuIGZhbHNlO1xuXG4gIHNldEJ1c3koZ3JpZCkoZGlzcGF0Y2gpO1xuICBpZiAoZ3JpZC5wYWdpbmF0aW9uKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgY29uc3Qgb3JpZ0FsbERhdGEgPSBncmlkRGF0YS5nZXQoJ2FsbERhdGEnKTtcbiAgY29uc3QgY29tcGFyYXRvciA9IFV0aWxzLmdldFNvcnRDb21wYXJhdG9yKGNvbHVtbik7XG4gIGNvbnN0IHZhbHVlR2V0dGVyID0gVXRpbHMuZ2V0U29ydFZhbHVlR2V0dGVyKGNvbHVtbik7XG4gIGNvbnN0IHZhbHVlRW1wdHlDaGVja2VyID0gVXRpbHMuZ2V0VmFsdWVFbXB0eUNoZWNrZXIoY29sdW1uKTtcbiAgY29uc3QgYWxsRGF0YSA9IG9yaWdBbGxEYXRhLnNvcnQoKGEsIGIpID0+IHtcbiAgICBjb25zdCB2YWxBID0gdmFsdWVHZXR0ZXIoYSk7XG4gICAgY29uc3QgdmFsQiA9IHZhbHVlR2V0dGVyKGIpO1xuICAgIGlmIChzb3J0T3JkZXIgPT09ICdhc2MnKSB7XG4gICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQSkpIHJldHVybiAtMTtcbiAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxCKSkgcmV0dXJuIDE7XG4gICAgICByZXR1cm4gY29tcGFyYXRvcih2YWxBLCB2YWxCKTtcbiAgICB9XG4gICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEEpKSByZXR1cm4gMTtcbiAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQikpIHJldHVybiAtMTtcbiAgICByZXR1cm4gY29tcGFyYXRvcih2YWxCLCB2YWxBKTtcbiAgfSk7XG4gIGxldCBkYXRhO1xuICAvLyBTb3J0IGFsc28gZmlsdGVyZWQgZGF0YSBzZXBhcmF0ZWx5XG4gIGlmIChncmlkRGF0YS5nZXRJbihbJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2lzRmlsdGVyaW5nJ10sIGZhbHNlKSkge1xuICAgIGRhdGEgPSBncmlkRGF0YS5nZXQoJ2RhdGEnKS5zb3J0KChhLCBiKSA9PiB7XG4gICAgICBjb25zdCB2YWxBID0gdmFsdWVHZXR0ZXIoYSk7XG4gICAgICBjb25zdCB2YWxCID0gdmFsdWVHZXR0ZXIoYik7XG4gICAgICBpZiAoc29ydE9yZGVyID09PSAnYXNjJykge1xuICAgICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQSkpIHJldHVybiAtMTtcbiAgICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEIpKSByZXR1cm4gMTtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmF0b3IodmFsQSwgdmFsQik7XG4gICAgICB9XG4gICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQSkpIHJldHVybiAxO1xuICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEIpKSByZXR1cm4gLTE7XG4gICAgICByZXR1cm4gY29tcGFyYXRvcih2YWxCLCB2YWxBKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBkYXRhID0gYWxsRGF0YTtcbiAgfVxuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQVBQTFlfU09SVCxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBkYXRhLFxuICAgIGFsbERhdGEsXG4gIH0pO1xuICBzZXRSZWFkeShncmlkKShkaXNwYXRjaCk7XG4gIHJldHVybiB0cnVlO1xufTtcblxuZXhwb3J0IGNvbnN0IHNvcnRDaGFuZ2UgPSAoZ3JpZCwgY29sdW1ucywgY29sdW1uLCBuZXdTb3J0KSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBjb25zdCBzb3J0T3JkZXIgPSBuZXdTb3J0IHx8ICdhc2MnO1xuICBjb25zdCBzb3J0Q29sdW1uID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbHVtbik7XG4gIFV0aWxzLnNhdmVTb3J0RGF0YShncmlkLCB7IHNvcnRDb2x1bW4sIHNvcnRPcmRlciB9KTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NPUlRfQ0hBTkdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIHNvcnRDb2x1bW4sXG4gICAgc29ydE9yZGVyLFxuICB9KTtcbiAgYXBwbHlTb3J0KGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0RGF0YSA9IChncmlkLCBjb2x1bW5zLCBkYXRhKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBVdGlscy5jaGVja0NvbHVtbnNQYXJhbShjb2x1bW5zKTtcbiAgY29uc3QgY29uZmlnRGF0YSA9IFV0aWxzLmxvYWRHcmlkQ29uZmlnKGdyaWQsIGNvbHVtbnMpO1xuICBjb25zdCBpbW11dGFibGVEYXRhID0gSW1tdXRhYmxlLkl0ZXJhYmxlLmlzSXRlcmFibGUoZGF0YSkgPyBkYXRhIDogSW1tdXRhYmxlLmZyb21KUyhkYXRhKTtcbiAgY29uc3Qgc2VsZWN0ZWRJdGVtcyA9IFV0aWxzLmxvYWRTZWxlY3RlZEl0ZW1zKGdyaWQpLmZpbHRlcihpdGVtID0+IChcbiAgICAhIWltbXV0YWJsZURhdGEuZmluZChkYXRhSXRlbSA9PiBkYXRhSXRlbS5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGl0ZW0pXG4gICkpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX0RBVEEsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgZGF0YTogaW1tdXRhYmxlRGF0YSxcbiAgICBjb25maWc6IGNvbmZpZ0RhdGEsXG4gICAgc2VsZWN0ZWRJdGVtcyxcbiAgfSk7XG4gIGlmICghZ3JpZC5wYWdpbmF0aW9uKSB7XG4gICAgYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gICAgYXBwbHlTb3J0KGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZ3JpZERhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldChncmlkLmlkKTtcbiAgICBpZiAoIWdyaWREYXRhKSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3QgZmlsdGVyRGF0YSA9IGdyaWREYXRhLmdldEluKFsnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnZmlsdGVyRGF0YSddLCBNYXAoKSk7XG4gICAgaWYgKCFmaWx0ZXJEYXRhLmlzRW1wdHkoKSkge1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9BUFBMWV9GSUxURVJTLFxuICAgICAgICBpZDogZ3JpZC5pZCxcbiAgICAgICAgZGF0YTogaW1tdXRhYmxlRGF0YSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCBzb3J0RGF0YSA9IGdyaWREYXRhLmdldEluKFsnY29uZmlnJywgJ3NvcnRpbmdEYXRhJ10pO1xuICAgIGlmIChzb3J0RGF0YSkge1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9BUFBMWV9TT1JULFxuICAgICAgICBpZDogZ3JpZC5pZCxcbiAgICAgICAgZGF0YTogaW1tdXRhYmxlRGF0YSxcbiAgICAgICAgYWxsRGF0YTogaW1tdXRhYmxlRGF0YSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8qKlxuICogQWN0aW9uIHRvIHNldCBmb2N1cyB0byBlaXRoZXIgbGFzdCBlZGl0ZWRSb3csIGNyZWF0ZWRSb3cgb3IgdG8gdmFsaWRhdGlvbiBlcnJvclxuICogQHBhcmFtIHtPYmplY3R9IGdyaWRcbiAqIEBwYXJhbSB7U3RyaW5nfSBmb2N1c1RvVHlwZSAtIHR5cGUgb2YgZm9jdXMgcmVxdWVzdC4gUG9zc2libGUgdmFsdWVzOlxuICogJ2ZvY3VzVG9FZGl0Q2VsbCcgfHwgJ2ZvY3VzVG9FcnJvckNlbGwnIHx8ICdmb2N1c1RvQ3JlYXRlQ2VsbCdcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gZm9jdXNUb0xhc3RSb3cgLSBzZXRzIGZvY3VzIHRvIGxhc3QgZGF0YSByb3cgaW5zdGVhZCBvZiBzZWxlY3RlZCByb3dcbiAqL1xuZXhwb3J0IGNvbnN0IHNldEZvY3VzVG8gPSAoZ3JpZCwgZm9jdXNUbywgZm9jdXNUb0xhc3RSb3cgPSBmYWxzZSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX0ZPQ1VTX1RPLFxuICAgIGZvY3VzVG8sXG4gICAgZm9jdXNUb0xhc3RSb3csXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGV4dGVuZERhdGEgPSAoZ3JpZCwgY29sdW1ucywgZGF0YSwgcHJlcGVuZCA9IGZhbHNlKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBjb25zdCBpbW11dGFibGVEYXRhID0gSW1tdXRhYmxlLkl0ZXJhYmxlLmlzSXRlcmFibGUoZGF0YSkgPyBkYXRhIDogSW1tdXRhYmxlLmZyb21KUyhkYXRhKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0VYVEVORF9EQVRBLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGRhdGE6IGltbXV0YWJsZURhdGEsXG4gICAgcHJlcGVuZCxcbiAgfSk7XG4gIGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICBhcHBseVNvcnQoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbn07XG5cbmV4cG9ydCBjb25zdCByZXNpemVDb2x1bW4gPSAoZ3JpZCwgY29sdW1uS2V5LCB3aWR0aCkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgY29uc3QgY29sdW1uV2lkdGhzID0gZ2V0U3RhdGUoKVxuICAgIC5kYXRhZ3JpZFxuICAgIC5nZXRJbihbZ3JpZC5pZCwgJ2NvbmZpZycsICdjb2x1bW5XaWR0aHMnXSwgTWFwKCkpXG4gICAgLnNldChjb2x1bW5LZXksIHdpZHRoKTtcbiAgVXRpbHMuc2F2ZUNvbHVtbldpZHRocyhncmlkLCBjb2x1bW5XaWR0aHMpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVTSVpFX0NPTFVNTixcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBjb2x1bW5XaWR0aHMsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGVkaXQgPSBncmlkID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0VESVQsXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGNhbmNlbCA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0FOQ0VMLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzYXZlID0gKGdyaWQsIGNiID0gKCkgPT4ge30pID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NBVkUsXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xuICBjYigpO1xufTtcblxuZXhwb3J0IGNvbnN0IHNhdmVTdWNjZXNzID0gKGdyaWQsIGNvbHVtbnMsIHNhdmVkSXRlbXMpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TQVZFX1NVQ0NFU1MsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgICBzYXZlZEl0ZW1zLFxuICB9KTtcbiAgYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gIGFwcGx5U29ydChncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xufTtcblxuZXhwb3J0IGNvbnN0IHNhdmVQYXJ0aWFsU3VjY2VzcyA9IChncmlkLCBjb2x1bW5zLCBzYXZlZEl0ZW1zKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0FWRV9QQVJUSUFMX1NVQ0NFU1MsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgICBzYXZlZEl0ZW1zLFxuICB9KTtcbiAgYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gIGFwcGx5U29ydChncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xufTtcblxuZXhwb3J0IGNvbnN0IHNhdmVGYWlsID0gZ3JpZCA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TQVZFX0ZBSUwsXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZSA9IChncmlkLCBjb2x1bW5EZWZhdWx0VmFsdWVzKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEUsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgY29sdW1uRGVmYXVsdFZhbHVlcyxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgYWRkTmV3SXRlbSA9IChncmlkLCBjb2x1bW5EZWZhdWx0VmFsdWVzKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9BRERfTkVXX0lURU0sXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgY29sdW1uRGVmYXVsdFZhbHVlcyxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlSXRlbSA9IChncmlkLCByb3dJZCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0lURU0sXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgICByb3dJZCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlTmV3SXRlbSA9IChncmlkLCBpbmRleCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGluZGV4LFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVOZXdJdGVtcyA9IChncmlkLCBpbmRleGVzKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU1TLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGluZGV4ZXMsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZSA9IChncmlkLCBjYiA9ICgpID0+IHt9KSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkUsXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xuICBjYigpO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZVN1Y2Nlc3MgPSAoZ3JpZCwgcmVtb3ZlZElkcykgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX1NVQ0NFU1MsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgICByZW1vdmVkSWRzLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVGYWlsID0gZ3JpZCA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfRkFJTCxcbiAgICBpZDogZ3JpZC5pZCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZWRpdENlbGxWYWx1ZUNoYW5nZSA9IChncmlkLCBkYXRhSWQsIGtleVBhdGgsIHZhbHVlKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9FRElUX0NFTExfVkFMVUVfQ0hBTkdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGRhdGFJZCxcbiAgICBrZXlQYXRoLFxuICAgIHZhbHVlLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBlZGl0Q2VsbFZhbHVlVmFsaWRhdGUgPSAoXG4gIGdyaWQsXG4gIGRhdGFJZCxcbiAga2V5UGF0aCxcbiAgdmFsdWUsXG4gIHZhbGlkYXRvcnMgPSBbXSxcbikgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgbGV0IHZhbGlkYXRpb25TdGF0ZSA9IHsgdmFsaWQ6IHRydWUgfTtcbiAgdmFsaWRhdG9ycy5mb3JFYWNoKCh2YWxpZGF0b3IpID0+IHtcbiAgICBpZiAodmFsaWRhdGlvblN0YXRlLnZhbGlkKSB7XG4gICAgICBpZiAodmFsaWRhdG9yLnVuaXF1ZSkge1xuICAgICAgICBpZiAodmFsdWUgIT09ICcnIHx8IHZhbHVlICE9PSBudWxsIHx8IHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAvLyBjb21iaW5lIHJlYWwgZGF0YSB3aXRoIGN1cnJlbnQgdW5zYXZlZCBlZGl0ZWQgZGF0YVxuICAgICAgICAgIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG4gICAgICAgICAgY29uc3QgZWRpdERhdGEgPSBncmlkRGF0YS5nZXQoJ2VkaXREYXRhJyk7XG4gICAgICAgICAgbGV0IGFsbERhdGEgPSBncmlkRGF0YS5nZXQoJ2FsbERhdGEnKTtcbiAgICAgICAgICBpZiAoZWRpdERhdGEpIHtcbiAgICAgICAgICAgIGVkaXREYXRhLmZvckVhY2goKGVkaXREYXRhSXRlbSwgZWRpdERhdGFJdGVtSWQpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgZm91bmRJbmRleCA9IGFsbERhdGEuZmluZEluZGV4KGQgPT4gZC5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGVkaXREYXRhSXRlbUlkKTtcbiAgICAgICAgICAgICAgaWYgKGZvdW5kSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgYWxsRGF0YSA9IGFsbERhdGEubWVyZ2VEZWVwSW4oW2ZvdW5kSW5kZXhdLCBlZGl0RGF0YUl0ZW0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gZGV0ZXJtaW5lIHVuaXF1ZW5lc3NcbiAgICAgICAgICBjb25zdCBmaW5kaW5nID0gYWxsRGF0YS5maW5kKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoZ3JpZC5pZEtleVBhdGgubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIC8vIGRvbid0IHNlbGYgY29tcGFyZVxuICAgICAgICAgICAgICBpZiAoaXRlbS5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGRhdGFJZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uZ2V0SW4oa2V5UGF0aCkgPT09IHZhbHVlO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChmaW5kaW5nKSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB7XG4gICAgICAgICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgICAgICAgICAgbWVzc2FnZTogJ1ZhbGlkYXRpb24uVW5pcXVlJyxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHZhbGlkYXRvci52YWxpZGF0ZVdpdGhSb3dEYXRhKSB7XG4gICAgICAgIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG4gICAgICAgIGNvbnN0IGVkaXREYXRhID0gZ3JpZERhdGEuZ2V0SW4oWydlZGl0RGF0YScsIGRhdGFJZF0sIE1hcCgpKTtcbiAgICAgICAgbGV0IHJvd0RhdGEgPSBncmlkRGF0YS5nZXQoJ2FsbERhdGEnKS5maW5kKGl0ZW0gPT4gaXRlbS5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGRhdGFJZCk7XG4gICAgICAgIGlmIChyb3dEYXRhKSB7XG4gICAgICAgICAgcm93RGF0YSA9IHJvd0RhdGEubWVyZ2VEZWVwKGVkaXREYXRhKTtcbiAgICAgICAgICBjb25zdCBwYXJhbXMgPSB2YWxpZGF0b3IucGFyYW1zID8gT2JqZWN0LnZhbHVlcyh2YWxpZGF0b3IucGFyYW1zKSA6IFtdO1xuICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZVdpdGhSb3dEYXRhKHZhbHVlLCByb3dEYXRhLCAuLi5wYXJhbXMpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSB2YWxpZGF0b3IucGFyYW1zID8gT2JqZWN0LnZhbHVlcyh2YWxpZGF0b3IucGFyYW1zKSA6IFtdO1xuICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB2YWxpZGF0b3IudmFsaWRhdGUodmFsdWUsIC4uLnBhcmFtcyk7XG4gICAgICAgIGlmICh2YWxpZGF0b3IucGFyYW1zKSB7XG4gICAgICAgICAgdmFsaWRhdGlvblN0YXRlLm1lc3NhZ2VWYWx1ZXMgPSB2YWxpZGF0b3IucGFyYW1zO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgaWYgKHZhbGlkYXRpb25TdGF0ZS52YWxpZCkge1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfSElERV9NRVNTQUdFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBtZXNzYWdlVHlwZTogJ2Vycm9yJyxcbiAgICAgIGRhdGFJZCxcbiAgICAgIGtleVBhdGgsXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIG1lc3NhZ2VUeXBlOiAnZXJyb3InLFxuICAgICAgZGF0YUlkLFxuICAgICAga2V5UGF0aCxcbiAgICAgIG1lc3NhZ2VJZDogdmFsaWRhdGlvblN0YXRlLm1lc3NhZ2UsXG4gICAgICBtZXNzYWdlVmFsdWVzOiB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZVZhbHVlcyxcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gdmFsaWRhdGlvblN0YXRlLnZhbGlkO1xufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSA9IChncmlkLCByb3dJbmRleCwga2V5UGF0aCwgdmFsdWUpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX0NIQU5HRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICByb3dJbmRleCxcbiAgICBrZXlQYXRoLFxuICAgIHZhbHVlLFxuICB9KTtcbn07XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG5leHBvcnQgY29uc3QgY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUgPSAoZ3JpZCwgcm93SW5kZXgsIGtleVBhdGgsIHZhbHVlLCB2YWxpZGF0b3JzID0gW10pID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGxldCB2YWxpZGF0aW9uU3RhdGUgPSB7IHZhbGlkOiB0cnVlIH07XG4gIHZhbGlkYXRvcnMuZm9yRWFjaCgodmFsaWRhdG9yKSA9PiB7XG4gICAgaWYgKHZhbGlkYXRpb25TdGF0ZS52YWxpZCkge1xuICAgICAgaWYgKHZhbGlkYXRvci51bmlxdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSAnJyB8fCB2YWx1ZSAhPT0gbnVsbCB8fCB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY29uc3QgZmluZGluZyA9IGdldFN0YXRlKClcbiAgICAgICAgICAgIC5kYXRhZ3JpZFxuICAgICAgICAgICAgLmdldEluKFtncmlkLmlkLCAnYWxsRGF0YSddKVxuICAgICAgICAgICAgLmZpbmQoaXRlbSA9PiBpdGVtLmdldEluKGtleVBhdGgpID09PSB2YWx1ZSk7XG4gICAgICAgICAgaWYgKGZpbmRpbmcpIHtcbiAgICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHtcbiAgICAgICAgICAgICAgdmFsaWQ6IGZhbHNlLFxuICAgICAgICAgICAgICBtZXNzYWdlOiAnVmFsaWRhdGlvbi5VbmlxdWUnLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZmluZDIgPSBnZXRTdGF0ZSgpXG4gICAgICAgICAgICAgIC5kYXRhZ3JpZFxuICAgICAgICAgICAgICAuZ2V0SW4oW2dyaWQuaWQsICdjcmVhdGVEYXRhJ10pXG4gICAgICAgICAgICAgIC5maW5kKChpdGVtLCBpKSA9PiBpICE9PSByb3dJbmRleCAmJiBpdGVtLmdldEluKGtleVBhdGgpID09PSB2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoZmluZDIpIHtcbiAgICAgICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0ge1xuICAgICAgICAgICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnVmFsaWRhdGlvbi5VbmlxdWUnLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh2YWxpZGF0b3IudmFsaWRhdGVXaXRoUm93RGF0YSkge1xuICAgICAgICBjb25zdCByb3dEYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ2NyZWF0ZURhdGEnLCByb3dJbmRleF0pO1xuICAgICAgICBjb25zdCBwYXJhbXMgPSB2YWxpZGF0b3IucGFyYW1zID8gT2JqZWN0LnZhbHVlcyh2YWxpZGF0b3IucGFyYW1zKSA6IFtdO1xuICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB2YWxpZGF0b3IudmFsaWRhdGVXaXRoUm93RGF0YSh2YWx1ZSwgcm93RGF0YSwgLi4ucGFyYW1zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHZhbGlkYXRvci5wYXJhbXMgPyBPYmplY3QudmFsdWVzKHZhbGlkYXRvci5wYXJhbXMpIDogW107XG4gICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZSh2YWx1ZSwgLi4ucGFyYW1zKTtcbiAgICAgICAgaWYgKHZhbGlkYXRvci5wYXJhbXMpIHtcbiAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZVZhbHVlcyA9IHZhbGlkYXRvci5wYXJhbXM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICBpZiAodmFsaWRhdGlvblN0YXRlLnZhbGlkKSB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfSElERV9NRVNTQUdFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBtZXNzYWdlVHlwZTogJ2Vycm9yJyxcbiAgICAgIHJvd0luZGV4LFxuICAgICAga2V5UGF0aCxcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9TSE9XX01FU1NBR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIG1lc3NhZ2VUeXBlOiAnZXJyb3InLFxuICAgICAgcm93SW5kZXgsXG4gICAgICBrZXlQYXRoLFxuICAgICAgbWVzc2FnZUlkOiB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZSxcbiAgICAgIG1lc3NhZ2VWYWx1ZXM6IHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlVmFsdWVzLFxuICAgIH0pO1xuICB9XG4gIHJldHVybiB2YWxpZGF0aW9uU3RhdGUudmFsaWQ7XG59O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuZXhwb3J0IGNvbnN0IGNlbGxTaG93TWVzc2FnZSA9IChncmlkLCBtZXNzYWdlVHlwZSwgZGF0YUlkLCBrZXlQYXRoLCBtZXNzYWdlSWQsIG1lc3NhZ2VWYWx1ZXMpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIG1lc3NhZ2VUeXBlLFxuICAgIGRhdGFJZCxcbiAgICBrZXlQYXRoLFxuICAgIG1lc3NhZ2VJZCxcbiAgICBtZXNzYWdlVmFsdWVzLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBjZWxsU2hvd01lc3NhZ2VzID0gKGdyaWQsIG1lc3NhZ2VzKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRVMsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgbWVzc2FnZXMsXG4gIH0pO1xufTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbmV4cG9ydCBjb25zdCBjZWxsSGlkZU1lc3NhZ2UgPSAoZ3JpZCwgbWVzc2FnZVR5cGUgPSBudWxsLCBkYXRhSWQgPSBudWxsLCBrZXlQYXRoID0gbnVsbCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0VMTF9ISURFX01FU1NBR0UsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgbWVzc2FnZVR5cGUsXG4gICAgZGF0YUlkLFxuICAgIGtleVBhdGgsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNlbGxTaG93TWVzc2FnZSA9IChcbiAgZ3JpZCxcbiAgbWVzc2FnZVR5cGUsXG4gIHJvd0luZGV4LFxuICBrZXlQYXRoLFxuICBtZXNzYWdlSWQsXG4gIG1lc3NhZ2VWYWx1ZXMsXG4pID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBtZXNzYWdlVHlwZSxcbiAgICByb3dJbmRleCxcbiAgICBrZXlQYXRoLFxuICAgIG1lc3NhZ2VJZCxcbiAgICBtZXNzYWdlVmFsdWVzLFxuICB9KTtcbn07XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG5leHBvcnQgY29uc3QgY3JlYXRlQ2VsbEhpZGVNZXNzYWdlID0gKGdyaWQsIG1lc3NhZ2VUeXBlID0gbnVsbCwgcm93SW5kZXggPSBudWxsLCBrZXlQYXRoID0gbnVsbCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfSElERV9NRVNTQUdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIG1lc3NhZ2VUeXBlLFxuICAgIHJvd0luZGV4LFxuICAgIGtleVBhdGgsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGNlbGxTZWxlY3Rpb25DaGFuZ2UgPSAoZ3JpZCwgc2VsZWN0ZWRDZWxsID0gbnVsbCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgc2VsZWN0ZWRDZWxsLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0VMRUNUSU9OX0NIQU5HRSxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgaXRlbVNlbGVjdGlvbkNoYW5nZSA9IChcbiAgZ3JpZCxcbiAgcm93SW5kZXgsXG4gIGN0cmxQcmVzc2VkID0gZmFsc2UsXG4gIHNoaWZ0UHJlc3NlZCA9IGZhbHNlLFxuKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIHJvd0luZGV4LFxuICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgY3RybFByZXNzZWQsXG4gICAgc2hpZnRQcmVzc2VkLFxuICB9KTtcbiAgVXRpbHMuc2F2ZVNlbGVjdGVkSXRlbXMoZ3JpZCwgZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ3NlbGVjdGVkSXRlbXMnXSkpO1xufTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdEFsbEl0ZW1zQ2hhbmdlID0gZ3JpZCA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0UsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgfSk7XG4gIFV0aWxzLnNhdmVTZWxlY3RlZEl0ZW1zKGdyaWQsIGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdzZWxlY3RlZEl0ZW1zJ10pKTtcbn07XG5cbmV4cG9ydCBjb25zdCBjbGVhclNlbGVjdGVkSXRlbXMgPSBncmlkID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DTEVBUl9TRUxFQ1RFRF9JVEVNUyxcbiAgICBpZDogZ3JpZC5pZCxcbiAgfSk7XG4gIFV0aWxzLnNhdmVTZWxlY3RlZEl0ZW1zKGdyaWQsIGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdzZWxlY3RlZEl0ZW1zJ10pKTtcbn07XG5cbmV4cG9ydCBjb25zdCB0b2dnbGVGaWx0ZXJpbmcgPSBncmlkID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGNvbnN0IGlzRmlsdGVyaW5nID0gIWdldFN0YXRlKClcbiAgICAuZGF0YWdyaWRcbiAgICAuZ2V0SW4oW2dyaWQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdpc0ZpbHRlcmluZyddLCBmYWxzZSk7XG4gIFV0aWxzLnNhdmVJc0ZpbHRlcmluZyhncmlkLCBpc0ZpbHRlcmluZyk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9UT0dHTEVfRklMVEVSSU5HLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGlzRmlsdGVyaW5nLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUVkaXRlZFJvd3MgPSAoZ3JpZCwgY29sdW1ucykgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgY29uc3QgZ3JpZERhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldChncmlkLmlkKTtcbiAgY29uc3QgZWRpdERhdGEgPSBncmlkRGF0YS5nZXQoJ2VkaXREYXRhJywgTWFwKCkpO1xuICBsZXQgYWxsR29vZCA9IHRydWU7XG4gIGVkaXREYXRhLmZvckVhY2goKGVkaXREYXRhUm93LCBkYXRhSWQpID0+IHtcbiAgICBjb2x1bW5zLmZvckVhY2goKGNvbCkgPT4ge1xuICAgICAgbGV0IHZhbHVlID0gZWRpdERhdGFSb3cuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG4gICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YWx1ZSA9IGdyaWREYXRhXG4gICAgICAgICAgLmdldCgnYWxsRGF0YScpXG4gICAgICAgICAgLmZpbmQoZGF0YSA9PiBkYXRhLmdldEluKGdyaWQuaWRLZXlQYXRoKSA9PT0gZGF0YUlkKVxuICAgICAgICAgIC5nZXRJbihjb2wudmFsdWVLZXlQYXRoKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGlzVmFsaWQgPSBlZGl0Q2VsbFZhbHVlVmFsaWRhdGUoXG4gICAgICAgIGdyaWQsXG4gICAgICAgIGRhdGFJZCxcbiAgICAgICAgY29sLnZhbHVlS2V5UGF0aCxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIGNvbC52YWxpZGF0b3JzLFxuICAgICAgKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICAgICAgaWYgKGFsbEdvb2QgJiYgIWlzVmFsaWQpIHtcbiAgICAgICAgYWxsR29vZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIGFsbEdvb2Q7XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlRW1wdHlDcmVhdGVkUm93cyA9IChncmlkLCBjb2x1bW5zKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBjb25zdCBjcmVhdGVEYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ2NyZWF0ZURhdGEnXSwgTWFwKCkpO1xuICBjb25zdCBpbmRleGVzID0gW107XG4gIGNyZWF0ZURhdGEuZm9yRWFjaCgoY3JlYXRlRGF0YVJvdywgcm93SW5kZXgpID0+IHtcbiAgICBsZXQgaXNFbXB0eSA9IHRydWU7XG4gICAgY29sdW1ucy5mb3JFYWNoKChjb2wpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gY3JlYXRlRGF0YVJvdy5nZXRJbihjb2wudmFsdWVLZXlQYXRoKTtcbiAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSAnJyAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICBpc0VtcHR5ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGlzRW1wdHkpIHtcbiAgICAgIGluZGV4ZXMucHVzaChyb3dJbmRleCk7XG4gICAgfVxuICB9KTtcbiAgaWYgKGluZGV4ZXMubGVuZ3RoID4gMCkge1xuICAgIHJlbW92ZU5ld0l0ZW1zKGdyaWQsIGluZGV4ZXMpKGRpc3BhdGNoKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHZhbGlkYXRlQ3JlYXRlZFJvd3MgPSAoZ3JpZCwgY29sdW1ucykgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgcmVtb3ZlRW1wdHlDcmVhdGVkUm93cyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICBjb25zdCBjcmVhdGVEYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ2NyZWF0ZURhdGEnXSwgTWFwKCkpO1xuICBsZXQgYWxsR29vZCA9IHRydWU7XG4gIGNyZWF0ZURhdGEuZm9yRWFjaCgoY3JlYXRlRGF0YVJvdywgcm93SW5kZXgpID0+IHtcbiAgICBjb2x1bW5zLmZvckVhY2goKGNvbCkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSBjcmVhdGVEYXRhUm93LmdldEluKGNvbC52YWx1ZUtleVBhdGgpO1xuICAgICAgY29uc3QgaXNWYWxpZCA9IGNyZWF0ZUNlbGxWYWx1ZVZhbGlkYXRlKFxuICAgICAgICBncmlkLFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgY29sLnZhbHVlS2V5UGF0aCxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIGNvbC52YWxpZGF0b3JzLFxuICAgICAgKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICAgICAgaWYgKGFsbEdvb2QgJiYgIWlzVmFsaWQpIHtcbiAgICAgICAgYWxsR29vZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIGFsbEdvb2Q7XG59O1xuXG5leHBvcnQgY29uc3QgdXBkYXRlRXhpc3RpbmdDZWxsVmFsdWUgPSAoZ3JpZCwgZGF0YUlkLCBrZXlQYXRoLCB2YWx1ZSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfVVBEQVRFX0VYSVNUSU5HX0NFTExfVkFMVUUsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgZGF0YUlkLFxuICAgIGtleVBhdGgsXG4gICAgdmFsdWUsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldEVkaXREYXRhID0gKGdyaWQsIGRhdGEsIGNlbGxNZXNzYWdlcyA9IE1hcCgpKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICBkYXRhLFxuICAgIGNlbGxNZXNzYWdlcyxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfRURJVF9EQVRBLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBvcGVuQ29sdW1uU2V0dGluZ3NNb2RhbCA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX09QRU4sXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbCA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX0NMT1NFLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzYXZlQ29sdW1uU2V0dGluZ3MgPSAoZ3JpZCwgaGlkZGVuQ29sdW1ucywgY29sdW1uT3JkZXIpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgVXRpbHMuc2F2ZUNvbHVtblNldHRpbmdzKGdyaWQsIGhpZGRlbkNvbHVtbnMsIGNvbHVtbk9yZGVyKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGNvbHVtbk9yZGVyLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXRQYWdlID0gKGdyaWQsIHBhZ2UpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5zYXZlUGFnZShncmlkLCBwYWdlKTtcbiAgZGlzcGF0Y2goe1xuICAgIHBhZ2UsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX1BBR0UsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldFJvd3NPblBhZ2UgPSAoZ3JpZCwgcm93c09uUGFnZSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLnNhdmVSb3dzT25QYWdlKGdyaWQsIHJvd3NPblBhZ2UpO1xuICBkaXNwYXRjaCh7XG4gICAgcm93c09uUGFnZSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfUk9XU19PTl9QQUdFLFxuICB9KTtcbn07XG4iXX0=