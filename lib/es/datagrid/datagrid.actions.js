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
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_FORCE_REFRESH
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
    var data;

    if (grid.pagination) {
      return true;
    }

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
    var filterData;

    if (valueEmptyChecker(value)) {
      filterData = origFilterData["delete"](columnKey);
    } else {
      filterData = origFilterData.set(columnKey, value);
    }

    Utils.saveFilterData(grid, filterData);
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
    var column;
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
export var sortChange = function sortChange(grid, columns, column, newSort) {
  return function (dispatch, getState) {
    Utils.checkGridParam(grid);
    var sortOrder = newSort || 'asc';
    var sortColumn = Utils.getColumnKey(column);
    Utils.saveSortData(grid, {
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

export var setFocusTo = function setFocusTo(grid, focusTo, focusToLastRow) {
  if (focusToLastRow === void 0) {
    focusToLastRow = false;
  }

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
export var extendData = function extendData(grid, columns, data, prepend) {
  if (prepend === void 0) {
    prepend = false;
  }

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
export var save = function save(grid, cb) {
  if (cb === void 0) {
    cb = function cb() {};
  }

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
export var remove = function remove(grid, cb) {
  if (cb === void 0) {
    cb = function cb() {};
  }

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
export var editCellValueValidate = function editCellValueValidate(grid, dataId, keyPath, value, validators) {
  if (validators === void 0) {
    validators = [];
  }

  return function (dispatch, getState) {
    Utils.checkGridParam(grid);
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
}; // eslint-disable-next-line max-len

export var createCellValueValidate = function createCellValueValidate(grid, rowIndex, keyPath, value, validators) {
  if (validators === void 0) {
    validators = [];
  }

  return function (dispatch, getState) {
    Utils.checkGridParam(grid);
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
}; // eslint-disable-next-line max-len

export var cellHideMessage = function cellHideMessage(grid, messageType, dataId, keyPath) {
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
}; // eslint-disable-next-line max-len

export var createCellHideMessage = function createCellHideMessage(grid, messageType, rowIndex, keyPath) {
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
export var cellSelectionChange = function cellSelectionChange(grid, selectedCell) {
  if (selectedCell === void 0) {
    selectedCell = null;
  }

  return function (dispatch) {
    Utils.checkGridParam(grid);
    dispatch({
      selectedCell: selectedCell,
      id: grid.id,
      type: TYPES.PLATFORM_DATAGRID_CELL_SELECTION_CHANGE
    });
  };
};
export var itemSelectionChange = function itemSelectionChange(grid, rowIndex, ctrlPressed, shiftPressed) {
  if (ctrlPressed === void 0) {
    ctrlPressed = false;
  }

  if (shiftPressed === void 0) {
    shiftPressed = false;
  }

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
export var setEditData = function setEditData(grid, data, cellMessages) {
  if (cellMessages === void 0) {
    cellMessages = Map();
  }

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
    setBusy(grid)(dispatch);
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
    setBusy(grid)(dispatch);
    Utils.saveRowsOnPage(grid, rowsOnPage);
    dispatch({
      rowsOnPage: rowsOnPage,
      id: grid.id,
      type: TYPES.PLATFORM_DATAGRID_SET_ROWS_ON_PAGE
    });
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5hY3Rpb25zLmpzIl0sIm5hbWVzIjpbIkltbXV0YWJsZSIsIk1hcCIsIlV0aWxzIiwiVFlQRVMiLCJQTEFURk9STV9EQVRBR1JJRF9JTlZBTElEQVRFIiwiUExBVEZPUk1fREFUQUdSSURfQlVTWSIsIlBMQVRGT1JNX0RBVEFHUklEX1JFQURZIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX0RBVEEiLCJQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9TT1JUIiwiUExBVEZPUk1fREFUQUdSSURfU09SVF9DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9SRVNJWkVfQ09MVU1OIiwiUExBVEZPUk1fREFUQUdSSURfRURJVCIsIlBMQVRGT1JNX0RBVEFHUklEX0NBTkNFTCIsIlBMQVRGT1JNX0RBVEFHUklEX1NBVkUiLCJQTEFURk9STV9EQVRBR1JJRF9FWFRFTkRfREFUQSIsIlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfU1VDQ0VTUyIsIlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfUEFSVElBTF9TVUNDRVNTIiwiUExBVEZPUk1fREFUQUdSSURfU0FWRV9GQUlMIiwiUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFIiwiUExBVEZPUk1fREFUQUdSSURfQUREX05FV19JVEVNIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0lURU0iLCJQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU0iLCJQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU1TIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX1NVQ0NFU1MiLCJQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfRkFJTCIsIlBMQVRGT1JNX0RBVEFHUklEX0VESVRfQ0VMTF9WQUxVRV9DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFUyIsIlBMQVRGT1JNX0RBVEFHUklEX0NFTExfSElERV9NRVNTQUdFIiwiUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfU0hPV19NRVNTQUdFIiwiUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfSElERV9NRVNTQUdFIiwiUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfVkFMSURBVEUiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NFTEVDVElPTl9DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9JVEVNX1NFTEVDVElPTl9DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9TRUxFQ1RfQUxMX0lURU1TX0NIQU5HRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NMRUFSX1NFTEVDVEVEX0lURU1TIiwiUExBVEZPUk1fREFUQUdSSURfVE9HR0xFX0ZJTFRFUklORyIsIlBMQVRGT1JNX0RBVEFHUklEX0ZJTFRFUl9EQVRBX0NIQU5HRSIsIlBMQVRGT1JNX0RBVEFHUklEX0FQUExZX0ZJTFRFUlMiLCJQTEFURk9STV9EQVRBR1JJRF9TRVRfRklMVEVSUyIsIlBMQVRGT1JNX0RBVEFHUklEX1VQREFURV9FWElTVElOR19DRUxMX1ZBTFVFIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX0VESVRfREFUQSIsIlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9PUEVOIiwiUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX0NMT1NFIiwiUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX1NBVkUiLCJQTEFURk9STV9EQVRBR1JJRF9GT1JDRV9SRUZSRVNIIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX0ZPQ1VTX1RPIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX1BBR0UiLCJQTEFURk9STV9EQVRBR1JJRF9TRVRfUk9XU19PTl9QQUdFIiwiaW52YWxpZGF0ZSIsImdyaWQiLCJkaXNwYXRjaCIsImNoZWNrR3JpZFBhcmFtIiwidHlwZSIsImlkIiwiZm9yY2VSZWZyZXNoIiwic2V0VGltZW91dCIsImRvY3VtZW50IiwiY3JlYXRlRXZlbnQiLCJldnQiLCJpbml0RXZlbnQiLCJ3aW5kb3ciLCJkaXNwYXRjaEV2ZW50Iiwic2V0QnVzeSIsInNldFJlYWR5IiwiYXBwbHlGaWx0ZXJzIiwiY29sdW1ucyIsImdldFN0YXRlIiwiZm9yRWFjaCIsImdyaWREYXRhIiwiZGF0YWdyaWQiLCJnZXQiLCJmaWx0ZXJEYXRhIiwiZ2V0SW4iLCJhbGxEYXRhIiwiZGF0YSIsInBhZ2luYXRpb24iLCJpc0VtcHR5IiwiZGF0ZUZvcm1hdCIsImdldERhdGVGb3JtYXQiLCJ1c2VyIiwiZmlsdGVyIiwicm93IiwiaGl0cyIsImZpbHRlclZhbHVlIiwiZmlsdGVyQ29sdW1uIiwiY29sdW1uIiwiZ2V0Q29sdW1uS2V5IiwidmFsdWUiLCJ2YWx1ZUtleVBhdGgiLCJmaWx0ZXJNYXRjaGVyIiwiZ2V0RmlsdGVyTWF0Y2hlciIsInNpemUiLCJzZXRBbmRBcHBseUZpbHRlcnMiLCJmaWx0ZXJpbmdEYXRhIiwibm9ybWFsaXplRmlsdGVyaW5nRGF0YSIsInNhdmVGaWx0ZXJEYXRhIiwiZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlIiwib3JpZ0ZpbHRlckRhdGEiLCJjb2x1bW5LZXkiLCJ2YWx1ZUVtcHR5Q2hlY2tlciIsImdldFZhbHVlRW1wdHlDaGVja2VyIiwic2V0IiwidG9KUyIsImFwcGx5U29ydCIsInNvcnREYXRhIiwic29ydENvbHVtbiIsInNvcnRPcmRlciIsImNvbCIsIm9yaWdBbGxEYXRhIiwiY29tcGFyYXRvciIsImdldFNvcnRDb21wYXJhdG9yIiwidmFsdWVHZXR0ZXIiLCJnZXRTb3J0VmFsdWVHZXR0ZXIiLCJzb3J0IiwiYSIsImIiLCJ2YWxBIiwidmFsQiIsInNvcnRDaGFuZ2UiLCJuZXdTb3J0Iiwic2F2ZVNvcnREYXRhIiwic2V0RGF0YSIsImNoZWNrQ29sdW1uc1BhcmFtIiwiY29uZmlnRGF0YSIsImxvYWRHcmlkQ29uZmlnIiwiaW1tdXRhYmxlRGF0YSIsIkl0ZXJhYmxlIiwiaXNJdGVyYWJsZSIsImZyb21KUyIsInNlbGVjdGVkSXRlbXMiLCJsb2FkU2VsZWN0ZWRJdGVtcyIsIml0ZW0iLCJmaW5kIiwiZGF0YUl0ZW0iLCJpZEtleVBhdGgiLCJjb25maWciLCJzZXRGb2N1c1RvIiwiZm9jdXNUbyIsImZvY3VzVG9MYXN0Um93IiwiZXh0ZW5kRGF0YSIsInByZXBlbmQiLCJyZXNpemVDb2x1bW4iLCJ3aWR0aCIsImNvbHVtbldpZHRocyIsInNhdmVDb2x1bW5XaWR0aHMiLCJlZGl0IiwiY2FuY2VsIiwic2F2ZSIsImNiIiwic2F2ZVN1Y2Nlc3MiLCJzYXZlZEl0ZW1zIiwic2F2ZVBhcnRpYWxTdWNjZXNzIiwic2F2ZUZhaWwiLCJjcmVhdGUiLCJjb2x1bW5EZWZhdWx0VmFsdWVzIiwiYWRkTmV3SXRlbSIsInJlbW92ZUl0ZW0iLCJyb3dJZCIsInJlbW92ZU5ld0l0ZW0iLCJpbmRleCIsInJlbW92ZU5ld0l0ZW1zIiwiaW5kZXhlcyIsInJlbW92ZSIsInJlbW92ZVN1Y2Nlc3MiLCJyZW1vdmVkSWRzIiwicmVtb3ZlRmFpbCIsImVkaXRDZWxsVmFsdWVDaGFuZ2UiLCJkYXRhSWQiLCJrZXlQYXRoIiwiZWRpdENlbGxWYWx1ZVZhbGlkYXRlIiwidmFsaWRhdG9ycyIsInZhbGlkYXRpb25TdGF0ZSIsInZhbGlkIiwidmFsaWRhdG9yIiwidW5pcXVlIiwidW5kZWZpbmVkIiwiZWRpdERhdGEiLCJlZGl0RGF0YUl0ZW0iLCJlZGl0RGF0YUl0ZW1JZCIsImZvdW5kSW5kZXgiLCJmaW5kSW5kZXgiLCJkIiwibWVyZ2VEZWVwSW4iLCJmaW5kaW5nIiwibGVuZ3RoIiwibWVzc2FnZSIsInZhbGlkYXRlV2l0aFJvd0RhdGEiLCJyb3dEYXRhIiwibWVyZ2VEZWVwIiwicGFyYW1zIiwiT2JqZWN0IiwidmFsdWVzIiwidmFsaWRhdGUiLCJtZXNzYWdlVmFsdWVzIiwibWVzc2FnZVR5cGUiLCJtZXNzYWdlSWQiLCJjcmVhdGVDZWxsVmFsdWVDaGFuZ2UiLCJyb3dJbmRleCIsImNyZWF0ZUNlbGxWYWx1ZVZhbGlkYXRlIiwiZmluZDIiLCJpIiwiY2VsbFNob3dNZXNzYWdlIiwiY2VsbFNob3dNZXNzYWdlcyIsIm1lc3NhZ2VzIiwiY2VsbEhpZGVNZXNzYWdlIiwiY3JlYXRlQ2VsbFNob3dNZXNzYWdlIiwiY3JlYXRlQ2VsbEhpZGVNZXNzYWdlIiwiY2VsbFNlbGVjdGlvbkNoYW5nZSIsInNlbGVjdGVkQ2VsbCIsIml0ZW1TZWxlY3Rpb25DaGFuZ2UiLCJjdHJsUHJlc3NlZCIsInNoaWZ0UHJlc3NlZCIsInNhdmVTZWxlY3RlZEl0ZW1zIiwic2VsZWN0QWxsSXRlbXNDaGFuZ2UiLCJjbGVhclNlbGVjdGVkSXRlbXMiLCJ0b2dnbGVGaWx0ZXJpbmciLCJpc0ZpbHRlcmluZyIsInNhdmVJc0ZpbHRlcmluZyIsInZhbGlkYXRlRWRpdGVkUm93cyIsImFsbEdvb2QiLCJlZGl0RGF0YVJvdyIsImlzVmFsaWQiLCJyZW1vdmVFbXB0eUNyZWF0ZWRSb3dzIiwiY3JlYXRlRGF0YSIsImNyZWF0ZURhdGFSb3ciLCJwdXNoIiwidmFsaWRhdGVDcmVhdGVkUm93cyIsInVwZGF0ZUV4aXN0aW5nQ2VsbFZhbHVlIiwic2V0RWRpdERhdGEiLCJjZWxsTWVzc2FnZXMiLCJvcGVuQ29sdW1uU2V0dGluZ3NNb2RhbCIsImNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbCIsInNhdmVDb2x1bW5TZXR0aW5ncyIsImhpZGRlbkNvbHVtbnMiLCJjb2x1bW5PcmRlciIsInNldFBhZ2UiLCJwYWdlIiwic2F2ZVBhZ2UiLCJzZXRSb3dzT25QYWdlIiwicm93c09uUGFnZSIsInNhdmVSb3dzT25QYWdlIl0sIm1hcHBpbmdzIjoiQUFBQSxPQUFPQSxTQUFQLElBQW9CQyxHQUFwQixRQUErQixXQUEvQjtBQUNBLE9BQU9DLEtBQVAsTUFBa0Isa0JBQWxCO0FBRUEsT0FBTyxJQUFNQyxLQUFLLEdBQUc7QUFDbkJDLEVBQUFBLDRCQUE0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QWhCQSxhQUFnQixDQUFDN0wsSUFBRCxFQUFPOEwsVUFBUDtBQUFBLFNBQXNCLFVBQUM3TCxRQUFELEVBQWM7QUFDL0RZLElBQUFBLE9BQU8sQ0FBQ2IsSUFBRCxDQUFQLENBQWNDLFFBQWQ7QUFDQW5ELElBQUFBLEtBQUssQ0FBQ2lQLGNBQU4sQ0FBcUIvTCxJQUFyQixFQUEyQjhMLFVBQTNCO0FBQ0E3TCxJQUFBQSxRQUFRLENBQUM7QUFDUDZMLE1BQUFBLFVBQVUsRUFBVkEsVUFETztBQUVQMUwsTUFBQUEsRUFBRSxFQUFFSixJQUFJLENBQUNJLEVBRkY7QUFHUEQsTUFBQUEsSUFBSSxFQUFFcEQsS0FBSyxDQUFDK0M7QUFITCxLQUFELENBQVI7QUFLRCxHQVI0QjtBQUFBLENBQXRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEltbXV0YWJsZSwgeyBNYXAgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4vZGF0YWdyaWQudXRpbHMnO1xuXG5leHBvcnQgY29uc3QgVFlQRVMgPSB7XG4gIFBMQVRGT1JNX0RBVEFHUklEX0lOVkFMSURBVEU6ICdQTEFURk9STV9EQVRBR1JJRF9JTlZBTElEQVRFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQlVTWTogJ1BMQVRGT1JNX0RBVEFHUklEX0JVU1knLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRUFEWTogJ1BMQVRGT1JNX0RBVEFHUklEX1JFQURZJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0VUX0RBVEE6ICdQTEFURk9STV9EQVRBR1JJRF9TRVRfREFUQScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0FQUExZX1NPUlQ6ICdQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9TT1JUJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU09SVF9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9TT1JUX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFU0laRV9DT0xVTU46ICdQTEFURk9STV9EQVRBR1JJRF9SRVNJWkVfQ09MVU1OJyxcbiAgUExBVEZPUk1fREFUQUdSSURfRURJVDogJ1BMQVRGT1JNX0RBVEFHUklEX0VESVQnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DQU5DRUw6ICdQTEFURk9STV9EQVRBR1JJRF9DQU5DRUwnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TQVZFOiAnUExBVEZPUk1fREFUQUdSSURfU0FWRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0VYVEVORF9EQVRBOiAnUExBVEZPUk1fREFUQUdSSURfRVhURU5EX0RBVEEnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TQVZFX1NVQ0NFU1M6ICdQTEFURk9STV9EQVRBR1JJRF9TQVZFX1NVQ0NFU1MnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TQVZFX1BBUlRJQUxfU1VDQ0VTUzogJ1BMQVRGT1JNX0RBVEFHUklEX1NBVkVfUEFSVElBTF9TVUNDRVNTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0FWRV9GQUlMOiAnUExBVEZPUk1fREFUQUdSSURfU0FWRV9GQUlMJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFOiAnUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQUREX05FV19JVEVNOiAnUExBVEZPUk1fREFUQUdSSURfQUREX05FV19JVEVNJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0lURU06ICdQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfSVRFTScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTTogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTVM6ICdQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU1TJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFOiAnUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX1NVQ0NFU1M6ICdQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfU1VDQ0VTUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9GQUlMOiAnUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUwnLFxuICBQTEFURk9STV9EQVRBR1JJRF9FRElUX0NFTExfVkFMVUVfQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfRURJVF9DRUxMX1ZBTFVFX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFOiAnUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRVM6ICdQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRVMnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NFTExfSElERV9NRVNTQUdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfU0hPV19NRVNTQUdFOiAnUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfU0hPV19NRVNTQUdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfSElERV9NRVNTQUdFOiAnUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfSElERV9NRVNTQUdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfVkFMSURBVEU6ICdQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9WQUxJREFURScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0VMRUNUSU9OX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NFTExfU0VMRUNUSU9OX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0lURU1fU0VMRUNUSU9OX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX0lURU1fU0VMRUNUSU9OX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NFTEVDVF9BTExfSVRFTVNfQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DTEVBUl9TRUxFQ1RFRF9JVEVNUzogJ1BMQVRGT1JNX0RBVEFHUklEX0NMRUFSX1NFTEVDVEVEX0lURU1TJyxcbiAgUExBVEZPUk1fREFUQUdSSURfVE9HR0xFX0ZJTFRFUklORzogJ1BMQVRGT1JNX0RBVEFHUklEX1RPR0dMRV9GSUxURVJJTkcnLFxuICBQTEFURk9STV9EQVRBR1JJRF9GSUxURVJfREFUQV9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9GSUxURVJfREFUQV9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9GSUxURVJTOiAnUExBVEZPUk1fREFUQUdSSURfQVBQTFlfRklMVEVSUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NFVF9GSUxURVJTOiAnUExBVEZPUk1fREFUQUdSSURfU0VUX0ZJTFRFUlMnLFxuICBQTEFURk9STV9EQVRBR1JJRF9VUERBVEVfRVhJU1RJTkdfQ0VMTF9WQUxVRTogJ1BMQVRGT1JNX0RBVEFHUklEX1VQREFURV9FWElTVElOR19DRUxMX1ZBTFVFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0VUX0VESVRfREFUQTogJ1BMQVRGT1JNX0RBVEFHUklEX1NFVF9FRElUX0RBVEEnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfT1BFTjogJ1BMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9PUEVOJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX0NMT1NFOiAnUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX0NMT1NFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX1NBVkU6ICdQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfU0FWRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0ZPUkNFX1JFRlJFU0g6ICdQTEFURk9STV9EQVRBR1JJRF9GT1JDRV9SRUZSRVNIJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0VUX0ZPQ1VTX1RPOiAnUExBVEZPUk1fREFUQUdSSURfU0VUX0ZPQ1VTX1RPJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0VUX1BBR0U6ICdQTEFURk9STV9EQVRBR1JJRF9TRVRfUEFHRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NFVF9ST1dTX09OX1BBR0U6ICdQTEFURk9STV9EQVRBR1JJRF9TRVRfUk9XU19PTl9QQUdFJyxcbn07XG5cbmV4cG9ydCBjb25zdCBpbnZhbGlkYXRlID0gZ3JpZCA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9JTlZBTElEQVRFLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBmb3JjZVJlZnJlc2ggPSAoKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgLy8gRmlyZSByZXNpemUgZXZlbnQgdG8gcmVjYWxjdWxhdGUgY29tcG9uZW50IHNpemVzXG4gIC8vIGFuZCB0byBmb3JjZSByZWRyYXcgYWxsIG1vdW50ZWQgZ3JpZHNcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgaWYgKGRvY3VtZW50LmNyZWF0ZUV2ZW50KSB7XG4gICAgICBjb25zdCBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnSFRNTEV2ZW50cycpO1xuICAgICAgZXZ0LmluaXRFdmVudCgncmVzaXplJywgdHJ1ZSwgZmFsc2UpO1xuICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgICB9XG4gIH0sIDEpO1xuICBkaXNwYXRjaCh7IHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0ZPUkNFX1JFRlJFU0ggfSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0QnVzeSA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQlVTWSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0UmVhZHkgPSBncmlkID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFQURZLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBhcHBseUZpbHRlcnMgPSAoZ3JpZCwgY29sdW1ucykgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgaWYgKCFjb2x1bW5zIHx8ICFjb2x1bW5zLmZvckVhY2gpIHJldHVybiBmYWxzZTtcbiAgY29uc3QgZ3JpZERhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldChncmlkLmlkKTtcbiAgaWYgKCFncmlkRGF0YSkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBmaWx0ZXJEYXRhID0gZ3JpZERhdGEuZ2V0SW4oWydjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdmaWx0ZXJEYXRhJ10sIE1hcCgpKTtcbiAgY29uc3QgYWxsRGF0YSA9IGdyaWREYXRhLmdldCgnYWxsRGF0YScpO1xuICBzZXRCdXN5KGdyaWQpKGRpc3BhdGNoKTtcbiAgbGV0IGRhdGE7XG4gIGlmIChncmlkLnBhZ2luYXRpb24pIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoZmlsdGVyRGF0YS5pc0VtcHR5KCkpIHtcbiAgICBkYXRhID0gYWxsRGF0YTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBkYXRlRm9ybWF0ID0gVXRpbHMuZ2V0RGF0ZUZvcm1hdChncmlkLCBnZXRTdGF0ZSgpLnVzZXIpO1xuICAgIGRhdGEgPSBhbGxEYXRhLmZpbHRlcigocm93KSA9PiB7XG4gICAgICBsZXQgaGl0cyA9IDA7XG4gICAgICBmaWx0ZXJEYXRhLmZvckVhY2goKGZpbHRlclZhbHVlLCBmaWx0ZXJDb2x1bW4pID0+IHtcbiAgICAgICAgY29sdW1ucy5mb3JFYWNoKChjb2x1bW4pID0+IHtcbiAgICAgICAgICBpZiAoVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbHVtbikgPT09IGZpbHRlckNvbHVtbikge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSByb3cuZ2V0SW4oY29sdW1uLnZhbHVlS2V5UGF0aCk7XG4gICAgICAgICAgICBpZiAodmFsdWUgfHwgdmFsdWUgPT09IDAgfHwgdmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGZpbHRlck1hdGNoZXIgPSBVdGlscy5nZXRGaWx0ZXJNYXRjaGVyKGNvbHVtbiwgZGF0ZUZvcm1hdCk7XG4gICAgICAgICAgICAgIGlmIChmaWx0ZXJNYXRjaGVyKHJvdywgZmlsdGVyVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgaGl0cyArPSAxO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGhpdHMgPT09IGZpbHRlckRhdGEuc2l6ZTtcbiAgICB9KTtcbiAgfVxuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQVBQTFlfRklMVEVSUyxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBkYXRhLFxuICB9KTtcbiAgc2V0UmVhZHkoZ3JpZCkoZGlzcGF0Y2gpO1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXRBbmRBcHBseUZpbHRlcnMgPSAoZ3JpZCwgY29sdW1ucywgZGF0YSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIGNvbnN0IGZpbHRlcmluZ0RhdGEgPSBVdGlscy5ub3JtYWxpemVGaWx0ZXJpbmdEYXRhKGRhdGEpO1xuICBVdGlscy5zYXZlRmlsdGVyRGF0YShncmlkLCBmaWx0ZXJpbmdEYXRhLmdldCgnZmlsdGVyRGF0YScpKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NFVF9GSUxURVJTLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGZpbHRlcmluZ0RhdGEsXG4gIH0pO1xuICBkaXNwYXRjaChhcHBseUZpbHRlcnMoZ3JpZCwgY29sdW1ucykpO1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmV4cG9ydCBjb25zdCBmaWx0ZXJDZWxsVmFsdWVDaGFuZ2UgPSAoZ3JpZCwgY29sdW1ucywgY29sdW1uLCB2YWx1ZSkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgY29uc3Qgb3JpZ0ZpbHRlckRhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFxuICAgIFtncmlkLmlkLCAnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnZmlsdGVyRGF0YSddLFxuICAgIE1hcCgpLFxuICApO1xuICBjb25zdCBjb2x1bW5LZXkgPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sdW1uKTtcbiAgY29uc3QgdmFsdWVFbXB0eUNoZWNrZXIgPSBVdGlscy5nZXRWYWx1ZUVtcHR5Q2hlY2tlcihjb2x1bW4pO1xuICBsZXQgZmlsdGVyRGF0YTtcbiAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbHVlKSkge1xuICAgIGZpbHRlckRhdGEgPSBvcmlnRmlsdGVyRGF0YS5kZWxldGUoY29sdW1uS2V5KTtcbiAgfSBlbHNlIHtcbiAgICBmaWx0ZXJEYXRhID0gb3JpZ0ZpbHRlckRhdGEuc2V0KGNvbHVtbktleSwgdmFsdWUpO1xuICB9XG4gIFV0aWxzLnNhdmVGaWx0ZXJEYXRhKGdyaWQsIGZpbHRlckRhdGEpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfRklMVEVSX0RBVEFfQ0hBTkdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIC8vIFRoZSBmaWx0ZXJEYXRhIG1pZ2h0IGhhdmUgcHJvcGVydHksIHdoaWNoIHZhbHVlIGlzIGFycmF5ICh0aGlzIGhhcHBlbnMgd2hlbiBsb2FkZWQgZnJvbVxuICAgIC8vIHNlc3Npb24gc3RvcmFnZSkuIEluIG9yZGVyIHRvIGFsbG93IG5lc3RlZCBjb252ZXJ0aW9uIG9mIGZpbHRlckRhdGEgYW5kIGFycmF5IHR5cGUgb2ZcbiAgICAvLyBwcm9wZXJ0eSB0byBiZSBjb252ZXJ0ZWQgdG8gaW1tdXRhYmxlIGxpc3QsIHRoZSBmaWx0ZXJEYXRhIG11c3QgYmUgb2JqZWN0IGluc3RlYWQgb2YgbWFwLlxuICAgIGZpbHRlckRhdGE6IGZpbHRlckRhdGEudG9KUygpLFxuICB9KTtcbiAgYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG59O1xuXG5leHBvcnQgY29uc3QgYXBwbHlTb3J0ID0gKGdyaWQsIGNvbHVtbnMpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGlmICghY29sdW1ucyB8fCAhY29sdW1ucy5mb3JFYWNoKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG4gIGlmICghZ3JpZERhdGEpIHJldHVybiBmYWxzZTtcbiAgY29uc3Qgc29ydERhdGEgPSBncmlkRGF0YS5nZXRJbihbJ2NvbmZpZycsICdzb3J0aW5nRGF0YSddKTtcbiAgaWYgKCFzb3J0RGF0YSkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBzb3J0Q29sdW1uID0gc29ydERhdGEuZ2V0KCdzb3J0Q29sdW1uJyk7XG4gIGlmICghc29ydENvbHVtbikgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBzb3J0T3JkZXIgPSBzb3J0RGF0YS5nZXQoJ3NvcnRPcmRlcicsICdhc2MnKTtcbiAgbGV0IGNvbHVtbjtcbiAgY29sdW1ucy5mb3JFYWNoKChjb2wpID0+IHtcbiAgICBpZiAoVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCkgPT09IHNvcnRDb2x1bW4pIHtcbiAgICAgIGNvbHVtbiA9IGNvbDtcbiAgICB9XG4gIH0pO1xuICBpZiAoIWNvbHVtbikgcmV0dXJuIGZhbHNlO1xuXG4gIHNldEJ1c3koZ3JpZCkoZGlzcGF0Y2gpO1xuICBpZiAoZ3JpZC5wYWdpbmF0aW9uKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBjb25zdCBvcmlnQWxsRGF0YSA9IGdyaWREYXRhLmdldCgnYWxsRGF0YScpO1xuICBjb25zdCBjb21wYXJhdG9yID0gVXRpbHMuZ2V0U29ydENvbXBhcmF0b3IoY29sdW1uKTtcbiAgY29uc3QgdmFsdWVHZXR0ZXIgPSBVdGlscy5nZXRTb3J0VmFsdWVHZXR0ZXIoY29sdW1uKTtcbiAgY29uc3QgdmFsdWVFbXB0eUNoZWNrZXIgPSBVdGlscy5nZXRWYWx1ZUVtcHR5Q2hlY2tlcihjb2x1bW4pO1xuICBjb25zdCBhbGxEYXRhID0gb3JpZ0FsbERhdGEuc29ydCgoYSwgYikgPT4ge1xuICAgIGNvbnN0IHZhbEEgPSB2YWx1ZUdldHRlcihhKTtcbiAgICBjb25zdCB2YWxCID0gdmFsdWVHZXR0ZXIoYik7XG4gICAgaWYgKHNvcnRPcmRlciA9PT0gJ2FzYycpIHtcbiAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxBKSkgcmV0dXJuIC0xO1xuICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEIpKSByZXR1cm4gMTtcbiAgICAgIHJldHVybiBjb21wYXJhdG9yKHZhbEEsIHZhbEIpO1xuICAgIH1cbiAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQSkpIHJldHVybiAxO1xuICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxCKSkgcmV0dXJuIC0xO1xuICAgIHJldHVybiBjb21wYXJhdG9yKHZhbEIsIHZhbEEpO1xuICB9KTtcbiAgbGV0IGRhdGE7XG4gIC8vIFNvcnQgYWxzbyBmaWx0ZXJlZCBkYXRhIHNlcGFyYXRlbHlcbiAgaWYgKGdyaWREYXRhLmdldEluKFsnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnaXNGaWx0ZXJpbmcnXSwgZmFsc2UpKSB7XG4gICAgZGF0YSA9IGdyaWREYXRhLmdldCgnZGF0YScpLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIGNvbnN0IHZhbEEgPSB2YWx1ZUdldHRlcihhKTtcbiAgICAgIGNvbnN0IHZhbEIgPSB2YWx1ZUdldHRlcihiKTtcbiAgICAgIGlmIChzb3J0T3JkZXIgPT09ICdhc2MnKSB7XG4gICAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxBKSkgcmV0dXJuIC0xO1xuICAgICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQikpIHJldHVybiAxO1xuICAgICAgICByZXR1cm4gY29tcGFyYXRvcih2YWxBLCB2YWxCKTtcbiAgICAgIH1cbiAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxBKSkgcmV0dXJuIDE7XG4gICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQikpIHJldHVybiAtMTtcbiAgICAgIHJldHVybiBjb21wYXJhdG9yKHZhbEIsIHZhbEEpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGRhdGEgPSBhbGxEYXRhO1xuICB9XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9BUFBMWV9TT1JULFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGRhdGEsXG4gICAgYWxsRGF0YSxcbiAgfSk7XG4gIHNldFJlYWR5KGdyaWQpKGRpc3BhdGNoKTtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5leHBvcnQgY29uc3Qgc29ydENoYW5nZSA9IChncmlkLCBjb2x1bW5zLCBjb2x1bW4sIG5ld1NvcnQpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGNvbnN0IHNvcnRPcmRlciA9IG5ld1NvcnQgfHwgJ2FzYyc7XG4gIGNvbnN0IHNvcnRDb2x1bW4gPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sdW1uKTtcbiAgVXRpbHMuc2F2ZVNvcnREYXRhKGdyaWQsIHsgc29ydENvbHVtbiwgc29ydE9yZGVyIH0pO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU09SVF9DSEFOR0UsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgc29ydENvbHVtbixcbiAgICBzb3J0T3JkZXIsXG4gIH0pO1xuICBhcHBseVNvcnQoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXREYXRhID0gKGdyaWQsIGNvbHVtbnMsIGRhdGEpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIFV0aWxzLmNoZWNrQ29sdW1uc1BhcmFtKGNvbHVtbnMpO1xuICBjb25zdCBjb25maWdEYXRhID0gVXRpbHMubG9hZEdyaWRDb25maWcoZ3JpZCwgY29sdW1ucyk7XG4gIGNvbnN0IGltbXV0YWJsZURhdGEgPSBJbW11dGFibGUuSXRlcmFibGUuaXNJdGVyYWJsZShkYXRhKSA/IGRhdGEgOiBJbW11dGFibGUuZnJvbUpTKGRhdGEpO1xuICBjb25zdCBzZWxlY3RlZEl0ZW1zID0gVXRpbHMubG9hZFNlbGVjdGVkSXRlbXMoZ3JpZCkuZmlsdGVyKFxuICAgIGl0ZW0gPT4gISFpbW11dGFibGVEYXRhLmZpbmQoZGF0YUl0ZW0gPT4gZGF0YUl0ZW0uZ2V0SW4oZ3JpZC5pZEtleVBhdGgpID09PSBpdGVtKSxcbiAgKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NFVF9EQVRBLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGRhdGE6IGltbXV0YWJsZURhdGEsXG4gICAgY29uZmlnOiBjb25maWdEYXRhLFxuICAgIHNlbGVjdGVkSXRlbXMsXG4gIH0pO1xuICBpZiAoIWdyaWQucGFnaW5hdGlvbikge1xuICAgIGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICAgIGFwcGx5U29ydChncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG4gICAgaWYgKCFncmlkRGF0YSkgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IGZpbHRlckRhdGEgPSBncmlkRGF0YS5nZXRJbihbJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2ZpbHRlckRhdGEnXSwgTWFwKCkpO1xuICAgIGlmICghZmlsdGVyRGF0YS5pc0VtcHR5KCkpIHtcbiAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQVBQTFlfRklMVEVSUyxcbiAgICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICAgIGRhdGE6IGltbXV0YWJsZURhdGEsXG4gICAgICB9KTtcbiAgICB9XG4gICAgY29uc3Qgc29ydERhdGEgPSBncmlkRGF0YS5nZXRJbihbJ2NvbmZpZycsICdzb3J0aW5nRGF0YSddKTtcbiAgICBpZiAoc29ydERhdGEpIHtcbiAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQVBQTFlfU09SVCxcbiAgICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICAgIGRhdGE6IGltbXV0YWJsZURhdGEsXG4gICAgICAgIGFsbERhdGE6IGltbXV0YWJsZURhdGEsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59O1xuXG4vKipcbiAqIEFjdGlvbiB0byBzZXQgZm9jdXMgdG8gZWl0aGVyIGxhc3QgZWRpdGVkUm93LCBjcmVhdGVkUm93IG9yIHRvIHZhbGlkYXRpb24gZXJyb3JcbiAqIEBwYXJhbSB7T2JqZWN0fSBncmlkXG4gKiBAcGFyYW0ge1N0cmluZ30gZm9jdXNUb1R5cGUgLSB0eXBlIG9mIGZvY3VzIHJlcXVlc3QuIFBvc3NpYmxlIHZhbHVlczpcbiAqICdmb2N1c1RvRWRpdENlbGwnIHx8ICdmb2N1c1RvRXJyb3JDZWxsJyB8fCAnZm9jdXNUb0NyZWF0ZUNlbGwnXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGZvY3VzVG9MYXN0Um93IC0gc2V0cyBmb2N1cyB0byBsYXN0IGRhdGEgcm93IGluc3RlYWQgb2Ygc2VsZWN0ZWQgcm93XG4gKi9cbmV4cG9ydCBjb25zdCBzZXRGb2N1c1RvID0gKGdyaWQsIGZvY3VzVG8sIGZvY3VzVG9MYXN0Um93ID0gZmFsc2UpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NFVF9GT0NVU19UTyxcbiAgICBmb2N1c1RvLFxuICAgIGZvY3VzVG9MYXN0Um93LFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBleHRlbmREYXRhID0gKGdyaWQsIGNvbHVtbnMsIGRhdGEsIHByZXBlbmQgPSBmYWxzZSkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgY29uc3QgaW1tdXRhYmxlRGF0YSA9IEltbXV0YWJsZS5JdGVyYWJsZS5pc0l0ZXJhYmxlKGRhdGEpID8gZGF0YSA6IEltbXV0YWJsZS5mcm9tSlMoZGF0YSk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9FWFRFTkRfREFUQSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBkYXRhOiBpbW11dGFibGVEYXRhLFxuICAgIHByZXBlbmQsXG4gIH0pO1xuICBhcHBseUZpbHRlcnMoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgYXBwbHlTb3J0KGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVzaXplQ29sdW1uID0gKGdyaWQsIGNvbHVtbktleSwgd2lkdGgpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGNvbnN0IGNvbHVtbldpZHRocyA9IGdldFN0YXRlKClcbiAgICAuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdjb25maWcnLCAnY29sdW1uV2lkdGhzJ10sIE1hcCgpKVxuICAgIC5zZXQoY29sdW1uS2V5LCB3aWR0aCk7XG4gIFV0aWxzLnNhdmVDb2x1bW5XaWR0aHMoZ3JpZCwgY29sdW1uV2lkdGhzKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFU0laRV9DT0xVTU4sXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgY29sdW1uV2lkdGhzLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBlZGl0ID0gZ3JpZCA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9FRElULFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBjYW5jZWwgPSBncmlkID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NBTkNFTCxcbiAgICBpZDogZ3JpZC5pZCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2F2ZSA9IChncmlkLCBjYiA9ICgpID0+IHt9KSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TQVZFLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbiAgY2IoKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzYXZlU3VjY2VzcyA9IChncmlkLCBjb2x1bW5zLCBzYXZlZEl0ZW1zKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0FWRV9TVUNDRVNTLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgc2F2ZWRJdGVtcyxcbiAgfSk7XG4gIGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICBhcHBseVNvcnQoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzYXZlUGFydGlhbFN1Y2Nlc3MgPSAoZ3JpZCwgY29sdW1ucywgc2F2ZWRJdGVtcykgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfUEFSVElBTF9TVUNDRVNTLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgc2F2ZWRJdGVtcyxcbiAgfSk7XG4gIGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICBhcHBseVNvcnQoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzYXZlRmFpbCA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0FWRV9GQUlMLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGUgPSAoZ3JpZCwgY29sdW1uRGVmYXVsdFZhbHVlcykgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGNvbHVtbkRlZmF1bHRWYWx1ZXMsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGFkZE5ld0l0ZW0gPSAoZ3JpZCwgY29sdW1uRGVmYXVsdFZhbHVlcykgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQUREX05FV19JVEVNLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGNvbHVtbkRlZmF1bHRWYWx1ZXMsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZUl0ZW0gPSAoZ3JpZCwgcm93SWQpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9JVEVNLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgcm93SWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZU5ld0l0ZW0gPSAoZ3JpZCwgaW5kZXgpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBpbmRleCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlTmV3SXRlbXMgPSAoZ3JpZCwgaW5kZXhlcykgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNUyxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBpbmRleGVzLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmUgPSAoZ3JpZCwgY2IgPSAoKSA9PiB7fSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbiAgY2IoKTtcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVTdWNjZXNzID0gKGdyaWQsIHJlbW92ZWRJZHMpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9TVUNDRVNTLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgcmVtb3ZlZElkcyxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlRmFpbCA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUwsXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGVkaXRDZWxsVmFsdWVDaGFuZ2UgPSAoZ3JpZCwgZGF0YUlkLCBrZXlQYXRoLCB2YWx1ZSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfRURJVF9DRUxMX1ZBTFVFX0NIQU5HRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBkYXRhSWQsXG4gICAga2V5UGF0aCxcbiAgICB2YWx1ZSxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZWRpdENlbGxWYWx1ZVZhbGlkYXRlID0gKGdyaWQsIGRhdGFJZCwga2V5UGF0aCwgdmFsdWUsIHZhbGlkYXRvcnMgPSBbXSkgPT4gKFxuICBkaXNwYXRjaCxcbiAgZ2V0U3RhdGUsXG4pID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGxldCB2YWxpZGF0aW9uU3RhdGUgPSB7IHZhbGlkOiB0cnVlIH07XG4gIHZhbGlkYXRvcnMuZm9yRWFjaCgodmFsaWRhdG9yKSA9PiB7XG4gICAgaWYgKHZhbGlkYXRpb25TdGF0ZS52YWxpZCkge1xuICAgICAgaWYgKHZhbGlkYXRvci51bmlxdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSAnJyB8fCB2YWx1ZSAhPT0gbnVsbCB8fCB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgLy8gY29tYmluZSByZWFsIGRhdGEgd2l0aCBjdXJyZW50IHVuc2F2ZWQgZWRpdGVkIGRhdGFcbiAgICAgICAgICBjb25zdCBncmlkRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0KGdyaWQuaWQpO1xuICAgICAgICAgIGNvbnN0IGVkaXREYXRhID0gZ3JpZERhdGEuZ2V0KCdlZGl0RGF0YScpO1xuICAgICAgICAgIGxldCBhbGxEYXRhID0gZ3JpZERhdGEuZ2V0KCdhbGxEYXRhJyk7XG4gICAgICAgICAgaWYgKGVkaXREYXRhKSB7XG4gICAgICAgICAgICBlZGl0RGF0YS5mb3JFYWNoKChlZGl0RGF0YUl0ZW0sIGVkaXREYXRhSXRlbUlkKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGZvdW5kSW5kZXggPSBhbGxEYXRhLmZpbmRJbmRleChkID0+IGQuZ2V0SW4oZ3JpZC5pZEtleVBhdGgpID09PSBlZGl0RGF0YUl0ZW1JZCk7XG4gICAgICAgICAgICAgIGlmIChmb3VuZEluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIGFsbERhdGEgPSBhbGxEYXRhLm1lcmdlRGVlcEluKFtmb3VuZEluZGV4XSwgZWRpdERhdGFJdGVtKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGRldGVybWluZSB1bmlxdWVuZXNzXG4gICAgICAgICAgY29uc3QgZmluZGluZyA9IGFsbERhdGEuZmluZCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYgKGdyaWQuaWRLZXlQYXRoLmxlbmd0aCkge1xuICAgICAgICAgICAgICAvLyBkb24ndCBzZWxmIGNvbXBhcmVcbiAgICAgICAgICAgICAgaWYgKGl0ZW0uZ2V0SW4oZ3JpZC5pZEtleVBhdGgpID09PSBkYXRhSWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpdGVtLmdldEluKGtleVBhdGgpID09PSB2YWx1ZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoZmluZGluZykge1xuICAgICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0ge1xuICAgICAgICAgICAgICB2YWxpZDogZmFsc2UsXG4gICAgICAgICAgICAgIG1lc3NhZ2U6ICdWYWxpZGF0aW9uLlVuaXF1ZScsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh2YWxpZGF0b3IudmFsaWRhdGVXaXRoUm93RGF0YSkge1xuICAgICAgICBjb25zdCBncmlkRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0KGdyaWQuaWQpO1xuICAgICAgICBjb25zdCBlZGl0RGF0YSA9IGdyaWREYXRhLmdldEluKFsnZWRpdERhdGEnLCBkYXRhSWRdLCBNYXAoKSk7XG4gICAgICAgIGxldCByb3dEYXRhID0gZ3JpZERhdGEuZ2V0KCdhbGxEYXRhJykuZmluZChpdGVtID0+IGl0ZW0uZ2V0SW4oZ3JpZC5pZEtleVBhdGgpID09PSBkYXRhSWQpO1xuICAgICAgICBpZiAocm93RGF0YSkge1xuICAgICAgICAgIHJvd0RhdGEgPSByb3dEYXRhLm1lcmdlRGVlcChlZGl0RGF0YSk7XG4gICAgICAgICAgY29uc3QgcGFyYW1zID0gdmFsaWRhdG9yLnBhcmFtcyA/IE9iamVjdC52YWx1ZXModmFsaWRhdG9yLnBhcmFtcykgOiBbXTtcbiAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB2YWxpZGF0b3IudmFsaWRhdGVXaXRoUm93RGF0YSh2YWx1ZSwgcm93RGF0YSwgLi4ucGFyYW1zKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gdmFsaWRhdG9yLnBhcmFtcyA/IE9iamVjdC52YWx1ZXModmFsaWRhdG9yLnBhcmFtcykgOiBbXTtcbiAgICAgICAgdmFsaWRhdGlvblN0YXRlID0gdmFsaWRhdG9yLnZhbGlkYXRlKHZhbHVlLCAuLi5wYXJhbXMpO1xuICAgICAgICBpZiAodmFsaWRhdG9yLnBhcmFtcykge1xuICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlVmFsdWVzID0gdmFsaWRhdG9yLnBhcmFtcztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIGlmICh2YWxpZGF0aW9uU3RhdGUudmFsaWQpIHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgbWVzc2FnZVR5cGU6ICdlcnJvcicsXG4gICAgICBkYXRhSWQsXG4gICAgICBrZXlQYXRoLFxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBtZXNzYWdlVHlwZTogJ2Vycm9yJyxcbiAgICAgIGRhdGFJZCxcbiAgICAgIGtleVBhdGgsXG4gICAgICBtZXNzYWdlSWQ6IHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlLFxuICAgICAgbWVzc2FnZVZhbHVlczogdmFsaWRhdGlvblN0YXRlLm1lc3NhZ2VWYWx1ZXMsXG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHZhbGlkYXRpb25TdGF0ZS52YWxpZDtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVDZWxsVmFsdWVDaGFuZ2UgPSAoZ3JpZCwgcm93SW5kZXgsIGtleVBhdGgsIHZhbHVlKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9DSEFOR0UsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgcm93SW5kZXgsXG4gICAga2V5UGF0aCxcbiAgICB2YWx1ZSxcbiAgfSk7XG59O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNlbGxWYWx1ZVZhbGlkYXRlID0gKGdyaWQsIHJvd0luZGV4LCBrZXlQYXRoLCB2YWx1ZSwgdmFsaWRhdG9ycyA9IFtdKSA9PiAoXG4gIGRpc3BhdGNoLFxuICBnZXRTdGF0ZSxcbikgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgbGV0IHZhbGlkYXRpb25TdGF0ZSA9IHsgdmFsaWQ6IHRydWUgfTtcbiAgdmFsaWRhdG9ycy5mb3JFYWNoKCh2YWxpZGF0b3IpID0+IHtcbiAgICBpZiAodmFsaWRhdGlvblN0YXRlLnZhbGlkKSB7XG4gICAgICBpZiAodmFsaWRhdG9yLnVuaXF1ZSkge1xuICAgICAgICBpZiAodmFsdWUgIT09ICcnIHx8IHZhbHVlICE9PSBudWxsIHx8IHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjb25zdCBmaW5kaW5nID0gZ2V0U3RhdGUoKVxuICAgICAgICAgICAgLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnYWxsRGF0YSddKVxuICAgICAgICAgICAgLmZpbmQoaXRlbSA9PiBpdGVtLmdldEluKGtleVBhdGgpID09PSB2YWx1ZSk7XG4gICAgICAgICAgaWYgKGZpbmRpbmcpIHtcbiAgICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHtcbiAgICAgICAgICAgICAgdmFsaWQ6IGZhbHNlLFxuICAgICAgICAgICAgICBtZXNzYWdlOiAnVmFsaWRhdGlvbi5VbmlxdWUnLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZmluZDIgPSBnZXRTdGF0ZSgpXG4gICAgICAgICAgICAgIC5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ2NyZWF0ZURhdGEnXSlcbiAgICAgICAgICAgICAgLmZpbmQoKGl0ZW0sIGkpID0+IGkgIT09IHJvd0luZGV4ICYmIGl0ZW0uZ2V0SW4oa2V5UGF0aCkgPT09IHZhbHVlKTtcbiAgICAgICAgICAgIGlmIChmaW5kMikge1xuICAgICAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgdmFsaWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdWYWxpZGF0aW9uLlVuaXF1ZScsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHZhbGlkYXRvci52YWxpZGF0ZVdpdGhSb3dEYXRhKSB7XG4gICAgICAgIGNvbnN0IHJvd0RhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnY3JlYXRlRGF0YScsIHJvd0luZGV4XSk7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHZhbGlkYXRvci5wYXJhbXMgPyBPYmplY3QudmFsdWVzKHZhbGlkYXRvci5wYXJhbXMpIDogW107XG4gICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZVdpdGhSb3dEYXRhKHZhbHVlLCByb3dEYXRhLCAuLi5wYXJhbXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gdmFsaWRhdG9yLnBhcmFtcyA/IE9iamVjdC52YWx1ZXModmFsaWRhdG9yLnBhcmFtcykgOiBbXTtcbiAgICAgICAgdmFsaWRhdGlvblN0YXRlID0gdmFsaWRhdG9yLnZhbGlkYXRlKHZhbHVlLCAuLi5wYXJhbXMpO1xuICAgICAgICBpZiAodmFsaWRhdG9yLnBhcmFtcykge1xuICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlVmFsdWVzID0gdmFsaWRhdG9yLnBhcmFtcztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIGlmICh2YWxpZGF0aW9uU3RhdGUudmFsaWQpIHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9ISURFX01FU1NBR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIG1lc3NhZ2VUeXBlOiAnZXJyb3InLFxuICAgICAgcm93SW5kZXgsXG4gICAgICBrZXlQYXRoLFxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgbWVzc2FnZVR5cGU6ICdlcnJvcicsXG4gICAgICByb3dJbmRleCxcbiAgICAgIGtleVBhdGgsXG4gICAgICBtZXNzYWdlSWQ6IHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlLFxuICAgICAgbWVzc2FnZVZhbHVlczogdmFsaWRhdGlvblN0YXRlLm1lc3NhZ2VWYWx1ZXMsXG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHZhbGlkYXRpb25TdGF0ZS52YWxpZDtcbn07XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG5leHBvcnQgY29uc3QgY2VsbFNob3dNZXNzYWdlID0gKFxuICBncmlkLFxuICBtZXNzYWdlVHlwZSxcbiAgZGF0YUlkLFxuICBrZXlQYXRoLFxuICBtZXNzYWdlSWQsXG4gIG1lc3NhZ2VWYWx1ZXMsXG4pID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIG1lc3NhZ2VUeXBlLFxuICAgIGRhdGFJZCxcbiAgICBrZXlQYXRoLFxuICAgIG1lc3NhZ2VJZCxcbiAgICBtZXNzYWdlVmFsdWVzLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBjZWxsU2hvd01lc3NhZ2VzID0gKGdyaWQsIG1lc3NhZ2VzKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRVMsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgbWVzc2FnZXMsXG4gIH0pO1xufTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbmV4cG9ydCBjb25zdCBjZWxsSGlkZU1lc3NhZ2UgPSAoXG4gIGdyaWQsXG4gIG1lc3NhZ2VUeXBlID0gbnVsbCxcbiAgZGF0YUlkID0gbnVsbCxcbiAga2V5UGF0aCA9IG51bGwsXG4pID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfSElERV9NRVNTQUdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIG1lc3NhZ2VUeXBlLFxuICAgIGRhdGFJZCxcbiAgICBrZXlQYXRoLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVDZWxsU2hvd01lc3NhZ2UgPSAoXG4gIGdyaWQsXG4gIG1lc3NhZ2VUeXBlLFxuICByb3dJbmRleCxcbiAga2V5UGF0aCxcbiAgbWVzc2FnZUlkLFxuICBtZXNzYWdlVmFsdWVzLFxuKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9TSE9XX01FU1NBR0UsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgbWVzc2FnZVR5cGUsXG4gICAgcm93SW5kZXgsXG4gICAga2V5UGF0aCxcbiAgICBtZXNzYWdlSWQsXG4gICAgbWVzc2FnZVZhbHVlcyxcbiAgfSk7XG59O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNlbGxIaWRlTWVzc2FnZSA9IChcbiAgZ3JpZCxcbiAgbWVzc2FnZVR5cGUgPSBudWxsLFxuICByb3dJbmRleCA9IG51bGwsXG4gIGtleVBhdGggPSBudWxsLFxuKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9ISURFX01FU1NBR0UsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgbWVzc2FnZVR5cGUsXG4gICAgcm93SW5kZXgsXG4gICAga2V5UGF0aCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgY2VsbFNlbGVjdGlvbkNoYW5nZSA9IChncmlkLCBzZWxlY3RlZENlbGwgPSBudWxsKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICBzZWxlY3RlZENlbGwsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TRUxFQ1RJT05fQ0hBTkdFLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBpdGVtU2VsZWN0aW9uQ2hhbmdlID0gKGdyaWQsIHJvd0luZGV4LCBjdHJsUHJlc3NlZCA9IGZhbHNlLCBzaGlmdFByZXNzZWQgPSBmYWxzZSkgPT4gKFxuICBkaXNwYXRjaCxcbiAgZ2V0U3RhdGUsXG4pID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9JVEVNX1NFTEVDVElPTl9DSEFOR0UsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgcm93SW5kZXgsXG4gICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgICBjdHJsUHJlc3NlZCxcbiAgICBzaGlmdFByZXNzZWQsXG4gIH0pO1xuICBVdGlscy5zYXZlU2VsZWN0ZWRJdGVtcyhncmlkLCBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldEluKFtncmlkLmlkLCAnc2VsZWN0ZWRJdGVtcyddKSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0QWxsSXRlbXNDaGFuZ2UgPSBncmlkID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRUxFQ1RfQUxMX0lURU1TX0NIQU5HRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBpZEtleVBhdGg6IGdyaWQuaWRLZXlQYXRoLFxuICB9KTtcbiAgVXRpbHMuc2F2ZVNlbGVjdGVkSXRlbXMoZ3JpZCwgZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ3NlbGVjdGVkSXRlbXMnXSkpO1xufTtcblxuZXhwb3J0IGNvbnN0IGNsZWFyU2VsZWN0ZWRJdGVtcyA9IGdyaWQgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NMRUFSX1NFTEVDVEVEX0lURU1TLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbiAgVXRpbHMuc2F2ZVNlbGVjdGVkSXRlbXMoZ3JpZCwgZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ3NlbGVjdGVkSXRlbXMnXSkpO1xufTtcblxuZXhwb3J0IGNvbnN0IHRvZ2dsZUZpbHRlcmluZyA9IGdyaWQgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgY29uc3QgaXNGaWx0ZXJpbmcgPSAhZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihcbiAgICBbZ3JpZC5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2lzRmlsdGVyaW5nJ10sXG4gICAgZmFsc2UsXG4gICk7XG4gIFV0aWxzLnNhdmVJc0ZpbHRlcmluZyhncmlkLCBpc0ZpbHRlcmluZyk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9UT0dHTEVfRklMVEVSSU5HLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGlzRmlsdGVyaW5nLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUVkaXRlZFJvd3MgPSAoZ3JpZCwgY29sdW1ucykgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgY29uc3QgZ3JpZERhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldChncmlkLmlkKTtcbiAgY29uc3QgZWRpdERhdGEgPSBncmlkRGF0YS5nZXQoJ2VkaXREYXRhJywgTWFwKCkpO1xuICBsZXQgYWxsR29vZCA9IHRydWU7XG4gIGVkaXREYXRhLmZvckVhY2goKGVkaXREYXRhUm93LCBkYXRhSWQpID0+IHtcbiAgICBjb2x1bW5zLmZvckVhY2goKGNvbCkgPT4ge1xuICAgICAgbGV0IHZhbHVlID0gZWRpdERhdGFSb3cuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG4gICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YWx1ZSA9IGdyaWREYXRhXG4gICAgICAgICAgLmdldCgnYWxsRGF0YScpXG4gICAgICAgICAgLmZpbmQoZGF0YSA9PiBkYXRhLmdldEluKGdyaWQuaWRLZXlQYXRoKSA9PT0gZGF0YUlkKVxuICAgICAgICAgIC5nZXRJbihjb2wudmFsdWVLZXlQYXRoKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGlzVmFsaWQgPSBlZGl0Q2VsbFZhbHVlVmFsaWRhdGUoZ3JpZCwgZGF0YUlkLCBjb2wudmFsdWVLZXlQYXRoLCB2YWx1ZSwgY29sLnZhbGlkYXRvcnMpKFxuICAgICAgICBkaXNwYXRjaCxcbiAgICAgICAgZ2V0U3RhdGUsXG4gICAgICApO1xuICAgICAgaWYgKGFsbEdvb2QgJiYgIWlzVmFsaWQpIHtcbiAgICAgICAgYWxsR29vZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIGFsbEdvb2Q7XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlRW1wdHlDcmVhdGVkUm93cyA9IChncmlkLCBjb2x1bW5zKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBjb25zdCBjcmVhdGVEYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ2NyZWF0ZURhdGEnXSwgTWFwKCkpO1xuICBjb25zdCBpbmRleGVzID0gW107XG4gIGNyZWF0ZURhdGEuZm9yRWFjaCgoY3JlYXRlRGF0YVJvdywgcm93SW5kZXgpID0+IHtcbiAgICBsZXQgaXNFbXB0eSA9IHRydWU7XG4gICAgY29sdW1ucy5mb3JFYWNoKChjb2wpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gY3JlYXRlRGF0YVJvdy5nZXRJbihjb2wudmFsdWVLZXlQYXRoKTtcbiAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSAnJyAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICBpc0VtcHR5ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGlzRW1wdHkpIHtcbiAgICAgIGluZGV4ZXMucHVzaChyb3dJbmRleCk7XG4gICAgfVxuICB9KTtcbiAgaWYgKGluZGV4ZXMubGVuZ3RoID4gMCkge1xuICAgIHJlbW92ZU5ld0l0ZW1zKGdyaWQsIGluZGV4ZXMpKGRpc3BhdGNoKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHZhbGlkYXRlQ3JlYXRlZFJvd3MgPSAoZ3JpZCwgY29sdW1ucykgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgcmVtb3ZlRW1wdHlDcmVhdGVkUm93cyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICBjb25zdCBjcmVhdGVEYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ2NyZWF0ZURhdGEnXSwgTWFwKCkpO1xuICBsZXQgYWxsR29vZCA9IHRydWU7XG4gIGNyZWF0ZURhdGEuZm9yRWFjaCgoY3JlYXRlRGF0YVJvdywgcm93SW5kZXgpID0+IHtcbiAgICBjb2x1bW5zLmZvckVhY2goKGNvbCkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSBjcmVhdGVEYXRhUm93LmdldEluKGNvbC52YWx1ZUtleVBhdGgpO1xuICAgICAgY29uc3QgaXNWYWxpZCA9IGNyZWF0ZUNlbGxWYWx1ZVZhbGlkYXRlKFxuICAgICAgICBncmlkLFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgY29sLnZhbHVlS2V5UGF0aCxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIGNvbC52YWxpZGF0b3JzLFxuICAgICAgKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICAgICAgaWYgKGFsbEdvb2QgJiYgIWlzVmFsaWQpIHtcbiAgICAgICAgYWxsR29vZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIGFsbEdvb2Q7XG59O1xuXG5leHBvcnQgY29uc3QgdXBkYXRlRXhpc3RpbmdDZWxsVmFsdWUgPSAoZ3JpZCwgZGF0YUlkLCBrZXlQYXRoLCB2YWx1ZSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfVVBEQVRFX0VYSVNUSU5HX0NFTExfVkFMVUUsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgZGF0YUlkLFxuICAgIGtleVBhdGgsXG4gICAgdmFsdWUsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldEVkaXREYXRhID0gKGdyaWQsIGRhdGEsIGNlbGxNZXNzYWdlcyA9IE1hcCgpKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICBkYXRhLFxuICAgIGNlbGxNZXNzYWdlcyxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfRURJVF9EQVRBLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBvcGVuQ29sdW1uU2V0dGluZ3NNb2RhbCA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX09QRU4sXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbCA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX0NMT1NFLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzYXZlQ29sdW1uU2V0dGluZ3MgPSAoZ3JpZCwgaGlkZGVuQ29sdW1ucywgY29sdW1uT3JkZXIpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgVXRpbHMuc2F2ZUNvbHVtblNldHRpbmdzKGdyaWQsIGhpZGRlbkNvbHVtbnMsIGNvbHVtbk9yZGVyKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGNvbHVtbk9yZGVyLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXRQYWdlID0gKGdyaWQsIHBhZ2UpID0+IChkaXNwYXRjaCkgPT4ge1xuICBzZXRCdXN5KGdyaWQpKGRpc3BhdGNoKTtcbiAgVXRpbHMuc2F2ZVBhZ2UoZ3JpZCwgcGFnZSk7XG4gIGRpc3BhdGNoKHtcbiAgICBwYWdlLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NFVF9QQUdFLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXRSb3dzT25QYWdlID0gKGdyaWQsIHJvd3NPblBhZ2UpID0+IChkaXNwYXRjaCkgPT4ge1xuICBzZXRCdXN5KGdyaWQpKGRpc3BhdGNoKTtcbiAgVXRpbHMuc2F2ZVJvd3NPblBhZ2UoZ3JpZCwgcm93c09uUGFnZSk7XG4gIGRpc3BhdGNoKHtcbiAgICByb3dzT25QYWdlLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NFVF9ST1dTX09OX1BBR0UsXG4gIH0pO1xufTtcbiJdfQ==