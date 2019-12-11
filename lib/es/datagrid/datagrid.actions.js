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
export var setData = function setData(grid, columns, data, isEditing, isCreating) {
  if (isEditing === void 0) {
    isEditing = false;
  }

  if (isCreating === void 0) {
    isCreating = false;
  }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5hY3Rpb25zLmpzIl0sIm5hbWVzIjpbIkltbXV0YWJsZSIsIk1hcCIsIkxpc3QiLCJVdGlscyIsIlRZUEVTIiwiUExBVEZPUk1fREFUQUdSSURfSU5WQUxJREFURSIsIlBMQVRGT1JNX0RBVEFHUklEX0JVU1kiLCJQTEFURk9STV9EQVRBR1JJRF9SRUFEWSIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9EQVRBIiwiUExBVEZPUk1fREFUQUdSSURfQVBQTFlfU09SVCIsIlBMQVRGT1JNX0RBVEFHUklEX1NPUlRfQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfUkVTSVpFX0NPTFVNTiIsIlBMQVRGT1JNX0RBVEFHUklEX0VESVQiLCJQTEFURk9STV9EQVRBR1JJRF9DQU5DRUwiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFIiwiUExBVEZPUk1fREFUQUdSSURfRVhURU5EX0RBVEEiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFX1NVQ0NFU1MiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFX1BBUlRJQUxfU1VDQ0VTUyIsIlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfRkFJTCIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURSIsIlBMQVRGT1JNX0RBVEFHUklEX0FERF9ORVdfSVRFTSIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9JVEVNIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNUyIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRSIsIlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9TVUNDRVNTIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUwiLCJQTEFURk9STV9EQVRBR1JJRF9FRElUX0NFTExfVkFMVUVfQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0UiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRVMiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX0hJREVfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX0NIQU5HRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX1ZBTElEQVRFIiwiUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TRUxFQ1RJT05fQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFIiwiUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9DTEVBUl9TRUxFQ1RFRF9JVEVNUyIsIlBMQVRGT1JNX0RBVEFHUklEX1RPR0dMRV9GSUxURVJJTkciLCJQTEFURk9STV9EQVRBR1JJRF9GSUxURVJfREFUQV9DSEFOR0UiLCJQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9GSUxURVJTIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX0ZJTFRFUlMiLCJQTEFURk9STV9EQVRBR1JJRF9VUERBVEVfRVhJU1RJTkdfQ0VMTF9WQUxVRSIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9FRElUX0RBVEEiLCJQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfT1BFTiIsIlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFIiwiUExBVEZPUk1fREFUQUdSSURfRk9SQ0VfUkVGUkVTSCIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9GT0NVU19UTyIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9QQUdFIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX1JPV1NfT05fUEFHRSIsImludmFsaWRhdGUiLCJncmlkIiwiZGlzcGF0Y2giLCJjaGVja0dyaWRQYXJhbSIsInR5cGUiLCJpZCIsImZvcmNlUmVmcmVzaCIsInNldFRpbWVvdXQiLCJkb2N1bWVudCIsImNyZWF0ZUV2ZW50IiwiZXZ0IiwiaW5pdEV2ZW50Iiwid2luZG93IiwiZGlzcGF0Y2hFdmVudCIsInNldEJ1c3kiLCJzZXRSZWFkeSIsImFwcGx5RmlsdGVycyIsImNvbHVtbnMiLCJnZXRTdGF0ZSIsImZvckVhY2giLCJncmlkRGF0YSIsImRhdGFncmlkIiwiZ2V0IiwiZmlsdGVyRGF0YSIsImdldEluIiwiYWxsRGF0YSIsImRhdGEiLCJwYWdpbmF0aW9uIiwiaXNFbXB0eSIsImRhdGVGb3JtYXQiLCJnZXREYXRlRm9ybWF0IiwidXNlciIsImZpbHRlciIsInJvdyIsImhpdHMiLCJmaWx0ZXJWYWx1ZSIsImZpbHRlckNvbHVtbiIsImNvbHVtbiIsImdldENvbHVtbktleSIsInZhbHVlIiwidmFsdWVLZXlQYXRoIiwiZmlsdGVyTWF0Y2hlciIsImdldEZpbHRlck1hdGNoZXIiLCJzaXplIiwic2V0QW5kQXBwbHlGaWx0ZXJzIiwiZmlsdGVyaW5nRGF0YSIsIm5vcm1hbGl6ZUZpbHRlcmluZ0RhdGEiLCJzYXZlRmlsdGVyRGF0YSIsImZpbHRlckNlbGxWYWx1ZUNoYW5nZSIsIm9yaWdGaWx0ZXJEYXRhIiwiY29sdW1uS2V5IiwidmFsdWVFbXB0eUNoZWNrZXIiLCJnZXRWYWx1ZUVtcHR5Q2hlY2tlciIsInNldCIsInRvSlMiLCJhcHBseVNvcnQiLCJzb3J0RGF0YSIsInNvcnRDb2x1bW4iLCJzb3J0T3JkZXIiLCJjb2wiLCJvcmlnQWxsRGF0YSIsImNvbXBhcmF0b3IiLCJnZXRTb3J0Q29tcGFyYXRvciIsInZhbHVlR2V0dGVyIiwiZ2V0U29ydFZhbHVlR2V0dGVyIiwic29ydCIsImEiLCJiIiwidmFsQSIsInZhbEIiLCJzb3J0Q2hhbmdlIiwibmV3U29ydCIsInNhdmVTb3J0RGF0YSIsInNldERhdGEiLCJpc0VkaXRpbmciLCJpc0NyZWF0aW5nIiwiY2hlY2tDb2x1bW5zUGFyYW0iLCJjb25maWdEYXRhIiwibG9hZEdyaWRDb25maWciLCJpbW11dGFibGVEYXRhIiwiSXRlcmFibGUiLCJpc0l0ZXJhYmxlIiwiZnJvbUpTIiwic2VsZWN0ZWRJdGVtcyIsImxvYWRTZWxlY3RlZEl0ZW1zIiwiaXRlbSIsImZpbmQiLCJkYXRhSXRlbSIsImlkS2V5UGF0aCIsImNvbmZpZyIsInNldEZvY3VzVG8iLCJmb2N1c1RvIiwiZm9jdXNUb0xhc3RSb3ciLCJleHRlbmREYXRhIiwicHJlcGVuZCIsInJlc2l6ZUNvbHVtbiIsIndpZHRoIiwiY29sdW1uV2lkdGhzIiwic2F2ZUNvbHVtbldpZHRocyIsImVkaXQiLCJjYW5jZWwiLCJzYXZlIiwiY2IiLCJzYXZlU3VjY2VzcyIsInNhdmVkSXRlbXMiLCJzYXZlUGFydGlhbFN1Y2Nlc3MiLCJzYXZlRmFpbCIsImNyZWF0ZSIsImNvbHVtbkRlZmF1bHRWYWx1ZXMiLCJhZGROZXdJdGVtIiwicmVtb3ZlSXRlbSIsInJvd0lkIiwicmVtb3ZlTmV3SXRlbSIsImluZGV4IiwicmVtb3ZlTmV3SXRlbXMiLCJpbmRleGVzIiwicmVtb3ZlIiwicmVtb3ZlU3VjY2VzcyIsInJlbW92ZWRJZHMiLCJyZW1vdmVGYWlsIiwiZWRpdENlbGxWYWx1ZUNoYW5nZSIsImRhdGFJZCIsImtleVBhdGgiLCJlZGl0Q2VsbFZhbHVlVmFsaWRhdGUiLCJ2YWxpZGF0b3JzIiwidmFsaWRhdGlvblN0YXRlIiwidmFsaWQiLCJ2YWxpZGF0b3IiLCJ1bmlxdWUiLCJ1bmRlZmluZWQiLCJlZGl0RGF0YSIsImVkaXREYXRhSXRlbSIsImVkaXREYXRhSXRlbUlkIiwiZm91bmRJbmRleCIsImZpbmRJbmRleCIsImQiLCJtZXJnZURlZXBJbiIsImZpbmRpbmciLCJsZW5ndGgiLCJtZXNzYWdlIiwidmFsaWRhdGVXaXRoUm93RGF0YSIsInJvd0RhdGEiLCJtZXJnZURlZXAiLCJwYXJhbXMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJ2YWxpZGF0ZVdpdGhHcmlkRGF0YSIsImVkaXRSb3ciLCJlZGl0S2V5IiwiZWRpdFJvd0RhdGEiLCJ2YWxpZGF0ZSIsIm1lc3NhZ2VWYWx1ZXMiLCJjZWxsTWVzc2FnZSIsIm1lc3NhZ2VUeXBlIiwibWVzc2FnZUlkIiwiY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlIiwicm93SW5kZXgiLCJjcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZSIsImZpbmQyIiwiaSIsImNyZWF0ZUNlbGxNZXNzYWdlIiwiY2VsbFNob3dNZXNzYWdlIiwiY2VsbFNob3dNZXNzYWdlcyIsIm1lc3NhZ2VzIiwiY2VsbEhpZGVNZXNzYWdlIiwiY3JlYXRlQ2VsbFNob3dNZXNzYWdlIiwiY3JlYXRlQ2VsbEhpZGVNZXNzYWdlIiwiY2VsbFNlbGVjdGlvbkNoYW5nZSIsInNlbGVjdGVkQ2VsbCIsIml0ZW1TZWxlY3Rpb25DaGFuZ2UiLCJjdHJsUHJlc3NlZCIsInNoaWZ0UHJlc3NlZCIsInNhdmVTZWxlY3RlZEl0ZW1zIiwic2VsZWN0QWxsSXRlbXNDaGFuZ2UiLCJjbGVhclNlbGVjdGVkSXRlbXMiLCJ0b2dnbGVGaWx0ZXJpbmciLCJpc0ZpbHRlcmluZyIsInNhdmVJc0ZpbHRlcmluZyIsInZhbGlkYXRlRWRpdGVkUm93cyIsImFsbEdvb2QiLCJlZGl0RGF0YVJvdyIsImlzVmFsaWQiLCJyZW1vdmVFbXB0eUNyZWF0ZWRSb3dzIiwiY3JlYXRlRGF0YSIsImNyZWF0ZURhdGFSb3ciLCJwdXNoIiwidmFsaWRhdGVDcmVhdGVkUm93cyIsInVwZGF0ZUV4aXN0aW5nQ2VsbFZhbHVlIiwic2V0RWRpdERhdGEiLCJjZWxsTWVzc2FnZXMiLCJvcGVuQ29sdW1uU2V0dGluZ3NNb2RhbCIsImNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbCIsInNhdmVDb2x1bW5TZXR0aW5ncyIsImhpZGRlbkNvbHVtbnMiLCJjb2x1bW5PcmRlciIsInNldFBhZ2UiLCJwYWdlIiwic2F2ZVBhZ2UiLCJzZXRSb3dzT25QYWdlIiwicm93c09uUGFnZSIsInNhdmVSb3dzT25QYWdlIl0sIm1h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QixVQUFDbE0sUUFBRCxFQUFjO0FBQ25EbkQsSUFBQUEsS0FBSyxDQUFDc1AsUUFBTixDQUFlcE0sSUFBZixFQUFxQm1NLElBQXJCO0FBQ0FsTSxJQUFBQSxRQUFRLENBQUM7QUFDUGtNLE1BQUFBLElBQUksRUFBSkEsSUFETztBQUVQL0wsTUFBQUEsRUFBRSxFQUFFSixJQUFJLENBQUNJLEVBRkY7QUFHUEQsTUFBQUEsSUFBSSxFQUFFcEQsS0FBSyxDQUFDOEM7QUFITCxLQUFELENBQVI7QUFLRCxHQVBzQjtBQUFBLENBQWhCO0FBU1AsT0FBTyxJQUFNd00sYUFBYSxHQUFHLFNBQWhCQSxhQUFnQixDQUFDck0sSUFBRCxFQUFPc00sVUFBUDtBQUFBLFNBQXNCLFVBQUNyTSxRQUFELEVBQWM7QUFDL0RuRCxJQUFBQSxLQUFLLENBQUN5UCxjQUFOLENBQXFCdk0sSUFBckIsRUFBMkJzTSxVQUEzQjtBQUNBck0sSUFBQUEsUUFBUSxDQUFDO0FBQ1BxTSxNQUFBQSxVQUFVLEVBQVZBLFVBRE87QUFFUGxNLE1BQUFBLEVBQUUsRUFBRUosSUFBSSxDQUFDSSxFQUZGO0FBR1BELE1BQUFBLElBQUksRUFBRXBELEtBQUssQ0FBQytDO0FBSEwsS0FBRCxDQUFSO0FBS0QsR0FQNEI7QUFBQSxDQUF0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJbW11dGFibGUsIHsgTWFwLCBMaXN0IH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCBVdGlscyBmcm9tICcuL2RhdGFncmlkLnV0aWxzJztcblxuZXhwb3J0IGNvbnN0IFRZUEVTID0ge1xuICBQTEFURk9STV9EQVRBR1JJRF9JTlZBTElEQVRFOiAnUExBVEZPUk1fREFUQUdSSURfSU5WQUxJREFURScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0JVU1k6ICdQTEFURk9STV9EQVRBR1JJRF9CVVNZJyxcbiAgUExBVEZPUk1fREFUQUdSSURfUkVBRFk6ICdQTEFURk9STV9EQVRBR1JJRF9SRUFEWScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NFVF9EQVRBOiAnUExBVEZPUk1fREFUQUdSSURfU0VUX0RBVEEnLFxuICBQTEFURk9STV9EQVRBR1JJRF9BUFBMWV9TT1JUOiAnUExBVEZPUk1fREFUQUdSSURfQVBQTFlfU09SVCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NPUlRfQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfU09SVF9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRVNJWkVfQ09MVU1OOiAnUExBVEZPUk1fREFUQUdSSURfUkVTSVpFX0NPTFVNTicsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0VESVQ6ICdQTEFURk9STV9EQVRBR1JJRF9FRElUJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0FOQ0VMOiAnUExBVEZPUk1fREFUQUdSSURfQ0FOQ0VMJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0FWRTogJ1BMQVRGT1JNX0RBVEFHUklEX1NBVkUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9FWFRFTkRfREFUQTogJ1BMQVRGT1JNX0RBVEFHUklEX0VYVEVORF9EQVRBJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0FWRV9TVUNDRVNTOiAnUExBVEZPUk1fREFUQUdSSURfU0FWRV9TVUNDRVNTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfU0FWRV9QQVJUSUFMX1NVQ0NFU1M6ICdQTEFURk9STV9EQVRBR1JJRF9TQVZFX1BBUlRJQUxfU1VDQ0VTUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NBVkVfRkFJTDogJ1BMQVRGT1JNX0RBVEFHUklEX1NBVkVfRkFJTCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NSRUFURTogJ1BMQVRGT1JNX0RBVEFHUklEX0NSRUFURScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0FERF9ORVdfSVRFTTogJ1BMQVRGT1JNX0RBVEFHUklEX0FERF9ORVdfSVRFTScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9JVEVNOiAnUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0lURU0nLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU06ICdQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU0nLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU1TOiAnUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRTogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9TVUNDRVNTOiAnUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX1NVQ0NFU1MnLFxuICBQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfRkFJTDogJ1BMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9GQUlMJyxcbiAgUExBVEZPUk1fREFUQUdSSURfRURJVF9DRUxMX1ZBTFVFX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX0VESVRfQ0VMTF9WQUxVRV9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0VTOiAnUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0VTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0VMTF9ISURFX01FU1NBR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX0hJREVfTUVTU0FHRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX0hJREVfTUVTU0FHRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX0NIQU5HRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX1ZBTElEQVRFOiAnUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfVkFMSURBVEUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NFTEVDVElPTl9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NFTEVDVElPTl9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9JVEVNX1NFTEVDVElPTl9DSEFOR0U6ICdQTEFURk9STV9EQVRBR1JJRF9JVEVNX1NFTEVDVElPTl9DSEFOR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRUxFQ1RfQUxMX0lURU1TX0NIQU5HRTogJ1BMQVRGT1JNX0RBVEFHUklEX1NFTEVDVF9BTExfSVRFTVNfQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ0xFQVJfU0VMRUNURURfSVRFTVM6ICdQTEFURk9STV9EQVRBR1JJRF9DTEVBUl9TRUxFQ1RFRF9JVEVNUycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1RPR0dMRV9GSUxURVJJTkc6ICdQTEFURk9STV9EQVRBR1JJRF9UT0dHTEVfRklMVEVSSU5HJyxcbiAgUExBVEZPUk1fREFUQUdSSURfRklMVEVSX0RBVEFfQ0hBTkdFOiAnUExBVEZPUk1fREFUQUdSSURfRklMVEVSX0RBVEFfQ0hBTkdFJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQVBQTFlfRklMVEVSUzogJ1BMQVRGT1JNX0RBVEFHUklEX0FQUExZX0ZJTFRFUlMnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRVRfRklMVEVSUzogJ1BMQVRGT1JNX0RBVEFHUklEX1NFVF9GSUxURVJTJyxcbiAgUExBVEZPUk1fREFUQUdSSURfVVBEQVRFX0VYSVNUSU5HX0NFTExfVkFMVUU6ICdQTEFURk9STV9EQVRBR1JJRF9VUERBVEVfRVhJU1RJTkdfQ0VMTF9WQUxVRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NFVF9FRElUX0RBVEE6ICdQTEFURk9STV9EQVRBR1JJRF9TRVRfRURJVF9EQVRBJyxcbiAgUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX09QRU46ICdQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfT1BFTicsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRTogJ1BMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRScsXG4gIFBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFOiAnUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX1NBVkUnLFxuICBQTEFURk9STV9EQVRBR1JJRF9GT1JDRV9SRUZSRVNIOiAnUExBVEZPUk1fREFUQUdSSURfRk9SQ0VfUkVGUkVTSCcsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NFVF9GT0NVU19UTzogJ1BMQVRGT1JNX0RBVEFHUklEX1NFVF9GT0NVU19UTycsXG4gIFBMQVRGT1JNX0RBVEFHUklEX1NFVF9QQUdFOiAnUExBVEZPUk1fREFUQUdSSURfU0VUX1BBR0UnLFxuICBQTEFURk9STV9EQVRBR1JJRF9TRVRfUk9XU19PTl9QQUdFOiAnUExBVEZPUk1fREFUQUdSSURfU0VUX1JPV1NfT05fUEFHRScsXG59O1xuXG5leHBvcnQgY29uc3QgaW52YWxpZGF0ZSA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfSU5WQUxJREFURSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZm9yY2VSZWZyZXNoID0gKCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIC8vIEZpcmUgcmVzaXplIGV2ZW50IHRvIHJlY2FsY3VsYXRlIGNvbXBvbmVudCBzaXplc1xuICAvLyBhbmQgdG8gZm9yY2UgcmVkcmF3IGFsbCBtb3VudGVkIGdyaWRzXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGlmIChkb2N1bWVudC5jcmVhdGVFdmVudCkge1xuICAgICAgY29uc3QgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKTtcbiAgICAgIGV2dC5pbml0RXZlbnQoJ3Jlc2l6ZScsIHRydWUsIGZhbHNlKTtcbiAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gICAgfVxuICB9LCAxKTtcbiAgZGlzcGF0Y2goeyB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9GT1JDRV9SRUZSRVNIIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldEJ1c3kgPSBncmlkID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0JVU1ksXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldFJlYWR5ID0gZ3JpZCA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRUFEWSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgYXBwbHlGaWx0ZXJzID0gKGdyaWQsIGNvbHVtbnMpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGlmICghY29sdW1ucyB8fCAhY29sdW1ucy5mb3JFYWNoKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG4gIGlmICghZ3JpZERhdGEpIHJldHVybiBmYWxzZTtcbiAgY29uc3QgZmlsdGVyRGF0YSA9IGdyaWREYXRhLmdldEluKFsnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnZmlsdGVyRGF0YSddLCBNYXAoKSk7XG4gIGNvbnN0IGFsbERhdGEgPSBncmlkRGF0YS5nZXQoJ2FsbERhdGEnKTtcbiAgbGV0IGRhdGE7XG4gIGlmIChncmlkLnBhZ2luYXRpb24pIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBzZXRCdXN5KGdyaWQpKGRpc3BhdGNoKTtcbiAgaWYgKGZpbHRlckRhdGEuaXNFbXB0eSgpKSB7XG4gICAgZGF0YSA9IGFsbERhdGE7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZGF0ZUZvcm1hdCA9IFV0aWxzLmdldERhdGVGb3JtYXQoZ3JpZCwgZ2V0U3RhdGUoKS51c2VyKTtcbiAgICBkYXRhID0gYWxsRGF0YS5maWx0ZXIoKHJvdykgPT4ge1xuICAgICAgbGV0IGhpdHMgPSAwO1xuICAgICAgZmlsdGVyRGF0YS5mb3JFYWNoKChmaWx0ZXJWYWx1ZSwgZmlsdGVyQ29sdW1uKSA9PiB7XG4gICAgICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sdW1uKSA9PiB7XG4gICAgICAgICAgaWYgKFV0aWxzLmdldENvbHVtbktleShjb2x1bW4pID09PSBmaWx0ZXJDb2x1bW4pIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gcm93LmdldEluKGNvbHVtbi52YWx1ZUtleVBhdGgpO1xuICAgICAgICAgICAgaWYgKHZhbHVlIHx8IHZhbHVlID09PSAwIHx8IHZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJNYXRjaGVyID0gVXRpbHMuZ2V0RmlsdGVyTWF0Y2hlcihjb2x1bW4sIGRhdGVGb3JtYXQpO1xuICAgICAgICAgICAgICBpZiAoZmlsdGVyTWF0Y2hlcihyb3csIGZpbHRlclZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGhpdHMgKz0gMTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBoaXRzID09PSBmaWx0ZXJEYXRhLnNpemU7XG4gICAgfSk7XG4gIH1cbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0FQUExZX0ZJTFRFUlMsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgZGF0YSxcbiAgfSk7XG4gIHNldFJlYWR5KGdyaWQpKGRpc3BhdGNoKTtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0QW5kQXBwbHlGaWx0ZXJzID0gKGdyaWQsIGNvbHVtbnMsIGRhdGEpID0+IChkaXNwYXRjaCkgPT4ge1xuICBjb25zdCBmaWx0ZXJpbmdEYXRhID0gVXRpbHMubm9ybWFsaXplRmlsdGVyaW5nRGF0YShkYXRhKTtcbiAgVXRpbHMuc2F2ZUZpbHRlckRhdGEoZ3JpZCwgZmlsdGVyaW5nRGF0YS5nZXQoJ2ZpbHRlckRhdGEnKSk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfRklMVEVSUyxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBmaWx0ZXJpbmdEYXRhLFxuICB9KTtcbiAgZGlzcGF0Y2goYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKTtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5leHBvcnQgY29uc3QgZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlID0gKGdyaWQsIGNvbHVtbnMsIGNvbHVtbiwgdmFsdWUpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGNvbnN0IG9yaWdGaWx0ZXJEYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihcbiAgICBbZ3JpZC5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2ZpbHRlckRhdGEnXSxcbiAgICBNYXAoKSxcbiAgKTtcbiAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbHVtbik7XG4gIGNvbnN0IHZhbHVlRW1wdHlDaGVja2VyID0gVXRpbHMuZ2V0VmFsdWVFbXB0eUNoZWNrZXIoY29sdW1uKTtcbiAgbGV0IGZpbHRlckRhdGE7XG4gIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWx1ZSkpIHtcbiAgICBmaWx0ZXJEYXRhID0gb3JpZ0ZpbHRlckRhdGEuZGVsZXRlKGNvbHVtbktleSk7XG4gIH0gZWxzZSB7XG4gICAgZmlsdGVyRGF0YSA9IG9yaWdGaWx0ZXJEYXRhLnNldChjb2x1bW5LZXksIHZhbHVlKTtcbiAgfVxuICBVdGlscy5zYXZlRmlsdGVyRGF0YShncmlkLCBmaWx0ZXJEYXRhKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0ZJTFRFUl9EQVRBX0NIQU5HRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICAvLyBUaGUgZmlsdGVyRGF0YSBtaWdodCBoYXZlIHByb3BlcnR5LCB3aGljaCB2YWx1ZSBpcyBhcnJheSAodGhpcyBoYXBwZW5zIHdoZW4gbG9hZGVkIGZyb21cbiAgICAvLyBzZXNzaW9uIHN0b3JhZ2UpLiBJbiBvcmRlciB0byBhbGxvdyBuZXN0ZWQgY29udmVydGlvbiBvZiBmaWx0ZXJEYXRhIGFuZCBhcnJheSB0eXBlIG9mXG4gICAgLy8gcHJvcGVydHkgdG8gYmUgY29udmVydGVkIHRvIGltbXV0YWJsZSBsaXN0LCB0aGUgZmlsdGVyRGF0YSBtdXN0IGJlIG9iamVjdCBpbnN0ZWFkIG9mIG1hcC5cbiAgICBmaWx0ZXJEYXRhOiBmaWx0ZXJEYXRhLnRvSlMoKSxcbiAgfSk7XG4gIGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xufTtcblxuZXhwb3J0IGNvbnN0IGFwcGx5U29ydCA9IChncmlkLCBjb2x1bW5zKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBpZiAoIWNvbHVtbnMgfHwgIWNvbHVtbnMuZm9yRWFjaCkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBncmlkRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0KGdyaWQuaWQpO1xuICBpZiAoIWdyaWREYXRhKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IHNvcnREYXRhID0gZ3JpZERhdGEuZ2V0SW4oWydjb25maWcnLCAnc29ydGluZ0RhdGEnXSk7XG4gIGlmICghc29ydERhdGEpIHJldHVybiBmYWxzZTtcbiAgY29uc3Qgc29ydENvbHVtbiA9IHNvcnREYXRhLmdldCgnc29ydENvbHVtbicpO1xuICBpZiAoIXNvcnRDb2x1bW4pIHJldHVybiBmYWxzZTtcbiAgY29uc3Qgc29ydE9yZGVyID0gc29ydERhdGEuZ2V0KCdzb3J0T3JkZXInLCAnYXNjJyk7XG4gIGxldCBjb2x1bW47XG4gIGNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgaWYgKFV0aWxzLmdldENvbHVtbktleShjb2wpID09PSBzb3J0Q29sdW1uKSB7XG4gICAgICBjb2x1bW4gPSBjb2w7XG4gICAgfVxuICB9KTtcbiAgaWYgKCFjb2x1bW4pIHJldHVybiBmYWxzZTtcblxuICBpZiAoZ3JpZC5wYWdpbmF0aW9uKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBzZXRCdXN5KGdyaWQpKGRpc3BhdGNoKTtcbiAgY29uc3Qgb3JpZ0FsbERhdGEgPSBncmlkRGF0YS5nZXQoJ2FsbERhdGEnKTtcbiAgY29uc3QgY29tcGFyYXRvciA9IFV0aWxzLmdldFNvcnRDb21wYXJhdG9yKGNvbHVtbik7XG4gIGNvbnN0IHZhbHVlR2V0dGVyID0gVXRpbHMuZ2V0U29ydFZhbHVlR2V0dGVyKGNvbHVtbik7XG4gIGNvbnN0IHZhbHVlRW1wdHlDaGVja2VyID0gVXRpbHMuZ2V0VmFsdWVFbXB0eUNoZWNrZXIoY29sdW1uKTtcbiAgY29uc3QgYWxsRGF0YSA9IG9yaWdBbGxEYXRhLnNvcnQoKGEsIGIpID0+IHtcbiAgICBjb25zdCB2YWxBID0gdmFsdWVHZXR0ZXIoYSk7XG4gICAgY29uc3QgdmFsQiA9IHZhbHVlR2V0dGVyKGIpO1xuICAgIGlmIChzb3J0T3JkZXIgPT09ICdhc2MnKSB7XG4gICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQSkpIHJldHVybiAtMTtcbiAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWxCKSkgcmV0dXJuIDE7XG4gICAgICByZXR1cm4gY29tcGFyYXRvcih2YWxBLCB2YWxCKTtcbiAgICB9XG4gICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEEpKSByZXR1cm4gMTtcbiAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQikpIHJldHVybiAtMTtcbiAgICByZXR1cm4gY29tcGFyYXRvcih2YWxCLCB2YWxBKTtcbiAgfSk7XG4gIGxldCBkYXRhO1xuICAvLyBTb3J0IGFsc28gZmlsdGVyZWQgZGF0YSBzZXBhcmF0ZWx5XG4gIGlmIChncmlkRGF0YS5nZXRJbihbJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2lzRmlsdGVyaW5nJ10sIGZhbHNlKSkge1xuICAgIGRhdGEgPSBncmlkRGF0YS5nZXQoJ2RhdGEnKS5zb3J0KChhLCBiKSA9PiB7XG4gICAgICBjb25zdCB2YWxBID0gdmFsdWVHZXR0ZXIoYSk7XG4gICAgICBjb25zdCB2YWxCID0gdmFsdWVHZXR0ZXIoYik7XG4gICAgICBpZiAoc29ydE9yZGVyID09PSAnYXNjJykge1xuICAgICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQSkpIHJldHVybiAtMTtcbiAgICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEIpKSByZXR1cm4gMTtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmF0b3IodmFsQSwgdmFsQik7XG4gICAgICB9XG4gICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsQSkpIHJldHVybiAxO1xuICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbEIpKSByZXR1cm4gLTE7XG4gICAgICByZXR1cm4gY29tcGFyYXRvcih2YWxCLCB2YWxBKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBkYXRhID0gYWxsRGF0YTtcbiAgfVxuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQVBQTFlfU09SVCxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBkYXRhLFxuICAgIGFsbERhdGEsXG4gIH0pO1xuICBzZXRSZWFkeShncmlkKShkaXNwYXRjaCk7XG4gIHJldHVybiB0cnVlO1xufTtcblxuZXhwb3J0IGNvbnN0IHNvcnRDaGFuZ2UgPSAoZ3JpZCwgY29sdW1ucywgY29sdW1uLCBuZXdTb3J0KSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBjb25zdCBzb3J0T3JkZXIgPSBuZXdTb3J0IHx8ICdhc2MnO1xuICBjb25zdCBzb3J0Q29sdW1uID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbHVtbik7XG4gIFV0aWxzLnNhdmVTb3J0RGF0YShncmlkLCB7IHNvcnRDb2x1bW4sIHNvcnRPcmRlciB9KTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NPUlRfQ0hBTkdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIHNvcnRDb2x1bW4sXG4gICAgc29ydE9yZGVyLFxuICB9KTtcbiAgYXBwbHlTb3J0KGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0RGF0YSA9IChcbiAgZ3JpZCxcbiAgY29sdW1ucyxcbiAgZGF0YSxcbiAgaXNFZGl0aW5nID0gZmFsc2UsXG4gIGlzQ3JlYXRpbmcgPSBmYWxzZSxcbikgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgVXRpbHMuY2hlY2tDb2x1bW5zUGFyYW0oY29sdW1ucyk7XG4gIGNvbnN0IGNvbmZpZ0RhdGEgPSBVdGlscy5sb2FkR3JpZENvbmZpZyhncmlkLCBjb2x1bW5zKTtcbiAgY29uc3QgaW1tdXRhYmxlRGF0YSA9IEltbXV0YWJsZS5JdGVyYWJsZS5pc0l0ZXJhYmxlKGRhdGEpID8gZGF0YSA6IEltbXV0YWJsZS5mcm9tSlMoZGF0YSk7XG4gIGNvbnN0IHNlbGVjdGVkSXRlbXMgPSBVdGlscy5sb2FkU2VsZWN0ZWRJdGVtcyhncmlkKS5maWx0ZXIoXG4gICAgaXRlbSA9PiAhIWltbXV0YWJsZURhdGEuZmluZChkYXRhSXRlbSA9PiBkYXRhSXRlbS5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGl0ZW0pLFxuICApO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX0RBVEEsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgZGF0YTogaW1tdXRhYmxlRGF0YSxcbiAgICBjb25maWc6IGNvbmZpZ0RhdGEsXG4gICAgc2VsZWN0ZWRJdGVtcyxcbiAgICBpc0VkaXRpbmcsXG4gICAgaXNDcmVhdGluZyxcbiAgfSk7XG4gIGlmICghZ3JpZC5wYWdpbmF0aW9uKSB7XG4gICAgYXBwbHlGaWx0ZXJzKGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gICAgYXBwbHlTb3J0KGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59O1xuXG4vKipcbiAqIEFjdGlvbiB0byBzZXQgZm9jdXMgdG8gZWl0aGVyIGxhc3QgZWRpdGVkUm93LCBjcmVhdGVkUm93IG9yIHRvIHZhbGlkYXRpb24gZXJyb3JcbiAqIEBwYXJhbSB7T2JqZWN0fSBncmlkXG4gKiBAcGFyYW0ge1N0cmluZ30gZm9jdXNUb1R5cGUgLSB0eXBlIG9mIGZvY3VzIHJlcXVlc3QuIFBvc3NpYmxlIHZhbHVlczpcbiAqICdmb2N1c1RvRWRpdENlbGwnIHx8ICdmb2N1c1RvRXJyb3JDZWxsJyB8fCAnZm9jdXNUb0NyZWF0ZUNlbGwnXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGZvY3VzVG9MYXN0Um93IC0gc2V0cyBmb2N1cyB0byBsYXN0IGRhdGEgcm93IGluc3RlYWQgb2Ygc2VsZWN0ZWQgcm93XG4gKi9cbmV4cG9ydCBjb25zdCBzZXRGb2N1c1RvID0gKGdyaWQsIGZvY3VzVG8sIGZvY3VzVG9MYXN0Um93ID0gZmFsc2UpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NFVF9GT0NVU19UTyxcbiAgICBmb2N1c1RvLFxuICAgIGZvY3VzVG9MYXN0Um93LFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBleHRlbmREYXRhID0gKGdyaWQsIGNvbHVtbnMsIGRhdGEsIHByZXBlbmQgPSBmYWxzZSkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgY29uc3QgaW1tdXRhYmxlRGF0YSA9IEltbXV0YWJsZS5JdGVyYWJsZS5pc0l0ZXJhYmxlKGRhdGEpID8gZGF0YSA6IEltbXV0YWJsZS5mcm9tSlMoZGF0YSk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9FWFRFTkRfREFUQSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBkYXRhOiBpbW11dGFibGVEYXRhLFxuICAgIHByZXBlbmQsXG4gIH0pO1xuICBhcHBseUZpbHRlcnMoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgYXBwbHlTb3J0KGdyaWQsIGNvbHVtbnMpKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVzaXplQ29sdW1uID0gKGdyaWQsIGNvbHVtbktleSwgd2lkdGgpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGNvbnN0IGNvbHVtbldpZHRocyA9IGdldFN0YXRlKClcbiAgICAuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdjb25maWcnLCAnY29sdW1uV2lkdGhzJ10sIE1hcCgpKVxuICAgIC5zZXQoY29sdW1uS2V5LCB3aWR0aCk7XG4gIFV0aWxzLnNhdmVDb2x1bW5XaWR0aHMoZ3JpZCwgY29sdW1uV2lkdGhzKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFU0laRV9DT0xVTU4sXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgY29sdW1uV2lkdGhzLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBlZGl0ID0gZ3JpZCA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9FRElULFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBjYW5jZWwgPSBncmlkID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NBTkNFTCxcbiAgICBpZDogZ3JpZC5pZCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2F2ZSA9IChncmlkLCBjYiA9ICgpID0+IHt9KSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TQVZFLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbiAgY2IoKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzYXZlU3VjY2VzcyA9IChncmlkLCBjb2x1bW5zLCBzYXZlZEl0ZW1zKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0FWRV9TVUNDRVNTLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgc2F2ZWRJdGVtcyxcbiAgfSk7XG4gIGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICBhcHBseVNvcnQoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzYXZlUGFydGlhbFN1Y2Nlc3MgPSAoZ3JpZCwgY29sdW1ucywgc2F2ZWRJdGVtcykgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfUEFSVElBTF9TVUNDRVNTLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgc2F2ZWRJdGVtcyxcbiAgfSk7XG4gIGFwcGx5RmlsdGVycyhncmlkLCBjb2x1bW5zKShkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICBhcHBseVNvcnQoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzYXZlRmFpbCA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0FWRV9GQUlMLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGUgPSAoZ3JpZCwgY29sdW1uRGVmYXVsdFZhbHVlcykgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGNvbHVtbkRlZmF1bHRWYWx1ZXMsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGFkZE5ld0l0ZW0gPSAoZ3JpZCwgY29sdW1uRGVmYXVsdFZhbHVlcykgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQUREX05FV19JVEVNLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGNvbHVtbkRlZmF1bHRWYWx1ZXMsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZUl0ZW0gPSAoZ3JpZCwgcm93SWQpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9JVEVNLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgcm93SWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZU5ld0l0ZW0gPSAoZ3JpZCwgaW5kZXgpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBpbmRleCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlTmV3SXRlbXMgPSAoZ3JpZCwgaW5kZXhlcykgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNUyxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBpbmRleGVzLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmUgPSAoZ3JpZCwgY2IgPSAoKSA9PiB7fSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbiAgY2IoKTtcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVTdWNjZXNzID0gKGdyaWQsIHJlbW92ZWRJZHMpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9TVUNDRVNTLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgcmVtb3ZlZElkcyxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlRmFpbCA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUwsXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGVkaXRDZWxsVmFsdWVDaGFuZ2UgPSAoZ3JpZCwgZGF0YUlkLCBrZXlQYXRoLCB2YWx1ZSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfRURJVF9DRUxMX1ZBTFVFX0NIQU5HRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBkYXRhSWQsXG4gICAga2V5UGF0aCxcbiAgICB2YWx1ZSxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZWRpdENlbGxWYWx1ZVZhbGlkYXRlID0gKGdyaWQsIGRhdGFJZCwga2V5UGF0aCwgdmFsdWUsIHZhbGlkYXRvcnMgPSBbXSkgPT4gKFxuICBkaXNwYXRjaCxcbiAgZ2V0U3RhdGUsXG4pID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGxldCB2YWxpZGF0aW9uU3RhdGUgPSB7IHZhbGlkOiB0cnVlIH07XG4gIHZhbGlkYXRvcnMuZm9yRWFjaCgodmFsaWRhdG9yKSA9PiB7XG4gICAgaWYgKHZhbGlkYXRpb25TdGF0ZS52YWxpZCkge1xuICAgICAgaWYgKHZhbGlkYXRvci51bmlxdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSAnJyB8fCB2YWx1ZSAhPT0gbnVsbCB8fCB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgLy8gY29tYmluZSByZWFsIGRhdGEgd2l0aCBjdXJyZW50IHVuc2F2ZWQgZWRpdGVkIGRhdGFcbiAgICAgICAgICBjb25zdCBncmlkRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0KGdyaWQuaWQpO1xuICAgICAgICAgIGNvbnN0IGVkaXREYXRhID0gZ3JpZERhdGEuZ2V0KCdlZGl0RGF0YScpO1xuICAgICAgICAgIGxldCBhbGxEYXRhID0gZ3JpZERhdGEuZ2V0KCdhbGxEYXRhJyk7XG4gICAgICAgICAgaWYgKGVkaXREYXRhKSB7XG4gICAgICAgICAgICBlZGl0RGF0YS5mb3JFYWNoKChlZGl0RGF0YUl0ZW0sIGVkaXREYXRhSXRlbUlkKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGZvdW5kSW5kZXggPSBhbGxEYXRhLmZpbmRJbmRleChkID0+IGQuZ2V0SW4oZ3JpZC5pZEtleVBhdGgpID09PSBlZGl0RGF0YUl0ZW1JZCk7XG4gICAgICAgICAgICAgIGlmIChmb3VuZEluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIGFsbERhdGEgPSBhbGxEYXRhLm1lcmdlRGVlcEluKFtmb3VuZEluZGV4XSwgZWRpdERhdGFJdGVtKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGRldGVybWluZSB1bmlxdWVuZXNzXG4gICAgICAgICAgY29uc3QgZmluZGluZyA9IGFsbERhdGEuZmluZCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYgKGdyaWQuaWRLZXlQYXRoLmxlbmd0aCkge1xuICAgICAgICAgICAgICAvLyBkb24ndCBzZWxmIGNvbXBhcmVcbiAgICAgICAgICAgICAgaWYgKGl0ZW0uZ2V0SW4oZ3JpZC5pZEtleVBhdGgpID09PSBkYXRhSWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpdGVtLmdldEluKGtleVBhdGgpID09PSB2YWx1ZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoZmluZGluZykge1xuICAgICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0ge1xuICAgICAgICAgICAgICB2YWxpZDogZmFsc2UsXG4gICAgICAgICAgICAgIG1lc3NhZ2U6ICdWYWxpZGF0aW9uLlVuaXF1ZScsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh2YWxpZGF0b3IudmFsaWRhdGVXaXRoUm93RGF0YSkge1xuICAgICAgICAvLyBDdXN0b20gdmFsaWRhdG9yIGZ1bmN0aW9uIHdpdGggcm93RGF0YSBhcyBwYXJhbWV0ZXJzXG4gICAgICAgIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG4gICAgICAgIGNvbnN0IGVkaXREYXRhID0gZ3JpZERhdGEuZ2V0SW4oWydlZGl0RGF0YScsIGRhdGFJZF0sIE1hcCgpKTtcbiAgICAgICAgbGV0IHJvd0RhdGEgPSBncmlkRGF0YS5nZXQoJ2FsbERhdGEnKS5maW5kKGl0ZW0gPT4gaXRlbS5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGRhdGFJZCk7XG4gICAgICAgIGlmIChyb3dEYXRhKSB7XG4gICAgICAgICAgcm93RGF0YSA9IHJvd0RhdGEubWVyZ2VEZWVwKGVkaXREYXRhKTtcbiAgICAgICAgICBjb25zdCBwYXJhbXMgPSB2YWxpZGF0b3IucGFyYW1zID8gT2JqZWN0LnZhbHVlcyh2YWxpZGF0b3IucGFyYW1zKSA6IFtdO1xuICAgICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZVdpdGhSb3dEYXRhKHZhbHVlLCByb3dEYXRhLCAuLi5wYXJhbXMpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHZhbGlkYXRvci52YWxpZGF0ZVdpdGhHcmlkRGF0YSkge1xuICAgICAgICAvLyBDdXN0b20gdmFsaWRhdG9yIGZ1bmN0aW9uIHdpdGggcm93RGF0YSBhbmQgZ3JpZERhdGEgYXMgcGFyYW1ldGVyc1xuICAgICAgICBjb25zdCBncmlkRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0KGdyaWQuaWQpO1xuXG4gICAgICAgIGxldCBhbGxEYXRhID0gZ3JpZERhdGEuZ2V0KCdhbGxEYXRhJywgTGlzdCgpKTtcbiAgICAgICAgY29uc3QgZWRpdERhdGEgPSBncmlkRGF0YS5nZXQoJ2VkaXREYXRhJywgTWFwKCkpO1xuXG4gICAgICAgIGVkaXREYXRhLmZvckVhY2goKGVkaXRSb3csIGVkaXRLZXkpID0+IHtcbiAgICAgICAgICBjb25zdCBmb3VuZEluZGV4ID0gYWxsRGF0YS5maW5kSW5kZXgoZCA9PiBkLmdldEluKGdyaWQuaWRLZXlQYXRoKSA9PT0gZWRpdEtleSk7XG4gICAgICAgICAgaWYgKGZvdW5kSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICBhbGxEYXRhID0gYWxsRGF0YS5tZXJnZURlZXBJbihbZm91bmRJbmRleF0sIGVkaXRSb3cpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGVkaXRSb3dEYXRhID0gZWRpdERhdGEuZ2V0KGRhdGFJZCwgTWFwKCkpO1xuICAgICAgICBsZXQgcm93RGF0YSA9IGFsbERhdGEuZmluZChpdGVtID0+IGl0ZW0uZ2V0SW4oZ3JpZC5pZEtleVBhdGgpID09PSBkYXRhSWQpO1xuICAgICAgICBpZiAocm93RGF0YSkge1xuICAgICAgICAgIHJvd0RhdGEgPSByb3dEYXRhLm1lcmdlRGVlcChlZGl0Um93RGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcm93RGF0YSA9IGVkaXRSb3dEYXRhO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHZhbGlkYXRvci5wYXJhbXMgPyBPYmplY3QudmFsdWVzKHZhbGlkYXRvci5wYXJhbXMpIDogW107XG4gICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZVdpdGhHcmlkRGF0YSh2YWx1ZSwgcm93RGF0YSwgYWxsRGF0YSwgLi4ucGFyYW1zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHZhbGlkYXRvci5wYXJhbXMgPyBPYmplY3QudmFsdWVzKHZhbGlkYXRvci5wYXJhbXMpIDogW107XG4gICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZSh2YWx1ZSwgLi4ucGFyYW1zKTtcbiAgICAgICAgaWYgKHZhbGlkYXRvci5wYXJhbXMpIHtcbiAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZVZhbHVlcyA9IHZhbGlkYXRvci5wYXJhbXM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IGNlbGxNZXNzYWdlID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ2NlbGxNZXNzYWdlcycsICdlcnJvcicsIGRhdGFJZCwgLi4ua2V5UGF0aF0pO1xuICBpZiAodmFsaWRhdGlvblN0YXRlLnZhbGlkICYmIGNlbGxNZXNzYWdlICE9PSB1bmRlZmluZWQpIHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgbWVzc2FnZVR5cGU6ICdlcnJvcicsXG4gICAgICBkYXRhSWQsXG4gICAgICBrZXlQYXRoLFxuICAgIH0pO1xuICB9IGVsc2UgaWYgKCF2YWxpZGF0aW9uU3RhdGUudmFsaWQpIHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRSxcbiAgICAgIGlkOiBncmlkLmlkLFxuICAgICAgbWVzc2FnZVR5cGU6ICdlcnJvcicsXG4gICAgICBkYXRhSWQsXG4gICAgICBrZXlQYXRoLFxuICAgICAgbWVzc2FnZUlkOiB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZSxcbiAgICAgIG1lc3NhZ2VWYWx1ZXM6IHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlVmFsdWVzLFxuICAgIH0pO1xuICB9XG4gIHJldHVybiB2YWxpZGF0aW9uU3RhdGUudmFsaWQ7XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlID0gKGdyaWQsIHJvd0luZGV4LCBrZXlQYXRoLCB2YWx1ZSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfQ0hBTkdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIHJvd0luZGV4LFxuICAgIGtleVBhdGgsXG4gICAgdmFsdWUsXG4gIH0pO1xufTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbmV4cG9ydCBjb25zdCBjcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZSA9IChncmlkLCByb3dJbmRleCwga2V5UGF0aCwgdmFsdWUsIHZhbGlkYXRvcnMgPSBbXSkgPT4gKFxuICBkaXNwYXRjaCxcbiAgZ2V0U3RhdGUsXG4pID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGxldCB2YWxpZGF0aW9uU3RhdGUgPSB7IHZhbGlkOiB0cnVlIH07XG4gIHZhbGlkYXRvcnMuZm9yRWFjaCgodmFsaWRhdG9yKSA9PiB7XG4gICAgaWYgKHZhbGlkYXRpb25TdGF0ZS52YWxpZCkge1xuICAgICAgaWYgKHZhbGlkYXRvci51bmlxdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSAnJyB8fCB2YWx1ZSAhPT0gbnVsbCB8fCB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY29uc3QgZmluZGluZyA9IGdldFN0YXRlKClcbiAgICAgICAgICAgIC5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ2FsbERhdGEnXSlcbiAgICAgICAgICAgIC5maW5kKGl0ZW0gPT4gaXRlbS5nZXRJbihrZXlQYXRoKSA9PT0gdmFsdWUpO1xuICAgICAgICAgIGlmIChmaW5kaW5nKSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB7XG4gICAgICAgICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgICAgICAgICAgbWVzc2FnZTogJ1ZhbGlkYXRpb24uVW5pcXVlJyxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGZpbmQyID0gZ2V0U3RhdGUoKVxuICAgICAgICAgICAgICAuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdjcmVhdGVEYXRhJ10pXG4gICAgICAgICAgICAgIC5maW5kKChpdGVtLCBpKSA9PiBpICE9PSByb3dJbmRleCAmJiBpdGVtLmdldEluKGtleVBhdGgpID09PSB2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoZmluZDIpIHtcbiAgICAgICAgICAgICAgdmFsaWRhdGlvblN0YXRlID0ge1xuICAgICAgICAgICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnVmFsaWRhdGlvbi5VbmlxdWUnLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh2YWxpZGF0b3IudmFsaWRhdGVXaXRoUm93RGF0YSkge1xuICAgICAgICBjb25zdCByb3dEYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ2NyZWF0ZURhdGEnLCByb3dJbmRleF0pO1xuICAgICAgICBjb25zdCBwYXJhbXMgPSB2YWxpZGF0b3IucGFyYW1zID8gT2JqZWN0LnZhbHVlcyh2YWxpZGF0b3IucGFyYW1zKSA6IFtdO1xuICAgICAgICB2YWxpZGF0aW9uU3RhdGUgPSB2YWxpZGF0b3IudmFsaWRhdGVXaXRoUm93RGF0YSh2YWx1ZSwgcm93RGF0YSwgLi4ucGFyYW1zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHZhbGlkYXRvci5wYXJhbXMgPyBPYmplY3QudmFsdWVzKHZhbGlkYXRvci5wYXJhbXMpIDogW107XG4gICAgICAgIHZhbGlkYXRpb25TdGF0ZSA9IHZhbGlkYXRvci52YWxpZGF0ZSh2YWx1ZSwgLi4ucGFyYW1zKTtcbiAgICAgICAgaWYgKHZhbGlkYXRvci5wYXJhbXMpIHtcbiAgICAgICAgICB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZVZhbHVlcyA9IHZhbGlkYXRvci5wYXJhbXM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICBjb25zdCBjcmVhdGVDZWxsTWVzc2FnZSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdjcmVhdGVDZWxsTWVzc2FnZXMnLCAnZXJyb3InLCByb3dJbmRleCwgLi4ua2V5UGF0aF0pO1xuICBpZiAodmFsaWRhdGlvblN0YXRlLnZhbGlkICYmIGNyZWF0ZUNlbGxNZXNzYWdlICE9PSB1bmRlZmluZWQpIHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9ISURFX01FU1NBR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIG1lc3NhZ2VUeXBlOiAnZXJyb3InLFxuICAgICAgcm93SW5kZXgsXG4gICAgICBrZXlQYXRoLFxuICAgIH0pO1xuICB9IGVsc2UgaWYgKCF2YWxpZGF0aW9uU3RhdGUudmFsaWQpIHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9TSE9XX01FU1NBR0UsXG4gICAgICBpZDogZ3JpZC5pZCxcbiAgICAgIG1lc3NhZ2VUeXBlOiAnZXJyb3InLFxuICAgICAgcm93SW5kZXgsXG4gICAgICBrZXlQYXRoLFxuICAgICAgbWVzc2FnZUlkOiB2YWxpZGF0aW9uU3RhdGUubWVzc2FnZSxcbiAgICAgIG1lc3NhZ2VWYWx1ZXM6IHZhbGlkYXRpb25TdGF0ZS5tZXNzYWdlVmFsdWVzLFxuICAgIH0pO1xuICB9XG4gIHJldHVybiB2YWxpZGF0aW9uU3RhdGUudmFsaWQ7XG59O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuZXhwb3J0IGNvbnN0IGNlbGxTaG93TWVzc2FnZSA9IChcbiAgZ3JpZCxcbiAgbWVzc2FnZVR5cGUsXG4gIGRhdGFJZCxcbiAga2V5UGF0aCxcbiAgbWVzc2FnZUlkLFxuICBtZXNzYWdlVmFsdWVzLFxuKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBtZXNzYWdlVHlwZSxcbiAgICBkYXRhSWQsXG4gICAga2V5UGF0aCxcbiAgICBtZXNzYWdlSWQsXG4gICAgbWVzc2FnZVZhbHVlcyxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgY2VsbFNob3dNZXNzYWdlcyA9IChncmlkLCBtZXNzYWdlcykgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0VTLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIG1lc3NhZ2VzLFxuICB9KTtcbn07XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG5leHBvcnQgY29uc3QgY2VsbEhpZGVNZXNzYWdlID0gKFxuICBncmlkLFxuICBtZXNzYWdlVHlwZSA9IG51bGwsXG4gIGRhdGFJZCA9IG51bGwsXG4gIGtleVBhdGggPSBudWxsLFxuKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBtZXNzYWdlVHlwZSxcbiAgICBkYXRhSWQsXG4gICAga2V5UGF0aCxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQ2VsbFNob3dNZXNzYWdlID0gKFxuICBncmlkLFxuICBtZXNzYWdlVHlwZSxcbiAgcm93SW5kZXgsXG4gIGtleVBhdGgsXG4gIG1lc3NhZ2VJZCxcbiAgbWVzc2FnZVZhbHVlcyxcbikgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfU0hPV19NRVNTQUdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIG1lc3NhZ2VUeXBlLFxuICAgIHJvd0luZGV4LFxuICAgIGtleVBhdGgsXG4gICAgbWVzc2FnZUlkLFxuICAgIG1lc3NhZ2VWYWx1ZXMsXG4gIH0pO1xufTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbmV4cG9ydCBjb25zdCBjcmVhdGVDZWxsSGlkZU1lc3NhZ2UgPSAoXG4gIGdyaWQsXG4gIG1lc3NhZ2VUeXBlID0gbnVsbCxcbiAgcm93SW5kZXggPSBudWxsLFxuICBrZXlQYXRoID0gbnVsbCxcbikgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfSElERV9NRVNTQUdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIG1lc3NhZ2VUeXBlLFxuICAgIHJvd0luZGV4LFxuICAgIGtleVBhdGgsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGNlbGxTZWxlY3Rpb25DaGFuZ2UgPSAoZ3JpZCwgc2VsZWN0ZWRDZWxsID0gbnVsbCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgc2VsZWN0ZWRDZWxsLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0VMRUNUSU9OX0NIQU5HRSxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgaXRlbVNlbGVjdGlvbkNoYW5nZSA9IChncmlkLCByb3dJbmRleCwgY3RybFByZXNzZWQgPSBmYWxzZSwgc2hpZnRQcmVzc2VkID0gZmFsc2UpID0+IChcbiAgZGlzcGF0Y2gsXG4gIGdldFN0YXRlLFxuKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIHJvd0luZGV4LFxuICAgIGlkS2V5UGF0aDogZ3JpZC5pZEtleVBhdGgsXG4gICAgY3RybFByZXNzZWQsXG4gICAgc2hpZnRQcmVzc2VkLFxuICB9KTtcbiAgVXRpbHMuc2F2ZVNlbGVjdGVkSXRlbXMoZ3JpZCwgZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXRJbihbZ3JpZC5pZCwgJ3NlbGVjdGVkSXRlbXMnXSkpO1xufTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdEFsbEl0ZW1zQ2hhbmdlID0gZ3JpZCA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0UsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgaWRLZXlQYXRoOiBncmlkLmlkS2V5UGF0aCxcbiAgfSk7XG4gIFV0aWxzLnNhdmVTZWxlY3RlZEl0ZW1zKGdyaWQsIGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdzZWxlY3RlZEl0ZW1zJ10pKTtcbn07XG5cbmV4cG9ydCBjb25zdCBjbGVhclNlbGVjdGVkSXRlbXMgPSBncmlkID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DTEVBUl9TRUxFQ1RFRF9JVEVNUyxcbiAgICBpZDogZ3JpZC5pZCxcbiAgfSk7XG4gIFV0aWxzLnNhdmVTZWxlY3RlZEl0ZW1zKGdyaWQsIGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdzZWxlY3RlZEl0ZW1zJ10pKTtcbn07XG5cbmV4cG9ydCBjb25zdCB0b2dnbGVGaWx0ZXJpbmcgPSBncmlkID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGNvbnN0IGlzRmlsdGVyaW5nID0gIWdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oXG4gICAgW2dyaWQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdpc0ZpbHRlcmluZyddLFxuICAgIGZhbHNlLFxuICApO1xuICBVdGlscy5zYXZlSXNGaWx0ZXJpbmcoZ3JpZCwgaXNGaWx0ZXJpbmcpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfVE9HR0xFX0ZJTFRFUklORyxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICBpc0ZpbHRlcmluZyxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgdmFsaWRhdGVFZGl0ZWRSb3dzID0gKGdyaWQsIGNvbHVtbnMpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGNvbnN0IGdyaWREYXRhID0gZ2V0U3RhdGUoKS5kYXRhZ3JpZC5nZXQoZ3JpZC5pZCk7XG4gIGNvbnN0IGVkaXREYXRhID0gZ3JpZERhdGEuZ2V0KCdlZGl0RGF0YScsIE1hcCgpKTtcbiAgbGV0IGFsbEdvb2QgPSB0cnVlO1xuICBlZGl0RGF0YS5mb3JFYWNoKChlZGl0RGF0YVJvdywgZGF0YUlkKSA9PiB7XG4gICAgY29sdW1ucy5mb3JFYWNoKChjb2wpID0+IHtcbiAgICAgIGxldCB2YWx1ZSA9IGVkaXREYXRhUm93LmdldEluKGNvbC52YWx1ZUtleVBhdGgpO1xuICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsdWUgPSBncmlkRGF0YVxuICAgICAgICAgIC5nZXQoJ2FsbERhdGEnKVxuICAgICAgICAgIC5maW5kKGRhdGEgPT4gZGF0YS5nZXRJbihncmlkLmlkS2V5UGF0aCkgPT09IGRhdGFJZClcbiAgICAgICAgICAuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG4gICAgICB9XG4gICAgICBjb25zdCBpc1ZhbGlkID0gZWRpdENlbGxWYWx1ZVZhbGlkYXRlKGdyaWQsIGRhdGFJZCwgY29sLnZhbHVlS2V5UGF0aCwgdmFsdWUsIGNvbC52YWxpZGF0b3JzKShcbiAgICAgICAgZGlzcGF0Y2gsXG4gICAgICAgIGdldFN0YXRlLFxuICAgICAgKTtcbiAgICAgIGlmIChhbGxHb29kICYmICFpc1ZhbGlkKSB7XG4gICAgICAgIGFsbEdvb2QgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBhbGxHb29kO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZUVtcHR5Q3JlYXRlZFJvd3MgPSAoZ3JpZCwgY29sdW1ucykgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgY29uc3QgY3JlYXRlRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdjcmVhdGVEYXRhJ10sIE1hcCgpKTtcbiAgY29uc3QgaW5kZXhlcyA9IFtdO1xuICBjcmVhdGVEYXRhLmZvckVhY2goKGNyZWF0ZURhdGFSb3csIHJvd0luZGV4KSA9PiB7XG4gICAgbGV0IGlzRW1wdHkgPSB0cnVlO1xuICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGNyZWF0ZURhdGFSb3cuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG4gICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gJycgJiYgdmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgaXNFbXB0eSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChpc0VtcHR5KSB7XG4gICAgICBpbmRleGVzLnB1c2gocm93SW5kZXgpO1xuICAgIH1cbiAgfSk7XG4gIGlmIChpbmRleGVzLmxlbmd0aCA+IDApIHtcbiAgICByZW1vdmVOZXdJdGVtcyhncmlkLCBpbmRleGVzKShkaXNwYXRjaCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUNyZWF0ZWRSb3dzID0gKGdyaWQsIGNvbHVtbnMpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIHJlbW92ZUVtcHR5Q3JlYXRlZFJvd3MoZ3JpZCwgY29sdW1ucykoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgY29uc3QgY3JlYXRlRGF0YSA9IGdldFN0YXRlKCkuZGF0YWdyaWQuZ2V0SW4oW2dyaWQuaWQsICdjcmVhdGVEYXRhJ10sIE1hcCgpKTtcbiAgbGV0IGFsbEdvb2QgPSB0cnVlO1xuICBjcmVhdGVEYXRhLmZvckVhY2goKGNyZWF0ZURhdGFSb3csIHJvd0luZGV4KSA9PiB7XG4gICAgY29sdW1ucy5mb3JFYWNoKChjb2wpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gY3JlYXRlRGF0YVJvdy5nZXRJbihjb2wudmFsdWVLZXlQYXRoKTtcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSBjcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZShcbiAgICAgICAgZ3JpZCxcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIGNvbC52YWx1ZUtleVBhdGgsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBjb2wudmFsaWRhdG9ycyxcbiAgICAgICkoZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgICAgIGlmIChhbGxHb29kICYmICFpc1ZhbGlkKSB7XG4gICAgICAgIGFsbEdvb2QgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBhbGxHb29kO1xufTtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZUV4aXN0aW5nQ2VsbFZhbHVlID0gKGdyaWQsIGRhdGFJZCwga2V5UGF0aCwgdmFsdWUpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1VQREFURV9FWElTVElOR19DRUxMX1ZBTFVFLFxuICAgIGdyaWQsXG4gICAgZGF0YUlkLFxuICAgIGtleVBhdGgsXG4gICAgdmFsdWUsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldEVkaXREYXRhID0gKGdyaWQsIGRhdGEsIGNlbGxNZXNzYWdlcyA9IE1hcCgpKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgVXRpbHMuY2hlY2tHcmlkUGFyYW0oZ3JpZCk7XG4gIGRpc3BhdGNoKHtcbiAgICBkYXRhLFxuICAgIGNlbGxNZXNzYWdlcyxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfRURJVF9EQVRBLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBvcGVuQ29sdW1uU2V0dGluZ3NNb2RhbCA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX09QRU4sXG4gICAgaWQ6IGdyaWQuaWQsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbCA9IGdyaWQgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLmNoZWNrR3JpZFBhcmFtKGdyaWQpO1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX0NMT1NFLFxuICAgIGlkOiBncmlkLmlkLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzYXZlQ29sdW1uU2V0dGluZ3MgPSAoZ3JpZCwgaGlkZGVuQ29sdW1ucywgY29sdW1uT3JkZXIpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5jaGVja0dyaWRQYXJhbShncmlkKTtcbiAgVXRpbHMuc2F2ZUNvbHVtblNldHRpbmdzKGdyaWQsIGhpZGRlbkNvbHVtbnMsIGNvbHVtbk9yZGVyKTtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFLFxuICAgIGlkOiBncmlkLmlkLFxuICAgIGNvbHVtbk9yZGVyLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXRQYWdlID0gKGdyaWQsIHBhZ2UpID0+IChkaXNwYXRjaCkgPT4ge1xuICBVdGlscy5zYXZlUGFnZShncmlkLCBwYWdlKTtcbiAgZGlzcGF0Y2goe1xuICAgIHBhZ2UsXG4gICAgaWQ6IGdyaWQuaWQsXG4gICAgdHlwZTogVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX1BBR0UsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldFJvd3NPblBhZ2UgPSAoZ3JpZCwgcm93c09uUGFnZSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIFV0aWxzLnNhdmVSb3dzT25QYWdlKGdyaWQsIHJvd3NPblBhZ2UpO1xuICBkaXNwYXRjaCh7XG4gICAgcm93c09uUGFnZSxcbiAgICBpZDogZ3JpZC5pZCxcbiAgICB0eXBlOiBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfUk9XU19PTl9QQUdFLFxuICB9KTtcbn07XG4iXX0=