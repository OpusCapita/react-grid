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
  PLATFORM_DATAGRID_SET_PAGINATION_PAGE: 'PLATFORM_DATAGRID_SET_PAGINATION_PAGE'
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

export var setAndApplyFilters = function setAndApplyFilters(grid, columns, filteringData) {
  return function (dispatch) {
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_SET_FILTERS,
      id: grid.id,
      filteringData: Utils.normalizeFilteringData(filteringData)
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
          data: data
        });
      }
      var sortData = gridData.getIn(['config', 'sortingData']);
      if (sortData) {
        dispatch({
          type: TYPES.PLATFORM_DATAGRID_APPLY_SORT,
          id: grid.id,
          data: data,
          allData: data
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

export var setPaginationPage = function setPaginationPage(grid, paginationPage) {
  return function (dispatch) {
    Utils.savePaginationPage(grid, { page: paginationPage });
    dispatch({
      paginationPage: paginationPage,
      id: grid.id,
      type: TYPES.PLATFORM_DATAGRID_SET_PAGINATION_PAGE
    });
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5hY3Rpb25zLmpzIl0sIm5hbWVzIjpbIkltbXV0YWJsZSIsIk1hcCIsIlV0aWxzIiwiVFlQRVMiLCJQTEFURk9STV9EQVRBR1JJRF9JTlZBTElEQVRFIiwiUExBVEZPUk1fREFUQUdSSURfQlVTWSIsIlBMQVRGT1JNX0RBVEFHUklEX1JFQURZIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX0RBVEEiLCJQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9TT1JUIiwiUExBVEZPUk1fREFUQUdSSURfU09SVF9DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9SRVNJWkVfQ09MVU1OIiwiUExBVEZPUk1fREFUQUdSSURfRURJVCIsIlBMQVRGT1JNX0RBVEFHUklEX0NBTkNFTCIsIlBMQVRGT1JNX0RBVEFHUklEX1NBVkUiLCJQTEFURk9STV9EQVRBR1JJRF9FWFRFTkRfREFUQSIsIlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfU1VDQ0VTUyIsIlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfUEFSVElBTF9TVUNDRVNTIiwiUExBVEZPUk1fREFUQUdSSURfU0FWRV9GQUlMIiwiUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFIiwiUExBVEZPUk1fREFUQUdSSURfQUREX05FV19JVEVNIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0lURU0iLCJQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU0iLCJQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU1TIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX1NVQ0NFU1MiLCJQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfRkFJTCIsIlBMQVRGT1JNX0RBVEFHUklEX0VESVRfQ0VMTF9WQUxVRV9DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFUyIsIlBMQVRGT1JNX0RBVEFHUklEX0NFTExfSElERV9NRVNTQUdFIiwiUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfU0hPV19NRVNTQUdFIiwiUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfSElERV9NRVNTQUdFIiwiUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfVkFMSURBVEUiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NFTEVDVElPTl9DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9JVEVNX1NFTEVDVElPTl9DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9TRUxFQ1RfQUxMX0lURU1TX0NIQU5HRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NMRUFSX1NFTEVDVEVEX0lURU1TIiwiUExBVEZPUk1fREFUQUdSSURfVE9HR0xFX0ZJTFRFUklORyIsIlBMQVRGT1JNX0RBVEFHUklEX0ZJTFRFUl9EQVRBX0NIQU5HRSIsIlBMQVRGT1JNX0RBVEFHUklEX0FQUExZX0ZJTFRFUlMiLCJQTEFURk9STV9EQVRBR1JJRF9TRVRfRklMVEVSUyIsIlBMQVRGT1JNX0RBVEFHUklEX1VQREFURV9FWElTVElOR19DRUxMX1ZBTFVFIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX0VESVRfREFUQSIsIlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9PUEVOIiwiUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX0NMT1NFIiwiUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX1NBVkUiLCJQTEFURk9STV9EQVRBR1JJRF9GT1JDRV9SRUZSRVNIIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX0ZPQ1VTX1RPIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX1BBR0lOQVRJT05fUEFHRSIsImludmFsaWRhdGUiLCJkaXNwYXRjaCIsImNoZWNrR3JpZFBhcmFtIiwiZ3JpZCIsInR5cGUiLCJpZCIsImZvcmNlUmVmcmVzaCIsInNldFRpbWVvdXQiLCJkb2N1bWVudCIsImNyZWF0ZUV2ZW50IiwiZXZ0IiwiaW5pdEV2ZW50Iiwid2luZG93IiwiZGlzcGF0Y2hFdmVudCIsInNldEJ1c3kiLCJzZXRSZWFkeSIsImFwcGx5RmlsdGVycyIsImNvbHVtbnMiLCJnZXRTdGF0ZSIsImZvckVhY2giLCJncmlkRGF0YSIsImRhdGFncmlkIiwiZ2V0IiwiZmlsdGVyRGF0YSIsImdldEluIiwiYWxsRGF0YSIsImRhdGEiLCJwYWdpbmF0aW9uIiwiaXNFbXB0eSIsImRhdGVGb3JtYXQiLCJnZXREYXRlRm9ybWF0IiwidXNlciIsImZpbHRlciIsInJvdyIsImhpdHMiLCJmaWx0ZXJWYWx1ZSIsImZpbHRlckNvbHVtbiIsImNvbHVtbiIsImdldENvbHVtbktleSIsInZhbHVlIiwidmFsdWVLZXlQYXRoIiwiZmlsdGVyTWF0Y2hlciIsImdldEZpbHRlck1hdGNoZXIiLCJzaXplIiwic2V0QW5kQXBwbHlGaWx0ZXJzIiwiZmlsdGVyaW5nRGF0YSIsIm5vcm1hbGl6ZUZpbHRlcmluZ0RhdGEiLCJmaWx0ZXJDZWxsVmFsdWVDaGFuZ2UiLCJvcmlnRmlsdGVyRGF0YSIsImNvbHVtbktleSIsInZhbHVlRW1wdHlDaGVja2VyIiwiZ2V0VmFsdWVFbXB0eUNoZWNrZXIiLCJkZWxldGUiLCJzZXQiLCJzYXZlRmlsdGVyRGF0YSIsImFwcGx5U29ydCIsInNvcnREYXRhIiwic29ydENvbHVtbiIsInNvcnRPcmRlciIsImNvbCIsIm9yaWdBbGxEYXRhIiwiY29tcGFyYXRvciIsImdldFNvcnRDb21wYXJhdG9yIiwidmFsdWVHZXR0ZXIiLCJnZXRTb3J0VmFsdWVHZXR0ZXIiLCJzb3J0IiwiYSIsImIiLCJ2YWxBIiwidmFsQiIsInNvcnRDaGFuZ2UiLCJuZXdTb3J0Iiwic2F2ZVNvcnREYXRhIiwic2V0RGF0YSIsImNoZWNrQ29sdW1uc1BhcmFtIiwiY29uZmlnRGF0YSIsImxvYWRHcmlkQ29uZmlnIiwiaW1tdXRhYmxlRGF0YSIsIkl0ZXJhYmxlIiwiaXNJdGVyYWJsZSIsImZyb21KUyIsInNlbGVjdGVkSXRlbXMiLCJsb2FkU2VsZWN0ZWRJdGVtcyIsImZpbmQiLCJkYXRhSXRlbSIsImlkS2V5UGF0aCIsIml0ZW0iLCJjb25maWciLCJzZXRGb2N1c1RvIiwiZm9jdXNUbyIsImZvY3VzVG9MYXN0Um93IiwiZXh0ZW5kRGF0YSIsInByZXBlbmQiLCJyZXNpemVDb2x1bW4iLCJ3aWR0aCIsImNvbHVtbldpZHRocyIsInNhdmVDb2x1bW5XaWR0aHMiLCJlZGl0IiwiY2FuY2VsIiwic2F2ZSIsImNiIiwic2F2ZVN1Y2Nlc3MiLCJzYXZlZEl0ZW1zIiwic2F2ZVBhcnRpYWxTdWNjZXNzIiwic2F2ZUZhaWwiLCJjcmVhdGUiLCJjb2x1bW5EZWZhdWx0VmFsdWVzIiwiYWRkTmV3SXRlbSIsInJlbW92ZUl0ZW0iLCJyb3dJZCIsInJlbW92ZU5ld0l0ZW0iLCJpbmRleCIsInJlbW92ZU5ld0l0ZW1zIiwiaW5kZXhlcyIsInJlbW92ZSIsInJlbW92ZVN1Y2Nlc3MiLCJyZW1vdmVkSWRzIiwicmVtb3ZlRmFpbCIsImVkaXRDZWxsVmFsdWVDaGFuZ2UiLCJkYXRhSWQiLCJrZXlQYXRoIiwiZWRpdENlbGxWYWx1ZVZhbGlkYXRlIiwidmFsaWRhdG9ycyIsInZhbGlkYXRpb25TdGF0ZSIsInZhbGlkIiwidmFsaWRhdG9yIiwidW5pcXVlIiwidW5kZWZpbmVkIiwiZWRpdERhdGEiLCJlZGl0RGF0YUl0ZW0iLCJlZGl0RGF0YUl0ZW1JZCIsImZvdW5kSW5kZXgiLCJmaW5kSW5kZXgiLCJkIiwibWVyZ2VEZWVwSW4iLCJmaW5kaW5nIiwibGVuZ3RoIiwibWVzc2FnZSIsInZhbGlkYXRlV2l0aFJvd0RhdGEiLCJyb3dEYXRhIiwibWVyZ2VEZWVwIiwicGFyYW1zIiwiT2JqZWN0IiwidmFsdWVzIiwidmFsaWRhdGUiLCJtZXNzYWdlVmFsdWVzIiwibWVzc2FnZVR5cGUiLCJtZXNzYWdlSWQiLCJjcmVhdGVDZWxsVmFsdWVDaGFuZ2UiLCJyb3dJbmRleCIsImNyZWF0ZUNlbGxWYWx1ZVZhbGlkYXRlIiwiZmluZDIiLCJpIiwiY2VsbFNob3dNZXNzYWdlIiwiY2VsbFNob3dNZXNzYWdlcyIsIm1lc3NhZ2VzIiwiY2VsbEhpZGVNZXNzYWdlIiwiY3JlYXRlQ2VsbFNob3dNZXNzYWdlIiwiY3JlYXRlQ2VsbEhpZGVNZXNzYWdlIiwiY2VsbFNlbGVjdGlvbkNoYW5nZSIsInNlbGVjdGVkQ2VsbCIsIml0ZW1TZWxlY3Rpb25DaGFuZ2UiLCJjdHJsUHJlc3NlZCIsInNoaWZ0UHJlc3NlZCIsInNhdmVTZWxlY3RlZEl0ZW1zIiwic2VsZWN0QWxsSXRlbXNDaGFuZ2UiLCJjbGVhclNlbGVjdGVkSXRlbXMiLCJ0b2dnbGVGaWx0ZXJpbmciLCJpc0ZpbHRlcmluZyIsInNhdmVJc0ZpbHRlcmluZyIsInZhbGlkYXRlRWRpdGVkUm93cyIsImFsbEdvb2QiLCJlZGl0RGF0YVJvdyIsImlzVmFsaWQiLCJyZW1vdmVFbXB0eUNyZWF0ZWRSb3dzIiwiY3JlYXRlRGF0YSIsImNyZWF0ZURhdGFSb3ciLCJwdXNoIiwidmFsaWRhdGVDcmVhdGVkUm93cyIsInVwZGF0ZUV4aXN0aW5nQ2VsbFZhbHVlIiwic2V0RWRpdERhdGEiLCJjZWxsTWVzc2FnZXMiLCJvcGVuQ29sdW1uU2V0dGluZ3NNb2RhbCIsImNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbCIsInNhdmVDb2x1bW5TZXR0aW5ncyIsImhpZGRlbkNvbHVtbnMiLCJjb2x1bW5PcmRlciIsInNldFBhZ2luYXRpb25QYWdlIiwicGFnaW5hdGlvblBhZ2UiLCJzYXZlUGFnaW5hdGlvblBhZ2UiLCJwYWdlIl0sIm1hcHBpbmdzIjoiQUFBQSxPQUFPQSxTQUFQLElBQW9CQyxHQUFwQixRQUErQixXQUEvQjtBQUNBLE9BQU9DLEtBQVAsTUFBa0Isa0JBQWxCOztBQUVBLE9BQU8sSUFBTUMsUUFBUTtBQUNuQkMsZ0NBQThCLDhCQURYO0FBRW5CQywwQkFBd0Isd0JBRkw7QUFHbkJDLDJCQUF5Qix5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QUQsRUFBYztBQUM1RGpELFVBQU1rRCxjQUFOLENBQXFCQyxJQUFyQjtBQUNBRixhQUFTO0FBQ1BHLFlBQU1uRCxNQUFNMEMsNkNBREw7QUFFUFUsVUFBSUYsS0FBS0U7QUFGRixLQUFUO0FBSUQsR0FOdUM7QUFBQSxDQUFqQzs7QUFRUCxPQUFPLElBQU1tTCxxQkFBcUIsU0FBckJBLGtCQUFxQixDQUFDckwsSUFBRCxFQUFPc0wsYUFBUCxFQUFzQkMsV0FBdEI7QUFBQSxTQUFzQyxVQUFDekwsUUFBRCxFQUFjO0FBQ3BGakQsVUFBTWtELGNBQU4sQ0FBcUJDLElBQXJCO0FBQ0FuRCxVQUFNd08sa0JBQU4sQ0FBeUJyTCxJQUF6QixFQUErQnNMLGFBQS9CLEVBQThDQyxXQUE5QztBQUNBekwsYUFBUztBQUNQRyxZQUFNbkQsTUFBTTJDLHNDQURMO0FBRVBTLFVBQUlGLEtBQUtFLEVBRkY7QUFHUHFMO0FBSE8sS0FBVDtBQUtELEdBUmlDO0FBQUEsQ0FBM0I7O0FBVVAsT0FBTyxJQUFNQyxvQkFBb0IsU0FBcEJBLGlCQUFvQixDQUFDeEwsSUFBRCxFQUFPeUwsY0FBUDtBQUFBLFNBQTBCLFVBQUMzTCxRQUFELEVBQWM7QUFDdkVqRCxVQUFNNk8sa0JBQU4sQ0FBeUIxTCxJQUF6QixFQUErQixFQUFFMkwsTUFBTUYsY0FBUixFQUEvQjtBQUNBM0wsYUFBUztBQUNQMkwsb0NBRE87QUFFUHZMLFVBQUlGLEtBQUtFLEVBRkY7QUFHUEQsWUFBTW5ELE1BQU04QztBQUhMLEtBQVQ7QUFLRCxHQVBnQztBQUFBLENBQTFCIiwiZmlsZSI6ImRhdGFncmlkLmFjdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSW1tdXRhYmxlLCB7IE1hcCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9kYXRhZ3JpZC51dGlscyc7XG5cbmV4cG9ydCBjb25zdCBUWVBFUyA9IHtcbiAgUExBVEZPUk1fREFUQUdSSURfSU5WQUxJREFURTogJ1BMQVRGT1JNX0RBVEFHUklEX0lOVkFMSURBVEUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9CVVNZOiAnUExBVEZPUk1fREFUQUdSSURfQlVTWScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFQURZOiAnUExBVEZPUk1fREFUQUdSSURfUkVBRFknLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRVRfREFUQTogJ1BMQVRGT1JNX0RBVEFHUklEX1NFVF9EQVRBJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQVBQTFlfU09SVDogJ1BMQVRGT1JNX0RBVEFHUklEX0FQUExZX1NPUlQnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TT1JUX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX1NPUlRfQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVTSVpFX0NPTFVNTjogJ1BMQVRGT1JNX0RBVEFHUklEX1JFU0laRV9DT0xVTU4nLFxuICBQTEFURk9STV9EQVRBR1JJRF9FRElUOiAnUExBVEZPUk1fREFUQUdSSURfRURJVCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NBTkNFTDogJ1BMQVRGT1JNX0RBVEFHUklEX0NBTkNFTCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NBVkU6ICdQTEFURk9STV9EQVRBR1JJRF9TQVZFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfRVhURU5EX0RBVEE6ICdQTEFURk9STV9EQVRBR1JJRF9FWFRFTkRfREFUQScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NBVkVfU1VDQ0VTUzogJ1BMQVRGT1JNX0RBVEFHUklEX1NBVkVfU1VDQ0VTUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NBVkVfUEFSVElBTF9TVUNDRVNTOiAnUExBVEZPUk1fREFUQUdSSURfU0FWRV9QQVJUSUFMX1NVQ0NFU1MnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TQVZFX0ZBSUw6ICdQTEFURk9STV9EQVRBR1JJRF9TQVZFX0ZBSUwnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEU6ICdQTEFURk9STV9EQVRBR1JJRF9DUkVBVEUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9BRERfTkVXX0lURU06ICdQTEFURk9STV9EQVRBR1JJRF9BRERfTkVXX0lURU0nLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfSVRFTTogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9JVEVNJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNOiAnUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNUzogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTVMnLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkU6ICdQTEFURk9STV9EQVRBR1JJRF9SRU1PVkUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfU1VDQ0VTUzogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9TVUNDRVNTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUw6ICdQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfRkFJTCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0VESVRfQ0VMTF9WQUxVRV9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9FRElUX0NFTExfVkFMVUVfQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFUzogJ1BMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NFTExfSElERV9NRVNTQUdFOiAnUExBVEZPUk1fREFUQUdSSURfQ0VMTF9ISURFX01FU1NBR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9TSE9XX01FU1NBR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9TSE9XX01FU1NBR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9ISURFX01FU1NBR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9ISURFX01FU1NBR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9WQUxJREFURTogJ1BMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX1ZBTElEQVRFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TRUxFQ1RJT05fQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TRUxFQ1RJT05fQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9TRUxFQ1RfQUxMX0lURU1TX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NMRUFSX1NFTEVDVEVEX0lURU1TOiAnUExBVEZPUk1fREFUQUdSSURfQ0xFQVJfU0VMRUNURURfSVRFTVMnLFxuICBQTEFURk9STV9EQVRBR1JJRF9UT0dHTEVfRklMVEVSSU5HOiAnUExBVEZPUk1fREFUQUdSSURfVE9HR0xFX0ZJTFRFUklORycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0ZJTFRFUl9EQVRBX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX0ZJTFRFUl9EQVRBX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0FQUExZX0ZJTFRFUlM6ICdQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9GSUxURVJTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0VUX0ZJTFRFUlM6ICdQTEFURk9STV9EQVRBR1JJRF9TRVRfRklMVEVSUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1VQREFURV9FWElTVElOR19DRUxMX1ZBTFVFOiAnUExBVEZPUk1fREFUQUdSSURfVVBEQVRFX0VYSVNUSU5HX0NFTExfVkFMVUUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRVRfRURJVF9EQVRBOiAnUExBVEZPUk1fREFUQUdSSURfU0VUX0VESVRfREFUQScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9PUEVOOiAnUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX09QRU4nLFxuICBQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfQ0xPU0U6ICdQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfQ0xPU0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfU0FWRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfRk9SQ0VfUkVGUkVTSDogJ1BMQVRGT1JNX0RBVEFHUklEX0ZPUkNFX1JFRlJFU0gnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRVRfRk9DVVNfVE86ICdQTEFURk9STV9EQVRBR1JJRF9TRVRfRk9DVVNfVE8nLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRVRfUEFHSU5BVElPTl9QQUdFOiAnUExBVEZPUk1fREFUQUdSSURfU0VUX1BBR0lOQVRJT05fUEFHRScsXG59O1xuXG5leHBvcnQgY29uc3QgaW52YWxpZGF0ZSA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfSU5WQUxJREFURSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZm9yY2VSZWZyZXNoID0gKCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIC8vIEZpcmUgcmVzaXplIGV2ZW50IHRvIHJlY2FsY3VsYXRlIGNvbXBvbmVudCBzaXplc1xuICAvLyBhbmQgdG8gZm9yY2UgcmVkcmF3IGFsbCBtb3VudGVkIGdyaWRzXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGlmIChkb2N1bWVudC5jcmVhdGVFdmVudCkge1xuICAgICAgY29uc3QgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKTtcbiAgICAgIGV2dC5pbml0RXZlbnQoJ3Jlc2l6ZScsIHRydWUsIGZhbHNlKTtcbiAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gICAgfVxuICB9LCAxKTtcbiAgZGlzcGF0Y2goeyB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9GT1JDRV9SRUZSRVNIIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldEJ1c3kgPSBncmlkID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0JVU1ksXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldFJlYWR5ID0gZ3JpZCA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRUFEWSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgYXBwbHlGaWx0ZXJzID0gKGdyaWQsIGNvbHVtbnMpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGlmICghY29sdW1ucyB8fCAhY29sdW1ucy5mb3JFYWNoKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG4gIGlmICghZ3JpZERhdGEpIHJldHVybiBmYWxzZTtcbiAgY29uc3QgZmlsdGVyRGF0YSA9IGdyaWREYXRhLmdldEluKFsnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnZmlsdGVyRGF0YSddLCBNYXAoKSk7XG4gIGNvbnN0IGFsbERhdGEgPSBncmlkRGF0YS5nZXQoJ2FsbERhdGEnKTtcbiAgc2V0QnVzeShncmlkKShkaXNwYXRjaCk7XG4gIGxldCBkYXRhO1xuICBpZiAoZ3JpZC5wYWdpbmF0aW9uKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gaWYgKGZpbHRlckRhdGEuaXNFbXB0eSgpKSB7XG4gICAgZGF0YSA9IGFsbERhdGE7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZGF0ZUZvcm1hdCA9IFV0aWxzLmdldERhdGVGb3JtYXQoZ3JpZCwgZ2V0U3RhdGUoKS51c2VyKTtcbiAgICBkYXRhID0gYWxsRGF0YS5maWx0ZXIoKHJvdykgPT4ge1xuICAgICAgbGV0IGhpdHMgPSAwO1xuICAgICAgZmlsdGVyRGF0YS5mb3JFYWNoKChmaWx0ZXJWYWx1ZSwgZmlsdGVyQ29sdW1uKSA9PiB7XG4gICAgICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sdW1uKSA9PiB7XG4gICAgICAgICAgaWYgKFV0aWxzLmdldENvbHVtbktleShjb2x1bW4pID09PSBmaWx0ZXJDb2x1bW4pIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gcm93LmdldEluKGNvbHVtbi52YWx1ZUtleVBhdGgpO1xuICAgICAgICAgICAgaWYgKHZhbHVlIHx8IHZhbHVlID09PSAwIHx8IHZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJNYXRjaGVyID0gVXRpbHMuZ2V0RmlsdGVyTWF0Y2hlcihjb2x1bW4sIGRhdGVGb3JtYXQpO1xuICAgICAgICAgICAgICBpZiAoZmlsdGVyTWF0Y2hlcihyb3csIGZpbHRlclZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGhpdHMgKz0gMTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBoaXRzID09PSBmaWx0ZXJEYXRhLnNpemU7XG4gICAgfSk7XG4gIH1cbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0FQUExZX0ZJTFRFUlMsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgZGF0YSxcbiAgfSk7XG4gIHNldFJlYWR5KGdyaWQpKGRpc3BhdGNoKTtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0QW5kQXBwbHlGaWx0ZXJzID0gKGdyaWQsIGNvbHVtbnMsIGZpbHRlcmluZ0RhdGEpID0+IChkaXNwYXRjaCkgPT4ge1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX0ZJTFRFUlMsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgZmlsdGVyaW5nRGF0YTogVXRpbHMubm9ybWFsaXplRmlsdGVyaW5nRGF0YShmaWx0ZXJpbmdEYXRhKSxcbiAgfSk7XG4gIGRpc3BhdGNoKGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKSk7XG4gIHJldHVybiB0cnVlO1xufTtcblxuZXhwb3J0IGNvbnN0IGZpbHRlckNlbGxWYWx1ZUNoYW5nZSA9IChncmlkLCBjb2x1bW5zLCBjb2x1bW4sIHZhbHVlKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBjb25zdCBvcmlnRmlsdGVyRGF0YSA9IGdldFN0YXRlKClcbiAgICAuZGF0YWdyaWRcbiAgICAuZ2V0SW4oW2dyaWQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdmaWx0ZXJEYXRhJ10sIE1hcCgpKTtcbiAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbHVtbik7XG4gIGNvbnN0IHZhbHVlRW1wdHlDaGVja2VyID0gVXRpbHMuZ2V0VmFsdWVFbXB0eUNoZWNrZXIoY29sdW1uKTtcbiAgbGV0IGZpbHRlckRhdGE7XG4gIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWx1ZSkpIHtcbiAgICBmaWx0ZXJEYXRhID0gb3JpZ0ZpbHRlckRhdGEuZGVsZXRlKGNvbHVtbktleSk7XG4gIH0gZWxzZSB7XG4gICAgZmlsdGVyRGF0YSA9IG9yaWdGaWx0ZXJEYXRhLnNldChjb2x1bW5LZXksIHZhbHVlKTtcbiAgfVxuICBVdGlscy5zYXZlRmlsdGVyRGF0YShncmlkLCBmaWx0ZXJEYXRhKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0ZJTFRFUl9EQVRBX0NIQU5HRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBmaWx0ZXJEYXRhLFxuICB9KTtcbiAgYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG59O1xuXG5leHBvcnQgY29uc3QgYXBwbHlTb3J0ID0gKGdyaWQsIGNvbHVtbnMpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGlmICghY29sdW1ucyB8fCAhY29sdW1ucy5mb3JFYWNoKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG4gIGlmICghZ3JpZERhdGEpIHJldHVybiBmYWxzZTtcbiAgY29uc3Qgc29ydERhdGEgPSBncmlkRGF0YS5nZXRJbihbJ2NvbmZpZycsICdzb3J0aW5nRGF0YSddKTtcbiAgaWYgKCFzb3J0RGF0YSkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBzb3J0Q29sdW1uID0gc29ydERhdGEuZ2V0KCdzb3J0Q29sdW1uJyk7XG4gIGlmICghc29ydENvbHVtbikgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBzb3J0T3JkZXIgPSBzb3J0RGF0YS5nZXQoJ3NvcnRPcmRlcicsICdhc2MnKTtcbiAgbGV0IGNvbHVtbjtcbiAgY29sdW1ucy5mb3JFYWNoKChjb2wpID0+IHtcbiAgICBpZiAoVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCkgPT09IHNvcnRDb2x1bW4pIHtcbiAgICAgIGNvbHVtbiA9IGNvbDtcbiAgICB9XG4gIH0pO1xuICBpZiAoIWNvbHVtbikgcmV0dXJuIGZhbHNlO1xuXG4gIHNldEJ1c3koZ3JpZCkoZGlzcGF0Y2gpO1xuICBpZiAoZ3JpZC5wYWdpbmF0aW9uKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgY29uc3Qgb3JpZ0FsbERhdGEgPSBncmlkRGF0YS5nZXQoJ2FsbERhdGEnKTtcbiAgY29uc3QgY29tcGFyYXRvciA9IFV0aWxzLmdldFNvcnRDb21wYXJhdG9yKGNvbHVtbik7XG4gIGNvbnN0IHZhbHVlR2V0dGVyID0gVXRpbHMuZ2V0U29ydFZhbHVlR2V0dGVyKGNvbHVtbik7XG4gIGNvbnN0IHZhbHVlRW1wdHlDaGVja2VyID0gVXRpbHMuZ2V0VmFsdWVFbXB0eUNoZWNrZXIoY29sdW1uKTtcbiAgY29uc3QgYWxsRGF0YSA9IG9yaWdBbGxEYXRhLnNvcnQoKGEsIGIpID0+IHtcbiAgICBjb25zdCB2YWxBID0gdmFsdWVHZXR0ZXIoYSk7XG4gICAgY29uc3QgdmFsQiA9IHZhbHVlR2V0dGVyKGIpO1xuICAgIGlmIChzb3J0T3JkZXIgPT09ICdhc2MnKSB7XG4gICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQSkpIHJldHVybiAtMTtcbiAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxCKSkgcmV0dXJuIDE7XG4gICAgICByZXR1cm4gY29tcGFyYXRvcih2YWxBLCB2YWxCKTtcbiAgICB9XG4gICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEEpKSByZXR1cm4gMTtcbiAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQikpIHJldHVybiAtMTtcbiAgICByZXR1cm4gY29tcGFyYXRvcih2YWxCLCB2YWxBKTtcbiAgfSk7XG4gIGxldCBkYXRhO1xuICAvLyBTb3J0IGFsc28gZmlsdGVyZWQgZGF0YSBzZXBhcmF0ZWx5XG4gIGlmIChncmlkRGF0YS5nZXRJbihbJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2lzRmlsdGVyaW5nJ10sIGZhbHNlKSkge1xuICAgIGRhdGEgPSBncmlkRGF0YS5nZXQoJ2RhdGEnKS5zb3J0KChhLCBiKSA9PiB7XG4gICAgICBjb25zdCB2YWxBID0gdmFsdWVHZXR0ZXIoYSk7XG4gICAgICBjb25zdCB2YWxCID0gdmFsdWVHZXR0ZXIoYik7XG4gICAgICBpZiAoc29ydE9yZGVyID09PSAnYXNjJykge1xuICAgICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQSkpIHJldHVybiAtMTtcbiAgICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEIpKSByZXR1cm4gMTtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmF0b3IodmFsQSwgdmFsQik7XG4gICAgICB9XG4gICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQSkpIHJldHVybiAxO1xuICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEIpKSByZXR1cm4gLTE7XG4gICAgICByZXR1cm4gY29tcGFyYXRvcih2YWxCLCB2YWxBKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBkYXRhID0gYWxsRGF0YTtcbiAgfVxuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQVBQTFlfU09SVCxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBkYXRhLFxuICAgIGFsbERhdGEsXG4gIH0pO1xuICBzZXRSZWFkeShncmlkKShkaXNwYXRjaCk7XG4gIHJldHVybiB0cnVlO1xufTtcblxuZXhwb3J0IGNvbnN0IHNvcnRDaGFuZ2UgPSAoZ3JpZCwgY29sdW1ucywgY29sdW1uLCBuZXdTb3J0KSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBjb25zdCBzb3J0T3JkZXIgPSBuZXdTb3J0IHx8ICdhc2MnO1xuICBjb25zdCBzb3J0Q29sdW1uID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbHVtbik7XG4gIFV0aWxzLnNhdmVTb3J0RGF0YShncmlkLCB7IHNvcnRDb2x1bW4sIHNvcnRPcmRlciB9KTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NPUlRfQ0hBTkdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIHNvcnRDb2x1bW4sXG4gICAgc29ydE9yZGVyLFxuICB9KTtcbiAgYXBwbHlTb3J0KGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0RGF0YSA9IChncmlkLCBjb2x1bW5zLCBkYXRhKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBVdGlscy5jaGVja0NvbHVtbnNQYXJhbShjb2x1bW5zKTtcbiAgY29uc3QgY29uZmlnRGF0YSA9IFV0aWxzLmxvYWRHcmlkQ29uZmlnKGdyaWQsIGNvbHVtbnMpO1xuICBjb25zdCBpbW11dGFibGVEYXRhID0gSW1tdXRhYmxlLkl0ZXJhYmxlLmlzSXRlcmFibGUoZGF0YSkgPyBkYXRhIDogSW1tdXRhYmxlLmZyb21KUyhkYXRhKTtcbiAgY29uc3Qgc2VsZWN0ZWRJdGVtcyA9IFV0aWxzLmxvYWRTZWxlY3RlZEl0ZW1zKGdyaWQpLmZpbHRlcihpdGVtID0+IChcbiAgICAhIWltbXV0YWJsZURhdGEuZmluZChkYXRhSXRlbSA9PiBkYXRhSXRlbS5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGl0ZW0pXG4gICkpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX0RBVEEsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgZGF0YTogaW1tdXRhYmxlRGF0YSxcbiAgICBjb25maWc6IGNvbmZpZ0RhdGEsXG4gICAgc2VsZWN0ZWRJdGVtcyxcbiAgfSk7XG4gIGlmICghZ3JpZC5wYWdpbmF0aW9uKSB7XG4gICAgYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gICAgYXBwbHlTb3J0KGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZ3JpZERhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldChncmlkLmlkKTtcbiAgICBpZiAoIWdyaWREYXRhKSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3QgZmlsdGVyRGF0YSA9IGdyaWREYXRhLmdldEluKFsnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnZmlsdGVyRGF0YSddLCBNYXAoKSk7XG4gICAgaWYgKCFmaWx0ZXJEYXRhLmlzRW1wdHkoKSkge1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9BUFBMWV9GSUxURVJTLFxuICAgICAgICBpZDogZ3JpZC5pZCxcbiAgICAgICAgZGF0YSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCBzb3J0RGF0YSA9IGdyaWREYXRhLmdldEluKFsnY29uZmlnJywgJ3NvcnRpbmdEYXRhJ10pO1xuICAgIGlmIChzb3J0RGF0YSkge1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9BUFBMWV9TT1JULFxuICAgICAgICBpZDogZ3JpZC5pZCxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgYWxsRGF0YTogZGF0YSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8qKlxuICogQWN0aW9uIHRvIHNldCBmb2N1cyB0byBlaXRoZXIgbGFzdCBlZGl0ZWRSb3csIGNyZWF0ZWRSb3cgb3IgdG8gdmFsaWRhdGlvbiBlcnJvclxuICogQHBhcmFtIHtPYmplY3R9IGdyaWRcbiAqIEBwYXJhbSB7U3RyaW5nfSBmb2N1c1RvVHlwZSAtIHR5cGUgb2YgZm9jdXMgcmVxdWVzdC4gUG9zc2libGUgdmFsdWVzOlxuICogJ2ZvY3VzVG9FZGl0Q2VsbCcgfHwgJ2ZvY3VzVG9FcnJvckNlbGwnIHx8ICdmb2N1c1RvQ3JlYXRlQ2VsbCdcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gZm9jdXNUb0xhc3RSb3cgLSBzZXRzIGZvY3VzIHRvIGxhc3QgZGF0YSByb3cgaW5zdGVhZCBvZiBzZWxlY3RlZCByb3dcbiAqL1xuZXhwb3J0IGNvbnN0IHNldEZvY3VzVG8gPSAoZ3JpZCwgZm9jdXNUbywgZm9jdXNUb0xhc3RSb3cgPSBmYWxzZSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX0ZPQ1VTX1RPLFxuICAgIGZvY3VzVG8sXG4gICAgZm9jdXNUb0xhc3RSb3csXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGV4dGVuZERhdGEgPSAoZ3JpZCwgY29sdW1ucywgZGF0YSwgcHJlcGVuZCA9IGZhbHNlKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBjb25zdCBpbW11dGFibGVEYXRhID0gSW1tdXRhYmxlLkl0ZXJhYmxlLmlzSXRlcmFibGUoZGF0YSkgPyBkYXRhIDogSW1tdXRhYmxlLmZyb21KUyhkYXRhKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0VYVEVORF9EQVRBLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGRhdGE6IGltbXV0YWJsZURhdGEsXG4gICAgcHJlcGVuZCxcbiAgfSk7XG4gIGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICBhcHBseVNvcnQoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbn07XG5cbmV4cG9ydCBjb25zdCByZXNpemVDb2x1bW4gPSAoZ3JpZCwgY29sdW1uS2V5LCB3aWR0aCkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgY29uc3QgY29sdW1uV2lkdGhzID0gZ2V0U3RhdGUoKVxuICAgIC5kYXRhZ3JpZFxuICAgIC5nZXRJbihbZ3JpZC5pZCwgJ2NvbmZpZycsICdjb2x1bW5XaWR0aHMnXSwgTWFwKCkpXG4gICAgLnNldChjb2x1bW5LZXksIHdpZHRoKTtcbiAgVXRpbHMuc2F2ZUNvbHVtbldpZHRocyhncmlkLCBjb2x1bW5XaWR0aHMpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVTSVpFX0NPTFVNTixcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBjb2x1bW5XaWR0aHMsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGVkaXQgPSBncmlkID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0VESVQsXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGNhbmNlbCA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0FOQ0VMLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzYXZlID0gKGdyaWQsIGNiID0gKCkgPT4ge30pID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NBVkUsXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xuICBjYigpO1xufTtcblxuZXhwb3J0IGNvbnN0IHNhdmVTdWNjZXNzID0gKGdyaWQsIGNvbHVtbnMsIHNhdmVkSXRlbXMpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TQVZFX1NVQ0NFU1MsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgICBzYXZlZEl0ZW1zLFxuICB9KTtcbiAgYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gIGFwcGx5U29ydChncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xufTtcblxuZXhwb3J0IGNvbnN0IHNhdmVQYXJ0aWFsU3VjY2VzcyA9IChncmlkLCBjb2x1bW5zLCBzYXZlZEl0ZW1zKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0FWRV9QQVJUSUFMX1NVQ0NFU1MsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgICBzYXZlZEl0ZW1zLFxuICB9KTtcbiAgYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gIGFwcGx5U29ydChncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xufTtcblxuZXhwb3J0IGNvbnN0IHNhdmVGYWlsID0gZ3JpZCA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TQVZFX0ZBSUwsXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZSA9IChncmlkLCBjb2x1bW5EZWZhdWx0VmFsdWVzKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEUsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgY29sdW1uRGVmYXVsdFZhbHVlcyxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgYWRkTmV3SXRlbSA9IChncmlkLCBjb2x1bW5EZWZhdWx0VmFsdWVzKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9BRERfTkVXX0lURU0sXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgY29sdW1uRGVmYXVsdFZhbHVlcyxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlSXRlbSA9IChncmlkLCByb3dJZCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0lURU0sXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgICByb3dJZCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlTmV3SXRlbSA9IChncmlkLCBpbmRleCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGluZGV4LFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVOZXdJdGVtcyA9IChncmlkLCBpbmRleGVzKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU1TLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGluZGV4ZXMsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZSA9IChncmlkLCBjYiA9ICgpID0+IHt9KSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkUsXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xuICBjYigpO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZVN1Y2Nlc3MgPSAoZ3JpZCwgcmVtb3ZlZElkcykgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX1NVQ0NFU1MsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgICByZW1vdmVkSWRzLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVGYWlsID0gZ3JpZCA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfRkFJTCxcbiAgICBpZDogZ3JpZC5pZCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZWRpdENlbGxWYWx1ZUNoYW5nZSA9IChncmlkLCBkYXRhSWQsIGtleVBhdGgsIHZhbHVlKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9FRElUX0NFTExfVkFMVUVfQ0hBTkdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGRhdGFJZCxcbiAgICBrZXlQYXRoLFxuICAgIHZhbHVlLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBlZGl0Q2VsbFZhbHVlVmFsaWRhdGUgPSAoXG4gIGdyaWQsXG4gIGRhdGFJZCxcbiAga2V5UGF0aCxcbiAgdmFsdWUsXG4gIHZhbGlkYXRvcnMgPSBbXSxcbikgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgbGV0IHZhbGlkYXRpb25TdGF0ZSA9IHsgdmFsaWQ6IHRydWUgfTtcbiAgdmFsaWRhdG9ycy5mb3JFYWNoKCh2YWxpZGF0b3IpID0+IHtcbiAgICBpZiAodmFsaWRhdGlvblN0YXRlLnZhbGlkKSB7XG4gICAgICBpZiAodmFsaWRhdG9yLnVuaXF1ZSkge1xuICAgICAgICBpZiAodmFsdWUgIT09ICcnIHx8IHZhbHVlICE9PSBudWxsIHx8IHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAvLyBjb21iaW5lIHJlYWwgZGF0YSB3aXRoIGN1cnJlbnQgdW5zYXZlZCBlZGl0ZWQgZGF0YVxuICAgICAgICAgIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG4gICAgICAgICAgY29uc3QgZWRpdERhdGEgPSBncmlkRGF0YS5nZXQoJ2VkaXREYXRhJyk7XG4gICAgICAgICAgbGV0IGFsbERhdGEgPSBncmlkRGF0YS5nZXQoJ2FsbERhdGEnKTtcbiAgICAgICAgICBpZiAoZWRpdERhdGEpIHtcbiAgICAgICAgICAgIGVkaXREYXRhLmZvckVhY2goKGVkaXREYXRhSXRlbSwgZWRpdERhdGFJdGVtSWQpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgZm91bmRJbmRleCA9IGFsbERhdGEuZmluZEluZGV4KGQgPT4gZC5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGVkaXREYXRhSXRlbUlkKTtcbiAgICAgICAgICAgICAgaWYgKGZvdW5kSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgYWxsRGF0YSA9IGFsbERhdGEubWVyZ2VEZWVwSW4oW2ZvdW5kSW5kZXhdLCBlZGl0RGF0YUl0ZW0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gZGV0ZXJtaW5lIHVuaXF1ZW5lc3NcbiAgICAgICAgICBjb25zdCBmaW5kaW5nID0gYWxsRGF0YS5maW5kKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoZ3JpZC5pZEtleVBhdGgubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIC8vIGRvbid0IHNlbGYgY29tcGFyZVxuICAgICAgICAgICAgICBpZiAoaXRlbS5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGRhdGFJZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uZ2V0SW4oa2V5UGF0aCkgPT09IHZhbHVlO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChmaW5kaW5nKSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB7XG4gICAgICAgICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgICAgICAgICAgbWVzc2FnZTogJ1ZhbGlkYXRpb24uVW5pcXVlJyxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHZhbGlkYXRvci52YWxpZGF0ZVdpdGhSb3dEYXRhKSB7XG4gICAgICAgIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG4gICAgICAgIGNvbnN0IGVkaXREYXRhID0gZ3JpZERhdGEuZ2V0SW4oWydlZGl0RGF0YScsIGRhdGFJZF0sIE1hcCgpKTtcbiAgICAgICAgbGV0IHJvd0RhdGEgPSBncmlkRGF0YS5nZXQoJ2FsbERhdGEnKS5maW5kKGl0ZW0gPT4gaXRlbS5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGRhdGFJZCk7XG4gICAgICAgIGlmIChyb3dEYXRhKSB7XG4gICAgICAgICAgcm93RGF0YSA9IHJvd0RhdGEubWVyZ2VEZWVwKGVkaXREYXRhKTtcbiAgICAgICAgICBjb25zdCBwYXJhbXMgPSB2YWxpZGF0b3IucGFyYW1zID8gT2JqZWN0LnZhbHVlcyh2YWxpZGF0b3IucGFyYW1zKSA6IFtdO1xuICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZVdpdGhSb3dEYXRhKHZhbHVlLCByb3dEYXRhLCAuLi5wYXJhbXMpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSB2YWxpZGF0b3IucGFyYW1zID8gT2JqZWN0LnZhbHVlcyh2YWxpZGF0b3IucGFyYW1zKSA6IFtdO1xuICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB2YWxpZGF0b3IudmFsaWRhdGUodmFsdWUsIC4uLnBhcmFtcyk7XG4gICAgICAgIGlmICh2YWxpZGF0b3IucGFyYW1zKSB7XG4gICAgICAgICAgdmFsaWRhdGlvblN0YXRlLm1lc3NhZ2VWYWx1ZXMgPSB2YWxpZGF0b3IucGFyYW1zO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgaWYgKHZhbGlkYXRpb25TdGF0ZS52YWxpZCkge1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfSElERV9NRVNTQUdFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBtZXNzYWdlVHlwZTogJ2Vycm9yJyxcbiAgICAgIGRhdGFJZCxcbiAgICAgIGtleVBhdGgsXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIG1lc3NhZ2VUeXBlOiAnZXJyb3InLFxuICAgICAgZGF0YUlkLFxuICAgICAga2V5UGF0aCxcbiAgICAgIG1lc3NhZ2VJZDogdmFsaWRhdGlvblN0YXRlLm1lc3NhZ2UsXG4gICAgICBtZXNzYWdlVmFsdWVzOiB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZVZhbHVlcyxcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gdmFsaWRhdGlvblN0YXRlLnZhbGlkO1xufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSA9IChncmlkLCByb3dJbmRleCwga2V5UGF0aCwgdmFsdWUpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX0NIQU5HRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICByb3dJbmRleCxcbiAgICBrZXlQYXRoLFxuICAgIHZhbHVlLFxuICB9KTtcbn07XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG5leHBvcnQgY29uc3QgY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUgPSAoZ3JpZCwgcm93SW5kZXgsIGtleVBhdGgsIHZhbHVlLCB2YWxpZGF0b3JzID0gW10pID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGxldCB2YWxpZGF0aW9uU3RhdGUgPSB7IHZhbGlkOiB0cnVlIH07XG4gIHZhbGlkYXRvcnMuZm9yRWFjaCgodmFsaWRhdG9yKSA9PiB7XG4gICAgaWYgKHZhbGlkYXRpb25TdGF0ZS52YWxpZCkge1xuICAgICAgaWYgKHZhbGlkYXRvci51bmlxdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSAnJyB8fCB2YWx1ZSAhPT0gbnVsbCB8fCB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY29uc3QgZmluZGluZyA9IGdldFN0YXRlKClcbiAgICAgICAgICAgIC5kYXRhZ3JpZFxuICAgICAgICAgICAgLmdldEluKFtncmlkLmlkLCAnYWxsRGF0YSddKVxuICAgICAgICAgICAgLmZpbmQoaXRlbSA9PiBpdGVtLmdldEluKGtleVBhdGgpID09PSB2YWx1ZSk7XG4gICAgICAgICAgaWYgKGZpbmRpbmcpIHtcbiAgICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHtcbiAgICAgICAgICAgICAgdmFsaWQ6IGZhbHNlLFxuICAgICAgICAgICAgICBtZXNzYWdlOiAnVmFsaWRhdGlvbi5VbmlxdWUnLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZmluZDIgPSBnZXRTdGF0ZSgpXG4gICAgICAgICAgICAgIC5kYXRhZ3JpZFxuICAgICAgICAgICAgICAuZ2V0SW4oW2dyaWQuaWQsICdjcmVhdGVEYXRhJ10pXG4gICAgICAgICAgICAgIC5maW5kKChpdGVtLCBpKSA9PiBpICE9PSByb3dJbmRleCAmJiBpdGVtLmdldEluKGtleVBhdGgpID09PSB2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoZmluZDIpIHtcbiAgICAgICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0ge1xuICAgICAgICAgICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnVmFsaWRhdGlvbi5VbmlxdWUnLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh2YWxpZGF0b3IudmFsaWRhdGVXaXRoUm93RGF0YSkge1xuICAgICAgICBjb25zdCByb3dEYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ2NyZWF0ZURhdGEnLCByb3dJbmRleF0pO1xuICAgICAgICBjb25zdCBwYXJhbXMgPSB2YWxpZGF0b3IucGFyYW1zID8gT2JqZWN0LnZhbHVlcyh2YWxpZGF0b3IucGFyYW1zKSA6IFtdO1xuICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB2YWxpZGF0b3IudmFsaWRhdGVXaXRoUm93RGF0YSh2YWx1ZSwgcm93RGF0YSwgLi4ucGFyYW1zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHZhbGlkYXRvci5wYXJhbXMgPyBPYmplY3QudmFsdWVzKHZhbGlkYXRvci5wYXJhbXMpIDogW107XG4gICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZSh2YWx1ZSwgLi4ucGFyYW1zKTtcbiAgICAgICAgaWYgKHZhbGlkYXRvci5wYXJhbXMpIHtcbiAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZVZhbHVlcyA9IHZhbGlkYXRvci5wYXJhbXM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICBpZiAodmFsaWRhdGlvblN0YXRlLnZhbGlkKSB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfSElERV9NRVNTQUdFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBtZXNzYWdlVHlwZTogJ2Vycm9yJyxcbiAgICAgIHJvd0luZGV4LFxuICAgICAga2V5UGF0aCxcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9TSE9XX01FU1NBR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIG1lc3NhZ2VUeXBlOiAnZXJyb3InLFxuICAgICAgcm93SW5kZXgsXG4gICAgICBrZXlQYXRoLFxuICAgICAgbWVzc2FnZUlkOiB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZSxcbiAgICAgIG1lc3NhZ2VWYWx1ZXM6IHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlVmFsdWVzLFxuICAgIH0pO1xuICB9XG4gIHJldHVybiB2YWxpZGF0aW9uU3RhdGUudmFsaWQ7XG59O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuZXhwb3J0IGNvbnN0IGNlbGxTaG93TWVzc2FnZSA9IChncmlkLCBtZXNzYWdlVHlwZSwgZGF0YUlkLCBrZXlQYXRoLCBtZXNzYWdlSWQsIG1lc3NhZ2VWYWx1ZXMpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIG1lc3NhZ2VUeXBlLFxuICAgIGRhdGFJZCxcbiAgICBrZXlQYXRoLFxuICAgIG1lc3NhZ2VJZCxcbiAgICBtZXNzYWdlVmFsdWVzLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBjZWxsU2hvd01lc3NhZ2VzID0gKGdyaWQsIG1lc3NhZ2VzKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRVMsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgbWVzc2FnZXMsXG4gIH0pO1xufTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbmV4cG9ydCBjb25zdCBjZWxsSGlkZU1lc3NhZ2UgPSAoZ3JpZCwgbWVzc2FnZVR5cGUgPSBudWxsLCBkYXRhSWQgPSBudWxsLCBrZXlQYXRoID0gbnVsbCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0VMTF9ISURFX01FU1NBR0UsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgbWVzc2FnZVR5cGUsXG4gICAgZGF0YUlkLFxuICAgIGtleVBhdGgsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNlbGxTaG93TWVzc2FnZSA9IChcbiAgZ3JpZCxcbiAgbWVzc2FnZVR5cGUsXG4gIHJvd0luZGV4LFxuICBrZXlQYXRoLFxuICBtZXNzYWdlSWQsXG4gIG1lc3NhZ2VWYWx1ZXMsXG4pID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBtZXNzYWdlVHlwZSxcbiAgICByb3dJbmRleCxcbiAgICBrZXlQYXRoLFxuICAgIG1lc3NhZ2VJZCxcbiAgICBtZXNzYWdlVmFsdWVzLFxuICB9KTtcbn07XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG5leHBvcnQgY29uc3QgY3JlYXRlQ2VsbEhpZGVNZXNzYWdlID0gKGdyaWQsIG1lc3NhZ2VUeXBlID0gbnVsbCwgcm93SW5kZXggPSBudWxsLCBrZXlQYXRoID0gbnVsbCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfSElERV9NRVNTQUdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIG1lc3NhZ2VUeXBlLFxuICAgIHJvd0luZGV4LFxuICAgIGtleVBhdGgsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGNlbGxTZWxlY3Rpb25DaGFuZ2UgPSAoZ3JpZCwgc2VsZWN0ZWRDZWxsID0gbnVsbCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgc2VsZWN0ZWRDZWxsLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0VMRUNUSU9OX0NIQU5HRSxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgaXRlbVNlbGVjdGlvbkNoYW5nZSA9IChcbiAgZ3JpZCxcbiAgcm93SW5kZXgsXG4gIGN0cmxQcmVzc2VkID0gZmFsc2UsXG4gIHNoaWZ0UHJlc3NlZCA9IGZhbHNlLFxuKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIHJvd0luZGV4LFxuICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgY3RybFByZXNzZWQsXG4gICAgc2hpZnRQcmVzc2VkLFxuICB9KTtcbiAgVXRpbHMuc2F2ZVNlbGVjdGVkSXRlbXMoZ3JpZCwgZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ3NlbGVjdGVkSXRlbXMnXSkpO1xufTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdEFsbEl0ZW1zQ2hhbmdlID0gZ3JpZCA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0UsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgfSk7XG4gIFV0aWxzLnNhdmVTZWxlY3RlZEl0ZW1zKGdyaWQsIGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdzZWxlY3RlZEl0ZW1zJ10pKTtcbn07XG5cbmV4cG9ydCBjb25zdCBjbGVhclNlbGVjdGVkSXRlbXMgPSBncmlkID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DTEVBUl9TRUxFQ1RFRF9JVEVNUyxcbiAgICBpZDogZ3JpZC5pZCxcbiAgfSk7XG4gIFV0aWxzLnNhdmVTZWxlY3RlZEl0ZW1zKGdyaWQsIGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdzZWxlY3RlZEl0ZW1zJ10pKTtcbn07XG5cbmV4cG9ydCBjb25zdCB0b2dnbGVGaWx0ZXJpbmcgPSBncmlkID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGNvbnN0IGlzRmlsdGVyaW5nID0gIWdldFN0YXRlKClcbiAgICAuZGF0YWdyaWRcbiAgICAuZ2V0SW4oW2dyaWQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdpc0ZpbHRlcmluZyddLCBmYWxzZSk7XG4gIFV0aWxzLnNhdmVJc0ZpbHRlcmluZyhncmlkLCBpc0ZpbHRlcmluZyk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9UT0dHTEVfRklMVEVSSU5HLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGlzRmlsdGVyaW5nLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUVkaXRlZFJvd3MgPSAoZ3JpZCwgY29sdW1ucykgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgY29uc3QgZ3JpZERhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldChncmlkLmlkKTtcbiAgY29uc3QgZWRpdERhdGEgPSBncmlkRGF0YS5nZXQoJ2VkaXREYXRhJywgTWFwKCkpO1xuICBsZXQgYWxsR29vZCA9IHRydWU7XG4gIGVkaXREYXRhLmZvckVhY2goKGVkaXREYXRhUm93LCBkYXRhSWQpID0+IHtcbiAgICBjb2x1bW5zLmZvckVhY2goKGNvbCkgPT4ge1xuICAgICAgbGV0IHZhbHVlID0gZWRpdERhdGFSb3cuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG4gICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YWx1ZSA9IGdyaWREYXRhXG4gICAgICAgICAgLmdldCgnYWxsRGF0YScpXG4gICAgICAgICAgLmZpbmQoZGF0YSA9PiBkYXRhLmdldEluKGdyaWQuaWRLZXlQYXRoKSA9PT0gZGF0YUlkKVxuICAgICAgICAgIC5nZXRJbihjb2wudmFsdWVLZXlQYXRoKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGlzVmFsaWQgPSBlZGl0Q2VsbFZhbHVlVmFsaWRhdGUoXG4gICAgICAgIGdyaWQsXG4gICAgICAgIGRhdGFJZCxcbiAgICAgICAgY29sLnZhbHVlS2V5UGF0aCxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIGNvbC52YWxpZGF0b3JzLFxuICAgICAgKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICAgICAgaWYgKGFsbEdvb2QgJiYgIWlzVmFsaWQpIHtcbiAgICAgICAgYWxsR29vZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIGFsbEdvb2Q7XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlRW1wdHlDcmVhdGVkUm93cyA9IChncmlkLCBjb2x1bW5zKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBjb25zdCBjcmVhdGVEYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ2NyZWF0ZURhdGEnXSwgTWFwKCkpO1xuICBjb25zdCBpbmRleGVzID0gW107XG4gIGNyZWF0ZURhdGEuZm9yRWFjaCgoY3JlYXRlRGF0YVJvdywgcm93SW5kZXgpID0+IHtcbiAgICBsZXQgaXNFbXB0eSA9IHRydWU7XG4gICAgY29sdW1ucy5mb3JFYWNoKChjb2wpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gY3JlYXRlRGF0YVJvdy5nZXRJbihjb2wudmFsdWVLZXlQYXRoKTtcbiAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSAnJyAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICBpc0VtcHR5ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGlzRW1wdHkpIHtcbiAgICAgIGluZGV4ZXMucHVzaChyb3dJbmRleCk7XG4gICAgfVxuICB9KTtcbiAgaWYgKGluZGV4ZXMubGVuZ3RoID4gMCkge1xuICAgIHJlbW92ZU5ld0l0ZW1zKGdyaWQsIGluZGV4ZXMpKGRpc3BhdGNoKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHZhbGlkYXRlQ3JlYXRlZFJvd3MgPSAoZ3JpZCwgY29sdW1ucykgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgcmVtb3ZlRW1wdHlDcmVhdGVkUm93cyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICBjb25zdCBjcmVhdGVEYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ2NyZWF0ZURhdGEnXSwgTWFwKCkpO1xuICBsZXQgYWxsR29vZCA9IHRydWU7XG4gIGNyZWF0ZURhdGEuZm9yRWFjaCgoY3JlYXRlRGF0YVJvdywgcm93SW5kZXgpID0+IHtcbiAgICBjb2x1bW5zLmZvckVhY2goKGNvbCkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSBjcmVhdGVEYXRhUm93LmdldEluKGNvbC52YWx1ZUtleVBhdGgpO1xuICAgICAgY29uc3QgaXNWYWxpZCA9IGNyZWF0ZUNlbGxWYWx1ZVZhbGlkYXRlKFxuICAgICAgICBncmlkLFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgY29sLnZhbHVlS2V5UGF0aCxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIGNvbC52YWxpZGF0b3JzLFxuICAgICAgKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICAgICAgaWYgKGFsbEdvb2QgJiYgIWlzVmFsaWQpIHtcbiAgICAgICAgYWxsR29vZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIGFsbEdvb2Q7XG59O1xuXG5leHBvcnQgY29uc3QgdXBkYXRlRXhpc3RpbmdDZWxsVmFsdWUgPSAoZ3JpZCwgZGF0YUlkLCBrZXlQYXRoLCB2YWx1ZSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfVVBEQVRFX0VYSVNUSU5HX0NFTExfVkFMVUUsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgZGF0YUlkLFxuICAgIGtleVBhdGgsXG4gICAgdmFsdWUsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldEVkaXREYXRhID0gKGdyaWQsIGRhdGEsIGNlbGxNZXNzYWdlcyA9IE1hcCgpKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICBkYXRhLFxuICAgIGNlbGxNZXNzYWdlcyxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfRURJVF9EQVRBLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBvcGVuQ29sdW1uU2V0dGluZ3NNb2RhbCA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX09QRU4sXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbCA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX0NMT1NFLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzYXZlQ29sdW1uU2V0dGluZ3MgPSAoZ3JpZCwgaGlkZGVuQ29sdW1ucywgY29sdW1uT3JkZXIpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgVXRpbHMuc2F2ZUNvbHVtblNldHRpbmdzKGdyaWQsIGhpZGRlbkNvbHVtbnMsIGNvbHVtbk9yZGVyKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGNvbHVtbk9yZGVyLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXRQYWdpbmF0aW9uUGFnZSA9IChncmlkLCBwYWdpbmF0aW9uUGFnZSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLnNhdmVQYWdpbmF0aW9uUGFnZShncmlkLCB7IHBhZ2U6IHBhZ2luYXRpb25QYWdlIH0pO1xuICBkaXNwYXRjaCh7XG4gICAgcGFnaW5hdGlvblBhZ2UsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX1BBR0lOQVRJT05fUEFHRSxcbiAgfSk7XG59O1xuIl19