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
import { injectIntl, FormattedMessage as M } from 'react-intl';
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
import Utils from './datagrid.utils';
import GridColumnService from './column-service/column-service';
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
    forceRefreshTimestamp: state.datagrid.get('forceRefresh', 0), // force re-render when changed
    focusType: state.datagrid.getIn([GRID.id, 'session', 'focusType'], Map())
  };
};

var mapDispatchToProps = datagridActions;

export default (_dec = connect(mapStateToProps, mapDispatchToProps), injectIntl(_class = _dec(_class = (_temp = _class2 = function (_React$PureComponent) {
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
        var _props = _this2.props,
            columns = _props.columns,
            visibleColumns = _props.visibleColumns;

        var gridColumns = Utils.visibleColumns(columns, visibleColumns);
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
              var columnInd = gridColumns.findIndex(function (c) {
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
                      columnInd = gridColumns.length - 1;
                      rowInd -= 1;
                    } else {
                      break;
                    }
                  } else {
                    if (columnInd + 1 < gridColumns.length) {
                      columnInd += 1;
                    } else if (rowInd + 1 < rowsSize) {
                      columnInd = 0;
                      rowInd += 1;
                    } else {
                      break;
                    }
                  }
                  var nextColumnKey = Utils.getColumnKey(gridColumns[columnInd]);
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
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    // Get the value to display in edit cell
    var id = _this2.getDataIdByRowIndex(rowIndex);
    var editValue = _this2.props.editData.getIn([id].concat(col.valueKeyPath), undefined);
    var originalValue = void 0;
    if (editValue === undefined) {
      originalValue = _this2.props.data.getIn([rowIndex].concat(col.valueKeyPath), '');
    } else if (editValue === null) {
      return '';
    } else {
      // Value is found from editData
      // Format by component type
      switch (col.componentType) {
        case 'select':
          return col.selectComponentOptions.find(function (obj) {
            return obj.value === editValue;
          });
        case 'boolean':
          return options.find(function (obj) {
            return obj.value === editValue;
          });
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
      case 'float':
        {
          if (String(originalValue).length > 0) {
            return String(originalValue).replace('.', _this2.props.decimalSeparator);
          }
          return originalValue;
        }
      case 'select':
        return col.selectComponentOptions.find(function (obj) {
          return obj.value === originalValue;
        });
      case 'boolean':
        return options.find(function (obj) {
          return obj.value === originalValue;
        });
      default:
        return originalValue;
    }
  };

  this.getCreateItemValue = function (rowIndex, col) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    var val = _this2.props.createData.getIn([rowIndex].concat(col.valueKeyPath), '');
    if (val === null) {
      return '';
    } else if (col.componentType === 'select') {
      return col.selectComponentOptions.find(function (obj) {
        return obj.value === val;
      });
    } else if (['boolean'].includes(col.componentType)) {
      return options.find(function (obj) {
        return obj.value === val;
      });
    }
    return val;
  };

  this.getFilterItemValue = function (col) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    var val = _this2.props.filterData.get(Utils.getColumnKey(col), '');
    if (val === null) {
      return '';
    } else if (col.componentType === 'select') {
      return col.selectComponentOptions.find(function (obj) {
        return obj.value === val;
      });
    } else if (['checkbox', 'boolean'].includes(col.componentType)) {
      return options.find(function (obj) {
        return obj.value === val;
      });
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
    var _props2 = _this2.props,
        grid = _props2.grid,
        isCreating = _props2.isCreating,
        isEditing = _props2.isEditing,
        createData = _props2.createData,
        selectedItems = _props2.selectedItems,
        data = _props2.data;

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
    var elementTypes = ['text', 'number'];
    if (nextElement && elementTypes.includes(nextElement.type)) {
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
      var _props3 = _this2.props,
          data = _props3.data,
          dateFormat = _props3.dateFormat,
          thousandSeparator = _props3.thousandSeparator,
          decimalSeparator = _props3.decimalSeparator,
          grid = _props3.grid,
          inlineEdit = _props3.inlineEdit,
          filtering = _props3.filtering,
          region = _props3.region,
          intl = _props3.intl,
          selectComponentOptions = _props3.selectComponentOptions;


      var valueEmptyChecker = Utils.getValueEmptyChecker(col);
      // Cell value rendering
      var valueRender = function valueRender(rowIndex, format) {
        var val = data.getIn([rowIndex].concat(col.valueKeyPath));
        if (valueEmptyChecker(val)) {
          return col.isRequired ? React.createElement(M, { id: 'Grid.ValueIsMissing' }) : '';
        }
        return format ? format(val) : val;
      };

      var column = GridColumnService.baseColumn(col);
      // Collect column functions into one Object
      var columnFunctions = {
        edit: {
          getItemValue: _this2.getEditItemValue,
          onCellValueChange: _this2.onEditCellValueChange,
          onCellBlur: _this2.onEditCellBlur,
          onCellFocus: _this2.onCellFocus,
          onCellKeyDown: _this2.onEditCellKeyDown,
          handleCellRef: _this2.handleEditCellRef
        },
        create: {
          getItemValue: _this2.getCreateItemValue,
          onCellValueChange: _this2.onCreateCellValueChange,
          onCellBlur: _this2.onCreateCellBlur,
          onCellFocus: _this2.onCellFocus,
          onCellKeyDown: _this2.onCreateCellKeyDown,
          handleCellRef: _this2.handleCreateCellRef
        },
        filter: {
          getItemValue: _this2.getFilterItemValue,
          onCellValueChange: _this2.onFilterCellValueChange
        }
      };

      // handle column.cell / column.cellEdit / column.cellCreate / column.cellFilter
      var cellProps = { data: data, dateFormat: dateFormat, thousandSeparator: thousandSeparator, decimalSeparator: decimalSeparator }; // eslint-disable-line
      column = GridColumnService.columnCell(column, cellProps, col, valueRender);

      // handle columnComponentTypes
      var componentTypeProps = _extends({}, cellProps, { grid: grid, inlineEdit: inlineEdit, filtering: filtering, region: region, intl: intl, selectComponentOptions: selectComponentOptions }); // eslint-disable-line
      column = GridColumnService.columnComponentType(column, tabIndex, componentTypeProps, col, columnFunctions, _this2.getComponentDisabledState);

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
            style: { padding: '7px' },
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
      var _props4 = _this2.props,
          itemSelectionChange = _props4.itemSelectionChange,
          selectedItems = _props4.selectedItems,
          grid = _props4.grid,
          data = _props4.data;

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
      var _props5 = _this2.props,
          isCreating = _props5.isCreating,
          isEditing = _props5.isEditing,
          createData = _props5.createData,
          selectedCell = _props5.selectedCell,
          grid = _props5.grid;

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
      var isSpecial = props.columnKey === 'selectionCheckbox' || props.columnKey === 'extraColumn';
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
              id: 'ocDatagridCell-' + grid.id + '-' + props.columnKey + '-' + rowIndex,
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
            id: 'ocDatagridHeader-' + _this2.props.grid.id + '-' + col.columnKey,
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
    var _props6 = _this2.props,
        contextMenuItems = _props6.contextMenuItems,
        data = _props6.data,
        grid = _props6.grid,
        selectedItems = _props6.selectedItems;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiTWFwIiwiTGlzdCIsImNvbm5lY3QiLCJpbmplY3RJbnRsIiwiRm9ybWF0dGVkTWVzc2FnZSIsIk0iLCJDb2x1bW4iLCJDZWxsIiwiTWVudUl0ZW0iLCJjbGFzc05hbWVzIiwiSWNvbiIsIlNwaW5uZXIiLCJDaGVja2JveCIsIlJlc3BvbnNpdmVGaXhlZERhdGFUYWJsZSIsIkhlYWRlckNlbGwiLCJBY3Rpb25CYXIiLCJJbmxpbmVFZGl0Q29udHJvbHMiLCJGaWx0ZXJpbmdDb250cm9scyIsIkRyb3Bkb3duQ29udHJvbHMiLCJkYXRhZ3JpZEFjdGlvbnMiLCJDZWxsVG9vbHRpcCIsIkNvbHVtblNldHRpbmdzTW9kYWwiLCJwcm9wVHlwZXMiLCJkZWZhdWx0UHJvcHMiLCJLRVlfQ09ERVMiLCJVdGlscyIsIkdyaWRDb2x1bW5TZXJ2aWNlIiwibWFwU3RhdGVUb1Byb3BzIiwic3RhdGUiLCJvd25Qcm9wcyIsIkdSSUQiLCJncmlkIiwiaXNCdXN5IiwiZGF0YWdyaWQiLCJnZXRJbiIsImlkIiwiaXNFZGl0aW5nIiwiaXNDcmVhdGluZyIsImlzRmlsdGVyaW5nIiwiaXNDb2x1bW5TZXR0aW5nc01vZGFsT3BlbiIsInNvcnRDb2x1bW4iLCJzb3J0T3JkZXIiLCJ2aXNpYmxlQ29sdW1ucyIsImNvbHVtbldpZHRocyIsInNlbGVjdGVkQ2VsbCIsInNlbGVjdGVkSXRlbXMiLCJkYXRhIiwiZWRpdERhdGEiLCJjcmVhdGVEYXRhIiwiZmlsdGVyRGF0YSIsImNlbGxNZXNzYWdlcyIsImNyZWF0ZUNlbGxNZXNzYWdlcyIsImFsbERhdGFTaXplIiwic2l6ZSIsImxhbmd1YWdlIiwiZ2V0TGFuZ3VhZ2UiLCJ1c2VyIiwicmVnaW9uIiwiZ2V0UmVnaW9uIiwiZGF0ZUZvcm1hdCIsImdldERhdGVGb3JtYXQiLCJ0aG91c2FuZFNlcGFyYXRvciIsImdldFRob3VzYW5kU2VwYXJhdG9yIiwiZGVjaW1hbFNlcGFyYXRvciIsImdldERlY2ltYWxTZXBhcmF0b3IiLCJmb3JjZVJlZnJlc2hUaW1lc3RhbXAiLCJnZXQiLCJmb2N1c1R5cGUiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJwcm9wcyIsImN1cnJlbnRSb3ciLCJjdXJyZW50Q29sdW1uIiwiY2VsbFJlZnMiLCJmb2N1c1RvQ3JlYXRlQ2VsbCIsImZvY3VzVG9FZGl0Q2VsbCIsImZvY3VzVG9FcnJvckNlbGwiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImRvY3VtZW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIm9uRG9jdW1lbnRDbGljayIsImludmFsaWRhdGUiLCJyZW5kZXIiLCJncmlkQ2xhc3NOYW1lIiwiaW5saW5lRWRpdCIsImRpc2FibGVBY3Rpb25CYXIiLCJjbGFzc05hbWUiLCJzZXRGb2N1c1RvIiwiYWN0aW9uQmFyIiwiYWN0aW9uQmFyUmlnaHQiLCJhY3Rpb25CYXJMZWZ0IiwiZmlsdGVyaW5nIiwicmVtb3ZpbmciLCJkaXNhYmxlRHJvcGRvd24iLCJkaXNhYmxlRmlsdGVyaW5nQ29udHJvbHMiLCJoYW5kbGVBZnRlckFkZEl0ZW0iLCJoYW5kbGVBZnRlckVkaXRQcmVzcyIsImhhbmRsZUFmdGVyVmFsaWRhdGlvbkVycm9yIiwiZHJvcGRvd25NZW51SXRlbXMiLCJjb2x1bW5TZXR0aW5ncyIsImdyaWRIZWFkZXIiLCJyb3dzQ291bnQiLCJjb250YWluZXJTdHlsZSIsImNvbnRleHRNZW51T3BlbiIsInJlbmRlckNvbnRleHRNZW51IiwiaGVhZGVySGVpZ2h0IiwiZmlsdGVyUm93SGVpZ2h0Iiwicm93SGVpZ2h0Iiwib25Db2x1bW5SZXNpemVFbmRDYWxsYmFjayIsImhhbmRsZVJvd0NsaWNrIiwic2Nyb2xsVG9Db2x1bW4iLCJzY3JvbGxUb3AiLCJnZXRTY3JvbGxUb1JvdyIsIm9uUm93RG91YmxlQ2xpY2siLCJvbk1vdXNlRG93biIsIm9uUm93TW91c2VFbnRlciIsIm9uUm93TW91c2VMZWF2ZSIsIm9uU2Nyb2xsU3RhcnQiLCJvblNjcm9sbEVuZCIsImdldFJvd0NsYXNzTmFtZSIsInJvd0hlaWdodEdldHRlciIsImhhbmRsZVJvd0hlaWdodEdldHRlciIsIm9uQ29udGVudEhlaWdodENoYW5nZSIsImhhbmRsZUNvbnRleHRNZW51IiwicmVuZGVyQ29sdW1ucyIsImNvbHVtbnMiLCJjbG9zZUNvbHVtblNldHRpbmdzTW9kYWwiLCJzYXZlQ29sdW1uU2V0dGluZ3MiLCJjaGlsZHJlbiIsIlB1cmVDb21wb25lbnQiLCJjb250ZXh0TWVudUl0ZW1zIiwic2V0U3RhdGUiLCJuZXdDb2x1bW5XaWR0aCIsImNvbHVtbktleSIsInJlc2l6ZUNvbHVtbiIsIm9uQ3JlYXRlQ2VsbEtleURvd24iLCJlIiwia2V5Q29kZSIsIkVOVEVSIiwiYWRkTmV3SXRlbSIsImdldENvbHVtbkRlZmF1bHRWYWx1ZXMiLCJvbkVkaXRDZWxsS2V5RG93biIsImNvbCIsInJvd0luZGV4IiwiZW5hYmxlQXJyb3dOYXZpZ2F0aW9uIiwiZ3JpZENvbHVtbnMiLCJyb3dzU2l6ZSIsImdldENvbHVtbktleSIsIkRPV04iLCJ2YWx1ZVR5cGUiLCJuZXh0RWxlbWVudCIsIm1vdmVDZWxsRm9jdXMiLCJVUCIsIlRBQiIsIlJJR0hUIiwiTEVGVCIsInByZXZlbnREZWZhdWx0IiwiY29sdW1uSW5kIiwiZmluZEluZGV4IiwiYyIsInZhbHVlS2V5UGF0aCIsImpvaW4iLCJkaXNhYmxlZCIsInJvd0luZCIsInNoaWZ0S2V5IiwibGVuZ3RoIiwibmV4dENvbHVtbktleSIsIm9uRmlsdGVyQ2VsbFZhbHVlQ2hhbmdlIiwidmFsdWVQYXJzZXIiLCJldmVudE9yRGF0YSIsInJhd1ZhbHVlIiwidGFyZ2V0IiwidW5kZWZpbmVkIiwidmFsdWUiLCJmaWx0ZXJDZWxsVmFsdWVDaGFuZ2UiLCJvbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSIsImNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSIsIm9uQ3JlYXRlVmFsdWVDaGFuZ2UiLCJvblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZSIsIm1hdGNoVmFsdWUiLCJuZXdWYWx1ZUtleVBhdGgiLCJ2IiwibmV3VmFsdWUiLCJ2YWxpZGF0b3JzIiwiY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUiLCJvbkVkaXRDZWxsVmFsdWVDaGFuZ2UiLCJkYXRhSWQiLCJnZXREYXRhSWRCeVJvd0luZGV4IiwiZWRpdENlbGxWYWx1ZUNoYW5nZSIsIm9uRWRpdFZhbHVlQ2hhbmdlIiwiZWRpdENlbGxWYWx1ZVZhbGlkYXRlIiwib25DcmVhdGVDZWxsQmx1ciIsIm9uQ3JlYXRlQmx1ciIsImdldEVkaXRJdGVtVmFsdWUiLCJvbkVkaXRDZWxsQmx1ciIsIm9uRWRpdEJsdXIiLCJvbkNlbGxGb2N1cyIsImNlbGxUeXBlIiwiaW5wdXRUeXBlIiwic2VsZWN0IiwiY2VsbFNlbGVjdCIsImNlbGxTZWxlY3Rpb25DaGFuZ2UiLCJpZEtleVBhdGgiLCJnZXRTZWxlY3RlZEl0ZW1JbmRleCIsImluZGV4Iiwib3B0aW9ucyIsImVkaXRWYWx1ZSIsIm9yaWdpbmFsVmFsdWUiLCJjb21wb25lbnRUeXBlIiwic2VsZWN0Q29tcG9uZW50T3B0aW9ucyIsImZpbmQiLCJvYmoiLCJTdHJpbmciLCJyZXBsYWNlIiwiZ2V0Q3JlYXRlSXRlbVZhbHVlIiwidmFsIiwiaW5jbHVkZXMiLCJnZXRGaWx0ZXJJdGVtVmFsdWUiLCJnZXRDb21wb25lbnREaXNhYmxlZFN0YXRlIiwibW9kZSIsImNvbXBvbmVudERpc2FibGVkIiwiZGlzYWJsZUVkaXRpbmciLCJkaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaCIsIm1hdGNoVmFsdWVLZXlQYXRoIiwicm93Q2xhc3NOYW1lcyIsImV4dHJhUm93Q291bnQiLCJwdXNoIiwiaW5kZXhPZiIsInJvd0NsYXNzTmFtZUdldHRlciIsImdldENlbGxNZXNzYWdlcyIsInJldHVybkRhdGEiLCJpbmZvTWVzc2FnZSIsImVycm9yTWVzc2FnZSIsIndhcm5pbmdNZXNzYWdlIiwic2Nyb2xsVG9Sb3ciLCJzY3JvbGxOZXdSb3ciLCJmaXJzdCIsImZvY3VzVG8iLCJwcmV2Rm9jdXNUbyIsImZvY3VzVG9MYXN0Um93IiwiaGFuZGxlQ2VsbFNlbGVjdCIsImhhbmRsZUNyZWF0ZUNlbGxSZWYiLCJyZWYiLCJmb2N1cyIsImhhbmRsZUVkaXRDZWxsUmVmIiwic2VsZWN0ZWRSb3dJbmRleCIsImNvbHVtbkluZGV4IiwiZWxlbWVudFR5cGVzIiwidHlwZSIsInNldFRpbWVvdXQiLCJoYW5kbGVTZWxlY3Rpb25DaGVja0JveE9uQ2hhbmdlIiwiaXRlbVNlbGVjdGlvbkNoYW5nZSIsImdlbmVyYXRlQ29sdW1ucyIsImV4dHJhQ29sdW1uIiwidGFiSW5kZXgiLCJ3aWR0aCIsImlzUmVzaXphYmxlIiwiaXNTb3J0YWJsZSIsImNlbGwiLCJ2YWx1ZVJlbmRlciIsImNlbGxFZGl0IiwiY2VsbENyZWF0ZSIsImNlbGxGaWx0ZXIiLCJyb3dTZWxlY3RDaGVja2JveENvbHVtbiIsInJvd0l0ZW0iLCJpdGVtSWQiLCJzZWxlY3RlZCIsImZvckVhY2giLCJ2aXNpYmxlQ29sdW1uS2V5Iiwib3JnQ29sIiwiaW50bCIsInZhbHVlRW1wdHlDaGVja2VyIiwiZ2V0VmFsdWVFbXB0eUNoZWNrZXIiLCJmb3JtYXQiLCJpc1JlcXVpcmVkIiwiY29sdW1uIiwiYmFzZUNvbHVtbiIsImNvbHVtbkZ1bmN0aW9ucyIsImVkaXQiLCJnZXRJdGVtVmFsdWUiLCJvbkNlbGxWYWx1ZUNoYW5nZSIsIm9uQ2VsbEJsdXIiLCJvbkNlbGxLZXlEb3duIiwiaGFuZGxlQ2VsbFJlZiIsImNyZWF0ZSIsImZpbHRlciIsImNlbGxQcm9wcyIsImNvbHVtbkNlbGwiLCJjb21wb25lbnRUeXBlUHJvcHMiLCJjb2x1bW5Db21wb25lbnRUeXBlIiwicGFkZGluZyIsInJlbW92ZU5ld0l0ZW0iLCJpc0NlbGxFZGl0ZWQiLCJyb3dTZWxlY3QiLCJjdHJsS2V5IiwiZ2V0U2VsZWN0aW9uIiwicmVtb3ZlQWxsUmFuZ2VzIiwicGFyZW50Tm9kZSIsInBhcmVudDFjbGFzcyIsInBhcmVudDJjbGFzcyIsInBhcmVudDNjbGFzcyIsInBhcmVudDRjbGFzcyIsIm11bHRpU2VsZWN0Iiwib25Sb3dDbGljayIsInN0b3BQcm9wYWdhdGlvbiIsImNvbnRleHRNZW51WCIsImNsaWVudFgiLCJjb250ZXh0TWVudVkiLCJjbGllbnRZIiwiYWRkRXZlbnRMaXN0ZW5lciIsImhhbmRsZUNvbnRleHRNZW51SXRlbUNsaWNrIiwib25DbGljayIsInNlbGVjdGVkRGF0YSIsInJlbmRlckNlbGwiLCJpc1NwZWNpYWwiLCJnZXRSb3dJbmRleCIsIm1lc3NhZ2VEYXRhIiwiaXNFZGl0ZWQiLCJzdHlsZSIsInRleHRBbGlnbiIsImxlbmdodCIsIm1hcCIsInNvcnRDaGFuZ2UiLCJoZWFkZXIiLCJtaW5XaWR0aCIsIm1heFdpZHRoIiwiZmxleEdyb3ciLCJmaXhlZCIsImFsbG93Q2VsbHNSZWN5Y2xpbmciLCJkaXNwbGF5IiwiekluZGV4IiwicG9zaXRpb24iLCJ0b3AiLCJsZWZ0IiwiZCIsIml0ZW0iLCJpIiwiZGl2aWRlciIsInRpdGxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTtBQUNBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxTQUFTQyxHQUFULEVBQWNDLElBQWQsUUFBMEIsV0FBMUI7QUFDQSxTQUFTQyxPQUFULFFBQXdCLGFBQXhCO0FBQ0EsU0FDRUMsVUFERixFQUVFQyxvQkFBb0JDLENBRnRCLFFBR08sWUFIUDtBQUlBLFNBQVNDLE1BQVQsRUFBaUJDLElBQWpCLFFBQTZCLG9CQUE3QjtBQUNBLFNBQVNDLFFBQVQsUUFBeUIsaUJBQXpCO0FBQ0EsT0FBT0MsVUFBUCxNQUF1QixZQUF2QjtBQUNBLFNBQVNDLElBQVQsUUFBcUIseUJBQXJCO0FBQ0EsT0FBT0MsT0FBUCxNQUFvQiwyQkFBcEI7QUFDQSxPQUFPQyxRQUFQLE1BQXFCLDRCQUFyQjtBQUNBLE9BQU8sOENBQVA7O0FBRUEsT0FBT0Msd0JBQVAsTUFBcUMseUNBQXJDO0FBQ0EsT0FBT0MsVUFBUCxNQUF1Qix5QkFBdkI7QUFDQSxPQUFPQyxTQUFQLE1BQXNC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bnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tbG9uZWx5LWlmLCBwcmVmZXItdGVtcGxhdGUsIHJlYWN0L3JlcXVpcmUtZGVmYXVsdC1wcm9wcyAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IE1hcCwgTGlzdCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHtcbiAgaW5qZWN0SW50bCxcbiAgRm9ybWF0dGVkTWVzc2FnZSBhcyBNLFxufSBmcm9tICdyZWFjdC1pbnRsJztcbmltcG9ydCB7IENvbHVtbiwgQ2VsbCB9IGZyb20gJ2ZpeGVkLWRhdGEtdGFibGUtMic7XG5pbXBvcnQgeyBNZW51SXRlbSB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IEljb24gfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1pY29ucyc7XG5pbXBvcnQgU3Bpbm5lciBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1zcGlubmVyJztcbmltcG9ydCBDaGVja2JveCBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1jaGVja2JveCc7XG5pbXBvcnQgJ2ZpeGVkLWRhdGEtdGFibGUtMi9kaXN0L2ZpeGVkLWRhdGEtdGFibGUuY3NzJztcblxuaW1wb3J0IFJlc3BvbnNpdmVGaXhlZERhdGFUYWJsZSBmcm9tICcuL3Jlc3BvbnNpdmUtZml4ZWQtZGF0YS10YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IEhlYWRlckNlbGwgZnJvbSAnLi9oZWFkZXItY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IEFjdGlvbkJhciBmcm9tICcuL2FjdGlvbi1iYXIuY29tcG9uZW50JztcbmltcG9ydCBJbmxpbmVFZGl0Q29udHJvbHMgZnJvbSAnLi9pbmxpbmUtZWRpdC1jb250cm9scy5jb21wb25lbnQnO1xuaW1wb3J0IEZpbHRlcmluZ0NvbnRyb2xzIGZyb20gJy4vZmlsdGVyaW5nLWNvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgRHJvcGRvd25Db250cm9scyBmcm9tICcuL2Ryb3Bkb3duLWNvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgKiBhcyBkYXRhZ3JpZEFjdGlvbnMgZnJvbSAnLi9kYXRhZ3JpZC5hY3Rpb25zJztcbmltcG9ydCBDZWxsVG9vbHRpcCBmcm9tICcuL2NlbGwtdG9vbHRpcC5jb21wb25lbnQnO1xuaW1wb3J0IENvbHVtblNldHRpbmdzTW9kYWwgZnJvbSAnLi9jb2x1bW4tc2V0dGluZ3MvY29sdW1uLXNldHRpbmdzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBwcm9wVHlwZXMsIGRlZmF1bHRQcm9wcyB9IGZyb20gJy4vZGF0YWdyaWQucHJvcHMnO1xuaW1wb3J0IHsgS0VZX0NPREVTIH0gZnJvbSAnLi9kYXRhZ3JpZC5jb25zdGFudHMnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4vZGF0YWdyaWQudXRpbHMnO1xuaW1wb3J0IEdyaWRDb2x1bW5TZXJ2aWNlIGZyb20gJy4vY29sdW1uLXNlcnZpY2UvY29sdW1uLXNlcnZpY2UnO1xuaW1wb3J0ICcuL2RhdGFncmlkLmNvbXBvbmVudC5zY3NzJztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlLCBvd25Qcm9wcykgPT4ge1xuICBjb25zdCBHUklEID0gb3duUHJvcHMuZ3JpZDtcbiAgcmV0dXJuIHtcbiAgICBpc0J1c3k6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdpc0J1c3knXSwgdHJ1ZSksXG4gICAgaXNFZGl0aW5nOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnaXNFZGl0aW5nJ10sIGZhbHNlKSxcbiAgICBpc0NyZWF0aW5nOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnaXNDcmVhdGluZyddLCBmYWxzZSksXG4gICAgaXNGaWx0ZXJpbmc6XG4gICAgICBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2lzRmlsdGVyaW5nJ10sIGZhbHNlKSxcbiAgICBpc0NvbHVtblNldHRpbmdzTW9kYWxPcGVuOlxuICAgICAgc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2NvbHVtblNldHRpbmdzTW9kYWwnLCAnb3BlbiddLCBmYWxzZSksXG4gICAgc29ydENvbHVtbjogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnc29ydGluZ0RhdGEnLCAnc29ydENvbHVtbiddLCBudWxsKSxcbiAgICBzb3J0T3JkZXI6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ3NvcnRpbmdEYXRhJywgJ3NvcnRPcmRlciddLCBudWxsKSxcbiAgICB2aXNpYmxlQ29sdW1uczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAndmlzaWJsZUNvbHVtbnMnXSwgTGlzdCgpKSxcbiAgICBjb2x1bW5XaWR0aHM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ2NvbHVtbldpZHRocyddLCBNYXAoKSksXG4gICAgc2VsZWN0ZWRDZWxsOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3NlbGVjdGVkQ2VsbCddLCBNYXAoKSksXG4gICAgc2VsZWN0ZWRJdGVtczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZWxlY3RlZEl0ZW1zJ10sIExpc3QoKSksXG4gICAgZGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdkYXRhJ10sIExpc3QoKSksXG4gICAgZWRpdERhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnZWRpdERhdGEnXSwgTWFwKCkpLFxuICAgIGNyZWF0ZURhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY3JlYXRlRGF0YSddLCBMaXN0KCkpLFxuICAgIGZpbHRlckRhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnZmlsdGVyRGF0YSddLCBNYXAoKSksXG4gICAgY2VsbE1lc3NhZ2VzOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NlbGxNZXNzYWdlcyddLCBNYXAoKSksXG4gICAgY3JlYXRlQ2VsbE1lc3NhZ2VzOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NyZWF0ZUNlbGxNZXNzYWdlcyddLCBNYXAoKSksXG4gICAgYWxsRGF0YVNpemU6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnYWxsRGF0YSddLCBMaXN0KCkpLnNpemUsXG4gICAgbGFuZ3VhZ2U6IFV0aWxzLmdldExhbmd1YWdlKEdSSUQsIHN0YXRlLnVzZXIpLFxuICAgIHJlZ2lvbjogVXRpbHMuZ2V0UmVnaW9uKEdSSUQsIHN0YXRlLnVzZXIpLFxuICAgIGRhdGVGb3JtYXQ6IFV0aWxzLmdldERhdGVGb3JtYXQoR1JJRCwgc3RhdGUudXNlciksXG4gICAgdGhvdXNhbmRTZXBhcmF0b3I6IFV0aWxzLmdldFRob3VzYW5kU2VwYXJhdG9yKEdSSUQsIHN0YXRlLnVzZXIpLFxuICAgIGRlY2ltYWxTZXBhcmF0b3I6IFV0aWxzLmdldERlY2ltYWxTZXBhcmF0b3IoR1JJRCwgc3RhdGUudXNlciksXG4gICAgZm9yY2VSZWZyZXNoVGltZXN0YW1wOiBzdGF0ZS5kYXRhZ3JpZC5nZXQoJ2ZvcmNlUmVmcmVzaCcsIDApLCAvLyBmb3JjZSByZS1yZW5kZXIgd2hlbiBjaGFuZ2VkXG4gICAgZm9jdXNUeXBlOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnZm9jdXNUeXBlJ10sIE1hcCgpKSxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRhdGFncmlkQWN0aW9ucztcblxuZXhwb3J0IGRlZmF1bHRcbkBpbmplY3RJbnRsXG5AY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcylcbmNsYXNzIERhdGFHcmlkIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSBwcm9wVHlwZXM7XG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGN1cnJlbnRSb3c6IDAsXG4gICAgICBjdXJyZW50Q29sdW1uOiAwLFxuICAgIH07XG4gICAgdGhpcy5jZWxsUmVmcyA9IHt9O1xuICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgPSBmYWxzZTtcbiAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IGZhbHNlOyAvLyBUT0RPOiBIYW5kbGUgZm9jdXNpbmcgd2hlbiB0cnVlXG4gICAgdGhpcy5mb2N1c1RvRXJyb3JDZWxsID0gZmFsc2U7IC8vIFRPRE86IEhhbmRsZSBmb2N1c2luZyB3aGVuIHRydWVcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkRvY3VtZW50Q2xpY2spO1xuICAgIHRoaXMucHJvcHMuaW52YWxpZGF0ZSh0aGlzLnByb3BzLmdyaWQpO1xuICB9XG5cbiAgb25Eb2N1bWVudENsaWNrID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmNvbnRleHRNZW51SXRlbXMpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjb250ZXh0TWVudU9wZW46IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkRvY3VtZW50Q2xpY2spO1xuICB9XG5cbiAgb25Db2x1bW5SZXNpemVFbmRDYWxsYmFjayA9IChuZXdDb2x1bW5XaWR0aCwgY29sdW1uS2V5KSA9PiB7XG4gICAgdGhpcy5wcm9wcy5yZXNpemVDb2x1bW4odGhpcy5wcm9wcy5ncmlkLCBjb2x1bW5LZXksIG5ld0NvbHVtbldpZHRoKTtcbiAgfVxuXG4gIG9uQ3JlYXRlQ2VsbEtleURvd24gPSAoZSkgPT4ge1xuICAgIGlmIChlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5FTlRFUikge1xuICAgICAgdGhpcy5wcm9wcy5hZGROZXdJdGVtKHRoaXMucHJvcHMuZ3JpZCwgVXRpbHMuZ2V0Q29sdW1uRGVmYXVsdFZhbHVlcyh0aGlzLnByb3BzLmNvbHVtbnMpKTtcbiAgICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIG9uRWRpdENlbGxLZXlEb3duID0gKGNvbCwgcm93SW5kZXgpID0+IChlKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuZW5hYmxlQXJyb3dOYXZpZ2F0aW9uKSB7XG4gICAgICBjb25zdCB7IGNvbHVtbnMsIHZpc2libGVDb2x1bW5zIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3QgZ3JpZENvbHVtbnMgPSBVdGlscy52aXNpYmxlQ29sdW1ucyhjb2x1bW5zLCB2aXNpYmxlQ29sdW1ucyk7XG4gICAgICBjb25zdCByb3dzU2l6ZSA9IHRoaXMucHJvcHMuZGF0YS5zaXplO1xuICAgICAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCk7XG4gICAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuICAgICAgICBjYXNlIEtFWV9DT0RFUy5ET1dOOiB7XG4gICAgICAgICAgaWYgKGNvbC52YWx1ZVR5cGUgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBjb25zdCBuZXh0RWxlbWVudCA9IHRoaXMuY2VsbFJlZnNbYCR7dGhpcy5wcm9wcy5ncmlkLmlkfV8ke2NvbHVtbktleX1fJHtyb3dJbmRleCArIDF9YF07XG4gICAgICAgICAgICB0aGlzLm1vdmVDZWxsRm9jdXMobmV4dEVsZW1lbnQsIHJvd0luZGV4ICsgMSwgLTEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5VUDoge1xuICAgICAgICAgIGlmIChjb2wudmFsdWVUeXBlICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgY29uc3QgbmV4dEVsZW1lbnQgPSB0aGlzLmNlbGxSZWZzW2Ake3RoaXMucHJvcHMuZ3JpZC5pZH1fJHtjb2x1bW5LZXl9XyR7cm93SW5kZXggLSAxfWBdO1xuICAgICAgICAgICAgdGhpcy5tb3ZlQ2VsbEZvY3VzKG5leHRFbGVtZW50LCByb3dJbmRleCAtIDEsIC0xKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuVEFCOlxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5SSUdIVDpcbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuTEVGVDoge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBsZXQgY29sdW1uSW5kID0gZ3JpZENvbHVtbnMuZmluZEluZGV4KGMgPT4gYy52YWx1ZUtleVBhdGguam9pbignLycpID09PSBjb2x1bW5LZXkpO1xuICAgICAgICAgIGlmIChjb2x1bW5JbmQgIT09IC0xKSB7XG4gICAgICAgICAgICBsZXQgZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgbGV0IG5leHRFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIGxldCByb3dJbmQgPSByb3dJbmRleDtcbiAgICAgICAgICAgIHdoaWxlIChkaXNhYmxlZCkge1xuICAgICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuTEVGVCB8fCAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuVEFCICYmIGUuc2hpZnRLZXkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbHVtbkluZCAtIDEgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kIC09IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyb3dJbmQgLSAxID49IDApIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCA9IGdyaWRDb2x1bW5zLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgICByb3dJbmQgLT0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChjb2x1bW5JbmQgKyAxIDwgZ3JpZENvbHVtbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgKz0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJvd0luZCArIDEgPCByb3dzU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kID0gMDtcbiAgICAgICAgICAgICAgICAgIHJvd0luZCArPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29uc3QgbmV4dENvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShncmlkQ29sdW1uc1tjb2x1bW5JbmRdKTtcbiAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSB0aGlzLmNlbGxSZWZzW2Ake3RoaXMucHJvcHMuZ3JpZC5pZH1fJHtuZXh0Q29sdW1uS2V5fV8ke3Jvd0luZH1gXTtcbiAgICAgICAgICAgICAgZGlzYWJsZWQgPSBuZXh0RWxlbWVudCA/IG5leHRFbGVtZW50LmRpc2FibGVkIDogZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWRpc2FibGVkICYmIG5leHRFbGVtZW50KSB7XG4gICAgICAgICAgICAgIHRoaXMubW92ZUNlbGxGb2N1cyhuZXh0RWxlbWVudCwgcm93SW5kLCBjb2x1bW5JbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uRmlsdGVyQ2VsbFZhbHVlQ2hhbmdlID0gKGNvbCwgdmFsdWVQYXJzZXIpID0+IChldmVudE9yRGF0YSkgPT4ge1xuICAgIGxldCByYXdWYWx1ZTtcbiAgICAvLyBldmVudE9yRGF0YSBjYW4gYmUgaW5wdXQgb25DaGFuZ2UgZXZlbnQsIHJlYWN0LXNlbGVjdCBvbkNoYW5nZSBvciByZWFjdC1kYXktcGlja2VyIG9uQ2hhbmdlXG4gICAgaWYgKGV2ZW50T3JEYXRhKSB7XG4gICAgICBpZiAoZXZlbnRPckRhdGEudGFyZ2V0ICE9PSB1bmRlZmluZWQpIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlO1xuICAgICAgZWxzZSBpZiAoZXZlbnRPckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkgcmF3VmFsdWUgPSBldmVudE9yRGF0YS52YWx1ZTtcbiAgICAgIGVsc2UgcmF3VmFsdWUgPSBldmVudE9yRGF0YTtcbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSB2YWx1ZVBhcnNlcihyYXdWYWx1ZSk7XG4gICAgdGhpcy5wcm9wcy5maWx0ZXJDZWxsVmFsdWVDaGFuZ2UoXG4gICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICB0aGlzLnByb3BzLmNvbHVtbnMsXG4gICAgICBjb2wsXG4gICAgICB2YWx1ZSxcbiAgICApO1xuICB9XG5cbiAgb25DcmVhdGVDZWxsVmFsdWVDaGFuZ2UgPSAocm93SW5kZXgsIGNvbCwgdmFsdWVQYXJzZXIpID0+IChldmVudE9yRGF0YSkgPT4ge1xuICAgIGxldCByYXdWYWx1ZTtcbiAgICAvLyBldmVudE9yRGF0YSBjYW4gYmUgaW5wdXQgb25DaGFuZ2UgZXZlbnQsIHJlYWN0LXNlbGVjdCBvbkNoYW5nZSBvciByZWFjdC1kYXktcGlja2VyIG9uQ2hhbmdlXG4gICAgaWYgKGV2ZW50T3JEYXRhKSB7XG4gICAgICBpZiAoZXZlbnRPckRhdGEudGFyZ2V0ICE9PSB1bmRlZmluZWQpIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlO1xuICAgICAgZWxzZSBpZiAoZXZlbnRPckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkgcmF3VmFsdWUgPSBldmVudE9yRGF0YS52YWx1ZTtcbiAgICAgIGVsc2UgcmF3VmFsdWUgPSBldmVudE9yRGF0YTtcbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSB2YWx1ZVBhcnNlcihyYXdWYWx1ZSk7XG4gICAgdGhpcy5wcm9wcy5jcmVhdGVDZWxsVmFsdWVDaGFuZ2UodGhpcy5wcm9wcy5ncmlkLCByb3dJbmRleCwgY29sLnZhbHVlS2V5UGF0aCwgdmFsdWUpO1xuICAgIGlmIChjb2wub25DcmVhdGVWYWx1ZUNoYW5nZSkge1xuICAgICAgY29sLm9uQ3JlYXRlVmFsdWVDaGFuZ2UodmFsdWUsIGNvbC52YWx1ZUtleVBhdGgsIHJvd0luZGV4KTtcbiAgICB9XG4gICAgaWYgKGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZSAmJiB2YWx1ZSA9PT0gY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm1hdGNoVmFsdWUpIHtcbiAgICAgIC8vIENhbGwgc3BlY2lhbCBwYWlyZWQgdmFsdWUgY2hhbmdlIG9uIG90aGVyIGNlbGwgaWYgdmFsdWUgbWF0Y2hlc1xuICAgICAgdGhpcy5vbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZShcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIHsgdmFsdWVLZXlQYXRoOiBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWVLZXlQYXRoIH0sXG4gICAgICAgIHYgPT4gdixcbiAgICAgICkoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm5ld1ZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNvbC52YWxpZGF0b3JzKSB7XG4gICAgICB0aGlzLnByb3BzLmNyZWF0ZUNlbGxWYWx1ZVZhbGlkYXRlKFxuICAgICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICBjb2wudmFsdWVLZXlQYXRoLFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgY29sLnZhbGlkYXRvcnMsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIG9uRWRpdENlbGxWYWx1ZUNoYW5nZSA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGV2ZW50T3JEYXRhKSA9PiB7XG4gICAgY29uc3QgZGF0YUlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICBsZXQgcmF3VmFsdWU7XG4gICAgLy8gZXZlbnRPckRhdGEgY2FuIGJlIGlucHV0IG9uQ2hhbmdlIGV2ZW50LCByZWFjdC1zZWxlY3Qgb25DaGFuZ2Ugb3IgcmVhY3QtZGF5LXBpY2tlciBvbkNoYW5nZVxuICAgIGlmIChldmVudE9yRGF0YSkge1xuICAgICAgaWYgKGV2ZW50T3JEYXRhLnRhcmdldCAhPT0gdW5kZWZpbmVkKSByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZTtcbiAgICAgIGVsc2UgaWYgKGV2ZW50T3JEYXRhLnZhbHVlICE9PSB1bmRlZmluZWQpIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudmFsdWU7XG4gICAgICBlbHNlIHJhd1ZhbHVlID0gZXZlbnRPckRhdGE7XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlID0gdmFsdWVQYXJzZXIocmF3VmFsdWUpO1xuICAgIHRoaXMucHJvcHMuZWRpdENlbGxWYWx1ZUNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIGRhdGFJZCwgY29sLnZhbHVlS2V5UGF0aCwgdmFsdWUpO1xuICAgIGlmIChjb2wub25FZGl0VmFsdWVDaGFuZ2UpIHtcbiAgICAgIGNvbC5vbkVkaXRWYWx1ZUNoYW5nZSh2YWx1ZSwgY29sLnZhbHVlS2V5UGF0aCwgcm93SW5kZXgsIGRhdGFJZCk7XG4gICAgfVxuICAgIGlmIChjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUgJiYgdmFsdWUgPT09IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5tYXRjaFZhbHVlKSB7XG4gICAgICAvLyBDYWxsIHNwZWNpYWwgcGFpcmVkIHZhbHVlIGNoYW5nZSBvbiBvdGhlciBjZWxsIGlmIHZhbHVlIG1hdGNoZXNcbiAgICAgIHRoaXMub25FZGl0Q2VsbFZhbHVlQ2hhbmdlKFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgeyB2YWx1ZUtleVBhdGg6IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5uZXdWYWx1ZUtleVBhdGggfSxcbiAgICAgICAgdiA9PiB2LFxuICAgICAgKShjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY29sLnZhbGlkYXRvcnMpIHtcbiAgICAgIHRoaXMucHJvcHMuZWRpdENlbGxWYWx1ZVZhbGlkYXRlKFxuICAgICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICAgIGRhdGFJZCxcbiAgICAgICAgY29sLnZhbHVlS2V5UGF0aCxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIGNvbC52YWxpZGF0b3JzLFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBvbkNyZWF0ZUNlbGxCbHVyID0gKHJvd0luZGV4LCBjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZSkgPT4ge1xuICAgIGlmIChjb2wub25DcmVhdGVCbHVyKSB7XG4gICAgICBsZXQgdmFsdWUgPSAoZSAmJiBlLnRhcmdldCAmJiBlLnRhcmdldC52YWx1ZSAhPT0gdW5kZWZpbmVkKSA/XG4gICAgICAgIGUudGFyZ2V0LnZhbHVlIDpcbiAgICAgICAgdGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpO1xuICAgICAgaWYgKHZhbHVlUGFyc2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZVBhcnNlcih2YWx1ZSk7XG4gICAgICB9XG4gICAgICBjb2wub25DcmVhdGVCbHVyKHZhbHVlLCByb3dJbmRleCk7XG4gICAgfVxuICB9XG5cbiAgb25FZGl0Q2VsbEJsdXIgPSAocm93SW5kZXgsIGNvbCwgdmFsdWVQYXJzZXIpID0+IChlKSA9PiB7XG4gICAgaWYgKGNvbC5vbkVkaXRCbHVyKSB7XG4gICAgICBsZXQgdmFsdWUgPSAoZSAmJiBlLnRhcmdldCAmJiBlLnRhcmdldC52YWx1ZSAhPT0gdW5kZWZpbmVkKSA/XG4gICAgICAgIGUudGFyZ2V0LnZhbHVlIDpcbiAgICAgICAgdGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpO1xuICAgICAgaWYgKHZhbHVlUGFyc2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZVBhcnNlcih2YWx1ZSk7XG4gICAgICB9XG4gICAgICBjb25zdCBkYXRhSWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgICAgY29sLm9uRWRpdEJsdXIodmFsdWUsIHJvd0luZGV4LCBkYXRhSWQpO1xuICAgIH1cbiAgfVxuXG4gIG9uQ2VsbEZvY3VzID0gKGNlbGxUeXBlLCBpbnB1dFR5cGUsIHJvd0luZGV4LCBjb2x1bW5LZXkpID0+IChlKSA9PiB7XG4gICAgaWYgKGlucHV0VHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIGUudGFyZ2V0LnNlbGVjdCgpO1xuICAgIH1cbiAgICBpZiAoY2VsbFR5cGUgPT09ICdlZGl0JyAmJiB0aGlzLnByb3BzLmNlbGxTZWxlY3QpIHtcbiAgICAgIHRoaXMucHJvcHMuY2VsbFNlbGVjdGlvbkNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIE1hcCh7IHJvd0luZGV4LCBjb2x1bW5LZXkgfSkpO1xuICAgIH1cbiAgfVxuXG4gIGdldERhdGFJZEJ5Um93SW5kZXggPSByb3dJbmRleCA9PlxuICAgIHRoaXMucHJvcHMuZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLnRoaXMucHJvcHMuZ3JpZC5pZEtleVBhdGhdKTtcblxuICBnZXRTZWxlY3RlZEl0ZW1JbmRleCA9IChpZCkgPT4ge1xuICAgIGlmICghaWQpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnByb3BzLmRhdGEuZmluZEluZGV4KHYgPT4gdi5nZXRJbih0aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoKSA9PT0gaWQpO1xuICAgIHJldHVybiBpbmRleCA9PT0gLTEgPyB1bmRlZmluZWQgOiBpbmRleDtcbiAgfVxuXG4gIGdldEVkaXRJdGVtVmFsdWUgPSAocm93SW5kZXgsIGNvbCwgb3B0aW9ucyA9IFtdKSA9PiB7XG4gICAgLy8gR2V0IHRoZSB2YWx1ZSB0byBkaXNwbGF5IGluIGVkaXQgY2VsbFxuICAgIGNvbnN0IGlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICBjb25zdCBlZGl0VmFsdWUgPSB0aGlzLnByb3BzLmVkaXREYXRhLmdldEluKFtpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0sIHVuZGVmaW5lZCk7XG4gICAgbGV0IG9yaWdpbmFsVmFsdWU7XG4gICAgaWYgKGVkaXRWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBvcmlnaW5hbFZhbHVlID0gdGhpcy5wcm9wcy5kYXRhLmdldEluKFtyb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0sICcnKTtcbiAgICB9IGVsc2UgaWYgKGVkaXRWYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBWYWx1ZSBpcyBmb3VuZCBmcm9tIGVkaXREYXRhXG4gICAgICAvLyBGb3JtYXQgYnkgY29tcG9uZW50IHR5cGVcbiAgICAgIHN3aXRjaCAoY29sLmNvbXBvbmVudFR5cGUpIHtcbiAgICAgICAgY2FzZSAnc2VsZWN0JzpcbiAgICAgICAgICByZXR1cm4gY29sLnNlbGVjdENvbXBvbmVudE9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSBlZGl0VmFsdWUpO1xuICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgICByZXR1cm4gb3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IGVkaXRWYWx1ZSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuIGVkaXRWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG9yaWdpbmFsVmFsdWUgPT09IG51bGwgfHwgb3JpZ2luYWxWYWx1ZSA9PT0gdW5kZWZpbmVkIHx8IG9yaWdpbmFsVmFsdWUgPT09ICcnKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIC8vIFJldHVybiB2YWx1ZSBmcm9tIG9yaWdpbmFsIGRhdGEsIGJlY2F1c2UgZWRpdERhdGEgaXMgbm90IGF2YWlsYWJsZVxuICAgIC8vIEZvcm1hdCBieSBjb21wb25lbnQgdHlwZVxuICAgIHN3aXRjaCAoY29sLmNvbXBvbmVudFR5cGUpIHtcbiAgICAgIGNhc2UgJ2Zsb2F0Jzoge1xuICAgICAgICBpZiAoU3RyaW5nKG9yaWdpbmFsVmFsdWUpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZXR1cm4gU3RyaW5nKG9yaWdpbmFsVmFsdWUpLnJlcGxhY2UoJy4nLCB0aGlzLnByb3BzLmRlY2ltYWxTZXBhcmF0b3IpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvcmlnaW5hbFZhbHVlO1xuICAgICAgfVxuICAgICAgY2FzZSAnc2VsZWN0JzpcbiAgICAgICAgcmV0dXJuIGNvbC5zZWxlY3RDb21wb25lbnRPcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gb3JpZ2luYWxWYWx1ZSk7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSBvcmlnaW5hbFZhbHVlKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBvcmlnaW5hbFZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGdldENyZWF0ZUl0ZW1WYWx1ZSA9IChyb3dJbmRleCwgY29sLCBvcHRpb25zID0gW10pID0+IHtcbiAgICBjb25zdCB2YWwgPSB0aGlzLnByb3BzLmNyZWF0ZURhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSwgJycpO1xuICAgIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9IGVsc2UgaWYgKGNvbC5jb21wb25lbnRUeXBlID09PSAnc2VsZWN0Jykge1xuICAgICAgcmV0dXJuIGNvbC5zZWxlY3RDb21wb25lbnRPcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gdmFsKTtcbiAgICB9IGVsc2UgaWYgKFsnYm9vbGVhbiddLmluY2x1ZGVzKGNvbC5jb21wb25lbnRUeXBlKSkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSB2YWwpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsO1xuICB9XG5cbiAgZ2V0RmlsdGVySXRlbVZhbHVlID0gKGNvbCwgb3B0aW9ucyA9IFtdKSA9PiB7XG4gICAgY29uc3QgdmFsID0gdGhpcy5wcm9wcy5maWx0ZXJEYXRhLmdldChVdGlscy5nZXRDb2x1bW5LZXkoY29sKSwgJycpO1xuICAgIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9IGVsc2UgaWYgKGNvbC5jb21wb25lbnRUeXBlID09PSAnc2VsZWN0Jykge1xuICAgICAgcmV0dXJuIGNvbC5zZWxlY3RDb21wb25lbnRPcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gdmFsKTtcbiAgICB9IGVsc2UgaWYgKFsnY2hlY2tib3gnLCAnYm9vbGVhbiddLmluY2x1ZGVzKGNvbC5jb21wb25lbnRUeXBlKSkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSB2YWwpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsO1xuICB9XG5cbiAgZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZSA9IChyb3dJbmRleCwgY29sLCBtb2RlKSA9PiB7XG4gICAgbGV0IGNvbXBvbmVudERpc2FibGVkID0gISFjb2wuZGlzYWJsZUVkaXRpbmc7XG4gICAgLy8gY2hlY2sgaWYgY29tcG9uZW50IGlzIGRpc2FibGVkIGJ5IG90aGVyIGNvbHVtbiBkYXRhXG4gICAgaWYgKCFjb21wb25lbnREaXNhYmxlZCAmJiBjb2wuZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2gpIHtcbiAgICAgIGlmIChtb2RlID09PSAnY3JlYXRlJykge1xuICAgICAgICBjb21wb25lbnREaXNhYmxlZCA9IHRoaXMuZ2V0Q3JlYXRlSXRlbVZhbHVlKFxuICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgIHsgdmFsdWVLZXlQYXRoOiBjb2wuZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2gubWF0Y2hWYWx1ZUtleVBhdGggfSxcbiAgICAgICAgKSA9PT0gY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb21wb25lbnREaXNhYmxlZCA9IHRoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShcbiAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICB7IHZhbHVlS2V5UGF0aDogY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWVLZXlQYXRoIH0sXG4gICAgICAgICkgPT09IGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaC5tYXRjaFZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29tcG9uZW50RGlzYWJsZWQ7XG4gIH1cblxuICBnZXRSb3dDbGFzc05hbWUgPSAocm93SW5kZXgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBncmlkLFxuICAgICAgaXNDcmVhdGluZyxcbiAgICAgIGlzRWRpdGluZyxcbiAgICAgIGNyZWF0ZURhdGEsXG4gICAgICBzZWxlY3RlZEl0ZW1zLFxuICAgICAgZGF0YSxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCByb3dDbGFzc05hbWVzID0gWydvYy1kYXRhZ3JpZC1yb3cnXTtcbiAgICBsZXQgZXh0cmFSb3dDb3VudCA9IDA7IC8vIGhvdyBtYW55IHJvd3MgdG8gaWdub3JlIGZyb20gdG9wLCBuZXcgKyBmaWx0ZXIgcm93c1xuICAgIGlmIChpc0NyZWF0aW5nKSBleHRyYVJvd0NvdW50ID0gY3JlYXRlRGF0YS5zaXplO1xuICAgIGlmIChpc0NyZWF0aW5nKSB7XG4gICAgICBpZiAocm93SW5kZXggPD0gKGV4dHJhUm93Q291bnQgLSAxKSkge1xuICAgICAgICByb3dDbGFzc05hbWVzLnB1c2goJ29jLWRhdGFncmlkLXJvdy1uZXcnKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzRWRpdGluZykge1xuICAgICAgcm93Q2xhc3NOYW1lcy5wdXNoKCdvYy1kYXRhZ3JpZC1yb3ctZWRpdCcpO1xuICAgIH1cblxuXG4gICAgLy8gY2hlY2sgaWYgcm93IGlzIHNlbGVjdGVkXG4gICAgaWYgKCghaXNDcmVhdGluZyAmJiAhaXNFZGl0aW5nKSAmJlxuICAgICAgICAoc2VsZWN0ZWRJdGVtcyAmJiBncmlkLmlkS2V5UGF0aCkpIHtcbiAgICAgIGlmIChcbiAgICAgICAgc2VsZWN0ZWRJdGVtcy5pbmRleE9mKGRhdGEuZ2V0SW4oW3Jvd0luZGV4IC0gZXh0cmFSb3dDb3VudCwgLi4uZ3JpZC5pZEtleVBhdGhdKSkgIT09IC0xXG4gICAgICApIHtcbiAgICAgICAgcm93Q2xhc3NOYW1lcy5wdXNoKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLnJvd0NsYXNzTmFtZUdldHRlcikge1xuICAgICAgcmV0dXJuIHJvd0NsYXNzTmFtZXMuam9pbignICcpICsgJyAnICsgdGhpcy5wcm9wcy5yb3dDbGFzc05hbWVHZXR0ZXIocm93SW5kZXgpO1xuICAgIH1cbiAgICByZXR1cm4gcm93Q2xhc3NOYW1lcy5qb2luKCcgJyk7XG4gIH1cblxuICBnZXRDZWxsTWVzc2FnZXMgPSAocm93SW5kZXgsIGNvbCwgY2VsbFR5cGUpID0+IHtcbiAgICBjb25zdCByZXR1cm5EYXRhID0ge307XG4gICAgaWYgKCF0aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoIHx8ICFjb2wudmFsdWVLZXlQYXRoKSB7XG4gICAgICByZXR1cm4gcmV0dXJuRGF0YTtcbiAgICB9XG4gICAgbGV0IGluZm9NZXNzYWdlO1xuICAgIGxldCBlcnJvck1lc3NhZ2U7XG4gICAgbGV0IHdhcm5pbmdNZXNzYWdlO1xuICAgIGlmIChjZWxsVHlwZSA9PT0gJ2NyZWF0ZScpIHtcbiAgICAgIGluZm9NZXNzYWdlID0gdGhpcy5wcm9wcy5jcmVhdGVDZWxsTWVzc2FnZXMuZ2V0SW4oWydpbmZvJywgcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgIGVycm9yTWVzc2FnZSA9IHRoaXMucHJvcHMuY3JlYXRlQ2VsbE1lc3NhZ2VzLmdldEluKFsnZXJyb3InLCByb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgd2FybmluZ01lc3NhZ2UgPSB0aGlzLnByb3BzLmNyZWF0ZUNlbGxNZXNzYWdlcy5nZXRJbihbJ3dhcm5pbmcnLCByb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgICBpbmZvTWVzc2FnZSA9IHRoaXMucHJvcHMuY2VsbE1lc3NhZ2VzLmdldEluKFsnaW5mbycsIGlkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgICBlcnJvck1lc3NhZ2UgPSB0aGlzLnByb3BzLmNlbGxNZXNzYWdlcy5nZXRJbihbJ2Vycm9yJywgaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgIHdhcm5pbmdNZXNzYWdlID0gdGhpcy5wcm9wcy5jZWxsTWVzc2FnZXMuZ2V0SW4oWyd3YXJuaW5nJywgaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICB9XG4gICAgaWYgKGluZm9NZXNzYWdlKSB7XG4gICAgICByZXR1cm5EYXRhLmluZm9NZXNzYWdlID0gaW5mb01lc3NhZ2U7XG4gICAgfVxuICAgIGlmIChlcnJvck1lc3NhZ2UpIHtcbiAgICAgIHJldHVybkRhdGEuZXJyb3JNZXNzYWdlID0gZXJyb3JNZXNzYWdlO1xuICAgIH1cbiAgICBpZiAod2FybmluZ01lc3NhZ2UpIHtcbiAgICAgIHJldHVybkRhdGEud2FybmluZ01lc3NhZ2UgPSB3YXJuaW5nTWVzc2FnZTtcbiAgICB9XG4gICAgcmV0dXJuIHJldHVybkRhdGE7XG4gIH1cblxuICBnZXRTY3JvbGxUb1JvdyA9ICgpID0+IHtcbiAgICBsZXQgc2Nyb2xsVG9Sb3c7XG4gICAgaWYgKHRoaXMucHJvcHMuaXNDcmVhdGluZyAmJiAhdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCkgcmV0dXJuIHNjcm9sbFRvUm93O1xuICAgIGlmICh0aGlzLmZvY3VzVG9DcmVhdGVDZWxsKSB7XG4gICAgICBjb25zdCBzY3JvbGxOZXdSb3cgPSB0aGlzLnByb3BzLmNyZWF0ZURhdGEuc2l6ZSAtIDE7XG4gICAgICBpZiAoc2Nyb2xsTmV3Um93ID49IDApIHtcbiAgICAgICAgc2Nyb2xsVG9Sb3cgPSBzY3JvbGxOZXdSb3c7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLmlzRWRpdGluZykge1xuICAgICAgICBzY3JvbGxUb1JvdyA9IHRoaXMuc3RhdGUuY3VycmVudFJvdztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gdGhpcy5wcm9wcy5zY3JvbGxUb1JvdzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgfVxuICAgICAgaWYgKHNjcm9sbFRvUm93ID09PSB1bmRlZmluZWQgJiYgdGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLnNpemUgPiAwKSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gdGhpcy5nZXRTZWxlY3RlZEl0ZW1JbmRleCh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuZmlyc3QoKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzY3JvbGxUb1JvdztcbiAgfVxuXG4gIHNldEZvY3VzVG8gPSAoZm9jdXNUbykgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmlzRWRpdGluZyB8fCB0aGlzLnByb3BzLmlzQ3JlYXRpbmcpIHtcbiAgICAgIGlmIChmb2N1c1RvICYmIGZvY3VzVG8uZ2V0KCd0eXBlJykgJiYgZm9jdXNUbyAhPT0gdGhpcy5wcmV2Rm9jdXNUbykge1xuICAgICAgICB0aGlzW2ZvY3VzVG8uZ2V0KCd0eXBlJyldID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5mb2N1c1RvTGFzdFJvdyA9IGZvY3VzVG8uZ2V0KCdmb2N1c1RvTGFzdFJvdycpO1xuICAgICAgICB0aGlzLnByZXZGb2N1c1RvID0gZm9jdXNUbztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYW5kbGVDZWxsU2VsZWN0ID0gKGNlbGxUeXBlLCByb3dJbmRleCwgY29sdW1uS2V5KSA9PiAoKSA9PiB7XG4gICAgaWYgKGNlbGxUeXBlID09PSAndmlldycgJiYgdGhpcy5wcm9wcy5jZWxsU2VsZWN0KSB7XG4gICAgICB0aGlzLnByb3BzLmNlbGxTZWxlY3Rpb25DaGFuZ2UodGhpcy5wcm9wcy5ncmlkLCBNYXAoeyByb3dJbmRleCwgY29sdW1uS2V5IH0pKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVDcmVhdGVDZWxsUmVmID0gKHJvd0luZGV4LCBjb2wpID0+IChyZWYpID0+IHtcbiAgICAvLyBGb2N1cyB0byBjcmVhdGUgY2VsbFxuICAgIGlmIChcbiAgICAgIHRoaXMucHJvcHMuY3JlYXRlRGF0YS5zaXplICYmXG4gICAgICB0aGlzLnByb3BzLmNyZWF0ZURhdGEuc2l6ZSA9PT0gcm93SW5kZXggKyAxICYmXG4gICAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsICYmXG4gICAgICAhdGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdjcmVhdGUnKVxuICAgICkge1xuICAgICAgcmVmLmZvY3VzKCk7XG4gICAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRWRpdENlbGxSZWYgPSAocm93SW5kZXgsIGNvbCkgPT4gKHJlZikgPT4ge1xuICAgIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2wpO1xuICAgIGlmICh0aGlzLmZvY3VzVG9FZGl0Q2VsbCAmJiAhdGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdlZGl0JykpIHtcbiAgICAgIGNvbnN0IHNlbGVjdGVkUm93SW5kZXggPSB0aGlzLmZvY3VzVG9MYXN0Um93ICYmIHRoaXMucHJvcHMuZGF0YS5zaXplID4gMCA/XG4gICAgICAgIHRoaXMucHJvcHMuZGF0YS5zaXplIC0gMSA6IHRoaXMuZ2V0U2VsZWN0ZWRJdGVtSW5kZXgodGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLmZpcnN0KCkpO1xuXG4gICAgICBjb25zdCB7IHNlbGVjdGVkQ2VsbCB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGlmIChzZWxlY3RlZENlbGwuc2l6ZSA+IDApIHtcbiAgICAgICAgaWYgKHNlbGVjdGVkQ2VsbC5nZXQoJ3Jvd0luZGV4JykgPT09IHJvd0luZGV4ICYmIHNlbGVjdGVkQ2VsbC5nZXQoJ2NvbHVtbktleScpID09PSBjb2x1bW5LZXkpIHtcbiAgICAgICAgICByZWYuZm9jdXMoKTtcbiAgICAgICAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuZm9jdXNUb0xhc3RSb3cgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzZWxlY3RlZFJvd0luZGV4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mb2N1c1RvTGFzdFJvdyA9IGZhbHNlO1xuICAgICAgfSBlbHNlIGlmIChzZWxlY3RlZFJvd0luZGV4ID09PSByb3dJbmRleCkge1xuICAgICAgICByZWYuZm9jdXMoKTtcbiAgICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mb2N1c1RvTGFzdFJvdyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5lbmFibGVBcnJvd05hdmlnYXRpb24pIHtcbiAgICAgIHRoaXMuY2VsbFJlZnNbYCR7dGhpcy5wcm9wcy5ncmlkLmlkfV8ke2NvbHVtbktleX1fJHtyb3dJbmRleH1gXSA9IHJlZjtcbiAgICB9XG4gIH1cblxuICBtb3ZlQ2VsbEZvY3VzID0gKG5leHRFbGVtZW50LCByb3dJbmRleCwgY29sdW1uSW5kZXgpID0+IHtcbiAgICBjb25zdCBlbGVtZW50VHlwZXMgPSBbJ3RleHQnLCAnbnVtYmVyJ107XG4gICAgaWYgKG5leHRFbGVtZW50ICYmIGVsZW1lbnRUeXBlcy5pbmNsdWRlcyhuZXh0RWxlbWVudC50eXBlKSkge1xuICAgICAgaWYgKHJvd0luZGV4ICE9PSAtMSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgY3VycmVudFJvdzogcm93SW5kZXggfSk7XG4gICAgICB9XG4gICAgICBpZiAoY29sdW1uSW5kZXggIT09IC0xKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjdXJyZW50Q29sdW1uOiBjb2x1bW5JbmRleCB9KTtcbiAgICAgIH1cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gbmV4dEVsZW1lbnQuc2VsZWN0KCksIDUwKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVTZWxlY3Rpb25DaGVja0JveE9uQ2hhbmdlID0gcm93SW5kZXggPT4gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMuaXRlbVNlbGVjdGlvbkNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIHJvd0luZGV4LCB0cnVlLCBmYWxzZSk7XG4gIH1cblxuICBnZW5lcmF0ZUNvbHVtbnMgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBleHRyYUNvbHVtbiB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBjb2x1bW5zID0gW107XG4gICAgY29uc3QgdGFiSW5kZXggPSBTdHJpbmcodGhpcy5wcm9wcy50YWJJbmRleCk7XG4gICAgaWYgKGV4dHJhQ29sdW1uKSB7XG4gICAgICBjb2x1bW5zLnB1c2goe1xuICAgICAgICB3aWR0aDogZXh0cmFDb2x1bW4ud2lkdGggfHwgNDAsXG4gICAgICAgIGlzUmVzaXphYmxlOiAhIWV4dHJhQ29sdW1uLmlzUmVzaXphYmxlLFxuICAgICAgICBpc1NvcnRhYmxlOiBmYWxzZSxcbiAgICAgICAgY29sdW1uS2V5OiAnZXh0cmFDb2x1bW4nLFxuICAgICAgICBjZWxsOiByb3dJbmRleCA9PiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1leHRyYS1jb2x1bW4tY2VsbCBuby1yb3ctc2VsZWN0XCI+XG4gICAgICAgICAgICB7IGV4dHJhQ29sdW1uLnZhbHVlUmVuZGVyKHRoaXMucHJvcHMuZGF0YS5nZXQocm93SW5kZXgpLCB0YWJJbmRleCkgfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApLFxuICAgICAgICBjZWxsRWRpdDogcm93SW5kZXggPT4gKGV4dHJhQ29sdW1uLmNlbGxFZGl0ID8gZXh0cmFDb2x1bW4uY2VsbEVkaXQocm93SW5kZXgpIDogbnVsbCksXG4gICAgICAgIGNlbGxDcmVhdGU6IHJvd0luZGV4ID0+IChleHRyYUNvbHVtbi5jZWxsQ3JlYXRlID8gZXh0cmFDb2x1bW4uY2VsbENyZWF0ZShyb3dJbmRleCkgOiBudWxsKSxcbiAgICAgICAgY2VsbEZpbHRlcjogcm93SW5kZXggPT4gKGV4dHJhQ29sdW1uLmNlbGxGaWx0ZXIgPyBleHRyYUNvbHVtbi5jZWxsRmlsdGVyKHJvd0luZGV4KSA6IG51bGwpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcHMucm93U2VsZWN0Q2hlY2tib3hDb2x1bW4pIHtcbiAgICAgIGNvbHVtbnMucHVzaCh7XG4gICAgICAgIHdpZHRoOiA0MCxcbiAgICAgICAgaXNSZXNpemFibGU6IGZhbHNlLFxuICAgICAgICBpc1NvcnRhYmxlOiBmYWxzZSxcbiAgICAgICAgY29sdW1uS2V5OiAnc2VsZWN0aW9uQ2hlY2tib3gnLFxuICAgICAgICBjZWxsOiAocm93SW5kZXgpID0+IHtcbiAgICAgICAgICBjb25zdCByb3dJdGVtID0gdGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCk7XG4gICAgICAgICAgY29uc3QgaXRlbUlkID0gcm93SXRlbS5nZXRJbih0aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoKTtcbiAgICAgICAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhpdGVtSWQpO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkU2VsZWN0Q2hlY2tCb3gtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtc2VsZWN0LWNoZWNrYm94LWNlbGwgbm8tcm93LXNlbGVjdFwiXG4gICAgICAgICAgICAgIGNoZWNrZWQ9e3NlbGVjdGVkfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVTZWxlY3Rpb25DaGVja0JveE9uQ2hhbmdlKHJvd0luZGV4KX1cbiAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICBjZWxsRWRpdDogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbENyZWF0ZTogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbEZpbHRlcjogKCkgPT4gbnVsbCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHZpc2libGVDb2x1bW5zID0gW107XG4gICAgdGhpcy5wcm9wcy52aXNpYmxlQ29sdW1ucy5mb3JFYWNoKCh2aXNpYmxlQ29sdW1uS2V5KSA9PiB7XG4gICAgICB0aGlzLnByb3BzLmNvbHVtbnMuZm9yRWFjaCgob3JnQ29sKSA9PiB7XG4gICAgICAgIGlmIChVdGlscy5nZXRDb2x1bW5LZXkob3JnQ29sKSA9PT0gdmlzaWJsZUNvbHVtbktleSkge1xuICAgICAgICAgIHZpc2libGVDb2x1bW5zLnB1c2gob3JnQ29sKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgdmlzaWJsZUNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGRhdGEsXG4gICAgICAgIGRhdGVGb3JtYXQsXG4gICAgICAgIHRob3VzYW5kU2VwYXJhdG9yLFxuICAgICAgICBkZWNpbWFsU2VwYXJhdG9yLFxuICAgICAgICBncmlkLFxuICAgICAgICBpbmxpbmVFZGl0LFxuICAgICAgICBmaWx0ZXJpbmcsXG4gICAgICAgIHJlZ2lvbixcbiAgICAgICAgaW50bCxcbiAgICAgICAgc2VsZWN0Q29tcG9uZW50T3B0aW9ucyxcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgICBjb25zdCB2YWx1ZUVtcHR5Q2hlY2tlciA9IFV0aWxzLmdldFZhbHVlRW1wdHlDaGVja2VyKGNvbCk7XG4gICAgICAvLyBDZWxsIHZhbHVlIHJlbmRlcmluZ1xuICAgICAgY29uc3QgdmFsdWVSZW5kZXIgPSAocm93SW5kZXgsIGZvcm1hdCkgPT4ge1xuICAgICAgICBjb25zdCB2YWwgPSBkYXRhLmdldEluKFtyb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsKSkge1xuICAgICAgICAgIHJldHVybiBjb2wuaXNSZXF1aXJlZCA/IDxNIGlkPVwiR3JpZC5WYWx1ZUlzTWlzc2luZ1wiIC8+IDogJyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvcm1hdCA/IGZvcm1hdCh2YWwpIDogdmFsO1xuICAgICAgfTtcblxuICAgICAgbGV0IGNvbHVtbiA9IEdyaWRDb2x1bW5TZXJ2aWNlLmJhc2VDb2x1bW4oY29sKTtcbiAgICAgIC8vIENvbGxlY3QgY29sdW1uIGZ1bmN0aW9ucyBpbnRvIG9uZSBPYmplY3RcbiAgICAgIGNvbnN0IGNvbHVtbkZ1bmN0aW9ucyA9IHtcbiAgICAgICAgZWRpdDoge1xuICAgICAgICAgIGdldEl0ZW1WYWx1ZTogdGhpcy5nZXRFZGl0SXRlbVZhbHVlLFxuICAgICAgICAgIG9uQ2VsbFZhbHVlQ2hhbmdlOiB0aGlzLm9uRWRpdENlbGxWYWx1ZUNoYW5nZSxcbiAgICAgICAgICBvbkNlbGxCbHVyOiB0aGlzLm9uRWRpdENlbGxCbHVyLFxuICAgICAgICAgIG9uQ2VsbEZvY3VzOiB0aGlzLm9uQ2VsbEZvY3VzLFxuICAgICAgICAgIG9uQ2VsbEtleURvd246IHRoaXMub25FZGl0Q2VsbEtleURvd24sXG4gICAgICAgICAgaGFuZGxlQ2VsbFJlZjogdGhpcy5oYW5kbGVFZGl0Q2VsbFJlZixcbiAgICAgICAgfSxcbiAgICAgICAgY3JlYXRlOiB7XG4gICAgICAgICAgZ2V0SXRlbVZhbHVlOiB0aGlzLmdldENyZWF0ZUl0ZW1WYWx1ZSxcbiAgICAgICAgICBvbkNlbGxWYWx1ZUNoYW5nZTogdGhpcy5vbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSxcbiAgICAgICAgICBvbkNlbGxCbHVyOiB0aGlzLm9uQ3JlYXRlQ2VsbEJsdXIsXG4gICAgICAgICAgb25DZWxsRm9jdXM6IHRoaXMub25DZWxsRm9jdXMsXG4gICAgICAgICAgb25DZWxsS2V5RG93bjogdGhpcy5vbkNyZWF0ZUNlbGxLZXlEb3duLFxuICAgICAgICAgIGhhbmRsZUNlbGxSZWY6IHRoaXMuaGFuZGxlQ3JlYXRlQ2VsbFJlZixcbiAgICAgICAgfSxcbiAgICAgICAgZmlsdGVyOiB7XG4gICAgICAgICAgZ2V0SXRlbVZhbHVlOiB0aGlzLmdldEZpbHRlckl0ZW1WYWx1ZSxcbiAgICAgICAgICBvbkNlbGxWYWx1ZUNoYW5nZTogdGhpcy5vbkZpbHRlckNlbGxWYWx1ZUNoYW5nZSxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIC8vIGhhbmRsZSBjb2x1bW4uY2VsbCAvIGNvbHVtbi5jZWxsRWRpdCAvIGNvbHVtbi5jZWxsQ3JlYXRlIC8gY29sdW1uLmNlbGxGaWx0ZXJcbiAgICAgIGNvbnN0IGNlbGxQcm9wcyA9IHsgZGF0YSwgZGF0ZUZvcm1hdCwgdGhvdXNhbmRTZXBhcmF0b3IsIGRlY2ltYWxTZXBhcmF0b3IgfTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgY29sdW1uID0gR3JpZENvbHVtblNlcnZpY2UuY29sdW1uQ2VsbChjb2x1bW4sIGNlbGxQcm9wcywgY29sLCB2YWx1ZVJlbmRlcik7XG5cbiAgICAgIC8vIGhhbmRsZSBjb2x1bW5Db21wb25lbnRUeXBlc1xuICAgICAgY29uc3QgY29tcG9uZW50VHlwZVByb3BzID0geyAuLi5jZWxsUHJvcHMsIGdyaWQsIGlubGluZUVkaXQsIGZpbHRlcmluZywgcmVnaW9uLCBpbnRsLCBzZWxlY3RDb21wb25lbnRPcHRpb25zIH07IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIGNvbHVtbiA9IEdyaWRDb2x1bW5TZXJ2aWNlLmNvbHVtbkNvbXBvbmVudFR5cGUoXG4gICAgICAgIGNvbHVtbixcbiAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgIGNvbXBvbmVudFR5cGVQcm9wcyxcbiAgICAgICAgY29sLFxuICAgICAgICBjb2x1bW5GdW5jdGlvbnMsXG4gICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZSxcbiAgICAgICk7XG5cbiAgICAgIGNvbHVtbnMucHVzaChjb2x1bW4pO1xuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuaXNDcmVhdGluZykge1xuICAgICAgY29sdW1ucy5wdXNoKHtcbiAgICAgICAgd2lkdGg6IDM3LFxuICAgICAgICBpc1Jlc2l6YWJsZTogZmFsc2UsXG4gICAgICAgIGNvbHVtbktleTogJ3JlbW92ZU5ld0l0ZW0nLFxuICAgICAgICBjZWxsOiAoKSA9PiBudWxsLFxuICAgICAgICBjZWxsRWRpdDogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbENyZWF0ZTogcm93SW5kZXggPT4gKFxuICAgICAgICAgIDxJY29uXG4gICAgICAgICAgICBpZD17YG9jLWRhdGFncmlkLW5ldy1pdGVtLXJlbW92ZS0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtyb3dJbmRleH1gfVxuICAgICAgICAgICAgdHlwZT1cImluZGljYXRvclwiXG4gICAgICAgICAgICBuYW1lPVwiZGVsZXRlXCJcbiAgICAgICAgICAgIHdpZHRoPXszMH1cbiAgICAgICAgICAgIGhlaWdodD17MzB9XG4gICAgICAgICAgICBzdHlsZT17eyBwYWRkaW5nOiAnN3B4JyB9fVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdGhpcy5wcm9wcy5yZW1vdmVOZXdJdGVtKHRoaXMucHJvcHMuZ3JpZCwgcm93SW5kZXgpfVxuICAgICAgICAgIC8+XG4gICAgICAgICksXG4gICAgICAgIGNlbGxGaWx0ZXI6ICgpID0+IG51bGwsXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbHVtbnM7XG4gIH1cblxuICBpc0NlbGxFZGl0ZWQgPSAocm93SW5kZXgsIGNvbCwgY2VsbFR5cGUpID0+IHtcbiAgICBpZiAoY2VsbFR5cGUgIT09ICdlZGl0Jykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBpZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgaWYgKHRoaXMucHJvcHMuZWRpdERhdGEuZ2V0SW4oW2lkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBoYW5kbGVBZnRlckFkZEl0ZW0gPSAoKSA9PiB7XG4gICAgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCA9IHRydWU7XG4gIH1cblxuICBoYW5kbGVBZnRlckVkaXRQcmVzcyA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLnNpemUpIHtcbiAgICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gdHJ1ZTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjdXJyZW50Um93OiB1bmRlZmluZWQsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVBZnRlclZhbGlkYXRpb25FcnJvciA9ICgpID0+IHtcbiAgICB0aGlzLmZvY3VzVG9FcnJvckNlbGwgPSB0cnVlO1xuICB9XG5cbiAgaGFuZGxlUm93Q2xpY2sgPSAoZSwgcm93SW5kZXgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5yb3dTZWxlY3QgJiYgIXRoaXMucHJvcHMuaXNDcmVhdGluZyAmJiAhdGhpcy5wcm9wcy5pc0VkaXRpbmcpIHtcbiAgICAgIGlmIChlLmN0cmxLZXkgfHwgZS5zaGlmdEtleSkge1xuICAgICAgICBkb2N1bWVudC5nZXRTZWxlY3Rpb24oKS5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICAgIH1cbiAgICAgIC8vIERvbid0IHRyaWdnZXIgc2VsZWN0aW9uIGNoYW5nZSBvbiB3aGVuIHVzZXIgY2xpY2tzIG9uIHNwZWNpYWwgY2VsbHMgbGlrZSBjaGVja2JveC9leHRyYVxuICAgICAgLy8gQ2hlY2sgdGhhdCBjbGlja2VkIG5vZGUncyBwYXJlbnQgb3IgcGFyZW50J3MgcGFyZW50IGRvZXNuJ3QgaGF2ZSBuby1yb3ctc2VsZWN0IGNsYXNzXG4gICAgICBjb25zdCB7IHBhcmVudE5vZGUgfSA9IGUudGFyZ2V0O1xuICAgICAgY29uc3QgcGFyZW50MWNsYXNzID0gcGFyZW50Tm9kZS5jbGFzc05hbWUgJiYgcGFyZW50Tm9kZS5jbGFzc05hbWUuaW5kZXhPZlxuICAgICAgICA/IHBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgIDogJyc7XG4gICAgICAgIGNvbnN0IHBhcmVudDJjbGFzcyA9IHBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUgJiYgcGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZS5pbmRleE9mIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgPyBwYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgIDogJyc7XG4gICAgICAgIGNvbnN0IHBhcmVudDNjbGFzcyA9IHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZSAmJiBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUuaW5kZXhPZiAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgID8gcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgIDogJyc7XG4gICAgICAgIGNvbnN0IHBhcmVudDRjbGFzcyA9IHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lICYmIHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lLmluZGV4T2YgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICA/IHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgIDogJyc7XG4gICAgICBpZiAoXG4gICAgICAgIHBhcmVudDFjbGFzcy5pbmRleE9mKCduby1yb3ctc2VsZWN0JykgPT09IC0xICYmXG4gICAgICAgIHBhcmVudDJjbGFzcy5pbmRleE9mKCduby1yb3ctc2VsZWN0JykgPT09IC0xICYmXG4gICAgICAgIHBhcmVudDNjbGFzcy5pbmRleE9mKCduby1yb3ctc2VsZWN0JykgPT09IC0xICYmXG4gICAgICAgIHBhcmVudDRjbGFzcy5pbmRleE9mKCduby1yb3ctc2VsZWN0JykgPT09IC0xXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5wcm9wcy5pdGVtU2VsZWN0aW9uQ2hhbmdlKFxuICAgICAgICAgIHRoaXMucHJvcHMuZ3JpZCxcbiAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICB0aGlzLnByb3BzLm11bHRpU2VsZWN0ICYmIGUuY3RybEtleSxcbiAgICAgICAgICB0aGlzLnByb3BzLm11bHRpU2VsZWN0ICYmIGUuc2hpZnRLZXksXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLm9uUm93Q2xpY2spIHtcbiAgICAgIHRoaXMucHJvcHMub25Sb3dDbGljayhlLCByb3dJbmRleCwgdGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCkpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGhhbmRsZUNvbnRleHRNZW51ID0gKGUsIHJvd0luZGV4KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuY29udGV4dE1lbnVJdGVtcykge1xuICAgICAgY29uc3Qge1xuICAgICAgICBpdGVtU2VsZWN0aW9uQ2hhbmdlLFxuICAgICAgICBzZWxlY3RlZEl0ZW1zLFxuICAgICAgICBncmlkLFxuICAgICAgICBkYXRhLFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGNvbnRleHRNZW51T3BlbjogdHJ1ZSxcbiAgICAgICAgY29udGV4dE1lbnVYOiBlLmNsaWVudFgsXG4gICAgICAgIGNvbnRleHRNZW51WTogZS5jbGllbnRZLFxuICAgICAgfSk7XG4gICAgICAvLyBJZiBjbGlja2VkIGl0ZW0gaXMgbm90IHNlbGVjdGVkLCBjaGFuZ2Ugc2VsZWN0aW9uIHRvIGl0XG4gICAgICBpZiAoIXNlbGVjdGVkSXRlbXMuaW5jbHVkZXMoZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmdyaWQuaWRLZXlQYXRoXSkpKSB7XG4gICAgICAgIGl0ZW1TZWxlY3Rpb25DaGFuZ2UoZ3JpZCwgcm93SW5kZXgpO1xuICAgICAgfVxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uRG9jdW1lbnRDbGljayk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaGFuZGxlQ29udGV4dE1lbnVJdGVtQ2xpY2sgPSAob25DbGljaywgc2VsZWN0ZWRJdGVtcywgc2VsZWN0ZWREYXRhKSA9PiAoKSA9PiB7XG4gICAgb25DbGljayhzZWxlY3RlZEl0ZW1zLCBzZWxlY3RlZERhdGEpO1xuICB9XG5cbiAgaGFuZGxlUm93SGVpZ2h0R2V0dGVyID0gcm93SW5kZXggPT5cbiAgICB0aGlzLnByb3BzLnJvd0hlaWdodEdldHRlcih0aGlzLnByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSwgcm93SW5kZXgpO1xuXG4gIHJlbmRlckNlbGwgPSBjb2wgPT4gKGNlbGxQcm9wcykgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGlzQ3JlYXRpbmcsXG4gICAgICBpc0VkaXRpbmcsXG4gICAgICBjcmVhdGVEYXRhLFxuICAgICAgc2VsZWN0ZWRDZWxsLFxuICAgICAgZ3JpZCxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHJvd0luZGV4LCAuLi5wcm9wcyB9ID0gY2VsbFByb3BzO1xuICAgIGxldCBjZWxsO1xuICAgIGxldCBjZWxsVHlwZSA9ICd2aWV3JztcbiAgICBsZXQgZXh0cmFSb3dDb3VudCA9IDA7IC8vIGhvdyBtYW55IHJvd3MgdG8gaWdub3JlIGZyb20gdG9wLCBuZXcgKyBmaWx0ZXIgcm93c1xuICAgIGlmIChpc0NyZWF0aW5nKSBleHRyYVJvd0NvdW50ID0gY3JlYXRlRGF0YS5zaXplO1xuICAgIGlmIChpc0NyZWF0aW5nKSB7XG4gICAgICBpZiAocm93SW5kZXggPD0gKGV4dHJhUm93Q291bnQgLSAxKSkge1xuICAgICAgICBpZiAoY29sLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjZWxsID0gY29sLmNlbGxDcmVhdGUocm93SW5kZXgpO1xuICAgICAgICAgIGNlbGxUeXBlID0gJ2NyZWF0ZSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2VsbCA9IG51bGw7XG4gICAgICAgICAgY2VsbFR5cGUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjZWxsID0gY29sLmNlbGwocm93SW5kZXggLSBleHRyYVJvd0NvdW50KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzRWRpdGluZyAmJiBjb2wuY2VsbEVkaXQpIHtcbiAgICAgIGNlbGwgPSBjb2wuY2VsbEVkaXQocm93SW5kZXggLSBleHRyYVJvd0NvdW50KTtcbiAgICAgIGNlbGxUeXBlID0gJ2VkaXQnO1xuICAgIH0gZWxzZSB7XG4gICAgICBjZWxsID0gY29sLmNlbGwocm93SW5kZXggLSBleHRyYVJvd0NvdW50KTtcbiAgICB9XG4gICAgY29uc3QgaXNTcGVjaWFsID0gcHJvcHMuY29sdW1uS2V5ID09PSAnc2VsZWN0aW9uQ2hlY2tib3gnIHx8IHByb3BzLmNvbHVtbktleSA9PT0gJ2V4dHJhQ29sdW1uJztcbiAgICBpZiAoKGNlbGxUeXBlID09PSAndmlldycgfHwgY2VsbFR5cGUgPT09ICdlZGl0JyB8fCBjZWxsVHlwZSA9PT0gJ2NyZWF0ZScpICYmICFpc1NwZWNpYWwpIHtcbiAgICAgIGNvbnN0IGdldFJvd0luZGV4ID0gKGNlbGxUeXBlID09PSAnY3JlYXRlJykgPyByb3dJbmRleCA6IChyb3dJbmRleCAtIGV4dHJhUm93Q291bnQpO1xuICAgICAgY29uc3QgbWVzc2FnZURhdGEgPSB0aGlzLmdldENlbGxNZXNzYWdlcyhnZXRSb3dJbmRleCwgY29sLCBjZWxsVHlwZSk7XG4gICAgICBjb25zdCBpc0VkaXRlZCA9IHRoaXMuaXNDZWxsRWRpdGVkKGdldFJvd0luZGV4LCBjb2wsIGNlbGxUeXBlKTtcbiAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IChzZWxlY3RlZENlbGwuZ2V0KCdyb3dJbmRleCcpID09PSByb3dJbmRleCAmJiBzZWxlY3RlZENlbGwuZ2V0KCdjb2x1bW5LZXknKSA9PT0gcHJvcHMuY29sdW1uS2V5KSA/XG4gICAgICAgICdvYy1kYXRhZ3JpZC1jZWxsIGlzLXNlbGVjdGVkJyA6ICdvYy1kYXRhZ3JpZC1jZWxsJztcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxDZWxsXG4gICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICAgIHN0eWxlPXtjb2wuc3R5bGV9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDZWxsU2VsZWN0KGNlbGxUeXBlLCByb3dJbmRleCwgcHJvcHMuY29sdW1uS2V5KX1cbiAgICAgICAgPlxuICAgICAgICAgIDxDZWxsVG9vbHRpcFxuICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkQ2VsbC0ke2dyaWQuaWR9LSR7cHJvcHMuY29sdW1uS2V5fS0ke3Jvd0luZGV4fWB9XG4gICAgICAgICAgICBpc0VkaXRlZD17aXNFZGl0ZWR9XG4gICAgICAgICAgICBpc0Vycm9yPXshIW1lc3NhZ2VEYXRhLmVycm9yTWVzc2FnZX1cbiAgICAgICAgICAgIGlzV2FybmluZz17ISFtZXNzYWdlRGF0YS53YXJuaW5nTWVzc2FnZX1cbiAgICAgICAgICAgIGluZm9NZXNzYWdlPXttZXNzYWdlRGF0YS5pbmZvTWVzc2FnZX1cbiAgICAgICAgICAgIGVycm9yTWVzc2FnZT17bWVzc2FnZURhdGEuZXJyb3JNZXNzYWdlfVxuICAgICAgICAgICAgd2FybmluZ01lc3NhZ2U9e21lc3NhZ2VEYXRhLndhcm5pbmdNZXNzYWdlfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHsgY2VsbCB9XG4gICAgICAgICAgPC9DZWxsVG9vbHRpcD5cbiAgICAgICAgPC9DZWxsPlxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxDZWxsIHsuLi5wcm9wc30gY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtY2VsbFwiIHN0eWxlPXtjb2wuc3R5bGV9PnsgY2VsbCB9PC9DZWxsPlxuICAgICk7XG4gIH1cblxuICByZW5kZXJDb2x1bW5zID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5hbGxEYXRhU2l6ZSAmJiAhdGhpcy5wcm9wcy5pc0J1c3kgJiYgIXRoaXMucHJvcHMuaXNDcmVhdGluZykge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPENvbHVtblxuICAgICAgICAgIGNvbHVtbktleT1cImRhdGFFbXB0eUNvbHVtblwiXG4gICAgICAgICAgaGVhZGVyPXs8Q2VsbCBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInIH19PjxNIGlkPVwiR3JpZC5Ob0l0ZW1zXCIgLz48L0NlbGw+fVxuICAgICAgICAgIHdpZHRoPXsxMH1cbiAgICAgICAgICBpc1Jlc2l6YWJsZT17ZmFsc2V9XG4gICAgICAgICAgZmxleEdyb3c9ezF9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoIXRoaXMucHJvcHMudmlzaWJsZUNvbHVtbnMuc2l6ZSkge1xuICAgICAgaWYgKHRoaXMucHJvcHMuaXNCdXN5KSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPENvbHVtblxuICAgICAgICAgICAgY29sdW1uS2V5PVwiZGF0YUVtcHR5Q29sdW1uXCJcbiAgICAgICAgICAgIGhlYWRlcj17PENlbGw+Jm5ic3A7PC9DZWxsPn1cbiAgICAgICAgICAgIHdpZHRoPXsxMH1cbiAgICAgICAgICAgIGlzUmVzaXphYmxlPXtmYWxzZX1cbiAgICAgICAgICAgIGZsZXhHcm93PXsxfVxuICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Q29sdW1uXG4gICAgICAgICAgY29sdW1uS2V5PVwiZGF0YUVtcHR5Q29sdW1uXCJcbiAgICAgICAgICBoZWFkZXI9ezxDZWxsIHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicgfX0+PE0gaWQ9XCJHcmlkLk5vQ29sdW1uc1wiIC8+PC9DZWxsPn1cbiAgICAgICAgICB3aWR0aD17MTB9XG4gICAgICAgICAgaXNSZXNpemFibGU9e2ZhbHNlfVxuICAgICAgICAgIGZsZXhHcm93PXsxfVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3QgY29sdW1ucyA9IHRoaXMuZ2VuZXJhdGVDb2x1bW5zKCk7XG4gICAgaWYgKGNvbHVtbnMubGVuZ2h0ID09PSAwKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gY29sdW1ucy5tYXAoY29sID0+IChcbiAgICAgIDxDb2x1bW5cbiAgICAgICAga2V5PXtjb2wuY29sdW1uS2V5fVxuICAgICAgICBjb2x1bW5LZXk9e2NvbC5jb2x1bW5LZXl9XG4gICAgICAgIGhlYWRlcj17XG4gICAgICAgICAgPEhlYWRlckNlbGxcbiAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZEhlYWRlci0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2wuY29sdW1uS2V5fWB9XG4gICAgICAgICAgICBncmlkPXt0aGlzLnByb3BzLmdyaWR9XG4gICAgICAgICAgICBjb2x1bW5zPXt0aGlzLnByb3BzLmNvbHVtbnN9XG4gICAgICAgICAgICBjb2x1bW49e2NvbH1cbiAgICAgICAgICAgIGN1cnJlbnRTb3J0Q29sdW1uPXt0aGlzLnByb3BzLnNvcnRDb2x1bW59XG4gICAgICAgICAgICBjdXJyZW50U29ydE9yZGVyPXt0aGlzLnByb3BzLnNvcnRPcmRlcn1cbiAgICAgICAgICAgIG9uU29ydENoYW5nZT17dGhpcy5wcm9wcy5zb3J0Q2hhbmdlfVxuICAgICAgICAgICAgaXNCdXN5PXt0aGlzLnByb3BzLmlzQnVzeX1cbiAgICAgICAgICAgIGZpbHRlcmluZz17dGhpcy5wcm9wcy5pc0ZpbHRlcmluZ31cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7Y29sLmhlYWRlcn1cbiAgICAgICAgICA8L0hlYWRlckNlbGw+XG4gICAgICAgIH1cbiAgICAgICAgY2VsbD17dGhpcy5yZW5kZXJDZWxsKGNvbCl9XG4gICAgICAgIHdpZHRoPXt0aGlzLnByb3BzLmNvbHVtbldpZHRocy5nZXQoY29sLmNvbHVtbktleSwgY29sLndpZHRoKX1cbiAgICAgICAgbWluV2lkdGg9e2NvbC5taW5XaWR0aH1cbiAgICAgICAgbWF4V2lkdGg9e2NvbC5tYXhXaWR0aH1cbiAgICAgICAgaXNSZXNpemFibGU9e2NvbC5pc1Jlc2l6YWJsZX1cbiAgICAgICAgZmxleEdyb3c9e2NvbC5mbGV4R3JvdyA/IGNvbC5mbGV4R3JvdyA6IDB9XG4gICAgICAgIGZpeGVkPXtjb2wuZml4ZWR9XG4gICAgICAgIGFsbG93Q2VsbHNSZWN5Y2xpbmc9e2NvbC5hbGxvd0NlbGxzUmVjeWNsaW5nfVxuICAgICAgLz4pKTtcbiAgfVxuXG4gIHJlbmRlckNvbnRleHRNZW51ID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGNvbnRleHRNZW51SXRlbXMsXG4gICAgICBkYXRhLFxuICAgICAgZ3JpZCxcbiAgICAgIHNlbGVjdGVkSXRlbXMsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge1xuICAgICAgY29udGV4dE1lbnVYLFxuICAgICAgY29udGV4dE1lbnVZLFxuICAgIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHN0eWxlID0ge1xuICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgIHpJbmRleDogMTAwMDAsXG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIHRvcDogYCR7Y29udGV4dE1lbnVZfXB4YCxcbiAgICAgIGxlZnQ6IGAke2NvbnRleHRNZW51WH1weGAsXG4gICAgfTtcbiAgICBjb25zdCBzZWxlY3RlZERhdGEgPSBkYXRhLmZpbHRlcihkID0+IHNlbGVjdGVkSXRlbXMuaW5jbHVkZXMoZC5nZXRJbihncmlkLmlkS2V5UGF0aCkpKTtcbiAgICByZXR1cm4gKFxuICAgICAgPHVsIGNsYXNzTmFtZT1cImRyb3Bkb3duLW1lbnUgb2MtZGF0YWdyaWQtY29udGV4dC1tZW51IG9wZW5cIiBzdHlsZT17c3R5bGV9PlxuICAgICAgICB7IGNvbnRleHRNZW51SXRlbXMgJiYgY29udGV4dE1lbnVJdGVtcy5tYXAgJiYgY29udGV4dE1lbnVJdGVtcy5tYXAoKGl0ZW0sIGkpID0+IHtcbiAgICAgICAgICBsZXQgeyBkaXNhYmxlZCB9ID0gaXRlbTtcbiAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0uZGlzYWJsZWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGRpc2FibGVkID0gaXRlbS5kaXNhYmxlZChzZWxlY3RlZEl0ZW1zLCBzZWxlY3RlZERhdGEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPE1lbnVJdGVtXG4gICAgICAgICAgICAgIGtleT17aX0gLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAgICAgICBoZWFkZXI9e2l0ZW0uaGVhZGVyfVxuICAgICAgICAgICAgICBkaXZpZGVyPXtpdGVtLmRpdmlkZXJ9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgdGl0bGU9e2l0ZW0udGl0bGV9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9eyhkaXNhYmxlZCB8fCAhaXRlbS5vbkNsaWNrKSA/IG51bGwgOiB0aGlzLmhhbmRsZUNvbnRleHRNZW51SXRlbUNsaWNrKFxuICAgICAgICAgICAgICAgIGl0ZW0ub25DbGljayxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEl0ZW1zLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkRGF0YSxcbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgeyBpdGVtLnZhbHVlIH1cbiAgICAgICAgICAgIDwvTWVudUl0ZW0+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSkgfVxuICAgICAgPC91bD5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGdyaWRDbGFzc05hbWUgPSBjbGFzc05hbWVzKHtcbiAgICAgICdvYy1kYXRhZ3JpZC1jb250YWluZXInOiB0cnVlLFxuICAgICAgJ3dpdGgtYWN0aW9uYmFyJzogdGhpcy5wcm9wcy5pbmxpbmVFZGl0ICYmICF0aGlzLnByb3BzLmRpc2FibGVBY3Rpb25CYXIsXG4gICAgICAnaXMtYnVzeSc6IHRoaXMucHJvcHMuaXNCdXN5LFxuICAgICAgJ2lzLWVkaXRpbmcnOiB0aGlzLnByb3BzLmlzRWRpdGluZyxcbiAgICAgICdpcy1jcmVhdGluZyc6IHRoaXMucHJvcHMuaXNDcmVhdGluZyxcbiAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgfSk7XG5cbiAgICAvLyBjaGVjayBpZiB0aGVyZSBpcyBhIG5ldyByZXF1ZXN0IHRvIGNoYW5nZSBlZGl0IG1vZGUgZm9jdXNcbiAgICB0aGlzLnNldEZvY3VzVG8odGhpcy5wcm9wcy5mb2N1c1R5cGUpO1xuXG4gICAgbGV0IGFjdGlvbkJhciA9IG51bGw7XG4gICAgbGV0IGFjdGlvbkJhclJpZ2h0ID0gbnVsbDtcbiAgICBsZXQgYWN0aW9uQmFyTGVmdCA9IG51bGw7XG4gICAgaWYgKFxuICAgICAgKHRoaXMucHJvcHMuYWN0aW9uQmFyIHx8XG4gICAgICB0aGlzLnByb3BzLmlubGluZUVkaXQgfHxcbiAgICAgIHRoaXMucHJvcHMuZmlsdGVyaW5nIHx8XG4gICAgICB0aGlzLnByb3BzLnJlbW92aW5nKSAmJlxuICAgICAgIXRoaXMucHJvcHMuZGlzYWJsZUFjdGlvbkJhclxuICAgICkge1xuICAgICAgYWN0aW9uQmFyUmlnaHQgPSAoXG4gICAgICAgIDxBY3Rpb25CYXIgcG9zaXRpb249XCJyaWdodFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtYWN0aW9uYmFyLXJpZ2h0XCI+eyB0aGlzLnByb3BzLmFjdGlvbkJhciB9PC9kaXY+XG4gICAgICAgICAgeyAodGhpcy5wcm9wcy5maWx0ZXJpbmcgJiYgdGhpcy5wcm9wcy5kaXNhYmxlRHJvcGRvd25cbiAgICAgICAgICAgICYmICF0aGlzLnByb3BzLmRpc2FibGVGaWx0ZXJpbmdDb250cm9scykgJiZcbiAgICAgICAgICAgIDxGaWx0ZXJpbmdDb250cm9scyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgICB9XG4gICAgICAgICAgeyB0aGlzLnByb3BzLmlubGluZUVkaXQgJiZcbiAgICAgICAgICAgIDxJbmxpbmVFZGl0Q29udHJvbHNcbiAgICAgICAgICAgICAgYWZ0ZXJBZGRJdGVtPXt0aGlzLmhhbmRsZUFmdGVyQWRkSXRlbX1cbiAgICAgICAgICAgICAgYWZ0ZXJFZGl0UHJlc3M9e3RoaXMuaGFuZGxlQWZ0ZXJFZGl0UHJlc3N9XG4gICAgICAgICAgICAgIGFmdGVyVmFsaWRhdGlvbkVycm9yPXt0aGlzLmhhbmRsZUFmdGVyVmFsaWRhdGlvbkVycm9yfVxuICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgfVxuICAgICAgICAgIHsgKHRoaXMucHJvcHMuZHJvcGRvd25NZW51SXRlbXMgfHxcbiAgICAgICAgICAgICB0aGlzLnByb3BzLnJlbW92aW5nIHx8XG4gICAgICAgICAgICAgdGhpcy5wcm9wcy5jb2x1bW5TZXR0aW5ncyB8fFxuICAgICAgICAgICAgICh0aGlzLnByb3BzLmZpbHRlcmluZyAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlRHJvcGRvd24pKSAmJlxuICAgICAgICAgICAgIDxEcm9wZG93bkNvbnRyb2xzIHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICAgIH1cbiAgICAgICAgPC9BY3Rpb25CYXI+XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5hY3Rpb25CYXJMZWZ0IHx8IHRoaXMucHJvcHMuZ3JpZEhlYWRlcikge1xuICAgICAgYWN0aW9uQmFyTGVmdCA9IChcbiAgICAgICAgPEFjdGlvbkJhciBwb3NpdGlvbj1cImxlZnRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWdyaWRoZWFkZXJcIj57IHRoaXMucHJvcHMuZ3JpZEhlYWRlciB9PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1hY3Rpb25iYXItbGVmdFwiPnsgdGhpcy5wcm9wcy5hY3Rpb25CYXJMZWZ0IH08L2Rpdj5cbiAgICAgICAgPC9BY3Rpb25CYXI+XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoYWN0aW9uQmFyTGVmdCB8fCBhY3Rpb25CYXJSaWdodCkge1xuICAgICAgYWN0aW9uQmFyID0gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWFjdGlvbmJhci1jb250YWluZXJcIj5cbiAgICAgICAgICB7IGFjdGlvbkJhckxlZnQgfVxuICAgICAgICAgIHsgYWN0aW9uQmFyUmlnaHQgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICAgIGxldCByb3dzQ291bnQgPVxuICAgICAgKHRoaXMucHJvcHMucm93c0NvdW50IHx8IHRoaXMucHJvcHMucm93c0NvdW50ID09PSAwKSA/XG4gICAgICAgIHRoaXMucHJvcHMucm93c0NvdW50IDpcbiAgICAgICAgdGhpcy5wcm9wcy5kYXRhLnNpemU7XG4gICAgaWYgKHRoaXMucHJvcHMuaXNDcmVhdGluZykgcm93c0NvdW50ICs9IHRoaXMucHJvcHMuY3JlYXRlRGF0YS5zaXplO1xuICAgIGlmICghdGhpcy5wcm9wcy52aXNpYmxlQ29sdW1ucy5zaXplKSByb3dzQ291bnQgPSAwO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPXtgb2MtZGF0YWdyaWQtJHt0aGlzLnByb3BzLmdyaWQuaWR9YH1cbiAgICAgICAgY2xhc3NOYW1lPXtncmlkQ2xhc3NOYW1lfVxuICAgICAgICBzdHlsZT17dGhpcy5wcm9wcy5jb250YWluZXJTdHlsZX1cbiAgICAgID5cbiAgICAgICAgeyB0aGlzLnByb3BzLmlzQnVzeSAmJiA8U3Bpbm5lciAvPiB9XG4gICAgICAgIHsgdGhpcy5zdGF0ZS5jb250ZXh0TWVudU9wZW4gJiYgdGhpcy5yZW5kZXJDb250ZXh0TWVudSgpIH1cbiAgICAgICAgeyBhY3Rpb25CYXIgfVxuICAgICAgICA8UmVzcG9uc2l2ZUZpeGVkRGF0YVRhYmxlXG4gICAgICAgICAgaWQ9e3RoaXMucHJvcHMuZ3JpZC5pZH1cbiAgICAgICAgICByb3dzQ291bnQ9e3Jvd3NDb3VudH1cbiAgICAgICAgICBoZWFkZXJIZWlnaHQ9e3RoaXMucHJvcHMuaXNGaWx0ZXJpbmcgP1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5oZWFkZXJIZWlnaHQgKyB0aGlzLnByb3BzLmZpbHRlclJvd0hlaWdodFxuICAgICAgICAgICAgOiB0aGlzLnByb3BzLmhlYWRlckhlaWdodH1cbiAgICAgICAgICByb3dIZWlnaHQ9e3RoaXMucHJvcHMucm93SGVpZ2h0fVxuICAgICAgICAgIG9uQ29sdW1uUmVzaXplRW5kQ2FsbGJhY2s9e3RoaXMub25Db2x1bW5SZXNpemVFbmRDYWxsYmFja31cbiAgICAgICAgICBpc0NvbHVtblJlc2l6aW5nPXtmYWxzZX1cbiAgICAgICAgICBvblJvd0NsaWNrPXt0aGlzLmhhbmRsZVJvd0NsaWNrfVxuICAgICAgICAgIHNjcm9sbFRvQ29sdW1uPXt0aGlzLnByb3BzLnNjcm9sbFRvQ29sdW1uIHx8IHRoaXMuc3RhdGUuY3VycmVudENvbHVtbn1cbiAgICAgICAgICBzY3JvbGxUb3A9e3RoaXMucHJvcHMuc2Nyb2xsVG9wfVxuICAgICAgICAgIHNjcm9sbFRvUm93PXt0aGlzLmdldFNjcm9sbFRvUm93KCl9XG4gICAgICAgICAgb25Sb3dEb3VibGVDbGljaz17dGhpcy5wcm9wcy5vblJvd0RvdWJsZUNsaWNrfVxuICAgICAgICAgIG9uUm93TW91c2VEb3duPXt0aGlzLnByb3BzLm9uTW91c2VEb3dufVxuICAgICAgICAgIG9uUm93TW91c2VFbnRlcj17dGhpcy5wcm9wcy5vblJvd01vdXNlRW50ZXJ9XG4gICAgICAgICAgb25Sb3dNb3VzZUxlYXZlPXt0aGlzLnByb3BzLm9uUm93TW91c2VMZWF2ZX1cbiAgICAgICAgICBvblNjcm9sbFN0YXJ0PXt0aGlzLnByb3BzLm9uU2Nyb2xsU3RhcnR9XG4gICAgICAgICAgb25TY3JvbGxFbmQ9e3RoaXMucHJvcHMub25TY3JvbGxFbmR9XG4gICAgICAgICAgcm93Q2xhc3NOYW1lR2V0dGVyPXt0aGlzLmdldFJvd0NsYXNzTmFtZX1cbiAgICAgICAgICByb3dIZWlnaHRHZXR0ZXI9e3RoaXMucHJvcHMucm93SGVpZ2h0R2V0dGVyICYmIHRoaXMuaGFuZGxlUm93SGVpZ2h0R2V0dGVyfVxuICAgICAgICAgIG9uQ29udGVudEhlaWdodENoYW5nZT17dGhpcy5wcm9wcy5vbkNvbnRlbnRIZWlnaHRDaGFuZ2V9XG4gICAgICAgICAgb25Sb3dDb250ZXh0TWVudT17dGhpcy5oYW5kbGVDb250ZXh0TWVudX1cbiAgICAgICAgPlxuICAgICAgICAgIHsgdGhpcy5yZW5kZXJDb2x1bW5zKCkgfVxuICAgICAgICA8L1Jlc3BvbnNpdmVGaXhlZERhdGFUYWJsZT5cbiAgICAgICAgeyB0aGlzLnByb3BzLmlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW4gJiZcbiAgICAgICAgICA8Q29sdW1uU2V0dGluZ3NNb2RhbFxuICAgICAgICAgICAgZ3JpZD17dGhpcy5wcm9wcy5ncmlkfVxuICAgICAgICAgICAgY29sdW1ucz17dGhpcy5wcm9wcy5jb2x1bW5zfVxuICAgICAgICAgICAgdmlzaWJsZUNvbHVtbnM9e3RoaXMucHJvcHMudmlzaWJsZUNvbHVtbnN9XG4gICAgICAgICAgICBjbG9zZUNvbHVtblNldHRpbmdzTW9kYWw9e3RoaXMucHJvcHMuY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsfVxuICAgICAgICAgICAgc2F2ZUNvbHVtblNldHRpbmdzPXt0aGlzLnByb3BzLnNhdmVDb2x1bW5TZXR0aW5nc31cbiAgICAgICAgICAvPlxuICAgICAgICB9XG4gICAgICAgIHsgdGhpcy5wcm9wcy5jaGlsZHJlbiB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=