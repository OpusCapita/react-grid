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
import { FloatingSelect } from '@opuscapita/react-floating-select';
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
import { propTypes, defaultProps } from './datagrid.props';
import Utils from './datagrid.utils';
import './datagrid.component.scss';

import { Spinner } from '../spinner';
import KEY_CODES from '../constants/key-codes.constant';

const mapStateToProps = (state, ownProps) => {
  const locale = {};
  const GRID = ownProps.grid;
  if (ownProps.locale) {
    locale.userLanguage = ownProps.locale.language || 'en';
    locale.dateFormat = ownProps.locale.dateFormat || 'L';
    locale.thousandSeparator = ownProps.locale.thousandSeparator || '';
    locale.decimalSeparator = ownProps.locale.decimalSeparator || '.';
  } else if (state.user) {
    locale.userLanguage = state.user.getIn(['user', 'language'], 'en');
    locale.dateFormat = state.user.getIn(['localeFormat', 'dateFormat'], 'L');
    locale.thousandSeparator = state.user.getIn(['localeFormat', 'thousandSeparator'], '');
    locale.decimalSeparator = state.user.getIn(['localeFormat', 'decimalSeparator'], '.');
  }
  return {
    isBusy: state.datagrid.getIn([GRID.id, 'session', 'isBusy'], true),
    isEditing: state.datagrid.getIn([GRID.id, 'session', 'isEditing'], false),
    isCreating: state.datagrid.getIn([GRID.id, 'session', 'isCreating'], false),
    isFiltering:
      state.datagrid.getIn([GRID.id, 'config', 'filteringData', 'isFiltering'], false),
    sortColumn: state.datagrid.getIn([GRID.id, 'config', 'sortingData', 'sortColumn'], null),
    sortOrder: state.datagrid.getIn([GRID.id, 'config', 'sortingData', 'sortOrder'], null),
    columnWidths: state.datagrid.getIn([GRID.id, 'config', 'columnWidths'], Map()),
    selectedItems: state.datagrid.getIn([GRID.id, 'selectedItems'], List()),
    data: state.datagrid.getIn([GRID.id, 'data'], List()),
    editData: state.datagrid.getIn([GRID.id, 'editData'], Map()),
    createData: state.datagrid.getIn([GRID.id, 'createData'], List()),
    filterData: state.datagrid.getIn([GRID.id, 'config', 'filteringData', 'filterData'], Map()),
    cellMessages: state.datagrid.getIn([GRID.id, 'cellMessages'], Map()),
    createCellMessages: state.datagrid.getIn([GRID.id, 'createCellMessages'], Map()),
    allDataSize: state.datagrid.getIn([GRID.id, 'allData'], List()).size,
    userLanguage: locale.userLanguage || 'en',
    dateFormat: locale.dateFormat || 'L',
    thousandSeparator: locale.thousandSeparator || '',
    decimalSeparator: locale.decimalSeparator || '.',
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
    this.columnDefaultValues = {}; // Used when creating new items
    this.cellRefs = {};
  }

  componentWillUnmount() {
    this.props.invalidate(this.props.grid);
  }

  onColumnResizeEndCallback = (newColumnWidth, columnKey) => {
    this.props.resizeColumn(this.props.grid, columnKey, newColumnWidth);
  }

  onCreateCellKeyDown = (e) => {
    if (e.keyCode === KEY_CODES.ENTER) {
      this.props.addNewItem(this.props.grid, this.columnDefaultValues);
    }
  }

  onEditCellKeyDown = (e, columnKey, rowIndex) => {
    if (this.props.enableArrowNavigation) {
      const columns = this.props.columns;
      const rowsSize = this.props.data.size;
      switch (e.keyCode) {
        case KEY_CODES.DOWN: {
          const nextElement = this.cellRefs[`${this.props.grid.id}_${columnKey}_${rowIndex + 1}`];
          this.moveCellFocus(nextElement, rowIndex + 1, -1);
          break;
        }
        case KEY_CODES.UP: {
          const nextElement = this.cellRefs[`${this.props.grid.id}_${columnKey}_${rowIndex - 1}`];
          this.moveCellFocus(nextElement, rowIndex - 1, -1);
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

  onFilterCellValueChange = (col, value) => {
    this.props.filterCellValueChange(
      this.props.grid,
      this.props.columns,
      col,
      value,
    );
  }

  onCreateCellValueChange = (rowIndex, col, value) => {
    this.props.createCellValueChange(this.props.grid, rowIndex, col.valueKeyPath, value);
    if (col.onCreateValueChange) {
      col.onCreateValueChange(value, col.valueKeyPath, rowIndex);
    }
    if (col.onValueMatchChangeValue && value === col.onValueMatchChangeValue.matchValue) {
      this.onCreateCellValueChange(
        rowIndex,
        { valueKeyPath: col.onValueMatchChangeValue.newValueKeyPath },
        col.onValueMatchChangeValue.newValue,
      );
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

  onEditCellValueChange = (rowIndex, col, value) => {
    const dataId = this.getDataIdByRowIndex(rowIndex);
    this.props.editCellValueChange(this.props.grid, dataId, col.valueKeyPath, value);
    if (col.onEditValueChange) {
      col.onEditValueChange(value, col.valueKeyPath, rowIndex, dataId);
    }
    if (col.onValueMatchChangeValue && value === col.onValueMatchChangeValue.matchValue) {
      this.onEditCellValueChange(
        rowIndex,
        { valueKeyPath: col.onValueMatchChangeValue.newValueKeyPath },
        col.onValueMatchChangeValue.newValue,
      );
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

  onCreateCellBlur = (rowIndex, col, value) => {
    if (col.onCreateBlur) {
      col.onCreateBlur(value, rowIndex);
    }
  }

  onEditCellBlur = (rowIndex, col, value) => {
    if (col.onEditBlur) {
      const dataId = this.getDataIdByRowIndex(rowIndex);
      col.onEditBlur(value, rowIndex, dataId);
    }
  }

  onCellFocus = (e) => {
    e.target.select();
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
      isFiltering,
      createData,
      selectedItems,
      data,
    } = this.props;
    const rowClassNames = ['oc-datagrid-row'];
    let extraRowCount = 0; // how many rows to ignore from top, new + filter rows
    if (isCreating) extraRowCount = createData.size;
    if (isFiltering) extraRowCount += 1;
    if (isFiltering && rowIndex === 0) {
      rowClassNames.push('oc-datagrid-row-filter');
    } else {
      if (isCreating) {
        if (rowIndex <= (extraRowCount - 1)) {
          rowClassNames.push('oc-datagrid-row-new');
        }
      } else if (isEditing) {
        rowClassNames.push('oc-datagrid-row-edit');
      }
    }

    // check if row is selected
    if ((!isCreating && !isEditing) &&
        (selectedItems && grid.idKeyPath) &&
        (!isFiltering || rowIndex > 0)) {
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
    let errorMessage;
    let warningMessage;
    if (cellType === 'create') {
      errorMessage = this.props.createCellMessages.getIn(['error', rowIndex, ...col.valueKeyPath]);
      warningMessage = this.props.createCellMessages.getIn(['warning', rowIndex, ...col.valueKeyPath]);
    } else {
      const id = this.getDataIdByRowIndex(rowIndex);
      errorMessage = this.props.cellMessages.getIn(['error', id, ...col.valueKeyPath]);
      warningMessage = this.props.cellMessages.getIn(['warning', id, ...col.valueKeyPath]);
    }
    if (errorMessage) {
      returnData.errorMessageId = errorMessage.id || null;
      returnData.errorMessageValues = errorMessage.values || {};
    }
    if (warningMessage) {
      returnData.warningMessageId = warningMessage.id || null;
      returnData.warningMessageValues = warningMessage.values || {};
    }
    return returnData;
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

  generateColumns = () => {
    delete this.refFirstInvalidInput;
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
              onClick={() => {
                this.props.itemSelectionChange(
                  this.props.grid, true, false);
              }}
              tabIndex={tabIndex}
            />
          );
        },
        cellEdit: () => null,
        cellCreate: () => null,
        cellFilter: () => null,
      });
    }


    this.props.columns.forEach((col) => {
      const column = {
        header: col.header,
        columnKey: Utils.getColumnKey(col),
        width: col.width,
        isResizable: !col.disableResizing,
        fixed: !!col.fixed,
        allowCellsRecycling: !!col.allowCellsRecycling,
        disableSorting: !!col.disableSorting,
      };
      if (col.defaultValue !== undefined) {
        this.columnDefaultValues[column.columnKey] = col.defaultValue;
      }
      const inputStyle = {};
      if (col.align) {
        column.align = col.align;
        inputStyle.textAlign = col.align;
      }
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
      // Cell value rendering
      if (col.cell) {
        column.cell = col.cell;
      } else if (col.valueRender) {
        column.cell = rowIndex => col.valueRender(this.props.data.get(rowIndex));
      } else {
        switch (col.valueType) {
          case 'number':
            column.cell = (rowIndex) => {
              const val = this.props.data.getIn([rowIndex, ...col.valueKeyPath]);
              if (val === null) {
                return '';
              }
              return <N value={val} {...col.renderComponentProps} />;
            };
            break;
          case 'float':
            column.cell = (rowIndex) => {
              const val = this.props.data.getIn([rowIndex, ...col.valueKeyPath]);
              if (val === null) {
                return '';
              }
              return <N value={val} {...col.renderComponentProps} />;
            };
            break;
          case 'date':
            column.cell = (rowIndex) => {
              const val = this.props.data.getIn([rowIndex, ...col.valueKeyPath]);
              if (val === null) {
                return '';
              }
              return <D value={val} {...col.renderComponentProps} />;
            };
            break;
          case 'boolean':
            column.cell = (rowIndex) => {
              const val = this.props.data.getIn([rowIndex, ...col.valueKeyPath]);
              if (val === null) {
                return '';
              }
              return <M id={val ? 'Yes' : 'No'} {...col.renderComponentProps} />;
            };
            break;
          default:
            column.cell = rowIndex => this.props.data.getIn([rowIndex, ...col.valueKeyPath]);
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
                    onChange={e => this.onEditCellValueChange(
                      rowIndex,
                      col,
                      editValueParser(e.target.value))
                    }
                    onBlur={e => this.onEditCellBlur(
                      rowIndex,
                      col,
                      e.target.value,
                    )}
                    onKeyDown={e => this.onEditCellKeyDown(
                      e,
                      column.columnKey,
                      rowIndex,
                    )}
                    inputRef={(input) => {
                      if (this.props.enableArrowNavigation) {
                        this.cellRefs[`${this.props.grid.id}_${column.columnKey}_${rowIndex}`] = input;
                      }
                    }}
                    id={`ocDatagridEditInput-${this.props.grid.id}-${column.columnKey}-${rowIndex}`}
                    {...col.editComponentProps}
                    disabled={this.getComponentDisabledState(rowIndex, col, 'edit')}
                    style={inputStyle}
                    tabIndex={tabIndex}
                  />
                );
              }
              if (!column.cellCreate) {
                column.cellCreate = rowIndex => (
                  <FormControl
                    type="text"
                    value={this.getCreateItemValue(rowIndex, col)}
                    onChange={e => this.onCreateCellValueChange(
                      rowIndex,
                      col,
                      editValueParser(e.target.value),
                    )}
                    onBlur={e => this.onCreateCellBlur(
                      rowIndex,
                      col,
                      e.target.value,
                    )}
                    onKeyDown={this.onCreateCellKeyDown}
                    id={`ocDatagridCreateInput-${this.props.grid.id}-${column.columnKey}-${rowIndex}`}
                    {...col.createComponentProps}
                    disabled={this.getComponentDisabledState(rowIndex, col, 'create')}
                    style={inputStyle}
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
                    onChange={e => this.onFilterCellValueChange(
                      col,
                      editValueParser(e.target.value),
                    )}
                    id={`ocDatagridFilterInput-${this.props.grid.id}-${column.columnKey}`}
                    {...col.filterComponentProps}
                    style={inputStyle}
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
                    onChange={e => this.onEditCellValueChange(
                      rowIndex,
                      col,
                      e.target.value,
                    )}
                    onBlur={e => this.onEditCellBlur(
                      rowIndex,
                      col,
                      e.target.value,
                    )}
                    onFocus={this.onCellFocus}
                    onKeyDown={e => this.onEditCellKeyDown(
                      e,
                      column.columnKey,
                      rowIndex,
                    )}
                    inputRef={(input) => {
                      if (this.props.enableArrowNavigation) {
                        this.cellRefs[`${this.props.grid.id}_${column.columnKey}_${rowIndex}`] = input;
                      }
                    }}
                    id={`ocDatagridEditInput-${this.props.grid.id}-${column.columnKey}-${rowIndex}`}
                    {...col.editComponentProps}
                    disabled={this.getComponentDisabledState(rowIndex, col, 'edit')}
                    style={inputStyle}
                    tabIndex={tabIndex}
                  />
                );
              }
              if (!column.cellCreate) {
                column.cellCreate = rowIndex => (
                  <FormControl
                    type="number"
                    value={this.getCreateItemValue(rowIndex, col)}
                    onChange={e => this.onCreateCellValueChange(
                      rowIndex,
                      col,
                      e.target.value,
                    )}
                    onBlur={e => this.onCreateCellBlur(
                      rowIndex,
                      col,
                      e.target.value,
                    )}
                    onFocus={this.onCellFocus}
                    onKeyDown={this.onCreateCellKeyDown}
                    id={`ocDatagridCreateInput-${this.props.grid.id}-${column.columnKey}-${rowIndex}`}
                    {...col.createComponentProps}
                    disabled={this.getComponentDisabledState(rowIndex, col, 'create')}
                    style={inputStyle}
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
                    onChange={e => this.onFilterCellValueChange(
                      col,
                      e.target.value,
                    )}
                    id={`ocDatagridFilterInput-${this.props.grid.id}-${column.columnKey}`}
                    {...col.filterComponentProps}
                    style={inputStyle}
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
                    onChange={e => this.onEditCellValueChange(
                      rowIndex,
                      col,
                      editValueParser(e.target.value),
                    )}
                    onBlur={e => this.onEditCellBlur(
                      rowIndex,
                      col,
                      editValueParser(e.target.value),
                    )}
                    onKeyDown={e => this.onEditCellKeyDown(
                      e,
                      column.columnKey,
                      rowIndex,
                    )}
                    inputRef={(input) => {
                      if (this.props.enableArrowNavigation) {
                        this.cellRefs[`${this.props.grid.id}_${column.columnKey}_${rowIndex}`] = input;
                      }
                    }}
                    id={`ocDatagridEditInput-${this.props.grid.id}-${column.columnKey}-${rowIndex}`}
                    {...col.editComponentProps}
                    disabled={this.getComponentDisabledState(rowIndex, col, 'edit')}
                    style={inputStyle}
                    tabIndex={tabIndex}
                  />
                );
              }
              if (!column.cellCreate) {
                column.cellCreate = rowIndex => (
                  <FormControl
                    type="text"
                    value={this.getCreateItemValue(rowIndex, col)}
                    onChange={e => this.onCreateCellValueChange(
                      rowIndex,
                      col,
                      editValueParser(e.target.value),
                    )}
                    onBlur={e => this.onCreateCellBlur(
                      rowIndex,
                      col,
                      editValueParser(e.target.value),
                    )}
                    onKeyDown={this.onCreateCellKeyDown}
                    id={`ocDatagridCreateInput-${this.props.grid.id}-${column.columnKey}-${rowIndex}`}
                    {...col.createComponentProps}
                    disabled={this.getComponentDisabledState(rowIndex, col, 'create')}
                    style={inputStyle}
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
                    onChange={e => this.onFilterCellValueChange(
                      col,
                      editValueParser(e.target.value),
                    )}
                    id={`ocDatagridFilterInput-${this.props.grid.id}-${column.columnKey}`}
                    {...col.filterComponentProps}
                    style={inputStyle}
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
                    onChange={selectedData => this.onEditCellValueChange(
                      rowIndex,
                      col,
                      selectedData && editValueParser(selectedData.value),
                    )}
                    onBlur={() => this.onEditCellBlur(
                      rowIndex,
                      col,
                      this.getEditItemValue(rowIndex, col),
                    )}
                    searchable={selectOptions && (selectOptions.length > 9)}
                    clearable={false}
                    backspaceRemoves={false}
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
                    onChange={selectedData => this.onCreateCellValueChange(
                      rowIndex,
                      col,
                      selectedData && editValueParser(selectedData.value),
                    )}
                    onBlur={() => this.onCreateCellBlur(
                      rowIndex,
                      col,
                      this.getEditItemValue(rowIndex, col),
                    )}
                    searchable={selectOptions && (selectOptions.length > 9)}
                    clearable={false}
                    backspaceRemoves={false}
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
                    onChange={selectedData => this.onFilterCellValueChange(
                      col,
                      selectedData && editValueParser(selectedData.value),
                    )}
                    searchable={selectOptions && (selectOptions.length > 9)}
                    clearable
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
                    onChange={data => this.onEditCellValueChange(
                      rowIndex,
                      col,
                      editValueParser(data),
                    )}
                    language={this.props.userLanguage}
                    inputProps={{
                      tabIndex,
                      id: `ocDatagridEditInput-${this.props.grid.id}-${column.columnKey}-${rowIndex}`,
                      onKeyDown: e => this.onEditCellKeyDown(
                        e,
                        column.columnKey,
                        rowIndex,
                      ),
                      inputRef: (input) => {
                        if (this.props.enableArrowNavigation) {
                          this.cellRefs[`${this.props.grid.id}_${column.columnKey}_${rowIndex}`] = input;
                        }
                      },
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
                    onChange={data => this.onCreateCellValueChange(
                      rowIndex,
                      col,
                      editValueParser(data),
                    )}
                    onKeyDown={this.onCreateCellKeyDown}
                    language={this.props.userLanguage}
                    inputProps={{
                      tabIndex,
                      id: `ocDatagridCreateInput-${this.props.grid.id}-${column.columnKey}-${rowIndex}`,
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
                    onChange={data => this.onFilterCellValueChange(
                      col,
                      editValueParser(data),
                    )}
                    language={this.props.userLanguage}
                    inputProps={{
                      tabIndex,
                      id: `ocDatagridFilterInput-${this.props.grid.id}-${column.columnKey}`,
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
                    onChange={selectedData => this.onEditCellValueChange(
                      rowIndex,
                      col,
                      selectedData && editValueParser(selectedData.value),
                    )}
                    onBlur={() => this.onEditCellBlur(
                      rowIndex,
                      col,
                      this.getEditItemValue(rowIndex, col),
                    )}
                    searchable={false}
                    clearable={false}
                    backspaceRemoves={false}
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
                    onChange={selectedData => this.onCreateCellValueChange(
                      rowIndex,
                      col,
                      selectedData && editValueParser(selectedData.value),
                    )}
                    onBlur={() => this.onCreateCellBlur(
                      rowIndex,
                      col,
                      this.getEditItemValue(rowIndex, col),
                    )}
                    searchable={false}
                    clearable={false}
                    backspaceRemoves={false}
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
                    onChange={selectedData => this.onFilterCellValueChange(
                      col,
                      selectedData && editValueParser(selectedData.value),
                    )}
                    searchable={false}
                    clearable
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

  renderCell(col, cellProps) {
    const { isCreating, isEditing, isFiltering, createData } = this.props;
    const { rowIndex, ...props } = cellProps;
    const style = {};
    const isCheckbox = this.isSelectionCheckbox(cellProps);
    let cell;
    let cellType = 'view';
    let extraRowCount = 0; // how many rows to ignore from top, new + filter rows
    if (isCreating) extraRowCount = createData.size;
    if (isFiltering) extraRowCount += 1;
    if (col.align && col.align === 'right') style.textAlign = 'right';
    if (col.align && col.align === 'center') style.textAlign = 'center';
    if (isFiltering && rowIndex === 0) {
      cell = col.cellFilter();
      cellType = 'filter';
    } else {
      if (isCreating) {
        if (rowIndex <= (extraRowCount - 1)) {
          if (col.cellCreate) {
            const realIndex = isFiltering ? rowIndex - 1 : rowIndex;
            cell = col.cellCreate(realIndex);
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
    }
    if ((cellType === 'view' || cellType === 'edit' || cellType === 'create') && !isCheckbox) {
      const getRowIndex = (cellType === 'create') ? rowIndex : (rowIndex - extraRowCount);
      const messageData = this.getCellMessages(getRowIndex, col, cellType);
      const isEdited = this.isCellEdited(getRowIndex, col, cellType);
      return (
        <Cell {...props} className="oc-datagrid-cell" style={style}>
          <CellTooltip
            id={cellType + col.columnKey + (rowIndex - extraRowCount)}
            isEdited={isEdited}
            isError={!!messageData.errorMessageId}
            isWarning={!!messageData.warningMessageId}
            errorMessageId={messageData.errorMessageId}
            errorMessageValues={messageData.errorMessageValues}
            warningMessageId={messageData.warningMessageId}
            warningMessageValues={messageData.warningMessageValues}
          >
            { cell }
          </CellTooltip>
        </Cell>
      );
    }
    return (
      <Cell {...props} className="oc-datagrid-cell" style={style}>{ cell }</Cell>
    );
  }

  renderColumns = () => {
    const columns = this.generateColumns();
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
          >
            {col.header}
          </HeaderCell>
        }
        cell={cellProps => (this.renderCell(col, cellProps))}
        width={this.props.columnWidths.get(col.columnKey, (col.width || 200))}
        isResizable={col.isResizable}
        flexGrow={col.flexGrow ? col.flexGrow : 0}
        fixed={col.fixed}
        allowCellsRecycling={col.allowCellsRecycling}
      />
    ));
  }

  render() {
    const gridClassName = classNames({
      'oc-datagrid-container': true,
      'with-actionbar': this.props.inlineEdit && !this.props.disableActionBar,
      'is-busy': this.props.isBusy,
      'is-editing': this.props.isEditing,
      'is-creating': this.props.isCreating,
      'is-filtering': this.props.isFiltering,
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
              columnDefaultValues={this.columnDefaultValues}
              firstInvalidInput={this.refFirstInvalidInput}
              {...this.props}
            />
          }
          { (this.props.dropdownMenuItems ||
             this.props.removing ||
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
    if (this.props.isFiltering) rowsCount += 1;
    let scrollToRow = this.props.scrollToRow || this.state.currentRow;
    if (!scrollToRow && this.props.selectedItems.size > 0) {
      scrollToRow = this.getSelectedItemIndex(this.props.selectedItems.first());
    }
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
          headerHeight={this.props.headerHeight}
          rowHeight={this.props.rowHeight}
          onColumnResizeEndCallback={this.onColumnResizeEndCallback}
          isColumnResizing={false}
          onRowClick={(e, rowIndex) => {
            let realRowIndex = rowIndex;
            if (this.props.isFiltering) {
              if (rowIndex === 0) {
                return false;
              }
              realRowIndex -= 1;
            }
            if (this.props.rowSelect && !this.props.isCreating && !this.props.isEditing) {
              if (e.ctrlKey || e.shiftKey) {
                document.getSelection().removeAllRanges();
              }

              // don't trigger selection change if it's checkbox column that is clicked.
              if (e.target.type !== 'checkbox') {
                this.props.itemSelectionChange(
                  this.props.grid,
                  realRowIndex,
                  this.props.multiSelect && e.ctrlKey,
                  this.props.multiSelect && e.shiftKey,
                );
              }
            }
            if (this.props.onRowClick) {
              this.props.onRowClick(e, realRowIndex, this.props.data.get(realRowIndex));
            }
            return true;
          }}
          scrollToColumn={this.props.scrollToColumn || this.state.currentColumn}
          scrollTop={this.props.scrollTop}
          scrollToRow={scrollToRow}
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
          {
            (!this.props.allDataSize && !this.props.isBusy && !this.props.isCreating) ?
              <Column
                columnKey="dataEmptyColumn"
                header={<Cell style={{ textAlign: 'center' }}><M id="GridNoItems" /></Cell>}
                width={10}
                isResizable={false}
                flexGrow={1}
              /> :
              this.renderColumns()
          }
        </ResponsiveFixedDataTable>
        { this.props.children }
      </div>
    );
  }
}
