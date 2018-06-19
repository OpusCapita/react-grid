'use strict';

exports.__esModule = true;
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _class, _class2, _temp, _initialiseProps; /* eslint-disable no-lonely-if, prefer-template, react/require-default-props */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _reactRedux = require('react-redux');

var _reactIntl = require('react-intl');

var _fixedDataTable = require('fixed-data-table-2');

var _reactBootstrap = require('react-bootstrap');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactFloatingSelect = require('@opuscapita/react-floating-select');

var _reactDatetime = require('@opuscapita/react-datetime');

var _reactIcons = require('@opuscapita/react-icons');

var _reactSpinner = require('@opuscapita/react-spinner');

require('fixed-data-table-2/dist/fixed-data-table.css');

var _responsiveFixedDataTable = require('./responsive-fixed-data-table.component');

var _responsiveFixedDataTable2 = _interopRequireDefault(_responsiveFixedDataTable);

var _headerCell = require('./header-cell.component');

var _headerCell2 = _interopRequireDefault(_headerCell);

var _actionBar = require('./action-bar.component');

var _actionBar2 = _interopRequireDefault(_actionBar);

var _inlineEditControls = require('./inline-edit-controls.component');

var _inlineEditControls2 = _interopRequireDefault(_inlineEditControls);

var _filteringControls = require('./filtering-controls.component');

var _filteringControls2 = _interopRequireDefault(_filteringControls);

var _dropdownControls = require('./dropdown-controls.component');

var _dropdownControls2 = _interopRequireDefault(_dropdownControls);

var _datagrid = require('./datagrid.actions');

var datagridActions = _interopRequireWildcard(_datagrid);

var _cellTooltip = require('./cell-tooltip.component');

var _cellTooltip2 = _interopRequireDefault(_cellTooltip);

var _columnSettings = require('./column-settings/column-settings.component');

var _columnSettings2 = _interopRequireDefault(_columnSettings);

var _datagrid2 = require('./datagrid.props');

var _datagrid3 = require('./datagrid.constants');

var _datagrid4 = require('./datagrid.utils');

var _datagrid5 = _interopRequireDefault(_datagrid4);

require('./datagrid.component.scss');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
    visibleColumns: state.datagrid.getIn([GRID.id, 'config', 'visibleColumns'], (0, _immutable.List)()),
    columnWidths: state.datagrid.getIn([GRID.id, 'config', 'columnWidths'], (0, _immutable.Map)()),
    selectedCell: state.datagrid.getIn([GRID.id, 'selectedCell'], (0, _immutable.Map)()),
    selectedItems: state.datagrid.getIn([GRID.id, 'selectedItems'], (0, _immutable.List)()),
    data: state.datagrid.getIn([GRID.id, 'data'], (0, _immutable.List)()),
    editData: state.datagrid.getIn([GRID.id, 'editData'], (0, _immutable.Map)()),
    createData: state.datagrid.getIn([GRID.id, 'createData'], (0, _immutable.List)()),
    filterData: state.datagrid.getIn([GRID.id, 'config', 'filteringData', 'filterData'], (0, _immutable.Map)()),
    cellMessages: state.datagrid.getIn([GRID.id, 'cellMessages'], (0, _immutable.Map)()),
    createCellMessages: state.datagrid.getIn([GRID.id, 'createCellMessages'], (0, _immutable.Map)()),
    allDataSize: state.datagrid.getIn([GRID.id, 'allData'], (0, _immutable.List)()).size,
    language: _datagrid5.default.getLanguage(GRID, state.user),
    dateFormat: _datagrid5.default.getDateFormat(GRID, state.user),
    thousandSeparator: _datagrid5.default.getThousandSeparator(GRID, state.user),
    decimalSeparator: _datagrid5.default.getDecimalSeparator(GRID, state.user)
  };
};

var mapDispatchToProps = datagridActions;

var DataGrid = (_dec = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _reactIntl.injectIntl)(_class = _dec(_class = (_temp = _class2 = function (_React$PureComponent) {
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
    var gridClassName = (0, _classnames2.default)({
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
      actionBarRight = _react2.default.createElement(
        _actionBar2.default,
        { position: 'right' },
        _react2.default.createElement(
          'div',
          { className: 'oc-datagrid-actionbar-right' },
          this.props.actionBar
        ),
        this.props.filtering && this.props.disableDropdown && !this.props.disableFilteringControls && _react2.default.createElement(_filteringControls2.default, this.props),
        this.props.inlineEdit && _react2.default.createElement(_inlineEditControls2.default, _extends({
          afterAddItem: this.handleAfterAddItem,
          afterEditPress: this.handleAfterEditPress,
          afterValidationError: this.handleAfterValidationError
        }, this.props)),
        (this.props.dropdownMenuItems || this.props.removing || this.props.columnSettings || this.props.filtering && !this.props.disableDropdown) && _react2.default.createElement(_dropdownControls2.default, this.props)
      );
    }
    if (this.props.actionBarLeft || this.props.gridHeader) {
      actionBarLeft = _react2.default.createElement(
        _actionBar2.default,
        { position: 'left' },
        _react2.default.createElement(
          'div',
          { className: 'oc-datagrid-gridheader' },
          this.props.gridHeader
        ),
        _react2.default.createElement(
          'div',
          { className: 'oc-datagrid-actionbar-left' },
          this.props.actionBarLeft
        )
      );
    }
    if (actionBarLeft || actionBarRight) {
      actionBar = _react2.default.createElement(
        'div',
        { className: 'oc-datagrid-actionbar-container' },
        actionBarLeft,
        actionBarRight
      );
    }
    var rowsCount = this.props.rowsCount || this.props.rowsCount === 0 ? this.props.rowsCount : this.props.data.size;
    if (this.props.isCreating) rowsCount += this.props.createData.size;
    if (!this.props.visibleColumns.size) rowsCount = 0;
    return _react2.default.createElement(
      'div',
      {
        id: 'oc-datagrid-' + this.props.grid.id,
        className: gridClassName,
        style: this.props.containerStyle
      },
      this.props.isBusy && _react2.default.createElement(_reactSpinner.Spinner, null),
      actionBar,
      _react2.default.createElement(
        _responsiveFixedDataTable2.default,
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
      this.props.isColumnSettingsModalOpen && _react2.default.createElement(_columnSettings2.default, {
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
}(_react2.default.PureComponent), _class2.defaultProps = _datagrid2.defaultProps, _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.onColumnResizeEndCallback = function (newColumnWidth, columnKey) {
    _this2.props.resizeColumn(_this2.props.grid, columnKey, newColumnWidth);
  };

  this.onCreateCellKeyDown = function (e) {
    if (e.keyCode === _datagrid3.KEY_CODES.ENTER) {
      _this2.props.addNewItem(_this2.props.grid, _datagrid5.default.getColumnDefaultValues(_this2.props.columns));
      _this2.focusToCreateCell = true;
    }
  };

  this.onEditCellKeyDown = function (col, rowIndex) {
    return function (e) {
      if (_this2.props.enableArrowNavigation) {
        var columns = _this2.props.columns;

        var rowsSize = _this2.props.data.size;
        var columnKey = _datagrid5.default.getColumnKey(col);
        switch (e.keyCode) {
          case _datagrid3.KEY_CODES.DOWN:
            {
              if (col.valueType !== 'number') {
                var nextElement = _this2.cellRefs[_this2.props.grid.id + '_' + columnKey + '_' + (rowIndex + 1)];
                _this2.moveCellFocus(nextElement, rowIndex + 1, -1);
              }
              break;
            }
          case _datagrid3.KEY_CODES.UP:
            {
              if (col.valueType !== 'number') {
                var _nextElement = _this2.cellRefs[_this2.props.grid.id + '_' + columnKey + '_' + (rowIndex - 1)];
                _this2.moveCellFocus(_nextElement, rowIndex - 1, -1);
              }
              break;
            }
          case _datagrid3.KEY_CODES.TAB:
          case _datagrid3.KEY_CODES.RIGHT:
          case _datagrid3.KEY_CODES.LEFT:
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
                  if (e.keyCode === _datagrid3.KEY_CODES.LEFT || e.keyCode === _datagrid3.KEY_CODES.TAB && e.shiftKey) {
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
                  var nextColumnKey = _datagrid5.default.getColumnKey(columns[columnInd]);
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
        _this2.props.cellSelectionChange(_this2.props.grid, (0, _immutable.Map)({ rowIndex: rowIndex, columnKey: columnKey }));
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
    var val = _this2.props.filterData.get(_datagrid5.default.getColumnKey(col), '');
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
        _this2.props.cellSelectionChange(_this2.props.grid, (0, _immutable.Map)({ rowIndex: rowIndex, columnKey: columnKey }));
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
      var columnKey = _datagrid5.default.getColumnKey(col);
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
          return _react2.default.createElement(_reactBootstrap.Checkbox, {
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
        if (_datagrid5.default.getColumnKey(orgCol) === visibleColumnKey) {
          visibleColumns.push(orgCol);
        }
      });
    });
    visibleColumns.forEach(function (col) {
      var column = {
        header: col.header,
        columnKey: _datagrid5.default.getColumnKey(col),
        width: col.width || col.width === 0 ? col.width : 200,
        minWidth: col.minWidth || col.minWidth === 0 ? col.minWidth : 40,
        maxWidth: col.maxWidth,
        isResizable: !col.disableResizing,
        fixed: !!col.fixed,
        allowCellsRecycling: !!col.allowCellsRecycling,
        disableSorting: !!col.disableSorting,
        isRequired: !!col.isRequired,
        componentType: col.componentType,
        style: _datagrid5.default.getCellStyleByCol(col)
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
      var valueEmptyChecker = _datagrid5.default.getValueEmptyChecker(col);
      // Cell value rendering
      var valueRender = function valueRender(rowIndex, format) {
        var val = _this2.props.data.getIn([rowIndex].concat(col.valueKeyPath));
        if (valueEmptyChecker(val)) {
          return col.isRequired ? _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Grid.ValueIsMissing' }) : '';
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
                return _react2.default.createElement(_reactIntl.FormattedNumber, _extends({ value: v }, col.renderComponentProps));
              });
            };
            break;
          case 'date':
            column.cell = function (rowIndex) {
              return valueRender(rowIndex, function (v) {
                if ((0, _moment2.default)(v, _this2.props.dateFormat, true).isValid()) {
                  return _moment2.default.utc(v, _this2.props.dateFormat).format(_this2.props.dateFormat);
                }
                if ((0, _moment2.default)(v).isValid()) {
                  return _moment2.default.utc(v).format(_this2.props.dateFormat);
                }
                return _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Grid.InvalidDate' });
              });
            };
            break;
          case 'boolean':
            column.cell = function (rowIndex) {
              return valueRender(rowIndex, function (v) {
                return _react2.default.createElement(_reactIntl.FormattedMessage, _extends({ id: v ? 'Grid.Yes' : 'Grid.No' }, col.renderComponentProps));
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
                  return _react2.default.createElement(_reactBootstrap.FormControl, _extends({
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
                  return _react2.default.createElement(_reactBootstrap.FormControl, _extends({
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
                  return _react2.default.createElement(_reactBootstrap.FormControl, _extends({
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
                  return _react2.default.createElement(_reactBootstrap.FormControl, _extends({
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
                  return _react2.default.createElement(_reactBootstrap.FormControl, _extends({
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
                  return _react2.default.createElement(_reactBootstrap.FormControl, _extends({
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
                  return _react2.default.createElement(_reactBootstrap.FormControl, _extends({
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
                  return _react2.default.createElement(_reactBootstrap.FormControl, _extends({
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
                  return _react2.default.createElement(_reactBootstrap.FormControl, _extends({
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
                    return _react2.default.createElement(_reactFloatingSelect.FloatingSelect, _extends({
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
                    return _react2.default.createElement(_reactFloatingSelect.FloatingSelect, _extends({
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
                    return _react2.default.createElement(_reactFloatingSelect.FloatingSelect, _extends({
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
                    return _react2.default.createElement(_reactDatetime.DateInput, _extends({
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
                    return _react2.default.createElement(_reactDatetime.DateInput, _extends({
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
                    return _react2.default.createElement(_reactDatetime.DateInput, _extends({
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

              var _selectTranslations = col.selectComponentTranslations || {
                placeholder: _intl.formatMessage({ id: 'Grid.FloatingSelect.Select' }),
                noResultsText: _intl.formatMessage({ id: 'Grid.FloatingSelect.NoResults' })
              };

              var _selectOptions = [{ value: true, label: _intl.formatMessage({ id: 'Grid.Yes' }) }, { value: false, label: _intl.formatMessage({ id: 'Grid.No' }) }];
              if (_this2.props.inlineEdit) {
                if (!column.cellEdit) {
                  column.cellEdit = function (rowIndex) {
                    return _react2.default.createElement(_reactFloatingSelect.FloatingSelect, _extends({
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
                    return _react2.default.createElement(_reactFloatingSelect.FloatingSelect, _extends({
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
                    return _react2.default.createElement(_reactFloatingSelect.FloatingSelect, _extends({
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
          return _react2.default.createElement(_reactIcons.Icon, {
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
        return _react2.default.createElement(
          _fixedDataTable.Cell,
          _extends({}, props, {
            className: className,
            style: col.style,
            onClick: _this2.handleCellSelect(cellType, rowIndex, props.columnKey)
          }),
          _react2.default.createElement(
            _cellTooltip2.default,
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
      return _react2.default.createElement(
        _fixedDataTable.Cell,
        _extends({}, props, { className: 'oc-datagrid-cell', style: col.style }),
        cell
      );
    };
  };

  this.renderColumns = function () {
    if (!_this2.props.allDataSize && !_this2.props.isBusy && !_this2.props.isCreating) {
      return _react2.default.createElement(_fixedDataTable.Column, {
        columnKey: 'dataEmptyColumn',
        header: _react2.default.createElement(
          _fixedDataTable.Cell,
          { style: { textAlign: 'center' } },
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Grid.NoItems' })
        ),
        width: 10,
        isResizable: false,
        flexGrow: 1
      });
    }
    if (!_this2.props.visibleColumns.size) {
      if (_this2.props.isBusy) {
        return _react2.default.createElement(_fixedDataTable.Column, {
          columnKey: 'dataEmptyColumn',
          header: _react2.default.createElement(
            _fixedDataTable.Cell,
            null,
            '\xA0'
          ),
          width: 10,
          isResizable: false,
          flexGrow: 1
        });
      }
      return _react2.default.createElement(_fixedDataTable.Column, {
        columnKey: 'dataEmptyColumn',
        header: _react2.default.createElement(
          _fixedDataTable.Cell,
          { style: { textAlign: 'center' } },
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Grid.NoColumns' })
        ),
        width: 10,
        isResizable: false,
        flexGrow: 1
      });
    }
    var columns = _this2.generateColumns();
    if (columns.lenght === 0) return null;
    return columns.map(function (col) {
      return _react2.default.createElement(_fixedDataTable.Column, {
        key: col.columnKey,
        columnKey: col.columnKey,
        header: _react2.default.createElement(
          _headerCell2.default,
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
exports.default = DataGrid;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbImRhdGFncmlkQWN0aW9ucyIsIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwib3duUHJvcHMiLCJHUklEIiwiZ3JpZCIsImlzQnVzeSIsImRhdGFncmlkIiwiZ2V0SW4iLCJpZCIsImlzRWRpdGluZyIsImlzQ3JlYXRpbmciLCJpc0ZpbHRlcmluZyIsImlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW4iLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwidmlzaWJsZUNvbHVtbnMiLCJjb2x1bW5XaWR0aHMiLCJzZWxlY3RlZENlbGwiLCJzZWxlY3RlZEl0ZW1zIiwiZGF0YSIsImVkaXREYXRhIiwiY3JlYXRlRGF0YSIsImZpbHRlckRhdGEiLCJjZWxsTWVzc2FnZXMiLCJjcmVhdGVDZWxsTWVzc2FnZXMiLCJhbGxEYXRhU2l6ZSIsInNpemUiLCJsYW5ndWFnZSIsIlV0aWxzIiwiZ2V0TGFuZ3VhZ2UiLCJ1c2VyIiwiZGF0ZUZvcm1hdCIsImdldERhdGVGb3JtYXQiLCJ0aG91c2FuZFNlcGFyYXRvciIsImdldFRob3VzYW5kU2VwYXJhdG9yIiwiZGVjaW1hbFNlcGFyYXRvciIsImdldERlY2ltYWxTZXBhcmF0b3IiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJEYXRhR3JpZCIsImluamVjdEludGwiLCJwcm9wcyIsImN1cnJlbnRSb3ciLCJjdXJyZW50Q29sdW1uIiwiY2VsbFJlZnMiLCJmb2N1c1RvQ3JlYXRlQ2VsbCIsImZvY3VzVG9FZGl0Q2VsbCIsImZvY3VzVG9FcnJvckNlbGwiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImludmFsaWRhdGUiLCJpc1NlbGVjdGlvbkNoZWNrYm94IiwiY2VsbFByb3BzIiwiZXhwZWN0ZWRDb2x1bW5LZXkiLCJyb3dTZWxlY3RDaGVja2JveENvbHVtbiIsImNvbHVtbktleSIsInJlbmRlciIsImdyaWRDbGFzc05hbWUiLCJpbmxpbmVFZGl0IiwiZGlzYWJsZUFjdGlvbkJhciIsImFjdGlvbkJhciIsImFjdGlvbkJhclJpZ2h0IiwiYWN0aW9uQmFyTGVmdCIsImZpbHRlcmluZyIsInJlbW92aW5nIiwiZGlzYWJsZURyb3Bkb3duIiwiZGlzYWJsZUZpbHRlcmluZ0NvbnRyb2xzIiwiaGFuZGxlQWZ0ZXJBZGRJdGVtIiwiaGFuZGxlQWZ0ZXJFZGl0UHJlc3MiLCJoYW5kbGVBZnRlclZhbGlkYXRpb25FcnJvciIsImRyb3Bkb3duTWVudUl0ZW1zIiwiY29sdW1uU2V0dGluZ3MiLCJncmlkSGVhZGVyIiwicm93c0NvdW50IiwiY29udGFpbmVyU3R5bGUiLCJoZWFkZXJIZWlnaHQiLCJmaWx0ZXJSb3dIZWlnaHQiLCJyb3dIZWlnaHQiLCJvbkNvbHVtblJlc2l6ZUVuZENhbGxiYWNrIiwiaGFuZGxlUm93Q2xpY2siLCJzY3JvbGxUb0NvbHVtbiIsInNjcm9sbFRvcCIsImdldFNjcm9sbFRvUm93Iiwib25Sb3dEb3VibGVDbGljayIsIm9uUm93TW91c2VEb3duIiwib25Sb3dNb3VzZUVudGVyIiwib25Sb3dNb3VzZUxlYXZlIiwib25TY3JvbGxTdGFydCIsIm9uU2Nyb2xsRW5kIiwiZ2V0Um93Q2xhc3NOYW1lIiwicm93SGVpZ2h0R2V0dGVyIiwib25Db250ZW50SGVpZ2h0Q2hhbmdlIiwicmVuZGVyQ29sdW1ucyIsImNvbHVtbnMiLCJjbG9zZUNvbHVtblNldHRpbmdzTW9kYWwiLCJzYXZlQ29sdW1uU2V0dGluZ3MiLCJjaGlsZHJlbiIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyIsIm5ld0NvbHVtbldpZHRoIiwicmVzaXplQ29sdW1uIiwib25DcmVhdGVDZWxsS2V5RG93biIsImUiLCJrZXlDb2RlIiwiS0VZX0NPREVTIiwiRU5URVIiLCJhZGROZXdJdGVtIiwiZ2V0Q29sdW1uRGVmYXVsdFZhbHVlcyIsIm9uRWRpdENlbGxLZXlEb3duIiwiY29sIiwicm93SW5kZXgiLCJlbmFibGVBcnJvd05hdmlnYXRpb24iLCJyb3dzU2l6ZSIsImdldENvbHVtbktleSIsIkRPV04iLCJ2YWx1ZVR5cGUiLCJuZXh0RWxlbWVudCIsIm1vdmVDZWxsRm9jdXMiLCJVUCIsIlRBQiIsIlJJR0hUIiwiTEVGVCIsInByZXZlbnREZWZhdWx0IiwiY29sdW1uSW5kIiwiZmluZEluZGV4IiwiYyIsInZhbHVlS2V5UGF0aCIsImpvaW4iLCJkaXNhYmxlZCIsInJvd0luZCIsInNoaWZ0S2V5IiwibGVuZ3RoIiwibmV4dENvbHVtbktleSIsIm9uRmlsdGVyQ2VsbFZhbHVlQ2hhbmdlIiwidmFsdWVQYXJzZXIiLCJldmVudE9yRGF0YSIsInJhd1ZhbHVlIiwidGFyZ2V0IiwidW5kZWZpbmVkIiwidmFsdWUiLCJmaWx0ZXJDZWxsVmFsdWVDaGFuZ2UiLCJvbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSIsImNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSIsIm9uQ3JlYXRlVmFsdWVDaGFuZ2UiLCJvblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZSIsIm1hdGNoVmFsdWUiLCJuZXdWYWx1ZUtleVBhdGgiLCJ2IiwibmV3VmFsdWUiLCJ2YWxpZGF0b3JzIiwiY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUiLCJvbkVkaXRDZWxsVmFsdWVDaGFuZ2UiLCJkYXRhSWQiLCJnZXREYXRhSWRCeVJvd0luZGV4IiwiZWRpdENlbGxWYWx1ZUNoYW5nZSIsIm9uRWRpdFZhbHVlQ2hhbmdlIiwiZWRpdENlbGxWYWx1ZVZhbGlkYXRlIiwib25DcmVhdGVDZWxsQmx1ciIsIm9uQ3JlYXRlQmx1ciIsImdldEVkaXRJdGVtVmFsdWUiLCJvbkVkaXRDZWxsQmx1ciIsIm9uRWRpdEJsdXIiLCJvbkNlbGxGb2N1cyIsImNlbGxUeXBlIiwiaW5wdXRUeXBlIiwic2VsZWN0IiwiY2VsbFNlbGVjdCIsImNlbGxTZWxlY3Rpb25DaGFuZ2UiLCJpZEtleVBhdGgiLCJnZXRTZWxlY3RlZEl0ZW1JbmRleCIsImluZGV4IiwiZWRpdFZhbHVlIiwib3JpZ2luYWxWYWx1ZSIsImNvbXBvbmVudFR5cGUiLCJTdHJpbmciLCJyZXBsYWNlIiwiZ2V0Q3JlYXRlSXRlbVZhbHVlIiwidmFsIiwiZ2V0RmlsdGVySXRlbVZhbHVlIiwiZ2V0IiwiZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZSIsIm1vZGUiLCJjb21wb25lbnREaXNhYmxlZCIsImRpc2FibGVFZGl0aW5nIiwiZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2giLCJtYXRjaFZhbHVlS2V5UGF0aCIsInJvd0NsYXNzTmFtZXMiLCJleHRyYVJvd0NvdW50IiwicHVzaCIsImluZGV4T2YiLCJyb3dDbGFzc05hbWVHZXR0ZXIiLCJnZXRDZWxsTWVzc2FnZXMiLCJyZXR1cm5EYXRhIiwiaW5mb01lc3NhZ2UiLCJlcnJvck1lc3NhZ2UiLCJ3YXJuaW5nTWVzc2FnZSIsInNjcm9sbFRvUm93Iiwic2Nyb2xsTmV3Um93IiwiZmlyc3QiLCJoYW5kbGVDZWxsU2VsZWN0IiwiaGFuZGxlQ3JlYXRlQ2VsbFJlZiIsInJlZiIsImZvY3VzIiwiaGFuZGxlRWRpdENlbGxSZWYiLCJzZWxlY3RlZFJvd0luZGV4IiwiY29sdW1uSW5kZXgiLCJ0eXBlIiwic2V0U3RhdGUiLCJzZXRUaW1lb3V0IiwiaGFuZGxlU2VsZWN0aW9uQ2hlY2tCb3hPbkNoYW5nZSIsIml0ZW1TZWxlY3Rpb25DaGFuZ2UiLCJnZW5lcmF0ZUNvbHVtbnMiLCJ0YWJJbmRleCIsIndpZHRoIiwiaXNSZXNpemFibGUiLCJjZWxsIiwicm93SXRlbSIsIml0ZW1JZCIsInNlbGVjdGVkIiwiaW5jbHVkZXMiLCJjZWxsRWRpdCIsImNlbGxDcmVhdGUiLCJjZWxsRmlsdGVyIiwiZm9yRWFjaCIsInZpc2libGVDb2x1bW5LZXkiLCJvcmdDb2wiLCJjb2x1bW4iLCJoZWFkZXIiLCJtaW5XaWR0aCIsIm1heFdpZHRoIiwiZGlzYWJsZVJlc2l6aW5nIiwiZml4ZWQiLCJhbGxvd0NlbGxzUmVjeWNsaW5nIiwiZGlzYWJsZVNvcnRpbmciLCJpc1JlcXVpcmVkIiwic3R5bGUiLCJnZXRDZWxsU3R5bGVCeUNvbCIsImZsZXhHcm93Iiwic29ydENvbXBhcmF0b3IiLCJzb3J0VmFsdWVHZXR0ZXIiLCJ2YWx1ZUVtcHR5Q2hlY2tlciIsImdldFZhbHVlRW1wdHlDaGVja2VyIiwidmFsdWVSZW5kZXIiLCJmb3JtYXQiLCJyZW5kZXJDb21wb25lbnRQcm9wcyIsImlzVmFsaWQiLCJtb21lbnQiLCJ1dGMiLCJlZGl0VmFsdWVSZW5kZXIiLCJjcmVhdGVWYWx1ZVJlbmRlciIsImZpbHRlclZhbHVlUmVuZGVyIiwiZWRpdFZhbHVlUGFyc2VyIiwiZWRpdENvbXBvbmVudFByb3BzIiwiY3JlYXRlQ29tcG9uZW50UHJvcHMiLCJmaWx0ZXJDb21wb25lbnRQcm9wcyIsIlJlZ0V4cCIsImludGwiLCJzZWxlY3RPcHRpb25zIiwic2VsZWN0Q29tcG9uZW50T3B0aW9ucyIsInNlbGVjdFRyYW5zbGF0aW9ucyIsInNlbGVjdENvbXBvbmVudFRyYW5zbGF0aW9ucyIsInBsYWNlaG9sZGVyIiwiZm9ybWF0TWVzc2FnZSIsIm5vUmVzdWx0c1RleHQiLCJlZGl0U2VsZWN0T3B0aW9uc01vZCIsInNsaWNlIiwiY3JlYXRlU2VsZWN0T3B0aW9uc01vZCIsImZpbHRlclNlbGVjdE9wdGlvbnNNb2QiLCJvbktleURvd24iLCJvbkJsdXIiLCJvbkZvY3VzIiwibGFiZWwiLCJyZW1vdmVOZXdJdGVtIiwiaXNDZWxsRWRpdGVkIiwicm93U2VsZWN0IiwiY3RybEtleSIsImRvY3VtZW50IiwiZ2V0U2VsZWN0aW9uIiwicmVtb3ZlQWxsUmFuZ2VzIiwibXVsdGlTZWxlY3QiLCJvblJvd0NsaWNrIiwicmVuZGVyQ2VsbCIsImlzQ2hlY2tib3giLCJnZXRSb3dJbmRleCIsIm1lc3NhZ2VEYXRhIiwiaXNFZGl0ZWQiLCJjbGFzc05hbWUiLCJ0ZXh0QWxpZ24iLCJsZW5naHQiLCJtYXAiLCJzb3J0Q2hhbmdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O29EQUFBOzs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUtBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFD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R0FIVjtBQUlFLCtCQUFtQixPQUFLcEUsS0FBTCxDQUFXM0IsVUFKaEM7QUFLRSw4QkFBa0IsT0FBSzJCLEtBQUwsQ0FBVzFCLFNBTC9CO0FBTUUsMEJBQWMsT0FBSzBCLEtBQUwsQ0FBV3lQLFVBTjNCO0FBT0Usb0JBQVEsT0FBS3pQLEtBQUwsQ0FBV25DLE1BUHJCO0FBUUUsdUJBQVcsT0FBS21DLEtBQUwsQ0FBVzdCO0FBUnhCO0FBVUdpRyxjQUFJc0g7QUFWUCxTQUpKO0FBaUJFLGNBQU0sT0FBS3NELFVBQUwsQ0FBZ0I1SyxHQUFoQixDQWpCUjtBQWtCRSxlQUFPLE9BQUtwRSxLQUFMLENBQVd4QixZQUFYLENBQXdCa0ssR0FBeEIsQ0FBNEJ0RSxJQUFJdkQsU0FBaEMsRUFBMkN1RCxJQUFJd0csS0FBL0MsQ0FsQlQ7QUFtQkUsa0JBQVV4RyxJQUFJdUgsUUFuQmhCO0FBb0JFLGtCQUFVdkgsSUFBSXdILFFBcEJoQjtBQXFCRSxxQkFBYXhILElBQUl5RyxXQXJCbkI7QUFzQkUsa0JBQVV6RyxJQUFJZ0ksUUFBSixHQUFlaEksSUFBSWdJLFFBQW5CLEdBQThCLENBdEIxQztBQXVCRSxlQUFPaEksSUFBSTBILEtBdkJiO0FBd0JFLDZCQUFxQjFILElBQUkySDtBQXhCM0IsUUFEaUI7QUFBQSxLQUFaLENBQVA7QUEyQkQsRzs7a0JBbHBDa0JqTSxRIiwiZmlsZSI6ImRhdGFncmlkLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLWxvbmVseS1pZiwgcHJlZmVyLXRlbXBsYXRlLCByZWFjdC9yZXF1aXJlLWRlZmF1bHQtcHJvcHMgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBNYXAsIExpc3QgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7XG4gIGluamVjdEludGwsXG4gIEZvcm1hdHRlZE1lc3NhZ2UgYXMgTSxcbiAgRm9ybWF0dGVkTnVtYmVyIGFzIE4sXG59IGZyb20gJ3JlYWN0LWludGwnO1xuaW1wb3J0IHsgQ29sdW1uLCBDZWxsIH0gZnJvbSAnZml4ZWQtZGF0YS10YWJsZS0yJztcbmltcG9ydCB7IENoZWNrYm94LCBGb3JtQ29udHJvbCB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7IEZsb2F0aW5nU2VsZWN0IH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtZmxvYXRpbmctc2VsZWN0JztcbmltcG9ydCB7IERhdGVJbnB1dCB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWRhdGV0aW1lJztcbmltcG9ydCB7IEljb24gfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1pY29ucyc7XG5pbXBvcnQgeyBTcGlubmVyIH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3Qtc3Bpbm5lcic7XG5pbXBvcnQgJ2ZpeGVkLWRhdGEtdGFibGUtMi9kaXN0L2ZpeGVkLWRhdGEtdGFibGUuY3NzJztcblxuaW1wb3J0IFJlc3BvbnNpdmVGaXhlZERhdGFUYWJsZSBmcm9tICcuL3Jlc3BvbnNpdmUtZml4ZWQtZGF0YS10YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IEhlYWRlckNlbGwgZnJvbSAnLi9oZWFkZXItY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IEFjdGlvbkJhciBmcm9tICcuL2FjdGlvbi1iYXIuY29tcG9uZW50JztcbmltcG9ydCBJbmxpbmVFZGl0Q29udHJvbHMgZnJvbSAnLi9pbmxpbmUtZWRpdC1jb250cm9scy5jb21wb25lbnQnO1xuaW1wb3J0IEZpbHRlcmluZ0NvbnRyb2xzIGZyb20gJy4vZmlsdGVyaW5nLWNvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgRHJvcGRvd25Db250cm9scyBmcm9tICcuL2Ryb3Bkb3duLWNvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgKiBhcyBkYXRhZ3JpZEFjdGlvbnMgZnJvbSAnLi9kYXRhZ3JpZC5hY3Rpb25zJztcbmltcG9ydCBDZWxsVG9vbHRpcCBmcm9tICcuL2NlbGwtdG9vbHRpcC5jb21wb25lbnQnO1xuaW1wb3J0IENvbHVtblNldHRpbmdzTW9kYWwgZnJvbSAnLi9jb2x1bW4tc2V0dGluZ3MvY29sdW1uLXNldHRpbmdzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBwcm9wVHlwZXMsIGRlZmF1bHRQcm9wcyB9IGZyb20gJy4vZGF0YWdyaWQucHJvcHMnO1xuaW1wb3J0IHsgS0VZX0NPREVTIH0gZnJvbSAnLi9kYXRhZ3JpZC5jb25zdGFudHMnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4vZGF0YWdyaWQudXRpbHMnO1xuaW1wb3J0ICcuL2RhdGFncmlkLmNvbXBvbmVudC5zY3NzJztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlLCBvd25Qcm9wcykgPT4ge1xuICBjb25zdCBHUklEID0gb3duUHJvcHMuZ3JpZDtcbiAgcmV0dXJuIHtcbiAgICBpc0J1c3k6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdpc0J1c3knXSwgdHJ1ZSksXG4gICAgaXNFZGl0aW5nOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnaXNFZGl0aW5nJ10sIGZhbHNlKSxcbiAgICBpc0NyZWF0aW5nOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnaXNDcmVhdGluZyddLCBmYWxzZSksXG4gICAgaXNGaWx0ZXJpbmc6XG4gICAgICBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2lzRmlsdGVyaW5nJ10sIGZhbHNlKSxcbiAgICBpc0NvbHVtblNldHRpbmdzTW9kYWxPcGVuOlxuICAgICAgc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2NvbHVtblNldHRpbmdzTW9kYWwnLCAnb3BlbiddLCBmYWxzZSksXG4gICAgc29ydENvbHVtbjogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnc29ydGluZ0RhdGEnLCAnc29ydENvbHVtbiddLCBudWxsKSxcbiAgICBzb3J0T3JkZXI6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ3NvcnRpbmdEYXRhJywgJ3NvcnRPcmRlciddLCBudWxsKSxcbiAgICB2aXNpYmxlQ29sdW1uczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAndmlzaWJsZUNvbHVtbnMnXSwgTGlzdCgpKSxcbiAgICBjb2x1bW5XaWR0aHM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ2NvbHVtbldpZHRocyddLCBNYXAoKSksXG4gICAgc2VsZWN0ZWRDZWxsOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3NlbGVjdGVkQ2VsbCddLCBNYXAoKSksXG4gICAgc2VsZWN0ZWRJdGVtczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZWxlY3RlZEl0ZW1zJ10sIExpc3QoKSksXG4gICAgZGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdkYXRhJ10sIExpc3QoKSksXG4gICAgZWRpdERhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnZWRpdERhdGEnXSwgTWFwKCkpLFxuICAgIGNyZWF0ZURhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY3JlYXRlRGF0YSddLCBMaXN0KCkpLFxuICAgIGZpbHRlckRhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnZmlsdGVyRGF0YSddLCBNYXAoKSksXG4gICAgY2VsbE1lc3NhZ2VzOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NlbGxNZXNzYWdlcyddLCBNYXAoKSksXG4gICAgY3JlYXRlQ2VsbE1lc3NhZ2VzOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NyZWF0ZUNlbGxNZXNzYWdlcyddLCBNYXAoKSksXG4gICAgYWxsRGF0YVNpemU6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnYWxsRGF0YSddLCBMaXN0KCkpLnNpemUsXG4gICAgbGFuZ3VhZ2U6IFV0aWxzLmdldExhbmd1YWdlKEdSSUQsIHN0YXRlLnVzZXIpLFxuICAgIGRhdGVGb3JtYXQ6IFV0aWxzLmdldERhdGVGb3JtYXQoR1JJRCwgc3RhdGUudXNlciksXG4gICAgdGhvdXNhbmRTZXBhcmF0b3I6IFV0aWxzLmdldFRob3VzYW5kU2VwYXJhdG9yKEdSSUQsIHN0YXRlLnVzZXIpLFxuICAgIGRlY2ltYWxTZXBhcmF0b3I6IFV0aWxzLmdldERlY2ltYWxTZXBhcmF0b3IoR1JJRCwgc3RhdGUudXNlciksXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkYXRhZ3JpZEFjdGlvbnM7XG5cbkBpbmplY3RJbnRsXG5AY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcylcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGFHcmlkIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSBwcm9wVHlwZXM7XG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHsgY3VycmVudFJvdzogMCwgY3VycmVudENvbHVtbjogMCB9O1xuICAgIHRoaXMuY2VsbFJlZnMgPSB7fTtcbiAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsID0gZmFsc2U7XG4gICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTsgLy8gVE9ETzogSGFuZGxlIGZvY3VzaW5nIHdoZW4gdHJ1ZVxuICAgIHRoaXMuZm9jdXNUb0Vycm9yQ2VsbCA9IGZhbHNlOyAvLyBUT0RPOiBIYW5kbGUgZm9jdXNpbmcgd2hlbiB0cnVlXG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLnByb3BzLmludmFsaWRhdGUodGhpcy5wcm9wcy5ncmlkKTtcbiAgfVxuXG4gIG9uQ29sdW1uUmVzaXplRW5kQ2FsbGJhY2sgPSAobmV3Q29sdW1uV2lkdGgsIGNvbHVtbktleSkgPT4ge1xuICAgIHRoaXMucHJvcHMucmVzaXplQ29sdW1uKHRoaXMucHJvcHMuZ3JpZCwgY29sdW1uS2V5LCBuZXdDb2x1bW5XaWR0aCk7XG4gIH1cblxuICBvbkNyZWF0ZUNlbGxLZXlEb3duID0gKGUpID0+IHtcbiAgICBpZiAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuRU5URVIpIHtcbiAgICAgIHRoaXMucHJvcHMuYWRkTmV3SXRlbSh0aGlzLnByb3BzLmdyaWQsIFV0aWxzLmdldENvbHVtbkRlZmF1bHRWYWx1ZXModGhpcy5wcm9wcy5jb2x1bW5zKSk7XG4gICAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBvbkVkaXRDZWxsS2V5RG93biA9IChjb2wsIHJvd0luZGV4KSA9PiAoZSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZUFycm93TmF2aWdhdGlvbikge1xuICAgICAgY29uc3QgeyBjb2x1bW5zIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3Qgcm93c1NpemUgPSB0aGlzLnByb3BzLmRhdGEuc2l6ZTtcbiAgICAgIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2wpO1xuICAgICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuRE9XTjoge1xuICAgICAgICAgIGlmIChjb2wudmFsdWVUeXBlICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgY29uc3QgbmV4dEVsZW1lbnQgPSB0aGlzLmNlbGxSZWZzW2Ake3RoaXMucHJvcHMuZ3JpZC5pZH1fJHtjb2x1bW5LZXl9XyR7cm93SW5kZXggKyAxfWBdO1xuICAgICAgICAgICAgdGhpcy5tb3ZlQ2VsbEZvY3VzKG5leHRFbGVtZW50LCByb3dJbmRleCArIDEsIC0xKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuVVA6IHtcbiAgICAgICAgICBpZiAoY29sLnZhbHVlVHlwZSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGNvbnN0IG5leHRFbGVtZW50ID0gdGhpcy5jZWxsUmVmc1tgJHt0aGlzLnByb3BzLmdyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4IC0gMX1gXTtcbiAgICAgICAgICAgIHRoaXMubW92ZUNlbGxGb2N1cyhuZXh0RWxlbWVudCwgcm93SW5kZXggLSAxLCAtMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLlRBQjpcbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuUklHSFQ6XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLkxFRlQ6IHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgbGV0IGNvbHVtbkluZCA9IGNvbHVtbnMuZmluZEluZGV4KGMgPT4gYy52YWx1ZUtleVBhdGguam9pbigpID09PSBjb2x1bW5LZXkpO1xuICAgICAgICAgIGlmIChjb2x1bW5JbmQgIT09IC0xKSB7XG4gICAgICAgICAgICBsZXQgZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgbGV0IG5leHRFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIGxldCByb3dJbmQgPSByb3dJbmRleDtcbiAgICAgICAgICAgIHdoaWxlIChkaXNhYmxlZCkge1xuICAgICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuTEVGVCB8fCAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuVEFCICYmIGUuc2hpZnRLZXkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbHVtbkluZCAtIDEgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kIC09IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyb3dJbmQgLSAxID49IDApIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCA9IGNvbHVtbnMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAgIHJvd0luZCAtPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbHVtbkluZCArIDEgPCBjb2x1bW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kICs9IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyb3dJbmQgKyAxIDwgcm93c1NpemUpIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCA9IDA7XG4gICAgICAgICAgICAgICAgICByb3dJbmQgKz0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnN0IG5leHRDb2x1bW5LZXkgPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sdW1uc1tjb2x1bW5JbmRdKTtcbiAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSB0aGlzLmNlbGxSZWZzW2Ake3RoaXMucHJvcHMuZ3JpZC5pZH1fJHtuZXh0Q29sdW1uS2V5fV8ke3Jvd0luZH1gXTtcbiAgICAgICAgICAgICAgZGlzYWJsZWQgPSBuZXh0RWxlbWVudCA/IG5leHRFbGVtZW50LmRpc2FibGVkIDogZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWRpc2FibGVkICYmIG5leHRFbGVtZW50KSB7XG4gICAgICAgICAgICAgIHRoaXMubW92ZUNlbGxGb2N1cyhuZXh0RWxlbWVudCwgcm93SW5kLCBjb2x1bW5JbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uRmlsdGVyQ2VsbFZhbHVlQ2hhbmdlID0gKGNvbCwgdmFsdWVQYXJzZXIpID0+IChldmVudE9yRGF0YSkgPT4ge1xuICAgIGxldCByYXdWYWx1ZTtcbiAgICAvLyBldmVudE9yRGF0YSBjYW4gYmUgaW5wdXQgb25DaGFuZ2UgZXZlbnQsIHJlYWN0LXNlbGVjdCBvbkNoYW5nZSBvciByZWFjdC1kYXktcGlja2VyIG9uQ2hhbmdlXG4gICAgaWYgKGV2ZW50T3JEYXRhKSB7XG4gICAgICBpZiAoZXZlbnRPckRhdGEudGFyZ2V0ICE9PSB1bmRlZmluZWQpIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlO1xuICAgICAgZWxzZSBpZiAoZXZlbnRPckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkgcmF3VmFsdWUgPSBldmVudE9yRGF0YS52YWx1ZTtcbiAgICAgIGVsc2UgcmF3VmFsdWUgPSBldmVudE9yRGF0YTtcbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSB2YWx1ZVBhcnNlcihyYXdWYWx1ZSk7XG4gICAgdGhpcy5wcm9wcy5maWx0ZXJDZWxsVmFsdWVDaGFuZ2UoXG4gICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICB0aGlzLnByb3BzLmNvbHVtbnMsXG4gICAgICBjb2wsXG4gICAgICB2YWx1ZSxcbiAgICApO1xuICB9XG5cbiAgb25DcmVhdGVDZWxsVmFsdWVDaGFuZ2UgPSAocm93SW5kZXgsIGNvbCwgdmFsdWVQYXJzZXIpID0+IChldmVudE9yRGF0YSkgPT4ge1xuICAgIGxldCByYXdWYWx1ZTtcbiAgICAvLyBldmVudE9yRGF0YSBjYW4gYmUgaW5wdXQgb25DaGFuZ2UgZXZlbnQsIHJlYWN0LXNlbGVjdCBvbkNoYW5nZSBvciByZWFjdC1kYXktcGlja2VyIG9uQ2hhbmdlXG4gICAgaWYgKGV2ZW50T3JEYXRhKSB7XG4gICAgICBpZiAoZXZlbnRPckRhdGEudGFyZ2V0ICE9PSB1bmRlZmluZWQpIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlO1xuICAgICAgZWxzZSBpZiAoZXZlbnRPckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkgcmF3VmFsdWUgPSBldmVudE9yRGF0YS52YWx1ZTtcbiAgICAgIGVsc2UgcmF3VmFsdWUgPSBldmVudE9yRGF0YTtcbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSB2YWx1ZVBhcnNlcihyYXdWYWx1ZSk7XG4gICAgdGhpcy5wcm9wcy5jcmVhdGVDZWxsVmFsdWVDaGFuZ2UodGhpcy5wcm9wcy5ncmlkLCByb3dJbmRleCwgY29sLnZhbHVlS2V5UGF0aCwgdmFsdWUpO1xuICAgIGlmIChjb2wub25DcmVhdGVWYWx1ZUNoYW5nZSkge1xuICAgICAgY29sLm9uQ3JlYXRlVmFsdWVDaGFuZ2UodmFsdWUsIGNvbC52YWx1ZUtleVBhdGgsIHJvd0luZGV4KTtcbiAgICB9XG4gICAgaWYgKGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZSAmJiB2YWx1ZSA9PT0gY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm1hdGNoVmFsdWUpIHtcbiAgICAgIC8vIENhbGwgc3BlY2lhbCBwYWlyZWQgdmFsdWUgY2hhbmdlIG9uIG90aGVyIGNlbGwgaWYgdmFsdWUgbWF0Y2hlc1xuICAgICAgdGhpcy5vbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZShcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIHsgdmFsdWVLZXlQYXRoOiBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWVLZXlQYXRoIH0sXG4gICAgICAgIHYgPT4gdixcbiAgICAgICkoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm5ld1ZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNvbC52YWxpZGF0b3JzKSB7XG4gICAgICB0aGlzLnByb3BzLmNyZWF0ZUNlbGxWYWx1ZVZhbGlkYXRlKFxuICAgICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICBjb2wudmFsdWVLZXlQYXRoLFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgY29sLnZhbGlkYXRvcnMsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIG9uRWRpdENlbGxWYWx1ZUNoYW5nZSA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGV2ZW50T3JEYXRhKSA9PiB7XG4gICAgY29uc3QgZGF0YUlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICBsZXQgcmF3VmFsdWU7XG4gICAgLy8gZXZlbnRPckRhdGEgY2FuIGJlIGlucHV0IG9uQ2hhbmdlIGV2ZW50LCByZWFjdC1zZWxlY3Qgb25DaGFuZ2Ugb3IgcmVhY3QtZGF5LXBpY2tlciBvbkNoYW5nZVxuICAgIGlmIChldmVudE9yRGF0YSkge1xuICAgICAgaWYgKGV2ZW50T3JEYXRhLnRhcmdldCAhPT0gdW5kZWZpbmVkKSByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZTtcbiAgICAgIGVsc2UgaWYgKGV2ZW50T3JEYXRhLnZhbHVlICE9PSB1bmRlZmluZWQpIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudmFsdWU7XG4gICAgICBlbHNlIHJhd1ZhbHVlID0gZXZlbnRPckRhdGE7XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlID0gdmFsdWVQYXJzZXIocmF3VmFsdWUpO1xuICAgIHRoaXMucHJvcHMuZWRpdENlbGxWYWx1ZUNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIGRhdGFJZCwgY29sLnZhbHVlS2V5UGF0aCwgdmFsdWUpO1xuICAgIGlmIChjb2wub25FZGl0VmFsdWVDaGFuZ2UpIHtcbiAgICAgIGNvbC5vbkVkaXRWYWx1ZUNoYW5nZSh2YWx1ZSwgY29sLnZhbHVlS2V5UGF0aCwgcm93SW5kZXgsIGRhdGFJZCk7XG4gICAgfVxuICAgIGlmIChjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUgJiYgdmFsdWUgPT09IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5tYXRjaFZhbHVlKSB7XG4gICAgICAvLyBDYWxsIHNwZWNpYWwgcGFpcmVkIHZhbHVlIGNoYW5nZSBvbiBvdGhlciBjZWxsIGlmIHZhbHVlIG1hdGNoZXNcbiAgICAgIHRoaXMub25FZGl0Q2VsbFZhbHVlQ2hhbmdlKFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgeyB2YWx1ZUtleVBhdGg6IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5uZXdWYWx1ZUtleVBhdGggfSxcbiAgICAgICAgdiA9PiB2LFxuICAgICAgKShjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY29sLnZhbGlkYXRvcnMpIHtcbiAgICAgIHRoaXMucHJvcHMuZWRpdENlbGxWYWx1ZVZhbGlkYXRlKFxuICAgICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICAgIGRhdGFJZCxcbiAgICAgICAgY29sLnZhbHVlS2V5UGF0aCxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIGNvbC52YWxpZGF0b3JzLFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBvbkNyZWF0ZUNlbGxCbHVyID0gKHJvd0luZGV4LCBjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZSkgPT4ge1xuICAgIGlmIChjb2wub25DcmVhdGVCbHVyKSB7XG4gICAgICBsZXQgdmFsdWUgPSAoZSAmJiBlLnRhcmdldCAmJiBlLnRhcmdldC52YWx1ZSAhPT0gdW5kZWZpbmVkKSA/XG4gICAgICAgIGUudGFyZ2V0LnZhbHVlIDpcbiAgICAgICAgdGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpO1xuICAgICAgaWYgKHZhbHVlUGFyc2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZVBhcnNlcih2YWx1ZSk7XG4gICAgICB9XG4gICAgICBjb2wub25DcmVhdGVCbHVyKHZhbHVlLCByb3dJbmRleCk7XG4gICAgfVxuICB9XG5cbiAgb25FZGl0Q2VsbEJsdXIgPSAocm93SW5kZXgsIGNvbCwgdmFsdWVQYXJzZXIpID0+IChlKSA9PiB7XG4gICAgaWYgKGNvbC5vbkVkaXRCbHVyKSB7XG4gICAgICBsZXQgdmFsdWUgPSAoZSAmJiBlLnRhcmdldCAmJiBlLnRhcmdldC52YWx1ZSAhPT0gdW5kZWZpbmVkKSA/XG4gICAgICAgIGUudGFyZ2V0LnZhbHVlIDpcbiAgICAgICAgdGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpO1xuICAgICAgaWYgKHZhbHVlUGFyc2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZVBhcnNlcih2YWx1ZSk7XG4gICAgICB9XG4gICAgICBjb25zdCBkYXRhSWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgICAgY29sLm9uRWRpdEJsdXIodmFsdWUsIHJvd0luZGV4LCBkYXRhSWQpO1xuICAgIH1cbiAgfVxuXG4gIG9uQ2VsbEZvY3VzID0gKGNlbGxUeXBlLCBpbnB1dFR5cGUsIHJvd0luZGV4LCBjb2x1bW5LZXkpID0+IChlKSA9PiB7XG4gICAgaWYgKGlucHV0VHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIGUudGFyZ2V0LnNlbGVjdCgpO1xuICAgIH1cbiAgICBpZiAoY2VsbFR5cGUgPT09ICdlZGl0JyAmJiB0aGlzLnByb3BzLmNlbGxTZWxlY3QpIHtcbiAgICAgIHRoaXMucHJvcHMuY2VsbFNlbGVjdGlvbkNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIE1hcCh7IHJvd0luZGV4LCBjb2x1bW5LZXkgfSkpO1xuICAgIH1cbiAgfVxuXG4gIGdldERhdGFJZEJ5Um93SW5kZXggPSByb3dJbmRleCA9PlxuICAgIHRoaXMucHJvcHMuZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLnRoaXMucHJvcHMuZ3JpZC5pZEtleVBhdGhdKTtcblxuICBnZXRTZWxlY3RlZEl0ZW1JbmRleCA9IChpZCkgPT4ge1xuICAgIGlmICghaWQpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnByb3BzLmRhdGEuZmluZEluZGV4KHYgPT4gdi5nZXRJbih0aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoKSA9PT0gaWQpO1xuICAgIHJldHVybiBpbmRleCA9PT0gLTEgPyB1bmRlZmluZWQgOiBpbmRleDtcbiAgfVxuXG4gIGdldEVkaXRJdGVtVmFsdWUgPSAocm93SW5kZXgsIGNvbCkgPT4ge1xuICAgIC8vIEdldCB0aGUgdmFsdWUgdG8gZGlzcGxheSBpbiBlZGl0IGNlbGxcbiAgICBjb25zdCBpZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgY29uc3QgZWRpdFZhbHVlID0gdGhpcy5wcm9wcy5lZGl0RGF0YS5nZXRJbihbaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdLCB1bmRlZmluZWQpO1xuICAgIGxldCBvcmlnaW5hbFZhbHVlO1xuICAgIGlmIChlZGl0VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgb3JpZ2luYWxWYWx1ZSA9IHRoaXMucHJvcHMuZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdLCAnJyk7XG4gICAgfSBlbHNlIGlmIChlZGl0VmFsdWUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGVkaXRWYWx1ZTtcbiAgICB9XG4gICAgaWYgKG9yaWdpbmFsVmFsdWUgPT09IG51bGwgfHwgb3JpZ2luYWxWYWx1ZSA9PT0gdW5kZWZpbmVkIHx8IG9yaWdpbmFsVmFsdWUgPT09ICcnKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIC8vIFNwZWNpYWwgZm9ybWF0dGluZyBieSBjb21wb25lbnQgdHlwZVxuICAgIGlmIChcbiAgICAgIGNvbC5jb21wb25lbnRUeXBlID09PSAnZmxvYXQnICYmXG4gICAgICBTdHJpbmcob3JpZ2luYWxWYWx1ZSkubGVuZ3RoID4gMFxuICAgICkge1xuICAgICAgcmV0dXJuIFN0cmluZyhvcmlnaW5hbFZhbHVlKS5yZXBsYWNlKCcuJywgdGhpcy5wcm9wcy5kZWNpbWFsU2VwYXJhdG9yKTtcbiAgICB9XG4gICAgcmV0dXJuIG9yaWdpbmFsVmFsdWU7XG4gIH1cblxuICBnZXRDcmVhdGVJdGVtVmFsdWUgPSAocm93SW5kZXgsIGNvbCkgPT4ge1xuICAgIGNvbnN0IHZhbCA9IHRoaXMucHJvcHMuY3JlYXRlRGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdLCAnJyk7XG4gICAgaWYgKHZhbCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gdmFsO1xuICB9XG5cbiAgZ2V0RmlsdGVySXRlbVZhbHVlID0gKGNvbCkgPT4ge1xuICAgIGNvbnN0IHZhbCA9IHRoaXMucHJvcHMuZmlsdGVyRGF0YS5nZXQoVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCksICcnKTtcbiAgICBpZiAodmFsID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHJldHVybiB2YWw7XG4gIH1cblxuICBnZXRDb21wb25lbnREaXNhYmxlZFN0YXRlID0gKHJvd0luZGV4LCBjb2wsIG1vZGUpID0+IHtcbiAgICBsZXQgY29tcG9uZW50RGlzYWJsZWQgPSAhIWNvbC5kaXNhYmxlRWRpdGluZztcbiAgICAvLyBjaGVjayBpZiBjb21wb25lbnQgaXMgZGlzYWJsZWQgYnkgb3RoZXIgY29sdW1uIGRhdGFcbiAgICBpZiAoIWNvbXBvbmVudERpc2FibGVkICYmIGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaCkge1xuICAgICAgaWYgKG1vZGUgPT09ICdjcmVhdGUnKSB7XG4gICAgICAgIGNvbXBvbmVudERpc2FibGVkID0gdGhpcy5nZXRDcmVhdGVJdGVtVmFsdWUoXG4gICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgeyB2YWx1ZUtleVBhdGg6IGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaC5tYXRjaFZhbHVlS2V5UGF0aCB9LFxuICAgICAgICApID09PSBjb2wuZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2gubWF0Y2hWYWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbXBvbmVudERpc2FibGVkID0gdGhpcy5nZXRFZGl0SXRlbVZhbHVlKFxuICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgIHsgdmFsdWVLZXlQYXRoOiBjb2wuZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2gubWF0Y2hWYWx1ZUtleVBhdGggfSxcbiAgICAgICAgKSA9PT0gY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb21wb25lbnREaXNhYmxlZDtcbiAgfVxuXG4gIGdldFJvd0NsYXNzTmFtZSA9IChyb3dJbmRleCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGdyaWQsXG4gICAgICBpc0NyZWF0aW5nLFxuICAgICAgaXNFZGl0aW5nLFxuICAgICAgY3JlYXRlRGF0YSxcbiAgICAgIHNlbGVjdGVkSXRlbXMsXG4gICAgICBkYXRhLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHJvd0NsYXNzTmFtZXMgPSBbJ29jLWRhdGFncmlkLXJvdyddO1xuICAgIGxldCBleHRyYVJvd0NvdW50ID0gMDsgLy8gaG93IG1hbnkgcm93cyB0byBpZ25vcmUgZnJvbSB0b3AsIG5ldyArIGZpbHRlciByb3dzXG4gICAgaWYgKGlzQ3JlYXRpbmcpIGV4dHJhUm93Q291bnQgPSBjcmVhdGVEYXRhLnNpemU7XG4gICAgaWYgKGlzQ3JlYXRpbmcpIHtcbiAgICAgIGlmIChyb3dJbmRleCA8PSAoZXh0cmFSb3dDb3VudCAtIDEpKSB7XG4gICAgICAgIHJvd0NsYXNzTmFtZXMucHVzaCgnb2MtZGF0YWdyaWQtcm93LW5ldycpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNFZGl0aW5nKSB7XG4gICAgICByb3dDbGFzc05hbWVzLnB1c2goJ29jLWRhdGFncmlkLXJvdy1lZGl0Jyk7XG4gICAgfVxuXG5cbiAgICAvLyBjaGVjayBpZiByb3cgaXMgc2VsZWN0ZWRcbiAgICBpZiAoKCFpc0NyZWF0aW5nICYmICFpc0VkaXRpbmcpICYmXG4gICAgICAoc2VsZWN0ZWRJdGVtcyAmJiBncmlkLmlkS2V5UGF0aCkpIHtcbiAgICAgIGlmIChcbiAgICAgICAgc2VsZWN0ZWRJdGVtcy5pbmRleE9mKGRhdGEuZ2V0SW4oW3Jvd0luZGV4IC0gZXh0cmFSb3dDb3VudCwgLi4uZ3JpZC5pZEtleVBhdGhdKSkgIT09IC0xXG4gICAgICApIHtcbiAgICAgICAgcm93Q2xhc3NOYW1lcy5wdXNoKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLnJvd0NsYXNzTmFtZUdldHRlcikge1xuICAgICAgcmV0dXJuIHJvd0NsYXNzTmFtZXMuam9pbignICcpICsgJyAnICsgdGhpcy5wcm9wcy5yb3dDbGFzc05hbWVHZXR0ZXIocm93SW5kZXgpO1xuICAgIH1cbiAgICByZXR1cm4gcm93Q2xhc3NOYW1lcy5qb2luKCcgJyk7XG4gIH1cblxuICBnZXRDZWxsTWVzc2FnZXMgPSAocm93SW5kZXgsIGNvbCwgY2VsbFR5cGUpID0+IHtcbiAgICBjb25zdCByZXR1cm5EYXRhID0ge307XG4gICAgaWYgKCF0aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoIHx8ICFjb2wudmFsdWVLZXlQYXRoKSB7XG4gICAgICByZXR1cm4gcmV0dXJuRGF0YTtcbiAgICB9XG4gICAgbGV0IGluZm9NZXNzYWdlO1xuICAgIGxldCBlcnJvck1lc3NhZ2U7XG4gICAgbGV0IHdhcm5pbmdNZXNzYWdlO1xuICAgIGlmIChjZWxsVHlwZSA9PT0gJ2NyZWF0ZScpIHtcbiAgICAgIGluZm9NZXNzYWdlID0gdGhpcy5wcm9wcy5jcmVhdGVDZWxsTWVzc2FnZXMuZ2V0SW4oWydpbmZvJywgcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgIGVycm9yTWVzc2FnZSA9IHRoaXMucHJvcHMuY3JlYXRlQ2VsbE1lc3NhZ2VzLmdldEluKFsnZXJyb3InLCByb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgd2FybmluZ01lc3NhZ2UgPSB0aGlzLnByb3BzLmNyZWF0ZUNlbGxNZXNzYWdlcy5nZXRJbihbJ3dhcm5pbmcnLCByb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgICBpbmZvTWVzc2FnZSA9IHRoaXMucHJvcHMuY2VsbE1lc3NhZ2VzLmdldEluKFsnaW5mbycsIGlkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgICBlcnJvck1lc3NhZ2UgPSB0aGlzLnByb3BzLmNlbGxNZXNzYWdlcy5nZXRJbihbJ2Vycm9yJywgaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgIHdhcm5pbmdNZXNzYWdlID0gdGhpcy5wcm9wcy5jZWxsTWVzc2FnZXMuZ2V0SW4oWyd3YXJuaW5nJywgaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICB9XG4gICAgaWYgKGluZm9NZXNzYWdlKSB7XG4gICAgICByZXR1cm5EYXRhLmluZm9NZXNzYWdlID0gaW5mb01lc3NhZ2U7XG4gICAgfVxuICAgIGlmIChlcnJvck1lc3NhZ2UpIHtcbiAgICAgIHJldHVybkRhdGEuZXJyb3JNZXNzYWdlID0gZXJyb3JNZXNzYWdlO1xuICAgIH1cbiAgICBpZiAod2FybmluZ01lc3NhZ2UpIHtcbiAgICAgIHJldHVybkRhdGEud2FybmluZ01lc3NhZ2UgPSB3YXJuaW5nTWVzc2FnZTtcbiAgICB9XG4gICAgcmV0dXJuIHJldHVybkRhdGE7XG4gIH1cblxuICBnZXRTY3JvbGxUb1JvdyA9ICgpID0+IHtcbiAgICBsZXQgc2Nyb2xsVG9Sb3c7XG4gICAgaWYgKHRoaXMucHJvcHMuaXNDcmVhdGluZyAmJiAhdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCkgcmV0dXJuIHNjcm9sbFRvUm93O1xuICAgIGlmICh0aGlzLmZvY3VzVG9DcmVhdGVDZWxsKSB7XG4gICAgICBjb25zdCBzY3JvbGxOZXdSb3cgPSB0aGlzLnByb3BzLmNyZWF0ZURhdGEuc2l6ZSAtIDE7XG4gICAgICBpZiAoc2Nyb2xsTmV3Um93ID49IDApIHtcbiAgICAgICAgc2Nyb2xsVG9Sb3cgPSBzY3JvbGxOZXdSb3c7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLmlzRWRpdGluZykge1xuICAgICAgICBzY3JvbGxUb1JvdyA9IHRoaXMuc3RhdGUuY3VycmVudFJvdztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gdGhpcy5wcm9wcy5zY3JvbGxUb1JvdzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgfVxuICAgICAgaWYgKHNjcm9sbFRvUm93ID09PSB1bmRlZmluZWQgJiYgdGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLnNpemUgPiAwKSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gdGhpcy5nZXRTZWxlY3RlZEl0ZW1JbmRleCh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuZmlyc3QoKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzY3JvbGxUb1JvdztcbiAgfVxuXG4gIGhhbmRsZUNlbGxTZWxlY3QgPSAoY2VsbFR5cGUsIHJvd0luZGV4LCBjb2x1bW5LZXkpID0+ICgpID0+IHtcbiAgICBpZiAoY2VsbFR5cGUgPT09ICd2aWV3JyAmJiB0aGlzLnByb3BzLmNlbGxTZWxlY3QpIHtcbiAgICAgIHRoaXMucHJvcHMuY2VsbFNlbGVjdGlvbkNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIE1hcCh7IHJvd0luZGV4LCBjb2x1bW5LZXkgfSkpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUNyZWF0ZUNlbGxSZWYgPSAocm93SW5kZXgsIGNvbCkgPT4gKHJlZikgPT4ge1xuICAgIC8vIEZvY3VzIHRvIGNyZWF0ZSBjZWxsXG4gICAgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5jcmVhdGVEYXRhLnNpemUgJiZcbiAgICAgIHRoaXMucHJvcHMuY3JlYXRlRGF0YS5zaXplID09PSByb3dJbmRleCArIDEgJiZcbiAgICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgJiZcbiAgICAgICF0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2NyZWF0ZScpXG4gICAgKSB7XG4gICAgICByZWYuZm9jdXMoKTtcbiAgICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVFZGl0Q2VsbFJlZiA9IChyb3dJbmRleCwgY29sKSA9PiAocmVmKSA9PiB7XG4gICAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCk7XG4gICAgaWYgKHRoaXMuZm9jdXNUb0VkaXRDZWxsICYmICF0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2VkaXQnKSkge1xuICAgICAgY29uc3Qgc2VsZWN0ZWRSb3dJbmRleCA9IHRoaXMuZ2V0U2VsZWN0ZWRJdGVtSW5kZXgodGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLmZpcnN0KCkpO1xuICAgICAgY29uc3QgeyBzZWxlY3RlZENlbGwgfSA9IHRoaXMucHJvcHM7XG4gICAgICBpZiAoc2VsZWN0ZWRDZWxsLnNpemUgPiAwKSB7XG4gICAgICAgIGlmIChzZWxlY3RlZENlbGwuZ2V0KCdyb3dJbmRleCcpID09PSByb3dJbmRleCAmJiBzZWxlY3RlZENlbGwuZ2V0KCdjb2x1bW5LZXknKSA9PT0gY29sdW1uS2V5KSB7XG4gICAgICAgICAgcmVmLmZvY3VzKCk7XG4gICAgICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzZWxlY3RlZFJvd0luZGV4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWRSb3dJbmRleCA9PT0gcm93SW5kZXgpIHtcbiAgICAgICAgcmVmLmZvY3VzKCk7XG4gICAgICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZUFycm93TmF2aWdhdGlvbikge1xuICAgICAgdGhpcy5jZWxsUmVmc1tgJHt0aGlzLnByb3BzLmdyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4fWBdID0gcmVmO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVDZWxsRm9jdXMgPSAobmV4dEVsZW1lbnQsIHJvd0luZGV4LCBjb2x1bW5JbmRleCkgPT4ge1xuICAgIGlmIChuZXh0RWxlbWVudCAmJiAobmV4dEVsZW1lbnQudHlwZSA9PT0gJ3RleHQnIHx8IG5leHRFbGVtZW50LnR5cGUgPT09ICdudW1iZXInKSkge1xuICAgICAgaWYgKHJvd0luZGV4ICE9PSAtMSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgY3VycmVudFJvdzogcm93SW5kZXggfSk7XG4gICAgICB9XG4gICAgICBpZiAoY29sdW1uSW5kZXggIT09IC0xKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjdXJyZW50Q29sdW1uOiBjb2x1bW5JbmRleCB9KTtcbiAgICAgIH1cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gbmV4dEVsZW1lbnQuc2VsZWN0KCksIDUwKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVTZWxlY3Rpb25DaGVja0JveE9uQ2hhbmdlID0gcm93SW5kZXggPT4gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMuaXRlbVNlbGVjdGlvbkNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIHJvd0luZGV4LCB0cnVlLCBmYWxzZSk7XG4gIH1cblxuICBnZW5lcmF0ZUNvbHVtbnMgPSAoKSA9PiB7XG4gICAgY29uc3QgY29sdW1ucyA9IFtdO1xuICAgIGNvbnN0IHRhYkluZGV4ID0gU3RyaW5nKHRoaXMucHJvcHMudGFiSW5kZXgpO1xuICAgIGlmICh0aGlzLnByb3BzLnJvd1NlbGVjdENoZWNrYm94Q29sdW1uKSB7XG4gICAgICBjb2x1bW5zLnB1c2goe1xuICAgICAgICB3aWR0aDogNDAsXG4gICAgICAgIGlzUmVzaXphYmxlOiBmYWxzZSxcbiAgICAgICAgY29sdW1uS2V5OiAnc2VsZWN0aW9uQ2hlY2tib3gnLFxuICAgICAgICBjZWxsOiAocm93SW5kZXgpID0+IHtcbiAgICAgICAgICBjb25zdCByb3dJdGVtID0gdGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCk7XG4gICAgICAgICAgY29uc3QgaXRlbUlkID0gcm93SXRlbS5nZXRJbih0aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoKTtcbiAgICAgICAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhpdGVtSWQpO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwib2Mtcm93LXNlbGVjdC1jaGVja2JveFwiXG4gICAgICAgICAgICAgIGNoZWNrZWQ9e3NlbGVjdGVkfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVTZWxlY3Rpb25DaGVja0JveE9uQ2hhbmdlKHJvd0luZGV4KX1cbiAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICBjZWxsRWRpdDogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbENyZWF0ZTogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbEZpbHRlcjogKCkgPT4gbnVsbCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHZpc2libGVDb2x1bW5zID0gW107XG4gICAgdGhpcy5wcm9wcy52aXNpYmxlQ29sdW1ucy5mb3JFYWNoKCh2aXNpYmxlQ29sdW1uS2V5KSA9PiB7XG4gICAgICB0aGlzLnByb3BzLmNvbHVtbnMuZm9yRWFjaCgob3JnQ29sKSA9PiB7XG4gICAgICAgIGlmIChVdGlscy5nZXRDb2x1bW5LZXkob3JnQ29sKSA9PT0gdmlzaWJsZUNvbHVtbktleSkge1xuICAgICAgICAgIHZpc2libGVDb2x1bW5zLnB1c2gob3JnQ29sKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgdmlzaWJsZUNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICBjb25zdCBjb2x1bW4gPSB7XG4gICAgICAgIGhlYWRlcjogY29sLmhlYWRlcixcbiAgICAgICAgY29sdW1uS2V5OiBVdGlscy5nZXRDb2x1bW5LZXkoY29sKSxcbiAgICAgICAgd2lkdGg6IChjb2wud2lkdGggfHwgY29sLndpZHRoID09PSAwID8gY29sLndpZHRoIDogMjAwKSxcbiAgICAgICAgbWluV2lkdGg6IChjb2wubWluV2lkdGggfHwgY29sLm1pbldpZHRoID09PSAwID8gY29sLm1pbldpZHRoIDogNDApLFxuICAgICAgICBtYXhXaWR0aDogY29sLm1heFdpZHRoLFxuICAgICAgICBpc1Jlc2l6YWJsZTogIWNvbC5kaXNhYmxlUmVzaXppbmcsXG4gICAgICAgIGZpeGVkOiAhIWNvbC5maXhlZCxcbiAgICAgICAgYWxsb3dDZWxsc1JlY3ljbGluZzogISFjb2wuYWxsb3dDZWxsc1JlY3ljbGluZyxcbiAgICAgICAgZGlzYWJsZVNvcnRpbmc6ICEhY29sLmRpc2FibGVTb3J0aW5nLFxuICAgICAgICBpc1JlcXVpcmVkOiAhIWNvbC5pc1JlcXVpcmVkLFxuICAgICAgICBjb21wb25lbnRUeXBlOiBjb2wuY29tcG9uZW50VHlwZSxcbiAgICAgICAgc3R5bGU6IFV0aWxzLmdldENlbGxTdHlsZUJ5Q29sKGNvbCksXG4gICAgICB9O1xuICAgICAgaWYgKGNvbC52YWx1ZUtleVBhdGgpIHtcbiAgICAgICAgY29sdW1uLnZhbHVlS2V5UGF0aCA9IGNvbC52YWx1ZUtleVBhdGg7XG4gICAgICB9XG4gICAgICBpZiAoY29sLmZsZXhHcm93KSB7XG4gICAgICAgIGNvbHVtbi5mbGV4R3JvdyA9IGNvbC5mbGV4R3JvdztcbiAgICAgIH1cbiAgICAgIGlmIChjb2wudmFsdWVUeXBlKSB7XG4gICAgICAgIGNvbHVtbi52YWx1ZVR5cGUgPSBjb2wudmFsdWVUeXBlO1xuICAgICAgfVxuICAgICAgaWYgKGNvbC5zb3J0Q29tcGFyYXRvcikge1xuICAgICAgICBjb2x1bW4uc29ydENvbXBhcmF0b3IgPSBjb2wuc29ydENvbXBhcmF0b3I7XG4gICAgICB9XG4gICAgICBpZiAoY29sLnNvcnRWYWx1ZUdldHRlcikge1xuICAgICAgICBjb2x1bW4uc29ydFZhbHVlR2V0dGVyID0gY29sLnNvcnRWYWx1ZUdldHRlcjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHZhbHVlRW1wdHlDaGVja2VyID0gVXRpbHMuZ2V0VmFsdWVFbXB0eUNoZWNrZXIoY29sKTtcbiAgICAgIC8vIENlbGwgdmFsdWUgcmVuZGVyaW5nXG4gICAgICBjb25zdCB2YWx1ZVJlbmRlciA9IChyb3dJbmRleCwgZm9ybWF0KSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbCA9IHRoaXMucHJvcHMuZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbCkpIHtcbiAgICAgICAgICByZXR1cm4gY29sLmlzUmVxdWlyZWQgPyA8TSBpZD1cIkdyaWQuVmFsdWVJc01pc3NpbmdcIiAvPiA6ICcnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3JtYXQgPyBmb3JtYXQodmFsKSA6IHZhbDtcbiAgICAgIH07XG5cbiAgICAgIGlmIChjb2wuY2VsbCkge1xuICAgICAgICBjb2x1bW4uY2VsbCA9IGNvbC5jZWxsO1xuICAgICAgfSBlbHNlIGlmIChjb2wudmFsdWVSZW5kZXIpIHtcbiAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBjb2wudmFsdWVSZW5kZXIodGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3dpdGNoIChjb2wudmFsdWVUeXBlKSB7XG4gICAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICBjYXNlICdmbG9hdCc6XG4gICAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+XG4gICAgICAgICAgICAgIHZhbHVlUmVuZGVyKHJvd0luZGV4LCB2ID0+IDxOIHZhbHVlPXt2fSB7Li4uY29sLnJlbmRlckNvbXBvbmVudFByb3BzfSAvPik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT5cbiAgICAgICAgICAgICAgdmFsdWVSZW5kZXIocm93SW5kZXgsICh2KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG1vbWVudCh2LCB0aGlzLnByb3BzLmRhdGVGb3JtYXQsIHRydWUpLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vbWVudC51dGModiwgdGhpcy5wcm9wcy5kYXRlRm9ybWF0KS5mb3JtYXQodGhpcy5wcm9wcy5kYXRlRm9ybWF0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG1vbWVudCh2KS5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBtb21lbnQudXRjKHYpLmZvcm1hdCh0aGlzLnByb3BzLmRhdGVGb3JtYXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gPE0gaWQ9XCJHcmlkLkludmFsaWREYXRlXCIgLz47XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+XG4gICAgICAgICAgICAgIHZhbHVlUmVuZGVyKHJvd0luZGV4LCB2ID0+XG4gICAgICAgICAgICAgICAgPE0gaWQ9e3YgPyAnR3JpZC5ZZXMnIDogJ0dyaWQuTm8nfSB7Li4uY29sLnJlbmRlckNvbXBvbmVudFByb3BzfSAvPik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiB2YWx1ZVJlbmRlcihyb3dJbmRleCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIENlbGwgZWRpdC9jcmVhdGUvZmlsdGVyIGNvbXBvbmVudCByZW5kZXJpbmdcbiAgICAgIGlmIChjb2wuY2VsbEVkaXQpIHtcbiAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gY29sLmNlbGxFZGl0O1xuICAgICAgfSBlbHNlIGlmIChjb2wuZWRpdFZhbHVlUmVuZGVyKSB7XG4gICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IGNvbC5lZGl0VmFsdWVSZW5kZXIodGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCkpO1xuICAgICAgfVxuICAgICAgaWYgKGNvbC5jZWxsQ3JlYXRlKSB7XG4gICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gY29sLmNlbGxDcmVhdGU7XG4gICAgICB9IGVsc2UgaWYgKGNvbC5jcmVhdGVWYWx1ZVJlbmRlcikge1xuICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IGNvbC5jcmVhdGVWYWx1ZVJlbmRlcih0aGlzLnByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSk7XG4gICAgICB9XG4gICAgICBpZiAoY29sLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSBjb2wuY2VsbEZpbHRlcjtcbiAgICAgIH0gZWxzZSBpZiAoY29sLmZpbHRlclZhbHVlUmVuZGVyKSB7XG4gICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gcm93SW5kZXggPT4gY29sLmZpbHRlclZhbHVlUmVuZGVyKHRoaXMucHJvcHMuZGF0YS5nZXQocm93SW5kZXgpKTtcbiAgICAgIH1cbiAgICAgIGlmIChjb2wuY29tcG9uZW50VHlwZSkge1xuICAgICAgICBsZXQgZWRpdFZhbHVlUGFyc2VyID0gdmFsID0+IHZhbDtcbiAgICAgICAgc3dpdGNoIChjb2wuY29tcG9uZW50VHlwZSkge1xuICAgICAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgICAgICAgLy8gVE9ETyBSRUZBQ1RPUiBUTyBGVU5DVElPTlxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5saW5lRWRpdCkge1xuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IChcbiAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uRWRpdENlbGxWYWx1ZUNoYW5nZShyb3dJbmRleCwgY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMub25FZGl0Q2VsbEJsdXIocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMub25DZWxsRm9jdXMoJ2VkaXQnLCBjb2wuY29tcG9uZW50VHlwZSwgcm93SW5kZXgsIGNvbHVtbi5jb2x1bW5LZXkpfVxuICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMub25FZGl0Q2VsbEtleURvd24oY29sLCByb3dJbmRleCl9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UmVmPXt0aGlzLmhhbmRsZUVkaXRDZWxsUmVmKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRFZGl0SW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX0tJHtyb3dJbmRleH1gfVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmVkaXRDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnZWRpdCcpfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17Y29sdW1uLnN0eWxlfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gKFxuICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0Q3JlYXRlSXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZShyb3dJbmRleCwgY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMub25DcmVhdGVDZWxsQmx1cihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLm9uQ3JlYXRlQ2VsbEtleURvd259XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UmVmPXt0aGlzLmhhbmRsZUNyZWF0ZUNlbGxSZWYocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZENyZWF0ZUlucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5jcmVhdGVDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnY3JlYXRlJyl9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXtjb2x1bW4uc3R5bGV9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuZmlsdGVyaW5nKSB7XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IChcbiAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldEZpbHRlckl0ZW1WYWx1ZShjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkZpbHRlckNlbGxWYWx1ZUNoYW5nZShjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZEZpbHRlcklucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9YH1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5maWx0ZXJDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e2NvbHVtbi5zdHlsZX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5saW5lRWRpdCkge1xuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IChcbiAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25FZGl0Q2VsbFZhbHVlQ2hhbmdlKHJvd0luZGV4LCBjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5vbkVkaXRDZWxsQmx1cihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5vbkNlbGxGb2N1cygnZWRpdCcsIGNvbC5jb21wb25lbnRUeXBlLCByb3dJbmRleCwgY29sdW1uLmNvbHVtbktleSl9XG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5vbkVkaXRDZWxsS2V5RG93bihjb2wsIHJvd0luZGV4KX1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRSZWY9e3RoaXMuaGFuZGxlRWRpdENlbGxSZWYocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZEVkaXRJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fS0ke3Jvd0luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuZWRpdENvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdlZGl0Jyl9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXtjb2x1bW4uc3R5bGV9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiAoXG4gICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldENyZWF0ZUl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DcmVhdGVDZWxsVmFsdWVDaGFuZ2Uocm93SW5kZXgsIGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLm9uQ3JlYXRlQ2VsbEJsdXIocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMub25DZWxsRm9jdXMoJ2NyZWF0ZScsICdudW1iZXInLCByb3dJbmRleCwgY29sdW1uLmNvbHVtbktleSl9XG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5vbkNyZWF0ZUNlbGxLZXlEb3dufVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFJlZj17dGhpcy5oYW5kbGVDcmVhdGVDZWxsUmVmKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRDcmVhdGVJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fS0ke3Jvd0luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuY3JlYXRlQ29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2NyZWF0ZScpfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17Y29sdW1uLnN0eWxlfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmZpbHRlcmluZykge1xuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldEZpbHRlckl0ZW1WYWx1ZShjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkZpbHRlckNlbGxWYWx1ZUNoYW5nZShjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZEZpbHRlcklucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9YH1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5maWx0ZXJDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e2NvbHVtbi5zdHlsZX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdmbG9hdCc6XG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIgPSB2YWwgPT5cbiAgICAgICAgICAgICAgdmFsLnJlcGxhY2UobmV3IFJlZ0V4cChgW15cXFxcZCR7dGhpcy5wcm9wcy5kZWNpbWFsU2VwYXJhdG9yfSstXWAsICdnJyksICcnKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmlubGluZUVkaXQpIHtcbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiAoXG4gICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkVkaXRDZWxsVmFsdWVDaGFuZ2Uocm93SW5kZXgsIGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLm9uRWRpdENlbGxCbHVyKHJvd0luZGV4LCBjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMub25DZWxsRm9jdXMoJ2VkaXQnLCBjb2wuY29tcG9uZW50VHlwZSwgcm93SW5kZXgsIGNvbHVtbi5jb2x1bW5LZXkpfVxuICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMub25FZGl0Q2VsbEtleURvd24oY29sLCByb3dJbmRleCl9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UmVmPXt0aGlzLmhhbmRsZUVkaXRDZWxsUmVmKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRFZGl0SW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX0tJHtyb3dJbmRleH1gfVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmVkaXRDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnZWRpdCcpfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17Y29sdW1uLnN0eWxlfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gKFxuICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0Q3JlYXRlSXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZShyb3dJbmRleCwgY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMub25DcmVhdGVDZWxsQmx1cihyb3dJbmRleCwgY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMub25DcmVhdGVDZWxsS2V5RG93bn1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRSZWY9e3RoaXMuaGFuZGxlQ3JlYXRlQ2VsbFJlZihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkQ3JlYXRlSW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX0tJHtyb3dJbmRleH1gfVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmNyZWF0ZUNvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdjcmVhdGUnKX1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e2NvbHVtbi5zdHlsZX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5maWx0ZXJpbmcpIHtcbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT4gKFxuICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0RmlsdGVySXRlbVZhbHVlKGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uRmlsdGVyQ2VsbFZhbHVlQ2hhbmdlKGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkRmlsdGVySW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX1gfVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmZpbHRlckNvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17Y29sdW1uLnN0eWxlfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3NlbGVjdCc6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgaW50bCB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50T3B0aW9ucyB8fFxuICAgICAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdENvbXBvbmVudE9wdGlvbnMuZ2V0KGNvbHVtbi5jb2x1bW5LZXkpO1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0VHJhbnNsYXRpb25zID0gY29sLnNlbGVjdENvbXBvbmVudFRyYW5zbGF0aW9ucyB8fFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IGludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5TZWxlY3QnIH0pLFxuICAgICAgICAgICAgICAgIG5vUmVzdWx0c1RleHQ6IGludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5Ob1Jlc3VsdHMnIH0pLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5saW5lRWRpdCkge1xuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IChcbiAgICAgICAgICAgICAgICAgIDxGbG9hdGluZ1NlbGVjdFxuICAgICAgICAgICAgICAgICAgICBuYW1lPXtjb2wudmFsdWVLZXlQYXRoLmpvaW4oKSArICctZWRpdC0nICsgcm93SW5kZXh9XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e1xuICAgICAgICAgICAgICAgICAgICAgIGNvbC5lZGl0U2VsZWN0T3B0aW9uc01vZCAmJiBzZWxlY3RPcHRpb25zID9cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbC5lZGl0U2VsZWN0T3B0aW9uc01vZChzZWxlY3RPcHRpb25zLnNsaWNlKCksIHJvd0luZGV4LCBjb2wpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdE9wdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkVkaXRDZWxsVmFsdWVDaGFuZ2Uocm93SW5kZXgsIGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLm9uRWRpdENlbGxCbHVyKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLm9uQ2VsbEZvY3VzKCdlZGl0JywgY29sLmNvbXBvbmVudFR5cGUsIHJvd0luZGV4LCBjb2x1bW4uY29sdW1uS2V5KX1cbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoYWJsZT17c2VsZWN0T3B0aW9ucyAmJiAoc2VsZWN0T3B0aW9ucy5sZW5ndGggPiA5KX1cbiAgICAgICAgICAgICAgICAgICAgY2xlYXJhYmxlPXshY29sLmlzUmVxdWlyZWR9XG4gICAgICAgICAgICAgICAgICAgIGJhY2tzcGFjZVJlbW92ZXM9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICB0YWJTZWxlY3RzVmFsdWU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBvcGVuT25Gb2N1c1xuICAgICAgICAgICAgICAgICAgICByZWY9e3RoaXMuaGFuZGxlRWRpdENlbGxSZWYocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICBpZDogYG9jRGF0YWdyaWRFZGl0SW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX0tJHtyb3dJbmRleH1gLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmVkaXRDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnZWRpdCcpfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5zZWxlY3RUcmFuc2xhdGlvbnN9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gKFxuICAgICAgICAgICAgICAgICAgPEZsb2F0aW5nU2VsZWN0XG4gICAgICAgICAgICAgICAgICAgIG5hbWU9e2NvbC52YWx1ZUtleVBhdGguam9pbigpICsgJy1jcmVhdGUtJyArIHJvd0luZGV4fVxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zPXtcbiAgICAgICAgICAgICAgICAgICAgICBjb2wuY3JlYXRlU2VsZWN0T3B0aW9uc01vZCAmJiBzZWxlY3RPcHRpb25zID9cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbC5jcmVhdGVTZWxlY3RPcHRpb25zTW9kKHNlbGVjdE9wdGlvbnMuc2xpY2UoKSwgcm93SW5kZXgsIGNvbCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0T3B0aW9uc1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldENyZWF0ZUl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DcmVhdGVDZWxsVmFsdWVDaGFuZ2Uocm93SW5kZXgsIGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLm9uQ3JlYXRlQ2VsbEJsdXIocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaGFibGU9e3NlbGVjdE9wdGlvbnMgJiYgKHNlbGVjdE9wdGlvbnMubGVuZ3RoID4gOSl9XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyYWJsZT17IWNvbC5pc1JlcXVpcmVkfVxuICAgICAgICAgICAgICAgICAgICBiYWNrc3BhY2VSZW1vdmVzPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgdGFiU2VsZWN0c1ZhbHVlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgb3Blbk9uRm9jdXNcbiAgICAgICAgICAgICAgICAgICAgcmVmPXt0aGlzLmhhbmRsZUNyZWF0ZUNlbGxSZWYocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICBpZDogYG9jRGF0YWdyaWRDcmVhdGVJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fS0ke3Jvd0luZGV4fWAsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuY3JlYXRlQ29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2NyZWF0ZScpfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5zZWxlY3RUcmFuc2xhdGlvbnN9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmZpbHRlcmluZykge1xuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8RmxvYXRpbmdTZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgbmFtZT17Y29sLnZhbHVlS2V5UGF0aC5qb2luKCkgKyAnLWZpbHRlcid9XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e1xuICAgICAgICAgICAgICAgICAgICAgIGNvbC5maWx0ZXJTZWxlY3RPcHRpb25zTW9kICYmIHNlbGVjdE9wdGlvbnMgP1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sLmZpbHRlclNlbGVjdE9wdGlvbnNNb2Qoc2VsZWN0T3B0aW9ucy5zbGljZSgpLCBjb2wpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdE9wdGlvbnN9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldEZpbHRlckl0ZW1WYWx1ZShjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkZpbHRlckNlbGxWYWx1ZUNoYW5nZShjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaGFibGU9e3NlbGVjdE9wdGlvbnMgJiYgKHNlbGVjdE9wdGlvbnMubGVuZ3RoID4gOSl9XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyYWJsZVxuICAgICAgICAgICAgICAgICAgICB0YWJTZWxlY3RzVmFsdWU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBvcGVuT25Gb2N1c1xuICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgaWQ6IGBvY0RhdGFncmlkRmlsdGVySW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX1gLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmZpbHRlckNvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5zZWxlY3RUcmFuc2xhdGlvbnN9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlICdkYXRlJzoge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5saW5lRWRpdCkge1xuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IChcbiAgICAgICAgICAgICAgICAgIDxEYXRlSW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25FZGl0Q2VsbFZhbHVlQ2hhbmdlKHJvd0luZGV4LCBjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsZT17dGhpcy5wcm9wcy5sYW5ndWFnZX1cbiAgICAgICAgICAgICAgICAgICAgZGF0ZUZvcm1hdD17dGhpcy5wcm9wcy5kYXRlRm9ybWF0fVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFJlZj17dGhpcy5oYW5kbGVFZGl0Q2VsbFJlZihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgIGlkOiBgb2NEYXRhZ3JpZEVkaXRJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fS0ke3Jvd0luZGV4fWAsXG4gICAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duOiB0aGlzLm9uRWRpdENlbGxLZXlEb3duKGNvbCwgcm93SW5kZXgpLFxuICAgICAgICAgICAgICAgICAgICAgIG9uQmx1cjogdGhpcy5vbkVkaXRDZWxsQmx1cihyb3dJbmRleCwgY29sKSxcbiAgICAgICAgICAgICAgICAgICAgICBvbkZvY3VzOiB0aGlzLm9uQ2VsbEZvY3VzKCdlZGl0JywgY29sLmNvbXBvbmVudFR5cGUsIHJvd0luZGV4LCBjb2x1bW4uY29sdW1uS2V5KSxcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogY29sdW1uLnN0eWxlLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmVkaXRDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnZWRpdCcpfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IChcbiAgICAgICAgICAgICAgICAgIDxEYXRlSW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0Q3JlYXRlSXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZShyb3dJbmRleCwgY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMub25DcmVhdGVDZWxsS2V5RG93bn1cbiAgICAgICAgICAgICAgICAgICAgbG9jYWxlPXt0aGlzLnByb3BzLmxhbmd1YWdlfVxuICAgICAgICAgICAgICAgICAgICBkYXRlRm9ybWF0PXt0aGlzLnByb3BzLmRhdGVGb3JtYXR9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UmVmPXt0aGlzLmhhbmRsZUNyZWF0ZUNlbGxSZWYocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICBpZDogYG9jRGF0YWdyaWRDcmVhdGVJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fS0ke3Jvd0luZGV4fWAsXG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IGNvbHVtbi5zdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5jcmVhdGVDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnY3JlYXRlJyl9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmZpbHRlcmluZykge1xuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8RGF0ZUlucHV0XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldEZpbHRlckl0ZW1WYWx1ZShjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkZpbHRlckNlbGxWYWx1ZUNoYW5nZShjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIGRhdGVGb3JtYXQ9e3RoaXMucHJvcHMuZGF0ZUZvcm1hdH1cbiAgICAgICAgICAgICAgICAgICAgbG9jYWxlPXt0aGlzLnByb3BzLmxhbmd1YWdlfVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgaWQ6IGBvY0RhdGFncmlkRmlsdGVySW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX1gLFxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBjb2x1bW4uc3R5bGUsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuZmlsdGVyQ29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlICdib29sZWFuJzoge1xuICAgICAgICAgICAgY29uc3QgeyBpbnRsIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0VHJhbnNsYXRpb25zID0gY29sLnNlbGVjdENvbXBvbmVudFRyYW5zbGF0aW9ucyB8fCB7XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBpbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuU2VsZWN0JyB9KSxcbiAgICAgICAgICAgICAgbm9SZXN1bHRzVGV4dDogaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0Lk5vUmVzdWx0cycgfSksXG4gICAgICAgICAgICB9O1xuXG5cbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBbXG4gICAgICAgICAgICAgIHsgdmFsdWU6IHRydWUsIGxhYmVsOiBpbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuWWVzJyB9KSB9LFxuICAgICAgICAgICAgICB7IHZhbHVlOiBmYWxzZSwgbGFiZWw6IGludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5ObycgfSkgfSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5pbmxpbmVFZGl0KSB7XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gKFxuICAgICAgICAgICAgICAgICAgPEZsb2F0aW5nU2VsZWN0XG4gICAgICAgICAgICAgICAgICAgIG5hbWU9e2NvbC52YWx1ZUtleVBhdGguam9pbigpICsgJy1lZGl0LScgKyByb3dJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucz17c2VsZWN0T3B0aW9uc31cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25FZGl0Q2VsbFZhbHVlQ2hhbmdlKHJvd0luZGV4LCBjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5vbkVkaXRDZWxsQmx1cihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5vbkNlbGxGb2N1cygnZWRpdCcsIGNvbC5jb21wb25lbnRUeXBlLCByb3dJbmRleCwgY29sdW1uLmNvbHVtbktleSl9XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaGFibGU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBjbGVhcmFibGU9eyFjb2wuaXNSZXF1aXJlZH1cbiAgICAgICAgICAgICAgICAgICAgYmFja3NwYWNlUmVtb3Zlcz17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIHRhYlNlbGVjdHNWYWx1ZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIG9wZW5PbkZvY3VzXG4gICAgICAgICAgICAgICAgICAgIHJlZj17dGhpcy5oYW5kbGVFZGl0Q2VsbFJlZihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICAgIGlkOiBgb2NEYXRhZ3JpZEVkaXRJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fS0ke3Jvd0luZGV4fWAsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuZWRpdENvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdlZGl0Jyl9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgey4uLnNlbGVjdFRyYW5zbGF0aW9uc31cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiAoXG4gICAgICAgICAgICAgICAgICA8RmxvYXRpbmdTZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgbmFtZT17Y29sLnZhbHVlS2V5UGF0aC5qb2luKCkgKyAnLWNyZWF0ZS0nICsgcm93SW5kZXh9XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e3NlbGVjdE9wdGlvbnN9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldENyZWF0ZUl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DcmVhdGVDZWxsVmFsdWVDaGFuZ2Uocm93SW5kZXgsIGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLm9uQ3JlYXRlQ2VsbEJsdXIocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaGFibGU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBjbGVhcmFibGU9eyFjb2wuaXNSZXF1aXJlZH1cbiAgICAgICAgICAgICAgICAgICAgYmFja3NwYWNlUmVtb3Zlcz17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIHRhYlNlbGVjdHNWYWx1ZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIG9wZW5PbkZvY3VzXG4gICAgICAgICAgICAgICAgICAgIHJlZj17dGhpcy5oYW5kbGVDcmVhdGVDZWxsUmVmKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgaWQ6IGBvY0RhdGFncmlkQ3JlYXRlSW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX0tJHtyb3dJbmRleH1gLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmNyZWF0ZUNvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdjcmVhdGUnKX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgICAgICAgICB7Li4uc2VsZWN0VHJhbnNsYXRpb25zfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5maWx0ZXJpbmcpIHtcbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT4gKFxuICAgICAgICAgICAgICAgICAgPEZsb2F0aW5nU2VsZWN0XG4gICAgICAgICAgICAgICAgICAgIG5hbWU9e2NvbC52YWx1ZUtleVBhdGguam9pbigpICsgJy1maWx0ZXInfVxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zPXtzZWxlY3RPcHRpb25zfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRGaWx0ZXJJdGVtVmFsdWUoY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UoY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hhYmxlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgY2xlYXJhYmxlXG4gICAgICAgICAgICAgICAgICAgIHRhYlNlbGVjdHNWYWx1ZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIG9wZW5PbkZvY3VzXG4gICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICBpZDogYG9jRGF0YWdyaWRGaWx0ZXJJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fWAsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuZmlsdGVyQ29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgey4uLnNlbGVjdFRyYW5zbGF0aW9uc31cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbHVtbnMucHVzaChjb2x1bW4pO1xuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuaXNDcmVhdGluZykge1xuICAgICAgY29sdW1ucy5wdXNoKHtcbiAgICAgICAgd2lkdGg6IDM3LFxuICAgICAgICBpc1Jlc2l6YWJsZTogZmFsc2UsXG4gICAgICAgIGNvbHVtbktleTogJ3JlbW92ZU5ld0l0ZW0nLFxuICAgICAgICBjZWxsOiAoKSA9PiBudWxsLFxuICAgICAgICBjZWxsRWRpdDogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbENyZWF0ZTogcm93SW5kZXggPT4gKFxuICAgICAgICAgIDxJY29uXG4gICAgICAgICAgICBpZD17YG9jLWRhdGFncmlkLW5ldy1pdGVtLXJlbW92ZS0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtyb3dJbmRleH1gfVxuICAgICAgICAgICAgdHlwZT1cImluZGljYXRvclwiXG4gICAgICAgICAgICBuYW1lPVwiZGVsZXRlXCJcbiAgICAgICAgICAgIHdpZHRoPXszMH1cbiAgICAgICAgICAgIGhlaWdodD17MzB9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0aGlzLnByb3BzLnJlbW92ZU5ld0l0ZW0odGhpcy5wcm9wcy5ncmlkLCByb3dJbmRleCl9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSxcbiAgICAgICAgY2VsbEZpbHRlcjogKCkgPT4gbnVsbCxcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gY29sdW1ucztcbiAgfVxuXG4gIGlzQ2VsbEVkaXRlZCA9IChyb3dJbmRleCwgY29sLCBjZWxsVHlwZSkgPT4ge1xuICAgIGlmIChjZWxsVHlwZSAhPT0gJ2VkaXQnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICBpZiAodGhpcy5wcm9wcy5lZGl0RGF0YS5nZXRJbihbaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIGNoZWNrZXIgZm9yIHNlbGVjdGlvbkNoZWNrYm94XG4gIGlzU2VsZWN0aW9uQ2hlY2tib3goY2VsbFByb3BzKSB7XG4gICAgY29uc3QgZXhwZWN0ZWRDb2x1bW5LZXkgPSAnc2VsZWN0aW9uQ2hlY2tib3gnO1xuICAgIHJldHVybiAodGhpcy5wcm9wcy5yb3dTZWxlY3RDaGVja2JveENvbHVtbiAmJiBjZWxsUHJvcHMuY29sdW1uS2V5ID09PSBleHBlY3RlZENvbHVtbktleSk7XG4gIH1cblxuICBoYW5kbGVBZnRlckFkZEl0ZW0gPSAoKSA9PiB7XG4gICAgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCA9IHRydWU7XG4gIH1cblxuICBoYW5kbGVBZnRlckVkaXRQcmVzcyA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLnNpemUpIHtcbiAgICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gdHJ1ZTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjdXJyZW50Um93OiB1bmRlZmluZWQsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVBZnRlclZhbGlkYXRpb25FcnJvciA9ICgpID0+IHtcbiAgICB0aGlzLmZvY3VzVG9FcnJvckNlbGwgPSB0cnVlO1xuICB9XG5cbiAgaGFuZGxlUm93Q2xpY2sgPSAoZSwgcm93SW5kZXgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5yb3dTZWxlY3QgJiYgIXRoaXMucHJvcHMuaXNDcmVhdGluZyAmJiAhdGhpcy5wcm9wcy5pc0VkaXRpbmcpIHtcbiAgICAgIGlmIChlLmN0cmxLZXkgfHwgZS5zaGlmdEtleSkge1xuICAgICAgICBkb2N1bWVudC5nZXRTZWxlY3Rpb24oKS5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICAgIH1cbiAgICAgIC8vIGRvbid0IHRyaWdnZXIgc2VsZWN0aW9uIGNoYW5nZSBvbiBjaGVja2JveCBjbGlja1xuICAgICAgaWYgKGUudGFyZ2V0LnR5cGUgIT09ICdjaGVja2JveCcpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5pdGVtU2VsZWN0aW9uQ2hhbmdlKFxuICAgICAgICAgIHRoaXMucHJvcHMuZ3JpZCxcbiAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICB0aGlzLnByb3BzLm11bHRpU2VsZWN0ICYmIGUuY3RybEtleSxcbiAgICAgICAgICB0aGlzLnByb3BzLm11bHRpU2VsZWN0ICYmIGUuc2hpZnRLZXksXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLm9uUm93Q2xpY2spIHtcbiAgICAgIHRoaXMucHJvcHMub25Sb3dDbGljayhlLCByb3dJbmRleCwgdGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCkpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJlbmRlckNlbGwgPSBjb2wgPT4gKGNlbGxQcm9wcykgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGlzQ3JlYXRpbmcsXG4gICAgICBpc0VkaXRpbmcsXG4gICAgICBjcmVhdGVEYXRhLFxuICAgICAgc2VsZWN0ZWRDZWxsLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgcm93SW5kZXgsIC4uLnByb3BzIH0gPSBjZWxsUHJvcHM7XG4gICAgY29uc3QgaXNDaGVja2JveCA9IHRoaXMuaXNTZWxlY3Rpb25DaGVja2JveChjZWxsUHJvcHMpO1xuICAgIGxldCBjZWxsO1xuICAgIGxldCBjZWxsVHlwZSA9ICd2aWV3JztcbiAgICBsZXQgZXh0cmFSb3dDb3VudCA9IDA7IC8vIGhvdyBtYW55IHJvd3MgdG8gaWdub3JlIGZyb20gdG9wLCBuZXcgKyBmaWx0ZXIgcm93c1xuICAgIGlmIChpc0NyZWF0aW5nKSBleHRyYVJvd0NvdW50ID0gY3JlYXRlRGF0YS5zaXplO1xuICAgIGlmIChpc0NyZWF0aW5nKSB7XG4gICAgICBpZiAocm93SW5kZXggPD0gKGV4dHJhUm93Q291bnQgLSAxKSkge1xuICAgICAgICBpZiAoY29sLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjZWxsID0gY29sLmNlbGxDcmVhdGUocm93SW5kZXgpO1xuICAgICAgICAgIGNlbGxUeXBlID0gJ2NyZWF0ZSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2VsbCA9IG51bGw7XG4gICAgICAgICAgY2VsbFR5cGUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjZWxsID0gY29sLmNlbGwocm93SW5kZXggLSBleHRyYVJvd0NvdW50KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzRWRpdGluZyAmJiBjb2wuY2VsbEVkaXQpIHtcbiAgICAgIGNlbGwgPSBjb2wuY2VsbEVkaXQocm93SW5kZXggLSBleHRyYVJvd0NvdW50KTtcbiAgICAgIGNlbGxUeXBlID0gJ2VkaXQnO1xuICAgIH0gZWxzZSB7XG4gICAgICBjZWxsID0gY29sLmNlbGwocm93SW5kZXggLSBleHRyYVJvd0NvdW50KTtcbiAgICB9XG4gICAgaWYgKChjZWxsVHlwZSA9PT0gJ3ZpZXcnIHx8IGNlbGxUeXBlID09PSAnZWRpdCcgfHwgY2VsbFR5cGUgPT09ICdjcmVhdGUnKSAmJiAhaXNDaGVja2JveCkge1xuICAgICAgY29uc3QgZ2V0Um93SW5kZXggPSAoY2VsbFR5cGUgPT09ICdjcmVhdGUnKSA/IHJvd0luZGV4IDogKHJvd0luZGV4IC0gZXh0cmFSb3dDb3VudCk7XG4gICAgICBjb25zdCBtZXNzYWdlRGF0YSA9IHRoaXMuZ2V0Q2VsbE1lc3NhZ2VzKGdldFJvd0luZGV4LCBjb2wsIGNlbGxUeXBlKTtcbiAgICAgIGNvbnN0IGlzRWRpdGVkID0gdGhpcy5pc0NlbGxFZGl0ZWQoZ2V0Um93SW5kZXgsIGNvbCwgY2VsbFR5cGUpO1xuICAgICAgY29uc3QgY2xhc3NOYW1lID0gKHNlbGVjdGVkQ2VsbC5nZXQoJ3Jvd0luZGV4JykgPT09IHJvd0luZGV4ICYmIHNlbGVjdGVkQ2VsbC5nZXQoJ2NvbHVtbktleScpID09PSBwcm9wcy5jb2x1bW5LZXkpID9cbiAgICAgICAgJ29jLWRhdGFncmlkLWNlbGwgaXMtc2VsZWN0ZWQnIDogJ29jLWRhdGFncmlkLWNlbGwnO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPENlbGxcbiAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG4gICAgICAgICAgc3R5bGU9e2NvbC5zdHlsZX1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNlbGxTZWxlY3QoY2VsbFR5cGUsIHJvd0luZGV4LCBwcm9wcy5jb2x1bW5LZXkpfVxuICAgICAgICA+XG4gICAgICAgICAgPENlbGxUb29sdGlwXG4gICAgICAgICAgICBpZD17Y2VsbFR5cGUgKyBjb2wuY29sdW1uS2V5ICsgKHJvd0luZGV4IC0gZXh0cmFSb3dDb3VudCl9XG4gICAgICAgICAgICBpc0VkaXRlZD17aXNFZGl0ZWR9XG4gICAgICAgICAgICBpc0Vycm9yPXshIW1lc3NhZ2VEYXRhLmVycm9yTWVzc2FnZX1cbiAgICAgICAgICAgIGlzV2FybmluZz17ISFtZXNzYWdlRGF0YS53YXJuaW5nTWVzc2FnZX1cbiAgICAgICAgICAgIGluZm9NZXNzYWdlPXttZXNzYWdlRGF0YS5pbmZvTWVzc2FnZX1cbiAgICAgICAgICAgIGVycm9yTWVzc2FnZT17bWVzc2FnZURhdGEuZXJyb3JNZXNzYWdlfVxuICAgICAgICAgICAgd2FybmluZ01lc3NhZ2U9e21lc3NhZ2VEYXRhLndhcm5pbmdNZXNzYWdlfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtjZWxsfVxuICAgICAgICAgIDwvQ2VsbFRvb2x0aXA+XG4gICAgICAgIDwvQ2VsbD5cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8Q2VsbCB7Li4ucHJvcHN9IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWNlbGxcIiBzdHlsZT17Y29sLnN0eWxlfT57Y2VsbH08L0NlbGw+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlckNvbHVtbnMgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmFsbERhdGFTaXplICYmICF0aGlzLnByb3BzLmlzQnVzeSAmJiAhdGhpcy5wcm9wcy5pc0NyZWF0aW5nKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Q29sdW1uXG4gICAgICAgICAgY29sdW1uS2V5PVwiZGF0YUVtcHR5Q29sdW1uXCJcbiAgICAgICAgICBoZWFkZXI9ezxDZWxsIHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicgfX0+PE0gaWQ9XCJHcmlkLk5vSXRlbXNcIiAvPjwvQ2VsbD59XG4gICAgICAgICAgd2lkdGg9ezEwfVxuICAgICAgICAgIGlzUmVzaXphYmxlPXtmYWxzZX1cbiAgICAgICAgICBmbGV4R3Jvdz17MX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICAgIGlmICghdGhpcy5wcm9wcy52aXNpYmxlQ29sdW1ucy5zaXplKSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5pc0J1c3kpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8Q29sdW1uXG4gICAgICAgICAgICBjb2x1bW5LZXk9XCJkYXRhRW1wdHlDb2x1bW5cIlxuICAgICAgICAgICAgaGVhZGVyPXs8Q2VsbD4mbmJzcDs8L0NlbGw+fVxuICAgICAgICAgICAgd2lkdGg9ezEwfVxuICAgICAgICAgICAgaXNSZXNpemFibGU9e2ZhbHNlfVxuICAgICAgICAgICAgZmxleEdyb3c9ezF9XG4gICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxDb2x1bW5cbiAgICAgICAgICBjb2x1bW5LZXk9XCJkYXRhRW1wdHlDb2x1bW5cIlxuICAgICAgICAgIGhlYWRlcj17PENlbGwgc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJyB9fT48TSBpZD1cIkdyaWQuTm9Db2x1bW5zXCIgLz48L0NlbGw+fVxuICAgICAgICAgIHdpZHRoPXsxMH1cbiAgICAgICAgICBpc1Jlc2l6YWJsZT17ZmFsc2V9XG4gICAgICAgICAgZmxleEdyb3c9ezF9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCBjb2x1bW5zID0gdGhpcy5nZW5lcmF0ZUNvbHVtbnMoKTtcbiAgICBpZiAoY29sdW1ucy5sZW5naHQgPT09IDApIHJldHVybiBudWxsO1xuICAgIHJldHVybiBjb2x1bW5zLm1hcChjb2wgPT4gKFxuICAgICAgPENvbHVtblxuICAgICAgICBrZXk9e2NvbC5jb2x1bW5LZXl9XG4gICAgICAgIGNvbHVtbktleT17Y29sLmNvbHVtbktleX1cbiAgICAgICAgaGVhZGVyPXtcbiAgICAgICAgICA8SGVhZGVyQ2VsbFxuICAgICAgICAgICAgZ3JpZD17dGhpcy5wcm9wcy5ncmlkfVxuICAgICAgICAgICAgY29sdW1ucz17dGhpcy5wcm9wcy5jb2x1bW5zfVxuICAgICAgICAgICAgY29sdW1uPXtjb2x9XG4gICAgICAgICAgICBjdXJyZW50U29ydENvbHVtbj17dGhpcy5wcm9wcy5zb3J0Q29sdW1ufVxuICAgICAgICAgICAgY3VycmVudFNvcnRPcmRlcj17dGhpcy5wcm9wcy5zb3J0T3JkZXJ9XG4gICAgICAgICAgICBvblNvcnRDaGFuZ2U9e3RoaXMucHJvcHMuc29ydENoYW5nZX1cbiAgICAgICAgICAgIGlzQnVzeT17dGhpcy5wcm9wcy5pc0J1c3l9XG4gICAgICAgICAgICBmaWx0ZXJpbmc9e3RoaXMucHJvcHMuaXNGaWx0ZXJpbmd9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2NvbC5oZWFkZXJ9XG4gICAgICAgICAgPC9IZWFkZXJDZWxsPlxuICAgICAgICB9XG4gICAgICAgIGNlbGw9e3RoaXMucmVuZGVyQ2VsbChjb2wpfVxuICAgICAgICB3aWR0aD17dGhpcy5wcm9wcy5jb2x1bW5XaWR0aHMuZ2V0KGNvbC5jb2x1bW5LZXksIGNvbC53aWR0aCl9XG4gICAgICAgIG1pbldpZHRoPXtjb2wubWluV2lkdGh9XG4gICAgICAgIG1heFdpZHRoPXtjb2wubWF4V2lkdGh9XG4gICAgICAgIGlzUmVzaXphYmxlPXtjb2wuaXNSZXNpemFibGV9XG4gICAgICAgIGZsZXhHcm93PXtjb2wuZmxleEdyb3cgPyBjb2wuZmxleEdyb3cgOiAwfVxuICAgICAgICBmaXhlZD17Y29sLmZpeGVkfVxuICAgICAgICBhbGxvd0NlbGxzUmVjeWNsaW5nPXtjb2wuYWxsb3dDZWxsc1JlY3ljbGluZ31cbiAgICAgIC8+KSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgZ3JpZENsYXNzTmFtZSA9IGNsYXNzTmFtZXMoe1xuICAgICAgJ29jLWRhdGFncmlkLWNvbnRhaW5lcic6IHRydWUsXG4gICAgICAnd2l0aC1hY3Rpb25iYXInOiB0aGlzLnByb3BzLmlubGluZUVkaXQgJiYgIXRoaXMucHJvcHMuZGlzYWJsZUFjdGlvbkJhcixcbiAgICAgICdpcy1idXN5JzogdGhpcy5wcm9wcy5pc0J1c3ksXG4gICAgICAnaXMtZWRpdGluZyc6IHRoaXMucHJvcHMuaXNFZGl0aW5nLFxuICAgICAgJ2lzLWNyZWF0aW5nJzogdGhpcy5wcm9wcy5pc0NyZWF0aW5nLFxuICAgIH0pO1xuICAgIGxldCBhY3Rpb25CYXIgPSBudWxsO1xuICAgIGxldCBhY3Rpb25CYXJSaWdodCA9IG51bGw7XG4gICAgbGV0IGFjdGlvbkJhckxlZnQgPSBudWxsO1xuICAgIGlmIChcbiAgICAgICh0aGlzLnByb3BzLmFjdGlvbkJhciB8fFxuICAgICAgICB0aGlzLnByb3BzLmlubGluZUVkaXQgfHxcbiAgICAgICAgdGhpcy5wcm9wcy5maWx0ZXJpbmcgfHxcbiAgICAgICAgdGhpcy5wcm9wcy5yZW1vdmluZykgJiZcbiAgICAgICF0aGlzLnByb3BzLmRpc2FibGVBY3Rpb25CYXJcbiAgICApIHtcbiAgICAgIGFjdGlvbkJhclJpZ2h0ID0gKFxuICAgICAgICA8QWN0aW9uQmFyIHBvc2l0aW9uPVwicmlnaHRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWFjdGlvbmJhci1yaWdodFwiPnt0aGlzLnByb3BzLmFjdGlvbkJhcn08L2Rpdj5cbiAgICAgICAgICB7KHRoaXMucHJvcHMuZmlsdGVyaW5nICYmIHRoaXMucHJvcHMuZGlzYWJsZURyb3Bkb3duXG4gICAgICAgICAgICAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlRmlsdGVyaW5nQ29udHJvbHMpICYmXG4gICAgICAgICAgICA8RmlsdGVyaW5nQ29udHJvbHMgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICAgfVxuICAgICAgICAgIHt0aGlzLnByb3BzLmlubGluZUVkaXQgJiZcbiAgICAgICAgICA8SW5saW5lRWRpdENvbnRyb2xzXG4gICAgICAgICAgICBhZnRlckFkZEl0ZW09e3RoaXMuaGFuZGxlQWZ0ZXJBZGRJdGVtfVxuICAgICAgICAgICAgYWZ0ZXJFZGl0UHJlc3M9e3RoaXMuaGFuZGxlQWZ0ZXJFZGl0UHJlc3N9XG4gICAgICAgICAgICBhZnRlclZhbGlkYXRpb25FcnJvcj17dGhpcy5oYW5kbGVBZnRlclZhbGlkYXRpb25FcnJvcn1cbiAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgfVxuICAgICAgICAgIHsodGhpcy5wcm9wcy5kcm9wZG93bk1lbnVJdGVtcyB8fFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5yZW1vdmluZyB8fFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5jb2x1bW5TZXR0aW5ncyB8fFxuICAgICAgICAgICAgKHRoaXMucHJvcHMuZmlsdGVyaW5nICYmICF0aGlzLnByb3BzLmRpc2FibGVEcm9wZG93bikpICYmXG4gICAgICAgICAgICA8RHJvcGRvd25Db250cm9scyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgICB9XG4gICAgICAgIDwvQWN0aW9uQmFyPlxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuYWN0aW9uQmFyTGVmdCB8fCB0aGlzLnByb3BzLmdyaWRIZWFkZXIpIHtcbiAgICAgIGFjdGlvbkJhckxlZnQgPSAoXG4gICAgICAgIDxBY3Rpb25CYXIgcG9zaXRpb249XCJsZWZ0XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1ncmlkaGVhZGVyXCI+e3RoaXMucHJvcHMuZ3JpZEhlYWRlcn08L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWFjdGlvbmJhci1sZWZ0XCI+e3RoaXMucHJvcHMuYWN0aW9uQmFyTGVmdH08L2Rpdj5cbiAgICAgICAgPC9BY3Rpb25CYXI+XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoYWN0aW9uQmFyTGVmdCB8fCBhY3Rpb25CYXJSaWdodCkge1xuICAgICAgYWN0aW9uQmFyID0gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWFjdGlvbmJhci1jb250YWluZXJcIj5cbiAgICAgICAgICB7YWN0aW9uQmFyTGVmdH1cbiAgICAgICAgICB7YWN0aW9uQmFyUmlnaHR9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gICAgbGV0IHJvd3NDb3VudCA9XG4gICAgICAodGhpcy5wcm9wcy5yb3dzQ291bnQgfHwgdGhpcy5wcm9wcy5yb3dzQ291bnQgPT09IDApID9cbiAgICAgICAgdGhpcy5wcm9wcy5yb3dzQ291bnQgOlxuICAgICAgICB0aGlzLnByb3BzLmRhdGEuc2l6ZTtcbiAgICBpZiAodGhpcy5wcm9wcy5pc0NyZWF0aW5nKSByb3dzQ291bnQgKz0gdGhpcy5wcm9wcy5jcmVhdGVEYXRhLnNpemU7XG4gICAgaWYgKCF0aGlzLnByb3BzLnZpc2libGVDb2x1bW5zLnNpemUpIHJvd3NDb3VudCA9IDA7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9e2BvYy1kYXRhZ3JpZC0ke3RoaXMucHJvcHMuZ3JpZC5pZH1gfVxuICAgICAgICBjbGFzc05hbWU9e2dyaWRDbGFzc05hbWV9XG4gICAgICAgIHN0eWxlPXt0aGlzLnByb3BzLmNvbnRhaW5lclN0eWxlfVxuICAgICAgPlxuICAgICAgICB7dGhpcy5wcm9wcy5pc0J1c3kgJiYgPFNwaW5uZXIgLz59XG4gICAgICAgIHthY3Rpb25CYXJ9XG4gICAgICAgIDxSZXNwb25zaXZlRml4ZWREYXRhVGFibGVcbiAgICAgICAgICBpZD17dGhpcy5wcm9wcy5ncmlkLmlkfVxuICAgICAgICAgIHJvd3NDb3VudD17cm93c0NvdW50fVxuICAgICAgICAgIGhlYWRlckhlaWdodD17dGhpcy5wcm9wcy5pc0ZpbHRlcmluZyA/XG4gICAgICAgICAgICB0aGlzLnByb3BzLmhlYWRlckhlaWdodCArIHRoaXMucHJvcHMuZmlsdGVyUm93SGVpZ2h0XG4gICAgICAgICAgICA6IHRoaXMucHJvcHMuaGVhZGVySGVpZ2h0fVxuICAgICAgICAgIHJvd0hlaWdodD17dGhpcy5wcm9wcy5yb3dIZWlnaHR9XG4gICAgICAgICAgb25Db2x1bW5SZXNpemVFbmRDYWxsYmFjaz17dGhpcy5vbkNvbHVtblJlc2l6ZUVuZENhbGxiYWNrfVxuICAgICAgICAgIGlzQ29sdW1uUmVzaXppbmc9e2ZhbHNlfVxuICAgICAgICAgIG9uUm93Q2xpY2s9e3RoaXMuaGFuZGxlUm93Q2xpY2t9XG4gICAgICAgICAgc2Nyb2xsVG9Db2x1bW49e3RoaXMucHJvcHMuc2Nyb2xsVG9Db2x1bW4gfHwgdGhpcy5zdGF0ZS5jdXJyZW50Q29sdW1ufVxuICAgICAgICAgIHNjcm9sbFRvcD17dGhpcy5wcm9wcy5zY3JvbGxUb3B9XG4gICAgICAgICAgc2Nyb2xsVG9Sb3c9e3RoaXMuZ2V0U2Nyb2xsVG9Sb3coKX1cbiAgICAgICAgICBvblJvd0RvdWJsZUNsaWNrPXt0aGlzLnByb3BzLm9uUm93RG91YmxlQ2xpY2t9XG4gICAgICAgICAgb25Sb3dNb3VzZURvd249e3RoaXMucHJvcHMub25Sb3dNb3VzZURvd259XG4gICAgICAgICAgb25Sb3dNb3VzZUVudGVyPXt0aGlzLnByb3BzLm9uUm93TW91c2VFbnRlcn1cbiAgICAgICAgICBvblJvd01vdXNlTGVhdmU9e3RoaXMucHJvcHMub25Sb3dNb3VzZUxlYXZlfVxuICAgICAgICAgIG9uU2Nyb2xsU3RhcnQ9e3RoaXMucHJvcHMub25TY3JvbGxTdGFydH1cbiAgICAgICAgICBvblNjcm9sbEVuZD17dGhpcy5wcm9wcy5vblNjcm9sbEVuZH1cbiAgICAgICAgICByb3dDbGFzc05hbWVHZXR0ZXI9e3RoaXMuZ2V0Um93Q2xhc3NOYW1lfVxuICAgICAgICAgIHJvd0hlaWdodEdldHRlcj17dGhpcy5wcm9wcy5yb3dIZWlnaHRHZXR0ZXJ9XG4gICAgICAgICAgb25Db250ZW50SGVpZ2h0Q2hhbmdlPXt0aGlzLnByb3BzLm9uQ29udGVudEhlaWdodENoYW5nZX1cbiAgICAgICAgPlxuICAgICAgICAgIHt0aGlzLnJlbmRlckNvbHVtbnMoKX1cbiAgICAgICAgPC9SZXNwb25zaXZlRml4ZWREYXRhVGFibGU+XG4gICAgICAgIHt0aGlzLnByb3BzLmlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW4gJiZcbiAgICAgICAgPENvbHVtblNldHRpbmdzTW9kYWxcbiAgICAgICAgICBncmlkPXt0aGlzLnByb3BzLmdyaWR9XG4gICAgICAgICAgY29sdW1ucz17dGhpcy5wcm9wcy5jb2x1bW5zfVxuICAgICAgICAgIHZpc2libGVDb2x1bW5zPXt0aGlzLnByb3BzLnZpc2libGVDb2x1bW5zfVxuICAgICAgICAgIGNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbD17dGhpcy5wcm9wcy5jbG9zZUNvbHVtblNldHRpbmdzTW9kYWx9XG4gICAgICAgICAgc2F2ZUNvbHVtblNldHRpbmdzPXt0aGlzLnByb3BzLnNhdmVDb2x1bW5TZXR0aW5nc31cbiAgICAgICAgLz5cbiAgICAgICAgfVxuICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==