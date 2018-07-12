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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5hY3Rpb25zLmpzIl0sIm5hbWVzIjpbIkltbXV0YWJsZSIsIk1hcCIsIlV0aWxzIiwiVFlQRVMiLCJQTEFURk9STV9EQVRBR1JJRF9JTlZBTElEQVRFIiwiUExBVEZPUk1fREFUQUdSSURfQlVTWSIsIlBMQVRGT1JNX0RBVEFHUklEX1JFQURZIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX0RBVEEiLCJQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9TT1JUIiwiUExBVEZPUk1fREFUQUdSSURfU09SVF9DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9SRVNJWkVfQ09MVU1OIiwiUExBVEZPUk1fREFUQUdSSURfRURJVCIsIlBMQVRGT1JNX0RBVEFHUklEX0NBTkNFTCIsIlBMQVRGT1JNX0RBVEFHUklEX1NBVkUiLCJQTEFURk9STV9EQVRBR1JJRF9FWFRFTkRfREFUQSIsIlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfU1VDQ0VTUyIsIlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfUEFSVElBTF9TVUNDRVNTIiwiUExBVEZPUk1fREFUQUdSSURfU0FWRV9GQUlMIiwiUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFIiwiUExBVEZPUk1fREFUQUdSSURfQUREX05FV19JVEVNIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0lURU0iLCJQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU0iLCJQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU1TIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX1NVQ0NFU1MiLCJQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfRkFJTCIsIlBMQVRGT1JNX0RBVEFHUklEX0VESVRfQ0VMTF9WQUxVRV9DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFUyIsIlBMQVRGT1JNX0RBVEFHUklEX0NFTExfSElERV9NRVNTQUdFIiwiUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfU0hPV19NRVNTQUdFIiwiUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfSElERV9NRVNTQUdFIiwiUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfVkFMSURBVEUiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NFTEVDVElPTl9DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9JVEVNX1NFTEVDVElPTl9DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9TRUxFQ1RfQUxMX0lURU1TX0NIQU5HRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NMRUFSX1NFTEVDVEVEX0lURU1TIiwiUExBVEZPUk1fREFUQUdSSURfVE9HR0xFX0ZJTFRFUklORyIsIlBMQVRGT1JNX0RBVEFHUklEX0ZJTFRFUl9EQVRBX0NIQU5HRSIsIlBMQVRGT1JNX0RBVEFHUklEX0FQUExZX0ZJTFRFUlMiLCJQTEFURk9STV9EQVRBR1JJRF9TRVRfRklMVEVSUyIsIlBMQVRGT1JNX0RBVEFHUklEX1VQREFURV9FWElTVElOR19DRUxMX1ZBTFVFIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX0VESVRfREFUQSIsIlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9PUEVOIiwiUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX0NMT1NFIiwiUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX1NBVkUiLCJQTEFURk9STV9EQVRBR1JJRF9GT1JDRV9SRUZSRVNIIiwiaW52YWxpZGF0ZSIsImRpc3BhdGNoIiwiY2hlY2tHcmlkUGFyYW0iLCJncmlkIiwidHlwZSIsImlkIiwiZm9yY2VSZWZyZXNoIiwic2V0VGltZW91dCIsImRvY3VtZW50IiwiY3JlYXRlRXZlbnQiLCJldnQiLCJpbml0RXZlbnQiLCJ3aW5kb3ciLCJkaXNwYXRjaEV2ZW50Iiwic2V0QnVzeSIsInNldFJlYWR5IiwiYXBwbHlGaWx0ZXJzIiwiY29sdW1ucyIsImdldFN0YXRlIiwiZm9yRWFjaCIsImdyaWREYXRhIiwiZGF0YWdyaWQiLCJnZXQiLCJmaWx0ZXJEYXRhIiwiZ2V0SW4iLCJhbGxEYXRhIiwiZGF0YSIsImlzRW1wdHkiLCJkYXRlRm9ybWF0IiwiZ2V0RGF0ZUZvcm1hdCIsInVzZXIiLCJmaWx0ZXIiLCJyb3ciLCJoaXRzIiwiZmlsdGVyVmFsdWUiLCJmaWx0ZXJDb2x1bW4iLCJjb2x1bW4iLCJnZXRDb2x1bW5LZXkiLCJyb3dEYXRhIiwidmFsdWVLZXlQYXRoIiwiZmlsdGVyTWF0Y2hlciIsImdldEZpbHRlck1hdGNoZXIiLCJzaXplIiwic2V0QW5kQXBwbHlGaWx0ZXJzIiwiZmlsdGVyaW5nRGF0YSIsIm5vcm1hbGl6ZUZpbHRlcmluZ0RhdGEiLCJmaWx0ZXJDZWxsVmFsdWVDaGFuZ2UiLCJ2YWx1ZSIsIm9yaWdGaWx0ZXJEYXRhIiwiY29sdW1uS2V5IiwidmFsdWVFbXB0eUNoZWNrZXIiLCJnZXRWYWx1ZUVtcHR5Q2hlY2tlciIsImRlbGV0ZSIsInNldCIsInNhdmVGaWx0ZXJEYXRhIiwiYXBwbHlTb3J0Iiwic29ydERhdGEiLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwiY29sIiwib3JpZ0FsbERhdGEiLCJjb21wYXJhdG9yIiwiZ2V0U29ydENvbXBhcmF0b3IiLCJ2YWx1ZUdldHRlciIsImdldFNvcnRWYWx1ZUdldHRlciIsInNvcnQiLCJhIiwiYiIsInZhbEEiLCJ2YWxCIiwic29ydENoYW5nZSIsIm5ld1NvcnQiLCJzYXZlU29ydERhdGEiLCJzZXREYXRhIiwiY2hlY2tDb2x1bW5zUGFyYW0iLCJjb25maWdEYXRhIiwibG9hZEdyaWRDb25maWciLCJpbW11dGFibGVEYXRhIiwiSXRlcmFibGUiLCJpc0l0ZXJhYmxlIiwiZnJvbUpTIiwic2VsZWN0ZWRJdGVtcyIsImxvYWRTZWxlY3RlZEl0ZW1zIiwiZmluZCIsImRhdGFJdGVtIiwiaWRLZXlQYXRoIiwiaXRlbSIsImNvbmZpZyIsImV4dGVuZERhdGEiLCJyZXNpemVDb2x1bW4iLCJ3aWR0aCIsImNvbHVtbldpZHRocyIsInNhdmVDb2x1bW5XaWR0aHMiLCJlZGl0IiwiY2FuY2VsIiwic2F2ZSIsImNiIiwic2F2ZVN1Y2Nlc3MiLCJzYXZlZEl0ZW1zIiwic2F2ZVBhcnRpYWxTdWNjZXNzIiwic2F2ZUZhaWwiLCJjcmVhdGUiLCJjb2x1bW5EZWZhdWx0VmFsdWVzIiwiYWRkTmV3SXRlbSIsInJlbW92ZUl0ZW0iLCJpbmRleCIsInJlbW92ZU5ld0l0ZW0iLCJyZW1vdmVOZXdJdGVtcyIsImluZGV4ZXMiLCJyZW1vdmUiLCJyZW1vdmVTdWNjZXNzIiwicmVtb3ZlZElkcyIsInJlbW92ZUZhaWwiLCJlZGl0Q2VsbFZhbHVlQ2hhbmdlIiwiZGF0YUlkIiwia2V5UGF0aCIsImVkaXRDZWxsVmFsdWVWYWxpZGF0ZSIsInZhbGlkYXRvcnMiLCJ2YWxpZGF0aW9uU3RhdGUiLCJ2YWxpZCIsInZhbGlkYXRvciIsInVuaXF1ZSIsInVuZGVmaW5lZCIsImVkaXREYXRhIiwiZWRpdERhdGFJdGVtIiwiZWRpdERhdGFJdGVtSWQiLCJmb3VuZEluZGV4IiwiZmluZEluZGV4IiwiZCIsIm1lcmdlRGVlcEluIiwiZmluZGluZyIsImxlbmd0aCIsIm1lc3NhZ2UiLCJ2YWxpZGF0ZVdpdGhSb3dEYXRhIiwibWVyZ2VEZWVwIiwicGFyYW1zIiwiT2JqZWN0IiwidmFsdWVzIiwidmFsaWRhdGUiLCJtZXNzYWdlVmFsdWVzIiwibWVzc2FnZVR5cGUiLCJtZXNzYWdlSWQiLCJjcmVhdGVDZWxsVmFsdWVDaGFuZ2UiLCJyb3dJbmRleCIsImNyZWF0ZUNlbGxWYWx1ZVZhbGlkYXRlIiwiZmluZDIiLCJpIiwiY2VsbFNob3dNZXNzYWdlIiwiY2VsbFNob3dNZXNzYWdlcyIsIm1lc3NhZ2VzIiwiY2VsbEhpZGVNZXNzYWdlIiwiY3JlYXRlQ2VsbFNob3dNZXNzYWdlIiwiY3JlYXRlQ2VsbEhpZGVNZXNzYWdlIiwiY2VsbFNlbGVjdGlvbkNoYW5nZSIsInNlbGVjdGVkQ2VsbCIsIml0ZW1TZWxlY3Rpb25DaGFuZ2UiLCJjdHJsUHJlc3NlZCIsInNoaWZ0UHJlc3NlZCIsInNhdmVTZWxlY3RlZEl0ZW1zIiwic2VsZWN0QWxsSXRlbXNDaGFuZ2UiLCJjbGVhclNlbGVjdGVkSXRlbXMiLCJ0b2dnbGVGaWx0ZXJpbmciLCJpc0ZpbHRlcmluZyIsInNhdmVJc0ZpbHRlcmluZyIsInZhbGlkYXRlRWRpdGVkUm93cyIsImFsbEdvb2QiLCJlZGl0RGF0YVJvdyIsImlzVmFsaWQiLCJyZW1vdmVFbXB0eUNyZWF0ZWRSb3dzIiwiY3JlYXRlRGF0YSIsImNyZWF0ZURhdGFSb3ciLCJwdXNoIiwidmFsaWRhdGVDcmVhdGVkUm93cyIsInVwZGF0ZUV4aXN0aW5nQ2VsbFZhbHVlIiwic2V0RWRpdERhdGEiLCJjZWxsTWVzc2FnZXMiLCJvcGVuQ29sdW1uU2V0dGluZ3NNb2RhbCIsImNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbCIsInNhdmVDb2x1bW5TZXR0aW5ncyIsImhpZGRlbkNvbHVtbnMiLCJjb2x1bW5PcmRlciJdLCJtYXBwaW5ncyI6IkFBQUEsT0FBT0EsU0FBUCxJQUFvQkMsR0FBcEIsUUFBK0IsV0FBL0I7QUFDQSxPQUFPQyxLQUFQLE1BQWtCLGtCQUFsQjs7QUFFQSxPQUFPLElBQU1DLFFBQVE7QUFDbkJDLGdDQUE4Qiw4QkFEWDtBQUVuQkMsMEJBQXdCLHdCQUZMO0FBR25CQywyQkFBeUIseUJBSE47QUFJbkJDLDhCQUE0Qiw0QkFKVDtBQUtuQkMsZ0NBQThCLDhCQUxYO0FBTW5CQyxpQ0FBK0IsK0JBTlo7QUFPbkJDLG1DQUFpQyxpQ0FQZDtBQVFuQkMsMEJBQXdCLHdCQVJMO0FBU25CQyw0QkFBMEIsMEJBVFA7QUFVbkJDLDBCQUF3Qix3QkFWTDtBQVduQkMsaUNBQStCLCtCQVhaO0FBWW5CQyxrQ0FBZ0MsZ0NBWmI7QUFhbkJDLDBDQUF3Qyx3Q0FickI7QUFj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LEdBVHdCO0FBQUEsQ0FBcEI7O0FBV1AsT0FBTyxJQUFNcUwsMEJBQTBCLFNBQTFCQSx1QkFBMEI7QUFBQSxTQUNyQyxVQUFDL0ssUUFBRCxFQUFjO0FBQ1ovQyxVQUFNZ0QsY0FBTixDQUFxQkMsSUFBckI7QUFDQUYsYUFBUztBQUNQRyxZQUFNakQsTUFBTXlDLDRDQURMO0FBRVBTLFVBQUlGLEtBQUtFO0FBRkYsS0FBVDtBQUlELEdBUG9DO0FBQUEsQ0FBaEM7O0FBU1AsT0FBTyxJQUFNNEssMkJBQTJCLFNBQTNCQSx3QkFBMkI7QUFBQSxTQUN0QyxVQUFDaEwsUUFBRCxFQUFjO0FBQ1ovQyxVQUFNZ0QsY0FBTixDQUFxQkMsSUFBckI7QUFDQUYsYUFBUztBQUNQRyxZQUFNakQsTUFBTTBDLDZDQURMO0FBRVBRLFVBQUlGLEtBQUtFO0FBRkYsS0FBVDtBQUlELEdBUHFDO0FBQUEsQ0FBakM7O0FBU1AsT0FBTyxJQUFNNksscUJBQXFCLFNBQXJCQSxrQkFBcUIsQ0FBQy9LLElBQUQsRUFBT2dMLGFBQVAsRUFBc0JDLFdBQXRCO0FBQUEsU0FDaEMsVUFBQ25MLFFBQUQsRUFBYztBQUNaL0MsVUFBTWdELGNBQU4sQ0FBcUJDLElBQXJCO0FBQ0FqRCxVQUFNZ08sa0JBQU4sQ0FBeUIvSyxJQUF6QixFQUErQmdMLGFBQS9CLEVBQThDQyxXQUE5QztBQUNBbkwsYUFBUztBQUNQRyxZQUFNakQsTUFBTTJDLHNDQURMO0FBRVBPLFVBQUlGLEtBQUtFLEVBRkY7QUFHUCtLO0FBSE8sS0FBVDtBQUtELEdBVCtCO0FBQUEsQ0FBM0IiLCJmaWxlIjoiZGF0YWdyaWQuYWN0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJbW11dGFibGUsIHsgTWFwIH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCBVdGlscyBmcm9tICcuL2RhdGFncmlkLnV0aWxzJztcblxuZXhwb3J0IGNvbnN0IFRZUEVTID0ge1xuICBQTEFURk9STV9EQVRBR1JJRF9JTlZBTElEQVRFOiAnUExBVEZPUk1fREFUQUdSSURfSU5WQUxJREFURScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0JVU1k6ICdQTEFURk9STV9EQVRBR1JJRF9CVVNZJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVBRFk6ICdQTEFURk9STV9EQVRBR1JJRF9SRUFEWScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NFVF9EQVRBOiAnUExBVEZPUk1fREFUQUdSSURfU0VUX0RBVEEnLFxuICBQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9TT1JUOiAnUExBVEZPUk1fREFUQUdSSURfQVBQTFlfU09SVCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NPUlRfQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfU09SVF9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRVNJWkVfQ09MVU1OOiAnUExBVEZPUk1fREFUQUdSSURfUkVTSVpFX0NPTFVNTicsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0VESVQ6ICdQTEFURk9STV9EQVRBR1JJRF9FRElUJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0FOQ0VMOiAnUExBVEZPUk1fREFUQUdSSURfQ0FOQ0VMJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0FWRTogJ1BMQVRGT1JNX0RBVEFHUklEX1NBVkUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9FWFRFTkRfREFUQTogJ1BMQVRGT1JNX0RBVEFHUklEX0VYVEVORF9EQVRBJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0FWRV9TVUNDRVNTOiAnUExBVEZPUk1fREFUQUdSSURfU0FWRV9TVUNDRVNTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0FWRV9QQVJUSUFMX1NVQ0NFU1M6ICdQTEFURk9STV9EQVRBR1JJRF9TQVZFX1BBUlRJQUxfU1VDQ0VTUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NBVkVfRkFJTDogJ1BMQVRGT1JNX0RBVEFHUklEX1NBVkVfRkFJTCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NSRUFURTogJ1BMQVRGT1JNX0RBVEFHUklEX0NSRUFURScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0FERF9ORVdfSVRFTTogJ1BMQVRGT1JNX0RBVEFHUklEX0FERF9ORVdfSVRFTScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9JVEVNOiAnUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0lURU0nLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU06ICdQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU0nLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU1TOiAnUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRTogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9TVUNDRVNTOiAnUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX1NVQ0NFU1MnLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfRkFJTDogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9GQUlMJyxcbiAgUExBVEZPUk1fREFUQUdSSURfRURJVF9DRUxMX1ZBTFVFX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX0VESVRfQ0VMTF9WQUxVRV9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0VTOiAnUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0VTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0VMTF9ISURFX01FU1NBR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX0hJREVfTUVTU0FHRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX0hJREVfTUVTU0FHRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX1ZBTElEQVRFOiAnUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfVkFMSURBVEUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NFTEVDVElPTl9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NFTEVDVElPTl9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9JVEVNX1NFTEVDVElPTl9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9JVEVNX1NFTEVDVElPTl9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRUxFQ1RfQUxMX0lURU1TX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX1NFTEVDVF9BTExfSVRFTVNfQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0xFQVJfU0VMRUNURURfSVRFTVM6ICdQTEFURk9STV9EQVRBR1JJRF9DTEVBUl9TRUxFQ1RFRF9JVEVNUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1RPR0dMRV9GSUxURVJJTkc6ICdQTEFURk9STV9EQVRBR1JJRF9UT0dHTEVfRklMVEVSSU5HJyxcbiAgUExBVEZPUk1fREFUQUdSSURfRklMVEVSX0RBVEFfQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfRklMVEVSX0RBVEFfQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQVBQTFlfRklMVEVSUzogJ1BMQVRGT1JNX0RBVEFHUklEX0FQUExZX0ZJTFRFUlMnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRVRfRklMVEVSUzogJ1BMQVRGT1JNX0RBVEFHUklEX1NFVF9GSUxURVJTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfVVBEQVRFX0VYSVNUSU5HX0NFTExfVkFMVUU6ICdQTEFURk9STV9EQVRBR1JJRF9VUERBVEVfRVhJU1RJTkdfQ0VMTF9WQUxVRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NFVF9FRElUX0RBVEE6ICdQTEFURk9STV9EQVRBR1JJRF9TRVRfRURJVF9EQVRBJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX09QRU46ICdQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfT1BFTicsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFOiAnUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX1NBVkUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9GT1JDRV9SRUZSRVNIOiAnUExBVEZPUk1fREFUQUdSSURfRk9SQ0VfUkVGUkVTSCcsXG59O1xuXG5leHBvcnQgY29uc3QgaW52YWxpZGF0ZSA9IGdyaWQgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfSU5WQUxJREFURSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgZm9yY2VSZWZyZXNoID0gKCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIC8vIEZpcmUgcmVzaXplIGV2ZW50IHRvIHJlY2FsY3VsYXRlIGNvbXBvbmVudCBzaXplc1xuICAvLyBhbmQgdG8gZm9yY2UgcmVkcmF3IHRoZSBncmlkXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGlmIChkb2N1bWVudC5jcmVhdGVFdmVudCkge1xuICAgICAgY29uc3QgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKTtcbiAgICAgIGV2dC5pbml0RXZlbnQoJ3Jlc2l6ZScsIHRydWUsIGZhbHNlKTtcbiAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gICAgfVxuICB9LCAxKTtcbiAgZGlzcGF0Y2goeyB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9GT1JDRV9SRUZSRVNIIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldEJ1c3kgPSBncmlkID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0JVU1ksXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHNldFJlYWR5ID0gZ3JpZCA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRUFEWSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgYXBwbHlGaWx0ZXJzID0gKGdyaWQsIGNvbHVtbnMpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBpZiAoIWNvbHVtbnMgfHwgIWNvbHVtbnMuZm9yRWFjaCkgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG4gICAgaWYgKCFncmlkRGF0YSkgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IGZpbHRlckRhdGEgPSBncmlkRGF0YS5nZXRJbihbJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2ZpbHRlckRhdGEnXSwgTWFwKCkpO1xuICAgIGNvbnN0IGFsbERhdGEgPSBncmlkRGF0YS5nZXQoJ2FsbERhdGEnKTtcbiAgICBzZXRCdXN5KGdyaWQpKGRpc3BhdGNoKTtcbiAgICBsZXQgZGF0YTtcbiAgICBpZiAoZmlsdGVyRGF0YS5pc0VtcHR5KCkpIHtcbiAgICAgIGRhdGEgPSBhbGxEYXRhO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkYXRlRm9ybWF0ID0gVXRpbHMuZ2V0RGF0ZUZvcm1hdChncmlkLCBnZXRTdGF0ZSgpLnVzZXIpO1xuICAgICAgZGF0YSA9IGFsbERhdGEuZmlsdGVyKChyb3cpID0+IHtcbiAgICAgICAgbGV0IGhpdHMgPSAwO1xuICAgICAgICBmaWx0ZXJEYXRhLmZvckVhY2goKGZpbHRlclZhbHVlLCBmaWx0ZXJDb2x1bW4pID0+IHtcbiAgICAgICAgICBjb2x1bW5zLmZvckVhY2goKGNvbHVtbikgPT4ge1xuICAgICAgICAgICAgaWYgKFV0aWxzLmdldENvbHVtbktleShjb2x1bW4pID09PSBmaWx0ZXJDb2x1bW4pIHtcbiAgICAgICAgICAgICAgY29uc3Qgcm93RGF0YSA9IHJvdy5nZXRJbihjb2x1bW4udmFsdWVLZXlQYXRoKTtcbiAgICAgICAgICAgICAgaWYgKHJvd0RhdGEgfHwgcm93RGF0YSA9PT0gMCB8fCByb3dEYXRhID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlck1hdGNoZXIgPSBVdGlscy5nZXRGaWx0ZXJNYXRjaGVyKGNvbHVtbiwgZGF0ZUZvcm1hdCk7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlck1hdGNoZXIocm93RGF0YSwgZmlsdGVyVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICBoaXRzICs9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gaGl0cyA9PT0gZmlsdGVyRGF0YS5zaXplO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0FQUExZX0ZJTFRFUlMsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGRhdGEsXG4gICAgfSk7XG4gICAgc2V0UmVhZHkoZ3JpZCkoZGlzcGF0Y2gpO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG5leHBvcnQgY29uc3Qgc2V0QW5kQXBwbHlGaWx0ZXJzID0gKGdyaWQsIGNvbHVtbnMsIGZpbHRlcmluZ0RhdGEpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NFVF9GSUxURVJTLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBmaWx0ZXJpbmdEYXRhOiBVdGlscy5ub3JtYWxpemVGaWx0ZXJpbmdEYXRhKGZpbHRlcmluZ0RhdGEpLFxuICAgIH0pO1xuICAgIGRpc3BhdGNoKGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBmaWx0ZXJDZWxsVmFsdWVDaGFuZ2UgPSAoZ3JpZCwgY29sdW1ucywgY29sdW1uLCB2YWx1ZSkgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGNvbnN0IG9yaWdGaWx0ZXJEYXRhID0gZ2V0U3RhdGUoKVxuICAgICAgLmRhdGFncmlkXG4gICAgICAuZ2V0SW4oW2dyaWQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdmaWx0ZXJEYXRhJ10sIE1hcCgpKTtcbiAgICBjb25zdCBjb2x1bW5LZXkgPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sdW1uKTtcbiAgICBjb25zdCB2YWx1ZUVtcHR5Q2hlY2tlciA9IFV0aWxzLmdldFZhbHVlRW1wdHlDaGVja2VyKGNvbHVtbik7XG4gICAgbGV0IGZpbHRlckRhdGE7XG4gICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbHVlKSkge1xuICAgICAgZmlsdGVyRGF0YSA9IG9yaWdGaWx0ZXJEYXRhLmRlbGV0ZShjb2x1bW5LZXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaWx0ZXJEYXRhID0gb3JpZ0ZpbHRlckRhdGEuc2V0KGNvbHVtbktleSwgdmFsdWUpO1xuICAgIH1cbiAgICBVdGlscy5zYXZlRmlsdGVyRGF0YShncmlkLCBmaWx0ZXJEYXRhKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9GSUxURVJfREFUQV9DSEFOR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGZpbHRlckRhdGEsXG4gICAgfSk7XG4gICAgYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBhcHBseVNvcnQgPSAoZ3JpZCwgY29sdW1ucykgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGlmICghY29sdW1ucyB8fCAhY29sdW1ucy5mb3JFYWNoKSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3QgZ3JpZERhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldChncmlkLmlkKTtcbiAgICBpZiAoIWdyaWREYXRhKSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3Qgc29ydERhdGEgPSBncmlkRGF0YS5nZXRJbihbJ2NvbmZpZycsICdzb3J0aW5nRGF0YSddKTtcbiAgICBpZiAoIXNvcnREYXRhKSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3Qgc29ydENvbHVtbiA9IHNvcnREYXRhLmdldCgnc29ydENvbHVtbicpO1xuICAgIGlmICghc29ydENvbHVtbikgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IHNvcnRPcmRlciA9IHNvcnREYXRhLmdldCgnc29ydE9yZGVyJywgJ2FzYycpO1xuICAgIGxldCBjb2x1bW47XG4gICAgY29sdW1ucy5mb3JFYWNoKChjb2wpID0+IHtcbiAgICAgIGlmIChVdGlscy5nZXRDb2x1bW5LZXkoY29sKSA9PT0gc29ydENvbHVtbikge1xuICAgICAgICBjb2x1bW4gPSBjb2w7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKCFjb2x1bW4pIHJldHVybiBmYWxzZTtcblxuICAgIHNldEJ1c3koZ3JpZCkoZGlzcGF0Y2gpO1xuICAgIGNvbnN0IG9yaWdBbGxEYXRhID0gZ3JpZERhdGEuZ2V0KCdhbGxEYXRhJyk7XG4gICAgY29uc3QgY29tcGFyYXRvciA9IFV0aWxzLmdldFNvcnRDb21wYXJhdG9yKGNvbHVtbik7XG4gICAgY29uc3QgdmFsdWVHZXR0ZXIgPSBVdGlscy5nZXRTb3J0VmFsdWVHZXR0ZXIoY29sdW1uKTtcbiAgICBjb25zdCB2YWx1ZUVtcHR5Q2hlY2tlciA9IFV0aWxzLmdldFZhbHVlRW1wdHlDaGVja2VyKGNvbHVtbik7XG4gICAgY29uc3QgYWxsRGF0YSA9IG9yaWdBbGxEYXRhLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIGNvbnN0IHZhbEEgPSB2YWx1ZUdldHRlcihhKTtcbiAgICAgIGNvbnN0IHZhbEIgPSB2YWx1ZUdldHRlcihiKTtcbiAgICAgIGlmIChzb3J0T3JkZXIgPT09ICdhc2MnKSB7XG4gICAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxBKSkgcmV0dXJuIC0xO1xuICAgICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQikpIHJldHVybiAxO1xuICAgICAgICByZXR1cm4gY29tcGFyYXRvcih2YWxBLCB2YWxCKTtcbiAgICAgIH1cbiAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxBKSkgcmV0dXJuIDE7XG4gICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQikpIHJldHVybiAtMTtcbiAgICAgIHJldHVybiBjb21wYXJhdG9yKHZhbEIsIHZhbEEpO1xuICAgIH0pO1xuICAgIGxldCBkYXRhO1xuICAgIC8vIFNvcnQgYWxzbyBmaWx0ZXJlZCBkYXRhIHNlcGFyYXRlbHlcbiAgICBpZiAoZ3JpZERhdGEuZ2V0SW4oWydjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdpc0ZpbHRlcmluZyddLCBmYWxzZSkpIHtcbiAgICAgIGRhdGEgPSBncmlkRGF0YS5nZXQoJ2RhdGEnKS5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbEEgPSB2YWx1ZUdldHRlcihhKTtcbiAgICAgICAgY29uc3QgdmFsQiA9IHZhbHVlR2V0dGVyKGIpO1xuICAgICAgICBpZiAoc29ydE9yZGVyID09PSAnYXNjJykge1xuICAgICAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxBKSkgcmV0dXJuIC0xO1xuICAgICAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxCKSkgcmV0dXJuIDE7XG4gICAgICAgICAgcmV0dXJuIGNvbXBhcmF0b3IodmFsQSwgdmFsQik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEEpKSByZXR1cm4gMTtcbiAgICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEIpKSByZXR1cm4gLTE7XG4gICAgICAgIHJldHVybiBjb21wYXJhdG9yKHZhbEIsIHZhbEEpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGEgPSBhbGxEYXRhO1xuICAgIH1cbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9BUFBMWV9TT1JULFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBkYXRhLFxuICAgICAgYWxsRGF0YSxcbiAgICB9KTtcbiAgICBzZXRSZWFkeShncmlkKShkaXNwYXRjaCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBzb3J0Q2hhbmdlID0gKGdyaWQsIGNvbHVtbnMsIGNvbHVtbiwgbmV3U29ydCkgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGNvbnN0IHNvcnRPcmRlciA9IG5ld1NvcnQgfHwgJ2FzYyc7XG4gICAgY29uc3Qgc29ydENvbHVtbiA9IFV0aWxzLmdldENvbHVtbktleShjb2x1bW4pO1xuICAgIFV0aWxzLnNhdmVTb3J0RGF0YShncmlkLCB7IHNvcnRDb2x1bW4sIHNvcnRPcmRlciB9KTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TT1JUX0NIQU5HRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgc29ydENvbHVtbixcbiAgICAgIHNvcnRPcmRlcixcbiAgICB9KTtcbiAgICBhcHBseVNvcnQoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHNldERhdGEgPSAoZ3JpZCwgY29sdW1ucywgZGF0YSkgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIFV0aWxzLmNoZWNrQ29sdW1uc1BhcmFtKGNvbHVtbnMpO1xuICAgIGNvbnN0IGNvbmZpZ0RhdGEgPSBVdGlscy5sb2FkR3JpZENvbmZpZyhncmlkLCBjb2x1bW5zKTtcbiAgICBjb25zdCBpbW11dGFibGVEYXRhID0gSW1tdXRhYmxlLkl0ZXJhYmxlLmlzSXRlcmFibGUoZGF0YSkgPyBkYXRhIDogSW1tdXRhYmxlLmZyb21KUyhkYXRhKTtcbiAgICBjb25zdCBzZWxlY3RlZEl0ZW1zID0gVXRpbHMubG9hZFNlbGVjdGVkSXRlbXMoZ3JpZCkuZmlsdGVyKGl0ZW0gPT4gKFxuICAgICAgISFpbW11dGFibGVEYXRhLmZpbmQoZGF0YUl0ZW0gPT4gZGF0YUl0ZW0uZ2V0SW4oZ3JpZC5pZEtleVBhdGgpID09PSBpdGVtKVxuICAgICkpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NFVF9EQVRBLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBkYXRhOiBpbW11dGFibGVEYXRhLFxuICAgICAgY29uZmlnOiBjb25maWdEYXRhLFxuICAgICAgc2VsZWN0ZWRJdGVtcyxcbiAgICB9KTtcbiAgICBhcHBseUZpbHRlcnMoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgICBhcHBseVNvcnQoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGV4dGVuZERhdGEgPSAoZ3JpZCwgY29sdW1ucywgZGF0YSkgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGNvbnN0IGltbXV0YWJsZURhdGEgPSBJbW11dGFibGUuSXRlcmFibGUuaXNJdGVyYWJsZShkYXRhKSA/IGRhdGEgOiBJbW11dGFibGUuZnJvbUpTKGRhdGEpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0VYVEVORF9EQVRBLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBkYXRhOiBpbW11dGFibGVEYXRhLFxuICAgIH0pO1xuICAgIGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICAgIGFwcGx5U29ydChncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICB9O1xuXG5leHBvcnQgY29uc3QgcmVzaXplQ29sdW1uID0gKGdyaWQsIGNvbHVtbktleSwgd2lkdGgpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBjb25zdCBjb2x1bW5XaWR0aHMgPSBnZXRTdGF0ZSgpXG4gICAgICAuZGF0YWdyaWRcbiAgICAgIC5nZXRJbihbZ3JpZC5pZCwgJ2NvbmZpZycsICdjb2x1bW5XaWR0aHMnXSwgTWFwKCkpXG4gICAgICAuc2V0KGNvbHVtbktleSwgd2lkdGgpO1xuICAgIFV0aWxzLnNhdmVDb2x1bW5XaWR0aHMoZ3JpZCwgY29sdW1uV2lkdGhzKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRVNJWkVfQ09MVU1OLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBjb2x1bW5XaWR0aHMsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBlZGl0ID0gZ3JpZCA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9FRElULFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBjYW5jZWwgPSBncmlkID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NBTkNFTCxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3Qgc2F2ZSA9IChncmlkLCBjYiA9ICgpID0+IHt9KSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TQVZFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgfSk7XG4gICAgY2IoKTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHNhdmVTdWNjZXNzID0gKGdyaWQsIGNvbHVtbnMsIHNhdmVkSXRlbXMpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TQVZFX1NVQ0NFU1MsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgICBzYXZlZEl0ZW1zLFxuICAgIH0pO1xuICAgIGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICAgIGFwcGx5U29ydChncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICB9O1xuXG5leHBvcnQgY29uc3Qgc2F2ZVBhcnRpYWxTdWNjZXNzID0gKGdyaWQsIGNvbHVtbnMsIHNhdmVkSXRlbXMpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TQVZFX1BBUlRJQUxfU1VDQ0VTUyxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgICAgIHNhdmVkSXRlbXMsXG4gICAgfSk7XG4gICAgYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gICAgYXBwbHlTb3J0KGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBzYXZlRmFpbCA9IGdyaWQgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0FWRV9GQUlMLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGUgPSAoZ3JpZCwgY29sdW1uRGVmYXVsdFZhbHVlcykgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBjb2x1bW5EZWZhdWx0VmFsdWVzLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgYWRkTmV3SXRlbSA9IChncmlkLCBjb2x1bW5EZWZhdWx0VmFsdWVzKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9BRERfTkVXX0lURU0sXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGNvbHVtbkRlZmF1bHRWYWx1ZXMsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVJdGVtID0gKGdyaWQsIGluZGV4KSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfSVRFTSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgaW5kZXgsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVOZXdJdGVtID0gKGdyaWQsIGluZGV4KSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU0sXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGluZGV4LFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlTmV3SXRlbXMgPSAoZ3JpZCwgaW5kZXhlcykgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNUyxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgaW5kZXhlcyxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZSA9IChncmlkLCBjYiA9ICgpID0+IHt9KSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkUsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICB9KTtcbiAgICBjYigpO1xuICB9O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlU3VjY2VzcyA9IChncmlkLCByZW1vdmVkSWRzKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfU1VDQ0VTUyxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgICAgIHJlbW92ZWRJZHMsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVGYWlsID0gZ3JpZCA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfRkFJTCxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgZWRpdENlbGxWYWx1ZUNoYW5nZSA9IChncmlkLCBkYXRhSWQsIGtleVBhdGgsIHZhbHVlKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9FRElUX0NFTExfVkFMVUVfQ0hBTkdFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBkYXRhSWQsXG4gICAgICBrZXlQYXRoLFxuICAgICAgdmFsdWUsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBlZGl0Q2VsbFZhbHVlVmFsaWRhdGUgPSAoXG4gIGdyaWQsXG4gIGRhdGFJZCxcbiAga2V5UGF0aCxcbiAgdmFsdWUsXG4gIHZhbGlkYXRvcnMgPSBbXSxcbikgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGxldCB2YWxpZGF0aW9uU3RhdGUgPSB7IHZhbGlkOiB0cnVlIH07XG4gICAgdmFsaWRhdG9ycy5mb3JFYWNoKCh2YWxpZGF0b3IpID0+IHtcbiAgICAgIGlmICh2YWxpZGF0aW9uU3RhdGUudmFsaWQpIHtcbiAgICAgICAgaWYgKHZhbGlkYXRvci51bmlxdWUpIHtcbiAgICAgICAgICBpZiAodmFsdWUgIT09ICcnIHx8IHZhbHVlICE9PSBudWxsIHx8IHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIGNvbWJpbmUgcmVhbCBkYXRhIHdpdGggY3VycmVudCB1bnNhdmVkIGVkaXRlZCBkYXRhXG4gICAgICAgICAgICBjb25zdCBncmlkRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0KGdyaWQuaWQpO1xuICAgICAgICAgICAgY29uc3QgZWRpdERhdGEgPSBncmlkRGF0YS5nZXQoJ2VkaXREYXRhJyk7XG4gICAgICAgICAgICBsZXQgYWxsRGF0YSA9IGdyaWREYXRhLmdldCgnYWxsRGF0YScpO1xuICAgICAgICAgICAgaWYgKGVkaXREYXRhKSB7XG4gICAgICAgICAgICAgIGVkaXREYXRhLmZvckVhY2goKGVkaXREYXRhSXRlbSwgZWRpdERhdGFJdGVtSWQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3VuZEluZGV4ID1cbiAgICAgICAgICAgICAgICAgIGFsbERhdGEuZmluZEluZGV4KGQgPT4gZC5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGVkaXREYXRhSXRlbUlkKTtcbiAgICAgICAgICAgICAgICBpZiAoZm91bmRJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgIGFsbERhdGEgPSBhbGxEYXRhLm1lcmdlRGVlcEluKFtmb3VuZEluZGV4XSwgZWRpdERhdGFJdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gZGV0ZXJtaW5lIHVuaXF1ZW5lc3NcbiAgICAgICAgICAgIGNvbnN0IGZpbmRpbmcgPSBhbGxEYXRhLmZpbmQoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgaWYgKGdyaWQuaWRLZXlQYXRoLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIC8vIGRvbid0IHNlbGYgY29tcGFyZVxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmdldEluKGdyaWQuaWRLZXlQYXRoKSA9PT0gZGF0YUlkKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBpdGVtLmdldEluKGtleVBhdGgpID09PSB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGZpbmRpbmcpIHtcbiAgICAgICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0ge1xuICAgICAgICAgICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnVmFsaWRhdGlvbi5VbmlxdWUnLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh2YWxpZGF0b3IudmFsaWRhdGVXaXRoUm93RGF0YSkge1xuICAgICAgICAgIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG4gICAgICAgICAgY29uc3QgZWRpdERhdGEgPSBncmlkRGF0YS5nZXRJbihbJ2VkaXREYXRhJywgZGF0YUlkXSwgTWFwKCkpO1xuICAgICAgICAgIGxldCByb3dEYXRhID0gZ3JpZERhdGEuZ2V0KCdhbGxEYXRhJykuZmluZChpdGVtID0+IGl0ZW0uZ2V0SW4oZ3JpZC5pZEtleVBhdGgpID09PSBkYXRhSWQpO1xuICAgICAgICAgIGlmIChyb3dEYXRhKSB7XG4gICAgICAgICAgICByb3dEYXRhID0gcm93RGF0YS5tZXJnZURlZXAoZWRpdERhdGEpO1xuICAgICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0gdmFsaWRhdG9yLnZhbGlkYXRlV2l0aFJvd0RhdGEodmFsdWUsIHJvd0RhdGEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBwYXJhbXMgPSB2YWxpZGF0b3IucGFyYW1zID8gT2JqZWN0LnZhbHVlcyh2YWxpZGF0b3IucGFyYW1zKSA6IFtdO1xuICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZSh2YWx1ZSwgLi4ucGFyYW1zKTtcbiAgICAgICAgICBpZiAodmFsaWRhdG9yLnBhcmFtcykge1xuICAgICAgICAgICAgdmFsaWRhdGlvblN0YXRlLm1lc3NhZ2VWYWx1ZXMgPSB2YWxpZGF0b3IucGFyYW1zO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICh2YWxpZGF0aW9uU3RhdGUudmFsaWQpIHtcbiAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0VMTF9ISURFX01FU1NBR0UsXG4gICAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgICBtZXNzYWdlVHlwZTogJ2Vycm9yJyxcbiAgICAgICAgZGF0YUlkLFxuICAgICAgICBrZXlQYXRoLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0UsXG4gICAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgICBtZXNzYWdlVHlwZTogJ2Vycm9yJyxcbiAgICAgICAgZGF0YUlkLFxuICAgICAgICBrZXlQYXRoLFxuICAgICAgICBtZXNzYWdlSWQ6IHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlLFxuICAgICAgICBtZXNzYWdlVmFsdWVzOiB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZVZhbHVlcyxcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdmFsaWRhdGlvblN0YXRlLnZhbGlkO1xuICB9O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlID0gKGdyaWQsIHJvd0luZGV4LCBrZXlQYXRoLCB2YWx1ZSkgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfQ0hBTkdFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICByb3dJbmRleCxcbiAgICAgIGtleVBhdGgsXG4gICAgICB2YWx1ZSxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNlbGxWYWx1ZVZhbGlkYXRlID0gKGdyaWQsIHJvd0luZGV4LCBrZXlQYXRoLCB2YWx1ZSwgdmFsaWRhdG9ycyA9IFtdKSA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgbGV0IHZhbGlkYXRpb25TdGF0ZSA9IHsgdmFsaWQ6IHRydWUgfTtcbiAgICB2YWxpZGF0b3JzLmZvckVhY2goKHZhbGlkYXRvcikgPT4ge1xuICAgICAgaWYgKHZhbGlkYXRpb25TdGF0ZS52YWxpZCkge1xuICAgICAgICBpZiAodmFsaWRhdG9yLnVuaXF1ZSkge1xuICAgICAgICAgIGlmICh2YWx1ZSAhPT0gJycgfHwgdmFsdWUgIT09IG51bGwgfHwgdmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3QgZmluZGluZyA9IGdldFN0YXRlKClcbiAgICAgICAgICAgICAgLmRhdGFncmlkXG4gICAgICAgICAgICAgIC5nZXRJbihbZ3JpZC5pZCwgJ2FsbERhdGEnXSlcbiAgICAgICAgICAgICAgLmZpbmQoaXRlbSA9PiBpdGVtLmdldEluKGtleVBhdGgpID09PSB2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoZmluZGluZykge1xuICAgICAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgdmFsaWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdWYWxpZGF0aW9uLlVuaXF1ZScsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zdCBmaW5kMiA9IGdldFN0YXRlKClcbiAgICAgICAgICAgICAgICAuZGF0YWdyaWRcbiAgICAgICAgICAgICAgICAuZ2V0SW4oW2dyaWQuaWQsICdjcmVhdGVEYXRhJ10pXG4gICAgICAgICAgICAgICAgLmZpbmQoKGl0ZW0sIGkpID0+IGkgIT09IHJvd0luZGV4ICYmIGl0ZW0uZ2V0SW4oa2V5UGF0aCkgPT09IHZhbHVlKTtcbiAgICAgICAgICAgICAgaWYgKGZpbmQyKSB7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0ge1xuICAgICAgICAgICAgICAgICAgdmFsaWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ1ZhbGlkYXRpb24uVW5pcXVlJyxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHZhbGlkYXRvci52YWxpZGF0ZVdpdGhSb3dEYXRhKSB7XG4gICAgICAgICAgY29uc3Qgcm93RGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdjcmVhdGVEYXRhJywgcm93SW5kZXhdKTtcbiAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB2YWxpZGF0b3IudmFsaWRhdGVXaXRoUm93RGF0YSh2YWx1ZSwgcm93RGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgcGFyYW1zID0gdmFsaWRhdG9yLnBhcmFtcyA/IE9iamVjdC52YWx1ZXModmFsaWRhdG9yLnBhcmFtcykgOiBbXTtcbiAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB2YWxpZGF0b3IudmFsaWRhdGUodmFsdWUsIC4uLnBhcmFtcyk7XG4gICAgICAgICAgaWYgKHZhbGlkYXRvci5wYXJhbXMpIHtcbiAgICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlVmFsdWVzID0gdmFsaWRhdG9yLnBhcmFtcztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAodmFsaWRhdGlvblN0YXRlLnZhbGlkKSB7XG4gICAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX0hJREVfTUVTU0FHRSxcbiAgICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICAgIG1lc3NhZ2VUeXBlOiAnZXJyb3InLFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAga2V5UGF0aCxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRSxcbiAgICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICAgIG1lc3NhZ2VUeXBlOiAnZXJyb3InLFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAga2V5UGF0aCxcbiAgICAgICAgbWVzc2FnZUlkOiB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZSxcbiAgICAgICAgbWVzc2FnZVZhbHVlczogdmFsaWRhdGlvblN0YXRlLm1lc3NhZ2VWYWx1ZXMsXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbGlkYXRpb25TdGF0ZS52YWxpZDtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGNlbGxTaG93TWVzc2FnZSA9IChncmlkLCBtZXNzYWdlVHlwZSwgZGF0YUlkLCBrZXlQYXRoLCBtZXNzYWdlSWQsIG1lc3NhZ2VWYWx1ZXMpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBtZXNzYWdlVHlwZSxcbiAgICAgIGRhdGFJZCxcbiAgICAgIGtleVBhdGgsXG4gICAgICBtZXNzYWdlSWQsXG4gICAgICBtZXNzYWdlVmFsdWVzLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgY2VsbFNob3dNZXNzYWdlcyA9IChncmlkLCBtZXNzYWdlcykgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0VTLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBtZXNzYWdlcyxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGNlbGxIaWRlTWVzc2FnZSA9IChncmlkLCBtZXNzYWdlVHlwZSA9IG51bGwsIGRhdGFJZCA9IG51bGwsIGtleVBhdGggPSBudWxsKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgbWVzc2FnZVR5cGUsXG4gICAgICBkYXRhSWQsXG4gICAgICBrZXlQYXRoLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQ2VsbFNob3dNZXNzYWdlID0gKFxuICBncmlkLFxuICBtZXNzYWdlVHlwZSxcbiAgcm93SW5kZXgsXG4gIGtleVBhdGgsXG4gIG1lc3NhZ2VJZCxcbiAgbWVzc2FnZVZhbHVlcyxcbikgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfU0hPV19NRVNTQUdFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBtZXNzYWdlVHlwZSxcbiAgICAgIHJvd0luZGV4LFxuICAgICAga2V5UGF0aCxcbiAgICAgIG1lc3NhZ2VJZCxcbiAgICAgIG1lc3NhZ2VWYWx1ZXMsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVDZWxsSGlkZU1lc3NhZ2UgPSAoZ3JpZCwgbWVzc2FnZVR5cGUgPSBudWxsLCByb3dJbmRleCA9IG51bGwsIGtleVBhdGggPSBudWxsKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9ISURFX01FU1NBR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIG1lc3NhZ2VUeXBlLFxuICAgICAgcm93SW5kZXgsXG4gICAgICBrZXlQYXRoLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgY2VsbFNlbGVjdGlvbkNoYW5nZSA9IChncmlkLCBzZWxlY3RlZENlbGwgPSBudWxsKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICBzZWxlY3RlZENlbGwsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0VMRUNUSU9OX0NIQU5HRSxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGl0ZW1TZWxlY3Rpb25DaGFuZ2UgPSAoXG4gIGdyaWQsXG4gIHJvd0luZGV4LFxuICBjdHJsUHJlc3NlZCA9IGZhbHNlLFxuICBzaGlmdFByZXNzZWQgPSBmYWxzZSxcbikgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0lURU1fU0VMRUNUSU9OX0NIQU5HRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgcm93SW5kZXgsXG4gICAgICBpZEtleVBhdGg6IGdyaWQuaWRLZXlQYXRoLFxuICAgICAgY3RybFByZXNzZWQsXG4gICAgICBzaGlmdFByZXNzZWQsXG4gICAgfSk7XG4gICAgVXRpbHMuc2F2ZVNlbGVjdGVkSXRlbXMoZ3JpZCwgZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ3NlbGVjdGVkSXRlbXMnXSkpO1xuICB9O1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0QWxsSXRlbXNDaGFuZ2UgPSBncmlkID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRUxFQ1RfQUxMX0lURU1TX0NIQU5HRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgICB9KTtcbiAgICBVdGlscy5zYXZlU2VsZWN0ZWRJdGVtcyhncmlkLCBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnc2VsZWN0ZWRJdGVtcyddKSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBjbGVhclNlbGVjdGVkSXRlbXMgPSBncmlkID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DTEVBUl9TRUxFQ1RFRF9JVEVNUyxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgIH0pO1xuICAgIFV0aWxzLnNhdmVTZWxlY3RlZEl0ZW1zKGdyaWQsIGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdzZWxlY3RlZEl0ZW1zJ10pKTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IHRvZ2dsZUZpbHRlcmluZyA9IGdyaWQgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGNvbnN0IGlzRmlsdGVyaW5nID0gIWdldFN0YXRlKClcbiAgICAgIC5kYXRhZ3JpZFxuICAgICAgLmdldEluKFtncmlkLmlkLCAnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnaXNGaWx0ZXJpbmcnXSwgZmFsc2UpO1xuICAgIFV0aWxzLnNhdmVJc0ZpbHRlcmluZyhncmlkLCBpc0ZpbHRlcmluZyk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfVE9HR0xFX0ZJTFRFUklORyxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgaXNGaWx0ZXJpbmcsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUVkaXRlZFJvd3MgPSAoZ3JpZCwgY29sdW1ucykgPT5cbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG4gICAgY29uc3QgZWRpdERhdGEgPSBncmlkRGF0YS5nZXQoJ2VkaXREYXRhJywgTWFwKCkpO1xuICAgIGxldCBhbGxHb29kID0gdHJ1ZTtcbiAgICBlZGl0RGF0YS5mb3JFYWNoKChlZGl0RGF0YVJvdywgZGF0YUlkKSA9PiB7XG4gICAgICBjb2x1bW5zLmZvckVhY2goKGNvbCkgPT4ge1xuICAgICAgICBsZXQgdmFsdWUgPSBlZGl0RGF0YVJvdy5nZXRJbihjb2wudmFsdWVLZXlQYXRoKTtcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB2YWx1ZSA9IGdyaWREYXRhXG4gICAgICAgICAgICAuZ2V0KCdhbGxEYXRhJylcbiAgICAgICAgICAgIC5maW5kKGRhdGEgPT4gZGF0YS5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGRhdGFJZClcbiAgICAgICAgICAgIC5nZXRJbihjb2wudmFsdWVLZXlQYXRoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpc1ZhbGlkID0gZWRpdENlbGxWYWx1ZVZhbGlkYXRlKFxuICAgICAgICAgIGdyaWQsXG4gICAgICAgICAgZGF0YUlkLFxuICAgICAgICAgIGNvbC52YWx1ZUtleVBhdGgsXG4gICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgY29sLnZhbGlkYXRvcnMsXG4gICAgICAgICkoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgICAgICAgaWYgKGFsbEdvb2QgJiYgIWlzVmFsaWQpIHtcbiAgICAgICAgICBhbGxHb29kID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBhbGxHb29kO1xuICB9O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlRW1wdHlDcmVhdGVkUm93cyA9IChncmlkLCBjb2x1bW5zKSA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgY29uc3QgY3JlYXRlRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdjcmVhdGVEYXRhJ10sIE1hcCgpKTtcbiAgICBjb25zdCBpbmRleGVzID0gW107XG4gICAgY3JlYXRlRGF0YS5mb3JFYWNoKChjcmVhdGVEYXRhUm93LCByb3dJbmRleCkgPT4ge1xuICAgICAgbGV0IGlzRW1wdHkgPSB0cnVlO1xuICAgICAgY29sdW1ucy5mb3JFYWNoKChjb2wpID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBjcmVhdGVEYXRhUm93LmdldEluKGNvbC52YWx1ZUtleVBhdGgpO1xuICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gJycgJiYgdmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICBpc0VtcHR5ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKGlzRW1wdHkpIHtcbiAgICAgICAgaW5kZXhlcy5wdXNoKHJvd0luZGV4KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoaW5kZXhlcy5sZW5ndGggPiAwKSB7XG4gICAgICByZW1vdmVOZXdJdGVtcyhncmlkLCBpbmRleGVzKShkaXNwYXRjaCk7XG4gICAgfVxuICB9O1xuXG5leHBvcnQgY29uc3QgdmFsaWRhdGVDcmVhdGVkUm93cyA9IChncmlkLCBjb2x1bW5zKSA9PlxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgcmVtb3ZlRW1wdHlDcmVhdGVkUm93cyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICAgIGNvbnN0IGNyZWF0ZURhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnY3JlYXRlRGF0YSddLCBNYXAoKSk7XG4gICAgbGV0IGFsbEdvb2QgPSB0cnVlO1xuICAgIGNyZWF0ZURhdGEuZm9yRWFjaCgoY3JlYXRlRGF0YVJvdywgcm93SW5kZXgpID0+IHtcbiAgICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gY3JlYXRlRGF0YVJvdy5nZXRJbihjb2wudmFsdWVLZXlQYXRoKTtcbiAgICAgICAgY29uc3QgaXNWYWxpZCA9IGNyZWF0ZUNlbGxWYWx1ZVZhbGlkYXRlKFxuICAgICAgICAgIGdyaWQsXG4gICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgY29sLnZhbHVlS2V5UGF0aCxcbiAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICBjb2wudmFsaWRhdG9ycyxcbiAgICAgICAgKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICAgICAgICBpZiAoYWxsR29vZCAmJiAhaXNWYWxpZCkge1xuICAgICAgICAgIGFsbEdvb2QgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGFsbEdvb2Q7XG4gIH07XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVFeGlzdGluZ0NlbGxWYWx1ZSA9IChncmlkLCBkYXRhSWQsIGtleVBhdGgsIHZhbHVlKSA9PlxuICAoZGlzcGF0Y2gpID0+IHtcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9VUERBVEVfRVhJU1RJTkdfQ0VMTF9WQUxVRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgZGF0YUlkLFxuICAgICAga2V5UGF0aCxcbiAgICAgIHZhbHVlLFxuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3Qgc2V0RWRpdERhdGEgPSAoZ3JpZCwgZGF0YSwgY2VsbE1lc3NhZ2VzID0gTWFwKCkpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIGRhdGEsXG4gICAgICBjZWxsTWVzc2FnZXMsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NFVF9FRElUX0RBVEEsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBvcGVuQ29sdW1uU2V0dGluZ3NNb2RhbCA9IGdyaWQgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX09QRU4sXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbCA9IGdyaWQgPT5cbiAgKGRpc3BhdGNoKSA9PiB7XG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX0NMT1NFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBzYXZlQ29sdW1uU2V0dGluZ3MgPSAoZ3JpZCwgaGlkZGVuQ29sdW1ucywgY29sdW1uT3JkZXIpID0+XG4gIChkaXNwYXRjaCkgPT4ge1xuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICAgIFV0aWxzLnNhdmVDb2x1bW5TZXR0aW5ncyhncmlkLCBoaWRkZW5Db2x1bW5zLCBjb2x1bW5PcmRlcik7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX1NBVkUsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIGNvbHVtbk9yZGVyLFxuICAgIH0pO1xuICB9O1xuXG4iXX0=