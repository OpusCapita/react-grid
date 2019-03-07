import Immutable, { Map, List } from 'immutable';
import { TYPES } from './datagrid.actions';
import { INITIAL_STATE } from './datagrid.constants';
import Utils from './datagrid.utils';

export default function datagridReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TYPES.PLATFORM_DATAGRID_INVALIDATE:
      return state
        .deleteIn([action.id, 'data'])
        .deleteIn([action.id, 'allData'])
        .deleteIn([action.id, 'session'])
        .deleteIn([action.id, 'selectedCell'])
        .deleteIn([action.id, 'editData'])
        .deleteIn([action.id, 'createData'])
        .deleteIn([action.id, 'createCellMessages'])
        .deleteIn([action.id, 'cellMessages']);

    case TYPES.PLATFORM_DATAGRID_FORCE_REFRESH:
      return state.set('forceRefresh', Date.now());

    case TYPES.PLATFORM_DATAGRID_SET_DATA:
      return state
        .setIn([action.id, 'data'], action.data)
        .setIn([action.id, 'allData'], action.data)
        .setIn([action.id, 'config'], Immutable.fromJS(action.config))
        .setIn([action.id, 'selectedItems'], Immutable.fromJS(action.selectedItems))
        .mergeIn([action.id, 'session'], {
          isEditing: false,
          isCreating: false,
          isBusy: false,
        })
        .deleteIn([action.id, 'selectedCell'])
        .deleteIn([action.id, 'editData'])
        .deleteIn([action.id, 'createData'])
        .deleteIn([action.id, 'createCellMessages'])
        .deleteIn([action.id, 'cellMessages']);

    case TYPES.PLATFORM_DATAGRID_BUSY:
      return state.setIn([action.id, 'session', 'isBusy'], true);

    case TYPES.PLATFORM_DATAGRID_READY:
      return state.setIn([action.id, 'session', 'isBusy'], false);

    case TYPES.PLATFORM_DATAGRID_APPLY_SORT:
      return state
        .setIn([action.id, 'data'], action.data)
        .setIn([action.id, 'allData'], action.allData);

    case TYPES.PLATFORM_DATAGRID_SORT_CHANGE:
      return state
        .setIn([action.id, 'config', 'sortingData'], Map({
          sortColumn: action.sortColumn,
          sortOrder: action.sortOrder,
        }));

    case TYPES.PLATFORM_DATAGRID_RESIZE_COLUMN:
      return state.setIn([action.id, 'config', 'columnWidths'], action.columnWidths);

    case TYPES.PLATFORM_DATAGRID_EDIT:
      return state.setIn([action.id, 'session', 'isEditing'], true);

    case TYPES.PLATFORM_DATAGRID_CREATE:
      return state
        .setIn([action.id, 'createData'], List([Immutable.fromJS(action.columnDefaultValues)]))
        .deleteIn([action.id, 'selectedCell'])
        .mergeIn([action.id, 'session'], {
          isCreating: true,
        });

    case TYPES.PLATFORM_DATAGRID_ADD_NEW_ITEM:
      return state
        .updateIn([
          action.id,
          'createData',
        ], List(), items => items.push(Immutable.fromJS(action.columnDefaultValues)));

    case TYPES.PLATFORM_DATAGRID_REMOVE_ITEM: {
      const allDataIndex = state.getIn([action.id, 'allData'], List())
        .findIndex(item => (item.getIn(action.idKeyPath) === action.rowId));
      const dataIndex = state.getIn([action.id, 'data'], List())
        .findIndex(item => (item.getIn(action.idKeyPath) === action.rowId));
      return state
        .deleteIn([action.id, 'data', dataIndex])
        .deleteIn([action.id, 'allData', allDataIndex])
        .deleteIn([action.id, 'editData', action.rowId])
        .deleteIn([action.id, 'cellMessages', 'error', action.rowId])
        .deleteIn([action.id, 'cellMessages', 'info', action.rowId])
        .deleteIn([action.id, 'cellMessages', 'warning', action.rowId]);
    }

    case TYPES.PLATFORM_DATAGRID_SET_FOCUS_TO: {
      // focus type is saved as a immutable Map to make it easier to detect changes
      // when requesting same type of focus several times
      return state.setIn(
        [action.id, 'session', 'focusType'],
        Map({ type: action.focusTo, focusToLastRow: action.focusToLastRow }),
      );
    }

    case TYPES.PLATFORM_DATAGRID_REMOVE_NEW_ITEM:
      return state.deleteIn([action.id, 'createData', action.index]);

    case TYPES.PLATFORM_DATAGRID_REMOVE_NEW_ITEMS:
      return state
        .setIn(
          [action.id, 'createData'],
          state
            .getIn([action.id, 'createData'], List())
            .filter((val, idx) => action.indexes.indexOf(idx) === -1),
        );

    case TYPES.PLATFORM_DATAGRID_CANCEL:
      return state
        .mergeIn([action.id, 'session'], Map({
          isEditing: false,
          isCreating: false,
        }))
        .deleteIn([action.id, 'editData'])
        .deleteIn([action.id, 'createData'])
        .deleteIn([action.id, 'createCellMessages', 'error'])
        .deleteIn([action.id, 'cellMessages', 'error']);

    case TYPES.PLATFORM_DATAGRID_SAVE:
      return state.setIn([action.id, 'session', 'isBusy'], true);

    case TYPES.PLATFORM_DATAGRID_EXTEND_DATA: {
      const allData = state.getIn([action.id, 'allData']);
      const extendedData = action.prepend
        ? action.data.concat(allData) : allData.concat(action.data);

      return state
        .setIn([action.id, 'data'], extendedData)
        .setIn([action.id, 'allData'], extendedData);
    }

    case TYPES.PLATFORM_DATAGRID_SAVE_SUCCESS: {
      let allData = state.getIn([action.id, 'allData']);
      let firstCreatedId = null;

      action.savedItems.forEach((savedItemJS) => {
        const savedItem = Immutable.fromJS(savedItemJS);
        const foundIndex = allData.findIndex(d => (
          d.getIn(action.idKeyPath) === savedItem.getIn(action.idKeyPath)
        ));
        if (foundIndex === -1) {
          if (!firstCreatedId && savedItem.getIn(action.idKeyPath)) {
            firstCreatedId = savedItem.getIn(action.idKeyPath);
          }
          allData = allData.push(savedItem);
        } else {
          allData = allData.mergeDeepIn([foundIndex], savedItem);
        }
      });


      let newState = state
        .setIn([action.id, 'data'], allData)
        .setIn([action.id, 'allData'], allData)
        .mergeIn([action.id, 'session'], {
          isBusy: false,
          isEditing: false,
          isCreating: false,
        })
        .deleteIn([action.id, 'editData'])
        .deleteIn([action.id, 'createData'])
        .deleteIn([action.id, 'createCellMessages', 'error'])
        .deleteIn([action.id, 'cellMessages', 'error']);

      if (firstCreatedId) {
        Utils.saveSelectedItems(action.id, [firstCreatedId]);
        newState = newState.setIn([action.id, 'selectedItems'], List([firstCreatedId]));
      }

      return newState;
    }

    case TYPES.PLATFORM_DATAGRID_SAVE_PARTIAL_SUCCESS: {
      let allData = state.getIn([action.id, 'allData']);
      let createData = state.getIn([action.id, 'createData']);
      let editData = state.getIn([action.id, 'editData']);
      const isCreating = state.getIn([action.id, 'session', 'isCreating']);
      action.savedItems.forEach((savedItemJS) => {
        const savedItem = Immutable.fromJS(savedItemJS);
        let foundIndex = allData.findIndex(d => (
          d.getIn(action.idKeyPath) === savedItem.getIn(action.idKeyPath)
        ));
        if (foundIndex === -1) {
          allData = allData.push(savedItem);
        } else {
          allData = allData.mergeDeepIn([foundIndex], savedItem);
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
      return state
        .setIn([action.id, 'data'], allData)
        .setIn([action.id, 'allData'], allData)
        .setIn([action.id, 'createData'], createData)
        .setIn([action.id, 'editData'], editData)
        .setIn([action.id, 'session', 'isBusy'], false);
    }

    case TYPES.PLATFORM_DATAGRID_SAVE_FAIL:
      return state.setIn([action.id, 'session', 'isBusy'], false);

    case TYPES.PLATFORM_DATAGRID_REMOVE:
      return state.setIn([action.id, 'session', 'isBusy'], true);

    case TYPES.PLATFORM_DATAGRID_REMOVE_SUCCESS:
      return state
        .setIn([action.id, 'session', 'isBusy'], false)
        .updateIn([action.id, 'data'], data => data.filterNot(item => (
          action.removedIds.indexOf(item.getIn(action.idKeyPath)) > -1
        )))
        .updateIn([action.id, 'allData'], data => data.filterNot(item => (
          action.removedIds.indexOf(item.getIn(action.idKeyPath)) > -1
        )))
        .deleteIn([action.id, 'selectedItems']);

    case TYPES.PLATFORM_DATAGRID_REMOVE_FAIL:
      return state.setIn([action.id, 'session', 'isBusy'], false);

    case TYPES.PLATFORM_DATAGRID_EDIT_CELL_VALUE_CHANGE:
      return state
        .setIn(
          [action.id, 'editData', action.dataId, ...action.keyPath],
          action.value,
        );

    case TYPES.PLATFORM_DATAGRID_CREATE_CELL_VALUE_CHANGE:
      return state
        .setIn(
          [action.id, 'createData', action.rowIndex, ...action.keyPath],
          action.value,
        );

    case TYPES.PLATFORM_DATAGRID_CELL_SHOW_MESSAGE:
      return state
        .setIn(
          [action.id, 'cellMessages', action.messageType, action.dataId, ...action.keyPath],
          { id: action.messageId, values: action.messageValues },
        );

    case TYPES.PLATFORM_DATAGRID_CELL_SHOW_MESSAGES:
      return state.mergeIn([action.id, 'cellMessages'], Immutable.fromJS(action.messages));

    case TYPES.PLATFORM_DATAGRID_CELL_HIDE_MESSAGE: {
      if (action.messageType === null) {
        return state.deleteIn([action.id, 'cellMessages']);
      }
      if (action.dataId === null) {
        return state.deleteIn([action.id, 'cellMessages', action.messageType]);
      }
      let rowMessage = state.getIn([action.id, 'cellMessages', action.messageType, action.dataId]);
      if (rowMessage) {
        if (action.keyPath) {
          rowMessage = rowMessage.deleteIn(action.keyPath);
        }
        if (rowMessage.size === 0 || !action.keyPath) {
          return state.deleteIn([action.id, 'cellMessages', action.messageType, action.dataId]);
        }
        return state.setIn(
          [action.id, 'cellMessages', action.messageType, action.dataId],
          rowMessage,
        );
      }
      return state;
    }

    case TYPES.PLATFORM_DATAGRID_CREATE_CELL_SHOW_MESSAGE:
      return state
        .setIn(
          [action.id, 'createCellMessages', action.messageType, action.rowIndex, ...action.keyPath],
          { id: action.messageId, values: action.messageValues },
        );

    case TYPES.PLATFORM_DATAGRID_CREATE_CELL_HIDE_MESSAGE: {
      if (action.messageType === null) {
        return state.deleteIn([action.id, 'createCellMessages']);
      }
      if (action.rowIndex === null) {
        return state.deleteIn([action.id, 'createCellMessages', action.messageType]);
      }
      let rowMessage = state.getIn([
        action.id,
        'createCellMessages',
        action.messageType,
        action.rowIndex,
      ]);
      if (rowMessage) {
        if (action.keyPath) {
          rowMessage = rowMessage.deleteIn(action.keyPath);
        }
        if (rowMessage.size === 0 || !action.keyPath) {
          return state.deleteIn([
            action.id,
            'createCellMessages',
            action.messageType,
            action.rowIndex,
          ]);
        }
        return state.setIn(
          [action.id, 'createCellMessages', action.messageType, action.rowIndex],
          rowMessage,
        );
      }
      return state;
    }

    case TYPES.PLATFORM_DATAGRID_CELL_SELECTION_CHANGE:
      return state.setIn([action.id, 'selectedCell'], action.selectedCell);

    case TYPES.PLATFORM_DATAGRID_ITEM_SELECTION_CHANGE: {
      const newState = state.setIn([action.id, 'session', 'lastClickedRowIndex'], action.rowIndex);

      // Handle case where shift key is pressed
      // Select all rows from lastClickedRow to currently clicked row
      if (action.shiftPressed) {
        const lastRowIndex = state.getIn([action.id, 'session', 'lastClickedRowIndex'], false);
        if (lastRowIndex !== false) {
          const selectRowIds = [];
          if (lastRowIndex < action.rowIndex) {
            for (let i = lastRowIndex; i <= action.rowIndex; i += 1) {
              const dataId = state.getIn([action.id, 'data', i, ...action.idKeyPath]);
              if (dataId) {
                selectRowIds.push(dataId);
              }
            }
          } else {
            for (let i = action.rowIndex; i <= lastRowIndex; i += 1) {
              const dataId = state.getIn([action.id, 'data', i, ...action.idKeyPath]);
              if (dataId) {
                selectRowIds.push(dataId);
              }
            }
          }
          return newState
            .setIn(
              [action.id, 'selectedItems'],
              List(selectRowIds),
            );
        }
      }

      const dataId = state.getIn([action.id, 'data', action.rowIndex, ...action.idKeyPath]);
      const foundIndex = state
        .getIn([action.id, 'selectedItems'], List()).indexOf(dataId);
      if (foundIndex === -1) {
        if (action.ctrlPressed) {
          return newState
            .updateIn(
              [action.id, 'selectedItems'],
              List(), items => items.push(dataId),
            );
        }
        return newState
          .setIn(
            [action.id, 'selectedItems'],
            List([dataId]),
          );
      }
      if (action.ctrlPressed) {
        return newState
          .updateIn(
            [action.id, 'selectedItems'],
            items => items.delete(foundIndex),
          );
      }
      return newState
        .setIn(
          [action.id, 'selectedItems'],
          List([dataId]),
        );
    }

    case TYPES.PLATFORM_DATAGRID_SELECT_ALL_ITEMS_CHANGE:
      if (
        state.getIn([action.id, 'selectedItems'], List()).size
        === state.getIn([action.id, 'data'], List()).size
      ) {
        return state.deleteIn([action.id, 'selectedItems']);
      }
      return state
        .setIn(
          [action.id, 'selectedItems'],
          state
            .getIn([action.id, 'data'], List())
            .map(item => item.getIn(action.idKeyPath)),
        );

    case TYPES.PLATFORM_DATAGRID_CLEAR_SELECTED_ITEMS:
      return state.deleteIn([action.id, 'selectedItems']);

    case TYPES.PLATFORM_DATAGRID_TOGGLE_FILTERING: {
      if (!action.isFiltering) {
        return state
          .setIn([action.id, 'config', 'filteringData'], Map({ isFiltering: false }))
          .setIn([action.id, 'data'], state.getIn([action.id, 'allData']));
      }
      return state
        .setIn([action.id, 'config', 'filteringData'], Map({ isFiltering: true }));
    }

    case TYPES.PLATFORM_DATAGRID_FILTER_DATA_CHANGE:
      return state
        .setIn(
          [action.id, 'config', 'filteringData', 'filterData'],
          action.filterData,
        );

    case TYPES.PLATFORM_DATAGRID_APPLY_FILTERS:
      return state
        .setIn(
          [action.id, 'data'],
          action.data,
        );

    case TYPES.PLATFORM_DATAGRID_SET_FILTERS:
      return state
        .setIn(
          [action.id, 'config', 'filteringData'],
          action.filteringData,
        );

    case TYPES.PLATFORM_DATAGRID_UPDATE_EXISTING_CELL_VALUE: {
      const newState = state
        .setIn(
          [action.id, 'allData', action.dataId, ...action.keyPath],
          action.value,
        );
      if (state.hasIn([action.id, 'data', action.dataId, ...action.keyPath])) {
        return newState
          .setIn(
            [action.id, 'data', action.dataId, ...action.keyPath],
            action.value,
          );
      }
      return newState;
    }

    case TYPES.PLATFORM_DATAGRID_SET_EDIT_DATA:
      return state
        .setIn([action.id, 'session', 'isEditing'], true)
        .setIn([action.id, 'editData'], action.data)
        .setIn([action.id, 'cellMessages'], action.cellMessages);

    case TYPES.PLATFORM_DATAGRID_COLUMN_SETTINGS_MODAL_OPEN:
      return state.setIn([action.id, 'session', 'columnSettingsModal', 'open'], true);

    case TYPES.PLATFORM_DATAGRID_COLUMN_SETTINGS_MODAL_CLOSE:
      return state.deleteIn([action.id, 'session', 'columnSettingsModal']);

    case TYPES.PLATFORM_DATAGRID_COLUMN_SETTINGS_SAVE:
      return state
        .setIn([action.id, 'config', 'visibleColumns'], Immutable.fromJS(action.columnOrder));

    case TYPES.PLATFORM_DATAGRID_SET_PAGE:
      return state
        .setIn([action.id, 'config', 'page'], action.page);

    case TYPES.PLATFORM_DATAGRID_SET_ROWS_ON_PAGE:
      return state
        .setIn([action.id, 'config', 'rowsOnPage'], action.rowsOnPage);

    default:
      return state;
  }
}
