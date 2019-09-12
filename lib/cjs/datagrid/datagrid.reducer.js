"use strict";

exports.__esModule = true;
exports["default"] = datagridReducer;

var _immutable = _interopRequireWildcard(require("immutable"));

var _datagrid = require("./datagrid.actions");

var _datagrid2 = require("./datagrid.constants");

var _datagrid3 = _interopRequireDefault(require("./datagrid.utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function datagridReducer(state, action) {
  if (state === void 0) {
    state = _datagrid2.INITIAL_STATE;
  }

  switch (action.type) {
    case _datagrid.TYPES.PLATFORM_DATAGRID_INVALIDATE:
      return state.deleteIn([action.id, 'data']).deleteIn([action.id, 'allData']).deleteIn([action.id, 'session']).deleteIn([action.id, 'selectedCell']).deleteIn([action.id, 'editData']).deleteIn([action.id, 'createData']).deleteIn([action.id, 'createCellMessages']).deleteIn([action.id, 'cellMessages']);

    case _datagrid.TYPES.PLATFORM_DATAGRID_FORCE_REFRESH:
      return state.set('forceRefresh', Date.now());

    case _datagrid.TYPES.PLATFORM_DATAGRID_SET_DATA:
      return state.setIn([action.id, 'data'], action.data).setIn([action.id, 'allData'], action.data).setIn([action.id, 'config'], _immutable["default"].fromJS(action.config)).setIn([action.id, 'selectedItems'], _immutable["default"].fromJS(action.selectedItems)).mergeIn([action.id, 'session'], {
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
      return state.setIn([action.id, 'createData'], (0, _immutable.List)([_immutable["default"].fromJS(action.columnDefaultValues)])).deleteIn([action.id, 'selectedCell']).mergeIn([action.id, 'session'], {
        isCreating: true
      });

    case _datagrid.TYPES.PLATFORM_DATAGRID_ADD_NEW_ITEM:
      return state.updateIn([action.id, 'createData'], (0, _immutable.List)(), function (items) {
        return items.push(_immutable["default"].fromJS(action.columnDefaultValues));
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

    case _datagrid.TYPES.PLATFORM_DATAGRID_SET_FOCUS_TO:
      {
        // focus type is saved as a immutable Map to make it easier to detect changes
        // when requesting same type of focus several times
        return state.setIn([action.id, 'session', 'focusType'], (0, _immutable.Map)({
          type: action.focusTo,
          focusToLastRow: action.focusToLastRow
        }));
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

        var firstCreatedId = null;
        action.savedItems.forEach(function (savedItemJS) {
          var savedItem = _immutable["default"].fromJS(savedItemJS);

          var foundIndex = _allData.findIndex(function (d) {
            return d.getIn(action.idKeyPath) === savedItem.getIn(action.idKeyPath);
          });

          if (foundIndex === -1) {
            if (!firstCreatedId && savedItem.getIn(action.idKeyPath)) {
              firstCreatedId = savedItem.getIn(action.idKeyPath);
            }

            _allData = _allData.push(savedItem);
          } else {
            _allData = _allData.mergeDeepIn([foundIndex], savedItem);
          }
        });
        var newState = state.setIn([action.id, 'data'], _allData).setIn([action.id, 'allData'], _allData).mergeIn([action.id, 'session'], {
          isBusy: false,
          isEditing: false,
          isCreating: false
        }).deleteIn([action.id, 'editData']).deleteIn([action.id, 'createData']).deleteIn([action.id, 'createCellMessages', 'error']).deleteIn([action.id, 'cellMessages', 'error']);

        if (firstCreatedId) {
          _datagrid3["default"].saveSelectedItems(action.id, [firstCreatedId]);

          newState = newState.setIn([action.id, 'selectedItems'], (0, _immutable.List)([firstCreatedId]));
        }

        return newState;
      }

    case _datagrid.TYPES.PLATFORM_DATAGRID_SAVE_PARTIAL_SUCCESS:
      {
        var _allData2 = state.getIn([action.id, 'allData']);

        var createData = state.getIn([action.id, 'createData']);
        var editData = state.getIn([action.id, 'editData']);
        var isCreating = state.getIn([action.id, 'session', 'isCreating']);
        action.savedItems.forEach(function (savedItemJS) {
          var savedItem = _immutable["default"].fromJS(savedItemJS);

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
              createData = createData["delete"](foundIndex);
            }
          } else {
            editData = editData["delete"](savedItem.getIn(action.idKeyPath));
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
      return state.setIn([action.id, 'cellMessages', action.messageType, action.dataId].concat(action.keyPath), {
        id: action.messageId,
        values: action.messageValues
      });

    case _datagrid.TYPES.PLATFORM_DATAGRID_CELL_SHOW_MESSAGES:
      return state.mergeIn([action.id, 'cellMessages'], _immutable["default"].fromJS(action.messages));

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
      return state.setIn([action.id, 'createCellMessages', action.messageType, action.rowIndex].concat(action.keyPath), {
        id: action.messageId,
        values: action.messageValues
      });

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
        var _newState = state.setIn([action.id, 'session', 'lastClickedRowIndex'], action.rowIndex); // Handle case where shift key is pressed
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

            return _newState.setIn([action.id, 'selectedItems'], (0, _immutable.List)(selectRowIds));
          }
        }

        var dataId = state.getIn([action.id, 'data', action.rowIndex].concat(action.idKeyPath));
        var foundIndex = state.getIn([action.id, 'selectedItems'], (0, _immutable.List)()).indexOf(dataId);

        if (foundIndex === -1) {
          if (action.ctrlPressed) {
            return _newState.updateIn([action.id, 'selectedItems'], (0, _immutable.List)(), function (items) {
              return items.push(dataId);
            });
          }

          return _newState.setIn([action.id, 'selectedItems'], (0, _immutable.List)([dataId]));
        }

        if (action.ctrlPressed) {
          return _newState.updateIn([action.id, 'selectedItems'], function (items) {
            return items["delete"](foundIndex);
          });
        }

        return _newState.setIn([action.id, 'selectedItems'], (0, _immutable.List)([dataId]));
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
          return state.setIn([action.id, 'config', 'filteringData'], (0, _immutable.Map)({
            isFiltering: false
          })).setIn([action.id, 'data'], state.getIn([action.id, 'allData']));
        }

        return state.setIn([action.id, 'config', 'filteringData'], (0, _immutable.Map)({
          isFiltering: true
        }));
      }

    case _datagrid.TYPES.PLATFORM_DATAGRID_FILTER_DATA_CHANGE:
      return state.setIn([action.id, 'config', 'filteringData', 'filterData'], action.filterData);

    case _datagrid.TYPES.PLATFORM_DATAGRID_APPLY_FILTERS:
      return state.setIn([action.id, 'data'], action.data);

    case _datagrid.TYPES.PLATFORM_DATAGRID_SET_FILTERS:
      return state.setIn([action.id, 'config', 'filteringData'], action.filteringData);

    case _datagrid.TYPES.PLATFORM_DATAGRID_UPDATE_EXISTING_CELL_VALUE:
      {
        var _newState2 = state.setIn([action.id, 'allData', action.dataId].concat(action.keyPath), action.value);

        if (state.hasIn([action.id, 'data', action.dataId].concat(action.keyPath))) {
          return _newState2.setIn([action.id, 'data', action.dataId].concat(action.keyPath), action.value);
        }

        return _newState2;
      }

    case _datagrid.TYPES.PLATFORM_DATAGRID_SET_EDIT_DATA:
      return state.setIn([action.id, 'session', 'isEditing'], true).setIn([action.id, 'editData'], action.data).setIn([action.id, 'cellMessages'], action.cellMessages);

    case _datagrid.TYPES.PLATFORM_DATAGRID_COLUMN_SETTINGS_MODAL_OPEN:
      return state.setIn([action.id, 'session', 'columnSettingsModal', 'open'], true);

    case _datagrid.TYPES.PLATFORM_DATAGRID_COLUMN_SETTINGS_MODAL_CLOSE:
      return state.deleteIn([action.id, 'session', 'columnSettingsModal']);

    case _datagrid.TYPES.PLATFORM_DATAGRID_COLUMN_SETTINGS_SAVE:
      return state.setIn([action.id, 'config', 'visibleColumns'], _immutable["default"].fromJS(action.columnOrder));

    case _datagrid.TYPES.PLATFORM_DATAGRID_SET_PAGE:
      return state.setIn([action.id, 'config', 'page'], action.page);

    case _datagrid.TYPES.PLATFORM_DATAGRID_SET_ROWS_ON_PAGE:
      return state.setIn([action.id, 'config', 'rowsOnPage'], action.rowsOnPage);

    default:
      return state;
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5yZWR1Y2VyLmpzIl0sIm5hbWVzIjpbImRhdGFncmlkUmVkdWNlciIsInN0YXRlIiwiYWN0aW9uIiwiSU5JVElBTF9TVEFURSIsInR5cGUiLCJUWVBFUyIsIlBMQVRGT1JNX0RBVEFHUklEX0lOVkFMSURBVEUiLCJkZWxldGVJbiIsImlkIiwiUExBVEZPUk1fREFUQUdSSURfRk9SQ0VfUkVGUkVTSCIsInNldCIsIkRhdGUiLCJub3ciLCJQTEFURk9STV9EQVRBR1JJRF9TRVRfREFUQSIsInNldEluIiwiZGF0YSIsIkltbXV0YWJsZSIsImZyb21KUyIsImNvbmZpZyIsInNlbGVjdGVkSXRlbXMiLCJtZXJnZUluIiwiaXNFZGl0aW5nIiwiaXNDcmVhdGluZyIsImlzQnVzeSIsIlBMQVRGT1JNX0RBVEFHUklEX0JVU1kiLCJQTEFURk9STV9EQVRBR1JJRF9SRUFEWSIsIlBMQVRGT1JNX0RBVEFHUklEX0FQUExZX1NPUlQiLCJhbGxEYXRhIiwiUExBVEZPUk1fREFUQUdSSURfU09SVF9DSEFOR0UiLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwiUExBVEZPUk1fREFUQUdSSURfUkVTSVpFX0NPTFVNTiIsImNvbHVtbldpZHRocyIsIlBMQVRGT1JNX0RBVEFHUklEX0VESVQiLCJQTEFURk9STV9EQVRBR1JJRF9DUkVBVEUiLCJjb2x1bW5EZWZhdWx0VmFsdWVzIiwiUExBVEZPUk1fREFUQUdSSURfQUREX05FV19JVEVNIiwidXBkYXRlSW4iLCJpdGVtcyIsInB1c2giLCJQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfSVRFTSIsImFsbERhdGFJbmRleCIsImdldEluIiwiZmluZEluZGV4IiwiaXRlbSIsImlkS2V5UGF0aCIsInJvd0lkIiwiZGF0YUluZGV4IiwiUExBVEZPUk1fREFUQUdSSURfU0VUX0ZPQ1VTX1RPIiwiZm9jdXNUbyIsImZvY3VzVG9MYXN0Um93IiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNIiwiaW5kZXgiLCJQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU1TIiwiZmlsdGVyIiwidmFsIiwiaWR4IiwiaW5kZXhlcyIsImluZGV4T2YiLCJQTEFURk9STV9EQVRBR1JJRF9DQU5DRUwiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFIiwiUExBVEZPUk1fREFUQUdSSURfRVhURU5EX0RBVEEiLCJleHRlbmRlZERhdGEiLCJwcmVwZW5kIiwiY29uY2F0IiwiUExBVEZPUk1fREFUQUdSSURfU0FWRV9TVUNDRVNTIiwiZmlyc3RDcmVhdGVkSWQiLCJzYXZlZEl0ZW1zIiwiZm9yRWFjaCIsInNhdmVkSXRlbUpTIiwic2F2ZWRJdGVtIiwiZm91bmRJbmRleCIsImQiLCJtZXJnZURlZXBJbiIsIm5ld1N0YXRlIiwiVXRpbHMiLCJzYXZlU2VsZWN0ZWRJdGVtcyIsIlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfUEFSVElBTF9TVUNDRVNTIiwiY3JlYXRlRGF0YSIsImVkaXREYXRhIiwiZ2V0IiwidW5kZWZpbmVkIiwiUExBVEZPUk1fREFUQUdSSURfU0FWRV9GQUlMIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX1NVQ0NFU1MiLCJmaWx0ZXJOb3QiLCJyZW1vdmVkSWRzIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUwiLCJQTEFURk9STV9EQVRBR1JJRF9FRElUX0NFTExfVkFMVUVfQ0hBTkdFIiwiZGF0YUlkIiwia2V5UGF0aCIsInZhbHVlIiwiUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfQ0hBTkdFIiwicm93SW5kZXgiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRSIsIm1lc3NhZ2VUeXBlIiwibWVzc2FnZUlkIiwidmFsdWVzIiwibWVzc2FnZVZhbHVlcyIsIlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFUyIsIm1lc3NhZ2VzIiwiUExBVEZPUk1fREFUQUdSSURfQ0VMTF9ISURFX01FU1NBR0UiLCJyb3dNZXNzYWdlIiwic2l6ZSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX0hJREVfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0VMRUNUSU9OX0NIQU5HRSIsInNlbGVjdGVkQ2VsbCIsIlBMQVRGT1JNX0RBVEFHUklEX0lURU1fU0VMRUNUSU9OX0NIQU5HRSIsInNoaWZ0UHJlc3NlZCIsImxhc3RSb3dJbmRleCIsInNlbGVjdFJvd0lkcyIsImkiLCJjdHJsUHJlc3NlZCIsIlBMQVRGT1JNX0RBVEFHUklEX1NFTEVDVF9BTExfSVRFTVNfQ0hBTkdFIiwibWFwIiwiUExBVEZPUk1fREFUQUdSSURfQ0xFQVJfU0VMRUNURURfSVRFTVMiLCJQTEFURk9STV9EQVRBR1JJRF9UT0dHTEVfRklMVEVSSU5HIiwiaXNGaWx0ZXJpbmciLCJQTEFURk9STV9EQVRBR1JJRF9GSUxURVJfREFUQV9DSEFOR0UiLCJmaWx0ZXJEYXRhIiwiUExBVEZPUk1fREFUQUdSSURfQVBQTFlfRklMVEVSUyIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9GSUxURVJTIiwiZmlsdGVyaW5nRGF0YSIsIlBMQVRGT1JNX0RBVEFHUklEX1VQREFURV9FWElTVElOR19DRUxMX1ZBTFVFIiwiaGFzSW4iLCJQTEFURk9STV9EQVRBR1JJRF9TRVRfRURJVF9EQVRBIiwiY2VsbE1lc3NhZ2VzIiwiUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX09QRU4iLCJQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfQ0xPU0UiLCJQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfU0FWRSIsImNvbHVtbk9yZGVyIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX1BBR0UiLCJwYWdlIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX1JPV1NfT05fUEFHRSIsInJvd3NP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SSxLQUFLLENBQUNhLEtBQU4sQ0FBWSxDQUFDWixNQUFNLENBQUNNLEVBQVIsRUFBWSxRQUFaLEVBQXNCLE1BQXRCLENBQVosRUFBMkNOLE1BQU0sQ0FBQ21JLElBQWxELENBQVA7O0FBRUYsU0FBS2hJLGdCQUFNaUksa0NBQVg7QUFDRSxhQUFPckksS0FBSyxDQUFDYSxLQUFOLENBQVksQ0FBQ1osTUFBTSxDQUFDTSxFQUFSLEVBQVksUUFBWixFQUFzQixZQUF0QixDQUFaLEVBQWlETixNQUFNLENBQUNxSSxVQUF4RCxDQUFQOztBQUVGO0FBQ0UsYUFBT3RJLEtBQVA7QUFqYko7QUFtYkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSW1tdXRhYmxlLCB7IE1hcCwgTGlzdCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgeyBUWVBFUyB9IGZyb20gJy4vZGF0YWdyaWQuYWN0aW9ucyc7XG5pbXBvcnQgeyBJTklUSUFMX1NUQVRFIH0gZnJvbSAnLi9kYXRhZ3JpZC5jb25zdGFudHMnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4vZGF0YWdyaWQudXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkYXRhZ3JpZFJlZHVjZXIoc3RhdGUgPSBJTklUSUFMX1NUQVRFLCBhY3Rpb24pIHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfSU5WQUxJREFURTpcbiAgICAgIHJldHVybiBzdGF0ZVxuICAgICAgICAuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ2RhdGEnXSlcbiAgICAgICAgLmRlbGV0ZUluKFthY3Rpb24uaWQsICdhbGxEYXRhJ10pXG4gICAgICAgIC5kZWxldGVJbihbYWN0aW9uLmlkLCAnc2Vzc2lvbiddKVxuICAgICAgICAuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ3NlbGVjdGVkQ2VsbCddKVxuICAgICAgICAuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ2VkaXREYXRhJ10pXG4gICAgICAgIC5kZWxldGVJbihbYWN0aW9uLmlkLCAnY3JlYXRlRGF0YSddKVxuICAgICAgICAuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ2NyZWF0ZUNlbGxNZXNzYWdlcyddKVxuICAgICAgICAuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ2NlbGxNZXNzYWdlcyddKTtcblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfRk9SQ0VfUkVGUkVTSDpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXQoJ2ZvcmNlUmVmcmVzaCcsIERhdGUubm93KCkpO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfREFUQTpcbiAgICAgIHJldHVybiBzdGF0ZVxuICAgICAgICAuc2V0SW4oW2FjdGlvbi5pZCwgJ2RhdGEnXSwgYWN0aW9uLmRhdGEpXG4gICAgICAgIC5zZXRJbihbYWN0aW9uLmlkLCAnYWxsRGF0YSddLCBhY3Rpb24uZGF0YSlcbiAgICAgICAgLnNldEluKFthY3Rpb24uaWQsICdjb25maWcnXSwgSW1tdXRhYmxlLmZyb21KUyhhY3Rpb24uY29uZmlnKSlcbiAgICAgICAgLnNldEluKFthY3Rpb24uaWQsICdzZWxlY3RlZEl0ZW1zJ10sIEltbXV0YWJsZS5mcm9tSlMoYWN0aW9uLnNlbGVjdGVkSXRlbXMpKVxuICAgICAgICAubWVyZ2VJbihbYWN0aW9uLmlkLCAnc2Vzc2lvbiddLCB7XG4gICAgICAgICAgaXNFZGl0aW5nOiBmYWxzZSxcbiAgICAgICAgICBpc0NyZWF0aW5nOiBmYWxzZSxcbiAgICAgICAgICBpc0J1c3k6IGZhbHNlLFxuICAgICAgICB9KVxuICAgICAgICAuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ3NlbGVjdGVkQ2VsbCddKVxuICAgICAgICAuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ2VkaXREYXRhJ10pXG4gICAgICAgIC5kZWxldGVJbihbYWN0aW9uLmlkLCAnY3JlYXRlRGF0YSddKVxuICAgICAgICAuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ2NyZWF0ZUNlbGxNZXNzYWdlcyddKVxuICAgICAgICAuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ2NlbGxNZXNzYWdlcyddKTtcblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQlVTWTpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXRJbihbYWN0aW9uLmlkLCAnc2Vzc2lvbicsICdpc0J1c3knXSwgdHJ1ZSk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFQURZOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldEluKFthY3Rpb24uaWQsICdzZXNzaW9uJywgJ2lzQnVzeSddLCBmYWxzZSk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0FQUExZX1NPUlQ6XG4gICAgICByZXR1cm4gc3RhdGVcbiAgICAgICAgLnNldEluKFthY3Rpb24uaWQsICdkYXRhJ10sIGFjdGlvbi5kYXRhKVxuICAgICAgICAuc2V0SW4oW2FjdGlvbi5pZCwgJ2FsbERhdGEnXSwgYWN0aW9uLmFsbERhdGEpO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TT1JUX0NIQU5HRTpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXRJbihcbiAgICAgICAgW2FjdGlvbi5pZCwgJ2NvbmZpZycsICdzb3J0aW5nRGF0YSddLFxuICAgICAgICBNYXAoe1xuICAgICAgICAgIHNvcnRDb2x1bW46IGFjdGlvbi5zb3J0Q29sdW1uLFxuICAgICAgICAgIHNvcnRPcmRlcjogYWN0aW9uLnNvcnRPcmRlcixcbiAgICAgICAgfSksXG4gICAgICApO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRVNJWkVfQ09MVU1OOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldEluKFthY3Rpb24uaWQsICdjb25maWcnLCAnY29sdW1uV2lkdGhzJ10sIGFjdGlvbi5jb2x1bW5XaWR0aHMpO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9FRElUOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldEluKFthY3Rpb24uaWQsICdzZXNzaW9uJywgJ2lzRWRpdGluZyddLCB0cnVlKTtcblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFOlxuICAgICAgcmV0dXJuIHN0YXRlXG4gICAgICAgIC5zZXRJbihbYWN0aW9uLmlkLCAnY3JlYXRlRGF0YSddLCBMaXN0KFtJbW11dGFibGUuZnJvbUpTKGFjdGlvbi5jb2x1bW5EZWZhdWx0VmFsdWVzKV0pKVxuICAgICAgICAuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ3NlbGVjdGVkQ2VsbCddKVxuICAgICAgICAubWVyZ2VJbihbYWN0aW9uLmlkLCAnc2Vzc2lvbiddLCB7XG4gICAgICAgICAgaXNDcmVhdGluZzogdHJ1ZSxcbiAgICAgICAgfSk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0FERF9ORVdfSVRFTTpcbiAgICAgIHJldHVybiBzdGF0ZS51cGRhdGVJbihcbiAgICAgICAgW2FjdGlvbi5pZCwgJ2NyZWF0ZURhdGEnXSxcbiAgICAgICAgTGlzdCgpLFxuICAgICAgICBpdGVtcyA9PiBpdGVtcy5wdXNoKEltbXV0YWJsZS5mcm9tSlMoYWN0aW9uLmNvbHVtbkRlZmF1bHRWYWx1ZXMpKSxcbiAgICAgICk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9JVEVNOiB7XG4gICAgICBjb25zdCBhbGxEYXRhSW5kZXggPSBzdGF0ZVxuICAgICAgICAuZ2V0SW4oW2FjdGlvbi5pZCwgJ2FsbERhdGEnXSwgTGlzdCgpKVxuICAgICAgICAuZmluZEluZGV4KGl0ZW0gPT4gaXRlbS5nZXRJbihhY3Rpb24uaWRLZXlQYXRoKSA9PT0gYWN0aW9uLnJvd0lkKTtcbiAgICAgIGNvbnN0IGRhdGFJbmRleCA9IHN0YXRlXG4gICAgICAgIC5nZXRJbihbYWN0aW9uLmlkLCAnZGF0YSddLCBMaXN0KCkpXG4gICAgICAgIC5maW5kSW5kZXgoaXRlbSA9PiBpdGVtLmdldEluKGFjdGlvbi5pZEtleVBhdGgpID09PSBhY3Rpb24ucm93SWQpO1xuICAgICAgcmV0dXJuIHN0YXRlXG4gICAgICAgIC5kZWxldGVJbihbYWN0aW9uLmlkLCAnZGF0YScsIGRhdGFJbmRleF0pXG4gICAgICAgIC5kZWxldGVJbihbYWN0aW9uLmlkLCAnYWxsRGF0YScsIGFsbERhdGFJbmRleF0pXG4gICAgICAgIC5kZWxldGVJbihbYWN0aW9uLmlkLCAnZWRpdERhdGEnLCBhY3Rpb24ucm93SWRdKVxuICAgICAgICAuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ2NlbGxNZXNzYWdlcycsICdlcnJvcicsIGFjdGlvbi5yb3dJZF0pXG4gICAgICAgIC5kZWxldGVJbihbYWN0aW9uLmlkLCAnY2VsbE1lc3NhZ2VzJywgJ2luZm8nLCBhY3Rpb24ucm93SWRdKVxuICAgICAgICAuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ2NlbGxNZXNzYWdlcycsICd3YXJuaW5nJywgYWN0aW9uLnJvd0lkXSk7XG4gICAgfVxuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfRk9DVVNfVE86IHtcbiAgICAgIC8vIGZvY3VzIHR5cGUgaXMgc2F2ZWQgYXMgYSBpbW11dGFibGUgTWFwIHRvIG1ha2UgaXQgZWFzaWVyIHRvIGRldGVjdCBjaGFuZ2VzXG4gICAgICAvLyB3aGVuIHJlcXVlc3Rpbmcgc2FtZSB0eXBlIG9mIGZvY3VzIHNldmVyYWwgdGltZXNcbiAgICAgIHJldHVybiBzdGF0ZS5zZXRJbihcbiAgICAgICAgW2FjdGlvbi5pZCwgJ3Nlc3Npb24nLCAnZm9jdXNUeXBlJ10sXG4gICAgICAgIE1hcCh7IHR5cGU6IGFjdGlvbi5mb2N1c1RvLCBmb2N1c1RvTGFzdFJvdzogYWN0aW9uLmZvY3VzVG9MYXN0Um93IH0pLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTTpcbiAgICAgIHJldHVybiBzdGF0ZS5kZWxldGVJbihbYWN0aW9uLmlkLCAnY3JlYXRlRGF0YScsIGFjdGlvbi5pbmRleF0pO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU1TOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldEluKFxuICAgICAgICBbYWN0aW9uLmlkLCAnY3JlYXRlRGF0YSddLFxuICAgICAgICBzdGF0ZVxuICAgICAgICAgIC5nZXRJbihbYWN0aW9uLmlkLCAnY3JlYXRlRGF0YSddLCBMaXN0KCkpXG4gICAgICAgICAgLmZpbHRlcigodmFsLCBpZHgpID0+IGFjdGlvbi5pbmRleGVzLmluZGV4T2YoaWR4KSA9PT0gLTEpLFxuICAgICAgKTtcblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0FOQ0VMOlxuICAgICAgcmV0dXJuIHN0YXRlXG4gICAgICAgIC5tZXJnZUluKFxuICAgICAgICAgIFthY3Rpb24uaWQsICdzZXNzaW9uJ10sXG4gICAgICAgICAgTWFwKHtcbiAgICAgICAgICAgIGlzRWRpdGluZzogZmFsc2UsXG4gICAgICAgICAgICBpc0NyZWF0aW5nOiBmYWxzZSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgKVxuICAgICAgICAuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ2VkaXREYXRhJ10pXG4gICAgICAgIC5kZWxldGVJbihbYWN0aW9uLmlkLCAnY3JlYXRlRGF0YSddKVxuICAgICAgICAuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ2NyZWF0ZUNlbGxNZXNzYWdlcycsICdlcnJvciddKVxuICAgICAgICAuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ2NlbGxNZXNzYWdlcycsICdlcnJvciddKTtcblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0FWRTpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXRJbihbYWN0aW9uLmlkLCAnc2Vzc2lvbicsICdpc0J1c3knXSwgdHJ1ZSk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0VYVEVORF9EQVRBOiB7XG4gICAgICBjb25zdCBhbGxEYXRhID0gc3RhdGUuZ2V0SW4oW2FjdGlvbi5pZCwgJ2FsbERhdGEnXSk7XG4gICAgICBjb25zdCBleHRlbmRlZERhdGEgPSBhY3Rpb24ucHJlcGVuZFxuICAgICAgICA/IGFjdGlvbi5kYXRhLmNvbmNhdChhbGxEYXRhKVxuICAgICAgICA6IGFsbERhdGEuY29uY2F0KGFjdGlvbi5kYXRhKTtcblxuICAgICAgcmV0dXJuIHN0YXRlXG4gICAgICAgIC5zZXRJbihbYWN0aW9uLmlkLCAnZGF0YSddLCBleHRlbmRlZERhdGEpXG4gICAgICAgIC5zZXRJbihbYWN0aW9uLmlkLCAnYWxsRGF0YSddLCBleHRlbmRlZERhdGEpO1xuICAgIH1cblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0FWRV9TVUNDRVNTOiB7XG4gICAgICBsZXQgYWxsRGF0YSA9IHN0YXRlLmdldEluKFthY3Rpb24uaWQsICdhbGxEYXRhJ10pO1xuICAgICAgbGV0IGZpcnN0Q3JlYXRlZElkID0gbnVsbDtcblxuICAgICAgYWN0aW9uLnNhdmVkSXRlbXMuZm9yRWFjaCgoc2F2ZWRJdGVtSlMpID0+IHtcbiAgICAgICAgY29uc3Qgc2F2ZWRJdGVtID0gSW1tdXRhYmxlLmZyb21KUyhzYXZlZEl0ZW1KUyk7XG4gICAgICAgIGNvbnN0IGZvdW5kSW5kZXggPSBhbGxEYXRhLmZpbmRJbmRleChcbiAgICAgICAgICBkID0+IGQuZ2V0SW4oYWN0aW9uLmlkS2V5UGF0aCkgPT09IHNhdmVkSXRlbS5nZXRJbihhY3Rpb24uaWRLZXlQYXRoKSxcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGZvdW5kSW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgaWYgKCFmaXJzdENyZWF0ZWRJZCAmJiBzYXZlZEl0ZW0uZ2V0SW4oYWN0aW9uLmlkS2V5UGF0aCkpIHtcbiAgICAgICAgICAgIGZpcnN0Q3JlYXRlZElkID0gc2F2ZWRJdGVtLmdldEluKGFjdGlvbi5pZEtleVBhdGgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBhbGxEYXRhID0gYWxsRGF0YS5wdXNoKHNhdmVkSXRlbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWxsRGF0YSA9IGFsbERhdGEubWVyZ2VEZWVwSW4oW2ZvdW5kSW5kZXhdLCBzYXZlZEl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgbGV0IG5ld1N0YXRlID0gc3RhdGVcbiAgICAgICAgLnNldEluKFthY3Rpb24uaWQsICdkYXRhJ10sIGFsbERhdGEpXG4gICAgICAgIC5zZXRJbihbYWN0aW9uLmlkLCAnYWxsRGF0YSddLCBhbGxEYXRhKVxuICAgICAgICAubWVyZ2VJbihbYWN0aW9uLmlkLCAnc2Vzc2lvbiddLCB7XG4gICAgICAgICAgaXNCdXN5OiBmYWxzZSxcbiAgICAgICAgICBpc0VkaXRpbmc6IGZhbHNlLFxuICAgICAgICAgIGlzQ3JlYXRpbmc6IGZhbHNlLFxuICAgICAgICB9KVxuICAgICAgICAuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ2VkaXREYXRhJ10pXG4gICAgICAgIC5kZWxldGVJbihbYWN0aW9uLmlkLCAnY3JlYXRlRGF0YSddKVxuICAgICAgICAuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ2NyZWF0ZUNlbGxNZXNzYWdlcycsICdlcnJvciddKVxuICAgICAgICAuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ2NlbGxNZXNzYWdlcycsICdlcnJvciddKTtcblxuICAgICAgaWYgKGZpcnN0Q3JlYXRlZElkKSB7XG4gICAgICAgIFV0aWxzLnNhdmVTZWxlY3RlZEl0ZW1zKGFjdGlvbi5pZCwgW2ZpcnN0Q3JlYXRlZElkXSk7XG4gICAgICAgIG5ld1N0YXRlID0gbmV3U3RhdGUuc2V0SW4oW2FjdGlvbi5pZCwgJ3NlbGVjdGVkSXRlbXMnXSwgTGlzdChbZmlyc3RDcmVhdGVkSWRdKSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXdTdGF0ZTtcbiAgICB9XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfUEFSVElBTF9TVUNDRVNTOiB7XG4gICAgICBsZXQgYWxsRGF0YSA9IHN0YXRlLmdldEluKFthY3Rpb24uaWQsICdhbGxEYXRhJ10pO1xuICAgICAgbGV0IGNyZWF0ZURhdGEgPSBzdGF0ZS5nZXRJbihbYWN0aW9uLmlkLCAnY3JlYXRlRGF0YSddKTtcbiAgICAgIGxldCBlZGl0RGF0YSA9IHN0YXRlLmdldEluKFthY3Rpb24uaWQsICdlZGl0RGF0YSddKTtcbiAgICAgIGNvbnN0IGlzQ3JlYXRpbmcgPSBzdGF0ZS5nZXRJbihbYWN0aW9uLmlkLCAnc2Vzc2lvbicsICdpc0NyZWF0aW5nJ10pO1xuICAgICAgYWN0aW9uLnNhdmVkSXRlbXMuZm9yRWFjaCgoc2F2ZWRJdGVtSlMpID0+IHtcbiAgICAgICAgY29uc3Qgc2F2ZWRJdGVtID0gSW1tdXRhYmxlLmZyb21KUyhzYXZlZEl0ZW1KUyk7XG4gICAgICAgIGxldCBmb3VuZEluZGV4ID0gYWxsRGF0YS5maW5kSW5kZXgoXG4gICAgICAgICAgZCA9PiBkLmdldEluKGFjdGlvbi5pZEtleVBhdGgpID09PSBzYXZlZEl0ZW0uZ2V0SW4oYWN0aW9uLmlkS2V5UGF0aCksXG4gICAgICAgICk7XG4gICAgICAgIGlmIChmb3VuZEluZGV4ID09PSAtMSkge1xuICAgICAgICAgIGFsbERhdGEgPSBhbGxEYXRhLnB1c2goc2F2ZWRJdGVtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhbGxEYXRhID0gYWxsRGF0YS5tZXJnZURlZXBJbihbZm91bmRJbmRleF0sIHNhdmVkSXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQ3JlYXRpbmcpIHtcbiAgICAgICAgICBmb3VuZEluZGV4ID0gc2F2ZWRJdGVtLmdldCgncm93SW5kZXgnKTtcbiAgICAgICAgICBpZiAoZm91bmRJbmRleCAhPT0gdW5kZWZpbmVkICYmIGZvdW5kSW5kZXggIT09IG51bGwpIHtcbiAgICAgICAgICAgIGNyZWF0ZURhdGEgPSBjcmVhdGVEYXRhLmRlbGV0ZShmb3VuZEluZGV4KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWRpdERhdGEgPSBlZGl0RGF0YS5kZWxldGUoc2F2ZWRJdGVtLmdldEluKGFjdGlvbi5pZEtleVBhdGgpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gc3RhdGVcbiAgICAgICAgLnNldEluKFthY3Rpb24uaWQsICdkYXRhJ10sIGFsbERhdGEpXG4gICAgICAgIC5zZXRJbihbYWN0aW9uLmlkLCAnYWxsRGF0YSddLCBhbGxEYXRhKVxuICAgICAgICAuc2V0SW4oW2FjdGlvbi5pZCwgJ2NyZWF0ZURhdGEnXSwgY3JlYXRlRGF0YSlcbiAgICAgICAgLnNldEluKFthY3Rpb24uaWQsICdlZGl0RGF0YSddLCBlZGl0RGF0YSlcbiAgICAgICAgLnNldEluKFthY3Rpb24uaWQsICdzZXNzaW9uJywgJ2lzQnVzeSddLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TQVZFX0ZBSUw6XG4gICAgICByZXR1cm4gc3RhdGUuc2V0SW4oW2FjdGlvbi5pZCwgJ3Nlc3Npb24nLCAnaXNCdXN5J10sIGZhbHNlKTtcblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldEluKFthY3Rpb24uaWQsICdzZXNzaW9uJywgJ2lzQnVzeSddLCB0cnVlKTtcblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX1NVQ0NFU1M6XG4gICAgICByZXR1cm4gc3RhdGVcbiAgICAgICAgLnNldEluKFthY3Rpb24uaWQsICdzZXNzaW9uJywgJ2lzQnVzeSddLCBmYWxzZSlcbiAgICAgICAgLnVwZGF0ZUluKFxuICAgICAgICAgIFthY3Rpb24uaWQsICdkYXRhJ10sXG4gICAgICAgICAgZGF0YSA9PiBkYXRhLmZpbHRlck5vdChcbiAgICAgICAgICAgIGl0ZW0gPT4gYWN0aW9uLnJlbW92ZWRJZHMuaW5kZXhPZihpdGVtLmdldEluKGFjdGlvbi5pZEtleVBhdGgpKSA+IC0xLFxuICAgICAgICAgICksXG4gICAgICAgIClcbiAgICAgICAgLnVwZGF0ZUluKFxuICAgICAgICAgIFthY3Rpb24uaWQsICdhbGxEYXRhJ10sXG4gICAgICAgICAgZGF0YSA9PiBkYXRhLmZpbHRlck5vdChcbiAgICAgICAgICAgIGl0ZW0gPT4gYWN0aW9uLnJlbW92ZWRJZHMuaW5kZXhPZihpdGVtLmdldEluKGFjdGlvbi5pZEtleVBhdGgpKSA+IC0xLFxuICAgICAgICAgICksXG4gICAgICAgIClcbiAgICAgICAgLmRlbGV0ZUluKFthY3Rpb24uaWQsICdzZWxlY3RlZEl0ZW1zJ10pO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfRkFJTDpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXRJbihbYWN0aW9uLmlkLCAnc2Vzc2lvbicsICdpc0J1c3knXSwgZmFsc2UpO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9FRElUX0NFTExfVkFMVUVfQ0hBTkdFOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldEluKFthY3Rpb24uaWQsICdlZGl0RGF0YScsIGFjdGlvbi5kYXRhSWQsIC4uLmFjdGlvbi5rZXlQYXRoXSwgYWN0aW9uLnZhbHVlKTtcblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfQ0hBTkdFOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldEluKFxuICAgICAgICBbYWN0aW9uLmlkLCAnY3JlYXRlRGF0YScsIGFjdGlvbi5yb3dJbmRleCwgLi4uYWN0aW9uLmtleVBhdGhdLFxuICAgICAgICBhY3Rpb24udmFsdWUsXG4gICAgICApO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRTpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXRJbihcbiAgICAgICAgW2FjdGlvbi5pZCwgJ2NlbGxNZXNzYWdlcycsIGFjdGlvbi5tZXNzYWdlVHlwZSwgYWN0aW9uLmRhdGFJZCwgLi4uYWN0aW9uLmtleVBhdGhdLFxuICAgICAgICB7IGlkOiBhY3Rpb24ubWVzc2FnZUlkLCB2YWx1ZXM6IGFjdGlvbi5tZXNzYWdlVmFsdWVzIH0sXG4gICAgICApO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRVM6XG4gICAgICByZXR1cm4gc3RhdGUubWVyZ2VJbihbYWN0aW9uLmlkLCAnY2VsbE1lc3NhZ2VzJ10sIEltbXV0YWJsZS5mcm9tSlMoYWN0aW9uLm1lc3NhZ2VzKSk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfSElERV9NRVNTQUdFOiB7XG4gICAgICBpZiAoYWN0aW9uLm1lc3NhZ2VUeXBlID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBzdGF0ZS5kZWxldGVJbihbYWN0aW9uLmlkLCAnY2VsbE1lc3NhZ2VzJ10pO1xuICAgICAgfVxuICAgICAgaWYgKGFjdGlvbi5kYXRhSWQgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHN0YXRlLmRlbGV0ZUluKFthY3Rpb24uaWQsICdjZWxsTWVzc2FnZXMnLCBhY3Rpb24ubWVzc2FnZVR5cGVdKTtcbiAgICAgIH1cbiAgICAgIGxldCByb3dNZXNzYWdlID0gc3RhdGUuZ2V0SW4oW2FjdGlvbi5pZCwgJ2NlbGxNZXNzYWdlcycsIGFjdGlvbi5tZXNzYWdlVHlwZSwgYWN0aW9uLmRhdGFJZF0pO1xuICAgICAgaWYgKHJvd01lc3NhZ2UpIHtcbiAgICAgICAgaWYgKGFjdGlvbi5rZXlQYXRoKSB7XG4gICAgICAgICAgcm93TWVzc2FnZSA9IHJvd01lc3NhZ2UuZGVsZXRlSW4oYWN0aW9uLmtleVBhdGgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyb3dNZXNzYWdlLnNpemUgPT09IDAgfHwgIWFjdGlvbi5rZXlQYXRoKSB7XG4gICAgICAgICAgcmV0dXJuIHN0YXRlLmRlbGV0ZUluKFthY3Rpb24uaWQsICdjZWxsTWVzc2FnZXMnLCBhY3Rpb24ubWVzc2FnZVR5cGUsIGFjdGlvbi5kYXRhSWRdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RhdGUuc2V0SW4oXG4gICAgICAgICAgW2FjdGlvbi5pZCwgJ2NlbGxNZXNzYWdlcycsIGFjdGlvbi5tZXNzYWdlVHlwZSwgYWN0aW9uLmRhdGFJZF0sXG4gICAgICAgICAgcm93TWVzc2FnZSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRTpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXRJbihcbiAgICAgICAgW2FjdGlvbi5pZCwgJ2NyZWF0ZUNlbGxNZXNzYWdlcycsIGFjdGlvbi5tZXNzYWdlVHlwZSwgYWN0aW9uLnJvd0luZGV4LCAuLi5hY3Rpb24ua2V5UGF0aF0sXG4gICAgICAgIHsgaWQ6IGFjdGlvbi5tZXNzYWdlSWQsIHZhbHVlczogYWN0aW9uLm1lc3NhZ2VWYWx1ZXMgfSxcbiAgICAgICk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX0hJREVfTUVTU0FHRToge1xuICAgICAgaWYgKGFjdGlvbi5tZXNzYWdlVHlwZSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gc3RhdGUuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ2NyZWF0ZUNlbGxNZXNzYWdlcyddKTtcbiAgICAgIH1cbiAgICAgIGlmIChhY3Rpb24ucm93SW5kZXggPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHN0YXRlLmRlbGV0ZUluKFthY3Rpb24uaWQsICdjcmVhdGVDZWxsTWVzc2FnZXMnLCBhY3Rpb24ubWVzc2FnZVR5cGVdKTtcbiAgICAgIH1cbiAgICAgIGxldCByb3dNZXNzYWdlID0gc3RhdGUuZ2V0SW4oW1xuICAgICAgICBhY3Rpb24uaWQsXG4gICAgICAgICdjcmVhdGVDZWxsTWVzc2FnZXMnLFxuICAgICAgICBhY3Rpb24ubWVzc2FnZVR5cGUsXG4gICAgICAgIGFjdGlvbi5yb3dJbmRleCxcbiAgICAgIF0pO1xuICAgICAgaWYgKHJvd01lc3NhZ2UpIHtcbiAgICAgICAgaWYgKGFjdGlvbi5rZXlQYXRoKSB7XG4gICAgICAgICAgcm93TWVzc2FnZSA9IHJvd01lc3NhZ2UuZGVsZXRlSW4oYWN0aW9uLmtleVBhdGgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyb3dNZXNzYWdlLnNpemUgPT09IDAgfHwgIWFjdGlvbi5rZXlQYXRoKSB7XG4gICAgICAgICAgcmV0dXJuIHN0YXRlLmRlbGV0ZUluKFtcbiAgICAgICAgICAgIGFjdGlvbi5pZCxcbiAgICAgICAgICAgICdjcmVhdGVDZWxsTWVzc2FnZXMnLFxuICAgICAgICAgICAgYWN0aW9uLm1lc3NhZ2VUeXBlLFxuICAgICAgICAgICAgYWN0aW9uLnJvd0luZGV4LFxuICAgICAgICAgIF0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdGF0ZS5zZXRJbihcbiAgICAgICAgICBbYWN0aW9uLmlkLCAnY3JlYXRlQ2VsbE1lc3NhZ2VzJywgYWN0aW9uLm1lc3NhZ2VUeXBlLCBhY3Rpb24ucm93SW5kZXhdLFxuICAgICAgICAgIHJvd01lc3NhZ2UsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX1NFTEVDVElPTl9DSEFOR0U6XG4gICAgICByZXR1cm4gc3RhdGUuc2V0SW4oW2FjdGlvbi5pZCwgJ3NlbGVjdGVkQ2VsbCddLCBhY3Rpb24uc2VsZWN0ZWRDZWxsKTtcblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFOiB7XG4gICAgICBjb25zdCBuZXdTdGF0ZSA9IHN0YXRlLnNldEluKFthY3Rpb24uaWQsICdzZXNzaW9uJywgJ2xhc3RDbGlja2VkUm93SW5kZXgnXSwgYWN0aW9uLnJvd0luZGV4KTtcblxuICAgICAgLy8gSGFuZGxlIGNhc2Ugd2hlcmUgc2hpZnQga2V5IGlzIHByZXNzZWRcbiAgICAgIC8vIFNlbGVjdCBhbGwgcm93cyBmcm9tIGxhc3RDbGlja2VkUm93IHRvIGN1cnJlbnRseSBjbGlja2VkIHJvd1xuICAgICAgaWYgKGFjdGlvbi5zaGlmdFByZXNzZWQpIHtcbiAgICAgICAgY29uc3QgbGFzdFJvd0luZGV4ID0gc3RhdGUuZ2V0SW4oW2FjdGlvbi5pZCwgJ3Nlc3Npb24nLCAnbGFzdENsaWNrZWRSb3dJbmRleCddLCBmYWxzZSk7XG4gICAgICAgIGlmIChsYXN0Um93SW5kZXggIT09IGZhbHNlKSB7XG4gICAgICAgICAgY29uc3Qgc2VsZWN0Um93SWRzID0gW107XG4gICAgICAgICAgaWYgKGxhc3RSb3dJbmRleCA8IGFjdGlvbi5yb3dJbmRleCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IGxhc3RSb3dJbmRleDsgaSA8PSBhY3Rpb24ucm93SW5kZXg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICBjb25zdCBkYXRhSWQgPSBzdGF0ZS5nZXRJbihbYWN0aW9uLmlkLCAnZGF0YScsIGksIC4uLmFjdGlvbi5pZEtleVBhdGhdKTtcbiAgICAgICAgICAgICAgaWYgKGRhdGFJZCkge1xuICAgICAgICAgICAgICAgIHNlbGVjdFJvd0lkcy5wdXNoKGRhdGFJZCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IGFjdGlvbi5yb3dJbmRleDsgaSA8PSBsYXN0Um93SW5kZXg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICBjb25zdCBkYXRhSWQgPSBzdGF0ZS5nZXRJbihbYWN0aW9uLmlkLCAnZGF0YScsIGksIC4uLmFjdGlvbi5pZEtleVBhdGhdKTtcbiAgICAgICAgICAgICAgaWYgKGRhdGFJZCkge1xuICAgICAgICAgICAgICAgIHNlbGVjdFJvd0lkcy5wdXNoKGRhdGFJZCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5ld1N0YXRlLnNldEluKFthY3Rpb24uaWQsICdzZWxlY3RlZEl0ZW1zJ10sIExpc3Qoc2VsZWN0Um93SWRzKSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgZGF0YUlkID0gc3RhdGUuZ2V0SW4oW2FjdGlvbi5pZCwgJ2RhdGEnLCBhY3Rpb24ucm93SW5kZXgsIC4uLmFjdGlvbi5pZEtleVBhdGhdKTtcbiAgICAgIGNvbnN0IGZvdW5kSW5kZXggPSBzdGF0ZS5nZXRJbihbYWN0aW9uLmlkLCAnc2VsZWN0ZWRJdGVtcyddLCBMaXN0KCkpLmluZGV4T2YoZGF0YUlkKTtcbiAgICAgIGlmIChmb3VuZEluZGV4ID09PSAtMSkge1xuICAgICAgICBpZiAoYWN0aW9uLmN0cmxQcmVzc2VkKSB7XG4gICAgICAgICAgcmV0dXJuIG5ld1N0YXRlLnVwZGF0ZUluKFxuICAgICAgICAgICAgW2FjdGlvbi5pZCwgJ3NlbGVjdGVkSXRlbXMnXSxcbiAgICAgICAgICAgIExpc3QoKSxcbiAgICAgICAgICAgIGl0ZW1zID0+IGl0ZW1zLnB1c2goZGF0YUlkKSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdTdGF0ZS5zZXRJbihbYWN0aW9uLmlkLCAnc2VsZWN0ZWRJdGVtcyddLCBMaXN0KFtkYXRhSWRdKSk7XG4gICAgICB9XG4gICAgICBpZiAoYWN0aW9uLmN0cmxQcmVzc2VkKSB7XG4gICAgICAgIHJldHVybiBuZXdTdGF0ZS51cGRhdGVJbihbYWN0aW9uLmlkLCAnc2VsZWN0ZWRJdGVtcyddLCBpdGVtcyA9PiBpdGVtcy5kZWxldGUoZm91bmRJbmRleCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ld1N0YXRlLnNldEluKFthY3Rpb24uaWQsICdzZWxlY3RlZEl0ZW1zJ10sIExpc3QoW2RhdGFJZF0pKTtcbiAgICB9XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NFTEVDVF9BTExfSVRFTVNfQ0hBTkdFOlxuICAgICAgaWYgKFxuICAgICAgICBzdGF0ZS5nZXRJbihbYWN0aW9uLmlkLCAnc2VsZWN0ZWRJdGVtcyddLCBMaXN0KCkpLnNpemVcbiAgICAgICAgPT09IHN0YXRlLmdldEluKFthY3Rpb24uaWQsICdkYXRhJ10sIExpc3QoKSkuc2l6ZVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBzdGF0ZS5kZWxldGVJbihbYWN0aW9uLmlkLCAnc2VsZWN0ZWRJdGVtcyddKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdGF0ZS5zZXRJbihcbiAgICAgICAgW2FjdGlvbi5pZCwgJ3NlbGVjdGVkSXRlbXMnXSxcbiAgICAgICAgc3RhdGUuZ2V0SW4oW2FjdGlvbi5pZCwgJ2RhdGEnXSwgTGlzdCgpKS5tYXAoaXRlbSA9PiBpdGVtLmdldEluKGFjdGlvbi5pZEtleVBhdGgpKSxcbiAgICAgICk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NMRUFSX1NFTEVDVEVEX0lURU1TOlxuICAgICAgcmV0dXJuIHN0YXRlLmRlbGV0ZUluKFthY3Rpb24uaWQsICdzZWxlY3RlZEl0ZW1zJ10pO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9UT0dHTEVfRklMVEVSSU5HOiB7XG4gICAgICBpZiAoIWFjdGlvbi5pc0ZpbHRlcmluZykge1xuICAgICAgICByZXR1cm4gc3RhdGVcbiAgICAgICAgICAuc2V0SW4oW2FjdGlvbi5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJ10sIE1hcCh7IGlzRmlsdGVyaW5nOiBmYWxzZSB9KSlcbiAgICAgICAgICAuc2V0SW4oW2FjdGlvbi5pZCwgJ2RhdGEnXSwgc3RhdGUuZ2V0SW4oW2FjdGlvbi5pZCwgJ2FsbERhdGEnXSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0YXRlLnNldEluKFthY3Rpb24uaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YSddLCBNYXAoeyBpc0ZpbHRlcmluZzogdHJ1ZSB9KSk7XG4gICAgfVxuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9GSUxURVJfREFUQV9DSEFOR0U6XG4gICAgICByZXR1cm4gc3RhdGUuc2V0SW4oW2FjdGlvbi5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2ZpbHRlckRhdGEnXSwgYWN0aW9uLmZpbHRlckRhdGEpO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9BUFBMWV9GSUxURVJTOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldEluKFthY3Rpb24uaWQsICdkYXRhJ10sIGFjdGlvbi5kYXRhKTtcblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX0ZJTFRFUlM6XG4gICAgICByZXR1cm4gc3RhdGUuc2V0SW4oW2FjdGlvbi5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJ10sIGFjdGlvbi5maWx0ZXJpbmdEYXRhKTtcblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfVVBEQVRFX0VYSVNUSU5HX0NFTExfVkFMVUU6IHtcbiAgICAgIGNvbnN0IG5ld1N0YXRlID0gc3RhdGUuc2V0SW4oXG4gICAgICAgIFthY3Rpb24uaWQsICdhbGxEYXRhJywgYWN0aW9uLmRhdGFJZCwgLi4uYWN0aW9uLmtleVBhdGhdLFxuICAgICAgICBhY3Rpb24udmFsdWUsXG4gICAgICApO1xuICAgICAgaWYgKHN0YXRlLmhhc0luKFthY3Rpb24uaWQsICdkYXRhJywgYWN0aW9uLmRhdGFJZCwgLi4uYWN0aW9uLmtleVBhdGhdKSkge1xuICAgICAgICByZXR1cm4gbmV3U3RhdGUuc2V0SW4oW2FjdGlvbi5pZCwgJ2RhdGEnLCBhY3Rpb24uZGF0YUlkLCAuLi5hY3Rpb24ua2V5UGF0aF0sIGFjdGlvbi52YWx1ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3U3RhdGU7XG4gICAgfVxuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfRURJVF9EQVRBOlxuICAgICAgcmV0dXJuIHN0YXRlXG4gICAgICAgIC5zZXRJbihbYWN0aW9uLmlkLCAnc2Vzc2lvbicsICdpc0VkaXRpbmcnXSwgdHJ1ZSlcbiAgICAgICAgLnNldEluKFthY3Rpb24uaWQsICdlZGl0RGF0YSddLCBhY3Rpb24uZGF0YSlcbiAgICAgICAgLnNldEluKFthY3Rpb24uaWQsICdjZWxsTWVzc2FnZXMnXSwgYWN0aW9uLmNlbGxNZXNzYWdlcyk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9PUEVOOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldEluKFthY3Rpb24uaWQsICdzZXNzaW9uJywgJ2NvbHVtblNldHRpbmdzTW9kYWwnLCAnb3BlbiddLCB0cnVlKTtcblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX0NMT1NFOlxuICAgICAgcmV0dXJuIHN0YXRlLmRlbGV0ZUluKFthY3Rpb24uaWQsICdzZXNzaW9uJywgJ2NvbHVtblNldHRpbmdzTW9kYWwnXSk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldEluKFxuICAgICAgICBbYWN0aW9uLmlkLCAnY29uZmlnJywgJ3Zpc2libGVDb2x1bW5zJ10sXG4gICAgICAgIEltbXV0YWJsZS5mcm9tSlMoYWN0aW9uLmNvbHVtbk9yZGVyKSxcbiAgICAgICk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NFVF9QQUdFOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldEluKFthY3Rpb24uaWQsICdjb25maWcnLCAncGFnZSddLCBhY3Rpb24ucGFnZSk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NFVF9ST1dTX09OX1BBR0U6XG4gICAgICByZXR1cm4gc3RhdGUuc2V0SW4oW2FjdGlvbi5pZCwgJ2NvbmZpZycsICdyb3dzT25QYWdlJ10sIGFjdGlvbi5yb3dzT25QYWdlKTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn1cbiJdfQ==