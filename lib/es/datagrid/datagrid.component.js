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
    if (col.componentType === 'date') {
      if (moment(originalValue, _this2.props.dateFormat, true).isValid()) {
        return moment.utc(originalValue, _this2.props.dateFormat).format(_this2.props.dateFormat);
      }
      if (moment(originalValue).isValid()) {
        return moment.utc(originalValue).format(_this2.props.dateFormat);
      }
      return '';
    } else if (col.componentType === 'float' && String(originalValue).length > 0) {
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
              var selectOptions = col.selectComponentOptions || _this2.props.selectComponentOptions.get(column.columnKey);
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
                    }));
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
                    }));
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
                    }));
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
                      language: _this2.props.language,
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
                      language: _this2.props.language,
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
                      language: _this2.props.language,
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
              var _selectOptions = [{ value: true, label: _this2.props.intl.formatMessage({ id: 'Grid.Yes' }) }, { value: false, label: _this2.props.intl.formatMessage({ id: 'Grid.No' }) }];
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
                    }));
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
                    }));
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
                    }));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiTWFwIiwiTGlzdCIsImNvbm5lY3QiLCJpbmplY3RJbnRsIiwiRm9ybWF0dGVkTWVzc2FnZSIsIk0iLCJGb3JtYXR0ZWROdW1iZXIiLCJOIiwiQ29sdW1uIiwiQ2VsbCIsIkNoZWNrYm94IiwiRm9ybUNvbnRyb2wiLCJjbGFzc05hbWVzIiwibW9tZW50IiwiRmxvYXRpbmdTZWxlY3QiLCJEYXRlSW5wdXQiLCJJY29uIiwiU3Bpbm5lciIsIlJlc3BvbnNpdmVGaXhlZERhdGFUYWJsZSIsIkhlYWRlckNlbGwiLCJBY3Rpb25CYXIiLCJJbmxpbmVFZGl0Q29udHJvbHMiLCJGaWx0ZXJpbmdDb250cm9scyIsIkRyb3Bkb3duQ29udHJvbHMiLCJkYXRhZ3JpZEFjdGlvbnMiLCJDZWxsVG9vbHRpcCIsIkNvbHVtblNldHRpbmdzTW9kYWwiLCJwcm9wVHlwZXMiLCJkZWZhdWx0UHJvcHMiLCJLRVlfQ09ERVMiLCJVdGlscyIsIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwib3duUHJvcHMiLCJHUklEIiwiZ3JpZCIsImlzQnVzeSIsImRhdGFncmlkIiwiZ2V0SW4iLCJpZCIsImlzRWRpdGluZyIsImlzQ3JlYXRpbmciLCJpc0ZpbHRlcmluZyIsImlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW4iLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwidmlzaWJsZUNvbHVtbnMiLCJjb2x1bW5XaWR0aHMiLCJzZWxlY3RlZENlbGwiLCJzZWxlY3RlZEl0ZW1zIiwiZGF0YSIsImVkaXREYXRhIiwiY3JlYXRlRGF0YSIsImZpbHRlckRhdGEiLCJjZWxsTWVzc2FnZXMiLCJjcmVhdGVDZWxsTWVzc2FnZXMiLCJhbGxEYXRhU2l6ZSIsInNpemUiLCJsYW5ndWFnZSIsImdldExhbmd1YWdlIiwidXNlciIsImRhdGVGb3JtYXQiLCJnZXREYXRlRm9ybWF0IiwidGhvdXNhbmRTZXBhcmF0b3IiLCJnZXRUaG91c2FuZFNlcGFyYXRvciIsImRlY2ltYWxTZXBhcmF0b3IiLCJnZXREZWNpbWFsU2VwYXJhdG9yIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwiRGF0YUdyaWQiLCJwcm9wcyIsImN1cnJlbnRSb3ciLCJjdXJyZW50Q29sdW1uIiwiY2VsbFJlZnMiLCJmb2N1c1RvQ3JlYXRlQ2VsbCIsImZvY3VzVG9FZGl0Q2VsbCIsImZvY3VzVG9FcnJvckNlbGwiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImludmFsaWRhdGUiLCJpc1NlbGVjdGlvbkNoZWNrYm94IiwiY2VsbFByb3BzIiwiZXhwZWN0ZWRDb2x1bW5LZXkiLCJyb3dTZWxlY3RDaGVja2JveENvbHVtbiIsImNvbHVtbktleSIsInJlbmRlciIsImdyaWRDbGFzc05hbWUiLCJpbmxpbmVFZGl0IiwiZGlzYWJsZUFjdGlvbkJhciIsImFjdGlvbkJhciIsImFjdGlvbkJhclJpZ2h0IiwiYWN0aW9uQmFyTGVmdCIsImZpbHRlcmluZyIsInJlbW92aW5nIiwiZGlzYWJsZURyb3Bkb3duIiwiZGlzYWJsZUZpbHRlcmluZ0NvbnRyb2xzIiwiaGFuZGxlQWZ0ZXJBZGRJdGVtIiwiaGFuZGxlQWZ0ZXJFZGl0UHJlc3MiLCJoYW5kbGVBZnRlclZhbGlkYXRpb25FcnJvciIsImRyb3Bkb3duTWVudUl0ZW1zIiwiY29sdW1uU2V0dGluZ3MiLCJncmlkSGVhZGVyIiwicm93c0NvdW50IiwiY29udGFpbmVyU3R5bGUiLCJoZWFkZXJIZWlnaHQiLCJmaWx0ZXJSb3dIZWlnaHQiLCJyb3dIZWlnaHQiLCJvbkNvbHVtblJlc2l6ZUVuZENhbGxiYWNrIiwiaGFuZGxlUm93Q2xpY2siLCJzY3JvbGxUb0NvbHVtbiIsInNjcm9sbFRvcCIsImdldFNjcm9sbFRvUm93Iiwib25Sb3dEb3VibGVDbGljayIsIm9uUm93TW91c2VEb3duIiwib25Sb3dNb3VzZUVudGVyIiwib25Sb3dNb3VzZUxlYXZlIiwib25TY3JvbGxTdGFydCIsIm9uU2Nyb2xsRW5kIiwiZ2V0Um93Q2xhc3NOYW1lIiwicm93SGVpZ2h0R2V0dGVyIiwib25Db250ZW50SGVpZ2h0Q2hhbmdlIiwicmVuZGVyQ29sdW1ucyIsImNvbHVtbnMiLCJjbG9zZUNvbHVtblNldHRpbmdzTW9kYWwiLCJzYXZlQ29sdW1uU2V0dGluZ3MiLCJjaGlsZHJlbiIsIlB1cmVDb21wb25lbnQiLCJuZXdDb2x1bW5XaWR0aCIsInJlc2l6ZUNvbHVtbiIsIm9uQ3JlYXRlQ2VsbEtleURvd24iLCJlIiwia2V5Q29kZSIsIkVOVEVSIiwiYWRkTmV3SXRlbSIsImdldENvbHVtbkRlZmF1bHRWYWx1ZXMiLCJvbkVkaXRDZWxsS2V5RG93biIsImNvbCIsInJvd0luZGV4IiwiZW5hYmxlQXJyb3dOYXZpZ2F0aW9uIiwicm93c1NpemUiLCJnZXRDb2x1bW5LZXkiLCJET1dOIiwidmFsdWVUeXBlIiwibmV4dEVsZW1lbnQiLCJtb3ZlQ2VsbEZvY3VzIiwiVVAiLCJUQUIiLCJSSUdIVCIsIkxFRlQiLCJwcmV2ZW50RGVmYXVsdCIsImNvbHVtbkluZCIsImZpbmRJbmRleCIsImMiLCJ2YWx1ZUtleVBhdGgiLCJqb2luIiwiZGlzYWJsZWQiLCJyb3dJbmQiLCJzaGlmdEtleSIsImxlbmd0aCIsIm5leHRDb2x1bW5LZXkiLCJvbkZpbHRlckNlbGxWYWx1ZUNoYW5nZSIsInZhbHVlUGFyc2VyIiwiZXZlbnRPckRhdGEiLCJyYXdWYWx1ZSIsInRhcmdldCIsInVuZGVmaW5lZCIsInZhbHVlIiwiZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlIiwib25DcmVhdGVDZWxsVmFsdWVDaGFuZ2UiLCJjcmVhdGVDZWxsVmFsdWVDaGFuZ2UiLCJvbkNyZWF0ZVZhbHVlQ2hhbmdlIiwib25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUiLCJtYXRjaFZhbHVlIiwibmV3VmFsdWVLZXlQYXRoIiwidiIsIm5ld1ZhbHVlIiwidmFsaWRhdG9ycyIsImNyZWF0ZUNlbGxWYWx1ZVZhbGlkYXRlIiwib25FZGl0Q2VsbFZhbHVlQ2hhbmdlIiwiZGF0YUlkIiwiZ2V0RGF0YUlkQnlSb3dJbmRleCIsImVkaXRDZWxsVmFsdWVDaGFuZ2UiLCJvbkVkaXRWYWx1ZUNoYW5nZSIsImVkaXRDZWxsVmFsdWVWYWxpZGF0ZSIsIm9uQ3JlYXRlQ2VsbEJsdXIiLCJvbkNyZWF0ZUJsdXIiLCJnZXRFZGl0SXRlbVZhbHVlIiwib25FZGl0Q2VsbEJsdXIiLCJvbkVkaXRCbHVyIiwib25DZWxsRm9jdXMiLCJjZWxsVHlwZSIsImlucHV0VHlwZSIsInNlbGVjdCIsImNlbGxTZWxlY3QiLCJjZWxsU2VsZWN0aW9uQ2hhbmdlIiwiaWRLZXlQYXRoIiwiZ2V0U2VsZWN0ZWRJdGVtSW5kZXgiLCJpbmRleCIsImVkaXRWYWx1ZSIsIm9yaWdpbmFsVmFsdWUiLCJjb21wb25lbnRUeXBlIiwiaXNWYWxpZCIsInV0YyIsImZvcm1hdCIsIlN0cmluZyIsInJlcGxhY2UiLCJnZXRDcmVhdGVJdGVtVmFsdWUiLCJ2YWwiLCJnZXRGaWx0ZXJJdGVtVmFsdWUiLCJnZXQiLCJnZXRDb21wb25lbnREaXNhYmxlZFN0YXRlIiwibW9kZSIsImNvbXBvbmVudERpc2FibGVkIiwiZGlzYWJsZUVkaXRpbmciLCJkaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaCIsIm1hdGNoVmFsdWVLZXlQYXRoIiwicm93Q2xhc3NOYW1lcyIsImV4dHJhUm93Q291bnQiLCJwdXNoIiwiaW5kZXhPZiIsInJvd0NsYXNzTmFtZUdldHRlciIsImdldENlbGxNZXNzYWdlcyIsInJldHVybkRhdGEiLCJpbmZvTWVzc2FnZSIsImVycm9yTWVzc2FnZSIsIndhcm5pbmdNZXNzYWdlIiwic2Nyb2xsVG9Sb3ciLCJzY3JvbGxOZXdSb3ciLCJmaXJzdCIsImhhbmRsZUNlbGxTZWxlY3QiLCJoYW5kbGVDcmVhdGVDZWxsUmVmIiwicmVmIiwiZm9jdXMiLCJoYW5kbGVFZGl0Q2VsbFJlZiIsInNlbGVjdGVkUm93SW5kZXgiLCJjb2x1bW5JbmRleCIsInR5cGUiLCJzZXRTdGF0ZSIsInNldFRpbWVvdXQiLCJoYW5kbGVTZWxlY3Rpb25DaGVja0JveE9uQ2hhbmdlIiwiaXRlbVNlbGVjdGlvbkNoYW5nZSIsImdlbmVyYXRlQ29sdW1ucyIsInRhYkluZGV4Iiwid2lkdGgiLCJpc1Jlc2l6YWJsZSIsImNlbGwiLCJyb3dJdGVtIiwiaXRlbUlkIiwic2VsZWN0ZWQiLCJpbmNsdWRlcyIsImNlbGxFZGl0IiwiY2VsbENyZWF0ZSIsImNlbGxGaWx0ZXIiLCJmb3JFYWNoIiwidmlzaWJsZUNvbHVtbktleSIsIm9yZ0NvbCIsImNvbHVtbiIsImhlYWRlciIsIm1pbldpZHRoIiwibWF4V2lkdGgiLCJkaXNhYmxlUmVzaXppbmciLCJmaXhlZCIsImFsbG93Q2VsbHNSZWN5Y2xpbmciLCJkaXNhYmxlU29ydGluZyIsImlzUmVxdWlyZWQiLCJzdHlsZSIsImdldENlbGxTdHlsZUJ5Q29sIiwiZmxleEdyb3ciLCJzb3J0Q29tcGFyYXRvciIsInNvcnRWYWx1ZUdldHRlciIsInZhbHVlRW1wdHlDaGVja2VyIiwiZ2V0VmFsdWVFbXB0eUNoZWNrZXIiLCJ2YWx1ZVJlbmRlciIsInJlbmRlckNvbXBvbmVudFByb3BzIiwiZWRpdFZhbHVlUmVuZGVyIiwiY3JlYXRlVmFsdWVSZW5kZXIiLCJmaWx0ZXJWYWx1ZVJlbmRlciIsImVkaXRWYWx1ZVBhcnNlciIsImVkaXRDb21wb25lbnRQcm9wcyIsImNyZWF0ZUNvbXBvbmVudFByb3BzIiwiZmlsdGVyQ29tcG9uZW50UHJvcHMiLCJSZWdFeHAiLCJzZWxlY3RPcHRpb25zIiwic2VsZWN0Q29tcG9uZW50T3B0aW9ucyIsImVkaXRTZWxlY3RPcHRpb25zTW9kIiwic2xpY2UiLCJjcmVhdGVTZWxlY3RPcHRpb25zTW9kIiwiZmlsdGVyU2VsZWN0T3B0aW9uc01vZCIsIm9uS2V5RG93biIsIm9uQmx1ciIsIm9uRm9jdXMiLCJsYWJlbCIsImludGwiLCJmb3JtYXRNZXNzYWdlIiwicmVtb3ZlTmV3SXRlbSIsImlzQ2VsbEVkaXRlZCIsInJvd1NlbGVjdCIsImN0cmxLZXkiLCJkb2N1bWVudCIsImdldFNlbGVjdGlvbiIsInJlbW92ZUFsbFJhbmdlcyIsIm11bHRpU2VsZWN0Iiwib25Sb3dDbGljayIsInJlbmRlckNlbGwiLCJpc0NoZWNrYm94IiwiZ2V0Um93SW5kZXgiLCJtZXNzYWdlRGF0YSIsImlzRWRpdGVkIiwiY2xhc3NOYW1lIiwidGV4dEFsaWduIiwibGVuZ2h0IiwibWFwIiwic29ydENoYW5nZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsU0FBU0MsR0FBVCxFQUFjQyxJQUFkLFFBQTBCLFdBQTFCO0FBQ0EsU0FBU0MsT0FBVCxRQUF3QixhQUF4QjtBQUNBLFNBQ0VDLFVBREYsRUFFRUMsb0JBQW9CQyxDQUZ0QixFQUdFQyxtQkFBbUJDLENBSHJCLFFBSU8sWUFKUDtBQUtBLFNBQVNDLE1BQVQsRUFBaUJDLElBQWpCLFFBQTZCLG9CQUE3QjtBQUNBLFNBQVNDLFFBQVQsRUFBbUJDLFdBQW5CLFFBQXNDLGlCQUF0QztBQUNBLE9BQU9DLFVBQVAsTUFBdUIsWUFBdkI7QUFDQSxPQUFPQyxNQUFQLE1BQW1CLFFBQW5CO0FBQ0EsU0FBU0MsY0FBVCxRQUErQixtQ0FBL0I7QUFDQSxTQUFTQyxTQUFULFFBQTBCLDRCQUExQjtBQUNBLFNBQVNDLElBQVQsUUFBcUIseUJBQXJCO0FBQ0EsU0FBU0MsT0FBVCxRQUF3QiwyQkFBeEI7QUFDQSxPQUFPLDhDQUFQOztBQUVBLE9BQU9DLHdCQUFQLE1BQXFDLHlDQUFyQztBQUNBLE9BQU9DLFVBQVAsTUFBdUIseUJBQXZCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQix3QkFBdEI7QUFDQSxPQUFPQyxrQkFBUCxNQUErQixrQ0FBL0I7QUFDQSxPQUFPQyxpQkFBUCxNQUE4QixnQ0FBOUI7QUFDQSxPQUFPQyxnQkFBUCxNQUE2QiwrQkFBN0I7QUFDQSxPQUFPLEtBQUtDLGVBQVosTUFBaUMsb0JBQWpDO0FBQ0EsT0FBT0MsV0FBUCxNQUF3QiwwQkFBeEI7QUFDQSxPQUFPQyxtQkFBUCxNQUFnQyw2Q0FBaEM7QUFDQSxTQUFT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Q0FBV2lQLFVBTjNCO0FBT0Usb0JBQVEsT0FBS2pQLEtBQUwsQ0FBV2pDLE1BUHJCO0FBUUUsdUJBQVcsT0FBS2lDLEtBQUwsQ0FBVzNCO0FBUnhCO0FBVUc0RixjQUFJeUg7QUFWUCxTQUpKO0FBaUJFLGNBQU0sT0FBSzhDLFVBQUwsQ0FBZ0J2SyxHQUFoQixDQWpCUjtBQWtCRSxlQUFPLE9BQUtqRSxLQUFMLENBQVd0QixZQUFYLENBQXdCZ0ssR0FBeEIsQ0FBNEJ6RSxJQUFJcEQsU0FBaEMsRUFBMkNvRCxJQUFJMkcsS0FBL0MsQ0FsQlQ7QUFtQkUsa0JBQVUzRyxJQUFJMEgsUUFuQmhCO0FBb0JFLGtCQUFVMUgsSUFBSTJILFFBcEJoQjtBQXFCRSxxQkFBYTNILElBQUk0RyxXQXJCbkI7QUFzQkUsa0JBQVU1RyxJQUFJbUksUUFBSixHQUFlbkksSUFBSW1JLFFBQW5CLEdBQThCLENBdEIxQztBQXVCRSxlQUFPbkksSUFBSTZILEtBdkJiO0FBd0JFLDZCQUFxQjdILElBQUk4SDtBQXhCM0IsUUFEaUI7QUFBQSxLQUFaLENBQVA7QUEyQkQsRzs7U0F2b0NrQmhNLFEiLCJmaWxlIjoiZGF0YWdyaWQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tbG9uZWx5LWlmLCBwcmVmZXItdGVtcGxhdGUsIHJlYWN0L3JlcXVpcmUtZGVmYXVsdC1wcm9wcyAqL1xyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBNYXAsIExpc3QgfSBmcm9tICdpbW11dGFibGUnO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5pbXBvcnQge1xyXG4gIGluamVjdEludGwsXHJcbiAgRm9ybWF0dGVkTWVzc2FnZSBhcyBNLFxyXG4gIEZvcm1hdHRlZE51bWJlciBhcyBOLFxyXG59IGZyb20gJ3JlYWN0LWludGwnO1xyXG5pbXBvcnQgeyBDb2x1bW4sIENlbGwgfSBmcm9tICdmaXhlZC1kYXRhLXRhYmxlLTInO1xyXG5pbXBvcnQgeyBDaGVja2JveCwgRm9ybUNvbnRyb2wgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcclxuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5pbXBvcnQgeyBGbG9hdGluZ1NlbGVjdCB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWZsb2F0aW5nLXNlbGVjdCc7XHJcbmltcG9ydCB7IERhdGVJbnB1dCB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWRhdGV0aW1lJztcclxuaW1wb3J0IHsgSWNvbiB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWljb25zJztcclxuaW1wb3J0IHsgU3Bpbm5lciB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXNwaW5uZXInO1xyXG5pbXBvcnQgJ2ZpeGVkLWRhdGEtdGFibGUtMi9kaXN0L2ZpeGVkLWRhdGEtdGFibGUuY3NzJztcclxuXHJcbmltcG9ydCBSZXNwb25zaXZlRml4ZWREYXRhVGFibGUgZnJvbSAnLi9yZXNwb25zaXZlLWZpeGVkLWRhdGEtdGFibGUuY29tcG9uZW50JztcclxuaW1wb3J0IEhlYWRlckNlbGwgZnJvbSAnLi9oZWFkZXItY2VsbC5jb21wb25lbnQnO1xyXG5pbXBvcnQgQWN0aW9uQmFyIGZyb20gJy4vYWN0aW9uLWJhci5jb21wb25lbnQnO1xyXG5pbXBvcnQgSW5saW5lRWRpdENvbnRyb2xzIGZyb20gJy4vaW5saW5lLWVkaXQtY29udHJvbHMuY29tcG9uZW50JztcclxuaW1wb3J0IEZpbHRlcmluZ0NvbnRyb2xzIGZyb20gJy4vZmlsdGVyaW5nLWNvbnRyb2xzLmNvbXBvbmVudCc7XHJcbmltcG9ydCBEcm9wZG93bkNvbnRyb2xzIGZyb20gJy4vZHJvcGRvd24tY29udHJvbHMuY29tcG9uZW50JztcclxuaW1wb3J0ICogYXMgZGF0YWdyaWRBY3Rpb25zIGZyb20gJy4vZGF0YWdyaWQuYWN0aW9ucyc7XHJcbmltcG9ydCBDZWxsVG9vbHRpcCBmcm9tICcuL2NlbGwtdG9vbHRpcC5jb21wb25lbnQnO1xyXG5pbXBvcnQgQ29sdW1uU2V0dGluZ3NNb2RhbCBmcm9tICcuL2NvbHVtbi1zZXR0aW5ncy9jb2x1bW4tc2V0dGluZ3MuY29tcG9uZW50JztcclxuaW1wb3J0IHsgcHJvcFR5cGVzLCBkZWZhdWx0UHJvcHMgfSBmcm9tICcuL2RhdGFncmlkLnByb3BzJztcclxuaW1wb3J0IHsgS0VZX0NPREVTIH0gZnJvbSAnLi9kYXRhZ3JpZC5jb25zdGFudHMnO1xyXG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9kYXRhZ3JpZC51dGlscyc7XHJcbmltcG9ydCAnLi9kYXRhZ3JpZC5jb21wb25lbnQuc2Nzcyc7XHJcblxyXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUsIG93blByb3BzKSA9PiB7XHJcbiAgY29uc3QgR1JJRCA9IG93blByb3BzLmdyaWQ7XHJcbiAgcmV0dXJuIHtcclxuICAgIGlzQnVzeTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2lzQnVzeSddLCB0cnVlKSxcclxuICAgIGlzRWRpdGluZzogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2lzRWRpdGluZyddLCBmYWxzZSksXHJcbiAgICBpc0NyZWF0aW5nOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnaXNDcmVhdGluZyddLCBmYWxzZSksXHJcbiAgICBpc0ZpbHRlcmluZzpcclxuICAgICAgc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdpc0ZpbHRlcmluZyddLCBmYWxzZSksXHJcbiAgICBpc0NvbHVtblNldHRpbmdzTW9kYWxPcGVuOlxyXG4gICAgICBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnY29sdW1uU2V0dGluZ3NNb2RhbCcsICdvcGVuJ10sIGZhbHNlKSxcclxuICAgIHNvcnRDb2x1bW46IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ3NvcnRpbmdEYXRhJywgJ3NvcnRDb2x1bW4nXSwgbnVsbCksXHJcbiAgICBzb3J0T3JkZXI6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ3NvcnRpbmdEYXRhJywgJ3NvcnRPcmRlciddLCBudWxsKSxcclxuICAgIHZpc2libGVDb2x1bW5zOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICd2aXNpYmxlQ29sdW1ucyddLCBMaXN0KCkpLFxyXG4gICAgY29sdW1uV2lkdGhzOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdjb2x1bW5XaWR0aHMnXSwgTWFwKCkpLFxyXG4gICAgc2VsZWN0ZWRDZWxsOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3NlbGVjdGVkQ2VsbCddLCBNYXAoKSksXHJcbiAgICBzZWxlY3RlZEl0ZW1zOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3NlbGVjdGVkSXRlbXMnXSwgTGlzdCgpKSxcclxuICAgIGRhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnZGF0YSddLCBMaXN0KCkpLFxyXG4gICAgZWRpdERhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnZWRpdERhdGEnXSwgTWFwKCkpLFxyXG4gICAgY3JlYXRlRGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjcmVhdGVEYXRhJ10sIExpc3QoKSksXHJcbiAgICBmaWx0ZXJEYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2ZpbHRlckRhdGEnXSwgTWFwKCkpLFxyXG4gICAgY2VsbE1lc3NhZ2VzOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NlbGxNZXNzYWdlcyddLCBNYXAoKSksXHJcbiAgICBjcmVhdGVDZWxsTWVzc2FnZXM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY3JlYXRlQ2VsbE1lc3NhZ2VzJ10sIE1hcCgpKSxcclxuICAgIGFsbERhdGFTaXplOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2FsbERhdGEnXSwgTGlzdCgpKS5zaXplLFxyXG4gICAgbGFuZ3VhZ2U6IFV0aWxzLmdldExhbmd1YWdlKEdSSUQsIHN0YXRlLnVzZXIpLFxyXG4gICAgZGF0ZUZvcm1hdDogVXRpbHMuZ2V0RGF0ZUZvcm1hdChHUklELCBzdGF0ZS51c2VyKSxcclxuICAgIHRob3VzYW5kU2VwYXJhdG9yOiBVdGlscy5nZXRUaG91c2FuZFNlcGFyYXRvcihHUklELCBzdGF0ZS51c2VyKSxcclxuICAgIGRlY2ltYWxTZXBhcmF0b3I6IFV0aWxzLmdldERlY2ltYWxTZXBhcmF0b3IoR1JJRCwgc3RhdGUudXNlciksXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRhdGFncmlkQWN0aW9ucztcclxuXHJcbkBpbmplY3RJbnRsXHJcbkBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRhR3JpZCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xyXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSBwcm9wVHlwZXM7XHJcbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcclxuXHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7IGN1cnJlbnRSb3c6IDAsIGN1cnJlbnRDb2x1bW46IDAgfTtcclxuICAgIHRoaXMuY2VsbFJlZnMgPSB7fTtcclxuICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgPSBmYWxzZTtcclxuICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gZmFsc2U7IC8vIFRPRE86IEhhbmRsZSBmb2N1c2luZyB3aGVuIHRydWVcclxuICAgIHRoaXMuZm9jdXNUb0Vycm9yQ2VsbCA9IGZhbHNlOyAvLyBUT0RPOiBIYW5kbGUgZm9jdXNpbmcgd2hlbiB0cnVlXHJcbiAgfVxyXG5cclxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgIHRoaXMucHJvcHMuaW52YWxpZGF0ZSh0aGlzLnByb3BzLmdyaWQpO1xyXG4gIH1cclxuXHJcbiAgb25Db2x1bW5SZXNpemVFbmRDYWxsYmFjayA9IChuZXdDb2x1bW5XaWR0aCwgY29sdW1uS2V5KSA9PiB7XHJcbiAgICB0aGlzLnByb3BzLnJlc2l6ZUNvbHVtbih0aGlzLnByb3BzLmdyaWQsIGNvbHVtbktleSwgbmV3Q29sdW1uV2lkdGgpO1xyXG4gIH1cclxuXHJcbiAgb25DcmVhdGVDZWxsS2V5RG93biA9IChlKSA9PiB7XHJcbiAgICBpZiAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuRU5URVIpIHtcclxuICAgICAgdGhpcy5wcm9wcy5hZGROZXdJdGVtKHRoaXMucHJvcHMuZ3JpZCwgVXRpbHMuZ2V0Q29sdW1uRGVmYXVsdFZhbHVlcyh0aGlzLnByb3BzLmNvbHVtbnMpKTtcclxuICAgICAgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkVkaXRDZWxsS2V5RG93biA9IChjb2wsIHJvd0luZGV4KSA9PiAoZSkgPT4ge1xyXG4gICAgaWYgKHRoaXMucHJvcHMuZW5hYmxlQXJyb3dOYXZpZ2F0aW9uKSB7XHJcbiAgICAgIGNvbnN0IHsgY29sdW1ucyB9ID0gdGhpcy5wcm9wcztcclxuICAgICAgY29uc3Qgcm93c1NpemUgPSB0aGlzLnByb3BzLmRhdGEuc2l6ZTtcclxuICAgICAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCk7XHJcbiAgICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XHJcbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuRE9XTjoge1xyXG4gICAgICAgICAgaWYgKGNvbC52YWx1ZVR5cGUgIT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5leHRFbGVtZW50ID0gdGhpcy5jZWxsUmVmc1tgJHt0aGlzLnByb3BzLmdyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4ICsgMX1gXTtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlQ2VsbEZvY3VzKG5leHRFbGVtZW50LCByb3dJbmRleCArIDEsIC0xKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5VUDoge1xyXG4gICAgICAgICAgaWYgKGNvbC52YWx1ZVR5cGUgIT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5leHRFbGVtZW50ID0gdGhpcy5jZWxsUmVmc1tgJHt0aGlzLnByb3BzLmdyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4IC0gMX1gXTtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlQ2VsbEZvY3VzKG5leHRFbGVtZW50LCByb3dJbmRleCAtIDEsIC0xKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5UQUI6XHJcbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuUklHSFQ6XHJcbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuTEVGVDoge1xyXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgbGV0IGNvbHVtbkluZCA9IGNvbHVtbnMuZmluZEluZGV4KGMgPT4gYy52YWx1ZUtleVBhdGguam9pbigpID09PSBjb2x1bW5LZXkpO1xyXG4gICAgICAgICAgaWYgKGNvbHVtbkluZCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgbGV0IGRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IG5leHRFbGVtZW50ID0gbnVsbDtcclxuICAgICAgICAgICAgbGV0IHJvd0luZCA9IHJvd0luZGV4O1xyXG4gICAgICAgICAgICB3aGlsZSAoZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuTEVGVCB8fCAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuVEFCICYmIGUuc2hpZnRLZXkpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29sdW1uSW5kIC0gMSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCAtPSAxO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyb3dJbmQgLSAxID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kID0gY29sdW1ucy5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICAgICAgICByb3dJbmQgLT0gMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29sdW1uSW5kICsgMSA8IGNvbHVtbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCArPSAxO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyb3dJbmQgKyAxIDwgcm93c1NpemUpIHtcclxuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kID0gMDtcclxuICAgICAgICAgICAgICAgICAgcm93SW5kICs9IDE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgY29uc3QgbmV4dENvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2x1bW5zW2NvbHVtbkluZF0pO1xyXG4gICAgICAgICAgICAgIG5leHRFbGVtZW50ID0gdGhpcy5jZWxsUmVmc1tgJHt0aGlzLnByb3BzLmdyaWQuaWR9XyR7bmV4dENvbHVtbktleX1fJHtyb3dJbmR9YF07XHJcbiAgICAgICAgICAgICAgZGlzYWJsZWQgPSBuZXh0RWxlbWVudCA/IG5leHRFbGVtZW50LmRpc2FibGVkIDogZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFkaXNhYmxlZCAmJiBuZXh0RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgIHRoaXMubW92ZUNlbGxGb2N1cyhuZXh0RWxlbWVudCwgcm93SW5kLCBjb2x1bW5JbmQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkZpbHRlckNlbGxWYWx1ZUNoYW5nZSA9IChjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZXZlbnRPckRhdGEpID0+IHtcclxuICAgIGxldCByYXdWYWx1ZTtcclxuICAgIC8vIGV2ZW50T3JEYXRhIGNhbiBiZSBpbnB1dCBvbkNoYW5nZSBldmVudCwgcmVhY3Qtc2VsZWN0IG9uQ2hhbmdlIG9yIHJlYWN0LWRheS1waWNrZXIgb25DaGFuZ2VcclxuICAgIGlmIChldmVudE9yRGF0YSkge1xyXG4gICAgICBpZiAoZXZlbnRPckRhdGEudGFyZ2V0ICE9PSB1bmRlZmluZWQpIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlO1xyXG4gICAgICBlbHNlIGlmIChldmVudE9yRGF0YS52YWx1ZSAhPT0gdW5kZWZpbmVkKSByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnZhbHVlO1xyXG4gICAgICBlbHNlIHJhd1ZhbHVlID0gZXZlbnRPckRhdGE7XHJcbiAgICB9XHJcbiAgICBjb25zdCB2YWx1ZSA9IHZhbHVlUGFyc2VyKHJhd1ZhbHVlKTtcclxuICAgIHRoaXMucHJvcHMuZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlKFxyXG4gICAgICB0aGlzLnByb3BzLmdyaWQsXHJcbiAgICAgIHRoaXMucHJvcHMuY29sdW1ucyxcclxuICAgICAgY29sLFxyXG4gICAgICB2YWx1ZSxcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBvbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGV2ZW50T3JEYXRhKSA9PiB7XHJcbiAgICBsZXQgcmF3VmFsdWU7XHJcbiAgICAvLyBldmVudE9yRGF0YSBjYW4gYmUgaW5wdXQgb25DaGFuZ2UgZXZlbnQsIHJlYWN0LXNlbGVjdCBvbkNoYW5nZSBvciByZWFjdC1kYXktcGlja2VyIG9uQ2hhbmdlXHJcbiAgICBpZiAoZXZlbnRPckRhdGEpIHtcclxuICAgICAgaWYgKGV2ZW50T3JEYXRhLnRhcmdldCAhPT0gdW5kZWZpbmVkKSByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZTtcclxuICAgICAgZWxzZSBpZiAoZXZlbnRPckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkgcmF3VmFsdWUgPSBldmVudE9yRGF0YS52YWx1ZTtcclxuICAgICAgZWxzZSByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdmFsdWUgPSB2YWx1ZVBhcnNlcihyYXdWYWx1ZSk7XHJcbiAgICB0aGlzLnByb3BzLmNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIHJvd0luZGV4LCBjb2wudmFsdWVLZXlQYXRoLCB2YWx1ZSk7XHJcbiAgICBpZiAoY29sLm9uQ3JlYXRlVmFsdWVDaGFuZ2UpIHtcclxuICAgICAgY29sLm9uQ3JlYXRlVmFsdWVDaGFuZ2UodmFsdWUsIGNvbC52YWx1ZUtleVBhdGgsIHJvd0luZGV4KTtcclxuICAgIH1cclxuICAgIGlmIChjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUgJiYgdmFsdWUgPT09IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5tYXRjaFZhbHVlKSB7XHJcbiAgICAgIC8vIENhbGwgc3BlY2lhbCBwYWlyZWQgdmFsdWUgY2hhbmdlIG9uIG90aGVyIGNlbGwgaWYgdmFsdWUgbWF0Y2hlc1xyXG4gICAgICB0aGlzLm9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlKFxyXG4gICAgICAgIHJvd0luZGV4LFxyXG4gICAgICAgIHsgdmFsdWVLZXlQYXRoOiBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWVLZXlQYXRoIH0sXHJcbiAgICAgICAgdiA9PiB2LFxyXG4gICAgICApKGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5uZXdWYWx1ZSk7XHJcbiAgICB9XHJcbiAgICBpZiAoY29sLnZhbGlkYXRvcnMpIHtcclxuICAgICAgdGhpcy5wcm9wcy5jcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZShcclxuICAgICAgICB0aGlzLnByb3BzLmdyaWQsXHJcbiAgICAgICAgcm93SW5kZXgsXHJcbiAgICAgICAgY29sLnZhbHVlS2V5UGF0aCxcclxuICAgICAgICB2YWx1ZSxcclxuICAgICAgICBjb2wudmFsaWRhdG9ycyxcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uRWRpdENlbGxWYWx1ZUNoYW5nZSA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGV2ZW50T3JEYXRhKSA9PiB7XHJcbiAgICBjb25zdCBkYXRhSWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xyXG4gICAgbGV0IHJhd1ZhbHVlO1xyXG4gICAgLy8gZXZlbnRPckRhdGEgY2FuIGJlIGlucHV0IG9uQ2hhbmdlIGV2ZW50LCByZWFjdC1zZWxlY3Qgb25DaGFuZ2Ugb3IgcmVhY3QtZGF5LXBpY2tlciBvbkNoYW5nZVxyXG4gICAgaWYgKGV2ZW50T3JEYXRhKSB7XHJcbiAgICAgIGlmIChldmVudE9yRGF0YS50YXJnZXQgIT09IHVuZGVmaW5lZCkgcmF3VmFsdWUgPSBldmVudE9yRGF0YS50YXJnZXQudmFsdWU7XHJcbiAgICAgIGVsc2UgaWYgKGV2ZW50T3JEYXRhLnZhbHVlICE9PSB1bmRlZmluZWQpIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudmFsdWU7XHJcbiAgICAgIGVsc2UgcmF3VmFsdWUgPSBldmVudE9yRGF0YTtcclxuICAgIH1cclxuICAgIGNvbnN0IHZhbHVlID0gdmFsdWVQYXJzZXIocmF3VmFsdWUpO1xyXG4gICAgdGhpcy5wcm9wcy5lZGl0Q2VsbFZhbHVlQ2hhbmdlKHRoaXMucHJvcHMuZ3JpZCwgZGF0YUlkLCBjb2wudmFsdWVLZXlQYXRoLCB2YWx1ZSk7XHJcbiAgICBpZiAoY29sLm9uRWRpdFZhbHVlQ2hhbmdlKSB7XHJcbiAgICAgIGNvbC5vbkVkaXRWYWx1ZUNoYW5nZSh2YWx1ZSwgY29sLnZhbHVlS2V5UGF0aCwgcm93SW5kZXgsIGRhdGFJZCk7XHJcbiAgICB9XHJcbiAgICBpZiAoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlICYmIHZhbHVlID09PSBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubWF0Y2hWYWx1ZSkge1xyXG4gICAgICAvLyBDYWxsIHNwZWNpYWwgcGFpcmVkIHZhbHVlIGNoYW5nZSBvbiBvdGhlciBjZWxsIGlmIHZhbHVlIG1hdGNoZXNcclxuICAgICAgdGhpcy5vbkVkaXRDZWxsVmFsdWVDaGFuZ2UoXHJcbiAgICAgICAgcm93SW5kZXgsXHJcbiAgICAgICAgeyB2YWx1ZUtleVBhdGg6IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5uZXdWYWx1ZUtleVBhdGggfSxcclxuICAgICAgICB2ID0+IHYsXHJcbiAgICAgICkoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm5ld1ZhbHVlKTtcclxuICAgIH1cclxuICAgIGlmIChjb2wudmFsaWRhdG9ycykge1xyXG4gICAgICB0aGlzLnByb3BzLmVkaXRDZWxsVmFsdWVWYWxpZGF0ZShcclxuICAgICAgICB0aGlzLnByb3BzLmdyaWQsXHJcbiAgICAgICAgZGF0YUlkLFxyXG4gICAgICAgIGNvbC52YWx1ZUtleVBhdGgsXHJcbiAgICAgICAgdmFsdWUsXHJcbiAgICAgICAgY29sLnZhbGlkYXRvcnMsXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkNyZWF0ZUNlbGxCbHVyID0gKHJvd0luZGV4LCBjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZSkgPT4ge1xyXG4gICAgaWYgKGNvbC5vbkNyZWF0ZUJsdXIpIHtcclxuICAgICAgbGV0IHZhbHVlID0gKGUgJiYgZS50YXJnZXQgJiYgZS50YXJnZXQudmFsdWUgIT09IHVuZGVmaW5lZCkgP1xyXG4gICAgICAgIGUudGFyZ2V0LnZhbHVlIDpcclxuICAgICAgICB0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCk7XHJcbiAgICAgIGlmICh2YWx1ZVBhcnNlciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdmFsdWUgPSB2YWx1ZVBhcnNlcih2YWx1ZSk7XHJcbiAgICAgIH1cclxuICAgICAgY29sLm9uQ3JlYXRlQmx1cih2YWx1ZSwgcm93SW5kZXgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25FZGl0Q2VsbEJsdXIgPSAocm93SW5kZXgsIGNvbCwgdmFsdWVQYXJzZXIpID0+IChlKSA9PiB7XHJcbiAgICBpZiAoY29sLm9uRWRpdEJsdXIpIHtcclxuICAgICAgbGV0IHZhbHVlID0gKGUgJiYgZS50YXJnZXQgJiYgZS50YXJnZXQudmFsdWUgIT09IHVuZGVmaW5lZCkgP1xyXG4gICAgICAgIGUudGFyZ2V0LnZhbHVlIDpcclxuICAgICAgICB0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCk7XHJcbiAgICAgIGlmICh2YWx1ZVBhcnNlciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdmFsdWUgPSB2YWx1ZVBhcnNlcih2YWx1ZSk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgZGF0YUlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcclxuICAgICAgY29sLm9uRWRpdEJsdXIodmFsdWUsIHJvd0luZGV4LCBkYXRhSWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25DZWxsRm9jdXMgPSAoY2VsbFR5cGUsIGlucHV0VHlwZSwgcm93SW5kZXgsIGNvbHVtbktleSkgPT4gKGUpID0+IHtcclxuICAgIGlmIChpbnB1dFR5cGUgPT09ICdudW1iZXInKSB7XHJcbiAgICAgIGUudGFyZ2V0LnNlbGVjdCgpO1xyXG4gICAgfVxyXG4gICAgaWYgKGNlbGxUeXBlID09PSAnZWRpdCcgJiYgdGhpcy5wcm9wcy5jZWxsU2VsZWN0KSB7XHJcbiAgICAgIHRoaXMucHJvcHMuY2VsbFNlbGVjdGlvbkNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIE1hcCh7IHJvd0luZGV4LCBjb2x1bW5LZXkgfSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0RGF0YUlkQnlSb3dJbmRleCA9IHJvd0luZGV4ID0+XHJcbiAgICB0aGlzLnByb3BzLmRhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi50aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoXSk7XHJcblxyXG4gIGdldFNlbGVjdGVkSXRlbUluZGV4ID0gKGlkKSA9PiB7XHJcbiAgICBpZiAoIWlkKSByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnByb3BzLmRhdGEuZmluZEluZGV4KHYgPT4gdi5nZXRJbih0aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoKSA9PT0gaWQpO1xyXG4gICAgcmV0dXJuIGluZGV4ID09PSAtMSA/IHVuZGVmaW5lZCA6IGluZGV4O1xyXG4gIH1cclxuXHJcbiAgZ2V0RWRpdEl0ZW1WYWx1ZSA9IChyb3dJbmRleCwgY29sKSA9PiB7XHJcbiAgICAvLyBHZXQgdGhlIHZhbHVlIHRvIGRpc3BsYXkgaW4gZWRpdCBjZWxsXHJcbiAgICBjb25zdCBpZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XHJcbiAgICBjb25zdCBlZGl0VmFsdWUgPSB0aGlzLnByb3BzLmVkaXREYXRhLmdldEluKFtpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0sIHVuZGVmaW5lZCk7XHJcbiAgICBsZXQgb3JpZ2luYWxWYWx1ZTtcclxuICAgIGlmIChlZGl0VmFsdWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBvcmlnaW5hbFZhbHVlID0gdGhpcy5wcm9wcy5kYXRhLmdldEluKFtyb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0sICcnKTtcclxuICAgIH0gZWxzZSBpZiAoZWRpdFZhbHVlID09PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiAnJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBlZGl0VmFsdWU7XHJcbiAgICB9XHJcbiAgICBpZiAob3JpZ2luYWxWYWx1ZSA9PT0gbnVsbCB8fCBvcmlnaW5hbFZhbHVlID09PSB1bmRlZmluZWQgfHwgb3JpZ2luYWxWYWx1ZSA9PT0gJycpIHtcclxuICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG4gICAgLy8gU3BlY2lhbCBmb3JtYXR0aW5nIGJ5IGNvbXBvbmVudCB0eXBlXHJcbiAgICBpZiAoY29sLmNvbXBvbmVudFR5cGUgPT09ICdkYXRlJykge1xyXG4gICAgICBpZiAobW9tZW50KG9yaWdpbmFsVmFsdWUsIHRoaXMucHJvcHMuZGF0ZUZvcm1hdCwgdHJ1ZSkuaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgcmV0dXJuIG1vbWVudC51dGMob3JpZ2luYWxWYWx1ZSwgdGhpcy5wcm9wcy5kYXRlRm9ybWF0KS5mb3JtYXQodGhpcy5wcm9wcy5kYXRlRm9ybWF0KTtcclxuICAgICAgfVxyXG4gICAgICBpZiAobW9tZW50KG9yaWdpbmFsVmFsdWUpLmlzVmFsaWQoKSkge1xyXG4gICAgICAgIHJldHVybiBtb21lbnQudXRjKG9yaWdpbmFsVmFsdWUpLmZvcm1hdCh0aGlzLnByb3BzLmRhdGVGb3JtYXQpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiAnJztcclxuICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgIGNvbC5jb21wb25lbnRUeXBlID09PSAnZmxvYXQnICYmXHJcbiAgICAgIFN0cmluZyhvcmlnaW5hbFZhbHVlKS5sZW5ndGggPiAwXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuIFN0cmluZyhvcmlnaW5hbFZhbHVlKS5yZXBsYWNlKCcuJywgdGhpcy5wcm9wcy5kZWNpbWFsU2VwYXJhdG9yKTtcclxuICAgIH1cclxuICAgIHJldHVybiBvcmlnaW5hbFZhbHVlO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q3JlYXRlSXRlbVZhbHVlID0gKHJvd0luZGV4LCBjb2wpID0+IHtcclxuICAgIGNvbnN0IHZhbCA9IHRoaXMucHJvcHMuY3JlYXRlRGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdLCAnJyk7XHJcbiAgICBpZiAodmFsID09PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuICAgIHJldHVybiB2YWw7XHJcbiAgfVxyXG5cclxuICBnZXRGaWx0ZXJJdGVtVmFsdWUgPSAoY29sKSA9PiB7XHJcbiAgICBjb25zdCB2YWwgPSB0aGlzLnByb3BzLmZpbHRlckRhdGEuZ2V0KFV0aWxzLmdldENvbHVtbktleShjb2wpLCAnJyk7XHJcbiAgICBpZiAodmFsID09PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuICAgIHJldHVybiB2YWw7XHJcbiAgfVxyXG5cclxuICBnZXRDb21wb25lbnREaXNhYmxlZFN0YXRlID0gKHJvd0luZGV4LCBjb2wsIG1vZGUpID0+IHtcclxuICAgIGxldCBjb21wb25lbnREaXNhYmxlZCA9ICEhY29sLmRpc2FibGVFZGl0aW5nO1xyXG4gICAgLy8gY2hlY2sgaWYgY29tcG9uZW50IGlzIGRpc2FibGVkIGJ5IG90aGVyIGNvbHVtbiBkYXRhXHJcbiAgICBpZiAoIWNvbXBvbmVudERpc2FibGVkICYmIGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaCkge1xyXG4gICAgICBpZiAobW9kZSA9PT0gJ2NyZWF0ZScpIHtcclxuICAgICAgICBjb21wb25lbnREaXNhYmxlZCA9IHRoaXMuZ2V0Q3JlYXRlSXRlbVZhbHVlKFxyXG4gICAgICAgICAgcm93SW5kZXgsXHJcbiAgICAgICAgICB7IHZhbHVlS2V5UGF0aDogY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWVLZXlQYXRoIH0sXHJcbiAgICAgICAgKSA9PT0gY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29tcG9uZW50RGlzYWJsZWQgPSB0aGlzLmdldEVkaXRJdGVtVmFsdWUoXHJcbiAgICAgICAgICByb3dJbmRleCxcclxuICAgICAgICAgIHsgdmFsdWVLZXlQYXRoOiBjb2wuZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2gubWF0Y2hWYWx1ZUtleVBhdGggfSxcclxuICAgICAgICApID09PSBjb2wuZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2gubWF0Y2hWYWx1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvbXBvbmVudERpc2FibGVkO1xyXG4gIH1cclxuXHJcbiAgZ2V0Um93Q2xhc3NOYW1lID0gKHJvd0luZGV4KSA9PiB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGdyaWQsXHJcbiAgICAgIGlzQ3JlYXRpbmcsXHJcbiAgICAgIGlzRWRpdGluZyxcclxuICAgICAgY3JlYXRlRGF0YSxcclxuICAgICAgc2VsZWN0ZWRJdGVtcyxcclxuICAgICAgZGF0YSxcclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3Qgcm93Q2xhc3NOYW1lcyA9IFsnb2MtZGF0YWdyaWQtcm93J107XHJcbiAgICBsZXQgZXh0cmFSb3dDb3VudCA9IDA7IC8vIGhvdyBtYW55IHJvd3MgdG8gaWdub3JlIGZyb20gdG9wLCBuZXcgKyBmaWx0ZXIgcm93c1xyXG4gICAgaWYgKGlzQ3JlYXRpbmcpIGV4dHJhUm93Q291bnQgPSBjcmVhdGVEYXRhLnNpemU7XHJcbiAgICBpZiAoaXNDcmVhdGluZykge1xyXG4gICAgICBpZiAocm93SW5kZXggPD0gKGV4dHJhUm93Q291bnQgLSAxKSkge1xyXG4gICAgICAgIHJvd0NsYXNzTmFtZXMucHVzaCgnb2MtZGF0YWdyaWQtcm93LW5ldycpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGlzRWRpdGluZykge1xyXG4gICAgICByb3dDbGFzc05hbWVzLnB1c2goJ29jLWRhdGFncmlkLXJvdy1lZGl0Jyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIGNoZWNrIGlmIHJvdyBpcyBzZWxlY3RlZFxyXG4gICAgaWYgKCghaXNDcmVhdGluZyAmJiAhaXNFZGl0aW5nKSAmJlxyXG4gICAgICAgIChzZWxlY3RlZEl0ZW1zICYmIGdyaWQuaWRLZXlQYXRoKSkge1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgc2VsZWN0ZWRJdGVtcy5pbmRleE9mKGRhdGEuZ2V0SW4oW3Jvd0luZGV4IC0gZXh0cmFSb3dDb3VudCwgLi4uZ3JpZC5pZEtleVBhdGhdKSkgIT09IC0xXHJcbiAgICAgICkge1xyXG4gICAgICAgIHJvd0NsYXNzTmFtZXMucHVzaCgnaXMtc2VsZWN0ZWQnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnByb3BzLnJvd0NsYXNzTmFtZUdldHRlcikge1xyXG4gICAgICByZXR1cm4gcm93Q2xhc3NOYW1lcy5qb2luKCcgJykgKyAnICcgKyB0aGlzLnByb3BzLnJvd0NsYXNzTmFtZUdldHRlcihyb3dJbmRleCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcm93Q2xhc3NOYW1lcy5qb2luKCcgJyk7XHJcbiAgfVxyXG5cclxuICBnZXRDZWxsTWVzc2FnZXMgPSAocm93SW5kZXgsIGNvbCwgY2VsbFR5cGUpID0+IHtcclxuICAgIGNvbnN0IHJldHVybkRhdGEgPSB7fTtcclxuICAgIGlmICghdGhpcy5wcm9wcy5ncmlkLmlkS2V5UGF0aCB8fCAhY29sLnZhbHVlS2V5UGF0aCkge1xyXG4gICAgICByZXR1cm4gcmV0dXJuRGF0YTtcclxuICAgIH1cclxuICAgIGxldCBpbmZvTWVzc2FnZTtcclxuICAgIGxldCBlcnJvck1lc3NhZ2U7XHJcbiAgICBsZXQgd2FybmluZ01lc3NhZ2U7XHJcbiAgICBpZiAoY2VsbFR5cGUgPT09ICdjcmVhdGUnKSB7XHJcbiAgICAgIGluZm9NZXNzYWdlID0gdGhpcy5wcm9wcy5jcmVhdGVDZWxsTWVzc2FnZXMuZ2V0SW4oWydpbmZvJywgcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcclxuICAgICAgZXJyb3JNZXNzYWdlID0gdGhpcy5wcm9wcy5jcmVhdGVDZWxsTWVzc2FnZXMuZ2V0SW4oWydlcnJvcicsIHJvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XHJcbiAgICAgIHdhcm5pbmdNZXNzYWdlID0gdGhpcy5wcm9wcy5jcmVhdGVDZWxsTWVzc2FnZXMuZ2V0SW4oWyd3YXJuaW5nJywgcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcclxuICAgICAgaW5mb01lc3NhZ2UgPSB0aGlzLnByb3BzLmNlbGxNZXNzYWdlcy5nZXRJbihbJ2luZm8nLCBpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xyXG4gICAgICBlcnJvck1lc3NhZ2UgPSB0aGlzLnByb3BzLmNlbGxNZXNzYWdlcy5nZXRJbihbJ2Vycm9yJywgaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcclxuICAgICAgd2FybmluZ01lc3NhZ2UgPSB0aGlzLnByb3BzLmNlbGxNZXNzYWdlcy5nZXRJbihbJ3dhcm5pbmcnLCBpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xyXG4gICAgfVxyXG4gICAgaWYgKGluZm9NZXNzYWdlKSB7XHJcbiAgICAgIHJldHVybkRhdGEuaW5mb01lc3NhZ2UgPSBpbmZvTWVzc2FnZTtcclxuICAgIH1cclxuICAgIGlmIChlcnJvck1lc3NhZ2UpIHtcclxuICAgICAgcmV0dXJuRGF0YS5lcnJvck1lc3NhZ2UgPSBlcnJvck1lc3NhZ2U7XHJcbiAgICB9XHJcbiAgICBpZiAod2FybmluZ01lc3NhZ2UpIHtcclxuICAgICAgcmV0dXJuRGF0YS53YXJuaW5nTWVzc2FnZSA9IHdhcm5pbmdNZXNzYWdlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJldHVybkRhdGE7XHJcbiAgfVxyXG5cclxuICBnZXRTY3JvbGxUb1JvdyA9ICgpID0+IHtcclxuICAgIGxldCBzY3JvbGxUb1JvdztcclxuICAgIGlmICh0aGlzLnByb3BzLmlzQ3JlYXRpbmcgJiYgIXRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwpIHJldHVybiBzY3JvbGxUb1JvdztcclxuICAgIGlmICh0aGlzLmZvY3VzVG9DcmVhdGVDZWxsKSB7XHJcbiAgICAgIGNvbnN0IHNjcm9sbE5ld1JvdyA9IHRoaXMucHJvcHMuY3JlYXRlRGF0YS5zaXplIC0gMTtcclxuICAgICAgaWYgKHNjcm9sbE5ld1JvdyA+PSAwKSB7XHJcbiAgICAgICAgc2Nyb2xsVG9Sb3cgPSBzY3JvbGxOZXdSb3c7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0aGlzLnByb3BzLmlzRWRpdGluZykge1xyXG4gICAgICAgIHNjcm9sbFRvUm93ID0gdGhpcy5zdGF0ZS5jdXJyZW50Um93O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNjcm9sbFRvUm93ID0gdGhpcy5wcm9wcy5zY3JvbGxUb1JvdzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChzY3JvbGxUb1JvdyA9PT0gdW5kZWZpbmVkICYmIHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5zaXplID4gMCkge1xyXG4gICAgICAgIHNjcm9sbFRvUm93ID0gdGhpcy5nZXRTZWxlY3RlZEl0ZW1JbmRleCh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuZmlyc3QoKSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBzY3JvbGxUb1JvdztcclxuICB9XHJcblxyXG4gIGhhbmRsZUNlbGxTZWxlY3QgPSAoY2VsbFR5cGUsIHJvd0luZGV4LCBjb2x1bW5LZXkpID0+ICgpID0+IHtcclxuICAgIGlmIChjZWxsVHlwZSA9PT0gJ3ZpZXcnICYmIHRoaXMucHJvcHMuY2VsbFNlbGVjdCkge1xyXG4gICAgICB0aGlzLnByb3BzLmNlbGxTZWxlY3Rpb25DaGFuZ2UodGhpcy5wcm9wcy5ncmlkLCBNYXAoeyByb3dJbmRleCwgY29sdW1uS2V5IH0pKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhhbmRsZUNyZWF0ZUNlbGxSZWYgPSAocm93SW5kZXgsIGNvbCkgPT4gKHJlZikgPT4ge1xyXG4gICAgLy8gRm9jdXMgdG8gY3JlYXRlIGNlbGxcclxuICAgIGlmIChcclxuICAgICAgdGhpcy5wcm9wcy5jcmVhdGVEYXRhLnNpemUgJiZcclxuICAgICAgdGhpcy5wcm9wcy5jcmVhdGVEYXRhLnNpemUgPT09IHJvd0luZGV4ICsgMSAmJlxyXG4gICAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsICYmXHJcbiAgICAgICF0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2NyZWF0ZScpXHJcbiAgICApIHtcclxuICAgICAgcmVmLmZvY3VzKCk7XHJcbiAgICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhhbmRsZUVkaXRDZWxsUmVmID0gKHJvd0luZGV4LCBjb2wpID0+IChyZWYpID0+IHtcclxuICAgIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2wpO1xyXG4gICAgaWYgKHRoaXMuZm9jdXNUb0VkaXRDZWxsICYmICF0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2VkaXQnKSkge1xyXG4gICAgICBjb25zdCBzZWxlY3RlZFJvd0luZGV4ID0gdGhpcy5nZXRTZWxlY3RlZEl0ZW1JbmRleCh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuZmlyc3QoKSk7XHJcbiAgICAgIGNvbnN0IHsgc2VsZWN0ZWRDZWxsIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICBpZiAoc2VsZWN0ZWRDZWxsLnNpemUgPiAwKSB7XHJcbiAgICAgICAgaWYgKHNlbGVjdGVkQ2VsbC5nZXQoJ3Jvd0luZGV4JykgPT09IHJvd0luZGV4ICYmIHNlbGVjdGVkQ2VsbC5nZXQoJ2NvbHVtbktleScpID09PSBjb2x1bW5LZXkpIHtcclxuICAgICAgICAgIHJlZi5mb2N1cygpO1xyXG4gICAgICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWRSb3dJbmRleCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTtcclxuICAgICAgfSBlbHNlIGlmIChzZWxlY3RlZFJvd0luZGV4ID09PSByb3dJbmRleCkge1xyXG4gICAgICAgIHJlZi5mb2N1cygpO1xyXG4gICAgICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZUFycm93TmF2aWdhdGlvbikge1xyXG4gICAgICB0aGlzLmNlbGxSZWZzW2Ake3RoaXMucHJvcHMuZ3JpZC5pZH1fJHtjb2x1bW5LZXl9XyR7cm93SW5kZXh9YF0gPSByZWY7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBtb3ZlQ2VsbEZvY3VzID0gKG5leHRFbGVtZW50LCByb3dJbmRleCwgY29sdW1uSW5kZXgpID0+IHtcclxuICAgIGlmIChuZXh0RWxlbWVudCAmJiAobmV4dEVsZW1lbnQudHlwZSA9PT0gJ3RleHQnIHx8IG5leHRFbGVtZW50LnR5cGUgPT09ICdudW1iZXInKSkge1xyXG4gICAgICBpZiAocm93SW5kZXggIT09IC0xKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGN1cnJlbnRSb3c6IHJvd0luZGV4IH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjb2x1bW5JbmRleCAhPT0gLTEpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgY3VycmVudENvbHVtbjogY29sdW1uSW5kZXggfSk7XHJcbiAgICAgIH1cclxuICAgICAgc2V0VGltZW91dCgoKSA9PiBuZXh0RWxlbWVudC5zZWxlY3QoKSwgNTApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaGFuZGxlU2VsZWN0aW9uQ2hlY2tCb3hPbkNoYW5nZSA9IHJvd0luZGV4ID0+ICgpID0+IHtcclxuICAgIHRoaXMucHJvcHMuaXRlbVNlbGVjdGlvbkNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIHJvd0luZGV4LCB0cnVlLCBmYWxzZSk7XHJcbiAgfVxyXG5cclxuICBnZW5lcmF0ZUNvbHVtbnMgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBjb2x1bW5zID0gW107XHJcbiAgICBjb25zdCB0YWJJbmRleCA9IFN0cmluZyh0aGlzLnByb3BzLnRhYkluZGV4KTtcclxuICAgIGlmICh0aGlzLnByb3BzLnJvd1NlbGVjdENoZWNrYm94Q29sdW1uKSB7XHJcbiAgICAgIGNvbHVtbnMucHVzaCh7XHJcbiAgICAgICAgd2lkdGg6IDQwLFxyXG4gICAgICAgIGlzUmVzaXphYmxlOiBmYWxzZSxcclxuICAgICAgICBjb2x1bW5LZXk6ICdzZWxlY3Rpb25DaGVja2JveCcsXHJcbiAgICAgICAgY2VsbDogKHJvd0luZGV4KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCByb3dJdGVtID0gdGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCk7XHJcbiAgICAgICAgICBjb25zdCBpdGVtSWQgPSByb3dJdGVtLmdldEluKHRoaXMucHJvcHMuZ3JpZC5pZEtleVBhdGgpO1xyXG4gICAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuaW5jbHVkZXMoaXRlbUlkKTtcclxuICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxDaGVja2JveFxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm9jLXJvdy1zZWxlY3QtY2hlY2tib3hcIlxyXG4gICAgICAgICAgICAgIGNoZWNrZWQ9e3NlbGVjdGVkfVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVNlbGVjdGlvbkNoZWNrQm94T25DaGFuZ2Uocm93SW5kZXgpfVxyXG4gICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjZWxsRWRpdDogKCkgPT4gbnVsbCxcclxuICAgICAgICBjZWxsQ3JlYXRlOiAoKSA9PiBudWxsLFxyXG4gICAgICAgIGNlbGxGaWx0ZXI6ICgpID0+IG51bGwsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHZpc2libGVDb2x1bW5zID0gW107XHJcbiAgICB0aGlzLnByb3BzLnZpc2libGVDb2x1bW5zLmZvckVhY2goKHZpc2libGVDb2x1bW5LZXkpID0+IHtcclxuICAgICAgdGhpcy5wcm9wcy5jb2x1bW5zLmZvckVhY2goKG9yZ0NvbCkgPT4ge1xyXG4gICAgICAgIGlmIChVdGlscy5nZXRDb2x1bW5LZXkob3JnQ29sKSA9PT0gdmlzaWJsZUNvbHVtbktleSkge1xyXG4gICAgICAgICAgdmlzaWJsZUNvbHVtbnMucHVzaChvcmdDb2wpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIHZpc2libGVDb2x1bW5zLmZvckVhY2goKGNvbCkgPT4ge1xyXG4gICAgICBjb25zdCBjb2x1bW4gPSB7XHJcbiAgICAgICAgaGVhZGVyOiBjb2wuaGVhZGVyLFxyXG4gICAgICAgIGNvbHVtbktleTogVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCksXHJcbiAgICAgICAgd2lkdGg6IChjb2wud2lkdGggfHwgY29sLndpZHRoID09PSAwID8gY29sLndpZHRoIDogMjAwKSxcclxuICAgICAgICBtaW5XaWR0aDogKGNvbC5taW5XaWR0aCB8fCBjb2wubWluV2lkdGggPT09IDAgPyBjb2wubWluV2lkdGggOiA0MCksXHJcbiAgICAgICAgbWF4V2lkdGg6IGNvbC5tYXhXaWR0aCxcclxuICAgICAgICBpc1Jlc2l6YWJsZTogIWNvbC5kaXNhYmxlUmVzaXppbmcsXHJcbiAgICAgICAgZml4ZWQ6ICEhY29sLmZpeGVkLFxyXG4gICAgICAgIGFsbG93Q2VsbHNSZWN5Y2xpbmc6ICEhY29sLmFsbG93Q2VsbHNSZWN5Y2xpbmcsXHJcbiAgICAgICAgZGlzYWJsZVNvcnRpbmc6ICEhY29sLmRpc2FibGVTb3J0aW5nLFxyXG4gICAgICAgIGlzUmVxdWlyZWQ6ICEhY29sLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgY29tcG9uZW50VHlwZTogY29sLmNvbXBvbmVudFR5cGUsXHJcbiAgICAgICAgc3R5bGU6IFV0aWxzLmdldENlbGxTdHlsZUJ5Q29sKGNvbCksXHJcbiAgICAgIH07XHJcbiAgICAgIGlmIChjb2wudmFsdWVLZXlQYXRoKSB7XHJcbiAgICAgICAgY29sdW1uLnZhbHVlS2V5UGF0aCA9IGNvbC52YWx1ZUtleVBhdGg7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNvbC5mbGV4R3Jvdykge1xyXG4gICAgICAgIGNvbHVtbi5mbGV4R3JvdyA9IGNvbC5mbGV4R3JvdztcclxuICAgICAgfVxyXG4gICAgICBpZiAoY29sLnZhbHVlVHlwZSkge1xyXG4gICAgICAgIGNvbHVtbi52YWx1ZVR5cGUgPSBjb2wudmFsdWVUeXBlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjb2wuc29ydENvbXBhcmF0b3IpIHtcclxuICAgICAgICBjb2x1bW4uc29ydENvbXBhcmF0b3IgPSBjb2wuc29ydENvbXBhcmF0b3I7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNvbC5zb3J0VmFsdWVHZXR0ZXIpIHtcclxuICAgICAgICBjb2x1bW4uc29ydFZhbHVlR2V0dGVyID0gY29sLnNvcnRWYWx1ZUdldHRlcjtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCB2YWx1ZUVtcHR5Q2hlY2tlciA9IFV0aWxzLmdldFZhbHVlRW1wdHlDaGVja2VyKGNvbCk7XHJcbiAgICAgIC8vIENlbGwgdmFsdWUgcmVuZGVyaW5nXHJcbiAgICAgIGNvbnN0IHZhbHVlUmVuZGVyID0gKHJvd0luZGV4LCBmb3JtYXQpID0+IHtcclxuICAgICAgICBjb25zdCB2YWwgPSB0aGlzLnByb3BzLmRhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XHJcbiAgICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbCkpIHtcclxuICAgICAgICAgIHJldHVybiBjb2wuaXNSZXF1aXJlZCA/IDxNIGlkPVwiR3JpZC5WYWx1ZUlzTWlzc2luZ1wiIC8+IDogJyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmb3JtYXQgPyBmb3JtYXQodmFsKSA6IHZhbDtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmIChjb2wuY2VsbCkge1xyXG4gICAgICAgIGNvbHVtbi5jZWxsID0gY29sLmNlbGw7XHJcbiAgICAgIH0gZWxzZSBpZiAoY29sLnZhbHVlUmVuZGVyKSB7XHJcbiAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBjb2wudmFsdWVSZW5kZXIodGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCkpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN3aXRjaCAoY29sLnZhbHVlVHlwZSkge1xyXG4gICAgICAgICAgY2FzZSAnbnVtYmVyJzpcclxuICAgICAgICAgIGNhc2UgJ2Zsb2F0JzpcclxuICAgICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PlxyXG4gICAgICAgICAgICAgIHZhbHVlUmVuZGVyKHJvd0luZGV4LCB2ID0+IDxOIHZhbHVlPXt2fSB7Li4uY29sLnJlbmRlckNvbXBvbmVudFByb3BzfSAvPik7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAnZGF0ZSc6XHJcbiAgICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT5cclxuICAgICAgICAgICAgICB2YWx1ZVJlbmRlcihyb3dJbmRleCwgKHYpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChtb21lbnQodiwgdGhpcy5wcm9wcy5kYXRlRm9ybWF0LCB0cnVlKS5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vbWVudC51dGModiwgdGhpcy5wcm9wcy5kYXRlRm9ybWF0KS5mb3JtYXQodGhpcy5wcm9wcy5kYXRlRm9ybWF0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChtb21lbnQodikuaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiBtb21lbnQudXRjKHYpLmZvcm1hdCh0aGlzLnByb3BzLmRhdGVGb3JtYXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDxNIGlkPVwiR3JpZC5JbnZhbGlkRGF0ZVwiIC8+O1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxyXG4gICAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+XHJcbiAgICAgICAgICAgICAgdmFsdWVSZW5kZXIocm93SW5kZXgsIHYgPT5cclxuICAgICAgICAgICAgICAgIDxNIGlkPXt2ID8gJ0dyaWQuWWVzJyA6ICdHcmlkLk5vJ30gey4uLmNvbC5yZW5kZXJDb21wb25lbnRQcm9wc30gLz4pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gdmFsdWVSZW5kZXIocm93SW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICAvLyBDZWxsIGVkaXQvY3JlYXRlL2ZpbHRlciBjb21wb25lbnQgcmVuZGVyaW5nXHJcbiAgICAgIGlmIChjb2wuY2VsbEVkaXQpIHtcclxuICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSBjb2wuY2VsbEVkaXQ7XHJcbiAgICAgIH0gZWxzZSBpZiAoY29sLmVkaXRWYWx1ZVJlbmRlcikge1xyXG4gICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IGNvbC5lZGl0VmFsdWVSZW5kZXIodGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCkpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjb2wuY2VsbENyZWF0ZSkge1xyXG4gICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gY29sLmNlbGxDcmVhdGU7XHJcbiAgICAgIH0gZWxzZSBpZiAoY29sLmNyZWF0ZVZhbHVlUmVuZGVyKSB7XHJcbiAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiBjb2wuY3JlYXRlVmFsdWVSZW5kZXIodGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCkpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjb2wuY2VsbEZpbHRlcikge1xyXG4gICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gY29sLmNlbGxGaWx0ZXI7XHJcbiAgICAgIH0gZWxzZSBpZiAoY29sLmZpbHRlclZhbHVlUmVuZGVyKSB7XHJcbiAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSByb3dJbmRleCA9PiBjb2wuZmlsdGVyVmFsdWVSZW5kZXIodGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCkpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjb2wuY29tcG9uZW50VHlwZSkge1xyXG4gICAgICAgIGxldCBlZGl0VmFsdWVQYXJzZXIgPSB2YWwgPT4gdmFsO1xyXG4gICAgICAgIHN3aXRjaCAoY29sLmNvbXBvbmVudFR5cGUpIHtcclxuICAgICAgICAgIGNhc2UgJ3RleHQnOlxyXG4gICAgICAgICAgICAvLyBUT0RPIFJFRkFDVE9SIFRPIEZVTkNUSU9OXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmlubGluZUVkaXQpIHtcclxuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsRWRpdCkge1xyXG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gKFxyXG4gICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xcclxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKX1cclxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkVkaXRDZWxsVmFsdWVDaGFuZ2Uocm93SW5kZXgsIGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cclxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMub25FZGl0Q2VsbEJsdXIocm93SW5kZXgsIGNvbCl9XHJcbiAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5vbkNlbGxGb2N1cygnZWRpdCcsIGNvbC5jb21wb25lbnRUeXBlLCByb3dJbmRleCwgY29sdW1uLmNvbHVtbktleSl9XHJcbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLm9uRWRpdENlbGxLZXlEb3duKGNvbCwgcm93SW5kZXgpfVxyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0UmVmPXt0aGlzLmhhbmRsZUVkaXRDZWxsUmVmKHJvd0luZGV4LCBjb2wpfVxyXG4gICAgICAgICAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZEVkaXRJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fS0ke3Jvd0luZGV4fWB9XHJcbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5lZGl0Q29tcG9uZW50UHJvcHN9XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnZWRpdCcpfVxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXtjb2x1bW4uc3R5bGV9XHJcbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxyXG4gICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbENyZWF0ZSkge1xyXG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiAoXHJcbiAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRDcmVhdGVJdGVtVmFsdWUocm93SW5kZXgsIGNvbCl9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DcmVhdGVDZWxsVmFsdWVDaGFuZ2Uocm93SW5kZXgsIGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cclxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMub25DcmVhdGVDZWxsQmx1cihyb3dJbmRleCwgY29sKX1cclxuICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMub25DcmVhdGVDZWxsS2V5RG93bn1cclxuICAgICAgICAgICAgICAgICAgICBpbnB1dFJlZj17dGhpcy5oYW5kbGVDcmVhdGVDZWxsUmVmKHJvd0luZGV4LCBjb2wpfVxyXG4gICAgICAgICAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZENyZWF0ZUlucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YH1cclxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmNyZWF0ZUNvbXBvbmVudFByb3BzfVxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2NyZWF0ZScpfVxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXtjb2x1bW4uc3R5bGV9XHJcbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxyXG4gICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuZmlsdGVyaW5nKSB7XHJcbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbEZpbHRlcikge1xyXG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRGaWx0ZXJJdGVtVmFsdWUoY29sKX1cclxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkZpbHRlckNlbGxWYWx1ZUNoYW5nZShjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkRmlsdGVySW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX1gfVxyXG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuZmlsdGVyQ29tcG9uZW50UHJvcHN9XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e2NvbHVtbi5zdHlsZX1cclxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XHJcbiAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgJ251bWJlcic6XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmlubGluZUVkaXQpIHtcclxuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsRWRpdCkge1xyXG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gKFxyXG4gICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xcclxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uRWRpdENlbGxWYWx1ZUNoYW5nZShyb3dJbmRleCwgY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5vbkVkaXRDZWxsQmx1cihyb3dJbmRleCwgY29sKX1cclxuICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLm9uQ2VsbEZvY3VzKCdlZGl0JywgY29sLmNvbXBvbmVudFR5cGUsIHJvd0luZGV4LCBjb2x1bW4uY29sdW1uS2V5KX1cclxuICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMub25FZGl0Q2VsbEtleURvd24oY29sLCByb3dJbmRleCl9XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRSZWY9e3RoaXMuaGFuZGxlRWRpdENlbGxSZWYocm93SW5kZXgsIGNvbCl9XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkRWRpdElucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YH1cclxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmVkaXRDb21wb25lbnRQcm9wc31cclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdlZGl0Jyl9XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e2NvbHVtbi5zdHlsZX1cclxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XHJcbiAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IChcclxuICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0Q3JlYXRlSXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlKHJvd0luZGV4LCBjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XHJcbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLm9uQ3JlYXRlQ2VsbEJsdXIocm93SW5kZXgsIGNvbCl9XHJcbiAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5vbkNlbGxGb2N1cygnY3JlYXRlJywgJ251bWJlcicsIHJvd0luZGV4LCBjb2x1bW4uY29sdW1uS2V5KX1cclxuICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMub25DcmVhdGVDZWxsS2V5RG93bn1cclxuICAgICAgICAgICAgICAgICAgICBpbnB1dFJlZj17dGhpcy5oYW5kbGVDcmVhdGVDZWxsUmVmKHJvd0luZGV4LCBjb2wpfVxyXG4gICAgICAgICAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZENyZWF0ZUlucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YH1cclxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmNyZWF0ZUNvbXBvbmVudFByb3BzfVxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2NyZWF0ZScpfVxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXtjb2x1bW4uc3R5bGV9XHJcbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxyXG4gICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuZmlsdGVyaW5nKSB7XHJcbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbEZpbHRlcikge1xyXG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldEZpbHRlckl0ZW1WYWx1ZShjb2wpfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uRmlsdGVyQ2VsbFZhbHVlQ2hhbmdlKGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cclxuICAgICAgICAgICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRGaWx0ZXJJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fWB9XHJcbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5maWx0ZXJDb21wb25lbnRQcm9wc31cclxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17Y29sdW1uLnN0eWxlfVxyXG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cclxuICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAnZmxvYXQnOlxyXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIgPSB2YWwgPT5cclxuICAgICAgICAgICAgICB2YWwucmVwbGFjZShuZXcgUmVnRXhwKGBbXlxcXFxkJHt0aGlzLnByb3BzLmRlY2ltYWxTZXBhcmF0b3J9Ky1dYCwgJ2cnKSwgJycpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5pbmxpbmVFZGl0KSB7XHJcbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbEVkaXQpIHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IChcclxuICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCl9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25FZGl0Q2VsbFZhbHVlQ2hhbmdlKHJvd0luZGV4LCBjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XHJcbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLm9uRWRpdENlbGxCbHVyKHJvd0luZGV4LCBjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XHJcbiAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5vbkNlbGxGb2N1cygnZWRpdCcsIGNvbC5jb21wb25lbnRUeXBlLCByb3dJbmRleCwgY29sdW1uLmNvbHVtbktleSl9XHJcbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLm9uRWRpdENlbGxLZXlEb3duKGNvbCwgcm93SW5kZXgpfVxyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0UmVmPXt0aGlzLmhhbmRsZUVkaXRDZWxsUmVmKHJvd0luZGV4LCBjb2wpfVxyXG4gICAgICAgICAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZEVkaXRJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fS0ke3Jvd0luZGV4fWB9XHJcbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5lZGl0Q29tcG9uZW50UHJvcHN9XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnZWRpdCcpfVxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXtjb2x1bW4uc3R5bGV9XHJcbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxyXG4gICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbENyZWF0ZSkge1xyXG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiAoXHJcbiAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRDcmVhdGVJdGVtVmFsdWUocm93SW5kZXgsIGNvbCl9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DcmVhdGVDZWxsVmFsdWVDaGFuZ2Uocm93SW5kZXgsIGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cclxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMub25DcmVhdGVDZWxsQmx1cihyb3dJbmRleCwgY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5vbkNyZWF0ZUNlbGxLZXlEb3dufVxyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0UmVmPXt0aGlzLmhhbmRsZUNyZWF0ZUNlbGxSZWYocm93SW5kZXgsIGNvbCl9XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkQ3JlYXRlSW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX0tJHtyb3dJbmRleH1gfVxyXG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuY3JlYXRlQ29tcG9uZW50UHJvcHN9XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnY3JlYXRlJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e2NvbHVtbi5zdHlsZX1cclxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XHJcbiAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5maWx0ZXJpbmcpIHtcclxuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsRmlsdGVyKSB7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IChcclxuICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldEZpbHRlckl0ZW1WYWx1ZShjb2wpfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uRmlsdGVyQ2VsbFZhbHVlQ2hhbmdlKGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cclxuICAgICAgICAgICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRGaWx0ZXJJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fWB9XHJcbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5maWx0ZXJDb21wb25lbnRQcm9wc31cclxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17Y29sdW1uLnN0eWxlfVxyXG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cclxuICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAnc2VsZWN0Jzoge1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RPcHRpb25zID0gY29sLnNlbGVjdENvbXBvbmVudE9wdGlvbnMgfHxcclxuICAgICAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdENvbXBvbmVudE9wdGlvbnMuZ2V0KGNvbHVtbi5jb2x1bW5LZXkpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5pbmxpbmVFZGl0KSB7XHJcbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbEVkaXQpIHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IChcclxuICAgICAgICAgICAgICAgICAgPEZsb2F0aW5nU2VsZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZT17Y29sLnZhbHVlS2V5UGF0aC5qb2luKCkgKyAnLWVkaXQtJyArIHJvd0luZGV4fVxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29sLmVkaXRTZWxlY3RPcHRpb25zTW9kICYmIHNlbGVjdE9wdGlvbnMgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2wuZWRpdFNlbGVjdE9wdGlvbnNNb2Qoc2VsZWN0T3B0aW9ucy5zbGljZSgpLCByb3dJbmRleCwgY29sKSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdE9wdGlvbnNcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKX1cclxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkVkaXRDZWxsVmFsdWVDaGFuZ2Uocm93SW5kZXgsIGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cclxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMub25FZGl0Q2VsbEJsdXIocm93SW5kZXgsIGNvbCl9XHJcbiAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5vbkNlbGxGb2N1cygnZWRpdCcsIGNvbC5jb21wb25lbnRUeXBlLCByb3dJbmRleCwgY29sdW1uLmNvbHVtbktleSl9XHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoYWJsZT17c2VsZWN0T3B0aW9ucyAmJiAoc2VsZWN0T3B0aW9ucy5sZW5ndGggPiA5KX1cclxuICAgICAgICAgICAgICAgICAgICBjbGVhcmFibGU9eyFjb2wuaXNSZXF1aXJlZH1cclxuICAgICAgICAgICAgICAgICAgICBiYWNrc3BhY2VSZW1vdmVzPXtmYWxzZX1cclxuICAgICAgICAgICAgICAgICAgICB0YWJTZWxlY3RzVmFsdWU9e2ZhbHNlfVxyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5PbkZvY3VzXHJcbiAgICAgICAgICAgICAgICAgICAgcmVmPXt0aGlzLmhhbmRsZUVkaXRDZWxsUmVmKHJvd0luZGV4LCBjb2wpfVxyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcclxuICAgICAgICAgICAgICAgICAgICAgIGlkOiBgb2NEYXRhZ3JpZEVkaXRJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fS0ke3Jvd0luZGV4fWAsXHJcbiAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmVkaXRDb21wb25lbnRQcm9wc31cclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdlZGl0Jyl9XHJcbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxyXG4gICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbENyZWF0ZSkge1xyXG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiAoXHJcbiAgICAgICAgICAgICAgICAgIDxGbG9hdGluZ1NlbGVjdFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU9e2NvbC52YWx1ZUtleVBhdGguam9pbigpICsgJy1jcmVhdGUtJyArIHJvd0luZGV4fVxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29sLmNyZWF0ZVNlbGVjdE9wdGlvbnNNb2QgJiYgc2VsZWN0T3B0aW9ucyA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbC5jcmVhdGVTZWxlY3RPcHRpb25zTW9kKHNlbGVjdE9wdGlvbnMuc2xpY2UoKSwgcm93SW5kZXgsIGNvbCkgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RPcHRpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldENyZWF0ZUl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKX1cclxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZShyb3dJbmRleCwgY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5vbkNyZWF0ZUNlbGxCbHVyKHJvd0luZGV4LCBjb2wpfVxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaGFibGU9e3NlbGVjdE9wdGlvbnMgJiYgKHNlbGVjdE9wdGlvbnMubGVuZ3RoID4gOSl9XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJhYmxlPXshY29sLmlzUmVxdWlyZWR9XHJcbiAgICAgICAgICAgICAgICAgICAgYmFja3NwYWNlUmVtb3Zlcz17ZmFsc2V9XHJcbiAgICAgICAgICAgICAgICAgICAgdGFiU2VsZWN0c1ZhbHVlPXtmYWxzZX1cclxuICAgICAgICAgICAgICAgICAgICBvcGVuT25Gb2N1c1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZj17dGhpcy5oYW5kbGVDcmVhdGVDZWxsUmVmKHJvd0luZGV4LCBjb2wpfVxyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcclxuICAgICAgICAgICAgICAgICAgICAgIGlkOiBgb2NEYXRhZ3JpZENyZWF0ZUlucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YCxcclxuICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuY3JlYXRlQ29tcG9uZW50UHJvcHN9XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnY3JlYXRlJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxyXG4gICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuZmlsdGVyaW5nKSB7XHJcbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbEZpbHRlcikge1xyXG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgIDxGbG9hdGluZ1NlbGVjdFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU9e2NvbC52YWx1ZUtleVBhdGguam9pbigpICsgJy1maWx0ZXInfVxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29sLmZpbHRlclNlbGVjdE9wdGlvbnNNb2QgJiYgc2VsZWN0T3B0aW9ucyA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbC5maWx0ZXJTZWxlY3RPcHRpb25zTW9kKHNlbGVjdE9wdGlvbnMuc2xpY2UoKSwgY29sKSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdE9wdGlvbnN9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0RmlsdGVySXRlbVZhbHVlKGNvbCl9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UoY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaGFibGU9e3NlbGVjdE9wdGlvbnMgJiYgKHNlbGVjdE9wdGlvbnMubGVuZ3RoID4gOSl9XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJhYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgdGFiU2VsZWN0c1ZhbHVlPXtmYWxzZX1cclxuICAgICAgICAgICAgICAgICAgICBvcGVuT25Gb2N1c1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcclxuICAgICAgICAgICAgICAgICAgICAgIGlkOiBgb2NEYXRhZ3JpZEZpbHRlcklucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9YCxcclxuICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuZmlsdGVyQ29tcG9uZW50UHJvcHN9XHJcbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxyXG4gICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjYXNlICdkYXRlJzoge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5pbmxpbmVFZGl0KSB7XHJcbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbEVkaXQpIHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IChcclxuICAgICAgICAgICAgICAgICAgPERhdGVJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCl9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25FZGl0Q2VsbFZhbHVlQ2hhbmdlKHJvd0luZGV4LCBjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XHJcbiAgICAgICAgICAgICAgICAgICAgbGFuZ3VhZ2U9e3RoaXMucHJvcHMubGFuZ3VhZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZUZvcm1hdD17dGhpcy5wcm9wcy5kYXRlRm9ybWF0fVxyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0UmVmPXt0aGlzLmhhbmRsZUVkaXRDZWxsUmVmKHJvd0luZGV4LCBjb2wpfVxyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcclxuICAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgaWQ6IGBvY0RhdGFncmlkRWRpdElucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YCxcclxuICAgICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bjogdGhpcy5vbkVkaXRDZWxsS2V5RG93bihjb2wsIHJvd0luZGV4KSxcclxuICAgICAgICAgICAgICAgICAgICAgIG9uQmx1cjogdGhpcy5vbkVkaXRDZWxsQmx1cihyb3dJbmRleCwgY29sKSxcclxuICAgICAgICAgICAgICAgICAgICAgIG9uRm9jdXM6IHRoaXMub25DZWxsRm9jdXMoJ2VkaXQnLCBjb2wuY29tcG9uZW50VHlwZSwgcm93SW5kZXgsIGNvbHVtbi5jb2x1bW5LZXkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IGNvbHVtbi5zdHlsZSxcclxuICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuZWRpdENvbXBvbmVudFByb3BzfVxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2VkaXQnKX1cclxuICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxDcmVhdGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gKFxyXG4gICAgICAgICAgICAgICAgICA8RGF0ZUlucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0Q3JlYXRlSXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlKHJvd0luZGV4LCBjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XHJcbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLm9uQ3JlYXRlQ2VsbEtleURvd259XHJcbiAgICAgICAgICAgICAgICAgICAgbGFuZ3VhZ2U9e3RoaXMucHJvcHMubGFuZ3VhZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZUZvcm1hdD17dGhpcy5wcm9wcy5kYXRlRm9ybWF0fVxyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0UmVmPXt0aGlzLmhhbmRsZUNyZWF0ZUNlbGxSZWYocm93SW5kZXgsIGNvbCl9XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgICBpZDogYG9jRGF0YWdyaWRDcmVhdGVJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fS0ke3Jvd0luZGV4fWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogY29sdW1uLnN0eWxlLFxyXG4gICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5jcmVhdGVDb21wb25lbnRQcm9wc31cclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdjcmVhdGUnKX1cclxuICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmZpbHRlcmluZykge1xyXG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxGaWx0ZXIpIHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT4gKFxyXG4gICAgICAgICAgICAgICAgICA8RGF0ZUlucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0RmlsdGVySXRlbVZhbHVlKGNvbCl9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UoY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGVGb3JtYXQ9e3RoaXMucHJvcHMuZGF0ZUZvcm1hdH1cclxuICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZT17dGhpcy5wcm9wcy5sYW5ndWFnZX1cclxuICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0YWJJbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgIGlkOiBgb2NEYXRhZ3JpZEZpbHRlcklucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9YCxcclxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBjb2x1bW4uc3R5bGUsXHJcbiAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmZpbHRlckNvbXBvbmVudFByb3BzfVxyXG4gICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjYXNlICdib29sZWFuJzoge1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RPcHRpb25zID0gW1xyXG4gICAgICAgICAgICAgIHsgdmFsdWU6IHRydWUsIGxhYmVsOiB0aGlzLnByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5ZZXMnIH0pIH0sXHJcbiAgICAgICAgICAgICAgeyB2YWx1ZTogZmFsc2UsIGxhYmVsOiB0aGlzLnByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5ObycgfSkgfSxcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5saW5lRWRpdCkge1xyXG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxFZGl0KSB7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiAoXHJcbiAgICAgICAgICAgICAgICAgIDxGbG9hdGluZ1NlbGVjdFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU9e2NvbC52YWx1ZUtleVBhdGguam9pbigpICsgJy1lZGl0LScgKyByb3dJbmRleH1cclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zPXtzZWxlY3RPcHRpb25zfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCl9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25FZGl0Q2VsbFZhbHVlQ2hhbmdlKHJvd0luZGV4LCBjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XHJcbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLm9uRWRpdENlbGxCbHVyKHJvd0luZGV4LCBjb2wpfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMub25DZWxsRm9jdXMoJ2VkaXQnLCBjb2wuY29tcG9uZW50VHlwZSwgcm93SW5kZXgsIGNvbHVtbi5jb2x1bW5LZXkpfVxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaGFibGU9e2ZhbHNlfVxyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyYWJsZT17IWNvbC5pc1JlcXVpcmVkfVxyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tzcGFjZVJlbW92ZXM9e2ZhbHNlfVxyXG4gICAgICAgICAgICAgICAgICAgIHRhYlNlbGVjdHNWYWx1ZT17ZmFsc2V9XHJcbiAgICAgICAgICAgICAgICAgICAgb3Blbk9uRm9jdXNcclxuICAgICAgICAgICAgICAgICAgICByZWY9e3RoaXMuaGFuZGxlRWRpdENlbGxSZWYocm93SW5kZXgsIGNvbCl9XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWQ6IGBvY0RhdGFncmlkRWRpdElucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YCxcclxuICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuZWRpdENvbXBvbmVudFByb3BzfVxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2VkaXQnKX1cclxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XHJcbiAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IChcclxuICAgICAgICAgICAgICAgICAgPEZsb2F0aW5nU2VsZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZT17Y29sLnZhbHVlS2V5UGF0aC5qb2luKCkgKyAnLWNyZWF0ZS0nICsgcm93SW5kZXh9XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucz17c2VsZWN0T3B0aW9uc31cclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRDcmVhdGVJdGVtVmFsdWUocm93SW5kZXgsIGNvbCl9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DcmVhdGVDZWxsVmFsdWVDaGFuZ2Uocm93SW5kZXgsIGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cclxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMub25DcmVhdGVDZWxsQmx1cihyb3dJbmRleCwgY29sKX1cclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hhYmxlPXtmYWxzZX1cclxuICAgICAgICAgICAgICAgICAgICBjbGVhcmFibGU9eyFjb2wuaXNSZXF1aXJlZH1cclxuICAgICAgICAgICAgICAgICAgICBiYWNrc3BhY2VSZW1vdmVzPXtmYWxzZX1cclxuICAgICAgICAgICAgICAgICAgICB0YWJTZWxlY3RzVmFsdWU9e2ZhbHNlfVxyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5PbkZvY3VzXHJcbiAgICAgICAgICAgICAgICAgICAgcmVmPXt0aGlzLmhhbmRsZUNyZWF0ZUNlbGxSZWYocm93SW5kZXgsIGNvbCl9XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWQ6IGBvY0RhdGFncmlkQ3JlYXRlSW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX0tJHtyb3dJbmRleH1gLFxyXG4gICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5jcmVhdGVDb21wb25lbnRQcm9wc31cclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdjcmVhdGUnKX1cclxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XHJcbiAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5maWx0ZXJpbmcpIHtcclxuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsRmlsdGVyKSB7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IChcclxuICAgICAgICAgICAgICAgICAgPEZsb2F0aW5nU2VsZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZT17Y29sLnZhbHVlS2V5UGF0aC5qb2luKCkgKyAnLWZpbHRlcid9XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucz17c2VsZWN0T3B0aW9uc31cclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRGaWx0ZXJJdGVtVmFsdWUoY29sKX1cclxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkZpbHRlckNlbGxWYWx1ZUNoYW5nZShjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoYWJsZT17ZmFsc2V9XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJhYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgdGFiU2VsZWN0c1ZhbHVlPXtmYWxzZX1cclxuICAgICAgICAgICAgICAgICAgICBvcGVuT25Gb2N1c1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcclxuICAgICAgICAgICAgICAgICAgICAgIGlkOiBgb2NEYXRhZ3JpZEZpbHRlcklucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9YCxcclxuICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuZmlsdGVyQ29tcG9uZW50UHJvcHN9XHJcbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxyXG4gICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBjb2x1bW5zLnB1c2goY29sdW1uKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICh0aGlzLnByb3BzLmlzQ3JlYXRpbmcpIHtcclxuICAgICAgY29sdW1ucy5wdXNoKHtcclxuICAgICAgICB3aWR0aDogMzcsXHJcbiAgICAgICAgaXNSZXNpemFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbHVtbktleTogJ3JlbW92ZU5ld0l0ZW0nLFxyXG4gICAgICAgIGNlbGw6ICgpID0+IG51bGwsXHJcbiAgICAgICAgY2VsbEVkaXQ6ICgpID0+IG51bGwsXHJcbiAgICAgICAgY2VsbENyZWF0ZTogcm93SW5kZXggPT4gKFxyXG4gICAgICAgICAgPEljb25cclxuICAgICAgICAgICAgaWQ9e2BvYy1kYXRhZ3JpZC1uZXctaXRlbS1yZW1vdmUtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7cm93SW5kZXh9YH1cclxuICAgICAgICAgICAgdHlwZT1cImluZGljYXRvclwiXHJcbiAgICAgICAgICAgIG5hbWU9XCJkZWxldGVcIlxyXG4gICAgICAgICAgICB3aWR0aD17MzB9XHJcbiAgICAgICAgICAgIGhlaWdodD17MzB9XHJcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMucHJvcHMucmVtb3ZlTmV3SXRlbSh0aGlzLnByb3BzLmdyaWQsIHJvd0luZGV4KX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKSxcclxuICAgICAgICBjZWxsRmlsdGVyOiAoKSA9PiBudWxsLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBjb2x1bW5zO1xyXG4gIH1cclxuXHJcbiAgaXNDZWxsRWRpdGVkID0gKHJvd0luZGV4LCBjb2wsIGNlbGxUeXBlKSA9PiB7XHJcbiAgICBpZiAoY2VsbFR5cGUgIT09ICdlZGl0Jykge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBjb25zdCBpZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XHJcbiAgICBpZiAodGhpcy5wcm9wcy5lZGl0RGF0YS5nZXRJbihbaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKSkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8vIGNoZWNrZXIgZm9yIHNlbGVjdGlvbkNoZWNrYm94XHJcbiAgaXNTZWxlY3Rpb25DaGVja2JveChjZWxsUHJvcHMpIHtcclxuICAgIGNvbnN0IGV4cGVjdGVkQ29sdW1uS2V5ID0gJ3NlbGVjdGlvbkNoZWNrYm94JztcclxuICAgIHJldHVybiAodGhpcy5wcm9wcy5yb3dTZWxlY3RDaGVja2JveENvbHVtbiAmJiBjZWxsUHJvcHMuY29sdW1uS2V5ID09PSBleHBlY3RlZENvbHVtbktleSk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVBZnRlckFkZEl0ZW0gPSAoKSA9PiB7XHJcbiAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGhhbmRsZUFmdGVyRWRpdFByZXNzID0gKCkgPT4ge1xyXG4gICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5zaXplKSB7XHJcbiAgICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gdHJ1ZTtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgY3VycmVudFJvdzogdW5kZWZpbmVkLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhhbmRsZUFmdGVyVmFsaWRhdGlvbkVycm9yID0gKCkgPT4ge1xyXG4gICAgdGhpcy5mb2N1c1RvRXJyb3JDZWxsID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGhhbmRsZVJvd0NsaWNrID0gKGUsIHJvd0luZGV4KSA9PiB7XHJcbiAgICBpZiAodGhpcy5wcm9wcy5yb3dTZWxlY3QgJiYgIXRoaXMucHJvcHMuaXNDcmVhdGluZyAmJiAhdGhpcy5wcm9wcy5pc0VkaXRpbmcpIHtcclxuICAgICAgaWYgKGUuY3RybEtleSB8fCBlLnNoaWZ0S2V5KSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0U2VsZWN0aW9uKCkucmVtb3ZlQWxsUmFuZ2VzKCk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gZG9uJ3QgdHJpZ2dlciBzZWxlY3Rpb24gY2hhbmdlIG9uIGNoZWNrYm94IGNsaWNrXHJcbiAgICAgIGlmIChlLnRhcmdldC50eXBlICE9PSAnY2hlY2tib3gnKSB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5pdGVtU2VsZWN0aW9uQ2hhbmdlKFxyXG4gICAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxyXG4gICAgICAgICAgcm93SW5kZXgsXHJcbiAgICAgICAgICB0aGlzLnByb3BzLm11bHRpU2VsZWN0ICYmIGUuY3RybEtleSxcclxuICAgICAgICAgIHRoaXMucHJvcHMubXVsdGlTZWxlY3QgJiYgZS5zaGlmdEtleSxcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5wcm9wcy5vblJvd0NsaWNrKSB7XHJcbiAgICAgIHRoaXMucHJvcHMub25Sb3dDbGljayhlLCByb3dJbmRleCwgdGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICByZW5kZXJDZWxsID0gY29sID0+IChjZWxsUHJvcHMpID0+IHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgaXNDcmVhdGluZyxcclxuICAgICAgaXNFZGl0aW5nLFxyXG4gICAgICBjcmVhdGVEYXRhLFxyXG4gICAgICBzZWxlY3RlZENlbGwsXHJcbiAgICB9ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IHsgcm93SW5kZXgsIC4uLnByb3BzIH0gPSBjZWxsUHJvcHM7XHJcbiAgICBjb25zdCBpc0NoZWNrYm94ID0gdGhpcy5pc1NlbGVjdGlvbkNoZWNrYm94KGNlbGxQcm9wcyk7XHJcbiAgICBsZXQgY2VsbDtcclxuICAgIGxldCBjZWxsVHlwZSA9ICd2aWV3JztcclxuICAgIGxldCBleHRyYVJvd0NvdW50ID0gMDsgLy8gaG93IG1hbnkgcm93cyB0byBpZ25vcmUgZnJvbSB0b3AsIG5ldyArIGZpbHRlciByb3dzXHJcbiAgICBpZiAoaXNDcmVhdGluZykgZXh0cmFSb3dDb3VudCA9IGNyZWF0ZURhdGEuc2l6ZTtcclxuICAgIGlmIChpc0NyZWF0aW5nKSB7XHJcbiAgICAgIGlmIChyb3dJbmRleCA8PSAoZXh0cmFSb3dDb3VudCAtIDEpKSB7XHJcbiAgICAgICAgaWYgKGNvbC5jZWxsQ3JlYXRlKSB7XHJcbiAgICAgICAgICBjZWxsID0gY29sLmNlbGxDcmVhdGUocm93SW5kZXgpO1xyXG4gICAgICAgICAgY2VsbFR5cGUgPSAnY3JlYXRlJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY2VsbCA9IG51bGw7XHJcbiAgICAgICAgICBjZWxsVHlwZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNlbGwgPSBjb2wuY2VsbChyb3dJbmRleCAtIGV4dHJhUm93Q291bnQpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGlzRWRpdGluZyAmJiBjb2wuY2VsbEVkaXQpIHtcclxuICAgICAgY2VsbCA9IGNvbC5jZWxsRWRpdChyb3dJbmRleCAtIGV4dHJhUm93Q291bnQpO1xyXG4gICAgICBjZWxsVHlwZSA9ICdlZGl0JztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNlbGwgPSBjb2wuY2VsbChyb3dJbmRleCAtIGV4dHJhUm93Q291bnQpO1xyXG4gICAgfVxyXG4gICAgaWYgKChjZWxsVHlwZSA9PT0gJ3ZpZXcnIHx8IGNlbGxUeXBlID09PSAnZWRpdCcgfHwgY2VsbFR5cGUgPT09ICdjcmVhdGUnKSAmJiAhaXNDaGVja2JveCkge1xyXG4gICAgICBjb25zdCBnZXRSb3dJbmRleCA9IChjZWxsVHlwZSA9PT0gJ2NyZWF0ZScpID8gcm93SW5kZXggOiAocm93SW5kZXggLSBleHRyYVJvd0NvdW50KTtcclxuICAgICAgY29uc3QgbWVzc2FnZURhdGEgPSB0aGlzLmdldENlbGxNZXNzYWdlcyhnZXRSb3dJbmRleCwgY29sLCBjZWxsVHlwZSk7XHJcbiAgICAgIGNvbnN0IGlzRWRpdGVkID0gdGhpcy5pc0NlbGxFZGl0ZWQoZ2V0Um93SW5kZXgsIGNvbCwgY2VsbFR5cGUpO1xyXG4gICAgICBjb25zdCBjbGFzc05hbWUgPSAoc2VsZWN0ZWRDZWxsLmdldCgncm93SW5kZXgnKSA9PT0gcm93SW5kZXggJiYgc2VsZWN0ZWRDZWxsLmdldCgnY29sdW1uS2V5JykgPT09IHByb3BzLmNvbHVtbktleSkgP1xyXG4gICAgICAgICdvYy1kYXRhZ3JpZC1jZWxsIGlzLXNlbGVjdGVkJyA6ICdvYy1kYXRhZ3JpZC1jZWxsJztcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8Q2VsbFxyXG4gICAgICAgICAgey4uLnByb3BzfVxyXG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XHJcbiAgICAgICAgICBzdHlsZT17Y29sLnN0eWxlfVxyXG4gICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDZWxsU2VsZWN0KGNlbGxUeXBlLCByb3dJbmRleCwgcHJvcHMuY29sdW1uS2V5KX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8Q2VsbFRvb2x0aXBcclxuICAgICAgICAgICAgaWQ9e2NlbGxUeXBlICsgY29sLmNvbHVtbktleSArIChyb3dJbmRleCAtIGV4dHJhUm93Q291bnQpfVxyXG4gICAgICAgICAgICBpc0VkaXRlZD17aXNFZGl0ZWR9XHJcbiAgICAgICAgICAgIGlzRXJyb3I9eyEhbWVzc2FnZURhdGEuZXJyb3JNZXNzYWdlfVxyXG4gICAgICAgICAgICBpc1dhcm5pbmc9eyEhbWVzc2FnZURhdGEud2FybmluZ01lc3NhZ2V9XHJcbiAgICAgICAgICAgIGluZm9NZXNzYWdlPXttZXNzYWdlRGF0YS5pbmZvTWVzc2FnZX1cclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlPXttZXNzYWdlRGF0YS5lcnJvck1lc3NhZ2V9XHJcbiAgICAgICAgICAgIHdhcm5pbmdNZXNzYWdlPXttZXNzYWdlRGF0YS53YXJuaW5nTWVzc2FnZX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgeyBjZWxsIH1cclxuICAgICAgICAgIDwvQ2VsbFRvb2x0aXA+XHJcbiAgICAgICAgPC9DZWxsPlxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPENlbGwgey4uLnByb3BzfSBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1jZWxsXCIgc3R5bGU9e2NvbC5zdHlsZX0+eyBjZWxsIH08L0NlbGw+XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyQ29sdW1ucyA9ICgpID0+IHtcclxuICAgIGlmICghdGhpcy5wcm9wcy5hbGxEYXRhU2l6ZSAmJiAhdGhpcy5wcm9wcy5pc0J1c3kgJiYgIXRoaXMucHJvcHMuaXNDcmVhdGluZykge1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxDb2x1bW5cclxuICAgICAgICAgIGNvbHVtbktleT1cImRhdGFFbXB0eUNvbHVtblwiXHJcbiAgICAgICAgICBoZWFkZXI9ezxDZWxsIHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicgfX0+PE0gaWQ9XCJHcmlkLk5vSXRlbXNcIiAvPjwvQ2VsbD59XHJcbiAgICAgICAgICB3aWR0aD17MTB9XHJcbiAgICAgICAgICBpc1Jlc2l6YWJsZT17ZmFsc2V9XHJcbiAgICAgICAgICBmbGV4R3Jvdz17MX1cclxuICAgICAgICAvPlxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLnByb3BzLnZpc2libGVDb2x1bW5zLnNpemUpIHtcclxuICAgICAgaWYgKHRoaXMucHJvcHMuaXNCdXN5KSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgIDxDb2x1bW5cclxuICAgICAgICAgICAgY29sdW1uS2V5PVwiZGF0YUVtcHR5Q29sdW1uXCJcclxuICAgICAgICAgICAgaGVhZGVyPXs8Q2VsbD4mbmJzcDs8L0NlbGw+fVxyXG4gICAgICAgICAgICB3aWR0aD17MTB9XHJcbiAgICAgICAgICAgIGlzUmVzaXphYmxlPXtmYWxzZX1cclxuICAgICAgICAgICAgZmxleEdyb3c9ezF9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8Q29sdW1uXHJcbiAgICAgICAgICBjb2x1bW5LZXk9XCJkYXRhRW1wdHlDb2x1bW5cIlxyXG4gICAgICAgICAgaGVhZGVyPXs8Q2VsbCBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInIH19PjxNIGlkPVwiR3JpZC5Ob0NvbHVtbnNcIiAvPjwvQ2VsbD59XHJcbiAgICAgICAgICB3aWR0aD17MTB9XHJcbiAgICAgICAgICBpc1Jlc2l6YWJsZT17ZmFsc2V9XHJcbiAgICAgICAgICBmbGV4R3Jvdz17MX1cclxuICAgICAgICAvPlxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgY29uc3QgY29sdW1ucyA9IHRoaXMuZ2VuZXJhdGVDb2x1bW5zKCk7XHJcbiAgICBpZiAoY29sdW1ucy5sZW5naHQgPT09IDApIHJldHVybiBudWxsO1xyXG4gICAgcmV0dXJuIGNvbHVtbnMubWFwKGNvbCA9PiAoXHJcbiAgICAgIDxDb2x1bW5cclxuICAgICAgICBrZXk9e2NvbC5jb2x1bW5LZXl9XHJcbiAgICAgICAgY29sdW1uS2V5PXtjb2wuY29sdW1uS2V5fVxyXG4gICAgICAgIGhlYWRlcj17XHJcbiAgICAgICAgICA8SGVhZGVyQ2VsbFxyXG4gICAgICAgICAgICBncmlkPXt0aGlzLnByb3BzLmdyaWR9XHJcbiAgICAgICAgICAgIGNvbHVtbnM9e3RoaXMucHJvcHMuY29sdW1uc31cclxuICAgICAgICAgICAgY29sdW1uPXtjb2x9XHJcbiAgICAgICAgICAgIGN1cnJlbnRTb3J0Q29sdW1uPXt0aGlzLnByb3BzLnNvcnRDb2x1bW59XHJcbiAgICAgICAgICAgIGN1cnJlbnRTb3J0T3JkZXI9e3RoaXMucHJvcHMuc29ydE9yZGVyfVxyXG4gICAgICAgICAgICBvblNvcnRDaGFuZ2U9e3RoaXMucHJvcHMuc29ydENoYW5nZX1cclxuICAgICAgICAgICAgaXNCdXN5PXt0aGlzLnByb3BzLmlzQnVzeX1cclxuICAgICAgICAgICAgZmlsdGVyaW5nPXt0aGlzLnByb3BzLmlzRmlsdGVyaW5nfVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICB7Y29sLmhlYWRlcn1cclxuICAgICAgICAgIDwvSGVhZGVyQ2VsbD5cclxuICAgICAgICB9XHJcbiAgICAgICAgY2VsbD17dGhpcy5yZW5kZXJDZWxsKGNvbCl9XHJcbiAgICAgICAgd2lkdGg9e3RoaXMucHJvcHMuY29sdW1uV2lkdGhzLmdldChjb2wuY29sdW1uS2V5LCBjb2wud2lkdGgpfVxyXG4gICAgICAgIG1pbldpZHRoPXtjb2wubWluV2lkdGh9XHJcbiAgICAgICAgbWF4V2lkdGg9e2NvbC5tYXhXaWR0aH1cclxuICAgICAgICBpc1Jlc2l6YWJsZT17Y29sLmlzUmVzaXphYmxlfVxyXG4gICAgICAgIGZsZXhHcm93PXtjb2wuZmxleEdyb3cgPyBjb2wuZmxleEdyb3cgOiAwfVxyXG4gICAgICAgIGZpeGVkPXtjb2wuZml4ZWR9XHJcbiAgICAgICAgYWxsb3dDZWxsc1JlY3ljbGluZz17Y29sLmFsbG93Q2VsbHNSZWN5Y2xpbmd9XHJcbiAgICAgIC8+KSk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCBncmlkQ2xhc3NOYW1lID0gY2xhc3NOYW1lcyh7XHJcbiAgICAgICdvYy1kYXRhZ3JpZC1jb250YWluZXInOiB0cnVlLFxyXG4gICAgICAnd2l0aC1hY3Rpb25iYXInOiB0aGlzLnByb3BzLmlubGluZUVkaXQgJiYgIXRoaXMucHJvcHMuZGlzYWJsZUFjdGlvbkJhcixcclxuICAgICAgJ2lzLWJ1c3knOiB0aGlzLnByb3BzLmlzQnVzeSxcclxuICAgICAgJ2lzLWVkaXRpbmcnOiB0aGlzLnByb3BzLmlzRWRpdGluZyxcclxuICAgICAgJ2lzLWNyZWF0aW5nJzogdGhpcy5wcm9wcy5pc0NyZWF0aW5nLFxyXG4gICAgfSk7XHJcbiAgICBsZXQgYWN0aW9uQmFyID0gbnVsbDtcclxuICAgIGxldCBhY3Rpb25CYXJSaWdodCA9IG51bGw7XHJcbiAgICBsZXQgYWN0aW9uQmFyTGVmdCA9IG51bGw7XHJcbiAgICBpZiAoXHJcbiAgICAgICh0aGlzLnByb3BzLmFjdGlvbkJhciB8fFxyXG4gICAgICB0aGlzLnByb3BzLmlubGluZUVkaXQgfHxcclxuICAgICAgdGhpcy5wcm9wcy5maWx0ZXJpbmcgfHxcclxuICAgICAgdGhpcy5wcm9wcy5yZW1vdmluZykgJiZcclxuICAgICAgIXRoaXMucHJvcHMuZGlzYWJsZUFjdGlvbkJhclxyXG4gICAgKSB7XHJcbiAgICAgIGFjdGlvbkJhclJpZ2h0ID0gKFxyXG4gICAgICAgIDxBY3Rpb25CYXIgcG9zaXRpb249XCJyaWdodFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1hY3Rpb25iYXItcmlnaHRcIj57IHRoaXMucHJvcHMuYWN0aW9uQmFyIH08L2Rpdj5cclxuICAgICAgICAgIHsgKHRoaXMucHJvcHMuZmlsdGVyaW5nICYmIHRoaXMucHJvcHMuZGlzYWJsZURyb3Bkb3duXHJcbiAgICAgICAgICAgICYmICF0aGlzLnByb3BzLmRpc2FibGVGaWx0ZXJpbmdDb250cm9scykgJiZcclxuICAgICAgICAgICAgPEZpbHRlcmluZ0NvbnRyb2xzIHsuLi50aGlzLnByb3BzfSAvPlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgeyB0aGlzLnByb3BzLmlubGluZUVkaXQgJiZcclxuICAgICAgICAgICAgPElubGluZUVkaXRDb250cm9sc1xyXG4gICAgICAgICAgICAgIGFmdGVyQWRkSXRlbT17dGhpcy5oYW5kbGVBZnRlckFkZEl0ZW19XHJcbiAgICAgICAgICAgICAgYWZ0ZXJFZGl0UHJlc3M9e3RoaXMuaGFuZGxlQWZ0ZXJFZGl0UHJlc3N9XHJcbiAgICAgICAgICAgICAgYWZ0ZXJWYWxpZGF0aW9uRXJyb3I9e3RoaXMuaGFuZGxlQWZ0ZXJWYWxpZGF0aW9uRXJyb3J9XHJcbiAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB7ICh0aGlzLnByb3BzLmRyb3Bkb3duTWVudUl0ZW1zIHx8XHJcbiAgICAgICAgICAgICB0aGlzLnByb3BzLnJlbW92aW5nIHx8XHJcbiAgICAgICAgICAgICB0aGlzLnByb3BzLmNvbHVtblNldHRpbmdzIHx8XHJcbiAgICAgICAgICAgICAodGhpcy5wcm9wcy5maWx0ZXJpbmcgJiYgIXRoaXMucHJvcHMuZGlzYWJsZURyb3Bkb3duKSkgJiZcclxuICAgICAgICAgICAgIDxEcm9wZG93bkNvbnRyb2xzIHsuLi50aGlzLnByb3BzfSAvPlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIDwvQWN0aW9uQmFyPlxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMucHJvcHMuYWN0aW9uQmFyTGVmdCB8fCB0aGlzLnByb3BzLmdyaWRIZWFkZXIpIHtcclxuICAgICAgYWN0aW9uQmFyTGVmdCA9IChcclxuICAgICAgICA8QWN0aW9uQmFyIHBvc2l0aW9uPVwibGVmdFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1ncmlkaGVhZGVyXCI+eyB0aGlzLnByb3BzLmdyaWRIZWFkZXIgfTwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1hY3Rpb25iYXItbGVmdFwiPnsgdGhpcy5wcm9wcy5hY3Rpb25CYXJMZWZ0IH08L2Rpdj5cclxuICAgICAgICA8L0FjdGlvbkJhcj5cclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIGlmIChhY3Rpb25CYXJMZWZ0IHx8IGFjdGlvbkJhclJpZ2h0KSB7XHJcbiAgICAgIGFjdGlvbkJhciA9IChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWFjdGlvbmJhci1jb250YWluZXJcIj5cclxuICAgICAgICAgIHsgYWN0aW9uQmFyTGVmdCB9XHJcbiAgICAgICAgICB7IGFjdGlvbkJhclJpZ2h0IH1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIGxldCByb3dzQ291bnQgPVxyXG4gICAgICAodGhpcy5wcm9wcy5yb3dzQ291bnQgfHwgdGhpcy5wcm9wcy5yb3dzQ291bnQgPT09IDApID9cclxuICAgICAgICB0aGlzLnByb3BzLnJvd3NDb3VudCA6XHJcbiAgICAgICAgdGhpcy5wcm9wcy5kYXRhLnNpemU7XHJcbiAgICBpZiAodGhpcy5wcm9wcy5pc0NyZWF0aW5nKSByb3dzQ291bnQgKz0gdGhpcy5wcm9wcy5jcmVhdGVEYXRhLnNpemU7XHJcbiAgICBpZiAoIXRoaXMucHJvcHMudmlzaWJsZUNvbHVtbnMuc2l6ZSkgcm93c0NvdW50ID0gMDtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXZcclxuICAgICAgICBpZD17YG9jLWRhdGFncmlkLSR7dGhpcy5wcm9wcy5ncmlkLmlkfWB9XHJcbiAgICAgICAgY2xhc3NOYW1lPXtncmlkQ2xhc3NOYW1lfVxyXG4gICAgICAgIHN0eWxlPXt0aGlzLnByb3BzLmNvbnRhaW5lclN0eWxlfVxyXG4gICAgICA+XHJcbiAgICAgICAgeyB0aGlzLnByb3BzLmlzQnVzeSAmJiA8U3Bpbm5lciAvPiB9XHJcbiAgICAgICAgeyBhY3Rpb25CYXIgfVxyXG4gICAgICAgIDxSZXNwb25zaXZlRml4ZWREYXRhVGFibGVcclxuICAgICAgICAgIGlkPXt0aGlzLnByb3BzLmdyaWQuaWR9XHJcbiAgICAgICAgICByb3dzQ291bnQ9e3Jvd3NDb3VudH1cclxuICAgICAgICAgIGhlYWRlckhlaWdodD17dGhpcy5wcm9wcy5pc0ZpbHRlcmluZyA/XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaGVhZGVySGVpZ2h0ICsgdGhpcy5wcm9wcy5maWx0ZXJSb3dIZWlnaHRcclxuICAgICAgICAgICAgOiB0aGlzLnByb3BzLmhlYWRlckhlaWdodH1cclxuICAgICAgICAgIHJvd0hlaWdodD17dGhpcy5wcm9wcy5yb3dIZWlnaHR9XHJcbiAgICAgICAgICBvbkNvbHVtblJlc2l6ZUVuZENhbGxiYWNrPXt0aGlzLm9uQ29sdW1uUmVzaXplRW5kQ2FsbGJhY2t9XHJcbiAgICAgICAgICBpc0NvbHVtblJlc2l6aW5nPXtmYWxzZX1cclxuICAgICAgICAgIG9uUm93Q2xpY2s9e3RoaXMuaGFuZGxlUm93Q2xpY2t9XHJcbiAgICAgICAgICBzY3JvbGxUb0NvbHVtbj17dGhpcy5wcm9wcy5zY3JvbGxUb0NvbHVtbiB8fCB0aGlzLnN0YXRlLmN1cnJlbnRDb2x1bW59XHJcbiAgICAgICAgICBzY3JvbGxUb3A9e3RoaXMucHJvcHMuc2Nyb2xsVG9wfVxyXG4gICAgICAgICAgc2Nyb2xsVG9Sb3c9e3RoaXMuZ2V0U2Nyb2xsVG9Sb3coKX1cclxuICAgICAgICAgIG9uUm93RG91YmxlQ2xpY2s9e3RoaXMucHJvcHMub25Sb3dEb3VibGVDbGlja31cclxuICAgICAgICAgIG9uUm93TW91c2VEb3duPXt0aGlzLnByb3BzLm9uUm93TW91c2VEb3dufVxyXG4gICAgICAgICAgb25Sb3dNb3VzZUVudGVyPXt0aGlzLnByb3BzLm9uUm93TW91c2VFbnRlcn1cclxuICAgICAgICAgIG9uUm93TW91c2VMZWF2ZT17dGhpcy5wcm9wcy5vblJvd01vdXNlTGVhdmV9XHJcbiAgICAgICAgICBvblNjcm9sbFN0YXJ0PXt0aGlzLnByb3BzLm9uU2Nyb2xsU3RhcnR9XHJcbiAgICAgICAgICBvblNjcm9sbEVuZD17dGhpcy5wcm9wcy5vblNjcm9sbEVuZH1cclxuICAgICAgICAgIHJvd0NsYXNzTmFtZUdldHRlcj17dGhpcy5nZXRSb3dDbGFzc05hbWV9XHJcbiAgICAgICAgICByb3dIZWlnaHRHZXR0ZXI9e3RoaXMucHJvcHMucm93SGVpZ2h0R2V0dGVyfVxyXG4gICAgICAgICAgb25Db250ZW50SGVpZ2h0Q2hhbmdlPXt0aGlzLnByb3BzLm9uQ29udGVudEhlaWdodENoYW5nZX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICB7IHRoaXMucmVuZGVyQ29sdW1ucygpIH1cclxuICAgICAgICA8L1Jlc3BvbnNpdmVGaXhlZERhdGFUYWJsZT5cclxuICAgICAgICB7IHRoaXMucHJvcHMuaXNDb2x1bW5TZXR0aW5nc01vZGFsT3BlbiAmJlxyXG4gICAgICAgICAgPENvbHVtblNldHRpbmdzTW9kYWxcclxuICAgICAgICAgICAgZ3JpZD17dGhpcy5wcm9wcy5ncmlkfVxyXG4gICAgICAgICAgICBjb2x1bW5zPXt0aGlzLnByb3BzLmNvbHVtbnN9XHJcbiAgICAgICAgICAgIHZpc2libGVDb2x1bW5zPXt0aGlzLnByb3BzLnZpc2libGVDb2x1bW5zfVxyXG4gICAgICAgICAgICBjbG9zZUNvbHVtblNldHRpbmdzTW9kYWw9e3RoaXMucHJvcHMuY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsfVxyXG4gICAgICAgICAgICBzYXZlQ29sdW1uU2V0dGluZ3M9e3RoaXMucHJvcHMuc2F2ZUNvbHVtblNldHRpbmdzfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICB9XHJcbiAgICAgICAgeyB0aGlzLnByb3BzLmNoaWxkcmVuIH1cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=