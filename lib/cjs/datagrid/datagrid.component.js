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

var _reactCheckbox = require('@opuscapita/react-checkbox');

var _reactCheckbox2 = _interopRequireDefault(_reactCheckbox);

var _formatUtils = require('@opuscapita/format-utils');

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
      this.state.contextMenuOpen && this.renderContextMenu(),
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
          onRowMouseDown: this.props.onMouseDown,
          onRowMouseEnter: this.props.onRowMouseEnter,
          onRowMouseLeave: this.props.onRowMouseLeave,
          onScrollStart: this.props.onScrollStart,
          onScrollEnd: this.props.onScrollEnd,
          rowClassNameGetter: this.getRowClassName,
          rowHeightGetter: this.props.rowHeightGetter,
          onContentHeightChange: this.props.onContentHeightChange,
          onRowContextMenu: this.handleContextMenu
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
          return _react2.default.createElement(
            'div',
            { className: 'oc-datagrid-extra-column-cell' },
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
          return _react2.default.createElement(_reactCheckbox2.default, {
            id: 'ocDatagridSelectCheckBox-' + _this2.props.grid.id + '-' + rowIndex,
            className: 'oc-datagrid-select-checkbox-cell',
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
          case 'currency':
            {
              var currencyKeyPath = col.valueOptions && col.valueOptions.currencyKeyPath || ['currency']; // eslint-disable-line
              column.cell = function (rowIndex) {
                return valueRender(rowIndex, function (v) {
                  return (0, _formatUtils.formatCurrencyAmount)(v, {
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

              var _selectOptions = [{ value: true, label: _intl.formatMessage({ id: 'Grid.Yes' }) }, { value: false, label: _intl.formatMessage({ id: 'Grid.No' }) }];

              var _selectTranslations = col.selectComponentTranslations || {
                placeholder: _intl.formatMessage({ id: 'Grid.FloatingSelect.Select' }),
                noResultsText: _intl.formatMessage({ id: 'Grid.FloatingSelect.NoResults' })
              };

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
      // Don't trigger selection change on row select checkbox click
      // Check that clicked node's parent or parent's parent doesn't have checkbox class
      var parentNode = e.target.parentNode;

      var parent1class = parentNode.className && parentNode.className.indexOf ? parentNode.className : '';
      var parent2class = parentNode.parentNode.className && parentNode.parentNode.className.indexOf // eslint-disable-line
      ? parentNode.parentNode.className : '';
      if (parent1class.indexOf('oc-datagrid-select-checkbox-cell') === -1 && parent2class.indexOf('oc-datagrid-select-checkbox-cell') === -1) {
        _this2.props.itemSelectionChange(_this2.props.grid, rowIndex, _this2.props.multiSelect && e.ctrlKey, _this2.props.multiSelect && e.shiftKey);
      }
    }
    if (_this2.props.onRowClick) {
      _this2.props.onRowClick(e, rowIndex, _this2.props.data.get(rowIndex));
    }
    return true;
  };

  this.handleContextMenu = function (e, rowIndex) {
    if (_this2.props.onContextMenu) {
      e.preventDefault();
      e.stopPropagation();
      _this2.props.onContextMenu(e, rowIndex, _this2.props.data.get(rowIndex));
    }
    if (_this2.props.contextMenuItems) {
      e.preventDefault();
      e.stopPropagation();
      _this2.setState({
        contextMenuOpen: true,
        contextMenuX: e.clientX,
        contextMenuY: e.clientY,
        contextMenuRowIndex: rowIndex
      });
      document.addEventListener('click', _this2.onDocumentClick);
      return false;
    }
    return true;
  };

  this.handleContextMenuItemClick = function (onClick) {
    return function () {
      var data = _this2.props.data;
      var contextMenuRowIndex = _this2.state.contextMenuRowIndex;

      onClick(contextMenuRowIndex, data.get(contextMenuRowIndex));
    };
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

  this.renderContextMenu = function () {
    var contextMenuItems = _this2.props.contextMenuItems;
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
    return _react2.default.createElement(
      'ul',
      { className: 'dropdown-menu oc-datagrid-context-menu open', style: style },
      contextMenuItems && contextMenuItems.map && contextMenuItems.map(function (item, i) {
        return _react2.default.createElement(
          _reactBootstrap.MenuItem,
          {
            key: i // eslint-disable-line
            , header: item.header,
            divider: item.divider,
            disabled: item.disabled,
            title: item.title,
            onClick: item.onClick && _this2.handleContextMenuItemClick(item.onClick)
          },
          item.value
        );
      })
    );
  };
}, _temp)) || _class) || _class);
exports.default = DataGrid;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbImRhdGFncmlkQWN0aW9ucyIsIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwib3duUHJvcHMiLCJHUklEIiwiZ3JpZCIsImlzQnVzeSIsImRhdGFncmlkIiwiZ2V0SW4iLCJpZCIsImlzRWRpdGluZyIsImlzQ3JlYXRpbmciLCJpc0ZpbHRlcmluZyIsImlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW4iLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwidmlzaWJsZUNvbHVtbnMiLCJjb2x1bW5XaWR0aHMiLCJzZWxlY3RlZENlbGwiLCJzZWxlY3RlZEl0ZW1zIiwiZGF0YSIsImVkaXREYXRhIiwiY3JlYXRlRGF0YSIsImZpbHRlckRhdGEiLCJjZWxsTWVzc2FnZXMiLCJjcmVhdGVDZWxsTWVzc2FnZXMiLCJhbGxEYXRhU2l6ZSIsInNpemUiLCJsYW5ndWFnZSIsIlV0aWxzIiwiZ2V0TGFuZ3VhZ2UiLCJ1c2VyIiwiZGF0ZUZvcm1hdCIsImdldERhdGVGb3JtYXQiLCJ0aG91c2FuZFNlcGFyYXRvciIsImdldFRob3VzYW5kU2VwYXJhdG9yIiwiZGVjaW1hbFNlcGFyYXRvciIsImdldERlY2ltYWxTZXBhcmF0b3IiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJEYXRhR3JpZCIsImluamVjdEludGwiLCJwcm9wcyIsImN1cnJlbnRSb3ciLCJjdXJyZW50Q29sdW1uIiwiY2VsbFJlZnMiLCJmb2N1c1RvQ3JlYXRlQ2VsbCIsImZvY3VzVG9FZGl0Q2VsbCIsImZvY3VzVG9FcnJvckNlbGwiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImRvY3VtZW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIm9uRG9jdW1lbnRDbGljayIsImludmFsaWRhdGUiLCJyZW5kZXIiLCJncmlkQ2xhc3NOYW1lIiwiaW5saW5lRWRpdCIsImRpc2FibGVBY3Rpb25CYXIiLCJhY3Rpb25CYXIiLCJhY3Rpb25CYXJSaWdodCIsImFjdGlvbkJhckxlZnQiLCJmaWx0ZXJpbmciLCJyZW1vdmluZyIsImRpc2FibGVEcm9wZG93biIsImRpc2FibGVGaWx0ZXJpbmdDb250cm9scyIsImhhbmRsZUFmdGVyQWRkSXRlbSIsImhhbmRsZUFmdGVyRWRpdFByZXNzIiwiaGFuZGxlQWZ0ZXJWYWxpZGF0aW9uRXJyb3IiLCJkcm9wZG93bk1lbnVJdGVtcyIsImNvbHVtblNldHRpbmdzIiwiZ3JpZEhlYWRlciIsInJvd3NDb3VudCIsImNvbnRhaW5lclN0eWxlIiwiY29udGV4dE1lbnVPcGVuIiwicmVuZGVyQ29udGV4dE1lbnUiLCJoZWFkZXJIZWlnaHQiLCJmaWx0ZXJSb3dIZWlnaHQiLCJyb3dIZWlnaHQiLCJvbkNvbHVtblJlc2l6ZUVuZENhbGxiYWNrIiwiaGFuZGxlUm93Q2xpY2siLCJzY3JvbGxUb0NvbHVtbiIsInNjcm9sbFRvcCIsImdldFNjcm9sbFRvUm93Iiwib25Sb3dEb3VibGVDbGljayIsIm9uTW91c2VEb3duIiwib25Sb3dNb3VzZUVudGVyIiwib25Sb3dNb3VzZUxlYXZlIiwib25TY3JvbGxTdGFydCIsIm9uU2Nyb2xsRW5kIiwiZ2V0Um93Q2xhc3NOYW1lIiwicm93SGVpZ2h0R2V0dGVyIiwib25Db250ZW50SGVpZ2h0Q2hhbmdlIiwiaGFuZGxlQ29udGV4dE1lbnUiLCJyZW5kZXJDb2x1bW5zIiwiY29sdW1ucyIsImNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbCIsInNhdmVDb2x1bW5TZXR0aW5ncyIsImNoaWxkcmVuIiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIiwiY29udGV4dE1lbnVJdGVtcyIsInNldFN0YXRlIiwibmV3Q29sdW1uV2lkdGgiLCJjb2x1bW5LZXkiLCJyZXNpemVDb2x1bW4iLCJvbkNyZWF0ZUNlbGxLZXlEb3duIiwiZSIsImtleUNvZGUiLCJLRVlfQ09ERVMiLCJFTlRFUiIsImFkZE5ld0l0ZW0iLCJnZXRDb2x1bW5EZWZhdWx0VmFsdWVzIiwib25FZGl0Q2VsbEtleURvd24iLCJjb2wiLCJyb3dJbmRleCIsImVuYWJsZUFycm93TmF2aWdhdGlvbiIsInJvd3NTaXplIiwiZ2V0Q29sdW1uS2V5IiwiRE9XTiIsInZhbHVlVHlwZSIsIm5leHRFbGVtZW50IiwibW92ZUNlbGxGb2N1cyIsIlVQIiwiVEFCIiwiUklHSFQiLCJMRUZUIiwicHJldmVudERlZmF1bHQiLCJjb2x1bW5JbmQiLCJmaW5kSW5kZXgiLCJjIiwidmFsdWVLZXlQYXRoIiwiam9pbiIsImRpc2FibGVkIiwicm93SW5kIiwic2hpZnRLZXkiLCJsZW5ndGgiLCJuZXh0Q29sdW1uS2V5Iiwib25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UiLCJ2YWx1ZVBhcnNlciIsImV2ZW50T3JEYXRhIiwicmF3VmFsdWUiLCJ0YXJnZXQiLCJ1bmRlZmluZWQiLCJ2YWx1ZSIsImZpbHRlckNlbGxWYWx1ZUNoYW5nZSIsIm9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlIiwiY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlIiwib25DcmVhdGVWYWx1ZUNoYW5nZSIsIm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlIiwibWF0Y2hWYWx1ZSIsIm5ld1ZhbHVlS2V5UGF0aCIsInYiLCJuZXdWYWx1ZSIsInZhbGlkYXRvcnMiLCJjcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZSIsIm9uRWRpdENlbGxWYWx1ZUNoYW5nZSIsImRhdGFJZCIsImdldERhdGFJZEJ5Um93SW5kZXgiLCJlZGl0Q2VsbFZhbHVlQ2hhbmdlIiwib25FZGl0VmFsdWVDaGFuZ2UiLCJlZGl0Q2VsbFZhbHVlVmFsaWRhdGUiLCJvbkNyZWF0ZUNlbGxCbHVyIiwib25DcmVhdGVCbHVyIiwiZ2V0RWRpdEl0ZW1WYWx1ZSIsIm9uRWRpdENlbGxCbHVyIiwib25FZGl0Qmx1ciIsIm9uQ2VsbEZvY3VzIiwiY2VsbFR5cGUiLCJpbnB1dFR5cGUiLCJzZWxlY3QiLCJjZWxsU2VsZWN0IiwiY2VsbFNlbGVjdGlvbkNoYW5nZSIsImlkS2V5UGF0aCIsImdldFNlbGVjdGVkSXRlbUluZGV4IiwiaW5kZXgiLCJlZGl0VmFsdWUiLCJvcmlnaW5hbFZhbHVlIiwiY29tcG9uZW50VHlwZSIsIlN0cmluZyIsInJlcGxhY2UiLCJnZXRDcmVhdGVJdGVtVmFsdWUiLCJ2YWwiLCJnZXRGaWx0ZXJJdGVtVmFsdWUiLCJnZXQiLCJnZXRDb21wb25lbnREaXNhYmxlZFN0YXRlIiwibW9kZSIsImNvbXBvbmVudERpc2FibGVkIiwiZGlzYWJsZUVkaXRpbmciLCJkaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaCIsIm1hdGNoVmFsdWVLZXlQYXRoIiwicm93Q2xhc3NOYW1lcyIsImV4dHJhUm93Q291bnQiLCJwdXNoIiwiaW5kZXhPZiIsInJvd0NsYXNzTmFtZUdldHRlciIsImdldENlbGxNZXNzYWdlcyIsInJldHVybkRhdGEiLCJpbmZvTWVzc2FnZSIsImVycm9yTWVzc2FnZSIsIndhcm5pbmdNZXNzYWdlIiwic2Nyb2xsVG9Sb3ciLCJzY3JvbGxOZXdSb3ciLCJmaXJzdCIsImhhbmRsZUNlbGxTZWxlY3QiLCJoYW5kbGVDcmVhdGVDZWxsUmVmIiwicmVmIiwiZm9jdXMiLCJoYW5kbGVFZGl0Q2VsbFJlZiIsInNlbGVjdGVkUm93SW5kZXgiLCJjb2x1bW5JbmRleCIsInR5cGUiLCJzZXRUaW1lb3V0IiwiaGFuZGxlU2VsZWN0aW9uQ2hlY2tCb3hPbkNoYW5nZSIsIml0ZW1TZWxlY3Rpb25DaGFuZ2UiLCJnZW5lcmF0ZUNvbHVtbnMiLCJleHRyYUNvbHVtbiIsInRhYkluZGV4Iiwid2lkdGgiLCJpc1Jlc2l6YWJsZSIsImlzU29ydGFibGUiLCJjZWxsIiwidmFsdWVSZW5kZXIiLCJjZWxsRWRpdCIsImNlbGxDcmVhdGUiLCJjZWxsRmlsdGVyIiwicm93U2VsZWN0Q2hlY2tib3hDb2x1bW4iLCJyb3dJdGVtIiwiaXRlbUlkIiwic2VsZWN0ZWQiLCJpbmNsdWRlcyIsImZvckVhY2giLCJ2aXNpYmxlQ29sdW1uS2V5Iiwib3JnQ29sIiwiY29sdW1uIiwiaGVhZGVyIiwibWluV2lkdGgiLCJtYXhXaWR0aCIsImRpc2FibGVSZXNpemluZyIsImZpeGVkIiwiYWxsb3dDZWxsc1JlY3ljbGluZyIsImRpc2FibGVTb3J0aW5nIiwiaXNSZXF1aXJlZCIsInN0eWxlIiwiZ2V0Q2VsbFN0eWxlQnlDb2wiLCJmbGV4R3JvdyIsInNvcnRDb21wYXJhdG9yIiwic29ydFZhbHVlR2V0dGVyIiwidmFsdWVFbXB0eUNoZWNrZXIiLCJnZXRWYWx1ZUVtcHR5Q2hlY2tlciIsImZvcm1hdCIsInJlbmRlckNvbXBvbmVudFByb3BzIiwiY3VycmVuY3lLZXlQYXRoIiwidmFsdWVPcHRpb25zIiwiY3VycmVuY3kiLCJkZWNpbWFscyIsImlzVmFsaWQiLCJtb21lbnQiLCJ1dGMiLCJlZGl0VmFsdWVSZW5kZXIiLCJjcmVhdGVWYWx1ZVJlbmRlciIsImZpbHRlclZhbHVlUmVuZGVyIiwiZWRpdFZhbHVlUGFyc2VyIiwiZWRpdENvbXBvbmVudFByb3BzIiwiY3JlYXRlQ29tcG9uZW50UHJvcHMiLCJmaWx0ZXJDb21wb25lbnRQcm9wcyIsIlJlZ0V4cCIsImludGwiLCJzZWxlY3RPcHRpb25zIiwic2VsZWN0Q29tcG9uZW50T3B0aW9ucyIsInNlbGVjdFRyYW5zbGF0aW9ucyIsInNlbGVjdENvbXBvbmVudFRyYW5zbGF0aW9ucyIsInBsYWNlaG9sZGVyIiwiZm9ybWF0TWVzc2FnZSIsIm5vUmVzdWx0c1RleHQiLCJlZGl0U2VsZWN0T3B0aW9uc01vZCIsInNsaWNlIiwiY3JlYXRlU2VsZWN0T3B0aW9uc01vZCIsImZpbHRlclNlbGVjdE9wdGlvbnNNb2QiLCJvbktleURvd24iLCJvbkJsdXIiLCJvbkZvY3VzIiwibGFiZWwiLCJyZW1vdmVOZXdJdGVtIiwiaXNDZWxsRWRpdGVkIiwicm93U2VsZWN0IiwiY3RybEtleSIsImdldFNlbGVjdGlvbiIsInJlbW92ZUFsbFJhbmdlcyIsInBhcmVudE5vZGUiLCJwYXJlbnQxY2xhc3MiLCJjbGFzc05hbWUiLCJwYXJlbnQyY2xhc3MiLCJtdWx0aVNlbGVjdCIsIm9uUm93Q2xpY2siLCJvbkNvbnRleHRNZW51Iiwic3RvcFByb3BhZ2F0aW9uIiwiY29udGV4dE1lbnVYIiwiY2xpZW50WCIsImNvbnRleHRNZW51WSIsImNsaWVudFkiLCJjb250ZXh0TWVudVJvd0luZGV4IiwiYWRkRXZlbnRMaXN0ZW5lciIsImhhbmRsZUNvbnRleHRNZW51SXRlbUNsaWNrIiwib25DbGljayIsInJlbmRlckNlbGwiLCJjZWxsUHJvcHMiLCJpc1NwZWNpYWwiLCJnZXRSb3dJbmRleCIsIm1lc3NhZ2VEYXRhIiwiaXNFZGl0ZWQiLCJ0ZXh0QWxpZ24iLCJsZW5naHQiLCJtYXAiLCJzb3J0Q2hhbmdlIiwiZGlzcGxheSIsInpJbmRleCIsInBvc2l0aW9uIiwidG9wIiwibGVmdCIsIml0ZW0iLCJpIiwiZGl2aWRlciIsInRpdGxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O29EQUFBOzs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUtBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztJQUFZQSxlOztBQUNaOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1DLGtCQUFrQixTQUFsQkEsZUFBa0IsQ0FBQ0MsS0FBRCxFQUFRQyxRQUFSLEVBQXFCO0FBQzNDLE1BQU1DLE9BQU9ELFNBQVNFLElBQXRCO0FBQ0EsU0FBTztBQUNMQyxZQUFRSixNQUFNSyxRQUFOLENBQWVDLEtBQWYsQ0FBcUIsQ0FBQ0osS0FBS0ssRUFBTixFQUFVLFNBQVYsRUFBcUIsUUFBckIsQ0FBckIsRUFBcUQsSUFBckQsQ0FESDtBQUVMQyxlQUFXUixNQUFNSyxRQUFOLENBQWVDLEtBQWYsQ0FBcUIsQ0FBQ0osS0FBS0ssRUFBTixFQUFVLFNBQVYsRUFBcUIsV0FBckIsQ0FBckIsRUFBd0QsS0FBeEQsQ0FGTjtBQUdMRSxnQkFBWVQsTUFBTUssUUFBTixDQUFlQyxLQUFmLENBQXFCLENBQUNKLEtBQUtLLEVBQU4sRUFBVSxTQUFWLEVBQXFCLFlBQXJCLENBQXJCLEVBQXlELEtBQXpELENBSFA7QUFJTEcsaUJBQ0VWLE1BQU1LLFFBQU4sQ0FBZUMsS0FBZixDQUFxQixDQUFDSixLQUFLSyxFQUFOLEVBQVUsUUFBVixFQUFvQixlQUFwQixFQUFxQyxhQUFyQyxDQUFyQixFQUEwRSxLQUExRSxDQUxHO0FBTUxJLCtCQUNFWCxNQUFNSyxRQUFOLENBQWVDLEtBQWYsQ0FBcUIsQ0FBQ0osS0FBS0ssRUFBTixFQUFVLFNBQVYsRUFBcUIscUJBQXJCLEVBQTRDLE1BQTVDLENBQXJCLEVBQTBFLEtBQTFFLENBUEc7QUFRTEssZ0JBQVlaLE1BQU1LLFFBQU4sQ0FBZUMsS0FBZixDQUFxQixDQUFDSixLQUFLSyxFQUFOLEVBQVUsUUFBVixFQUFvQixhQUFwQixFQUFtQyxZQUFuQyxDQUFyQixFQUF1RSxJQUF2RSxDQVJQO0FBU0xNLGVBQVdiLE1BQU1LLFFBQU4sQ0FBZUMsS0FBZixDQUFxQixDQUFDSixLQUFLSyxFQUFOLEVBQVUsUUFBVixFQUFvQixhQUFwQixFQUFtQyxXQUFuQyxDQUFyQixFQUFzRSxJQUF0RSxDQVROO0FBVUxPLG9CQUFnQmQsTUFBTUssUUFBTixDQUFlQyxLQUFmLENBQXFCLENBQUNKLEtBQUtLLEVBQU4sRUFBVSxRQUFWLEVBQW9CLGdCQUFwQixDQUFyQixFQUE0RCxzQkFBNUQsQ0FWWDtBQVdMUSxrQkFBY2YsTUFBTUssUUFBTixDQUFlQyxLQUFmLENBQXFCLENBQUNKLEtBQUtLLEVBQU4sRUFBVSxRQUFWLEVBQW9CLGNBQXBCLENBQXJCLEVBQTBELHFCQUExRCxDQVhUO0FBWUxTLGtCQUFjaEIsTUFBTUssUUFBTixDQUFlQyxLQUFmLENBQXFCLENBQUNKLEtBQUtLLEVBQU4sRUFBVSxjQUFWLENBQXJCLEVBQWdELHFCQUFoRCxDQVpUO0FBYUxVLG1CQUFlakIsTUFBTUssUUFBTixDQUFlQyxLQUFmLENBQXFCLENBQUNKLEtBQUtLLEVBQU4sRUFBVSxlQUFWLENBQXJCLEVBQWlELHNCQUFqRCxDQWJWO0FBY0xXLFVBQU1sQixNQUFNSyxRQUFOLENBQWVDLEtBQWYsQ0FBcUIsQ0FBQ0osS0FBS0ssRUFBTixFQUFVLE1BQVYsQ0FBckIsRUFBd0Msc0JBQXhDLENBZEQ7QUFlTFksY0FBVW5CLE1BQU1LLFFBQU4sQ0FBZUMsS0FBZixDQUFxQixDQUFDSixLQUFLSyxFQUFOLEVBQVUsVUFBVixDQUFyQixFQUE0QyxxQkFBNUMsQ0FmTDtBQWdCTGEsZ0JBQVlwQixNQUFNSyxRQUFOLENBQWVDLEtBQWYsQ0FBcUIsQ0FBQ0osS0FBS0ssRUFBTixFQUFVLFlBQVYsQ0FBckIsRUFBOEMsc0JBQTlDLENBaEJQO0FBaUJMYyxnQkFBWXJCLE1BQU1LLFFBQU4sQ0FBZUMsS0FBZixDQUFxQixDQUFDSixLQUFLSyxFQUFOLEVBQVUsUUFBVixFQUFvQixlQUFwQixFQUFxQyxZQUFyQyxDQUFyQixFQUF5RSxxQkFBekUsQ0FqQlA7QUFrQkxlLGtCQUFjdEIsTUFBTUssUUFBTixDQUFlQyxLQUFmLENBQXFCLENBQUNKLEtBQUtLLEVBQU4sRUFBVSxjQUFWLENBQXJCLEVBQWdELHFCQUFoRCxDQWxCVDtBQW1CTGdCLHdCQUFvQnZCLE1BQU1LLFFBQU4sQ0FBZUMsS0FBZixDQUFxQixDQUFDSixLQUFLSyxFQUFOLEVBQVUsb0JBQVYsQ0FBckIsRUFBc0QscUJBQXRELENBbkJmO0FBb0JMaUIsaUJBQWF4QixNQUFNSyxRQUFOLENBQWVDLEtBQWYsQ0FBcUIsQ0FBQ0osS0FBS0ssRUFBTixFQUFVLFNBQVYsQ0FBckIsRUFBMkMsc0JBQTNDLEVBQW1Ea0IsSUFwQjNEO0FBcUJMQyxjQUFVQyxtQkFBTUMsV0FBTixDQUFrQjFCLElBQWxCLEVBQXdCRixNQUFNNkIsSUFBOUIsQ0FyQkw7QUFzQkxDLGdCQUFZSCxtQkFBTUksYUFBTixDQUFvQjdCLElBQXBCLEVBQTBCRixNQUFNNkIsSUFBaEMsQ0F0QlA7QUF1QkxHLHVCQUFtQkwsbUJBQU1NLG9CQUFOLENBQTJCL0IsSUFBM0IsRUFBaUNGLE1BQU02QixJQUF2QyxDQXZCZDtBQXdCTEssc0JBQWtCUCxtQkFBTVEsbUJBQU4sQ0FBMEJqQyxJQUExQixFQUFnQ0YsTUFBTTZCLElBQXRDO0FBeEJiLEdBQVA7QUEwQkQsQ0E1QkQ7O0FBOEJBLElBQU1PLHFCQUFxQnRDLGVBQTNCOztJQUlxQnVDLFEsV0FEcEIseUJBQVF0QyxlQUFSLEVBQXlCcUMsa0JBQXpCLEMsTUFEQUUscUI7OztBQU1DLG9CQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsaURBQ2pCLGdDQUFNQSxLQUFOLENBRGlCOztBQUFBOztBQUVqQixVQUFLdkMsS0FBTCxHQUFhO0FBQ1h3QyxrQkFBWSxDQUREO0FBRVhDLHFCQUFlO0FBRkosS0FBYjtBQUlBLFVBQUtDLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxVQUFLQyxpQkFBTCxHQUF5QixLQUF6QjtBQUNBLFVBQUtDLGVBQUwsR0FBdUIsS0FBdkIsQ0FSaUIsQ0FRYTtBQUM5QixVQUFLQyxnQkFBTCxHQUF3QixLQUF4QixDQVRpQixDQVNjO0FBVGQ7QUFVbEI7O3FCQUVEQyxvQixtQ0FBdUI7QUFDckJDLGFBQVNDLG1CQUFULENBQTZCLE9BQTdCLEVBQXNDLEtBQUtDLGVBQTNDO0FBQ0EsU0FBS1YsS0FBTCxDQUFXVyxVQUFYLENBQXNCLEtBQUtYLEtBQUwsQ0FBV3BDLElBQWpDO0FBQ0QsRzs7cUJBNHVDRGdELE0scUJBQVM7QUFDUCxRQUFNQyxnQkFBZ0IsMEJBQVc7QUFDL0IsK0JBQXlCLElBRE07QUFFL0Isd0JBQWtCLEtBQUtiLEtBQUwsQ0FBV2MsVUFBWCxJQUF5QixDQUFDLEtBQUtkLEtBQUwsQ0FBV2UsZ0JBRnhCO0FBRy9CLGlCQUFXLEtBQUtmLEtBQUwsQ0FBV25DLE1BSFM7QUFJL0Isb0JBQWMsS0FBS21DLEtBQUwsQ0FBVy9CLFNBSk07QUFLL0IscUJBQWUsS0FBSytCLEtBQUwsQ0FBVzlCO0FBTEssS0FBWCxDQUF0QjtBQU9BLFFBQUk4QyxZQUFZLElBQWhCO0FBQ0EsUUFBSUMsaUJBQWlCLElBQXJCO0FBQ0EsUUFBSUMsZ0JBQWdCLElBQXBCO0FBQ0EsUUFDRSxDQUFDLEtBQUtsQixLQUFMLENBQVdnQixTQUFYLElBQ0QsS0FBS2hCLEtBQUwsQ0FBV2MsVUFEVixJQUVELEtBQUtkLEtBQUwsQ0FBV21CLFNBRlYsSUFHRCxLQUFLbkIsS0FBTCxDQUFXb0IsUUFIWCxLQUlBLENBQUMsS0FBS3BCLEtBQUwsQ0FBV2UsZ0JBTGQsRUFNRTtBQUNBRSx1QkFDRTtBQUFDLDJCQUFEO0FBQUEsVUFBVyxVQUFTLE9BQXBCO0FBQ0U7QUFBQTtBQUFBLFlBQUssV0FBVSw2QkFBZjtBQUErQyxlQUFLakIsS0FBTCxDQUFXZ0I7QUFBMUQsU0FERjtBQUVLLGFBQUtoQixLQUFMLENBQVdtQixTQUFYLElBQXdCLEtBQUtuQixLQUFMLENBQVdxQixlQUFuQyxJQUNFLENBQUMsS0FBS3JCLEtBQUwsQ0FBV3NCLHdCQURmLElBRUEsOEJBQUMsMkJBQUQsRUFBdUIsS0FBS3RCLEtBQTVCLENBSko7QUFNSSxhQUFLQSxLQUFMLENBQVdjLFVBQVgsSUFDQSw4QkFBQyw0QkFBRDtBQUNFLHdCQUFjLEtBQUtTLGtCQURyQjtBQUVFLDBCQUFnQixLQUFLQyxvQkFGdkI7QUFHRSxnQ0FBc0IsS0FBS0M7QUFIN0IsV0FJTSxLQUFLekIsS0FKWCxFQVBKO0FBY0ksU0FBQyxLQUFLQSxLQUFMLENBQVcwQixpQkFBWCxJQUNBLEtBQUsxQixLQUFMLENBQVdvQixRQURYLElBRUEsS0FBS3BCLEtBQUwsQ0FBVzJCLGNBRlgsSUFHQyxLQUFLM0IsS0FBTCxDQUFXbUIsU0FBWCxJQUF3QixDQUFDLEtBQUtuQixLQUFMLENBQVdxQixlQUh0QyxLQUlDLDhCQUFDLDBCQUFELEVBQXNCLEtBQUtyQixLQUEzQjtBQWxCTCxPQURGO0FBdUJEO0FBQ0QsUUFBSSxLQUFLQSxLQUFMLENBQVdrQixhQUFYLElBQTRCLEtBQUtsQixLQUFMLENBQVc0QixVQUEzQyxFQUF1RDtBQUNyRFYsc0JBQ0U7QUFBQywyQkFBRDtBQUFBLFVBQVcsVUFBUyxNQUFwQjtBQUNFO0FBQUE7QUFBQSxZQUFLLFdBQVUsd0JBQWY7QUFBMEMsZUFBS2xCLEtBQUwsQ0FBVzRCO0FBQXJELFNBREY7QUFFRTtBQUFBO0FBQUEsWUFBSyxXQUFVLDRCQUFmO0FBQThDLGVBQUs1QixLQUFMLENBQVdrQjtBQUF6RDtBQUZGLE9BREY7QUFNRDtBQUNELFFBQUlBLGlCQUFpQkQsY0FBckIsRUFBcUM7QUFDbkNELGtCQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsaUNBQWY7QUFDSUUscUJBREo7QUFFSUQ7QUFGSixPQURGO0FBTUQ7QUFDRCxRQUFJWSxZQUNELEtBQUs3QixLQUFMLENBQVc2QixTQUFYLElBQXdCLEtBQUs3QixLQUFMLENBQVc2QixTQUFYLEtBQXlCLENBQWxELEdBQ0UsS0FBSzdCLEtBQUwsQ0FBVzZCLFNBRGIsR0FFRSxLQUFLN0IsS0FBTCxDQUFXckIsSUFBWCxDQUFnQk8sSUFIcEI7QUFJQSxRQUFJLEtBQUtjLEtBQUwsQ0FBVzlCLFVBQWYsRUFBMkIyRCxhQUFhLEtBQUs3QixLQUFMLENBQVduQixVQUFYLENBQXNCSyxJQUFuQztBQUMzQixRQUFJLENBQUMsS0FBS2MsS0FBTCxDQUFXekIsY0FBWCxDQUEwQlcsSUFBL0IsRUFBcUMyQyxZQUFZLENBQVo7QUFDckMsV0FDRTtBQUFBO0FBQUE7QUFDRSw2QkFBbUIsS0FBSzdCLEtBQUwsQ0FBV3BDLElBQVgsQ0FBZ0JJLEVBRHJDO0FBRUUsbUJBQVc2QyxhQUZiO0FBR0UsZUFBTyxLQUFLYixLQUFMLENBQVc4QjtBQUhwQjtBQUtJLFdBQUs5QixLQUFMLENBQVduQyxNQUFYLElBQXFCLDhCQUFDLHFCQUFELE9BTHpCO0FBTUksV0FBS0osS0FBTCxDQUFXc0UsZUFBWCxJQUE4QixLQUFLQyxpQkFBTCxFQU5sQztBQU9JaEIsZUFQSjtBQVFFO0FBQUMsMENBQUQ7QUFBQTtBQUNFLGNBQUksS0FBS2hCLEtBQUwsQ0FBV3BDLElBQVgsQ0FBZ0JJLEVBRHRCO0FBRUUscUJBQVc2RCxTQUZiO0FBR0Usd0JBQWMsS0FBSzdCLEtBQUwsQ0FBVzdCLFdBQVgsR0FDWixLQUFLNkIsS0FBTCxDQUFXaUMsWUFBWCxHQUEwQixLQUFLakMsS0FBTCxDQUFXa0MsZUFEekIsR0FFVixLQUFLbEMsS0FBTCxDQUFXaUMsWUFMakI7QUFNRSxxQkFBVyxLQUFLakMsS0FBTCxDQUFXbUMsU0FOeEI7QUFPRSxxQ0FBMkIsS0FBS0MseUJBUGxDO0FBUUUsNEJBQWtCLEtBUnBCO0FBU0Usc0JBQVksS0FBS0MsY0FUbkI7QUFVRSwwQkFBZ0IsS0FBS3JDLEtBQUwsQ0FBV3NDLGNBQVgsSUFBNkIsS0FBSzdFLEtBQUwsQ0FBV3lDLGFBVjFEO0FBV0UscUJBQVcsS0FBS0YsS0FBTCxDQUFXdUMsU0FYeEI7QUFZRSx1QkFBYSxLQUFLQyxjQUFMLEVBWmY7QUFhRSw0QkFBa0IsS0FBS3hDLEtBQUwsQ0FBV3lDLGdCQWIvQjtBQWNFLDBCQUFnQixLQUFLekMsS0FBTCxDQUFXMEMsV0FkN0I7QUFlRSwyQkFBaUIsS0FBSzFDLEtBQUwsQ0FBVzJDLGVBZjlCO0FBZ0JFLDJCQUFpQixLQUFLM0MsS0FBTCxDQUFXNEMsZUFoQjlCO0FBaUJFLHlCQUFlLEtBQUs1QyxLQUFMLENBQVc2QyxhQWpCNUI7QUFrQkUsdUJBQWEsS0FBSzdDLEtBQUwsQ0FBVzhDLFdBbEIxQjtBQW1CRSw4QkFBb0IsS0FBS0MsZUFuQjNCO0FBb0JFLDJCQUFpQixLQUFLL0MsS0FBTCxDQUFXZ0QsZUFwQjlCO0FBcUJFLGlDQUF1QixLQUFLaEQsS0FBTCxDQUFXaUQscUJBckJwQztBQXNCRSw0QkFBa0IsS0FBS0M7QUF0QnpCO0FBd0JJLGFBQUtDLGFBQUw7QUF4QkosT0FSRjtBQWtDSSxXQUFLbkQsS0FBTCxDQUFXNUIseUJBQVgsSUFDQSw4QkFBQyx3QkFBRDtBQUNFLGNBQU0sS0FBSzRCLEtBQUwsQ0FBV3BDLElBRG5CO0FBRUUsaUJBQVMsS0FBS29DLEtBQUwsQ0FBV29ELE9BRnRCO0FBR0Usd0JBQWdCLEtBQUtwRCxLQUFMLENBQVd6QixjQUg3QjtBQUlFLGtDQUEwQixLQUFLeUIsS0FBTCxDQUFXcUQsd0JBSnZDO0FBS0UsNEJBQW9CLEtBQUtyRCxLQUFMLENBQVdzRDtBQUxqQyxRQW5DSjtBQTJDSSxXQUFLdEQsS0FBTCxDQUFXdUQ7QUEzQ2YsS0FERjtBQStDRCxHOzs7RUE5MkNtQ0MsZ0JBQU1DLGEsV0FFbkNDLFksR0FBZUEsdUI7OztPQW1CdEJoRCxlLEdBQWtCLFlBQU07QUFDdEIsUUFBSSxPQUFLVixLQUFMLENBQVcyRCxnQkFBZixFQUFpQztBQUMvQixhQUFLQyxRQUFMLENBQWM7QUFDWjdCLHlCQUFpQjtBQURMLE9BQWQ7QUFHRDtBQUNEdkIsYUFBU0MsbUJBQVQsQ0FBNkIsT0FBN0IsRUFBc0MsT0FBS0MsZUFBM0M7QUFDRCxHOztPQUVEMEIseUIsR0FBNEIsVUFBQ3lCLGNBQUQsRUFBaUJDLFNBQWpCLEVBQStCO0FBQ3pELFdBQUs5RCxLQUFMLENBQVcrRCxZQUFYLENBQXdCLE9BQUsvRCxLQUFMLENBQVdwQyxJQUFuQyxFQUF5Q2tHLFNBQXpDLEVBQW9ERCxjQUFwRDtBQUNELEc7O09BRURHLG1CLEdBQXNCLFVBQUNDLENBQUQsRUFBTztBQUMzQixRQUFJQSxFQUFFQyxPQUFGLEtBQWNDLHFCQUFVQyxLQUE1QixFQUFtQztBQUNqQyxhQUFLcEUsS0FBTCxDQUFXcUUsVUFBWCxDQUFzQixPQUFLckUsS0FBTCxDQUFXcEMsSUFBakMsRUFBdUN3QixtQkFBTWtGLHNCQUFOLENBQTZCLE9BQUt0RSxLQUFMLENBQVdvRCxPQUF4QyxDQUF2QztBQUNBLGFBQUtoRCxpQkFBTCxHQUF5QixJQUF6QjtBQUNEO0FBQ0YsRzs7T0FFRG1FLGlCLEdBQW9CLFVBQUNDLEdBQUQsRUFBTUMsUUFBTjtBQUFBLFdBQW1CLFVBQUNSLENBQUQsRUFBTztBQUM1QyxVQUFJLE9BQUtqRSxLQUFMLENBQVcwRSxxQkFBZixFQUFzQztBQUFBLFlBQzVCdEIsT0FENEIsR0FDaEIsT0FBS3BELEtBRFcsQ0FDNUJvRCxPQUQ0Qjs7QUFFcEMsWUFBTXVCLFdBQVcsT0FBSzNFLEtBQUwsQ0FBV3JCLElBQVgsQ0FBZ0JPLElBQWpDO0FBQ0EsWUFBTTRFLFlBQVkxRSxtQkFBTXdGLFlBQU4sQ0FBbUJKLEdBQW5CLENBQWxCO0FBQ0EsZ0JBQVFQLEVBQUVDLE9BQVY7QUFDRSxlQUFLQyxxQkFBVVUsSUFBZjtBQUFxQjtBQUNuQixrQkFBSUwsSUFBSU0sU0FBSixLQUFrQixRQUF0QixFQUFnQztBQUM5QixvQkFBTUMsY0FBYyxPQUFLNUUsUUFBTCxDQUFpQixPQUFLSCxLQUFMLENBQVdwQyxJQUFYLENBQWdCSSxFQUFqQyxTQUF1QzhGLFNBQXZDLFVBQW9EVyxXQUFXLENBQS9ELEVBQXBCO0FBQ0EsdUJBQUtPLGFBQUwsQ0FBbUJELFdBQW5CLEVBQWdDTixXQUFXLENBQTNDLEVBQThDLENBQUMsQ0FBL0M7QUFDRDtBQUNEO0FBQ0Q7QUFDRCxlQUFLTixxQkFBVWMsRUFBZjtBQUFtQjtBQUNqQixrQkFBSVQsSUFBSU0sU0FBSixLQUFrQixRQUF0QixFQUFnQztBQUM5QixvQkFBTUMsZUFBYyxPQUFLNUUsUUFBTCxDQUFpQixPQUFLSCxLQUFMLENBQVdwQyxJQUFYLENBQWdCSSxFQUFqQyxTQUF1QzhGLFNBQXZDLFVBQW9EVyxXQUFXLENBQS9ELEVBQXBCO0FBQ0EsdUJBQUtPLGFBQUwsQ0FBbUJELFlBQW5CLEVBQWdDTixXQUFXLENBQTNDLEVBQThDLENBQUMsQ0FBL0M7QUFDRDtBQUNEO0FBQ0Q7QUFDRCxlQUFLTixxQkFBVWUsR0FBZjtBQUNBLGVBQUtmLHFCQUFVZ0IsS0FBZjtBQUNBLGVBQUtoQixxQkFBVWlCLElBQWY7QUFBcUI7QUFDbkJuQixnQkFBRW9CLGNBQUY7QUFDQSxrQkFBSUMsWUFBWWxDLFFBQVFtQyxTQUFSLENBQWtCO0FBQUEsdUJBQUtDLEVBQUVDLFlBQUYsQ0FBZUMsSUFBZixPQUEwQjVCLFNBQS9CO0FBQUEsZUFBbEIsQ0FBaEI7QUFDQSxrQkFBSXdCLGNBQWMsQ0FBQyxDQUFuQixFQUFzQjtBQUNwQixvQkFBSUssV0FBVyxJQUFmO0FBQ0Esb0JBQUlaLGdCQUFjLElBQWxCO0FBQ0Esb0JBQUlhLFNBQVNuQixRQUFiO0FBQ0EsdUJBQU9rQixRQUFQLEVBQWlCO0FBQ2Ysc0JBQUkxQixFQUFFQyxPQUFGLEtBQWNDLHFCQUFVaUIsSUFBeEIsSUFBaUNuQixFQUFFQyxPQUFGLEtBQWNDLHFCQUFVZSxHQUF4QixJQUErQmpCLEVBQUU0QixRQUF0RSxFQUFpRjtBQUMvRSx3QkFBSVAsWUFBWSxDQUFaLElBQWlCLENBQXJCLEVBQXdCO0FBQ3RCQSxtQ0FBYSxDQUFiO0FBQ0QscUJBRkQsTUFFTyxJQUFJTSxTQUFTLENBQVQsSUFBYyxDQUFsQixFQUFxQjtBQUMxQk4sa0NBQVlsQyxRQUFRMEMsTUFBUixHQUFpQixDQUE3QjtBQUNBRixnQ0FBVSxDQUFWO0FBQ0QscUJBSE0sTUFHQTtBQUNMO0FBQ0Q7QUFDRixtQkFURCxNQVNPO0FBQ0wsd0JBQUlOLFlBQVksQ0FBWixHQUFnQmxDLFFBQVEwQyxNQUE1QixFQUFvQztBQUNsQ1IsbUNBQWEsQ0FBYjtBQUNELHFCQUZELE1BRU8sSUFBSU0sU0FBUyxDQUFULEdBQWFqQixRQUFqQixFQUEyQjtBQUNoQ1csa0NBQVksQ0FBWjtBQUNBTSxnQ0FBVSxDQUFWO0FBQ0QscUJBSE0sTUFHQTtBQUNMO0FBQ0Q7QUFDRjtBQUNELHNCQUFNRyxnQkFBZ0IzRyxtQkFBTXdGLFlBQU4sQ0FBbUJ4QixRQUFRa0MsU0FBUixDQUFuQixDQUF0QjtBQUNBUCxrQ0FBYyxPQUFLNUUsUUFBTCxDQUFpQixPQUFLSCxLQUFMLENBQVdwQyxJQUFYLENBQWdCSSxFQUFqQyxTQUF1QytILGFBQXZDLFNBQXdESCxNQUF4RCxDQUFkO0FBQ0FELDZCQUFXWixnQkFBY0EsY0FBWVksUUFBMUIsR0FBcUMsS0FBaEQ7QUFDRDtBQUNELG9CQUFJLENBQUNBLFFBQUQsSUFBYVosYUFBakIsRUFBOEI7QUFDNUIseUJBQUtDLGFBQUwsQ0FBbUJELGFBQW5CLEVBQWdDYSxNQUFoQyxFQUF3Q04sU0FBeEM7QUFDRDtBQUNGO0FBQ0Q7QUFDRDtBQUNEO0FBQ0U7QUF2REo7QUF5REQ7QUFDRixLQS9EbUI7QUFBQSxHOztPQWlFcEJVLHVCLEdBQTBCLFVBQUN4QixHQUFELEVBQU15QixXQUFOO0FBQUEsV0FBc0IsVUFBQ0MsV0FBRCxFQUFpQjtBQUMvRCxVQUFJQyxpQkFBSjtBQUNBO0FBQ0EsVUFBSUQsV0FBSixFQUFpQjtBQUNmLFlBQUlBLFlBQVlFLE1BQVosS0FBdUJDLFNBQTNCLEVBQXNDRixXQUFXRCxZQUFZRSxNQUFaLENBQW1CRSxLQUE5QixDQUF0QyxLQUNLLElBQUlKLFlBQVlJLEtBQVosS0FBc0JELFNBQTFCLEVBQXFDRixXQUFXRCxZQUFZSSxLQUF2QixDQUFyQyxLQUNBSCxXQUFXRCxXQUFYO0FBQ047QUFDRCxVQUFNSSxRQUFRTCxZQUFZRSxRQUFaLENBQWQ7QUFDQSxhQUFLbkcsS0FBTCxDQUFXdUcscUJBQVgsQ0FDRSxPQUFLdkcsS0FBTCxDQUFXcEMsSUFEYixFQUVFLE9BQUtvQyxLQUFMLENBQVdvRCxPQUZiLEVBR0VvQixHQUhGLEVBSUU4QixLQUpGO0FBTUQsS0FmeUI7QUFBQSxHOztPQWlCMUJFLHVCLEdBQTBCLFVBQUMvQixRQUFELEVBQVdELEdBQVgsRUFBZ0J5QixXQUFoQjtBQUFBLFdBQWdDLFVBQUNDLFdBQUQsRUFBaUI7QUFDekUsVUFBSUMsaUJBQUo7QUFDQTtBQUNBLFVBQUlELFdBQUosRUFBaUI7QUFDZixZQUFJQSxZQUFZRSxNQUFaLEtBQXVCQyxTQUEzQixFQUFzQ0YsV0FBV0QsWUFBWUUsTUFBWixDQUFtQkUsS0FBOUIsQ0FBdEMsS0FDSyxJQUFJSixZQUFZSSxLQUFaLEtBQXNCRCxTQUExQixFQUFxQ0YsV0FBV0QsWUFBWUksS0FBdkIsQ0FBckMsS0FDQUgsV0FBV0QsV0FBWDtBQUNOO0FBQ0QsVUFBTUksUUFBUUwsWUFBWUUsUUFBWixDQUFkO0FBQ0EsYUFBS25HLEtBQUwsQ0FBV3lHLHFCQUFYLENBQWlDLE9BQUt6RyxLQUFMLENBQVdwQyxJQUE1QyxFQUFrRDZHLFFBQWxELEVBQTRERCxJQUFJaUIsWUFBaEUsRUFBOEVhLEtBQTlFO0FBQ0EsVUFBSTlCLElBQUlrQyxtQkFBUixFQUE2QjtBQUMzQmxDLFlBQUlrQyxtQkFBSixDQUF3QkosS0FBeEIsRUFBK0I5QixJQUFJaUIsWUFBbkMsRUFBaURoQixRQUFqRDtBQUNEO0FBQ0QsVUFBSUQsSUFBSW1DLHVCQUFKLElBQStCTCxVQUFVOUIsSUFBSW1DLHVCQUFKLENBQTRCQyxVQUF6RSxFQUFxRjtBQUNuRjtBQUNBLGVBQUtKLHVCQUFMLENBQ0UvQixRQURGLEVBRUUsRUFBRWdCLGNBQWNqQixJQUFJbUMsdUJBQUosQ0FBNEJFLGVBQTVDLEVBRkYsRUFHRTtBQUFBLGlCQUFLQyxDQUFMO0FBQUEsU0FIRixFQUlFdEMsSUFBSW1DLHVCQUFKLENBQTRCSSxRQUo5QjtBQUtEO0FBQ0QsVUFBSXZDLElBQUl3QyxVQUFSLEVBQW9CO0FBQ2xCLGVBQUtoSCxLQUFMLENBQVdpSCx1QkFBWCxDQUNFLE9BQUtqSCxLQUFMLENBQVdwQyxJQURiLEVBRUU2RyxRQUZGLEVBR0VELElBQUlpQixZQUhOLEVBSUVhLEtBSkYsRUFLRTlCLElBQUl3QyxVQUxOO0FBT0Q7QUFDRixLQTlCeUI7QUFBQSxHOztPQWdDMUJFLHFCLEdBQXdCLFVBQUN6QyxRQUFELEVBQVdELEdBQVgsRUFBZ0J5QixXQUFoQjtBQUFBLFdBQWdDLFVBQUNDLFdBQUQsRUFBaUI7QUFDdkUsVUFBTWlCLFNBQVMsT0FBS0MsbUJBQUwsQ0FBeUIzQyxRQUF6QixDQUFmO0FBQ0EsVUFBSTBCLGlCQUFKO0FBQ0E7QUFDQSxVQUFJRCxXQUFKLEVBQWlCO0FBQ2YsWUFBSUEsWUFBWUUsTUFBWixLQUF1QkMsU0FBM0IsRUFBc0NGLFdBQVdELFlBQVlFLE1BQVosQ0FBbUJFLEtBQTlCLENBQXRDLEtBQ0ssSUFBSUosWUFBWUksS0FBWixLQUFzQkQsU0FBMUIsRUFBcUNGLFdBQVdELFlBQVlJLEtBQXZCLENBQXJDLEtBQ0FILFdBQVdELFdBQVg7QUFDTjtBQUNELFVBQU1JLFFBQVFMLFlBQVlFLFFBQVosQ0FBZDtBQUNBLGFBQUtuRyxLQUFMLENBQVdxSCxtQkFBWCxDQUErQixPQUFLckgsS0FBTCxDQUFXcEMsSUFBMUMsRUFBZ0R1SixNQUFoRCxFQUF3RDNDLElBQUlpQixZQUE1RCxFQUEwRWEsS0FBMUU7QUFDQSxVQUFJOUIsSUFBSThDLGlCQUFSLEVBQTJCO0FBQ3pCOUMsWUFBSThDLGlCQUFKLENBQXNCaEIsS0FBdEIsRUFBNkI5QixJQUFJaUIsWUFBakMsRUFBK0NoQixRQUEvQyxFQUF5RDBDLE1BQXpEO0FBQ0Q7QUFDRCxVQUFJM0MsSUFBSW1DLHVCQUFKLElBQStCTCxVQUFVOUIsSUFBSW1DLHVCQUFKLENBQTRCQyxVQUF6RSxFQUFxRjtBQUNuRjtBQUNBLGVBQUtNLHFCQUFMLENBQ0V6QyxRQURGLEVBRUUsRUFBRWdCLGNBQWNqQixJQUFJbUMsdUJBQUosQ0FBNEJFLGVBQTVDLEVBRkYsRUFHRTtBQUFBLGlCQUFLQyxDQUFMO0FBQUEsU0FIRixFQUlFdEMsSUFBSW1DLHVCQUFKLENBQTRCSSxRQUo5QjtBQUtEO0FBQ0QsVUFBSXZDLElBQUl3QyxVQUFSLEVBQW9CO0FBQ2xCLGVBQUtoSCxLQUFMLENBQVd1SCxxQkFBWCxDQUNFLE9BQUt2SCxLQUFMLENBQVdwQyxJQURiLEVBRUV1SixNQUZGLEVBR0UzQyxJQUFJaUIsWUFITixFQUlFYSxLQUpGLEVBS0U5QixJQUFJd0MsVUFMTjtBQU9EO0FBQ0YsS0EvQnVCO0FBQUEsRzs7T0FpQ3hCUSxnQixHQUFtQixVQUFDL0MsUUFBRCxFQUFXRCxHQUFYLEVBQWdCeUIsV0FBaEI7QUFBQSxXQUFnQyxVQUFDaEMsQ0FBRCxFQUFPO0FBQ3hELFVBQUlPLElBQUlpRCxZQUFSLEVBQXNCO0FBQ3BCLFlBQUluQixRQUFTckMsS0FBS0EsRUFBRW1DLE1BQVAsSUFBaUJuQyxFQUFFbUMsTUFBRixDQUFTRSxLQUFULEtBQW1CRCxTQUFyQyxHQUNWcEMsRUFBRW1DLE1BQUYsQ0FBU0UsS0FEQyxHQUVWLE9BQUtvQixnQkFBTCxDQUFzQmpELFFBQXRCLEVBQWdDRCxHQUFoQyxDQUZGO0FBR0EsWUFBSXlCLGdCQUFnQkksU0FBcEIsRUFBK0I7QUFDN0JDLGtCQUFRTCxZQUFZSyxLQUFaLENBQVI7QUFDRDtBQUNEOUIsWUFBSWlELFlBQUosQ0FBaUJuQixLQUFqQixFQUF3QjdCLFFBQXhCO0FBQ0Q7QUFDRixLQVZrQjtBQUFBLEc7O09BWW5Ca0QsYyxHQUFpQixVQUFDbEQsUUFBRCxFQUFXRCxHQUFYLEVBQWdCeUIsV0FBaEI7QUFBQSxXQUFnQyxVQUFDaEMsQ0FBRCxFQUFPO0FBQ3RELFVBQUlPLElBQUlvRCxVQUFSLEVBQW9CO0FBQ2xCLFlBQUl0QixRQUFTckMsS0FBS0EsRUFBRW1DLE1BQVAsSUFBaUJuQyxFQUFFbUMsTUFBRixDQUFTRSxLQUFULEtBQW1CRCxTQUFyQyxHQUNWcEMsRUFBRW1DLE1BQUYsQ0FBU0UsS0FEQyxHQUVWLE9BQUtvQixnQkFBTCxDQUFzQmpELFFBQXRCLEVBQWdDRCxHQUFoQyxDQUZGO0FBR0EsWUFBSXlCLGdCQUFnQkksU0FBcEIsRUFBK0I7QUFDN0JDLGtCQUFRTCxZQUFZSyxLQUFaLENBQVI7QUFDRDtBQUNELFlBQU1hLFNBQVMsT0FBS0MsbUJBQUwsQ0FBeUIzQyxRQUF6QixDQUFmO0FBQ0FELFlBQUlvRCxVQUFKLENBQWV0QixLQUFmLEVBQXNCN0IsUUFBdEIsRUFBZ0MwQyxNQUFoQztBQUNEO0FBQ0YsS0FYZ0I7QUFBQSxHOztPQWFqQlUsVyxHQUFjLFVBQUNDLFFBQUQsRUFBV0MsU0FBWCxFQUFzQnRELFFBQXRCLEVBQWdDWCxTQUFoQztBQUFBLFdBQThDLFVBQUNHLENBQUQsRUFBTztBQUNqRSxVQUFJOEQsY0FBYyxRQUFsQixFQUE0QjtBQUMxQjlELFVBQUVtQyxNQUFGLENBQVM0QixNQUFUO0FBQ0Q7QUFDRCxVQUFJRixhQUFhLE1BQWIsSUFBdUIsT0FBSzlILEtBQUwsQ0FBV2lJLFVBQXRDLEVBQWtEO0FBQ2hELGVBQUtqSSxLQUFMLENBQVdrSSxtQkFBWCxDQUErQixPQUFLbEksS0FBTCxDQUFXcEMsSUFBMUMsRUFBZ0Qsb0JBQUksRUFBRTZHLGtCQUFGLEVBQVlYLG9CQUFaLEVBQUosQ0FBaEQ7QUFDRDtBQUNGLEtBUGE7QUFBQSxHOztPQVNkc0QsbUIsR0FBc0I7QUFBQSxXQUNwQixPQUFLcEgsS0FBTCxDQUFXckIsSUFBWCxDQUFnQlosS0FBaEIsRUFBdUIwRyxRQUF2QixTQUFvQyxPQUFLekUsS0FBTCxDQUFXcEMsSUFBWCxDQUFnQnVLLFNBQXBELEVBRG9CO0FBQUEsRzs7T0FHdEJDLG9CLEdBQXVCLFVBQUNwSyxFQUFELEVBQVE7QUFDN0IsUUFBSSxDQUFDQSxFQUFMLEVBQVMsT0FBT3FJLFNBQVA7QUFDVCxRQUFNZ0MsUUFBUSxPQUFLckksS0FBTCxDQUFXckIsSUFBWCxDQUFnQjRHLFNBQWhCLENBQTBCO0FBQUEsYUFBS3VCLEVBQUUvSSxLQUFGLENBQVEsT0FBS2lDLEtBQUwsQ0FBV3BDLElBQVgsQ0FBZ0J1SyxTQUF4QixNQUF1Q25LLEVBQTVDO0FBQUEsS0FBMUIsQ0FBZDtBQUNBLFdBQU9xSyxVQUFVLENBQUMsQ0FBWCxHQUFlaEMsU0FBZixHQUEyQmdDLEtBQWxDO0FBQ0QsRzs7T0FFRFgsZ0IsR0FBbUIsVUFBQ2pELFFBQUQsRUFBV0QsR0FBWCxFQUFtQjtBQUNwQztBQUNBLFFBQU14RyxLQUFLLE9BQUtvSixtQkFBTCxDQUF5QjNDLFFBQXpCLENBQVg7QUFDQSxRQUFNNkQsWUFBWSxPQUFLdEksS0FBTCxDQUFXcEIsUUFBWCxDQUFvQmIsS0FBcEIsRUFBMkJDLEVBQTNCLFNBQWtDd0csSUFBSWlCLFlBQXRDLEdBQXFEWSxTQUFyRCxDQUFsQjtBQUNBLFFBQUlrQyxzQkFBSjtBQUNBLFFBQUlELGNBQWNqQyxTQUFsQixFQUE2QjtBQUMzQmtDLHNCQUFnQixPQUFLdkksS0FBTCxDQUFXckIsSUFBWCxDQUFnQlosS0FBaEIsRUFBdUIwRyxRQUF2QixTQUFvQ0QsSUFBSWlCLFlBQXhDLEdBQXVELEVBQXZELENBQWhCO0FBQ0QsS0FGRCxNQUVPLElBQUk2QyxjQUFjLElBQWxCLEVBQXdCO0FBQzdCLGFBQU8sRUFBUDtBQUNELEtBRk0sTUFFQTtBQUNMLGFBQU9BLFNBQVA7QUFDRDtBQUNELFFBQUlDLGtCQUFrQixJQUFsQixJQUEwQkEsa0JBQWtCbEMsU0FBNUMsSUFBeURrQyxrQkFBa0IsRUFBL0UsRUFBbUY7QUFDakYsYUFBTyxFQUFQO0FBQ0Q7QUFDRDtBQUNBLFFBQ0UvRCxJQUFJZ0UsYUFBSixLQUFzQixPQUF0QixJQUNBQyxPQUFPRixhQUFQLEVBQXNCekMsTUFBdEIsR0FBK0IsQ0FGakMsRUFHRTtBQUNBLGFBQU8yQyxPQUFPRixhQUFQLEVBQXNCRyxPQUF0QixDQUE4QixHQUE5QixFQUFtQyxPQUFLMUksS0FBTCxDQUFXTCxnQkFBOUMsQ0FBUDtBQUNEO0FBQ0QsV0FBTzRJLGFBQVA7QUFDRCxHOztPQUVESSxrQixHQUFxQixVQUFDbEUsUUFBRCxFQUFXRCxHQUFYLEVBQW1CO0FBQ3RDLFFBQU1vRSxNQUFNLE9BQUs1SSxLQUFMLENBQVduQixVQUFYLENBQXNCZCxLQUF0QixFQUE2QjBHLFFBQTdCLFNBQTBDRCxJQUFJaUIsWUFBOUMsR0FBNkQsRUFBN0QsQ0FBWjtBQUNBLFFBQUltRCxRQUFRLElBQVosRUFBa0I7QUFDaEIsYUFBTyxFQUFQO0FBQ0Q7QUFDRCxXQUFPQSxHQUFQO0FBQ0QsRzs7T0FFREMsa0IsR0FBcUIsVUFBQ3JFLEdBQUQsRUFBUztBQUM1QixRQUFNb0UsTUFBTSxPQUFLNUksS0FBTCxDQUFXbEIsVUFBWCxDQUFzQmdLLEdBQXRCLENBQTBCMUosbUJBQU13RixZQUFOLENBQW1CSixHQUFuQixDQUExQixFQUFtRCxFQUFuRCxDQUFaO0FBQ0EsUUFBSW9FLFFBQVEsSUFBWixFQUFrQjtBQUNoQixhQUFPLEVBQVA7QUFDRDtBQUNELFdBQU9BLEdBQVA7QUFDRCxHOztPQUVERyx5QixHQUE0QixVQUFDdEUsUUFBRCxFQUFXRCxHQUFYLEVBQWdCd0UsSUFBaEIsRUFBeUI7QUFDbkQsUUFBSUMsb0JBQW9CLENBQUMsQ0FBQ3pFLElBQUkwRSxjQUE5QjtBQUNBO0FBQ0EsUUFBSSxDQUFDRCxpQkFBRCxJQUFzQnpFLElBQUkyRSwwQkFBOUIsRUFBMEQ7QUFDeEQsVUFBSUgsU0FBUyxRQUFiLEVBQXVCO0FBQ3JCQyw0QkFBb0IsT0FBS04sa0JBQUwsQ0FDbEJsRSxRQURrQixFQUVsQixFQUFFZ0IsY0FBY2pCLElBQUkyRSwwQkFBSixDQUErQkMsaUJBQS9DLEVBRmtCLE1BR2Q1RSxJQUFJMkUsMEJBQUosQ0FBK0J2QyxVQUhyQztBQUlELE9BTEQsTUFLTztBQUNMcUMsNEJBQW9CLE9BQUt2QixnQkFBTCxDQUNsQmpELFFBRGtCLEVBRWxCLEVBQUVnQixjQUFjakIsSUFBSTJFLDBCQUFKLENBQStCQyxpQkFBL0MsRUFGa0IsTUFHZDVFLElBQUkyRSwwQkFBSixDQUErQnZDLFVBSHJDO0FBSUQ7QUFDRjtBQUNELFdBQU9xQyxpQkFBUDtBQUNELEc7O09BRURsRyxlLEdBQWtCLFVBQUMwQixRQUFELEVBQWM7QUFBQSxpQkFRMUIsT0FBS3pFLEtBUnFCO0FBQUEsUUFFNUJwQyxJQUY0QixVQUU1QkEsSUFGNEI7QUFBQSxRQUc1Qk0sVUFINEIsVUFHNUJBLFVBSDRCO0FBQUEsUUFJNUJELFNBSjRCLFVBSTVCQSxTQUo0QjtBQUFBLFFBSzVCWSxVQUw0QixVQUs1QkEsVUFMNEI7QUFBQSxRQU01QkgsYUFONEIsVUFNNUJBLGFBTjRCO0FBQUEsUUFPNUJDLElBUDRCLFVBTzVCQSxJQVA0Qjs7QUFTOUIsUUFBTTBLLGdCQUFnQixDQUFDLGlCQUFELENBQXRCO0FBQ0EsUUFBSUMsZ0JBQWdCLENBQXBCLENBVjhCLENBVVA7QUFDdkIsUUFBSXBMLFVBQUosRUFBZ0JvTCxnQkFBZ0J6SyxXQUFXSyxJQUEzQjtBQUNoQixRQUFJaEIsVUFBSixFQUFnQjtBQUNkLFVBQUl1RyxZQUFhNkUsZ0JBQWdCLENBQWpDLEVBQXFDO0FBQ25DRCxzQkFBY0UsSUFBZCxDQUFtQixxQkFBbkI7QUFDRDtBQUNGLEtBSkQsTUFJTyxJQUFJdEwsU0FBSixFQUFlO0FBQ3BCb0wsb0JBQWNFLElBQWQsQ0FBbUIsc0JBQW5CO0FBQ0Q7O0FBR0Q7QUFDQSxRQUFLLENBQUNyTCxVQUFELElBQWUsQ0FBQ0QsU0FBakIsSUFDQ1MsaUJBQWlCZCxLQUFLdUssU0FEM0IsRUFDdUM7QUFDckMsVUFDRXpKLGNBQWM4SyxPQUFkLENBQXNCN0ssS0FBS1osS0FBTCxFQUFZMEcsV0FBVzZFLGFBQXZCLFNBQXlDMUwsS0FBS3VLLFNBQTlDLEVBQXRCLE1BQXFGLENBQUMsQ0FEeEYsRUFFRTtBQUNBa0Isc0JBQWNFLElBQWQsQ0FBbUIsYUFBbkI7QUFDRDtBQUNGOztBQUVELFFBQUksT0FBS3ZKLEtBQUwsQ0FBV3lKLGtCQUFmLEVBQW1DO0FBQ2pDLGFBQU9KLGNBQWMzRCxJQUFkLENBQW1CLEdBQW5CLElBQTBCLEdBQTFCLEdBQWdDLE9BQUsxRixLQUFMLENBQVd5SixrQkFBWCxDQUE4QmhGLFFBQTlCLENBQXZDO0FBQ0Q7QUFDRCxXQUFPNEUsY0FBYzNELElBQWQsQ0FBbUIsR0FBbkIsQ0FBUDtBQUNELEc7O09BRURnRSxlLEdBQWtCLFVBQUNqRixRQUFELEVBQVdELEdBQVgsRUFBZ0JzRCxRQUFoQixFQUE2QjtBQUM3QyxRQUFNNkIsYUFBYSxFQUFuQjtBQUNBLFFBQUksQ0FBQyxPQUFLM0osS0FBTCxDQUFXcEMsSUFBWCxDQUFnQnVLLFNBQWpCLElBQThCLENBQUMzRCxJQUFJaUIsWUFBdkMsRUFBcUQ7QUFDbkQsYUFBT2tFLFVBQVA7QUFDRDtBQUNELFFBQUlDLG9CQUFKO0FBQ0EsUUFBSUMscUJBQUo7QUFDQSxRQUFJQyx1QkFBSjtBQUNBLFFBQUloQyxhQUFhLFFBQWpCLEVBQTJCO0FBQ3pCOEIsb0JBQWMsT0FBSzVKLEtBQUwsQ0FBV2hCLGtCQUFYLENBQThCakIsS0FBOUIsRUFBcUMsTUFBckMsRUFBNkMwRyxRQUE3QyxTQUEwREQsSUFBSWlCLFlBQTlELEVBQWQ7QUFDQW9FLHFCQUFlLE9BQUs3SixLQUFMLENBQVdoQixrQkFBWCxDQUE4QmpCLEtBQTlCLEVBQXFDLE9BQXJDLEVBQThDMEcsUUFBOUMsU0FBMkRELElBQUlpQixZQUEvRCxFQUFmO0FBQ0FxRSx1QkFBaUIsT0FBSzlKLEtBQUwsQ0FBV2hCLGtCQUFYLENBQThCakIsS0FBOUIsRUFBcUMsU0FBckMsRUFBZ0QwRyxRQUFoRCxTQUE2REQsSUFBSWlCLFlBQWpFLEVBQWpCO0FBQ0QsS0FKRCxNQUlPO0FBQ0wsVUFBTXpILEtBQUssT0FBS29KLG1CQUFMLENBQXlCM0MsUUFBekIsQ0FBWDtBQUNBbUYsb0JBQWMsT0FBSzVKLEtBQUwsQ0FBV2pCLFlBQVgsQ0FBd0JoQixLQUF4QixFQUErQixNQUEvQixFQUF1Q0MsRUFBdkMsU0FBOEN3RyxJQUFJaUIsWUFBbEQsRUFBZDtBQUNBb0UscUJBQWUsT0FBSzdKLEtBQUwsQ0FBV2pCLFlBQVgsQ0FBd0JoQixLQUF4QixFQUErQixPQUEvQixFQUF3Q0MsRUFBeEMsU0FBK0N3RyxJQUFJaUIsWUFBbkQsRUFBZjtBQUNBcUUsdUJBQWlCLE9BQUs5SixLQUFMLENBQVdqQixZQUFYLENBQXdCaEIsS0FBeEIsRUFBK0IsU0FBL0IsRUFBMENDLEVBQTFDLFNBQWlEd0csSUFBSWlCLFlBQXJELEVBQWpCO0FBQ0Q7QUFDRCxRQUFJbUUsV0FBSixFQUFpQjtBQUNmRCxpQkFBV0MsV0FBWCxHQUF5QkEsV0FBekI7QUFDRDtBQUNELFFBQUlDLFlBQUosRUFBa0I7QUFDaEJGLGlCQUFXRSxZQUFYLEdBQTBCQSxZQUExQjtBQUNEO0FBQ0QsUUFBSUMsY0FBSixFQUFvQjtBQUNsQkgsaUJBQVdHLGNBQVgsR0FBNEJBLGNBQTVCO0FBQ0Q7QUFDRCxXQUFPSCxVQUFQO0FBQ0QsRzs7T0FFRG5ILGMsR0FBaUIsWUFBTTtBQUNyQixRQUFJdUgsb0JBQUo7QUFDQSxRQUFJLE9BQUsvSixLQUFMLENBQVc5QixVQUFYLElBQXlCLENBQUMsT0FBS2tDLGlCQUFuQyxFQUFzRCxPQUFPMkosV0FBUDtBQUN0RCxRQUFJLE9BQUszSixpQkFBVCxFQUE0QjtBQUMxQixVQUFNNEosZUFBZSxPQUFLaEssS0FBTCxDQUFXbkIsVUFBWCxDQUFzQkssSUFBdEIsR0FBNkIsQ0FBbEQ7QUFDQSxVQUFJOEssZ0JBQWdCLENBQXBCLEVBQXVCO0FBQ3JCRCxzQkFBY0MsWUFBZDtBQUNEO0FBQ0YsS0FMRCxNQUtPO0FBQ0wsVUFBSSxPQUFLaEssS0FBTCxDQUFXL0IsU0FBZixFQUEwQjtBQUN4QjhMLHNCQUFjLE9BQUt0TSxLQUFMLENBQVd3QyxVQUF6QjtBQUNELE9BRkQsTUFFTztBQUNMOEosc0JBQWMsT0FBSy9KLEtBQUwsQ0FBVytKLFdBQXpCLENBREssQ0FDaUM7QUFDdkM7QUFDRCxVQUFJQSxnQkFBZ0IxRCxTQUFoQixJQUE2QixPQUFLckcsS0FBTCxDQUFXdEIsYUFBWCxDQUF5QlEsSUFBekIsR0FBZ0MsQ0FBakUsRUFBb0U7QUFDbEU2SyxzQkFBYyxPQUFLM0Isb0JBQUwsQ0FBMEIsT0FBS3BJLEtBQUwsQ0FBV3RCLGFBQVgsQ0FBeUJ1TCxLQUF6QixFQUExQixDQUFkO0FBQ0Q7QUFDRjtBQUNELFdBQU9GLFdBQVA7QUFDRCxHOztPQUVERyxnQixHQUFtQixVQUFDcEMsUUFBRCxFQUFXckQsUUFBWCxFQUFxQlgsU0FBckI7QUFBQSxXQUFtQyxZQUFNO0FBQzFELFVBQUlnRSxhQUFhLE1BQWIsSUFBdUIsT0FBSzlILEtBQUwsQ0FBV2lJLFVBQXRDLEVBQWtEO0FBQ2hELGVBQUtqSSxLQUFMLENBQVdrSSxtQkFBWCxDQUErQixPQUFLbEksS0FBTCxDQUFXcEMsSUFBMUMsRUFBZ0Qsb0JBQUksRUFBRTZHLGtCQUFGLEVBQVlYLG9CQUFaLEVBQUosQ0FBaEQ7QUFDRDtBQUNGLEtBSmtCO0FBQUEsRzs7T0FNbkJxRyxtQixHQUFzQixVQUFDMUYsUUFBRCxFQUFXRCxHQUFYO0FBQUEsV0FBbUIsVUFBQzRGLEdBQUQsRUFBUztBQUNoRDtBQUNBLFVBQ0UsT0FBS3BLLEtBQUwsQ0FBV25CLFVBQVgsQ0FBc0JLLElBQXRCLElBQ0EsT0FBS2MsS0FBTCxDQUFXbkIsVUFBWCxDQUFzQkssSUFBdEIsS0FBK0J1RixXQUFXLENBRDFDLElBRUEsT0FBS3JFLGlCQUZMLElBR0EsQ0FBQyxPQUFLMkkseUJBQUwsQ0FBK0J0RSxRQUEvQixFQUF5Q0QsR0FBekMsRUFBOEMsUUFBOUMsQ0FKSCxFQUtFO0FBQ0E0RixZQUFJQyxLQUFKO0FBQ0EsZUFBS2pLLGlCQUFMLEdBQXlCLEtBQXpCO0FBQ0Q7QUFDRixLQVhxQjtBQUFBLEc7O09BYXRCa0ssaUIsR0FBb0IsVUFBQzdGLFFBQUQsRUFBV0QsR0FBWDtBQUFBLFdBQW1CLFVBQUM0RixHQUFELEVBQVM7QUFDOUMsVUFBTXRHLFlBQVkxRSxtQkFBTXdGLFlBQU4sQ0FBbUJKLEdBQW5CLENBQWxCO0FBQ0EsVUFBSSxPQUFLbkUsZUFBTCxJQUF3QixDQUFDLE9BQUswSSx5QkFBTCxDQUErQnRFLFFBQS9CLEVBQXlDRCxHQUF6QyxFQUE4QyxNQUE5QyxDQUE3QixFQUFvRjtBQUNsRixZQUFNK0YsbUJBQW1CLE9BQUtuQyxvQkFBTCxDQUEwQixPQUFLcEksS0FBTCxDQUFXdEIsYUFBWCxDQUF5QnVMLEtBQXpCLEVBQTFCLENBQXpCO0FBRGtGLFlBRTFFeEwsWUFGMEUsR0FFekQsT0FBS3VCLEtBRm9ELENBRTFFdkIsWUFGMEU7O0FBR2xGLFlBQUlBLGFBQWFTLElBQWIsR0FBb0IsQ0FBeEIsRUFBMkI7QUFDekIsY0FBSVQsYUFBYXFLLEdBQWIsQ0FBaUIsVUFBakIsTUFBaUNyRSxRQUFqQyxJQUE2Q2hHLGFBQWFxSyxHQUFiLENBQWlCLFdBQWpCLE1BQWtDaEYsU0FBbkYsRUFBOEY7QUFDNUZzRyxnQkFBSUMsS0FBSjtBQUNBLG1CQUFLaEssZUFBTCxHQUF1QixLQUF2QjtBQUNEO0FBQ0YsU0FMRCxNQUtPLElBQUlrSyxxQkFBcUJsRSxTQUF6QixFQUFvQztBQUN6QyxpQkFBS2hHLGVBQUwsR0FBdUIsS0FBdkI7QUFDRCxTQUZNLE1BRUEsSUFBSWtLLHFCQUFxQjlGLFFBQXpCLEVBQW1DO0FBQ3hDMkYsY0FBSUMsS0FBSjtBQUNBLGlCQUFLaEssZUFBTCxHQUF1QixLQUF2QjtBQUNEO0FBQ0Y7QUFDRCxVQUFJLE9BQUtMLEtBQUwsQ0FBVzBFLHFCQUFmLEVBQXNDO0FBQ3BDLGVBQUt2RSxRQUFMLENBQWlCLE9BQUtILEtBQUwsQ0FBV3BDLElBQVgsQ0FBZ0JJLEVBQWpDLFNBQXVDOEYsU0FBdkMsU0FBb0RXLFFBQXBELElBQWtFMkYsR0FBbEU7QUFDRDtBQUNGLEtBcEJtQjtBQUFBLEc7O09Bc0JwQnBGLGEsR0FBZ0IsVUFBQ0QsV0FBRCxFQUFjTixRQUFkLEVBQXdCK0YsV0FBeEIsRUFBd0M7QUFDdEQsUUFBSXpGLGdCQUFnQkEsWUFBWTBGLElBQVosS0FBcUIsTUFBckIsSUFBK0IxRixZQUFZMEYsSUFBWixLQUFxQixRQUFwRSxDQUFKLEVBQW1GO0FBQ2pGLFVBQUloRyxhQUFhLENBQUMsQ0FBbEIsRUFBcUI7QUFDbkIsZUFBS2IsUUFBTCxDQUFjLEVBQUUzRCxZQUFZd0UsUUFBZCxFQUFkO0FBQ0Q7QUFDRCxVQUFJK0YsZ0JBQWdCLENBQUMsQ0FBckIsRUFBd0I7QUFDdEIsZUFBSzVHLFFBQUwsQ0FBYyxFQUFFMUQsZUFBZXNLLFdBQWpCLEVBQWQ7QUFDRDtBQUNERSxpQkFBVztBQUFBLGVBQU0zRixZQUFZaUQsTUFBWixFQUFOO0FBQUEsT0FBWCxFQUF1QyxFQUF2QztBQUNEO0FBQ0YsRzs7T0FFRDJDLCtCLEdBQWtDO0FBQUEsV0FBWSxZQUFNO0FBQ2xELGFBQUszSyxLQUFMLENBQVc0SyxtQkFBWCxDQUErQixPQUFLNUssS0FBTCxDQUFXcEMsSUFBMUMsRUFBZ0Q2RyxRQUFoRCxFQUEwRCxJQUExRCxFQUFnRSxLQUFoRTtBQUNELEtBRmlDO0FBQUEsRzs7T0FJbENvRyxlLEdBQWtCLFlBQU07QUFBQSxRQUNkQyxXQURjLEdBQ0UsT0FBSzlLLEtBRFAsQ0FDZDhLLFdBRGM7O0FBRXRCLFFBQU0xSCxVQUFVLEVBQWhCO0FBQ0EsUUFBTTJILFdBQVd0QyxPQUFPLE9BQUt6SSxLQUFMLENBQVcrSyxRQUFsQixDQUFqQjtBQUNBLFFBQUlELFdBQUosRUFBaUI7QUFDZjFILGNBQVFtRyxJQUFSLENBQWE7QUFDWHlCLGVBQU9GLFlBQVlFLEtBQVosSUFBcUIsRUFEakI7QUFFWEMscUJBQWEsQ0FBQyxDQUFDSCxZQUFZRyxXQUZoQjtBQUdYQyxvQkFBWSxLQUhEO0FBSVhwSCxtQkFBVyxhQUpBO0FBS1hxSCxjQUFNO0FBQUEsaUJBQ0o7QUFBQTtBQUFBLGNBQUssV0FBVSwrQkFBZjtBQUNJTCx3QkFBWU0sV0FBWixDQUF3QixPQUFLcEwsS0FBTCxDQUFXckIsSUFBWCxDQUFnQm1LLEdBQWhCLENBQW9CckUsUUFBcEIsQ0FBeEIsRUFBdURzRyxRQUF2RDtBQURKLFdBREk7QUFBQSxTQUxLO0FBVVhNLGtCQUFVO0FBQUEsaUJBQWFQLFlBQVlPLFFBQVosR0FBdUJQLFlBQVlPLFFBQVosQ0FBcUI1RyxRQUFyQixDQUF2QixHQUF3RCxJQUFyRTtBQUFBLFNBVkM7QUFXWDZHLG9CQUFZO0FBQUEsaUJBQWFSLFlBQVlRLFVBQVosR0FBeUJSLFlBQVlRLFVBQVosQ0FBdUI3RyxRQUF2QixDQUF6QixHQUE0RCxJQUF6RTtBQUFBLFNBWEQ7QUFZWDhHLG9CQUFZO0FBQUEsaUJBQWFULFlBQVlTLFVBQVosR0FBeUJULFlBQVlTLFVBQVosQ0FBdUI5RyxRQUF2QixDQUF6QixHQUE0RCxJQUF6RTtBQUFBO0FBWkQsT0FBYjtBQWNEOztBQUVELFFBQUksT0FBS3pFLEtBQUwsQ0FBV3dMLHVCQUFmLEVBQXdDO0FBQ3RDcEksY0FBUW1HLElBQVIsQ0FBYTtBQUNYeUIsZUFBTyxFQURJO0FBRVhDLHFCQUFhLEtBRkY7QUFHWEMsb0JBQVksS0FIRDtBQUlYcEgsbUJBQVcsbUJBSkE7QUFLWHFILGNBQU0sY0FBQzFHLFFBQUQsRUFBYztBQUNsQixjQUFNZ0gsVUFBVSxPQUFLekwsS0FBTCxDQUFXckIsSUFBWCxDQUFnQm1LLEdBQWhCLENBQW9CckUsUUFBcEIsQ0FBaEI7QUFDQSxjQUFNaUgsU0FBU0QsUUFBUTFOLEtBQVIsQ0FBYyxPQUFLaUMsS0FBTCxDQUFXcEMsSUFBWCxDQUFnQnVLLFNBQTlCLENBQWY7QUFDQSxjQUFNd0QsV0FBVyxPQUFLM0wsS0FBTCxDQUFXdEIsYUFBWCxDQUF5QmtOLFFBQXpCLENBQWtDRixNQUFsQyxDQUFqQjtBQUNBLGlCQUNFLDhCQUFDLHVCQUFEO0FBQ0UsOENBQWdDLE9BQUsxTCxLQUFMLENBQVdwQyxJQUFYLENBQWdCSSxFQUFoRCxTQUFzRHlHLFFBRHhEO0FBRUUsdUJBQVUsa0NBRlo7QUFHRSxxQkFBU2tILFFBSFg7QUFJRSxzQkFBVSxPQUFLaEIsK0JBQUwsQ0FBcUNsRyxRQUFyQyxDQUpaO0FBS0Usc0JBQVVzRztBQUxaLFlBREY7QUFTRCxTQWxCVTtBQW1CWE0sa0JBQVU7QUFBQSxpQkFBTSxJQUFOO0FBQUEsU0FuQkM7QUFvQlhDLG9CQUFZO0FBQUEsaUJBQU0sSUFBTjtBQUFBLFNBcEJEO0FBcUJYQyxvQkFBWTtBQUFBLGlCQUFNLElBQU47QUFBQTtBQXJCRCxPQUFiO0FBdUJEOztBQUVELFFBQU1oTixpQkFBaUIsRUFBdkI7QUFDQSxXQUFLeUIsS0FBTCxDQUFXekIsY0FBWCxDQUEwQnNOLE9BQTFCLENBQWtDLFVBQUNDLGdCQUFELEVBQXNCO0FBQ3RELGFBQUs5TCxLQUFMLENBQVdvRCxPQUFYLENBQW1CeUksT0FBbkIsQ0FBMkIsVUFBQ0UsTUFBRCxFQUFZO0FBQ3JDLFlBQUkzTSxtQkFBTXdGLFlBQU4sQ0FBbUJtSCxNQUFuQixNQUErQkQsZ0JBQW5DLEVBQXFEO0FBQ25Edk4seUJBQWVnTCxJQUFmLENBQW9Cd0MsTUFBcEI7QUFDRDtBQUNGLE9BSkQ7QUFLRCxLQU5EO0FBT0F4TixtQkFBZXNOLE9BQWYsQ0FBdUIsVUFBQ3JILEdBQUQsRUFBUztBQUM5QixVQUFNd0gsU0FBUztBQUNiQyxnQkFBUXpILElBQUl5SCxNQURDO0FBRWJuSSxtQkFBVzFFLG1CQUFNd0YsWUFBTixDQUFtQkosR0FBbkIsQ0FGRTtBQUdid0csZUFBUXhHLElBQUl3RyxLQUFKLElBQWF4RyxJQUFJd0csS0FBSixLQUFjLENBQTNCLEdBQStCeEcsSUFBSXdHLEtBQW5DLEdBQTJDLEdBSHRDO0FBSWJrQixrQkFBVzFILElBQUkwSCxRQUFKLElBQWdCMUgsSUFBSTBILFFBQUosS0FBaUIsQ0FBakMsR0FBcUMxSCxJQUFJMEgsUUFBekMsR0FBb0QsRUFKbEQ7QUFLYkMsa0JBQVUzSCxJQUFJMkgsUUFMRDtBQU1ibEIscUJBQWEsQ0FBQ3pHLElBQUk0SCxlQU5MO0FBT2JDLGVBQU8sQ0FBQyxDQUFDN0gsSUFBSTZILEtBUEE7QUFRYkMsNkJBQXFCLENBQUMsQ0FBQzlILElBQUk4SCxtQkFSZDtBQVNiQyx3QkFBZ0IsQ0FBQyxDQUFDL0gsSUFBSStILGNBVFQ7QUFVYkMsb0JBQVksQ0FBQyxDQUFDaEksSUFBSWdJLFVBVkw7QUFXYmhFLHVCQUFlaEUsSUFBSWdFLGFBWE47QUFZYmlFLGVBQU9yTixtQkFBTXNOLGlCQUFOLENBQXdCbEksR0FBeEI7QUFaTSxPQUFmO0FBY0EsVUFBSUEsSUFBSWlCLFlBQVIsRUFBc0I7QUFDcEJ1RyxlQUFPdkcsWUFBUCxHQUFzQmpCLElBQUlpQixZQUExQjtBQUNEO0FBQ0QsVUFBSWpCLElBQUltSSxRQUFSLEVBQWtCO0FBQ2hCWCxlQUFPVyxRQUFQLEdBQWtCbkksSUFBSW1JLFFBQXRCO0FBQ0Q7QUFDRCxVQUFJbkksSUFBSU0sU0FBUixFQUFtQjtBQUNqQmtILGVBQU9sSCxTQUFQLEdBQW1CTixJQUFJTSxTQUF2QjtBQUNEO0FBQ0QsVUFBSU4sSUFBSW9JLGNBQVIsRUFBd0I7QUFDdEJaLGVBQU9ZLGNBQVAsR0FBd0JwSSxJQUFJb0ksY0FBNUI7QUFDRDtBQUNELFVBQUlwSSxJQUFJcUksZUFBUixFQUF5QjtBQUN2QmIsZUFBT2EsZUFBUCxHQUF5QnJJLElBQUlxSSxlQUE3QjtBQUNEO0FBQ0QsVUFBTUMsb0JBQW9CMU4sbUJBQU0yTixvQkFBTixDQUEyQnZJLEdBQTNCLENBQTFCO0FBQ0E7QUFDQSxVQUFNNEcsY0FBYyxTQUFkQSxXQUFjLENBQUMzRyxRQUFELEVBQVd1SSxNQUFYLEVBQXNCO0FBQ3hDLFlBQU1wRSxNQUFNLE9BQUs1SSxLQUFMLENBQVdyQixJQUFYLENBQWdCWixLQUFoQixFQUF1QjBHLFFBQXZCLFNBQW9DRCxJQUFJaUIsWUFBeEMsRUFBWjtBQUNBLFlBQUlxSCxrQkFBa0JsRSxHQUFsQixDQUFKLEVBQTRCO0FBQzFCLGlCQUFPcEUsSUFBSWdJLFVBQUosR0FBaUIsOEJBQUMsMkJBQUQsSUFBRyxJQUFHLHFCQUFOLEdBQWpCLEdBQWtELEVBQXpEO0FBQ0Q7QUFDRCxlQUFPUSxTQUFTQSxPQUFPcEUsR0FBUCxDQUFULEdBQXVCQSxHQUE5QjtBQUNELE9BTkQ7O0FBUUEsVUFBSXBFLElBQUkyRyxJQUFSLEVBQWM7QUFDWmEsZUFBT2IsSUFBUCxHQUFjM0csSUFBSTJHLElBQWxCO0FBQ0QsT0FGRCxNQUVPLElBQUkzRyxJQUFJNEcsV0FBUixFQUFxQjtBQUMxQlksZUFBT2IsSUFBUCxHQUFjO0FBQUEsaUJBQVkzRyxJQUFJNEcsV0FBSixDQUFnQixPQUFLcEwsS0FBTCxDQUFXckIsSUFBWCxDQUFnQm1LLEdBQWhCLENBQW9CckUsUUFBcEIsQ0FBaEIsQ0FBWjtBQUFBLFNBQWQ7QUFDRCxPQUZNLE1BRUE7QUFDTCxnQkFBUUQsSUFBSU0sU0FBWjtBQUNFLGVBQUssUUFBTDtBQUNBLGVBQUssT0FBTDtBQUNFa0gsbUJBQU9iLElBQVAsR0FBYztBQUFBLHFCQUNaQyxZQUFZM0csUUFBWixFQUFzQjtBQUFBLHVCQUFLLDhCQUFDLDBCQUFELGFBQUcsT0FBT3FDLENBQVYsSUFBaUJ0QyxJQUFJeUksb0JBQXJCLEVBQUw7QUFBQSxlQUF0QixDQURZO0FBQUEsYUFBZDtBQUVBO0FBQ0YsZUFBSyxVQUFMO0FBQWlCO0FBQ2Ysa0JBQU1DLGtCQUFrQjFJLElBQUkySSxZQUFKLElBQW9CM0ksSUFBSTJJLFlBQUosQ0FBaUJELGVBQXJDLElBQXdELENBQUMsVUFBRCxDQUFoRixDQURlLENBQytFO0FBQzlGbEIscUJBQU9iLElBQVAsR0FBYztBQUFBLHVCQUNaQyxZQUFZM0csUUFBWixFQUFzQjtBQUFBLHlCQUFLLHVDQUFxQnFDLENBQXJCLEVBQXdCO0FBQ2pEc0csOEJBQVUsT0FBS3BOLEtBQUwsQ0FBV3JCLElBQVgsQ0FBZ0JaLEtBQWhCLEVBQXVCMEcsUUFBdkIsU0FBb0N5SSxlQUFwQyxFQUR1QztBQUVqREcsOEJBQVU3SSxJQUFJMkksWUFBSixJQUFvQjNJLElBQUkySSxZQUFKLENBQWlCRSxRQUZFO0FBR2pENU4sdUNBQW1CK0UsSUFBSTJJLFlBQUosSUFBb0IzSSxJQUFJMkksWUFBSixDQUFpQjFOLGlCQUFyQyxJQUEwRCxPQUFLTyxLQUFMLENBQVdQLGlCQUh2QyxFQUcwRDtBQUMzR0Usc0NBQWtCNkUsSUFBSTJJLFlBQUosSUFBb0IzSSxJQUFJMkksWUFBSixDQUFpQnhOLGdCQUFyQyxJQUF5RCxPQUFLSyxLQUFMLENBQVdMLGdCQUpyQyxDQUl1RDtBQUp2RCxtQkFBeEIsQ0FBTDtBQUFBLGlCQUF0QixDQURZO0FBQUEsZUFBZDtBQU9BO0FBQ0Q7QUFDRCxlQUFLLE1BQUw7QUFDRXFNLG1CQUFPYixJQUFQLEdBQWM7QUFBQSxxQkFDWkMsWUFBWTNHLFFBQVosRUFBc0IsVUFBQ3FDLENBQUQsRUFBTztBQUMzQixvQkFBSSxzQkFBT0EsQ0FBUCxFQUFVLE9BQUs5RyxLQUFMLENBQVdULFVBQXJCLEVBQWlDLElBQWpDLEVBQXVDK04sT0FBdkMsRUFBSixFQUFzRDtBQUNwRCx5QkFBT0MsaUJBQU9DLEdBQVAsQ0FBVzFHLENBQVgsRUFBYyxPQUFLOUcsS0FBTCxDQUFXVCxVQUF6QixFQUFxQ3lOLE1BQXJDLENBQTRDLE9BQUtoTixLQUFMLENBQVdULFVBQXZELENBQVA7QUFDRDtBQUNELG9CQUFJLHNCQUFPdUgsQ0FBUCxFQUFVd0csT0FBVixFQUFKLEVBQXlCO0FBQ3ZCLHlCQUFPQyxpQkFBT0MsR0FBUCxDQUFXMUcsQ0FBWCxFQUFja0csTUFBZCxDQUFxQixPQUFLaE4sS0FBTCxDQUFXVCxVQUFoQyxDQUFQO0FBQ0Q7QUFDRCx1QkFBTyw4QkFBQywyQkFBRCxJQUFHLElBQUcsa0JBQU4sR0FBUDtBQUNELGVBUkQsQ0FEWTtBQUFBLGFBQWQ7QUFVQTtBQUNGLGVBQUssU0FBTDtBQUNFeU0sbUJBQU9iLElBQVAsR0FBYztBQUFBLHFCQUNaQyxZQUFZM0csUUFBWixFQUFzQjtBQUFBLHVCQUNwQiw4QkFBQywyQkFBRCxhQUFHLElBQUlxQyxJQUFJLFVBQUosR0FBaUIsU0FBeEIsSUFBdUN0QyxJQUFJeUksb0JBQTNDLEVBRG9CO0FBQUEsZUFBdEIsQ0FEWTtBQUFBLGFBQWQ7QUFHQTtBQUNGO0FBQ0VqQixtQkFBT2IsSUFBUCxHQUFjO0FBQUEscUJBQVlDLFlBQVkzRyxRQUFaLENBQVo7QUFBQSxhQUFkO0FBbkNKO0FBcUNEO0FBQ0Q7QUFDQSxVQUFJRCxJQUFJNkcsUUFBUixFQUFrQjtBQUNoQlcsZUFBT1gsUUFBUCxHQUFrQjdHLElBQUk2RyxRQUF0QjtBQUNELE9BRkQsTUFFTyxJQUFJN0csSUFBSWlKLGVBQVIsRUFBeUI7QUFDOUJ6QixlQUFPWCxRQUFQLEdBQWtCO0FBQUEsaUJBQVk3RyxJQUFJaUosZUFBSixDQUFvQixPQUFLek4sS0FBTCxDQUFXckIsSUFBWCxDQUFnQm1LLEdBQWhCLENBQW9CckUsUUFBcEIsQ0FBcEIsQ0FBWjtBQUFBLFNBQWxCO0FBQ0Q7QUFDRCxVQUFJRCxJQUFJOEcsVUFBUixFQUFvQjtBQUNsQlUsZUFBT1YsVUFBUCxHQUFvQjlHLElBQUk4RyxVQUF4QjtBQUNELE9BRkQsTUFFTyxJQUFJOUcsSUFBSWtKLGlCQUFSLEVBQTJCO0FBQ2hDMUIsZUFBT1YsVUFBUCxHQUFvQjtBQUFBLGlCQUFZOUcsSUFBSWtKLGlCQUFKLENBQXNCLE9BQUsxTixLQUFMLENBQVdyQixJQUFYLENBQWdCbUssR0FBaEIsQ0FBb0JyRSxRQUFwQixDQUF0QixDQUFaO0FBQUEsU0FBcEI7QUFDRDtBQUNELFVBQUlELElBQUkrRyxVQUFSLEVBQW9CO0FBQ2xCUyxlQUFPVCxVQUFQLEdBQW9CL0csSUFBSStHLFVBQXhCO0FBQ0QsT0FGRCxNQUVPLElBQUkvRyxJQUFJbUosaUJBQVIsRUFBMkI7QUFDaEMzQixlQUFPVCxVQUFQLEdBQW9CO0FBQUEsaUJBQVkvRyxJQUFJbUosaUJBQUosQ0FBc0IsT0FBSzNOLEtBQUwsQ0FBV3JCLElBQVgsQ0FBZ0JtSyxHQUFoQixDQUFvQnJFLFFBQXBCLENBQXRCLENBQVo7QUFBQSxTQUFwQjtBQUNEO0FBQ0QsVUFBSUQsSUFBSWdFLGFBQVIsRUFBdUI7QUFDckIsWUFBSW9GLGtCQUFrQjtBQUFBLGlCQUFPaEYsR0FBUDtBQUFBLFNBQXRCO0FBQ0EsZ0JBQVFwRSxJQUFJZ0UsYUFBWjtBQUNFLGVBQUssTUFBTDtBQUNFO0FBQ0EsZ0JBQUksT0FBS3hJLEtBQUwsQ0FBV2MsVUFBZixFQUEyQjtBQUN6QixrQkFBSSxDQUFDa0wsT0FBT1gsUUFBWixFQUFzQjtBQUNwQlcsdUJBQU9YLFFBQVAsR0FBa0I7QUFBQSx5QkFDaEIsOEJBQUMsMkJBQUQ7QUFDRSwwQkFBSyxNQURQO0FBRUUsMkJBQU8sT0FBSzNELGdCQUFMLENBQXNCakQsUUFBdEIsRUFBZ0NELEdBQWhDLENBRlQ7QUFHRSw4QkFBVSxPQUFLMEMscUJBQUwsQ0FBMkJ6QyxRQUEzQixFQUFxQ0QsR0FBckMsRUFBMENvSixlQUExQyxDQUhaO0FBSUUsNEJBQVEsT0FBS2pHLGNBQUwsQ0FBb0JsRCxRQUFwQixFQUE4QkQsR0FBOUIsQ0FKVjtBQUtFLDZCQUFTLE9BQUtxRCxXQUFMLENBQWlCLE1BQWpCLEVBQXlCckQsSUFBSWdFLGFBQTdCLEVBQTRDL0QsUUFBNUMsRUFBc0R1SCxPQUFPbEksU0FBN0QsQ0FMWDtBQU1FLCtCQUFXLE9BQUtTLGlCQUFMLENBQXVCQyxHQUF2QixFQUE0QkMsUUFBNUIsQ0FOYjtBQU9FLDhCQUFVLE9BQUs2RixpQkFBTCxDQUF1QjdGLFFBQXZCLEVBQWlDRCxHQUFqQyxDQVBaO0FBUUUsaURBQTJCLE9BQUt4RSxLQUFMLENBQVdwQyxJQUFYLENBQWdCSSxFQUEzQyxTQUFpRGdPLE9BQU9sSSxTQUF4RCxTQUFxRVc7QUFSdkUscUJBU01ELElBQUlxSixrQkFUVjtBQVVFLDhCQUFVLE9BQUs5RSx5QkFBTCxDQUErQnRFLFFBQS9CLEVBQXlDRCxHQUF6QyxFQUE4QyxNQUE5QyxDQVZaO0FBV0UsMkJBQU93SCxPQUFPUyxLQVhoQjtBQVlFLDhCQUFVMUI7QUFaWixxQkFEZ0I7QUFBQSxpQkFBbEI7QUFnQkQ7QUFDRCxrQkFBSSxDQUFDaUIsT0FBT1YsVUFBWixFQUF3QjtBQUN0QlUsdUJBQU9WLFVBQVAsR0FBb0I7QUFBQSx5QkFDbEIsOEJBQUMsMkJBQUQ7QUFDRSwwQkFBSyxNQURQO0FBRUUsMkJBQU8sT0FBSzNDLGtCQUFMLENBQXdCbEUsUUFBeEIsRUFBa0NELEdBQWxDLENBRlQ7QUFHRSw4QkFBVSxPQUFLZ0MsdUJBQUwsQ0FBNkIvQixRQUE3QixFQUF1Q0QsR0FBdkMsRUFBNENvSixlQUE1QyxDQUhaO0FBSUUsNEJBQVEsT0FBS3BHLGdCQUFMLENBQXNCL0MsUUFBdEIsRUFBZ0NELEdBQWhDLENBSlY7QUFLRSwrQkFBVyxPQUFLUixtQkFMbEI7QUFNRSw4QkFBVSxPQUFLbUcsbUJBQUwsQ0FBeUIxRixRQUF6QixFQUFtQ0QsR0FBbkMsQ0FOWjtBQU9FLG1EQUE2QixPQUFLeEUsS0FBTCxDQUFXcEMsSUFBWCxDQUFnQkksRUFBN0MsU0FBbURnTyxPQUFPbEksU0FBMUQsU0FBdUVXO0FBUHpFLHFCQVFNRCxJQUFJc0osb0JBUlY7QUFTRSw4QkFBVSxPQUFLL0UseUJBQUwsQ0FBK0J0RSxRQUEvQixFQUF5Q0QsR0FBekMsRUFBOEMsUUFBOUMsQ0FUWjtBQVVFLDJCQUFPd0gsT0FBT1MsS0FWaEI7QUFXRSw4QkFBVTFCO0FBWFoscUJBRGtCO0FBQUEsaUJBQXBCO0FBZUQ7QUFDRjtBQUNELGdCQUFJLE9BQUsvSyxLQUFMLENBQVdtQixTQUFmLEVBQTBCO0FBQ3hCLGtCQUFJLENBQUM2SyxPQUFPVCxVQUFaLEVBQXdCO0FBQ3RCUyx1QkFBT1QsVUFBUCxHQUFvQjtBQUFBLHlCQUNsQiw4QkFBQywyQkFBRDtBQUNFLDBCQUFLLE1BRFA7QUFFRSwyQkFBTyxPQUFLMUMsa0JBQUwsQ0FBd0JyRSxHQUF4QixDQUZUO0FBR0UsOEJBQVUsT0FBS3dCLHVCQUFMLENBQTZCeEIsR0FBN0IsRUFBa0NvSixlQUFsQyxDQUhaO0FBSUUsbURBQTZCLE9BQUs1TixLQUFMLENBQVdwQyxJQUFYLENBQWdCSSxFQUE3QyxTQUFtRGdPLE9BQU9sSTtBQUo1RCxxQkFLTVUsSUFBSXVKLG9CQUxWO0FBTUUsMkJBQU8vQixPQUFPUyxLQU5oQjtBQU9FLDhCQUFVMUI7QUFQWixxQkFEa0I7QUFBQSxpQkFBcEI7QUFXRDtBQUNGO0FBQ0Q7QUFDRixlQUFLLFFBQUw7QUFDRSxnQkFBSSxPQUFLL0ssS0FBTCxDQUFXYyxVQUFmLEVBQTJCO0FBQ3pCLGtCQUFJLENBQUNrTCxPQUFPWCxRQUFaLEVBQXNCO0FBQ3BCVyx1QkFBT1gsUUFBUCxHQUFrQjtBQUFBLHlCQUNoQiw4QkFBQywyQkFBRDtBQUNFLDBCQUFLLFFBRFA7QUFFRSwyQkFBTyxPQUFLM0QsZ0JBQUwsQ0FBc0JqRCxRQUF0QixFQUFnQ0QsR0FBaEMsQ0FGVDtBQUdFLDhCQUFVLE9BQUswQyxxQkFBTCxDQUEyQnpDLFFBQTNCLEVBQXFDRCxHQUFyQyxFQUEwQ29KLGVBQTFDLENBSFo7QUFJRSw0QkFBUSxPQUFLakcsY0FBTCxDQUFvQmxELFFBQXBCLEVBQThCRCxHQUE5QixDQUpWO0FBS0UsNkJBQVMsT0FBS3FELFdBQUwsQ0FBaUIsTUFBakIsRUFBeUJyRCxJQUFJZ0UsYUFBN0IsRUFBNEMvRCxRQUE1QyxFQUFzRHVILE9BQU9sSSxTQUE3RCxDQUxYO0FBTUUsK0JBQVcsT0FBS1MsaUJBQUwsQ0FBdUJDLEdBQXZCLEVBQTRCQyxRQUE1QixDQU5iO0FBT0UsOEJBQVUsT0FBSzZGLGlCQUFMLENBQXVCN0YsUUFBdkIsRUFBaUNELEdBQWpDLENBUFo7QUFRRSxpREFBMkIsT0FBS3hFLEtBQUwsQ0FBV3BDLElBQVgsQ0FBZ0JJLEVBQTNDLFNBQWlEZ08sT0FBT2xJLFNBQXhELFNBQXFFVztBQVJ2RSxxQkFTTUQsSUFBSXFKLGtCQVRWO0FBVUUsOEJBQVUsT0FBSzlFLHlCQUFMLENBQStCdEUsUUFBL0IsRUFBeUNELEdBQXpDLEVBQThDLE1BQTlDLENBVlo7QUFXRSwyQkFBT3dILE9BQU9TLEtBWGhCO0FBWUUsOEJBQVUxQjtBQVpaLHFCQURnQjtBQUFBLGlCQUFsQjtBQWdCRDtBQUNELGtCQUFJLENBQUNpQixPQUFPVixVQUFaLEVBQXdCO0FBQ3RCVSx1QkFBT1YsVUFBUCxHQUFvQjtBQUFBLHlCQUNsQiw4QkFBQywyQkFBRDtBQUNFLDBCQUFLLFFBRFA7QUFFRSwyQkFBTyxPQUFLM0Msa0JBQUwsQ0FBd0JsRSxRQUF4QixFQUFrQ0QsR0FBbEMsQ0FGVDtBQUdFLDhCQUFVLE9BQUtnQyx1QkFBTCxDQUE2Qi9CLFFBQTdCLEVBQXVDRCxHQUF2QyxFQUE0Q29KLGVBQTVDLENBSFo7QUFJRSw0QkFBUSxPQUFLcEcsZ0JBQUwsQ0FBc0IvQyxRQUF0QixFQUFnQ0QsR0FBaEMsQ0FKVjtBQUtFLDZCQUFTLE9BQUtxRCxXQUFMLENBQWlCLFFBQWpCLEVBQTJCLFFBQTNCLEVBQXFDcEQsUUFBckMsRUFBK0N1SCxPQUFPbEksU0FBdEQsQ0FMWDtBQU1FLCtCQUFXLE9BQUtFLG1CQU5sQjtBQU9FLDhCQUFVLE9BQUttRyxtQkFBTCxDQUF5QjFGLFFBQXpCLEVBQW1DRCxHQUFuQyxDQVBaO0FBUUUsbURBQTZCLE9BQUt4RSxLQUFMLENBQVdwQyxJQUFYLENBQWdCSSxFQUE3QyxTQUFtRGdPLE9BQU9sSSxTQUExRCxTQUF1RVc7QUFSekUscUJBU01ELElBQUlzSixvQkFUVjtBQVVFLDhCQUFVLE9BQUsvRSx5QkFBTCxDQUErQnRFLFFBQS9CLEVBQXlDRCxHQUF6QyxFQUE4QyxRQUE5QyxDQVZaO0FBV0UsMkJBQU93SCxPQUFPUyxLQVhoQjtBQVlFLDhCQUFVMUI7QUFaWixxQkFEa0I7QUFBQSxpQkFBcEI7QUFnQkQ7QUFDRjtBQUNELGdCQUFJLE9BQUsvSyxLQUFMLENBQVdtQixTQUFmLEVBQTBCO0FBQ3hCLGtCQUFJLENBQUM2SyxPQUFPVCxVQUFaLEVBQXdCO0FBQ3RCUyx1QkFBT1QsVUFBUCxHQUFvQjtBQUFBLHlCQUNsQiw4QkFBQywyQkFBRDtBQUNFLDBCQUFLLFFBRFA7QUFFRSwyQkFBTyxPQUFLMUMsa0JBQUwsQ0FBd0JyRSxHQUF4QixDQUZUO0FBR0UsOEJBQVUsT0FBS3dCLHVCQUFMLENBQTZCeEIsR0FBN0IsRUFBa0NvSixlQUFsQyxDQUhaO0FBSUUsbURBQTZCLE9BQUs1TixLQUFMLENBQVdwQyxJQUFYLENBQWdCSSxFQUE3QyxTQUFtRGdPLE9BQU9sSTtBQUo1RCxxQkFLTVUsSUFBSXVKLG9CQUxWO0FBTUUsMkJBQU8vQixPQUFPUyxLQU5oQjtBQU9FLDhCQUFVMUI7QUFQWixxQkFEa0I7QUFBQSxpQkFBcEI7QUFXRDtBQUNGO0FBQ0Q7QUFDRixlQUFLLE9BQUw7QUFDRTZDLDhCQUFrQjtBQUFBLHFCQUNoQmhGLElBQUlGLE9BQUosQ0FBWSxJQUFJc0YsTUFBSixXQUFtQixPQUFLaE8sS0FBTCxDQUFXTCxnQkFBOUIsVUFBcUQsR0FBckQsQ0FBWixFQUF1RSxFQUF2RSxDQURnQjtBQUFBLGFBQWxCO0FBRUEsZ0JBQUksT0FBS0ssS0FBTCxDQUFXYyxVQUFmLEVBQTJCO0FBQ3pCLGtCQUFJLENBQUNrTCxPQUFPWCxRQUFaLEVBQXNCO0FBQ3BCVyx1QkFBT1gsUUFBUCxHQUFrQjtBQUFBLHlCQUNoQiw4QkFBQywyQkFBRDtBQUNFLDBCQUFLLE1BRFA7QUFFRSwyQkFBTyxPQUFLM0QsZ0JBQUwsQ0FBc0JqRCxRQUF0QixFQUFnQ0QsR0FBaEMsQ0FGVDtBQUdFLDhCQUFVLE9BQUswQyxxQkFBTCxDQUEyQnpDLFFBQTNCLEVBQXFDRCxHQUFyQyxFQUEwQ29KLGVBQTFDLENBSFo7QUFJRSw0QkFBUSxPQUFLakcsY0FBTCxDQUFvQmxELFFBQXBCLEVBQThCRCxHQUE5QixFQUFtQ29KLGVBQW5DLENBSlY7QUFLRSw2QkFBUyxPQUFLL0YsV0FBTCxDQUFpQixNQUFqQixFQUF5QnJELElBQUlnRSxhQUE3QixFQUE0Qy9ELFFBQTVDLEVBQXNEdUgsT0FBT2xJLFNBQTdELENBTFg7QUFNRSwrQkFBVyxPQUFLUyxpQkFBTCxDQUF1QkMsR0FBdkIsRUFBNEJDLFFBQTVCLENBTmI7QUFPRSw4QkFBVSxPQUFLNkYsaUJBQUwsQ0FBdUI3RixRQUF2QixFQUFpQ0QsR0FBakMsQ0FQWjtBQVFFLGlEQUEyQixPQUFLeEUsS0FBTCxDQUFXcEMsSUFBWCxDQUFnQkksRUFBM0MsU0FBaURnTyxPQUFPbEksU0FBeEQsU0FBcUVXO0FBUnZFLHFCQVNNRCxJQUFJcUosa0JBVFY7QUFVRSw4QkFBVSxPQUFLOUUseUJBQUwsQ0FBK0J0RSxRQUEvQixFQUF5Q0QsR0FBekMsRUFBOEMsTUFBOUMsQ0FWWjtBQVdFLDJCQUFPd0gsT0FBT1MsS0FYaEI7QUFZRSw4QkFBVTFCO0FBWloscUJBRGdCO0FBQUEsaUJBQWxCO0FBZ0JEO0FBQ0Qsa0JBQUksQ0FBQ2lCLE9BQU9WLFVBQVosRUFBd0I7QUFDdEJVLHVCQUFPVixVQUFQLEdBQW9CO0FBQUEseUJBQ2xCLDhCQUFDLDJCQUFEO0FBQ0UsMEJBQUssTUFEUDtBQUVFLDJCQUFPLE9BQUszQyxrQkFBTCxDQUF3QmxFLFFBQXhCLEVBQWtDRCxHQUFsQyxDQUZUO0FBR0UsOEJBQVUsT0FBS2dDLHVCQUFMLENBQTZCL0IsUUFBN0IsRUFBdUNELEdBQXZDLEVBQTRDb0osZUFBNUMsQ0FIWjtBQUlFLDRCQUFRLE9BQUtwRyxnQkFBTCxDQUFzQi9DLFFBQXRCLEVBQWdDRCxHQUFoQyxFQUFxQ29KLGVBQXJDLENBSlY7QUFLRSwrQkFBVyxPQUFLNUosbUJBTGxCO0FBTUUsOEJBQVUsT0FBS21HLG1CQUFMLENBQXlCMUYsUUFBekIsRUFBbUNELEdBQW5DLENBTlo7QUFPRSxtREFBNkIsT0FBS3hFLEtBQUwsQ0FBV3BDLElBQVgsQ0FBZ0JJLEVBQTdDLFNBQW1EZ08sT0FBT2xJLFNBQTFELFNBQXVFVztBQVB6RSxxQkFRTUQsSUFBSXNKLG9CQVJWO0FBU0UsOEJBQVUsT0FBSy9FLHlCQUFMLENBQStCdEUsUUFBL0IsRUFBeUNELEdBQXpDLEVBQThDLFFBQTlDLENBVFo7QUFVRSwyQkFBT3dILE9BQU9TLEtBVmhCO0FBV0UsOEJBQVUxQjtBQVhaLHFCQURrQjtBQUFBLGlCQUFwQjtBQWVEO0FBQ0Y7QUFDRCxnQkFBSSxPQUFLL0ssS0FBTCxDQUFXbUIsU0FBZixFQUEwQjtBQUN4QixrQkFBSSxDQUFDNkssT0FBT1QsVUFBWixFQUF3QjtBQUN0QlMsdUJBQU9ULFVBQVAsR0FBb0I7QUFBQSx5QkFDbEIsOEJBQUMsMkJBQUQ7QUFDRSwwQkFBSyxNQURQO0FBRUUsMkJBQU8sT0FBSzFDLGtCQUFMLENBQXdCckUsR0FBeEIsQ0FGVDtBQUdFLDhCQUFVLE9BQUt3Qix1QkFBTCxDQUE2QnhCLEdBQTdCLEVBQWtDb0osZUFBbEMsQ0FIWjtBQUlFLG1EQUE2QixPQUFLNU4sS0FBTCxDQUFXcEMsSUFBWCxDQUFnQkksRUFBN0MsU0FBbURnTyxPQUFPbEk7QUFKNUQscUJBS01VLElBQUl1SixvQkFMVjtBQU1FLDJCQUFPL0IsT0FBT1MsS0FOaEI7QUFPRSw4QkFBVTFCO0FBUFoscUJBRGtCO0FBQUEsaUJBQXBCO0FBV0Q7QUFDRjtBQUNEO0FBQ0YsZUFBSyxRQUFMO0FBQWU7QUFBQSxrQkFDTGtELElBREssR0FDSSxPQUFLak8sS0FEVCxDQUNMaU8sSUFESzs7QUFFYixrQkFBTUMsZ0JBQWdCMUosSUFBSTJKLHNCQUFKLElBQ3BCLE9BQUtuTyxLQUFMLENBQVdtTyxzQkFBWCxDQUFrQ3JGLEdBQWxDLENBQXNDa0QsT0FBT2xJLFNBQTdDLENBREY7QUFFQSxrQkFBTXNLLHFCQUFxQjVKLElBQUk2SiwyQkFBSixJQUN6QjtBQUNFQyw2QkFBYUwsS0FBS00sYUFBTCxDQUFtQixFQUFFdlEsSUFBSSw0QkFBTixFQUFuQixDQURmO0FBRUV3USwrQkFBZVAsS0FBS00sYUFBTCxDQUFtQixFQUFFdlEsSUFBSSwrQkFBTixFQUFuQjtBQUZqQixlQURGO0FBS0Esa0JBQUksT0FBS2dDLEtBQUwsQ0FBV2MsVUFBZixFQUEyQjtBQUN6QixvQkFBSSxDQUFDa0wsT0FBT1gsUUFBWixFQUFzQjtBQUNwQlcseUJBQU9YLFFBQVAsR0FBa0I7QUFBQSwyQkFDaEIsOEJBQUMsbUNBQUQ7QUFDRSw0QkFBTTdHLElBQUlpQixZQUFKLENBQWlCQyxJQUFqQixLQUEwQixRQUExQixHQUFxQ2pCLFFBRDdDO0FBRUUsK0JBQ0VELElBQUlpSyxvQkFBSixJQUE0QlAsYUFBNUIsR0FDRTFKLElBQUlpSyxvQkFBSixDQUF5QlAsY0FBY1EsS0FBZCxFQUF6QixFQUFnRGpLLFFBQWhELEVBQTBERCxHQUExRCxDQURGLEdBRUUwSixhQUxOO0FBT0UsNkJBQU8sT0FBS3hHLGdCQUFMLENBQXNCakQsUUFBdEIsRUFBZ0NELEdBQWhDLENBUFQ7QUFRRSxnQ0FBVSxPQUFLMEMscUJBQUwsQ0FBMkJ6QyxRQUEzQixFQUFxQ0QsR0FBckMsRUFBMENvSixlQUExQyxDQVJaO0FBU0UsOEJBQVEsT0FBS2pHLGNBQUwsQ0FBb0JsRCxRQUFwQixFQUE4QkQsR0FBOUIsQ0FUVjtBQVVFLCtCQUFTLE9BQUtxRCxXQUFMLENBQWlCLE1BQWpCLEVBQXlCckQsSUFBSWdFLGFBQTdCLEVBQTRDL0QsUUFBNUMsRUFBc0R1SCxPQUFPbEksU0FBN0QsQ0FWWDtBQVdFLGtDQUFZb0ssaUJBQWtCQSxjQUFjcEksTUFBZCxHQUF1QixDQVh2RDtBQVlFLGlDQUFXLENBQUN0QixJQUFJZ0ksVUFabEI7QUFhRSx3Q0FBa0IsS0FicEI7QUFjRSx1Q0FBaUIsS0FkbkI7QUFlRSx1Q0FmRjtBQWdCRSwyQkFBSyxPQUFLbEMsaUJBQUwsQ0FBdUI3RixRQUF2QixFQUFpQ0QsR0FBakMsQ0FoQlA7QUFpQkUsa0NBQVk7QUFDVnhHLHFEQUEyQixPQUFLZ0MsS0FBTCxDQUFXcEMsSUFBWCxDQUFnQkksRUFBM0MsU0FBaURnTyxPQUFPbEksU0FBeEQsU0FBcUVXO0FBRDNEO0FBakJkLHVCQW9CTUQsSUFBSXFKLGtCQXBCVjtBQXFCRSxnQ0FBVSxPQUFLOUUseUJBQUwsQ0FBK0J0RSxRQUEvQixFQUF5Q0QsR0FBekMsRUFBOEMsTUFBOUMsQ0FyQlo7QUFzQkUsZ0NBQVV1RztBQXRCWix1QkF1Qk1xRCxrQkF2Qk4sRUFEZ0I7QUFBQSxtQkFBbEI7QUEyQkQ7QUFDRCxvQkFBSSxDQUFDcEMsT0FBT1YsVUFBWixFQUF3QjtBQUN0QlUseUJBQU9WLFVBQVAsR0FBb0I7QUFBQSwyQkFDbEIsOEJBQUMsbUNBQUQ7QUFDRSw0QkFBTTlHLElBQUlpQixZQUFKLENBQWlCQyxJQUFqQixLQUEwQixVQUExQixHQUF1Q2pCLFFBRC9DO0FBRUUsK0JBQ0VELElBQUltSyxzQkFBSixJQUE4QlQsYUFBOUIsR0FDRTFKLElBQUltSyxzQkFBSixDQUEyQlQsY0FBY1EsS0FBZCxFQUEzQixFQUFrRGpLLFFBQWxELEVBQTRERCxHQUE1RCxDQURGLEdBRUUwSixhQUxOO0FBT0UsNkJBQU8sT0FBS3ZGLGtCQUFMLENBQXdCbEUsUUFBeEIsRUFBa0NELEdBQWxDLENBUFQ7QUFRRSxnQ0FBVSxPQUFLZ0MsdUJBQUwsQ0FBNkIvQixRQUE3QixFQUF1Q0QsR0FBdkMsRUFBNENvSixlQUE1QyxDQVJaO0FBU0UsOEJBQVEsT0FBS3BHLGdCQUFMLENBQXNCL0MsUUFBdEIsRUFBZ0NELEdBQWhDLENBVFY7QUFVRSxrQ0FBWTBKLGlCQUFrQkEsY0FBY3BJLE1BQWQsR0FBdUIsQ0FWdkQ7QUFXRSxpQ0FBVyxDQUFDdEIsSUFBSWdJLFVBWGxCO0FBWUUsd0NBQWtCLEtBWnBCO0FBYUUsdUNBQWlCLEtBYm5CO0FBY0UsdUNBZEY7QUFlRSwyQkFBSyxPQUFLckMsbUJBQUwsQ0FBeUIxRixRQUF6QixFQUFtQ0QsR0FBbkMsQ0FmUDtBQWdCRSxrQ0FBWTtBQUNWeEcsdURBQTZCLE9BQUtnQyxLQUFMLENBQVdwQyxJQUFYLENBQWdCSSxFQUE3QyxTQUFtRGdPLE9BQU9sSSxTQUExRCxTQUF1RVc7QUFEN0Q7QUFoQmQsdUJBbUJNRCxJQUFJc0osb0JBbkJWO0FBb0JFLGdDQUFVLE9BQUsvRSx5QkFBTCxDQUErQnRFLFFBQS9CLEVBQXlDRCxHQUF6QyxFQUE4QyxRQUE5QyxDQXBCWjtBQXFCRSxnQ0FBVXVHO0FBckJaLHVCQXNCTXFELGtCQXRCTixFQURrQjtBQUFBLG1CQUFwQjtBQTBCRDtBQUNGO0FBQ0Qsa0JBQUksT0FBS3BPLEtBQUwsQ0FBV21CLFNBQWYsRUFBMEI7QUFDeEIsb0JBQUksQ0FBQzZLLE9BQU9ULFVBQVosRUFBd0I7QUFDdEJTLHlCQUFPVCxVQUFQLEdBQW9CO0FBQUEsMkJBQ2xCLDhCQUFDLG1DQUFEO0FBQ0UsNEJBQU0vRyxJQUFJaUIsWUFBSixDQUFpQkMsSUFBakIsS0FBMEIsU0FEbEM7QUFFRSwrQkFDRWxCLElBQUlvSyxzQkFBSixJQUE4QlYsYUFBOUIsR0FDRTFKLElBQUlvSyxzQkFBSixDQUEyQlYsY0FBY1EsS0FBZCxFQUEzQixFQUFrRGxLLEdBQWxELENBREYsR0FFRTBKLGFBTE47QUFNRSw2QkFBTyxPQUFLckYsa0JBQUwsQ0FBd0JyRSxHQUF4QixDQU5UO0FBT0UsZ0NBQVUsT0FBS3dCLHVCQUFMLENBQTZCeEIsR0FBN0IsRUFBa0NvSixlQUFsQyxDQVBaO0FBUUUsa0NBQVlNLGlCQUFrQkEsY0FBY3BJLE1BQWQsR0FBdUIsQ0FSdkQ7QUFTRSxxQ0FURjtBQVVFLHVDQUFpQixLQVZuQjtBQVdFLHVDQVhGO0FBWUUsa0NBQVk7QUFDVjlILHVEQUE2QixPQUFLZ0MsS0FBTCxDQUFXcEMsSUFBWCxDQUFnQkksRUFBN0MsU0FBbURnTyxPQUFPbEk7QUFEaEQ7QUFaZCx1QkFlTVUsSUFBSXVKLG9CQWZWO0FBZ0JFLGdDQUFVaEQ7QUFoQlosdUJBaUJNcUQsa0JBakJOLEVBRGtCO0FBQUEsbUJBQXBCO0FBcUJEO0FBQ0Y7QUFDRDtBQUNEO0FBQ0QsZUFBSyxNQUFMO0FBQWE7QUFDWCxrQkFBSSxPQUFLcE8sS0FBTCxDQUFXYyxVQUFmLEVBQTJCO0FBQ3pCLG9CQUFJLENBQUNrTCxPQUFPWCxRQUFaLEVBQXNCO0FBQ3BCVyx5QkFBT1gsUUFBUCxHQUFrQjtBQUFBLDJCQUNoQiw4QkFBQyx3QkFBRDtBQUNFLDZCQUFPLE9BQUszRCxnQkFBTCxDQUFzQmpELFFBQXRCLEVBQWdDRCxHQUFoQyxDQURUO0FBRUUsZ0NBQVUsT0FBSzBDLHFCQUFMLENBQTJCekMsUUFBM0IsRUFBcUNELEdBQXJDLEVBQTBDb0osZUFBMUMsQ0FGWjtBQUdFLDhCQUFRLE9BQUs1TixLQUFMLENBQVdiLFFBSHJCO0FBSUUsa0NBQVksT0FBS2EsS0FBTCxDQUFXVCxVQUp6QjtBQUtFLGdDQUFVLE9BQUsrSyxpQkFBTCxDQUF1QjdGLFFBQXZCLEVBQWlDRCxHQUFqQyxDQUxaO0FBTUUsa0NBQVk7QUFDVnVHLDBDQURVO0FBRVYvTSxxREFBMkIsT0FBS2dDLEtBQUwsQ0FBV3BDLElBQVgsQ0FBZ0JJLEVBQTNDLFNBQWlEZ08sT0FBT2xJLFNBQXhELFNBQXFFVyxRQUYzRDtBQUdWb0ssbUNBQVcsT0FBS3RLLGlCQUFMLENBQXVCQyxHQUF2QixFQUE0QkMsUUFBNUIsQ0FIRDtBQUlWcUssZ0NBQVEsT0FBS25ILGNBQUwsQ0FBb0JsRCxRQUFwQixFQUE4QkQsR0FBOUIsQ0FKRTtBQUtWdUssaUNBQVMsT0FBS2xILFdBQUwsQ0FBaUIsTUFBakIsRUFBeUJyRCxJQUFJZ0UsYUFBN0IsRUFBNEMvRCxRQUE1QyxFQUFzRHVILE9BQU9sSSxTQUE3RCxDQUxDO0FBTVYySSwrQkFBT1QsT0FBT1M7QUFOSjtBQU5kLHVCQWNNakksSUFBSXFKLGtCQWRWO0FBZUUsZ0NBQVUsT0FBSzlFLHlCQUFMLENBQStCdEUsUUFBL0IsRUFBeUNELEdBQXpDLEVBQThDLE1BQTlDO0FBZlosdUJBRGdCO0FBQUEsbUJBQWxCO0FBbUJEO0FBQ0Qsb0JBQUksQ0FBQ3dILE9BQU9WLFVBQVosRUFBd0I7QUFDdEJVLHlCQUFPVixVQUFQLEdBQW9CO0FBQUEsMkJBQ2xCLDhCQUFDLHdCQUFEO0FBQ0UsNkJBQU8sT0FBSzNDLGtCQUFMLENBQXdCbEUsUUFBeEIsRUFBa0NELEdBQWxDLENBRFQ7QUFFRSxnQ0FBVSxPQUFLZ0MsdUJBQUwsQ0FBNkIvQixRQUE3QixFQUF1Q0QsR0FBdkMsRUFBNENvSixlQUE1QyxDQUZaO0FBR0UsaUNBQVcsT0FBSzVKLG1CQUhsQjtBQUlFLDhCQUFRLE9BQUtoRSxLQUFMLENBQVdiLFFBSnJCO0FBS0Usa0NBQVksT0FBS2EsS0FBTCxDQUFXVCxVQUx6QjtBQU1FLGdDQUFVLE9BQUs0SyxtQkFBTCxDQUF5QjFGLFFBQXpCLEVBQW1DRCxHQUFuQyxDQU5aO0FBT0Usa0NBQVk7QUFDVnVHLDBDQURVO0FBRVYvTSx1REFBNkIsT0FBS2dDLEtBQUwsQ0FBV3BDLElBQVgsQ0FBZ0JJLEVBQTdDLFNBQW1EZ08sT0FBT2xJLFNBQTFELFNBQXVFVyxRQUY3RDtBQUdWZ0ksK0JBQU9ULE9BQU9TO0FBSEo7QUFQZCx1QkFZTWpJLElBQUlzSixvQkFaVjtBQWFFLGdDQUFVLE9BQUsvRSx5QkFBTCxDQUErQnRFLFFBQS9CLEVBQXlDRCxHQUF6QyxFQUE4QyxRQUE5QztBQWJaLHVCQURrQjtBQUFBLG1CQUFwQjtBQWlCRDtBQUNGO0FBQ0Qsa0JBQUksT0FBS3hFLEtBQUwsQ0FBV21CLFNBQWYsRUFBMEI7QUFDeEIsb0JBQUksQ0FBQzZLLE9BQU9ULFVBQVosRUFBd0I7QUFDdEJTLHlCQUFPVCxVQUFQLEdBQW9CO0FBQUEsMkJBQ2xCLDhCQUFDLHdCQUFEO0FBQ0UsNkJBQU8sT0FBSzFDLGtCQUFMLENBQXdCckUsR0FBeEIsQ0FEVDtBQUVFLGdDQUFVLE9BQUt3Qix1QkFBTCxDQUE2QnhCLEdBQTdCLEVBQWtDb0osZUFBbEMsQ0FGWjtBQUdFLGtDQUFZLE9BQUs1TixLQUFMLENBQVdULFVBSHpCO0FBSUUsOEJBQVEsT0FBS1MsS0FBTCxDQUFXYixRQUpyQjtBQUtFLGtDQUFZO0FBQ1Y0TCwwQ0FEVTtBQUVWL00sdURBQTZCLE9BQUtnQyxLQUFMLENBQVdwQyxJQUFYLENBQWdCSSxFQUE3QyxTQUFtRGdPLE9BQU9sSSxTQUZoRDtBQUdWMkksK0JBQU9ULE9BQU9TO0FBSEo7QUFMZCx1QkFVTWpJLElBQUl1SixvQkFWVixFQURrQjtBQUFBLG1CQUFwQjtBQWNEO0FBQ0Y7QUFDRDtBQUNEO0FBQ0QsZUFBSyxTQUFMO0FBQWdCO0FBQUEsa0JBQ05FLEtBRE0sR0FDRyxPQUFLak8sS0FEUixDQUNOaU8sSUFETTs7QUFFZCxrQkFBTUMsaUJBQWdCLENBQ3BCLEVBQUU1SCxPQUFPLElBQVQsRUFBZTBJLE9BQU9mLE1BQUtNLGFBQUwsQ0FBbUIsRUFBRXZRLElBQUksVUFBTixFQUFuQixDQUF0QixFQURvQixFQUVwQixFQUFFc0ksT0FBTyxLQUFULEVBQWdCMEksT0FBT2YsTUFBS00sYUFBTCxDQUFtQixFQUFFdlEsSUFBSSxTQUFOLEVBQW5CLENBQXZCLEVBRm9CLENBQXRCOztBQUtBLGtCQUFNb1Esc0JBQXFCNUosSUFBSTZKLDJCQUFKLElBQW1DO0FBQzVEQyw2QkFBYUwsTUFBS00sYUFBTCxDQUFtQixFQUFFdlEsSUFBSSw0QkFBTixFQUFuQixDQUQrQztBQUU1RHdRLCtCQUFlUCxNQUFLTSxhQUFMLENBQW1CLEVBQUV2USxJQUFJLCtCQUFOLEVBQW5CO0FBRjZDLGVBQTlEOztBQUtBLGtCQUFJLE9BQUtnQyxLQUFMLENBQVdjLFVBQWYsRUFBMkI7QUFDekIsb0JBQUksQ0FBQ2tMLE9BQU9YLFFBQVosRUFBc0I7QUFDcEJXLHlCQUFPWCxRQUFQLEdBQWtCO0FBQUEsMkJBQ2hCLDhCQUFDLG1DQUFEO0FBQ0UsNEJBQU03RyxJQUFJaUIsWUFBSixDQUFpQkMsSUFBakIsS0FBMEIsUUFBMUIsR0FBcUNqQixRQUQ3QztBQUVFLCtCQUFTeUosY0FGWDtBQUdFLDZCQUFPLE9BQUt4RyxnQkFBTCxDQUFzQmpELFFBQXRCLEVBQWdDRCxHQUFoQyxDQUhUO0FBSUUsZ0NBQVUsT0FBSzBDLHFCQUFMLENBQTJCekMsUUFBM0IsRUFBcUNELEdBQXJDLEVBQTBDb0osZUFBMUMsQ0FKWjtBQUtFLDhCQUFRLE9BQUtqRyxjQUFMLENBQW9CbEQsUUFBcEIsRUFBOEJELEdBQTlCLENBTFY7QUFNRSwrQkFBUyxPQUFLcUQsV0FBTCxDQUFpQixNQUFqQixFQUF5QnJELElBQUlnRSxhQUE3QixFQUE0Qy9ELFFBQTVDLEVBQXNEdUgsT0FBT2xJLFNBQTdELENBTlg7QUFPRSxrQ0FBWSxLQVBkO0FBUUUsaUNBQVcsQ0FBQ1UsSUFBSWdJLFVBUmxCO0FBU0Usd0NBQWtCLEtBVHBCO0FBVUUsdUNBQWlCLEtBVm5CO0FBV0UsdUNBWEY7QUFZRSwyQkFBSyxPQUFLbEMsaUJBQUwsQ0FBdUI3RixRQUF2QixFQUFpQ0QsR0FBakMsQ0FaUDtBQWFFLGtDQUFZO0FBQ1Z4RyxxREFBMkIsT0FBS2dDLEtBQUwsQ0FBV3BDLElBQVgsQ0FBZ0JJLEVBQTNDLFNBQWlEZ08sT0FBT2xJLFNBQXhELFNBQXFFVztBQUQzRDtBQWJkLHVCQWdCTUQsSUFBSXFKLGtCQWhCVjtBQWlCRSxnQ0FBVSxPQUFLOUUseUJBQUwsQ0FBK0J0RSxRQUEvQixFQUF5Q0QsR0FBekMsRUFBOEMsTUFBOUMsQ0FqQlo7QUFrQkUsZ0NBQVV1RztBQWxCWix1QkFtQk1xRCxtQkFuQk4sRUFEZ0I7QUFBQSxtQkFBbEI7QUF1QkQ7QUFDRCxvQkFBSSxDQUFDcEMsT0FBT1YsVUFBWixFQUF3QjtBQUN0QlUseUJBQU9WLFVBQVAsR0FBb0I7QUFBQSwyQkFDbEIsOEJBQUMsbUNBQUQ7QUFDRSw0QkFBTTlHLElBQUlpQixZQUFKLENBQWlCQyxJQUFqQixLQUEwQixVQUExQixHQUF1Q2pCLFFBRC9DO0FBRUUsK0JBQVN5SixjQUZYO0FBR0UsNkJBQU8sT0FBS3ZGLGtCQUFMLENBQXdCbEUsUUFBeEIsRUFBa0NELEdBQWxDLENBSFQ7QUFJRSxnQ0FBVSxPQUFLZ0MsdUJBQUwsQ0FBNkIvQixRQUE3QixFQUF1Q0QsR0FBdkMsRUFBNENvSixlQUE1QyxDQUpaO0FBS0UsOEJBQVEsT0FBS3BHLGdCQUFMLENBQXNCL0MsUUFBdEIsRUFBZ0NELEdBQWhDLENBTFY7QUFNRSxrQ0FBWSxLQU5kO0FBT0UsaUNBQVcsQ0FBQ0EsSUFBSWdJLFVBUGxCO0FBUUUsd0NBQWtCLEtBUnBCO0FBU0UsdUNBQWlCLEtBVG5CO0FBVUUsdUNBVkY7QUFXRSwyQkFBSyxPQUFLckMsbUJBQUwsQ0FBeUIxRixRQUF6QixFQUFtQ0QsR0FBbkMsQ0FYUDtBQVlFLGtDQUFZO0FBQ1Z4Ryx1REFBNkIsT0FBS2dDLEtBQUwsQ0FBV3BDLElBQVgsQ0FBZ0JJLEVBQTdDLFNBQW1EZ08sT0FBT2xJLFNBQTFELFNBQXVFVztBQUQ3RDtBQVpkLHVCQWVNRCxJQUFJc0osb0JBZlY7QUFnQkUsZ0NBQVUsT0FBSy9FLHlCQUFMLENBQStCdEUsUUFBL0IsRUFBeUNELEdBQXpDLEVBQThDLFFBQTlDLENBaEJaO0FBaUJFLGdDQUFVdUc7QUFqQlosdUJBa0JNcUQsbUJBbEJOLEVBRGtCO0FBQUEsbUJBQXBCO0FBc0JEO0FBQ0Y7QUFDRCxrQkFBSSxPQUFLcE8sS0FBTCxDQUFXbUIsU0FBZixFQUEwQjtBQUN4QixvQkFBSSxDQUFDNkssT0FBT1QsVUFBWixFQUF3QjtBQUN0QlMseUJBQU9ULFVBQVAsR0FBb0I7QUFBQSwyQkFDbEIsOEJBQUMsbUNBQUQ7QUFDRSw0QkFBTS9HLElBQUlpQixZQUFKLENBQWlCQyxJQUFqQixLQUEwQixTQURsQztBQUVFLCtCQUFTd0ksY0FGWDtBQUdFLDZCQUFPLE9BQUtyRixrQkFBTCxDQUF3QnJFLEdBQXhCLENBSFQ7QUFJRSxnQ0FBVSxPQUFLd0IsdUJBQUwsQ0FBNkJ4QixHQUE3QixFQUFrQ29KLGVBQWxDLENBSlo7QUFLRSxrQ0FBWSxLQUxkO0FBTUUscUNBTkY7QUFPRSx1Q0FBaUIsS0FQbkI7QUFRRSx1Q0FSRjtBQVNFLGtDQUFZO0FBQ1Y1UCx1REFBNkIsT0FBS2dDLEtBQUwsQ0FBV3BDLElBQVgsQ0FBZ0JJLEVBQTdDLFNBQW1EZ08sT0FBT2xJO0FBRGhEO0FBVGQsdUJBWU1VLElBQUl1SixvQkFaVjtBQWFFLGdDQUFVaEQ7QUFiWix1QkFjTXFELG1CQWROLEVBRGtCO0FBQUEsbUJBQXBCO0FBa0JEO0FBQ0Y7QUFDRDtBQUNEO0FBQ0Q7QUE1WkY7QUE4WkQ7QUFDRGhMLGNBQVFtRyxJQUFSLENBQWF5QyxNQUFiO0FBQ0QsS0FyZ0JEOztBQXVnQkEsUUFBSSxPQUFLaE0sS0FBTCxDQUFXOUIsVUFBZixFQUEyQjtBQUN6QmtGLGNBQVFtRyxJQUFSLENBQWE7QUFDWHlCLGVBQU8sRUFESTtBQUVYQyxxQkFBYSxLQUZGO0FBR1huSCxtQkFBVyxlQUhBO0FBSVhxSCxjQUFNO0FBQUEsaUJBQU0sSUFBTjtBQUFBLFNBSks7QUFLWEUsa0JBQVU7QUFBQSxpQkFBTSxJQUFOO0FBQUEsU0FMQztBQU1YQyxvQkFBWTtBQUFBLGlCQUNWLDhCQUFDLGdCQUFEO0FBQ0UsaURBQW1DLE9BQUt0TCxLQUFMLENBQVdwQyxJQUFYLENBQWdCSSxFQUFuRCxTQUF5RHlHLFFBRDNEO0FBRUUsa0JBQUssV0FGUDtBQUdFLGtCQUFLLFFBSFA7QUFJRSxtQkFBTyxFQUpUO0FBS0Usb0JBQVEsRUFMVjtBQU1FLHFCQUFTO0FBQUEscUJBQU0sT0FBS3pFLEtBQUwsQ0FBV2lQLGFBQVgsQ0FBeUIsT0FBS2pQLEtBQUwsQ0FBV3BDLElBQXBDLEVBQTBDNkcsUUFBMUMsQ0FBTjtBQUFBO0FBTlgsWUFEVTtBQUFBLFNBTkQ7QUFnQlg4RyxvQkFBWTtBQUFBLGlCQUFNLElBQU47QUFBQTtBQWhCRCxPQUFiO0FBa0JEO0FBQ0QsV0FBT25JLE9BQVA7QUFDRCxHOztPQUVEOEwsWSxHQUFlLFVBQUN6SyxRQUFELEVBQVdELEdBQVgsRUFBZ0JzRCxRQUFoQixFQUE2QjtBQUMxQyxRQUFJQSxhQUFhLE1BQWpCLEVBQXlCO0FBQ3ZCLGFBQU8sS0FBUDtBQUNEO0FBQ0QsUUFBTTlKLEtBQUssT0FBS29KLG1CQUFMLENBQXlCM0MsUUFBekIsQ0FBWDtBQUNBLFFBQUksT0FBS3pFLEtBQUwsQ0FBV3BCLFFBQVgsQ0FBb0JiLEtBQXBCLEVBQTJCQyxFQUEzQixTQUFrQ3dHLElBQUlpQixZQUF0QyxFQUFKLEVBQTBEO0FBQ3hELGFBQU8sSUFBUDtBQUNEO0FBQ0QsV0FBTyxLQUFQO0FBQ0QsRzs7T0FFRGxFLGtCLEdBQXFCLFlBQU07QUFDekIsV0FBS25CLGlCQUFMLEdBQXlCLElBQXpCO0FBQ0QsRzs7T0FFRG9CLG9CLEdBQXVCLFlBQU07QUFDM0IsUUFBSSxPQUFLeEIsS0FBTCxDQUFXdEIsYUFBWCxDQUF5QlEsSUFBN0IsRUFBbUM7QUFDakMsYUFBS21CLGVBQUwsR0FBdUIsSUFBdkI7QUFDQSxhQUFLdUQsUUFBTCxDQUFjO0FBQ1ozRCxvQkFBWW9HO0FBREEsT0FBZDtBQUdEO0FBQ0YsRzs7T0FFRDVFLDBCLEdBQTZCLFlBQU07QUFDakMsV0FBS25CLGdCQUFMLEdBQXdCLElBQXhCO0FBQ0QsRzs7T0FFRCtCLGMsR0FBaUIsVUFBQzRCLENBQUQsRUFBSVEsUUFBSixFQUFpQjtBQUNoQyxRQUFJLE9BQUt6RSxLQUFMLENBQVdtUCxTQUFYLElBQXdCLENBQUMsT0FBS25QLEtBQUwsQ0FBVzlCLFVBQXBDLElBQWtELENBQUMsT0FBSzhCLEtBQUwsQ0FBVy9CLFNBQWxFLEVBQTZFO0FBQzNFLFVBQUlnRyxFQUFFbUwsT0FBRixJQUFhbkwsRUFBRTRCLFFBQW5CLEVBQTZCO0FBQzNCckYsaUJBQVM2TyxZQUFULEdBQXdCQyxlQUF4QjtBQUNEO0FBQ0Q7QUFDQTtBQUwyRSxVQU1uRUMsVUFObUUsR0FNcER0TCxFQUFFbUMsTUFOa0QsQ0FNbkVtSixVQU5tRTs7QUFPM0UsVUFBTUMsZUFBZUQsV0FBV0UsU0FBWCxJQUF3QkYsV0FBV0UsU0FBWCxDQUFxQmpHLE9BQTdDLEdBQ2pCK0YsV0FBV0UsU0FETSxHQUVqQixFQUZKO0FBR0EsVUFBTUMsZUFBZUgsV0FBV0EsVUFBWCxDQUFzQkUsU0FBdEIsSUFBbUNGLFdBQVdBLFVBQVgsQ0FBc0JFLFNBQXRCLENBQWdDakcsT0FBbkUsQ0FBMkU7QUFBM0UsUUFDakIrRixXQUFXQSxVQUFYLENBQXNCRSxTQURMLEdBRWpCLEVBRko7QUFHQSxVQUNFRCxhQUFhaEcsT0FBYixDQUFxQixrQ0FBckIsTUFBNkQsQ0FBQyxDQUE5RCxJQUNBa0csYUFBYWxHLE9BQWIsQ0FBcUIsa0NBQXJCLE1BQTZELENBQUMsQ0FGaEUsRUFHRTtBQUNBLGVBQUt4SixLQUFMLENBQVc0SyxtQkFBWCxDQUNFLE9BQUs1SyxLQUFMLENBQVdwQyxJQURiLEVBRUU2RyxRQUZGLEVBR0UsT0FBS3pFLEtBQUwsQ0FBVzJQLFdBQVgsSUFBMEIxTCxFQUFFbUwsT0FIOUIsRUFJRSxPQUFLcFAsS0FBTCxDQUFXMlAsV0FBWCxJQUEwQjFMLEVBQUU0QixRQUo5QjtBQU1EO0FBQ0Y7QUFDRCxRQUFJLE9BQUs3RixLQUFMLENBQVc0UCxVQUFmLEVBQTJCO0FBQ3pCLGFBQUs1UCxLQUFMLENBQVc0UCxVQUFYLENBQXNCM0wsQ0FBdEIsRUFBeUJRLFFBQXpCLEVBQW1DLE9BQUt6RSxLQUFMLENBQVdyQixJQUFYLENBQWdCbUssR0FBaEIsQ0FBb0JyRSxRQUFwQixDQUFuQztBQUNEO0FBQ0QsV0FBTyxJQUFQO0FBQ0QsRzs7T0FFRHZCLGlCLEdBQW9CLFVBQUNlLENBQUQsRUFBSVEsUUFBSixFQUFpQjtBQUNuQyxRQUFJLE9BQUt6RSxLQUFMLENBQVc2UCxhQUFmLEVBQThCO0FBQzVCNUwsUUFBRW9CLGNBQUY7QUFDQXBCLFFBQUU2TCxlQUFGO0FBQ0EsYUFBSzlQLEtBQUwsQ0FBVzZQLGFBQVgsQ0FBeUI1TCxDQUF6QixFQUE0QlEsUUFBNUIsRUFBc0MsT0FBS3pFLEtBQUwsQ0FBV3JCLElBQVgsQ0FBZ0JtSyxHQUFoQixDQUFvQnJFLFFBQXBCLENBQXRDO0FBQ0Q7QUFDRCxRQUFJLE9BQUt6RSxLQUFMLENBQVcyRCxnQkFBZixFQUFpQztBQUMvQk0sUUFBRW9CLGNBQUY7QUFDQXBCLFFBQUU2TCxlQUFGO0FBQ0EsYUFBS2xNLFFBQUwsQ0FBYztBQUNaN0IseUJBQWlCLElBREw7QUFFWmdPLHNCQUFjOUwsRUFBRStMLE9BRko7QUFHWkMsc0JBQWNoTSxFQUFFaU0sT0FISjtBQUlaQyw2QkFBcUIxTDtBQUpULE9BQWQ7QUFNQWpFLGVBQVM0UCxnQkFBVCxDQUEwQixPQUExQixFQUFtQyxPQUFLMVAsZUFBeEM7QUFDQSxhQUFPLEtBQVA7QUFDRDtBQUNELFdBQU8sSUFBUDtBQUNELEc7O09BRUQyUCwwQixHQUE2QjtBQUFBLFdBQVcsWUFBTTtBQUFBLFVBQ3BDMVIsSUFEb0MsR0FDM0IsT0FBS3FCLEtBRHNCLENBQ3BDckIsSUFEb0M7QUFBQSxVQUVwQ3dSLG1CQUZvQyxHQUVaLE9BQUsxUyxLQUZPLENBRXBDMFMsbUJBRm9DOztBQUc1Q0csY0FBUUgsbUJBQVIsRUFBNkJ4UixLQUFLbUssR0FBTCxDQUFTcUgsbUJBQVQsQ0FBN0I7QUFDRCxLQUo0QjtBQUFBLEc7O09BTTdCSSxVLEdBQWE7QUFBQSxXQUFPLFVBQUNDLFNBQUQsRUFBZTtBQUFBLG9CQU03QixPQUFLeFEsS0FOd0I7QUFBQSxVQUUvQjlCLFVBRitCLFdBRS9CQSxVQUYrQjtBQUFBLFVBRy9CRCxTQUgrQixXQUcvQkEsU0FIK0I7QUFBQSxVQUkvQlksVUFKK0IsV0FJL0JBLFVBSitCO0FBQUEsVUFLL0JKLFlBTCtCLFdBSy9CQSxZQUwrQjs7QUFBQSxVQU96QmdHLFFBUHlCLEdBT0YrTCxTQVBFLENBT3pCL0wsUUFQeUI7QUFBQSxVQU9aekUsS0FQWSw0QkFPRndRLFNBUEU7O0FBUWpDLFVBQUlyRixhQUFKO0FBQ0EsVUFBSXJELFdBQVcsTUFBZjtBQUNBLFVBQUl3QixnQkFBZ0IsQ0FBcEIsQ0FWaUMsQ0FVVjtBQUN2QixVQUFJcEwsVUFBSixFQUFnQm9MLGdCQUFnQnpLLFdBQVdLLElBQTNCO0FBQ2hCLFVBQUloQixVQUFKLEVBQWdCO0FBQ2QsWUFBSXVHLFlBQWE2RSxnQkFBZ0IsQ0FBakMsRUFBcUM7QUFDbkMsY0FBSTlFLElBQUk4RyxVQUFSLEVBQW9CO0FBQ2xCSCxtQkFBTzNHLElBQUk4RyxVQUFKLENBQWU3RyxRQUFmLENBQVA7QUFDQXFELHVCQUFXLFFBQVg7QUFDRCxXQUhELE1BR087QUFDTHFELG1CQUFPLElBQVA7QUFDQXJELHVCQUFXLElBQVg7QUFDRDtBQUNGLFNBUkQsTUFRTztBQUNMcUQsaUJBQU8zRyxJQUFJMkcsSUFBSixDQUFTMUcsV0FBVzZFLGFBQXBCLENBQVA7QUFDRDtBQUNGLE9BWkQsTUFZTyxJQUFJckwsYUFBYXVHLElBQUk2RyxRQUFyQixFQUErQjtBQUNwQ0YsZUFBTzNHLElBQUk2RyxRQUFKLENBQWE1RyxXQUFXNkUsYUFBeEIsQ0FBUDtBQUNBeEIsbUJBQVcsTUFBWDtBQUNELE9BSE0sTUFHQTtBQUNMcUQsZUFBTzNHLElBQUkyRyxJQUFKLENBQVMxRyxXQUFXNkUsYUFBcEIsQ0FBUDtBQUNEO0FBQ0QsVUFBTW1ILFlBQVlELFVBQVUxTSxTQUFWLEtBQXdCLG1CQUF4QixJQUErQzBNLFVBQVUxTSxTQUFWLEtBQXdCLGFBQXpGO0FBQ0EsVUFBSSxDQUFDZ0UsYUFBYSxNQUFiLElBQXVCQSxhQUFhLE1BQXBDLElBQThDQSxhQUFhLFFBQTVELEtBQXlFLENBQUMySSxTQUE5RSxFQUF5RjtBQUN2RixZQUFNQyxjQUFlNUksYUFBYSxRQUFkLEdBQTBCckQsUUFBMUIsR0FBc0NBLFdBQVc2RSxhQUFyRTtBQUNBLFlBQU1xSCxjQUFjLE9BQUtqSCxlQUFMLENBQXFCZ0gsV0FBckIsRUFBa0NsTSxHQUFsQyxFQUF1Q3NELFFBQXZDLENBQXBCO0FBQ0EsWUFBTThJLFdBQVcsT0FBSzFCLFlBQUwsQ0FBa0J3QixXQUFsQixFQUErQmxNLEdBQS9CLEVBQW9Dc0QsUUFBcEMsQ0FBakI7QUFDQSxZQUFNMkgsWUFBYWhSLGFBQWFxSyxHQUFiLENBQWlCLFVBQWpCLE1BQWlDckUsUUFBakMsSUFBNkNoRyxhQUFhcUssR0FBYixDQUFpQixXQUFqQixNQUFrQzlJLE1BQU04RCxTQUF0RixHQUNoQiw4QkFEZ0IsR0FDaUIsa0JBRG5DO0FBRUEsZUFDRTtBQUFDLDhCQUFEO0FBQUEsdUJBQ005RCxLQUROO0FBRUUsdUJBQVd5UCxTQUZiO0FBR0UsbUJBQU9qTCxJQUFJaUksS0FIYjtBQUlFLHFCQUFTLE9BQUt2QyxnQkFBTCxDQUFzQnBDLFFBQXRCLEVBQWdDckQsUUFBaEMsRUFBMEN6RSxNQUFNOEQsU0FBaEQ7QUFKWDtBQU1FO0FBQUMsaUNBQUQ7QUFBQTtBQUNFLGtCQUFJZ0UsV0FBV3RELElBQUlWLFNBQWYsSUFBNEJXLFdBQVc2RSxhQUF2QyxDQUROO0FBRUUsd0JBQVVzSCxRQUZaO0FBR0UsdUJBQVMsQ0FBQyxDQUFDRCxZQUFZOUcsWUFIekI7QUFJRSx5QkFBVyxDQUFDLENBQUM4RyxZQUFZN0csY0FKM0I7QUFLRSwyQkFBYTZHLFlBQVkvRyxXQUwzQjtBQU1FLDRCQUFjK0csWUFBWTlHLFlBTjVCO0FBT0UsOEJBQWdCOEcsWUFBWTdHO0FBUDlCO0FBU0lxQjtBQVRKO0FBTkYsU0FERjtBQW9CRDtBQUNELGFBQ0U7QUFBQyw0QkFBRDtBQUFBLHFCQUFVbkwsS0FBVixJQUFpQixXQUFVLGtCQUEzQixFQUE4QyxPQUFPd0UsSUFBSWlJLEtBQXpEO0FBQWtFdEI7QUFBbEUsT0FERjtBQUdELEtBN0RZO0FBQUEsRzs7T0ErRGJoSSxhLEdBQWdCLFlBQU07QUFDcEIsUUFBSSxDQUFDLE9BQUtuRCxLQUFMLENBQVdmLFdBQVosSUFBMkIsQ0FBQyxPQUFLZSxLQUFMLENBQVduQyxNQUF2QyxJQUFpRCxDQUFDLE9BQUttQyxLQUFMLENBQVc5QixVQUFqRSxFQUE2RTtBQUMzRSxhQUNFLDhCQUFDLHNCQUFEO0FBQ0UsbUJBQVUsaUJBRFo7QUFFRSxnQkFBUTtBQUFDLDhCQUFEO0FBQUEsWUFBTSxPQUFPLEVBQUUyUyxXQUFXLFFBQWIsRUFBYjtBQUFzQyx3Q0FBQywyQkFBRCxJQUFHLElBQUcsY0FBTjtBQUF0QyxTQUZWO0FBR0UsZUFBTyxFQUhUO0FBSUUscUJBQWEsS0FKZjtBQUtFLGtCQUFVO0FBTFosUUFERjtBQVNEO0FBQ0QsUUFBSSxDQUFDLE9BQUs3USxLQUFMLENBQVd6QixjQUFYLENBQTBCVyxJQUEvQixFQUFxQztBQUNuQyxVQUFJLE9BQUtjLEtBQUwsQ0FBV25DLE1BQWYsRUFBdUI7QUFDckIsZUFDRSw4QkFBQyxzQkFBRDtBQUNFLHFCQUFVLGlCQURaO0FBRUUsa0JBQVE7QUFBQyxnQ0FBRDtBQUFBO0FBQUE7QUFBQSxXQUZWO0FBR0UsaUJBQU8sRUFIVDtBQUlFLHVCQUFhLEtBSmY7QUFLRSxvQkFBVTtBQUxaLFVBREY7QUFTRDtBQUNELGFBQ0UsOEJBQUMsc0JBQUQ7QUFDRSxtQkFBVSxpQkFEWjtBQUVFLGdCQUFRO0FBQUMsOEJBQUQ7QUFBQSxZQUFNLE9BQU8sRUFBRWdULFdBQVcsUUFBYixFQUFiO0FBQXNDLHdDQUFDLDJCQUFELElBQUcsSUFBRyxnQkFBTjtBQUF0QyxTQUZWO0FBR0UsZUFBTyxFQUhUO0FBSUUscUJBQWEsS0FKZjtBQUtFLGtCQUFVO0FBTFosUUFERjtBQVNEO0FBQ0QsUUFBTXpOLFVBQVUsT0FBS3lILGVBQUwsRUFBaEI7QUFDQSxRQUFJekgsUUFBUTBOLE1BQVIsS0FBbUIsQ0FBdkIsRUFBMEIsT0FBTyxJQUFQO0FBQzFCLFdBQU8xTixRQUFRMk4sR0FBUixDQUFZO0FBQUEsYUFDakIsOEJBQUMsc0JBQUQ7QUFDRSxhQUFLdk0sSUFBSVYsU0FEWDtBQUVFLG1CQUFXVSxJQUFJVixTQUZqQjtBQUdFLGdCQUNFO0FBQUMsOEJBQUQ7QUFBQTtBQUNFLGtCQUFNLE9BQUs5RCxLQUFMLENBQVdwQyxJQURuQjtBQUVFLHFCQUFTLE9BQUtvQyxLQUFMLENBQVdvRCxPQUZ0QjtBQUdFLG9CQUFRb0IsR0FIVjtBQUlFLCtCQUFtQixPQUFLeEUsS0FBTCxDQUFXM0IsVUFKaEM7QUFLRSw4QkFBa0IsT0FBSzJCLEtBQUwsQ0FBVzFCLFNBTC9CO0FBTUUsMEJBQWMsT0FBSzBCLEtBQUwsQ0FBV2dSLFVBTjNCO0FBT0Usb0JBQVEsT0FBS2hSLEtBQUwsQ0FBV25DLE1BUHJCO0FBUUUsdUJBQVcsT0FBS21DLEtBQUwsQ0FBVzdCO0FBUnhCO0FBVUdxRyxjQUFJeUg7QUFWUCxTQUpKO0FBaUJFLGNBQU0sT0FBS3NFLFVBQUwsQ0FBZ0IvTCxHQUFoQixDQWpCUjtBQWtCRSxlQUFPLE9BQUt4RSxLQUFMLENBQVd4QixZQUFYLENBQXdCc0ssR0FBeEIsQ0FBNEJ0RSxJQUFJVixTQUFoQyxFQUEyQ1UsSUFBSXdHLEtBQS9DLENBbEJUO0FBbUJFLGtCQUFVeEcsSUFBSTBILFFBbkJoQjtBQW9CRSxrQkFBVTFILElBQUkySCxRQXBCaEI7QUFxQkUscUJBQWEzSCxJQUFJeUcsV0FyQm5CO0FBc0JFLGtCQUFVekcsSUFBSW1JLFFBQUosR0FBZW5JLElBQUltSSxRQUFuQixHQUE4QixDQXRCMUM7QUF1QkUsZUFBT25JLElBQUk2SCxLQXZCYjtBQXdCRSw2QkFBcUI3SCxJQUFJOEg7QUF4QjNCLFFBRGlCO0FBQUEsS0FBWixDQUFQO0FBMkJELEc7O09BRUR0SyxpQixHQUFvQixZQUFNO0FBQUEsUUFDaEIyQixnQkFEZ0IsR0FDSyxPQUFLM0QsS0FEVixDQUNoQjJELGdCQURnQjtBQUFBLGlCQUtwQixPQUFLbEcsS0FMZTtBQUFBLFFBR3RCc1MsWUFIc0IsVUFHdEJBLFlBSHNCO0FBQUEsUUFJdEJFLFlBSnNCLFVBSXRCQSxZQUpzQjs7QUFNeEIsUUFBTXhELFFBQVE7QUFDWndFLGVBQVMsT0FERztBQUVaQyxjQUFRLEtBRkk7QUFHWkMsZ0JBQVUsVUFIRTtBQUlaQyxXQUFRbkIsWUFBUixPQUpZO0FBS1pvQixZQUFTdEIsWUFBVDtBQUxZLEtBQWQ7QUFPQSxXQUNFO0FBQUE7QUFBQSxRQUFJLFdBQVUsNkNBQWQsRUFBNEQsT0FBT3RELEtBQW5FO0FBQ0k5SSwwQkFBb0JBLGlCQUFpQm9OLEdBQXJDLElBQTRDcE4saUJBQWlCb04sR0FBakIsQ0FBcUIsVUFBQ08sSUFBRCxFQUFPQyxDQUFQO0FBQUEsZUFDakU7QUFBQyxrQ0FBRDtBQUFBO0FBQ0UsaUJBQUtBLENBRFAsQ0FDVTtBQURWLGNBRUUsUUFBUUQsS0FBS3JGLE1BRmY7QUFHRSxxQkFBU3FGLEtBQUtFLE9BSGhCO0FBSUUsc0JBQVVGLEtBQUszTCxRQUpqQjtBQUtFLG1CQUFPMkwsS0FBS0csS0FMZDtBQU1FLHFCQUFTSCxLQUFLaEIsT0FBTCxJQUFnQixPQUFLRCwwQkFBTCxDQUFnQ2lCLEtBQUtoQixPQUFyQztBQU4zQjtBQVFJZ0IsZUFBS2hMO0FBUlQsU0FEaUU7QUFBQSxPQUFyQjtBQURoRCxLQURGO0FBZ0JELEc7O2tCQTd2Q2tCeEcsUSIsImZpbGUiOiJkYXRhZ3JpZC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1sb25lbHktaWYsIHByZWZlci10ZW1wbGF0ZSwgcmVhY3QvcmVxdWlyZS1kZWZhdWx0LXByb3BzICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTWFwLCBMaXN0IH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge1xuICBpbmplY3RJbnRsLFxuICBGb3JtYXR0ZWRNZXNzYWdlIGFzIE0sXG4gIEZvcm1hdHRlZE51bWJlciBhcyBOLFxufSBmcm9tICdyZWFjdC1pbnRsJztcbmltcG9ydCB7IENvbHVtbiwgQ2VsbCB9IGZyb20gJ2ZpeGVkLWRhdGEtdGFibGUtMic7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgTWVudUl0ZW0gfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBGbG9hdGluZ1NlbGVjdCB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWZsb2F0aW5nLXNlbGVjdCc7XG5pbXBvcnQgeyBEYXRlSW5wdXQgfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1kYXRldGltZSc7XG5pbXBvcnQgeyBJY29uIH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtaWNvbnMnO1xuaW1wb3J0IHsgU3Bpbm5lciB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXNwaW5uZXInO1xuaW1wb3J0IENoZWNrYm94IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWNoZWNrYm94JztcbmltcG9ydCB7IGZvcm1hdEN1cnJlbmN5QW1vdW50IH0gZnJvbSAnQG9wdXNjYXBpdGEvZm9ybWF0LXV0aWxzJztcbmltcG9ydCAnZml4ZWQtZGF0YS10YWJsZS0yL2Rpc3QvZml4ZWQtZGF0YS10YWJsZS5jc3MnO1xuXG5pbXBvcnQgUmVzcG9uc2l2ZUZpeGVkRGF0YVRhYmxlIGZyb20gJy4vcmVzcG9uc2l2ZS1maXhlZC1kYXRhLXRhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgSGVhZGVyQ2VsbCBmcm9tICcuL2hlYWRlci1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgQWN0aW9uQmFyIGZyb20gJy4vYWN0aW9uLWJhci5jb21wb25lbnQnO1xuaW1wb3J0IElubGluZUVkaXRDb250cm9scyBmcm9tICcuL2lubGluZS1lZGl0LWNvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgRmlsdGVyaW5nQ29udHJvbHMgZnJvbSAnLi9maWx0ZXJpbmctY29udHJvbHMuY29tcG9uZW50JztcbmltcG9ydCBEcm9wZG93bkNvbnRyb2xzIGZyb20gJy4vZHJvcGRvd24tY29udHJvbHMuY29tcG9uZW50JztcbmltcG9ydCAqIGFzIGRhdGFncmlkQWN0aW9ucyBmcm9tICcuL2RhdGFncmlkLmFjdGlvbnMnO1xuaW1wb3J0IENlbGxUb29sdGlwIGZyb20gJy4vY2VsbC10b29sdGlwLmNvbXBvbmVudCc7XG5pbXBvcnQgQ29sdW1uU2V0dGluZ3NNb2RhbCBmcm9tICcuL2NvbHVtbi1zZXR0aW5ncy9jb2x1bW4tc2V0dGluZ3MuY29tcG9uZW50JztcbmltcG9ydCB7IHByb3BUeXBlcywgZGVmYXVsdFByb3BzIH0gZnJvbSAnLi9kYXRhZ3JpZC5wcm9wcyc7XG5pbXBvcnQgeyBLRVlfQ09ERVMgfSBmcm9tICcuL2RhdGFncmlkLmNvbnN0YW50cyc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9kYXRhZ3JpZC51dGlscyc7XG5pbXBvcnQgJy4vZGF0YWdyaWQuY29tcG9uZW50LnNjc3MnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUsIG93blByb3BzKSA9PiB7XG4gIGNvbnN0IEdSSUQgPSBvd25Qcm9wcy5ncmlkO1xuICByZXR1cm4ge1xuICAgIGlzQnVzeTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2lzQnVzeSddLCB0cnVlKSxcbiAgICBpc0VkaXRpbmc6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdpc0VkaXRpbmcnXSwgZmFsc2UpLFxuICAgIGlzQ3JlYXRpbmc6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdpc0NyZWF0aW5nJ10sIGZhbHNlKSxcbiAgICBpc0ZpbHRlcmluZzpcbiAgICAgIHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnaXNGaWx0ZXJpbmcnXSwgZmFsc2UpLFxuICAgIGlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW46XG4gICAgICBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnY29sdW1uU2V0dGluZ3NNb2RhbCcsICdvcGVuJ10sIGZhbHNlKSxcbiAgICBzb3J0Q29sdW1uOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdzb3J0aW5nRGF0YScsICdzb3J0Q29sdW1uJ10sIG51bGwpLFxuICAgIHNvcnRPcmRlcjogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnc29ydGluZ0RhdGEnLCAnc29ydE9yZGVyJ10sIG51bGwpLFxuICAgIHZpc2libGVDb2x1bW5zOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICd2aXNpYmxlQ29sdW1ucyddLCBMaXN0KCkpLFxuICAgIGNvbHVtbldpZHRoczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnY29sdW1uV2lkdGhzJ10sIE1hcCgpKSxcbiAgICBzZWxlY3RlZENlbGw6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2VsZWN0ZWRDZWxsJ10sIE1hcCgpKSxcbiAgICBzZWxlY3RlZEl0ZW1zOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3NlbGVjdGVkSXRlbXMnXSwgTGlzdCgpKSxcbiAgICBkYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2RhdGEnXSwgTGlzdCgpKSxcbiAgICBlZGl0RGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdlZGl0RGF0YSddLCBNYXAoKSksXG4gICAgY3JlYXRlRGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjcmVhdGVEYXRhJ10sIExpc3QoKSksXG4gICAgZmlsdGVyRGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdmaWx0ZXJEYXRhJ10sIE1hcCgpKSxcbiAgICBjZWxsTWVzc2FnZXM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY2VsbE1lc3NhZ2VzJ10sIE1hcCgpKSxcbiAgICBjcmVhdGVDZWxsTWVzc2FnZXM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY3JlYXRlQ2VsbE1lc3NhZ2VzJ10sIE1hcCgpKSxcbiAgICBhbGxEYXRhU2l6ZTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdhbGxEYXRhJ10sIExpc3QoKSkuc2l6ZSxcbiAgICBsYW5ndWFnZTogVXRpbHMuZ2V0TGFuZ3VhZ2UoR1JJRCwgc3RhdGUudXNlciksXG4gICAgZGF0ZUZvcm1hdDogVXRpbHMuZ2V0RGF0ZUZvcm1hdChHUklELCBzdGF0ZS51c2VyKSxcbiAgICB0aG91c2FuZFNlcGFyYXRvcjogVXRpbHMuZ2V0VGhvdXNhbmRTZXBhcmF0b3IoR1JJRCwgc3RhdGUudXNlciksXG4gICAgZGVjaW1hbFNlcGFyYXRvcjogVXRpbHMuZ2V0RGVjaW1hbFNlcGFyYXRvcihHUklELCBzdGF0ZS51c2VyKSxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRhdGFncmlkQWN0aW9ucztcblxuQGluamVjdEludGxcbkBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0YUdyaWQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHByb3BUeXBlcztcbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY3VycmVudFJvdzogMCxcbiAgICAgIGN1cnJlbnRDb2x1bW46IDAsXG4gICAgfTtcbiAgICB0aGlzLmNlbGxSZWZzID0ge307XG4gICAgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCA9IGZhbHNlO1xuICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gZmFsc2U7IC8vIFRPRE86IEhhbmRsZSBmb2N1c2luZyB3aGVuIHRydWVcbiAgICB0aGlzLmZvY3VzVG9FcnJvckNlbGwgPSBmYWxzZTsgLy8gVE9ETzogSGFuZGxlIGZvY3VzaW5nIHdoZW4gdHJ1ZVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uRG9jdW1lbnRDbGljayk7XG4gICAgdGhpcy5wcm9wcy5pbnZhbGlkYXRlKHRoaXMucHJvcHMuZ3JpZCk7XG4gIH1cblxuICBvbkRvY3VtZW50Q2xpY2sgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuY29udGV4dE1lbnVJdGVtcykge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGNvbnRleHRNZW51T3BlbjogZmFsc2UsXG4gICAgICB9KTtcbiAgICB9XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uRG9jdW1lbnRDbGljayk7XG4gIH1cblxuICBvbkNvbHVtblJlc2l6ZUVuZENhbGxiYWNrID0gKG5ld0NvbHVtbldpZHRoLCBjb2x1bW5LZXkpID0+IHtcbiAgICB0aGlzLnByb3BzLnJlc2l6ZUNvbHVtbih0aGlzLnByb3BzLmdyaWQsIGNvbHVtbktleSwgbmV3Q29sdW1uV2lkdGgpO1xuICB9XG5cbiAgb25DcmVhdGVDZWxsS2V5RG93biA9IChlKSA9PiB7XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLkVOVEVSKSB7XG4gICAgICB0aGlzLnByb3BzLmFkZE5ld0l0ZW0odGhpcy5wcm9wcy5ncmlkLCBVdGlscy5nZXRDb2x1bW5EZWZhdWx0VmFsdWVzKHRoaXMucHJvcHMuY29sdW1ucykpO1xuICAgICAgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgb25FZGl0Q2VsbEtleURvd24gPSAoY29sLCByb3dJbmRleCkgPT4gKGUpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5lbmFibGVBcnJvd05hdmlnYXRpb24pIHtcbiAgICAgIGNvbnN0IHsgY29sdW1ucyB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IHJvd3NTaXplID0gdGhpcy5wcm9wcy5kYXRhLnNpemU7XG4gICAgICBjb25zdCBjb2x1bW5LZXkgPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sKTtcbiAgICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLkRPV046IHtcbiAgICAgICAgICBpZiAoY29sLnZhbHVlVHlwZSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGNvbnN0IG5leHRFbGVtZW50ID0gdGhpcy5jZWxsUmVmc1tgJHt0aGlzLnByb3BzLmdyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4ICsgMX1gXTtcbiAgICAgICAgICAgIHRoaXMubW92ZUNlbGxGb2N1cyhuZXh0RWxlbWVudCwgcm93SW5kZXggKyAxLCAtMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLlVQOiB7XG4gICAgICAgICAgaWYgKGNvbC52YWx1ZVR5cGUgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBjb25zdCBuZXh0RWxlbWVudCA9IHRoaXMuY2VsbFJlZnNbYCR7dGhpcy5wcm9wcy5ncmlkLmlkfV8ke2NvbHVtbktleX1fJHtyb3dJbmRleCAtIDF9YF07XG4gICAgICAgICAgICB0aGlzLm1vdmVDZWxsRm9jdXMobmV4dEVsZW1lbnQsIHJvd0luZGV4IC0gMSwgLTEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5UQUI6XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLlJJR0hUOlxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5MRUZUOiB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGxldCBjb2x1bW5JbmQgPSBjb2x1bW5zLmZpbmRJbmRleChjID0+IGMudmFsdWVLZXlQYXRoLmpvaW4oKSA9PT0gY29sdW1uS2V5KTtcbiAgICAgICAgICBpZiAoY29sdW1uSW5kICE9PSAtMSkge1xuICAgICAgICAgICAgbGV0IGRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCBuZXh0RWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICBsZXQgcm93SW5kID0gcm93SW5kZXg7XG4gICAgICAgICAgICB3aGlsZSAoZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLkxFRlQgfHwgKGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLlRBQiAmJiBlLnNoaWZ0S2V5KSkge1xuICAgICAgICAgICAgICAgIGlmIChjb2x1bW5JbmQgLSAxID49IDApIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCAtPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm93SW5kIC0gMSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgPSBjb2x1bW5zLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgICByb3dJbmQgLT0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChjb2x1bW5JbmQgKyAxIDwgY29sdW1ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCArPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm93SW5kICsgMSA8IHJvd3NTaXplKSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgPSAwO1xuICAgICAgICAgICAgICAgICAgcm93SW5kICs9IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb25zdCBuZXh0Q29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbHVtbnNbY29sdW1uSW5kXSk7XG4gICAgICAgICAgICAgIG5leHRFbGVtZW50ID0gdGhpcy5jZWxsUmVmc1tgJHt0aGlzLnByb3BzLmdyaWQuaWR9XyR7bmV4dENvbHVtbktleX1fJHtyb3dJbmR9YF07XG4gICAgICAgICAgICAgIGRpc2FibGVkID0gbmV4dEVsZW1lbnQgPyBuZXh0RWxlbWVudC5kaXNhYmxlZCA6IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFkaXNhYmxlZCAmJiBuZXh0RWxlbWVudCkge1xuICAgICAgICAgICAgICB0aGlzLm1vdmVDZWxsRm9jdXMobmV4dEVsZW1lbnQsIHJvd0luZCwgY29sdW1uSW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbkZpbHRlckNlbGxWYWx1ZUNoYW5nZSA9IChjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZXZlbnRPckRhdGEpID0+IHtcbiAgICBsZXQgcmF3VmFsdWU7XG4gICAgLy8gZXZlbnRPckRhdGEgY2FuIGJlIGlucHV0IG9uQ2hhbmdlIGV2ZW50LCByZWFjdC1zZWxlY3Qgb25DaGFuZ2Ugb3IgcmVhY3QtZGF5LXBpY2tlciBvbkNoYW5nZVxuICAgIGlmIChldmVudE9yRGF0YSkge1xuICAgICAgaWYgKGV2ZW50T3JEYXRhLnRhcmdldCAhPT0gdW5kZWZpbmVkKSByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZTtcbiAgICAgIGVsc2UgaWYgKGV2ZW50T3JEYXRhLnZhbHVlICE9PSB1bmRlZmluZWQpIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudmFsdWU7XG4gICAgICBlbHNlIHJhd1ZhbHVlID0gZXZlbnRPckRhdGE7XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlID0gdmFsdWVQYXJzZXIocmF3VmFsdWUpO1xuICAgIHRoaXMucHJvcHMuZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlKFxuICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgdGhpcy5wcm9wcy5jb2x1bW5zLFxuICAgICAgY29sLFxuICAgICAgdmFsdWUsXG4gICAgKTtcbiAgfVxuXG4gIG9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlID0gKHJvd0luZGV4LCBjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZXZlbnRPckRhdGEpID0+IHtcbiAgICBsZXQgcmF3VmFsdWU7XG4gICAgLy8gZXZlbnRPckRhdGEgY2FuIGJlIGlucHV0IG9uQ2hhbmdlIGV2ZW50LCByZWFjdC1zZWxlY3Qgb25DaGFuZ2Ugb3IgcmVhY3QtZGF5LXBpY2tlciBvbkNoYW5nZVxuICAgIGlmIChldmVudE9yRGF0YSkge1xuICAgICAgaWYgKGV2ZW50T3JEYXRhLnRhcmdldCAhPT0gdW5kZWZpbmVkKSByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZTtcbiAgICAgIGVsc2UgaWYgKGV2ZW50T3JEYXRhLnZhbHVlICE9PSB1bmRlZmluZWQpIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudmFsdWU7XG4gICAgICBlbHNlIHJhd1ZhbHVlID0gZXZlbnRPckRhdGE7XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlID0gdmFsdWVQYXJzZXIocmF3VmFsdWUpO1xuICAgIHRoaXMucHJvcHMuY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlKHRoaXMucHJvcHMuZ3JpZCwgcm93SW5kZXgsIGNvbC52YWx1ZUtleVBhdGgsIHZhbHVlKTtcbiAgICBpZiAoY29sLm9uQ3JlYXRlVmFsdWVDaGFuZ2UpIHtcbiAgICAgIGNvbC5vbkNyZWF0ZVZhbHVlQ2hhbmdlKHZhbHVlLCBjb2wudmFsdWVLZXlQYXRoLCByb3dJbmRleCk7XG4gICAgfVxuICAgIGlmIChjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUgJiYgdmFsdWUgPT09IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5tYXRjaFZhbHVlKSB7XG4gICAgICAvLyBDYWxsIHNwZWNpYWwgcGFpcmVkIHZhbHVlIGNoYW5nZSBvbiBvdGhlciBjZWxsIGlmIHZhbHVlIG1hdGNoZXNcbiAgICAgIHRoaXMub25DcmVhdGVDZWxsVmFsdWVDaGFuZ2UoXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICB7IHZhbHVlS2V5UGF0aDogY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm5ld1ZhbHVlS2V5UGF0aCB9LFxuICAgICAgICB2ID0+IHYsXG4gICAgICApKGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5uZXdWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjb2wudmFsaWRhdG9ycykge1xuICAgICAgdGhpcy5wcm9wcy5jcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZShcbiAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgY29sLnZhbHVlS2V5UGF0aCxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIGNvbC52YWxpZGF0b3JzLFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBvbkVkaXRDZWxsVmFsdWVDaGFuZ2UgPSAocm93SW5kZXgsIGNvbCwgdmFsdWVQYXJzZXIpID0+IChldmVudE9yRGF0YSkgPT4ge1xuICAgIGNvbnN0IGRhdGFJZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgbGV0IHJhd1ZhbHVlO1xuICAgIC8vIGV2ZW50T3JEYXRhIGNhbiBiZSBpbnB1dCBvbkNoYW5nZSBldmVudCwgcmVhY3Qtc2VsZWN0IG9uQ2hhbmdlIG9yIHJlYWN0LWRheS1waWNrZXIgb25DaGFuZ2VcbiAgICBpZiAoZXZlbnRPckRhdGEpIHtcbiAgICAgIGlmIChldmVudE9yRGF0YS50YXJnZXQgIT09IHVuZGVmaW5lZCkgcmF3VmFsdWUgPSBldmVudE9yRGF0YS50YXJnZXQudmFsdWU7XG4gICAgICBlbHNlIGlmIChldmVudE9yRGF0YS52YWx1ZSAhPT0gdW5kZWZpbmVkKSByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnZhbHVlO1xuICAgICAgZWxzZSByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhO1xuICAgIH1cbiAgICBjb25zdCB2YWx1ZSA9IHZhbHVlUGFyc2VyKHJhd1ZhbHVlKTtcbiAgICB0aGlzLnByb3BzLmVkaXRDZWxsVmFsdWVDaGFuZ2UodGhpcy5wcm9wcy5ncmlkLCBkYXRhSWQsIGNvbC52YWx1ZUtleVBhdGgsIHZhbHVlKTtcbiAgICBpZiAoY29sLm9uRWRpdFZhbHVlQ2hhbmdlKSB7XG4gICAgICBjb2wub25FZGl0VmFsdWVDaGFuZ2UodmFsdWUsIGNvbC52YWx1ZUtleVBhdGgsIHJvd0luZGV4LCBkYXRhSWQpO1xuICAgIH1cbiAgICBpZiAoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlICYmIHZhbHVlID09PSBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubWF0Y2hWYWx1ZSkge1xuICAgICAgLy8gQ2FsbCBzcGVjaWFsIHBhaXJlZCB2YWx1ZSBjaGFuZ2Ugb24gb3RoZXIgY2VsbCBpZiB2YWx1ZSBtYXRjaGVzXG4gICAgICB0aGlzLm9uRWRpdENlbGxWYWx1ZUNoYW5nZShcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIHsgdmFsdWVLZXlQYXRoOiBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWVLZXlQYXRoIH0sXG4gICAgICAgIHYgPT4gdixcbiAgICAgICkoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm5ld1ZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNvbC52YWxpZGF0b3JzKSB7XG4gICAgICB0aGlzLnByb3BzLmVkaXRDZWxsVmFsdWVWYWxpZGF0ZShcbiAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICBkYXRhSWQsXG4gICAgICAgIGNvbC52YWx1ZUtleVBhdGgsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBjb2wudmFsaWRhdG9ycyxcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgb25DcmVhdGVDZWxsQmx1ciA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGUpID0+IHtcbiAgICBpZiAoY29sLm9uQ3JlYXRlQmx1cikge1xuICAgICAgbGV0IHZhbHVlID0gKGUgJiYgZS50YXJnZXQgJiYgZS50YXJnZXQudmFsdWUgIT09IHVuZGVmaW5lZCkgP1xuICAgICAgICBlLnRhcmdldC52YWx1ZSA6XG4gICAgICAgIHRoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKTtcbiAgICAgIGlmICh2YWx1ZVBhcnNlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWVQYXJzZXIodmFsdWUpO1xuICAgICAgfVxuICAgICAgY29sLm9uQ3JlYXRlQmx1cih2YWx1ZSwgcm93SW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIG9uRWRpdENlbGxCbHVyID0gKHJvd0luZGV4LCBjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZSkgPT4ge1xuICAgIGlmIChjb2wub25FZGl0Qmx1cikge1xuICAgICAgbGV0IHZhbHVlID0gKGUgJiYgZS50YXJnZXQgJiYgZS50YXJnZXQudmFsdWUgIT09IHVuZGVmaW5lZCkgP1xuICAgICAgICBlLnRhcmdldC52YWx1ZSA6XG4gICAgICAgIHRoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKTtcbiAgICAgIGlmICh2YWx1ZVBhcnNlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWVQYXJzZXIodmFsdWUpO1xuICAgICAgfVxuICAgICAgY29uc3QgZGF0YUlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICAgIGNvbC5vbkVkaXRCbHVyKHZhbHVlLCByb3dJbmRleCwgZGF0YUlkKTtcbiAgICB9XG4gIH1cblxuICBvbkNlbGxGb2N1cyA9IChjZWxsVHlwZSwgaW5wdXRUeXBlLCByb3dJbmRleCwgY29sdW1uS2V5KSA9PiAoZSkgPT4ge1xuICAgIGlmIChpbnB1dFR5cGUgPT09ICdudW1iZXInKSB7XG4gICAgICBlLnRhcmdldC5zZWxlY3QoKTtcbiAgICB9XG4gICAgaWYgKGNlbGxUeXBlID09PSAnZWRpdCcgJiYgdGhpcy5wcm9wcy5jZWxsU2VsZWN0KSB7XG4gICAgICB0aGlzLnByb3BzLmNlbGxTZWxlY3Rpb25DaGFuZ2UodGhpcy5wcm9wcy5ncmlkLCBNYXAoeyByb3dJbmRleCwgY29sdW1uS2V5IH0pKTtcbiAgICB9XG4gIH1cblxuICBnZXREYXRhSWRCeVJvd0luZGV4ID0gcm93SW5kZXggPT5cbiAgICB0aGlzLnByb3BzLmRhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi50aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoXSk7XG5cbiAgZ2V0U2VsZWN0ZWRJdGVtSW5kZXggPSAoaWQpID0+IHtcbiAgICBpZiAoIWlkKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5wcm9wcy5kYXRhLmZpbmRJbmRleCh2ID0+IHYuZ2V0SW4odGhpcy5wcm9wcy5ncmlkLmlkS2V5UGF0aCkgPT09IGlkKTtcbiAgICByZXR1cm4gaW5kZXggPT09IC0xID8gdW5kZWZpbmVkIDogaW5kZXg7XG4gIH1cblxuICBnZXRFZGl0SXRlbVZhbHVlID0gKHJvd0luZGV4LCBjb2wpID0+IHtcbiAgICAvLyBHZXQgdGhlIHZhbHVlIHRvIGRpc3BsYXkgaW4gZWRpdCBjZWxsXG4gICAgY29uc3QgaWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgIGNvbnN0IGVkaXRWYWx1ZSA9IHRoaXMucHJvcHMuZWRpdERhdGEuZ2V0SW4oW2lkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSwgdW5kZWZpbmVkKTtcbiAgICBsZXQgb3JpZ2luYWxWYWx1ZTtcbiAgICBpZiAoZWRpdFZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG9yaWdpbmFsVmFsdWUgPSB0aGlzLnByb3BzLmRhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSwgJycpO1xuICAgIH0gZWxzZSBpZiAoZWRpdFZhbHVlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBlZGl0VmFsdWU7XG4gICAgfVxuICAgIGlmIChvcmlnaW5hbFZhbHVlID09PSBudWxsIHx8IG9yaWdpbmFsVmFsdWUgPT09IHVuZGVmaW5lZCB8fCBvcmlnaW5hbFZhbHVlID09PSAnJykge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICAvLyBTcGVjaWFsIGZvcm1hdHRpbmcgYnkgY29tcG9uZW50IHR5cGVcbiAgICBpZiAoXG4gICAgICBjb2wuY29tcG9uZW50VHlwZSA9PT0gJ2Zsb2F0JyAmJlxuICAgICAgU3RyaW5nKG9yaWdpbmFsVmFsdWUpLmxlbmd0aCA+IDBcbiAgICApIHtcbiAgICAgIHJldHVybiBTdHJpbmcob3JpZ2luYWxWYWx1ZSkucmVwbGFjZSgnLicsIHRoaXMucHJvcHMuZGVjaW1hbFNlcGFyYXRvcik7XG4gICAgfVxuICAgIHJldHVybiBvcmlnaW5hbFZhbHVlO1xuICB9XG5cbiAgZ2V0Q3JlYXRlSXRlbVZhbHVlID0gKHJvd0luZGV4LCBjb2wpID0+IHtcbiAgICBjb25zdCB2YWwgPSB0aGlzLnByb3BzLmNyZWF0ZURhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSwgJycpO1xuICAgIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgcmV0dXJuIHZhbDtcbiAgfVxuXG4gIGdldEZpbHRlckl0ZW1WYWx1ZSA9IChjb2wpID0+IHtcbiAgICBjb25zdCB2YWwgPSB0aGlzLnByb3BzLmZpbHRlckRhdGEuZ2V0KFV0aWxzLmdldENvbHVtbktleShjb2wpLCAnJyk7XG4gICAgaWYgKHZhbCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gdmFsO1xuICB9XG5cbiAgZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZSA9IChyb3dJbmRleCwgY29sLCBtb2RlKSA9PiB7XG4gICAgbGV0IGNvbXBvbmVudERpc2FibGVkID0gISFjb2wuZGlzYWJsZUVkaXRpbmc7XG4gICAgLy8gY2hlY2sgaWYgY29tcG9uZW50IGlzIGRpc2FibGVkIGJ5IG90aGVyIGNvbHVtbiBkYXRhXG4gICAgaWYgKCFjb21wb25lbnREaXNhYmxlZCAmJiBjb2wuZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2gpIHtcbiAgICAgIGlmIChtb2RlID09PSAnY3JlYXRlJykge1xuICAgICAgICBjb21wb25lbnREaXNhYmxlZCA9IHRoaXMuZ2V0Q3JlYXRlSXRlbVZhbHVlKFxuICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgIHsgdmFsdWVLZXlQYXRoOiBjb2wuZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2gubWF0Y2hWYWx1ZUtleVBhdGggfSxcbiAgICAgICAgKSA9PT0gY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb21wb25lbnREaXNhYmxlZCA9IHRoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShcbiAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICB7IHZhbHVlS2V5UGF0aDogY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWVLZXlQYXRoIH0sXG4gICAgICAgICkgPT09IGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaC5tYXRjaFZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29tcG9uZW50RGlzYWJsZWQ7XG4gIH1cblxuICBnZXRSb3dDbGFzc05hbWUgPSAocm93SW5kZXgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBncmlkLFxuICAgICAgaXNDcmVhdGluZyxcbiAgICAgIGlzRWRpdGluZyxcbiAgICAgIGNyZWF0ZURhdGEsXG4gICAgICBzZWxlY3RlZEl0ZW1zLFxuICAgICAgZGF0YSxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCByb3dDbGFzc05hbWVzID0gWydvYy1kYXRhZ3JpZC1yb3cnXTtcbiAgICBsZXQgZXh0cmFSb3dDb3VudCA9IDA7IC8vIGhvdyBtYW55IHJvd3MgdG8gaWdub3JlIGZyb20gdG9wLCBuZXcgKyBmaWx0ZXIgcm93c1xuICAgIGlmIChpc0NyZWF0aW5nKSBleHRyYVJvd0NvdW50ID0gY3JlYXRlRGF0YS5zaXplO1xuICAgIGlmIChpc0NyZWF0aW5nKSB7XG4gICAgICBpZiAocm93SW5kZXggPD0gKGV4dHJhUm93Q291bnQgLSAxKSkge1xuICAgICAgICByb3dDbGFzc05hbWVzLnB1c2goJ29jLWRhdGFncmlkLXJvdy1uZXcnKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzRWRpdGluZykge1xuICAgICAgcm93Q2xhc3NOYW1lcy5wdXNoKCdvYy1kYXRhZ3JpZC1yb3ctZWRpdCcpO1xuICAgIH1cblxuXG4gICAgLy8gY2hlY2sgaWYgcm93IGlzIHNlbGVjdGVkXG4gICAgaWYgKCghaXNDcmVhdGluZyAmJiAhaXNFZGl0aW5nKSAmJlxuICAgICAgICAoc2VsZWN0ZWRJdGVtcyAmJiBncmlkLmlkS2V5UGF0aCkpIHtcbiAgICAgIGlmIChcbiAgICAgICAgc2VsZWN0ZWRJdGVtcy5pbmRleE9mKGRhdGEuZ2V0SW4oW3Jvd0luZGV4IC0gZXh0cmFSb3dDb3VudCwgLi4uZ3JpZC5pZEtleVBhdGhdKSkgIT09IC0xXG4gICAgICApIHtcbiAgICAgICAgcm93Q2xhc3NOYW1lcy5wdXNoKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLnJvd0NsYXNzTmFtZUdldHRlcikge1xuICAgICAgcmV0dXJuIHJvd0NsYXNzTmFtZXMuam9pbignICcpICsgJyAnICsgdGhpcy5wcm9wcy5yb3dDbGFzc05hbWVHZXR0ZXIocm93SW5kZXgpO1xuICAgIH1cbiAgICByZXR1cm4gcm93Q2xhc3NOYW1lcy5qb2luKCcgJyk7XG4gIH1cblxuICBnZXRDZWxsTWVzc2FnZXMgPSAocm93SW5kZXgsIGNvbCwgY2VsbFR5cGUpID0+IHtcbiAgICBjb25zdCByZXR1cm5EYXRhID0ge307XG4gICAgaWYgKCF0aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoIHx8ICFjb2wudmFsdWVLZXlQYXRoKSB7XG4gICAgICByZXR1cm4gcmV0dXJuRGF0YTtcbiAgICB9XG4gICAgbGV0IGluZm9NZXNzYWdlO1xuICAgIGxldCBlcnJvck1lc3NhZ2U7XG4gICAgbGV0IHdhcm5pbmdNZXNzYWdlO1xuICAgIGlmIChjZWxsVHlwZSA9PT0gJ2NyZWF0ZScpIHtcbiAgICAgIGluZm9NZXNzYWdlID0gdGhpcy5wcm9wcy5jcmVhdGVDZWxsTWVzc2FnZXMuZ2V0SW4oWydpbmZvJywgcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgIGVycm9yTWVzc2FnZSA9IHRoaXMucHJvcHMuY3JlYXRlQ2VsbE1lc3NhZ2VzLmdldEluKFsnZXJyb3InLCByb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgd2FybmluZ01lc3NhZ2UgPSB0aGlzLnByb3BzLmNyZWF0ZUNlbGxNZXNzYWdlcy5nZXRJbihbJ3dhcm5pbmcnLCByb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgICBpbmZvTWVzc2FnZSA9IHRoaXMucHJvcHMuY2VsbE1lc3NhZ2VzLmdldEluKFsnaW5mbycsIGlkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgICBlcnJvck1lc3NhZ2UgPSB0aGlzLnByb3BzLmNlbGxNZXNzYWdlcy5nZXRJbihbJ2Vycm9yJywgaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgIHdhcm5pbmdNZXNzYWdlID0gdGhpcy5wcm9wcy5jZWxsTWVzc2FnZXMuZ2V0SW4oWyd3YXJuaW5nJywgaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICB9XG4gICAgaWYgKGluZm9NZXNzYWdlKSB7XG4gICAgICByZXR1cm5EYXRhLmluZm9NZXNzYWdlID0gaW5mb01lc3NhZ2U7XG4gICAgfVxuICAgIGlmIChlcnJvck1lc3NhZ2UpIHtcbiAgICAgIHJldHVybkRhdGEuZXJyb3JNZXNzYWdlID0gZXJyb3JNZXNzYWdlO1xuICAgIH1cbiAgICBpZiAod2FybmluZ01lc3NhZ2UpIHtcbiAgICAgIHJldHVybkRhdGEud2FybmluZ01lc3NhZ2UgPSB3YXJuaW5nTWVzc2FnZTtcbiAgICB9XG4gICAgcmV0dXJuIHJldHVybkRhdGE7XG4gIH1cblxuICBnZXRTY3JvbGxUb1JvdyA9ICgpID0+IHtcbiAgICBsZXQgc2Nyb2xsVG9Sb3c7XG4gICAgaWYgKHRoaXMucHJvcHMuaXNDcmVhdGluZyAmJiAhdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCkgcmV0dXJuIHNjcm9sbFRvUm93O1xuICAgIGlmICh0aGlzLmZvY3VzVG9DcmVhdGVDZWxsKSB7XG4gICAgICBjb25zdCBzY3JvbGxOZXdSb3cgPSB0aGlzLnByb3BzLmNyZWF0ZURhdGEuc2l6ZSAtIDE7XG4gICAgICBpZiAoc2Nyb2xsTmV3Um93ID49IDApIHtcbiAgICAgICAgc2Nyb2xsVG9Sb3cgPSBzY3JvbGxOZXdSb3c7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLmlzRWRpdGluZykge1xuICAgICAgICBzY3JvbGxUb1JvdyA9IHRoaXMuc3RhdGUuY3VycmVudFJvdztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gdGhpcy5wcm9wcy5zY3JvbGxUb1JvdzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgfVxuICAgICAgaWYgKHNjcm9sbFRvUm93ID09PSB1bmRlZmluZWQgJiYgdGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLnNpemUgPiAwKSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gdGhpcy5nZXRTZWxlY3RlZEl0ZW1JbmRleCh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuZmlyc3QoKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzY3JvbGxUb1JvdztcbiAgfVxuXG4gIGhhbmRsZUNlbGxTZWxlY3QgPSAoY2VsbFR5cGUsIHJvd0luZGV4LCBjb2x1bW5LZXkpID0+ICgpID0+IHtcbiAgICBpZiAoY2VsbFR5cGUgPT09ICd2aWV3JyAmJiB0aGlzLnByb3BzLmNlbGxTZWxlY3QpIHtcbiAgICAgIHRoaXMucHJvcHMuY2VsbFNlbGVjdGlvbkNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIE1hcCh7IHJvd0luZGV4LCBjb2x1bW5LZXkgfSkpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUNyZWF0ZUNlbGxSZWYgPSAocm93SW5kZXgsIGNvbCkgPT4gKHJlZikgPT4ge1xuICAgIC8vIEZvY3VzIHRvIGNyZWF0ZSBjZWxsXG4gICAgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5jcmVhdGVEYXRhLnNpemUgJiZcbiAgICAgIHRoaXMucHJvcHMuY3JlYXRlRGF0YS5zaXplID09PSByb3dJbmRleCArIDEgJiZcbiAgICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgJiZcbiAgICAgICF0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2NyZWF0ZScpXG4gICAgKSB7XG4gICAgICByZWYuZm9jdXMoKTtcbiAgICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVFZGl0Q2VsbFJlZiA9IChyb3dJbmRleCwgY29sKSA9PiAocmVmKSA9PiB7XG4gICAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCk7XG4gICAgaWYgKHRoaXMuZm9jdXNUb0VkaXRDZWxsICYmICF0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2VkaXQnKSkge1xuICAgICAgY29uc3Qgc2VsZWN0ZWRSb3dJbmRleCA9IHRoaXMuZ2V0U2VsZWN0ZWRJdGVtSW5kZXgodGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLmZpcnN0KCkpO1xuICAgICAgY29uc3QgeyBzZWxlY3RlZENlbGwgfSA9IHRoaXMucHJvcHM7XG4gICAgICBpZiAoc2VsZWN0ZWRDZWxsLnNpemUgPiAwKSB7XG4gICAgICAgIGlmIChzZWxlY3RlZENlbGwuZ2V0KCdyb3dJbmRleCcpID09PSByb3dJbmRleCAmJiBzZWxlY3RlZENlbGwuZ2V0KCdjb2x1bW5LZXknKSA9PT0gY29sdW1uS2V5KSB7XG4gICAgICAgICAgcmVmLmZvY3VzKCk7XG4gICAgICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzZWxlY3RlZFJvd0luZGV4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWRSb3dJbmRleCA9PT0gcm93SW5kZXgpIHtcbiAgICAgICAgcmVmLmZvY3VzKCk7XG4gICAgICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZUFycm93TmF2aWdhdGlvbikge1xuICAgICAgdGhpcy5jZWxsUmVmc1tgJHt0aGlzLnByb3BzLmdyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4fWBdID0gcmVmO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVDZWxsRm9jdXMgPSAobmV4dEVsZW1lbnQsIHJvd0luZGV4LCBjb2x1bW5JbmRleCkgPT4ge1xuICAgIGlmIChuZXh0RWxlbWVudCAmJiAobmV4dEVsZW1lbnQudHlwZSA9PT0gJ3RleHQnIHx8IG5leHRFbGVtZW50LnR5cGUgPT09ICdudW1iZXInKSkge1xuICAgICAgaWYgKHJvd0luZGV4ICE9PSAtMSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgY3VycmVudFJvdzogcm93SW5kZXggfSk7XG4gICAgICB9XG4gICAgICBpZiAoY29sdW1uSW5kZXggIT09IC0xKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjdXJyZW50Q29sdW1uOiBjb2x1bW5JbmRleCB9KTtcbiAgICAgIH1cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gbmV4dEVsZW1lbnQuc2VsZWN0KCksIDUwKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVTZWxlY3Rpb25DaGVja0JveE9uQ2hhbmdlID0gcm93SW5kZXggPT4gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMuaXRlbVNlbGVjdGlvbkNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIHJvd0luZGV4LCB0cnVlLCBmYWxzZSk7XG4gIH1cblxuICBnZW5lcmF0ZUNvbHVtbnMgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBleHRyYUNvbHVtbiB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBjb2x1bW5zID0gW107XG4gICAgY29uc3QgdGFiSW5kZXggPSBTdHJpbmcodGhpcy5wcm9wcy50YWJJbmRleCk7XG4gICAgaWYgKGV4dHJhQ29sdW1uKSB7XG4gICAgICBjb2x1bW5zLnB1c2goe1xuICAgICAgICB3aWR0aDogZXh0cmFDb2x1bW4ud2lkdGggfHwgNDAsXG4gICAgICAgIGlzUmVzaXphYmxlOiAhIWV4dHJhQ29sdW1uLmlzUmVzaXphYmxlLFxuICAgICAgICBpc1NvcnRhYmxlOiBmYWxzZSxcbiAgICAgICAgY29sdW1uS2V5OiAnZXh0cmFDb2x1bW4nLFxuICAgICAgICBjZWxsOiByb3dJbmRleCA9PiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1leHRyYS1jb2x1bW4tY2VsbFwiPlxuICAgICAgICAgICAgeyBleHRyYUNvbHVtbi52YWx1ZVJlbmRlcih0aGlzLnByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSwgdGFiSW5kZXgpIH1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSxcbiAgICAgICAgY2VsbEVkaXQ6IHJvd0luZGV4ID0+IChleHRyYUNvbHVtbi5jZWxsRWRpdCA/IGV4dHJhQ29sdW1uLmNlbGxFZGl0KHJvd0luZGV4KSA6IG51bGwpLFxuICAgICAgICBjZWxsQ3JlYXRlOiByb3dJbmRleCA9PiAoZXh0cmFDb2x1bW4uY2VsbENyZWF0ZSA/IGV4dHJhQ29sdW1uLmNlbGxDcmVhdGUocm93SW5kZXgpIDogbnVsbCksXG4gICAgICAgIGNlbGxGaWx0ZXI6IHJvd0luZGV4ID0+IChleHRyYUNvbHVtbi5jZWxsRmlsdGVyID8gZXh0cmFDb2x1bW4uY2VsbEZpbHRlcihyb3dJbmRleCkgOiBudWxsKSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLnJvd1NlbGVjdENoZWNrYm94Q29sdW1uKSB7XG4gICAgICBjb2x1bW5zLnB1c2goe1xuICAgICAgICB3aWR0aDogNDAsXG4gICAgICAgIGlzUmVzaXphYmxlOiBmYWxzZSxcbiAgICAgICAgaXNTb3J0YWJsZTogZmFsc2UsXG4gICAgICAgIGNvbHVtbktleTogJ3NlbGVjdGlvbkNoZWNrYm94JyxcbiAgICAgICAgY2VsbDogKHJvd0luZGV4KSA9PiB7XG4gICAgICAgICAgY29uc3Qgcm93SXRlbSA9IHRoaXMucHJvcHMuZGF0YS5nZXQocm93SW5kZXgpO1xuICAgICAgICAgIGNvbnN0IGl0ZW1JZCA9IHJvd0l0ZW0uZ2V0SW4odGhpcy5wcm9wcy5ncmlkLmlkS2V5UGF0aCk7XG4gICAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuaW5jbHVkZXMoaXRlbUlkKTtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPENoZWNrYm94XG4gICAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZFNlbGVjdENoZWNrQm94LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke3Jvd0luZGV4fWB9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLXNlbGVjdC1jaGVja2JveC1jZWxsXCJcbiAgICAgICAgICAgICAgY2hlY2tlZD17c2VsZWN0ZWR9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVNlbGVjdGlvbkNoZWNrQm94T25DaGFuZ2Uocm93SW5kZXgpfVxuICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIGNlbGxFZGl0OiAoKSA9PiBudWxsLFxuICAgICAgICBjZWxsQ3JlYXRlOiAoKSA9PiBudWxsLFxuICAgICAgICBjZWxsRmlsdGVyOiAoKSA9PiBudWxsLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgdmlzaWJsZUNvbHVtbnMgPSBbXTtcbiAgICB0aGlzLnByb3BzLnZpc2libGVDb2x1bW5zLmZvckVhY2goKHZpc2libGVDb2x1bW5LZXkpID0+IHtcbiAgICAgIHRoaXMucHJvcHMuY29sdW1ucy5mb3JFYWNoKChvcmdDb2wpID0+IHtcbiAgICAgICAgaWYgKFV0aWxzLmdldENvbHVtbktleShvcmdDb2wpID09PSB2aXNpYmxlQ29sdW1uS2V5KSB7XG4gICAgICAgICAgdmlzaWJsZUNvbHVtbnMucHVzaChvcmdDb2wpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICB2aXNpYmxlQ29sdW1ucy5mb3JFYWNoKChjb2wpID0+IHtcbiAgICAgIGNvbnN0IGNvbHVtbiA9IHtcbiAgICAgICAgaGVhZGVyOiBjb2wuaGVhZGVyLFxuICAgICAgICBjb2x1bW5LZXk6IFV0aWxzLmdldENvbHVtbktleShjb2wpLFxuICAgICAgICB3aWR0aDogKGNvbC53aWR0aCB8fCBjb2wud2lkdGggPT09IDAgPyBjb2wud2lkdGggOiAyMDApLFxuICAgICAgICBtaW5XaWR0aDogKGNvbC5taW5XaWR0aCB8fCBjb2wubWluV2lkdGggPT09IDAgPyBjb2wubWluV2lkdGggOiA0MCksXG4gICAgICAgIG1heFdpZHRoOiBjb2wubWF4V2lkdGgsXG4gICAgICAgIGlzUmVzaXphYmxlOiAhY29sLmRpc2FibGVSZXNpemluZyxcbiAgICAgICAgZml4ZWQ6ICEhY29sLmZpeGVkLFxuICAgICAgICBhbGxvd0NlbGxzUmVjeWNsaW5nOiAhIWNvbC5hbGxvd0NlbGxzUmVjeWNsaW5nLFxuICAgICAgICBkaXNhYmxlU29ydGluZzogISFjb2wuZGlzYWJsZVNvcnRpbmcsXG4gICAgICAgIGlzUmVxdWlyZWQ6ICEhY29sLmlzUmVxdWlyZWQsXG4gICAgICAgIGNvbXBvbmVudFR5cGU6IGNvbC5jb21wb25lbnRUeXBlLFxuICAgICAgICBzdHlsZTogVXRpbHMuZ2V0Q2VsbFN0eWxlQnlDb2woY29sKSxcbiAgICAgIH07XG4gICAgICBpZiAoY29sLnZhbHVlS2V5UGF0aCkge1xuICAgICAgICBjb2x1bW4udmFsdWVLZXlQYXRoID0gY29sLnZhbHVlS2V5UGF0aDtcbiAgICAgIH1cbiAgICAgIGlmIChjb2wuZmxleEdyb3cpIHtcbiAgICAgICAgY29sdW1uLmZsZXhHcm93ID0gY29sLmZsZXhHcm93O1xuICAgICAgfVxuICAgICAgaWYgKGNvbC52YWx1ZVR5cGUpIHtcbiAgICAgICAgY29sdW1uLnZhbHVlVHlwZSA9IGNvbC52YWx1ZVR5cGU7XG4gICAgICB9XG4gICAgICBpZiAoY29sLnNvcnRDb21wYXJhdG9yKSB7XG4gICAgICAgIGNvbHVtbi5zb3J0Q29tcGFyYXRvciA9IGNvbC5zb3J0Q29tcGFyYXRvcjtcbiAgICAgIH1cbiAgICAgIGlmIChjb2wuc29ydFZhbHVlR2V0dGVyKSB7XG4gICAgICAgIGNvbHVtbi5zb3J0VmFsdWVHZXR0ZXIgPSBjb2wuc29ydFZhbHVlR2V0dGVyO1xuICAgICAgfVxuICAgICAgY29uc3QgdmFsdWVFbXB0eUNoZWNrZXIgPSBVdGlscy5nZXRWYWx1ZUVtcHR5Q2hlY2tlcihjb2wpO1xuICAgICAgLy8gQ2VsbCB2YWx1ZSByZW5kZXJpbmdcbiAgICAgIGNvbnN0IHZhbHVlUmVuZGVyID0gKHJvd0luZGV4LCBmb3JtYXQpID0+IHtcbiAgICAgICAgY29uc3QgdmFsID0gdGhpcy5wcm9wcy5kYXRhLmdldEluKFtyb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsKSkge1xuICAgICAgICAgIHJldHVybiBjb2wuaXNSZXF1aXJlZCA/IDxNIGlkPVwiR3JpZC5WYWx1ZUlzTWlzc2luZ1wiIC8+IDogJyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvcm1hdCA/IGZvcm1hdCh2YWwpIDogdmFsO1xuICAgICAgfTtcblxuICAgICAgaWYgKGNvbC5jZWxsKSB7XG4gICAgICAgIGNvbHVtbi5jZWxsID0gY29sLmNlbGw7XG4gICAgICB9IGVsc2UgaWYgKGNvbC52YWx1ZVJlbmRlcikge1xuICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IGNvbC52YWx1ZVJlbmRlcih0aGlzLnByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzd2l0Y2ggKGNvbC52YWx1ZVR5cGUpIHtcbiAgICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT5cbiAgICAgICAgICAgICAgdmFsdWVSZW5kZXIocm93SW5kZXgsIHYgPT4gPE4gdmFsdWU9e3Z9IHsuLi5jb2wucmVuZGVyQ29tcG9uZW50UHJvcHN9IC8+KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2N1cnJlbmN5Jzoge1xuICAgICAgICAgICAgY29uc3QgY3VycmVuY3lLZXlQYXRoID0gY29sLnZhbHVlT3B0aW9ucyAmJiBjb2wudmFsdWVPcHRpb25zLmN1cnJlbmN5S2V5UGF0aCB8fCBbJ2N1cnJlbmN5J107IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT5cbiAgICAgICAgICAgICAgdmFsdWVSZW5kZXIocm93SW5kZXgsIHYgPT4gZm9ybWF0Q3VycmVuY3lBbW91bnQodiwge1xuICAgICAgICAgICAgICAgIGN1cnJlbmN5OiB0aGlzLnByb3BzLmRhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi5jdXJyZW5jeUtleVBhdGhdKSxcbiAgICAgICAgICAgICAgICBkZWNpbWFsczogY29sLnZhbHVlT3B0aW9ucyAmJiBjb2wudmFsdWVPcHRpb25zLmRlY2ltYWxzLFxuICAgICAgICAgICAgICAgIHRob3VzYW5kU2VwYXJhdG9yOiBjb2wudmFsdWVPcHRpb25zICYmIGNvbC52YWx1ZU9wdGlvbnMudGhvdXNhbmRTZXBhcmF0b3IgfHwgdGhpcy5wcm9wcy50aG91c2FuZFNlcGFyYXRvciwgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAgICAgICAgIGRlY2ltYWxTZXBhcmF0b3I6IGNvbC52YWx1ZU9wdGlvbnMgJiYgY29sLnZhbHVlT3B0aW9ucy5kZWNpbWFsU2VwYXJhdG9yIHx8IHRoaXMucHJvcHMuZGVjaW1hbFNlcGFyYXRvciwgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+XG4gICAgICAgICAgICAgIHZhbHVlUmVuZGVyKHJvd0luZGV4LCAodikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChtb21lbnQodiwgdGhpcy5wcm9wcy5kYXRlRm9ybWF0LCB0cnVlKS5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBtb21lbnQudXRjKHYsIHRoaXMucHJvcHMuZGF0ZUZvcm1hdCkuZm9ybWF0KHRoaXMucHJvcHMuZGF0ZUZvcm1hdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChtb21lbnQodikuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gbW9tZW50LnV0Yyh2KS5mb3JtYXQodGhpcy5wcm9wcy5kYXRlRm9ybWF0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxNIGlkPVwiR3JpZC5JbnZhbGlkRGF0ZVwiIC8+O1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PlxuICAgICAgICAgICAgICB2YWx1ZVJlbmRlcihyb3dJbmRleCwgdiA9PlxuICAgICAgICAgICAgICAgIDxNIGlkPXt2ID8gJ0dyaWQuWWVzJyA6ICdHcmlkLk5vJ30gey4uLmNvbC5yZW5kZXJDb21wb25lbnRQcm9wc30gLz4pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gdmFsdWVSZW5kZXIocm93SW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBDZWxsIGVkaXQvY3JlYXRlL2ZpbHRlciBjb21wb25lbnQgcmVuZGVyaW5nXG4gICAgICBpZiAoY29sLmNlbGxFZGl0KSB7XG4gICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IGNvbC5jZWxsRWRpdDtcbiAgICAgIH0gZWxzZSBpZiAoY29sLmVkaXRWYWx1ZVJlbmRlcikge1xuICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiBjb2wuZWRpdFZhbHVlUmVuZGVyKHRoaXMucHJvcHMuZGF0YS5nZXQocm93SW5kZXgpKTtcbiAgICAgIH1cbiAgICAgIGlmIChjb2wuY2VsbENyZWF0ZSkge1xuICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IGNvbC5jZWxsQ3JlYXRlO1xuICAgICAgfSBlbHNlIGlmIChjb2wuY3JlYXRlVmFsdWVSZW5kZXIpIHtcbiAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiBjb2wuY3JlYXRlVmFsdWVSZW5kZXIodGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCkpO1xuICAgICAgfVxuICAgICAgaWYgKGNvbC5jZWxsRmlsdGVyKSB7XG4gICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gY29sLmNlbGxGaWx0ZXI7XG4gICAgICB9IGVsc2UgaWYgKGNvbC5maWx0ZXJWYWx1ZVJlbmRlcikge1xuICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9IHJvd0luZGV4ID0+IGNvbC5maWx0ZXJWYWx1ZVJlbmRlcih0aGlzLnByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSk7XG4gICAgICB9XG4gICAgICBpZiAoY29sLmNvbXBvbmVudFR5cGUpIHtcbiAgICAgICAgbGV0IGVkaXRWYWx1ZVBhcnNlciA9IHZhbCA9PiB2YWw7XG4gICAgICAgIHN3aXRjaCAoY29sLmNvbXBvbmVudFR5cGUpIHtcbiAgICAgICAgICBjYXNlICd0ZXh0JzpcbiAgICAgICAgICAgIC8vIFRPRE8gUkVGQUNUT1IgVE8gRlVOQ1RJT05cbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmlubGluZUVkaXQpIHtcbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiAoXG4gICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkVkaXRDZWxsVmFsdWVDaGFuZ2Uocm93SW5kZXgsIGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLm9uRWRpdENlbGxCbHVyKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLm9uQ2VsbEZvY3VzKCdlZGl0JywgY29sLmNvbXBvbmVudFR5cGUsIHJvd0luZGV4LCBjb2x1bW4uY29sdW1uS2V5KX1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLm9uRWRpdENlbGxLZXlEb3duKGNvbCwgcm93SW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFJlZj17dGhpcy5oYW5kbGVFZGl0Q2VsbFJlZihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkRWRpdElucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5lZGl0Q29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2VkaXQnKX1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e2NvbHVtbi5zdHlsZX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IChcbiAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldENyZWF0ZUl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DcmVhdGVDZWxsVmFsdWVDaGFuZ2Uocm93SW5kZXgsIGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLm9uQ3JlYXRlQ2VsbEJsdXIocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5vbkNyZWF0ZUNlbGxLZXlEb3dufVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFJlZj17dGhpcy5oYW5kbGVDcmVhdGVDZWxsUmVmKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRDcmVhdGVJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fS0ke3Jvd0luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuY3JlYXRlQ29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2NyZWF0ZScpfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17Y29sdW1uLnN0eWxlfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmZpbHRlcmluZykge1xuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRGaWx0ZXJJdGVtVmFsdWUoY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UoY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRGaWx0ZXJJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fWB9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuZmlsdGVyQ29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXtjb2x1bW4uc3R5bGV9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmlubGluZUVkaXQpIHtcbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiAoXG4gICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uRWRpdENlbGxWYWx1ZUNoYW5nZShyb3dJbmRleCwgY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMub25FZGl0Q2VsbEJsdXIocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMub25DZWxsRm9jdXMoJ2VkaXQnLCBjb2wuY29tcG9uZW50VHlwZSwgcm93SW5kZXgsIGNvbHVtbi5jb2x1bW5LZXkpfVxuICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMub25FZGl0Q2VsbEtleURvd24oY29sLCByb3dJbmRleCl9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UmVmPXt0aGlzLmhhbmRsZUVkaXRDZWxsUmVmKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRFZGl0SW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX0tJHtyb3dJbmRleH1gfVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmVkaXRDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnZWRpdCcpfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17Y29sdW1uLnN0eWxlfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gKFxuICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRDcmVhdGVJdGVtVmFsdWUocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlKHJvd0luZGV4LCBjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5vbkNyZWF0ZUNlbGxCbHVyKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLm9uQ2VsbEZvY3VzKCdjcmVhdGUnLCAnbnVtYmVyJywgcm93SW5kZXgsIGNvbHVtbi5jb2x1bW5LZXkpfVxuICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMub25DcmVhdGVDZWxsS2V5RG93bn1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRSZWY9e3RoaXMuaGFuZGxlQ3JlYXRlQ2VsbFJlZihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkQ3JlYXRlSW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX0tJHtyb3dJbmRleH1gfVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmNyZWF0ZUNvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdjcmVhdGUnKX1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e2NvbHVtbi5zdHlsZX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5maWx0ZXJpbmcpIHtcbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT4gKFxuICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRGaWx0ZXJJdGVtVmFsdWUoY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UoY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRGaWx0ZXJJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fWB9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuZmlsdGVyQ29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXtjb2x1bW4uc3R5bGV9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyID0gdmFsID0+XG4gICAgICAgICAgICAgIHZhbC5yZXBsYWNlKG5ldyBSZWdFeHAoYFteXFxcXGQke3RoaXMucHJvcHMuZGVjaW1hbFNlcGFyYXRvcn0rLV1gLCAnZycpLCAnJyk7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5pbmxpbmVFZGl0KSB7XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gKFxuICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25FZGl0Q2VsbFZhbHVlQ2hhbmdlKHJvd0luZGV4LCBjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5vbkVkaXRDZWxsQmx1cihyb3dJbmRleCwgY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLm9uQ2VsbEZvY3VzKCdlZGl0JywgY29sLmNvbXBvbmVudFR5cGUsIHJvd0luZGV4LCBjb2x1bW4uY29sdW1uS2V5KX1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLm9uRWRpdENlbGxLZXlEb3duKGNvbCwgcm93SW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFJlZj17dGhpcy5oYW5kbGVFZGl0Q2VsbFJlZihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkRWRpdElucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5lZGl0Q29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2VkaXQnKX1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e2NvbHVtbi5zdHlsZX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IChcbiAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldENyZWF0ZUl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DcmVhdGVDZWxsVmFsdWVDaGFuZ2Uocm93SW5kZXgsIGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLm9uQ3JlYXRlQ2VsbEJsdXIocm93SW5kZXgsIGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLm9uQ3JlYXRlQ2VsbEtleURvd259XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UmVmPXt0aGlzLmhhbmRsZUNyZWF0ZUNlbGxSZWYocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZENyZWF0ZUlucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5jcmVhdGVDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnY3JlYXRlJyl9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXtjb2x1bW4uc3R5bGV9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuZmlsdGVyaW5nKSB7XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IChcbiAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldEZpbHRlckl0ZW1WYWx1ZShjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkZpbHRlckNlbGxWYWx1ZUNoYW5nZShjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZEZpbHRlcklucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9YH1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5maWx0ZXJDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e2NvbHVtbi5zdHlsZX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdzZWxlY3QnOiB7XG4gICAgICAgICAgICBjb25zdCB7IGludGwgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RPcHRpb25zID0gY29sLnNlbGVjdENvbXBvbmVudE9wdGlvbnMgfHxcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RDb21wb25lbnRPcHRpb25zLmdldChjb2x1bW4uY29sdW1uS2V5KTtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdFRyYW5zbGF0aW9ucyA9IGNvbC5zZWxlY3RDb21wb25lbnRUcmFuc2xhdGlvbnMgfHxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBpbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuU2VsZWN0JyB9KSxcbiAgICAgICAgICAgICAgICBub1Jlc3VsdHNUZXh0OiBpbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuTm9SZXN1bHRzJyB9KSxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmlubGluZUVkaXQpIHtcbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiAoXG4gICAgICAgICAgICAgICAgICA8RmxvYXRpbmdTZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgbmFtZT17Y29sLnZhbHVlS2V5UGF0aC5qb2luKCkgKyAnLWVkaXQtJyArIHJvd0luZGV4fVxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zPXtcbiAgICAgICAgICAgICAgICAgICAgICBjb2wuZWRpdFNlbGVjdE9wdGlvbnNNb2QgJiYgc2VsZWN0T3B0aW9ucyA/XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2wuZWRpdFNlbGVjdE9wdGlvbnNNb2Qoc2VsZWN0T3B0aW9ucy5zbGljZSgpLCByb3dJbmRleCwgY29sKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RPcHRpb25zXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25FZGl0Q2VsbFZhbHVlQ2hhbmdlKHJvd0luZGV4LCBjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5vbkVkaXRDZWxsQmx1cihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5vbkNlbGxGb2N1cygnZWRpdCcsIGNvbC5jb21wb25lbnRUeXBlLCByb3dJbmRleCwgY29sdW1uLmNvbHVtbktleSl9XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaGFibGU9e3NlbGVjdE9wdGlvbnMgJiYgKHNlbGVjdE9wdGlvbnMubGVuZ3RoID4gOSl9XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyYWJsZT17IWNvbC5pc1JlcXVpcmVkfVxuICAgICAgICAgICAgICAgICAgICBiYWNrc3BhY2VSZW1vdmVzPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgdGFiU2VsZWN0c1ZhbHVlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgb3Blbk9uRm9jdXNcbiAgICAgICAgICAgICAgICAgICAgcmVmPXt0aGlzLmhhbmRsZUVkaXRDZWxsUmVmKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgaWQ6IGBvY0RhdGFncmlkRWRpdElucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YCxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5lZGl0Q29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2VkaXQnKX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgICAgICAgICB7Li4uc2VsZWN0VHJhbnNsYXRpb25zfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IChcbiAgICAgICAgICAgICAgICAgIDxGbG9hdGluZ1NlbGVjdFxuICAgICAgICAgICAgICAgICAgICBuYW1lPXtjb2wudmFsdWVLZXlQYXRoLmpvaW4oKSArICctY3JlYXRlLScgKyByb3dJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucz17XG4gICAgICAgICAgICAgICAgICAgICAgY29sLmNyZWF0ZVNlbGVjdE9wdGlvbnNNb2QgJiYgc2VsZWN0T3B0aW9ucyA/XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2wuY3JlYXRlU2VsZWN0T3B0aW9uc01vZChzZWxlY3RPcHRpb25zLnNsaWNlKCksIHJvd0luZGV4LCBjb2wpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdE9wdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRDcmVhdGVJdGVtVmFsdWUocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlKHJvd0luZGV4LCBjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5vbkNyZWF0ZUNlbGxCbHVyKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hhYmxlPXtzZWxlY3RPcHRpb25zICYmIChzZWxlY3RPcHRpb25zLmxlbmd0aCA+IDkpfVxuICAgICAgICAgICAgICAgICAgICBjbGVhcmFibGU9eyFjb2wuaXNSZXF1aXJlZH1cbiAgICAgICAgICAgICAgICAgICAgYmFja3NwYWNlUmVtb3Zlcz17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIHRhYlNlbGVjdHNWYWx1ZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIG9wZW5PbkZvY3VzXG4gICAgICAgICAgICAgICAgICAgIHJlZj17dGhpcy5oYW5kbGVDcmVhdGVDZWxsUmVmKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgaWQ6IGBvY0RhdGFncmlkQ3JlYXRlSW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX0tJHtyb3dJbmRleH1gLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmNyZWF0ZUNvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdjcmVhdGUnKX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgICAgICAgICB7Li4uc2VsZWN0VHJhbnNsYXRpb25zfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5maWx0ZXJpbmcpIHtcbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT4gKFxuICAgICAgICAgICAgICAgICAgPEZsb2F0aW5nU2VsZWN0XG4gICAgICAgICAgICAgICAgICAgIG5hbWU9e2NvbC52YWx1ZUtleVBhdGguam9pbigpICsgJy1maWx0ZXInfVxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zPXtcbiAgICAgICAgICAgICAgICAgICAgICBjb2wuZmlsdGVyU2VsZWN0T3B0aW9uc01vZCAmJiBzZWxlY3RPcHRpb25zID9cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbC5maWx0ZXJTZWxlY3RPcHRpb25zTW9kKHNlbGVjdE9wdGlvbnMuc2xpY2UoKSwgY29sKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RPcHRpb25zfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRGaWx0ZXJJdGVtVmFsdWUoY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UoY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hhYmxlPXtzZWxlY3RPcHRpb25zICYmIChzZWxlY3RPcHRpb25zLmxlbmd0aCA+IDkpfVxuICAgICAgICAgICAgICAgICAgICBjbGVhcmFibGVcbiAgICAgICAgICAgICAgICAgICAgdGFiU2VsZWN0c1ZhbHVlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgb3Blbk9uRm9jdXNcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICAgIGlkOiBgb2NEYXRhZ3JpZEZpbHRlcklucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9YCxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5maWx0ZXJDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgICAgICAgICB7Li4uc2VsZWN0VHJhbnNsYXRpb25zfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgY2FzZSAnZGF0ZSc6IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmlubGluZUVkaXQpIHtcbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiAoXG4gICAgICAgICAgICAgICAgICA8RGF0ZUlucHV0XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uRWRpdENlbGxWYWx1ZUNoYW5nZShyb3dJbmRleCwgY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBsb2NhbGU9e3RoaXMucHJvcHMubGFuZ3VhZ2V9XG4gICAgICAgICAgICAgICAgICAgIGRhdGVGb3JtYXQ9e3RoaXMucHJvcHMuZGF0ZUZvcm1hdH1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRSZWY9e3RoaXMuaGFuZGxlRWRpdENlbGxSZWYocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICBpZDogYG9jRGF0YWdyaWRFZGl0SW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX0tJHtyb3dJbmRleH1gLFxuICAgICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bjogdGhpcy5vbkVkaXRDZWxsS2V5RG93bihjb2wsIHJvd0luZGV4KSxcbiAgICAgICAgICAgICAgICAgICAgICBvbkJsdXI6IHRoaXMub25FZGl0Q2VsbEJsdXIocm93SW5kZXgsIGNvbCksXG4gICAgICAgICAgICAgICAgICAgICAgb25Gb2N1czogdGhpcy5vbkNlbGxGb2N1cygnZWRpdCcsIGNvbC5jb21wb25lbnRUeXBlLCByb3dJbmRleCwgY29sdW1uLmNvbHVtbktleSksXG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IGNvbHVtbi5zdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5lZGl0Q29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2VkaXQnKX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiAoXG4gICAgICAgICAgICAgICAgICA8RGF0ZUlucHV0XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldENyZWF0ZUl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DcmVhdGVDZWxsVmFsdWVDaGFuZ2Uocm93SW5kZXgsIGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLm9uQ3JlYXRlQ2VsbEtleURvd259XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsZT17dGhpcy5wcm9wcy5sYW5ndWFnZX1cbiAgICAgICAgICAgICAgICAgICAgZGF0ZUZvcm1hdD17dGhpcy5wcm9wcy5kYXRlRm9ybWF0fVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFJlZj17dGhpcy5oYW5kbGVDcmVhdGVDZWxsUmVmKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgaWQ6IGBvY0RhdGFncmlkQ3JlYXRlSW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX0tJHtyb3dJbmRleH1gLFxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBjb2x1bW4uc3R5bGUsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuY3JlYXRlQ29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2NyZWF0ZScpfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5maWx0ZXJpbmcpIHtcbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT4gKFxuICAgICAgICAgICAgICAgICAgPERhdGVJbnB1dFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRGaWx0ZXJJdGVtVmFsdWUoY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UoY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBkYXRlRm9ybWF0PXt0aGlzLnByb3BzLmRhdGVGb3JtYXR9XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsZT17dGhpcy5wcm9wcy5sYW5ndWFnZX1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgIGlkOiBgb2NEYXRhZ3JpZEZpbHRlcklucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9YCxcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogY29sdW1uLnN0eWxlLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmZpbHRlckNvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgY2FzZSAnYm9vbGVhbic6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgaW50bCB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBbXG4gICAgICAgICAgICAgIHsgdmFsdWU6IHRydWUsIGxhYmVsOiBpbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuWWVzJyB9KSB9LFxuICAgICAgICAgICAgICB7IHZhbHVlOiBmYWxzZSwgbGFiZWw6IGludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5ObycgfSkgfSxcbiAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdFRyYW5zbGF0aW9ucyA9IGNvbC5zZWxlY3RDb21wb25lbnRUcmFuc2xhdGlvbnMgfHwge1xuICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0LlNlbGVjdCcgfSksXG4gICAgICAgICAgICAgIG5vUmVzdWx0c1RleHQ6IGludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5Ob1Jlc3VsdHMnIH0pLFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5saW5lRWRpdCkge1xuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IChcbiAgICAgICAgICAgICAgICAgIDxGbG9hdGluZ1NlbGVjdFxuICAgICAgICAgICAgICAgICAgICBuYW1lPXtjb2wudmFsdWVLZXlQYXRoLmpvaW4oKSArICctZWRpdC0nICsgcm93SW5kZXh9XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e3NlbGVjdE9wdGlvbnN9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uRWRpdENlbGxWYWx1ZUNoYW5nZShyb3dJbmRleCwgY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMub25FZGl0Q2VsbEJsdXIocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMub25DZWxsRm9jdXMoJ2VkaXQnLCBjb2wuY29tcG9uZW50VHlwZSwgcm93SW5kZXgsIGNvbHVtbi5jb2x1bW5LZXkpfVxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hhYmxlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgY2xlYXJhYmxlPXshY29sLmlzUmVxdWlyZWR9XG4gICAgICAgICAgICAgICAgICAgIGJhY2tzcGFjZVJlbW92ZXM9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICB0YWJTZWxlY3RzVmFsdWU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBvcGVuT25Gb2N1c1xuICAgICAgICAgICAgICAgICAgICByZWY9e3RoaXMuaGFuZGxlRWRpdENlbGxSZWYocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICBpZDogYG9jRGF0YWdyaWRFZGl0SW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX0tJHtyb3dJbmRleH1gLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmVkaXRDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnZWRpdCcpfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5zZWxlY3RUcmFuc2xhdGlvbnN9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gKFxuICAgICAgICAgICAgICAgICAgPEZsb2F0aW5nU2VsZWN0XG4gICAgICAgICAgICAgICAgICAgIG5hbWU9e2NvbC52YWx1ZUtleVBhdGguam9pbigpICsgJy1jcmVhdGUtJyArIHJvd0luZGV4fVxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zPXtzZWxlY3RPcHRpb25zfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRDcmVhdGVJdGVtVmFsdWUocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlKHJvd0luZGV4LCBjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5vbkNyZWF0ZUNlbGxCbHVyKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hhYmxlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgY2xlYXJhYmxlPXshY29sLmlzUmVxdWlyZWR9XG4gICAgICAgICAgICAgICAgICAgIGJhY2tzcGFjZVJlbW92ZXM9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICB0YWJTZWxlY3RzVmFsdWU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBvcGVuT25Gb2N1c1xuICAgICAgICAgICAgICAgICAgICByZWY9e3RoaXMuaGFuZGxlQ3JlYXRlQ2VsbFJlZihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICAgIGlkOiBgb2NEYXRhZ3JpZENyZWF0ZUlucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YCxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5jcmVhdGVDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnY3JlYXRlJyl9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgey4uLnNlbGVjdFRyYW5zbGF0aW9uc31cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuZmlsdGVyaW5nKSB7XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IChcbiAgICAgICAgICAgICAgICAgIDxGbG9hdGluZ1NlbGVjdFxuICAgICAgICAgICAgICAgICAgICBuYW1lPXtjb2wudmFsdWVLZXlQYXRoLmpvaW4oKSArICctZmlsdGVyJ31cbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucz17c2VsZWN0T3B0aW9uc31cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0RmlsdGVySXRlbVZhbHVlKGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uRmlsdGVyQ2VsbFZhbHVlQ2hhbmdlKGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoYWJsZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyYWJsZVxuICAgICAgICAgICAgICAgICAgICB0YWJTZWxlY3RzVmFsdWU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBvcGVuT25Gb2N1c1xuICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgaWQ6IGBvY0RhdGFncmlkRmlsdGVySW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX1gLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmZpbHRlckNvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5zZWxlY3RUcmFuc2xhdGlvbnN9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb2x1bW5zLnB1c2goY29sdW1uKTtcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLnByb3BzLmlzQ3JlYXRpbmcpIHtcbiAgICAgIGNvbHVtbnMucHVzaCh7XG4gICAgICAgIHdpZHRoOiAzNyxcbiAgICAgICAgaXNSZXNpemFibGU6IGZhbHNlLFxuICAgICAgICBjb2x1bW5LZXk6ICdyZW1vdmVOZXdJdGVtJyxcbiAgICAgICAgY2VsbDogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbEVkaXQ6ICgpID0+IG51bGwsXG4gICAgICAgIGNlbGxDcmVhdGU6IHJvd0luZGV4ID0+IChcbiAgICAgICAgICA8SWNvblxuICAgICAgICAgICAgaWQ9e2BvYy1kYXRhZ3JpZC1uZXctaXRlbS1yZW1vdmUtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgIHR5cGU9XCJpbmRpY2F0b3JcIlxuICAgICAgICAgICAgbmFtZT1cImRlbGV0ZVwiXG4gICAgICAgICAgICB3aWR0aD17MzB9XG4gICAgICAgICAgICBoZWlnaHQ9ezMwfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdGhpcy5wcm9wcy5yZW1vdmVOZXdJdGVtKHRoaXMucHJvcHMuZ3JpZCwgcm93SW5kZXgpfVxuICAgICAgICAgIC8+XG4gICAgICAgICksXG4gICAgICAgIGNlbGxGaWx0ZXI6ICgpID0+IG51bGwsXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbHVtbnM7XG4gIH1cblxuICBpc0NlbGxFZGl0ZWQgPSAocm93SW5kZXgsIGNvbCwgY2VsbFR5cGUpID0+IHtcbiAgICBpZiAoY2VsbFR5cGUgIT09ICdlZGl0Jykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBpZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgaWYgKHRoaXMucHJvcHMuZWRpdERhdGEuZ2V0SW4oW2lkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBoYW5kbGVBZnRlckFkZEl0ZW0gPSAoKSA9PiB7XG4gICAgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCA9IHRydWU7XG4gIH1cblxuICBoYW5kbGVBZnRlckVkaXRQcmVzcyA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLnNpemUpIHtcbiAgICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gdHJ1ZTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjdXJyZW50Um93OiB1bmRlZmluZWQsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVBZnRlclZhbGlkYXRpb25FcnJvciA9ICgpID0+IHtcbiAgICB0aGlzLmZvY3VzVG9FcnJvckNlbGwgPSB0cnVlO1xuICB9XG5cbiAgaGFuZGxlUm93Q2xpY2sgPSAoZSwgcm93SW5kZXgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5yb3dTZWxlY3QgJiYgIXRoaXMucHJvcHMuaXNDcmVhdGluZyAmJiAhdGhpcy5wcm9wcy5pc0VkaXRpbmcpIHtcbiAgICAgIGlmIChlLmN0cmxLZXkgfHwgZS5zaGlmdEtleSkge1xuICAgICAgICBkb2N1bWVudC5nZXRTZWxlY3Rpb24oKS5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICAgIH1cbiAgICAgIC8vIERvbid0IHRyaWdnZXIgc2VsZWN0aW9uIGNoYW5nZSBvbiByb3cgc2VsZWN0IGNoZWNrYm94IGNsaWNrXG4gICAgICAvLyBDaGVjayB0aGF0IGNsaWNrZWQgbm9kZSdzIHBhcmVudCBvciBwYXJlbnQncyBwYXJlbnQgZG9lc24ndCBoYXZlIGNoZWNrYm94IGNsYXNzXG4gICAgICBjb25zdCB7IHBhcmVudE5vZGUgfSA9IGUudGFyZ2V0O1xuICAgICAgY29uc3QgcGFyZW50MWNsYXNzID0gcGFyZW50Tm9kZS5jbGFzc05hbWUgJiYgcGFyZW50Tm9kZS5jbGFzc05hbWUuaW5kZXhPZlxuICAgICAgICA/IHBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgIDogJyc7XG4gICAgICBjb25zdCBwYXJlbnQyY2xhc3MgPSBwYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lICYmIHBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUuaW5kZXhPZiAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgID8gcGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZVxuICAgICAgICA6ICcnO1xuICAgICAgaWYgKFxuICAgICAgICBwYXJlbnQxY2xhc3MuaW5kZXhPZignb2MtZGF0YWdyaWQtc2VsZWN0LWNoZWNrYm94LWNlbGwnKSA9PT0gLTEgJiZcbiAgICAgICAgcGFyZW50MmNsYXNzLmluZGV4T2YoJ29jLWRhdGFncmlkLXNlbGVjdC1jaGVja2JveC1jZWxsJykgPT09IC0xXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5wcm9wcy5pdGVtU2VsZWN0aW9uQ2hhbmdlKFxuICAgICAgICAgIHRoaXMucHJvcHMuZ3JpZCxcbiAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICB0aGlzLnByb3BzLm11bHRpU2VsZWN0ICYmIGUuY3RybEtleSxcbiAgICAgICAgICB0aGlzLnByb3BzLm11bHRpU2VsZWN0ICYmIGUuc2hpZnRLZXksXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLm9uUm93Q2xpY2spIHtcbiAgICAgIHRoaXMucHJvcHMub25Sb3dDbGljayhlLCByb3dJbmRleCwgdGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCkpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGhhbmRsZUNvbnRleHRNZW51ID0gKGUsIHJvd0luZGV4KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25Db250ZXh0TWVudSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIHRoaXMucHJvcHMub25Db250ZXh0TWVudShlLCByb3dJbmRleCwgdGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCkpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5jb250ZXh0TWVudUl0ZW1zKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGNvbnRleHRNZW51T3BlbjogdHJ1ZSxcbiAgICAgICAgY29udGV4dE1lbnVYOiBlLmNsaWVudFgsXG4gICAgICAgIGNvbnRleHRNZW51WTogZS5jbGllbnRZLFxuICAgICAgICBjb250ZXh0TWVudVJvd0luZGV4OiByb3dJbmRleCxcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uRG9jdW1lbnRDbGljayk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaGFuZGxlQ29udGV4dE1lbnVJdGVtQ2xpY2sgPSBvbkNsaWNrID0+ICgpID0+IHtcbiAgICBjb25zdCB7IGRhdGEgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBjb250ZXh0TWVudVJvd0luZGV4IH0gPSB0aGlzLnN0YXRlO1xuICAgIG9uQ2xpY2soY29udGV4dE1lbnVSb3dJbmRleCwgZGF0YS5nZXQoY29udGV4dE1lbnVSb3dJbmRleCkpO1xuICB9XG5cbiAgcmVuZGVyQ2VsbCA9IGNvbCA9PiAoY2VsbFByb3BzKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgaXNDcmVhdGluZyxcbiAgICAgIGlzRWRpdGluZyxcbiAgICAgIGNyZWF0ZURhdGEsXG4gICAgICBzZWxlY3RlZENlbGwsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyByb3dJbmRleCwgLi4ucHJvcHMgfSA9IGNlbGxQcm9wcztcbiAgICBsZXQgY2VsbDtcbiAgICBsZXQgY2VsbFR5cGUgPSAndmlldyc7XG4gICAgbGV0IGV4dHJhUm93Q291bnQgPSAwOyAvLyBob3cgbWFueSByb3dzIHRvIGlnbm9yZSBmcm9tIHRvcCwgbmV3ICsgZmlsdGVyIHJvd3NcbiAgICBpZiAoaXNDcmVhdGluZykgZXh0cmFSb3dDb3VudCA9IGNyZWF0ZURhdGEuc2l6ZTtcbiAgICBpZiAoaXNDcmVhdGluZykge1xuICAgICAgaWYgKHJvd0luZGV4IDw9IChleHRyYVJvd0NvdW50IC0gMSkpIHtcbiAgICAgICAgaWYgKGNvbC5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY2VsbCA9IGNvbC5jZWxsQ3JlYXRlKHJvd0luZGV4KTtcbiAgICAgICAgICBjZWxsVHlwZSA9ICdjcmVhdGUnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNlbGwgPSBudWxsO1xuICAgICAgICAgIGNlbGxUeXBlID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2VsbCA9IGNvbC5jZWxsKHJvd0luZGV4IC0gZXh0cmFSb3dDb3VudCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc0VkaXRpbmcgJiYgY29sLmNlbGxFZGl0KSB7XG4gICAgICBjZWxsID0gY29sLmNlbGxFZGl0KHJvd0luZGV4IC0gZXh0cmFSb3dDb3VudCk7XG4gICAgICBjZWxsVHlwZSA9ICdlZGl0JztcbiAgICB9IGVsc2Uge1xuICAgICAgY2VsbCA9IGNvbC5jZWxsKHJvd0luZGV4IC0gZXh0cmFSb3dDb3VudCk7XG4gICAgfVxuICAgIGNvbnN0IGlzU3BlY2lhbCA9IGNlbGxQcm9wcy5jb2x1bW5LZXkgPT09ICdzZWxlY3Rpb25DaGVja2JveCcgfHwgY2VsbFByb3BzLmNvbHVtbktleSA9PT0gJ2V4dHJhQ29sdW1uJztcbiAgICBpZiAoKGNlbGxUeXBlID09PSAndmlldycgfHwgY2VsbFR5cGUgPT09ICdlZGl0JyB8fCBjZWxsVHlwZSA9PT0gJ2NyZWF0ZScpICYmICFpc1NwZWNpYWwpIHtcbiAgICAgIGNvbnN0IGdldFJvd0luZGV4ID0gKGNlbGxUeXBlID09PSAnY3JlYXRlJykgPyByb3dJbmRleCA6IChyb3dJbmRleCAtIGV4dHJhUm93Q291bnQpO1xuICAgICAgY29uc3QgbWVzc2FnZURhdGEgPSB0aGlzLmdldENlbGxNZXNzYWdlcyhnZXRSb3dJbmRleCwgY29sLCBjZWxsVHlwZSk7XG4gICAgICBjb25zdCBpc0VkaXRlZCA9IHRoaXMuaXNDZWxsRWRpdGVkKGdldFJvd0luZGV4LCBjb2wsIGNlbGxUeXBlKTtcbiAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IChzZWxlY3RlZENlbGwuZ2V0KCdyb3dJbmRleCcpID09PSByb3dJbmRleCAmJiBzZWxlY3RlZENlbGwuZ2V0KCdjb2x1bW5LZXknKSA9PT0gcHJvcHMuY29sdW1uS2V5KSA/XG4gICAgICAgICdvYy1kYXRhZ3JpZC1jZWxsIGlzLXNlbGVjdGVkJyA6ICdvYy1kYXRhZ3JpZC1jZWxsJztcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxDZWxsXG4gICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICAgIHN0eWxlPXtjb2wuc3R5bGV9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDZWxsU2VsZWN0KGNlbGxUeXBlLCByb3dJbmRleCwgcHJvcHMuY29sdW1uS2V5KX1cbiAgICAgICAgPlxuICAgICAgICAgIDxDZWxsVG9vbHRpcFxuICAgICAgICAgICAgaWQ9e2NlbGxUeXBlICsgY29sLmNvbHVtbktleSArIChyb3dJbmRleCAtIGV4dHJhUm93Q291bnQpfVxuICAgICAgICAgICAgaXNFZGl0ZWQ9e2lzRWRpdGVkfVxuICAgICAgICAgICAgaXNFcnJvcj17ISFtZXNzYWdlRGF0YS5lcnJvck1lc3NhZ2V9XG4gICAgICAgICAgICBpc1dhcm5pbmc9eyEhbWVzc2FnZURhdGEud2FybmluZ01lc3NhZ2V9XG4gICAgICAgICAgICBpbmZvTWVzc2FnZT17bWVzc2FnZURhdGEuaW5mb01lc3NhZ2V9XG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U9e21lc3NhZ2VEYXRhLmVycm9yTWVzc2FnZX1cbiAgICAgICAgICAgIHdhcm5pbmdNZXNzYWdlPXttZXNzYWdlRGF0YS53YXJuaW5nTWVzc2FnZX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7IGNlbGwgfVxuICAgICAgICAgIDwvQ2VsbFRvb2x0aXA+XG4gICAgICAgIDwvQ2VsbD5cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8Q2VsbCB7Li4ucHJvcHN9IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWNlbGxcIiBzdHlsZT17Y29sLnN0eWxlfT57IGNlbGwgfTwvQ2VsbD5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyQ29sdW1ucyA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuYWxsRGF0YVNpemUgJiYgIXRoaXMucHJvcHMuaXNCdXN5ICYmICF0aGlzLnByb3BzLmlzQ3JlYXRpbmcpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxDb2x1bW5cbiAgICAgICAgICBjb2x1bW5LZXk9XCJkYXRhRW1wdHlDb2x1bW5cIlxuICAgICAgICAgIGhlYWRlcj17PENlbGwgc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJyB9fT48TSBpZD1cIkdyaWQuTm9JdGVtc1wiIC8+PC9DZWxsPn1cbiAgICAgICAgICB3aWR0aD17MTB9XG4gICAgICAgICAgaXNSZXNpemFibGU9e2ZhbHNlfVxuICAgICAgICAgIGZsZXhHcm93PXsxfVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLnByb3BzLnZpc2libGVDb2x1bW5zLnNpemUpIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLmlzQnVzeSkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxDb2x1bW5cbiAgICAgICAgICAgIGNvbHVtbktleT1cImRhdGFFbXB0eUNvbHVtblwiXG4gICAgICAgICAgICBoZWFkZXI9ezxDZWxsPiZuYnNwOzwvQ2VsbD59XG4gICAgICAgICAgICB3aWR0aD17MTB9XG4gICAgICAgICAgICBpc1Jlc2l6YWJsZT17ZmFsc2V9XG4gICAgICAgICAgICBmbGV4R3Jvdz17MX1cbiAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPENvbHVtblxuICAgICAgICAgIGNvbHVtbktleT1cImRhdGFFbXB0eUNvbHVtblwiXG4gICAgICAgICAgaGVhZGVyPXs8Q2VsbCBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInIH19PjxNIGlkPVwiR3JpZC5Ob0NvbHVtbnNcIiAvPjwvQ2VsbD59XG4gICAgICAgICAgd2lkdGg9ezEwfVxuICAgICAgICAgIGlzUmVzaXphYmxlPXtmYWxzZX1cbiAgICAgICAgICBmbGV4R3Jvdz17MX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnN0IGNvbHVtbnMgPSB0aGlzLmdlbmVyYXRlQ29sdW1ucygpO1xuICAgIGlmIChjb2x1bW5zLmxlbmdodCA9PT0gMCkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIGNvbHVtbnMubWFwKGNvbCA9PiAoXG4gICAgICA8Q29sdW1uXG4gICAgICAgIGtleT17Y29sLmNvbHVtbktleX1cbiAgICAgICAgY29sdW1uS2V5PXtjb2wuY29sdW1uS2V5fVxuICAgICAgICBoZWFkZXI9e1xuICAgICAgICAgIDxIZWFkZXJDZWxsXG4gICAgICAgICAgICBncmlkPXt0aGlzLnByb3BzLmdyaWR9XG4gICAgICAgICAgICBjb2x1bW5zPXt0aGlzLnByb3BzLmNvbHVtbnN9XG4gICAgICAgICAgICBjb2x1bW49e2NvbH1cbiAgICAgICAgICAgIGN1cnJlbnRTb3J0Q29sdW1uPXt0aGlzLnByb3BzLnNvcnRDb2x1bW59XG4gICAgICAgICAgICBjdXJyZW50U29ydE9yZGVyPXt0aGlzLnByb3BzLnNvcnRPcmRlcn1cbiAgICAgICAgICAgIG9uU29ydENoYW5nZT17dGhpcy5wcm9wcy5zb3J0Q2hhbmdlfVxuICAgICAgICAgICAgaXNCdXN5PXt0aGlzLnByb3BzLmlzQnVzeX1cbiAgICAgICAgICAgIGZpbHRlcmluZz17dGhpcy5wcm9wcy5pc0ZpbHRlcmluZ31cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7Y29sLmhlYWRlcn1cbiAgICAgICAgICA8L0hlYWRlckNlbGw+XG4gICAgICAgIH1cbiAgICAgICAgY2VsbD17dGhpcy5yZW5kZXJDZWxsKGNvbCl9XG4gICAgICAgIHdpZHRoPXt0aGlzLnByb3BzLmNvbHVtbldpZHRocy5nZXQoY29sLmNvbHVtbktleSwgY29sLndpZHRoKX1cbiAgICAgICAgbWluV2lkdGg9e2NvbC5taW5XaWR0aH1cbiAgICAgICAgbWF4V2lkdGg9e2NvbC5tYXhXaWR0aH1cbiAgICAgICAgaXNSZXNpemFibGU9e2NvbC5pc1Jlc2l6YWJsZX1cbiAgICAgICAgZmxleEdyb3c9e2NvbC5mbGV4R3JvdyA/IGNvbC5mbGV4R3JvdyA6IDB9XG4gICAgICAgIGZpeGVkPXtjb2wuZml4ZWR9XG4gICAgICAgIGFsbG93Q2VsbHNSZWN5Y2xpbmc9e2NvbC5hbGxvd0NlbGxzUmVjeWNsaW5nfVxuICAgICAgLz4pKTtcbiAgfVxuXG4gIHJlbmRlckNvbnRleHRNZW51ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgY29udGV4dE1lbnVJdGVtcyB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7XG4gICAgICBjb250ZXh0TWVudVgsXG4gICAgICBjb250ZXh0TWVudVksXG4gICAgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3Qgc3R5bGUgPSB7XG4gICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgICAgekluZGV4OiAxMDAwMCxcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgdG9wOiBgJHtjb250ZXh0TWVudVl9cHhgLFxuICAgICAgbGVmdDogYCR7Y29udGV4dE1lbnVYfXB4YCxcbiAgICB9O1xuICAgIHJldHVybiAoXG4gICAgICA8dWwgY2xhc3NOYW1lPVwiZHJvcGRvd24tbWVudSBvYy1kYXRhZ3JpZC1jb250ZXh0LW1lbnUgb3BlblwiIHN0eWxlPXtzdHlsZX0+XG4gICAgICAgIHsgY29udGV4dE1lbnVJdGVtcyAmJiBjb250ZXh0TWVudUl0ZW1zLm1hcCAmJiBjb250ZXh0TWVudUl0ZW1zLm1hcCgoaXRlbSwgaSkgPT4gKFxuICAgICAgICAgIDxNZW51SXRlbVxuICAgICAgICAgICAga2V5PXtpfSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgICAgICBoZWFkZXI9e2l0ZW0uaGVhZGVyfVxuICAgICAgICAgICAgZGl2aWRlcj17aXRlbS5kaXZpZGVyfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2l0ZW0uZGlzYWJsZWR9XG4gICAgICAgICAgICB0aXRsZT17aXRlbS50aXRsZX1cbiAgICAgICAgICAgIG9uQ2xpY2s9e2l0ZW0ub25DbGljayAmJiB0aGlzLmhhbmRsZUNvbnRleHRNZW51SXRlbUNsaWNrKGl0ZW0ub25DbGljayl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgeyBpdGVtLnZhbHVlIH1cbiAgICAgICAgICA8L01lbnVJdGVtPlxuICAgICAgICApKSB9XG4gICAgICA8L3VsPlxuICAgICk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgZ3JpZENsYXNzTmFtZSA9IGNsYXNzTmFtZXMoe1xuICAgICAgJ29jLWRhdGFncmlkLWNvbnRhaW5lcic6IHRydWUsXG4gICAgICAnd2l0aC1hY3Rpb25iYXInOiB0aGlzLnByb3BzLmlubGluZUVkaXQgJiYgIXRoaXMucHJvcHMuZGlzYWJsZUFjdGlvbkJhcixcbiAgICAgICdpcy1idXN5JzogdGhpcy5wcm9wcy5pc0J1c3ksXG4gICAgICAnaXMtZWRpdGluZyc6IHRoaXMucHJvcHMuaXNFZGl0aW5nLFxuICAgICAgJ2lzLWNyZWF0aW5nJzogdGhpcy5wcm9wcy5pc0NyZWF0aW5nLFxuICAgIH0pO1xuICAgIGxldCBhY3Rpb25CYXIgPSBudWxsO1xuICAgIGxldCBhY3Rpb25CYXJSaWdodCA9IG51bGw7XG4gICAgbGV0IGFjdGlvbkJhckxlZnQgPSBudWxsO1xuICAgIGlmIChcbiAgICAgICh0aGlzLnByb3BzLmFjdGlvbkJhciB8fFxuICAgICAgdGhpcy5wcm9wcy5pbmxpbmVFZGl0IHx8XG4gICAgICB0aGlzLnByb3BzLmZpbHRlcmluZyB8fFxuICAgICAgdGhpcy5wcm9wcy5yZW1vdmluZykgJiZcbiAgICAgICF0aGlzLnByb3BzLmRpc2FibGVBY3Rpb25CYXJcbiAgICApIHtcbiAgICAgIGFjdGlvbkJhclJpZ2h0ID0gKFxuICAgICAgICA8QWN0aW9uQmFyIHBvc2l0aW9uPVwicmlnaHRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWFjdGlvbmJhci1yaWdodFwiPnsgdGhpcy5wcm9wcy5hY3Rpb25CYXIgfTwvZGl2PlxuICAgICAgICAgIHsgKHRoaXMucHJvcHMuZmlsdGVyaW5nICYmIHRoaXMucHJvcHMuZGlzYWJsZURyb3Bkb3duXG4gICAgICAgICAgICAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlRmlsdGVyaW5nQ29udHJvbHMpICYmXG4gICAgICAgICAgICA8RmlsdGVyaW5nQ29udHJvbHMgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICAgfVxuICAgICAgICAgIHsgdGhpcy5wcm9wcy5pbmxpbmVFZGl0ICYmXG4gICAgICAgICAgICA8SW5saW5lRWRpdENvbnRyb2xzXG4gICAgICAgICAgICAgIGFmdGVyQWRkSXRlbT17dGhpcy5oYW5kbGVBZnRlckFkZEl0ZW19XG4gICAgICAgICAgICAgIGFmdGVyRWRpdFByZXNzPXt0aGlzLmhhbmRsZUFmdGVyRWRpdFByZXNzfVxuICAgICAgICAgICAgICBhZnRlclZhbGlkYXRpb25FcnJvcj17dGhpcy5oYW5kbGVBZnRlclZhbGlkYXRpb25FcnJvcn1cbiAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIH1cbiAgICAgICAgICB7ICh0aGlzLnByb3BzLmRyb3Bkb3duTWVudUl0ZW1zIHx8XG4gICAgICAgICAgICAgdGhpcy5wcm9wcy5yZW1vdmluZyB8fFxuICAgICAgICAgICAgIHRoaXMucHJvcHMuY29sdW1uU2V0dGluZ3MgfHxcbiAgICAgICAgICAgICAodGhpcy5wcm9wcy5maWx0ZXJpbmcgJiYgIXRoaXMucHJvcHMuZGlzYWJsZURyb3Bkb3duKSkgJiZcbiAgICAgICAgICAgICA8RHJvcGRvd25Db250cm9scyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgICB9XG4gICAgICAgIDwvQWN0aW9uQmFyPlxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuYWN0aW9uQmFyTGVmdCB8fCB0aGlzLnByb3BzLmdyaWRIZWFkZXIpIHtcbiAgICAgIGFjdGlvbkJhckxlZnQgPSAoXG4gICAgICAgIDxBY3Rpb25CYXIgcG9zaXRpb249XCJsZWZ0XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1ncmlkaGVhZGVyXCI+eyB0aGlzLnByb3BzLmdyaWRIZWFkZXIgfTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtYWN0aW9uYmFyLWxlZnRcIj57IHRoaXMucHJvcHMuYWN0aW9uQmFyTGVmdCB9PC9kaXY+XG4gICAgICAgIDwvQWN0aW9uQmFyPlxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGFjdGlvbkJhckxlZnQgfHwgYWN0aW9uQmFyUmlnaHQpIHtcbiAgICAgIGFjdGlvbkJhciA9IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1hY3Rpb25iYXItY29udGFpbmVyXCI+XG4gICAgICAgICAgeyBhY3Rpb25CYXJMZWZ0IH1cbiAgICAgICAgICB7IGFjdGlvbkJhclJpZ2h0IH1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgICBsZXQgcm93c0NvdW50ID1cbiAgICAgICh0aGlzLnByb3BzLnJvd3NDb3VudCB8fCB0aGlzLnByb3BzLnJvd3NDb3VudCA9PT0gMCkgP1xuICAgICAgICB0aGlzLnByb3BzLnJvd3NDb3VudCA6XG4gICAgICAgIHRoaXMucHJvcHMuZGF0YS5zaXplO1xuICAgIGlmICh0aGlzLnByb3BzLmlzQ3JlYXRpbmcpIHJvd3NDb3VudCArPSB0aGlzLnByb3BzLmNyZWF0ZURhdGEuc2l6ZTtcbiAgICBpZiAoIXRoaXMucHJvcHMudmlzaWJsZUNvbHVtbnMuc2l6ZSkgcm93c0NvdW50ID0gMDtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD17YG9jLWRhdGFncmlkLSR7dGhpcy5wcm9wcy5ncmlkLmlkfWB9XG4gICAgICAgIGNsYXNzTmFtZT17Z3JpZENsYXNzTmFtZX1cbiAgICAgICAgc3R5bGU9e3RoaXMucHJvcHMuY29udGFpbmVyU3R5bGV9XG4gICAgICA+XG4gICAgICAgIHsgdGhpcy5wcm9wcy5pc0J1c3kgJiYgPFNwaW5uZXIgLz4gfVxuICAgICAgICB7IHRoaXMuc3RhdGUuY29udGV4dE1lbnVPcGVuICYmIHRoaXMucmVuZGVyQ29udGV4dE1lbnUoKSB9XG4gICAgICAgIHsgYWN0aW9uQmFyIH1cbiAgICAgICAgPFJlc3BvbnNpdmVGaXhlZERhdGFUYWJsZVxuICAgICAgICAgIGlkPXt0aGlzLnByb3BzLmdyaWQuaWR9XG4gICAgICAgICAgcm93c0NvdW50PXtyb3dzQ291bnR9XG4gICAgICAgICAgaGVhZGVySGVpZ2h0PXt0aGlzLnByb3BzLmlzRmlsdGVyaW5nID9cbiAgICAgICAgICAgIHRoaXMucHJvcHMuaGVhZGVySGVpZ2h0ICsgdGhpcy5wcm9wcy5maWx0ZXJSb3dIZWlnaHRcbiAgICAgICAgICAgIDogdGhpcy5wcm9wcy5oZWFkZXJIZWlnaHR9XG4gICAgICAgICAgcm93SGVpZ2h0PXt0aGlzLnByb3BzLnJvd0hlaWdodH1cbiAgICAgICAgICBvbkNvbHVtblJlc2l6ZUVuZENhbGxiYWNrPXt0aGlzLm9uQ29sdW1uUmVzaXplRW5kQ2FsbGJhY2t9XG4gICAgICAgICAgaXNDb2x1bW5SZXNpemluZz17ZmFsc2V9XG4gICAgICAgICAgb25Sb3dDbGljaz17dGhpcy5oYW5kbGVSb3dDbGlja31cbiAgICAgICAgICBzY3JvbGxUb0NvbHVtbj17dGhpcy5wcm9wcy5zY3JvbGxUb0NvbHVtbiB8fCB0aGlzLnN0YXRlLmN1cnJlbnRDb2x1bW59XG4gICAgICAgICAgc2Nyb2xsVG9wPXt0aGlzLnByb3BzLnNjcm9sbFRvcH1cbiAgICAgICAgICBzY3JvbGxUb1Jvdz17dGhpcy5nZXRTY3JvbGxUb1JvdygpfVxuICAgICAgICAgIG9uUm93RG91YmxlQ2xpY2s9e3RoaXMucHJvcHMub25Sb3dEb3VibGVDbGlja31cbiAgICAgICAgICBvblJvd01vdXNlRG93bj17dGhpcy5wcm9wcy5vbk1vdXNlRG93bn1cbiAgICAgICAgICBvblJvd01vdXNlRW50ZXI9e3RoaXMucHJvcHMub25Sb3dNb3VzZUVudGVyfVxuICAgICAgICAgIG9uUm93TW91c2VMZWF2ZT17dGhpcy5wcm9wcy5vblJvd01vdXNlTGVhdmV9XG4gICAgICAgICAgb25TY3JvbGxTdGFydD17dGhpcy5wcm9wcy5vblNjcm9sbFN0YXJ0fVxuICAgICAgICAgIG9uU2Nyb2xsRW5kPXt0aGlzLnByb3BzLm9uU2Nyb2xsRW5kfVxuICAgICAgICAgIHJvd0NsYXNzTmFtZUdldHRlcj17dGhpcy5nZXRSb3dDbGFzc05hbWV9XG4gICAgICAgICAgcm93SGVpZ2h0R2V0dGVyPXt0aGlzLnByb3BzLnJvd0hlaWdodEdldHRlcn1cbiAgICAgICAgICBvbkNvbnRlbnRIZWlnaHRDaGFuZ2U9e3RoaXMucHJvcHMub25Db250ZW50SGVpZ2h0Q2hhbmdlfVxuICAgICAgICAgIG9uUm93Q29udGV4dE1lbnU9e3RoaXMuaGFuZGxlQ29udGV4dE1lbnV9XG4gICAgICAgID5cbiAgICAgICAgICB7IHRoaXMucmVuZGVyQ29sdW1ucygpIH1cbiAgICAgICAgPC9SZXNwb25zaXZlRml4ZWREYXRhVGFibGU+XG4gICAgICAgIHsgdGhpcy5wcm9wcy5pc0NvbHVtblNldHRpbmdzTW9kYWxPcGVuICYmXG4gICAgICAgICAgPENvbHVtblNldHRpbmdzTW9kYWxcbiAgICAgICAgICAgIGdyaWQ9e3RoaXMucHJvcHMuZ3JpZH1cbiAgICAgICAgICAgIGNvbHVtbnM9e3RoaXMucHJvcHMuY29sdW1uc31cbiAgICAgICAgICAgIHZpc2libGVDb2x1bW5zPXt0aGlzLnByb3BzLnZpc2libGVDb2x1bW5zfVxuICAgICAgICAgICAgY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsPXt0aGlzLnByb3BzLmNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbH1cbiAgICAgICAgICAgIHNhdmVDb2x1bW5TZXR0aW5ncz17dGhpcy5wcm9wcy5zYXZlQ29sdW1uU2V0dGluZ3N9XG4gICAgICAgICAgLz5cbiAgICAgICAgfVxuICAgICAgICB7IHRoaXMucHJvcHMuY2hpbGRyZW4gfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19