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
    decimalSeparator: _datagrid5.default.getDecimalSeparator(GRID, state.user),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbImRhdGFncmlkQWN0aW9ucyIsIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwib3duUHJvcHMiLCJHUklEIiwiZ3JpZCIsImlzQnVzeSIsImRhdGFncmlkIiwiZ2V0SW4iLCJpZCIsImlzRWRpdGluZyIsImlzQ3JlYXRpbmciLCJpc0ZpbHRlcmluZyIsImlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW4iLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwidmlzaWJsZUNvbHVtbnMiLCJjb2x1bW5XaWR0aHMiLCJzZWxlY3RlZENlbGwiLCJzZWxlY3RlZEl0ZW1zIiwiZGF0YSIsImVkaXREYXRhIiwiY3JlYXRlRGF0YSIsImZpbHRlckRhdGEiLCJjZWxsTWVzc2FnZXMiLCJjcmVhdGVDZWxsTWVzc2FnZXMiLCJhbGxEYXRhU2l6ZSIsInNpemUiLCJsYW5ndWFnZSIsIlV0aWxzIiwiZ2V0TGFuZ3VhZ2UiLCJ1c2VyIiwicmVnaW9uIiwiZ2V0UmVnaW9uIiwiZGF0ZUZvcm1hdCIsImdldERhdGVGb3JtYXQiLCJ0aG91c2FuZFNlcGFyYXRvciIsImdldFRob3VzYW5kU2VwYXJhdG9yIiwiZGVjaW1hbFNlcGFyYXRvciIsImdldERlY2ltYWxTZXBhcmF0b3IiLCJmb2N1c1R5cGUiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJEYXRhR3JpZCIsImluamVjdEludGwiLCJwcm9wcyIsImN1cnJlbnRSb3ciLCJjdXJyZW50Q29sdW1uIiwiY2VsbFJlZnMiLCJmb2N1c1RvQ3JlYXRlQ2VsbCIsImZvY3VzVG9FZGl0Q2VsbCIsImZvY3VzVG9FcnJvckNlbGwiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImRvY3VtZW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIm9uRG9jdW1lbnRDbGljayIsImludmFsaWRhdGUiLCJyZW5kZXIiLCJncmlkQ2xhc3NOYW1lIiwiaW5saW5lRWRpdCIsImRpc2FibGVBY3Rpb25CYXIiLCJjbGFzc05hbWUiLCJzZXRGb2N1c1RvIiwiYWN0aW9uQmFyIiwiYWN0aW9uQmFyUmlnaHQiLCJhY3Rpb25CYXJMZWZ0IiwiZmlsdGVyaW5nIiwicmVtb3ZpbmciLCJkaXNhYmxlRHJvcGRvd24iLCJkaXNhYmxlRmlsdGVyaW5nQ29udHJvbHMiLCJoYW5kbGVBZnRlckFkZEl0ZW0iLCJoYW5kbGVBZnRlckVkaXRQcmVzcyIsImhhbmRsZUFmdGVyVmFsaWRhdGlvbkVycm9yIiwiZHJvcGRvd25NZW51SXRlbXMiLCJjb2x1bW5TZXR0aW5ncyIsImdyaWRIZWFkZXIiLCJyb3dzQ291bnQiLCJjb250YWluZXJTdHlsZSIsImNvbnRleHRNZW51T3BlbiIsInJlbmRlckNvbnRleHRNZW51IiwiaGVhZGVySGVpZ2h0IiwiZmlsdGVyUm93SGVpZ2h0Iiwicm93SGVpZ2h0Iiwib25Db2x1bW5SZXNpemVFbmRDYWxsYmFjayIsImhhbmRsZVJvd0NsaWNrIiwic2Nyb2xsVG9Db2x1bW4iLCJzY3JvbGxUb3AiLCJnZXRTY3JvbGxUb1JvdyIsIm9uUm93RG91YmxlQ2xpY2siLCJvbk1vdXNlRG93biIsIm9uUm93TW91c2VFbnRlciIsIm9uUm93TW91c2VMZWF2ZSIsIm9uU2Nyb2xsU3RhcnQiLCJvblNjcm9sbEVuZCIsImdldFJvd0NsYXNzTmFtZSIsInJvd0hlaWdodEdldHRlciIsImhhbmRsZVJvd0hlaWdodEdldHRlciIsIm9uQ29udGVudEhlaWdodENoYW5nZSIsImhhbmRsZUNvbnRleHRNZW51IiwicmVuZGVyQ29sdW1ucyIsImNvbHVtbnMiLCJjbG9zZUNvbHVtblNldHRpbmdzTW9kYWwiLCJzYXZlQ29sdW1uU2V0dGluZ3MiLCJjaGlsZHJlbiIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyIsImNvbnRleHRNZW51SXRlbXMiLCJzZXRTdGF0ZSIsIm5ld0NvbHVtbldpZHRoIiwiY29sdW1uS2V5IiwicmVzaXplQ29sdW1uIiwib25DcmVhdGVDZWxsS2V5RG93biIsImUiLCJrZXlDb2RlIiwiS0VZX0NPREVTIiwiRU5URVIiLCJhZGROZXdJdGVtIiwiZ2V0Q29sdW1uRGVmYXVsdFZhbHVlcyIsIm9uRWRpdENlbGxLZXlEb3duIiwiY29sIiwicm93SW5kZXgiLCJlbmFibGVBcnJvd05hdmlnYXRpb24iLCJyb3dzU2l6ZSIsImdldENvbHVtbktleSIsIkRPV04iLCJ2YWx1ZVR5cGUiLCJuZXh0RWxlbWVudCIsIm1vdmVDZWxsRm9jdXMiLCJVUCIsIlRBQiIsIlJJR0hUIiwiTEVGVCIsInByZXZlbnREZWZhdWx0IiwiY29sdW1uSW5kIiwiZmluZEluZGV4IiwiYyIsInZhbHVlS2V5UGF0aCIsImpvaW4iLCJkaXNhYmxlZCIsInJvd0luZCIsInNoaWZ0S2V5IiwibGVuZ3RoIiwibmV4dENvbHVtbktleSIsIm9uRmlsdGVyQ2VsbFZhbHVlQ2hhbmdlIiwidmFsdWVQYXJzZXIiLCJldmVudE9yRGF0YSIsInJhd1ZhbHVlIiwidGFyZ2V0IiwidW5kZWZpbmVkIiwidmFsdWUiLCJmaWx0ZXJDZWxsVmFsdWVDaGFuZ2UiLCJvbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSIsImNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSIsIm9uQ3JlYXRlVmFsdWVDaGFuZ2UiLCJvblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZSIsIm1hdGNoVmFsdWUiLCJuZXdWYWx1ZUtleVBhdGgiLCJ2IiwibmV3VmFsdWUiLCJ2YWxpZGF0b3JzIiwiY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUiLCJvbkVkaXRDZWxsVmFsdWVDaGFuZ2UiLCJkYXRhSWQiLCJnZXREYXRhSWRCeVJvd0luZGV4IiwiZWRpdENlbGxWYWx1ZUNoYW5nZSIsIm9uRWRpdFZhbHVlQ2hhbmdlIiwiZWRpdENlbGxWYWx1ZVZhbGlkYXRlIiwib25DcmVhdGVDZWxsQmx1ciIsIm9uQ3JlYXRlQmx1ciIsImdldEVkaXRJdGVtVmFsdWUiLCJvbkVkaXRDZWxsQmx1ciIsIm9uRWRpdEJsdXIiLCJvbkNlbGxGb2N1cyIsImNlbGxUeXBlIiwiaW5wdXRUeXBlIiwic2VsZWN0IiwiY2VsbFNlbGVjdCIsImNlbGxTZWxlY3Rpb25DaGFuZ2UiLCJpZEtleVBhdGgiLCJnZXRTZWxlY3RlZEl0ZW1JbmRleCIsImluZGV4IiwiZWRpdFZhbHVlIiwib3JpZ2luYWxWYWx1ZSIsImNvbXBvbmVudFR5cGUiLCJTdHJpbmciLCJyZXBsYWNlIiwiZ2V0Q3JlYXRlSXRlbVZhbHVlIiwidmFsIiwiZ2V0RmlsdGVySXRlbVZhbHVlIiwiZ2V0IiwiZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZSIsIm1vZGUiLCJjb21wb25lbnREaXNhYmxlZCIsImRpc2FibGVFZGl0aW5nIiwiZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2giLCJtYXRjaFZhbHVlS2V5UGF0aCIsInJvd0NsYXNzTmFtZXMiLCJleHRyYVJvd0NvdW50IiwicHVzaCIsImluZGV4T2YiLCJyb3dDbGFzc05hbWVHZXR0ZXIiLCJnZXRDZWxsTWVzc2FnZXMiLCJyZXR1cm5EYXRhIiwiaW5mb01lc3NhZ2UiLCJlcnJvck1lc3NhZ2UiLCJ3YXJuaW5nTWVzc2FnZSIsInNjcm9sbFRvUm93Iiwic2Nyb2xsTmV3Um93IiwiZmlyc3QiLCJmb2N1c1RvIiwicHJldkZvY3VzVG8iLCJmb2N1c1RvTGFzdFJvdyIsImhhbmRsZUNlbGxTZWxlY3QiLCJoYW5kbGVDcmVhdGVDZWxsUmVmIiwicmVmIiwiZm9jdXMiLCJoYW5kbGVFZGl0Q2VsbFJlZiIsInNlbGVjdGVkUm93SW5kZXgiLCJjb2x1bW5JbmRleCIsInR5cGUiLCJzZXRUaW1lb3V0IiwiaGFuZGxlU2VsZWN0aW9uQ2hlY2tCb3hPbkNoYW5nZSIsIml0ZW1TZWxlY3Rpb25DaGFuZ2UiLCJnZW5lcmF0ZUNvbHVtbnMiLCJleHRyYUNvbHVtbiIsInRhYkluZGV4Iiwid2lkdGgiLCJpc1Jlc2l6YWJsZSIsImlzU29ydGFibGUiLCJjZWxsIiwidmFsdWVSZW5kZXIiLCJjZWxsRWRpdCIsImNlbGxDcmVhdGUiLCJjZWxsRmlsdGVyIiwicm93U2VsZWN0Q2hlY2tib3hDb2x1bW4iLCJyb3dJdGVtIiwiaXRlbUlkIiwic2VsZWN0ZWQiLCJpbmNsdWRlcyIsImZvckVhY2giLCJ2aXNpYmxlQ29sdW1uS2V5Iiwib3JnQ29sIiwiY29sdW1uIiwiaGVhZGVyIiwibWluV2lkdGgiLCJtYXhXaWR0aCIsImRpc2FibGVSZXNpemluZyIsImZpeGVkIiwiYWxsb3dDZWxsc1JlY3ljbGluZyIsImRpc2FibGVTb3J0aW5nIiwiaXNSZXF1aXJlZCIsInN0eWxlIiwiZ2V0Q2VsbFN0eWxlQnlDb2wiLCJmbGV4R3JvdyIsInNvcnRDb21wYXJhdG9yIiwic29ydFZhbHVlR2V0dGVyIiwidmFsdWVFbXB0eUNoZWNrZXIiLCJnZXRWYWx1ZUVtcHR5Q2hlY2tlciIsImZvcm1hdCIsInJlbmRlckNvbXBvbmVudFByb3BzIiwiY3VycmVuY3lLZXlQYXRoIiwidmFsdWVPcHRpb25zIiwiY3VycmVuY3kiLCJkZWNpbWFscyIsImlzVmFsaWQiLCJtb21lbnQiLCJ1dGMiLCJlZGl0VmFsdWVSZW5kZXIiLCJjcmVhdGVWYWx1ZVJlbmRlciIsImZpbHRlclZhbHVlUmVuZGVyIiwiZWRpdFZhbHVlUGFyc2VyIiwiZWRpdENvbXBvbmVudFByb3BzIiwiY3JlYXRlQ29tcG9uZW50UHJvcHMiLCJmaWx0ZXJDb21wb25lbnRQcm9wcyIsIlJlZ0V4cCIsImludGwiLCJzZWxlY3RPcHRpb25zIiwic2VsZWN0Q29tcG9uZW50T3B0aW9ucyIsInNlbGVjdFRyYW5zbGF0aW9ucyIsInNlbGVjdENvbXBvbmVudFRyYW5zbGF0aW9ucyIsInBsYWNlaG9sZGVyIiwiZm9ybWF0TWVzc2FnZSIsIm5vUmVzdWx0c1RleHQiLCJlZGl0U2VsZWN0T3B0aW9uc01vZCIsInNsaWNlIiwiY3JlYXRlU2VsZWN0T3B0aW9uc01vZCIsImZpbHRlclNlbGVjdE9wdGlvbnNNb2QiLCJvbktleURvd24iLCJvbkJsdXIiLCJvbkZvY3VzIiwibGFiZWwiLCJyZW1vdmVOZXdJdGVtIiwiaXNDZWxsRWRpdGVkIiwicm93U2VsZWN0IiwiY3RybEtleSIsImdldFNlbGVjdGlvbiIsInJlbW92ZUFsbFJhbmdlcyIsInBhcmVudE5vZGUiLCJwYXJlbnQxY2xhc3MiLCJwYXJlbnQyY2xhc3MiLCJwYXJlbnQzY2xhc3MiLCJwYXJlbnQ0Y2xhc3MiLCJtdWx0aVNlbGVjdCIsIm9uUm93Q2xpY2siLCJzdG9wUHJvcGFnYXRpb24iLCJjb250ZXh0TWVudVgiLCJjbGllbnRYIiwiY29udGV4dE1lbnVZIiwiY2xpZW50WSIsImFkZEV2ZW50TGlzdGVuZXIiLCJoYW5kbGVDb250ZXh0TWVudUl0ZW1DbGljayIsIm9uQ2xpY2siLCJzZWxlY3RlZERhdGEiLCJyZW5kZXJDZWxsIiwiY2VsbFByb3BzIiwiaXNTcGVjaWFsIiwiZ2V0Um93SW5kZXgiLCJtZXNzYWdlRGF0YSIsImlzRWRpdGVkIiwidGV4dEFsaWduIiwibGVuZ2h0IiwibWFwIiwic29ydENoYW5nZSIsImRpc3BsYXkiLCJ6SW5kZXgiLCJwb3NpdGlvbiIsInRvcCIsImxlZnQiLCJmaWx0ZXIiLCJkIiwiaXRlbSIsImkiLCJkaXZpZGVyIiwidGl0bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7b0RBQUE7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBS0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0lBQVlBLGU7O0FBQ1o7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUMsa0JBQWtCLFNBQWxCQSxlQUFrQixDQUFDQyxLQUFELEVBQVFDLFFBQVIsRUFBcUI7QUFDM0MsTUFBTUMsT0FBT0QsU0FBU0UsSUFBdEI7QUFDQSxTQUFPO0FBQ0xDLFlBQVFKLE1BQU1LLFFBQU4sQ0FBZUMsS0FBZixDQUFxQixDQUFDSixLQUFLSyxFQUFOLEVBQVUsU0FBVixFQUFxQixRQUFyQixDQUFyQixF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R0FBOEIsSUFBOUIsR0FBcUMsT0FBS0QsMEJBQUwsQ0FDNUNvQixLQUFLbkIsT0FEdUMsRUFFNUNwUyxhQUY0QyxFQUc1Q3FTLFlBSDRDO0FBTmhEO0FBWUlrQixlQUFLckw7QUFaVCxTQURGO0FBZ0JELE9BckI2QztBQURoRCxLQURGO0FBMEJELEc7O2tCQTV5Q2tCM0csUSIsImZpbGUiOiJkYXRhZ3JpZC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1sb25lbHktaWYsIHByZWZlci10ZW1wbGF0ZSwgcmVhY3QvcmVxdWlyZS1kZWZhdWx0LXByb3BzICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTWFwLCBMaXN0IH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge1xuICBpbmplY3RJbnRsLFxuICBGb3JtYXR0ZWRNZXNzYWdlIGFzIE0sXG4gIEZvcm1hdHRlZE51bWJlciBhcyBOLFxufSBmcm9tICdyZWFjdC1pbnRsJztcbmltcG9ydCB7IENvbHVtbiwgQ2VsbCB9IGZyb20gJ2ZpeGVkLWRhdGEtdGFibGUtMic7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgTWVudUl0ZW0gfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBGbG9hdGluZ1NlbGVjdCB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWZsb2F0aW5nLXNlbGVjdCc7XG5pbXBvcnQgeyBEYXRlSW5wdXQgfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1kYXRldGltZSc7XG5pbXBvcnQgeyBJY29uIH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtaWNvbnMnO1xuaW1wb3J0IHsgU3Bpbm5lciB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXNwaW5uZXInO1xuaW1wb3J0IENoZWNrYm94IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWNoZWNrYm94JztcbmltcG9ydCB7IGZvcm1hdEN1cnJlbmN5QW1vdW50IH0gZnJvbSAnQG9wdXNjYXBpdGEvZm9ybWF0LXV0aWxzJztcbmltcG9ydCAnZml4ZWQtZGF0YS10YWJsZS0yL2Rpc3QvZml4ZWQtZGF0YS10YWJsZS5jc3MnO1xuXG5pbXBvcnQgUmVzcG9uc2l2ZUZpeGVkRGF0YVRhYmxlIGZyb20gJy4vcmVzcG9uc2l2ZS1maXhlZC1kYXRhLXRhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgSGVhZGVyQ2VsbCBmcm9tICcuL2hlYWRlci1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgQWN0aW9uQmFyIGZyb20gJy4vYWN0aW9uLWJhci5jb21wb25lbnQnO1xuaW1wb3J0IElubGluZUVkaXRDb250cm9scyBmcm9tICcuL2lubGluZS1lZGl0LWNvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgRmlsdGVyaW5nQ29udHJvbHMgZnJvbSAnLi9maWx0ZXJpbmctY29udHJvbHMuY29tcG9uZW50JztcbmltcG9ydCBEcm9wZG93bkNvbnRyb2xzIGZyb20gJy4vZHJvcGRvd24tY29udHJvbHMuY29tcG9uZW50JztcbmltcG9ydCAqIGFzIGRhdGFncmlkQWN0aW9ucyBmcm9tICcuL2RhdGFncmlkLmFjdGlvbnMnO1xuaW1wb3J0IENlbGxUb29sdGlwIGZyb20gJy4vY2VsbC10b29sdGlwLmNvbXBvbmVudCc7XG5pbXBvcnQgQ29sdW1uU2V0dGluZ3NNb2RhbCBmcm9tICcuL2NvbHVtbi1zZXR0aW5ncy9jb2x1bW4tc2V0dGluZ3MuY29tcG9uZW50JztcbmltcG9ydCB7IHByb3BUeXBlcywgZGVmYXVsdFByb3BzIH0gZnJvbSAnLi9kYXRhZ3JpZC5wcm9wcyc7XG5pbXBvcnQgeyBLRVlfQ09ERVMgfSBmcm9tICcuL2RhdGFncmlkLmNvbnN0YW50cyc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9kYXRhZ3JpZC51dGlscyc7XG5pbXBvcnQgJy4vZGF0YWdyaWQuY29tcG9uZW50LnNjc3MnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUsIG93blByb3BzKSA9PiB7XG4gIGNvbnN0IEdSSUQgPSBvd25Qcm9wcy5ncmlkO1xuICByZXR1cm4ge1xuICAgIGlzQnVzeTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2lzQnVzeSddLCB0cnVlKSxcbiAgICBpc0VkaXRpbmc6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdpc0VkaXRpbmcnXSwgZmFsc2UpLFxuICAgIGlzQ3JlYXRpbmc6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdpc0NyZWF0aW5nJ10sIGZhbHNlKSxcbiAgICBpc0ZpbHRlcmluZzpcbiAgICAgIHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnaXNGaWx0ZXJpbmcnXSwgZmFsc2UpLFxuICAgIGlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW46XG4gICAgICBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnY29sdW1uU2V0dGluZ3NNb2RhbCcsICdvcGVuJ10sIGZhbHNlKSxcbiAgICBzb3J0Q29sdW1uOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdzb3J0aW5nRGF0YScsICdzb3J0Q29sdW1uJ10sIG51bGwpLFxuICAgIHNvcnRPcmRlcjogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnc29ydGluZ0RhdGEnLCAnc29ydE9yZGVyJ10sIG51bGwpLFxuICAgIHZpc2libGVDb2x1bW5zOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICd2aXNpYmxlQ29sdW1ucyddLCBMaXN0KCkpLFxuICAgIGNvbHVtbldpZHRoczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnY29sdW1uV2lkdGhzJ10sIE1hcCgpKSxcbiAgICBzZWxlY3RlZENlbGw6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2VsZWN0ZWRDZWxsJ10sIE1hcCgpKSxcbiAgICBzZWxlY3RlZEl0ZW1zOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3NlbGVjdGVkSXRlbXMnXSwgTGlzdCgpKSxcbiAgICBkYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2RhdGEnXSwgTGlzdCgpKSxcbiAgICBlZGl0RGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdlZGl0RGF0YSddLCBNYXAoKSksXG4gICAgY3JlYXRlRGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjcmVhdGVEYXRhJ10sIExpc3QoKSksXG4gICAgZmlsdGVyRGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdmaWx0ZXJEYXRhJ10sIE1hcCgpKSxcbiAgICBjZWxsTWVzc2FnZXM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY2VsbE1lc3NhZ2VzJ10sIE1hcCgpKSxcbiAgICBjcmVhdGVDZWxsTWVzc2FnZXM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY3JlYXRlQ2VsbE1lc3NhZ2VzJ10sIE1hcCgpKSxcbiAgICBhbGxEYXRhU2l6ZTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdhbGxEYXRhJ10sIExpc3QoKSkuc2l6ZSxcbiAgICBsYW5ndWFnZTogVXRpbHMuZ2V0TGFuZ3VhZ2UoR1JJRCwgc3RhdGUudXNlciksXG4gICAgcmVnaW9uOiBVdGlscy5nZXRSZWdpb24oR1JJRCwgc3RhdGUudXNlciksXG4gICAgZGF0ZUZvcm1hdDogVXRpbHMuZ2V0RGF0ZUZvcm1hdChHUklELCBzdGF0ZS51c2VyKSxcbiAgICB0aG91c2FuZFNlcGFyYXRvcjogVXRpbHMuZ2V0VGhvdXNhbmRTZXBhcmF0b3IoR1JJRCwgc3RhdGUudXNlciksXG4gICAgZGVjaW1hbFNlcGFyYXRvcjogVXRpbHMuZ2V0RGVjaW1hbFNlcGFyYXRvcihHUklELCBzdGF0ZS51c2VyKSxcbiAgICBmb2N1c1R5cGU6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdmb2N1c1R5cGUnXSwgTWFwKCkpLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGF0YWdyaWRBY3Rpb25zO1xuXG5AaW5qZWN0SW50bFxuQGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRhR3JpZCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0gcHJvcFR5cGVzO1xuICBzdGF0aWMgZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjdXJyZW50Um93OiAwLFxuICAgICAgY3VycmVudENvbHVtbjogMCxcbiAgICB9O1xuICAgIHRoaXMuY2VsbFJlZnMgPSB7fTtcbiAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsID0gZmFsc2U7XG4gICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTsgLy8gVE9ETzogSGFuZGxlIGZvY3VzaW5nIHdoZW4gdHJ1ZVxuICAgIHRoaXMuZm9jdXNUb0Vycm9yQ2VsbCA9IGZhbHNlOyAvLyBUT0RPOiBIYW5kbGUgZm9jdXNpbmcgd2hlbiB0cnVlXG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25Eb2N1bWVudENsaWNrKTtcbiAgICB0aGlzLnByb3BzLmludmFsaWRhdGUodGhpcy5wcm9wcy5ncmlkKTtcbiAgfVxuXG4gIG9uRG9jdW1lbnRDbGljayA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5jb250ZXh0TWVudUl0ZW1zKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY29udGV4dE1lbnVPcGVuOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25Eb2N1bWVudENsaWNrKTtcbiAgfVxuXG4gIG9uQ29sdW1uUmVzaXplRW5kQ2FsbGJhY2sgPSAobmV3Q29sdW1uV2lkdGgsIGNvbHVtbktleSkgPT4ge1xuICAgIHRoaXMucHJvcHMucmVzaXplQ29sdW1uKHRoaXMucHJvcHMuZ3JpZCwgY29sdW1uS2V5LCBuZXdDb2x1bW5XaWR0aCk7XG4gIH1cblxuICBvbkNyZWF0ZUNlbGxLZXlEb3duID0gKGUpID0+IHtcbiAgICBpZiAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuRU5URVIpIHtcbiAgICAgIHRoaXMucHJvcHMuYWRkTmV3SXRlbSh0aGlzLnByb3BzLmdyaWQsIFV0aWxzLmdldENvbHVtbkRlZmF1bHRWYWx1ZXModGhpcy5wcm9wcy5jb2x1bW5zKSk7XG4gICAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBvbkVkaXRDZWxsS2V5RG93biA9IChjb2wsIHJvd0luZGV4KSA9PiAoZSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZUFycm93TmF2aWdhdGlvbikge1xuICAgICAgY29uc3QgeyBjb2x1bW5zIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3Qgcm93c1NpemUgPSB0aGlzLnByb3BzLmRhdGEuc2l6ZTtcbiAgICAgIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2wpO1xuICAgICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuRE9XTjoge1xuICAgICAgICAgIGlmIChjb2wudmFsdWVUeXBlICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgY29uc3QgbmV4dEVsZW1lbnQgPSB0aGlzLmNlbGxSZWZzW2Ake3RoaXMucHJvcHMuZ3JpZC5pZH1fJHtjb2x1bW5LZXl9XyR7cm93SW5kZXggKyAxfWBdO1xuICAgICAgICAgICAgdGhpcy5tb3ZlQ2VsbEZvY3VzKG5leHRFbGVtZW50LCByb3dJbmRleCArIDEsIC0xKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuVVA6IHtcbiAgICAgICAgICBpZiAoY29sLnZhbHVlVHlwZSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGNvbnN0IG5leHRFbGVtZW50ID0gdGhpcy5jZWxsUmVmc1tgJHt0aGlzLnByb3BzLmdyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4IC0gMX1gXTtcbiAgICAgICAgICAgIHRoaXMubW92ZUNlbGxGb2N1cyhuZXh0RWxlbWVudCwgcm93SW5kZXggLSAxLCAtMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLlRBQjpcbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuUklHSFQ6XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLkxFRlQ6IHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgbGV0IGNvbHVtbkluZCA9IGNvbHVtbnMuZmluZEluZGV4KGMgPT4gYy52YWx1ZUtleVBhdGguam9pbignLycpID09PSBjb2x1bW5LZXkpO1xuICAgICAgICAgIGlmIChjb2x1bW5JbmQgIT09IC0xKSB7XG4gICAgICAgICAgICBsZXQgZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgbGV0IG5leHRFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIGxldCByb3dJbmQgPSByb3dJbmRleDtcbiAgICAgICAgICAgIHdoaWxlIChkaXNhYmxlZCkge1xuICAgICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuTEVGVCB8fCAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuVEFCICYmIGUuc2hpZnRLZXkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbHVtbkluZCAtIDEgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kIC09IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyb3dJbmQgLSAxID49IDApIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCA9IGNvbHVtbnMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAgIHJvd0luZCAtPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbHVtbkluZCArIDEgPCBjb2x1bW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kICs9IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyb3dJbmQgKyAxIDwgcm93c1NpemUpIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCA9IDA7XG4gICAgICAgICAgICAgICAgICByb3dJbmQgKz0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnN0IG5leHRDb2x1bW5LZXkgPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sdW1uc1tjb2x1bW5JbmRdKTtcbiAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSB0aGlzLmNlbGxSZWZzW2Ake3RoaXMucHJvcHMuZ3JpZC5pZH1fJHtuZXh0Q29sdW1uS2V5fV8ke3Jvd0luZH1gXTtcbiAgICAgICAgICAgICAgZGlzYWJsZWQgPSBuZXh0RWxlbWVudCA/IG5leHRFbGVtZW50LmRpc2FibGVkIDogZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWRpc2FibGVkICYmIG5leHRFbGVtZW50KSB7XG4gICAgICAgICAgICAgIHRoaXMubW92ZUNlbGxGb2N1cyhuZXh0RWxlbWVudCwgcm93SW5kLCBjb2x1bW5JbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uRmlsdGVyQ2VsbFZhbHVlQ2hhbmdlID0gKGNvbCwgdmFsdWVQYXJzZXIpID0+IChldmVudE9yRGF0YSkgPT4ge1xuICAgIGxldCByYXdWYWx1ZTtcbiAgICAvLyBldmVudE9yRGF0YSBjYW4gYmUgaW5wdXQgb25DaGFuZ2UgZXZlbnQsIHJlYWN0LXNlbGVjdCBvbkNoYW5nZSBvciByZWFjdC1kYXktcGlja2VyIG9uQ2hhbmdlXG4gICAgaWYgKGV2ZW50T3JEYXRhKSB7XG4gICAgICBpZiAoZXZlbnRPckRhdGEudGFyZ2V0ICE9PSB1bmRlZmluZWQpIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlO1xuICAgICAgZWxzZSBpZiAoZXZlbnRPckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkgcmF3VmFsdWUgPSBldmVudE9yRGF0YS52YWx1ZTtcbiAgICAgIGVsc2UgcmF3VmFsdWUgPSBldmVudE9yRGF0YTtcbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSB2YWx1ZVBhcnNlcihyYXdWYWx1ZSk7XG4gICAgdGhpcy5wcm9wcy5maWx0ZXJDZWxsVmFsdWVDaGFuZ2UoXG4gICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICB0aGlzLnByb3BzLmNvbHVtbnMsXG4gICAgICBjb2wsXG4gICAgICB2YWx1ZSxcbiAgICApO1xuICB9XG5cbiAgb25DcmVhdGVDZWxsVmFsdWVDaGFuZ2UgPSAocm93SW5kZXgsIGNvbCwgdmFsdWVQYXJzZXIpID0+IChldmVudE9yRGF0YSkgPT4ge1xuICAgIGxldCByYXdWYWx1ZTtcbiAgICAvLyBldmVudE9yRGF0YSBjYW4gYmUgaW5wdXQgb25DaGFuZ2UgZXZlbnQsIHJlYWN0LXNlbGVjdCBvbkNoYW5nZSBvciByZWFjdC1kYXktcGlja2VyIG9uQ2hhbmdlXG4gICAgaWYgKGV2ZW50T3JEYXRhKSB7XG4gICAgICBpZiAoZXZlbnRPckRhdGEudGFyZ2V0ICE9PSB1bmRlZmluZWQpIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlO1xuICAgICAgZWxzZSBpZiAoZXZlbnRPckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkgcmF3VmFsdWUgPSBldmVudE9yRGF0YS52YWx1ZTtcbiAgICAgIGVsc2UgcmF3VmFsdWUgPSBldmVudE9yRGF0YTtcbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSB2YWx1ZVBhcnNlcihyYXdWYWx1ZSk7XG4gICAgdGhpcy5wcm9wcy5jcmVhdGVDZWxsVmFsdWVDaGFuZ2UodGhpcy5wcm9wcy5ncmlkLCByb3dJbmRleCwgY29sLnZhbHVlS2V5UGF0aCwgdmFsdWUpO1xuICAgIGlmIChjb2wub25DcmVhdGVWYWx1ZUNoYW5nZSkge1xuICAgICAgY29sLm9uQ3JlYXRlVmFsdWVDaGFuZ2UodmFsdWUsIGNvbC52YWx1ZUtleVBhdGgsIHJvd0luZGV4KTtcbiAgICB9XG4gICAgaWYgKGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZSAmJiB2YWx1ZSA9PT0gY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm1hdGNoVmFsdWUpIHtcbiAgICAgIC8vIENhbGwgc3BlY2lhbCBwYWlyZWQgdmFsdWUgY2hhbmdlIG9uIG90aGVyIGNlbGwgaWYgdmFsdWUgbWF0Y2hlc1xuICAgICAgdGhpcy5vbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZShcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIHsgdmFsdWVLZXlQYXRoOiBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWVLZXlQYXRoIH0sXG4gICAgICAgIHYgPT4gdixcbiAgICAgICkoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm5ld1ZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNvbC52YWxpZGF0b3JzKSB7XG4gICAgICB0aGlzLnByb3BzLmNyZWF0ZUNlbGxWYWx1ZVZhbGlkYXRlKFxuICAgICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICBjb2wudmFsdWVLZXlQYXRoLFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgY29sLnZhbGlkYXRvcnMsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIG9uRWRpdENlbGxWYWx1ZUNoYW5nZSA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGV2ZW50T3JEYXRhKSA9PiB7XG4gICAgY29uc3QgZGF0YUlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICBsZXQgcmF3VmFsdWU7XG4gICAgLy8gZXZlbnRPckRhdGEgY2FuIGJlIGlucHV0IG9uQ2hhbmdlIGV2ZW50LCByZWFjdC1zZWxlY3Qgb25DaGFuZ2Ugb3IgcmVhY3QtZGF5LXBpY2tlciBvbkNoYW5nZVxuICAgIGlmIChldmVudE9yRGF0YSkge1xuICAgICAgaWYgKGV2ZW50T3JEYXRhLnRhcmdldCAhPT0gdW5kZWZpbmVkKSByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZTtcbiAgICAgIGVsc2UgaWYgKGV2ZW50T3JEYXRhLnZhbHVlICE9PSB1bmRlZmluZWQpIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudmFsdWU7XG4gICAgICBlbHNlIHJhd1ZhbHVlID0gZXZlbnRPckRhdGE7XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlID0gdmFsdWVQYXJzZXIocmF3VmFsdWUpO1xuICAgIHRoaXMucHJvcHMuZWRpdENlbGxWYWx1ZUNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIGRhdGFJZCwgY29sLnZhbHVlS2V5UGF0aCwgdmFsdWUpO1xuICAgIGlmIChjb2wub25FZGl0VmFsdWVDaGFuZ2UpIHtcbiAgICAgIGNvbC5vbkVkaXRWYWx1ZUNoYW5nZSh2YWx1ZSwgY29sLnZhbHVlS2V5UGF0aCwgcm93SW5kZXgsIGRhdGFJZCk7XG4gICAgfVxuICAgIGlmIChjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUgJiYgdmFsdWUgPT09IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5tYXRjaFZhbHVlKSB7XG4gICAgICAvLyBDYWxsIHNwZWNpYWwgcGFpcmVkIHZhbHVlIGNoYW5nZSBvbiBvdGhlciBjZWxsIGlmIHZhbHVlIG1hdGNoZXNcbiAgICAgIHRoaXMub25FZGl0Q2VsbFZhbHVlQ2hhbmdlKFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgeyB2YWx1ZUtleVBhdGg6IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5uZXdWYWx1ZUtleVBhdGggfSxcbiAgICAgICAgdiA9PiB2LFxuICAgICAgKShjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY29sLnZhbGlkYXRvcnMpIHtcbiAgICAgIHRoaXMucHJvcHMuZWRpdENlbGxWYWx1ZVZhbGlkYXRlKFxuICAgICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICAgIGRhdGFJZCxcbiAgICAgICAgY29sLnZhbHVlS2V5UGF0aCxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIGNvbC52YWxpZGF0b3JzLFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBvbkNyZWF0ZUNlbGxCbHVyID0gKHJvd0luZGV4LCBjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZSkgPT4ge1xuICAgIGlmIChjb2wub25DcmVhdGVCbHVyKSB7XG4gICAgICBsZXQgdmFsdWUgPSAoZSAmJiBlLnRhcmdldCAmJiBlLnRhcmdldC52YWx1ZSAhPT0gdW5kZWZpbmVkKSA/XG4gICAgICAgIGUudGFyZ2V0LnZhbHVlIDpcbiAgICAgICAgdGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpO1xuICAgICAgaWYgKHZhbHVlUGFyc2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZVBhcnNlcih2YWx1ZSk7XG4gICAgICB9XG4gICAgICBjb2wub25DcmVhdGVCbHVyKHZhbHVlLCByb3dJbmRleCk7XG4gICAgfVxuICB9XG5cbiAgb25FZGl0Q2VsbEJsdXIgPSAocm93SW5kZXgsIGNvbCwgdmFsdWVQYXJzZXIpID0+IChlKSA9PiB7XG4gICAgaWYgKGNvbC5vbkVkaXRCbHVyKSB7XG4gICAgICBsZXQgdmFsdWUgPSAoZSAmJiBlLnRhcmdldCAmJiBlLnRhcmdldC52YWx1ZSAhPT0gdW5kZWZpbmVkKSA/XG4gICAgICAgIGUudGFyZ2V0LnZhbHVlIDpcbiAgICAgICAgdGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpO1xuICAgICAgaWYgKHZhbHVlUGFyc2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZVBhcnNlcih2YWx1ZSk7XG4gICAgICB9XG4gICAgICBjb25zdCBkYXRhSWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgICAgY29sLm9uRWRpdEJsdXIodmFsdWUsIHJvd0luZGV4LCBkYXRhSWQpO1xuICAgIH1cbiAgfVxuXG4gIG9uQ2VsbEZvY3VzID0gKGNlbGxUeXBlLCBpbnB1dFR5cGUsIHJvd0luZGV4LCBjb2x1bW5LZXkpID0+IChlKSA9PiB7XG4gICAgaWYgKGlucHV0VHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIGUudGFyZ2V0LnNlbGVjdCgpO1xuICAgIH1cbiAgICBpZiAoY2VsbFR5cGUgPT09ICdlZGl0JyAmJiB0aGlzLnByb3BzLmNlbGxTZWxlY3QpIHtcbiAgICAgIHRoaXMucHJvcHMuY2VsbFNlbGVjdGlvbkNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIE1hcCh7IHJvd0luZGV4LCBjb2x1bW5LZXkgfSkpO1xuICAgIH1cbiAgfVxuXG4gIGdldERhdGFJZEJ5Um93SW5kZXggPSByb3dJbmRleCA9PlxuICAgIHRoaXMucHJvcHMuZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLnRoaXMucHJvcHMuZ3JpZC5pZEtleVBhdGhdKTtcblxuICBnZXRTZWxlY3RlZEl0ZW1JbmRleCA9IChpZCkgPT4ge1xuICAgIGlmICghaWQpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnByb3BzLmRhdGEuZmluZEluZGV4KHYgPT4gdi5nZXRJbih0aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoKSA9PT0gaWQpO1xuICAgIHJldHVybiBpbmRleCA9PT0gLTEgPyB1bmRlZmluZWQgOiBpbmRleDtcbiAgfVxuXG4gIGdldEVkaXRJdGVtVmFsdWUgPSAocm93SW5kZXgsIGNvbCkgPT4ge1xuICAgIC8vIEdldCB0aGUgdmFsdWUgdG8gZGlzcGxheSBpbiBlZGl0IGNlbGxcbiAgICBjb25zdCBpZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgY29uc3QgZWRpdFZhbHVlID0gdGhpcy5wcm9wcy5lZGl0RGF0YS5nZXRJbihbaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdLCB1bmRlZmluZWQpO1xuICAgIGxldCBvcmlnaW5hbFZhbHVlO1xuICAgIGlmIChlZGl0VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgb3JpZ2luYWxWYWx1ZSA9IHRoaXMucHJvcHMuZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdLCAnJyk7XG4gICAgfSBlbHNlIGlmIChlZGl0VmFsdWUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGVkaXRWYWx1ZTtcbiAgICB9XG4gICAgaWYgKG9yaWdpbmFsVmFsdWUgPT09IG51bGwgfHwgb3JpZ2luYWxWYWx1ZSA9PT0gdW5kZWZpbmVkIHx8IG9yaWdpbmFsVmFsdWUgPT09ICcnKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIC8vIFNwZWNpYWwgZm9ybWF0dGluZyBieSBjb21wb25lbnQgdHlwZVxuICAgIGlmIChcbiAgICAgIGNvbC5jb21wb25lbnRUeXBlID09PSAnZmxvYXQnICYmXG4gICAgICBTdHJpbmcob3JpZ2luYWxWYWx1ZSkubGVuZ3RoID4gMFxuICAgICkge1xuICAgICAgcmV0dXJuIFN0cmluZyhvcmlnaW5hbFZhbHVlKS5yZXBsYWNlKCcuJywgdGhpcy5wcm9wcy5kZWNpbWFsU2VwYXJhdG9yKTtcbiAgICB9XG4gICAgcmV0dXJuIG9yaWdpbmFsVmFsdWU7XG4gIH1cblxuICBnZXRDcmVhdGVJdGVtVmFsdWUgPSAocm93SW5kZXgsIGNvbCkgPT4ge1xuICAgIGNvbnN0IHZhbCA9IHRoaXMucHJvcHMuY3JlYXRlRGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdLCAnJyk7XG4gICAgaWYgKHZhbCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gdmFsO1xuICB9XG5cbiAgZ2V0RmlsdGVySXRlbVZhbHVlID0gKGNvbCkgPT4ge1xuICAgIGNvbnN0IHZhbCA9IHRoaXMucHJvcHMuZmlsdGVyRGF0YS5nZXQoVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCksICcnKTtcbiAgICBpZiAodmFsID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHJldHVybiB2YWw7XG4gIH1cblxuICBnZXRDb21wb25lbnREaXNhYmxlZFN0YXRlID0gKHJvd0luZGV4LCBjb2wsIG1vZGUpID0+IHtcbiAgICBsZXQgY29tcG9uZW50RGlzYWJsZWQgPSAhIWNvbC5kaXNhYmxlRWRpdGluZztcbiAgICAvLyBjaGVjayBpZiBjb21wb25lbnQgaXMgZGlzYWJsZWQgYnkgb3RoZXIgY29sdW1uIGRhdGFcbiAgICBpZiAoIWNvbXBvbmVudERpc2FibGVkICYmIGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaCkge1xuICAgICAgaWYgKG1vZGUgPT09ICdjcmVhdGUnKSB7XG4gICAgICAgIGNvbXBvbmVudERpc2FibGVkID0gdGhpcy5nZXRDcmVhdGVJdGVtVmFsdWUoXG4gICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgeyB2YWx1ZUtleVBhdGg6IGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaC5tYXRjaFZhbHVlS2V5UGF0aCB9LFxuICAgICAgICApID09PSBjb2wuZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2gubWF0Y2hWYWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbXBvbmVudERpc2FibGVkID0gdGhpcy5nZXRFZGl0SXRlbVZhbHVlKFxuICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgIHsgdmFsdWVLZXlQYXRoOiBjb2wuZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2gubWF0Y2hWYWx1ZUtleVBhdGggfSxcbiAgICAgICAgKSA9PT0gY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb21wb25lbnREaXNhYmxlZDtcbiAgfVxuXG4gIGdldFJvd0NsYXNzTmFtZSA9IChyb3dJbmRleCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGdyaWQsXG4gICAgICBpc0NyZWF0aW5nLFxuICAgICAgaXNFZGl0aW5nLFxuICAgICAgY3JlYXRlRGF0YSxcbiAgICAgIHNlbGVjdGVkSXRlbXMsXG4gICAgICBkYXRhLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHJvd0NsYXNzTmFtZXMgPSBbJ29jLWRhdGFncmlkLXJvdyddO1xuICAgIGxldCBleHRyYVJvd0NvdW50ID0gMDsgLy8gaG93IG1hbnkgcm93cyB0byBpZ25vcmUgZnJvbSB0b3AsIG5ldyArIGZpbHRlciByb3dzXG4gICAgaWYgKGlzQ3JlYXRpbmcpIGV4dHJhUm93Q291bnQgPSBjcmVhdGVEYXRhLnNpemU7XG4gICAgaWYgKGlzQ3JlYXRpbmcpIHtcbiAgICAgIGlmIChyb3dJbmRleCA8PSAoZXh0cmFSb3dDb3VudCAtIDEpKSB7XG4gICAgICAgIHJvd0NsYXNzTmFtZXMucHVzaCgnb2MtZGF0YWdyaWQtcm93LW5ldycpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNFZGl0aW5nKSB7XG4gICAgICByb3dDbGFzc05hbWVzLnB1c2goJ29jLWRhdGFncmlkLXJvdy1lZGl0Jyk7XG4gICAgfVxuXG5cbiAgICAvLyBjaGVjayBpZiByb3cgaXMgc2VsZWN0ZWRcbiAgICBpZiAoKCFpc0NyZWF0aW5nICYmICFpc0VkaXRpbmcpICYmXG4gICAgICAgIChzZWxlY3RlZEl0ZW1zICYmIGdyaWQuaWRLZXlQYXRoKSkge1xuICAgICAgaWYgKFxuICAgICAgICBzZWxlY3RlZEl0ZW1zLmluZGV4T2YoZGF0YS5nZXRJbihbcm93SW5kZXggLSBleHRyYVJvd0NvdW50LCAuLi5ncmlkLmlkS2V5UGF0aF0pKSAhPT0gLTFcbiAgICAgICkge1xuICAgICAgICByb3dDbGFzc05hbWVzLnB1c2goJ2lzLXNlbGVjdGVkJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcHMucm93Q2xhc3NOYW1lR2V0dGVyKSB7XG4gICAgICByZXR1cm4gcm93Q2xhc3NOYW1lcy5qb2luKCcgJykgKyAnICcgKyB0aGlzLnByb3BzLnJvd0NsYXNzTmFtZUdldHRlcihyb3dJbmRleCk7XG4gICAgfVxuICAgIHJldHVybiByb3dDbGFzc05hbWVzLmpvaW4oJyAnKTtcbiAgfVxuXG4gIGdldENlbGxNZXNzYWdlcyA9IChyb3dJbmRleCwgY29sLCBjZWxsVHlwZSkgPT4ge1xuICAgIGNvbnN0IHJldHVybkRhdGEgPSB7fTtcbiAgICBpZiAoIXRoaXMucHJvcHMuZ3JpZC5pZEtleVBhdGggfHwgIWNvbC52YWx1ZUtleVBhdGgpIHtcbiAgICAgIHJldHVybiByZXR1cm5EYXRhO1xuICAgIH1cbiAgICBsZXQgaW5mb01lc3NhZ2U7XG4gICAgbGV0IGVycm9yTWVzc2FnZTtcbiAgICBsZXQgd2FybmluZ01lc3NhZ2U7XG4gICAgaWYgKGNlbGxUeXBlID09PSAnY3JlYXRlJykge1xuICAgICAgaW5mb01lc3NhZ2UgPSB0aGlzLnByb3BzLmNyZWF0ZUNlbGxNZXNzYWdlcy5nZXRJbihbJ2luZm8nLCByb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgZXJyb3JNZXNzYWdlID0gdGhpcy5wcm9wcy5jcmVhdGVDZWxsTWVzc2FnZXMuZ2V0SW4oWydlcnJvcicsIHJvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgICB3YXJuaW5nTWVzc2FnZSA9IHRoaXMucHJvcHMuY3JlYXRlQ2VsbE1lc3NhZ2VzLmdldEluKFsnd2FybmluZycsIHJvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICAgIGluZm9NZXNzYWdlID0gdGhpcy5wcm9wcy5jZWxsTWVzc2FnZXMuZ2V0SW4oWydpbmZvJywgaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgIGVycm9yTWVzc2FnZSA9IHRoaXMucHJvcHMuY2VsbE1lc3NhZ2VzLmdldEluKFsnZXJyb3InLCBpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgd2FybmluZ01lc3NhZ2UgPSB0aGlzLnByb3BzLmNlbGxNZXNzYWdlcy5nZXRJbihbJ3dhcm5pbmcnLCBpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgIH1cbiAgICBpZiAoaW5mb01lc3NhZ2UpIHtcbiAgICAgIHJldHVybkRhdGEuaW5mb01lc3NhZ2UgPSBpbmZvTWVzc2FnZTtcbiAgICB9XG4gICAgaWYgKGVycm9yTWVzc2FnZSkge1xuICAgICAgcmV0dXJuRGF0YS5lcnJvck1lc3NhZ2UgPSBlcnJvck1lc3NhZ2U7XG4gICAgfVxuICAgIGlmICh3YXJuaW5nTWVzc2FnZSkge1xuICAgICAgcmV0dXJuRGF0YS53YXJuaW5nTWVzc2FnZSA9IHdhcm5pbmdNZXNzYWdlO1xuICAgIH1cbiAgICByZXR1cm4gcmV0dXJuRGF0YTtcbiAgfVxuXG4gIGdldFNjcm9sbFRvUm93ID0gKCkgPT4ge1xuICAgIGxldCBzY3JvbGxUb1JvdztcbiAgICBpZiAodGhpcy5wcm9wcy5pc0NyZWF0aW5nICYmICF0aGlzLmZvY3VzVG9DcmVhdGVDZWxsKSByZXR1cm4gc2Nyb2xsVG9Sb3c7XG4gICAgaWYgKHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwpIHtcbiAgICAgIGNvbnN0IHNjcm9sbE5ld1JvdyA9IHRoaXMucHJvcHMuY3JlYXRlRGF0YS5zaXplIC0gMTtcbiAgICAgIGlmIChzY3JvbGxOZXdSb3cgPj0gMCkge1xuICAgICAgICBzY3JvbGxUb1JvdyA9IHNjcm9sbE5ld1JvdztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMucHJvcHMuaXNFZGl0aW5nKSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gdGhpcy5zdGF0ZS5jdXJyZW50Um93O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2Nyb2xsVG9Sb3cgPSB0aGlzLnByb3BzLnNjcm9sbFRvUm93OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICB9XG4gICAgICBpZiAoc2Nyb2xsVG9Sb3cgPT09IHVuZGVmaW5lZCAmJiB0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuc2l6ZSA+IDApIHtcbiAgICAgICAgc2Nyb2xsVG9Sb3cgPSB0aGlzLmdldFNlbGVjdGVkSXRlbUluZGV4KHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5maXJzdCgpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNjcm9sbFRvUm93O1xuICB9XG5cbiAgc2V0Rm9jdXNUbyA9IChmb2N1c1RvKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuaXNFZGl0aW5nIHx8IHRoaXMucHJvcHMuaXNDcmVhdGluZykge1xuICAgICAgaWYgKGZvY3VzVG8gJiYgZm9jdXNUby5nZXQoJ3R5cGUnKSAmJiBmb2N1c1RvICE9PSB0aGlzLnByZXZGb2N1c1RvKSB7XG4gICAgICAgIHRoaXNbZm9jdXNUby5nZXQoJ3R5cGUnKV0gPSB0cnVlO1xuICAgICAgICB0aGlzLmZvY3VzVG9MYXN0Um93ID0gZm9jdXNUby5nZXQoJ2ZvY3VzVG9MYXN0Um93Jyk7XG4gICAgICAgIHRoaXMucHJldkZvY3VzVG8gPSBmb2N1c1RvO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUNlbGxTZWxlY3QgPSAoY2VsbFR5cGUsIHJvd0luZGV4LCBjb2x1bW5LZXkpID0+ICgpID0+IHtcbiAgICBpZiAoY2VsbFR5cGUgPT09ICd2aWV3JyAmJiB0aGlzLnByb3BzLmNlbGxTZWxlY3QpIHtcbiAgICAgIHRoaXMucHJvcHMuY2VsbFNlbGVjdGlvbkNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIE1hcCh7IHJvd0luZGV4LCBjb2x1bW5LZXkgfSkpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUNyZWF0ZUNlbGxSZWYgPSAocm93SW5kZXgsIGNvbCkgPT4gKHJlZikgPT4ge1xuICAgIC8vIEZvY3VzIHRvIGNyZWF0ZSBjZWxsXG4gICAgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5jcmVhdGVEYXRhLnNpemUgJiZcbiAgICAgIHRoaXMucHJvcHMuY3JlYXRlRGF0YS5zaXplID09PSByb3dJbmRleCArIDEgJiZcbiAgICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgJiZcbiAgICAgICF0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2NyZWF0ZScpXG4gICAgKSB7XG4gICAgICByZWYuZm9jdXMoKTtcbiAgICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVFZGl0Q2VsbFJlZiA9IChyb3dJbmRleCwgY29sKSA9PiAocmVmKSA9PiB7XG4gICAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCk7XG4gICAgaWYgKHRoaXMuZm9jdXNUb0VkaXRDZWxsICYmICF0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2VkaXQnKSkge1xuICAgICAgY29uc3Qgc2VsZWN0ZWRSb3dJbmRleCA9IHRoaXMuZm9jdXNUb0xhc3RSb3cgJiYgdGhpcy5wcm9wcy5kYXRhLnNpemUgPiAwID9cbiAgICAgICAgdGhpcy5wcm9wcy5kYXRhLnNpemUgLSAxIDogdGhpcy5nZXRTZWxlY3RlZEl0ZW1JbmRleCh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuZmlyc3QoKSk7XG5cbiAgICAgIGNvbnN0IHsgc2VsZWN0ZWRDZWxsIH0gPSB0aGlzLnByb3BzO1xuICAgICAgaWYgKHNlbGVjdGVkQ2VsbC5zaXplID4gMCkge1xuICAgICAgICBpZiAoc2VsZWN0ZWRDZWxsLmdldCgncm93SW5kZXgnKSA9PT0gcm93SW5kZXggJiYgc2VsZWN0ZWRDZWxsLmdldCgnY29sdW1uS2V5JykgPT09IGNvbHVtbktleSkge1xuICAgICAgICAgIHJlZi5mb2N1cygpO1xuICAgICAgICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5mb2N1c1RvTGFzdFJvdyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHNlbGVjdGVkUm93SW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZvY3VzVG9MYXN0Um93ID0gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKHNlbGVjdGVkUm93SW5kZXggPT09IHJvd0luZGV4KSB7XG4gICAgICAgIHJlZi5mb2N1cygpO1xuICAgICAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZvY3VzVG9MYXN0Um93ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZUFycm93TmF2aWdhdGlvbikge1xuICAgICAgdGhpcy5jZWxsUmVmc1tgJHt0aGlzLnByb3BzLmdyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4fWBdID0gcmVmO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVDZWxsRm9jdXMgPSAobmV4dEVsZW1lbnQsIHJvd0luZGV4LCBjb2x1bW5JbmRleCkgPT4ge1xuICAgIGlmIChuZXh0RWxlbWVudCAmJiAobmV4dEVsZW1lbnQudHlwZSA9PT0gJ3RleHQnIHx8IG5leHRFbGVtZW50LnR5cGUgPT09ICdudW1iZXInKSkge1xuICAgICAgaWYgKHJvd0luZGV4ICE9PSAtMSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgY3VycmVudFJvdzogcm93SW5kZXggfSk7XG4gICAgICB9XG4gICAgICBpZiAoY29sdW1uSW5kZXggIT09IC0xKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjdXJyZW50Q29sdW1uOiBjb2x1bW5JbmRleCB9KTtcbiAgICAgIH1cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gbmV4dEVsZW1lbnQuc2VsZWN0KCksIDUwKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVTZWxlY3Rpb25DaGVja0JveE9uQ2hhbmdlID0gcm93SW5kZXggPT4gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMuaXRlbVNlbGVjdGlvbkNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIHJvd0luZGV4LCB0cnVlLCBmYWxzZSk7XG4gIH1cblxuICBnZW5lcmF0ZUNvbHVtbnMgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBleHRyYUNvbHVtbiB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBjb2x1bW5zID0gW107XG4gICAgY29uc3QgdGFiSW5kZXggPSBTdHJpbmcodGhpcy5wcm9wcy50YWJJbmRleCk7XG4gICAgaWYgKGV4dHJhQ29sdW1uKSB7XG4gICAgICBjb2x1bW5zLnB1c2goe1xuICAgICAgICB3aWR0aDogZXh0cmFDb2x1bW4ud2lkdGggfHwgNDAsXG4gICAgICAgIGlzUmVzaXphYmxlOiAhIWV4dHJhQ29sdW1uLmlzUmVzaXphYmxlLFxuICAgICAgICBpc1NvcnRhYmxlOiBmYWxzZSxcbiAgICAgICAgY29sdW1uS2V5OiAnZXh0cmFDb2x1bW4nLFxuICAgICAgICBjZWxsOiByb3dJbmRleCA9PiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1leHRyYS1jb2x1bW4tY2VsbCBuby1yb3ctc2VsZWN0XCI+XG4gICAgICAgICAgICB7IGV4dHJhQ29sdW1uLnZhbHVlUmVuZGVyKHRoaXMucHJvcHMuZGF0YS5nZXQocm93SW5kZXgpLCB0YWJJbmRleCkgfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApLFxuICAgICAgICBjZWxsRWRpdDogcm93SW5kZXggPT4gKGV4dHJhQ29sdW1uLmNlbGxFZGl0ID8gZXh0cmFDb2x1bW4uY2VsbEVkaXQocm93SW5kZXgpIDogbnVsbCksXG4gICAgICAgIGNlbGxDcmVhdGU6IHJvd0luZGV4ID0+IChleHRyYUNvbHVtbi5jZWxsQ3JlYXRlID8gZXh0cmFDb2x1bW4uY2VsbENyZWF0ZShyb3dJbmRleCkgOiBudWxsKSxcbiAgICAgICAgY2VsbEZpbHRlcjogcm93SW5kZXggPT4gKGV4dHJhQ29sdW1uLmNlbGxGaWx0ZXIgPyBleHRyYUNvbHVtbi5jZWxsRmlsdGVyKHJvd0luZGV4KSA6IG51bGwpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcHMucm93U2VsZWN0Q2hlY2tib3hDb2x1bW4pIHtcbiAgICAgIGNvbHVtbnMucHVzaCh7XG4gICAgICAgIHdpZHRoOiA0MCxcbiAgICAgICAgaXNSZXNpemFibGU6IGZhbHNlLFxuICAgICAgICBpc1NvcnRhYmxlOiBmYWxzZSxcbiAgICAgICAgY29sdW1uS2V5OiAnc2VsZWN0aW9uQ2hlY2tib3gnLFxuICAgICAgICBjZWxsOiAocm93SW5kZXgpID0+IHtcbiAgICAgICAgICBjb25zdCByb3dJdGVtID0gdGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCk7XG4gICAgICAgICAgY29uc3QgaXRlbUlkID0gcm93SXRlbS5nZXRJbih0aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoKTtcbiAgICAgICAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhpdGVtSWQpO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkU2VsZWN0Q2hlY2tCb3gtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtc2VsZWN0LWNoZWNrYm94LWNlbGwgbm8tcm93LXNlbGVjdFwiXG4gICAgICAgICAgICAgIGNoZWNrZWQ9e3NlbGVjdGVkfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVTZWxlY3Rpb25DaGVja0JveE9uQ2hhbmdlKHJvd0luZGV4KX1cbiAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICBjZWxsRWRpdDogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbENyZWF0ZTogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbEZpbHRlcjogKCkgPT4gbnVsbCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHZpc2libGVDb2x1bW5zID0gW107XG4gICAgdGhpcy5wcm9wcy52aXNpYmxlQ29sdW1ucy5mb3JFYWNoKCh2aXNpYmxlQ29sdW1uS2V5KSA9PiB7XG4gICAgICB0aGlzLnByb3BzLmNvbHVtbnMuZm9yRWFjaCgob3JnQ29sKSA9PiB7XG4gICAgICAgIGlmIChVdGlscy5nZXRDb2x1bW5LZXkob3JnQ29sKSA9PT0gdmlzaWJsZUNvbHVtbktleSkge1xuICAgICAgICAgIHZpc2libGVDb2x1bW5zLnB1c2gob3JnQ29sKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgdmlzaWJsZUNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICBjb25zdCBjb2x1bW4gPSB7XG4gICAgICAgIGhlYWRlcjogY29sLmhlYWRlcixcbiAgICAgICAgY29sdW1uS2V5OiBVdGlscy5nZXRDb2x1bW5LZXkoY29sKSxcbiAgICAgICAgd2lkdGg6IChjb2wud2lkdGggfHwgY29sLndpZHRoID09PSAwID8gY29sLndpZHRoIDogMjAwKSxcbiAgICAgICAgbWluV2lkdGg6IChjb2wubWluV2lkdGggfHwgY29sLm1pbldpZHRoID09PSAwID8gY29sLm1pbldpZHRoIDogNDApLFxuICAgICAgICBtYXhXaWR0aDogY29sLm1heFdpZHRoLFxuICAgICAgICBpc1Jlc2l6YWJsZTogIWNvbC5kaXNhYmxlUmVzaXppbmcsXG4gICAgICAgIGZpeGVkOiAhIWNvbC5maXhlZCxcbiAgICAgICAgYWxsb3dDZWxsc1JlY3ljbGluZzogISFjb2wuYWxsb3dDZWxsc1JlY3ljbGluZyxcbiAgICAgICAgZGlzYWJsZVNvcnRpbmc6ICEhY29sLmRpc2FibGVTb3J0aW5nLFxuICAgICAgICBpc1JlcXVpcmVkOiAhIWNvbC5pc1JlcXVpcmVkLFxuICAgICAgICBjb21wb25lbnRUeXBlOiBjb2wuY29tcG9uZW50VHlwZSxcbiAgICAgICAgc3R5bGU6IFV0aWxzLmdldENlbGxTdHlsZUJ5Q29sKGNvbCksXG4gICAgICB9O1xuICAgICAgaWYgKGNvbC52YWx1ZUtleVBhdGgpIHtcbiAgICAgICAgY29sdW1uLnZhbHVlS2V5UGF0aCA9IGNvbC52YWx1ZUtleVBhdGg7XG4gICAgICB9XG4gICAgICBpZiAoY29sLmZsZXhHcm93KSB7XG4gICAgICAgIGNvbHVtbi5mbGV4R3JvdyA9IGNvbC5mbGV4R3JvdztcbiAgICAgIH1cbiAgICAgIGlmIChjb2wudmFsdWVUeXBlKSB7XG4gICAgICAgIGNvbHVtbi52YWx1ZVR5cGUgPSBjb2wudmFsdWVUeXBlO1xuICAgICAgfVxuICAgICAgaWYgKGNvbC5zb3J0Q29tcGFyYXRvcikge1xuICAgICAgICBjb2x1bW4uc29ydENvbXBhcmF0b3IgPSBjb2wuc29ydENvbXBhcmF0b3I7XG4gICAgICB9XG4gICAgICBpZiAoY29sLnNvcnRWYWx1ZUdldHRlcikge1xuICAgICAgICBjb2x1bW4uc29ydFZhbHVlR2V0dGVyID0gY29sLnNvcnRWYWx1ZUdldHRlcjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHZhbHVlRW1wdHlDaGVja2VyID0gVXRpbHMuZ2V0VmFsdWVFbXB0eUNoZWNrZXIoY29sKTtcbiAgICAgIC8vIENlbGwgdmFsdWUgcmVuZGVyaW5nXG4gICAgICBjb25zdCB2YWx1ZVJlbmRlciA9IChyb3dJbmRleCwgZm9ybWF0KSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbCA9IHRoaXMucHJvcHMuZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbCkpIHtcbiAgICAgICAgICByZXR1cm4gY29sLmlzUmVxdWlyZWQgPyA8TSBpZD1cIkdyaWQuVmFsdWVJc01pc3NpbmdcIiAvPiA6ICcnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3JtYXQgPyBmb3JtYXQodmFsKSA6IHZhbDtcbiAgICAgIH07XG5cbiAgICAgIGlmIChjb2wuY2VsbCkge1xuICAgICAgICBjb2x1bW4uY2VsbCA9IGNvbC5jZWxsO1xuICAgICAgfSBlbHNlIGlmIChjb2wudmFsdWVSZW5kZXIpIHtcbiAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBjb2wudmFsdWVSZW5kZXIodGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCksIHJvd0luZGV4KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN3aXRjaCAoY29sLnZhbHVlVHlwZSkge1xuICAgICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PlxuICAgICAgICAgICAgICB2YWx1ZVJlbmRlcihyb3dJbmRleCwgdiA9PiA8TiB2YWx1ZT17dn0gey4uLmNvbC5yZW5kZXJDb21wb25lbnRQcm9wc30gLz4pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnY3VycmVuY3knOiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW5jeUtleVBhdGggPSBjb2wudmFsdWVPcHRpb25zICYmIGNvbC52YWx1ZU9wdGlvbnMuY3VycmVuY3lLZXlQYXRoIHx8IFsnY3VycmVuY3knXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PlxuICAgICAgICAgICAgICB2YWx1ZVJlbmRlcihyb3dJbmRleCwgdiA9PiBmb3JtYXRDdXJyZW5jeUFtb3VudCh2LCB7XG4gICAgICAgICAgICAgICAgY3VycmVuY3k6IHRoaXMucHJvcHMuZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmN1cnJlbmN5S2V5UGF0aF0pLFxuICAgICAgICAgICAgICAgIGRlY2ltYWxzOiBjb2wudmFsdWVPcHRpb25zICYmIGNvbC52YWx1ZU9wdGlvbnMuZGVjaW1hbHMsXG4gICAgICAgICAgICAgICAgdGhvdXNhbmRTZXBhcmF0b3I6IGNvbC52YWx1ZU9wdGlvbnMgJiYgY29sLnZhbHVlT3B0aW9ucy50aG91c2FuZFNlcGFyYXRvciB8fCB0aGlzLnByb3BzLnRob3VzYW5kU2VwYXJhdG9yLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgICAgICAgICAgZGVjaW1hbFNlcGFyYXRvcjogY29sLnZhbHVlT3B0aW9ucyAmJiBjb2wudmFsdWVPcHRpb25zLmRlY2ltYWxTZXBhcmF0b3IgfHwgdGhpcy5wcm9wcy5kZWNpbWFsU2VwYXJhdG9yLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT5cbiAgICAgICAgICAgICAgdmFsdWVSZW5kZXIocm93SW5kZXgsICh2KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG1vbWVudCh2LCB0aGlzLnByb3BzLmRhdGVGb3JtYXQsIHRydWUpLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vbWVudC51dGModiwgdGhpcy5wcm9wcy5kYXRlRm9ybWF0KS5mb3JtYXQodGhpcy5wcm9wcy5kYXRlRm9ybWF0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG1vbWVudCh2KS5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBtb21lbnQudXRjKHYpLmZvcm1hdCh0aGlzLnByb3BzLmRhdGVGb3JtYXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gPE0gaWQ9XCJHcmlkLkludmFsaWREYXRlXCIgLz47XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+XG4gICAgICAgICAgICAgIHZhbHVlUmVuZGVyKHJvd0luZGV4LCB2ID0+XG4gICAgICAgICAgICAgICAgPE0gaWQ9e3YgPyAnR3JpZC5ZZXMnIDogJ0dyaWQuTm8nfSB7Li4uY29sLnJlbmRlckNvbXBvbmVudFByb3BzfSAvPik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiB2YWx1ZVJlbmRlcihyb3dJbmRleCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIENlbGwgZWRpdC9jcmVhdGUvZmlsdGVyIGNvbXBvbmVudCByZW5kZXJpbmdcbiAgICAgIGlmIChjb2wuY2VsbEVkaXQpIHtcbiAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gY29sLmNlbGxFZGl0O1xuICAgICAgfSBlbHNlIGlmIChjb2wuZWRpdFZhbHVlUmVuZGVyKSB7XG4gICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9XG4gICAgICAgICAgcm93SW5kZXggPT4gY29sLmVkaXRWYWx1ZVJlbmRlcih0aGlzLnByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSwgcm93SW5kZXgpO1xuICAgICAgfVxuICAgICAgaWYgKGNvbC5jZWxsQ3JlYXRlKSB7XG4gICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gY29sLmNlbGxDcmVhdGU7XG4gICAgICB9IGVsc2UgaWYgKGNvbC5jcmVhdGVWYWx1ZVJlbmRlcikge1xuICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9XG4gICAgICAgICAgcm93SW5kZXggPT4gY29sLmNyZWF0ZVZhbHVlUmVuZGVyKHRoaXMucHJvcHMuZGF0YS5nZXQocm93SW5kZXgpLCByb3dJbmRleCk7XG4gICAgICB9XG4gICAgICBpZiAoY29sLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSBjb2wuY2VsbEZpbHRlcjtcbiAgICAgIH0gZWxzZSBpZiAoY29sLmZpbHRlclZhbHVlUmVuZGVyKSB7XG4gICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID1cbiAgICAgICAgICByb3dJbmRleCA9PiBjb2wuZmlsdGVyVmFsdWVSZW5kZXIodGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCksIHJvd0luZGV4KTtcbiAgICAgIH1cbiAgICAgIGlmIChjb2wuY29tcG9uZW50VHlwZSkge1xuICAgICAgICBsZXQgZWRpdFZhbHVlUGFyc2VyID0gdmFsID0+IHZhbDtcbiAgICAgICAgc3dpdGNoIChjb2wuY29tcG9uZW50VHlwZSkge1xuICAgICAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgICAgICAgLy8gVE9ETyBSRUZBQ1RPUiBUTyBGVU5DVElPTlxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5saW5lRWRpdCkge1xuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IChcbiAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uRWRpdENlbGxWYWx1ZUNoYW5nZShyb3dJbmRleCwgY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMub25FZGl0Q2VsbEJsdXIocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMub25DZWxsRm9jdXMoJ2VkaXQnLCBjb2wuY29tcG9uZW50VHlwZSwgcm93SW5kZXgsIGNvbHVtbi5jb2x1bW5LZXkpfVxuICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMub25FZGl0Q2VsbEtleURvd24oY29sLCByb3dJbmRleCl9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UmVmPXt0aGlzLmhhbmRsZUVkaXRDZWxsUmVmKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRFZGl0SW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX0tJHtyb3dJbmRleH1gfVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmVkaXRDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnZWRpdCcpfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17Y29sdW1uLnN0eWxlfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gKFxuICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0Q3JlYXRlSXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZShyb3dJbmRleCwgY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMub25DcmVhdGVDZWxsQmx1cihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLm9uQ3JlYXRlQ2VsbEtleURvd259XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UmVmPXt0aGlzLmhhbmRsZUNyZWF0ZUNlbGxSZWYocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZENyZWF0ZUlucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5jcmVhdGVDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnY3JlYXRlJyl9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXtjb2x1bW4uc3R5bGV9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuZmlsdGVyaW5nKSB7XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IChcbiAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldEZpbHRlckl0ZW1WYWx1ZShjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkZpbHRlckNlbGxWYWx1ZUNoYW5nZShjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZEZpbHRlcklucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9YH1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5maWx0ZXJDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e2NvbHVtbi5zdHlsZX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5saW5lRWRpdCkge1xuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IChcbiAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25FZGl0Q2VsbFZhbHVlQ2hhbmdlKHJvd0luZGV4LCBjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5vbkVkaXRDZWxsQmx1cihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5vbkNlbGxGb2N1cygnZWRpdCcsIGNvbC5jb21wb25lbnRUeXBlLCByb3dJbmRleCwgY29sdW1uLmNvbHVtbktleSl9XG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5vbkVkaXRDZWxsS2V5RG93bihjb2wsIHJvd0luZGV4KX1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRSZWY9e3RoaXMuaGFuZGxlRWRpdENlbGxSZWYocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZEVkaXRJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fS0ke3Jvd0luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuZWRpdENvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdlZGl0Jyl9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXtjb2x1bW4uc3R5bGV9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiAoXG4gICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldENyZWF0ZUl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DcmVhdGVDZWxsVmFsdWVDaGFuZ2Uocm93SW5kZXgsIGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLm9uQ3JlYXRlQ2VsbEJsdXIocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMub25DZWxsRm9jdXMoJ2NyZWF0ZScsICdudW1iZXInLCByb3dJbmRleCwgY29sdW1uLmNvbHVtbktleSl9XG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5vbkNyZWF0ZUNlbGxLZXlEb3dufVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFJlZj17dGhpcy5oYW5kbGVDcmVhdGVDZWxsUmVmKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRDcmVhdGVJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fS0ke3Jvd0luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuY3JlYXRlQ29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2NyZWF0ZScpfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17Y29sdW1uLnN0eWxlfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmZpbHRlcmluZykge1xuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldEZpbHRlckl0ZW1WYWx1ZShjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkZpbHRlckNlbGxWYWx1ZUNoYW5nZShjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZEZpbHRlcklucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9YH1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5maWx0ZXJDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e2NvbHVtbi5zdHlsZX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdmbG9hdCc6XG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIgPSB2YWwgPT5cbiAgICAgICAgICAgICAgdmFsLnJlcGxhY2UobmV3IFJlZ0V4cChgW15cXFxcZCR7dGhpcy5wcm9wcy5kZWNpbWFsU2VwYXJhdG9yfSstXWAsICdnJyksICcnKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmlubGluZUVkaXQpIHtcbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiAoXG4gICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkVkaXRDZWxsVmFsdWVDaGFuZ2Uocm93SW5kZXgsIGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLm9uRWRpdENlbGxCbHVyKHJvd0luZGV4LCBjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMub25DZWxsRm9jdXMoJ2VkaXQnLCBjb2wuY29tcG9uZW50VHlwZSwgcm93SW5kZXgsIGNvbHVtbi5jb2x1bW5LZXkpfVxuICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMub25FZGl0Q2VsbEtleURvd24oY29sLCByb3dJbmRleCl9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UmVmPXt0aGlzLmhhbmRsZUVkaXRDZWxsUmVmKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRFZGl0SW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX0tJHtyb3dJbmRleH1gfVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmVkaXRDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnZWRpdCcpfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17Y29sdW1uLnN0eWxlfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gKFxuICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0Q3JlYXRlSXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZShyb3dJbmRleCwgY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMub25DcmVhdGVDZWxsQmx1cihyb3dJbmRleCwgY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMub25DcmVhdGVDZWxsS2V5RG93bn1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRSZWY9e3RoaXMuaGFuZGxlQ3JlYXRlQ2VsbFJlZihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkQ3JlYXRlSW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX0tJHtyb3dJbmRleH1gfVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmNyZWF0ZUNvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdjcmVhdGUnKX1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e2NvbHVtbi5zdHlsZX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5maWx0ZXJpbmcpIHtcbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT4gKFxuICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0RmlsdGVySXRlbVZhbHVlKGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uRmlsdGVyQ2VsbFZhbHVlQ2hhbmdlKGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkRmlsdGVySW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX1gfVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmZpbHRlckNvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17Y29sdW1uLnN0eWxlfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3NlbGVjdCc6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgaW50bCB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50T3B0aW9ucyB8fFxuICAgICAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdENvbXBvbmVudE9wdGlvbnMuZ2V0KGNvbHVtbi5jb2x1bW5LZXkpO1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0VHJhbnNsYXRpb25zID0gY29sLnNlbGVjdENvbXBvbmVudFRyYW5zbGF0aW9ucyB8fFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IGludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5TZWxlY3QnIH0pLFxuICAgICAgICAgICAgICAgIG5vUmVzdWx0c1RleHQ6IGludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5Ob1Jlc3VsdHMnIH0pLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5saW5lRWRpdCkge1xuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IChcbiAgICAgICAgICAgICAgICAgIDxGbG9hdGluZ1NlbGVjdFxuICAgICAgICAgICAgICAgICAgICBuYW1lPXtjb2wudmFsdWVLZXlQYXRoLmpvaW4oKSArICctZWRpdC0nICsgcm93SW5kZXh9XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e1xuICAgICAgICAgICAgICAgICAgICAgIGNvbC5lZGl0U2VsZWN0T3B0aW9uc01vZCAmJiBzZWxlY3RPcHRpb25zID9cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbC5lZGl0U2VsZWN0T3B0aW9uc01vZChzZWxlY3RPcHRpb25zLnNsaWNlKCksIHJvd0luZGV4LCBjb2wpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdE9wdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkVkaXRDZWxsVmFsdWVDaGFuZ2Uocm93SW5kZXgsIGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLm9uRWRpdENlbGxCbHVyKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLm9uQ2VsbEZvY3VzKCdlZGl0JywgY29sLmNvbXBvbmVudFR5cGUsIHJvd0luZGV4LCBjb2x1bW4uY29sdW1uS2V5KX1cbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoYWJsZT17c2VsZWN0T3B0aW9ucyAmJiAoc2VsZWN0T3B0aW9ucy5sZW5ndGggPiA5KX1cbiAgICAgICAgICAgICAgICAgICAgY2xlYXJhYmxlPXshY29sLmlzUmVxdWlyZWR9XG4gICAgICAgICAgICAgICAgICAgIGJhY2tzcGFjZVJlbW92ZXM9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICB0YWJTZWxlY3RzVmFsdWU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBvcGVuT25Gb2N1c1xuICAgICAgICAgICAgICAgICAgICByZWY9e3RoaXMuaGFuZGxlRWRpdENlbGxSZWYocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICBpZDogYG9jRGF0YWdyaWRFZGl0SW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX0tJHtyb3dJbmRleH1gLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmVkaXRDb21wb25lbnRQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnZWRpdCcpfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5zZWxlY3RUcmFuc2xhdGlvbnN9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gKFxuICAgICAgICAgICAgICAgICAgPEZsb2F0aW5nU2VsZWN0XG4gICAgICAgICAgICAgICAgICAgIG5hbWU9e2NvbC52YWx1ZUtleVBhdGguam9pbigpICsgJy1jcmVhdGUtJyArIHJvd0luZGV4fVxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zPXtcbiAgICAgICAgICAgICAgICAgICAgICBjb2wuY3JlYXRlU2VsZWN0T3B0aW9uc01vZCAmJiBzZWxlY3RPcHRpb25zID9cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbC5jcmVhdGVTZWxlY3RPcHRpb25zTW9kKHNlbGVjdE9wdGlvbnMuc2xpY2UoKSwgcm93SW5kZXgsIGNvbCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0T3B0aW9uc1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldENyZWF0ZUl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DcmVhdGVDZWxsVmFsdWVDaGFuZ2Uocm93SW5kZXgsIGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLm9uQ3JlYXRlQ2VsbEJsdXIocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaGFibGU9e3NlbGVjdE9wdGlvbnMgJiYgKHNlbGVjdE9wdGlvbnMubGVuZ3RoID4gOSl9XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyYWJsZT17IWNvbC5pc1JlcXVpcmVkfVxuICAgICAgICAgICAgICAgICAgICBiYWNrc3BhY2VSZW1vdmVzPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgdGFiU2VsZWN0c1ZhbHVlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgb3Blbk9uRm9jdXNcbiAgICAgICAgICAgICAgICAgICAgcmVmPXt0aGlzLmhhbmRsZUNyZWF0ZUNlbGxSZWYocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICBpZDogYG9jRGF0YWdyaWRDcmVhdGVJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fS0ke3Jvd0luZGV4fWAsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuY3JlYXRlQ29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2NyZWF0ZScpfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5zZWxlY3RUcmFuc2xhdGlvbnN9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmZpbHRlcmluZykge1xuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8RmxvYXRpbmdTZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgbmFtZT17Y29sLnZhbHVlS2V5UGF0aC5qb2luKCkgKyAnLWZpbHRlcid9XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e1xuICAgICAgICAgICAgICAgICAgICAgIGNvbC5maWx0ZXJTZWxlY3RPcHRpb25zTW9kICYmIHNlbGVjdE9wdGlvbnMgP1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sLmZpbHRlclNlbGVjdE9wdGlvbnNNb2Qoc2VsZWN0T3B0aW9ucy5zbGljZSgpLCBjb2wpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdE9wdGlvbnN9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldEZpbHRlckl0ZW1WYWx1ZShjb2wpfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkZpbHRlckNlbGxWYWx1ZUNoYW5nZShjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaGFibGU9e3NlbGVjdE9wdGlvbnMgJiYgKHNlbGVjdE9wdGlvbnMubGVuZ3RoID4gOSl9XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyYWJsZVxuICAgICAgICAgICAgICAgICAgICB0YWJTZWxlY3RzVmFsdWU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBvcGVuT25Gb2N1c1xuICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgaWQ6IGBvY0RhdGFncmlkRmlsdGVySW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX1gLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmZpbHRlckNvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5zZWxlY3RUcmFuc2xhdGlvbnN9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlICdkYXRlJzoge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5saW5lRWRpdCkge1xuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IChcbiAgICAgICAgICAgICAgICAgIDxEYXRlSW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25FZGl0Q2VsbFZhbHVlQ2hhbmdlKHJvd0luZGV4LCBjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsZT17dGhpcy5wcm9wcy5yZWdpb259XG4gICAgICAgICAgICAgICAgICAgIGRhdGVGb3JtYXQ9e3RoaXMucHJvcHMuZGF0ZUZvcm1hdH1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRSZWY9e3RoaXMuaGFuZGxlRWRpdENlbGxSZWYocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICBpZDogYG9jRGF0YWdyaWRFZGl0SW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX0tJHtyb3dJbmRleH1gLFxuICAgICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bjogdGhpcy5vbkVkaXRDZWxsS2V5RG93bihjb2wsIHJvd0luZGV4KSxcbiAgICAgICAgICAgICAgICAgICAgICBvbkJsdXI6IHRoaXMub25FZGl0Q2VsbEJsdXIocm93SW5kZXgsIGNvbCksXG4gICAgICAgICAgICAgICAgICAgICAgb25Gb2N1czogdGhpcy5vbkNlbGxGb2N1cygnZWRpdCcsIGNvbC5jb21wb25lbnRUeXBlLCByb3dJbmRleCwgY29sdW1uLmNvbHVtbktleSksXG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IGNvbHVtbi5zdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgey4uLmNvbC5lZGl0Q29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2VkaXQnKX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiAoXG4gICAgICAgICAgICAgICAgICA8RGF0ZUlucHV0XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldENyZWF0ZUl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DcmVhdGVDZWxsVmFsdWVDaGFuZ2Uocm93SW5kZXgsIGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLm9uQ3JlYXRlQ2VsbEtleURvd259XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsZT17dGhpcy5wcm9wcy5yZWdpb259XG4gICAgICAgICAgICAgICAgICAgIGRhdGVGb3JtYXQ9e3RoaXMucHJvcHMuZGF0ZUZvcm1hdH1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRSZWY9e3RoaXMuaGFuZGxlQ3JlYXRlQ2VsbFJlZihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgIGlkOiBgb2NEYXRhZ3JpZENyZWF0ZUlucHV0LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbHVtbi5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YCxcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogY29sdW1uLnN0eWxlLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmNyZWF0ZUNvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdjcmVhdGUnKX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuZmlsdGVyaW5nKSB7XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IChcbiAgICAgICAgICAgICAgICAgIDxEYXRlSW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0RmlsdGVySXRlbVZhbHVlKGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uRmlsdGVyQ2VsbFZhbHVlQ2hhbmdlKGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgZGF0ZUZvcm1hdD17dGhpcy5wcm9wcy5kYXRlRm9ybWF0fVxuICAgICAgICAgICAgICAgICAgICBsb2NhbGU9e3RoaXMucHJvcHMucmVnaW9ufVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgaWQ6IGBvY0RhdGFncmlkRmlsdGVySW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX1gLFxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBjb2x1bW4uc3R5bGUsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuZmlsdGVyQ29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlICdib29sZWFuJzoge1xuICAgICAgICAgICAgY29uc3QgeyBpbnRsIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0T3B0aW9ucyA9IFtcbiAgICAgICAgICAgICAgeyB2YWx1ZTogdHJ1ZSwgbGFiZWw6IGludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5ZZXMnIH0pIH0sXG4gICAgICAgICAgICAgIHsgdmFsdWU6IGZhbHNlLCBsYWJlbDogaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLk5vJyB9KSB9LFxuICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0VHJhbnNsYXRpb25zID0gY29sLnNlbGVjdENvbXBvbmVudFRyYW5zbGF0aW9ucyB8fCB7XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBpbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuU2VsZWN0JyB9KSxcbiAgICAgICAgICAgICAgbm9SZXN1bHRzVGV4dDogaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0Lk5vUmVzdWx0cycgfSksXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5pbmxpbmVFZGl0KSB7XG4gICAgICAgICAgICAgIGlmICghY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gKFxuICAgICAgICAgICAgICAgICAgPEZsb2F0aW5nU2VsZWN0XG4gICAgICAgICAgICAgICAgICAgIG5hbWU9e2NvbC52YWx1ZUtleVBhdGguam9pbigpICsgJy1lZGl0LScgKyByb3dJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucz17c2VsZWN0T3B0aW9uc31cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25FZGl0Q2VsbFZhbHVlQ2hhbmdlKHJvd0luZGV4LCBjb2wsIGVkaXRWYWx1ZVBhcnNlcil9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5vbkVkaXRDZWxsQmx1cihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5vbkNlbGxGb2N1cygnZWRpdCcsIGNvbC5jb21wb25lbnRUeXBlLCByb3dJbmRleCwgY29sdW1uLmNvbHVtbktleSl9XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaGFibGU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBjbGVhcmFibGU9eyFjb2wuaXNSZXF1aXJlZH1cbiAgICAgICAgICAgICAgICAgICAgYmFja3NwYWNlUmVtb3Zlcz17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIHRhYlNlbGVjdHNWYWx1ZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIG9wZW5PbkZvY3VzXG4gICAgICAgICAgICAgICAgICAgIHJlZj17dGhpcy5oYW5kbGVFZGl0Q2VsbFJlZihyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICAgIGlkOiBgb2NEYXRhZ3JpZEVkaXRJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fS0ke3Jvd0luZGV4fWAsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuZWRpdENvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdlZGl0Jyl9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgey4uLnNlbGVjdFRyYW5zbGF0aW9uc31cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiAoXG4gICAgICAgICAgICAgICAgICA8RmxvYXRpbmdTZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgbmFtZT17Y29sLnZhbHVlS2V5UGF0aC5qb2luKCkgKyAnLWNyZWF0ZS0nICsgcm93SW5kZXh9XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e3NlbGVjdE9wdGlvbnN9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldENyZWF0ZUl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DcmVhdGVDZWxsVmFsdWVDaGFuZ2Uocm93SW5kZXgsIGNvbCwgZWRpdFZhbHVlUGFyc2VyKX1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLm9uQ3JlYXRlQ2VsbEJsdXIocm93SW5kZXgsIGNvbCl9XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaGFibGU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICBjbGVhcmFibGU9eyFjb2wuaXNSZXF1aXJlZH1cbiAgICAgICAgICAgICAgICAgICAgYmFja3NwYWNlUmVtb3Zlcz17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIHRhYlNlbGVjdHNWYWx1ZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIG9wZW5PbkZvY3VzXG4gICAgICAgICAgICAgICAgICAgIHJlZj17dGhpcy5oYW5kbGVDcmVhdGVDZWxsUmVmKHJvd0luZGV4LCBjb2wpfVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgICAgaWQ6IGBvY0RhdGFncmlkQ3JlYXRlSW5wdXQtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sdW1uLmNvbHVtbktleX0tJHtyb3dJbmRleH1gLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICB7Li4uY29sLmNyZWF0ZUNvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdjcmVhdGUnKX1cbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgICAgICAgICB7Li4uc2VsZWN0VHJhbnNsYXRpb25zfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5maWx0ZXJpbmcpIHtcbiAgICAgICAgICAgICAgaWYgKCFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT4gKFxuICAgICAgICAgICAgICAgICAgPEZsb2F0aW5nU2VsZWN0XG4gICAgICAgICAgICAgICAgICAgIG5hbWU9e2NvbC52YWx1ZUtleVBhdGguam9pbigpICsgJy1maWx0ZXInfVxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zPXtzZWxlY3RPcHRpb25zfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRGaWx0ZXJJdGVtVmFsdWUoY29sKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UoY29sLCBlZGl0VmFsdWVQYXJzZXIpfVxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hhYmxlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgY2xlYXJhYmxlXG4gICAgICAgICAgICAgICAgICAgIHRhYlNlbGVjdHNWYWx1ZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIG9wZW5PbkZvY3VzXG4gICAgICAgICAgICAgICAgICAgIGlucHV0UHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICBpZDogYG9jRGF0YWdyaWRGaWx0ZXJJbnB1dC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2x1bW4uY29sdW1uS2V5fWAsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2wuZmlsdGVyQ29tcG9uZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgey4uLnNlbGVjdFRyYW5zbGF0aW9uc31cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbHVtbnMucHVzaChjb2x1bW4pO1xuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuaXNDcmVhdGluZykge1xuICAgICAgY29sdW1ucy5wdXNoKHtcbiAgICAgICAgd2lkdGg6IDM3LFxuICAgICAgICBpc1Jlc2l6YWJsZTogZmFsc2UsXG4gICAgICAgIGNvbHVtbktleTogJ3JlbW92ZU5ld0l0ZW0nLFxuICAgICAgICBjZWxsOiAoKSA9PiBudWxsLFxuICAgICAgICBjZWxsRWRpdDogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbENyZWF0ZTogcm93SW5kZXggPT4gKFxuICAgICAgICAgIDxJY29uXG4gICAgICAgICAgICBpZD17YG9jLWRhdGFncmlkLW5ldy1pdGVtLXJlbW92ZS0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtyb3dJbmRleH1gfVxuICAgICAgICAgICAgdHlwZT1cImluZGljYXRvclwiXG4gICAgICAgICAgICBuYW1lPVwiZGVsZXRlXCJcbiAgICAgICAgICAgIHdpZHRoPXszMH1cbiAgICAgICAgICAgIGhlaWdodD17MzB9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0aGlzLnByb3BzLnJlbW92ZU5ld0l0ZW0odGhpcy5wcm9wcy5ncmlkLCByb3dJbmRleCl9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSxcbiAgICAgICAgY2VsbEZpbHRlcjogKCkgPT4gbnVsbCxcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gY29sdW1ucztcbiAgfVxuXG4gIGlzQ2VsbEVkaXRlZCA9IChyb3dJbmRleCwgY29sLCBjZWxsVHlwZSkgPT4ge1xuICAgIGlmIChjZWxsVHlwZSAhPT0gJ2VkaXQnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICBpZiAodGhpcy5wcm9wcy5lZGl0RGF0YS5nZXRJbihbaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGhhbmRsZUFmdGVyQWRkSXRlbSA9ICgpID0+IHtcbiAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsID0gdHJ1ZTtcbiAgfVxuXG4gIGhhbmRsZUFmdGVyRWRpdFByZXNzID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuc2l6ZSkge1xuICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSB0cnVlO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGN1cnJlbnRSb3c6IHVuZGVmaW5lZCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUFmdGVyVmFsaWRhdGlvbkVycm9yID0gKCkgPT4ge1xuICAgIHRoaXMuZm9jdXNUb0Vycm9yQ2VsbCA9IHRydWU7XG4gIH1cblxuICBoYW5kbGVSb3dDbGljayA9IChlLCByb3dJbmRleCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnJvd1NlbGVjdCAmJiAhdGhpcy5wcm9wcy5pc0NyZWF0aW5nICYmICF0aGlzLnByb3BzLmlzRWRpdGluZykge1xuICAgICAgaWYgKGUuY3RybEtleSB8fCBlLnNoaWZ0S2V5KSB7XG4gICAgICAgIGRvY3VtZW50LmdldFNlbGVjdGlvbigpLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgfVxuICAgICAgLy8gRG9uJ3QgdHJpZ2dlciBzZWxlY3Rpb24gY2hhbmdlIG9uIHdoZW4gdXNlciBjbGlja3Mgb24gc3BlY2lhbCBjZWxscyBsaWtlIGNoZWNrYm94L2V4dHJhXG4gICAgICAvLyBDaGVjayB0aGF0IGNsaWNrZWQgbm9kZSdzIHBhcmVudCBvciBwYXJlbnQncyBwYXJlbnQgZG9lc24ndCBoYXZlIG5vLXJvdy1zZWxlY3QgY2xhc3NcbiAgICAgIGNvbnN0IHsgcGFyZW50Tm9kZSB9ID0gZS50YXJnZXQ7XG4gICAgICBjb25zdCBwYXJlbnQxY2xhc3MgPSBwYXJlbnROb2RlLmNsYXNzTmFtZSAmJiBwYXJlbnROb2RlLmNsYXNzTmFtZS5pbmRleE9mXG4gICAgICAgID8gcGFyZW50Tm9kZS5jbGFzc05hbWVcbiAgICAgICAgOiAnJztcbiAgICAgICAgY29uc3QgcGFyZW50MmNsYXNzID0gcGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZSAmJiBwYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lLmluZGV4T2YgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICA/IHBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWVcbiAgICAgICAgOiAnJztcbiAgICAgICAgY29uc3QgcGFyZW50M2NsYXNzID0gcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lICYmIHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZS5pbmRleE9mIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgPyBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWVcbiAgICAgICAgOiAnJztcbiAgICAgICAgY29uc3QgcGFyZW50NGNsYXNzID0gcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUgJiYgcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUuaW5kZXhPZiAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgID8gcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWVcbiAgICAgICAgOiAnJztcbiAgICAgIGlmIChcbiAgICAgICAgcGFyZW50MWNsYXNzLmluZGV4T2YoJ25vLXJvdy1zZWxlY3QnKSA9PT0gLTEgJiZcbiAgICAgICAgcGFyZW50MmNsYXNzLmluZGV4T2YoJ25vLXJvdy1zZWxlY3QnKSA9PT0gLTEgJiZcbiAgICAgICAgcGFyZW50M2NsYXNzLmluZGV4T2YoJ25vLXJvdy1zZWxlY3QnKSA9PT0gLTEgJiZcbiAgICAgICAgcGFyZW50NGNsYXNzLmluZGV4T2YoJ25vLXJvdy1zZWxlY3QnKSA9PT0gLTFcbiAgICAgICkge1xuICAgICAgICB0aGlzLnByb3BzLml0ZW1TZWxlY3Rpb25DaGFuZ2UoXG4gICAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgIHRoaXMucHJvcHMubXVsdGlTZWxlY3QgJiYgZS5jdHJsS2V5LFxuICAgICAgICAgIHRoaXMucHJvcHMubXVsdGlTZWxlY3QgJiYgZS5zaGlmdEtleSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMub25Sb3dDbGljaykge1xuICAgICAgdGhpcy5wcm9wcy5vblJvd0NsaWNrKGUsIHJvd0luZGV4LCB0aGlzLnByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaGFuZGxlQ29udGV4dE1lbnUgPSAoZSwgcm93SW5kZXgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5jb250ZXh0TWVudUl0ZW1zKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGl0ZW1TZWxlY3Rpb25DaGFuZ2UsXG4gICAgICAgIHNlbGVjdGVkSXRlbXMsXG4gICAgICAgIGdyaWQsXG4gICAgICAgIGRhdGEsXG4gICAgICB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY29udGV4dE1lbnVPcGVuOiB0cnVlLFxuICAgICAgICBjb250ZXh0TWVudVg6IGUuY2xpZW50WCxcbiAgICAgICAgY29udGV4dE1lbnVZOiBlLmNsaWVudFksXG4gICAgICB9KTtcbiAgICAgIC8vIElmIGNsaWNrZWQgaXRlbSBpcyBub3Qgc2VsZWN0ZWQsIGNoYW5nZSBzZWxlY3Rpb24gdG8gaXRcbiAgICAgIGlmICghc2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhkYXRhLmdldEluKFtyb3dJbmRleCwgLi4uZ3JpZC5pZEtleVBhdGhdKSkpIHtcbiAgICAgICAgaXRlbVNlbGVjdGlvbkNoYW5nZShncmlkLCByb3dJbmRleCk7XG4gICAgICB9XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25Eb2N1bWVudENsaWNrKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBoYW5kbGVDb250ZXh0TWVudUl0ZW1DbGljayA9IChvbkNsaWNrLCBzZWxlY3RlZEl0ZW1zLCBzZWxlY3RlZERhdGEpID0+ICgpID0+IHtcbiAgICBvbkNsaWNrKHNlbGVjdGVkSXRlbXMsIHNlbGVjdGVkRGF0YSk7XG4gIH1cblxuICBoYW5kbGVSb3dIZWlnaHRHZXR0ZXIgPSByb3dJbmRleCA9PlxuICAgIHRoaXMucHJvcHMucm93SGVpZ2h0R2V0dGVyKHRoaXMucHJvcHMuZGF0YS5nZXQocm93SW5kZXgpLCByb3dJbmRleCk7XG5cbiAgcmVuZGVyQ2VsbCA9IGNvbCA9PiAoY2VsbFByb3BzKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgaXNDcmVhdGluZyxcbiAgICAgIGlzRWRpdGluZyxcbiAgICAgIGNyZWF0ZURhdGEsXG4gICAgICBzZWxlY3RlZENlbGwsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyByb3dJbmRleCwgLi4ucHJvcHMgfSA9IGNlbGxQcm9wcztcbiAgICBsZXQgY2VsbDtcbiAgICBsZXQgY2VsbFR5cGUgPSAndmlldyc7XG4gICAgbGV0IGV4dHJhUm93Q291bnQgPSAwOyAvLyBob3cgbWFueSByb3dzIHRvIGlnbm9yZSBmcm9tIHRvcCwgbmV3ICsgZmlsdGVyIHJvd3NcbiAgICBpZiAoaXNDcmVhdGluZykgZXh0cmFSb3dDb3VudCA9IGNyZWF0ZURhdGEuc2l6ZTtcbiAgICBpZiAoaXNDcmVhdGluZykge1xuICAgICAgaWYgKHJvd0luZGV4IDw9IChleHRyYVJvd0NvdW50IC0gMSkpIHtcbiAgICAgICAgaWYgKGNvbC5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY2VsbCA9IGNvbC5jZWxsQ3JlYXRlKHJvd0luZGV4KTtcbiAgICAgICAgICBjZWxsVHlwZSA9ICdjcmVhdGUnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNlbGwgPSBudWxsO1xuICAgICAgICAgIGNlbGxUeXBlID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2VsbCA9IGNvbC5jZWxsKHJvd0luZGV4IC0gZXh0cmFSb3dDb3VudCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc0VkaXRpbmcgJiYgY29sLmNlbGxFZGl0KSB7XG4gICAgICBjZWxsID0gY29sLmNlbGxFZGl0KHJvd0luZGV4IC0gZXh0cmFSb3dDb3VudCk7XG4gICAgICBjZWxsVHlwZSA9ICdlZGl0JztcbiAgICB9IGVsc2Uge1xuICAgICAgY2VsbCA9IGNvbC5jZWxsKHJvd0luZGV4IC0gZXh0cmFSb3dDb3VudCk7XG4gICAgfVxuICAgIGNvbnN0IGlzU3BlY2lhbCA9IGNlbGxQcm9wcy5jb2x1bW5LZXkgPT09ICdzZWxlY3Rpb25DaGVja2JveCcgfHwgY2VsbFByb3BzLmNvbHVtbktleSA9PT0gJ2V4dHJhQ29sdW1uJztcbiAgICBpZiAoKGNlbGxUeXBlID09PSAndmlldycgfHwgY2VsbFR5cGUgPT09ICdlZGl0JyB8fCBjZWxsVHlwZSA9PT0gJ2NyZWF0ZScpICYmICFpc1NwZWNpYWwpIHtcbiAgICAgIGNvbnN0IGdldFJvd0luZGV4ID0gKGNlbGxUeXBlID09PSAnY3JlYXRlJykgPyByb3dJbmRleCA6IChyb3dJbmRleCAtIGV4dHJhUm93Q291bnQpO1xuICAgICAgY29uc3QgbWVzc2FnZURhdGEgPSB0aGlzLmdldENlbGxNZXNzYWdlcyhnZXRSb3dJbmRleCwgY29sLCBjZWxsVHlwZSk7XG4gICAgICBjb25zdCBpc0VkaXRlZCA9IHRoaXMuaXNDZWxsRWRpdGVkKGdldFJvd0luZGV4LCBjb2wsIGNlbGxUeXBlKTtcbiAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IChzZWxlY3RlZENlbGwuZ2V0KCdyb3dJbmRleCcpID09PSByb3dJbmRleCAmJiBzZWxlY3RlZENlbGwuZ2V0KCdjb2x1bW5LZXknKSA9PT0gcHJvcHMuY29sdW1uS2V5KSA/XG4gICAgICAgICdvYy1kYXRhZ3JpZC1jZWxsIGlzLXNlbGVjdGVkJyA6ICdvYy1kYXRhZ3JpZC1jZWxsJztcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxDZWxsXG4gICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICAgIHN0eWxlPXtjb2wuc3R5bGV9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDZWxsU2VsZWN0KGNlbGxUeXBlLCByb3dJbmRleCwgcHJvcHMuY29sdW1uS2V5KX1cbiAgICAgICAgPlxuICAgICAgICAgIDxDZWxsVG9vbHRpcFxuICAgICAgICAgICAgaWQ9e2NlbGxUeXBlICsgY29sLmNvbHVtbktleSArIChyb3dJbmRleCAtIGV4dHJhUm93Q291bnQpfVxuICAgICAgICAgICAgaXNFZGl0ZWQ9e2lzRWRpdGVkfVxuICAgICAgICAgICAgaXNFcnJvcj17ISFtZXNzYWdlRGF0YS5lcnJvck1lc3NhZ2V9XG4gICAgICAgICAgICBpc1dhcm5pbmc9eyEhbWVzc2FnZURhdGEud2FybmluZ01lc3NhZ2V9XG4gICAgICAgICAgICBpbmZvTWVzc2FnZT17bWVzc2FnZURhdGEuaW5mb01lc3NhZ2V9XG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U9e21lc3NhZ2VEYXRhLmVycm9yTWVzc2FnZX1cbiAgICAgICAgICAgIHdhcm5pbmdNZXNzYWdlPXttZXNzYWdlRGF0YS53YXJuaW5nTWVzc2FnZX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7IGNlbGwgfVxuICAgICAgICAgIDwvQ2VsbFRvb2x0aXA+XG4gICAgICAgIDwvQ2VsbD5cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8Q2VsbCB7Li4ucHJvcHN9IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWNlbGxcIiBzdHlsZT17Y29sLnN0eWxlfT57IGNlbGwgfTwvQ2VsbD5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyQ29sdW1ucyA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuYWxsRGF0YVNpemUgJiYgIXRoaXMucHJvcHMuaXNCdXN5ICYmICF0aGlzLnByb3BzLmlzQ3JlYXRpbmcpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxDb2x1bW5cbiAgICAgICAgICBjb2x1bW5LZXk9XCJkYXRhRW1wdHlDb2x1bW5cIlxuICAgICAgICAgIGhlYWRlcj17PENlbGwgc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJyB9fT48TSBpZD1cIkdyaWQuTm9JdGVtc1wiIC8+PC9DZWxsPn1cbiAgICAgICAgICB3aWR0aD17MTB9XG4gICAgICAgICAgaXNSZXNpemFibGU9e2ZhbHNlfVxuICAgICAgICAgIGZsZXhHcm93PXsxfVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLnByb3BzLnZpc2libGVDb2x1bW5zLnNpemUpIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLmlzQnVzeSkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxDb2x1bW5cbiAgICAgICAgICAgIGNvbHVtbktleT1cImRhdGFFbXB0eUNvbHVtblwiXG4gICAgICAgICAgICBoZWFkZXI9ezxDZWxsPiZuYnNwOzwvQ2VsbD59XG4gICAgICAgICAgICB3aWR0aD17MTB9XG4gICAgICAgICAgICBpc1Jlc2l6YWJsZT17ZmFsc2V9XG4gICAgICAgICAgICBmbGV4R3Jvdz17MX1cbiAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPENvbHVtblxuICAgICAgICAgIGNvbHVtbktleT1cImRhdGFFbXB0eUNvbHVtblwiXG4gICAgICAgICAgaGVhZGVyPXs8Q2VsbCBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInIH19PjxNIGlkPVwiR3JpZC5Ob0NvbHVtbnNcIiAvPjwvQ2VsbD59XG4gICAgICAgICAgd2lkdGg9ezEwfVxuICAgICAgICAgIGlzUmVzaXphYmxlPXtmYWxzZX1cbiAgICAgICAgICBmbGV4R3Jvdz17MX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnN0IGNvbHVtbnMgPSB0aGlzLmdlbmVyYXRlQ29sdW1ucygpO1xuICAgIGlmIChjb2x1bW5zLmxlbmdodCA9PT0gMCkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIGNvbHVtbnMubWFwKGNvbCA9PiAoXG4gICAgICA8Q29sdW1uXG4gICAgICAgIGtleT17Y29sLmNvbHVtbktleX1cbiAgICAgICAgY29sdW1uS2V5PXtjb2wuY29sdW1uS2V5fVxuICAgICAgICBoZWFkZXI9e1xuICAgICAgICAgIDxIZWFkZXJDZWxsXG4gICAgICAgICAgICBncmlkPXt0aGlzLnByb3BzLmdyaWR9XG4gICAgICAgICAgICBjb2x1bW5zPXt0aGlzLnByb3BzLmNvbHVtbnN9XG4gICAgICAgICAgICBjb2x1bW49e2NvbH1cbiAgICAgICAgICAgIGN1cnJlbnRTb3J0Q29sdW1uPXt0aGlzLnByb3BzLnNvcnRDb2x1bW59XG4gICAgICAgICAgICBjdXJyZW50U29ydE9yZGVyPXt0aGlzLnByb3BzLnNvcnRPcmRlcn1cbiAgICAgICAgICAgIG9uU29ydENoYW5nZT17dGhpcy5wcm9wcy5zb3J0Q2hhbmdlfVxuICAgICAgICAgICAgaXNCdXN5PXt0aGlzLnByb3BzLmlzQnVzeX1cbiAgICAgICAgICAgIGZpbHRlcmluZz17dGhpcy5wcm9wcy5pc0ZpbHRlcmluZ31cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7Y29sLmhlYWRlcn1cbiAgICAgICAgICA8L0hlYWRlckNlbGw+XG4gICAgICAgIH1cbiAgICAgICAgY2VsbD17dGhpcy5yZW5kZXJDZWxsKGNvbCl9XG4gICAgICAgIHdpZHRoPXt0aGlzLnByb3BzLmNvbHVtbldpZHRocy5nZXQoY29sLmNvbHVtbktleSwgY29sLndpZHRoKX1cbiAgICAgICAgbWluV2lkdGg9e2NvbC5taW5XaWR0aH1cbiAgICAgICAgbWF4V2lkdGg9e2NvbC5tYXhXaWR0aH1cbiAgICAgICAgaXNSZXNpemFibGU9e2NvbC5pc1Jlc2l6YWJsZX1cbiAgICAgICAgZmxleEdyb3c9e2NvbC5mbGV4R3JvdyA/IGNvbC5mbGV4R3JvdyA6IDB9XG4gICAgICAgIGZpeGVkPXtjb2wuZml4ZWR9XG4gICAgICAgIGFsbG93Q2VsbHNSZWN5Y2xpbmc9e2NvbC5hbGxvd0NlbGxzUmVjeWNsaW5nfVxuICAgICAgLz4pKTtcbiAgfVxuXG4gIHJlbmRlckNvbnRleHRNZW51ID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGNvbnRleHRNZW51SXRlbXMsXG4gICAgICBkYXRhLFxuICAgICAgZ3JpZCxcbiAgICAgIHNlbGVjdGVkSXRlbXMsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge1xuICAgICAgY29udGV4dE1lbnVYLFxuICAgICAgY29udGV4dE1lbnVZLFxuICAgIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHN0eWxlID0ge1xuICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgIHpJbmRleDogMTAwMDAsXG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIHRvcDogYCR7Y29udGV4dE1lbnVZfXB4YCxcbiAgICAgIGxlZnQ6IGAke2NvbnRleHRNZW51WH1weGAsXG4gICAgfTtcbiAgICBjb25zdCBzZWxlY3RlZERhdGEgPSBkYXRhLmZpbHRlcihkID0+IHNlbGVjdGVkSXRlbXMuaW5jbHVkZXMoZC5nZXRJbihncmlkLmlkS2V5UGF0aCkpKTtcbiAgICByZXR1cm4gKFxuICAgICAgPHVsIGNsYXNzTmFtZT1cImRyb3Bkb3duLW1lbnUgb2MtZGF0YWdyaWQtY29udGV4dC1tZW51IG9wZW5cIiBzdHlsZT17c3R5bGV9PlxuICAgICAgICB7IGNvbnRleHRNZW51SXRlbXMgJiYgY29udGV4dE1lbnVJdGVtcy5tYXAgJiYgY29udGV4dE1lbnVJdGVtcy5tYXAoKGl0ZW0sIGkpID0+IHtcbiAgICAgICAgICBsZXQgeyBkaXNhYmxlZCB9ID0gaXRlbTtcbiAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0uZGlzYWJsZWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGRpc2FibGVkID0gaXRlbS5kaXNhYmxlZChzZWxlY3RlZEl0ZW1zLCBzZWxlY3RlZERhdGEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPE1lbnVJdGVtXG4gICAgICAgICAgICAgIGtleT17aX0gLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAgICAgICBoZWFkZXI9e2l0ZW0uaGVhZGVyfVxuICAgICAgICAgICAgICBkaXZpZGVyPXtpdGVtLmRpdmlkZXJ9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgdGl0bGU9e2l0ZW0udGl0bGV9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9eyhkaXNhYmxlZCB8fCAhaXRlbS5vbkNsaWNrKSA/IG51bGwgOiB0aGlzLmhhbmRsZUNvbnRleHRNZW51SXRlbUNsaWNrKFxuICAgICAgICAgICAgICAgIGl0ZW0ub25DbGljayxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEl0ZW1zLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkRGF0YSxcbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgeyBpdGVtLnZhbHVlIH1cbiAgICAgICAgICAgIDwvTWVudUl0ZW0+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSkgfVxuICAgICAgPC91bD5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGdyaWRDbGFzc05hbWUgPSBjbGFzc05hbWVzKHtcbiAgICAgICdvYy1kYXRhZ3JpZC1jb250YWluZXInOiB0cnVlLFxuICAgICAgJ3dpdGgtYWN0aW9uYmFyJzogdGhpcy5wcm9wcy5pbmxpbmVFZGl0ICYmICF0aGlzLnByb3BzLmRpc2FibGVBY3Rpb25CYXIsXG4gICAgICAnaXMtYnVzeSc6IHRoaXMucHJvcHMuaXNCdXN5LFxuICAgICAgJ2lzLWVkaXRpbmcnOiB0aGlzLnByb3BzLmlzRWRpdGluZyxcbiAgICAgICdpcy1jcmVhdGluZyc6IHRoaXMucHJvcHMuaXNDcmVhdGluZyxcbiAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgfSk7XG5cbiAgICAvLyBjaGVjayBpZiB0aGVyZSBpcyBhIG5ldyByZXF1ZXN0IHRvIGNoYW5nZSBlZGl0IG1vZGUgZm9jdXNcbiAgICB0aGlzLnNldEZvY3VzVG8odGhpcy5wcm9wcy5mb2N1c1R5cGUpO1xuXG4gICAgbGV0IGFjdGlvbkJhciA9IG51bGw7XG4gICAgbGV0IGFjdGlvbkJhclJpZ2h0ID0gbnVsbDtcbiAgICBsZXQgYWN0aW9uQmFyTGVmdCA9IG51bGw7XG4gICAgaWYgKFxuICAgICAgKHRoaXMucHJvcHMuYWN0aW9uQmFyIHx8XG4gICAgICB0aGlzLnByb3BzLmlubGluZUVkaXQgfHxcbiAgICAgIHRoaXMucHJvcHMuZmlsdGVyaW5nIHx8XG4gICAgICB0aGlzLnByb3BzLnJlbW92aW5nKSAmJlxuICAgICAgIXRoaXMucHJvcHMuZGlzYWJsZUFjdGlvbkJhclxuICAgICkge1xuICAgICAgYWN0aW9uQmFyUmlnaHQgPSAoXG4gICAgICAgIDxBY3Rpb25CYXIgcG9zaXRpb249XCJyaWdodFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtYWN0aW9uYmFyLXJpZ2h0XCI+eyB0aGlzLnByb3BzLmFjdGlvbkJhciB9PC9kaXY+XG4gICAgICAgICAgeyAodGhpcy5wcm9wcy5maWx0ZXJpbmcgJiYgdGhpcy5wcm9wcy5kaXNhYmxlRHJvcGRvd25cbiAgICAgICAgICAgICYmICF0aGlzLnByb3BzLmRpc2FibGVGaWx0ZXJpbmdDb250cm9scykgJiZcbiAgICAgICAgICAgIDxGaWx0ZXJpbmdDb250cm9scyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgICB9XG4gICAgICAgICAgeyB0aGlzLnByb3BzLmlubGluZUVkaXQgJiZcbiAgICAgICAgICAgIDxJbmxpbmVFZGl0Q29udHJvbHNcbiAgICAgICAgICAgICAgYWZ0ZXJBZGRJdGVtPXt0aGlzLmhhbmRsZUFmdGVyQWRkSXRlbX1cbiAgICAgICAgICAgICAgYWZ0ZXJFZGl0UHJlc3M9e3RoaXMuaGFuZGxlQWZ0ZXJFZGl0UHJlc3N9XG4gICAgICAgICAgICAgIGFmdGVyVmFsaWRhdGlvbkVycm9yPXt0aGlzLmhhbmRsZUFmdGVyVmFsaWRhdGlvbkVycm9yfVxuICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgfVxuICAgICAgICAgIHsgKHRoaXMucHJvcHMuZHJvcGRvd25NZW51SXRlbXMgfHxcbiAgICAgICAgICAgICB0aGlzLnByb3BzLnJlbW92aW5nIHx8XG4gICAgICAgICAgICAgdGhpcy5wcm9wcy5jb2x1bW5TZXR0aW5ncyB8fFxuICAgICAgICAgICAgICh0aGlzLnByb3BzLmZpbHRlcmluZyAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlRHJvcGRvd24pKSAmJlxuICAgICAgICAgICAgIDxEcm9wZG93bkNvbnRyb2xzIHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICAgIH1cbiAgICAgICAgPC9BY3Rpb25CYXI+XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5hY3Rpb25CYXJMZWZ0IHx8IHRoaXMucHJvcHMuZ3JpZEhlYWRlcikge1xuICAgICAgYWN0aW9uQmFyTGVmdCA9IChcbiAgICAgICAgPEFjdGlvbkJhciBwb3NpdGlvbj1cImxlZnRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWdyaWRoZWFkZXJcIj57IHRoaXMucHJvcHMuZ3JpZEhlYWRlciB9PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1hY3Rpb25iYXItbGVmdFwiPnsgdGhpcy5wcm9wcy5hY3Rpb25CYXJMZWZ0IH08L2Rpdj5cbiAgICAgICAgPC9BY3Rpb25CYXI+XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoYWN0aW9uQmFyTGVmdCB8fCBhY3Rpb25CYXJSaWdodCkge1xuICAgICAgYWN0aW9uQmFyID0gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWFjdGlvbmJhci1jb250YWluZXJcIj5cbiAgICAgICAgICB7IGFjdGlvbkJhckxlZnQgfVxuICAgICAgICAgIHsgYWN0aW9uQmFyUmlnaHQgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICAgIGxldCByb3dzQ291bnQgPVxuICAgICAgKHRoaXMucHJvcHMucm93c0NvdW50IHx8IHRoaXMucHJvcHMucm93c0NvdW50ID09PSAwKSA/XG4gICAgICAgIHRoaXMucHJvcHMucm93c0NvdW50IDpcbiAgICAgICAgdGhpcy5wcm9wcy5kYXRhLnNpemU7XG4gICAgaWYgKHRoaXMucHJvcHMuaXNDcmVhdGluZykgcm93c0NvdW50ICs9IHRoaXMucHJvcHMuY3JlYXRlRGF0YS5zaXplO1xuICAgIGlmICghdGhpcy5wcm9wcy52aXNpYmxlQ29sdW1ucy5zaXplKSByb3dzQ291bnQgPSAwO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPXtgb2MtZGF0YWdyaWQtJHt0aGlzLnByb3BzLmdyaWQuaWR9YH1cbiAgICAgICAgY2xhc3NOYW1lPXtncmlkQ2xhc3NOYW1lfVxuICAgICAgICBzdHlsZT17dGhpcy5wcm9wcy5jb250YWluZXJTdHlsZX1cbiAgICAgID5cbiAgICAgICAgeyB0aGlzLnByb3BzLmlzQnVzeSAmJiA8U3Bpbm5lciAvPiB9XG4gICAgICAgIHsgdGhpcy5zdGF0ZS5jb250ZXh0TWVudU9wZW4gJiYgdGhpcy5yZW5kZXJDb250ZXh0TWVudSgpIH1cbiAgICAgICAgeyBhY3Rpb25CYXIgfVxuICAgICAgICA8UmVzcG9uc2l2ZUZpeGVkRGF0YVRhYmxlXG4gICAgICAgICAgaWQ9e3RoaXMucHJvcHMuZ3JpZC5pZH1cbiAgICAgICAgICByb3dzQ291bnQ9e3Jvd3NDb3VudH1cbiAgICAgICAgICBoZWFkZXJIZWlnaHQ9e3RoaXMucHJvcHMuaXNGaWx0ZXJpbmcgP1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5oZWFkZXJIZWlnaHQgKyB0aGlzLnByb3BzLmZpbHRlclJvd0hlaWdodFxuICAgICAgICAgICAgOiB0aGlzLnByb3BzLmhlYWRlckhlaWdodH1cbiAgICAgICAgICByb3dIZWlnaHQ9e3RoaXMucHJvcHMucm93SGVpZ2h0fVxuICAgICAgICAgIG9uQ29sdW1uUmVzaXplRW5kQ2FsbGJhY2s9e3RoaXMub25Db2x1bW5SZXNpemVFbmRDYWxsYmFja31cbiAgICAgICAgICBpc0NvbHVtblJlc2l6aW5nPXtmYWxzZX1cbiAgICAgICAgICBvblJvd0NsaWNrPXt0aGlzLmhhbmRsZVJvd0NsaWNrfVxuICAgICAgICAgIHNjcm9sbFRvQ29sdW1uPXt0aGlzLnByb3BzLnNjcm9sbFRvQ29sdW1uIHx8IHRoaXMuc3RhdGUuY3VycmVudENvbHVtbn1cbiAgICAgICAgICBzY3JvbGxUb3A9e3RoaXMucHJvcHMuc2Nyb2xsVG9wfVxuICAgICAgICAgIHNjcm9sbFRvUm93PXt0aGlzLmdldFNjcm9sbFRvUm93KCl9XG4gICAgICAgICAgb25Sb3dEb3VibGVDbGljaz17dGhpcy5wcm9wcy5vblJvd0RvdWJsZUNsaWNrfVxuICAgICAgICAgIG9uUm93TW91c2VEb3duPXt0aGlzLnByb3BzLm9uTW91c2VEb3dufVxuICAgICAgICAgIG9uUm93TW91c2VFbnRlcj17dGhpcy5wcm9wcy5vblJvd01vdXNlRW50ZXJ9XG4gICAgICAgICAgb25Sb3dNb3VzZUxlYXZlPXt0aGlzLnByb3BzLm9uUm93TW91c2VMZWF2ZX1cbiAgICAgICAgICBvblNjcm9sbFN0YXJ0PXt0aGlzLnByb3BzLm9uU2Nyb2xsU3RhcnR9XG4gICAgICAgICAgb25TY3JvbGxFbmQ9e3RoaXMucHJvcHMub25TY3JvbGxFbmR9XG4gICAgICAgICAgcm93Q2xhc3NOYW1lR2V0dGVyPXt0aGlzLmdldFJvd0NsYXNzTmFtZX1cbiAgICAgICAgICByb3dIZWlnaHRHZXR0ZXI9e3RoaXMucHJvcHMucm93SGVpZ2h0R2V0dGVyICYmIHRoaXMuaGFuZGxlUm93SGVpZ2h0R2V0dGVyfVxuICAgICAgICAgIG9uQ29udGVudEhlaWdodENoYW5nZT17dGhpcy5wcm9wcy5vbkNvbnRlbnRIZWlnaHRDaGFuZ2V9XG4gICAgICAgICAgb25Sb3dDb250ZXh0TWVudT17dGhpcy5oYW5kbGVDb250ZXh0TWVudX1cbiAgICAgICAgPlxuICAgICAgICAgIHsgdGhpcy5yZW5kZXJDb2x1bW5zKCkgfVxuICAgICAgICA8L1Jlc3BvbnNpdmVGaXhlZERhdGFUYWJsZT5cbiAgICAgICAgeyB0aGlzLnByb3BzLmlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW4gJiZcbiAgICAgICAgICA8Q29sdW1uU2V0dGluZ3NNb2RhbFxuICAgICAgICAgICAgZ3JpZD17dGhpcy5wcm9wcy5ncmlkfVxuICAgICAgICAgICAgY29sdW1ucz17dGhpcy5wcm9wcy5jb2x1bW5zfVxuICAgICAgICAgICAgdmlzaWJsZUNvbHVtbnM9e3RoaXMucHJvcHMudmlzaWJsZUNvbHVtbnN9XG4gICAgICAgICAgICBjbG9zZUNvbHVtblNldHRpbmdzTW9kYWw9e3RoaXMucHJvcHMuY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsfVxuICAgICAgICAgICAgc2F2ZUNvbHVtblNldHRpbmdzPXt0aGlzLnByb3BzLnNhdmVDb2x1bW5TZXR0aW5nc31cbiAgICAgICAgICAvPlxuICAgICAgICB9XG4gICAgICAgIHsgdGhpcy5wcm9wcy5jaGlsZHJlbiB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=