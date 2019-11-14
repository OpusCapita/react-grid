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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5yZWR1Y2VyLmpzIl0sIm5hbWVzIjpbImRhdGFncmlkUmVkdWNlciIsInN0YXRlIiwiYWN0aW9uIiwiSU5JVElBTF9TVEFURSIsInR5cGUiLCJUWVBFUyIsIlBMQVRGT1JNX0RBVEFHUklEX0lOVkFMSURBVEUiLCJkZWxldGVJbiIsImlkIiwiUExBVEZPUk1fREFUQUdSSURfRk9SQ0VfUkVGUkVTSCIsInNldCIsIkRhdGUiLCJub3ciLCJQTEFURk9STV9EQVRBR1JJRF9TRVRfREFUQSIsInNldEluIiwiZGF0YSIsIkltbXV0YWJsZSIsImZyb21KUyIsImNvbmZpZyIsInNlbGVjdGVkSXRlbXMiLCJtZXJnZUluIiwiaXNFZGl0aW5nIiwiaXNDcmVhdGluZyIsImlzQnVzeSIsIlBMQVRGT1JNX0RBVEFHUklEX0JVU1kiLCJQTEFURk9STV9EQVRBR1JJRF9SRUFEWSIsIlBMQVRGT1JNX0RBVEFHUklEX0FQUExZX1NPUlQiLCJhbGxEYXRhIiwiUExBVEZPUk1fREFUQUdSSURfU09SVF9DSEFOR0UiLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwiUExBVEZPUk1fREFUQUdSSURfUkVTSVpFX0NPTFVNTiIsImNvbHVtbldpZHRocyIsIlBMQVRGT1JNX0RBVEFHUklEX0VESVQiLCJQTEFURk9STV9EQVRBR1JJRF9DUkVBVEUiLCJjb2x1bW5EZWZhdWx0VmFsdWVzIiwiUExBVEZPUk1fREFUQUdSSURfQUREX05FV19JVEVNIiwidXBkYXRlSW4iLCJpdGVtcyIsInB1c2giLCJQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfSVRFTSIsImFsbERhdGFJbmRleCIsImdldEluIiwiZmluZEluZGV4IiwiaXRlbSIsImlkS2V5UGF0aCIsInJvd0lkIiwiZGF0YUluZGV4IiwiUExBVEZPUk1fREFUQUdSSURfU0VUX0ZPQ1VTX1RPIiwiZm9jdXNUbyIsImZvY3VzVG9MYXN0Um93IiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNIiwiaW5kZXgiLCJQTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfTkVXX0lURU1TIiwiZmlsdGVyIiwidmFsIiwiaWR4IiwiaW5kZXhlcyIsImluZGV4T2YiLCJQTEFURk9STV9EQVRBR1JJRF9DQU5DRUwiLCJQTEFURk9STV9EQVRBR1JJRF9TQVZFIiwiUExBVEZPUk1fREFUQUdSSURfRVhURU5EX0RBVEEiLCJleHRlbmRlZERhdGEiLCJwcmVwZW5kIiwiY29uY2F0IiwiUExBVEZPUk1fREFUQUdSSURfU0FWRV9TVUNDRVNTIiwiZmlyc3RDcmVhdGVkSWQiLCJzYXZlZEl0ZW1zIiwiZm9yRWFjaCIsInNhdmVkSXRlbUpTIiwic2F2ZWRJdGVtIiwiZm91bmRJbmRleCIsImQiLCJtZXJnZURlZXBJbiIsIm5ld1N0YXRlIiwiVXRpbHMiLCJzYXZlU2VsZWN0ZWRJdGVtcyIsIlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfUEFSVElBTF9TVUNDRVNTIiwiY3JlYXRlRGF0YSIsImVkaXREYXRhIiwiZ2V0IiwidW5kZWZpbmVkIiwiUExBVEZPUk1fREFUQUdSSURfU0FWRV9GQUlMIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX1NVQ0NFU1MiLCJmaWx0ZXJOb3QiLCJyZW1vdmVkSWRzIiwiUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0ZBSUwiLCJQTEFURk9STV9EQVRBR1JJRF9FRElUX0NFTExfVkFMVUVfQ0hBTkdFIiwiZGF0YUlkIiwia2V5UGF0aCIsInZhbHVlIiwiUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfVkFMVUVfQ0hBTkdFIiwicm93SW5kZXgiLCJQTEFURk9STV9EQVRBR1JJRF9DRUxMX1NIT1dfTUVTU0FHRSIsIm1lc3NhZ2VUeXBlIiwibWVzc2FnZUlkIiwidmFsdWVzIiwibWVzc2FnZVZhbHVlcyIsIlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFUyIsIm1lc3NhZ2VzIiwiUExBVEZPUk1fREFUQUdSSURfQ0VMTF9ISURFX01FU1NBR0UiLCJyb3dNZXNzYWdlIiwic2l6ZSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX1NIT1dfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NSRUFURV9DRUxMX0hJREVfTUVTU0FHRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0VMRUNUSU9OX0NIQU5HRSIsInNlbGVjdGVkQ2VsbCIsIlBMQVRGT1JNX0RBVEFHUklEX0lURU1fU0VMRUNUSU9OX0NIQU5HRSIsInNoaWZ0UHJlc3NlZCIsImxhc3RSb3dJbmRleCIsInNlbGVjdFJvd0lkcyIsImkiLCJjdHJsUHJlc3NlZCIsIlBMQVRGT1JNX0RBVEFHUklEX1NFTEVDVF9BTExfSVRFTVNfQ0hBTkdFIiwibWFwIiwiUExBVEZPUk1fREFUQUdSSURfQ0xFQVJfU0VMRUNURURfSVRFTVMiLCJQTEFURk9STV9EQVRBR1JJRF9UT0dHTEVfRklMVEVSSU5HIiwiaXNGaWx0ZXJpbmciLCJQTEFURk9STV9EQVRBR1JJRF9GSUxURVJfREFUQV9DSEFOR0UiLCJmaWx0ZXJEYXRhIiwiUExBVEZPUk1fREFUQUdSSURfQVBQTFlfRklMVEVSUyIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9GSUxURVJTIiwiZmlsdGVyaW5nRGF0YSIsIlBMQVRGT1JNX0RBVEFHUklEX1VQREFURV9FWElTVElOR19DRUxMX1ZBTFVFIiwiaW5kZXhBbGxEYXRhIiwiZ3JpZCIsImluZGV4RGF0YSIsIlBMQVRGT1JNX0RBVEFHUklEX1NFVF9FRElUX0RBVEEiLCJjZWxsTWVzc2FnZXMiLCJQTEFURk9STV9EQVRBR1JJRF9DT0xVTU5fU0VUVElOR1NfTU9EQUxfT1BFTiIsIlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9DTE9TRSIsIlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFIiwiY29sdW1uT3JkZXIiLCJQTEFURk9STV9EQVRBR1JJRF9TRVRfUEFHRSIsInBhZ2UiLCJQTEFURk9STV9EQVRBR1JJ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LFFBQVosRUFBc0IsTUFBdEIsQ0FBWixFQUEyQ04sTUFBTSxDQUFDcUksSUFBbEQsQ0FBUDs7QUFFRixTQUFLbEksZ0JBQU1tSSxrQ0FBWDtBQUNFLGFBQU92SSxLQUFLLENBQUNhLEtBQU4sQ0FBWSxDQUFDWixNQUFNLENBQUNNLEVBQVIsRUFBWSxRQUFaLEVBQXNCLFlBQXRCLENBQVosRUFBaUROLE1BQU0sQ0FBQ3VJLFVBQXhELENBQVA7O0FBRUY7QUFDRSxhQUFPeEksS0FBUDtBQTdiSjtBQStiRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJbW11dGFibGUsIHsgTWFwLCBMaXN0IH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCB7IFRZUEVTIH0gZnJvbSAnLi9kYXRhZ3JpZC5hY3Rpb25zJztcbmltcG9ydCB7IElOSVRJQUxfU1RBVEUgfSBmcm9tICcuL2RhdGFncmlkLmNvbnN0YW50cyc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9kYXRhZ3JpZC51dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRhdGFncmlkUmVkdWNlcihzdGF0ZSA9IElOSVRJQUxfU1RBVEUsIGFjdGlvbikge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9JTlZBTElEQVRFOlxuICAgICAgcmV0dXJuIHN0YXRlXG4gICAgICAgIC5kZWxldGVJbihbYWN0aW9uLmlkLCAnZGF0YSddKVxuICAgICAgICAuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ2FsbERhdGEnXSlcbiAgICAgICAgLmRlbGV0ZUluKFthY3Rpb24uaWQsICdzZXNzaW9uJ10pXG4gICAgICAgIC5kZWxldGVJbihbYWN0aW9uLmlkLCAnc2VsZWN0ZWRDZWxsJ10pXG4gICAgICAgIC5kZWxldGVJbihbYWN0aW9uLmlkLCAnZWRpdERhdGEnXSlcbiAgICAgICAgLmRlbGV0ZUluKFthY3Rpb24uaWQsICdjcmVhdGVEYXRhJ10pXG4gICAgICAgIC5kZWxldGVJbihbYWN0aW9uLmlkLCAnY3JlYXRlQ2VsbE1lc3NhZ2VzJ10pXG4gICAgICAgIC5kZWxldGVJbihbYWN0aW9uLmlkLCAnY2VsbE1lc3NhZ2VzJ10pO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9GT1JDRV9SRUZSRVNIOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldCgnZm9yY2VSZWZyZXNoJywgRGF0ZS5ub3coKSk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NFVF9EQVRBOlxuICAgICAgcmV0dXJuIHN0YXRlXG4gICAgICAgIC5zZXRJbihbYWN0aW9uLmlkLCAnZGF0YSddLCBhY3Rpb24uZGF0YSlcbiAgICAgICAgLnNldEluKFthY3Rpb24uaWQsICdhbGxEYXRhJ10sIGFjdGlvbi5kYXRhKVxuICAgICAgICAuc2V0SW4oW2FjdGlvbi5pZCwgJ2NvbmZpZyddLCBJbW11dGFibGUuZnJvbUpTKGFjdGlvbi5jb25maWcpKVxuICAgICAgICAuc2V0SW4oW2FjdGlvbi5pZCwgJ3NlbGVjdGVkSXRlbXMnXSwgSW1tdXRhYmxlLmZyb21KUyhhY3Rpb24uc2VsZWN0ZWRJdGVtcykpXG4gICAgICAgIC5tZXJnZUluKFthY3Rpb24uaWQsICdzZXNzaW9uJ10sIHtcbiAgICAgICAgICBpc0VkaXRpbmc6IGZhbHNlLFxuICAgICAgICAgIGlzQ3JlYXRpbmc6IGZhbHNlLFxuICAgICAgICAgIGlzQnVzeTogZmFsc2UsXG4gICAgICAgIH0pXG4gICAgICAgIC5kZWxldGVJbihbYWN0aW9uLmlkLCAnc2VsZWN0ZWRDZWxsJ10pXG4gICAgICAgIC5kZWxldGVJbihbYWN0aW9uLmlkLCAnZWRpdERhdGEnXSlcbiAgICAgICAgLmRlbGV0ZUluKFthY3Rpb24uaWQsICdjcmVhdGVEYXRhJ10pXG4gICAgICAgIC5kZWxldGVJbihbYWN0aW9uLmlkLCAnY3JlYXRlQ2VsbE1lc3NhZ2VzJ10pXG4gICAgICAgIC5kZWxldGVJbihbYWN0aW9uLmlkLCAnY2VsbE1lc3NhZ2VzJ10pO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9CVVNZOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldEluKFthY3Rpb24uaWQsICdzZXNzaW9uJywgJ2lzQnVzeSddLCB0cnVlKTtcblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVBRFk6XG4gICAgICByZXR1cm4gc3RhdGUuc2V0SW4oW2FjdGlvbi5pZCwgJ3Nlc3Npb24nLCAnaXNCdXN5J10sIGZhbHNlKTtcblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQVBQTFlfU09SVDpcbiAgICAgIHJldHVybiBzdGF0ZVxuICAgICAgICAuc2V0SW4oW2FjdGlvbi5pZCwgJ2RhdGEnXSwgYWN0aW9uLmRhdGEpXG4gICAgICAgIC5zZXRJbihbYWN0aW9uLmlkLCAnYWxsRGF0YSddLCBhY3Rpb24uYWxsRGF0YSk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NPUlRfQ0hBTkdFOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldEluKFxuICAgICAgICBbYWN0aW9uLmlkLCAnY29uZmlnJywgJ3NvcnRpbmdEYXRhJ10sXG4gICAgICAgIE1hcCh7XG4gICAgICAgICAgc29ydENvbHVtbjogYWN0aW9uLnNvcnRDb2x1bW4sXG4gICAgICAgICAgc29ydE9yZGVyOiBhY3Rpb24uc29ydE9yZGVyLFxuICAgICAgICB9KSxcbiAgICAgICk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFU0laRV9DT0xVTU46XG4gICAgICByZXR1cm4gc3RhdGUuc2V0SW4oW2FjdGlvbi5pZCwgJ2NvbmZpZycsICdjb2x1bW5XaWR0aHMnXSwgYWN0aW9uLmNvbHVtbldpZHRocyk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0VESVQ6XG4gICAgICByZXR1cm4gc3RhdGUuc2V0SW4oW2FjdGlvbi5pZCwgJ3Nlc3Npb24nLCAnaXNFZGl0aW5nJ10sIHRydWUpO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEU6XG4gICAgICByZXR1cm4gc3RhdGVcbiAgICAgICAgLnNldEluKFthY3Rpb24uaWQsICdjcmVhdGVEYXRhJ10sIExpc3QoW0ltbXV0YWJsZS5mcm9tSlMoYWN0aW9uLmNvbHVtbkRlZmF1bHRWYWx1ZXMpXSkpXG4gICAgICAgIC5kZWxldGVJbihbYWN0aW9uLmlkLCAnc2VsZWN0ZWRDZWxsJ10pXG4gICAgICAgIC5tZXJnZUluKFthY3Rpb24uaWQsICdzZXNzaW9uJ10sIHtcbiAgICAgICAgICBpc0NyZWF0aW5nOiB0cnVlLFxuICAgICAgICB9KTtcblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQUREX05FV19JVEVNOlxuICAgICAgcmV0dXJuIHN0YXRlLnVwZGF0ZUluKFxuICAgICAgICBbYWN0aW9uLmlkLCAnY3JlYXRlRGF0YSddLFxuICAgICAgICBMaXN0KCksXG4gICAgICAgIGl0ZW1zID0+IGl0ZW1zLnB1c2goSW1tdXRhYmxlLmZyb21KUyhhY3Rpb24uY29sdW1uRGVmYXVsdFZhbHVlcykpLFxuICAgICAgKTtcblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX0lURU06IHtcbiAgICAgIGNvbnN0IGFsbERhdGFJbmRleCA9IHN0YXRlXG4gICAgICAgIC5nZXRJbihbYWN0aW9uLmlkLCAnYWxsRGF0YSddLCBMaXN0KCkpXG4gICAgICAgIC5maW5kSW5kZXgoaXRlbSA9PiBpdGVtLmdldEluKGFjdGlvbi5pZEtleVBhdGgpID09PSBhY3Rpb24ucm93SWQpO1xuICAgICAgY29uc3QgZGF0YUluZGV4ID0gc3RhdGVcbiAgICAgICAgLmdldEluKFthY3Rpb24uaWQsICdkYXRhJ10sIExpc3QoKSlcbiAgICAgICAgLmZpbmRJbmRleChpdGVtID0+IGl0ZW0uZ2V0SW4oYWN0aW9uLmlkS2V5UGF0aCkgPT09IGFjdGlvbi5yb3dJZCk7XG4gICAgICByZXR1cm4gc3RhdGVcbiAgICAgICAgLmRlbGV0ZUluKFthY3Rpb24uaWQsICdkYXRhJywgZGF0YUluZGV4XSlcbiAgICAgICAgLmRlbGV0ZUluKFthY3Rpb24uaWQsICdhbGxEYXRhJywgYWxsRGF0YUluZGV4XSlcbiAgICAgICAgLmRlbGV0ZUluKFthY3Rpb24uaWQsICdlZGl0RGF0YScsIGFjdGlvbi5yb3dJZF0pXG4gICAgICAgIC5kZWxldGVJbihbYWN0aW9uLmlkLCAnY2VsbE1lc3NhZ2VzJywgJ2Vycm9yJywgYWN0aW9uLnJvd0lkXSlcbiAgICAgICAgLmRlbGV0ZUluKFthY3Rpb24uaWQsICdjZWxsTWVzc2FnZXMnLCAnaW5mbycsIGFjdGlvbi5yb3dJZF0pXG4gICAgICAgIC5kZWxldGVJbihbYWN0aW9uLmlkLCAnY2VsbE1lc3NhZ2VzJywgJ3dhcm5pbmcnLCBhY3Rpb24ucm93SWRdKTtcbiAgICB9XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NFVF9GT0NVU19UTzoge1xuICAgICAgLy8gZm9jdXMgdHlwZSBpcyBzYXZlZCBhcyBhIGltbXV0YWJsZSBNYXAgdG8gbWFrZSBpdCBlYXNpZXIgdG8gZGV0ZWN0IGNoYW5nZXNcbiAgICAgIC8vIHdoZW4gcmVxdWVzdGluZyBzYW1lIHR5cGUgb2YgZm9jdXMgc2V2ZXJhbCB0aW1lc1xuICAgICAgcmV0dXJuIHN0YXRlLnNldEluKFxuICAgICAgICBbYWN0aW9uLmlkLCAnc2Vzc2lvbicsICdmb2N1c1R5cGUnXSxcbiAgICAgICAgTWFwKHsgdHlwZTogYWN0aW9uLmZvY3VzVG8sIGZvY3VzVG9MYXN0Um93OiBhY3Rpb24uZm9jdXNUb0xhc3RSb3cgfSksXG4gICAgICApO1xuICAgIH1cblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfUkVNT1ZFX05FV19JVEVNOlxuICAgICAgcmV0dXJuIHN0YXRlLmRlbGV0ZUluKFthY3Rpb24uaWQsICdjcmVhdGVEYXRhJywgYWN0aW9uLmluZGV4XSk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9ORVdfSVRFTVM6XG4gICAgICByZXR1cm4gc3RhdGUuc2V0SW4oXG4gICAgICAgIFthY3Rpb24uaWQsICdjcmVhdGVEYXRhJ10sXG4gICAgICAgIHN0YXRlXG4gICAgICAgICAgLmdldEluKFthY3Rpb24uaWQsICdjcmVhdGVEYXRhJ10sIExpc3QoKSlcbiAgICAgICAgICAuZmlsdGVyKCh2YWwsIGlkeCkgPT4gYWN0aW9uLmluZGV4ZXMuaW5kZXhPZihpZHgpID09PSAtMSksXG4gICAgICApO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DQU5DRUw6XG4gICAgICByZXR1cm4gc3RhdGVcbiAgICAgICAgLm1lcmdlSW4oXG4gICAgICAgICAgW2FjdGlvbi5pZCwgJ3Nlc3Npb24nXSxcbiAgICAgICAgICBNYXAoe1xuICAgICAgICAgICAgaXNFZGl0aW5nOiBmYWxzZSxcbiAgICAgICAgICAgIGlzQ3JlYXRpbmc6IGZhbHNlLFxuICAgICAgICAgIH0pLFxuICAgICAgICApXG4gICAgICAgIC5kZWxldGVJbihbYWN0aW9uLmlkLCAnZWRpdERhdGEnXSlcbiAgICAgICAgLmRlbGV0ZUluKFthY3Rpb24uaWQsICdjcmVhdGVEYXRhJ10pXG4gICAgICAgIC5kZWxldGVJbihbYWN0aW9uLmlkLCAnY3JlYXRlQ2VsbE1lc3NhZ2VzJywgJ2Vycm9yJ10pXG4gICAgICAgIC5kZWxldGVJbihbYWN0aW9uLmlkLCAnY2VsbE1lc3NhZ2VzJywgJ2Vycm9yJ10pO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TQVZFOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldEluKFthY3Rpb24uaWQsICdzZXNzaW9uJywgJ2lzQnVzeSddLCB0cnVlKTtcblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfRVhURU5EX0RBVEE6IHtcbiAgICAgIGNvbnN0IGFsbERhdGEgPSBzdGF0ZS5nZXRJbihbYWN0aW9uLmlkLCAnYWxsRGF0YSddKTtcbiAgICAgIGNvbnN0IGV4dGVuZGVkRGF0YSA9IGFjdGlvbi5wcmVwZW5kXG4gICAgICAgID8gYWN0aW9uLmRhdGEuY29uY2F0KGFsbERhdGEpXG4gICAgICAgIDogYWxsRGF0YS5jb25jYXQoYWN0aW9uLmRhdGEpO1xuXG4gICAgICByZXR1cm4gc3RhdGVcbiAgICAgICAgLnNldEluKFthY3Rpb24uaWQsICdkYXRhJ10sIGV4dGVuZGVkRGF0YSlcbiAgICAgICAgLnNldEluKFthY3Rpb24uaWQsICdhbGxEYXRhJ10sIGV4dGVuZGVkRGF0YSk7XG4gICAgfVxuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TQVZFX1NVQ0NFU1M6IHtcbiAgICAgIGxldCBhbGxEYXRhID0gc3RhdGUuZ2V0SW4oW2FjdGlvbi5pZCwgJ2FsbERhdGEnXSk7XG4gICAgICBsZXQgZmlyc3RDcmVhdGVkSWQgPSBudWxsO1xuXG4gICAgICBhY3Rpb24uc2F2ZWRJdGVtcy5mb3JFYWNoKChzYXZlZEl0ZW1KUykgPT4ge1xuICAgICAgICBjb25zdCBzYXZlZEl0ZW0gPSBJbW11dGFibGUuZnJvbUpTKHNhdmVkSXRlbUpTKTtcbiAgICAgICAgY29uc3QgZm91bmRJbmRleCA9IGFsbERhdGEuZmluZEluZGV4KFxuICAgICAgICAgIGQgPT4gZC5nZXRJbihhY3Rpb24uaWRLZXlQYXRoKSA9PT0gc2F2ZWRJdGVtLmdldEluKGFjdGlvbi5pZEtleVBhdGgpLFxuICAgICAgICApO1xuICAgICAgICBpZiAoZm91bmRJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICBpZiAoIWZpcnN0Q3JlYXRlZElkICYmIHNhdmVkSXRlbS5nZXRJbihhY3Rpb24uaWRLZXlQYXRoKSkge1xuICAgICAgICAgICAgZmlyc3RDcmVhdGVkSWQgPSBzYXZlZEl0ZW0uZ2V0SW4oYWN0aW9uLmlkS2V5UGF0aCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGFsbERhdGEgPSBhbGxEYXRhLnB1c2goc2F2ZWRJdGVtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhbGxEYXRhID0gYWxsRGF0YS5tZXJnZURlZXBJbihbZm91bmRJbmRleF0sIHNhdmVkSXRlbSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBsZXQgbmV3U3RhdGUgPSBzdGF0ZVxuICAgICAgICAuc2V0SW4oW2FjdGlvbi5pZCwgJ2RhdGEnXSwgYWxsRGF0YSlcbiAgICAgICAgLnNldEluKFthY3Rpb24uaWQsICdhbGxEYXRhJ10sIGFsbERhdGEpXG4gICAgICAgIC5tZXJnZUluKFthY3Rpb24uaWQsICdzZXNzaW9uJ10sIHtcbiAgICAgICAgICBpc0J1c3k6IGZhbHNlLFxuICAgICAgICAgIGlzRWRpdGluZzogZmFsc2UsXG4gICAgICAgICAgaXNDcmVhdGluZzogZmFsc2UsXG4gICAgICAgIH0pXG4gICAgICAgIC5kZWxldGVJbihbYWN0aW9uLmlkLCAnZWRpdERhdGEnXSlcbiAgICAgICAgLmRlbGV0ZUluKFthY3Rpb24uaWQsICdjcmVhdGVEYXRhJ10pXG4gICAgICAgIC5kZWxldGVJbihbYWN0aW9uLmlkLCAnY3JlYXRlQ2VsbE1lc3NhZ2VzJywgJ2Vycm9yJ10pXG4gICAgICAgIC5kZWxldGVJbihbYWN0aW9uLmlkLCAnY2VsbE1lc3NhZ2VzJywgJ2Vycm9yJ10pO1xuXG4gICAgICBpZiAoZmlyc3RDcmVhdGVkSWQpIHtcbiAgICAgICAgVXRpbHMuc2F2ZVNlbGVjdGVkSXRlbXMoYWN0aW9uLmlkLCBbZmlyc3RDcmVhdGVkSWRdKTtcbiAgICAgICAgbmV3U3RhdGUgPSBuZXdTdGF0ZS5zZXRJbihbYWN0aW9uLmlkLCAnc2VsZWN0ZWRJdGVtcyddLCBMaXN0KFtmaXJzdENyZWF0ZWRJZF0pKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ld1N0YXRlO1xuICAgIH1cblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0FWRV9QQVJUSUFMX1NVQ0NFU1M6IHtcbiAgICAgIGxldCBhbGxEYXRhID0gc3RhdGUuZ2V0SW4oW2FjdGlvbi5pZCwgJ2FsbERhdGEnXSk7XG4gICAgICBsZXQgY3JlYXRlRGF0YSA9IHN0YXRlLmdldEluKFthY3Rpb24uaWQsICdjcmVhdGVEYXRhJ10pO1xuICAgICAgbGV0IGVkaXREYXRhID0gc3RhdGUuZ2V0SW4oW2FjdGlvbi5pZCwgJ2VkaXREYXRhJ10pO1xuICAgICAgY29uc3QgaXNDcmVhdGluZyA9IHN0YXRlLmdldEluKFthY3Rpb24uaWQsICdzZXNzaW9uJywgJ2lzQ3JlYXRpbmcnXSk7XG4gICAgICBhY3Rpb24uc2F2ZWRJdGVtcy5mb3JFYWNoKChzYXZlZEl0ZW1KUykgPT4ge1xuICAgICAgICBjb25zdCBzYXZlZEl0ZW0gPSBJbW11dGFibGUuZnJvbUpTKHNhdmVkSXRlbUpTKTtcbiAgICAgICAgbGV0IGZvdW5kSW5kZXggPSBhbGxEYXRhLmZpbmRJbmRleChcbiAgICAgICAgICBkID0+IGQuZ2V0SW4oYWN0aW9uLmlkS2V5UGF0aCkgPT09IHNhdmVkSXRlbS5nZXRJbihhY3Rpb24uaWRLZXlQYXRoKSxcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGZvdW5kSW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgYWxsRGF0YSA9IGFsbERhdGEucHVzaChzYXZlZEl0ZW0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFsbERhdGEgPSBhbGxEYXRhLm1lcmdlRGVlcEluKFtmb3VuZEluZGV4XSwgc2F2ZWRJdGVtKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNDcmVhdGluZykge1xuICAgICAgICAgIGZvdW5kSW5kZXggPSBzYXZlZEl0ZW0uZ2V0KCdyb3dJbmRleCcpO1xuICAgICAgICAgIGlmIChmb3VuZEluZGV4ICE9PSB1bmRlZmluZWQgJiYgZm91bmRJbmRleCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY3JlYXRlRGF0YSA9IGNyZWF0ZURhdGEuZGVsZXRlKGZvdW5kSW5kZXgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlZGl0RGF0YSA9IGVkaXREYXRhLmRlbGV0ZShzYXZlZEl0ZW0uZ2V0SW4oYWN0aW9uLmlkS2V5UGF0aCkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBzdGF0ZVxuICAgICAgICAuc2V0SW4oW2FjdGlvbi5pZCwgJ2RhdGEnXSwgYWxsRGF0YSlcbiAgICAgICAgLnNldEluKFthY3Rpb24uaWQsICdhbGxEYXRhJ10sIGFsbERhdGEpXG4gICAgICAgIC5zZXRJbihbYWN0aW9uLmlkLCAnY3JlYXRlRGF0YSddLCBjcmVhdGVEYXRhKVxuICAgICAgICAuc2V0SW4oW2FjdGlvbi5pZCwgJ2VkaXREYXRhJ10sIGVkaXREYXRhKVxuICAgICAgICAuc2V0SW4oW2FjdGlvbi5pZCwgJ3Nlc3Npb24nLCAnaXNCdXN5J10sIGZhbHNlKTtcbiAgICB9XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NBVkVfRkFJTDpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXRJbihbYWN0aW9uLmlkLCAnc2Vzc2lvbicsICdpc0J1c3knXSwgZmFsc2UpO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkU6XG4gICAgICByZXR1cm4gc3RhdGUuc2V0SW4oW2FjdGlvbi5pZCwgJ3Nlc3Npb24nLCAnaXNCdXN5J10sIHRydWUpO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9SRU1PVkVfU1VDQ0VTUzpcbiAgICAgIHJldHVybiBzdGF0ZVxuICAgICAgICAuc2V0SW4oW2FjdGlvbi5pZCwgJ3Nlc3Npb24nLCAnaXNCdXN5J10sIGZhbHNlKVxuICAgICAgICAudXBkYXRlSW4oXG4gICAgICAgICAgW2FjdGlvbi5pZCwgJ2RhdGEnXSxcbiAgICAgICAgICBkYXRhID0+IGRhdGEuZmlsdGVyTm90KFxuICAgICAgICAgICAgaXRlbSA9PiBhY3Rpb24ucmVtb3ZlZElkcy5pbmRleE9mKGl0ZW0uZ2V0SW4oYWN0aW9uLmlkS2V5UGF0aCkpID4gLTEsXG4gICAgICAgICAgKSxcbiAgICAgICAgKVxuICAgICAgICAudXBkYXRlSW4oXG4gICAgICAgICAgW2FjdGlvbi5pZCwgJ2FsbERhdGEnXSxcbiAgICAgICAgICBkYXRhID0+IGRhdGEuZmlsdGVyTm90KFxuICAgICAgICAgICAgaXRlbSA9PiBhY3Rpb24ucmVtb3ZlZElkcy5pbmRleE9mKGl0ZW0uZ2V0SW4oYWN0aW9uLmlkS2V5UGF0aCkpID4gLTEsXG4gICAgICAgICAgKSxcbiAgICAgICAgKVxuICAgICAgICAuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ3NlbGVjdGVkSXRlbXMnXSk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1JFTU9WRV9GQUlMOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldEluKFthY3Rpb24uaWQsICdzZXNzaW9uJywgJ2lzQnVzeSddLCBmYWxzZSk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0VESVRfQ0VMTF9WQUxVRV9DSEFOR0U6XG4gICAgICByZXR1cm4gc3RhdGUuc2V0SW4oW2FjdGlvbi5pZCwgJ2VkaXREYXRhJywgYWN0aW9uLmRhdGFJZCwgLi4uYWN0aW9uLmtleVBhdGhdLCBhY3Rpb24udmFsdWUpO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9DUkVBVEVfQ0VMTF9WQUxVRV9DSEFOR0U6XG4gICAgICByZXR1cm4gc3RhdGUuc2V0SW4oXG4gICAgICAgIFthY3Rpb24uaWQsICdjcmVhdGVEYXRhJywgYWN0aW9uLnJvd0luZGV4LCAuLi5hY3Rpb24ua2V5UGF0aF0sXG4gICAgICAgIGFjdGlvbi52YWx1ZSxcbiAgICAgICk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldEluKFxuICAgICAgICBbYWN0aW9uLmlkLCAnY2VsbE1lc3NhZ2VzJywgYWN0aW9uLm1lc3NhZ2VUeXBlLCBhY3Rpb24uZGF0YUlkLCAuLi5hY3Rpb24ua2V5UGF0aF0sXG4gICAgICAgIHsgaWQ6IGFjdGlvbi5tZXNzYWdlSWQsIHZhbHVlczogYWN0aW9uLm1lc3NhZ2VWYWx1ZXMgfSxcbiAgICAgICk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0hPV19NRVNTQUdFUzpcbiAgICAgIHJldHVybiBzdGF0ZS5tZXJnZUluKFthY3Rpb24uaWQsICdjZWxsTWVzc2FnZXMnXSwgSW1tdXRhYmxlLmZyb21KUyhhY3Rpb24ubWVzc2FnZXMpKTtcblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0VMTF9ISURFX01FU1NBR0U6IHtcbiAgICAgIGlmIChhY3Rpb24ubWVzc2FnZVR5cGUgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHN0YXRlLmRlbGV0ZUluKFthY3Rpb24uaWQsICdjZWxsTWVzc2FnZXMnXSk7XG4gICAgICB9XG4gICAgICBpZiAoYWN0aW9uLmRhdGFJZCA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gc3RhdGUuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ2NlbGxNZXNzYWdlcycsIGFjdGlvbi5tZXNzYWdlVHlwZV0pO1xuICAgICAgfVxuICAgICAgbGV0IHJvd01lc3NhZ2UgPSBzdGF0ZS5nZXRJbihbYWN0aW9uLmlkLCAnY2VsbE1lc3NhZ2VzJywgYWN0aW9uLm1lc3NhZ2VUeXBlLCBhY3Rpb24uZGF0YUlkXSk7XG4gICAgICBpZiAocm93TWVzc2FnZSkge1xuICAgICAgICBpZiAoYWN0aW9uLmtleVBhdGgpIHtcbiAgICAgICAgICByb3dNZXNzYWdlID0gcm93TWVzc2FnZS5kZWxldGVJbihhY3Rpb24ua2V5UGF0aCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJvd01lc3NhZ2Uuc2l6ZSA9PT0gMCB8fCAhYWN0aW9uLmtleVBhdGgpIHtcbiAgICAgICAgICByZXR1cm4gc3RhdGUuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ2NlbGxNZXNzYWdlcycsIGFjdGlvbi5tZXNzYWdlVHlwZSwgYWN0aW9uLmRhdGFJZF0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdGF0ZS5zZXRJbihcbiAgICAgICAgICBbYWN0aW9uLmlkLCAnY2VsbE1lc3NhZ2VzJywgYWN0aW9uLm1lc3NhZ2VUeXBlLCBhY3Rpb24uZGF0YUlkXSxcbiAgICAgICAgICByb3dNZXNzYWdlLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfU0hPV19NRVNTQUdFOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldEluKFxuICAgICAgICBbYWN0aW9uLmlkLCAnY3JlYXRlQ2VsbE1lc3NhZ2VzJywgYWN0aW9uLm1lc3NhZ2VUeXBlLCBhY3Rpb24ucm93SW5kZXgsIC4uLmFjdGlvbi5rZXlQYXRoXSxcbiAgICAgICAgeyBpZDogYWN0aW9uLm1lc3NhZ2VJZCwgdmFsdWVzOiBhY3Rpb24ubWVzc2FnZVZhbHVlcyB9LFxuICAgICAgKTtcblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ1JFQVRFX0NFTExfSElERV9NRVNTQUdFOiB7XG4gICAgICBpZiAoYWN0aW9uLm1lc3NhZ2VUeXBlID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBzdGF0ZS5kZWxldGVJbihbYWN0aW9uLmlkLCAnY3JlYXRlQ2VsbE1lc3NhZ2VzJ10pO1xuICAgICAgfVxuICAgICAgaWYgKGFjdGlvbi5yb3dJbmRleCA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gc3RhdGUuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ2NyZWF0ZUNlbGxNZXNzYWdlcycsIGFjdGlvbi5tZXNzYWdlVHlwZV0pO1xuICAgICAgfVxuICAgICAgbGV0IHJvd01lc3NhZ2UgPSBzdGF0ZS5nZXRJbihbXG4gICAgICAgIGFjdGlvbi5pZCxcbiAgICAgICAgJ2NyZWF0ZUNlbGxNZXNzYWdlcycsXG4gICAgICAgIGFjdGlvbi5tZXNzYWdlVHlwZSxcbiAgICAgICAgYWN0aW9uLnJvd0luZGV4LFxuICAgICAgXSk7XG4gICAgICBpZiAocm93TWVzc2FnZSkge1xuICAgICAgICBpZiAoYWN0aW9uLmtleVBhdGgpIHtcbiAgICAgICAgICByb3dNZXNzYWdlID0gcm93TWVzc2FnZS5kZWxldGVJbihhY3Rpb24ua2V5UGF0aCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJvd01lc3NhZ2Uuc2l6ZSA9PT0gMCB8fCAhYWN0aW9uLmtleVBhdGgpIHtcbiAgICAgICAgICByZXR1cm4gc3RhdGUuZGVsZXRlSW4oW1xuICAgICAgICAgICAgYWN0aW9uLmlkLFxuICAgICAgICAgICAgJ2NyZWF0ZUNlbGxNZXNzYWdlcycsXG4gICAgICAgICAgICBhY3Rpb24ubWVzc2FnZVR5cGUsXG4gICAgICAgICAgICBhY3Rpb24ucm93SW5kZXgsXG4gICAgICAgICAgXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0YXRlLnNldEluKFxuICAgICAgICAgIFthY3Rpb24uaWQsICdjcmVhdGVDZWxsTWVzc2FnZXMnLCBhY3Rpb24ubWVzc2FnZVR5cGUsIGFjdGlvbi5yb3dJbmRleF0sXG4gICAgICAgICAgcm93TWVzc2FnZSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NFTExfU0VMRUNUSU9OX0NIQU5HRTpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXRJbihbYWN0aW9uLmlkLCAnc2VsZWN0ZWRDZWxsJ10sIGFjdGlvbi5zZWxlY3RlZENlbGwpO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9JVEVNX1NFTEVDVElPTl9DSEFOR0U6IHtcbiAgICAgIGNvbnN0IG5ld1N0YXRlID0gc3RhdGUuc2V0SW4oW2FjdGlvbi5pZCwgJ3Nlc3Npb24nLCAnbGFzdENsaWNrZWRSb3dJbmRleCddLCBhY3Rpb24ucm93SW5kZXgpO1xuXG4gICAgICAvLyBIYW5kbGUgY2FzZSB3aGVyZSBzaGlmdCBrZXkgaXMgcHJlc3NlZFxuICAgICAgLy8gU2VsZWN0IGFsbCByb3dzIGZyb20gbGFzdENsaWNrZWRSb3cgdG8gY3VycmVudGx5IGNsaWNrZWQgcm93XG4gICAgICBpZiAoYWN0aW9uLnNoaWZ0UHJlc3NlZCkge1xuICAgICAgICBjb25zdCBsYXN0Um93SW5kZXggPSBzdGF0ZS5nZXRJbihbYWN0aW9uLmlkLCAnc2Vzc2lvbicsICdsYXN0Q2xpY2tlZFJvd0luZGV4J10sIGZhbHNlKTtcbiAgICAgICAgaWYgKGxhc3RSb3dJbmRleCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICBjb25zdCBzZWxlY3RSb3dJZHMgPSBbXTtcbiAgICAgICAgICBpZiAobGFzdFJvd0luZGV4IDwgYWN0aW9uLnJvd0luZGV4KSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gbGFzdFJvd0luZGV4OyBpIDw9IGFjdGlvbi5yb3dJbmRleDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGRhdGFJZCA9IHN0YXRlLmdldEluKFthY3Rpb24uaWQsICdkYXRhJywgaSwgLi4uYWN0aW9uLmlkS2V5UGF0aF0pO1xuICAgICAgICAgICAgICBpZiAoZGF0YUlkKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0Um93SWRzLnB1c2goZGF0YUlkKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gYWN0aW9uLnJvd0luZGV4OyBpIDw9IGxhc3RSb3dJbmRleDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGRhdGFJZCA9IHN0YXRlLmdldEluKFthY3Rpb24uaWQsICdkYXRhJywgaSwgLi4uYWN0aW9uLmlkS2V5UGF0aF0pO1xuICAgICAgICAgICAgICBpZiAoZGF0YUlkKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0Um93SWRzLnB1c2goZGF0YUlkKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbmV3U3RhdGUuc2V0SW4oW2FjdGlvbi5pZCwgJ3NlbGVjdGVkSXRlbXMnXSwgTGlzdChzZWxlY3RSb3dJZHMpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBkYXRhSWQgPSBzdGF0ZS5nZXRJbihbYWN0aW9uLmlkLCAnZGF0YScsIGFjdGlvbi5yb3dJbmRleCwgLi4uYWN0aW9uLmlkS2V5UGF0aF0pO1xuICAgICAgY29uc3QgZm91bmRJbmRleCA9IHN0YXRlLmdldEluKFthY3Rpb24uaWQsICdzZWxlY3RlZEl0ZW1zJ10sIExpc3QoKSkuaW5kZXhPZihkYXRhSWQpO1xuICAgICAgaWYgKGZvdW5kSW5kZXggPT09IC0xKSB7XG4gICAgICAgIGlmIChhY3Rpb24uY3RybFByZXNzZWQpIHtcbiAgICAgICAgICByZXR1cm4gbmV3U3RhdGUudXBkYXRlSW4oXG4gICAgICAgICAgICBbYWN0aW9uLmlkLCAnc2VsZWN0ZWRJdGVtcyddLFxuICAgICAgICAgICAgTGlzdCgpLFxuICAgICAgICAgICAgaXRlbXMgPT4gaXRlbXMucHVzaChkYXRhSWQpLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld1N0YXRlLnNldEluKFthY3Rpb24uaWQsICdzZWxlY3RlZEl0ZW1zJ10sIExpc3QoW2RhdGFJZF0pKTtcbiAgICAgIH1cbiAgICAgIGlmIChhY3Rpb24uY3RybFByZXNzZWQpIHtcbiAgICAgICAgcmV0dXJuIG5ld1N0YXRlLnVwZGF0ZUluKFthY3Rpb24uaWQsICdzZWxlY3RlZEl0ZW1zJ10sIGl0ZW1zID0+IGl0ZW1zLmRlbGV0ZShmb3VuZEluZGV4KSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3U3RhdGUuc2V0SW4oW2FjdGlvbi5pZCwgJ3NlbGVjdGVkSXRlbXMnXSwgTGlzdChbZGF0YUlkXSkpO1xuICAgIH1cblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfU0VMRUNUX0FMTF9JVEVNU19DSEFOR0U6XG4gICAgICBpZiAoXG4gICAgICAgIHN0YXRlLmdldEluKFthY3Rpb24uaWQsICdzZWxlY3RlZEl0ZW1zJ10sIExpc3QoKSkuc2l6ZVxuICAgICAgICA9PT0gc3RhdGUuZ2V0SW4oW2FjdGlvbi5pZCwgJ2RhdGEnXSwgTGlzdCgpKS5zaXplXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIHN0YXRlLmRlbGV0ZUluKFthY3Rpb24uaWQsICdzZWxlY3RlZEl0ZW1zJ10pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0YXRlLnNldEluKFxuICAgICAgICBbYWN0aW9uLmlkLCAnc2VsZWN0ZWRJdGVtcyddLFxuICAgICAgICBzdGF0ZS5nZXRJbihbYWN0aW9uLmlkLCAnZGF0YSddLCBMaXN0KCkpLm1hcChpdGVtID0+IGl0ZW0uZ2V0SW4oYWN0aW9uLmlkS2V5UGF0aCkpLFxuICAgICAgKTtcblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ0xFQVJfU0VMRUNURURfSVRFTVM6XG4gICAgICByZXR1cm4gc3RhdGUuZGVsZXRlSW4oW2FjdGlvbi5pZCwgJ3NlbGVjdGVkSXRlbXMnXSk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1RPR0dMRV9GSUxURVJJTkc6IHtcbiAgICAgIGlmICghYWN0aW9uLmlzRmlsdGVyaW5nKSB7XG4gICAgICAgIHJldHVybiBzdGF0ZVxuICAgICAgICAgIC5zZXRJbihbYWN0aW9uLmlkLCAnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnXSwgTWFwKHsgaXNGaWx0ZXJpbmc6IGZhbHNlIH0pKVxuICAgICAgICAgIC5zZXRJbihbYWN0aW9uLmlkLCAnZGF0YSddLCBzdGF0ZS5nZXRJbihbYWN0aW9uLmlkLCAnYWxsRGF0YSddKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RhdGUuc2V0SW4oW2FjdGlvbi5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJ10sIE1hcCh7IGlzRmlsdGVyaW5nOiB0cnVlIH0pKTtcbiAgICB9XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0ZJTFRFUl9EQVRBX0NIQU5HRTpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXRJbihbYWN0aW9uLmlkLCAnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnZmlsdGVyRGF0YSddLCBJbW11dGFibGUuZnJvbUpTKGFjdGlvbi5maWx0ZXJEYXRhKSk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0FQUExZX0ZJTFRFUlM6XG4gICAgICByZXR1cm4gc3RhdGUuc2V0SW4oW2FjdGlvbi5pZCwgJ2RhdGEnXSwgYWN0aW9uLmRhdGEpO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfRklMVEVSUzpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXRJbihbYWN0aW9uLmlkLCAnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnXSwgYWN0aW9uLmZpbHRlcmluZ0RhdGEpO1xuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9VUERBVEVfRVhJU1RJTkdfQ0VMTF9WQUxVRToge1xuICAgICAgY29uc3QgaW5kZXhBbGxEYXRhID0gc3RhdGVcbiAgICAgICAgLmdldEluKFthY3Rpb24uZ3JpZC5pZCwgJ2FsbERhdGEnXSwgTGlzdCgpKVxuICAgICAgICAuZmluZEluZGV4KGQgPT4gZC5nZXRJbihhY3Rpb24uZ3JpZC5pZEtleVBhdGgpID09PSBhY3Rpb24uZGF0YUlkKTtcbiAgICAgIGNvbnN0IGluZGV4RGF0YSA9IHN0YXRlXG4gICAgICAgIC5nZXRJbihbYWN0aW9uLmdyaWQuaWQsICdkYXRhJ10sIExpc3QoKSlcbiAgICAgICAgLmZpbmRJbmRleChkID0+IGQuZ2V0SW4oYWN0aW9uLmdyaWQuaWRLZXlQYXRoKSA9PT0gYWN0aW9uLmRhdGFJZCk7XG4gICAgICBpZiAoaW5kZXhBbGxEYXRhICE9PSAtMSAmJiBpbmRleERhdGEgIT09IC0xKSB7XG4gICAgICAgIHJldHVybiBzdGF0ZVxuICAgICAgICAgIC5zZXRJbihbYWN0aW9uLmdyaWQuaWQsICdhbGxEYXRhJywgaW5kZXhBbGxEYXRhLCAuLi5hY3Rpb24ua2V5UGF0aF0sIGFjdGlvbi52YWx1ZSlcbiAgICAgICAgICAuc2V0SW4oW2FjdGlvbi5ncmlkLmlkLCAnZGF0YScsIGluZGV4RGF0YSwgLi4uYWN0aW9uLmtleVBhdGhdLCBhY3Rpb24udmFsdWUpO1xuICAgICAgfVxuICAgICAgaWYgKGluZGV4QWxsRGF0YSAhPT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIHN0YXRlXG4gICAgICAgICAgLnNldEluKFthY3Rpb24uZ3JpZC5pZCwgJ2FsbERhdGEnLCBpbmRleEFsbERhdGEsIC4uLmFjdGlvbi5rZXlQYXRoXSwgYWN0aW9uLnZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGlmIChpbmRleERhdGEgIT09IC0xKSB7XG4gICAgICAgIHJldHVybiBzdGF0ZVxuICAgICAgICAgIC5zZXRJbihbYWN0aW9uLmdyaWQuaWQsICdkYXRhJywgaW5kZXhEYXRhLCAuLi5hY3Rpb24ua2V5UGF0aF0sIGFjdGlvbi52YWx1ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuXG4gICAgY2FzZSBUWVBFUy5QTEFURk9STV9EQVRBR1JJRF9TRVRfRURJVF9EQVRBOlxuICAgICAgcmV0dXJuIHN0YXRlXG4gICAgICAgIC5zZXRJbihbYWN0aW9uLmlkLCAnc2Vzc2lvbicsICdpc0VkaXRpbmcnXSwgdHJ1ZSlcbiAgICAgICAgLnNldEluKFthY3Rpb24uaWQsICdlZGl0RGF0YSddLCBhY3Rpb24uZGF0YSlcbiAgICAgICAgLnNldEluKFthY3Rpb24uaWQsICdjZWxsTWVzc2FnZXMnXSwgYWN0aW9uLmNlbGxNZXNzYWdlcyk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19NT0RBTF9PUEVOOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldEluKFthY3Rpb24uaWQsICdzZXNzaW9uJywgJ2NvbHVtblNldHRpbmdzTW9kYWwnLCAnb3BlbiddLCB0cnVlKTtcblxuICAgIGNhc2UgVFlQRVMuUExBVEZPUk1fREFUQUdSSURfQ09MVU1OX1NFVFRJTkdTX01PREFMX0NMT1NFOlxuICAgICAgcmV0dXJuIHN0YXRlLmRlbGV0ZUluKFthY3Rpb24uaWQsICdzZXNzaW9uJywgJ2NvbHVtblNldHRpbmdzTW9kYWwnXSk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX0NPTFVNTl9TRVRUSU5HU19TQVZFOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldEluKFxuICAgICAgICBbYWN0aW9uLmlkLCAnY29uZmlnJywgJ3Zpc2libGVDb2x1bW5zJ10sXG4gICAgICAgIEltbXV0YWJsZS5mcm9tSlMoYWN0aW9uLmNvbHVtbk9yZGVyKSxcbiAgICAgICk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NFVF9QQUdFOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldEluKFthY3Rpb24uaWQsICdjb25maWcnLCAncGFnZSddLCBhY3Rpb24ucGFnZSk7XG5cbiAgICBjYXNlIFRZUEVTLlBMQVRGT1JNX0RBVEFHUklEX1NFVF9ST1dTX09OX1BBR0U6XG4gICAgICByZXR1cm4gc3RhdGUuc2V0SW4oW2FjdGlvbi5pZCwgJ2NvbmZpZycsICdyb3dzT25QYWdlJ10sIGFjdGlvbi5yb3dzT25QYWdlKTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn1cbiJdfQ==