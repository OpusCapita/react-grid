/* eslint-disable no-lonely-if, prefer-template, react/require-default-props */
import React from 'react';
import { Map, List } from 'immutable';
import { connect } from 'react-redux';
import {
  injectIntl,
  FormattedMessage as M,
} from 'react-intl';
import { Column, Cell } from 'fixed-data-table-2';
import { MenuItem } from 'react-bootstrap';
import classNames from 'classnames';
import { Icon } from '@opuscapita/react-icons';
import Spinner from '@opuscapita/react-spinner';
import Checkbox from '@opuscapita/react-checkbox';
import 'fixed-data-table-2/dist/fixed-data-table.css';

import ResponsiveFixedDataTable from './responsive-fixed-data-table.component';
import HeaderCell from './header-cell.component';
import ActionBar from './action-bar.component';
import InlineEditControls from './inline-edit-controls.component';
import FilteringControls from './filtering-controls.component';
import DropdownControls from './dropdown-controls.component';
import * as datagridActions from './datagrid.actions';
import CellTooltip from './cell-tooltip.component';
import ColumnSettingsModal from './column-settings/column-settings.component';
import { propTypes, defaultProps } from './datagrid.props';
import { KEY_CODES } from './datagrid.constants';
import pagination from './pagination.component';
import Utils from './datagrid.utils';
import GridColumnService from './column-service/column-service';
import './datagrid.component.scss';

const mapStateToProps = (state, ownProps) => {
  const GRID = ownProps.grid;
  return {
    isBusy: state.datagrid.getIn([GRID.id, 'session', 'isBusy'], true),
    isEditing: state.datagrid.getIn([GRID.id, 'session', 'isEditing'], false),
    isCreating: state.datagrid.getIn([GRID.id, 'session', 'isCreating'], false),
    isFiltering:
      state.datagrid.getIn([GRID.id, 'config', 'filteringData', 'isFiltering'], false),
    isColumnSettingsModalOpen:
      state.datagrid.getIn([GRID.id, 'session', 'columnSettingsModal', 'open'], false),
    sortColumn: state.datagrid.getIn([GRID.id, 'config', 'sortingData', 'sortColumn'], null),
    sortOrder: state.datagrid.getIn([GRID.id, 'config', 'sortingData', 'sortOrder'], null),
    visibleColumns: state.datagrid.getIn([GRID.id, 'config', 'visibleColumns'], List()),
    columnWidths: state.datagrid.getIn([GRID.id, 'config', 'columnWidths'], Map()),
    selectedCell: state.datagrid.getIn([GRID.id, 'selectedCell'], Map()),
    selectedItems: state.datagrid.getIn([GRID.id, 'selectedItems'], List()),
    data: state.datagrid.getIn([GRID.id, 'data'], List()),
    editData: state.datagrid.getIn([GRID.id, 'editData'], Map()),
    createData: state.datagrid.getIn([GRID.id, 'createData'], List()),
    filterData: state.datagrid.getIn([GRID.id, 'config', 'filteringData', 'filterData'], Map()),
    cellMessages: state.datagrid.getIn([GRID.id, 'cellMessages'], Map()),
    createCellMessages: state.datagrid.getIn([GRID.id, 'createCellMessages'], Map()),
    allDataSize: state.datagrid.getIn([GRID.id, 'allData'], List()).size,
    language: Utils.getLanguage(GRID, state.user),
    region: Utils.getRegion(GRID, state.user),
    dateFormat: Utils.getDateFormat(GRID, state.user),
    thousandSeparator: Utils.getThousandSeparator(GRID, state.user),
    decimalSeparator: Utils.getDecimalSeparator(GRID, state.user),
    forceRefreshTimestamp: state.datagrid.get('forceRefresh', 0), // force re-render when changed
    focusType: state.datagrid.getIn([GRID.id, 'session', 'focusType'], Map()),
  };
};

const mapDispatchToProps = datagridActions;

@pagination
@injectIntl
@connect(mapStateToProps, mapDispatchToProps)
class DataGrid extends React.PureComponent {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props) {
    super(props);
    this.state = {
      currentRow: 0,
      currentColumn: 0,
      contextMenuOpen: false,
      contextMenuX: null,
      contextMenuY: null,
    };
    this.cellRefs = {};
    this.createCellRefs = {};
    this.focusToCreateCell = false;
    this.focusToEditCell = false; // TODO: Handle focusing when true
    this.focusToErrorCell = false; // TODO: Handle focusing when true
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onDocumentClick);
    this.props.invalidate(this.props.grid);
  }

  onDocumentClick = () => {
    if (this.props.contextMenuItems) {
      this.setState({
        contextMenuOpen: false,
      });
    }
    document.removeEventListener('click', this.onDocumentClick);
  };

  onColumnResizeEndCallback = (newColumnWidth, columnKey) => {
    this.props.resizeColumn(this.props.grid, columnKey, newColumnWidth);
  };

  /**
   * @param rowIndex (int)
   * @param col (obj). Column object.
   * @param e. Original KeyDown event
   * @param create (bool). Is the cell create cell or edit cell?
   */
  onCellKeyDown = (rowIndex, col, e, create = false) => {
    if (this.props.enableArrowNavigation) {
      const cellRefs = create ? this.createCellRefs : this.cellRefs;
      const arrowKeys = [KEY_CODES.DOWN, KEY_CODES.UP, KEY_CODES.LEFT, KEY_CODES.RIGHT];
      const {
        columns, visibleColumns, grid, data, onLastCellTabPress,
      } = this.props;
      const gridColumns = Utils.visibleColumns(columns, visibleColumns);
      const getColumnKeyByIndex = i => Utils.getColumnKey(gridColumns[i]);
      const rowsSize = data.size;
      const columnKey = Utils.getColumnKey(col);
      let currentCell = cellRefs[`${grid.id}_${columnKey}_${rowIndex}`];
      let proxy = null;

      const isCursorAtStart = () => {
        if (currentCell.type !== 'text') return true;
        return currentCell.selectionStart === 0;
      };

      const isCursorAtEnd = () => {
        if (currentCell.type !== 'text') return true;
        return currentCell.selectionEnd === currentCell.value.length;
      };

      // If current cell holds a react-floating-select component
      if (currentCell && currentCell.selectRef) {
        proxy = currentCell;
        currentCell = this.getSelectRef(proxy);
      }

      // Prevents up/down arrow from changing number field value
      if (arrowKeys.includes(e.keyCode) && currentCell.type === 'number') e.preventDefault();
      switch (e.keyCode) {
        case KEY_CODES.ENTER:
        case KEY_CODES.ESC: {
          if (create && e.keyCode === KEY_CODES.ENTER) {
            this.props.addNewItem(grid, Utils.getColumnDefaultValues(columns));
            this.focusToCreateCell = true;
            break;
          }
          currentCell.select();
          break;
        }
        case KEY_CODES.DOWN: {
          let nextElement = cellRefs[`${grid.id}_${columnKey}_${rowIndex + 1}`];

          // Prevents menu from opening
          if (proxy && proxy.selectRef && !proxy.selectRef.state.menuIsOpen) {
            e.preventDefault();
            if (!nextElement) break;
            nextElement = this.getSelectRef(nextElement);
          }
          this.moveCellFocus(nextElement, rowIndex + 1, -1);
          break;
        }
        case KEY_CODES.UP: {
          let nextElement = cellRefs[`${grid.id}_${columnKey}_${rowIndex - 1}`];

          // Prevents menu from opening
          if (proxy && proxy.selectRef && !proxy.selectRef.state.menuIsOpen) {
            e.preventDefault();
            if (!nextElement) break;
            nextElement = this.getSelectRef(nextElement);
          }
          this.moveCellFocus(nextElement, rowIndex - 1, -1);
          break;
        }
        case KEY_CODES.TAB:
        case KEY_CODES.RIGHT:
        case KEY_CODES.LEFT: {
          if (e.keyCode === KEY_CODES.RIGHT && !isCursorAtEnd()) break;
          if (e.keyCode === KEY_CODES.LEFT && !isCursorAtStart()) break;

          e.preventDefault();

          let columnInd = gridColumns.findIndex(c => c.valueKeyPath.join('/') === columnKey);
          if (columnInd !== -1) {
            let disabled = true;
            let nextElement = null;
            let rowInd = rowIndex;
            while (disabled) {
              // Moving to the left
              if (e.keyCode === KEY_CODES.LEFT || (e.keyCode === KEY_CODES.TAB && e.shiftKey)) {
                if (columnInd - 1 >= 0) {
                  columnInd -= 1;
                } else if (rowInd - 1 >= 0) {
                  columnInd = gridColumns.length - 1;
                  rowInd -= 1;
                } else {
                  break;
                }
              } else {
                // Moving to the right
                if (columnInd + 1 < gridColumns.length) {
                  columnInd += 1;
                } else if (rowInd + 1 < rowsSize) {
                  columnInd = 0;
                  rowInd += 1;
                } else if (rowInd + 1 === rowsSize) {
                  // If trying to select a row, when there is none:
                  if (onLastCellTabPress && e.keyCode === KEY_CODES.TAB) onLastCellTabPress(e);
                  break;
                }
              }

              nextElement = cellRefs[`${grid.id}_${getColumnKeyByIndex(columnInd)}_${rowInd}`];

              // If we cannot focus on the next element while moving to the right
              if (!nextElement && e.keyCode !== KEY_CODES.LEFT) {
                // If we're not yet in the last focusable column
                if (columnInd <= gridColumns.length) {
                  while (columnInd <= gridColumns.length && !nextElement) {
                    nextElement = cellRefs[`${grid.id}_${getColumnKeyByIndex(columnInd)}_${rowInd}`];
                    columnInd += 1;

                    // If we are in the last column and we don't have an element to focus on,
                    // we must move to the next row (if possible)
                    if (!nextElement && columnInd === gridColumns.length) {
                      // If trying to select a row, when there is none:
                      if (rowInd + 1 === rowsSize) {
                        if (onLastCellTabPress && e.keyCode === KEY_CODES.TAB) {
                          onLastCellTabPress(e);
                        }
                        break;
                      }

                      columnInd = 0;
                      rowInd += 1;
                      nextElement = cellRefs[`${grid.id}_${getColumnKeyByIndex(columnInd)}_${rowInd}`];
                    }
                  }
                }
                // If we cannot focus on the next element while moving to the left
              } else if (!nextElement && e.keyCode === KEY_CODES.LEFT) {
                while (columnInd > 0 && !nextElement) {
                  columnInd -= 1;
                  nextElement = cellRefs[`${grid.id}_${getColumnKeyByIndex(columnInd)}_${rowInd}`];
                }
                // if no element was found, try moving to previous row
                // (needed in case first column is not editable e.g. an ExtraColumn)
                if (rowInd > 0 && !nextElement) {
                  columnInd = gridColumns.length - 1;
                  rowInd -= 1;
                  nextElement = cellRefs[`${grid.id}_${getColumnKeyByIndex(columnInd)}_${rowInd}`];
                }
              }
              disabled = nextElement ? nextElement.disabled : false;
            }
            if (!disabled && nextElement) {
              if (nextElement.selectRef) nextElement = this.getSelectRef(nextElement);
              this.moveCellFocus(nextElement, rowInd, columnInd);
            }
          }
          break;
        }
        default:
          break;
      }
    }
  };

  onEditCellKeyDown = (rowIndex, col) => (e) => {
    this.onCellKeyDown(rowIndex, col, e);
  };

  onCreateCellKeyDown = (rowIndex, col) => (e) => {
    this.onCellKeyDown(rowIndex, col, e, true);
  };

  onFilterCellValueChange = (col, valueParser) => (eventOrData) => {
    let rawValue;
    // eventOrData can be input onChange event, react-select onChange or react-day-picker onChange
    if (eventOrData) {
      if (eventOrData.target !== undefined) {
        rawValue = eventOrData.target.value;
      } else if (eventOrData.value !== undefined) {
        rawValue = eventOrData.value;
      } else {
        rawValue = eventOrData;
      }
    }
    const value = valueParser(rawValue);
    this.props.filterCellValueChange(
      this.props.grid,
      this.props.columns,
      col,
      value,
    );
  };

  onCreateCellValueChange = (rowIndex, col, valueParser) => (eventOrData) => {
    let rawValue;
    // eventOrData can be input onChange event, react-select onChange or react-day-picker onChange
    if (eventOrData) {
      if (eventOrData.target !== undefined) {
        rawValue = eventOrData.target.value;
      } else if (eventOrData.value !== undefined) {
        rawValue = eventOrData.value;
      } else {
        rawValue = eventOrData;
      }
    }
    const value = valueParser(rawValue);
    this.props.createCellValueChange(this.props.grid, rowIndex, col.valueKeyPath, value);
    if (col.onCreateValueChange) {
      col.onCreateValueChange(value, col.valueKeyPath, rowIndex);
    }
    if (col.onValueMatchChangeValue && value === col.onValueMatchChangeValue.matchValue) {
      // Call special paired value change on other cell if value matches
      this.onCreateCellValueChange(
        rowIndex,
        { valueKeyPath: col.onValueMatchChangeValue.newValueKeyPath },
        v => v,
      )(col.onValueMatchChangeValue.newValue);
    }
    if (col.validators) {
      this.props.createCellValueValidate(
        this.props.grid,
        rowIndex,
        col.valueKeyPath,
        value,
        col.validators,
      );
    }
  };

  onEditCellValueChange = (rowIndex, col, valueParser) => (eventOrData) => {
    const dataId = this.getDataIdByRowIndex(rowIndex);
    let rawValue;
    // eventOrData can be input onChange event, react-select onChange or react-day-picker onChange
    if (eventOrData) {
      if (eventOrData.target !== undefined) {
        rawValue = eventOrData.target.value;
      } else if (eventOrData.value !== undefined) {
        rawValue = eventOrData.value;
      } else {
        rawValue = eventOrData;
      }
    }
    const value = valueParser(rawValue);
    this.props.editCellValueChange(this.props.grid, dataId, col.valueKeyPath, value);
    if (col.onEditValueChange) {
      col.onEditValueChange(value, col.valueKeyPath, rowIndex, dataId);
    }
    if (col.onValueMatchChangeValue && value === col.onValueMatchChangeValue.matchValue) {
      // Call special paired value change on other cell if value matches
      this.onEditCellValueChange(
        rowIndex,
        { valueKeyPath: col.onValueMatchChangeValue.newValueKeyPath },
        v => v,
      )(col.onValueMatchChangeValue.newValue);
    }
    if (col.validators) {
      this.props.editCellValueValidate(
        this.props.grid,
        dataId,
        col.valueKeyPath,
        value,
        col.validators,
      );
    }
  };

  onCreateCellBlur = (rowIndex, col, valueParser) => (e) => {
    if (col.onCreateBlur) {
      let value = (e && e.target && e.target.value !== undefined) ?
        e.target.value :
        this.getEditItemValue(rowIndex, col);
      if (valueParser !== undefined) {
        value = valueParser(value);
      }
      col.onCreateBlur(value, rowIndex);
    }
  };

  onEditCellBlur = (rowIndex, col, valueParser) => (e) => {
    if (col.onEditBlur) {
      let value = (e && e.target && e.target.value !== undefined) ?
        e.target.value :
        this.getEditItemValue(rowIndex, col);
      if (valueParser !== undefined) {
        value = valueParser(value);
      }
      const dataId = this.getDataIdByRowIndex(rowIndex);
      col.onEditBlur(value, rowIndex, dataId);
    }
  };

  onCellFocus = (cellType, inputType, rowIndex, columnKey) => (e) => {
    const {
      cellSelectionChange, cellSelect, grid, isEditing,
    } = this.props;
    if (isEditing) return;

    if (inputType === 'number') {
      e.target.select();
    }
    if (cellType === 'edit' && cellSelect) {
      cellSelectionChange(grid, Map({
        rowIndex,
        columnKey,
      }));
    }
  };

  getSelectRef = (component) => {
    if (!component) return null;
    if (component.selectRef.select.select) return component.selectRef.select.select.inputRef;
    return component.selectRef.select.inputRef;
  };

  getDataIdByRowIndex = rowIndex =>
    this.props.data.getIn([rowIndex, ...this.props.grid.idKeyPath]);

  getSelectedItemIndex = (id) => {
    if (!id) return undefined;
    const index = this.props.data.findIndex(v => v.getIn(this.props.grid.idKeyPath) === id);
    return index === -1 ? undefined : index;
  };

  getEditItemValue = (rowIndex, col, options = []) => {
    // Get the value to display in edit cell
    const id = this.getDataIdByRowIndex(rowIndex);
    const editValue = this.props.editData.getIn([id, ...col.valueKeyPath], undefined);
    let originalValue;
    if (editValue === undefined) {
      originalValue = this.props.data.getIn([rowIndex, ...col.valueKeyPath], '');
    } else if (editValue === null) {
      return '';
    } else {
      // Value is found from editData
      // Format by component type
      switch (col.componentType) {
        case 'multiselect':
        case 'select':
          return options.selectOptions.find(obj => obj.value === editValue);
        case 'boolean':
          return options.find(obj => obj.value === editValue);
        default:
          return editValue;
      }
    }
    if (originalValue === null || originalValue === undefined || originalValue === '') {
      return '';
    }
    // Return value from original data, because editData is not available
    // Format by component type
    switch (col.componentType) {
      case 'float': {
        if (String(originalValue).length > 0) {
          return String(originalValue)
            .replace('.', this.props.decimalSeparator);
        }
        return originalValue;
      }
      case 'multiselect':
      case 'select':
        return options.selectOptions.find(obj => obj.value === originalValue);
      case 'boolean':
        return options.find(obj => obj.value === originalValue);
      default:
        return originalValue;
    }
  };

  getCreateItemValue = (rowIndex, col, options = []) => {
    const val = this.props.createData.getIn([rowIndex, ...col.valueKeyPath], '');
    if (val === null) {
      return '';
    } else if (col.componentType === 'select' || col.componentType === 'multiselect') {
      return options.selectOptions.find(obj => obj.value === val);
    } else if (['boolean'].includes(col.componentType)) {
      return options.find(obj => obj.value === val);
    }
    return val;
  };

  getFilterItemValue = (col, options = []) => {
    const val = this.props.filterData.get(Utils.getColumnKey(col), '');
    if (val === null) {
      return '';
    } else if (col.componentType === 'select') {
      return options.selectOptions.find(obj => obj.value === val);
    } else if (['checkbox', 'boolean'].includes(col.componentType)) {
      return options.find(obj => obj.value === val);
    } else if (col.componentType === 'multiselect') {
      // session storage content is converted to immutable and multiselect
      // filters is then list otherwise array
      return val && val.toJS ? val.toJS() : val || undefined;
    }
    return val;
  };

  getComponentDisabledState = (rowIndex, col, mode) => {
    let componentDisabled = !!col.disableEditing;
    // check if component is disabled by other column data
    if (!componentDisabled && col.disableEditingOnValueMatch) {
      if (mode === 'create') {
        componentDisabled = this.getCreateItemValue(
          rowIndex,
          { valueKeyPath: col.disableEditingOnValueMatch.matchValueKeyPath },
        ) === col.disableEditingOnValueMatch.matchValue;
      } else {
        componentDisabled = this.getEditItemValue(
          rowIndex,
          { valueKeyPath: col.disableEditingOnValueMatch.matchValueKeyPath },
        ) === col.disableEditingOnValueMatch.matchValue;
      }
    }
    return componentDisabled;
  };

  getRowClassName = (rowIndex) => {
    const {
      grid,
      isCreating,
      isEditing,
      createData,
      selectedItems,
      data,
    } = this.props;
    const rowClassNames = ['oc-datagrid-row'];
    let extraRowCount = 0; // how many rows to ignore from top, new + filter rows
    if (isCreating) extraRowCount = createData.size;
    if (isCreating) {
      if (rowIndex <= (extraRowCount - 1)) {
        rowClassNames.push('oc-datagrid-row-new');
      }
    } else if (isEditing) {
      rowClassNames.push('oc-datagrid-row-edit');
    }


    // check if row is selected
    if ((!isCreating && !isEditing) &&
      (selectedItems && grid.idKeyPath)) {
      if (
        selectedItems.indexOf(data.getIn([rowIndex - extraRowCount, ...grid.idKeyPath])) !== -1
      ) {
        rowClassNames.push('is-selected');
      }
    }

    if (this.props.rowClassNameGetter) {
      return rowClassNames.join(' ') + ' ' + this.props.rowClassNameGetter(rowIndex);
    }
    return rowClassNames.join(' ');
  };

  getCellMessages = (rowIndex, col, cellType) => {
    const returnData = {};
    if (!this.props.grid.idKeyPath || !col.valueKeyPath) {
      return returnData;
    }
    let infoMessage;
    let errorMessage;
    let warningMessage;
    if (cellType === 'create') {
      infoMessage = this.props.createCellMessages.getIn(['info', rowIndex, ...col.valueKeyPath]);
      errorMessage = this.props.createCellMessages.getIn(['error', rowIndex, ...col.valueKeyPath]);
      warningMessage = this.props.createCellMessages.getIn(['warning', rowIndex, ...col.valueKeyPath]);
    } else {
      const id = this.getDataIdByRowIndex(rowIndex);
      infoMessage = this.props.cellMessages.getIn(['info', id, ...col.valueKeyPath]);
      errorMessage = this.props.cellMessages.getIn(['error', id, ...col.valueKeyPath]);
      warningMessage = this.props.cellMessages.getIn(['warning', id, ...col.valueKeyPath]);
    }
    if (infoMessage) {
      returnData.infoMessage = infoMessage;
    }
    if (errorMessage) {
      returnData.errorMessage = errorMessage;
    }
    if (warningMessage) {
      returnData.warningMessage = warningMessage;
    }
    return returnData;
  };

  getScrollToRow = () => {
    let scrollToRow;
    if (this.props.isCreating && !this.focusToCreateCell) return scrollToRow;
    if (this.focusToCreateCell) {
      const scrollNewRow = this.props.createData.size - 1;
      if (scrollNewRow >= 0) {
        scrollToRow = scrollNewRow;
      }
    } else {
      if (this.props.isEditing && !this.props.scrollInEditMode) {
        scrollToRow = this.state.currentRow;
      } else {
        scrollToRow = this.props.scrollToRow; // eslint-disable-line
      }
      if (scrollToRow === undefined && this.props.selectedItems.size > 0) {
        scrollToRow = this.getSelectedItemIndex(this.props.selectedItems.first());
      }
    }
    return scrollToRow;
  };

  setFocusTo = (focusTo) => {
    if (this.props.isEditing || this.props.isCreating) {
      if (focusTo && focusTo.get('type') && focusTo !== this.prevFocusTo) {
        this[focusTo.get('type')] = true;
        this.focusToLastRow = focusTo.get('focusToLastRow');
        this.prevFocusTo = focusTo;
      }
    }
  };

  handleCellSelect = (cellType, rowIndex, columnKey) => () => {
    if (cellType === 'view' && this.props.cellSelect) {
      this.props.cellSelectionChange(this.props.grid, Map({
        rowIndex,
        columnKey,
      }));
    }
  };

  handleCreateCellRef = (rowIndex, col) => (ref) => {
    // Focus to create cell
    const columnKey = Utils.getColumnKey(col);
    const selectRef = !ref || ref.focus ? ref : this.getSelectRef(ref);
    if (
      this.props.createData.size &&
      this.props.createData.size === rowIndex + 1 &&
      this.focusToCreateCell &&
      !this.getComponentDisabledState(rowIndex, col, 'create') &&
      selectRef
    ) {
      selectRef.focus();
      this.focusToCreateCell = false;
    }

    if (this.props.enableArrowNavigation) {
      this.createCellRefs[`${this.props.grid.id}_${columnKey}_${rowIndex}`] = ref;
    }
  };

  handleEditCellRef = (rowIndex, col) => (ref) => {
    const columnKey = Utils.getColumnKey(col);
    if (this.focusToEditCell && !this.getComponentDisabledState(rowIndex, col, 'edit')) {
      const selectedRowIndex = this.focusToLastRow && this.props.data.size > 0 ?
        this.props.data.size - 1 : this.getSelectedItemIndex(this.props.selectedItems.first());

      const { selectedCell } = this.props;
      const selectRef = !ref || ref.focus ? ref : this.getSelectRef(ref);
      if (selectedCell.size > 0) {
        if (
          selectedCell.get('rowIndex') === rowIndex &&
          selectedCell.get('columnKey') === columnKey &&
          selectRef
        ) {
          selectRef.focus();
          this.focusToEditCell = false;
          this.focusToLastRow = false;
        }
      } else if (selectedRowIndex === undefined) {
        this.focusToEditCell = false;
        this.focusToLastRow = false;
      } else if (selectedRowIndex === rowIndex && selectRef) {
        selectRef.focus();
        this.focusToEditCell = false;
        this.focusToLastRow = false;
      }
    }
    if (this.props.enableArrowNavigation) {
      this.cellRefs[`${this.props.grid.id}_${columnKey}_${rowIndex}`] = ref;
    }
  };

  moveCellFocus = (nextElement, rowIndex, columnIndex) => {
    const elementTypes = ['text', 'checkbox'];
    if (nextElement && elementTypes.includes(nextElement.type)) {
      if (rowIndex !== -1 || columnIndex !== -1) {
        this.setState({
          currentColumn: columnIndex,
          currentRow: rowIndex,
        });
      }
      setTimeout(() => {
        if (nextElement.type === 'checkbox') nextElement.focus();
        if (nextElement.type === 'text') nextElement.select();
      }, 50);
    }
  };

  handleSelectAllCheckBoxOnChange = () => {
    this.props.selectAllItemsChange(this.props.grid);
  };

  handleSelectionCheckBoxOnChange = rowIndex => () => {
    this.props.itemSelectionChange(this.props.grid, rowIndex, true, false);
  };

  generateColumns = () => {
    const {
      data,
      selectedItems,
      dateFormat,
      thousandSeparator,
      decimalSeparator,
      grid,
      inlineEdit,
      filtering,
      region,
      intl,
      selectComponentOptions,
      isCreating,
      extraColumn,
      rowSelectCheckboxColumn,
      showSelectAllCheckbox,
    } = this.props;

    const columns = [];
    const tabIndex = String(this.props.tabIndex);
    if (extraColumn) {
      columns.push({
        width: extraColumn.width || 40,
        isResizable: !!extraColumn.isResizable,
        isSortable: false,
        columnKey: 'extraColumn',
        cell: rowIndex => (
          <div className="oc-datagrid-extra-column-cell no-row-select">
            {extraColumn.valueRender(data.get(rowIndex), tabIndex)}
          </div>
        ),
        cellEdit: rowIndex => (extraColumn.cellEdit ? extraColumn.cellEdit(rowIndex) : null),
        cellCreate: rowIndex => (extraColumn.cellCreate ? extraColumn.cellCreate(rowIndex) : null),
        cellFilter: rowIndex => (extraColumn.cellFilter ? extraColumn.cellFilter(rowIndex) : null),
      });
    }

    if (rowSelectCheckboxColumn) {
      columns.push({
        width: 40,
        isResizable: false,
        isSortable: false,
        columnKey: 'selectionCheckbox',
        header: (
          showSelectAllCheckbox &&
          <Checkbox
            id={`ocDatagridSelectAllCheckBox-${grid.id}`}
            className="oc-datagrid-select-all-checkbox-cell no-row-select"
            checked={data.size !== 0 && data.size === selectedItems.size}
            onChange={this.handleSelectAllCheckBoxOnChange}
            tabIndex={tabIndex}
          />
        ),
        cell: (rowIndex) => {
          const rowItem = data.get(rowIndex);
          const itemId = rowItem.getIn(grid.idKeyPath);
          const selected = selectedItems.includes(itemId);
          return (
            <Checkbox
              id={`ocDatagridSelectCheckBox-${this.props.grid.id}-${rowIndex}`}
              className="oc-datagrid-select-checkbox-cell no-row-select"
              checked={selected}
              onChange={this.handleSelectionCheckBoxOnChange(rowIndex)}
              tabIndex={tabIndex}
            />
          );
        },
        cellEdit: () => null,
        cellCreate: () => null,
        cellFilter: () => null,
      });
    }

    const visibleColumns = [];
    this.props.visibleColumns.forEach((visibleColumnKey) => {
      this.props.columns.forEach((orgCol) => {
        if (Utils.getColumnKey(orgCol) === visibleColumnKey) {
          visibleColumns.push(orgCol);
        }
      });
    });
    visibleColumns.forEach((col) => {
      const valueEmptyChecker = Utils.getValueEmptyChecker(col);
      // Cell value rendering
      const valueRender = (rowIndex, format) => {
        const val = data.getIn([rowIndex, ...col.valueKeyPath]);
        if (valueEmptyChecker(val)) {
          return col.isRequired ? <M id="Grid.ValueIsMissing" /> : '';
        }
        return format ? format(val) : val;
      };

      let column = GridColumnService.baseColumn(col);
      // Collect column functions into one Object
      const columnFunctions = {
        edit: {
          getItemValue: this.getEditItemValue,
          onCellValueChange: this.onEditCellValueChange,
          onCellBlur: this.onEditCellBlur,
          onCellFocus: this.onCellFocus,
          onCellKeyDown: this.onEditCellKeyDown,
          handleCellRef: this.handleEditCellRef,
        },
        create: {
          getItemValue: this.getCreateItemValue,
          onCellValueChange: this.onCreateCellValueChange,
          onCellBlur: this.onCreateCellBlur,
          onCellFocus: this.onCellFocus,
          onCellKeyDown: this.onCreateCellKeyDown,
          handleCellRef: this.handleCreateCellRef,
        },
        filter: {
          getItemValue: this.getFilterItemValue,
          onCellValueChange: this.onFilterCellValueChange,
        },
      };

      // handle column.cell / column.cellEdit / column.cellCreate / column.cellFilter
      const cellProps = {
        data,
        dateFormat,
        thousandSeparator,
        decimalSeparator,
      }; // eslint-disable-line
      column = GridColumnService.columnCell(column, cellProps, col, valueRender);

      // handle columnComponentTypes
      const componentTypeProps = {
        ...cellProps,
        grid,
        inlineEdit,
        filtering,
        region,
        intl,
        selectComponentOptions,
      }; // eslint-disable-line
      column = GridColumnService.columnComponentType(
        column,
        tabIndex,
        componentTypeProps,
        col,
        columnFunctions,
        this.getComponentDisabledState,
      );

      columns.push(column);
    });

    if (isCreating) {
      columns.push({
        width: 37,
        isResizable: false,
        columnKey: 'removeNewItem',
        cell: () => null,
        cellEdit: () => null,
        cellCreate: rowIndex => (
          <Icon
            id={`oc-datagrid-new-item-remove-${grid.id}-${rowIndex}`}
            type="indicator"
            name="delete"
            width={30}
            height={30}
            style={{ padding: '7px' }}
            onClick={() => this.props.removeNewItem(grid, rowIndex)}
          />
        ),
        cellFilter: () => null,
      });
    }
    return columns;
  };

  isCellEdited = (rowIndex, col, cellType) => {
    if (cellType !== 'edit') {
      return false;
    }
    const id = this.getDataIdByRowIndex(rowIndex);
    return !!this.props.editData.getIn([id, ...col.valueKeyPath]);
  };

  handleAfterAddItem = () => {
    this.focusToCreateCell = true;
  };

  handleAfterEditPress = () => {
    if (this.props.selectedItems.size) {
      this.focusToEditCell = true;
      this.setState({
        currentRow: undefined,
      });
    }
  };

  handleAfterValidationError = () => {
    this.focusToErrorCell = true;
  };

  handleRowClick = (e, rowIndex) => {
    if (this.props.rowSelect && !this.props.isCreating && !this.props.isEditing) {
      if (e.ctrlKey || e.shiftKey) {
        document.getSelection()
          .removeAllRanges();
      }
      // Don't trigger selection change on when user clicks on special cells like checkbox/extra
      // Check that clicked node's parent or parent's parent doesn't have no-row-select class
      const { parentNode } = e.target;
      const parent1class = parentNode.className && parentNode.className.indexOf
        ? parentNode.className
        : '';
      const parent2class = parentNode.parentNode.className && parentNode.parentNode.className.indexOf // eslint-disable-line
        ? parentNode.parentNode.className
        : '';
      const parent3class = parentNode.parentNode.parentNode.className && parentNode.parentNode.parentNode.className.indexOf // eslint-disable-line
        ? parentNode.parentNode.parentNode.className
        : '';
      const parent4class = parentNode.parentNode.parentNode.parentNode.className && parentNode.parentNode.parentNode.parentNode.className.indexOf // eslint-disable-line
        ? parentNode.parentNode.parentNode.parentNode.className
        : '';
      if (
        parent1class.indexOf('no-row-select') === -1 &&
        parent2class.indexOf('no-row-select') === -1 &&
        parent3class.indexOf('no-row-select') === -1 &&
        parent4class.indexOf('no-row-select') === -1
      ) {
        this.props.itemSelectionChange(
          this.props.grid,
          rowIndex,
          this.props.multiSelect && e.ctrlKey,
          this.props.multiSelect && e.shiftKey,
        );
      }
    }
    if (this.props.onRowClick) {
      this.props.onRowClick(e, rowIndex, this.props.data.get(rowIndex));
    }
    return true;
  };

  handleContextMenu = (e, rowIndex) => {
    if (this.props.contextMenuItems) {
      const {
        itemSelectionChange,
        selectedItems,
        grid,
        data,
      } = this.props;
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        contextMenuOpen: true,
        contextMenuX: e.clientX,
        contextMenuY: e.clientY,
      });
      // If clicked item is not selected, change selection to it
      if (!selectedItems.includes(data.getIn([rowIndex, ...grid.idKeyPath]))) {
        itemSelectionChange(grid, rowIndex);
      }
      document.addEventListener('click', this.onDocumentClick);
      return false;
    }
    return true;
  };

  handleContextMenuItemClick = (onClick, selectedItems, selectedData) => () => {
    onClick(selectedItems, selectedData);
  };

  handleRowHeightGetter = rowIndex =>
    this.props.rowHeightGetter(this.props.data.get(rowIndex), rowIndex);

  renderCell = col => (cellProps) => {
    const {
      isCreating,
      isEditing,
      createData,
      selectedCell,
      grid,
    } = this.props;
    const { rowIndex, ...props } = cellProps;
    let cell;
    let cellType = 'view';
    let extraRowCount = 0; // how many rows to ignore from top, new + filter rows
    if (isCreating) extraRowCount = createData.size;
    if (isCreating) {
      if (rowIndex <= (extraRowCount - 1)) {
        if (col.cellCreate) {
          cell = col.cellCreate(rowIndex);
          cellType = 'create';
        } else {
          cell = null;
          cellType = null;
        }
      } else {
        cell = col.cell(rowIndex - extraRowCount);
      }
    } else if (isEditing && col.cellEdit) {
      cell = col.cellEdit(rowIndex - extraRowCount);
      cellType = 'edit';
    } else {
      cell = col.cell(rowIndex - extraRowCount);
    }
    const isSpecial = props.columnKey === 'selectionCheckbox' || props.columnKey === 'extraColumn';
    if ((cellType === 'view' || cellType === 'edit' || cellType === 'create') && !isSpecial) {
      const getRowIndex = (cellType === 'create') ? rowIndex : (rowIndex - extraRowCount);
      const messageData = this.getCellMessages(getRowIndex, col, cellType);
      const isEdited = this.isCellEdited(getRowIndex, col, cellType);
      const className = (selectedCell.get('rowIndex') === rowIndex && selectedCell.get('columnKey') === props.columnKey) ?
        'oc-datagrid-cell is-selected' : 'oc-datagrid-cell';
      return (
        <Cell
          {...props}
          className={className}
          style={col.style}
          onClick={this.handleCellSelect(cellType, rowIndex, props.columnKey)}
        >
          <CellTooltip
            id={`ocDatagridCell-${grid.id}-${props.columnKey}-${rowIndex}`}
            isEdited={isEdited}
            isError={!!messageData.errorMessage}
            isWarning={!!messageData.warningMessage}
            infoMessage={messageData.infoMessage}
            errorMessage={messageData.errorMessage}
            warningMessage={messageData.warningMessage}
          >
            {cell}
          </CellTooltip>
        </Cell>
      );
    }
    return (
      <Cell {...props} className="oc-datagrid-cell" style={col.style}>{cell}</Cell>
    );
  };

  renderColumns = () => {
    const {
      allDataSize,
      grid,
      isCreating,
      isBusy,
      visibleColumns,
    } = this.props;
    if (!allDataSize && !isBusy && !isCreating && !grid.pagination) {
      return (
        <Column
          columnKey="dataEmptyColumn"
          header={<Cell style={{ textAlign: 'center' }}><M id="Grid.NoItems" /></Cell>}
          width={10}
          isResizable={false}
          flexGrow={1}
        />
      );
    }
    if (!visibleColumns.size) {
      if (isBusy) {
        return (
          <Column
            columnKey="dataEmptyColumn"
            header={<Cell>&nbsp;</Cell>}
            width={10}
            isResizable={false}
            flexGrow={1}
          />
        );
      }
      return (
        <Column
          columnKey="dataEmptyColumn"
          header={<Cell style={{ textAlign: 'center' }}><M id="Grid.NoColumns" /></Cell>}
          width={10}
          isResizable={false}
          flexGrow={1}
        />
      );
    }
    const columns = this.generateColumns();
    if (columns.lenght === 0) return null;
    return columns.map(col => (
      <Column
        key={col.columnKey}
        columnKey={col.columnKey}
        header={
          <HeaderCell
            id={`ocDatagridHeader-${this.props.grid.id}-${col.columnKey}`}
            grid={this.props.grid}
            columns={this.props.columns}
            column={col}
            currentSortColumn={this.props.sortColumn}
            currentSortOrder={this.props.sortOrder}
            onSortChange={this.props.sortChange}
            isBusy={this.props.isBusy}
            filtering={this.props.isFiltering}
          >
            {col.header}
          </HeaderCell>
        }
        cell={this.renderCell(col)}
        width={this.props.columnWidths.get(col.columnKey, col.width)}
        minWidth={col.minWidth}
        maxWidth={col.maxWidth}
        isResizable={col.isResizable}
        flexGrow={col.flexGrow ? col.flexGrow : 0}
        fixed={col.fixed}
        fixedRight={col.fixedRight}
        allowCellsRecycling={col.allowCellsRecycling}
      />));
  };

  renderContextMenu = () => {
    const {
      contextMenuItems,
      data,
      grid,
      selectedItems,
    } = this.props;
    const {
      contextMenuX,
      contextMenuY,
    } = this.state;
    const style = {
      display: 'block',
      zIndex: 10000,
      position: 'absolute',
      top: `${contextMenuY}px`,
      left: `${contextMenuX}px`,
    };
    const selectedData = data.filter(d => selectedItems.includes(d.getIn(grid.idKeyPath)));
    return (
      <ul className="dropdown-menu oc-datagrid-context-menu open" style={style}>
        {contextMenuItems && contextMenuItems.map && contextMenuItems.map((item, i) => {
          let { disabled } = item;
          if (typeof item.disabled === 'function') {
            disabled = item.disabled(selectedItems, selectedData);
          }
          return (
            <MenuItem
              key={i} // eslint-disable-line
              header={item.header}
              divider={item.divider}
              disabled={disabled}
              title={item.title}
              onClick={(disabled || !item.onClick) ? null : this.handleContextMenuItemClick(
                item.onClick,
                selectedItems,
                selectedData,
              )}
            >
              {item.value}
            </MenuItem>
          );
        })}
      </ul>
    );
  };

  render() {
    const gridClassName = classNames({
      'oc-datagrid-container': true,
      'with-actionbar': this.props.inlineEdit && !this.props.disableActionBar,
      'is-busy': this.props.isBusy,
      'is-editing': this.props.isEditing,
      'is-creating': this.props.isCreating,
      [this.props.className]: !!this.props.className,
    });

    // check if there is a new request to change edit mode focus
    this.setFocusTo(this.props.focusType);

    let actionBar = null;
    let actionBarRight = null;
    let actionBarLeft = null;
    if (
      (this.props.actionBar ||
        this.props.inlineEdit ||
        this.props.filtering ||
        this.props.removing) &&
      !this.props.disableActionBar
    ) {
      actionBarRight = (
        <ActionBar position="right">
          <div className="oc-datagrid-actionbar-right">{this.props.actionBar}</div>
          {(this.props.filtering && this.props.disableDropdown &&
            !this.props.disableFilteringControls) && <FilteringControls {...this.props} />
          }
          {this.props.inlineEdit &&
          <InlineEditControls
            afterAddItem={this.handleAfterAddItem}
            afterEditPress={this.handleAfterEditPress}
            afterValidationError={this.handleAfterValidationError}
            {...this.props}
          />
          }
          {(this.props.dropdownMenuItems ||
            this.props.removing ||
            this.props.columnSettings ||
            (this.props.filtering &&
              !this.props.disableDropdown)) && <DropdownControls {...this.props} />
          }
        </ActionBar>
      );
    }
    if (this.props.actionBarLeft || this.props.gridHeader) {
      actionBarLeft = (
        <ActionBar position="left">
          <div className="oc-datagrid-gridheader">{this.props.gridHeader}</div>
          <div className="oc-datagrid-actionbar-left">{this.props.actionBarLeft}</div>
        </ActionBar>
      );
    }
    if (actionBarLeft || actionBarRight) {
      actionBar = (
        <div className="oc-datagrid-actionbar-container">
          {actionBarLeft}
          {actionBarRight}
        </div>
      );
    }
    let rowsCount =
      (this.props.rowsCount || this.props.rowsCount === 0) ?
        this.props.rowsCount :
        this.props.data.size;
    if (this.props.isCreating) rowsCount += this.props.createData.size;
    if (!this.props.visibleColumns.size) rowsCount = 0;
    return (
      <div
        id={`oc-datagrid-${this.props.grid.id}`}
        className={gridClassName}
        style={this.props.containerStyle}
      >
        {this.props.isBusy && <Spinner />}
        {this.state.contextMenuOpen && this.renderContextMenu()}
        {actionBar}
        <ResponsiveFixedDataTable
          id={this.props.grid.id}
          rowsCount={rowsCount}
          headerHeight={this.props.isFiltering ?
            this.props.headerHeight + this.props.filterRowHeight
            : this.props.headerHeight}
          rowHeight={this.props.rowHeight}
          onColumnResizeEndCallback={this.onColumnResizeEndCallback}
          isColumnResizing={false}
          onRowClick={this.handleRowClick}
          scrollToColumn={this.props.scrollToColumn || this.state.currentColumn}
          scrollTop={this.props.scrollTop}
          scrollToRow={this.getScrollToRow()}
          onRowDoubleClick={this.props.onRowDoubleClick}
          onRowMouseDown={this.props.onMouseDown}
          onRowMouseEnter={this.props.onRowMouseEnter}
          onRowMouseLeave={this.props.onRowMouseLeave}
          onScrollStart={this.props.onScrollStart}
          onScrollEnd={this.props.onScrollEnd}
          rowClassNameGetter={this.getRowClassName}
          rowHeightGetter={this.props.rowHeightGetter && this.handleRowHeightGetter}
          onContentHeightChange={this.props.onContentHeightChange}
          onRowContextMenu={this.handleContextMenu}
        >
          {this.renderColumns()}
        </ResponsiveFixedDataTable>
        {this.props.isColumnSettingsModalOpen &&
        <ColumnSettingsModal
          grid={this.props.grid}
          columns={this.props.columns}
          visibleColumns={this.props.visibleColumns}
          closeColumnSettingsModal={this.props.closeColumnSettingsModal}
          saveColumnSettings={this.props.saveColumnSettings}
        />
        }
        {this.props.children}
      </div>
    );
  }
}

export default DataGrid;
