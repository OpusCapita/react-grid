"use strict";

exports.__esModule = true;
exports["default"] = datagridReducer;

var _immutable = _interopRequireWildcard(require("immutable"));

var _datagrid = require("./datagrid.actions");

var _datagrid2 = require("./datagrid.constants");

var _datagrid3 = _interopRequireDefault(require("./datagrid.utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
        isEditing: action.isEditing,
        isCreating: action.isCreating,
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
        var indexAllData = state.getIn([action.grid.id, 'allData'], (0, _immutable.List)()).findIndex(function (d) {
          return d.getIn(action.grid.idKeyPath) === action.dataId;
        });
        var indexData = state.getIn([action.grid.id, 'data'], (0, _immutable.List)()).findIndex(function (d) {
          return d.getIn(action.grid.idKeyPath) === action.dataId;
        });

        if (indexAllData !== -1 && indexData !== -1) {
          return state.setIn([action.grid.id, 'allData', indexAllData].concat(action.keyPath), action.value).setIn([action.grid.id, 'data', indexData].concat(action.keyPath), action.value);
        }

        if (indexAllData !== -1) {
          return state.setIn([action.grid.id, 'allData', indexAllData].concat(action.keyPath), action.value);
        }

        if (indexData !== -1) {
          return state.setIn([action.grid.id, 'data', indexData].concat(action.keyPath), action.value);
        }

        return state;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5yZWR1Y2VyLmpzIl0sIm5hbWVzIjpbImRhdGFncmlkUmVkdWNlciIsInN0YXRlIiwiYWN0aW9uIiwiSU5JVElBTF9TVEFURSIsInR5cGUiLCJUWVBFUyIsIlBMQVRGT1JNX0RBVEFHUklEX0lOVkFMSURBVEUiLCJkZWxldGVJbiIsImlkIiwiUExBVEZPUk1fREFUQUdSSURfRk9SQ0VfUkVGUkVTSCIsInNldCIsIkRhdGUiLCJub3ciLCJQTEFURk9STV9EQVRBR1JJRF9TRVRfREFUQSIsInNldEluIiwiZGF0YSIsIkltbXV0YWJsZSIsImZyb21KUyIsImNvbmZpZyIsInNlbGVjdGVkSXRlbXMiLCJtZXJnZUluIiwiaXNFZGl0aW5nIiwiaXNDcmVhdGluZyIsImlzQnVzeSIsIlBMQVRGT1JNX0RBVEFHUklEX0JVU1kiLCJQTEFURk9STV9EQVRBR1JJRF9SRUFEWSIsIlBMQVRGT1JNX0RBVEFHUklEX0FQUExZX1NPUlQiLCJhbGxEYXRhIiwiUExBVEZPUk1fREFUQUdSSURfU09SVF9DSEFOR0UiLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwiUExBVEZPUk1fREFUQUdSSURfUkVTSVpFX0NPTFVNTiIsImNvbHVtbldpZHRocyIsIlBMQVRGT1JNX0RBVEFHUklEX0VESVQiLCJQTEFURk9STV9EQVRBR1JJRF9DUkVBVEUiLCJjb2x1bW5EZWZhdWx0VmFsdWVzIiwiUExBVEZPUk1fREFUQUdSSURfQUREX05FV19JVEVNIiwidXBkYXRlSW4iLCJpdGVtcyIsInB1c2giLCJQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfSVRFTSIsImFsbERhdGFJbmRleCIsImdldEluIiwiZmluZEluZGV4IiwiaXRlbSIsImlkS2V5UGF0aCIsInJvd0lkIiwiZGF0YUluZGV4IiwiUExBVEZPUk1fREFUQUdSSURfU0VUX0ZPQ1VTX1RPIiwiZm9jdXNUbyIsImZvY3VzVG9MYXN0Um93IiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNIiwiaW5kZXgiLCJQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU1TIiwiZmlsdGVyIiwidmFsIiwiaWR4IiwiaW5kZXhlcyIsImluZGV4T2YiLCJQTEFURk9STV9EQVRBR1JJRF9DQU5DRUwiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFIiwiUExBVEZPUk1fREFUQUdSSURfRVhURU5EX0RBVEEiLCJleHRlbmRlZERhdGEiLCJwcmVwZW5kIiwiY29uY2F0IiwiUExBVEZPUk1fREFUQUdSSURfU0FWRV9TVUNDRVNTIiwiZmlyc3RDcmVhdGVkSWQiLCJzYXZlZEl0ZW1zIiwiZm9yRWFjaCIsInNhdmVkSXRlbUpTIiwic2F2ZWRJdGVtIiwiZm91bmRJbmRleCIsImQiLCJtZXJnZURlZXBJbiIsIm5ld1N0YXRlIiwiVXRpbHMiLCJzYXZlU2VsZWN0ZWRJdGVtcyIsIlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfUEFSVElBTF9TVUNDRVNTIiwiY3JlYXRlRGF0YSIsImVkaXREYXRhIiwiZ2V0IiwidW5kZWZpbmVkIiwiUExBVEZPUk1fREFUQUdSSURfU0FWRV9GQUlMIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX1NVQ0NFU1MiLCJmaWx0ZXJOb3QiLCJyZW1vdmVkSWRzIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUwiLCJQTEFURk9STV9EQVRBR1JJRF9FRElUX0NFTExfVkFMVUVfQ0hBTkdFIiwiZGF0YUlkIiwia2V5UGF0aCIsInZhbHVlIiwiUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfQ0hBTkdFIiwicm93SW5kZXgiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRSIsIm1lc3NhZ2VUeXBlIiwibWVzc2FnZUlkIiwidmFsdWVzIiwibWVzc2FnZVZhbHVlcyIsIlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFUyIsIm1lc3NhZ2VzIiwiUExBVEZPUk1fREFUQUdSSURfQ0VMTF9ISURFX01FU1NBR0UiLCJyb3dNZXNzYWdlIiwic2l6ZSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX0hJREVfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0VMRUNUSU9OX0NIQU5HRSIsInNlbGVjdGVkQ2VsbCIsIlBMQVRGT1JNX0RBVEFHUklEX0lURU1fU0VMRUNUSU9OX0NIQU5HRSIsInNoaWZ0UHJlc3NlZCIsImxhc3RSb3dJbmRleCIsInNlbGVjdFJvd0lkcyIsImkiLCJjdHJsUHJlc3NlZCIsIlBMQVRGT1JNX0RBVEFHUklEX1NFTEVDVF9BTExfSVRFTVNfQ0hBTkdFIiwibWFwIiwiUExBVEZPUk1fREFUQUdSSURfQ0xFQVJfU0VMRUNURURfSVRFTVMiLCJQTEFURk9STV9EQVRBR1JJRF9UT0dHTEVfRklMVEVSSU5HIiwiaXNGaWx0ZXJpbmciLCJQTEFURk9STV9EQVRBR1JJRF9GSUxURVJfREFUQV9DSEFOR0UiLCJmaWx0ZXJEYXRhIiwiUExBVEZPUk1fREFUQUdSSURfQVBQTFlfRklMVEVSUyIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9GSUxURVJTIiwiZmlsdGVyaW5nRGF0YSIsIlBMQVRGT1JNX0RBVEFHUklEX1VQREFURV9FWElTVElOR19DRUxMX1ZBTFVFIiwiaW5kZXhBbGxEYXRhIiwiZ3JpZCIsImluZGV4RGF0YSIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9FRElUX0RBVEEiLCJjZWxsTWVzc2FnZXMiLCJQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfT1BFTiIsIlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFIiwiY29sdW1uT3JkZXIiLCJQTEFURk9STV9EQVRBR1JJRF9TRVRfUEFHRSIsInBhZ2UiLCJQTEFURk9STV9EQVRBR1JJ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Q0FBQ1osTUFBTSxDQUFDTSxFQUFSLEVBQVksUUFBWixFQUFzQixNQUF0QixDQUFaLEVBQTJDTixNQUFNLENBQUNxSSxJQUFsRCxDQUFQOztBQUVGLFNBQUtsSSxnQkFBTW1JLGtDQUFYO0FBQ0UsYUFBT3ZJLEtBQUssQ0FBQ2EsS0FBTixDQUFZLENBQUNaLE1BQU0sQ0FBQ00sRUFBUixFQUFZLFFBQVosRUFBc0IsWUFBdEIsQ0FBWixFQUFpRE4sTUFBTSxDQUFDdUksVUFBeEQsQ0FBUDs7QUFFRjtBQUNFLGFBQU94SSxLQUFQO0FBN2JKO0FBK2JEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEltbXV0YWJsZSwgeyBNYXAsIExpc3QgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IHsgVFlQRVMgfSBmcm9tICcuL2RhdGFncmlkLmFjdGlvbnMnO1xuaW1wb3J0IHsgSU5JVElBTF9TVEFURSB9IGZyb20gJy4vZGF0YWdyaWQuY29uc3RhbnRzJztcbmltcG9ydCBVdGlscyBmcm9tICcuL2RhdGFncmlkLnV0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGF0YWdyaWRSZWR1Y2VyKHN0YXRlID0gSU5JVElBTF9TVEFURSwgYWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0lOVkFMSURBVEU6XG4gICAgICByZXR1cm4gc3RhdGVcbiAgICAgICAgLmRlbGV0ZUluKFthY3Rpb24uaWQsICdkYXRhJ10pXG4gICAgICAgIC5kZWxldGVJbihbYWN0aW9uLmlkLCAnYWxsRGF0YSddKVxuICAgICAgICAuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ3Nlc3Npb24nXSlcbiAgICAgICAgLmRlbGV0ZUluKFthY3Rpb24uaWQsICdzZWxlY3RlZENlbGwnXSlcbiAgICAgICAgLmRlbGV0ZUluKFthY3Rpb24uaWQsICdlZGl0RGF0YSddKVxuICAgICAgICAuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ2NyZWF0ZURhdGEnXSlcbiAgICAgICAgLmRlbGV0ZUluKFthY3Rpb24uaWQsICdjcmVhdGVDZWxsTWVzc2FnZXMnXSlcbiAgICAgICAgLmRlbGV0ZUluKFthY3Rpb24uaWQsICdjZWxsTWVzc2FnZXMnXSk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0ZPUkNFX1JFRlJFU0g6XG4gICAgICByZXR1cm4gc3RhdGUuc2V0KCdmb3JjZVJlZnJlc2gnLCBEYXRlLm5vdygpKTtcblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX0RBVEE6XG4gICAgICByZXR1cm4gc3RhdGVcbiAgICAgICAgLnNldEluKFthY3Rpb24uaWQsICdkYXRhJ10sIGFjdGlvbi5kYXRhKVxuICAgICAgICAuc2V0SW4oW2FjdGlvbi5pZCwgJ2FsbERhdGEnXSwgYWN0aW9uLmRhdGEpXG4gICAgICAgIC5zZXRJbihbYWN0aW9uLmlkLCAnY29uZmlnJ10sIEltbXV0YWJsZS5mcm9tSlMoYWN0aW9uLmNvbmZpZykpXG4gICAgICAgIC5zZXRJbihbYWN0aW9uLmlkLCAnc2VsZWN0ZWRJdGVtcyddLCBJbW11dGFibGUuZnJvbUpTKGFjdGlvbi5zZWxlY3RlZEl0ZW1zKSlcbiAgICAgICAgLm1lcmdlSW4oW2FjdGlvbi5pZCwgJ3Nlc3Npb24nXSwge1xuICAgICAgICAgIGlzRWRpdGluZzogYWN0aW9uLmlzRWRpdGluZyxcbiAgICAgICAgICBpc0NyZWF0aW5nOiBhY3Rpb24uaXNDcmVhdGluZyxcbiAgICAgICAgICBpc0J1c3k6IGZhbHNlLFxuICAgICAgICB9KVxuICAgICAgICAuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ3NlbGVjdGVkQ2VsbCddKVxuICAgICAgICAuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ2VkaXREYXRhJ10pXG4gICAgICAgIC5kZWxldGVJbihbYWN0aW9uLmlkLCAnY3JlYXRlRGF0YSddKVxuICAgICAgICAuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ2NyZWF0ZUNlbGxNZXNzYWdlcyddKVxuICAgICAgICAuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ2NlbGxNZXNzYWdlcyddKTtcblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQlVTWTpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXRJbihbYWN0aW9uLmlkLCAnc2Vzc2lvbicsICdpc0J1c3knXSwgdHJ1ZSk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFQURZOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldEluKFthY3Rpb24uaWQsICdzZXNzaW9uJywgJ2lzQnVzeSddLCBmYWxzZSk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0FQUExZX1NPUlQ6XG4gICAgICByZXR1cm4gc3RhdGVcbiAgICAgICAgLnNldEluKFthY3Rpb24uaWQsICdkYXRhJ10sIGFjdGlvbi5kYXRhKVxuICAgICAgICAuc2V0SW4oW2FjdGlvbi5pZCwgJ2FsbERhdGEnXSwgYWN0aW9uLmFsbERhdGEpO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TT1JUX0NIQU5HRTpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXRJbihcbiAgICAgICAgW2FjdGlvbi5pZCwgJ2NvbmZpZycsICdzb3J0aW5nRGF0YSddLFxuICAgICAgICBNYXAoe1xuICAgICAgICAgIHNvcnRDb2x1bW46IGFjdGlvbi5zb3J0Q29sdW1uLFxuICAgICAgICAgIHNvcnRPcmRlcjogYWN0aW9uLnNvcnRPcmRlcixcbiAgICAgICAgfSksXG4gICAgICApO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRVNJWkVfQ09MVU1OOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldEluKFthY3Rpb24uaWQsICdjb25maWcnLCAnY29sdW1uV2lkdGhzJ10sIGFjdGlvbi5jb2x1bW5XaWR0aHMpO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9FRElUOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldEluKFthY3Rpb24uaWQsICdzZXNzaW9uJywgJ2lzRWRpdGluZyddLCB0cnVlKTtcblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFOlxuICAgICAgcmV0dXJuIHN0YXRlXG4gICAgICAgIC5zZXRJbihbYWN0aW9uLmlkLCAnY3JlYXRlRGF0YSddLCBMaXN0KFtJbW11dGFibGUuZnJvbUpTKGFjdGlvbi5jb2x1bW5EZWZhdWx0VmFsdWVzKV0pKVxuICAgICAgICAuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ3NlbGVjdGVkQ2VsbCddKVxuICAgICAgICAubWVyZ2VJbihbYWN0aW9uLmlkLCAnc2Vzc2lvbiddLCB7XG4gICAgICAgICAgaXNDcmVhdGluZzogdHJ1ZSxcbiAgICAgICAgfSk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0FERF9ORVdfSVRFTTpcbiAgICAgIHJldHVybiBzdGF0ZS51cGRhdGVJbihcbiAgICAgICAgW2FjdGlvbi5pZCwgJ2NyZWF0ZURhdGEnXSxcbiAgICAgICAgTGlzdCgpLFxuICAgICAgICBpdGVtcyA9PiBpdGVtcy5wdXNoKEltbXV0YWJsZS5mcm9tSlMoYWN0aW9uLmNvbHVtbkRlZmF1bHRWYWx1ZXMpKSxcbiAgICAgICk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9JVEVNOiB7XG4gICAgICBjb25zdCBhbGxEYXRhSW5kZXggPSBzdGF0ZVxuICAgICAgICAuZ2V0SW4oW2FjdGlvbi5pZCwgJ2FsbERhdGEnXSwgTGlzdCgpKVxuICAgICAgICAuZmluZEluZGV4KGl0ZW0gPT4gaXRlbS5nZXRJbihhY3Rpb24uaWRLZXlQYXRoKSA9PT0gYWN0aW9uLnJvd0lkKTtcbiAgICAgIGNvbnN0IGRhdGFJbmRleCA9IHN0YXRlXG4gICAgICAgIC5nZXRJbihbYWN0aW9uLmlkLCAnZGF0YSddLCBMaXN0KCkpXG4gICAgICAgIC5maW5kSW5kZXgoaXRlbSA9PiBpdGVtLmdldEluKGFjdGlvbi5pZEtleVBhdGgpID09PSBhY3Rpb24ucm93SWQpO1xuICAgICAgcmV0dXJuIHN0YXRlXG4gICAgICAgIC5kZWxldGVJbihbYWN0aW9uLmlkLCAnZGF0YScsIGRhdGFJbmRleF0pXG4gICAgICAgIC5kZWxldGVJbihbYWN0aW9uLmlkLCAnYWxsRGF0YScsIGFsbERhdGFJbmRleF0pXG4gICAgICAgIC5kZWxldGVJbihbYWN0aW9uLmlkLCAnZWRpdERhdGEnLCBhY3Rpb24ucm93SWRdKVxuICAgICAgICAuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ2NlbGxNZXNzYWdlcycsICdlcnJvcicsIGFjdGlvbi5yb3dJZF0pXG4gICAgICAgIC5kZWxldGVJbihbYWN0aW9uLmlkLCAnY2VsbE1lc3NhZ2VzJywgJ2luZm8nLCBhY3Rpb24ucm93SWRdKVxuICAgICAgICAuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ2NlbGxNZXNzYWdlcycsICd3YXJuaW5nJywgYWN0aW9uLnJvd0lkXSk7XG4gICAgfVxuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfRk9DVVNfVE86IHtcbiAgICAgIC8vIGZvY3VzIHR5cGUgaXMgc2F2ZWQgYXMgYSBpbW11dGFibGUgTWFwIHRvIG1ha2UgaXQgZWFzaWVyIHRvIGRldGVjdCBjaGFuZ2VzXG4gICAgICAvLyB3aGVuIHJlcXVlc3Rpbmcgc2FtZSB0eXBlIG9mIGZvY3VzIHNldmVyYWwgdGltZXNcbiAgICAgIHJldHVybiBzdGF0ZS5zZXRJbihcbiAgICAgICAgW2FjdGlvbi5pZCwgJ3Nlc3Npb24nLCAnZm9jdXNUeXBlJ10sXG4gICAgICAgIE1hcCh7IHR5cGU6IGFjdGlvbi5mb2N1c1RvLCBmb2N1c1RvTGFzdFJvdzogYWN0aW9uLmZvY3VzVG9MYXN0Um93IH0pLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTTpcbiAgICAgIHJldHVybiBzdGF0ZS5kZWxldGVJbihbYWN0aW9uLmlkLCAnY3JlYXRlRGF0YScsIGFjdGlvbi5pbmRleF0pO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU1TOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldEluKFxuICAgICAgICBbYWN0aW9uLmlkLCAnY3JlYXRlRGF0YSddLFxuICAgICAgICBzdGF0ZVxuICAgICAgICAgIC5nZXRJbihbYWN0aW9uLmlkLCAnY3JlYXRlRGF0YSddLCBMaXN0KCkpXG4gICAgICAgICAgLmZpbHRlcigodmFsLCBpZHgpID0+IGFjdGlvbi5pbmRleGVzLmluZGV4T2YoaWR4KSA9PT0gLTEpLFxuICAgICAgKTtcblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0FOQ0VMOlxuICAgICAgcmV0dXJuIHN0YXRlXG4gICAgICAgIC5tZXJnZUluKFxuICAgICAgICAgIFthY3Rpb24uaWQsICdzZXNzaW9uJ10sXG4gICAgICAgICAgTWFwKHtcbiAgICAgICAgICAgIGlzRWRpdGluZzogZmFsc2UsXG4gICAgICAgICAgICBpc0NyZWF0aW5nOiBmYWxzZSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgKVxuICAgICAgICAuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ2VkaXREYXRhJ10pXG4gICAgICAgIC5kZWxldGVJbihbYWN0aW9uLmlkLCAnY3JlYXRlRGF0YSddKVxuICAgICAgICAuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ2NyZWF0ZUNlbGxNZXNzYWdlcycsICdlcnJvciddKVxuICAgICAgICAuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ2NlbGxNZXNzYWdlcycsICdlcnJvciddKTtcblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0FWRTpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXRJbihbYWN0aW9uLmlkLCAnc2Vzc2lvbicsICdpc0J1c3knXSwgdHJ1ZSk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0VYVEVORF9EQVRBOiB7XG4gICAgICBjb25zdCBhbGxEYXRhID0gc3RhdGUuZ2V0SW4oW2FjdGlvbi5pZCwgJ2FsbERhdGEnXSk7XG4gICAgICBjb25zdCBleHRlbmRlZERhdGEgPSBhY3Rpb24ucHJlcGVuZFxuICAgICAgICA/IGFjdGlvbi5kYXRhLmNvbmNhdChhbGxEYXRhKVxuICAgICAgICA6IGFsbERhdGEuY29uY2F0KGFjdGlvbi5kYXRhKTtcblxuICAgICAgcmV0dXJuIHN0YXRlXG4gICAgICAgIC5zZXRJbihbYWN0aW9uLmlkLCAnZGF0YSddLCBleHRlbmRlZERhdGEpXG4gICAgICAgIC5zZXRJbihbYWN0aW9uLmlkLCAnYWxsRGF0YSddLCBleHRlbmRlZERhdGEpO1xuICAgIH1cblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0FWRV9TVUNDRVNTOiB7XG4gICAgICBsZXQgYWxsRGF0YSA9IHN0YXRlLmdldEluKFthY3Rpb24uaWQsICdhbGxEYXRhJ10pO1xuICAgICAgbGV0IGZpcnN0Q3JlYXRlZElkID0gbnVsbDtcblxuICAgICAgYWN0aW9uLnNhdmVkSXRlbXMuZm9yRWFjaCgoc2F2ZWRJdGVtSlMpID0+IHtcbiAgICAgICAgY29uc3Qgc2F2ZWRJdGVtID0gSW1tdXRhYmxlLmZyb21KUyhzYXZlZEl0ZW1KUyk7XG4gICAgICAgIGNvbnN0IGZvdW5kSW5kZXggPSBhbGxEYXRhLmZpbmRJbmRleChcbiAgICAgICAgICBkID0+IGQuZ2V0SW4oYWN0aW9uLmlkS2V5UGF0aCkgPT09IHNhdmVkSXRlbS5nZXRJbihhY3Rpb24uaWRLZXlQYXRoKSxcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGZvdW5kSW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgaWYgKCFmaXJzdENyZWF0ZWRJZCAmJiBzYXZlZEl0ZW0uZ2V0SW4oYWN0aW9uLmlkS2V5UGF0aCkpIHtcbiAgICAgICAgICAgIGZpcnN0Q3JlYXRlZElkID0gc2F2ZWRJdGVtLmdldEluKGFjdGlvbi5pZEtleVBhdGgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBhbGxEYXRhID0gYWxsRGF0YS5wdXNoKHNhdmVkSXRlbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWxsRGF0YSA9IGFsbERhdGEubWVyZ2VEZWVwSW4oW2ZvdW5kSW5kZXhdLCBzYXZlZEl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgbGV0IG5ld1N0YXRlID0gc3RhdGVcbiAgICAgICAgLnNldEluKFthY3Rpb24uaWQsICdkYXRhJ10sIGFsbERhdGEpXG4gICAgICAgIC5zZXRJbihbYWN0aW9uLmlkLCAnYWxsRGF0YSddLCBhbGxEYXRhKVxuICAgICAgICAubWVyZ2VJbihbYWN0aW9uLmlkLCAnc2Vzc2lvbiddLCB7XG4gICAgICAgICAgaXNCdXN5OiBmYWxzZSxcbiAgICAgICAgICBpc0VkaXRpbmc6IGZhbHNlLFxuICAgICAgICAgIGlzQ3JlYXRpbmc6IGZhbHNlLFxuICAgICAgICB9KVxuICAgICAgICAuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ2VkaXREYXRhJ10pXG4gICAgICAgIC5kZWxldGVJbihbYWN0aW9uLmlkLCAnY3JlYXRlRGF0YSddKVxuICAgICAgICAuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ2NyZWF0ZUNlbGxNZXNzYWdlcycsICdlcnJvciddKVxuICAgICAgICAuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ2NlbGxNZXNzYWdlcycsICdlcnJvciddKTtcblxuICAgICAgaWYgKGZpcnN0Q3JlYXRlZElkKSB7XG4gICAgICAgIFV0aWxzLnNhdmVTZWxlY3RlZEl0ZW1zKGFjdGlvbi5pZCwgW2ZpcnN0Q3JlYXRlZElkXSk7XG4gICAgICAgIG5ld1N0YXRlID0gbmV3U3RhdGUuc2V0SW4oW2FjdGlvbi5pZCwgJ3NlbGVjdGVkSXRlbXMnXSwgTGlzdChbZmlyc3RDcmVhdGVkSWRdKSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXdTdGF0ZTtcbiAgICB9XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfUEFSVElBTF9TVUNDRVNTOiB7XG4gICAgICBsZXQgYWxsRGF0YSA9IHN0YXRlLmdldEluKFthY3Rpb24uaWQsICdhbGxEYXRhJ10pO1xuICAgICAgbGV0IGNyZWF0ZURhdGEgPSBzdGF0ZS5nZXRJbihbYWN0aW9uLmlkLCAnY3JlYXRlRGF0YSddKTtcbiAgICAgIGxldCBlZGl0RGF0YSA9IHN0YXRlLmdldEluKFthY3Rpb24uaWQsICdlZGl0RGF0YSddKTtcbiAgICAgIGNvbnN0IGlzQ3JlYXRpbmcgPSBzdGF0ZS5nZXRJbihbYWN0aW9uLmlkLCAnc2Vzc2lvbicsICdpc0NyZWF0aW5nJ10pO1xuICAgICAgYWN0aW9uLnNhdmVkSXRlbXMuZm9yRWFjaCgoc2F2ZWRJdGVtSlMpID0+IHtcbiAgICAgICAgY29uc3Qgc2F2ZWRJdGVtID0gSW1tdXRhYmxlLmZyb21KUyhzYXZlZEl0ZW1KUyk7XG4gICAgICAgIGxldCBmb3VuZEluZGV4ID0gYWxsRGF0YS5maW5kSW5kZXgoXG4gICAgICAgICAgZCA9PiBkLmdldEluKGFjdGlvbi5pZEtleVBhdGgpID09PSBzYXZlZEl0ZW0uZ2V0SW4oYWN0aW9uLmlkS2V5UGF0aCksXG4gICAgICAgICk7XG4gICAgICAgIGlmIChmb3VuZEluZGV4ID09PSAtMSkge1xuICAgICAgICAgIGFsbERhdGEgPSBhbGxEYXRhLnB1c2goc2F2ZWRJdGVtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhbGxEYXRhID0gYWxsRGF0YS5tZXJnZURlZXBJbihbZm91bmRJbmRleF0sIHNhdmVkSXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQ3JlYXRpbmcpIHtcbiAgICAgICAgICBmb3VuZEluZGV4ID0gc2F2ZWRJdGVtLmdldCgncm93SW5kZXgnKTtcbiAgICAgICAgICBpZiAoZm91bmRJbmRleCAhPT0gdW5kZWZpbmVkICYmIGZvdW5kSW5kZXggIT09IG51bGwpIHtcbiAgICAgICAgICAgIGNyZWF0ZURhdGEgPSBjcmVhdGVEYXRhLmRlbGV0ZShmb3VuZEluZGV4KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWRpdERhdGEgPSBlZGl0RGF0YS5kZWxldGUoc2F2ZWRJdGVtLmdldEluKGFjdGlvbi5pZEtleVBhdGgpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gc3RhdGVcbiAgICAgICAgLnNldEluKFthY3Rpb24uaWQsICdkYXRhJ10sIGFsbERhdGEpXG4gICAgICAgIC5zZXRJbihbYWN0aW9uLmlkLCAnYWxsRGF0YSddLCBhbGxEYXRhKVxuICAgICAgICAuc2V0SW4oW2FjdGlvbi5pZCwgJ2NyZWF0ZURhdGEnXSwgY3JlYXRlRGF0YSlcbiAgICAgICAgLnNldEluKFthY3Rpb24uaWQsICdlZGl0RGF0YSddLCBlZGl0RGF0YSlcbiAgICAgICAgLnNldEluKFthY3Rpb24uaWQsICdzZXNzaW9uJywgJ2lzQnVzeSddLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TQVZFX0ZBSUw6XG4gICAgICByZXR1cm4gc3RhdGUuc2V0SW4oW2FjdGlvbi5pZCwgJ3Nlc3Npb24nLCAnaXNCdXN5J10sIGZhbHNlKTtcblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldEluKFthY3Rpb24uaWQsICdzZXNzaW9uJywgJ2lzQnVzeSddLCB0cnVlKTtcblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX1NVQ0NFU1M6XG4gICAgICByZXR1cm4gc3RhdGVcbiAgICAgICAgLnNldEluKFthY3Rpb24uaWQsICdzZXNzaW9uJywgJ2lzQnVzeSddLCBmYWxzZSlcbiAgICAgICAgLnVwZGF0ZUluKFxuICAgICAgICAgIFthY3Rpb24uaWQsICdkYXRhJ10sXG4gICAgICAgICAgZGF0YSA9PiBkYXRhLmZpbHRlck5vdChcbiAgICAgICAgICAgIGl0ZW0gPT4gYWN0aW9uLnJlbW92ZWRJZHMuaW5kZXhPZihpdGVtLmdldEluKGFjdGlvbi5pZEtleVBhdGgpKSA+IC0xLFxuICAgICAgICAgICksXG4gICAgICAgIClcbiAgICAgICAgLnVwZGF0ZUluKFxuICAgICAgICAgIFthY3Rpb24uaWQsICdhbGxEYXRhJ10sXG4gICAgICAgICAgZGF0YSA9PiBkYXRhLmZpbHRlck5vdChcbiAgICAgICAgICAgIGl0ZW0gPT4gYWN0aW9uLnJlbW92ZWRJZHMuaW5kZXhPZihpdGVtLmdldEluKGFjdGlvbi5pZEtleVBhdGgpKSA+IC0xLFxuICAgICAgICAgICksXG4gICAgICAgIClcbiAgICAgICAgLmRlbGV0ZUluKFthY3Rpb24uaWQsICdzZWxlY3RlZEl0ZW1zJ10pO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfRkFJTDpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXRJbihbYWN0aW9uLmlkLCAnc2Vzc2lvbicsICdpc0J1c3knXSwgZmFsc2UpO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9FRElUX0NFTExfVkFMVUVfQ0hBTkdFOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldEluKFthY3Rpb24uaWQsICdlZGl0RGF0YScsIGFjdGlvbi5kYXRhSWQsIC4uLmFjdGlvbi5rZXlQYXRoXSwgYWN0aW9uLnZhbHVlKTtcblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfQ0hBTkdFOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldEluKFxuICAgICAgICBbYWN0aW9uLmlkLCAnY3JlYXRlRGF0YScsIGFjdGlvbi5yb3dJbmRleCwgLi4uYWN0aW9uLmtleVBhdGhdLFxuICAgICAgICBhY3Rpb24udmFsdWUsXG4gICAgICApO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRTpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXRJbihcbiAgICAgICAgW2FjdGlvbi5pZCwgJ2NlbGxNZXNzYWdlcycsIGFjdGlvbi5tZXNzYWdlVHlwZSwgYWN0aW9uLmRhdGFJZCwgLi4uYWN0aW9uLmtleVBhdGhdLFxuICAgICAgICB7IGlkOiBhY3Rpb24ubWVzc2FnZUlkLCB2YWx1ZXM6IGFjdGlvbi5tZXNzYWdlVmFsdWVzIH0sXG4gICAgICApO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRVM6XG4gICAgICByZXR1cm4gc3RhdGUubWVyZ2VJbihbYWN0aW9uLmlkLCAnY2VsbE1lc3NhZ2VzJ10sIEltbXV0YWJsZS5mcm9tSlMoYWN0aW9uLm1lc3NhZ2VzKSk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfSElERV9NRVNTQUdFOiB7XG4gICAgICBpZiAoYWN0aW9uLm1lc3NhZ2VUeXBlID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBzdGF0ZS5kZWxldGVJbihbYWN0aW9uLmlkLCAnY2VsbE1lc3NhZ2VzJ10pO1xuICAgICAgfVxuICAgICAgaWYgKGFjdGlvbi5kYXRhSWQgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHN0YXRlLmRlbGV0ZUluKFthY3Rpb24uaWQsICdjZWxsTWVzc2FnZXMnLCBhY3Rpb24ubWVzc2FnZVR5cGVdKTtcbiAgICAgIH1cbiAgICAgIGxldCByb3dNZXNzYWdlID0gc3RhdGUuZ2V0SW4oW2FjdGlvbi5pZCwgJ2NlbGxNZXNzYWdlcycsIGFjdGlvbi5tZXNzYWdlVHlwZSwgYWN0aW9uLmRhdGFJZF0pO1xuICAgICAgaWYgKHJvd01lc3NhZ2UpIHtcbiAgICAgICAgaWYgKGFjdGlvbi5rZXlQYXRoKSB7XG4gICAgICAgICAgcm93TWVzc2FnZSA9IHJvd01lc3NhZ2UuZGVsZXRlSW4oYWN0aW9uLmtleVBhdGgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyb3dNZXNzYWdlLnNpemUgPT09IDAgfHwgIWFjdGlvbi5rZXlQYXRoKSB7XG4gICAgICAgICAgcmV0dXJuIHN0YXRlLmRlbGV0ZUluKFthY3Rpb24uaWQsICdjZWxsTWVzc2FnZXMnLCBhY3Rpb24ubWVzc2FnZVR5cGUsIGFjdGlvbi5kYXRhSWRdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RhdGUuc2V0SW4oXG4gICAgICAgICAgW2FjdGlvbi5pZCwgJ2NlbGxNZXNzYWdlcycsIGFjdGlvbi5tZXNzYWdlVHlwZSwgYWN0aW9uLmRhdGFJZF0sXG4gICAgICAgICAgcm93TWVzc2FnZSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRTpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXRJbihcbiAgICAgICAgW2FjdGlvbi5pZCwgJ2NyZWF0ZUNlbGxNZXNzYWdlcycsIGFjdGlvbi5tZXNzYWdlVHlwZSwgYWN0aW9uLnJvd0luZGV4LCAuLi5hY3Rpb24ua2V5UGF0aF0sXG4gICAgICAgIHsgaWQ6IGFjdGlvbi5tZXNzYWdlSWQsIHZhbHVlczogYWN0aW9uLm1lc3NhZ2VWYWx1ZXMgfSxcbiAgICAgICk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX0hJREVfTUVTU0FHRToge1xuICAgICAgaWYgKGFjdGlvbi5tZXNzYWdlVHlwZSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gc3RhdGUuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ2NyZWF0ZUNlbGxNZXNzYWdlcyddKTtcbiAgICAgIH1cbiAgICAgIGlmIChhY3Rpb24ucm93SW5kZXggPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHN0YXRlLmRlbGV0ZUluKFthY3Rpb24uaWQsICdjcmVhdGVDZWxsTWVzc2FnZXMnLCBhY3Rpb24ubWVzc2FnZVR5cGVdKTtcbiAgICAgIH1cbiAgICAgIGxldCByb3dNZXNzYWdlID0gc3RhdGUuZ2V0SW4oW1xuICAgICAgICBhY3Rpb24uaWQsXG4gICAgICAgICdjcmVhdGVDZWxsTWVzc2FnZXMnLFxuICAgICAgICBhY3Rpb24ubWVzc2FnZVR5cGUsXG4gICAgICAgIGFjdGlvbi5yb3dJbmRleCxcbiAgICAgIF0pO1xuICAgICAgaWYgKHJvd01lc3NhZ2UpIHtcbiAgICAgICAgaWYgKGFjdGlvbi5rZXlQYXRoKSB7XG4gICAgICAgICAgcm93TWVzc2FnZSA9IHJvd01lc3NhZ2UuZGVsZXRlSW4oYWN0aW9uLmtleVBhdGgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyb3dNZXNzYWdlLnNpemUgPT09IDAgfHwgIWFjdGlvbi5rZXlQYXRoKSB7XG4gICAgICAgICAgcmV0dXJuIHN0YXRlLmRlbGV0ZUluKFtcbiAgICAgICAgICAgIGFjdGlvbi5pZCxcbiAgICAgICAgICAgICdjcmVhdGVDZWxsTWVzc2FnZXMnLFxuICAgICAgICAgICAgYWN0aW9uLm1lc3NhZ2VUeXBlLFxuICAgICAgICAgICAgYWN0aW9uLnJvd0luZGV4LFxuICAgICAgICAgIF0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdGF0ZS5zZXRJbihcbiAgICAgICAgICBbYWN0aW9uLmlkLCAnY3JlYXRlQ2VsbE1lc3NhZ2VzJywgYWN0aW9uLm1lc3NhZ2VUeXBlLCBhY3Rpb24ucm93SW5kZXhdLFxuICAgICAgICAgIHJvd01lc3NhZ2UsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DRUxMX1NFTEVDVElPTl9DSEFOR0U6XG4gICAgICByZXR1cm4gc3RhdGUuc2V0SW4oW2FjdGlvbi5pZCwgJ3NlbGVjdGVkQ2VsbCddLCBhY3Rpb24uc2VsZWN0ZWRDZWxsKTtcblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfSVRFTV9TRUxFQ1RJT05fQ0hBTkdFOiB7XG4gICAgICBjb25zdCBuZXdTdGF0ZSA9IHN0YXRlLnNldEluKFthY3Rpb24uaWQsICdzZXNzaW9uJywgJ2xhc3RDbGlja2VkUm93SW5kZXgnXSwgYWN0aW9uLnJvd0luZGV4KTtcblxuICAgICAgLy8gSGFuZGxlIGNhc2Ugd2hlcmUgc2hpZnQga2V5IGlzIHByZXNzZWRcbiAgICAgIC8vIFNlbGVjdCBhbGwgcm93cyBmcm9tIGxhc3RDbGlja2VkUm93IHRvIGN1cnJlbnRseSBjbGlja2VkIHJvd1xuICAgICAgaWYgKGFjdGlvbi5zaGlmdFByZXNzZWQpIHtcbiAgICAgICAgY29uc3QgbGFzdFJvd0luZGV4ID0gc3RhdGUuZ2V0SW4oW2FjdGlvbi5pZCwgJ3Nlc3Npb24nLCAnbGFzdENsaWNrZWRSb3dJbmRleCddLCBmYWxzZSk7XG4gICAgICAgIGlmIChsYXN0Um93SW5kZXggIT09IGZhbHNlKSB7XG4gICAgICAgICAgY29uc3Qgc2VsZWN0Um93SWRzID0gW107XG4gICAgICAgICAgaWYgKGxhc3RSb3dJbmRleCA8IGFjdGlvbi5yb3dJbmRleCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IGxhc3RSb3dJbmRleDsgaSA8PSBhY3Rpb24ucm93SW5kZXg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICBjb25zdCBkYXRhSWQgPSBzdGF0ZS5nZXRJbihbYWN0aW9uLmlkLCAnZGF0YScsIGksIC4uLmFjdGlvbi5pZEtleVBhdGhdKTtcbiAgICAgICAgICAgICAgaWYgKGRhdGFJZCkge1xuICAgICAgICAgICAgICAgIHNlbGVjdFJvd0lkcy5wdXNoKGRhdGFJZCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IGFjdGlvbi5yb3dJbmRleDsgaSA8PSBsYXN0Um93SW5kZXg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICBjb25zdCBkYXRhSWQgPSBzdGF0ZS5nZXRJbihbYWN0aW9uLmlkLCAnZGF0YScsIGksIC4uLmFjdGlvbi5pZEtleVBhdGhdKTtcbiAgICAgICAgICAgICAgaWYgKGRhdGFJZCkge1xuICAgICAgICAgICAgICAgIHNlbGVjdFJvd0lkcy5wdXNoKGRhdGFJZCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5ld1N0YXRlLnNldEluKFthY3Rpb24uaWQsICdzZWxlY3RlZEl0ZW1zJ10sIExpc3Qoc2VsZWN0Um93SWRzKSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgZGF0YUlkID0gc3RhdGUuZ2V0SW4oW2FjdGlvbi5pZCwgJ2RhdGEnLCBhY3Rpb24ucm93SW5kZXgsIC4uLmFjdGlvbi5pZEtleVBhdGhdKTtcbiAgICAgIGNvbnN0IGZvdW5kSW5kZXggPSBzdGF0ZS5nZXRJbihbYWN0aW9uLmlkLCAnc2VsZWN0ZWRJdGVtcyddLCBMaXN0KCkpLmluZGV4T2YoZGF0YUlkKTtcbiAgICAgIGlmIChmb3VuZEluZGV4ID09PSAtMSkge1xuICAgICAgICBpZiAoYWN0aW9uLmN0cmxQcmVzc2VkKSB7XG4gICAgICAgICAgcmV0dXJuIG5ld1N0YXRlLnVwZGF0ZUluKFxuICAgICAgICAgICAgW2FjdGlvbi5pZCwgJ3NlbGVjdGVkSXRlbXMnXSxcbiAgICAgICAgICAgIExpc3QoKSxcbiAgICAgICAgICAgIGl0ZW1zID0+IGl0ZW1zLnB1c2goZGF0YUlkKSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdTdGF0ZS5zZXRJbihbYWN0aW9uLmlkLCAnc2VsZWN0ZWRJdGVtcyddLCBMaXN0KFtkYXRhSWRdKSk7XG4gICAgICB9XG4gICAgICBpZiAoYWN0aW9uLmN0cmxQcmVzc2VkKSB7XG4gICAgICAgIHJldHVybiBuZXdTdGF0ZS51cGRhdGVJbihbYWN0aW9uLmlkLCAnc2VsZWN0ZWRJdGVtcyddLCBpdGVtcyA9PiBpdGVtcy5kZWxldGUoZm91bmRJbmRleCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ld1N0YXRlLnNldEluKFthY3Rpb24uaWQsICdzZWxlY3RlZEl0ZW1zJ10sIExpc3QoW2RhdGFJZF0pKTtcbiAgICB9XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NFTEVDVF9BTExfSVRFTVNfQ0hBTkdFOlxuICAgICAgaWYgKFxuICAgICAgICBzdGF0ZS5nZXRJbihbYWN0aW9uLmlkLCAnc2VsZWN0ZWRJdGVtcyddLCBMaXN0KCkpLnNpemVcbiAgICAgICAgPT09IHN0YXRlLmdldEluKFthY3Rpb24uaWQsICdkYXRhJ10sIExpc3QoKSkuc2l6ZVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBzdGF0ZS5kZWxldGVJbihbYWN0aW9uLmlkLCAnc2VsZWN0ZWRJdGVtcyddKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdGF0ZS5zZXRJbihcbiAgICAgICAgW2FjdGlvbi5pZCwgJ3NlbGVjdGVkSXRlbXMnXSxcbiAgICAgICAgc3RhdGUuZ2V0SW4oW2FjdGlvbi5pZCwgJ2RhdGEnXSwgTGlzdCgpKS5tYXAoaXRlbSA9PiBpdGVtLmdldEluKGFjdGlvbi5pZEtleVBhdGgpKSxcbiAgICAgICk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NMRUFSX1NFTEVDVEVEX0lURU1TOlxuICAgICAgcmV0dXJuIHN0YXRlLmRlbGV0ZUluKFthY3Rpb24uaWQsICdzZWxlY3RlZEl0ZW1zJ10pO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9UT0dHTEVfRklMVEVSSU5HOiB7XG4gICAgICBpZiAoIWFjdGlvbi5pc0ZpbHRlcmluZykge1xuICAgICAgICByZXR1cm4gc3RhdGVcbiAgICAgICAgICAuc2V0SW4oW2FjdGlvbi5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJ10sIE1hcCh7IGlzRmlsdGVyaW5nOiBmYWxzZSB9KSlcbiAgICAgICAgICAuc2V0SW4oW2FjdGlvbi5pZCwgJ2RhdGEnXSwgc3RhdGUuZ2V0SW4oW2FjdGlvbi5pZCwgJ2FsbERhdGEnXSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0YXRlLnNldEluKFthY3Rpb24uaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YSddLCBNYXAoeyBpc0ZpbHRlcmluZzogdHJ1ZSB9KSk7XG4gICAgfVxuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9GSUxURVJfREFUQV9DSEFOR0U6XG4gICAgICByZXR1cm4gc3RhdGUuc2V0SW4oW2FjdGlvbi5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2ZpbHRlckRhdGEnXSwgSW1tdXRhYmxlLmZyb21KUyhhY3Rpb24uZmlsdGVyRGF0YSkpO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9BUFBMWV9GSUxURVJTOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldEluKFthY3Rpb24uaWQsICdkYXRhJ10sIGFjdGlvbi5kYXRhKTtcblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX0ZJTFRFUlM6XG4gICAgICByZXR1cm4gc3RhdGUuc2V0SW4oW2FjdGlvbi5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJ10sIGFjdGlvbi5maWx0ZXJpbmdEYXRhKTtcblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfVVBEQVRFX0VYSVNUSU5HX0NFTExfVkFMVUU6IHtcbiAgICAgIGNvbnN0IGluZGV4QWxsRGF0YSA9IHN0YXRlXG4gICAgICAgIC5nZXRJbihbYWN0aW9uLmdyaWQuaWQsICdhbGxEYXRhJ10sIExpc3QoKSlcbiAgICAgICAgLmZpbmRJbmRleChkID0+IGQuZ2V0SW4oYWN0aW9uLmdyaWQuaWRLZXlQYXRoKSA9PT0gYWN0aW9uLmRhdGFJZCk7XG4gICAgICBjb25zdCBpbmRleERhdGEgPSBzdGF0ZVxuICAgICAgICAuZ2V0SW4oW2FjdGlvbi5ncmlkLmlkLCAnZGF0YSddLCBMaXN0KCkpXG4gICAgICAgIC5maW5kSW5kZXgoZCA9PiBkLmdldEluKGFjdGlvbi5ncmlkLmlkS2V5UGF0aCkgPT09IGFjdGlvbi5kYXRhSWQpO1xuICAgICAgaWYgKGluZGV4QWxsRGF0YSAhPT0gLTEgJiYgaW5kZXhEYXRhICE9PSAtMSkge1xuICAgICAgICByZXR1cm4gc3RhdGVcbiAgICAgICAgICAuc2V0SW4oW2FjdGlvbi5ncmlkLmlkLCAnYWxsRGF0YScsIGluZGV4QWxsRGF0YSwgLi4uYWN0aW9uLmtleVBhdGhdLCBhY3Rpb24udmFsdWUpXG4gICAgICAgICAgLnNldEluKFthY3Rpb24uZ3JpZC5pZCwgJ2RhdGEnLCBpbmRleERhdGEsIC4uLmFjdGlvbi5rZXlQYXRoXSwgYWN0aW9uLnZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGlmIChpbmRleEFsbERhdGEgIT09IC0xKSB7XG4gICAgICAgIHJldHVybiBzdGF0ZVxuICAgICAgICAgIC5zZXRJbihbYWN0aW9uLmdyaWQuaWQsICdhbGxEYXRhJywgaW5kZXhBbGxEYXRhLCAuLi5hY3Rpb24ua2V5UGF0aF0sIGFjdGlvbi52YWx1ZSk7XG4gICAgICB9XG4gICAgICBpZiAoaW5kZXhEYXRhICE9PSAtMSkge1xuICAgICAgICByZXR1cm4gc3RhdGVcbiAgICAgICAgICAuc2V0SW4oW2FjdGlvbi5ncmlkLmlkLCAnZGF0YScsIGluZGV4RGF0YSwgLi4uYWN0aW9uLmtleVBhdGhdLCBhY3Rpb24udmFsdWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VUX0VESVRfREFUQTpcbiAgICAgIHJldHVybiBzdGF0ZVxuICAgICAgICAuc2V0SW4oW2FjdGlvbi5pZCwgJ3Nlc3Npb24nLCAnaXNFZGl0aW5nJ10sIHRydWUpXG4gICAgICAgIC5zZXRJbihbYWN0aW9uLmlkLCAnZWRpdERhdGEnXSwgYWN0aW9uLmRhdGEpXG4gICAgICAgIC5zZXRJbihbYWN0aW9uLmlkLCAnY2VsbE1lc3NhZ2VzJ10sIGFjdGlvbi5jZWxsTWVzc2FnZXMpO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfT1BFTjpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXRJbihbYWN0aW9uLmlkLCAnc2Vzc2lvbicsICdjb2x1bW5TZXR0aW5nc01vZGFsJywgJ29wZW4nXSwgdHJ1ZSk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRTpcbiAgICAgIHJldHVybiBzdGF0ZS5kZWxldGVJbihbYWN0aW9uLmlkLCAnc2Vzc2lvbicsICdjb2x1bW5TZXR0aW5nc01vZGFsJ10pO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfU0FWRTpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXRJbihcbiAgICAgICAgW2FjdGlvbi5pZCwgJ2NvbmZpZycsICd2aXNpYmxlQ29sdW1ucyddLFxuICAgICAgICBJbW11dGFibGUuZnJvbUpTKGFjdGlvbi5jb2x1bW5PcmRlciksXG4gICAgICApO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfUEFHRTpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXRJbihbYWN0aW9uLmlkLCAnY29uZmlnJywgJ3BhZ2UnXSwgYWN0aW9uLnBhZ2UpO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfUk9XU19PTl9QQUdFOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldEluKFthY3Rpb24uaWQsICdjb25maWcnLCAncm93c09uUGFnZSddLCBhY3Rpb24ucm93c09uUGFnZSk7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59XG4iXX0=