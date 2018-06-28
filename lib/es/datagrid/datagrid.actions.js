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
  PLATFORM_DATAGRID_UPDATE_EXISTING_CELL_VALUE: 'PLATFORM_DATAGRID_UPDATE_EXISTING_CELL_VALUE',
  PLATFORM_DATAGRID_SET_EDIT_DATA: 'PLATFORM_DATAGRID_SET_EDIT_DATA',
  PLATFORM_DATAGRID_COLUMN_SETTINGS_MODAL_OPEN: 'PLATFORM_DATAGRID_COLUMN_SETTINGS_MODAL_OPEN',
  PLATFORM_DATAGRID_COLUMN_SETTINGS_MODAL_CLOSE: 'PLATFORM_DATAGRID_COLUMN_SETTINGS_MODAL_CLOSE',
  PLATFORM_DATAGRID_COLUMN_SETTINGS_SAVE: 'PLATFORM_DATAGRID_COLUMN_SETTINGS_SAVE',
  PLATFORM_DATAGRID_FORCE_REFRESH: 'PLATFORM_DATAGRID_FORCE_REFRESH'
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
              var rowData = row.getIn(column.valueKeyPath);
              if (rowData || rowData === 0 || rowData === false) {
                var filterMatcher = Utils.getFilterMatcher(column, dateFormat);
                if (filterMatcher(rowData, filterValue)) {
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

export var extendData = function extendData(grid, columns, data) {
  return function (dispatch, getState) {
    Utils.checkGridParam(grid);
    var immutableData = Immutable.Iterable.isIterable(data) ? data : Immutable.fromJS(data);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_EXTEND_DATA,
      id: grid.id,
      data: immutableData
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

export var removeItem = function removeItem(grid, index) {
  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_REMOVE_ITEM,
      id: grid.id,
      index: index
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5hY3Rpb25zLmpzIl0sIm5hbWVzIjpbIkltbXV0YWJsZSIsIk1hcCIsIlV0aWxzIiwiVFlQRVMiLCJQTEFURk9STV9EQVRBR1JJRF9JTlZBTElEQVRFIiwiUExBVEZPUk1fREFUQUdSSURfQlVTWSIsIlBMQVRGT1JNX0RBVEFHUklEX1JFQURZIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX0RBVEEiLCJQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9TT1JUIiwiUExBVEZPUk1fREFUQUdSSURfU09SVF9DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9SRVNJWkVfQ09MVU1OIiwiUExBVEZPUk1fREFUQUdSSURfRURJVCIsIlBMQVRGT1JNX0RBVEFHUklEX0NBTkNFTCIsIlBMQVRGT1JNX0RBVEFHUklEX1NBVkUiLCJQTEFURk9STV9EQVRBR1JJRF9FWFRFTkRfREFUQSIsIlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfU1VDQ0VTUyIsIlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfUEFSVElBTF9TVUNDRVNTIiwiUExBVEZPUk1fREFUQUdSSURfU0FWRV9GQUlMIiwiUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFIiwiUExBVEZPUk1fREFUQUdSSURfQUREX05FV19JVEVNIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNUyIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRSIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9TVUNDRVNTIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUwiLCJQTEFURk9STV9EQVRBR1JJRF9FRElUX0NFTExfVkFMVUVfQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0UiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRVMiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX0hJREVfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX0NIQU5HRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX1ZBTElEQVRFIiwiUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TRUxFQ1RJT05fQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9DTEVBUl9TRUxFQ1RFRF9JVEVNUyIsIlBMQVRGT1JNX0RBVEFHUklEX1RPR0dMRV9GSUxURVJJTkciLCJQTEFURk9STV9EQVRBR1JJRF9GSUxURVJfREFUQV9DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9GSUxURVJTIiwiUExBVEZPUk1fREFUQUdSSURfVVBEQVRFX0VYSVNUSU5HX0NFTExfVkFMVUUiLCJQTEFURk9STV9EQVRBR1JJRF9TRVRfRURJVF9EQVRBIiwiUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX09QRU4iLCJQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfQ0xPU0UiLCJQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfU0FWRSIsIlBMQVRGT1JNX0RBVEFHUklEX0ZPUkNFX1JFRlJFU0giLCJpbnZhbGlkYXRlIiwiZGlzcGF0Y2giLCJjaGVja0dyaWRQYXJhbSIsImdyaWQiLCJ0eXBlIiwiaWQiLCJmb3JjZVJlZnJlc2giLCJzZXRUaW1lb3V0IiwiZG9jdW1lbnQiLCJjcmVhdGVFdmVudCIsImV2dCIsImluaXRFdmVudCIsIndpbmRvdyIsImRpc3BhdGNoRXZlbnQiLCJzZXRCdXN5Iiwic2V0UmVhZHkiLCJhcHBseUZpbHRlcnMiLCJjb2x1bW5zIiwiZ2V0U3RhdGUiLCJmb3JFYWNoIiwiZ3JpZERhdGEiLCJkYXRhZ3JpZCIsImdldCIsImZpbHRlckRhdGEiLCJnZXRJbiIsImFsbERhdGEiLCJkYXRhIiwiaXNFbXB0eSIsImRhdGVGb3JtYXQiLCJnZXREYXRlRm9ybWF0IiwidXNlciIsImZpbHRlciIsInJvdyIsImhpdHMiLCJmaWx0ZXJWYWx1ZSIsImZpbHRlckNvbHVtbiIsImNvbHVtbiIsImdldENvbHVtbktleSIsInJvd0RhdGEiLCJ2YWx1ZUtleVBhdGgiLCJmaWx0ZXJNYXRjaGVyIiwiZ2V0RmlsdGVyTWF0Y2hlciIsInNpemUiLCJmaWx0ZXJDZWxsVmFsdWVDaGFuZ2UiLCJ2YWx1ZSIsIm9yaWdGaWx0ZXJEYXRhIiwiY29sdW1uS2V5IiwidmFsdWVFbXB0eUNoZWNrZXIiLCJnZXRWYWx1ZUVtcHR5Q2hlY2tlciIsImRlbGV0ZSIsInNldCIsInNhdmVGaWx0ZXJEYXRhIiwiYXBwbHlTb3J0Iiwic29ydERhdGEiLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwiY29sIiwib3JpZ0FsbERhdGEiLCJjb21wYXJhdG9yIiwiZ2V0U29ydENvbXBhcmF0b3IiLCJ2YWx1ZUdldHRlciIsImdldFNvcnRWYWx1ZUdldHRlciIsInNvcnQiLCJhIiwiYiIsInZhbEEiLCJ2YWxCIiwic29ydENoYW5nZSIsIm5ld1NvcnQiLCJzYXZlU29ydERhdGEiLCJzZXREYXRhIiwiY2hlY2tDb2x1bW5zUGFyYW0iLCJjb25maWdEYXRhIiwibG9hZEdyaWRDb25maWciLCJpbW11dGFibGVEYXRhIiwiSXRlcmFibGUiLCJpc0l0ZXJhYmxlIiwiZnJvbUpTIiwic2VsZWN0ZWRJdGVtcyIsImxvYWRTZWxlY3RlZEl0ZW1zIiwiZmluZCIsImRhdGFJdGVtIiwiaWRLZXlQYXRoIiwiaXRlbSIsImNvbmZpZyIsImV4dGVuZERhdGEiLCJyZXNpemVDb2x1bW4iLCJ3aWR0aCIsImNvbHVtbldpZHRocyIsInNhdmVDb2x1bW5XaWR0aHMiLCJlZGl0IiwiY2FuY2VsIiwic2F2ZSIsImNiIiwic2F2ZVN1Y2Nlc3MiLCJzYXZlZEl0ZW1zIiwic2F2ZVBhcnRpYWxTdWNjZXNzIiwic2F2ZUZhaWwiLCJjcmVhdGUiLCJjb2x1bW5EZWZhdWx0VmFsdWVzIiwiYWRkTmV3SXRlbSIsInJlbW92ZUl0ZW0iLCJpbmRleCIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9JVEVNIiwicmVtb3ZlTmV3SXRlbSIsInJlbW92ZU5ld0l0ZW1zIiwiaW5kZXhlcyIsInJlbW92ZSIsInJlbW92ZVN1Y2Nlc3MiLCJyZW1vdmVkSWRzIiwicmVtb3ZlRmFpbCIsImVkaXRDZWxsVmFsdWVDaGFuZ2UiLCJkYXRhSWQiLCJrZXlQYXRoIiwiZWRpdENlbGxWYWx1ZVZhbGlkYXRlIiwidmFsaWRhdG9ycyIsInZhbGlkYXRpb25TdGF0ZSIsInZhbGlkIiwidmFsaWRhdG9yIiwidW5pcXVlIiwidW5kZWZpbmVkIiwiZWRpdERhdGEiLCJlZGl0RGF0YUl0ZW0iLCJlZGl0RGF0YUl0ZW1JZCIsImZvdW5kSW5kZXgiLCJmaW5kSW5kZXgiLCJkIiwibWVyZ2VEZWVwSW4iLCJmaW5kaW5nIiwibGVuZ3RoIiwibWVzc2FnZSIsInZhbGlkYXRlV2l0aFJvd0RhdGEiLCJtZXJnZURlZXAiLCJwYXJhbXMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJ2YWxpZGF0ZSIsIm1lc3NhZ2VWYWx1ZXMiLCJtZXNzYWdlVHlwZSIsIm1lc3NhZ2VJZCIsImNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSIsInJvd0luZGV4IiwiY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUiLCJmaW5kMiIsImkiLCJjZWxsU2hvd01lc3NhZ2UiLCJjZWxsU2hvd01lc3NhZ2VzIiwibWVzc2FnZXMiLCJjZWxsSGlkZU1lc3NhZ2UiLCJjcmVhdGVDZWxsU2hvd01lc3NhZ2UiLCJjcmVhdGVDZWxsSGlkZU1lc3NhZ2UiLCJjZWxsU2VsZWN0aW9uQ2hhbmdlIiwic2VsZWN0ZWRDZWxsIiwiaXRlbVNlbGVjdGlvbkNoYW5nZSIsImN0cmxQcmVzc2VkIiwic2hpZnRQcmVzc2VkIiwic2F2ZVNlbGVjdGVkSXRlbXMiLCJzZWxlY3RBbGxJdGVtc0NoYW5nZSIsImNsZWFyU2VsZWN0ZWRJdGVtcyIsInRvZ2dsZUZpbHRlcmluZyIsImlzRmlsdGVyaW5nIiwic2F2ZUlzRmlsdGVyaW5nIiwidmFsaWRhdGVFZGl0ZWRSb3dzIiwiYWxsR29vZCIsImVkaXREYXRhUm93IiwiaXNWYWxpZCIsInJlbW92ZUVtcHR5Q3JlYXRlZFJvd3MiLCJjcmVhdGVEYXRhIiwiY3JlYXRlRGF0YVJvdyIsInB1c2giLCJ2YWxpZGF0ZUNyZWF0ZWRSb3dzIiwidXBkYXRlRXhpc3RpbmdDZWxsVmFsdWUiLCJzZXRFZGl0RGF0YSIsImNlbGxNZXNzYWdlcyIsIm9wZW5Db2x1bW5TZXR0aW5nc01vZGFsIiwiY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsIiwic2F2ZUNvbHVtblNldHRpbmdzIiwiaGlkZGVuQ29sdW1ucyIsImNvbHVtbk9yZGVyIl0sIm1hcHBpbmdzIjoiQUFBQSxPQUFPQSxTQUFQLElBQW9CQyxHQUFwQixRQUErQixXQUEvQjtBQUNBLE9BQU9DLEtBQVAsTUFBa0Isa0JBQWxCOztBQUVBLE9BQU8sSUFBTUMsUUFBUTtBQUNuQkMsZ0NBQThCLDhCQURYO0FBRW5CQywwQkFBd0Isd0JBRkw7QUFHbkJDLDJCQUF5Qix5QkFITjtBQUluQkMsOEJBQTRCLDRCQUpUO0FBS25CQyxnQ0FBOEIsOEJBTFg7QUFNbkJDLGlDQUErQiwrQkFOWjtBQU9uQkMsbUNBQWlDLGlDQVBkO0FBUW5CQywwQkFBd0Isd0JBUkw7QUFTbkJDLDRCQUEwQiwwQkFUUDtBQVVuQkMsMEJBQXdCLHdCQVZMO0FBV25CQyxpQ0FBK0IsK0JBWFo7QUFZbkJDLGtDQUFnQyxnQ0FaYjtBQWFuQkMsMENBQXdDLHdDQWJyQjtBQWNuQkMsK0JBQTZCLDZCQWRWO0FBZW5CQyw0QkFBMEIsMEJBZlA7QUFnQm5CQyxrQ0FBZ0MsZ0NBaEJiO0FBaUJuQkMscUNBQW1DLG1DQWpCaEI7QUFrQm5CQyxzQ0FB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N0ssSUFBRCxFQUFPOEssYUFBUCxFQUFzQkMsV0FBdEI7QUFBQSxTQUNoQyxVQUFDakwsUUFBRCxFQUFjO0FBQ1o3QyxVQUFNOEMsY0FBTixDQUFxQkMsSUFBckI7QUFDQS9DLFVBQU00TixrQkFBTixDQUF5QjdLLElBQXpCLEVBQStCOEssYUFBL0IsRUFBOENDLFdBQTlDO0FBQ0FqTCxhQUFTO0FBQ1BHLFlBQU0vQyxNQUFNeUMsc0NBREw7QUFFUE8sVUFBSUYsS0FBS0UsRUFGRjtBQUdQNks7QUFITyxLQUFUO0FBS0QsR0FUK0I7QUFBQSxDQUEzQiIsImZpbGUiOiJkYXRhZ3JpZC5hY3Rpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEltbXV0YWJsZSwgeyBNYXAgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4vZGF0YWdyaWQudXRpbHMnO1xuXG5leHBvcnQgY29uc3QgVFlQRVMgPSB7XG4gIFBMQVRGT1JNX0RBVEFHUklEX0lOVkFMSURBVEU6ICdQTEFURk9STV9EQVRBR1JJRF9JTlZBTElEQVRFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQlVTWTogJ1BMQVRGT1JNX0RBVEFHUklEX0JVU1knLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRUFEWTogJ1BMQVRGT1JNX0RBVEFHUklEX1JFQURZJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0VUX0RBVEE6ICdQTEFURk9STV9EQVRBR1JJRF9TRVRfREFUQScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0FQUExZX1NPUlQ6ICdQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9TT1JUJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU09SVF9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9TT1JUX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFU0laRV9DT0xVTU46ICdQTEFURk9STV9EQVRBR1JJRF9SRVNJWkVfQ09MVU1OJyxcbiAgUExBVEZPUk1fREFUQUdSSURfRURJVDogJ1BMQVRGT1JNX0RBVEFHUklEX0VESVQnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DQU5DRUw6ICdQTEFURk9STV9EQVRBR1JJRF9DQU5DRUwnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TQVZFOiAnUExBVEZPUk1fREFUQUdSSURfU0FWRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0VYVEVORF9EQVRBOiAnUExBVEZPUk1fREFUQUdSSURfRVhURU5EX0RBVEEnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TQVZFX1NVQ0NFU1M6ICdQTEFURk9STV9EQVRBR1JJRF9TQVZFX1NVQ0NFU1MnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TQVZFX1BBUlRJQUxfU1VDQ0VTUzogJ1BMQVRGT1JNX0RBVEFHUklEX1NBVkVfUEFSVElBTF9TVUNDRVNTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0FWRV9GQUlMOiAnUExBVEZPUk1fREFUQUdSSURfU0FWRV9GQUlMJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFOiAnUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQUREX05FV19JVEVNOiAnUExBVEZPUk1fREFUQUdSSURfQUREX05FV19JVEVNJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNOiAnUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNUzogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTVMnLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkU6ICdQTEFURk9STV9EQVRBR1JJRF9SRU1PVkUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfU1VDQ0VTUzogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9TVUNDRVNTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUw6ICdQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfRkFJTCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0VESVRfQ0VMTF9WQUxVRV9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9FRElUX0NFTExfVkFMVUVfQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFUzogJ1BMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NFTExfSElERV9NRVNTQUdFOiAnUExBVEZPUk1fREFUQUdSSURfQ0VMTF9ISURFX01FU1NBR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9TSE9XX01FU1NBR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9TSE9XX01FU1NBR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9ISURFX01FU1NBR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9ISURFX01FU1NBR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9WQUxJREFURTogJ1BMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX1ZBTElEQVRFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TRUxFQ1RJT05fQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TRUxFQ1RJT05fQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9TRUxFQ1RfQUxMX0lURU1TX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NMRUFSX1NFTEVDVEVEX0lURU1TOiAnUExBVEZPUk1fREFUQUdSSURfQ0xFQVJfU0VMRUNURURfSVRFTVMnLFxuICBQTEFURk9STV9EQVRBR1JJRF9UT0dHTEVfRklMVEVSSU5HOiAnUExBVEZPUk1fREFUQUdSSURfVE9HR0xFX0ZJTFRFUklORycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0ZJTFRFUl9EQVRBX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX0ZJTFRFUl9EQVRBX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0FQUExZX0ZJTFRFUlM6ICdQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9GSUxURVJTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfVVBEQVRFX0VYSVNUSU5HX0NFTExfVkFMVUU6ICdQTEFURk9STV9EQVRBR1JJRF9VUERBVEVfRVhJU1RJTkdfQ0VMTF9WQUxVRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NFVF9FRElUX0RBVEE6ICdQTEFURk9STV9EQVRBR1JJRF9TRVRfRURJVF9EQVRBJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX09QRU46ICdQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfT1BFTicsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFOiAnUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX1NBVkUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9GT1JDRV9SRUZSRVNIOiAnUExBVEZPUk1fREFUQUdSSURfRk9SQ0VfUkVGUkVTSCcsXG59O1xuXG5leHBvcnQgY29uc3QgaW52YWxpZGF0ZSA9IGdyaWQgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfSU5WQUxJREFURSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgZm9yY2VSZWZyZXNoID0gKCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIC8vIEZpcmUgcmVzaXplIGV2ZW50IHRvIHJlY2FsY3VsYXRlIGNvbXBvbmVudCBzaXplc1xuICAvLyBhbmQgdG8gZm9yY2UgcmVkcmF3IHRoZSBncmlkXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGlmIChkb2N1bWVudC5jcmVhdGVFdmVudCkge1xuICAgICAgY29uc3QgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKTtcbiAgICAgIGV2dC5pbml0RXZlbnQoJ3Jlc2l6ZScsIHRydWUsIGZhbHNlKTtcbiAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gICAgfVxuICB9LCAxKTtcbiAgZGlzcGF0Y2goeyB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9GT1JDRV9SRUZSRVNIIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldEJ1c3kgPSBncmlkID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0JVU1ksXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHNldFJlYWR5ID0gZ3JpZCA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRUFEWSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgYXBwbHlGaWx0ZXJzID0gKGdyaWQsIGNvbHVtbnMpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBpZiAoIWNvbHVtbnMgfHwgIWNvbHVtbnMuZm9yRWFjaCkgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG4gICAgaWYgKCFncmlkRGF0YSkgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IGZpbHRlckRhdGEgPSBncmlkRGF0YS5nZXRJbihbJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2ZpbHRlckRhdGEnXSwgTWFwKCkpO1xuICAgIGNvbnN0IGFsbERhdGEgPSBncmlkRGF0YS5nZXQoJ2FsbERhdGEnKTtcbiAgICBzZXRCdXN5KGdyaWQpKGRpc3BhdGNoKTtcbiAgICBsZXQgZGF0YTtcbiAgICBpZiAoZmlsdGVyRGF0YS5pc0VtcHR5KCkpIHtcbiAgICAgIGRhdGEgPSBhbGxEYXRhO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkYXRlRm9ybWF0ID0gVXRpbHMuZ2V0RGF0ZUZvcm1hdChncmlkLCBnZXRTdGF0ZSgpLnVzZXIpO1xuICAgICAgZGF0YSA9IGFsbERhdGEuZmlsdGVyKChyb3cpID0+IHtcbiAgICAgICAgbGV0IGhpdHMgPSAwO1xuICAgICAgICBmaWx0ZXJEYXRhLmZvckVhY2goKGZpbHRlclZhbHVlLCBmaWx0ZXJDb2x1bW4pID0+IHtcbiAgICAgICAgICBjb2x1bW5zLmZvckVhY2goKGNvbHVtbikgPT4ge1xuICAgICAgICAgICAgaWYgKFV0aWxzLmdldENvbHVtbktleShjb2x1bW4pID09PSBmaWx0ZXJDb2x1bW4pIHtcbiAgICAgICAgICAgICAgY29uc3Qgcm93RGF0YSA9IHJvdy5nZXRJbihjb2x1bW4udmFsdWVLZXlQYXRoKTtcbiAgICAgICAgICAgICAgaWYgKHJvd0RhdGEgfHwgcm93RGF0YSA9PT0gMCB8fCByb3dEYXRhID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlck1hdGNoZXIgPSBVdGlscy5nZXRGaWx0ZXJNYXRjaGVyKGNvbHVtbiwgZGF0ZUZvcm1hdCk7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlck1hdGNoZXIocm93RGF0YSwgZmlsdGVyVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICBoaXRzICs9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gaGl0cyA9PT0gZmlsdGVyRGF0YS5zaXplO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0FQUExZX0ZJTFRFUlMsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGRhdGEsXG4gICAgfSk7XG4gICAgc2V0UmVhZHkoZ3JpZCkoZGlzcGF0Y2gpO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG5leHBvcnQgY29uc3QgZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlID0gKGdyaWQsIGNvbHVtbnMsIGNvbHVtbiwgdmFsdWUpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBjb25zdCBvcmlnRmlsdGVyRGF0YSA9IGdldFN0YXRlKClcbiAgICAgIC5kYXRhZ3JpZFxuICAgICAgLmdldEluKFtncmlkLmlkLCAnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnZmlsdGVyRGF0YSddLCBNYXAoKSk7XG4gICAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbHVtbik7XG4gICAgY29uc3QgdmFsdWVFbXB0eUNoZWNrZXIgPSBVdGlscy5nZXRWYWx1ZUVtcHR5Q2hlY2tlcihjb2x1bW4pO1xuICAgIGxldCBmaWx0ZXJEYXRhO1xuICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWx1ZSkpIHtcbiAgICAgIGZpbHRlckRhdGEgPSBvcmlnRmlsdGVyRGF0YS5kZWxldGUoY29sdW1uS2V5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmlsdGVyRGF0YSA9IG9yaWdGaWx0ZXJEYXRhLnNldChjb2x1bW5LZXksIHZhbHVlKTtcbiAgICB9XG4gICAgVXRpbHMuc2F2ZUZpbHRlckRhdGEoZ3JpZCwgZmlsdGVyRGF0YSk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfRklMVEVSX0RBVEFfQ0hBTkdFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBmaWx0ZXJEYXRhLFxuICAgIH0pO1xuICAgIGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICB9O1xuXG5leHBvcnQgY29uc3QgYXBwbHlTb3J0ID0gKGdyaWQsIGNvbHVtbnMpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBpZiAoIWNvbHVtbnMgfHwgIWNvbHVtbnMuZm9yRWFjaCkgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG4gICAgaWYgKCFncmlkRGF0YSkgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IHNvcnREYXRhID0gZ3JpZERhdGEuZ2V0SW4oWydjb25maWcnLCAnc29ydGluZ0RhdGEnXSk7XG4gICAgaWYgKCFzb3J0RGF0YSkgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IHNvcnRDb2x1bW4gPSBzb3J0RGF0YS5nZXQoJ3NvcnRDb2x1bW4nKTtcbiAgICBpZiAoIXNvcnRDb2x1bW4pIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBzb3J0T3JkZXIgPSBzb3J0RGF0YS5nZXQoJ3NvcnRPcmRlcicsICdhc2MnKTtcbiAgICBsZXQgY29sdW1uO1xuICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICBpZiAoVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCkgPT09IHNvcnRDb2x1bW4pIHtcbiAgICAgICAgY29sdW1uID0gY29sO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICghY29sdW1uKSByZXR1cm4gZmFsc2U7XG5cbiAgICBzZXRCdXN5KGdyaWQpKGRpc3BhdGNoKTtcbiAgICBjb25zdCBvcmlnQWxsRGF0YSA9IGdyaWREYXRhLmdldCgnYWxsRGF0YScpO1xuICAgIGNvbnN0IGNvbXBhcmF0b3IgPSBVdGlscy5nZXRTb3J0Q29tcGFyYXRvcihjb2x1bW4pO1xuICAgIGNvbnN0IHZhbHVlR2V0dGVyID0gVXRpbHMuZ2V0U29ydFZhbHVlR2V0dGVyKGNvbHVtbik7XG4gICAgY29uc3QgdmFsdWVFbXB0eUNoZWNrZXIgPSBVdGlscy5nZXRWYWx1ZUVtcHR5Q2hlY2tlcihjb2x1bW4pO1xuICAgIGNvbnN0IGFsbERhdGEgPSBvcmlnQWxsRGF0YS5zb3J0KChhLCBiKSA9PiB7XG4gICAgICBjb25zdCB2YWxBID0gdmFsdWVHZXR0ZXIoYSk7XG4gICAgICBjb25zdCB2YWxCID0gdmFsdWVHZXR0ZXIoYik7XG4gICAgICBpZiAoc29ydE9yZGVyID09PSAnYXNjJykge1xuICAgICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQSkpIHJldHVybiAtMTtcbiAgICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEIpKSByZXR1cm4gMTtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmF0b3IodmFsQSwgdmFsQik7XG4gICAgICB9XG4gICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQSkpIHJldHVybiAxO1xuICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEIpKSByZXR1cm4gLTE7XG4gICAgICByZXR1cm4gY29tcGFyYXRvcih2YWxCLCB2YWxBKTtcbiAgICB9KTtcbiAgICBsZXQgZGF0YTtcbiAgICAvLyBTb3J0IGFsc28gZmlsdGVyZWQgZGF0YSBzZXBhcmF0ZWx5XG4gICAgaWYgKGdyaWREYXRhLmdldEluKFsnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnaXNGaWx0ZXJpbmcnXSwgZmFsc2UpKSB7XG4gICAgICBkYXRhID0gZ3JpZERhdGEuZ2V0KCdkYXRhJykuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICBjb25zdCB2YWxBID0gdmFsdWVHZXR0ZXIoYSk7XG4gICAgICAgIGNvbnN0IHZhbEIgPSB2YWx1ZUdldHRlcihiKTtcbiAgICAgICAgaWYgKHNvcnRPcmRlciA9PT0gJ2FzYycpIHtcbiAgICAgICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQSkpIHJldHVybiAtMTtcbiAgICAgICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQikpIHJldHVybiAxO1xuICAgICAgICAgIHJldHVybiBjb21wYXJhdG9yKHZhbEEsIHZhbEIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxBKSkgcmV0dXJuIDE7XG4gICAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxCKSkgcmV0dXJuIC0xO1xuICAgICAgICByZXR1cm4gY29tcGFyYXRvcih2YWxCLCB2YWxBKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXRhID0gYWxsRGF0YTtcbiAgICB9XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQVBQTFlfU09SVCxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgZGF0YSxcbiAgICAgIGFsbERhdGEsXG4gICAgfSk7XG4gICAgc2V0UmVhZHkoZ3JpZCkoZGlzcGF0Y2gpO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG5leHBvcnQgY29uc3Qgc29ydENoYW5nZSA9IChncmlkLCBjb2x1bW5zLCBjb2x1bW4sIG5ld1NvcnQpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBjb25zdCBzb3J0T3JkZXIgPSBuZXdTb3J0IHx8ICdhc2MnO1xuICAgIGNvbnN0IHNvcnRDb2x1bW4gPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sdW1uKTtcbiAgICBVdGlscy5zYXZlU29ydERhdGEoZ3JpZCwgeyBzb3J0Q29sdW1uLCBzb3J0T3JkZXIgfSk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU09SVF9DSEFOR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIHNvcnRDb2x1bW4sXG4gICAgICBzb3J0T3JkZXIsXG4gICAgfSk7XG4gICAgYXBwbHlTb3J0KGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBzZXREYXRhID0gKGdyaWQsIGNvbHVtbnMsIGRhdGEpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBVdGlscy5jaGVja0NvbHVtbnNQYXJhbShjb2x1bW5zKTtcbiAgICBjb25zdCBjb25maWdEYXRhID0gVXRpbHMubG9hZEdyaWRDb25maWcoZ3JpZCwgY29sdW1ucyk7XG4gICAgY29uc3QgaW1tdXRhYmxlRGF0YSA9IEltbXV0YWJsZS5JdGVyYWJsZS5pc0l0ZXJhYmxlKGRhdGEpID8gZGF0YSA6IEltbXV0YWJsZS5mcm9tSlMoZGF0YSk7XG4gICAgY29uc3Qgc2VsZWN0ZWRJdGVtcyA9IFV0aWxzLmxvYWRTZWxlY3RlZEl0ZW1zKGdyaWQpLmZpbHRlcihpdGVtID0+IChcbiAgICAgICEhaW1tdXRhYmxlRGF0YS5maW5kKGRhdGFJdGVtID0+IGRhdGFJdGVtLmdldEluKGdyaWQuaWRLZXlQYXRoKSA9PT0gaXRlbSlcbiAgICApKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfREFUQSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgZGF0YTogaW1tdXRhYmxlRGF0YSxcbiAgICAgIGNvbmZpZzogY29uZmlnRGF0YSxcbiAgICAgIHNlbGVjdGVkSXRlbXMsXG4gICAgfSk7XG4gICAgYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gICAgYXBwbHlTb3J0KGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBleHRlbmREYXRhID0gKGdyaWQsIGNvbHVtbnMsIGRhdGEpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBjb25zdCBpbW11dGFibGVEYXRhID0gSW1tdXRhYmxlLkl0ZXJhYmxlLmlzSXRlcmFibGUoZGF0YSkgPyBkYXRhIDogSW1tdXRhYmxlLmZyb21KUyhkYXRhKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9FWFRFTkRfREFUQSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgZGF0YTogaW1tdXRhYmxlRGF0YSxcbiAgICB9KTtcbiAgICBhcHBseUZpbHRlcnMoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgICBhcHBseVNvcnQoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHJlc2l6ZUNvbHVtbiA9IChncmlkLCBjb2x1bW5LZXksIHdpZHRoKSA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgY29uc3QgY29sdW1uV2lkdGhzID0gZ2V0U3RhdGUoKVxuICAgICAgLmRhdGFncmlkXG4gICAgICAuZ2V0SW4oW2dyaWQuaWQsICdjb25maWcnLCAnY29sdW1uV2lkdGhzJ10sIE1hcCgpKVxuICAgICAgLnNldChjb2x1bW5LZXksIHdpZHRoKTtcbiAgICBVdGlscy5zYXZlQ29sdW1uV2lkdGhzKGdyaWQsIGNvbHVtbldpZHRocyk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVTSVpFX0NPTFVNTixcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgY29sdW1uV2lkdGhzLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgZWRpdCA9IGdyaWQgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfRURJVCxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgY2FuY2VsID0gZ3JpZCA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DQU5DRUwsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHNhdmUgPSAoZ3JpZCwgY2IgPSAoKSA9PiB7fSkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0FWRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgIH0pO1xuICAgIGNiKCk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBzYXZlU3VjY2VzcyA9IChncmlkLCBjb2x1bW5zLCBzYXZlZEl0ZW1zKSA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0FWRV9TVUNDRVNTLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBpZEtleVBhdGg6IGdyaWQuaWRLZXlQYXRoLFxuICAgICAgc2F2ZWRJdGVtcyxcbiAgICB9KTtcbiAgICBhcHBseUZpbHRlcnMoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgICBhcHBseVNvcnQoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHNhdmVQYXJ0aWFsU3VjY2VzcyA9IChncmlkLCBjb2x1bW5zLCBzYXZlZEl0ZW1zKSA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0FWRV9QQVJUSUFMX1NVQ0NFU1MsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgICBzYXZlZEl0ZW1zLFxuICAgIH0pO1xuICAgIGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICAgIGFwcGx5U29ydChncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICB9O1xuXG5leHBvcnQgY29uc3Qgc2F2ZUZhaWwgPSBncmlkID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfRkFJTCxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlID0gKGdyaWQsIGNvbHVtbkRlZmF1bHRWYWx1ZXMpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgY29sdW1uRGVmYXVsdFZhbHVlcyxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGFkZE5ld0l0ZW0gPSAoZ3JpZCwgY29sdW1uRGVmYXVsdFZhbHVlcykgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQUREX05FV19JVEVNLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBjb2x1bW5EZWZhdWx0VmFsdWVzLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlSXRlbSA9IChncmlkLCBpbmRleCkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0lURU0sXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGluZGV4LFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlTmV3SXRlbSA9IChncmlkLCBpbmRleCkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBpbmRleCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZU5ld0l0ZW1zID0gKGdyaWQsIGluZGV4ZXMpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTVMsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGluZGV4ZXMsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCByZW1vdmUgPSAoZ3JpZCwgY2IgPSAoKSA9PiB7fSkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgfSk7XG4gICAgY2IoKTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZVN1Y2Nlc3MgPSAoZ3JpZCwgcmVtb3ZlZElkcykgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX1NVQ0NFU1MsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgICByZW1vdmVkSWRzLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlRmFpbCA9IGdyaWQgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUwsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGVkaXRDZWxsVmFsdWVDaGFuZ2UgPSAoZ3JpZCwgZGF0YUlkLCBrZXlQYXRoLCB2YWx1ZSkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfRURJVF9DRUxMX1ZBTFVFX0NIQU5HRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgZGF0YUlkLFxuICAgICAga2V5UGF0aCxcbiAgICAgIHZhbHVlLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgZWRpdENlbGxWYWx1ZVZhbGlkYXRlID0gKFxuICBncmlkLFxuICBkYXRhSWQsXG4gIGtleVBhdGgsXG4gIHZhbHVlLFxuICB2YWxpZGF0b3JzID0gW10sXG4pID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBsZXQgdmFsaWRhdGlvblN0YXRlID0geyB2YWxpZDogdHJ1ZSB9O1xuICAgIHZhbGlkYXRvcnMuZm9yRWFjaCgodmFsaWRhdG9yKSA9PiB7XG4gICAgICBpZiAodmFsaWRhdGlvblN0YXRlLnZhbGlkKSB7XG4gICAgICAgIGlmICh2YWxpZGF0b3IudW5pcXVlKSB7XG4gICAgICAgICAgaWYgKHZhbHVlICE9PSAnJyB8fCB2YWx1ZSAhPT0gbnVsbCB8fCB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBjb21iaW5lIHJlYWwgZGF0YSB3aXRoIGN1cnJlbnQgdW5zYXZlZCBlZGl0ZWQgZGF0YVxuICAgICAgICAgICAgY29uc3QgZ3JpZERhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldChncmlkLmlkKTtcbiAgICAgICAgICAgIGNvbnN0IGVkaXREYXRhID0gZ3JpZERhdGEuZ2V0KCdlZGl0RGF0YScpO1xuICAgICAgICAgICAgbGV0IGFsbERhdGEgPSBncmlkRGF0YS5nZXQoJ2FsbERhdGEnKTtcbiAgICAgICAgICAgIGlmIChlZGl0RGF0YSkge1xuICAgICAgICAgICAgICBlZGl0RGF0YS5mb3JFYWNoKChlZGl0RGF0YUl0ZW0sIGVkaXREYXRhSXRlbUlkKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZm91bmRJbmRleCA9XG4gICAgICAgICAgICAgICAgICBhbGxEYXRhLmZpbmRJbmRleChkID0+IGQuZ2V0SW4oZ3JpZC5pZEtleVBhdGgpID09PSBlZGl0RGF0YUl0ZW1JZCk7XG4gICAgICAgICAgICAgICAgaWYgKGZvdW5kSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICBhbGxEYXRhID0gYWxsRGF0YS5tZXJnZURlZXBJbihbZm91bmRJbmRleF0sIGVkaXREYXRhSXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGRldGVybWluZSB1bmlxdWVuZXNzXG4gICAgICAgICAgICBjb25zdCBmaW5kaW5nID0gYWxsRGF0YS5maW5kKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChncmlkLmlkS2V5UGF0aC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAvLyBkb24ndCBzZWxmIGNvbXBhcmVcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGRhdGFJZCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gaXRlbS5nZXRJbihrZXlQYXRoKSA9PT0gdmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChmaW5kaW5nKSB7XG4gICAgICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICB2YWxpZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ1ZhbGlkYXRpb24uVW5pcXVlJyxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodmFsaWRhdG9yLnZhbGlkYXRlV2l0aFJvd0RhdGEpIHtcbiAgICAgICAgICBjb25zdCBncmlkRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0KGdyaWQuaWQpO1xuICAgICAgICAgIGNvbnN0IGVkaXREYXRhID0gZ3JpZERhdGEuZ2V0SW4oWydlZGl0RGF0YScsIGRhdGFJZF0sIE1hcCgpKTtcbiAgICAgICAgICBsZXQgcm93RGF0YSA9IGdyaWREYXRhLmdldCgnYWxsRGF0YScpLmZpbmQoaXRlbSA9PiBpdGVtLmdldEluKGdyaWQuaWRLZXlQYXRoKSA9PT0gZGF0YUlkKTtcbiAgICAgICAgICBpZiAocm93RGF0YSkge1xuICAgICAgICAgICAgcm93RGF0YSA9IHJvd0RhdGEubWVyZ2VEZWVwKGVkaXREYXRhKTtcbiAgICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZVdpdGhSb3dEYXRhKHZhbHVlLCByb3dEYXRhKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgcGFyYW1zID0gdmFsaWRhdG9yLnBhcmFtcyA/IE9iamVjdC52YWx1ZXModmFsaWRhdG9yLnBhcmFtcykgOiBbXTtcbiAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB2YWxpZGF0b3IudmFsaWRhdGUodmFsdWUsIC4uLnBhcmFtcyk7XG4gICAgICAgICAgaWYgKHZhbGlkYXRvci5wYXJhbXMpIHtcbiAgICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlVmFsdWVzID0gdmFsaWRhdG9yLnBhcmFtcztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAodmFsaWRhdGlvblN0YXRlLnZhbGlkKSB7XG4gICAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfSElERV9NRVNTQUdFLFxuICAgICAgICBpZDogZ3JpZC5pZCxcbiAgICAgICAgbWVzc2FnZVR5cGU6ICdlcnJvcicsXG4gICAgICAgIGRhdGFJZCxcbiAgICAgICAga2V5UGF0aCxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFLFxuICAgICAgICBpZDogZ3JpZC5pZCxcbiAgICAgICAgbWVzc2FnZVR5cGU6ICdlcnJvcicsXG4gICAgICAgIGRhdGFJZCxcbiAgICAgICAga2V5UGF0aCxcbiAgICAgICAgbWVzc2FnZUlkOiB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZSxcbiAgICAgICAgbWVzc2FnZVZhbHVlczogdmFsaWRhdGlvblN0YXRlLm1lc3NhZ2VWYWx1ZXMsXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbGlkYXRpb25TdGF0ZS52YWxpZDtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSA9IChncmlkLCByb3dJbmRleCwga2V5UGF0aCwgdmFsdWUpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX0NIQU5HRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgcm93SW5kZXgsXG4gICAgICBrZXlQYXRoLFxuICAgICAgdmFsdWUsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZSA9IChncmlkLCByb3dJbmRleCwga2V5UGF0aCwgdmFsdWUsIHZhbGlkYXRvcnMgPSBbXSkgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGxldCB2YWxpZGF0aW9uU3RhdGUgPSB7IHZhbGlkOiB0cnVlIH07XG4gICAgdmFsaWRhdG9ycy5mb3JFYWNoKCh2YWxpZGF0b3IpID0+IHtcbiAgICAgIGlmICh2YWxpZGF0aW9uU3RhdGUudmFsaWQpIHtcbiAgICAgICAgaWYgKHZhbGlkYXRvci51bmlxdWUpIHtcbiAgICAgICAgICBpZiAodmFsdWUgIT09ICcnIHx8IHZhbHVlICE9PSBudWxsIHx8IHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpbmRpbmcgPSBnZXRTdGF0ZSgpXG4gICAgICAgICAgICAgIC5kYXRhZ3JpZFxuICAgICAgICAgICAgICAuZ2V0SW4oW2dyaWQuaWQsICdhbGxEYXRhJ10pXG4gICAgICAgICAgICAgIC5maW5kKGl0ZW0gPT4gaXRlbS5nZXRJbihrZXlQYXRoKSA9PT0gdmFsdWUpO1xuICAgICAgICAgICAgaWYgKGZpbmRpbmcpIHtcbiAgICAgICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0ge1xuICAgICAgICAgICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnVmFsaWRhdGlvbi5VbmlxdWUnLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc3QgZmluZDIgPSBnZXRTdGF0ZSgpXG4gICAgICAgICAgICAgICAgLmRhdGFncmlkXG4gICAgICAgICAgICAgICAgLmdldEluKFtncmlkLmlkLCAnY3JlYXRlRGF0YSddKVxuICAgICAgICAgICAgICAgIC5maW5kKChpdGVtLCBpKSA9PiBpICE9PSByb3dJbmRleCAmJiBpdGVtLmdldEluKGtleVBhdGgpID09PSB2YWx1ZSk7XG4gICAgICAgICAgICAgIGlmIChmaW5kMikge1xuICAgICAgICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdWYWxpZGF0aW9uLlVuaXF1ZScsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh2YWxpZGF0b3IudmFsaWRhdGVXaXRoUm93RGF0YSkge1xuICAgICAgICAgIGNvbnN0IHJvd0RhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnY3JlYXRlRGF0YScsIHJvd0luZGV4XSk7XG4gICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0gdmFsaWRhdG9yLnZhbGlkYXRlV2l0aFJvd0RhdGEodmFsdWUsIHJvd0RhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IHZhbGlkYXRvci5wYXJhbXMgPyBPYmplY3QudmFsdWVzKHZhbGlkYXRvci5wYXJhbXMpIDogW107XG4gICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0gdmFsaWRhdG9yLnZhbGlkYXRlKHZhbHVlLCAuLi5wYXJhbXMpO1xuICAgICAgICAgIGlmICh2YWxpZGF0b3IucGFyYW1zKSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZVZhbHVlcyA9IHZhbGlkYXRvci5wYXJhbXM7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKHZhbGlkYXRpb25TdGF0ZS52YWxpZCkge1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9ISURFX01FU1NBR0UsXG4gICAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgICBtZXNzYWdlVHlwZTogJ2Vycm9yJyxcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIGtleVBhdGgsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9TSE9XX01FU1NBR0UsXG4gICAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgICBtZXNzYWdlVHlwZTogJ2Vycm9yJyxcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIGtleVBhdGgsXG4gICAgICAgIG1lc3NhZ2VJZDogdmFsaWRhdGlvblN0YXRlLm1lc3NhZ2UsXG4gICAgICAgIG1lc3NhZ2VWYWx1ZXM6IHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlVmFsdWVzLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB2YWxpZGF0aW9uU3RhdGUudmFsaWQ7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBjZWxsU2hvd01lc3NhZ2UgPSAoZ3JpZCwgbWVzc2FnZVR5cGUsIGRhdGFJZCwga2V5UGF0aCwgbWVzc2FnZUlkLCBtZXNzYWdlVmFsdWVzKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgbWVzc2FnZVR5cGUsXG4gICAgICBkYXRhSWQsXG4gICAgICBrZXlQYXRoLFxuICAgICAgbWVzc2FnZUlkLFxuICAgICAgbWVzc2FnZVZhbHVlcyxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGNlbGxTaG93TWVzc2FnZXMgPSAoZ3JpZCwgbWVzc2FnZXMpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFUyxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgbWVzc2FnZXMsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBjZWxsSGlkZU1lc3NhZ2UgPSAoZ3JpZCwgbWVzc2FnZVR5cGUgPSBudWxsLCBkYXRhSWQgPSBudWxsLCBrZXlQYXRoID0gbnVsbCkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0VMTF9ISURFX01FU1NBR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIG1lc3NhZ2VUeXBlLFxuICAgICAgZGF0YUlkLFxuICAgICAga2V5UGF0aCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNlbGxTaG93TWVzc2FnZSA9IChcbiAgZ3JpZCxcbiAgbWVzc2FnZVR5cGUsXG4gIHJvd0luZGV4LFxuICBrZXlQYXRoLFxuICBtZXNzYWdlSWQsXG4gIG1lc3NhZ2VWYWx1ZXMsXG4pID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgbWVzc2FnZVR5cGUsXG4gICAgICByb3dJbmRleCxcbiAgICAgIGtleVBhdGgsXG4gICAgICBtZXNzYWdlSWQsXG4gICAgICBtZXNzYWdlVmFsdWVzLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQ2VsbEhpZGVNZXNzYWdlID0gKGdyaWQsIG1lc3NhZ2VUeXBlID0gbnVsbCwgcm93SW5kZXggPSBudWxsLCBrZXlQYXRoID0gbnVsbCkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfSElERV9NRVNTQUdFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBtZXNzYWdlVHlwZSxcbiAgICAgIHJvd0luZGV4LFxuICAgICAga2V5UGF0aCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGNlbGxTZWxlY3Rpb25DaGFuZ2UgPSAoZ3JpZCwgc2VsZWN0ZWRDZWxsID0gbnVsbCkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgc2VsZWN0ZWRDZWxsLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX1NFTEVDVElPTl9DSEFOR0UsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBpdGVtU2VsZWN0aW9uQ2hhbmdlID0gKFxuICBncmlkLFxuICByb3dJbmRleCxcbiAgY3RybFByZXNzZWQgPSBmYWxzZSxcbiAgc2hpZnRQcmVzc2VkID0gZmFsc2UsXG4pID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9JVEVNX1NFTEVDVElPTl9DSEFOR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIHJvd0luZGV4LFxuICAgICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgICAgIGN0cmxQcmVzc2VkLFxuICAgICAgc2hpZnRQcmVzc2VkLFxuICAgIH0pO1xuICAgIFV0aWxzLnNhdmVTZWxlY3RlZEl0ZW1zKGdyaWQsIGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdzZWxlY3RlZEl0ZW1zJ10pKTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdEFsbEl0ZW1zQ2hhbmdlID0gZ3JpZCA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgfSk7XG4gICAgVXRpbHMuc2F2ZVNlbGVjdGVkSXRlbXMoZ3JpZCwgZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ3NlbGVjdGVkSXRlbXMnXSkpO1xuICB9O1xuXG5leHBvcnQgY29uc3QgY2xlYXJTZWxlY3RlZEl0ZW1zID0gZ3JpZCA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0xFQVJfU0VMRUNURURfSVRFTVMsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICB9KTtcbiAgICBVdGlscy5zYXZlU2VsZWN0ZWRJdGVtcyhncmlkLCBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnc2VsZWN0ZWRJdGVtcyddKSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCB0b2dnbGVGaWx0ZXJpbmcgPSBncmlkID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBjb25zdCBpc0ZpbHRlcmluZyA9ICFnZXRTdGF0ZSgpXG4gICAgICAuZGF0YWdyaWRcbiAgICAgIC5nZXRJbihbZ3JpZC5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2lzRmlsdGVyaW5nJ10sIGZhbHNlKTtcbiAgICBVdGlscy5zYXZlSXNGaWx0ZXJpbmcoZ3JpZCwgaXNGaWx0ZXJpbmcpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1RPR0dMRV9GSUxURVJJTkcsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGlzRmlsdGVyaW5nLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgdmFsaWRhdGVFZGl0ZWRSb3dzID0gKGdyaWQsIGNvbHVtbnMpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBjb25zdCBncmlkRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0KGdyaWQuaWQpO1xuICAgIGNvbnN0IGVkaXREYXRhID0gZ3JpZERhdGEuZ2V0KCdlZGl0RGF0YScsIE1hcCgpKTtcbiAgICBsZXQgYWxsR29vZCA9IHRydWU7XG4gICAgZWRpdERhdGEuZm9yRWFjaCgoZWRpdERhdGFSb3csIGRhdGFJZCkgPT4ge1xuICAgICAgY29sdW1ucy5mb3JFYWNoKChjb2wpID0+IHtcbiAgICAgICAgbGV0IHZhbHVlID0gZWRpdERhdGFSb3cuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdmFsdWUgPSBncmlkRGF0YVxuICAgICAgICAgICAgLmdldCgnYWxsRGF0YScpXG4gICAgICAgICAgICAuZmluZChkYXRhID0+IGRhdGEuZ2V0SW4oZ3JpZC5pZEtleVBhdGgpID09PSBkYXRhSWQpXG4gICAgICAgICAgICAuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXNWYWxpZCA9IGVkaXRDZWxsVmFsdWVWYWxpZGF0ZShcbiAgICAgICAgICBncmlkLFxuICAgICAgICAgIGRhdGFJZCxcbiAgICAgICAgICBjb2wudmFsdWVLZXlQYXRoLFxuICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgIGNvbC52YWxpZGF0b3JzLFxuICAgICAgICApKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gICAgICAgIGlmIChhbGxHb29kICYmICFpc1ZhbGlkKSB7XG4gICAgICAgICAgYWxsR29vZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gYWxsR29vZDtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZUVtcHR5Q3JlYXRlZFJvd3MgPSAoZ3JpZCwgY29sdW1ucykgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGNvbnN0IGNyZWF0ZURhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnY3JlYXRlRGF0YSddLCBNYXAoKSk7XG4gICAgY29uc3QgaW5kZXhlcyA9IFtdO1xuICAgIGNyZWF0ZURhdGEuZm9yRWFjaCgoY3JlYXRlRGF0YVJvdywgcm93SW5kZXgpID0+IHtcbiAgICAgIGxldCBpc0VtcHR5ID0gdHJ1ZTtcbiAgICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gY3JlYXRlRGF0YVJvdy5nZXRJbihjb2wudmFsdWVLZXlQYXRoKTtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09ICcnICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgaXNFbXB0eSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChpc0VtcHR5KSB7XG4gICAgICAgIGluZGV4ZXMucHVzaChyb3dJbmRleCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGluZGV4ZXMubGVuZ3RoID4gMCkge1xuICAgICAgcmVtb3ZlTmV3SXRlbXMoZ3JpZCwgaW5kZXhlcykoZGlzcGF0Y2gpO1xuICAgIH1cbiAgfTtcblxuZXhwb3J0IGNvbnN0IHZhbGlkYXRlQ3JlYXRlZFJvd3MgPSAoZ3JpZCwgY29sdW1ucykgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIHJlbW92ZUVtcHR5Q3JlYXRlZFJvd3MoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgICBjb25zdCBjcmVhdGVEYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ2NyZWF0ZURhdGEnXSwgTWFwKCkpO1xuICAgIGxldCBhbGxHb29kID0gdHJ1ZTtcbiAgICBjcmVhdGVEYXRhLmZvckVhY2goKGNyZWF0ZURhdGFSb3csIHJvd0luZGV4KSA9PiB7XG4gICAgICBjb2x1bW5zLmZvckVhY2goKGNvbCkgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGNyZWF0ZURhdGFSb3cuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG4gICAgICAgIGNvbnN0IGlzVmFsaWQgPSBjcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZShcbiAgICAgICAgICBncmlkLFxuICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgIGNvbC52YWx1ZUtleVBhdGgsXG4gICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgY29sLnZhbGlkYXRvcnMsXG4gICAgICAgICkoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgICAgICAgaWYgKGFsbEdvb2QgJiYgIWlzVmFsaWQpIHtcbiAgICAgICAgICBhbGxHb29kID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBhbGxHb29kO1xuICB9O1xuXG5leHBvcnQgY29uc3QgdXBkYXRlRXhpc3RpbmdDZWxsVmFsdWUgPSAoZ3JpZCwgZGF0YUlkLCBrZXlQYXRoLCB2YWx1ZSkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfVVBEQVRFX0VYSVNUSU5HX0NFTExfVkFMVUUsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGRhdGFJZCxcbiAgICAgIGtleVBhdGgsXG4gICAgICB2YWx1ZSxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHNldEVkaXREYXRhID0gKGdyaWQsIGRhdGEsIGNlbGxNZXNzYWdlcyA9IE1hcCgpKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICBkYXRhLFxuICAgICAgY2VsbE1lc3NhZ2VzLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfRURJVF9EQVRBLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3Qgb3BlbkNvbHVtblNldHRpbmdzTW9kYWwgPSBncmlkID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9PUEVOLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBjbG9zZUNvbHVtblNldHRpbmdzTW9kYWwgPSBncmlkID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3Qgc2F2ZUNvbHVtblNldHRpbmdzID0gKGdyaWQsIGhpZGRlbkNvbHVtbnMsIGNvbHVtbk9yZGVyKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBVdGlscy5zYXZlQ29sdW1uU2V0dGluZ3MoZ3JpZCwgaGlkZGVuQ29sdW1ucywgY29sdW1uT3JkZXIpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBjb2x1bW5PcmRlcixcbiAgICB9KTtcbiAgfTtcblxuIl19