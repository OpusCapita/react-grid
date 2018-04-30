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
  PLATFORM_DATAGRID_COLUMN_SETTINGS_SAVE: 'PLATFORM_DATAGRID_COLUMN_SETTINGS_SAVE'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5hY3Rpb25zLmpzIl0sIm5hbWVzIjpbIkltbXV0YWJsZSIsIk1hcCIsIlV0aWxzIiwiVFlQRVMiLCJQTEFURk9STV9EQVRBR1JJRF9JTlZBTElEQVRFIiwiUExBVEZPUk1fREFUQUdSSURfQlVTWSIsIlBMQVRGT1JNX0RBVEFHUklEX1JFQURZIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX0RBVEEiLCJQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9TT1JUIiwiUExBVEZPUk1fREFUQUdSSURfU09SVF9DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9SRVNJWkVfQ09MVU1OIiwiUExBVEZPUk1fREFUQUdSSURfRURJVCIsIlBMQVRGT1JNX0RBVEFHUklEX0NBTkNFTCIsIlBMQVRGT1JNX0RBVEFHUklEX1NBVkUiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFX1NVQ0NFU1MiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFX1BBUlRJQUxfU1VDQ0VTUyIsIlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfRkFJTCIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURSIsIlBMQVRGT1JNX0RBVEFHUklEX0FERF9ORVdfSVRFTSIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTSIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTVMiLCJQTEFURk9STV9EQVRBR1JJRF9SRU1PVkUiLCJQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfU1VDQ0VTUyIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9GQUlMIiwiUExBVEZPUk1fREFUQUdSSURfRURJVF9DRUxMX1ZBTFVFX0NIQU5HRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFIiwiUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0VTIiwiUExBVEZPUk1fREFUQUdSSURfQ0VMTF9ISURFX01FU1NBR0UiLCJQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9TSE9XX01FU1NBR0UiLCJQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9ISURFX01FU1NBR0UiLCJQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9WQUxJREFURSIsIlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0VMRUNUSU9OX0NIQU5HRSIsIlBMQVRGT1JNX0RBVEFHUklEX0lURU1fU0VMRUNUSU9OX0NIQU5HRSIsIlBMQVRGT1JNX0RBVEFHUklEX1NFTEVDVF9BTExfSVRFTVNfQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfQ0xFQVJfU0VMRUNURURfSVRFTVMiLCJQTEFURk9STV9EQVRBR1JJRF9UT0dHTEVfRklMVEVSSU5HIiwiUExBVEZPUk1fREFUQUdSSURfRklMVEVSX0RBVEFfQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfQVBQTFlfRklMVEVSUyIsIlBMQVRGT1JNX0RBVEFHUklEX1VQREFURV9FWElTVElOR19DRUxMX1ZBTFVFIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX0VESVRfREFUQSIsIlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9PUEVOIiwiUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX0NMT1NFIiwiUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX1NBVkUiLCJpbnZhbGlkYXRlIiwiZGlzcGF0Y2giLCJjaGVja0dyaWRQYXJhbSIsImdyaWQiLCJ0eXBlIiwiaWQiLCJzZXRCdXN5Iiwic2V0UmVhZHkiLCJhcHBseUZpbHRlcnMiLCJjb2x1bW5zIiwiZ2V0U3RhdGUiLCJmb3JFYWNoIiwiZ3JpZERhdGEiLCJkYXRhZ3JpZCIsImdldCIsImZpbHRlckRhdGEiLCJnZXRJbiIsImFsbERhdGEiLCJkYXRhIiwiaXNFbXB0eSIsImRhdGVGb3JtYXQiLCJnZXREYXRlRm9ybWF0IiwidXNlciIsImZpbHRlciIsInJvdyIsImhpdHMiLCJmaWx0ZXJWYWx1ZSIsImZpbHRlckNvbHVtbiIsImNvbHVtbiIsImdldENvbHVtbktleSIsInJvd0RhdGEiLCJ2YWx1ZUtleVBhdGgiLCJmaWx0ZXJNYXRjaGVyIiwiZ2V0RmlsdGVyTWF0Y2hlciIsInNpemUiLCJmaWx0ZXJDZWxsVmFsdWVDaGFuZ2UiLCJ2YWx1ZSIsIm9yaWdGaWx0ZXJEYXRhIiwiY29sdW1uS2V5IiwidmFsdWVFbXB0eUNoZWNrZXIiLCJnZXRWYWx1ZUVtcHR5Q2hlY2tlciIsImRlbGV0ZSIsInNldCIsInNhdmVGaWx0ZXJEYXRhIiwiYXBwbHlTb3J0Iiwic29ydERhdGEiLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwiY29sIiwib3JpZ0FsbERhdGEiLCJjb21wYXJhdG9yIiwiZ2V0U29ydENvbXBhcmF0b3IiLCJ2YWx1ZUdldHRlciIsImdldFNvcnRWYWx1ZUdldHRlciIsInNvcnQiLCJhIiwiYiIsInZhbEEiLCJ2YWxCIiwic29ydENoYW5nZSIsIm5ld1NvcnQiLCJzYXZlU29ydERhdGEiLCJzZXREYXRhIiwiY2hlY2tDb2x1bW5zUGFyYW0iLCJjb25maWdEYXRhIiwibG9hZEdyaWRDb25maWciLCJpbW11dGFibGVEYXRhIiwiSXRlcmFibGUiLCJpc0l0ZXJhYmxlIiwiZnJvbUpTIiwic2VsZWN0ZWRJdGVtcyIsImxvYWRTZWxlY3RlZEl0ZW1zIiwiZmluZCIsImRhdGFJdGVtIiwiaWRLZXlQYXRoIiwiaXRlbSIsImNvbmZpZyIsInJlc2l6ZUNvbHVtbiIsIndpZHRoIiwiY29sdW1uV2lkdGhzIiwic2F2ZUNvbHVtbldpZHRocyIsImVkaXQiLCJjYW5jZWwiLCJzYXZlIiwiY2IiLCJzYXZlU3VjY2VzcyIsInNhdmVkSXRlbXMiLCJzYXZlUGFydGlhbFN1Y2Nlc3MiLCJzYXZlRmFpbCIsImNyZWF0ZSIsImNvbHVtbkRlZmF1bHRWYWx1ZXMiLCJhZGROZXdJdGVtIiwicmVtb3ZlTmV3SXRlbSIsImluZGV4IiwicmVtb3ZlTmV3SXRlbXMiLCJpbmRleGVzIiwicmVtb3ZlIiwicmVtb3ZlU3VjY2VzcyIsInJlbW92ZWRJZHMiLCJyZW1vdmVGYWlsIiwiZWRpdENlbGxWYWx1ZUNoYW5nZSIsImRhdGFJZCIsImtleVBhdGgiLCJlZGl0Q2VsbFZhbHVlVmFsaWRhdGUiLCJ2YWxpZGF0b3JzIiwidmFsaWRhdGlvblN0YXRlIiwidmFsaWQiLCJ2YWxpZGF0b3IiLCJ1bmlxdWUiLCJ1bmRlZmluZWQiLCJlZGl0RGF0YSIsImVkaXREYXRhSXRlbSIsImVkaXREYXRhSXRlbUlkIiwiZm91bmRJbmRleCIsImZpbmRJbmRleCIsImQiLCJtZXJnZURlZXBJbiIsImZpbmRpbmciLCJsZW5ndGgiLCJtZXNzYWdlIiwidmFsaWRhdGVXaXRoUm93RGF0YSIsIm1lcmdlRGVlcCIsInBhcmFtcyIsIk9iamVjdCIsInZhbHVlcyIsInZhbGlkYXRlIiwibWVzc2FnZVZhbHVlcyIsIm1lc3NhZ2VUeXBlIiwibWVzc2FnZUlkIiwiY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlIiwicm93SW5kZXgiLCJjcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZSIsImZpbmQyIiwiaSIsImNlbGxTaG93TWVzc2FnZSIsImNlbGxTaG93TWVzc2FnZXMiLCJtZXNzYWdlcyIsImNlbGxIaWRlTWVzc2FnZSIsImNyZWF0ZUNlbGxTaG93TWVzc2FnZSIsImNyZWF0ZUNlbGxIaWRlTWVzc2FnZSIsImNlbGxTZWxlY3Rpb25DaGFuZ2UiLCJzZWxlY3RlZENlbGwiLCJpdGVtU2VsZWN0aW9uQ2hhbmdlIiwiY3RybFByZXNzZWQiLCJzaGlmdFByZXNzZWQiLCJzYXZlU2VsZWN0ZWRJdGVtcyIsInNlbGVjdEFsbEl0ZW1zQ2hhbmdlIiwiY2xlYXJTZWxlY3RlZEl0ZW1zIiwidG9nZ2xlRmlsdGVyaW5nIiwiaXNGaWx0ZXJpbmciLCJzYXZlSXNGaWx0ZXJpbmciLCJ2YWxpZGF0ZUVkaXRlZFJvd3MiLCJhbGxHb29kIiwiZWRpdERhdGFSb3ciLCJpc1ZhbGlkIiwicmVtb3ZlRW1wdHlDcmVhdGVkUm93cyIsImNyZWF0ZURhdGEiLCJjcmVhdGVEYXRhUm93IiwicHVzaCIsInZhbGlkYXRlQ3JlYXRlZFJvd3MiLCJ1cGRhdGVFeGlzdGluZ0NlbGxWYWx1ZSIsInNldEVkaXREYXRhIiwiY2VsbE1lc3NhZ2VzIiwib3BlbkNvbHVtblNldHRpbmdzTW9kYWwiLCJjbG9zZUNvbHVtblNldHRpbmdzTW9kYWwiLCJzYXZlQ29sdW1uU2V0dGluZ3MiLCJoaWRkZW5Db2x1bW5zIiwiY29sdW1uT3JkZXIiXSwibWFwcGluZ3MiOiJBQUFBLE9BQU9BLFNBQVAsSUFBb0JDLEdBQXBCLFFBQStCLFdBQS9CO0FBQ0EsT0FBT0MsS0FBUCxNQUFrQixrQkFBbEI7O0FBRUEsT0FBTyxJQUFNQyxRQUFRO0FBQ25CQyxnQ0FBOEIsOEJBRFg7QUFFbkJDLDBCQUF3Qix3QkFGTDtBQUduQkMsMkJBQXlCLHlCQUhOO0FBSW5CQyw4QkFBNEIsNEJBSlQ7QUFLbkJDLGdDQUE4Qiw4QkFMWDtBQU1uQkMsaUNBQStCLCtCQU5aO0FBT25CQyxtQ0FBaUMsaUNBUGQ7QUFRbkJDLDBCQUF3Qix3QkFSTDtBQVNuQkMsNEJBQTBCLDBCQVRQO0FBVW5CQywwQkFBd0Isd0JBVkw7QUFXbkJDLGtDQUFnQyxnQ0FYYjtBQVluQkMsMENBQXdDLHdDQVpyQjtBQWFuQkMsK0JBQTZCLDZCQWJWO0FBY25CQyw0QkFBMEIsMEJBZFA7QUFlbkJDLGtDQUFnQyxnQ0FmYjtBQWdCbkJDLHFDQUFtQyxtQ0FoQmhCO0FBaUJuQkMsc0NBQW9DLG9DQWpCakI7QUFrQm5CQyw0QkFBMEIsMEJBbEJQO0FBbUJuQkMsb0NBQWtDLGtDQW5CZjtBQW9CbkJDLGlDQUErQiwrQkFwQlo7QUFxQm5CQyw0Q0FBMEMsMENBckJ2QjtBQXNCbkJDLHVDQUFxQyxxQ0F0QmxCO0FBdUJuQkMsd0NBQXNDLHNDQXZCbkI7QUF3Qm5CQyx1Q0FBcUMscUNBeEJsQjtBQXlCbkJDLDhDQUE0Qyw0Q0F6QnpCO0FBMEJuQkMsOENBQTRDLDRDQTFCekI7QUEyQm5CQyw4Q0FBNEMsNENBM0J6QjtBQTRC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R0FUd0I7QUFBQSxDQUFwQjs7QUFXUCxPQUFPLElBQU11SywwQkFBMEIsU0FBMUJBLHVCQUEwQjtBQUFBLFNBQ3JDLFVBQUNsSyxRQUFELEVBQWM7QUFDWjNDLFVBQU00QyxjQUFOLENBQXFCQyxJQUFyQjtBQUNBRixhQUFTO0FBQ1BHLFlBQU03QyxNQUFNc0MsNENBREw7QUFFUFEsVUFBSUYsS0FBS0U7QUFGRixLQUFUO0FBSUQsR0FQb0M7QUFBQSxDQUFoQzs7QUFTUCxPQUFPLElBQU0rSiwyQkFBMkIsU0FBM0JBLHdCQUEyQjtBQUFBLFNBQ3RDLFVBQUNuSyxRQUFELEVBQWM7QUFDWjNDLFVBQU00QyxjQUFOLENBQXFCQyxJQUFyQjtBQUNBRixhQUFTO0FBQ1BHLFlBQU03QyxNQUFNdUMsNkNBREw7QUFFUE8sVUFBSUYsS0FBS0U7QUFGRixLQUFUO0FBSUQsR0FQcUM7QUFBQSxDQUFqQzs7QUFTUCxPQUFPLElBQU1nSyxxQkFBcUIsU0FBckJBLGtCQUFxQixDQUFDbEssSUFBRCxFQUFPbUssYUFBUCxFQUFzQkMsV0FBdEI7QUFBQSxTQUNoQyxVQUFDdEssUUFBRCxFQUFjO0FBQ1ozQyxVQUFNNEMsY0FBTixDQUFxQkMsSUFBckI7QUFDQTdDLFVBQU0rTSxrQkFBTixDQUF5QmxLLElBQXpCLEVBQStCbUssYUFBL0IsRUFBOENDLFdBQTlDO0FBQ0F0SyxhQUFTO0FBQ1BHLFlBQU03QyxNQUFNd0Msc0NBREw7QUFFUE0sVUFBSUYsS0FBS0UsRUFGRjtBQUdQa0s7QUFITyxLQUFUO0FBS0QsR0FUK0I7QUFBQSxDQUEzQiIsImZpbGUiOiJkYXRhZ3JpZC5hY3Rpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEltbXV0YWJsZSwgeyBNYXAgfSBmcm9tICdpbW11dGFibGUnO1xyXG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9kYXRhZ3JpZC51dGlscyc7XHJcblxyXG5leHBvcnQgY29uc3QgVFlQRVMgPSB7XHJcbiAgUExBVEZPUk1fREFUQUdSSURfSU5WQUxJREFURTogJ1BMQVRGT1JNX0RBVEFHUklEX0lOVkFMSURBVEUnLFxyXG4gIFBMQVRGT1JNX0RBVEFHUklEX0JVU1k6ICdQTEFURk9STV9EQVRBR1JJRF9CVVNZJyxcclxuICBQTEFURk9STV9EQVRBR1JJRF9SRUFEWTogJ1BMQVRGT1JNX0RBVEFHUklEX1JFQURZJyxcclxuICBQTEFURk9STV9EQVRBR1JJRF9TRVRfREFUQTogJ1BMQVRGT1JNX0RBVEFHUklEX1NFVF9EQVRBJyxcclxuICBQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9TT1JUOiAnUExBVEZPUk1fREFUQUdSSURfQVBQTFlfU09SVCcsXHJcbiAgUExBVEZPUk1fREFUQUdSSURfU09SVF9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9TT1JUX0NIQU5HRScsXHJcbiAgUExBVEZPUk1fREFUQUdSSURfUkVTSVpFX0NPTFVNTjogJ1BMQVRGT1JNX0RBVEFHUklEX1JFU0laRV9DT0xVTU4nLFxyXG4gIFBMQVRGT1JNX0RBVEFHUklEX0VESVQ6ICdQTEFURk9STV9EQVRBR1JJRF9FRElUJyxcclxuICBQTEFURk9STV9EQVRBR1JJRF9DQU5DRUw6ICdQTEFURk9STV9EQVRBR1JJRF9DQU5DRUwnLFxyXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NBVkU6ICdQTEFURk9STV9EQVRBR1JJRF9TQVZFJyxcclxuICBQTEFURk9STV9EQVRBR1JJRF9TQVZFX1NVQ0NFU1M6ICdQTEFURk9STV9EQVRBR1JJRF9TQVZFX1NVQ0NFU1MnLFxyXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NBVkVfUEFSVElBTF9TVUNDRVNTOiAnUExBVEZPUk1fREFUQUdSSURfU0FWRV9QQVJUSUFMX1NVQ0NFU1MnLFxyXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NBVkVfRkFJTDogJ1BMQVRGT1JNX0RBVEFHUklEX1NBVkVfRkFJTCcsXHJcbiAgUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFOiAnUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFJyxcclxuICBQTEFURk9STV9EQVRBR1JJRF9BRERfTkVXX0lURU06ICdQTEFURk9STV9EQVRBR1JJRF9BRERfTkVXX0lURU0nLFxyXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTTogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTScsXHJcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNUzogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTVMnLFxyXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRTogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRScsXHJcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX1NVQ0NFU1M6ICdQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfU1VDQ0VTUycsXHJcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUw6ICdQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfRkFJTCcsXHJcbiAgUExBVEZPUk1fREFUQUdSSURfRURJVF9DRUxMX1ZBTFVFX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX0VESVRfQ0VMTF9WQUxVRV9DSEFOR0UnLFxyXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFOiAnUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0UnLFxyXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFUzogJ1BMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFUycsXHJcbiAgUExBVEZPUk1fREFUQUdSSURfQ0VMTF9ISURFX01FU1NBR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRScsXHJcbiAgUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfU0hPV19NRVNTQUdFOiAnUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfU0hPV19NRVNTQUdFJyxcclxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9ISURFX01FU1NBR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9ISURFX01FU1NBR0UnLFxyXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX0NIQU5HRScsXHJcbiAgUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfVkFMSURBVEU6ICdQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9WQUxJREFURScsXHJcbiAgUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TRUxFQ1RJT05fQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TRUxFQ1RJT05fQ0hBTkdFJyxcclxuICBQTEFURk9STV9EQVRBR1JJRF9JVEVNX1NFTEVDVElPTl9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9JVEVNX1NFTEVDVElPTl9DSEFOR0UnLFxyXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NFTEVDVF9BTExfSVRFTVNfQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0UnLFxyXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NMRUFSX1NFTEVDVEVEX0lURU1TOiAnUExBVEZPUk1fREFUQUdSSURfQ0xFQVJfU0VMRUNURURfSVRFTVMnLFxyXG4gIFBMQVRGT1JNX0RBVEFHUklEX1RPR0dMRV9GSUxURVJJTkc6ICdQTEFURk9STV9EQVRBR1JJRF9UT0dHTEVfRklMVEVSSU5HJyxcclxuICBQTEFURk9STV9EQVRBR1JJRF9GSUxURVJfREFUQV9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9GSUxURVJfREFUQV9DSEFOR0UnLFxyXG4gIFBMQVRGT1JNX0RBVEFHUklEX0FQUExZX0ZJTFRFUlM6ICdQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9GSUxURVJTJyxcclxuICBQTEFURk9STV9EQVRBR1JJRF9VUERBVEVfRVhJU1RJTkdfQ0VMTF9WQUxVRTogJ1BMQVRGT1JNX0RBVEFHUklEX1VQREFURV9FWElTVElOR19DRUxMX1ZBTFVFJyxcclxuICBQTEFURk9STV9EQVRBR1JJRF9TRVRfRURJVF9EQVRBOiAnUExBVEZPUk1fREFUQUdSSURfU0VUX0VESVRfREFUQScsXHJcbiAgUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX09QRU46ICdQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfT1BFTicsXHJcbiAgUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX0NMT1NFOiAnUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX0NMT1NFJyxcclxuICBQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfU0FWRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFJyxcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBpbnZhbGlkYXRlID0gZ3JpZCA9PlxyXG4gIChkaXNwYXRjaCkgPT4ge1xyXG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XHJcbiAgICBkaXNwYXRjaCh7XHJcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0lOVkFMSURBVEUsXHJcbiAgICAgIGlkOiBncmlkLmlkLFxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbmV4cG9ydCBjb25zdCBzZXRCdXN5ID0gZ3JpZCA9PlxyXG4gIChkaXNwYXRjaCkgPT4ge1xyXG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XHJcbiAgICBkaXNwYXRjaCh7XHJcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0JVU1ksXHJcbiAgICAgIGlkOiBncmlkLmlkLFxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbmV4cG9ydCBjb25zdCBzZXRSZWFkeSA9IGdyaWQgPT5cclxuICAoZGlzcGF0Y2gpID0+IHtcclxuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xyXG4gICAgZGlzcGF0Y2goe1xyXG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRUFEWSxcclxuICAgICAgaWQ6IGdyaWQuaWQsXHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuZXhwb3J0IGNvbnN0IGFwcGx5RmlsdGVycyA9IChncmlkLCBjb2x1bW5zKSA9PlxyXG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcclxuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xyXG4gICAgaWYgKCFjb2x1bW5zIHx8ICFjb2x1bW5zLmZvckVhY2gpIHJldHVybiBmYWxzZTtcclxuICAgIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XHJcbiAgICBpZiAoIWdyaWREYXRhKSByZXR1cm4gZmFsc2U7XHJcbiAgICBjb25zdCBmaWx0ZXJEYXRhID0gZ3JpZERhdGEuZ2V0SW4oWydjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdmaWx0ZXJEYXRhJ10sIE1hcCgpKTtcclxuICAgIGNvbnN0IGFsbERhdGEgPSBncmlkRGF0YS5nZXQoJ2FsbERhdGEnKTtcclxuICAgIHNldEJ1c3koZ3JpZCkoZGlzcGF0Y2gpO1xyXG4gICAgbGV0IGRhdGE7XHJcbiAgICBpZiAoZmlsdGVyRGF0YS5pc0VtcHR5KCkpIHtcclxuICAgICAgZGF0YSA9IGFsbERhdGE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBkYXRlRm9ybWF0ID0gVXRpbHMuZ2V0RGF0ZUZvcm1hdChncmlkLCBnZXRTdGF0ZSgpLnVzZXIpO1xyXG4gICAgICBkYXRhID0gYWxsRGF0YS5maWx0ZXIoKHJvdykgPT4ge1xyXG4gICAgICAgIGxldCBoaXRzID0gMDtcclxuICAgICAgICBmaWx0ZXJEYXRhLmZvckVhY2goKGZpbHRlclZhbHVlLCBmaWx0ZXJDb2x1bW4pID0+IHtcclxuICAgICAgICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sdW1uKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChVdGlscy5nZXRDb2x1bW5LZXkoY29sdW1uKSA9PT0gZmlsdGVyQ29sdW1uKSB7XHJcbiAgICAgICAgICAgICAgY29uc3Qgcm93RGF0YSA9IHJvdy5nZXRJbihjb2x1bW4udmFsdWVLZXlQYXRoKTtcclxuICAgICAgICAgICAgICBpZiAocm93RGF0YSB8fCByb3dEYXRhID09PSAwIHx8IHJvd0RhdGEgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJNYXRjaGVyID0gVXRpbHMuZ2V0RmlsdGVyTWF0Y2hlcihjb2x1bW4sIGRhdGVGb3JtYXQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlck1hdGNoZXIocm93RGF0YSwgZmlsdGVyVmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgIGhpdHMgKz0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBoaXRzID09PSBmaWx0ZXJEYXRhLnNpemU7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZGlzcGF0Y2goe1xyXG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9BUFBMWV9GSUxURVJTLFxyXG4gICAgICBpZDogZ3JpZC5pZCxcclxuICAgICAgZGF0YSxcclxuICAgIH0pO1xyXG4gICAgc2V0UmVhZHkoZ3JpZCkoZGlzcGF0Y2gpO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfTtcclxuXHJcbmV4cG9ydCBjb25zdCBmaWx0ZXJDZWxsVmFsdWVDaGFuZ2UgPSAoZ3JpZCwgY29sdW1ucywgY29sdW1uLCB2YWx1ZSkgPT5cclxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XHJcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcclxuICAgIGNvbnN0IG9yaWdGaWx0ZXJEYXRhID0gZ2V0U3RhdGUoKVxyXG4gICAgICAuZGF0YWdyaWRcclxuICAgICAgLmdldEluKFtncmlkLmlkLCAnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnZmlsdGVyRGF0YSddLCBNYXAoKSk7XHJcbiAgICBjb25zdCBjb2x1bW5LZXkgPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sdW1uKTtcclxuICAgIGNvbnN0IHZhbHVlRW1wdHlDaGVja2VyID0gVXRpbHMuZ2V0VmFsdWVFbXB0eUNoZWNrZXIoY29sdW1uKTtcclxuICAgIGxldCBmaWx0ZXJEYXRhO1xyXG4gICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbHVlKSkge1xyXG4gICAgICBmaWx0ZXJEYXRhID0gb3JpZ0ZpbHRlckRhdGEuZGVsZXRlKGNvbHVtbktleSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmaWx0ZXJEYXRhID0gb3JpZ0ZpbHRlckRhdGEuc2V0KGNvbHVtbktleSwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgVXRpbHMuc2F2ZUZpbHRlckRhdGEoZ3JpZCwgZmlsdGVyRGF0YSk7XHJcbiAgICBkaXNwYXRjaCh7XHJcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0ZJTFRFUl9EQVRBX0NIQU5HRSxcclxuICAgICAgaWQ6IGdyaWQuaWQsXHJcbiAgICAgIGZpbHRlckRhdGEsXHJcbiAgICB9KTtcclxuICAgIGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xyXG4gIH07XHJcblxyXG5leHBvcnQgY29uc3QgYXBwbHlTb3J0ID0gKGdyaWQsIGNvbHVtbnMpID0+XHJcbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xyXG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XHJcbiAgICBpZiAoIWNvbHVtbnMgfHwgIWNvbHVtbnMuZm9yRWFjaCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgY29uc3QgZ3JpZERhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldChncmlkLmlkKTtcclxuICAgIGlmICghZ3JpZERhdGEpIHJldHVybiBmYWxzZTtcclxuICAgIGNvbnN0IHNvcnREYXRhID0gZ3JpZERhdGEuZ2V0SW4oWydjb25maWcnLCAnc29ydGluZ0RhdGEnXSk7XHJcbiAgICBpZiAoIXNvcnREYXRhKSByZXR1cm4gZmFsc2U7XHJcbiAgICBjb25zdCBzb3J0Q29sdW1uID0gc29ydERhdGEuZ2V0KCdzb3J0Q29sdW1uJyk7XHJcbiAgICBpZiAoIXNvcnRDb2x1bW4pIHJldHVybiBmYWxzZTtcclxuICAgIGNvbnN0IHNvcnRPcmRlciA9IHNvcnREYXRhLmdldCgnc29ydE9yZGVyJywgJ2FzYycpO1xyXG4gICAgbGV0IGNvbHVtbjtcclxuICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XHJcbiAgICAgIGlmIChVdGlscy5nZXRDb2x1bW5LZXkoY29sKSA9PT0gc29ydENvbHVtbikge1xyXG4gICAgICAgIGNvbHVtbiA9IGNvbDtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpZiAoIWNvbHVtbikgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgIHNldEJ1c3koZ3JpZCkoZGlzcGF0Y2gpO1xyXG4gICAgY29uc3Qgb3JpZ0FsbERhdGEgPSBncmlkRGF0YS5nZXQoJ2FsbERhdGEnKTtcclxuICAgIGNvbnN0IGNvbXBhcmF0b3IgPSBVdGlscy5nZXRTb3J0Q29tcGFyYXRvcihjb2x1bW4pO1xyXG4gICAgY29uc3QgdmFsdWVHZXR0ZXIgPSBVdGlscy5nZXRTb3J0VmFsdWVHZXR0ZXIoY29sdW1uKTtcclxuICAgIGNvbnN0IHZhbHVlRW1wdHlDaGVja2VyID0gVXRpbHMuZ2V0VmFsdWVFbXB0eUNoZWNrZXIoY29sdW1uKTtcclxuICAgIGNvbnN0IGFsbERhdGEgPSBvcmlnQWxsRGF0YS5zb3J0KChhLCBiKSA9PiB7XHJcbiAgICAgIGNvbnN0IHZhbEEgPSB2YWx1ZUdldHRlcihhKTtcclxuICAgICAgY29uc3QgdmFsQiA9IHZhbHVlR2V0dGVyKGIpO1xyXG4gICAgICBpZiAoc29ydE9yZGVyID09PSAnYXNjJykge1xyXG4gICAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxBKSkgcmV0dXJuIC0xO1xyXG4gICAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxCKSkgcmV0dXJuIDE7XHJcbiAgICAgICAgcmV0dXJuIGNvbXBhcmF0b3IodmFsQSwgdmFsQik7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEEpKSByZXR1cm4gMTtcclxuICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEIpKSByZXR1cm4gLTE7XHJcbiAgICAgIHJldHVybiBjb21wYXJhdG9yKHZhbEIsIHZhbEEpO1xyXG4gICAgfSk7XHJcbiAgICBsZXQgZGF0YTtcclxuICAgIC8vIFNvcnQgYWxzbyBmaWx0ZXJlZCBkYXRhIHNlcGFyYXRlbHlcclxuICAgIGlmIChncmlkRGF0YS5nZXRJbihbJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2lzRmlsdGVyaW5nJ10sIGZhbHNlKSkge1xyXG4gICAgICBkYXRhID0gZ3JpZERhdGEuZ2V0KCdkYXRhJykuc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICAgIGNvbnN0IHZhbEEgPSB2YWx1ZUdldHRlcihhKTtcclxuICAgICAgICBjb25zdCB2YWxCID0gdmFsdWVHZXR0ZXIoYik7XHJcbiAgICAgICAgaWYgKHNvcnRPcmRlciA9PT0gJ2FzYycpIHtcclxuICAgICAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxBKSkgcmV0dXJuIC0xO1xyXG4gICAgICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEIpKSByZXR1cm4gMTtcclxuICAgICAgICAgIHJldHVybiBjb21wYXJhdG9yKHZhbEEsIHZhbEIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQSkpIHJldHVybiAxO1xyXG4gICAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxCKSkgcmV0dXJuIC0xO1xyXG4gICAgICAgIHJldHVybiBjb21wYXJhdG9yKHZhbEIsIHZhbEEpO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRhdGEgPSBhbGxEYXRhO1xyXG4gICAgfVxyXG4gICAgZGlzcGF0Y2goe1xyXG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9BUFBMWV9TT1JULFxyXG4gICAgICBpZDogZ3JpZC5pZCxcclxuICAgICAgZGF0YSxcclxuICAgICAgYWxsRGF0YSxcclxuICAgIH0pO1xyXG4gICAgc2V0UmVhZHkoZ3JpZCkoZGlzcGF0Y2gpO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfTtcclxuXHJcbmV4cG9ydCBjb25zdCBzb3J0Q2hhbmdlID0gKGdyaWQsIGNvbHVtbnMsIGNvbHVtbiwgbmV3U29ydCkgPT5cclxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XHJcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcclxuICAgIGNvbnN0IHNvcnRPcmRlciA9IG5ld1NvcnQgfHwgJ2FzYyc7XHJcbiAgICBjb25zdCBzb3J0Q29sdW1uID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbHVtbik7XHJcbiAgICBVdGlscy5zYXZlU29ydERhdGEoZ3JpZCwgeyBzb3J0Q29sdW1uLCBzb3J0T3JkZXIgfSk7XHJcbiAgICBkaXNwYXRjaCh7XHJcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NPUlRfQ0hBTkdFLFxyXG4gICAgICBpZDogZ3JpZC5pZCxcclxuICAgICAgc29ydENvbHVtbixcclxuICAgICAgc29ydE9yZGVyLFxyXG4gICAgfSk7XHJcbiAgICBhcHBseVNvcnQoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcclxuICB9O1xyXG5cclxuZXhwb3J0IGNvbnN0IHNldERhdGEgPSAoZ3JpZCwgY29sdW1ucywgZGF0YSkgPT5cclxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XHJcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcclxuICAgIFV0aWxzLmNoZWNrQ29sdW1uc1BhcmFtKGNvbHVtbnMpO1xyXG4gICAgY29uc3QgY29uZmlnRGF0YSA9IFV0aWxzLmxvYWRHcmlkQ29uZmlnKGdyaWQsIGNvbHVtbnMpO1xyXG4gICAgY29uc3QgaW1tdXRhYmxlRGF0YSA9IEltbXV0YWJsZS5JdGVyYWJsZS5pc0l0ZXJhYmxlKGRhdGEpID8gZGF0YSA6IEltbXV0YWJsZS5mcm9tSlMoZGF0YSk7XHJcbiAgICBjb25zdCBzZWxlY3RlZEl0ZW1zID0gVXRpbHMubG9hZFNlbGVjdGVkSXRlbXMoZ3JpZCkuZmlsdGVyKGl0ZW0gPT4gKFxyXG4gICAgICAhIWltbXV0YWJsZURhdGEuZmluZChkYXRhSXRlbSA9PiBkYXRhSXRlbS5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGl0ZW0pXHJcbiAgICApKTtcclxuICAgIGRpc3BhdGNoKHtcclxuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX0RBVEEsXHJcbiAgICAgIGlkOiBncmlkLmlkLFxyXG4gICAgICBkYXRhOiBpbW11dGFibGVEYXRhLFxyXG4gICAgICBjb25maWc6IGNvbmZpZ0RhdGEsXHJcbiAgICAgIHNlbGVjdGVkSXRlbXMsXHJcbiAgICB9KTtcclxuICAgIGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xyXG4gICAgYXBwbHlTb3J0KGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XHJcbiAgfTtcclxuXHJcbmV4cG9ydCBjb25zdCByZXNpemVDb2x1bW4gPSAoZ3JpZCwgY29sdW1uS2V5LCB3aWR0aCkgPT5cclxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XHJcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcclxuICAgIGNvbnN0IGNvbHVtbldpZHRocyA9IGdldFN0YXRlKClcclxuICAgICAgLmRhdGFncmlkXHJcbiAgICAgIC5nZXRJbihbZ3JpZC5pZCwgJ2NvbmZpZycsICdjb2x1bW5XaWR0aHMnXSwgTWFwKCkpXHJcbiAgICAgIC5zZXQoY29sdW1uS2V5LCB3aWR0aCk7XHJcbiAgICBVdGlscy5zYXZlQ29sdW1uV2lkdGhzKGdyaWQsIGNvbHVtbldpZHRocyk7XHJcbiAgICBkaXNwYXRjaCh7XHJcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFU0laRV9DT0xVTU4sXHJcbiAgICAgIGlkOiBncmlkLmlkLFxyXG4gICAgICBjb2x1bW5XaWR0aHMsXHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuZXhwb3J0IGNvbnN0IGVkaXQgPSBncmlkID0+XHJcbiAgKGRpc3BhdGNoKSA9PiB7XHJcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcclxuICAgIGRpc3BhdGNoKHtcclxuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfRURJVCxcclxuICAgICAgaWQ6IGdyaWQuaWQsXHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuZXhwb3J0IGNvbnN0IGNhbmNlbCA9IGdyaWQgPT5cclxuICAoZGlzcGF0Y2gpID0+IHtcclxuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xyXG4gICAgZGlzcGF0Y2goe1xyXG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DQU5DRUwsXHJcbiAgICAgIGlkOiBncmlkLmlkLFxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbmV4cG9ydCBjb25zdCBzYXZlID0gKGdyaWQsIGNiID0gKCkgPT4ge30pID0+XHJcbiAgKGRpc3BhdGNoKSA9PiB7XHJcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcclxuICAgIGRpc3BhdGNoKHtcclxuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0FWRSxcclxuICAgICAgaWQ6IGdyaWQuaWQsXHJcbiAgICB9KTtcclxuICAgIGNiKCk7XHJcbiAgfTtcclxuXHJcbmV4cG9ydCBjb25zdCBzYXZlU3VjY2VzcyA9IChncmlkLCBjb2x1bW5zLCBzYXZlZEl0ZW1zKSA9PlxyXG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcclxuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xyXG4gICAgZGlzcGF0Y2goe1xyXG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TQVZFX1NVQ0NFU1MsXHJcbiAgICAgIGlkOiBncmlkLmlkLFxyXG4gICAgICBpZEtleVBhdGg6IGdyaWQuaWRLZXlQYXRoLFxyXG4gICAgICBzYXZlZEl0ZW1zLFxyXG4gICAgfSk7XHJcbiAgICBhcHBseUZpbHRlcnMoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcclxuICAgIGFwcGx5U29ydChncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xyXG4gIH07XHJcblxyXG5leHBvcnQgY29uc3Qgc2F2ZVBhcnRpYWxTdWNjZXNzID0gKGdyaWQsIGNvbHVtbnMsIHNhdmVkSXRlbXMpID0+XHJcbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xyXG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XHJcbiAgICBkaXNwYXRjaCh7XHJcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfUEFSVElBTF9TVUNDRVNTLFxyXG4gICAgICBpZDogZ3JpZC5pZCxcclxuICAgICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcclxuICAgICAgc2F2ZWRJdGVtcyxcclxuICAgIH0pO1xyXG4gICAgYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XHJcbiAgICBhcHBseVNvcnQoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcclxuICB9O1xyXG5cclxuZXhwb3J0IGNvbnN0IHNhdmVGYWlsID0gZ3JpZCA9PlxyXG4gIChkaXNwYXRjaCkgPT4ge1xyXG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XHJcbiAgICBkaXNwYXRjaCh7XHJcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfRkFJTCxcclxuICAgICAgaWQ6IGdyaWQuaWQsXHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZSA9IChncmlkLCBjb2x1bW5EZWZhdWx0VmFsdWVzKSA9PlxyXG4gIChkaXNwYXRjaCkgPT4ge1xyXG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XHJcbiAgICBkaXNwYXRjaCh7XHJcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURSxcclxuICAgICAgaWQ6IGdyaWQuaWQsXHJcbiAgICAgIGNvbHVtbkRlZmF1bHRWYWx1ZXMsXHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuZXhwb3J0IGNvbnN0IGFkZE5ld0l0ZW0gPSAoZ3JpZCwgY29sdW1uRGVmYXVsdFZhbHVlcykgPT5cclxuICAoZGlzcGF0Y2gpID0+IHtcclxuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xyXG4gICAgZGlzcGF0Y2goe1xyXG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9BRERfTkVXX0lURU0sXHJcbiAgICAgIGlkOiBncmlkLmlkLFxyXG4gICAgICBjb2x1bW5EZWZhdWx0VmFsdWVzLFxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbmV4cG9ydCBjb25zdCByZW1vdmVOZXdJdGVtID0gKGdyaWQsIGluZGV4KSA9PlxyXG4gIChkaXNwYXRjaCkgPT4ge1xyXG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XHJcbiAgICBkaXNwYXRjaCh7XHJcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTSxcclxuICAgICAgaWQ6IGdyaWQuaWQsXHJcbiAgICAgIGluZGV4LFxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbmV4cG9ydCBjb25zdCByZW1vdmVOZXdJdGVtcyA9IChncmlkLCBpbmRleGVzKSA9PlxyXG4gIChkaXNwYXRjaCkgPT4ge1xyXG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XHJcbiAgICBkaXNwYXRjaCh7XHJcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTVMsXHJcbiAgICAgIGlkOiBncmlkLmlkLFxyXG4gICAgICBpbmRleGVzLFxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbmV4cG9ydCBjb25zdCByZW1vdmUgPSAoZ3JpZCwgY2IgPSAoKSA9PiB7fSkgPT5cclxuICAoZGlzcGF0Y2gpID0+IHtcclxuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xyXG4gICAgZGlzcGF0Y2goe1xyXG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkUsXHJcbiAgICAgIGlkOiBncmlkLmlkLFxyXG4gICAgfSk7XHJcbiAgICBjYigpO1xyXG4gIH07XHJcblxyXG5leHBvcnQgY29uc3QgcmVtb3ZlU3VjY2VzcyA9IChncmlkLCByZW1vdmVkSWRzKSA9PlxyXG4gIChkaXNwYXRjaCkgPT4ge1xyXG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XHJcbiAgICBkaXNwYXRjaCh7XHJcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9TVUNDRVNTLFxyXG4gICAgICBpZDogZ3JpZC5pZCxcclxuICAgICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcclxuICAgICAgcmVtb3ZlZElkcyxcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG5leHBvcnQgY29uc3QgcmVtb3ZlRmFpbCA9IGdyaWQgPT5cclxuICAoZGlzcGF0Y2gpID0+IHtcclxuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xyXG4gICAgZGlzcGF0Y2goe1xyXG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfRkFJTCxcclxuICAgICAgaWQ6IGdyaWQuaWQsXHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuZXhwb3J0IGNvbnN0IGVkaXRDZWxsVmFsdWVDaGFuZ2UgPSAoZ3JpZCwgZGF0YUlkLCBrZXlQYXRoLCB2YWx1ZSkgPT5cclxuICAoZGlzcGF0Y2gpID0+IHtcclxuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xyXG4gICAgZGlzcGF0Y2goe1xyXG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9FRElUX0NFTExfVkFMVUVfQ0hBTkdFLFxyXG4gICAgICBpZDogZ3JpZC5pZCxcclxuICAgICAgZGF0YUlkLFxyXG4gICAgICBrZXlQYXRoLFxyXG4gICAgICB2YWx1ZSxcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG5leHBvcnQgY29uc3QgZWRpdENlbGxWYWx1ZVZhbGlkYXRlID0gKFxyXG4gIGdyaWQsXHJcbiAgZGF0YUlkLFxyXG4gIGtleVBhdGgsXHJcbiAgdmFsdWUsXHJcbiAgdmFsaWRhdG9ycyA9IFtdLFxyXG4pID0+XHJcbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xyXG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XHJcbiAgICBsZXQgdmFsaWRhdGlvblN0YXRlID0geyB2YWxpZDogdHJ1ZSB9O1xyXG4gICAgdmFsaWRhdG9ycy5mb3JFYWNoKCh2YWxpZGF0b3IpID0+IHtcclxuICAgICAgaWYgKHZhbGlkYXRpb25TdGF0ZS52YWxpZCkge1xyXG4gICAgICAgIGlmICh2YWxpZGF0b3IudW5pcXVlKSB7XHJcbiAgICAgICAgICBpZiAodmFsdWUgIT09ICcnIHx8IHZhbHVlICE9PSBudWxsIHx8IHZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgLy8gY29tYmluZSByZWFsIGRhdGEgd2l0aCBjdXJyZW50IHVuc2F2ZWQgZWRpdGVkIGRhdGFcclxuICAgICAgICAgICAgY29uc3QgZ3JpZERhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldChncmlkLmlkKTtcclxuICAgICAgICAgICAgY29uc3QgZWRpdERhdGEgPSBncmlkRGF0YS5nZXQoJ2VkaXREYXRhJyk7XHJcbiAgICAgICAgICAgIGxldCBhbGxEYXRhID0gZ3JpZERhdGEuZ2V0KCdhbGxEYXRhJyk7XHJcbiAgICAgICAgICAgIGlmIChlZGl0RGF0YSkge1xyXG4gICAgICAgICAgICAgIGVkaXREYXRhLmZvckVhY2goKGVkaXREYXRhSXRlbSwgZWRpdERhdGFJdGVtSWQpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZvdW5kSW5kZXggPVxyXG4gICAgICAgICAgICAgICAgICBhbGxEYXRhLmZpbmRJbmRleChkID0+IGQuZ2V0SW4oZ3JpZC5pZEtleVBhdGgpID09PSBlZGl0RGF0YUl0ZW1JZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZm91bmRJbmRleCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgYWxsRGF0YSA9IGFsbERhdGEubWVyZ2VEZWVwSW4oW2ZvdW5kSW5kZXhdLCBlZGl0RGF0YUl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGRldGVybWluZSB1bmlxdWVuZXNzXHJcbiAgICAgICAgICAgIGNvbnN0IGZpbmRpbmcgPSBhbGxEYXRhLmZpbmQoKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICBpZiAoZ3JpZC5pZEtleVBhdGgubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBkb24ndCBzZWxmIGNvbXBhcmVcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmdldEluKGdyaWQuaWRLZXlQYXRoKSA9PT0gZGF0YUlkKSB7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uZ2V0SW4oa2V5UGF0aCkgPT09IHZhbHVlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKGZpbmRpbmcpIHtcclxuICAgICAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB7XHJcbiAgICAgICAgICAgICAgICB2YWxpZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnVmFsaWRhdGlvbi5VbmlxdWUnLFxyXG4gICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHZhbGlkYXRvci52YWxpZGF0ZVdpdGhSb3dEYXRhKSB7XHJcbiAgICAgICAgICBjb25zdCBncmlkRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0KGdyaWQuaWQpO1xyXG4gICAgICAgICAgY29uc3QgZWRpdERhdGEgPSBncmlkRGF0YS5nZXRJbihbJ2VkaXREYXRhJywgZGF0YUlkXSwgTWFwKCkpO1xyXG4gICAgICAgICAgbGV0IHJvd0RhdGEgPSBncmlkRGF0YS5nZXQoJ2FsbERhdGEnKS5maW5kKGl0ZW0gPT4gaXRlbS5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGRhdGFJZCk7XHJcbiAgICAgICAgICBpZiAocm93RGF0YSkge1xyXG4gICAgICAgICAgICByb3dEYXRhID0gcm93RGF0YS5tZXJnZURlZXAoZWRpdERhdGEpO1xyXG4gICAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB2YWxpZGF0b3IudmFsaWRhdGVXaXRoUm93RGF0YSh2YWx1ZSwgcm93RGF0YSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IHZhbGlkYXRvci5wYXJhbXMgPyBPYmplY3QudmFsdWVzKHZhbGlkYXRvci5wYXJhbXMpIDogW107XHJcbiAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB2YWxpZGF0b3IudmFsaWRhdGUodmFsdWUsIC4uLnBhcmFtcyk7XHJcbiAgICAgICAgICBpZiAodmFsaWRhdG9yLnBhcmFtcykge1xyXG4gICAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZVZhbHVlcyA9IHZhbGlkYXRvci5wYXJhbXM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGlmICh2YWxpZGF0aW9uU3RhdGUudmFsaWQpIHtcclxuICAgICAgZGlzcGF0Y2goe1xyXG4gICAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfSElERV9NRVNTQUdFLFxyXG4gICAgICAgIGlkOiBncmlkLmlkLFxyXG4gICAgICAgIG1lc3NhZ2VUeXBlOiAnZXJyb3InLFxyXG4gICAgICAgIGRhdGFJZCxcclxuICAgICAgICBrZXlQYXRoLFxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRpc3BhdGNoKHtcclxuICAgICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRSxcclxuICAgICAgICBpZDogZ3JpZC5pZCxcclxuICAgICAgICBtZXNzYWdlVHlwZTogJ2Vycm9yJyxcclxuICAgICAgICBkYXRhSWQsXHJcbiAgICAgICAga2V5UGF0aCxcclxuICAgICAgICBtZXNzYWdlSWQ6IHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlLFxyXG4gICAgICAgIG1lc3NhZ2VWYWx1ZXM6IHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlVmFsdWVzLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiB2YWxpZGF0aW9uU3RhdGUudmFsaWQ7XHJcbiAgfTtcclxuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVDZWxsVmFsdWVDaGFuZ2UgPSAoZ3JpZCwgcm93SW5kZXgsIGtleVBhdGgsIHZhbHVlKSA9PlxyXG4gIChkaXNwYXRjaCkgPT4ge1xyXG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XHJcbiAgICBkaXNwYXRjaCh7XHJcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX0NIQU5HRSxcclxuICAgICAgaWQ6IGdyaWQuaWQsXHJcbiAgICAgIHJvd0luZGV4LFxyXG4gICAgICBrZXlQYXRoLFxyXG4gICAgICB2YWx1ZSxcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUgPSAoZ3JpZCwgcm93SW5kZXgsIGtleVBhdGgsIHZhbHVlLCB2YWxpZGF0b3JzID0gW10pID0+XHJcbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xyXG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XHJcbiAgICBsZXQgdmFsaWRhdGlvblN0YXRlID0geyB2YWxpZDogdHJ1ZSB9O1xyXG4gICAgdmFsaWRhdG9ycy5mb3JFYWNoKCh2YWxpZGF0b3IpID0+IHtcclxuICAgICAgaWYgKHZhbGlkYXRpb25TdGF0ZS52YWxpZCkge1xyXG4gICAgICAgIGlmICh2YWxpZGF0b3IudW5pcXVlKSB7XHJcbiAgICAgICAgICBpZiAodmFsdWUgIT09ICcnIHx8IHZhbHVlICE9PSBudWxsIHx8IHZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgY29uc3QgZmluZGluZyA9IGdldFN0YXRlKClcclxuICAgICAgICAgICAgICAuZGF0YWdyaWRcclxuICAgICAgICAgICAgICAuZ2V0SW4oW2dyaWQuaWQsICdhbGxEYXRhJ10pXHJcbiAgICAgICAgICAgICAgLmZpbmQoaXRlbSA9PiBpdGVtLmdldEluKGtleVBhdGgpID09PSB2YWx1ZSk7XHJcbiAgICAgICAgICAgIGlmIChmaW5kaW5nKSB7XHJcbiAgICAgICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0ge1xyXG4gICAgICAgICAgICAgICAgdmFsaWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ1ZhbGlkYXRpb24uVW5pcXVlJyxcclxuICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNvbnN0IGZpbmQyID0gZ2V0U3RhdGUoKVxyXG4gICAgICAgICAgICAgICAgLmRhdGFncmlkXHJcbiAgICAgICAgICAgICAgICAuZ2V0SW4oW2dyaWQuaWQsICdjcmVhdGVEYXRhJ10pXHJcbiAgICAgICAgICAgICAgICAuZmluZCgoaXRlbSwgaSkgPT4gaSAhPT0gcm93SW5kZXggJiYgaXRlbS5nZXRJbihrZXlQYXRoKSA9PT0gdmFsdWUpO1xyXG4gICAgICAgICAgICAgIGlmIChmaW5kMikge1xyXG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0ge1xyXG4gICAgICAgICAgICAgICAgICB2YWxpZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdWYWxpZGF0aW9uLlVuaXF1ZScsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAodmFsaWRhdG9yLnZhbGlkYXRlV2l0aFJvd0RhdGEpIHtcclxuICAgICAgICAgIGNvbnN0IHJvd0RhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnY3JlYXRlRGF0YScsIHJvd0luZGV4XSk7XHJcbiAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB2YWxpZGF0b3IudmFsaWRhdGVXaXRoUm93RGF0YSh2YWx1ZSwgcm93RGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IHZhbGlkYXRvci5wYXJhbXMgPyBPYmplY3QudmFsdWVzKHZhbGlkYXRvci5wYXJhbXMpIDogW107XHJcbiAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB2YWxpZGF0b3IudmFsaWRhdGUodmFsdWUsIC4uLnBhcmFtcyk7XHJcbiAgICAgICAgICBpZiAodmFsaWRhdG9yLnBhcmFtcykge1xyXG4gICAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZVZhbHVlcyA9IHZhbGlkYXRvci5wYXJhbXM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGlmICh2YWxpZGF0aW9uU3RhdGUudmFsaWQpIHtcclxuICAgICAgZGlzcGF0Y2goe1xyXG4gICAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX0hJREVfTUVTU0FHRSxcclxuICAgICAgICBpZDogZ3JpZC5pZCxcclxuICAgICAgICBtZXNzYWdlVHlwZTogJ2Vycm9yJyxcclxuICAgICAgICByb3dJbmRleCxcclxuICAgICAgICBrZXlQYXRoLFxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRpc3BhdGNoKHtcclxuICAgICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9TSE9XX01FU1NBR0UsXHJcbiAgICAgICAgaWQ6IGdyaWQuaWQsXHJcbiAgICAgICAgbWVzc2FnZVR5cGU6ICdlcnJvcicsXHJcbiAgICAgICAgcm93SW5kZXgsXHJcbiAgICAgICAga2V5UGF0aCxcclxuICAgICAgICBtZXNzYWdlSWQ6IHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlLFxyXG4gICAgICAgIG1lc3NhZ2VWYWx1ZXM6IHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlVmFsdWVzLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiB2YWxpZGF0aW9uU3RhdGUudmFsaWQ7XHJcbiAgfTtcclxuXHJcbmV4cG9ydCBjb25zdCBjZWxsU2hvd01lc3NhZ2UgPSAoZ3JpZCwgbWVzc2FnZVR5cGUsIGRhdGFJZCwga2V5UGF0aCwgbWVzc2FnZUlkLCBtZXNzYWdlVmFsdWVzKSA9PlxyXG4gIChkaXNwYXRjaCkgPT4ge1xyXG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XHJcbiAgICBkaXNwYXRjaCh7XHJcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFLFxyXG4gICAgICBpZDogZ3JpZC5pZCxcclxuICAgICAgbWVzc2FnZVR5cGUsXHJcbiAgICAgIGRhdGFJZCxcclxuICAgICAga2V5UGF0aCxcclxuICAgICAgbWVzc2FnZUlkLFxyXG4gICAgICBtZXNzYWdlVmFsdWVzLFxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbmV4cG9ydCBjb25zdCBjZWxsU2hvd01lc3NhZ2VzID0gKGdyaWQsIG1lc3NhZ2VzKSA9PlxyXG4gIChkaXNwYXRjaCkgPT4ge1xyXG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XHJcbiAgICBkaXNwYXRjaCh7XHJcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFUyxcclxuICAgICAgaWQ6IGdyaWQuaWQsXHJcbiAgICAgIG1lc3NhZ2VzLFxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbmV4cG9ydCBjb25zdCBjZWxsSGlkZU1lc3NhZ2UgPSAoZ3JpZCwgbWVzc2FnZVR5cGUgPSBudWxsLCBkYXRhSWQgPSBudWxsLCBrZXlQYXRoID0gbnVsbCkgPT5cclxuICAoZGlzcGF0Y2gpID0+IHtcclxuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xyXG4gICAgZGlzcGF0Y2goe1xyXG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRSxcclxuICAgICAgaWQ6IGdyaWQuaWQsXHJcbiAgICAgIG1lc3NhZ2VUeXBlLFxyXG4gICAgICBkYXRhSWQsXHJcbiAgICAgIGtleVBhdGgsXHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNlbGxTaG93TWVzc2FnZSA9IChcclxuICBncmlkLFxyXG4gIG1lc3NhZ2VUeXBlLFxyXG4gIHJvd0luZGV4LFxyXG4gIGtleVBhdGgsXHJcbiAgbWVzc2FnZUlkLFxyXG4gIG1lc3NhZ2VWYWx1ZXMsXHJcbikgPT5cclxuICAoZGlzcGF0Y2gpID0+IHtcclxuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xyXG4gICAgZGlzcGF0Y2goe1xyXG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9TSE9XX01FU1NBR0UsXHJcbiAgICAgIGlkOiBncmlkLmlkLFxyXG4gICAgICBtZXNzYWdlVHlwZSxcclxuICAgICAgcm93SW5kZXgsXHJcbiAgICAgIGtleVBhdGgsXHJcbiAgICAgIG1lc3NhZ2VJZCxcclxuICAgICAgbWVzc2FnZVZhbHVlcyxcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlQ2VsbEhpZGVNZXNzYWdlID0gKGdyaWQsIG1lc3NhZ2VUeXBlID0gbnVsbCwgcm93SW5kZXggPSBudWxsLCBrZXlQYXRoID0gbnVsbCkgPT5cclxuICAoZGlzcGF0Y2gpID0+IHtcclxuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xyXG4gICAgZGlzcGF0Y2goe1xyXG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9ISURFX01FU1NBR0UsXHJcbiAgICAgIGlkOiBncmlkLmlkLFxyXG4gICAgICBtZXNzYWdlVHlwZSxcclxuICAgICAgcm93SW5kZXgsXHJcbiAgICAgIGtleVBhdGgsXHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuZXhwb3J0IGNvbnN0IGNlbGxTZWxlY3Rpb25DaGFuZ2UgPSAoZ3JpZCwgc2VsZWN0ZWRDZWxsID0gbnVsbCkgPT5cclxuICAoZGlzcGF0Y2gpID0+IHtcclxuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xyXG4gICAgZGlzcGF0Y2goe1xyXG4gICAgICBzZWxlY3RlZENlbGwsXHJcbiAgICAgIGlkOiBncmlkLmlkLFxyXG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX1NFTEVDVElPTl9DSEFOR0UsXHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuZXhwb3J0IGNvbnN0IGl0ZW1TZWxlY3Rpb25DaGFuZ2UgPSAoXHJcbiAgZ3JpZCxcclxuICByb3dJbmRleCxcclxuICBjdHJsUHJlc3NlZCA9IGZhbHNlLFxyXG4gIHNoaWZ0UHJlc3NlZCA9IGZhbHNlLFxyXG4pID0+XHJcbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xyXG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XHJcbiAgICBkaXNwYXRjaCh7XHJcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0lURU1fU0VMRUNUSU9OX0NIQU5HRSxcclxuICAgICAgaWQ6IGdyaWQuaWQsXHJcbiAgICAgIHJvd0luZGV4LFxyXG4gICAgICBpZEtleVBhdGg6IGdyaWQuaWRLZXlQYXRoLFxyXG4gICAgICBjdHJsUHJlc3NlZCxcclxuICAgICAgc2hpZnRQcmVzc2VkLFxyXG4gICAgfSk7XHJcbiAgICBVdGlscy5zYXZlU2VsZWN0ZWRJdGVtcyhncmlkLCBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnc2VsZWN0ZWRJdGVtcyddKSk7XHJcbiAgfTtcclxuXHJcbmV4cG9ydCBjb25zdCBzZWxlY3RBbGxJdGVtc0NoYW5nZSA9IGdyaWQgPT5cclxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XHJcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcclxuICAgIGRpc3BhdGNoKHtcclxuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0UsXHJcbiAgICAgIGlkOiBncmlkLmlkLFxyXG4gICAgICBpZEtleVBhdGg6IGdyaWQuaWRLZXlQYXRoLFxyXG4gICAgfSk7XHJcbiAgICBVdGlscy5zYXZlU2VsZWN0ZWRJdGVtcyhncmlkLCBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnc2VsZWN0ZWRJdGVtcyddKSk7XHJcbiAgfTtcclxuXHJcbmV4cG9ydCBjb25zdCBjbGVhclNlbGVjdGVkSXRlbXMgPSBncmlkID0+XHJcbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xyXG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XHJcbiAgICBkaXNwYXRjaCh7XHJcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NMRUFSX1NFTEVDVEVEX0lURU1TLFxyXG4gICAgICBpZDogZ3JpZC5pZCxcclxuICAgIH0pO1xyXG4gICAgVXRpbHMuc2F2ZVNlbGVjdGVkSXRlbXMoZ3JpZCwgZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ3NlbGVjdGVkSXRlbXMnXSkpO1xyXG4gIH07XHJcblxyXG5leHBvcnQgY29uc3QgdG9nZ2xlRmlsdGVyaW5nID0gZ3JpZCA9PlxyXG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcclxuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xyXG4gICAgY29uc3QgaXNGaWx0ZXJpbmcgPSAhZ2V0U3RhdGUoKVxyXG4gICAgICAuZGF0YWdyaWRcclxuICAgICAgLmdldEluKFtncmlkLmlkLCAnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnaXNGaWx0ZXJpbmcnXSwgZmFsc2UpO1xyXG4gICAgVXRpbHMuc2F2ZUlzRmlsdGVyaW5nKGdyaWQsIGlzRmlsdGVyaW5nKTtcclxuICAgIGRpc3BhdGNoKHtcclxuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfVE9HR0xFX0ZJTFRFUklORyxcclxuICAgICAgaWQ6IGdyaWQuaWQsXHJcbiAgICAgIGlzRmlsdGVyaW5nLFxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUVkaXRlZFJvd3MgPSAoZ3JpZCwgY29sdW1ucykgPT5cclxuICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XHJcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcclxuICAgIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XHJcbiAgICBjb25zdCBlZGl0RGF0YSA9IGdyaWREYXRhLmdldCgnZWRpdERhdGEnLCBNYXAoKSk7XHJcbiAgICBsZXQgYWxsR29vZCA9IHRydWU7XHJcbiAgICBlZGl0RGF0YS5mb3JFYWNoKChlZGl0RGF0YVJvdywgZGF0YUlkKSA9PiB7XHJcbiAgICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XHJcbiAgICAgICAgbGV0IHZhbHVlID0gZWRpdERhdGFSb3cuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XHJcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHZhbHVlID0gZ3JpZERhdGFcclxuICAgICAgICAgICAgLmdldCgnYWxsRGF0YScpXHJcbiAgICAgICAgICAgIC5maW5kKGRhdGEgPT4gZGF0YS5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGRhdGFJZClcclxuICAgICAgICAgICAgLmdldEluKGNvbC52YWx1ZUtleVBhdGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBpc1ZhbGlkID0gZWRpdENlbGxWYWx1ZVZhbGlkYXRlKFxyXG4gICAgICAgICAgZ3JpZCxcclxuICAgICAgICAgIGRhdGFJZCxcclxuICAgICAgICAgIGNvbC52YWx1ZUtleVBhdGgsXHJcbiAgICAgICAgICB2YWx1ZSxcclxuICAgICAgICAgIGNvbC52YWxpZGF0b3JzLFxyXG4gICAgICAgICkoZGlzcGF0Y2gsIGdldFN0YXRlKTtcclxuICAgICAgICBpZiAoYWxsR29vZCAmJiAhaXNWYWxpZCkge1xyXG4gICAgICAgICAgYWxsR29vZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBhbGxHb29kO1xyXG4gIH07XHJcblxyXG5leHBvcnQgY29uc3QgcmVtb3ZlRW1wdHlDcmVhdGVkUm93cyA9IChncmlkLCBjb2x1bW5zKSA9PlxyXG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcclxuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xyXG4gICAgY29uc3QgY3JlYXRlRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdjcmVhdGVEYXRhJ10sIE1hcCgpKTtcclxuICAgIGNvbnN0IGluZGV4ZXMgPSBbXTtcclxuICAgIGNyZWF0ZURhdGEuZm9yRWFjaCgoY3JlYXRlRGF0YVJvdywgcm93SW5kZXgpID0+IHtcclxuICAgICAgbGV0IGlzRW1wdHkgPSB0cnVlO1xyXG4gICAgICBjb2x1bW5zLmZvckVhY2goKGNvbCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gY3JlYXRlRGF0YVJvdy5nZXRJbihjb2wudmFsdWVLZXlQYXRoKTtcclxuICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gJycgJiYgdmFsdWUgIT09IG51bGwpIHtcclxuICAgICAgICAgIGlzRW1wdHkgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAoaXNFbXB0eSkge1xyXG4gICAgICAgIGluZGV4ZXMucHVzaChyb3dJbmRleCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgaWYgKGluZGV4ZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICByZW1vdmVOZXdJdGVtcyhncmlkLCBpbmRleGVzKShkaXNwYXRjaCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUNyZWF0ZWRSb3dzID0gKGdyaWQsIGNvbHVtbnMpID0+XHJcbiAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xyXG4gICAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XHJcbiAgICByZW1vdmVFbXB0eUNyZWF0ZWRSb3dzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XHJcbiAgICBjb25zdCBjcmVhdGVEYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ2NyZWF0ZURhdGEnXSwgTWFwKCkpO1xyXG4gICAgbGV0IGFsbEdvb2QgPSB0cnVlO1xyXG4gICAgY3JlYXRlRGF0YS5mb3JFYWNoKChjcmVhdGVEYXRhUm93LCByb3dJbmRleCkgPT4ge1xyXG4gICAgICBjb2x1bW5zLmZvckVhY2goKGNvbCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gY3JlYXRlRGF0YVJvdy5nZXRJbihjb2wudmFsdWVLZXlQYXRoKTtcclxuICAgICAgICBjb25zdCBpc1ZhbGlkID0gY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUoXHJcbiAgICAgICAgICBncmlkLFxyXG4gICAgICAgICAgcm93SW5kZXgsXHJcbiAgICAgICAgICBjb2wudmFsdWVLZXlQYXRoLFxyXG4gICAgICAgICAgdmFsdWUsXHJcbiAgICAgICAgICBjb2wudmFsaWRhdG9ycyxcclxuICAgICAgICApKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XHJcbiAgICAgICAgaWYgKGFsbEdvb2QgJiYgIWlzVmFsaWQpIHtcclxuICAgICAgICAgIGFsbEdvb2QgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gYWxsR29vZDtcclxuICB9O1xyXG5cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZUV4aXN0aW5nQ2VsbFZhbHVlID0gKGdyaWQsIGRhdGFJZCwga2V5UGF0aCwgdmFsdWUpID0+XHJcbiAgKGRpc3BhdGNoKSA9PiB7XHJcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcclxuICAgIGRpc3BhdGNoKHtcclxuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfVVBEQVRFX0VYSVNUSU5HX0NFTExfVkFMVUUsXHJcbiAgICAgIGlkOiBncmlkLmlkLFxyXG4gICAgICBkYXRhSWQsXHJcbiAgICAgIGtleVBhdGgsXHJcbiAgICAgIHZhbHVlLFxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbmV4cG9ydCBjb25zdCBzZXRFZGl0RGF0YSA9IChncmlkLCBkYXRhLCBjZWxsTWVzc2FnZXMgPSBNYXAoKSkgPT5cclxuICAoZGlzcGF0Y2gpID0+IHtcclxuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xyXG4gICAgZGlzcGF0Y2goe1xyXG4gICAgICBkYXRhLFxyXG4gICAgICBjZWxsTWVzc2FnZXMsXHJcbiAgICAgIGlkOiBncmlkLmlkLFxyXG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfRURJVF9EQVRBLFxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbmV4cG9ydCBjb25zdCBvcGVuQ29sdW1uU2V0dGluZ3NNb2RhbCA9IGdyaWQgPT5cclxuICAoZGlzcGF0Y2gpID0+IHtcclxuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xyXG4gICAgZGlzcGF0Y2goe1xyXG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfT1BFTixcclxuICAgICAgaWQ6IGdyaWQuaWQsXHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuZXhwb3J0IGNvbnN0IGNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbCA9IGdyaWQgPT5cclxuICAoZGlzcGF0Y2gpID0+IHtcclxuICAgIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xyXG4gICAgZGlzcGF0Y2goe1xyXG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfQ0xPU0UsXHJcbiAgICAgIGlkOiBncmlkLmlkLFxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbmV4cG9ydCBjb25zdCBzYXZlQ29sdW1uU2V0dGluZ3MgPSAoZ3JpZCwgaGlkZGVuQ29sdW1ucywgY29sdW1uT3JkZXIpID0+XHJcbiAgKGRpc3BhdGNoKSA9PiB7XHJcbiAgICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcclxuICAgIFV0aWxzLnNhdmVDb2x1bW5TZXR0aW5ncyhncmlkLCBoaWRkZW5Db2x1bW5zLCBjb2x1bW5PcmRlcik7XHJcbiAgICBkaXNwYXRjaCh7XHJcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFLFxyXG4gICAgICBpZDogZ3JpZC5pZCxcclxuICAgICAgY29sdW1uT3JkZXIsXHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuIl19