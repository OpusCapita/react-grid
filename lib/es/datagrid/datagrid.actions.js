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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5hY3Rpb25zLmpzIl0sIm5hbWVzIjpbIkltbXV0YWJsZSIsIk1hcCIsIkxpc3QiLCJVdGlscyIsIlRZUEVTIiwiUExBVEZPUk1fREFUQUdSSURfSU5WQUxJREFURSIsIlBMQVRGT1JNX0RBVEFHUklEX0JVU1kiLCJQTEFURk9STV9EQVRBR1JJRF9SRUFEWSIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9EQVRBIiwiUExBVEZPUk1fREFUQUdSSURfQVBQTFlfU09SVCIsIlBMQVRGT1JNX0RBVEFHUklEX1NPUlRfQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfUkVTSVpFX0NPTFVNTiIsIlBMQVRGT1JNX0RBVEFHUklEX0VESVQiLCJQTEFURk9STV9EQVRBR1JJRF9DQU5DRUwiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFIiwiUExBVEZPUk1fREFUQUdSSURfRVhURU5EX0RBVEEiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFX1NVQ0NFU1MiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFX1BBUlRJQUxfU1VDQ0VTUyIsIlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfRkFJTCIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURSIsIlBMQVRGT1JNX0RBVEFHUklEX0FERF9ORVdfSVRFTSIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9JVEVNIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNUyIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRSIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9TVUNDRVNTIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUwiLCJQTEFURk9STV9EQVRBR1JJRF9FRElUX0NFTExfVkFMVUVfQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0UiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRVMiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX0hJREVfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX0NIQU5HRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX1ZBTElEQVRFIiwiUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TRUxFQ1RJT05fQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9DTEVBUl9TRUxFQ1RFRF9JVEVNUyIsIlBMQVRGT1JNX0RBVEFHUklEX1RPR0dMRV9GSUxURVJJTkciLCJQTEFURk9STV9EQVRBR1JJRF9GSUxURVJfREFUQV9DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9GSUxURVJTIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX0ZJTFRFUlMiLCJQTEFURk9STV9EQVRBR1JJRF9VUERBVEVfRVhJU1RJTkdfQ0VMTF9WQUxVRSIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9FRElUX0RBVEEiLCJQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfT1BFTiIsIlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFIiwiUExBVEZPUk1fREFUQUdSSURfRk9SQ0VfUkVGUkVTSCIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9GT0NVU19UTyIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9QQUdFIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX1JPV1NfT05fUEFHRSIsImludmFsaWRhdGUiLCJncmlkIiwiZGlzcGF0Y2giLCJjaGVja0dyaWRQYXJhbSIsInR5cGUiLCJpZCIsImZvcmNlUmVmcmVzaCIsInNldFRpbWVvdXQiLCJkb2N1bWVudCIsImNyZWF0ZUV2ZW50IiwiZXZ0IiwiaW5pdEV2ZW50Iiwid2luZG93IiwiZGlzcGF0Y2hFdmVudCIsInNldEJ1c3kiLCJzZXRSZWFkeSIsImFwcGx5RmlsdGVycyIsImNvbHVtbnMiLCJnZXRTdGF0ZSIsImZvckVhY2giLCJncmlkRGF0YSIsImRhdGFncmlkIiwiZ2V0IiwiZmlsdGVyRGF0YSIsImdldEluIiwiYWxsRGF0YSIsImRhdGEiLCJwYWdpbmF0aW9uIiwiaXNFbXB0eSIsImRhdGVGb3JtYXQiLCJnZXREYXRlRm9ybWF0IiwidXNlciIsImZpbHRlciIsInJvdyIsImhpdHMiLCJmaWx0ZXJWYWx1ZSIsImZpbHRlckNvbHVtbiIsImNvbHVtbiIsImdldENvbHVtbktleSIsInZhbHVlIiwidmFsdWVLZXlQYXRoIiwiZmlsdGVyTWF0Y2hlciIsImdldEZpbHRlck1hdGNoZXIiLCJzaXplIiwic2V0QW5kQXBwbHlGaWx0ZXJzIiwiZmlsdGVyaW5nRGF0YSIsIm5vcm1hbGl6ZUZpbHRlcmluZ0RhdGEiLCJzYXZlRmlsdGVyRGF0YSIsImZpbHRlckNlbGxWYWx1ZUNoYW5nZSIsIm9yaWdGaWx0ZXJEYXRhIiwiY29sdW1uS2V5IiwidmFsdWVFbXB0eUNoZWNrZXIiLCJnZXRWYWx1ZUVtcHR5Q2hlY2tlciIsInNldCIsInRvSlMiLCJhcHBseVNvcnQiLCJzb3J0RGF0YSIsInNvcnRDb2x1bW4iLCJzb3J0T3JkZXIiLCJjb2wiLCJvcmlnQWxsRGF0YSIsImNvbXBhcmF0b3IiLCJnZXRTb3J0Q29tcGFyYXRvciIsInZhbHVlR2V0dGVyIiwiZ2V0U29ydFZhbHVlR2V0dGVyIiwic29ydCIsImEiLCJiIiwidmFsQSIsInZhbEIiLCJzb3J0Q2hhbmdlIiwibmV3U29ydCIsInNhdmVTb3J0RGF0YSIsInNldERhdGEiLCJjaGVja0NvbHVtbnNQYXJhbSIsImNvbmZpZ0RhdGEiLCJsb2FkR3JpZENvbmZpZyIsImltbXV0YWJsZURhdGEiLCJJdGVyYWJsZSIsImlzSXRlcmFibGUiLCJmcm9tSlMiLCJzZWxlY3RlZEl0ZW1zIiwibG9hZFNlbGVjdGVkSXRlbXMiLCJpdGVtIiwiZmluZCIsImRhdGFJdGVtIiwiaWRLZXlQYXRoIiwiY29uZmlnIiwic2V0Rm9jdXNUbyIsImZvY3VzVG8iLCJmb2N1c1RvTGFzdFJvdyIsImV4dGVuZERhdGEiLCJwcmVwZW5kIiwicmVzaXplQ29sdW1uIiwid2lkdGgiLCJjb2x1bW5XaWR0aHMiLCJzYXZlQ29sdW1uV2lkdGhzIiwiZWRpdCIsImNhbmNlbCIsInNhdmUiLCJjYiIsInNhdmVTdWNjZXNzIiwic2F2ZWRJdGVtcyIsInNhdmVQYXJ0aWFsU3VjY2VzcyIsInNhdmVGYWlsIiwiY3JlYXRlIiwiY29sdW1uRGVmYXVsdFZhbHVlcyIsImFkZE5ld0l0ZW0iLCJyZW1vdmVJdGVtIiwicm93SWQiLCJyZW1vdmVOZXdJdGVtIiwiaW5kZXgiLCJyZW1vdmVOZXdJdGVtcyIsImluZGV4ZXMiLCJyZW1vdmUiLCJyZW1vdmVTdWNjZXNzIiwicmVtb3ZlZElkcyIsInJlbW92ZUZhaWwiLCJlZGl0Q2VsbFZhbHVlQ2hhbmdlIiwiZGF0YUlkIiwia2V5UGF0aCIsImVkaXRDZWxsVmFsdWVWYWxpZGF0ZSIsInZhbGlkYXRvcnMiLCJ2YWxpZGF0aW9uU3RhdGUiLCJ2YWxpZCIsInZhbGlkYXRvciIsInVuaXF1ZSIsInVuZGVmaW5lZCIsImVkaXREYXRhIiwiZWRpdERhdGFJdGVtIiwiZWRpdERhdGFJdGVtSWQiLCJmb3VuZEluZGV4IiwiZmluZEluZGV4IiwiZCIsIm1lcmdlRGVlcEluIiwiZmluZGluZyIsImxlbmd0aCIsIm1lc3NhZ2UiLCJ2YWxpZGF0ZVdpdGhSb3dEYXRhIiwicm93RGF0YSIsIm1lcmdlRGVlcCIsInBhcmFtcyIsIk9iamVjdCIsInZhbHVlcyIsInZhbGlkYXRlV2l0aEdyaWREYXRhIiwiZWRpdFJvdyIsImVkaXRLZXkiLCJlZGl0Um93RGF0YSIsInZhbGlkYXRlIiwibWVzc2FnZVZhbHVlcyIsImNlbGxNZXNzYWdlIiwibWVzc2FnZVR5cGUiLCJtZXNzYWdlSWQiLCJjcmVhdGVDZWxsVmFsdWVDaGFuZ2UiLCJyb3dJbmRleCIsImNyZWF0ZUNlbGxWYWx1ZVZhbGlkYXRlIiwiZmluZDIiLCJpIiwiY3JlYXRlQ2VsbE1lc3NhZ2UiLCJjZWxsU2hvd01lc3NhZ2UiLCJjZWxsU2hvd01lc3NhZ2VzIiwibWVzc2FnZXMiLCJjZWxsSGlkZU1lc3NhZ2UiLCJjcmVhdGVDZWxsU2hvd01lc3NhZ2UiLCJjcmVhdGVDZWxsSGlkZU1lc3NhZ2UiLCJjZWxsU2VsZWN0aW9uQ2hhbmdlIiwic2VsZWN0ZWRDZWxsIiwiaXRlbVNlbGVjdGlvbkNoYW5nZSIsImN0cmxQcmVzc2VkIiwic2hpZnRQcmVzc2VkIiwic2F2ZVNlbGVjdGVkSXRlbXMiLCJzZWxlY3RBbGxJdGVtc0NoYW5nZSIsImNsZWFyU2VsZWN0ZWRJdGVtcyIsInRvZ2dsZUZpbHRlcmluZyIsImlzRmlsdGVyaW5nIiwic2F2ZUlzRmlsdGVyaW5nIiwidmFsaWRhdGVFZGl0ZWRSb3dzIiwiYWxsR29vZCIsImVkaXREYXRhUm93IiwiaXNWYWxpZCIsInJlbW92ZUVtcHR5Q3JlYXRlZFJvd3MiLCJjcmVhdGVEYXRhIiwiY3JlYXRlRGF0YVJvdyIsInB1c2giLCJ2YWxpZGF0ZUNyZWF0ZWRSb3dzIiwidXBkYXRlRXhpc3RpbmdDZWxsVmFsdWUiLCJzZXRFZGl0RGF0YSIsImNlbGxNZXNzYWdlcyIsIm9wZW5Db2x1bW5TZXR0aW5nc01vZGFsIiwiY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsIiwic2F2ZUNvbHVtblNldHRpbmdzIiwiaGlkZGVuQ29sdW1ucyIsImNvbHVtbk9yZGVyIiwic2V0UGFnZSIsInBhZ2UiLCJzYXZlUGFnZSIsInNldFJvd3NPblBhZ2UiLCJyb3dzT25QYWdlIiwic2F2ZVJvd3NPblBhZ2UiXSwibWFwcGluZ3MiOiJBQUFBLE9BQU9BLFNBQVAs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O0FBS0QsR0FQc0I7QUFBQSxDQUFoQjtBQVNQLE9BQU8sSUFBTXNNLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsQ0FBQ25NLElBQUQsRUFBT29NLFVBQVA7QUFBQSxTQUFzQixVQUFDbk0sUUFBRCxFQUFjO0FBQy9EbkQsSUFBQUEsS0FBSyxDQUFDdVAsY0FBTixDQUFxQnJNLElBQXJCLEVBQTJCb00sVUFBM0I7QUFDQW5NLElBQUFBLFFBQVEsQ0FBQztBQUNQbU0sTUFBQUEsVUFBVSxFQUFWQSxVQURPO0FBRVBoTSxNQUFBQSxFQUFFLEVBQUVKLElBQUksQ0FBQ0ksRUFGRjtBQUdQRCxNQUFBQSxJQUFJLEVBQUVwRCxLQUFLLENBQUMrQztBQUhMLEtBQUQsQ0FBUjtBQUtELEdBUDRCO0FBQUEsQ0FBdEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSW1tdXRhYmxlLCB7IE1hcCwgTGlzdCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9kYXRhZ3JpZC51dGlscyc7XG5cbmV4cG9ydCBjb25zdCBUWVBFUyA9IHtcbiAgUExBVEZPUk1fREFUQUdSSURfSU5WQUxJREFURTogJ1BMQVRGT1JNX0RBVEFHUklEX0lOVkFMSURBVEUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9CVVNZOiAnUExBVEZPUk1fREFUQUdSSURfQlVTWScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFQURZOiAnUExBVEZPUk1fREFUQUdSSURfUkVBRFknLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRVRfREFUQTogJ1BMQVRGT1JNX0RBVEFHUklEX1NFVF9EQVRBJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQVBQTFlfU09SVDogJ1BMQVRGT1JNX0RBVEFHUklEX0FQUExZX1NPUlQnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TT1JUX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX1NPUlRfQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVTSVpFX0NPTFVNTjogJ1BMQVRGT1JNX0RBVEFHUklEX1JFU0laRV9DT0xVTU4nLFxuICBQTEFURk9STV9EQVRBR1JJRF9FRElUOiAnUExBVEZPUk1fREFUQUdSSURfRURJVCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NBTkNFTDogJ1BMQVRGT1JNX0RBVEFHUklEX0NBTkNFTCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NBVkU6ICdQTEFURk9STV9EQVRBR1JJRF9TQVZFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfRVhURU5EX0RBVEE6ICdQTEFURk9STV9EQVRBR1JJRF9FWFRFTkRfREFUQScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NBVkVfU1VDQ0VTUzogJ1BMQVRGT1JNX0RBVEFHUklEX1NBVkVfU1VDQ0VTUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NBVkVfUEFSVElBTF9TVUNDRVNTOiAnUExBVEZPUk1fREFUQUdSSURfU0FWRV9QQVJUSUFMX1NVQ0NFU1MnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TQVZFX0ZBSUw6ICdQTEFURk9STV9EQVRBR1JJRF9TQVZFX0ZBSUwnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEU6ICdQTEFURk9STV9EQVRBR1JJRF9DUkVBVEUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9BRERfTkVXX0lURU06ICdQTEFURk9STV9EQVRBR1JJRF9BRERfTkVXX0lURU0nLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfSVRFTTogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9JVEVNJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNOiAnUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNUzogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTVMnLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkU6ICdQTEFURk9STV9EQVRBR1JJRF9SRU1PVkUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfU1VDQ0VTUzogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9TVUNDRVNTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUw6ICdQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfRkFJTCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0VESVRfQ0VMTF9WQUxVRV9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9FRElUX0NFTExfVkFMVUVfQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFUzogJ1BMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NFTExfSElERV9NRVNTQUdFOiAnUExBVEZPUk1fREFUQUdSSURfQ0VMTF9ISURFX01FU1NBR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9TSE9XX01FU1NBR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9TSE9XX01FU1NBR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9ISURFX01FU1NBR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9ISURFX01FU1NBR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9WQUxJREFURTogJ1BMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX1ZBTElEQVRFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TRUxFQ1RJT05fQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TRUxFQ1RJT05fQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9TRUxFQ1RfQUxMX0lURU1TX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NMRUFSX1NFTEVDVEVEX0lURU1TOiAnUExBVEZPUk1fREFUQUdSSURfQ0xFQVJfU0VMRUNURURfSVRFTVMnLFxuICBQTEFURk9STV9EQVRBR1JJRF9UT0dHTEVfRklMVEVSSU5HOiAnUExBVEZPUk1fREFUQUdSSURfVE9HR0xFX0ZJTFRFUklORycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0ZJTFRFUl9EQVRBX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX0ZJTFRFUl9EQVRBX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0FQUExZX0ZJTFRFUlM6ICdQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9GSUxURVJTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0VUX0ZJTFRFUlM6ICdQTEFURk9STV9EQVRBR1JJRF9TRVRfRklMVEVSUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1VQREFURV9FWElTVElOR19DRUxMX1ZBTFVFOiAnUExBVEZPUk1fREFUQUdSSURfVVBEQVRFX0VYSVNUSU5HX0NFTExfVkFMVUUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRVRfRURJVF9EQVRBOiAnUExBVEZPUk1fREFUQUdSSURfU0VUX0VESVRfREFUQScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9PUEVOOiAnUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX09QRU4nLFxuICBQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfQ0xPU0U6ICdQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfQ0xPU0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfU0FWRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfRk9SQ0VfUkVGUkVTSDogJ1BMQVRGT1JNX0RBVEFHUklEX0ZPUkNFX1JFRlJFU0gnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRVRfRk9DVVNfVE86ICdQTEFURk9STV9EQVRBR1JJRF9TRVRfRk9DVVNfVE8nLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRVRfUEFHRTogJ1BMQVRGT1JNX0RBVEFHUklEX1NFVF9QQUdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0VUX1JPV1NfT05fUEFHRTogJ1BMQVRGT1JNX0RBVEFHUklEX1NFVF9ST1dTX09OX1BBR0UnLFxufTtcblxuZXhwb3J0IGNvbnN0IGludmFsaWRhdGUgPSBncmlkID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0lOVkFMSURBVEUsXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGZvcmNlUmVmcmVzaCA9ICgpID0+IChkaXNwYXRjaCkgPT4ge1xuICAvLyBGaXJlIHJlc2l6ZSBldmVudCB0byByZWNhbGN1bGF0ZSBjb21wb25lbnQgc2l6ZXNcbiAgLy8gYW5kIHRvIGZvcmNlIHJlZHJhdyBhbGwgbW91bnRlZCBncmlkc1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBpZiAoZG9jdW1lbnQuY3JlYXRlRXZlbnQpIHtcbiAgICAgIGNvbnN0IGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdIVE1MRXZlbnRzJyk7XG4gICAgICBldnQuaW5pdEV2ZW50KCdyZXNpemUnLCB0cnVlLCBmYWxzZSk7XG4gICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChldnQpO1xuICAgIH1cbiAgfSwgMSk7XG4gIGRpc3BhdGNoKHsgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfRk9SQ0VfUkVGUkVTSCB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXRCdXN5ID0gZ3JpZCA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9CVVNZLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXRSZWFkeSA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVBRFksXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGFwcGx5RmlsdGVycyA9IChncmlkLCBjb2x1bW5zKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBpZiAoIWNvbHVtbnMgfHwgIWNvbHVtbnMuZm9yRWFjaCkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBncmlkRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0KGdyaWQuaWQpO1xuICBpZiAoIWdyaWREYXRhKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IGZpbHRlckRhdGEgPSBncmlkRGF0YS5nZXRJbihbJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2ZpbHRlckRhdGEnXSwgTWFwKCkpO1xuICBjb25zdCBhbGxEYXRhID0gZ3JpZERhdGEuZ2V0KCdhbGxEYXRhJyk7XG4gIGxldCBkYXRhO1xuICBpZiAoZ3JpZC5wYWdpbmF0aW9uKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgc2V0QnVzeShncmlkKShkaXNwYXRjaCk7XG4gIGlmIChmaWx0ZXJEYXRhLmlzRW1wdHkoKSkge1xuICAgIGRhdGEgPSBhbGxEYXRhO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IGRhdGVGb3JtYXQgPSBVdGlscy5nZXREYXRlRm9ybWF0KGdyaWQsIGdldFN0YXRlKCkudXNlcik7XG4gICAgZGF0YSA9IGFsbERhdGEuZmlsdGVyKChyb3cpID0+IHtcbiAgICAgIGxldCBoaXRzID0gMDtcbiAgICAgIGZpbHRlckRhdGEuZm9yRWFjaCgoZmlsdGVyVmFsdWUsIGZpbHRlckNvbHVtbikgPT4ge1xuICAgICAgICBjb2x1bW5zLmZvckVhY2goKGNvbHVtbikgPT4ge1xuICAgICAgICAgIGlmIChVdGlscy5nZXRDb2x1bW5LZXkoY29sdW1uKSA9PT0gZmlsdGVyQ29sdW1uKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHJvdy5nZXRJbihjb2x1bW4udmFsdWVLZXlQYXRoKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSB8fCB2YWx1ZSA9PT0gMCB8fCB2YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgY29uc3QgZmlsdGVyTWF0Y2hlciA9IFV0aWxzLmdldEZpbHRlck1hdGNoZXIoY29sdW1uLCBkYXRlRm9ybWF0KTtcbiAgICAgICAgICAgICAgaWYgKGZpbHRlck1hdGNoZXIocm93LCBmaWx0ZXJWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBoaXRzICs9IDE7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gaGl0cyA9PT0gZmlsdGVyRGF0YS5zaXplO1xuICAgIH0pO1xuICB9XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9BUFBMWV9GSUxURVJTLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGRhdGEsXG4gIH0pO1xuICBzZXRSZWFkeShncmlkKShkaXNwYXRjaCk7XG4gIHJldHVybiB0cnVlO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldEFuZEFwcGx5RmlsdGVycyA9IChncmlkLCBjb2x1bW5zLCBkYXRhKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgY29uc3QgZmlsdGVyaW5nRGF0YSA9IFV0aWxzLm5vcm1hbGl6ZUZpbHRlcmluZ0RhdGEoZGF0YSk7XG4gIFV0aWxzLnNhdmVGaWx0ZXJEYXRhKGdyaWQsIGZpbHRlcmluZ0RhdGEuZ2V0KCdmaWx0ZXJEYXRhJykpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX0ZJTFRFUlMsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgZmlsdGVyaW5nRGF0YSxcbiAgfSk7XG4gIGRpc3BhdGNoKGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKSk7XG4gIHJldHVybiB0cnVlO1xufTtcblxuZXhwb3J0IGNvbnN0IGZpbHRlckNlbGxWYWx1ZUNoYW5nZSA9IChncmlkLCBjb2x1bW5zLCBjb2x1bW4sIHZhbHVlKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBjb25zdCBvcmlnRmlsdGVyRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oXG4gICAgW2dyaWQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdmaWx0ZXJEYXRhJ10sXG4gICAgTWFwKCksXG4gICk7XG4gIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2x1bW4pO1xuICBjb25zdCB2YWx1ZUVtcHR5Q2hlY2tlciA9IFV0aWxzLmdldFZhbHVlRW1wdHlDaGVja2VyKGNvbHVtbik7XG4gIGxldCBmaWx0ZXJEYXRhO1xuICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsdWUpKSB7XG4gICAgZmlsdGVyRGF0YSA9IG9yaWdGaWx0ZXJEYXRhLmRlbGV0ZShjb2x1bW5LZXkpO1xuICB9IGVsc2Uge1xuICAgIGZpbHRlckRhdGEgPSBvcmlnRmlsdGVyRGF0YS5zZXQoY29sdW1uS2V5LCB2YWx1ZSk7XG4gIH1cbiAgVXRpbHMuc2F2ZUZpbHRlckRhdGEoZ3JpZCwgZmlsdGVyRGF0YSk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9GSUxURVJfREFUQV9DSEFOR0UsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgLy8gVGhlIGZpbHRlckRhdGEgbWlnaHQgaGF2ZSBwcm9wZXJ0eSwgd2hpY2ggdmFsdWUgaXMgYXJyYXkgKHRoaXMgaGFwcGVucyB3aGVuIGxvYWRlZCBmcm9tXG4gICAgLy8gc2Vzc2lvbiBzdG9yYWdlKS4gSW4gb3JkZXIgdG8gYWxsb3cgbmVzdGVkIGNvbnZlcnRpb24gb2YgZmlsdGVyRGF0YSBhbmQgYXJyYXkgdHlwZSBvZlxuICAgIC8vIHByb3BlcnR5IHRvIGJlIGNvbnZlcnRlZCB0byBpbW11dGFibGUgbGlzdCwgdGhlIGZpbHRlckRhdGEgbXVzdCBiZSBvYmplY3QgaW5zdGVhZCBvZiBtYXAuXG4gICAgZmlsdGVyRGF0YTogZmlsdGVyRGF0YS50b0pTKCksXG4gIH0pO1xuICBhcHBseUZpbHRlcnMoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbn07XG5cbmV4cG9ydCBjb25zdCBhcHBseVNvcnQgPSAoZ3JpZCwgY29sdW1ucykgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgaWYgKCFjb2x1bW5zIHx8ICFjb2x1bW5zLmZvckVhY2gpIHJldHVybiBmYWxzZTtcbiAgY29uc3QgZ3JpZERhdGEgPSBnZXRTdGF0ZSgpLmRhdGFncmlkLmdldChncmlkLmlkKTtcbiAgaWYgKCFncmlkRGF0YSkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBzb3J0RGF0YSA9IGdyaWREYXRhLmdldEluKFsnY29uZmlnJywgJ3NvcnRpbmdEYXRhJ10pO1xuICBpZiAoIXNvcnREYXRhKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IHNvcnRDb2x1bW4gPSBzb3J0RGF0YS5nZXQoJ3NvcnRDb2x1bW4nKTtcbiAgaWYgKCFzb3J0Q29sdW1uKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IHNvcnRPcmRlciA9IHNvcnREYXRhLmdldCgnc29ydE9yZGVyJywgJ2FzYycpO1xuICBsZXQgY29sdW1uO1xuICBjb2x1bW5zLmZvckVhY2goKGNvbCkgPT4ge1xuICAgIGlmIChVdGlscy5nZXRDb2x1bW5LZXkoY29sKSA9PT0gc29ydENvbHVtbikge1xuICAgICAgY29sdW1uID0gY29sO1xuICAgIH1cbiAgfSk7XG4gIGlmICghY29sdW1uKSByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKGdyaWQucGFnaW5hdGlvbikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgc2V0QnVzeShncmlkKShkaXNwYXRjaCk7XG4gIGNvbnN0IG9yaWdBbGxEYXRhID0gZ3JpZERhdGEuZ2V0KCdhbGxEYXRhJyk7XG4gIGNvbnN0IGNvbXBhcmF0b3IgPSBVdGlscy5nZXRTb3J0Q29tcGFyYXRvcihjb2x1bW4pO1xuICBjb25zdCB2YWx1ZUdldHRlciA9IFV0aWxzLmdldFNvcnRWYWx1ZUdldHRlcihjb2x1bW4pO1xuICBjb25zdCB2YWx1ZUVtcHR5Q2hlY2tlciA9IFV0aWxzLmdldFZhbHVlRW1wdHlDaGVja2VyKGNvbHVtbik7XG4gIGNvbnN0IGFsbERhdGEgPSBvcmlnQWxsRGF0YS5zb3J0KChhLCBiKSA9PiB7XG4gICAgY29uc3QgdmFsQSA9IHZhbHVlR2V0dGVyKGEpO1xuICAgIGNvbnN0IHZhbEIgPSB2YWx1ZUdldHRlcihiKTtcbiAgICBpZiAoc29ydE9yZGVyID09PSAnYXNjJykge1xuICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEEpKSByZXR1cm4gLTE7XG4gICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQikpIHJldHVybiAxO1xuICAgICAgcmV0dXJuIGNvbXBhcmF0b3IodmFsQSwgdmFsQik7XG4gICAgfVxuICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxBKSkgcmV0dXJuIDE7XG4gICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEIpKSByZXR1cm4gLTE7XG4gICAgcmV0dXJuIGNvbXBhcmF0b3IodmFsQiwgdmFsQSk7XG4gIH0pO1xuICBsZXQgZGF0YTtcbiAgLy8gU29ydCBhbHNvIGZpbHRlcmVkIGRhdGEgc2VwYXJhdGVseVxuICBpZiAoZ3JpZERhdGEuZ2V0SW4oWydjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdpc0ZpbHRlcmluZyddLCBmYWxzZSkpIHtcbiAgICBkYXRhID0gZ3JpZERhdGEuZ2V0KCdkYXRhJykuc29ydCgoYSwgYikgPT4ge1xuICAgICAgY29uc3QgdmFsQSA9IHZhbHVlR2V0dGVyKGEpO1xuICAgICAgY29uc3QgdmFsQiA9IHZhbHVlR2V0dGVyKGIpO1xuICAgICAgaWYgKHNvcnRPcmRlciA9PT0gJ2FzYycpIHtcbiAgICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEEpKSByZXR1cm4gLTE7XG4gICAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxCKSkgcmV0dXJuIDE7XG4gICAgICAgIHJldHVybiBjb21wYXJhdG9yKHZhbEEsIHZhbEIpO1xuICAgICAgfVxuICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEEpKSByZXR1cm4gMTtcbiAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxCKSkgcmV0dXJuIC0xO1xuICAgICAgcmV0dXJuIGNvbXBhcmF0b3IodmFsQiwgdmFsQSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgZGF0YSA9IGFsbERhdGE7XG4gIH1cbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0FQUExZX1NPUlQsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgZGF0YSxcbiAgICBhbGxEYXRhLFxuICB9KTtcbiAgc2V0UmVhZHkoZ3JpZCkoZGlzcGF0Y2gpO1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmV4cG9ydCBjb25zdCBzb3J0Q2hhbmdlID0gKGdyaWQsIGNvbHVtbnMsIGNvbHVtbiwgbmV3U29ydCkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgY29uc3Qgc29ydE9yZGVyID0gbmV3U29ydCB8fCAnYXNjJztcbiAgY29uc3Qgc29ydENvbHVtbiA9IFV0aWxzLmdldENvbHVtbktleShjb2x1bW4pO1xuICBVdGlscy5zYXZlU29ydERhdGEoZ3JpZCwgeyBzb3J0Q29sdW1uLCBzb3J0T3JkZXIgfSk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TT1JUX0NIQU5HRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBzb3J0Q29sdW1uLFxuICAgIHNvcnRPcmRlcixcbiAgfSk7XG4gIGFwcGx5U29ydChncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldERhdGEgPSAoZ3JpZCwgY29sdW1ucywgZGF0YSkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgVXRpbHMuY2hlY2tDb2x1bW5zUGFyYW0oY29sdW1ucyk7XG4gIGNvbnN0IGNvbmZpZ0RhdGEgPSBVdGlscy5sb2FkR3JpZENvbmZpZyhncmlkLCBjb2x1bW5zKTtcbiAgY29uc3QgaW1tdXRhYmxlRGF0YSA9IEltbXV0YWJsZS5JdGVyYWJsZS5pc0l0ZXJhYmxlKGRhdGEpID8gZGF0YSA6IEltbXV0YWJsZS5mcm9tSlMoZGF0YSk7XG4gIGNvbnN0IHNlbGVjdGVkSXRlbXMgPSBVdGlscy5sb2FkU2VsZWN0ZWRJdGVtcyhncmlkKS5maWx0ZXIoXG4gICAgaXRlbSA9PiAhIWltbXV0YWJsZURhdGEuZmluZChkYXRhSXRlbSA9PiBkYXRhSXRlbS5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGl0ZW0pLFxuICApO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX0RBVEEsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgZGF0YTogaW1tdXRhYmxlRGF0YSxcbiAgICBjb25maWc6IGNvbmZpZ0RhdGEsXG4gICAgc2VsZWN0ZWRJdGVtcyxcbiAgfSk7XG4gIGlmICghZ3JpZC5wYWdpbmF0aW9uKSB7XG4gICAgYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gICAgYXBwbHlTb3J0KGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59O1xuXG4vKipcbiAqIEFjdGlvbiB0byBzZXQgZm9jdXMgdG8gZWl0aGVyIGxhc3QgZWRpdGVkUm93LCBjcmVhdGVkUm93IG9yIHRvIHZhbGlkYXRpb24gZXJyb3JcbiAqIEBwYXJhbSB7T2JqZWN0fSBncmlkXG4gKiBAcGFyYW0ge1N0cmluZ30gZm9jdXNUb1R5cGUgLSB0eXBlIG9mIGZvY3VzIHJlcXVlc3QuIFBvc3NpYmxlIHZhbHVlczpcbiAqICdmb2N1c1RvRWRpdENlbGwnIHx8ICdmb2N1c1RvRXJyb3JDZWxsJyB8fCAnZm9jdXNUb0NyZWF0ZUNlbGwnXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGZvY3VzVG9MYXN0Um93IC0gc2V0cyBmb2N1cyB0byBsYXN0IGRhdGEgcm93IGluc3RlYWQgb2Ygc2VsZWN0ZWQgcm93XG4gKi9cbmV4cG9ydCBjb25zdCBzZXRGb2N1c1RvID0gKGdyaWQsIGZvY3VzVG8sIGZvY3VzVG9MYXN0Um93ID0gZmFsc2UpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NFVF9GT0NVU19UTyxcbiAgICBmb2N1c1RvLFxuICAgIGZvY3VzVG9MYXN0Um93LFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBleHRlbmREYXRhID0gKGdyaWQsIGNvbHVtbnMsIGRhdGEsIHByZXBlbmQgPSBmYWxzZSkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgY29uc3QgaW1tdXRhYmxlRGF0YSA9IEltbXV0YWJsZS5JdGVyYWJsZS5pc0l0ZXJhYmxlKGRhdGEpID8gZGF0YSA6IEltbXV0YWJsZS5mcm9tSlMoZGF0YSk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9FWFRFTkRfREFUQSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBkYXRhOiBpbW11dGFibGVEYXRhLFxuICAgIHByZXBlbmQsXG4gIH0pO1xuICBhcHBseUZpbHRlcnMoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgYXBwbHlTb3J0KGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVzaXplQ29sdW1uID0gKGdyaWQsIGNvbHVtbktleSwgd2lkdGgpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGNvbnN0IGNvbHVtbldpZHRocyA9IGdldFN0YXRlKClcbiAgICAuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdjb25maWcnLCAnY29sdW1uV2lkdGhzJ10sIE1hcCgpKVxuICAgIC5zZXQoY29sdW1uS2V5LCB3aWR0aCk7XG4gIFV0aWxzLnNhdmVDb2x1bW5XaWR0aHMoZ3JpZCwgY29sdW1uV2lkdGhzKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFU0laRV9DT0xVTU4sXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgY29sdW1uV2lkdGhzLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBlZGl0ID0gZ3JpZCA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9FRElULFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBjYW5jZWwgPSBncmlkID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NBTkNFTCxcbiAgICBpZDogZ3JpZC5pZCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2F2ZSA9IChncmlkLCBjYiA9ICgpID0+IHt9KSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TQVZFLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbiAgY2IoKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzYXZlU3VjY2VzcyA9IChncmlkLCBjb2x1bW5zLCBzYXZlZEl0ZW1zKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0FWRV9TVUNDRVNTLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgc2F2ZWRJdGVtcyxcbiAgfSk7XG4gIGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICBhcHBseVNvcnQoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzYXZlUGFydGlhbFN1Y2Nlc3MgPSAoZ3JpZCwgY29sdW1ucywgc2F2ZWRJdGVtcykgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfUEFSVElBTF9TVUNDRVNTLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgc2F2ZWRJdGVtcyxcbiAgfSk7XG4gIGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICBhcHBseVNvcnQoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzYXZlRmFpbCA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0FWRV9GQUlMLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGUgPSAoZ3JpZCwgY29sdW1uRGVmYXVsdFZhbHVlcykgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGNvbHVtbkRlZmF1bHRWYWx1ZXMsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGFkZE5ld0l0ZW0gPSAoZ3JpZCwgY29sdW1uRGVmYXVsdFZhbHVlcykgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQUREX05FV19JVEVNLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGNvbHVtbkRlZmF1bHRWYWx1ZXMsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZUl0ZW0gPSAoZ3JpZCwgcm93SWQpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9JVEVNLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgcm93SWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZU5ld0l0ZW0gPSAoZ3JpZCwgaW5kZXgpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBpbmRleCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlTmV3SXRlbXMgPSAoZ3JpZCwgaW5kZXhlcykgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNUyxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBpbmRleGVzLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmUgPSAoZ3JpZCwgY2IgPSAoKSA9PiB7fSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbiAgY2IoKTtcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVTdWNjZXNzID0gKGdyaWQsIHJlbW92ZWRJZHMpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9TVUNDRVNTLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgcmVtb3ZlZElkcyxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlRmFpbCA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUwsXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGVkaXRDZWxsVmFsdWVDaGFuZ2UgPSAoZ3JpZCwgZGF0YUlkLCBrZXlQYXRoLCB2YWx1ZSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfRURJVF9DRUxMX1ZBTFVFX0NIQU5HRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBkYXRhSWQsXG4gICAga2V5UGF0aCxcbiAgICB2YWx1ZSxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZWRpdENlbGxWYWx1ZVZhbGlkYXRlID0gKGdyaWQsIGRhdGFJZCwga2V5UGF0aCwgdmFsdWUsIHZhbGlkYXRvcnMgPSBbXSkgPT4gKFxuICBkaXNwYXRjaCxcbiAgZ2V0U3RhdGUsXG4pID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGxldCB2YWxpZGF0aW9uU3RhdGUgPSB7IHZhbGlkOiB0cnVlIH07XG4gIHZhbGlkYXRvcnMuZm9yRWFjaCgodmFsaWRhdG9yKSA9PiB7XG4gICAgaWYgKHZhbGlkYXRpb25TdGF0ZS52YWxpZCkge1xuICAgICAgaWYgKHZhbGlkYXRvci51bmlxdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSAnJyB8fCB2YWx1ZSAhPT0gbnVsbCB8fCB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgLy8gY29tYmluZSByZWFsIGRhdGEgd2l0aCBjdXJyZW50IHVuc2F2ZWQgZWRpdGVkIGRhdGFcbiAgICAgICAgICBjb25zdCBncmlkRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0KGdyaWQuaWQpO1xuICAgICAgICAgIGNvbnN0IGVkaXREYXRhID0gZ3JpZERhdGEuZ2V0KCdlZGl0RGF0YScpO1xuICAgICAgICAgIGxldCBhbGxEYXRhID0gZ3JpZERhdGEuZ2V0KCdhbGxEYXRhJyk7XG4gICAgICAgICAgaWYgKGVkaXREYXRhKSB7XG4gICAgICAgICAgICBlZGl0RGF0YS5mb3JFYWNoKChlZGl0RGF0YUl0ZW0sIGVkaXREYXRhSXRlbUlkKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGZvdW5kSW5kZXggPSBhbGxEYXRhLmZpbmRJbmRleChkID0+IGQuZ2V0SW4oZ3JpZC5pZEtleVBhdGgpID09PSBlZGl0RGF0YUl0ZW1JZCk7XG4gICAgICAgICAgICAgIGlmIChmb3VuZEluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIGFsbERhdGEgPSBhbGxEYXRhLm1lcmdlRGVlcEluKFtmb3VuZEluZGV4XSwgZWRpdERhdGFJdGVtKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGRldGVybWluZSB1bmlxdWVuZXNzXG4gICAgICAgICAgY29uc3QgZmluZGluZyA9IGFsbERhdGEuZmluZCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYgKGdyaWQuaWRLZXlQYXRoLmxlbmd0aCkge1xuICAgICAgICAgICAgICAvLyBkb24ndCBzZWxmIGNvbXBhcmVcbiAgICAgICAgICAgICAgaWYgKGl0ZW0uZ2V0SW4oZ3JpZC5pZEtleVBhdGgpID09PSBkYXRhSWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpdGVtLmdldEluKGtleVBhdGgpID09PSB2YWx1ZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoZmluZGluZykge1xuICAgICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0ge1xuICAgICAgICAgICAgICB2YWxpZDogZmFsc2UsXG4gICAgICAgICAgICAgIG1lc3NhZ2U6ICdWYWxpZGF0aW9uLlVuaXF1ZScsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh2YWxpZGF0b3IudmFsaWRhdGVXaXRoUm93RGF0YSkge1xuICAgICAgICAvLyBDdXN0b20gdmFsaWRhdG9yIGZ1bmN0aW9uIHdpdGggcm93RGF0YSBhcyBwYXJhbWV0ZXJzXG4gICAgICAgIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG4gICAgICAgIGNvbnN0IGVkaXREYXRhID0gZ3JpZERhdGEuZ2V0SW4oWydlZGl0RGF0YScsIGRhdGFJZF0sIE1hcCgpKTtcbiAgICAgICAgbGV0IHJvd0RhdGEgPSBncmlkRGF0YS5nZXQoJ2FsbERhdGEnKS5maW5kKGl0ZW0gPT4gaXRlbS5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGRhdGFJZCk7XG4gICAgICAgIGlmIChyb3dEYXRhKSB7XG4gICAgICAgICAgcm93RGF0YSA9IHJvd0RhdGEubWVyZ2VEZWVwKGVkaXREYXRhKTtcbiAgICAgICAgICBjb25zdCBwYXJhbXMgPSB2YWxpZGF0b3IucGFyYW1zID8gT2JqZWN0LnZhbHVlcyh2YWxpZGF0b3IucGFyYW1zKSA6IFtdO1xuICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZVdpdGhSb3dEYXRhKHZhbHVlLCByb3dEYXRhLCAuLi5wYXJhbXMpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHZhbGlkYXRvci52YWxpZGF0ZVdpdGhHcmlkRGF0YSkge1xuICAgICAgICAvLyBDdXN0b20gdmFsaWRhdG9yIGZ1bmN0aW9uIHdpdGggcm93RGF0YSBhbmQgZ3JpZERhdGEgYXMgcGFyYW1ldGVyc1xuICAgICAgICBjb25zdCBncmlkRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0KGdyaWQuaWQpO1xuXG4gICAgICAgIGxldCBhbGxEYXRhID0gZ3JpZERhdGEuZ2V0KCdhbGxEYXRhJywgTGlzdCgpKTtcbiAgICAgICAgY29uc3QgZWRpdERhdGEgPSBncmlkRGF0YS5nZXQoJ2VkaXREYXRhJywgTWFwKCkpO1xuXG4gICAgICAgIGVkaXREYXRhLmZvckVhY2goKGVkaXRSb3csIGVkaXRLZXkpID0+IHtcbiAgICAgICAgICBjb25zdCBmb3VuZEluZGV4ID0gYWxsRGF0YS5maW5kSW5kZXgoZCA9PiBkLmdldEluKGdyaWQuaWRLZXlQYXRoKSA9PT0gZWRpdEtleSk7XG4gICAgICAgICAgaWYgKGZvdW5kSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICBhbGxEYXRhID0gYWxsRGF0YS5tZXJnZURlZXBJbihbZm91bmRJbmRleF0sIGVkaXRSb3cpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGVkaXRSb3dEYXRhID0gZWRpdERhdGEuZ2V0KGRhdGFJZCwgTWFwKCkpO1xuICAgICAgICBsZXQgcm93RGF0YSA9IGFsbERhdGEuZmluZChpdGVtID0+IGl0ZW0uZ2V0SW4oZ3JpZC5pZEtleVBhdGgpID09PSBkYXRhSWQpO1xuICAgICAgICBpZiAocm93RGF0YSkge1xuICAgICAgICAgIHJvd0RhdGEgPSByb3dEYXRhLm1lcmdlRGVlcChlZGl0Um93RGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcm93RGF0YSA9IGVkaXRSb3dEYXRhO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHZhbGlkYXRvci5wYXJhbXMgPyBPYmplY3QudmFsdWVzKHZhbGlkYXRvci5wYXJhbXMpIDogW107XG4gICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZVdpdGhHcmlkRGF0YSh2YWx1ZSwgcm93RGF0YSwgYWxsRGF0YSwgLi4ucGFyYW1zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHZhbGlkYXRvci5wYXJhbXMgPyBPYmplY3QudmFsdWVzKHZhbGlkYXRvci5wYXJhbXMpIDogW107XG4gICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZSh2YWx1ZSwgLi4ucGFyYW1zKTtcbiAgICAgICAgaWYgKHZhbGlkYXRvci5wYXJhbXMpIHtcbiAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZVZhbHVlcyA9IHZhbGlkYXRvci5wYXJhbXM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IGNlbGxNZXNzYWdlID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ2NlbGxNZXNzYWdlcycsICdlcnJvcicsIGRhdGFJZCwgLi4ua2V5UGF0aF0pO1xuICBpZiAodmFsaWRhdGlvblN0YXRlLnZhbGlkICYmIGNlbGxNZXNzYWdlICE9PSB1bmRlZmluZWQpIHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgbWVzc2FnZVR5cGU6ICdlcnJvcicsXG4gICAgICBkYXRhSWQsXG4gICAgICBrZXlQYXRoLFxuICAgIH0pO1xuICB9IGVsc2UgaWYgKCF2YWxpZGF0aW9uU3RhdGUudmFsaWQpIHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgbWVzc2FnZVR5cGU6ICdlcnJvcicsXG4gICAgICBkYXRhSWQsXG4gICAgICBrZXlQYXRoLFxuICAgICAgbWVzc2FnZUlkOiB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZSxcbiAgICAgIG1lc3NhZ2VWYWx1ZXM6IHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlVmFsdWVzLFxuICAgIH0pO1xuICB9XG4gIHJldHVybiB2YWxpZGF0aW9uU3RhdGUudmFsaWQ7XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlID0gKGdyaWQsIHJvd0luZGV4LCBrZXlQYXRoLCB2YWx1ZSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfQ0hBTkdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIHJvd0luZGV4LFxuICAgIGtleVBhdGgsXG4gICAgdmFsdWUsXG4gIH0pO1xufTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbmV4cG9ydCBjb25zdCBjcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZSA9IChncmlkLCByb3dJbmRleCwga2V5UGF0aCwgdmFsdWUsIHZhbGlkYXRvcnMgPSBbXSkgPT4gKFxuICBkaXNwYXRjaCxcbiAgZ2V0U3RhdGUsXG4pID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGxldCB2YWxpZGF0aW9uU3RhdGUgPSB7IHZhbGlkOiB0cnVlIH07XG4gIHZhbGlkYXRvcnMuZm9yRWFjaCgodmFsaWRhdG9yKSA9PiB7XG4gICAgaWYgKHZhbGlkYXRpb25TdGF0ZS52YWxpZCkge1xuICAgICAgaWYgKHZhbGlkYXRvci51bmlxdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSAnJyB8fCB2YWx1ZSAhPT0gbnVsbCB8fCB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY29uc3QgZmluZGluZyA9IGdldFN0YXRlKClcbiAgICAgICAgICAgIC5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ2FsbERhdGEnXSlcbiAgICAgICAgICAgIC5maW5kKGl0ZW0gPT4gaXRlbS5nZXRJbihrZXlQYXRoKSA9PT0gdmFsdWUpO1xuICAgICAgICAgIGlmIChmaW5kaW5nKSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB7XG4gICAgICAgICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgICAgICAgICAgbWVzc2FnZTogJ1ZhbGlkYXRpb24uVW5pcXVlJyxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGZpbmQyID0gZ2V0U3RhdGUoKVxuICAgICAgICAgICAgICAuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdjcmVhdGVEYXRhJ10pXG4gICAgICAgICAgICAgIC5maW5kKChpdGVtLCBpKSA9PiBpICE9PSByb3dJbmRleCAmJiBpdGVtLmdldEluKGtleVBhdGgpID09PSB2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoZmluZDIpIHtcbiAgICAgICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0ge1xuICAgICAgICAgICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnVmFsaWRhdGlvbi5VbmlxdWUnLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh2YWxpZGF0b3IudmFsaWRhdGVXaXRoUm93RGF0YSkge1xuICAgICAgICBjb25zdCByb3dEYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ2NyZWF0ZURhdGEnLCByb3dJbmRleF0pO1xuICAgICAgICBjb25zdCBwYXJhbXMgPSB2YWxpZGF0b3IucGFyYW1zID8gT2JqZWN0LnZhbHVlcyh2YWxpZGF0b3IucGFyYW1zKSA6IFtdO1xuICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB2YWxpZGF0b3IudmFsaWRhdGVXaXRoUm93RGF0YSh2YWx1ZSwgcm93RGF0YSwgLi4ucGFyYW1zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHZhbGlkYXRvci5wYXJhbXMgPyBPYmplY3QudmFsdWVzKHZhbGlkYXRvci5wYXJhbXMpIDogW107XG4gICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZSh2YWx1ZSwgLi4ucGFyYW1zKTtcbiAgICAgICAgaWYgKHZhbGlkYXRvci5wYXJhbXMpIHtcbiAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZVZhbHVlcyA9IHZhbGlkYXRvci5wYXJhbXM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICBjb25zdCBjcmVhdGVDZWxsTWVzc2FnZSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdjcmVhdGVDZWxsTWVzc2FnZXMnLCAnZXJyb3InLCByb3dJbmRleCwgLi4ua2V5UGF0aF0pO1xuICBpZiAodmFsaWRhdGlvblN0YXRlLnZhbGlkICYmIGNyZWF0ZUNlbGxNZXNzYWdlICE9PSB1bmRlZmluZWQpIHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9ISURFX01FU1NBR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIG1lc3NhZ2VUeXBlOiAnZXJyb3InLFxuICAgICAgcm93SW5kZXgsXG4gICAgICBrZXlQYXRoLFxuICAgIH0pO1xuICB9IGVsc2UgaWYgKCF2YWxpZGF0aW9uU3RhdGUudmFsaWQpIHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9TSE9XX01FU1NBR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIG1lc3NhZ2VUeXBlOiAnZXJyb3InLFxuICAgICAgcm93SW5kZXgsXG4gICAgICBrZXlQYXRoLFxuICAgICAgbWVzc2FnZUlkOiB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZSxcbiAgICAgIG1lc3NhZ2VWYWx1ZXM6IHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlVmFsdWVzLFxuICAgIH0pO1xuICB9XG4gIHJldHVybiB2YWxpZGF0aW9uU3RhdGUudmFsaWQ7XG59O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuZXhwb3J0IGNvbnN0IGNlbGxTaG93TWVzc2FnZSA9IChcbiAgZ3JpZCxcbiAgbWVzc2FnZVR5cGUsXG4gIGRhdGFJZCxcbiAga2V5UGF0aCxcbiAgbWVzc2FnZUlkLFxuICBtZXNzYWdlVmFsdWVzLFxuKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBtZXNzYWdlVHlwZSxcbiAgICBkYXRhSWQsXG4gICAga2V5UGF0aCxcbiAgICBtZXNzYWdlSWQsXG4gICAgbWVzc2FnZVZhbHVlcyxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgY2VsbFNob3dNZXNzYWdlcyA9IChncmlkLCBtZXNzYWdlcykgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0VTLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIG1lc3NhZ2VzLFxuICB9KTtcbn07XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG5leHBvcnQgY29uc3QgY2VsbEhpZGVNZXNzYWdlID0gKFxuICBncmlkLFxuICBtZXNzYWdlVHlwZSA9IG51bGwsXG4gIGRhdGFJZCA9IG51bGwsXG4gIGtleVBhdGggPSBudWxsLFxuKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBtZXNzYWdlVHlwZSxcbiAgICBkYXRhSWQsXG4gICAga2V5UGF0aCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQ2VsbFNob3dNZXNzYWdlID0gKFxuICBncmlkLFxuICBtZXNzYWdlVHlwZSxcbiAgcm93SW5kZXgsXG4gIGtleVBhdGgsXG4gIG1lc3NhZ2VJZCxcbiAgbWVzc2FnZVZhbHVlcyxcbikgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfU0hPV19NRVNTQUdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIG1lc3NhZ2VUeXBlLFxuICAgIHJvd0luZGV4LFxuICAgIGtleVBhdGgsXG4gICAgbWVzc2FnZUlkLFxuICAgIG1lc3NhZ2VWYWx1ZXMsXG4gIH0pO1xufTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbmV4cG9ydCBjb25zdCBjcmVhdGVDZWxsSGlkZU1lc3NhZ2UgPSAoXG4gIGdyaWQsXG4gIG1lc3NhZ2VUeXBlID0gbnVsbCxcbiAgcm93SW5kZXggPSBudWxsLFxuICBrZXlQYXRoID0gbnVsbCxcbikgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfSElERV9NRVNTQUdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIG1lc3NhZ2VUeXBlLFxuICAgIHJvd0luZGV4LFxuICAgIGtleVBhdGgsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGNlbGxTZWxlY3Rpb25DaGFuZ2UgPSAoZ3JpZCwgc2VsZWN0ZWRDZWxsID0gbnVsbCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgc2VsZWN0ZWRDZWxsLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0VMRUNUSU9OX0NIQU5HRSxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgaXRlbVNlbGVjdGlvbkNoYW5nZSA9IChncmlkLCByb3dJbmRleCwgY3RybFByZXNzZWQgPSBmYWxzZSwgc2hpZnRQcmVzc2VkID0gZmFsc2UpID0+IChcbiAgZGlzcGF0Y2gsXG4gIGdldFN0YXRlLFxuKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIHJvd0luZGV4LFxuICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgY3RybFByZXNzZWQsXG4gICAgc2hpZnRQcmVzc2VkLFxuICB9KTtcbiAgVXRpbHMuc2F2ZVNlbGVjdGVkSXRlbXMoZ3JpZCwgZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ3NlbGVjdGVkSXRlbXMnXSkpO1xufTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdEFsbEl0ZW1zQ2hhbmdlID0gZ3JpZCA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0UsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgfSk7XG4gIFV0aWxzLnNhdmVTZWxlY3RlZEl0ZW1zKGdyaWQsIGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdzZWxlY3RlZEl0ZW1zJ10pKTtcbn07XG5cbmV4cG9ydCBjb25zdCBjbGVhclNlbGVjdGVkSXRlbXMgPSBncmlkID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DTEVBUl9TRUxFQ1RFRF9JVEVNUyxcbiAgICBpZDogZ3JpZC5pZCxcbiAgfSk7XG4gIFV0aWxzLnNhdmVTZWxlY3RlZEl0ZW1zKGdyaWQsIGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdzZWxlY3RlZEl0ZW1zJ10pKTtcbn07XG5cbmV4cG9ydCBjb25zdCB0b2dnbGVGaWx0ZXJpbmcgPSBncmlkID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGNvbnN0IGlzRmlsdGVyaW5nID0gIWdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oXG4gICAgW2dyaWQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdpc0ZpbHRlcmluZyddLFxuICAgIGZhbHNlLFxuICApO1xuICBVdGlscy5zYXZlSXNGaWx0ZXJpbmcoZ3JpZCwgaXNGaWx0ZXJpbmcpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfVE9HR0xFX0ZJTFRFUklORyxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBpc0ZpbHRlcmluZyxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgdmFsaWRhdGVFZGl0ZWRSb3dzID0gKGdyaWQsIGNvbHVtbnMpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG4gIGNvbnN0IGVkaXREYXRhID0gZ3JpZERhdGEuZ2V0KCdlZGl0RGF0YScsIE1hcCgpKTtcbiAgbGV0IGFsbEdvb2QgPSB0cnVlO1xuICBlZGl0RGF0YS5mb3JFYWNoKChlZGl0RGF0YVJvdywgZGF0YUlkKSA9PiB7XG4gICAgY29sdW1ucy5mb3JFYWNoKChjb2wpID0+IHtcbiAgICAgIGxldCB2YWx1ZSA9IGVkaXREYXRhUm93LmdldEluKGNvbC52YWx1ZUtleVBhdGgpO1xuICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsdWUgPSBncmlkRGF0YVxuICAgICAgICAgIC5nZXQoJ2FsbERhdGEnKVxuICAgICAgICAgIC5maW5kKGRhdGEgPT4gZGF0YS5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGRhdGFJZClcbiAgICAgICAgICAuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG4gICAgICB9XG4gICAgICBjb25zdCBpc1ZhbGlkID0gZWRpdENlbGxWYWx1ZVZhbGlkYXRlKGdyaWQsIGRhdGFJZCwgY29sLnZhbHVlS2V5UGF0aCwgdmFsdWUsIGNvbC52YWxpZGF0b3JzKShcbiAgICAgICAgZGlzcGF0Y2gsXG4gICAgICAgIGdldFN0YXRlLFxuICAgICAgKTtcbiAgICAgIGlmIChhbGxHb29kICYmICFpc1ZhbGlkKSB7XG4gICAgICAgIGFsbEdvb2QgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBhbGxHb29kO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZUVtcHR5Q3JlYXRlZFJvd3MgPSAoZ3JpZCwgY29sdW1ucykgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgY29uc3QgY3JlYXRlRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdjcmVhdGVEYXRhJ10sIE1hcCgpKTtcbiAgY29uc3QgaW5kZXhlcyA9IFtdO1xuICBjcmVhdGVEYXRhLmZvckVhY2goKGNyZWF0ZURhdGFSb3csIHJvd0luZGV4KSA9PiB7XG4gICAgbGV0IGlzRW1wdHkgPSB0cnVlO1xuICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGNyZWF0ZURhdGFSb3cuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG4gICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gJycgJiYgdmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgaXNFbXB0eSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChpc0VtcHR5KSB7XG4gICAgICBpbmRleGVzLnB1c2gocm93SW5kZXgpO1xuICAgIH1cbiAgfSk7XG4gIGlmIChpbmRleGVzLmxlbmd0aCA+IDApIHtcbiAgICByZW1vdmVOZXdJdGVtcyhncmlkLCBpbmRleGVzKShkaXNwYXRjaCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUNyZWF0ZWRSb3dzID0gKGdyaWQsIGNvbHVtbnMpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIHJlbW92ZUVtcHR5Q3JlYXRlZFJvd3MoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgY29uc3QgY3JlYXRlRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdjcmVhdGVEYXRhJ10sIE1hcCgpKTtcbiAgbGV0IGFsbEdvb2QgPSB0cnVlO1xuICBjcmVhdGVEYXRhLmZvckVhY2goKGNyZWF0ZURhdGFSb3csIHJvd0luZGV4KSA9PiB7XG4gICAgY29sdW1ucy5mb3JFYWNoKChjb2wpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gY3JlYXRlRGF0YVJvdy5nZXRJbihjb2wudmFsdWVLZXlQYXRoKTtcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSBjcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZShcbiAgICAgICAgZ3JpZCxcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIGNvbC52YWx1ZUtleVBhdGgsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBjb2wudmFsaWRhdG9ycyxcbiAgICAgICkoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgICAgIGlmIChhbGxHb29kICYmICFpc1ZhbGlkKSB7XG4gICAgICAgIGFsbEdvb2QgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBhbGxHb29kO1xufTtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZUV4aXN0aW5nQ2VsbFZhbHVlID0gKGdyaWQsIGRhdGFJZCwga2V5UGF0aCwgdmFsdWUpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1VQREFURV9FWElTVElOR19DRUxMX1ZBTFVFLFxuICAgIGdyaWQsXG4gICAgZGF0YUlkLFxuICAgIGtleVBhdGgsXG4gICAgdmFsdWUsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldEVkaXREYXRhID0gKGdyaWQsIGRhdGEsIGNlbGxNZXNzYWdlcyA9IE1hcCgpKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICBkYXRhLFxuICAgIGNlbGxNZXNzYWdlcyxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfRURJVF9EQVRBLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBvcGVuQ29sdW1uU2V0dGluZ3NNb2RhbCA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX09QRU4sXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbCA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX0NMT1NFLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzYXZlQ29sdW1uU2V0dGluZ3MgPSAoZ3JpZCwgaGlkZGVuQ29sdW1ucywgY29sdW1uT3JkZXIpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgVXRpbHMuc2F2ZUNvbHVtblNldHRpbmdzKGdyaWQsIGhpZGRlbkNvbHVtbnMsIGNvbHVtbk9yZGVyKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGNvbHVtbk9yZGVyLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXRQYWdlID0gKGdyaWQsIHBhZ2UpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5zYXZlUGFnZShncmlkLCBwYWdlKTtcbiAgZGlzcGF0Y2goe1xuICAgIHBhZ2UsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX1BBR0UsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldFJvd3NPblBhZ2UgPSAoZ3JpZCwgcm93c09uUGFnZSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLnNhdmVSb3dzT25QYWdlKGdyaWQsIHJvd3NPblBhZ2UpO1xuICBkaXNwYXRjaCh7XG4gICAgcm93c09uUGFnZSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfUk9XU19PTl9QQUdFLFxuICB9KTtcbn07XG4iXX0=