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

var _check = require('react-icons/lib/fa/check');

var _check2 = _interopRequireDefault(_check);

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
    decimalSeparator: _datagrid5.default.getDecimalSeparator(GRID, state.user),
    forceRefreshTimestamp: state.datagrid.get('forceRefresh', 0), // force re-render when changed
    focusType: state.datagrid.getIn([GRID.id, 'session', 'focusType'], (0, _immutable.Map)())
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

    // check if there is a new request to change edit mode focus
    this.setFocusTo(this.props.focusType);

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
          rowHeightGetter: this.props.rowHeightGetter && this.handleRowHeightGetter,
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
          return col.valueRender(_this2.props.data.get(rowIndex), rowIndex);
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
          case 'checkbox':
            column.cell = function (rowIndex) {
              return valueRender(rowIndex, function (v) {
                return v ? _react2.default.createElement(_check2.default, { size: 20 }) : null;
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
          case 'checkbox':
            {
              var _intl2 = _this2.props.intl;

              var _selectOptions2 = [{ value: true, label: _intl2.formatMessage({ id: 'Grid.Checked' }) }, { value: false, label: _intl2.formatMessage({ id: 'Grid.UnChecked' }) }];

              var _selectTranslations2 = col.selectComponentTranslations || {
                placeholder: _intl2.formatMessage({ id: 'Grid.FloatingSelect.Select' }),
                noResultsText: _intl2.formatMessage({ id: 'Grid.FloatingSelect.NoResults' })
              };

              if (_this2.props.inlineEdit) {
                if (!column.cellEdit) {
                  var checkBoxValueParser = function checkBoxValueParser(rowIndex) {
                    return function () {
                      return !(_this2.getEditItemValue(rowIndex, col) || false);
                    };
                  };
                  column.cellEdit = function (rowIndex) {
                    return _react2.default.createElement(_reactCheckbox2.default, _extends({
                      checked: _this2.getEditItemValue(rowIndex, col) || false,
                      onChange: _this2.onEditCellValueChange(rowIndex, col, checkBoxValueParser(rowIndex)),
                      onBlur: _this2.onEditCellBlur(rowIndex, col),
                      onFocus: _this2.onCellFocus('edit', col.componentType, rowIndex, column.columnKey),
                      ref: _this2.handleEditCellRef(rowIndex, col)
                    }, col.filterComponentProps, {
                      tabIndex: tabIndex
                    }));
                  };
                }
                if (!column.cellCreate) {
                  var _checkBoxValueParser = function _checkBoxValueParser(rowIndex) {
                    return function () {
                      return !(_this2.getCreateItemValue(rowIndex, col) || false);
                    };
                  };
                  column.cellCreate = function (rowIndex) {
                    return _react2.default.createElement(_reactCheckbox2.default, _extends({
                      checked: _this2.getCreateItemValue(rowIndex, col) || false,
                      onChange: _this2.onCreateCellValueChange(rowIndex, col, _checkBoxValueParser(rowIndex)),
                      onBlur: _this2.onCreateCellBlur(rowIndex, col),
                      inputRef: _this2.handleCreateCellRef(rowIndex, col)
                    }, col.filterComponentProps, {
                      tabIndex: tabIndex
                    }));
                  };
                }
              }
              if (_this2.props.filtering) {
                if (!column.cellFilter) {
                  column.cellFilter = function () {
                    return _react2.default.createElement(_reactFloatingSelect.FloatingSelect, _extends({
                      name: col.valueKeyPath.join() + '-filter',
                      options: _selectOptions2,
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
                    }, _selectTranslations2));
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

  this.handleRowHeightGetter = function (rowIndex) {
    return _this2.props.rowHeightGetter(_this2.props.data.get(rowIndex), rowIndex);
  };

  this.renderCell = function (col) {
    return function (cellProps) {
      var _props3 = _this2.props,
          isCreating = _props3.isCreating,
          isEditing = _props3.isEditing,
          createData = _props3.createData,
          selectedCell = _props3.selectedCell,
          grid = _props3.grid;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbImRhdGFncmlkQWN0aW9ucyIsIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwib3duUHJvcHMiLCJHUklEIiwiZ3JpZCIsImlzQnVzeSIsImRhdGFncmlkIiwiZ2V0SW4iLCJpZCIsImlzRWRpdGluZyIsImlzQ3JlYXRpbmciLCJpc0ZpbHRlcmluZyIsImlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW4iLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwidmlzaWJsZUNvbHVtbnMiLCJjb2x1bW5XaWR0aHMiLCJzZWxlY3RlZENlbGwiLCJzZWxlY3RlZEl0ZW1zIiwiZGF0YSIsImVkaXREYXRhIiwiY3JlYXRlRGF0YSIsImZpbHRlckRhdGEiLCJjZWxsTWVzc2FnZXMiLCJjcmVhdGVDZWxsTWVzc2FnZXMiLCJhbGxEYXRhU2l6ZSIsInNpemUiLCJsYW5ndWFnZSIsIlV0aWxzIiwiZ2V0TGFuZ3VhZ2UiLCJ1c2VyIiwicmVnaW9uIiwiZ2V0UmVnaW9uIiwiZGF0ZUZvcm1hdCIsImdldERhdGVGb3JtYXQiLCJ0aG91c2FuZFNlcGFyYXRvciIsImdldFRob3VzYW5kU2VwYXJhdG9yIiwiZGVjaW1hbFNlcGFyYXRvciIsImdldERlY2ltYWxTZXBhcmF0b3IiLCJmb3JjZVJlZnJlc2hUaW1lc3RhbXAiLCJnZXQiLCJmb2N1c1R5cGUiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJEYXRhR3JpZCIsImluamVjdEludGwiLCJwcm9wcyIsImN1cnJlbnRSb3ciLCJjdXJyZW50Q29sdW1uIiwiY2VsbFJlZnMiLCJmb2N1c1RvQ3JlYXRlQ2VsbCIsImZvY3VzVG9FZGl0Q2VsbCIsImZvY3VzVG9FcnJvckNlbGwiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImRvY3VtZW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIm9uRG9jdW1lbnRDbGljayIsImludmFsaWRhdGUiLCJyZW5kZXIiLCJncmlkQ2xhc3NOYW1lIiwiaW5saW5lRWRpdCIsImRpc2FibGVBY3Rpb25CYXIiLCJjbGFzc05hbWUiLCJzZXRGb2N1c1RvIiwiYWN0aW9uQmFyIiwiYWN0aW9uQmFyUmlnaHQiLCJhY3Rpb25CYXJMZWZ0IiwiZmlsdGVyaW5nIiwicmVtb3ZpbmciLCJkaXNhYmxlRHJvcGRvd24iLCJkaXNhYmxlRmlsdGVyaW5nQ29udHJvbHMiLCJoYW5kbGVBZnRlckFkZEl0ZW0iLCJoYW5kbGVBZnRlckVkaXRQcmVzcyIsImhhbmRsZUFmdGVyVmFsaWRhdGlvbkVycm9yIiwiZHJvcGRvd25NZW51SXRlbXMiLCJjb2x1bW5TZXR0aW5ncyIsImdyaWRIZWFkZXIiLCJyb3dzQ291bnQiLCJjb250YWluZXJTdHlsZSIsImNvbnRleHRNZW51T3BlbiIsInJlbmRlckNvbnRleHRNZW51IiwiaGVhZGVySGVpZ2h0IiwiZmlsdGVyUm93SGVpZ2h0Iiwicm93SGVpZ2h0Iiwib25Db2x1bW5SZXNpemVFbmRDYWxsYmFjayIsImhhbmRsZVJvd0NsaWNrIiwic2Nyb2xsVG9Db2x1bW4iLCJzY3JvbGxUb3AiLCJnZXRTY3JvbGxUb1JvdyIsIm9uUm93RG91YmxlQ2xpY2siLCJvbk1vdXNlRG93biIsIm9uUm93TW91c2VFbnRlciIsIm9uUm93TW91c2VMZWF2ZSIsIm9uU2Nyb2xsU3RhcnQiLCJvblNjcm9sbEVuZCIsImdldFJvd0NsYXNzTmFtZSIsInJvd0hlaWdodEdldHRlciIsImhhbmRsZVJvd0hlaWdodEdldHRlciIsIm9uQ29udGVudEhlaWdodENoYW5nZSIsImhhbmRsZUNvbnRleHRNZW51IiwicmVuZGVyQ29sdW1ucyIsImNvbHVtbnMiLCJjbG9zZUNvbHVtblNldHRpbmdzTW9kYWwiLCJzYXZlQ29sdW1uU2V0dGluZ3MiLCJjaGlsZHJlbiIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyIsImNvbnRleHRNZW51SXRlbXMiLCJzZXRTdGF0ZSIsIm5ld0NvbHVtbldpZHRoIiwiY29sdW1uS2V5IiwicmVzaXplQ29sdW1uIiwib25DcmVhdGVDZWxsS2V5RG93biIsImUiLCJrZXlDb2RlIiwiS0VZX0NPREVTIiwiRU5URVIiLCJhZGROZXdJdGVtIiwiZ2V0Q29sdW1uRGVmYXVsdFZhbHVlcyIsIm9uRWRpdENlbGxLZXlEb3duIiwiY29sIiwicm93SW5kZXgiLCJlbmFibGVBcnJvd05hdmlnYXRpb24iLCJyb3dzU2l6ZSIsImdldENvbHVtbktleSIsIkRPV04iLCJ2YWx1ZVR5cGUiLCJuZXh0RWxlbWVudCIsIm1vdmVDZWxsRm9jdXMiLCJVUCIsIlRBQiIsIlJJR0hUIiwiTEVGVCIsInByZXZlbnREZWZhdWx0IiwiY29sdW1uSW5kIiwiZmluZEluZGV4IiwiYyIsInZhbHVlS2V5UGF0aCIsImpvaW4iLCJkaXNhYmxlZCIsInJvd0luZCIsInNoaWZ0S2V5IiwibGVuZ3RoIiwibmV4dENvbHVtbktleSIsIm9uRmlsdGVyQ2VsbFZhbHVlQ2hhbmdlIiwidmFsdWVQYXJzZXIiLCJldmVudE9yRGF0YSIsInJhd1ZhbHVlIiwidGFyZ2V0IiwidW5kZWZpbmVkIiwidmFsdWUiLCJmaWx0ZXJDZWxsVmFsdWVDaGFuZ2UiLCJvbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSIsImNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSIsIm9uQ3JlYXRlVmFsdWVDaGFuZ2UiLCJvblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZSIsIm1hdGNoVmFsdWUiLCJuZXdWYWx1ZUtleVBhdGgiLCJ2IiwibmV3VmFsdWUiLCJ2YWxpZGF0b3JzIiwiY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUiLCJvbkVkaXRDZWxsVmFsdWVDaGFuZ2UiLCJkYXRhSWQiLCJnZXREYXRhSWRCeVJvd0luZGV4IiwiZWRpdENlbGxWYWx1ZUNoYW5nZSIsIm9uRWRpdFZhbHVlQ2hhbmdlIiwiZWRpdENlbGxWYWx1ZVZhbGlkYXRlIiwib25DcmVhdGVDZWxsQmx1ciIsIm9uQ3JlYXRlQmx1ciIsImdldEVkaXRJdGVtVmFsdWUiLCJvbkVkaXRDZWxsQmx1ciIsIm9uRWRpdEJsdXIiLCJvbkNlbGxGb2N1cyIsImNlbGxUeXBlIiwiaW5wdXRUeXBlIiwic2VsZWN0IiwiY2VsbFNlbGVjdCIsImNlbGxTZWxlY3Rpb25DaGFuZ2UiLCJpZEtleVBhdGgiLCJnZXRTZWxlY3RlZEl0ZW1JbmRleCIsImluZGV4IiwiZWRpdFZhbHVlIiwib3JpZ2luYWxWYWx1ZSIsImNvbXBvbmVudFR5cGUiLCJTdHJpbmciLCJyZXBsYWNlIiwiZ2V0Q3JlYXRlSXRlbVZhbHVlIiwidmFsIiwiZ2V0RmlsdGVySXRlbVZhbHVlIiwiZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZSIsIm1vZGUiLCJjb21wb25lbnREaXNhYmxlZCIsImRpc2FibGVFZGl0aW5nIiwiZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2giLCJtYXRjaFZhbHVlS2V5UGF0aCIsInJvd0NsYXNzTmFtZXMiLCJleHRyYVJvd0NvdW50IiwicHVzaCIsImluZGV4T2YiLCJyb3dDbGFzc05hbWVHZXR0ZXIiLCJnZXRDZWxsTWVzc2FnZXMiLCJyZXR1cm5EYXRhIiwiaW5mb01lc3NhZ2UiLCJlcnJvck1lc3NhZ2UiLCJ3YXJuaW5nTWVzc2FnZSIsInNjcm9sbFRvUm93Iiwic2Nyb2xsTmV3Um93IiwiZmlyc3QiLCJmb2N1c1RvIiwicHJldkZvY3VzVG8iLCJmb2N1c1RvTGFzdFJvdyIsImhhbmRsZUNlbGxTZWxlY3QiLCJoYW5kbGVDcmVhdGVDZWxsUmVmIiwicmVmIiwiZm9jdXMiLCJoYW5kbGVFZGl0Q2VsbFJlZiIsInNlbGVjdGVkUm93SW5kZXgiLCJjb2x1bW5JbmRleCIsInR5cGUiLCJzZXRUaW1lb3V0IiwiaGFuZGxlU2VsZWN0aW9uQ2hlY2tCb3hPbkNoYW5nZSIsIml0ZW1TZWxlY3Rpb25DaGFuZ2UiLCJnZW5lcmF0ZUNvbHVtbnMiLCJleHRyYUNvbHVtbiIsInRhYkluZGV4Iiwid2lkdGgiLCJpc1Jlc2l6YWJsZSIsImlzU29ydGFibGUiLCJjZWxsIiwidmFsdWVSZW5kZXIiLCJjZWxsRWRpdCIsImNlbGxDcmVhdGUiLCJjZWxsRmlsdGVyIiwicm93U2VsZWN0Q2hlY2tib3hDb2x1bW4iLCJyb3dJdGVtIiwiaXRlbUlkIiwic2VsZWN0ZWQiLCJpbmNsdWRlcyIsImZvckVhY2giLCJ2aXNpYmxlQ29sdW1uS2V5Iiwib3JnQ29sIiwiY29sdW1uIiwiaGVhZGVyIiwibWluV2lkdGgiLCJtYXhXaWR0aCIsImRpc2FibGVSZXNpemluZyIsImZpeGVkIiwiYWxsb3dDZWxsc1JlY3ljbGluZyIsImRpc2FibGVTb3J0aW5nIiwiaXNSZXF1aXJlZCIsInN0eWxlIiwiZ2V0Q2VsbFN0eWxlQnlDb2wiLCJmbGV4R3JvdyIsInNvcnRDb21wYXJhdG9yIiwic29ydFZhbHVlR2V0dGVyIiwidmFsdWVFbXB0eUNoZWNrZXIiLCJnZXRWYWx1ZUVtcHR5Q2hlY2tlciIsImZvcm1hdCIsInJlbmRlckNvbXBvbmVudFByb3BzIiwiY3VycmVuY3lLZXlQYXRoIiwidmFsdWVPcHRpb25zIiwiY3VycmVuY3kiLCJkZWNpbWFscyIsImlzVmFsaWQiLCJtb21lbnQiLCJ1dGMiLCJlZGl0VmFsdWVSZW5kZXIiLCJjcmVhdGVWYWx1ZVJlbmRlciIsImZpbHRlclZhbHVlUmVuZGVyIiwiZWRpdFZhbHVlUGFyc2VyIiwiZWRpdENvbXBvbmVudFByb3BzIiwiY3JlYXRlQ29tcG9uZW50UHJvcHMiLCJmaWx0ZXJDb21wb25lbnRQcm9wcyIsIlJlZ0V4cCIsImludGwiLCJzZWxlY3RPcHRpb25zIiwic2VsZWN0Q29tcG9uZW50T3B0aW9ucyIsInNlbGVjdFRyYW5zbGF0aW9ucyIsInNlbGVjdENvbXBvbmVudFRyYW5zbGF0aW9ucyIsInBsYWNlaG9sZGVyIiwiZm9ybWF0TWVzc2FnZSIsIm5vUmVzdWx0c1RleHQiLCJlZGl0U2VsZWN0T3B0aW9uc01vZCIsInNsaWNlIiwiY3JlYXRlU2VsZWN0T3B0aW9uc01vZCIsImZpbHRlclNlbGVjdE9wdGlvbnNNb2QiLCJvbktleURvd24iLCJvbkJsdXIiLCJvbkZvY3VzIiwibGFiZWwiLCJjaGVja0JveFZhbHVlUGFyc2VyIiwicmVtb3ZlTmV3SXRlbSIsImlzQ2VsbEVkaXRlZCIsInJvd1NlbGVjdCIsImN0cmxLZXkiLCJnZXRTZWxlY3Rpb24iLCJyZW1vdmVBbGxSYW5nZXMiLCJwYXJlbnROb2RlIiwicGFyZW50MWNsYXNzIiwicGFyZW50MmNsYXNzIiwicGFyZW50M2NsYXNzIiwicGFyZW50NGNsYXNzIiwibXVsdGlTZWxlY3QiLCJvblJvd0NsaWNrIiwic3RvcFByb3BhZ2F0aW9uIiwiY29udGV4dE1lbnVYIiwiY2xpZW50WCIsImNvbnRleHRNZW51WSIsImNsaWVudFkiLCJhZGRFdmVudExpc3RlbmVyIiwiaGFuZGxlQ29udGV4dE1lbnVJdGVtQ2xpY2siLCJvbkNsaWNrIiwic2VsZWN0ZWREYXRhIiwicmVuZGVyQ2VsbCIsImNlbGxQcm9wcyIsImlzU3BlY2lhbCIsImdldFJvd0luZGV4IiwibWVzc2FnZURhdGEiLCJpc0VkaXRlZCIsInRleHRBbGlnbiIsImxlbmdodCIsIm1hcCIsInNvcnRDaGFuZ2UiLCJkaXNwbGF5IiwiekluZGV4IiwicG9zaXRpb24iLCJ0b3AiLCJsZWZ0IiwiZmlsdGVyIiwiZCIsIml0ZW0iLCJpIiwiZGl2aWRlciIsInRpdGxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O29EQUFBOzs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUtBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0lBQVlBLGU7O0FBQ1o7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUMsa0JBQWtCLFNBQWxCQSxlQUFrQixDQUFDQyxLQUFELEVBQVFDLFFBQVIsRUFBcUI7QUFDM0MsTUFBTUMsT0FBT0QsU0FBU0UsSUFBdEI7QUFDQSxTQUFPO0FBQ0xDLFlBQVFKLE1BQU1LLFFBQU4sQ0FBZUMsS0FB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U0FERjtBQWdCRCxPQXJCNkM7QUFEaEQsS0FERjtBQTBCRCxHOztrQkEzM0NrQjNHLFEiLCJmaWxlIjoiZGF0YWdyaWQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tbG9uZWx5LWlmLCBwcmVmZXItdGVtcGxhdGUsIHJlYWN0L3JlcXVpcmUtZGVmYXVsdC1wcm9wcyAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IE1hcCwgTGlzdCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHtcbiAgaW5qZWN0SW50bCxcbiAgRm9ybWF0dGVkTWVzc2FnZSBhcyBNLFxuICBGb3JtYXR0ZWROdW1iZXIgYXMgTixcbn0gZnJvbSAncmVhY3QtaW50bCc7XG5pbXBvcnQgeyBDb2x1bW4sIENlbGwgfSBmcm9tICdmaXhlZC1kYXRhLXRhYmxlLTInO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wsIE1lbnVJdGVtIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgRmxvYXRpbmdTZWxlY3QgfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1mbG9hdGluZy1zZWxlY3QnO1xuaW1wb3J0IHsgRGF0ZUlucHV0IH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtZGF0ZXRpbWUnO1xuaW1wb3J0IHsgSWNvbiB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWljb25zJztcbmltcG9ydCBGYUNoZWNrIGZyb20gJ3JlYWN0LWljb25zL2xpYi9mYS9jaGVjayc7XG5pbXBvcnQgeyBTcGlubmVyIH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3Qtc3Bpbm5lcic7XG5pbXBvcnQgQ2hlY2tib3ggZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtY2hlY2tib3gnO1xuaW1wb3J0IHsgZm9ybWF0Q3VycmVuY3lBbW91bnQgfSBmcm9tICdAb3B1c2NhcGl0YS9mb3JtYXQtdXRpbHMnO1xuaW1wb3J0ICdmaXhlZC1kYXRhLXRhYmxlLTIvZGlzdC9maXhlZC1kYXRhLXRhYmxlLmNzcyc7XG5cbmltcG9ydCBSZXNwb25zaXZlRml4ZWREYXRhVGFibGUgZnJvbSAnLi9yZXNwb25zaXZlLWZpeGVkLWRhdGEtdGFibGUuY29tcG9uZW50JztcbmltcG9ydCBIZWFkZXJDZWxsIGZyb20gJy4vaGVhZGVyLWNlbGwuY29tcG9uZW50JztcbmltcG9ydCBBY3Rpb25CYXIgZnJvbSAnLi9hY3Rpb24tYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgSW5saW5lRWRpdENvbnRyb2xzIGZyb20gJy4vaW5saW5lLWVkaXQtY29udHJvbHMuY29tcG9uZW50JztcbmltcG9ydCBGaWx0ZXJpbmdDb250cm9scyBmcm9tICcuL2ZpbHRlcmluZy1jb250cm9scy5jb21wb25lbnQnO1xuaW1wb3J0IERyb3Bkb3duQ29udHJvbHMgZnJvbSAnLi9kcm9wZG93bi1jb250cm9scy5jb21wb25lbnQnO1xuaW1wb3J0ICogYXMgZGF0YWdyaWRBY3Rpb25zIGZyb20gJy4vZGF0YWdyaWQuYWN0aW9ucyc7XG5pbXBvcnQgQ2VsbFRvb2x0aXAgZnJvbSAnLi9jZWxsLXRvb2x0aXAuY29tcG9uZW50JztcbmltcG9ydCBDb2x1bW5TZXR0aW5nc01vZGFsIGZyb20gJy4vY29sdW1uLXNldHRpbmdzL2NvbHVtbi1zZXR0aW5ncy5jb21wb25lbnQnO1xuaW1wb3J0IHsgcHJvcFR5cGVzLCBkZWZhdWx0UHJvcHMgfSBmcm9tICcuL2RhdGFncmlkLnByb3BzJztcbmltcG9ydCB7IEtFWV9DT0RFUyB9IGZyb20gJy4vZGF0YWdyaWQuY29uc3RhbnRzJztcbmltcG9ydCBVdGlscyBmcm9tICcuL2RhdGFncmlkLnV0aWxzJztcbmltcG9ydCAnLi9kYXRhZ3JpZC5jb21wb25lbnQuc2Nzcyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSwgb3duUHJvcHMpID0+IHtcbiAgY29uc3QgR1JJRCA9IG93blByb3BzLmdyaWQ7XG4gIHJldHVybiB7XG4gICAgaXNCdXN5OiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnaXNCdXN5J10sIHRydWUpLFxuICAgIGlzRWRpdGluZzogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2lzRWRpdGluZyddLCBmYWxzZSksXG4gICAgaXNDcmVhdGluZzogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2lzQ3JlYXRpbmcnXSwgZmFsc2UpLFxuICAgIGlzRmlsdGVyaW5nOlxuICAgICAgc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdpc0ZpbHRlcmluZyddLCBmYWxzZSksXG4gICAgaXNDb2x1bW5TZXR0aW5nc01vZGFsT3BlbjpcbiAgICAgIHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdjb2x1bW5TZXR0aW5nc01vZGFsJywgJ29wZW4nXSwgZmFsc2UpLFxuICAgIHNvcnRDb2x1bW46IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ3NvcnRpbmdEYXRhJywgJ3NvcnRDb2x1bW4nXSwgbnVsbCksXG4gICAgc29ydE9yZGVyOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdzb3J0aW5nRGF0YScsICdzb3J0T3JkZXInXSwgbnVsbCksXG4gICAgdmlzaWJsZUNvbHVtbnM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ3Zpc2libGVDb2x1bW5zJ10sIExpc3QoKSksXG4gICAgY29sdW1uV2lkdGhzOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdjb2x1bW5XaWR0aHMnXSwgTWFwKCkpLFxuICAgIHNlbGVjdGVkQ2VsbDogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZWxlY3RlZENlbGwnXSwgTWFwKCkpLFxuICAgIHNlbGVjdGVkSXRlbXM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2VsZWN0ZWRJdGVtcyddLCBMaXN0KCkpLFxuICAgIGRhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnZGF0YSddLCBMaXN0KCkpLFxuICAgIGVkaXREYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2VkaXREYXRhJ10sIE1hcCgpKSxcbiAgICBjcmVhdGVEYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NyZWF0ZURhdGEnXSwgTGlzdCgpKSxcbiAgICBmaWx0ZXJEYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2ZpbHRlckRhdGEnXSwgTWFwKCkpLFxuICAgIGNlbGxNZXNzYWdlczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjZWxsTWVzc2FnZXMnXSwgTWFwKCkpLFxuICAgIGNyZWF0ZUNlbGxNZXNzYWdlczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjcmVhdGVDZWxsTWVzc2FnZXMnXSwgTWFwKCkpLFxuICAgIGFsbERhdGFTaXplOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2FsbERhdGEnXSwgTGlzdCgpKS5zaXplLFxuICAgIGxhbmd1YWdlOiBVdGlscy5nZXRMYW5ndWFnZShHUklELCBzdGF0ZS51c2VyKSxcbiAgICByZWdpb246IFV0aWxzLmdldFJlZ2lvbihHUklELCBzdGF0ZS51c2VyKSxcbiAgICBkYXRlRm9ybWF0OiBVdGlscy5nZXREYXRlRm9ybWF0KEdSSUQsIHN0YXRlLnVzZXIpLFxuICAgIHRob3VzYW5kU2VwYXJhdG9yOiBVdGlscy5nZXRUaG91c2FuZFNlcGFyYXRvcihHUklELCBzdGF0ZS51c2VyKSxcbiAgICBkZWNpbWFsU2VwYXJhdG9yOiBVdGlscy5nZXREZWNpbWFsU2VwYXJhdG9yKEdSSUQsIHN0YXRlLnVzZXIpLFxuICAgIGZvcmNlUmVmcmVzaFRpbWVzdGFtcDogc3RhdGUuZGF0YWdyaWQuZ2V0KCdmb3JjZVJlZnJlc2gnLCAwKSwgLy8gZm9yY2UgcmUtcmVuZGVyIHdoZW4gY2hhbmdlZFxuICAgIGZvY3VzVHlwZTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2ZvY3VzVHlwZSddLCBNYXAoKSksXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkYXRhZ3JpZEFjdGlvbnM7XG5cbkBpbmplY3RJbnRsXG5AY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcylcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGFHcmlkIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSBwcm9wVHlwZXM7XG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGN1cnJlbnRSb3c6IDAsXG4gICAgICBjdXJyZW50Q29sdW1uOiAwLFxuICAgIH07XG4gICAgdGhpcy5jZWxsUmVmcyA9IHt9O1xuICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgPSBmYWxzZTtcbiAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IGZhbHNlOyAvLyBUT0RPOiBIYW5kbGUgZm9jdXNpbmcgd2hlbiB0cnVlXG4gICAgdGhpcy5mb2N1c1RvRXJyb3JDZWxsID0gZmFsc2U7IC8vIFRPRE86IEhhbmRsZSBmb2N1c2luZyB3aGVuIHRydWVcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkRvY3VtZW50Q2xpY2spO1xuICAgIHRoaXMucHJvcHMuaW52YWxpZGF0ZSh0aGlzLnByb3BzLmdyaWQpO1xuICB9XG5cbiAgb25Eb2N1bWVudENsaWNrID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmNvbnRleHRNZW51SXRlbXMpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjb250ZXh0TWVudU9wZW46IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkRvY3VtZW50Q2xpY2spO1xuICB9XG5cbiAgb25Db2x1bW5SZXNpemVFbmRDYWxsYmFjayA9IChuZXdDb2x1bW5XaWR0aCwgY29sdW1uS2V5KSA9PiB7XG4gICAgdGhpcy5wcm9wcy5yZXNpemVDb2x1bW4odGhpcy5wcm9wcy5ncmlkLCBjb2x1bW5LZXksIG5ld0NvbHVtbldpZHRoKTtcbiAgfVxuXG4gIG9uQ3JlYXRlQ2VsbEtleURvd24gPSAoZSkgPT4ge1xuICAgIGlmIChlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5FTlRFUikge1xuICAgICAgdGhpcy5wcm9wcy5hZGROZXdJdGVtKHRoaXMucHJvcHMuZ3JpZCwgVXRpbHMuZ2V0Q29sdW1uRGVmYXVsdFZhbHVlcyh0aGlzLnByb3BzLmNvbHVtbnMpKTtcbiAgICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIG9uRWRpdENlbGxLZXlEb3duID0gKGNvbCwgcm93SW5kZXgpID0+IChlKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuZW5hYmxlQXJyb3dOYXZpZ2F0aW9uKSB7XG4gICAgICBjb25zdCB7IGNvbHVtbnMgfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCByb3dzU2l6ZSA9IHRoaXMucHJvcHMuZGF0YS5zaXplO1xuICAgICAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCk7XG4gICAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuICAgICAgICBjYXNlIEtFWV9DT0RFUy5ET1dOOiB7XG4gICAgICAgICAgaWYgKGNvbC52YWx1ZVR5cGUgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBjb25zdCBuZXh0RWxlbWVudCA9IHRoaXMuY2VsbFJlZnNbYCR7dGhpcy5wcm9wcy5ncmlkLmlkfV8ke2NvbHVtbktleX1fJHtyb3dJbmRleCArIDF9YF07XG4gICAgICAgICAgICB0aGlzLm1vdmVDZWxsRm9jdXMobmV4dEVsZW1lbnQsIHJvd0luZGV4ICsgMSwgLTEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5VUDoge1xuICAgICAgICAgIGlmIChjb2wudmFsdWVUeXBlICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgY29uc3QgbmV4dEVsZW1lbnQgPSB0aGlzLmNlbGxSZWZzW2Ake3RoaXMucHJvcHMuZ3JpZC5pZH1fJHtjb2x1bW5LZXl9XyR7cm93SW5kZXggLSAxfWBdO1xuICAgICAgICAgICAgdGhpcy5tb3ZlQ2VsbEZvY3VzKG5leHRFbGVtZW50LCByb3dJbmRleCAtIDEsIC0xKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuVEFCOlxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5SSUdIVDpcbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuTEVGVDoge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBsZXQgY29sdW1uSW5kID0gY29sdW1ucy5maW5kSW5kZXgoYyA9PiBjLnZhbHVlS2V5UGF0aC5qb2luKCcvJykgPT09IGNvbHVtbktleSk7XG4gICAgICAgICAgaWYgKGNvbHVtbkluZCAhPT0gLTEpIHtcbiAgICAgICAgICAgIGxldCBkaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICBsZXQgbmV4dEVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgbGV0IHJvd0luZCA9IHJvd0luZGV4O1xuICAgICAgICAgICAgd2hpbGUgKGRpc2FibGVkKSB7XG4gICAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5MRUZUIHx8IChlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5UQUIgJiYgZS5zaGlmdEtleSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29sdW1uSW5kIC0gMSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgLT0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJvd0luZCAtIDEgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kID0gY29sdW1ucy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgICAgcm93SW5kIC09IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoY29sdW1uSW5kICsgMSA8IGNvbHVtbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgKz0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJvd0luZCArIDEgPCByb3dzU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kID0gMDtcbiAgICAgICAgICAgICAgICAgIHJvd0luZCArPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29uc3QgbmV4dENvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2x1bW5zW2NvbHVtbkluZF0pO1xuICAgICAgICAgICAgICBuZXh0RWxlbWVudCA9IHRoaXMuY2VsbFJlZnNbYCR7dGhpcy5wcm9wcy5ncmlkLmlkfV8ke25leHRDb2x1bW5LZXl9XyR7cm93SW5kfWBdO1xuICAgICAgICAgICAgICBkaXNhYmxlZCA9IG5leHRFbGVtZW50ID8gbmV4dEVsZW1lbnQuZGlzYWJsZWQgOiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZGlzYWJsZWQgJiYgbmV4dEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgdGhpcy5tb3ZlQ2VsbEZvY3VzKG5leHRFbGVtZW50LCByb3dJbmQsIGNvbHVtbkluZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UgPSAoY29sLCB2YWx1ZVBhcnNlcikgPT4gKGV2ZW50T3JEYXRhKSA9PiB7XG4gICAgbGV0IHJhd1ZhbHVlO1xuICAgIC8vIGV2ZW50T3JEYXRhIGNhbiBiZSBpbnB1dCBvbkNoYW5nZSBldmVudCwgcmVhY3Qtc2VsZWN0IG9uQ2hhbmdlIG9yIHJlYWN0LWRheS1waWNrZXIgb25DaGFuZ2VcbiAgICBpZiAoZXZlbnRPckRhdGEpIHtcbiAgICAgIGlmIChldmVudE9yRGF0YS50YXJnZXQgIT09IHVuZGVmaW5lZCkgcmF3VmFsdWUgPSBldmVudE9yRGF0YS50YXJnZXQudmFsdWU7XG4gICAgICBlbHNlIGlmIChldmVudE9yRGF0YS52YWx1ZSAhPT0gdW5kZWZpbmVkKSByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnZhbHVlO1xuICAgICAgZWxzZSByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhO1xuICAgIH1cbiAgICBjb25zdCB2YWx1ZSA9IHZhbHVlUGFyc2VyKHJhd1ZhbHVlKTtcbiAgICB0aGlzLnByb3BzLmZpbHRlckNlbGxWYWx1ZUNoYW5nZShcbiAgICAgIHRoaXMucHJvcHMuZ3JpZCxcbiAgICAgIHRoaXMucHJvcHMuY29sdW1ucyxcbiAgICAgIGNvbCxcbiAgICAgIHZhbHVlLFxuICAgICk7XG4gIH1cblxuICBvbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGV2ZW50T3JEYXRhKSA9PiB7XG4gICAgbGV0IHJhd1ZhbHVlO1xuICAgIC8vIGV2ZW50T3JEYXRhIGNhbiBiZSBpbnB1dCBvbkNoYW5nZSBldmVudCwgcmVhY3Qtc2VsZWN0IG9uQ2hhbmdlIG9yIHJlYWN0LWRheS1waWNrZXIgb25DaGFuZ2VcbiAgICBpZiAoZXZlbnRPckRhdGEpIHtcbiAgICAgIGlmIChldmVudE9yRGF0YS50YXJnZXQgIT09IHVuZGVmaW5lZCkgcmF3VmFsdWUgPSBldmVudE9yRGF0YS50YXJnZXQudmFsdWU7XG4gICAgICBlbHNlIGlmIChldmVudE9yRGF0YS52YWx1ZSAhPT0gdW5kZWZpbmVkKSByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnZhbHVlO1xuICAgICAgZWxzZSByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhO1xuICAgIH1cbiAgICBjb25zdCB2YWx1ZSA9IHZhbHVlUGFyc2VyKHJhd1ZhbHVlKTtcbiAgICB0aGlzLnByb3BzLmNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIHJvd0luZGV4LCBjb2wudmFsdWVLZXlQYXRoLCB2YWx1ZSk7XG4gICAgaWYgKGNvbC5vbkNyZWF0ZVZhbHVlQ2hhbmdlKSB7XG4gICAgICBjb2wub25DcmVhdGVWYWx1ZUNoYW5nZSh2YWx1ZSwgY29sLnZhbHVlS2V5UGF0aCwgcm93SW5kZXgpO1xuICAgIH1cbiAgICBpZiAoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlICYmIHZhbHVlID09PSBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubWF0Y2hWYWx1ZSkge1xuICAgICAgLy8gQ2FsbCBzcGVjaWFsIHBhaXJlZCB2YWx1ZSBjaGFuZ2Ugb24gb3RoZXIgY2VsbCBpZiB2YWx1ZSBtYXRjaGVzXG4gICAgICB0aGlzLm9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlKFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgeyB2YWx1ZUtleVBhdGg6IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5uZXdWYWx1ZUtleVBhdGggfSxcbiAgICAgICAgdiA9PiB2LFxuICAgICAgKShjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY29sLnZhbGlkYXRvcnMpIHtcbiAgICAgIHRoaXMucHJvcHMuY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUoXG4gICAgICAgIHRoaXMucHJvcHMuZ3JpZCxcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIGNvbC52YWx1ZUtleVBhdGgsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBjb2wudmFsaWRhdG9ycyxcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgb25FZGl0Q2VsbFZhbHVlQ2hhbmdlID0gKHJvd0luZGV4LCBjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZXZlbnRPckRhdGEpID0+IHtcbiAgICBjb25zdCBkYXRhSWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgIGxldCByYXdWYWx1ZTtcbiAgICAvLyBldmVudE9yRGF0YSBjYW4gYmUgaW5wdXQgb25DaGFuZ2UgZXZlbnQsIHJlYWN0LXNlbGVjdCBvbkNoYW5nZSBvciByZWFjdC1kYXktcGlja2VyIG9uQ2hhbmdlXG4gICAgaWYgKGV2ZW50T3JEYXRhKSB7XG4gICAgICBpZiAoZXZlbnRPckRhdGEudGFyZ2V0ICE9PSB1bmRlZmluZWQpIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlO1xuICAgICAgZWxzZSBpZiAoZXZlbnRPckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkgcmF3VmFsdWUgPSBldmVudE9yRGF0YS52YWx1ZTtcbiAgICAgIGVsc2UgcmF3VmFsdWUgPSBldmVudE9yRGF0YTtcbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSB2YWx1ZVBhcnNlcihyYXdWYWx1ZSk7XG4gICAgdGhpcy5wcm9wcy5lZGl0Q2VsbFZhbHVlQ2hhbmdlKHRoaXMucHJvcHMuZ3JpZCwgZGF0YUlkLCBjb2wudmFsdWVLZXlQYXRoLCB2YWx1ZSk7XG4gICAgaWYgKGNvbC5vbkVkaXRWYWx1ZUNoYW5nZSkge1xuICAgICAgY29sLm9uRWRpdFZhbHVlQ2hhbmdlKHZhbHVlLCBjb2wudmFsdWVLZXlQYXRoLCByb3dJbmRleCwgZGF0YUlkKTtcbiAgICB9XG4gICAgaWYgKGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZSAmJiB2YWx1ZSA9PT0gY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm1hdGNoVmFsdWUpIHtcbiAgICAgIC8vIENhbGwgc3BlY2lhbCBwYWlyZWQgdmFsdWUgY2hhbmdlIG9uIG90aGVyIGNlbGwgaWYgdmFsdWUgbWF0Y2hlc1xuICAgICAgdGhpcy5vbkVkaXRDZWxsVmFsdWVDaGFuZ2UoXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICB7IHZhbHVlS2V5UGF0aDogY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm5ld1ZhbHVlS2V5UGF0aCB9LFxuICAgICAgICB2ID0+IHYsXG4gICAgICApKGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5uZXdWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjb2wudmFsaWRhdG9ycykge1xuICAgICAgdGhpcy5wcm9wcy5lZGl0Q2VsbFZhbHVlVmFsaWRhdGUoXG4gICAgICAgIHRoaXMucHJvcHMuZ3JpZCxcbiAgICAgICAgZGF0YUlkLFxuICAgICAgICBjb2wudmFsdWVLZXlQYXRoLFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgY29sLnZhbGlkYXRvcnMsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIG9uQ3JlYXRlQ2VsbEJsdXIgPSAocm93SW5kZXgsIGNvbCwgdmFsdWVQYXJzZXIpID0+IChlKSA9PiB7XG4gICAgaWYgKGNvbC5vbkNyZWF0ZUJsdXIpIHtcbiAgICAgIGxldCB2YWx1ZSA9IChlICYmIGUudGFyZ2V0ICYmIGUudGFyZ2V0LnZhbHVlICE9PSB1bmRlZmluZWQpID9cbiAgICAgICAgZS50YXJnZXQudmFsdWUgOlxuICAgICAgICB0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCk7XG4gICAgICBpZiAodmFsdWVQYXJzZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlUGFyc2VyKHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGNvbC5vbkNyZWF0ZUJsdXIodmFsdWUsIHJvd0luZGV4KTtcbiAgICB9XG4gIH1cblxuICBvbkVkaXRDZWxsQmx1ciA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGUpID0+IHtcbiAgICBpZiAoY29sLm9uRWRpdEJsdXIpIHtcbiAgICAgIGxldCB2YWx1ZSA9IChlICYmIGUudGFyZ2V0ICYmIGUudGFyZ2V0LnZhbHVlICE9PSB1bmRlZmluZWQpID9cbiAgICAgICAgZS50YXJnZXQudmFsdWUgOlxuICAgICAgICB0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCk7XG4gICAgICBpZiAodmFsdWVQYXJzZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlUGFyc2VyKHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGRhdGFJZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgICBjb2wub25FZGl0Qmx1cih2YWx1ZSwgcm93SW5kZXgsIGRhdGFJZCk7XG4gICAgfVxuICB9XG5cbiAgb25DZWxsRm9jdXMgPSAoY2VsbFR5cGUsIGlucHV0VHlwZSwgcm93SW5kZXgsIGNvbHVtbktleSkgPT4gKGUpID0+IHtcbiAgICBpZiAoaW5wdXRUeXBlID09PSAnbnVtYmVyJykge1xuICAgICAgZS50YXJnZXQuc2VsZWN0KCk7XG4gICAgfVxuICAgIGlmIChjZWxsVHlwZSA9PT0gJ2VkaXQnICYmIHRoaXMucHJvcHMuY2VsbFNlbGVjdCkge1xuICAgICAgdGhpcy5wcm9wcy5jZWxsU2VsZWN0aW9uQ2hhbmdlKHRoaXMucHJvcHMuZ3JpZCwgTWFwKHsgcm93SW5kZXgsIGNvbHVtbktleSB9KSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0RGF0YUlkQnlSb3dJbmRleCA9IHJvd0luZGV4ID0+XG4gICAgdGhpcy5wcm9wcy5kYXRhLmdldEluKFtyb3dJbmRleCwgLi4udGhpcy5wcm9wcy5ncmlkLmlkS2V5UGF0aF0pO1xuXG4gIGdldFNlbGVjdGVkSXRlbUluZGV4ID0gKGlkKSA9PiB7XG4gICAgaWYgKCFpZCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMucHJvcHMuZGF0YS5maW5kSW5kZXgodiA9PiB2LmdldEluKHRoaXMucHJvcHMuZ3JpZC5pZEtleVBhdGgpID09PSBpZCk7XG4gICAgcmV0dXJuIGluZGV4ID09PSAtMSA/IHVuZGVmaW5lZCA6IGluZGV4O1xuICB9XG5cbiAgZ2V0RWRpdEl0ZW1WYWx1ZSA9IChyb3dJbmRleCwgY29sKSA9PiB7XG4gICAgLy8gR2V0IHRoZSB2YWx1ZSB0byBkaXNwbGF5IGluIGVkaXQgY2VsbFxuICAgIGNvbnN0IGlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICBjb25zdCBlZGl0VmFsdWUgPSB0aGlzLnByb3BzLmVkaXREYXRhLmdldEluKFtpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0sIHVuZGVmaW5lZCk7XG4gICAgbGV0IG9yaWdpbmFsVmFsdWU7XG4gICAgaWYgKGVkaXRWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBvcmlnaW5hbFZhbHVlID0gdGhpcy5wcm9wcy5kYXRhLmdldEluKFtyb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0sICcnKTtcbiAgICB9IGVsc2UgaWYgKGVkaXRWYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZWRpdFZhbHVlO1xuICAgIH1cbiAgICBpZiAob3JpZ2luYWxWYWx1ZSA9PT0gbnVsbCB8fCBvcmlnaW5hbFZhbHVlID09PSB1bmRlZmluZWQgfHwgb3JpZ2luYWxWYWx1ZSA9PT0gJycpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgLy8gU3BlY2lhbCBmb3JtYXR0aW5nIGJ5IGNvbXBvbmVudCB0eXBlXG4gICAgaWYgKFxuICAgICAgY29sLmNvbXBvbmVudFR5cGUgPT09ICdmbG9hdCcgJiZcbiAgICAgIFN0cmluZyhvcmlnaW5hbFZhbHVlKS5sZW5ndGggPiAwXG4gICAgKSB7XG4gICAgICByZXR1cm4gU3RyaW5nKG9yaWdpbmFsVmFsdWUpLnJlcGxhY2UoJy4nLCB0aGlzLnByb3BzLmRlY2ltYWxTZXBhcmF0b3IpO1xuICAgIH1cbiAgICByZXR1cm4gb3JpZ2luYWxWYWx1ZTtcbiAgfVxuXG4gIGdldENyZWF0ZUl0ZW1WYWx1ZSA9IChyb3dJbmRleCwgY29sKSA9PiB7XG4gICAgY29uc3QgdmFsID0gdGhpcy5wcm9wcy5jcmVhdGVEYXRhLmdldEluKFtyb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0sICcnKTtcbiAgICBpZiAodmFsID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHJldHVybiB2YWw7XG4gIH1cblxuICBnZXRGaWx0ZXJJdGVtVmFsdWUgPSAoY29sKSA9PiB7XG4gICAgY29uc3QgdmFsID0gdGhpcy5wcm9wcy5maWx0ZXJEYXRhLmdldChVdGlscy5nZXRDb2x1bW5LZXkoY29sKSwgJycpO1xuICAgIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgcmV0dXJuIHZhbDtcbiAgfVxuXG4gIGdldENvbXBvbmVudERpc2FibGVkU3RhdGUgPSAocm93SW5kZXgsIGNvbCwgbW9kZSkgPT4ge1xuICAgIGxldCBjb21wb25lbnREaXNhYmxlZCA9ICEhY29sLmRpc2FibGVFZGl0aW5nO1xuICAgIC8vIGNoZWNrIGlmIGNvbXBvbmVudCBpcyBkaXNhYmxlZCBieSBvdGhlciBjb2x1bW4gZGF0YVxuICAgIGlmICghY29tcG9uZW50RGlzYWJsZWQgJiYgY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoKSB7XG4gICAgICBpZiAobW9kZSA9PT0gJ2NyZWF0ZScpIHtcbiAgICAgICAgY29tcG9uZW50RGlzYWJsZWQgPSB0aGlzLmdldENyZWF0ZUl0ZW1WYWx1ZShcbiAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICB7IHZhbHVlS2V5UGF0aDogY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWVLZXlQYXRoIH0sXG4gICAgICAgICkgPT09IGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaC5tYXRjaFZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29tcG9uZW50RGlzYWJsZWQgPSB0aGlzLmdldEVkaXRJdGVtVmFsdWUoXG4gICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgeyB2YWx1ZUtleVBhdGg6IGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaC5tYXRjaFZhbHVlS2V5UGF0aCB9LFxuICAgICAgICApID09PSBjb2wuZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2gubWF0Y2hWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvbXBvbmVudERpc2FibGVkO1xuICB9XG5cbiAgZ2V0Um93Q2xhc3NOYW1lID0gKHJvd0luZGV4KSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZ3JpZCxcbiAgICAgIGlzQ3JlYXRpbmcsXG4gICAgICBpc0VkaXRpbmcsXG4gICAgICBjcmVhdGVEYXRhLFxuICAgICAgc2VsZWN0ZWRJdGVtcyxcbiAgICAgIGRhdGEsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgcm93Q2xhc3NOYW1lcyA9IFsnb2MtZGF0YWdyaWQtcm93J107XG4gICAgbGV0IGV4dHJhUm93Q291bnQgPSAwOyAvLyBob3cgbWFueSByb3dzIHRvIGlnbm9yZSBmcm9tIHRvcCwgbmV3ICsgZmlsdGVyIHJvd3NcbiAgICBpZiAoaXNDcmVhdGluZykgZXh0cmFSb3dDb3VudCA9IGNyZWF0ZURhdGEuc2l6ZTtcbiAgICBpZiAoaXNDcmVhdGluZykge1xuICAgICAgaWYgKHJvd0luZGV4IDw9IChleHRyYVJvd0NvdW50IC0gMSkpIHtcbiAgICAgICAgcm93Q2xhc3NOYW1lcy5wdXNoKCdvYy1kYXRhZ3JpZC1yb3ctbmV3Jyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc0VkaXRpbmcpIHtcbiAgICAgIHJvd0NsYXNzTmFtZXMucHVzaCgnb2MtZGF0YWdyaWQtcm93LWVkaXQnKTtcbiAgICB9XG5cblxuICAgIC8vIGNoZWNrIGlmIHJvdyBpcyBzZWxlY3RlZFxuICAgIGlmICgoIWlzQ3JlYXRpbmcgJiYgIWlzRWRpdGluZykgJiZcbiAgICAgICAgKHNlbGVjdGVkSXRlbXMgJiYgZ3JpZC5pZEtleVBhdGgpKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHNlbGVjdGVkSXRlbXMuaW5kZXhPZihkYXRhLmdldEluKFtyb3dJbmRleCAtIGV4dHJhUm93Q291bnQsIC4uLmdyaWQuaWRLZXlQYXRoXSkpICE9PSAtMVxuICAgICAgKSB7XG4gICAgICAgIHJvd0NsYXNzTmFtZXMucHVzaCgnaXMtc2VsZWN0ZWQnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5wcm9wcy5yb3dDbGFzc05hbWVHZXR0ZXIpIHtcbiAgICAgIHJldHVybiByb3dDbGFzc05hbWVzLmpvaW4oJyAnKSArICcgJyArIHRoaXMucHJvcHMucm93Q2xhc3NOYW1lR2V0dGVyKHJvd0luZGV4KTtcbiAgICB9XG4gICAgcmV0dXJuIHJvd0NsYXNzTmFtZXMuam9pbignICcpO1xuICB9XG5cbiAgZ2V0Q2VsbE1lc3NhZ2VzID0gKHJvd0luZGV4LCBjb2wsIGNlbGxUeXBlKSA9PiB7XG4gICAgY29uc3QgcmV0dXJuRGF0YSA9IHt9O1xuICAgIGlmICghdGhpcy5wcm9wcy5ncmlkLmlkS2V5UGF0aCB8fCAhY29sLnZhbHVlS2V5UGF0aCkge1xuICAgICAgcmV0dXJuIHJldHVybkRhdGE7XG4gICAgfVxuICAgIGxldCBpbmZvTWVzc2FnZTtcbiAgICBsZXQgZXJyb3JNZXNzYWdlO1xuICAgIGxldCB3YXJuaW5nTWVzc2FnZTtcbiAgICBpZiAoY2VsbFR5cGUgPT09ICdjcmVhdGUnKSB7XG4gICAgICBpbmZvTWVzc2FnZSA9IHRoaXMucHJvcHMuY3JlYXRlQ2VsbE1lc3NhZ2VzLmdldEluKFsnaW5mbycsIHJvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgICBlcnJvck1lc3NhZ2UgPSB0aGlzLnByb3BzLmNyZWF0ZUNlbGxNZXNzYWdlcy5nZXRJbihbJ2Vycm9yJywgcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgIHdhcm5pbmdNZXNzYWdlID0gdGhpcy5wcm9wcy5jcmVhdGVDZWxsTWVzc2FnZXMuZ2V0SW4oWyd3YXJuaW5nJywgcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgICAgaW5mb01lc3NhZ2UgPSB0aGlzLnByb3BzLmNlbGxNZXNzYWdlcy5nZXRJbihbJ2luZm8nLCBpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgZXJyb3JNZXNzYWdlID0gdGhpcy5wcm9wcy5jZWxsTWVzc2FnZXMuZ2V0SW4oWydlcnJvcicsIGlkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgICB3YXJuaW5nTWVzc2FnZSA9IHRoaXMucHJvcHMuY2VsbE1lc3NhZ2VzLmdldEluKFsnd2FybmluZycsIGlkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgfVxuICAgIGlmIChpbmZvTWVzc2FnZSkge1xuICAgICAgcmV0dXJuRGF0YS5pbmZvTWVzc2FnZSA9IGluZm9NZXNzYWdlO1xuICAgIH1cbiAgICBpZiAoZXJyb3JNZXNzYWdlKSB7XG4gICAgICByZXR1cm5EYXRhLmVycm9yTWVzc2FnZSA9IGVycm9yTWVzc2FnZTtcbiAgICB9XG4gICAgaWYgKHdhcm5pbmdNZXNzYWdlKSB7XG4gICAgICByZXR1cm5EYXRhLndhcm5pbmdNZXNzYWdlID0gd2FybmluZ01lc3NhZ2U7XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5EYXRhO1xuICB9XG5cbiAgZ2V0U2Nyb2xsVG9Sb3cgPSAoKSA9PiB7XG4gICAgbGV0IHNjcm9sbFRvUm93O1xuICAgIGlmICh0aGlzLnByb3BzLmlzQ3JlYXRpbmcgJiYgIXRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwpIHJldHVybiBzY3JvbGxUb1JvdztcbiAgICBpZiAodGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCkge1xuICAgICAgY29uc3Qgc2Nyb2xsTmV3Um93ID0gdGhpcy5wcm9wcy5jcmVhdGVEYXRhLnNpemUgLSAxO1xuICAgICAgaWYgKHNjcm9sbE5ld1JvdyA+PSAwKSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gc2Nyb2xsTmV3Um93O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5pc0VkaXRpbmcpIHtcbiAgICAgICAgc2Nyb2xsVG9Sb3cgPSB0aGlzLnN0YXRlLmN1cnJlbnRSb3c7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzY3JvbGxUb1JvdyA9IHRoaXMucHJvcHMuc2Nyb2xsVG9Sb3c7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIH1cbiAgICAgIGlmIChzY3JvbGxUb1JvdyA9PT0gdW5kZWZpbmVkICYmIHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5zaXplID4gMCkge1xuICAgICAgICBzY3JvbGxUb1JvdyA9IHRoaXMuZ2V0U2VsZWN0ZWRJdGVtSW5kZXgodGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLmZpcnN0KCkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc2Nyb2xsVG9Sb3c7XG4gIH1cblxuICBzZXRGb2N1c1RvID0gKGZvY3VzVG8pID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5pc0VkaXRpbmcgfHwgdGhpcy5wcm9wcy5pc0NyZWF0aW5nKSB7XG4gICAgICBpZiAoZm9jdXNUbyAmJiBmb2N1c1RvLmdldCgndHlwZScpICYmIGZvY3VzVG8gIT09IHRoaXMucHJldkZvY3VzVG8pIHtcbiAgICAgICAgdGhpc1tmb2N1c1RvLmdldCgndHlwZScpXSA9IHRydWU7XG4gICAgICAgIHRoaXMuZm9jdXNUb0xhc3RSb3cgPSBmb2N1c1RvLmdldCgnZm9jdXNUb0xhc3RSb3cnKTtcbiAgICAgICAgdGhpcy5wcmV2Rm9jdXNUbyA9IGZvY3VzVG87XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlQ2VsbFNlbGVjdCA9IChjZWxsVHlwZSwgcm93SW5kZXgsIGNvbHVtbktleSkgPT4gKCkgPT4ge1xuICAgIGlmIChjZWxsVHlwZSA9PT0gJ3ZpZXcnICYmIHRoaXMucHJvcHMuY2VsbFNlbGVjdCkge1xuICAgICAgdGhpcy5wcm9wcy5jZWxsU2VsZWN0aW9uQ2hhbmdlKHRoaXMucHJvcHMuZ3JpZCwgTWFwKHsgcm93SW5kZXgsIGNvbHVtbktleSB9KSk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlQ3JlYXRlQ2VsbFJlZiA9IChyb3dJbmRleCwgY29sKSA9PiAocmVmKSA9PiB7XG4gICAgLy8gRm9jdXMgdG8gY3JlYXRlIGNlbGxcbiAgICBpZiAoXG4gICAgICB0aGlzLnByb3BzLmNyZWF0ZURhdGEuc2l6ZSAmJlxuICAgICAgdGhpcy5wcm9wcy5jcmVhdGVEYXRhLnNpemUgPT09IHJvd0luZGV4ICsgMSAmJlxuICAgICAgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCAmJlxuICAgICAgIXRoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnY3JlYXRlJylcbiAgICApIHtcbiAgICAgIHJlZi5mb2N1cygpO1xuICAgICAgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUVkaXRDZWxsUmVmID0gKHJvd0luZGV4LCBjb2wpID0+IChyZWYpID0+IHtcbiAgICBjb25zdCBjb2x1bW5LZXkgPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sKTtcbiAgICBpZiAodGhpcy5mb2N1c1RvRWRpdENlbGwgJiYgIXRoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnZWRpdCcpKSB7XG4gICAgICBjb25zdCBzZWxlY3RlZFJvd0luZGV4ID0gdGhpcy5mb2N1c1RvTGFzdFJvdyAmJiB0aGlzLnByb3BzLmRhdGEuc2l6ZSA+IDAgP1xuICAgICAgICB0aGlzLnByb3BzLmRhdGEuc2l6ZSAtIDEgOiB0aGlzLmdldFNlbGVjdGVkSXRlbUluZGV4KHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5maXJzdCgpKTtcblxuICAgICAgY29uc3QgeyBzZWxlY3RlZENlbGwgfSA9IHRoaXMucHJvcHM7XG4gICAgICBpZiAoc2VsZWN0ZWRDZWxsLnNpemUgPiAwKSB7XG4gICAgICAgIGlmIChzZWxlY3RlZENlbGwuZ2V0KCdyb3dJbmRleCcpID09PSByb3dJbmRleCAmJiBzZWxlY3RlZENlbGwuZ2V0KCdjb2x1bW5LZXknKSA9PT0gY29sdW1uS2V5KSB7XG4gICAgICAgICAgcmVmLmZvY3VzKCk7XG4gICAgICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmZvY3VzVG9MYXN0Um93ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWRSb3dJbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZm9jdXNUb0xhc3RSb3cgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWRSb3dJbmRleCA9PT0gcm93SW5kZXgpIHtcbiAgICAgICAgcmVmLmZvY3VzKCk7XG4gICAgICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZm9jdXNUb0xhc3RSb3cgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuZW5hYmxlQXJyb3dOYXZpZ2F0aW9uKSB7XG4gICAgICB0aGlzLmNlbGxSZWZzW2Ake3RoaXMucHJvcHMuZ3JpZC5pZH1fJHtjb2x1bW5LZXl9XyR7cm93SW5kZXh9YF0gPSByZWY7XG4gICAgfVxuICB9XG5cbiAgbW92ZUNlbGxGb2N1cyA9IChuZXh0RWxlbWVudCwgcm93SW5kZXgsIGNvbHVtbkluZGV4KSA9PiB7XG4gICAgaWYgKG5leHRFbGVtZW50ICYmIChuZXh0RWxlbWVudC50eXBlID09PSAndGV4dCcgfHwgbmV4dEVsZW1lbnQudHlwZSA9PT0gJ251bWJlcicpKSB7XG4gICAgICBpZiAocm93SW5kZXggIT09IC0xKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjdXJyZW50Um93OiByb3dJbmRleCB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChjb2x1bW5JbmRleCAhPT0gLTEpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGN1cnJlbnRDb2x1bW46IGNvbHVtbkluZGV4IH0pO1xuICAgICAgfVxuICAgICAgc2V0VGltZW91dCgoKSA9PiBuZXh0RWxlbWVudC5zZWxlY3QoKSwgNTApO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVNlbGVjdGlvbkNoZWNrQm94T25DaGFuZ2UgPSByb3dJbmRleCA9PiAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5pdGVtU2VsZWN0aW9uQ2hhbmdlKHRoaXMucHJvcHMuZ3JpZCwgcm93SW5kZXgsIHRydWUsIGZhbHNlKTtcbiAgfVxuXG4gIGdlbmVyYXRlQ29sdW1ucyA9ICgpID0+IHtcbiAgICBjb25zdCB7IGV4dHJhQ29sdW1uIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGNvbHVtbnMgPSBbXTtcbiAgICBjb25zdCB0YWJJbmRleCA9IFN0cmluZyh0aGlzLnByb3BzLnRhYkluZGV4KTtcbiAgICBpZiAoZXh0cmFDb2x1bW4pIHtcbiAgICAgIGNvbHVtbnMucHVzaCh7XG4gICAgICAgIHdpZHRoOiBleHRyYUNvbHVtbi53aWR0aCB8fCA0MCxcbiAgICAgICAgaXNSZXNpemFibGU6ICEhZXh0cmFDb2x1bW4uaXNSZXNpemFibGUsXG4gICAgICAgIGlzU29ydGFibGU6IGZhbHNlLFxuICAgICAgICBjb2x1bW5LZXk6ICdleHRyYUNvbHVtbicsXG4gICAgICAgIGNlbGw6IHJvd0luZGV4ID0+IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWV4dHJhLWNvbHVtbi1jZWxsIG5vLXJvdy1zZWxlY3RcIj5cbiAgICAgICAgICAgIHsgZXh0cmFDb2x1bW4udmFsdWVSZW5kZXIodGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCksIHRhYkluZGV4KSB9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICksXG4gICAgICAgIGNlbGxFZGl0OiByb3dJbmRleCA9PiAoZXh0cmFDb2x1bW4uY2VsbEVkaXQgPyBleHRyYUNvbHVtbi5jZWxsRWRpdChyb3dJbmRleCkgOiBudWxsKSxcbiAgICAgICAgY2VsbENyZWF0ZTogcm93SW5kZXggPT4gKGV4dHJhQ29sdW1uLmNlbGxDcmVhdGUgPyBleHRyYUNvbHVtbi5jZWxsQ3JlYXRlKHJvd0luZGV4KSA6IG51bGwpLFxuICAgICAgICBjZWxsRmlsdGVyOiByb3dJbmRleCA9PiAoZXh0cmFDb2x1bW4uY2VsbEZpbHRlciA/IGV4dHJhQ29sdW1uLmNlbGxGaWx0ZXIocm93SW5kZXgpIDogbnVsbCksXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wcm9wcy5yb3dTZWxlY3RDaGVja2JveENvbHVtbikge1xuICAgICAgY29sdW1ucy5wdXNoKHtcbiAgICAgICAgd2lkdGg6IDQwLFxuICAgICAgICBpc1Jlc2l6YWJsZTogZmFsc2UsXG4gICAgICAgIGlzU29ydGFibGU6IGZhbHNlLFxuICAgICAgICBjb2x1bW5LZXk6ICdzZWxlY3Rpb25DaGVja2JveCcsXG4gICAgICAgIGNlbGw6IChyb3dJbmRleCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHJvd0l0ZW0gPSB0aGlzLnByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KTtcbiAgICAgICAgICBjb25zdCBpdGVtSWQgPSByb3dJdGVtLmdldEluKHRoaXMucHJvcHMuZ3JpZC5pZEtleVBhdGgpO1xuICAgICAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLmluY2x1ZGVzKGl0ZW1JZCk7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxDaGVja2JveFxuICAgICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRTZWxlY3RDaGVja0JveC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtyb3dJbmRleH1gfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1zZWxlY3QtY2hlY2tib3gtY2VsbCBuby1yb3ctc2VsZWN0XCJcbiAgICAgICAgICAgICAgY2hlY2tlZD17c2VsZWN0ZWR9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVNlbGVjdGlvbkNoZWNrQm94T25DaGFuZ2Uocm93SW5kZXgpfVxuICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIGNlbGxFZGl0OiAoKSA9PiBudWxsLFxuICAgICAgICBjZWxsQ3JlYXRlOiAoKSA9PiBudWxsLFxuICAgICAgICBjZWxsRmlsdGVyOiAoKSA9PiBudWxsLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgdmlzaWJsZUNvbHVtbnMgPSBbXTtcbiAgICB0aGlzLnByb3BzLnZpc2libGVDb2x1bW5zLmZvckVhY2goKHZpc2libGVDb2x1bW5LZXkpID0+IHtcbiAgICAgIHRoaXMucHJvcHMuY29sdW1ucy5mb3JFYWNoKChvcmdDb2wpID0+IHtcbiAgICAgICAgaWYgKFV0aWxzLmdldENvbHVtbktleShvcmdDb2wpID09PSB2aXNpYmxlQ29sdW1uS2V5KSB7XG4gICAgICAgICAgdmlzaWJsZUNvbHVtbnMucHVzaChvcmdDb2wpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICB2aXNpYmxlQ29sdW1ucy5mb3JFYWNoKChjb2wpID0+IHtcbiAgICAgIGNvbnN0IGNvbHVtbiA9IHtcbiAgICAgICAgaGVhZGVyOiBjb2wuaGVhZGVyLFxuICAgICAgICBjb2x1bW5LZXk6IFV0aWxzLmdldENvbHVtbktleShjb2wpLFxuICAgICAgICB3aWR0aDogKGNvbC53aWR0aCB8fCBjb2wud2lkdGggPT09IDAgPyBjb2wud2lkdGggOiAyMDApLFxuICAgICAgICBtaW5XaWR0aDogKGNvbC5taW5XaWR0aCB8fCBjb2wubWluV2lkdGggPT09IDAgPyBjb2wubWluV2lkdGggOiA0MCksXG4gICAgICAgIG1heFdpZHRoOiBjb2wubWF4V2lkdGgsXG4gICAgICAgIGlzUmVzaXphYmxlOiAhY29sLmRpc2FibGVSZXNpemluZyxcbiAgICAgICAgZml4ZWQ6ICEhY29sLmZpeGVkLFxuICAgICAgICBhbGxvd0NlbGxzUmVjeWNsaW5nOiAhIWNvbC5hbGxvd0NlbGxzUmVjeWNsaW5nLFxuICAgICAgICBkaXNhYmxlU29ydGluZzogISFjb2wuZGlzYWJsZVNvcnRpbmcsXG4gICAgICAgIGlzUmVxdWlyZWQ6ICEhY29sLmlzUmVxdWlyZWQsXG4gICAgICAgIGNvbXBvbmVudFR5cGU6IGNvbC5jb21wb25lbnRUeXBlLFxuICAgICAgICBzdHlsZTogVXRpbHMuZ2V0Q2VsbFN0eWxlQnlDb2woY29sKSxcbiAgICAgIH07XG4gICAgICBpZiAoY29sLnZhbHVlS2V5UGF0aCkge1xuICAgICAgICBjb2x1bW4udmFsdWVLZXlQYXRoID0gY29sLnZhbHVlS2V5UGF0aDtcbiAgICAgIH1cbiAgICAgIGlmIChjb2wuZmxleEdyb3cpIHtcbiAgICAgICAgY29sdW1uLmZsZXhHcm93ID0gY29sLmZsZXhHcm93O1xuICAgICAgfVxuICAgICAgaWYgKGNvbC52YWx1ZVR5cGUpIHtcbiAgICAgICAgY29sdW1uLnZhbHVlVHlwZSA9IGNvbC52YWx1ZVR5cGU7XG4gICAgICB9XG4gICAgICBpZiAoY29sLnNvcnRDb21wYXJhdG9yKSB7XG4gICAgICAgIGNvbHVtbi5zb3J0Q29tcGFyYXRvciA9IGNvbC5zb3J0Q29tcGFyYXRvcjtcbiAgICAgIH1cbiAgICAgIGlmIChjb2wuc29ydFZhbHVlR2V0dGVyKSB7XG4gICAgICAgIGNvbHVtbi5zb3J0VmFsdWVHZXR0ZXIgPSBjb2wuc29ydFZhbHVlR2V0dGVyO1xuICAgICAgfVxuICAgICAgY29uc3QgdmFsdWVFbXB0eUNoZWNrZXIgPSBVdGlscy5nZXRWYWx1ZUVtcHR5Q2hlY2tlcihjb2wpO1xuICAgICAgLy8gQ2VsbCB2YWx1ZSByZW5kZXJpbmdcbiAgICAgIGNvbnN0IHZhbHVlUmVuZGVyID0gKHJvd0luZGV4LCBmb3JtYXQpID0+IHtcbiAgICAgICAgY29uc3QgdmFsID0gdGhpcy5wcm9wcy5kYXRhLmdldEluKFtyb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsKSkge1xuICAgICAgICAgIHJldHVybiBjb2wuaXNSZXF1aXJlZCA/IDxNIGlkPVwiR3JpZC5WYWx1ZUlzTWlzc2luZ1wiIC8+IDogJyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvcm1hdCA/IGZvcm1hdCh2YWwpIDogdmFsO1xuICAgICAgfTtcblxuICAgICAgaWYgKGNvbC5jZWxsKSB7XG4gICAgICAgIGNvbHVtbi5jZWxsID0gY29sLmNlbGw7XG4gICAgICB9IGVsc2UgaWYgKGNvbC52YWx1ZVJlbmRlcikge1xuICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IGNvbC52YWx1ZVJlbmRlcih0aGlzLnByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSwgcm93SW5kZXgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3dpdGNoIChjb2wudmFsdWVUeXBlKSB7XG4gICAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICBjYXNlICdmbG9hdCc6XG4gICAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+XG4gICAgICAgICAgICAgIHZhbHVlUmVuZGVyKHJvd0luZGV4LCB2ID0+IDxOIHZhbHVlPXt2fSB7Li4uY29sLnJlbmRlckNvbXBvbmVudFByb3BzfSAvPik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdjdXJyZW5jeSc6IHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbmN5S2V5UGF0aCA9IGNvbC52YWx1ZU9wdGlvbnMgJiYgY29sLnZhbHVlT3B0aW9ucy5jdXJyZW5jeUtleVBhdGggfHwgWydjdXJyZW5jeSddOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+XG4gICAgICAgICAgICAgIHZhbHVlUmVuZGVyKHJvd0luZGV4LCB2ID0+IGZvcm1hdEN1cnJlbmN5QW1vdW50KHYsIHtcbiAgICAgICAgICAgICAgICBjdXJyZW5jeTogdGhpcy5wcm9wcy5kYXRhLmdldEluKFtyb3dJbmRleCwgLi4uY3VycmVuY3lLZXlQYXRoXSksXG4gICAgICAgICAgICAgICAgZGVjaW1hbHM6IGNvbC52YWx1ZU9wdGlvbnMgJiYgY29sLnZhbHVlT3B0aW9ucy5kZWNpbWFscyxcbiAgICAgICAgICAgICAgICB0aG91c2FuZFNlcGFyYXRvcjogY29sLnZhbHVlT3B0aW9ucyAmJiBjb2wudmFsdWVPcHRpb25zLnRob3VzYW5kU2VwYXJhdG9yIHx8IHRoaXMucHJvcHMudGhvdXNhbmRTZXBhcmF0b3IsIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgICAgICAgICBkZWNpbWFsU2VwYXJhdG9yOiBjb2wudmFsdWVPcHRpb25zICYmIGNvbC52YWx1ZU9wdGlvbnMuZGVjaW1hbFNlcGFyYXRvciB8fCB0aGlzLnByb3BzLmRlY2ltYWxTZXBhcmF0b3IsIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PlxuICAgICAgICAgICAgICB2YWx1ZVJlbmRlcihyb3dJbmRleCwgKHYpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobW9tZW50KHYsIHRoaXMucHJvcHMuZGF0ZUZvcm1hdCwgdHJ1ZSkuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gbW9tZW50LnV0Yyh2LCB0aGlzLnByb3BzLmRhdGVGb3JtYXQpLmZvcm1hdCh0aGlzLnByb3BzLmRhdGVGb3JtYXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobW9tZW50KHYpLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vbWVudC51dGModikuZm9ybWF0KHRoaXMucHJvcHMuZGF0ZUZvcm1hdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiA8TSBpZD1cIkdyaWQuSW52YWxpZERhdGVcIiAvPjtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT5cbiAgICAgICAgICAgICAgdmFsdWVSZW5kZXIocm93SW5kZXgsIHYgPT5cbiAgICAgICAgICAgICAgICA8TSBpZD17diA/ICdHcmlkLlllcycgOiAnR3JpZC5Obyd9IHsuLi5jb2wucmVuZGVyQ29tcG9uZW50UHJvcHN9IC8+KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2NoZWNrYm94JzpcbiAgICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT5cbiAgICAgICAgICAgICAgdmFsdWVSZW5kZXIocm93SW5kZXgsIHYgPT5cbiAgICAgICAgICAgICAgICAodiA/XG4gICAgICAgICAgICAgICAgICA8RmFDaGVjayBzaXplPXsyMH0gLz4gOlxuICAgICAgICAgICAgICAgICAgbnVsbFxuICAgICAgICAgICAgICAgICkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gdmFsdWVSZW5kZXIocm93SW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBDZWxsIGVkaXQvY3JlYXRlL2ZpbHRlciBjb21wb25lbnQgcmVuZGVyaW5nXG4gICAgICBpZiAoY29sLmNlbGxFZGl0KSB7XG4gICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IGNvbC5jZWxsRWRpdDtcbiAgICAgIH0gZWxzZSBpZiAoY29sLmVkaXRWYWx1ZVJlbmRlcikge1xuICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPVxuICAgICAgICAgIHJvd0luZGV4ID0+IGNvbC5lZGl0VmFsdWVSZW5kZXIodGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCksIHJvd0luZGV4KTtcbiAgICAgIH1cbiAgICAgIGlmIChjb2wuY2VsbENyZWF0ZSkge1xuICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IGNvbC5jZWxsQ3JlYXRlO1xuICAgICAgfSBlbHNlIGlmIChjb2wuY3JlYXRlVmFsdWVSZW5kZXIpIHtcbiAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPVxuICAgICAgICAgIHJvd0luZGV4ID0+IGNvbC5jcmVhdGVWYWx1ZVJlbmRlcih0aGlzLnByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSwgcm93SW5kZXgpO1xuICAgICAgfVxuICAgICAgaWYgKGNvbC5jZWxsRmlsdGVyKSB7XG4gICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gY29sLmNlbGxGaWx0ZXI7XG4gICAgICB9IGVsc2UgaWYgKGNvbC5maWx0ZXJWYWx1ZVJlbmRlcikge1xuICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9XG4gICAgICAgICAgcm93SW5kZXggPT4gY29sLmZpbHRlclZhbHVlUmVuZGVyKHRoaXMucHJvcHMuZGF0YS5nZXQocm93SW5kZXgpLCByb3dJbmRleCk7XG4gICAgICB9XG4gICAgICBpZiAoY29sLmNvbXBvbmVudFR5cGUpIHtcbiAgICAgICAgbGV0IGVkaXRWYWx1ZVBhcnNlciA9IHZhbCA9PiB2YWw7XG4gICAgICAgIHN3aXRjaCAoY29sLmNvbXBvbmVudFR5cGUpIHtcbiAgICAgICAgICBjYXNlICd0ZXh0JzpcbiAgICAgICAgICAgIC8vIFRPRE8gUkVGQUNUT1IgVE8gRlVOQ1RJT05cbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmlubGluZUVkaXQpIHtcbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiAoXG4gICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkVkaXRDZWxsVmFsdWVDaGFuZ2Uocm93SW5kZXgsIGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLm9uRWRpdENlbGxCbHVyKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLm9uQ2VsbEZvY3VzKCdlZGl0JywgY29sLmNvbXBvbmVudFR5cGUsIHJvd0luZGV4LCBjb2x1bW4uY29sdW1uS2V5KX1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLm9uRWRpdENlbGxLZXlEb3duKGNvbCwgcm93SW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFJlZj17dGhpcy5oYW5kbGVFZGl0Q2VsbFJlZihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkRWRpdElucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5lZGl0Q29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2VkaXQnKX1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e2NvbHVtbi5zdHlsZX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IChcbiAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldENyZWF0ZUl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DcmVhdGVDZWxsVmFsdWVDaGFuZ2Uocm93SW5kZXgsIGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLm9uQ3JlYXRlQ2VsbEJsdXIocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5vbkNyZWF0ZUNlbGxLZXlEb3dufVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFJlZj17dGhpcy5oYW5kbGVDcmVhdGVDZWxsUmVmKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRDcmVhdGVJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fS0ke3Jvd0luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuY3JlYXRlQ29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2NyZWF0ZScpfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17Y29sdW1uLnN0eWxlfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmZpbHRlcmluZykge1xuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRGaWx0ZXJJdGVtVmFsdWUoY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UoY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRGaWx0ZXJJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fWB9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuZmlsdGVyQ29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXtjb2x1bW4uc3R5bGV9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmlubGluZUVkaXQpIHtcbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiAoXG4gICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uRWRpdENlbGxWYWx1ZUNoYW5nZShyb3dJbmRleCwgY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMub25FZGl0Q2VsbEJsdXIocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMub25DZWxsRm9jdXMoJ2VkaXQnLCBjb2wuY29tcG9uZW50VHlwZSwgcm93SW5kZXgsIGNvbHVtbi5jb2x1bW5LZXkpfVxuICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMub25FZGl0Q2VsbEtleURvd24oY29sLCByb3dJbmRleCl9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UmVmPXt0aGlzLmhhbmRsZUVkaXRDZWxsUmVmKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRFZGl0SW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX0tJHtyb3dJbmRleH1gfVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmVkaXRDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnZWRpdCcpfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17Y29sdW1uLnN0eWxlfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gKFxuICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRDcmVhdGVJdGVtVmFsdWUocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlKHJvd0luZGV4LCBjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5vbkNyZWF0ZUNlbGxCbHVyKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLm9uQ2VsbEZvY3VzKCdjcmVhdGUnLCAnbnVtYmVyJywgcm93SW5kZXgsIGNvbHVtbi5jb2x1bW5LZXkpfVxuICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMub25DcmVhdGVDZWxsS2V5RG93bn1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRSZWY9e3RoaXMuaGFuZGxlQ3JlYXRlQ2VsbFJlZihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkQ3JlYXRlSW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX0tJHtyb3dJbmRleH1gfVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmNyZWF0ZUNvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdjcmVhdGUnKX1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e2NvbHVtbi5zdHlsZX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5maWx0ZXJpbmcpIHtcbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT4gKFxuICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRGaWx0ZXJJdGVtVmFsdWUoY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UoY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRGaWx0ZXJJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fWB9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuZmlsdGVyQ29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXtjb2x1bW4uc3R5bGV9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyID0gdmFsID0+XG4gICAgICAgICAgICAgIHZhbC5yZXBsYWNlKG5ldyBSZWdFeHAoYFteXFxcXGQke3RoaXMucHJvcHMuZGVjaW1hbFNlcGFyYXRvcn0rLV1gLCAnZycpLCAnJyk7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5pbmxpbmVFZGl0KSB7XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gKFxuICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25FZGl0Q2VsbFZhbHVlQ2hhbmdlKHJvd0luZGV4LCBjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5vbkVkaXRDZWxsQmx1cihyb3dJbmRleCwgY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLm9uQ2VsbEZvY3VzKCdlZGl0JywgY29sLmNvbXBvbmVudFR5cGUsIHJvd0luZGV4LCBjb2x1bW4uY29sdW1uS2V5KX1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLm9uRWRpdENlbGxLZXlEb3duKGNvbCwgcm93SW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFJlZj17dGhpcy5oYW5kbGVFZGl0Q2VsbFJlZihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkRWRpdElucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5lZGl0Q29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2VkaXQnKX1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e2NvbHVtbi5zdHlsZX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IChcbiAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldENyZWF0ZUl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DcmVhdGVDZWxsVmFsdWVDaGFuZ2Uocm93SW5kZXgsIGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLm9uQ3JlYXRlQ2VsbEJsdXIocm93SW5kZXgsIGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLm9uQ3JlYXRlQ2VsbEtleURvd259XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UmVmPXt0aGlzLmhhbmRsZUNyZWF0ZUNlbGxSZWYocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZENyZWF0ZUlucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5jcmVhdGVDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnY3JlYXRlJyl9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXtjb2x1bW4uc3R5bGV9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuZmlsdGVyaW5nKSB7XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IChcbiAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldEZpbHRlckl0ZW1WYWx1ZShjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkZpbHRlckNlbGxWYWx1ZUNoYW5nZShjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZEZpbHRlcklucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9YH1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5maWx0ZXJDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e2NvbHVtbi5zdHlsZX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdzZWxlY3QnOiB7XG4gICAgICAgICAgICBjb25zdCB7IGludGwgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RPcHRpb25zID0gY29sLnNlbGVjdENvbXBvbmVudE9wdGlvbnMgfHxcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RDb21wb25lbnRPcHRpb25zLmdldChjb2x1bW4uY29sdW1uS2V5KTtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdFRyYW5zbGF0aW9ucyA9IGNvbC5zZWxlY3RDb21wb25lbnRUcmFuc2xhdGlvbnMgfHxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBpbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuU2VsZWN0JyB9KSxcbiAgICAgICAgICAgICAgICBub1Jlc3VsdHNUZXh0OiBpbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuTm9SZXN1bHRzJyB9KSxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmlubGluZUVkaXQpIHtcbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiAoXG4gICAgICAgICAgICAgICAgICA8RmxvYXRpbmdTZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgbmFtZT17Y29sLnZhbHVlS2V5UGF0aC5qb2luKCkgKyAnLWVkaXQtJyArIHJvd0luZGV4fVxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zPXtcbiAgICAgICAgICAgICAgICAgICAgICBjb2wuZWRpdFNlbGVjdE9wdGlvbnNNb2QgJiYgc2VsZWN0T3B0aW9ucyA/XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2wuZWRpdFNlbGVjdE9wdGlvbnNNb2Qoc2VsZWN0T3B0aW9ucy5zbGljZSgpLCByb3dJbmRleCwgY29sKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RPcHRpb25zXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25FZGl0Q2VsbFZhbHVlQ2hhbmdlKHJvd0luZGV4LCBjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5vbkVkaXRDZWxsQmx1cihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5vbkNlbGxGb2N1cygnZWRpdCcsIGNvbC5jb21wb25lbnRUeXBlLCByb3dJbmRleCwgY29sdW1uLmNvbHVtbktleSl9XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaGFibGU9e3NlbGVjdE9wdGlvbnMgJiYgKHNlbGVjdE9wdGlvbnMubGVuZ3RoID4gOSl9XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyYWJsZT17IWNvbC5pc1JlcXVpcmVkfVxuICAgICAgICAgICAgICAgICAgICBiYWNrc3BhY2VSZW1vdmVzPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgdGFiU2VsZWN0c1ZhbHVlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgb3Blbk9uRm9jdXNcbiAgICAgICAgICAgICAgICAgICAgcmVmPXt0aGlzLmhhbmRsZUVkaXRDZWxsUmVmKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgaWQ6IGBvY0RhdGFncmlkRWRpdElucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YCxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5lZGl0Q29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2VkaXQnKX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgICAgICAgICB7Li4uc2VsZWN0VHJhbnNsYXRpb25zfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IChcbiAgICAgICAgICAgICAgICAgIDxGbG9hdGluZ1NlbGVjdFxuICAgICAgICAgICAgICAgICAgICBuYW1lPXtjb2wudmFsdWVLZXlQYXRoLmpvaW4oKSArICctY3JlYXRlLScgKyByb3dJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucz17XG4gICAgICAgICAgICAgICAgICAgICAgY29sLmNyZWF0ZVNlbGVjdE9wdGlvbnNNb2QgJiYgc2VsZWN0T3B0aW9ucyA/XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2wuY3JlYXRlU2VsZWN0T3B0aW9uc01vZChzZWxlY3RPcHRpb25zLnNsaWNlKCksIHJvd0luZGV4LCBjb2wpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdE9wdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRDcmVhdGVJdGVtVmFsdWUocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlKHJvd0luZGV4LCBjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5vbkNyZWF0ZUNlbGxCbHVyKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hhYmxlPXtzZWxlY3RPcHRpb25zICYmIChzZWxlY3RPcHRpb25zLmxlbmd0aCA+IDkpfVxuICAgICAgICAgICAgICAgICAgICBjbGVhcmFibGU9eyFjb2wuaXNSZXF1aXJlZH1cbiAgICAgICAgICAgICAgICAgICAgYmFja3NwYWNlUmVtb3Zlcz17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIHRhYlNlbGVjdHNWYWx1ZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIG9wZW5PbkZvY3VzXG4gICAgICAgICAgICAgICAgICAgIHJlZj17dGhpcy5oYW5kbGVDcmVhdGVDZWxsUmVmKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgaWQ6IGBvY0RhdGFncmlkQ3JlYXRlSW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX0tJHtyb3dJbmRleH1gLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmNyZWF0ZUNvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdjcmVhdGUnKX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgICAgICAgICB7Li4uc2VsZWN0VHJhbnNsYXRpb25zfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5maWx0ZXJpbmcpIHtcbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT4gKFxuICAgICAgICAgICAgICAgICAgPEZsb2F0aW5nU2VsZWN0XG4gICAgICAgICAgICAgICAgICAgIG5hbWU9e2NvbC52YWx1ZUtleVBhdGguam9pbigpICsgJy1maWx0ZXInfVxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zPXtcbiAgICAgICAgICAgICAgICAgICAgICBjb2wuZmlsdGVyU2VsZWN0T3B0aW9uc01vZCAmJiBzZWxlY3RPcHRpb25zID9cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbC5maWx0ZXJTZWxlY3RPcHRpb25zTW9kKHNlbGVjdE9wdGlvbnMuc2xpY2UoKSwgY29sKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RPcHRpb25zfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRGaWx0ZXJJdGVtVmFsdWUoY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UoY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hhYmxlPXtzZWxlY3RPcHRpb25zICYmIChzZWxlY3RPcHRpb25zLmxlbmd0aCA+IDkpfVxuICAgICAgICAgICAgICAgICAgICBjbGVhcmFibGVcbiAgICAgICAgICAgICAgICAgICAgdGFiU2VsZWN0c1ZhbHVlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgb3Blbk9uRm9jdXNcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICAgIGlkOiBgb2NEYXRhZ3JpZEZpbHRlcklucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9YCxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5maWx0ZXJDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgICAgICAgICB7Li4uc2VsZWN0VHJhbnNsYXRpb25zfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgY2FzZSAnZGF0ZSc6IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmlubGluZUVkaXQpIHtcbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiAoXG4gICAgICAgICAgICAgICAgICA8RGF0ZUlucHV0XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uRWRpdENlbGxWYWx1ZUNoYW5nZShyb3dJbmRleCwgY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBsb2NhbGU9e3RoaXMucHJvcHMucmVnaW9ufVxuICAgICAgICAgICAgICAgICAgICBkYXRlRm9ybWF0PXt0aGlzLnByb3BzLmRhdGVGb3JtYXR9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UmVmPXt0aGlzLmhhbmRsZUVkaXRDZWxsUmVmKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgaWQ6IGBvY0RhdGFncmlkRWRpdElucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YCxcbiAgICAgICAgICAgICAgICAgICAgICBvbktleURvd246IHRoaXMub25FZGl0Q2VsbEtleURvd24oY29sLCByb3dJbmRleCksXG4gICAgICAgICAgICAgICAgICAgICAgb25CbHVyOiB0aGlzLm9uRWRpdENlbGxCbHVyKHJvd0luZGV4LCBjb2wpLFxuICAgICAgICAgICAgICAgICAgICAgIG9uRm9jdXM6IHRoaXMub25DZWxsRm9jdXMoJ2VkaXQnLCBjb2wuY29tcG9uZW50VHlwZSwgcm93SW5kZXgsIGNvbHVtbi5jb2x1bW5LZXkpLFxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBjb2x1bW4uc3R5bGUsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuZWRpdENvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdlZGl0Jyl9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gKFxuICAgICAgICAgICAgICAgICAgPERhdGVJbnB1dFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRDcmVhdGVJdGVtVmFsdWUocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlKHJvd0luZGV4LCBjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5vbkNyZWF0ZUNlbGxLZXlEb3dufVxuICAgICAgICAgICAgICAgICAgICBsb2NhbGU9e3RoaXMucHJvcHMucmVnaW9ufVxuICAgICAgICAgICAgICAgICAgICBkYXRlRm9ybWF0PXt0aGlzLnByb3BzLmRhdGVGb3JtYXR9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UmVmPXt0aGlzLmhhbmRsZUNyZWF0ZUNlbGxSZWYocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICBpZDogYG9jRGF0YWdyaWRDcmVhdGVJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fS0ke3Jvd0luZGV4fWAsXG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IGNvbHVtbi5zdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5jcmVhdGVDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnY3JlYXRlJyl9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmZpbHRlcmluZykge1xuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8RGF0ZUlucHV0XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldEZpbHRlckl0ZW1WYWx1ZShjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkZpbHRlckNlbGxWYWx1ZUNoYW5nZShjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIGRhdGVGb3JtYXQ9e3RoaXMucHJvcHMuZGF0ZUZvcm1hdH1cbiAgICAgICAgICAgICAgICAgICAgbG9jYWxlPXt0aGlzLnByb3BzLnJlZ2lvbn1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgIGlkOiBgb2NEYXRhZ3JpZEZpbHRlcklucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9YCxcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogY29sdW1uLnN0eWxlLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmZpbHRlckNvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgY2FzZSAnYm9vbGVhbic6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgaW50bCB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBbXG4gICAgICAgICAgICAgIHsgdmFsdWU6IHRydWUsIGxhYmVsOiBpbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuWWVzJyB9KSB9LFxuICAgICAgICAgICAgICB7IHZhbHVlOiBmYWxzZSwgbGFiZWw6IGludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5ObycgfSkgfSxcbiAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdFRyYW5zbGF0aW9ucyA9IGNvbC5zZWxlY3RDb21wb25lbnRUcmFuc2xhdGlvbnMgfHwge1xuICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0LlNlbGVjdCcgfSksXG4gICAgICAgICAgICAgIG5vUmVzdWx0c1RleHQ6IGludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5Ob1Jlc3VsdHMnIH0pLFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5saW5lRWRpdCkge1xuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IChcbiAgICAgICAgICAgICAgICAgIDxGbG9hdGluZ1NlbGVjdFxuICAgICAgICAgICAgICAgICAgICBuYW1lPXtjb2wudmFsdWVLZXlQYXRoLmpvaW4oKSArICctZWRpdC0nICsgcm93SW5kZXh9XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e3NlbGVjdE9wdGlvbnN9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uRWRpdENlbGxWYWx1ZUNoYW5nZShyb3dJbmRleCwgY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMub25FZGl0Q2VsbEJsdXIocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMub25DZWxsRm9jdXMoJ2VkaXQnLCBjb2wuY29tcG9uZW50VHlwZSwgcm93SW5kZXgsIGNvbHVtbi5jb2x1bW5LZXkpfVxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hhYmxlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgY2xlYXJhYmxlPXshY29sLmlzUmVxdWlyZWR9XG4gICAgICAgICAgICAgICAgICAgIGJhY2tzcGFjZVJlbW92ZXM9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICB0YWJTZWxlY3RzVmFsdWU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBvcGVuT25Gb2N1c1xuICAgICAgICAgICAgICAgICAgICByZWY9e3RoaXMuaGFuZGxlRWRpdENlbGxSZWYocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICBpZDogYG9jRGF0YWdyaWRFZGl0SW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX0tJHtyb3dJbmRleH1gLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmVkaXRDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnZWRpdCcpfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5zZWxlY3RUcmFuc2xhdGlvbnN9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gKFxuICAgICAgICAgICAgICAgICAgPEZsb2F0aW5nU2VsZWN0XG4gICAgICAgICAgICAgICAgICAgIG5hbWU9e2NvbC52YWx1ZUtleVBhdGguam9pbigpICsgJy1jcmVhdGUtJyArIHJvd0luZGV4fVxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zPXtzZWxlY3RPcHRpb25zfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRDcmVhdGVJdGVtVmFsdWUocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlKHJvd0luZGV4LCBjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5vbkNyZWF0ZUNlbGxCbHVyKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hhYmxlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgY2xlYXJhYmxlPXshY29sLmlzUmVxdWlyZWR9XG4gICAgICAgICAgICAgICAgICAgIGJhY2tzcGFjZVJlbW92ZXM9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICB0YWJTZWxlY3RzVmFsdWU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBvcGVuT25Gb2N1c1xuICAgICAgICAgICAgICAgICAgICByZWY9e3RoaXMuaGFuZGxlQ3JlYXRlQ2VsbFJlZihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICAgIGlkOiBgb2NEYXRhZ3JpZENyZWF0ZUlucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YCxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5jcmVhdGVDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnY3JlYXRlJyl9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgey4uLnNlbGVjdFRyYW5zbGF0aW9uc31cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuZmlsdGVyaW5nKSB7XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IChcbiAgICAgICAgICAgICAgICAgIDxGbG9hdGluZ1NlbGVjdFxuICAgICAgICAgICAgICAgICAgICBuYW1lPXtjb2wudmFsdWVLZXlQYXRoLmpvaW4oKSArICctZmlsdGVyJ31cbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucz17c2VsZWN0T3B0aW9uc31cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0RmlsdGVySXRlbVZhbHVlKGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uRmlsdGVyQ2VsbFZhbHVlQ2hhbmdlKGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoYWJsZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyYWJsZVxuICAgICAgICAgICAgICAgICAgICB0YWJTZWxlY3RzVmFsdWU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBvcGVuT25Gb2N1c1xuICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgaWQ6IGBvY0RhdGFncmlkRmlsdGVySW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX1gLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmZpbHRlckNvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5zZWxlY3RUcmFuc2xhdGlvbnN9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlICdjaGVja2JveCc6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgaW50bCB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBbXG4gICAgICAgICAgICAgIHsgdmFsdWU6IHRydWUsIGxhYmVsOiBpbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuQ2hlY2tlZCcgfSkgfSxcbiAgICAgICAgICAgICAgeyB2YWx1ZTogZmFsc2UsIGxhYmVsOiBpbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuVW5DaGVja2VkJyB9KSB9LFxuICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0VHJhbnNsYXRpb25zID0gY29sLnNlbGVjdENvbXBvbmVudFRyYW5zbGF0aW9ucyB8fCB7XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBpbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuU2VsZWN0JyB9KSxcbiAgICAgICAgICAgICAgbm9SZXN1bHRzVGV4dDogaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0Lk5vUmVzdWx0cycgfSksXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5pbmxpbmVFZGl0KSB7XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2hlY2tCb3hWYWx1ZVBhcnNlciA9XG4gICAgICAgICAgICAgICAgICByb3dJbmRleCA9PiAoKSA9PiAhKHRoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKSB8fCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gKFxuICAgICAgICAgICAgICAgICAgPENoZWNrYm94XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKSB8fCBmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25FZGl0Q2VsbFZhbHVlQ2hhbmdlKHJvd0luZGV4LCBjb2wsIGNoZWNrQm94VmFsdWVQYXJzZXIocm93SW5kZXgpKX1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLm9uRWRpdENlbGxCbHVyKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLm9uQ2VsbEZvY3VzKCdlZGl0JywgY29sLmNvbXBvbmVudFR5cGUsIHJvd0luZGV4LCBjb2x1bW4uY29sdW1uS2V5KX1cbiAgICAgICAgICAgICAgICAgICAgcmVmPXt0aGlzLmhhbmRsZUVkaXRDZWxsUmVmKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmZpbHRlckNvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrQm94VmFsdWVQYXJzZXIgPVxuICAgICAgICAgICAgICAgICAgcm93SW5kZXggPT4gKCkgPT4gISh0aGlzLmdldENyZWF0ZUl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKSB8fCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiAoXG4gICAgICAgICAgICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5nZXRDcmVhdGVJdGVtVmFsdWUocm93SW5kZXgsIGNvbCkgfHwgZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlKHJvd0luZGV4LCBjb2wsIGNoZWNrQm94VmFsdWVQYXJzZXIocm93SW5kZXgpKX1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLm9uQ3JlYXRlQ2VsbEJsdXIocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UmVmPXt0aGlzLmhhbmRsZUNyZWF0ZUNlbGxSZWYocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuZmlsdGVyQ29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuZmlsdGVyaW5nKSB7XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IChcbiAgICAgICAgICAgICAgICAgIDxGbG9hdGluZ1NlbGVjdFxuICAgICAgICAgICAgICAgICAgICBuYW1lPXtjb2wudmFsdWVLZXlQYXRoLmpvaW4oKSArICctZmlsdGVyJ31cbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucz17c2VsZWN0T3B0aW9uc31cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0RmlsdGVySXRlbVZhbHVlKGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uRmlsdGVyQ2VsbFZhbHVlQ2hhbmdlKGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoYWJsZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyYWJsZVxuICAgICAgICAgICAgICAgICAgICB0YWJTZWxlY3RzVmFsdWU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBvcGVuT25Gb2N1c1xuICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgaWQ6IGBvY0RhdGFncmlkRmlsdGVySW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX1gLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmZpbHRlckNvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5zZWxlY3RUcmFuc2xhdGlvbnN9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb2x1bW5zLnB1c2goY29sdW1uKTtcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLnByb3BzLmlzQ3JlYXRpbmcpIHtcbiAgICAgIGNvbHVtbnMucHVzaCh7XG4gICAgICAgIHdpZHRoOiAzNyxcbiAgICAgICAgaXNSZXNpemFibGU6IGZhbHNlLFxuICAgICAgICBjb2x1bW5LZXk6ICdyZW1vdmVOZXdJdGVtJyxcbiAgICAgICAgY2VsbDogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbEVkaXQ6ICgpID0+IG51bGwsXG4gICAgICAgIGNlbGxDcmVhdGU6IHJvd0luZGV4ID0+IChcbiAgICAgICAgICA8SWNvblxuICAgICAgICAgICAgaWQ9e2BvYy1kYXRhZ3JpZC1uZXctaXRlbS1yZW1vdmUtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgIHR5cGU9XCJpbmRpY2F0b3JcIlxuICAgICAgICAgICAgbmFtZT1cImRlbGV0ZVwiXG4gICAgICAgICAgICB3aWR0aD17MzB9XG4gICAgICAgICAgICBoZWlnaHQ9ezMwfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdGhpcy5wcm9wcy5yZW1vdmVOZXdJdGVtKHRoaXMucHJvcHMuZ3JpZCwgcm93SW5kZXgpfVxuICAgICAgICAgIC8+XG4gICAgICAgICksXG4gICAgICAgIGNlbGxGaWx0ZXI6ICgpID0+IG51bGwsXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbHVtbnM7XG4gIH1cblxuICBpc0NlbGxFZGl0ZWQgPSAocm93SW5kZXgsIGNvbCwgY2VsbFR5cGUpID0+IHtcbiAgICBpZiAoY2VsbFR5cGUgIT09ICdlZGl0Jykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBpZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgaWYgKHRoaXMucHJvcHMuZWRpdERhdGEuZ2V0SW4oW2lkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBoYW5kbGVBZnRlckFkZEl0ZW0gPSAoKSA9PiB7XG4gICAgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCA9IHRydWU7XG4gIH1cblxuICBoYW5kbGVBZnRlckVkaXRQcmVzcyA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLnNpemUpIHtcbiAgICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gdHJ1ZTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjdXJyZW50Um93OiB1bmRlZmluZWQsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVBZnRlclZhbGlkYXRpb25FcnJvciA9ICgpID0+IHtcbiAgICB0aGlzLmZvY3VzVG9FcnJvckNlbGwgPSB0cnVlO1xuICB9XG5cbiAgaGFuZGxlUm93Q2xpY2sgPSAoZSwgcm93SW5kZXgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5yb3dTZWxlY3QgJiYgIXRoaXMucHJvcHMuaXNDcmVhdGluZyAmJiAhdGhpcy5wcm9wcy5pc0VkaXRpbmcpIHtcbiAgICAgIGlmIChlLmN0cmxLZXkgfHwgZS5zaGlmdEtleSkge1xuICAgICAgICBkb2N1bWVudC5nZXRTZWxlY3Rpb24oKS5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICAgIH1cbiAgICAgIC8vIERvbid0IHRyaWdnZXIgc2VsZWN0aW9uIGNoYW5nZSBvbiB3aGVuIHVzZXIgY2xpY2tzIG9uIHNwZWNpYWwgY2VsbHMgbGlrZSBjaGVja2JveC9leHRyYVxuICAgICAgLy8gQ2hlY2sgdGhhdCBjbGlja2VkIG5vZGUncyBwYXJlbnQgb3IgcGFyZW50J3MgcGFyZW50IGRvZXNuJ3QgaGF2ZSBuby1yb3ctc2VsZWN0IGNsYXNzXG4gICAgICBjb25zdCB7IHBhcmVudE5vZGUgfSA9IGUudGFyZ2V0O1xuICAgICAgY29uc3QgcGFyZW50MWNsYXNzID0gcGFyZW50Tm9kZS5jbGFzc05hbWUgJiYgcGFyZW50Tm9kZS5jbGFzc05hbWUuaW5kZXhPZlxuICAgICAgICA/IHBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgIDogJyc7XG4gICAgICAgIGNvbnN0IHBhcmVudDJjbGFzcyA9IHBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUgJiYgcGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZS5pbmRleE9mIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgPyBwYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgIDogJyc7XG4gICAgICAgIGNvbnN0IHBhcmVudDNjbGFzcyA9IHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZSAmJiBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUuaW5kZXhPZiAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgID8gcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgIDogJyc7XG4gICAgICAgIGNvbnN0IHBhcmVudDRjbGFzcyA9IHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lICYmIHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lLmluZGV4T2YgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICA/IHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgIDogJyc7XG4gICAgICBpZiAoXG4gICAgICAgIHBhcmVudDFjbGFzcy5pbmRleE9mKCduby1yb3ctc2VsZWN0JykgPT09IC0xICYmXG4gICAgICAgIHBhcmVudDJjbGFzcy5pbmRleE9mKCduby1yb3ctc2VsZWN0JykgPT09IC0xICYmXG4gICAgICAgIHBhcmVudDNjbGFzcy5pbmRleE9mKCduby1yb3ctc2VsZWN0JykgPT09IC0xICYmXG4gICAgICAgIHBhcmVudDRjbGFzcy5pbmRleE9mKCduby1yb3ctc2VsZWN0JykgPT09IC0xXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5wcm9wcy5pdGVtU2VsZWN0aW9uQ2hhbmdlKFxuICAgICAgICAgIHRoaXMucHJvcHMuZ3JpZCxcbiAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICB0aGlzLnByb3BzLm11bHRpU2VsZWN0ICYmIGUuY3RybEtleSxcbiAgICAgICAgICB0aGlzLnByb3BzLm11bHRpU2VsZWN0ICYmIGUuc2hpZnRLZXksXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLm9uUm93Q2xpY2spIHtcbiAgICAgIHRoaXMucHJvcHMub25Sb3dDbGljayhlLCByb3dJbmRleCwgdGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCkpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGhhbmRsZUNvbnRleHRNZW51ID0gKGUsIHJvd0luZGV4KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuY29udGV4dE1lbnVJdGVtcykge1xuICAgICAgY29uc3Qge1xuICAgICAgICBpdGVtU2VsZWN0aW9uQ2hhbmdlLFxuICAgICAgICBzZWxlY3RlZEl0ZW1zLFxuICAgICAgICBncmlkLFxuICAgICAgICBkYXRhLFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGNvbnRleHRNZW51T3BlbjogdHJ1ZSxcbiAgICAgICAgY29udGV4dE1lbnVYOiBlLmNsaWVudFgsXG4gICAgICAgIGNvbnRleHRNZW51WTogZS5jbGllbnRZLFxuICAgICAgfSk7XG4gICAgICAvLyBJZiBjbGlja2VkIGl0ZW0gaXMgbm90IHNlbGVjdGVkLCBjaGFuZ2Ugc2VsZWN0aW9uIHRvIGl0XG4gICAgICBpZiAoIXNlbGVjdGVkSXRlbXMuaW5jbHVkZXMoZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmdyaWQuaWRLZXlQYXRoXSkpKSB7XG4gICAgICAgIGl0ZW1TZWxlY3Rpb25DaGFuZ2UoZ3JpZCwgcm93SW5kZXgpO1xuICAgICAgfVxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uRG9jdW1lbnRDbGljayk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaGFuZGxlQ29udGV4dE1lbnVJdGVtQ2xpY2sgPSAob25DbGljaywgc2VsZWN0ZWRJdGVtcywgc2VsZWN0ZWREYXRhKSA9PiAoKSA9PiB7XG4gICAgb25DbGljayhzZWxlY3RlZEl0ZW1zLCBzZWxlY3RlZERhdGEpO1xuICB9XG5cbiAgaGFuZGxlUm93SGVpZ2h0R2V0dGVyID0gcm93SW5kZXggPT5cbiAgICB0aGlzLnByb3BzLnJvd0hlaWdodEdldHRlcih0aGlzLnByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSwgcm93SW5kZXgpO1xuXG4gIHJlbmRlckNlbGwgPSBjb2wgPT4gKGNlbGxQcm9wcykgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGlzQ3JlYXRpbmcsXG4gICAgICBpc0VkaXRpbmcsXG4gICAgICBjcmVhdGVEYXRhLFxuICAgICAgc2VsZWN0ZWRDZWxsLFxuICAgICAgZ3JpZCxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHJvd0luZGV4LCAuLi5wcm9wcyB9ID0gY2VsbFByb3BzO1xuICAgIGxldCBjZWxsO1xuICAgIGxldCBjZWxsVHlwZSA9ICd2aWV3JztcbiAgICBsZXQgZXh0cmFSb3dDb3VudCA9IDA7IC8vIGhvdyBtYW55IHJvd3MgdG8gaWdub3JlIGZyb20gdG9wLCBuZXcgKyBmaWx0ZXIgcm93c1xuICAgIGlmIChpc0NyZWF0aW5nKSBleHRyYVJvd0NvdW50ID0gY3JlYXRlRGF0YS5zaXplO1xuICAgIGlmIChpc0NyZWF0aW5nKSB7XG4gICAgICBpZiAocm93SW5kZXggPD0gKGV4dHJhUm93Q291bnQgLSAxKSkge1xuICAgICAgICBpZiAoY29sLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjZWxsID0gY29sLmNlbGxDcmVhdGUocm93SW5kZXgpO1xuICAgICAgICAgIGNlbGxUeXBlID0gJ2NyZWF0ZSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2VsbCA9IG51bGw7XG4gICAgICAgICAgY2VsbFR5cGUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjZWxsID0gY29sLmNlbGwocm93SW5kZXggLSBleHRyYVJvd0NvdW50KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzRWRpdGluZyAmJiBjb2wuY2VsbEVkaXQpIHtcbiAgICAgIGNlbGwgPSBjb2wuY2VsbEVkaXQocm93SW5kZXggLSBleHRyYVJvd0NvdW50KTtcbiAgICAgIGNlbGxUeXBlID0gJ2VkaXQnO1xuICAgIH0gZWxzZSB7XG4gICAgICBjZWxsID0gY29sLmNlbGwocm93SW5kZXggLSBleHRyYVJvd0NvdW50KTtcbiAgICB9XG4gICAgY29uc3QgaXNTcGVjaWFsID0gcHJvcHMuY29sdW1uS2V5ID09PSAnc2VsZWN0aW9uQ2hlY2tib3gnIHx8IHByb3BzLmNvbHVtbktleSA9PT0gJ2V4dHJhQ29sdW1uJztcbiAgICBpZiAoKGNlbGxUeXBlID09PSAndmlldycgfHwgY2VsbFR5cGUgPT09ICdlZGl0JyB8fCBjZWxsVHlwZSA9PT0gJ2NyZWF0ZScpICYmICFpc1NwZWNpYWwpIHtcbiAgICAgIGNvbnN0IGdldFJvd0luZGV4ID0gKGNlbGxUeXBlID09PSAnY3JlYXRlJykgPyByb3dJbmRleCA6IChyb3dJbmRleCAtIGV4dHJhUm93Q291bnQpO1xuICAgICAgY29uc3QgbWVzc2FnZURhdGEgPSB0aGlzLmdldENlbGxNZXNzYWdlcyhnZXRSb3dJbmRleCwgY29sLCBjZWxsVHlwZSk7XG4gICAgICBjb25zdCBpc0VkaXRlZCA9IHRoaXMuaXNDZWxsRWRpdGVkKGdldFJvd0luZGV4LCBjb2wsIGNlbGxUeXBlKTtcbiAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IChzZWxlY3RlZENlbGwuZ2V0KCdyb3dJbmRleCcpID09PSByb3dJbmRleCAmJiBzZWxlY3RlZENlbGwuZ2V0KCdjb2x1bW5LZXknKSA9PT0gcHJvcHMuY29sdW1uS2V5KSA/XG4gICAgICAgICdvYy1kYXRhZ3JpZC1jZWxsIGlzLXNlbGVjdGVkJyA6ICdvYy1kYXRhZ3JpZC1jZWxsJztcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxDZWxsXG4gICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICAgIHN0eWxlPXtjb2wuc3R5bGV9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDZWxsU2VsZWN0KGNlbGxUeXBlLCByb3dJbmRleCwgcHJvcHMuY29sdW1uS2V5KX1cbiAgICAgICAgPlxuICAgICAgICAgIDxDZWxsVG9vbHRpcFxuICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkQ2VsbC0ke2dyaWQuaWR9LSR7cHJvcHMuY29sdW1uS2V5fS0ke3Jvd0luZGV4fWB9XG4gICAgICAgICAgICBpc0VkaXRlZD17aXNFZGl0ZWR9XG4gICAgICAgICAgICBpc0Vycm9yPXshIW1lc3NhZ2VEYXRhLmVycm9yTWVzc2FnZX1cbiAgICAgICAgICAgIGlzV2FybmluZz17ISFtZXNzYWdlRGF0YS53YXJuaW5nTWVzc2FnZX1cbiAgICAgICAgICAgIGluZm9NZXNzYWdlPXttZXNzYWdlRGF0YS5pbmZvTWVzc2FnZX1cbiAgICAgICAgICAgIGVycm9yTWVzc2FnZT17bWVzc2FnZURhdGEuZXJyb3JNZXNzYWdlfVxuICAgICAgICAgICAgd2FybmluZ01lc3NhZ2U9e21lc3NhZ2VEYXRhLndhcm5pbmdNZXNzYWdlfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHsgY2VsbCB9XG4gICAgICAgICAgPC9DZWxsVG9vbHRpcD5cbiAgICAgICAgPC9DZWxsPlxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxDZWxsIHsuLi5wcm9wc30gY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtY2VsbFwiIHN0eWxlPXtjb2wuc3R5bGV9PnsgY2VsbCB9PC9DZWxsPlxuICAgICk7XG4gIH1cblxuICByZW5kZXJDb2x1bW5zID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5hbGxEYXRhU2l6ZSAmJiAhdGhpcy5wcm9wcy5pc0J1c3kgJiYgIXRoaXMucHJvcHMuaXNDcmVhdGluZykge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPENvbHVtblxuICAgICAgICAgIGNvbHVtbktleT1cImRhdGFFbXB0eUNvbHVtblwiXG4gICAgICAgICAgaGVhZGVyPXs8Q2VsbCBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInIH19PjxNIGlkPVwiR3JpZC5Ob0l0ZW1zXCIgLz48L0NlbGw+fVxuICAgICAgICAgIHdpZHRoPXsxMH1cbiAgICAgICAgICBpc1Jlc2l6YWJsZT17ZmFsc2V9XG4gICAgICAgICAgZmxleEdyb3c9ezF9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoIXRoaXMucHJvcHMudmlzaWJsZUNvbHVtbnMuc2l6ZSkge1xuICAgICAgaWYgKHRoaXMucHJvcHMuaXNCdXN5KSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPENvbHVtblxuICAgICAgICAgICAgY29sdW1uS2V5PVwiZGF0YUVtcHR5Q29sdW1uXCJcbiAgICAgICAgICAgIGhlYWRlcj17PENlbGw+Jm5ic3A7PC9DZWxsPn1cbiAgICAgICAgICAgIHdpZHRoPXsxMH1cbiAgICAgICAgICAgIGlzUmVzaXphYmxlPXtmYWxzZX1cbiAgICAgICAgICAgIGZsZXhHcm93PXsxfVxuICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Q29sdW1uXG4gICAgICAgICAgY29sdW1uS2V5PVwiZGF0YUVtcHR5Q29sdW1uXCJcbiAgICAgICAgICBoZWFkZXI9ezxDZWxsIHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicgfX0+PE0gaWQ9XCJHcmlkLk5vQ29sdW1uc1wiIC8+PC9DZWxsPn1cbiAgICAgICAgICB3aWR0aD17MTB9XG4gICAgICAgICAgaXNSZXNpemFibGU9e2ZhbHNlfVxuICAgICAgICAgIGZsZXhHcm93PXsxfVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3QgY29sdW1ucyA9IHRoaXMuZ2VuZXJhdGVDb2x1bW5zKCk7XG4gICAgaWYgKGNvbHVtbnMubGVuZ2h0ID09PSAwKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gY29sdW1ucy5tYXAoY29sID0+IChcbiAgICAgIDxDb2x1bW5cbiAgICAgICAga2V5PXtjb2wuY29sdW1uS2V5fVxuICAgICAgICBjb2x1bW5LZXk9e2NvbC5jb2x1bW5LZXl9XG4gICAgICAgIGhlYWRlcj17XG4gICAgICAgICAgPEhlYWRlckNlbGxcbiAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZEhlYWRlci0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2wuY29sdW1uS2V5fWB9XG4gICAgICAgICAgICBncmlkPXt0aGlzLnByb3BzLmdyaWR9XG4gICAgICAgICAgICBjb2x1bW5zPXt0aGlzLnByb3BzLmNvbHVtbnN9XG4gICAgICAgICAgICBjb2x1bW49e2NvbH1cbiAgICAgICAgICAgIGN1cnJlbnRTb3J0Q29sdW1uPXt0aGlzLnByb3BzLnNvcnRDb2x1bW59XG4gICAgICAgICAgICBjdXJyZW50U29ydE9yZGVyPXt0aGlzLnByb3BzLnNvcnRPcmRlcn1cbiAgICAgICAgICAgIG9uU29ydENoYW5nZT17dGhpcy5wcm9wcy5zb3J0Q2hhbmdlfVxuICAgICAgICAgICAgaXNCdXN5PXt0aGlzLnByb3BzLmlzQnVzeX1cbiAgICAgICAgICAgIGZpbHRlcmluZz17dGhpcy5wcm9wcy5pc0ZpbHRlcmluZ31cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7Y29sLmhlYWRlcn1cbiAgICAgICAgICA8L0hlYWRlckNlbGw+XG4gICAgICAgIH1cbiAgICAgICAgY2VsbD17dGhpcy5yZW5kZXJDZWxsKGNvbCl9XG4gICAgICAgIHdpZHRoPXt0aGlzLnByb3BzLmNvbHVtbldpZHRocy5nZXQoY29sLmNvbHVtbktleSwgY29sLndpZHRoKX1cbiAgICAgICAgbWluV2lkdGg9e2NvbC5taW5XaWR0aH1cbiAgICAgICAgbWF4V2lkdGg9e2NvbC5tYXhXaWR0aH1cbiAgICAgICAgaXNSZXNpemFibGU9e2NvbC5pc1Jlc2l6YWJsZX1cbiAgICAgICAgZmxleEdyb3c9e2NvbC5mbGV4R3JvdyA/IGNvbC5mbGV4R3JvdyA6IDB9XG4gICAgICAgIGZpeGVkPXtjb2wuZml4ZWR9XG4gICAgICAgIGFsbG93Q2VsbHNSZWN5Y2xpbmc9e2NvbC5hbGxvd0NlbGxzUmVjeWNsaW5nfVxuICAgICAgLz4pKTtcbiAgfVxuXG4gIHJlbmRlckNvbnRleHRNZW51ID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGNvbnRleHRNZW51SXRlbXMsXG4gICAgICBkYXRhLFxuICAgICAgZ3JpZCxcbiAgICAgIHNlbGVjdGVkSXRlbXMsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge1xuICAgICAgY29udGV4dE1lbnVYLFxuICAgICAgY29udGV4dE1lbnVZLFxuICAgIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHN0eWxlID0ge1xuICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgIHpJbmRleDogMTAwMDAsXG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIHRvcDogYCR7Y29udGV4dE1lbnVZfXB4YCxcbiAgICAgIGxlZnQ6IGAke2NvbnRleHRNZW51WH1weGAsXG4gICAgfTtcbiAgICBjb25zdCBzZWxlY3RlZERhdGEgPSBkYXRhLmZpbHRlcihkID0+IHNlbGVjdGVkSXRlbXMuaW5jbHVkZXMoZC5nZXRJbihncmlkLmlkS2V5UGF0aCkpKTtcbiAgICByZXR1cm4gKFxuICAgICAgPHVsIGNsYXNzTmFtZT1cImRyb3Bkb3duLW1lbnUgb2MtZGF0YWdyaWQtY29udGV4dC1tZW51IG9wZW5cIiBzdHlsZT17c3R5bGV9PlxuICAgICAgICB7IGNvbnRleHRNZW51SXRlbXMgJiYgY29udGV4dE1lbnVJdGVtcy5tYXAgJiYgY29udGV4dE1lbnVJdGVtcy5tYXAoKGl0ZW0sIGkpID0+IHtcbiAgICAgICAgICBsZXQgeyBkaXNhYmxlZCB9ID0gaXRlbTtcbiAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0uZGlzYWJsZWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGRpc2FibGVkID0gaXRlbS5kaXNhYmxlZChzZWxlY3RlZEl0ZW1zLCBzZWxlY3RlZERhdGEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPE1lbnVJdGVtXG4gICAgICAgICAgICAgIGtleT17aX0gLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAgICAgICBoZWFkZXI9e2l0ZW0uaGVhZGVyfVxuICAgICAgICAgICAgICBkaXZpZGVyPXtpdGVtLmRpdmlkZXJ9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgdGl0bGU9e2l0ZW0udGl0bGV9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9eyhkaXNhYmxlZCB8fCAhaXRlbS5vbkNsaWNrKSA/IG51bGwgOiB0aGlzLmhhbmRsZUNvbnRleHRNZW51SXRlbUNsaWNrKFxuICAgICAgICAgICAgICAgIGl0ZW0ub25DbGljayxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEl0ZW1zLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkRGF0YSxcbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgeyBpdGVtLnZhbHVlIH1cbiAgICAgICAgICAgIDwvTWVudUl0ZW0+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSkgfVxuICAgICAgPC91bD5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGdyaWRDbGFzc05hbWUgPSBjbGFzc05hbWVzKHtcbiAgICAgICdvYy1kYXRhZ3JpZC1jb250YWluZXInOiB0cnVlLFxuICAgICAgJ3dpdGgtYWN0aW9uYmFyJzogdGhpcy5wcm9wcy5pbmxpbmVFZGl0ICYmICF0aGlzLnByb3BzLmRpc2FibGVBY3Rpb25CYXIsXG4gICAgICAnaXMtYnVzeSc6IHRoaXMucHJvcHMuaXNCdXN5LFxuICAgICAgJ2lzLWVkaXRpbmcnOiB0aGlzLnByb3BzLmlzRWRpdGluZyxcbiAgICAgICdpcy1jcmVhdGluZyc6IHRoaXMucHJvcHMuaXNDcmVhdGluZyxcbiAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgfSk7XG5cbiAgICAvLyBjaGVjayBpZiB0aGVyZSBpcyBhIG5ldyByZXF1ZXN0IHRvIGNoYW5nZSBlZGl0IG1vZGUgZm9jdXNcbiAgICB0aGlzLnNldEZvY3VzVG8odGhpcy5wcm9wcy5mb2N1c1R5cGUpO1xuXG4gICAgbGV0IGFjdGlvbkJhciA9IG51bGw7XG4gICAgbGV0IGFjdGlvbkJhclJpZ2h0ID0gbnVsbDtcbiAgICBsZXQgYWN0aW9uQmFyTGVmdCA9IG51bGw7XG4gICAgaWYgKFxuICAgICAgKHRoaXMucHJvcHMuYWN0aW9uQmFyIHx8XG4gICAgICB0aGlzLnByb3BzLmlubGluZUVkaXQgfHxcbiAgICAgIHRoaXMucHJvcHMuZmlsdGVyaW5nIHx8XG4gICAgICB0aGlzLnByb3BzLnJlbW92aW5nKSAmJlxuICAgICAgIXRoaXMucHJvcHMuZGlzYWJsZUFjdGlvbkJhclxuICAgICkge1xuICAgICAgYWN0aW9uQmFyUmlnaHQgPSAoXG4gICAgICAgIDxBY3Rpb25CYXIgcG9zaXRpb249XCJyaWdodFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtYWN0aW9uYmFyLXJpZ2h0XCI+eyB0aGlzLnByb3BzLmFjdGlvbkJhciB9PC9kaXY+XG4gICAgICAgICAgeyAodGhpcy5wcm9wcy5maWx0ZXJpbmcgJiYgdGhpcy5wcm9wcy5kaXNhYmxlRHJvcGRvd25cbiAgICAgICAgICAgICYmICF0aGlzLnByb3BzLmRpc2FibGVGaWx0ZXJpbmdDb250cm9scykgJiZcbiAgICAgICAgICAgIDxGaWx0ZXJpbmdDb250cm9scyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgICB9XG4gICAgICAgICAgeyB0aGlzLnByb3BzLmlubGluZUVkaXQgJiZcbiAgICAgICAgICAgIDxJbmxpbmVFZGl0Q29udHJvbHNcbiAgICAgICAgICAgICAgYWZ0ZXJBZGRJdGVtPXt0aGlzLmhhbmRsZUFmdGVyQWRkSXRlbX1cbiAgICAgICAgICAgICAgYWZ0ZXJFZGl0UHJlc3M9e3RoaXMuaGFuZGxlQWZ0ZXJFZGl0UHJlc3N9XG4gICAgICAgICAgICAgIGFmdGVyVmFsaWRhdGlvbkVycm9yPXt0aGlzLmhhbmRsZUFmdGVyVmFsaWRhdGlvbkVycm9yfVxuICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgfVxuICAgICAgICAgIHsgKHRoaXMucHJvcHMuZHJvcGRvd25NZW51SXRlbXMgfHxcbiAgICAgICAgICAgICB0aGlzLnByb3BzLnJlbW92aW5nIHx8XG4gICAgICAgICAgICAgdGhpcy5wcm9wcy5jb2x1bW5TZXR0aW5ncyB8fFxuICAgICAgICAgICAgICh0aGlzLnByb3BzLmZpbHRlcmluZyAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlRHJvcGRvd24pKSAmJlxuICAgICAgICAgICAgIDxEcm9wZG93bkNvbnRyb2xzIHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICAgIH1cbiAgICAgICAgPC9BY3Rpb25CYXI+XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5hY3Rpb25CYXJMZWZ0IHx8IHRoaXMucHJvcHMuZ3JpZEhlYWRlcikge1xuICAgICAgYWN0aW9uQmFyTGVmdCA9IChcbiAgICAgICAgPEFjdGlvbkJhciBwb3NpdGlvbj1cImxlZnRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWdyaWRoZWFkZXJcIj57IHRoaXMucHJvcHMuZ3JpZEhlYWRlciB9PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1hY3Rpb25iYXItbGVmdFwiPnsgdGhpcy5wcm9wcy5hY3Rpb25CYXJMZWZ0IH08L2Rpdj5cbiAgICAgICAgPC9BY3Rpb25CYXI+XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoYWN0aW9uQmFyTGVmdCB8fCBhY3Rpb25CYXJSaWdodCkge1xuICAgICAgYWN0aW9uQmFyID0gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWFjdGlvbmJhci1jb250YWluZXJcIj5cbiAgICAgICAgICB7IGFjdGlvbkJhckxlZnQgfVxuICAgICAgICAgIHsgYWN0aW9uQmFyUmlnaHQgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICAgIGxldCByb3dzQ291bnQgPVxuICAgICAgKHRoaXMucHJvcHMucm93c0NvdW50IHx8IHRoaXMucHJvcHMucm93c0NvdW50ID09PSAwKSA/XG4gICAgICAgIHRoaXMucHJvcHMucm93c0NvdW50IDpcbiAgICAgICAgdGhpcy5wcm9wcy5kYXRhLnNpemU7XG4gICAgaWYgKHRoaXMucHJvcHMuaXNDcmVhdGluZykgcm93c0NvdW50ICs9IHRoaXMucHJvcHMuY3JlYXRlRGF0YS5zaXplO1xuICAgIGlmICghdGhpcy5wcm9wcy52aXNpYmxlQ29sdW1ucy5zaXplKSByb3dzQ291bnQgPSAwO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPXtgb2MtZGF0YWdyaWQtJHt0aGlzLnByb3BzLmdyaWQuaWR9YH1cbiAgICAgICAgY2xhc3NOYW1lPXtncmlkQ2xhc3NOYW1lfVxuICAgICAgICBzdHlsZT17dGhpcy5wcm9wcy5jb250YWluZXJTdHlsZX1cbiAgICAgID5cbiAgICAgICAgeyB0aGlzLnByb3BzLmlzQnVzeSAmJiA8U3Bpbm5lciAvPiB9XG4gICAgICAgIHsgdGhpcy5zdGF0ZS5jb250ZXh0TWVudU9wZW4gJiYgdGhpcy5yZW5kZXJDb250ZXh0TWVudSgpIH1cbiAgICAgICAgeyBhY3Rpb25CYXIgfVxuICAgICAgICA8UmVzcG9uc2l2ZUZpeGVkRGF0YVRhYmxlXG4gICAgICAgICAgaWQ9e3RoaXMucHJvcHMuZ3JpZC5pZH1cbiAgICAgICAgICByb3dzQ291bnQ9e3Jvd3NDb3VudH1cbiAgICAgICAgICBoZWFkZXJIZWlnaHQ9e3RoaXMucHJvcHMuaXNGaWx0ZXJpbmcgP1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5oZWFkZXJIZWlnaHQgKyB0aGlzLnByb3BzLmZpbHRlclJvd0hlaWdodFxuICAgICAgICAgICAgOiB0aGlzLnByb3BzLmhlYWRlckhlaWdodH1cbiAgICAgICAgICByb3dIZWlnaHQ9e3RoaXMucHJvcHMucm93SGVpZ2h0fVxuICAgICAgICAgIG9uQ29sdW1uUmVzaXplRW5kQ2FsbGJhY2s9e3RoaXMub25Db2x1bW5SZXNpemVFbmRDYWxsYmFja31cbiAgICAgICAgICBpc0NvbHVtblJlc2l6aW5nPXtmYWxzZX1cbiAgICAgICAgICBvblJvd0NsaWNrPXt0aGlzLmhhbmRsZVJvd0NsaWNrfVxuICAgICAgICAgIHNjcm9sbFRvQ29sdW1uPXt0aGlzLnByb3BzLnNjcm9sbFRvQ29sdW1uIHx8IHRoaXMuc3RhdGUuY3VycmVudENvbHVtbn1cbiAgICAgICAgICBzY3JvbGxUb3A9e3RoaXMucHJvcHMuc2Nyb2xsVG9wfVxuICAgICAgICAgIHNjcm9sbFRvUm93PXt0aGlzLmdldFNjcm9sbFRvUm93KCl9XG4gICAgICAgICAgb25Sb3dEb3VibGVDbGljaz17dGhpcy5wcm9wcy5vblJvd0RvdWJsZUNsaWNrfVxuICAgICAgICAgIG9uUm93TW91c2VEb3duPXt0aGlzLnByb3BzLm9uTW91c2VEb3dufVxuICAgICAgICAgIG9uUm93TW91c2VFbnRlcj17dGhpcy5wcm9wcy5vblJvd01vdXNlRW50ZXJ9XG4gICAgICAgICAgb25Sb3dNb3VzZUxlYXZlPXt0aGlzLnByb3BzLm9uUm93TW91c2VMZWF2ZX1cbiAgICAgICAgICBvblNjcm9sbFN0YXJ0PXt0aGlzLnByb3BzLm9uU2Nyb2xsU3RhcnR9XG4gICAgICAgICAgb25TY3JvbGxFbmQ9e3RoaXMucHJvcHMub25TY3JvbGxFbmR9XG4gICAgICAgICAgcm93Q2xhc3NOYW1lR2V0dGVyPXt0aGlzLmdldFJvd0NsYXNzTmFtZX1cbiAgICAgICAgICByb3dIZWlnaHRHZXR0ZXI9e3RoaXMucHJvcHMucm93SGVpZ2h0R2V0dGVyICYmIHRoaXMuaGFuZGxlUm93SGVpZ2h0R2V0dGVyfVxuICAgICAgICAgIG9uQ29udGVudEhlaWdodENoYW5nZT17dGhpcy5wcm9wcy5vbkNvbnRlbnRIZWlnaHRDaGFuZ2V9XG4gICAgICAgICAgb25Sb3dDb250ZXh0TWVudT17dGhpcy5oYW5kbGVDb250ZXh0TWVudX1cbiAgICAgICAgPlxuICAgICAgICAgIHsgdGhpcy5yZW5kZXJDb2x1bW5zKCkgfVxuICAgICAgICA8L1Jlc3BvbnNpdmVGaXhlZERhdGFUYWJsZT5cbiAgICAgICAgeyB0aGlzLnByb3BzLmlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW4gJiZcbiAgICAgICAgICA8Q29sdW1uU2V0dGluZ3NNb2RhbFxuICAgICAgICAgICAgZ3JpZD17dGhpcy5wcm9wcy5ncmlkfVxuICAgICAgICAgICAgY29sdW1ucz17dGhpcy5wcm9wcy5jb2x1bW5zfVxuICAgICAgICAgICAgdmlzaWJsZUNvbHVtbnM9e3RoaXMucHJvcHMudmlzaWJsZUNvbHVtbnN9XG4gICAgICAgICAgICBjbG9zZUNvbHVtblNldHRpbmdzTW9kYWw9e3RoaXMucHJvcHMuY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsfVxuICAgICAgICAgICAgc2F2ZUNvbHVtblNldHRpbmdzPXt0aGlzLnByb3BzLnNhdmVDb2x1bW5TZXR0aW5nc31cbiAgICAgICAgICAvPlxuICAgICAgICB9XG4gICAgICAgIHsgdGhpcy5wcm9wcy5jaGlsZHJlbiB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=