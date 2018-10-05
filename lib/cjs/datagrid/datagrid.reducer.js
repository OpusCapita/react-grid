'use strict';

exports.__esModule = true;
exports.default = datagridReducer;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _datagrid = require('./datagrid.actions');

var _datagrid2 = require('./datagrid.constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function datagridReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _datagrid2.INITIAL_STATE;
  var action = arguments[1];

  switch (action.type) {
    case _datagrid.TYPES.PLATFORM_DATAGRID_INVALIDATE:
      return state.deleteIn([action.id, 'data']).deleteIn([action.id, 'allData']).deleteIn([action.id, 'session']).deleteIn([action.id, 'selectedCell']).deleteIn([action.id, 'editData']).deleteIn([action.id, 'createData']).deleteIn([action.id, 'createCellMessages']).deleteIn([action.id, 'cellMessages']);

    case _datagrid.TYPES.PLATFORM_DATAGRID_FORCE_REFRESH:
      // no need to alter redux state on force refesh
      return state;

    case _datagrid.TYPES.PLATFORM_DATAGRID_SET_DATA:
      return state.setIn([action.id, 'data'], action.data).setIn([action.id, 'allData'], action.data).setIn([action.id, 'config'], _immutable2.default.fromJS(action.config)).setIn([action.id, 'selectedItems'], _immutable2.default.fromJS(action.selectedItems)).mergeIn([action.id, 'session'], {
        isEditing: false,
        isCreating: false,
        isBusy: false
      }).deleteIn([action.id, 'selectedCell']).deleteIn([action.id, 'editData']).deleteIn([action.id, 'createData']).deleteIn([action.id, 'createCellMessages']).deleteIn([action.id, 'cellMessages']);

    case _datagrid.TYPES.PLATFORM_DATAGRID_BUSY:
      return state.setIn([action.id, 'session', 'isBusy'], true);

    case _datagrid.TYPES.PLATFORM_DATAGRID_READY:
      return state.setIn([action.id, 'session', 'isBusy'], false);

    case _datagrid.TYPES.PLATFORM_DATAGRID_APPLY_SORT:
      return state.setIn([action.id, 'data'], action.data).setIn([action.id, 'allData'], action.allData);

    case _datagrid.TYPES.PLATFORM_DATAGRID_SORT_CHANGE:
      return state.setIn([action.id, 'config', 'sortingData'], (0, _immutable.Map)({
        sortColumn: action.sortColumn,
        sortOrder: action.sortOrder
      }));

    case _datagrid.TYPES.PLATFORM_DATAGRID_RESIZE_COLUMN:
      return state.setIn([action.id, 'config', 'columnWidths'], action.columnWidths);

    case _datagrid.TYPES.PLATFORM_DATAGRID_EDIT:
      return state.setIn([action.id, 'session', 'isEditing'], true);

    case _datagrid.TYPES.PLATFORM_DATAGRID_CREATE:
      return state.setIn([action.id, 'createData'], (0, _immutable.List)([_immutable2.default.fromJS(action.columnDefaultValues)])).deleteIn([action.id, 'selectedCell']).mergeIn([action.id, 'session'], {
        isCreating: true
      });

    case _datagrid.TYPES.PLATFORM_DATAGRID_ADD_NEW_ITEM:
      return state.updateIn([action.id, 'createData'], (0, _immutable.List)(), function (items) {
        return items.push(_immutable2.default.fromJS(action.columnDefaultValues));
      });

    case _datagrid.TYPES.PLATFORM_DATAGRID_REMOVE_ITEM:
      {
        var allDataIndex = state.getIn([action.id, 'allData'], (0, _immutable.List)()).findIndex(function (item) {
          return item.getIn(action.idKeyPath) === action.rowId;
        });
        var dataIndex = state.getIn([action.id, 'data'], (0, _immutable.List)()).findIndex(function (item) {
          return item.getIn(action.idKeyPath) === action.rowId;
        });
        return state.deleteIn([action.id, 'data', dataIndex]).deleteIn([action.id, 'allData', allDataIndex]).deleteIn([action.id, 'editData', action.rowId]).deleteIn([action.id, 'cellMessages', 'error', action.rowId]).deleteIn([action.id, 'cellMessages', 'info', action.rowId]).deleteIn([action.id, 'cellMessages', 'warning', action.rowId]);
      }

    case _datagrid.TYPES.PLATFORM_DATAGRID_REMOVE_NEW_ITEM:
      return state.deleteIn([action.id, 'createData', action.index]);

    case _datagrid.TYPES.PLATFORM_DATAGRID_REMOVE_NEW_ITEMS:
      return state.setIn([action.id, 'createData'], state.getIn([action.id, 'createData'], (0, _immutable.List)()).filter(function (val, idx) {
        return action.indexes.indexOf(idx) === -1;
      }));

    case _datagrid.TYPES.PLATFORM_DATAGRID_CANCEL:
      return state.mergeIn([action.id, 'session'], (0, _immutable.Map)({
        isEditing: false,
        isCreating: false
      })).deleteIn([action.id, 'editData']).deleteIn([action.id, 'createData']).deleteIn([action.id, 'createCellMessages', 'error']).deleteIn([action.id, 'cellMessages', 'error']);

    case _datagrid.TYPES.PLATFORM_DATAGRID_SAVE:
      return state.setIn([action.id, 'session', 'isBusy'], true);

    case _datagrid.TYPES.PLATFORM_DATAGRID_EXTEND_DATA:
      {
        var allData = state.getIn([action.id, 'allData']);
        var extendedData = action.prepend ? action.data.concat(allData) : allData.concat(action.data);

        return state.setIn([action.id, 'data'], extendedData).setIn([action.id, 'allData'], extendedData);
      }

    case _datagrid.TYPES.PLATFORM_DATAGRID_SAVE_SUCCESS:
      {
        var _allData = state.getIn([action.id, 'allData']);
        action.savedItems.forEach(function (savedItemJS) {
          var savedItem = _immutable2.default.fromJS(savedItemJS);
          var foundIndex = _allData.findIndex(function (d) {
            return d.getIn(action.idKeyPath) === savedItem.getIn(action.idKeyPath);
          });
          if (foundIndex === -1) {
            _allData = _allData.push(savedItem);
          } else {
            _allData = _allData.mergeDeepIn([foundIndex], savedItem);
          }
        });
        return state.setIn([action.id, 'data'], _allData).setIn([action.id, 'allData'], _allData).mergeIn([action.id, 'session'], {
          isBusy: false,
          isEditing: false,
          isCreating: false
        }).deleteIn([action.id, 'editData']).deleteIn([action.id, 'createData']).deleteIn([action.id, 'createCellMessages', 'error']).deleteIn([action.id, 'cellMessages', 'error']);
      }

    case _datagrid.TYPES.PLATFORM_DATAGRID_SAVE_PARTIAL_SUCCESS:
      {
        var _allData2 = state.getIn([action.id, 'allData']);
        var createData = state.getIn([action.id, 'createData']);
        var editData = state.getIn([action.id, 'editData']);
        var isCreating = state.getIn([action.id, 'session', 'isCreating']);
        action.savedItems.forEach(function (savedItemJS) {
          var savedItem = _immutable2.default.fromJS(savedItemJS);
          var foundIndex = _allData2.findIndex(function (d) {
            return d.getIn(action.idKeyPath) === savedItem.getIn(action.idKeyPath);
          });
          if (foundIndex === -1) {
            _allData2 = _allData2.push(savedItem);
          } else {
            _allData2 = _allData2.mergeDeepIn([foundIndex], savedItem);
          }
          if (isCreating) {
            foundIndex = savedItem.get('rowIndex');
            if (foundIndex !== undefined && foundIndex !== null) {
              createData = createData.delete(foundIndex);
            }
          } else {
            editData = editData.delete(savedItem.getIn(action.idKeyPath));
          }
        });
        return state.setIn([action.id, 'data'], _allData2).setIn([action.id, 'allData'], _allData2).setIn([action.id, 'createData'], createData).setIn([action.id, 'editData'], editData).setIn([action.id, 'session', 'isBusy'], false);
      }

    case _datagrid.TYPES.PLATFORM_DATAGRID_SAVE_FAIL:
      return state.setIn([action.id, 'session', 'isBusy'], false);

    case _datagrid.TYPES.PLATFORM_DATAGRID_REMOVE:
      return state.setIn([action.id, 'session', 'isBusy'], true);

    case _datagrid.TYPES.PLATFORM_DATAGRID_REMOVE_SUCCESS:
      return state.setIn([action.id, 'session', 'isBusy'], false).updateIn([action.id, 'data'], function (data) {
        return data.filterNot(function (item) {
          return action.removedIds.indexOf(item.getIn(action.idKeyPath)) > -1;
        });
      }).updateIn([action.id, 'allData'], function (data) {
        return data.filterNot(function (item) {
          return action.removedIds.indexOf(item.getIn(action.idKeyPath)) > -1;
        });
      }).deleteIn([action.id, 'selectedItems']);

    case _datagrid.TYPES.PLATFORM_DATAGRID_REMOVE_FAIL:
      return state.setIn([action.id, 'session', 'isBusy'], false);

    case _datagrid.TYPES.PLATFORM_DATAGRID_EDIT_CELL_VALUE_CHANGE:
      return state.setIn([action.id, 'editData', action.dataId].concat(action.keyPath), action.value);

    case _datagrid.TYPES.PLATFORM_DATAGRID_CREATE_CELL_VALUE_CHANGE:
      return state.setIn([action.id, 'createData', action.rowIndex].concat(action.keyPath), action.value);

    case _datagrid.TYPES.PLATFORM_DATAGRID_CELL_SHOW_MESSAGE:
      return state.setIn([action.id, 'cellMessages', action.messageType, action.dataId].concat(action.keyPath), { id: action.messageId, values: action.messageValues });

    case _datagrid.TYPES.PLATFORM_DATAGRID_CELL_SHOW_MESSAGES:
      return state.mergeIn([action.id, 'cellMessages'], _immutable2.default.fromJS(action.messages));

    case _datagrid.TYPES.PLATFORM_DATAGRID_CELL_HIDE_MESSAGE:
      {
        if (action.messageType === null) {
          return state.deleteIn([action.id, 'cellMessages']);
        }
        if (action.dataId === null) {
          return state.deleteIn([action.id, 'cellMessages', action.messageType]);
        }
        var rowMessage = state.getIn([action.id, 'cellMessages', action.messageType, action.dataId]);
        if (rowMessage) {
          if (action.keyPath) {
            rowMessage = rowMessage.deleteIn(action.keyPath);
          }
          if (rowMessage.size === 0 || !action.keyPath) {
            return state.deleteIn([action.id, 'cellMessages', action.messageType, action.dataId]);
          }
          return state.setIn([action.id, 'cellMessages', action.messageType, action.dataId], rowMessage);
        }
        return state;
      }

    case _datagrid.TYPES.PLATFORM_DATAGRID_CREATE_CELL_SHOW_MESSAGE:
      return state.setIn([action.id, 'createCellMessages', action.messageType, action.rowIndex].concat(action.keyPath), { id: action.messageId, values: action.messageValues });

    case _datagrid.TYPES.PLATFORM_DATAGRID_CREATE_CELL_HIDE_MESSAGE:
      {
        if (action.messageType === null) {
          return state.deleteIn([action.id, 'createCellMessages']);
        }
        if (action.rowIndex === null) {
          return state.deleteIn([action.id, 'createCellMessages', action.messageType]);
        }
        var _rowMessage = state.getIn([action.id, 'createCellMessages', action.messageType, action.rowIndex]);
        if (_rowMessage) {
          if (action.keyPath) {
            _rowMessage = _rowMessage.deleteIn(action.keyPath);
          }
          if (_rowMessage.size === 0 || !action.keyPath) {
            return state.deleteIn([action.id, 'createCellMessages', action.messageType, action.rowIndex]);
          }
          return state.setIn([action.id, 'createCellMessages', action.messageType, action.rowIndex], _rowMessage);
        }
        return state;
      }

    case _datagrid.TYPES.PLATFORM_DATAGRID_CELL_SELECTION_CHANGE:
      return state.setIn([action.id, 'selectedCell'], action.selectedCell);

    case _datagrid.TYPES.PLATFORM_DATAGRID_ITEM_SELECTION_CHANGE:
      {
        var newState = state.setIn([action.id, 'session', 'lastClickedRowIndex'], action.rowIndex);

        // Handle case where shift key is pressed
        // Select all rows from lastClickedRow to currently clicked row
        if (action.shiftPressed) {
          var lastRowIndex = state.getIn([action.id, 'session', 'lastClickedRowIndex'], false);
          if (lastRowIndex !== false) {
            var selectRowIds = [];
            if (lastRowIndex < action.rowIndex) {
              for (var i = lastRowIndex; i <= action.rowIndex; i += 1) {
                var _dataId = state.getIn([action.id, 'data', i].concat(action.idKeyPath));
                if (_dataId) {
                  selectRowIds.push(_dataId);
                }
              }
            } else {
              for (var _i = action.rowIndex; _i <= lastRowIndex; _i += 1) {
                var _dataId2 = state.getIn([action.id, 'data', _i].concat(action.idKeyPath));
                if (_dataId2) {
                  selectRowIds.push(_dataId2);
                }
              }
            }
            return newState.setIn([action.id, 'selectedItems'], (0, _immutable.List)(selectRowIds));
          }
        }

        var dataId = state.getIn([action.id, 'data', action.rowIndex].concat(action.idKeyPath));
        var foundIndex = state.getIn([action.id, 'selectedItems'], (0, _immutable.List)()).indexOf(dataId);
        if (foundIndex === -1) {
          if (action.ctrlPressed) {
            return newState.updateIn([action.id, 'selectedItems'], (0, _immutable.List)(), function (items) {
              return items.push(dataId);
            });
          }
          return newState.setIn([action.id, 'selectedItems'], (0, _immutable.List)([dataId]));
        }
        if (action.ctrlPressed) {
          return newState.updateIn([action.id, 'selectedItems'], function (items) {
            return items.delete(foundIndex);
          });
        }
        return newState.setIn([action.id, 'selectedItems'], (0, _immutable.List)([dataId]));
      }

    case _datagrid.TYPES.PLATFORM_DATAGRID_SELECT_ALL_ITEMS_CHANGE:
      if (state.getIn([action.id, 'selectedItems'], (0, _immutable.List)()).size === state.getIn([action.id, 'data'], (0, _immutable.List)()).size) {
        return state.deleteIn([action.id, 'selectedItems']);
      }
      return state.setIn([action.id, 'selectedItems'], state.getIn([action.id, 'data'], (0, _immutable.List)()).map(function (item) {
        return item.getIn(action.idKeyPath);
      }));

    case _datagrid.TYPES.PLATFORM_DATAGRID_CLEAR_SELECTED_ITEMS:
      return state.deleteIn([action.id, 'selectedItems']);

    case _datagrid.TYPES.PLATFORM_DATAGRID_TOGGLE_FILTERING:
      {
        if (!action.isFiltering) {
          return state.setIn([action.id, 'config', 'filteringData'], (0, _immutable.Map)({ isFiltering: false })).setIn([action.id, 'data'], state.getIn([action.id, 'allData']));
        }
        return state.setIn([action.id, 'config', 'filteringData'], (0, _immutable.Map)({ isFiltering: true }));
      }

    case _datagrid.TYPES.PLATFORM_DATAGRID_FILTER_DATA_CHANGE:
      return state.setIn([action.id, 'config', 'filteringData', 'filterData'], action.filterData);

    case _datagrid.TYPES.PLATFORM_DATAGRID_APPLY_FILTERS:
      return state.setIn([action.id, 'data'], action.data);

    case _datagrid.TYPES.PLATFORM_DATAGRID_SET_FILTERS:
      return state.setIn([action.id, 'config', 'filteringData'], action.filteringData);

    case _datagrid.TYPES.PLATFORM_DATAGRID_UPDATE_EXISTING_CELL_VALUE:
      {
        var _newState = state.setIn([action.id, 'allData', action.dataId].concat(action.keyPath), action.value);
        if (state.hasIn([action.id, 'data', action.dataId].concat(action.keyPath))) {
          return _newState.setIn([action.id, 'data', action.dataId].concat(action.keyPath), action.value);
        }
        return _newState;
      }

    case _datagrid.TYPES.PLATFORM_DATAGRID_SET_EDIT_DATA:
      return state.setIn([action.id, 'session', 'isEditing'], true).setIn([action.id, 'editData'], action.data).setIn([action.id, 'cellMessages'], action.cellMessages);

    case _datagrid.TYPES.PLATFORM_DATAGRID_COLUMN_SETTINGS_MODAL_OPEN:
      return state.setIn([action.id, 'session', 'columnSettingsModal', 'open'], true);

    case _datagrid.TYPES.PLATFORM_DATAGRID_COLUMN_SETTINGS_MODAL_CLOSE:
      return state.deleteIn([action.id, 'session', 'columnSettingsModal']);

    case _datagrid.TYPES.PLATFORM_DATAGRID_COLUMN_SETTINGS_SAVE:
      return state.setIn([action.id, 'config', 'visibleColumns'], _immutable2.default.fromJS(action.columnOrder));

    default:
      return state;
  }
}