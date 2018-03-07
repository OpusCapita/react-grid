/* eslint-disable no-lonely-if, prefer-template, react/require-default-props */
import React from 'react';
import { Map, List } from 'immutable';
import { connect } from 'react-redux';
import {
  injectIntl,
  FormattedMessage as M,
  FormattedDate as D,
  FormattedNumber as N } from 'react-intl';
import { Column, Cell } from 'fixed-data-table-2';
import { Checkbox, FormControl } from 'react-bootstrap';
import classNames from 'classnames';
import moment from 'moment';
import { FloatingSelect } from '@opuscapita/react-floating-select';
import { Icon } from '@opuscapita/react-icons';
import { Spinner } from '@opuscapita/react-spinner';
import 'fixed-data-table-2/dist/fixed-data-table.css';

import ResponsiveFixedDataTable from './responsive-fixed-data-table.component';
import HeaderCell from './header-cell.component';
import ActionBar from './action-bar.component';
import InlineEditControls from './inline-edit-controls.component';
import FilteringControls from './filtering-controls.component';
import DropdownControls from './dropdown-controls.component';
import * as datagridActions from './datagrid.actions';
import DateInput from './date-picker/date-picker.component';
import CellTooltip from './cell-tooltip.component';
import ColumnSettingsModal from './column-settings/column-settings.component';
import { propTypes, defaultProps } from './datagrid.props';
import Utils from './datagrid.utils';
import './datagrid.component.scss';

import KEY_CODES from '../constants/key-codes.constant';

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
    userLanguage: Utils.getLanguage(GRID, state.user),
    dateFormat: Utils.getDateFormat(GRID, state.user),
    thousandSeparator: Utils.getThousandSeparator(GRID, state.user),
    decimalSeparator: Utils.getDecimalSeparator(GRID, state.user),
    isIntlRegion: state.intl && state.intl.region,
  };
};

const mapDispatchToProps = datagridActions;

@injectIntl
@connect(mapStateToProps, mapDispatchToProps)
export default class DataGrid extends React.PureComponent {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props) {
    super(props);
    this.state = { currentRow: 0, currentColumn: 0 };
    this.cellRefs = {};
    this.focusToCreateCell = false;
    this.focusToEditCell = false; // TODO: Handle focusing when true
    this.focusToErrorCell = false; // TODO: Handle focusing when true
  }

  componentWillUnmount() {
    this.props.invalidate(this.props.grid);
  }

  onColumnResizeEndCallback = (newColumnWidth, columnKey) => {
    this.props.resizeColumn(this.props.grid, columnKey, newColumnWidth);
  }

  onCreateCellKeyDown = (e) => {
    if (e.keyCode === KEY_CODES.ENTER) {
      this.props.addNewItem(this.props.grid, Utils.getColumnDefaultValues(this.props.columns));
      this.focusToCreateCell = true;
    }
  }

  onEditCellKeyDown = (col, rowIndex) => (e) => {
    if (this.props.enableArrowNavigation) {
      const columns = this.props.columns;
      const rowsSize = this.props.data.size;
      const columnKey = Utils.getColumnKey(col);
      switch (e.keyCode) {
        case KEY_CODES.DOWN: {
          if (col.valueType !== 'number') {
            const nextElement = this.cellRefs[`${this.props.grid.id}_${columnKey}_${rowIndex + 1}`];
            this.moveCellFocus(nextElement, rowIndex + 1, -1);
          }
          break;
        }
        case KEY_CODES.UP: {
          if (col.valueType !== 'number') {
            const nextElement = this.cellRefs[`${this.props.grid.id}_${columnKey}_${rowIndex - 1}`];
            this.moveCellFocus(nextElement, rowIndex - 1, -1);
          }
          break;
        }
        case KEY_CODES.TAB:
        case KEY_CODES.RIGHT:
        case KEY_CODES.LEFT: {
          e.preventDefault();
          let columnInd = columns.findIndex(c => c.valueKeyPath.join() === columnKey);
          if (columnInd !== -1) {
            let disabled = true;
            let nextElement = null;
            let rowInd = rowIndex;
            while (disabled) {
              if (e.keyCode === KEY_CODES.LEFT || (e.keyCode === KEY_CODES.TAB && e.shiftKey)) {
                if (columnInd - 1 >= 0) {
                  columnInd -= 1;
                } else if (rowInd - 1 >= 0) {
                  columnInd = columns.length - 1;
                  rowInd -= 1;
                } else {
                  break;
                }
              } else {
                if (columnInd + 1 < columns.length) {
                  columnInd += 1;
                } else if (rowInd + 1 < rowsSize) {
                  columnInd = 0;
                  rowInd += 1;
                } else {
                  break;
                }
              }
              const nextColumnKey = Utils.getColumnKey(columns[columnInd]);
              nextElement = this.cellRefs[`${this.props.grid.id}_${nextColumnKey}_${rowInd}`];
              disabled = nextElement ? nextElement.disabled : false;
            }
            if (!disabled && nextElement) {
              this.moveCellFocus(nextElement, rowInd, columnInd);
            }
          }
          break;
        }
        default:
          break;
      }
    }
  }

  onFilterCellValueChange = (col, valueParser) => (eventOrData) => {
    let rawValue;
    // eventOrData can be input onChange event, react-select onChange or react-day-picker onChange
    if (eventOrData) {
      if (eventOrData.target !== undefined) rawValue = eventOrData.target.value;
      else if (eventOrData.value !== undefined) rawValue = eventOrData.value;
      else rawValue = eventOrData;
    }
    const value = valueParser(rawValue);
    this.props.filterCellValueChange(
      this.props.grid,
      this.props.columns,
      col,
      value,
    );
  }

  onCreateCellValueChange = (rowIndex, col, valueParser) => (eventOrData) => {
    let rawValue;
    // eventOrData can be input onChange event, react-select onChange or react-day-picker onChange
    if (eventOrData) {
      if (eventOrData.target !== undefined) rawValue = eventOrData.target.value;
      else if (eventOrData.value !== undefined) rawValue = eventOrData.value;
      else rawValue = eventOrData;
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
  }

  onEditCellValueChange = (rowIndex, col, valueParser) => (eventOrData) => {
    const dataId = this.getDataIdByRowIndex(rowIndex);
    let rawValue;
    // eventOrData can be input onChange event, react-select onChange or react-day-picker onChange
    if (eventOrData) {
      if (eventOrData.target !== undefined) rawValue = eventOrData.target.value;
      else if (eventOrData.value !== undefined) rawValue = eventOrData.value;
      else rawValue = eventOrData;
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
  }

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
  }

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
  }

  onCellFocus = (cellType, inputType, rowIndex, columnKey) => (e) => {
    if (inputType === 'number') {
      e.target.select();
    }
    if (cellType === 'edit' && this.props.cellSelect) {
      this.props.cellSelectionChange(this.props.grid, Map({ rowIndex, columnKey }));
    }
  }

  getDataIdByRowIndex = rowIndex =>
    this.props.data.getIn([rowIndex, ...this.props.grid.idKeyPath]);

  getSelectedItemIndex = (id) => {
    if (!id) return undefined;
    const index = this.props.data.findIndex(v => v.getIn(this.props.grid.idKeyPath) === id);
    return index === -1 ? undefined : index;
  }

  getEditItemValue = (rowIndex, col) => {
    // Get the value to display in edit cell
    const id = this.getDataIdByRowIndex(rowIndex);
    const editValue = this.props.editData.getIn([id, ...col.valueKeyPath], undefined);
    let originalValue;
    if (editValue === undefined) {
      originalValue = this.props.data.getIn([rowIndex, ...col.valueKeyPath], '');
    } else if (editValue === null) {
      return '';
    } else {
      return editValue;
    }
    if (originalValue === null || originalValue === undefined || originalValue === '') {
      return '';
    }
    // Special formatting by component type
    if (col.componentType === 'date') {
      return this.props.intl.formatDate(originalValue, { timeZone: 'UTC' });
    } else if (
      col.componentType === 'float' &&
      String(originalValue).length > 0
    ) {
      return String(originalValue).replace('.', this.props.decimalSeparator);
    }
    return originalValue;
  }

  getCreateItemValue = (rowIndex, col) => {
    const val = this.props.createData.getIn([rowIndex, ...col.valueKeyPath], '');
    if (val === null) {
      return '';
    }
    return val;
  }

  getFilterItemValue = (col) => {
    const val = this.props.filterData.get(Utils.getColumnKey(col), '');
    if (val === null) {
      return '';
    }
    return val;
  }

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
  }

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
  }

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
  }

  getScrollToRow = () => {
    let scrollToRow;
    if (this.props.isCreating && !this.focusToCreateCell) return scrollToRow;
    if (this.focusToCreateCell) {
      const scrollNewRow = this.props.createData.size - 1;
      if (scrollNewRow >= 0) {
        scrollToRow = scrollNewRow;
      }
    } else {
      if (this.props.isEditing) {
        scrollToRow = this.state.currentRow;
      } else {
        scrollToRow = this.props.scrollToRow;
      }
      if (scrollToRow === undefined && this.props.selectedItems.size > 0) {
        scrollToRow = this.getSelectedItemIndex(this.props.selectedItems.first());
      }
    }
    return scrollToRow;
  }

  handleCellSelect = (cellType, rowIndex, columnKey) => () => {
    if (cellType === 'view' && this.props.cellSelect) {
      this.props.cellSelectionChange(this.props.grid, Map({ rowIndex, columnKey }));
    }
  }

  handleCreateCellRef = (rowIndex, col) => (ref) => {
    // Focus to create cell
    if (
      this.props.createData.size &&
      this.props.createData.size === rowIndex + 1 &&
      this.focusToCreateCell &&
      !this.getComponentDisabledState(rowIndex, col, 'create')
    ) {
      ref.focus();
      this.focusToCreateCell = false;
    }
  }

  handleEditCellRef = (rowIndex, col) => (ref) => {
    const columnKey = Utils.getColumnKey(col);
    if (this.focusToEditCell && !this.getComponentDisabledState(rowIndex, col, 'edit')) {
      const selectedRowIndex = this.getSelectedItemIndex(this.props.selectedItems.first());
      const selectedCell = this.props.selectedCell;
      if (selectedCell.size > 0) {
        if (selectedCell.get('rowIndex') === rowIndex && selectedCell.get('columnKey') === columnKey) {
          ref.focus();
          this.focusToEditCell = false;
        }
      } else if (selectedRowIndex === undefined) {
        this.focusToEditCell = false;
      } else if (selectedRowIndex === rowIndex) {
        ref.focus();
        this.focusToEditCell = false;
      }
    }
    if (this.props.enableArrowNavigation) {
      this.cellRefs[`${this.props.grid.id}_${columnKey}_${rowIndex}`] = ref;
    }
  }

  moveCellFocus = (nextElement, rowIndex, columnIndex) => {
    if (nextElement && (nextElement.type === 'text' || nextElement.type === 'number')) {
      if (rowIndex !== -1) {
        this.setState({ currentRow: rowIndex });
      }
      if (columnIndex !== -1) {
        this.setState({ currentColumn: columnIndex });
      }
      setTimeout(() => nextElement.select(), 50);
    }
  }

  handleSelectionCheckBoxOnChange = rowIndex => () => {
    this.props.itemSelectionChange(this.props.grid, rowIndex, true, false);
  }

  generateColumns = () => {
    const columns = [];
    const tabIndex = String(this.props.tabIndex);
    if (this.props.rowSelectCheckboxColumn) {
      columns.push({
        width: 40,
        isResizable: false,
        columnKey: 'selectionCheckbox',
        cell: (rowIndex) => {
          const rowItem = this.props.data.get(rowIndex);
          const itemId = rowItem.getIn(this.props.grid.idKeyPath);
          const selected = this.props.selectedItems.includes(itemId);
          return (
            <Checkbox
              className="oc-row-select-checkbox"
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
      const column = {
        header: col.header,
        columnKey: Utils.getColumnKey(col),
        width: (col.width || col.width === 0 ? col.width : 200),
        minWidth: (col.minWidth || col.minWidth === 0 ? col.minWidth : 20),
        maxWidth: col.maxWidth,
        isResizable: !col.disableResizing,
        fixed: !!col.fixed,
        allowCellsRecycling: !!col.allowCellsRecycling,
        disableSorting: !!col.disableSorting,
        isRequired: !!col.isRequired,
        componentType: col.componentType,
        style: Utils.getCellStyleByCol(col),
      };
      if (col.valueKeyPath) {
        column.valueKeyPath = col.valueKeyPath;
      }
      if (col.flexGrow) {
        column.flexGrow = col.flexGrow;
      }
      if (col.valueType) {
        column.valueType = col.valueType;
      }
      if (col.sortComparator) {
        column.sortComparator = col.sortComparator;
      }
      if (col.sortValueGetter) {
        column.sortValueGetter = col.sortValueGetter;
      }
      const valueEmptyChecker = Utils.getValueEmptyChecker(col);
      // Cell value rendering
      const valueRender = (rowIndex, format) => {
        const val = this.props.data.getIn([rowIndex, ...col.valueKeyPath]);
        if (valueEmptyChecker(val)) {
          return col.isRequired ? <M id="GridValueIsMissing" /> : '';
        }
        return format ? format(val) : val;
      };

      if (col.cell) {
        column.cell = col.cell;
      } else if (col.valueRender) {
        column.cell = rowIndex => col.valueRender(this.props.data.get(rowIndex));
      } else {
        switch (col.valueType) {
          case 'number':
          case 'float':
            column.cell = rowIndex =>
              valueRender(rowIndex, v => <N value={v} {...col.renderComponentProps} />);
            break;
          case 'date': {
            if (this.props.isIntlRegion) {
              column.cell = rowIndex =>
                valueRender(rowIndex, v => <D value={v} {...col.renderComponentProps} />);
            } else {
              column.cell = rowIndex =>
                valueRender(rowIndex, (v) => {
                  const momentDay = moment.utc(v);
                  return momentDay.isValid() ?
                    moment.utc(v).format(this.props.dateFormat) :
                    <M id="GridInvalidDate" />;
                });
            }
            break;
          }
          case 'boolean':
            column.cell = rowIndex =>
              valueRender(rowIndex, v => <M id={v ? 'Yes' : 'No'} {...col.renderComponentProps} />);
            break;
          default:
            column.cell = rowIndex => valueRender(rowIndex);
        }
      }
      // Cell edit/create/filter component rendering
      if (col.cellEdit) {
        column.cellEdit = col.cellEdit;
      } else if (col.editValueRender) {
        column.cellEdit = rowIndex => col.editValueRender(this.props.data.get(rowIndex));
      }
      if (col.cellCreate) {
        column.cellCreate = col.cellCreate;
      } else if (col.createValueRender) {
        column.cellCreate = rowIndex => col.createValueRender(this.props.data.get(rowIndex));
      }
      if (col.cellFilter) {
        column.cellFilter = col.cellFilter;
      } else if (col.filterValueRender) {
        column.cellFilter = rowIndex => col.filterValueRender(this.props.data.get(rowIndex));
      }
      if (col.componentType) {
        let editValueParser = val => val;
        switch (col.componentType) {
          case 'text':
            // TODO REFACTOR TO FUNCTION
            if (this.props.inlineEdit) {
              if (!column.cellEdit) {
                column.cellEdit = rowIndex => (
                  <FormControl
                    type="text"
                    value={this.getEditItemValue(rowIndex, col)}
                    onChange={this.onEditCellValueChange(rowIndex, col, editValueParser)}
                    onBlur={this.onEditCellBlur(rowIndex, col)}
                    onFocus={this.onCellFocus('edit', col.componentType, rowIndex, column.columnKey)}
                    onKeyDown={this.onEditCellKeyDown(col, rowIndex)}
                    inputRef={this.handleEditCellRef(rowIndex, col)}
                    id={`ocDatagridEditInput-${this.props.grid.id}-${column.columnKey}-${rowIndex}`}
                    {...col.editComponentProps}
                    disabled={this.getComponentDisabledState(rowIndex, col, 'edit')}
                    style={column.style}
                    tabIndex={tabIndex}
                  />
                );
              }
              if (!column.cellCreate) {
                column.cellCreate = rowIndex => (
                  <FormControl
                    type="text"
                    value={this.getCreateItemValue(rowIndex, col)}
                    onChange={this.onCreateCellValueChange(rowIndex, col, editValueParser)}
                    onBlur={this.onCreateCellBlur(rowIndex, col)}
                    onKeyDown={this.onCreateCellKeyDown}
                    inputRef={this.handleCreateCellRef(rowIndex, col)}
                    id={`ocDatagridCreateInput-${this.props.grid.id}-${column.columnKey}-${rowIndex}`}
                    {...col.createComponentProps}
                    disabled={this.getComponentDisabledState(rowIndex, col, 'create')}
                    style={column.style}
                    tabIndex={tabIndex}
                  />
                );
              }
            }
            if (this.props.filtering) {
              if (!column.cellFilter) {
                column.cellFilter = () => (
                  <FormControl
                    type="text"
                    value={this.getFilterItemValue(col)}
                    onChange={this.onFilterCellValueChange(col, editValueParser)}
                    id={`ocDatagridFilterInput-${this.props.grid.id}-${column.columnKey}`}
                    {...col.filterComponentProps}
                    style={column.style}
                    tabIndex={tabIndex}
                  />
                );
              }
            }
            break;
          case 'number':
            if (this.props.inlineEdit) {
              if (!column.cellEdit) {
                column.cellEdit = rowIndex => (
                  <FormControl
                    type="number"
                    value={this.getEditItemValue(rowIndex, col)}
                    onChange={this.onEditCellValueChange(rowIndex, col, editValueParser)}
                    onBlur={this.onEditCellBlur(rowIndex, col)}
                    onFocus={this.onCellFocus('edit', col.componentType, rowIndex, column.columnKey)}
                    onKeyDown={this.onEditCellKeyDown(col, rowIndex)}
                    inputRef={this.handleEditCellRef(rowIndex, col)}
                    id={`ocDatagridEditInput-${this.props.grid.id}-${column.columnKey}-${rowIndex}`}
                    {...col.editComponentProps}
                    disabled={this.getComponentDisabledState(rowIndex, col, 'edit')}
                    style={column.style}
                    tabIndex={tabIndex}
                  />
                );
              }
              if (!column.cellCreate) {
                column.cellCreate = rowIndex => (
                  <FormControl
                    type="number"
                    value={this.getCreateItemValue(rowIndex, col)}
                    onChange={this.onCreateCellValueChange(rowIndex, col, editValueParser)}
                    onBlur={this.onCreateCellBlur(rowIndex, col)}
                    onFocus={this.onCellFocus('create', 'number', rowIndex, column.columnKey)}
                    onKeyDown={this.onCreateCellKeyDown}
                    inputRef={this.handleCreateCellRef(rowIndex, col)}
                    id={`ocDatagridCreateInput-${this.props.grid.id}-${column.columnKey}-${rowIndex}`}
                    {...col.createComponentProps}
                    disabled={this.getComponentDisabledState(rowIndex, col, 'create')}
                    style={column.style}
                    tabIndex={tabIndex}
                  />
                );
              }
            }
            if (this.props.filtering) {
              if (!column.cellFilter) {
                column.cellFilter = () => (
                  <FormControl
                    type="number"
                    value={this.getFilterItemValue(col)}
                    onChange={this.onFilterCellValueChange(col, editValueParser)}
                    id={`ocDatagridFilterInput-${this.props.grid.id}-${column.columnKey}`}
                    {...col.filterComponentProps}
                    style={column.style}
                    tabIndex={tabIndex}
                  />
                );
              }
            }
            break;
          case 'float':
            editValueParser = val =>
              val.replace(new RegExp(`[^\\d${this.props.decimalSeparator}+-]`, 'g'), '');
            if (this.props.inlineEdit) {
              if (!column.cellEdit) {
                column.cellEdit = rowIndex => (
                  <FormControl
                    type="text"
                    value={this.getEditItemValue(rowIndex, col)}
                    onChange={this.onEditCellValueChange(rowIndex, col, editValueParser)}
                    onBlur={this.onEditCellBlur(rowIndex, col, editValueParser)}
                    onFocus={this.onCellFocus('edit', col.componentType, rowIndex, column.columnKey)}
                    onKeyDown={this.onEditCellKeyDown(col, rowIndex)}
                    inputRef={this.handleEditCellRef(rowIndex, col)}
                    id={`ocDatagridEditInput-${this.props.grid.id}-${column.columnKey}-${rowIndex}`}
                    {...col.editComponentProps}
                    disabled={this.getComponentDisabledState(rowIndex, col, 'edit')}
                    style={column.style}
                    tabIndex={tabIndex}
                  />
                );
              }
              if (!column.cellCreate) {
                column.cellCreate = rowIndex => (
                  <FormControl
                    type="text"
                    value={this.getCreateItemValue(rowIndex, col)}
                    onChange={this.onCreateCellValueChange(rowIndex, col, editValueParser)}
                    onBlur={this.onCreateCellBlur(rowIndex, col, editValueParser)}
                    onKeyDown={this.onCreateCellKeyDown}
                    inputRef={this.handleCreateCellRef(rowIndex, col)}
                    id={`ocDatagridCreateInput-${this.props.grid.id}-${column.columnKey}-${rowIndex}`}
                    {...col.createComponentProps}
                    disabled={this.getComponentDisabledState(rowIndex, col, 'create')}
                    style={column.style}
                    tabIndex={tabIndex}
                  />
                );
              }
            }
            if (this.props.filtering) {
              if (!column.cellFilter) {
                column.cellFilter = () => (
                  <FormControl
                    type="text"
                    value={this.getFilterItemValue(col)}
                    onChange={this.onFilterCellValueChange(col, editValueParser)}
                    id={`ocDatagridFilterInput-${this.props.grid.id}-${column.columnKey}`}
                    {...col.filterComponentProps}
                    style={column.style}
                    tabIndex={tabIndex}
                  />
                );
              }
            }
            break;
          case 'select': {
            const selectOptions = col.selectComponentOptions ||
              this.props.selectComponentOptions.get(column.columnKey);
            if (this.props.inlineEdit) {
              if (!column.cellEdit) {
                column.cellEdit = rowIndex => (
                  <FloatingSelect
                    name={col.valueKeyPath.join() + '-edit-' + rowIndex}
                    options={
                      col.editSelectOptionsMod && selectOptions ?
                        col.editSelectOptionsMod(selectOptions.slice(), rowIndex, col) :
                        selectOptions
                    }
                    value={this.getEditItemValue(rowIndex, col)}
                    onChange={this.onEditCellValueChange(rowIndex, col, editValueParser)}
                    onBlur={this.onEditCellBlur(rowIndex, col)}
                    onFocus={this.onCellFocus('edit', col.componentType, rowIndex, column.columnKey)}
                    searchable={selectOptions && (selectOptions.length > 9)}
                    clearable={!col.isRequired}
                    backspaceRemoves={false}
                    tabSelectsValue={false}
                    openOnFocus
                    ref={this.handleEditCellRef(rowIndex, col)}
                    inputProps={{
                      id: `ocDatagridEditInput-${this.props.grid.id}-${column.columnKey}-${rowIndex}`,
                    }}
                    {...col.editComponentProps}
                    disabled={this.getComponentDisabledState(rowIndex, col, 'edit')}
                    tabIndex={tabIndex}
                  />
                );
              }
              if (!column.cellCreate) {
                column.cellCreate = rowIndex => (
                  <FloatingSelect
                    name={col.valueKeyPath.join() + '-create-' + rowIndex}
                    options={
                      col.createSelectOptionsMod && selectOptions ?
                        col.createSelectOptionsMod(selectOptions.slice(), rowIndex, col) :
                        selectOptions
                    }
                    value={this.getCreateItemValue(rowIndex, col)}
                    onChange={this.onCreateCellValueChange(rowIndex, col, editValueParser)}
                    onBlur={this.onCreateCellBlur(rowIndex, col)}
                    searchable={selectOptions && (selectOptions.length > 9)}
                    clearable={!col.isRequired}
                    backspaceRemoves={false}
                    tabSelectsValue={false}
                    openOnFocus
                    ref={this.handleCreateCellRef(rowIndex, col)}
                    inputProps={{
                      id: `ocDatagridCreateInput-${this.props.grid.id}-${column.columnKey}-${rowIndex}`,
                    }}
                    {...col.createComponentProps}
                    disabled={this.getComponentDisabledState(rowIndex, col, 'create')}
                    tabIndex={tabIndex}
                  />
                );
              }
            }
            if (this.props.filtering) {
              if (!column.cellFilter) {
                column.cellFilter = () => (
                  <FloatingSelect
                    name={col.valueKeyPath.join() + '-filter'}
                    options={
                      col.filterSelectOptionsMod && selectOptions ?
                        col.filterSelectOptionsMod(selectOptions.slice(), col) :
                        selectOptions}
                    value={this.getFilterItemValue(col)}
                    onChange={this.onFilterCellValueChange(col, editValueParser)}
                    searchable={selectOptions && (selectOptions.length > 9)}
                    clearable
                    tabSelectsValue={false}
                    openOnFocus
                    inputProps={{
                      id: `ocDatagridFilterInput-${this.props.grid.id}-${column.columnKey}`,
                    }}
                    {...col.filterComponentProps}
                    tabIndex={tabIndex}
                  />
                );
              }
            }
            break;
          }
          case 'date': {
            if (this.props.inlineEdit) {
              if (!column.cellEdit) {
                column.cellEdit = rowIndex => (
                  <DateInput
                    value={this.getEditItemValue(rowIndex, col)}
                    onChange={this.onEditCellValueChange(rowIndex, col, editValueParser)}
                    language={this.props.userLanguage}
                    dateFormat={this.props.dateFormat}
                    inputRef={this.handleEditCellRef(rowIndex, col)}
                    inputProps={{
                      tabIndex,
                      id: `ocDatagridEditInput-${this.props.grid.id}-${column.columnKey}-${rowIndex}`,
                      onKeyDown: this.onEditCellKeyDown(col, rowIndex),
                      onBlur: this.onEditCellBlur(rowIndex, col),
                      onFocus: this.onCellFocus('edit', col.componentType, rowIndex, column.columnKey),
                      style: column.style,
                    }}
                    {...col.editComponentProps}
                    disabled={this.getComponentDisabledState(rowIndex, col, 'edit')}
                  />
                );
              }
              if (!column.cellCreate) {
                column.cellCreate = rowIndex => (
                  <DateInput
                    value={this.getCreateItemValue(rowIndex, col)}
                    onChange={this.onCreateCellValueChange(rowIndex, col, editValueParser)}
                    onKeyDown={this.onCreateCellKeyDown}
                    language={this.props.userLanguage}
                    dateFormat={this.props.dateFormat}
                    inputRef={this.handleCreateCellRef(rowIndex, col)}
                    inputProps={{
                      tabIndex,
                      id: `ocDatagridCreateInput-${this.props.grid.id}-${column.columnKey}-${rowIndex}`,
                      style: column.style,
                    }}
                    {...col.createComponentProps}
                    disabled={this.getComponentDisabledState(rowIndex, col, 'create')}
                  />
                );
              }
            }
            if (this.props.filtering) {
              if (!column.cellFilter) {
                column.cellFilter = () => (
                  <DateInput
                    value={this.getFilterItemValue(col)}
                    onChange={this.onFilterCellValueChange(col, editValueParser)}
                    dateFormat={this.props.dateFormat}
                    language={this.props.userLanguage}
                    inputProps={{
                      tabIndex,
                      id: `ocDatagridFilterInput-${this.props.grid.id}-${column.columnKey}`,
                      style: column.style,
                    }}
                    {...col.filterComponentProps}
                  />
                );
              }
            }
            break;
          }
          case 'boolean': {
            const selectOptions = [
              { value: true, label: this.props.intl.formatMessage({ id: 'Yes' }) },
              { value: false, label: this.props.intl.formatMessage({ id: 'No' }) },
            ];
            if (this.props.inlineEdit) {
              if (!column.cellEdit) {
                column.cellEdit = rowIndex => (
                  <FloatingSelect
                    name={col.valueKeyPath.join() + '-edit-' + rowIndex}
                    options={selectOptions}
                    value={this.getEditItemValue(rowIndex, col)}
                    onChange={this.onEditCellValueChange(rowIndex, col, editValueParser)}
                    onBlur={this.onEditCellBlur(rowIndex, col)}
                    onFocus={this.onCellFocus('edit', col.componentType, rowIndex, column.columnKey)}
                    searchable={false}
                    clearable={!col.isRequired}
                    backspaceRemoves={false}
                    tabSelectsValue={false}
                    openOnFocus
                    ref={this.handleEditCellRef(rowIndex, col)}
                    inputProps={{
                      id: `ocDatagridEditInput-${this.props.grid.id}-${column.columnKey}-${rowIndex}`,
                    }}
                    {...col.editComponentProps}
                    disabled={this.getComponentDisabledState(rowIndex, col, 'edit')}
                    tabIndex={tabIndex}
                  />
                );
              }
              if (!column.cellCreate) {
                column.cellCreate = rowIndex => (
                  <FloatingSelect
                    name={col.valueKeyPath.join() + '-create-' + rowIndex}
                    options={selectOptions}
                    value={this.getCreateItemValue(rowIndex, col)}
                    onChange={this.onCreateCellValueChange(rowIndex, col, editValueParser)}
                    onBlur={this.onCreateCellBlur(rowIndex, col)}
                    searchable={false}
                    clearable={!col.isRequired}
                    backspaceRemoves={false}
                    tabSelectsValue={false}
                    openOnFocus
                    ref={this.handleCreateCellRef(rowIndex, col)}
                    inputProps={{
                      id: `ocDatagridCreateInput-${this.props.grid.id}-${column.columnKey}-${rowIndex}`,
                    }}
                    {...col.createComponentProps}
                    disabled={this.getComponentDisabledState(rowIndex, col, 'create')}
                    tabIndex={tabIndex}
                  />
                );
              }
            }
            if (this.props.filtering) {
              if (!column.cellFilter) {
                column.cellFilter = () => (
                  <FloatingSelect
                    name={col.valueKeyPath.join() + '-filter'}
                    options={selectOptions}
                    value={this.getFilterItemValue(col)}
                    onChange={this.onFilterCellValueChange(col, editValueParser)}
                    searchable={false}
                    clearable
                    tabSelectsValue={false}
                    openOnFocus
                    inputProps={{
                      id: `ocDatagridFilterInput-${this.props.grid.id}-${column.columnKey}`,
                    }}
                    {...col.filterComponentProps}
                    tabIndex={tabIndex}
                  />
                );
              }
            }
            break;
          }
          default:
        }
      }
      columns.push(column);
    });

    if (this.props.isCreating) {
      columns.push({
        width: 37,
        isResizable: false,
        columnKey: 'removeNewItem',
        cell: () => null,
        cellEdit: () => null,
        cellCreate: rowIndex => (
          <Icon
            id={`oc-datagrid-new-item-remove-${this.props.grid.id}-${rowIndex}`}
            type="indicator"
            name="delete"
            width={30}
            height={30}
            onClick={() => this.props.removeNewItem(this.props.grid, rowIndex)}
          />
        ),
        cellFilter: () => null,
      });
    }
    return columns;
  }

  isCellEdited = (rowIndex, col, cellType) => {
    if (cellType !== 'edit') {
      return false;
    }
    const id = this.getDataIdByRowIndex(rowIndex);
    if (this.props.editData.getIn([id, ...col.valueKeyPath])) {
      return true;
    }
    return false;
  }

  // checker for selectionCheckbox
  isSelectionCheckbox(cellProps) {
    const expectedColumnKey = 'selectionCheckbox';
    return (this.props.rowSelectCheckboxColumn && cellProps.columnKey === expectedColumnKey);
  }

  handleAfterAddItem = () => {
    this.focusToCreateCell = true;
  }

  handleAfterEditPress = () => {
    if (this.props.selectedItems.size) {
      this.focusToEditCell = true;
      this.setState({
        currentRow: undefined,
      });
    }
  }

  handleAfterValidationError = () => {
    this.focusToErrorCell = true;
  }

  handleRowClick = (e, rowIndex) => {
    if (this.props.rowSelect && !this.props.isCreating && !this.props.isEditing) {
      if (e.ctrlKey || e.shiftKey) {
        document.getSelection().removeAllRanges();
      }
      // don't trigger selection change on checkbox click
      if (e.target.type !== 'checkbox') {
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
  }

  renderCell = col => (cellProps) => {
    const { isCreating, isEditing, createData, selectedCell } = this.props;
    const { rowIndex, ...props } = cellProps;
    const isCheckbox = this.isSelectionCheckbox(cellProps);
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
    if ((cellType === 'view' || cellType === 'edit' || cellType === 'create') && !isCheckbox) {
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
            id={cellType + col.columnKey + (rowIndex - extraRowCount)}
            isEdited={isEdited}
            isError={!!messageData.errorMessage}
            isWarning={!!messageData.warningMessage}
            infoMessage={messageData.infoMessage}
            errorMessage={messageData.errorMessage}
            warningMessage={messageData.warningMessage}
          >
            { cell }
          </CellTooltip>
        </Cell>
      );
    }
    return (
      <Cell {...props} className="oc-datagrid-cell" style={col.style}>{ cell }</Cell>
    );
  }

  renderColumns = () => {
    if (!this.props.allDataSize && !this.props.isBusy && !this.props.isCreating) {
      return (
        <Column
          columnKey="dataEmptyColumn"
          header={<Cell style={{ textAlign: 'center' }}><M id="GridNoItems" /></Cell>}
          width={10}
          isResizable={false}
          flexGrow={1}
        />
      );
    }
    if (!this.props.visibleColumns.size) {
      if (this.props.isBusy) {
        return (
          <Column
            columnKey="dataEmptyColumn"
            header={<Cell>{' '}</Cell>}
            width={10}
            isResizable={false}
            flexGrow={1}
          />
        );
      }
      return (
        <Column
          columnKey="dataEmptyColumn"
          header={<Cell style={{ textAlign: 'center' }}><M id="GridNoColumns" /></Cell>}
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
        allowCellsRecycling={col.allowCellsRecycling}
      />));
  }

  render() {
    const gridClassName = classNames({
      'oc-datagrid-container': true,
      'with-actionbar': this.props.inlineEdit && !this.props.disableActionBar,
      'is-busy': this.props.isBusy,
      'is-editing': this.props.isEditing,
      'is-creating': this.props.isCreating,
    });
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
          <div className="oc-datagrid-actionbar-right">{ this.props.actionBar }</div>
          { (this.props.filtering && this.props.disableDropdown
            && !this.props.disableFilteringControls) &&
            <FilteringControls {...this.props} />
          }
          { this.props.inlineEdit &&
            <InlineEditControls
              afterAddItem={this.handleAfterAddItem}
              afterEditPress={this.handleAfterEditPress}
              afterValidationError={this.handleAfterValidationError}
              {...this.props}
            />
          }
          { (this.props.dropdownMenuItems ||
             this.props.removing ||
             this.props.columnSettings ||
             (this.props.filtering && !this.props.disableDropdown)) &&
             <DropdownControls {...this.props} />
          }
        </ActionBar>
      );
    }
    if (this.props.actionBarLeft || this.props.gridHeader) {
      actionBarLeft = (
        <ActionBar position="left">
          <div className="oc-datagrid-gridheader">{ this.props.gridHeader }</div>
          <div className="oc-datagrid-actionbar-left">{ this.props.actionBarLeft }</div>
        </ActionBar>
      );
    }
    if (actionBarLeft || actionBarRight) {
      actionBar = (
        <div className="oc-datagrid-actionbar-container">
          { actionBarLeft }
          { actionBarRight }
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
        { this.props.isBusy && <Spinner /> }
        { actionBar }
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
          onRowMouseDown={this.props.onRowMouseDown}
          onRowMouseEnter={this.props.onRowMouseEnter}
          onRowMouseLeave={this.props.onRowMouseLeave}
          onScrollStart={this.props.onScrollStart}
          onScrollEnd={this.props.onScrollEnd}
          rowClassNameGetter={this.getRowClassName}
          rowHeightGetter={this.props.rowHeightGetter}
          onContentHeightChange={this.props.onContentHeightChange}
        >
          { this.renderColumns() }
        </ResponsiveFixedDataTable>
        { this.props.isColumnSettingsModalOpen &&
          <ColumnSettingsModal
            grid={this.props.grid}
            columns={this.props.columns}
            visibleColumns={this.props.visibleColumns}
            closeColumnSettingsModal={this.props.closeColumnSettingsModal}
            saveColumnSettings={this.props.saveColumnSettings}
          />
        }
        { this.props.children }
      </div>
    );
  }
}
