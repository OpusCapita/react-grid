var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _class, _class2, _temp, _initialiseProps;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable no-lonely-if, prefer-template, react/require-default-props */
import React from 'react';
import { Map, List } from 'immutable';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage as M, FormattedNumber as N } from 'react-intl';
import { Column, Cell } from 'fixed-data-table-2';
import { Checkbox, FormControl } from 'react-bootstrap';
import classNames from 'classnames';
import moment from 'moment';
import { FloatingSelect } from '@opuscapita/react-floating-select';
import { DateInput } from '@opuscapita/react-datetime';
import { Icon } from '@opuscapita/react-icons';
import { Spinner } from '@opuscapita/react-spinner';
import { formatCurrencyAmount } from '@opuscapita/format-utils';
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
import Utils from './datagrid.utils';
import './datagrid.component.scss';

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var GRID = ownProps.grid;
  return {
    isBusy: state.datagrid.getIn([GRID.id, 'session', 'isBusy'], true),
    isEditing: state.datagrid.getIn([GRID.id, 'session', 'isEditing'], false),
    isCreating: state.datagrid.getIn([GRID.id, 'session', 'isCreating'], false),
    isFiltering: state.datagrid.getIn([GRID.id, 'config', 'filteringData', 'isFiltering'], false),
    isColumnSettingsModalOpen: state.datagrid.getIn([GRID.id, 'session', 'columnSettingsModal', 'open'], false),
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
    dateFormat: Utils.getDateFormat(GRID, state.user),
    thousandSeparator: Utils.getThousandSeparator(GRID, state.user),
    decimalSeparator: Utils.getDecimalSeparator(GRID, state.user)
  };
};

var mapDispatchToProps = datagridActions;

var DataGrid = (_dec = connect(mapStateToProps, mapDispatchToProps), injectIntl(_class = _dec(_class = (_temp = _class2 = function (_React$PureComponent) {
  _inherits(DataGrid, _React$PureComponent);

  function DataGrid(props) {
    _classCallCheck(this, DataGrid);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _initialiseProps.call(_this);

    _this.state = { currentRow: 0, currentColumn: 0 };
    _this.cellRefs = {};
    _this.focusToCreateCell = false;
    _this.focusToEditCell = false; // TODO: Handle focusing when true
    _this.focusToErrorCell = false; // TODO: Handle focusing when true
    return _this;
  }

  DataGrid.prototype.componentWillUnmount = function componentWillUnmount() {
    this.props.invalidate(this.props.grid);
  };

  // checker for selectionCheckbox
  DataGrid.prototype.isSelectionCheckbox = function isSelectionCheckbox(cellProps) {
    var expectedColumnKey = 'selectionCheckbox';
    return this.props.rowSelectCheckboxColumn && cellProps.columnKey === expectedColumnKey;
  };

  DataGrid.prototype.render = function render() {
    var gridClassName = classNames({
      'oc-datagrid-container': true,
      'with-actionbar': this.props.inlineEdit && !this.props.disableActionBar,
      'is-busy': this.props.isBusy,
      'is-editing': this.props.isEditing,
      'is-creating': this.props.isCreating
    });
    var actionBar = null;
    var actionBarRight = null;
    var actionBarLeft = null;
    if ((this.props.actionBar || this.props.inlineEdit || this.props.filtering || this.props.removing) && !this.props.disableActionBar) {
      actionBarRight = React.createElement(
        ActionBar,
        { position: 'right' },
        React.createElement(
          'div',
          { className: 'oc-datagrid-actionbar-right' },
          this.props.actionBar
        ),
        this.props.filtering && this.props.disableDropdown && !this.props.disableFilteringControls && React.createElement(FilteringControls, this.props),
        this.props.inlineEdit && React.createElement(InlineEditControls, _extends({
          afterAddItem: this.handleAfterAddItem,
          afterEditPress: this.handleAfterEditPress,
          afterValidationError: this.handleAfterValidationError
        }, this.props)),
        (this.props.dropdownMenuItems || this.props.removing || this.props.columnSettings || this.props.filtering && !this.props.disableDropdown) && React.createElement(DropdownControls, this.props)
      );
    }
    if (this.props.actionBarLeft || this.props.gridHeader) {
      actionBarLeft = React.createElement(
        ActionBar,
        { position: 'left' },
        React.createElement(
          'div',
          { className: 'oc-datagrid-gridheader' },
          this.props.gridHeader
        ),
        React.createElement(
          'div',
          { className: 'oc-datagrid-actionbar-left' },
          this.props.actionBarLeft
        )
      );
    }
    if (actionBarLeft || actionBarRight) {
      actionBar = React.createElement(
        'div',
        { className: 'oc-datagrid-actionbar-container' },
        actionBarLeft,
        actionBarRight
      );
    }
    var rowsCount = this.props.rowsCount || this.props.rowsCount === 0 ? this.props.rowsCount : this.props.data.size;
    if (this.props.isCreating) rowsCount += this.props.createData.size;
    if (!this.props.visibleColumns.size) rowsCount = 0;
    return React.createElement(
      'div',
      {
        id: 'oc-datagrid-' + this.props.grid.id,
        className: gridClassName,
        style: this.props.containerStyle
      },
      this.props.isBusy && React.createElement(Spinner, null),
      actionBar,
      React.createElement(
        ResponsiveFixedDataTable,
        {
          id: this.props.grid.id,
          rowsCount: rowsCount,
          headerHeight: this.props.isFiltering ? this.props.headerHeight + this.props.filterRowHeight : this.props.headerHeight,
          rowHeight: this.props.rowHeight,
          onColumnResizeEndCallback: this.onColumnResizeEndCallback,
          isColumnResizing: false,
          onRowClick: this.handleRowClick,
          scrollToColumn: this.props.scrollToColumn || this.state.currentColumn,
          scrollTop: this.props.scrollTop,
          scrollToRow: this.getScrollToRow(),
          onRowDoubleClick: this.props.onRowDoubleClick,
          onRowMouseDown: this.props.onRowMouseDown,
          onRowMouseEnter: this.props.onRowMouseEnter,
          onRowMouseLeave: this.props.onRowMouseLeave,
          onScrollStart: this.props.onScrollStart,
          onScrollEnd: this.props.onScrollEnd,
          rowClassNameGetter: this.getRowClassName,
          rowHeightGetter: this.props.rowHeightGetter,
          onContentHeightChange: this.props.onContentHeightChange
        },
        this.renderColumns()
      ),
      this.props.isColumnSettingsModalOpen && React.createElement(ColumnSettingsModal, {
        grid: this.props.grid,
        columns: this.props.columns,
        visibleColumns: this.props.visibleColumns,
        closeColumnSettingsModal: this.props.closeColumnSettingsModal,
        saveColumnSettings: this.props.saveColumnSettings
      }),
      this.props.children
    );
  };

  return DataGrid;
}(React.PureComponent), _class2.defaultProps = defaultProps, _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.onColumnResizeEndCallback = function (newColumnWidth, columnKey) {
    _this2.props.resizeColumn(_this2.props.grid, columnKey, newColumnWidth);
  };

  this.onCreateCellKeyDown = function (e) {
    if (e.keyCode === KEY_CODES.ENTER) {
      _this2.props.addNewItem(_this2.props.grid, Utils.getColumnDefaultValues(_this2.props.columns));
      _this2.focusToCreateCell = true;
    }
  };

  this.onEditCellKeyDown = function (col, rowIndex) {
    return function (e) {
      if (_this2.props.enableArrowNavigation) {
        var columns = _this2.props.columns;

        var rowsSize = _this2.props.data.size;
        var columnKey = Utils.getColumnKey(col);
        switch (e.keyCode) {
          case KEY_CODES.DOWN:
            {
              if (col.valueType !== 'number') {
                var nextElement = _this2.cellRefs[_this2.props.grid.id + '_' + columnKey + '_' + (rowIndex + 1)];
                _this2.moveCellFocus(nextElement, rowIndex + 1, -1);
              }
              break;
            }
          case KEY_CODES.UP:
            {
              if (col.valueType !== 'number') {
                var _nextElement = _this2.cellRefs[_this2.props.grid.id + '_' + columnKey + '_' + (rowIndex - 1)];
                _this2.moveCellFocus(_nextElement, rowIndex - 1, -1);
              }
              break;
            }
          case KEY_CODES.TAB:
          case KEY_CODES.RIGHT:
          case KEY_CODES.LEFT:
            {
              e.preventDefault();
              var columnInd = columns.findIndex(function (c) {
                return c.valueKeyPath.join() === columnKey;
              });
              if (columnInd !== -1) {
                var disabled = true;
                var _nextElement2 = null;
                var rowInd = rowIndex;
                while (disabled) {
                  if (e.keyCode === KEY_CODES.LEFT || e.keyCode === KEY_CODES.TAB && e.shiftKey) {
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
                  var nextColumnKey = Utils.getColumnKey(columns[columnInd]);
                  _nextElement2 = _this2.cellRefs[_this2.props.grid.id + '_' + nextColumnKey + '_' + rowInd];
                  disabled = _nextElement2 ? _nextElement2.disabled : false;
                }
                if (!disabled && _nextElement2) {
                  _this2.moveCellFocus(_nextElement2, rowInd, columnInd);
                }
              }
              break;
            }
          default:
            break;
        }
      }
    };
  };

  this.onFilterCellValueChange = function (col, valueParser) {
    return function (eventOrData) {
      var rawValue = void 0;
      // eventOrData can be input onChange event, react-select onChange or react-day-picker onChange
      if (eventOrData) {
        if (eventOrData.target !== undefined) rawValue = eventOrData.target.value;else if (eventOrData.value !== undefined) rawValue = eventOrData.value;else rawValue = eventOrData;
      }
      var value = valueParser(rawValue);
      _this2.props.filterCellValueChange(_this2.props.grid, _this2.props.columns, col, value);
    };
  };

  this.onCreateCellValueChange = function (rowIndex, col, valueParser) {
    return function (eventOrData) {
      var rawValue = void 0;
      // eventOrData can be input onChange event, react-select onChange or react-day-picker onChange
      if (eventOrData) {
        if (eventOrData.target !== undefined) rawValue = eventOrData.target.value;else if (eventOrData.value !== undefined) rawValue = eventOrData.value;else rawValue = eventOrData;
      }
      var value = valueParser(rawValue);
      _this2.props.createCellValueChange(_this2.props.grid, rowIndex, col.valueKeyPath, value);
      if (col.onCreateValueChange) {
        col.onCreateValueChange(value, col.valueKeyPath, rowIndex);
      }
      if (col.onValueMatchChangeValue && value === col.onValueMatchChangeValue.matchValue) {
        // Call special paired value change on other cell if value matches
        _this2.onCreateCellValueChange(rowIndex, { valueKeyPath: col.onValueMatchChangeValue.newValueKeyPath }, function (v) {
          return v;
        })(col.onValueMatchChangeValue.newValue);
      }
      if (col.validators) {
        _this2.props.createCellValueValidate(_this2.props.grid, rowIndex, col.valueKeyPath, value, col.validators);
      }
    };
  };

  this.onEditCellValueChange = function (rowIndex, col, valueParser) {
    return function (eventOrData) {
      var dataId = _this2.getDataIdByRowIndex(rowIndex);
      var rawValue = void 0;
      // eventOrData can be input onChange event, react-select onChange or react-day-picker onChange
      if (eventOrData) {
        if (eventOrData.target !== undefined) rawValue = eventOrData.target.value;else if (eventOrData.value !== undefined) rawValue = eventOrData.value;else rawValue = eventOrData;
      }
      var value = valueParser(rawValue);
      _this2.props.editCellValueChange(_this2.props.grid, dataId, col.valueKeyPath, value);
      if (col.onEditValueChange) {
        col.onEditValueChange(value, col.valueKeyPath, rowIndex, dataId);
      }
      if (col.onValueMatchChangeValue && value === col.onValueMatchChangeValue.matchValue) {
        // Call special paired value change on other cell if value matches
        _this2.onEditCellValueChange(rowIndex, { valueKeyPath: col.onValueMatchChangeValue.newValueKeyPath }, function (v) {
          return v;
        })(col.onValueMatchChangeValue.newValue);
      }
      if (col.validators) {
        _this2.props.editCellValueValidate(_this2.props.grid, dataId, col.valueKeyPath, value, col.validators);
      }
    };
  };

  this.onCreateCellBlur = function (rowIndex, col, valueParser) {
    return function (e) {
      if (col.onCreateBlur) {
        var value = e && e.target && e.target.value !== undefined ? e.target.value : _this2.getEditItemValue(rowIndex, col);
        if (valueParser !== undefined) {
          value = valueParser(value);
        }
        col.onCreateBlur(value, rowIndex);
      }
    };
  };

  this.onEditCellBlur = function (rowIndex, col, valueParser) {
    return function (e) {
      if (col.onEditBlur) {
        var value = e && e.target && e.target.value !== undefined ? e.target.value : _this2.getEditItemValue(rowIndex, col);
        if (valueParser !== undefined) {
          value = valueParser(value);
        }
        var dataId = _this2.getDataIdByRowIndex(rowIndex);
        col.onEditBlur(value, rowIndex, dataId);
      }
    };
  };

  this.onCellFocus = function (cellType, inputType, rowIndex, columnKey) {
    return function (e) {
      if (inputType === 'number') {
        e.target.select();
      }
      if (cellType === 'edit' && _this2.props.cellSelect) {
        _this2.props.cellSelectionChange(_this2.props.grid, Map({ rowIndex: rowIndex, columnKey: columnKey }));
      }
    };
  };

  this.getDataIdByRowIndex = function (rowIndex) {
    return _this2.props.data.getIn([rowIndex].concat(_this2.props.grid.idKeyPath));
  };

  this.getSelectedItemIndex = function (id) {
    if (!id) return undefined;
    var index = _this2.props.data.findIndex(function (v) {
      return v.getIn(_this2.props.grid.idKeyPath) === id;
    });
    return index === -1 ? undefined : index;
  };

  this.getEditItemValue = function (rowIndex, col) {
    // Get the value to display in edit cell
    var id = _this2.getDataIdByRowIndex(rowIndex);
    var editValue = _this2.props.editData.getIn([id].concat(col.valueKeyPath), undefined);
    var originalValue = void 0;
    if (editValue === undefined) {
      originalValue = _this2.props.data.getIn([rowIndex].concat(col.valueKeyPath), '');
    } else if (editValue === null) {
      return '';
    } else {
      return editValue;
    }
    if (originalValue === null || originalValue === undefined || originalValue === '') {
      return '';
    }
    // Special formatting by component type
    if (col.componentType === 'float' && String(originalValue).length > 0) {
      return String(originalValue).replace('.', _this2.props.decimalSeparator);
    }
    return originalValue;
  };

  this.getCreateItemValue = function (rowIndex, col) {
    var val = _this2.props.createData.getIn([rowIndex].concat(col.valueKeyPath), '');
    if (val === null) {
      return '';
    }
    return val;
  };

  this.getFilterItemValue = function (col) {
    var val = _this2.props.filterData.get(Utils.getColumnKey(col), '');
    if (val === null) {
      return '';
    }
    return val;
  };

  this.getComponentDisabledState = function (rowIndex, col, mode) {
    var componentDisabled = !!col.disableEditing;
    // check if component is disabled by other column data
    if (!componentDisabled && col.disableEditingOnValueMatch) {
      if (mode === 'create') {
        componentDisabled = _this2.getCreateItemValue(rowIndex, { valueKeyPath: col.disableEditingOnValueMatch.matchValueKeyPath }) === col.disableEditingOnValueMatch.matchValue;
      } else {
        componentDisabled = _this2.getEditItemValue(rowIndex, { valueKeyPath: col.disableEditingOnValueMatch.matchValueKeyPath }) === col.disableEditingOnValueMatch.matchValue;
      }
    }
    return componentDisabled;
  };

  this.getRowClassName = function (rowIndex) {
    var _props = _this2.props,
        grid = _props.grid,
        isCreating = _props.isCreating,
        isEditing = _props.isEditing,
        createData = _props.createData,
        selectedItems = _props.selectedItems,
        data = _props.data;

    var rowClassNames = ['oc-datagrid-row'];
    var extraRowCount = 0; // how many rows to ignore from top, new + filter rows
    if (isCreating) extraRowCount = createData.size;
    if (isCreating) {
      if (rowIndex <= extraRowCount - 1) {
        rowClassNames.push('oc-datagrid-row-new');
      }
    } else if (isEditing) {
      rowClassNames.push('oc-datagrid-row-edit');
    }

    // check if row is selected
    if (!isCreating && !isEditing && selectedItems && grid.idKeyPath) {
      if (selectedItems.indexOf(data.getIn([rowIndex - extraRowCount].concat(grid.idKeyPath))) !== -1) {
        rowClassNames.push('is-selected');
      }
    }

    if (_this2.props.rowClassNameGetter) {
      return rowClassNames.join(' ') + ' ' + _this2.props.rowClassNameGetter(rowIndex);
    }
    return rowClassNames.join(' ');
  };

  this.getCellMessages = function (rowIndex, col, cellType) {
    var returnData = {};
    if (!_this2.props.grid.idKeyPath || !col.valueKeyPath) {
      return returnData;
    }
    var infoMessage = void 0;
    var errorMessage = void 0;
    var warningMessage = void 0;
    if (cellType === 'create') {
      infoMessage = _this2.props.createCellMessages.getIn(['info', rowIndex].concat(col.valueKeyPath));
      errorMessage = _this2.props.createCellMessages.getIn(['error', rowIndex].concat(col.valueKeyPath));
      warningMessage = _this2.props.createCellMessages.getIn(['warning', rowIndex].concat(col.valueKeyPath));
    } else {
      var id = _this2.getDataIdByRowIndex(rowIndex);
      infoMessage = _this2.props.cellMessages.getIn(['info', id].concat(col.valueKeyPath));
      errorMessage = _this2.props.cellMessages.getIn(['error', id].concat(col.valueKeyPath));
      warningMessage = _this2.props.cellMessages.getIn(['warning', id].concat(col.valueKeyPath));
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

  this.getScrollToRow = function () {
    var scrollToRow = void 0;
    if (_this2.props.isCreating && !_this2.focusToCreateCell) return scrollToRow;
    if (_this2.focusToCreateCell) {
      var scrollNewRow = _this2.props.createData.size - 1;
      if (scrollNewRow >= 0) {
        scrollToRow = scrollNewRow;
      }
    } else {
      if (_this2.props.isEditing) {
        scrollToRow = _this2.state.currentRow;
      } else {
        scrollToRow = _this2.props.scrollToRow; // eslint-disable-line
      }
      if (scrollToRow === undefined && _this2.props.selectedItems.size > 0) {
        scrollToRow = _this2.getSelectedItemIndex(_this2.props.selectedItems.first());
      }
    }
    return scrollToRow;
  };

  this.handleCellSelect = function (cellType, rowIndex, columnKey) {
    return function () {
      if (cellType === 'view' && _this2.props.cellSelect) {
        _this2.props.cellSelectionChange(_this2.props.grid, Map({ rowIndex: rowIndex, columnKey: columnKey }));
      }
    };
  };

  this.handleCreateCellRef = function (rowIndex, col) {
    return function (ref) {
      // Focus to create cell
      if (_this2.props.createData.size && _this2.props.createData.size === rowIndex + 1 && _this2.focusToCreateCell && !_this2.getComponentDisabledState(rowIndex, col, 'create')) {
        ref.focus();
        _this2.focusToCreateCell = false;
      }
    };
  };

  this.handleEditCellRef = function (rowIndex, col) {
    return function (ref) {
      var columnKey = Utils.getColumnKey(col);
      if (_this2.focusToEditCell && !_this2.getComponentDisabledState(rowIndex, col, 'edit')) {
        var selectedRowIndex = _this2.getSelectedItemIndex(_this2.props.selectedItems.first());
        var selectedCell = _this2.props.selectedCell;

        if (selectedCell.size > 0) {
          if (selectedCell.get('rowIndex') === rowIndex && selectedCell.get('columnKey') === columnKey) {
            ref.focus();
            _this2.focusToEditCell = false;
          }
        } else if (selectedRowIndex === undefined) {
          _this2.focusToEditCell = false;
        } else if (selectedRowIndex === rowIndex) {
          ref.focus();
          _this2.focusToEditCell = false;
        }
      }
      if (_this2.props.enableArrowNavigation) {
        _this2.cellRefs[_this2.props.grid.id + '_' + columnKey + '_' + rowIndex] = ref;
      }
    };
  };

  this.moveCellFocus = function (nextElement, rowIndex, columnIndex) {
    if (nextElement && (nextElement.type === 'text' || nextElement.type === 'number')) {
      if (rowIndex !== -1) {
        _this2.setState({ currentRow: rowIndex });
      }
      if (columnIndex !== -1) {
        _this2.setState({ currentColumn: columnIndex });
      }
      setTimeout(function () {
        return nextElement.select();
      }, 50);
    }
  };

  this.handleSelectionCheckBoxOnChange = function (rowIndex) {
    return function () {
      _this2.props.itemSelectionChange(_this2.props.grid, rowIndex, true, false);
    };
  };

  this.generateColumns = function () {
    var columns = [];
    var tabIndex = String(_this2.props.tabIndex);
    if (_this2.props.rowSelectCheckboxColumn) {
      columns.push({
        width: 40,
        isResizable: false,
        columnKey: 'selectionCheckbox',
        cell: function cell(rowIndex) {
          var rowItem = _this2.props.data.get(rowIndex);
          var itemId = rowItem.getIn(_this2.props.grid.idKeyPath);
          var selected = _this2.props.selectedItems.includes(itemId);
          return React.createElement(Checkbox, {
            className: 'oc-row-select-checkbox',
            checked: selected,
            onChange: _this2.handleSelectionCheckBoxOnChange(rowIndex),
            tabIndex: tabIndex
          });
        },
        cellEdit: function cellEdit() {
          return null;
        },
        cellCreate: function cellCreate() {
          return null;
        },
        cellFilter: function cellFilter() {
          return null;
        }
      });
    }

    var visibleColumns = [];
    _this2.props.visibleColumns.forEach(function (visibleColumnKey) {
      _this2.props.columns.forEach(function (orgCol) {
        if (Utils.getColumnKey(orgCol) === visibleColumnKey) {
          visibleColumns.push(orgCol);
        }
      });
    });
    visibleColumns.forEach(function (col) {
      var column = {
        header: col.header,
        columnKey: Utils.getColumnKey(col),
        width: col.width || col.width === 0 ? col.width : 200,
        minWidth: col.minWidth || col.minWidth === 0 ? col.minWidth : 40,
        maxWidth: col.maxWidth,
        isResizable: !col.disableResizing,
        fixed: !!col.fixed,
        allowCellsRecycling: !!col.allowCellsRecycling,
        disableSorting: !!col.disableSorting,
        isRequired: !!col.isRequired,
        componentType: col.componentType,
        style: Utils.getCellStyleByCol(col)
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
      var valueEmptyChecker = Utils.getValueEmptyChecker(col);
      // Cell value rendering
      var valueRender = function valueRender(rowIndex, format) {
        var val = _this2.props.data.getIn([rowIndex].concat(col.valueKeyPath));
        if (valueEmptyChecker(val)) {
          return col.isRequired ? React.createElement(M, { id: 'Grid.ValueIsMissing' }) : '';
        }
        return format ? format(val) : val;
      };

      if (col.cell) {
        column.cell = col.cell;
      } else if (col.valueRender) {
        column.cell = function (rowIndex) {
          return col.valueRender(_this2.props.data.get(rowIndex));
        };
      } else {
        switch (col.valueType) {
          case 'number':
          case 'float':
            column.cell = function (rowIndex) {
              return valueRender(rowIndex, function (v) {
                return React.createElement(N, _extends({ value: v }, col.renderComponentProps));
              });
            };
            break;
          case 'currency':
            {
              var currencyKeyPath = col.valueOptions && col.valueOptions.currencyKeyPath || ['currency']; // eslint-disable-line
              column.cell = function (rowIndex) {
                return valueRender(rowIndex, function (v) {
                  return formatCurrencyAmount(v, {
                    currency: _this2.props.data.getIn([rowIndex].concat(currencyKeyPath)),
                    decimals: col.valueOptions && col.valueOptions.decimals,
                    thousandSeparator: col.valueOptions && col.valueOptions.thousandSeparator || _this2.props.thousandSeparator, // eslint-disable-line
                    decimalSeparator: col.valueOptions && col.valueOptions.decimalSeparator || _this2.props.decimalSeparator // eslint-disable-line
                  });
                });
              };
              break;
            }
          case 'date':
            column.cell = function (rowIndex) {
              return valueRender(rowIndex, function (v) {
                if (moment(v, _this2.props.dateFormat, true).isValid()) {
                  return moment.utc(v, _this2.props.dateFormat).format(_this2.props.dateFormat);
                }
                if (moment(v).isValid()) {
                  return moment.utc(v).format(_this2.props.dateFormat);
                }
                return React.createElement(M, { id: 'Grid.InvalidDate' });
              });
            };
            break;
          case 'boolean':
            column.cell = function (rowIndex) {
              return valueRender(rowIndex, function (v) {
                return React.createElement(M, _extends({ id: v ? 'Grid.Yes' : 'Grid.No' }, col.renderComponentProps));
              });
            };
            break;
          default:
            column.cell = function (rowIndex) {
              return valueRender(rowIndex);
            };
        }
      }
      // Cell edit/create/filter component rendering
      if (col.cellEdit) {
        column.cellEdit = col.cellEdit;
      } else if (col.editValueRender) {
        column.cellEdit = function (rowIndex) {
          return col.editValueRender(_this2.props.data.get(rowIndex));
        };
      }
      if (col.cellCreate) {
        column.cellCreate = col.cellCreate;
      } else if (col.createValueRender) {
        column.cellCreate = function (rowIndex) {
          return col.createValueRender(_this2.props.data.get(rowIndex));
        };
      }
      if (col.cellFilter) {
        column.cellFilter = col.cellFilter;
      } else if (col.filterValueRender) {
        column.cellFilter = function (rowIndex) {
          return col.filterValueRender(_this2.props.data.get(rowIndex));
        };
      }
      if (col.componentType) {
        var editValueParser = function editValueParser(val) {
          return val;
        };
        switch (col.componentType) {
          case 'text':
            // TODO REFACTOR TO FUNCTION
            if (_this2.props.inlineEdit) {
              if (!column.cellEdit) {
                column.cellEdit = function (rowIndex) {
                  return React.createElement(FormControl, _extends({
                    type: 'text',
                    value: _this2.getEditItemValue(rowIndex, col),
                    onChange: _this2.onEditCellValueChange(rowIndex, col, editValueParser),
                    onBlur: _this2.onEditCellBlur(rowIndex, col),
                    onFocus: _this2.onCellFocus('edit', col.componentType, rowIndex, column.columnKey),
                    onKeyDown: _this2.onEditCellKeyDown(col, rowIndex),
                    inputRef: _this2.handleEditCellRef(rowIndex, col),
                    id: 'ocDatagridEditInput-' + _this2.props.grid.id + '-' + column.columnKey + '-' + rowIndex
                  }, col.editComponentProps, {
                    disabled: _this2.getComponentDisabledState(rowIndex, col, 'edit'),
                    style: column.style,
                    tabIndex: tabIndex
                  }));
                };
              }
              if (!column.cellCreate) {
                column.cellCreate = function (rowIndex) {
                  return React.createElement(FormControl, _extends({
                    type: 'text',
                    value: _this2.getCreateItemValue(rowIndex, col),
                    onChange: _this2.onCreateCellValueChange(rowIndex, col, editValueParser),
                    onBlur: _this2.onCreateCellBlur(rowIndex, col),
                    onKeyDown: _this2.onCreateCellKeyDown,
                    inputRef: _this2.handleCreateCellRef(rowIndex, col),
                    id: 'ocDatagridCreateInput-' + _this2.props.grid.id + '-' + column.columnKey + '-' + rowIndex
                  }, col.createComponentProps, {
                    disabled: _this2.getComponentDisabledState(rowIndex, col, 'create'),
                    style: column.style,
                    tabIndex: tabIndex
                  }));
                };
              }
            }
            if (_this2.props.filtering) {
              if (!column.cellFilter) {
                column.cellFilter = function () {
                  return React.createElement(FormControl, _extends({
                    type: 'text',
                    value: _this2.getFilterItemValue(col),
                    onChange: _this2.onFilterCellValueChange(col, editValueParser),
                    id: 'ocDatagridFilterInput-' + _this2.props.grid.id + '-' + column.columnKey
                  }, col.filterComponentProps, {
                    style: column.style,
                    tabIndex: tabIndex
                  }));
                };
              }
            }
            break;
          case 'number':
            if (_this2.props.inlineEdit) {
              if (!column.cellEdit) {
                column.cellEdit = function (rowIndex) {
                  return React.createElement(FormControl, _extends({
                    type: 'number',
                    value: _this2.getEditItemValue(rowIndex, col),
                    onChange: _this2.onEditCellValueChange(rowIndex, col, editValueParser),
                    onBlur: _this2.onEditCellBlur(rowIndex, col),
                    onFocus: _this2.onCellFocus('edit', col.componentType, rowIndex, column.columnKey),
                    onKeyDown: _this2.onEditCellKeyDown(col, rowIndex),
                    inputRef: _this2.handleEditCellRef(rowIndex, col),
                    id: 'ocDatagridEditInput-' + _this2.props.grid.id + '-' + column.columnKey + '-' + rowIndex
                  }, col.editComponentProps, {
                    disabled: _this2.getComponentDisabledState(rowIndex, col, 'edit'),
                    style: column.style,
                    tabIndex: tabIndex
                  }));
                };
              }
              if (!column.cellCreate) {
                column.cellCreate = function (rowIndex) {
                  return React.createElement(FormControl, _extends({
                    type: 'number',
                    value: _this2.getCreateItemValue(rowIndex, col),
                    onChange: _this2.onCreateCellValueChange(rowIndex, col, editValueParser),
                    onBlur: _this2.onCreateCellBlur(rowIndex, col),
                    onFocus: _this2.onCellFocus('create', 'number', rowIndex, column.columnKey),
                    onKeyDown: _this2.onCreateCellKeyDown,
                    inputRef: _this2.handleCreateCellRef(rowIndex, col),
                    id: 'ocDatagridCreateInput-' + _this2.props.grid.id + '-' + column.columnKey + '-' + rowIndex
                  }, col.createComponentProps, {
                    disabled: _this2.getComponentDisabledState(rowIndex, col, 'create'),
                    style: column.style,
                    tabIndex: tabIndex
                  }));
                };
              }
            }
            if (_this2.props.filtering) {
              if (!column.cellFilter) {
                column.cellFilter = function () {
                  return React.createElement(FormControl, _extends({
                    type: 'number',
                    value: _this2.getFilterItemValue(col),
                    onChange: _this2.onFilterCellValueChange(col, editValueParser),
                    id: 'ocDatagridFilterInput-' + _this2.props.grid.id + '-' + column.columnKey
                  }, col.filterComponentProps, {
                    style: column.style,
                    tabIndex: tabIndex
                  }));
                };
              }
            }
            break;
          case 'float':
            editValueParser = function editValueParser(val) {
              return val.replace(new RegExp('[^\\d' + _this2.props.decimalSeparator + '+-]', 'g'), '');
            };
            if (_this2.props.inlineEdit) {
              if (!column.cellEdit) {
                column.cellEdit = function (rowIndex) {
                  return React.createElement(FormControl, _extends({
                    type: 'text',
                    value: _this2.getEditItemValue(rowIndex, col),
                    onChange: _this2.onEditCellValueChange(rowIndex, col, editValueParser),
                    onBlur: _this2.onEditCellBlur(rowIndex, col, editValueParser),
                    onFocus: _this2.onCellFocus('edit', col.componentType, rowIndex, column.columnKey),
                    onKeyDown: _this2.onEditCellKeyDown(col, rowIndex),
                    inputRef: _this2.handleEditCellRef(rowIndex, col),
                    id: 'ocDatagridEditInput-' + _this2.props.grid.id + '-' + column.columnKey + '-' + rowIndex
                  }, col.editComponentProps, {
                    disabled: _this2.getComponentDisabledState(rowIndex, col, 'edit'),
                    style: column.style,
                    tabIndex: tabIndex
                  }));
                };
              }
              if (!column.cellCreate) {
                column.cellCreate = function (rowIndex) {
                  return React.createElement(FormControl, _extends({
                    type: 'text',
                    value: _this2.getCreateItemValue(rowIndex, col),
                    onChange: _this2.onCreateCellValueChange(rowIndex, col, editValueParser),
                    onBlur: _this2.onCreateCellBlur(rowIndex, col, editValueParser),
                    onKeyDown: _this2.onCreateCellKeyDown,
                    inputRef: _this2.handleCreateCellRef(rowIndex, col),
                    id: 'ocDatagridCreateInput-' + _this2.props.grid.id + '-' + column.columnKey + '-' + rowIndex
                  }, col.createComponentProps, {
                    disabled: _this2.getComponentDisabledState(rowIndex, col, 'create'),
                    style: column.style,
                    tabIndex: tabIndex
                  }));
                };
              }
            }
            if (_this2.props.filtering) {
              if (!column.cellFilter) {
                column.cellFilter = function () {
                  return React.createElement(FormControl, _extends({
                    type: 'text',
                    value: _this2.getFilterItemValue(col),
                    onChange: _this2.onFilterCellValueChange(col, editValueParser),
                    id: 'ocDatagridFilterInput-' + _this2.props.grid.id + '-' + column.columnKey
                  }, col.filterComponentProps, {
                    style: column.style,
                    tabIndex: tabIndex
                  }));
                };
              }
            }
            break;
          case 'select':
            {
              var intl = _this2.props.intl;

              var selectOptions = col.selectComponentOptions || _this2.props.selectComponentOptions.get(column.columnKey);
              var selectTranslations = col.selectComponentTranslations || {
                placeholder: intl.formatMessage({ id: 'Grid.FloatingSelect.Select' }),
                noResultsText: intl.formatMessage({ id: 'Grid.FloatingSelect.NoResults' })
              };
              if (_this2.props.inlineEdit) {
                if (!column.cellEdit) {
                  column.cellEdit = function (rowIndex) {
                    return React.createElement(FloatingSelect, _extends({
                      name: col.valueKeyPath.join() + '-edit-' + rowIndex,
                      options: col.editSelectOptionsMod && selectOptions ? col.editSelectOptionsMod(selectOptions.slice(), rowIndex, col) : selectOptions,
                      value: _this2.getEditItemValue(rowIndex, col),
                      onChange: _this2.onEditCellValueChange(rowIndex, col, editValueParser),
                      onBlur: _this2.onEditCellBlur(rowIndex, col),
                      onFocus: _this2.onCellFocus('edit', col.componentType, rowIndex, column.columnKey),
                      searchable: selectOptions && selectOptions.length > 9,
                      clearable: !col.isRequired,
                      backspaceRemoves: false,
                      tabSelectsValue: false,
                      openOnFocus: true,
                      ref: _this2.handleEditCellRef(rowIndex, col),
                      inputProps: {
                        id: 'ocDatagridEditInput-' + _this2.props.grid.id + '-' + column.columnKey + '-' + rowIndex
                      }
                    }, col.editComponentProps, {
                      disabled: _this2.getComponentDisabledState(rowIndex, col, 'edit'),
                      tabIndex: tabIndex
                    }, selectTranslations));
                  };
                }
                if (!column.cellCreate) {
                  column.cellCreate = function (rowIndex) {
                    return React.createElement(FloatingSelect, _extends({
                      name: col.valueKeyPath.join() + '-create-' + rowIndex,
                      options: col.createSelectOptionsMod && selectOptions ? col.createSelectOptionsMod(selectOptions.slice(), rowIndex, col) : selectOptions,
                      value: _this2.getCreateItemValue(rowIndex, col),
                      onChange: _this2.onCreateCellValueChange(rowIndex, col, editValueParser),
                      onBlur: _this2.onCreateCellBlur(rowIndex, col),
                      searchable: selectOptions && selectOptions.length > 9,
                      clearable: !col.isRequired,
                      backspaceRemoves: false,
                      tabSelectsValue: false,
                      openOnFocus: true,
                      ref: _this2.handleCreateCellRef(rowIndex, col),
                      inputProps: {
                        id: 'ocDatagridCreateInput-' + _this2.props.grid.id + '-' + column.columnKey + '-' + rowIndex
                      }
                    }, col.createComponentProps, {
                      disabled: _this2.getComponentDisabledState(rowIndex, col, 'create'),
                      tabIndex: tabIndex
                    }, selectTranslations));
                  };
                }
              }
              if (_this2.props.filtering) {
                if (!column.cellFilter) {
                  column.cellFilter = function () {
                    return React.createElement(FloatingSelect, _extends({
                      name: col.valueKeyPath.join() + '-filter',
                      options: col.filterSelectOptionsMod && selectOptions ? col.filterSelectOptionsMod(selectOptions.slice(), col) : selectOptions,
                      value: _this2.getFilterItemValue(col),
                      onChange: _this2.onFilterCellValueChange(col, editValueParser),
                      searchable: selectOptions && selectOptions.length > 9,
                      clearable: true,
                      tabSelectsValue: false,
                      openOnFocus: true,
                      inputProps: {
                        id: 'ocDatagridFilterInput-' + _this2.props.grid.id + '-' + column.columnKey
                      }
                    }, col.filterComponentProps, {
                      tabIndex: tabIndex
                    }, selectTranslations));
                  };
                }
              }
              break;
            }
          case 'date':
            {
              if (_this2.props.inlineEdit) {
                if (!column.cellEdit) {
                  column.cellEdit = function (rowIndex) {
                    return React.createElement(DateInput, _extends({
                      value: _this2.getEditItemValue(rowIndex, col),
                      onChange: _this2.onEditCellValueChange(rowIndex, col, editValueParser),
                      locale: _this2.props.language,
                      dateFormat: _this2.props.dateFormat,
                      inputRef: _this2.handleEditCellRef(rowIndex, col),
                      inputProps: {
                        tabIndex: tabIndex,
                        id: 'ocDatagridEditInput-' + _this2.props.grid.id + '-' + column.columnKey + '-' + rowIndex,
                        onKeyDown: _this2.onEditCellKeyDown(col, rowIndex),
                        onBlur: _this2.onEditCellBlur(rowIndex, col),
                        onFocus: _this2.onCellFocus('edit', col.componentType, rowIndex, column.columnKey),
                        style: column.style
                      }
                    }, col.editComponentProps, {
                      disabled: _this2.getComponentDisabledState(rowIndex, col, 'edit')
                    }));
                  };
                }
                if (!column.cellCreate) {
                  column.cellCreate = function (rowIndex) {
                    return React.createElement(DateInput, _extends({
                      value: _this2.getCreateItemValue(rowIndex, col),
                      onChange: _this2.onCreateCellValueChange(rowIndex, col, editValueParser),
                      onKeyDown: _this2.onCreateCellKeyDown,
                      locale: _this2.props.language,
                      dateFormat: _this2.props.dateFormat,
                      inputRef: _this2.handleCreateCellRef(rowIndex, col),
                      inputProps: {
                        tabIndex: tabIndex,
                        id: 'ocDatagridCreateInput-' + _this2.props.grid.id + '-' + column.columnKey + '-' + rowIndex,
                        style: column.style
                      }
                    }, col.createComponentProps, {
                      disabled: _this2.getComponentDisabledState(rowIndex, col, 'create')
                    }));
                  };
                }
              }
              if (_this2.props.filtering) {
                if (!column.cellFilter) {
                  column.cellFilter = function () {
                    return React.createElement(DateInput, _extends({
                      value: _this2.getFilterItemValue(col),
                      onChange: _this2.onFilterCellValueChange(col, editValueParser),
                      dateFormat: _this2.props.dateFormat,
                      locale: _this2.props.language,
                      inputProps: {
                        tabIndex: tabIndex,
                        id: 'ocDatagridFilterInput-' + _this2.props.grid.id + '-' + column.columnKey,
                        style: column.style
                      }
                    }, col.filterComponentProps));
                  };
                }
              }
              break;
            }
          case 'boolean':
            {
              var _intl = _this2.props.intl;

              var _selectOptions = [{ value: true, label: _intl.formatMessage({ id: 'Grid.Yes' }) }, { value: false, label: _intl.formatMessage({ id: 'Grid.No' }) }];

              var _selectTranslations = col.selectComponentTranslations || {
                placeholder: _intl.formatMessage({ id: 'Grid.FloatingSelect.Select' }),
                noResultsText: _intl.formatMessage({ id: 'Grid.FloatingSelect.NoResults' })
              };

              if (_this2.props.inlineEdit) {
                if (!column.cellEdit) {
                  column.cellEdit = function (rowIndex) {
                    return React.createElement(FloatingSelect, _extends({
                      name: col.valueKeyPath.join() + '-edit-' + rowIndex,
                      options: _selectOptions,
                      value: _this2.getEditItemValue(rowIndex, col),
                      onChange: _this2.onEditCellValueChange(rowIndex, col, editValueParser),
                      onBlur: _this2.onEditCellBlur(rowIndex, col),
                      onFocus: _this2.onCellFocus('edit', col.componentType, rowIndex, column.columnKey),
                      searchable: false,
                      clearable: !col.isRequired,
                      backspaceRemoves: false,
                      tabSelectsValue: false,
                      openOnFocus: true,
                      ref: _this2.handleEditCellRef(rowIndex, col),
                      inputProps: {
                        id: 'ocDatagridEditInput-' + _this2.props.grid.id + '-' + column.columnKey + '-' + rowIndex
                      }
                    }, col.editComponentProps, {
                      disabled: _this2.getComponentDisabledState(rowIndex, col, 'edit'),
                      tabIndex: tabIndex
                    }, _selectTranslations));
                  };
                }
                if (!column.cellCreate) {
                  column.cellCreate = function (rowIndex) {
                    return React.createElement(FloatingSelect, _extends({
                      name: col.valueKeyPath.join() + '-create-' + rowIndex,
                      options: _selectOptions,
                      value: _this2.getCreateItemValue(rowIndex, col),
                      onChange: _this2.onCreateCellValueChange(rowIndex, col, editValueParser),
                      onBlur: _this2.onCreateCellBlur(rowIndex, col),
                      searchable: false,
                      clearable: !col.isRequired,
                      backspaceRemoves: false,
                      tabSelectsValue: false,
                      openOnFocus: true,
                      ref: _this2.handleCreateCellRef(rowIndex, col),
                      inputProps: {
                        id: 'ocDatagridCreateInput-' + _this2.props.grid.id + '-' + column.columnKey + '-' + rowIndex
                      }
                    }, col.createComponentProps, {
                      disabled: _this2.getComponentDisabledState(rowIndex, col, 'create'),
                      tabIndex: tabIndex
                    }, _selectTranslations));
                  };
                }
              }
              if (_this2.props.filtering) {
                if (!column.cellFilter) {
                  column.cellFilter = function () {
                    return React.createElement(FloatingSelect, _extends({
                      name: col.valueKeyPath.join() + '-filter',
                      options: _selectOptions,
                      value: _this2.getFilterItemValue(col),
                      onChange: _this2.onFilterCellValueChange(col, editValueParser),
                      searchable: false,
                      clearable: true,
                      tabSelectsValue: false,
                      openOnFocus: true,
                      inputProps: {
                        id: 'ocDatagridFilterInput-' + _this2.props.grid.id + '-' + column.columnKey
                      }
                    }, col.filterComponentProps, {
                      tabIndex: tabIndex
                    }, _selectTranslations));
                  };
                }
              }
              break;
            }
          default:
        }
      }
      columns.push(column);
    });

    if (_this2.props.isCreating) {
      columns.push({
        width: 37,
        isResizable: false,
        columnKey: 'removeNewItem',
        cell: function cell() {
          return null;
        },
        cellEdit: function cellEdit() {
          return null;
        },
        cellCreate: function cellCreate(rowIndex) {
          return React.createElement(Icon, {
            id: 'oc-datagrid-new-item-remove-' + _this2.props.grid.id + '-' + rowIndex,
            type: 'indicator',
            name: 'delete',
            width: 30,
            height: 30,
            onClick: function onClick() {
              return _this2.props.removeNewItem(_this2.props.grid, rowIndex);
            }
          });
        },
        cellFilter: function cellFilter() {
          return null;
        }
      });
    }
    return columns;
  };

  this.isCellEdited = function (rowIndex, col, cellType) {
    if (cellType !== 'edit') {
      return false;
    }
    var id = _this2.getDataIdByRowIndex(rowIndex);
    if (_this2.props.editData.getIn([id].concat(col.valueKeyPath))) {
      return true;
    }
    return false;
  };

  this.handleAfterAddItem = function () {
    _this2.focusToCreateCell = true;
  };

  this.handleAfterEditPress = function () {
    if (_this2.props.selectedItems.size) {
      _this2.focusToEditCell = true;
      _this2.setState({
        currentRow: undefined
      });
    }
  };

  this.handleAfterValidationError = function () {
    _this2.focusToErrorCell = true;
  };

  this.handleRowClick = function (e, rowIndex) {
    if (_this2.props.rowSelect && !_this2.props.isCreating && !_this2.props.isEditing) {
      if (e.ctrlKey || e.shiftKey) {
        document.getSelection().removeAllRanges();
      }
      // don't trigger selection change on checkbox click
      if (e.target.type !== 'checkbox') {
        _this2.props.itemSelectionChange(_this2.props.grid, rowIndex, _this2.props.multiSelect && e.ctrlKey, _this2.props.multiSelect && e.shiftKey);
      }
    }
    if (_this2.props.onRowClick) {
      _this2.props.onRowClick(e, rowIndex, _this2.props.data.get(rowIndex));
    }
    return true;
  };

  this.renderCell = function (col) {
    return function (cellProps) {
      var _props2 = _this2.props,
          isCreating = _props2.isCreating,
          isEditing = _props2.isEditing,
          createData = _props2.createData,
          selectedCell = _props2.selectedCell;

      var rowIndex = cellProps.rowIndex,
          props = _objectWithoutProperties(cellProps, ['rowIndex']);

      var isCheckbox = _this2.isSelectionCheckbox(cellProps);
      var cell = void 0;
      var cellType = 'view';
      var extraRowCount = 0; // how many rows to ignore from top, new + filter rows
      if (isCreating) extraRowCount = createData.size;
      if (isCreating) {
        if (rowIndex <= extraRowCount - 1) {
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
        var getRowIndex = cellType === 'create' ? rowIndex : rowIndex - extraRowCount;
        var messageData = _this2.getCellMessages(getRowIndex, col, cellType);
        var isEdited = _this2.isCellEdited(getRowIndex, col, cellType);
        var className = selectedCell.get('rowIndex') === rowIndex && selectedCell.get('columnKey') === props.columnKey ? 'oc-datagrid-cell is-selected' : 'oc-datagrid-cell';
        return React.createElement(
          Cell,
          _extends({}, props, {
            className: className,
            style: col.style,
            onClick: _this2.handleCellSelect(cellType, rowIndex, props.columnKey)
          }),
          React.createElement(
            CellTooltip,
            {
              id: cellType + col.columnKey + (rowIndex - extraRowCount),
              isEdited: isEdited,
              isError: !!messageData.errorMessage,
              isWarning: !!messageData.warningMessage,
              infoMessage: messageData.infoMessage,
              errorMessage: messageData.errorMessage,
              warningMessage: messageData.warningMessage
            },
            cell
          )
        );
      }
      return React.createElement(
        Cell,
        _extends({}, props, { className: 'oc-datagrid-cell', style: col.style }),
        cell
      );
    };
  };

  this.renderColumns = function () {
    if (!_this2.props.allDataSize && !_this2.props.isBusy && !_this2.props.isCreating) {
      return React.createElement(Column, {
        columnKey: 'dataEmptyColumn',
        header: React.createElement(
          Cell,
          { style: { textAlign: 'center' } },
          React.createElement(M, { id: 'Grid.NoItems' })
        ),
        width: 10,
        isResizable: false,
        flexGrow: 1
      });
    }
    if (!_this2.props.visibleColumns.size) {
      if (_this2.props.isBusy) {
        return React.createElement(Column, {
          columnKey: 'dataEmptyColumn',
          header: React.createElement(
            Cell,
            null,
            '\xA0'
          ),
          width: 10,
          isResizable: false,
          flexGrow: 1
        });
      }
      return React.createElement(Column, {
        columnKey: 'dataEmptyColumn',
        header: React.createElement(
          Cell,
          { style: { textAlign: 'center' } },
          React.createElement(M, { id: 'Grid.NoColumns' })
        ),
        width: 10,
        isResizable: false,
        flexGrow: 1
      });
    }
    var columns = _this2.generateColumns();
    if (columns.lenght === 0) return null;
    return columns.map(function (col) {
      return React.createElement(Column, {
        key: col.columnKey,
        columnKey: col.columnKey,
        header: React.createElement(
          HeaderCell,
          {
            grid: _this2.props.grid,
            columns: _this2.props.columns,
            column: col,
            currentSortColumn: _this2.props.sortColumn,
            currentSortOrder: _this2.props.sortOrder,
            onSortChange: _this2.props.sortChange,
            isBusy: _this2.props.isBusy,
            filtering: _this2.props.isFiltering
          },
          col.header
        ),
        cell: _this2.renderCell(col),
        width: _this2.props.columnWidths.get(col.columnKey, col.width),
        minWidth: col.minWidth,
        maxWidth: col.maxWidth,
        isResizable: col.isResizable,
        flexGrow: col.flexGrow ? col.flexGrow : 0,
        fixed: col.fixed,
        allowCellsRecycling: col.allowCellsRecycling
      });
    });
  };
}, _temp)) || _class) || _class);
export { DataGrid as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiTWFwIiwiTGlzdCIsImNvbm5lY3QiLCJpbmplY3RJbnRsIiwiRm9ybWF0dGVkTWVzc2FnZSIsIk0iLCJGb3JtYXR0ZWROdW1iZXIiLCJOIiwiQ29sdW1uIiwiQ2VsbCIsIkNoZWNrYm94IiwiRm9ybUNvbnRyb2wiLCJjbGFzc05hbWVzIiwibW9tZW50IiwiRmxvYXRpbmdTZWxlY3QiLCJEYXRlSW5wdXQiLCJJY29uIiwiU3Bpbm5lciIsImZvcm1hdEN1cnJlbmN5QW1vdW50IiwiUmVzcG9uc2l2ZUZpeGVkRGF0YVRhYmxlIiwiSGVhZGVyQ2VsbCIsIkFjdGlvbkJhciIsIklubGluZUVkaXRDb250cm9scyIsIkZpbHRlcmluZ0NvbnRyb2xzIiwiRHJvcGRvd25Db250cm9scyIsImRhdGFncmlkQWN0aW9ucyIsIkNlbGxUb29sdGlwIiwiQ29sdW1uU2V0dGluZ3NNb2RhbCIsInByb3BUeXBlcyIsImRlZmF1bHRQcm9wcyIsIktFWV9DT0RFUyIsIlV0aWxzIiwibWFwU3RhdGVUb1Byb3BzIiwic3RhdGUiLCJvd25Qcm9wcyIsIkdSSUQiLCJncmlkIiwiaXNCdXN5IiwiZGF0YWdyaWQiLCJnZXRJbiIsImlkIiwiaXNFZGl0aW5nIiwiaXNDcmVhdGluZyIsImlzRmlsdGVyaW5nIiwiaXNDb2x1bW5TZXR0aW5nc01vZGFsT3BlbiIsInNvcnRDb2x1bW4iLCJzb3J0T3JkZXIiLCJ2aXNpYmxlQ29sdW1ucyIsImNvbHVtbldpZHRocyIsInNlbGVjdGVkQ2VsbCIsInNlbGVjdGVkSXRlbXMiLCJkYXRhIiwiZWRpdERhdGEiLCJjcmVhdGVEYXRhIiwiZmlsdGVyRGF0YSIsImNlbGxNZXNzYWdlcyIsImNyZWF0ZUNlbGxNZXNzYWdlcyIsImFsbERhdGFTaXplIiwic2l6ZSIsImxhbmd1YWdlIiwiZ2V0TGFuZ3VhZ2UiLCJ1c2VyIiwiZGF0ZUZvcm1hdCIsImdldERhdGVGb3JtYXQiLCJ0aG91c2FuZFNlcGFyYXRvciIsImdldFRob3VzYW5kU2VwYXJhdG9yIiwiZGVjaW1hbFNlcGFyYXRvciIsImdldERlY2ltYWxTZXBhcmF0b3IiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJEYXRhR3JpZCIsInByb3BzIiwiY3VycmVudFJvdyIsImN1cnJlbnRDb2x1bW4iLCJjZWxsUmVmcyIsImZvY3VzVG9DcmVhdGVDZWxsIiwiZm9jdXNUb0VkaXRDZWxsIiwiZm9jdXNUb0Vycm9yQ2VsbCIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwiaW52YWxpZGF0ZSIsImlzU2VsZWN0aW9uQ2hlY2tib3giLCJjZWxsUHJvcHMiLCJleHBlY3RlZENvbHVtbktleSIsInJvd1NlbGVjdENoZWNrYm94Q29sdW1uIiwiY29sdW1uS2V5IiwicmVuZGVyIiwiZ3JpZENsYXNzTmFtZSIsImlubGluZUVkaXQiLCJkaXNhYmxlQWN0aW9uQmFyIiwiYWN0aW9uQmFyIiwiYWN0aW9uQmFyUmlnaHQiLCJhY3Rpb25CYXJMZWZ0IiwiZmlsdGVyaW5nIiwicmVtb3ZpbmciLCJkaXNhYmxlRHJvcGRvd24iLCJkaXNhYmxlRmlsdGVyaW5nQ29udHJvbHMiLCJoYW5kbGVBZnRlckFkZEl0ZW0iLCJoYW5kbGVBZnRlckVkaXRQcmVzcyIsImhhbmRsZUFmdGVyVmFsaWRhdGlvbkVycm9yIiwiZHJvcGRvd25NZW51SXRlbXMiLCJjb2x1bW5TZXR0aW5ncyIsImdyaWRIZWFkZXIiLCJyb3dzQ291bnQiLCJjb250YWluZXJTdHlsZSIsImhlYWRlckhlaWdodCIsImZpbHRlclJvd0hlaWdodCIsInJvd0hlaWdodCIsIm9uQ29sdW1uUmVzaXplRW5kQ2FsbGJhY2siLCJoYW5kbGVSb3dDbGljayIsInNjcm9sbFRvQ29sdW1uIiwic2Nyb2xsVG9wIiwiZ2V0U2Nyb2xsVG9Sb3ciLCJvblJvd0RvdWJsZUNsaWNrIiwib25Sb3dNb3VzZURvd24iLCJvblJvd01vdXNlRW50ZXIiLCJvblJvd01vdXNlTGVhdmUiLCJvblNjcm9sbFN0YXJ0Iiwib25TY3JvbGxFbmQiLCJnZXRSb3dDbGFzc05hbWUiLCJyb3dIZWlnaHRHZXR0ZXIiLCJvbkNvbnRlbnRIZWlnaHRDaGFuZ2UiLCJyZW5kZXJDb2x1bW5zIiwiY29sdW1ucyIsImNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbCIsInNhdmVDb2x1bW5TZXR0aW5ncyIsImNoaWxkcmVuIiwiUHVyZUNvbXBvbmVudCIsIm5ld0NvbHVtbldpZHRoIiwicmVzaXplQ29sdW1uIiwib25DcmVhdGVDZWxsS2V5RG93biIsImUiLCJrZXlDb2RlIiwiRU5URVIiLCJhZGROZXdJdGVtIiwiZ2V0Q29sdW1uRGVmYXVsdFZhbHVlcyIsIm9uRWRpdENlbGxLZXlEb3duIiwiY29sIiwicm93SW5kZXgiLCJlbmFibGVBcnJvd05hdmlnYXRpb24iLCJyb3dzU2l6ZSIsImdldENvbHVtbktleSIsIkRPV04iLCJ2YWx1ZVR5cGUiLCJuZXh0RWxlbWVudCIsIm1vdmVDZWxsRm9jdXMiLCJVUCIsIlRBQiIsIlJJR0hUIiwiTEVGVCIsInByZXZlbnREZWZhdWx0IiwiY29sdW1uSW5kIiwiZmluZEluZGV4IiwiYyIsInZhbHVlS2V5UGF0aCIsImpvaW4iLCJkaXNhYmxlZCIsInJvd0luZCIsInNoaWZ0S2V5IiwibGVuZ3RoIiwibmV4dENvbHVtbktleSIsIm9uRmlsdGVyQ2VsbFZhbHVlQ2hhbmdlIiwidmFsdWVQYXJzZXIiLCJldmVudE9yRGF0YSIsInJhd1ZhbHVlIiwidGFyZ2V0IiwidW5kZWZpbmVkIiwidmFsdWUiLCJmaWx0ZXJDZWxsVmFsdWVDaGFuZ2UiLCJvbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSIsImNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSIsIm9uQ3JlYXRlVmFsdWVDaGFuZ2UiLCJvblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZSIsIm1hdGNoVmFsdWUiLCJuZXdWYWx1ZUtleVBhdGgiLCJ2IiwibmV3VmFsdWUiLCJ2YWxpZGF0b3JzIiwiY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUiLCJvbkVkaXRDZWxsVmFsdWVDaGFuZ2UiLCJkYXRhSWQiLCJnZXREYXRhSWRCeVJvd0luZGV4IiwiZWRpdENlbGxWYWx1ZUNoYW5nZSIsIm9uRWRpdFZhbHVlQ2hhbmdlIiwiZWRpdENlbGxWYWx1ZVZhbGlkYXRlIiwib25DcmVhdGVDZWxsQmx1ciIsIm9uQ3JlYXRlQmx1ciIsImdldEVkaXRJdGVtVmFsdWUiLCJvbkVkaXRDZWxsQmx1ciIsIm9uRWRpdEJsdXIiLCJvbkNlbGxGb2N1cyIsImNlbGxUeXBlIiwiaW5wdXRUeXBlIiwic2VsZWN0IiwiY2VsbFNlbGVjdCIsImNlbGxTZWxlY3Rpb25DaGFuZ2UiLCJpZEtleVBhdGgiLCJnZXRTZWxlY3RlZEl0ZW1JbmRleCIsImluZGV4IiwiZWRpdFZhbHVlIiwib3JpZ2luYWxWYWx1ZSIsImNvbXBvbmVudFR5cGUiLCJTdHJpbmciLCJyZXBsYWNlIiwiZ2V0Q3JlYXRlSXRlbVZhbHVlIiwidmFsIiwiZ2V0RmlsdGVySXRlbVZhbHVlIiwiZ2V0IiwiZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZSIsIm1vZGUiLCJjb21wb25lbnREaXNhYmxlZCIsImRpc2FibGVFZGl0aW5nIiwiZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2giLCJtYXRjaFZhbHVlS2V5UGF0aCIsInJvd0NsYXNzTmFtZXMiLCJleHRyYVJvd0NvdW50IiwicHVzaCIsImluZGV4T2YiLCJyb3dDbGFzc05hbWVHZXR0ZXIiLCJnZXRDZWxsTWVzc2FnZXMiLCJyZXR1cm5EYXRhIiwiaW5mb01lc3NhZ2UiLCJlcnJvck1lc3NhZ2UiLCJ3YXJuaW5nTWVzc2FnZSIsInNjcm9sbFRvUm93Iiwic2Nyb2xsTmV3Um93IiwiZmlyc3QiLCJoYW5kbGVDZWxsU2VsZWN0IiwiaGFuZGxlQ3JlYXRlQ2VsbFJlZiIsInJlZiIsImZvY3VzIiwiaGFuZGxlRWRpdENlbGxSZWYiLCJzZWxlY3RlZFJvd0luZGV4IiwiY29sdW1uSW5kZXgiLCJ0eXBlIiwic2V0U3RhdGUiLCJzZXRUaW1lb3V0IiwiaGFuZGxlU2VsZWN0aW9uQ2hlY2tCb3hPbkNoYW5nZSIsIml0ZW1TZWxlY3Rpb25DaGFuZ2UiLCJnZW5lcmF0ZUNvbHVtbnMiLCJ0YWJJbmRleCIsIndpZHRoIiwiaXNSZXNpemFibGUiLCJjZWxsIiwicm93SXRlbSIsIml0ZW1JZCIsInNlbGVjdGVkIiwiaW5jbHVkZXMiLCJjZWxsRWRpdCIsImNlbGxDcmVhdGUiLCJjZWxsRmlsdGVyIiwiZm9yRWFjaCIsInZpc2libGVDb2x1bW5LZXkiLCJvcmdDb2wiLCJjb2x1bW4iLCJoZWFkZXIiLCJtaW5XaWR0aCIsIm1heFdpZHRoIiwiZGlzYWJsZVJlc2l6aW5nIiwiZml4ZWQiLCJhbGxvd0NlbGxzUmVjeWNsaW5nIiwiZGlzYWJsZVNvcnRpbmciLCJpc1JlcXVpcmVkIiwic3R5bGUiLCJnZXRDZWxsU3R5bGVCeUNvbCIsImZsZXhHcm93Iiwic29ydENvbXBhcmF0b3IiLCJzb3J0VmFsdWVHZXR0ZXIiLCJ2YWx1ZUVtcHR5Q2hlY2tlciIsImdldFZhbHVlRW1wdHlDaGVja2VyIiwidmFsdWVSZW5kZXIiLCJmb3JtYXQiLCJyZW5kZXJDb21wb25lbnRQcm9wcyIsImN1cnJlbmN5S2V5UGF0aCIsInZhbHVlT3B0aW9ucyIsImN1cnJlbmN5IiwiZGVjaW1hbHMiLCJpc1ZhbGlkIiwidXRjIiwiZWRpdFZhbHVlUmVuZGVyIiwiY3JlYXRlVmFsdWVSZW5kZXIiLCJmaWx0ZXJWYWx1ZVJlbmRlciIsImVkaXRWYWx1ZVBhcnNlciIsImVkaXRDb21wb25lbnRQcm9wcyIsImNyZWF0ZUNvbXBvbmVudFByb3BzIiwiZmlsdGVyQ29tcG9uZW50UHJvcHMiLCJSZWdFeHAiLCJpbnRsIiwic2VsZWN0T3B0aW9ucyIsInNlbGVjdENvbXBvbmVudE9wdGlvbnMiLCJzZWxlY3RUcmFuc2xhdGlvbnMiLCJzZWxlY3RDb21wb25lbnRUcmFuc2xhdGlvbnMiLCJwbGFjZWhvbGRlciIsImZvcm1hdE1lc3NhZ2UiLCJub1Jlc3VsdHNUZXh0IiwiZWRpdFNlbGVjdE9wdGlvbnNNb2QiLCJzbGljZSIsImNyZWF0ZVNlbGVjdE9wdGlvbnNNb2QiLCJmaWx0ZXJTZWxlY3RPcHRpb25zTW9kIiwib25LZXlEb3duIiwib25CbHVyIiwib25Gb2N1cyIsImxhYmVsIiwicmVtb3ZlTmV3SXRlbSIsImlzQ2VsbEVkaXRlZCIsInJvd1NlbGVjdCIsImN0cmxLZXkiLCJkb2N1bWVudCIsImdldFNlbGVjdGlvbiIsInJlbW92ZUFsbFJhbmdlcyIsIm11bHRpU2VsZWN0Iiwib25Sb3dDbGljayIsInJlbmRlckNlbGwiLCJpc0NoZWNrYm94IiwiZ2V0Um93SW5kZXgiLCJtZXNzYWdlRGF0YSIsImlzRWRpdGVkIiwiY2xhc3NOYW1lIiwidGV4dEFsaWduIiwibGVuZ2h0IiwibWFwIiwic29ydENoYW5nZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsU0FBU0MsR0FBVCxFQUFjQyxJQUFkLFFBQTBCLFdBQTFCO0FBQ0EsU0FBU0MsT0FBVCxRQUF3QixhQUF4QjtBQUNBLFNBQ0VDLFVBREYsRUFFRUMsb0JBQW9CQyxDQUZ0QixFQUdFQyxtQkFBbUJDLENBSHJCLFFBSU8sWUFKUDtBQUtBLFNBQVNDLE1BQVQsRUFBaUJDLElBQWpCLFFBQTZCLG9CQUE3QjtBQUNBLFNBQVNDLFFBQVQsRUFBbUJDLFdBQW5CLFFBQXNDLGlCQUF0QztBQUNBLE9BQU9DLFVBQVAsTUFBdUIsWUFBdkI7QUFDQSxPQUFPQyxNQUFQLE1BQW1CLFFBQW5CO0FBQ0EsU0FBU0MsY0FBVCxRQUErQixtQ0FBL0I7QUFDQSxTQUFTQyxTQUFULFFBQTBCLDRCQUExQjtBQUNBLFNBQVNDLElBQVQsUUFBcUIseUJBQXJCO0FBQ0EsU0FBU0MsT0FBVCxRQUF3QiwyQkFBeEI7QUFDQSxTQUFTQyxvQkFBVCxRQUFxQywwQkFBckM7QUFDQSxPQUFPLDhDQUFQOztBQUVBLE9BQU9DLHdCQUFQLE1BQXFDLHlDQUFyQztBQUNBLE9BQU9DLFVBQVAsTUFBdUIseUJBQXZCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQix3QkFBdEI7QUFD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TUFQckI7QUFRRSx1QkFBVyxPQUFLaUMsS0FBTCxDQUFXM0I7QUFSeEI7QUFVRzRGLGNBQUlzSDtBQVZQLFNBSko7QUFpQkUsY0FBTSxPQUFLeUQsVUFBTCxDQUFnQi9LLEdBQWhCLENBakJSO0FBa0JFLGVBQU8sT0FBS2pFLEtBQUwsQ0FBV3RCLFlBQVgsQ0FBd0I2SixHQUF4QixDQUE0QnRFLElBQUlwRCxTQUFoQyxFQUEyQ29ELElBQUl3RyxLQUEvQyxDQWxCVDtBQW1CRSxrQkFBVXhHLElBQUl1SCxRQW5CaEI7QUFvQkUsa0JBQVV2SCxJQUFJd0gsUUFwQmhCO0FBcUJFLHFCQUFheEgsSUFBSXlHLFdBckJuQjtBQXNCRSxrQkFBVXpHLElBQUlnSSxRQUFKLEdBQWVoSSxJQUFJZ0ksUUFBbkIsR0FBOEIsQ0F0QjFDO0FBdUJFLGVBQU9oSSxJQUFJMEgsS0F2QmI7QUF3QkUsNkJBQXFCMUgsSUFBSTJIO0FBeEIzQixRQURpQjtBQUFBLEtBQVosQ0FBUDtBQTJCRCxHOztTQTdwQ2tCN0wsUSIsImZpbGUiOiJkYXRhZ3JpZC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1sb25lbHktaWYsIHByZWZlci10ZW1wbGF0ZSwgcmVhY3QvcmVxdWlyZS1kZWZhdWx0LXByb3BzICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTWFwLCBMaXN0IH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge1xuICBpbmplY3RJbnRsLFxuICBGb3JtYXR0ZWRNZXNzYWdlIGFzIE0sXG4gIEZvcm1hdHRlZE51bWJlciBhcyBOLFxufSBmcm9tICdyZWFjdC1pbnRsJztcbmltcG9ydCB7IENvbHVtbiwgQ2VsbCB9IGZyb20gJ2ZpeGVkLWRhdGEtdGFibGUtMic7XG5pbXBvcnQgeyBDaGVja2JveCwgRm9ybUNvbnRyb2wgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBGbG9hdGluZ1NlbGVjdCB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWZsb2F0aW5nLXNlbGVjdCc7XG5pbXBvcnQgeyBEYXRlSW5wdXQgfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1kYXRldGltZSc7XG5pbXBvcnQgeyBJY29uIH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtaWNvbnMnO1xuaW1wb3J0IHsgU3Bpbm5lciB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXNwaW5uZXInO1xuaW1wb3J0IHsgZm9ybWF0Q3VycmVuY3lBbW91bnQgfSBmcm9tICdAb3B1c2NhcGl0YS9mb3JtYXQtdXRpbHMnO1xuaW1wb3J0ICdmaXhlZC1kYXRhLXRhYmxlLTIvZGlzdC9maXhlZC1kYXRhLXRhYmxlLmNzcyc7XG5cbmltcG9ydCBSZXNwb25zaXZlRml4ZWREYXRhVGFibGUgZnJvbSAnLi9yZXNwb25zaXZlLWZpeGVkLWRhdGEtdGFibGUuY29tcG9uZW50JztcbmltcG9ydCBIZWFkZXJDZWxsIGZyb20gJy4vaGVhZGVyLWNlbGwuY29tcG9uZW50JztcbmltcG9ydCBBY3Rpb25CYXIgZnJvbSAnLi9hY3Rpb24tYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgSW5saW5lRWRpdENvbnRyb2xzIGZyb20gJy4vaW5saW5lLWVkaXQtY29udHJvbHMuY29tcG9uZW50JztcbmltcG9ydCBGaWx0ZXJpbmdDb250cm9scyBmcm9tICcuL2ZpbHRlcmluZy1jb250cm9scy5jb21wb25lbnQnO1xuaW1wb3J0IERyb3Bkb3duQ29udHJvbHMgZnJvbSAnLi9kcm9wZG93bi1jb250cm9scy5jb21wb25lbnQnO1xuaW1wb3J0ICogYXMgZGF0YWdyaWRBY3Rpb25zIGZyb20gJy4vZGF0YWdyaWQuYWN0aW9ucyc7XG5pbXBvcnQgQ2VsbFRvb2x0aXAgZnJvbSAnLi9jZWxsLXRvb2x0aXAuY29tcG9uZW50JztcbmltcG9ydCBDb2x1bW5TZXR0aW5nc01vZGFsIGZyb20gJy4vY29sdW1uLXNldHRpbmdzL2NvbHVtbi1zZXR0aW5ncy5jb21wb25lbnQnO1xuaW1wb3J0IHsgcHJvcFR5cGVzLCBkZWZhdWx0UHJvcHMgfSBmcm9tICcuL2RhdGFncmlkLnByb3BzJztcbmltcG9ydCB7IEtFWV9DT0RFUyB9IGZyb20gJy4vZGF0YWdyaWQuY29uc3RhbnRzJztcbmltcG9ydCBVdGlscyBmcm9tICcuL2RhdGFncmlkLnV0aWxzJztcbmltcG9ydCAnLi9kYXRhZ3JpZC5jb21wb25lbnQuc2Nzcyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSwgb3duUHJvcHMpID0+IHtcbiAgY29uc3QgR1JJRCA9IG93blByb3BzLmdyaWQ7XG4gIHJldHVybiB7XG4gICAgaXNCdXN5OiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnaXNCdXN5J10sIHRydWUpLFxuICAgIGlzRWRpdGluZzogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2lzRWRpdGluZyddLCBmYWxzZSksXG4gICAgaXNDcmVhdGluZzogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2lzQ3JlYXRpbmcnXSwgZmFsc2UpLFxuICAgIGlzRmlsdGVyaW5nOlxuICAgICAgc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdpc0ZpbHRlcmluZyddLCBmYWxzZSksXG4gICAgaXNDb2x1bW5TZXR0aW5nc01vZGFsT3BlbjpcbiAgICAgIHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdjb2x1bW5TZXR0aW5nc01vZGFsJywgJ29wZW4nXSwgZmFsc2UpLFxuICAgIHNvcnRDb2x1bW46IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ3NvcnRpbmdEYXRhJywgJ3NvcnRDb2x1bW4nXSwgbnVsbCksXG4gICAgc29ydE9yZGVyOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdzb3J0aW5nRGF0YScsICdzb3J0T3JkZXInXSwgbnVsbCksXG4gICAgdmlzaWJsZUNvbHVtbnM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ3Zpc2libGVDb2x1bW5zJ10sIExpc3QoKSksXG4gICAgY29sdW1uV2lkdGhzOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdjb2x1bW5XaWR0aHMnXSwgTWFwKCkpLFxuICAgIHNlbGVjdGVkQ2VsbDogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZWxlY3RlZENlbGwnXSwgTWFwKCkpLFxuICAgIHNlbGVjdGVkSXRlbXM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2VsZWN0ZWRJdGVtcyddLCBMaXN0KCkpLFxuICAgIGRhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnZGF0YSddLCBMaXN0KCkpLFxuICAgIGVkaXREYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2VkaXREYXRhJ10sIE1hcCgpKSxcbiAgICBjcmVhdGVEYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NyZWF0ZURhdGEnXSwgTGlzdCgpKSxcbiAgICBmaWx0ZXJEYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2ZpbHRlckRhdGEnXSwgTWFwKCkpLFxuICAgIGNlbGxNZXNzYWdlczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjZWxsTWVzc2FnZXMnXSwgTWFwKCkpLFxuICAgIGNyZWF0ZUNlbGxNZXNzYWdlczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjcmVhdGVDZWxsTWVzc2FnZXMnXSwgTWFwKCkpLFxuICAgIGFsbERhdGFTaXplOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2FsbERhdGEnXSwgTGlzdCgpKS5zaXplLFxuICAgIGxhbmd1YWdlOiBVdGlscy5nZXRMYW5ndWFnZShHUklELCBzdGF0ZS51c2VyKSxcbiAgICBkYXRlRm9ybWF0OiBVdGlscy5nZXREYXRlRm9ybWF0KEdSSUQsIHN0YXRlLnVzZXIpLFxuICAgIHRob3VzYW5kU2VwYXJhdG9yOiBVdGlscy5nZXRUaG91c2FuZFNlcGFyYXRvcihHUklELCBzdGF0ZS51c2VyKSxcbiAgICBkZWNpbWFsU2VwYXJhdG9yOiBVdGlscy5nZXREZWNpbWFsU2VwYXJhdG9yKEdSSUQsIHN0YXRlLnVzZXIpLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGF0YWdyaWRBY3Rpb25zO1xuXG5AaW5qZWN0SW50bFxuQGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRhR3JpZCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0gcHJvcFR5cGVzO1xuICBzdGF0aWMgZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7IGN1cnJlbnRSb3c6IDAsIGN1cnJlbnRDb2x1bW46IDAgfTtcbiAgICB0aGlzLmNlbGxSZWZzID0ge307XG4gICAgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCA9IGZhbHNlO1xuICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gZmFsc2U7IC8vIFRPRE86IEhhbmRsZSBmb2N1c2luZyB3aGVuIHRydWVcbiAgICB0aGlzLmZvY3VzVG9FcnJvckNlbGwgPSBmYWxzZTsgLy8gVE9ETzogSGFuZGxlIGZvY3VzaW5nIHdoZW4gdHJ1ZVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy5wcm9wcy5pbnZhbGlkYXRlKHRoaXMucHJvcHMuZ3JpZCk7XG4gIH1cblxuICBvbkNvbHVtblJlc2l6ZUVuZENhbGxiYWNrID0gKG5ld0NvbHVtbldpZHRoLCBjb2x1bW5LZXkpID0+IHtcbiAgICB0aGlzLnByb3BzLnJlc2l6ZUNvbHVtbih0aGlzLnByb3BzLmdyaWQsIGNvbHVtbktleSwgbmV3Q29sdW1uV2lkdGgpO1xuICB9XG5cbiAgb25DcmVhdGVDZWxsS2V5RG93biA9IChlKSA9PiB7XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLkVOVEVSKSB7XG4gICAgICB0aGlzLnByb3BzLmFkZE5ld0l0ZW0odGhpcy5wcm9wcy5ncmlkLCBVdGlscy5nZXRDb2x1bW5EZWZhdWx0VmFsdWVzKHRoaXMucHJvcHMuY29sdW1ucykpO1xuICAgICAgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgb25FZGl0Q2VsbEtleURvd24gPSAoY29sLCByb3dJbmRleCkgPT4gKGUpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5lbmFibGVBcnJvd05hdmlnYXRpb24pIHtcbiAgICAgIGNvbnN0IHsgY29sdW1ucyB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IHJvd3NTaXplID0gdGhpcy5wcm9wcy5kYXRhLnNpemU7XG4gICAgICBjb25zdCBjb2x1bW5LZXkgPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sKTtcbiAgICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLkRPV046IHtcbiAgICAgICAgICBpZiAoY29sLnZhbHVlVHlwZSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGNvbnN0IG5leHRFbGVtZW50ID0gdGhpcy5jZWxsUmVmc1tgJHt0aGlzLnByb3BzLmdyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4ICsgMX1gXTtcbiAgICAgICAgICAgIHRoaXMubW92ZUNlbGxGb2N1cyhuZXh0RWxlbWVudCwgcm93SW5kZXggKyAxLCAtMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLlVQOiB7XG4gICAgICAgICAgaWYgKGNvbC52YWx1ZVR5cGUgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBjb25zdCBuZXh0RWxlbWVudCA9IHRoaXMuY2VsbFJlZnNbYCR7dGhpcy5wcm9wcy5ncmlkLmlkfV8ke2NvbHVtbktleX1fJHtyb3dJbmRleCAtIDF9YF07XG4gICAgICAgICAgICB0aGlzLm1vdmVDZWxsRm9jdXMobmV4dEVsZW1lbnQsIHJvd0luZGV4IC0gMSwgLTEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5UQUI6XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLlJJR0hUOlxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5MRUZUOiB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGxldCBjb2x1bW5JbmQgPSBjb2x1bW5zLmZpbmRJbmRleChjID0+IGMudmFsdWVLZXlQYXRoLmpvaW4oKSA9PT0gY29sdW1uS2V5KTtcbiAgICAgICAgICBpZiAoY29sdW1uSW5kICE9PSAtMSkge1xuICAgICAgICAgICAgbGV0IGRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCBuZXh0RWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICBsZXQgcm93SW5kID0gcm93SW5kZXg7XG4gICAgICAgICAgICB3aGlsZSAoZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLkxFRlQgfHwgKGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLlRBQiAmJiBlLnNoaWZ0S2V5KSkge1xuICAgICAgICAgICAgICAgIGlmIChjb2x1bW5JbmQgLSAxID49IDApIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCAtPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm93SW5kIC0gMSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgPSBjb2x1bW5zLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgICByb3dJbmQgLT0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChjb2x1bW5JbmQgKyAxIDwgY29sdW1ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCArPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm93SW5kICsgMSA8IHJvd3NTaXplKSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgPSAwO1xuICAgICAgICAgICAgICAgICAgcm93SW5kICs9IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb25zdCBuZXh0Q29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbHVtbnNbY29sdW1uSW5kXSk7XG4gICAgICAgICAgICAgIG5leHRFbGVtZW50ID0gdGhpcy5jZWxsUmVmc1tgJHt0aGlzLnByb3BzLmdyaWQuaWR9XyR7bmV4dENvbHVtbktleX1fJHtyb3dJbmR9YF07XG4gICAgICAgICAgICAgIGRpc2FibGVkID0gbmV4dEVsZW1lbnQgPyBuZXh0RWxlbWVudC5kaXNhYmxlZCA6IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFkaXNhYmxlZCAmJiBuZXh0RWxlbWVudCkge1xuICAgICAgICAgICAgICB0aGlzLm1vdmVDZWxsRm9jdXMobmV4dEVsZW1lbnQsIHJvd0luZCwgY29sdW1uSW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbkZpbHRlckNlbGxWYWx1ZUNoYW5nZSA9IChjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZXZlbnRPckRhdGEpID0+IHtcbiAgICBsZXQgcmF3VmFsdWU7XG4gICAgLy8gZXZlbnRPckRhdGEgY2FuIGJlIGlucHV0IG9uQ2hhbmdlIGV2ZW50LCByZWFjdC1zZWxlY3Qgb25DaGFuZ2Ugb3IgcmVhY3QtZGF5LXBpY2tlciBvbkNoYW5nZVxuICAgIGlmIChldmVudE9yRGF0YSkge1xuICAgICAgaWYgKGV2ZW50T3JEYXRhLnRhcmdldCAhPT0gdW5kZWZpbmVkKSByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZTtcbiAgICAgIGVsc2UgaWYgKGV2ZW50T3JEYXRhLnZhbHVlICE9PSB1bmRlZmluZWQpIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudmFsdWU7XG4gICAgICBlbHNlIHJhd1ZhbHVlID0gZXZlbnRPckRhdGE7XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlID0gdmFsdWVQYXJzZXIocmF3VmFsdWUpO1xuICAgIHRoaXMucHJvcHMuZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlKFxuICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgdGhpcy5wcm9wcy5jb2x1bW5zLFxuICAgICAgY29sLFxuICAgICAgdmFsdWUsXG4gICAgKTtcbiAgfVxuXG4gIG9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlID0gKHJvd0luZGV4LCBjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZXZlbnRPckRhdGEpID0+IHtcbiAgICBsZXQgcmF3VmFsdWU7XG4gICAgLy8gZXZlbnRPckRhdGEgY2FuIGJlIGlucHV0IG9uQ2hhbmdlIGV2ZW50LCByZWFjdC1zZWxlY3Qgb25DaGFuZ2Ugb3IgcmVhY3QtZGF5LXBpY2tlciBvbkNoYW5nZVxuICAgIGlmIChldmVudE9yRGF0YSkge1xuICAgICAgaWYgKGV2ZW50T3JEYXRhLnRhcmdldCAhPT0gdW5kZWZpbmVkKSByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZTtcbiAgICAgIGVsc2UgaWYgKGV2ZW50T3JEYXRhLnZhbHVlICE9PSB1bmRlZmluZWQpIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudmFsdWU7XG4gICAgICBlbHNlIHJhd1ZhbHVlID0gZXZlbnRPckRhdGE7XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlID0gdmFsdWVQYXJzZXIocmF3VmFsdWUpO1xuICAgIHRoaXMucHJvcHMuY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlKHRoaXMucHJvcHMuZ3JpZCwgcm93SW5kZXgsIGNvbC52YWx1ZUtleVBhdGgsIHZhbHVlKTtcbiAgICBpZiAoY29sLm9uQ3JlYXRlVmFsdWVDaGFuZ2UpIHtcbiAgICAgIGNvbC5vbkNyZWF0ZVZhbHVlQ2hhbmdlKHZhbHVlLCBjb2wudmFsdWVLZXlQYXRoLCByb3dJbmRleCk7XG4gICAgfVxuICAgIGlmIChjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUgJiYgdmFsdWUgPT09IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5tYXRjaFZhbHVlKSB7XG4gICAgICAvLyBDYWxsIHNwZWNpYWwgcGFpcmVkIHZhbHVlIGNoYW5nZSBvbiBvdGhlciBjZWxsIGlmIHZhbHVlIG1hdGNoZXNcbiAgICAgIHRoaXMub25DcmVhdGVDZWxsVmFsdWVDaGFuZ2UoXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICB7IHZhbHVlS2V5UGF0aDogY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm5ld1ZhbHVlS2V5UGF0aCB9LFxuICAgICAgICB2ID0+IHYsXG4gICAgICApKGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5uZXdWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjb2wudmFsaWRhdG9ycykge1xuICAgICAgdGhpcy5wcm9wcy5jcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZShcbiAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgY29sLnZhbHVlS2V5UGF0aCxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIGNvbC52YWxpZGF0b3JzLFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBvbkVkaXRDZWxsVmFsdWVDaGFuZ2UgPSAocm93SW5kZXgsIGNvbCwgdmFsdWVQYXJzZXIpID0+IChldmVudE9yRGF0YSkgPT4ge1xuICAgIGNvbnN0IGRhdGFJZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgbGV0IHJhd1ZhbHVlO1xuICAgIC8vIGV2ZW50T3JEYXRhIGNhbiBiZSBpbnB1dCBvbkNoYW5nZSBldmVudCwgcmVhY3Qtc2VsZWN0IG9uQ2hhbmdlIG9yIHJlYWN0LWRheS1waWNrZXIgb25DaGFuZ2VcbiAgICBpZiAoZXZlbnRPckRhdGEpIHtcbiAgICAgIGlmIChldmVudE9yRGF0YS50YXJnZXQgIT09IHVuZGVmaW5lZCkgcmF3VmFsdWUgPSBldmVudE9yRGF0YS50YXJnZXQudmFsdWU7XG4gICAgICBlbHNlIGlmIChldmVudE9yRGF0YS52YWx1ZSAhPT0gdW5kZWZpbmVkKSByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnZhbHVlO1xuICAgICAgZWxzZSByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhO1xuICAgIH1cbiAgICBjb25zdCB2YWx1ZSA9IHZhbHVlUGFyc2VyKHJhd1ZhbHVlKTtcbiAgICB0aGlzLnByb3BzLmVkaXRDZWxsVmFsdWVDaGFuZ2UodGhpcy5wcm9wcy5ncmlkLCBkYXRhSWQsIGNvbC52YWx1ZUtleVBhdGgsIHZhbHVlKTtcbiAgICBpZiAoY29sLm9uRWRpdFZhbHVlQ2hhbmdlKSB7XG4gICAgICBjb2wub25FZGl0VmFsdWVDaGFuZ2UodmFsdWUsIGNvbC52YWx1ZUtleVBhdGgsIHJvd0luZGV4LCBkYXRhSWQpO1xuICAgIH1cbiAgICBpZiAoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlICYmIHZhbHVlID09PSBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubWF0Y2hWYWx1ZSkge1xuICAgICAgLy8gQ2FsbCBzcGVjaWFsIHBhaXJlZCB2YWx1ZSBjaGFuZ2Ugb24gb3RoZXIgY2VsbCBpZiB2YWx1ZSBtYXRjaGVzXG4gICAgICB0aGlzLm9uRWRpdENlbGxWYWx1ZUNoYW5nZShcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIHsgdmFsdWVLZXlQYXRoOiBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWVLZXlQYXRoIH0sXG4gICAgICAgIHYgPT4gdixcbiAgICAgICkoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm5ld1ZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNvbC52YWxpZGF0b3JzKSB7XG4gICAgICB0aGlzLnByb3BzLmVkaXRDZWxsVmFsdWVWYWxpZGF0ZShcbiAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICBkYXRhSWQsXG4gICAgICAgIGNvbC52YWx1ZUtleVBhdGgsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBjb2wudmFsaWRhdG9ycyxcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgb25DcmVhdGVDZWxsQmx1ciA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGUpID0+IHtcbiAgICBpZiAoY29sLm9uQ3JlYXRlQmx1cikge1xuICAgICAgbGV0IHZhbHVlID0gKGUgJiYgZS50YXJnZXQgJiYgZS50YXJnZXQudmFsdWUgIT09IHVuZGVmaW5lZCkgP1xuICAgICAgICBlLnRhcmdldC52YWx1ZSA6XG4gICAgICAgIHRoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKTtcbiAgICAgIGlmICh2YWx1ZVBhcnNlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWVQYXJzZXIodmFsdWUpO1xuICAgICAgfVxuICAgICAgY29sLm9uQ3JlYXRlQmx1cih2YWx1ZSwgcm93SW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIG9uRWRpdENlbGxCbHVyID0gKHJvd0luZGV4LCBjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZSkgPT4ge1xuICAgIGlmIChjb2wub25FZGl0Qmx1cikge1xuICAgICAgbGV0IHZhbHVlID0gKGUgJiYgZS50YXJnZXQgJiYgZS50YXJnZXQudmFsdWUgIT09IHVuZGVmaW5lZCkgP1xuICAgICAgICBlLnRhcmdldC52YWx1ZSA6XG4gICAgICAgIHRoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKTtcbiAgICAgIGlmICh2YWx1ZVBhcnNlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWVQYXJzZXIodmFsdWUpO1xuICAgICAgfVxuICAgICAgY29uc3QgZGF0YUlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICAgIGNvbC5vbkVkaXRCbHVyKHZhbHVlLCByb3dJbmRleCwgZGF0YUlkKTtcbiAgICB9XG4gIH1cblxuICBvbkNlbGxGb2N1cyA9IChjZWxsVHlwZSwgaW5wdXRUeXBlLCByb3dJbmRleCwgY29sdW1uS2V5KSA9PiAoZSkgPT4ge1xuICAgIGlmIChpbnB1dFR5cGUgPT09ICdudW1iZXInKSB7XG4gICAgICBlLnRhcmdldC5zZWxlY3QoKTtcbiAgICB9XG4gICAgaWYgKGNlbGxUeXBlID09PSAnZWRpdCcgJiYgdGhpcy5wcm9wcy5jZWxsU2VsZWN0KSB7XG4gICAgICB0aGlzLnByb3BzLmNlbGxTZWxlY3Rpb25DaGFuZ2UodGhpcy5wcm9wcy5ncmlkLCBNYXAoeyByb3dJbmRleCwgY29sdW1uS2V5IH0pKTtcbiAgICB9XG4gIH1cblxuICBnZXREYXRhSWRCeVJvd0luZGV4ID0gcm93SW5kZXggPT5cbiAgICB0aGlzLnByb3BzLmRhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi50aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoXSk7XG5cbiAgZ2V0U2VsZWN0ZWRJdGVtSW5kZXggPSAoaWQpID0+IHtcbiAgICBpZiAoIWlkKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5wcm9wcy5kYXRhLmZpbmRJbmRleCh2ID0+IHYuZ2V0SW4odGhpcy5wcm9wcy5ncmlkLmlkS2V5UGF0aCkgPT09IGlkKTtcbiAgICByZXR1cm4gaW5kZXggPT09IC0xID8gdW5kZWZpbmVkIDogaW5kZXg7XG4gIH1cblxuICBnZXRFZGl0SXRlbVZhbHVlID0gKHJvd0luZGV4LCBjb2wpID0+IHtcbiAgICAvLyBHZXQgdGhlIHZhbHVlIHRvIGRpc3BsYXkgaW4gZWRpdCBjZWxsXG4gICAgY29uc3QgaWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgIGNvbnN0IGVkaXRWYWx1ZSA9IHRoaXMucHJvcHMuZWRpdERhdGEuZ2V0SW4oW2lkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSwgdW5kZWZpbmVkKTtcbiAgICBsZXQgb3JpZ2luYWxWYWx1ZTtcbiAgICBpZiAoZWRpdFZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG9yaWdpbmFsVmFsdWUgPSB0aGlzLnByb3BzLmRhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSwgJycpO1xuICAgIH0gZWxzZSBpZiAoZWRpdFZhbHVlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBlZGl0VmFsdWU7XG4gICAgfVxuICAgIGlmIChvcmlnaW5hbFZhbHVlID09PSBudWxsIHx8IG9yaWdpbmFsVmFsdWUgPT09IHVuZGVmaW5lZCB8fCBvcmlnaW5hbFZhbHVlID09PSAnJykge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICAvLyBTcGVjaWFsIGZvcm1hdHRpbmcgYnkgY29tcG9uZW50IHR5cGVcbiAgICBpZiAoXG4gICAgICBjb2wuY29tcG9uZW50VHlwZSA9PT0gJ2Zsb2F0JyAmJlxuICAgICAgU3RyaW5nKG9yaWdpbmFsVmFsdWUpLmxlbmd0aCA+IDBcbiAgICApIHtcbiAgICAgIHJldHVybiBTdHJpbmcob3JpZ2luYWxWYWx1ZSkucmVwbGFjZSgnLicsIHRoaXMucHJvcHMuZGVjaW1hbFNlcGFyYXRvcik7XG4gICAgfVxuICAgIHJldHVybiBvcmlnaW5hbFZhbHVlO1xuICB9XG5cbiAgZ2V0Q3JlYXRlSXRlbVZhbHVlID0gKHJvd0luZGV4LCBjb2wpID0+IHtcbiAgICBjb25zdCB2YWwgPSB0aGlzLnByb3BzLmNyZWF0ZURhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSwgJycpO1xuICAgIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgcmV0dXJuIHZhbDtcbiAgfVxuXG4gIGdldEZpbHRlckl0ZW1WYWx1ZSA9IChjb2wpID0+IHtcbiAgICBjb25zdCB2YWwgPSB0aGlzLnByb3BzLmZpbHRlckRhdGEuZ2V0KFV0aWxzLmdldENvbHVtbktleShjb2wpLCAnJyk7XG4gICAgaWYgKHZhbCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gdmFsO1xuICB9XG5cbiAgZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZSA9IChyb3dJbmRleCwgY29sLCBtb2RlKSA9PiB7XG4gICAgbGV0IGNvbXBvbmVudERpc2FibGVkID0gISFjb2wuZGlzYWJsZUVkaXRpbmc7XG4gICAgLy8gY2hlY2sgaWYgY29tcG9uZW50IGlzIGRpc2FibGVkIGJ5IG90aGVyIGNvbHVtbiBkYXRhXG4gICAgaWYgKCFjb21wb25lbnREaXNhYmxlZCAmJiBjb2wuZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2gpIHtcbiAgICAgIGlmIChtb2RlID09PSAnY3JlYXRlJykge1xuICAgICAgICBjb21wb25lbnREaXNhYmxlZCA9IHRoaXMuZ2V0Q3JlYXRlSXRlbVZhbHVlKFxuICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgIHsgdmFsdWVLZXlQYXRoOiBjb2wuZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2gubWF0Y2hWYWx1ZUtleVBhdGggfSxcbiAgICAgICAgKSA9PT0gY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb21wb25lbnREaXNhYmxlZCA9IHRoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShcbiAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICB7IHZhbHVlS2V5UGF0aDogY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWVLZXlQYXRoIH0sXG4gICAgICAgICkgPT09IGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaC5tYXRjaFZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29tcG9uZW50RGlzYWJsZWQ7XG4gIH1cblxuICBnZXRSb3dDbGFzc05hbWUgPSAocm93SW5kZXgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBncmlkLFxuICAgICAgaXNDcmVhdGluZyxcbiAgICAgIGlzRWRpdGluZyxcbiAgICAgIGNyZWF0ZURhdGEsXG4gICAgICBzZWxlY3RlZEl0ZW1zLFxuICAgICAgZGF0YSxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCByb3dDbGFzc05hbWVzID0gWydvYy1kYXRhZ3JpZC1yb3cnXTtcbiAgICBsZXQgZXh0cmFSb3dDb3VudCA9IDA7IC8vIGhvdyBtYW55IHJvd3MgdG8gaWdub3JlIGZyb20gdG9wLCBuZXcgKyBmaWx0ZXIgcm93c1xuICAgIGlmIChpc0NyZWF0aW5nKSBleHRyYVJvd0NvdW50ID0gY3JlYXRlRGF0YS5zaXplO1xuICAgIGlmIChpc0NyZWF0aW5nKSB7XG4gICAgICBpZiAocm93SW5kZXggPD0gKGV4dHJhUm93Q291bnQgLSAxKSkge1xuICAgICAgICByb3dDbGFzc05hbWVzLnB1c2goJ29jLWRhdGFncmlkLXJvdy1uZXcnKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzRWRpdGluZykge1xuICAgICAgcm93Q2xhc3NOYW1lcy5wdXNoKCdvYy1kYXRhZ3JpZC1yb3ctZWRpdCcpO1xuICAgIH1cblxuXG4gICAgLy8gY2hlY2sgaWYgcm93IGlzIHNlbGVjdGVkXG4gICAgaWYgKCghaXNDcmVhdGluZyAmJiAhaXNFZGl0aW5nKSAmJlxuICAgICAgICAoc2VsZWN0ZWRJdGVtcyAmJiBncmlkLmlkS2V5UGF0aCkpIHtcbiAgICAgIGlmIChcbiAgICAgICAgc2VsZWN0ZWRJdGVtcy5pbmRleE9mKGRhdGEuZ2V0SW4oW3Jvd0luZGV4IC0gZXh0cmFSb3dDb3VudCwgLi4uZ3JpZC5pZEtleVBhdGhdKSkgIT09IC0xXG4gICAgICApIHtcbiAgICAgICAgcm93Q2xhc3NOYW1lcy5wdXNoKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLnJvd0NsYXNzTmFtZUdldHRlcikge1xuICAgICAgcmV0dXJuIHJvd0NsYXNzTmFtZXMuam9pbignICcpICsgJyAnICsgdGhpcy5wcm9wcy5yb3dDbGFzc05hbWVHZXR0ZXIocm93SW5kZXgpO1xuICAgIH1cbiAgICByZXR1cm4gcm93Q2xhc3NOYW1lcy5qb2luKCcgJyk7XG4gIH1cblxuICBnZXRDZWxsTWVzc2FnZXMgPSAocm93SW5kZXgsIGNvbCwgY2VsbFR5cGUpID0+IHtcbiAgICBjb25zdCByZXR1cm5EYXRhID0ge307XG4gICAgaWYgKCF0aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoIHx8ICFjb2wudmFsdWVLZXlQYXRoKSB7XG4gICAgICByZXR1cm4gcmV0dXJuRGF0YTtcbiAgICB9XG4gICAgbGV0IGluZm9NZXNzYWdlO1xuICAgIGxldCBlcnJvck1lc3NhZ2U7XG4gICAgbGV0IHdhcm5pbmdNZXNzYWdlO1xuICAgIGlmIChjZWxsVHlwZSA9PT0gJ2NyZWF0ZScpIHtcbiAgICAgIGluZm9NZXNzYWdlID0gdGhpcy5wcm9wcy5jcmVhdGVDZWxsTWVzc2FnZXMuZ2V0SW4oWydpbmZvJywgcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgIGVycm9yTWVzc2FnZSA9IHRoaXMucHJvcHMuY3JlYXRlQ2VsbE1lc3NhZ2VzLmdldEluKFsnZXJyb3InLCByb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgd2FybmluZ01lc3NhZ2UgPSB0aGlzLnByb3BzLmNyZWF0ZUNlbGxNZXNzYWdlcy5nZXRJbihbJ3dhcm5pbmcnLCByb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgICBpbmZvTWVzc2FnZSA9IHRoaXMucHJvcHMuY2VsbE1lc3NhZ2VzLmdldEluKFsnaW5mbycsIGlkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgICBlcnJvck1lc3NhZ2UgPSB0aGlzLnByb3BzLmNlbGxNZXNzYWdlcy5nZXRJbihbJ2Vycm9yJywgaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgIHdhcm5pbmdNZXNzYWdlID0gdGhpcy5wcm9wcy5jZWxsTWVzc2FnZXMuZ2V0SW4oWyd3YXJuaW5nJywgaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICB9XG4gICAgaWYgKGluZm9NZXNzYWdlKSB7XG4gICAgICByZXR1cm5EYXRhLmluZm9NZXNzYWdlID0gaW5mb01lc3NhZ2U7XG4gICAgfVxuICAgIGlmIChlcnJvck1lc3NhZ2UpIHtcbiAgICAgIHJldHVybkRhdGEuZXJyb3JNZXNzYWdlID0gZXJyb3JNZXNzYWdlO1xuICAgIH1cbiAgICBpZiAod2FybmluZ01lc3NhZ2UpIHtcbiAgICAgIHJldHVybkRhdGEud2FybmluZ01lc3NhZ2UgPSB3YXJuaW5nTWVzc2FnZTtcbiAgICB9XG4gICAgcmV0dXJuIHJldHVybkRhdGE7XG4gIH1cblxuICBnZXRTY3JvbGxUb1JvdyA9ICgpID0+IHtcbiAgICBsZXQgc2Nyb2xsVG9Sb3c7XG4gICAgaWYgKHRoaXMucHJvcHMuaXNDcmVhdGluZyAmJiAhdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCkgcmV0dXJuIHNjcm9sbFRvUm93O1xuICAgIGlmICh0aGlzLmZvY3VzVG9DcmVhdGVDZWxsKSB7XG4gICAgICBjb25zdCBzY3JvbGxOZXdSb3cgPSB0aGlzLnByb3BzLmNyZWF0ZURhdGEuc2l6ZSAtIDE7XG4gICAgICBpZiAoc2Nyb2xsTmV3Um93ID49IDApIHtcbiAgICAgICAgc2Nyb2xsVG9Sb3cgPSBzY3JvbGxOZXdSb3c7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLmlzRWRpdGluZykge1xuICAgICAgICBzY3JvbGxUb1JvdyA9IHRoaXMuc3RhdGUuY3VycmVudFJvdztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gdGhpcy5wcm9wcy5zY3JvbGxUb1JvdzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgfVxuICAgICAgaWYgKHNjcm9sbFRvUm93ID09PSB1bmRlZmluZWQgJiYgdGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLnNpemUgPiAwKSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gdGhpcy5nZXRTZWxlY3RlZEl0ZW1JbmRleCh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuZmlyc3QoKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzY3JvbGxUb1JvdztcbiAgfVxuXG4gIGhhbmRsZUNlbGxTZWxlY3QgPSAoY2VsbFR5cGUsIHJvd0luZGV4LCBjb2x1bW5LZXkpID0+ICgpID0+IHtcbiAgICBpZiAoY2VsbFR5cGUgPT09ICd2aWV3JyAmJiB0aGlzLnByb3BzLmNlbGxTZWxlY3QpIHtcbiAgICAgIHRoaXMucHJvcHMuY2VsbFNlbGVjdGlvbkNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIE1hcCh7IHJvd0luZGV4LCBjb2x1bW5LZXkgfSkpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUNyZWF0ZUNlbGxSZWYgPSAocm93SW5kZXgsIGNvbCkgPT4gKHJlZikgPT4ge1xuICAgIC8vIEZvY3VzIHRvIGNyZWF0ZSBjZWxsXG4gICAgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5jcmVhdGVEYXRhLnNpemUgJiZcbiAgICAgIHRoaXMucHJvcHMuY3JlYXRlRGF0YS5zaXplID09PSByb3dJbmRleCArIDEgJiZcbiAgICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgJiZcbiAgICAgICF0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2NyZWF0ZScpXG4gICAgKSB7XG4gICAgICByZWYuZm9jdXMoKTtcbiAgICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVFZGl0Q2VsbFJlZiA9IChyb3dJbmRleCwgY29sKSA9PiAocmVmKSA9PiB7XG4gICAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCk7XG4gICAgaWYgKHRoaXMuZm9jdXNUb0VkaXRDZWxsICYmICF0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2VkaXQnKSkge1xuICAgICAgY29uc3Qgc2VsZWN0ZWRSb3dJbmRleCA9IHRoaXMuZ2V0U2VsZWN0ZWRJdGVtSW5kZXgodGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLmZpcnN0KCkpO1xuICAgICAgY29uc3QgeyBzZWxlY3RlZENlbGwgfSA9IHRoaXMucHJvcHM7XG4gICAgICBpZiAoc2VsZWN0ZWRDZWxsLnNpemUgPiAwKSB7XG4gICAgICAgIGlmIChzZWxlY3RlZENlbGwuZ2V0KCdyb3dJbmRleCcpID09PSByb3dJbmRleCAmJiBzZWxlY3RlZENlbGwuZ2V0KCdjb2x1bW5LZXknKSA9PT0gY29sdW1uS2V5KSB7XG4gICAgICAgICAgcmVmLmZvY3VzKCk7XG4gICAgICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzZWxlY3RlZFJvd0luZGV4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWRSb3dJbmRleCA9PT0gcm93SW5kZXgpIHtcbiAgICAgICAgcmVmLmZvY3VzKCk7XG4gICAgICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZUFycm93TmF2aWdhdGlvbikge1xuICAgICAgdGhpcy5jZWxsUmVmc1tgJHt0aGlzLnByb3BzLmdyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4fWBdID0gcmVmO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVDZWxsRm9jdXMgPSAobmV4dEVsZW1lbnQsIHJvd0luZGV4LCBjb2x1bW5JbmRleCkgPT4ge1xuICAgIGlmIChuZXh0RWxlbWVudCAmJiAobmV4dEVsZW1lbnQudHlwZSA9PT0gJ3RleHQnIHx8IG5leHRFbGVtZW50LnR5cGUgPT09ICdudW1iZXInKSkge1xuICAgICAgaWYgKHJvd0luZGV4ICE9PSAtMSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgY3VycmVudFJvdzogcm93SW5kZXggfSk7XG4gICAgICB9XG4gICAgICBpZiAoY29sdW1uSW5kZXggIT09IC0xKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjdXJyZW50Q29sdW1uOiBjb2x1bW5JbmRleCB9KTtcbiAgICAgIH1cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gbmV4dEVsZW1lbnQuc2VsZWN0KCksIDUwKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVTZWxlY3Rpb25DaGVja0JveE9uQ2hhbmdlID0gcm93SW5kZXggPT4gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMuaXRlbVNlbGVjdGlvbkNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIHJvd0luZGV4LCB0cnVlLCBmYWxzZSk7XG4gIH1cblxuICBnZW5lcmF0ZUNvbHVtbnMgPSAoKSA9PiB7XG4gICAgY29uc3QgY29sdW1ucyA9IFtdO1xuICAgIGNvbnN0IHRhYkluZGV4ID0gU3RyaW5nKHRoaXMucHJvcHMudGFiSW5kZXgpO1xuICAgIGlmICh0aGlzLnByb3BzLnJvd1NlbGVjdENoZWNrYm94Q29sdW1uKSB7XG4gICAgICBjb2x1bW5zLnB1c2goe1xuICAgICAgICB3aWR0aDogNDAsXG4gICAgICAgIGlzUmVzaXphYmxlOiBmYWxzZSxcbiAgICAgICAgY29sdW1uS2V5OiAnc2VsZWN0aW9uQ2hlY2tib3gnLFxuICAgICAgICBjZWxsOiAocm93SW5kZXgpID0+IHtcbiAgICAgICAgICBjb25zdCByb3dJdGVtID0gdGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCk7XG4gICAgICAgICAgY29uc3QgaXRlbUlkID0gcm93SXRlbS5nZXRJbih0aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoKTtcbiAgICAgICAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhpdGVtSWQpO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwib2Mtcm93LXNlbGVjdC1jaGVja2JveFwiXG4gICAgICAgICAgICAgIGNoZWNrZWQ9e3NlbGVjdGVkfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVTZWxlY3Rpb25DaGVja0JveE9uQ2hhbmdlKHJvd0luZGV4KX1cbiAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICBjZWxsRWRpdDogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbENyZWF0ZTogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbEZpbHRlcjogKCkgPT4gbnVsbCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHZpc2libGVDb2x1bW5zID0gW107XG4gICAgdGhpcy5wcm9wcy52aXNpYmxlQ29sdW1ucy5mb3JFYWNoKCh2aXNpYmxlQ29sdW1uS2V5KSA9PiB7XG4gICAgICB0aGlzLnByb3BzLmNvbHVtbnMuZm9yRWFjaCgob3JnQ29sKSA9PiB7XG4gICAgICAgIGlmIChVdGlscy5nZXRDb2x1bW5LZXkob3JnQ29sKSA9PT0gdmlzaWJsZUNvbHVtbktleSkge1xuICAgICAgICAgIHZpc2libGVDb2x1bW5zLnB1c2gob3JnQ29sKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgdmlzaWJsZUNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICBjb25zdCBjb2x1bW4gPSB7XG4gICAgICAgIGhlYWRlcjogY29sLmhlYWRlcixcbiAgICAgICAgY29sdW1uS2V5OiBVdGlscy5nZXRDb2x1bW5LZXkoY29sKSxcbiAgICAgICAgd2lkdGg6IChjb2wud2lkdGggfHwgY29sLndpZHRoID09PSAwID8gY29sLndpZHRoIDogMjAwKSxcbiAgICAgICAgbWluV2lkdGg6IChjb2wubWluV2lkdGggfHwgY29sLm1pbldpZHRoID09PSAwID8gY29sLm1pbldpZHRoIDogNDApLFxuICAgICAgICBtYXhXaWR0aDogY29sLm1heFdpZHRoLFxuICAgICAgICBpc1Jlc2l6YWJsZTogIWNvbC5kaXNhYmxlUmVzaXppbmcsXG4gICAgICAgIGZpeGVkOiAhIWNvbC5maXhlZCxcbiAgICAgICAgYWxsb3dDZWxsc1JlY3ljbGluZzogISFjb2wuYWxsb3dDZWxsc1JlY3ljbGluZyxcbiAgICAgICAgZGlzYWJsZVNvcnRpbmc6ICEhY29sLmRpc2FibGVTb3J0aW5nLFxuICAgICAgICBpc1JlcXVpcmVkOiAhIWNvbC5pc1JlcXVpcmVkLFxuICAgICAgICBjb21wb25lbnRUeXBlOiBjb2wuY29tcG9uZW50VHlwZSxcbiAgICAgICAgc3R5bGU6IFV0aWxzLmdldENlbGxTdHlsZUJ5Q29sKGNvbCksXG4gICAgICB9O1xuICAgICAgaWYgKGNvbC52YWx1ZUtleVBhdGgpIHtcbiAgICAgICAgY29sdW1uLnZhbHVlS2V5UGF0aCA9IGNvbC52YWx1ZUtleVBhdGg7XG4gICAgICB9XG4gICAgICBpZiAoY29sLmZsZXhHcm93KSB7XG4gICAgICAgIGNvbHVtbi5mbGV4R3JvdyA9IGNvbC5mbGV4R3JvdztcbiAgICAgIH1cbiAgICAgIGlmIChjb2wudmFsdWVUeXBlKSB7XG4gICAgICAgIGNvbHVtbi52YWx1ZVR5cGUgPSBjb2wudmFsdWVUeXBlO1xuICAgICAgfVxuICAgICAgaWYgKGNvbC5zb3J0Q29tcGFyYXRvcikge1xuICAgICAgICBjb2x1bW4uc29ydENvbXBhcmF0b3IgPSBjb2wuc29ydENvbXBhcmF0b3I7XG4gICAgICB9XG4gICAgICBpZiAoY29sLnNvcnRWYWx1ZUdldHRlcikge1xuICAgICAgICBjb2x1bW4uc29ydFZhbHVlR2V0dGVyID0gY29sLnNvcnRWYWx1ZUdldHRlcjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHZhbHVlRW1wdHlDaGVja2VyID0gVXRpbHMuZ2V0VmFsdWVFbXB0eUNoZWNrZXIoY29sKTtcbiAgICAgIC8vIENlbGwgdmFsdWUgcmVuZGVyaW5nXG4gICAgICBjb25zdCB2YWx1ZVJlbmRlciA9IChyb3dJbmRleCwgZm9ybWF0KSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbCA9IHRoaXMucHJvcHMuZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbCkpIHtcbiAgICAgICAgICByZXR1cm4gY29sLmlzUmVxdWlyZWQgPyA8TSBpZD1cIkdyaWQuVmFsdWVJc01pc3NpbmdcIiAvPiA6ICcnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3JtYXQgPyBmb3JtYXQodmFsKSA6IHZhbDtcbiAgICAgIH07XG5cbiAgICAgIGlmIChjb2wuY2VsbCkge1xuICAgICAgICBjb2x1bW4uY2VsbCA9IGNvbC5jZWxsO1xuICAgICAgfSBlbHNlIGlmIChjb2wudmFsdWVSZW5kZXIpIHtcbiAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBjb2wudmFsdWVSZW5kZXIodGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3dpdGNoIChjb2wudmFsdWVUeXBlKSB7XG4gICAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICBjYXNlICdmbG9hdCc6XG4gICAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+XG4gICAgICAgICAgICAgIHZhbHVlUmVuZGVyKHJvd0luZGV4LCB2ID0+IDxOIHZhbHVlPXt2fSB7Li4uY29sLnJlbmRlckNvbXBvbmVudFByb3BzfSAvPik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdjdXJyZW5jeSc6IHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbmN5S2V5UGF0aCA9IGNvbC52YWx1ZU9wdGlvbnMgJiYgY29sLnZhbHVlT3B0aW9ucy5jdXJyZW5jeUtleVBhdGggfHwgWydjdXJyZW5jeSddOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+XG4gICAgICAgICAgICAgIHZhbHVlUmVuZGVyKHJvd0luZGV4LCB2ID0+IGZvcm1hdEN1cnJlbmN5QW1vdW50KHYsIHtcbiAgICAgICAgICAgICAgICBjdXJyZW5jeTogdGhpcy5wcm9wcy5kYXRhLmdldEluKFtyb3dJbmRleCwgLi4uY3VycmVuY3lLZXlQYXRoXSksXG4gICAgICAgICAgICAgICAgZGVjaW1hbHM6IGNvbC52YWx1ZU9wdGlvbnMgJiYgY29sLnZhbHVlT3B0aW9ucy5kZWNpbWFscyxcbiAgICAgICAgICAgICAgICB0aG91c2FuZFNlcGFyYXRvcjogY29sLnZhbHVlT3B0aW9ucyAmJiBjb2wudmFsdWVPcHRpb25zLnRob3VzYW5kU2VwYXJhdG9yIHx8IHRoaXMucHJvcHMudGhvdXNhbmRTZXBhcmF0b3IsIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgICAgICAgICBkZWNpbWFsU2VwYXJhdG9yOiBjb2wudmFsdWVPcHRpb25zICYmIGNvbC52YWx1ZU9wdGlvbnMuZGVjaW1hbFNlcGFyYXRvciB8fCB0aGlzLnByb3BzLmRlY2ltYWxTZXBhcmF0b3IsIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PlxuICAgICAgICAgICAgICB2YWx1ZVJlbmRlcihyb3dJbmRleCwgKHYpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobW9tZW50KHYsIHRoaXMucHJvcHMuZGF0ZUZvcm1hdCwgdHJ1ZSkuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gbW9tZW50LnV0Yyh2LCB0aGlzLnByb3BzLmRhdGVGb3JtYXQpLmZvcm1hdCh0aGlzLnByb3BzLmRhdGVGb3JtYXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobW9tZW50KHYpLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vbWVudC51dGModikuZm9ybWF0KHRoaXMucHJvcHMuZGF0ZUZvcm1hdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiA8TSBpZD1cIkdyaWQuSW52YWxpZERhdGVcIiAvPjtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT5cbiAgICAgICAgICAgICAgdmFsdWVSZW5kZXIocm93SW5kZXgsIHYgPT5cbiAgICAgICAgICAgICAgICA8TSBpZD17diA/ICdHcmlkLlllcycgOiAnR3JpZC5Obyd9IHsuLi5jb2wucmVuZGVyQ29tcG9uZW50UHJvcHN9IC8+KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IHZhbHVlUmVuZGVyKHJvd0luZGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gQ2VsbCBlZGl0L2NyZWF0ZS9maWx0ZXIgY29tcG9uZW50IHJlbmRlcmluZ1xuICAgICAgaWYgKGNvbC5jZWxsRWRpdCkge1xuICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSBjb2wuY2VsbEVkaXQ7XG4gICAgICB9IGVsc2UgaWYgKGNvbC5lZGl0VmFsdWVSZW5kZXIpIHtcbiAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gY29sLmVkaXRWYWx1ZVJlbmRlcih0aGlzLnByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSk7XG4gICAgICB9XG4gICAgICBpZiAoY29sLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSBjb2wuY2VsbENyZWF0ZTtcbiAgICAgIH0gZWxzZSBpZiAoY29sLmNyZWF0ZVZhbHVlUmVuZGVyKSB7XG4gICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gY29sLmNyZWF0ZVZhbHVlUmVuZGVyKHRoaXMucHJvcHMuZGF0YS5nZXQocm93SW5kZXgpKTtcbiAgICAgIH1cbiAgICAgIGlmIChjb2wuY2VsbEZpbHRlcikge1xuICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9IGNvbC5jZWxsRmlsdGVyO1xuICAgICAgfSBlbHNlIGlmIChjb2wuZmlsdGVyVmFsdWVSZW5kZXIpIHtcbiAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSByb3dJbmRleCA9PiBjb2wuZmlsdGVyVmFsdWVSZW5kZXIodGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCkpO1xuICAgICAgfVxuICAgICAgaWYgKGNvbC5jb21wb25lbnRUeXBlKSB7XG4gICAgICAgIGxldCBlZGl0VmFsdWVQYXJzZXIgPSB2YWwgPT4gdmFsO1xuICAgICAgICBzd2l0Y2ggKGNvbC5jb21wb25lbnRUeXBlKSB7XG4gICAgICAgICAgY2FzZSAndGV4dCc6XG4gICAgICAgICAgICAvLyBUT0RPIFJFRkFDVE9SIFRPIEZVTkNUSU9OXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5pbmxpbmVFZGl0KSB7XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gKFxuICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25FZGl0Q2VsbFZhbHVlQ2hhbmdlKHJvd0luZGV4LCBjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5vbkVkaXRDZWxsQmx1cihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5vbkNlbGxGb2N1cygnZWRpdCcsIGNvbC5jb21wb25lbnRUeXBlLCByb3dJbmRleCwgY29sdW1uLmNvbHVtbktleSl9XG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5vbkVkaXRDZWxsS2V5RG93bihjb2wsIHJvd0luZGV4KX1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRSZWY9e3RoaXMuaGFuZGxlRWRpdENlbGxSZWYocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZEVkaXRJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fS0ke3Jvd0luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuZWRpdENvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdlZGl0Jyl9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXtjb2x1bW4uc3R5bGV9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiAoXG4gICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRDcmVhdGVJdGVtVmFsdWUocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlKHJvd0luZGV4LCBjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5vbkNyZWF0ZUNlbGxCbHVyKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMub25DcmVhdGVDZWxsS2V5RG93bn1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRSZWY9e3RoaXMuaGFuZGxlQ3JlYXRlQ2VsbFJlZihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkQ3JlYXRlSW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX0tJHtyb3dJbmRleH1gfVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmNyZWF0ZUNvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdjcmVhdGUnKX1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e2NvbHVtbi5zdHlsZX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5maWx0ZXJpbmcpIHtcbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT4gKFxuICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0RmlsdGVySXRlbVZhbHVlKGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uRmlsdGVyQ2VsbFZhbHVlQ2hhbmdlKGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkRmlsdGVySW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX1gfVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmZpbHRlckNvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17Y29sdW1uLnN0eWxlfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5pbmxpbmVFZGl0KSB7XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gKFxuICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkVkaXRDZWxsVmFsdWVDaGFuZ2Uocm93SW5kZXgsIGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLm9uRWRpdENlbGxCbHVyKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLm9uQ2VsbEZvY3VzKCdlZGl0JywgY29sLmNvbXBvbmVudFR5cGUsIHJvd0luZGV4LCBjb2x1bW4uY29sdW1uS2V5KX1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLm9uRWRpdENlbGxLZXlEb3duKGNvbCwgcm93SW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFJlZj17dGhpcy5oYW5kbGVFZGl0Q2VsbFJlZihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkRWRpdElucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5lZGl0Q29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2VkaXQnKX1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e2NvbHVtbi5zdHlsZX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IChcbiAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0Q3JlYXRlSXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZShyb3dJbmRleCwgY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMub25DcmVhdGVDZWxsQmx1cihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5vbkNlbGxGb2N1cygnY3JlYXRlJywgJ251bWJlcicsIHJvd0luZGV4LCBjb2x1bW4uY29sdW1uS2V5KX1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLm9uQ3JlYXRlQ2VsbEtleURvd259XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UmVmPXt0aGlzLmhhbmRsZUNyZWF0ZUNlbGxSZWYocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZENyZWF0ZUlucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5jcmVhdGVDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnY3JlYXRlJyl9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXtjb2x1bW4uc3R5bGV9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuZmlsdGVyaW5nKSB7XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IChcbiAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0RmlsdGVySXRlbVZhbHVlKGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uRmlsdGVyQ2VsbFZhbHVlQ2hhbmdlKGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkRmlsdGVySW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX1gfVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmZpbHRlckNvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17Y29sdW1uLnN0eWxlfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlciA9IHZhbCA9PlxuICAgICAgICAgICAgICB2YWwucmVwbGFjZShuZXcgUmVnRXhwKGBbXlxcXFxkJHt0aGlzLnByb3BzLmRlY2ltYWxTZXBhcmF0b3J9Ky1dYCwgJ2cnKSwgJycpO1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5saW5lRWRpdCkge1xuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IChcbiAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uRWRpdENlbGxWYWx1ZUNoYW5nZShyb3dJbmRleCwgY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMub25FZGl0Q2VsbEJsdXIocm93SW5kZXgsIGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5vbkNlbGxGb2N1cygnZWRpdCcsIGNvbC5jb21wb25lbnRUeXBlLCByb3dJbmRleCwgY29sdW1uLmNvbHVtbktleSl9XG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5vbkVkaXRDZWxsS2V5RG93bihjb2wsIHJvd0luZGV4KX1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRSZWY9e3RoaXMuaGFuZGxlRWRpdENlbGxSZWYocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZEVkaXRJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fS0ke3Jvd0luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuZWRpdENvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdlZGl0Jyl9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXtjb2x1bW4uc3R5bGV9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiAoXG4gICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRDcmVhdGVJdGVtVmFsdWUocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlKHJvd0luZGV4LCBjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5vbkNyZWF0ZUNlbGxCbHVyKHJvd0luZGV4LCBjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5vbkNyZWF0ZUNlbGxLZXlEb3dufVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFJlZj17dGhpcy5oYW5kbGVDcmVhdGVDZWxsUmVmKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRDcmVhdGVJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fS0ke3Jvd0luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuY3JlYXRlQ29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2NyZWF0ZScpfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17Y29sdW1uLnN0eWxlfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmZpbHRlcmluZykge1xuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRGaWx0ZXJJdGVtVmFsdWUoY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UoY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRGaWx0ZXJJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fWB9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuZmlsdGVyQ29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXtjb2x1bW4uc3R5bGV9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnc2VsZWN0Jzoge1xuICAgICAgICAgICAgY29uc3QgeyBpbnRsIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0T3B0aW9ucyA9IGNvbC5zZWxlY3RDb21wb25lbnRPcHRpb25zIHx8XG4gICAgICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0Q29tcG9uZW50T3B0aW9ucy5nZXQoY29sdW1uLmNvbHVtbktleSk7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RUcmFuc2xhdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50VHJhbnNsYXRpb25zIHx8XG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0LlNlbGVjdCcgfSksXG4gICAgICAgICAgICAgICAgbm9SZXN1bHRzVGV4dDogaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0Lk5vUmVzdWx0cycgfSksXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5pbmxpbmVFZGl0KSB7XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gKFxuICAgICAgICAgICAgICAgICAgPEZsb2F0aW5nU2VsZWN0XG4gICAgICAgICAgICAgICAgICAgIG5hbWU9e2NvbC52YWx1ZUtleVBhdGguam9pbigpICsgJy1lZGl0LScgKyByb3dJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucz17XG4gICAgICAgICAgICAgICAgICAgICAgY29sLmVkaXRTZWxlY3RPcHRpb25zTW9kICYmIHNlbGVjdE9wdGlvbnMgP1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sLmVkaXRTZWxlY3RPcHRpb25zTW9kKHNlbGVjdE9wdGlvbnMuc2xpY2UoKSwgcm93SW5kZXgsIGNvbCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0T3B0aW9uc1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uRWRpdENlbGxWYWx1ZUNoYW5nZShyb3dJbmRleCwgY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMub25FZGl0Q2VsbEJsdXIocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMub25DZWxsRm9jdXMoJ2VkaXQnLCBjb2wuY29tcG9uZW50VHlwZSwgcm93SW5kZXgsIGNvbHVtbi5jb2x1bW5LZXkpfVxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hhYmxlPXtzZWxlY3RPcHRpb25zICYmIChzZWxlY3RPcHRpb25zLmxlbmd0aCA+IDkpfVxuICAgICAgICAgICAgICAgICAgICBjbGVhcmFibGU9eyFjb2wuaXNSZXF1aXJlZH1cbiAgICAgICAgICAgICAgICAgICAgYmFja3NwYWNlUmVtb3Zlcz17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIHRhYlNlbGVjdHNWYWx1ZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIG9wZW5PbkZvY3VzXG4gICAgICAgICAgICAgICAgICAgIHJlZj17dGhpcy5oYW5kbGVFZGl0Q2VsbFJlZihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICAgIGlkOiBgb2NEYXRhZ3JpZEVkaXRJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fS0ke3Jvd0luZGV4fWAsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuZWRpdENvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdlZGl0Jyl9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgey4uLnNlbGVjdFRyYW5zbGF0aW9uc31cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiAoXG4gICAgICAgICAgICAgICAgICA8RmxvYXRpbmdTZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgbmFtZT17Y29sLnZhbHVlS2V5UGF0aC5qb2luKCkgKyAnLWNyZWF0ZS0nICsgcm93SW5kZXh9XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e1xuICAgICAgICAgICAgICAgICAgICAgIGNvbC5jcmVhdGVTZWxlY3RPcHRpb25zTW9kICYmIHNlbGVjdE9wdGlvbnMgP1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sLmNyZWF0ZVNlbGVjdE9wdGlvbnNNb2Qoc2VsZWN0T3B0aW9ucy5zbGljZSgpLCByb3dJbmRleCwgY29sKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RPcHRpb25zXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0Q3JlYXRlSXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZShyb3dJbmRleCwgY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMub25DcmVhdGVDZWxsQmx1cihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoYWJsZT17c2VsZWN0T3B0aW9ucyAmJiAoc2VsZWN0T3B0aW9ucy5sZW5ndGggPiA5KX1cbiAgICAgICAgICAgICAgICAgICAgY2xlYXJhYmxlPXshY29sLmlzUmVxdWlyZWR9XG4gICAgICAgICAgICAgICAgICAgIGJhY2tzcGFjZVJlbW92ZXM9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICB0YWJTZWxlY3RzVmFsdWU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBvcGVuT25Gb2N1c1xuICAgICAgICAgICAgICAgICAgICByZWY9e3RoaXMuaGFuZGxlQ3JlYXRlQ2VsbFJlZihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICAgIGlkOiBgb2NEYXRhZ3JpZENyZWF0ZUlucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YCxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5jcmVhdGVDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnY3JlYXRlJyl9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgey4uLnNlbGVjdFRyYW5zbGF0aW9uc31cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuZmlsdGVyaW5nKSB7XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IChcbiAgICAgICAgICAgICAgICAgIDxGbG9hdGluZ1NlbGVjdFxuICAgICAgICAgICAgICAgICAgICBuYW1lPXtjb2wudmFsdWVLZXlQYXRoLmpvaW4oKSArICctZmlsdGVyJ31cbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucz17XG4gICAgICAgICAgICAgICAgICAgICAgY29sLmZpbHRlclNlbGVjdE9wdGlvbnNNb2QgJiYgc2VsZWN0T3B0aW9ucyA/XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2wuZmlsdGVyU2VsZWN0T3B0aW9uc01vZChzZWxlY3RPcHRpb25zLnNsaWNlKCksIGNvbCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0T3B0aW9uc31cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0RmlsdGVySXRlbVZhbHVlKGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uRmlsdGVyQ2VsbFZhbHVlQ2hhbmdlKGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoYWJsZT17c2VsZWN0T3B0aW9ucyAmJiAoc2VsZWN0T3B0aW9ucy5sZW5ndGggPiA5KX1cbiAgICAgICAgICAgICAgICAgICAgY2xlYXJhYmxlXG4gICAgICAgICAgICAgICAgICAgIHRhYlNlbGVjdHNWYWx1ZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIG9wZW5PbkZvY3VzXG4gICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICBpZDogYG9jRGF0YWdyaWRGaWx0ZXJJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fWAsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuZmlsdGVyQ29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgey4uLnNlbGVjdFRyYW5zbGF0aW9uc31cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNhc2UgJ2RhdGUnOiB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5pbmxpbmVFZGl0KSB7XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gKFxuICAgICAgICAgICAgICAgICAgPERhdGVJbnB1dFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkVkaXRDZWxsVmFsdWVDaGFuZ2Uocm93SW5kZXgsIGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgbG9jYWxlPXt0aGlzLnByb3BzLmxhbmd1YWdlfVxuICAgICAgICAgICAgICAgICAgICBkYXRlRm9ybWF0PXt0aGlzLnByb3BzLmRhdGVGb3JtYXR9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UmVmPXt0aGlzLmhhbmRsZUVkaXRDZWxsUmVmKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgaWQ6IGBvY0RhdGFncmlkRWRpdElucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YCxcbiAgICAgICAgICAgICAgICAgICAgICBvbktleURvd246IHRoaXMub25FZGl0Q2VsbEtleURvd24oY29sLCByb3dJbmRleCksXG4gICAgICAgICAgICAgICAgICAgICAgb25CbHVyOiB0aGlzLm9uRWRpdENlbGxCbHVyKHJvd0luZGV4LCBjb2wpLFxuICAgICAgICAgICAgICAgICAgICAgIG9uRm9jdXM6IHRoaXMub25DZWxsRm9jdXMoJ2VkaXQnLCBjb2wuY29tcG9uZW50VHlwZSwgcm93SW5kZXgsIGNvbHVtbi5jb2x1bW5LZXkpLFxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBjb2x1bW4uc3R5bGUsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuZWRpdENvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdlZGl0Jyl9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gKFxuICAgICAgICAgICAgICAgICAgPERhdGVJbnB1dFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRDcmVhdGVJdGVtVmFsdWUocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlKHJvd0luZGV4LCBjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5vbkNyZWF0ZUNlbGxLZXlEb3dufVxuICAgICAgICAgICAgICAgICAgICBsb2NhbGU9e3RoaXMucHJvcHMubGFuZ3VhZ2V9XG4gICAgICAgICAgICAgICAgICAgIGRhdGVGb3JtYXQ9e3RoaXMucHJvcHMuZGF0ZUZvcm1hdH1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRSZWY9e3RoaXMuaGFuZGxlQ3JlYXRlQ2VsbFJlZihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgIGlkOiBgb2NEYXRhZ3JpZENyZWF0ZUlucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YCxcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogY29sdW1uLnN0eWxlLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmNyZWF0ZUNvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdjcmVhdGUnKX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuZmlsdGVyaW5nKSB7XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IChcbiAgICAgICAgICAgICAgICAgIDxEYXRlSW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0RmlsdGVySXRlbVZhbHVlKGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uRmlsdGVyQ2VsbFZhbHVlQ2hhbmdlKGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgZGF0ZUZvcm1hdD17dGhpcy5wcm9wcy5kYXRlRm9ybWF0fVxuICAgICAgICAgICAgICAgICAgICBsb2NhbGU9e3RoaXMucHJvcHMubGFuZ3VhZ2V9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICBpZDogYG9jRGF0YWdyaWRGaWx0ZXJJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fWAsXG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IGNvbHVtbi5zdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5maWx0ZXJDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNhc2UgJ2Jvb2xlYW4nOiB7XG4gICAgICAgICAgICBjb25zdCB7IGludGwgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RPcHRpb25zID0gW1xuICAgICAgICAgICAgICB7IHZhbHVlOiB0cnVlLCBsYWJlbDogaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLlllcycgfSkgfSxcbiAgICAgICAgICAgICAgeyB2YWx1ZTogZmFsc2UsIGxhYmVsOiBpbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuTm8nIH0pIH0sXG4gICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RUcmFuc2xhdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50VHJhbnNsYXRpb25zIHx8IHtcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IGludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5TZWxlY3QnIH0pLFxuICAgICAgICAgICAgICBub1Jlc3VsdHNUZXh0OiBpbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuTm9SZXN1bHRzJyB9KSxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmlubGluZUVkaXQpIHtcbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiAoXG4gICAgICAgICAgICAgICAgICA8RmxvYXRpbmdTZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgbmFtZT17Y29sLnZhbHVlS2V5UGF0aC5qb2luKCkgKyAnLWVkaXQtJyArIHJvd0luZGV4fVxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zPXtzZWxlY3RPcHRpb25zfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkVkaXRDZWxsVmFsdWVDaGFuZ2Uocm93SW5kZXgsIGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLm9uRWRpdENlbGxCbHVyKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLm9uQ2VsbEZvY3VzKCdlZGl0JywgY29sLmNvbXBvbmVudFR5cGUsIHJvd0luZGV4LCBjb2x1bW4uY29sdW1uS2V5KX1cbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoYWJsZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyYWJsZT17IWNvbC5pc1JlcXVpcmVkfVxuICAgICAgICAgICAgICAgICAgICBiYWNrc3BhY2VSZW1vdmVzPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgdGFiU2VsZWN0c1ZhbHVlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgb3Blbk9uRm9jdXNcbiAgICAgICAgICAgICAgICAgICAgcmVmPXt0aGlzLmhhbmRsZUVkaXRDZWxsUmVmKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgaWQ6IGBvY0RhdGFncmlkRWRpdElucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YCxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5lZGl0Q29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2VkaXQnKX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgICAgICAgICB7Li4uc2VsZWN0VHJhbnNsYXRpb25zfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IChcbiAgICAgICAgICAgICAgICAgIDxGbG9hdGluZ1NlbGVjdFxuICAgICAgICAgICAgICAgICAgICBuYW1lPXtjb2wudmFsdWVLZXlQYXRoLmpvaW4oKSArICctY3JlYXRlLScgKyByb3dJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucz17c2VsZWN0T3B0aW9uc31cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0Q3JlYXRlSXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZShyb3dJbmRleCwgY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMub25DcmVhdGVDZWxsQmx1cihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoYWJsZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyYWJsZT17IWNvbC5pc1JlcXVpcmVkfVxuICAgICAgICAgICAgICAgICAgICBiYWNrc3BhY2VSZW1vdmVzPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgdGFiU2VsZWN0c1ZhbHVlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgb3Blbk9uRm9jdXNcbiAgICAgICAgICAgICAgICAgICAgcmVmPXt0aGlzLmhhbmRsZUNyZWF0ZUNlbGxSZWYocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICBpZDogYG9jRGF0YWdyaWRDcmVhdGVJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fS0ke3Jvd0luZGV4fWAsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuY3JlYXRlQ29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2NyZWF0ZScpfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5zZWxlY3RUcmFuc2xhdGlvbnN9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmZpbHRlcmluZykge1xuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8RmxvYXRpbmdTZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgbmFtZT17Y29sLnZhbHVlS2V5UGF0aC5qb2luKCkgKyAnLWZpbHRlcid9XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e3NlbGVjdE9wdGlvbnN9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldEZpbHRlckl0ZW1WYWx1ZShjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkZpbHRlckNlbGxWYWx1ZUNoYW5nZShjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaGFibGU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBjbGVhcmFibGVcbiAgICAgICAgICAgICAgICAgICAgdGFiU2VsZWN0c1ZhbHVlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgb3Blbk9uRm9jdXNcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICAgIGlkOiBgb2NEYXRhZ3JpZEZpbHRlcklucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9YCxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5maWx0ZXJDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgICAgICAgICB7Li4uc2VsZWN0VHJhbnNsYXRpb25zfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29sdW1ucy5wdXNoKGNvbHVtbik7XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5pc0NyZWF0aW5nKSB7XG4gICAgICBjb2x1bW5zLnB1c2goe1xuICAgICAgICB3aWR0aDogMzcsXG4gICAgICAgIGlzUmVzaXphYmxlOiBmYWxzZSxcbiAgICAgICAgY29sdW1uS2V5OiAncmVtb3ZlTmV3SXRlbScsXG4gICAgICAgIGNlbGw6ICgpID0+IG51bGwsXG4gICAgICAgIGNlbGxFZGl0OiAoKSA9PiBudWxsLFxuICAgICAgICBjZWxsQ3JlYXRlOiByb3dJbmRleCA9PiAoXG4gICAgICAgICAgPEljb25cbiAgICAgICAgICAgIGlkPXtgb2MtZGF0YWdyaWQtbmV3LWl0ZW0tcmVtb3ZlLSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke3Jvd0luZGV4fWB9XG4gICAgICAgICAgICB0eXBlPVwiaW5kaWNhdG9yXCJcbiAgICAgICAgICAgIG5hbWU9XCJkZWxldGVcIlxuICAgICAgICAgICAgd2lkdGg9ezMwfVxuICAgICAgICAgICAgaGVpZ2h0PXszMH1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMucHJvcHMucmVtb3ZlTmV3SXRlbSh0aGlzLnByb3BzLmdyaWQsIHJvd0luZGV4KX1cbiAgICAgICAgICAvPlxuICAgICAgICApLFxuICAgICAgICBjZWxsRmlsdGVyOiAoKSA9PiBudWxsLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBjb2x1bW5zO1xuICB9XG5cbiAgaXNDZWxsRWRpdGVkID0gKHJvd0luZGV4LCBjb2wsIGNlbGxUeXBlKSA9PiB7XG4gICAgaWYgKGNlbGxUeXBlICE9PSAnZWRpdCcpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgaWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgIGlmICh0aGlzLnByb3BzLmVkaXREYXRhLmdldEluKFtpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gY2hlY2tlciBmb3Igc2VsZWN0aW9uQ2hlY2tib3hcbiAgaXNTZWxlY3Rpb25DaGVja2JveChjZWxsUHJvcHMpIHtcbiAgICBjb25zdCBleHBlY3RlZENvbHVtbktleSA9ICdzZWxlY3Rpb25DaGVja2JveCc7XG4gICAgcmV0dXJuICh0aGlzLnByb3BzLnJvd1NlbGVjdENoZWNrYm94Q29sdW1uICYmIGNlbGxQcm9wcy5jb2x1bW5LZXkgPT09IGV4cGVjdGVkQ29sdW1uS2V5KTtcbiAgfVxuXG4gIGhhbmRsZUFmdGVyQWRkSXRlbSA9ICgpID0+IHtcbiAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsID0gdHJ1ZTtcbiAgfVxuXG4gIGhhbmRsZUFmdGVyRWRpdFByZXNzID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuc2l6ZSkge1xuICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSB0cnVlO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGN1cnJlbnRSb3c6IHVuZGVmaW5lZCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUFmdGVyVmFsaWRhdGlvbkVycm9yID0gKCkgPT4ge1xuICAgIHRoaXMuZm9jdXNUb0Vycm9yQ2VsbCA9IHRydWU7XG4gIH1cblxuICBoYW5kbGVSb3dDbGljayA9IChlLCByb3dJbmRleCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnJvd1NlbGVjdCAmJiAhdGhpcy5wcm9wcy5pc0NyZWF0aW5nICYmICF0aGlzLnByb3BzLmlzRWRpdGluZykge1xuICAgICAgaWYgKGUuY3RybEtleSB8fCBlLnNoaWZ0S2V5KSB7XG4gICAgICAgIGRvY3VtZW50LmdldFNlbGVjdGlvbigpLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgfVxuICAgICAgLy8gZG9uJ3QgdHJpZ2dlciBzZWxlY3Rpb24gY2hhbmdlIG9uIGNoZWNrYm94IGNsaWNrXG4gICAgICBpZiAoZS50YXJnZXQudHlwZSAhPT0gJ2NoZWNrYm94Jykge1xuICAgICAgICB0aGlzLnByb3BzLml0ZW1TZWxlY3Rpb25DaGFuZ2UoXG4gICAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgIHRoaXMucHJvcHMubXVsdGlTZWxlY3QgJiYgZS5jdHJsS2V5LFxuICAgICAgICAgIHRoaXMucHJvcHMubXVsdGlTZWxlY3QgJiYgZS5zaGlmdEtleSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMub25Sb3dDbGljaykge1xuICAgICAgdGhpcy5wcm9wcy5vblJvd0NsaWNrKGUsIHJvd0luZGV4LCB0aGlzLnByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmVuZGVyQ2VsbCA9IGNvbCA9PiAoY2VsbFByb3BzKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgaXNDcmVhdGluZyxcbiAgICAgIGlzRWRpdGluZyxcbiAgICAgIGNyZWF0ZURhdGEsXG4gICAgICBzZWxlY3RlZENlbGwsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyByb3dJbmRleCwgLi4ucHJvcHMgfSA9IGNlbGxQcm9wcztcbiAgICBjb25zdCBpc0NoZWNrYm94ID0gdGhpcy5pc1NlbGVjdGlvbkNoZWNrYm94KGNlbGxQcm9wcyk7XG4gICAgbGV0IGNlbGw7XG4gICAgbGV0IGNlbGxUeXBlID0gJ3ZpZXcnO1xuICAgIGxldCBleHRyYVJvd0NvdW50ID0gMDsgLy8gaG93IG1hbnkgcm93cyB0byBpZ25vcmUgZnJvbSB0b3AsIG5ldyArIGZpbHRlciByb3dzXG4gICAgaWYgKGlzQ3JlYXRpbmcpIGV4dHJhUm93Q291bnQgPSBjcmVhdGVEYXRhLnNpemU7XG4gICAgaWYgKGlzQ3JlYXRpbmcpIHtcbiAgICAgIGlmIChyb3dJbmRleCA8PSAoZXh0cmFSb3dDb3VudCAtIDEpKSB7XG4gICAgICAgIGlmIChjb2wuY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNlbGwgPSBjb2wuY2VsbENyZWF0ZShyb3dJbmRleCk7XG4gICAgICAgICAgY2VsbFR5cGUgPSAnY3JlYXRlJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjZWxsID0gbnVsbDtcbiAgICAgICAgICBjZWxsVHlwZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNlbGwgPSBjb2wuY2VsbChyb3dJbmRleCAtIGV4dHJhUm93Q291bnQpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNFZGl0aW5nICYmIGNvbC5jZWxsRWRpdCkge1xuICAgICAgY2VsbCA9IGNvbC5jZWxsRWRpdChyb3dJbmRleCAtIGV4dHJhUm93Q291bnQpO1xuICAgICAgY2VsbFR5cGUgPSAnZWRpdCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNlbGwgPSBjb2wuY2VsbChyb3dJbmRleCAtIGV4dHJhUm93Q291bnQpO1xuICAgIH1cbiAgICBpZiAoKGNlbGxUeXBlID09PSAndmlldycgfHwgY2VsbFR5cGUgPT09ICdlZGl0JyB8fCBjZWxsVHlwZSA9PT0gJ2NyZWF0ZScpICYmICFpc0NoZWNrYm94KSB7XG4gICAgICBjb25zdCBnZXRSb3dJbmRleCA9IChjZWxsVHlwZSA9PT0gJ2NyZWF0ZScpID8gcm93SW5kZXggOiAocm93SW5kZXggLSBleHRyYVJvd0NvdW50KTtcbiAgICAgIGNvbnN0IG1lc3NhZ2VEYXRhID0gdGhpcy5nZXRDZWxsTWVzc2FnZXMoZ2V0Um93SW5kZXgsIGNvbCwgY2VsbFR5cGUpO1xuICAgICAgY29uc3QgaXNFZGl0ZWQgPSB0aGlzLmlzQ2VsbEVkaXRlZChnZXRSb3dJbmRleCwgY29sLCBjZWxsVHlwZSk7XG4gICAgICBjb25zdCBjbGFzc05hbWUgPSAoc2VsZWN0ZWRDZWxsLmdldCgncm93SW5kZXgnKSA9PT0gcm93SW5kZXggJiYgc2VsZWN0ZWRDZWxsLmdldCgnY29sdW1uS2V5JykgPT09IHByb3BzLmNvbHVtbktleSkgP1xuICAgICAgICAnb2MtZGF0YWdyaWQtY2VsbCBpcy1zZWxlY3RlZCcgOiAnb2MtZGF0YWdyaWQtY2VsbCc7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Q2VsbFxuICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgICAgICBzdHlsZT17Y29sLnN0eWxlfVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2VsbFNlbGVjdChjZWxsVHlwZSwgcm93SW5kZXgsIHByb3BzLmNvbHVtbktleSl9XG4gICAgICAgID5cbiAgICAgICAgICA8Q2VsbFRvb2x0aXBcbiAgICAgICAgICAgIGlkPXtjZWxsVHlwZSArIGNvbC5jb2x1bW5LZXkgKyAocm93SW5kZXggLSBleHRyYVJvd0NvdW50KX1cbiAgICAgICAgICAgIGlzRWRpdGVkPXtpc0VkaXRlZH1cbiAgICAgICAgICAgIGlzRXJyb3I9eyEhbWVzc2FnZURhdGEuZXJyb3JNZXNzYWdlfVxuICAgICAgICAgICAgaXNXYXJuaW5nPXshIW1lc3NhZ2VEYXRhLndhcm5pbmdNZXNzYWdlfVxuICAgICAgICAgICAgaW5mb01lc3NhZ2U9e21lc3NhZ2VEYXRhLmluZm9NZXNzYWdlfVxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlPXttZXNzYWdlRGF0YS5lcnJvck1lc3NhZ2V9XG4gICAgICAgICAgICB3YXJuaW5nTWVzc2FnZT17bWVzc2FnZURhdGEud2FybmluZ01lc3NhZ2V9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgeyBjZWxsIH1cbiAgICAgICAgICA8L0NlbGxUb29sdGlwPlxuICAgICAgICA8L0NlbGw+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPENlbGwgey4uLnByb3BzfSBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1jZWxsXCIgc3R5bGU9e2NvbC5zdHlsZX0+eyBjZWxsIH08L0NlbGw+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlckNvbHVtbnMgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmFsbERhdGFTaXplICYmICF0aGlzLnByb3BzLmlzQnVzeSAmJiAhdGhpcy5wcm9wcy5pc0NyZWF0aW5nKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Q29sdW1uXG4gICAgICAgICAgY29sdW1uS2V5PVwiZGF0YUVtcHR5Q29sdW1uXCJcbiAgICAgICAgICBoZWFkZXI9ezxDZWxsIHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicgfX0+PE0gaWQ9XCJHcmlkLk5vSXRlbXNcIiAvPjwvQ2VsbD59XG4gICAgICAgICAgd2lkdGg9ezEwfVxuICAgICAgICAgIGlzUmVzaXphYmxlPXtmYWxzZX1cbiAgICAgICAgICBmbGV4R3Jvdz17MX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICAgIGlmICghdGhpcy5wcm9wcy52aXNpYmxlQ29sdW1ucy5zaXplKSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5pc0J1c3kpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8Q29sdW1uXG4gICAgICAgICAgICBjb2x1bW5LZXk9XCJkYXRhRW1wdHlDb2x1bW5cIlxuICAgICAgICAgICAgaGVhZGVyPXs8Q2VsbD4mbmJzcDs8L0NlbGw+fVxuICAgICAgICAgICAgd2lkdGg9ezEwfVxuICAgICAgICAgICAgaXNSZXNpemFibGU9e2ZhbHNlfVxuICAgICAgICAgICAgZmxleEdyb3c9ezF9XG4gICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxDb2x1bW5cbiAgICAgICAgICBjb2x1bW5LZXk9XCJkYXRhRW1wdHlDb2x1bW5cIlxuICAgICAgICAgIGhlYWRlcj17PENlbGwgc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJyB9fT48TSBpZD1cIkdyaWQuTm9Db2x1bW5zXCIgLz48L0NlbGw+fVxuICAgICAgICAgIHdpZHRoPXsxMH1cbiAgICAgICAgICBpc1Jlc2l6YWJsZT17ZmFsc2V9XG4gICAgICAgICAgZmxleEdyb3c9ezF9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCBjb2x1bW5zID0gdGhpcy5nZW5lcmF0ZUNvbHVtbnMoKTtcbiAgICBpZiAoY29sdW1ucy5sZW5naHQgPT09IDApIHJldHVybiBudWxsO1xuICAgIHJldHVybiBjb2x1bW5zLm1hcChjb2wgPT4gKFxuICAgICAgPENvbHVtblxuICAgICAgICBrZXk9e2NvbC5jb2x1bW5LZXl9XG4gICAgICAgIGNvbHVtbktleT17Y29sLmNvbHVtbktleX1cbiAgICAgICAgaGVhZGVyPXtcbiAgICAgICAgICA8SGVhZGVyQ2VsbFxuICAgICAgICAgICAgZ3JpZD17dGhpcy5wcm9wcy5ncmlkfVxuICAgICAgICAgICAgY29sdW1ucz17dGhpcy5wcm9wcy5jb2x1bW5zfVxuICAgICAgICAgICAgY29sdW1uPXtjb2x9XG4gICAgICAgICAgICBjdXJyZW50U29ydENvbHVtbj17dGhpcy5wcm9wcy5zb3J0Q29sdW1ufVxuICAgICAgICAgICAgY3VycmVudFNvcnRPcmRlcj17dGhpcy5wcm9wcy5zb3J0T3JkZXJ9XG4gICAgICAgICAgICBvblNvcnRDaGFuZ2U9e3RoaXMucHJvcHMuc29ydENoYW5nZX1cbiAgICAgICAgICAgIGlzQnVzeT17dGhpcy5wcm9wcy5pc0J1c3l9XG4gICAgICAgICAgICBmaWx0ZXJpbmc9e3RoaXMucHJvcHMuaXNGaWx0ZXJpbmd9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2NvbC5oZWFkZXJ9XG4gICAgICAgICAgPC9IZWFkZXJDZWxsPlxuICAgICAgICB9XG4gICAgICAgIGNlbGw9e3RoaXMucmVuZGVyQ2VsbChjb2wpfVxuICAgICAgICB3aWR0aD17dGhpcy5wcm9wcy5jb2x1bW5XaWR0aHMuZ2V0KGNvbC5jb2x1bW5LZXksIGNvbC53aWR0aCl9XG4gICAgICAgIG1pbldpZHRoPXtjb2wubWluV2lkdGh9XG4gICAgICAgIG1heFdpZHRoPXtjb2wubWF4V2lkdGh9XG4gICAgICAgIGlzUmVzaXphYmxlPXtjb2wuaXNSZXNpemFibGV9XG4gICAgICAgIGZsZXhHcm93PXtjb2wuZmxleEdyb3cgPyBjb2wuZmxleEdyb3cgOiAwfVxuICAgICAgICBmaXhlZD17Y29sLmZpeGVkfVxuICAgICAgICBhbGxvd0NlbGxzUmVjeWNsaW5nPXtjb2wuYWxsb3dDZWxsc1JlY3ljbGluZ31cbiAgICAgIC8+KSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgZ3JpZENsYXNzTmFtZSA9IGNsYXNzTmFtZXMoe1xuICAgICAgJ29jLWRhdGFncmlkLWNvbnRhaW5lcic6IHRydWUsXG4gICAgICAnd2l0aC1hY3Rpb25iYXInOiB0aGlzLnByb3BzLmlubGluZUVkaXQgJiYgIXRoaXMucHJvcHMuZGlzYWJsZUFjdGlvbkJhcixcbiAgICAgICdpcy1idXN5JzogdGhpcy5wcm9wcy5pc0J1c3ksXG4gICAgICAnaXMtZWRpdGluZyc6IHRoaXMucHJvcHMuaXNFZGl0aW5nLFxuICAgICAgJ2lzLWNyZWF0aW5nJzogdGhpcy5wcm9wcy5pc0NyZWF0aW5nLFxuICAgIH0pO1xuICAgIGxldCBhY3Rpb25CYXIgPSBudWxsO1xuICAgIGxldCBhY3Rpb25CYXJSaWdodCA9IG51bGw7XG4gICAgbGV0IGFjdGlvbkJhckxlZnQgPSBudWxsO1xuICAgIGlmIChcbiAgICAgICh0aGlzLnByb3BzLmFjdGlvbkJhciB8fFxuICAgICAgdGhpcy5wcm9wcy5pbmxpbmVFZGl0IHx8XG4gICAgICB0aGlzLnByb3BzLmZpbHRlcmluZyB8fFxuICAgICAgdGhpcy5wcm9wcy5yZW1vdmluZykgJiZcbiAgICAgICF0aGlzLnByb3BzLmRpc2FibGVBY3Rpb25CYXJcbiAgICApIHtcbiAgICAgIGFjdGlvbkJhclJpZ2h0ID0gKFxuICAgICAgICA8QWN0aW9uQmFyIHBvc2l0aW9uPVwicmlnaHRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWFjdGlvbmJhci1yaWdodFwiPnsgdGhpcy5wcm9wcy5hY3Rpb25CYXIgfTwvZGl2PlxuICAgICAgICAgIHsgKHRoaXMucHJvcHMuZmlsdGVyaW5nICYmIHRoaXMucHJvcHMuZGlzYWJsZURyb3Bkb3duXG4gICAgICAgICAgICAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlRmlsdGVyaW5nQ29udHJvbHMpICYmXG4gICAgICAgICAgICA8RmlsdGVyaW5nQ29udHJvbHMgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICAgfVxuICAgICAgICAgIHsgdGhpcy5wcm9wcy5pbmxpbmVFZGl0ICYmXG4gICAgICAgICAgICA8SW5saW5lRWRpdENvbnRyb2xzXG4gICAgICAgICAgICAgIGFmdGVyQWRkSXRlbT17dGhpcy5oYW5kbGVBZnRlckFkZEl0ZW19XG4gICAgICAgICAgICAgIGFmdGVyRWRpdFByZXNzPXt0aGlzLmhhbmRsZUFmdGVyRWRpdFByZXNzfVxuICAgICAgICAgICAgICBhZnRlclZhbGlkYXRpb25FcnJvcj17dGhpcy5oYW5kbGVBZnRlclZhbGlkYXRpb25FcnJvcn1cbiAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIH1cbiAgICAgICAgICB7ICh0aGlzLnByb3BzLmRyb3Bkb3duTWVudUl0ZW1zIHx8XG4gICAgICAgICAgICAgdGhpcy5wcm9wcy5yZW1vdmluZyB8fFxuICAgICAgICAgICAgIHRoaXMucHJvcHMuY29sdW1uU2V0dGluZ3MgfHxcbiAgICAgICAgICAgICAodGhpcy5wcm9wcy5maWx0ZXJpbmcgJiYgIXRoaXMucHJvcHMuZGlzYWJsZURyb3Bkb3duKSkgJiZcbiAgICAgICAgICAgICA8RHJvcGRvd25Db250cm9scyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgICB9XG4gICAgICAgIDwvQWN0aW9uQmFyPlxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuYWN0aW9uQmFyTGVmdCB8fCB0aGlzLnByb3BzLmdyaWRIZWFkZXIpIHtcbiAgICAgIGFjdGlvbkJhckxlZnQgPSAoXG4gICAgICAgIDxBY3Rpb25CYXIgcG9zaXRpb249XCJsZWZ0XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1ncmlkaGVhZGVyXCI+eyB0aGlzLnByb3BzLmdyaWRIZWFkZXIgfTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtYWN0aW9uYmFyLWxlZnRcIj57IHRoaXMucHJvcHMuYWN0aW9uQmFyTGVmdCB9PC9kaXY+XG4gICAgICAgIDwvQWN0aW9uQmFyPlxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGFjdGlvbkJhckxlZnQgfHwgYWN0aW9uQmFyUmlnaHQpIHtcbiAgICAgIGFjdGlvbkJhciA9IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1hY3Rpb25iYXItY29udGFpbmVyXCI+XG4gICAgICAgICAgeyBhY3Rpb25CYXJMZWZ0IH1cbiAgICAgICAgICB7IGFjdGlvbkJhclJpZ2h0IH1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgICBsZXQgcm93c0NvdW50ID1cbiAgICAgICh0aGlzLnByb3BzLnJvd3NDb3VudCB8fCB0aGlzLnByb3BzLnJvd3NDb3VudCA9PT0gMCkgP1xuICAgICAgICB0aGlzLnByb3BzLnJvd3NDb3VudCA6XG4gICAgICAgIHRoaXMucHJvcHMuZGF0YS5zaXplO1xuICAgIGlmICh0aGlzLnByb3BzLmlzQ3JlYXRpbmcpIHJvd3NDb3VudCArPSB0aGlzLnByb3BzLmNyZWF0ZURhdGEuc2l6ZTtcbiAgICBpZiAoIXRoaXMucHJvcHMudmlzaWJsZUNvbHVtbnMuc2l6ZSkgcm93c0NvdW50ID0gMDtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD17YG9jLWRhdGFncmlkLSR7dGhpcy5wcm9wcy5ncmlkLmlkfWB9XG4gICAgICAgIGNsYXNzTmFtZT17Z3JpZENsYXNzTmFtZX1cbiAgICAgICAgc3R5bGU9e3RoaXMucHJvcHMuY29udGFpbmVyU3R5bGV9XG4gICAgICA+XG4gICAgICAgIHsgdGhpcy5wcm9wcy5pc0J1c3kgJiYgPFNwaW5uZXIgLz4gfVxuICAgICAgICB7IGFjdGlvbkJhciB9XG4gICAgICAgIDxSZXNwb25zaXZlRml4ZWREYXRhVGFibGVcbiAgICAgICAgICBpZD17dGhpcy5wcm9wcy5ncmlkLmlkfVxuICAgICAgICAgIHJvd3NDb3VudD17cm93c0NvdW50fVxuICAgICAgICAgIGhlYWRlckhlaWdodD17dGhpcy5wcm9wcy5pc0ZpbHRlcmluZyA/XG4gICAgICAgICAgICB0aGlzLnByb3BzLmhlYWRlckhlaWdodCArIHRoaXMucHJvcHMuZmlsdGVyUm93SGVpZ2h0XG4gICAgICAgICAgICA6IHRoaXMucHJvcHMuaGVhZGVySGVpZ2h0fVxuICAgICAgICAgIHJvd0hlaWdodD17dGhpcy5wcm9wcy5yb3dIZWlnaHR9XG4gICAgICAgICAgb25Db2x1bW5SZXNpemVFbmRDYWxsYmFjaz17dGhpcy5vbkNvbHVtblJlc2l6ZUVuZENhbGxiYWNrfVxuICAgICAgICAgIGlzQ29sdW1uUmVzaXppbmc9e2ZhbHNlfVxuICAgICAgICAgIG9uUm93Q2xpY2s9e3RoaXMuaGFuZGxlUm93Q2xpY2t9XG4gICAgICAgICAgc2Nyb2xsVG9Db2x1bW49e3RoaXMucHJvcHMuc2Nyb2xsVG9Db2x1bW4gfHwgdGhpcy5zdGF0ZS5jdXJyZW50Q29sdW1ufVxuICAgICAgICAgIHNjcm9sbFRvcD17dGhpcy5wcm9wcy5zY3JvbGxUb3B9XG4gICAgICAgICAgc2Nyb2xsVG9Sb3c9e3RoaXMuZ2V0U2Nyb2xsVG9Sb3coKX1cbiAgICAgICAgICBvblJvd0RvdWJsZUNsaWNrPXt0aGlzLnByb3BzLm9uUm93RG91YmxlQ2xpY2t9XG4gICAgICAgICAgb25Sb3dNb3VzZURvd249e3RoaXMucHJvcHMub25Sb3dNb3VzZURvd259XG4gICAgICAgICAgb25Sb3dNb3VzZUVudGVyPXt0aGlzLnByb3BzLm9uUm93TW91c2VFbnRlcn1cbiAgICAgICAgICBvblJvd01vdXNlTGVhdmU9e3RoaXMucHJvcHMub25Sb3dNb3VzZUxlYXZlfVxuICAgICAgICAgIG9uU2Nyb2xsU3RhcnQ9e3RoaXMucHJvcHMub25TY3JvbGxTdGFydH1cbiAgICAgICAgICBvblNjcm9sbEVuZD17dGhpcy5wcm9wcy5vblNjcm9sbEVuZH1cbiAgICAgICAgICByb3dDbGFzc05hbWVHZXR0ZXI9e3RoaXMuZ2V0Um93Q2xhc3NOYW1lfVxuICAgICAgICAgIHJvd0hlaWdodEdldHRlcj17dGhpcy5wcm9wcy5yb3dIZWlnaHRHZXR0ZXJ9XG4gICAgICAgICAgb25Db250ZW50SGVpZ2h0Q2hhbmdlPXt0aGlzLnByb3BzLm9uQ29udGVudEhlaWdodENoYW5nZX1cbiAgICAgICAgPlxuICAgICAgICAgIHsgdGhpcy5yZW5kZXJDb2x1bW5zKCkgfVxuICAgICAgICA8L1Jlc3BvbnNpdmVGaXhlZERhdGFUYWJsZT5cbiAgICAgICAgeyB0aGlzLnByb3BzLmlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW4gJiZcbiAgICAgICAgICA8Q29sdW1uU2V0dGluZ3NNb2RhbFxuICAgICAgICAgICAgZ3JpZD17dGhpcy5wcm9wcy5ncmlkfVxuICAgICAgICAgICAgY29sdW1ucz17dGhpcy5wcm9wcy5jb2x1bW5zfVxuICAgICAgICAgICAgdmlzaWJsZUNvbHVtbnM9e3RoaXMucHJvcHMudmlzaWJsZUNvbHVtbnN9XG4gICAgICAgICAgICBjbG9zZUNvbHVtblNldHRpbmdzTW9kYWw9e3RoaXMucHJvcHMuY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsfVxuICAgICAgICAgICAgc2F2ZUNvbHVtblNldHRpbmdzPXt0aGlzLnByb3BzLnNhdmVDb2x1bW5TZXR0aW5nc31cbiAgICAgICAgICAvPlxuICAgICAgICB9XG4gICAgICAgIHsgdGhpcy5wcm9wcy5jaGlsZHJlbiB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=