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
import { FormControl, MenuItem } from 'react-bootstrap';
import classNames from 'classnames';
import moment from 'moment';
import { FloatingSelect } from '@opuscapita/react-floating-select';
import { DateInput } from '@opuscapita/react-datetime';
import { Icon } from '@opuscapita/react-icons';
import { Spinner } from '@opuscapita/react-spinner';
import Checkbox from '@opuscapita/react-checkbox';
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
    region: Utils.getRegion(GRID, state.user),
    dateFormat: Utils.getDateFormat(GRID, state.user),
    thousandSeparator: Utils.getThousandSeparator(GRID, state.user),
    decimalSeparator: Utils.getDecimalSeparator(GRID, state.user),
    focusType: state.datagrid.getIn([GRID.id, 'session', 'focusType'], Map())
  };
};

var mapDispatchToProps = datagridActions;

var DataGrid = (_dec = connect(mapStateToProps, mapDispatchToProps), injectIntl(_class = _dec(_class = (_temp = _class2 = function (_React$PureComponent) {
  _inherits(DataGrid, _React$PureComponent);

  function DataGrid(props) {
    _classCallCheck(this, DataGrid);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _initialiseProps.call(_this);

    _this.state = {
      currentRow: 0,
      currentColumn: 0
    };
    _this.cellRefs = {};
    _this.focusToCreateCell = false;
    _this.focusToEditCell = false; // TODO: Handle focusing when true
    _this.focusToErrorCell = false; // TODO: Handle focusing when true
    return _this;
  }

  DataGrid.prototype.componentWillUnmount = function componentWillUnmount() {
    document.removeEventListener('click', this.onDocumentClick);
    this.props.invalidate(this.props.grid);
  };

  DataGrid.prototype.render = function render() {
    var _classNames;

    var gridClassName = classNames((_classNames = {
      'oc-datagrid-container': true,
      'with-actionbar': this.props.inlineEdit && !this.props.disableActionBar,
      'is-busy': this.props.isBusy,
      'is-editing': this.props.isEditing,
      'is-creating': this.props.isCreating
    }, _classNames[this.props.className] = !!this.props.className, _classNames));

    // check if there is a new request to change edit mode focus
    this.setFocusTo(this.props.focusType);

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
      this.state.contextMenuOpen && this.renderContextMenu(),
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
          onRowMouseDown: this.props.onMouseDown,
          onRowMouseEnter: this.props.onRowMouseEnter,
          onRowMouseLeave: this.props.onRowMouseLeave,
          onScrollStart: this.props.onScrollStart,
          onScrollEnd: this.props.onScrollEnd,
          rowClassNameGetter: this.getRowClassName,
          rowHeightGetter: this.props.rowHeightGetter && this.handleRowHeightGetter,
          onContentHeightChange: this.props.onContentHeightChange,
          onRowContextMenu: this.handleContextMenu
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

  this.onDocumentClick = function () {
    if (_this2.props.contextMenuItems) {
      _this2.setState({
        contextMenuOpen: false
      });
    }
    document.removeEventListener('click', _this2.onDocumentClick);
  };

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
                return c.valueKeyPath.join('/') === columnKey;
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

  this.setFocusTo = function (focusTo) {
    if (_this2.props.isEditing || _this2.props.isCreating) {
      if (focusTo && focusTo.get('type') && focusTo !== _this2.prevFocusTo) {
        _this2[focusTo.get('type')] = true;
        _this2.focusToLastRow = focusTo.get('focusToLastRow');
        _this2.prevFocusTo = focusTo;
      }
    }
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
        var selectedRowIndex = _this2.focusToLastRow && _this2.props.data.size > 0 ? _this2.props.data.size - 1 : _this2.getSelectedItemIndex(_this2.props.selectedItems.first());

        var selectedCell = _this2.props.selectedCell;

        if (selectedCell.size > 0) {
          if (selectedCell.get('rowIndex') === rowIndex && selectedCell.get('columnKey') === columnKey) {
            ref.focus();
            _this2.focusToEditCell = false;
            _this2.focusToLastRow = false;
          }
        } else if (selectedRowIndex === undefined) {
          _this2.focusToEditCell = false;
          _this2.focusToLastRow = false;
        } else if (selectedRowIndex === rowIndex) {
          ref.focus();
          _this2.focusToEditCell = false;
          _this2.focusToLastRow = false;
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
    var extraColumn = _this2.props.extraColumn;

    var columns = [];
    var tabIndex = String(_this2.props.tabIndex);
    if (extraColumn) {
      columns.push({
        width: extraColumn.width || 40,
        isResizable: !!extraColumn.isResizable,
        isSortable: false,
        columnKey: 'extraColumn',
        cell: function cell(rowIndex) {
          return React.createElement(
            'div',
            { className: 'oc-datagrid-extra-column-cell no-row-select' },
            extraColumn.valueRender(_this2.props.data.get(rowIndex), tabIndex)
          );
        },
        cellEdit: function cellEdit(rowIndex) {
          return extraColumn.cellEdit ? extraColumn.cellEdit(rowIndex) : null;
        },
        cellCreate: function cellCreate(rowIndex) {
          return extraColumn.cellCreate ? extraColumn.cellCreate(rowIndex) : null;
        },
        cellFilter: function cellFilter(rowIndex) {
          return extraColumn.cellFilter ? extraColumn.cellFilter(rowIndex) : null;
        }
      });
    }

    if (_this2.props.rowSelectCheckboxColumn) {
      columns.push({
        width: 40,
        isResizable: false,
        isSortable: false,
        columnKey: 'selectionCheckbox',
        cell: function cell(rowIndex) {
          var rowItem = _this2.props.data.get(rowIndex);
          var itemId = rowItem.getIn(_this2.props.grid.idKeyPath);
          var selected = _this2.props.selectedItems.includes(itemId);
          return React.createElement(Checkbox, {
            id: 'ocDatagridSelectCheckBox-' + _this2.props.grid.id + '-' + rowIndex,
            className: 'oc-datagrid-select-checkbox-cell no-row-select',
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
          return col.valueRender(_this2.props.data.get(rowIndex), rowIndex);
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
          return col.editValueRender(_this2.props.data.get(rowIndex), rowIndex);
        };
      }
      if (col.cellCreate) {
        column.cellCreate = col.cellCreate;
      } else if (col.createValueRender) {
        column.cellCreate = function (rowIndex) {
          return col.createValueRender(_this2.props.data.get(rowIndex), rowIndex);
        };
      }
      if (col.cellFilter) {
        column.cellFilter = col.cellFilter;
      } else if (col.filterValueRender) {
        column.cellFilter = function (rowIndex) {
          return col.filterValueRender(_this2.props.data.get(rowIndex), rowIndex);
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
                      locale: _this2.props.region,
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
                      locale: _this2.props.region,
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
                      locale: _this2.props.region,
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
      // Don't trigger selection change on when user clicks on special cells like checkbox/extra
      // Check that clicked node's parent or parent's parent doesn't have no-row-select class
      var parentNode = e.target.parentNode;

      var parent1class = parentNode.className && parentNode.className.indexOf ? parentNode.className : '';
      var parent2class = parentNode.parentNode.className && parentNode.parentNode.className.indexOf // eslint-disable-line
      ? parentNode.parentNode.className : '';
      var parent3class = parentNode.parentNode.parentNode.className && parentNode.parentNode.parentNode.className.indexOf // eslint-disable-line
      ? parentNode.parentNode.parentNode.className : '';
      var parent4class = parentNode.parentNode.parentNode.parentNode.className && parentNode.parentNode.parentNode.parentNode.className.indexOf // eslint-disable-line
      ? parentNode.parentNode.parentNode.parentNode.className : '';
      if (parent1class.indexOf('no-row-select') === -1 && parent2class.indexOf('no-row-select') === -1 && parent3class.indexOf('no-row-select') === -1 && parent4class.indexOf('no-row-select') === -1) {
        _this2.props.itemSelectionChange(_this2.props.grid, rowIndex, _this2.props.multiSelect && e.ctrlKey, _this2.props.multiSelect && e.shiftKey);
      }
    }
    if (_this2.props.onRowClick) {
      _this2.props.onRowClick(e, rowIndex, _this2.props.data.get(rowIndex));
    }
    return true;
  };

  this.handleContextMenu = function (e, rowIndex) {
    if (_this2.props.contextMenuItems) {
      var _props2 = _this2.props,
          itemSelectionChange = _props2.itemSelectionChange,
          selectedItems = _props2.selectedItems,
          grid = _props2.grid,
          data = _props2.data;

      e.preventDefault();
      e.stopPropagation();
      _this2.setState({
        contextMenuOpen: true,
        contextMenuX: e.clientX,
        contextMenuY: e.clientY
      });
      // If clicked item is not selected, change selection to it
      if (!selectedItems.includes(data.getIn([rowIndex].concat(grid.idKeyPath)))) {
        itemSelectionChange(grid, rowIndex);
      }
      document.addEventListener('click', _this2.onDocumentClick);
      return false;
    }
    return true;
  };

  this.handleContextMenuItemClick = function (onClick, selectedItems, selectedData) {
    return function () {
      onClick(selectedItems, selectedData);
    };
  };

  this.handleRowHeightGetter = function (rowIndex) {
    return _this2.props.rowHeightGetter(_this2.props.data.get(rowIndex), rowIndex);
  };

  this.renderCell = function (col) {
    return function (cellProps) {
      var _props3 = _this2.props,
          isCreating = _props3.isCreating,
          isEditing = _props3.isEditing,
          createData = _props3.createData,
          selectedCell = _props3.selectedCell;

      var rowIndex = cellProps.rowIndex,
          props = _objectWithoutProperties(cellProps, ['rowIndex']);

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
      var isSpecial = cellProps.columnKey === 'selectionCheckbox' || cellProps.columnKey === 'extraColumn';
      if ((cellType === 'view' || cellType === 'edit' || cellType === 'create') && !isSpecial) {
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

  this.renderContextMenu = function () {
    var _props4 = _this2.props,
        contextMenuItems = _props4.contextMenuItems,
        data = _props4.data,
        grid = _props4.grid,
        selectedItems = _props4.selectedItems;
    var _state = _this2.state,
        contextMenuX = _state.contextMenuX,
        contextMenuY = _state.contextMenuY;

    var style = {
      display: 'block',
      zIndex: 10000,
      position: 'absolute',
      top: contextMenuY + 'px',
      left: contextMenuX + 'px'
    };
    var selectedData = data.filter(function (d) {
      return selectedItems.includes(d.getIn(grid.idKeyPath));
    });
    return React.createElement(
      'ul',
      { className: 'dropdown-menu oc-datagrid-context-menu open', style: style },
      contextMenuItems && contextMenuItems.map && contextMenuItems.map(function (item, i) {
        var disabled = item.disabled;

        if (typeof item.disabled === 'function') {
          disabled = item.disabled(selectedItems, selectedData);
        }
        return React.createElement(
          MenuItem,
          {
            key: i // eslint-disable-line
            , header: item.header,
            divider: item.divider,
            disabled: disabled,
            title: item.title,
            onClick: disabled || !item.onClick ? null : _this2.handleContextMenuItemClick(item.onClick, selectedItems, selectedData)
          },
          item.value
        );
      })
    );
  };
}, _temp)) || _class) || _class);
export { DataGrid as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiTWFwIiwiTGlzdCIsImNvbm5lY3QiLCJpbmplY3RJbnRsIiwiRm9ybWF0dGVkTWVzc2FnZSIsIk0iLCJGb3JtYXR0ZWROdW1iZXIiLCJOIiwiQ29sdW1uIiwiQ2VsbCIsIkZvcm1Db250cm9sIiwiTWVudUl0ZW0iLCJjbGFzc05hbWVzIiwibW9tZW50IiwiRmxvYXRpbmdTZWxlY3QiLCJEYXRlSW5wdXQiLCJJY29uIiwiU3Bpbm5lciIsIkNoZWNrYm94IiwiZm9ybWF0Q3VycmVuY3lBbW91bnQiLCJSZXNwb25zaXZlRml4ZWREYXRhVGFibGUiLCJIZWFkZXJDZWxsIiwiQWN0aW9uQmFyIiwiSW5saW5lRWRpdENvbnRyb2xzIiwiRmlsdGVyaW5nQ29udHJvbHMiLCJEcm9wZG93bkNvbnRyb2xzIiwiZGF0YWdyaWRBY3Rpb25zIiwiQ2VsbFRvb2x0aXAiLCJDb2x1bW5TZXR0aW5nc01vZGFsIiwicHJvcFR5cGVzIiwiZGVmYXVsdFByb3BzIiwiS0VZX0NPREVTIiwiVXRpbHMiLCJtYXBTdGF0ZVRvUHJvcHMiLCJzdGF0ZSIsIm93blByb3BzIiwiR1JJRCIsImdyaWQiLCJpc0J1c3kiLCJkYXRhZ3JpZCIsImdldEluIiwiaWQiLCJpc0VkaXRpbmciLCJpc0NyZWF0aW5nIiwiaXNGaWx0ZXJpbmciLCJpc0NvbHVtblNldHRpbmdzTW9kYWxPcGVuIiwic29ydENvbHVtbiIsInNvcnRPcmRlciIsInZpc2libGVDb2x1bW5zIiwiY29sdW1uV2lkdGhzIiwic2VsZWN0ZWRDZWxsIiwic2VsZWN0ZWRJdGVtcyIsImRhdGEiLCJlZGl0RGF0YSIsImNyZWF0ZURhdGEiLCJmaWx0ZXJEYXRhIiwiY2VsbE1lc3NhZ2VzIiwiY3JlYXRlQ2VsbE1lc3NhZ2VzIiwiYWxsRGF0YVNpemUiLCJzaXplIiwibGFuZ3VhZ2UiLCJnZXRMYW5ndWFnZSIsInVzZXIiLCJyZWdpb24iLCJnZXRSZWdpb24iLCJkYXRlRm9ybWF0IiwiZ2V0RGF0ZUZvcm1hdCIsInRob3VzYW5kU2VwYXJhdG9yIiwiZ2V0VGhvdXNhbmRTZXBhcmF0b3IiLCJkZWNpbWFsU2VwYXJhdG9yIiwiZ2V0RGVjaW1hbFNlcGFyYXRvciIsImZvY3VzVHlwZSIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsIkRhdGFHcmlkIiwicHJvcHMiLCJjdXJyZW50Um93IiwiY3VycmVudENvbHVtbiIsImNlbGxSZWZzIiwiZm9jdXNUb0NyZWF0ZUNlbGwiLCJmb2N1c1RvRWRpdENlbGwiLCJmb2N1c1RvRXJyb3JDZWxsIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJkb2N1bWVudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJvbkRvY3VtZW50Q2xpY2siLCJpbnZhbGlkYXRlIiwicmVuZGVyIiwiZ3JpZENsYXNzTmFtZSIsImlubGluZUVkaXQiLCJkaXNhYmxlQWN0aW9uQmFyIiwiY2xhc3NOYW1lIiwic2V0Rm9jdXNUbyIsImFjdGlvbkJhciIsImFjdGlvbkJhclJpZ2h0IiwiYWN0aW9uQmFyTGVmdCIsImZpbHRlcmluZyIsInJlbW92aW5nIiwiZGlzYWJsZURyb3Bkb3duIiwiZGlzYWJsZUZpbHRlcmluZ0NvbnRyb2xzIiwiaGFuZGxlQWZ0ZXJBZGRJdGVtIiwiaGFuZGxlQWZ0ZXJFZGl0UHJlc3MiLCJoYW5kbGVBZnRlclZhbGlkYXRpb25FcnJvciIsImRyb3Bkb3duTWVudUl0ZW1zIiwiY29sdW1uU2V0dGluZ3MiLCJncmlkSGVhZGVyIiwicm93c0NvdW50IiwiY29udGFpbmVyU3R5bGUiLCJjb250ZXh0TWVudU9wZW4iLCJyZW5kZXJDb250ZXh0TWVudSIsImhlYWRlckhlaWdodCIsImZpbHRlclJvd0hlaWdodCIsInJvd0hlaWdodCIsIm9uQ29sdW1uUmVzaXplRW5kQ2FsbGJhY2siLCJoYW5kbGVSb3dDbGljayIsInNjcm9sbFRvQ29sdW1uIiwic2Nyb2xsVG9wIiwiZ2V0U2Nyb2xsVG9Sb3ciLCJvblJvd0RvdWJsZUNsaWNrIiwib25Nb3VzZURvd24iLCJvblJvd01vdXNlRW50ZXIiLCJvblJvd01vdXNlTGVhdmUiLCJvblNjcm9sbFN0YXJ0Iiwib25TY3JvbGxFbmQiLCJnZXRSb3dDbGFzc05hbWUiLCJyb3dIZWlnaHRHZXR0ZXIiLCJoYW5kbGVSb3dIZWlnaHRHZXR0ZXIiLCJvbkNvbnRlbnRIZWlnaHRDaGFuZ2UiLCJoYW5kbGVDb250ZXh0TWVudSIsInJlbmRlckNvbHVtbnMiLCJjb2x1bW5zIiwiY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsIiwic2F2ZUNvbHVtblNldHRpbmdzIiwiY2hpbGRyZW4iLCJQdXJlQ29tcG9uZW50IiwiY29udGV4dE1lbnVJdGVtcyIsInNldFN0YXRlIiwibmV3Q29sdW1uV2lkdGgiLCJjb2x1bW5LZXkiLCJyZXNpemVDb2x1bW4iLCJvbkNyZWF0ZUNlbGxLZXlEb3duIiwiZSIsImtleUNvZGUiLCJFTlRFUiIsImFkZE5ld0l0ZW0iLCJnZXRDb2x1bW5EZWZhdWx0VmFsdWVzIiwib25FZGl0Q2VsbEtleURvd24iLCJjb2wiLCJyb3dJbmRleCIsImVuYWJsZUFycm93TmF2aWdhdGlvbiIsInJvd3NTaXplIiwiZ2V0Q29sdW1uS2V5IiwiRE9XTiIsInZhbHVlVHlwZSIsIm5leHRFbGVtZW50IiwibW92ZUNlbGxGb2N1cyIsIlVQIiwiVEFCIiwiUklHSFQiLCJMRUZUIiwicHJldmVudERlZmF1bHQiLCJjb2x1bW5JbmQiLCJmaW5kSW5kZXgiLCJjIiwidmFsdWVLZXlQYXRoIiwiam9pbiIsImRpc2FibGVkIiwicm93SW5kIiwic2hpZnRLZXkiLCJsZW5ndGgiLCJuZXh0Q29sdW1uS2V5Iiwib25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UiLCJ2YWx1ZVBhcnNlciIsImV2ZW50T3JEYXRhIiwicmF3VmFsdWUiLCJ0YXJnZXQiLCJ1bmRlZmluZWQiLCJ2YWx1ZSIsImZpbHRlckNlbGxWYWx1ZUNoYW5nZSIsIm9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlIiwiY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlIiwib25DcmVhdGVWYWx1ZUNoYW5nZSIsIm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlIiwibWF0Y2hWYWx1ZSIsIm5ld1ZhbHVlS2V5UGF0aCIsInYiLCJuZXdWYWx1ZSIsInZhbGlkYXRvcnMiLCJjcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZSIsIm9uRWRpdENlbGxWYWx1ZUNoYW5nZSIsImRhdGFJZCIsImdldERhdGFJZEJ5Um93SW5kZXgiLCJlZGl0Q2VsbFZhbHVlQ2hhbmdlIiwib25FZGl0VmFsdWVDaGFuZ2UiLCJlZGl0Q2VsbFZhbHVlVmFsaWRhdGUiLCJvbkNyZWF0ZUNlbGxCbHVyIiwib25DcmVhdGVCbHVyIiwiZ2V0RWRpdEl0ZW1WYWx1ZSIsIm9uRWRpdENlbGxCbHVyIiwib25FZGl0Qmx1ciIsIm9uQ2VsbEZvY3VzIiwiY2VsbFR5cGUiLCJpbnB1dFR5cGUiLCJzZWxlY3QiLCJjZWxsU2VsZWN0IiwiY2VsbFNlbGVjdGlvbkNoYW5nZSIsImlkS2V5UGF0aCIsImdldFNlbGVjdGVkSXRlbUluZGV4IiwiaW5kZXgiLCJlZGl0VmFsdWUiLCJvcmlnaW5hbFZhbHVlIiwiY29tcG9uZW50VHlwZSIsIlN0cmluZyIsInJlcGxhY2UiLCJnZXRDcmVhdGVJdGVtVmFsdWUiLCJ2YWwiLCJnZXRGaWx0ZXJJdGVtVmFsdWUiLCJnZXQiLCJnZXRDb21wb25lbnREaXNhYmxlZFN0YXRlIiwibW9kZSIsImNvbXBvbmVudERpc2FibGVkIiwiZGlzYWJsZUVkaXRpbmciLCJkaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaCIsIm1hdGNoVmFsdWVLZXlQYXRoIiwicm93Q2xhc3NOYW1lcyIsImV4dHJhUm93Q291bnQiLCJwdXNoIiwiaW5kZXhPZiIsInJvd0NsYXNzTmFtZUdldHRlciIsImdldENlbGxNZXNzYWdlcyIsInJldHVybkRhdGEiLCJpbmZvTWVzc2FnZSIsImVycm9yTWVzc2FnZSIsIndhcm5pbmdNZXNzYWdlIiwic2Nyb2xsVG9Sb3ciLCJzY3JvbGxOZXdSb3ciLCJmaXJzdCIsImZvY3VzVG8iLCJwcmV2Rm9jdXNUbyIsImZvY3VzVG9MYXN0Um93IiwiaGFuZGxlQ2VsbFNlbGVjdCIsImhhbmRsZUNyZWF0ZUNlbGxSZWYiLCJyZWYiLCJmb2N1cyIsImhhbmRsZUVkaXRDZWxsUmVmIiwic2VsZWN0ZWRSb3dJbmRleCIsImNvbHVtbkluZGV4IiwidHlwZSIsInNldFRpbWVvdXQiLCJoYW5kbGVTZWxlY3Rpb25DaGVja0JveE9uQ2hhbmdlIiwiaXRlbVNlbGVjdGlvbkNoYW5nZSIsImdlbmVyYXRlQ29sdW1ucyIsImV4dHJhQ29sdW1uIiwidGFiSW5kZXgiLCJ3aWR0aCIsImlzUmVzaXphYmxlIiwiaXNTb3J0YWJsZSIsImNlbGwiLCJ2YWx1ZVJlbmRlciIsImNlbGxFZGl0IiwiY2VsbENyZWF0ZSIsImNlbGxGaWx0ZXIiLCJyb3dTZWxlY3RDaGVja2JveENvbHVtbiIsInJvd0l0ZW0iLCJpdGVtSWQiLCJzZWxlY3RlZCIsImluY2x1ZGVzIiwiZm9yRWFjaCIsInZpc2libGVDb2x1bW5LZXkiLCJvcmdDb2wiLCJjb2x1bW4iLCJoZWFkZXIiLCJtaW5XaWR0aCIsIm1heFdpZHRoIiwiZGlzYWJsZVJlc2l6aW5nIiwiZml4ZWQiLCJhbGxvd0NlbGxzUmVjeWNsaW5nIiwiZGlzYWJsZVNvcnRpbmciLCJpc1JlcXVpcmVkIiwic3R5bGUiLCJnZXRDZWxsU3R5bGVCeUNvbCIsImZsZXhHcm93Iiwic29ydENvbXBhcmF0b3IiLCJzb3J0VmFsdWVHZXR0ZXIiLCJ2YWx1ZUVtcHR5Q2hlY2tlciIsImdldFZhbHVlRW1wdHlDaGVja2VyIiwiZm9ybWF0IiwicmVuZGVyQ29tcG9uZW50UHJvcHMiLCJjdXJyZW5jeUtleVBhdGgiLCJ2YWx1ZU9wdGlvbnMiLCJjdXJyZW5jeSIsImRlY2ltYWxzIiwiaXNWYWxpZCIsInV0YyIsImVkaXRWYWx1ZVJlbmRlciIsImNyZWF0ZVZhbHVlUmVuZGVyIiwiZmlsdGVyVmFsdWVSZW5kZXIiLCJlZGl0VmFsdWVQYXJzZXIiLCJlZGl0Q29tcG9uZW50UHJvcHMiLCJjcmVhdGVDb21wb25lbnRQcm9wcyIsImZpbHRlckNvbXBvbmVudFByb3BzIiwiUmVnRXhwIiwiaW50bCIsInNlbGVjdE9wdGlvbnMiLCJzZWxlY3RDb21wb25lbnRPcHRpb25zIiwic2VsZWN0VHJhbnNsYXRpb25zIiwic2VsZWN0Q29tcG9uZW50VHJhbnNsYXRpb25zIiwicGxhY2Vob2xkZXIiLCJmb3JtYXRNZXNzYWdlIiwibm9SZXN1bHRzVGV4dCIsImVkaXRTZWxlY3RPcHRpb25zTW9kIiwic2xpY2UiLCJjcmVhdGVTZWxlY3RPcHRpb25zTW9kIiwiZmlsdGVyU2VsZWN0T3B0aW9uc01vZCIsIm9uS2V5RG93biIsIm9uQmx1ciIsIm9uRm9jdXMiLCJsYWJlbCIsInJlbW92ZU5ld0l0ZW0iLCJpc0NlbGxFZGl0ZWQiLCJyb3dTZWxlY3QiLCJjdHJsS2V5IiwiZ2V0U2VsZWN0aW9uIiwicmVtb3ZlQWxsUmFuZ2VzIiwicGFyZW50Tm9kZSIsInBhcmVudDFjbGFzcyIsInBhcmVudDJjbGFzcyIsInBhcmVudDNjbGFzcyIsInBhcmVudDRjbGFzcyIsIm11bHRpU2VsZWN0Iiwib25Sb3dDbGljayIsInN0b3BQcm9wYWdhdGlvbiIsImNvbnRleHRNZW51WCIsImNsaWVudFgiLCJjb250ZXh0TWVudVkiLCJjbGllbnRZIiwiYWRkRXZlbnRMaXN0ZW5lciIsImhhbmRsZUNvbnRleHRNZW51SXRlbUNsaWNrIiwib25DbGljayIsInNlbGVjdGVkRGF0YSIsInJlbmRlckNlbGwiLCJjZWxsUHJvcHMiLCJpc1NwZWNpYWwiLCJnZXRSb3dJbmRleCIsIm1lc3NhZ2VEYXRhIiwiaXNFZGl0ZWQiLCJ0ZXh0QWxpZ24iLCJsZW5naHQiLCJtYXAiLCJzb3J0Q2hhbmdlIiwiZGlzcGxheSIsInpJbmRleCIsInBvc2l0aW9uIiwidG9wIiwibGVmdCIsImZpbHRlciIsImQiLCJpdGVtIiwiaSIsImRpdmlkZXIiLCJ0aXRsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsU0FBU0MsR0FBVCxFQUFjQyxJQUFkLFFBQTBCLFdBQTFCO0FBQ0EsU0FBU0MsT0FBVCxRQUF3QixhQUF4QjtBQUNBLFNBQ0VDLFVBREYsRUFFRUMsb0JBQW9CQyxDQUZ0QixFQUdFQyxtQkFBbUJDLENBSHJCLFFBSU8sWUFKUDtBQUtBLFNBQVNDLE1BQVQsRUFBaUJDLElBQWpCLFFBQTZCLG9CQUE3QjtBQUNBLFNBQVNDLFdBQVQsRUFBc0JDLFFBQXRCLFFBQXNDLGlCQUF0QztBQUNBLE9BQU9DLFVBQVAsTUFBdUIsWUFBdkI7QUFDQSxPQUFPQyxNQUFQLE1BQW1CLFFBQW5CO0FBQ0EsU0FBU0MsY0FBVCxRQUErQixtQ0FBL0I7QUFDQSxTQUFTQyxTQUFULFFBQTBCLDRCQUExQjtBQUNBLFNBQVNDLElBQVQsUUFBcUIseUJBQXJCO0FBQ0EsU0FBU0MsT0FBVCxRQUF3QiwyQkFBeEI7QUFDQSxPQUFPQyxRQUFQLE1BQXFCLDRCQUFyQjtBQUNBLFNBQVNDLG9CQUFULFFBQXFDLDBCQUFyQztBQUNBLE9BQU8sOENBQVA7O0FBRUEsT0FBT0Msd0JBQVAsTUFBcUMseUNBQXJDO0FBQ0EsT0FBT0MsVUFBUCxNQUF1Qix5QkFBdkI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLHdCQUF0QjtBQUNBLE9BQU9DLGtCQUFQLE1BQStCLGtDQUEvQjtBQUNBLE9BQU9DLGlCQUFQLE1BQThCLGdDQUE5QjtBQUNBLE9BQU9DLGdCQUFQLE1BQTZCLCtCQUE3QjtBQUNBLE9BQU8sS0FBS0MsZUFBWixNQUFpQyxvQkFBakM7QUFDQSxPQUFPQyxXQUFQLE1BQXdCLDBCQUF4QjtBQUNBLE9BQU9DLG1CQUFQLE1BQWdDLDZDQUFoQztBQUNBLFNBQVNDLFNBQVQsRUFBb0JDLFlBQXBCLFFBQXdDLGtCQUF4QztBQUNBLFNBQVNDLFNBQVQsUUFBMEIsc0JBQTFCO0FBQ0EsT0FBT0MsS0FBUCxNQUFrQixrQkFBbEI7QUFDQSxPQUFPLDJCQUFQOztBQUVBLElBQU1DLGtCQUFrQixTQUFsQkEsZUFBa0IsQ0FBQ0MsS0FBRCxFQUFRQyxRQUFSLEVBQXFCO0FBQzNDLE1BQU1DLE9BQU9ELFNBQVNFLElBQXRCO0FBQ0EsU0FBTztBQUNMQyxZQUFRSixNQUFNSyxRQUFOLENBQWVDLEtBQWYsQ0FBcUIsQ0FBQ0osS0FBS0ssRUFBTixFQUFVLFNBQVYsRUFBcUIsUUFBckIsQ0FBckIsRUFBcUQsSUFBckQsQ0FESDtBQUVMQyxlQUFXUixNQUFNSyxRQUFOLENBQWVDLEtBQWYsQ0FBcUIsQ0FBQ0osS0FBS0ssRUFBTixFQUFVLFNBQVYsRUFBcUIsV0FBckIsQ0FBckIsRUFBd0QsS0FBeEQsQ0FGTjtBQUdMRSxnQkFBWVQsTUFBTUssUUFBTixDQUFlQyxLQUFmLENBQXFCLENBQUNKLEtBQUtLLEVBQU4sRUFBVSxTQUFWLEVBQXFCLFlBQXJCLENBQXJCLEVBQXlELEtBQXpELENBSFA7QUFJTEcsaUJBQ0VWLE1BQU1LLFFBQU4sQ0FBZUMsS0FBZixDQUFxQixDQUFDSixLQUFLSyxFQUFOLEVBQVUsUUFBVixFQUFvQixlQUFwQixFQUFxQyxhQUFyQyxDQUFyQixFQUEwRSxLQUExRSxDQUxHO0FBTUxJLCtCQUNFWCxNQUFNSyxRQUFOLENBQWVDLEtBQWYsQ0FBcUIsQ0FBQ0osS0FBS0ssRUFBTixFQUFVLFNBQVYsRUFBcUIscUJBQXJCLEVBQTRDLE1BQTVDLENBQXJCLEVBQTBFLEtBQTFFLENBUEc7QUFRTEssZ0JBQVlaLE1BQU1LLFFBQU4sQ0FBZUMsS0FBZixDQUFxQixDQUFDSixLQUFLSyxFQUFOLEVBQVUsUUFBVixFQUFvQixhQUFwQixFQUFtQyxZQUFuQyxDQUFyQixFQUF1RSxJQUF2RSxDQVJQO0FBU0xNLGVBQVdiLE1BQU1LLFFBQU4sQ0FBZUMsS0FBZixDQUFxQixDQUFDSixLQUFLSyxFQUFOLEVBQVUsUUFBVixFQUFvQixhQUFwQixFQUFtQyxXQUFuQyxDQUFyQixFQUFzRSxJQUF0RSxDQVROO0FBVUxPLG9CQUFnQmQsTUFBTUssUUFBTixDQUFlQyxLQUFmLENBQXFCLENBQUNKLEtBQUtLLEVBQU4sRUFBVSxRQUFWLEVBQW9CLGdCQUFwQixDQUFyQixFQUE0RHhDLE1BQTVELENBVlg7QUFXTGdELGtCQUFjZixNQUFNSyxRQUFOLENBQWVDLEtBQWYsQ0FBcUIsQ0FBQ0osS0FBS0ssRUFBTixFQUFVLFFBQVYsRUFBb0IsY0FBcEIsQ0FBckIsRUFBMER6QyxLQUExRCxDQVhUO0FBWUxrRCxrQkFBY2hCLE1BQU1LLFFBQU4sQ0FBZUMsS0FBZixDQUFxQixDQUFDSixLQUFLSyxFQUFOLEVBQVUsY0FBVixDQUFyQixFQUFnRHpDLEtBQWhELENBWlQ7QUFhTG1ELG1CQUFlakIsTUFBTUssUUFBTixDQUFlQyxLQUFmLENBQXFCLENBQUNKLEtBQUtLLEVBQU4sRUFBVSxlQUFWLENBQXJCLEVBQWlEeEMsTUFBakQsQ0FiVjtBQWNMbUQsVUFBTWxCLE1BQU1LLFFBQU4sQ0FBZUMsS0FBZixDQUFxQixDQUFDSixLQUFLSyxFQUFOLEVBQVUsTUFBVixDQUFyQixFQUF3Q3hDLE1BQXhDLENBZEQ7QUFlTG9ELGNBQVVuQixNQUFNSyxRQUFOLENBQWVDLEtBQWYsQ0FBcUIsQ0FBQ0osS0FBS0ssRUFBTixFQUFVLFVBQVYsQ0FBckIsRUFBNEN6QyxLQUE1QyxDQWZMO0FBZ0JMc0QsZ0JBQVlwQixNQUFNSyxRQUFOLENBQWVDLEtBQWYsQ0FBcUIsQ0FBQ0osS0FBS0ssRUFBTixFQUFVLFlBQVYsQ0FBckIsRUFBOEN4QyxNQUE5QyxDQWhCUDtBQWlCTHNELGdCQUFZckIsTUFBTUssUUFBTixDQUFlQyxLQUFmLENBQXFCLENBQUNKLEtBQUtLLEVBQU4sRUFBVSxRQUFWLEVBQW9CLGVBQXBCLEVBQXFDLFlBQXJDLENBQXJCLEVBQXlFekMsS0FBekUsQ0FqQlA7QUFrQkx3RCxrQkFBY3RCLE1BQU1LLFFBQU4sQ0FBZUMsS0FBZixDQUFxQixDQUFDSixLQUFLSyxFQUFOLEVBQVUsY0FBVixDQUFyQixFQUFnRHpDLEtBQWhELENBbEJUO0FBbUJMeUQsd0JBQW9CdkIsTUFBTUssUUFBTixDQUFlQyxLQUFmLENBQXFCLENBQUNKLEtBQUtLLEVBQU4sRUFBVSxvQkFBVixDQUFyQixFQUFzRHpDLEtBQXRELENBbkJmO0FBb0JMMEQsaUJBQWF4QixNQUFNSyxRQUFOLENBQWVDLEtBQWYsQ0FBcUIsQ0FBQ0osS0FBS0ssRUFBTixFQUFVLFNBQVYsQ0FBckIsRUFBMkN4QyxNQUEzQyxFQUFtRDBELElBcEIzRDtBQXFCTEMsY0FBVTVCLE1BQU02QixXQUFOLENBQWtCekIsSUFBbEIsRUFBd0JGLE1BQU00QixJQUE5QixDQXJCTDtBQXNCTEMsWUFBUS9CLE1BQU1nQyxTQUFOLENBQWdCNUIsSUFBaEIsRUFBc0JGLE1BQU00QixJQUE1QixDQXRCSDtBQXVCTEcsZ0JBQVlqQyxNQUFNa0MsYUFBTixDQUFvQjlCLElBQXBCLEVBQTBCRixNQUFNNEIsSUFBaEMsQ0F2QlA7QUF3QkxLLHVCQUFtQm5DLE1BQU1vQyxvQkFBTixDQUEyQmhDLElBQTNCLEVBQWlDRixNQUFNNEIsSUFBdkMsQ0F4QmQ7QUF5QkxPLHNCQUFrQnJDLE1BQU1zQyxtQkFBTixDQUEwQmxDLElBQTFCLEVBQWdDRixNQUFNNEIsSUFBdEMsQ0F6QmI7QUEwQkxTLGVBQVdyQyxNQUFNSyxRQUFOLENBQWVDLEtBQWYsQ0FBcUIsQ0FBQ0osS0FBS0ssRUFBTixFQUFVLFNBQVYsRUFBcUIsV0FBckIsQ0FBckIsRUFBd0R6QyxLQUF4RDtBQTFCTixHQUFQO0FBNEJELENBOUJEOztBQWdDQSxJQUFNd0UscUJBQXFCOUMsZUFBM0I7O0lBSXFCK0MsUSxXQURwQnZFLFFBQVErQixlQUFSLEVBQXlCdUMsa0JBQXpCLEMsRUFEQXJFLFU7OztBQU1DLG9CQUFZdUUsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQixnQ0FBTUEsS0FBTixDQURpQjs7QUFBQTs7QUFFakIsVUFBS3hDLEtBQUwsR0FBYTtBQUNYeUMsa0JBQVksQ0FERDtBQUVYQyxxQkFBZTtBQUZKLEtBQWI7QUFJQSxVQUFLQyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0EsVUFBS0MsaUJBQUwsR0FBeUIsS0FBekI7QUFDQSxVQUFLQyxlQUFMLEdBQXVCLEtBQXZCLENBUmlCLENBUWE7QUFDOUIsVUFBS0MsZ0JBQUwsR0FBd0IsS0FBeEIsQ0FUaUIsQ0FTYztBQVRkO0FBVWxCOztxQkFFREMsb0IsbUNBQXVCO0FBQ3JCQyxhQUFTQyxtQkFBVCxDQUE2QixPQUE3QixFQUFzQyxLQUFLQyxlQUEzQztBQUNBLFNBQUtWLEtBQUwsQ0FBV1csVUFBWCxDQUFzQixLQUFLWCxLQUFMLENBQVdyQyxJQUFqQztBQUNELEc7O3FCQTJ4Q0RpRCxNLHFCQUFTO0FBQUE7O0FBQ1AsUUFBTUMsZ0JBQWdCM0U7QUFDcEIsK0JBQXlCLElBREw7QUFFcEIsd0JBQWtCLEtBQUs4RCxLQUFMLENBQVdjLFVBQVgsSUFBeUIsQ0FBQyxLQUFLZCxLQUFMLENBQVdlLGdCQUZuQztBQUdwQixpQkFBVyxLQUFLZixLQUFMLENBQVdwQyxNQUhGO0FBSXBCLG9CQUFjLEtBQUtvQyxLQUFMLENBQVdoQyxTQUpMO0FBS3BCLHFCQUFlLEtBQUtnQyxLQUFMLENBQVcvQjtBQUxOLG1CQU1uQixLQUFLK0IsS0FBTCxDQUFXZ0IsU0FOUSxJQU1JLENBQUMsQ0FBQyxLQUFLaEIsS0FBTCxDQUFXZ0IsU0FOakIsZUFBdEI7O0FBU0E7QUFDQSxTQUFLQyxVQUFMLENBQWdCLEtBQUtqQixLQUFMLENBQVdILFNBQTNCOztBQUVBLFFBQUlxQixZQUFZLElBQWhCO0FBQ0EsUUFBSUMsaUJBQWlCLElBQXJCO0FBQ0EsUUFBSUMsZ0JBQWdCLElBQXBCO0FBQ0EsUUFDRSxDQUFDLEtBQUtwQixLQUFMLENBQVdrQixTQUFYLElBQ0QsS0FBS2xCLEtBQUwsQ0FBV2MsVUFEVixJQUVELEtBQUtkLEtBQUwsQ0FBV3FCLFNBRlYsSUFHRCxLQUFLckIsS0FBTCxDQUFXc0IsUUFIWCxLQUlBLENBQUMsS0FBS3RCLEtBQUwsQ0FBV2UsZ0JBTGQsRUFNRTtBQUNBSSx1QkFDRTtBQUFDLGlCQUFEO0FBQUEsVUFBVyxVQUFTLE9BQXBCO0FBQ0U7QUFBQTtBQUFBLFlBQUssV0FBVSw2QkFBZjtBQUErQyxlQUFLbkIsS0FBTCxDQUFXa0I7QUFBMUQsU0FERjtBQUVLLGFBQUtsQixLQUFMLENBQVdxQixTQUFYLElBQXdCLEtBQUtyQixLQUFMLENBQVd1QixlQUFuQyxJQUNFLENBQUMsS0FBS3ZCLEtBQUwsQ0FBV3dCLHdCQURmLElBRUEsb0JBQUMsaUJBQUQsRUFBdUIsS0FBS3hCLEtBQTVCLENBSko7QUFNSSxhQUFLQSxLQUFMLENBQVdjLFVBQVgsSUFDQSxvQkFBQyxrQkFBRDtBQUNFLHdCQUFjLEtBQUtXLGtCQURyQjtBQUVFLDBCQUFnQixLQUFLQyxvQkFGdkI7QUFHRSxnQ0FBc0IsS0FBS0M7QUFIN0IsV0FJTSxLQUFLM0IsS0FKWCxFQVBKO0FBY0ksU0FBQyxLQUFLQSxLQUFMLENBQVc0QixpQkFBWCxJQUNBLEtBQUs1QixLQUFMLENBQVdzQixRQURYLElBRUEsS0FBS3RCLEtBQUwsQ0FBVzZCLGNBRlgsSUFHQyxLQUFLN0IsS0FBTCxDQUFXcUIsU0FBWCxJQUF3QixDQUFDLEtBQUtyQixLQUFMLENBQVd1QixlQUh0QyxLQUlDLG9CQUFDLGdCQUFELEVBQXNCLEtBQUt2QixLQUEzQjtBQWxCTCxPQURGO0FBdUJEO0FBQ0QsUUFBSSxLQUFLQSxLQUFMLENBQVdvQixhQUFYLElBQTRCLEtBQUtwQixLQUFMLENBQVc4QixVQUEzQyxFQUF1RDtBQUNyRFYsc0JBQ0U7QUFBQyxpQkFBRDtBQUFBLFVBQVcsVUFBUyxNQUFwQjtBQUNFO0FBQUE7QUFBQSxZQUFLLFdBQVUsd0JBQWY7QUFBMEMsZUFBS3BCLEtBQUwsQ0FBVzhCO0FBQXJELFNBREY7QUFFRTtBQUFBO0FBQUEsWUFBSyxXQUFVLDRCQUFmO0FBQThDLGVBQUs5QixLQUFMLENBQVdvQjtBQUF6RDtBQUZGLE9BREY7QUFNRDtBQUNELFFBQUlBLGlCQUFpQkQsY0FBckIsRUFBcUM7QUFDbkNELGtCQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsaUNBQWY7QUFDSUUscUJBREo7QUFFSUQ7QUFGSixPQURGO0FBTUQ7QUFDRCxRQUFJWSxZQUNELEtBQUsvQixLQUFMLENBQVcrQixTQUFYLElBQXdCLEtBQUsvQixLQUFMLENBQVcrQixTQUFYLEtBQXlCLENBQWxELEdBQ0UsS0FBSy9CLEtBQUwsQ0FBVytCLFNBRGIsR0FFRSxLQUFLL0IsS0FBTCxDQUFXdEIsSUFBWCxDQUFnQk8sSUFIcEI7QUFJQSxRQUFJLEtBQUtlLEtBQUwsQ0FBVy9CLFVBQWYsRUFBMkI4RCxhQUFhLEtBQUsvQixLQUFMLENBQVdwQixVQUFYLENBQXNCSyxJQUFuQztBQUMzQixRQUFJLENBQUMsS0FBS2UsS0FBTCxDQUFXMUIsY0FBWCxDQUEwQlcsSUFBL0IsRUFBcUM4QyxZQUFZLENBQVo7QUFDckMsV0FDRTtBQUFBO0FBQUE7QUFDRSw2QkFBbUIsS0FBSy9CLEtBQUwsQ0FBV3JDLElBQVgsQ0FBZ0JJLEVBRHJDO0FBRUUsbUJBQVc4QyxhQUZiO0FBR0UsZUFBTyxLQUFLYixLQUFMLENBQVdnQztBQUhwQjtBQUtJLFdBQUtoQyxLQUFMLENBQVdwQyxNQUFYLElBQXFCLG9CQUFDLE9BQUQsT0FMekI7QUFNSSxXQUFLSixLQUFMLENBQVd5RSxlQUFYLElBQThCLEtBQUtDLGlCQUFMLEVBTmxDO0FBT0loQixlQVBKO0FBUUU7QUFBQyxnQ0FBRDtBQUFBO0FBQ0UsY0FBSSxLQUFLbEIsS0FBTCxDQUFXckMsSUFBWCxDQUFnQkksRUFEdEI7QUFFRSxxQkFBV2dFLFNBRmI7QUFHRSx3QkFBYyxLQUFLL0IsS0FBTCxDQUFXOUIsV0FBWCxHQUNaLEtBQUs4QixLQUFMLENBQVdtQyxZQUFYLEdBQTBCLEtBQUtuQyxLQUFMLENBQVdvQyxlQUR6QixHQUVWLEtBQUtwQyxLQUFMLENBQVdtQyxZQUxqQjtBQU1FLHFCQUFXLEtBQUtuQyxLQUFMLENBQVdxQyxTQU54QjtBQU9FLHFDQUEyQixLQUFLQyx5QkFQbEM7QUFRRSw0QkFBa0IsS0FScEI7QUFTRSxzQkFBWSxLQUFLQyxjQVRuQjtBQVVFLDBCQUFnQixLQUFLdkMsS0FBTCxDQUFXd0MsY0FBWCxJQUE2QixLQUFLaEYsS0FBTCxDQUFXMEMsYUFWMUQ7QUFXRSxxQkFBVyxLQUFLRixLQUFMLENBQVd5QyxTQVh4QjtBQVlFLHVCQUFhLEtBQUtDLGNBQUwsRUFaZjtBQWFFLDRCQUFrQixLQUFLMUMsS0FBTCxDQUFXMkMsZ0JBYi9CO0FBY0UsMEJBQWdCLEtBQUszQyxLQUFMLENBQVc0QyxXQWQ3QjtBQWVFLDJCQUFpQixLQUFLNUMsS0FBTCxDQUFXNkMsZUFmOUI7QUFnQkUsMkJBQWlCLEtBQUs3QyxLQUFMLENBQVc4QyxlQWhCOUI7QUFpQkUseUJBQWUsS0FBSzlDLEtBQUwsQ0FBVytDLGFBakI1QjtBQWtCRSx1QkFBYSxLQUFLL0MsS0FBTCxDQUFXZ0QsV0FsQjFCO0FBbUJFLDhCQUFvQixLQUFLQyxlQW5CM0I7QUFvQkUsMkJBQWlCLEtBQUtqRCxLQUFMLENBQVdrRCxlQUFYLElBQThCLEtBQUtDLHFCQXBCdEQ7QUFxQkUsaUNBQXVCLEtBQUtuRCxLQUFMLENBQVdvRCxxQkFyQnBDO0FBc0JFLDRCQUFrQixLQUFLQztBQXRCekI7QUF3QkksYUFBS0MsYUFBTDtBQXhCSixPQVJGO0FBa0NJLFdBQUt0RCxLQUFMLENBQVc3Qix5QkFBWCxJQUNBLG9CQUFDLG1CQUFEO0FBQ0UsY0FBTSxLQUFLNkIsS0FBTCxDQUFXckMsSUFEbkI7QUFFRSxpQkFBUyxLQUFLcUMsS0FBTCxDQUFXdUQsT0FGdEI7QUFHRSx3QkFBZ0IsS0FBS3ZELEtBQUwsQ0FBVzFCLGNBSDdCO0FBSUUsa0NBQTBCLEtBQUswQixLQUFMLENBQVd3RCx3QkFKdkM7QUFLRSw0QkFBb0IsS0FBS3hELEtBQUwsQ0FBV3lEO0FBTGpDLFFBbkNKO0FBMkNJLFdBQUt6RCxLQUFMLENBQVcwRDtBQTNDZixLQURGO0FBK0NELEc7OztFQWw2Q21DckksTUFBTXNJLGEsV0FFbkN2RyxZLEdBQWVBLFk7OztPQW1CdEJzRCxlLEdBQWtCLFlBQU07QUFDdEIsUUFBSSxPQUFLVixLQUFMLENBQVc0RCxnQkFBZixFQUFpQztBQUMvQixhQUFLQyxRQUFMLENBQWM7QUFDWjVCLHlCQUFpQjtBQURMLE9BQWQ7QUFHRDtBQUNEekIsYUFBU0MsbUJBQVQsQ0FBNkIsT0FBN0IsRUFBc0MsT0FBS0MsZUFBM0M7QUFDRCxHOztPQUVENEIseUIsR0FBNEIsVUFBQ3dCLGNBQUQsRUFBaUJDLFNBQWpCLEVBQStCO0FBQ3pELFdBQUsvRCxLQUFMLENBQVdnRSxZQUFYLENBQXdCLE9BQUtoRSxLQUFMLENBQVdyQyxJQUFuQyxFQUF5Q29HLFNBQXpDLEVBQW9ERCxjQUFwRDtBQUNELEc7O09BRURHLG1CLEdBQXNCLFVBQUNDLENBQUQsRUFBTztBQUMzQixRQUFJQSxFQUFFQyxPQUFGLEtBQWM5RyxVQUFVK0csS0FBNUIsRUFBbUM7QUFDakMsYUFBS3BFLEtBQUwsQ0FBV3FFLFVBQVgsQ0FBc0IsT0FBS3JFLEtBQUwsQ0FBV3JDLElBQWpDLEVBQXVDTCxNQUFNZ0gsc0JBQU4sQ0FBNkIsT0FBS3RFLEtBQUwsQ0FBV3VELE9BQXhDLENBQXZDO0FBQ0EsYUFBS25ELGlCQUFMLEdBQXlCLElBQXpCO0FBQ0Q7QUFDRixHOztPQUVEbUUsaUIsR0FBb0IsVUFBQ0MsR0FBRCxFQUFNQyxRQUFOO0FBQUEsV0FBbUIsVUFBQ1AsQ0FBRCxFQUFPO0FBQzVDLFVBQUksT0FBS2xFLEtBQUwsQ0FBVzBFLHFCQUFmLEVBQXNDO0FBQUEsWUFDNUJuQixPQUQ0QixHQUNoQixPQUFLdkQsS0FEVyxDQUM1QnVELE9BRDRCOztBQUVwQyxZQUFNb0IsV0FBVyxPQUFLM0UsS0FBTCxDQUFXdEIsSUFBWCxDQUFnQk8sSUFBakM7QUFDQSxZQUFNOEUsWUFBWXpHLE1BQU1zSCxZQUFOLENBQW1CSixHQUFuQixDQUFsQjtBQUNBLGdCQUFRTixFQUFFQyxPQUFWO0FBQ0UsZUFBSzlHLFVBQVV3SCxJQUFmO0FBQXFCO0FBQ25CLGtCQUFJTCxJQUFJTSxTQUFKLEtBQWtCLFFBQXRCLEVBQWdDO0FBQzlCLG9CQUFNQyxjQUFjLE9BQUs1RSxRQUFMLENBQWlCLE9BQUtILEtBQUwsQ0FBV3JDLElBQVgsQ0FBZ0JJLEVBQWpDLFNBQXVDZ0csU0FBdkMsVUFBb0RVLFdBQVcsQ0FBL0QsRUFBcEI7QUFDQSx1QkFBS08sYUFBTCxDQUFtQkQsV0FBbkIsRUFBZ0NOLFdBQVcsQ0FBM0MsRUFBOEMsQ0FBQyxDQUEvQztBQUNEO0FBQ0Q7QUFDRDtBQUNELGVBQUtwSCxVQUFVNEgsRUFBZjtBQUFtQjtBQUNqQixrQkFBSVQsSUFBSU0sU0FBSixLQUFrQixRQUF0QixFQUFnQztBQUM5QixvQkFBTUMsZUFBYyxPQUFLNUUsUUFBTCxDQUFpQixPQUFLSCxLQUFMLENBQVdyQyxJQUFYLENBQWdCSSxFQUFqQyxTQUF1Q2dHLFNBQXZDLFVBQW9EVSxXQUFXLENBQS9ELEVBQXBCO0FBQ0EsdUJBQUtPLGFBQUwsQ0FBbUJELFlBQW5CLEVBQWdDTixXQUFXLENBQTNDLEVBQThDLENBQUMsQ0FBL0M7QUFDRDtBQUNEO0FBQ0Q7QUFDRCxlQUFLcEgsVUFBVTZILEdBQWY7QUFDQSxlQUFLN0gsVUFBVThILEtBQWY7QUFDQSxlQUFLOUgsVUFBVStILElBQWY7QUFBcUI7QUFDbkJsQixnQkFBRW1CLGNBQUY7QUFDQSxrQkFBSUMsWUFBWS9CLFFBQVFnQyxTQUFSLENBQWtCO0FBQUEsdUJBQUtDLEVBQUVDLFlBQUYsQ0FBZUMsSUFBZixDQUFvQixHQUFwQixNQUE2QjNCLFNBQWxDO0FBQUEsZUFBbEIsQ0FBaEI7QUFDQSxrQkFBSXVCLGNBQWMsQ0FBQyxDQUFuQixFQUFzQjtBQUNwQixvQkFBSUssV0FBVyxJQUFmO0FBQ0Esb0JBQUlaLGdCQUFjLElBQWxCO0FBQ0Esb0JBQUlhLFNBQVNuQixRQUFiO0FBQ0EsdUJBQU9rQixRQUFQLEVBQWlCO0FBQ2Ysc0JBQUl6QixFQUFFQyxPQUFGLEtBQWM5RyxVQUFVK0gsSUFBeEIsSUFBaUNsQixFQUFFQyxPQUFGLEtBQWM5RyxVQUFVNkgsR0FBeEIsSUFBK0JoQixFQUFFMkIsUUFBdEUsRUFBaUY7QUFDL0Usd0JBQUlQLFlBQVksQ0FBWixJQUFpQixDQUFyQixFQUF3QjtBQUN0QkEsbUNBQWEsQ0FBYjtBQUNELHFCQUZELE1BRU8sSUFBSU0sU0FBUyxDQUFULElBQWMsQ0FBbEIsRUFBcUI7QUFDMUJOLGtDQUFZL0IsUUFBUXVDLE1BQVIsR0FBaUIsQ0FBN0I7QUFDQUYsZ0NBQVUsQ0FBVjtBQUNELHFCQUhNLE1BR0E7QUFDTDtBQUNEO0FBQ0YsbUJBVEQsTUFTTztBQUNMLHdCQUFJTixZQUFZLENBQVosR0FBZ0IvQixRQUFRdUMsTUFBNUIsRUFBb0M7QUFDbENSLG1DQUFhLENBQWI7QUFDRCxxQkFGRCxNQUVPLElBQUlNLFNBQVMsQ0FBVCxHQUFhakIsUUFBakIsRUFBMkI7QUFDaENXLGtDQUFZLENBQVo7QUFDQU0sZ0NBQVUsQ0FBVjtBQUNELHFCQUhNLE1BR0E7QUFDTDtBQUNEO0FBQ0Y7QUFDRCxzQkFBTUcsZ0JBQWdCekksTUFBTXNILFlBQU4sQ0FBbUJyQixRQUFRK0IsU0FBUixDQUFuQixDQUF0QjtBQUNBUCxrQ0FBYyxPQUFLNUUsUUFBTCxDQUFpQixPQUFLSCxLQUFMLENBQVdyQyxJQUFYLENBQWdCSSxFQUFqQyxTQUF1Q2dJLGFBQXZDLFNBQXdESCxNQUF4RCxDQUFkO0FBQ0FELDZCQUFXWixnQkFBY0EsY0FBWVksUUFBMUIsR0FBcUMsS0FBaEQ7QUFDRDtBQUNELG9CQUFJLENBQUNBLFFBQUQsSUFBYVosYUFBakIsRUFBOEI7QUFDNUIseUJBQUtDLGFBQUwsQ0FBbUJELGFBQW5CLEVBQWdDYSxNQUFoQyxFQUF3Q04sU0FBeEM7QUFDRDtBQUNGO0FBQ0Q7QUFDRDtBQUNEO0FBQ0U7QUF2REo7QUF5REQ7QUFDRixLQS9EbUI7QUFBQSxHOztPQWlFcEJVLHVCLEdBQTBCLFVBQUN4QixHQUFELEVBQU15QixXQUFOO0FBQUEsV0FBc0IsVUFBQ0MsV0FBRCxFQUFpQjtBQUMvRCxVQUFJQyxpQkFBSjtBQUNBO0FBQ0EsVUFBSUQsV0FBSixFQUFpQjtBQUNmLFlBQUlBLFlBQVlFLE1BQVosS0FBdUJDLFNBQTNCLEVBQXNDRixXQUFXRCxZQUFZRSxNQUFaLENBQW1CRSxLQUE5QixDQUF0QyxLQUNLLElBQUlKLFlBQVlJLEtBQVosS0FBc0JELFNBQTFCLEVBQXFDRixXQUFXRCxZQUFZSSxLQUF2QixDQUFyQyxLQUNBSCxXQUFXRCxXQUFYO0FBQ047QUFDRCxVQUFNSSxRQUFRTCxZQUFZRSxRQUFaLENBQWQ7QUFDQSxhQUFLbkcsS0FBTCxDQUFXdUcscUJBQVgsQ0FDRSxPQUFLdkcsS0FBTCxDQUFXckMsSUFEYixFQUVFLE9BQUtxQyxLQUFMLENBQVd1RCxPQUZiLEVBR0VpQixHQUhGLEVBSUU4QixLQUpGO0FBTUQsS0FmeUI7QUFBQSxHOztPQWlCMUJFLHVCLEdBQTBCLFVBQUMvQixRQUFELEVBQVdELEdBQVgsRUFBZ0J5QixXQUFoQjtBQUFBLFdBQWdDLFVBQUNDLFdBQUQsRUFBaUI7QUFDekUsVUFBSUMsaUJBQUo7QUFDQTtBQUNBLFVBQUlELFdBQUosRUFBaUI7QUFDZixZQUFJQSxZQUFZRSxNQUFaLEtBQXVCQyxTQUEzQixFQUFzQ0YsV0FBV0QsWUFBWUUsTUFBWixDQUFtQkUsS0FBOUIsQ0FBdEMsS0FDSyxJQUFJSixZQUFZSSxLQUFaLEtBQXNCRCxTQUExQixFQUFxQ0YsV0FBV0QsWUFBWUksS0FBdkIsQ0FBckMsS0FDQUgsV0FBV0QsV0FBWDtBQUNOO0FBQ0QsVUFBTUksUUFBUUwsWUFBWUUsUUFBWixDQUFkO0FBQ0EsYUFBS25HLEtBQUwsQ0FBV3lHLHFCQUFYLENBQWlDLE9BQUt6RyxLQUFMLENBQVdyQyxJQUE1QyxFQUFrRDhHLFFBQWxELEVBQTRERCxJQUFJaUIsWUFBaEUsRUFBOEVhLEtBQTlFO0FBQ0EsVUFBSTlCLElBQUlrQyxtQkFBUixFQUE2QjtBQUMzQmxDLFlBQUlrQyxtQkFBSixDQUF3QkosS0FBeEIsRUFBK0I5QixJQUFJaUIsWUFBbkMsRUFBaURoQixRQUFqRDtBQUNEO0FBQ0QsVUFBSUQsSUFBSW1DLHVCQUFKLElBQStCTCxVQUFVOUIsSUFBSW1DLHVCQUFKLENBQTRCQyxVQUF6RSxFQUFxRjtBQUNuRjtBQUNBLGVBQUtKLHVCQUFMLENBQ0UvQixRQURGLEVBRUUsRUFBRWdCLGNBQWNqQixJQUFJbUMsdUJBQUosQ0FBNEJFLGVBQTVDLEVBRkYsRUFHRTtBQUFBLGlCQUFLQyxDQUFMO0FBQUEsU0FIRixFQUlFdEMsSUFBSW1DLHVCQUFKLENBQTRCSSxRQUo5QjtBQUtEO0FBQ0QsVUFBSXZDLElBQUl3QyxVQUFSLEVBQW9CO0FBQ2xCLGVBQUtoSCxLQUFMLENBQVdpSCx1QkFBWCxDQUNFLE9BQUtqSCxLQUFMLENBQVdyQyxJQURiLEVBRUU4RyxRQUZGLEVBR0VELElBQUlpQixZQUhOLEVBSUVhLEtBSkYsRUFLRTlCLElBQUl3QyxVQUxOO0FBT0Q7QUFDRixLQTlCeUI7QUFBQSxHOztPQWdDMUJFLHFCLEdBQXdCLFVBQUN6QyxRQUFELEVBQVdELEdBQVgsRUFBZ0J5QixXQUFoQjtBQUFBLFdBQWdDLFVBQUNDLFdBQUQsRUFBaUI7QUFDdkUsVUFBTWlCLFNBQVMsT0FBS0MsbUJBQUwsQ0FBeUIzQyxRQUF6QixDQUFmO0FBQ0EsVUFBSTBCLGlCQUFKO0FBQ0E7QUFDQSxVQUFJRCxXQUFKLEVBQWlCO0FBQ2YsWUFBSUEsWUFBWUUsTUFBWixLQUF1QkMsU0FBM0IsRUFBc0NGLFdBQVdELFlBQVlFLE1BQVosQ0FBbUJFLEtBQTlCLENBQXRDLEtBQ0ssSUFBSUosWUFBWUksS0FBWixLQUFzQkQsU0FBMUIsRUFBcUNGLFdBQVdELFlBQVlJLEtBQXZCLENBQXJDLEtBQ0FILFdBQVdELFdBQVg7QUFDTjtBQUNELFVBQU1JLFFBQVFMLFlBQVlFLFFBQVosQ0FBZDtBQUNBLGFBQUtuRyxLQUFMLENBQVdxSCxtQkFBWCxDQUErQixPQUFLckgsS0FBTCxDQUFXckMsSUFBMUMsRUFBZ0R3SixNQUFoRCxFQUF3RDNDLElBQUlpQixZQUE1RCxFQUEwRWEsS0FBMUU7QUFDQSxVQUFJOUIsSUFBSThDLGlCQUFSLEVBQTJCO0FBQ3pCOUMsWUFBSThDLGlCQUFKLENBQXNCaEIsS0FBdEIsRUFBNkI5QixJQUFJaUIsWUFBakMsRUFBK0NoQixRQUEvQyxFQUF5RDBDLE1BQXpEO0FBQ0Q7QUFDRCxVQUFJM0MsSUFBSW1DLHVCQUFKLElBQStCTCxVQUFVOUIsSUFBSW1DLHVCQUFKLENBQTRCQyxVQUF6RSxFQUFxRjtBQUNuRjtBQUNBLGVBQUtNLHFCQUFMLENBQ0V6QyxRQURGLEVBRUUsRUFBRWdCLGNBQWNqQixJQUFJbUMsdUJBQUosQ0FBNEJFLGVBQTVDLEVBRkYsRUFHRTtBQUFBLGlCQUFLQyxDQUFMO0FBQUEsU0FIRixFQUlFdEMsSUFBSW1DLHVCQUFKLENBQTRCSSxRQUo5QjtBQUtEO0FBQ0QsVUFBSXZDLElBQUl3QyxVQUFSLEVBQW9CO0FBQ2xCLGVBQUtoSCxLQUFMLENBQVd1SCxxQkFBWCxDQUNFLE9BQUt2SCxLQUFMLENBQVdyQyxJQURiLEVBRUV3SixNQUZGLEVBR0UzQyxJQUFJaUIsWUFITixFQUlFYSxLQUpGLEVBS0U5QixJQUFJd0MsVUFMTjtBQU9EO0FBQ0YsS0EvQnVCO0FBQUEsRzs7T0FpQ3hCUSxnQixHQUFtQixVQUFDL0MsUUFBRCxFQUFXRCxHQUFYLEVBQWdCeUIsV0FBaEI7QUFBQSxXQUFnQyxVQUFDL0IsQ0FBRCxFQUFPO0FBQ3hELFVBQUlNLElBQUlpRCxZQUFSLEVBQXNCO0FBQ3BCLFlBQUluQixRQUFTcEMsS0FBS0EsRUFBRWtDLE1BQVAsSUFBaUJsQyxFQUFFa0MsTUFBRixDQUFTRSxLQUFULEtBQW1CRCxTQUFyQyxHQUNWbkMsRUFBRWtDLE1BQUYsQ0FBU0UsS0FEQyxHQUVWLE9BQUtvQixnQkFBTCxDQUFzQmpELFFBQXRCLEVBQWdDRCxHQUFoQyxDQUZGO0FBR0EsWUFBSXlCLGdCQUFnQkksU0FBcEIsRUFBK0I7QUFDN0JDLGtCQUFRTCxZQUFZSyxLQUFaLENBQVI7QUFDRDtBQUNEOUIsWUFBSWlELFlBQUosQ0FBaUJuQixLQUFqQixFQUF3QjdCLFFBQXhCO0FBQ0Q7QUFDRixLQVZrQjtBQUFBLEc7O09BWW5Ca0QsYyxHQUFpQixVQUFDbEQsUUFBRCxFQUFXRCxHQUFYLEVBQWdCeUIsV0FBaEI7QUFBQSxXQUFnQyxVQUFDL0IsQ0FBRCxFQUFPO0FBQ3RELFVBQUlNLElBQUlvRCxVQUFSLEVBQW9CO0FBQ2xCLFlBQUl0QixRQUFTcEMsS0FBS0EsRUFBRWtDLE1BQVAsSUFBaUJsQyxFQUFFa0MsTUFBRixDQUFTRSxLQUFULEtBQW1CRCxTQUFyQyxHQUNWbkMsRUFBRWtDLE1BQUYsQ0FBU0UsS0FEQyxHQUVWLE9BQUtvQixnQkFBTCxDQUFzQmpELFFBQXRCLEVBQWdDRCxHQUFoQyxDQUZGO0FBR0EsWUFBSXlCLGdCQUFnQkksU0FBcEIsRUFBK0I7QUFDN0JDLGtCQUFRTCxZQUFZSyxLQUFaLENBQVI7QUFDRDtBQUNELFlBQU1hLFNBQVMsT0FBS0MsbUJBQUwsQ0FBeUIzQyxRQUF6QixDQUFmO0FBQ0FELFlBQUlvRCxVQUFKLENBQWV0QixLQUFmLEVBQXNCN0IsUUFBdEIsRUFBZ0MwQyxNQUFoQztBQUNEO0FBQ0YsS0FYZ0I7QUFBQSxHOztPQWFqQlUsVyxHQUFjLFVBQUNDLFFBQUQsRUFBV0MsU0FBWCxFQUFzQnRELFFBQXRCLEVBQWdDVixTQUFoQztBQUFBLFdBQThDLFVBQUNHLENBQUQsRUFBTztBQUNqRSxVQUFJNkQsY0FBYyxRQUFsQixFQUE0QjtBQUMxQjdELFVBQUVrQyxNQUFGLENBQVM0QixNQUFUO0FBQ0Q7QUFDRCxVQUFJRixhQUFhLE1BQWIsSUFBdUIsT0FBSzlILEtBQUwsQ0FBV2lJLFVBQXRDLEVBQWtEO0FBQ2hELGVBQUtqSSxLQUFMLENBQVdrSSxtQkFBWCxDQUErQixPQUFLbEksS0FBTCxDQUFXckMsSUFBMUMsRUFBZ0RyQyxJQUFJLEVBQUVtSixrQkFBRixFQUFZVixvQkFBWixFQUFKLENBQWhEO0FBQ0Q7QUFDRixLQVBhO0FBQUEsRzs7T0FTZHFELG1CLEdBQXNCO0FBQUEsV0FDcEIsT0FBS3BILEtBQUwsQ0FBV3RCLElBQVgsQ0FBZ0JaLEtBQWhCLEVBQXVCMkcsUUFBdkIsU0FBb0MsT0FBS3pFLEtBQUwsQ0FBV3JDLElBQVgsQ0FBZ0J3SyxTQUFwRCxFQURvQjtBQUFBLEc7O09BR3RCQyxvQixHQUF1QixVQUFDckssRUFBRCxFQUFRO0FBQzdCLFFBQUksQ0FBQ0EsRUFBTCxFQUFTLE9BQU9zSSxTQUFQO0FBQ1QsUUFBTWdDLFFBQVEsT0FBS3JJLEtBQUwsQ0FBV3RCLElBQVgsQ0FBZ0I2RyxTQUFoQixDQUEwQjtBQUFBLGFBQUt1QixFQUFFaEosS0FBRixDQUFRLE9BQUtrQyxLQUFMLENBQVdyQyxJQUFYLENBQWdCd0ssU0FBeEIsTUFBdUNwSyxFQUE1QztBQUFBLEtBQTFCLENBQWQ7QUFDQSxXQUFPc0ssVUFBVSxDQUFDLENBQVgsR0FBZWhDLFNBQWYsR0FBMkJnQyxLQUFsQztBQUNELEc7O09BRURYLGdCLEdBQW1CLFVBQUNqRCxRQUFELEVBQVdELEdBQVgsRUFBbUI7QUFDcEM7QUFDQSxRQUFNekcsS0FBSyxPQUFLcUosbUJBQUwsQ0FBeUIzQyxRQUF6QixDQUFYO0FBQ0EsUUFBTTZELFlBQVksT0FBS3RJLEtBQUwsQ0FBV3JCLFFBQVgsQ0FBb0JiLEtBQXBCLEVBQTJCQyxFQUEzQixTQUFrQ3lHLElBQUlpQixZQUF0QyxHQUFxRFksU0FBckQsQ0FBbEI7QUFDQSxRQUFJa0Msc0JBQUo7QUFDQSxRQUFJRCxjQUFjakMsU0FBbEIsRUFBNkI7QUFDM0JrQyxzQkFBZ0IsT0FBS3ZJLEtBQUwsQ0FBV3RCLElBQVgsQ0FBZ0JaLEtBQWhCLEVBQXVCMkcsUUFBdkIsU0FBb0NELElBQUlpQixZQUF4QyxHQUF1RCxFQUF2RCxDQUFoQjtBQUNELEtBRkQsTUFFTyxJQUFJNkMsY0FBYyxJQUFsQixFQUF3QjtBQUM3QixhQUFPLEVBQVA7QUFDRCxLQUZNLE1BRUE7QUFDTCxhQUFPQSxTQUFQO0FBQ0Q7QUFDRCxRQUFJQyxrQkFBa0IsSUFBbEIsSUFBMEJBLGtCQUFrQmxDLFNBQTVDLElBQXlEa0Msa0JBQWtCLEVBQS9FLEVBQW1GO0FBQ2pGLGFBQU8sRUFBUDtBQUNEO0FBQ0Q7QUFDQSxRQUNFL0QsSUFBSWdFLGFBQUosS0FBc0IsT0FBdEIsSUFDQUMsT0FBT0YsYUFBUCxFQUFzQnpDLE1BQXRCLEdBQStCLENBRmpDLEVBR0U7QUFDQSxhQUFPMkMsT0FBT0YsYUFBUCxFQUFzQkcsT0FBdEIsQ0FBOEIsR0FBOUIsRUFBbUMsT0FBSzFJLEtBQUwsQ0FBV0wsZ0JBQTlDLENBQVA7QUFDRDtBQUNELFdBQU80SSxhQUFQO0FBQ0QsRzs7T0FFREksa0IsR0FBcUIsVUFBQ2xFLFFBQUQsRUFBV0QsR0FBWCxFQUFtQjtBQUN0QyxRQUFNb0UsTUFBTSxPQUFLNUksS0FBTCxDQUFXcEIsVUFBWCxDQUFzQmQsS0FBdEIsRUFBNkIyRyxRQUE3QixTQUEwQ0QsSUFBSWlCLFlBQTlDLEdBQTZELEVBQTdELENBQVo7QUFDQSxRQUFJbUQsUUFBUSxJQUFaLEVBQWtCO0FBQ2hCLGFBQU8sRUFBUDtBQUNEO0FBQ0QsV0FBT0EsR0FBUDtBQUNELEc7O09BRURDLGtCLEdBQXFCLFVBQUNyRSxHQUFELEVBQVM7QUFDNUIsUUFBTW9FLE1BQU0sT0FBSzVJLEtBQUwsQ0FBV25CLFVBQVgsQ0FBc0JpSyxHQUF0QixDQUEwQnhMLE1BQU1zSCxZQUFOLENBQW1CSixHQUFuQixDQUExQixFQUFtRCxFQUFuRCxDQUFaO0FBQ0EsUUFBSW9FLFFBQVEsSUFBWixFQUFrQjtBQUNoQixhQUFPLEVBQVA7QUFDRDtBQUNELFdBQU9BLEdBQVA7QUFDRCxHOztPQUVERyx5QixHQUE0QixVQUFDdEUsUUFBRCxFQUFXRCxHQUFYLEVBQWdCd0UsSUFBaEIsRUFBeUI7QUFDbkQsUUFBSUMsb0JBQW9CLENBQUMsQ0FBQ3pFLElBQUkwRSxjQUE5QjtBQUNBO0FBQ0EsUUFBSSxDQUFDRCxpQkFBRCxJQUFzQnpFLElBQUkyRSwwQkFBOUIsRUFBMEQ7QUFDeEQsVUFBSUgsU0FBUyxRQUFiLEVBQXVCO0FBQ3JCQyw0QkFBb0IsT0FBS04sa0JBQUwsQ0FDbEJsRSxRQURrQixFQUVsQixFQUFFZ0IsY0FBY2pCLElBQUkyRSwwQkFBSixDQUErQkMsaUJBQS9DLEVBRmtCLE1BR2Q1RSxJQUFJMkUsMEJBQUosQ0FBK0J2QyxVQUhyQztBQUlELE9BTEQsTUFLTztBQUNMcUMsNEJBQW9CLE9BQUt2QixnQkFBTCxDQUNsQmpELFFBRGtCLEVBRWxCLEVBQUVnQixjQUFjakIsSUFBSTJFLDBCQUFKLENBQStCQyxpQkFBL0MsRUFGa0IsTUFHZDVFLElBQUkyRSwwQkFBSixDQUErQnZDLFVBSHJDO0FBSUQ7QUFDRjtBQUNELFdBQU9xQyxpQkFBUDtBQUNELEc7O09BRURoRyxlLEdBQWtCLFVBQUN3QixRQUFELEVBQWM7QUFBQSxpQkFRMUIsT0FBS3pFLEtBUnFCO0FBQUEsUUFFNUJyQyxJQUY0QixVQUU1QkEsSUFGNEI7QUFBQSxRQUc1Qk0sVUFINEIsVUFHNUJBLFVBSDRCO0FBQUEsUUFJNUJELFNBSjRCLFVBSTVCQSxTQUo0QjtBQUFBLFFBSzVCWSxVQUw0QixVQUs1QkEsVUFMNEI7QUFBQSxRQU01QkgsYUFONEIsVUFNNUJBLGFBTjRCO0FBQUEsUUFPNUJDLElBUDRCLFVBTzVCQSxJQVA0Qjs7QUFTOUIsUUFBTTJLLGdCQUFnQixDQUFDLGlCQUFELENBQXRCO0FBQ0EsUUFBSUMsZ0JBQWdCLENBQXBCLENBVjhCLENBVVA7QUFDdkIsUUFBSXJMLFVBQUosRUFBZ0JxTCxnQkFBZ0IxSyxXQUFXSyxJQUEzQjtBQUNoQixRQUFJaEIsVUFBSixFQUFnQjtBQUNkLFVBQUl3RyxZQUFhNkUsZ0JBQWdCLENBQWpDLEVBQXFDO0FBQ25DRCxzQkFBY0UsSUFBZCxDQUFtQixxQkFBbkI7QUFDRDtBQUNGLEtBSkQsTUFJTyxJQUFJdkwsU0FBSixFQUFlO0FBQ3BCcUwsb0JBQWNFLElBQWQsQ0FBbUIsc0JBQW5CO0FBQ0Q7O0FBR0Q7QUFDQSxRQUFLLENBQUN0TCxVQUFELElBQWUsQ0FBQ0QsU0FBakIsSUFDQ1MsaUJBQWlCZCxLQUFLd0ssU0FEM0IsRUFDdUM7QUFDckMsVUFDRTFKLGNBQWMrSyxPQUFkLENBQXNCOUssS0FBS1osS0FBTCxFQUFZMkcsV0FBVzZFLGFBQXZCLFNBQXlDM0wsS0FBS3dLLFNBQTlDLEVBQXRCLE1BQXFGLENBQUMsQ0FEeEYsRUFFRTtBQUNBa0Isc0JBQWNFLElBQWQsQ0FBbUIsYUFBbkI7QUFDRDtBQUNGOztBQUVELFFBQUksT0FBS3ZKLEtBQUwsQ0FBV3lKLGtCQUFmLEVBQW1DO0FBQ2pDLGFBQU9KLGNBQWMzRCxJQUFkLENBQW1CLEdBQW5CLElBQTBCLEdBQTFCLEdBQWdDLE9BQUsxRixLQUFMLENBQVd5SixrQkFBWCxDQUE4QmhGLFFBQTlCLENBQXZDO0FBQ0Q7QUFDRCxXQUFPNEUsY0FBYzNELElBQWQsQ0FBbUIsR0FBbkIsQ0FBUDtBQUNELEc7O09BRURnRSxlLEdBQWtCLFVBQUNqRixRQUFELEVBQVdELEdBQVgsRUFBZ0JzRCxRQUFoQixFQUE2QjtBQUM3QyxRQUFNNkIsYUFBYSxFQUFuQjtBQUNBLFFBQUksQ0FBQyxPQUFLM0osS0FBTCxDQUFXckMsSUFBWCxDQUFnQndLLFNBQWpCLElBQThCLENBQUMzRCxJQUFJaUIsWUFBdkMsRUFBcUQ7QUFDbkQsYUFBT2tFLFVBQVA7QUFDRDtBQUNELFFBQUlDLG9CQUFKO0FBQ0EsUUFBSUMscUJBQUo7QUFDQSxRQUFJQyx1QkFBSjtBQUNBLFFBQUloQyxhQUFhLFFBQWpCLEVBQTJCO0FBQ3pCOEIsb0JBQWMsT0FBSzVKLEtBQUwsQ0FBV2pCLGtCQUFYLENBQThCakIsS0FBOUIsRUFBcUMsTUFBckMsRUFBNkMyRyxRQUE3QyxTQUEwREQsSUFBSWlCLFlBQTlELEVBQWQ7QUFDQW9FLHFCQUFlLE9BQUs3SixLQUFMLENBQVdqQixrQkFBWCxDQUE4QmpCLEtBQTlCLEVBQXFDLE9BQXJDLEVBQThDMkcsUUFBOUMsU0FBMkRELElBQUlpQixZQUEvRCxFQUFmO0FBQ0FxRSx1QkFBaUIsT0FBSzlKLEtBQUwsQ0FBV2pCLGtCQUFYLENBQThCakIsS0FBOUIsRUFBcUMsU0FBckMsRUFBZ0QyRyxRQUFoRCxTQUE2REQsSUFBSWlCLFlBQWpFLEVBQWpCO0FBQ0QsS0FKRCxNQUlPO0FBQ0wsVUFBTTFILEtBQUssT0FBS3FKLG1CQUFMLENBQXlCM0MsUUFBekIsQ0FBWDtBQUNBbUYsb0JBQWMsT0FBSzVKLEtBQUwsQ0FBV2xCLFlBQVgsQ0FBd0JoQixLQUF4QixFQUErQixNQUEvQixFQUF1Q0MsRUFBdkMsU0FBOEN5RyxJQUFJaUIsWUFBbEQsRUFBZDtBQUNBb0UscUJBQWUsT0FBSzdKLEtBQUwsQ0FBV2xCLFlBQVgsQ0FBd0JoQixLQUF4QixFQUErQixPQUEvQixFQUF3Q0MsRUFBeEMsU0FBK0N5RyxJQUFJaUIsWUFBbkQsRUFBZjtBQUNBcUUsdUJBQWlCLE9BQUs5SixLQUFMLENBQVdsQixZQUFYLENBQXdCaEIsS0FBeEIsRUFBK0IsU0FBL0IsRUFBMENDLEVBQTFDLFNBQWlEeUcsSUFBSWlCLFlBQXJELEVBQWpCO0FBQ0Q7QUFDRCxRQUFJbUUsV0FBSixFQUFpQjtBQUNmRCxpQkFBV0MsV0FBWCxHQUF5QkEsV0FBekI7QUFDRDtBQUNELFFBQUlDLFlBQUosRUFBa0I7QUFDaEJGLGlCQUFXRSxZQUFYLEdBQTBCQSxZQUExQjtBQUNEO0FBQ0QsUUFBSUMsY0FBSixFQUFvQjtBQUNsQkgsaUJBQVdHLGNBQVgsR0FBNEJBLGNBQTVCO0FBQ0Q7QUFDRCxXQUFPSCxVQUFQO0FBQ0QsRzs7T0FFRGpILGMsR0FBaUIsWUFBTTtBQUNyQixRQUFJcUgsb0JBQUo7QUFDQSxRQUFJLE9BQUsvSixLQUFMLENBQVcvQixVQUFYLElBQXlCLENBQUMsT0FBS21DLGlCQUFuQyxFQUFzRCxPQUFPMkosV0FBUDtBQUN0RCxRQUFJLE9BQUszSixpQkFBVCxFQUE0QjtBQUMxQixVQUFNNEosZUFBZSxPQUFLaEssS0FBTCxDQUFXcEIsVUFBWCxDQUFzQkssSUFBdEIsR0FBNkIsQ0FBbEQ7QUFDQSxVQUFJK0ssZ0JBQWdCLENBQXBCLEVBQXVCO0FBQ3JCRCxzQkFBY0MsWUFBZDtBQUNEO0FBQ0YsS0FMRCxNQUtPO0FBQ0wsVUFBSSxPQUFLaEssS0FBTCxDQUFXaEMsU0FBZixFQUEwQjtBQUN4QitMLHNCQUFjLE9BQUt2TSxLQUFMLENBQVd5QyxVQUF6QjtBQUNELE9BRkQsTUFFTztBQUNMOEosc0JBQWMsT0FBSy9KLEtBQUwsQ0FBVytKLFdBQXpCLENBREssQ0FDaUM7QUFDdkM7QUFDRCxVQUFJQSxnQkFBZ0IxRCxTQUFoQixJQUE2QixPQUFLckcsS0FBTCxDQUFXdkIsYUFBWCxDQUF5QlEsSUFBekIsR0FBZ0MsQ0FBakUsRUFBb0U7QUFDbEU4SyxzQkFBYyxPQUFLM0Isb0JBQUwsQ0FBMEIsT0FBS3BJLEtBQUwsQ0FBV3ZCLGFBQVgsQ0FBeUJ3TCxLQUF6QixFQUExQixDQUFkO0FBQ0Q7QUFDRjtBQUNELFdBQU9GLFdBQVA7QUFDRCxHOztPQUVEOUksVSxHQUFhLFVBQUNpSixPQUFELEVBQWE7QUFDeEIsUUFBSSxPQUFLbEssS0FBTCxDQUFXaEMsU0FBWCxJQUF3QixPQUFLZ0MsS0FBTCxDQUFXL0IsVUFBdkMsRUFBbUQ7QUFDakQsVUFBSWlNLFdBQVdBLFFBQVFwQixHQUFSLENBQVksTUFBWixDQUFYLElBQWtDb0IsWUFBWSxPQUFLQyxXQUF2RCxFQUFvRTtBQUNsRSxlQUFLRCxRQUFRcEIsR0FBUixDQUFZLE1BQVosQ0FBTCxJQUE0QixJQUE1QjtBQUNBLGVBQUtzQixjQUFMLEdBQXNCRixRQUFRcEIsR0FBUixDQUFZLGdCQUFaLENBQXRCO0FBQ0EsZUFBS3FCLFdBQUwsR0FBbUJELE9BQW5CO0FBQ0Q7QUFDRjtBQUNGLEc7O09BRURHLGdCLEdBQW1CLFVBQUN2QyxRQUFELEVBQVdyRCxRQUFYLEVBQXFCVixTQUFyQjtBQUFBLFdBQW1DLFlBQU07QUFDMUQsVUFBSStELGFBQWEsTUFBYixJQUF1QixPQUFLOUgsS0FBTCxDQUFXaUksVUFBdEMsRUFBa0Q7QUFDaEQsZUFBS2pJLEtBQUwsQ0FBV2tJLG1CQUFYLENBQStCLE9BQUtsSSxLQUFMLENBQVdyQyxJQUExQyxFQUFnRHJDLElBQUksRUFBRW1KLGtCQUFGLEVBQVlWLG9CQUFaLEVBQUosQ0FBaEQ7QUFDRDtBQUNGLEtBSmtCO0FBQUEsRzs7T0FNbkJ1RyxtQixHQUFzQixVQUFDN0YsUUFBRCxFQUFXRCxHQUFYO0FBQUEsV0FBbUIsVUFBQytGLEdBQUQsRUFBUztBQUNoRDtBQUNBLFVBQ0UsT0FBS3ZLLEtBQUwsQ0FBV3BCLFVBQVgsQ0FBc0JLLElBQXRCLElBQ0EsT0FBS2UsS0FBTCxDQUFXcEIsVUFBWCxDQUFzQkssSUFBdEIsS0FBK0J3RixXQUFXLENBRDFDLElBRUEsT0FBS3JFLGlCQUZMLElBR0EsQ0FBQyxPQUFLMkkseUJBQUwsQ0FBK0J0RSxRQUEvQixFQUF5Q0QsR0FBekMsRUFBOEMsUUFBOUMsQ0FKSCxFQUtFO0FBQ0ErRixZQUFJQyxLQUFKO0FBQ0EsZUFBS3BLLGlCQUFMLEdBQXlCLEtBQXpCO0FBQ0Q7QUFDRixLQVhxQjtBQUFBLEc7O09BYXRCcUssaUIsR0FBb0IsVUFBQ2hHLFFBQUQsRUFBV0QsR0FBWDtBQUFBLFdBQW1CLFVBQUMrRixHQUFELEVBQVM7QUFDOUMsVUFBTXhHLFlBQVl6RyxNQUFNc0gsWUFBTixDQUFtQkosR0FBbkIsQ0FBbEI7QUFDQSxVQUFJLE9BQUtuRSxlQUFMLElBQXdCLENBQUMsT0FBSzBJLHlCQUFMLENBQStCdEUsUUFBL0IsRUFBeUNELEdBQXpDLEVBQThDLE1BQTlDLENBQTdCLEVBQW9GO0FBQ2xGLFlBQU1rRyxtQkFBbUIsT0FBS04sY0FBTCxJQUF1QixPQUFLcEssS0FBTCxDQUFXdEIsSUFBWCxDQUFnQk8sSUFBaEIsR0FBdUIsQ0FBOUMsR0FDdkIsT0FBS2UsS0FBTCxDQUFXdEIsSUFBWCxDQUFnQk8sSUFBaEIsR0FBdUIsQ0FEQSxHQUNJLE9BQUttSixvQkFBTCxDQUEwQixPQUFLcEksS0FBTCxDQUFXdkIsYUFBWCxDQUF5QndMLEtBQXpCLEVBQTFCLENBRDdCOztBQURrRixZQUkxRXpMLFlBSjBFLEdBSXpELE9BQUt3QixLQUpvRCxDQUkxRXhCLFlBSjBFOztBQUtsRixZQUFJQSxhQUFhUyxJQUFiLEdBQW9CLENBQXhCLEVBQTJCO0FBQ3pCLGNBQUlULGFBQWFzSyxHQUFiLENBQWlCLFVBQWpCLE1BQWlDckUsUUFBakMsSUFBNkNqRyxhQUFhc0ssR0FBYixDQUFpQixXQUFqQixNQUFrQy9FLFNBQW5GLEVBQThGO0FBQzVGd0csZ0JBQUlDLEtBQUo7QUFDQSxtQkFBS25LLGVBQUwsR0FBdUIsS0FBdkI7QUFDQSxtQkFBSytKLGNBQUwsR0FBc0IsS0FBdEI7QUFDRDtBQUNGLFNBTkQsTUFNTyxJQUFJTSxxQkFBcUJyRSxTQUF6QixFQUFvQztBQUN6QyxpQkFBS2hHLGVBQUwsR0FBdUIsS0FBdkI7QUFDQSxpQkFBSytKLGNBQUwsR0FBc0IsS0FBdEI7QUFDRCxTQUhNLE1BR0EsSUFBSU0scUJBQXFCakcsUUFBekIsRUFBbUM7QUFDeEM4RixjQUFJQyxLQUFKO0FBQ0EsaUJBQUtuSyxlQUFMLEdBQXVCLEtBQXZCO0FBQ0EsaUJBQUsrSixjQUFMLEdBQXNCLEtBQXRCO0FBQ0Q7QUFDRjtBQUNELFVBQUksT0FBS3BLLEtBQUwsQ0FBVzBFLHFCQUFmLEVBQXNDO0FBQ3BDLGVBQUt2RSxRQUFMLENBQWlCLE9BQUtILEtBQUwsQ0FBV3JDLElBQVgsQ0FBZ0JJLEVBQWpDLFNBQXVDZ0csU0FBdkMsU0FBb0RVLFFBQXBELElBQWtFOEYsR0FBbEU7QUFDRDtBQUNGLEtBekJtQjtBQUFBLEc7O09BMkJwQnZGLGEsR0FBZ0IsVUFBQ0QsV0FBRCxFQUFjTixRQUFkLEVBQXdCa0csV0FBeEIsRUFBd0M7QUFDdEQsUUFBSTVGLGdCQUFnQkEsWUFBWTZGLElBQVosS0FBcUIsTUFBckIsSUFBK0I3RixZQUFZNkYsSUFBWixLQUFxQixRQUFwRSxDQUFKLEVBQW1GO0FBQ2pGLFVBQUluRyxhQUFhLENBQUMsQ0FBbEIsRUFBcUI7QUFDbkIsZUFBS1osUUFBTCxDQUFjLEVBQUU1RCxZQUFZd0UsUUFBZCxFQUFkO0FBQ0Q7QUFDRCxVQUFJa0csZ0JBQWdCLENBQUMsQ0FBckIsRUFBd0I7QUFDdEIsZUFBSzlHLFFBQUwsQ0FBYyxFQUFFM0QsZUFBZXlLLFdBQWpCLEVBQWQ7QUFDRDtBQUNERSxpQkFBVztBQUFBLGVBQU05RixZQUFZaUQsTUFBWixFQUFOO0FBQUEsT0FBWCxFQUF1QyxFQUF2QztBQUNEO0FBQ0YsRzs7T0FFRDhDLCtCLEdBQWtDO0FBQUEsV0FBWSxZQUFNO0FBQ2xELGFBQUs5SyxLQUFMLENBQVcrSyxtQkFBWCxDQUErQixPQUFLL0ssS0FBTCxDQUFXckMsSUFBMUMsRUFBZ0Q4RyxRQUFoRCxFQUEwRCxJQUExRCxFQUFnRSxLQUFoRTtBQUNELEtBRmlDO0FBQUEsRzs7T0FJbEN1RyxlLEdBQWtCLFlBQU07QUFBQSxRQUNkQyxXQURjLEdBQ0UsT0FBS2pMLEtBRFAsQ0FDZGlMLFdBRGM7O0FBRXRCLFFBQU0xSCxVQUFVLEVBQWhCO0FBQ0EsUUFBTTJILFdBQVd6QyxPQUFPLE9BQUt6SSxLQUFMLENBQVdrTCxRQUFsQixDQUFqQjtBQUNBLFFBQUlELFdBQUosRUFBaUI7QUFDZjFILGNBQVFnRyxJQUFSLENBQWE7QUFDWDRCLGVBQU9GLFlBQVlFLEtBQVosSUFBcUIsRUFEakI7QUFFWEMscUJBQWEsQ0FBQyxDQUFDSCxZQUFZRyxXQUZoQjtBQUdYQyxvQkFBWSxLQUhEO0FBSVh0SCxtQkFBVyxhQUpBO0FBS1h1SCxjQUFNO0FBQUEsaUJBQ0o7QUFBQTtBQUFBLGNBQUssV0FBVSw2Q0FBZjtBQUNJTCx3QkFBWU0sV0FBWixDQUF3QixPQUFLdkwsS0FBTCxDQUFXdEIsSUFBWCxDQUFnQm9LLEdBQWhCLENBQW9CckUsUUFBcEIsQ0FBeEIsRUFBdUR5RyxRQUF2RDtBQURKLFdBREk7QUFBQSxTQUxLO0FBVVhNLGtCQUFVO0FBQUEsaUJBQWFQLFlBQVlPLFFBQVosR0FBdUJQLFlBQVlPLFFBQVosQ0FBcUIvRyxRQUFyQixDQUF2QixHQUF3RCxJQUFyRTtBQUFBLFNBVkM7QUFXWGdILG9CQUFZO0FBQUEsaUJBQWFSLFlBQVlRLFVBQVosR0FBeUJSLFlBQVlRLFVBQVosQ0FBdUJoSCxRQUF2QixDQUF6QixHQUE0RCxJQUF6RTtBQUFBLFNBWEQ7QUFZWGlILG9CQUFZO0FBQUEsaUJBQWFULFlBQVlTLFVBQVosR0FBeUJULFlBQVlTLFVBQVosQ0FBdUJqSCxRQUF2QixDQUF6QixHQUE0RCxJQUF6RTtBQUFBO0FBWkQsT0FBYjtBQWNEOztBQUVELFFBQUksT0FBS3pFLEtBQUwsQ0FBVzJMLHVCQUFmLEVBQXdDO0FBQ3RDcEksY0FBUWdHLElBQVIsQ0FBYTtBQUNYNEIsZUFBTyxFQURJO0FBRVhDLHFCQUFhLEtBRkY7QUFHWEMsb0JBQVksS0FIRDtBQUlYdEgsbUJBQVcsbUJBSkE7QUFLWHVILGNBQU0sY0FBQzdHLFFBQUQsRUFBYztBQUNsQixjQUFNbUgsVUFBVSxPQUFLNUwsS0FBTCxDQUFXdEIsSUFBWCxDQUFnQm9LLEdBQWhCLENBQW9CckUsUUFBcEIsQ0FBaEI7QUFDQSxjQUFNb0gsU0FBU0QsUUFBUTlOLEtBQVIsQ0FBYyxPQUFLa0MsS0FBTCxDQUFXckMsSUFBWCxDQUFnQndLLFNBQTlCLENBQWY7QUFDQSxjQUFNMkQsV0FBVyxPQUFLOUwsS0FBTCxDQUFXdkIsYUFBWCxDQUF5QnNOLFFBQXpCLENBQWtDRixNQUFsQyxDQUFqQjtBQUNBLGlCQUNFLG9CQUFDLFFBQUQ7QUFDRSw4Q0FBZ0MsT0FBSzdMLEtBQUwsQ0FBV3JDLElBQVgsQ0FBZ0JJLEVBQWhELFNBQXNEMEcsUUFEeEQ7QUFFRSx1QkFBVSxnREFGWjtBQUdFLHFCQUFTcUgsUUFIWDtBQUlFLHNCQUFVLE9BQUtoQiwrQkFBTCxDQUFxQ3JHLFFBQXJDLENBSlo7QUFLRSxzQkFBVXlHO0FBTFosWUFERjtBQVNELFNBbEJVO0FBbUJYTSxrQkFBVTtBQUFBLGlCQUFNLElBQU47QUFBQSxTQW5CQztBQW9CWEMsb0JBQVk7QUFBQSxpQkFBTSxJQUFOO0FBQUEsU0FwQkQ7QUFxQlhDLG9CQUFZO0FBQUEsaUJBQU0sSUFBTjtBQUFBO0FBckJELE9BQWI7QUF1QkQ7O0FBRUQsUUFBTXBOLGlCQUFpQixFQUF2QjtBQUNBLFdBQUswQixLQUFMLENBQVcxQixjQUFYLENBQTBCME4sT0FBMUIsQ0FBa0MsVUFBQ0MsZ0JBQUQsRUFBc0I7QUFDdEQsYUFBS2pNLEtBQUwsQ0FBV3VELE9BQVgsQ0FBbUJ5SSxPQUFuQixDQUEyQixVQUFDRSxNQUFELEVBQVk7QUFDckMsWUFBSTVPLE1BQU1zSCxZQUFOLENBQW1Cc0gsTUFBbkIsTUFBK0JELGdCQUFuQyxFQUFxRDtBQUNuRDNOLHlCQUFlaUwsSUFBZixDQUFvQjJDLE1BQXBCO0FBQ0Q7QUFDRixPQUpEO0FBS0QsS0FORDtBQU9BNU4sbUJBQWUwTixPQUFmLENBQXVCLFVBQUN4SCxHQUFELEVBQVM7QUFDOUIsVUFBTTJILFNBQVM7QUFDYkMsZ0JBQVE1SCxJQUFJNEgsTUFEQztBQUVickksbUJBQVd6RyxNQUFNc0gsWUFBTixDQUFtQkosR0FBbkIsQ0FGRTtBQUdiMkcsZUFBUTNHLElBQUkyRyxLQUFKLElBQWEzRyxJQUFJMkcsS0FBSixLQUFjLENBQTNCLEdBQStCM0csSUFBSTJHLEtBQW5DLEdBQTJDLEdBSHRDO0FBSWJrQixrQkFBVzdILElBQUk2SCxRQUFKLElBQWdCN0gsSUFBSTZILFFBQUosS0FBaUIsQ0FBakMsR0FBcUM3SCxJQUFJNkgsUUFBekMsR0FBb0QsRUFKbEQ7QUFLYkMsa0JBQVU5SCxJQUFJOEgsUUFMRDtBQU1ibEIscUJBQWEsQ0FBQzVHLElBQUkrSCxlQU5MO0FBT2JDLGVBQU8sQ0FBQyxDQUFDaEksSUFBSWdJLEtBUEE7QUFRYkMsNkJBQXFCLENBQUMsQ0FBQ2pJLElBQUlpSSxtQkFSZDtBQVNiQyx3QkFBZ0IsQ0FBQyxDQUFDbEksSUFBSWtJLGNBVFQ7QUFVYkMsb0JBQVksQ0FBQyxDQUFDbkksSUFBSW1JLFVBVkw7QUFXYm5FLHVCQUFlaEUsSUFBSWdFLGFBWE47QUFZYm9FLGVBQU90UCxNQUFNdVAsaUJBQU4sQ0FBd0JySSxHQUF4QjtBQVpNLE9BQWY7QUFjQSxVQUFJQSxJQUFJaUIsWUFBUixFQUFzQjtBQUNwQjBHLGVBQU8xRyxZQUFQLEdBQXNCakIsSUFBSWlCLFlBQTFCO0FBQ0Q7QUFDRCxVQUFJakIsSUFBSXNJLFFBQVIsRUFBa0I7QUFDaEJYLGVBQU9XLFFBQVAsR0FBa0J0SSxJQUFJc0ksUUFBdEI7QUFDRDtBQUNELFVBQUl0SSxJQUFJTSxTQUFSLEVBQW1CO0FBQ2pCcUgsZUFBT3JILFNBQVAsR0FBbUJOLElBQUlNLFNBQXZCO0FBQ0Q7QUFDRCxVQUFJTixJQUFJdUksY0FBUixFQUF3QjtBQUN0QlosZUFBT1ksY0FBUCxHQUF3QnZJLElBQUl1SSxjQUE1QjtBQUNEO0FBQ0QsVUFBSXZJLElBQUl3SSxlQUFSLEVBQXlCO0FBQ3ZCYixlQUFPYSxlQUFQLEdBQXlCeEksSUFBSXdJLGVBQTdCO0FBQ0Q7QUFDRCxVQUFNQyxvQkFBb0IzUCxNQUFNNFAsb0JBQU4sQ0FBMkIxSSxHQUEzQixDQUExQjtBQUNBO0FBQ0EsVUFBTStHLGNBQWMsU0FBZEEsV0FBYyxDQUFDOUcsUUFBRCxFQUFXMEksTUFBWCxFQUFzQjtBQUN4QyxZQUFNdkUsTUFBTSxPQUFLNUksS0FBTCxDQUFXdEIsSUFBWCxDQUFnQlosS0FBaEIsRUFBdUIyRyxRQUF2QixTQUFvQ0QsSUFBSWlCLFlBQXhDLEVBQVo7QUFDQSxZQUFJd0gsa0JBQWtCckUsR0FBbEIsQ0FBSixFQUE0QjtBQUMxQixpQkFBT3BFLElBQUltSSxVQUFKLEdBQWlCLG9CQUFDLENBQUQsSUFBRyxJQUFHLHFCQUFOLEdBQWpCLEdBQWtELEVBQXpEO0FBQ0Q7QUFDRCxlQUFPUSxTQUFTQSxPQUFPdkUsR0FBUCxDQUFULEdBQXVCQSxHQUE5QjtBQUNELE9BTkQ7O0FBUUEsVUFBSXBFLElBQUk4RyxJQUFSLEVBQWM7QUFDWmEsZUFBT2IsSUFBUCxHQUFjOUcsSUFBSThHLElBQWxCO0FBQ0QsT0FGRCxNQUVPLElBQUk5RyxJQUFJK0csV0FBUixFQUFxQjtBQUMxQlksZUFBT2IsSUFBUCxHQUFjO0FBQUEsaUJBQVk5RyxJQUFJK0csV0FBSixDQUFnQixPQUFLdkwsS0FBTCxDQUFXdEIsSUFBWCxDQUFnQm9LLEdBQWhCLENBQW9CckUsUUFBcEIsQ0FBaEIsRUFBK0NBLFFBQS9DLENBQVo7QUFBQSxTQUFkO0FBQ0QsT0FGTSxNQUVBO0FBQ0wsZ0JBQVFELElBQUlNLFNBQVo7QUFDRSxlQUFLLFFBQUw7QUFDQSxlQUFLLE9BQUw7QUFDRXFILG1CQUFPYixJQUFQLEdBQWM7QUFBQSxxQkFDWkMsWUFBWTlHLFFBQVosRUFBc0I7QUFBQSx1QkFBSyxvQkFBQyxDQUFELGFBQUcsT0FBT3FDLENBQVYsSUFBaUJ0QyxJQUFJNEksb0JBQXJCLEVBQUw7QUFBQSxlQUF0QixDQURZO0FBQUEsYUFBZDtBQUVBO0FBQ0YsZUFBSyxVQUFMO0FBQWlCO0FBQ2Ysa0JBQU1DLGtCQUFrQjdJLElBQUk4SSxZQUFKLElBQW9COUksSUFBSThJLFlBQUosQ0FBaUJELGVBQXJDLElBQXdELENBQUMsVUFBRCxDQUFoRixDQURlLENBQytFO0FBQzlGbEIscUJBQU9iLElBQVAsR0FBYztBQUFBLHVCQUNaQyxZQUFZOUcsUUFBWixFQUFzQjtBQUFBLHlCQUFLaEkscUJBQXFCcUssQ0FBckIsRUFBd0I7QUFDakR5Ryw4QkFBVSxPQUFLdk4sS0FBTCxDQUFXdEIsSUFBWCxDQUFnQlosS0FBaEIsRUFBdUIyRyxRQUF2QixTQUFvQzRJLGVBQXBDLEVBRHVDO0FBRWpERyw4QkFBVWhKLElBQUk4SSxZQUFKLElBQW9COUksSUFBSThJLFlBQUosQ0FBaUJFLFFBRkU7QUFHakQvTix1Q0FBbUIrRSxJQUFJOEksWUFBSixJQUFvQjlJLElBQUk4SSxZQUFKLENBQWlCN04saUJBQXJDLElBQTBELE9BQUtPLEtBQUwsQ0FBV1AsaUJBSHZDLEVBRzBEO0FBQzNHRSxzQ0FBa0I2RSxJQUFJOEksWUFBSixJQUFvQjlJLElBQUk4SSxZQUFKLENBQWlCM04sZ0JBQXJDLElBQXlELE9BQUtLLEtBQUwsQ0FBV0wsZ0JBSnJDLENBSXVEO0FBSnZELG1CQUF4QixDQUFMO0FBQUEsaUJBQXRCLENBRFk7QUFBQSxlQUFkO0FBT0E7QUFDRDtBQUNELGVBQUssTUFBTDtBQUNFd00sbUJBQU9iLElBQVAsR0FBYztBQUFBLHFCQUNaQyxZQUFZOUcsUUFBWixFQUFzQixVQUFDcUMsQ0FBRCxFQUFPO0FBQzNCLG9CQUFJM0ssT0FBTzJLLENBQVAsRUFBVSxPQUFLOUcsS0FBTCxDQUFXVCxVQUFyQixFQUFpQyxJQUFqQyxFQUF1Q2tPLE9BQXZDLEVBQUosRUFBc0Q7QUFDcEQseUJBQU90UixPQUFPdVIsR0FBUCxDQUFXNUcsQ0FBWCxFQUFjLE9BQUs5RyxLQUFMLENBQVdULFVBQXpCLEVBQXFDNE4sTUFBckMsQ0FBNEMsT0FBS25OLEtBQUwsQ0FBV1QsVUFBdkQsQ0FBUDtBQUNEO0FBQ0Qsb0JBQUlwRCxPQUFPMkssQ0FBUCxFQUFVMkcsT0FBVixFQUFKLEVBQXlCO0FBQ3ZCLHlCQUFPdFIsT0FBT3VSLEdBQVAsQ0FBVzVHLENBQVgsRUFBY3FHLE1BQWQsQ0FBcUIsT0FBS25OLEtBQUwsQ0FBV1QsVUFBaEMsQ0FBUDtBQUNEO0FBQ0QsdUJBQU8sb0JBQUMsQ0FBRCxJQUFHLElBQUcsa0JBQU4sR0FBUDtBQUNELGVBUkQsQ0FEWTtBQUFBLGFBQWQ7QUFVQTtBQUNGLGVBQUssU0FBTDtBQUNFNE0sbUJBQU9iLElBQVAsR0FBYztBQUFBLHFCQUNaQyxZQUFZOUcsUUFBWixFQUFzQjtBQUFBLHVCQUNwQixvQkFBQyxDQUFELGFBQUcsSUFBSXFDLElBQUksVUFBSixHQUFpQixTQUF4QixJQUF1Q3RDLElBQUk0SSxvQkFBM0MsRUFEb0I7QUFBQSxlQUF0QixDQURZO0FBQUEsYUFBZDtBQUdBO0FBQ0Y7QUFDRWpCLG1CQUFPYixJQUFQLEdBQWM7QUFBQSxxQkFBWUMsWUFBWTlHLFFBQVosQ0FBWjtBQUFBLGFBQWQ7QUFuQ0o7QUFxQ0Q7QUFDRDtBQUNBLFVBQUlELElBQUlnSCxRQUFSLEVBQWtCO0FBQ2hCVyxlQUFPWCxRQUFQLEdBQWtCaEgsSUFBSWdILFFBQXRCO0FBQ0QsT0FGRCxNQUVPLElBQUloSCxJQUFJbUosZUFBUixFQUF5QjtBQUM5QnhCLGVBQU9YLFFBQVAsR0FDRTtBQUFBLGlCQUFZaEgsSUFBSW1KLGVBQUosQ0FBb0IsT0FBSzNOLEtBQUwsQ0FBV3RCLElBQVgsQ0FBZ0JvSyxHQUFoQixDQUFvQnJFLFFBQXBCLENBQXBCLEVBQW1EQSxRQUFuRCxDQUFaO0FBQUEsU0FERjtBQUVEO0FBQ0QsVUFBSUQsSUFBSWlILFVBQVIsRUFBb0I7QUFDbEJVLGVBQU9WLFVBQVAsR0FBb0JqSCxJQUFJaUgsVUFBeEI7QUFDRCxPQUZELE1BRU8sSUFBSWpILElBQUlvSixpQkFBUixFQUEyQjtBQUNoQ3pCLGVBQU9WLFVBQVAsR0FDRTtBQUFBLGlCQUFZakgsSUFBSW9KLGlCQUFKLENBQXNCLE9BQUs1TixLQUFMLENBQVd0QixJQUFYLENBQWdCb0ssR0FBaEIsQ0FBb0JyRSxRQUFwQixDQUF0QixFQUFxREEsUUFBckQsQ0FBWjtBQUFBLFNBREY7QUFFRDtBQUNELFVBQUlELElBQUlrSCxVQUFSLEVBQW9CO0FBQ2xCUyxlQUFPVCxVQUFQLEdBQW9CbEgsSUFBSWtILFVBQXhCO0FBQ0QsT0FGRCxNQUVPLElBQUlsSCxJQUFJcUosaUJBQVIsRUFBMkI7QUFDaEMxQixlQUFPVCxVQUFQLEdBQ0U7QUFBQSxpQkFBWWxILElBQUlxSixpQkFBSixDQUFzQixPQUFLN04sS0FBTCxDQUFXdEIsSUFBWCxDQUFnQm9LLEdBQWhCLENBQW9CckUsUUFBcEIsQ0FBdEIsRUFBcURBLFFBQXJELENBQVo7QUFBQSxTQURGO0FBRUQ7QUFDRCxVQUFJRCxJQUFJZ0UsYUFBUixFQUF1QjtBQUNyQixZQUFJc0Ysa0JBQWtCO0FBQUEsaUJBQU9sRixHQUFQO0FBQUEsU0FBdEI7QUFDQSxnQkFBUXBFLElBQUlnRSxhQUFaO0FBQ0UsZUFBSyxNQUFMO0FBQ0U7QUFDQSxnQkFBSSxPQUFLeEksS0FBTCxDQUFXYyxVQUFmLEVBQTJCO0FBQ3pCLGtCQUFJLENBQUNxTCxPQUFPWCxRQUFaLEVBQXNCO0FBQ3BCVyx1QkFBT1gsUUFBUCxHQUFrQjtBQUFBLHlCQUNoQixvQkFBQyxXQUFEO0FBQ0UsMEJBQUssTUFEUDtBQUVFLDJCQUFPLE9BQUs5RCxnQkFBTCxDQUFzQmpELFFBQXRCLEVBQWdDRCxHQUFoQyxDQUZUO0FBR0UsOEJBQVUsT0FBSzBDLHFCQUFMLENBQTJCekMsUUFBM0IsRUFBcUNELEdBQXJDLEVBQTBDc0osZUFBMUMsQ0FIWjtBQUlFLDRCQUFRLE9BQUtuRyxjQUFMLENBQW9CbEQsUUFBcEIsRUFBOEJELEdBQTlCLENBSlY7QUFLRSw2QkFBUyxPQUFLcUQsV0FBTCxDQUFpQixNQUFqQixFQUF5QnJELElBQUlnRSxhQUE3QixFQUE0Qy9ELFFBQTVDLEVBQXNEMEgsT0FBT3BJLFNBQTdELENBTFg7QUFNRSwrQkFBVyxPQUFLUSxpQkFBTCxDQUF1QkMsR0FBdkIsRUFBNEJDLFFBQTVCLENBTmI7QUFPRSw4QkFBVSxPQUFLZ0csaUJBQUwsQ0FBdUJoRyxRQUF2QixFQUFpQ0QsR0FBakMsQ0FQWjtBQVFFLGlEQUEyQixPQUFLeEUsS0FBTCxDQUFXckMsSUFBWCxDQUFnQkksRUFBM0MsU0FBaURvTyxPQUFPcEksU0FBeEQsU0FBcUVVO0FBUnZFLHFCQVNNRCxJQUFJdUosa0JBVFY7QUFVRSw4QkFBVSxPQUFLaEYseUJBQUwsQ0FBK0J0RSxRQUEvQixFQUF5Q0QsR0FBekMsRUFBOEMsTUFBOUMsQ0FWWjtBQVdFLDJCQUFPMkgsT0FBT1MsS0FYaEI7QUFZRSw4QkFBVTFCO0FBWloscUJBRGdCO0FBQUEsaUJBQWxCO0FBZ0JEO0FBQ0Qsa0JBQUksQ0FBQ2lCLE9BQU9WLFVBQVosRUFBd0I7QUFDdEJVLHVCQUFPVixVQUFQLEdBQW9CO0FBQUEseUJBQ2xCLG9CQUFDLFdBQUQ7QUFDRSwwQkFBSyxNQURQO0FBRUUsMkJBQU8sT0FBSzlDLGtCQUFMLENBQXdCbEUsUUFBeEIsRUFBa0NELEdBQWxDLENBRlQ7QUFHRSw4QkFBVSxPQUFLZ0MsdUJBQUwsQ0FBNkIvQixRQUE3QixFQUF1Q0QsR0FBdkMsRUFBNENzSixlQUE1QyxDQUhaO0FBSUUsNEJBQVEsT0FBS3RHLGdCQUFMLENBQXNCL0MsUUFBdEIsRUFBZ0NELEdBQWhDLENBSlY7QUFLRSwrQkFBVyxPQUFLUCxtQkFMbEI7QUFNRSw4QkFBVSxPQUFLcUcsbUJBQUwsQ0FBeUI3RixRQUF6QixFQUFtQ0QsR0FBbkMsQ0FOWjtBQU9FLG1EQUE2QixPQUFLeEUsS0FBTCxDQUFXckMsSUFBWCxDQUFnQkksRUFBN0MsU0FBbURvTyxPQUFPcEksU0FBMUQsU0FBdUVVO0FBUHpFLHFCQVFNRCxJQUFJd0osb0JBUlY7QUFTRSw4QkFBVSxPQUFLakYseUJBQUwsQ0FBK0J0RSxRQUEvQixFQUF5Q0QsR0FBekMsRUFBOEMsUUFBOUMsQ0FUWjtBQVVFLDJCQUFPMkgsT0FBT1MsS0FWaEI7QUFXRSw4QkFBVTFCO0FBWFoscUJBRGtCO0FBQUEsaUJBQXBCO0FBZUQ7QUFDRjtBQUNELGdCQUFJLE9BQUtsTCxLQUFMLENBQVdxQixTQUFmLEVBQTBCO0FBQ3hCLGtCQUFJLENBQUM4SyxPQUFPVCxVQUFaLEVBQXdCO0FBQ3RCUyx1QkFBT1QsVUFBUCxHQUFvQjtBQUFBLHlCQUNsQixvQkFBQyxXQUFEO0FBQ0UsMEJBQUssTUFEUDtBQUVFLDJCQUFPLE9BQUs3QyxrQkFBTCxDQUF3QnJFLEdBQXhCLENBRlQ7QUFHRSw4QkFBVSxPQUFLd0IsdUJBQUwsQ0FBNkJ4QixHQUE3QixFQUFrQ3NKLGVBQWxDLENBSFo7QUFJRSxtREFBNkIsT0FBSzlOLEtBQUwsQ0FBV3JDLElBQVgsQ0FBZ0JJLEVBQTdDLFNBQW1Eb08sT0FBT3BJO0FBSjVELHFCQUtNUyxJQUFJeUosb0JBTFY7QUFNRSwyQkFBTzlCLE9BQU9TLEtBTmhCO0FBT0UsOEJBQVUxQjtBQVBaLHFCQURrQjtBQUFBLGlCQUFwQjtBQVdEO0FBQ0Y7QUFDRDtBQUNGLGVBQUssUUFBTDtBQUNFLGdCQUFJLE9BQUtsTCxLQUFMLENBQVdjLFVBQWYsRUFBMkI7QUFDekIsa0JBQUksQ0FBQ3FMLE9BQU9YLFFBQVosRUFBc0I7QUFDcEJXLHVCQUFPWCxRQUFQLEdBQWtCO0FBQUEseUJBQ2hCLG9CQUFDLFdBQUQ7QUFDRSwwQkFBSyxRQURQO0FBRUUsMkJBQU8sT0FBSzlELGdCQUFMLENBQXNCakQsUUFBdEIsRUFBZ0NELEdBQWhDLENBRlQ7QUFHRSw4QkFBVSxPQUFLMEMscUJBQUwsQ0FBMkJ6QyxRQUEzQixFQUFxQ0QsR0FBckMsRUFBMENzSixlQUExQyxDQUhaO0FBSUUsNEJBQVEsT0FBS25HLGNBQUwsQ0FBb0JsRCxRQUFwQixFQUE4QkQsR0FBOUIsQ0FKVjtBQUtFLDZCQUFTLE9BQUtxRCxXQUFMLENBQWlCLE1BQWpCLEVBQXlCckQsSUFBSWdFLGFBQTdCLEVBQTRDL0QsUUFBNUMsRUFBc0QwSCxPQUFPcEksU0FBN0QsQ0FMWDtBQU1FLCtCQUFXLE9BQUtRLGlCQUFMLENBQXVCQyxHQUF2QixFQUE0QkMsUUFBNUIsQ0FOYjtBQU9FLDhCQUFVLE9BQUtnRyxpQkFBTCxDQUF1QmhHLFFBQXZCLEVBQWlDRCxHQUFqQyxDQVBaO0FBUUUsaURBQTJCLE9BQUt4RSxLQUFMLENBQVdyQyxJQUFYLENBQWdCSSxFQUEzQyxTQUFpRG9PLE9BQU9wSSxTQUF4RCxTQUFxRVU7QUFSdkUscUJBU01ELElBQUl1SixrQkFUVjtBQVVFLDhCQUFVLE9BQUtoRix5QkFBTCxDQUErQnRFLFFBQS9CLEVBQXlDRCxHQUF6QyxFQUE4QyxNQUE5QyxDQVZaO0FBV0UsMkJBQU8ySCxPQUFPUyxLQVhoQjtBQVlFLDhCQUFVMUI7QUFaWixxQkFEZ0I7QUFBQSxpQkFBbEI7QUFnQkQ7QUFDRCxrQkFBSSxDQUFDaUIsT0FBT1YsVUFBWixFQUF3QjtBQUN0QlUsdUJBQU9WLFVBQVAsR0FBb0I7QUFBQSx5QkFDbEIsb0JBQUMsV0FBRDtBQUNFLDBCQUFLLFFBRFA7QUFFRSwyQkFBTyxPQUFLOUMsa0JBQUwsQ0FBd0JsRSxRQUF4QixFQUFrQ0QsR0FBbEMsQ0FGVDtBQUdFLDhCQUFVLE9BQUtnQyx1QkFBTCxDQUE2Qi9CLFFBQTdCLEVBQXVDRCxHQUF2QyxFQUE0Q3NKLGVBQTVDLENBSFo7QUFJRSw0QkFBUSxPQUFLdEcsZ0JBQUwsQ0FBc0IvQyxRQUF0QixFQUFnQ0QsR0FBaEMsQ0FKVjtBQUtFLDZCQUFTLE9BQUtxRCxXQUFMLENBQWlCLFFBQWpCLEVBQTJCLFFBQTNCLEVBQXFDcEQsUUFBckMsRUFBK0MwSCxPQUFPcEksU0FBdEQsQ0FMWDtBQU1FLCtCQUFXLE9BQUtFLG1CQU5sQjtBQU9FLDhCQUFVLE9BQUtxRyxtQkFBTCxDQUF5QjdGLFFBQXpCLEVBQW1DRCxHQUFuQyxDQVBaO0FBUUUsbURBQTZCLE9BQUt4RSxLQUFMLENBQVdyQyxJQUFYLENBQWdCSSxFQUE3QyxTQUFtRG9PLE9BQU9wSSxTQUExRCxTQUF1RVU7QUFSekUscUJBU01ELElBQUl3SixvQkFUVjtBQVVFLDhCQUFVLE9BQUtqRix5QkFBTCxDQUErQnRFLFFBQS9CLEVBQXlDRCxHQUF6QyxFQUE4QyxRQUE5QyxDQVZaO0FBV0UsMkJBQU8ySCxPQUFPUyxLQVhoQjtBQVlFLDhCQUFVMUI7QUFaWixxQkFEa0I7QUFBQSxpQkFBcEI7QUFnQkQ7QUFDRjtBQUNELGdCQUFJLE9BQUtsTCxLQUFMLENBQVdxQixTQUFmLEVBQTBCO0FBQ3hCLGtCQUFJLENBQUM4SyxPQUFPVCxVQUFaLEVBQXdCO0FBQ3RCUyx1QkFBT1QsVUFBUCxHQUFvQjtBQUFBLHlCQUNsQixvQkFBQyxXQUFEO0FBQ0UsMEJBQUssUUFEUDtBQUVFLDJCQUFPLE9BQUs3QyxrQkFBTCxDQUF3QnJFLEdBQXhCLENBRlQ7QUFHRSw4QkFBVSxPQUFLd0IsdUJBQUwsQ0FBNkJ4QixHQUE3QixFQUFrQ3NKLGVBQWxDLENBSFo7QUFJRSxtREFBNkIsT0FBSzlOLEtBQUwsQ0FBV3JDLElBQVgsQ0FBZ0JJLEVBQTdDLFNBQW1Eb08sT0FBT3BJO0FBSjVELHFCQUtNUyxJQUFJeUosb0JBTFY7QUFNRSwyQkFBTzlCLE9BQU9TLEtBTmhCO0FBT0UsOEJBQVUxQjtBQVBaLHFCQURrQjtBQUFBLGlCQUFwQjtBQVdEO0FBQ0Y7QUFDRDtBQUNGLGVBQUssT0FBTDtBQUNFNEMsOEJBQWtCO0FBQUEscUJBQ2hCbEYsSUFBSUYsT0FBSixDQUFZLElBQUl3RixNQUFKLFdBQW1CLE9BQUtsTyxLQUFMLENBQVdMLGdCQUE5QixVQUFxRCxHQUFyRCxDQUFaLEVBQXVFLEVBQXZFLENBRGdCO0FBQUEsYUFBbEI7QUFFQSxnQkFBSSxPQUFLSyxLQUFMLENBQVdjLFVBQWYsRUFBMkI7QUFDekIsa0JBQUksQ0FBQ3FMLE9BQU9YLFFBQVosRUFBc0I7QUFDcEJXLHVCQUFPWCxRQUFQLEdBQWtCO0FBQUEseUJBQ2hCLG9CQUFDLFdBQUQ7QUFDRSwwQkFBSyxNQURQO0FBRUUsMkJBQU8sT0FBSzlELGdCQUFMLENBQXNCakQsUUFBdEIsRUFBZ0NELEdBQWhDLENBRlQ7QUFHRSw4QkFBVSxPQUFLMEMscUJBQUwsQ0FBMkJ6QyxRQUEzQixFQUFxQ0QsR0FBckMsRUFBMENzSixlQUExQyxDQUhaO0FBSUUsNEJBQVEsT0FBS25HLGNBQUwsQ0FBb0JsRCxRQUFwQixFQUE4QkQsR0FBOUIsRUFBbUNzSixlQUFuQyxDQUpWO0FBS0UsNkJBQVMsT0FBS2pHLFdBQUwsQ0FBaUIsTUFBakIsRUFBeUJyRCxJQUFJZ0UsYUFBN0IsRUFBNEMvRCxRQUE1QyxFQUFzRDBILE9BQU9wSSxTQUE3RCxDQUxYO0FBTUUsK0JBQVcsT0FBS1EsaUJBQUwsQ0FBdUJDLEdBQXZCLEVBQTRCQyxRQUE1QixDQU5iO0FBT0UsOEJBQVUsT0FBS2dHLGlCQUFMLENBQXVCaEcsUUFBdkIsRUFBaUNELEdBQWpDLENBUFo7QUFRRSxpREFBMkIsT0FBS3hFLEtBQUwsQ0FBV3JDLElBQVgsQ0FBZ0JJLEVBQTNDLFNBQWlEb08sT0FBT3BJLFNBQXhELFNBQXFFVTtBQVJ2RSxxQkFTTUQsSUFBSXVKLGtCQVRWO0FBVUUsOEJBQVUsT0FBS2hGLHlCQUFMLENBQStCdEUsUUFBL0IsRUFBeUNELEdBQXpDLEVBQThDLE1BQTlDLENBVlo7QUFXRSwyQkFBTzJILE9BQU9TLEtBWGhCO0FBWUUsOEJBQVUxQjtBQVpaLHFCQURnQjtBQUFBLGlCQUFsQjtBQWdCRDtBQUNELGtCQUFJLENBQUNpQixPQUFPVixVQUFaLEVBQXdCO0FBQ3RCVSx1QkFBT1YsVUFBUCxHQUFvQjtBQUFBLHlCQUNsQixvQkFBQyxXQUFEO0FBQ0UsMEJBQUssTUFEUDtBQUVFLDJCQUFPLE9BQUs5QyxrQkFBTCxDQUF3QmxFLFFBQXhCLEVBQWtDRCxHQUFsQyxDQUZUO0FBR0UsOEJBQVUsT0FBS2dDLHVCQUFMLENBQTZCL0IsUUFBN0IsRUFBdUNELEdBQXZDLEVBQTRDc0osZUFBNUMsQ0FIWjtBQUlFLDRCQUFRLE9BQUt0RyxnQkFBTCxDQUFzQi9DLFFBQXRCLEVBQWdDRCxHQUFoQyxFQUFxQ3NKLGVBQXJDLENBSlY7QUFLRSwrQkFBVyxPQUFLN0osbUJBTGxCO0FBTUUsOEJBQVUsT0FBS3FHLG1CQUFMLENBQXlCN0YsUUFBekIsRUFBbUNELEdBQW5DLENBTlo7QUFPRSxtREFBNkIsT0FBS3hFLEtBQUwsQ0FBV3JDLElBQVgsQ0FBZ0JJLEVBQTdDLFNBQW1Eb08sT0FBT3BJLFNBQTFELFNBQXVFVTtBQVB6RSxxQkFRTUQsSUFBSXdKLG9CQVJWO0FBU0UsOEJBQVUsT0FBS2pGLHlCQUFMLENBQStCdEUsUUFBL0IsRUFBeUNELEdBQXpDLEVBQThDLFFBQTlDLENBVFo7QUFVRSwyQkFBTzJILE9BQU9TLEtBVmhCO0FBV0UsOEJBQVUxQjtBQVhaLHFCQURrQjtBQUFBLGlCQUFwQjtBQWVEO0FBQ0Y7QUFDRCxnQkFBSSxPQUFLbEwsS0FBTCxDQUFXcUIsU0FBZixFQUEwQjtBQUN4QixrQkFBSSxDQUFDOEssT0FBT1QsVUFBWixFQUF3QjtBQUN0QlMsdUJBQU9ULFVBQVAsR0FBb0I7QUFBQSx5QkFDbEIsb0JBQUMsV0FBRDtBQUNFLDBCQUFLLE1BRFA7QUFFRSwyQkFBTyxPQUFLN0Msa0JBQUwsQ0FBd0JyRSxHQUF4QixDQUZUO0FBR0UsOEJBQVUsT0FBS3dCLHVCQUFMLENBQTZCeEIsR0FBN0IsRUFBa0NzSixlQUFsQyxDQUhaO0FBSUUsbURBQTZCLE9BQUs5TixLQUFMLENBQVdyQyxJQUFYLENBQWdCSSxFQUE3QyxTQUFtRG9PLE9BQU9wSTtBQUo1RCxxQkFLTVMsSUFBSXlKLG9CQUxWO0FBTUUsMkJBQU85QixPQUFPUyxLQU5oQjtBQU9FLDhCQUFVMUI7QUFQWixxQkFEa0I7QUFBQSxpQkFBcEI7QUFXRDtBQUNGO0FBQ0Q7QUFDRixlQUFLLFFBQUw7QUFBZTtBQUFBLGtCQUNMaUQsSUFESyxHQUNJLE9BQUtuTyxLQURULENBQ0xtTyxJQURLOztBQUViLGtCQUFNQyxnQkFBZ0I1SixJQUFJNkosc0JBQUosSUFDcEIsT0FBS3JPLEtBQUwsQ0FBV3FPLHNCQUFYLENBQWtDdkYsR0FBbEMsQ0FBc0NxRCxPQUFPcEksU0FBN0MsQ0FERjtBQUVBLGtCQUFNdUsscUJBQXFCOUosSUFBSStKLDJCQUFKLElBQ3pCO0FBQ0VDLDZCQUFhTCxLQUFLTSxhQUFMLENBQW1CLEVBQUUxUSxJQUFJLDRCQUFOLEVBQW5CLENBRGY7QUFFRTJRLCtCQUFlUCxLQUFLTSxhQUFMLENBQW1CLEVBQUUxUSxJQUFJLCtCQUFOLEVBQW5CO0FBRmpCLGVBREY7QUFLQSxrQkFBSSxPQUFLaUMsS0FBTCxDQUFXYyxVQUFmLEVBQTJCO0FBQ3pCLG9CQUFJLENBQUNxTCxPQUFPWCxRQUFaLEVBQXNCO0FBQ3BCVyx5QkFBT1gsUUFBUCxHQUFrQjtBQUFBLDJCQUNoQixvQkFBQyxjQUFEO0FBQ0UsNEJBQU1oSCxJQUFJaUIsWUFBSixDQUFpQkMsSUFBakIsS0FBMEIsUUFBMUIsR0FBcUNqQixRQUQ3QztBQUVFLCtCQUNFRCxJQUFJbUssb0JBQUosSUFBNEJQLGFBQTVCLEdBQ0U1SixJQUFJbUssb0JBQUosQ0FBeUJQLGNBQWNRLEtBQWQsRUFBekIsRUFBZ0RuSyxRQUFoRCxFQUEwREQsR0FBMUQsQ0FERixHQUVFNEosYUFMTjtBQU9FLDZCQUFPLE9BQUsxRyxnQkFBTCxDQUFzQmpELFFBQXRCLEVBQWdDRCxHQUFoQyxDQVBUO0FBUUUsZ0NBQVUsT0FBSzBDLHFCQUFMLENBQTJCekMsUUFBM0IsRUFBcUNELEdBQXJDLEVBQTBDc0osZUFBMUMsQ0FSWjtBQVNFLDhCQUFRLE9BQUtuRyxjQUFMLENBQW9CbEQsUUFBcEIsRUFBOEJELEdBQTlCLENBVFY7QUFVRSwrQkFBUyxPQUFLcUQsV0FBTCxDQUFpQixNQUFqQixFQUF5QnJELElBQUlnRSxhQUE3QixFQUE0Qy9ELFFBQTVDLEVBQXNEMEgsT0FBT3BJLFNBQTdELENBVlg7QUFXRSxrQ0FBWXFLLGlCQUFrQkEsY0FBY3RJLE1BQWQsR0FBdUIsQ0FYdkQ7QUFZRSxpQ0FBVyxDQUFDdEIsSUFBSW1JLFVBWmxCO0FBYUUsd0NBQWtCLEtBYnBCO0FBY0UsdUNBQWlCLEtBZG5CO0FBZUUsdUNBZkY7QUFnQkUsMkJBQUssT0FBS2xDLGlCQUFMLENBQXVCaEcsUUFBdkIsRUFBaUNELEdBQWpDLENBaEJQO0FBaUJFLGtDQUFZO0FBQ1Z6RyxxREFBMkIsT0FBS2lDLEtBQUwsQ0FBV3JDLElBQVgsQ0FBZ0JJLEVBQTNDLFNBQWlEb08sT0FBT3BJLFNBQXhELFNBQXFFVTtBQUQzRDtBQWpCZCx1QkFvQk1ELElBQUl1SixrQkFwQlY7QUFxQkUsZ0NBQVUsT0FBS2hGLHlCQUFMLENBQStCdEUsUUFBL0IsRUFBeUNELEdBQXpDLEVBQThDLE1BQTlDLENBckJaO0FBc0JFLGdDQUFVMEc7QUF0QlosdUJBdUJNb0Qsa0JBdkJOLEVBRGdCO0FBQUEsbUJBQWxCO0FBMkJEO0FBQ0Qsb0JBQUksQ0FBQ25DLE9BQU9WLFVBQVosRUFBd0I7QUFDdEJVLHlCQUFPVixVQUFQLEdBQW9CO0FBQUEsMkJBQ2xCLG9CQUFDLGNBQUQ7QUFDRSw0QkFBTWpILElBQUlpQixZQUFKLENBQWlCQyxJQUFqQixLQUEwQixVQUExQixHQUF1Q2pCLFFBRC9DO0FBRUUsK0JBQ0VELElBQUlxSyxzQkFBSixJQUE4QlQsYUFBOUIsR0FDRTVKLElBQUlxSyxzQkFBSixDQUEyQlQsY0FBY1EsS0FBZCxFQUEzQixFQUFrRG5LLFFBQWxELEVBQTRERCxHQUE1RCxDQURGLEdBRUU0SixhQUxOO0FBT0UsNkJBQU8sT0FBS3pGLGtCQUFMLENBQXdCbEUsUUFBeEIsRUFBa0NELEdBQWxDLENBUFQ7QUFRRSxnQ0FBVSxPQUFLZ0MsdUJBQUwsQ0FBNkIvQixRQUE3QixFQUF1Q0QsR0FBdkMsRUFBNENzSixlQUE1QyxDQVJaO0FBU0UsOEJBQVEsT0FBS3RHLGdCQUFMLENBQXNCL0MsUUFBdEIsRUFBZ0NELEdBQWhDLENBVFY7QUFVRSxrQ0FBWTRKLGlCQUFrQkEsY0FBY3RJLE1BQWQsR0FBdUIsQ0FWdkQ7QUFXRSxpQ0FBVyxDQUFDdEIsSUFBSW1JLFVBWGxCO0FBWUUsd0NBQWtCLEtBWnBCO0FBYUUsdUNBQWlCLEtBYm5CO0FBY0UsdUNBZEY7QUFlRSwyQkFBSyxPQUFLckMsbUJBQUwsQ0FBeUI3RixRQUF6QixFQUFtQ0QsR0FBbkMsQ0FmUDtBQWdCRSxrQ0FBWTtBQUNWekcsdURBQTZCLE9BQUtpQyxLQUFMLENBQVdyQyxJQUFYLENBQWdCSSxFQUE3QyxTQUFtRG9PLE9BQU9wSSxTQUExRCxTQUF1RVU7QUFEN0Q7QUFoQmQsdUJBbUJNRCxJQUFJd0osb0JBbkJWO0FBb0JFLGdDQUFVLE9BQUtqRix5QkFBTCxDQUErQnRFLFFBQS9CLEVBQXlDRCxHQUF6QyxFQUE4QyxRQUE5QyxDQXBCWjtBQXFCRSxnQ0FBVTBHO0FBckJaLHVCQXNCTW9ELGtCQXRCTixFQURrQjtBQUFBLG1CQUFwQjtBQTBCRDtBQUNGO0FBQ0Qsa0JBQUksT0FBS3RPLEtBQUwsQ0FBV3FCLFNBQWYsRUFBMEI7QUFDeEIsb0JBQUksQ0FBQzhLLE9BQU9ULFVBQVosRUFBd0I7QUFDdEJTLHlCQUFPVCxVQUFQLEdBQW9CO0FBQUEsMkJBQ2xCLG9CQUFDLGNBQUQ7QUFDRSw0QkFBTWxILElBQUlpQixZQUFKLENBQWlCQyxJQUFqQixLQUEwQixTQURsQztBQUVFLCtCQUNFbEIsSUFBSXNLLHNCQUFKLElBQThCVixhQUE5QixHQUNFNUosSUFBSXNLLHNCQUFKLENBQTJCVixjQUFjUSxLQUFkLEVBQTNCLEVBQWtEcEssR0FBbEQsQ0FERixHQUVFNEosYUFMTjtBQU1FLDZCQUFPLE9BQUt2RixrQkFBTCxDQUF3QnJFLEdBQXhCLENBTlQ7QUFPRSxnQ0FBVSxPQUFLd0IsdUJBQUwsQ0FBNkJ4QixHQUE3QixFQUFrQ3NKLGVBQWxDLENBUFo7QUFRRSxrQ0FBWU0saUJBQWtCQSxjQUFjdEksTUFBZCxHQUF1QixDQVJ2RDtBQVNFLHFDQVRGO0FBVUUsdUNBQWlCLEtBVm5CO0FBV0UsdUNBWEY7QUFZRSxrQ0FBWTtBQUNWL0gsdURBQTZCLE9BQUtpQyxLQUFMLENBQVdyQyxJQUFYLENBQWdCSSxFQUE3QyxTQUFtRG9PLE9BQU9wSTtBQURoRDtBQVpkLHVCQWVNUyxJQUFJeUosb0JBZlY7QUFnQkUsZ0NBQVUvQztBQWhCWix1QkFpQk1vRCxrQkFqQk4sRUFEa0I7QUFBQSxtQkFBcEI7QUFxQkQ7QUFDRjtBQUNEO0FBQ0Q7QUFDRCxlQUFLLE1BQUw7QUFBYTtBQUNYLGtCQUFJLE9BQUt0TyxLQUFMLENBQVdjLFVBQWYsRUFBMkI7QUFDekIsb0JBQUksQ0FBQ3FMLE9BQU9YLFFBQVosRUFBc0I7QUFDcEJXLHlCQUFPWCxRQUFQLEdBQWtCO0FBQUEsMkJBQ2hCLG9CQUFDLFNBQUQ7QUFDRSw2QkFBTyxPQUFLOUQsZ0JBQUwsQ0FBc0JqRCxRQUF0QixFQUFnQ0QsR0FBaEMsQ0FEVDtBQUVFLGdDQUFVLE9BQUswQyxxQkFBTCxDQUEyQnpDLFFBQTNCLEVBQXFDRCxHQUFyQyxFQUEwQ3NKLGVBQTFDLENBRlo7QUFHRSw4QkFBUSxPQUFLOU4sS0FBTCxDQUFXWCxNQUhyQjtBQUlFLGtDQUFZLE9BQUtXLEtBQUwsQ0FBV1QsVUFKekI7QUFLRSxnQ0FBVSxPQUFLa0wsaUJBQUwsQ0FBdUJoRyxRQUF2QixFQUFpQ0QsR0FBakMsQ0FMWjtBQU1FLGtDQUFZO0FBQ1YwRywwQ0FEVTtBQUVWbk4scURBQTJCLE9BQUtpQyxLQUFMLENBQVdyQyxJQUFYLENBQWdCSSxFQUEzQyxTQUFpRG9PLE9BQU9wSSxTQUF4RCxTQUFxRVUsUUFGM0Q7QUFHVnNLLG1DQUFXLE9BQUt4SyxpQkFBTCxDQUF1QkMsR0FBdkIsRUFBNEJDLFFBQTVCLENBSEQ7QUFJVnVLLGdDQUFRLE9BQUtySCxjQUFMLENBQW9CbEQsUUFBcEIsRUFBOEJELEdBQTlCLENBSkU7QUFLVnlLLGlDQUFTLE9BQUtwSCxXQUFMLENBQWlCLE1BQWpCLEVBQXlCckQsSUFBSWdFLGFBQTdCLEVBQTRDL0QsUUFBNUMsRUFBc0QwSCxPQUFPcEksU0FBN0QsQ0FMQztBQU1WNkksK0JBQU9ULE9BQU9TO0FBTko7QUFOZCx1QkFjTXBJLElBQUl1SixrQkFkVjtBQWVFLGdDQUFVLE9BQUtoRix5QkFBTCxDQUErQnRFLFFBQS9CLEVBQXlDRCxHQUF6QyxFQUE4QyxNQUE5QztBQWZaLHVCQURnQjtBQUFBLG1CQUFsQjtBQW1CRDtBQUNELG9CQUFJLENBQUMySCxPQUFPVixVQUFaLEVBQXdCO0FBQ3RCVSx5QkFBT1YsVUFBUCxHQUFvQjtBQUFBLDJCQUNsQixvQkFBQyxTQUFEO0FBQ0UsNkJBQU8sT0FBSzlDLGtCQUFMLENBQXdCbEUsUUFBeEIsRUFBa0NELEdBQWxDLENBRFQ7QUFFRSxnQ0FBVSxPQUFLZ0MsdUJBQUwsQ0FBNkIvQixRQUE3QixFQUF1Q0QsR0FBdkMsRUFBNENzSixlQUE1QyxDQUZaO0FBR0UsaUNBQVcsT0FBSzdKLG1CQUhsQjtBQUlFLDhCQUFRLE9BQUtqRSxLQUFMLENBQVdYLE1BSnJCO0FBS0Usa0NBQVksT0FBS1csS0FBTCxDQUFXVCxVQUx6QjtBQU1FLGdDQUFVLE9BQUsrSyxtQkFBTCxDQUF5QjdGLFFBQXpCLEVBQW1DRCxHQUFuQyxDQU5aO0FBT0Usa0NBQVk7QUFDVjBHLDBDQURVO0FBRVZuTix1REFBNkIsT0FBS2lDLEtBQUwsQ0FBV3JDLElBQVgsQ0FBZ0JJLEVBQTdDLFNBQW1Eb08sT0FBT3BJLFNBQTFELFNBQXVFVSxRQUY3RDtBQUdWbUksK0JBQU9ULE9BQU9TO0FBSEo7QUFQZCx1QkFZTXBJLElBQUl3SixvQkFaVjtBQWFFLGdDQUFVLE9BQUtqRix5QkFBTCxDQUErQnRFLFFBQS9CLEVBQXlDRCxHQUF6QyxFQUE4QyxRQUE5QztBQWJaLHVCQURrQjtBQUFBLG1CQUFwQjtBQWlCRDtBQUNGO0FBQ0Qsa0JBQUksT0FBS3hFLEtBQUwsQ0FBV3FCLFNBQWYsRUFBMEI7QUFDeEIsb0JBQUksQ0FBQzhLLE9BQU9ULFVBQVosRUFBd0I7QUFDdEJTLHlCQUFPVCxVQUFQLEdBQW9CO0FBQUEsMkJBQ2xCLG9CQUFDLFNBQUQ7QUFDRSw2QkFBTyxPQUFLN0Msa0JBQUwsQ0FBd0JyRSxHQUF4QixDQURUO0FBRUUsZ0NBQVUsT0FBS3dCLHVCQUFMLENBQTZCeEIsR0FBN0IsRUFBa0NzSixlQUFsQyxDQUZaO0FBR0Usa0NBQVksT0FBSzlOLEtBQUwsQ0FBV1QsVUFIekI7QUFJRSw4QkFBUSxPQUFLUyxLQUFMLENBQVdYLE1BSnJCO0FBS0Usa0NBQVk7QUFDVjZMLDBDQURVO0FBRVZuTix1REFBNkIsT0FBS2lDLEtBQUwsQ0FBV3JDLElBQVgsQ0FBZ0JJLEVBQTdDLFNBQW1Eb08sT0FBT3BJLFNBRmhEO0FBR1Y2SSwrQkFBT1QsT0FBT1M7QUFISjtBQUxkLHVCQVVNcEksSUFBSXlKLG9CQVZWLEVBRGtCO0FBQUEsbUJBQXBCO0FBY0Q7QUFDRjtBQUNEO0FBQ0Q7QUFDRCxlQUFLLFNBQUw7QUFBZ0I7QUFBQSxrQkFDTkUsS0FETSxHQUNHLE9BQUtuTyxLQURSLENBQ05tTyxJQURNOztBQUVkLGtCQUFNQyxpQkFBZ0IsQ0FDcEIsRUFBRTlILE9BQU8sSUFBVCxFQUFlNEksT0FBT2YsTUFBS00sYUFBTCxDQUFtQixFQUFFMVEsSUFBSSxVQUFOLEVBQW5CLENBQXRCLEVBRG9CLEVBRXBCLEVBQUV1SSxPQUFPLEtBQVQsRUFBZ0I0SSxPQUFPZixNQUFLTSxhQUFMLENBQW1CLEVBQUUxUSxJQUFJLFNBQU4sRUFBbkIsQ0FBdkIsRUFGb0IsQ0FBdEI7O0FBS0Esa0JBQU11USxzQkFBcUI5SixJQUFJK0osMkJBQUosSUFBbUM7QUFDNURDLDZCQUFhTCxNQUFLTSxhQUFMLENBQW1CLEVBQUUxUSxJQUFJLDRCQUFOLEVBQW5CLENBRCtDO0FBRTVEMlEsK0JBQWVQLE1BQUtNLGFBQUwsQ0FBbUIsRUFBRTFRLElBQUksK0JBQU4sRUFBbkI7QUFGNkMsZUFBOUQ7O0FBS0Esa0JBQUksT0FBS2lDLEtBQUwsQ0FBV2MsVUFBZixFQUEyQjtBQUN6QixvQkFBSSxDQUFDcUwsT0FBT1gsUUFBWixFQUFzQjtBQUNwQlcseUJBQU9YLFFBQVAsR0FBa0I7QUFBQSwyQkFDaEIsb0JBQUMsY0FBRDtBQUNFLDRCQUFNaEgsSUFBSWlCLFlBQUosQ0FBaUJDLElBQWpCLEtBQTBCLFFBQTFCLEdBQXFDakIsUUFEN0M7QUFFRSwrQkFBUzJKLGNBRlg7QUFHRSw2QkFBTyxPQUFLMUcsZ0JBQUwsQ0FBc0JqRCxRQUF0QixFQUFnQ0QsR0FBaEMsQ0FIVDtBQUlFLGdDQUFVLE9BQUswQyxxQkFBTCxDQUEyQnpDLFFBQTNCLEVBQXFDRCxHQUFyQyxFQUEwQ3NKLGVBQTFDLENBSlo7QUFLRSw4QkFBUSxPQUFLbkcsY0FBTCxDQUFvQmxELFFBQXBCLEVBQThCRCxHQUE5QixDQUxWO0FBTUUsK0JBQVMsT0FBS3FELFdBQUwsQ0FBaUIsTUFBakIsRUFBeUJyRCxJQUFJZ0UsYUFBN0IsRUFBNEMvRCxRQUE1QyxFQUFzRDBILE9BQU9wSSxTQUE3RCxDQU5YO0FBT0Usa0NBQVksS0FQZDtBQVFFLGlDQUFXLENBQUNTLElBQUltSSxVQVJsQjtBQVNFLHdDQUFrQixLQVRwQjtBQVVFLHVDQUFpQixLQVZuQjtBQVdFLHVDQVhGO0FBWUUsMkJBQUssT0FBS2xDLGlCQUFMLENBQXVCaEcsUUFBdkIsRUFBaUNELEdBQWpDLENBWlA7QUFhRSxrQ0FBWTtBQUNWekcscURBQTJCLE9BQUtpQyxLQUFMLENBQVdyQyxJQUFYLENBQWdCSSxFQUEzQyxTQUFpRG9PLE9BQU9wSSxTQUF4RCxTQUFxRVU7QUFEM0Q7QUFiZCx1QkFnQk1ELElBQUl1SixrQkFoQlY7QUFpQkUsZ0NBQVUsT0FBS2hGLHlCQUFMLENBQStCdEUsUUFBL0IsRUFBeUNELEdBQXpDLEVBQThDLE1BQTlDLENBakJaO0FBa0JFLGdDQUFVMEc7QUFsQlosdUJBbUJNb0QsbUJBbkJOLEVBRGdCO0FBQUEsbUJBQWxCO0FBdUJEO0FBQ0Qsb0JBQUksQ0FBQ25DLE9BQU9WLFVBQVosRUFBd0I7QUFDdEJVLHlCQUFPVixVQUFQLEdBQW9CO0FBQUEsMkJBQ2xCLG9CQUFDLGNBQUQ7QUFDRSw0QkFBTWpILElBQUlpQixZQUFKLENBQWlCQyxJQUFqQixLQUEwQixVQUExQixHQUF1Q2pCLFFBRC9DO0FBRUUsK0JBQVMySixjQUZYO0FBR0UsNkJBQU8sT0FBS3pGLGtCQUFMLENBQXdCbEUsUUFBeEIsRUFBa0NELEdBQWxDLENBSFQ7QUFJRSxnQ0FBVSxPQUFLZ0MsdUJBQUwsQ0FBNkIvQixRQUE3QixFQUF1Q0QsR0FBdkMsRUFBNENzSixlQUE1QyxDQUpaO0FBS0UsOEJBQVEsT0FBS3RHLGdCQUFMLENBQXNCL0MsUUFBdEIsRUFBZ0NELEdBQWhDLENBTFY7QUFNRSxrQ0FBWSxLQU5kO0FBT0UsaUNBQVcsQ0FBQ0EsSUFBSW1JLFVBUGxCO0FBUUUsd0NBQWtCLEtBUnBCO0FBU0UsdUNBQWlCLEtBVG5CO0FBVUUsdUNBVkY7QUFXRSwyQkFBSyxPQUFLckMsbUJBQUwsQ0FBeUI3RixRQUF6QixFQUFtQ0QsR0FBbkMsQ0FYUDtBQVlFLGtDQUFZO0FBQ1Z6Ryx1REFBNkIsT0FBS2lDLEtBQUwsQ0FBV3JDLElBQVgsQ0FBZ0JJLEVBQTdDLFNBQW1Eb08sT0FBT3BJLFNBQTFELFNBQXVFVTtBQUQ3RDtBQVpkLHVCQWVNRCxJQUFJd0osb0JBZlY7QUFnQkUsZ0NBQVUsT0FBS2pGLHlCQUFMLENBQStCdEUsUUFBL0IsRUFBeUNELEdBQXpDLEVBQThDLFFBQTlDLENBaEJaO0FBaUJFLGdDQUFVMEc7QUFqQlosdUJBa0JNb0QsbUJBbEJOLEVBRGtCO0FBQUEsbUJBQXBCO0FBc0JEO0FBQ0Y7QUFDRCxrQkFBSSxPQUFLdE8sS0FBTCxDQUFXcUIsU0FBZixFQUEwQjtBQUN4QixvQkFBSSxDQUFDOEssT0FBT1QsVUFBWixFQUF3QjtBQUN0QlMseUJBQU9ULFVBQVAsR0FBb0I7QUFBQSwyQkFDbEIsb0JBQUMsY0FBRDtBQUNFLDRCQUFNbEgsSUFBSWlCLFlBQUosQ0FBaUJDLElBQWpCLEtBQTBCLFNBRGxDO0FBRUUsK0JBQVMwSSxjQUZYO0FBR0UsNkJBQU8sT0FBS3ZGLGtCQUFMLENBQXdCckUsR0FBeEIsQ0FIVDtBQUlFLGdDQUFVLE9BQUt3Qix1QkFBTCxDQUE2QnhCLEdBQTdCLEVBQWtDc0osZUFBbEMsQ0FKWjtBQUtFLGtDQUFZLEtBTGQ7QUFNRSxxQ0FORjtBQU9FLHVDQUFpQixLQVBuQjtBQVFFLHVDQVJGO0FBU0Usa0NBQVk7QUFDVi9QLHVEQUE2QixPQUFLaUMsS0FBTCxDQUFXckMsSUFBWCxDQUFnQkksRUFBN0MsU0FBbURvTyxPQUFPcEk7QUFEaEQ7QUFUZCx1QkFZTVMsSUFBSXlKLG9CQVpWO0FBYUUsZ0NBQVUvQztBQWJaLHVCQWNNb0QsbUJBZE4sRUFEa0I7QUFBQSxtQkFBcEI7QUFrQkQ7QUFDRjtBQUNEO0FBQ0Q7QUFDRDtBQTVaRjtBQThaRDtBQUNEL0ssY0FBUWdHLElBQVIsQ0FBYTRDLE1BQWI7QUFDRCxLQXhnQkQ7O0FBMGdCQSxRQUFJLE9BQUtuTSxLQUFMLENBQVcvQixVQUFmLEVBQTJCO0FBQ3pCc0YsY0FBUWdHLElBQVIsQ0FBYTtBQUNYNEIsZUFBTyxFQURJO0FBRVhDLHFCQUFhLEtBRkY7QUFHWHJILG1CQUFXLGVBSEE7QUFJWHVILGNBQU07QUFBQSxpQkFBTSxJQUFOO0FBQUEsU0FKSztBQUtYRSxrQkFBVTtBQUFBLGlCQUFNLElBQU47QUFBQSxTQUxDO0FBTVhDLG9CQUFZO0FBQUEsaUJBQ1Ysb0JBQUMsSUFBRDtBQUNFLGlEQUFtQyxPQUFLekwsS0FBTCxDQUFXckMsSUFBWCxDQUFnQkksRUFBbkQsU0FBeUQwRyxRQUQzRDtBQUVFLGtCQUFLLFdBRlA7QUFHRSxrQkFBSyxRQUhQO0FBSUUsbUJBQU8sRUFKVDtBQUtFLG9CQUFRLEVBTFY7QUFNRSxxQkFBUztBQUFBLHFCQUFNLE9BQUt6RSxLQUFMLENBQVdtUCxhQUFYLENBQXlCLE9BQUtuUCxLQUFMLENBQVdyQyxJQUFwQyxFQUEwQzhHLFFBQTFDLENBQU47QUFBQTtBQU5YLFlBRFU7QUFBQSxTQU5EO0FBZ0JYaUgsb0JBQVk7QUFBQSxpQkFBTSxJQUFOO0FBQUE7QUFoQkQsT0FBYjtBQWtCRDtBQUNELFdBQU9uSSxPQUFQO0FBQ0QsRzs7T0FFRDZMLFksR0FBZSxVQUFDM0ssUUFBRCxFQUFXRCxHQUFYLEVBQWdCc0QsUUFBaEIsRUFBNkI7QUFDMUMsUUFBSUEsYUFBYSxNQUFqQixFQUF5QjtBQUN2QixhQUFPLEtBQVA7QUFDRDtBQUNELFFBQU0vSixLQUFLLE9BQUtxSixtQkFBTCxDQUF5QjNDLFFBQXpCLENBQVg7QUFDQSxRQUFJLE9BQUt6RSxLQUFMLENBQVdyQixRQUFYLENBQW9CYixLQUFwQixFQUEyQkMsRUFBM0IsU0FBa0N5RyxJQUFJaUIsWUFBdEMsRUFBSixFQUEwRDtBQUN4RCxhQUFPLElBQVA7QUFDRDtBQUNELFdBQU8sS0FBUDtBQUNELEc7O09BRURoRSxrQixHQUFxQixZQUFNO0FBQ3pCLFdBQUtyQixpQkFBTCxHQUF5QixJQUF6QjtBQUNELEc7O09BRURzQixvQixHQUF1QixZQUFNO0FBQzNCLFFBQUksT0FBSzFCLEtBQUwsQ0FBV3ZCLGFBQVgsQ0FBeUJRLElBQTdCLEVBQW1DO0FBQ2pDLGFBQUtvQixlQUFMLEdBQXVCLElBQXZCO0FBQ0EsYUFBS3dELFFBQUwsQ0FBYztBQUNaNUQsb0JBQVlvRztBQURBLE9BQWQ7QUFHRDtBQUNGLEc7O09BRUQxRSwwQixHQUE2QixZQUFNO0FBQ2pDLFdBQUtyQixnQkFBTCxHQUF3QixJQUF4QjtBQUNELEc7O09BRURpQyxjLEdBQWlCLFVBQUMyQixDQUFELEVBQUlPLFFBQUosRUFBaUI7QUFDaEMsUUFBSSxPQUFLekUsS0FBTCxDQUFXcVAsU0FBWCxJQUF3QixDQUFDLE9BQUtyUCxLQUFMLENBQVcvQixVQUFwQyxJQUFrRCxDQUFDLE9BQUsrQixLQUFMLENBQVdoQyxTQUFsRSxFQUE2RTtBQUMzRSxVQUFJa0csRUFBRW9MLE9BQUYsSUFBYXBMLEVBQUUyQixRQUFuQixFQUE2QjtBQUMzQnJGLGlCQUFTK08sWUFBVCxHQUF3QkMsZUFBeEI7QUFDRDtBQUNEO0FBQ0E7QUFMMkUsVUFNbkVDLFVBTm1FLEdBTXBEdkwsRUFBRWtDLE1BTmtELENBTW5FcUosVUFObUU7O0FBTzNFLFVBQU1DLGVBQWVELFdBQVd6TyxTQUFYLElBQXdCeU8sV0FBV3pPLFNBQVgsQ0FBcUJ3SSxPQUE3QyxHQUNqQmlHLFdBQVd6TyxTQURNLEdBRWpCLEVBRko7QUFHRSxVQUFNMk8sZUFBZUYsV0FBV0EsVUFBWCxDQUFzQnpPLFNBQXRCLElBQW1DeU8sV0FBV0EsVUFBWCxDQUFzQnpPLFNBQXRCLENBQWdDd0ksT0FBbkUsQ0FBMkU7QUFBM0UsUUFDbkJpRyxXQUFXQSxVQUFYLENBQXNCek8sU0FESCxHQUVuQixFQUZGO0FBR0EsVUFBTTRPLGVBQWVILFdBQVdBLFVBQVgsQ0FBc0JBLFVBQXRCLENBQWlDek8sU0FBakMsSUFBOEN5TyxXQUFXQSxVQUFYLENBQXNCQSxVQUF0QixDQUFpQ3pPLFNBQWpDLENBQTJDd0ksT0FBekYsQ0FBaUc7QUFBakcsUUFDbkJpRyxXQUFXQSxVQUFYLENBQXNCQSxVQUF0QixDQUFpQ3pPLFNBRGQsR0FFbkIsRUFGRjtBQUdBLFVBQU02TyxlQUFlSixXQUFXQSxVQUFYLENBQXNCQSxVQUF0QixDQUFpQ0EsVUFBakMsQ0FBNEN6TyxTQUE1QyxJQUF5RHlPLFdBQVdBLFVBQVgsQ0FBc0JBLFVBQXRCLENBQWlDQSxVQUFqQyxDQUE0Q3pPLFNBQTVDLENBQXNEd0ksT0FBL0csQ0FBdUg7QUFBdkgsUUFDbkJpRyxXQUFXQSxVQUFYLENBQXNCQSxVQUF0QixDQUFpQ0EsVUFBakMsQ0FBNEN6TyxTQUR6QixHQUVuQixFQUZGO0FBR0YsVUFDRTBPLGFBQWFsRyxPQUFiLENBQXFCLGVBQXJCLE1BQTBDLENBQUMsQ0FBM0MsSUFDQW1HLGFBQWFuRyxPQUFiLENBQXFCLGVBQXJCLE1BQTBDLENBQUMsQ0FEM0MsSUFFQW9HLGFBQWFwRyxPQUFiLENBQXFCLGVBQXJCLE1BQTBDLENBQUMsQ0FGM0MsSUFHQXFHLGFBQWFyRyxPQUFiLENBQXFCLGVBQXJCLE1BQTBDLENBQUMsQ0FKN0MsRUFLRTtBQUNBLGVBQUt4SixLQUFMLENBQVcrSyxtQkFBWCxDQUNFLE9BQUsvSyxLQUFMLENBQVdyQyxJQURiLEVBRUU4RyxRQUZGLEVBR0UsT0FBS3pFLEtBQUwsQ0FBVzhQLFdBQVgsSUFBMEI1TCxFQUFFb0wsT0FIOUIsRUFJRSxPQUFLdFAsS0FBTCxDQUFXOFAsV0FBWCxJQUEwQjVMLEVBQUUyQixRQUo5QjtBQU1EO0FBQ0Y7QUFDRCxRQUFJLE9BQUs3RixLQUFMLENBQVcrUCxVQUFmLEVBQTJCO0FBQ3pCLGFBQUsvUCxLQUFMLENBQVcrUCxVQUFYLENBQXNCN0wsQ0FBdEIsRUFBeUJPLFFBQXpCLEVBQW1DLE9BQUt6RSxLQUFMLENBQVd0QixJQUFYLENBQWdCb0ssR0FBaEIsQ0FBb0JyRSxRQUFwQixDQUFuQztBQUNEO0FBQ0QsV0FBTyxJQUFQO0FBQ0QsRzs7T0FFRHBCLGlCLEdBQW9CLFVBQUNhLENBQUQsRUFBSU8sUUFBSixFQUFpQjtBQUNuQyxRQUFJLE9BQUt6RSxLQUFMLENBQVc0RCxnQkFBZixFQUFpQztBQUFBLG9CQU0zQixPQUFLNUQsS0FOc0I7QUFBQSxVQUU3QitLLG1CQUY2QixXQUU3QkEsbUJBRjZCO0FBQUEsVUFHN0J0TSxhQUg2QixXQUc3QkEsYUFINkI7QUFBQSxVQUk3QmQsSUFKNkIsV0FJN0JBLElBSjZCO0FBQUEsVUFLN0JlLElBTDZCLFdBSzdCQSxJQUw2Qjs7QUFPL0J3RixRQUFFbUIsY0FBRjtBQUNBbkIsUUFBRThMLGVBQUY7QUFDQSxhQUFLbk0sUUFBTCxDQUFjO0FBQ1o1Qix5QkFBaUIsSUFETDtBQUVaZ08sc0JBQWMvTCxFQUFFZ00sT0FGSjtBQUdaQyxzQkFBY2pNLEVBQUVrTTtBQUhKLE9BQWQ7QUFLQTtBQUNBLFVBQUksQ0FBQzNSLGNBQWNzTixRQUFkLENBQXVCck4sS0FBS1osS0FBTCxFQUFZMkcsUUFBWixTQUF5QjlHLEtBQUt3SyxTQUE5QixFQUF2QixDQUFMLEVBQXdFO0FBQ3RFNEMsNEJBQW9CcE4sSUFBcEIsRUFBMEI4RyxRQUExQjtBQUNEO0FBQ0RqRSxlQUFTNlAsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUMsT0FBSzNQLGVBQXhDO0FBQ0EsYUFBTyxLQUFQO0FBQ0Q7QUFDRCxXQUFPLElBQVA7QUFDRCxHOztPQUVENFAsMEIsR0FBNkIsVUFBQ0MsT0FBRCxFQUFVOVIsYUFBVixFQUF5QitSLFlBQXpCO0FBQUEsV0FBMEMsWUFBTTtBQUMzRUQsY0FBUTlSLGFBQVIsRUFBdUIrUixZQUF2QjtBQUNELEtBRjRCO0FBQUEsRzs7T0FJN0JyTixxQixHQUF3QjtBQUFBLFdBQ3RCLE9BQUtuRCxLQUFMLENBQVdrRCxlQUFYLENBQTJCLE9BQUtsRCxLQUFMLENBQVd0QixJQUFYLENBQWdCb0ssR0FBaEIsQ0FBb0JyRSxRQUFwQixDQUEzQixFQUEwREEsUUFBMUQsQ0FEc0I7QUFBQSxHOztPQUd4QmdNLFUsR0FBYTtBQUFBLFdBQU8sVUFBQ0MsU0FBRCxFQUFlO0FBQUEsb0JBTTdCLE9BQUsxUSxLQU53QjtBQUFBLFVBRS9CL0IsVUFGK0IsV0FFL0JBLFVBRitCO0FBQUEsVUFHL0JELFNBSCtCLFdBRy9CQSxTQUgrQjtBQUFBLFVBSS9CWSxVQUorQixXQUkvQkEsVUFKK0I7QUFBQSxVQUsvQkosWUFMK0IsV0FLL0JBLFlBTCtCOztBQUFBLFVBT3pCaUcsUUFQeUIsR0FPRmlNLFNBUEUsQ0FPekJqTSxRQVB5QjtBQUFBLFVBT1p6RSxLQVBZLDRCQU9GMFEsU0FQRTs7QUFRakMsVUFBSXBGLGFBQUo7QUFDQSxVQUFJeEQsV0FBVyxNQUFmO0FBQ0EsVUFBSXdCLGdCQUFnQixDQUFwQixDQVZpQyxDQVVWO0FBQ3ZCLFVBQUlyTCxVQUFKLEVBQWdCcUwsZ0JBQWdCMUssV0FBV0ssSUFBM0I7QUFDaEIsVUFBSWhCLFVBQUosRUFBZ0I7QUFDZCxZQUFJd0csWUFBYTZFLGdCQUFnQixDQUFqQyxFQUFxQztBQUNuQyxjQUFJOUUsSUFBSWlILFVBQVIsRUFBb0I7QUFDbEJILG1CQUFPOUcsSUFBSWlILFVBQUosQ0FBZWhILFFBQWYsQ0FBUDtBQUNBcUQsdUJBQVcsUUFBWDtBQUNELFdBSEQsTUFHTztBQUNMd0QsbUJBQU8sSUFBUDtBQUNBeEQsdUJBQVcsSUFBWDtBQUNEO0FBQ0YsU0FSRCxNQVFPO0FBQ0x3RCxpQkFBTzlHLElBQUk4RyxJQUFKLENBQVM3RyxXQUFXNkUsYUFBcEIsQ0FBUDtBQUNEO0FBQ0YsT0FaRCxNQVlPLElBQUl0TCxhQUFhd0csSUFBSWdILFFBQXJCLEVBQStCO0FBQ3BDRixlQUFPOUcsSUFBSWdILFFBQUosQ0FBYS9HLFdBQVc2RSxhQUF4QixDQUFQO0FBQ0F4QixtQkFBVyxNQUFYO0FBQ0QsT0FITSxNQUdBO0FBQ0x3RCxlQUFPOUcsSUFBSThHLElBQUosQ0FBUzdHLFdBQVc2RSxhQUFwQixDQUFQO0FBQ0Q7QUFDRCxVQUFNcUgsWUFBWUQsVUFBVTNNLFNBQVYsS0FBd0IsbUJBQXhCLElBQStDMk0sVUFBVTNNLFNBQVYsS0FBd0IsYUFBekY7QUFDQSxVQUFJLENBQUMrRCxhQUFhLE1BQWIsSUFBdUJBLGFBQWEsTUFBcEMsSUFBOENBLGFBQWEsUUFBNUQsS0FBeUUsQ0FBQzZJLFNBQTlFLEVBQXlGO0FBQ3ZGLFlBQU1DLGNBQWU5SSxhQUFhLFFBQWQsR0FBMEJyRCxRQUExQixHQUFzQ0EsV0FBVzZFLGFBQXJFO0FBQ0EsWUFBTXVILGNBQWMsT0FBS25ILGVBQUwsQ0FBcUJrSCxXQUFyQixFQUFrQ3BNLEdBQWxDLEVBQXVDc0QsUUFBdkMsQ0FBcEI7QUFDQSxZQUFNZ0osV0FBVyxPQUFLMUIsWUFBTCxDQUFrQndCLFdBQWxCLEVBQStCcE0sR0FBL0IsRUFBb0NzRCxRQUFwQyxDQUFqQjtBQUNBLFlBQU05RyxZQUFheEMsYUFBYXNLLEdBQWIsQ0FBaUIsVUFBakIsTUFBaUNyRSxRQUFqQyxJQUE2Q2pHLGFBQWFzSyxHQUFiLENBQWlCLFdBQWpCLE1BQWtDOUksTUFBTStELFNBQXRGLEdBQ2hCLDhCQURnQixHQUNpQixrQkFEbkM7QUFFQSxlQUNFO0FBQUMsY0FBRDtBQUFBLHVCQUNNL0QsS0FETjtBQUVFLHVCQUFXZ0IsU0FGYjtBQUdFLG1CQUFPd0QsSUFBSW9JLEtBSGI7QUFJRSxxQkFBUyxPQUFLdkMsZ0JBQUwsQ0FBc0J2QyxRQUF0QixFQUFnQ3JELFFBQWhDLEVBQTBDekUsTUFBTStELFNBQWhEO0FBSlg7QUFNRTtBQUFDLHVCQUFEO0FBQUE7QUFDRSxrQkFBSStELFdBQVd0RCxJQUFJVCxTQUFmLElBQTRCVSxXQUFXNkUsYUFBdkMsQ0FETjtBQUVFLHdCQUFVd0gsUUFGWjtBQUdFLHVCQUFTLENBQUMsQ0FBQ0QsWUFBWWhILFlBSHpCO0FBSUUseUJBQVcsQ0FBQyxDQUFDZ0gsWUFBWS9HLGNBSjNCO0FBS0UsMkJBQWErRyxZQUFZakgsV0FMM0I7QUFNRSw0QkFBY2lILFlBQVloSCxZQU41QjtBQU9FLDhCQUFnQmdILFlBQVkvRztBQVA5QjtBQVNJd0I7QUFUSjtBQU5GLFNBREY7QUFvQkQ7QUFDRCxhQUNFO0FBQUMsWUFBRDtBQUFBLHFCQUFVdEwsS0FBVixJQUFpQixXQUFVLGtCQUEzQixFQUE4QyxPQUFPd0UsSUFBSW9JLEtBQXpEO0FBQWtFdEI7QUFBbEUsT0FERjtBQUdELEtBN0RZO0FBQUEsRzs7T0ErRGJoSSxhLEdBQWdCLFlBQU07QUFDcEIsUUFBSSxDQUFDLE9BQUt0RCxLQUFMLENBQVdoQixXQUFaLElBQTJCLENBQUMsT0FBS2dCLEtBQUwsQ0FBV3BDLE1BQXZDLElBQWlELENBQUMsT0FBS29DLEtBQUwsQ0FBVy9CLFVBQWpFLEVBQTZFO0FBQzNFLGFBQ0Usb0JBQUMsTUFBRDtBQUNFLG1CQUFVLGlCQURaO0FBRUUsZ0JBQVE7QUFBQyxjQUFEO0FBQUEsWUFBTSxPQUFPLEVBQUU4UyxXQUFXLFFBQWIsRUFBYjtBQUFzQyw4QkFBQyxDQUFELElBQUcsSUFBRyxjQUFOO0FBQXRDLFNBRlY7QUFHRSxlQUFPLEVBSFQ7QUFJRSxxQkFBYSxLQUpmO0FBS0Usa0JBQVU7QUFMWixRQURGO0FBU0Q7QUFDRCxRQUFJLENBQUMsT0FBSy9RLEtBQUwsQ0FBVzFCLGNBQVgsQ0FBMEJXLElBQS9CLEVBQXFDO0FBQ25DLFVBQUksT0FBS2UsS0FBTCxDQUFXcEMsTUFBZixFQUF1QjtBQUNyQixlQUNFLG9CQUFDLE1BQUQ7QUFDRSxxQkFBVSxpQkFEWjtBQUVFLGtCQUFRO0FBQUMsZ0JBQUQ7QUFBQTtBQUFBO0FBQUEsV0FGVjtBQUdFLGlCQUFPLEVBSFQ7QUFJRSx1QkFBYSxLQUpmO0FBS0Usb0JBQVU7QUFMWixVQURGO0FBU0Q7QUFDRCxhQUNFLG9CQUFDLE1BQUQ7QUFDRSxtQkFBVSxpQkFEWjtBQUVFLGdCQUFRO0FBQUMsY0FBRDtBQUFBLFlBQU0sT0FBTyxFQUFFbVQsV0FBVyxRQUFiLEVBQWI7QUFBc0MsOEJBQUMsQ0FBRCxJQUFHLElBQUcsZ0JBQU47QUFBdEMsU0FGVjtBQUdFLGVBQU8sRUFIVDtBQUlFLHFCQUFhLEtBSmY7QUFLRSxrQkFBVTtBQUxaLFFBREY7QUFTRDtBQUNELFFBQU14TixVQUFVLE9BQUt5SCxlQUFMLEVBQWhCO0FBQ0EsUUFBSXpILFFBQVF5TixNQUFSLEtBQW1CLENBQXZCLEVBQTBCLE9BQU8sSUFBUDtBQUMxQixXQUFPek4sUUFBUTBOLEdBQVIsQ0FBWTtBQUFBLGFBQ2pCLG9CQUFDLE1BQUQ7QUFDRSxhQUFLek0sSUFBSVQsU0FEWDtBQUVFLG1CQUFXUyxJQUFJVCxTQUZqQjtBQUdFLGdCQUNFO0FBQUMsb0JBQUQ7QUFBQTtBQUNFLGtCQUFNLE9BQUsvRCxLQUFMLENBQVdyQyxJQURuQjtBQUVFLHFCQUFTLE9BQUtxQyxLQUFMLENBQVd1RCxPQUZ0QjtBQUdFLG9CQUFRaUIsR0FIVjtBQUlFLCtCQUFtQixPQUFLeEUsS0FBTCxDQUFXNUIsVUFKaEM7QUFLRSw4QkFBa0IsT0FBSzRCLEtBQUwsQ0FBVzNCLFNBTC9CO0FBTUUsMEJBQWMsT0FBSzJCLEtBQUwsQ0FBV2tSLFVBTjNCO0FBT0Usb0JBQVEsT0FBS2xSLEtBQUwsQ0FBV3BDLE1BUHJCO0FBUUUsdUJBQVcsT0FBS29DLEtBQUwsQ0FBVzlCO0FBUnhCO0FBVUdzRyxjQUFJNEg7QUFWUCxTQUpKO0FBaUJFLGNBQU0sT0FBS3FFLFVBQUwsQ0FBZ0JqTSxHQUFoQixDQWpCUjtBQWtCRSxlQUFPLE9BQUt4RSxLQUFMLENBQVd6QixZQUFYLENBQXdCdUssR0FBeEIsQ0FBNEJ0RSxJQUFJVCxTQUFoQyxFQUEyQ1MsSUFBSTJHLEtBQS9DLENBbEJUO0FBbUJFLGtCQUFVM0csSUFBSTZILFFBbkJoQjtBQW9CRSxrQkFBVTdILElBQUk4SCxRQXBCaEI7QUFxQkUscUJBQWE5SCxJQUFJNEcsV0FyQm5CO0FBc0JFLGtCQUFVNUcsSUFBSXNJLFFBQUosR0FBZXRJLElBQUlzSSxRQUFuQixHQUE4QixDQXRCMUM7QUF1QkUsZUFBT3RJLElBQUlnSSxLQXZCYjtBQXdCRSw2QkFBcUJoSSxJQUFJaUk7QUF4QjNCLFFBRGlCO0FBQUEsS0FBWixDQUFQO0FBMkJELEc7O09BRUR2SyxpQixHQUFvQixZQUFNO0FBQUEsa0JBTXBCLE9BQUtsQyxLQU5lO0FBQUEsUUFFdEI0RCxnQkFGc0IsV0FFdEJBLGdCQUZzQjtBQUFBLFFBR3RCbEYsSUFIc0IsV0FHdEJBLElBSHNCO0FBQUEsUUFJdEJmLElBSnNCLFdBSXRCQSxJQUpzQjtBQUFBLFFBS3RCYyxhQUxzQixXQUt0QkEsYUFMc0I7QUFBQSxpQkFVcEIsT0FBS2pCLEtBVmU7QUFBQSxRQVF0QnlTLFlBUnNCLFVBUXRCQSxZQVJzQjtBQUFBLFFBU3RCRSxZQVRzQixVQVN0QkEsWUFUc0I7O0FBV3hCLFFBQU12RCxRQUFRO0FBQ1p1RSxlQUFTLE9BREc7QUFFWkMsY0FBUSxLQUZJO0FBR1pDLGdCQUFVLFVBSEU7QUFJWkMsV0FBUW5CLFlBQVIsT0FKWTtBQUtab0IsWUFBU3RCLFlBQVQ7QUFMWSxLQUFkO0FBT0EsUUFBTU8sZUFBZTlSLEtBQUs4UyxNQUFMLENBQVk7QUFBQSxhQUFLL1MsY0FBY3NOLFFBQWQsQ0FBdUIwRixFQUFFM1QsS0FBRixDQUFRSCxLQUFLd0ssU0FBYixDQUF2QixDQUFMO0FBQUEsS0FBWixDQUFyQjtBQUNBLFdBQ0U7QUFBQTtBQUFBLFFBQUksV0FBVSw2Q0FBZCxFQUE0RCxPQUFPeUUsS0FBbkU7QUFDSWhKLDBCQUFvQkEsaUJBQWlCcU4sR0FBckMsSUFBNENyTixpQkFBaUJxTixHQUFqQixDQUFxQixVQUFDUyxJQUFELEVBQU9DLENBQVAsRUFBYTtBQUFBLFlBQ3hFaE0sUUFEd0UsR0FDM0QrTCxJQUQyRCxDQUN4RS9MLFFBRHdFOztBQUU5RSxZQUFJLE9BQU8rTCxLQUFLL0wsUUFBWixLQUF5QixVQUE3QixFQUF5QztBQUN2Q0EscUJBQVcrTCxLQUFLL0wsUUFBTCxDQUFjbEgsYUFBZCxFQUE2QitSLFlBQTdCLENBQVg7QUFDRDtBQUNELGVBQ0U7QUFBQyxrQkFBRDtBQUFBO0FBQ0UsaUJBQUttQixDQURQLENBQ1U7QUFEVixjQUVFLFFBQVFELEtBQUt0RixNQUZmO0FBR0UscUJBQVNzRixLQUFLRSxPQUhoQjtBQUlFLHNCQUFVak0sUUFKWjtBQUtFLG1CQUFPK0wsS0FBS0csS0FMZDtBQU1FLHFCQUFVbE0sWUFBWSxDQUFDK0wsS0FBS25CLE9BQW5CLEdBQThCLElBQTlCLEdBQXFDLE9BQUtELDBCQUFMLENBQzVDb0IsS0FBS25CLE9BRHVDLEVBRTVDOVIsYUFGNEMsRUFHNUMrUixZQUg0QztBQU5oRDtBQVlJa0IsZUFBS3BMO0FBWlQsU0FERjtBQWdCRCxPQXJCNkM7QUFEaEQsS0FERjtBQTBCRCxHOztTQTV5Q2tCdkcsUSIsImZpbGUiOiJkYXRhZ3JpZC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1sb25lbHktaWYsIHByZWZlci10ZW1wbGF0ZSwgcmVhY3QvcmVxdWlyZS1kZWZhdWx0LXByb3BzICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTWFwLCBMaXN0IH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge1xuICBpbmplY3RJbnRsLFxuICBGb3JtYXR0ZWRNZXNzYWdlIGFzIE0sXG4gIEZvcm1hdHRlZE51bWJlciBhcyBOLFxufSBmcm9tICdyZWFjdC1pbnRsJztcbmltcG9ydCB7IENvbHVtbiwgQ2VsbCB9IGZyb20gJ2ZpeGVkLWRhdGEtdGFibGUtMic7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgTWVudUl0ZW0gfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBGbG9hdGluZ1NlbGVjdCB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWZsb2F0aW5nLXNlbGVjdCc7XG5pbXBvcnQgeyBEYXRlSW5wdXQgfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1kYXRldGltZSc7XG5pbXBvcnQgeyBJY29uIH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtaWNvbnMnO1xuaW1wb3J0IHsgU3Bpbm5lciB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXNwaW5uZXInO1xuaW1wb3J0IENoZWNrYm94IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWNoZWNrYm94JztcbmltcG9ydCB7IGZvcm1hdEN1cnJlbmN5QW1vdW50IH0gZnJvbSAnQG9wdXNjYXBpdGEvZm9ybWF0LXV0aWxzJztcbmltcG9ydCAnZml4ZWQtZGF0YS10YWJsZS0yL2Rpc3QvZml4ZWQtZGF0YS10YWJsZS5jc3MnO1xuXG5pbXBvcnQgUmVzcG9uc2l2ZUZpeGVkRGF0YVRhYmxlIGZyb20gJy4vcmVzcG9uc2l2ZS1maXhlZC1kYXRhLXRhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgSGVhZGVyQ2VsbCBmcm9tICcuL2hlYWRlci1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgQWN0aW9uQmFyIGZyb20gJy4vYWN0aW9uLWJhci5jb21wb25lbnQnO1xuaW1wb3J0IElubGluZUVkaXRDb250cm9scyBmcm9tICcuL2lubGluZS1lZGl0LWNvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgRmlsdGVyaW5nQ29udHJvbHMgZnJvbSAnLi9maWx0ZXJpbmctY29udHJvbHMuY29tcG9uZW50JztcbmltcG9ydCBEcm9wZG93bkNvbnRyb2xzIGZyb20gJy4vZHJvcGRvd24tY29udHJvbHMuY29tcG9uZW50JztcbmltcG9ydCAqIGFzIGRhdGFncmlkQWN0aW9ucyBmcm9tICcuL2RhdGFncmlkLmFjdGlvbnMnO1xuaW1wb3J0IENlbGxUb29sdGlwIGZyb20gJy4vY2VsbC10b29sdGlwLmNvbXBvbmVudCc7XG5pbXBvcnQgQ29sdW1uU2V0dGluZ3NNb2RhbCBmcm9tICcuL2NvbHVtbi1zZXR0aW5ncy9jb2x1bW4tc2V0dGluZ3MuY29tcG9uZW50JztcbmltcG9ydCB7IHByb3BUeXBlcywgZGVmYXVsdFByb3BzIH0gZnJvbSAnLi9kYXRhZ3JpZC5wcm9wcyc7XG5pbXBvcnQgeyBLRVlfQ09ERVMgfSBmcm9tICcuL2RhdGFncmlkLmNvbnN0YW50cyc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9kYXRhZ3JpZC51dGlscyc7XG5pbXBvcnQgJy4vZGF0YWdyaWQuY29tcG9uZW50LnNjc3MnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUsIG93blByb3BzKSA9PiB7XG4gIGNvbnN0IEdSSUQgPSBvd25Qcm9wcy5ncmlkO1xuICByZXR1cm4ge1xuICAgIGlzQnVzeTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2lzQnVzeSddLCB0cnVlKSxcbiAgICBpc0VkaXRpbmc6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdpc0VkaXRpbmcnXSwgZmFsc2UpLFxuICAgIGlzQ3JlYXRpbmc6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdpc0NyZWF0aW5nJ10sIGZhbHNlKSxcbiAgICBpc0ZpbHRlcmluZzpcbiAgICAgIHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnaXNGaWx0ZXJpbmcnXSwgZmFsc2UpLFxuICAgIGlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW46XG4gICAgICBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnY29sdW1uU2V0dGluZ3NNb2RhbCcsICdvcGVuJ10sIGZhbHNlKSxcbiAgICBzb3J0Q29sdW1uOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdzb3J0aW5nRGF0YScsICdzb3J0Q29sdW1uJ10sIG51bGwpLFxuICAgIHNvcnRPcmRlcjogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnc29ydGluZ0RhdGEnLCAnc29ydE9yZGVyJ10sIG51bGwpLFxuICAgIHZpc2libGVDb2x1bW5zOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICd2aXNpYmxlQ29sdW1ucyddLCBMaXN0KCkpLFxuICAgIGNvbHVtbldpZHRoczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnY29sdW1uV2lkdGhzJ10sIE1hcCgpKSxcbiAgICBzZWxlY3RlZENlbGw6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2VsZWN0ZWRDZWxsJ10sIE1hcCgpKSxcbiAgICBzZWxlY3RlZEl0ZW1zOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3NlbGVjdGVkSXRlbXMnXSwgTGlzdCgpKSxcbiAgICBkYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2RhdGEnXSwgTGlzdCgpKSxcbiAgICBlZGl0RGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdlZGl0RGF0YSddLCBNYXAoKSksXG4gICAgY3JlYXRlRGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjcmVhdGVEYXRhJ10sIExpc3QoKSksXG4gICAgZmlsdGVyRGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdmaWx0ZXJEYXRhJ10sIE1hcCgpKSxcbiAgICBjZWxsTWVzc2FnZXM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY2VsbE1lc3NhZ2VzJ10sIE1hcCgpKSxcbiAgICBjcmVhdGVDZWxsTWVzc2FnZXM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY3JlYXRlQ2VsbE1lc3NhZ2VzJ10sIE1hcCgpKSxcbiAgICBhbGxEYXRhU2l6ZTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdhbGxEYXRhJ10sIExpc3QoKSkuc2l6ZSxcbiAgICBsYW5ndWFnZTogVXRpbHMuZ2V0TGFuZ3VhZ2UoR1JJRCwgc3RhdGUudXNlciksXG4gICAgcmVnaW9uOiBVdGlscy5nZXRSZWdpb24oR1JJRCwgc3RhdGUudXNlciksXG4gICAgZGF0ZUZvcm1hdDogVXRpbHMuZ2V0RGF0ZUZvcm1hdChHUklELCBzdGF0ZS51c2VyKSxcbiAgICB0aG91c2FuZFNlcGFyYXRvcjogVXRpbHMuZ2V0VGhvdXNhbmRTZXBhcmF0b3IoR1JJRCwgc3RhdGUudXNlciksXG4gICAgZGVjaW1hbFNlcGFyYXRvcjogVXRpbHMuZ2V0RGVjaW1hbFNlcGFyYXRvcihHUklELCBzdGF0ZS51c2VyKSxcbiAgICBmb2N1c1R5cGU6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdmb2N1c1R5cGUnXSwgTWFwKCkpLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGF0YWdyaWRBY3Rpb25zO1xuXG5AaW5qZWN0SW50bFxuQGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRhR3JpZCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0gcHJvcFR5cGVzO1xuICBzdGF0aWMgZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjdXJyZW50Um93OiAwLFxuICAgICAgY3VycmVudENvbHVtbjogMCxcbiAgICB9O1xuICAgIHRoaXMuY2VsbFJlZnMgPSB7fTtcbiAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsID0gZmFsc2U7XG4gICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTsgLy8gVE9ETzogSGFuZGxlIGZvY3VzaW5nIHdoZW4gdHJ1ZVxuICAgIHRoaXMuZm9jdXNUb0Vycm9yQ2VsbCA9IGZhbHNlOyAvLyBUT0RPOiBIYW5kbGUgZm9jdXNpbmcgd2hlbiB0cnVlXG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25Eb2N1bWVudENsaWNrKTtcbiAgICB0aGlzLnByb3BzLmludmFsaWRhdGUodGhpcy5wcm9wcy5ncmlkKTtcbiAgfVxuXG4gIG9uRG9jdW1lbnRDbGljayA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5jb250ZXh0TWVudUl0ZW1zKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY29udGV4dE1lbnVPcGVuOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25Eb2N1bWVudENsaWNrKTtcbiAgfVxuXG4gIG9uQ29sdW1uUmVzaXplRW5kQ2FsbGJhY2sgPSAobmV3Q29sdW1uV2lkdGgsIGNvbHVtbktleSkgPT4ge1xuICAgIHRoaXMucHJvcHMucmVzaXplQ29sdW1uKHRoaXMucHJvcHMuZ3JpZCwgY29sdW1uS2V5LCBuZXdDb2x1bW5XaWR0aCk7XG4gIH1cblxuICBvbkNyZWF0ZUNlbGxLZXlEb3duID0gKGUpID0+IHtcbiAgICBpZiAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuRU5URVIpIHtcbiAgICAgIHRoaXMucHJvcHMuYWRkTmV3SXRlbSh0aGlzLnByb3BzLmdyaWQsIFV0aWxzLmdldENvbHVtbkRlZmF1bHRWYWx1ZXModGhpcy5wcm9wcy5jb2x1bW5zKSk7XG4gICAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBvbkVkaXRDZWxsS2V5RG93biA9IChjb2wsIHJvd0luZGV4KSA9PiAoZSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZUFycm93TmF2aWdhdGlvbikge1xuICAgICAgY29uc3QgeyBjb2x1bW5zIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3Qgcm93c1NpemUgPSB0aGlzLnByb3BzLmRhdGEuc2l6ZTtcbiAgICAgIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2wpO1xuICAgICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuRE9XTjoge1xuICAgICAgICAgIGlmIChjb2wudmFsdWVUeXBlICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgY29uc3QgbmV4dEVsZW1lbnQgPSB0aGlzLmNlbGxSZWZzW2Ake3RoaXMucHJvcHMuZ3JpZC5pZH1fJHtjb2x1bW5LZXl9XyR7cm93SW5kZXggKyAxfWBdO1xuICAgICAgICAgICAgdGhpcy5tb3ZlQ2VsbEZvY3VzKG5leHRFbGVtZW50LCByb3dJbmRleCArIDEsIC0xKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuVVA6IHtcbiAgICAgICAgICBpZiAoY29sLnZhbHVlVHlwZSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGNvbnN0IG5leHRFbGVtZW50ID0gdGhpcy5jZWxsUmVmc1tgJHt0aGlzLnByb3BzLmdyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4IC0gMX1gXTtcbiAgICAgICAgICAgIHRoaXMubW92ZUNlbGxGb2N1cyhuZXh0RWxlbWVudCwgcm93SW5kZXggLSAxLCAtMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLlRBQjpcbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuUklHSFQ6XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLkxFRlQ6IHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgbGV0IGNvbHVtbkluZCA9IGNvbHVtbnMuZmluZEluZGV4KGMgPT4gYy52YWx1ZUtleVBhdGguam9pbignLycpID09PSBjb2x1bW5LZXkpO1xuICAgICAgICAgIGlmIChjb2x1bW5JbmQgIT09IC0xKSB7XG4gICAgICAgICAgICBsZXQgZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgbGV0IG5leHRFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIGxldCByb3dJbmQgPSByb3dJbmRleDtcbiAgICAgICAgICAgIHdoaWxlIChkaXNhYmxlZCkge1xuICAgICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuTEVGVCB8fCAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuVEFCICYmIGUuc2hpZnRLZXkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbHVtbkluZCAtIDEgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kIC09IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyb3dJbmQgLSAxID49IDApIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCA9IGNvbHVtbnMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAgIHJvd0luZCAtPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbHVtbkluZCArIDEgPCBjb2x1bW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kICs9IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyb3dJbmQgKyAxIDwgcm93c1NpemUpIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCA9IDA7XG4gICAgICAgICAgICAgICAgICByb3dJbmQgKz0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnN0IG5leHRDb2x1bW5LZXkgPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sdW1uc1tjb2x1bW5JbmRdKTtcbiAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSB0aGlzLmNlbGxSZWZzW2Ake3RoaXMucHJvcHMuZ3JpZC5pZH1fJHtuZXh0Q29sdW1uS2V5fV8ke3Jvd0luZH1gXTtcbiAgICAgICAgICAgICAgZGlzYWJsZWQgPSBuZXh0RWxlbWVudCA/IG5leHRFbGVtZW50LmRpc2FibGVkIDogZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWRpc2FibGVkICYmIG5leHRFbGVtZW50KSB7XG4gICAgICAgICAgICAgIHRoaXMubW92ZUNlbGxGb2N1cyhuZXh0RWxlbWVudCwgcm93SW5kLCBjb2x1bW5JbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uRmlsdGVyQ2VsbFZhbHVlQ2hhbmdlID0gKGNvbCwgdmFsdWVQYXJzZXIpID0+IChldmVudE9yRGF0YSkgPT4ge1xuICAgIGxldCByYXdWYWx1ZTtcbiAgICAvLyBldmVudE9yRGF0YSBjYW4gYmUgaW5wdXQgb25DaGFuZ2UgZXZlbnQsIHJlYWN0LXNlbGVjdCBvbkNoYW5nZSBvciByZWFjdC1kYXktcGlja2VyIG9uQ2hhbmdlXG4gICAgaWYgKGV2ZW50T3JEYXRhKSB7XG4gICAgICBpZiAoZXZlbnRPckRhdGEudGFyZ2V0ICE9PSB1bmRlZmluZWQpIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlO1xuICAgICAgZWxzZSBpZiAoZXZlbnRPckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkgcmF3VmFsdWUgPSBldmVudE9yRGF0YS52YWx1ZTtcbiAgICAgIGVsc2UgcmF3VmFsdWUgPSBldmVudE9yRGF0YTtcbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSB2YWx1ZVBhcnNlcihyYXdWYWx1ZSk7XG4gICAgdGhpcy5wcm9wcy5maWx0ZXJDZWxsVmFsdWVDaGFuZ2UoXG4gICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICB0aGlzLnByb3BzLmNvbHVtbnMsXG4gICAgICBjb2wsXG4gICAgICB2YWx1ZSxcbiAgICApO1xuICB9XG5cbiAgb25DcmVhdGVDZWxsVmFsdWVDaGFuZ2UgPSAocm93SW5kZXgsIGNvbCwgdmFsdWVQYXJzZXIpID0+IChldmVudE9yRGF0YSkgPT4ge1xuICAgIGxldCByYXdWYWx1ZTtcbiAgICAvLyBldmVudE9yRGF0YSBjYW4gYmUgaW5wdXQgb25DaGFuZ2UgZXZlbnQsIHJlYWN0LXNlbGVjdCBvbkNoYW5nZSBvciByZWFjdC1kYXktcGlja2VyIG9uQ2hhbmdlXG4gICAgaWYgKGV2ZW50T3JEYXRhKSB7XG4gICAgICBpZiAoZXZlbnRPckRhdGEudGFyZ2V0ICE9PSB1bmRlZmluZWQpIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlO1xuICAgICAgZWxzZSBpZiAoZXZlbnRPckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkgcmF3VmFsdWUgPSBldmVudE9yRGF0YS52YWx1ZTtcbiAgICAgIGVsc2UgcmF3VmFsdWUgPSBldmVudE9yRGF0YTtcbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSB2YWx1ZVBhcnNlcihyYXdWYWx1ZSk7XG4gICAgdGhpcy5wcm9wcy5jcmVhdGVDZWxsVmFsdWVDaGFuZ2UodGhpcy5wcm9wcy5ncmlkLCByb3dJbmRleCwgY29sLnZhbHVlS2V5UGF0aCwgdmFsdWUpO1xuICAgIGlmIChjb2wub25DcmVhdGVWYWx1ZUNoYW5nZSkge1xuICAgICAgY29sLm9uQ3JlYXRlVmFsdWVDaGFuZ2UodmFsdWUsIGNvbC52YWx1ZUtleVBhdGgsIHJvd0luZGV4KTtcbiAgICB9XG4gICAgaWYgKGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZSAmJiB2YWx1ZSA9PT0gY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm1hdGNoVmFsdWUpIHtcbiAgICAgIC8vIENhbGwgc3BlY2lhbCBwYWlyZWQgdmFsdWUgY2hhbmdlIG9uIG90aGVyIGNlbGwgaWYgdmFsdWUgbWF0Y2hlc1xuICAgICAgdGhpcy5vbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZShcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIHsgdmFsdWVLZXlQYXRoOiBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWVLZXlQYXRoIH0sXG4gICAgICAgIHYgPT4gdixcbiAgICAgICkoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm5ld1ZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNvbC52YWxpZGF0b3JzKSB7XG4gICAgICB0aGlzLnByb3BzLmNyZWF0ZUNlbGxWYWx1ZVZhbGlkYXRlKFxuICAgICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICBjb2wudmFsdWVLZXlQYXRoLFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgY29sLnZhbGlkYXRvcnMsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIG9uRWRpdENlbGxWYWx1ZUNoYW5nZSA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGV2ZW50T3JEYXRhKSA9PiB7XG4gICAgY29uc3QgZGF0YUlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICBsZXQgcmF3VmFsdWU7XG4gICAgLy8gZXZlbnRPckRhdGEgY2FuIGJlIGlucHV0IG9uQ2hhbmdlIGV2ZW50LCByZWFjdC1zZWxlY3Qgb25DaGFuZ2Ugb3IgcmVhY3QtZGF5LXBpY2tlciBvbkNoYW5nZVxuICAgIGlmIChldmVudE9yRGF0YSkge1xuICAgICAgaWYgKGV2ZW50T3JEYXRhLnRhcmdldCAhPT0gdW5kZWZpbmVkKSByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZTtcbiAgICAgIGVsc2UgaWYgKGV2ZW50T3JEYXRhLnZhbHVlICE9PSB1bmRlZmluZWQpIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudmFsdWU7XG4gICAgICBlbHNlIHJhd1ZhbHVlID0gZXZlbnRPckRhdGE7XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlID0gdmFsdWVQYXJzZXIocmF3VmFsdWUpO1xuICAgIHRoaXMucHJvcHMuZWRpdENlbGxWYWx1ZUNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIGRhdGFJZCwgY29sLnZhbHVlS2V5UGF0aCwgdmFsdWUpO1xuICAgIGlmIChjb2wub25FZGl0VmFsdWVDaGFuZ2UpIHtcbiAgICAgIGNvbC5vbkVkaXRWYWx1ZUNoYW5nZSh2YWx1ZSwgY29sLnZhbHVlS2V5UGF0aCwgcm93SW5kZXgsIGRhdGFJZCk7XG4gICAgfVxuICAgIGlmIChjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUgJiYgdmFsdWUgPT09IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5tYXRjaFZhbHVlKSB7XG4gICAgICAvLyBDYWxsIHNwZWNpYWwgcGFpcmVkIHZhbHVlIGNoYW5nZSBvbiBvdGhlciBjZWxsIGlmIHZhbHVlIG1hdGNoZXNcbiAgICAgIHRoaXMub25FZGl0Q2VsbFZhbHVlQ2hhbmdlKFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgeyB2YWx1ZUtleVBhdGg6IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5uZXdWYWx1ZUtleVBhdGggfSxcbiAgICAgICAgdiA9PiB2LFxuICAgICAgKShjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY29sLnZhbGlkYXRvcnMpIHtcbiAgICAgIHRoaXMucHJvcHMuZWRpdENlbGxWYWx1ZVZhbGlkYXRlKFxuICAgICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICAgIGRhdGFJZCxcbiAgICAgICAgY29sLnZhbHVlS2V5UGF0aCxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIGNvbC52YWxpZGF0b3JzLFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBvbkNyZWF0ZUNlbGxCbHVyID0gKHJvd0luZGV4LCBjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZSkgPT4ge1xuICAgIGlmIChjb2wub25DcmVhdGVCbHVyKSB7XG4gICAgICBsZXQgdmFsdWUgPSAoZSAmJiBlLnRhcmdldCAmJiBlLnRhcmdldC52YWx1ZSAhPT0gdW5kZWZpbmVkKSA/XG4gICAgICAgIGUudGFyZ2V0LnZhbHVlIDpcbiAgICAgICAgdGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpO1xuICAgICAgaWYgKHZhbHVlUGFyc2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZVBhcnNlcih2YWx1ZSk7XG4gICAgICB9XG4gICAgICBjb2wub25DcmVhdGVCbHVyKHZhbHVlLCByb3dJbmRleCk7XG4gICAgfVxuICB9XG5cbiAgb25FZGl0Q2VsbEJsdXIgPSAocm93SW5kZXgsIGNvbCwgdmFsdWVQYXJzZXIpID0+IChlKSA9PiB7XG4gICAgaWYgKGNvbC5vbkVkaXRCbHVyKSB7XG4gICAgICBsZXQgdmFsdWUgPSAoZSAmJiBlLnRhcmdldCAmJiBlLnRhcmdldC52YWx1ZSAhPT0gdW5kZWZpbmVkKSA/XG4gICAgICAgIGUudGFyZ2V0LnZhbHVlIDpcbiAgICAgICAgdGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpO1xuICAgICAgaWYgKHZhbHVlUGFyc2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZVBhcnNlcih2YWx1ZSk7XG4gICAgICB9XG4gICAgICBjb25zdCBkYXRhSWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgICAgY29sLm9uRWRpdEJsdXIodmFsdWUsIHJvd0luZGV4LCBkYXRhSWQpO1xuICAgIH1cbiAgfVxuXG4gIG9uQ2VsbEZvY3VzID0gKGNlbGxUeXBlLCBpbnB1dFR5cGUsIHJvd0luZGV4LCBjb2x1bW5LZXkpID0+IChlKSA9PiB7XG4gICAgaWYgKGlucHV0VHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIGUudGFyZ2V0LnNlbGVjdCgpO1xuICAgIH1cbiAgICBpZiAoY2VsbFR5cGUgPT09ICdlZGl0JyAmJiB0aGlzLnByb3BzLmNlbGxTZWxlY3QpIHtcbiAgICAgIHRoaXMucHJvcHMuY2VsbFNlbGVjdGlvbkNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIE1hcCh7IHJvd0luZGV4LCBjb2x1bW5LZXkgfSkpO1xuICAgIH1cbiAgfVxuXG4gIGdldERhdGFJZEJ5Um93SW5kZXggPSByb3dJbmRleCA9PlxuICAgIHRoaXMucHJvcHMuZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLnRoaXMucHJvcHMuZ3JpZC5pZEtleVBhdGhdKTtcblxuICBnZXRTZWxlY3RlZEl0ZW1JbmRleCA9IChpZCkgPT4ge1xuICAgIGlmICghaWQpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnByb3BzLmRhdGEuZmluZEluZGV4KHYgPT4gdi5nZXRJbih0aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoKSA9PT0gaWQpO1xuICAgIHJldHVybiBpbmRleCA9PT0gLTEgPyB1bmRlZmluZWQgOiBpbmRleDtcbiAgfVxuXG4gIGdldEVkaXRJdGVtVmFsdWUgPSAocm93SW5kZXgsIGNvbCkgPT4ge1xuICAgIC8vIEdldCB0aGUgdmFsdWUgdG8gZGlzcGxheSBpbiBlZGl0IGNlbGxcbiAgICBjb25zdCBpZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgY29uc3QgZWRpdFZhbHVlID0gdGhpcy5wcm9wcy5lZGl0RGF0YS5nZXRJbihbaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdLCB1bmRlZmluZWQpO1xuICAgIGxldCBvcmlnaW5hbFZhbHVlO1xuICAgIGlmIChlZGl0VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgb3JpZ2luYWxWYWx1ZSA9IHRoaXMucHJvcHMuZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdLCAnJyk7XG4gICAgfSBlbHNlIGlmIChlZGl0VmFsdWUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGVkaXRWYWx1ZTtcbiAgICB9XG4gICAgaWYgKG9yaWdpbmFsVmFsdWUgPT09IG51bGwgfHwgb3JpZ2luYWxWYWx1ZSA9PT0gdW5kZWZpbmVkIHx8IG9yaWdpbmFsVmFsdWUgPT09ICcnKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIC8vIFNwZWNpYWwgZm9ybWF0dGluZyBieSBjb21wb25lbnQgdHlwZVxuICAgIGlmIChcbiAgICAgIGNvbC5jb21wb25lbnRUeXBlID09PSAnZmxvYXQnICYmXG4gICAgICBTdHJpbmcob3JpZ2luYWxWYWx1ZSkubGVuZ3RoID4gMFxuICAgICkge1xuICAgICAgcmV0dXJuIFN0cmluZyhvcmlnaW5hbFZhbHVlKS5yZXBsYWNlKCcuJywgdGhpcy5wcm9wcy5kZWNpbWFsU2VwYXJhdG9yKTtcbiAgICB9XG4gICAgcmV0dXJuIG9yaWdpbmFsVmFsdWU7XG4gIH1cblxuICBnZXRDcmVhdGVJdGVtVmFsdWUgPSAocm93SW5kZXgsIGNvbCkgPT4ge1xuICAgIGNvbnN0IHZhbCA9IHRoaXMucHJvcHMuY3JlYXRlRGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdLCAnJyk7XG4gICAgaWYgKHZhbCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gdmFsO1xuICB9XG5cbiAgZ2V0RmlsdGVySXRlbVZhbHVlID0gKGNvbCkgPT4ge1xuICAgIGNvbnN0IHZhbCA9IHRoaXMucHJvcHMuZmlsdGVyRGF0YS5nZXQoVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCksICcnKTtcbiAgICBpZiAodmFsID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHJldHVybiB2YWw7XG4gIH1cblxuICBnZXRDb21wb25lbnREaXNhYmxlZFN0YXRlID0gKHJvd0luZGV4LCBjb2wsIG1vZGUpID0+IHtcbiAgICBsZXQgY29tcG9uZW50RGlzYWJsZWQgPSAhIWNvbC5kaXNhYmxlRWRpdGluZztcbiAgICAvLyBjaGVjayBpZiBjb21wb25lbnQgaXMgZGlzYWJsZWQgYnkgb3RoZXIgY29sdW1uIGRhdGFcbiAgICBpZiAoIWNvbXBvbmVudERpc2FibGVkICYmIGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaCkge1xuICAgICAgaWYgKG1vZGUgPT09ICdjcmVhdGUnKSB7XG4gICAgICAgIGNvbXBvbmVudERpc2FibGVkID0gdGhpcy5nZXRDcmVhdGVJdGVtVmFsdWUoXG4gICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgeyB2YWx1ZUtleVBhdGg6IGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaC5tYXRjaFZhbHVlS2V5UGF0aCB9LFxuICAgICAgICApID09PSBjb2wuZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2gubWF0Y2hWYWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbXBvbmVudERpc2FibGVkID0gdGhpcy5nZXRFZGl0SXRlbVZhbHVlKFxuICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgIHsgdmFsdWVLZXlQYXRoOiBjb2wuZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2gubWF0Y2hWYWx1ZUtleVBhdGggfSxcbiAgICAgICAgKSA9PT0gY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb21wb25lbnREaXNhYmxlZDtcbiAgfVxuXG4gIGdldFJvd0NsYXNzTmFtZSA9IChyb3dJbmRleCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGdyaWQsXG4gICAgICBpc0NyZWF0aW5nLFxuICAgICAgaXNFZGl0aW5nLFxuICAgICAgY3JlYXRlRGF0YSxcbiAgICAgIHNlbGVjdGVkSXRlbXMsXG4gICAgICBkYXRhLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHJvd0NsYXNzTmFtZXMgPSBbJ29jLWRhdGFncmlkLXJvdyddO1xuICAgIGxldCBleHRyYVJvd0NvdW50ID0gMDsgLy8gaG93IG1hbnkgcm93cyB0byBpZ25vcmUgZnJvbSB0b3AsIG5ldyArIGZpbHRlciByb3dzXG4gICAgaWYgKGlzQ3JlYXRpbmcpIGV4dHJhUm93Q291bnQgPSBjcmVhdGVEYXRhLnNpemU7XG4gICAgaWYgKGlzQ3JlYXRpbmcpIHtcbiAgICAgIGlmIChyb3dJbmRleCA8PSAoZXh0cmFSb3dDb3VudCAtIDEpKSB7XG4gICAgICAgIHJvd0NsYXNzTmFtZXMucHVzaCgnb2MtZGF0YWdyaWQtcm93LW5ldycpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNFZGl0aW5nKSB7XG4gICAgICByb3dDbGFzc05hbWVzLnB1c2goJ29jLWRhdGFncmlkLXJvdy1lZGl0Jyk7XG4gICAgfVxuXG5cbiAgICAvLyBjaGVjayBpZiByb3cgaXMgc2VsZWN0ZWRcbiAgICBpZiAoKCFpc0NyZWF0aW5nICYmICFpc0VkaXRpbmcpICYmXG4gICAgICAgIChzZWxlY3RlZEl0ZW1zICYmIGdyaWQuaWRLZXlQYXRoKSkge1xuICAgICAgaWYgKFxuICAgICAgICBzZWxlY3RlZEl0ZW1zLmluZGV4T2YoZGF0YS5nZXRJbihbcm93SW5kZXggLSBleHRyYVJvd0NvdW50LCAuLi5ncmlkLmlkS2V5UGF0aF0pKSAhPT0gLTFcbiAgICAgICkge1xuICAgICAgICByb3dDbGFzc05hbWVzLnB1c2goJ2lzLXNlbGVjdGVkJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcHMucm93Q2xhc3NOYW1lR2V0dGVyKSB7XG4gICAgICByZXR1cm4gcm93Q2xhc3NOYW1lcy5qb2luKCcgJykgKyAnICcgKyB0aGlzLnByb3BzLnJvd0NsYXNzTmFtZUdldHRlcihyb3dJbmRleCk7XG4gICAgfVxuICAgIHJldHVybiByb3dDbGFzc05hbWVzLmpvaW4oJyAnKTtcbiAgfVxuXG4gIGdldENlbGxNZXNzYWdlcyA9IChyb3dJbmRleCwgY29sLCBjZWxsVHlwZSkgPT4ge1xuICAgIGNvbnN0IHJldHVybkRhdGEgPSB7fTtcbiAgICBpZiAoIXRoaXMucHJvcHMuZ3JpZC5pZEtleVBhdGggfHwgIWNvbC52YWx1ZUtleVBhdGgpIHtcbiAgICAgIHJldHVybiByZXR1cm5EYXRhO1xuICAgIH1cbiAgICBsZXQgaW5mb01lc3NhZ2U7XG4gICAgbGV0IGVycm9yTWVzc2FnZTtcbiAgICBsZXQgd2FybmluZ01lc3NhZ2U7XG4gICAgaWYgKGNlbGxUeXBlID09PSAnY3JlYXRlJykge1xuICAgICAgaW5mb01lc3NhZ2UgPSB0aGlzLnByb3BzLmNyZWF0ZUNlbGxNZXNzYWdlcy5nZXRJbihbJ2luZm8nLCByb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgZXJyb3JNZXNzYWdlID0gdGhpcy5wcm9wcy5jcmVhdGVDZWxsTWVzc2FnZXMuZ2V0SW4oWydlcnJvcicsIHJvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgICB3YXJuaW5nTWVzc2FnZSA9IHRoaXMucHJvcHMuY3JlYXRlQ2VsbE1lc3NhZ2VzLmdldEluKFsnd2FybmluZycsIHJvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICAgIGluZm9NZXNzYWdlID0gdGhpcy5wcm9wcy5jZWxsTWVzc2FnZXMuZ2V0SW4oWydpbmZvJywgaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgIGVycm9yTWVzc2FnZSA9IHRoaXMucHJvcHMuY2VsbE1lc3NhZ2VzLmdldEluKFsnZXJyb3InLCBpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgd2FybmluZ01lc3NhZ2UgPSB0aGlzLnByb3BzLmNlbGxNZXNzYWdlcy5nZXRJbihbJ3dhcm5pbmcnLCBpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgIH1cbiAgICBpZiAoaW5mb01lc3NhZ2UpIHtcbiAgICAgIHJldHVybkRhdGEuaW5mb01lc3NhZ2UgPSBpbmZvTWVzc2FnZTtcbiAgICB9XG4gICAgaWYgKGVycm9yTWVzc2FnZSkge1xuICAgICAgcmV0dXJuRGF0YS5lcnJvck1lc3NhZ2UgPSBlcnJvck1lc3NhZ2U7XG4gICAgfVxuICAgIGlmICh3YXJuaW5nTWVzc2FnZSkge1xuICAgICAgcmV0dXJuRGF0YS53YXJuaW5nTWVzc2FnZSA9IHdhcm5pbmdNZXNzYWdlO1xuICAgIH1cbiAgICByZXR1cm4gcmV0dXJuRGF0YTtcbiAgfVxuXG4gIGdldFNjcm9sbFRvUm93ID0gKCkgPT4ge1xuICAgIGxldCBzY3JvbGxUb1JvdztcbiAgICBpZiAodGhpcy5wcm9wcy5pc0NyZWF0aW5nICYmICF0aGlzLmZvY3VzVG9DcmVhdGVDZWxsKSByZXR1cm4gc2Nyb2xsVG9Sb3c7XG4gICAgaWYgKHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwpIHtcbiAgICAgIGNvbnN0IHNjcm9sbE5ld1JvdyA9IHRoaXMucHJvcHMuY3JlYXRlRGF0YS5zaXplIC0gMTtcbiAgICAgIGlmIChzY3JvbGxOZXdSb3cgPj0gMCkge1xuICAgICAgICBzY3JvbGxUb1JvdyA9IHNjcm9sbE5ld1JvdztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMucHJvcHMuaXNFZGl0aW5nKSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gdGhpcy5zdGF0ZS5jdXJyZW50Um93O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2Nyb2xsVG9Sb3cgPSB0aGlzLnByb3BzLnNjcm9sbFRvUm93OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICB9XG4gICAgICBpZiAoc2Nyb2xsVG9Sb3cgPT09IHVuZGVmaW5lZCAmJiB0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuc2l6ZSA+IDApIHtcbiAgICAgICAgc2Nyb2xsVG9Sb3cgPSB0aGlzLmdldFNlbGVjdGVkSXRlbUluZGV4KHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5maXJzdCgpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNjcm9sbFRvUm93O1xuICB9XG5cbiAgc2V0Rm9jdXNUbyA9IChmb2N1c1RvKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuaXNFZGl0aW5nIHx8IHRoaXMucHJvcHMuaXNDcmVhdGluZykge1xuICAgICAgaWYgKGZvY3VzVG8gJiYgZm9jdXNUby5nZXQoJ3R5cGUnKSAmJiBmb2N1c1RvICE9PSB0aGlzLnByZXZGb2N1c1RvKSB7XG4gICAgICAgIHRoaXNbZm9jdXNUby5nZXQoJ3R5cGUnKV0gPSB0cnVlO1xuICAgICAgICB0aGlzLmZvY3VzVG9MYXN0Um93ID0gZm9jdXNUby5nZXQoJ2ZvY3VzVG9MYXN0Um93Jyk7XG4gICAgICAgIHRoaXMucHJldkZvY3VzVG8gPSBmb2N1c1RvO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUNlbGxTZWxlY3QgPSAoY2VsbFR5cGUsIHJvd0luZGV4LCBjb2x1bW5LZXkpID0+ICgpID0+IHtcbiAgICBpZiAoY2VsbFR5cGUgPT09ICd2aWV3JyAmJiB0aGlzLnByb3BzLmNlbGxTZWxlY3QpIHtcbiAgICAgIHRoaXMucHJvcHMuY2VsbFNlbGVjdGlvbkNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIE1hcCh7IHJvd0luZGV4LCBjb2x1bW5LZXkgfSkpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUNyZWF0ZUNlbGxSZWYgPSAocm93SW5kZXgsIGNvbCkgPT4gKHJlZikgPT4ge1xuICAgIC8vIEZvY3VzIHRvIGNyZWF0ZSBjZWxsXG4gICAgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5jcmVhdGVEYXRhLnNpemUgJiZcbiAgICAgIHRoaXMucHJvcHMuY3JlYXRlRGF0YS5zaXplID09PSByb3dJbmRleCArIDEgJiZcbiAgICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgJiZcbiAgICAgICF0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2NyZWF0ZScpXG4gICAgKSB7XG4gICAgICByZWYuZm9jdXMoKTtcbiAgICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVFZGl0Q2VsbFJlZiA9IChyb3dJbmRleCwgY29sKSA9PiAocmVmKSA9PiB7XG4gICAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCk7XG4gICAgaWYgKHRoaXMuZm9jdXNUb0VkaXRDZWxsICYmICF0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2VkaXQnKSkge1xuICAgICAgY29uc3Qgc2VsZWN0ZWRSb3dJbmRleCA9IHRoaXMuZm9jdXNUb0xhc3RSb3cgJiYgdGhpcy5wcm9wcy5kYXRhLnNpemUgPiAwID9cbiAgICAgICAgdGhpcy5wcm9wcy5kYXRhLnNpemUgLSAxIDogdGhpcy5nZXRTZWxlY3RlZEl0ZW1JbmRleCh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuZmlyc3QoKSk7XG5cbiAgICAgIGNvbnN0IHsgc2VsZWN0ZWRDZWxsIH0gPSB0aGlzLnByb3BzO1xuICAgICAgaWYgKHNlbGVjdGVkQ2VsbC5zaXplID4gMCkge1xuICAgICAgICBpZiAoc2VsZWN0ZWRDZWxsLmdldCgncm93SW5kZXgnKSA9PT0gcm93SW5kZXggJiYgc2VsZWN0ZWRDZWxsLmdldCgnY29sdW1uS2V5JykgPT09IGNvbHVtbktleSkge1xuICAgICAgICAgIHJlZi5mb2N1cygpO1xuICAgICAgICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5mb2N1c1RvTGFzdFJvdyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHNlbGVjdGVkUm93SW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZvY3VzVG9MYXN0Um93ID0gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKHNlbGVjdGVkUm93SW5kZXggPT09IHJvd0luZGV4KSB7XG4gICAgICAgIHJlZi5mb2N1cygpO1xuICAgICAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZvY3VzVG9MYXN0Um93ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZUFycm93TmF2aWdhdGlvbikge1xuICAgICAgdGhpcy5jZWxsUmVmc1tgJHt0aGlzLnByb3BzLmdyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4fWBdID0gcmVmO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVDZWxsRm9jdXMgPSAobmV4dEVsZW1lbnQsIHJvd0luZGV4LCBjb2x1bW5JbmRleCkgPT4ge1xuICAgIGlmIChuZXh0RWxlbWVudCAmJiAobmV4dEVsZW1lbnQudHlwZSA9PT0gJ3RleHQnIHx8IG5leHRFbGVtZW50LnR5cGUgPT09ICdudW1iZXInKSkge1xuICAgICAgaWYgKHJvd0luZGV4ICE9PSAtMSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgY3VycmVudFJvdzogcm93SW5kZXggfSk7XG4gICAgICB9XG4gICAgICBpZiAoY29sdW1uSW5kZXggIT09IC0xKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjdXJyZW50Q29sdW1uOiBjb2x1bW5JbmRleCB9KTtcbiAgICAgIH1cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gbmV4dEVsZW1lbnQuc2VsZWN0KCksIDUwKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVTZWxlY3Rpb25DaGVja0JveE9uQ2hhbmdlID0gcm93SW5kZXggPT4gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMuaXRlbVNlbGVjdGlvbkNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIHJvd0luZGV4LCB0cnVlLCBmYWxzZSk7XG4gIH1cblxuICBnZW5lcmF0ZUNvbHVtbnMgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBleHRyYUNvbHVtbiB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBjb2x1bW5zID0gW107XG4gICAgY29uc3QgdGFiSW5kZXggPSBTdHJpbmcodGhpcy5wcm9wcy50YWJJbmRleCk7XG4gICAgaWYgKGV4dHJhQ29sdW1uKSB7XG4gICAgICBjb2x1bW5zLnB1c2goe1xuICAgICAgICB3aWR0aDogZXh0cmFDb2x1bW4ud2lkdGggfHwgNDAsXG4gICAgICAgIGlzUmVzaXphYmxlOiAhIWV4dHJhQ29sdW1uLmlzUmVzaXphYmxlLFxuICAgICAgICBpc1NvcnRhYmxlOiBmYWxzZSxcbiAgICAgICAgY29sdW1uS2V5OiAnZXh0cmFDb2x1bW4nLFxuICAgICAgICBjZWxsOiByb3dJbmRleCA9PiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1leHRyYS1jb2x1bW4tY2VsbCBuby1yb3ctc2VsZWN0XCI+XG4gICAgICAgICAgICB7IGV4dHJhQ29sdW1uLnZhbHVlUmVuZGVyKHRoaXMucHJvcHMuZGF0YS5nZXQocm93SW5kZXgpLCB0YWJJbmRleCkgfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApLFxuICAgICAgICBjZWxsRWRpdDogcm93SW5kZXggPT4gKGV4dHJhQ29sdW1uLmNlbGxFZGl0ID8gZXh0cmFDb2x1bW4uY2VsbEVkaXQocm93SW5kZXgpIDogbnVsbCksXG4gICAgICAgIGNlbGxDcmVhdGU6IHJvd0luZGV4ID0+IChleHRyYUNvbHVtbi5jZWxsQ3JlYXRlID8gZXh0cmFDb2x1bW4uY2VsbENyZWF0ZShyb3dJbmRleCkgOiBudWxsKSxcbiAgICAgICAgY2VsbEZpbHRlcjogcm93SW5kZXggPT4gKGV4dHJhQ29sdW1uLmNlbGxGaWx0ZXIgPyBleHRyYUNvbHVtbi5jZWxsRmlsdGVyKHJvd0luZGV4KSA6IG51bGwpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcHMucm93U2VsZWN0Q2hlY2tib3hDb2x1bW4pIHtcbiAgICAgIGNvbHVtbnMucHVzaCh7XG4gICAgICAgIHdpZHRoOiA0MCxcbiAgICAgICAgaXNSZXNpemFibGU6IGZhbHNlLFxuICAgICAgICBpc1NvcnRhYmxlOiBmYWxzZSxcbiAgICAgICAgY29sdW1uS2V5OiAnc2VsZWN0aW9uQ2hlY2tib3gnLFxuICAgICAgICBjZWxsOiAocm93SW5kZXgpID0+IHtcbiAgICAgICAgICBjb25zdCByb3dJdGVtID0gdGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCk7XG4gICAgICAgICAgY29uc3QgaXRlbUlkID0gcm93SXRlbS5nZXRJbih0aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoKTtcbiAgICAgICAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhpdGVtSWQpO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkU2VsZWN0Q2hlY2tCb3gtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtc2VsZWN0LWNoZWNrYm94LWNlbGwgbm8tcm93LXNlbGVjdFwiXG4gICAgICAgICAgICAgIGNoZWNrZWQ9e3NlbGVjdGVkfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVTZWxlY3Rpb25DaGVja0JveE9uQ2hhbmdlKHJvd0luZGV4KX1cbiAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICBjZWxsRWRpdDogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbENyZWF0ZTogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbEZpbHRlcjogKCkgPT4gbnVsbCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHZpc2libGVDb2x1bW5zID0gW107XG4gICAgdGhpcy5wcm9wcy52aXNpYmxlQ29sdW1ucy5mb3JFYWNoKCh2aXNpYmxlQ29sdW1uS2V5KSA9PiB7XG4gICAgICB0aGlzLnByb3BzLmNvbHVtbnMuZm9yRWFjaCgob3JnQ29sKSA9PiB7XG4gICAgICAgIGlmIChVdGlscy5nZXRDb2x1bW5LZXkob3JnQ29sKSA9PT0gdmlzaWJsZUNvbHVtbktleSkge1xuICAgICAgICAgIHZpc2libGVDb2x1bW5zLnB1c2gob3JnQ29sKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgdmlzaWJsZUNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICBjb25zdCBjb2x1bW4gPSB7XG4gICAgICAgIGhlYWRlcjogY29sLmhlYWRlcixcbiAgICAgICAgY29sdW1uS2V5OiBVdGlscy5nZXRDb2x1bW5LZXkoY29sKSxcbiAgICAgICAgd2lkdGg6IChjb2wud2lkdGggfHwgY29sLndpZHRoID09PSAwID8gY29sLndpZHRoIDogMjAwKSxcbiAgICAgICAgbWluV2lkdGg6IChjb2wubWluV2lkdGggfHwgY29sLm1pbldpZHRoID09PSAwID8gY29sLm1pbldpZHRoIDogNDApLFxuICAgICAgICBtYXhXaWR0aDogY29sLm1heFdpZHRoLFxuICAgICAgICBpc1Jlc2l6YWJsZTogIWNvbC5kaXNhYmxlUmVzaXppbmcsXG4gICAgICAgIGZpeGVkOiAhIWNvbC5maXhlZCxcbiAgICAgICAgYWxsb3dDZWxsc1JlY3ljbGluZzogISFjb2wuYWxsb3dDZWxsc1JlY3ljbGluZyxcbiAgICAgICAgZGlzYWJsZVNvcnRpbmc6ICEhY29sLmRpc2FibGVTb3J0aW5nLFxuICAgICAgICBpc1JlcXVpcmVkOiAhIWNvbC5pc1JlcXVpcmVkLFxuICAgICAgICBjb21wb25lbnRUeXBlOiBjb2wuY29tcG9uZW50VHlwZSxcbiAgICAgICAgc3R5bGU6IFV0aWxzLmdldENlbGxTdHlsZUJ5Q29sKGNvbCksXG4gICAgICB9O1xuICAgICAgaWYgKGNvbC52YWx1ZUtleVBhdGgpIHtcbiAgICAgICAgY29sdW1uLnZhbHVlS2V5UGF0aCA9IGNvbC52YWx1ZUtleVBhdGg7XG4gICAgICB9XG4gICAgICBpZiAoY29sLmZsZXhHcm93KSB7XG4gICAgICAgIGNvbHVtbi5mbGV4R3JvdyA9IGNvbC5mbGV4R3JvdztcbiAgICAgIH1cbiAgICAgIGlmIChjb2wudmFsdWVUeXBlKSB7XG4gICAgICAgIGNvbHVtbi52YWx1ZVR5cGUgPSBjb2wudmFsdWVUeXBlO1xuICAgICAgfVxuICAgICAgaWYgKGNvbC5zb3J0Q29tcGFyYXRvcikge1xuICAgICAgICBjb2x1bW4uc29ydENvbXBhcmF0b3IgPSBjb2wuc29ydENvbXBhcmF0b3I7XG4gICAgICB9XG4gICAgICBpZiAoY29sLnNvcnRWYWx1ZUdldHRlcikge1xuICAgICAgICBjb2x1bW4uc29ydFZhbHVlR2V0dGVyID0gY29sLnNvcnRWYWx1ZUdldHRlcjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHZhbHVlRW1wdHlDaGVja2VyID0gVXRpbHMuZ2V0VmFsdWVFbXB0eUNoZWNrZXIoY29sKTtcbiAgICAgIC8vIENlbGwgdmFsdWUgcmVuZGVyaW5nXG4gICAgICBjb25zdCB2YWx1ZVJlbmRlciA9IChyb3dJbmRleCwgZm9ybWF0KSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbCA9IHRoaXMucHJvcHMuZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbCkpIHtcbiAgICAgICAgICByZXR1cm4gY29sLmlzUmVxdWlyZWQgPyA8TSBpZD1cIkdyaWQuVmFsdWVJc01pc3NpbmdcIiAvPiA6ICcnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3JtYXQgPyBmb3JtYXQodmFsKSA6IHZhbDtcbiAgICAgIH07XG5cbiAgICAgIGlmIChjb2wuY2VsbCkge1xuICAgICAgICBjb2x1bW4uY2VsbCA9IGNvbC5jZWxsO1xuICAgICAgfSBlbHNlIGlmIChjb2wudmFsdWVSZW5kZXIpIHtcbiAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBjb2wudmFsdWVSZW5kZXIodGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCksIHJvd0luZGV4KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN3aXRjaCAoY29sLnZhbHVlVHlwZSkge1xuICAgICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PlxuICAgICAgICAgICAgICB2YWx1ZVJlbmRlcihyb3dJbmRleCwgdiA9PiA8TiB2YWx1ZT17dn0gey4uLmNvbC5yZW5kZXJDb21wb25lbnRQcm9wc30gLz4pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnY3VycmVuY3knOiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW5jeUtleVBhdGggPSBjb2wudmFsdWVPcHRpb25zICYmIGNvbC52YWx1ZU9wdGlvbnMuY3VycmVuY3lLZXlQYXRoIHx8IFsnY3VycmVuY3knXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PlxuICAgICAgICAgICAgICB2YWx1ZVJlbmRlcihyb3dJbmRleCwgdiA9PiBmb3JtYXRDdXJyZW5jeUFtb3VudCh2LCB7XG4gICAgICAgICAgICAgICAgY3VycmVuY3k6IHRoaXMucHJvcHMuZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmN1cnJlbmN5S2V5UGF0aF0pLFxuICAgICAgICAgICAgICAgIGRlY2ltYWxzOiBjb2wudmFsdWVPcHRpb25zICYmIGNvbC52YWx1ZU9wdGlvbnMuZGVjaW1hbHMsXG4gICAgICAgICAgICAgICAgdGhvdXNhbmRTZXBhcmF0b3I6IGNvbC52YWx1ZU9wdGlvbnMgJiYgY29sLnZhbHVlT3B0aW9ucy50aG91c2FuZFNlcGFyYXRvciB8fCB0aGlzLnByb3BzLnRob3VzYW5kU2VwYXJhdG9yLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgICAgICAgICAgZGVjaW1hbFNlcGFyYXRvcjogY29sLnZhbHVlT3B0aW9ucyAmJiBjb2wudmFsdWVPcHRpb25zLmRlY2ltYWxTZXBhcmF0b3IgfHwgdGhpcy5wcm9wcy5kZWNpbWFsU2VwYXJhdG9yLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT5cbiAgICAgICAgICAgICAgdmFsdWVSZW5kZXIocm93SW5kZXgsICh2KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG1vbWVudCh2LCB0aGlzLnByb3BzLmRhdGVGb3JtYXQsIHRydWUpLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vbWVudC51dGModiwgdGhpcy5wcm9wcy5kYXRlRm9ybWF0KS5mb3JtYXQodGhpcy5wcm9wcy5kYXRlRm9ybWF0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG1vbWVudCh2KS5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBtb21lbnQudXRjKHYpLmZvcm1hdCh0aGlzLnByb3BzLmRhdGVGb3JtYXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gPE0gaWQ9XCJHcmlkLkludmFsaWREYXRlXCIgLz47XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+XG4gICAgICAgICAgICAgIHZhbHVlUmVuZGVyKHJvd0luZGV4LCB2ID0+XG4gICAgICAgICAgICAgICAgPE0gaWQ9e3YgPyAnR3JpZC5ZZXMnIDogJ0dyaWQuTm8nfSB7Li4uY29sLnJlbmRlckNvbXBvbmVudFByb3BzfSAvPik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiB2YWx1ZVJlbmRlcihyb3dJbmRleCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIENlbGwgZWRpdC9jcmVhdGUvZmlsdGVyIGNvbXBvbmVudCByZW5kZXJpbmdcbiAgICAgIGlmIChjb2wuY2VsbEVkaXQpIHtcbiAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gY29sLmNlbGxFZGl0O1xuICAgICAgfSBlbHNlIGlmIChjb2wuZWRpdFZhbHVlUmVuZGVyKSB7XG4gICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9XG4gICAgICAgICAgcm93SW5kZXggPT4gY29sLmVkaXRWYWx1ZVJlbmRlcih0aGlzLnByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSwgcm93SW5kZXgpO1xuICAgICAgfVxuICAgICAgaWYgKGNvbC5jZWxsQ3JlYXRlKSB7XG4gICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gY29sLmNlbGxDcmVhdGU7XG4gICAgICB9IGVsc2UgaWYgKGNvbC5jcmVhdGVWYWx1ZVJlbmRlcikge1xuICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9XG4gICAgICAgICAgcm93SW5kZXggPT4gY29sLmNyZWF0ZVZhbHVlUmVuZGVyKHRoaXMucHJvcHMuZGF0YS5nZXQocm93SW5kZXgpLCByb3dJbmRleCk7XG4gICAgICB9XG4gICAgICBpZiAoY29sLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSBjb2wuY2VsbEZpbHRlcjtcbiAgICAgIH0gZWxzZSBpZiAoY29sLmZpbHRlclZhbHVlUmVuZGVyKSB7XG4gICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID1cbiAgICAgICAgICByb3dJbmRleCA9PiBjb2wuZmlsdGVyVmFsdWVSZW5kZXIodGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCksIHJvd0luZGV4KTtcbiAgICAgIH1cbiAgICAgIGlmIChjb2wuY29tcG9uZW50VHlwZSkge1xuICAgICAgICBsZXQgZWRpdFZhbHVlUGFyc2VyID0gdmFsID0+IHZhbDtcbiAgICAgICAgc3dpdGNoIChjb2wuY29tcG9uZW50VHlwZSkge1xuICAgICAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgICAgICAgLy8gVE9ETyBSRUZBQ1RPUiBUTyBGVU5DVElPTlxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5saW5lRWRpdCkge1xuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IChcbiAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uRWRpdENlbGxWYWx1ZUNoYW5nZShyb3dJbmRleCwgY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMub25FZGl0Q2VsbEJsdXIocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMub25DZWxsRm9jdXMoJ2VkaXQnLCBjb2wuY29tcG9uZW50VHlwZSwgcm93SW5kZXgsIGNvbHVtbi5jb2x1bW5LZXkpfVxuICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMub25FZGl0Q2VsbEtleURvd24oY29sLCByb3dJbmRleCl9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UmVmPXt0aGlzLmhhbmRsZUVkaXRDZWxsUmVmKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRFZGl0SW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX0tJHtyb3dJbmRleH1gfVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmVkaXRDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnZWRpdCcpfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17Y29sdW1uLnN0eWxlfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gKFxuICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0Q3JlYXRlSXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZShyb3dJbmRleCwgY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMub25DcmVhdGVDZWxsQmx1cihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLm9uQ3JlYXRlQ2VsbEtleURvd259XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UmVmPXt0aGlzLmhhbmRsZUNyZWF0ZUNlbGxSZWYocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZENyZWF0ZUlucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5jcmVhdGVDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnY3JlYXRlJyl9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXtjb2x1bW4uc3R5bGV9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuZmlsdGVyaW5nKSB7XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IChcbiAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldEZpbHRlckl0ZW1WYWx1ZShjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkZpbHRlckNlbGxWYWx1ZUNoYW5nZShjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZEZpbHRlcklucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9YH1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5maWx0ZXJDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e2NvbHVtbi5zdHlsZX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5saW5lRWRpdCkge1xuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IChcbiAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25FZGl0Q2VsbFZhbHVlQ2hhbmdlKHJvd0luZGV4LCBjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5vbkVkaXRDZWxsQmx1cihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5vbkNlbGxGb2N1cygnZWRpdCcsIGNvbC5jb21wb25lbnRUeXBlLCByb3dJbmRleCwgY29sdW1uLmNvbHVtbktleSl9XG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5vbkVkaXRDZWxsS2V5RG93bihjb2wsIHJvd0luZGV4KX1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRSZWY9e3RoaXMuaGFuZGxlRWRpdENlbGxSZWYocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZEVkaXRJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fS0ke3Jvd0luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuZWRpdENvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdlZGl0Jyl9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXtjb2x1bW4uc3R5bGV9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiAoXG4gICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldENyZWF0ZUl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DcmVhdGVDZWxsVmFsdWVDaGFuZ2Uocm93SW5kZXgsIGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLm9uQ3JlYXRlQ2VsbEJsdXIocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMub25DZWxsRm9jdXMoJ2NyZWF0ZScsICdudW1iZXInLCByb3dJbmRleCwgY29sdW1uLmNvbHVtbktleSl9XG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5vbkNyZWF0ZUNlbGxLZXlEb3dufVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFJlZj17dGhpcy5oYW5kbGVDcmVhdGVDZWxsUmVmKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRDcmVhdGVJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fS0ke3Jvd0luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuY3JlYXRlQ29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2NyZWF0ZScpfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17Y29sdW1uLnN0eWxlfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmZpbHRlcmluZykge1xuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldEZpbHRlckl0ZW1WYWx1ZShjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkZpbHRlckNlbGxWYWx1ZUNoYW5nZShjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZEZpbHRlcklucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9YH1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5maWx0ZXJDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e2NvbHVtbi5zdHlsZX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdmbG9hdCc6XG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIgPSB2YWwgPT5cbiAgICAgICAgICAgICAgdmFsLnJlcGxhY2UobmV3IFJlZ0V4cChgW15cXFxcZCR7dGhpcy5wcm9wcy5kZWNpbWFsU2VwYXJhdG9yfSstXWAsICdnJyksICcnKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmlubGluZUVkaXQpIHtcbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiAoXG4gICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkVkaXRDZWxsVmFsdWVDaGFuZ2Uocm93SW5kZXgsIGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLm9uRWRpdENlbGxCbHVyKHJvd0luZGV4LCBjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMub25DZWxsRm9jdXMoJ2VkaXQnLCBjb2wuY29tcG9uZW50VHlwZSwgcm93SW5kZXgsIGNvbHVtbi5jb2x1bW5LZXkpfVxuICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMub25FZGl0Q2VsbEtleURvd24oY29sLCByb3dJbmRleCl9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UmVmPXt0aGlzLmhhbmRsZUVkaXRDZWxsUmVmKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRFZGl0SW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX0tJHtyb3dJbmRleH1gfVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmVkaXRDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnZWRpdCcpfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17Y29sdW1uLnN0eWxlfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gKFxuICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0Q3JlYXRlSXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZShyb3dJbmRleCwgY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMub25DcmVhdGVDZWxsQmx1cihyb3dJbmRleCwgY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMub25DcmVhdGVDZWxsS2V5RG93bn1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRSZWY9e3RoaXMuaGFuZGxlQ3JlYXRlQ2VsbFJlZihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkQ3JlYXRlSW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX0tJHtyb3dJbmRleH1gfVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmNyZWF0ZUNvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdjcmVhdGUnKX1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e2NvbHVtbi5zdHlsZX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5maWx0ZXJpbmcpIHtcbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT4gKFxuICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0RmlsdGVySXRlbVZhbHVlKGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uRmlsdGVyQ2VsbFZhbHVlQ2hhbmdlKGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkRmlsdGVySW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX1gfVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmZpbHRlckNvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17Y29sdW1uLnN0eWxlfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3NlbGVjdCc6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgaW50bCB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50T3B0aW9ucyB8fFxuICAgICAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdENvbXBvbmVudE9wdGlvbnMuZ2V0KGNvbHVtbi5jb2x1bW5LZXkpO1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0VHJhbnNsYXRpb25zID0gY29sLnNlbGVjdENvbXBvbmVudFRyYW5zbGF0aW9ucyB8fFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IGludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5TZWxlY3QnIH0pLFxuICAgICAgICAgICAgICAgIG5vUmVzdWx0c1RleHQ6IGludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5Ob1Jlc3VsdHMnIH0pLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5saW5lRWRpdCkge1xuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IChcbiAgICAgICAgICAgICAgICAgIDxGbG9hdGluZ1NlbGVjdFxuICAgICAgICAgICAgICAgICAgICBuYW1lPXtjb2wudmFsdWVLZXlQYXRoLmpvaW4oKSArICctZWRpdC0nICsgcm93SW5kZXh9XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e1xuICAgICAgICAgICAgICAgICAgICAgIGNvbC5lZGl0U2VsZWN0T3B0aW9uc01vZCAmJiBzZWxlY3RPcHRpb25zID9cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbC5lZGl0U2VsZWN0T3B0aW9uc01vZChzZWxlY3RPcHRpb25zLnNsaWNlKCksIHJvd0luZGV4LCBjb2wpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdE9wdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkVkaXRDZWxsVmFsdWVDaGFuZ2Uocm93SW5kZXgsIGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLm9uRWRpdENlbGxCbHVyKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLm9uQ2VsbEZvY3VzKCdlZGl0JywgY29sLmNvbXBvbmVudFR5cGUsIHJvd0luZGV4LCBjb2x1bW4uY29sdW1uS2V5KX1cbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoYWJsZT17c2VsZWN0T3B0aW9ucyAmJiAoc2VsZWN0T3B0aW9ucy5sZW5ndGggPiA5KX1cbiAgICAgICAgICAgICAgICAgICAgY2xlYXJhYmxlPXshY29sLmlzUmVxdWlyZWR9XG4gICAgICAgICAgICAgICAgICAgIGJhY2tzcGFjZVJlbW92ZXM9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICB0YWJTZWxlY3RzVmFsdWU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBvcGVuT25Gb2N1c1xuICAgICAgICAgICAgICAgICAgICByZWY9e3RoaXMuaGFuZGxlRWRpdENlbGxSZWYocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICBpZDogYG9jRGF0YWdyaWRFZGl0SW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX0tJHtyb3dJbmRleH1gLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmVkaXRDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnZWRpdCcpfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5zZWxlY3RUcmFuc2xhdGlvbnN9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gKFxuICAgICAgICAgICAgICAgICAgPEZsb2F0aW5nU2VsZWN0XG4gICAgICAgICAgICAgICAgICAgIG5hbWU9e2NvbC52YWx1ZUtleVBhdGguam9pbigpICsgJy1jcmVhdGUtJyArIHJvd0luZGV4fVxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zPXtcbiAgICAgICAgICAgICAgICAgICAgICBjb2wuY3JlYXRlU2VsZWN0T3B0aW9uc01vZCAmJiBzZWxlY3RPcHRpb25zID9cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbC5jcmVhdGVTZWxlY3RPcHRpb25zTW9kKHNlbGVjdE9wdGlvbnMuc2xpY2UoKSwgcm93SW5kZXgsIGNvbCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0T3B0aW9uc1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldENyZWF0ZUl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DcmVhdGVDZWxsVmFsdWVDaGFuZ2Uocm93SW5kZXgsIGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLm9uQ3JlYXRlQ2VsbEJsdXIocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaGFibGU9e3NlbGVjdE9wdGlvbnMgJiYgKHNlbGVjdE9wdGlvbnMubGVuZ3RoID4gOSl9XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyYWJsZT17IWNvbC5pc1JlcXVpcmVkfVxuICAgICAgICAgICAgICAgICAgICBiYWNrc3BhY2VSZW1vdmVzPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgdGFiU2VsZWN0c1ZhbHVlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgb3Blbk9uRm9jdXNcbiAgICAgICAgICAgICAgICAgICAgcmVmPXt0aGlzLmhhbmRsZUNyZWF0ZUNlbGxSZWYocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICBpZDogYG9jRGF0YWdyaWRDcmVhdGVJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fS0ke3Jvd0luZGV4fWAsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuY3JlYXRlQ29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2NyZWF0ZScpfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5zZWxlY3RUcmFuc2xhdGlvbnN9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmZpbHRlcmluZykge1xuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8RmxvYXRpbmdTZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgbmFtZT17Y29sLnZhbHVlS2V5UGF0aC5qb2luKCkgKyAnLWZpbHRlcid9XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e1xuICAgICAgICAgICAgICAgICAgICAgIGNvbC5maWx0ZXJTZWxlY3RPcHRpb25zTW9kICYmIHNlbGVjdE9wdGlvbnMgP1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sLmZpbHRlclNlbGVjdE9wdGlvbnNNb2Qoc2VsZWN0T3B0aW9ucy5zbGljZSgpLCBjb2wpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdE9wdGlvbnN9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldEZpbHRlckl0ZW1WYWx1ZShjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkZpbHRlckNlbGxWYWx1ZUNoYW5nZShjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaGFibGU9e3NlbGVjdE9wdGlvbnMgJiYgKHNlbGVjdE9wdGlvbnMubGVuZ3RoID4gOSl9XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyYWJsZVxuICAgICAgICAgICAgICAgICAgICB0YWJTZWxlY3RzVmFsdWU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBvcGVuT25Gb2N1c1xuICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgaWQ6IGBvY0RhdGFncmlkRmlsdGVySW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX1gLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmZpbHRlckNvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5zZWxlY3RUcmFuc2xhdGlvbnN9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlICdkYXRlJzoge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5saW5lRWRpdCkge1xuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IChcbiAgICAgICAgICAgICAgICAgIDxEYXRlSW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25FZGl0Q2VsbFZhbHVlQ2hhbmdlKHJvd0luZGV4LCBjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsZT17dGhpcy5wcm9wcy5yZWdpb259XG4gICAgICAgICAgICAgICAgICAgIGRhdGVGb3JtYXQ9e3RoaXMucHJvcHMuZGF0ZUZvcm1hdH1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRSZWY9e3RoaXMuaGFuZGxlRWRpdENlbGxSZWYocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICBpZDogYG9jRGF0YWdyaWRFZGl0SW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX0tJHtyb3dJbmRleH1gLFxuICAgICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bjogdGhpcy5vbkVkaXRDZWxsS2V5RG93bihjb2wsIHJvd0luZGV4KSxcbiAgICAgICAgICAgICAgICAgICAgICBvbkJsdXI6IHRoaXMub25FZGl0Q2VsbEJsdXIocm93SW5kZXgsIGNvbCksXG4gICAgICAgICAgICAgICAgICAgICAgb25Gb2N1czogdGhpcy5vbkNlbGxGb2N1cygnZWRpdCcsIGNvbC5jb21wb25lbnRUeXBlLCByb3dJbmRleCwgY29sdW1uLmNvbHVtbktleSksXG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IGNvbHVtbi5zdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5lZGl0Q29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2VkaXQnKX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiAoXG4gICAgICAgICAgICAgICAgICA8RGF0ZUlucHV0XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldENyZWF0ZUl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DcmVhdGVDZWxsVmFsdWVDaGFuZ2Uocm93SW5kZXgsIGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLm9uQ3JlYXRlQ2VsbEtleURvd259XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsZT17dGhpcy5wcm9wcy5yZWdpb259XG4gICAgICAgICAgICAgICAgICAgIGRhdGVGb3JtYXQ9e3RoaXMucHJvcHMuZGF0ZUZvcm1hdH1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRSZWY9e3RoaXMuaGFuZGxlQ3JlYXRlQ2VsbFJlZihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgIGlkOiBgb2NEYXRhZ3JpZENyZWF0ZUlucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YCxcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogY29sdW1uLnN0eWxlLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmNyZWF0ZUNvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdjcmVhdGUnKX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuZmlsdGVyaW5nKSB7XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IChcbiAgICAgICAgICAgICAgICAgIDxEYXRlSW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0RmlsdGVySXRlbVZhbHVlKGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uRmlsdGVyQ2VsbFZhbHVlQ2hhbmdlKGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgZGF0ZUZvcm1hdD17dGhpcy5wcm9wcy5kYXRlRm9ybWF0fVxuICAgICAgICAgICAgICAgICAgICBsb2NhbGU9e3RoaXMucHJvcHMucmVnaW9ufVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgaWQ6IGBvY0RhdGFncmlkRmlsdGVySW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX1gLFxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBjb2x1bW4uc3R5bGUsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuZmlsdGVyQ29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlICdib29sZWFuJzoge1xuICAgICAgICAgICAgY29uc3QgeyBpbnRsIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0T3B0aW9ucyA9IFtcbiAgICAgICAgICAgICAgeyB2YWx1ZTogdHJ1ZSwgbGFiZWw6IGludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5ZZXMnIH0pIH0sXG4gICAgICAgICAgICAgIHsgdmFsdWU6IGZhbHNlLCBsYWJlbDogaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLk5vJyB9KSB9LFxuICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0VHJhbnNsYXRpb25zID0gY29sLnNlbGVjdENvbXBvbmVudFRyYW5zbGF0aW9ucyB8fCB7XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBpbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuU2VsZWN0JyB9KSxcbiAgICAgICAgICAgICAgbm9SZXN1bHRzVGV4dDogaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0Lk5vUmVzdWx0cycgfSksXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5pbmxpbmVFZGl0KSB7XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gKFxuICAgICAgICAgICAgICAgICAgPEZsb2F0aW5nU2VsZWN0XG4gICAgICAgICAgICAgICAgICAgIG5hbWU9e2NvbC52YWx1ZUtleVBhdGguam9pbigpICsgJy1lZGl0LScgKyByb3dJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucz17c2VsZWN0T3B0aW9uc31cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25FZGl0Q2VsbFZhbHVlQ2hhbmdlKHJvd0luZGV4LCBjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5vbkVkaXRDZWxsQmx1cihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5vbkNlbGxGb2N1cygnZWRpdCcsIGNvbC5jb21wb25lbnRUeXBlLCByb3dJbmRleCwgY29sdW1uLmNvbHVtbktleSl9XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaGFibGU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBjbGVhcmFibGU9eyFjb2wuaXNSZXF1aXJlZH1cbiAgICAgICAgICAgICAgICAgICAgYmFja3NwYWNlUmVtb3Zlcz17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIHRhYlNlbGVjdHNWYWx1ZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIG9wZW5PbkZvY3VzXG4gICAgICAgICAgICAgICAgICAgIHJlZj17dGhpcy5oYW5kbGVFZGl0Q2VsbFJlZihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICAgIGlkOiBgb2NEYXRhZ3JpZEVkaXRJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fS0ke3Jvd0luZGV4fWAsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuZWRpdENvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdlZGl0Jyl9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgey4uLnNlbGVjdFRyYW5zbGF0aW9uc31cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiAoXG4gICAgICAgICAgICAgICAgICA8RmxvYXRpbmdTZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgbmFtZT17Y29sLnZhbHVlS2V5UGF0aC5qb2luKCkgKyAnLWNyZWF0ZS0nICsgcm93SW5kZXh9XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e3NlbGVjdE9wdGlvbnN9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldENyZWF0ZUl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DcmVhdGVDZWxsVmFsdWVDaGFuZ2Uocm93SW5kZXgsIGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLm9uQ3JlYXRlQ2VsbEJsdXIocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaGFibGU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBjbGVhcmFibGU9eyFjb2wuaXNSZXF1aXJlZH1cbiAgICAgICAgICAgICAgICAgICAgYmFja3NwYWNlUmVtb3Zlcz17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIHRhYlNlbGVjdHNWYWx1ZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIG9wZW5PbkZvY3VzXG4gICAgICAgICAgICAgICAgICAgIHJlZj17dGhpcy5oYW5kbGVDcmVhdGVDZWxsUmVmKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgaWQ6IGBvY0RhdGFncmlkQ3JlYXRlSW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX0tJHtyb3dJbmRleH1gLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmNyZWF0ZUNvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdjcmVhdGUnKX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgICAgICAgICB7Li4uc2VsZWN0VHJhbnNsYXRpb25zfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5maWx0ZXJpbmcpIHtcbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT4gKFxuICAgICAgICAgICAgICAgICAgPEZsb2F0aW5nU2VsZWN0XG4gICAgICAgICAgICAgICAgICAgIG5hbWU9e2NvbC52YWx1ZUtleVBhdGguam9pbigpICsgJy1maWx0ZXInfVxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zPXtzZWxlY3RPcHRpb25zfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRGaWx0ZXJJdGVtVmFsdWUoY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UoY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hhYmxlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgY2xlYXJhYmxlXG4gICAgICAgICAgICAgICAgICAgIHRhYlNlbGVjdHNWYWx1ZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIG9wZW5PbkZvY3VzXG4gICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICBpZDogYG9jRGF0YWdyaWRGaWx0ZXJJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fWAsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuZmlsdGVyQ29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgey4uLnNlbGVjdFRyYW5zbGF0aW9uc31cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbHVtbnMucHVzaChjb2x1bW4pO1xuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuaXNDcmVhdGluZykge1xuICAgICAgY29sdW1ucy5wdXNoKHtcbiAgICAgICAgd2lkdGg6IDM3LFxuICAgICAgICBpc1Jlc2l6YWJsZTogZmFsc2UsXG4gICAgICAgIGNvbHVtbktleTogJ3JlbW92ZU5ld0l0ZW0nLFxuICAgICAgICBjZWxsOiAoKSA9PiBudWxsLFxuICAgICAgICBjZWxsRWRpdDogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbENyZWF0ZTogcm93SW5kZXggPT4gKFxuICAgICAgICAgIDxJY29uXG4gICAgICAgICAgICBpZD17YG9jLWRhdGFncmlkLW5ldy1pdGVtLXJlbW92ZS0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtyb3dJbmRleH1gfVxuICAgICAgICAgICAgdHlwZT1cImluZGljYXRvclwiXG4gICAgICAgICAgICBuYW1lPVwiZGVsZXRlXCJcbiAgICAgICAgICAgIHdpZHRoPXszMH1cbiAgICAgICAgICAgIGhlaWdodD17MzB9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0aGlzLnByb3BzLnJlbW92ZU5ld0l0ZW0odGhpcy5wcm9wcy5ncmlkLCByb3dJbmRleCl9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSxcbiAgICAgICAgY2VsbEZpbHRlcjogKCkgPT4gbnVsbCxcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gY29sdW1ucztcbiAgfVxuXG4gIGlzQ2VsbEVkaXRlZCA9IChyb3dJbmRleCwgY29sLCBjZWxsVHlwZSkgPT4ge1xuICAgIGlmIChjZWxsVHlwZSAhPT0gJ2VkaXQnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICBpZiAodGhpcy5wcm9wcy5lZGl0RGF0YS5nZXRJbihbaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGhhbmRsZUFmdGVyQWRkSXRlbSA9ICgpID0+IHtcbiAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsID0gdHJ1ZTtcbiAgfVxuXG4gIGhhbmRsZUFmdGVyRWRpdFByZXNzID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuc2l6ZSkge1xuICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSB0cnVlO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGN1cnJlbnRSb3c6IHVuZGVmaW5lZCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUFmdGVyVmFsaWRhdGlvbkVycm9yID0gKCkgPT4ge1xuICAgIHRoaXMuZm9jdXNUb0Vycm9yQ2VsbCA9IHRydWU7XG4gIH1cblxuICBoYW5kbGVSb3dDbGljayA9IChlLCByb3dJbmRleCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnJvd1NlbGVjdCAmJiAhdGhpcy5wcm9wcy5pc0NyZWF0aW5nICYmICF0aGlzLnByb3BzLmlzRWRpdGluZykge1xuICAgICAgaWYgKGUuY3RybEtleSB8fCBlLnNoaWZ0S2V5KSB7XG4gICAgICAgIGRvY3VtZW50LmdldFNlbGVjdGlvbigpLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgfVxuICAgICAgLy8gRG9uJ3QgdHJpZ2dlciBzZWxlY3Rpb24gY2hhbmdlIG9uIHdoZW4gdXNlciBjbGlja3Mgb24gc3BlY2lhbCBjZWxscyBsaWtlIGNoZWNrYm94L2V4dHJhXG4gICAgICAvLyBDaGVjayB0aGF0IGNsaWNrZWQgbm9kZSdzIHBhcmVudCBvciBwYXJlbnQncyBwYXJlbnQgZG9lc24ndCBoYXZlIG5vLXJvdy1zZWxlY3QgY2xhc3NcbiAgICAgIGNvbnN0IHsgcGFyZW50Tm9kZSB9ID0gZS50YXJnZXQ7XG4gICAgICBjb25zdCBwYXJlbnQxY2xhc3MgPSBwYXJlbnROb2RlLmNsYXNzTmFtZSAmJiBwYXJlbnROb2RlLmNsYXNzTmFtZS5pbmRleE9mXG4gICAgICAgID8gcGFyZW50Tm9kZS5jbGFzc05hbWVcbiAgICAgICAgOiAnJztcbiAgICAgICAgY29uc3QgcGFyZW50MmNsYXNzID0gcGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZSAmJiBwYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lLmluZGV4T2YgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICA/IHBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWVcbiAgICAgICAgOiAnJztcbiAgICAgICAgY29uc3QgcGFyZW50M2NsYXNzID0gcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lICYmIHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZS5pbmRleE9mIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgPyBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWVcbiAgICAgICAgOiAnJztcbiAgICAgICAgY29uc3QgcGFyZW50NGNsYXNzID0gcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUgJiYgcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUuaW5kZXhPZiAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgID8gcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWVcbiAgICAgICAgOiAnJztcbiAgICAgIGlmIChcbiAgICAgICAgcGFyZW50MWNsYXNzLmluZGV4T2YoJ25vLXJvdy1zZWxlY3QnKSA9PT0gLTEgJiZcbiAgICAgICAgcGFyZW50MmNsYXNzLmluZGV4T2YoJ25vLXJvdy1zZWxlY3QnKSA9PT0gLTEgJiZcbiAgICAgICAgcGFyZW50M2NsYXNzLmluZGV4T2YoJ25vLXJvdy1zZWxlY3QnKSA9PT0gLTEgJiZcbiAgICAgICAgcGFyZW50NGNsYXNzLmluZGV4T2YoJ25vLXJvdy1zZWxlY3QnKSA9PT0gLTFcbiAgICAgICkge1xuICAgICAgICB0aGlzLnByb3BzLml0ZW1TZWxlY3Rpb25DaGFuZ2UoXG4gICAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgIHRoaXMucHJvcHMubXVsdGlTZWxlY3QgJiYgZS5jdHJsS2V5LFxuICAgICAgICAgIHRoaXMucHJvcHMubXVsdGlTZWxlY3QgJiYgZS5zaGlmdEtleSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMub25Sb3dDbGljaykge1xuICAgICAgdGhpcy5wcm9wcy5vblJvd0NsaWNrKGUsIHJvd0luZGV4LCB0aGlzLnByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaGFuZGxlQ29udGV4dE1lbnUgPSAoZSwgcm93SW5kZXgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5jb250ZXh0TWVudUl0ZW1zKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGl0ZW1TZWxlY3Rpb25DaGFuZ2UsXG4gICAgICAgIHNlbGVjdGVkSXRlbXMsXG4gICAgICAgIGdyaWQsXG4gICAgICAgIGRhdGEsXG4gICAgICB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY29udGV4dE1lbnVPcGVuOiB0cnVlLFxuICAgICAgICBjb250ZXh0TWVudVg6IGUuY2xpZW50WCxcbiAgICAgICAgY29udGV4dE1lbnVZOiBlLmNsaWVudFksXG4gICAgICB9KTtcbiAgICAgIC8vIElmIGNsaWNrZWQgaXRlbSBpcyBub3Qgc2VsZWN0ZWQsIGNoYW5nZSBzZWxlY3Rpb24gdG8gaXRcbiAgICAgIGlmICghc2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhkYXRhLmdldEluKFtyb3dJbmRleCwgLi4uZ3JpZC5pZEtleVBhdGhdKSkpIHtcbiAgICAgICAgaXRlbVNlbGVjdGlvbkNoYW5nZShncmlkLCByb3dJbmRleCk7XG4gICAgICB9XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25Eb2N1bWVudENsaWNrKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBoYW5kbGVDb250ZXh0TWVudUl0ZW1DbGljayA9IChvbkNsaWNrLCBzZWxlY3RlZEl0ZW1zLCBzZWxlY3RlZERhdGEpID0+ICgpID0+IHtcbiAgICBvbkNsaWNrKHNlbGVjdGVkSXRlbXMsIHNlbGVjdGVkRGF0YSk7XG4gIH1cblxuICBoYW5kbGVSb3dIZWlnaHRHZXR0ZXIgPSByb3dJbmRleCA9PlxuICAgIHRoaXMucHJvcHMucm93SGVpZ2h0R2V0dGVyKHRoaXMucHJvcHMuZGF0YS5nZXQocm93SW5kZXgpLCByb3dJbmRleCk7XG5cbiAgcmVuZGVyQ2VsbCA9IGNvbCA9PiAoY2VsbFByb3BzKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgaXNDcmVhdGluZyxcbiAgICAgIGlzRWRpdGluZyxcbiAgICAgIGNyZWF0ZURhdGEsXG4gICAgICBzZWxlY3RlZENlbGwsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyByb3dJbmRleCwgLi4ucHJvcHMgfSA9IGNlbGxQcm9wcztcbiAgICBsZXQgY2VsbDtcbiAgICBsZXQgY2VsbFR5cGUgPSAndmlldyc7XG4gICAgbGV0IGV4dHJhUm93Q291bnQgPSAwOyAvLyBob3cgbWFueSByb3dzIHRvIGlnbm9yZSBmcm9tIHRvcCwgbmV3ICsgZmlsdGVyIHJvd3NcbiAgICBpZiAoaXNDcmVhdGluZykgZXh0cmFSb3dDb3VudCA9IGNyZWF0ZURhdGEuc2l6ZTtcbiAgICBpZiAoaXNDcmVhdGluZykge1xuICAgICAgaWYgKHJvd0luZGV4IDw9IChleHRyYVJvd0NvdW50IC0gMSkpIHtcbiAgICAgICAgaWYgKGNvbC5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY2VsbCA9IGNvbC5jZWxsQ3JlYXRlKHJvd0luZGV4KTtcbiAgICAgICAgICBjZWxsVHlwZSA9ICdjcmVhdGUnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNlbGwgPSBudWxsO1xuICAgICAgICAgIGNlbGxUeXBlID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2VsbCA9IGNvbC5jZWxsKHJvd0luZGV4IC0gZXh0cmFSb3dDb3VudCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc0VkaXRpbmcgJiYgY29sLmNlbGxFZGl0KSB7XG4gICAgICBjZWxsID0gY29sLmNlbGxFZGl0KHJvd0luZGV4IC0gZXh0cmFSb3dDb3VudCk7XG4gICAgICBjZWxsVHlwZSA9ICdlZGl0JztcbiAgICB9IGVsc2Uge1xuICAgICAgY2VsbCA9IGNvbC5jZWxsKHJvd0luZGV4IC0gZXh0cmFSb3dDb3VudCk7XG4gICAgfVxuICAgIGNvbnN0IGlzU3BlY2lhbCA9IGNlbGxQcm9wcy5jb2x1bW5LZXkgPT09ICdzZWxlY3Rpb25DaGVja2JveCcgfHwgY2VsbFByb3BzLmNvbHVtbktleSA9PT0gJ2V4dHJhQ29sdW1uJztcbiAgICBpZiAoKGNlbGxUeXBlID09PSAndmlldycgfHwgY2VsbFR5cGUgPT09ICdlZGl0JyB8fCBjZWxsVHlwZSA9PT0gJ2NyZWF0ZScpICYmICFpc1NwZWNpYWwpIHtcbiAgICAgIGNvbnN0IGdldFJvd0luZGV4ID0gKGNlbGxUeXBlID09PSAnY3JlYXRlJykgPyByb3dJbmRleCA6IChyb3dJbmRleCAtIGV4dHJhUm93Q291bnQpO1xuICAgICAgY29uc3QgbWVzc2FnZURhdGEgPSB0aGlzLmdldENlbGxNZXNzYWdlcyhnZXRSb3dJbmRleCwgY29sLCBjZWxsVHlwZSk7XG4gICAgICBjb25zdCBpc0VkaXRlZCA9IHRoaXMuaXNDZWxsRWRpdGVkKGdldFJvd0luZGV4LCBjb2wsIGNlbGxUeXBlKTtcbiAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IChzZWxlY3RlZENlbGwuZ2V0KCdyb3dJbmRleCcpID09PSByb3dJbmRleCAmJiBzZWxlY3RlZENlbGwuZ2V0KCdjb2x1bW5LZXknKSA9PT0gcHJvcHMuY29sdW1uS2V5KSA/XG4gICAgICAgICdvYy1kYXRhZ3JpZC1jZWxsIGlzLXNlbGVjdGVkJyA6ICdvYy1kYXRhZ3JpZC1jZWxsJztcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxDZWxsXG4gICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICAgIHN0eWxlPXtjb2wuc3R5bGV9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDZWxsU2VsZWN0KGNlbGxUeXBlLCByb3dJbmRleCwgcHJvcHMuY29sdW1uS2V5KX1cbiAgICAgICAgPlxuICAgICAgICAgIDxDZWxsVG9vbHRpcFxuICAgICAgICAgICAgaWQ9e2NlbGxUeXBlICsgY29sLmNvbHVtbktleSArIChyb3dJbmRleCAtIGV4dHJhUm93Q291bnQpfVxuICAgICAgICAgICAgaXNFZGl0ZWQ9e2lzRWRpdGVkfVxuICAgICAgICAgICAgaXNFcnJvcj17ISFtZXNzYWdlRGF0YS5lcnJvck1lc3NhZ2V9XG4gICAgICAgICAgICBpc1dhcm5pbmc9eyEhbWVzc2FnZURhdGEud2FybmluZ01lc3NhZ2V9XG4gICAgICAgICAgICBpbmZvTWVzc2FnZT17bWVzc2FnZURhdGEuaW5mb01lc3NhZ2V9XG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U9e21lc3NhZ2VEYXRhLmVycm9yTWVzc2FnZX1cbiAgICAgICAgICAgIHdhcm5pbmdNZXNzYWdlPXttZXNzYWdlRGF0YS53YXJuaW5nTWVzc2FnZX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7IGNlbGwgfVxuICAgICAgICAgIDwvQ2VsbFRvb2x0aXA+XG4gICAgICAgIDwvQ2VsbD5cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8Q2VsbCB7Li4ucHJvcHN9IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWNlbGxcIiBzdHlsZT17Y29sLnN0eWxlfT57IGNlbGwgfTwvQ2VsbD5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyQ29sdW1ucyA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuYWxsRGF0YVNpemUgJiYgIXRoaXMucHJvcHMuaXNCdXN5ICYmICF0aGlzLnByb3BzLmlzQ3JlYXRpbmcpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxDb2x1bW5cbiAgICAgICAgICBjb2x1bW5LZXk9XCJkYXRhRW1wdHlDb2x1bW5cIlxuICAgICAgICAgIGhlYWRlcj17PENlbGwgc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJyB9fT48TSBpZD1cIkdyaWQuTm9JdGVtc1wiIC8+PC9DZWxsPn1cbiAgICAgICAgICB3aWR0aD17MTB9XG4gICAgICAgICAgaXNSZXNpemFibGU9e2ZhbHNlfVxuICAgICAgICAgIGZsZXhHcm93PXsxfVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLnByb3BzLnZpc2libGVDb2x1bW5zLnNpemUpIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLmlzQnVzeSkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxDb2x1bW5cbiAgICAgICAgICAgIGNvbHVtbktleT1cImRhdGFFbXB0eUNvbHVtblwiXG4gICAgICAgICAgICBoZWFkZXI9ezxDZWxsPiZuYnNwOzwvQ2VsbD59XG4gICAgICAgICAgICB3aWR0aD17MTB9XG4gICAgICAgICAgICBpc1Jlc2l6YWJsZT17ZmFsc2V9XG4gICAgICAgICAgICBmbGV4R3Jvdz17MX1cbiAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPENvbHVtblxuICAgICAgICAgIGNvbHVtbktleT1cImRhdGFFbXB0eUNvbHVtblwiXG4gICAgICAgICAgaGVhZGVyPXs8Q2VsbCBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInIH19PjxNIGlkPVwiR3JpZC5Ob0NvbHVtbnNcIiAvPjwvQ2VsbD59XG4gICAgICAgICAgd2lkdGg9ezEwfVxuICAgICAgICAgIGlzUmVzaXphYmxlPXtmYWxzZX1cbiAgICAgICAgICBmbGV4R3Jvdz17MX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnN0IGNvbHVtbnMgPSB0aGlzLmdlbmVyYXRlQ29sdW1ucygpO1xuICAgIGlmIChjb2x1bW5zLmxlbmdodCA9PT0gMCkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIGNvbHVtbnMubWFwKGNvbCA9PiAoXG4gICAgICA8Q29sdW1uXG4gICAgICAgIGtleT17Y29sLmNvbHVtbktleX1cbiAgICAgICAgY29sdW1uS2V5PXtjb2wuY29sdW1uS2V5fVxuICAgICAgICBoZWFkZXI9e1xuICAgICAgICAgIDxIZWFkZXJDZWxsXG4gICAgICAgICAgICBncmlkPXt0aGlzLnByb3BzLmdyaWR9XG4gICAgICAgICAgICBjb2x1bW5zPXt0aGlzLnByb3BzLmNvbHVtbnN9XG4gICAgICAgICAgICBjb2x1bW49e2NvbH1cbiAgICAgICAgICAgIGN1cnJlbnRTb3J0Q29sdW1uPXt0aGlzLnByb3BzLnNvcnRDb2x1bW59XG4gICAgICAgICAgICBjdXJyZW50U29ydE9yZGVyPXt0aGlzLnByb3BzLnNvcnRPcmRlcn1cbiAgICAgICAgICAgIG9uU29ydENoYW5nZT17dGhpcy5wcm9wcy5zb3J0Q2hhbmdlfVxuICAgICAgICAgICAgaXNCdXN5PXt0aGlzLnByb3BzLmlzQnVzeX1cbiAgICAgICAgICAgIGZpbHRlcmluZz17dGhpcy5wcm9wcy5pc0ZpbHRlcmluZ31cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7Y29sLmhlYWRlcn1cbiAgICAgICAgICA8L0hlYWRlckNlbGw+XG4gICAgICAgIH1cbiAgICAgICAgY2VsbD17dGhpcy5yZW5kZXJDZWxsKGNvbCl9XG4gICAgICAgIHdpZHRoPXt0aGlzLnByb3BzLmNvbHVtbldpZHRocy5nZXQoY29sLmNvbHVtbktleSwgY29sLndpZHRoKX1cbiAgICAgICAgbWluV2lkdGg9e2NvbC5taW5XaWR0aH1cbiAgICAgICAgbWF4V2lkdGg9e2NvbC5tYXhXaWR0aH1cbiAgICAgICAgaXNSZXNpemFibGU9e2NvbC5pc1Jlc2l6YWJsZX1cbiAgICAgICAgZmxleEdyb3c9e2NvbC5mbGV4R3JvdyA/IGNvbC5mbGV4R3JvdyA6IDB9XG4gICAgICAgIGZpeGVkPXtjb2wuZml4ZWR9XG4gICAgICAgIGFsbG93Q2VsbHNSZWN5Y2xpbmc9e2NvbC5hbGxvd0NlbGxzUmVjeWNsaW5nfVxuICAgICAgLz4pKTtcbiAgfVxuXG4gIHJlbmRlckNvbnRleHRNZW51ID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGNvbnRleHRNZW51SXRlbXMsXG4gICAgICBkYXRhLFxuICAgICAgZ3JpZCxcbiAgICAgIHNlbGVjdGVkSXRlbXMsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge1xuICAgICAgY29udGV4dE1lbnVYLFxuICAgICAgY29udGV4dE1lbnVZLFxuICAgIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHN0eWxlID0ge1xuICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgIHpJbmRleDogMTAwMDAsXG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIHRvcDogYCR7Y29udGV4dE1lbnVZfXB4YCxcbiAgICAgIGxlZnQ6IGAke2NvbnRleHRNZW51WH1weGAsXG4gICAgfTtcbiAgICBjb25zdCBzZWxlY3RlZERhdGEgPSBkYXRhLmZpbHRlcihkID0+IHNlbGVjdGVkSXRlbXMuaW5jbHVkZXMoZC5nZXRJbihncmlkLmlkS2V5UGF0aCkpKTtcbiAgICByZXR1cm4gKFxuICAgICAgPHVsIGNsYXNzTmFtZT1cImRyb3Bkb3duLW1lbnUgb2MtZGF0YWdyaWQtY29udGV4dC1tZW51IG9wZW5cIiBzdHlsZT17c3R5bGV9PlxuICAgICAgICB7IGNvbnRleHRNZW51SXRlbXMgJiYgY29udGV4dE1lbnVJdGVtcy5tYXAgJiYgY29udGV4dE1lbnVJdGVtcy5tYXAoKGl0ZW0sIGkpID0+IHtcbiAgICAgICAgICBsZXQgeyBkaXNhYmxlZCB9ID0gaXRlbTtcbiAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0uZGlzYWJsZWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGRpc2FibGVkID0gaXRlbS5kaXNhYmxlZChzZWxlY3RlZEl0ZW1zLCBzZWxlY3RlZERhdGEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPE1lbnVJdGVtXG4gICAgICAgICAgICAgIGtleT17aX0gLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAgICAgICBoZWFkZXI9e2l0ZW0uaGVhZGVyfVxuICAgICAgICAgICAgICBkaXZpZGVyPXtpdGVtLmRpdmlkZXJ9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgdGl0bGU9e2l0ZW0udGl0bGV9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9eyhkaXNhYmxlZCB8fCAhaXRlbS5vbkNsaWNrKSA/IG51bGwgOiB0aGlzLmhhbmRsZUNvbnRleHRNZW51SXRlbUNsaWNrKFxuICAgICAgICAgICAgICAgIGl0ZW0ub25DbGljayxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEl0ZW1zLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkRGF0YSxcbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgeyBpdGVtLnZhbHVlIH1cbiAgICAgICAgICAgIDwvTWVudUl0ZW0+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSkgfVxuICAgICAgPC91bD5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGdyaWRDbGFzc05hbWUgPSBjbGFzc05hbWVzKHtcbiAgICAgICdvYy1kYXRhZ3JpZC1jb250YWluZXInOiB0cnVlLFxuICAgICAgJ3dpdGgtYWN0aW9uYmFyJzogdGhpcy5wcm9wcy5pbmxpbmVFZGl0ICYmICF0aGlzLnByb3BzLmRpc2FibGVBY3Rpb25CYXIsXG4gICAgICAnaXMtYnVzeSc6IHRoaXMucHJvcHMuaXNCdXN5LFxuICAgICAgJ2lzLWVkaXRpbmcnOiB0aGlzLnByb3BzLmlzRWRpdGluZyxcbiAgICAgICdpcy1jcmVhdGluZyc6IHRoaXMucHJvcHMuaXNDcmVhdGluZyxcbiAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgfSk7XG5cbiAgICAvLyBjaGVjayBpZiB0aGVyZSBpcyBhIG5ldyByZXF1ZXN0IHRvIGNoYW5nZSBlZGl0IG1vZGUgZm9jdXNcbiAgICB0aGlzLnNldEZvY3VzVG8odGhpcy5wcm9wcy5mb2N1c1R5cGUpO1xuXG4gICAgbGV0IGFjdGlvbkJhciA9IG51bGw7XG4gICAgbGV0IGFjdGlvbkJhclJpZ2h0ID0gbnVsbDtcbiAgICBsZXQgYWN0aW9uQmFyTGVmdCA9IG51bGw7XG4gICAgaWYgKFxuICAgICAgKHRoaXMucHJvcHMuYWN0aW9uQmFyIHx8XG4gICAgICB0aGlzLnByb3BzLmlubGluZUVkaXQgfHxcbiAgICAgIHRoaXMucHJvcHMuZmlsdGVyaW5nIHx8XG4gICAgICB0aGlzLnByb3BzLnJlbW92aW5nKSAmJlxuICAgICAgIXRoaXMucHJvcHMuZGlzYWJsZUFjdGlvbkJhclxuICAgICkge1xuICAgICAgYWN0aW9uQmFyUmlnaHQgPSAoXG4gICAgICAgIDxBY3Rpb25CYXIgcG9zaXRpb249XCJyaWdodFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtYWN0aW9uYmFyLXJpZ2h0XCI+eyB0aGlzLnByb3BzLmFjdGlvbkJhciB9PC9kaXY+XG4gICAgICAgICAgeyAodGhpcy5wcm9wcy5maWx0ZXJpbmcgJiYgdGhpcy5wcm9wcy5kaXNhYmxlRHJvcGRvd25cbiAgICAgICAgICAgICYmICF0aGlzLnByb3BzLmRpc2FibGVGaWx0ZXJpbmdDb250cm9scykgJiZcbiAgICAgICAgICAgIDxGaWx0ZXJpbmdDb250cm9scyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgICB9XG4gICAgICAgICAgeyB0aGlzLnByb3BzLmlubGluZUVkaXQgJiZcbiAgICAgICAgICAgIDxJbmxpbmVFZGl0Q29udHJvbHNcbiAgICAgICAgICAgICAgYWZ0ZXJBZGRJdGVtPXt0aGlzLmhhbmRsZUFmdGVyQWRkSXRlbX1cbiAgICAgICAgICAgICAgYWZ0ZXJFZGl0UHJlc3M9e3RoaXMuaGFuZGxlQWZ0ZXJFZGl0UHJlc3N9XG4gICAgICAgICAgICAgIGFmdGVyVmFsaWRhdGlvbkVycm9yPXt0aGlzLmhhbmRsZUFmdGVyVmFsaWRhdGlvbkVycm9yfVxuICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgfVxuICAgICAgICAgIHsgKHRoaXMucHJvcHMuZHJvcGRvd25NZW51SXRlbXMgfHxcbiAgICAgICAgICAgICB0aGlzLnByb3BzLnJlbW92aW5nIHx8XG4gICAgICAgICAgICAgdGhpcy5wcm9wcy5jb2x1bW5TZXR0aW5ncyB8fFxuICAgICAgICAgICAgICh0aGlzLnByb3BzLmZpbHRlcmluZyAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlRHJvcGRvd24pKSAmJlxuICAgICAgICAgICAgIDxEcm9wZG93bkNvbnRyb2xzIHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICAgIH1cbiAgICAgICAgPC9BY3Rpb25CYXI+XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5hY3Rpb25CYXJMZWZ0IHx8IHRoaXMucHJvcHMuZ3JpZEhlYWRlcikge1xuICAgICAgYWN0aW9uQmFyTGVmdCA9IChcbiAgICAgICAgPEFjdGlvbkJhciBwb3NpdGlvbj1cImxlZnRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWdyaWRoZWFkZXJcIj57IHRoaXMucHJvcHMuZ3JpZEhlYWRlciB9PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1hY3Rpb25iYXItbGVmdFwiPnsgdGhpcy5wcm9wcy5hY3Rpb25CYXJMZWZ0IH08L2Rpdj5cbiAgICAgICAgPC9BY3Rpb25CYXI+XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoYWN0aW9uQmFyTGVmdCB8fCBhY3Rpb25CYXJSaWdodCkge1xuICAgICAgYWN0aW9uQmFyID0gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWFjdGlvbmJhci1jb250YWluZXJcIj5cbiAgICAgICAgICB7IGFjdGlvbkJhckxlZnQgfVxuICAgICAgICAgIHsgYWN0aW9uQmFyUmlnaHQgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICAgIGxldCByb3dzQ291bnQgPVxuICAgICAgKHRoaXMucHJvcHMucm93c0NvdW50IHx8IHRoaXMucHJvcHMucm93c0NvdW50ID09PSAwKSA/XG4gICAgICAgIHRoaXMucHJvcHMucm93c0NvdW50IDpcbiAgICAgICAgdGhpcy5wcm9wcy5kYXRhLnNpemU7XG4gICAgaWYgKHRoaXMucHJvcHMuaXNDcmVhdGluZykgcm93c0NvdW50ICs9IHRoaXMucHJvcHMuY3JlYXRlRGF0YS5zaXplO1xuICAgIGlmICghdGhpcy5wcm9wcy52aXNpYmxlQ29sdW1ucy5zaXplKSByb3dzQ291bnQgPSAwO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPXtgb2MtZGF0YWdyaWQtJHt0aGlzLnByb3BzLmdyaWQuaWR9YH1cbiAgICAgICAgY2xhc3NOYW1lPXtncmlkQ2xhc3NOYW1lfVxuICAgICAgICBzdHlsZT17dGhpcy5wcm9wcy5jb250YWluZXJTdHlsZX1cbiAgICAgID5cbiAgICAgICAgeyB0aGlzLnByb3BzLmlzQnVzeSAmJiA8U3Bpbm5lciAvPiB9XG4gICAgICAgIHsgdGhpcy5zdGF0ZS5jb250ZXh0TWVudU9wZW4gJiYgdGhpcy5yZW5kZXJDb250ZXh0TWVudSgpIH1cbiAgICAgICAgeyBhY3Rpb25CYXIgfVxuICAgICAgICA8UmVzcG9uc2l2ZUZpeGVkRGF0YVRhYmxlXG4gICAgICAgICAgaWQ9e3RoaXMucHJvcHMuZ3JpZC5pZH1cbiAgICAgICAgICByb3dzQ291bnQ9e3Jvd3NDb3VudH1cbiAgICAgICAgICBoZWFkZXJIZWlnaHQ9e3RoaXMucHJvcHMuaXNGaWx0ZXJpbmcgP1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5oZWFkZXJIZWlnaHQgKyB0aGlzLnByb3BzLmZpbHRlclJvd0hlaWdodFxuICAgICAgICAgICAgOiB0aGlzLnByb3BzLmhlYWRlckhlaWdodH1cbiAgICAgICAgICByb3dIZWlnaHQ9e3RoaXMucHJvcHMucm93SGVpZ2h0fVxuICAgICAgICAgIG9uQ29sdW1uUmVzaXplRW5kQ2FsbGJhY2s9e3RoaXMub25Db2x1bW5SZXNpemVFbmRDYWxsYmFja31cbiAgICAgICAgICBpc0NvbHVtblJlc2l6aW5nPXtmYWxzZX1cbiAgICAgICAgICBvblJvd0NsaWNrPXt0aGlzLmhhbmRsZVJvd0NsaWNrfVxuICAgICAgICAgIHNjcm9sbFRvQ29sdW1uPXt0aGlzLnByb3BzLnNjcm9sbFRvQ29sdW1uIHx8IHRoaXMuc3RhdGUuY3VycmVudENvbHVtbn1cbiAgICAgICAgICBzY3JvbGxUb3A9e3RoaXMucHJvcHMuc2Nyb2xsVG9wfVxuICAgICAgICAgIHNjcm9sbFRvUm93PXt0aGlzLmdldFNjcm9sbFRvUm93KCl9XG4gICAgICAgICAgb25Sb3dEb3VibGVDbGljaz17dGhpcy5wcm9wcy5vblJvd0RvdWJsZUNsaWNrfVxuICAgICAgICAgIG9uUm93TW91c2VEb3duPXt0aGlzLnByb3BzLm9uTW91c2VEb3dufVxuICAgICAgICAgIG9uUm93TW91c2VFbnRlcj17dGhpcy5wcm9wcy5vblJvd01vdXNlRW50ZXJ9XG4gICAgICAgICAgb25Sb3dNb3VzZUxlYXZlPXt0aGlzLnByb3BzLm9uUm93TW91c2VMZWF2ZX1cbiAgICAgICAgICBvblNjcm9sbFN0YXJ0PXt0aGlzLnByb3BzLm9uU2Nyb2xsU3RhcnR9XG4gICAgICAgICAgb25TY3JvbGxFbmQ9e3RoaXMucHJvcHMub25TY3JvbGxFbmR9XG4gICAgICAgICAgcm93Q2xhc3NOYW1lR2V0dGVyPXt0aGlzLmdldFJvd0NsYXNzTmFtZX1cbiAgICAgICAgICByb3dIZWlnaHRHZXR0ZXI9e3RoaXMucHJvcHMucm93SGVpZ2h0R2V0dGVyICYmIHRoaXMuaGFuZGxlUm93SGVpZ2h0R2V0dGVyfVxuICAgICAgICAgIG9uQ29udGVudEhlaWdodENoYW5nZT17dGhpcy5wcm9wcy5vbkNvbnRlbnRIZWlnaHRDaGFuZ2V9XG4gICAgICAgICAgb25Sb3dDb250ZXh0TWVudT17dGhpcy5oYW5kbGVDb250ZXh0TWVudX1cbiAgICAgICAgPlxuICAgICAgICAgIHsgdGhpcy5yZW5kZXJDb2x1bW5zKCkgfVxuICAgICAgICA8L1Jlc3BvbnNpdmVGaXhlZERhdGFUYWJsZT5cbiAgICAgICAgeyB0aGlzLnByb3BzLmlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW4gJiZcbiAgICAgICAgICA8Q29sdW1uU2V0dGluZ3NNb2RhbFxuICAgICAgICAgICAgZ3JpZD17dGhpcy5wcm9wcy5ncmlkfVxuICAgICAgICAgICAgY29sdW1ucz17dGhpcy5wcm9wcy5jb2x1bW5zfVxuICAgICAgICAgICAgdmlzaWJsZUNvbHVtbnM9e3RoaXMucHJvcHMudmlzaWJsZUNvbHVtbnN9XG4gICAgICAgICAgICBjbG9zZUNvbHVtblNldHRpbmdzTW9kYWw9e3RoaXMucHJvcHMuY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsfVxuICAgICAgICAgICAgc2F2ZUNvbHVtblNldHRpbmdzPXt0aGlzLnByb3BzLnNhdmVDb2x1bW5TZXR0aW5nc31cbiAgICAgICAgICAvPlxuICAgICAgICB9XG4gICAgICAgIHsgdGhpcy5wcm9wcy5jaGlsZHJlbiB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=