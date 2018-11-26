'use strict';

exports.__esModule = true;

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

var _reactIcons = require('@opuscapita/react-icons');

var _reactSpinner = require('@opuscapita/react-spinner');

var _reactSpinner2 = _interopRequireDefault(_reactSpinner);

var _reactCheckbox = require('@opuscapita/react-checkbox');

var _reactCheckbox2 = _interopRequireDefault(_reactCheckbox);

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

var _columnService = require('./column-service/column-service');

var _columnService2 = _interopRequireDefault(_columnService);

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

exports.default = (_dec = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _reactIntl.injectIntl)(_class = _dec(_class = (_temp = _class2 = function (_React$PureComponent) {
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
      this.props.isBusy && _react2.default.createElement(_reactSpinner2.default, null),
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
        var _props = _this2.props,
            columns = _props.columns,
            visibleColumns = _props.visibleColumns;

        var gridColumns = _datagrid5.default.visibleColumns(columns, visibleColumns);
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
              var columnInd = gridColumns.findIndex(function (c) {
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
                  var nextColumnKey = _datagrid5.default.getColumnKey(gridColumns[columnInd]);
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

    var val = _this2.props.filterData.get(_datagrid5.default.getColumnKey(col), '');
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


      var valueEmptyChecker = _datagrid5.default.getValueEmptyChecker(col);
      // Cell value rendering
      var valueRender = function valueRender(rowIndex, format) {
        var val = data.getIn([rowIndex].concat(col.valueKeyPath));
        if (valueEmptyChecker(val)) {
          return col.isRequired ? _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Grid.ValueIsMissing' }) : '';
        }
        return format ? format(val) : val;
      };

      var column = _columnService2.default.baseColumn(col);
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
      column = _columnService2.default.columnCell(column, cellProps, col, valueRender);

      // handle columnComponentTypes
      var componentTypeProps = _extends({}, cellProps, { grid: grid, inlineEdit: inlineEdit, filtering: filtering, region: region, intl: intl, selectComponentOptions: selectComponentOptions }); // eslint-disable-line
      column = _columnService2.default.columnComponentType(column, tabIndex, componentTypeProps, col, columnFunctions, _this2.getComponentDisabledState);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbImRhdGFncmlkQWN0aW9ucyIsIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwib3duUHJvcHMiLCJHUklEIiwiZ3JpZCIsImlzQnVzeSIsImRhdGFncmlkIiwiZ2V0SW4iLCJpZCIsImlzRWRpdGluZyIsImlzQ3JlYXRpbmciLCJpc0ZpbHRlcmluZyIsImlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW4iLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwidmlzaWJsZUNvbHVtbnMiLCJjb2x1bW5XaWR0aHMiLCJzZWxlY3RlZENlbGwiLCJzZWxlY3RlZEl0ZW1zIiwiZGF0YSIsImVkaXREYXRhIiwiY3JlYXRlRGF0YSIsImZpbHRlckRhdGEiLCJjZWxsTWVzc2FnZXMiLCJjcmVhdGVDZWxsTWVzc2FnZXMiLCJhbGxEYXRhU2l6ZSIsInNpemUiLCJsYW5ndWFnZSIsIlV0aWxzIiwiZ2V0TGFuZ3VhZ2UiLCJ1c2VyIiwicmVnaW9uIiwiZ2V0UmVnaW9uIiwiZGF0ZUZvcm1hdCIsImdldERhdGVGb3JtYXQiLCJ0aG91c2FuZFNlcGFyYXRvciIsImdldFRob3VzYW5kU2VwYXJhdG9yIiwiZGVjaW1hbFNlcGFyYXRvciIsImdldERlY2ltYWxTZXBhcmF0b3IiLCJmb3JjZVJlZnJlc2hUaW1lc3RhbXAiLCJnZXQiLCJmb2N1c1R5cGUiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJpbmplY3RJbnRsIiwicHJvcHMiLCJjdXJyZW50Um93IiwiY3VycmVudENvbHVtbiIsImNlbGxSZWZzIiwiZm9jdXNUb0NyZWF0ZUNlbGwiLCJmb2N1c1RvRWRpdENlbGwiLCJmb2N1c1RvRXJyb3JDZWxsIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJkb2N1bWVudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJvbkRvY3VtZW50Q2xpY2siLCJpbnZhbGlkYXRlIiwicmVuZGVyIiwiZ3JpZENsYXNzTmFtZSIsImlubGluZUVkaXQiLCJkaXNhYmxlQWN0aW9uQmFyIiwiY2xhc3NOYW1lIiwic2V0Rm9jdXNUbyIsImFjdGlvbkJhciIsImFjdGlvbkJhclJpZ2h0IiwiYWN0aW9uQmFyTGVmdCIsImZpbHRlcmluZyIsInJlbW92aW5nIiwiZGlzYWJsZURyb3Bkb3duIiwiZGlzYWJsZUZpbHRlcmluZ0NvbnRyb2xzIiwiaGFuZGxlQWZ0ZXJBZGRJdGVtIiwiaGFuZGxlQWZ0ZXJFZGl0UHJlc3MiLCJoYW5kbGVBZnRlclZhbGlkYXRpb25FcnJvciIsImRyb3Bkb3duTWVudUl0ZW1zIiwiY29sdW1uU2V0dGluZ3MiLCJncmlkSGVhZGVyIiwicm93c0NvdW50IiwiY29udGFpbmVyU3R5bGUiLCJjb250ZXh0TWVudU9wZW4iLCJyZW5kZXJDb250ZXh0TWVudSIsImhlYWRlckhlaWdodCIsImZpbHRlclJvd0hlaWdodCIsInJvd0hlaWdodCIsIm9uQ29sdW1uUmVzaXplRW5kQ2FsbGJhY2siLCJoYW5kbGVSb3dDbGljayIsInNjcm9sbFRvQ29sdW1uIiwic2Nyb2xsVG9wIiwiZ2V0U2Nyb2xsVG9Sb3ciLCJvblJvd0RvdWJsZUNsaWNrIiwib25Nb3VzZURvd24iLCJvblJvd01vdXNlRW50ZXIiLCJvblJvd01vdXNlTGVhdmUiLCJvblNjcm9sbFN0YXJ0Iiwib25TY3JvbGxFbmQiLCJnZXRSb3dDbGFzc05hbWUiLCJyb3dIZWlnaHRHZXR0ZXIiLCJoYW5kbGVSb3dIZWlnaHRHZXR0ZXIiLCJvbkNvbnRlbnRIZWlnaHRDaGFuZ2UiLCJoYW5kbGVDb250ZXh0TWVudSIsInJlbmRlckNvbHVtbnMiLCJjb2x1bW5zIiwiY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsIiwic2F2ZUNvbHVtblNldHRpbmdzIiwiY2hpbGRyZW4iLCJSZWFjdCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJjb250ZXh0TWVudUl0ZW1zIiwic2V0U3RhdGUiLCJuZXdDb2x1bW5XaWR0aCIsImNvbHVtbktleSIsInJlc2l6ZUNvbHVtbiIsIm9uQ3JlYXRlQ2VsbEtleURvd24iLCJlIiwia2V5Q29kZSIsIktFWV9DT0RFUyIsIkVOVEVSIiwiYWRkTmV3SXRlbSIsImdldENvbHVtbkRlZmF1bHRWYWx1ZXMiLCJvbkVkaXRDZWxsS2V5RG93biIsImNvbCIsInJvd0luZGV4IiwiZW5hYmxlQXJyb3dOYXZpZ2F0aW9uIiwiZ3JpZENvbHVtbnMiLCJyb3dzU2l6ZSIsImdldENvbHVtbktleSIsIkRPV04iLCJ2YWx1ZVR5cGUiLCJuZXh0RWxlbWVudCIsIm1vdmVDZWxsRm9jdXMiLCJVUCIsIlRBQiIsIlJJR0hUIiwiTEVGVCIsInByZXZlbnREZWZhdWx0IiwiY29sdW1uSW5kIiwiZmluZEluZGV4IiwiYyIsInZhbHVlS2V5UGF0aCIsImpvaW4iLCJkaXNhYmxlZCIsInJvd0luZCIsInNoaWZ0S2V5IiwibGVuZ3RoIiwibmV4dENvbHVtbktleSIsIm9uRmlsdGVyQ2VsbFZhbHVlQ2hhbmdlIiwidmFsdWVQYXJzZXIiLCJldmVudE9yRGF0YSIsInJhd1ZhbHVlIiwidGFyZ2V0IiwidW5kZWZpbmVkIiwidmFsdWUiLCJmaWx0ZXJDZWxsVmFsdWVDaGFuZ2UiLCJvbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSIsImNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSIsIm9uQ3JlYXRlVmFsdWVDaGFuZ2UiLCJvblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZSIsIm1hdGNoVmFsdWUiLCJuZXdWYWx1ZUtleVBhdGgiLCJ2IiwibmV3VmFsdWUiLCJ2YWxpZGF0b3JzIiwiY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUiLCJvbkVkaXRDZWxsVmFsdWVDaGFuZ2UiLCJkYXRhSWQiLCJnZXREYXRhSWRCeVJvd0luZGV4IiwiZWRpdENlbGxWYWx1ZUNoYW5nZSIsIm9uRWRpdFZhbHVlQ2hhbmdlIiwiZWRpdENlbGxWYWx1ZVZhbGlkYXRlIiwib25DcmVhdGVDZWxsQmx1ciIsIm9uQ3JlYXRlQmx1ciIsImdldEVkaXRJdGVtVmFsdWUiLCJvbkVkaXRDZWxsQmx1ciIsIm9uRWRpdEJsdXIiLCJvbkNlbGxGb2N1cyIsImNlbGxUeXBlIiwiaW5wdXRUeXBlIiwic2VsZWN0IiwiY2VsbFNlbGVjdCIsImNlbGxTZWxlY3Rpb25DaGFuZ2UiLCJpZEtleVBhdGgiLCJnZXRTZWxlY3RlZEl0ZW1JbmRleCIsImluZGV4Iiwib3B0aW9ucyIsImVkaXRWYWx1ZSIsIm9yaWdpbmFsVmFsdWUiLCJjb21wb25lbnRUeXBlIiwic2VsZWN0Q29tcG9uZW50T3B0aW9ucyIsImZpbmQiLCJvYmoiLCJTdHJpbmciLCJyZXBsYWNlIiwiZ2V0Q3JlYXRlSXRlbVZhbHVlIiwidmFsIiwiaW5jbHVkZXMiLCJnZXRGaWx0ZXJJdGVtVmFsdWUiLCJnZXRDb21wb25lbnREaXNhYmxlZFN0YXRlIiwibW9kZSIsImNvbXBvbmVudERpc2FibGVkIiwiZGlzYWJsZUVkaXRpbmciLCJkaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaCIsIm1hdGNoVmFsdWVLZXlQYXRoIiwicm93Q2xhc3NOYW1lcyIsImV4dHJhUm93Q291bnQiLCJwdXNoIiwiaW5kZXhPZiIsInJvd0NsYXNzTmFtZUdldHRlciIsImdldENlbGxNZXNzYWdlcyIsInJldHVybkRhdGEiLCJpbmZvTWVzc2FnZSIsImVycm9yTWVzc2FnZSIsIndhcm5pbmdNZXNzYWdlIiwic2Nyb2xsVG9Sb3ciLCJzY3JvbGxOZXdSb3ciLCJmaXJzdCIsImZvY3VzVG8iLCJwcmV2Rm9jdXNUbyIsImZvY3VzVG9MYXN0Um93IiwiaGFuZGxlQ2VsbFNlbGVjdCIsImhhbmRsZUNyZWF0ZUNlbGxSZWYiLCJyZWYiLCJmb2N1cyIsImhhbmRsZUVkaXRDZWxsUmVmIiwic2VsZWN0ZWRSb3dJbmRleCIsImNvbHVtbkluZGV4IiwiZWxlbWVudFR5cGVzIiwidHlwZSIsInNldFRpbWVvdXQiLCJoYW5kbGVTZWxlY3Rpb25DaGVja0JveE9uQ2hhbmdlIiwiaXRlbVNlbGVjdGlvbkNoYW5nZSIsImdlbmVyYXRlQ29sdW1ucyIsImV4dHJhQ29sdW1uIiwidGFiSW5kZXgiLCJ3aWR0aCIsImlzUmVzaXphYmxlIiwiaXNTb3J0YWJsZSIsImNlbGwiLCJ2YWx1ZVJlbmRlciIsImNlbGxFZGl0IiwiY2VsbENyZWF0ZSIsImNlbGxGaWx0ZXIiLCJyb3dTZWxlY3RDaGVja2JveENvbHVtbiIsInJvd0l0ZW0iLCJpdGVtSWQiLCJzZWxlY3RlZCIsImZvckVhY2giLCJ2aXNpYmxlQ29sdW1uS2V5Iiwib3JnQ29sIiwiaW50bCIsInZhbHVlRW1wdHlDaGVja2VyIiwiZ2V0VmFsdWVFbXB0eUNoZWNrZXIiLCJmb3JtYXQiLCJpc1JlcXVpcmVkIiwiY29sdW1uIiwiR3JpZENvbHVtblNlcnZpY2UiLCJiYXNlQ29sdW1uIiwiY29sdW1uRnVuY3Rpb25zIiwiZWRpdCIsImdldEl0ZW1WYWx1ZSIsIm9uQ2VsbFZhbHVlQ2hhbmdlIiwib25DZWxsQmx1ciIsIm9uQ2VsbEtleURvd24iLCJoYW5kbGVDZWxsUmVmIiwiY3JlYXRlIiwiZmlsdGVyIiwiY2VsbFByb3BzIiwiY29sdW1uQ2VsbCIsImNvbXBvbmVudFR5cGVQcm9wcyIsImNvbHVtbkNvbXBvbmVudFR5cGUiLCJwYWRkaW5nIiwicmVtb3ZlTmV3SXRlbSIsImlzQ2VsbEVkaXRlZCIsInJvd1NlbGVjdCIsImN0cmxLZXkiLCJnZXRTZWxlY3Rpb24iLCJyZW1vdmVBbGxSYW5nZXMiLCJwYXJlbnROb2RlIiwicGFyZW50MWNsYXNzIiwicGFyZW50MmNsYXNzIiwicGFyZW50M2NsYXNzIiwicGFyZW50NGNsYXNzIiwibXVsdGlTZWxlY3QiLCJvblJvd0NsaWNrIiwic3RvcFByb3BhZ2F0aW9uIiwiY29udGV4dE1lbnVYIiwiY2xpZW50WCIsImNvbnRleHRNZW51WSIsImNsaWVudFkiLCJhZGRFdmVudExpc3RlbmVyIiwiaGFuZGxlQ29udGV4dE1lbnVJdGVtQ2xpY2siLCJvbkNsaWNrIiwic2VsZWN0ZWREYXRhIiwicmVuZGVyQ2VsbCIsImlzU3BlY2lhbCIsImdldFJvd0luZGV4IiwibWVzc2FnZURhdGEiLCJpc0VkaXRlZCIsInN0eWxlIiwidGV4dEFsaWduIiwibGVuZ2h0IiwibWFwIiwic29ydENoYW5nZSIsImhlYWRlciIsIm1pbldpZHRoIiwibWF4V2lkdGgiLCJmbGV4R3JvdyIsImZpeGVkIiwiYWxsb3dDZWxsc1JlY3ljbGluZyIsImRpc3BsYXkiLCJ6SW5kZXgiLCJwb3NpdGlvbiIsInRvcCIsImxlZnQiLCJkIiwiaXRlbSIsImkiLCJkaXZpZGVyIiwidGl0bGUiXSwibWFwcGluZ3MiOiI7Ozs7OztvREFBQTs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFJQTs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7SUFBWUEsZTs7QUFDWjs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1DLGtCQUFrQixTQUFsQkEsZUFBa0IsQ0FBQ0MsS0FBRCxFQUFRQyxRQUFSLEVBQXFCO0FBQzNDLE1BQU1DLE9BQU9ELFNBQVNFLElBQXRCO0FBQ0EsU0FBTztBQUNMQyxZQUFRSixNQUFNSyxRQUFOLENBQWVDLEtBQWYsQ0FBcUIsQ0FBQ0osS0FBS0ssRUFBTixFQUFVLFNBQVYsRUFBcUIsUUFBckIsQ0FBckIsRUFBcUQsSUFBckQsQ0FESDtBQUVMQyxlQUFXUixNQUFNSyxRQUFOLENBQWVDLEtBQWYsQ0FBcUIsQ0FBQ0osS0FBS0ssRUFBTixFQUFVLFNBQVYsRUFBcUIsV0FBckIsQ0FBckIsRUFBd0QsS0FBeEQsQ0FGTjtBQUdMRSxnQkFBWVQsTUFBTUssUUFBTixDQUFlQyxLQUFmLENBQXFCLENBQUNKLEtBQUtLLEVBQU4sRUFBVSxTQUFWLEVBQXFCLFlBQXJCLENBQXJCLEVBQXlELEtBQXpELENBSFA7QUFJTEcsaUJBQ0VWLE1BQU1LLFFBQU4sQ0FBZUMsS0FBZixDQUFxQixDQUFDSixLQUFLSyxFQUFOLEVBQVUsUUFBVixFQUFvQixlQUFwQixFQUFxQyxhQUFyQyxDQUFy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SGhCO0FBSUUsc0JBQVVoTCxRQUpaO0FBS0UsbUJBQU84SyxLQUFLRyxLQUxkO0FBTUUscUJBQVVqTCxZQUFZLENBQUM4SyxLQUFLeEIsT0FBbkIsR0FBOEIsSUFBOUIsR0FBcUMsT0FBS0QsMEJBQUwsQ0FDNUN5QixLQUFLeEIsT0FEdUMsRUFFNUMvUSxhQUY0QyxFQUc1Q2dSLFlBSDRDO0FBTmhEO0FBWUl1QixlQUFLbks7QUFaVCxTQURGO0FBZ0JELE9BckI2QztBQURoRCxLQURGO0FBMEJELEciLCJmaWxlIjoiZGF0YWdyaWQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tbG9uZWx5LWlmLCBwcmVmZXItdGVtcGxhdGUsIHJlYWN0L3JlcXVpcmUtZGVmYXVsdC1wcm9wcyAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IE1hcCwgTGlzdCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHtcbiAgaW5qZWN0SW50bCxcbiAgRm9ybWF0dGVkTWVzc2FnZSBhcyBNLFxufSBmcm9tICdyZWFjdC1pbnRsJztcbmltcG9ydCB7IENvbHVtbiwgQ2VsbCB9IGZyb20gJ2ZpeGVkLWRhdGEtdGFibGUtMic7XG5pbXBvcnQgeyBNZW51SXRlbSB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IEljb24gfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1pY29ucyc7XG5pbXBvcnQgU3Bpbm5lciBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1zcGlubmVyJztcbmltcG9ydCBDaGVja2JveCBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1jaGVja2JveCc7XG5pbXBvcnQgJ2ZpeGVkLWRhdGEtdGFibGUtMi9kaXN0L2ZpeGVkLWRhdGEtdGFibGUuY3NzJztcblxuaW1wb3J0IFJlc3BvbnNpdmVGaXhlZERhdGFUYWJsZSBmcm9tICcuL3Jlc3BvbnNpdmUtZml4ZWQtZGF0YS10YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IEhlYWRlckNlbGwgZnJvbSAnLi9oZWFkZXItY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IEFjdGlvbkJhciBmcm9tICcuL2FjdGlvbi1iYXIuY29tcG9uZW50JztcbmltcG9ydCBJbmxpbmVFZGl0Q29udHJvbHMgZnJvbSAnLi9pbmxpbmUtZWRpdC1jb250cm9scy5jb21wb25lbnQnO1xuaW1wb3J0IEZpbHRlcmluZ0NvbnRyb2xzIGZyb20gJy4vZmlsdGVyaW5nLWNvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgRHJvcGRvd25Db250cm9scyBmcm9tICcuL2Ryb3Bkb3duLWNvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgKiBhcyBkYXRhZ3JpZEFjdGlvbnMgZnJvbSAnLi9kYXRhZ3JpZC5hY3Rpb25zJztcbmltcG9ydCBDZWxsVG9vbHRpcCBmcm9tICcuL2NlbGwtdG9vbHRpcC5jb21wb25lbnQnO1xuaW1wb3J0IENvbHVtblNldHRpbmdzTW9kYWwgZnJvbSAnLi9jb2x1bW4tc2V0dGluZ3MvY29sdW1uLXNldHRpbmdzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBwcm9wVHlwZXMsIGRlZmF1bHRQcm9wcyB9IGZyb20gJy4vZGF0YWdyaWQucHJvcHMnO1xuaW1wb3J0IHsgS0VZX0NPREVTIH0gZnJvbSAnLi9kYXRhZ3JpZC5jb25zdGFudHMnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4vZGF0YWdyaWQudXRpbHMnO1xuaW1wb3J0IEdyaWRDb2x1bW5TZXJ2aWNlIGZyb20gJy4vY29sdW1uLXNlcnZpY2UvY29sdW1uLXNlcnZpY2UnO1xuaW1wb3J0ICcuL2RhdGFncmlkLmNvbXBvbmVudC5zY3NzJztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlLCBvd25Qcm9wcykgPT4ge1xuICBjb25zdCBHUklEID0gb3duUHJvcHMuZ3JpZDtcbiAgcmV0dXJuIHtcbiAgICBpc0J1c3k6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdpc0J1c3knXSwgdHJ1ZSksXG4gICAgaXNFZGl0aW5nOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnaXNFZGl0aW5nJ10sIGZhbHNlKSxcbiAgICBpc0NyZWF0aW5nOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnaXNDcmVhdGluZyddLCBmYWxzZSksXG4gICAgaXNGaWx0ZXJpbmc6XG4gICAgICBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2lzRmlsdGVyaW5nJ10sIGZhbHNlKSxcbiAgICBpc0NvbHVtblNldHRpbmdzTW9kYWxPcGVuOlxuICAgICAgc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2NvbHVtblNldHRpbmdzTW9kYWwnLCAnb3BlbiddLCBmYWxzZSksXG4gICAgc29ydENvbHVtbjogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnc29ydGluZ0RhdGEnLCAnc29ydENvbHVtbiddLCBudWxsKSxcbiAgICBzb3J0T3JkZXI6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ3NvcnRpbmdEYXRhJywgJ3NvcnRPcmRlciddLCBudWxsKSxcbiAgICB2aXNpYmxlQ29sdW1uczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAndmlzaWJsZUNvbHVtbnMnXSwgTGlzdCgpKSxcbiAgICBjb2x1bW5XaWR0aHM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ2NvbHVtbldpZHRocyddLCBNYXAoKSksXG4gICAgc2VsZWN0ZWRDZWxsOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3NlbGVjdGVkQ2VsbCddLCBNYXAoKSksXG4gICAgc2VsZWN0ZWRJdGVtczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZWxlY3RlZEl0ZW1zJ10sIExpc3QoKSksXG4gICAgZGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdkYXRhJ10sIExpc3QoKSksXG4gICAgZWRpdERhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnZWRpdERhdGEnXSwgTWFwKCkpLFxuICAgIGNyZWF0ZURhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY3JlYXRlRGF0YSddLCBMaXN0KCkpLFxuICAgIGZpbHRlckRhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnZmlsdGVyRGF0YSddLCBNYXAoKSksXG4gICAgY2VsbE1lc3NhZ2VzOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NlbGxNZXNzYWdlcyddLCBNYXAoKSksXG4gICAgY3JlYXRlQ2VsbE1lc3NhZ2VzOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NyZWF0ZUNlbGxNZXNzYWdlcyddLCBNYXAoKSksXG4gICAgYWxsRGF0YVNpemU6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnYWxsRGF0YSddLCBMaXN0KCkpLnNpemUsXG4gICAgbGFuZ3VhZ2U6IFV0aWxzLmdldExhbmd1YWdlKEdSSUQsIHN0YXRlLnVzZXIpLFxuICAgIHJlZ2lvbjogVXRpbHMuZ2V0UmVnaW9uKEdSSUQsIHN0YXRlLnVzZXIpLFxuICAgIGRhdGVGb3JtYXQ6IFV0aWxzLmdldERhdGVGb3JtYXQoR1JJRCwgc3RhdGUudXNlciksXG4gICAgdGhvdXNhbmRTZXBhcmF0b3I6IFV0aWxzLmdldFRob3VzYW5kU2VwYXJhdG9yKEdSSUQsIHN0YXRlLnVzZXIpLFxuICAgIGRlY2ltYWxTZXBhcmF0b3I6IFV0aWxzLmdldERlY2ltYWxTZXBhcmF0b3IoR1JJRCwgc3RhdGUudXNlciksXG4gICAgZm9yY2VSZWZyZXNoVGltZXN0YW1wOiBzdGF0ZS5kYXRhZ3JpZC5nZXQoJ2ZvcmNlUmVmcmVzaCcsIDApLCAvLyBmb3JjZSByZS1yZW5kZXIgd2hlbiBjaGFuZ2VkXG4gICAgZm9jdXNUeXBlOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnZm9jdXNUeXBlJ10sIE1hcCgpKSxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRhdGFncmlkQWN0aW9ucztcblxuZXhwb3J0IGRlZmF1bHRcbkBpbmplY3RJbnRsXG5AY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcylcbmNsYXNzIERhdGFHcmlkIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSBwcm9wVHlwZXM7XG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGN1cnJlbnRSb3c6IDAsXG4gICAgICBjdXJyZW50Q29sdW1uOiAwLFxuICAgIH07XG4gICAgdGhpcy5jZWxsUmVmcyA9IHt9O1xuICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgPSBmYWxzZTtcbiAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IGZhbHNlOyAvLyBUT0RPOiBIYW5kbGUgZm9jdXNpbmcgd2hlbiB0cnVlXG4gICAgdGhpcy5mb2N1c1RvRXJyb3JDZWxsID0gZmFsc2U7IC8vIFRPRE86IEhhbmRsZSBmb2N1c2luZyB3aGVuIHRydWVcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkRvY3VtZW50Q2xpY2spO1xuICAgIHRoaXMucHJvcHMuaW52YWxpZGF0ZSh0aGlzLnByb3BzLmdyaWQpO1xuICB9XG5cbiAgb25Eb2N1bWVudENsaWNrID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmNvbnRleHRNZW51SXRlbXMpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjb250ZXh0TWVudU9wZW46IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkRvY3VtZW50Q2xpY2spO1xuICB9XG5cbiAgb25Db2x1bW5SZXNpemVFbmRDYWxsYmFjayA9IChuZXdDb2x1bW5XaWR0aCwgY29sdW1uS2V5KSA9PiB7XG4gICAgdGhpcy5wcm9wcy5yZXNpemVDb2x1bW4odGhpcy5wcm9wcy5ncmlkLCBjb2x1bW5LZXksIG5ld0NvbHVtbldpZHRoKTtcbiAgfVxuXG4gIG9uQ3JlYXRlQ2VsbEtleURvd24gPSAoZSkgPT4ge1xuICAgIGlmIChlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5FTlRFUikge1xuICAgICAgdGhpcy5wcm9wcy5hZGROZXdJdGVtKHRoaXMucHJvcHMuZ3JpZCwgVXRpbHMuZ2V0Q29sdW1uRGVmYXVsdFZhbHVlcyh0aGlzLnByb3BzLmNvbHVtbnMpKTtcbiAgICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIG9uRWRpdENlbGxLZXlEb3duID0gKGNvbCwgcm93SW5kZXgpID0+IChlKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuZW5hYmxlQXJyb3dOYXZpZ2F0aW9uKSB7XG4gICAgICBjb25zdCB7IGNvbHVtbnMsIHZpc2libGVDb2x1bW5zIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3QgZ3JpZENvbHVtbnMgPSBVdGlscy52aXNpYmxlQ29sdW1ucyhjb2x1bW5zLCB2aXNpYmxlQ29sdW1ucyk7XG4gICAgICBjb25zdCByb3dzU2l6ZSA9IHRoaXMucHJvcHMuZGF0YS5zaXplO1xuICAgICAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCk7XG4gICAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuICAgICAgICBjYXNlIEtFWV9DT0RFUy5ET1dOOiB7XG4gICAgICAgICAgaWYgKGNvbC52YWx1ZVR5cGUgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBjb25zdCBuZXh0RWxlbWVudCA9IHRoaXMuY2VsbFJlZnNbYCR7dGhpcy5wcm9wcy5ncmlkLmlkfV8ke2NvbHVtbktleX1fJHtyb3dJbmRleCArIDF9YF07XG4gICAgICAgICAgICB0aGlzLm1vdmVDZWxsRm9jdXMobmV4dEVsZW1lbnQsIHJvd0luZGV4ICsgMSwgLTEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5VUDoge1xuICAgICAgICAgIGlmIChjb2wudmFsdWVUeXBlICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgY29uc3QgbmV4dEVsZW1lbnQgPSB0aGlzLmNlbGxSZWZzW2Ake3RoaXMucHJvcHMuZ3JpZC5pZH1fJHtjb2x1bW5LZXl9XyR7cm93SW5kZXggLSAxfWBdO1xuICAgICAgICAgICAgdGhpcy5tb3ZlQ2VsbEZvY3VzKG5leHRFbGVtZW50LCByb3dJbmRleCAtIDEsIC0xKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuVEFCOlxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5SSUdIVDpcbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuTEVGVDoge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBsZXQgY29sdW1uSW5kID0gZ3JpZENvbHVtbnMuZmluZEluZGV4KGMgPT4gYy52YWx1ZUtleVBhdGguam9pbignLycpID09PSBjb2x1bW5LZXkpO1xuICAgICAgICAgIGlmIChjb2x1bW5JbmQgIT09IC0xKSB7XG4gICAgICAgICAgICBsZXQgZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgbGV0IG5leHRFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIGxldCByb3dJbmQgPSByb3dJbmRleDtcbiAgICAgICAgICAgIHdoaWxlIChkaXNhYmxlZCkge1xuICAgICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuTEVGVCB8fCAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuVEFCICYmIGUuc2hpZnRLZXkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbHVtbkluZCAtIDEgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kIC09IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyb3dJbmQgLSAxID49IDApIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCA9IGdyaWRDb2x1bW5zLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgICByb3dJbmQgLT0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChjb2x1bW5JbmQgKyAxIDwgZ3JpZENvbHVtbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgKz0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJvd0luZCArIDEgPCByb3dzU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kID0gMDtcbiAgICAgICAgICAgICAgICAgIHJvd0luZCArPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29uc3QgbmV4dENvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShncmlkQ29sdW1uc1tjb2x1bW5JbmRdKTtcbiAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSB0aGlzLmNlbGxSZWZzW2Ake3RoaXMucHJvcHMuZ3JpZC5pZH1fJHtuZXh0Q29sdW1uS2V5fV8ke3Jvd0luZH1gXTtcbiAgICAgICAgICAgICAgZGlzYWJsZWQgPSBuZXh0RWxlbWVudCA/IG5leHRFbGVtZW50LmRpc2FibGVkIDogZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWRpc2FibGVkICYmIG5leHRFbGVtZW50KSB7XG4gICAgICAgICAgICAgIHRoaXMubW92ZUNlbGxGb2N1cyhuZXh0RWxlbWVudCwgcm93SW5kLCBjb2x1bW5JbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uRmlsdGVyQ2VsbFZhbHVlQ2hhbmdlID0gKGNvbCwgdmFsdWVQYXJzZXIpID0+IChldmVudE9yRGF0YSkgPT4ge1xuICAgIGxldCByYXdWYWx1ZTtcbiAgICAvLyBldmVudE9yRGF0YSBjYW4gYmUgaW5wdXQgb25DaGFuZ2UgZXZlbnQsIHJlYWN0LXNlbGVjdCBvbkNoYW5nZSBvciByZWFjdC1kYXktcGlja2VyIG9uQ2hhbmdlXG4gICAgaWYgKGV2ZW50T3JEYXRhKSB7XG4gICAgICBpZiAoZXZlbnRPckRhdGEudGFyZ2V0ICE9PSB1bmRlZmluZWQpIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlO1xuICAgICAgZWxzZSBpZiAoZXZlbnRPckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkgcmF3VmFsdWUgPSBldmVudE9yRGF0YS52YWx1ZTtcbiAgICAgIGVsc2UgcmF3VmFsdWUgPSBldmVudE9yRGF0YTtcbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSB2YWx1ZVBhcnNlcihyYXdWYWx1ZSk7XG4gICAgdGhpcy5wcm9wcy5maWx0ZXJDZWxsVmFsdWVDaGFuZ2UoXG4gICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICB0aGlzLnByb3BzLmNvbHVtbnMsXG4gICAgICBjb2wsXG4gICAgICB2YWx1ZSxcbiAgICApO1xuICB9XG5cbiAgb25DcmVhdGVDZWxsVmFsdWVDaGFuZ2UgPSAocm93SW5kZXgsIGNvbCwgdmFsdWVQYXJzZXIpID0+IChldmVudE9yRGF0YSkgPT4ge1xuICAgIGxldCByYXdWYWx1ZTtcbiAgICAvLyBldmVudE9yRGF0YSBjYW4gYmUgaW5wdXQgb25DaGFuZ2UgZXZlbnQsIHJlYWN0LXNlbGVjdCBvbkNoYW5nZSBvciByZWFjdC1kYXktcGlja2VyIG9uQ2hhbmdlXG4gICAgaWYgKGV2ZW50T3JEYXRhKSB7XG4gICAgICBpZiAoZXZlbnRPckRhdGEudGFyZ2V0ICE9PSB1bmRlZmluZWQpIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlO1xuICAgICAgZWxzZSBpZiAoZXZlbnRPckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkgcmF3VmFsdWUgPSBldmVudE9yRGF0YS52YWx1ZTtcbiAgICAgIGVsc2UgcmF3VmFsdWUgPSBldmVudE9yRGF0YTtcbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSB2YWx1ZVBhcnNlcihyYXdWYWx1ZSk7XG4gICAgdGhpcy5wcm9wcy5jcmVhdGVDZWxsVmFsdWVDaGFuZ2UodGhpcy5wcm9wcy5ncmlkLCByb3dJbmRleCwgY29sLnZhbHVlS2V5UGF0aCwgdmFsdWUpO1xuICAgIGlmIChjb2wub25DcmVhdGVWYWx1ZUNoYW5nZSkge1xuICAgICAgY29sLm9uQ3JlYXRlVmFsdWVDaGFuZ2UodmFsdWUsIGNvbC52YWx1ZUtleVBhdGgsIHJvd0luZGV4KTtcbiAgICB9XG4gICAgaWYgKGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZSAmJiB2YWx1ZSA9PT0gY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm1hdGNoVmFsdWUpIHtcbiAgICAgIC8vIENhbGwgc3BlY2lhbCBwYWlyZWQgdmFsdWUgY2hhbmdlIG9uIG90aGVyIGNlbGwgaWYgdmFsdWUgbWF0Y2hlc1xuICAgICAgdGhpcy5vbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZShcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIHsgdmFsdWVLZXlQYXRoOiBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWVLZXlQYXRoIH0sXG4gICAgICAgIHYgPT4gdixcbiAgICAgICkoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm5ld1ZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNvbC52YWxpZGF0b3JzKSB7XG4gICAgICB0aGlzLnByb3BzLmNyZWF0ZUNlbGxWYWx1ZVZhbGlkYXRlKFxuICAgICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICBjb2wudmFsdWVLZXlQYXRoLFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgY29sLnZhbGlkYXRvcnMsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIG9uRWRpdENlbGxWYWx1ZUNoYW5nZSA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGV2ZW50T3JEYXRhKSA9PiB7XG4gICAgY29uc3QgZGF0YUlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICBsZXQgcmF3VmFsdWU7XG4gICAgLy8gZXZlbnRPckRhdGEgY2FuIGJlIGlucHV0IG9uQ2hhbmdlIGV2ZW50LCByZWFjdC1zZWxlY3Qgb25DaGFuZ2Ugb3IgcmVhY3QtZGF5LXBpY2tlciBvbkNoYW5nZVxuICAgIGlmIChldmVudE9yRGF0YSkge1xuICAgICAgaWYgKGV2ZW50T3JEYXRhLnRhcmdldCAhPT0gdW5kZWZpbmVkKSByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZTtcbiAgICAgIGVsc2UgaWYgKGV2ZW50T3JEYXRhLnZhbHVlICE9PSB1bmRlZmluZWQpIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudmFsdWU7XG4gICAgICBlbHNlIHJhd1ZhbHVlID0gZXZlbnRPckRhdGE7XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlID0gdmFsdWVQYXJzZXIocmF3VmFsdWUpO1xuICAgIHRoaXMucHJvcHMuZWRpdENlbGxWYWx1ZUNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIGRhdGFJZCwgY29sLnZhbHVlS2V5UGF0aCwgdmFsdWUpO1xuICAgIGlmIChjb2wub25FZGl0VmFsdWVDaGFuZ2UpIHtcbiAgICAgIGNvbC5vbkVkaXRWYWx1ZUNoYW5nZSh2YWx1ZSwgY29sLnZhbHVlS2V5UGF0aCwgcm93SW5kZXgsIGRhdGFJZCk7XG4gICAgfVxuICAgIGlmIChjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUgJiYgdmFsdWUgPT09IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5tYXRjaFZhbHVlKSB7XG4gICAgICAvLyBDYWxsIHNwZWNpYWwgcGFpcmVkIHZhbHVlIGNoYW5nZSBvbiBvdGhlciBjZWxsIGlmIHZhbHVlIG1hdGNoZXNcbiAgICAgIHRoaXMub25FZGl0Q2VsbFZhbHVlQ2hhbmdlKFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgeyB2YWx1ZUtleVBhdGg6IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5uZXdWYWx1ZUtleVBhdGggfSxcbiAgICAgICAgdiA9PiB2LFxuICAgICAgKShjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY29sLnZhbGlkYXRvcnMpIHtcbiAgICAgIHRoaXMucHJvcHMuZWRpdENlbGxWYWx1ZVZhbGlkYXRlKFxuICAgICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICAgIGRhdGFJZCxcbiAgICAgICAgY29sLnZhbHVlS2V5UGF0aCxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIGNvbC52YWxpZGF0b3JzLFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBvbkNyZWF0ZUNlbGxCbHVyID0gKHJvd0luZGV4LCBjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZSkgPT4ge1xuICAgIGlmIChjb2wub25DcmVhdGVCbHVyKSB7XG4gICAgICBsZXQgdmFsdWUgPSAoZSAmJiBlLnRhcmdldCAmJiBlLnRhcmdldC52YWx1ZSAhPT0gdW5kZWZpbmVkKSA/XG4gICAgICAgIGUudGFyZ2V0LnZhbHVlIDpcbiAgICAgICAgdGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpO1xuICAgICAgaWYgKHZhbHVlUGFyc2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZVBhcnNlcih2YWx1ZSk7XG4gICAgICB9XG4gICAgICBjb2wub25DcmVhdGVCbHVyKHZhbHVlLCByb3dJbmRleCk7XG4gICAgfVxuICB9XG5cbiAgb25FZGl0Q2VsbEJsdXIgPSAocm93SW5kZXgsIGNvbCwgdmFsdWVQYXJzZXIpID0+IChlKSA9PiB7XG4gICAgaWYgKGNvbC5vbkVkaXRCbHVyKSB7XG4gICAgICBsZXQgdmFsdWUgPSAoZSAmJiBlLnRhcmdldCAmJiBlLnRhcmdldC52YWx1ZSAhPT0gdW5kZWZpbmVkKSA/XG4gICAgICAgIGUudGFyZ2V0LnZhbHVlIDpcbiAgICAgICAgdGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpO1xuICAgICAgaWYgKHZhbHVlUGFyc2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZVBhcnNlcih2YWx1ZSk7XG4gICAgICB9XG4gICAgICBjb25zdCBkYXRhSWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgICAgY29sLm9uRWRpdEJsdXIodmFsdWUsIHJvd0luZGV4LCBkYXRhSWQpO1xuICAgIH1cbiAgfVxuXG4gIG9uQ2VsbEZvY3VzID0gKGNlbGxUeXBlLCBpbnB1dFR5cGUsIHJvd0luZGV4LCBjb2x1bW5LZXkpID0+IChlKSA9PiB7XG4gICAgaWYgKGlucHV0VHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIGUudGFyZ2V0LnNlbGVjdCgpO1xuICAgIH1cbiAgICBpZiAoY2VsbFR5cGUgPT09ICdlZGl0JyAmJiB0aGlzLnByb3BzLmNlbGxTZWxlY3QpIHtcbiAgICAgIHRoaXMucHJvcHMuY2VsbFNlbGVjdGlvbkNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIE1hcCh7IHJvd0luZGV4LCBjb2x1bW5LZXkgfSkpO1xuICAgIH1cbiAgfVxuXG4gIGdldERhdGFJZEJ5Um93SW5kZXggPSByb3dJbmRleCA9PlxuICAgIHRoaXMucHJvcHMuZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLnRoaXMucHJvcHMuZ3JpZC5pZEtleVBhdGhdKTtcblxuICBnZXRTZWxlY3RlZEl0ZW1JbmRleCA9IChpZCkgPT4ge1xuICAgIGlmICghaWQpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnByb3BzLmRhdGEuZmluZEluZGV4KHYgPT4gdi5nZXRJbih0aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoKSA9PT0gaWQpO1xuICAgIHJldHVybiBpbmRleCA9PT0gLTEgPyB1bmRlZmluZWQgOiBpbmRleDtcbiAgfVxuXG4gIGdldEVkaXRJdGVtVmFsdWUgPSAocm93SW5kZXgsIGNvbCwgb3B0aW9ucyA9IFtdKSA9PiB7XG4gICAgLy8gR2V0IHRoZSB2YWx1ZSB0byBkaXNwbGF5IGluIGVkaXQgY2VsbFxuICAgIGNvbnN0IGlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICBjb25zdCBlZGl0VmFsdWUgPSB0aGlzLnByb3BzLmVkaXREYXRhLmdldEluKFtpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0sIHVuZGVmaW5lZCk7XG4gICAgbGV0IG9yaWdpbmFsVmFsdWU7XG4gICAgaWYgKGVkaXRWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBvcmlnaW5hbFZhbHVlID0gdGhpcy5wcm9wcy5kYXRhLmdldEluKFtyb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0sICcnKTtcbiAgICB9IGVsc2UgaWYgKGVkaXRWYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBWYWx1ZSBpcyBmb3VuZCBmcm9tIGVkaXREYXRhXG4gICAgICAvLyBGb3JtYXQgYnkgY29tcG9uZW50IHR5cGVcbiAgICAgIHN3aXRjaCAoY29sLmNvbXBvbmVudFR5cGUpIHtcbiAgICAgICAgY2FzZSAnc2VsZWN0JzpcbiAgICAgICAgICByZXR1cm4gY29sLnNlbGVjdENvbXBvbmVudE9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSBlZGl0VmFsdWUpO1xuICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgICByZXR1cm4gb3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IGVkaXRWYWx1ZSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuIGVkaXRWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG9yaWdpbmFsVmFsdWUgPT09IG51bGwgfHwgb3JpZ2luYWxWYWx1ZSA9PT0gdW5kZWZpbmVkIHx8IG9yaWdpbmFsVmFsdWUgPT09ICcnKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIC8vIFJldHVybiB2YWx1ZSBmcm9tIG9yaWdpbmFsIGRhdGEsIGJlY2F1c2UgZWRpdERhdGEgaXMgbm90IGF2YWlsYWJsZVxuICAgIC8vIEZvcm1hdCBieSBjb21wb25lbnQgdHlwZVxuICAgIHN3aXRjaCAoY29sLmNvbXBvbmVudFR5cGUpIHtcbiAgICAgIGNhc2UgJ2Zsb2F0Jzoge1xuICAgICAgICBpZiAoU3RyaW5nKG9yaWdpbmFsVmFsdWUpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZXR1cm4gU3RyaW5nKG9yaWdpbmFsVmFsdWUpLnJlcGxhY2UoJy4nLCB0aGlzLnByb3BzLmRlY2ltYWxTZXBhcmF0b3IpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvcmlnaW5hbFZhbHVlO1xuICAgICAgfVxuICAgICAgY2FzZSAnc2VsZWN0JzpcbiAgICAgICAgcmV0dXJuIGNvbC5zZWxlY3RDb21wb25lbnRPcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gb3JpZ2luYWxWYWx1ZSk7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSBvcmlnaW5hbFZhbHVlKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBvcmlnaW5hbFZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGdldENyZWF0ZUl0ZW1WYWx1ZSA9IChyb3dJbmRleCwgY29sLCBvcHRpb25zID0gW10pID0+IHtcbiAgICBjb25zdCB2YWwgPSB0aGlzLnByb3BzLmNyZWF0ZURhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSwgJycpO1xuICAgIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9IGVsc2UgaWYgKGNvbC5jb21wb25lbnRUeXBlID09PSAnc2VsZWN0Jykge1xuICAgICAgcmV0dXJuIGNvbC5zZWxlY3RDb21wb25lbnRPcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gdmFsKTtcbiAgICB9IGVsc2UgaWYgKFsnYm9vbGVhbiddLmluY2x1ZGVzKGNvbC5jb21wb25lbnRUeXBlKSkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSB2YWwpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsO1xuICB9XG5cbiAgZ2V0RmlsdGVySXRlbVZhbHVlID0gKGNvbCwgb3B0aW9ucyA9IFtdKSA9PiB7XG4gICAgY29uc3QgdmFsID0gdGhpcy5wcm9wcy5maWx0ZXJEYXRhLmdldChVdGlscy5nZXRDb2x1bW5LZXkoY29sKSwgJycpO1xuICAgIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9IGVsc2UgaWYgKGNvbC5jb21wb25lbnRUeXBlID09PSAnc2VsZWN0Jykge1xuICAgICAgcmV0dXJuIGNvbC5zZWxlY3RDb21wb25lbnRPcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gdmFsKTtcbiAgICB9IGVsc2UgaWYgKFsnY2hlY2tib3gnLCAnYm9vbGVhbiddLmluY2x1ZGVzKGNvbC5jb21wb25lbnRUeXBlKSkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSB2YWwpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsO1xuICB9XG5cbiAgZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZSA9IChyb3dJbmRleCwgY29sLCBtb2RlKSA9PiB7XG4gICAgbGV0IGNvbXBvbmVudERpc2FibGVkID0gISFjb2wuZGlzYWJsZUVkaXRpbmc7XG4gICAgLy8gY2hlY2sgaWYgY29tcG9uZW50IGlzIGRpc2FibGVkIGJ5IG90aGVyIGNvbHVtbiBkYXRhXG4gICAgaWYgKCFjb21wb25lbnREaXNhYmxlZCAmJiBjb2wuZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2gpIHtcbiAgICAgIGlmIChtb2RlID09PSAnY3JlYXRlJykge1xuICAgICAgICBjb21wb25lbnREaXNhYmxlZCA9IHRoaXMuZ2V0Q3JlYXRlSXRlbVZhbHVlKFxuICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgIHsgdmFsdWVLZXlQYXRoOiBjb2wuZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2gubWF0Y2hWYWx1ZUtleVBhdGggfSxcbiAgICAgICAgKSA9PT0gY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb21wb25lbnREaXNhYmxlZCA9IHRoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShcbiAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICB7IHZhbHVlS2V5UGF0aDogY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWVLZXlQYXRoIH0sXG4gICAgICAgICkgPT09IGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaC5tYXRjaFZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29tcG9uZW50RGlzYWJsZWQ7XG4gIH1cblxuICBnZXRSb3dDbGFzc05hbWUgPSAocm93SW5kZXgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBncmlkLFxuICAgICAgaXNDcmVhdGluZyxcbiAgICAgIGlzRWRpdGluZyxcbiAgICAgIGNyZWF0ZURhdGEsXG4gICAgICBzZWxlY3RlZEl0ZW1zLFxuICAgICAgZGF0YSxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCByb3dDbGFzc05hbWVzID0gWydvYy1kYXRhZ3JpZC1yb3cnXTtcbiAgICBsZXQgZXh0cmFSb3dDb3VudCA9IDA7IC8vIGhvdyBtYW55IHJvd3MgdG8gaWdub3JlIGZyb20gdG9wLCBuZXcgKyBmaWx0ZXIgcm93c1xuICAgIGlmIChpc0NyZWF0aW5nKSBleHRyYVJvd0NvdW50ID0gY3JlYXRlRGF0YS5zaXplO1xuICAgIGlmIChpc0NyZWF0aW5nKSB7XG4gICAgICBpZiAocm93SW5kZXggPD0gKGV4dHJhUm93Q291bnQgLSAxKSkge1xuICAgICAgICByb3dDbGFzc05hbWVzLnB1c2goJ29jLWRhdGFncmlkLXJvdy1uZXcnKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzRWRpdGluZykge1xuICAgICAgcm93Q2xhc3NOYW1lcy5wdXNoKCdvYy1kYXRhZ3JpZC1yb3ctZWRpdCcpO1xuICAgIH1cblxuXG4gICAgLy8gY2hlY2sgaWYgcm93IGlzIHNlbGVjdGVkXG4gICAgaWYgKCghaXNDcmVhdGluZyAmJiAhaXNFZGl0aW5nKSAmJlxuICAgICAgICAoc2VsZWN0ZWRJdGVtcyAmJiBncmlkLmlkS2V5UGF0aCkpIHtcbiAgICAgIGlmIChcbiAgICAgICAgc2VsZWN0ZWRJdGVtcy5pbmRleE9mKGRhdGEuZ2V0SW4oW3Jvd0luZGV4IC0gZXh0cmFSb3dDb3VudCwgLi4uZ3JpZC5pZEtleVBhdGhdKSkgIT09IC0xXG4gICAgICApIHtcbiAgICAgICAgcm93Q2xhc3NOYW1lcy5wdXNoKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLnJvd0NsYXNzTmFtZUdldHRlcikge1xuICAgICAgcmV0dXJuIHJvd0NsYXNzTmFtZXMuam9pbignICcpICsgJyAnICsgdGhpcy5wcm9wcy5yb3dDbGFzc05hbWVHZXR0ZXIocm93SW5kZXgpO1xuICAgIH1cbiAgICByZXR1cm4gcm93Q2xhc3NOYW1lcy5qb2luKCcgJyk7XG4gIH1cblxuICBnZXRDZWxsTWVzc2FnZXMgPSAocm93SW5kZXgsIGNvbCwgY2VsbFR5cGUpID0+IHtcbiAgICBjb25zdCByZXR1cm5EYXRhID0ge307XG4gICAgaWYgKCF0aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoIHx8ICFjb2wudmFsdWVLZXlQYXRoKSB7XG4gICAgICByZXR1cm4gcmV0dXJuRGF0YTtcbiAgICB9XG4gICAgbGV0IGluZm9NZXNzYWdlO1xuICAgIGxldCBlcnJvck1lc3NhZ2U7XG4gICAgbGV0IHdhcm5pbmdNZXNzYWdlO1xuICAgIGlmIChjZWxsVHlwZSA9PT0gJ2NyZWF0ZScpIHtcbiAgICAgIGluZm9NZXNzYWdlID0gdGhpcy5wcm9wcy5jcmVhdGVDZWxsTWVzc2FnZXMuZ2V0SW4oWydpbmZvJywgcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgIGVycm9yTWVzc2FnZSA9IHRoaXMucHJvcHMuY3JlYXRlQ2VsbE1lc3NhZ2VzLmdldEluKFsnZXJyb3InLCByb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgd2FybmluZ01lc3NhZ2UgPSB0aGlzLnByb3BzLmNyZWF0ZUNlbGxNZXNzYWdlcy5nZXRJbihbJ3dhcm5pbmcnLCByb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgICBpbmZvTWVzc2FnZSA9IHRoaXMucHJvcHMuY2VsbE1lc3NhZ2VzLmdldEluKFsnaW5mbycsIGlkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgICBlcnJvck1lc3NhZ2UgPSB0aGlzLnByb3BzLmNlbGxNZXNzYWdlcy5nZXRJbihbJ2Vycm9yJywgaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgIHdhcm5pbmdNZXNzYWdlID0gdGhpcy5wcm9wcy5jZWxsTWVzc2FnZXMuZ2V0SW4oWyd3YXJuaW5nJywgaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICB9XG4gICAgaWYgKGluZm9NZXNzYWdlKSB7XG4gICAgICByZXR1cm5EYXRhLmluZm9NZXNzYWdlID0gaW5mb01lc3NhZ2U7XG4gICAgfVxuICAgIGlmIChlcnJvck1lc3NhZ2UpIHtcbiAgICAgIHJldHVybkRhdGEuZXJyb3JNZXNzYWdlID0gZXJyb3JNZXNzYWdlO1xuICAgIH1cbiAgICBpZiAod2FybmluZ01lc3NhZ2UpIHtcbiAgICAgIHJldHVybkRhdGEud2FybmluZ01lc3NhZ2UgPSB3YXJuaW5nTWVzc2FnZTtcbiAgICB9XG4gICAgcmV0dXJuIHJldHVybkRhdGE7XG4gIH1cblxuICBnZXRTY3JvbGxUb1JvdyA9ICgpID0+IHtcbiAgICBsZXQgc2Nyb2xsVG9Sb3c7XG4gICAgaWYgKHRoaXMucHJvcHMuaXNDcmVhdGluZyAmJiAhdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCkgcmV0dXJuIHNjcm9sbFRvUm93O1xuICAgIGlmICh0aGlzLmZvY3VzVG9DcmVhdGVDZWxsKSB7XG4gICAgICBjb25zdCBzY3JvbGxOZXdSb3cgPSB0aGlzLnByb3BzLmNyZWF0ZURhdGEuc2l6ZSAtIDE7XG4gICAgICBpZiAoc2Nyb2xsTmV3Um93ID49IDApIHtcbiAgICAgICAgc2Nyb2xsVG9Sb3cgPSBzY3JvbGxOZXdSb3c7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLmlzRWRpdGluZykge1xuICAgICAgICBzY3JvbGxUb1JvdyA9IHRoaXMuc3RhdGUuY3VycmVudFJvdztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gdGhpcy5wcm9wcy5zY3JvbGxUb1JvdzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgfVxuICAgICAgaWYgKHNjcm9sbFRvUm93ID09PSB1bmRlZmluZWQgJiYgdGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLnNpemUgPiAwKSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gdGhpcy5nZXRTZWxlY3RlZEl0ZW1JbmRleCh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuZmlyc3QoKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzY3JvbGxUb1JvdztcbiAgfVxuXG4gIHNldEZvY3VzVG8gPSAoZm9jdXNUbykgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmlzRWRpdGluZyB8fCB0aGlzLnByb3BzLmlzQ3JlYXRpbmcpIHtcbiAgICAgIGlmIChmb2N1c1RvICYmIGZvY3VzVG8uZ2V0KCd0eXBlJykgJiYgZm9jdXNUbyAhPT0gdGhpcy5wcmV2Rm9jdXNUbykge1xuICAgICAgICB0aGlzW2ZvY3VzVG8uZ2V0KCd0eXBlJyldID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5mb2N1c1RvTGFzdFJvdyA9IGZvY3VzVG8uZ2V0KCdmb2N1c1RvTGFzdFJvdycpO1xuICAgICAgICB0aGlzLnByZXZGb2N1c1RvID0gZm9jdXNUbztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYW5kbGVDZWxsU2VsZWN0ID0gKGNlbGxUeXBlLCByb3dJbmRleCwgY29sdW1uS2V5KSA9PiAoKSA9PiB7XG4gICAgaWYgKGNlbGxUeXBlID09PSAndmlldycgJiYgdGhpcy5wcm9wcy5jZWxsU2VsZWN0KSB7XG4gICAgICB0aGlzLnByb3BzLmNlbGxTZWxlY3Rpb25DaGFuZ2UodGhpcy5wcm9wcy5ncmlkLCBNYXAoeyByb3dJbmRleCwgY29sdW1uS2V5IH0pKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVDcmVhdGVDZWxsUmVmID0gKHJvd0luZGV4LCBjb2wpID0+IChyZWYpID0+IHtcbiAgICAvLyBGb2N1cyB0byBjcmVhdGUgY2VsbFxuICAgIGlmIChcbiAgICAgIHRoaXMucHJvcHMuY3JlYXRlRGF0YS5zaXplICYmXG4gICAgICB0aGlzLnByb3BzLmNyZWF0ZURhdGEuc2l6ZSA9PT0gcm93SW5kZXggKyAxICYmXG4gICAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsICYmXG4gICAgICAhdGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdjcmVhdGUnKVxuICAgICkge1xuICAgICAgcmVmLmZvY3VzKCk7XG4gICAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRWRpdENlbGxSZWYgPSAocm93SW5kZXgsIGNvbCkgPT4gKHJlZikgPT4ge1xuICAgIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2wpO1xuICAgIGlmICh0aGlzLmZvY3VzVG9FZGl0Q2VsbCAmJiAhdGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdlZGl0JykpIHtcbiAgICAgIGNvbnN0IHNlbGVjdGVkUm93SW5kZXggPSB0aGlzLmZvY3VzVG9MYXN0Um93ICYmIHRoaXMucHJvcHMuZGF0YS5zaXplID4gMCA/XG4gICAgICAgIHRoaXMucHJvcHMuZGF0YS5zaXplIC0gMSA6IHRoaXMuZ2V0U2VsZWN0ZWRJdGVtSW5kZXgodGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLmZpcnN0KCkpO1xuXG4gICAgICBjb25zdCB7IHNlbGVjdGVkQ2VsbCB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGlmIChzZWxlY3RlZENlbGwuc2l6ZSA+IDApIHtcbiAgICAgICAgaWYgKHNlbGVjdGVkQ2VsbC5nZXQoJ3Jvd0luZGV4JykgPT09IHJvd0luZGV4ICYmIHNlbGVjdGVkQ2VsbC5nZXQoJ2NvbHVtbktleScpID09PSBjb2x1bW5LZXkpIHtcbiAgICAgICAgICByZWYuZm9jdXMoKTtcbiAgICAgICAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuZm9jdXNUb0xhc3RSb3cgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzZWxlY3RlZFJvd0luZGV4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mb2N1c1RvTGFzdFJvdyA9IGZhbHNlO1xuICAgICAgfSBlbHNlIGlmIChzZWxlY3RlZFJvd0luZGV4ID09PSByb3dJbmRleCkge1xuICAgICAgICByZWYuZm9jdXMoKTtcbiAgICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mb2N1c1RvTGFzdFJvdyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5lbmFibGVBcnJvd05hdmlnYXRpb24pIHtcbiAgICAgIHRoaXMuY2VsbFJlZnNbYCR7dGhpcy5wcm9wcy5ncmlkLmlkfV8ke2NvbHVtbktleX1fJHtyb3dJbmRleH1gXSA9IHJlZjtcbiAgICB9XG4gIH1cblxuICBtb3ZlQ2VsbEZvY3VzID0gKG5leHRFbGVtZW50LCByb3dJbmRleCwgY29sdW1uSW5kZXgpID0+IHtcbiAgICBjb25zdCBlbGVtZW50VHlwZXMgPSBbJ3RleHQnLCAnbnVtYmVyJ107XG4gICAgaWYgKG5leHRFbGVtZW50ICYmIGVsZW1lbnRUeXBlcy5pbmNsdWRlcyhuZXh0RWxlbWVudC50eXBlKSkge1xuICAgICAgaWYgKHJvd0luZGV4ICE9PSAtMSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgY3VycmVudFJvdzogcm93SW5kZXggfSk7XG4gICAgICB9XG4gICAgICBpZiAoY29sdW1uSW5kZXggIT09IC0xKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjdXJyZW50Q29sdW1uOiBjb2x1bW5JbmRleCB9KTtcbiAgICAgIH1cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gbmV4dEVsZW1lbnQuc2VsZWN0KCksIDUwKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVTZWxlY3Rpb25DaGVja0JveE9uQ2hhbmdlID0gcm93SW5kZXggPT4gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMuaXRlbVNlbGVjdGlvbkNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIHJvd0luZGV4LCB0cnVlLCBmYWxzZSk7XG4gIH1cblxuICBnZW5lcmF0ZUNvbHVtbnMgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBleHRyYUNvbHVtbiB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBjb2x1bW5zID0gW107XG4gICAgY29uc3QgdGFiSW5kZXggPSBTdHJpbmcodGhpcy5wcm9wcy50YWJJbmRleCk7XG4gICAgaWYgKGV4dHJhQ29sdW1uKSB7XG4gICAgICBjb2x1bW5zLnB1c2goe1xuICAgICAgICB3aWR0aDogZXh0cmFDb2x1bW4ud2lkdGggfHwgNDAsXG4gICAgICAgIGlzUmVzaXphYmxlOiAhIWV4dHJhQ29sdW1uLmlzUmVzaXphYmxlLFxuICAgICAgICBpc1NvcnRhYmxlOiBmYWxzZSxcbiAgICAgICAgY29sdW1uS2V5OiAnZXh0cmFDb2x1bW4nLFxuICAgICAgICBjZWxsOiByb3dJbmRleCA9PiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1leHRyYS1jb2x1bW4tY2VsbCBuby1yb3ctc2VsZWN0XCI+XG4gICAgICAgICAgICB7IGV4dHJhQ29sdW1uLnZhbHVlUmVuZGVyKHRoaXMucHJvcHMuZGF0YS5nZXQocm93SW5kZXgpLCB0YWJJbmRleCkgfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApLFxuICAgICAgICBjZWxsRWRpdDogcm93SW5kZXggPT4gKGV4dHJhQ29sdW1uLmNlbGxFZGl0ID8gZXh0cmFDb2x1bW4uY2VsbEVkaXQocm93SW5kZXgpIDogbnVsbCksXG4gICAgICAgIGNlbGxDcmVhdGU6IHJvd0luZGV4ID0+IChleHRyYUNvbHVtbi5jZWxsQ3JlYXRlID8gZXh0cmFDb2x1bW4uY2VsbENyZWF0ZShyb3dJbmRleCkgOiBudWxsKSxcbiAgICAgICAgY2VsbEZpbHRlcjogcm93SW5kZXggPT4gKGV4dHJhQ29sdW1uLmNlbGxGaWx0ZXIgPyBleHRyYUNvbHVtbi5jZWxsRmlsdGVyKHJvd0luZGV4KSA6IG51bGwpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcHMucm93U2VsZWN0Q2hlY2tib3hDb2x1bW4pIHtcbiAgICAgIGNvbHVtbnMucHVzaCh7XG4gICAgICAgIHdpZHRoOiA0MCxcbiAgICAgICAgaXNSZXNpemFibGU6IGZhbHNlLFxuICAgICAgICBpc1NvcnRhYmxlOiBmYWxzZSxcbiAgICAgICAgY29sdW1uS2V5OiAnc2VsZWN0aW9uQ2hlY2tib3gnLFxuICAgICAgICBjZWxsOiAocm93SW5kZXgpID0+IHtcbiAgICAgICAgICBjb25zdCByb3dJdGVtID0gdGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCk7XG4gICAgICAgICAgY29uc3QgaXRlbUlkID0gcm93SXRlbS5nZXRJbih0aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoKTtcbiAgICAgICAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhpdGVtSWQpO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkU2VsZWN0Q2hlY2tCb3gtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtc2VsZWN0LWNoZWNrYm94LWNlbGwgbm8tcm93LXNlbGVjdFwiXG4gICAgICAgICAgICAgIGNoZWNrZWQ9e3NlbGVjdGVkfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVTZWxlY3Rpb25DaGVja0JveE9uQ2hhbmdlKHJvd0luZGV4KX1cbiAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICBjZWxsRWRpdDogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbENyZWF0ZTogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbEZpbHRlcjogKCkgPT4gbnVsbCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHZpc2libGVDb2x1bW5zID0gW107XG4gICAgdGhpcy5wcm9wcy52aXNpYmxlQ29sdW1ucy5mb3JFYWNoKCh2aXNpYmxlQ29sdW1uS2V5KSA9PiB7XG4gICAgICB0aGlzLnByb3BzLmNvbHVtbnMuZm9yRWFjaCgob3JnQ29sKSA9PiB7XG4gICAgICAgIGlmIChVdGlscy5nZXRDb2x1bW5LZXkob3JnQ29sKSA9PT0gdmlzaWJsZUNvbHVtbktleSkge1xuICAgICAgICAgIHZpc2libGVDb2x1bW5zLnB1c2gob3JnQ29sKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgdmlzaWJsZUNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGRhdGEsXG4gICAgICAgIGRhdGVGb3JtYXQsXG4gICAgICAgIHRob3VzYW5kU2VwYXJhdG9yLFxuICAgICAgICBkZWNpbWFsU2VwYXJhdG9yLFxuICAgICAgICBncmlkLFxuICAgICAgICBpbmxpbmVFZGl0LFxuICAgICAgICBmaWx0ZXJpbmcsXG4gICAgICAgIHJlZ2lvbixcbiAgICAgICAgaW50bCxcbiAgICAgICAgc2VsZWN0Q29tcG9uZW50T3B0aW9ucyxcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgICBjb25zdCB2YWx1ZUVtcHR5Q2hlY2tlciA9IFV0aWxzLmdldFZhbHVlRW1wdHlDaGVja2VyKGNvbCk7XG4gICAgICAvLyBDZWxsIHZhbHVlIHJlbmRlcmluZ1xuICAgICAgY29uc3QgdmFsdWVSZW5kZXIgPSAocm93SW5kZXgsIGZvcm1hdCkgPT4ge1xuICAgICAgICBjb25zdCB2YWwgPSBkYXRhLmdldEluKFtyb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsKSkge1xuICAgICAgICAgIHJldHVybiBjb2wuaXNSZXF1aXJlZCA/IDxNIGlkPVwiR3JpZC5WYWx1ZUlzTWlzc2luZ1wiIC8+IDogJyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvcm1hdCA/IGZvcm1hdCh2YWwpIDogdmFsO1xuICAgICAgfTtcblxuICAgICAgbGV0IGNvbHVtbiA9IEdyaWRDb2x1bW5TZXJ2aWNlLmJhc2VDb2x1bW4oY29sKTtcbiAgICAgIC8vIENvbGxlY3QgY29sdW1uIGZ1bmN0aW9ucyBpbnRvIG9uZSBPYmplY3RcbiAgICAgIGNvbnN0IGNvbHVtbkZ1bmN0aW9ucyA9IHtcbiAgICAgICAgZWRpdDoge1xuICAgICAgICAgIGdldEl0ZW1WYWx1ZTogdGhpcy5nZXRFZGl0SXRlbVZhbHVlLFxuICAgICAgICAgIG9uQ2VsbFZhbHVlQ2hhbmdlOiB0aGlzLm9uRWRpdENlbGxWYWx1ZUNoYW5nZSxcbiAgICAgICAgICBvbkNlbGxCbHVyOiB0aGlzLm9uRWRpdENlbGxCbHVyLFxuICAgICAgICAgIG9uQ2VsbEZvY3VzOiB0aGlzLm9uQ2VsbEZvY3VzLFxuICAgICAgICAgIG9uQ2VsbEtleURvd246IHRoaXMub25FZGl0Q2VsbEtleURvd24sXG4gICAgICAgICAgaGFuZGxlQ2VsbFJlZjogdGhpcy5oYW5kbGVFZGl0Q2VsbFJlZixcbiAgICAgICAgfSxcbiAgICAgICAgY3JlYXRlOiB7XG4gICAgICAgICAgZ2V0SXRlbVZhbHVlOiB0aGlzLmdldENyZWF0ZUl0ZW1WYWx1ZSxcbiAgICAgICAgICBvbkNlbGxWYWx1ZUNoYW5nZTogdGhpcy5vbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSxcbiAgICAgICAgICBvbkNlbGxCbHVyOiB0aGlzLm9uQ3JlYXRlQ2VsbEJsdXIsXG4gICAgICAgICAgb25DZWxsRm9jdXM6IHRoaXMub25DZWxsRm9jdXMsXG4gICAgICAgICAgb25DZWxsS2V5RG93bjogdGhpcy5vbkNyZWF0ZUNlbGxLZXlEb3duLFxuICAgICAgICAgIGhhbmRsZUNlbGxSZWY6IHRoaXMuaGFuZGxlQ3JlYXRlQ2VsbFJlZixcbiAgICAgICAgfSxcbiAgICAgICAgZmlsdGVyOiB7XG4gICAgICAgICAgZ2V0SXRlbVZhbHVlOiB0aGlzLmdldEZpbHRlckl0ZW1WYWx1ZSxcbiAgICAgICAgICBvbkNlbGxWYWx1ZUNoYW5nZTogdGhpcy5vbkZpbHRlckNlbGxWYWx1ZUNoYW5nZSxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIC8vIGhhbmRsZSBjb2x1bW4uY2VsbCAvIGNvbHVtbi5jZWxsRWRpdCAvIGNvbHVtbi5jZWxsQ3JlYXRlIC8gY29sdW1uLmNlbGxGaWx0ZXJcbiAgICAgIGNvbnN0IGNlbGxQcm9wcyA9IHsgZGF0YSwgZGF0ZUZvcm1hdCwgdGhvdXNhbmRTZXBhcmF0b3IsIGRlY2ltYWxTZXBhcmF0b3IgfTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgY29sdW1uID0gR3JpZENvbHVtblNlcnZpY2UuY29sdW1uQ2VsbChjb2x1bW4sIGNlbGxQcm9wcywgY29sLCB2YWx1ZVJlbmRlcik7XG5cbiAgICAgIC8vIGhhbmRsZSBjb2x1bW5Db21wb25lbnRUeXBlc1xuICAgICAgY29uc3QgY29tcG9uZW50VHlwZVByb3BzID0geyAuLi5jZWxsUHJvcHMsIGdyaWQsIGlubGluZUVkaXQsIGZpbHRlcmluZywgcmVnaW9uLCBpbnRsLCBzZWxlY3RDb21wb25lbnRPcHRpb25zIH07IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIGNvbHVtbiA9IEdyaWRDb2x1bW5TZXJ2aWNlLmNvbHVtbkNvbXBvbmVudFR5cGUoXG4gICAgICAgIGNvbHVtbixcbiAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgIGNvbXBvbmVudFR5cGVQcm9wcyxcbiAgICAgICAgY29sLFxuICAgICAgICBjb2x1bW5GdW5jdGlvbnMsXG4gICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZSxcbiAgICAgICk7XG5cbiAgICAgIGNvbHVtbnMucHVzaChjb2x1bW4pO1xuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuaXNDcmVhdGluZykge1xuICAgICAgY29sdW1ucy5wdXNoKHtcbiAgICAgICAgd2lkdGg6IDM3LFxuICAgICAgICBpc1Jlc2l6YWJsZTogZmFsc2UsXG4gICAgICAgIGNvbHVtbktleTogJ3JlbW92ZU5ld0l0ZW0nLFxuICAgICAgICBjZWxsOiAoKSA9PiBudWxsLFxuICAgICAgICBjZWxsRWRpdDogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbENyZWF0ZTogcm93SW5kZXggPT4gKFxuICAgICAgICAgIDxJY29uXG4gICAgICAgICAgICBpZD17YG9jLWRhdGFncmlkLW5ldy1pdGVtLXJlbW92ZS0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtyb3dJbmRleH1gfVxuICAgICAgICAgICAgdHlwZT1cImluZGljYXRvclwiXG4gICAgICAgICAgICBuYW1lPVwiZGVsZXRlXCJcbiAgICAgICAgICAgIHdpZHRoPXszMH1cbiAgICAgICAgICAgIGhlaWdodD17MzB9XG4gICAgICAgICAgICBzdHlsZT17eyBwYWRkaW5nOiAnN3B4JyB9fVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdGhpcy5wcm9wcy5yZW1vdmVOZXdJdGVtKHRoaXMucHJvcHMuZ3JpZCwgcm93SW5kZXgpfVxuICAgICAgICAgIC8+XG4gICAgICAgICksXG4gICAgICAgIGNlbGxGaWx0ZXI6ICgpID0+IG51bGwsXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbHVtbnM7XG4gIH1cblxuICBpc0NlbGxFZGl0ZWQgPSAocm93SW5kZXgsIGNvbCwgY2VsbFR5cGUpID0+IHtcbiAgICBpZiAoY2VsbFR5cGUgIT09ICdlZGl0Jykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBpZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgaWYgKHRoaXMucHJvcHMuZWRpdERhdGEuZ2V0SW4oW2lkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBoYW5kbGVBZnRlckFkZEl0ZW0gPSAoKSA9PiB7XG4gICAgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCA9IHRydWU7XG4gIH1cblxuICBoYW5kbGVBZnRlckVkaXRQcmVzcyA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLnNpemUpIHtcbiAgICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gdHJ1ZTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjdXJyZW50Um93OiB1bmRlZmluZWQsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVBZnRlclZhbGlkYXRpb25FcnJvciA9ICgpID0+IHtcbiAgICB0aGlzLmZvY3VzVG9FcnJvckNlbGwgPSB0cnVlO1xuICB9XG5cbiAgaGFuZGxlUm93Q2xpY2sgPSAoZSwgcm93SW5kZXgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5yb3dTZWxlY3QgJiYgIXRoaXMucHJvcHMuaXNDcmVhdGluZyAmJiAhdGhpcy5wcm9wcy5pc0VkaXRpbmcpIHtcbiAgICAgIGlmIChlLmN0cmxLZXkgfHwgZS5zaGlmdEtleSkge1xuICAgICAgICBkb2N1bWVudC5nZXRTZWxlY3Rpb24oKS5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICAgIH1cbiAgICAgIC8vIERvbid0IHRyaWdnZXIgc2VsZWN0aW9uIGNoYW5nZSBvbiB3aGVuIHVzZXIgY2xpY2tzIG9uIHNwZWNpYWwgY2VsbHMgbGlrZSBjaGVja2JveC9leHRyYVxuICAgICAgLy8gQ2hlY2sgdGhhdCBjbGlja2VkIG5vZGUncyBwYXJlbnQgb3IgcGFyZW50J3MgcGFyZW50IGRvZXNuJ3QgaGF2ZSBuby1yb3ctc2VsZWN0IGNsYXNzXG4gICAgICBjb25zdCB7IHBhcmVudE5vZGUgfSA9IGUudGFyZ2V0O1xuICAgICAgY29uc3QgcGFyZW50MWNsYXNzID0gcGFyZW50Tm9kZS5jbGFzc05hbWUgJiYgcGFyZW50Tm9kZS5jbGFzc05hbWUuaW5kZXhPZlxuICAgICAgICA/IHBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgIDogJyc7XG4gICAgICAgIGNvbnN0IHBhcmVudDJjbGFzcyA9IHBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUgJiYgcGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZS5pbmRleE9mIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgPyBwYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgIDogJyc7XG4gICAgICAgIGNvbnN0IHBhcmVudDNjbGFzcyA9IHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZSAmJiBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUuaW5kZXhPZiAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgID8gcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgIDogJyc7XG4gICAgICAgIGNvbnN0IHBhcmVudDRjbGFzcyA9IHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lICYmIHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lLmluZGV4T2YgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICA/IHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgIDogJyc7XG4gICAgICBpZiAoXG4gICAgICAgIHBhcmVudDFjbGFzcy5pbmRleE9mKCduby1yb3ctc2VsZWN0JykgPT09IC0xICYmXG4gICAgICAgIHBhcmVudDJjbGFzcy5pbmRleE9mKCduby1yb3ctc2VsZWN0JykgPT09IC0xICYmXG4gICAgICAgIHBhcmVudDNjbGFzcy5pbmRleE9mKCduby1yb3ctc2VsZWN0JykgPT09IC0xICYmXG4gICAgICAgIHBhcmVudDRjbGFzcy5pbmRleE9mKCduby1yb3ctc2VsZWN0JykgPT09IC0xXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5wcm9wcy5pdGVtU2VsZWN0aW9uQ2hhbmdlKFxuICAgICAgICAgIHRoaXMucHJvcHMuZ3JpZCxcbiAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICB0aGlzLnByb3BzLm11bHRpU2VsZWN0ICYmIGUuY3RybEtleSxcbiAgICAgICAgICB0aGlzLnByb3BzLm11bHRpU2VsZWN0ICYmIGUuc2hpZnRLZXksXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLm9uUm93Q2xpY2spIHtcbiAgICAgIHRoaXMucHJvcHMub25Sb3dDbGljayhlLCByb3dJbmRleCwgdGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCkpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGhhbmRsZUNvbnRleHRNZW51ID0gKGUsIHJvd0luZGV4KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuY29udGV4dE1lbnVJdGVtcykge1xuICAgICAgY29uc3Qge1xuICAgICAgICBpdGVtU2VsZWN0aW9uQ2hhbmdlLFxuICAgICAgICBzZWxlY3RlZEl0ZW1zLFxuICAgICAgICBncmlkLFxuICAgICAgICBkYXRhLFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGNvbnRleHRNZW51T3BlbjogdHJ1ZSxcbiAgICAgICAgY29udGV4dE1lbnVYOiBlLmNsaWVudFgsXG4gICAgICAgIGNvbnRleHRNZW51WTogZS5jbGllbnRZLFxuICAgICAgfSk7XG4gICAgICAvLyBJZiBjbGlja2VkIGl0ZW0gaXMgbm90IHNlbGVjdGVkLCBjaGFuZ2Ugc2VsZWN0aW9uIHRvIGl0XG4gICAgICBpZiAoIXNlbGVjdGVkSXRlbXMuaW5jbHVkZXMoZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmdyaWQuaWRLZXlQYXRoXSkpKSB7XG4gICAgICAgIGl0ZW1TZWxlY3Rpb25DaGFuZ2UoZ3JpZCwgcm93SW5kZXgpO1xuICAgICAgfVxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uRG9jdW1lbnRDbGljayk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaGFuZGxlQ29udGV4dE1lbnVJdGVtQ2xpY2sgPSAob25DbGljaywgc2VsZWN0ZWRJdGVtcywgc2VsZWN0ZWREYXRhKSA9PiAoKSA9PiB7XG4gICAgb25DbGljayhzZWxlY3RlZEl0ZW1zLCBzZWxlY3RlZERhdGEpO1xuICB9XG5cbiAgaGFuZGxlUm93SGVpZ2h0R2V0dGVyID0gcm93SW5kZXggPT5cbiAgICB0aGlzLnByb3BzLnJvd0hlaWdodEdldHRlcih0aGlzLnByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSwgcm93SW5kZXgpO1xuXG4gIHJlbmRlckNlbGwgPSBjb2wgPT4gKGNlbGxQcm9wcykgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGlzQ3JlYXRpbmcsXG4gICAgICBpc0VkaXRpbmcsXG4gICAgICBjcmVhdGVEYXRhLFxuICAgICAgc2VsZWN0ZWRDZWxsLFxuICAgICAgZ3JpZCxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHJvd0luZGV4LCAuLi5wcm9wcyB9ID0gY2VsbFByb3BzO1xuICAgIGxldCBjZWxsO1xuICAgIGxldCBjZWxsVHlwZSA9ICd2aWV3JztcbiAgICBsZXQgZXh0cmFSb3dDb3VudCA9IDA7IC8vIGhvdyBtYW55IHJvd3MgdG8gaWdub3JlIGZyb20gdG9wLCBuZXcgKyBmaWx0ZXIgcm93c1xuICAgIGlmIChpc0NyZWF0aW5nKSBleHRyYVJvd0NvdW50ID0gY3JlYXRlRGF0YS5zaXplO1xuICAgIGlmIChpc0NyZWF0aW5nKSB7XG4gICAgICBpZiAocm93SW5kZXggPD0gKGV4dHJhUm93Q291bnQgLSAxKSkge1xuICAgICAgICBpZiAoY29sLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjZWxsID0gY29sLmNlbGxDcmVhdGUocm93SW5kZXgpO1xuICAgICAgICAgIGNlbGxUeXBlID0gJ2NyZWF0ZSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2VsbCA9IG51bGw7XG4gICAgICAgICAgY2VsbFR5cGUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjZWxsID0gY29sLmNlbGwocm93SW5kZXggLSBleHRyYVJvd0NvdW50KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzRWRpdGluZyAmJiBjb2wuY2VsbEVkaXQpIHtcbiAgICAgIGNlbGwgPSBjb2wuY2VsbEVkaXQocm93SW5kZXggLSBleHRyYVJvd0NvdW50KTtcbiAgICAgIGNlbGxUeXBlID0gJ2VkaXQnO1xuICAgIH0gZWxzZSB7XG4gICAgICBjZWxsID0gY29sLmNlbGwocm93SW5kZXggLSBleHRyYVJvd0NvdW50KTtcbiAgICB9XG4gICAgY29uc3QgaXNTcGVjaWFsID0gcHJvcHMuY29sdW1uS2V5ID09PSAnc2VsZWN0aW9uQ2hlY2tib3gnIHx8IHByb3BzLmNvbHVtbktleSA9PT0gJ2V4dHJhQ29sdW1uJztcbiAgICBpZiAoKGNlbGxUeXBlID09PSAndmlldycgfHwgY2VsbFR5cGUgPT09ICdlZGl0JyB8fCBjZWxsVHlwZSA9PT0gJ2NyZWF0ZScpICYmICFpc1NwZWNpYWwpIHtcbiAgICAgIGNvbnN0IGdldFJvd0luZGV4ID0gKGNlbGxUeXBlID09PSAnY3JlYXRlJykgPyByb3dJbmRleCA6IChyb3dJbmRleCAtIGV4dHJhUm93Q291bnQpO1xuICAgICAgY29uc3QgbWVzc2FnZURhdGEgPSB0aGlzLmdldENlbGxNZXNzYWdlcyhnZXRSb3dJbmRleCwgY29sLCBjZWxsVHlwZSk7XG4gICAgICBjb25zdCBpc0VkaXRlZCA9IHRoaXMuaXNDZWxsRWRpdGVkKGdldFJvd0luZGV4LCBjb2wsIGNlbGxUeXBlKTtcbiAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IChzZWxlY3RlZENlbGwuZ2V0KCdyb3dJbmRleCcpID09PSByb3dJbmRleCAmJiBzZWxlY3RlZENlbGwuZ2V0KCdjb2x1bW5LZXknKSA9PT0gcHJvcHMuY29sdW1uS2V5KSA/XG4gICAgICAgICdvYy1kYXRhZ3JpZC1jZWxsIGlzLXNlbGVjdGVkJyA6ICdvYy1kYXRhZ3JpZC1jZWxsJztcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxDZWxsXG4gICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICAgIHN0eWxlPXtjb2wuc3R5bGV9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDZWxsU2VsZWN0KGNlbGxUeXBlLCByb3dJbmRleCwgcHJvcHMuY29sdW1uS2V5KX1cbiAgICAgICAgPlxuICAgICAgICAgIDxDZWxsVG9vbHRpcFxuICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkQ2VsbC0ke2dyaWQuaWR9LSR7cHJvcHMuY29sdW1uS2V5fS0ke3Jvd0luZGV4fWB9XG4gICAgICAgICAgICBpc0VkaXRlZD17aXNFZGl0ZWR9XG4gICAgICAgICAgICBpc0Vycm9yPXshIW1lc3NhZ2VEYXRhLmVycm9yTWVzc2FnZX1cbiAgICAgICAgICAgIGlzV2FybmluZz17ISFtZXNzYWdlRGF0YS53YXJuaW5nTWVzc2FnZX1cbiAgICAgICAgICAgIGluZm9NZXNzYWdlPXttZXNzYWdlRGF0YS5pbmZvTWVzc2FnZX1cbiAgICAgICAgICAgIGVycm9yTWVzc2FnZT17bWVzc2FnZURhdGEuZXJyb3JNZXNzYWdlfVxuICAgICAgICAgICAgd2FybmluZ01lc3NhZ2U9e21lc3NhZ2VEYXRhLndhcm5pbmdNZXNzYWdlfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHsgY2VsbCB9XG4gICAgICAgICAgPC9DZWxsVG9vbHRpcD5cbiAgICAgICAgPC9DZWxsPlxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxDZWxsIHsuLi5wcm9wc30gY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtY2VsbFwiIHN0eWxlPXtjb2wuc3R5bGV9PnsgY2VsbCB9PC9DZWxsPlxuICAgICk7XG4gIH1cblxuICByZW5kZXJDb2x1bW5zID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5hbGxEYXRhU2l6ZSAmJiAhdGhpcy5wcm9wcy5pc0J1c3kgJiYgIXRoaXMucHJvcHMuaXNDcmVhdGluZykge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPENvbHVtblxuICAgICAgICAgIGNvbHVtbktleT1cImRhdGFFbXB0eUNvbHVtblwiXG4gICAgICAgICAgaGVhZGVyPXs8Q2VsbCBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInIH19PjxNIGlkPVwiR3JpZC5Ob0l0ZW1zXCIgLz48L0NlbGw+fVxuICAgICAgICAgIHdpZHRoPXsxMH1cbiAgICAgICAgICBpc1Jlc2l6YWJsZT17ZmFsc2V9XG4gICAgICAgICAgZmxleEdyb3c9ezF9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoIXRoaXMucHJvcHMudmlzaWJsZUNvbHVtbnMuc2l6ZSkge1xuICAgICAgaWYgKHRoaXMucHJvcHMuaXNCdXN5KSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPENvbHVtblxuICAgICAgICAgICAgY29sdW1uS2V5PVwiZGF0YUVtcHR5Q29sdW1uXCJcbiAgICAgICAgICAgIGhlYWRlcj17PENlbGw+Jm5ic3A7PC9DZWxsPn1cbiAgICAgICAgICAgIHdpZHRoPXsxMH1cbiAgICAgICAgICAgIGlzUmVzaXphYmxlPXtmYWxzZX1cbiAgICAgICAgICAgIGZsZXhHcm93PXsxfVxuICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Q29sdW1uXG4gICAgICAgICAgY29sdW1uS2V5PVwiZGF0YUVtcHR5Q29sdW1uXCJcbiAgICAgICAgICBoZWFkZXI9ezxDZWxsIHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicgfX0+PE0gaWQ9XCJHcmlkLk5vQ29sdW1uc1wiIC8+PC9DZWxsPn1cbiAgICAgICAgICB3aWR0aD17MTB9XG4gICAgICAgICAgaXNSZXNpemFibGU9e2ZhbHNlfVxuICAgICAgICAgIGZsZXhHcm93PXsxfVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3QgY29sdW1ucyA9IHRoaXMuZ2VuZXJhdGVDb2x1bW5zKCk7XG4gICAgaWYgKGNvbHVtbnMubGVuZ2h0ID09PSAwKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gY29sdW1ucy5tYXAoY29sID0+IChcbiAgICAgIDxDb2x1bW5cbiAgICAgICAga2V5PXtjb2wuY29sdW1uS2V5fVxuICAgICAgICBjb2x1bW5LZXk9e2NvbC5jb2x1bW5LZXl9XG4gICAgICAgIGhlYWRlcj17XG4gICAgICAgICAgPEhlYWRlckNlbGxcbiAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZEhlYWRlci0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2wuY29sdW1uS2V5fWB9XG4gICAgICAgICAgICBncmlkPXt0aGlzLnByb3BzLmdyaWR9XG4gICAgICAgICAgICBjb2x1bW5zPXt0aGlzLnByb3BzLmNvbHVtbnN9XG4gICAgICAgICAgICBjb2x1bW49e2NvbH1cbiAgICAgICAgICAgIGN1cnJlbnRTb3J0Q29sdW1uPXt0aGlzLnByb3BzLnNvcnRDb2x1bW59XG4gICAgICAgICAgICBjdXJyZW50U29ydE9yZGVyPXt0aGlzLnByb3BzLnNvcnRPcmRlcn1cbiAgICAgICAgICAgIG9uU29ydENoYW5nZT17dGhpcy5wcm9wcy5zb3J0Q2hhbmdlfVxuICAgICAgICAgICAgaXNCdXN5PXt0aGlzLnByb3BzLmlzQnVzeX1cbiAgICAgICAgICAgIGZpbHRlcmluZz17dGhpcy5wcm9wcy5pc0ZpbHRlcmluZ31cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7Y29sLmhlYWRlcn1cbiAgICAgICAgICA8L0hlYWRlckNlbGw+XG4gICAgICAgIH1cbiAgICAgICAgY2VsbD17dGhpcy5yZW5kZXJDZWxsKGNvbCl9XG4gICAgICAgIHdpZHRoPXt0aGlzLnByb3BzLmNvbHVtbldpZHRocy5nZXQoY29sLmNvbHVtbktleSwgY29sLndpZHRoKX1cbiAgICAgICAgbWluV2lkdGg9e2NvbC5taW5XaWR0aH1cbiAgICAgICAgbWF4V2lkdGg9e2NvbC5tYXhXaWR0aH1cbiAgICAgICAgaXNSZXNpemFibGU9e2NvbC5pc1Jlc2l6YWJsZX1cbiAgICAgICAgZmxleEdyb3c9e2NvbC5mbGV4R3JvdyA/IGNvbC5mbGV4R3JvdyA6IDB9XG4gICAgICAgIGZpeGVkPXtjb2wuZml4ZWR9XG4gICAgICAgIGFsbG93Q2VsbHNSZWN5Y2xpbmc9e2NvbC5hbGxvd0NlbGxzUmVjeWNsaW5nfVxuICAgICAgLz4pKTtcbiAgfVxuXG4gIHJlbmRlckNvbnRleHRNZW51ID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGNvbnRleHRNZW51SXRlbXMsXG4gICAgICBkYXRhLFxuICAgICAgZ3JpZCxcbiAgICAgIHNlbGVjdGVkSXRlbXMsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge1xuICAgICAgY29udGV4dE1lbnVYLFxuICAgICAgY29udGV4dE1lbnVZLFxuICAgIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHN0eWxlID0ge1xuICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgIHpJbmRleDogMTAwMDAsXG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIHRvcDogYCR7Y29udGV4dE1lbnVZfXB4YCxcbiAgICAgIGxlZnQ6IGAke2NvbnRleHRNZW51WH1weGAsXG4gICAgfTtcbiAgICBjb25zdCBzZWxlY3RlZERhdGEgPSBkYXRhLmZpbHRlcihkID0+IHNlbGVjdGVkSXRlbXMuaW5jbHVkZXMoZC5nZXRJbihncmlkLmlkS2V5UGF0aCkpKTtcbiAgICByZXR1cm4gKFxuICAgICAgPHVsIGNsYXNzTmFtZT1cImRyb3Bkb3duLW1lbnUgb2MtZGF0YWdyaWQtY29udGV4dC1tZW51IG9wZW5cIiBzdHlsZT17c3R5bGV9PlxuICAgICAgICB7IGNvbnRleHRNZW51SXRlbXMgJiYgY29udGV4dE1lbnVJdGVtcy5tYXAgJiYgY29udGV4dE1lbnVJdGVtcy5tYXAoKGl0ZW0sIGkpID0+IHtcbiAgICAgICAgICBsZXQgeyBkaXNhYmxlZCB9ID0gaXRlbTtcbiAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0uZGlzYWJsZWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGRpc2FibGVkID0gaXRlbS5kaXNhYmxlZChzZWxlY3RlZEl0ZW1zLCBzZWxlY3RlZERhdGEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPE1lbnVJdGVtXG4gICAgICAgICAgICAgIGtleT17aX0gLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAgICAgICBoZWFkZXI9e2l0ZW0uaGVhZGVyfVxuICAgICAgICAgICAgICBkaXZpZGVyPXtpdGVtLmRpdmlkZXJ9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgdGl0bGU9e2l0ZW0udGl0bGV9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9eyhkaXNhYmxlZCB8fCAhaXRlbS5vbkNsaWNrKSA/IG51bGwgOiB0aGlzLmhhbmRsZUNvbnRleHRNZW51SXRlbUNsaWNrKFxuICAgICAgICAgICAgICAgIGl0ZW0ub25DbGljayxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEl0ZW1zLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkRGF0YSxcbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgeyBpdGVtLnZhbHVlIH1cbiAgICAgICAgICAgIDwvTWVudUl0ZW0+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSkgfVxuICAgICAgPC91bD5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGdyaWRDbGFzc05hbWUgPSBjbGFzc05hbWVzKHtcbiAgICAgICdvYy1kYXRhZ3JpZC1jb250YWluZXInOiB0cnVlLFxuICAgICAgJ3dpdGgtYWN0aW9uYmFyJzogdGhpcy5wcm9wcy5pbmxpbmVFZGl0ICYmICF0aGlzLnByb3BzLmRpc2FibGVBY3Rpb25CYXIsXG4gICAgICAnaXMtYnVzeSc6IHRoaXMucHJvcHMuaXNCdXN5LFxuICAgICAgJ2lzLWVkaXRpbmcnOiB0aGlzLnByb3BzLmlzRWRpdGluZyxcbiAgICAgICdpcy1jcmVhdGluZyc6IHRoaXMucHJvcHMuaXNDcmVhdGluZyxcbiAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgfSk7XG5cbiAgICAvLyBjaGVjayBpZiB0aGVyZSBpcyBhIG5ldyByZXF1ZXN0IHRvIGNoYW5nZSBlZGl0IG1vZGUgZm9jdXNcbiAgICB0aGlzLnNldEZvY3VzVG8odGhpcy5wcm9wcy5mb2N1c1R5cGUpO1xuXG4gICAgbGV0IGFjdGlvbkJhciA9IG51bGw7XG4gICAgbGV0IGFjdGlvbkJhclJpZ2h0ID0gbnVsbDtcbiAgICBsZXQgYWN0aW9uQmFyTGVmdCA9IG51bGw7XG4gICAgaWYgKFxuICAgICAgKHRoaXMucHJvcHMuYWN0aW9uQmFyIHx8XG4gICAgICB0aGlzLnByb3BzLmlubGluZUVkaXQgfHxcbiAgICAgIHRoaXMucHJvcHMuZmlsdGVyaW5nIHx8XG4gICAgICB0aGlzLnByb3BzLnJlbW92aW5nKSAmJlxuICAgICAgIXRoaXMucHJvcHMuZGlzYWJsZUFjdGlvbkJhclxuICAgICkge1xuICAgICAgYWN0aW9uQmFyUmlnaHQgPSAoXG4gICAgICAgIDxBY3Rpb25CYXIgcG9zaXRpb249XCJyaWdodFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtYWN0aW9uYmFyLXJpZ2h0XCI+eyB0aGlzLnByb3BzLmFjdGlvbkJhciB9PC9kaXY+XG4gICAgICAgICAgeyAodGhpcy5wcm9wcy5maWx0ZXJpbmcgJiYgdGhpcy5wcm9wcy5kaXNhYmxlRHJvcGRvd25cbiAgICAgICAgICAgICYmICF0aGlzLnByb3BzLmRpc2FibGVGaWx0ZXJpbmdDb250cm9scykgJiZcbiAgICAgICAgICAgIDxGaWx0ZXJpbmdDb250cm9scyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgICB9XG4gICAgICAgICAgeyB0aGlzLnByb3BzLmlubGluZUVkaXQgJiZcbiAgICAgICAgICAgIDxJbmxpbmVFZGl0Q29udHJvbHNcbiAgICAgICAgICAgICAgYWZ0ZXJBZGRJdGVtPXt0aGlzLmhhbmRsZUFmdGVyQWRkSXRlbX1cbiAgICAgICAgICAgICAgYWZ0ZXJFZGl0UHJlc3M9e3RoaXMuaGFuZGxlQWZ0ZXJFZGl0UHJlc3N9XG4gICAgICAgICAgICAgIGFmdGVyVmFsaWRhdGlvbkVycm9yPXt0aGlzLmhhbmRsZUFmdGVyVmFsaWRhdGlvbkVycm9yfVxuICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgfVxuICAgICAgICAgIHsgKHRoaXMucHJvcHMuZHJvcGRvd25NZW51SXRlbXMgfHxcbiAgICAgICAgICAgICB0aGlzLnByb3BzLnJlbW92aW5nIHx8XG4gICAgICAgICAgICAgdGhpcy5wcm9wcy5jb2x1bW5TZXR0aW5ncyB8fFxuICAgICAgICAgICAgICh0aGlzLnByb3BzLmZpbHRlcmluZyAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlRHJvcGRvd24pKSAmJlxuICAgICAgICAgICAgIDxEcm9wZG93bkNvbnRyb2xzIHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICAgIH1cbiAgICAgICAgPC9BY3Rpb25CYXI+XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5hY3Rpb25CYXJMZWZ0IHx8IHRoaXMucHJvcHMuZ3JpZEhlYWRlcikge1xuICAgICAgYWN0aW9uQmFyTGVmdCA9IChcbiAgICAgICAgPEFjdGlvbkJhciBwb3NpdGlvbj1cImxlZnRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWdyaWRoZWFkZXJcIj57IHRoaXMucHJvcHMuZ3JpZEhlYWRlciB9PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1hY3Rpb25iYXItbGVmdFwiPnsgdGhpcy5wcm9wcy5hY3Rpb25CYXJMZWZ0IH08L2Rpdj5cbiAgICAgICAgPC9BY3Rpb25CYXI+XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoYWN0aW9uQmFyTGVmdCB8fCBhY3Rpb25CYXJSaWdodCkge1xuICAgICAgYWN0aW9uQmFyID0gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWFjdGlvbmJhci1jb250YWluZXJcIj5cbiAgICAgICAgICB7IGFjdGlvbkJhckxlZnQgfVxuICAgICAgICAgIHsgYWN0aW9uQmFyUmlnaHQgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICAgIGxldCByb3dzQ291bnQgPVxuICAgICAgKHRoaXMucHJvcHMucm93c0NvdW50IHx8IHRoaXMucHJvcHMucm93c0NvdW50ID09PSAwKSA/XG4gICAgICAgIHRoaXMucHJvcHMucm93c0NvdW50IDpcbiAgICAgICAgdGhpcy5wcm9wcy5kYXRhLnNpemU7XG4gICAgaWYgKHRoaXMucHJvcHMuaXNDcmVhdGluZykgcm93c0NvdW50ICs9IHRoaXMucHJvcHMuY3JlYXRlRGF0YS5zaXplO1xuICAgIGlmICghdGhpcy5wcm9wcy52aXNpYmxlQ29sdW1ucy5zaXplKSByb3dzQ291bnQgPSAwO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPXtgb2MtZGF0YWdyaWQtJHt0aGlzLnByb3BzLmdyaWQuaWR9YH1cbiAgICAgICAgY2xhc3NOYW1lPXtncmlkQ2xhc3NOYW1lfVxuICAgICAgICBzdHlsZT17dGhpcy5wcm9wcy5jb250YWluZXJTdHlsZX1cbiAgICAgID5cbiAgICAgICAgeyB0aGlzLnByb3BzLmlzQnVzeSAmJiA8U3Bpbm5lciAvPiB9XG4gICAgICAgIHsgdGhpcy5zdGF0ZS5jb250ZXh0TWVudU9wZW4gJiYgdGhpcy5yZW5kZXJDb250ZXh0TWVudSgpIH1cbiAgICAgICAgeyBhY3Rpb25CYXIgfVxuICAgICAgICA8UmVzcG9uc2l2ZUZpeGVkRGF0YVRhYmxlXG4gICAgICAgICAgaWQ9e3RoaXMucHJvcHMuZ3JpZC5pZH1cbiAgICAgICAgICByb3dzQ291bnQ9e3Jvd3NDb3VudH1cbiAgICAgICAgICBoZWFkZXJIZWlnaHQ9e3RoaXMucHJvcHMuaXNGaWx0ZXJpbmcgP1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5oZWFkZXJIZWlnaHQgKyB0aGlzLnByb3BzLmZpbHRlclJvd0hlaWdodFxuICAgICAgICAgICAgOiB0aGlzLnByb3BzLmhlYWRlckhlaWdodH1cbiAgICAgICAgICByb3dIZWlnaHQ9e3RoaXMucHJvcHMucm93SGVpZ2h0fVxuICAgICAgICAgIG9uQ29sdW1uUmVzaXplRW5kQ2FsbGJhY2s9e3RoaXMub25Db2x1bW5SZXNpemVFbmRDYWxsYmFja31cbiAgICAgICAgICBpc0NvbHVtblJlc2l6aW5nPXtmYWxzZX1cbiAgICAgICAgICBvblJvd0NsaWNrPXt0aGlzLmhhbmRsZVJvd0NsaWNrfVxuICAgICAgICAgIHNjcm9sbFRvQ29sdW1uPXt0aGlzLnByb3BzLnNjcm9sbFRvQ29sdW1uIHx8IHRoaXMuc3RhdGUuY3VycmVudENvbHVtbn1cbiAgICAgICAgICBzY3JvbGxUb3A9e3RoaXMucHJvcHMuc2Nyb2xsVG9wfVxuICAgICAgICAgIHNjcm9sbFRvUm93PXt0aGlzLmdldFNjcm9sbFRvUm93KCl9XG4gICAgICAgICAgb25Sb3dEb3VibGVDbGljaz17dGhpcy5wcm9wcy5vblJvd0RvdWJsZUNsaWNrfVxuICAgICAgICAgIG9uUm93TW91c2VEb3duPXt0aGlzLnByb3BzLm9uTW91c2VEb3dufVxuICAgICAgICAgIG9uUm93TW91c2VFbnRlcj17dGhpcy5wcm9wcy5vblJvd01vdXNlRW50ZXJ9XG4gICAgICAgICAgb25Sb3dNb3VzZUxlYXZlPXt0aGlzLnByb3BzLm9uUm93TW91c2VMZWF2ZX1cbiAgICAgICAgICBvblNjcm9sbFN0YXJ0PXt0aGlzLnByb3BzLm9uU2Nyb2xsU3RhcnR9XG4gICAgICAgICAgb25TY3JvbGxFbmQ9e3RoaXMucHJvcHMub25TY3JvbGxFbmR9XG4gICAgICAgICAgcm93Q2xhc3NOYW1lR2V0dGVyPXt0aGlzLmdldFJvd0NsYXNzTmFtZX1cbiAgICAgICAgICByb3dIZWlnaHRHZXR0ZXI9e3RoaXMucHJvcHMucm93SGVpZ2h0R2V0dGVyICYmIHRoaXMuaGFuZGxlUm93SGVpZ2h0R2V0dGVyfVxuICAgICAgICAgIG9uQ29udGVudEhlaWdodENoYW5nZT17dGhpcy5wcm9wcy5vbkNvbnRlbnRIZWlnaHRDaGFuZ2V9XG4gICAgICAgICAgb25Sb3dDb250ZXh0TWVudT17dGhpcy5oYW5kbGVDb250ZXh0TWVudX1cbiAgICAgICAgPlxuICAgICAgICAgIHsgdGhpcy5yZW5kZXJDb2x1bW5zKCkgfVxuICAgICAgICA8L1Jlc3BvbnNpdmVGaXhlZERhdGFUYWJsZT5cbiAgICAgICAgeyB0aGlzLnByb3BzLmlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW4gJiZcbiAgICAgICAgICA8Q29sdW1uU2V0dGluZ3NNb2RhbFxuICAgICAgICAgICAgZ3JpZD17dGhpcy5wcm9wcy5ncmlkfVxuICAgICAgICAgICAgY29sdW1ucz17dGhpcy5wcm9wcy5jb2x1bW5zfVxuICAgICAgICAgICAgdmlzaWJsZUNvbHVtbnM9e3RoaXMucHJvcHMudmlzaWJsZUNvbHVtbnN9XG4gICAgICAgICAgICBjbG9zZUNvbHVtblNldHRpbmdzTW9kYWw9e3RoaXMucHJvcHMuY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsfVxuICAgICAgICAgICAgc2F2ZUNvbHVtblNldHRpbmdzPXt0aGlzLnByb3BzLnNhdmVDb2x1bW5TZXR0aW5nc31cbiAgICAgICAgICAvPlxuICAgICAgICB9XG4gICAgICAgIHsgdGhpcy5wcm9wcy5jaGlsZHJlbiB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=