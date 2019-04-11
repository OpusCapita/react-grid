'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

var _pagination = require('./pagination.component');

var _pagination2 = _interopRequireDefault(_pagination);

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

var DataGrid = (_dec = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _pagination2.default)(_class = (0, _reactIntl.injectIntl)(_class = _dec(_class = (_temp = _class2 = function (_React$PureComponent) {
  _inherits(DataGrid, _React$PureComponent);

  function DataGrid(props) {
    _classCallCheck(this, DataGrid);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _initialiseProps.call(_this);

    _this.state = {
      currentRow: 0,
      currentColumn: 0,
      contextMenuOpen: false,
      contextMenuX: null,
      contextMenuY: null
    };
    _this.cellRefs = {};
    _this.createCellRefs = {};
    _this.focusToCreateCell = false;
    _this.focusToEditCell = false; // TODO: Handle focusing when true
    _this.focusToErrorCell = false; // TODO: Handle focusing when true
    return _this;
  }

  DataGrid.prototype.componentWillUnmount = function componentWillUnmount() {
    document.removeEventListener('click', this.onDocumentClick);
    this.props.invalidate(this.props.grid);
  };

  /**
   * @param rowIndex (int)
   * @param col (obj). Column object.
   * @param e. Original KeyDown event
   * @param create (bool). Is the cell create cell or edit cell?
   */


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

  this.onCellKeyDown = function (rowIndex, col, e) {
    var create = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    if (_this2.props.enableArrowNavigation) {
      var cellRefs = create ? _this2.createCellRefs : _this2.cellRefs;
      var arrowKeys = [_datagrid3.KEY_CODES.DOWN, _datagrid3.KEY_CODES.UP, _datagrid3.KEY_CODES.LEFT, _datagrid3.KEY_CODES.RIGHT];
      var _props = _this2.props,
          columns = _props.columns,
          visibleColumns = _props.visibleColumns,
          grid = _props.grid,
          data = _props.data,
          onLastCellTabPress = _props.onLastCellTabPress;

      var gridColumns = _datagrid5.default.visibleColumns(columns, visibleColumns);
      var getColumnKeyByIndex = function getColumnKeyByIndex(i) {
        return _datagrid5.default.getColumnKey(gridColumns[i]);
      };
      var rowsSize = data.size;
      var columnKey = _datagrid5.default.getColumnKey(col);
      var currentCell = cellRefs[grid.id + '_' + columnKey + '_' + rowIndex];
      var proxy = null;

      var isCursorAtStart = function isCursorAtStart() {
        if (currentCell.type !== 'text') return true;
        return currentCell.selectionStart === 0;
      };

      var isCursorAtEnd = function isCursorAtEnd() {
        if (currentCell.type !== 'text') return true;
        return currentCell.selectionEnd === currentCell.value.length;
      };

      // If current cell holds a react-floating-select component
      if (currentCell && (currentCell.selectRef || _typeof(currentCell.select) === 'object')) {
        proxy = currentCell;
        currentCell = _this2.getSelectRef(proxy);
      }

      // Prevents up/down arrow from changing number field value
      if (arrowKeys.includes(e.keyCode) && currentCell.type === 'number') e.preventDefault();
      switch (e.keyCode) {
        case _datagrid3.KEY_CODES.ENTER:
        case _datagrid3.KEY_CODES.ESC:
          {
            if (create && e.keyCode === _datagrid3.KEY_CODES.ENTER) {
              _this2.props.addNewItem(grid, _datagrid5.default.getColumnDefaultValues(columns));
              _this2.focusToCreateCell = true;
              break;
            }
            currentCell.select();
            break;
          }
        case _datagrid3.KEY_CODES.DOWN:
          {
            var nextElement = cellRefs[grid.id + '_' + columnKey + '_' + (rowIndex + 1)];

            // Prevents menu from opening
            if (proxy && proxy.selectRef && !proxy.selectRef.state.menuIsOpen) {
              e.preventDefault();
              if (!nextElement) break;
              nextElement = _this2.getSelectRef(nextElement);
            }
            _this2.moveCellFocus(nextElement, rowIndex + 1, -1);
            break;
          }
        case _datagrid3.KEY_CODES.UP:
          {
            var _nextElement = cellRefs[grid.id + '_' + columnKey + '_' + (rowIndex - 1)];

            // Prevents menu from opening
            if (proxy && proxy.selectRef && !proxy.selectRef.state.menuIsOpen) {
              e.preventDefault();
              if (!_nextElement) break;
              _nextElement = _this2.getSelectRef(_nextElement);
            }
            _this2.moveCellFocus(_nextElement, rowIndex - 1, -1);
            break;
          }
        case _datagrid3.KEY_CODES.TAB:
        case _datagrid3.KEY_CODES.RIGHT:
        case _datagrid3.KEY_CODES.LEFT:
          {
            if (e.keyCode === _datagrid3.KEY_CODES.RIGHT && !isCursorAtEnd()) break;
            if (e.keyCode === _datagrid3.KEY_CODES.LEFT && !isCursorAtStart()) break;

            e.preventDefault();

            var columnInd = gridColumns.findIndex(function (c) {
              return c.valueKeyPath.join('/') === columnKey;
            });
            if (columnInd !== -1) {
              var disabled = true;
              var _nextElement2 = null;
              var rowInd = rowIndex;
              while (disabled) {
                // Moving to the left
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
                  // Moving to the right
                  if (columnInd + 1 < gridColumns.length) {
                    columnInd += 1;
                  } else if (rowInd + 1 < rowsSize) {
                    columnInd = 0;
                    rowInd += 1;
                  } else if (rowInd + 1 === rowsSize) {
                    // If trying to select a row, when there is none:
                    if (onLastCellTabPress && e.keyCode === _datagrid3.KEY_CODES.TAB) onLastCellTabPress(e);
                    break;
                  }
                }

                _nextElement2 = cellRefs[grid.id + '_' + getColumnKeyByIndex(columnInd) + '_' + rowInd];

                // If we cannot focus on the next element while moving to the right
                if (!_nextElement2 && e.keyCode !== _datagrid3.KEY_CODES.LEFT) {
                  // If we're not yet in the last focusable column
                  if (columnInd <= gridColumns.length) {
                    while (columnInd <= gridColumns.length && !_nextElement2) {
                      _nextElement2 = cellRefs[grid.id + '_' + getColumnKeyByIndex(columnInd) + '_' + rowInd];
                      columnInd += 1;

                      // If we are in the last column and we don't have an element to focus on,
                      // we must move to the next row (if possible)
                      if (!_nextElement2 && columnInd === gridColumns.length) {
                        // If trying to select a row, when there is none:
                        if (rowInd + 1 === rowsSize) {
                          if (onLastCellTabPress && e.keyCode === _datagrid3.KEY_CODES.TAB) {
                            onLastCellTabPress(e);
                          }
                          break;
                        }

                        columnInd = 0;
                        rowInd += 1;
                        _nextElement2 = cellRefs[grid.id + '_' + getColumnKeyByIndex(columnInd) + '_' + rowInd];
                      }
                    }
                  }
                  // If we cannot focus on the next element while moving to the left
                } else if (!_nextElement2 && e.keyCode === _datagrid3.KEY_CODES.LEFT) {
                  while (columnInd > 0 && !_nextElement2) {
                    columnInd -= 1;
                    _nextElement2 = cellRefs[grid.id + '_' + getColumnKeyByIndex(columnInd) + '_' + rowInd];
                  }
                  // if no element was found, try moving to previous row
                  // (needed in case first column is not editable e.g. an ExtraColumn)
                  if (rowInd > 0 && !_nextElement2) {
                    columnInd = gridColumns.length - 1;
                    rowInd -= 1;
                    _nextElement2 = cellRefs[grid.id + '_' + getColumnKeyByIndex(columnInd) + '_' + rowInd];
                  }
                }
                disabled = _nextElement2 ? _nextElement2.disabled : false;
              }
              if (!disabled && _nextElement2) {
                if (_typeof(_nextElement2.select) === 'object' || _nextElement2.selectRef) {
                  _nextElement2 = _this2.getSelectRef(_nextElement2);
                }
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

  this.onEditCellKeyDown = function (rowIndex, col) {
    return function (e) {
      _this2.onCellKeyDown(rowIndex, col, e);
    };
  };

  this.onCreateCellKeyDown = function (rowIndex, col) {
    return function (e) {
      _this2.onCellKeyDown(rowIndex, col, e, true);
    };
  };

  this.onFilterCellValueChange = function (col, valueParser) {
    return function (eventOrData) {
      var rawValue = void 0;
      // eventOrData can be input onChange event, react-select onChange or react-day-picker onChange
      if (eventOrData) {
        if (eventOrData.target !== undefined) {
          rawValue = eventOrData.target.value;
        } else if (eventOrData.value !== undefined) {
          rawValue = eventOrData.value;
        } else {
          rawValue = eventOrData;
        }
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
        if (eventOrData.target !== undefined) {
          rawValue = eventOrData.target.value;
        } else if (eventOrData.value !== undefined) {
          rawValue = eventOrData.value;
        } else {
          rawValue = eventOrData;
        }
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
        if (eventOrData.target !== undefined) {
          rawValue = eventOrData.target.value;
        } else if (eventOrData.value !== undefined) {
          rawValue = eventOrData.value;
        } else {
          rawValue = eventOrData;
        }
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
      var _props2 = _this2.props,
          cellSelectionChange = _props2.cellSelectionChange,
          cellSelect = _props2.cellSelect,
          grid = _props2.grid,
          isEditing = _props2.isEditing;

      if (isEditing) return;

      if (inputType === 'number') {
        e.target.select();
      }
      if (cellType === 'edit' && cellSelect) {
        cellSelectionChange(grid, (0, _immutable.Map)({
          rowIndex: rowIndex,
          columnKey: columnKey
        }));
      }
    };
  };

  this.getSelectRef = function (component) {
    if (!component) return null;
    if (component.select && component.select.inputRef) {
      return component.select.inputRef;
    }
    if (component.select && component.select.select) {
      return component.select.select.inputRef;
    }
    if (component.selectRef && component.selectRef.select.select) {
      return component.selectRef.select.select.inputRef;
    }
    return component.selectRef.select.inputRef;
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
        case 'multiselect':
        case 'select':
          return options.selectOptions.find(function (obj) {
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
      case 'multiselect':
      case 'select':
        return options.selectOptions.find(function (obj) {
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
    } else if (col.componentType === 'select' || col.componentType === 'multiselect') {
      return options.selectOptions.find(function (obj) {
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
      return options.selectOptions.find(function (obj) {
        return obj.value === val;
      });
    } else if (['checkbox', 'boolean'].includes(col.componentType)) {
      return options.find(function (obj) {
        return obj.value === val;
      });
    } else if (col.componentType === 'multiselect') {
      // session storage content is converted to immutable and multiselect
      // filters is then list otherwise array
      return val && val.toJS ? val.toJS() : val || [];
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
    var _props3 = _this2.props,
        grid = _props3.grid,
        isCreating = _props3.isCreating,
        isEditing = _props3.isEditing,
        createData = _props3.createData,
        selectedItems = _props3.selectedItems,
        data = _props3.data;

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
      if (_this2.props.isEditing && !_this2.props.scrollInEditMode) {
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
        _this2.props.cellSelectionChange(_this2.props.grid, (0, _immutable.Map)({
          rowIndex: rowIndex,
          columnKey: columnKey
        }));
      }
    };
  };

  this.handleCreateCellRef = function (rowIndex, col) {
    return function (ref) {
      // Focus to create cell
      var columnKey = _datagrid5.default.getColumnKey(col);
      var selectRef = !ref || ref.focus ? ref : _this2.getSelectRef(ref);
      if (_this2.props.createData.size && _this2.props.createData.size === rowIndex + 1 && _this2.focusToCreateCell && !_this2.getComponentDisabledState(rowIndex, col, 'create') && selectRef) {
        selectRef.focus();
        _this2.focusToCreateCell = false;
      }

      if (_this2.props.enableArrowNavigation) {
        _this2.createCellRefs[_this2.props.grid.id + '_' + columnKey + '_' + rowIndex] = ref;
      }
    };
  };

  this.handleEditCellRef = function (rowIndex, col) {
    return function (ref) {
      var columnKey = _datagrid5.default.getColumnKey(col);
      if (_this2.focusToEditCell && !_this2.getComponentDisabledState(rowIndex, col, 'edit')) {
        var selectedRowIndex = _this2.focusToLastRow && _this2.props.data.size > 0 ? _this2.props.data.size - 1 : _this2.getSelectedItemIndex(_this2.props.selectedItems.first());

        var selectedCell = _this2.props.selectedCell;

        var selectRef = !ref || ref.focus ? ref : _this2.getSelectRef(ref);
        if (selectedCell.size > 0) {
          if (selectedCell.get('rowIndex') === rowIndex && selectedCell.get('columnKey') === columnKey && selectRef) {
            selectRef.focus();
            _this2.focusToEditCell = false;
            _this2.focusToLastRow = false;
          }
        } else if (selectedRowIndex === undefined) {
          _this2.focusToEditCell = false;
          _this2.focusToLastRow = false;
        } else if (selectedRowIndex === rowIndex && selectRef) {
          selectRef.focus();
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
    var elementTypes = ['text', 'checkbox'];
    if (nextElement && elementTypes.includes(nextElement.type)) {
      if (rowIndex !== -1 || columnIndex !== -1) {
        _this2.setState({
          currentColumn: columnIndex,
          currentRow: rowIndex
        });
      }
      setTimeout(function () {
        if (nextElement.type === 'checkbox') nextElement.focus();
        if (nextElement.type === 'text') nextElement.select();
      }, 50);
    }
  };

  this.handleSelectAllCheckBoxOnChange = function () {
    _this2.props.selectAllItemsChange(_this2.props.grid);
  };

  this.handleSelectionCheckBoxOnChange = function (rowIndex) {
    return function () {
      _this2.props.itemSelectionChange(_this2.props.grid, rowIndex, true, false);
    };
  };

  this.generateColumns = function () {
    var _props4 = _this2.props,
        data = _props4.data,
        selectedItems = _props4.selectedItems,
        dateFormat = _props4.dateFormat,
        thousandSeparator = _props4.thousandSeparator,
        decimalSeparator = _props4.decimalSeparator,
        grid = _props4.grid,
        inlineEdit = _props4.inlineEdit,
        filtering = _props4.filtering,
        region = _props4.region,
        intl = _props4.intl,
        selectComponentOptions = _props4.selectComponentOptions,
        isCreating = _props4.isCreating,
        extraColumn = _props4.extraColumn,
        rowSelectCheckboxColumn = _props4.rowSelectCheckboxColumn,
        showSelectAllCheckbox = _props4.showSelectAllCheckbox;


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
            extraColumn.valueRender(data.get(rowIndex), tabIndex)
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

    if (rowSelectCheckboxColumn) {
      columns.push({
        width: 40,
        isResizable: false,
        isSortable: false,
        columnKey: 'selectionCheckbox',
        header: showSelectAllCheckbox && _react2.default.createElement(_reactCheckbox2.default, {
          id: 'ocDatagridSelectAllCheckBox-' + grid.id,
          className: 'oc-datagrid-select-all-checkbox-cell no-row-select',
          checked: data.size !== 0 && data.size === selectedItems.size,
          onChange: _this2.handleSelectAllCheckBoxOnChange,
          tabIndex: tabIndex
        }),
        cell: function cell(rowIndex) {
          var rowItem = data.get(rowIndex);
          var itemId = rowItem.getIn(grid.idKeyPath);
          var selected = selectedItems.includes(itemId);
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
      var cellProps = {
        data: data,
        dateFormat: dateFormat,
        thousandSeparator: thousandSeparator,
        decimalSeparator: decimalSeparator
      }; // eslint-disable-line
      column = _columnService2.default.columnCell(column, cellProps, col, valueRender);

      // handle columnComponentTypes
      var componentTypeProps = _extends({}, cellProps, {
        grid: grid,
        inlineEdit: inlineEdit,
        filtering: filtering,
        region: region,
        intl: intl,
        selectComponentOptions: selectComponentOptions
      }); // eslint-disable-line
      column = _columnService2.default.columnComponentType(column, tabIndex, componentTypeProps, col, columnFunctions, _this2.getComponentDisabledState);
      columns.push(column);
    });

    if (isCreating) {
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
            id: 'oc-datagrid-new-item-remove-' + grid.id + '-' + rowIndex,
            type: 'indicator',
            name: 'delete',
            width: 30,
            height: 30,
            style: { padding: '7px' },
            onClick: function onClick() {
              return _this2.props.removeNewItem(grid, rowIndex);
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
    return !!_this2.props.editData.getIn([id].concat(col.valueKeyPath));
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
      var _props5 = _this2.props,
          itemSelectionChange = _props5.itemSelectionChange,
          selectedItems = _props5.selectedItems,
          grid = _props5.grid,
          data = _props5.data;

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
      var _props6 = _this2.props,
          isCreating = _props6.isCreating,
          isEditing = _props6.isEditing,
          createData = _props6.createData,
          selectedCell = _props6.selectedCell,
          grid = _props6.grid;

      var rowIndex = cellProps.rowIndex,
          props = _objectWithoutProperties(cellProps, ['rowIndex']);

      var cell = void 0;
      var cellType = 'view';
      var extraRowCount = 0; // how many rows to ignore from top, new + filter rows
      if (isCreating) extraRowCount = createData.size;
      var existingRowsIndex = rowIndex - extraRowCount;
      if (isCreating) {
        if (rowIndex <= extraRowCount - 1) {
          if (col.cellCreate) {
            cell = col.cellCreate(rowIndex, _this2.handleCreateCellRef(rowIndex, col), _this2.onCreateCellKeyDown(rowIndex, col));
            cellType = 'create';
          } else {
            cell = null;
            cellType = null;
          }
        } else {
          cell = col.cell(existingRowsIndex, _this2.handleCreateCellRef(existingRowsIndex, col), _this2.onCreateCellKeyDown(existingRowsIndex, col));
        }
      } else if (isEditing && col.cellEdit) {
        cell = col.cellEdit(existingRowsIndex, _this2.handleEditCellRef(existingRowsIndex, col), _this2.onEditCellKeyDown(existingRowsIndex, col));
        cellType = 'edit';
      } else {
        cell = col.cell(existingRowsIndex, _this2.handleEditCellRef(existingRowsIndex, col), _this2.onEditCellKeyDown(existingRowsIndex, col));
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
    var _props7 = _this2.props,
        allDataSize = _props7.allDataSize,
        grid = _props7.grid,
        isCreating = _props7.isCreating,
        isBusy = _props7.isBusy,
        visibleColumns = _props7.visibleColumns;

    if (!allDataSize && !isBusy && !isCreating && !grid.pagination) {
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
    if (!visibleColumns.size) {
      if (isBusy) {
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
            filtering: _this2.props.isFiltering,
            width: _this2.props.columnWidths.get(col.columnKey, col.width)
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
        fixedRight: col.fixedRight,
        allowCellsRecycling: col.allowCellsRecycling
      });
    });
  };

  this.renderContextMenu = function () {
    var _props8 = _this2.props,
        contextMenuItems = _props8.contextMenuItems,
        data = _props8.data,
        grid = _props8.grid,
        selectedItems = _props8.selectedItems;
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
}, _temp)) || _class) || _class) || _class);
exports.default = DataGrid;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbImRhdGFncmlkQWN0aW9ucyIsIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwib3duUHJvcHMiLCJHUklEIiwiZ3JpZCIsImlzQnVzeSIsImRhdGFncmlkIiwiZ2V0SW4iLCJpZCIsImlzRWRpdGluZyIsImlzQ3JlYXRpbmciLCJpc0ZpbHRlcmluZyIsImlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW4iLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwidmlzaWJsZUNvbHVtbnMiLCJjb2x1bW5XaWR0aHMiLCJzZWxlY3RlZENlbGwiLCJzZWxlY3RlZEl0ZW1zIiwiZGF0YSIsImVkaXREYXRhIiwiY3JlYXRlRGF0YSIsImZpbHRlckRhdGEiLCJjZWxsTWVzc2FnZXMiLCJjcmVhdGVDZWxsTWVzc2FnZXMiLCJhbGxEYXRhU2l6ZSIsInNpemUiLCJsYW5ndWFnZSIsIlV0aWxzIiwiZ2V0TGFuZ3VhZ2UiLCJ1c2VyIiwicmVnaW9uIiwiZ2V0UmVnaW9uIiwiZGF0ZUZvcm1hdCIsImdldERhdGVGb3JtYXQiLCJ0aG91c2FuZFNlcGFyYXRvciIsImdldFRob3VzYW5kU2VwYXJhdG9yIiwiZGVjaW1hbFNlcGFyYXRvciIsImdldERlY2ltYWxTZXBhcmF0b3IiLCJmb3JjZVJlZnJlc2hUaW1lc3RhbXAiLCJnZXQiLCJmb2N1c1R5cGUiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJEYXRhR3JpZCIsInBhZ2luYXRpb24iLCJpbmplY3RJbnRsIiwicHJvcHMiLCJjdXJyZW50Um93IiwiY3VycmVudENvbHVtbiIsImNvbnRleHRNZW51T3BlbiIsImNvbnRleHRNZW51WCIsImNvbnRleHRNZW51WSIsImNlbGxSZWZzIiwiY3JlYXRlQ2VsbFJlZnMiLCJmb2N1c1RvQ3JlYXRlQ2VsbCIsImZvY3VzVG9FZGl0Q2VsbCIsImZvY3VzVG9FcnJvckNlbGwiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImRvY3VtZW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIm9uRG9jdW1lbnRDbGljayIsImludmFsaWRhdGUiLCJyZW5kZXIiLCJncmlkQ2xhc3NOYW1lIiwiaW5saW5lRWRpdCIsImRpc2FibGVBY3Rpb25CYXIiLCJjbGFzc05hbWUiLCJzZXRGb2N1c1RvIiwiYWN0aW9uQmFyIiwiYWN0aW9uQmFyUmlnaHQiLCJhY3Rpb25CYXJMZWZ0IiwiZmlsdGVyaW5nIiwicmVtb3ZpbmciLCJkaXNhYmxlRHJvcGRvd24iLCJkaXNhYmxlRmlsdGVyaW5nQ29udHJvbHMiLCJoYW5kbGVBZnRlckFkZEl0ZW0iLCJoYW5kbGVBZnRlckVkaXRQcmVzcyIsImhhbmRsZUFmdGVyVmFsaWRhdGlvbkVycm9yIiwiZHJvcGRvd25NZW51SXRlbXMiLCJjb2x1bW5TZXR0aW5ncyIsImdyaWRIZWFkZXIiLCJyb3dzQ291bnQiLCJjb250YWluZXJTdHlsZSIsInJlbmRlckNvbnRleHRNZW51IiwiaGVhZGVySGVpZ2h0IiwiZmlsdGVyUm93SGVpZ2h0Iiwicm93SGVpZ2h0Iiwib25Db2x1bW5SZXNpemVFbmRDYWxsYmFjayIsImhhbmRsZVJvd0NsaWNrIiwic2Nyb2xsVG9Db2x1bW4iLCJzY3JvbGxUb3AiLCJnZXRTY3JvbGxUb1JvdyIsIm9uUm93RG91YmxlQ2xpY2siLCJvbk1vdXNlRG93biIsIm9uUm93TW91c2VFbnRlciIsIm9uUm93TW91c2VMZWF2ZSIsIm9uU2Nyb2xsU3RhcnQiLCJvblNjcm9sbEVuZCIsImdldFJvd0NsYXNzTmFtZSIsInJvd0hlaWdodEdldHRlciIsImhhbmRsZVJvd0hlaWdodEdldHRlciIsIm9uQ29udGVudEhlaWdodENoYW5nZSIsImhhbmRsZUNvbnRleHRNZW51IiwicmVuZGVyQ29sdW1ucyIsImNvbHVtbnMiLCJjbG9zZUNvbHVtblNldHRpbmdzTW9kYWwiLCJzYXZlQ29sdW1uU2V0dGluZ3MiLCJjaGlsZHJlbiIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyIsImNvbnRleHRNZW51SXRlbXMiLCJzZXRTdGF0ZSIsIm5ld0NvbHVtbldpZHRoIiwiY29sdW1uS2V5IiwicmVzaXplQ29sdW1uIiwib25DZWxsS2V5RG93biIsInJvd0luZGV4IiwiY29sIiwiZSIsImNyZWF0ZSIsImVuYWJsZUFycm93TmF2aWdhdGlvbiIsImFycm93S2V5cyIsIktFWV9DT0RFUyIsIkRPV04iLCJVUCIsIkxFRlQiLCJSSUdIVCIsIm9uTGFzdENlbGxUYWJQcmVzcyIsImdyaWRDb2x1bW5zIiwiZ2V0Q29sdW1uS2V5QnlJbmRleCIsImdldENvbHVtbktleSIsImkiLCJyb3dzU2l6ZSIsImN1cnJlbnRDZWxsIiwicHJveHkiLCJpc0N1cnNvckF0U3RhcnQiLCJ0eXBlIiwic2VsZWN0aW9uU3RhcnQiLCJpc0N1cnNvckF0RW5kIiwic2VsZWN0aW9uRW5kIiwidmFsdWUiLCJsZW5ndGgiLCJzZWxlY3RSZWYiLCJzZWxlY3QiLCJnZXRTZWxlY3RSZWYiLCJpbmNsdWRlcyIsImtleUNvZGUiLCJwcmV2ZW50RGVmYXVsdCIsIkVOVEVSIiwiRVNDIiwiYWRkTmV3SXRlbSIsImdldENvbHVtbkRlZmF1bHRWYWx1ZXMiLCJuZXh0RWxlbWVudCIsIm1lbnVJc09wZW4iLCJtb3ZlQ2VsbEZvY3VzIiwiVEFCIiwiY29sdW1uSW5kIiwiZmluZEluZGV4IiwiYyIsInZhbHVlS2V5UGF0aCIsImpvaW4iLCJkaXNhYmxlZCIsInJvd0luZCIsInNoaWZ0S2V5Iiwib25FZGl0Q2VsbEtleURvd24iLCJvbkNyZWF0ZUNlbGxLZXlEb3duIiwib25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UiLCJ2YWx1ZVBhcnNlciIsImV2ZW50T3JEYXRhIiwicmF3VmFsdWUiLCJ0YXJnZXQiLCJ1bmRlZmluZWQiLCJmaWx0ZXJDZWxsVmFsdWVDaGFuZ2UiLCJvbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSIsImNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSIsIm9uQ3JlYXRlVmFsdWVDaGFuZ2UiLCJvblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZSIsIm1hdGNoVmFsdWUiLCJuZXdWYWx1ZUtleVBhdGgiLCJ2IiwibmV3VmFsdWUiLCJ2YWxpZGF0b3JzIiwiY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUiLCJvbkVkaXRDZWxsVmFsdWVDaGFuZ2UiLCJkYXRhSWQiLCJnZXREYXRhSWRCeVJvd0luZGV4IiwiZWRpdENlbGxWYWx1ZUNoYW5nZSIsIm9uRWRpdFZhbHVlQ2hhbmdlIiwiZWRpdENlbGxWYWx1ZVZhbGlkYXRlIiwib25DcmVhdGVDZWxsQmx1ciIsIm9uQ3JlYXRlQmx1ciIsImdldEVkaXRJdGVtVmFsdWUiLCJvbkVkaXRDZWxsQmx1ciIsIm9uRWRpdEJsdXIiLCJvbkNlbGxGb2N1cyIsImNlbGxUeXBlIiwiaW5wdXRUeXBlIiwiY2VsbFNlbGVjdGlvbkNoYW5nZSIsImNlbGxTZWxlY3QiLCJjb21wb25lbnQiLCJpbnB1dFJlZiIsImlkS2V5UGF0aCIsImdldFNlbGVjdGVkSXRlbUluZGV4IiwiaW5kZXgiLCJvcHRpb25zIiwiZWRpdFZhbHVlIiwib3JpZ2luYWxWYWx1ZSIsImNvbXBvbmVudFR5cGUiLCJzZWxlY3RPcHRpb25zIiwiZmluZCIsIm9iaiIsIlN0cmluZyIsInJlcGxhY2UiLCJnZXRDcmVhdGVJdGVtVmFsdWUiLCJ2YWwiLCJnZXRGaWx0ZXJJdGVtVmFsdWUiLCJ0b0pTIiwiZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZSIsIm1vZGUiLCJjb21wb25lbnREaXNhYmxlZCIsImRpc2FibGVFZGl0aW5nIiwiZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2giLCJtYXRjaFZhbHVlS2V5UGF0aCIsInJvd0NsYXNzTmFtZXMiLCJleHRyYVJvd0NvdW50IiwicHVzaCIsImluZGV4T2YiLCJyb3dDbGFzc05hbWVHZXR0ZXIiLCJnZXRDZWxsTWVzc2FnZXMiLCJyZXR1cm5EYXRhIiwiaW5mb01lc3NhZ2UiLCJlcnJvck1lc3NhZ2UiLCJ3YXJuaW5nTWVzc2FnZSIsInNjcm9sbFRvUm93Iiwic2Nyb2xsTmV3Um93Iiwic2Nyb2xsSW5FZGl0TW9kZSIsImZpcnN0IiwiZm9jdXNUbyIsInByZXZGb2N1c1RvIiwiZm9jdXNUb0xhc3RSb3ciLCJoYW5kbGVDZWxsU2VsZWN0IiwiaGFuZGxlQ3JlYXRlQ2VsbFJlZiIsInJlZiIsImZvY3VzIiwiaGFuZGxlRWRpdENlbGxSZWYiLCJzZWxlY3RlZFJvd0luZGV4IiwiY29sdW1uSW5kZXgiLCJlbGVtZW50VHlwZXMiLCJzZXRUaW1lb3V0IiwiaGFuZGxlU2VsZWN0QWxsQ2hlY2tCb3hPbkNoYW5nZSIsInNlbGVjdEFsbEl0ZW1zQ2hhbmdlIiwiaGFuZGxlU2VsZWN0aW9uQ2hlY2tCb3hPbkNoYW5nZSIsIml0ZW1TZWxlY3Rpb25DaGFuZ2UiLCJnZW5lcmF0ZUNvbHVtbnMiLCJpbnRsIiwic2VsZWN0Q29tcG9uZW50T3B0aW9ucyIsImV4dHJhQ29sdW1uIiwicm93U2VsZWN0Q2hlY2tib3hDb2x1bW4iLCJzaG93U2VsZWN0QWxsQ2hlY2tib3giLCJ0YWJJbmRleCIsIndpZHRoIiwiaXNSZXNpemFibGUiLCJpc1NvcnRhYmxlIiwiY2VsbCIsInZhbHVlUmVuZGVyIiwiY2VsbEVkaXQiLCJjZWxsQ3JlYXRlIiwiY2VsbEZpbHRlciIsImhlYWRlciIsInJvd0l0ZW0iLCJpdGVtSWQiLCJzZWxlY3RlZCIsImZvckVhY2giLCJ2aXNpYmxlQ29sdW1uS2V5Iiwib3JnQ29sIiwidmFsdWVFbXB0eUNoZWNrZXIiLCJnZXRWYWx1ZUVtcHR5Q2hlY2tlciIsImZvcm1hdCIsImlzUmVxdWlyZWQiLCJjb2x1bW4iLCJHcmlkQ29sdW1uU2VydmljZSIsImJhc2VDb2x1bW4iLCJjb2x1bW5GdW5jdGlvbnMiLCJlZGl0IiwiZ2V0SXRlbVZhbHVlIiwib25DZWxsVmFsdWVDaGFuZ2UiLCJvbkNlbGxCbHVyIiwiaGFuZGxlQ2VsbFJlZiIsImZpbHRlciIsImNlbGxQcm9wcyIsImNvbHVtbkNlbGwiLCJjb21wb25lbnRUeXBlUHJvcHMiLCJjb2x1bW5Db21wb25lbnRUeXBlIiwicGFkZGluZyIsInJlbW92ZU5ld0l0ZW0iLCJpc0NlbGxFZGl0ZWQiLCJyb3dTZWxlY3QiLCJjdHJsS2V5IiwiZ2V0U2VsZWN0aW9uIiwicmVtb3ZlQWxsUmFuZ2VzIiwicGFyZW50Tm9kZSIsInBhcmVudDFjbGFzcyIsInBhcmVudDJjbGFzcyIsInBhcmVudDNjbGFzcyIsInBhcmVudDRjbGFzcyIsIm11bHRpU2VsZWN0Iiwib25Sb3dDbGljayIsInN0b3BQcm9wYWdhdGlvbiIsImNsaWVudFgiLCJjbGllbnRZIiwiYWRkRXZlbnRMaXN0ZW5lciIsImhhbmRsZUNvbnRleHRNZW51SXRlbUNsaWNrIiwib25DbGljayIsInNlbGVjdGVkRGF0YSIsInJlbmRlckNlbGwiLCJleGlzdGluZ1Jvd3NJbmRleCIsImlzU3BlY2lhbCIsImdldFJvd0luZGV4IiwibWVzc2FnZURhdGEiLCJpc0VkaXRlZCIsInN0eWxlIiwidGV4dEFsaWduIiwibGVuZ2h0IiwibWFwIiwic29ydENoYW5nZSIsIm1pbldpZHRoIiwibWF4V2lkdGgiLCJmbGV4R3JvdyIsImZpeGVkIiwiZml4ZWRSaWdodCIsImFsbG93Q2VsbHNSZWN5Y2xpbmciLCJkaXNwbGF5IiwiekluZGV4IiwicG9zaXRpb24iLCJ0b3AiLCJsZWZ0IiwiZCIsIml0ZW0iLCJkaXZpZGVyIiwidGl0bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O29EQUFBOzs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUlBOztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztJQUFZQSxlOztBQUNaOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQyxrQkFBa0IsU0FBbEJBLGVBQWtCLENBQUNDLEtBQUQsRUFBUUMsUUFBUixFQUFxQjtBQUMzQyxNQUFNQyxPQUFPRCxTQUFTRSxJQUF0QjtBQUNBLFNBQU87QUFDTEMsWUFBUUos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QUFPOU0sQ0FBUCxFQUFhO0FBQUEsWUFDdkU4QixRQUR1RSxHQUMxRGdMLElBRDBELENBQ3ZFaEwsUUFEdUU7O0FBRTdFLFlBQUksT0FBT2dMLEtBQUtoTCxRQUFaLEtBQXlCLFVBQTdCLEVBQXlDO0FBQ3ZDQSxxQkFBV2dMLEtBQUtoTCxRQUFMLENBQWNoSixhQUFkLEVBQTZCd1MsWUFBN0IsQ0FBWDtBQUNEO0FBQ0QsZUFDRTtBQUFDLGtDQUFEO0FBQUE7QUFDRSxpQkFBS3RMLENBRFAsQ0FDVTtBQURWLGNBRUUsUUFBUThNLEtBQUtyRSxNQUZmO0FBR0UscUJBQVNxRSxLQUFLQyxPQUhoQjtBQUlFLHNCQUFVakwsUUFKWjtBQUtFLG1CQUFPZ0wsS0FBS0UsS0FMZDtBQU1FLHFCQUFVbEwsWUFBWSxDQUFDZ0wsS0FBS3pCLE9BQW5CLEdBQThCLElBQTlCLEdBQXFDLE9BQUtELDBCQUFMLENBQzVDMEIsS0FBS3pCLE9BRHVDLEVBRTVDdlMsYUFGNEMsRUFHNUN3UyxZQUg0QztBQU5oRDtBQVlHd0IsZUFBS3JNO0FBWlIsU0FERjtBQWdCRCxPQXJCNEM7QUFEL0MsS0FERjtBQTBCRCxHOztrQkF3SFlsRyxRIiwiZmlsZSI6ImRhdGFncmlkLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLWxvbmVseS1pZiwgcHJlZmVyLXRlbXBsYXRlLCByZWFjdC9yZXF1aXJlLWRlZmF1bHQtcHJvcHMgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBNYXAsIExpc3QgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7XG4gIGluamVjdEludGwsXG4gIEZvcm1hdHRlZE1lc3NhZ2UgYXMgTSxcbn0gZnJvbSAncmVhY3QtaW50bCc7XG5pbXBvcnQgeyBDb2x1bW4sIENlbGwgfSBmcm9tICdmaXhlZC1kYXRhLXRhYmxlLTInO1xuaW1wb3J0IHsgTWVudUl0ZW0gfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyBJY29uIH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtaWNvbnMnO1xuaW1wb3J0IFNwaW5uZXIgZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3Qtc3Bpbm5lcic7XG5pbXBvcnQgQ2hlY2tib3ggZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtY2hlY2tib3gnO1xuaW1wb3J0ICdmaXhlZC1kYXRhLXRhYmxlLTIvZGlzdC9maXhlZC1kYXRhLXRhYmxlLmNzcyc7XG5cbmltcG9ydCBSZXNwb25zaXZlRml4ZWREYXRhVGFibGUgZnJvbSAnLi9yZXNwb25zaXZlLWZpeGVkLWRhdGEtdGFibGUuY29tcG9uZW50JztcbmltcG9ydCBIZWFkZXJDZWxsIGZyb20gJy4vaGVhZGVyLWNlbGwuY29tcG9uZW50JztcbmltcG9ydCBBY3Rpb25CYXIgZnJvbSAnLi9hY3Rpb24tYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgSW5saW5lRWRpdENvbnRyb2xzIGZyb20gJy4vaW5saW5lLWVkaXQtY29udHJvbHMuY29tcG9uZW50JztcbmltcG9ydCBGaWx0ZXJpbmdDb250cm9scyBmcm9tICcuL2ZpbHRlcmluZy1jb250cm9scy5jb21wb25lbnQnO1xuaW1wb3J0IERyb3Bkb3duQ29udHJvbHMgZnJvbSAnLi9kcm9wZG93bi1jb250cm9scy5jb21wb25lbnQnO1xuaW1wb3J0ICogYXMgZGF0YWdyaWRBY3Rpb25zIGZyb20gJy4vZGF0YWdyaWQuYWN0aW9ucyc7XG5pbXBvcnQgQ2VsbFRvb2x0aXAgZnJvbSAnLi9jZWxsLXRvb2x0aXAuY29tcG9uZW50JztcbmltcG9ydCBDb2x1bW5TZXR0aW5nc01vZGFsIGZyb20gJy4vY29sdW1uLXNldHRpbmdzL2NvbHVtbi1zZXR0aW5ncy5jb21wb25lbnQnO1xuaW1wb3J0IHsgcHJvcFR5cGVzLCBkZWZhdWx0UHJvcHMgfSBmcm9tICcuL2RhdGFncmlkLnByb3BzJztcbmltcG9ydCB7IEtFWV9DT0RFUyB9IGZyb20gJy4vZGF0YWdyaWQuY29uc3RhbnRzJztcbmltcG9ydCBwYWdpbmF0aW9uIGZyb20gJy4vcGFnaW5hdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4vZGF0YWdyaWQudXRpbHMnO1xuaW1wb3J0IEdyaWRDb2x1bW5TZXJ2aWNlIGZyb20gJy4vY29sdW1uLXNlcnZpY2UvY29sdW1uLXNlcnZpY2UnO1xuaW1wb3J0ICcuL2RhdGFncmlkLmNvbXBvbmVudC5zY3NzJztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlLCBvd25Qcm9wcykgPT4ge1xuICBjb25zdCBHUklEID0gb3duUHJvcHMuZ3JpZDtcbiAgcmV0dXJuIHtcbiAgICBpc0J1c3k6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdpc0J1c3knXSwgdHJ1ZSksXG4gICAgaXNFZGl0aW5nOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnaXNFZGl0aW5nJ10sIGZhbHNlKSxcbiAgICBpc0NyZWF0aW5nOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnaXNDcmVhdGluZyddLCBmYWxzZSksXG4gICAgaXNGaWx0ZXJpbmc6XG4gICAgICBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2lzRmlsdGVyaW5nJ10sIGZhbHNlKSxcbiAgICBpc0NvbHVtblNldHRpbmdzTW9kYWxPcGVuOlxuICAgICAgc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2NvbHVtblNldHRpbmdzTW9kYWwnLCAnb3BlbiddLCBmYWxzZSksXG4gICAgc29ydENvbHVtbjogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnc29ydGluZ0RhdGEnLCAnc29ydENvbHVtbiddLCBudWxsKSxcbiAgICBzb3J0T3JkZXI6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ3NvcnRpbmdEYXRhJywgJ3NvcnRPcmRlciddLCBudWxsKSxcbiAgICB2aXNpYmxlQ29sdW1uczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAndmlzaWJsZUNvbHVtbnMnXSwgTGlzdCgpKSxcbiAgICBjb2x1bW5XaWR0aHM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ2NvbHVtbldpZHRocyddLCBNYXAoKSksXG4gICAgc2VsZWN0ZWRDZWxsOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3NlbGVjdGVkQ2VsbCddLCBNYXAoKSksXG4gICAgc2VsZWN0ZWRJdGVtczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZWxlY3RlZEl0ZW1zJ10sIExpc3QoKSksXG4gICAgZGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdkYXRhJ10sIExpc3QoKSksXG4gICAgZWRpdERhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnZWRpdERhdGEnXSwgTWFwKCkpLFxuICAgIGNyZWF0ZURhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY3JlYXRlRGF0YSddLCBMaXN0KCkpLFxuICAgIGZpbHRlckRhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnZmlsdGVyRGF0YSddLCBNYXAoKSksXG4gICAgY2VsbE1lc3NhZ2VzOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NlbGxNZXNzYWdlcyddLCBNYXAoKSksXG4gICAgY3JlYXRlQ2VsbE1lc3NhZ2VzOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NyZWF0ZUNlbGxNZXNzYWdlcyddLCBNYXAoKSksXG4gICAgYWxsRGF0YVNpemU6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnYWxsRGF0YSddLCBMaXN0KCkpLnNpemUsXG4gICAgbGFuZ3VhZ2U6IFV0aWxzLmdldExhbmd1YWdlKEdSSUQsIHN0YXRlLnVzZXIpLFxuICAgIHJlZ2lvbjogVXRpbHMuZ2V0UmVnaW9uKEdSSUQsIHN0YXRlLnVzZXIpLFxuICAgIGRhdGVGb3JtYXQ6IFV0aWxzLmdldERhdGVGb3JtYXQoR1JJRCwgc3RhdGUudXNlciksXG4gICAgdGhvdXNhbmRTZXBhcmF0b3I6IFV0aWxzLmdldFRob3VzYW5kU2VwYXJhdG9yKEdSSUQsIHN0YXRlLnVzZXIpLFxuICAgIGRlY2ltYWxTZXBhcmF0b3I6IFV0aWxzLmdldERlY2ltYWxTZXBhcmF0b3IoR1JJRCwgc3RhdGUudXNlciksXG4gICAgZm9yY2VSZWZyZXNoVGltZXN0YW1wOiBzdGF0ZS5kYXRhZ3JpZC5nZXQoJ2ZvcmNlUmVmcmVzaCcsIDApLCAvLyBmb3JjZSByZS1yZW5kZXIgd2hlbiBjaGFuZ2VkXG4gICAgZm9jdXNUeXBlOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnZm9jdXNUeXBlJ10sIE1hcCgpKSxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRhdGFncmlkQWN0aW9ucztcblxuQHBhZ2luYXRpb25cbkBpbmplY3RJbnRsXG5AY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcylcbmNsYXNzIERhdGFHcmlkIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSBwcm9wVHlwZXM7XG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGN1cnJlbnRSb3c6IDAsXG4gICAgICBjdXJyZW50Q29sdW1uOiAwLFxuICAgICAgY29udGV4dE1lbnVPcGVuOiBmYWxzZSxcbiAgICAgIGNvbnRleHRNZW51WDogbnVsbCxcbiAgICAgIGNvbnRleHRNZW51WTogbnVsbCxcbiAgICB9O1xuICAgIHRoaXMuY2VsbFJlZnMgPSB7fTtcbiAgICB0aGlzLmNyZWF0ZUNlbGxSZWZzID0ge307XG4gICAgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCA9IGZhbHNlO1xuICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gZmFsc2U7IC8vIFRPRE86IEhhbmRsZSBmb2N1c2luZyB3aGVuIHRydWVcbiAgICB0aGlzLmZvY3VzVG9FcnJvckNlbGwgPSBmYWxzZTsgLy8gVE9ETzogSGFuZGxlIGZvY3VzaW5nIHdoZW4gdHJ1ZVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uRG9jdW1lbnRDbGljayk7XG4gICAgdGhpcy5wcm9wcy5pbnZhbGlkYXRlKHRoaXMucHJvcHMuZ3JpZCk7XG4gIH1cblxuICBvbkRvY3VtZW50Q2xpY2sgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuY29udGV4dE1lbnVJdGVtcykge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGNvbnRleHRNZW51T3BlbjogZmFsc2UsXG4gICAgICB9KTtcbiAgICB9XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uRG9jdW1lbnRDbGljayk7XG4gIH07XG5cbiAgb25Db2x1bW5SZXNpemVFbmRDYWxsYmFjayA9IChuZXdDb2x1bW5XaWR0aCwgY29sdW1uS2V5KSA9PiB7XG4gICAgdGhpcy5wcm9wcy5yZXNpemVDb2x1bW4odGhpcy5wcm9wcy5ncmlkLCBjb2x1bW5LZXksIG5ld0NvbHVtbldpZHRoKTtcbiAgfTtcblxuICAvKipcbiAgICogQHBhcmFtIHJvd0luZGV4IChpbnQpXG4gICAqIEBwYXJhbSBjb2wgKG9iaikuIENvbHVtbiBvYmplY3QuXG4gICAqIEBwYXJhbSBlLiBPcmlnaW5hbCBLZXlEb3duIGV2ZW50XG4gICAqIEBwYXJhbSBjcmVhdGUgKGJvb2wpLiBJcyB0aGUgY2VsbCBjcmVhdGUgY2VsbCBvciBlZGl0IGNlbGw/XG4gICAqL1xuICBvbkNlbGxLZXlEb3duID0gKHJvd0luZGV4LCBjb2wsIGUsIGNyZWF0ZSA9IGZhbHNlKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuZW5hYmxlQXJyb3dOYXZpZ2F0aW9uKSB7XG4gICAgICBjb25zdCBjZWxsUmVmcyA9IGNyZWF0ZSA/IHRoaXMuY3JlYXRlQ2VsbFJlZnMgOiB0aGlzLmNlbGxSZWZzO1xuICAgICAgY29uc3QgYXJyb3dLZXlzID0gW0tFWV9DT0RFUy5ET1dOLCBLRVlfQ09ERVMuVVAsIEtFWV9DT0RFUy5MRUZULCBLRVlfQ09ERVMuUklHSFRdO1xuICAgICAgY29uc3Qge1xuICAgICAgICBjb2x1bW5zLCB2aXNpYmxlQ29sdW1ucywgZ3JpZCwgZGF0YSwgb25MYXN0Q2VsbFRhYlByZXNzLFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCBncmlkQ29sdW1ucyA9IFV0aWxzLnZpc2libGVDb2x1bW5zKGNvbHVtbnMsIHZpc2libGVDb2x1bW5zKTtcbiAgICAgIGNvbnN0IGdldENvbHVtbktleUJ5SW5kZXggPSBpID0+IFV0aWxzLmdldENvbHVtbktleShncmlkQ29sdW1uc1tpXSk7XG4gICAgICBjb25zdCByb3dzU2l6ZSA9IGRhdGEuc2l6ZTtcbiAgICAgIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2wpO1xuICAgICAgbGV0IGN1cnJlbnRDZWxsID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtjb2x1bW5LZXl9XyR7cm93SW5kZXh9YF07XG4gICAgICBsZXQgcHJveHkgPSBudWxsO1xuXG4gICAgICBjb25zdCBpc0N1cnNvckF0U3RhcnQgPSAoKSA9PiB7XG4gICAgICAgIGlmIChjdXJyZW50Q2VsbC50eXBlICE9PSAndGV4dCcpIHJldHVybiB0cnVlO1xuICAgICAgICByZXR1cm4gY3VycmVudENlbGwuc2VsZWN0aW9uU3RhcnQgPT09IDA7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBpc0N1cnNvckF0RW5kID0gKCkgPT4ge1xuICAgICAgICBpZiAoY3VycmVudENlbGwudHlwZSAhPT0gJ3RleHQnKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRDZWxsLnNlbGVjdGlvbkVuZCA9PT0gY3VycmVudENlbGwudmFsdWUubGVuZ3RoO1xuICAgICAgfTtcblxuICAgICAgLy8gSWYgY3VycmVudCBjZWxsIGhvbGRzIGEgcmVhY3QtZmxvYXRpbmctc2VsZWN0IGNvbXBvbmVudFxuICAgICAgaWYgKGN1cnJlbnRDZWxsICYmXG4gICAgICAgICAoY3VycmVudENlbGwuc2VsZWN0UmVmIHx8IHR5cGVvZiBjdXJyZW50Q2VsbC5zZWxlY3QgPT09ICdvYmplY3QnKSkge1xuICAgICAgICBwcm94eSA9IGN1cnJlbnRDZWxsO1xuICAgICAgICBjdXJyZW50Q2VsbCA9IHRoaXMuZ2V0U2VsZWN0UmVmKHByb3h5KTtcbiAgICAgIH1cblxuICAgICAgLy8gUHJldmVudHMgdXAvZG93biBhcnJvdyBmcm9tIGNoYW5naW5nIG51bWJlciBmaWVsZCB2YWx1ZVxuICAgICAgaWYgKGFycm93S2V5cy5pbmNsdWRlcyhlLmtleUNvZGUpICYmIGN1cnJlbnRDZWxsLnR5cGUgPT09ICdudW1iZXInKSBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuICAgICAgICBjYXNlIEtFWV9DT0RFUy5FTlRFUjpcbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuRVNDOiB7XG4gICAgICAgICAgaWYgKGNyZWF0ZSAmJiBlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5FTlRFUikge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5hZGROZXdJdGVtKGdyaWQsIFV0aWxzLmdldENvbHVtbkRlZmF1bHRWYWx1ZXMoY29sdW1ucykpO1xuICAgICAgICAgICAgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgY3VycmVudENlbGwuc2VsZWN0KCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuRE9XTjoge1xuICAgICAgICAgIGxldCBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4ICsgMX1gXTtcblxuICAgICAgICAgIC8vIFByZXZlbnRzIG1lbnUgZnJvbSBvcGVuaW5nXG4gICAgICAgICAgaWYgKHByb3h5ICYmIHByb3h5LnNlbGVjdFJlZiAmJiAhcHJveHkuc2VsZWN0UmVmLnN0YXRlLm1lbnVJc09wZW4pIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmICghbmV4dEVsZW1lbnQpIGJyZWFrO1xuICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSB0aGlzLmdldFNlbGVjdFJlZihuZXh0RWxlbWVudCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubW92ZUNlbGxGb2N1cyhuZXh0RWxlbWVudCwgcm93SW5kZXggKyAxLCAtMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuVVA6IHtcbiAgICAgICAgICBsZXQgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2NvbHVtbktleX1fJHtyb3dJbmRleCAtIDF9YF07XG5cbiAgICAgICAgICAvLyBQcmV2ZW50cyBtZW51IGZyb20gb3BlbmluZ1xuICAgICAgICAgIGlmIChwcm94eSAmJiBwcm94eS5zZWxlY3RSZWYgJiYgIXByb3h5LnNlbGVjdFJlZi5zdGF0ZS5tZW51SXNPcGVuKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAoIW5leHRFbGVtZW50KSBicmVhaztcbiAgICAgICAgICAgIG5leHRFbGVtZW50ID0gdGhpcy5nZXRTZWxlY3RSZWYobmV4dEVsZW1lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm1vdmVDZWxsRm9jdXMobmV4dEVsZW1lbnQsIHJvd0luZGV4IC0gMSwgLTEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLlRBQjpcbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuUklHSFQ6XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLkxFRlQ6IHtcbiAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuUklHSFQgJiYgIWlzQ3Vyc29yQXRFbmQoKSkgYnJlYWs7XG4gICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLkxFRlQgJiYgIWlzQ3Vyc29yQXRTdGFydCgpKSBicmVhaztcblxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgIGxldCBjb2x1bW5JbmQgPSBncmlkQ29sdW1ucy5maW5kSW5kZXgoYyA9PiBjLnZhbHVlS2V5UGF0aC5qb2luKCcvJykgPT09IGNvbHVtbktleSk7XG4gICAgICAgICAgaWYgKGNvbHVtbkluZCAhPT0gLTEpIHtcbiAgICAgICAgICAgIGxldCBkaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICBsZXQgbmV4dEVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgbGV0IHJvd0luZCA9IHJvd0luZGV4O1xuICAgICAgICAgICAgd2hpbGUgKGRpc2FibGVkKSB7XG4gICAgICAgICAgICAgIC8vIE1vdmluZyB0byB0aGUgbGVmdFxuICAgICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuTEVGVCB8fCAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuVEFCICYmIGUuc2hpZnRLZXkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbHVtbkluZCAtIDEgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kIC09IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyb3dJbmQgLSAxID49IDApIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCA9IGdyaWRDb2x1bW5zLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgICByb3dJbmQgLT0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE1vdmluZyB0byB0aGUgcmlnaHRcbiAgICAgICAgICAgICAgICBpZiAoY29sdW1uSW5kICsgMSA8IGdyaWRDb2x1bW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kICs9IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyb3dJbmQgKyAxIDwgcm93c1NpemUpIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCA9IDA7XG4gICAgICAgICAgICAgICAgICByb3dJbmQgKz0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJvd0luZCArIDEgPT09IHJvd3NTaXplKSB7XG4gICAgICAgICAgICAgICAgICAvLyBJZiB0cnlpbmcgdG8gc2VsZWN0IGEgcm93LCB3aGVuIHRoZXJlIGlzIG5vbmU6XG4gICAgICAgICAgICAgICAgICBpZiAob25MYXN0Q2VsbFRhYlByZXNzICYmIGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLlRBQikgb25MYXN0Q2VsbFRhYlByZXNzKGUpO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2dldENvbHVtbktleUJ5SW5kZXgoY29sdW1uSW5kKX1fJHtyb3dJbmR9YF07XG5cbiAgICAgICAgICAgICAgLy8gSWYgd2UgY2Fubm90IGZvY3VzIG9uIHRoZSBuZXh0IGVsZW1lbnQgd2hpbGUgbW92aW5nIHRvIHRoZSByaWdodFxuICAgICAgICAgICAgICBpZiAoIW5leHRFbGVtZW50ICYmIGUua2V5Q29kZSAhPT0gS0VZX0NPREVTLkxFRlQpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSdyZSBub3QgeWV0IGluIHRoZSBsYXN0IGZvY3VzYWJsZSBjb2x1bW5cbiAgICAgICAgICAgICAgICBpZiAoY29sdW1uSW5kIDw9IGdyaWRDb2x1bW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgd2hpbGUgKGNvbHVtbkluZCA8PSBncmlkQ29sdW1ucy5sZW5ndGggJiYgIW5leHRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHRFbGVtZW50ID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtnZXRDb2x1bW5LZXlCeUluZGV4KGNvbHVtbkluZCl9XyR7cm93SW5kfWBdO1xuICAgICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgKz0gMTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBJZiB3ZSBhcmUgaW4gdGhlIGxhc3QgY29sdW1uIGFuZCB3ZSBkb24ndCBoYXZlIGFuIGVsZW1lbnQgdG8gZm9jdXMgb24sXG4gICAgICAgICAgICAgICAgICAgIC8vIHdlIG11c3QgbW92ZSB0byB0aGUgbmV4dCByb3cgKGlmIHBvc3NpYmxlKVxuICAgICAgICAgICAgICAgICAgICBpZiAoIW5leHRFbGVtZW50ICYmIGNvbHVtbkluZCA9PT0gZ3JpZENvbHVtbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gSWYgdHJ5aW5nIHRvIHNlbGVjdCBhIHJvdywgd2hlbiB0aGVyZSBpcyBub25lOlxuICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3dJbmQgKyAxID09PSByb3dzU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9uTGFzdENlbGxUYWJQcmVzcyAmJiBlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5UQUIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25MYXN0Q2VsbFRhYlByZXNzKGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgY29sdW1uSW5kID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICByb3dJbmQgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgICBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Z2V0Q29sdW1uS2V5QnlJbmRleChjb2x1bW5JbmQpfV8ke3Jvd0luZH1gXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSBjYW5ub3QgZm9jdXMgb24gdGhlIG5leHQgZWxlbWVudCB3aGlsZSBtb3ZpbmcgdG8gdGhlIGxlZnRcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICghbmV4dEVsZW1lbnQgJiYgZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuTEVGVCkge1xuICAgICAgICAgICAgICAgIHdoaWxlIChjb2x1bW5JbmQgPiAwICYmICFuZXh0RWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kIC09IDE7XG4gICAgICAgICAgICAgICAgICBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Z2V0Q29sdW1uS2V5QnlJbmRleChjb2x1bW5JbmQpfV8ke3Jvd0luZH1gXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gaWYgbm8gZWxlbWVudCB3YXMgZm91bmQsIHRyeSBtb3ZpbmcgdG8gcHJldmlvdXMgcm93XG4gICAgICAgICAgICAgICAgLy8gKG5lZWRlZCBpbiBjYXNlIGZpcnN0IGNvbHVtbiBpcyBub3QgZWRpdGFibGUgZS5nLiBhbiBFeHRyYUNvbHVtbilcbiAgICAgICAgICAgICAgICBpZiAocm93SW5kID4gMCAmJiAhbmV4dEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCA9IGdyaWRDb2x1bW5zLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgICByb3dJbmQgLT0gMTtcbiAgICAgICAgICAgICAgICAgIG5leHRFbGVtZW50ID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtnZXRDb2x1bW5LZXlCeUluZGV4KGNvbHVtbkluZCl9XyR7cm93SW5kfWBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBkaXNhYmxlZCA9IG5leHRFbGVtZW50ID8gbmV4dEVsZW1lbnQuZGlzYWJsZWQgOiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZGlzYWJsZWQgJiYgbmV4dEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXh0RWxlbWVudC5zZWxlY3QgPT09ICdvYmplY3QnIHx8IG5leHRFbGVtZW50LnNlbGVjdFJlZikge1xuICAgICAgICAgICAgICAgIG5leHRFbGVtZW50ID0gdGhpcy5nZXRTZWxlY3RSZWYobmV4dEVsZW1lbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMubW92ZUNlbGxGb2N1cyhuZXh0RWxlbWVudCwgcm93SW5kLCBjb2x1bW5JbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBvbkVkaXRDZWxsS2V5RG93biA9IChyb3dJbmRleCwgY29sKSA9PiAoZSkgPT4ge1xuICAgIHRoaXMub25DZWxsS2V5RG93bihyb3dJbmRleCwgY29sLCBlKTtcbiAgfTtcblxuICBvbkNyZWF0ZUNlbGxLZXlEb3duID0gKHJvd0luZGV4LCBjb2wpID0+IChlKSA9PiB7XG4gICAgdGhpcy5vbkNlbGxLZXlEb3duKHJvd0luZGV4LCBjb2wsIGUsIHRydWUpO1xuICB9O1xuXG4gIG9uRmlsdGVyQ2VsbFZhbHVlQ2hhbmdlID0gKGNvbCwgdmFsdWVQYXJzZXIpID0+IChldmVudE9yRGF0YSkgPT4ge1xuICAgIGxldCByYXdWYWx1ZTtcbiAgICAvLyBldmVudE9yRGF0YSBjYW4gYmUgaW5wdXQgb25DaGFuZ2UgZXZlbnQsIHJlYWN0LXNlbGVjdCBvbkNoYW5nZSBvciByZWFjdC1kYXktcGlja2VyIG9uQ2hhbmdlXG4gICAgaWYgKGV2ZW50T3JEYXRhKSB7XG4gICAgICBpZiAoZXZlbnRPckRhdGEudGFyZ2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YS50YXJnZXQudmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50T3JEYXRhLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YS52YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGE7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlID0gdmFsdWVQYXJzZXIocmF3VmFsdWUpO1xuICAgIHRoaXMucHJvcHMuZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlKFxuICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgdGhpcy5wcm9wcy5jb2x1bW5zLFxuICAgICAgY29sLFxuICAgICAgdmFsdWUsXG4gICAgKTtcbiAgfTtcblxuICBvbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGV2ZW50T3JEYXRhKSA9PiB7XG4gICAgbGV0IHJhd1ZhbHVlO1xuICAgIC8vIGV2ZW50T3JEYXRhIGNhbiBiZSBpbnB1dCBvbkNoYW5nZSBldmVudCwgcmVhY3Qtc2VsZWN0IG9uQ2hhbmdlIG9yIHJlYWN0LWRheS1waWNrZXIgb25DaGFuZ2VcbiAgICBpZiAoZXZlbnRPckRhdGEpIHtcbiAgICAgIGlmIChldmVudE9yRGF0YS50YXJnZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnRPckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSB2YWx1ZVBhcnNlcihyYXdWYWx1ZSk7XG4gICAgdGhpcy5wcm9wcy5jcmVhdGVDZWxsVmFsdWVDaGFuZ2UodGhpcy5wcm9wcy5ncmlkLCByb3dJbmRleCwgY29sLnZhbHVlS2V5UGF0aCwgdmFsdWUpO1xuICAgIGlmIChjb2wub25DcmVhdGVWYWx1ZUNoYW5nZSkge1xuICAgICAgY29sLm9uQ3JlYXRlVmFsdWVDaGFuZ2UodmFsdWUsIGNvbC52YWx1ZUtleVBhdGgsIHJvd0luZGV4KTtcbiAgICB9XG4gICAgaWYgKGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZSAmJiB2YWx1ZSA9PT0gY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm1hdGNoVmFsdWUpIHtcbiAgICAgIC8vIENhbGwgc3BlY2lhbCBwYWlyZWQgdmFsdWUgY2hhbmdlIG9uIG90aGVyIGNlbGwgaWYgdmFsdWUgbWF0Y2hlc1xuICAgICAgdGhpcy5vbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZShcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIHsgdmFsdWVLZXlQYXRoOiBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWVLZXlQYXRoIH0sXG4gICAgICAgIHYgPT4gdixcbiAgICAgICkoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm5ld1ZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNvbC52YWxpZGF0b3JzKSB7XG4gICAgICB0aGlzLnByb3BzLmNyZWF0ZUNlbGxWYWx1ZVZhbGlkYXRlKFxuICAgICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICBjb2wudmFsdWVLZXlQYXRoLFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgY29sLnZhbGlkYXRvcnMsXG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICBvbkVkaXRDZWxsVmFsdWVDaGFuZ2UgPSAocm93SW5kZXgsIGNvbCwgdmFsdWVQYXJzZXIpID0+IChldmVudE9yRGF0YSkgPT4ge1xuICAgIGNvbnN0IGRhdGFJZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgbGV0IHJhd1ZhbHVlO1xuICAgIC8vIGV2ZW50T3JEYXRhIGNhbiBiZSBpbnB1dCBvbkNoYW5nZSBldmVudCwgcmVhY3Qtc2VsZWN0IG9uQ2hhbmdlIG9yIHJlYWN0LWRheS1waWNrZXIgb25DaGFuZ2VcbiAgICBpZiAoZXZlbnRPckRhdGEpIHtcbiAgICAgIGlmIChldmVudE9yRGF0YS50YXJnZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnRPckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSB2YWx1ZVBhcnNlcihyYXdWYWx1ZSk7XG4gICAgdGhpcy5wcm9wcy5lZGl0Q2VsbFZhbHVlQ2hhbmdlKHRoaXMucHJvcHMuZ3JpZCwgZGF0YUlkLCBjb2wudmFsdWVLZXlQYXRoLCB2YWx1ZSk7XG4gICAgaWYgKGNvbC5vbkVkaXRWYWx1ZUNoYW5nZSkge1xuICAgICAgY29sLm9uRWRpdFZhbHVlQ2hhbmdlKHZhbHVlLCBjb2wudmFsdWVLZXlQYXRoLCByb3dJbmRleCwgZGF0YUlkKTtcbiAgICB9XG4gICAgaWYgKGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZSAmJiB2YWx1ZSA9PT0gY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm1hdGNoVmFsdWUpIHtcbiAgICAgIC8vIENhbGwgc3BlY2lhbCBwYWlyZWQgdmFsdWUgY2hhbmdlIG9uIG90aGVyIGNlbGwgaWYgdmFsdWUgbWF0Y2hlc1xuICAgICAgdGhpcy5vbkVkaXRDZWxsVmFsdWVDaGFuZ2UoXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICB7IHZhbHVlS2V5UGF0aDogY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm5ld1ZhbHVlS2V5UGF0aCB9LFxuICAgICAgICB2ID0+IHYsXG4gICAgICApKGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5uZXdWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjb2wudmFsaWRhdG9ycykge1xuICAgICAgdGhpcy5wcm9wcy5lZGl0Q2VsbFZhbHVlVmFsaWRhdGUoXG4gICAgICAgIHRoaXMucHJvcHMuZ3JpZCxcbiAgICAgICAgZGF0YUlkLFxuICAgICAgICBjb2wudmFsdWVLZXlQYXRoLFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgY29sLnZhbGlkYXRvcnMsXG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICBvbkNyZWF0ZUNlbGxCbHVyID0gKHJvd0luZGV4LCBjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZSkgPT4ge1xuICAgIGlmIChjb2wub25DcmVhdGVCbHVyKSB7XG4gICAgICBsZXQgdmFsdWUgPSAoZSAmJiBlLnRhcmdldCAmJiBlLnRhcmdldC52YWx1ZSAhPT0gdW5kZWZpbmVkKSA/XG4gICAgICAgIGUudGFyZ2V0LnZhbHVlIDpcbiAgICAgICAgdGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpO1xuICAgICAgaWYgKHZhbHVlUGFyc2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZVBhcnNlcih2YWx1ZSk7XG4gICAgICB9XG4gICAgICBjb2wub25DcmVhdGVCbHVyKHZhbHVlLCByb3dJbmRleCk7XG4gICAgfVxuICB9O1xuXG4gIG9uRWRpdENlbGxCbHVyID0gKHJvd0luZGV4LCBjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZSkgPT4ge1xuICAgIGlmIChjb2wub25FZGl0Qmx1cikge1xuICAgICAgbGV0IHZhbHVlID0gKGUgJiYgZS50YXJnZXQgJiYgZS50YXJnZXQudmFsdWUgIT09IHVuZGVmaW5lZCkgP1xuICAgICAgICBlLnRhcmdldC52YWx1ZSA6XG4gICAgICAgIHRoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKTtcbiAgICAgIGlmICh2YWx1ZVBhcnNlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWVQYXJzZXIodmFsdWUpO1xuICAgICAgfVxuICAgICAgY29uc3QgZGF0YUlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICAgIGNvbC5vbkVkaXRCbHVyKHZhbHVlLCByb3dJbmRleCwgZGF0YUlkKTtcbiAgICB9XG4gIH07XG5cbiAgb25DZWxsRm9jdXMgPSAoY2VsbFR5cGUsIGlucHV0VHlwZSwgcm93SW5kZXgsIGNvbHVtbktleSkgPT4gKGUpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBjZWxsU2VsZWN0aW9uQ2hhbmdlLCBjZWxsU2VsZWN0LCBncmlkLCBpc0VkaXRpbmcsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKGlzRWRpdGluZykgcmV0dXJuO1xuXG4gICAgaWYgKGlucHV0VHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIGUudGFyZ2V0LnNlbGVjdCgpO1xuICAgIH1cbiAgICBpZiAoY2VsbFR5cGUgPT09ICdlZGl0JyAmJiBjZWxsU2VsZWN0KSB7XG4gICAgICBjZWxsU2VsZWN0aW9uQ2hhbmdlKGdyaWQsIE1hcCh7XG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICBjb2x1bW5LZXksXG4gICAgICB9KSk7XG4gICAgfVxuICB9O1xuXG4gIGdldFNlbGVjdFJlZiA9IChjb21wb25lbnQpID0+IHtcbiAgICBpZiAoIWNvbXBvbmVudCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKGNvbXBvbmVudC5zZWxlY3QgJiYgY29tcG9uZW50LnNlbGVjdC5pbnB1dFJlZikge1xuICAgICAgcmV0dXJuIGNvbXBvbmVudC5zZWxlY3QuaW5wdXRSZWY7XG4gICAgfVxuICAgIGlmIChjb21wb25lbnQuc2VsZWN0ICYmIGNvbXBvbmVudC5zZWxlY3Quc2VsZWN0KSB7XG4gICAgICByZXR1cm4gY29tcG9uZW50LnNlbGVjdC5zZWxlY3QuaW5wdXRSZWY7XG4gICAgfVxuICAgIGlmIChjb21wb25lbnQuc2VsZWN0UmVmICYmIGNvbXBvbmVudC5zZWxlY3RSZWYuc2VsZWN0LnNlbGVjdCkge1xuICAgICAgcmV0dXJuIGNvbXBvbmVudC5zZWxlY3RSZWYuc2VsZWN0LnNlbGVjdC5pbnB1dFJlZjtcbiAgICB9XG4gICAgcmV0dXJuIGNvbXBvbmVudC5zZWxlY3RSZWYuc2VsZWN0LmlucHV0UmVmO1xuICB9O1xuXG4gIGdldERhdGFJZEJ5Um93SW5kZXggPSByb3dJbmRleCA9PlxuICAgIHRoaXMucHJvcHMuZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLnRoaXMucHJvcHMuZ3JpZC5pZEtleVBhdGhdKTtcblxuICBnZXRTZWxlY3RlZEl0ZW1JbmRleCA9IChpZCkgPT4ge1xuICAgIGlmICghaWQpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnByb3BzLmRhdGEuZmluZEluZGV4KHYgPT4gdi5nZXRJbih0aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoKSA9PT0gaWQpO1xuICAgIHJldHVybiBpbmRleCA9PT0gLTEgPyB1bmRlZmluZWQgOiBpbmRleDtcbiAgfTtcblxuICBnZXRFZGl0SXRlbVZhbHVlID0gKHJvd0luZGV4LCBjb2wsIG9wdGlvbnMgPSBbXSkgPT4ge1xuICAgIC8vIEdldCB0aGUgdmFsdWUgdG8gZGlzcGxheSBpbiBlZGl0IGNlbGxcbiAgICBjb25zdCBpZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgY29uc3QgZWRpdFZhbHVlID0gdGhpcy5wcm9wcy5lZGl0RGF0YS5nZXRJbihbaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdLCB1bmRlZmluZWQpO1xuICAgIGxldCBvcmlnaW5hbFZhbHVlO1xuICAgIGlmIChlZGl0VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgb3JpZ2luYWxWYWx1ZSA9IHRoaXMucHJvcHMuZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdLCAnJyk7XG4gICAgfSBlbHNlIGlmIChlZGl0VmFsdWUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVmFsdWUgaXMgZm91bmQgZnJvbSBlZGl0RGF0YVxuICAgICAgLy8gRm9ybWF0IGJ5IGNvbXBvbmVudCB0eXBlXG4gICAgICBzd2l0Y2ggKGNvbC5jb21wb25lbnRUeXBlKSB7XG4gICAgICAgIGNhc2UgJ211bHRpc2VsZWN0JzpcbiAgICAgICAgY2FzZSAnc2VsZWN0JzpcbiAgICAgICAgICByZXR1cm4gb3B0aW9ucy5zZWxlY3RPcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gZWRpdFZhbHVlKTtcbiAgICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgICAgcmV0dXJuIG9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSBlZGl0VmFsdWUpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiBlZGl0VmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvcmlnaW5hbFZhbHVlID09PSBudWxsIHx8IG9yaWdpbmFsVmFsdWUgPT09IHVuZGVmaW5lZCB8fCBvcmlnaW5hbFZhbHVlID09PSAnJykge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICAvLyBSZXR1cm4gdmFsdWUgZnJvbSBvcmlnaW5hbCBkYXRhLCBiZWNhdXNlIGVkaXREYXRhIGlzIG5vdCBhdmFpbGFibGVcbiAgICAvLyBGb3JtYXQgYnkgY29tcG9uZW50IHR5cGVcbiAgICBzd2l0Y2ggKGNvbC5jb21wb25lbnRUeXBlKSB7XG4gICAgICBjYXNlICdmbG9hdCc6IHtcbiAgICAgICAgaWYgKFN0cmluZyhvcmlnaW5hbFZhbHVlKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgcmV0dXJuIFN0cmluZyhvcmlnaW5hbFZhbHVlKVxuICAgICAgICAgICAgLnJlcGxhY2UoJy4nLCB0aGlzLnByb3BzLmRlY2ltYWxTZXBhcmF0b3IpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvcmlnaW5hbFZhbHVlO1xuICAgICAgfVxuICAgICAgY2FzZSAnbXVsdGlzZWxlY3QnOlxuICAgICAgY2FzZSAnc2VsZWN0JzpcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuc2VsZWN0T3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IG9yaWdpbmFsVmFsdWUpO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIHJldHVybiBvcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gb3JpZ2luYWxWYWx1ZSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gb3JpZ2luYWxWYWx1ZTtcbiAgICB9XG4gIH07XG5cbiAgZ2V0Q3JlYXRlSXRlbVZhbHVlID0gKHJvd0luZGV4LCBjb2wsIG9wdGlvbnMgPSBbXSkgPT4ge1xuICAgIGNvbnN0IHZhbCA9IHRoaXMucHJvcHMuY3JlYXRlRGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdLCAnJyk7XG4gICAgaWYgKHZhbCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH0gZWxzZSBpZiAoY29sLmNvbXBvbmVudFR5cGUgPT09ICdzZWxlY3QnIHx8IGNvbC5jb21wb25lbnRUeXBlID09PSAnbXVsdGlzZWxlY3QnKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5zZWxlY3RPcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gdmFsKTtcbiAgICB9IGVsc2UgaWYgKFsnYm9vbGVhbiddLmluY2x1ZGVzKGNvbC5jb21wb25lbnRUeXBlKSkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSB2YWwpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsO1xuICB9O1xuXG4gIGdldEZpbHRlckl0ZW1WYWx1ZSA9IChjb2wsIG9wdGlvbnMgPSBbXSkgPT4ge1xuICAgIGNvbnN0IHZhbCA9IHRoaXMucHJvcHMuZmlsdGVyRGF0YS5nZXQoVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCksICcnKTtcbiAgICBpZiAodmFsID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSBlbHNlIGlmIChjb2wuY29tcG9uZW50VHlwZSA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLnNlbGVjdE9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSB2YWwpO1xuICAgIH0gZWxzZSBpZiAoWydjaGVja2JveCcsICdib29sZWFuJ10uaW5jbHVkZXMoY29sLmNvbXBvbmVudFR5cGUpKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IHZhbCk7XG4gICAgfSBlbHNlIGlmIChjb2wuY29tcG9uZW50VHlwZSA9PT0gJ211bHRpc2VsZWN0Jykge1xuICAgICAgLy8gc2Vzc2lvbiBzdG9yYWdlIGNvbnRlbnQgaXMgY29udmVydGVkIHRvIGltbXV0YWJsZSBhbmQgbXVsdGlzZWxlY3RcbiAgICAgIC8vIGZpbHRlcnMgaXMgdGhlbiBsaXN0IG90aGVyd2lzZSBhcnJheVxuICAgICAgcmV0dXJuIHZhbCAmJiB2YWwudG9KUyA/IHZhbC50b0pTKCkgOiB2YWwgfHwgW107XG4gICAgfVxuICAgIHJldHVybiB2YWw7XG4gIH07XG5cbiAgZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZSA9IChyb3dJbmRleCwgY29sLCBtb2RlKSA9PiB7XG4gICAgbGV0IGNvbXBvbmVudERpc2FibGVkID0gISFjb2wuZGlzYWJsZUVkaXRpbmc7XG4gICAgLy8gY2hlY2sgaWYgY29tcG9uZW50IGlzIGRpc2FibGVkIGJ5IG90aGVyIGNvbHVtbiBkYXRhXG4gICAgaWYgKCFjb21wb25lbnREaXNhYmxlZCAmJiBjb2wuZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2gpIHtcbiAgICAgIGlmIChtb2RlID09PSAnY3JlYXRlJykge1xuICAgICAgICBjb21wb25lbnREaXNhYmxlZCA9IHRoaXMuZ2V0Q3JlYXRlSXRlbVZhbHVlKFxuICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgIHsgdmFsdWVLZXlQYXRoOiBjb2wuZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2gubWF0Y2hWYWx1ZUtleVBhdGggfSxcbiAgICAgICAgKSA9PT0gY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb21wb25lbnREaXNhYmxlZCA9IHRoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShcbiAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICB7IHZhbHVlS2V5UGF0aDogY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWVLZXlQYXRoIH0sXG4gICAgICAgICkgPT09IGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaC5tYXRjaFZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29tcG9uZW50RGlzYWJsZWQ7XG4gIH07XG5cbiAgZ2V0Um93Q2xhc3NOYW1lID0gKHJvd0luZGV4KSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZ3JpZCxcbiAgICAgIGlzQ3JlYXRpbmcsXG4gICAgICBpc0VkaXRpbmcsXG4gICAgICBjcmVhdGVEYXRhLFxuICAgICAgc2VsZWN0ZWRJdGVtcyxcbiAgICAgIGRhdGEsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgcm93Q2xhc3NOYW1lcyA9IFsnb2MtZGF0YWdyaWQtcm93J107XG4gICAgbGV0IGV4dHJhUm93Q291bnQgPSAwOyAvLyBob3cgbWFueSByb3dzIHRvIGlnbm9yZSBmcm9tIHRvcCwgbmV3ICsgZmlsdGVyIHJvd3NcbiAgICBpZiAoaXNDcmVhdGluZykgZXh0cmFSb3dDb3VudCA9IGNyZWF0ZURhdGEuc2l6ZTtcbiAgICBpZiAoaXNDcmVhdGluZykge1xuICAgICAgaWYgKHJvd0luZGV4IDw9IChleHRyYVJvd0NvdW50IC0gMSkpIHtcbiAgICAgICAgcm93Q2xhc3NOYW1lcy5wdXNoKCdvYy1kYXRhZ3JpZC1yb3ctbmV3Jyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc0VkaXRpbmcpIHtcbiAgICAgIHJvd0NsYXNzTmFtZXMucHVzaCgnb2MtZGF0YWdyaWQtcm93LWVkaXQnKTtcbiAgICB9XG5cblxuICAgIC8vIGNoZWNrIGlmIHJvdyBpcyBzZWxlY3RlZFxuICAgIGlmICgoIWlzQ3JlYXRpbmcgJiYgIWlzRWRpdGluZykgJiZcbiAgICAgIChzZWxlY3RlZEl0ZW1zICYmIGdyaWQuaWRLZXlQYXRoKSkge1xuICAgICAgaWYgKFxuICAgICAgICBzZWxlY3RlZEl0ZW1zLmluZGV4T2YoZGF0YS5nZXRJbihbcm93SW5kZXggLSBleHRyYVJvd0NvdW50LCAuLi5ncmlkLmlkS2V5UGF0aF0pKSAhPT0gLTFcbiAgICAgICkge1xuICAgICAgICByb3dDbGFzc05hbWVzLnB1c2goJ2lzLXNlbGVjdGVkJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcHMucm93Q2xhc3NOYW1lR2V0dGVyKSB7XG4gICAgICByZXR1cm4gcm93Q2xhc3NOYW1lcy5qb2luKCcgJykgKyAnICcgKyB0aGlzLnByb3BzLnJvd0NsYXNzTmFtZUdldHRlcihyb3dJbmRleCk7XG4gICAgfVxuICAgIHJldHVybiByb3dDbGFzc05hbWVzLmpvaW4oJyAnKTtcbiAgfTtcblxuICBnZXRDZWxsTWVzc2FnZXMgPSAocm93SW5kZXgsIGNvbCwgY2VsbFR5cGUpID0+IHtcbiAgICBjb25zdCByZXR1cm5EYXRhID0ge307XG4gICAgaWYgKCF0aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoIHx8ICFjb2wudmFsdWVLZXlQYXRoKSB7XG4gICAgICByZXR1cm4gcmV0dXJuRGF0YTtcbiAgICB9XG4gICAgbGV0IGluZm9NZXNzYWdlO1xuICAgIGxldCBlcnJvck1lc3NhZ2U7XG4gICAgbGV0IHdhcm5pbmdNZXNzYWdlO1xuICAgIGlmIChjZWxsVHlwZSA9PT0gJ2NyZWF0ZScpIHtcbiAgICAgIGluZm9NZXNzYWdlID0gdGhpcy5wcm9wcy5jcmVhdGVDZWxsTWVzc2FnZXMuZ2V0SW4oWydpbmZvJywgcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgIGVycm9yTWVzc2FnZSA9IHRoaXMucHJvcHMuY3JlYXRlQ2VsbE1lc3NhZ2VzLmdldEluKFsnZXJyb3InLCByb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgd2FybmluZ01lc3NhZ2UgPSB0aGlzLnByb3BzLmNyZWF0ZUNlbGxNZXNzYWdlcy5nZXRJbihbJ3dhcm5pbmcnLCByb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgICBpbmZvTWVzc2FnZSA9IHRoaXMucHJvcHMuY2VsbE1lc3NhZ2VzLmdldEluKFsnaW5mbycsIGlkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgICBlcnJvck1lc3NhZ2UgPSB0aGlzLnByb3BzLmNlbGxNZXNzYWdlcy5nZXRJbihbJ2Vycm9yJywgaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgIHdhcm5pbmdNZXNzYWdlID0gdGhpcy5wcm9wcy5jZWxsTWVzc2FnZXMuZ2V0SW4oWyd3YXJuaW5nJywgaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICB9XG4gICAgaWYgKGluZm9NZXNzYWdlKSB7XG4gICAgICByZXR1cm5EYXRhLmluZm9NZXNzYWdlID0gaW5mb01lc3NhZ2U7XG4gICAgfVxuICAgIGlmIChlcnJvck1lc3NhZ2UpIHtcbiAgICAgIHJldHVybkRhdGEuZXJyb3JNZXNzYWdlID0gZXJyb3JNZXNzYWdlO1xuICAgIH1cbiAgICBpZiAod2FybmluZ01lc3NhZ2UpIHtcbiAgICAgIHJldHVybkRhdGEud2FybmluZ01lc3NhZ2UgPSB3YXJuaW5nTWVzc2FnZTtcbiAgICB9XG4gICAgcmV0dXJuIHJldHVybkRhdGE7XG4gIH07XG5cbiAgZ2V0U2Nyb2xsVG9Sb3cgPSAoKSA9PiB7XG4gICAgbGV0IHNjcm9sbFRvUm93O1xuICAgIGlmICh0aGlzLnByb3BzLmlzQ3JlYXRpbmcgJiYgIXRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwpIHJldHVybiBzY3JvbGxUb1JvdztcbiAgICBpZiAodGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCkge1xuICAgICAgY29uc3Qgc2Nyb2xsTmV3Um93ID0gdGhpcy5wcm9wcy5jcmVhdGVEYXRhLnNpemUgLSAxO1xuICAgICAgaWYgKHNjcm9sbE5ld1JvdyA+PSAwKSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gc2Nyb2xsTmV3Um93O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5pc0VkaXRpbmcgJiYgIXRoaXMucHJvcHMuc2Nyb2xsSW5FZGl0TW9kZSkge1xuICAgICAgICBzY3JvbGxUb1JvdyA9IHRoaXMuc3RhdGUuY3VycmVudFJvdztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gdGhpcy5wcm9wcy5zY3JvbGxUb1JvdzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgfVxuICAgICAgaWYgKHNjcm9sbFRvUm93ID09PSB1bmRlZmluZWQgJiYgdGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLnNpemUgPiAwKSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gdGhpcy5nZXRTZWxlY3RlZEl0ZW1JbmRleCh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuZmlyc3QoKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzY3JvbGxUb1JvdztcbiAgfTtcblxuICBzZXRGb2N1c1RvID0gKGZvY3VzVG8pID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5pc0VkaXRpbmcgfHwgdGhpcy5wcm9wcy5pc0NyZWF0aW5nKSB7XG4gICAgICBpZiAoZm9jdXNUbyAmJiBmb2N1c1RvLmdldCgndHlwZScpICYmIGZvY3VzVG8gIT09IHRoaXMucHJldkZvY3VzVG8pIHtcbiAgICAgICAgdGhpc1tmb2N1c1RvLmdldCgndHlwZScpXSA9IHRydWU7XG4gICAgICAgIHRoaXMuZm9jdXNUb0xhc3RSb3cgPSBmb2N1c1RvLmdldCgnZm9jdXNUb0xhc3RSb3cnKTtcbiAgICAgICAgdGhpcy5wcmV2Rm9jdXNUbyA9IGZvY3VzVG87XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZUNlbGxTZWxlY3QgPSAoY2VsbFR5cGUsIHJvd0luZGV4LCBjb2x1bW5LZXkpID0+ICgpID0+IHtcbiAgICBpZiAoY2VsbFR5cGUgPT09ICd2aWV3JyAmJiB0aGlzLnByb3BzLmNlbGxTZWxlY3QpIHtcbiAgICAgIHRoaXMucHJvcHMuY2VsbFNlbGVjdGlvbkNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIE1hcCh7XG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICBjb2x1bW5LZXksXG4gICAgICB9KSk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZUNyZWF0ZUNlbGxSZWYgPSAocm93SW5kZXgsIGNvbCkgPT4gKHJlZikgPT4ge1xuICAgIC8vIEZvY3VzIHRvIGNyZWF0ZSBjZWxsXG4gICAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCk7XG4gICAgY29uc3Qgc2VsZWN0UmVmID0gIXJlZiB8fCByZWYuZm9jdXMgPyByZWYgOiB0aGlzLmdldFNlbGVjdFJlZihyZWYpO1xuICAgIGlmIChcbiAgICAgIHRoaXMucHJvcHMuY3JlYXRlRGF0YS5zaXplICYmXG4gICAgICB0aGlzLnByb3BzLmNyZWF0ZURhdGEuc2l6ZSA9PT0gcm93SW5kZXggKyAxICYmXG4gICAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsICYmXG4gICAgICAhdGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdjcmVhdGUnKSAmJlxuICAgICAgc2VsZWN0UmVmXG4gICAgKSB7XG4gICAgICBzZWxlY3RSZWYuZm9jdXMoKTtcbiAgICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wcm9wcy5lbmFibGVBcnJvd05hdmlnYXRpb24pIHtcbiAgICAgIHRoaXMuY3JlYXRlQ2VsbFJlZnNbYCR7dGhpcy5wcm9wcy5ncmlkLmlkfV8ke2NvbHVtbktleX1fJHtyb3dJbmRleH1gXSA9IHJlZjtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlRWRpdENlbGxSZWYgPSAocm93SW5kZXgsIGNvbCkgPT4gKHJlZikgPT4ge1xuICAgIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2wpO1xuICAgIGlmICh0aGlzLmZvY3VzVG9FZGl0Q2VsbCAmJiAhdGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdlZGl0JykpIHtcbiAgICAgIGNvbnN0IHNlbGVjdGVkUm93SW5kZXggPSB0aGlzLmZvY3VzVG9MYXN0Um93ICYmIHRoaXMucHJvcHMuZGF0YS5zaXplID4gMCA/XG4gICAgICAgIHRoaXMucHJvcHMuZGF0YS5zaXplIC0gMSA6IHRoaXMuZ2V0U2VsZWN0ZWRJdGVtSW5kZXgodGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLmZpcnN0KCkpO1xuXG4gICAgICBjb25zdCB7IHNlbGVjdGVkQ2VsbCB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IHNlbGVjdFJlZiA9ICFyZWYgfHwgcmVmLmZvY3VzID8gcmVmIDogdGhpcy5nZXRTZWxlY3RSZWYocmVmKTtcbiAgICAgIGlmIChzZWxlY3RlZENlbGwuc2l6ZSA+IDApIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHNlbGVjdGVkQ2VsbC5nZXQoJ3Jvd0luZGV4JykgPT09IHJvd0luZGV4ICYmXG4gICAgICAgICAgc2VsZWN0ZWRDZWxsLmdldCgnY29sdW1uS2V5JykgPT09IGNvbHVtbktleSAmJlxuICAgICAgICAgIHNlbGVjdFJlZlxuICAgICAgICApIHtcbiAgICAgICAgICBzZWxlY3RSZWYuZm9jdXMoKTtcbiAgICAgICAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuZm9jdXNUb0xhc3RSb3cgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzZWxlY3RlZFJvd0luZGV4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mb2N1c1RvTGFzdFJvdyA9IGZhbHNlO1xuICAgICAgfSBlbHNlIGlmIChzZWxlY3RlZFJvd0luZGV4ID09PSByb3dJbmRleCAmJiBzZWxlY3RSZWYpIHtcbiAgICAgICAgc2VsZWN0UmVmLmZvY3VzKCk7XG4gICAgICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZm9jdXNUb0xhc3RSb3cgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuZW5hYmxlQXJyb3dOYXZpZ2F0aW9uKSB7XG4gICAgICB0aGlzLmNlbGxSZWZzW2Ake3RoaXMucHJvcHMuZ3JpZC5pZH1fJHtjb2x1bW5LZXl9XyR7cm93SW5kZXh9YF0gPSByZWY7XG4gICAgfVxuICB9O1xuXG4gIG1vdmVDZWxsRm9jdXMgPSAobmV4dEVsZW1lbnQsIHJvd0luZGV4LCBjb2x1bW5JbmRleCkgPT4ge1xuICAgIGNvbnN0IGVsZW1lbnRUeXBlcyA9IFsndGV4dCcsICdjaGVja2JveCddO1xuICAgIGlmIChuZXh0RWxlbWVudCAmJiBlbGVtZW50VHlwZXMuaW5jbHVkZXMobmV4dEVsZW1lbnQudHlwZSkpIHtcbiAgICAgIGlmIChyb3dJbmRleCAhPT0gLTEgfHwgY29sdW1uSW5kZXggIT09IC0xKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIGN1cnJlbnRDb2x1bW46IGNvbHVtbkluZGV4LFxuICAgICAgICAgIGN1cnJlbnRSb3c6IHJvd0luZGV4LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAobmV4dEVsZW1lbnQudHlwZSA9PT0gJ2NoZWNrYm94JykgbmV4dEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgaWYgKG5leHRFbGVtZW50LnR5cGUgPT09ICd0ZXh0JykgbmV4dEVsZW1lbnQuc2VsZWN0KCk7XG4gICAgICB9LCA1MCk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZVNlbGVjdEFsbENoZWNrQm94T25DaGFuZ2UgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5zZWxlY3RBbGxJdGVtc0NoYW5nZSh0aGlzLnByb3BzLmdyaWQpO1xuICB9O1xuXG4gIGhhbmRsZVNlbGVjdGlvbkNoZWNrQm94T25DaGFuZ2UgPSByb3dJbmRleCA9PiAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5pdGVtU2VsZWN0aW9uQ2hhbmdlKHRoaXMucHJvcHMuZ3JpZCwgcm93SW5kZXgsIHRydWUsIGZhbHNlKTtcbiAgfTtcblxuICBnZW5lcmF0ZUNvbHVtbnMgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGF0YSxcbiAgICAgIHNlbGVjdGVkSXRlbXMsXG4gICAgICBkYXRlRm9ybWF0LFxuICAgICAgdGhvdXNhbmRTZXBhcmF0b3IsXG4gICAgICBkZWNpbWFsU2VwYXJhdG9yLFxuICAgICAgZ3JpZCxcbiAgICAgIGlubGluZUVkaXQsXG4gICAgICBmaWx0ZXJpbmcsXG4gICAgICByZWdpb24sXG4gICAgICBpbnRsLFxuICAgICAgc2VsZWN0Q29tcG9uZW50T3B0aW9ucyxcbiAgICAgIGlzQ3JlYXRpbmcsXG4gICAgICBleHRyYUNvbHVtbixcbiAgICAgIHJvd1NlbGVjdENoZWNrYm94Q29sdW1uLFxuICAgICAgc2hvd1NlbGVjdEFsbENoZWNrYm94LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgY29sdW1ucyA9IFtdO1xuICAgIGNvbnN0IHRhYkluZGV4ID0gU3RyaW5nKHRoaXMucHJvcHMudGFiSW5kZXgpO1xuICAgIGlmIChleHRyYUNvbHVtbikge1xuICAgICAgY29sdW1ucy5wdXNoKHtcbiAgICAgICAgd2lkdGg6IGV4dHJhQ29sdW1uLndpZHRoIHx8IDQwLFxuICAgICAgICBpc1Jlc2l6YWJsZTogISFleHRyYUNvbHVtbi5pc1Jlc2l6YWJsZSxcbiAgICAgICAgaXNTb3J0YWJsZTogZmFsc2UsXG4gICAgICAgIGNvbHVtbktleTogJ2V4dHJhQ29sdW1uJyxcbiAgICAgICAgY2VsbDogcm93SW5kZXggPT4gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtZXh0cmEtY29sdW1uLWNlbGwgbm8tcm93LXNlbGVjdFwiPlxuICAgICAgICAgICAge2V4dHJhQ29sdW1uLnZhbHVlUmVuZGVyKGRhdGEuZ2V0KHJvd0luZGV4KSwgdGFiSW5kZXgpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApLFxuICAgICAgICBjZWxsRWRpdDogcm93SW5kZXggPT4gKGV4dHJhQ29sdW1uLmNlbGxFZGl0ID8gZXh0cmFDb2x1bW4uY2VsbEVkaXQocm93SW5kZXgpIDogbnVsbCksXG4gICAgICAgIGNlbGxDcmVhdGU6IHJvd0luZGV4ID0+IChleHRyYUNvbHVtbi5jZWxsQ3JlYXRlID8gZXh0cmFDb2x1bW4uY2VsbENyZWF0ZShyb3dJbmRleCkgOiBudWxsKSxcbiAgICAgICAgY2VsbEZpbHRlcjogcm93SW5kZXggPT4gKGV4dHJhQ29sdW1uLmNlbGxGaWx0ZXIgPyBleHRyYUNvbHVtbi5jZWxsRmlsdGVyKHJvd0luZGV4KSA6IG51bGwpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHJvd1NlbGVjdENoZWNrYm94Q29sdW1uKSB7XG4gICAgICBjb2x1bW5zLnB1c2goe1xuICAgICAgICB3aWR0aDogNDAsXG4gICAgICAgIGlzUmVzaXphYmxlOiBmYWxzZSxcbiAgICAgICAgaXNTb3J0YWJsZTogZmFsc2UsXG4gICAgICAgIGNvbHVtbktleTogJ3NlbGVjdGlvbkNoZWNrYm94JyxcbiAgICAgICAgaGVhZGVyOiAoXG4gICAgICAgICAgc2hvd1NlbGVjdEFsbENoZWNrYm94ICYmXG4gICAgICAgICAgPENoZWNrYm94XG4gICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRTZWxlY3RBbGxDaGVja0JveC0ke2dyaWQuaWR9YH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLXNlbGVjdC1hbGwtY2hlY2tib3gtY2VsbCBuby1yb3ctc2VsZWN0XCJcbiAgICAgICAgICAgIGNoZWNrZWQ9e2RhdGEuc2l6ZSAhPT0gMCAmJiBkYXRhLnNpemUgPT09IHNlbGVjdGVkSXRlbXMuc2l6ZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVNlbGVjdEFsbENoZWNrQm94T25DaGFuZ2V9XG4gICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSxcbiAgICAgICAgY2VsbDogKHJvd0luZGV4KSA9PiB7XG4gICAgICAgICAgY29uc3Qgcm93SXRlbSA9IGRhdGEuZ2V0KHJvd0luZGV4KTtcbiAgICAgICAgICBjb25zdCBpdGVtSWQgPSByb3dJdGVtLmdldEluKGdyaWQuaWRLZXlQYXRoKTtcbiAgICAgICAgICBjb25zdCBzZWxlY3RlZCA9IHNlbGVjdGVkSXRlbXMuaW5jbHVkZXMoaXRlbUlkKTtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPENoZWNrYm94XG4gICAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZFNlbGVjdENoZWNrQm94LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke3Jvd0luZGV4fWB9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLXNlbGVjdC1jaGVja2JveC1jZWxsIG5vLXJvdy1zZWxlY3RcIlxuICAgICAgICAgICAgICBjaGVja2VkPXtzZWxlY3RlZH1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlU2VsZWN0aW9uQ2hlY2tCb3hPbkNoYW5nZShyb3dJbmRleCl9XG4gICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgY2VsbEVkaXQ6ICgpID0+IG51bGwsXG4gICAgICAgIGNlbGxDcmVhdGU6ICgpID0+IG51bGwsXG4gICAgICAgIGNlbGxGaWx0ZXI6ICgpID0+IG51bGwsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCB2aXNpYmxlQ29sdW1ucyA9IFtdO1xuICAgIHRoaXMucHJvcHMudmlzaWJsZUNvbHVtbnMuZm9yRWFjaCgodmlzaWJsZUNvbHVtbktleSkgPT4ge1xuICAgICAgdGhpcy5wcm9wcy5jb2x1bW5zLmZvckVhY2goKG9yZ0NvbCkgPT4ge1xuICAgICAgICBpZiAoVXRpbHMuZ2V0Q29sdW1uS2V5KG9yZ0NvbCkgPT09IHZpc2libGVDb2x1bW5LZXkpIHtcbiAgICAgICAgICB2aXNpYmxlQ29sdW1ucy5wdXNoKG9yZ0NvbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHZpc2libGVDb2x1bW5zLmZvckVhY2goKGNvbCkgPT4ge1xuICAgICAgY29uc3QgdmFsdWVFbXB0eUNoZWNrZXIgPSBVdGlscy5nZXRWYWx1ZUVtcHR5Q2hlY2tlcihjb2wpO1xuICAgICAgLy8gQ2VsbCB2YWx1ZSByZW5kZXJpbmdcbiAgICAgIGNvbnN0IHZhbHVlUmVuZGVyID0gKHJvd0luZGV4LCBmb3JtYXQpID0+IHtcbiAgICAgICAgY29uc3QgdmFsID0gZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbCkpIHtcbiAgICAgICAgICByZXR1cm4gY29sLmlzUmVxdWlyZWQgPyA8TSBpZD1cIkdyaWQuVmFsdWVJc01pc3NpbmdcIiAvPiA6ICcnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3JtYXQgPyBmb3JtYXQodmFsKSA6IHZhbDtcbiAgICAgIH07XG5cbiAgICAgIGxldCBjb2x1bW4gPSBHcmlkQ29sdW1uU2VydmljZS5iYXNlQ29sdW1uKGNvbCk7XG4gICAgICAvLyBDb2xsZWN0IGNvbHVtbiBmdW5jdGlvbnMgaW50byBvbmUgT2JqZWN0XG4gICAgICBjb25zdCBjb2x1bW5GdW5jdGlvbnMgPSB7XG4gICAgICAgIGVkaXQ6IHtcbiAgICAgICAgICBnZXRJdGVtVmFsdWU6IHRoaXMuZ2V0RWRpdEl0ZW1WYWx1ZSxcbiAgICAgICAgICBvbkNlbGxWYWx1ZUNoYW5nZTogdGhpcy5vbkVkaXRDZWxsVmFsdWVDaGFuZ2UsXG4gICAgICAgICAgb25DZWxsQmx1cjogdGhpcy5vbkVkaXRDZWxsQmx1cixcbiAgICAgICAgICBvbkNlbGxGb2N1czogdGhpcy5vbkNlbGxGb2N1cyxcbiAgICAgICAgICBvbkNlbGxLZXlEb3duOiB0aGlzLm9uRWRpdENlbGxLZXlEb3duLFxuICAgICAgICAgIGhhbmRsZUNlbGxSZWY6IHRoaXMuaGFuZGxlRWRpdENlbGxSZWYsXG4gICAgICAgIH0sXG4gICAgICAgIGNyZWF0ZToge1xuICAgICAgICAgIGdldEl0ZW1WYWx1ZTogdGhpcy5nZXRDcmVhdGVJdGVtVmFsdWUsXG4gICAgICAgICAgb25DZWxsVmFsdWVDaGFuZ2U6IHRoaXMub25DcmVhdGVDZWxsVmFsdWVDaGFuZ2UsXG4gICAgICAgICAgb25DZWxsQmx1cjogdGhpcy5vbkNyZWF0ZUNlbGxCbHVyLFxuICAgICAgICAgIG9uQ2VsbEZvY3VzOiB0aGlzLm9uQ2VsbEZvY3VzLFxuICAgICAgICAgIG9uQ2VsbEtleURvd246IHRoaXMub25DcmVhdGVDZWxsS2V5RG93bixcbiAgICAgICAgICBoYW5kbGVDZWxsUmVmOiB0aGlzLmhhbmRsZUNyZWF0ZUNlbGxSZWYsXG4gICAgICAgIH0sXG4gICAgICAgIGZpbHRlcjoge1xuICAgICAgICAgIGdldEl0ZW1WYWx1ZTogdGhpcy5nZXRGaWx0ZXJJdGVtVmFsdWUsXG4gICAgICAgICAgb25DZWxsVmFsdWVDaGFuZ2U6IHRoaXMub25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UsXG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICAvLyBoYW5kbGUgY29sdW1uLmNlbGwgLyBjb2x1bW4uY2VsbEVkaXQgLyBjb2x1bW4uY2VsbENyZWF0ZSAvIGNvbHVtbi5jZWxsRmlsdGVyXG4gICAgICBjb25zdCBjZWxsUHJvcHMgPSB7XG4gICAgICAgIGRhdGEsXG4gICAgICAgIGRhdGVGb3JtYXQsXG4gICAgICAgIHRob3VzYW5kU2VwYXJhdG9yLFxuICAgICAgICBkZWNpbWFsU2VwYXJhdG9yLFxuICAgICAgfTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgY29sdW1uID0gR3JpZENvbHVtblNlcnZpY2UuY29sdW1uQ2VsbChjb2x1bW4sIGNlbGxQcm9wcywgY29sLCB2YWx1ZVJlbmRlcik7XG5cbiAgICAgIC8vIGhhbmRsZSBjb2x1bW5Db21wb25lbnRUeXBlc1xuICAgICAgY29uc3QgY29tcG9uZW50VHlwZVByb3BzID0ge1xuICAgICAgICAuLi5jZWxsUHJvcHMsXG4gICAgICAgIGdyaWQsXG4gICAgICAgIGlubGluZUVkaXQsXG4gICAgICAgIGZpbHRlcmluZyxcbiAgICAgICAgcmVnaW9uLFxuICAgICAgICBpbnRsLFxuICAgICAgICBzZWxlY3RDb21wb25lbnRPcHRpb25zLFxuICAgICAgfTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgY29sdW1uID0gR3JpZENvbHVtblNlcnZpY2UuY29sdW1uQ29tcG9uZW50VHlwZShcbiAgICAgICAgY29sdW1uLFxuICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgY29tcG9uZW50VHlwZVByb3BzLFxuICAgICAgICBjb2wsXG4gICAgICAgIGNvbHVtbkZ1bmN0aW9ucyxcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlLFxuICAgICAgKTtcbiAgICAgIGNvbHVtbnMucHVzaChjb2x1bW4pO1xuICAgIH0pO1xuXG4gICAgaWYgKGlzQ3JlYXRpbmcpIHtcbiAgICAgIGNvbHVtbnMucHVzaCh7XG4gICAgICAgIHdpZHRoOiAzNyxcbiAgICAgICAgaXNSZXNpemFibGU6IGZhbHNlLFxuICAgICAgICBjb2x1bW5LZXk6ICdyZW1vdmVOZXdJdGVtJyxcbiAgICAgICAgY2VsbDogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbEVkaXQ6ICgpID0+IG51bGwsXG4gICAgICAgIGNlbGxDcmVhdGU6IHJvd0luZGV4ID0+IChcbiAgICAgICAgICA8SWNvblxuICAgICAgICAgICAgaWQ9e2BvYy1kYXRhZ3JpZC1uZXctaXRlbS1yZW1vdmUtJHtncmlkLmlkfS0ke3Jvd0luZGV4fWB9XG4gICAgICAgICAgICB0eXBlPVwiaW5kaWNhdG9yXCJcbiAgICAgICAgICAgIG5hbWU9XCJkZWxldGVcIlxuICAgICAgICAgICAgd2lkdGg9ezMwfVxuICAgICAgICAgICAgaGVpZ2h0PXszMH1cbiAgICAgICAgICAgIHN0eWxlPXt7IHBhZGRpbmc6ICc3cHgnIH19XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0aGlzLnByb3BzLnJlbW92ZU5ld0l0ZW0oZ3JpZCwgcm93SW5kZXgpfVxuICAgICAgICAgIC8+XG4gICAgICAgICksXG4gICAgICAgIGNlbGxGaWx0ZXI6ICgpID0+IG51bGwsXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbHVtbnM7XG4gIH07XG5cbiAgaXNDZWxsRWRpdGVkID0gKHJvd0luZGV4LCBjb2wsIGNlbGxUeXBlKSA9PiB7XG4gICAgaWYgKGNlbGxUeXBlICE9PSAnZWRpdCcpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgaWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgIHJldHVybiAhIXRoaXMucHJvcHMuZWRpdERhdGEuZ2V0SW4oW2lkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gIH07XG5cbiAgaGFuZGxlQWZ0ZXJBZGRJdGVtID0gKCkgPT4ge1xuICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgPSB0cnVlO1xuICB9O1xuXG4gIGhhbmRsZUFmdGVyRWRpdFByZXNzID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuc2l6ZSkge1xuICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSB0cnVlO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGN1cnJlbnRSb3c6IHVuZGVmaW5lZCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVBZnRlclZhbGlkYXRpb25FcnJvciA9ICgpID0+IHtcbiAgICB0aGlzLmZvY3VzVG9FcnJvckNlbGwgPSB0cnVlO1xuICB9O1xuXG4gIGhhbmRsZVJvd0NsaWNrID0gKGUsIHJvd0luZGV4KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMucm93U2VsZWN0ICYmICF0aGlzLnByb3BzLmlzQ3JlYXRpbmcgJiYgIXRoaXMucHJvcHMuaXNFZGl0aW5nKSB7XG4gICAgICBpZiAoZS5jdHJsS2V5IHx8IGUuc2hpZnRLZXkpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0U2VsZWN0aW9uKClcbiAgICAgICAgICAucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICB9XG4gICAgICAvLyBEb24ndCB0cmlnZ2VyIHNlbGVjdGlvbiBjaGFuZ2Ugb24gd2hlbiB1c2VyIGNsaWNrcyBvbiBzcGVjaWFsIGNlbGxzIGxpa2UgY2hlY2tib3gvZXh0cmFcbiAgICAgIC8vIENoZWNrIHRoYXQgY2xpY2tlZCBub2RlJ3MgcGFyZW50IG9yIHBhcmVudCdzIHBhcmVudCBkb2Vzbid0IGhhdmUgbm8tcm93LXNlbGVjdCBjbGFzc1xuICAgICAgY29uc3QgeyBwYXJlbnROb2RlIH0gPSBlLnRhcmdldDtcbiAgICAgIGNvbnN0IHBhcmVudDFjbGFzcyA9IHBhcmVudE5vZGUuY2xhc3NOYW1lICYmIHBhcmVudE5vZGUuY2xhc3NOYW1lLmluZGV4T2ZcbiAgICAgICAgPyBwYXJlbnROb2RlLmNsYXNzTmFtZVxuICAgICAgICA6ICcnO1xuICAgICAgY29uc3QgcGFyZW50MmNsYXNzID0gcGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZSAmJiBwYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lLmluZGV4T2YgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICA/IHBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWVcbiAgICAgICAgOiAnJztcbiAgICAgIGNvbnN0IHBhcmVudDNjbGFzcyA9IHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZSAmJiBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUuaW5kZXhPZiAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgID8gcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgIDogJyc7XG4gICAgICBjb25zdCBwYXJlbnQ0Y2xhc3MgPSBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZSAmJiBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZS5pbmRleE9mIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgPyBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZVxuICAgICAgICA6ICcnO1xuICAgICAgaWYgKFxuICAgICAgICBwYXJlbnQxY2xhc3MuaW5kZXhPZignbm8tcm93LXNlbGVjdCcpID09PSAtMSAmJlxuICAgICAgICBwYXJlbnQyY2xhc3MuaW5kZXhPZignbm8tcm93LXNlbGVjdCcpID09PSAtMSAmJlxuICAgICAgICBwYXJlbnQzY2xhc3MuaW5kZXhPZignbm8tcm93LXNlbGVjdCcpID09PSAtMSAmJlxuICAgICAgICBwYXJlbnQ0Y2xhc3MuaW5kZXhPZignbm8tcm93LXNlbGVjdCcpID09PSAtMVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMucHJvcHMuaXRlbVNlbGVjdGlvbkNoYW5nZShcbiAgICAgICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgdGhpcy5wcm9wcy5tdWx0aVNlbGVjdCAmJiBlLmN0cmxLZXksXG4gICAgICAgICAgdGhpcy5wcm9wcy5tdWx0aVNlbGVjdCAmJiBlLnNoaWZ0S2V5LFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5vblJvd0NsaWNrKSB7XG4gICAgICB0aGlzLnByb3BzLm9uUm93Q2xpY2soZSwgcm93SW5kZXgsIHRoaXMucHJvcHMuZGF0YS5nZXQocm93SW5kZXgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgaGFuZGxlQ29udGV4dE1lbnUgPSAoZSwgcm93SW5kZXgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5jb250ZXh0TWVudUl0ZW1zKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGl0ZW1TZWxlY3Rpb25DaGFuZ2UsXG4gICAgICAgIHNlbGVjdGVkSXRlbXMsXG4gICAgICAgIGdyaWQsXG4gICAgICAgIGRhdGEsXG4gICAgICB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY29udGV4dE1lbnVPcGVuOiB0cnVlLFxuICAgICAgICBjb250ZXh0TWVudVg6IGUuY2xpZW50WCxcbiAgICAgICAgY29udGV4dE1lbnVZOiBlLmNsaWVudFksXG4gICAgICB9KTtcbiAgICAgIC8vIElmIGNsaWNrZWQgaXRlbSBpcyBub3Qgc2VsZWN0ZWQsIGNoYW5nZSBzZWxlY3Rpb24gdG8gaXRcbiAgICAgIGlmICghc2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhkYXRhLmdldEluKFtyb3dJbmRleCwgLi4uZ3JpZC5pZEtleVBhdGhdKSkpIHtcbiAgICAgICAgaXRlbVNlbGVjdGlvbkNoYW5nZShncmlkLCByb3dJbmRleCk7XG4gICAgICB9XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25Eb2N1bWVudENsaWNrKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgaGFuZGxlQ29udGV4dE1lbnVJdGVtQ2xpY2sgPSAob25DbGljaywgc2VsZWN0ZWRJdGVtcywgc2VsZWN0ZWREYXRhKSA9PiAoKSA9PiB7XG4gICAgb25DbGljayhzZWxlY3RlZEl0ZW1zLCBzZWxlY3RlZERhdGEpO1xuICB9O1xuXG4gIGhhbmRsZVJvd0hlaWdodEdldHRlciA9IHJvd0luZGV4ID0+XG4gICAgdGhpcy5wcm9wcy5yb3dIZWlnaHRHZXR0ZXIodGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCksIHJvd0luZGV4KTtcblxuICByZW5kZXJDZWxsID0gY29sID0+IChjZWxsUHJvcHMpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBpc0NyZWF0aW5nLFxuICAgICAgaXNFZGl0aW5nLFxuICAgICAgY3JlYXRlRGF0YSxcbiAgICAgIHNlbGVjdGVkQ2VsbCxcbiAgICAgIGdyaWQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyByb3dJbmRleCwgLi4ucHJvcHMgfSA9IGNlbGxQcm9wcztcbiAgICBsZXQgY2VsbDtcbiAgICBsZXQgY2VsbFR5cGUgPSAndmlldyc7XG4gICAgbGV0IGV4dHJhUm93Q291bnQgPSAwOyAvLyBob3cgbWFueSByb3dzIHRvIGlnbm9yZSBmcm9tIHRvcCwgbmV3ICsgZmlsdGVyIHJvd3NcbiAgICBpZiAoaXNDcmVhdGluZykgZXh0cmFSb3dDb3VudCA9IGNyZWF0ZURhdGEuc2l6ZTtcbiAgICBjb25zdCBleGlzdGluZ1Jvd3NJbmRleCA9IHJvd0luZGV4IC0gZXh0cmFSb3dDb3VudDtcbiAgICBpZiAoaXNDcmVhdGluZykge1xuICAgICAgaWYgKHJvd0luZGV4IDw9IChleHRyYVJvd0NvdW50IC0gMSkpIHtcbiAgICAgICAgaWYgKGNvbC5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY2VsbCA9IGNvbC5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNyZWF0ZUNlbGxSZWYocm93SW5kZXgsIGNvbCksXG4gICAgICAgICAgICB0aGlzLm9uQ3JlYXRlQ2VsbEtleURvd24ocm93SW5kZXgsIGNvbCksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjZWxsVHlwZSA9ICdjcmVhdGUnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNlbGwgPSBudWxsO1xuICAgICAgICAgIGNlbGxUeXBlID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2VsbCA9IGNvbC5jZWxsKFxuICAgICAgICAgIGV4aXN0aW5nUm93c0luZGV4LFxuICAgICAgICAgIHRoaXMuaGFuZGxlQ3JlYXRlQ2VsbFJlZihleGlzdGluZ1Jvd3NJbmRleCwgY29sKSxcbiAgICAgICAgICB0aGlzLm9uQ3JlYXRlQ2VsbEtleURvd24oZXhpc3RpbmdSb3dzSW5kZXgsIGNvbCksXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc0VkaXRpbmcgJiYgY29sLmNlbGxFZGl0KSB7XG4gICAgICBjZWxsID0gY29sLmNlbGxFZGl0KFxuICAgICAgICBleGlzdGluZ1Jvd3NJbmRleCxcbiAgICAgICAgdGhpcy5oYW5kbGVFZGl0Q2VsbFJlZihleGlzdGluZ1Jvd3NJbmRleCwgY29sKSxcbiAgICAgICAgdGhpcy5vbkVkaXRDZWxsS2V5RG93bihleGlzdGluZ1Jvd3NJbmRleCwgY29sKSxcbiAgICAgICk7XG4gICAgICBjZWxsVHlwZSA9ICdlZGl0JztcbiAgICB9IGVsc2Uge1xuICAgICAgY2VsbCA9IGNvbC5jZWxsKFxuICAgICAgICBleGlzdGluZ1Jvd3NJbmRleCxcbiAgICAgICAgdGhpcy5oYW5kbGVFZGl0Q2VsbFJlZihleGlzdGluZ1Jvd3NJbmRleCwgY29sKSxcbiAgICAgICAgdGhpcy5vbkVkaXRDZWxsS2V5RG93bihleGlzdGluZ1Jvd3NJbmRleCwgY29sKSxcbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnN0IGlzU3BlY2lhbCA9IHByb3BzLmNvbHVtbktleSA9PT0gJ3NlbGVjdGlvbkNoZWNrYm94JyB8fCBwcm9wcy5jb2x1bW5LZXkgPT09ICdleHRyYUNvbHVtbic7XG4gICAgaWYgKChjZWxsVHlwZSA9PT0gJ3ZpZXcnIHx8IGNlbGxUeXBlID09PSAnZWRpdCcgfHwgY2VsbFR5cGUgPT09ICdjcmVhdGUnKSAmJiAhaXNTcGVjaWFsKSB7XG4gICAgICBjb25zdCBnZXRSb3dJbmRleCA9IChjZWxsVHlwZSA9PT0gJ2NyZWF0ZScpID8gcm93SW5kZXggOiAocm93SW5kZXggLSBleHRyYVJvd0NvdW50KTtcbiAgICAgIGNvbnN0IG1lc3NhZ2VEYXRhID0gdGhpcy5nZXRDZWxsTWVzc2FnZXMoZ2V0Um93SW5kZXgsIGNvbCwgY2VsbFR5cGUpO1xuICAgICAgY29uc3QgaXNFZGl0ZWQgPSB0aGlzLmlzQ2VsbEVkaXRlZChnZXRSb3dJbmRleCwgY29sLCBjZWxsVHlwZSk7XG4gICAgICBjb25zdCBjbGFzc05hbWUgPSAoc2VsZWN0ZWRDZWxsLmdldCgncm93SW5kZXgnKSA9PT0gcm93SW5kZXggJiYgc2VsZWN0ZWRDZWxsLmdldCgnY29sdW1uS2V5JykgPT09IHByb3BzLmNvbHVtbktleSkgP1xuICAgICAgICAnb2MtZGF0YWdyaWQtY2VsbCBpcy1zZWxlY3RlZCcgOiAnb2MtZGF0YWdyaWQtY2VsbCc7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Q2VsbFxuICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgICAgICBzdHlsZT17Y29sLnN0eWxlfVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2VsbFNlbGVjdChjZWxsVHlwZSwgcm93SW5kZXgsIHByb3BzLmNvbHVtbktleSl9XG4gICAgICAgID5cbiAgICAgICAgICA8Q2VsbFRvb2x0aXBcbiAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZENlbGwtJHtncmlkLmlkfS0ke3Byb3BzLmNvbHVtbktleX0tJHtyb3dJbmRleH1gfVxuICAgICAgICAgICAgaXNFZGl0ZWQ9e2lzRWRpdGVkfVxuICAgICAgICAgICAgaXNFcnJvcj17ISFtZXNzYWdlRGF0YS5lcnJvck1lc3NhZ2V9XG4gICAgICAgICAgICBpc1dhcm5pbmc9eyEhbWVzc2FnZURhdGEud2FybmluZ01lc3NhZ2V9XG4gICAgICAgICAgICBpbmZvTWVzc2FnZT17bWVzc2FnZURhdGEuaW5mb01lc3NhZ2V9XG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U9e21lc3NhZ2VEYXRhLmVycm9yTWVzc2FnZX1cbiAgICAgICAgICAgIHdhcm5pbmdNZXNzYWdlPXttZXNzYWdlRGF0YS53YXJuaW5nTWVzc2FnZX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7Y2VsbH1cbiAgICAgICAgICA8L0NlbGxUb29sdGlwPlxuICAgICAgICA8L0NlbGw+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPENlbGwgey4uLnByb3BzfSBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1jZWxsXCIgc3R5bGU9e2NvbC5zdHlsZX0+e2NlbGx9PC9DZWxsPlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyQ29sdW1ucyA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBhbGxEYXRhU2l6ZSxcbiAgICAgIGdyaWQsXG4gICAgICBpc0NyZWF0aW5nLFxuICAgICAgaXNCdXN5LFxuICAgICAgdmlzaWJsZUNvbHVtbnMsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFhbGxEYXRhU2l6ZSAmJiAhaXNCdXN5ICYmICFpc0NyZWF0aW5nICYmICFncmlkLnBhZ2luYXRpb24pIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxDb2x1bW5cbiAgICAgICAgICBjb2x1bW5LZXk9XCJkYXRhRW1wdHlDb2x1bW5cIlxuICAgICAgICAgIGhlYWRlcj17PENlbGwgc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJyB9fT48TSBpZD1cIkdyaWQuTm9JdGVtc1wiIC8+PC9DZWxsPn1cbiAgICAgICAgICB3aWR0aD17MTB9XG4gICAgICAgICAgaXNSZXNpemFibGU9e2ZhbHNlfVxuICAgICAgICAgIGZsZXhHcm93PXsxfVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKCF2aXNpYmxlQ29sdW1ucy5zaXplKSB7XG4gICAgICBpZiAoaXNCdXN5KSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPENvbHVtblxuICAgICAgICAgICAgY29sdW1uS2V5PVwiZGF0YUVtcHR5Q29sdW1uXCJcbiAgICAgICAgICAgIGhlYWRlcj17PENlbGw+Jm5ic3A7PC9DZWxsPn1cbiAgICAgICAgICAgIHdpZHRoPXsxMH1cbiAgICAgICAgICAgIGlzUmVzaXphYmxlPXtmYWxzZX1cbiAgICAgICAgICAgIGZsZXhHcm93PXsxfVxuICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Q29sdW1uXG4gICAgICAgICAgY29sdW1uS2V5PVwiZGF0YUVtcHR5Q29sdW1uXCJcbiAgICAgICAgICBoZWFkZXI9ezxDZWxsIHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicgfX0+PE0gaWQ9XCJHcmlkLk5vQ29sdW1uc1wiIC8+PC9DZWxsPn1cbiAgICAgICAgICB3aWR0aD17MTB9XG4gICAgICAgICAgaXNSZXNpemFibGU9e2ZhbHNlfVxuICAgICAgICAgIGZsZXhHcm93PXsxfVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3QgY29sdW1ucyA9IHRoaXMuZ2VuZXJhdGVDb2x1bW5zKCk7XG4gICAgaWYgKGNvbHVtbnMubGVuZ2h0ID09PSAwKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gY29sdW1ucy5tYXAoY29sID0+IChcbiAgICAgIDxDb2x1bW5cbiAgICAgICAga2V5PXtjb2wuY29sdW1uS2V5fVxuICAgICAgICBjb2x1bW5LZXk9e2NvbC5jb2x1bW5LZXl9XG4gICAgICAgIGhlYWRlcj17XG4gICAgICAgICAgPEhlYWRlckNlbGxcbiAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZEhlYWRlci0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2wuY29sdW1uS2V5fWB9XG4gICAgICAgICAgICBncmlkPXt0aGlzLnByb3BzLmdyaWR9XG4gICAgICAgICAgICBjb2x1bW5zPXt0aGlzLnByb3BzLmNvbHVtbnN9XG4gICAgICAgICAgICBjb2x1bW49e2NvbH1cbiAgICAgICAgICAgIGN1cnJlbnRTb3J0Q29sdW1uPXt0aGlzLnByb3BzLnNvcnRDb2x1bW59XG4gICAgICAgICAgICBjdXJyZW50U29ydE9yZGVyPXt0aGlzLnByb3BzLnNvcnRPcmRlcn1cbiAgICAgICAgICAgIG9uU29ydENoYW5nZT17dGhpcy5wcm9wcy5zb3J0Q2hhbmdlfVxuICAgICAgICAgICAgaXNCdXN5PXt0aGlzLnByb3BzLmlzQnVzeX1cbiAgICAgICAgICAgIGZpbHRlcmluZz17dGhpcy5wcm9wcy5pc0ZpbHRlcmluZ31cbiAgICAgICAgICAgIHdpZHRoPXt0aGlzLnByb3BzLmNvbHVtbldpZHRocy5nZXQoY29sLmNvbHVtbktleSwgY29sLndpZHRoKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7Y29sLmhlYWRlcn1cbiAgICAgICAgICA8L0hlYWRlckNlbGw+XG4gICAgICAgIH1cbiAgICAgICAgY2VsbD17dGhpcy5yZW5kZXJDZWxsKGNvbCl9XG4gICAgICAgIHdpZHRoPXt0aGlzLnByb3BzLmNvbHVtbldpZHRocy5nZXQoY29sLmNvbHVtbktleSwgY29sLndpZHRoKX1cbiAgICAgICAgbWluV2lkdGg9e2NvbC5taW5XaWR0aH1cbiAgICAgICAgbWF4V2lkdGg9e2NvbC5tYXhXaWR0aH1cbiAgICAgICAgaXNSZXNpemFibGU9e2NvbC5pc1Jlc2l6YWJsZX1cbiAgICAgICAgZmxleEdyb3c9e2NvbC5mbGV4R3JvdyA/IGNvbC5mbGV4R3JvdyA6IDB9XG4gICAgICAgIGZpeGVkPXtjb2wuZml4ZWR9XG4gICAgICAgIGZpeGVkUmlnaHQ9e2NvbC5maXhlZFJpZ2h0fVxuICAgICAgICBhbGxvd0NlbGxzUmVjeWNsaW5nPXtjb2wuYWxsb3dDZWxsc1JlY3ljbGluZ31cbiAgICAgIC8+KSk7XG4gIH07XG5cbiAgcmVuZGVyQ29udGV4dE1lbnUgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgY29udGV4dE1lbnVJdGVtcyxcbiAgICAgIGRhdGEsXG4gICAgICBncmlkLFxuICAgICAgc2VsZWN0ZWRJdGVtcyxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7XG4gICAgICBjb250ZXh0TWVudVgsXG4gICAgICBjb250ZXh0TWVudVksXG4gICAgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3Qgc3R5bGUgPSB7XG4gICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgICAgekluZGV4OiAxMDAwMCxcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgdG9wOiBgJHtjb250ZXh0TWVudVl9cHhgLFxuICAgICAgbGVmdDogYCR7Y29udGV4dE1lbnVYfXB4YCxcbiAgICB9O1xuICAgIGNvbnN0IHNlbGVjdGVkRGF0YSA9IGRhdGEuZmlsdGVyKGQgPT4gc2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhkLmdldEluKGdyaWQuaWRLZXlQYXRoKSkpO1xuICAgIHJldHVybiAoXG4gICAgICA8dWwgY2xhc3NOYW1lPVwiZHJvcGRvd24tbWVudSBvYy1kYXRhZ3JpZC1jb250ZXh0LW1lbnUgb3BlblwiIHN0eWxlPXtzdHlsZX0+XG4gICAgICAgIHtjb250ZXh0TWVudUl0ZW1zICYmIGNvbnRleHRNZW51SXRlbXMubWFwICYmIGNvbnRleHRNZW51SXRlbXMubWFwKChpdGVtLCBpKSA9PiB7XG4gICAgICAgICAgbGV0IHsgZGlzYWJsZWQgfSA9IGl0ZW07XG4gICAgICAgICAgaWYgKHR5cGVvZiBpdGVtLmRpc2FibGVkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBkaXNhYmxlZCA9IGl0ZW0uZGlzYWJsZWQoc2VsZWN0ZWRJdGVtcywgc2VsZWN0ZWREYXRhKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxNZW51SXRlbVxuICAgICAgICAgICAgICBrZXk9e2l9IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgICAgICAgaGVhZGVyPXtpdGVtLmhlYWRlcn1cbiAgICAgICAgICAgICAgZGl2aWRlcj17aXRlbS5kaXZpZGVyfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAgIHRpdGxlPXtpdGVtLnRpdGxlfVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoZGlzYWJsZWQgfHwgIWl0ZW0ub25DbGljaykgPyBudWxsIDogdGhpcy5oYW5kbGVDb250ZXh0TWVudUl0ZW1DbGljayhcbiAgICAgICAgICAgICAgICBpdGVtLm9uQ2xpY2ssXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRJdGVtcyxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZERhdGEsXG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtpdGVtLnZhbHVlfVxuICAgICAgICAgICAgPC9NZW51SXRlbT5cbiAgICAgICAgICApO1xuICAgICAgICB9KX1cbiAgICAgIDwvdWw+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgZ3JpZENsYXNzTmFtZSA9IGNsYXNzTmFtZXMoe1xuICAgICAgJ29jLWRhdGFncmlkLWNvbnRhaW5lcic6IHRydWUsXG4gICAgICAnd2l0aC1hY3Rpb25iYXInOiB0aGlzLnByb3BzLmlubGluZUVkaXQgJiYgIXRoaXMucHJvcHMuZGlzYWJsZUFjdGlvbkJhcixcbiAgICAgICdpcy1idXN5JzogdGhpcy5wcm9wcy5pc0J1c3ksXG4gICAgICAnaXMtZWRpdGluZyc6IHRoaXMucHJvcHMuaXNFZGl0aW5nLFxuICAgICAgJ2lzLWNyZWF0aW5nJzogdGhpcy5wcm9wcy5pc0NyZWF0aW5nLFxuICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICB9KTtcblxuICAgIC8vIGNoZWNrIGlmIHRoZXJlIGlzIGEgbmV3IHJlcXVlc3QgdG8gY2hhbmdlIGVkaXQgbW9kZSBmb2N1c1xuICAgIHRoaXMuc2V0Rm9jdXNUbyh0aGlzLnByb3BzLmZvY3VzVHlwZSk7XG5cbiAgICBsZXQgYWN0aW9uQmFyID0gbnVsbDtcbiAgICBsZXQgYWN0aW9uQmFyUmlnaHQgPSBudWxsO1xuICAgIGxldCBhY3Rpb25CYXJMZWZ0ID0gbnVsbDtcbiAgICBpZiAoXG4gICAgICAodGhpcy5wcm9wcy5hY3Rpb25CYXIgfHxcbiAgICAgICAgdGhpcy5wcm9wcy5pbmxpbmVFZGl0IHx8XG4gICAgICAgIHRoaXMucHJvcHMuZmlsdGVyaW5nIHx8XG4gICAgICAgIHRoaXMucHJvcHMucmVtb3ZpbmcpICYmXG4gICAgICAhdGhpcy5wcm9wcy5kaXNhYmxlQWN0aW9uQmFyXG4gICAgKSB7XG4gICAgICBhY3Rpb25CYXJSaWdodCA9IChcbiAgICAgICAgPEFjdGlvbkJhciBwb3NpdGlvbj1cInJpZ2h0XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1hY3Rpb25iYXItcmlnaHRcIj57dGhpcy5wcm9wcy5hY3Rpb25CYXJ9PC9kaXY+XG4gICAgICAgICAgeyh0aGlzLnByb3BzLmZpbHRlcmluZyAmJiB0aGlzLnByb3BzLmRpc2FibGVEcm9wZG93biAmJlxuICAgICAgICAgICAgIXRoaXMucHJvcHMuZGlzYWJsZUZpbHRlcmluZ0NvbnRyb2xzKSAmJiA8RmlsdGVyaW5nQ29udHJvbHMgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICAgfVxuICAgICAgICAgIHt0aGlzLnByb3BzLmlubGluZUVkaXQgJiZcbiAgICAgICAgICA8SW5saW5lRWRpdENvbnRyb2xzXG4gICAgICAgICAgICBhZnRlckFkZEl0ZW09e3RoaXMuaGFuZGxlQWZ0ZXJBZGRJdGVtfVxuICAgICAgICAgICAgYWZ0ZXJFZGl0UHJlc3M9e3RoaXMuaGFuZGxlQWZ0ZXJFZGl0UHJlc3N9XG4gICAgICAgICAgICBhZnRlclZhbGlkYXRpb25FcnJvcj17dGhpcy5oYW5kbGVBZnRlclZhbGlkYXRpb25FcnJvcn1cbiAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgfVxuICAgICAgICAgIHsodGhpcy5wcm9wcy5kcm9wZG93bk1lbnVJdGVtcyB8fFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5yZW1vdmluZyB8fFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5jb2x1bW5TZXR0aW5ncyB8fFxuICAgICAgICAgICAgKHRoaXMucHJvcHMuZmlsdGVyaW5nICYmXG4gICAgICAgICAgICAgICF0aGlzLnByb3BzLmRpc2FibGVEcm9wZG93bikpICYmIDxEcm9wZG93bkNvbnRyb2xzIHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICAgIH1cbiAgICAgICAgPC9BY3Rpb25CYXI+XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5hY3Rpb25CYXJMZWZ0IHx8IHRoaXMucHJvcHMuZ3JpZEhlYWRlcikge1xuICAgICAgYWN0aW9uQmFyTGVmdCA9IChcbiAgICAgICAgPEFjdGlvbkJhciBwb3NpdGlvbj1cImxlZnRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWdyaWRoZWFkZXJcIj57dGhpcy5wcm9wcy5ncmlkSGVhZGVyfTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtYWN0aW9uYmFyLWxlZnRcIj57dGhpcy5wcm9wcy5hY3Rpb25CYXJMZWZ0fTwvZGl2PlxuICAgICAgICA8L0FjdGlvbkJhcj5cbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChhY3Rpb25CYXJMZWZ0IHx8IGFjdGlvbkJhclJpZ2h0KSB7XG4gICAgICBhY3Rpb25CYXIgPSAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtYWN0aW9uYmFyLWNvbnRhaW5lclwiPlxuICAgICAgICAgIHthY3Rpb25CYXJMZWZ0fVxuICAgICAgICAgIHthY3Rpb25CYXJSaWdodH1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgICBsZXQgcm93c0NvdW50ID1cbiAgICAgICh0aGlzLnByb3BzLnJvd3NDb3VudCB8fCB0aGlzLnByb3BzLnJvd3NDb3VudCA9PT0gMCkgP1xuICAgICAgICB0aGlzLnByb3BzLnJvd3NDb3VudCA6XG4gICAgICAgIHRoaXMucHJvcHMuZGF0YS5zaXplO1xuICAgIGlmICh0aGlzLnByb3BzLmlzQ3JlYXRpbmcpIHJvd3NDb3VudCArPSB0aGlzLnByb3BzLmNyZWF0ZURhdGEuc2l6ZTtcbiAgICBpZiAoIXRoaXMucHJvcHMudmlzaWJsZUNvbHVtbnMuc2l6ZSkgcm93c0NvdW50ID0gMDtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD17YG9jLWRhdGFncmlkLSR7dGhpcy5wcm9wcy5ncmlkLmlkfWB9XG4gICAgICAgIGNsYXNzTmFtZT17Z3JpZENsYXNzTmFtZX1cbiAgICAgICAgc3R5bGU9e3RoaXMucHJvcHMuY29udGFpbmVyU3R5bGV9XG4gICAgICA+XG4gICAgICAgIHt0aGlzLnByb3BzLmlzQnVzeSAmJiA8U3Bpbm5lciAvPn1cbiAgICAgICAge3RoaXMuc3RhdGUuY29udGV4dE1lbnVPcGVuICYmIHRoaXMucmVuZGVyQ29udGV4dE1lbnUoKX1cbiAgICAgICAge2FjdGlvbkJhcn1cbiAgICAgICAgPFJlc3BvbnNpdmVGaXhlZERhdGFUYWJsZVxuICAgICAgICAgIGlkPXt0aGlzLnByb3BzLmdyaWQuaWR9XG4gICAgICAgICAgcm93c0NvdW50PXtyb3dzQ291bnR9XG4gICAgICAgICAgaGVhZGVySGVpZ2h0PXt0aGlzLnByb3BzLmlzRmlsdGVyaW5nID9cbiAgICAgICAgICAgIHRoaXMucHJvcHMuaGVhZGVySGVpZ2h0ICsgdGhpcy5wcm9wcy5maWx0ZXJSb3dIZWlnaHRcbiAgICAgICAgICAgIDogdGhpcy5wcm9wcy5oZWFkZXJIZWlnaHR9XG4gICAgICAgICAgcm93SGVpZ2h0PXt0aGlzLnByb3BzLnJvd0hlaWdodH1cbiAgICAgICAgICBvbkNvbHVtblJlc2l6ZUVuZENhbGxiYWNrPXt0aGlzLm9uQ29sdW1uUmVzaXplRW5kQ2FsbGJhY2t9XG4gICAgICAgICAgaXNDb2x1bW5SZXNpemluZz17ZmFsc2V9XG4gICAgICAgICAgb25Sb3dDbGljaz17dGhpcy5oYW5kbGVSb3dDbGlja31cbiAgICAgICAgICBzY3JvbGxUb0NvbHVtbj17dGhpcy5wcm9wcy5zY3JvbGxUb0NvbHVtbiB8fCB0aGlzLnN0YXRlLmN1cnJlbnRDb2x1bW59XG4gICAgICAgICAgc2Nyb2xsVG9wPXt0aGlzLnByb3BzLnNjcm9sbFRvcH1cbiAgICAgICAgICBzY3JvbGxUb1Jvdz17dGhpcy5nZXRTY3JvbGxUb1JvdygpfVxuICAgICAgICAgIG9uUm93RG91YmxlQ2xpY2s9e3RoaXMucHJvcHMub25Sb3dEb3VibGVDbGlja31cbiAgICAgICAgICBvblJvd01vdXNlRG93bj17dGhpcy5wcm9wcy5vbk1vdXNlRG93bn1cbiAgICAgICAgICBvblJvd01vdXNlRW50ZXI9e3RoaXMucHJvcHMub25Sb3dNb3VzZUVudGVyfVxuICAgICAgICAgIG9uUm93TW91c2VMZWF2ZT17dGhpcy5wcm9wcy5vblJvd01vdXNlTGVhdmV9XG4gICAgICAgICAgb25TY3JvbGxTdGFydD17dGhpcy5wcm9wcy5vblNjcm9sbFN0YXJ0fVxuICAgICAgICAgIG9uU2Nyb2xsRW5kPXt0aGlzLnByb3BzLm9uU2Nyb2xsRW5kfVxuICAgICAgICAgIHJvd0NsYXNzTmFtZUdldHRlcj17dGhpcy5nZXRSb3dDbGFzc05hbWV9XG4gICAgICAgICAgcm93SGVpZ2h0R2V0dGVyPXt0aGlzLnByb3BzLnJvd0hlaWdodEdldHRlciAmJiB0aGlzLmhhbmRsZVJvd0hlaWdodEdldHRlcn1cbiAgICAgICAgICBvbkNvbnRlbnRIZWlnaHRDaGFuZ2U9e3RoaXMucHJvcHMub25Db250ZW50SGVpZ2h0Q2hhbmdlfVxuICAgICAgICAgIG9uUm93Q29udGV4dE1lbnU9e3RoaXMuaGFuZGxlQ29udGV4dE1lbnV9XG4gICAgICAgID5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJDb2x1bW5zKCl9XG4gICAgICAgIDwvUmVzcG9uc2l2ZUZpeGVkRGF0YVRhYmxlPlxuICAgICAgICB7dGhpcy5wcm9wcy5pc0NvbHVtblNldHRpbmdzTW9kYWxPcGVuICYmXG4gICAgICAgIDxDb2x1bW5TZXR0aW5nc01vZGFsXG4gICAgICAgICAgZ3JpZD17dGhpcy5wcm9wcy5ncmlkfVxuICAgICAgICAgIGNvbHVtbnM9e3RoaXMucHJvcHMuY29sdW1uc31cbiAgICAgICAgICB2aXNpYmxlQ29sdW1ucz17dGhpcy5wcm9wcy52aXNpYmxlQ29sdW1uc31cbiAgICAgICAgICBjbG9zZUNvbHVtblNldHRpbmdzTW9kYWw9e3RoaXMucHJvcHMuY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsfVxuICAgICAgICAgIHNhdmVDb2x1bW5TZXR0aW5ncz17dGhpcy5wcm9wcy5zYXZlQ29sdW1uU2V0dGluZ3N9XG4gICAgICAgIC8+XG4gICAgICAgIH1cbiAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERhdGFHcmlkO1xuIl19