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
      return state.setIn([action.id, 'config', 'filteringData', 'filterData'], _immutable["default"].fromJS(action.filterData));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5yZWR1Y2VyLmpzIl0sIm5hbWVzIjpbImRhdGFncmlkUmVkdWNlciIsInN0YXRlIiwiYWN0aW9uIiwiSU5JVElBTF9TVEFURSIsInR5cGUiLCJUWVBFUyIsIlBMQVRGT1JNX0RBVEFHUklEX0lOVkFMSURBVEUiLCJkZWxldGVJbiIsImlkIiwiUExBVEZPUk1fREFUQUdSSURfRk9SQ0VfUkVGUkVTSCIsInNldCIsIkRhdGUiLCJub3ciLCJQTEFURk9STV9EQVRBR1JJRF9TRVRfREFUQSIsInNldEluIiwiZGF0YSIsIkltbXV0YWJsZSIsImZyb21KUyIsImNvbmZpZyIsInNlbGVjdGVkSXRlbXMiLCJtZXJnZUluIiwiaXNFZGl0aW5nIiwiaXNDcmVhdGluZyIsImlzQnVzeSIsIlBMQVRGT1JNX0RBVEFHUklEX0JVU1kiLCJQTEFURk9STV9EQVRBR1JJRF9SRUFEWSIsIlBMQVRGT1JNX0RBVEFHUklEX0FQUExZX1NPUlQiLCJhbGxEYXRhIiwiUExBVEZPUk1fREFUQUdSSURfU09SVF9DSEFOR0UiLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwiUExBVEZPUk1fREFUQUdSSURfUkVTSVpFX0NPTFVNTiIsImNvbHVtbldpZHRocyIsIlBMQVRGT1JNX0RBVEFHUklEX0VESVQiLCJQTEFURk9STV9EQVRBR1JJRF9DUkVBVEUiLCJjb2x1bW5EZWZhdWx0VmFsdWVzIiwiUExBVEZPUk1fREFUQUdSSURfQUREX05FV19JVEVNIiwidXBkYXRlSW4iLCJpdGVtcyIsInB1c2giLCJQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfSVRFTSIsImFsbERhdGFJbmRleCIsImdldEluIiwiZmluZEluZGV4IiwiaXRlbSIsImlkS2V5UGF0aCIsInJvd0lkIiwiZGF0YUluZGV4IiwiUExBVEZPUk1fREFUQUdSSURfU0VUX0ZPQ1VTX1RPIiwiZm9jdXNUbyIsImZvY3VzVG9MYXN0Um93IiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNIiwiaW5kZXgiLCJQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU1TIiwiZmlsdGVyIiwidmFsIiwiaWR4IiwiaW5kZXhlcyIsImluZGV4T2YiLCJQTEFURk9STV9EQVRBR1JJRF9DQU5DRUwiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFIiwiUExBVEZPUk1fREFUQUdSSURfRVhURU5EX0RBVEEiLCJleHRlbmRlZERhdGEiLCJwcmVwZW5kIiwiY29uY2F0IiwiUExBVEZPUk1fREFUQUdSSURfU0FWRV9TVUNDRVNTIiwiZmlyc3RDcmVhdGVkSWQiLCJzYXZlZEl0ZW1zIiwiZm9yRWFjaCIsInNhdmVkSXRlbUpTIiwic2F2ZWRJdGVtIiwiZm91bmRJbmRleCIsImQiLCJtZXJnZURlZXBJbiIsIm5ld1N0YXRlIiwiVXRpbHMiLCJzYXZlU2VsZWN0ZWRJdGVtcyIsIlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfUEFSVElBTF9TVUNDRVNTIiwiY3JlYXRlRGF0YSIsImVkaXREYXRhIiwiZ2V0IiwidW5kZWZpbmVkIiwiUExBVEZPUk1fREFUQUdSSURfU0FWRV9GQUlMIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX1NVQ0NFU1MiLCJmaWx0ZXJOb3QiLCJyZW1vdmVkSWRzIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUwiLCJQTEFURk9STV9EQVRBR1JJRF9FRElUX0NFTExfVkFMVUVfQ0hBTkdFIiwiZGF0YUlkIiwia2V5UGF0aCIsInZhbHVlIiwiUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfQ0hBTkdFIiwicm93SW5kZXgiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRSIsIm1lc3NhZ2VUeXBlIiwibWVzc2FnZUlkIiwidmFsdWVzIiwibWVzc2FnZVZhbHVlcyIsIlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFUyIsIm1lc3NhZ2VzIiwiUExBVEZPUk1fREFUQUdSSURfQ0VMTF9ISURFX01FU1NBR0UiLCJyb3dNZXNzYWdlIiwic2l6ZSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX0hJREVfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0VMRUNUSU9OX0NIQU5HRSIsInNlbGVjdGVkQ2VsbCIsIlBMQVRGT1JNX0RBVEFHUklEX0lURU1fU0VMRUNUSU9OX0NIQU5HRSIsInNoaWZ0UHJlc3NlZCIsImxhc3RSb3dJbmRleCIsInNlbGVjdFJvd0lkcyIsImkiLCJjdHJsUHJlc3NlZCIsIlBMQVRGT1JNX0RBVEFHUklEX1NFTEVDVF9BTExfSVRFTVNfQ0hBTkdFIiwibWFwIiwiUExBVEZPUk1fREFUQUdSSURfQ0xFQVJfU0VMRUNURURfSVRFTVMiLCJQTEFURk9STV9EQVRBR1JJRF9UT0dHTEVfRklMVEVSSU5HIiwiaXNGaWx0ZXJpbmciLCJQTEFURk9STV9EQVRBR1JJRF9GSUxURVJfREFUQV9DSEFOR0UiLCJmaWx0ZXJEYXRhIiwiUExBVEZPUk1fREFUQUdSSURfQVBQTFlfRklMVEVSUyIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9GSUxURVJTIiwiZmlsdGVyaW5nRGF0YSIsIlBMQVRGT1JNX0RBVEFHUklEX1VQREFURV9FWElTVElOR19DRUxMX1ZBTFVFIiwiaGFzSW4iLCJQTEFURk9STV9EQVRBR1JJRF9TRVRfRURJVF9EQVRBIiwiY2VsbE1lc3NhZ2VzIiwiUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX09QRU4iLCJQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfQ0xPU0UiLCJQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfU0FWRSIsImNvbHVtbk9yZGVyIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX1BBR0UiLCJwYWdlIiwiUExBVEZPUk1fREFUQUdSSURfU0VUX1JPV1NfT05fUEFHRSIsInJvd3NPblBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBRWUsU0FBU0EsZUFBVCxDQUF5QkMsS0FBekIsRUFBZ0RDLE1BQWhELEVBQXdEO0FBQUEsTUFBL0JELEtBQStCO0FBQS9CQSxJQUFBQSxLQUErQixHQUF2QkUsd0JBQXVCO0FBQUE7O0FBQ3JFLFVBQVFELE1BQU0sQ0FBQ0UsSUFBZjtBQUNFLFNBQUtDLGdCQUFNQyw0QkFBWDtBQUNFLGFBQU9MLEtBQUssQ0FDVE0sUUFESSxDQUNLLENBQUNMLE1BQU0sQ0FBQ00sRUFBUixFQUFZLE1BQVosQ0FETCxFQUVKRCxRQUZJLENBRUssQ0FBQ0wsTUFBTSxDQUFDTSxFQUFSLEVBQVksU0FBWixDQUZMLEVBR0pELFFBSEksQ0FHSyxDQUFDTCxNQUFNLENBQUNNLEVBQVIsRUFBWSxTQUFaLENBSEwsRUFJSkQsUUFKSSxDQUlLLENBQUNMLE1BQU0sQ0FBQ00sRUFBUixFQUFZLGNBQVosQ0FKTCxFQUtKRCxRQUxJLENBS0ssQ0FBQ0wsTUFBTSxDQUFDTSxFQUFSLEVBQVksVUFBWixDQUxMLEVBTUpELFFBTkksQ0FNSyxDQUFDTCxNQUFNLENBQUNNLEVBQVIsRUFBWSxZQUFaLENBTkwsRUFPSkQsUUFQSSxDQU9LLENBQUNMLE1BQU0sQ0FBQ00sRUFBUixFQUFZLG9CQUFaLENBUEwsRUFRSkQsUUFSSSxDQVFLLENBQUNMLE1BQU0sQ0FBQ00sRUFBUixFQUFZLGNBQVosQ0FSTCxDQUFQOztBQVVGLFNBQUtILGdCQUFNSSwrQkFBWDtBQUNFLGFBQU9SLEtBQUssQ0FBQ1MsR0FBTixDQUFVLGNBQVYsRUFBMEJDLElBQUksQ0FBQ0MsR0FBTCxFQUExQixDQUFQOztBQUVGLFNBQUtQLGdCQUFNUSwwQkFBWDtBQUNFLGFBQU9aLEtBQUssQ0FDVGEsS0FESSxDQUNFLENBQUNaLE1BQU0sQ0FBQ00sRUFBUixFQUFZLE1BQVosQ0FERixFQUN1Qk4sTUFBTSxDQUFDYSxJQUQ5QixFQUVKRCxLQUZJLENBRUUsQ0FBQ1osTUFBTSxDQUFDTSxFQUFSLEVBQVksU0FBWixDQUZGLEVBRTBCTixNQUFNLENBQUNhLElBRmpDLEVBR0pELEtBSEksQ0FHRSxDQUFDWixNQUFNLENBQUNNLEVBQVIsRUFBWSxRQUFaLENBSEYsRUFHeUJRLHNCQUFVQyxNQUFWLENBQWlCZixNQUFNLENBQUNnQixNQUF4QixDQUh6QixFQUlKSixLQUpJLENBSUUsQ0FBQ1osTUFBTSxDQUFDTSxFQUFSLEVBQVksZUFBWixDQUpGLEVBSWdDUSxzQkFBVUMsTUFBVixDQUFpQmYsTUFBTSxDQUFDaUIsYUFBeEIsQ0FKaEMsRUFLSkMsT0FMSSxDQUtJLENBQUNsQixNQUFNLENBQUNNLEVBQVIsRUFBWSxTQUFaLENBTEosRUFLNEI7QUFDL0JhLFFBQUFBLFNBQVMsRUFBRSxLQURvQjtBQUUvQkMsUUFBQUEsVUFBVSxFQUFFLEtBRm1CO0FBRy9CQyxRQUFBQSxNQUFNLEVBQUU7QUFIdUIsT0FMNUIsRUFVSmhCLFFBVkksQ0FVSyxDQUFDTCxNQUFNLENBQUNNLEVBQVIsRUFBWSxjQUFaLENBVkwsRUFXSkQsUUFYSSxDQVdLLENBQUNMLE1BQU0sQ0FBQ00sRUFBUixFQUFZLFVBQVosQ0FYTCxFQVlKRCxRQVpJLENBWUssQ0FBQ0wsTUFBTSxDQUFDTSxFQUFSLEVBQVksWUFBWixDQVpMLEVBYUpELFFBYkksQ0FhSyxDQUFDTCxNQUFNLENBQUNNLEVBQVIsRUFBWSxvQkFBWixDQWJMLEVBY0pELFFBZEksQ0FjSyxDQUFDTCxNQUFNLENBQUNNLEVBQVIsRUFBWSxjQUFaLENBZEwsQ0FBUDs7QUFnQkYsU0FBS0gsZ0JBQU1tQixzQkFBWDtBQUNFLGFBQU92QixLQUFLLENBQUNhLEtBQU4sQ0FBWSxDQUFDWixNQUFNLENBQUNNLEVBQVIsRUFBWSxTQUFaLEVBQXVCLFFBQXZCLENBQVosRUFBOEMsSUFBOUMsQ0FBUDs7QUFFRixTQUFLSCxnQkFBTW9CLHVCQUFYO0FBQ0UsYUFBT3hCLEtBQUssQ0FBQ2EsS0FBTixDQUFZLENBQUNaLE1BQU0sQ0FBQ00sRUFBUixFQUFZLFNBQVosRUFBdUIsUUFBdkIsQ0FBWixFQUE4QyxLQUE5QyxDQUFQOztBQUVGLFNBQUtILGdCQUFNcUIsNEJBQVg7QUFDRSxhQUFPekIsS0FBSyxDQUNUYSxLQURJLENBQ0UsQ0FBQ1osTUFBTSxDQUFDTSxFQUFSLEVBQVksTUFBWixDQURGLEVBQ3VCTixNQUFNLENBQUNhLElBRDlCLEVBRUpELEtBRkksQ0FFRSxDQUFDWixNQUFNLENBQUNNLEVBQVIsRUFBWSxTQUFaLENBRkYsRUFFMEJOLE1BQU0sQ0FBQ3lCLE9BRmpDLENBQVA7O0FBSUYsU0FBS3RCLGdCQUFNdUIsNkJBQVg7QUFDRSxhQUFPM0IsS0FBSyxDQUFDYSxLQUFOLENBQ0wsQ0FBQ1osTUFBTSxDQUFDTSxFQUFSLEVBQVksUUFBWixFQUFzQixhQUF0QixDQURLLEVBRUwsb0JBQUk7QUFDRnFCLFFBQUFBLFVBQVUsRUFBRTNCLE1BQU0sQ0FBQzJCLFVBRGpCO0FBRUZDLFFBQUFBLFNBQVMsRUFBRTVCLE1BQU0sQ0FBQzRCO0FBRmhCLE9BQUosQ0FGSyxDQUFQOztBQVFGLFNBQUt6QixnQkFBTTBCLCtCQUFYO0FBQ0UsYUFBTzlCLEtBQUssQ0FBQ2EsS0FBTixDQUFZLENBQUNaLE1BQU0sQ0FBQ00sRUFBUixFQUFZLFFBQVosRUFBc0IsY0FBdEIsQ0FBWixFQUFtRE4sTUFBTSxDQUFDOEIsWUFBMUQsQ0FBUDs7QUFFRixTQUFLM0IsZ0JBQU00QixzQkFBWDtBQUNFLGFBQU9oQyxLQUFLLENBQUNhLEtBQU4sQ0FBWSxDQUFDWixNQUFNLENBQUNNLEVBQVIsRUFBWSxTQUFaLEVBQXVCLFdBQXZCLENBQVosRUFBaUQsSUFBakQsQ0FBUDs7QUFFRixTQUFLSCxnQkFBTTZCLHdCQUFYO0FBQ0UsYUFBT2pDLEtBQUssQ0FDVGEsS0FESSxDQUNFLENBQUNaLE1BQU0sQ0FBQ00sRUFBUixFQUFZLFlBQVosQ0FERixFQUM2QixxQkFBSyxDQUFDUSxzQkFBVUMsTUFBVixDQUFpQmYsTUFBTSxDQUFDaUMsbUJBQXhCLENBQUQsQ0FBTCxDQUQ3QixFQUVKNUIsUUFGSSxDQUVLLENBQUNMLE1BQU0sQ0FBQ00sRUFBUixFQUFZLGNBQVosQ0FGTCxFQUdKWSxPQUhJLENBR0ksQ0FBQ2xCLE1BQU0sQ0FBQ00sRUFBUixFQUFZLFNBQVosQ0FISixFQUc0QjtBQUMvQmMsUUFBQUEsVUFBVSxFQUFFO0FBRG1CLE9BSDVCLENBQVA7O0FBT0YsU0FBS2pCLGdCQUFNK0IsOEJBQVg7QUFDRSxhQUFPbkMsS0FBSyxDQUFDb0MsUUFBTixDQUNMLENBQUNuQyxNQUFNLENBQUNNLEVBQVIsRUFBWSxZQUFaLENBREssRUFFTCxzQkFGSyxFQUdMLFVBQUE4QixLQUFLO0FBQUEsZUFBSUEsS0FBSyxDQUFDQyxJQUFOLENBQVd2QixzQkFBVUMsTUFBVixDQUFpQmYsTUFBTSxDQUFDaUMsbUJBQXhCLENBQVgsQ0FBSjtBQUFBLE9BSEEsQ0FBUDs7QUFNRixTQUFLOUIsZ0JBQU1tQyw2QkFBWDtBQUEwQztBQUN4QyxZQUFNQyxZQUFZLEdBQUd4QyxLQUFLLENBQ3ZCeUMsS0FEa0IsQ0FDWixDQUFDeEMsTUFBTSxDQUFDTSxFQUFSLEVBQVksU0FBWixDQURZLEVBQ1ksc0JBRFosRUFFbEJtQyxTQUZrQixDQUVSLFVBQUFDLElBQUk7QUFBQSxpQkFBSUEsSUFBSSxDQUFDRixLQUFMLENBQVd4QyxNQUFNLENBQUMyQyxTQUFsQixNQUFpQzNDLE1BQU0sQ0FBQzRDLEtBQTVDO0FBQUEsU0FGSSxDQUFyQjtBQUdBLFlBQU1DLFNBQVMsR0FBRzlDLEtBQUssQ0FDcEJ5QyxLQURlLENBQ1QsQ0FBQ3hDLE1BQU0sQ0FBQ00sRUFBUixFQUFZLE1BQVosQ0FEUyxFQUNZLHNCQURaLEVBRWZtQyxTQUZlLENBRUwsVUFBQUMsSUFBSTtBQUFBLGlCQUFJQSxJQUFJLENBQUNGLEtBQUwsQ0FBV3hDLE1BQU0sQ0FBQzJDLFNBQWxCLE1BQWlDM0MsTUFBTSxDQUFDNEMsS0FBNUM7QUFBQSxTQUZDLENBQWxCO0FBR0EsZUFBTzdDLEtBQUssQ0FDVE0sUUFESSxDQUNLLENBQUNMLE1BQU0sQ0FBQ00sRUFBUixFQUFZLE1BQVosRUFBb0J1QyxTQUFwQixDQURMLEVBRUp4QyxRQUZJLENBRUssQ0FBQ0wsTUFBTSxDQUFDTSxFQUFSLEVBQVksU0FBWixFQUF1QmlDLFlBQXZCLENBRkwsRUFHSmxDLFFBSEksQ0FHSyxDQUFDTCxNQUFNLENBQUNNLEVBQVIsRUFBWSxVQUFaLEVBQXdCTixNQUFNLENBQUM0QyxLQUEvQixDQUhMLEVBSUp2QyxRQUpJLENBSUssQ0FBQ0wsTUFBTSxDQUFDTSxFQUFSLEVBQVksY0FBWixFQUE0QixPQUE1QixFQUFxQ04sTUFBTSxDQUFDNEMsS0FBNUMsQ0FKTCxFQUtKdkMsUUFMSSxDQUtLLENBQUNMLE1BQU0sQ0FBQ00sRUFBUixFQUFZLGNBQVosRUFBNEIsTUFBNUIsRUFBb0NOLE1BQU0sQ0FBQzRDLEtBQTNDLENBTEwsRUFNSnZDLFFBTkksQ0FNSyxDQUFDTCxNQUFNLENBQUNNLEVBQVIsRUFBWSxjQUFaLEVBQTRCLFNBQTVCLEVBQXVDTixNQUFNLENBQUM0QyxLQUE5QyxDQU5MLENBQVA7QUFPRDs7QUFFRCxTQUFLekMsZ0JBQU0yQyw4QkFBWDtBQUEyQztBQUN6QztBQUNBO0FBQ0EsZUFBTy9DLEtBQUssQ0FBQ2EsS0FBTixDQUNMLENBQUNaLE1BQU0sQ0FBQ00sRUFBUixFQUFZLFNBQVosRUFBdUIsV0FBdkIsQ0FESyxFQUVMLG9CQUFJO0FBQUVKLFVBQUFBLElBQUksRUFBRUYsTUFBTSxDQUFDK0MsT0FBZjtBQUF3QkMsVUFBQUEsY0FBYyxFQUFFaEQsTUFBTSxDQUFDZ0Q7QUFBL0MsU0FBSixDQUZLLENBQVA7QUFJRDs7QUFFRCxTQUFLN0MsZ0JBQU04QyxpQ0FBWDtBQUNFLGFBQU9sRCxLQUFLLENBQUNNLFFBQU4sQ0FBZSxDQUFDTCxNQUFNLENBQUNNLEVBQVIsRUFBWSxZQUFaLEVBQTBCTixNQUFNLENBQUNrRCxLQUFqQyxDQUFmLENBQVA7O0FBRUYsU0FBSy9DLGdCQUFNZ0Qsa0NBQVg7QUFDRSxhQUFPcEQsS0FBSyxDQUFDYSxLQUFOLENBQ0wsQ0FBQ1osTUFBTSxDQUFDTSxFQUFSLEVBQVksWUFBWixDQURLLEVBRUxQLEtBQUssQ0FDRnlDLEtBREgsQ0FDUyxDQUFDeEMsTUFBTSxDQUFDTSxFQUFSLEVBQVksWUFBWixDQURULEVBQ29DLHNCQURwQyxFQUVHOEMsTUFGSCxDQUVVLFVBQUNDLEdBQUQsRUFBTUMsR0FBTjtBQUFBLGVBQWN0RCxNQUFNLENBQUN1RCxPQUFQLENBQWVDLE9BQWYsQ0FBdUJGLEdBQXZCLE1BQWdDLENBQUMsQ0FBL0M7QUFBQSxPQUZWLENBRkssQ0FBUDs7QUFPRixTQUFLbkQsZ0JBQU1zRCx3QkFBWDtBQUNFLGFBQU8xRCxLQUFLLENBQ1RtQixPQURJLENBRUgsQ0FBQ2xCLE1BQU0sQ0FBQ00sRUFBUixFQUFZLFNBQVosQ0FGRyxFQUdILG9CQUFJO0FBQ0ZhLFFBQUFBLFNBQVMsRUFBRSxLQURUO0FBRUZDLFFBQUFBLFVBQVUsRUFBRTtBQUZWLE9BQUosQ0FIRyxFQVFKZixRQVJJLENBUUssQ0FBQ0wsTUFBTSxDQUFDTSxFQUFSLEVBQVksVUFBWixDQVJMLEVBU0pELFFBVEksQ0FTSyxDQUFDTCxNQUFNLENBQUNNLEVBQVIsRUFBWSxZQUFaLENBVEwsRUFVSkQsUUFWSSxDQVVLLENBQUNMLE1BQU0sQ0FBQ00sRUFBUixFQUFZLG9CQUFaLEVBQWtDLE9BQWxDLENBVkwsRUFXSkQsUUFYSSxDQVdLLENBQUNMLE1BQU0sQ0FBQ00sRUFBUixFQUFZLGNBQVosRUFBNEIsT0FBNUIsQ0FYTCxDQUFQOztBQWFGLFNBQUtILGdCQUFNdUQsc0JBQVg7QUFDRSxhQUFPM0QsS0FBSyxDQUFDYSxLQUFOLENBQVksQ0FBQ1osTUFBTSxDQUFDTSxFQUFSLEVBQVksU0FBWixFQUF1QixRQUF2QixDQUFaLEVBQThDLElBQTlDLENBQVA7O0FBRUYsU0FBS0gsZ0JBQU13RCw2QkFBWDtBQUEwQztBQUN4QyxZQUFNbEMsT0FBTyxHQUFHMUIsS0FBSyxDQUFDeUMsS0FBTixDQUFZLENBQUN4QyxNQUFNLENBQUNNLEVBQVIsRUFBWSxTQUFaLENBQVosQ0FBaEI7QUFDQSxZQUFNc0QsWUFBWSxHQUFHNUQsTUFBTSxDQUFDNkQsT0FBUCxHQUNqQjdELE1BQU0sQ0FBQ2EsSUFBUCxDQUFZaUQsTUFBWixDQUFtQnJDLE9BQW5CLENBRGlCLEdBRWpCQSxPQUFPLENBQUNxQyxNQUFSLENBQWU5RCxNQUFNLENBQUNhLElBQXRCLENBRko7QUFJQSxlQUFPZCxLQUFLLENBQ1RhLEtBREksQ0FDRSxDQUFDWixNQUFNLENBQUNNLEVBQVIsRUFBWSxNQUFaLENBREYsRUFDdUJzRCxZQUR2QixFQUVKaEQsS0FGSSxDQUVFLENBQUNaLE1BQU0sQ0FBQ00sRUFBUixFQUFZLFNBQVosQ0FGRixFQUUwQnNELFlBRjFCLENBQVA7QUFHRDs7QUFFRCxTQUFLekQsZ0JBQU00RCw4QkFBWDtBQUEyQztBQUN6QyxZQUFJdEMsUUFBTyxHQUFHMUIsS0FBSyxDQUFDeUMsS0FBTixDQUFZLENBQUN4QyxNQUFNLENBQUNNLEVBQVIsRUFBWSxTQUFaLENBQVosQ0FBZDs7QUFDQSxZQUFJMEQsY0FBYyxHQUFHLElBQXJCO0FBRUFoRSxRQUFBQSxNQUFNLENBQUNpRSxVQUFQLENBQWtCQyxPQUFsQixDQUEwQixVQUFDQyxXQUFELEVBQWlCO0FBQ3pDLGNBQU1DLFNBQVMsR0FBR3RELHNCQUFVQyxNQUFWLENBQWlCb0QsV0FBakIsQ0FBbEI7O0FBQ0EsY0FBTUUsVUFBVSxHQUFHNUMsUUFBTyxDQUFDZ0IsU0FBUixDQUNqQixVQUFBNkIsQ0FBQztBQUFBLG1CQUFJQSxDQUFDLENBQUM5QixLQUFGLENBQVF4QyxNQUFNLENBQUMyQyxTQUFmLE1BQThCeUIsU0FBUyxDQUFDNUIsS0FBVixDQUFnQnhDLE1BQU0sQ0FBQzJDLFNBQXZCLENBQWxDO0FBQUEsV0FEZ0IsQ0FBbkI7O0FBR0EsY0FBSTBCLFVBQVUsS0FBSyxDQUFDLENBQXBCLEVBQXVCO0FBQ3JCLGdCQUFJLENBQUNMLGNBQUQsSUFBbUJJLFNBQVMsQ0FBQzVCLEtBQVYsQ0FBZ0J4QyxNQUFNLENBQUMyQyxTQUF2QixDQUF2QixFQUEwRDtBQUN4RHFCLGNBQUFBLGNBQWMsR0FBR0ksU0FBUyxDQUFDNUIsS0FBVixDQUFnQnhDLE1BQU0sQ0FBQzJDLFNBQXZCLENBQWpCO0FBQ0Q7O0FBQ0RsQixZQUFBQSxRQUFPLEdBQUdBLFFBQU8sQ0FBQ1ksSUFBUixDQUFhK0IsU0FBYixDQUFWO0FBQ0QsV0FMRCxNQUtPO0FBQ0wzQyxZQUFBQSxRQUFPLEdBQUdBLFFBQU8sQ0FBQzhDLFdBQVIsQ0FBb0IsQ0FBQ0YsVUFBRCxDQUFwQixFQUFrQ0QsU0FBbEMsQ0FBVjtBQUNEO0FBQ0YsU0FiRDtBQWVBLFlBQUlJLFFBQVEsR0FBR3pFLEtBQUssQ0FDakJhLEtBRFksQ0FDTixDQUFDWixNQUFNLENBQUNNLEVBQVIsRUFBWSxNQUFaLENBRE0sRUFDZW1CLFFBRGYsRUFFWmIsS0FGWSxDQUVOLENBQUNaLE1BQU0sQ0FBQ00sRUFBUixFQUFZLFNBQVosQ0FGTSxFQUVrQm1CLFFBRmxCLEVBR1pQLE9BSFksQ0FHSixDQUFDbEIsTUFBTSxDQUFDTSxFQUFSLEVBQVksU0FBWixDQUhJLEVBR29CO0FBQy9CZSxVQUFBQSxNQUFNLEVBQUUsS0FEdUI7QUFFL0JGLFVBQUFBLFNBQVMsRUFBRSxLQUZvQjtBQUcvQkMsVUFBQUEsVUFBVSxFQUFFO0FBSG1CLFNBSHBCLEVBUVpmLFFBUlksQ0FRSCxDQUFDTCxNQUFNLENBQUNNLEVBQVIsRUFBWSxVQUFaLENBUkcsRUFTWkQsUUFUWSxDQVNILENBQUNMLE1BQU0sQ0FBQ00sRUFBUixFQUFZLFlBQVosQ0FURyxFQVVaRCxRQVZZLENBVUgsQ0FBQ0wsTUFBTSxDQUFDTSxFQUFSLEVBQVksb0JBQVosRUFBa0MsT0FBbEMsQ0FWRyxFQVdaRCxRQVhZLENBV0gsQ0FBQ0wsTUFBTSxDQUFDTSxFQUFSLEVBQVksY0FBWixFQUE0QixPQUE1QixDQVhHLENBQWY7O0FBYUEsWUFBSTBELGNBQUosRUFBb0I7QUFDbEJTLGdDQUFNQyxpQkFBTixDQUF3QjFFLE1BQU0sQ0FBQ00sRUFBL0IsRUFBbUMsQ0FBQzBELGNBQUQsQ0FBbkM7O0FBQ0FRLFVBQUFBLFFBQVEsR0FBR0EsUUFBUSxDQUFDNUQsS0FBVCxDQUFlLENBQUNaLE1BQU0sQ0FBQ00sRUFBUixFQUFZLGVBQVosQ0FBZixFQUE2QyxxQkFBSyxDQUFDMEQsY0FBRCxDQUFMLENBQTdDLENBQVg7QUFDRDs7QUFFRCxlQUFPUSxRQUFQO0FBQ0Q7O0FBRUQsU0FBS3JFLGdCQUFNd0Usc0NBQVg7QUFBbUQ7QUFDakQsWUFBSWxELFNBQU8sR0FBRzFCLEtBQUssQ0FBQ3lDLEtBQU4sQ0FBWSxDQUFDeEMsTUFBTSxDQUFDTSxFQUFSLEVBQVksU0FBWixDQUFaLENBQWQ7O0FBQ0EsWUFBSXNFLFVBQVUsR0FBRzdFLEtBQUssQ0FBQ3lDLEtBQU4sQ0FBWSxDQUFDeEMsTUFBTSxDQUFDTSxFQUFSLEVBQVksWUFBWixDQUFaLENBQWpCO0FBQ0EsWUFBSXVFLFFBQVEsR0FBRzlFLEtBQUssQ0FBQ3lDLEtBQU4sQ0FBWSxDQUFDeEMsTUFBTSxDQUFDTSxFQUFSLEVBQVksVUFBWixDQUFaLENBQWY7QUFDQSxZQUFNYyxVQUFVLEdBQUdyQixLQUFLLENBQUN5QyxLQUFOLENBQVksQ0FBQ3hDLE1BQU0sQ0FBQ00sRUFBUixFQUFZLFNBQVosRUFBdUIsWUFBdkIsQ0FBWixDQUFuQjtBQUNBTixRQUFBQSxNQUFNLENBQUNpRSxVQUFQLENBQWtCQyxPQUFsQixDQUEwQixVQUFDQyxXQUFELEVBQWlCO0FBQ3pDLGNBQU1DLFNBQVMsR0FBR3RELHNCQUFVQyxNQUFWLENBQWlCb0QsV0FBakIsQ0FBbEI7O0FBQ0EsY0FBSUUsVUFBVSxHQUFHNUMsU0FBTyxDQUFDZ0IsU0FBUixDQUNmLFVBQUE2QixDQUFDO0FBQUEsbUJBQUlBLENBQUMsQ0FBQzlCLEtBQUYsQ0FBUXhDLE1BQU0sQ0FBQzJDLFNBQWYsTUFBOEJ5QixTQUFTLENBQUM1QixLQUFWLENBQWdCeEMsTUFBTSxDQUFDMkMsU0FBdkIsQ0FBbEM7QUFBQSxXQURjLENBQWpCOztBQUdBLGNBQUkwQixVQUFVLEtBQUssQ0FBQyxDQUFwQixFQUF1QjtBQUNyQjVDLFlBQUFBLFNBQU8sR0FBR0EsU0FBTyxDQUFDWSxJQUFSLENBQWErQixTQUFiLENBQVY7QUFDRCxXQUZELE1BRU87QUFDTDNDLFlBQUFBLFNBQU8sR0FBR0EsU0FBTyxDQUFDOEMsV0FBUixDQUFvQixDQUFDRixVQUFELENBQXBCLEVBQWtDRCxTQUFsQyxDQUFWO0FBQ0Q7O0FBQ0QsY0FBSWhELFVBQUosRUFBZ0I7QUFDZGlELFlBQUFBLFVBQVUsR0FBR0QsU0FBUyxDQUFDVSxHQUFWLENBQWMsVUFBZCxDQUFiOztBQUNBLGdCQUFJVCxVQUFVLEtBQUtVLFNBQWYsSUFBNEJWLFVBQVUsS0FBSyxJQUEvQyxFQUFxRDtBQUNuRE8sY0FBQUEsVUFBVSxHQUFHQSxVQUFVLFVBQVYsQ0FBa0JQLFVBQWxCLENBQWI7QUFDRDtBQUNGLFdBTEQsTUFLTztBQUNMUSxZQUFBQSxRQUFRLEdBQUdBLFFBQVEsVUFBUixDQUFnQlQsU0FBUyxDQUFDNUIsS0FBVixDQUFnQnhDLE1BQU0sQ0FBQzJDLFNBQXZCLENBQWhCLENBQVg7QUFDRDtBQUNGLFNBbEJEO0FBbUJBLGVBQU81QyxLQUFLLENBQ1RhLEtBREksQ0FDRSxDQUFDWixNQUFNLENBQUNNLEVBQVIsRUFBWSxNQUFaLENBREYsRUFDdUJtQixTQUR2QixFQUVKYixLQUZJLENBRUUsQ0FBQ1osTUFBTSxDQUFDTSxFQUFSLEVBQVksU0FBWixDQUZGLEVBRTBCbUIsU0FGMUIsRUFHSmIsS0FISSxDQUdFLENBQUNaLE1BQU0sQ0FBQ00sRUFBUixFQUFZLFlBQVosQ0FIRixFQUc2QnNFLFVBSDdCLEVBSUpoRSxLQUpJLENBSUUsQ0FBQ1osTUFBTSxDQUFDTSxFQUFSLEVBQVksVUFBWixDQUpGLEVBSTJCdUUsUUFKM0IsRUFLSmpFLEtBTEksQ0FLRSxDQUFDWixNQUFNLENBQUNNLEVBQVIsRUFBWSxTQUFaLEVBQXVCLFFBQXZCLENBTEYsRUFLb0MsS0FMcEMsQ0FBUDtBQU1EOztBQUVELFNBQUtILGdCQUFNNkUsMkJBQVg7QUFDRSxhQUFPakYsS0FBSyxDQUFDYSxLQUFOLENBQVksQ0FBQ1osTUFBTSxDQUFDTSxFQUFSLEVBQVksU0FBWixFQUF1QixRQUF2QixDQUFaLEVBQThDLEtBQTlDLENBQVA7O0FBRUYsU0FBS0gsZ0JBQU04RSx3QkFBWDtBQUNFLGFBQU9sRixLQUFLLENBQUNhLEtBQU4sQ0FBWSxDQUFDWixNQUFNLENBQUNNLEVBQVIsRUFBWSxTQUFaLEVBQXVCLFFBQXZCLENBQVosRUFBOEMsSUFBOUMsQ0FBUDs7QUFFRixTQUFLSCxnQkFBTStFLGdDQUFYO0FBQ0UsYUFBT25GLEtBQUssQ0FDVGEsS0FESSxDQUNFLENBQUNaLE1BQU0sQ0FBQ00sRUFBUixFQUFZLFNBQVosRUFBdUIsUUFBdkIsQ0FERixFQUNvQyxLQURwQyxFQUVKNkIsUUFGSSxDQUdILENBQUNuQyxNQUFNLENBQUNNLEVBQVIsRUFBWSxNQUFaLENBSEcsRUFJSCxVQUFBTyxJQUFJO0FBQUEsZUFBSUEsSUFBSSxDQUFDc0UsU0FBTCxDQUNOLFVBQUF6QyxJQUFJO0FBQUEsaUJBQUkxQyxNQUFNLENBQUNvRixVQUFQLENBQWtCNUIsT0FBbEIsQ0FBMEJkLElBQUksQ0FBQ0YsS0FBTCxDQUFXeEMsTUFBTSxDQUFDMkMsU0FBbEIsQ0FBMUIsSUFBMEQsQ0FBQyxDQUEvRDtBQUFBLFNBREUsQ0FBSjtBQUFBLE9BSkQsRUFRSlIsUUFSSSxDQVNILENBQUNuQyxNQUFNLENBQUNNLEVBQVIsRUFBWSxTQUFaLENBVEcsRUFVSCxVQUFBTyxJQUFJO0FBQUEsZUFBSUEsSUFBSSxDQUFDc0UsU0FBTCxDQUNOLFVBQUF6QyxJQUFJO0FBQUEsaUJBQUkxQyxNQUFNLENBQUNvRixVQUFQLENBQWtCNUIsT0FBbEIsQ0FBMEJkLElBQUksQ0FBQ0YsS0FBTCxDQUFXeEMsTUFBTSxDQUFDMkMsU0FBbEIsQ0FBMUIsSUFBMEQsQ0FBQyxDQUEvRDtBQUFBLFNBREUsQ0FBSjtBQUFBLE9BVkQsRUFjSnRDLFFBZEksQ0FjSyxDQUFDTCxNQUFNLENBQUNNLEVBQVIsRUFBWSxlQUFaLENBZEwsQ0FBUDs7QUFnQkYsU0FBS0gsZ0JBQU1rRiw2QkFBWDtBQUNFLGFBQU90RixLQUFLLENBQUNhLEtBQU4sQ0FBWSxDQUFDWixNQUFNLENBQUNNLEVBQVIsRUFBWSxTQUFaLEVBQXVCLFFBQXZCLENBQVosRUFBOEMsS0FBOUMsQ0FBUDs7QUFFRixTQUFLSCxnQkFBTW1GLHdDQUFYO0FBQ0UsYUFBT3ZGLEtBQUssQ0FBQ2EsS0FBTixFQUFhWixNQUFNLENBQUNNLEVBQXBCLEVBQXdCLFVBQXhCLEVBQW9DTixNQUFNLENBQUN1RixNQUEzQyxTQUFzRHZGLE1BQU0sQ0FBQ3dGLE9BQTdELEdBQXVFeEYsTUFBTSxDQUFDeUYsS0FBOUUsQ0FBUDs7QUFFRixTQUFLdEYsZ0JBQU11RiwwQ0FBWDtBQUNFLGFBQU8zRixLQUFLLENBQUNhLEtBQU4sRUFDSlosTUFBTSxDQUFDTSxFQURILEVBQ08sWUFEUCxFQUNxQk4sTUFBTSxDQUFDMkYsUUFENUIsU0FDeUMzRixNQUFNLENBQUN3RixPQURoRCxHQUVMeEYsTUFBTSxDQUFDeUYsS0FGRixDQUFQOztBQUtGLFNBQUt0RixnQkFBTXlGLG1DQUFYO0FBQ0UsYUFBTzdGLEtBQUssQ0FBQ2EsS0FBTixFQUNKWixNQUFNLENBQUNNLEVBREgsRUFDTyxjQURQLEVBQ3VCTixNQUFNLENBQUM2RixXQUQ5QixFQUMyQzdGLE1BQU0sQ0FBQ3VGLE1BRGxELFNBQzZEdkYsTUFBTSxDQUFDd0YsT0FEcEUsR0FFTDtBQUFFbEYsUUFBQUEsRUFBRSxFQUFFTixNQUFNLENBQUM4RixTQUFiO0FBQXdCQyxRQUFBQSxNQUFNLEVBQUUvRixNQUFNLENBQUNnRztBQUF2QyxPQUZLLENBQVA7O0FBS0YsU0FBSzdGLGdCQUFNOEYsb0NBQVg7QUFDRSxhQUFPbEcsS0FBSyxDQUFDbUIsT0FBTixDQUFjLENBQUNsQixNQUFNLENBQUNNLEVBQVIsRUFBWSxjQUFaLENBQWQsRUFBMkNRLHNCQUFVQyxNQUFWLENBQWlCZixNQUFNLENBQUNrRyxRQUF4QixDQUEzQyxDQUFQOztBQUVGLFNBQUsvRixnQkFBTWdHLG1DQUFYO0FBQWdEO0FBQzlDLFlBQUluRyxNQUFNLENBQUM2RixXQUFQLEtBQXVCLElBQTNCLEVBQWlDO0FBQy9CLGlCQUFPOUYsS0FBSyxDQUFDTSxRQUFOLENBQWUsQ0FBQ0wsTUFBTSxDQUFDTSxFQUFSLEVBQVksY0FBWixDQUFmLENBQVA7QUFDRDs7QUFDRCxZQUFJTixNQUFNLENBQUN1RixNQUFQLEtBQWtCLElBQXRCLEVBQTRCO0FBQzFCLGlCQUFPeEYsS0FBSyxDQUFDTSxRQUFOLENBQWUsQ0FBQ0wsTUFBTSxDQUFDTSxFQUFSLEVBQVksY0FBWixFQUE0Qk4sTUFBTSxDQUFDNkYsV0FBbkMsQ0FBZixDQUFQO0FBQ0Q7O0FBQ0QsWUFBSU8sVUFBVSxHQUFHckcsS0FBSyxDQUFDeUMsS0FBTixDQUFZLENBQUN4QyxNQUFNLENBQUNNLEVBQVIsRUFBWSxjQUFaLEVBQTRCTixNQUFNLENBQUM2RixXQUFuQyxFQUFnRDdGLE1BQU0sQ0FBQ3VGLE1BQXZELENBQVosQ0FBakI7O0FBQ0EsWUFBSWEsVUFBSixFQUFnQjtBQUNkLGNBQUlwRyxNQUFNLENBQUN3RixPQUFYLEVBQW9CO0FBQ2xCWSxZQUFBQSxVQUFVLEdBQUdBLFVBQVUsQ0FBQy9GLFFBQVgsQ0FBb0JMLE1BQU0sQ0FBQ3dGLE9BQTNCLENBQWI7QUFDRDs7QUFDRCxjQUFJWSxVQUFVLENBQUNDLElBQVgsS0FBb0IsQ0FBcEIsSUFBeUIsQ0FBQ3JHLE1BQU0sQ0FBQ3dGLE9BQXJDLEVBQThDO0FBQzVDLG1CQUFPekYsS0FBSyxDQUFDTSxRQUFOLENBQWUsQ0FBQ0wsTUFBTSxDQUFDTSxFQUFSLEVBQVksY0FBWixFQUE0Qk4sTUFBTSxDQUFDNkYsV0FBbkMsRUFBZ0Q3RixNQUFNLENBQUN1RixNQUF2RCxDQUFmLENBQVA7QUFDRDs7QUFDRCxpQkFBT3hGLEtBQUssQ0FBQ2EsS0FBTixDQUNMLENBQUNaLE1BQU0sQ0FBQ00sRUFBUixFQUFZLGNBQVosRUFBNEJOLE1BQU0sQ0FBQzZGLFdBQW5DLEVBQWdEN0YsTUFBTSxDQUFDdUYsTUFBdkQsQ0FESyxFQUVMYSxVQUZLLENBQVA7QUFJRDs7QUFDRCxlQUFPckcsS0FBUDtBQUNEOztBQUVELFNBQUtJLGdCQUFNbUcsMENBQVg7QUFDRSxhQUFPdkcsS0FBSyxDQUFDYSxLQUFOLEVBQ0paLE1BQU0sQ0FBQ00sRUFESCxFQUNPLG9CQURQLEVBQzZCTixNQUFNLENBQUM2RixXQURwQyxFQUNpRDdGLE1BQU0sQ0FBQzJGLFFBRHhELFNBQ3FFM0YsTUFBTSxDQUFDd0YsT0FENUUsR0FFTDtBQUFFbEYsUUFBQUEsRUFBRSxFQUFFTixNQUFNLENBQUM4RixTQUFiO0FBQXdCQyxRQUFBQSxNQUFNLEVBQUUvRixNQUFNLENBQUNnRztBQUF2QyxPQUZLLENBQVA7O0FBS0YsU0FBSzdGLGdCQUFNb0csMENBQVg7QUFBdUQ7QUFDckQsWUFBSXZHLE1BQU0sQ0FBQzZGLFdBQVAsS0FBdUIsSUFBM0IsRUFBaUM7QUFDL0IsaUJBQU85RixLQUFLLENBQUNNLFFBQU4sQ0FBZSxDQUFDTCxNQUFNLENBQUNNLEVBQVIsRUFBWSxvQkFBWixDQUFmLENBQVA7QUFDRDs7QUFDRCxZQUFJTixNQUFNLENBQUMyRixRQUFQLEtBQW9CLElBQXhCLEVBQThCO0FBQzVCLGlCQUFPNUYsS0FBSyxDQUFDTSxRQUFOLENBQWUsQ0FBQ0wsTUFBTSxDQUFDTSxFQUFSLEVBQVksb0JBQVosRUFBa0NOLE1BQU0sQ0FBQzZGLFdBQXpDLENBQWYsQ0FBUDtBQUNEOztBQUNELFlBQUlPLFdBQVUsR0FBR3JHLEtBQUssQ0FBQ3lDLEtBQU4sQ0FBWSxDQUMzQnhDLE1BQU0sQ0FBQ00sRUFEb0IsRUFFM0Isb0JBRjJCLEVBRzNCTixNQUFNLENBQUM2RixXQUhvQixFQUkzQjdGLE1BQU0sQ0FBQzJGLFFBSm9CLENBQVosQ0FBakI7O0FBTUEsWUFBSVMsV0FBSixFQUFnQjtBQUNkLGNBQUlwRyxNQUFNLENBQUN3RixPQUFYLEVBQW9CO0FBQ2xCWSxZQUFBQSxXQUFVLEdBQUdBLFdBQVUsQ0FBQy9GLFFBQVgsQ0FBb0JMLE1BQU0sQ0FBQ3dGLE9BQTNCLENBQWI7QUFDRDs7QUFDRCxjQUFJWSxXQUFVLENBQUNDLElBQVgsS0FBb0IsQ0FBcEIsSUFBeUIsQ0FBQ3JHLE1BQU0sQ0FBQ3dGLE9BQXJDLEVBQThDO0FBQzVDLG1CQUFPekYsS0FBSyxDQUFDTSxRQUFOLENBQWUsQ0FDcEJMLE1BQU0sQ0FBQ00sRUFEYSxFQUVwQixvQkFGb0IsRUFHcEJOLE1BQU0sQ0FBQzZGLFdBSGEsRUFJcEI3RixNQUFNLENBQUMyRixRQUphLENBQWYsQ0FBUDtBQU1EOztBQUNELGlCQUFPNUYsS0FBSyxDQUFDYSxLQUFOLENBQ0wsQ0FBQ1osTUFBTSxDQUFDTSxFQUFSLEVBQVksb0JBQVosRUFBa0NOLE1BQU0sQ0FBQzZGLFdBQXpDLEVBQXNEN0YsTUFBTSxDQUFDMkYsUUFBN0QsQ0FESyxFQUVMUyxXQUZLLENBQVA7QUFJRDs7QUFDRCxlQUFPckcsS0FBUDtBQUNEOztBQUVELFNBQUtJLGdCQUFNcUcsdUNBQVg7QUFDRSxhQUFPekcsS0FBSyxDQUFDYSxLQUFOLENBQVksQ0FBQ1osTUFBTSxDQUFDTSxFQUFSLEVBQVksY0FBWixDQUFaLEVBQXlDTixNQUFNLENBQUN5RyxZQUFoRCxDQUFQOztBQUVGLFNBQUt0RyxnQkFBTXVHLHVDQUFYO0FBQW9EO0FBQ2xELFlBQU1sQyxTQUFRLEdBQUd6RSxLQUFLLENBQUNhLEtBQU4sQ0FBWSxDQUFDWixNQUFNLENBQUNNLEVBQVIsRUFBWSxTQUFaLEVBQXVCLHFCQUF2QixDQUFaLEVBQTJETixNQUFNLENBQUMyRixRQUFsRSxDQUFqQixDQURrRCxDQUdsRDtBQUNBOzs7QUFDQSxZQUFJM0YsTUFBTSxDQUFDMkcsWUFBWCxFQUF5QjtBQUN2QixjQUFNQyxZQUFZLEdBQUc3RyxLQUFLLENBQUN5QyxLQUFOLENBQVksQ0FBQ3hDLE1BQU0sQ0FBQ00sRUFBUixFQUFZLFNBQVosRUFBdUIscUJBQXZCLENBQVosRUFBMkQsS0FBM0QsQ0FBckI7O0FBQ0EsY0FBSXNHLFlBQVksS0FBSyxLQUFyQixFQUE0QjtBQUMxQixnQkFBTUMsWUFBWSxHQUFHLEVBQXJCOztBQUNBLGdCQUFJRCxZQUFZLEdBQUc1RyxNQUFNLENBQUMyRixRQUExQixFQUFvQztBQUNsQyxtQkFBSyxJQUFJbUIsQ0FBQyxHQUFHRixZQUFiLEVBQTJCRSxDQUFDLElBQUk5RyxNQUFNLENBQUMyRixRQUF2QyxFQUFpRG1CLENBQUMsSUFBSSxDQUF0RCxFQUF5RDtBQUN2RCxvQkFBTXZCLE9BQU0sR0FBR3hGLEtBQUssQ0FBQ3lDLEtBQU4sRUFBYXhDLE1BQU0sQ0FBQ00sRUFBcEIsRUFBd0IsTUFBeEIsRUFBZ0N3RyxDQUFoQyxTQUFzQzlHLE1BQU0sQ0FBQzJDLFNBQTdDLEVBQWY7O0FBQ0Esb0JBQUk0QyxPQUFKLEVBQVk7QUFDVnNCLGtCQUFBQSxZQUFZLENBQUN4RSxJQUFiLENBQWtCa0QsT0FBbEI7QUFDRDtBQUNGO0FBQ0YsYUFQRCxNQU9PO0FBQ0wsbUJBQUssSUFBSXVCLEVBQUMsR0FBRzlHLE1BQU0sQ0FBQzJGLFFBQXBCLEVBQThCbUIsRUFBQyxJQUFJRixZQUFuQyxFQUFpREUsRUFBQyxJQUFJLENBQXRELEVBQXlEO0FBQ3ZELG9CQUFNdkIsUUFBTSxHQUFHeEYsS0FBSyxDQUFDeUMsS0FBTixFQUFheEMsTUFBTSxDQUFDTSxFQUFwQixFQUF3QixNQUF4QixFQUFnQ3dHLEVBQWhDLFNBQXNDOUcsTUFBTSxDQUFDMkMsU0FBN0MsRUFBZjs7QUFDQSxvQkFBSTRDLFFBQUosRUFBWTtBQUNWc0Isa0JBQUFBLFlBQVksQ0FBQ3hFLElBQWIsQ0FBa0JrRCxRQUFsQjtBQUNEO0FBQ0Y7QUFDRjs7QUFDRCxtQkFBT2YsU0FBUSxDQUFDNUQsS0FBVCxDQUFlLENBQUNaLE1BQU0sQ0FBQ00sRUFBUixFQUFZLGVBQVosQ0FBZixFQUE2QyxxQkFBS3VHLFlBQUwsQ0FBN0MsQ0FBUDtBQUNEO0FBQ0Y7O0FBRUQsWUFBTXRCLE1BQU0sR0FBR3hGLEtBQUssQ0FBQ3lDLEtBQU4sRUFBYXhDLE1BQU0sQ0FBQ00sRUFBcEIsRUFBd0IsTUFBeEIsRUFBZ0NOLE1BQU0sQ0FBQzJGLFFBQXZDLFNBQW9EM0YsTUFBTSxDQUFDMkMsU0FBM0QsRUFBZjtBQUNBLFlBQU0wQixVQUFVLEdBQUd0RSxLQUFLLENBQUN5QyxLQUFOLENBQVksQ0FBQ3hDLE1BQU0sQ0FBQ00sRUFBUixFQUFZLGVBQVosQ0FBWixFQUEwQyxzQkFBMUMsRUFBa0RrRCxPQUFsRCxDQUEwRCtCLE1BQTFELENBQW5COztBQUNBLFlBQUlsQixVQUFVLEtBQUssQ0FBQyxDQUFwQixFQUF1QjtBQUNyQixjQUFJckUsTUFBTSxDQUFDK0csV0FBWCxFQUF3QjtBQUN0QixtQkFBT3ZDLFNBQVEsQ0FBQ3JDLFFBQVQsQ0FDTCxDQUFDbkMsTUFBTSxDQUFDTSxFQUFSLEVBQVksZUFBWixDQURLLEVBRUwsc0JBRkssRUFHTCxVQUFBOEIsS0FBSztBQUFBLHFCQUFJQSxLQUFLLENBQUNDLElBQU4sQ0FBV2tELE1BQVgsQ0FBSjtBQUFBLGFBSEEsQ0FBUDtBQUtEOztBQUNELGlCQUFPZixTQUFRLENBQUM1RCxLQUFULENBQWUsQ0FBQ1osTUFBTSxDQUFDTSxFQUFSLEVBQVksZUFBWixDQUFmLEVBQTZDLHFCQUFLLENBQUNpRixNQUFELENBQUwsQ0FBN0MsQ0FBUDtBQUNEOztBQUNELFlBQUl2RixNQUFNLENBQUMrRyxXQUFYLEVBQXdCO0FBQ3RCLGlCQUFPdkMsU0FBUSxDQUFDckMsUUFBVCxDQUFrQixDQUFDbkMsTUFBTSxDQUFDTSxFQUFSLEVBQVksZUFBWixDQUFsQixFQUFnRCxVQUFBOEIsS0FBSztBQUFBLG1CQUFJQSxLQUFLLFVBQUwsQ0FBYWlDLFVBQWIsQ0FBSjtBQUFBLFdBQXJELENBQVA7QUFDRDs7QUFDRCxlQUFPRyxTQUFRLENBQUM1RCxLQUFULENBQWUsQ0FBQ1osTUFBTSxDQUFDTSxFQUFSLEVBQVksZUFBWixDQUFmLEVBQTZDLHFCQUFLLENBQUNpRixNQUFELENBQUwsQ0FBN0MsQ0FBUDtBQUNEOztBQUVELFNBQUtwRixnQkFBTTZHLHlDQUFYO0FBQ0UsVUFDRWpILEtBQUssQ0FBQ3lDLEtBQU4sQ0FBWSxDQUFDeEMsTUFBTSxDQUFDTSxFQUFSLEVBQVksZUFBWixDQUFaLEVBQTBDLHNCQUExQyxFQUFrRCtGLElBQWxELEtBQ0l0RyxLQUFLLENBQUN5QyxLQUFOLENBQVksQ0FBQ3hDLE1BQU0sQ0FBQ00sRUFBUixFQUFZLE1BQVosQ0FBWixFQUFpQyxzQkFBakMsRUFBeUMrRixJQUYvQyxFQUdFO0FBQ0EsZUFBT3RHLEtBQUssQ0FBQ00sUUFBTixDQUFlLENBQUNMLE1BQU0sQ0FBQ00sRUFBUixFQUFZLGVBQVosQ0FBZixDQUFQO0FBQ0Q7O0FBQ0QsYUFBT1AsS0FBSyxDQUFDYSxLQUFOLENBQ0wsQ0FBQ1osTUFBTSxDQUFDTSxFQUFSLEVBQVksZUFBWixDQURLLEVBRUxQLEtBQUssQ0FBQ3lDLEtBQU4sQ0FBWSxDQUFDeEMsTUFBTSxDQUFDTSxFQUFSLEVBQVksTUFBWixDQUFaLEVBQWlDLHNCQUFqQyxFQUF5QzJHLEdBQXpDLENBQTZDLFVBQUF2RSxJQUFJO0FBQUEsZUFBSUEsSUFBSSxDQUFDRixLQUFMLENBQVd4QyxNQUFNLENBQUMyQyxTQUFsQixDQUFKO0FBQUEsT0FBakQsQ0FGSyxDQUFQOztBQUtGLFNBQUt4QyxnQkFBTStHLHNDQUFYO0FBQ0UsYUFBT25ILEtBQUssQ0FBQ00sUUFBTixDQUFlLENBQUNMLE1BQU0sQ0FBQ00sRUFBUixFQUFZLGVBQVosQ0FBZixDQUFQOztBQUVGLFNBQUtILGdCQUFNZ0gsa0NBQVg7QUFBK0M7QUFDN0MsWUFBSSxDQUFDbkgsTUFBTSxDQUFDb0gsV0FBWixFQUF5QjtBQUN2QixpQkFBT3JILEtBQUssQ0FDVGEsS0FESSxDQUNFLENBQUNaLE1BQU0sQ0FBQ00sRUFBUixFQUFZLFFBQVosRUFBc0IsZUFBdEIsQ0FERixFQUMwQyxvQkFBSTtBQUFFOEcsWUFBQUEsV0FBVyxFQUFFO0FBQWYsV0FBSixDQUQxQyxFQUVKeEcsS0FGSSxDQUVFLENBQUNaLE1BQU0sQ0FBQ00sRUFBUixFQUFZLE1BQVosQ0FGRixFQUV1QlAsS0FBSyxDQUFDeUMsS0FBTixDQUFZLENBQUN4QyxNQUFNLENBQUNNLEVBQVIsRUFBWSxTQUFaLENBQVosQ0FGdkIsQ0FBUDtBQUdEOztBQUNELGVBQU9QLEtBQUssQ0FBQ2EsS0FBTixDQUFZLENBQUNaLE1BQU0sQ0FBQ00sRUFBUixFQUFZLFFBQVosRUFBc0IsZUFBdEIsQ0FBWixFQUFvRCxvQkFBSTtBQUFFOEcsVUFBQUEsV0FBVyxFQUFFO0FBQWYsU0FBSixDQUFwRCxDQUFQO0FBQ0Q7O0FBRUQsU0FBS2pILGdCQUFNa0gsb0NBQVg7QUFDRSxhQUFPdEgsS0FBSyxDQUFDYSxLQUFOLENBQVksQ0FBQ1osTUFBTSxDQUFDTSxFQUFSLEVBQVksUUFBWixFQUFzQixlQUF0QixFQUF1QyxZQUF2QyxDQUFaLEVBQWtFUSxzQkFBVUMsTUFBVixDQUFpQmYsTUFBTSxDQUFDc0gsVUFBeEIsQ0FBbEUsQ0FBUDs7QUFFRixTQUFLbkgsZ0JBQU1vSCwrQkFBWDtBQUNFLGFBQU94SCxLQUFLLENBQUNhLEtBQU4sQ0FBWSxDQUFDWixNQUFNLENBQUNNLEVBQVIsRUFBWSxNQUFaLENBQVosRUFBaUNOLE1BQU0sQ0FBQ2EsSUFBeEMsQ0FBUDs7QUFFRixTQUFLVixnQkFBTXFILDZCQUFYO0FBQ0UsYUFBT3pILEtBQUssQ0FBQ2EsS0FBTixDQUFZLENBQUNaLE1BQU0sQ0FBQ00sRUFBUixFQUFZLFFBQVosRUFBc0IsZUFBdEIsQ0FBWixFQUFvRE4sTUFBTSxDQUFDeUgsYUFBM0QsQ0FBUDs7QUFFRixTQUFLdEgsZ0JBQU11SCw0Q0FBWDtBQUF5RDtBQUN2RCxZQUFNbEQsVUFBUSxHQUFHekUsS0FBSyxDQUFDYSxLQUFOLEVBQ2RaLE1BQU0sQ0FBQ00sRUFETyxFQUNILFNBREcsRUFDUU4sTUFBTSxDQUFDdUYsTUFEZixTQUMwQnZGLE1BQU0sQ0FBQ3dGLE9BRGpDLEdBRWZ4RixNQUFNLENBQUN5RixLQUZRLENBQWpCOztBQUlBLFlBQUkxRixLQUFLLENBQUM0SCxLQUFOLEVBQWEzSCxNQUFNLENBQUNNLEVBQXBCLEVBQXdCLE1BQXhCLEVBQWdDTixNQUFNLENBQUN1RixNQUF2QyxTQUFrRHZGLE1BQU0sQ0FBQ3dGLE9BQXpELEVBQUosRUFBd0U7QUFDdEUsaUJBQU9oQixVQUFRLENBQUM1RCxLQUFULEVBQWdCWixNQUFNLENBQUNNLEVBQXZCLEVBQTJCLE1BQTNCLEVBQW1DTixNQUFNLENBQUN1RixNQUExQyxTQUFxRHZGLE1BQU0sQ0FBQ3dGLE9BQTVELEdBQXNFeEYsTUFBTSxDQUFDeUYsS0FBN0UsQ0FBUDtBQUNEOztBQUNELGVBQU9qQixVQUFQO0FBQ0Q7O0FBRUQsU0FBS3JFLGdCQUFNeUgsK0JBQVg7QUFDRSxhQUFPN0gsS0FBSyxDQUNUYSxLQURJLENBQ0UsQ0FBQ1osTUFBTSxDQUFDTSxFQUFSLEVBQVksU0FBWixFQUF1QixXQUF2QixDQURGLEVBQ3VDLElBRHZDLEVBRUpNLEtBRkksQ0FFRSxDQUFDWixNQUFNLENBQUNNLEVBQVIsRUFBWSxVQUFaLENBRkYsRUFFMkJOLE1BQU0sQ0FBQ2EsSUFGbEMsRUFHSkQsS0FISSxDQUdFLENBQUNaLE1BQU0sQ0FBQ00sRUFBUixFQUFZLGNBQVosQ0FIRixFQUcrQk4sTUFBTSxDQUFDNkgsWUFIdEMsQ0FBUDs7QUFLRixTQUFLMUgsZ0JBQU0ySCw0Q0FBWDtBQUNFLGFBQU8vSCxLQUFLLENBQUNhLEtBQU4sQ0FBWSxDQUFDWixNQUFNLENBQUNNLEVBQVIsRUFBWSxTQUFaLEVBQXVCLHFCQUF2QixFQUE4QyxNQUE5QyxDQUFaLEVBQW1FLElBQW5FLENBQVA7O0FBRUYsU0FBS0gsZ0JBQU00SCw2Q0FBWDtBQUNFLGFBQU9oSSxLQUFLLENBQUNNLFFBQU4sQ0FBZSxDQUFDTCxNQUFNLENBQUNNLEVBQVIsRUFBWSxTQUFaLEVBQXVCLHFCQUF2QixDQUFmLENBQVA7O0FBRUYsU0FBS0gsZ0JBQU02SCxzQ0FBWDtBQUNFLGFBQU9qSSxLQUFLLENBQUNhLEtBQU4sQ0FDTCxDQUFDWixNQUFNLENBQUNNLEVBQVIsRUFBWSxRQUFaLEVBQXNCLGdCQUF0QixDQURLLEVBRUxRLHNCQUFVQyxNQUFWLENBQWlCZixNQUFNLENBQUNpSSxXQUF4QixDQUZLLENBQVA7O0FBS0YsU0FBSzlILGdCQUFNK0gsMEJBQVg7QUFDRSxhQUFPbkksS0FBSyxDQUFDYSxLQUFOLENBQVksQ0FBQ1osTUFBTSxDQUFDTSxFQUFSLEVBQVksUUFBWixFQUFzQixNQUF0QixDQUFaLEVBQTJDTixNQUFNLENBQUNtSSxJQUFsRCxDQUFQOztBQUVGLFNBQUtoSSxnQkFBTWlJLGtDQUFYO0FBQ0UsYUFBT3JJLEtBQUssQ0FBQ2EsS0FBTixDQUFZLENBQUNaLE1BQU0sQ0FBQ00sRUFBUixFQUFZLFFBQVosRUFBc0IsWUFBdEIsQ0FBWixFQUFpRE4sTUFBTSxDQUFDcUksVUFBeEQsQ0FBUDs7QUFFRjtBQUNFLGFBQU90SSxLQUFQO0FBamJKO0FBbWJEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEltbXV0YWJsZSwgeyBNYXAsIExpc3QgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IHsgVFlQRVMgfSBmcm9tICcuL2RhdGFncmlkLmFjdGlvbnMnO1xuaW1wb3J0IHsgSU5JVElBTF9TVEFURSB9IGZyb20gJy4vZGF0YWdyaWQuY29uc3RhbnRzJztcbmltcG9ydCBVdGlscyBmcm9tICcuL2RhdGFncmlkLnV0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGF0YWdyaWRSZWR1Y2VyKHN0YXRlID0gSU5JVElBTF9TVEFURSwgYWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0lOVkFMSURBVEU6XG4gICAgICByZXR1cm4gc3RhdGVcbiAgICAgICAgLmRlbGV0ZUluKFthY3Rpb24uaWQsICdkYXRhJ10pXG4gICAgICAgIC5kZWxldGVJbihbYWN0aW9uLmlkLCAnYWxsRGF0YSddKVxuICAgICAgICAuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ3Nlc3Npb24nXSlcbiAgICAgICAgLmRlbGV0ZUluKFthY3Rpb24uaWQsICdzZWxlY3RlZENlbGwnXSlcbiAgICAgICAgLmRlbGV0ZUluKFthY3Rpb24uaWQsICdlZGl0RGF0YSddKVxuICAgICAgICAuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ2NyZWF0ZURhdGEnXSlcbiAgICAgICAgLmRlbGV0ZUluKFthY3Rpb24uaWQsICdjcmVhdGVDZWxsTWVzc2FnZXMnXSlcbiAgICAgICAgLmRlbGV0ZUluKFthY3Rpb24uaWQsICdjZWxsTWVzc2FnZXMnXSk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0ZPUkNFX1JFRlJFU0g6XG4gICAgICByZXR1cm4gc3RhdGUuc2V0KCdmb3JjZVJlZnJlc2gnLCBEYXRlLm5vdygpKTtcblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX0RBVEE6XG4gICAgICByZXR1cm4gc3RhdGVcbiAgICAgICAgLnNldEluKFthY3Rpb24uaWQsICdkYXRhJ10sIGFjdGlvbi5kYXRhKVxuICAgICAgICAuc2V0SW4oW2FjdGlvbi5pZCwgJ2FsbERhdGEnXSwgYWN0aW9uLmRhdGEpXG4gICAgICAgIC5zZXRJbihbYWN0aW9uLmlkLCAnY29uZmlnJ10sIEltbXV0YWJsZS5mcm9tSlMoYWN0aW9uLmNvbmZpZykpXG4gICAgICAgIC5zZXRJbihbYWN0aW9uLmlkLCAnc2VsZWN0ZWRJdGVtcyddLCBJbW11dGFibGUuZnJvbUpTKGFjdGlvbi5zZWxlY3RlZEl0ZW1zKSlcbiAgICAgICAgLm1lcmdlSW4oW2FjdGlvbi5pZCwgJ3Nlc3Npb24nXSwge1xuICAgICAgICAgIGlzRWRpdGluZzogZmFsc2UsXG4gICAgICAgICAgaXNDcmVhdGluZzogZmFsc2UsXG4gICAgICAgICAgaXNCdXN5OiBmYWxzZSxcbiAgICAgICAgfSlcbiAgICAgICAgLmRlbGV0ZUluKFthY3Rpb24uaWQsICdzZWxlY3RlZENlbGwnXSlcbiAgICAgICAgLmRlbGV0ZUluKFthY3Rpb24uaWQsICdlZGl0RGF0YSddKVxuICAgICAgICAuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ2NyZWF0ZURhdGEnXSlcbiAgICAgICAgLmRlbGV0ZUluKFthY3Rpb24uaWQsICdjcmVhdGVDZWxsTWVzc2FnZXMnXSlcbiAgICAgICAgLmRlbGV0ZUluKFthY3Rpb24uaWQsICdjZWxsTWVzc2FnZXMnXSk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0JVU1k6XG4gICAgICByZXR1cm4gc3RhdGUuc2V0SW4oW2FjdGlvbi5pZCwgJ3Nlc3Npb24nLCAnaXNCdXN5J10sIHRydWUpO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRUFEWTpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXRJbihbYWN0aW9uLmlkLCAnc2Vzc2lvbicsICdpc0J1c3knXSwgZmFsc2UpO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9BUFBMWV9TT1JUOlxuICAgICAgcmV0dXJuIHN0YXRlXG4gICAgICAgIC5zZXRJbihbYWN0aW9uLmlkLCAnZGF0YSddLCBhY3Rpb24uZGF0YSlcbiAgICAgICAgLnNldEluKFthY3Rpb24uaWQsICdhbGxEYXRhJ10sIGFjdGlvbi5hbGxEYXRhKTtcblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU09SVF9DSEFOR0U6XG4gICAgICByZXR1cm4gc3RhdGUuc2V0SW4oXG4gICAgICAgIFthY3Rpb24uaWQsICdjb25maWcnLCAnc29ydGluZ0RhdGEnXSxcbiAgICAgICAgTWFwKHtcbiAgICAgICAgICBzb3J0Q29sdW1uOiBhY3Rpb24uc29ydENvbHVtbixcbiAgICAgICAgICBzb3J0T3JkZXI6IGFjdGlvbi5zb3J0T3JkZXIsXG4gICAgICAgIH0pLFxuICAgICAgKTtcblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVTSVpFX0NPTFVNTjpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXRJbihbYWN0aW9uLmlkLCAnY29uZmlnJywgJ2NvbHVtbldpZHRocyddLCBhY3Rpb24uY29sdW1uV2lkdGhzKTtcblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfRURJVDpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXRJbihbYWN0aW9uLmlkLCAnc2Vzc2lvbicsICdpc0VkaXRpbmcnXSwgdHJ1ZSk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURTpcbiAgICAgIHJldHVybiBzdGF0ZVxuICAgICAgICAuc2V0SW4oW2FjdGlvbi5pZCwgJ2NyZWF0ZURhdGEnXSwgTGlzdChbSW1tdXRhYmxlLmZyb21KUyhhY3Rpb24uY29sdW1uRGVmYXVsdFZhbHVlcyldKSlcbiAgICAgICAgLmRlbGV0ZUluKFthY3Rpb24uaWQsICdzZWxlY3RlZENlbGwnXSlcbiAgICAgICAgLm1lcmdlSW4oW2FjdGlvbi5pZCwgJ3Nlc3Npb24nXSwge1xuICAgICAgICAgIGlzQ3JlYXRpbmc6IHRydWUsXG4gICAgICAgIH0pO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9BRERfTkVXX0lURU06XG4gICAgICByZXR1cm4gc3RhdGUudXBkYXRlSW4oXG4gICAgICAgIFthY3Rpb24uaWQsICdjcmVhdGVEYXRhJ10sXG4gICAgICAgIExpc3QoKSxcbiAgICAgICAgaXRlbXMgPT4gaXRlbXMucHVzaChJbW11dGFibGUuZnJvbUpTKGFjdGlvbi5jb2x1bW5EZWZhdWx0VmFsdWVzKSksXG4gICAgICApO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfSVRFTToge1xuICAgICAgY29uc3QgYWxsRGF0YUluZGV4ID0gc3RhdGVcbiAgICAgICAgLmdldEluKFthY3Rpb24uaWQsICdhbGxEYXRhJ10sIExpc3QoKSlcbiAgICAgICAgLmZpbmRJbmRleChpdGVtID0+IGl0ZW0uZ2V0SW4oYWN0aW9uLmlkS2V5UGF0aCkgPT09IGFjdGlvbi5yb3dJZCk7XG4gICAgICBjb25zdCBkYXRhSW5kZXggPSBzdGF0ZVxuICAgICAgICAuZ2V0SW4oW2FjdGlvbi5pZCwgJ2RhdGEnXSwgTGlzdCgpKVxuICAgICAgICAuZmluZEluZGV4KGl0ZW0gPT4gaXRlbS5nZXRJbihhY3Rpb24uaWRLZXlQYXRoKSA9PT0gYWN0aW9uLnJvd0lkKTtcbiAgICAgIHJldHVybiBzdGF0ZVxuICAgICAgICAuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ2RhdGEnLCBkYXRhSW5kZXhdKVxuICAgICAgICAuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ2FsbERhdGEnLCBhbGxEYXRhSW5kZXhdKVxuICAgICAgICAuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ2VkaXREYXRhJywgYWN0aW9uLnJvd0lkXSlcbiAgICAgICAgLmRlbGV0ZUluKFthY3Rpb24uaWQsICdjZWxsTWVzc2FnZXMnLCAnZXJyb3InLCBhY3Rpb24ucm93SWRdKVxuICAgICAgICAuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ2NlbGxNZXNzYWdlcycsICdpbmZvJywgYWN0aW9uLnJvd0lkXSlcbiAgICAgICAgLmRlbGV0ZUluKFthY3Rpb24uaWQsICdjZWxsTWVzc2FnZXMnLCAnd2FybmluZycsIGFjdGlvbi5yb3dJZF0pO1xuICAgIH1cblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX0ZPQ1VTX1RPOiB7XG4gICAgICAvLyBmb2N1cyB0eXBlIGlzIHNhdmVkIGFzIGEgaW1tdXRhYmxlIE1hcCB0byBtYWtlIGl0IGVhc2llciB0byBkZXRlY3QgY2hhbmdlc1xuICAgICAgLy8gd2hlbiByZXF1ZXN0aW5nIHNhbWUgdHlwZSBvZiBmb2N1cyBzZXZlcmFsIHRpbWVzXG4gICAgICByZXR1cm4gc3RhdGUuc2V0SW4oXG4gICAgICAgIFthY3Rpb24uaWQsICdzZXNzaW9uJywgJ2ZvY3VzVHlwZSddLFxuICAgICAgICBNYXAoeyB0eXBlOiBhY3Rpb24uZm9jdXNUbywgZm9jdXNUb0xhc3RSb3c6IGFjdGlvbi5mb2N1c1RvTGFzdFJvdyB9KSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU06XG4gICAgICByZXR1cm4gc3RhdGUuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ2NyZWF0ZURhdGEnLCBhY3Rpb24uaW5kZXhdKTtcblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNUzpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXRJbihcbiAgICAgICAgW2FjdGlvbi5pZCwgJ2NyZWF0ZURhdGEnXSxcbiAgICAgICAgc3RhdGVcbiAgICAgICAgICAuZ2V0SW4oW2FjdGlvbi5pZCwgJ2NyZWF0ZURhdGEnXSwgTGlzdCgpKVxuICAgICAgICAgIC5maWx0ZXIoKHZhbCwgaWR4KSA9PiBhY3Rpb24uaW5kZXhlcy5pbmRleE9mKGlkeCkgPT09IC0xKSxcbiAgICAgICk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NBTkNFTDpcbiAgICAgIHJldHVybiBzdGF0ZVxuICAgICAgICAubWVyZ2VJbihcbiAgICAgICAgICBbYWN0aW9uLmlkLCAnc2Vzc2lvbiddLFxuICAgICAgICAgIE1hcCh7XG4gICAgICAgICAgICBpc0VkaXRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgaXNDcmVhdGluZzogZmFsc2UsXG4gICAgICAgICAgfSksXG4gICAgICAgIClcbiAgICAgICAgLmRlbGV0ZUluKFthY3Rpb24uaWQsICdlZGl0RGF0YSddKVxuICAgICAgICAuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ2NyZWF0ZURhdGEnXSlcbiAgICAgICAgLmRlbGV0ZUluKFthY3Rpb24uaWQsICdjcmVhdGVDZWxsTWVzc2FnZXMnLCAnZXJyb3InXSlcbiAgICAgICAgLmRlbGV0ZUluKFthY3Rpb24uaWQsICdjZWxsTWVzc2FnZXMnLCAnZXJyb3InXSk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NBVkU6XG4gICAgICByZXR1cm4gc3RhdGUuc2V0SW4oW2FjdGlvbi5pZCwgJ3Nlc3Npb24nLCAnaXNCdXN5J10sIHRydWUpO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9FWFRFTkRfREFUQToge1xuICAgICAgY29uc3QgYWxsRGF0YSA9IHN0YXRlLmdldEluKFthY3Rpb24uaWQsICdhbGxEYXRhJ10pO1xuICAgICAgY29uc3QgZXh0ZW5kZWREYXRhID0gYWN0aW9uLnByZXBlbmRcbiAgICAgICAgPyBhY3Rpb24uZGF0YS5jb25jYXQoYWxsRGF0YSlcbiAgICAgICAgOiBhbGxEYXRhLmNvbmNhdChhY3Rpb24uZGF0YSk7XG5cbiAgICAgIHJldHVybiBzdGF0ZVxuICAgICAgICAuc2V0SW4oW2FjdGlvbi5pZCwgJ2RhdGEnXSwgZXh0ZW5kZWREYXRhKVxuICAgICAgICAuc2V0SW4oW2FjdGlvbi5pZCwgJ2FsbERhdGEnXSwgZXh0ZW5kZWREYXRhKTtcbiAgICB9XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfU1VDQ0VTUzoge1xuICAgICAgbGV0IGFsbERhdGEgPSBzdGF0ZS5nZXRJbihbYWN0aW9uLmlkLCAnYWxsRGF0YSddKTtcbiAgICAgIGxldCBmaXJzdENyZWF0ZWRJZCA9IG51bGw7XG5cbiAgICAgIGFjdGlvbi5zYXZlZEl0ZW1zLmZvckVhY2goKHNhdmVkSXRlbUpTKSA9PiB7XG4gICAgICAgIGNvbnN0IHNhdmVkSXRlbSA9IEltbXV0YWJsZS5mcm9tSlMoc2F2ZWRJdGVtSlMpO1xuICAgICAgICBjb25zdCBmb3VuZEluZGV4ID0gYWxsRGF0YS5maW5kSW5kZXgoXG4gICAgICAgICAgZCA9PiBkLmdldEluKGFjdGlvbi5pZEtleVBhdGgpID09PSBzYXZlZEl0ZW0uZ2V0SW4oYWN0aW9uLmlkS2V5UGF0aCksXG4gICAgICAgICk7XG4gICAgICAgIGlmIChmb3VuZEluZGV4ID09PSAtMSkge1xuICAgICAgICAgIGlmICghZmlyc3RDcmVhdGVkSWQgJiYgc2F2ZWRJdGVtLmdldEluKGFjdGlvbi5pZEtleVBhdGgpKSB7XG4gICAgICAgICAgICBmaXJzdENyZWF0ZWRJZCA9IHNhdmVkSXRlbS5nZXRJbihhY3Rpb24uaWRLZXlQYXRoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYWxsRGF0YSA9IGFsbERhdGEucHVzaChzYXZlZEl0ZW0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFsbERhdGEgPSBhbGxEYXRhLm1lcmdlRGVlcEluKFtmb3VuZEluZGV4XSwgc2F2ZWRJdGVtKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGxldCBuZXdTdGF0ZSA9IHN0YXRlXG4gICAgICAgIC5zZXRJbihbYWN0aW9uLmlkLCAnZGF0YSddLCBhbGxEYXRhKVxuICAgICAgICAuc2V0SW4oW2FjdGlvbi5pZCwgJ2FsbERhdGEnXSwgYWxsRGF0YSlcbiAgICAgICAgLm1lcmdlSW4oW2FjdGlvbi5pZCwgJ3Nlc3Npb24nXSwge1xuICAgICAgICAgIGlzQnVzeTogZmFsc2UsXG4gICAgICAgICAgaXNFZGl0aW5nOiBmYWxzZSxcbiAgICAgICAgICBpc0NyZWF0aW5nOiBmYWxzZSxcbiAgICAgICAgfSlcbiAgICAgICAgLmRlbGV0ZUluKFthY3Rpb24uaWQsICdlZGl0RGF0YSddKVxuICAgICAgICAuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ2NyZWF0ZURhdGEnXSlcbiAgICAgICAgLmRlbGV0ZUluKFthY3Rpb24uaWQsICdjcmVhdGVDZWxsTWVzc2FnZXMnLCAnZXJyb3InXSlcbiAgICAgICAgLmRlbGV0ZUluKFthY3Rpb24uaWQsICdjZWxsTWVzc2FnZXMnLCAnZXJyb3InXSk7XG5cbiAgICAgIGlmIChmaXJzdENyZWF0ZWRJZCkge1xuICAgICAgICBVdGlscy5zYXZlU2VsZWN0ZWRJdGVtcyhhY3Rpb24uaWQsIFtmaXJzdENyZWF0ZWRJZF0pO1xuICAgICAgICBuZXdTdGF0ZSA9IG5ld1N0YXRlLnNldEluKFthY3Rpb24uaWQsICdzZWxlY3RlZEl0ZW1zJ10sIExpc3QoW2ZpcnN0Q3JlYXRlZElkXSkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3U3RhdGU7XG4gICAgfVxuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TQVZFX1BBUlRJQUxfU1VDQ0VTUzoge1xuICAgICAgbGV0IGFsbERhdGEgPSBzdGF0ZS5nZXRJbihbYWN0aW9uLmlkLCAnYWxsRGF0YSddKTtcbiAgICAgIGxldCBjcmVhdGVEYXRhID0gc3RhdGUuZ2V0SW4oW2FjdGlvbi5pZCwgJ2NyZWF0ZURhdGEnXSk7XG4gICAgICBsZXQgZWRpdERhdGEgPSBzdGF0ZS5nZXRJbihbYWN0aW9uLmlkLCAnZWRpdERhdGEnXSk7XG4gICAgICBjb25zdCBpc0NyZWF0aW5nID0gc3RhdGUuZ2V0SW4oW2FjdGlvbi5pZCwgJ3Nlc3Npb24nLCAnaXNDcmVhdGluZyddKTtcbiAgICAgIGFjdGlvbi5zYXZlZEl0ZW1zLmZvckVhY2goKHNhdmVkSXRlbUpTKSA9PiB7XG4gICAgICAgIGNvbnN0IHNhdmVkSXRlbSA9IEltbXV0YWJsZS5mcm9tSlMoc2F2ZWRJdGVtSlMpO1xuICAgICAgICBsZXQgZm91bmRJbmRleCA9IGFsbERhdGEuZmluZEluZGV4KFxuICAgICAgICAgIGQgPT4gZC5nZXRJbihhY3Rpb24uaWRLZXlQYXRoKSA9PT0gc2F2ZWRJdGVtLmdldEluKGFjdGlvbi5pZEtleVBhdGgpLFxuICAgICAgICApO1xuICAgICAgICBpZiAoZm91bmRJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICBhbGxEYXRhID0gYWxsRGF0YS5wdXNoKHNhdmVkSXRlbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWxsRGF0YSA9IGFsbERhdGEubWVyZ2VEZWVwSW4oW2ZvdW5kSW5kZXhdLCBzYXZlZEl0ZW0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0NyZWF0aW5nKSB7XG4gICAgICAgICAgZm91bmRJbmRleCA9IHNhdmVkSXRlbS5nZXQoJ3Jvd0luZGV4Jyk7XG4gICAgICAgICAgaWYgKGZvdW5kSW5kZXggIT09IHVuZGVmaW5lZCAmJiBmb3VuZEluZGV4ICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjcmVhdGVEYXRhID0gY3JlYXRlRGF0YS5kZWxldGUoZm91bmRJbmRleCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVkaXREYXRhID0gZWRpdERhdGEuZGVsZXRlKHNhdmVkSXRlbS5nZXRJbihhY3Rpb24uaWRLZXlQYXRoKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHN0YXRlXG4gICAgICAgIC5zZXRJbihbYWN0aW9uLmlkLCAnZGF0YSddLCBhbGxEYXRhKVxuICAgICAgICAuc2V0SW4oW2FjdGlvbi5pZCwgJ2FsbERhdGEnXSwgYWxsRGF0YSlcbiAgICAgICAgLnNldEluKFthY3Rpb24uaWQsICdjcmVhdGVEYXRhJ10sIGNyZWF0ZURhdGEpXG4gICAgICAgIC5zZXRJbihbYWN0aW9uLmlkLCAnZWRpdERhdGEnXSwgZWRpdERhdGEpXG4gICAgICAgIC5zZXRJbihbYWN0aW9uLmlkLCAnc2Vzc2lvbicsICdpc0J1c3knXSwgZmFsc2UpO1xuICAgIH1cblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0FWRV9GQUlMOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldEluKFthY3Rpb24uaWQsICdzZXNzaW9uJywgJ2lzQnVzeSddLCBmYWxzZSk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRTpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXRJbihbYWN0aW9uLmlkLCAnc2Vzc2lvbicsICdpc0J1c3knXSwgdHJ1ZSk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9TVUNDRVNTOlxuICAgICAgcmV0dXJuIHN0YXRlXG4gICAgICAgIC5zZXRJbihbYWN0aW9uLmlkLCAnc2Vzc2lvbicsICdpc0J1c3knXSwgZmFsc2UpXG4gICAgICAgIC51cGRhdGVJbihcbiAgICAgICAgICBbYWN0aW9uLmlkLCAnZGF0YSddLFxuICAgICAgICAgIGRhdGEgPT4gZGF0YS5maWx0ZXJOb3QoXG4gICAgICAgICAgICBpdGVtID0+IGFjdGlvbi5yZW1vdmVkSWRzLmluZGV4T2YoaXRlbS5nZXRJbihhY3Rpb24uaWRLZXlQYXRoKSkgPiAtMSxcbiAgICAgICAgICApLFxuICAgICAgICApXG4gICAgICAgIC51cGRhdGVJbihcbiAgICAgICAgICBbYWN0aW9uLmlkLCAnYWxsRGF0YSddLFxuICAgICAgICAgIGRhdGEgPT4gZGF0YS5maWx0ZXJOb3QoXG4gICAgICAgICAgICBpdGVtID0+IGFjdGlvbi5yZW1vdmVkSWRzLmluZGV4T2YoaXRlbS5nZXRJbihhY3Rpb24uaWRLZXlQYXRoKSkgPiAtMSxcbiAgICAgICAgICApLFxuICAgICAgICApXG4gICAgICAgIC5kZWxldGVJbihbYWN0aW9uLmlkLCAnc2VsZWN0ZWRJdGVtcyddKTtcblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUw6XG4gICAgICByZXR1cm4gc3RhdGUuc2V0SW4oW2FjdGlvbi5pZCwgJ3Nlc3Npb24nLCAnaXNCdXN5J10sIGZhbHNlKTtcblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfRURJVF9DRUxMX1ZBTFVFX0NIQU5HRTpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXRJbihbYWN0aW9uLmlkLCAnZWRpdERhdGEnLCBhY3Rpb24uZGF0YUlkLCAuLi5hY3Rpb24ua2V5UGF0aF0sIGFjdGlvbi52YWx1ZSk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1ZBTFVFX0NIQU5HRTpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXRJbihcbiAgICAgICAgW2FjdGlvbi5pZCwgJ2NyZWF0ZURhdGEnLCBhY3Rpb24ucm93SW5kZXgsIC4uLmFjdGlvbi5rZXlQYXRoXSxcbiAgICAgICAgYWN0aW9uLnZhbHVlLFxuICAgICAgKTtcblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0U6XG4gICAgICByZXR1cm4gc3RhdGUuc2V0SW4oXG4gICAgICAgIFthY3Rpb24uaWQsICdjZWxsTWVzc2FnZXMnLCBhY3Rpb24ubWVzc2FnZVR5cGUsIGFjdGlvbi5kYXRhSWQsIC4uLmFjdGlvbi5rZXlQYXRoXSxcbiAgICAgICAgeyBpZDogYWN0aW9uLm1lc3NhZ2VJZCwgdmFsdWVzOiBhY3Rpb24ubWVzc2FnZVZhbHVlcyB9LFxuICAgICAgKTtcblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TSE9XX01FU1NBR0VTOlxuICAgICAgcmV0dXJuIHN0YXRlLm1lcmdlSW4oW2FjdGlvbi5pZCwgJ2NlbGxNZXNzYWdlcyddLCBJbW11dGFibGUuZnJvbUpTKGFjdGlvbi5tZXNzYWdlcykpO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX0hJREVfTUVTU0FHRToge1xuICAgICAgaWYgKGFjdGlvbi5tZXNzYWdlVHlwZSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gc3RhdGUuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ2NlbGxNZXNzYWdlcyddKTtcbiAgICAgIH1cbiAgICAgIGlmIChhY3Rpb24uZGF0YUlkID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBzdGF0ZS5kZWxldGVJbihbYWN0aW9uLmlkLCAnY2VsbE1lc3NhZ2VzJywgYWN0aW9uLm1lc3NhZ2VUeXBlXSk7XG4gICAgICB9XG4gICAgICBsZXQgcm93TWVzc2FnZSA9IHN0YXRlLmdldEluKFthY3Rpb24uaWQsICdjZWxsTWVzc2FnZXMnLCBhY3Rpb24ubWVzc2FnZVR5cGUsIGFjdGlvbi5kYXRhSWRdKTtcbiAgICAgIGlmIChyb3dNZXNzYWdlKSB7XG4gICAgICAgIGlmIChhY3Rpb24ua2V5UGF0aCkge1xuICAgICAgICAgIHJvd01lc3NhZ2UgPSByb3dNZXNzYWdlLmRlbGV0ZUluKGFjdGlvbi5rZXlQYXRoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocm93TWVzc2FnZS5zaXplID09PSAwIHx8ICFhY3Rpb24ua2V5UGF0aCkge1xuICAgICAgICAgIHJldHVybiBzdGF0ZS5kZWxldGVJbihbYWN0aW9uLmlkLCAnY2VsbE1lc3NhZ2VzJywgYWN0aW9uLm1lc3NhZ2VUeXBlLCBhY3Rpb24uZGF0YUlkXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0YXRlLnNldEluKFxuICAgICAgICAgIFthY3Rpb24uaWQsICdjZWxsTWVzc2FnZXMnLCBhY3Rpb24ubWVzc2FnZVR5cGUsIGFjdGlvbi5kYXRhSWRdLFxuICAgICAgICAgIHJvd01lc3NhZ2UsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9TSE9XX01FU1NBR0U6XG4gICAgICByZXR1cm4gc3RhdGUuc2V0SW4oXG4gICAgICAgIFthY3Rpb24uaWQsICdjcmVhdGVDZWxsTWVzc2FnZXMnLCBhY3Rpb24ubWVzc2FnZVR5cGUsIGFjdGlvbi5yb3dJbmRleCwgLi4uYWN0aW9uLmtleVBhdGhdLFxuICAgICAgICB7IGlkOiBhY3Rpb24ubWVzc2FnZUlkLCB2YWx1ZXM6IGFjdGlvbi5tZXNzYWdlVmFsdWVzIH0sXG4gICAgICApO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9ISURFX01FU1NBR0U6IHtcbiAgICAgIGlmIChhY3Rpb24ubWVzc2FnZVR5cGUgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHN0YXRlLmRlbGV0ZUluKFthY3Rpb24uaWQsICdjcmVhdGVDZWxsTWVzc2FnZXMnXSk7XG4gICAgICB9XG4gICAgICBpZiAoYWN0aW9uLnJvd0luZGV4ID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBzdGF0ZS5kZWxldGVJbihbYWN0aW9uLmlkLCAnY3JlYXRlQ2VsbE1lc3NhZ2VzJywgYWN0aW9uLm1lc3NhZ2VUeXBlXSk7XG4gICAgICB9XG4gICAgICBsZXQgcm93TWVzc2FnZSA9IHN0YXRlLmdldEluKFtcbiAgICAgICAgYWN0aW9uLmlkLFxuICAgICAgICAnY3JlYXRlQ2VsbE1lc3NhZ2VzJyxcbiAgICAgICAgYWN0aW9uLm1lc3NhZ2VUeXBlLFxuICAgICAgICBhY3Rpb24ucm93SW5kZXgsXG4gICAgICBdKTtcbiAgICAgIGlmIChyb3dNZXNzYWdlKSB7XG4gICAgICAgIGlmIChhY3Rpb24ua2V5UGF0aCkge1xuICAgICAgICAgIHJvd01lc3NhZ2UgPSByb3dNZXNzYWdlLmRlbGV0ZUluKGFjdGlvbi5rZXlQYXRoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocm93TWVzc2FnZS5zaXplID09PSAwIHx8ICFhY3Rpb24ua2V5UGF0aCkge1xuICAgICAgICAgIHJldHVybiBzdGF0ZS5kZWxldGVJbihbXG4gICAgICAgICAgICBhY3Rpb24uaWQsXG4gICAgICAgICAgICAnY3JlYXRlQ2VsbE1lc3NhZ2VzJyxcbiAgICAgICAgICAgIGFjdGlvbi5tZXNzYWdlVHlwZSxcbiAgICAgICAgICAgIGFjdGlvbi5yb3dJbmRleCxcbiAgICAgICAgICBdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RhdGUuc2V0SW4oXG4gICAgICAgICAgW2FjdGlvbi5pZCwgJ2NyZWF0ZUNlbGxNZXNzYWdlcycsIGFjdGlvbi5tZXNzYWdlVHlwZSwgYWN0aW9uLnJvd0luZGV4XSxcbiAgICAgICAgICByb3dNZXNzYWdlLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0VMTF9TRUxFQ1RJT05fQ0hBTkdFOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldEluKFthY3Rpb24uaWQsICdzZWxlY3RlZENlbGwnXSwgYWN0aW9uLnNlbGVjdGVkQ2VsbCk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0lURU1fU0VMRUNUSU9OX0NIQU5HRToge1xuICAgICAgY29uc3QgbmV3U3RhdGUgPSBzdGF0ZS5zZXRJbihbYWN0aW9uLmlkLCAnc2Vzc2lvbicsICdsYXN0Q2xpY2tlZFJvd0luZGV4J10sIGFjdGlvbi5yb3dJbmRleCk7XG5cbiAgICAgIC8vIEhhbmRsZSBjYXNlIHdoZXJlIHNoaWZ0IGtleSBpcyBwcmVzc2VkXG4gICAgICAvLyBTZWxlY3QgYWxsIHJvd3MgZnJvbSBsYXN0Q2xpY2tlZFJvdyB0byBjdXJyZW50bHkgY2xpY2tlZCByb3dcbiAgICAgIGlmIChhY3Rpb24uc2hpZnRQcmVzc2VkKSB7XG4gICAgICAgIGNvbnN0IGxhc3RSb3dJbmRleCA9IHN0YXRlLmdldEluKFthY3Rpb24uaWQsICdzZXNzaW9uJywgJ2xhc3RDbGlja2VkUm93SW5kZXgnXSwgZmFsc2UpO1xuICAgICAgICBpZiAobGFzdFJvd0luZGV4ICE9PSBmYWxzZSkge1xuICAgICAgICAgIGNvbnN0IHNlbGVjdFJvd0lkcyA9IFtdO1xuICAgICAgICAgIGlmIChsYXN0Um93SW5kZXggPCBhY3Rpb24ucm93SW5kZXgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBsYXN0Um93SW5kZXg7IGkgPD0gYWN0aW9uLnJvd0luZGV4OyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgY29uc3QgZGF0YUlkID0gc3RhdGUuZ2V0SW4oW2FjdGlvbi5pZCwgJ2RhdGEnLCBpLCAuLi5hY3Rpb24uaWRLZXlQYXRoXSk7XG4gICAgICAgICAgICAgIGlmIChkYXRhSWQpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RSb3dJZHMucHVzaChkYXRhSWQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBhY3Rpb24ucm93SW5kZXg7IGkgPD0gbGFzdFJvd0luZGV4OyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgY29uc3QgZGF0YUlkID0gc3RhdGUuZ2V0SW4oW2FjdGlvbi5pZCwgJ2RhdGEnLCBpLCAuLi5hY3Rpb24uaWRLZXlQYXRoXSk7XG4gICAgICAgICAgICAgIGlmIChkYXRhSWQpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RSb3dJZHMucHVzaChkYXRhSWQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBuZXdTdGF0ZS5zZXRJbihbYWN0aW9uLmlkLCAnc2VsZWN0ZWRJdGVtcyddLCBMaXN0KHNlbGVjdFJvd0lkcykpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRhdGFJZCA9IHN0YXRlLmdldEluKFthY3Rpb24uaWQsICdkYXRhJywgYWN0aW9uLnJvd0luZGV4LCAuLi5hY3Rpb24uaWRLZXlQYXRoXSk7XG4gICAgICBjb25zdCBmb3VuZEluZGV4ID0gc3RhdGUuZ2V0SW4oW2FjdGlvbi5pZCwgJ3NlbGVjdGVkSXRlbXMnXSwgTGlzdCgpKS5pbmRleE9mKGRhdGFJZCk7XG4gICAgICBpZiAoZm91bmRJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgaWYgKGFjdGlvbi5jdHJsUHJlc3NlZCkge1xuICAgICAgICAgIHJldHVybiBuZXdTdGF0ZS51cGRhdGVJbihcbiAgICAgICAgICAgIFthY3Rpb24uaWQsICdzZWxlY3RlZEl0ZW1zJ10sXG4gICAgICAgICAgICBMaXN0KCksXG4gICAgICAgICAgICBpdGVtcyA9PiBpdGVtcy5wdXNoKGRhdGFJZCksXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3U3RhdGUuc2V0SW4oW2FjdGlvbi5pZCwgJ3NlbGVjdGVkSXRlbXMnXSwgTGlzdChbZGF0YUlkXSkpO1xuICAgICAgfVxuICAgICAgaWYgKGFjdGlvbi5jdHJsUHJlc3NlZCkge1xuICAgICAgICByZXR1cm4gbmV3U3RhdGUudXBkYXRlSW4oW2FjdGlvbi5pZCwgJ3NlbGVjdGVkSXRlbXMnXSwgaXRlbXMgPT4gaXRlbXMuZGVsZXRlKGZvdW5kSW5kZXgpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXdTdGF0ZS5zZXRJbihbYWN0aW9uLmlkLCAnc2VsZWN0ZWRJdGVtcyddLCBMaXN0KFtkYXRhSWRdKSk7XG4gICAgfVxuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRUxFQ1RfQUxMX0lURU1TX0NIQU5HRTpcbiAgICAgIGlmIChcbiAgICAgICAgc3RhdGUuZ2V0SW4oW2FjdGlvbi5pZCwgJ3NlbGVjdGVkSXRlbXMnXSwgTGlzdCgpKS5zaXplXG4gICAgICAgID09PSBzdGF0ZS5nZXRJbihbYWN0aW9uLmlkLCAnZGF0YSddLCBMaXN0KCkpLnNpemVcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gc3RhdGUuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ3NlbGVjdGVkSXRlbXMnXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RhdGUuc2V0SW4oXG4gICAgICAgIFthY3Rpb24uaWQsICdzZWxlY3RlZEl0ZW1zJ10sXG4gICAgICAgIHN0YXRlLmdldEluKFthY3Rpb24uaWQsICdkYXRhJ10sIExpc3QoKSkubWFwKGl0ZW0gPT4gaXRlbS5nZXRJbihhY3Rpb24uaWRLZXlQYXRoKSksXG4gICAgICApO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DTEVBUl9TRUxFQ1RFRF9JVEVNUzpcbiAgICAgIHJldHVybiBzdGF0ZS5kZWxldGVJbihbYWN0aW9uLmlkLCAnc2VsZWN0ZWRJdGVtcyddKTtcblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfVE9HR0xFX0ZJTFRFUklORzoge1xuICAgICAgaWYgKCFhY3Rpb24uaXNGaWx0ZXJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHN0YXRlXG4gICAgICAgICAgLnNldEluKFthY3Rpb24uaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YSddLCBNYXAoeyBpc0ZpbHRlcmluZzogZmFsc2UgfSkpXG4gICAgICAgICAgLnNldEluKFthY3Rpb24uaWQsICdkYXRhJ10sIHN0YXRlLmdldEluKFthY3Rpb24uaWQsICdhbGxEYXRhJ10pKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdGF0ZS5zZXRJbihbYWN0aW9uLmlkLCAnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnXSwgTWFwKHsgaXNGaWx0ZXJpbmc6IHRydWUgfSkpO1xuICAgIH1cblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfRklMVEVSX0RBVEFfQ0hBTkdFOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldEluKFthY3Rpb24uaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdmaWx0ZXJEYXRhJ10sIEltbXV0YWJsZS5mcm9tSlMoYWN0aW9uLmZpbHRlckRhdGEpKTtcblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQVBQTFlfRklMVEVSUzpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXRJbihbYWN0aW9uLmlkLCAnZGF0YSddLCBhY3Rpb24uZGF0YSk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NFVF9GSUxURVJTOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldEluKFthY3Rpb24uaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YSddLCBhY3Rpb24uZmlsdGVyaW5nRGF0YSk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1VQREFURV9FWElTVElOR19DRUxMX1ZBTFVFOiB7XG4gICAgICBjb25zdCBuZXdTdGF0ZSA9IHN0YXRlLnNldEluKFxuICAgICAgICBbYWN0aW9uLmlkLCAnYWxsRGF0YScsIGFjdGlvbi5kYXRhSWQsIC4uLmFjdGlvbi5rZXlQYXRoXSxcbiAgICAgICAgYWN0aW9uLnZhbHVlLFxuICAgICAgKTtcbiAgICAgIGlmIChzdGF0ZS5oYXNJbihbYWN0aW9uLmlkLCAnZGF0YScsIGFjdGlvbi5kYXRhSWQsIC4uLmFjdGlvbi5rZXlQYXRoXSkpIHtcbiAgICAgICAgcmV0dXJuIG5ld1N0YXRlLnNldEluKFthY3Rpb24uaWQsICdkYXRhJywgYWN0aW9uLmRhdGFJZCwgLi4uYWN0aW9uLmtleVBhdGhdLCBhY3Rpb24udmFsdWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ld1N0YXRlO1xuICAgIH1cblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX0VESVRfREFUQTpcbiAgICAgIHJldHVybiBzdGF0ZVxuICAgICAgICAuc2V0SW4oW2FjdGlvbi5pZCwgJ3Nlc3Npb24nLCAnaXNFZGl0aW5nJ10sIHRydWUpXG4gICAgICAgIC5zZXRJbihbYWN0aW9uLmlkLCAnZWRpdERhdGEnXSwgYWN0aW9uLmRhdGEpXG4gICAgICAgIC5zZXRJbihbYWN0aW9uLmlkLCAnY2VsbE1lc3NhZ2VzJ10sIGFjdGlvbi5jZWxsTWVzc2FnZXMpO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfT1BFTjpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXRJbihbYWN0aW9uLmlkLCAnc2Vzc2lvbicsICdjb2x1bW5TZXR0aW5nc01vZGFsJywgJ29wZW4nXSwgdHJ1ZSk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRTpcbiAgICAgIHJldHVybiBzdGF0ZS5kZWxldGVJbihbYWN0aW9uLmlkLCAnc2Vzc2lvbicsICdjb2x1bW5TZXR0aW5nc01vZGFsJ10pO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfU0FWRTpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXRJbihcbiAgICAgICAgW2FjdGlvbi5pZCwgJ2NvbmZpZycsICd2aXNpYmxlQ29sdW1ucyddLFxuICAgICAgICBJbW11dGFibGUuZnJvbUpTKGFjdGlvbi5jb2x1bW5PcmRlciksXG4gICAgICApO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfUEFHRTpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXRJbihbYWN0aW9uLmlkLCAnY29uZmlnJywgJ3BhZ2UnXSwgYWN0aW9uLnBhZ2UpO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfUk9XU19PTl9QQUdFOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldEluKFthY3Rpb24uaWQsICdjb25maWcnLCAncm93c09uUGFnZSddLCBhY3Rpb24ucm93c09uUGFnZSk7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59XG4iXX0=