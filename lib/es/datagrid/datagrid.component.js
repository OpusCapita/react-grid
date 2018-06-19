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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiTWFwIiwiTGlzdCIsImNvbm5lY3QiLCJpbmplY3RJbnRsIiwiRm9ybWF0dGVkTWVzc2FnZSIsIk0iLCJGb3JtYXR0ZWROdW1iZXIiLCJOIiwiQ29sdW1uIiwiQ2VsbCIsIkNoZWNrYm94IiwiRm9ybUNvbnRyb2wiLCJjbGFzc05hbWVzIiwibW9tZW50IiwiRmxvYXRpbmdTZWxlY3QiLCJEYXRlSW5wdXQiLCJJY29uIiwiU3Bpbm5lciIsIlJlc3BvbnNpdmVGaXhlZERhdGFUYWJsZSIsIkhlYWRlckNlbGwiLCJBY3Rpb25CYXIiLCJJbmxpbmVFZGl0Q29udHJvbHMiLCJGaWx0ZXJpbmdDb250cm9scyIsIkRyb3Bkb3duQ29udHJvbHMiLCJkYXRhZ3JpZEFjdGlvbnMiLCJDZWxsVG9vbHRpcCIsIkNvbHVtblNldHRpbmdzTW9kYWwiLCJwcm9wVHlwZXMiLCJkZWZhdWx0UHJvcHMiLCJLRVlfQ09ERVMiLCJVdGlscyIsIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwib3duUHJvcHMiLCJHUklEIiwiZ3JpZCIsImlzQnVzeSIsImRhdGFncmlkIiwiZ2V0SW4iLCJpZCIsImlzRWRpdGluZyIsImlzQ3JlYXRpbmciLCJpc0ZpbHRlcmluZyIsImlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW4iLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwidmlzaWJsZUNvbHVtbnMiLCJjb2x1bW5XaWR0aHMiLCJzZWxlY3RlZENlbGwiLCJzZWxlY3RlZEl0ZW1zIiwiZGF0YSIsImVkaXREYXRhIiwiY3JlYXRlRGF0YSIsImZpbHRlckRhdGEiLCJjZWxsTWVzc2FnZXMiLCJjcmVhdGVDZWxsTWVzc2FnZXMiLCJhbGxEYXRhU2l6ZSIsInNpemUiLCJsYW5ndWFnZSIsImdldExhbmd1YWdlIiwidXNlciIsImRhdGVGb3JtYXQiLCJnZXREYXRlRm9ybWF0IiwidGhvdXNhbmRTZXBhcmF0b3IiLCJnZXRUaG91c2FuZFNlcGFyYXRvciIsImRlY2ltYWxTZXBhcmF0b3IiLCJnZXREZWNpbWFsU2VwYXJhdG9yIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwiRGF0YUdyaWQiLCJwcm9wcyIsImN1cnJlbnRSb3ciLCJjdXJyZW50Q29sdW1uIiwiY2VsbFJlZnMiLCJmb2N1c1RvQ3JlYXRlQ2VsbCIsImZvY3VzVG9FZGl0Q2VsbCIsImZvY3VzVG9FcnJvckNlbGwiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImludmFsaWRhdGUiLCJpc1NlbGVjdGlvbkNoZWNrYm94IiwiY2VsbFByb3BzIiwiZXhwZWN0ZWRDb2x1bW5LZXkiLCJyb3dTZWxlY3RDaGVja2JveENvbHVtbiIsImNvbHVtbktleSIsInJlbmRlciIsImdyaWRDbGFzc05hbWUiLCJpbmxpbmVFZGl0IiwiZGlzYWJsZUFjdGlvbkJhciIsImFjdGlvbkJhciIsImFjdGlvbkJhclJpZ2h0IiwiYWN0aW9uQmFyTGVmdCIsImZpbHRlcmluZyIsInJlbW92aW5nIiwiZGlzYWJsZURyb3Bkb3duIiwiZGlzYWJsZUZpbHRlcmluZ0NvbnRyb2xzIiwiaGFuZGxlQWZ0ZXJBZGRJdGVtIiwiaGFuZGxlQWZ0ZXJFZGl0UHJlc3MiLCJoYW5kbGVBZnRlclZhbGlkYXRpb25FcnJvciIsImRyb3Bkb3duTWVudUl0ZW1zIiwiY29sdW1uU2V0dGluZ3MiLCJncmlkSGVhZGVyIiwicm93c0NvdW50IiwiY29udGFpbmVyU3R5bGUiLCJoZWFkZXJIZWlnaHQiLCJmaWx0ZXJSb3dIZWlnaHQiLCJyb3dIZWlnaHQiLCJvbkNvbHVtblJlc2l6ZUVuZENhbGxiYWNrIiwiaGFuZGxlUm93Q2xpY2siLCJzY3JvbGxUb0NvbHVtbiIsInNjcm9sbFRvcCIsImdldFNjcm9sbFRvUm93Iiwib25Sb3dEb3VibGVDbGljayIsIm9uUm93TW91c2VEb3duIiwib25Sb3dNb3VzZUVudGVyIiwib25Sb3dNb3VzZUxlYXZlIiwib25TY3JvbGxTdGFydCIsIm9uU2Nyb2xsRW5kIiwiZ2V0Um93Q2xhc3NOYW1lIiwicm93SGVpZ2h0R2V0dGVyIiwib25Db250ZW50SGVpZ2h0Q2hhbmdlIiwicmVuZGVyQ29sdW1ucyIsImNvbHVtbnMiLCJjbG9zZUNvbHVtblNldHRpbmdzTW9kYWwiLCJzYXZlQ29sdW1uU2V0dGluZ3MiLCJjaGlsZHJlbiIsIlB1cmVDb21wb25lbnQiLCJuZXdDb2x1bW5XaWR0aCIsInJlc2l6ZUNvbHVtbiIsIm9uQ3JlYXRlQ2VsbEtleURvd24iLCJlIiwia2V5Q29kZSIsIkVOVEVSIiwiYWRkTmV3SXRlbSIsImdldENvbHVtbkRlZmF1bHRWYWx1ZXMiLCJvbkVkaXRDZWxsS2V5RG93biIsImNvbCIsInJvd0luZGV4IiwiZW5hYmxlQXJyb3dOYXZpZ2F0aW9uIiwicm93c1NpemUiLCJnZXRDb2x1bW5LZXkiLCJET1dOIiwidmFsdWVUeXBlIiwibmV4dEVsZW1lbnQiLCJtb3ZlQ2VsbEZvY3VzIiwiVVAiLCJUQUIiLCJSSUdIVCIsIkxFRlQiLCJwcmV2ZW50RGVmYXVsdCIsImNvbHVtbkluZCIsImZpbmRJbmRleCIsImMiLCJ2YWx1ZUtleVBhdGgiLCJqb2luIiwiZGlzYWJsZWQiLCJyb3dJbmQiLCJzaGlmdEtleSIsImxlbmd0aCIsIm5leHRDb2x1bW5LZXkiLCJvbkZpbHRlckNlbGxWYWx1ZUNoYW5nZSIsInZhbHVlUGFyc2VyIiwiZXZlbnRPckRhdGEiLCJyYXdWYWx1ZSIsInRhcmdldCIsInVuZGVmaW5lZCIsInZhbHVlIiwiZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlIiwib25DcmVhdGVDZWxsVmFsdWVDaGFuZ2UiLCJjcmVhdGVDZWxsVmFsdWVDaGFuZ2UiLCJvbkNyZWF0ZVZhbHVlQ2hhbmdlIiwib25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUiLCJtYXRjaFZhbHVlIiwibmV3VmFsdWVLZXlQYXRoIiwidiIsIm5ld1ZhbHVlIiwidmFsaWRhdG9ycyIsImNyZWF0ZUNlbGxWYWx1ZVZhbGlkYXRlIiwib25FZGl0Q2VsbFZhbHVlQ2hhbmdlIiwiZGF0YUlkIiwiZ2V0RGF0YUlkQnlSb3dJbmRleCIsImVkaXRDZWxsVmFsdWVDaGFuZ2UiLCJvbkVkaXRWYWx1ZUNoYW5nZSIsImVkaXRDZWxsVmFsdWVWYWxpZGF0ZSIsIm9uQ3JlYXRlQ2VsbEJsdXIiLCJvbkNyZWF0ZUJsdXIiLCJnZXRFZGl0SXRlbVZhbHVlIiwib25FZGl0Q2VsbEJsdXIiLCJvbkVkaXRCbHVyIiwib25DZWxsRm9jdXMiLCJjZWxsVHlwZSIsImlucHV0VHlwZSIsInNlbGVjdCIsImNlbGxTZWxlY3QiLCJjZWxsU2VsZWN0aW9uQ2hhbmdlIiwiaWRLZXlQYXRoIiwiZ2V0U2VsZWN0ZWRJdGVtSW5kZXgiLCJpbmRleCIsImVkaXRWYWx1ZSIsIm9yaWdpbmFsVmFsdWUiLCJjb21wb25lbnRUeXBlIiwiU3RyaW5nIiwicmVwbGFjZSIsImdldENyZWF0ZUl0ZW1WYWx1ZSIsInZhbCIsImdldEZpbHRlckl0ZW1WYWx1ZSIsImdldCIsImdldENvbXBvbmVudERpc2FibGVkU3RhdGUiLCJtb2RlIiwiY29tcG9uZW50RGlzYWJsZWQiLCJkaXNhYmxlRWRpdGluZyIsImRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoIiwibWF0Y2hWYWx1ZUtleVBhdGgiLCJyb3dDbGFzc05hbWVzIiwiZXh0cmFSb3dDb3VudCIsInB1c2giLCJpbmRleE9mIiwicm93Q2xhc3NOYW1lR2V0dGVyIiwiZ2V0Q2VsbE1lc3NhZ2VzIiwicmV0dXJuRGF0YSIsImluZm9NZXNzYWdlIiwiZXJyb3JNZXNzYWdlIiwid2FybmluZ01lc3NhZ2UiLCJzY3JvbGxUb1JvdyIsInNjcm9sbE5ld1JvdyIsImZpcnN0IiwiaGFuZGxlQ2VsbFNlbGVjdCIsImhhbmRsZUNyZWF0ZUNlbGxSZWYiLCJyZWYiLCJmb2N1cyIsImhhbmRsZUVkaXRDZWxsUmVmIiwic2VsZWN0ZWRSb3dJbmRleCIsImNvbHVtbkluZGV4IiwidHlwZSIsInNldFN0YXRlIiwic2V0VGltZW91dCIsImhhbmRsZVNlbGVjdGlvbkNoZWNrQm94T25DaGFuZ2UiLCJpdGVtU2VsZWN0aW9uQ2hhbmdlIiwiZ2VuZXJhdGVDb2x1bW5zIiwidGFiSW5kZXgiLCJ3aWR0aCIsImlzUmVzaXphYmxlIiwiY2VsbCIsInJvd0l0ZW0iLCJpdGVtSWQiLCJzZWxlY3RlZCIsImluY2x1ZGVzIiwiY2VsbEVkaXQiLCJjZWxsQ3JlYXRlIiwiY2VsbEZpbHRlciIsImZvckVhY2giLCJ2aXNpYmxlQ29sdW1uS2V5Iiwib3JnQ29sIiwiY29sdW1uIiwiaGVhZGVyIiwibWluV2lkdGgiLCJtYXhXaWR0aCIsImRpc2FibGVSZXNpemluZyIsImZpeGVkIiwiYWxsb3dDZWxsc1JlY3ljbGluZyIsImRpc2FibGVTb3J0aW5nIiwiaXNSZXF1aXJlZCIsInN0eWxlIiwiZ2V0Q2VsbFN0eWxlQnlDb2wiLCJmbGV4R3JvdyIsInNvcnRDb21wYXJhdG9yIiwic29ydFZhbHVlR2V0dGVyIiwidmFsdWVFbXB0eUNoZWNrZXIiLCJnZXRWYWx1ZUVtcHR5Q2hlY2tlciIsInZhbHVlUmVuZGVyIiwiZm9ybWF0IiwicmVuZGVyQ29tcG9uZW50UHJvcHMiLCJpc1ZhbGlkIiwidXRjIiwiZWRpdFZhbHVlUmVuZGVyIiwiY3JlYXRlVmFsdWVSZW5kZXIiLCJmaWx0ZXJWYWx1ZVJlbmRlciIsImVkaXRWYWx1ZVBhcnNlciIsImVkaXRDb21wb25lbnRQcm9wcyIsImNyZWF0ZUNvbXBvbmVudFByb3BzIiwiZmlsdGVyQ29tcG9uZW50UHJvcHMiLCJSZWdFeHAiLCJpbnRsIiwic2VsZWN0T3B0aW9ucyIsInNlbGVjdENvbXBvbmVudE9wdGlvbnMiLCJzZWxlY3RUcmFuc2xhdGlvbnMiLCJzZWxlY3RDb21wb25lbnRUcmFuc2xhdGlvbnMiLCJwbGFjZWhvbGRlciIsImZvcm1hdE1lc3NhZ2UiLCJub1Jlc3VsdHNUZXh0IiwiZWRpdFNlbGVjdE9wdGlvbnNNb2QiLCJzbGljZSIsImNyZWF0ZVNlbGVjdE9wdGlvbnNNb2QiLCJmaWx0ZXJTZWxlY3RPcHRpb25zTW9kIiwib25LZXlEb3duIiwib25CbHVyIiwib25Gb2N1cyIsImxhYmVsIiwicmVtb3ZlTmV3SXRlbSIsImlzQ2VsbEVkaXRlZCIsInJvd1NlbGVjdCIsImN0cmxLZXkiLCJkb2N1bWVudCIsImdldFNlbGVjdGlvbiIsInJlbW92ZUFsbFJhbmdlcyIsIm11bHRpU2VsZWN0Iiwib25Sb3dDbGljayIsInJlbmRlckNlbGwiLCJpc0NoZWNrYm94IiwiZ2V0Um93SW5kZXgiLCJtZXNzYWdlRGF0YSIsImlzRWRpdGVkIiwiY2xhc3NOYW1lIiwidGV4dEFsaWduIiwibGVuZ2h0IiwibWFwIiwic29ydENoYW5nZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsU0FBU0MsR0FBVCxFQUFjQyxJQUFkLFFBQTBCLFdBQTFCO0FBQ0EsU0FBU0MsT0FBVCxRQUF3QixhQUF4QjtBQUNBLFNBQ0VDLFVBREYsRUFFRUMsb0JBQW9CQyxDQUZ0QixFQUdFQyxtQkFBbUJDLENBSHJCLFFBSU8sWUFKUDtBQUtBLFNBQVNDLE1BQVQsRUFBaUJDLElBQWpCLFFBQTZCLG9CQUE3QjtBQUNBLFNBQVNDLFFBQVQsRUFBbUJDLFdBQW5CLFFBQXNDLGlCQUF0QztBQUNBLE9BQU9DLFVBQVAsTUFBdUIsWUFBdkI7QUFDQSxPQUFPQyxNQUFQLE1BQW1CLFFBQW5CO0FBQ0EsU0FBU0MsY0FBVCxRQUErQixtQ0FBL0I7QUFDQSxTQUFTQyxTQUFULFFBQTBCLDRCQUExQjtBQUNBLFNBQVNDLElBQVQsUUFBcUIseUJBQXJCO0FBQ0EsU0FBU0MsT0FBVCxRQUF3QiwyQkFBeEI7QUFDQSxPQUFPLDhDQUFQOztBQUVBLE9BQU9DLHdCQUFQLE1BQXFDLHlDQUFyQztBQUNBLE9BQU9DLFVBQVAsTUFBdUIseUJBQXZCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQix3QkFBdEI7QUFDQSxPQUFPQyxrQkFBUCxNQUErQixrQ0FBL0I7QUFDQSxPQUFPQyxpQkFBUCxNQUE4QixnQ0FBOUI7QUFDQSxPQUFPQyxnQkFBUCxNQUE2QiwrQkFBN0I7QUFDQSxPQUFPLEtBQUtDLGVBQVos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T0FBS2tDLEtBQUwsQ0FBV21ELE9BRnRCO0FBR0Usb0JBQVFjLEdBSFY7QUFJRSwrQkFBbUIsT0FBS2pFLEtBQUwsQ0FBV3pCLFVBSmhDO0FBS0UsOEJBQWtCLE9BQUt5QixLQUFMLENBQVd4QixTQUwvQjtBQU1FLDBCQUFjLE9BQUt3QixLQUFMLENBQVdxUCxVQU4zQjtBQU9FLG9CQUFRLE9BQUtyUCxLQUFMLENBQVdqQyxNQVByQjtBQVFFLHVCQUFXLE9BQUtpQyxLQUFMLENBQVczQjtBQVJ4QjtBQVVHNEYsY0FBSXNIO0FBVlAsU0FKSjtBQWlCRSxjQUFNLE9BQUtxRCxVQUFMLENBQWdCM0ssR0FBaEIsQ0FqQlI7QUFrQkUsZUFBTyxPQUFLakUsS0FBTCxDQUFXdEIsWUFBWCxDQUF3QjZKLEdBQXhCLENBQTRCdEUsSUFBSXBELFNBQWhDLEVBQTJDb0QsSUFBSXdHLEtBQS9DLENBbEJUO0FBbUJFLGtCQUFVeEcsSUFBSXVILFFBbkJoQjtBQW9CRSxrQkFBVXZILElBQUl3SCxRQXBCaEI7QUFxQkUscUJBQWF4SCxJQUFJeUcsV0FyQm5CO0FBc0JFLGtCQUFVekcsSUFBSWdJLFFBQUosR0FBZWhJLElBQUlnSSxRQUFuQixHQUE4QixDQXRCMUM7QUF1QkUsZUFBT2hJLElBQUkwSCxLQXZCYjtBQXdCRSw2QkFBcUIxSCxJQUFJMkg7QUF4QjNCLFFBRGlCO0FBQUEsS0FBWixDQUFQO0FBMkJELEc7O1NBbHBDa0I3TCxRIiwiZmlsZSI6ImRhdGFncmlkLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLWxvbmVseS1pZiwgcHJlZmVyLXRlbXBsYXRlLCByZWFjdC9yZXF1aXJlLWRlZmF1bHQtcHJvcHMgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBNYXAsIExpc3QgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7XG4gIGluamVjdEludGwsXG4gIEZvcm1hdHRlZE1lc3NhZ2UgYXMgTSxcbiAgRm9ybWF0dGVkTnVtYmVyIGFzIE4sXG59IGZyb20gJ3JlYWN0LWludGwnO1xuaW1wb3J0IHsgQ29sdW1uLCBDZWxsIH0gZnJvbSAnZml4ZWQtZGF0YS10YWJsZS0yJztcbmltcG9ydCB7IENoZWNrYm94LCBGb3JtQ29udHJvbCB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7IEZsb2F0aW5nU2VsZWN0IH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtZmxvYXRpbmctc2VsZWN0JztcbmltcG9ydCB7IERhdGVJbnB1dCB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWRhdGV0aW1lJztcbmltcG9ydCB7IEljb24gfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1pY29ucyc7XG5pbXBvcnQgeyBTcGlubmVyIH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3Qtc3Bpbm5lcic7XG5pbXBvcnQgJ2ZpeGVkLWRhdGEtdGFibGUtMi9kaXN0L2ZpeGVkLWRhdGEtdGFibGUuY3NzJztcblxuaW1wb3J0IFJlc3BvbnNpdmVGaXhlZERhdGFUYWJsZSBmcm9tICcuL3Jlc3BvbnNpdmUtZml4ZWQtZGF0YS10YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IEhlYWRlckNlbGwgZnJvbSAnLi9oZWFkZXItY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IEFjdGlvbkJhciBmcm9tICcuL2FjdGlvbi1iYXIuY29tcG9uZW50JztcbmltcG9ydCBJbmxpbmVFZGl0Q29udHJvbHMgZnJvbSAnLi9pbmxpbmUtZWRpdC1jb250cm9scy5jb21wb25lbnQnO1xuaW1wb3J0IEZpbHRlcmluZ0NvbnRyb2xzIGZyb20gJy4vZmlsdGVyaW5nLWNvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgRHJvcGRvd25Db250cm9scyBmcm9tICcuL2Ryb3Bkb3duLWNvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgKiBhcyBkYXRhZ3JpZEFjdGlvbnMgZnJvbSAnLi9kYXRhZ3JpZC5hY3Rpb25zJztcbmltcG9ydCBDZWxsVG9vbHRpcCBmcm9tICcuL2NlbGwtdG9vbHRpcC5jb21wb25lbnQnO1xuaW1wb3J0IENvbHVtblNldHRpbmdzTW9kYWwgZnJvbSAnLi9jb2x1bW4tc2V0dGluZ3MvY29sdW1uLXNldHRpbmdzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBwcm9wVHlwZXMsIGRlZmF1bHRQcm9wcyB9IGZyb20gJy4vZGF0YWdyaWQucHJvcHMnO1xuaW1wb3J0IHsgS0VZX0NPREVTIH0gZnJvbSAnLi9kYXRhZ3JpZC5jb25zdGFudHMnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4vZGF0YWdyaWQudXRpbHMnO1xuaW1wb3J0ICcuL2RhdGFncmlkLmNvbXBvbmVudC5zY3NzJztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlLCBvd25Qcm9wcykgPT4ge1xuICBjb25zdCBHUklEID0gb3duUHJvcHMuZ3JpZDtcbiAgcmV0dXJuIHtcbiAgICBpc0J1c3k6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdpc0J1c3knXSwgdHJ1ZSksXG4gICAgaXNFZGl0aW5nOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnaXNFZGl0aW5nJ10sIGZhbHNlKSxcbiAgICBpc0NyZWF0aW5nOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnaXNDcmVhdGluZyddLCBmYWxzZSksXG4gICAgaXNGaWx0ZXJpbmc6XG4gICAgICBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2lzRmlsdGVyaW5nJ10sIGZhbHNlKSxcbiAgICBpc0NvbHVtblNldHRpbmdzTW9kYWxPcGVuOlxuICAgICAgc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2NvbHVtblNldHRpbmdzTW9kYWwnLCAnb3BlbiddLCBmYWxzZSksXG4gICAgc29ydENvbHVtbjogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnc29ydGluZ0RhdGEnLCAnc29ydENvbHVtbiddLCBudWxsKSxcbiAgICBzb3J0T3JkZXI6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ3NvcnRpbmdEYXRhJywgJ3NvcnRPcmRlciddLCBudWxsKSxcbiAgICB2aXNpYmxlQ29sdW1uczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAndmlzaWJsZUNvbHVtbnMnXSwgTGlzdCgpKSxcbiAgICBjb2x1bW5XaWR0aHM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ2NvbHVtbldpZHRocyddLCBNYXAoKSksXG4gICAgc2VsZWN0ZWRDZWxsOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3NlbGVjdGVkQ2VsbCddLCBNYXAoKSksXG4gICAgc2VsZWN0ZWRJdGVtczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZWxlY3RlZEl0ZW1zJ10sIExpc3QoKSksXG4gICAgZGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdkYXRhJ10sIExpc3QoKSksXG4gICAgZWRpdERhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnZWRpdERhdGEnXSwgTWFwKCkpLFxuICAgIGNyZWF0ZURhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY3JlYXRlRGF0YSddLCBMaXN0KCkpLFxuICAgIGZpbHRlckRhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnZmlsdGVyRGF0YSddLCBNYXAoKSksXG4gICAgY2VsbE1lc3NhZ2VzOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NlbGxNZXNzYWdlcyddLCBNYXAoKSksXG4gICAgY3JlYXRlQ2VsbE1lc3NhZ2VzOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NyZWF0ZUNlbGxNZXNzYWdlcyddLCBNYXAoKSksXG4gICAgYWxsRGF0YVNpemU6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnYWxsRGF0YSddLCBMaXN0KCkpLnNpemUsXG4gICAgbGFuZ3VhZ2U6IFV0aWxzLmdldExhbmd1YWdlKEdSSUQsIHN0YXRlLnVzZXIpLFxuICAgIGRhdGVGb3JtYXQ6IFV0aWxzLmdldERhdGVGb3JtYXQoR1JJRCwgc3RhdGUudXNlciksXG4gICAgdGhvdXNhbmRTZXBhcmF0b3I6IFV0aWxzLmdldFRob3VzYW5kU2VwYXJhdG9yKEdSSUQsIHN0YXRlLnVzZXIpLFxuICAgIGRlY2ltYWxTZXBhcmF0b3I6IFV0aWxzLmdldERlY2ltYWxTZXBhcmF0b3IoR1JJRCwgc3RhdGUudXNlciksXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkYXRhZ3JpZEFjdGlvbnM7XG5cbkBpbmplY3RJbnRsXG5AY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcylcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGFHcmlkIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSBwcm9wVHlwZXM7XG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHsgY3VycmVudFJvdzogMCwgY3VycmVudENvbHVtbjogMCB9O1xuICAgIHRoaXMuY2VsbFJlZnMgPSB7fTtcbiAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsID0gZmFsc2U7XG4gICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTsgLy8gVE9ETzogSGFuZGxlIGZvY3VzaW5nIHdoZW4gdHJ1ZVxuICAgIHRoaXMuZm9jdXNUb0Vycm9yQ2VsbCA9IGZhbHNlOyAvLyBUT0RPOiBIYW5kbGUgZm9jdXNpbmcgd2hlbiB0cnVlXG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLnByb3BzLmludmFsaWRhdGUodGhpcy5wcm9wcy5ncmlkKTtcbiAgfVxuXG4gIG9uQ29sdW1uUmVzaXplRW5kQ2FsbGJhY2sgPSAobmV3Q29sdW1uV2lkdGgsIGNvbHVtbktleSkgPT4ge1xuICAgIHRoaXMucHJvcHMucmVzaXplQ29sdW1uKHRoaXMucHJvcHMuZ3JpZCwgY29sdW1uS2V5LCBuZXdDb2x1bW5XaWR0aCk7XG4gIH1cblxuICBvbkNyZWF0ZUNlbGxLZXlEb3duID0gKGUpID0+IHtcbiAgICBpZiAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuRU5URVIpIHtcbiAgICAgIHRoaXMucHJvcHMuYWRkTmV3SXRlbSh0aGlzLnByb3BzLmdyaWQsIFV0aWxzLmdldENvbHVtbkRlZmF1bHRWYWx1ZXModGhpcy5wcm9wcy5jb2x1bW5zKSk7XG4gICAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBvbkVkaXRDZWxsS2V5RG93biA9IChjb2wsIHJvd0luZGV4KSA9PiAoZSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZUFycm93TmF2aWdhdGlvbikge1xuICAgICAgY29uc3QgeyBjb2x1bW5zIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3Qgcm93c1NpemUgPSB0aGlzLnByb3BzLmRhdGEuc2l6ZTtcbiAgICAgIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2wpO1xuICAgICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuRE9XTjoge1xuICAgICAgICAgIGlmIChjb2wudmFsdWVUeXBlICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgY29uc3QgbmV4dEVsZW1lbnQgPSB0aGlzLmNlbGxSZWZzW2Ake3RoaXMucHJvcHMuZ3JpZC5pZH1fJHtjb2x1bW5LZXl9XyR7cm93SW5kZXggKyAxfWBdO1xuICAgICAgICAgICAgdGhpcy5tb3ZlQ2VsbEZvY3VzKG5leHRFbGVtZW50LCByb3dJbmRleCArIDEsIC0xKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuVVA6IHtcbiAgICAgICAgICBpZiAoY29sLnZhbHVlVHlwZSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGNvbnN0IG5leHRFbGVtZW50ID0gdGhpcy5jZWxsUmVmc1tgJHt0aGlzLnByb3BzLmdyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4IC0gMX1gXTtcbiAgICAgICAgICAgIHRoaXMubW92ZUNlbGxGb2N1cyhuZXh0RWxlbWVudCwgcm93SW5kZXggLSAxLCAtMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLlRBQjpcbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuUklHSFQ6XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLkxFRlQ6IHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgbGV0IGNvbHVtbkluZCA9IGNvbHVtbnMuZmluZEluZGV4KGMgPT4gYy52YWx1ZUtleVBhdGguam9pbigpID09PSBjb2x1bW5LZXkpO1xuICAgICAgICAgIGlmIChjb2x1bW5JbmQgIT09IC0xKSB7XG4gICAgICAgICAgICBsZXQgZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgbGV0IG5leHRFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIGxldCByb3dJbmQgPSByb3dJbmRleDtcbiAgICAgICAgICAgIHdoaWxlIChkaXNhYmxlZCkge1xuICAgICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuTEVGVCB8fCAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuVEFCICYmIGUuc2hpZnRLZXkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbHVtbkluZCAtIDEgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kIC09IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyb3dJbmQgLSAxID49IDApIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCA9IGNvbHVtbnMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAgIHJvd0luZCAtPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbHVtbkluZCArIDEgPCBjb2x1bW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kICs9IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyb3dJbmQgKyAxIDwgcm93c1NpemUpIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCA9IDA7XG4gICAgICAgICAgICAgICAgICByb3dJbmQgKz0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnN0IG5leHRDb2x1bW5LZXkgPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sdW1uc1tjb2x1bW5JbmRdKTtcbiAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSB0aGlzLmNlbGxSZWZzW2Ake3RoaXMucHJvcHMuZ3JpZC5pZH1fJHtuZXh0Q29sdW1uS2V5fV8ke3Jvd0luZH1gXTtcbiAgICAgICAgICAgICAgZGlzYWJsZWQgPSBuZXh0RWxlbWVudCA/IG5leHRFbGVtZW50LmRpc2FibGVkIDogZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWRpc2FibGVkICYmIG5leHRFbGVtZW50KSB7XG4gICAgICAgICAgICAgIHRoaXMubW92ZUNlbGxGb2N1cyhuZXh0RWxlbWVudCwgcm93SW5kLCBjb2x1bW5JbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uRmlsdGVyQ2VsbFZhbHVlQ2hhbmdlID0gKGNvbCwgdmFsdWVQYXJzZXIpID0+IChldmVudE9yRGF0YSkgPT4ge1xuICAgIGxldCByYXdWYWx1ZTtcbiAgICAvLyBldmVudE9yRGF0YSBjYW4gYmUgaW5wdXQgb25DaGFuZ2UgZXZlbnQsIHJlYWN0LXNlbGVjdCBvbkNoYW5nZSBvciByZWFjdC1kYXktcGlja2VyIG9uQ2hhbmdlXG4gICAgaWYgKGV2ZW50T3JEYXRhKSB7XG4gICAgICBpZiAoZXZlbnRPckRhdGEudGFyZ2V0ICE9PSB1bmRlZmluZWQpIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlO1xuICAgICAgZWxzZSBpZiAoZXZlbnRPckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkgcmF3VmFsdWUgPSBldmVudE9yRGF0YS52YWx1ZTtcbiAgICAgIGVsc2UgcmF3VmFsdWUgPSBldmVudE9yRGF0YTtcbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSB2YWx1ZVBhcnNlcihyYXdWYWx1ZSk7XG4gICAgdGhpcy5wcm9wcy5maWx0ZXJDZWxsVmFsdWVDaGFuZ2UoXG4gICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICB0aGlzLnByb3BzLmNvbHVtbnMsXG4gICAgICBjb2wsXG4gICAgICB2YWx1ZSxcbiAgICApO1xuICB9XG5cbiAgb25DcmVhdGVDZWxsVmFsdWVDaGFuZ2UgPSAocm93SW5kZXgsIGNvbCwgdmFsdWVQYXJzZXIpID0+IChldmVudE9yRGF0YSkgPT4ge1xuICAgIGxldCByYXdWYWx1ZTtcbiAgICAvLyBldmVudE9yRGF0YSBjYW4gYmUgaW5wdXQgb25DaGFuZ2UgZXZlbnQsIHJlYWN0LXNlbGVjdCBvbkNoYW5nZSBvciByZWFjdC1kYXktcGlja2VyIG9uQ2hhbmdlXG4gICAgaWYgKGV2ZW50T3JEYXRhKSB7XG4gICAgICBpZiAoZXZlbnRPckRhdGEudGFyZ2V0ICE9PSB1bmRlZmluZWQpIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlO1xuICAgICAgZWxzZSBpZiAoZXZlbnRPckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkgcmF3VmFsdWUgPSBldmVudE9yRGF0YS52YWx1ZTtcbiAgICAgIGVsc2UgcmF3VmFsdWUgPSBldmVudE9yRGF0YTtcbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSB2YWx1ZVBhcnNlcihyYXdWYWx1ZSk7XG4gICAgdGhpcy5wcm9wcy5jcmVhdGVDZWxsVmFsdWVDaGFuZ2UodGhpcy5wcm9wcy5ncmlkLCByb3dJbmRleCwgY29sLnZhbHVlS2V5UGF0aCwgdmFsdWUpO1xuICAgIGlmIChjb2wub25DcmVhdGVWYWx1ZUNoYW5nZSkge1xuICAgICAgY29sLm9uQ3JlYXRlVmFsdWVDaGFuZ2UodmFsdWUsIGNvbC52YWx1ZUtleVBhdGgsIHJvd0luZGV4KTtcbiAgICB9XG4gICAgaWYgKGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZSAmJiB2YWx1ZSA9PT0gY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm1hdGNoVmFsdWUpIHtcbiAgICAgIC8vIENhbGwgc3BlY2lhbCBwYWlyZWQgdmFsdWUgY2hhbmdlIG9uIG90aGVyIGNlbGwgaWYgdmFsdWUgbWF0Y2hlc1xuICAgICAgdGhpcy5vbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZShcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIHsgdmFsdWVLZXlQYXRoOiBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWVLZXlQYXRoIH0sXG4gICAgICAgIHYgPT4gdixcbiAgICAgICkoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm5ld1ZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNvbC52YWxpZGF0b3JzKSB7XG4gICAgICB0aGlzLnByb3BzLmNyZWF0ZUNlbGxWYWx1ZVZhbGlkYXRlKFxuICAgICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICBjb2wudmFsdWVLZXlQYXRoLFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgY29sLnZhbGlkYXRvcnMsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIG9uRWRpdENlbGxWYWx1ZUNoYW5nZSA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGV2ZW50T3JEYXRhKSA9PiB7XG4gICAgY29uc3QgZGF0YUlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICBsZXQgcmF3VmFsdWU7XG4gICAgLy8gZXZlbnRPckRhdGEgY2FuIGJlIGlucHV0IG9uQ2hhbmdlIGV2ZW50LCByZWFjdC1zZWxlY3Qgb25DaGFuZ2Ugb3IgcmVhY3QtZGF5LXBpY2tlciBvbkNoYW5nZVxuICAgIGlmIChldmVudE9yRGF0YSkge1xuICAgICAgaWYgKGV2ZW50T3JEYXRhLnRhcmdldCAhPT0gdW5kZWZpbmVkKSByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZTtcbiAgICAgIGVsc2UgaWYgKGV2ZW50T3JEYXRhLnZhbHVlICE9PSB1bmRlZmluZWQpIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudmFsdWU7XG4gICAgICBlbHNlIHJhd1ZhbHVlID0gZXZlbnRPckRhdGE7XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlID0gdmFsdWVQYXJzZXIocmF3VmFsdWUpO1xuICAgIHRoaXMucHJvcHMuZWRpdENlbGxWYWx1ZUNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIGRhdGFJZCwgY29sLnZhbHVlS2V5UGF0aCwgdmFsdWUpO1xuICAgIGlmIChjb2wub25FZGl0VmFsdWVDaGFuZ2UpIHtcbiAgICAgIGNvbC5vbkVkaXRWYWx1ZUNoYW5nZSh2YWx1ZSwgY29sLnZhbHVlS2V5UGF0aCwgcm93SW5kZXgsIGRhdGFJZCk7XG4gICAgfVxuICAgIGlmIChjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUgJiYgdmFsdWUgPT09IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5tYXRjaFZhbHVlKSB7XG4gICAgICAvLyBDYWxsIHNwZWNpYWwgcGFpcmVkIHZhbHVlIGNoYW5nZSBvbiBvdGhlciBjZWxsIGlmIHZhbHVlIG1hdGNoZXNcbiAgICAgIHRoaXMub25FZGl0Q2VsbFZhbHVlQ2hhbmdlKFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgeyB2YWx1ZUtleVBhdGg6IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5uZXdWYWx1ZUtleVBhdGggfSxcbiAgICAgICAgdiA9PiB2LFxuICAgICAgKShjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY29sLnZhbGlkYXRvcnMpIHtcbiAgICAgIHRoaXMucHJvcHMuZWRpdENlbGxWYWx1ZVZhbGlkYXRlKFxuICAgICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICAgIGRhdGFJZCxcbiAgICAgICAgY29sLnZhbHVlS2V5UGF0aCxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIGNvbC52YWxpZGF0b3JzLFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBvbkNyZWF0ZUNlbGxCbHVyID0gKHJvd0luZGV4LCBjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZSkgPT4ge1xuICAgIGlmIChjb2wub25DcmVhdGVCbHVyKSB7XG4gICAgICBsZXQgdmFsdWUgPSAoZSAmJiBlLnRhcmdldCAmJiBlLnRhcmdldC52YWx1ZSAhPT0gdW5kZWZpbmVkKSA/XG4gICAgICAgIGUudGFyZ2V0LnZhbHVlIDpcbiAgICAgICAgdGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpO1xuICAgICAgaWYgKHZhbHVlUGFyc2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZVBhcnNlcih2YWx1ZSk7XG4gICAgICB9XG4gICAgICBjb2wub25DcmVhdGVCbHVyKHZhbHVlLCByb3dJbmRleCk7XG4gICAgfVxuICB9XG5cbiAgb25FZGl0Q2VsbEJsdXIgPSAocm93SW5kZXgsIGNvbCwgdmFsdWVQYXJzZXIpID0+IChlKSA9PiB7XG4gICAgaWYgKGNvbC5vbkVkaXRCbHVyKSB7XG4gICAgICBsZXQgdmFsdWUgPSAoZSAmJiBlLnRhcmdldCAmJiBlLnRhcmdldC52YWx1ZSAhPT0gdW5kZWZpbmVkKSA/XG4gICAgICAgIGUudGFyZ2V0LnZhbHVlIDpcbiAgICAgICAgdGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpO1xuICAgICAgaWYgKHZhbHVlUGFyc2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZVBhcnNlcih2YWx1ZSk7XG4gICAgICB9XG4gICAgICBjb25zdCBkYXRhSWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgICAgY29sLm9uRWRpdEJsdXIodmFsdWUsIHJvd0luZGV4LCBkYXRhSWQpO1xuICAgIH1cbiAgfVxuXG4gIG9uQ2VsbEZvY3VzID0gKGNlbGxUeXBlLCBpbnB1dFR5cGUsIHJvd0luZGV4LCBjb2x1bW5LZXkpID0+IChlKSA9PiB7XG4gICAgaWYgKGlucHV0VHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIGUudGFyZ2V0LnNlbGVjdCgpO1xuICAgIH1cbiAgICBpZiAoY2VsbFR5cGUgPT09ICdlZGl0JyAmJiB0aGlzLnByb3BzLmNlbGxTZWxlY3QpIHtcbiAgICAgIHRoaXMucHJvcHMuY2VsbFNlbGVjdGlvbkNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIE1hcCh7IHJvd0luZGV4LCBjb2x1bW5LZXkgfSkpO1xuICAgIH1cbiAgfVxuXG4gIGdldERhdGFJZEJ5Um93SW5kZXggPSByb3dJbmRleCA9PlxuICAgIHRoaXMucHJvcHMuZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLnRoaXMucHJvcHMuZ3JpZC5pZEtleVBhdGhdKTtcblxuICBnZXRTZWxlY3RlZEl0ZW1JbmRleCA9IChpZCkgPT4ge1xuICAgIGlmICghaWQpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnByb3BzLmRhdGEuZmluZEluZGV4KHYgPT4gdi5nZXRJbih0aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoKSA9PT0gaWQpO1xuICAgIHJldHVybiBpbmRleCA9PT0gLTEgPyB1bmRlZmluZWQgOiBpbmRleDtcbiAgfVxuXG4gIGdldEVkaXRJdGVtVmFsdWUgPSAocm93SW5kZXgsIGNvbCkgPT4ge1xuICAgIC8vIEdldCB0aGUgdmFsdWUgdG8gZGlzcGxheSBpbiBlZGl0IGNlbGxcbiAgICBjb25zdCBpZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgY29uc3QgZWRpdFZhbHVlID0gdGhpcy5wcm9wcy5lZGl0RGF0YS5nZXRJbihbaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdLCB1bmRlZmluZWQpO1xuICAgIGxldCBvcmlnaW5hbFZhbHVlO1xuICAgIGlmIChlZGl0VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgb3JpZ2luYWxWYWx1ZSA9IHRoaXMucHJvcHMuZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdLCAnJyk7XG4gICAgfSBlbHNlIGlmIChlZGl0VmFsdWUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGVkaXRWYWx1ZTtcbiAgICB9XG4gICAgaWYgKG9yaWdpbmFsVmFsdWUgPT09IG51bGwgfHwgb3JpZ2luYWxWYWx1ZSA9PT0gdW5kZWZpbmVkIHx8IG9yaWdpbmFsVmFsdWUgPT09ICcnKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIC8vIFNwZWNpYWwgZm9ybWF0dGluZyBieSBjb21wb25lbnQgdHlwZVxuICAgIGlmIChcbiAgICAgIGNvbC5jb21wb25lbnRUeXBlID09PSAnZmxvYXQnICYmXG4gICAgICBTdHJpbmcob3JpZ2luYWxWYWx1ZSkubGVuZ3RoID4gMFxuICAgICkge1xuICAgICAgcmV0dXJuIFN0cmluZyhvcmlnaW5hbFZhbHVlKS5yZXBsYWNlKCcuJywgdGhpcy5wcm9wcy5kZWNpbWFsU2VwYXJhdG9yKTtcbiAgICB9XG4gICAgcmV0dXJuIG9yaWdpbmFsVmFsdWU7XG4gIH1cblxuICBnZXRDcmVhdGVJdGVtVmFsdWUgPSAocm93SW5kZXgsIGNvbCkgPT4ge1xuICAgIGNvbnN0IHZhbCA9IHRoaXMucHJvcHMuY3JlYXRlRGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdLCAnJyk7XG4gICAgaWYgKHZhbCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gdmFsO1xuICB9XG5cbiAgZ2V0RmlsdGVySXRlbVZhbHVlID0gKGNvbCkgPT4ge1xuICAgIGNvbnN0IHZhbCA9IHRoaXMucHJvcHMuZmlsdGVyRGF0YS5nZXQoVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCksICcnKTtcbiAgICBpZiAodmFsID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHJldHVybiB2YWw7XG4gIH1cblxuICBnZXRDb21wb25lbnREaXNhYmxlZFN0YXRlID0gKHJvd0luZGV4LCBjb2wsIG1vZGUpID0+IHtcbiAgICBsZXQgY29tcG9uZW50RGlzYWJsZWQgPSAhIWNvbC5kaXNhYmxlRWRpdGluZztcbiAgICAvLyBjaGVjayBpZiBjb21wb25lbnQgaXMgZGlzYWJsZWQgYnkgb3RoZXIgY29sdW1uIGRhdGFcbiAgICBpZiAoIWNvbXBvbmVudERpc2FibGVkICYmIGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaCkge1xuICAgICAgaWYgKG1vZGUgPT09ICdjcmVhdGUnKSB7XG4gICAgICAgIGNvbXBvbmVudERpc2FibGVkID0gdGhpcy5nZXRDcmVhdGVJdGVtVmFsdWUoXG4gICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgeyB2YWx1ZUtleVBhdGg6IGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaC5tYXRjaFZhbHVlS2V5UGF0aCB9LFxuICAgICAgICApID09PSBjb2wuZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2gubWF0Y2hWYWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbXBvbmVudERpc2FibGVkID0gdGhpcy5nZXRFZGl0SXRlbVZhbHVlKFxuICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgIHsgdmFsdWVLZXlQYXRoOiBjb2wuZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2gubWF0Y2hWYWx1ZUtleVBhdGggfSxcbiAgICAgICAgKSA9PT0gY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb21wb25lbnREaXNhYmxlZDtcbiAgfVxuXG4gIGdldFJvd0NsYXNzTmFtZSA9IChyb3dJbmRleCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGdyaWQsXG4gICAgICBpc0NyZWF0aW5nLFxuICAgICAgaXNFZGl0aW5nLFxuICAgICAgY3JlYXRlRGF0YSxcbiAgICAgIHNlbGVjdGVkSXRlbXMsXG4gICAgICBkYXRhLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHJvd0NsYXNzTmFtZXMgPSBbJ29jLWRhdGFncmlkLXJvdyddO1xuICAgIGxldCBleHRyYVJvd0NvdW50ID0gMDsgLy8gaG93IG1hbnkgcm93cyB0byBpZ25vcmUgZnJvbSB0b3AsIG5ldyArIGZpbHRlciByb3dzXG4gICAgaWYgKGlzQ3JlYXRpbmcpIGV4dHJhUm93Q291bnQgPSBjcmVhdGVEYXRhLnNpemU7XG4gICAgaWYgKGlzQ3JlYXRpbmcpIHtcbiAgICAgIGlmIChyb3dJbmRleCA8PSAoZXh0cmFSb3dDb3VudCAtIDEpKSB7XG4gICAgICAgIHJvd0NsYXNzTmFtZXMucHVzaCgnb2MtZGF0YWdyaWQtcm93LW5ldycpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNFZGl0aW5nKSB7XG4gICAgICByb3dDbGFzc05hbWVzLnB1c2goJ29jLWRhdGFncmlkLXJvdy1lZGl0Jyk7XG4gICAgfVxuXG5cbiAgICAvLyBjaGVjayBpZiByb3cgaXMgc2VsZWN0ZWRcbiAgICBpZiAoKCFpc0NyZWF0aW5nICYmICFpc0VkaXRpbmcpICYmXG4gICAgICAgIChzZWxlY3RlZEl0ZW1zICYmIGdyaWQuaWRLZXlQYXRoKSkge1xuICAgICAgaWYgKFxuICAgICAgICBzZWxlY3RlZEl0ZW1zLmluZGV4T2YoZGF0YS5nZXRJbihbcm93SW5kZXggLSBleHRyYVJvd0NvdW50LCAuLi5ncmlkLmlkS2V5UGF0aF0pKSAhPT0gLTFcbiAgICAgICkge1xuICAgICAgICByb3dDbGFzc05hbWVzLnB1c2goJ2lzLXNlbGVjdGVkJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcHMucm93Q2xhc3NOYW1lR2V0dGVyKSB7XG4gICAgICByZXR1cm4gcm93Q2xhc3NOYW1lcy5qb2luKCcgJykgKyAnICcgKyB0aGlzLnByb3BzLnJvd0NsYXNzTmFtZUdldHRlcihyb3dJbmRleCk7XG4gICAgfVxuICAgIHJldHVybiByb3dDbGFzc05hbWVzLmpvaW4oJyAnKTtcbiAgfVxuXG4gIGdldENlbGxNZXNzYWdlcyA9IChyb3dJbmRleCwgY29sLCBjZWxsVHlwZSkgPT4ge1xuICAgIGNvbnN0IHJldHVybkRhdGEgPSB7fTtcbiAgICBpZiAoIXRoaXMucHJvcHMuZ3JpZC5pZEtleVBhdGggfHwgIWNvbC52YWx1ZUtleVBhdGgpIHtcbiAgICAgIHJldHVybiByZXR1cm5EYXRhO1xuICAgIH1cbiAgICBsZXQgaW5mb01lc3NhZ2U7XG4gICAgbGV0IGVycm9yTWVzc2FnZTtcbiAgICBsZXQgd2FybmluZ01lc3NhZ2U7XG4gICAgaWYgKGNlbGxUeXBlID09PSAnY3JlYXRlJykge1xuICAgICAgaW5mb01lc3NhZ2UgPSB0aGlzLnByb3BzLmNyZWF0ZUNlbGxNZXNzYWdlcy5nZXRJbihbJ2luZm8nLCByb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgZXJyb3JNZXNzYWdlID0gdGhpcy5wcm9wcy5jcmVhdGVDZWxsTWVzc2FnZXMuZ2V0SW4oWydlcnJvcicsIHJvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgICB3YXJuaW5nTWVzc2FnZSA9IHRoaXMucHJvcHMuY3JlYXRlQ2VsbE1lc3NhZ2VzLmdldEluKFsnd2FybmluZycsIHJvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICAgIGluZm9NZXNzYWdlID0gdGhpcy5wcm9wcy5jZWxsTWVzc2FnZXMuZ2V0SW4oWydpbmZvJywgaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgIGVycm9yTWVzc2FnZSA9IHRoaXMucHJvcHMuY2VsbE1lc3NhZ2VzLmdldEluKFsnZXJyb3InLCBpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgd2FybmluZ01lc3NhZ2UgPSB0aGlzLnByb3BzLmNlbGxNZXNzYWdlcy5nZXRJbihbJ3dhcm5pbmcnLCBpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgIH1cbiAgICBpZiAoaW5mb01lc3NhZ2UpIHtcbiAgICAgIHJldHVybkRhdGEuaW5mb01lc3NhZ2UgPSBpbmZvTWVzc2FnZTtcbiAgICB9XG4gICAgaWYgKGVycm9yTWVzc2FnZSkge1xuICAgICAgcmV0dXJuRGF0YS5lcnJvck1lc3NhZ2UgPSBlcnJvck1lc3NhZ2U7XG4gICAgfVxuICAgIGlmICh3YXJuaW5nTWVzc2FnZSkge1xuICAgICAgcmV0dXJuRGF0YS53YXJuaW5nTWVzc2FnZSA9IHdhcm5pbmdNZXNzYWdlO1xuICAgIH1cbiAgICByZXR1cm4gcmV0dXJuRGF0YTtcbiAgfVxuXG4gIGdldFNjcm9sbFRvUm93ID0gKCkgPT4ge1xuICAgIGxldCBzY3JvbGxUb1JvdztcbiAgICBpZiAodGhpcy5wcm9wcy5pc0NyZWF0aW5nICYmICF0aGlzLmZvY3VzVG9DcmVhdGVDZWxsKSByZXR1cm4gc2Nyb2xsVG9Sb3c7XG4gICAgaWYgKHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwpIHtcbiAgICAgIGNvbnN0IHNjcm9sbE5ld1JvdyA9IHRoaXMucHJvcHMuY3JlYXRlRGF0YS5zaXplIC0gMTtcbiAgICAgIGlmIChzY3JvbGxOZXdSb3cgPj0gMCkge1xuICAgICAgICBzY3JvbGxUb1JvdyA9IHNjcm9sbE5ld1JvdztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMucHJvcHMuaXNFZGl0aW5nKSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gdGhpcy5zdGF0ZS5jdXJyZW50Um93O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2Nyb2xsVG9Sb3cgPSB0aGlzLnByb3BzLnNjcm9sbFRvUm93OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICB9XG4gICAgICBpZiAoc2Nyb2xsVG9Sb3cgPT09IHVuZGVmaW5lZCAmJiB0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuc2l6ZSA+IDApIHtcbiAgICAgICAgc2Nyb2xsVG9Sb3cgPSB0aGlzLmdldFNlbGVjdGVkSXRlbUluZGV4KHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5maXJzdCgpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNjcm9sbFRvUm93O1xuICB9XG5cbiAgaGFuZGxlQ2VsbFNlbGVjdCA9IChjZWxsVHlwZSwgcm93SW5kZXgsIGNvbHVtbktleSkgPT4gKCkgPT4ge1xuICAgIGlmIChjZWxsVHlwZSA9PT0gJ3ZpZXcnICYmIHRoaXMucHJvcHMuY2VsbFNlbGVjdCkge1xuICAgICAgdGhpcy5wcm9wcy5jZWxsU2VsZWN0aW9uQ2hhbmdlKHRoaXMucHJvcHMuZ3JpZCwgTWFwKHsgcm93SW5kZXgsIGNvbHVtbktleSB9KSk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlQ3JlYXRlQ2VsbFJlZiA9IChyb3dJbmRleCwgY29sKSA9PiAocmVmKSA9PiB7XG4gICAgLy8gRm9jdXMgdG8gY3JlYXRlIGNlbGxcbiAgICBpZiAoXG4gICAgICB0aGlzLnByb3BzLmNyZWF0ZURhdGEuc2l6ZSAmJlxuICAgICAgdGhpcy5wcm9wcy5jcmVhdGVEYXRhLnNpemUgPT09IHJvd0luZGV4ICsgMSAmJlxuICAgICAgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCAmJlxuICAgICAgIXRoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnY3JlYXRlJylcbiAgICApIHtcbiAgICAgIHJlZi5mb2N1cygpO1xuICAgICAgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUVkaXRDZWxsUmVmID0gKHJvd0luZGV4LCBjb2wpID0+IChyZWYpID0+IHtcbiAgICBjb25zdCBjb2x1bW5LZXkgPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sKTtcbiAgICBpZiAodGhpcy5mb2N1c1RvRWRpdENlbGwgJiYgIXRoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnZWRpdCcpKSB7XG4gICAgICBjb25zdCBzZWxlY3RlZFJvd0luZGV4ID0gdGhpcy5nZXRTZWxlY3RlZEl0ZW1JbmRleCh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuZmlyc3QoKSk7XG4gICAgICBjb25zdCB7IHNlbGVjdGVkQ2VsbCB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGlmIChzZWxlY3RlZENlbGwuc2l6ZSA+IDApIHtcbiAgICAgICAgaWYgKHNlbGVjdGVkQ2VsbC5nZXQoJ3Jvd0luZGV4JykgPT09IHJvd0luZGV4ICYmIHNlbGVjdGVkQ2VsbC5nZXQoJ2NvbHVtbktleScpID09PSBjb2x1bW5LZXkpIHtcbiAgICAgICAgICByZWYuZm9jdXMoKTtcbiAgICAgICAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHNlbGVjdGVkUm93SW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IGZhbHNlO1xuICAgICAgfSBlbHNlIGlmIChzZWxlY3RlZFJvd0luZGV4ID09PSByb3dJbmRleCkge1xuICAgICAgICByZWYuZm9jdXMoKTtcbiAgICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuZW5hYmxlQXJyb3dOYXZpZ2F0aW9uKSB7XG4gICAgICB0aGlzLmNlbGxSZWZzW2Ake3RoaXMucHJvcHMuZ3JpZC5pZH1fJHtjb2x1bW5LZXl9XyR7cm93SW5kZXh9YF0gPSByZWY7XG4gICAgfVxuICB9XG5cbiAgbW92ZUNlbGxGb2N1cyA9IChuZXh0RWxlbWVudCwgcm93SW5kZXgsIGNvbHVtbkluZGV4KSA9PiB7XG4gICAgaWYgKG5leHRFbGVtZW50ICYmIChuZXh0RWxlbWVudC50eXBlID09PSAndGV4dCcgfHwgbmV4dEVsZW1lbnQudHlwZSA9PT0gJ251bWJlcicpKSB7XG4gICAgICBpZiAocm93SW5kZXggIT09IC0xKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjdXJyZW50Um93OiByb3dJbmRleCB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChjb2x1bW5JbmRleCAhPT0gLTEpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGN1cnJlbnRDb2x1bW46IGNvbHVtbkluZGV4IH0pO1xuICAgICAgfVxuICAgICAgc2V0VGltZW91dCgoKSA9PiBuZXh0RWxlbWVudC5zZWxlY3QoKSwgNTApO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVNlbGVjdGlvbkNoZWNrQm94T25DaGFuZ2UgPSByb3dJbmRleCA9PiAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5pdGVtU2VsZWN0aW9uQ2hhbmdlKHRoaXMucHJvcHMuZ3JpZCwgcm93SW5kZXgsIHRydWUsIGZhbHNlKTtcbiAgfVxuXG4gIGdlbmVyYXRlQ29sdW1ucyA9ICgpID0+IHtcbiAgICBjb25zdCBjb2x1bW5zID0gW107XG4gICAgY29uc3QgdGFiSW5kZXggPSBTdHJpbmcodGhpcy5wcm9wcy50YWJJbmRleCk7XG4gICAgaWYgKHRoaXMucHJvcHMucm93U2VsZWN0Q2hlY2tib3hDb2x1bW4pIHtcbiAgICAgIGNvbHVtbnMucHVzaCh7XG4gICAgICAgIHdpZHRoOiA0MCxcbiAgICAgICAgaXNSZXNpemFibGU6IGZhbHNlLFxuICAgICAgICBjb2x1bW5LZXk6ICdzZWxlY3Rpb25DaGVja2JveCcsXG4gICAgICAgIGNlbGw6IChyb3dJbmRleCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHJvd0l0ZW0gPSB0aGlzLnByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KTtcbiAgICAgICAgICBjb25zdCBpdGVtSWQgPSByb3dJdGVtLmdldEluKHRoaXMucHJvcHMuZ3JpZC5pZEtleVBhdGgpO1xuICAgICAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLmluY2x1ZGVzKGl0ZW1JZCk7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxDaGVja2JveFxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJvYy1yb3ctc2VsZWN0LWNoZWNrYm94XCJcbiAgICAgICAgICAgICAgY2hlY2tlZD17c2VsZWN0ZWR9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVNlbGVjdGlvbkNoZWNrQm94T25DaGFuZ2Uocm93SW5kZXgpfVxuICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIGNlbGxFZGl0OiAoKSA9PiBudWxsLFxuICAgICAgICBjZWxsQ3JlYXRlOiAoKSA9PiBudWxsLFxuICAgICAgICBjZWxsRmlsdGVyOiAoKSA9PiBudWxsLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgdmlzaWJsZUNvbHVtbnMgPSBbXTtcbiAgICB0aGlzLnByb3BzLnZpc2libGVDb2x1bW5zLmZvckVhY2goKHZpc2libGVDb2x1bW5LZXkpID0+IHtcbiAgICAgIHRoaXMucHJvcHMuY29sdW1ucy5mb3JFYWNoKChvcmdDb2wpID0+IHtcbiAgICAgICAgaWYgKFV0aWxzLmdldENvbHVtbktleShvcmdDb2wpID09PSB2aXNpYmxlQ29sdW1uS2V5KSB7XG4gICAgICAgICAgdmlzaWJsZUNvbHVtbnMucHVzaChvcmdDb2wpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICB2aXNpYmxlQ29sdW1ucy5mb3JFYWNoKChjb2wpID0+IHtcbiAgICAgIGNvbnN0IGNvbHVtbiA9IHtcbiAgICAgICAgaGVhZGVyOiBjb2wuaGVhZGVyLFxuICAgICAgICBjb2x1bW5LZXk6IFV0aWxzLmdldENvbHVtbktleShjb2wpLFxuICAgICAgICB3aWR0aDogKGNvbC53aWR0aCB8fCBjb2wud2lkdGggPT09IDAgPyBjb2wud2lkdGggOiAyMDApLFxuICAgICAgICBtaW5XaWR0aDogKGNvbC5taW5XaWR0aCB8fCBjb2wubWluV2lkdGggPT09IDAgPyBjb2wubWluV2lkdGggOiA0MCksXG4gICAgICAgIG1heFdpZHRoOiBjb2wubWF4V2lkdGgsXG4gICAgICAgIGlzUmVzaXphYmxlOiAhY29sLmRpc2FibGVSZXNpemluZyxcbiAgICAgICAgZml4ZWQ6ICEhY29sLmZpeGVkLFxuICAgICAgICBhbGxvd0NlbGxzUmVjeWNsaW5nOiAhIWNvbC5hbGxvd0NlbGxzUmVjeWNsaW5nLFxuICAgICAgICBkaXNhYmxlU29ydGluZzogISFjb2wuZGlzYWJsZVNvcnRpbmcsXG4gICAgICAgIGlzUmVxdWlyZWQ6ICEhY29sLmlzUmVxdWlyZWQsXG4gICAgICAgIGNvbXBvbmVudFR5cGU6IGNvbC5jb21wb25lbnRUeXBlLFxuICAgICAgICBzdHlsZTogVXRpbHMuZ2V0Q2VsbFN0eWxlQnlDb2woY29sKSxcbiAgICAgIH07XG4gICAgICBpZiAoY29sLnZhbHVlS2V5UGF0aCkge1xuICAgICAgICBjb2x1bW4udmFsdWVLZXlQYXRoID0gY29sLnZhbHVlS2V5UGF0aDtcbiAgICAgIH1cbiAgICAgIGlmIChjb2wuZmxleEdyb3cpIHtcbiAgICAgICAgY29sdW1uLmZsZXhHcm93ID0gY29sLmZsZXhHcm93O1xuICAgICAgfVxuICAgICAgaWYgKGNvbC52YWx1ZVR5cGUpIHtcbiAgICAgICAgY29sdW1uLnZhbHVlVHlwZSA9IGNvbC52YWx1ZVR5cGU7XG4gICAgICB9XG4gICAgICBpZiAoY29sLnNvcnRDb21wYXJhdG9yKSB7XG4gICAgICAgIGNvbHVtbi5zb3J0Q29tcGFyYXRvciA9IGNvbC5zb3J0Q29tcGFyYXRvcjtcbiAgICAgIH1cbiAgICAgIGlmIChjb2wuc29ydFZhbHVlR2V0dGVyKSB7XG4gICAgICAgIGNvbHVtbi5zb3J0VmFsdWVHZXR0ZXIgPSBjb2wuc29ydFZhbHVlR2V0dGVyO1xuICAgICAgfVxuICAgICAgY29uc3QgdmFsdWVFbXB0eUNoZWNrZXIgPSBVdGlscy5nZXRWYWx1ZUVtcHR5Q2hlY2tlcihjb2wpO1xuICAgICAgLy8gQ2VsbCB2YWx1ZSByZW5kZXJpbmdcbiAgICAgIGNvbnN0IHZhbHVlUmVuZGVyID0gKHJvd0luZGV4LCBmb3JtYXQpID0+IHtcbiAgICAgICAgY29uc3QgdmFsID0gdGhpcy5wcm9wcy5kYXRhLmdldEluKFtyb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsKSkge1xuICAgICAgICAgIHJldHVybiBjb2wuaXNSZXF1aXJlZCA/IDxNIGlkPVwiR3JpZC5WYWx1ZUlzTWlzc2luZ1wiIC8+IDogJyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvcm1hdCA/IGZvcm1hdCh2YWwpIDogdmFsO1xuICAgICAgfTtcblxuICAgICAgaWYgKGNvbC5jZWxsKSB7XG4gICAgICAgIGNvbHVtbi5jZWxsID0gY29sLmNlbGw7XG4gICAgICB9IGVsc2UgaWYgKGNvbC52YWx1ZVJlbmRlcikge1xuICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IGNvbC52YWx1ZVJlbmRlcih0aGlzLnByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzd2l0Y2ggKGNvbC52YWx1ZVR5cGUpIHtcbiAgICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT5cbiAgICAgICAgICAgICAgdmFsdWVSZW5kZXIocm93SW5kZXgsIHYgPT4gPE4gdmFsdWU9e3Z9IHsuLi5jb2wucmVuZGVyQ29tcG9uZW50UHJvcHN9IC8+KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PlxuICAgICAgICAgICAgICB2YWx1ZVJlbmRlcihyb3dJbmRleCwgKHYpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobW9tZW50KHYsIHRoaXMucHJvcHMuZGF0ZUZvcm1hdCwgdHJ1ZSkuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gbW9tZW50LnV0Yyh2LCB0aGlzLnByb3BzLmRhdGVGb3JtYXQpLmZvcm1hdCh0aGlzLnByb3BzLmRhdGVGb3JtYXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobW9tZW50KHYpLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vbWVudC51dGModikuZm9ybWF0KHRoaXMucHJvcHMuZGF0ZUZvcm1hdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiA8TSBpZD1cIkdyaWQuSW52YWxpZERhdGVcIiAvPjtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT5cbiAgICAgICAgICAgICAgdmFsdWVSZW5kZXIocm93SW5kZXgsIHYgPT5cbiAgICAgICAgICAgICAgICA8TSBpZD17diA/ICdHcmlkLlllcycgOiAnR3JpZC5Obyd9IHsuLi5jb2wucmVuZGVyQ29tcG9uZW50UHJvcHN9IC8+KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IHZhbHVlUmVuZGVyKHJvd0luZGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gQ2VsbCBlZGl0L2NyZWF0ZS9maWx0ZXIgY29tcG9uZW50IHJlbmRlcmluZ1xuICAgICAgaWYgKGNvbC5jZWxsRWRpdCkge1xuICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSBjb2wuY2VsbEVkaXQ7XG4gICAgICB9IGVsc2UgaWYgKGNvbC5lZGl0VmFsdWVSZW5kZXIpIHtcbiAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gY29sLmVkaXRWYWx1ZVJlbmRlcih0aGlzLnByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSk7XG4gICAgICB9XG4gICAgICBpZiAoY29sLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSBjb2wuY2VsbENyZWF0ZTtcbiAgICAgIH0gZWxzZSBpZiAoY29sLmNyZWF0ZVZhbHVlUmVuZGVyKSB7XG4gICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gY29sLmNyZWF0ZVZhbHVlUmVuZGVyKHRoaXMucHJvcHMuZGF0YS5nZXQocm93SW5kZXgpKTtcbiAgICAgIH1cbiAgICAgIGlmIChjb2wuY2VsbEZpbHRlcikge1xuICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9IGNvbC5jZWxsRmlsdGVyO1xuICAgICAgfSBlbHNlIGlmIChjb2wuZmlsdGVyVmFsdWVSZW5kZXIpIHtcbiAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSByb3dJbmRleCA9PiBjb2wuZmlsdGVyVmFsdWVSZW5kZXIodGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCkpO1xuICAgICAgfVxuICAgICAgaWYgKGNvbC5jb21wb25lbnRUeXBlKSB7XG4gICAgICAgIGxldCBlZGl0VmFsdWVQYXJzZXIgPSB2YWwgPT4gdmFsO1xuICAgICAgICBzd2l0Y2ggKGNvbC5jb21wb25lbnRUeXBlKSB7XG4gICAgICAgICAgY2FzZSAndGV4dCc6XG4gICAgICAgICAgICAvLyBUT0RPIFJFRkFDVE9SIFRPIEZVTkNUSU9OXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5pbmxpbmVFZGl0KSB7XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gKFxuICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25FZGl0Q2VsbFZhbHVlQ2hhbmdlKHJvd0luZGV4LCBjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5vbkVkaXRDZWxsQmx1cihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5vbkNlbGxGb2N1cygnZWRpdCcsIGNvbC5jb21wb25lbnRUeXBlLCByb3dJbmRleCwgY29sdW1uLmNvbHVtbktleSl9XG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5vbkVkaXRDZWxsS2V5RG93bihjb2wsIHJvd0luZGV4KX1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRSZWY9e3RoaXMuaGFuZGxlRWRpdENlbGxSZWYocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZEVkaXRJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fS0ke3Jvd0luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuZWRpdENvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdlZGl0Jyl9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXtjb2x1bW4uc3R5bGV9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiAoXG4gICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRDcmVhdGVJdGVtVmFsdWUocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlKHJvd0luZGV4LCBjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5vbkNyZWF0ZUNlbGxCbHVyKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMub25DcmVhdGVDZWxsS2V5RG93bn1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRSZWY9e3RoaXMuaGFuZGxlQ3JlYXRlQ2VsbFJlZihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkQ3JlYXRlSW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX0tJHtyb3dJbmRleH1gfVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmNyZWF0ZUNvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdjcmVhdGUnKX1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e2NvbHVtbi5zdHlsZX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5maWx0ZXJpbmcpIHtcbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT4gKFxuICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0RmlsdGVySXRlbVZhbHVlKGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uRmlsdGVyQ2VsbFZhbHVlQ2hhbmdlKGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkRmlsdGVySW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX1gfVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmZpbHRlckNvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17Y29sdW1uLnN0eWxlfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5pbmxpbmVFZGl0KSB7XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gKFxuICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkVkaXRDZWxsVmFsdWVDaGFuZ2Uocm93SW5kZXgsIGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLm9uRWRpdENlbGxCbHVyKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLm9uQ2VsbEZvY3VzKCdlZGl0JywgY29sLmNvbXBvbmVudFR5cGUsIHJvd0luZGV4LCBjb2x1bW4uY29sdW1uS2V5KX1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLm9uRWRpdENlbGxLZXlEb3duKGNvbCwgcm93SW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFJlZj17dGhpcy5oYW5kbGVFZGl0Q2VsbFJlZihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkRWRpdElucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5lZGl0Q29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2VkaXQnKX1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e2NvbHVtbi5zdHlsZX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IChcbiAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0Q3JlYXRlSXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZShyb3dJbmRleCwgY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMub25DcmVhdGVDZWxsQmx1cihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5vbkNlbGxGb2N1cygnY3JlYXRlJywgJ251bWJlcicsIHJvd0luZGV4LCBjb2x1bW4uY29sdW1uS2V5KX1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLm9uQ3JlYXRlQ2VsbEtleURvd259XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UmVmPXt0aGlzLmhhbmRsZUNyZWF0ZUNlbGxSZWYocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZENyZWF0ZUlucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5jcmVhdGVDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnY3JlYXRlJyl9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXtjb2x1bW4uc3R5bGV9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuZmlsdGVyaW5nKSB7XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IChcbiAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0RmlsdGVySXRlbVZhbHVlKGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uRmlsdGVyQ2VsbFZhbHVlQ2hhbmdlKGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkRmlsdGVySW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX1gfVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmZpbHRlckNvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17Y29sdW1uLnN0eWxlfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlciA9IHZhbCA9PlxuICAgICAgICAgICAgICB2YWwucmVwbGFjZShuZXcgUmVnRXhwKGBbXlxcXFxkJHt0aGlzLnByb3BzLmRlY2ltYWxTZXBhcmF0b3J9Ky1dYCwgJ2cnKSwgJycpO1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5saW5lRWRpdCkge1xuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IChcbiAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uRWRpdENlbGxWYWx1ZUNoYW5nZShyb3dJbmRleCwgY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMub25FZGl0Q2VsbEJsdXIocm93SW5kZXgsIGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5vbkNlbGxGb2N1cygnZWRpdCcsIGNvbC5jb21wb25lbnRUeXBlLCByb3dJbmRleCwgY29sdW1uLmNvbHVtbktleSl9XG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5vbkVkaXRDZWxsS2V5RG93bihjb2wsIHJvd0luZGV4KX1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRSZWY9e3RoaXMuaGFuZGxlRWRpdENlbGxSZWYocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZEVkaXRJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fS0ke3Jvd0luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuZWRpdENvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdlZGl0Jyl9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXtjb2x1bW4uc3R5bGV9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiAoXG4gICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRDcmVhdGVJdGVtVmFsdWUocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlKHJvd0luZGV4LCBjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5vbkNyZWF0ZUNlbGxCbHVyKHJvd0luZGV4LCBjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5vbkNyZWF0ZUNlbGxLZXlEb3dufVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFJlZj17dGhpcy5oYW5kbGVDcmVhdGVDZWxsUmVmKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRDcmVhdGVJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fS0ke3Jvd0luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuY3JlYXRlQ29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2NyZWF0ZScpfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17Y29sdW1uLnN0eWxlfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmZpbHRlcmluZykge1xuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRGaWx0ZXJJdGVtVmFsdWUoY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UoY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRGaWx0ZXJJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fWB9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuZmlsdGVyQ29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXtjb2x1bW4uc3R5bGV9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnc2VsZWN0Jzoge1xuICAgICAgICAgICAgY29uc3QgeyBpbnRsIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0T3B0aW9ucyA9IGNvbC5zZWxlY3RDb21wb25lbnRPcHRpb25zIHx8XG4gICAgICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0Q29tcG9uZW50T3B0aW9ucy5nZXQoY29sdW1uLmNvbHVtbktleSk7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RUcmFuc2xhdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50VHJhbnNsYXRpb25zIHx8XG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0LlNlbGVjdCcgfSksXG4gICAgICAgICAgICAgICAgbm9SZXN1bHRzVGV4dDogaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0Lk5vUmVzdWx0cycgfSksXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5pbmxpbmVFZGl0KSB7XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gKFxuICAgICAgICAgICAgICAgICAgPEZsb2F0aW5nU2VsZWN0XG4gICAgICAgICAgICAgICAgICAgIG5hbWU9e2NvbC52YWx1ZUtleVBhdGguam9pbigpICsgJy1lZGl0LScgKyByb3dJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucz17XG4gICAgICAgICAgICAgICAgICAgICAgY29sLmVkaXRTZWxlY3RPcHRpb25zTW9kICYmIHNlbGVjdE9wdGlvbnMgP1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sLmVkaXRTZWxlY3RPcHRpb25zTW9kKHNlbGVjdE9wdGlvbnMuc2xpY2UoKSwgcm93SW5kZXgsIGNvbCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0T3B0aW9uc1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uRWRpdENlbGxWYWx1ZUNoYW5nZShyb3dJbmRleCwgY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMub25FZGl0Q2VsbEJsdXIocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMub25DZWxsRm9jdXMoJ2VkaXQnLCBjb2wuY29tcG9uZW50VHlwZSwgcm93SW5kZXgsIGNvbHVtbi5jb2x1bW5LZXkpfVxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hhYmxlPXtzZWxlY3RPcHRpb25zICYmIChzZWxlY3RPcHRpb25zLmxlbmd0aCA+IDkpfVxuICAgICAgICAgICAgICAgICAgICBjbGVhcmFibGU9eyFjb2wuaXNSZXF1aXJlZH1cbiAgICAgICAgICAgICAgICAgICAgYmFja3NwYWNlUmVtb3Zlcz17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIHRhYlNlbGVjdHNWYWx1ZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIG9wZW5PbkZvY3VzXG4gICAgICAgICAgICAgICAgICAgIHJlZj17dGhpcy5oYW5kbGVFZGl0Q2VsbFJlZihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICAgIGlkOiBgb2NEYXRhZ3JpZEVkaXRJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fS0ke3Jvd0luZGV4fWAsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuZWRpdENvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdlZGl0Jyl9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgey4uLnNlbGVjdFRyYW5zbGF0aW9uc31cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiAoXG4gICAgICAgICAgICAgICAgICA8RmxvYXRpbmdTZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgbmFtZT17Y29sLnZhbHVlS2V5UGF0aC5qb2luKCkgKyAnLWNyZWF0ZS0nICsgcm93SW5kZXh9XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e1xuICAgICAgICAgICAgICAgICAgICAgIGNvbC5jcmVhdGVTZWxlY3RPcHRpb25zTW9kICYmIHNlbGVjdE9wdGlvbnMgP1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sLmNyZWF0ZVNlbGVjdE9wdGlvbnNNb2Qoc2VsZWN0T3B0aW9ucy5zbGljZSgpLCByb3dJbmRleCwgY29sKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RPcHRpb25zXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0Q3JlYXRlSXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZShyb3dJbmRleCwgY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMub25DcmVhdGVDZWxsQmx1cihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoYWJsZT17c2VsZWN0T3B0aW9ucyAmJiAoc2VsZWN0T3B0aW9ucy5sZW5ndGggPiA5KX1cbiAgICAgICAgICAgICAgICAgICAgY2xlYXJhYmxlPXshY29sLmlzUmVxdWlyZWR9XG4gICAgICAgICAgICAgICAgICAgIGJhY2tzcGFjZVJlbW92ZXM9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICB0YWJTZWxlY3RzVmFsdWU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBvcGVuT25Gb2N1c1xuICAgICAgICAgICAgICAgICAgICByZWY9e3RoaXMuaGFuZGxlQ3JlYXRlQ2VsbFJlZihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICAgIGlkOiBgb2NEYXRhZ3JpZENyZWF0ZUlucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YCxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5jcmVhdGVDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnY3JlYXRlJyl9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgey4uLnNlbGVjdFRyYW5zbGF0aW9uc31cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuZmlsdGVyaW5nKSB7XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IChcbiAgICAgICAgICAgICAgICAgIDxGbG9hdGluZ1NlbGVjdFxuICAgICAgICAgICAgICAgICAgICBuYW1lPXtjb2wudmFsdWVLZXlQYXRoLmpvaW4oKSArICctZmlsdGVyJ31cbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucz17XG4gICAgICAgICAgICAgICAgICAgICAgY29sLmZpbHRlclNlbGVjdE9wdGlvbnNNb2QgJiYgc2VsZWN0T3B0aW9ucyA/XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2wuZmlsdGVyU2VsZWN0T3B0aW9uc01vZChzZWxlY3RPcHRpb25zLnNsaWNlKCksIGNvbCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0T3B0aW9uc31cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0RmlsdGVySXRlbVZhbHVlKGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uRmlsdGVyQ2VsbFZhbHVlQ2hhbmdlKGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoYWJsZT17c2VsZWN0T3B0aW9ucyAmJiAoc2VsZWN0T3B0aW9ucy5sZW5ndGggPiA5KX1cbiAgICAgICAgICAgICAgICAgICAgY2xlYXJhYmxlXG4gICAgICAgICAgICAgICAgICAgIHRhYlNlbGVjdHNWYWx1ZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIG9wZW5PbkZvY3VzXG4gICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICBpZDogYG9jRGF0YWdyaWRGaWx0ZXJJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fWAsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuZmlsdGVyQ29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgey4uLnNlbGVjdFRyYW5zbGF0aW9uc31cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNhc2UgJ2RhdGUnOiB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5pbmxpbmVFZGl0KSB7XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gKFxuICAgICAgICAgICAgICAgICAgPERhdGVJbnB1dFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkVkaXRDZWxsVmFsdWVDaGFuZ2Uocm93SW5kZXgsIGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgbG9jYWxlPXt0aGlzLnByb3BzLmxhbmd1YWdlfVxuICAgICAgICAgICAgICAgICAgICBkYXRlRm9ybWF0PXt0aGlzLnByb3BzLmRhdGVGb3JtYXR9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UmVmPXt0aGlzLmhhbmRsZUVkaXRDZWxsUmVmKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgaWQ6IGBvY0RhdGFncmlkRWRpdElucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YCxcbiAgICAgICAgICAgICAgICAgICAgICBvbktleURvd246IHRoaXMub25FZGl0Q2VsbEtleURvd24oY29sLCByb3dJbmRleCksXG4gICAgICAgICAgICAgICAgICAgICAgb25CbHVyOiB0aGlzLm9uRWRpdENlbGxCbHVyKHJvd0luZGV4LCBjb2wpLFxuICAgICAgICAgICAgICAgICAgICAgIG9uRm9jdXM6IHRoaXMub25DZWxsRm9jdXMoJ2VkaXQnLCBjb2wuY29tcG9uZW50VHlwZSwgcm93SW5kZXgsIGNvbHVtbi5jb2x1bW5LZXkpLFxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBjb2x1bW4uc3R5bGUsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuZWRpdENvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdlZGl0Jyl9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gKFxuICAgICAgICAgICAgICAgICAgPERhdGVJbnB1dFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRDcmVhdGVJdGVtVmFsdWUocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlKHJvd0luZGV4LCBjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5vbkNyZWF0ZUNlbGxLZXlEb3dufVxuICAgICAgICAgICAgICAgICAgICBsb2NhbGU9e3RoaXMucHJvcHMubGFuZ3VhZ2V9XG4gICAgICAgICAgICAgICAgICAgIGRhdGVGb3JtYXQ9e3RoaXMucHJvcHMuZGF0ZUZvcm1hdH1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRSZWY9e3RoaXMuaGFuZGxlQ3JlYXRlQ2VsbFJlZihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgIGlkOiBgb2NEYXRhZ3JpZENyZWF0ZUlucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YCxcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogY29sdW1uLnN0eWxlLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmNyZWF0ZUNvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdjcmVhdGUnKX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuZmlsdGVyaW5nKSB7XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IChcbiAgICAgICAgICAgICAgICAgIDxEYXRlSW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0RmlsdGVySXRlbVZhbHVlKGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uRmlsdGVyQ2VsbFZhbHVlQ2hhbmdlKGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgZGF0ZUZvcm1hdD17dGhpcy5wcm9wcy5kYXRlRm9ybWF0fVxuICAgICAgICAgICAgICAgICAgICBsb2NhbGU9e3RoaXMucHJvcHMubGFuZ3VhZ2V9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICBpZDogYG9jRGF0YWdyaWRGaWx0ZXJJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fWAsXG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IGNvbHVtbi5zdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5maWx0ZXJDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNhc2UgJ2Jvb2xlYW4nOiB7XG4gICAgICAgICAgICBjb25zdCB7IGludGwgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RPcHRpb25zID0gW1xuICAgICAgICAgICAgICB7IHZhbHVlOiB0cnVlLCBsYWJlbDogaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLlllcycgfSkgfSxcbiAgICAgICAgICAgICAgeyB2YWx1ZTogZmFsc2UsIGxhYmVsOiBpbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuTm8nIH0pIH0sXG4gICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RUcmFuc2xhdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50VHJhbnNsYXRpb25zIHx8IHtcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IGludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5TZWxlY3QnIH0pLFxuICAgICAgICAgICAgICBub1Jlc3VsdHNUZXh0OiBpbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuTm9SZXN1bHRzJyB9KSxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmlubGluZUVkaXQpIHtcbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiAoXG4gICAgICAgICAgICAgICAgICA8RmxvYXRpbmdTZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgbmFtZT17Y29sLnZhbHVlS2V5UGF0aC5qb2luKCkgKyAnLWVkaXQtJyArIHJvd0luZGV4fVxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zPXtzZWxlY3RPcHRpb25zfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkVkaXRDZWxsVmFsdWVDaGFuZ2Uocm93SW5kZXgsIGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLm9uRWRpdENlbGxCbHVyKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLm9uQ2VsbEZvY3VzKCdlZGl0JywgY29sLmNvbXBvbmVudFR5cGUsIHJvd0luZGV4LCBjb2x1bW4uY29sdW1uS2V5KX1cbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoYWJsZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyYWJsZT17IWNvbC5pc1JlcXVpcmVkfVxuICAgICAgICAgICAgICAgICAgICBiYWNrc3BhY2VSZW1vdmVzPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgdGFiU2VsZWN0c1ZhbHVlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgb3Blbk9uRm9jdXNcbiAgICAgICAgICAgICAgICAgICAgcmVmPXt0aGlzLmhhbmRsZUVkaXRDZWxsUmVmKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgaWQ6IGBvY0RhdGFncmlkRWRpdElucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YCxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5lZGl0Q29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2VkaXQnKX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgICAgICAgICB7Li4uc2VsZWN0VHJhbnNsYXRpb25zfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IChcbiAgICAgICAgICAgICAgICAgIDxGbG9hdGluZ1NlbGVjdFxuICAgICAgICAgICAgICAgICAgICBuYW1lPXtjb2wudmFsdWVLZXlQYXRoLmpvaW4oKSArICctY3JlYXRlLScgKyByb3dJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucz17c2VsZWN0T3B0aW9uc31cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0Q3JlYXRlSXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZShyb3dJbmRleCwgY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMub25DcmVhdGVDZWxsQmx1cihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoYWJsZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyYWJsZT17IWNvbC5pc1JlcXVpcmVkfVxuICAgICAgICAgICAgICAgICAgICBiYWNrc3BhY2VSZW1vdmVzPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgdGFiU2VsZWN0c1ZhbHVlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgb3Blbk9uRm9jdXNcbiAgICAgICAgICAgICAgICAgICAgcmVmPXt0aGlzLmhhbmRsZUNyZWF0ZUNlbGxSZWYocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICBpZDogYG9jRGF0YWdyaWRDcmVhdGVJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fS0ke3Jvd0luZGV4fWAsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuY3JlYXRlQ29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2NyZWF0ZScpfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5zZWxlY3RUcmFuc2xhdGlvbnN9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmZpbHRlcmluZykge1xuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8RmxvYXRpbmdTZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgbmFtZT17Y29sLnZhbHVlS2V5UGF0aC5qb2luKCkgKyAnLWZpbHRlcid9XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e3NlbGVjdE9wdGlvbnN9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldEZpbHRlckl0ZW1WYWx1ZShjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkZpbHRlckNlbGxWYWx1ZUNoYW5nZShjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaGFibGU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBjbGVhcmFibGVcbiAgICAgICAgICAgICAgICAgICAgdGFiU2VsZWN0c1ZhbHVlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgb3Blbk9uRm9jdXNcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICAgIGlkOiBgb2NEYXRhZ3JpZEZpbHRlcklucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9YCxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5maWx0ZXJDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgICAgICAgICB7Li4uc2VsZWN0VHJhbnNsYXRpb25zfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29sdW1ucy5wdXNoKGNvbHVtbik7XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5pc0NyZWF0aW5nKSB7XG4gICAgICBjb2x1bW5zLnB1c2goe1xuICAgICAgICB3aWR0aDogMzcsXG4gICAgICAgIGlzUmVzaXphYmxlOiBmYWxzZSxcbiAgICAgICAgY29sdW1uS2V5OiAncmVtb3ZlTmV3SXRlbScsXG4gICAgICAgIGNlbGw6ICgpID0+IG51bGwsXG4gICAgICAgIGNlbGxFZGl0OiAoKSA9PiBudWxsLFxuICAgICAgICBjZWxsQ3JlYXRlOiByb3dJbmRleCA9PiAoXG4gICAgICAgICAgPEljb25cbiAgICAgICAgICAgIGlkPXtgb2MtZGF0YWdyaWQtbmV3LWl0ZW0tcmVtb3ZlLSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke3Jvd0luZGV4fWB9XG4gICAgICAgICAgICB0eXBlPVwiaW5kaWNhdG9yXCJcbiAgICAgICAgICAgIG5hbWU9XCJkZWxldGVcIlxuICAgICAgICAgICAgd2lkdGg9ezMwfVxuICAgICAgICAgICAgaGVpZ2h0PXszMH1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMucHJvcHMucmVtb3ZlTmV3SXRlbSh0aGlzLnByb3BzLmdyaWQsIHJvd0luZGV4KX1cbiAgICAgICAgICAvPlxuICAgICAgICApLFxuICAgICAgICBjZWxsRmlsdGVyOiAoKSA9PiBudWxsLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBjb2x1bW5zO1xuICB9XG5cbiAgaXNDZWxsRWRpdGVkID0gKHJvd0luZGV4LCBjb2wsIGNlbGxUeXBlKSA9PiB7XG4gICAgaWYgKGNlbGxUeXBlICE9PSAnZWRpdCcpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgaWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgIGlmICh0aGlzLnByb3BzLmVkaXREYXRhLmdldEluKFtpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gY2hlY2tlciBmb3Igc2VsZWN0aW9uQ2hlY2tib3hcbiAgaXNTZWxlY3Rpb25DaGVja2JveChjZWxsUHJvcHMpIHtcbiAgICBjb25zdCBleHBlY3RlZENvbHVtbktleSA9ICdzZWxlY3Rpb25DaGVja2JveCc7XG4gICAgcmV0dXJuICh0aGlzLnByb3BzLnJvd1NlbGVjdENoZWNrYm94Q29sdW1uICYmIGNlbGxQcm9wcy5jb2x1bW5LZXkgPT09IGV4cGVjdGVkQ29sdW1uS2V5KTtcbiAgfVxuXG4gIGhhbmRsZUFmdGVyQWRkSXRlbSA9ICgpID0+IHtcbiAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsID0gdHJ1ZTtcbiAgfVxuXG4gIGhhbmRsZUFmdGVyRWRpdFByZXNzID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuc2l6ZSkge1xuICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSB0cnVlO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGN1cnJlbnRSb3c6IHVuZGVmaW5lZCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUFmdGVyVmFsaWRhdGlvbkVycm9yID0gKCkgPT4ge1xuICAgIHRoaXMuZm9jdXNUb0Vycm9yQ2VsbCA9IHRydWU7XG4gIH1cblxuICBoYW5kbGVSb3dDbGljayA9IChlLCByb3dJbmRleCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnJvd1NlbGVjdCAmJiAhdGhpcy5wcm9wcy5pc0NyZWF0aW5nICYmICF0aGlzLnByb3BzLmlzRWRpdGluZykge1xuICAgICAgaWYgKGUuY3RybEtleSB8fCBlLnNoaWZ0S2V5KSB7XG4gICAgICAgIGRvY3VtZW50LmdldFNlbGVjdGlvbigpLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgfVxuICAgICAgLy8gZG9uJ3QgdHJpZ2dlciBzZWxlY3Rpb24gY2hhbmdlIG9uIGNoZWNrYm94IGNsaWNrXG4gICAgICBpZiAoZS50YXJnZXQudHlwZSAhPT0gJ2NoZWNrYm94Jykge1xuICAgICAgICB0aGlzLnByb3BzLml0ZW1TZWxlY3Rpb25DaGFuZ2UoXG4gICAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgIHRoaXMucHJvcHMubXVsdGlTZWxlY3QgJiYgZS5jdHJsS2V5LFxuICAgICAgICAgIHRoaXMucHJvcHMubXVsdGlTZWxlY3QgJiYgZS5zaGlmdEtleSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMub25Sb3dDbGljaykge1xuICAgICAgdGhpcy5wcm9wcy5vblJvd0NsaWNrKGUsIHJvd0luZGV4LCB0aGlzLnByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmVuZGVyQ2VsbCA9IGNvbCA9PiAoY2VsbFByb3BzKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgaXNDcmVhdGluZyxcbiAgICAgIGlzRWRpdGluZyxcbiAgICAgIGNyZWF0ZURhdGEsXG4gICAgICBzZWxlY3RlZENlbGwsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyByb3dJbmRleCwgLi4ucHJvcHMgfSA9IGNlbGxQcm9wcztcbiAgICBjb25zdCBpc0NoZWNrYm94ID0gdGhpcy5pc1NlbGVjdGlvbkNoZWNrYm94KGNlbGxQcm9wcyk7XG4gICAgbGV0IGNlbGw7XG4gICAgbGV0IGNlbGxUeXBlID0gJ3ZpZXcnO1xuICAgIGxldCBleHRyYVJvd0NvdW50ID0gMDsgLy8gaG93IG1hbnkgcm93cyB0byBpZ25vcmUgZnJvbSB0b3AsIG5ldyArIGZpbHRlciByb3dzXG4gICAgaWYgKGlzQ3JlYXRpbmcpIGV4dHJhUm93Q291bnQgPSBjcmVhdGVEYXRhLnNpemU7XG4gICAgaWYgKGlzQ3JlYXRpbmcpIHtcbiAgICAgIGlmIChyb3dJbmRleCA8PSAoZXh0cmFSb3dDb3VudCAtIDEpKSB7XG4gICAgICAgIGlmIChjb2wuY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNlbGwgPSBjb2wuY2VsbENyZWF0ZShyb3dJbmRleCk7XG4gICAgICAgICAgY2VsbFR5cGUgPSAnY3JlYXRlJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjZWxsID0gbnVsbDtcbiAgICAgICAgICBjZWxsVHlwZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNlbGwgPSBjb2wuY2VsbChyb3dJbmRleCAtIGV4dHJhUm93Q291bnQpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNFZGl0aW5nICYmIGNvbC5jZWxsRWRpdCkge1xuICAgICAgY2VsbCA9IGNvbC5jZWxsRWRpdChyb3dJbmRleCAtIGV4dHJhUm93Q291bnQpO1xuICAgICAgY2VsbFR5cGUgPSAnZWRpdCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNlbGwgPSBjb2wuY2VsbChyb3dJbmRleCAtIGV4dHJhUm93Q291bnQpO1xuICAgIH1cbiAgICBpZiAoKGNlbGxUeXBlID09PSAndmlldycgfHwgY2VsbFR5cGUgPT09ICdlZGl0JyB8fCBjZWxsVHlwZSA9PT0gJ2NyZWF0ZScpICYmICFpc0NoZWNrYm94KSB7XG4gICAgICBjb25zdCBnZXRSb3dJbmRleCA9IChjZWxsVHlwZSA9PT0gJ2NyZWF0ZScpID8gcm93SW5kZXggOiAocm93SW5kZXggLSBleHRyYVJvd0NvdW50KTtcbiAgICAgIGNvbnN0IG1lc3NhZ2VEYXRhID0gdGhpcy5nZXRDZWxsTWVzc2FnZXMoZ2V0Um93SW5kZXgsIGNvbCwgY2VsbFR5cGUpO1xuICAgICAgY29uc3QgaXNFZGl0ZWQgPSB0aGlzLmlzQ2VsbEVkaXRlZChnZXRSb3dJbmRleCwgY29sLCBjZWxsVHlwZSk7XG4gICAgICBjb25zdCBjbGFzc05hbWUgPSAoc2VsZWN0ZWRDZWxsLmdldCgncm93SW5kZXgnKSA9PT0gcm93SW5kZXggJiYgc2VsZWN0ZWRDZWxsLmdldCgnY29sdW1uS2V5JykgPT09IHByb3BzLmNvbHVtbktleSkgP1xuICAgICAgICAnb2MtZGF0YWdyaWQtY2VsbCBpcy1zZWxlY3RlZCcgOiAnb2MtZGF0YWdyaWQtY2VsbCc7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Q2VsbFxuICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgICAgICBzdHlsZT17Y29sLnN0eWxlfVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2VsbFNlbGVjdChjZWxsVHlwZSwgcm93SW5kZXgsIHByb3BzLmNvbHVtbktleSl9XG4gICAgICAgID5cbiAgICAgICAgICA8Q2VsbFRvb2x0aXBcbiAgICAgICAgICAgIGlkPXtjZWxsVHlwZSArIGNvbC5jb2x1bW5LZXkgKyAocm93SW5kZXggLSBleHRyYVJvd0NvdW50KX1cbiAgICAgICAgICAgIGlzRWRpdGVkPXtpc0VkaXRlZH1cbiAgICAgICAgICAgIGlzRXJyb3I9eyEhbWVzc2FnZURhdGEuZXJyb3JNZXNzYWdlfVxuICAgICAgICAgICAgaXNXYXJuaW5nPXshIW1lc3NhZ2VEYXRhLndhcm5pbmdNZXNzYWdlfVxuICAgICAgICAgICAgaW5mb01lc3NhZ2U9e21lc3NhZ2VEYXRhLmluZm9NZXNzYWdlfVxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlPXttZXNzYWdlRGF0YS5lcnJvck1lc3NhZ2V9XG4gICAgICAgICAgICB3YXJuaW5nTWVzc2FnZT17bWVzc2FnZURhdGEud2FybmluZ01lc3NhZ2V9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgeyBjZWxsIH1cbiAgICAgICAgICA8L0NlbGxUb29sdGlwPlxuICAgICAgICA8L0NlbGw+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPENlbGwgey4uLnByb3BzfSBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1jZWxsXCIgc3R5bGU9e2NvbC5zdHlsZX0+eyBjZWxsIH08L0NlbGw+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlckNvbHVtbnMgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmFsbERhdGFTaXplICYmICF0aGlzLnByb3BzLmlzQnVzeSAmJiAhdGhpcy5wcm9wcy5pc0NyZWF0aW5nKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Q29sdW1uXG4gICAgICAgICAgY29sdW1uS2V5PVwiZGF0YUVtcHR5Q29sdW1uXCJcbiAgICAgICAgICBoZWFkZXI9ezxDZWxsIHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicgfX0+PE0gaWQ9XCJHcmlkLk5vSXRlbXNcIiAvPjwvQ2VsbD59XG4gICAgICAgICAgd2lkdGg9ezEwfVxuICAgICAgICAgIGlzUmVzaXphYmxlPXtmYWxzZX1cbiAgICAgICAgICBmbGV4R3Jvdz17MX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICAgIGlmICghdGhpcy5wcm9wcy52aXNpYmxlQ29sdW1ucy5zaXplKSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5pc0J1c3kpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8Q29sdW1uXG4gICAgICAgICAgICBjb2x1bW5LZXk9XCJkYXRhRW1wdHlDb2x1bW5cIlxuICAgICAgICAgICAgaGVhZGVyPXs8Q2VsbD4mbmJzcDs8L0NlbGw+fVxuICAgICAgICAgICAgd2lkdGg9ezEwfVxuICAgICAgICAgICAgaXNSZXNpemFibGU9e2ZhbHNlfVxuICAgICAgICAgICAgZmxleEdyb3c9ezF9XG4gICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxDb2x1bW5cbiAgICAgICAgICBjb2x1bW5LZXk9XCJkYXRhRW1wdHlDb2x1bW5cIlxuICAgICAgICAgIGhlYWRlcj17PENlbGwgc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJyB9fT48TSBpZD1cIkdyaWQuTm9Db2x1bW5zXCIgLz48L0NlbGw+fVxuICAgICAgICAgIHdpZHRoPXsxMH1cbiAgICAgICAgICBpc1Jlc2l6YWJsZT17ZmFsc2V9XG4gICAgICAgICAgZmxleEdyb3c9ezF9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCBjb2x1bW5zID0gdGhpcy5nZW5lcmF0ZUNvbHVtbnMoKTtcbiAgICBpZiAoY29sdW1ucy5sZW5naHQgPT09IDApIHJldHVybiBudWxsO1xuICAgIHJldHVybiBjb2x1bW5zLm1hcChjb2wgPT4gKFxuICAgICAgPENvbHVtblxuICAgICAgICBrZXk9e2NvbC5jb2x1bW5LZXl9XG4gICAgICAgIGNvbHVtbktleT17Y29sLmNvbHVtbktleX1cbiAgICAgICAgaGVhZGVyPXtcbiAgICAgICAgICA8SGVhZGVyQ2VsbFxuICAgICAgICAgICAgZ3JpZD17dGhpcy5wcm9wcy5ncmlkfVxuICAgICAgICAgICAgY29sdW1ucz17dGhpcy5wcm9wcy5jb2x1bW5zfVxuICAgICAgICAgICAgY29sdW1uPXtjb2x9XG4gICAgICAgICAgICBjdXJyZW50U29ydENvbHVtbj17dGhpcy5wcm9wcy5zb3J0Q29sdW1ufVxuICAgICAgICAgICAgY3VycmVudFNvcnRPcmRlcj17dGhpcy5wcm9wcy5zb3J0T3JkZXJ9XG4gICAgICAgICAgICBvblNvcnRDaGFuZ2U9e3RoaXMucHJvcHMuc29ydENoYW5nZX1cbiAgICAgICAgICAgIGlzQnVzeT17dGhpcy5wcm9wcy5pc0J1c3l9XG4gICAgICAgICAgICBmaWx0ZXJpbmc9e3RoaXMucHJvcHMuaXNGaWx0ZXJpbmd9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2NvbC5oZWFkZXJ9XG4gICAgICAgICAgPC9IZWFkZXJDZWxsPlxuICAgICAgICB9XG4gICAgICAgIGNlbGw9e3RoaXMucmVuZGVyQ2VsbChjb2wpfVxuICAgICAgICB3aWR0aD17dGhpcy5wcm9wcy5jb2x1bW5XaWR0aHMuZ2V0KGNvbC5jb2x1bW5LZXksIGNvbC53aWR0aCl9XG4gICAgICAgIG1pbldpZHRoPXtjb2wubWluV2lkdGh9XG4gICAgICAgIG1heFdpZHRoPXtjb2wubWF4V2lkdGh9XG4gICAgICAgIGlzUmVzaXphYmxlPXtjb2wuaXNSZXNpemFibGV9XG4gICAgICAgIGZsZXhHcm93PXtjb2wuZmxleEdyb3cgPyBjb2wuZmxleEdyb3cgOiAwfVxuICAgICAgICBmaXhlZD17Y29sLmZpeGVkfVxuICAgICAgICBhbGxvd0NlbGxzUmVjeWNsaW5nPXtjb2wuYWxsb3dDZWxsc1JlY3ljbGluZ31cbiAgICAgIC8+KSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgZ3JpZENsYXNzTmFtZSA9IGNsYXNzTmFtZXMoe1xuICAgICAgJ29jLWRhdGFncmlkLWNvbnRhaW5lcic6IHRydWUsXG4gICAgICAnd2l0aC1hY3Rpb25iYXInOiB0aGlzLnByb3BzLmlubGluZUVkaXQgJiYgIXRoaXMucHJvcHMuZGlzYWJsZUFjdGlvbkJhcixcbiAgICAgICdpcy1idXN5JzogdGhpcy5wcm9wcy5pc0J1c3ksXG4gICAgICAnaXMtZWRpdGluZyc6IHRoaXMucHJvcHMuaXNFZGl0aW5nLFxuICAgICAgJ2lzLWNyZWF0aW5nJzogdGhpcy5wcm9wcy5pc0NyZWF0aW5nLFxuICAgIH0pO1xuICAgIGxldCBhY3Rpb25CYXIgPSBudWxsO1xuICAgIGxldCBhY3Rpb25CYXJSaWdodCA9IG51bGw7XG4gICAgbGV0IGFjdGlvbkJhckxlZnQgPSBudWxsO1xuICAgIGlmIChcbiAgICAgICh0aGlzLnByb3BzLmFjdGlvbkJhciB8fFxuICAgICAgdGhpcy5wcm9wcy5pbmxpbmVFZGl0IHx8XG4gICAgICB0aGlzLnByb3BzLmZpbHRlcmluZyB8fFxuICAgICAgdGhpcy5wcm9wcy5yZW1vdmluZykgJiZcbiAgICAgICF0aGlzLnByb3BzLmRpc2FibGVBY3Rpb25CYXJcbiAgICApIHtcbiAgICAgIGFjdGlvbkJhclJpZ2h0ID0gKFxuICAgICAgICA8QWN0aW9uQmFyIHBvc2l0aW9uPVwicmlnaHRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWFjdGlvbmJhci1yaWdodFwiPnsgdGhpcy5wcm9wcy5hY3Rpb25CYXIgfTwvZGl2PlxuICAgICAgICAgIHsgKHRoaXMucHJvcHMuZmlsdGVyaW5nICYmIHRoaXMucHJvcHMuZGlzYWJsZURyb3Bkb3duXG4gICAgICAgICAgICAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlRmlsdGVyaW5nQ29udHJvbHMpICYmXG4gICAgICAgICAgICA8RmlsdGVyaW5nQ29udHJvbHMgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICAgfVxuICAgICAgICAgIHsgdGhpcy5wcm9wcy5pbmxpbmVFZGl0ICYmXG4gICAgICAgICAgICA8SW5saW5lRWRpdENvbnRyb2xzXG4gICAgICAgICAgICAgIGFmdGVyQWRkSXRlbT17dGhpcy5oYW5kbGVBZnRlckFkZEl0ZW19XG4gICAgICAgICAgICAgIGFmdGVyRWRpdFByZXNzPXt0aGlzLmhhbmRsZUFmdGVyRWRpdFByZXNzfVxuICAgICAgICAgICAgICBhZnRlclZhbGlkYXRpb25FcnJvcj17dGhpcy5oYW5kbGVBZnRlclZhbGlkYXRpb25FcnJvcn1cbiAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIH1cbiAgICAgICAgICB7ICh0aGlzLnByb3BzLmRyb3Bkb3duTWVudUl0ZW1zIHx8XG4gICAgICAgICAgICAgdGhpcy5wcm9wcy5yZW1vdmluZyB8fFxuICAgICAgICAgICAgIHRoaXMucHJvcHMuY29sdW1uU2V0dGluZ3MgfHxcbiAgICAgICAgICAgICAodGhpcy5wcm9wcy5maWx0ZXJpbmcgJiYgIXRoaXMucHJvcHMuZGlzYWJsZURyb3Bkb3duKSkgJiZcbiAgICAgICAgICAgICA8RHJvcGRvd25Db250cm9scyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgICB9XG4gICAgICAgIDwvQWN0aW9uQmFyPlxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuYWN0aW9uQmFyTGVmdCB8fCB0aGlzLnByb3BzLmdyaWRIZWFkZXIpIHtcbiAgICAgIGFjdGlvbkJhckxlZnQgPSAoXG4gICAgICAgIDxBY3Rpb25CYXIgcG9zaXRpb249XCJsZWZ0XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1ncmlkaGVhZGVyXCI+eyB0aGlzLnByb3BzLmdyaWRIZWFkZXIgfTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtYWN0aW9uYmFyLWxlZnRcIj57IHRoaXMucHJvcHMuYWN0aW9uQmFyTGVmdCB9PC9kaXY+XG4gICAgICAgIDwvQWN0aW9uQmFyPlxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGFjdGlvbkJhckxlZnQgfHwgYWN0aW9uQmFyUmlnaHQpIHtcbiAgICAgIGFjdGlvbkJhciA9IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1hY3Rpb25iYXItY29udGFpbmVyXCI+XG4gICAgICAgICAgeyBhY3Rpb25CYXJMZWZ0IH1cbiAgICAgICAgICB7IGFjdGlvbkJhclJpZ2h0IH1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgICBsZXQgcm93c0NvdW50ID1cbiAgICAgICh0aGlzLnByb3BzLnJvd3NDb3VudCB8fCB0aGlzLnByb3BzLnJvd3NDb3VudCA9PT0gMCkgP1xuICAgICAgICB0aGlzLnByb3BzLnJvd3NDb3VudCA6XG4gICAgICAgIHRoaXMucHJvcHMuZGF0YS5zaXplO1xuICAgIGlmICh0aGlzLnByb3BzLmlzQ3JlYXRpbmcpIHJvd3NDb3VudCArPSB0aGlzLnByb3BzLmNyZWF0ZURhdGEuc2l6ZTtcbiAgICBpZiAoIXRoaXMucHJvcHMudmlzaWJsZUNvbHVtbnMuc2l6ZSkgcm93c0NvdW50ID0gMDtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD17YG9jLWRhdGFncmlkLSR7dGhpcy5wcm9wcy5ncmlkLmlkfWB9XG4gICAgICAgIGNsYXNzTmFtZT17Z3JpZENsYXNzTmFtZX1cbiAgICAgICAgc3R5bGU9e3RoaXMucHJvcHMuY29udGFpbmVyU3R5bGV9XG4gICAgICA+XG4gICAgICAgIHsgdGhpcy5wcm9wcy5pc0J1c3kgJiYgPFNwaW5uZXIgLz4gfVxuICAgICAgICB7IGFjdGlvbkJhciB9XG4gICAgICAgIDxSZXNwb25zaXZlRml4ZWREYXRhVGFibGVcbiAgICAgICAgICBpZD17dGhpcy5wcm9wcy5ncmlkLmlkfVxuICAgICAgICAgIHJvd3NDb3VudD17cm93c0NvdW50fVxuICAgICAgICAgIGhlYWRlckhlaWdodD17dGhpcy5wcm9wcy5pc0ZpbHRlcmluZyA/XG4gICAgICAgICAgICB0aGlzLnByb3BzLmhlYWRlckhlaWdodCArIHRoaXMucHJvcHMuZmlsdGVyUm93SGVpZ2h0XG4gICAgICAgICAgICA6IHRoaXMucHJvcHMuaGVhZGVySGVpZ2h0fVxuICAgICAgICAgIHJvd0hlaWdodD17dGhpcy5wcm9wcy5yb3dIZWlnaHR9XG4gICAgICAgICAgb25Db2x1bW5SZXNpemVFbmRDYWxsYmFjaz17dGhpcy5vbkNvbHVtblJlc2l6ZUVuZENhbGxiYWNrfVxuICAgICAgICAgIGlzQ29sdW1uUmVzaXppbmc9e2ZhbHNlfVxuICAgICAgICAgIG9uUm93Q2xpY2s9e3RoaXMuaGFuZGxlUm93Q2xpY2t9XG4gICAgICAgICAgc2Nyb2xsVG9Db2x1bW49e3RoaXMucHJvcHMuc2Nyb2xsVG9Db2x1bW4gfHwgdGhpcy5zdGF0ZS5jdXJyZW50Q29sdW1ufVxuICAgICAgICAgIHNjcm9sbFRvcD17dGhpcy5wcm9wcy5zY3JvbGxUb3B9XG4gICAgICAgICAgc2Nyb2xsVG9Sb3c9e3RoaXMuZ2V0U2Nyb2xsVG9Sb3coKX1cbiAgICAgICAgICBvblJvd0RvdWJsZUNsaWNrPXt0aGlzLnByb3BzLm9uUm93RG91YmxlQ2xpY2t9XG4gICAgICAgICAgb25Sb3dNb3VzZURvd249e3RoaXMucHJvcHMub25Sb3dNb3VzZURvd259XG4gICAgICAgICAgb25Sb3dNb3VzZUVudGVyPXt0aGlzLnByb3BzLm9uUm93TW91c2VFbnRlcn1cbiAgICAgICAgICBvblJvd01vdXNlTGVhdmU9e3RoaXMucHJvcHMub25Sb3dNb3VzZUxlYXZlfVxuICAgICAgICAgIG9uU2Nyb2xsU3RhcnQ9e3RoaXMucHJvcHMub25TY3JvbGxTdGFydH1cbiAgICAgICAgICBvblNjcm9sbEVuZD17dGhpcy5wcm9wcy5vblNjcm9sbEVuZH1cbiAgICAgICAgICByb3dDbGFzc05hbWVHZXR0ZXI9e3RoaXMuZ2V0Um93Q2xhc3NOYW1lfVxuICAgICAgICAgIHJvd0hlaWdodEdldHRlcj17dGhpcy5wcm9wcy5yb3dIZWlnaHRHZXR0ZXJ9XG4gICAgICAgICAgb25Db250ZW50SGVpZ2h0Q2hhbmdlPXt0aGlzLnByb3BzLm9uQ29udGVudEhlaWdodENoYW5nZX1cbiAgICAgICAgPlxuICAgICAgICAgIHsgdGhpcy5yZW5kZXJDb2x1bW5zKCkgfVxuICAgICAgICA8L1Jlc3BvbnNpdmVGaXhlZERhdGFUYWJsZT5cbiAgICAgICAgeyB0aGlzLnByb3BzLmlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW4gJiZcbiAgICAgICAgICA8Q29sdW1uU2V0dGluZ3NNb2RhbFxuICAgICAgICAgICAgZ3JpZD17dGhpcy5wcm9wcy5ncmlkfVxuICAgICAgICAgICAgY29sdW1ucz17dGhpcy5wcm9wcy5jb2x1bW5zfVxuICAgICAgICAgICAgdmlzaWJsZUNvbHVtbnM9e3RoaXMucHJvcHMudmlzaWJsZUNvbHVtbnN9XG4gICAgICAgICAgICBjbG9zZUNvbHVtblNldHRpbmdzTW9kYWw9e3RoaXMucHJvcHMuY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsfVxuICAgICAgICAgICAgc2F2ZUNvbHVtblNldHRpbmdzPXt0aGlzLnByb3BzLnNhdmVDb2x1bW5TZXR0aW5nc31cbiAgICAgICAgICAvPlxuICAgICAgICB9XG4gICAgICAgIHsgdGhpcy5wcm9wcy5jaGlsZHJlbiB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=