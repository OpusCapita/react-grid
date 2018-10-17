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
  PLATFORM_DATAGRID_SET_FOCUS_TO: 'PLATFORM_DATAGRID_SET_FOCUS_TO'
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
    if (filterData.isEmpty()) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5hY3Rpb25zLmpzIl0sIm5hbWVzIjpbIkltbXV0YWJsZSIsIk1hcCIsIlV0aWxzIiwiVFlQRVMiLCJQTEFURk9STV9EQVRBR1JJRF9JTlZBTElEQVRFIiwiUExBVEZPUk1fREFUQUdSSURfQlVTWSIsIlBMQVRGT1JNX0RBVEFHUklEX1JFQURZIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX0RBVEEiLCJQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9TT1JUIiwiUExBVEZPUk1fREFUQUdSSURfU09SVF9DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9SRVNJWkVfQ09MVU1OIiwiUExBVEZPUk1fREFUQUdSSURfRURJVCIsIlBMQVRGT1JNX0RBVEFHUklEX0NBTkNFTCIsIlBMQVRGT1JNX0RBVEFHUklEX1NBVkUiLCJQTEFURk9STV9EQVRBR1JJRF9FWFRFTkRfREFUQSIsIlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfU1VDQ0VTUyIsIlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfUEFSVElBTF9TVUNDRVNTIiwiUExBVEZPUk1fREFUQUdSSURfU0FWRV9GQUlMIiwiUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFIiwiUExBVEZPUk1fREFUQUdSSURfQUREX05FV19JVEVNIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0lURU0iLCJQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU0iLCJQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU1TIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX1NVQ0NFU1MiLCJQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfRkFJTCIsIlBMQVRGT1JNX0RBVEFHUklEX0VESVRfQ0VMTF9WQUxVRV9DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFUyIsIlBMQVRGT1JNX0RBVEFHUklEX0NFTExfSElERV9NRVNTQUdFIiwiUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfU0hPV19NRVNTQUdFIiwiUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfSElERV9NRVNTQUdFIiwiUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfVkFMSURBVEUiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NFTEVDVElPTl9DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9JVEVNX1NFTEVDVElPTl9DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9TRUxFQ1RfQUxMX0lURU1TX0NIQU5HRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NMRUFSX1NFTEVDVEVEX0lURU1TIiwiUExBVEZPUk1fREFUQUdSSURfVE9HR0xFX0ZJTFRFUklORyIsIlBMQVRGT1JNX0RBVEFHUklEX0ZJTFRFUl9EQVRBX0NIQU5HRSIsIlBMQVRGT1JNX0RBVEFHUklEX0FQUExZX0ZJTFRFUlMiLCJQTEFURk9STV9EQVRBR1JJRF9TRVRfRklMVEVSUyIsIlBMQVRGT1JNX0RBVEFHUklEX1VQREFURV9FWElTVElOR19DRUxMX1ZBTFVFIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX0VESVRfREFUQSIsIlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9PUEVOIiwiUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX0NMT1NFIiwiUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX1NBVkUiLCJQTEFURk9STV9EQVRBR1JJRF9GT1JDRV9SRUZSRVNIIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX0ZPQ1VTX1RPIiwiaW52YWxpZGF0ZSIsImRpc3BhdGNoIiwiY2hlY2tHcmlkUGFyYW0iLCJncmlkIiwidHlwZSIsImlkIiwiZm9yY2VSZWZyZXNoIiwic2V0VGltZW91dCIsImRvY3VtZW50IiwiY3JlYXRlRXZlbnQiLCJldnQiLCJpbml0RXZlbnQiLCJ3aW5kb3ciLCJkaXNwYXRjaEV2ZW50Iiwic2V0QnVzeSIsInNldFJlYWR5IiwiYXBwbHlGaWx0ZXJzIiwiY29sdW1ucyIsImdldFN0YXRlIiwiZm9yRWFjaCIsImdyaWREYXRhIiwiZGF0YWdyaWQiLCJnZXQiLCJmaWx0ZXJEYXRhIiwiZ2V0SW4iLCJhbGxEYXRhIiwiZGF0YSIsImlzRW1wdHkiLCJkYXRlRm9ybWF0IiwiZ2V0RGF0ZUZvcm1hdCIsInVzZXIiLCJmaWx0ZXIiLCJyb3ciLCJoaXRzIiwiZmlsdGVyVmFsdWUiLCJmaWx0ZXJDb2x1bW4iLCJjb2x1bW4iLCJnZXRDb2x1bW5LZXkiLCJ2YWx1ZSIsInZhbHVlS2V5UGF0aCIsImZpbHRlck1hdGNoZXIiLCJnZXRGaWx0ZXJNYXRjaGVyIiwic2l6ZSIsInNldEFuZEFwcGx5RmlsdGVycyIsImZpbHRlcmluZ0RhdGEiLCJub3JtYWxpemVGaWx0ZXJpbmdEYXRhIiwiZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlIiwib3JpZ0ZpbHRlckRhdGEiLCJjb2x1bW5LZXkiLCJ2YWx1ZUVtcHR5Q2hlY2tlciIsImdldFZhbHVlRW1wdHlDaGVja2VyIiwiZGVsZXRlIiwic2V0Iiwic2F2ZUZpbHRlckRhdGEiLCJhcHBseVNvcnQiLCJzb3J0RGF0YSIsInNvcnRDb2x1bW4iLCJzb3J0T3JkZXIiLCJjb2wiLCJvcmlnQWxsRGF0YSIsImNvbXBhcmF0b3IiLCJnZXRTb3J0Q29tcGFyYXRvciIsInZhbHVlR2V0dGVyIiwiZ2V0U29ydFZhbHVlR2V0dGVyIiwic29ydCIsImEiLCJiIiwidmFsQSIsInZhbEIiLCJzb3J0Q2hhbmdlIiwibmV3U29ydCIsInNhdmVTb3J0RGF0YSIsInNldERhdGEiLCJjaGVja0NvbHVtbnNQYXJhbSIsImNvbmZpZ0RhdGEiLCJsb2FkR3JpZENvbmZpZyIsImltbXV0YWJsZURhdGEiLCJJdGVyYWJsZSIsImlzSXRlcmFibGUiLCJmcm9tSlMiLCJzZWxlY3RlZEl0ZW1zIiwibG9hZFNlbGVjdGVkSXRlbXMiLCJmaW5kIiwiZGF0YUl0ZW0iLCJpZEtleVBhdGgiLCJpdGVtIiwiY29uZmlnIiwic2V0Rm9jdXNUbyIsImZvY3VzVG8iLCJmb2N1c1RvTGFzdFJvdyIsImV4dGVuZERhdGEiLCJwcmVwZW5kIiwicmVzaXplQ29sdW1uIiwid2lkdGgiLCJjb2x1bW5XaWR0aHMiLCJzYXZlQ29sdW1uV2lkdGhzIiwiZWRpdCIsImNhbmNlbCIsInNhdmUiLCJjYiIsInNhdmVTdWNjZXNzIiwic2F2ZWRJdGVtcyIsInNhdmVQYXJ0aWFsU3VjY2VzcyIsInNhdmVGYWlsIiwiY3JlYXRlIiwiY29sdW1uRGVmYXVsdFZhbHVlcyIsImFkZE5ld0l0ZW0iLCJyZW1vdmVJdGVtIiwicm93SWQiLCJyZW1vdmVOZXdJdGVtIiwiaW5kZXgiLCJyZW1vdmVOZXdJdGVtcyIsImluZGV4ZXMiLCJyZW1vdmUiLCJyZW1vdmVTdWNjZXNzIiwicmVtb3ZlZElkcyIsInJlbW92ZUZhaWwiLCJlZGl0Q2VsbFZhbHVlQ2hhbmdlIiwiZGF0YUlkIiwia2V5UGF0aCIsImVkaXRDZWxsVmFsdWVWYWxpZGF0ZSIsInZhbGlkYXRvcnMiLCJ2YWxpZGF0aW9uU3RhdGUiLCJ2YWxpZCIsInZhbGlkYXRvciIsInVuaXF1ZSIsInVuZGVmaW5lZCIsImVkaXREYXRhIiwiZWRpdERhdGFJdGVtIiwiZWRpdERhdGFJdGVtSWQiLCJmb3VuZEluZGV4IiwiZmluZEluZGV4IiwiZCIsIm1lcmdlRGVlcEluIiwiZmluZGluZyIsImxlbmd0aCIsIm1lc3NhZ2UiLCJ2YWxpZGF0ZVdpdGhSb3dEYXRhIiwicm93RGF0YSIsIm1lcmdlRGVlcCIsInBhcmFtcyIsIk9iamVjdCIsInZhbHVlcyIsInZhbGlkYXRlIiwibWVzc2FnZVZhbHVlcyIsIm1lc3NhZ2VUeXBlIiwibWVzc2FnZUlkIiwiY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlIiwicm93SW5kZXgiLCJjcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZSIsImZpbmQyIiwiaSIsImNlbGxTaG93TWVzc2FnZSIsImNlbGxTaG93TWVzc2FnZXMiLCJtZXNzYWdlcyIsImNlbGxIaWRlTWVzc2FnZSIsImNyZWF0ZUNlbGxTaG93TWVzc2FnZSIsImNyZWF0ZUNlbGxIaWRlTWVzc2FnZSIsImNlbGxTZWxlY3Rpb25DaGFuZ2UiLCJzZWxlY3RlZENlbGwiLCJpdGVtU2VsZWN0aW9uQ2hhbmdlIiwiY3RybFByZXNzZWQiLCJzaGlmdFByZXNzZWQiLCJzYXZlU2VsZWN0ZWRJdGVtcyIsInNlbGVjdEFsbEl0ZW1zQ2hhbmdlIiwiY2xlYXJTZWxlY3RlZEl0ZW1zIiwidG9nZ2xlRmlsdGVyaW5nIiwiaXNGaWx0ZXJpbmciLCJzYXZlSXNGaWx0ZXJpbmciLCJ2YWxpZGF0ZUVkaXRlZFJvd3MiLCJhbGxHb29kIiwiZWRpdERhdGFSb3ciLCJpc1ZhbGlkIiwicmVtb3ZlRW1wdHlDcmVhdGVkUm93cyIsImNyZWF0ZURhdGEiLCJjcmVhdGVEYXRhUm93IiwicHVzaCIsInZhbGlkYXRlQ3JlYXRlZFJvd3MiLCJ1cGRhdGVFeGlzdGluZ0NlbGxWYWx1ZSIsInNldEVkaXREYXRhIiwiY2VsbE1lc3NhZ2VzIiwib3BlbkNvbHVtblNldHRpbmdzTW9kYWwiLCJjbG9zZUNvbHVtblNldHRpbmdzTW9kYWwiLCJzYXZlQ29sdW1uU2V0dGluZ3MiLCJoaWRkZW5Db2x1bW5zIiwiY29sdW1uT3JkZXIiXSwibWFwcGluZ3MiOiJBQUFBLE9BQU9BLFNBQVAsSUFBb0JDLEdBQXBCLFFBQStCLFdBQS9CO0FBQ0EsT0FBT0MsS0FBUCxNQUFrQixrQkFBbEI7O0FBRUEsT0FBTyxJQUFNQyxRQUFRO0FBQ25CQyxnQ0FBOEIsOEJBRFg7QUFFbkJDLDBCQUF3Qix3QkFGTDtBQUduQkMsMkJBQXlCLHlCQUhOO0FBSW5CQyw4QkFBNEIsNEJBSlQ7QUFLbkJDLGdDQUE4Qiw4QkFMWDtBQU1uQkMsaUNBQStCLCtCQU5aO0FBT25CQyxtQ0FBaUMsaUNBUGQ7QUFRbkJDLDBCQUF3Qix3QkFSTDtBQVNuQkMsNEJBQTBC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LENBQUNwTCxJQUFELEVBQU9xTCxhQUFQLEVBQXNCQyxXQUF0QjtBQUFBLFNBQ2hDLFVBQUN4TCxRQUFELEVBQWM7QUFDWmhELFVBQU1pRCxjQUFOLENBQXFCQyxJQUFyQjtBQUNBbEQsVUFBTXNPLGtCQUFOLENBQXlCcEwsSUFBekIsRUFBK0JxTCxhQUEvQixFQUE4Q0MsV0FBOUM7QUFDQXhMLGFBQVM7QUFDUEcsWUFBTWxELE1BQU0yQyxzQ0FETDtBQUVQUSxVQUFJRixLQUFLRSxFQUZGO0FBR1BvTDtBQUhPLEtBQVQ7QUFLRCxHQVQrQjtBQUFBLENBQTNCIiwiZmlsZSI6ImRhdGFncmlkLmFjdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSW1tdXRhYmxlLCB7IE1hcCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9kYXRhZ3JpZC51dGlscyc7XG5cbmV4cG9ydCBjb25zdCBUWVBFUyA9IHtcbiAgUExBVEZPUk1fREFUQUdSSURfSU5WQUxJREFURTogJ1BMQVRGT1JNX0RBVEFHUklEX0lOVkFMSURBVEUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9CVVNZOiAnUExBVEZPUk1fREFUQUdSSURfQlVTWScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFQURZOiAnUExBVEZPUk1fREFUQUdSSURfUkVBRFknLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRVRfREFUQTogJ1BMQVRGT1JNX0RBVEFHUklEX1NFVF9EQVRBJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQVBQTFlfU09SVDogJ1BMQVRGT1JNX0RBVEFHUklEX0FQUExZX1NPUlQnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TT1JUX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX1NPUlRfQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVTSVpFX0NPTFVNTjogJ1BMQVRGT1JNX0RBVEFHUklEX1JFU0laRV9DT0xVTU4nLFxuICBQTEFURk9STV9EQVRBR1JJRF9FRElUOiAnUExBVEZPUk1fREFUQUdSSURfRURJVCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NBTkNFTDogJ1BMQVRGT1JNX0RBVEFHUklEX0NBTkNFTCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NBVkU6ICdQTEFURk9STV9EQVRBR1JJRF9TQVZFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfRVhURU5EX0RBVEE6ICdQTEFURk9STV9EQVRBR1JJRF9FWFRFTkRfREFUQScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NBVkVfU1VDQ0VTUzogJ1BMQVRGT1JNX0RBVEFHUklEX1NBVkVfU1VDQ0VTUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NBVkVfUEFSVElBTF9TVUNDRVNTOiAnUExBVEZPUk1fREFUQUdSSURfU0FWRV9QQVJUSUFMX1NVQ0NFU1MnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TQVZFX0ZBSUw6ICdQTEFURk9STV9EQVRBR1JJRF9TQVZFX0ZBSUwnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEU6ICdQTEFURk9STV9EQVRBR1JJRF9DUkVBVEUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9BRERfTkVXX0lURU06ICdQTEFURk9STV9EQVRBR1JJRF9BRERfTkVXX0lURU0nLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfSVRFTTogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9JVEVNJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNOiAnUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNUzogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTVMnLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkU6ICdQTEFURk9STV9EQVRBR1JJRF9SRU1PVkUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfU1VDQ0VTUzogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9TVUNDRVNTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUw6ICdQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfRkFJTCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0VESVRfQ0VMTF9WQUxVRV9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9FRElUX0NFTExfVkFMVUVfQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFUzogJ1BMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NFTExfSElERV9NRVNTQUdFOiAnUExBVEZPUk1fREFUQUdSSURfQ0VMTF9ISURFX01FU1NBR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9TSE9XX01FU1NBR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9TSE9XX01FU1NBR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9ISURFX01FU1NBR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9ISURFX01FU1NBR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9WQUxJREFURTogJ1BMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX1ZBTElEQVRFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TRUxFQ1RJT05fQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TRUxFQ1RJT05fQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9TRUxFQ1RfQUxMX0lURU1TX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NMRUFSX1NFTEVDVEVEX0lURU1TOiAnUExBVEZPUk1fREFUQUdSSURfQ0xFQVJfU0VMRUNURURfSVRFTVMnLFxuICBQTEFURk9STV9EQVRBR1JJRF9UT0dHTEVfRklMVEVSSU5HOiAnUExBVEZPUk1fREFUQUdSSURfVE9HR0xFX0ZJTFRFUklORycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0ZJTFRFUl9EQVRBX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX0ZJTFRFUl9EQVRBX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0FQUExZX0ZJTFRFUlM6ICdQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9GSUxURVJTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0VUX0ZJTFRFUlM6ICdQTEFURk9STV9EQVRBR1JJRF9TRVRfRklMVEVSUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1VQREFURV9FWElTVElOR19DRUxMX1ZBTFVFOiAnUExBVEZPUk1fREFUQUdSSURfVVBEQVRFX0VYSVNUSU5HX0NFTExfVkFMVUUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRVRfRURJVF9EQVRBOiAnUExBVEZPUk1fREFUQUdSSURfU0VUX0VESVRfREFUQScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9PUEVOOiAnUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX09QRU4nLFxuICBQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfQ0xPU0U6ICdQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfQ0xPU0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfU0FWRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfRk9SQ0VfUkVGUkVTSDogJ1BMQVRGT1JNX0RBVEFHUklEX0ZPUkNFX1JFRlJFU0gnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRVRfRk9DVVNfVE86ICdQTEFURk9STV9EQVRBR1JJRF9TRVRfRk9DVVNfVE8nLFxufTtcblxuZXhwb3J0IGNvbnN0IGludmFsaWRhdGUgPSBncmlkID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0lOVkFMSURBVEUsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGZvcmNlUmVmcmVzaCA9ICgpID0+IChkaXNwYXRjaCkgPT4ge1xuICAvLyBGaXJlIHJlc2l6ZSBldmVudCB0byByZWNhbGN1bGF0ZSBjb21wb25lbnQgc2l6ZXNcbiAgLy8gYW5kIHRvIGZvcmNlIHJlZHJhdyB0aGUgZ3JpZFxuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBpZiAoZG9jdW1lbnQuY3JlYXRlRXZlbnQpIHtcbiAgICAgIGNvbnN0IGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdIVE1MRXZlbnRzJyk7XG4gICAgICBldnQuaW5pdEV2ZW50KCdyZXNpemUnLCB0cnVlLCBmYWxzZSk7XG4gICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChldnQpO1xuICAgIH1cbiAgfSwgMSk7XG4gIGRpc3BhdGNoKHsgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfRk9SQ0VfUkVGUkVTSCB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXRCdXN5ID0gZ3JpZCA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9CVVNZLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBzZXRSZWFkeSA9IGdyaWQgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVBRFksXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGFwcGx5RmlsdGVycyA9IChncmlkLCBjb2x1bW5zKSA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgaWYgKCFjb2x1bW5zIHx8ICFjb2x1bW5zLmZvckVhY2gpIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBncmlkRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0KGdyaWQuaWQpO1xuICAgIGlmICghZ3JpZERhdGEpIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBmaWx0ZXJEYXRhID0gZ3JpZERhdGEuZ2V0SW4oWydjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdmaWx0ZXJEYXRhJ10sIE1hcCgpKTtcbiAgICBjb25zdCBhbGxEYXRhID0gZ3JpZERhdGEuZ2V0KCdhbGxEYXRhJyk7XG4gICAgc2V0QnVzeShncmlkKShkaXNwYXRjaCk7XG4gICAgbGV0IGRhdGE7XG4gICAgaWYgKGZpbHRlckRhdGEuaXNFbXB0eSgpKSB7XG4gICAgICBkYXRhID0gYWxsRGF0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGF0ZUZvcm1hdCA9IFV0aWxzLmdldERhdGVGb3JtYXQoZ3JpZCwgZ2V0U3RhdGUoKS51c2VyKTtcbiAgICAgIGRhdGEgPSBhbGxEYXRhLmZpbHRlcigocm93KSA9PiB7XG4gICAgICAgIGxldCBoaXRzID0gMDtcbiAgICAgICAgZmlsdGVyRGF0YS5mb3JFYWNoKChmaWx0ZXJWYWx1ZSwgZmlsdGVyQ29sdW1uKSA9PiB7XG4gICAgICAgICAgY29sdW1ucy5mb3JFYWNoKChjb2x1bW4pID0+IHtcbiAgICAgICAgICAgIGlmIChVdGlscy5nZXRDb2x1bW5LZXkoY29sdW1uKSA9PT0gZmlsdGVyQ29sdW1uKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gcm93LmdldEluKGNvbHVtbi52YWx1ZUtleVBhdGgpO1xuICAgICAgICAgICAgICBpZiAodmFsdWUgfHwgdmFsdWUgPT09IDAgfHwgdmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyTWF0Y2hlciA9IFV0aWxzLmdldEZpbHRlck1hdGNoZXIoY29sdW1uLCBkYXRlRm9ybWF0KTtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyTWF0Y2hlcihyb3csIGZpbHRlclZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgaGl0cyArPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGhpdHMgPT09IGZpbHRlckRhdGEuc2l6ZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9BUFBMWV9GSUxURVJTLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBkYXRhLFxuICAgIH0pO1xuICAgIHNldFJlYWR5KGdyaWQpKGRpc3BhdGNoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHNldEFuZEFwcGx5RmlsdGVycyA9IChncmlkLCBjb2x1bW5zLCBmaWx0ZXJpbmdEYXRhKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfRklMVEVSUyxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgZmlsdGVyaW5nRGF0YTogVXRpbHMubm9ybWFsaXplRmlsdGVyaW5nRGF0YShmaWx0ZXJpbmdEYXRhKSxcbiAgICB9KTtcbiAgICBkaXNwYXRjaChhcHBseUZpbHRlcnMoZ3JpZCwgY29sdW1ucykpO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG5leHBvcnQgY29uc3QgZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlID0gKGdyaWQsIGNvbHVtbnMsIGNvbHVtbiwgdmFsdWUpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBjb25zdCBvcmlnRmlsdGVyRGF0YSA9IGdldFN0YXRlKClcbiAgICAgIC5kYXRhZ3JpZFxuICAgICAgLmdldEluKFtncmlkLmlkLCAnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnZmlsdGVyRGF0YSddLCBNYXAoKSk7XG4gICAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbHVtbik7XG4gICAgY29uc3QgdmFsdWVFbXB0eUNoZWNrZXIgPSBVdGlscy5nZXRWYWx1ZUVtcHR5Q2hlY2tlcihjb2x1bW4pO1xuICAgIGxldCBmaWx0ZXJEYXRhO1xuICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWx1ZSkpIHtcbiAgICAgIGZpbHRlckRhdGEgPSBvcmlnRmlsdGVyRGF0YS5kZWxldGUoY29sdW1uS2V5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmlsdGVyRGF0YSA9IG9yaWdGaWx0ZXJEYXRhLnNldChjb2x1bW5LZXksIHZhbHVlKTtcbiAgICB9XG4gICAgVXRpbHMuc2F2ZUZpbHRlckRhdGEoZ3JpZCwgZmlsdGVyRGF0YSk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfRklMVEVSX0RBVEFfQ0hBTkdFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBmaWx0ZXJEYXRhLFxuICAgIH0pO1xuICAgIGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICB9O1xuXG5leHBvcnQgY29uc3QgYXBwbHlTb3J0ID0gKGdyaWQsIGNvbHVtbnMpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBpZiAoIWNvbHVtbnMgfHwgIWNvbHVtbnMuZm9yRWFjaCkgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG4gICAgaWYgKCFncmlkRGF0YSkgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IHNvcnREYXRhID0gZ3JpZERhdGEuZ2V0SW4oWydjb25maWcnLCAnc29ydGluZ0RhdGEnXSk7XG4gICAgaWYgKCFzb3J0RGF0YSkgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IHNvcnRDb2x1bW4gPSBzb3J0RGF0YS5nZXQoJ3NvcnRDb2x1bW4nKTtcbiAgICBpZiAoIXNvcnRDb2x1bW4pIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBzb3J0T3JkZXIgPSBzb3J0RGF0YS5nZXQoJ3NvcnRPcmRlcicsICdhc2MnKTtcbiAgICBsZXQgY29sdW1uO1xuICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICBpZiAoVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCkgPT09IHNvcnRDb2x1bW4pIHtcbiAgICAgICAgY29sdW1uID0gY29sO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICghY29sdW1uKSByZXR1cm4gZmFsc2U7XG5cbiAgICBzZXRCdXN5KGdyaWQpKGRpc3BhdGNoKTtcbiAgICBjb25zdCBvcmlnQWxsRGF0YSA9IGdyaWREYXRhLmdldCgnYWxsRGF0YScpO1xuICAgIGNvbnN0IGNvbXBhcmF0b3IgPSBVdGlscy5nZXRTb3J0Q29tcGFyYXRvcihjb2x1bW4pO1xuICAgIGNvbnN0IHZhbHVlR2V0dGVyID0gVXRpbHMuZ2V0U29ydFZhbHVlR2V0dGVyKGNvbHVtbik7XG4gICAgY29uc3QgdmFsdWVFbXB0eUNoZWNrZXIgPSBVdGlscy5nZXRWYWx1ZUVtcHR5Q2hlY2tlcihjb2x1bW4pO1xuICAgIGNvbnN0IGFsbERhdGEgPSBvcmlnQWxsRGF0YS5zb3J0KChhLCBiKSA9PiB7XG4gICAgICBjb25zdCB2YWxBID0gdmFsdWVHZXR0ZXIoYSk7XG4gICAgICBjb25zdCB2YWxCID0gdmFsdWVHZXR0ZXIoYik7XG4gICAgICBpZiAoc29ydE9yZGVyID09PSAnYXNjJykge1xuICAgICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQSkpIHJldHVybiAtMTtcbiAgICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEIpKSByZXR1cm4gMTtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmF0b3IodmFsQSwgdmFsQik7XG4gICAgICB9XG4gICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQSkpIHJldHVybiAxO1xuICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEIpKSByZXR1cm4gLTE7XG4gICAgICByZXR1cm4gY29tcGFyYXRvcih2YWxCLCB2YWxBKTtcbiAgICB9KTtcbiAgICBsZXQgZGF0YTtcbiAgICAvLyBTb3J0IGFsc28gZmlsdGVyZWQgZGF0YSBzZXBhcmF0ZWx5XG4gICAgaWYgKGdyaWREYXRhLmdldEluKFsnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnaXNGaWx0ZXJpbmcnXSwgZmFsc2UpKSB7XG4gICAgICBkYXRhID0gZ3JpZERhdGEuZ2V0KCdkYXRhJykuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICBjb25zdCB2YWxBID0gdmFsdWVHZXR0ZXIoYSk7XG4gICAgICAgIGNvbnN0IHZhbEIgPSB2YWx1ZUdldHRlcihiKTtcbiAgICAgICAgaWYgKHNvcnRPcmRlciA9PT0gJ2FzYycpIHtcbiAgICAgICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQSkpIHJldHVybiAtMTtcbiAgICAgICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQikpIHJldHVybiAxO1xuICAgICAgICAgIHJldHVybiBjb21wYXJhdG9yKHZhbEEsIHZhbEIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxBKSkgcmV0dXJuIDE7XG4gICAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxCKSkgcmV0dXJuIC0xO1xuICAgICAgICByZXR1cm4gY29tcGFyYXRvcih2YWxCLCB2YWxBKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXRhID0gYWxsRGF0YTtcbiAgICB9XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQVBQTFlfU09SVCxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgZGF0YSxcbiAgICAgIGFsbERhdGEsXG4gICAgfSk7XG4gICAgc2V0UmVhZHkoZ3JpZCkoZGlzcGF0Y2gpO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG5leHBvcnQgY29uc3Qgc29ydENoYW5nZSA9IChncmlkLCBjb2x1bW5zLCBjb2x1bW4sIG5ld1NvcnQpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBjb25zdCBzb3J0T3JkZXIgPSBuZXdTb3J0IHx8ICdhc2MnO1xuICAgIGNvbnN0IHNvcnRDb2x1bW4gPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sdW1uKTtcbiAgICBVdGlscy5zYXZlU29ydERhdGEoZ3JpZCwgeyBzb3J0Q29sdW1uLCBzb3J0T3JkZXIgfSk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU09SVF9DSEFOR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIHNvcnRDb2x1bW4sXG4gICAgICBzb3J0T3JkZXIsXG4gICAgfSk7XG4gICAgYXBwbHlTb3J0KGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBzZXREYXRhID0gKGdyaWQsIGNvbHVtbnMsIGRhdGEpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBVdGlscy5jaGVja0NvbHVtbnNQYXJhbShjb2x1bW5zKTtcbiAgICBjb25zdCBjb25maWdEYXRhID0gVXRpbHMubG9hZEdyaWRDb25maWcoZ3JpZCwgY29sdW1ucyk7XG4gICAgY29uc3QgaW1tdXRhYmxlRGF0YSA9IEltbXV0YWJsZS5JdGVyYWJsZS5pc0l0ZXJhYmxlKGRhdGEpID8gZGF0YSA6IEltbXV0YWJsZS5mcm9tSlMoZGF0YSk7XG4gICAgY29uc3Qgc2VsZWN0ZWRJdGVtcyA9IFV0aWxzLmxvYWRTZWxlY3RlZEl0ZW1zKGdyaWQpLmZpbHRlcihpdGVtID0+IChcbiAgICAgICEhaW1tdXRhYmxlRGF0YS5maW5kKGRhdGFJdGVtID0+IGRhdGFJdGVtLmdldEluKGdyaWQuaWRLZXlQYXRoKSA9PT0gaXRlbSlcbiAgICApKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfREFUQSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgZGF0YTogaW1tdXRhYmxlRGF0YSxcbiAgICAgIGNvbmZpZzogY29uZmlnRGF0YSxcbiAgICAgIHNlbGVjdGVkSXRlbXMsXG4gICAgfSk7XG4gICAgYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gICAgYXBwbHlTb3J0KGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gIH07XG4vKipcbiAqIEFjdGlvbiB0byBzZXQgZm9jdXMgdG8gZWl0aGVyIGxhc3QgZWRpdGVkUm93LCBjcmVhdGVkUm93IG9yIHRvIHZhbGlkYXRpb24gZXJyb3JcbiAqIEBwYXJhbSB7T2JqZWN0fSBncmlkXG4gKiBAcGFyYW0ge1N0cmluZ30gZm9jdXNUb1R5cGUgLSB0eXBlIG9mIGZvY3VzIHJlcXVlc3QuIFBvc3NpYmxlIHZhbHVlczpcbiAqICdmb2N1c1RvRWRpdENlbGwnIHx8ICdmb2N1c1RvRXJyb3JDZWxsJyB8fCAnZm9jdXNUb0NyZWF0ZUNlbGwnXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGZvY3VzVG9MYXN0Um93IC0gc2V0cyBmb2N1cyB0byBsYXN0IGRhdGEgcm93IGluc3RlYWQgb2Ygc2VsZWN0ZWQgcm93XG4gKi9cbmV4cG9ydCBjb25zdCBzZXRGb2N1c1RvID0gKGdyaWQsIGZvY3VzVG8sIGZvY3VzVG9MYXN0Um93ID0gZmFsc2UpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NFVF9GT0NVU19UTyxcbiAgICBmb2N1c1RvLFxuICAgIGZvY3VzVG9MYXN0Um93LFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBleHRlbmREYXRhID0gKGdyaWQsIGNvbHVtbnMsIGRhdGEsIHByZXBlbmQgPSBmYWxzZSkgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGNvbnN0IGltbXV0YWJsZURhdGEgPSBJbW11dGFibGUuSXRlcmFibGUuaXNJdGVyYWJsZShkYXRhKSA/IGRhdGEgOiBJbW11dGFibGUuZnJvbUpTKGRhdGEpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0VYVEVORF9EQVRBLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBkYXRhOiBpbW11dGFibGVEYXRhLFxuICAgICAgcHJlcGVuZCxcbiAgICB9KTtcbiAgICBhcHBseUZpbHRlcnMoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgICBhcHBseVNvcnQoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHJlc2l6ZUNvbHVtbiA9IChncmlkLCBjb2x1bW5LZXksIHdpZHRoKSA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgY29uc3QgY29sdW1uV2lkdGhzID0gZ2V0U3RhdGUoKVxuICAgICAgLmRhdGFncmlkXG4gICAgICAuZ2V0SW4oW2dyaWQuaWQsICdjb25maWcnLCAnY29sdW1uV2lkdGhzJ10sIE1hcCgpKVxuICAgICAgLnNldChjb2x1bW5LZXksIHdpZHRoKTtcbiAgICBVdGlscy5zYXZlQ29sdW1uV2lkdGhzKGdyaWQsIGNvbHVtbldpZHRocyk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVTSVpFX0NPTFVNTixcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgY29sdW1uV2lkdGhzLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgZWRpdCA9IGdyaWQgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfRURJVCxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgY2FuY2VsID0gZ3JpZCA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DQU5DRUwsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHNhdmUgPSAoZ3JpZCwgY2IgPSAoKSA9PiB7fSkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0FWRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgIH0pO1xuICAgIGNiKCk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBzYXZlU3VjY2VzcyA9IChncmlkLCBjb2x1bW5zLCBzYXZlZEl0ZW1zKSA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0FWRV9TVUNDRVNTLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBpZEtleVBhdGg6IGdyaWQuaWRLZXlQYXRoLFxuICAgICAgc2F2ZWRJdGVtcyxcbiAgICB9KTtcbiAgICBhcHBseUZpbHRlcnMoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgICBhcHBseVNvcnQoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHNhdmVQYXJ0aWFsU3VjY2VzcyA9IChncmlkLCBjb2x1bW5zLCBzYXZlZEl0ZW1zKSA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0FWRV9QQVJUSUFMX1NVQ0NFU1MsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgICBzYXZlZEl0ZW1zLFxuICAgIH0pO1xuICAgIGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICAgIGFwcGx5U29ydChncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICB9O1xuXG5leHBvcnQgY29uc3Qgc2F2ZUZhaWwgPSBncmlkID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfRkFJTCxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlID0gKGdyaWQsIGNvbHVtbkRlZmF1bHRWYWx1ZXMpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgY29sdW1uRGVmYXVsdFZhbHVlcyxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGFkZE5ld0l0ZW0gPSAoZ3JpZCwgY29sdW1uRGVmYXVsdFZhbHVlcykgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQUREX05FV19JVEVNLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBjb2x1bW5EZWZhdWx0VmFsdWVzLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlSXRlbSA9IChncmlkLCByb3dJZCkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0lURU0sXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgICByb3dJZCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZU5ld0l0ZW0gPSAoZ3JpZCwgaW5kZXgpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgaW5kZXgsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVOZXdJdGVtcyA9IChncmlkLCBpbmRleGVzKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU1TLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBpbmRleGVzLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlID0gKGdyaWQsIGNiID0gKCkgPT4ge30pID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgIH0pO1xuICAgIGNiKCk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVTdWNjZXNzID0gKGdyaWQsIHJlbW92ZWRJZHMpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9TVUNDRVNTLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBpZEtleVBhdGg6IGdyaWQuaWRLZXlQYXRoLFxuICAgICAgcmVtb3ZlZElkcyxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZUZhaWwgPSBncmlkID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9GQUlMLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBlZGl0Q2VsbFZhbHVlQ2hhbmdlID0gKGdyaWQsIGRhdGFJZCwga2V5UGF0aCwgdmFsdWUpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0VESVRfQ0VMTF9WQUxVRV9DSEFOR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGRhdGFJZCxcbiAgICAgIGtleVBhdGgsXG4gICAgICB2YWx1ZSxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGVkaXRDZWxsVmFsdWVWYWxpZGF0ZSA9IChcbiAgZ3JpZCxcbiAgZGF0YUlkLFxuICBrZXlQYXRoLFxuICB2YWx1ZSxcbiAgdmFsaWRhdG9ycyA9IFtdLFxuKSA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgbGV0IHZhbGlkYXRpb25TdGF0ZSA9IHsgdmFsaWQ6IHRydWUgfTtcbiAgICB2YWxpZGF0b3JzLmZvckVhY2goKHZhbGlkYXRvcikgPT4ge1xuICAgICAgaWYgKHZhbGlkYXRpb25TdGF0ZS52YWxpZCkge1xuICAgICAgICBpZiAodmFsaWRhdG9yLnVuaXF1ZSkge1xuICAgICAgICAgIGlmICh2YWx1ZSAhPT0gJycgfHwgdmFsdWUgIT09IG51bGwgfHwgdmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gY29tYmluZSByZWFsIGRhdGEgd2l0aCBjdXJyZW50IHVuc2F2ZWQgZWRpdGVkIGRhdGFcbiAgICAgICAgICAgIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG4gICAgICAgICAgICBjb25zdCBlZGl0RGF0YSA9IGdyaWREYXRhLmdldCgnZWRpdERhdGEnKTtcbiAgICAgICAgICAgIGxldCBhbGxEYXRhID0gZ3JpZERhdGEuZ2V0KCdhbGxEYXRhJyk7XG4gICAgICAgICAgICBpZiAoZWRpdERhdGEpIHtcbiAgICAgICAgICAgICAgZWRpdERhdGEuZm9yRWFjaCgoZWRpdERhdGFJdGVtLCBlZGl0RGF0YUl0ZW1JZCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvdW5kSW5kZXggPVxuICAgICAgICAgICAgICAgICAgYWxsRGF0YS5maW5kSW5kZXgoZCA9PiBkLmdldEluKGdyaWQuaWRLZXlQYXRoKSA9PT0gZWRpdERhdGFJdGVtSWQpO1xuICAgICAgICAgICAgICAgIGlmIChmb3VuZEluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgYWxsRGF0YSA9IGFsbERhdGEubWVyZ2VEZWVwSW4oW2ZvdW5kSW5kZXhdLCBlZGl0RGF0YUl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBkZXRlcm1pbmUgdW5pcXVlbmVzc1xuICAgICAgICAgICAgY29uc3QgZmluZGluZyA9IGFsbERhdGEuZmluZCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZ3JpZC5pZEtleVBhdGgubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgLy8gZG9uJ3Qgc2VsZiBjb21wYXJlXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uZ2V0SW4oZ3JpZC5pZEtleVBhdGgpID09PSBkYXRhSWQpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uZ2V0SW4oa2V5UGF0aCkgPT09IHZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoZmluZGluZykge1xuICAgICAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgdmFsaWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdWYWxpZGF0aW9uLlVuaXF1ZScsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHZhbGlkYXRvci52YWxpZGF0ZVdpdGhSb3dEYXRhKSB7XG4gICAgICAgICAgY29uc3QgZ3JpZERhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldChncmlkLmlkKTtcbiAgICAgICAgICBjb25zdCBlZGl0RGF0YSA9IGdyaWREYXRhLmdldEluKFsnZWRpdERhdGEnLCBkYXRhSWRdLCBNYXAoKSk7XG4gICAgICAgICAgbGV0IHJvd0RhdGEgPSBncmlkRGF0YS5nZXQoJ2FsbERhdGEnKS5maW5kKGl0ZW0gPT4gaXRlbS5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGRhdGFJZCk7XG4gICAgICAgICAgaWYgKHJvd0RhdGEpIHtcbiAgICAgICAgICAgIHJvd0RhdGEgPSByb3dEYXRhLm1lcmdlRGVlcChlZGl0RGF0YSk7XG4gICAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB2YWxpZGF0b3IudmFsaWRhdGVXaXRoUm93RGF0YSh2YWx1ZSwgcm93RGF0YSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IHZhbGlkYXRvci5wYXJhbXMgPyBPYmplY3QudmFsdWVzKHZhbGlkYXRvci5wYXJhbXMpIDogW107XG4gICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0gdmFsaWRhdG9yLnZhbGlkYXRlKHZhbHVlLCAuLi5wYXJhbXMpO1xuICAgICAgICAgIGlmICh2YWxpZGF0b3IucGFyYW1zKSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZVZhbHVlcyA9IHZhbGlkYXRvci5wYXJhbXM7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKHZhbGlkYXRpb25TdGF0ZS52YWxpZCkge1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRSxcbiAgICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICAgIG1lc3NhZ2VUeXBlOiAnZXJyb3InLFxuICAgICAgICBkYXRhSWQsXG4gICAgICAgIGtleVBhdGgsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRSxcbiAgICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICAgIG1lc3NhZ2VUeXBlOiAnZXJyb3InLFxuICAgICAgICBkYXRhSWQsXG4gICAgICAgIGtleVBhdGgsXG4gICAgICAgIG1lc3NhZ2VJZDogdmFsaWRhdGlvblN0YXRlLm1lc3NhZ2UsXG4gICAgICAgIG1lc3NhZ2VWYWx1ZXM6IHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlVmFsdWVzLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB2YWxpZGF0aW9uU3RhdGUudmFsaWQ7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVDZWxsVmFsdWVDaGFuZ2UgPSAoZ3JpZCwgcm93SW5kZXgsIGtleVBhdGgsIHZhbHVlKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9DSEFOR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIHJvd0luZGV4LFxuICAgICAga2V5UGF0aCxcbiAgICAgIHZhbHVlLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUgPSAoZ3JpZCwgcm93SW5kZXgsIGtleVBhdGgsIHZhbHVlLCB2YWxpZGF0b3JzID0gW10pID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBsZXQgdmFsaWRhdGlvblN0YXRlID0geyB2YWxpZDogdHJ1ZSB9O1xuICAgIHZhbGlkYXRvcnMuZm9yRWFjaCgodmFsaWRhdG9yKSA9PiB7XG4gICAgICBpZiAodmFsaWRhdGlvblN0YXRlLnZhbGlkKSB7XG4gICAgICAgIGlmICh2YWxpZGF0b3IudW5pcXVlKSB7XG4gICAgICAgICAgaWYgKHZhbHVlICE9PSAnJyB8fCB2YWx1ZSAhPT0gbnVsbCB8fCB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zdCBmaW5kaW5nID0gZ2V0U3RhdGUoKVxuICAgICAgICAgICAgICAuZGF0YWdyaWRcbiAgICAgICAgICAgICAgLmdldEluKFtncmlkLmlkLCAnYWxsRGF0YSddKVxuICAgICAgICAgICAgICAuZmluZChpdGVtID0+IGl0ZW0uZ2V0SW4oa2V5UGF0aCkgPT09IHZhbHVlKTtcbiAgICAgICAgICAgIGlmIChmaW5kaW5nKSB7XG4gICAgICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICB2YWxpZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ1ZhbGlkYXRpb24uVW5pcXVlJyxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnN0IGZpbmQyID0gZ2V0U3RhdGUoKVxuICAgICAgICAgICAgICAgIC5kYXRhZ3JpZFxuICAgICAgICAgICAgICAgIC5nZXRJbihbZ3JpZC5pZCwgJ2NyZWF0ZURhdGEnXSlcbiAgICAgICAgICAgICAgICAuZmluZCgoaXRlbSwgaSkgPT4gaSAhPT0gcm93SW5kZXggJiYgaXRlbS5nZXRJbihrZXlQYXRoKSA9PT0gdmFsdWUpO1xuICAgICAgICAgICAgICBpZiAoZmluZDIpIHtcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgICB2YWxpZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnVmFsaWRhdGlvbi5VbmlxdWUnLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodmFsaWRhdG9yLnZhbGlkYXRlV2l0aFJvd0RhdGEpIHtcbiAgICAgICAgICBjb25zdCByb3dEYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ2NyZWF0ZURhdGEnLCByb3dJbmRleF0pO1xuICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZVdpdGhSb3dEYXRhKHZhbHVlLCByb3dEYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBwYXJhbXMgPSB2YWxpZGF0b3IucGFyYW1zID8gT2JqZWN0LnZhbHVlcyh2YWxpZGF0b3IucGFyYW1zKSA6IFtdO1xuICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZSh2YWx1ZSwgLi4ucGFyYW1zKTtcbiAgICAgICAgICBpZiAodmFsaWRhdG9yLnBhcmFtcykge1xuICAgICAgICAgICAgdmFsaWRhdGlvblN0YXRlLm1lc3NhZ2VWYWx1ZXMgPSB2YWxpZGF0b3IucGFyYW1zO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICh2YWxpZGF0aW9uU3RhdGUudmFsaWQpIHtcbiAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfSElERV9NRVNTQUdFLFxuICAgICAgICBpZDogZ3JpZC5pZCxcbiAgICAgICAgbWVzc2FnZVR5cGU6ICdlcnJvcicsXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICBrZXlQYXRoLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfU0hPV19NRVNTQUdFLFxuICAgICAgICBpZDogZ3JpZC5pZCxcbiAgICAgICAgbWVzc2FnZVR5cGU6ICdlcnJvcicsXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICBrZXlQYXRoLFxuICAgICAgICBtZXNzYWdlSWQ6IHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlLFxuICAgICAgICBtZXNzYWdlVmFsdWVzOiB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZVZhbHVlcyxcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdmFsaWRhdGlvblN0YXRlLnZhbGlkO1xuICB9O1xuXG5leHBvcnQgY29uc3QgY2VsbFNob3dNZXNzYWdlID0gKGdyaWQsIG1lc3NhZ2VUeXBlLCBkYXRhSWQsIGtleVBhdGgsIG1lc3NhZ2VJZCwgbWVzc2FnZVZhbHVlcykgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIG1lc3NhZ2VUeXBlLFxuICAgICAgZGF0YUlkLFxuICAgICAga2V5UGF0aCxcbiAgICAgIG1lc3NhZ2VJZCxcbiAgICAgIG1lc3NhZ2VWYWx1ZXMsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBjZWxsU2hvd01lc3NhZ2VzID0gKGdyaWQsIG1lc3NhZ2VzKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRVMsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIG1lc3NhZ2VzLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgY2VsbEhpZGVNZXNzYWdlID0gKGdyaWQsIG1lc3NhZ2VUeXBlID0gbnVsbCwgZGF0YUlkID0gbnVsbCwga2V5UGF0aCA9IG51bGwpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfSElERV9NRVNTQUdFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBtZXNzYWdlVHlwZSxcbiAgICAgIGRhdGFJZCxcbiAgICAgIGtleVBhdGgsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVDZWxsU2hvd01lc3NhZ2UgPSAoXG4gIGdyaWQsXG4gIG1lc3NhZ2VUeXBlLFxuICByb3dJbmRleCxcbiAga2V5UGF0aCxcbiAgbWVzc2FnZUlkLFxuICBtZXNzYWdlVmFsdWVzLFxuKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9TSE9XX01FU1NBR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIG1lc3NhZ2VUeXBlLFxuICAgICAgcm93SW5kZXgsXG4gICAgICBrZXlQYXRoLFxuICAgICAgbWVzc2FnZUlkLFxuICAgICAgbWVzc2FnZVZhbHVlcyxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNlbGxIaWRlTWVzc2FnZSA9IChncmlkLCBtZXNzYWdlVHlwZSA9IG51bGwsIHJvd0luZGV4ID0gbnVsbCwga2V5UGF0aCA9IG51bGwpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX0hJREVfTUVTU0FHRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgbWVzc2FnZVR5cGUsXG4gICAgICByb3dJbmRleCxcbiAgICAgIGtleVBhdGgsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBjZWxsU2VsZWN0aW9uQ2hhbmdlID0gKGdyaWQsIHNlbGVjdGVkQ2VsbCA9IG51bGwpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHNlbGVjdGVkQ2VsbCxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TRUxFQ1RJT05fQ0hBTkdFLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgaXRlbVNlbGVjdGlvbkNoYW5nZSA9IChcbiAgZ3JpZCxcbiAgcm93SW5kZXgsXG4gIGN0cmxQcmVzc2VkID0gZmFsc2UsXG4gIHNoaWZ0UHJlc3NlZCA9IGZhbHNlLFxuKSA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICByb3dJbmRleCxcbiAgICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgICBjdHJsUHJlc3NlZCxcbiAgICAgIHNoaWZ0UHJlc3NlZCxcbiAgICB9KTtcbiAgICBVdGlscy5zYXZlU2VsZWN0ZWRJdGVtcyhncmlkLCBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnc2VsZWN0ZWRJdGVtcyddKSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBzZWxlY3RBbGxJdGVtc0NoYW5nZSA9IGdyaWQgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NFTEVDVF9BTExfSVRFTVNfQ0hBTkdFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBpZEtleVBhdGg6IGdyaWQuaWRLZXlQYXRoLFxuICAgIH0pO1xuICAgIFV0aWxzLnNhdmVTZWxlY3RlZEl0ZW1zKGdyaWQsIGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdzZWxlY3RlZEl0ZW1zJ10pKTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGNsZWFyU2VsZWN0ZWRJdGVtcyA9IGdyaWQgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NMRUFSX1NFTEVDVEVEX0lURU1TLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgfSk7XG4gICAgVXRpbHMuc2F2ZVNlbGVjdGVkSXRlbXMoZ3JpZCwgZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ3NlbGVjdGVkSXRlbXMnXSkpO1xuICB9O1xuXG5leHBvcnQgY29uc3QgdG9nZ2xlRmlsdGVyaW5nID0gZ3JpZCA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgY29uc3QgaXNGaWx0ZXJpbmcgPSAhZ2V0U3RhdGUoKVxuICAgICAgLmRhdGFncmlkXG4gICAgICAuZ2V0SW4oW2dyaWQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdpc0ZpbHRlcmluZyddLCBmYWxzZSk7XG4gICAgVXRpbHMuc2F2ZUlzRmlsdGVyaW5nKGdyaWQsIGlzRmlsdGVyaW5nKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9UT0dHTEVfRklMVEVSSU5HLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBpc0ZpbHRlcmluZyxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHZhbGlkYXRlRWRpdGVkUm93cyA9IChncmlkLCBjb2x1bW5zKSA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgY29uc3QgZ3JpZERhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldChncmlkLmlkKTtcbiAgICBjb25zdCBlZGl0RGF0YSA9IGdyaWREYXRhLmdldCgnZWRpdERhdGEnLCBNYXAoKSk7XG4gICAgbGV0IGFsbEdvb2QgPSB0cnVlO1xuICAgIGVkaXREYXRhLmZvckVhY2goKGVkaXREYXRhUm93LCBkYXRhSWQpID0+IHtcbiAgICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICAgIGxldCB2YWx1ZSA9IGVkaXREYXRhUm93LmdldEluKGNvbC52YWx1ZUtleVBhdGgpO1xuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHZhbHVlID0gZ3JpZERhdGFcbiAgICAgICAgICAgIC5nZXQoJ2FsbERhdGEnKVxuICAgICAgICAgICAgLmZpbmQoZGF0YSA9PiBkYXRhLmdldEluKGdyaWQuaWRLZXlQYXRoKSA9PT0gZGF0YUlkKVxuICAgICAgICAgICAgLmdldEluKGNvbC52YWx1ZUtleVBhdGgpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGlzVmFsaWQgPSBlZGl0Q2VsbFZhbHVlVmFsaWRhdGUoXG4gICAgICAgICAgZ3JpZCxcbiAgICAgICAgICBkYXRhSWQsXG4gICAgICAgICAgY29sLnZhbHVlS2V5UGF0aCxcbiAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICBjb2wudmFsaWRhdG9ycyxcbiAgICAgICAgKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICAgICAgICBpZiAoYWxsR29vZCAmJiAhaXNWYWxpZCkge1xuICAgICAgICAgIGFsbEdvb2QgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGFsbEdvb2Q7XG4gIH07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVFbXB0eUNyZWF0ZWRSb3dzID0gKGdyaWQsIGNvbHVtbnMpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBjb25zdCBjcmVhdGVEYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ2NyZWF0ZURhdGEnXSwgTWFwKCkpO1xuICAgIGNvbnN0IGluZGV4ZXMgPSBbXTtcbiAgICBjcmVhdGVEYXRhLmZvckVhY2goKGNyZWF0ZURhdGFSb3csIHJvd0luZGV4KSA9PiB7XG4gICAgICBsZXQgaXNFbXB0eSA9IHRydWU7XG4gICAgICBjb2x1bW5zLmZvckVhY2goKGNvbCkgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGNyZWF0ZURhdGFSb3cuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSAnJyAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgIGlzRW1wdHkgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAoaXNFbXB0eSkge1xuICAgICAgICBpbmRleGVzLnB1c2gocm93SW5kZXgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChpbmRleGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJlbW92ZU5ld0l0ZW1zKGdyaWQsIGluZGV4ZXMpKGRpc3BhdGNoKTtcbiAgICB9XG4gIH07XG5cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUNyZWF0ZWRSb3dzID0gKGdyaWQsIGNvbHVtbnMpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICByZW1vdmVFbXB0eUNyZWF0ZWRSb3dzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gICAgY29uc3QgY3JlYXRlRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdjcmVhdGVEYXRhJ10sIE1hcCgpKTtcbiAgICBsZXQgYWxsR29vZCA9IHRydWU7XG4gICAgY3JlYXRlRGF0YS5mb3JFYWNoKChjcmVhdGVEYXRhUm93LCByb3dJbmRleCkgPT4ge1xuICAgICAgY29sdW1ucy5mb3JFYWNoKChjb2wpID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBjcmVhdGVEYXRhUm93LmdldEluKGNvbC52YWx1ZUtleVBhdGgpO1xuICAgICAgICBjb25zdCBpc1ZhbGlkID0gY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUoXG4gICAgICAgICAgZ3JpZCxcbiAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICBjb2wudmFsdWVLZXlQYXRoLFxuICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgIGNvbC52YWxpZGF0b3JzLFxuICAgICAgICApKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gICAgICAgIGlmIChhbGxHb29kICYmICFpc1ZhbGlkKSB7XG4gICAgICAgICAgYWxsR29vZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gYWxsR29vZDtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZUV4aXN0aW5nQ2VsbFZhbHVlID0gKGdyaWQsIGRhdGFJZCwga2V5UGF0aCwgdmFsdWUpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1VQREFURV9FWElTVElOR19DRUxMX1ZBTFVFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBkYXRhSWQsXG4gICAgICBrZXlQYXRoLFxuICAgICAgdmFsdWUsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBzZXRFZGl0RGF0YSA9IChncmlkLCBkYXRhLCBjZWxsTWVzc2FnZXMgPSBNYXAoKSkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgZGF0YSxcbiAgICAgIGNlbGxNZXNzYWdlcyxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX0VESVRfREFUQSxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IG9wZW5Db2x1bW5TZXR0aW5nc01vZGFsID0gZ3JpZCA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfT1BFTixcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsID0gZ3JpZCA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfQ0xPU0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHNhdmVDb2x1bW5TZXR0aW5ncyA9IChncmlkLCBoaWRkZW5Db2x1bW5zLCBjb2x1bW5PcmRlcikgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgVXRpbHMuc2F2ZUNvbHVtblNldHRpbmdzKGdyaWQsIGhpZGRlbkNvbHVtbnMsIGNvbHVtbk9yZGVyKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfU0FWRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgY29sdW1uT3JkZXIsXG4gICAgfSk7XG4gIH07XG5cbiJdfQ==