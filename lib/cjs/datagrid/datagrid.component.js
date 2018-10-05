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
    region: _datagrid5.default.getRegion(GRID, state.user),
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
    var _classNames;

    var gridClassName = (0, _classnames2.default)((_classNames = {
      'oc-datagrid-container': true,
      'with-actionbar': this.props.inlineEdit && !this.props.disableActionBar,
      'is-busy': this.props.isBusy,
      'is-editing': this.props.isEditing,
      'is-creating': this.props.isCreating
    }, _classNames[this.props.className] = !!this.props.className, _classNames));

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
                return c.valueKeyPath.join('/') === columnKey;
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
          return _react2.default.createElement(_reactCheckbox2.default, {
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
                    return _react2.default.createElement(_reactDatetime.DateInput, _extends({
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
                    return _react2.default.createElement(_reactDatetime.DateInput, _extends({
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
    return _react2.default.createElement(
      'ul',
      { className: 'dropdown-menu oc-datagrid-context-menu open', style: style },
      contextMenuItems && contextMenuItems.map && contextMenuItems.map(function (item, i) {
        var disabled = item.disabled;

        if (typeof item.disabled === 'function') {
          disabled = item.disabled(selectedItems, selectedData);
        }
        return _react2.default.createElement(
          _reactBootstrap.MenuItem,
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
exports.default = DataGrid;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbImRhdGFncmlkQWN0aW9ucyIsIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwib3duUHJvcHMiLCJHUklEIiwiZ3JpZCIsImlzQnVzeSIsImRhdGFncmlkIiwiZ2V0SW4iLCJpZCIsImlzRWRpdGluZyIsImlzQ3JlYXRpbmciLCJpc0ZpbHRlcmluZyIsImlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW4iLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwidmlzaWJsZUNvbHVtbnMiLCJjb2x1bW5XaWR0aHMiLCJzZWxlY3RlZENlbGwiLCJzZWxlY3RlZEl0ZW1zIiwiZGF0YSIsImVkaXREYXRhIiwiY3JlYXRlRGF0YSIsImZpbHRlckRhdGEiLCJjZWxsTWVzc2FnZXMiLCJjcmVhdGVDZWxsTWVzc2FnZXMiLCJhbGxEYXRhU2l6ZSIsInNpemUiLCJsYW5ndWFnZSIsIlV0aWxzIiwiZ2V0TGFuZ3VhZ2UiLCJ1c2VyIiwicmVnaW9uIiwiZ2V0UmVnaW9uIiwiZGF0ZUZvcm1hdCIsImdldERhdGVGb3JtYXQiLCJ0aG91c2FuZFNlcGFyYXRvciIsImdldFRob3VzYW5kU2VwYXJhdG9yIiwiZGVjaW1hbFNlcGFyYXRvciIsImdldERlY2ltYWxTZXBhcmF0b3IiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJEYXRhR3JpZCIsImluamVjdEludGwiLCJwcm9wcyIsImN1cnJlbnRSb3ciLCJjdXJyZW50Q29sdW1uIiwiY2VsbFJlZnMiLCJmb2N1c1RvQ3JlYXRlQ2VsbCIsImZvY3VzVG9FZGl0Q2VsbCIsImZvY3VzVG9FcnJvckNlbGwiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImRvY3VtZW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIm9uRG9jdW1lbnRDbGljayIsImludmFsaWRhdGUiLCJyZW5kZXIiLCJncmlkQ2xhc3NOYW1lIiwiaW5saW5lRWRpdCIsImRpc2FibGVBY3Rpb25CYXIiLCJjbGFzc05hbWUiLCJhY3Rpb25CYXIiLCJhY3Rpb25CYXJSaWdodCIsImFjdGlvbkJhckxlZnQiLCJmaWx0ZXJpbmciLCJyZW1vdmluZyIsImRpc2FibGVEcm9wZG93biIsImRpc2FibGVGaWx0ZXJpbmdDb250cm9scyIsImhhbmRsZUFmdGVyQWRkSXRlbSIsImhhbmRsZUFmdGVyRWRpdFByZXNzIiwiaGFuZGxlQWZ0ZXJWYWxpZGF0aW9uRXJyb3IiLCJkcm9wZG93bk1lbnVJdGVtcyIsImNvbHVtblNldHRpbmdzIiwiZ3JpZEhlYWRlciIsInJvd3NDb3VudCIsImNvbnRhaW5lclN0eWxlIiwiY29udGV4dE1lbnVPcGVuIiwicmVuZGVyQ29udGV4dE1lbnUiLCJoZWFkZXJIZWlnaHQiLCJmaWx0ZXJSb3dIZWlnaHQiLCJyb3dIZWlnaHQiLCJvbkNvbHVtblJlc2l6ZUVuZENhbGxiYWNrIiwiaGFuZGxlUm93Q2xpY2siLCJzY3JvbGxUb0NvbHVtbiIsInNjcm9sbFRvcCIsImdldFNjcm9sbFRvUm93Iiwib25Sb3dEb3VibGVDbGljayIsIm9uTW91c2VEb3duIiwib25Sb3dNb3VzZUVudGVyIiwib25Sb3dNb3VzZUxlYXZlIiwib25TY3JvbGxTdGFydCIsIm9uU2Nyb2xsRW5kIiwiZ2V0Um93Q2xhc3NOYW1lIiwicm93SGVpZ2h0R2V0dGVyIiwib25Db250ZW50SGVpZ2h0Q2hhbmdlIiwiaGFuZGxlQ29udGV4dE1lbnUiLCJyZW5kZXJDb2x1bW5zIiwiY29sdW1ucyIsImNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbCIsInNhdmVDb2x1bW5TZXR0aW5ncyIsImNoaWxkcmVuIiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIiwiY29udGV4dE1lbnVJdGVtcyIsInNldFN0YXRlIiwibmV3Q29sdW1uV2lkdGgiLCJjb2x1bW5LZXkiLCJyZXNpemVDb2x1bW4iLCJvbkNyZWF0ZUNlbGxLZXlEb3duIiwiZSIsImtleUNvZGUiLCJLRVlfQ09ERVMiLCJFTlRFUiIsImFkZE5ld0l0ZW0iLCJnZXRDb2x1bW5EZWZhdWx0VmFsdWVzIiwib25FZGl0Q2VsbEtleURvd24iLCJjb2wiLCJyb3dJbmRleCIsImVuYWJsZUFycm93TmF2aWdhdGlvbiIsInJvd3NTaXplIiwiZ2V0Q29sdW1uS2V5IiwiRE9XTiIsInZhbHVlVHlwZSIsIm5leHRFbGVtZW50IiwibW92ZUNlbGxGb2N1cyIsIlVQIiwiVEFCIiwiUklHSFQiLCJMRUZUIiwicHJldmVudERlZmF1bHQiLCJjb2x1bW5JbmQiLCJmaW5kSW5kZXgiLCJjIiwidmFsdWVLZXlQYXRoIiwiam9pbiIsImRpc2FibGVkIiwicm93SW5kIiwic2hpZnRLZXkiLCJsZW5ndGgiLCJuZXh0Q29sdW1uS2V5Iiwib25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UiLCJ2YWx1ZVBhcnNlciIsImV2ZW50T3JEYXRhIiwicmF3VmFsdWUiLCJ0YXJnZXQiLCJ1bmRlZmluZWQiLCJ2YWx1ZSIsImZpbHRlckNlbGxWYWx1ZUNoYW5nZSIsIm9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlIiwiY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlIiwib25DcmVhdGVWYWx1ZUNoYW5nZSIsIm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlIiwibWF0Y2hWYWx1ZSIsIm5ld1ZhbHVlS2V5UGF0aCIsInYiLCJuZXdWYWx1ZSIsInZhbGlkYXRvcnMiLCJjcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZSIsIm9uRWRpdENlbGxWYWx1ZUNoYW5nZSIsImRhdGFJZCIsImdldERhdGFJZEJ5Um93SW5kZXgiLCJlZGl0Q2VsbFZhbHVlQ2hhbmdlIiwib25FZGl0VmFsdWVDaGFuZ2UiLCJlZGl0Q2VsbFZhbHVlVmFsaWRhdGUiLCJvbkNyZWF0ZUNlbGxCbHVyIiwib25DcmVhdGVCbHVyIiwiZ2V0RWRpdEl0ZW1WYWx1ZSIsIm9uRWRpdENlbGxCbHVyIiwib25FZGl0Qmx1ciIsIm9uQ2VsbEZvY3VzIiwiY2VsbFR5cGUiLCJpbnB1dFR5cGUiLCJzZWxlY3QiLCJjZWxsU2VsZWN0IiwiY2VsbFNlbGVjdGlvbkNoYW5nZSIsImlkS2V5UGF0aCIsImdldFNlbGVjdGVkSXRlbUluZGV4IiwiaW5kZXgiLCJlZGl0VmFsdWUiLCJvcmlnaW5hbFZhbHVlIiwiY29tcG9uZW50VHlwZSIsIlN0cmluZyIsInJlcGxhY2UiLCJnZXRDcmVhdGVJdGVtVmFsdWUiLCJ2YWwiLCJnZXRGaWx0ZXJJdGVtVmFsdWUiLCJnZXQiLCJnZXRDb21wb25lbnREaXNhYmxlZFN0YXRlIiwibW9kZSIsImNvbXBvbmVudERpc2FibGVkIiwiZGlzYWJsZUVkaXRpbmciLCJkaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaCIsIm1hdGNoVmFsdWVLZXlQYXRoIiwicm93Q2xhc3NOYW1lcyIsImV4dHJhUm93Q291bnQiLCJwdXNoIiwiaW5kZXhPZiIsInJvd0NsYXNzTmFtZUdldHRlciIsImdldENlbGxNZXNzYWdlcyIsInJldHVybkRhdGEiLCJpbmZvTWVzc2FnZSIsImVycm9yTWVzc2FnZSIsIndhcm5pbmdNZXNzYWdlIiwic2Nyb2xsVG9Sb3ciLCJzY3JvbGxOZXdSb3ciLCJmaXJzdCIsImhhbmRsZUNlbGxTZWxlY3QiLCJoYW5kbGVDcmVhdGVDZWxsUmVmIiwicmVmIiwiZm9jdXMiLCJoYW5kbGVFZGl0Q2VsbFJlZiIsInNlbGVjdGVkUm93SW5kZXgiLCJjb2x1bW5JbmRleCIsInR5cGUiLCJzZXRUaW1lb3V0IiwiaGFuZGxlU2VsZWN0aW9uQ2hlY2tCb3hPbkNoYW5nZSIsIml0ZW1TZWxlY3Rpb25DaGFuZ2UiLCJnZW5lcmF0ZUNvbHVtbnMiLCJleHRyYUNvbHVtbiIsInRhYkluZGV4Iiwid2lkdGgiLCJpc1Jlc2l6YWJsZSIsImlzU29ydGFibGUiLCJjZWxsIiwidmFsdWVSZW5kZXIiLCJjZWxsRWRpdCIsImNlbGxDcmVhdGUiLCJjZWxsRmlsdGVyIiwicm93U2VsZWN0Q2hlY2tib3hDb2x1bW4iLCJyb3dJdGVtIiwiaXRlbUlkIiwic2VsZWN0ZWQiLCJpbmNsdWRlcyIsImZvckVhY2giLCJ2aXNpYmxlQ29sdW1uS2V5Iiwib3JnQ29sIiwiY29sdW1uIiwiaGVhZGVyIiwibWluV2lkdGgiLCJtYXhXaWR0aCIsImRpc2FibGVSZXNpemluZyIsImZpeGVkIiwiYWxsb3dDZWxsc1JlY3ljbGluZyIsImRpc2FibGVTb3J0aW5nIiwiaXNSZXF1aXJlZCIsInN0eWxlIiwiZ2V0Q2VsbFN0eWxlQnlDb2wiLCJmbGV4R3JvdyIsInNvcnRDb21wYXJhdG9yIiwic29ydFZhbHVlR2V0dGVyIiwidmFsdWVFbXB0eUNoZWNrZXIiLCJnZXRWYWx1ZUVtcHR5Q2hlY2tlciIsImZvcm1hdCIsInJlbmRlckNvbXBvbmVudFByb3BzIiwiY3VycmVuY3lLZXlQYXRoIiwidmFsdWVPcHRpb25zIiwiY3VycmVuY3kiLCJkZWNpbWFscyIsImlzVmFsaWQiLCJtb21lbnQiLCJ1dGMiLCJlZGl0VmFsdWVSZW5kZXIiLCJjcmVhdGVWYWx1ZVJlbmRlciIsImZpbHRlclZhbHVlUmVuZGVyIiwiZWRpdFZhbHVlUGFyc2VyIiwiZWRpdENvbXBvbmVudFByb3BzIiwiY3JlYXRlQ29tcG9uZW50UHJvcHMiLCJmaWx0ZXJDb21wb25lbnRQcm9wcyIsIlJlZ0V4cCIsImludGwiLCJzZWxlY3RPcHRpb25zIiwic2VsZWN0Q29tcG9uZW50T3B0aW9ucyIsInNlbGVjdFRyYW5zbGF0aW9ucyIsInNlbGVjdENvbXBvbmVudFRyYW5zbGF0aW9ucyIsInBsYWNlaG9sZGVyIiwiZm9ybWF0TWVzc2FnZSIsIm5vUmVzdWx0c1RleHQiLCJlZGl0U2VsZWN0T3B0aW9uc01vZCIsInNsaWNlIiwiY3JlYXRlU2VsZWN0T3B0aW9uc01vZCIsImZpbHRlclNlbGVjdE9wdGlvbnNNb2QiLCJvbktleURvd24iLCJvbkJsdXIiLCJvbkZvY3VzIiwibGFiZWwiLCJyZW1vdmVOZXdJdGVtIiwiaXNDZWxsRWRpdGVkIiwicm93U2VsZWN0IiwiY3RybEtleSIsImdldFNlbGVjdGlvbiIsInJlbW92ZUFsbFJhbmdlcyIsInBhcmVudE5vZGUiLCJwYXJlbnQxY2xhc3MiLCJwYXJlbnQyY2xhc3MiLCJwYXJlbnQzY2xhc3MiLCJwYXJlbnQ0Y2xhc3MiLCJtdWx0aVNlbGVjdCIsIm9uUm93Q2xpY2siLCJzdG9wUHJvcGFnYXRpb24iLCJjb250ZXh0TWVudVgiLCJjbGllbnRYIiwiY29udGV4dE1lbnVZIiwiY2xpZW50WSIsImFkZEV2ZW50TGlzdGVuZXIiLCJoYW5kbGVDb250ZXh0TWVudUl0ZW1DbGljayIsIm9uQ2xpY2siLCJzZWxlY3RlZERhdGEiLCJyZW5kZXJDZWxsIiwiY2VsbFByb3BzIiwiaXNTcGVjaWFsIiwiZ2V0Um93SW5kZXgiLCJtZXNzYWdlRGF0YSIsImlzRWRpdGVkIiwidGV4dEFsaWduIiwibGVuZ2h0IiwibWFwIiwic29ydENoYW5nZSIsImRpc3BsYXkiLCJ6SW5kZXgiLCJwb3NpdGlvbiIsInRvcCIsImxlZnQiLCJmaWx0ZXIiLCJkIiwiaXRlbSIsImkiLCJkaXZpZGVyIiwidGl0bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7b0RBQUE7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBS0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0lBQVlBLGU7O0FBQ1o7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUMsa0JBQWtCLFNBQWxCQSxlQUFrQixDQUFDQyxLQUFELEVBQVFDLFFBQVIsRUFBcUI7QUFDM0MsTUFBTUMsT0FBT0QsU0FBU0UsSUFBdEI7QUFDQSxTQUFPO0FBQ0xDLFlBQVFKLE1BQU1LLFFBQU4sQ0FBZUMsS0FBZixDQUFxQixDQUFDSixLQUFLSyxFQUFOLEVBQVUsU0FBVixFQUFxQixRQUFyQixDQUFyQixFQUFxRCxJQUFyRCxDQURIO0FBRUxDLGVBQVdSLE1BQU1LLFFBQU4sQ0FBZUMsS0FBZixDQUFxQixDQUFDSixLQUFLSyxFQUFOLEVBQVUsU0FBVixFQUFxQixX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QURGO0FBZ0JELE9BckI2QztBQURoRCxLQURGO0FBMEJELEc7O2tCQXZ4Q2tCekcsUSIsImZpbGUiOiJkYXRhZ3JpZC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1sb25lbHktaWYsIHByZWZlci10ZW1wbGF0ZSwgcmVhY3QvcmVxdWlyZS1kZWZhdWx0LXByb3BzICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTWFwLCBMaXN0IH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge1xuICBpbmplY3RJbnRsLFxuICBGb3JtYXR0ZWRNZXNzYWdlIGFzIE0sXG4gIEZvcm1hdHRlZE51bWJlciBhcyBOLFxufSBmcm9tICdyZWFjdC1pbnRsJztcbmltcG9ydCB7IENvbHVtbiwgQ2VsbCB9IGZyb20gJ2ZpeGVkLWRhdGEtdGFibGUtMic7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgTWVudUl0ZW0gfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBGbG9hdGluZ1NlbGVjdCB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWZsb2F0aW5nLXNlbGVjdCc7XG5pbXBvcnQgeyBEYXRlSW5wdXQgfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1kYXRldGltZSc7XG5pbXBvcnQgeyBJY29uIH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtaWNvbnMnO1xuaW1wb3J0IHsgU3Bpbm5lciB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXNwaW5uZXInO1xuaW1wb3J0IENoZWNrYm94IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWNoZWNrYm94JztcbmltcG9ydCB7IGZvcm1hdEN1cnJlbmN5QW1vdW50IH0gZnJvbSAnQG9wdXNjYXBpdGEvZm9ybWF0LXV0aWxzJztcbmltcG9ydCAnZml4ZWQtZGF0YS10YWJsZS0yL2Rpc3QvZml4ZWQtZGF0YS10YWJsZS5jc3MnO1xuXG5pbXBvcnQgUmVzcG9uc2l2ZUZpeGVkRGF0YVRhYmxlIGZyb20gJy4vcmVzcG9uc2l2ZS1maXhlZC1kYXRhLXRhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgSGVhZGVyQ2VsbCBmcm9tICcuL2hlYWRlci1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgQWN0aW9uQmFyIGZyb20gJy4vYWN0aW9uLWJhci5jb21wb25lbnQnO1xuaW1wb3J0IElubGluZUVkaXRDb250cm9scyBmcm9tICcuL2lubGluZS1lZGl0LWNvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgRmlsdGVyaW5nQ29udHJvbHMgZnJvbSAnLi9maWx0ZXJpbmctY29udHJvbHMuY29tcG9uZW50JztcbmltcG9ydCBEcm9wZG93bkNvbnRyb2xzIGZyb20gJy4vZHJvcGRvd24tY29udHJvbHMuY29tcG9uZW50JztcbmltcG9ydCAqIGFzIGRhdGFncmlkQWN0aW9ucyBmcm9tICcuL2RhdGFncmlkLmFjdGlvbnMnO1xuaW1wb3J0IENlbGxUb29sdGlwIGZyb20gJy4vY2VsbC10b29sdGlwLmNvbXBvbmVudCc7XG5pbXBvcnQgQ29sdW1uU2V0dGluZ3NNb2RhbCBmcm9tICcuL2NvbHVtbi1zZXR0aW5ncy9jb2x1bW4tc2V0dGluZ3MuY29tcG9uZW50JztcbmltcG9ydCB7IHByb3BUeXBlcywgZGVmYXVsdFByb3BzIH0gZnJvbSAnLi9kYXRhZ3JpZC5wcm9wcyc7XG5pbXBvcnQgeyBLRVlfQ09ERVMgfSBmcm9tICcuL2RhdGFncmlkLmNvbnN0YW50cyc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9kYXRhZ3JpZC51dGlscyc7XG5pbXBvcnQgJy4vZGF0YWdyaWQuY29tcG9uZW50LnNjc3MnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUsIG93blByb3BzKSA9PiB7XG4gIGNvbnN0IEdSSUQgPSBvd25Qcm9wcy5ncmlkO1xuICByZXR1cm4ge1xuICAgIGlzQnVzeTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2lzQnVzeSddLCB0cnVlKSxcbiAgICBpc0VkaXRpbmc6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdpc0VkaXRpbmcnXSwgZmFsc2UpLFxuICAgIGlzQ3JlYXRpbmc6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdpc0NyZWF0aW5nJ10sIGZhbHNlKSxcbiAgICBpc0ZpbHRlcmluZzpcbiAgICAgIHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnaXNGaWx0ZXJpbmcnXSwgZmFsc2UpLFxuICAgIGlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW46XG4gICAgICBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnY29sdW1uU2V0dGluZ3NNb2RhbCcsICdvcGVuJ10sIGZhbHNlKSxcbiAgICBzb3J0Q29sdW1uOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdzb3J0aW5nRGF0YScsICdzb3J0Q29sdW1uJ10sIG51bGwpLFxuICAgIHNvcnRPcmRlcjogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnc29ydGluZ0RhdGEnLCAnc29ydE9yZGVyJ10sIG51bGwpLFxuICAgIHZpc2libGVDb2x1bW5zOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICd2aXNpYmxlQ29sdW1ucyddLCBMaXN0KCkpLFxuICAgIGNvbHVtbldpZHRoczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnY29sdW1uV2lkdGhzJ10sIE1hcCgpKSxcbiAgICBzZWxlY3RlZENlbGw6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2VsZWN0ZWRDZWxsJ10sIE1hcCgpKSxcbiAgICBzZWxlY3RlZEl0ZW1zOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3NlbGVjdGVkSXRlbXMnXSwgTGlzdCgpKSxcbiAgICBkYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2RhdGEnXSwgTGlzdCgpKSxcbiAgICBlZGl0RGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdlZGl0RGF0YSddLCBNYXAoKSksXG4gICAgY3JlYXRlRGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjcmVhdGVEYXRhJ10sIExpc3QoKSksXG4gICAgZmlsdGVyRGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdmaWx0ZXJEYXRhJ10sIE1hcCgpKSxcbiAgICBjZWxsTWVzc2FnZXM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY2VsbE1lc3NhZ2VzJ10sIE1hcCgpKSxcbiAgICBjcmVhdGVDZWxsTWVzc2FnZXM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY3JlYXRlQ2VsbE1lc3NhZ2VzJ10sIE1hcCgpKSxcbiAgICBhbGxEYXRhU2l6ZTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdhbGxEYXRhJ10sIExpc3QoKSkuc2l6ZSxcbiAgICBsYW5ndWFnZTogVXRpbHMuZ2V0TGFuZ3VhZ2UoR1JJRCwgc3RhdGUudXNlciksXG4gICAgcmVnaW9uOiBVdGlscy5nZXRSZWdpb24oR1JJRCwgc3RhdGUudXNlciksXG4gICAgZGF0ZUZvcm1hdDogVXRpbHMuZ2V0RGF0ZUZvcm1hdChHUklELCBzdGF0ZS51c2VyKSxcbiAgICB0aG91c2FuZFNlcGFyYXRvcjogVXRpbHMuZ2V0VGhvdXNhbmRTZXBhcmF0b3IoR1JJRCwgc3RhdGUudXNlciksXG4gICAgZGVjaW1hbFNlcGFyYXRvcjogVXRpbHMuZ2V0RGVjaW1hbFNlcGFyYXRvcihHUklELCBzdGF0ZS51c2VyKSxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRhdGFncmlkQWN0aW9ucztcblxuQGluamVjdEludGxcbkBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0YUdyaWQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHByb3BUeXBlcztcbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY3VycmVudFJvdzogMCxcbiAgICAgIGN1cnJlbnRDb2x1bW46IDAsXG4gICAgfTtcbiAgICB0aGlzLmNlbGxSZWZzID0ge307XG4gICAgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCA9IGZhbHNlO1xuICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gZmFsc2U7IC8vIFRPRE86IEhhbmRsZSBmb2N1c2luZyB3aGVuIHRydWVcbiAgICB0aGlzLmZvY3VzVG9FcnJvckNlbGwgPSBmYWxzZTsgLy8gVE9ETzogSGFuZGxlIGZvY3VzaW5nIHdoZW4gdHJ1ZVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uRG9jdW1lbnRDbGljayk7XG4gICAgdGhpcy5wcm9wcy5pbnZhbGlkYXRlKHRoaXMucHJvcHMuZ3JpZCk7XG4gIH1cblxuICBvbkRvY3VtZW50Q2xpY2sgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuY29udGV4dE1lbnVJdGVtcykge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGNvbnRleHRNZW51T3BlbjogZmFsc2UsXG4gICAgICB9KTtcbiAgICB9XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uRG9jdW1lbnRDbGljayk7XG4gIH1cblxuICBvbkNvbHVtblJlc2l6ZUVuZENhbGxiYWNrID0gKG5ld0NvbHVtbldpZHRoLCBjb2x1bW5LZXkpID0+IHtcbiAgICB0aGlzLnByb3BzLnJlc2l6ZUNvbHVtbih0aGlzLnByb3BzLmdyaWQsIGNvbHVtbktleSwgbmV3Q29sdW1uV2lkdGgpO1xuICB9XG5cbiAgb25DcmVhdGVDZWxsS2V5RG93biA9IChlKSA9PiB7XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLkVOVEVSKSB7XG4gICAgICB0aGlzLnByb3BzLmFkZE5ld0l0ZW0odGhpcy5wcm9wcy5ncmlkLCBVdGlscy5nZXRDb2x1bW5EZWZhdWx0VmFsdWVzKHRoaXMucHJvcHMuY29sdW1ucykpO1xuICAgICAgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgb25FZGl0Q2VsbEtleURvd24gPSAoY29sLCByb3dJbmRleCkgPT4gKGUpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5lbmFibGVBcnJvd05hdmlnYXRpb24pIHtcbiAgICAgIGNvbnN0IHsgY29sdW1ucyB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IHJvd3NTaXplID0gdGhpcy5wcm9wcy5kYXRhLnNpemU7XG4gICAgICBjb25zdCBjb2x1bW5LZXkgPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sKTtcbiAgICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLkRPV046IHtcbiAgICAgICAgICBpZiAoY29sLnZhbHVlVHlwZSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGNvbnN0IG5leHRFbGVtZW50ID0gdGhpcy5jZWxsUmVmc1tgJHt0aGlzLnByb3BzLmdyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4ICsgMX1gXTtcbiAgICAgICAgICAgIHRoaXMubW92ZUNlbGxGb2N1cyhuZXh0RWxlbWVudCwgcm93SW5kZXggKyAxLCAtMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLlVQOiB7XG4gICAgICAgICAgaWYgKGNvbC52YWx1ZVR5cGUgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBjb25zdCBuZXh0RWxlbWVudCA9IHRoaXMuY2VsbFJlZnNbYCR7dGhpcy5wcm9wcy5ncmlkLmlkfV8ke2NvbHVtbktleX1fJHtyb3dJbmRleCAtIDF9YF07XG4gICAgICAgICAgICB0aGlzLm1vdmVDZWxsRm9jdXMobmV4dEVsZW1lbnQsIHJvd0luZGV4IC0gMSwgLTEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5UQUI6XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLlJJR0hUOlxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5MRUZUOiB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGxldCBjb2x1bW5JbmQgPSBjb2x1bW5zLmZpbmRJbmRleChjID0+IGMudmFsdWVLZXlQYXRoLmpvaW4oJy8nKSA9PT0gY29sdW1uS2V5KTtcbiAgICAgICAgICBpZiAoY29sdW1uSW5kICE9PSAtMSkge1xuICAgICAgICAgICAgbGV0IGRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCBuZXh0RWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICBsZXQgcm93SW5kID0gcm93SW5kZXg7XG4gICAgICAgICAgICB3aGlsZSAoZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLkxFRlQgfHwgKGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLlRBQiAmJiBlLnNoaWZ0S2V5KSkge1xuICAgICAgICAgICAgICAgIGlmIChjb2x1bW5JbmQgLSAxID49IDApIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCAtPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm93SW5kIC0gMSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgPSBjb2x1bW5zLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgICByb3dJbmQgLT0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChjb2x1bW5JbmQgKyAxIDwgY29sdW1ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCArPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm93SW5kICsgMSA8IHJvd3NTaXplKSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgPSAwO1xuICAgICAgICAgICAgICAgICAgcm93SW5kICs9IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb25zdCBuZXh0Q29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbHVtbnNbY29sdW1uSW5kXSk7XG4gICAgICAgICAgICAgIG5leHRFbGVtZW50ID0gdGhpcy5jZWxsUmVmc1tgJHt0aGlzLnByb3BzLmdyaWQuaWR9XyR7bmV4dENvbHVtbktleX1fJHtyb3dJbmR9YF07XG4gICAgICAgICAgICAgIGRpc2FibGVkID0gbmV4dEVsZW1lbnQgPyBuZXh0RWxlbWVudC5kaXNhYmxlZCA6IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFkaXNhYmxlZCAmJiBuZXh0RWxlbWVudCkge1xuICAgICAgICAgICAgICB0aGlzLm1vdmVDZWxsRm9jdXMobmV4dEVsZW1lbnQsIHJvd0luZCwgY29sdW1uSW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbkZpbHRlckNlbGxWYWx1ZUNoYW5nZSA9IChjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZXZlbnRPckRhdGEpID0+IHtcbiAgICBsZXQgcmF3VmFsdWU7XG4gICAgLy8gZXZlbnRPckRhdGEgY2FuIGJlIGlucHV0IG9uQ2hhbmdlIGV2ZW50LCByZWFjdC1zZWxlY3Qgb25DaGFuZ2Ugb3IgcmVhY3QtZGF5LXBpY2tlciBvbkNoYW5nZVxuICAgIGlmIChldmVudE9yRGF0YSkge1xuICAgICAgaWYgKGV2ZW50T3JEYXRhLnRhcmdldCAhPT0gdW5kZWZpbmVkKSByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZTtcbiAgICAgIGVsc2UgaWYgKGV2ZW50T3JEYXRhLnZhbHVlICE9PSB1bmRlZmluZWQpIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudmFsdWU7XG4gICAgICBlbHNlIHJhd1ZhbHVlID0gZXZlbnRPckRhdGE7XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlID0gdmFsdWVQYXJzZXIocmF3VmFsdWUpO1xuICAgIHRoaXMucHJvcHMuZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlKFxuICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgdGhpcy5wcm9wcy5jb2x1bW5zLFxuICAgICAgY29sLFxuICAgICAgdmFsdWUsXG4gICAgKTtcbiAgfVxuXG4gIG9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlID0gKHJvd0luZGV4LCBjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZXZlbnRPckRhdGEpID0+IHtcbiAgICBsZXQgcmF3VmFsdWU7XG4gICAgLy8gZXZlbnRPckRhdGEgY2FuIGJlIGlucHV0IG9uQ2hhbmdlIGV2ZW50LCByZWFjdC1zZWxlY3Qgb25DaGFuZ2Ugb3IgcmVhY3QtZGF5LXBpY2tlciBvbkNoYW5nZVxuICAgIGlmIChldmVudE9yRGF0YSkge1xuICAgICAgaWYgKGV2ZW50T3JEYXRhLnRhcmdldCAhPT0gdW5kZWZpbmVkKSByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZTtcbiAgICAgIGVsc2UgaWYgKGV2ZW50T3JEYXRhLnZhbHVlICE9PSB1bmRlZmluZWQpIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudmFsdWU7XG4gICAgICBlbHNlIHJhd1ZhbHVlID0gZXZlbnRPckRhdGE7XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlID0gdmFsdWVQYXJzZXIocmF3VmFsdWUpO1xuICAgIHRoaXMucHJvcHMuY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlKHRoaXMucHJvcHMuZ3JpZCwgcm93SW5kZXgsIGNvbC52YWx1ZUtleVBhdGgsIHZhbHVlKTtcbiAgICBpZiAoY29sLm9uQ3JlYXRlVmFsdWVDaGFuZ2UpIHtcbiAgICAgIGNvbC5vbkNyZWF0ZVZhbHVlQ2hhbmdlKHZhbHVlLCBjb2wudmFsdWVLZXlQYXRoLCByb3dJbmRleCk7XG4gICAgfVxuICAgIGlmIChjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUgJiYgdmFsdWUgPT09IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5tYXRjaFZhbHVlKSB7XG4gICAgICAvLyBDYWxsIHNwZWNpYWwgcGFpcmVkIHZhbHVlIGNoYW5nZSBvbiBvdGhlciBjZWxsIGlmIHZhbHVlIG1hdGNoZXNcbiAgICAgIHRoaXMub25DcmVhdGVDZWxsVmFsdWVDaGFuZ2UoXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICB7IHZhbHVlS2V5UGF0aDogY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm5ld1ZhbHVlS2V5UGF0aCB9LFxuICAgICAgICB2ID0+IHYsXG4gICAgICApKGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5uZXdWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjb2wudmFsaWRhdG9ycykge1xuICAgICAgdGhpcy5wcm9wcy5jcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZShcbiAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgY29sLnZhbHVlS2V5UGF0aCxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIGNvbC52YWxpZGF0b3JzLFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBvbkVkaXRDZWxsVmFsdWVDaGFuZ2UgPSAocm93SW5kZXgsIGNvbCwgdmFsdWVQYXJzZXIpID0+IChldmVudE9yRGF0YSkgPT4ge1xuICAgIGNvbnN0IGRhdGFJZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgbGV0IHJhd1ZhbHVlO1xuICAgIC8vIGV2ZW50T3JEYXRhIGNhbiBiZSBpbnB1dCBvbkNoYW5nZSBldmVudCwgcmVhY3Qtc2VsZWN0IG9uQ2hhbmdlIG9yIHJlYWN0LWRheS1waWNrZXIgb25DaGFuZ2VcbiAgICBpZiAoZXZlbnRPckRhdGEpIHtcbiAgICAgIGlmIChldmVudE9yRGF0YS50YXJnZXQgIT09IHVuZGVmaW5lZCkgcmF3VmFsdWUgPSBldmVudE9yRGF0YS50YXJnZXQudmFsdWU7XG4gICAgICBlbHNlIGlmIChldmVudE9yRGF0YS52YWx1ZSAhPT0gdW5kZWZpbmVkKSByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnZhbHVlO1xuICAgICAgZWxzZSByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhO1xuICAgIH1cbiAgICBjb25zdCB2YWx1ZSA9IHZhbHVlUGFyc2VyKHJhd1ZhbHVlKTtcbiAgICB0aGlzLnByb3BzLmVkaXRDZWxsVmFsdWVDaGFuZ2UodGhpcy5wcm9wcy5ncmlkLCBkYXRhSWQsIGNvbC52YWx1ZUtleVBhdGgsIHZhbHVlKTtcbiAgICBpZiAoY29sLm9uRWRpdFZhbHVlQ2hhbmdlKSB7XG4gICAgICBjb2wub25FZGl0VmFsdWVDaGFuZ2UodmFsdWUsIGNvbC52YWx1ZUtleVBhdGgsIHJvd0luZGV4LCBkYXRhSWQpO1xuICAgIH1cbiAgICBpZiAoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlICYmIHZhbHVlID09PSBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubWF0Y2hWYWx1ZSkge1xuICAgICAgLy8gQ2FsbCBzcGVjaWFsIHBhaXJlZCB2YWx1ZSBjaGFuZ2Ugb24gb3RoZXIgY2VsbCBpZiB2YWx1ZSBtYXRjaGVzXG4gICAgICB0aGlzLm9uRWRpdENlbGxWYWx1ZUNoYW5nZShcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIHsgdmFsdWVLZXlQYXRoOiBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWVLZXlQYXRoIH0sXG4gICAgICAgIHYgPT4gdixcbiAgICAgICkoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm5ld1ZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNvbC52YWxpZGF0b3JzKSB7XG4gICAgICB0aGlzLnByb3BzLmVkaXRDZWxsVmFsdWVWYWxpZGF0ZShcbiAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICBkYXRhSWQsXG4gICAgICAgIGNvbC52YWx1ZUtleVBhdGgsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBjb2wudmFsaWRhdG9ycyxcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgb25DcmVhdGVDZWxsQmx1ciA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGUpID0+IHtcbiAgICBpZiAoY29sLm9uQ3JlYXRlQmx1cikge1xuICAgICAgbGV0IHZhbHVlID0gKGUgJiYgZS50YXJnZXQgJiYgZS50YXJnZXQudmFsdWUgIT09IHVuZGVmaW5lZCkgP1xuICAgICAgICBlLnRhcmdldC52YWx1ZSA6XG4gICAgICAgIHRoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKTtcbiAgICAgIGlmICh2YWx1ZVBhcnNlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWVQYXJzZXIodmFsdWUpO1xuICAgICAgfVxuICAgICAgY29sLm9uQ3JlYXRlQmx1cih2YWx1ZSwgcm93SW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIG9uRWRpdENlbGxCbHVyID0gKHJvd0luZGV4LCBjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZSkgPT4ge1xuICAgIGlmIChjb2wub25FZGl0Qmx1cikge1xuICAgICAgbGV0IHZhbHVlID0gKGUgJiYgZS50YXJnZXQgJiYgZS50YXJnZXQudmFsdWUgIT09IHVuZGVmaW5lZCkgP1xuICAgICAgICBlLnRhcmdldC52YWx1ZSA6XG4gICAgICAgIHRoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKTtcbiAgICAgIGlmICh2YWx1ZVBhcnNlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWVQYXJzZXIodmFsdWUpO1xuICAgICAgfVxuICAgICAgY29uc3QgZGF0YUlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICAgIGNvbC5vbkVkaXRCbHVyKHZhbHVlLCByb3dJbmRleCwgZGF0YUlkKTtcbiAgICB9XG4gIH1cblxuICBvbkNlbGxGb2N1cyA9IChjZWxsVHlwZSwgaW5wdXRUeXBlLCByb3dJbmRleCwgY29sdW1uS2V5KSA9PiAoZSkgPT4ge1xuICAgIGlmIChpbnB1dFR5cGUgPT09ICdudW1iZXInKSB7XG4gICAgICBlLnRhcmdldC5zZWxlY3QoKTtcbiAgICB9XG4gICAgaWYgKGNlbGxUeXBlID09PSAnZWRpdCcgJiYgdGhpcy5wcm9wcy5jZWxsU2VsZWN0KSB7XG4gICAgICB0aGlzLnByb3BzLmNlbGxTZWxlY3Rpb25DaGFuZ2UodGhpcy5wcm9wcy5ncmlkLCBNYXAoeyByb3dJbmRleCwgY29sdW1uS2V5IH0pKTtcbiAgICB9XG4gIH1cblxuICBnZXREYXRhSWRCeVJvd0luZGV4ID0gcm93SW5kZXggPT5cbiAgICB0aGlzLnByb3BzLmRhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi50aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoXSk7XG5cbiAgZ2V0U2VsZWN0ZWRJdGVtSW5kZXggPSAoaWQpID0+IHtcbiAgICBpZiAoIWlkKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5wcm9wcy5kYXRhLmZpbmRJbmRleCh2ID0+IHYuZ2V0SW4odGhpcy5wcm9wcy5ncmlkLmlkS2V5UGF0aCkgPT09IGlkKTtcbiAgICByZXR1cm4gaW5kZXggPT09IC0xID8gdW5kZWZpbmVkIDogaW5kZXg7XG4gIH1cblxuICBnZXRFZGl0SXRlbVZhbHVlID0gKHJvd0luZGV4LCBjb2wpID0+IHtcbiAgICAvLyBHZXQgdGhlIHZhbHVlIHRvIGRpc3BsYXkgaW4gZWRpdCBjZWxsXG4gICAgY29uc3QgaWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgIGNvbnN0IGVkaXRWYWx1ZSA9IHRoaXMucHJvcHMuZWRpdERhdGEuZ2V0SW4oW2lkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSwgdW5kZWZpbmVkKTtcbiAgICBsZXQgb3JpZ2luYWxWYWx1ZTtcbiAgICBpZiAoZWRpdFZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG9yaWdpbmFsVmFsdWUgPSB0aGlzLnByb3BzLmRhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSwgJycpO1xuICAgIH0gZWxzZSBpZiAoZWRpdFZhbHVlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBlZGl0VmFsdWU7XG4gICAgfVxuICAgIGlmIChvcmlnaW5hbFZhbHVlID09PSBudWxsIHx8IG9yaWdpbmFsVmFsdWUgPT09IHVuZGVmaW5lZCB8fCBvcmlnaW5hbFZhbHVlID09PSAnJykge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICAvLyBTcGVjaWFsIGZvcm1hdHRpbmcgYnkgY29tcG9uZW50IHR5cGVcbiAgICBpZiAoXG4gICAgICBjb2wuY29tcG9uZW50VHlwZSA9PT0gJ2Zsb2F0JyAmJlxuICAgICAgU3RyaW5nKG9yaWdpbmFsVmFsdWUpLmxlbmd0aCA+IDBcbiAgICApIHtcbiAgICAgIHJldHVybiBTdHJpbmcob3JpZ2luYWxWYWx1ZSkucmVwbGFjZSgnLicsIHRoaXMucHJvcHMuZGVjaW1hbFNlcGFyYXRvcik7XG4gICAgfVxuICAgIHJldHVybiBvcmlnaW5hbFZhbHVlO1xuICB9XG5cbiAgZ2V0Q3JlYXRlSXRlbVZhbHVlID0gKHJvd0luZGV4LCBjb2wpID0+IHtcbiAgICBjb25zdCB2YWwgPSB0aGlzLnByb3BzLmNyZWF0ZURhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSwgJycpO1xuICAgIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgcmV0dXJuIHZhbDtcbiAgfVxuXG4gIGdldEZpbHRlckl0ZW1WYWx1ZSA9IChjb2wpID0+IHtcbiAgICBjb25zdCB2YWwgPSB0aGlzLnByb3BzLmZpbHRlckRhdGEuZ2V0KFV0aWxzLmdldENvbHVtbktleShjb2wpLCAnJyk7XG4gICAgaWYgKHZhbCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gdmFsO1xuICB9XG5cbiAgZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZSA9IChyb3dJbmRleCwgY29sLCBtb2RlKSA9PiB7XG4gICAgbGV0IGNvbXBvbmVudERpc2FibGVkID0gISFjb2wuZGlzYWJsZUVkaXRpbmc7XG4gICAgLy8gY2hlY2sgaWYgY29tcG9uZW50IGlzIGRpc2FibGVkIGJ5IG90aGVyIGNvbHVtbiBkYXRhXG4gICAgaWYgKCFjb21wb25lbnREaXNhYmxlZCAmJiBjb2wuZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2gpIHtcbiAgICAgIGlmIChtb2RlID09PSAnY3JlYXRlJykge1xuICAgICAgICBjb21wb25lbnREaXNhYmxlZCA9IHRoaXMuZ2V0Q3JlYXRlSXRlbVZhbHVlKFxuICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgIHsgdmFsdWVLZXlQYXRoOiBjb2wuZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2gubWF0Y2hWYWx1ZUtleVBhdGggfSxcbiAgICAgICAgKSA9PT0gY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb21wb25lbnREaXNhYmxlZCA9IHRoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShcbiAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICB7IHZhbHVlS2V5UGF0aDogY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWVLZXlQYXRoIH0sXG4gICAgICAgICkgPT09IGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaC5tYXRjaFZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29tcG9uZW50RGlzYWJsZWQ7XG4gIH1cblxuICBnZXRSb3dDbGFzc05hbWUgPSAocm93SW5kZXgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBncmlkLFxuICAgICAgaXNDcmVhdGluZyxcbiAgICAgIGlzRWRpdGluZyxcbiAgICAgIGNyZWF0ZURhdGEsXG4gICAgICBzZWxlY3RlZEl0ZW1zLFxuICAgICAgZGF0YSxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCByb3dDbGFzc05hbWVzID0gWydvYy1kYXRhZ3JpZC1yb3cnXTtcbiAgICBsZXQgZXh0cmFSb3dDb3VudCA9IDA7IC8vIGhvdyBtYW55IHJvd3MgdG8gaWdub3JlIGZyb20gdG9wLCBuZXcgKyBmaWx0ZXIgcm93c1xuICAgIGlmIChpc0NyZWF0aW5nKSBleHRyYVJvd0NvdW50ID0gY3JlYXRlRGF0YS5zaXplO1xuICAgIGlmIChpc0NyZWF0aW5nKSB7XG4gICAgICBpZiAocm93SW5kZXggPD0gKGV4dHJhUm93Q291bnQgLSAxKSkge1xuICAgICAgICByb3dDbGFzc05hbWVzLnB1c2goJ29jLWRhdGFncmlkLXJvdy1uZXcnKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzRWRpdGluZykge1xuICAgICAgcm93Q2xhc3NOYW1lcy5wdXNoKCdvYy1kYXRhZ3JpZC1yb3ctZWRpdCcpO1xuICAgIH1cblxuXG4gICAgLy8gY2hlY2sgaWYgcm93IGlzIHNlbGVjdGVkXG4gICAgaWYgKCghaXNDcmVhdGluZyAmJiAhaXNFZGl0aW5nKSAmJlxuICAgICAgICAoc2VsZWN0ZWRJdGVtcyAmJiBncmlkLmlkS2V5UGF0aCkpIHtcbiAgICAgIGlmIChcbiAgICAgICAgc2VsZWN0ZWRJdGVtcy5pbmRleE9mKGRhdGEuZ2V0SW4oW3Jvd0luZGV4IC0gZXh0cmFSb3dDb3VudCwgLi4uZ3JpZC5pZEtleVBhdGhdKSkgIT09IC0xXG4gICAgICApIHtcbiAgICAgICAgcm93Q2xhc3NOYW1lcy5wdXNoKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLnJvd0NsYXNzTmFtZUdldHRlcikge1xuICAgICAgcmV0dXJuIHJvd0NsYXNzTmFtZXMuam9pbignICcpICsgJyAnICsgdGhpcy5wcm9wcy5yb3dDbGFzc05hbWVHZXR0ZXIocm93SW5kZXgpO1xuICAgIH1cbiAgICByZXR1cm4gcm93Q2xhc3NOYW1lcy5qb2luKCcgJyk7XG4gIH1cblxuICBnZXRDZWxsTWVzc2FnZXMgPSAocm93SW5kZXgsIGNvbCwgY2VsbFR5cGUpID0+IHtcbiAgICBjb25zdCByZXR1cm5EYXRhID0ge307XG4gICAgaWYgKCF0aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoIHx8ICFjb2wudmFsdWVLZXlQYXRoKSB7XG4gICAgICByZXR1cm4gcmV0dXJuRGF0YTtcbiAgICB9XG4gICAgbGV0IGluZm9NZXNzYWdlO1xuICAgIGxldCBlcnJvck1lc3NhZ2U7XG4gICAgbGV0IHdhcm5pbmdNZXNzYWdlO1xuICAgIGlmIChjZWxsVHlwZSA9PT0gJ2NyZWF0ZScpIHtcbiAgICAgIGluZm9NZXNzYWdlID0gdGhpcy5wcm9wcy5jcmVhdGVDZWxsTWVzc2FnZXMuZ2V0SW4oWydpbmZvJywgcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgIGVycm9yTWVzc2FnZSA9IHRoaXMucHJvcHMuY3JlYXRlQ2VsbE1lc3NhZ2VzLmdldEluKFsnZXJyb3InLCByb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgd2FybmluZ01lc3NhZ2UgPSB0aGlzLnByb3BzLmNyZWF0ZUNlbGxNZXNzYWdlcy5nZXRJbihbJ3dhcm5pbmcnLCByb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgICBpbmZvTWVzc2FnZSA9IHRoaXMucHJvcHMuY2VsbE1lc3NhZ2VzLmdldEluKFsnaW5mbycsIGlkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgICBlcnJvck1lc3NhZ2UgPSB0aGlzLnByb3BzLmNlbGxNZXNzYWdlcy5nZXRJbihbJ2Vycm9yJywgaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgIHdhcm5pbmdNZXNzYWdlID0gdGhpcy5wcm9wcy5jZWxsTWVzc2FnZXMuZ2V0SW4oWyd3YXJuaW5nJywgaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICB9XG4gICAgaWYgKGluZm9NZXNzYWdlKSB7XG4gICAgICByZXR1cm5EYXRhLmluZm9NZXNzYWdlID0gaW5mb01lc3NhZ2U7XG4gICAgfVxuICAgIGlmIChlcnJvck1lc3NhZ2UpIHtcbiAgICAgIHJldHVybkRhdGEuZXJyb3JNZXNzYWdlID0gZXJyb3JNZXNzYWdlO1xuICAgIH1cbiAgICBpZiAod2FybmluZ01lc3NhZ2UpIHtcbiAgICAgIHJldHVybkRhdGEud2FybmluZ01lc3NhZ2UgPSB3YXJuaW5nTWVzc2FnZTtcbiAgICB9XG4gICAgcmV0dXJuIHJldHVybkRhdGE7XG4gIH1cblxuICBnZXRTY3JvbGxUb1JvdyA9ICgpID0+IHtcbiAgICBsZXQgc2Nyb2xsVG9Sb3c7XG4gICAgaWYgKHRoaXMucHJvcHMuaXNDcmVhdGluZyAmJiAhdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCkgcmV0dXJuIHNjcm9sbFRvUm93O1xuICAgIGlmICh0aGlzLmZvY3VzVG9DcmVhdGVDZWxsKSB7XG4gICAgICBjb25zdCBzY3JvbGxOZXdSb3cgPSB0aGlzLnByb3BzLmNyZWF0ZURhdGEuc2l6ZSAtIDE7XG4gICAgICBpZiAoc2Nyb2xsTmV3Um93ID49IDApIHtcbiAgICAgICAgc2Nyb2xsVG9Sb3cgPSBzY3JvbGxOZXdSb3c7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLmlzRWRpdGluZykge1xuICAgICAgICBzY3JvbGxUb1JvdyA9IHRoaXMuc3RhdGUuY3VycmVudFJvdztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gdGhpcy5wcm9wcy5zY3JvbGxUb1JvdzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgfVxuICAgICAgaWYgKHNjcm9sbFRvUm93ID09PSB1bmRlZmluZWQgJiYgdGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLnNpemUgPiAwKSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gdGhpcy5nZXRTZWxlY3RlZEl0ZW1JbmRleCh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuZmlyc3QoKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzY3JvbGxUb1JvdztcbiAgfVxuXG4gIGhhbmRsZUNlbGxTZWxlY3QgPSAoY2VsbFR5cGUsIHJvd0luZGV4LCBjb2x1bW5LZXkpID0+ICgpID0+IHtcbiAgICBpZiAoY2VsbFR5cGUgPT09ICd2aWV3JyAmJiB0aGlzLnByb3BzLmNlbGxTZWxlY3QpIHtcbiAgICAgIHRoaXMucHJvcHMuY2VsbFNlbGVjdGlvbkNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIE1hcCh7IHJvd0luZGV4LCBjb2x1bW5LZXkgfSkpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUNyZWF0ZUNlbGxSZWYgPSAocm93SW5kZXgsIGNvbCkgPT4gKHJlZikgPT4ge1xuICAgIC8vIEZvY3VzIHRvIGNyZWF0ZSBjZWxsXG4gICAgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5jcmVhdGVEYXRhLnNpemUgJiZcbiAgICAgIHRoaXMucHJvcHMuY3JlYXRlRGF0YS5zaXplID09PSByb3dJbmRleCArIDEgJiZcbiAgICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgJiZcbiAgICAgICF0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2NyZWF0ZScpXG4gICAgKSB7XG4gICAgICByZWYuZm9jdXMoKTtcbiAgICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVFZGl0Q2VsbFJlZiA9IChyb3dJbmRleCwgY29sKSA9PiAocmVmKSA9PiB7XG4gICAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCk7XG4gICAgaWYgKHRoaXMuZm9jdXNUb0VkaXRDZWxsICYmICF0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2VkaXQnKSkge1xuICAgICAgY29uc3Qgc2VsZWN0ZWRSb3dJbmRleCA9IHRoaXMuZ2V0U2VsZWN0ZWRJdGVtSW5kZXgodGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLmZpcnN0KCkpO1xuICAgICAgY29uc3QgeyBzZWxlY3RlZENlbGwgfSA9IHRoaXMucHJvcHM7XG4gICAgICBpZiAoc2VsZWN0ZWRDZWxsLnNpemUgPiAwKSB7XG4gICAgICAgIGlmIChzZWxlY3RlZENlbGwuZ2V0KCdyb3dJbmRleCcpID09PSByb3dJbmRleCAmJiBzZWxlY3RlZENlbGwuZ2V0KCdjb2x1bW5LZXknKSA9PT0gY29sdW1uS2V5KSB7XG4gICAgICAgICAgcmVmLmZvY3VzKCk7XG4gICAgICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzZWxlY3RlZFJvd0luZGV4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWRSb3dJbmRleCA9PT0gcm93SW5kZXgpIHtcbiAgICAgICAgcmVmLmZvY3VzKCk7XG4gICAgICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZUFycm93TmF2aWdhdGlvbikge1xuICAgICAgdGhpcy5jZWxsUmVmc1tgJHt0aGlzLnByb3BzLmdyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4fWBdID0gcmVmO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVDZWxsRm9jdXMgPSAobmV4dEVsZW1lbnQsIHJvd0luZGV4LCBjb2x1bW5JbmRleCkgPT4ge1xuICAgIGlmIChuZXh0RWxlbWVudCAmJiAobmV4dEVsZW1lbnQudHlwZSA9PT0gJ3RleHQnIHx8IG5leHRFbGVtZW50LnR5cGUgPT09ICdudW1iZXInKSkge1xuICAgICAgaWYgKHJvd0luZGV4ICE9PSAtMSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgY3VycmVudFJvdzogcm93SW5kZXggfSk7XG4gICAgICB9XG4gICAgICBpZiAoY29sdW1uSW5kZXggIT09IC0xKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjdXJyZW50Q29sdW1uOiBjb2x1bW5JbmRleCB9KTtcbiAgICAgIH1cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gbmV4dEVsZW1lbnQuc2VsZWN0KCksIDUwKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVTZWxlY3Rpb25DaGVja0JveE9uQ2hhbmdlID0gcm93SW5kZXggPT4gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMuaXRlbVNlbGVjdGlvbkNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIHJvd0luZGV4LCB0cnVlLCBmYWxzZSk7XG4gIH1cblxuICBnZW5lcmF0ZUNvbHVtbnMgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBleHRyYUNvbHVtbiB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBjb2x1bW5zID0gW107XG4gICAgY29uc3QgdGFiSW5kZXggPSBTdHJpbmcodGhpcy5wcm9wcy50YWJJbmRleCk7XG4gICAgaWYgKGV4dHJhQ29sdW1uKSB7XG4gICAgICBjb2x1bW5zLnB1c2goe1xuICAgICAgICB3aWR0aDogZXh0cmFDb2x1bW4ud2lkdGggfHwgNDAsXG4gICAgICAgIGlzUmVzaXphYmxlOiAhIWV4dHJhQ29sdW1uLmlzUmVzaXphYmxlLFxuICAgICAgICBpc1NvcnRhYmxlOiBmYWxzZSxcbiAgICAgICAgY29sdW1uS2V5OiAnZXh0cmFDb2x1bW4nLFxuICAgICAgICBjZWxsOiByb3dJbmRleCA9PiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1leHRyYS1jb2x1bW4tY2VsbCBuby1yb3ctc2VsZWN0XCI+XG4gICAgICAgICAgICB7IGV4dHJhQ29sdW1uLnZhbHVlUmVuZGVyKHRoaXMucHJvcHMuZGF0YS5nZXQocm93SW5kZXgpLCB0YWJJbmRleCkgfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApLFxuICAgICAgICBjZWxsRWRpdDogcm93SW5kZXggPT4gKGV4dHJhQ29sdW1uLmNlbGxFZGl0ID8gZXh0cmFDb2x1bW4uY2VsbEVkaXQocm93SW5kZXgpIDogbnVsbCksXG4gICAgICAgIGNlbGxDcmVhdGU6IHJvd0luZGV4ID0+IChleHRyYUNvbHVtbi5jZWxsQ3JlYXRlID8gZXh0cmFDb2x1bW4uY2VsbENyZWF0ZShyb3dJbmRleCkgOiBudWxsKSxcbiAgICAgICAgY2VsbEZpbHRlcjogcm93SW5kZXggPT4gKGV4dHJhQ29sdW1uLmNlbGxGaWx0ZXIgPyBleHRyYUNvbHVtbi5jZWxsRmlsdGVyKHJvd0luZGV4KSA6IG51bGwpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcHMucm93U2VsZWN0Q2hlY2tib3hDb2x1bW4pIHtcbiAgICAgIGNvbHVtbnMucHVzaCh7XG4gICAgICAgIHdpZHRoOiA0MCxcbiAgICAgICAgaXNSZXNpemFibGU6IGZhbHNlLFxuICAgICAgICBpc1NvcnRhYmxlOiBmYWxzZSxcbiAgICAgICAgY29sdW1uS2V5OiAnc2VsZWN0aW9uQ2hlY2tib3gnLFxuICAgICAgICBjZWxsOiAocm93SW5kZXgpID0+IHtcbiAgICAgICAgICBjb25zdCByb3dJdGVtID0gdGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCk7XG4gICAgICAgICAgY29uc3QgaXRlbUlkID0gcm93SXRlbS5nZXRJbih0aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoKTtcbiAgICAgICAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhpdGVtSWQpO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkU2VsZWN0Q2hlY2tCb3gtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtc2VsZWN0LWNoZWNrYm94LWNlbGwgbm8tcm93LXNlbGVjdFwiXG4gICAgICAgICAgICAgIGNoZWNrZWQ9e3NlbGVjdGVkfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVTZWxlY3Rpb25DaGVja0JveE9uQ2hhbmdlKHJvd0luZGV4KX1cbiAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICBjZWxsRWRpdDogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbENyZWF0ZTogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbEZpbHRlcjogKCkgPT4gbnVsbCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHZpc2libGVDb2x1bW5zID0gW107XG4gICAgdGhpcy5wcm9wcy52aXNpYmxlQ29sdW1ucy5mb3JFYWNoKCh2aXNpYmxlQ29sdW1uS2V5KSA9PiB7XG4gICAgICB0aGlzLnByb3BzLmNvbHVtbnMuZm9yRWFjaCgob3JnQ29sKSA9PiB7XG4gICAgICAgIGlmIChVdGlscy5nZXRDb2x1bW5LZXkob3JnQ29sKSA9PT0gdmlzaWJsZUNvbHVtbktleSkge1xuICAgICAgICAgIHZpc2libGVDb2x1bW5zLnB1c2gob3JnQ29sKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgdmlzaWJsZUNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICBjb25zdCBjb2x1bW4gPSB7XG4gICAgICAgIGhlYWRlcjogY29sLmhlYWRlcixcbiAgICAgICAgY29sdW1uS2V5OiBVdGlscy5nZXRDb2x1bW5LZXkoY29sKSxcbiAgICAgICAgd2lkdGg6IChjb2wud2lkdGggfHwgY29sLndpZHRoID09PSAwID8gY29sLndpZHRoIDogMjAwKSxcbiAgICAgICAgbWluV2lkdGg6IChjb2wubWluV2lkdGggfHwgY29sLm1pbldpZHRoID09PSAwID8gY29sLm1pbldpZHRoIDogNDApLFxuICAgICAgICBtYXhXaWR0aDogY29sLm1heFdpZHRoLFxuICAgICAgICBpc1Jlc2l6YWJsZTogIWNvbC5kaXNhYmxlUmVzaXppbmcsXG4gICAgICAgIGZpeGVkOiAhIWNvbC5maXhlZCxcbiAgICAgICAgYWxsb3dDZWxsc1JlY3ljbGluZzogISFjb2wuYWxsb3dDZWxsc1JlY3ljbGluZyxcbiAgICAgICAgZGlzYWJsZVNvcnRpbmc6ICEhY29sLmRpc2FibGVTb3J0aW5nLFxuICAgICAgICBpc1JlcXVpcmVkOiAhIWNvbC5pc1JlcXVpcmVkLFxuICAgICAgICBjb21wb25lbnRUeXBlOiBjb2wuY29tcG9uZW50VHlwZSxcbiAgICAgICAgc3R5bGU6IFV0aWxzLmdldENlbGxTdHlsZUJ5Q29sKGNvbCksXG4gICAgICB9O1xuICAgICAgaWYgKGNvbC52YWx1ZUtleVBhdGgpIHtcbiAgICAgICAgY29sdW1uLnZhbHVlS2V5UGF0aCA9IGNvbC52YWx1ZUtleVBhdGg7XG4gICAgICB9XG4gICAgICBpZiAoY29sLmZsZXhHcm93KSB7XG4gICAgICAgIGNvbHVtbi5mbGV4R3JvdyA9IGNvbC5mbGV4R3JvdztcbiAgICAgIH1cbiAgICAgIGlmIChjb2wudmFsdWVUeXBlKSB7XG4gICAgICAgIGNvbHVtbi52YWx1ZVR5cGUgPSBjb2wudmFsdWVUeXBlO1xuICAgICAgfVxuICAgICAgaWYgKGNvbC5zb3J0Q29tcGFyYXRvcikge1xuICAgICAgICBjb2x1bW4uc29ydENvbXBhcmF0b3IgPSBjb2wuc29ydENvbXBhcmF0b3I7XG4gICAgICB9XG4gICAgICBpZiAoY29sLnNvcnRWYWx1ZUdldHRlcikge1xuICAgICAgICBjb2x1bW4uc29ydFZhbHVlR2V0dGVyID0gY29sLnNvcnRWYWx1ZUdldHRlcjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHZhbHVlRW1wdHlDaGVja2VyID0gVXRpbHMuZ2V0VmFsdWVFbXB0eUNoZWNrZXIoY29sKTtcbiAgICAgIC8vIENlbGwgdmFsdWUgcmVuZGVyaW5nXG4gICAgICBjb25zdCB2YWx1ZVJlbmRlciA9IChyb3dJbmRleCwgZm9ybWF0KSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbCA9IHRoaXMucHJvcHMuZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbCkpIHtcbiAgICAgICAgICByZXR1cm4gY29sLmlzUmVxdWlyZWQgPyA8TSBpZD1cIkdyaWQuVmFsdWVJc01pc3NpbmdcIiAvPiA6ICcnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3JtYXQgPyBmb3JtYXQodmFsKSA6IHZhbDtcbiAgICAgIH07XG5cbiAgICAgIGlmIChjb2wuY2VsbCkge1xuICAgICAgICBjb2x1bW4uY2VsbCA9IGNvbC5jZWxsO1xuICAgICAgfSBlbHNlIGlmIChjb2wudmFsdWVSZW5kZXIpIHtcbiAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBjb2wudmFsdWVSZW5kZXIodGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3dpdGNoIChjb2wudmFsdWVUeXBlKSB7XG4gICAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICBjYXNlICdmbG9hdCc6XG4gICAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+XG4gICAgICAgICAgICAgIHZhbHVlUmVuZGVyKHJvd0luZGV4LCB2ID0+IDxOIHZhbHVlPXt2fSB7Li4uY29sLnJlbmRlckNvbXBvbmVudFByb3BzfSAvPik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdjdXJyZW5jeSc6IHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbmN5S2V5UGF0aCA9IGNvbC52YWx1ZU9wdGlvbnMgJiYgY29sLnZhbHVlT3B0aW9ucy5jdXJyZW5jeUtleVBhdGggfHwgWydjdXJyZW5jeSddOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+XG4gICAgICAgICAgICAgIHZhbHVlUmVuZGVyKHJvd0luZGV4LCB2ID0+IGZvcm1hdEN1cnJlbmN5QW1vdW50KHYsIHtcbiAgICAgICAgICAgICAgICBjdXJyZW5jeTogdGhpcy5wcm9wcy5kYXRhLmdldEluKFtyb3dJbmRleCwgLi4uY3VycmVuY3lLZXlQYXRoXSksXG4gICAgICAgICAgICAgICAgZGVjaW1hbHM6IGNvbC52YWx1ZU9wdGlvbnMgJiYgY29sLnZhbHVlT3B0aW9ucy5kZWNpbWFscyxcbiAgICAgICAgICAgICAgICB0aG91c2FuZFNlcGFyYXRvcjogY29sLnZhbHVlT3B0aW9ucyAmJiBjb2wudmFsdWVPcHRpb25zLnRob3VzYW5kU2VwYXJhdG9yIHx8IHRoaXMucHJvcHMudGhvdXNhbmRTZXBhcmF0b3IsIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgICAgICAgICBkZWNpbWFsU2VwYXJhdG9yOiBjb2wudmFsdWVPcHRpb25zICYmIGNvbC52YWx1ZU9wdGlvbnMuZGVjaW1hbFNlcGFyYXRvciB8fCB0aGlzLnByb3BzLmRlY2ltYWxTZXBhcmF0b3IsIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PlxuICAgICAgICAgICAgICB2YWx1ZVJlbmRlcihyb3dJbmRleCwgKHYpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobW9tZW50KHYsIHRoaXMucHJvcHMuZGF0ZUZvcm1hdCwgdHJ1ZSkuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gbW9tZW50LnV0Yyh2LCB0aGlzLnByb3BzLmRhdGVGb3JtYXQpLmZvcm1hdCh0aGlzLnByb3BzLmRhdGVGb3JtYXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobW9tZW50KHYpLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vbWVudC51dGModikuZm9ybWF0KHRoaXMucHJvcHMuZGF0ZUZvcm1hdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiA8TSBpZD1cIkdyaWQuSW52YWxpZERhdGVcIiAvPjtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT5cbiAgICAgICAgICAgICAgdmFsdWVSZW5kZXIocm93SW5kZXgsIHYgPT5cbiAgICAgICAgICAgICAgICA8TSBpZD17diA/ICdHcmlkLlllcycgOiAnR3JpZC5Obyd9IHsuLi5jb2wucmVuZGVyQ29tcG9uZW50UHJvcHN9IC8+KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IHZhbHVlUmVuZGVyKHJvd0luZGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gQ2VsbCBlZGl0L2NyZWF0ZS9maWx0ZXIgY29tcG9uZW50IHJlbmRlcmluZ1xuICAgICAgaWYgKGNvbC5jZWxsRWRpdCkge1xuICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSBjb2wuY2VsbEVkaXQ7XG4gICAgICB9IGVsc2UgaWYgKGNvbC5lZGl0VmFsdWVSZW5kZXIpIHtcbiAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gY29sLmVkaXRWYWx1ZVJlbmRlcih0aGlzLnByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSk7XG4gICAgICB9XG4gICAgICBpZiAoY29sLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSBjb2wuY2VsbENyZWF0ZTtcbiAgICAgIH0gZWxzZSBpZiAoY29sLmNyZWF0ZVZhbHVlUmVuZGVyKSB7XG4gICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gY29sLmNyZWF0ZVZhbHVlUmVuZGVyKHRoaXMucHJvcHMuZGF0YS5nZXQocm93SW5kZXgpKTtcbiAgICAgIH1cbiAgICAgIGlmIChjb2wuY2VsbEZpbHRlcikge1xuICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9IGNvbC5jZWxsRmlsdGVyO1xuICAgICAgfSBlbHNlIGlmIChjb2wuZmlsdGVyVmFsdWVSZW5kZXIpIHtcbiAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSByb3dJbmRleCA9PiBjb2wuZmlsdGVyVmFsdWVSZW5kZXIodGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCkpO1xuICAgICAgfVxuICAgICAgaWYgKGNvbC5jb21wb25lbnRUeXBlKSB7XG4gICAgICAgIGxldCBlZGl0VmFsdWVQYXJzZXIgPSB2YWwgPT4gdmFsO1xuICAgICAgICBzd2l0Y2ggKGNvbC5jb21wb25lbnRUeXBlKSB7XG4gICAgICAgICAgY2FzZSAndGV4dCc6XG4gICAgICAgICAgICAvLyBUT0RPIFJFRkFDVE9SIFRPIEZVTkNUSU9OXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5pbmxpbmVFZGl0KSB7XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gKFxuICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25FZGl0Q2VsbFZhbHVlQ2hhbmdlKHJvd0luZGV4LCBjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5vbkVkaXRDZWxsQmx1cihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5vbkNlbGxGb2N1cygnZWRpdCcsIGNvbC5jb21wb25lbnRUeXBlLCByb3dJbmRleCwgY29sdW1uLmNvbHVtbktleSl9XG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5vbkVkaXRDZWxsS2V5RG93bihjb2wsIHJvd0luZGV4KX1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRSZWY9e3RoaXMuaGFuZGxlRWRpdENlbGxSZWYocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZEVkaXRJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fS0ke3Jvd0luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuZWRpdENvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdlZGl0Jyl9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXtjb2x1bW4uc3R5bGV9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiAoXG4gICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRDcmVhdGVJdGVtVmFsdWUocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlKHJvd0luZGV4LCBjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5vbkNyZWF0ZUNlbGxCbHVyKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMub25DcmVhdGVDZWxsS2V5RG93bn1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRSZWY9e3RoaXMuaGFuZGxlQ3JlYXRlQ2VsbFJlZihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkQ3JlYXRlSW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX0tJHtyb3dJbmRleH1gfVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmNyZWF0ZUNvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdjcmVhdGUnKX1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e2NvbHVtbi5zdHlsZX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5maWx0ZXJpbmcpIHtcbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT4gKFxuICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0RmlsdGVySXRlbVZhbHVlKGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uRmlsdGVyQ2VsbFZhbHVlQ2hhbmdlKGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkRmlsdGVySW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX1gfVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmZpbHRlckNvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17Y29sdW1uLnN0eWxlfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5pbmxpbmVFZGl0KSB7XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gKFxuICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkVkaXRDZWxsVmFsdWVDaGFuZ2Uocm93SW5kZXgsIGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLm9uRWRpdENlbGxCbHVyKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLm9uQ2VsbEZvY3VzKCdlZGl0JywgY29sLmNvbXBvbmVudFR5cGUsIHJvd0luZGV4LCBjb2x1bW4uY29sdW1uS2V5KX1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLm9uRWRpdENlbGxLZXlEb3duKGNvbCwgcm93SW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFJlZj17dGhpcy5oYW5kbGVFZGl0Q2VsbFJlZihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkRWRpdElucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5lZGl0Q29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2VkaXQnKX1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e2NvbHVtbi5zdHlsZX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IChcbiAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0Q3JlYXRlSXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZShyb3dJbmRleCwgY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMub25DcmVhdGVDZWxsQmx1cihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5vbkNlbGxGb2N1cygnY3JlYXRlJywgJ251bWJlcicsIHJvd0luZGV4LCBjb2x1bW4uY29sdW1uS2V5KX1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLm9uQ3JlYXRlQ2VsbEtleURvd259XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UmVmPXt0aGlzLmhhbmRsZUNyZWF0ZUNlbGxSZWYocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZENyZWF0ZUlucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5jcmVhdGVDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnY3JlYXRlJyl9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXtjb2x1bW4uc3R5bGV9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuZmlsdGVyaW5nKSB7XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IChcbiAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0RmlsdGVySXRlbVZhbHVlKGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uRmlsdGVyQ2VsbFZhbHVlQ2hhbmdlKGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkRmlsdGVySW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX1gfVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmZpbHRlckNvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17Y29sdW1uLnN0eWxlfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlciA9IHZhbCA9PlxuICAgICAgICAgICAgICB2YWwucmVwbGFjZShuZXcgUmVnRXhwKGBbXlxcXFxkJHt0aGlzLnByb3BzLmRlY2ltYWxTZXBhcmF0b3J9Ky1dYCwgJ2cnKSwgJycpO1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5saW5lRWRpdCkge1xuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IChcbiAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uRWRpdENlbGxWYWx1ZUNoYW5nZShyb3dJbmRleCwgY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMub25FZGl0Q2VsbEJsdXIocm93SW5kZXgsIGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5vbkNlbGxGb2N1cygnZWRpdCcsIGNvbC5jb21wb25lbnRUeXBlLCByb3dJbmRleCwgY29sdW1uLmNvbHVtbktleSl9XG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5vbkVkaXRDZWxsS2V5RG93bihjb2wsIHJvd0luZGV4KX1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRSZWY9e3RoaXMuaGFuZGxlRWRpdENlbGxSZWYocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZEVkaXRJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fS0ke3Jvd0luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuZWRpdENvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdlZGl0Jyl9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXtjb2x1bW4uc3R5bGV9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiAoXG4gICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRDcmVhdGVJdGVtVmFsdWUocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlKHJvd0luZGV4LCBjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5vbkNyZWF0ZUNlbGxCbHVyKHJvd0luZGV4LCBjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5vbkNyZWF0ZUNlbGxLZXlEb3dufVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFJlZj17dGhpcy5oYW5kbGVDcmVhdGVDZWxsUmVmKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRDcmVhdGVJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fS0ke3Jvd0luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuY3JlYXRlQ29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2NyZWF0ZScpfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17Y29sdW1uLnN0eWxlfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmZpbHRlcmluZykge1xuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRGaWx0ZXJJdGVtVmFsdWUoY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UoY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRGaWx0ZXJJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fWB9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuZmlsdGVyQ29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXtjb2x1bW4uc3R5bGV9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnc2VsZWN0Jzoge1xuICAgICAgICAgICAgY29uc3QgeyBpbnRsIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0T3B0aW9ucyA9IGNvbC5zZWxlY3RDb21wb25lbnRPcHRpb25zIHx8XG4gICAgICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0Q29tcG9uZW50T3B0aW9ucy5nZXQoY29sdW1uLmNvbHVtbktleSk7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RUcmFuc2xhdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50VHJhbnNsYXRpb25zIHx8XG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0LlNlbGVjdCcgfSksXG4gICAgICAgICAgICAgICAgbm9SZXN1bHRzVGV4dDogaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0Lk5vUmVzdWx0cycgfSksXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5pbmxpbmVFZGl0KSB7XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gKFxuICAgICAgICAgICAgICAgICAgPEZsb2F0aW5nU2VsZWN0XG4gICAgICAgICAgICAgICAgICAgIG5hbWU9e2NvbC52YWx1ZUtleVBhdGguam9pbigpICsgJy1lZGl0LScgKyByb3dJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucz17XG4gICAgICAgICAgICAgICAgICAgICAgY29sLmVkaXRTZWxlY3RPcHRpb25zTW9kICYmIHNlbGVjdE9wdGlvbnMgP1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sLmVkaXRTZWxlY3RPcHRpb25zTW9kKHNlbGVjdE9wdGlvbnMuc2xpY2UoKSwgcm93SW5kZXgsIGNvbCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0T3B0aW9uc1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uRWRpdENlbGxWYWx1ZUNoYW5nZShyb3dJbmRleCwgY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMub25FZGl0Q2VsbEJsdXIocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMub25DZWxsRm9jdXMoJ2VkaXQnLCBjb2wuY29tcG9uZW50VHlwZSwgcm93SW5kZXgsIGNvbHVtbi5jb2x1bW5LZXkpfVxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hhYmxlPXtzZWxlY3RPcHRpb25zICYmIChzZWxlY3RPcHRpb25zLmxlbmd0aCA+IDkpfVxuICAgICAgICAgICAgICAgICAgICBjbGVhcmFibGU9eyFjb2wuaXNSZXF1aXJlZH1cbiAgICAgICAgICAgICAgICAgICAgYmFja3NwYWNlUmVtb3Zlcz17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIHRhYlNlbGVjdHNWYWx1ZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIG9wZW5PbkZvY3VzXG4gICAgICAgICAgICAgICAgICAgIHJlZj17dGhpcy5oYW5kbGVFZGl0Q2VsbFJlZihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICAgIGlkOiBgb2NEYXRhZ3JpZEVkaXRJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fS0ke3Jvd0luZGV4fWAsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuZWRpdENvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdlZGl0Jyl9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgey4uLnNlbGVjdFRyYW5zbGF0aW9uc31cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiAoXG4gICAgICAgICAgICAgICAgICA8RmxvYXRpbmdTZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgbmFtZT17Y29sLnZhbHVlS2V5UGF0aC5qb2luKCkgKyAnLWNyZWF0ZS0nICsgcm93SW5kZXh9XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e1xuICAgICAgICAgICAgICAgICAgICAgIGNvbC5jcmVhdGVTZWxlY3RPcHRpb25zTW9kICYmIHNlbGVjdE9wdGlvbnMgP1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sLmNyZWF0ZVNlbGVjdE9wdGlvbnNNb2Qoc2VsZWN0T3B0aW9ucy5zbGljZSgpLCByb3dJbmRleCwgY29sKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RPcHRpb25zXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0Q3JlYXRlSXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZShyb3dJbmRleCwgY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMub25DcmVhdGVDZWxsQmx1cihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoYWJsZT17c2VsZWN0T3B0aW9ucyAmJiAoc2VsZWN0T3B0aW9ucy5sZW5ndGggPiA5KX1cbiAgICAgICAgICAgICAgICAgICAgY2xlYXJhYmxlPXshY29sLmlzUmVxdWlyZWR9XG4gICAgICAgICAgICAgICAgICAgIGJhY2tzcGFjZVJlbW92ZXM9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICB0YWJTZWxlY3RzVmFsdWU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBvcGVuT25Gb2N1c1xuICAgICAgICAgICAgICAgICAgICByZWY9e3RoaXMuaGFuZGxlQ3JlYXRlQ2VsbFJlZihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICAgIGlkOiBgb2NEYXRhZ3JpZENyZWF0ZUlucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YCxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5jcmVhdGVDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnY3JlYXRlJyl9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgey4uLnNlbGVjdFRyYW5zbGF0aW9uc31cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuZmlsdGVyaW5nKSB7XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IChcbiAgICAgICAgICAgICAgICAgIDxGbG9hdGluZ1NlbGVjdFxuICAgICAgICAgICAgICAgICAgICBuYW1lPXtjb2wudmFsdWVLZXlQYXRoLmpvaW4oKSArICctZmlsdGVyJ31cbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucz17XG4gICAgICAgICAgICAgICAgICAgICAgY29sLmZpbHRlclNlbGVjdE9wdGlvbnNNb2QgJiYgc2VsZWN0T3B0aW9ucyA/XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2wuZmlsdGVyU2VsZWN0T3B0aW9uc01vZChzZWxlY3RPcHRpb25zLnNsaWNlKCksIGNvbCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0T3B0aW9uc31cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0RmlsdGVySXRlbVZhbHVlKGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uRmlsdGVyQ2VsbFZhbHVlQ2hhbmdlKGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoYWJsZT17c2VsZWN0T3B0aW9ucyAmJiAoc2VsZWN0T3B0aW9ucy5sZW5ndGggPiA5KX1cbiAgICAgICAgICAgICAgICAgICAgY2xlYXJhYmxlXG4gICAgICAgICAgICAgICAgICAgIHRhYlNlbGVjdHNWYWx1ZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIG9wZW5PbkZvY3VzXG4gICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICBpZDogYG9jRGF0YWdyaWRGaWx0ZXJJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fWAsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuZmlsdGVyQ29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgey4uLnNlbGVjdFRyYW5zbGF0aW9uc31cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNhc2UgJ2RhdGUnOiB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5pbmxpbmVFZGl0KSB7XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gKFxuICAgICAgICAgICAgICAgICAgPERhdGVJbnB1dFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkVkaXRDZWxsVmFsdWVDaGFuZ2Uocm93SW5kZXgsIGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgbG9jYWxlPXt0aGlzLnByb3BzLnJlZ2lvbn1cbiAgICAgICAgICAgICAgICAgICAgZGF0ZUZvcm1hdD17dGhpcy5wcm9wcy5kYXRlRm9ybWF0fVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFJlZj17dGhpcy5oYW5kbGVFZGl0Q2VsbFJlZihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgIGlkOiBgb2NEYXRhZ3JpZEVkaXRJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fS0ke3Jvd0luZGV4fWAsXG4gICAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duOiB0aGlzLm9uRWRpdENlbGxLZXlEb3duKGNvbCwgcm93SW5kZXgpLFxuICAgICAgICAgICAgICAgICAgICAgIG9uQmx1cjogdGhpcy5vbkVkaXRDZWxsQmx1cihyb3dJbmRleCwgY29sKSxcbiAgICAgICAgICAgICAgICAgICAgICBvbkZvY3VzOiB0aGlzLm9uQ2VsbEZvY3VzKCdlZGl0JywgY29sLmNvbXBvbmVudFR5cGUsIHJvd0luZGV4LCBjb2x1bW4uY29sdW1uS2V5KSxcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogY29sdW1uLnN0eWxlLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmVkaXRDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnZWRpdCcpfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IChcbiAgICAgICAgICAgICAgICAgIDxEYXRlSW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0Q3JlYXRlSXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZShyb3dJbmRleCwgY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMub25DcmVhdGVDZWxsS2V5RG93bn1cbiAgICAgICAgICAgICAgICAgICAgbG9jYWxlPXt0aGlzLnByb3BzLnJlZ2lvbn1cbiAgICAgICAgICAgICAgICAgICAgZGF0ZUZvcm1hdD17dGhpcy5wcm9wcy5kYXRlRm9ybWF0fVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFJlZj17dGhpcy5oYW5kbGVDcmVhdGVDZWxsUmVmKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgaWQ6IGBvY0RhdGFncmlkQ3JlYXRlSW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX0tJHtyb3dJbmRleH1gLFxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBjb2x1bW4uc3R5bGUsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuY3JlYXRlQ29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2NyZWF0ZScpfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5maWx0ZXJpbmcpIHtcbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT4gKFxuICAgICAgICAgICAgICAgICAgPERhdGVJbnB1dFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRGaWx0ZXJJdGVtVmFsdWUoY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UoY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBkYXRlRm9ybWF0PXt0aGlzLnByb3BzLmRhdGVGb3JtYXR9XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsZT17dGhpcy5wcm9wcy5yZWdpb259XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICBpZDogYG9jRGF0YWdyaWRGaWx0ZXJJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fWAsXG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IGNvbHVtbi5zdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5maWx0ZXJDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNhc2UgJ2Jvb2xlYW4nOiB7XG4gICAgICAgICAgICBjb25zdCB7IGludGwgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RPcHRpb25zID0gW1xuICAgICAgICAgICAgICB7IHZhbHVlOiB0cnVlLCBsYWJlbDogaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLlllcycgfSkgfSxcbiAgICAgICAgICAgICAgeyB2YWx1ZTogZmFsc2UsIGxhYmVsOiBpbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuTm8nIH0pIH0sXG4gICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RUcmFuc2xhdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50VHJhbnNsYXRpb25zIHx8IHtcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IGludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5TZWxlY3QnIH0pLFxuICAgICAgICAgICAgICBub1Jlc3VsdHNUZXh0OiBpbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuTm9SZXN1bHRzJyB9KSxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmlubGluZUVkaXQpIHtcbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiAoXG4gICAgICAgICAgICAgICAgICA8RmxvYXRpbmdTZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgbmFtZT17Y29sLnZhbHVlS2V5UGF0aC5qb2luKCkgKyAnLWVkaXQtJyArIHJvd0luZGV4fVxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zPXtzZWxlY3RPcHRpb25zfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkVkaXRDZWxsVmFsdWVDaGFuZ2Uocm93SW5kZXgsIGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLm9uRWRpdENlbGxCbHVyKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLm9uQ2VsbEZvY3VzKCdlZGl0JywgY29sLmNvbXBvbmVudFR5cGUsIHJvd0luZGV4LCBjb2x1bW4uY29sdW1uS2V5KX1cbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoYWJsZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyYWJsZT17IWNvbC5pc1JlcXVpcmVkfVxuICAgICAgICAgICAgICAgICAgICBiYWNrc3BhY2VSZW1vdmVzPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgdGFiU2VsZWN0c1ZhbHVlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgb3Blbk9uRm9jdXNcbiAgICAgICAgICAgICAgICAgICAgcmVmPXt0aGlzLmhhbmRsZUVkaXRDZWxsUmVmKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgaWQ6IGBvY0RhdGFncmlkRWRpdElucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YCxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5lZGl0Q29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2VkaXQnKX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgICAgICAgICB7Li4uc2VsZWN0VHJhbnNsYXRpb25zfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IChcbiAgICAgICAgICAgICAgICAgIDxGbG9hdGluZ1NlbGVjdFxuICAgICAgICAgICAgICAgICAgICBuYW1lPXtjb2wudmFsdWVLZXlQYXRoLmpvaW4oKSArICctY3JlYXRlLScgKyByb3dJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucz17c2VsZWN0T3B0aW9uc31cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0Q3JlYXRlSXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZShyb3dJbmRleCwgY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMub25DcmVhdGVDZWxsQmx1cihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoYWJsZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyYWJsZT17IWNvbC5pc1JlcXVpcmVkfVxuICAgICAgICAgICAgICAgICAgICBiYWNrc3BhY2VSZW1vdmVzPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgdGFiU2VsZWN0c1ZhbHVlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgb3Blbk9uRm9jdXNcbiAgICAgICAgICAgICAgICAgICAgcmVmPXt0aGlzLmhhbmRsZUNyZWF0ZUNlbGxSZWYocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICBpZDogYG9jRGF0YWdyaWRDcmVhdGVJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fS0ke3Jvd0luZGV4fWAsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuY3JlYXRlQ29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2NyZWF0ZScpfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5zZWxlY3RUcmFuc2xhdGlvbnN9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmZpbHRlcmluZykge1xuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8RmxvYXRpbmdTZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgbmFtZT17Y29sLnZhbHVlS2V5UGF0aC5qb2luKCkgKyAnLWZpbHRlcid9XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e3NlbGVjdE9wdGlvbnN9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldEZpbHRlckl0ZW1WYWx1ZShjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkZpbHRlckNlbGxWYWx1ZUNoYW5nZShjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaGFibGU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBjbGVhcmFibGVcbiAgICAgICAgICAgICAgICAgICAgdGFiU2VsZWN0c1ZhbHVlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgb3Blbk9uRm9jdXNcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICAgIGlkOiBgb2NEYXRhZ3JpZEZpbHRlcklucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9YCxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5maWx0ZXJDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgICAgICAgICB7Li4uc2VsZWN0VHJhbnNsYXRpb25zfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29sdW1ucy5wdXNoKGNvbHVtbik7XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5pc0NyZWF0aW5nKSB7XG4gICAgICBjb2x1bW5zLnB1c2goe1xuICAgICAgICB3aWR0aDogMzcsXG4gICAgICAgIGlzUmVzaXphYmxlOiBmYWxzZSxcbiAgICAgICAgY29sdW1uS2V5OiAncmVtb3ZlTmV3SXRlbScsXG4gICAgICAgIGNlbGw6ICgpID0+IG51bGwsXG4gICAgICAgIGNlbGxFZGl0OiAoKSA9PiBudWxsLFxuICAgICAgICBjZWxsQ3JlYXRlOiByb3dJbmRleCA9PiAoXG4gICAgICAgICAgPEljb25cbiAgICAgICAgICAgIGlkPXtgb2MtZGF0YWdyaWQtbmV3LWl0ZW0tcmVtb3ZlLSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke3Jvd0luZGV4fWB9XG4gICAgICAgICAgICB0eXBlPVwiaW5kaWNhdG9yXCJcbiAgICAgICAgICAgIG5hbWU9XCJkZWxldGVcIlxuICAgICAgICAgICAgd2lkdGg9ezMwfVxuICAgICAgICAgICAgaGVpZ2h0PXszMH1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMucHJvcHMucmVtb3ZlTmV3SXRlbSh0aGlzLnByb3BzLmdyaWQsIHJvd0luZGV4KX1cbiAgICAgICAgICAvPlxuICAgICAgICApLFxuICAgICAgICBjZWxsRmlsdGVyOiAoKSA9PiBudWxsLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBjb2x1bW5zO1xuICB9XG5cbiAgaXNDZWxsRWRpdGVkID0gKHJvd0luZGV4LCBjb2wsIGNlbGxUeXBlKSA9PiB7XG4gICAgaWYgKGNlbGxUeXBlICE9PSAnZWRpdCcpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgaWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgIGlmICh0aGlzLnByb3BzLmVkaXREYXRhLmdldEluKFtpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaGFuZGxlQWZ0ZXJBZGRJdGVtID0gKCkgPT4ge1xuICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgPSB0cnVlO1xuICB9XG5cbiAgaGFuZGxlQWZ0ZXJFZGl0UHJlc3MgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5zaXplKSB7XG4gICAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IHRydWU7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY3VycmVudFJvdzogdW5kZWZpbmVkLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlQWZ0ZXJWYWxpZGF0aW9uRXJyb3IgPSAoKSA9PiB7XG4gICAgdGhpcy5mb2N1c1RvRXJyb3JDZWxsID0gdHJ1ZTtcbiAgfVxuXG4gIGhhbmRsZVJvd0NsaWNrID0gKGUsIHJvd0luZGV4KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMucm93U2VsZWN0ICYmICF0aGlzLnByb3BzLmlzQ3JlYXRpbmcgJiYgIXRoaXMucHJvcHMuaXNFZGl0aW5nKSB7XG4gICAgICBpZiAoZS5jdHJsS2V5IHx8IGUuc2hpZnRLZXkpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0U2VsZWN0aW9uKCkucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICB9XG4gICAgICAvLyBEb24ndCB0cmlnZ2VyIHNlbGVjdGlvbiBjaGFuZ2Ugb24gd2hlbiB1c2VyIGNsaWNrcyBvbiBzcGVjaWFsIGNlbGxzIGxpa2UgY2hlY2tib3gvZXh0cmFcbiAgICAgIC8vIENoZWNrIHRoYXQgY2xpY2tlZCBub2RlJ3MgcGFyZW50IG9yIHBhcmVudCdzIHBhcmVudCBkb2Vzbid0IGhhdmUgbm8tcm93LXNlbGVjdCBjbGFzc1xuICAgICAgY29uc3QgeyBwYXJlbnROb2RlIH0gPSBlLnRhcmdldDtcbiAgICAgIGNvbnN0IHBhcmVudDFjbGFzcyA9IHBhcmVudE5vZGUuY2xhc3NOYW1lICYmIHBhcmVudE5vZGUuY2xhc3NOYW1lLmluZGV4T2ZcbiAgICAgICAgPyBwYXJlbnROb2RlLmNsYXNzTmFtZVxuICAgICAgICA6ICcnO1xuICAgICAgICBjb25zdCBwYXJlbnQyY2xhc3MgPSBwYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lICYmIHBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUuaW5kZXhPZiAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgID8gcGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZVxuICAgICAgICA6ICcnO1xuICAgICAgICBjb25zdCBwYXJlbnQzY2xhc3MgPSBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUgJiYgcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lLmluZGV4T2YgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICA/IHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZVxuICAgICAgICA6ICcnO1xuICAgICAgICBjb25zdCBwYXJlbnQ0Y2xhc3MgPSBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZSAmJiBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZS5pbmRleE9mIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgPyBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZVxuICAgICAgICA6ICcnO1xuICAgICAgaWYgKFxuICAgICAgICBwYXJlbnQxY2xhc3MuaW5kZXhPZignbm8tcm93LXNlbGVjdCcpID09PSAtMSAmJlxuICAgICAgICBwYXJlbnQyY2xhc3MuaW5kZXhPZignbm8tcm93LXNlbGVjdCcpID09PSAtMSAmJlxuICAgICAgICBwYXJlbnQzY2xhc3MuaW5kZXhPZignbm8tcm93LXNlbGVjdCcpID09PSAtMSAmJlxuICAgICAgICBwYXJlbnQ0Y2xhc3MuaW5kZXhPZignbm8tcm93LXNlbGVjdCcpID09PSAtMVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMucHJvcHMuaXRlbVNlbGVjdGlvbkNoYW5nZShcbiAgICAgICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgdGhpcy5wcm9wcy5tdWx0aVNlbGVjdCAmJiBlLmN0cmxLZXksXG4gICAgICAgICAgdGhpcy5wcm9wcy5tdWx0aVNlbGVjdCAmJiBlLnNoaWZ0S2V5LFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5vblJvd0NsaWNrKSB7XG4gICAgICB0aGlzLnByb3BzLm9uUm93Q2xpY2soZSwgcm93SW5kZXgsIHRoaXMucHJvcHMuZGF0YS5nZXQocm93SW5kZXgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBoYW5kbGVDb250ZXh0TWVudSA9IChlLCByb3dJbmRleCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmNvbnRleHRNZW51SXRlbXMpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgaXRlbVNlbGVjdGlvbkNoYW5nZSxcbiAgICAgICAgc2VsZWN0ZWRJdGVtcyxcbiAgICAgICAgZ3JpZCxcbiAgICAgICAgZGF0YSxcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjb250ZXh0TWVudU9wZW46IHRydWUsXG4gICAgICAgIGNvbnRleHRNZW51WDogZS5jbGllbnRYLFxuICAgICAgICBjb250ZXh0TWVudVk6IGUuY2xpZW50WSxcbiAgICAgIH0pO1xuICAgICAgLy8gSWYgY2xpY2tlZCBpdGVtIGlzIG5vdCBzZWxlY3RlZCwgY2hhbmdlIHNlbGVjdGlvbiB0byBpdFxuICAgICAgaWYgKCFzZWxlY3RlZEl0ZW1zLmluY2x1ZGVzKGRhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi5ncmlkLmlkS2V5UGF0aF0pKSkge1xuICAgICAgICBpdGVtU2VsZWN0aW9uQ2hhbmdlKGdyaWQsIHJvd0luZGV4KTtcbiAgICAgIH1cbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkRvY3VtZW50Q2xpY2spO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGhhbmRsZUNvbnRleHRNZW51SXRlbUNsaWNrID0gKG9uQ2xpY2ssIHNlbGVjdGVkSXRlbXMsIHNlbGVjdGVkRGF0YSkgPT4gKCkgPT4ge1xuICAgIG9uQ2xpY2soc2VsZWN0ZWRJdGVtcywgc2VsZWN0ZWREYXRhKTtcbiAgfVxuXG4gIHJlbmRlckNlbGwgPSBjb2wgPT4gKGNlbGxQcm9wcykgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGlzQ3JlYXRpbmcsXG4gICAgICBpc0VkaXRpbmcsXG4gICAgICBjcmVhdGVEYXRhLFxuICAgICAgc2VsZWN0ZWRDZWxsLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgcm93SW5kZXgsIC4uLnByb3BzIH0gPSBjZWxsUHJvcHM7XG4gICAgbGV0IGNlbGw7XG4gICAgbGV0IGNlbGxUeXBlID0gJ3ZpZXcnO1xuICAgIGxldCBleHRyYVJvd0NvdW50ID0gMDsgLy8gaG93IG1hbnkgcm93cyB0byBpZ25vcmUgZnJvbSB0b3AsIG5ldyArIGZpbHRlciByb3dzXG4gICAgaWYgKGlzQ3JlYXRpbmcpIGV4dHJhUm93Q291bnQgPSBjcmVhdGVEYXRhLnNpemU7XG4gICAgaWYgKGlzQ3JlYXRpbmcpIHtcbiAgICAgIGlmIChyb3dJbmRleCA8PSAoZXh0cmFSb3dDb3VudCAtIDEpKSB7XG4gICAgICAgIGlmIChjb2wuY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNlbGwgPSBjb2wuY2VsbENyZWF0ZShyb3dJbmRleCk7XG4gICAgICAgICAgY2VsbFR5cGUgPSAnY3JlYXRlJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjZWxsID0gbnVsbDtcbiAgICAgICAgICBjZWxsVHlwZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNlbGwgPSBjb2wuY2VsbChyb3dJbmRleCAtIGV4dHJhUm93Q291bnQpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNFZGl0aW5nICYmIGNvbC5jZWxsRWRpdCkge1xuICAgICAgY2VsbCA9IGNvbC5jZWxsRWRpdChyb3dJbmRleCAtIGV4dHJhUm93Q291bnQpO1xuICAgICAgY2VsbFR5cGUgPSAnZWRpdCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNlbGwgPSBjb2wuY2VsbChyb3dJbmRleCAtIGV4dHJhUm93Q291bnQpO1xuICAgIH1cbiAgICBjb25zdCBpc1NwZWNpYWwgPSBjZWxsUHJvcHMuY29sdW1uS2V5ID09PSAnc2VsZWN0aW9uQ2hlY2tib3gnIHx8IGNlbGxQcm9wcy5jb2x1bW5LZXkgPT09ICdleHRyYUNvbHVtbic7XG4gICAgaWYgKChjZWxsVHlwZSA9PT0gJ3ZpZXcnIHx8IGNlbGxUeXBlID09PSAnZWRpdCcgfHwgY2VsbFR5cGUgPT09ICdjcmVhdGUnKSAmJiAhaXNTcGVjaWFsKSB7XG4gICAgICBjb25zdCBnZXRSb3dJbmRleCA9IChjZWxsVHlwZSA9PT0gJ2NyZWF0ZScpID8gcm93SW5kZXggOiAocm93SW5kZXggLSBleHRyYVJvd0NvdW50KTtcbiAgICAgIGNvbnN0IG1lc3NhZ2VEYXRhID0gdGhpcy5nZXRDZWxsTWVzc2FnZXMoZ2V0Um93SW5kZXgsIGNvbCwgY2VsbFR5cGUpO1xuICAgICAgY29uc3QgaXNFZGl0ZWQgPSB0aGlzLmlzQ2VsbEVkaXRlZChnZXRSb3dJbmRleCwgY29sLCBjZWxsVHlwZSk7XG4gICAgICBjb25zdCBjbGFzc05hbWUgPSAoc2VsZWN0ZWRDZWxsLmdldCgncm93SW5kZXgnKSA9PT0gcm93SW5kZXggJiYgc2VsZWN0ZWRDZWxsLmdldCgnY29sdW1uS2V5JykgPT09IHByb3BzLmNvbHVtbktleSkgP1xuICAgICAgICAnb2MtZGF0YWdyaWQtY2VsbCBpcy1zZWxlY3RlZCcgOiAnb2MtZGF0YWdyaWQtY2VsbCc7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Q2VsbFxuICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgICAgICBzdHlsZT17Y29sLnN0eWxlfVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2VsbFNlbGVjdChjZWxsVHlwZSwgcm93SW5kZXgsIHByb3BzLmNvbHVtbktleSl9XG4gICAgICAgID5cbiAgICAgICAgICA8Q2VsbFRvb2x0aXBcbiAgICAgICAgICAgIGlkPXtjZWxsVHlwZSArIGNvbC5jb2x1bW5LZXkgKyAocm93SW5kZXggLSBleHRyYVJvd0NvdW50KX1cbiAgICAgICAgICAgIGlzRWRpdGVkPXtpc0VkaXRlZH1cbiAgICAgICAgICAgIGlzRXJyb3I9eyEhbWVzc2FnZURhdGEuZXJyb3JNZXNzYWdlfVxuICAgICAgICAgICAgaXNXYXJuaW5nPXshIW1lc3NhZ2VEYXRhLndhcm5pbmdNZXNzYWdlfVxuICAgICAgICAgICAgaW5mb01lc3NhZ2U9e21lc3NhZ2VEYXRhLmluZm9NZXNzYWdlfVxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlPXttZXNzYWdlRGF0YS5lcnJvck1lc3NhZ2V9XG4gICAgICAgICAgICB3YXJuaW5nTWVzc2FnZT17bWVzc2FnZURhdGEud2FybmluZ01lc3NhZ2V9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgeyBjZWxsIH1cbiAgICAgICAgICA8L0NlbGxUb29sdGlwPlxuICAgICAgICA8L0NlbGw+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPENlbGwgey4uLnByb3BzfSBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1jZWxsXCIgc3R5bGU9e2NvbC5zdHlsZX0+eyBjZWxsIH08L0NlbGw+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlckNvbHVtbnMgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmFsbERhdGFTaXplICYmICF0aGlzLnByb3BzLmlzQnVzeSAmJiAhdGhpcy5wcm9wcy5pc0NyZWF0aW5nKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Q29sdW1uXG4gICAgICAgICAgY29sdW1uS2V5PVwiZGF0YUVtcHR5Q29sdW1uXCJcbiAgICAgICAgICBoZWFkZXI9ezxDZWxsIHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicgfX0+PE0gaWQ9XCJHcmlkLk5vSXRlbXNcIiAvPjwvQ2VsbD59XG4gICAgICAgICAgd2lkdGg9ezEwfVxuICAgICAgICAgIGlzUmVzaXphYmxlPXtmYWxzZX1cbiAgICAgICAgICBmbGV4R3Jvdz17MX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICAgIGlmICghdGhpcy5wcm9wcy52aXNpYmxlQ29sdW1ucy5zaXplKSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5pc0J1c3kpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8Q29sdW1uXG4gICAgICAgICAgICBjb2x1bW5LZXk9XCJkYXRhRW1wdHlDb2x1bW5cIlxuICAgICAgICAgICAgaGVhZGVyPXs8Q2VsbD4mbmJzcDs8L0NlbGw+fVxuICAgICAgICAgICAgd2lkdGg9ezEwfVxuICAgICAgICAgICAgaXNSZXNpemFibGU9e2ZhbHNlfVxuICAgICAgICAgICAgZmxleEdyb3c9ezF9XG4gICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxDb2x1bW5cbiAgICAgICAgICBjb2x1bW5LZXk9XCJkYXRhRW1wdHlDb2x1bW5cIlxuICAgICAgICAgIGhlYWRlcj17PENlbGwgc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJyB9fT48TSBpZD1cIkdyaWQuTm9Db2x1bW5zXCIgLz48L0NlbGw+fVxuICAgICAgICAgIHdpZHRoPXsxMH1cbiAgICAgICAgICBpc1Jlc2l6YWJsZT17ZmFsc2V9XG4gICAgICAgICAgZmxleEdyb3c9ezF9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCBjb2x1bW5zID0gdGhpcy5nZW5lcmF0ZUNvbHVtbnMoKTtcbiAgICBpZiAoY29sdW1ucy5sZW5naHQgPT09IDApIHJldHVybiBudWxsO1xuICAgIHJldHVybiBjb2x1bW5zLm1hcChjb2wgPT4gKFxuICAgICAgPENvbHVtblxuICAgICAgICBrZXk9e2NvbC5jb2x1bW5LZXl9XG4gICAgICAgIGNvbHVtbktleT17Y29sLmNvbHVtbktleX1cbiAgICAgICAgaGVhZGVyPXtcbiAgICAgICAgICA8SGVhZGVyQ2VsbFxuICAgICAgICAgICAgZ3JpZD17dGhpcy5wcm9wcy5ncmlkfVxuICAgICAgICAgICAgY29sdW1ucz17dGhpcy5wcm9wcy5jb2x1bW5zfVxuICAgICAgICAgICAgY29sdW1uPXtjb2x9XG4gICAgICAgICAgICBjdXJyZW50U29ydENvbHVtbj17dGhpcy5wcm9wcy5zb3J0Q29sdW1ufVxuICAgICAgICAgICAgY3VycmVudFNvcnRPcmRlcj17dGhpcy5wcm9wcy5zb3J0T3JkZXJ9XG4gICAgICAgICAgICBvblNvcnRDaGFuZ2U9e3RoaXMucHJvcHMuc29ydENoYW5nZX1cbiAgICAgICAgICAgIGlzQnVzeT17dGhpcy5wcm9wcy5pc0J1c3l9XG4gICAgICAgICAgICBmaWx0ZXJpbmc9e3RoaXMucHJvcHMuaXNGaWx0ZXJpbmd9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2NvbC5oZWFkZXJ9XG4gICAgICAgICAgPC9IZWFkZXJDZWxsPlxuICAgICAgICB9XG4gICAgICAgIGNlbGw9e3RoaXMucmVuZGVyQ2VsbChjb2wpfVxuICAgICAgICB3aWR0aD17dGhpcy5wcm9wcy5jb2x1bW5XaWR0aHMuZ2V0KGNvbC5jb2x1bW5LZXksIGNvbC53aWR0aCl9XG4gICAgICAgIG1pbldpZHRoPXtjb2wubWluV2lkdGh9XG4gICAgICAgIG1heFdpZHRoPXtjb2wubWF4V2lkdGh9XG4gICAgICAgIGlzUmVzaXphYmxlPXtjb2wuaXNSZXNpemFibGV9XG4gICAgICAgIGZsZXhHcm93PXtjb2wuZmxleEdyb3cgPyBjb2wuZmxleEdyb3cgOiAwfVxuICAgICAgICBmaXhlZD17Y29sLmZpeGVkfVxuICAgICAgICBhbGxvd0NlbGxzUmVjeWNsaW5nPXtjb2wuYWxsb3dDZWxsc1JlY3ljbGluZ31cbiAgICAgIC8+KSk7XG4gIH1cblxuICByZW5kZXJDb250ZXh0TWVudSA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBjb250ZXh0TWVudUl0ZW1zLFxuICAgICAgZGF0YSxcbiAgICAgIGdyaWQsXG4gICAgICBzZWxlY3RlZEl0ZW1zLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHtcbiAgICAgIGNvbnRleHRNZW51WCxcbiAgICAgIGNvbnRleHRNZW51WSxcbiAgICB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBzdHlsZSA9IHtcbiAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICB6SW5kZXg6IDEwMDAwLFxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICB0b3A6IGAke2NvbnRleHRNZW51WX1weGAsXG4gICAgICBsZWZ0OiBgJHtjb250ZXh0TWVudVh9cHhgLFxuICAgIH07XG4gICAgY29uc3Qgc2VsZWN0ZWREYXRhID0gZGF0YS5maWx0ZXIoZCA9PiBzZWxlY3RlZEl0ZW1zLmluY2x1ZGVzKGQuZ2V0SW4oZ3JpZC5pZEtleVBhdGgpKSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDx1bCBjbGFzc05hbWU9XCJkcm9wZG93bi1tZW51IG9jLWRhdGFncmlkLWNvbnRleHQtbWVudSBvcGVuXCIgc3R5bGU9e3N0eWxlfT5cbiAgICAgICAgeyBjb250ZXh0TWVudUl0ZW1zICYmIGNvbnRleHRNZW51SXRlbXMubWFwICYmIGNvbnRleHRNZW51SXRlbXMubWFwKChpdGVtLCBpKSA9PiB7XG4gICAgICAgICAgbGV0IHsgZGlzYWJsZWQgfSA9IGl0ZW07XG4gICAgICAgICAgaWYgKHR5cGVvZiBpdGVtLmRpc2FibGVkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBkaXNhYmxlZCA9IGl0ZW0uZGlzYWJsZWQoc2VsZWN0ZWRJdGVtcywgc2VsZWN0ZWREYXRhKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxNZW51SXRlbVxuICAgICAgICAgICAgICBrZXk9e2l9IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgICAgICAgaGVhZGVyPXtpdGVtLmhlYWRlcn1cbiAgICAgICAgICAgICAgZGl2aWRlcj17aXRlbS5kaXZpZGVyfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAgIHRpdGxlPXtpdGVtLnRpdGxlfVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoZGlzYWJsZWQgfHwgIWl0ZW0ub25DbGljaykgPyBudWxsIDogdGhpcy5oYW5kbGVDb250ZXh0TWVudUl0ZW1DbGljayhcbiAgICAgICAgICAgICAgICBpdGVtLm9uQ2xpY2ssXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRJdGVtcyxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZERhdGEsXG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHsgaXRlbS52YWx1ZSB9XG4gICAgICAgICAgICA8L01lbnVJdGVtPlxuICAgICAgICAgICk7XG4gICAgICAgIH0pIH1cbiAgICAgIDwvdWw+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBncmlkQ2xhc3NOYW1lID0gY2xhc3NOYW1lcyh7XG4gICAgICAnb2MtZGF0YWdyaWQtY29udGFpbmVyJzogdHJ1ZSxcbiAgICAgICd3aXRoLWFjdGlvbmJhcic6IHRoaXMucHJvcHMuaW5saW5lRWRpdCAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlQWN0aW9uQmFyLFxuICAgICAgJ2lzLWJ1c3knOiB0aGlzLnByb3BzLmlzQnVzeSxcbiAgICAgICdpcy1lZGl0aW5nJzogdGhpcy5wcm9wcy5pc0VkaXRpbmcsXG4gICAgICAnaXMtY3JlYXRpbmcnOiB0aGlzLnByb3BzLmlzQ3JlYXRpbmcsXG4gICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgIH0pO1xuXG4gICAgbGV0IGFjdGlvbkJhciA9IG51bGw7XG4gICAgbGV0IGFjdGlvbkJhclJpZ2h0ID0gbnVsbDtcbiAgICBsZXQgYWN0aW9uQmFyTGVmdCA9IG51bGw7XG4gICAgaWYgKFxuICAgICAgKHRoaXMucHJvcHMuYWN0aW9uQmFyIHx8XG4gICAgICB0aGlzLnByb3BzLmlubGluZUVkaXQgfHxcbiAgICAgIHRoaXMucHJvcHMuZmlsdGVyaW5nIHx8XG4gICAgICB0aGlzLnByb3BzLnJlbW92aW5nKSAmJlxuICAgICAgIXRoaXMucHJvcHMuZGlzYWJsZUFjdGlvbkJhclxuICAgICkge1xuICAgICAgYWN0aW9uQmFyUmlnaHQgPSAoXG4gICAgICAgIDxBY3Rpb25CYXIgcG9zaXRpb249XCJyaWdodFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtYWN0aW9uYmFyLXJpZ2h0XCI+eyB0aGlzLnByb3BzLmFjdGlvbkJhciB9PC9kaXY+XG4gICAgICAgICAgeyAodGhpcy5wcm9wcy5maWx0ZXJpbmcgJiYgdGhpcy5wcm9wcy5kaXNhYmxlRHJvcGRvd25cbiAgICAgICAgICAgICYmICF0aGlzLnByb3BzLmRpc2FibGVGaWx0ZXJpbmdDb250cm9scykgJiZcbiAgICAgICAgICAgIDxGaWx0ZXJpbmdDb250cm9scyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgICB9XG4gICAgICAgICAgeyB0aGlzLnByb3BzLmlubGluZUVkaXQgJiZcbiAgICAgICAgICAgIDxJbmxpbmVFZGl0Q29udHJvbHNcbiAgICAgICAgICAgICAgYWZ0ZXJBZGRJdGVtPXt0aGlzLmhhbmRsZUFmdGVyQWRkSXRlbX1cbiAgICAgICAgICAgICAgYWZ0ZXJFZGl0UHJlc3M9e3RoaXMuaGFuZGxlQWZ0ZXJFZGl0UHJlc3N9XG4gICAgICAgICAgICAgIGFmdGVyVmFsaWRhdGlvbkVycm9yPXt0aGlzLmhhbmRsZUFmdGVyVmFsaWRhdGlvbkVycm9yfVxuICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgfVxuICAgICAgICAgIHsgKHRoaXMucHJvcHMuZHJvcGRvd25NZW51SXRlbXMgfHxcbiAgICAgICAgICAgICB0aGlzLnByb3BzLnJlbW92aW5nIHx8XG4gICAgICAgICAgICAgdGhpcy5wcm9wcy5jb2x1bW5TZXR0aW5ncyB8fFxuICAgICAgICAgICAgICh0aGlzLnByb3BzLmZpbHRlcmluZyAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlRHJvcGRvd24pKSAmJlxuICAgICAgICAgICAgIDxEcm9wZG93bkNvbnRyb2xzIHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICAgIH1cbiAgICAgICAgPC9BY3Rpb25CYXI+XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5hY3Rpb25CYXJMZWZ0IHx8IHRoaXMucHJvcHMuZ3JpZEhlYWRlcikge1xuICAgICAgYWN0aW9uQmFyTGVmdCA9IChcbiAgICAgICAgPEFjdGlvbkJhciBwb3NpdGlvbj1cImxlZnRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWdyaWRoZWFkZXJcIj57IHRoaXMucHJvcHMuZ3JpZEhlYWRlciB9PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1hY3Rpb25iYXItbGVmdFwiPnsgdGhpcy5wcm9wcy5hY3Rpb25CYXJMZWZ0IH08L2Rpdj5cbiAgICAgICAgPC9BY3Rpb25CYXI+XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoYWN0aW9uQmFyTGVmdCB8fCBhY3Rpb25CYXJSaWdodCkge1xuICAgICAgYWN0aW9uQmFyID0gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWFjdGlvbmJhci1jb250YWluZXJcIj5cbiAgICAgICAgICB7IGFjdGlvbkJhckxlZnQgfVxuICAgICAgICAgIHsgYWN0aW9uQmFyUmlnaHQgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICAgIGxldCByb3dzQ291bnQgPVxuICAgICAgKHRoaXMucHJvcHMucm93c0NvdW50IHx8IHRoaXMucHJvcHMucm93c0NvdW50ID09PSAwKSA/XG4gICAgICAgIHRoaXMucHJvcHMucm93c0NvdW50IDpcbiAgICAgICAgdGhpcy5wcm9wcy5kYXRhLnNpemU7XG4gICAgaWYgKHRoaXMucHJvcHMuaXNDcmVhdGluZykgcm93c0NvdW50ICs9IHRoaXMucHJvcHMuY3JlYXRlRGF0YS5zaXplO1xuICAgIGlmICghdGhpcy5wcm9wcy52aXNpYmxlQ29sdW1ucy5zaXplKSByb3dzQ291bnQgPSAwO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPXtgb2MtZGF0YWdyaWQtJHt0aGlzLnByb3BzLmdyaWQuaWR9YH1cbiAgICAgICAgY2xhc3NOYW1lPXtncmlkQ2xhc3NOYW1lfVxuICAgICAgICBzdHlsZT17dGhpcy5wcm9wcy5jb250YWluZXJTdHlsZX1cbiAgICAgID5cbiAgICAgICAgeyB0aGlzLnByb3BzLmlzQnVzeSAmJiA8U3Bpbm5lciAvPiB9XG4gICAgICAgIHsgdGhpcy5zdGF0ZS5jb250ZXh0TWVudU9wZW4gJiYgdGhpcy5yZW5kZXJDb250ZXh0TWVudSgpIH1cbiAgICAgICAgeyBhY3Rpb25CYXIgfVxuICAgICAgICA8UmVzcG9uc2l2ZUZpeGVkRGF0YVRhYmxlXG4gICAgICAgICAgaWQ9e3RoaXMucHJvcHMuZ3JpZC5pZH1cbiAgICAgICAgICByb3dzQ291bnQ9e3Jvd3NDb3VudH1cbiAgICAgICAgICBoZWFkZXJIZWlnaHQ9e3RoaXMucHJvcHMuaXNGaWx0ZXJpbmcgP1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5oZWFkZXJIZWlnaHQgKyB0aGlzLnByb3BzLmZpbHRlclJvd0hlaWdodFxuICAgICAgICAgICAgOiB0aGlzLnByb3BzLmhlYWRlckhlaWdodH1cbiAgICAgICAgICByb3dIZWlnaHQ9e3RoaXMucHJvcHMucm93SGVpZ2h0fVxuICAgICAgICAgIG9uQ29sdW1uUmVzaXplRW5kQ2FsbGJhY2s9e3RoaXMub25Db2x1bW5SZXNpemVFbmRDYWxsYmFja31cbiAgICAgICAgICBpc0NvbHVtblJlc2l6aW5nPXtmYWxzZX1cbiAgICAgICAgICBvblJvd0NsaWNrPXt0aGlzLmhhbmRsZVJvd0NsaWNrfVxuICAgICAgICAgIHNjcm9sbFRvQ29sdW1uPXt0aGlzLnByb3BzLnNjcm9sbFRvQ29sdW1uIHx8IHRoaXMuc3RhdGUuY3VycmVudENvbHVtbn1cbiAgICAgICAgICBzY3JvbGxUb3A9e3RoaXMucHJvcHMuc2Nyb2xsVG9wfVxuICAgICAgICAgIHNjcm9sbFRvUm93PXt0aGlzLmdldFNjcm9sbFRvUm93KCl9XG4gICAgICAgICAgb25Sb3dEb3VibGVDbGljaz17dGhpcy5wcm9wcy5vblJvd0RvdWJsZUNsaWNrfVxuICAgICAgICAgIG9uUm93TW91c2VEb3duPXt0aGlzLnByb3BzLm9uTW91c2VEb3dufVxuICAgICAgICAgIG9uUm93TW91c2VFbnRlcj17dGhpcy5wcm9wcy5vblJvd01vdXNlRW50ZXJ9XG4gICAgICAgICAgb25Sb3dNb3VzZUxlYXZlPXt0aGlzLnByb3BzLm9uUm93TW91c2VMZWF2ZX1cbiAgICAgICAgICBvblNjcm9sbFN0YXJ0PXt0aGlzLnByb3BzLm9uU2Nyb2xsU3RhcnR9XG4gICAgICAgICAgb25TY3JvbGxFbmQ9e3RoaXMucHJvcHMub25TY3JvbGxFbmR9XG4gICAgICAgICAgcm93Q2xhc3NOYW1lR2V0dGVyPXt0aGlzLmdldFJvd0NsYXNzTmFtZX1cbiAgICAgICAgICByb3dIZWlnaHRHZXR0ZXI9e3RoaXMucHJvcHMucm93SGVpZ2h0R2V0dGVyfVxuICAgICAgICAgIG9uQ29udGVudEhlaWdodENoYW5nZT17dGhpcy5wcm9wcy5vbkNvbnRlbnRIZWlnaHRDaGFuZ2V9XG4gICAgICAgICAgb25Sb3dDb250ZXh0TWVudT17dGhpcy5oYW5kbGVDb250ZXh0TWVudX1cbiAgICAgICAgPlxuICAgICAgICAgIHsgdGhpcy5yZW5kZXJDb2x1bW5zKCkgfVxuICAgICAgICA8L1Jlc3BvbnNpdmVGaXhlZERhdGFUYWJsZT5cbiAgICAgICAgeyB0aGlzLnByb3BzLmlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW4gJiZcbiAgICAgICAgICA8Q29sdW1uU2V0dGluZ3NNb2RhbFxuICAgICAgICAgICAgZ3JpZD17dGhpcy5wcm9wcy5ncmlkfVxuICAgICAgICAgICAgY29sdW1ucz17dGhpcy5wcm9wcy5jb2x1bW5zfVxuICAgICAgICAgICAgdmlzaWJsZUNvbHVtbnM9e3RoaXMucHJvcHMudmlzaWJsZUNvbHVtbnN9XG4gICAgICAgICAgICBjbG9zZUNvbHVtblNldHRpbmdzTW9kYWw9e3RoaXMucHJvcHMuY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsfVxuICAgICAgICAgICAgc2F2ZUNvbHVtblNldHRpbmdzPXt0aGlzLnByb3BzLnNhdmVDb2x1bW5TZXR0aW5nc31cbiAgICAgICAgICAvPlxuICAgICAgICB9XG4gICAgICAgIHsgdGhpcy5wcm9wcy5jaGlsZHJlbiB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=