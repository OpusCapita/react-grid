import Immutable, { Map, List } from 'immutable';
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
    var data;

    if (grid.pagination) {
      return true;
    }

    setBusy(grid)(dispatch);

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

    if (grid.pagination) {
      return true;
    }

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
          // Custom validator function with rowData as parameters
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
        } else if (validator.validateWithGridData) {
          // Custom validator function with rowData and gridData as parameters
          var _gridData2 = getState().datagrid.get(grid.id);

          var _allData = _gridData2.get('allData', List());

          var _editData2 = _gridData2.get('editData', Map());

          _editData2.forEach(function (editRow, editKey) {
            var foundIndex = _allData.findIndex(function (d) {
              return d.getIn(grid.idKeyPath) === editKey;
            });

            if (foundIndex !== -1) {
              _allData = _allData.mergeDeepIn([foundIndex], editRow);
            }
          });

          var editRowData = _editData2.get(dataId, Map());

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
      grid: grid,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5hY3Rpb25zLmpzIl0sIm5hbWVzIjpbIkltbXV0YWJsZSIsIk1hcCIsIkxpc3QiLCJVdGlscyIsIlRZUEVTIiwiUExBVEZPUk1fREFUQUdSSURfSU5WQUxJREFURSIsIlBMQVRGT1JNX0RBVEFHUklEX0JVU1kiLCJQTEFURk9STV9EQVRBR1JJRF9SRUFEWSIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9EQVRBIiwiUExBVEZPUk1fREFUQUdSSURfQVBQTFlfU09SVCIsIlBMQVRGT1JNX0RBVEFHUklEX1NPUlRfQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfUkVTSVpFX0NPTFVNTiIsIlBMQVRGT1JNX0RBVEFHUklEX0VESVQiLCJQTEFURk9STV9EQVRBR1JJRF9DQU5DRUwiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFIiwiUExBVEZPUk1fREFUQUdSSURfRVhURU5EX0RBVEEiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFX1NVQ0NFU1MiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFX1BBUlRJQUxfU1VDQ0VTUyIsIlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfRkFJTCIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURSIsIlBMQVRGT1JNX0RBVEFHUklEX0FERF9ORVdfSVRFTSIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9JVEVNIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNUyIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRSIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9TVUNDRVNTIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUwiLCJQTEFURk9STV9EQVRBR1JJRF9FRElUX0NFTExfVkFMVUVfQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0UiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRVMiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX0hJREVfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX0NIQU5HRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX1ZBTElEQVRFIiwiUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TRUxFQ1RJT05fQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9DTEVBUl9TRUxFQ1RFRF9JVEVNUyIsIlBMQVRGT1JNX0RBVEFHUklEX1RPR0dMRV9GSUxURVJJTkciLCJQTEFURk9STV9EQVRBR1JJRF9GSUxURVJfREFUQV9DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9GSUxURVJTIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX0ZJTFRFUlMiLCJQTEFURk9STV9EQVRBR1JJRF9VUERBVEVfRVhJU1RJTkdfQ0VMTF9WQUxVRSIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9FRElUX0RBVEEiLCJQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfT1BFTiIsIlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFIiwiUExBVEZPUk1fREFUQUdSSURfRk9SQ0VfUkVGUkVTSCIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9GT0NVU19UTyIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9QQUdFIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX1JPV1NfT05fUEFHRSIsImludmFsaWRhdGUiLCJncmlkIiwiZGlzcGF0Y2giLCJjaGVja0dyaWRQYXJhbSIsInR5cGUiLCJpZCIsImZvcmNlUmVmcmVzaCIsInNldFRpbWVvdXQiLCJkb2N1bWVudCIsImNyZWF0ZUV2ZW50IiwiZXZ0IiwiaW5pdEV2ZW50Iiwid2luZG93IiwiZGlzcGF0Y2hFdmVudCIsInNldEJ1c3kiLCJzZXRSZWFkeSIsImFwcGx5RmlsdGVycyIsImNvbHVtbnMiLCJnZXRTdGF0ZSIsImZvckVhY2giLCJncmlkRGF0YSIsImRhdGFncmlkIiwiZ2V0IiwiZmlsdGVyRGF0YSIsImdldEluIiwiYWxsRGF0YSIsImRhdGEiLCJwYWdpbmF0aW9uIiwiaXNFbXB0eSIsImRhdGVGb3JtYXQiLCJnZXREYXRlRm9ybWF0IiwidXNlciIsImZpbHRlciIsInJvdyIsImhpdHMiLCJmaWx0ZXJWYWx1ZSIsImZpbHRlckNvbHVtbiIsImNvbHVtbiIsImdldENvbHVtbktleSIsInZhbHVlIiwidmFsdWVLZXlQYXRoIiwiZmlsdGVyTWF0Y2hlciIsImdldEZpbHRlck1hdGNoZXIiLCJzaXplIiwic2V0QW5kQXBwbHlGaWx0ZXJzIiwiZmlsdGVyaW5nRGF0YSIsIm5vcm1hbGl6ZUZpbHRlcmluZ0RhdGEiLCJzYXZlRmlsdGVyRGF0YSIsImZpbHRlckNlbGxWYWx1ZUNoYW5nZSIsIm9yaWdGaWx0ZXJEYXRhIiwiY29sdW1uS2V5IiwidmFsdWVFbXB0eUNoZWNrZXIiLCJnZXRWYWx1ZUVtcHR5Q2hlY2tlciIsInNldCIsInRvSlMiLCJhcHBseVNvcnQiLCJzb3J0RGF0YSIsInNvcnRDb2x1bW4iLCJzb3J0T3JkZXIiLCJjb2wiLCJvcmlnQWxsRGF0YSIsImNvbXBhcmF0b3IiLCJnZXRTb3J0Q29tcGFyYXRvciIsInZhbHVlR2V0dGVyIiwiZ2V0U29ydFZhbHVlR2V0dGVyIiwic29ydCIsImEiLCJiIiwidmFsQSIsInZhbEIiLCJzb3J0Q2hhbmdlIiwibmV3U29ydCIsInNhdmVTb3J0RGF0YSIsInNldERhdGEiLCJjaGVja0NvbHVtbnNQYXJhbSIsImNvbmZpZ0RhdGEiLCJsb2FkR3JpZENvbmZpZyIsImltbXV0YWJsZURhdGEiLCJJdGVyYWJsZSIsImlzSXRlcmFibGUiLCJmcm9tSlMiLCJzZWxlY3RlZEl0ZW1zIiwibG9hZFNlbGVjdGVkSXRlbXMiLCJpdGVtIiwiZmluZCIsImRhdGFJdGVtIiwiaWRLZXlQYXRoIiwiY29uZmlnIiwic2V0Rm9jdXNUbyIsImZvY3VzVG8iLCJmb2N1c1RvTGFzdFJvdyIsImV4dGVuZERhdGEiLCJwcmVwZW5kIiwicmVzaXplQ29sdW1uIiwid2lkdGgiLCJjb2x1bW5XaWR0aHMiLCJzYXZlQ29sdW1uV2lkdGhzIiwiZWRpdCIsImNhbmNlbCIsInNhdmUiLCJjYiIsInNhdmVTdWNjZXNzIiwic2F2ZWRJdGVtcyIsInNhdmVQYXJ0aWFsU3VjY2VzcyIsInNhdmVGYWlsIiwiY3JlYXRlIiwiY29sdW1uRGVmYXVsdFZhbHVlcyIsImFkZE5ld0l0ZW0iLCJyZW1vdmVJdGVtIiwicm93SWQiLCJyZW1vdmVOZXdJdGVtIiwiaW5kZXgiLCJyZW1vdmVOZXdJdGVtcyIsImluZGV4ZXMiLCJyZW1vdmUiLCJyZW1vdmVTdWNjZXNzIiwicmVtb3ZlZElkcyIsInJlbW92ZUZhaWwiLCJlZGl0Q2VsbFZhbHVlQ2hhbmdlIiwiZGF0YUlkIiwia2V5UGF0aCIsImVkaXRDZWxsVmFsdWVWYWxpZGF0ZSIsInZhbGlkYXRvcnMiLCJ2YWxpZGF0aW9uU3RhdGUiLCJ2YWxpZCIsInZhbGlkYXRvciIsInVuaXF1ZSIsInVuZGVmaW5lZCIsImVkaXREYXRhIiwiZWRpdERhdGFJdGVtIiwiZWRpdERhdGFJdGVtSWQiLCJmb3VuZEluZGV4IiwiZmluZEluZGV4IiwiZCIsIm1lcmdlRGVlcEluIiwiZmluZGluZyIsImxlbmd0aCIsIm1lc3NhZ2UiLCJ2YWxpZGF0ZVdpdGhSb3dEYXRhIiwicm93RGF0YSIsIm1lcmdlRGVlcCIsInBhcmFtcyIsIk9iamVjdCIsInZhbHVlcyIsInZhbGlkYXRlV2l0aEdyaWREYXRhIiwiZWRpdFJvdyIsImVkaXRLZXkiLCJlZGl0Um93RGF0YSIsInZhbGlkYXRlIiwibWVzc2FnZVZhbHVlcyIsIm1lc3NhZ2VUeXBlIiwibWVzc2FnZUlkIiwiY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlIiwicm93SW5kZXgiLCJjcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZSIsImZpbmQyIiwiaSIsImNlbGxTaG93TWVzc2FnZSIsImNlbGxTaG93TWVzc2FnZXMiLCJtZXNzYWdlcyIsImNlbGxIaWRlTWVzc2FnZSIsImNyZWF0ZUNlbGxTaG93TWVzc2FnZSIsImNyZWF0ZUNlbGxIaWRlTWVzc2FnZSIsImNlbGxTZWxlY3Rpb25DaGFuZ2UiLCJzZWxlY3RlZENlbGwiLCJpdGVtU2VsZWN0aW9uQ2hhbmdlIiwiY3RybFByZXNzZWQiLCJzaGlmdFByZXNzZWQiLCJzYXZlU2VsZWN0ZWRJdGVtcyIsInNlbGVjdEFsbEl0ZW1zQ2hhbmdlIiwiY2xlYXJTZWxlY3RlZEl0ZW1zIiwidG9nZ2xlRmlsdGVyaW5nIiwiaXNGaWx0ZXJpbmciLCJzYXZlSXNGaWx0ZXJpbmciLCJ2YWxpZGF0ZUVkaXRlZFJvd3MiLCJhbGxHb29kIiwiZWRpdERhdGFSb3ciLCJpc1ZhbGlkIiwicmVtb3ZlRW1wdHlDcmVhdGVkUm93cyIsImNyZWF0ZURhdGEiLCJjcmVhdGVEYXRhUm93IiwicHVzaCIsInZhbGlkYXRlQ3JlYXRlZFJvd3MiLCJ1cGRhdGVFeGlzdGluZ0NlbGxWYWx1ZSIsInNldEVkaXREYXRhIiwiY2VsbE1lc3NhZ2VzIiwib3BlbkNvbHVtblNldHRpbmdzTW9kYWwiLCJjbG9zZUNvbHVtblNldHRpbmdzTW9kYWwiLCJzYXZlQ29sdW1uU2V0dGluZ3MiLCJoaWRkZW5Db2x1bW5zIiwiY29sdW1uT3JkZXIiLCJzZXRQYWdlIiwicGFnZSIsInNhdmVQYWdlIiwic2V0Um93c09uUGFnZSIsInJvd3NPblBhZ2UiLCJzYXZlUm93c09uUGFnZSJdLCJtYXBwaW5ncyI6IkFBQUEsT0FBT0EsU0FBUCxJQUFvQkMsR0FBcEIsRUFBeUJDLElBQXpCLFFBQXFDLFdBQXJDO0FBQ0EsT0FBT0MsS0FBUCxNQUFrQixrQkFBbEI7QUFFQSxPQUFPLElBQU1DLEtBQUssR0FBRztBQUNuQkMsRUFBQUEsNEJBQTRCLEVBQUUsOEJBRFg7QUFFbkJDLEVBQUFBLHNCQUFzQixFQUFFLHdCQUZMO0FBR25CQyxFQUFBQSx1QkFBdUIsRUFBRSx5QkFITjtBQUluQkMsRUFBQUEsMEJBQTBCLEVBQUUsNEJBSlQ7QUFLbkJDLEVBQUFBLDRCQUE0QixFQUFFLDhCQUxYO0FBTW5CQyxFQUFBQSw2QkFBNkIsRUFBRSwrQkFOWjtBQU9uQkMsRUFBQUEsK0JBQStCLEVBQUUsaUNBUGQ7QUFRbkJDLEVBQUFBLHNCQUFzQixFQUFFLHdCQVJMO0FBU25CQyxFQUFBQSx3QkFBd0IsRUFBRSwwQkFUUDtBQVVuQkMsRUFBQUEsc0JBQXNCLEVBQUUsd0JBVkw7QUFXbkJDLEVBQUFBLDZCQUE2QixFQUFFLCtCQVhaO0FBWW5CQyxFQUFBQSw4QkFBOEIsRUFBRSxnQ0FaYjtBQWFuQkMsRUFBQUEsc0NBQXNDLEVBQUUsd0NBYnJCO0FBY25CQyxFQUFBQSwyQkFBMkIsRUFBRSw2QkFkVjtBQWVuQkMsRUFBQUEsd0JBQXdCLEVBQUUsMEJBZlA7QUFnQm5CQyxFQUFBQSw4QkFBOEIsRUFBRSxnQ0FoQmI7QUFpQm5CQyxFQUFBQSw2QkFBNkIsRUFBRSwrQkFqQlo7QUFrQm5CQyxFQUFBQSxpQ0FBaUMsRUFBRSxtQ0FsQmhCO0FBbUJuQkMsRUFBQUEsa0NBQWtDLEVBQUUsb0NBbkJqQjtBQW9CbkJDLEVBQUFBLHdCQUF3QixFQUFFLDBCQXBCUDtBQXFCbkJDLEVBQUFBLGdDQUFnQyxFQUFFLGtDQXJCZjtBQXNCbkJDLEVBQUFBLDZCQUE2QixFQUFFLCtCQXRCWjtBQXVCbkJDLEVBQUFBLHdDQUF3QyxFQUFFLDBDQXZCdkI7QUF3Qm5CQyxFQUFBQSxtQ0FBbUMsRUFBRSxxQ0F4QmxCO0FBeUJuQkMsRUFBQUEsb0NBQW9DLEVBQUUsc0NBekJuQjtBQTBCbkJDLEVBQUFBLG1DQUFtQyxFQUFFLHFDQTFCbEI7QUEyQm5CQyxFQUFBQSwwQ0FBMEMsRUFBRSw0Q0EzQnpCO0FBNEJuQkMsRUFBQUEsMENBQTBDLEVBQUUsNENBNUJ6QjtBQTZCbkJDLEVBQUFBLDBDQUEwQyxFQUFFLDRDQTdCekI7QUE4Qm5CQyxFQUFBQSw0Q0FBNEMsRUFBRSw4Q0E5QjNCO0FBK0JuQkMsRUFBQUEsdUNBQXVDLEVBQUUseUNBL0J0QjtBQWdDbkJDLEVBQUFBLHVDQUF1QyxFQUFFLHlDQWhDdEI7QUFpQ25CQyxFQUFBQSx5Q0FBeUMsRUFBRSwyQ0FqQ3hCO0FBa0NuQkMsRUFBQUEsc0NBQXNDLEVBQUUsd0NBbENyQjtBQW1DbkJDLEVBQUFBLGtDQUFrQyxFQUFFLG9DQW5DakI7QUFvQ25CQyxFQUFBQSxvQ0FBb0MsRUFBRSxzQ0FwQ25CO0FBcUNuQkMsRUFBQUEsK0JBQStCLEVBQUUsaUNBckNkO0FBc0NuQkMsRUFBQUEsNkJBQTZCLEVBQUUsK0JBdENaO0FBdUNuQkMsRUFBQUEsNENBQTRDLEVBQUUsOENBdkMzQjtBQXdDbkJDLEVBQUFBLCtCQUErQixFQUFFLGlDQXhDZDtBQXlDbkJDLEVBQUFBLDRDQUE0QyxFQUFFLDhDQXpDM0I7QUEwQ25CQyxFQUFBQSw2Q0FBNkMsRUFBRSwrQ0ExQzVCO0FBMkNuQkMsRUFBQUEsc0NBQXNDLEVBQUUsd0NBM0NyQjtBQTRDbkJDLEVBQUFBLCtCQUErQixFQUFFLGlDQTVDZDtBQTZDbkJDLEVBQUFBLDhCQUE4QixFQUFFLGdDQTdDYjtBQThDbkJDLEVBQUFBLDBCQUEwQixFQUFFLDRCQTlDVDtBQStDbkJDLEVBQUFBLGtDQUFrQyxFQUFFO0FBL0NqQixDQUFkO0FBa0RQLE9BQU8sSUFBTUMsVUFBVSxHQUFHLFNBQWJBLFVBQWEsQ0FBQUMsSUFBSTtBQUFBLFNBQUksVUFBQ0MsUUFBRCxFQUFjO0FBQzlDbkQsSUFBQUEsS0FBSyxDQUFDb0QsY0FBTixDQUFxQkYsSUFBckI7QUFDQUMsSUFBQUEsUUFBUSxDQUFDO0FBQ1BFLE1BQUFBLElBQUksRUFBRXBELEtBQUssQ0FBQ0MsNEJBREw7QUFFUG9ELE1BQUFBLEVBQUUsRUFBRUosSUFBSSxDQUFDSTtBQUZGLEtBQUQsQ0FBUjtBQUlELEdBTjZCO0FBQUEsQ0FBdkI7QUFRUCxPQUFPLElBQU1DLFlBQVksR0FBRyxTQUFmQSxZQUFlO0FBQUEsU0FBTSxVQUFDSixRQUFELEVBQWM7QUFDOUM7QUFDQTtBQUNBSyxJQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNmLFVBQUlDLFFBQVEsQ0FBQ0MsV0FBYixFQUEwQjtBQUN4QixZQUFNQyxHQUFHLEdBQUdGLFFBQVEsQ0FBQ0MsV0FBVCxDQUFxQixZQUFyQixDQUFaO0FBQ0FDLFFBQUFBLEdBQUcsQ0FBQ0MsU0FBSixDQUFjLFFBQWQsRUFBd0IsSUFBeEIsRUFBOEIsS0FBOUI7QUFDQUMsUUFBQUEsTUFBTSxDQUFDQyxhQUFQLENBQXFCSCxHQUFyQjtBQUNEO0FBQ0YsS0FOUyxFQU1QLENBTk8sQ0FBVjtBQU9BUixJQUFBQSxRQUFRLENBQUM7QUFBRUUsTUFBQUEsSUFBSSxFQUFFcEQsS0FBSyxDQUFDNEM7QUFBZCxLQUFELENBQVI7QUFDRCxHQVgyQjtBQUFBLENBQXJCO0FBYVAsT0FBTyxJQUFNa0IsT0FBTyxHQUFHLFNBQVZBLE9BQVUsQ0FBQWIsSUFBSTtBQUFBLFNBQUksVUFBQ0MsUUFBRCxFQUFjO0FBQzNDbkQsSUFBQUEsS0FBSyxDQUFDb0QsY0FBTixDQUFxQkYsSUFBckI7QUFDQUMsSUFBQUEsUUFBUSxDQUFDO0FBQ1BFLE1BQUFBLElBQUksRUFBRXBELEtBQUssQ0FBQ0Usc0JBREw7QUFFUG1ELE1BQUFBLEVBQUUsRUFBRUosSUFBSSxDQUFDSTtBQUZGLEtBQUQsQ0FBUjtBQUlELEdBTjBCO0FBQUEsQ0FBcEI7QUFRUCxPQUFPLElBQU1VLFFBQVEsR0FBRyxTQUFYQSxRQUFXLENBQUFkLElBQUk7QUFBQSxTQUFJLFVBQUNDLFFBQUQsRUFBYztBQUM1Q25ELElBQUFBLEtBQUssQ0FBQ29ELGNBQU4sQ0FBcUJGLElBQXJCO0FBQ0FDLElBQUFBLFFBQVEsQ0FBQztBQUNQRSxNQUFBQSxJQUFJLEVBQUVwRCxLQUFLLENBQUNHLHVCQURMO0FBRVBrRCxNQUFBQSxFQUFFLEVBQUVKLElBQUksQ0FBQ0k7QUFGRixLQUFELENBQVI7QUFJRCxHQU4yQjtBQUFBLENBQXJCO0FBUVAsT0FBTyxJQUFNVyxZQUFZLEdBQUcsU0FBZkEsWUFBZSxDQUFDZixJQUFELEVBQU9nQixPQUFQO0FBQUEsU0FBbUIsVUFBQ2YsUUFBRCxFQUFXZ0IsUUFBWCxFQUF3QjtBQUNyRW5FLElBQUFBLEtBQUssQ0FBQ29ELGNBQU4sQ0FBcUJGLElBQXJCO0FBQ0EsUUFBSSxDQUFDZ0IsT0FBRCxJQUFZLENBQUNBLE9BQU8sQ0FBQ0UsT0FBekIsRUFBa0MsT0FBTyxLQUFQO0FBQ2xDLFFBQU1DLFFBQVEsR0FBR0YsUUFBUSxHQUFHRyxRQUFYLENBQW9CQyxHQUFwQixDQUF3QnJCLElBQUksQ0FBQ0ksRUFBN0IsQ0FBakI7QUFDQSxRQUFJLENBQUNlLFFBQUwsRUFBZSxPQUFPLEtBQVA7QUFDZixRQUFNRyxVQUFVLEdBQUdILFFBQVEsQ0FBQ0ksS0FBVCxDQUFlLENBQUMsUUFBRCxFQUFXLGVBQVgsRUFBNEIsWUFBNUIsQ0FBZixFQUEwRDNFLEdBQUcsRUFBN0QsQ0FBbkI7QUFDQSxRQUFNNEUsT0FBTyxHQUFHTCxRQUFRLENBQUNFLEdBQVQsQ0FBYSxTQUFiLENBQWhCO0FBQ0EsUUFBSUksSUFBSjs7QUFDQSxRQUFJekIsSUFBSSxDQUFDMEIsVUFBVCxFQUFxQjtBQUNuQixhQUFPLElBQVA7QUFDRDs7QUFDRGIsSUFBQUEsT0FBTyxDQUFDYixJQUFELENBQVAsQ0FBY0MsUUFBZDs7QUFDQSxRQUFJcUIsVUFBVSxDQUFDSyxPQUFYLEVBQUosRUFBMEI7QUFDeEJGLE1BQUFBLElBQUksR0FBR0QsT0FBUDtBQUNELEtBRkQsTUFFTztBQUNMLFVBQU1JLFVBQVUsR0FBRzlFLEtBQUssQ0FBQytFLGFBQU4sQ0FBb0I3QixJQUFwQixFQUEwQmlCLFFBQVEsR0FBR2EsSUFBckMsQ0FBbkI7QUFDQUwsTUFBQUEsSUFBSSxHQUFHRCxPQUFPLENBQUNPLE1BQVIsQ0FBZSxVQUFDQyxHQUFELEVBQVM7QUFDN0IsWUFBSUMsSUFBSSxHQUFHLENBQVg7QUFDQVgsUUFBQUEsVUFBVSxDQUFDSixPQUFYLENBQW1CLFVBQUNnQixXQUFELEVBQWNDLFlBQWQsRUFBK0I7QUFDaERuQixVQUFBQSxPQUFPLENBQUNFLE9BQVIsQ0FBZ0IsVUFBQ2tCLE1BQUQsRUFBWTtBQUMxQixnQkFBSXRGLEtBQUssQ0FBQ3VGLFlBQU4sQ0FBbUJELE1BQW5CLE1BQStCRCxZQUFuQyxFQUFpRDtBQUMvQyxrQkFBTUcsS0FBSyxHQUFHTixHQUFHLENBQUNULEtBQUosQ0FBVWEsTUFBTSxDQUFDRyxZQUFqQixDQUFkOztBQUNBLGtCQUFJRCxLQUFLLElBQUlBLEtBQUssS0FBSyxDQUFuQixJQUF3QkEsS0FBSyxLQUFLLEtBQXRDLEVBQTZDO0FBQzNDLG9CQUFNRSxhQUFhLEdBQUcxRixLQUFLLENBQUMyRixnQkFBTixDQUF1QkwsTUFBdkIsRUFBK0JSLFVBQS9CLENBQXRCOztBQUNBLG9CQUFJWSxhQUFhLENBQUNSLEdBQUQsRUFBTUUsV0FBTixDQUFqQixFQUFxQztBQUNuQ0Qsa0JBQUFBLElBQUksSUFBSSxDQUFSO0FBQ0Q7QUFDRjtBQUNGO0FBQ0YsV0FWRDtBQVdELFNBWkQ7QUFhQSxlQUFPQSxJQUFJLEtBQUtYLFVBQVUsQ0FBQ29CLElBQTNCO0FBQ0QsT0FoQk0sQ0FBUDtBQWlCRDs7QUFDRHpDLElBQUFBLFFBQVEsQ0FBQztBQUNQRSxNQUFBQSxJQUFJLEVBQUVwRCxLQUFLLENBQUNxQywrQkFETDtBQUVQZ0IsTUFBQUEsRUFBRSxFQUFFSixJQUFJLENBQUNJLEVBRkY7QUFHUHFCLE1BQUFBLElBQUksRUFBSkE7QUFITyxLQUFELENBQVI7QUFLQVgsSUFBQUEsUUFBUSxDQUFDZCxJQUFELENBQVIsQ0FBZUMsUUFBZjtBQUNBLFdBQU8sSUFBUDtBQUNELEdBekMyQjtBQUFBLENBQXJCO0FBMkNQLE9BQU8sSUFBTTBDLGtCQUFrQixHQUFHLFNBQXJCQSxrQkFBcUIsQ0FBQzNDLElBQUQsRUFBT2dCLE9BQVAsRUFBZ0JTLElBQWhCO0FBQUEsU0FBeUIsVUFBQ3hCLFFBQUQsRUFBYztBQUN2RSxRQUFNMkMsYUFBYSxHQUFHOUYsS0FBSyxDQUFDK0Ysc0JBQU4sQ0FBNkJwQixJQUE3QixDQUF0QjtBQUNBM0UsSUFBQUEsS0FBSyxDQUFDZ0csY0FBTixDQUFxQjlDLElBQXJCLEVBQTJCNEMsYUFBYSxDQUFDdkIsR0FBZCxDQUFrQixZQUFsQixDQUEzQjtBQUNBcEIsSUFBQUEsUUFBUSxDQUFDO0FBQ1BFLE1BQUFBLElBQUksRUFBRXBELEtBQUssQ0FBQ3NDLDZCQURMO0FBRVBlLE1BQUFBLEVBQUUsRUFBRUosSUFBSSxDQUFDSSxFQUZGO0FBR1B3QyxNQUFBQSxhQUFhLEVBQWJBO0FBSE8sS0FBRCxDQUFSO0FBS0EzQyxJQUFBQSxRQUFRLENBQUNjLFlBQVksQ0FBQ2YsSUFBRCxFQUFPZ0IsT0FBUCxDQUFiLENBQVI7QUFDQSxXQUFPLElBQVA7QUFDRCxHQVZpQztBQUFBLENBQTNCO0FBWVAsT0FBTyxJQUFNK0IscUJBQXFCLEdBQUcsU0FBeEJBLHFCQUF3QixDQUFDL0MsSUFBRCxFQUFPZ0IsT0FBUCxFQUFnQm9CLE1BQWhCLEVBQXdCRSxLQUF4QjtBQUFBLFNBQWtDLFVBQUNyQyxRQUFELEVBQVdnQixRQUFYLEVBQXdCO0FBQzdGbkUsSUFBQUEsS0FBSyxDQUFDb0QsY0FBTixDQUFxQkYsSUFBckI7QUFDQSxRQUFNZ0QsY0FBYyxHQUFHL0IsUUFBUSxHQUFHRyxRQUFYLENBQW9CRyxLQUFwQixDQUNyQixDQUFDdkIsSUFBSSxDQUFDSSxFQUFOLEVBQVUsUUFBVixFQUFvQixlQUFwQixFQUFxQyxZQUFyQyxDQURxQixFQUVyQnhELEdBQUcsRUFGa0IsQ0FBdkI7QUFJQSxRQUFNcUcsU0FBUyxHQUFHbkcsS0FBSyxDQUFDdUYsWUFBTixDQUFtQkQsTUFBbkIsQ0FBbEI7QUFDQSxRQUFNYyxpQkFBaUIsR0FBR3BHLEtBQUssQ0FBQ3FHLG9CQUFOLENBQTJCZixNQUEzQixDQUExQjtBQUNBLFFBQUlkLFVBQUo7O0FBQ0EsUUFBSTRCLGlCQUFpQixDQUFDWixLQUFELENBQXJCLEVBQThCO0FBQzVCaEIsTUFBQUEsVUFBVSxHQUFHMEIsY0FBYyxVQUFkLENBQXNCQyxTQUF0QixDQUFiO0FBQ0QsS0FGRCxNQUVPO0FBQ0wzQixNQUFBQSxVQUFVLEdBQUcwQixjQUFjLENBQUNJLEdBQWYsQ0FBbUJILFNBQW5CLEVBQThCWCxLQUE5QixDQUFiO0FBQ0Q7O0FBQ0R4RixJQUFBQSxLQUFLLENBQUNnRyxjQUFOLENBQXFCOUMsSUFBckIsRUFBMkJzQixVQUEzQjtBQUNBckIsSUFBQUEsUUFBUSxDQUFDO0FBQ1BFLE1BQUFBLElBQUksRUFBRXBELEtBQUssQ0FBQ29DLG9DQURMO0FBRVBpQixNQUFBQSxFQUFFLEVBQUVKLElBQUksQ0FBQ0ksRUFGRjtBQUdQO0FBQ0E7QUFDQTtBQUNBa0IsTUFBQUEsVUFBVSxFQUFFQSxVQUFVLENBQUMrQixJQUFYO0FBTkwsS0FBRCxDQUFSO0FBUUF0QyxJQUFBQSxZQUFZLENBQUNmLElBQUQsRUFBT2dCLE9BQVAsQ0FBWixDQUE0QmYsUUFBNUIsRUFBc0NnQixRQUF0QztBQUNELEdBeEJvQztBQUFBLENBQTlCO0FBMEJQLE9BQU8sSUFBTXFDLFNBQVMsR0FBRyxTQUFaQSxTQUFZLENBQUN0RCxJQUFELEVBQU9nQixPQUFQO0FBQUEsU0FBbUIsVUFBQ2YsUUFBRCxFQUFXZ0IsUUFBWCxFQUF3QjtBQUNsRW5FLElBQUFBLEtBQUssQ0FBQ29ELGNBQU4sQ0FBcUJGLElBQXJCO0FBQ0EsUUFBSSxDQUFDZ0IsT0FBRCxJQUFZLENBQUNBLE9BQU8sQ0FBQ0UsT0FBekIsRUFBa0MsT0FBTyxLQUFQO0FBQ2xDLFFBQU1DLFFBQVEsR0FBR0YsUUFBUSxHQUFHRyxRQUFYLENBQW9CQyxHQUFwQixDQUF3QnJCLElBQUksQ0FBQ0ksRUFBN0IsQ0FBakI7QUFDQSxRQUFJLENBQUNlLFFBQUwsRUFBZSxPQUFPLEtBQVA7QUFDZixRQUFNb0MsUUFBUSxHQUFHcEMsUUFBUSxDQUFDSSxLQUFULENBQWUsQ0FBQyxRQUFELEVBQVcsYUFBWCxDQUFmLENBQWpCO0FBQ0EsUUFBSSxDQUFDZ0MsUUFBTCxFQUFlLE9BQU8sS0FBUDtBQUNmLFFBQU1DLFVBQVUsR0FBR0QsUUFBUSxDQUFDbEMsR0FBVCxDQUFhLFlBQWIsQ0FBbkI7QUFDQSxRQUFJLENBQUNtQyxVQUFMLEVBQWlCLE9BQU8sS0FBUDtBQUNqQixRQUFNQyxTQUFTLEdBQUdGLFFBQVEsQ0FBQ2xDLEdBQVQsQ0FBYSxXQUFiLEVBQTBCLEtBQTFCLENBQWxCO0FBQ0EsUUFBSWUsTUFBSjtBQUNBcEIsSUFBQUEsT0FBTyxDQUFDRSxPQUFSLENBQWdCLFVBQUN3QyxHQUFELEVBQVM7QUFDdkIsVUFBSTVHLEtBQUssQ0FBQ3VGLFlBQU4sQ0FBbUJxQixHQUFuQixNQUE0QkYsVUFBaEMsRUFBNEM7QUFDMUNwQixRQUFBQSxNQUFNLEdBQUdzQixHQUFUO0FBQ0Q7QUFDRixLQUpEO0FBS0EsUUFBSSxDQUFDdEIsTUFBTCxFQUFhLE9BQU8sS0FBUDs7QUFFYixRQUFJcEMsSUFBSSxDQUFDMEIsVUFBVCxFQUFxQjtBQUNuQixhQUFPLElBQVA7QUFDRDs7QUFFRGIsSUFBQUEsT0FBTyxDQUFDYixJQUFELENBQVAsQ0FBY0MsUUFBZDtBQUNBLFFBQU0wRCxXQUFXLEdBQUd4QyxRQUFRLENBQUNFLEdBQVQsQ0FBYSxTQUFiLENBQXBCO0FBQ0EsUUFBTXVDLFVBQVUsR0FBRzlHLEtBQUssQ0FBQytHLGlCQUFOLENBQXdCekIsTUFBeEIsQ0FBbkI7QUFDQSxRQUFNMEIsV0FBVyxHQUFHaEgsS0FBSyxDQUFDaUgsa0JBQU4sQ0FBeUIzQixNQUF6QixDQUFwQjtBQUNBLFFBQU1jLGlCQUFpQixHQUFHcEcsS0FBSyxDQUFDcUcsb0JBQU4sQ0FBMkJmLE1BQTNCLENBQTFCO0FBQ0EsUUFBTVosT0FBTyxHQUFHbUMsV0FBVyxDQUFDSyxJQUFaLENBQWlCLFVBQUNDLENBQUQsRUFBSUMsQ0FBSixFQUFVO0FBQ3pDLFVBQU1DLElBQUksR0FBR0wsV0FBVyxDQUFDRyxDQUFELENBQXhCO0FBQ0EsVUFBTUcsSUFBSSxHQUFHTixXQUFXLENBQUNJLENBQUQsQ0FBeEI7O0FBQ0EsVUFBSVQsU0FBUyxLQUFLLEtBQWxCLEVBQXlCO0FBQ3ZCLFlBQUlQLGlCQUFpQixDQUFDaUIsSUFBRCxDQUFyQixFQUE2QixPQUFPLENBQUMsQ0FBUjtBQUM3QixZQUFJakIsaUJBQWlCLENBQUNrQixJQUFELENBQXJCLEVBQTZCLE9BQU8sQ0FBUDtBQUM3QixlQUFPUixVQUFVLENBQUNPLElBQUQsRUFBT0MsSUFBUCxDQUFqQjtBQUNEOztBQUNELFVBQUlsQixpQkFBaUIsQ0FBQ2lCLElBQUQsQ0FBckIsRUFBNkIsT0FBTyxDQUFQO0FBQzdCLFVBQUlqQixpQkFBaUIsQ0FBQ2tCLElBQUQsQ0FBckIsRUFBNkIsT0FBTyxDQUFDLENBQVI7QUFDN0IsYUFBT1IsVUFBVSxDQUFDUSxJQUFELEVBQU9ELElBQVAsQ0FBakI7QUFDRCxLQVhlLENBQWhCO0FBWUEsUUFBSTFDLElBQUosQ0F2Q2tFLENBd0NsRTs7QUFDQSxRQUFJTixRQUFRLENBQUNJLEtBQVQsQ0FBZSxDQUFDLFFBQUQsRUFBVyxlQUFYLEVBQTRCLGFBQTVCLENBQWYsRUFBMkQsS0FBM0QsQ0FBSixFQUF1RTtBQUNyRUUsTUFBQUEsSUFBSSxHQUFHTixRQUFRLENBQUNFLEdBQVQsQ0FBYSxNQUFiLEVBQXFCMkMsSUFBckIsQ0FBMEIsVUFBQ0MsQ0FBRCxFQUFJQyxDQUFKLEVBQVU7QUFDekMsWUFBTUMsSUFBSSxHQUFHTCxXQUFXLENBQUNHLENBQUQsQ0FBeEI7QUFDQSxZQUFNRyxJQUFJLEdBQUdOLFdBQVcsQ0FBQ0ksQ0FBRCxDQUF4Qjs7QUFDQSxZQUFJVCxTQUFTLEtBQUssS0FBbEIsRUFBeUI7QUFDdkIsY0FBSVAsaUJBQWlCLENBQUNpQixJQUFELENBQXJCLEVBQTZCLE9BQU8sQ0FBQyxDQUFSO0FBQzdCLGNBQUlqQixpQkFBaUIsQ0FBQ2tCLElBQUQsQ0FBckIsRUFBNkIsT0FBTyxDQUFQO0FBQzdCLGlCQUFPUixVQUFVLENBQUNPLElBQUQsRUFBT0MsSUFBUCxDQUFqQjtBQUNEOztBQUNELFlBQUlsQixpQkFBaUIsQ0FBQ2lCLElBQUQsQ0FBckIsRUFBNkIsT0FBTyxDQUFQO0FBQzdCLFlBQUlqQixpQkFBaUIsQ0FBQ2tCLElBQUQsQ0FBckIsRUFBNkIsT0FBTyxDQUFDLENBQVI7QUFDN0IsZUFBT1IsVUFBVSxDQUFDUSxJQUFELEVBQU9ELElBQVAsQ0FBakI7QUFDRCxPQVhNLENBQVA7QUFZRCxLQWJELE1BYU87QUFDTDFDLE1BQUFBLElBQUksR0FBR0QsT0FBUDtBQUNEOztBQUNEdkIsSUFBQUEsUUFBUSxDQUFDO0FBQ1BFLE1BQUFBLElBQUksRUFBRXBELEtBQUssQ0FBQ0ssNEJBREw7QUFFUGdELE1BQUFBLEVBQUUsRUFBRUosSUFBSSxDQUFDSSxFQUZGO0FBR1BxQixNQUFBQSxJQUFJLEVBQUpBLElBSE87QUFJUEQsTUFBQUEsT0FBTyxFQUFQQTtBQUpPLEtBQUQsQ0FBUjtBQU1BVixJQUFBQSxRQUFRLENBQUNkLElBQUQsQ0FBUixDQUFlQyxRQUFmO0FBQ0EsV0FBTyxJQUFQO0FBQ0QsR0FqRXdCO0FBQUEsQ0FBbEI7QUFtRVAsT0FBTyxJQUFNb0UsVUFBVSxHQUFHLFNBQWJBLFVBQWEsQ0FBQ3JFLElBQUQsRUFBT2dCLE9BQVAsRUFBZ0JvQixNQUFoQixFQUF3QmtDLE9BQXhCO0FBQUEsU0FBb0MsVUFBQ3JFLFFBQUQsRUFBV2dCLFFBQVgsRUFBd0I7QUFDcEZuRSxJQUFBQSxLQUFLLENBQUNvRCxjQUFOLENBQXFCRixJQUFyQjtBQUNBLFFBQU15RCxTQUFTLEdBQUdhLE9BQU8sSUFBSSxLQUE3QjtBQUNBLFFBQU1kLFVBQVUsR0FBRzFHLEtBQUssQ0FBQ3VGLFlBQU4sQ0FBbUJELE1BQW5CLENBQW5CO0FBQ0F0RixJQUFBQSxLQUFLLENBQUN5SCxZQUFOLENBQW1CdkUsSUFBbkIsRUFBeUI7QUFBRXdELE1BQUFBLFVBQVUsRUFBVkEsVUFBRjtBQUFjQyxNQUFBQSxTQUFTLEVBQVRBO0FBQWQsS0FBekI7QUFDQXhELElBQUFBLFFBQVEsQ0FBQztBQUNQRSxNQUFBQSxJQUFJLEVBQUVwRCxLQUFLLENBQUNNLDZCQURMO0FBRVArQyxNQUFBQSxFQUFFLEVBQUVKLElBQUksQ0FBQ0ksRUFGRjtBQUdQb0QsTUFBQUEsVUFBVSxFQUFWQSxVQUhPO0FBSVBDLE1BQUFBLFNBQVMsRUFBVEE7QUFKTyxLQUFELENBQVI7QUFNQUgsSUFBQUEsU0FBUyxDQUFDdEQsSUFBRCxFQUFPZ0IsT0FBUCxDQUFULENBQXlCZixRQUF6QixFQUFtQ2dCLFFBQW5DO0FBQ0QsR0FaeUI7QUFBQSxDQUFuQjtBQWNQLE9BQU8sSUFBTXVELE9BQU8sR0FBRyxTQUFWQSxPQUFVLENBQUN4RSxJQUFELEVBQU9nQixPQUFQLEVBQWdCUyxJQUFoQjtBQUFBLFNBQXlCLFVBQUN4QixRQUFELEVBQVdnQixRQUFYLEVBQXdCO0FBQ3RFbkUsSUFBQUEsS0FBSyxDQUFDb0QsY0FBTixDQUFxQkYsSUFBckI7QUFDQWxELElBQUFBLEtBQUssQ0FBQzJILGlCQUFOLENBQXdCekQsT0FBeEI7QUFDQSxRQUFNMEQsVUFBVSxHQUFHNUgsS0FBSyxDQUFDNkgsY0FBTixDQUFxQjNFLElBQXJCLEVBQTJCZ0IsT0FBM0IsQ0FBbkI7QUFDQSxRQUFNNEQsYUFBYSxHQUFHakksU0FBUyxDQUFDa0ksUUFBVixDQUFtQkMsVUFBbkIsQ0FBOEJyRCxJQUE5QixJQUFzQ0EsSUFBdEMsR0FBNkM5RSxTQUFTLENBQUNvSSxNQUFWLENBQWlCdEQsSUFBakIsQ0FBbkU7QUFDQSxRQUFNdUQsYUFBYSxHQUFHbEksS0FBSyxDQUFDbUksaUJBQU4sQ0FBd0JqRixJQUF4QixFQUE4QitCLE1BQTlCLENBQ3BCLFVBQUFtRCxJQUFJO0FBQUEsYUFBSSxDQUFDLENBQUNOLGFBQWEsQ0FBQ08sSUFBZCxDQUFtQixVQUFBQyxRQUFRO0FBQUEsZUFBSUEsUUFBUSxDQUFDN0QsS0FBVCxDQUFldkIsSUFBSSxDQUFDcUYsU0FBcEIsTUFBbUNILElBQXZDO0FBQUEsT0FBM0IsQ0FBTjtBQUFBLEtBRGdCLENBQXRCO0FBR0FqRixJQUFBQSxRQUFRLENBQUM7QUFDUEUsTUFBQUEsSUFBSSxFQUFFcEQsS0FBSyxDQUFDSSwwQkFETDtBQUVQaUQsTUFBQUEsRUFBRSxFQUFFSixJQUFJLENBQUNJLEVBRkY7QUFHUHFCLE1BQUFBLElBQUksRUFBRW1ELGFBSEM7QUFJUFUsTUFBQUEsTUFBTSxFQUFFWixVQUpEO0FBS1BNLE1BQUFBLGFBQWEsRUFBYkE7QUFMTyxLQUFELENBQVI7O0FBT0EsUUFBSSxDQUFDaEYsSUFBSSxDQUFDMEIsVUFBVixFQUFzQjtBQUNwQlgsTUFBQUEsWUFBWSxDQUFDZixJQUFELEVBQU9nQixPQUFQLENBQVosQ0FBNEJmLFFBQTVCLEVBQXNDZ0IsUUFBdEM7QUFDQXFDLE1BQUFBLFNBQVMsQ0FBQ3RELElBQUQsRUFBT2dCLE9BQVAsQ0FBVCxDQUF5QmYsUUFBekIsRUFBbUNnQixRQUFuQztBQUNEOztBQUNELFdBQU8sSUFBUDtBQUNELEdBcEJzQjtBQUFBLENBQWhCO0FBc0JQOzs7Ozs7OztBQU9BLE9BQU8sSUFBTXNFLFVBQVUsR0FBRyxTQUFiQSxVQUFhLENBQUN2RixJQUFELEVBQU93RixPQUFQLEVBQWdCQyxjQUFoQjtBQUFBLE1BQWdCQSxjQUFoQjtBQUFnQkEsSUFBQUEsY0FBaEIsR0FBaUMsS0FBakM7QUFBQTs7QUFBQSxTQUEyQyxVQUFDeEYsUUFBRCxFQUFjO0FBQ2pGbkQsSUFBQUEsS0FBSyxDQUFDb0QsY0FBTixDQUFxQkYsSUFBckI7QUFDQUMsSUFBQUEsUUFBUSxDQUFDO0FBQ1BFLE1BQUFBLElBQUksRUFBRXBELEtBQUssQ0FBQzZDLDhCQURMO0FBRVA0RixNQUFBQSxPQUFPLEVBQVBBLE9BRk87QUFHUEMsTUFBQUEsY0FBYyxFQUFkQSxjQUhPO0FBSVByRixNQUFBQSxFQUFFLEVBQUVKLElBQUksQ0FBQ0k7QUFKRixLQUFELENBQVI7QUFNRCxHQVJ5QjtBQUFBLENBQW5CO0FBVVAsT0FBTyxJQUFNc0YsVUFBVSxHQUFHLFNBQWJBLFVBQWEsQ0FBQzFGLElBQUQsRUFBT2dCLE9BQVAsRUFBZ0JTLElBQWhCLEVBQXNCa0UsT0FBdEI7QUFBQSxNQUFzQkEsT0FBdEI7QUFBc0JBLElBQUFBLE9BQXRCLEdBQWdDLEtBQWhDO0FBQUE7O0FBQUEsU0FBMEMsVUFBQzFGLFFBQUQsRUFBV2dCLFFBQVgsRUFBd0I7QUFDMUZuRSxJQUFBQSxLQUFLLENBQUNvRCxjQUFOLENBQXFCRixJQUFyQjtBQUNBLFFBQU00RSxhQUFhLEdBQUdqSSxTQUFTLENBQUNrSSxRQUFWLENBQW1CQyxVQUFuQixDQUE4QnJELElBQTlCLElBQXNDQSxJQUF0QyxHQUE2QzlFLFNBQVMsQ0FBQ29JLE1BQVYsQ0FBaUJ0RCxJQUFqQixDQUFuRTtBQUNBeEIsSUFBQUEsUUFBUSxDQUFDO0FBQ1BFLE1BQUFBLElBQUksRUFBRXBELEtBQUssQ0FBQ1csNkJBREw7QUFFUDBDLE1BQUFBLEVBQUUsRUFBRUosSUFBSSxDQUFDSSxFQUZGO0FBR1BxQixNQUFBQSxJQUFJLEVBQUVtRCxhQUhDO0FBSVBlLE1BQUFBLE9BQU8sRUFBUEE7QUFKTyxLQUFELENBQVI7QUFNQTVFLElBQUFBLFlBQVksQ0FBQ2YsSUFBRCxFQUFPZ0IsT0FBUCxDQUFaLENBQTRCZixRQUE1QixFQUFzQ2dCLFFBQXRDO0FBQ0FxQyxJQUFBQSxTQUFTLENBQUN0RCxJQUFELEVBQU9nQixPQUFQLENBQVQsQ0FBeUJmLFFBQXpCLEVBQW1DZ0IsUUFBbkM7QUFDRCxHQVh5QjtBQUFBLENBQW5CO0FBYVAsT0FBTyxJQUFNMkUsWUFBWSxHQUFHLFNBQWZBLFlBQWUsQ0FBQzVGLElBQUQsRUFBT2lELFNBQVAsRUFBa0I0QyxLQUFsQjtBQUFBLFNBQTRCLFVBQUM1RixRQUFELEVBQVdnQixRQUFYLEVBQXdCO0FBQzlFbkUsSUFBQUEsS0FBSyxDQUFDb0QsY0FBTixDQUFxQkYsSUFBckI7QUFDQSxRQUFNOEYsWUFBWSxHQUFHN0UsUUFBUSxHQUMxQkcsUUFEa0IsQ0FDVEcsS0FEUyxDQUNILENBQUN2QixJQUFJLENBQUNJLEVBQU4sRUFBVSxRQUFWLEVBQW9CLGNBQXBCLENBREcsRUFDa0N4RCxHQUFHLEVBRHJDLEVBRWxCd0csR0FGa0IsQ0FFZEgsU0FGYyxFQUVINEMsS0FGRyxDQUFyQjtBQUdBL0ksSUFBQUEsS0FBSyxDQUFDaUosZ0JBQU4sQ0FBdUIvRixJQUF2QixFQUE2QjhGLFlBQTdCO0FBQ0E3RixJQUFBQSxRQUFRLENBQUM7QUFDUEUsTUFBQUEsSUFBSSxFQUFFcEQsS0FBSyxDQUFDTywrQkFETDtBQUVQOEMsTUFBQUEsRUFBRSxFQUFFSixJQUFJLENBQUNJLEVBRkY7QUFHUDBGLE1BQUFBLFlBQVksRUFBWkE7QUFITyxLQUFELENBQVI7QUFLRCxHQVgyQjtBQUFBLENBQXJCO0FBYVAsT0FBTyxJQUFNRSxJQUFJLEdBQUcsU0FBUEEsSUFBTyxDQUFBaEcsSUFBSTtBQUFBLFNBQUksVUFBQ0MsUUFBRCxFQUFjO0FBQ3hDbkQsSUFBQUEsS0FBSyxDQUFDb0QsY0FBTixDQUFxQkYsSUFBckI7QUFDQUMsSUFBQUEsUUFBUSxDQUFDO0FBQ1BFLE1BQUFBLElBQUksRUFBRXBELEtBQUssQ0FBQ1Esc0JBREw7QUFFUDZDLE1BQUFBLEVBQUUsRUFBRUosSUFBSSxDQUFDSTtBQUZGLEtBQUQsQ0FBUjtBQUlELEdBTnVCO0FBQUEsQ0FBakI7QUFRUCxPQUFPLElBQU02RixNQUFNLEdBQUcsU0FBVEEsTUFBUyxDQUFBakcsSUFBSTtBQUFBLFNBQUksVUFBQ0MsUUFBRCxFQUFjO0FBQzFDbkQsSUFBQUEsS0FBSyxDQUFDb0QsY0FBTixDQUFxQkYsSUFBckI7QUFDQUMsSUFBQUEsUUFBUSxDQUFDO0FBQ1BFLE1BQUFBLElBQUksRUFBRXBELEtBQUssQ0FBQ1Msd0JBREw7QUFFUDRDLE1BQUFBLEVBQUUsRUFBRUosSUFBSSxDQUFDSTtBQUZGLEtBQUQsQ0FBUjtBQUlELEdBTnlCO0FBQUEsQ0FBbkI7QUFRUCxPQUFPLElBQU04RixJQUFJLEdBQUcsU0FBUEEsSUFBTyxDQUFDbEcsSUFBRCxFQUFPbUcsRUFBUDtBQUFBLE1BQU9BLEVBQVA7QUFBT0EsSUFBQUEsRUFBUCxHQUFZLGNBQU0sQ0FBRSxDQUFwQjtBQUFBOztBQUFBLFNBQXlCLFVBQUNsRyxRQUFELEVBQWM7QUFDekRuRCxJQUFBQSxLQUFLLENBQUNvRCxjQUFOLENBQXFCRixJQUFyQjtBQUNBQyxJQUFBQSxRQUFRLENBQUM7QUFDUEUsTUFBQUEsSUFBSSxFQUFFcEQsS0FBSyxDQUFDVSxzQkFETDtBQUVQMkMsTUFBQUEsRUFBRSxFQUFFSixJQUFJLENBQUNJO0FBRkYsS0FBRCxDQUFSO0FBSUErRixJQUFBQSxFQUFFO0FBQ0gsR0FQbUI7QUFBQSxDQUFiO0FBU1AsT0FBTyxJQUFNQyxXQUFXLEdBQUcsU0FBZEEsV0FBYyxDQUFDcEcsSUFBRCxFQUFPZ0IsT0FBUCxFQUFnQnFGLFVBQWhCO0FBQUEsU0FBK0IsVUFBQ3BHLFFBQUQsRUFBV2dCLFFBQVgsRUFBd0I7QUFDaEZuRSxJQUFBQSxLQUFLLENBQUNvRCxjQUFOLENBQXFCRixJQUFyQjtBQUNBQyxJQUFBQSxRQUFRLENBQUM7QUFDUEUsTUFBQUEsSUFBSSxFQUFFcEQsS0FBSyxDQUFDWSw4QkFETDtBQUVQeUMsTUFBQUEsRUFBRSxFQUFFSixJQUFJLENBQUNJLEVBRkY7QUFHUGlGLE1BQUFBLFNBQVMsRUFBRXJGLElBQUksQ0FBQ3FGLFNBSFQ7QUFJUGdCLE1BQUFBLFVBQVUsRUFBVkE7QUFKTyxLQUFELENBQVI7QUFNQXRGLElBQUFBLFlBQVksQ0FBQ2YsSUFBRCxFQUFPZ0IsT0FBUCxDQUFaLENBQTRCZixRQUE1QixFQUFzQ2dCLFFBQXRDO0FBQ0FxQyxJQUFBQSxTQUFTLENBQUN0RCxJQUFELEVBQU9nQixPQUFQLENBQVQsQ0FBeUJmLFFBQXpCLEVBQW1DZ0IsUUFBbkM7QUFDRCxHQVYwQjtBQUFBLENBQXBCO0FBWVAsT0FBTyxJQUFNcUYsa0JBQWtCLEdBQUcsU0FBckJBLGtCQUFxQixDQUFDdEcsSUFBRCxFQUFPZ0IsT0FBUCxFQUFnQnFGLFVBQWhCO0FBQUEsU0FBK0IsVUFBQ3BHLFFBQUQsRUFBV2dCLFFBQVgsRUFBd0I7QUFDdkZuRSxJQUFBQSxLQUFLLENBQUNvRCxjQUFOLENBQXFCRixJQUFyQjtBQUNBQyxJQUFBQSxRQUFRLENBQUM7QUFDUEUsTUFBQUEsSUFBSSxFQUFFcEQsS0FBSyxDQUFDYSxzQ0FETDtBQUVQd0MsTUFBQUEsRUFBRSxFQUFFSixJQUFJLENBQUNJLEVBRkY7QUFHUGlGLE1BQUFBLFNBQVMsRUFBRXJGLElBQUksQ0FBQ3FGLFNBSFQ7QUFJUGdCLE1BQUFBLFVBQVUsRUFBVkE7QUFKTyxLQUFELENBQVI7QUFNQXRGLElBQUFBLFlBQVksQ0FBQ2YsSUFBRCxFQUFPZ0IsT0FBUCxDQUFaLENBQTRCZixRQUE1QixFQUFzQ2dCLFFBQXRDO0FBQ0FxQyxJQUFBQSxTQUFTLENBQUN0RCxJQUFELEVBQU9nQixPQUFQLENBQVQsQ0FBeUJmLFFBQXpCLEVBQW1DZ0IsUUFBbkM7QUFDRCxHQVZpQztBQUFBLENBQTNCO0FBWVAsT0FBTyxJQUFNc0YsUUFBUSxHQUFHLFNBQVhBLFFBQVcsQ0FBQXZHLElBQUk7QUFBQSxTQUFJLFVBQUNDLFFBQUQsRUFBYztBQUM1Q25ELElBQUFBLEtBQUssQ0FBQ29ELGNBQU4sQ0FBcUJGLElBQXJCO0FBQ0FDLElBQUFBLFFBQVEsQ0FBQztBQUNQRSxNQUFBQSxJQUFJLEVBQUVwRCxLQUFLLENBQUNjLDJCQURMO0FBRVB1QyxNQUFBQSxFQUFFLEVBQUVKLElBQUksQ0FBQ0k7QUFGRixLQUFELENBQVI7QUFJRCxHQU4yQjtBQUFBLENBQXJCO0FBUVAsT0FBTyxJQUFNb0csTUFBTSxHQUFHLFNBQVRBLE1BQVMsQ0FBQ3hHLElBQUQsRUFBT3lHLG1CQUFQO0FBQUEsU0FBK0IsVUFBQ3hHLFFBQUQsRUFBYztBQUNqRW5ELElBQUFBLEtBQUssQ0FBQ29ELGNBQU4sQ0FBcUJGLElBQXJCO0FBQ0FDLElBQUFBLFFBQVEsQ0FBQztBQUNQRSxNQUFBQSxJQUFJLEVBQUVwRCxLQUFLLENBQUNlLHdCQURMO0FBRVBzQyxNQUFBQSxFQUFFLEVBQUVKLElBQUksQ0FBQ0ksRUFGRjtBQUdQcUcsTUFBQUEsbUJBQW1CLEVBQW5CQTtBQUhPLEtBQUQsQ0FBUjtBQUtELEdBUHFCO0FBQUEsQ0FBZjtBQVNQLE9BQU8sSUFBTUMsVUFBVSxHQUFHLFNBQWJBLFVBQWEsQ0FBQzFHLElBQUQsRUFBT3lHLG1CQUFQO0FBQUEsU0FBK0IsVUFBQ3hHLFFBQUQsRUFBYztBQUNyRW5ELElBQUFBLEtBQUssQ0FBQ29ELGNBQU4sQ0FBcUJGLElBQXJCO0FBQ0FDLElBQUFBLFFBQVEsQ0FBQztBQUNQRSxNQUFBQSxJQUFJLEVBQUVwRCxLQUFLLENBQUNnQiw4QkFETDtBQUVQcUMsTUFBQUEsRUFBRSxFQUFFSixJQUFJLENBQUNJLEVBRkY7QUFHUHFHLE1BQUFBLG1CQUFtQixFQUFuQkE7QUFITyxLQUFELENBQVI7QUFLRCxHQVB5QjtBQUFBLENBQW5CO0FBU1AsT0FBTyxJQUFNRSxVQUFVLEdBQUcsU0FBYkEsVUFBYSxDQUFDM0csSUFBRCxFQUFPNEcsS0FBUDtBQUFBLFNBQWlCLFVBQUMzRyxRQUFELEVBQWM7QUFDdkRuRCxJQUFBQSxLQUFLLENBQUNvRCxjQUFOLENBQXFCRixJQUFyQjtBQUNBQyxJQUFBQSxRQUFRLENBQUM7QUFDUEUsTUFBQUEsSUFBSSxFQUFFcEQsS0FBSyxDQUFDaUIsNkJBREw7QUFFUG9DLE1BQUFBLEVBQUUsRUFBRUosSUFBSSxDQUFDSSxFQUZGO0FBR1BpRixNQUFBQSxTQUFTLEVBQUVyRixJQUFJLENBQUNxRixTQUhUO0FBSVB1QixNQUFBQSxLQUFLLEVBQUxBO0FBSk8sS0FBRCxDQUFSO0FBTUQsR0FSeUI7QUFBQSxDQUFuQjtBQVVQLE9BQU8sSUFBTUMsYUFBYSxHQUFHLFNBQWhCQSxhQUFnQixDQUFDN0csSUFBRCxFQUFPOEcsS0FBUDtBQUFBLFNBQWlCLFVBQUM3RyxRQUFELEVBQWM7QUFDMURuRCxJQUFBQSxLQUFLLENBQUNvRCxjQUFOLENBQXFCRixJQUFyQjtBQUNBQyxJQUFBQSxRQUFRLENBQUM7QUFDUEUsTUFBQUEsSUFBSSxFQUFFcEQsS0FBSyxDQUFDa0IsaUNBREw7QUFFUG1DLE1BQUFBLEVBQUUsRUFBRUosSUFBSSxDQUFDSSxFQUZGO0FBR1AwRyxNQUFBQSxLQUFLLEVBQUxBO0FBSE8sS0FBRCxDQUFSO0FBS0QsR0FQNEI7QUFBQSxDQUF0QjtBQVNQLE9BQU8sSUFBTUMsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQixDQUFDL0csSUFBRCxFQUFPZ0gsT0FBUDtBQUFBLFNBQW1CLFVBQUMvRyxRQUFELEVBQWM7QUFDN0RuRCxJQUFBQSxLQUFLLENBQUNvRCxjQUFOLENBQXFCRixJQUFyQjtBQUNBQyxJQUFBQSxRQUFRLENBQUM7QUFDUEUsTUFBQUEsSUFBSSxFQUFFcEQsS0FBSyxDQUFDbUIsa0NBREw7QUFFUGtDLE1BQUFBLEVBQUUsRUFBRUosSUFBSSxDQUFDSSxFQUZGO0FBR1A0RyxNQUFBQSxPQUFPLEVBQVBBO0FBSE8sS0FBRCxDQUFSO0FBS0QsR0FQNkI7QUFBQSxDQUF2QjtBQVNQLE9BQU8sSUFBTUMsTUFBTSxHQUFHLFNBQVRBLE1BQVMsQ0FBQ2pILElBQUQsRUFBT21HLEVBQVA7QUFBQSxNQUFPQSxFQUFQO0FBQU9BLElBQUFBLEVBQVAsR0FBWSxjQUFNLENBQUUsQ0FBcEI7QUFBQTs7QUFBQSxTQUF5QixVQUFDbEcsUUFBRCxFQUFjO0FBQzNEbkQsSUFBQUEsS0FBSyxDQUFDb0QsY0FBTixDQUFxQkYsSUFBckI7QUFDQUMsSUFBQUEsUUFBUSxDQUFDO0FBQ1BFLE1BQUFBLElBQUksRUFBRXBELEtBQUssQ0FBQ29CLHdCQURMO0FBRVBpQyxNQUFBQSxFQUFFLEVBQUVKLElBQUksQ0FBQ0k7QUFGRixLQUFELENBQVI7QUFJQStGLElBQUFBLEVBQUU7QUFDSCxHQVBxQjtBQUFBLENBQWY7QUFTUCxPQUFPLElBQU1lLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsQ0FBQ2xILElBQUQsRUFBT21ILFVBQVA7QUFBQSxTQUFzQixVQUFDbEgsUUFBRCxFQUFjO0FBQy9EbkQsSUFBQUEsS0FBSyxDQUFDb0QsY0FBTixDQUFxQkYsSUFBckI7QUFDQUMsSUFBQUEsUUFBUSxDQUFDO0FBQ1BFLE1BQUFBLElBQUksRUFBRXBELEtBQUssQ0FBQ3FCLGdDQURMO0FBRVBnQyxNQUFBQSxFQUFFLEVBQUVKLElBQUksQ0FBQ0ksRUFGRjtBQUdQaUYsTUFBQUEsU0FBUyxFQUFFckYsSUFBSSxDQUFDcUYsU0FIVDtBQUlQOEIsTUFBQUEsVUFBVSxFQUFWQTtBQUpPLEtBQUQsQ0FBUjtBQU1ELEdBUjRCO0FBQUEsQ0FBdEI7QUFVUCxPQUFPLElBQU1DLFVBQVUsR0FBRyxTQUFiQSxVQUFhLENBQUFwSCxJQUFJO0FBQUEsU0FBSSxVQUFDQyxRQUFELEVBQWM7QUFDOUNuRCxJQUFBQSxLQUFLLENBQUNvRCxjQUFOLENBQXFCRixJQUFyQjtBQUNBQyxJQUFBQSxRQUFRLENBQUM7QUFDUEUsTUFBQUEsSUFBSSxFQUFFcEQsS0FBSyxDQUFDc0IsNkJBREw7QUFFUCtCLE1BQUFBLEVBQUUsRUFBRUosSUFBSSxDQUFDSTtBQUZGLEtBQUQsQ0FBUjtBQUlELEdBTjZCO0FBQUEsQ0FBdkI7QUFRUCxPQUFPLElBQU1pSCxtQkFBbUIsR0FBRyxTQUF0QkEsbUJBQXNCLENBQUNySCxJQUFELEVBQU9zSCxNQUFQLEVBQWVDLE9BQWYsRUFBd0JqRixLQUF4QjtBQUFBLFNBQWtDLFVBQUNyQyxRQUFELEVBQWM7QUFDakZuRCxJQUFBQSxLQUFLLENBQUNvRCxjQUFOLENBQXFCRixJQUFyQjtBQUNBQyxJQUFBQSxRQUFRLENBQUM7QUFDUEUsTUFBQUEsSUFBSSxFQUFFcEQsS0FBSyxDQUFDdUIsd0NBREw7QUFFUDhCLE1BQUFBLEVBQUUsRUFBRUosSUFBSSxDQUFDSSxFQUZGO0FBR1BrSCxNQUFBQSxNQUFNLEVBQU5BLE1BSE87QUFJUEMsTUFBQUEsT0FBTyxFQUFQQSxPQUpPO0FBS1BqRixNQUFBQSxLQUFLLEVBQUxBO0FBTE8sS0FBRCxDQUFSO0FBT0QsR0FUa0M7QUFBQSxDQUE1QjtBQVdQLE9BQU8sSUFBTWtGLHFCQUFxQixHQUFHLFNBQXhCQSxxQkFBd0IsQ0FBQ3hILElBQUQsRUFBT3NILE1BQVAsRUFBZUMsT0FBZixFQUF3QmpGLEtBQXhCLEVBQStCbUYsVUFBL0I7QUFBQSxNQUErQkEsVUFBL0I7QUFBK0JBLElBQUFBLFVBQS9CLEdBQTRDLEVBQTVDO0FBQUE7O0FBQUEsU0FBbUQsVUFDdEZ4SCxRQURzRixFQUV0RmdCLFFBRnNGLEVBR25GO0FBQ0huRSxJQUFBQSxLQUFLLENBQUNvRCxjQUFOLENBQXFCRixJQUFyQjtBQUNBLFFBQUkwSCxlQUFlLEdBQUc7QUFBRUMsTUFBQUEsS0FBSyxFQUFFO0FBQVQsS0FBdEI7QUFDQUYsSUFBQUEsVUFBVSxDQUFDdkcsT0FBWCxDQUFtQixVQUFDMEcsU0FBRCxFQUFlO0FBQ2hDLFVBQUlGLGVBQWUsQ0FBQ0MsS0FBcEIsRUFBMkI7QUFDekIsWUFBSUMsU0FBUyxDQUFDQyxNQUFkLEVBQXNCO0FBQ3BCLGNBQUl2RixLQUFLLEtBQUssRUFBVixJQUFnQkEsS0FBSyxLQUFLLElBQTFCLElBQWtDQSxLQUFLLEtBQUt3RixTQUFoRCxFQUEyRDtBQUN6RDtBQUNBLGdCQUFNM0csUUFBUSxHQUFHRixRQUFRLEdBQUdHLFFBQVgsQ0FBb0JDLEdBQXBCLENBQXdCckIsSUFBSSxDQUFDSSxFQUE3QixDQUFqQjtBQUNBLGdCQUFNMkgsUUFBUSxHQUFHNUcsUUFBUSxDQUFDRSxHQUFULENBQWEsVUFBYixDQUFqQjtBQUNBLGdCQUFJRyxPQUFPLEdBQUdMLFFBQVEsQ0FBQ0UsR0FBVCxDQUFhLFNBQWIsQ0FBZDs7QUFDQSxnQkFBSTBHLFFBQUosRUFBYztBQUNaQSxjQUFBQSxRQUFRLENBQUM3RyxPQUFULENBQWlCLFVBQUM4RyxZQUFELEVBQWVDLGNBQWYsRUFBa0M7QUFDakQsb0JBQU1DLFVBQVUsR0FBRzFHLE9BQU8sQ0FBQzJHLFNBQVIsQ0FBa0IsVUFBQUMsQ0FBQztBQUFBLHlCQUFJQSxDQUFDLENBQUM3RyxLQUFGLENBQVF2QixJQUFJLENBQUNxRixTQUFiLE1BQTRCNEMsY0FBaEM7QUFBQSxpQkFBbkIsQ0FBbkI7O0FBQ0Esb0JBQUlDLFVBQVUsS0FBSyxDQUFDLENBQXBCLEVBQXVCO0FBQ3JCMUcsa0JBQUFBLE9BQU8sR0FBR0EsT0FBTyxDQUFDNkcsV0FBUixDQUFvQixDQUFDSCxVQUFELENBQXBCLEVBQWtDRixZQUFsQyxDQUFWO0FBQ0Q7QUFDRixlQUxEO0FBTUQsYUFad0QsQ0FhekQ7OztBQUNBLGdCQUFNTSxPQUFPLEdBQUc5RyxPQUFPLENBQUMyRCxJQUFSLENBQWEsVUFBQ0QsSUFBRCxFQUFVO0FBQ3JDLGtCQUFJbEYsSUFBSSxDQUFDcUYsU0FBTCxDQUFla0QsTUFBbkIsRUFBMkI7QUFDekI7QUFDQSxvQkFBSXJELElBQUksQ0FBQzNELEtBQUwsQ0FBV3ZCLElBQUksQ0FBQ3FGLFNBQWhCLE1BQStCaUMsTUFBbkMsRUFBMkM7QUFDekMseUJBQU8sS0FBUDtBQUNEO0FBQ0Y7O0FBQ0QscUJBQU9wQyxJQUFJLENBQUMzRCxLQUFMLENBQVdnRyxPQUFYLE1BQXdCakYsS0FBL0I7QUFDRCxhQVJlLENBQWhCOztBQVNBLGdCQUFJZ0csT0FBSixFQUFhO0FBQ1haLGNBQUFBLGVBQWUsR0FBRztBQUNoQkMsZ0JBQUFBLEtBQUssRUFBRSxLQURTO0FBRWhCYSxnQkFBQUEsT0FBTyxFQUFFO0FBRk8sZUFBbEI7QUFJRDtBQUNGO0FBQ0YsU0EvQkQsTUErQk8sSUFBSVosU0FBUyxDQUFDYSxtQkFBZCxFQUFtQztBQUN4QztBQUNBLGNBQU10SCxTQUFRLEdBQUdGLFFBQVEsR0FBR0csUUFBWCxDQUFvQkMsR0FBcEIsQ0FBd0JyQixJQUFJLENBQUNJLEVBQTdCLENBQWpCOztBQUNBLGNBQU0ySCxTQUFRLEdBQUc1RyxTQUFRLENBQUNJLEtBQVQsQ0FBZSxDQUFDLFVBQUQsRUFBYStGLE1BQWIsQ0FBZixFQUFxQzFLLEdBQUcsRUFBeEMsQ0FBakI7O0FBQ0EsY0FBSThMLE9BQU8sR0FBR3ZILFNBQVEsQ0FBQ0UsR0FBVCxDQUFhLFNBQWIsRUFBd0I4RCxJQUF4QixDQUE2QixVQUFBRCxJQUFJO0FBQUEsbUJBQUlBLElBQUksQ0FBQzNELEtBQUwsQ0FBV3ZCLElBQUksQ0FBQ3FGLFNBQWhCLE1BQStCaUMsTUFBbkM7QUFBQSxXQUFqQyxDQUFkOztBQUNBLGNBQUlvQixPQUFKLEVBQWE7QUFDWEEsWUFBQUEsT0FBTyxHQUFHQSxPQUFPLENBQUNDLFNBQVIsQ0FBa0JaLFNBQWxCLENBQVY7QUFDQSxnQkFBTWEsTUFBTSxHQUFHaEIsU0FBUyxDQUFDZ0IsTUFBVixHQUFtQkMsTUFBTSxDQUFDQyxNQUFQLENBQWNsQixTQUFTLENBQUNnQixNQUF4QixDQUFuQixHQUFxRCxFQUFwRTtBQUNBbEIsWUFBQUEsZUFBZSxHQUFHRSxTQUFTLENBQUNhLG1CQUFWLE9BQUFiLFNBQVMsR0FBcUJ0RixLQUFyQixFQUE0Qm9HLE9BQTVCLFNBQXdDRSxNQUF4QyxFQUEzQjtBQUNEO0FBQ0YsU0FWTSxNQVVBLElBQUloQixTQUFTLENBQUNtQixvQkFBZCxFQUFvQztBQUN6QztBQUNBLGNBQU01SCxVQUFRLEdBQUdGLFFBQVEsR0FBR0csUUFBWCxDQUFvQkMsR0FBcEIsQ0FBd0JyQixJQUFJLENBQUNJLEVBQTdCLENBQWpCOztBQUVBLGNBQUlvQixRQUFPLEdBQUdMLFVBQVEsQ0FBQ0UsR0FBVCxDQUFhLFNBQWIsRUFBd0J4RSxJQUFJLEVBQTVCLENBQWQ7O0FBQ0EsY0FBTWtMLFVBQVEsR0FBRzVHLFVBQVEsQ0FBQ0UsR0FBVCxDQUFhLFVBQWIsRUFBeUJ6RSxHQUFHLEVBQTVCLENBQWpCOztBQUVBbUwsVUFBQUEsVUFBUSxDQUFDN0csT0FBVCxDQUFpQixVQUFDOEgsT0FBRCxFQUFVQyxPQUFWLEVBQXNCO0FBQ3JDLGdCQUFNZixVQUFVLEdBQUcxRyxRQUFPLENBQUMyRyxTQUFSLENBQWtCLFVBQUFDLENBQUM7QUFBQSxxQkFBSUEsQ0FBQyxDQUFDN0csS0FBRixDQUFRdkIsSUFBSSxDQUFDcUYsU0FBYixNQUE0QjRELE9BQWhDO0FBQUEsYUFBbkIsQ0FBbkI7O0FBQ0EsZ0JBQUlmLFVBQVUsS0FBSyxDQUFDLENBQXBCLEVBQXVCO0FBQ3JCMUcsY0FBQUEsUUFBTyxHQUFHQSxRQUFPLENBQUM2RyxXQUFSLENBQW9CLENBQUNILFVBQUQsQ0FBcEIsRUFBa0NjLE9BQWxDLENBQVY7QUFDRDtBQUNGLFdBTEQ7O0FBTUEsY0FBTUUsV0FBVyxHQUFHbkIsVUFBUSxDQUFDMUcsR0FBVCxDQUFhaUcsTUFBYixFQUFxQjFLLEdBQUcsRUFBeEIsQ0FBcEI7O0FBQ0EsY0FBSThMLFFBQU8sR0FBR2xILFFBQU8sQ0FBQzJELElBQVIsQ0FBYSxVQUFBRCxJQUFJO0FBQUEsbUJBQUlBLElBQUksQ0FBQzNELEtBQUwsQ0FBV3ZCLElBQUksQ0FBQ3FGLFNBQWhCLE1BQStCaUMsTUFBbkM7QUFBQSxXQUFqQixDQUFkOztBQUNBLGNBQUlvQixRQUFKLEVBQWE7QUFDWEEsWUFBQUEsUUFBTyxHQUFHQSxRQUFPLENBQUNDLFNBQVIsQ0FBa0JPLFdBQWxCLENBQVY7QUFDRCxXQUZELE1BRU87QUFDTFIsWUFBQUEsUUFBTyxHQUFHUSxXQUFWO0FBQ0Q7O0FBQ0QsY0FBTU4sT0FBTSxHQUFHaEIsU0FBUyxDQUFDZ0IsTUFBVixHQUFtQkMsTUFBTSxDQUFDQyxNQUFQLENBQWNsQixTQUFTLENBQUNnQixNQUF4QixDQUFuQixHQUFxRCxFQUFwRTs7QUFDQWxCLFVBQUFBLGVBQWUsR0FBR0UsU0FBUyxDQUFDbUIsb0JBQVYsT0FBQW5CLFNBQVMsR0FBc0J0RixLQUF0QixFQUE2Qm9HLFFBQTdCLEVBQXNDbEgsUUFBdEMsU0FBa0RvSCxPQUFsRCxFQUEzQjtBQUNELFNBdEJNLE1Bc0JBO0FBQ0wsY0FBTUEsUUFBTSxHQUFHaEIsU0FBUyxDQUFDZ0IsTUFBVixHQUFtQkMsTUFBTSxDQUFDQyxNQUFQLENBQWNsQixTQUFTLENBQUNnQixNQUF4QixDQUFuQixHQUFxRCxFQUFwRTs7QUFDQWxCLFVBQUFBLGVBQWUsR0FBR0UsU0FBUyxDQUFDdUIsUUFBVixPQUFBdkIsU0FBUyxHQUFVdEYsS0FBVixTQUFvQnNHLFFBQXBCLEVBQTNCOztBQUNBLGNBQUloQixTQUFTLENBQUNnQixNQUFkLEVBQXNCO0FBQ3BCbEIsWUFBQUEsZUFBZSxDQUFDMEIsYUFBaEIsR0FBZ0N4QixTQUFTLENBQUNnQixNQUExQztBQUNEO0FBQ0Y7QUFDRjtBQUNGLEtBekVEOztBQTBFQSxRQUFJbEIsZUFBZSxDQUFDQyxLQUFwQixFQUEyQjtBQUN6QjFILE1BQUFBLFFBQVEsQ0FBQztBQUNQRSxRQUFBQSxJQUFJLEVBQUVwRCxLQUFLLENBQUMwQixtQ0FETDtBQUVQMkIsUUFBQUEsRUFBRSxFQUFFSixJQUFJLENBQUNJLEVBRkY7QUFHUGlKLFFBQUFBLFdBQVcsRUFBRSxPQUhOO0FBSVAvQixRQUFBQSxNQUFNLEVBQU5BLE1BSk87QUFLUEMsUUFBQUEsT0FBTyxFQUFQQTtBQUxPLE9BQUQsQ0FBUjtBQU9ELEtBUkQsTUFRTztBQUNMdEgsTUFBQUEsUUFBUSxDQUFDO0FBQ1BFLFFBQUFBLElBQUksRUFBRXBELEtBQUssQ0FBQ3dCLG1DQURMO0FBRVA2QixRQUFBQSxFQUFFLEVBQUVKLElBQUksQ0FBQ0ksRUFGRjtBQUdQaUosUUFBQUEsV0FBVyxFQUFFLE9BSE47QUFJUC9CLFFBQUFBLE1BQU0sRUFBTkEsTUFKTztBQUtQQyxRQUFBQSxPQUFPLEVBQVBBLE9BTE87QUFNUCtCLFFBQUFBLFNBQVMsRUFBRTVCLGVBQWUsQ0FBQ2MsT0FOcEI7QUFPUFksUUFBQUEsYUFBYSxFQUFFMUIsZUFBZSxDQUFDMEI7QUFQeEIsT0FBRCxDQUFSO0FBU0Q7O0FBQ0QsV0FBTzFCLGVBQWUsQ0FBQ0MsS0FBdkI7QUFDRCxHQXBHb0M7QUFBQSxDQUE5QjtBQXNHUCxPQUFPLElBQU00QixxQkFBcUIsR0FBRyxTQUF4QkEscUJBQXdCLENBQUN2SixJQUFELEVBQU93SixRQUFQLEVBQWlCakMsT0FBakIsRUFBMEJqRixLQUExQjtBQUFBLFNBQW9DLFVBQUNyQyxRQUFELEVBQWM7QUFDckZuRCxJQUFBQSxLQUFLLENBQUNvRCxjQUFOLENBQXFCRixJQUFyQjtBQUNBQyxJQUFBQSxRQUFRLENBQUM7QUFDUEUsTUFBQUEsSUFBSSxFQUFFcEQsS0FBSyxDQUFDNkIsMENBREw7QUFFUHdCLE1BQUFBLEVBQUUsRUFBRUosSUFBSSxDQUFDSSxFQUZGO0FBR1BvSixNQUFBQSxRQUFRLEVBQVJBLFFBSE87QUFJUGpDLE1BQUFBLE9BQU8sRUFBUEEsT0FKTztBQUtQakYsTUFBQUEsS0FBSyxFQUFMQTtBQUxPLEtBQUQsQ0FBUjtBQU9ELEdBVG9DO0FBQUEsQ0FBOUIsQyxDQVdQOztBQUNBLE9BQU8sSUFBTW1ILHVCQUF1QixHQUFHLFNBQTFCQSx1QkFBMEIsQ0FBQ3pKLElBQUQsRUFBT3dKLFFBQVAsRUFBaUJqQyxPQUFqQixFQUEwQmpGLEtBQTFCLEVBQWlDbUYsVUFBakM7QUFBQSxNQUFpQ0EsVUFBakM7QUFBaUNBLElBQUFBLFVBQWpDLEdBQThDLEVBQTlDO0FBQUE7O0FBQUEsU0FBcUQsVUFDMUZ4SCxRQUQwRixFQUUxRmdCLFFBRjBGLEVBR3ZGO0FBQ0huRSxJQUFBQSxLQUFLLENBQUNvRCxjQUFOLENBQXFCRixJQUFyQjtBQUNBLFFBQUkwSCxlQUFlLEdBQUc7QUFBRUMsTUFBQUEsS0FBSyxFQUFFO0FBQVQsS0FBdEI7QUFDQUYsSUFBQUEsVUFBVSxDQUFDdkcsT0FBWCxDQUFtQixVQUFDMEcsU0FBRCxFQUFlO0FBQ2hDLFVBQUlGLGVBQWUsQ0FBQ0MsS0FBcEIsRUFBMkI7QUFDekIsWUFBSUMsU0FBUyxDQUFDQyxNQUFkLEVBQXNCO0FBQ3BCLGNBQUl2RixLQUFLLEtBQUssRUFBVixJQUFnQkEsS0FBSyxLQUFLLElBQTFCLElBQWtDQSxLQUFLLEtBQUt3RixTQUFoRCxFQUEyRDtBQUN6RCxnQkFBTVEsT0FBTyxHQUFHckgsUUFBUSxHQUNyQkcsUUFEYSxDQUNKRyxLQURJLENBQ0UsQ0FBQ3ZCLElBQUksQ0FBQ0ksRUFBTixFQUFVLFNBQVYsQ0FERixFQUViK0UsSUFGYSxDQUVSLFVBQUFELElBQUk7QUFBQSxxQkFBSUEsSUFBSSxDQUFDM0QsS0FBTCxDQUFXZ0csT0FBWCxNQUF3QmpGLEtBQTVCO0FBQUEsYUFGSSxDQUFoQjs7QUFHQSxnQkFBSWdHLE9BQUosRUFBYTtBQUNYWixjQUFBQSxlQUFlLEdBQUc7QUFDaEJDLGdCQUFBQSxLQUFLLEVBQUUsS0FEUztBQUVoQmEsZ0JBQUFBLE9BQU8sRUFBRTtBQUZPLGVBQWxCO0FBSUQsYUFMRCxNQUtPO0FBQ0wsa0JBQU1rQixLQUFLLEdBQUd6SSxRQUFRLEdBQ25CRyxRQURXLENBQ0ZHLEtBREUsQ0FDSSxDQUFDdkIsSUFBSSxDQUFDSSxFQUFOLEVBQVUsWUFBVixDQURKLEVBRVgrRSxJQUZXLENBRU4sVUFBQ0QsSUFBRCxFQUFPeUUsQ0FBUDtBQUFBLHVCQUFhQSxDQUFDLEtBQUtILFFBQU4sSUFBa0J0RSxJQUFJLENBQUMzRCxLQUFMLENBQVdnRyxPQUFYLE1BQXdCakYsS0FBdkQ7QUFBQSxlQUZNLENBQWQ7O0FBR0Esa0JBQUlvSCxLQUFKLEVBQVc7QUFDVGhDLGdCQUFBQSxlQUFlLEdBQUc7QUFDaEJDLGtCQUFBQSxLQUFLLEVBQUUsS0FEUztBQUVoQmEsa0JBQUFBLE9BQU8sRUFBRTtBQUZPLGlCQUFsQjtBQUlEO0FBQ0Y7QUFDRjtBQUNGLFNBdEJELE1Bc0JPLElBQUlaLFNBQVMsQ0FBQ2EsbUJBQWQsRUFBbUM7QUFDeEMsY0FBTUMsT0FBTyxHQUFHekgsUUFBUSxHQUFHRyxRQUFYLENBQW9CRyxLQUFwQixDQUEwQixDQUFDdkIsSUFBSSxDQUFDSSxFQUFOLEVBQVUsWUFBVixFQUF3Qm9KLFFBQXhCLENBQTFCLENBQWhCO0FBQ0EsY0FBTVosTUFBTSxHQUFHaEIsU0FBUyxDQUFDZ0IsTUFBVixHQUFtQkMsTUFBTSxDQUFDQyxNQUFQLENBQWNsQixTQUFTLENBQUNnQixNQUF4QixDQUFuQixHQUFxRCxFQUFwRTtBQUNBbEIsVUFBQUEsZUFBZSxHQUFHRSxTQUFTLENBQUNhLG1CQUFWLE9BQUFiLFNBQVMsR0FBcUJ0RixLQUFyQixFQUE0Qm9HLE9BQTVCLFNBQXdDRSxNQUF4QyxFQUEzQjtBQUNELFNBSk0sTUFJQTtBQUNMLGNBQU1BLFFBQU0sR0FBR2hCLFNBQVMsQ0FBQ2dCLE1BQVYsR0FBbUJDLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjbEIsU0FBUyxDQUFDZ0IsTUFBeEIsQ0FBbkIsR0FBcUQsRUFBcEU7O0FBQ0FsQixVQUFBQSxlQUFlLEdBQUdFLFNBQVMsQ0FBQ3VCLFFBQVYsT0FBQXZCLFNBQVMsR0FBVXRGLEtBQVYsU0FBb0JzRyxRQUFwQixFQUEzQjs7QUFDQSxjQUFJaEIsU0FBUyxDQUFDZ0IsTUFBZCxFQUFzQjtBQUNwQmxCLFlBQUFBLGVBQWUsQ0FBQzBCLGFBQWhCLEdBQWdDeEIsU0FBUyxDQUFDZ0IsTUFBMUM7QUFDRDtBQUNGO0FBQ0Y7QUFDRixLQXBDRDs7QUFxQ0EsUUFBSWxCLGVBQWUsQ0FBQ0MsS0FBcEIsRUFBMkI7QUFDekIxSCxNQUFBQSxRQUFRLENBQUM7QUFDUEUsUUFBQUEsSUFBSSxFQUFFcEQsS0FBSyxDQUFDNEIsMENBREw7QUFFUHlCLFFBQUFBLEVBQUUsRUFBRUosSUFBSSxDQUFDSSxFQUZGO0FBR1BpSixRQUFBQSxXQUFXLEVBQUUsT0FITjtBQUlQRyxRQUFBQSxRQUFRLEVBQVJBLFFBSk87QUFLUGpDLFFBQUFBLE9BQU8sRUFBUEE7QUFMTyxPQUFELENBQVI7QUFPRCxLQVJELE1BUU87QUFDTHRILE1BQUFBLFFBQVEsQ0FBQztBQUNQRSxRQUFBQSxJQUFJLEVBQUVwRCxLQUFLLENBQUMyQiwwQ0FETDtBQUVQMEIsUUFBQUEsRUFBRSxFQUFFSixJQUFJLENBQUNJLEVBRkY7QUFHUGlKLFFBQUFBLFdBQVcsRUFBRSxPQUhOO0FBSVBHLFFBQUFBLFFBQVEsRUFBUkEsUUFKTztBQUtQakMsUUFBQUEsT0FBTyxFQUFQQSxPQUxPO0FBTVArQixRQUFBQSxTQUFTLEVBQUU1QixlQUFlLENBQUNjLE9BTnBCO0FBT1BZLFFBQUFBLGFBQWEsRUFBRTFCLGVBQWUsQ0FBQzBCO0FBUHhCLE9BQUQsQ0FBUjtBQVNEOztBQUNELFdBQU8xQixlQUFlLENBQUNDLEtBQXZCO0FBQ0QsR0EvRHNDO0FBQUEsQ0FBaEMsQyxDQWlFUDs7QUFDQSxPQUFPLElBQU1pQyxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLENBQzdCNUosSUFENkIsRUFFN0JxSixXQUY2QixFQUc3Qi9CLE1BSDZCLEVBSTdCQyxPQUo2QixFQUs3QitCLFNBTDZCLEVBTTdCRixhQU42QjtBQUFBLFNBTzFCLFVBQUNuSixRQUFELEVBQWM7QUFDakJuRCxJQUFBQSxLQUFLLENBQUNvRCxjQUFOLENBQXFCRixJQUFyQjtBQUNBQyxJQUFBQSxRQUFRLENBQUM7QUFDUEUsTUFBQUEsSUFBSSxFQUFFcEQsS0FBSyxDQUFDd0IsbUNBREw7QUFFUDZCLE1BQUFBLEVBQUUsRUFBRUosSUFBSSxDQUFDSSxFQUZGO0FBR1BpSixNQUFBQSxXQUFXLEVBQVhBLFdBSE87QUFJUC9CLE1BQUFBLE1BQU0sRUFBTkEsTUFKTztBQUtQQyxNQUFBQSxPQUFPLEVBQVBBLE9BTE87QUFNUCtCLE1BQUFBLFNBQVMsRUFBVEEsU0FOTztBQU9QRixNQUFBQSxhQUFhLEVBQWJBO0FBUE8sS0FBRCxDQUFSO0FBU0QsR0FsQjhCO0FBQUEsQ0FBeEI7QUFvQlAsT0FBTyxJQUFNUyxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQW1CLENBQUM3SixJQUFELEVBQU84SixRQUFQO0FBQUEsU0FBb0IsVUFBQzdKLFFBQUQsRUFBYztBQUNoRW5ELElBQUFBLEtBQUssQ0FBQ29ELGNBQU4sQ0FBcUJGLElBQXJCO0FBQ0FDLElBQUFBLFFBQVEsQ0FBQztBQUNQRSxNQUFBQSxJQUFJLEVBQUVwRCxLQUFLLENBQUN5QixvQ0FETDtBQUVQNEIsTUFBQUEsRUFBRSxFQUFFSixJQUFJLENBQUNJLEVBRkY7QUFHUDBKLE1BQUFBLFFBQVEsRUFBUkE7QUFITyxLQUFELENBQVI7QUFLRCxHQVArQjtBQUFBLENBQXpCLEMsQ0FTUDs7QUFDQSxPQUFPLElBQU1DLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0IsQ0FDN0IvSixJQUQ2QixFQUU3QnFKLFdBRjZCLEVBRzdCL0IsTUFINkIsRUFJN0JDLE9BSjZCO0FBQUEsTUFFN0I4QixXQUY2QjtBQUU3QkEsSUFBQUEsV0FGNkIsR0FFZixJQUZlO0FBQUE7O0FBQUEsTUFHN0IvQixNQUg2QjtBQUc3QkEsSUFBQUEsTUFINkIsR0FHcEIsSUFIb0I7QUFBQTs7QUFBQSxNQUk3QkMsT0FKNkI7QUFJN0JBLElBQUFBLE9BSjZCLEdBSW5CLElBSm1CO0FBQUE7O0FBQUEsU0FLMUIsVUFBQ3RILFFBQUQsRUFBYztBQUNqQm5ELElBQUFBLEtBQUssQ0FBQ29ELGNBQU4sQ0FBcUJGLElBQXJCO0FBQ0FDLElBQUFBLFFBQVEsQ0FBQztBQUNQRSxNQUFBQSxJQUFJLEVBQUVwRCxLQUFLLENBQUMwQixtQ0FETDtBQUVQMkIsTUFBQUEsRUFBRSxFQUFFSixJQUFJLENBQUNJLEVBRkY7QUFHUGlKLE1BQUFBLFdBQVcsRUFBWEEsV0FITztBQUlQL0IsTUFBQUEsTUFBTSxFQUFOQSxNQUpPO0FBS1BDLE1BQUFBLE9BQU8sRUFBUEE7QUFMTyxLQUFELENBQVI7QUFPRCxHQWQ4QjtBQUFBLENBQXhCO0FBZ0JQLE9BQU8sSUFBTXlDLHFCQUFxQixHQUFHLFNBQXhCQSxxQkFBd0IsQ0FDbkNoSyxJQURtQyxFQUVuQ3FKLFdBRm1DLEVBR25DRyxRQUhtQyxFQUluQ2pDLE9BSm1DLEVBS25DK0IsU0FMbUMsRUFNbkNGLGFBTm1DO0FBQUEsU0FPaEMsVUFBQ25KLFFBQUQsRUFBYztBQUNqQm5ELElBQUFBLEtBQUssQ0FBQ29ELGNBQU4sQ0FBcUJGLElBQXJCO0FBQ0FDLElBQUFBLFFBQVEsQ0FBQztBQUNQRSxNQUFBQSxJQUFJLEVBQUVwRCxLQUFLLENBQUMyQiwwQ0FETDtBQUVQMEIsTUFBQUEsRUFBRSxFQUFFSixJQUFJLENBQUNJLEVBRkY7QUFHUGlKLE1BQUFBLFdBQVcsRUFBWEEsV0FITztBQUlQRyxNQUFBQSxRQUFRLEVBQVJBLFFBSk87QUFLUGpDLE1BQUFBLE9BQU8sRUFBUEEsT0FMTztBQU1QK0IsTUFBQUEsU0FBUyxFQUFUQSxTQU5PO0FBT1BGLE1BQUFBLGFBQWEsRUFBYkE7QUFQTyxLQUFELENBQVI7QUFTRCxHQWxCb0M7QUFBQSxDQUE5QixDLENBb0JQOztBQUNBLE9BQU8sSUFBTWEscUJBQXFCLEdBQUcsU0FBeEJBLHFCQUF3QixDQUNuQ2pLLElBRG1DLEVBRW5DcUosV0FGbUMsRUFHbkNHLFFBSG1DLEVBSW5DakMsT0FKbUM7QUFBQSxNQUVuQzhCLFdBRm1DO0FBRW5DQSxJQUFBQSxXQUZtQyxHQUVyQixJQUZxQjtBQUFBOztBQUFBLE1BR25DRyxRQUhtQztBQUduQ0EsSUFBQUEsUUFIbUMsR0FHeEIsSUFId0I7QUFBQTs7QUFBQSxNQUluQ2pDLE9BSm1DO0FBSW5DQSxJQUFBQSxPQUptQyxHQUl6QixJQUp5QjtBQUFBOztBQUFBLFNBS2hDLFVBQUN0SCxRQUFELEVBQWM7QUFDakJuRCxJQUFBQSxLQUFLLENBQUNvRCxjQUFOLENBQXFCRixJQUFyQjtBQUNBQyxJQUFBQSxRQUFRLENBQUM7QUFDUEUsTUFBQUEsSUFBSSxFQUFFcEQsS0FBSyxDQUFDNEIsMENBREw7QUFFUHlCLE1BQUFBLEVBQUUsRUFBRUosSUFBSSxDQUFDSSxFQUZGO0FBR1BpSixNQUFBQSxXQUFXLEVBQVhBLFdBSE87QUFJUEcsTUFBQUEsUUFBUSxFQUFSQSxRQUpPO0FBS1BqQyxNQUFBQSxPQUFPLEVBQVBBO0FBTE8sS0FBRCxDQUFSO0FBT0QsR0Fkb0M7QUFBQSxDQUE5QjtBQWdCUCxPQUFPLElBQU0yQyxtQkFBbUIsR0FBRyxTQUF0QkEsbUJBQXNCLENBQUNsSyxJQUFELEVBQU9tSyxZQUFQO0FBQUEsTUFBT0EsWUFBUDtBQUFPQSxJQUFBQSxZQUFQLEdBQXNCLElBQXRCO0FBQUE7O0FBQUEsU0FBK0IsVUFBQ2xLLFFBQUQsRUFBYztBQUM5RW5ELElBQUFBLEtBQUssQ0FBQ29ELGNBQU4sQ0FBcUJGLElBQXJCO0FBQ0FDLElBQUFBLFFBQVEsQ0FBQztBQUNQa0ssTUFBQUEsWUFBWSxFQUFaQSxZQURPO0FBRVAvSixNQUFBQSxFQUFFLEVBQUVKLElBQUksQ0FBQ0ksRUFGRjtBQUdQRCxNQUFBQSxJQUFJLEVBQUVwRCxLQUFLLENBQUMrQjtBQUhMLEtBQUQsQ0FBUjtBQUtELEdBUGtDO0FBQUEsQ0FBNUI7QUFTUCxPQUFPLElBQU1zTCxtQkFBbUIsR0FBRyxTQUF0QkEsbUJBQXNCLENBQUNwSyxJQUFELEVBQU93SixRQUFQLEVBQWlCYSxXQUFqQixFQUFzQ0MsWUFBdEM7QUFBQSxNQUFpQkQsV0FBakI7QUFBaUJBLElBQUFBLFdBQWpCLEdBQStCLEtBQS9CO0FBQUE7O0FBQUEsTUFBc0NDLFlBQXRDO0FBQXNDQSxJQUFBQSxZQUF0QyxHQUFxRCxLQUFyRDtBQUFBOztBQUFBLFNBQStELFVBQ2hHckssUUFEZ0csRUFFaEdnQixRQUZnRyxFQUc3RjtBQUNIbkUsSUFBQUEsS0FBSyxDQUFDb0QsY0FBTixDQUFxQkYsSUFBckI7QUFDQUMsSUFBQUEsUUFBUSxDQUFDO0FBQ1BFLE1BQUFBLElBQUksRUFBRXBELEtBQUssQ0FBQ2dDLHVDQURMO0FBRVBxQixNQUFBQSxFQUFFLEVBQUVKLElBQUksQ0FBQ0ksRUFGRjtBQUdQb0osTUFBQUEsUUFBUSxFQUFSQSxRQUhPO0FBSVBuRSxNQUFBQSxTQUFTLEVBQUVyRixJQUFJLENBQUNxRixTQUpUO0FBS1BnRixNQUFBQSxXQUFXLEVBQVhBLFdBTE87QUFNUEMsTUFBQUEsWUFBWSxFQUFaQTtBQU5PLEtBQUQsQ0FBUjtBQVFBeE4sSUFBQUEsS0FBSyxDQUFDeU4saUJBQU4sQ0FBd0J2SyxJQUF4QixFQUE4QmlCLFFBQVEsR0FBR0csUUFBWCxDQUFvQkcsS0FBcEIsQ0FBMEIsQ0FBQ3ZCLElBQUksQ0FBQ0ksRUFBTixFQUFVLGVBQVYsQ0FBMUIsQ0FBOUI7QUFDRCxHQWRrQztBQUFBLENBQTVCO0FBZ0JQLE9BQU8sSUFBTW9LLG9CQUFvQixHQUFHLFNBQXZCQSxvQkFBdUIsQ0FBQXhLLElBQUk7QUFBQSxTQUFJLFVBQUNDLFFBQUQsRUFBV2dCLFFBQVgsRUFBd0I7QUFDbEVuRSxJQUFBQSxLQUFLLENBQUNvRCxjQUFOLENBQXFCRixJQUFyQjtBQUNBQyxJQUFBQSxRQUFRLENBQUM7QUFDUEUsTUFBQUEsSUFBSSxFQUFFcEQsS0FBSyxDQUFDaUMseUNBREw7QUFFUG9CLE1BQUFBLEVBQUUsRUFBRUosSUFBSSxDQUFDSSxFQUZGO0FBR1BpRixNQUFBQSxTQUFTLEVBQUVyRixJQUFJLENBQUNxRjtBQUhULEtBQUQsQ0FBUjtBQUtBdkksSUFBQUEsS0FBSyxDQUFDeU4saUJBQU4sQ0FBd0J2SyxJQUF4QixFQUE4QmlCLFFBQVEsR0FBR0csUUFBWCxDQUFvQkcsS0FBcEIsQ0FBMEIsQ0FBQ3ZCLElBQUksQ0FBQ0ksRUFBTixFQUFVLGVBQVYsQ0FBMUIsQ0FBOUI7QUFDRCxHQVJ1QztBQUFBLENBQWpDO0FBVVAsT0FBTyxJQUFNcUssa0JBQWtCLEdBQUcsU0FBckJBLGtCQUFxQixDQUFBekssSUFBSTtBQUFBLFNBQUksVUFBQ0MsUUFBRCxFQUFXZ0IsUUFBWCxFQUF3QjtBQUNoRW5FLElBQUFBLEtBQUssQ0FBQ29ELGNBQU4sQ0FBcUJGLElBQXJCO0FBQ0FDLElBQUFBLFFBQVEsQ0FBQztBQUNQRSxNQUFBQSxJQUFJLEVBQUVwRCxLQUFLLENBQUNrQyxzQ0FETDtBQUVQbUIsTUFBQUEsRUFBRSxFQUFFSixJQUFJLENBQUNJO0FBRkYsS0FBRCxDQUFSO0FBSUF0RCxJQUFBQSxLQUFLLENBQUN5TixpQkFBTixDQUF3QnZLLElBQXhCLEVBQThCaUIsUUFBUSxHQUFHRyxRQUFYLENBQW9CRyxLQUFwQixDQUEwQixDQUFDdkIsSUFBSSxDQUFDSSxFQUFOLEVBQVUsZUFBVixDQUExQixDQUE5QjtBQUNELEdBUHFDO0FBQUEsQ0FBL0I7QUFTUCxPQUFPLElBQU1zSyxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLENBQUExSyxJQUFJO0FBQUEsU0FBSSxVQUFDQyxRQUFELEVBQVdnQixRQUFYLEVBQXdCO0FBQzdEbkUsSUFBQUEsS0FBSyxDQUFDb0QsY0FBTixDQUFxQkYsSUFBckI7QUFDQSxRQUFNMkssV0FBVyxHQUFHLENBQUMxSixRQUFRLEdBQUdHLFFBQVgsQ0FBb0JHLEtBQXBCLENBQ25CLENBQUN2QixJQUFJLENBQUNJLEVBQU4sRUFBVSxRQUFWLEVBQW9CLGVBQXBCLEVBQXFDLGFBQXJDLENBRG1CLEVBRW5CLEtBRm1CLENBQXJCO0FBSUF0RCxJQUFBQSxLQUFLLENBQUM4TixlQUFOLENBQXNCNUssSUFBdEIsRUFBNEIySyxXQUE1QjtBQUNBMUssSUFBQUEsUUFBUSxDQUFDO0FBQ1BFLE1BQUFBLElBQUksRUFBRXBELEtBQUssQ0FBQ21DLGtDQURMO0FBRVBrQixNQUFBQSxFQUFFLEVBQUVKLElBQUksQ0FBQ0ksRUFGRjtBQUdQdUssTUFBQUEsV0FBVyxFQUFYQTtBQUhPLEtBQUQsQ0FBUjtBQUtELEdBWmtDO0FBQUEsQ0FBNUI7QUFjUCxPQUFPLElBQU1FLGtCQUFrQixHQUFHLFNBQXJCQSxrQkFBcUIsQ0FBQzdLLElBQUQsRUFBT2dCLE9BQVA7QUFBQSxTQUFtQixVQUFDZixRQUFELEVBQVdnQixRQUFYLEVBQXdCO0FBQzNFbkUsSUFBQUEsS0FBSyxDQUFDb0QsY0FBTixDQUFxQkYsSUFBckI7QUFDQSxRQUFNbUIsUUFBUSxHQUFHRixRQUFRLEdBQUdHLFFBQVgsQ0FBb0JDLEdBQXBCLENBQXdCckIsSUFBSSxDQUFDSSxFQUE3QixDQUFqQjtBQUNBLFFBQU0ySCxRQUFRLEdBQUc1RyxRQUFRLENBQUNFLEdBQVQsQ0FBYSxVQUFiLEVBQXlCekUsR0FBRyxFQUE1QixDQUFqQjtBQUNBLFFBQUlrTyxPQUFPLEdBQUcsSUFBZDtBQUNBL0MsSUFBQUEsUUFBUSxDQUFDN0csT0FBVCxDQUFpQixVQUFDNkosV0FBRCxFQUFjekQsTUFBZCxFQUF5QjtBQUN4Q3RHLE1BQUFBLE9BQU8sQ0FBQ0UsT0FBUixDQUFnQixVQUFDd0MsR0FBRCxFQUFTO0FBQ3ZCLFlBQUlwQixLQUFLLEdBQUd5SSxXQUFXLENBQUN4SixLQUFaLENBQWtCbUMsR0FBRyxDQUFDbkIsWUFBdEIsQ0FBWjs7QUFDQSxZQUFJRCxLQUFLLEtBQUt3RixTQUFkLEVBQXlCO0FBQ3ZCeEYsVUFBQUEsS0FBSyxHQUFHbkIsUUFBUSxDQUNiRSxHQURLLENBQ0QsU0FEQyxFQUVMOEQsSUFGSyxDQUVBLFVBQUExRCxJQUFJO0FBQUEsbUJBQUlBLElBQUksQ0FBQ0YsS0FBTCxDQUFXdkIsSUFBSSxDQUFDcUYsU0FBaEIsTUFBK0JpQyxNQUFuQztBQUFBLFdBRkosRUFHTC9GLEtBSEssQ0FHQ21DLEdBQUcsQ0FBQ25CLFlBSEwsQ0FBUjtBQUlEOztBQUNELFlBQU15SSxPQUFPLEdBQUd4RCxxQkFBcUIsQ0FBQ3hILElBQUQsRUFBT3NILE1BQVAsRUFBZTVELEdBQUcsQ0FBQ25CLFlBQW5CLEVBQWlDRCxLQUFqQyxFQUF3Q29CLEdBQUcsQ0FBQytELFVBQTVDLENBQXJCLENBQ2R4SCxRQURjLEVBRWRnQixRQUZjLENBQWhCOztBQUlBLFlBQUk2SixPQUFPLElBQUksQ0FBQ0UsT0FBaEIsRUFBeUI7QUFDdkJGLFVBQUFBLE9BQU8sR0FBRyxLQUFWO0FBQ0Q7QUFDRixPQWZEO0FBZ0JELEtBakJEO0FBa0JBLFdBQU9BLE9BQVA7QUFDRCxHQXhCaUM7QUFBQSxDQUEzQjtBQTBCUCxPQUFPLElBQU1HLHNCQUFzQixHQUFHLFNBQXpCQSxzQkFBeUIsQ0FBQ2pMLElBQUQsRUFBT2dCLE9BQVA7QUFBQSxTQUFtQixVQUFDZixRQUFELEVBQVdnQixRQUFYLEVBQXdCO0FBQy9FbkUsSUFBQUEsS0FBSyxDQUFDb0QsY0FBTixDQUFxQkYsSUFBckI7QUFDQSxRQUFNa0wsVUFBVSxHQUFHakssUUFBUSxHQUFHRyxRQUFYLENBQW9CRyxLQUFwQixDQUEwQixDQUFDdkIsSUFBSSxDQUFDSSxFQUFOLEVBQVUsWUFBVixDQUExQixFQUFtRHhELEdBQUcsRUFBdEQsQ0FBbkI7QUFDQSxRQUFNb0ssT0FBTyxHQUFHLEVBQWhCO0FBQ0FrRSxJQUFBQSxVQUFVLENBQUNoSyxPQUFYLENBQW1CLFVBQUNpSyxhQUFELEVBQWdCM0IsUUFBaEIsRUFBNkI7QUFDOUMsVUFBSTdILE9BQU8sR0FBRyxJQUFkO0FBQ0FYLE1BQUFBLE9BQU8sQ0FBQ0UsT0FBUixDQUFnQixVQUFDd0MsR0FBRCxFQUFTO0FBQ3ZCLFlBQU1wQixLQUFLLEdBQUc2SSxhQUFhLENBQUM1SixLQUFkLENBQW9CbUMsR0FBRyxDQUFDbkIsWUFBeEIsQ0FBZDs7QUFDQSxZQUFJRCxLQUFLLEtBQUt3RixTQUFWLElBQXVCeEYsS0FBSyxLQUFLLEVBQWpDLElBQXVDQSxLQUFLLEtBQUssSUFBckQsRUFBMkQ7QUFDekRYLFVBQUFBLE9BQU8sR0FBRyxLQUFWO0FBQ0Q7QUFDRixPQUxEOztBQU1BLFVBQUlBLE9BQUosRUFBYTtBQUNYcUYsUUFBQUEsT0FBTyxDQUFDb0UsSUFBUixDQUFhNUIsUUFBYjtBQUNEO0FBQ0YsS0FYRDs7QUFZQSxRQUFJeEMsT0FBTyxDQUFDdUIsTUFBUixHQUFpQixDQUFyQixFQUF3QjtBQUN0QnhCLE1BQUFBLGNBQWMsQ0FBQy9HLElBQUQsRUFBT2dILE9BQVAsQ0FBZCxDQUE4Qi9HLFFBQTlCO0FBQ0Q7QUFDRixHQW5CcUM7QUFBQSxDQUEvQjtBQXFCUCxPQUFPLElBQU1vTCxtQkFBbUIsR0FBRyxTQUF0QkEsbUJBQXNCLENBQUNyTCxJQUFELEVBQU9nQixPQUFQO0FBQUEsU0FBbUIsVUFBQ2YsUUFBRCxFQUFXZ0IsUUFBWCxFQUF3QjtBQUM1RW5FLElBQUFBLEtBQUssQ0FBQ29ELGNBQU4sQ0FBcUJGLElBQXJCO0FBQ0FpTCxJQUFBQSxzQkFBc0IsQ0FBQ2pMLElBQUQsRUFBT2dCLE9BQVAsQ0FBdEIsQ0FBc0NmLFFBQXRDLEVBQWdEZ0IsUUFBaEQ7QUFDQSxRQUFNaUssVUFBVSxHQUFHakssUUFBUSxHQUFHRyxRQUFYLENBQW9CRyxLQUFwQixDQUEwQixDQUFDdkIsSUFBSSxDQUFDSSxFQUFOLEVBQVUsWUFBVixDQUExQixFQUFtRHhELEdBQUcsRUFBdEQsQ0FBbkI7QUFDQSxRQUFJa08sT0FBTyxHQUFHLElBQWQ7QUFDQUksSUFBQUEsVUFBVSxDQUFDaEssT0FBWCxDQUFtQixVQUFDaUssYUFBRCxFQUFnQjNCLFFBQWhCLEVBQTZCO0FBQzlDeEksTUFBQUEsT0FBTyxDQUFDRSxPQUFSLENBQWdCLFVBQUN3QyxHQUFELEVBQVM7QUFDdkIsWUFBTXBCLEtBQUssR0FBRzZJLGFBQWEsQ0FBQzVKLEtBQWQsQ0FBb0JtQyxHQUFHLENBQUNuQixZQUF4QixDQUFkO0FBQ0EsWUFBTXlJLE9BQU8sR0FBR3ZCLHVCQUF1QixDQUNyQ3pKLElBRHFDLEVBRXJDd0osUUFGcUMsRUFHckM5RixHQUFHLENBQUNuQixZQUhpQyxFQUlyQ0QsS0FKcUMsRUFLckNvQixHQUFHLENBQUMrRCxVQUxpQyxDQUF2QixDQU1keEgsUUFOYyxFQU1KZ0IsUUFOSSxDQUFoQjs7QUFPQSxZQUFJNkosT0FBTyxJQUFJLENBQUNFLE9BQWhCLEVBQXlCO0FBQ3ZCRixVQUFBQSxPQUFPLEdBQUcsS0FBVjtBQUNEO0FBQ0YsT0FaRDtBQWFELEtBZEQ7QUFlQSxXQUFPQSxPQUFQO0FBQ0QsR0FyQmtDO0FBQUEsQ0FBNUI7QUF1QlAsT0FBTyxJQUFNUSx1QkFBdUIsR0FBRyxTQUExQkEsdUJBQTBCLENBQUN0TCxJQUFELEVBQU9zSCxNQUFQLEVBQWVDLE9BQWYsRUFBd0JqRixLQUF4QjtBQUFBLFNBQWtDLFVBQUNyQyxRQUFELEVBQWM7QUFDckZuRCxJQUFBQSxLQUFLLENBQUNvRCxjQUFOLENBQXFCRixJQUFyQjtBQUNBQyxJQUFBQSxRQUFRLENBQUM7QUFDUEUsTUFBQUEsSUFBSSxFQUFFcEQsS0FBSyxDQUFDdUMsNENBREw7QUFFUFUsTUFBQUEsSUFBSSxFQUFKQSxJQUZPO0FBR1BzSCxNQUFBQSxNQUFNLEVBQU5BLE1BSE87QUFJUEMsTUFBQUEsT0FBTyxFQUFQQSxPQUpPO0FBS1BqRixNQUFBQSxLQUFLLEVBQUxBO0FBTE8sS0FBRCxDQUFSO0FBT0QsR0FUc0M7QUFBQSxDQUFoQztBQVdQLE9BQU8sSUFBTWlKLFdBQVcsR0FBRyxTQUFkQSxXQUFjLENBQUN2TCxJQUFELEVBQU95QixJQUFQLEVBQWErSixZQUFiO0FBQUEsTUFBYUEsWUFBYjtBQUFhQSxJQUFBQSxZQUFiLEdBQTRCNU8sR0FBRyxFQUEvQjtBQUFBOztBQUFBLFNBQXNDLFVBQUNxRCxRQUFELEVBQWM7QUFDN0VuRCxJQUFBQSxLQUFLLENBQUNvRCxjQUFOLENBQXFCRixJQUFyQjtBQUNBQyxJQUFBQSxRQUFRLENBQUM7QUFDUHdCLE1BQUFBLElBQUksRUFBSkEsSUFETztBQUVQK0osTUFBQUEsWUFBWSxFQUFaQSxZQUZPO0FBR1BwTCxNQUFBQSxFQUFFLEVBQUVKLElBQUksQ0FBQ0ksRUFIRjtBQUlQRCxNQUFBQSxJQUFJLEVBQUVwRCxLQUFLLENBQUN3QztBQUpMLEtBQUQsQ0FBUjtBQU1ELEdBUjBCO0FBQUEsQ0FBcEI7QUFVUCxPQUFPLElBQU1rTSx1QkFBdUIsR0FBRyxTQUExQkEsdUJBQTBCLENBQUF6TCxJQUFJO0FBQUEsU0FBSSxVQUFDQyxRQUFELEVBQWM7QUFDM0RuRCxJQUFBQSxLQUFLLENBQUNvRCxjQUFOLENBQXFCRixJQUFyQjtBQUNBQyxJQUFBQSxRQUFRLENBQUM7QUFDUEUsTUFBQUEsSUFBSSxFQUFFcEQsS0FBSyxDQUFDeUMsNENBREw7QUFFUFksTUFBQUEsRUFBRSxFQUFFSixJQUFJLENBQUNJO0FBRkYsS0FBRCxDQUFSO0FBSUQsR0FOMEM7QUFBQSxDQUFwQztBQVFQLE9BQU8sSUFBTXNMLHdCQUF3QixHQUFHLFNBQTNCQSx3QkFBMkIsQ0FBQTFMLElBQUk7QUFBQSxTQUFJLFVBQUNDLFFBQUQsRUFBYztBQUM1RG5ELElBQUFBLEtBQUssQ0FBQ29ELGNBQU4sQ0FBcUJGLElBQXJCO0FBQ0FDLElBQUFBLFFBQVEsQ0FBQztBQUNQRSxNQUFBQSxJQUFJLEVBQUVwRCxLQUFLLENBQUMwQyw2Q0FETDtBQUVQVyxNQUFBQSxFQUFFLEVBQUVKLElBQUksQ0FBQ0k7QUFGRixLQUFELENBQVI7QUFJRCxHQU4yQztBQUFBLENBQXJDO0FBUVAsT0FBTyxJQUFNdUwsa0JBQWtCLEdBQUcsU0FBckJBLGtCQUFxQixDQUFDM0wsSUFBRCxFQUFPNEwsYUFBUCxFQUFzQkMsV0FBdEI7QUFBQSxTQUFzQyxVQUFDNUwsUUFBRCxFQUFjO0FBQ3BGbkQsSUFBQUEsS0FBSyxDQUFDb0QsY0FBTixDQUFxQkYsSUFBckI7QUFDQWxELElBQUFBLEtBQUssQ0FBQzZPLGtCQUFOLENBQXlCM0wsSUFBekIsRUFBK0I0TCxhQUEvQixFQUE4Q0MsV0FBOUM7QUFDQTVMLElBQUFBLFFBQVEsQ0FBQztBQUNQRSxNQUFBQSxJQUFJLEVBQUVwRCxLQUFLLENBQUMyQyxzQ0FETDtBQUVQVSxNQUFBQSxFQUFFLEVBQUVKLElBQUksQ0FBQ0ksRUFGRjtBQUdQeUwsTUFBQUEsV0FBVyxFQUFYQTtBQUhPLEtBQUQsQ0FBUjtBQUtELEdBUmlDO0FBQUEsQ0FBM0I7QUFVUCxPQUFPLElBQU1DLE9BQU8sR0FBRyxTQUFWQSxPQUFVLENBQUM5TCxJQUFELEVBQU8rTCxJQUFQO0FBQUEsU0FBZ0IsVUFBQzlMLFFBQUQsRUFBYztBQUNuRG5ELElBQUFBLEtBQUssQ0FBQ2tQLFFBQU4sQ0FBZWhNLElBQWYsRUFBcUIrTCxJQUFyQjtBQUNBOUwsSUFBQUEsUUFBUSxDQUFDO0FBQ1A4TCxNQUFBQSxJQUFJLEVBQUpBLElBRE87QUFFUDNMLE1BQUFBLEVBQUUsRUFBRUosSUFBSSxDQUFDSSxFQUZGO0FBR1BELE1BQUFBLElBQUksRUFBRXBELEtBQUssQ0FBQzhDO0FBSEwsS0FBRCxDQUFSO0FBS0QsR0FQc0I7QUFBQSxDQUFoQjtBQVNQLE9BQU8sSUFBTW9NLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsQ0FBQ2pNLElBQUQsRUFBT2tNLFVBQVA7QUFBQSxTQUFzQixVQUFDak0sUUFBRCxFQUFjO0FBQy9EbkQsSUFBQUEsS0FBSyxDQUFDcVAsY0FBTixDQUFxQm5NLElBQXJCLEVBQTJCa00sVUFBM0I7QUFDQWpNLElBQUFBLFFBQVEsQ0FBQztBQUNQaU0sTUFBQUEsVUFBVSxFQUFWQSxVQURPO0FBRVA5TCxNQUFBQSxFQUFFLEVBQUVKLElBQUksQ0FBQ0ksRUFGRjtBQUdQRCxNQUFBQSxJQUFJLEVBQUVwRCxLQUFLLENBQUMrQztBQUhMLEtBQUQsQ0FBUjtBQUtELEdBUDRCO0FBQUEsQ0FBdEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSW1tdXRhYmxlLCB7IE1hcCwgTGlzdCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9kYXRhZ3JpZC51dGlscyc7XG5cbmV4cG9ydCBjb25zdCBUWVBFUyA9IHtcbiAgUExBVEZPUk1fREFUQUdSSURfSU5WQUxJREFURTogJ1BMQVRGT1JNX0RBVEFHUklEX0lOVkFMSURBVEUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9CVVNZOiAnUExBVEZPUk1fREFUQUdSSURfQlVTWScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFQURZOiAnUExBVEZPUk1fREFUQUdSSURfUkVBRFknLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRVRfREFUQTogJ1BMQVRGT1JNX0RBVEFHUklEX1NFVF9EQVRBJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQVBQTFlfU09SVDogJ1BMQVRGT1JNX0RBVEFHUklEX0FQUExZX1NPUlQnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TT1JUX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX1NPUlRfQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVTSVpFX0NPTFVNTjogJ1BMQVRGT1JNX0RBVEFHUklEX1JFU0laRV9DT0xVTU4nLFxuICBQTEFURk9STV9EQVRBR1JJRF9FRElUOiAnUExBVEZPUk1fREFUQUdSSURfRURJVCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NBTkNFTDogJ1BMQVRGT1JNX0RBVEFHUklEX0NBTkNFTCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NBVkU6ICdQTEFURk9STV9EQVRBR1JJRF9TQVZFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfRVhURU5EX0RBVEE6ICdQTEFURk9STV9EQVRBR1JJRF9FWFRFTkRfREFUQScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NBVkVfU1VDQ0VTUzogJ1BMQVRGT1JNX0RBVEFHUklEX1NBVkVfU1VDQ0VTUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NBVkVfUEFSVElBTF9TVUNDRVNTOiAnUExBVEZPUk1fREFUQUdSSURfU0FWRV9QQVJUSUFMX1NVQ0NFU1MnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TQVZFX0ZBSUw6ICdQTEFURk9STV9EQVRBR1JJRF9TQVZFX0ZBSUwnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEU6ICdQTEFURk9STV9EQVRBR1JJRF9DUkVBVEUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9BRERfTkVXX0lURU06ICdQTEFURk9STV9EQVRBR1JJRF9BRERfTkVXX0lURU0nLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfSVRFTTogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9JVEVNJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNOiAnUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNUzogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTVMnLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkU6ICdQTEFURk9STV9EQVRBR1JJRF9SRU1PVkUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfU1VDQ0VTUzogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9TVUNDRVNTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUw6ICdQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfRkFJTCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0VESVRfQ0VMTF9WQUxVRV9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9FRElUX0NFTExfVkFMVUVfQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFUzogJ1BMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NFTExfSElERV9NRVNTQUdFOiAnUExBVEZPUk1fREFUQUdSSURfQ0VMTF9ISURFX01FU1NBR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9TSE9XX01FU1NBR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9TSE9XX01FU1NBR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9ISURFX01FU1NBR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9ISURFX01FU1NBR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9WQUxJREFURTogJ1BMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX1ZBTElEQVRFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TRUxFQ1RJT05fQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TRUxFQ1RJT05fQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9TRUxFQ1RfQUxMX0lURU1TX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NMRUFSX1NFTEVDVEVEX0lURU1TOiAnUExBVEZPUk1fREFUQUdSSURfQ0xFQVJfU0VMRUNURURfSVRFTVMnLFxuICBQTEFURk9STV9EQVRBR1JJRF9UT0dHTEVfRklMVEVSSU5HOiAnUExBVEZPUk1fREFUQUdSSURfVE9HR0xFX0ZJTFRFUklORycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0ZJTFRFUl9EQVRBX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX0ZJTFRFUl9EQVRBX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0FQUExZX0ZJTFRFUlM6ICdQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9GSUxURVJTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0VUX0ZJTFRFUlM6ICdQTEFURk9STV9EQVRBR1JJRF9TRVRfRklMVEVSUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1VQREFURV9FWElTVElOR19DRUxMX1ZBTFVFOiAnUExBVEZPUk1fREFUQUdSSURfVVBEQVRFX0VYSVNUSU5HX0NFTExfVkFMVUUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRVRfRURJVF9EQVRBOiAnUExBVEZPUk1fREFUQUdSSURfU0VUX0VESVRfREFUQScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9PUEVOOiAnUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX09QRU4nLFxuICBQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfQ0xPU0U6ICdQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfQ0xPU0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfU0FWRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfRk9SQ0VfUkVGUkVTSDogJ1BMQVRGT1JNX0RBVEFHUklEX0ZPUkNFX1JFRlJFU0gnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRVRfRk9DVVNfVE86ICdQTEFURk9STV9EQVRBR1JJRF9TRVRfRk9DVVNfVE8nLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRVRfUEFHRTogJ1BMQVRGT1JNX0RBVEFHUklEX1NFVF9QQUdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0VUX1JPV1NfT05fUEFHRTogJ1BMQVRGT1JNX0RBVEFHUklEX1NFVF9ST1dTX09OX1BBR0UnLFxufTtcblxuZXhwb3J0IGNvbnN0IGludmFsaWRhdGUgPSBncmlkID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0lOVkFMSURBVEUsXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGZvcmNlUmVmcmVzaCA9ICgpID0+IChkaXNwYXRjaCkgPT4ge1xuICAvLyBGaXJlIHJlc2l6ZSBldmVudCB0byByZWNhbGN1bGF0ZSBjb21wb25lbnQgc2l6ZXNcbiAgLy8gYW5kIHRvIGZvcmNlIHJlZHJhdyBhbGwgbW91bnRlZCBncmlkc1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBpZiAoZG9jdW1lbnQuY3JlYXRlRXZlbnQpIHtcbiAgICAgIGNvbnN0IGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdIVE1MRXZlbnRzJyk7XG4gICAgICBldnQuaW5pdEV2ZW50KCdyZXNpemUnLCB0cnVlLCBmYWxzZSk7XG4gICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChldnQpO1xuICAgIH1cbiAgfSwgMSk7XG4gIGRpc3BhdGNoKHsgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfRk9SQ0VfUkVGUkVTSCB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXRCdXN5ID0gZ3JpZCA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9CVVNZLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXRSZWFkeSA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVBRFksXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGFwcGx5RmlsdGVycyA9IChncmlkLCBjb2x1bW5zKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBpZiAoIWNvbHVtbnMgfHwgIWNvbHVtbnMuZm9yRWFjaCkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBncmlkRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0KGdyaWQuaWQpO1xuICBpZiAoIWdyaWREYXRhKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IGZpbHRlckRhdGEgPSBncmlkRGF0YS5nZXRJbihbJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2ZpbHRlckRhdGEnXSwgTWFwKCkpO1xuICBjb25zdCBhbGxEYXRhID0gZ3JpZERhdGEuZ2V0KCdhbGxEYXRhJyk7XG4gIGxldCBkYXRhO1xuICBpZiAoZ3JpZC5wYWdpbmF0aW9uKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgc2V0QnVzeShncmlkKShkaXNwYXRjaCk7XG4gIGlmIChmaWx0ZXJEYXRhLmlzRW1wdHkoKSkge1xuICAgIGRhdGEgPSBhbGxEYXRhO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IGRhdGVGb3JtYXQgPSBVdGlscy5nZXREYXRlRm9ybWF0KGdyaWQsIGdldFN0YXRlKCkudXNlcik7XG4gICAgZGF0YSA9IGFsbERhdGEuZmlsdGVyKChyb3cpID0+IHtcbiAgICAgIGxldCBoaXRzID0gMDtcbiAgICAgIGZpbHRlckRhdGEuZm9yRWFjaCgoZmlsdGVyVmFsdWUsIGZpbHRlckNvbHVtbikgPT4ge1xuICAgICAgICBjb2x1bW5zLmZvckVhY2goKGNvbHVtbikgPT4ge1xuICAgICAgICAgIGlmIChVdGlscy5nZXRDb2x1bW5LZXkoY29sdW1uKSA9PT0gZmlsdGVyQ29sdW1uKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHJvdy5nZXRJbihjb2x1bW4udmFsdWVLZXlQYXRoKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSB8fCB2YWx1ZSA9PT0gMCB8fCB2YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgY29uc3QgZmlsdGVyTWF0Y2hlciA9IFV0aWxzLmdldEZpbHRlck1hdGNoZXIoY29sdW1uLCBkYXRlRm9ybWF0KTtcbiAgICAgICAgICAgICAgaWYgKGZpbHRlck1hdGNoZXIocm93LCBmaWx0ZXJWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBoaXRzICs9IDE7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gaGl0cyA9PT0gZmlsdGVyRGF0YS5zaXplO1xuICAgIH0pO1xuICB9XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9BUFBMWV9GSUxURVJTLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGRhdGEsXG4gIH0pO1xuICBzZXRSZWFkeShncmlkKShkaXNwYXRjaCk7XG4gIHJldHVybiB0cnVlO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldEFuZEFwcGx5RmlsdGVycyA9IChncmlkLCBjb2x1bW5zLCBkYXRhKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgY29uc3QgZmlsdGVyaW5nRGF0YSA9IFV0aWxzLm5vcm1hbGl6ZUZpbHRlcmluZ0RhdGEoZGF0YSk7XG4gIFV0aWxzLnNhdmVGaWx0ZXJEYXRhKGdyaWQsIGZpbHRlcmluZ0RhdGEuZ2V0KCdmaWx0ZXJEYXRhJykpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX0ZJTFRFUlMsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgZmlsdGVyaW5nRGF0YSxcbiAgfSk7XG4gIGRpc3BhdGNoKGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKSk7XG4gIHJldHVybiB0cnVlO1xufTtcblxuZXhwb3J0IGNvbnN0IGZpbHRlckNlbGxWYWx1ZUNoYW5nZSA9IChncmlkLCBjb2x1bW5zLCBjb2x1bW4sIHZhbHVlKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBjb25zdCBvcmlnRmlsdGVyRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oXG4gICAgW2dyaWQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdmaWx0ZXJEYXRhJ10sXG4gICAgTWFwKCksXG4gICk7XG4gIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2x1bW4pO1xuICBjb25zdCB2YWx1ZUVtcHR5Q2hlY2tlciA9IFV0aWxzLmdldFZhbHVlRW1wdHlDaGVja2VyKGNvbHVtbik7XG4gIGxldCBmaWx0ZXJEYXRhO1xuICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsdWUpKSB7XG4gICAgZmlsdGVyRGF0YSA9IG9yaWdGaWx0ZXJEYXRhLmRlbGV0ZShjb2x1bW5LZXkpO1xuICB9IGVsc2Uge1xuICAgIGZpbHRlckRhdGEgPSBvcmlnRmlsdGVyRGF0YS5zZXQoY29sdW1uS2V5LCB2YWx1ZSk7XG4gIH1cbiAgVXRpbHMuc2F2ZUZpbHRlckRhdGEoZ3JpZCwgZmlsdGVyRGF0YSk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9GSUxURVJfREFUQV9DSEFOR0UsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgLy8gVGhlIGZpbHRlckRhdGEgbWlnaHQgaGF2ZSBwcm9wZXJ0eSwgd2hpY2ggdmFsdWUgaXMgYXJyYXkgKHRoaXMgaGFwcGVucyB3aGVuIGxvYWRlZCBmcm9tXG4gICAgLy8gc2Vzc2lvbiBzdG9yYWdlKS4gSW4gb3JkZXIgdG8gYWxsb3cgbmVzdGVkIGNvbnZlcnRpb24gb2YgZmlsdGVyRGF0YSBhbmQgYXJyYXkgdHlwZSBvZlxuICAgIC8vIHByb3BlcnR5IHRvIGJlIGNvbnZlcnRlZCB0byBpbW11dGFibGUgbGlzdCwgdGhlIGZpbHRlckRhdGEgbXVzdCBiZSBvYmplY3QgaW5zdGVhZCBvZiBtYXAuXG4gICAgZmlsdGVyRGF0YTogZmlsdGVyRGF0YS50b0pTKCksXG4gIH0pO1xuICBhcHBseUZpbHRlcnMoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbn07XG5cbmV4cG9ydCBjb25zdCBhcHBseVNvcnQgPSAoZ3JpZCwgY29sdW1ucykgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgaWYgKCFjb2x1bW5zIHx8ICFjb2x1bW5zLmZvckVhY2gpIHJldHVybiBmYWxzZTtcbiAgY29uc3QgZ3JpZERhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldChncmlkLmlkKTtcbiAgaWYgKCFncmlkRGF0YSkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBzb3J0RGF0YSA9IGdyaWREYXRhLmdldEluKFsnY29uZmlnJywgJ3NvcnRpbmdEYXRhJ10pO1xuICBpZiAoIXNvcnREYXRhKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IHNvcnRDb2x1bW4gPSBzb3J0RGF0YS5nZXQoJ3NvcnRDb2x1bW4nKTtcbiAgaWYgKCFzb3J0Q29sdW1uKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IHNvcnRPcmRlciA9IHNvcnREYXRhLmdldCgnc29ydE9yZGVyJywgJ2FzYycpO1xuICBsZXQgY29sdW1uO1xuICBjb2x1bW5zLmZvckVhY2goKGNvbCkgPT4ge1xuICAgIGlmIChVdGlscy5nZXRDb2x1bW5LZXkoY29sKSA9PT0gc29ydENvbHVtbikge1xuICAgICAgY29sdW1uID0gY29sO1xuICAgIH1cbiAgfSk7XG4gIGlmICghY29sdW1uKSByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKGdyaWQucGFnaW5hdGlvbikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgc2V0QnVzeShncmlkKShkaXNwYXRjaCk7XG4gIGNvbnN0IG9yaWdBbGxEYXRhID0gZ3JpZERhdGEuZ2V0KCdhbGxEYXRhJyk7XG4gIGNvbnN0IGNvbXBhcmF0b3IgPSBVdGlscy5nZXRTb3J0Q29tcGFyYXRvcihjb2x1bW4pO1xuICBjb25zdCB2YWx1ZUdldHRlciA9IFV0aWxzLmdldFNvcnRWYWx1ZUdldHRlcihjb2x1bW4pO1xuICBjb25zdCB2YWx1ZUVtcHR5Q2hlY2tlciA9IFV0aWxzLmdldFZhbHVlRW1wdHlDaGVja2VyKGNvbHVtbik7XG4gIGNvbnN0IGFsbERhdGEgPSBvcmlnQWxsRGF0YS5zb3J0KChhLCBiKSA9PiB7XG4gICAgY29uc3QgdmFsQSA9IHZhbHVlR2V0dGVyKGEpO1xuICAgIGNvbnN0IHZhbEIgPSB2YWx1ZUdldHRlcihiKTtcbiAgICBpZiAoc29ydE9yZGVyID09PSAnYXNjJykge1xuICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEEpKSByZXR1cm4gLTE7XG4gICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQikpIHJldHVybiAxO1xuICAgICAgcmV0dXJuIGNvbXBhcmF0b3IodmFsQSwgdmFsQik7XG4gICAgfVxuICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxBKSkgcmV0dXJuIDE7XG4gICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEIpKSByZXR1cm4gLTE7XG4gICAgcmV0dXJuIGNvbXBhcmF0b3IodmFsQiwgdmFsQSk7XG4gIH0pO1xuICBsZXQgZGF0YTtcbiAgLy8gU29ydCBhbHNvIGZpbHRlcmVkIGRhdGEgc2VwYXJhdGVseVxuICBpZiAoZ3JpZERhdGEuZ2V0SW4oWydjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdpc0ZpbHRlcmluZyddLCBmYWxzZSkpIHtcbiAgICBkYXRhID0gZ3JpZERhdGEuZ2V0KCdkYXRhJykuc29ydCgoYSwgYikgPT4ge1xuICAgICAgY29uc3QgdmFsQSA9IHZhbHVlR2V0dGVyKGEpO1xuICAgICAgY29uc3QgdmFsQiA9IHZhbHVlR2V0dGVyKGIpO1xuICAgICAgaWYgKHNvcnRPcmRlciA9PT0gJ2FzYycpIHtcbiAgICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEEpKSByZXR1cm4gLTE7XG4gICAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxCKSkgcmV0dXJuIDE7XG4gICAgICAgIHJldHVybiBjb21wYXJhdG9yKHZhbEEsIHZhbEIpO1xuICAgICAgfVxuICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEEpKSByZXR1cm4gMTtcbiAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxCKSkgcmV0dXJuIC0xO1xuICAgICAgcmV0dXJuIGNvbXBhcmF0b3IodmFsQiwgdmFsQSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgZGF0YSA9IGFsbERhdGE7XG4gIH1cbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0FQUExZX1NPUlQsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgZGF0YSxcbiAgICBhbGxEYXRhLFxuICB9KTtcbiAgc2V0UmVhZHkoZ3JpZCkoZGlzcGF0Y2gpO1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmV4cG9ydCBjb25zdCBzb3J0Q2hhbmdlID0gKGdyaWQsIGNvbHVtbnMsIGNvbHVtbiwgbmV3U29ydCkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgY29uc3Qgc29ydE9yZGVyID0gbmV3U29ydCB8fCAnYXNjJztcbiAgY29uc3Qgc29ydENvbHVtbiA9IFV0aWxzLmdldENvbHVtbktleShjb2x1bW4pO1xuICBVdGlscy5zYXZlU29ydERhdGEoZ3JpZCwgeyBzb3J0Q29sdW1uLCBzb3J0T3JkZXIgfSk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TT1JUX0NIQU5HRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBzb3J0Q29sdW1uLFxuICAgIHNvcnRPcmRlcixcbiAgfSk7XG4gIGFwcGx5U29ydChncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldERhdGEgPSAoZ3JpZCwgY29sdW1ucywgZGF0YSkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgVXRpbHMuY2hlY2tDb2x1bW5zUGFyYW0oY29sdW1ucyk7XG4gIGNvbnN0IGNvbmZpZ0RhdGEgPSBVdGlscy5sb2FkR3JpZENvbmZpZyhncmlkLCBjb2x1bW5zKTtcbiAgY29uc3QgaW1tdXRhYmxlRGF0YSA9IEltbXV0YWJsZS5JdGVyYWJsZS5pc0l0ZXJhYmxlKGRhdGEpID8gZGF0YSA6IEltbXV0YWJsZS5mcm9tSlMoZGF0YSk7XG4gIGNvbnN0IHNlbGVjdGVkSXRlbXMgPSBVdGlscy5sb2FkU2VsZWN0ZWRJdGVtcyhncmlkKS5maWx0ZXIoXG4gICAgaXRlbSA9PiAhIWltbXV0YWJsZURhdGEuZmluZChkYXRhSXRlbSA9PiBkYXRhSXRlbS5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGl0ZW0pLFxuICApO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX0RBVEEsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgZGF0YTogaW1tdXRhYmxlRGF0YSxcbiAgICBjb25maWc6IGNvbmZpZ0RhdGEsXG4gICAgc2VsZWN0ZWRJdGVtcyxcbiAgfSk7XG4gIGlmICghZ3JpZC5wYWdpbmF0aW9uKSB7XG4gICAgYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gICAgYXBwbHlTb3J0KGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59O1xuXG4vKipcbiAqIEFjdGlvbiB0byBzZXQgZm9jdXMgdG8gZWl0aGVyIGxhc3QgZWRpdGVkUm93LCBjcmVhdGVkUm93IG9yIHRvIHZhbGlkYXRpb24gZXJyb3JcbiAqIEBwYXJhbSB7T2JqZWN0fSBncmlkXG4gKiBAcGFyYW0ge1N0cmluZ30gZm9jdXNUb1R5cGUgLSB0eXBlIG9mIGZvY3VzIHJlcXVlc3QuIFBvc3NpYmxlIHZhbHVlczpcbiAqICdmb2N1c1RvRWRpdENlbGwnIHx8ICdmb2N1c1RvRXJyb3JDZWxsJyB8fCAnZm9jdXNUb0NyZWF0ZUNlbGwnXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGZvY3VzVG9MYXN0Um93IC0gc2V0cyBmb2N1cyB0byBsYXN0IGRhdGEgcm93IGluc3RlYWQgb2Ygc2VsZWN0ZWQgcm93XG4gKi9cbmV4cG9ydCBjb25zdCBzZXRGb2N1c1RvID0gKGdyaWQsIGZvY3VzVG8sIGZvY3VzVG9MYXN0Um93ID0gZmFsc2UpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NFVF9GT0NVU19UTyxcbiAgICBmb2N1c1RvLFxuICAgIGZvY3VzVG9MYXN0Um93LFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBleHRlbmREYXRhID0gKGdyaWQsIGNvbHVtbnMsIGRhdGEsIHByZXBlbmQgPSBmYWxzZSkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgY29uc3QgaW1tdXRhYmxlRGF0YSA9IEltbXV0YWJsZS5JdGVyYWJsZS5pc0l0ZXJhYmxlKGRhdGEpID8gZGF0YSA6IEltbXV0YWJsZS5mcm9tSlMoZGF0YSk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9FWFRFTkRfREFUQSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBkYXRhOiBpbW11dGFibGVEYXRhLFxuICAgIHByZXBlbmQsXG4gIH0pO1xuICBhcHBseUZpbHRlcnMoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgYXBwbHlTb3J0KGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVzaXplQ29sdW1uID0gKGdyaWQsIGNvbHVtbktleSwgd2lkdGgpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGNvbnN0IGNvbHVtbldpZHRocyA9IGdldFN0YXRlKClcbiAgICAuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdjb25maWcnLCAnY29sdW1uV2lkdGhzJ10sIE1hcCgpKVxuICAgIC5zZXQoY29sdW1uS2V5LCB3aWR0aCk7XG4gIFV0aWxzLnNhdmVDb2x1bW5XaWR0aHMoZ3JpZCwgY29sdW1uV2lkdGhzKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFU0laRV9DT0xVTU4sXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgY29sdW1uV2lkdGhzLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBlZGl0ID0gZ3JpZCA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9FRElULFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBjYW5jZWwgPSBncmlkID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NBTkNFTCxcbiAgICBpZDogZ3JpZC5pZCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2F2ZSA9IChncmlkLCBjYiA9ICgpID0+IHt9KSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TQVZFLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbiAgY2IoKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzYXZlU3VjY2VzcyA9IChncmlkLCBjb2x1bW5zLCBzYXZlZEl0ZW1zKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0FWRV9TVUNDRVNTLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgc2F2ZWRJdGVtcyxcbiAgfSk7XG4gIGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICBhcHBseVNvcnQoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzYXZlUGFydGlhbFN1Y2Nlc3MgPSAoZ3JpZCwgY29sdW1ucywgc2F2ZWRJdGVtcykgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfUEFSVElBTF9TVUNDRVNTLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgc2F2ZWRJdGVtcyxcbiAgfSk7XG4gIGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICBhcHBseVNvcnQoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzYXZlRmFpbCA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0FWRV9GQUlMLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGUgPSAoZ3JpZCwgY29sdW1uRGVmYXVsdFZhbHVlcykgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGNvbHVtbkRlZmF1bHRWYWx1ZXMsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGFkZE5ld0l0ZW0gPSAoZ3JpZCwgY29sdW1uRGVmYXVsdFZhbHVlcykgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQUREX05FV19JVEVNLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGNvbHVtbkRlZmF1bHRWYWx1ZXMsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZUl0ZW0gPSAoZ3JpZCwgcm93SWQpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9JVEVNLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgcm93SWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZU5ld0l0ZW0gPSAoZ3JpZCwgaW5kZXgpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBpbmRleCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlTmV3SXRlbXMgPSAoZ3JpZCwgaW5kZXhlcykgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNUyxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBpbmRleGVzLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmUgPSAoZ3JpZCwgY2IgPSAoKSA9PiB7fSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbiAgY2IoKTtcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVTdWNjZXNzID0gKGdyaWQsIHJlbW92ZWRJZHMpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9TVUNDRVNTLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgcmVtb3ZlZElkcyxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlRmFpbCA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUwsXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGVkaXRDZWxsVmFsdWVDaGFuZ2UgPSAoZ3JpZCwgZGF0YUlkLCBrZXlQYXRoLCB2YWx1ZSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfRURJVF9DRUxMX1ZBTFVFX0NIQU5HRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBkYXRhSWQsXG4gICAga2V5UGF0aCxcbiAgICB2YWx1ZSxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZWRpdENlbGxWYWx1ZVZhbGlkYXRlID0gKGdyaWQsIGRhdGFJZCwga2V5UGF0aCwgdmFsdWUsIHZhbGlkYXRvcnMgPSBbXSkgPT4gKFxuICBkaXNwYXRjaCxcbiAgZ2V0U3RhdGUsXG4pID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGxldCB2YWxpZGF0aW9uU3RhdGUgPSB7IHZhbGlkOiB0cnVlIH07XG4gIHZhbGlkYXRvcnMuZm9yRWFjaCgodmFsaWRhdG9yKSA9PiB7XG4gICAgaWYgKHZhbGlkYXRpb25TdGF0ZS52YWxpZCkge1xuICAgICAgaWYgKHZhbGlkYXRvci51bmlxdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSAnJyB8fCB2YWx1ZSAhPT0gbnVsbCB8fCB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgLy8gY29tYmluZSByZWFsIGRhdGEgd2l0aCBjdXJyZW50IHVuc2F2ZWQgZWRpdGVkIGRhdGFcbiAgICAgICAgICBjb25zdCBncmlkRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0KGdyaWQuaWQpO1xuICAgICAgICAgIGNvbnN0IGVkaXREYXRhID0gZ3JpZERhdGEuZ2V0KCdlZGl0RGF0YScpO1xuICAgICAgICAgIGxldCBhbGxEYXRhID0gZ3JpZERhdGEuZ2V0KCdhbGxEYXRhJyk7XG4gICAgICAgICAgaWYgKGVkaXREYXRhKSB7XG4gICAgICAgICAgICBlZGl0RGF0YS5mb3JFYWNoKChlZGl0RGF0YUl0ZW0sIGVkaXREYXRhSXRlbUlkKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGZvdW5kSW5kZXggPSBhbGxEYXRhLmZpbmRJbmRleChkID0+IGQuZ2V0SW4oZ3JpZC5pZEtleVBhdGgpID09PSBlZGl0RGF0YUl0ZW1JZCk7XG4gICAgICAgICAgICAgIGlmIChmb3VuZEluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIGFsbERhdGEgPSBhbGxEYXRhLm1lcmdlRGVlcEluKFtmb3VuZEluZGV4XSwgZWRpdERhdGFJdGVtKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGRldGVybWluZSB1bmlxdWVuZXNzXG4gICAgICAgICAgY29uc3QgZmluZGluZyA9IGFsbERhdGEuZmluZCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYgKGdyaWQuaWRLZXlQYXRoLmxlbmd0aCkge1xuICAgICAgICAgICAgICAvLyBkb24ndCBzZWxmIGNvbXBhcmVcbiAgICAgICAgICAgICAgaWYgKGl0ZW0uZ2V0SW4oZ3JpZC5pZEtleVBhdGgpID09PSBkYXRhSWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpdGVtLmdldEluKGtleVBhdGgpID09PSB2YWx1ZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoZmluZGluZykge1xuICAgICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0ge1xuICAgICAgICAgICAgICB2YWxpZDogZmFsc2UsXG4gICAgICAgICAgICAgIG1lc3NhZ2U6ICdWYWxpZGF0aW9uLlVuaXF1ZScsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh2YWxpZGF0b3IudmFsaWRhdGVXaXRoUm93RGF0YSkge1xuICAgICAgICAvLyBDdXN0b20gdmFsaWRhdG9yIGZ1bmN0aW9uIHdpdGggcm93RGF0YSBhcyBwYXJhbWV0ZXJzXG4gICAgICAgIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG4gICAgICAgIGNvbnN0IGVkaXREYXRhID0gZ3JpZERhdGEuZ2V0SW4oWydlZGl0RGF0YScsIGRhdGFJZF0sIE1hcCgpKTtcbiAgICAgICAgbGV0IHJvd0RhdGEgPSBncmlkRGF0YS5nZXQoJ2FsbERhdGEnKS5maW5kKGl0ZW0gPT4gaXRlbS5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGRhdGFJZCk7XG4gICAgICAgIGlmIChyb3dEYXRhKSB7XG4gICAgICAgICAgcm93RGF0YSA9IHJvd0RhdGEubWVyZ2VEZWVwKGVkaXREYXRhKTtcbiAgICAgICAgICBjb25zdCBwYXJhbXMgPSB2YWxpZGF0b3IucGFyYW1zID8gT2JqZWN0LnZhbHVlcyh2YWxpZGF0b3IucGFyYW1zKSA6IFtdO1xuICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZVdpdGhSb3dEYXRhKHZhbHVlLCByb3dEYXRhLCAuLi5wYXJhbXMpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHZhbGlkYXRvci52YWxpZGF0ZVdpdGhHcmlkRGF0YSkge1xuICAgICAgICAvLyBDdXN0b20gdmFsaWRhdG9yIGZ1bmN0aW9uIHdpdGggcm93RGF0YSBhbmQgZ3JpZERhdGEgYXMgcGFyYW1ldGVyc1xuICAgICAgICBjb25zdCBncmlkRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0KGdyaWQuaWQpO1xuXG4gICAgICAgIGxldCBhbGxEYXRhID0gZ3JpZERhdGEuZ2V0KCdhbGxEYXRhJywgTGlzdCgpKTtcbiAgICAgICAgY29uc3QgZWRpdERhdGEgPSBncmlkRGF0YS5nZXQoJ2VkaXREYXRhJywgTWFwKCkpO1xuXG4gICAgICAgIGVkaXREYXRhLmZvckVhY2goKGVkaXRSb3csIGVkaXRLZXkpID0+IHtcbiAgICAgICAgICBjb25zdCBmb3VuZEluZGV4ID0gYWxsRGF0YS5maW5kSW5kZXgoZCA9PiBkLmdldEluKGdyaWQuaWRLZXlQYXRoKSA9PT0gZWRpdEtleSk7XG4gICAgICAgICAgaWYgKGZvdW5kSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICBhbGxEYXRhID0gYWxsRGF0YS5tZXJnZURlZXBJbihbZm91bmRJbmRleF0sIGVkaXRSb3cpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGVkaXRSb3dEYXRhID0gZWRpdERhdGEuZ2V0KGRhdGFJZCwgTWFwKCkpO1xuICAgICAgICBsZXQgcm93RGF0YSA9IGFsbERhdGEuZmluZChpdGVtID0+IGl0ZW0uZ2V0SW4oZ3JpZC5pZEtleVBhdGgpID09PSBkYXRhSWQpO1xuICAgICAgICBpZiAocm93RGF0YSkge1xuICAgICAgICAgIHJvd0RhdGEgPSByb3dEYXRhLm1lcmdlRGVlcChlZGl0Um93RGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcm93RGF0YSA9IGVkaXRSb3dEYXRhO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHZhbGlkYXRvci5wYXJhbXMgPyBPYmplY3QudmFsdWVzKHZhbGlkYXRvci5wYXJhbXMpIDogW107XG4gICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZVdpdGhHcmlkRGF0YSh2YWx1ZSwgcm93RGF0YSwgYWxsRGF0YSwgLi4ucGFyYW1zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHZhbGlkYXRvci5wYXJhbXMgPyBPYmplY3QudmFsdWVzKHZhbGlkYXRvci5wYXJhbXMpIDogW107XG4gICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZSh2YWx1ZSwgLi4ucGFyYW1zKTtcbiAgICAgICAgaWYgKHZhbGlkYXRvci5wYXJhbXMpIHtcbiAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZVZhbHVlcyA9IHZhbGlkYXRvci5wYXJhbXM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICBpZiAodmFsaWRhdGlvblN0YXRlLnZhbGlkKSB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0VMTF9ISURFX01FU1NBR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIG1lc3NhZ2VUeXBlOiAnZXJyb3InLFxuICAgICAgZGF0YUlkLFxuICAgICAga2V5UGF0aCxcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgbWVzc2FnZVR5cGU6ICdlcnJvcicsXG4gICAgICBkYXRhSWQsXG4gICAgICBrZXlQYXRoLFxuICAgICAgbWVzc2FnZUlkOiB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZSxcbiAgICAgIG1lc3NhZ2VWYWx1ZXM6IHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlVmFsdWVzLFxuICAgIH0pO1xuICB9XG4gIHJldHVybiB2YWxpZGF0aW9uU3RhdGUudmFsaWQ7XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlID0gKGdyaWQsIHJvd0luZGV4LCBrZXlQYXRoLCB2YWx1ZSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfQ0hBTkdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIHJvd0luZGV4LFxuICAgIGtleVBhdGgsXG4gICAgdmFsdWUsXG4gIH0pO1xufTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbmV4cG9ydCBjb25zdCBjcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZSA9IChncmlkLCByb3dJbmRleCwga2V5UGF0aCwgdmFsdWUsIHZhbGlkYXRvcnMgPSBbXSkgPT4gKFxuICBkaXNwYXRjaCxcbiAgZ2V0U3RhdGUsXG4pID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGxldCB2YWxpZGF0aW9uU3RhdGUgPSB7IHZhbGlkOiB0cnVlIH07XG4gIHZhbGlkYXRvcnMuZm9yRWFjaCgodmFsaWRhdG9yKSA9PiB7XG4gICAgaWYgKHZhbGlkYXRpb25TdGF0ZS52YWxpZCkge1xuICAgICAgaWYgKHZhbGlkYXRvci51bmlxdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSAnJyB8fCB2YWx1ZSAhPT0gbnVsbCB8fCB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY29uc3QgZmluZGluZyA9IGdldFN0YXRlKClcbiAgICAgICAgICAgIC5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ2FsbERhdGEnXSlcbiAgICAgICAgICAgIC5maW5kKGl0ZW0gPT4gaXRlbS5nZXRJbihrZXlQYXRoKSA9PT0gdmFsdWUpO1xuICAgICAgICAgIGlmIChmaW5kaW5nKSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB7XG4gICAgICAgICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgICAgICAgICAgbWVzc2FnZTogJ1ZhbGlkYXRpb24uVW5pcXVlJyxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGZpbmQyID0gZ2V0U3RhdGUoKVxuICAgICAgICAgICAgICAuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdjcmVhdGVEYXRhJ10pXG4gICAgICAgICAgICAgIC5maW5kKChpdGVtLCBpKSA9PiBpICE9PSByb3dJbmRleCAmJiBpdGVtLmdldEluKGtleVBhdGgpID09PSB2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoZmluZDIpIHtcbiAgICAgICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0ge1xuICAgICAgICAgICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnVmFsaWRhdGlvbi5VbmlxdWUnLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh2YWxpZGF0b3IudmFsaWRhdGVXaXRoUm93RGF0YSkge1xuICAgICAgICBjb25zdCByb3dEYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ2NyZWF0ZURhdGEnLCByb3dJbmRleF0pO1xuICAgICAgICBjb25zdCBwYXJhbXMgPSB2YWxpZGF0b3IucGFyYW1zID8gT2JqZWN0LnZhbHVlcyh2YWxpZGF0b3IucGFyYW1zKSA6IFtdO1xuICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB2YWxpZGF0b3IudmFsaWRhdGVXaXRoUm93RGF0YSh2YWx1ZSwgcm93RGF0YSwgLi4ucGFyYW1zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHZhbGlkYXRvci5wYXJhbXMgPyBPYmplY3QudmFsdWVzKHZhbGlkYXRvci5wYXJhbXMpIDogW107XG4gICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZSh2YWx1ZSwgLi4ucGFyYW1zKTtcbiAgICAgICAgaWYgKHZhbGlkYXRvci5wYXJhbXMpIHtcbiAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZVZhbHVlcyA9IHZhbGlkYXRvci5wYXJhbXM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICBpZiAodmFsaWRhdGlvblN0YXRlLnZhbGlkKSB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfSElERV9NRVNTQUdFLFxuICAgICAgaWQ6IGdyaWQuaWQsXG4gICAgICBtZXNzYWdlVHlwZTogJ2Vycm9yJyxcbiAgICAgIHJvd0luZGV4LFxuICAgICAga2V5UGF0aCxcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9TSE9XX01FU1NBR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIG1lc3NhZ2VUeXBlOiAnZXJyb3InLFxuICAgICAgcm93SW5kZXgsXG4gICAgICBrZXlQYXRoLFxuICAgICAgbWVzc2FnZUlkOiB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZSxcbiAgICAgIG1lc3NhZ2VWYWx1ZXM6IHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlVmFsdWVzLFxuICAgIH0pO1xuICB9XG4gIHJldHVybiB2YWxpZGF0aW9uU3RhdGUudmFsaWQ7XG59O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuZXhwb3J0IGNvbnN0IGNlbGxTaG93TWVzc2FnZSA9IChcbiAgZ3JpZCxcbiAgbWVzc2FnZVR5cGUsXG4gIGRhdGFJZCxcbiAga2V5UGF0aCxcbiAgbWVzc2FnZUlkLFxuICBtZXNzYWdlVmFsdWVzLFxuKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBtZXNzYWdlVHlwZSxcbiAgICBkYXRhSWQsXG4gICAga2V5UGF0aCxcbiAgICBtZXNzYWdlSWQsXG4gICAgbWVzc2FnZVZhbHVlcyxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgY2VsbFNob3dNZXNzYWdlcyA9IChncmlkLCBtZXNzYWdlcykgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0VTLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIG1lc3NhZ2VzLFxuICB9KTtcbn07XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG5leHBvcnQgY29uc3QgY2VsbEhpZGVNZXNzYWdlID0gKFxuICBncmlkLFxuICBtZXNzYWdlVHlwZSA9IG51bGwsXG4gIGRhdGFJZCA9IG51bGwsXG4gIGtleVBhdGggPSBudWxsLFxuKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBtZXNzYWdlVHlwZSxcbiAgICBkYXRhSWQsXG4gICAga2V5UGF0aCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQ2VsbFNob3dNZXNzYWdlID0gKFxuICBncmlkLFxuICBtZXNzYWdlVHlwZSxcbiAgcm93SW5kZXgsXG4gIGtleVBhdGgsXG4gIG1lc3NhZ2VJZCxcbiAgbWVzc2FnZVZhbHVlcyxcbikgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfU0hPV19NRVNTQUdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIG1lc3NhZ2VUeXBlLFxuICAgIHJvd0luZGV4LFxuICAgIGtleVBhdGgsXG4gICAgbWVzc2FnZUlkLFxuICAgIG1lc3NhZ2VWYWx1ZXMsXG4gIH0pO1xufTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbmV4cG9ydCBjb25zdCBjcmVhdGVDZWxsSGlkZU1lc3NhZ2UgPSAoXG4gIGdyaWQsXG4gIG1lc3NhZ2VUeXBlID0gbnVsbCxcbiAgcm93SW5kZXggPSBudWxsLFxuICBrZXlQYXRoID0gbnVsbCxcbikgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfSElERV9NRVNTQUdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIG1lc3NhZ2VUeXBlLFxuICAgIHJvd0luZGV4LFxuICAgIGtleVBhdGgsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGNlbGxTZWxlY3Rpb25DaGFuZ2UgPSAoZ3JpZCwgc2VsZWN0ZWRDZWxsID0gbnVsbCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgc2VsZWN0ZWRDZWxsLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0VMRUNUSU9OX0NIQU5HRSxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgaXRlbVNlbGVjdGlvbkNoYW5nZSA9IChncmlkLCByb3dJbmRleCwgY3RybFByZXNzZWQgPSBmYWxzZSwgc2hpZnRQcmVzc2VkID0gZmFsc2UpID0+IChcbiAgZGlzcGF0Y2gsXG4gIGdldFN0YXRlLFxuKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIHJvd0luZGV4LFxuICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgY3RybFByZXNzZWQsXG4gICAgc2hpZnRQcmVzc2VkLFxuICB9KTtcbiAgVXRpbHMuc2F2ZVNlbGVjdGVkSXRlbXMoZ3JpZCwgZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ3NlbGVjdGVkSXRlbXMnXSkpO1xufTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdEFsbEl0ZW1zQ2hhbmdlID0gZ3JpZCA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0UsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgfSk7XG4gIFV0aWxzLnNhdmVTZWxlY3RlZEl0ZW1zKGdyaWQsIGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdzZWxlY3RlZEl0ZW1zJ10pKTtcbn07XG5cbmV4cG9ydCBjb25zdCBjbGVhclNlbGVjdGVkSXRlbXMgPSBncmlkID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DTEVBUl9TRUxFQ1RFRF9JVEVNUyxcbiAgICBpZDogZ3JpZC5pZCxcbiAgfSk7XG4gIFV0aWxzLnNhdmVTZWxlY3RlZEl0ZW1zKGdyaWQsIGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdzZWxlY3RlZEl0ZW1zJ10pKTtcbn07XG5cbmV4cG9ydCBjb25zdCB0b2dnbGVGaWx0ZXJpbmcgPSBncmlkID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGNvbnN0IGlzRmlsdGVyaW5nID0gIWdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oXG4gICAgW2dyaWQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdpc0ZpbHRlcmluZyddLFxuICAgIGZhbHNlLFxuICApO1xuICBVdGlscy5zYXZlSXNGaWx0ZXJpbmcoZ3JpZCwgaXNGaWx0ZXJpbmcpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfVE9HR0xFX0ZJTFRFUklORyxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBpc0ZpbHRlcmluZyxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgdmFsaWRhdGVFZGl0ZWRSb3dzID0gKGdyaWQsIGNvbHVtbnMpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG4gIGNvbnN0IGVkaXREYXRhID0gZ3JpZERhdGEuZ2V0KCdlZGl0RGF0YScsIE1hcCgpKTtcbiAgbGV0IGFsbEdvb2QgPSB0cnVlO1xuICBlZGl0RGF0YS5mb3JFYWNoKChlZGl0RGF0YVJvdywgZGF0YUlkKSA9PiB7XG4gICAgY29sdW1ucy5mb3JFYWNoKChjb2wpID0+IHtcbiAgICAgIGxldCB2YWx1ZSA9IGVkaXREYXRhUm93LmdldEluKGNvbC52YWx1ZUtleVBhdGgpO1xuICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsdWUgPSBncmlkRGF0YVxuICAgICAgICAgIC5nZXQoJ2FsbERhdGEnKVxuICAgICAgICAgIC5maW5kKGRhdGEgPT4gZGF0YS5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGRhdGFJZClcbiAgICAgICAgICAuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG4gICAgICB9XG4gICAgICBjb25zdCBpc1ZhbGlkID0gZWRpdENlbGxWYWx1ZVZhbGlkYXRlKGdyaWQsIGRhdGFJZCwgY29sLnZhbHVlS2V5UGF0aCwgdmFsdWUsIGNvbC52YWxpZGF0b3JzKShcbiAgICAgICAgZGlzcGF0Y2gsXG4gICAgICAgIGdldFN0YXRlLFxuICAgICAgKTtcbiAgICAgIGlmIChhbGxHb29kICYmICFpc1ZhbGlkKSB7XG4gICAgICAgIGFsbEdvb2QgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBhbGxHb29kO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZUVtcHR5Q3JlYXRlZFJvd3MgPSAoZ3JpZCwgY29sdW1ucykgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgY29uc3QgY3JlYXRlRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdjcmVhdGVEYXRhJ10sIE1hcCgpKTtcbiAgY29uc3QgaW5kZXhlcyA9IFtdO1xuICBjcmVhdGVEYXRhLmZvckVhY2goKGNyZWF0ZURhdGFSb3csIHJvd0luZGV4KSA9PiB7XG4gICAgbGV0IGlzRW1wdHkgPSB0cnVlO1xuICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGNyZWF0ZURhdGFSb3cuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG4gICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gJycgJiYgdmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgaXNFbXB0eSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChpc0VtcHR5KSB7XG4gICAgICBpbmRleGVzLnB1c2gocm93SW5kZXgpO1xuICAgIH1cbiAgfSk7XG4gIGlmIChpbmRleGVzLmxlbmd0aCA+IDApIHtcbiAgICByZW1vdmVOZXdJdGVtcyhncmlkLCBpbmRleGVzKShkaXNwYXRjaCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUNyZWF0ZWRSb3dzID0gKGdyaWQsIGNvbHVtbnMpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIHJlbW92ZUVtcHR5Q3JlYXRlZFJvd3MoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgY29uc3QgY3JlYXRlRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdjcmVhdGVEYXRhJ10sIE1hcCgpKTtcbiAgbGV0IGFsbEdvb2QgPSB0cnVlO1xuICBjcmVhdGVEYXRhLmZvckVhY2goKGNyZWF0ZURhdGFSb3csIHJvd0luZGV4KSA9PiB7XG4gICAgY29sdW1ucy5mb3JFYWNoKChjb2wpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gY3JlYXRlRGF0YVJvdy5nZXRJbihjb2wudmFsdWVLZXlQYXRoKTtcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSBjcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZShcbiAgICAgICAgZ3JpZCxcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIGNvbC52YWx1ZUtleVBhdGgsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBjb2wudmFsaWRhdG9ycyxcbiAgICAgICkoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgICAgIGlmIChhbGxHb29kICYmICFpc1ZhbGlkKSB7XG4gICAgICAgIGFsbEdvb2QgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBhbGxHb29kO1xufTtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZUV4aXN0aW5nQ2VsbFZhbHVlID0gKGdyaWQsIGRhdGFJZCwga2V5UGF0aCwgdmFsdWUpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1VQREFURV9FWElTVElOR19DRUxMX1ZBTFVFLFxuICAgIGdyaWQsXG4gICAgZGF0YUlkLFxuICAgIGtleVBhdGgsXG4gICAgdmFsdWUsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldEVkaXREYXRhID0gKGdyaWQsIGRhdGEsIGNlbGxNZXNzYWdlcyA9IE1hcCgpKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICBkYXRhLFxuICAgIGNlbGxNZXNzYWdlcyxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfRURJVF9EQVRBLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBvcGVuQ29sdW1uU2V0dGluZ3NNb2RhbCA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX09QRU4sXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbCA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX0NMT1NFLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzYXZlQ29sdW1uU2V0dGluZ3MgPSAoZ3JpZCwgaGlkZGVuQ29sdW1ucywgY29sdW1uT3JkZXIpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgVXRpbHMuc2F2ZUNvbHVtblNldHRpbmdzKGdyaWQsIGhpZGRlbkNvbHVtbnMsIGNvbHVtbk9yZGVyKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGNvbHVtbk9yZGVyLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXRQYWdlID0gKGdyaWQsIHBhZ2UpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5zYXZlUGFnZShncmlkLCBwYWdlKTtcbiAgZGlzcGF0Y2goe1xuICAgIHBhZ2UsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX1BBR0UsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldFJvd3NPblBhZ2UgPSAoZ3JpZCwgcm93c09uUGFnZSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLnNhdmVSb3dzT25QYWdlKGdyaWQsIHJvd3NPblBhZ2UpO1xuICBkaXNwYXRjaCh7XG4gICAgcm93c09uUGFnZSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfUk9XU19PTl9QQUdFLFxuICB9KTtcbn07XG4iXX0=