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
      if (currentCell && currentCell.selectRef) {
        proxy = currentCell;
        currentCell = currentCell.selectRef.select.inputRef;
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
              nextElement = nextElement.selectRef.select.inputRef;
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
              _nextElement = _nextElement.selectRef.select.inputRef;
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
                }
                disabled = _nextElement2 ? _nextElement2.disabled : false;
              }
              if (!disabled && _nextElement2) {
                if (_nextElement2.selectRef) _nextElement2 = _nextElement2.selectRef.select.inputRef;
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
      if (_this2.props.createData.size && _this2.props.createData.size === rowIndex + 1 && _this2.focusToCreateCell && !_this2.getComponentDisabledState(rowIndex, col, 'create')) {
        ref.focus();
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
      var _props4 = _this2.props,
          data = _props4.data,
          dateFormat = _props4.dateFormat,
          thousandSeparator = _props4.thousandSeparator,
          decimalSeparator = _props4.decimalSeparator,
          grid = _props4.grid,
          inlineEdit = _props4.inlineEdit,
          filtering = _props4.filtering,
          region = _props4.region,
          intl = _props4.intl,
          selectComponentOptions = _props4.selectComponentOptions;


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
    var _props7 = _this2.props,
        contextMenuItems = _props7.contextMenuItems,
        data = _props7.data,
        grid = _props7.grid,
        selectedItems = _props7.selectedItems;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbImRhdGFncmlkQWN0aW9ucyIsIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwib3duUHJvcHMiLCJHUklEIiwiZ3JpZCIsImlzQnVzeSIsImRhdGFncmlkIiwiZ2V0SW4iLCJpZCIsImlzRWRpdGluZyIsImlzQ3JlYXRpbmciLCJpc0ZpbHRlcmluZyIsImlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW4iLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwidmlzaWJsZUNvbHVtbnMiLCJjb2x1bW5XaWR0aHMiLCJzZWxlY3RlZENlbGwiLCJzZWxlY3RlZEl0ZW1zIiwiZGF0YSIsImVkaXREYXRhIiwiY3JlYXRlRGF0YSIsImZpbHRlckRhdGEiLCJjZWxsTWVzc2FnZXMiLCJjcmVhdGVDZWxsTWVzc2FnZXMiLCJhbGxEYXRhU2l6ZSIsInNpemUiLCJsYW5ndWFnZSIsIlV0aWxzIiwiZ2V0TGFuZ3VhZ2UiLCJ1c2VyIiwicmVnaW9uIiwiZ2V0UmVnaW9uIiwiZGF0ZUZvcm1hdCIsImdldERhdGVGb3JtYXQiLCJ0aG91c2FuZFNlcGFyYXRvciIsImdldFRob3VzYW5kU2VwYXJhdG9yIiwiZGVjaW1hbFNlcGFyYXRvciIsImdldERlY2ltYWxTZXBhcmF0b3IiLCJmb3JjZVJlZnJlc2hUaW1lc3RhbXAiLCJnZXQiLCJmb2N1c1R5cGUiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJEYXRhR3JpZCIsInBhZ2luYXRpb24iLCJpbmplY3RJbnRsIiwicHJvcHMiLCJjdXJyZW50Um93IiwiY3VycmVudENvbHVtbiIsImNvbnRleHRNZW51T3BlbiIsImNvbnRleHRNZW51WCIsImNvbnRleHRNZW51WSIsImNlbGxSZWZzIiwiY3JlYXRlQ2VsbFJlZnMiLCJmb2N1c1RvQ3JlYXRlQ2VsbCIsImZvY3VzVG9FZGl0Q2VsbCIsImZvY3VzVG9FcnJvckNlbGwiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImRvY3VtZW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIm9uRG9jdW1lbnRDbGljayIsImludmFsaWRhdGUiLCJyZW5kZXIiLCJncmlkQ2xhc3NOYW1lIiwiaW5saW5lRWRpdCIsImRpc2FibGVBY3Rpb25CYXIiLCJjbGFzc05hbWUiLCJzZXRGb2N1c1RvIiwiYWN0aW9uQmFyIiwiYWN0aW9uQmFyUmlnaHQiLCJhY3Rpb25CYXJMZWZ0IiwiZmlsdGVyaW5nIiwicmVtb3ZpbmciLCJkaXNhYmxlRHJvcGRvd24iLCJkaXNhYmxlRmlsdGVyaW5nQ29udHJvbHMiLCJoYW5kbGVBZnRlckFkZEl0ZW0iLCJoYW5kbGVBZnRlckVkaXRQcmVzcyIsImhhbmRsZUFmdGVyVmFsaWRhdGlvbkVycm9yIiwiZHJvcGRvd25NZW51SXRlbXMiLCJjb2x1bW5TZXR0aW5ncyIsImdyaWRIZWFkZXIiLCJyb3dzQ291bnQiLCJjb250YWluZXJTdHlsZSIsInJlbmRlckNvbnRleHRNZW51IiwiaGVhZGVySGVpZ2h0IiwiZmlsdGVyUm93SGVpZ2h0Iiwicm93SGVpZ2h0Iiwib25Db2x1bW5SZXNpemVFbmRDYWxsYmFjayIsImhhbmRsZVJvd0NsaWNrIiwic2Nyb2xsVG9Db2x1bW4iLCJzY3JvbGxUb3AiLCJnZXRTY3JvbGxUb1JvdyIsIm9uUm93RG91YmxlQ2xpY2siLCJvbk1vdXNlRG93biIsIm9uUm93TW91c2VFbnRlciIsIm9uUm93TW91c2VMZWF2ZSIsIm9uU2Nyb2xsU3RhcnQiLCJvblNjcm9sbEVuZCIsImdldFJvd0NsYXNzTmFtZSIsInJvd0hlaWdodEdldHRlciIsImhhbmRsZVJvd0hlaWdodEdldHRlciIsIm9uQ29udGVudEhlaWdodENoYW5nZSIsImhhbmRsZUNvbnRleHRNZW51IiwicmVuZGVyQ29sdW1ucyIsImNvbHVtbnMiLCJjbG9zZUNvbHVtblNldHRpbmdzTW9kYWwiLCJzYXZlQ29sdW1uU2V0dGluZ3MiLCJjaGlsZHJlbiIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyIsImNvbnRleHRNZW51SXRlbXMiLCJzZXRTdGF0ZSIsIm5ld0NvbHVtbldpZHRoIiwiY29sdW1uS2V5IiwicmVzaXplQ29sdW1uIiwib25DZWxsS2V5RG93biIsInJvd0luZGV4IiwiY29sIiwiZSIsImNyZWF0ZSIsImVuYWJsZUFycm93TmF2aWdhdGlvbiIsImFycm93S2V5cyIsIktFWV9DT0RFUyIsIkRPV04iLCJVUCIsIkxFRlQiLCJSSUdIVCIsIm9uTGFzdENlbGxUYWJQcmVzcyIsImdyaWRDb2x1bW5zIiwiZ2V0Q29sdW1uS2V5QnlJbmRleCIsImdldENvbHVtbktleSIsImkiLCJyb3dzU2l6ZSIsImN1cnJlbnRDZWxsIiwicHJveHkiLCJpc0N1cnNvckF0U3RhcnQiLCJ0eXBlIiwic2VsZWN0aW9uU3RhcnQiLCJpc0N1cnNvckF0RW5kIiwic2VsZWN0aW9uRW5kIiwidmFsdWUiLCJsZW5ndGgiLCJzZWxlY3RSZWYiLCJzZWxlY3QiLCJpbnB1dFJlZiIsImluY2x1ZGVzIiwia2V5Q29kZSIsInByZXZlbnREZWZhdWx0IiwiRU5URVIiLCJFU0MiLCJhZGROZXdJdGVtIiwiZ2V0Q29sdW1uRGVmYXVsdFZhbHVlcyIsIm5leHRFbGVtZW50IiwibWVudUlzT3BlbiIsIm1vdmVDZWxsRm9jdXMiLCJUQUIiLCJjb2x1bW5JbmQiLCJmaW5kSW5kZXgiLCJjIiwidmFsdWVLZXlQYXRoIiwiam9pbiIsImRpc2FibGVkIiwicm93SW5kIiwic2hpZnRLZXkiLCJvbkVkaXRDZWxsS2V5RG93biIsIm9uQ3JlYXRlQ2VsbEtleURvd24iLCJvbkZpbHRlckNlbGxWYWx1ZUNoYW5nZSIsInZhbHVlUGFyc2VyIiwiZXZlbnRPckRhdGEiLCJyYXdWYWx1ZSIsInRhcmdldCIsInVuZGVmaW5lZCIsImZpbHRlckNlbGxWYWx1ZUNoYW5nZSIsIm9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlIiwiY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlIiwib25DcmVhdGVWYWx1ZUNoYW5nZSIsIm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlIiwibWF0Y2hWYWx1ZSIsIm5ld1ZhbHVlS2V5UGF0aCIsInYiLCJuZXdWYWx1ZSIsInZhbGlkYXRvcnMiLCJjcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZSIsIm9uRWRpdENlbGxWYWx1ZUNoYW5nZSIsImRhdGFJZCIsImdldERhdGFJZEJ5Um93SW5kZXgiLCJlZGl0Q2VsbFZhbHVlQ2hhbmdlIiwib25FZGl0VmFsdWVDaGFuZ2UiLCJlZGl0Q2VsbFZhbHVlVmFsaWRhdGUiLCJvbkNyZWF0ZUNlbGxCbHVyIiwib25DcmVhdGVCbHVyIiwiZ2V0RWRpdEl0ZW1WYWx1ZSIsIm9uRWRpdENlbGxCbHVyIiwib25FZGl0Qmx1ciIsIm9uQ2VsbEZvY3VzIiwiY2VsbFR5cGUiLCJpbnB1dFR5cGUiLCJjZWxsU2VsZWN0aW9uQ2hhbmdlIiwiY2VsbFNlbGVjdCIsImlkS2V5UGF0aCIsImdldFNlbGVjdGVkSXRlbUluZGV4IiwiaW5kZXgiLCJvcHRpb25zIiwiZWRpdFZhbHVlIiwib3JpZ2luYWxWYWx1ZSIsImNvbXBvbmVudFR5cGUiLCJzZWxlY3RDb21wb25lbnRPcHRpb25zIiwiZmluZCIsIm9iaiIsIlN0cmluZyIsInJlcGxhY2UiLCJnZXRDcmVhdGVJdGVtVmFsdWUiLCJ2YWwiLCJnZXRGaWx0ZXJJdGVtVmFsdWUiLCJnZXRDb21wb25lbnREaXNhYmxlZFN0YXRlIiwibW9kZSIsImNvbXBvbmVudERpc2FibGVkIiwiZGlzYWJsZUVkaXRpbmciLCJkaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaCIsIm1hdGNoVmFsdWVLZXlQYXRoIiwicm93Q2xhc3NOYW1lcyIsImV4dHJhUm93Q291bnQiLCJwdXNoIiwiaW5kZXhPZiIsInJvd0NsYXNzTmFtZUdldHRlciIsImdldENlbGxNZXNzYWdlcyIsInJldHVybkRhdGEiLCJpbmZvTWVzc2FnZSIsImVycm9yTWVzc2FnZSIsIndhcm5pbmdNZXNzYWdlIiwic2Nyb2xsVG9Sb3ciLCJzY3JvbGxOZXdSb3ciLCJmaXJzdCIsImZvY3VzVG8iLCJwcmV2Rm9jdXNUbyIsImZvY3VzVG9MYXN0Um93IiwiaGFuZGxlQ2VsbFNlbGVjdCIsImhhbmRsZUNyZWF0ZUNlbGxSZWYiLCJyZWYiLCJmb2N1cyIsImhhbmRsZUVkaXRDZWxsUmVmIiwic2VsZWN0ZWRSb3dJbmRleCIsImNvbHVtbkluZGV4IiwiZWxlbWVudFR5cGVzIiwic2V0VGltZW91dCIsImhhbmRsZVNlbGVjdGlvbkNoZWNrQm94T25DaGFuZ2UiLCJpdGVtU2VsZWN0aW9uQ2hhbmdlIiwiZ2VuZXJhdGVDb2x1bW5zIiwiZXh0cmFDb2x1bW4iLCJ0YWJJbmRleCIsIndpZHRoIiwiaXNSZXNpemFibGUiLCJpc1NvcnRhYmxlIiwiY2VsbCIsInZhbHVlUmVuZGVyIiwiY2VsbEVkaXQiLCJjZWxsQ3JlYXRlIiwiY2VsbEZpbHRlciIsInJvd1NlbGVjdENoZWNrYm94Q29sdW1uIiwicm93SXRlbSIsIml0ZW1JZCIsInNlbGVjdGVkIiwiZm9yRWFjaCIsInZpc2libGVDb2x1bW5LZXkiLCJvcmdDb2wiLCJpbnRsIiwidmFsdWVFbXB0eUNoZWNrZXIiLCJnZXRWYWx1ZUVtcHR5Q2hlY2tlciIsImZvcm1hdCIsImlzUmVxdWlyZWQiLCJjb2x1bW4iLCJHcmlkQ29sdW1uU2VydmljZSIsImJhc2VDb2x1bW4iLCJjb2x1bW5GdW5jdGlvbnMiLCJlZGl0IiwiZ2V0SXRlbVZhbHVlIiwib25DZWxsVmFsdWVDaGFuZ2UiLCJvbkNlbGxCbHVyIiwiaGFuZGxlQ2VsbFJlZiIsImZpbHRlciIsImNlbGxQcm9wcyIsImNvbHVtbkNlbGwiLCJjb21wb25lbnRUeXBlUHJvcHMiLCJjb2x1bW5Db21wb25lbnRUeXBlIiwicGFkZGluZyIsInJlbW92ZU5ld0l0ZW0iLCJpc0NlbGxFZGl0ZWQiLCJyb3dTZWxlY3QiLCJjdHJsS2V5IiwiZ2V0U2VsZWN0aW9uIiwicmVtb3ZlQWxsUmFuZ2VzIiwicGFyZW50Tm9kZSIsInBhcmVudDFjbGFzcyIsInBhcmVudDJjbGFzcyIsInBhcmVudDNjbGFzcyIsInBhcmVudDRjbGFzcyIsIm11bHRpU2VsZWN0Iiwib25Sb3dDbGljayIsInN0b3BQcm9wYWdhdGlvbiIsImNsaWVudFgiLCJjbGllbnRZIiwiYWRkRXZlbnRMaXN0ZW5lciIsImhhbmRsZUNvbnRleHRNZW51SXRlbUNsaWNrIiwib25DbGljayIsInNlbGVjdGVkRGF0YSIsInJlbmRlckNlbGwiLCJpc1NwZWNpYWwiLCJnZXRSb3dJbmRleCIsIm1lc3NhZ2VEYXRhIiwiaXNFZGl0ZWQiLCJzdHlsZSIsInRleHRBbGlnbiIsImxlbmdodCIsIm1hcCIsInNvcnRDaGFuZ2UiLCJoZWFkZXIiLCJtaW5XaWR0aCIsIm1heFdpZHRoIiwiZmxleEdyb3ciLCJmaXhlZCIsImFsbG93Q2VsbHNSZWN5Y2xpbmciLCJkaXNwbGF5IiwiekluZGV4IiwicG9zaXRpb24iLCJ0b3AiLCJsZWZ0IiwiZCIsIml0ZW0iLCJkaXZpZGVyIiwidGl0bGUiXSwibWFwcGluZ3MiOiI7Ozs7OztvREFBQTs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFJQTs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7SUFBWUEsZTs7QUFDWjs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUMsa0JBQWtCLFNBQWxCQSxlQUFrQixDQUFDQyxLQUFELEVBQVFDLFFBQVIsRUFBcUI7QUFDM0MsTUFBTUMsT0FBT0QsU0FBU0UsSUFBdEI7QUFDQSxTQUFPO0FBQ0xDLFlBQVFKLE1BQU1LLFFBQU4sQ0FBZUMsS0FBZixDQUFxQixDQUFDSixLQUFLSyxFQUFOLEVBQVUsU0FBVixFQUFxQixRQUFyQixDQUFyQixFQUFxRCxJQUFyRCxDQURIO0FBRUxDLGVBQVdSLE1BQU1LLFFBQU4sQ0FBZUMsS0FBZixDQUFxQixDQUFDSixLQUFLSyxFQUFOLEVBQVUsU0FBVixFQUFxQixXQUFyQixDQUFyQixFQUF3RCxLQUF4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O0FBZ0JELE9BckI0QztBQUQvQyxLQURGO0FBMEJELEc7O2tCQXdIWWxHLFEiLCJmaWxlIjoiZGF0YWdyaWQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tbG9uZWx5LWlmLCBwcmVmZXItdGVtcGxhdGUsIHJlYWN0L3JlcXVpcmUtZGVmYXVsdC1wcm9wcyAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IE1hcCwgTGlzdCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHtcbiAgaW5qZWN0SW50bCxcbiAgRm9ybWF0dGVkTWVzc2FnZSBhcyBNLFxufSBmcm9tICdyZWFjdC1pbnRsJztcbmltcG9ydCB7IENvbHVtbiwgQ2VsbCB9IGZyb20gJ2ZpeGVkLWRhdGEtdGFibGUtMic7XG5pbXBvcnQgeyBNZW51SXRlbSB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IEljb24gfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1pY29ucyc7XG5pbXBvcnQgU3Bpbm5lciBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1zcGlubmVyJztcbmltcG9ydCBDaGVja2JveCBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1jaGVja2JveCc7XG5pbXBvcnQgJ2ZpeGVkLWRhdGEtdGFibGUtMi9kaXN0L2ZpeGVkLWRhdGEtdGFibGUuY3NzJztcblxuaW1wb3J0IFJlc3BvbnNpdmVGaXhlZERhdGFUYWJsZSBmcm9tICcuL3Jlc3BvbnNpdmUtZml4ZWQtZGF0YS10YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IEhlYWRlckNlbGwgZnJvbSAnLi9oZWFkZXItY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IEFjdGlvbkJhciBmcm9tICcuL2FjdGlvbi1iYXIuY29tcG9uZW50JztcbmltcG9ydCBJbmxpbmVFZGl0Q29udHJvbHMgZnJvbSAnLi9pbmxpbmUtZWRpdC1jb250cm9scy5jb21wb25lbnQnO1xuaW1wb3J0IEZpbHRlcmluZ0NvbnRyb2xzIGZyb20gJy4vZmlsdGVyaW5nLWNvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgRHJvcGRvd25Db250cm9scyBmcm9tICcuL2Ryb3Bkb3duLWNvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgKiBhcyBkYXRhZ3JpZEFjdGlvbnMgZnJvbSAnLi9kYXRhZ3JpZC5hY3Rpb25zJztcbmltcG9ydCBDZWxsVG9vbHRpcCBmcm9tICcuL2NlbGwtdG9vbHRpcC5jb21wb25lbnQnO1xuaW1wb3J0IENvbHVtblNldHRpbmdzTW9kYWwgZnJvbSAnLi9jb2x1bW4tc2V0dGluZ3MvY29sdW1uLXNldHRpbmdzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBwcm9wVHlwZXMsIGRlZmF1bHRQcm9wcyB9IGZyb20gJy4vZGF0YWdyaWQucHJvcHMnO1xuaW1wb3J0IHsgS0VZX0NPREVTIH0gZnJvbSAnLi9kYXRhZ3JpZC5jb25zdGFudHMnO1xuaW1wb3J0IHBhZ2luYXRpb24gZnJvbSAnLi9wYWdpbmF0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9kYXRhZ3JpZC51dGlscyc7XG5pbXBvcnQgR3JpZENvbHVtblNlcnZpY2UgZnJvbSAnLi9jb2x1bW4tc2VydmljZS9jb2x1bW4tc2VydmljZSc7XG5pbXBvcnQgJy4vZGF0YWdyaWQuY29tcG9uZW50LnNjc3MnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUsIG93blByb3BzKSA9PiB7XG4gIGNvbnN0IEdSSUQgPSBvd25Qcm9wcy5ncmlkO1xuICByZXR1cm4ge1xuICAgIGlzQnVzeTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2lzQnVzeSddLCB0cnVlKSxcbiAgICBpc0VkaXRpbmc6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdpc0VkaXRpbmcnXSwgZmFsc2UpLFxuICAgIGlzQ3JlYXRpbmc6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdpc0NyZWF0aW5nJ10sIGZhbHNlKSxcbiAgICBpc0ZpbHRlcmluZzpcbiAgICAgIHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnaXNGaWx0ZXJpbmcnXSwgZmFsc2UpLFxuICAgIGlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW46XG4gICAgICBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnY29sdW1uU2V0dGluZ3NNb2RhbCcsICdvcGVuJ10sIGZhbHNlKSxcbiAgICBzb3J0Q29sdW1uOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdzb3J0aW5nRGF0YScsICdzb3J0Q29sdW1uJ10sIG51bGwpLFxuICAgIHNvcnRPcmRlcjogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnc29ydGluZ0RhdGEnLCAnc29ydE9yZGVyJ10sIG51bGwpLFxuICAgIHZpc2libGVDb2x1bW5zOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICd2aXNpYmxlQ29sdW1ucyddLCBMaXN0KCkpLFxuICAgIGNvbHVtbldpZHRoczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnY29sdW1uV2lkdGhzJ10sIE1hcCgpKSxcbiAgICBzZWxlY3RlZENlbGw6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2VsZWN0ZWRDZWxsJ10sIE1hcCgpKSxcbiAgICBzZWxlY3RlZEl0ZW1zOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3NlbGVjdGVkSXRlbXMnXSwgTGlzdCgpKSxcbiAgICBkYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2RhdGEnXSwgTGlzdCgpKSxcbiAgICBlZGl0RGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdlZGl0RGF0YSddLCBNYXAoKSksXG4gICAgY3JlYXRlRGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjcmVhdGVEYXRhJ10sIExpc3QoKSksXG4gICAgZmlsdGVyRGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdmaWx0ZXJEYXRhJ10sIE1hcCgpKSxcbiAgICBjZWxsTWVzc2FnZXM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY2VsbE1lc3NhZ2VzJ10sIE1hcCgpKSxcbiAgICBjcmVhdGVDZWxsTWVzc2FnZXM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY3JlYXRlQ2VsbE1lc3NhZ2VzJ10sIE1hcCgpKSxcbiAgICBhbGxEYXRhU2l6ZTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdhbGxEYXRhJ10sIExpc3QoKSkuc2l6ZSxcbiAgICBsYW5ndWFnZTogVXRpbHMuZ2V0TGFuZ3VhZ2UoR1JJRCwgc3RhdGUudXNlciksXG4gICAgcmVnaW9uOiBVdGlscy5nZXRSZWdpb24oR1JJRCwgc3RhdGUudXNlciksXG4gICAgZGF0ZUZvcm1hdDogVXRpbHMuZ2V0RGF0ZUZvcm1hdChHUklELCBzdGF0ZS51c2VyKSxcbiAgICB0aG91c2FuZFNlcGFyYXRvcjogVXRpbHMuZ2V0VGhvdXNhbmRTZXBhcmF0b3IoR1JJRCwgc3RhdGUudXNlciksXG4gICAgZGVjaW1hbFNlcGFyYXRvcjogVXRpbHMuZ2V0RGVjaW1hbFNlcGFyYXRvcihHUklELCBzdGF0ZS51c2VyKSxcbiAgICBmb3JjZVJlZnJlc2hUaW1lc3RhbXA6IHN0YXRlLmRhdGFncmlkLmdldCgnZm9yY2VSZWZyZXNoJywgMCksIC8vIGZvcmNlIHJlLXJlbmRlciB3aGVuIGNoYW5nZWRcbiAgICBmb2N1c1R5cGU6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdmb2N1c1R5cGUnXSwgTWFwKCkpLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGF0YWdyaWRBY3Rpb25zO1xuXG5AcGFnaW5hdGlvblxuQGluamVjdEludGxcbkBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKVxuY2xhc3MgRGF0YUdyaWQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHByb3BUeXBlcztcbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY3VycmVudFJvdzogMCxcbiAgICAgIGN1cnJlbnRDb2x1bW46IDAsXG4gICAgICBjb250ZXh0TWVudU9wZW46IGZhbHNlLFxuICAgICAgY29udGV4dE1lbnVYOiBudWxsLFxuICAgICAgY29udGV4dE1lbnVZOiBudWxsLFxuICAgIH07XG4gICAgdGhpcy5jZWxsUmVmcyA9IHt9O1xuICAgIHRoaXMuY3JlYXRlQ2VsbFJlZnMgPSB7fTtcbiAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsID0gZmFsc2U7XG4gICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTsgLy8gVE9ETzogSGFuZGxlIGZvY3VzaW5nIHdoZW4gdHJ1ZVxuICAgIHRoaXMuZm9jdXNUb0Vycm9yQ2VsbCA9IGZhbHNlOyAvLyBUT0RPOiBIYW5kbGUgZm9jdXNpbmcgd2hlbiB0cnVlXG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25Eb2N1bWVudENsaWNrKTtcbiAgICB0aGlzLnByb3BzLmludmFsaWRhdGUodGhpcy5wcm9wcy5ncmlkKTtcbiAgfVxuXG4gIG9uRG9jdW1lbnRDbGljayA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5jb250ZXh0TWVudUl0ZW1zKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY29udGV4dE1lbnVPcGVuOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25Eb2N1bWVudENsaWNrKTtcbiAgfTtcblxuICBvbkNvbHVtblJlc2l6ZUVuZENhbGxiYWNrID0gKG5ld0NvbHVtbldpZHRoLCBjb2x1bW5LZXkpID0+IHtcbiAgICB0aGlzLnByb3BzLnJlc2l6ZUNvbHVtbih0aGlzLnByb3BzLmdyaWQsIGNvbHVtbktleSwgbmV3Q29sdW1uV2lkdGgpO1xuICB9O1xuXG5cbiAgLyoqXG4gICAqIEBwYXJhbSByb3dJbmRleCAoaW50KVxuICAgKiBAcGFyYW0gY29sIChvYmopLiBDb2x1bW4gb2JqZWN0LlxuICAgKiBAcGFyYW0gZS4gT3JpZ2luYWwgS2V5RG93biBldmVudFxuICAgKiBAcGFyYW0gY3JlYXRlIChib29sKS4gSXMgdGhlIGNlbGwgY3JlYXRlIGNlbGwgb3IgZWRpdCBjZWxsP1xuICAgKi9cbiAgb25DZWxsS2V5RG93biA9IChyb3dJbmRleCwgY29sLCBlLCBjcmVhdGUgPSBmYWxzZSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZUFycm93TmF2aWdhdGlvbikge1xuICAgICAgY29uc3QgY2VsbFJlZnMgPSBjcmVhdGUgPyB0aGlzLmNyZWF0ZUNlbGxSZWZzIDogdGhpcy5jZWxsUmVmcztcbiAgICAgIGNvbnN0IGFycm93S2V5cyA9IFtLRVlfQ09ERVMuRE9XTiwgS0VZX0NPREVTLlVQLCBLRVlfQ09ERVMuTEVGVCwgS0VZX0NPREVTLlJJR0hUXTtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgY29sdW1ucywgdmlzaWJsZUNvbHVtbnMsIGdyaWQsIGRhdGEsIG9uTGFzdENlbGxUYWJQcmVzcyxcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3QgZ3JpZENvbHVtbnMgPSBVdGlscy52aXNpYmxlQ29sdW1ucyhjb2x1bW5zLCB2aXNpYmxlQ29sdW1ucyk7XG4gICAgICBjb25zdCBnZXRDb2x1bW5LZXlCeUluZGV4ID0gaSA9PiBVdGlscy5nZXRDb2x1bW5LZXkoZ3JpZENvbHVtbnNbaV0pO1xuICAgICAgY29uc3Qgcm93c1NpemUgPSBkYXRhLnNpemU7XG4gICAgICBjb25zdCBjb2x1bW5LZXkgPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sKTtcbiAgICAgIGxldCBjdXJyZW50Q2VsbCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4fWBdO1xuICAgICAgbGV0IHByb3h5ID0gbnVsbDtcblxuICAgICAgY29uc3QgaXNDdXJzb3JBdFN0YXJ0ID0gKCkgPT4ge1xuICAgICAgICBpZiAoY3VycmVudENlbGwudHlwZSAhPT0gJ3RleHQnKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRDZWxsLnNlbGVjdGlvblN0YXJ0ID09PSAwO1xuICAgICAgfTtcblxuICAgICAgY29uc3QgaXNDdXJzb3JBdEVuZCA9ICgpID0+IHtcbiAgICAgICAgaWYgKGN1cnJlbnRDZWxsLnR5cGUgIT09ICd0ZXh0JykgcmV0dXJuIHRydWU7XG4gICAgICAgIHJldHVybiBjdXJyZW50Q2VsbC5zZWxlY3Rpb25FbmQgPT09IGN1cnJlbnRDZWxsLnZhbHVlLmxlbmd0aDtcbiAgICAgIH07XG5cbiAgICAgIC8vIElmIGN1cnJlbnQgY2VsbCBob2xkcyBhIHJlYWN0LWZsb2F0aW5nLXNlbGVjdCBjb21wb25lbnRcbiAgICAgIGlmIChjdXJyZW50Q2VsbCAmJiBjdXJyZW50Q2VsbC5zZWxlY3RSZWYpIHtcbiAgICAgICAgcHJveHkgPSBjdXJyZW50Q2VsbDtcbiAgICAgICAgY3VycmVudENlbGwgPSBjdXJyZW50Q2VsbC5zZWxlY3RSZWYuc2VsZWN0LmlucHV0UmVmO1xuICAgICAgfVxuXG4gICAgICAvLyBQcmV2ZW50cyB1cC9kb3duIGFycm93IGZyb20gY2hhbmdpbmcgbnVtYmVyIGZpZWxkIHZhbHVlXG4gICAgICBpZiAoYXJyb3dLZXlzLmluY2x1ZGVzKGUua2V5Q29kZSkgJiYgY3VycmVudENlbGwudHlwZSA9PT0gJ251bWJlcicpIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuRU5URVI6XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLkVTQzoge1xuICAgICAgICAgIGlmIChjcmVhdGUgJiYgZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuRU5URVIpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuYWRkTmV3SXRlbShncmlkLCBVdGlscy5nZXRDb2x1bW5EZWZhdWx0VmFsdWVzKGNvbHVtbnMpKTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGN1cnJlbnRDZWxsLnNlbGVjdCgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLkRPV046IHtcbiAgICAgICAgICBsZXQgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2NvbHVtbktleX1fJHtyb3dJbmRleCArIDF9YF07XG5cbiAgICAgICAgICAvLyBQcmV2ZW50cyBtZW51IGZyb20gb3BlbmluZ1xuICAgICAgICAgIGlmIChwcm94eSAmJiBwcm94eS5zZWxlY3RSZWYgJiYgIXByb3h5LnNlbGVjdFJlZi5zdGF0ZS5tZW51SXNPcGVuKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAoIW5leHRFbGVtZW50KSBicmVhaztcbiAgICAgICAgICAgIG5leHRFbGVtZW50ID0gbmV4dEVsZW1lbnQuc2VsZWN0UmVmLnNlbGVjdC5pbnB1dFJlZjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5tb3ZlQ2VsbEZvY3VzKG5leHRFbGVtZW50LCByb3dJbmRleCArIDEsIC0xKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5VUDoge1xuICAgICAgICAgIGxldCBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4IC0gMX1gXTtcblxuICAgICAgICAgIC8vIFByZXZlbnRzIG1lbnUgZnJvbSBvcGVuaW5nXG4gICAgICAgICAgaWYgKHByb3h5ICYmIHByb3h5LnNlbGVjdFJlZiAmJiAhcHJveHkuc2VsZWN0UmVmLnN0YXRlLm1lbnVJc09wZW4pIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmICghbmV4dEVsZW1lbnQpIGJyZWFrO1xuICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSBuZXh0RWxlbWVudC5zZWxlY3RSZWYuc2VsZWN0LmlucHV0UmVmO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm1vdmVDZWxsRm9jdXMobmV4dEVsZW1lbnQsIHJvd0luZGV4IC0gMSwgLTEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLlRBQjpcbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuUklHSFQ6XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLkxFRlQ6IHtcbiAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuUklHSFQgJiYgIWlzQ3Vyc29yQXRFbmQoKSkgYnJlYWs7XG4gICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLkxFRlQgJiYgIWlzQ3Vyc29yQXRTdGFydCgpKSBicmVhaztcblxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgIGxldCBjb2x1bW5JbmQgPSBncmlkQ29sdW1ucy5maW5kSW5kZXgoYyA9PiBjLnZhbHVlS2V5UGF0aC5qb2luKCcvJykgPT09IGNvbHVtbktleSk7XG4gICAgICAgICAgaWYgKGNvbHVtbkluZCAhPT0gLTEpIHtcbiAgICAgICAgICAgIGxldCBkaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICBsZXQgbmV4dEVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgbGV0IHJvd0luZCA9IHJvd0luZGV4O1xuICAgICAgICAgICAgd2hpbGUgKGRpc2FibGVkKSB7XG4gICAgICAgICAgICAgIC8vIE1vdmluZyB0byB0aGUgbGVmdFxuICAgICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuTEVGVCB8fCAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuVEFCICYmIGUuc2hpZnRLZXkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbHVtbkluZCAtIDEgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kIC09IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyb3dJbmQgLSAxID49IDApIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCA9IGdyaWRDb2x1bW5zLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgICByb3dJbmQgLT0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE1vdmluZyB0byB0aGUgcmlnaHRcbiAgICAgICAgICAgICAgICBpZiAoY29sdW1uSW5kICsgMSA8IGdyaWRDb2x1bW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kICs9IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyb3dJbmQgKyAxIDwgcm93c1NpemUpIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCA9IDA7XG4gICAgICAgICAgICAgICAgICByb3dJbmQgKz0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJvd0luZCArIDEgPT09IHJvd3NTaXplKSB7XG4gICAgICAgICAgICAgICAgICAvLyBJZiB0cnlpbmcgdG8gc2VsZWN0IGEgcm93LCB3aGVuIHRoZXJlIGlzIG5vbmU6XG4gICAgICAgICAgICAgICAgICBpZiAob25MYXN0Q2VsbFRhYlByZXNzICYmIGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLlRBQikgb25MYXN0Q2VsbFRhYlByZXNzKGUpO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2dldENvbHVtbktleUJ5SW5kZXgoY29sdW1uSW5kKX1fJHtyb3dJbmR9YF07XG5cbiAgICAgICAgICAgICAgLy8gSWYgd2UgY2Fubm90IGZvY3VzIG9uIHRoZSBuZXh0IGVsZW1lbnQgd2hpbGUgbW92aW5nIHRvIHRoZSByaWdodFxuICAgICAgICAgICAgICBpZiAoIW5leHRFbGVtZW50ICYmIGUua2V5Q29kZSAhPT0gS0VZX0NPREVTLkxFRlQpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSdyZSBub3QgeWV0IGluIHRoZSBsYXN0IGZvY3VzYWJsZSBjb2x1bW5cbiAgICAgICAgICAgICAgICBpZiAoY29sdW1uSW5kIDw9IGdyaWRDb2x1bW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgd2hpbGUgKGNvbHVtbkluZCA8PSBncmlkQ29sdW1ucy5sZW5ndGggJiYgIW5leHRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHRFbGVtZW50ID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtnZXRDb2x1bW5LZXlCeUluZGV4KGNvbHVtbkluZCl9XyR7cm93SW5kfWBdO1xuICAgICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgKz0gMTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBJZiB3ZSBhcmUgaW4gdGhlIGxhc3QgY29sdW1uIGFuZCB3ZSBkb24ndCBoYXZlIGFuIGVsZW1lbnQgdG8gZm9jdXMgb24sXG4gICAgICAgICAgICAgICAgICAgIC8vIHdlIG11c3QgbW92ZSB0byB0aGUgbmV4dCByb3cgKGlmIHBvc3NpYmxlKVxuICAgICAgICAgICAgICAgICAgICBpZiAoIW5leHRFbGVtZW50ICYmIGNvbHVtbkluZCA9PT0gZ3JpZENvbHVtbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gSWYgdHJ5aW5nIHRvIHNlbGVjdCBhIHJvdywgd2hlbiB0aGVyZSBpcyBub25lOlxuICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3dJbmQgKyAxID09PSByb3dzU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9uTGFzdENlbGxUYWJQcmVzcyAmJiBlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5UQUIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25MYXN0Q2VsbFRhYlByZXNzKGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgY29sdW1uSW5kID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICByb3dJbmQgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgICBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Z2V0Q29sdW1uS2V5QnlJbmRleChjb2x1bW5JbmQpfV8ke3Jvd0luZH1gXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSBjYW5ub3QgZm9jdXMgb24gdGhlIG5leHQgZWxlbWVudCB3aGlsZSBtb3ZpbmcgdG8gdGhlIGxlZnRcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICghbmV4dEVsZW1lbnQgJiYgZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuTEVGVCkge1xuICAgICAgICAgICAgICAgIHdoaWxlIChjb2x1bW5JbmQgPiAwICYmICFuZXh0RWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kIC09IDE7XG4gICAgICAgICAgICAgICAgICBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Z2V0Q29sdW1uS2V5QnlJbmRleChjb2x1bW5JbmQpfV8ke3Jvd0luZH1gXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZGlzYWJsZWQgPSBuZXh0RWxlbWVudCA/IG5leHRFbGVtZW50LmRpc2FibGVkIDogZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWRpc2FibGVkICYmIG5leHRFbGVtZW50KSB7XG4gICAgICAgICAgICAgIGlmIChuZXh0RWxlbWVudC5zZWxlY3RSZWYpIG5leHRFbGVtZW50ID0gbmV4dEVsZW1lbnQuc2VsZWN0UmVmLnNlbGVjdC5pbnB1dFJlZjtcbiAgICAgICAgICAgICAgdGhpcy5tb3ZlQ2VsbEZvY3VzKG5leHRFbGVtZW50LCByb3dJbmQsIGNvbHVtbkluZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIG9uRWRpdENlbGxLZXlEb3duID0gKHJvd0luZGV4LCBjb2wpID0+IChlKSA9PiB7XG4gICAgdGhpcy5vbkNlbGxLZXlEb3duKHJvd0luZGV4LCBjb2wsIGUpO1xuICB9O1xuXG4gIG9uQ3JlYXRlQ2VsbEtleURvd24gPSAocm93SW5kZXgsIGNvbCkgPT4gKGUpID0+IHtcbiAgICB0aGlzLm9uQ2VsbEtleURvd24ocm93SW5kZXgsIGNvbCwgZSwgdHJ1ZSk7XG4gIH07XG5cbiAgb25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UgPSAoY29sLCB2YWx1ZVBhcnNlcikgPT4gKGV2ZW50T3JEYXRhKSA9PiB7XG4gICAgbGV0IHJhd1ZhbHVlO1xuICAgIC8vIGV2ZW50T3JEYXRhIGNhbiBiZSBpbnB1dCBvbkNoYW5nZSBldmVudCwgcmVhY3Qtc2VsZWN0IG9uQ2hhbmdlIG9yIHJlYWN0LWRheS1waWNrZXIgb25DaGFuZ2VcbiAgICBpZiAoZXZlbnRPckRhdGEpIHtcbiAgICAgIGlmIChldmVudE9yRGF0YS50YXJnZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnRPckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSB2YWx1ZVBhcnNlcihyYXdWYWx1ZSk7XG4gICAgdGhpcy5wcm9wcy5maWx0ZXJDZWxsVmFsdWVDaGFuZ2UoXG4gICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICB0aGlzLnByb3BzLmNvbHVtbnMsXG4gICAgICBjb2wsXG4gICAgICB2YWx1ZSxcbiAgICApO1xuICB9O1xuXG4gIG9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlID0gKHJvd0luZGV4LCBjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZXZlbnRPckRhdGEpID0+IHtcbiAgICBsZXQgcmF3VmFsdWU7XG4gICAgLy8gZXZlbnRPckRhdGEgY2FuIGJlIGlucHV0IG9uQ2hhbmdlIGV2ZW50LCByZWFjdC1zZWxlY3Qgb25DaGFuZ2Ugb3IgcmVhY3QtZGF5LXBpY2tlciBvbkNoYW5nZVxuICAgIGlmIChldmVudE9yRGF0YSkge1xuICAgICAgaWYgKGV2ZW50T3JEYXRhLnRhcmdldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChldmVudE9yRGF0YS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCB2YWx1ZSA9IHZhbHVlUGFyc2VyKHJhd1ZhbHVlKTtcbiAgICB0aGlzLnByb3BzLmNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIHJvd0luZGV4LCBjb2wudmFsdWVLZXlQYXRoLCB2YWx1ZSk7XG4gICAgaWYgKGNvbC5vbkNyZWF0ZVZhbHVlQ2hhbmdlKSB7XG4gICAgICBjb2wub25DcmVhdGVWYWx1ZUNoYW5nZSh2YWx1ZSwgY29sLnZhbHVlS2V5UGF0aCwgcm93SW5kZXgpO1xuICAgIH1cbiAgICBpZiAoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlICYmIHZhbHVlID09PSBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubWF0Y2hWYWx1ZSkge1xuICAgICAgLy8gQ2FsbCBzcGVjaWFsIHBhaXJlZCB2YWx1ZSBjaGFuZ2Ugb24gb3RoZXIgY2VsbCBpZiB2YWx1ZSBtYXRjaGVzXG4gICAgICB0aGlzLm9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlKFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgeyB2YWx1ZUtleVBhdGg6IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5uZXdWYWx1ZUtleVBhdGggfSxcbiAgICAgICAgdiA9PiB2LFxuICAgICAgKShjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY29sLnZhbGlkYXRvcnMpIHtcbiAgICAgIHRoaXMucHJvcHMuY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUoXG4gICAgICAgIHRoaXMucHJvcHMuZ3JpZCxcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIGNvbC52YWx1ZUtleVBhdGgsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBjb2wudmFsaWRhdG9ycyxcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIG9uRWRpdENlbGxWYWx1ZUNoYW5nZSA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGV2ZW50T3JEYXRhKSA9PiB7XG4gICAgY29uc3QgZGF0YUlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICBsZXQgcmF3VmFsdWU7XG4gICAgLy8gZXZlbnRPckRhdGEgY2FuIGJlIGlucHV0IG9uQ2hhbmdlIGV2ZW50LCByZWFjdC1zZWxlY3Qgb25DaGFuZ2Ugb3IgcmVhY3QtZGF5LXBpY2tlciBvbkNoYW5nZVxuICAgIGlmIChldmVudE9yRGF0YSkge1xuICAgICAgaWYgKGV2ZW50T3JEYXRhLnRhcmdldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChldmVudE9yRGF0YS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCB2YWx1ZSA9IHZhbHVlUGFyc2VyKHJhd1ZhbHVlKTtcbiAgICB0aGlzLnByb3BzLmVkaXRDZWxsVmFsdWVDaGFuZ2UodGhpcy5wcm9wcy5ncmlkLCBkYXRhSWQsIGNvbC52YWx1ZUtleVBhdGgsIHZhbHVlKTtcbiAgICBpZiAoY29sLm9uRWRpdFZhbHVlQ2hhbmdlKSB7XG4gICAgICBjb2wub25FZGl0VmFsdWVDaGFuZ2UodmFsdWUsIGNvbC52YWx1ZUtleVBhdGgsIHJvd0luZGV4LCBkYXRhSWQpO1xuICAgIH1cbiAgICBpZiAoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlICYmIHZhbHVlID09PSBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubWF0Y2hWYWx1ZSkge1xuICAgICAgLy8gQ2FsbCBzcGVjaWFsIHBhaXJlZCB2YWx1ZSBjaGFuZ2Ugb24gb3RoZXIgY2VsbCBpZiB2YWx1ZSBtYXRjaGVzXG4gICAgICB0aGlzLm9uRWRpdENlbGxWYWx1ZUNoYW5nZShcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIHsgdmFsdWVLZXlQYXRoOiBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWVLZXlQYXRoIH0sXG4gICAgICAgIHYgPT4gdixcbiAgICAgICkoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm5ld1ZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNvbC52YWxpZGF0b3JzKSB7XG4gICAgICB0aGlzLnByb3BzLmVkaXRDZWxsVmFsdWVWYWxpZGF0ZShcbiAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICBkYXRhSWQsXG4gICAgICAgIGNvbC52YWx1ZUtleVBhdGgsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBjb2wudmFsaWRhdG9ycyxcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIG9uQ3JlYXRlQ2VsbEJsdXIgPSAocm93SW5kZXgsIGNvbCwgdmFsdWVQYXJzZXIpID0+IChlKSA9PiB7XG4gICAgaWYgKGNvbC5vbkNyZWF0ZUJsdXIpIHtcbiAgICAgIGxldCB2YWx1ZSA9IChlICYmIGUudGFyZ2V0ICYmIGUudGFyZ2V0LnZhbHVlICE9PSB1bmRlZmluZWQpID9cbiAgICAgICAgZS50YXJnZXQudmFsdWUgOlxuICAgICAgICB0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCk7XG4gICAgICBpZiAodmFsdWVQYXJzZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlUGFyc2VyKHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGNvbC5vbkNyZWF0ZUJsdXIodmFsdWUsIHJvd0luZGV4KTtcbiAgICB9XG4gIH07XG5cbiAgb25FZGl0Q2VsbEJsdXIgPSAocm93SW5kZXgsIGNvbCwgdmFsdWVQYXJzZXIpID0+IChlKSA9PiB7XG4gICAgaWYgKGNvbC5vbkVkaXRCbHVyKSB7XG4gICAgICBsZXQgdmFsdWUgPSAoZSAmJiBlLnRhcmdldCAmJiBlLnRhcmdldC52YWx1ZSAhPT0gdW5kZWZpbmVkKSA/XG4gICAgICAgIGUudGFyZ2V0LnZhbHVlIDpcbiAgICAgICAgdGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpO1xuICAgICAgaWYgKHZhbHVlUGFyc2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZVBhcnNlcih2YWx1ZSk7XG4gICAgICB9XG4gICAgICBjb25zdCBkYXRhSWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgICAgY29sLm9uRWRpdEJsdXIodmFsdWUsIHJvd0luZGV4LCBkYXRhSWQpO1xuICAgIH1cbiAgfTtcblxuICBvbkNlbGxGb2N1cyA9IChjZWxsVHlwZSwgaW5wdXRUeXBlLCByb3dJbmRleCwgY29sdW1uS2V5KSA9PiAoZSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGNlbGxTZWxlY3Rpb25DaGFuZ2UsIGNlbGxTZWxlY3QsIGdyaWQsIGlzRWRpdGluZyxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoaXNFZGl0aW5nKSByZXR1cm47XG5cbiAgICBpZiAoaW5wdXRUeXBlID09PSAnbnVtYmVyJykge1xuICAgICAgZS50YXJnZXQuc2VsZWN0KCk7XG4gICAgfVxuICAgIGlmIChjZWxsVHlwZSA9PT0gJ2VkaXQnICYmIGNlbGxTZWxlY3QpIHtcbiAgICAgIGNlbGxTZWxlY3Rpb25DaGFuZ2UoZ3JpZCwgTWFwKHtcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIGNvbHVtbktleSxcbiAgICAgIH0pKTtcbiAgICB9XG4gIH07XG5cbiAgZ2V0RGF0YUlkQnlSb3dJbmRleCA9IHJvd0luZGV4ID0+XG4gICAgdGhpcy5wcm9wcy5kYXRhLmdldEluKFtyb3dJbmRleCwgLi4udGhpcy5wcm9wcy5ncmlkLmlkS2V5UGF0aF0pO1xuXG4gIGdldFNlbGVjdGVkSXRlbUluZGV4ID0gKGlkKSA9PiB7XG4gICAgaWYgKCFpZCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMucHJvcHMuZGF0YS5maW5kSW5kZXgodiA9PiB2LmdldEluKHRoaXMucHJvcHMuZ3JpZC5pZEtleVBhdGgpID09PSBpZCk7XG4gICAgcmV0dXJuIGluZGV4ID09PSAtMSA/IHVuZGVmaW5lZCA6IGluZGV4O1xuICB9O1xuXG4gIGdldEVkaXRJdGVtVmFsdWUgPSAocm93SW5kZXgsIGNvbCwgb3B0aW9ucyA9IFtdKSA9PiB7XG4gICAgLy8gR2V0IHRoZSB2YWx1ZSB0byBkaXNwbGF5IGluIGVkaXQgY2VsbFxuICAgIGNvbnN0IGlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICBjb25zdCBlZGl0VmFsdWUgPSB0aGlzLnByb3BzLmVkaXREYXRhLmdldEluKFtpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0sIHVuZGVmaW5lZCk7XG4gICAgbGV0IG9yaWdpbmFsVmFsdWU7XG4gICAgaWYgKGVkaXRWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBvcmlnaW5hbFZhbHVlID0gdGhpcy5wcm9wcy5kYXRhLmdldEluKFtyb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0sICcnKTtcbiAgICB9IGVsc2UgaWYgKGVkaXRWYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBWYWx1ZSBpcyBmb3VuZCBmcm9tIGVkaXREYXRhXG4gICAgICAvLyBGb3JtYXQgYnkgY29tcG9uZW50IHR5cGVcbiAgICAgIHN3aXRjaCAoY29sLmNvbXBvbmVudFR5cGUpIHtcbiAgICAgICAgY2FzZSAnc2VsZWN0JzpcbiAgICAgICAgICByZXR1cm4gY29sLnNlbGVjdENvbXBvbmVudE9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSBlZGl0VmFsdWUpO1xuICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgICByZXR1cm4gb3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IGVkaXRWYWx1ZSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuIGVkaXRWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG9yaWdpbmFsVmFsdWUgPT09IG51bGwgfHwgb3JpZ2luYWxWYWx1ZSA9PT0gdW5kZWZpbmVkIHx8IG9yaWdpbmFsVmFsdWUgPT09ICcnKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIC8vIFJldHVybiB2YWx1ZSBmcm9tIG9yaWdpbmFsIGRhdGEsIGJlY2F1c2UgZWRpdERhdGEgaXMgbm90IGF2YWlsYWJsZVxuICAgIC8vIEZvcm1hdCBieSBjb21wb25lbnQgdHlwZVxuICAgIHN3aXRjaCAoY29sLmNvbXBvbmVudFR5cGUpIHtcbiAgICAgIGNhc2UgJ2Zsb2F0Jzoge1xuICAgICAgICBpZiAoU3RyaW5nKG9yaWdpbmFsVmFsdWUpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZXR1cm4gU3RyaW5nKG9yaWdpbmFsVmFsdWUpXG4gICAgICAgICAgICAucmVwbGFjZSgnLicsIHRoaXMucHJvcHMuZGVjaW1hbFNlcGFyYXRvcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9yaWdpbmFsVmFsdWU7XG4gICAgICB9XG4gICAgICBjYXNlICdzZWxlY3QnOlxuICAgICAgICByZXR1cm4gY29sLnNlbGVjdENvbXBvbmVudE9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSBvcmlnaW5hbFZhbHVlKTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICByZXR1cm4gb3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IG9yaWdpbmFsVmFsdWUpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIG9yaWdpbmFsVmFsdWU7XG4gICAgfVxuICB9O1xuXG4gIGdldENyZWF0ZUl0ZW1WYWx1ZSA9IChyb3dJbmRleCwgY29sLCBvcHRpb25zID0gW10pID0+IHtcbiAgICBjb25zdCB2YWwgPSB0aGlzLnByb3BzLmNyZWF0ZURhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSwgJycpO1xuICAgIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9IGVsc2UgaWYgKGNvbC5jb21wb25lbnRUeXBlID09PSAnc2VsZWN0Jykge1xuICAgICAgcmV0dXJuIGNvbC5zZWxlY3RDb21wb25lbnRPcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gdmFsKTtcbiAgICB9IGVsc2UgaWYgKFsnYm9vbGVhbiddLmluY2x1ZGVzKGNvbC5jb21wb25lbnRUeXBlKSkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSB2YWwpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsO1xuICB9O1xuXG4gIGdldEZpbHRlckl0ZW1WYWx1ZSA9IChjb2wsIG9wdGlvbnMgPSBbXSkgPT4ge1xuICAgIGNvbnN0IHZhbCA9IHRoaXMucHJvcHMuZmlsdGVyRGF0YS5nZXQoVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCksICcnKTtcbiAgICBpZiAodmFsID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSBlbHNlIGlmIChjb2wuY29tcG9uZW50VHlwZSA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgIHJldHVybiBjb2wuc2VsZWN0Q29tcG9uZW50T3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IHZhbCk7XG4gICAgfSBlbHNlIGlmIChbJ2NoZWNrYm94JywgJ2Jvb2xlYW4nXS5pbmNsdWRlcyhjb2wuY29tcG9uZW50VHlwZSkpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gdmFsKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbDtcbiAgfTtcblxuICBnZXRDb21wb25lbnREaXNhYmxlZFN0YXRlID0gKHJvd0luZGV4LCBjb2wsIG1vZGUpID0+IHtcbiAgICBsZXQgY29tcG9uZW50RGlzYWJsZWQgPSAhIWNvbC5kaXNhYmxlRWRpdGluZztcbiAgICAvLyBjaGVjayBpZiBjb21wb25lbnQgaXMgZGlzYWJsZWQgYnkgb3RoZXIgY29sdW1uIGRhdGFcbiAgICBpZiAoIWNvbXBvbmVudERpc2FibGVkICYmIGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaCkge1xuICAgICAgaWYgKG1vZGUgPT09ICdjcmVhdGUnKSB7XG4gICAgICAgIGNvbXBvbmVudERpc2FibGVkID0gdGhpcy5nZXRDcmVhdGVJdGVtVmFsdWUoXG4gICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgeyB2YWx1ZUtleVBhdGg6IGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaC5tYXRjaFZhbHVlS2V5UGF0aCB9LFxuICAgICAgICApID09PSBjb2wuZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2gubWF0Y2hWYWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbXBvbmVudERpc2FibGVkID0gdGhpcy5nZXRFZGl0SXRlbVZhbHVlKFxuICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgIHsgdmFsdWVLZXlQYXRoOiBjb2wuZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2gubWF0Y2hWYWx1ZUtleVBhdGggfSxcbiAgICAgICAgKSA9PT0gY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb21wb25lbnREaXNhYmxlZDtcbiAgfTtcblxuICBnZXRSb3dDbGFzc05hbWUgPSAocm93SW5kZXgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBncmlkLFxuICAgICAgaXNDcmVhdGluZyxcbiAgICAgIGlzRWRpdGluZyxcbiAgICAgIGNyZWF0ZURhdGEsXG4gICAgICBzZWxlY3RlZEl0ZW1zLFxuICAgICAgZGF0YSxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCByb3dDbGFzc05hbWVzID0gWydvYy1kYXRhZ3JpZC1yb3cnXTtcbiAgICBsZXQgZXh0cmFSb3dDb3VudCA9IDA7IC8vIGhvdyBtYW55IHJvd3MgdG8gaWdub3JlIGZyb20gdG9wLCBuZXcgKyBmaWx0ZXIgcm93c1xuICAgIGlmIChpc0NyZWF0aW5nKSBleHRyYVJvd0NvdW50ID0gY3JlYXRlRGF0YS5zaXplO1xuICAgIGlmIChpc0NyZWF0aW5nKSB7XG4gICAgICBpZiAocm93SW5kZXggPD0gKGV4dHJhUm93Q291bnQgLSAxKSkge1xuICAgICAgICByb3dDbGFzc05hbWVzLnB1c2goJ29jLWRhdGFncmlkLXJvdy1uZXcnKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzRWRpdGluZykge1xuICAgICAgcm93Q2xhc3NOYW1lcy5wdXNoKCdvYy1kYXRhZ3JpZC1yb3ctZWRpdCcpO1xuICAgIH1cblxuXG4gICAgLy8gY2hlY2sgaWYgcm93IGlzIHNlbGVjdGVkXG4gICAgaWYgKCghaXNDcmVhdGluZyAmJiAhaXNFZGl0aW5nKSAmJlxuICAgICAgKHNlbGVjdGVkSXRlbXMgJiYgZ3JpZC5pZEtleVBhdGgpKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHNlbGVjdGVkSXRlbXMuaW5kZXhPZihkYXRhLmdldEluKFtyb3dJbmRleCAtIGV4dHJhUm93Q291bnQsIC4uLmdyaWQuaWRLZXlQYXRoXSkpICE9PSAtMVxuICAgICAgKSB7XG4gICAgICAgIHJvd0NsYXNzTmFtZXMucHVzaCgnaXMtc2VsZWN0ZWQnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5wcm9wcy5yb3dDbGFzc05hbWVHZXR0ZXIpIHtcbiAgICAgIHJldHVybiByb3dDbGFzc05hbWVzLmpvaW4oJyAnKSArICcgJyArIHRoaXMucHJvcHMucm93Q2xhc3NOYW1lR2V0dGVyKHJvd0luZGV4KTtcbiAgICB9XG4gICAgcmV0dXJuIHJvd0NsYXNzTmFtZXMuam9pbignICcpO1xuICB9O1xuXG4gIGdldENlbGxNZXNzYWdlcyA9IChyb3dJbmRleCwgY29sLCBjZWxsVHlwZSkgPT4ge1xuICAgIGNvbnN0IHJldHVybkRhdGEgPSB7fTtcbiAgICBpZiAoIXRoaXMucHJvcHMuZ3JpZC5pZEtleVBhdGggfHwgIWNvbC52YWx1ZUtleVBhdGgpIHtcbiAgICAgIHJldHVybiByZXR1cm5EYXRhO1xuICAgIH1cbiAgICBsZXQgaW5mb01lc3NhZ2U7XG4gICAgbGV0IGVycm9yTWVzc2FnZTtcbiAgICBsZXQgd2FybmluZ01lc3NhZ2U7XG4gICAgaWYgKGNlbGxUeXBlID09PSAnY3JlYXRlJykge1xuICAgICAgaW5mb01lc3NhZ2UgPSB0aGlzLnByb3BzLmNyZWF0ZUNlbGxNZXNzYWdlcy5nZXRJbihbJ2luZm8nLCByb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgZXJyb3JNZXNzYWdlID0gdGhpcy5wcm9wcy5jcmVhdGVDZWxsTWVzc2FnZXMuZ2V0SW4oWydlcnJvcicsIHJvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgICB3YXJuaW5nTWVzc2FnZSA9IHRoaXMucHJvcHMuY3JlYXRlQ2VsbE1lc3NhZ2VzLmdldEluKFsnd2FybmluZycsIHJvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICAgIGluZm9NZXNzYWdlID0gdGhpcy5wcm9wcy5jZWxsTWVzc2FnZXMuZ2V0SW4oWydpbmZvJywgaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgIGVycm9yTWVzc2FnZSA9IHRoaXMucHJvcHMuY2VsbE1lc3NhZ2VzLmdldEluKFsnZXJyb3InLCBpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgd2FybmluZ01lc3NhZ2UgPSB0aGlzLnByb3BzLmNlbGxNZXNzYWdlcy5nZXRJbihbJ3dhcm5pbmcnLCBpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgIH1cbiAgICBpZiAoaW5mb01lc3NhZ2UpIHtcbiAgICAgIHJldHVybkRhdGEuaW5mb01lc3NhZ2UgPSBpbmZvTWVzc2FnZTtcbiAgICB9XG4gICAgaWYgKGVycm9yTWVzc2FnZSkge1xuICAgICAgcmV0dXJuRGF0YS5lcnJvck1lc3NhZ2UgPSBlcnJvck1lc3NhZ2U7XG4gICAgfVxuICAgIGlmICh3YXJuaW5nTWVzc2FnZSkge1xuICAgICAgcmV0dXJuRGF0YS53YXJuaW5nTWVzc2FnZSA9IHdhcm5pbmdNZXNzYWdlO1xuICAgIH1cbiAgICByZXR1cm4gcmV0dXJuRGF0YTtcbiAgfTtcblxuICBnZXRTY3JvbGxUb1JvdyA9ICgpID0+IHtcbiAgICBsZXQgc2Nyb2xsVG9Sb3c7XG4gICAgaWYgKHRoaXMucHJvcHMuaXNDcmVhdGluZyAmJiAhdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCkgcmV0dXJuIHNjcm9sbFRvUm93O1xuICAgIGlmICh0aGlzLmZvY3VzVG9DcmVhdGVDZWxsKSB7XG4gICAgICBjb25zdCBzY3JvbGxOZXdSb3cgPSB0aGlzLnByb3BzLmNyZWF0ZURhdGEuc2l6ZSAtIDE7XG4gICAgICBpZiAoc2Nyb2xsTmV3Um93ID49IDApIHtcbiAgICAgICAgc2Nyb2xsVG9Sb3cgPSBzY3JvbGxOZXdSb3c7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLmlzRWRpdGluZykge1xuICAgICAgICBzY3JvbGxUb1JvdyA9IHRoaXMuc3RhdGUuY3VycmVudFJvdztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gdGhpcy5wcm9wcy5zY3JvbGxUb1JvdzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgfVxuICAgICAgaWYgKHNjcm9sbFRvUm93ID09PSB1bmRlZmluZWQgJiYgdGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLnNpemUgPiAwKSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gdGhpcy5nZXRTZWxlY3RlZEl0ZW1JbmRleCh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuZmlyc3QoKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzY3JvbGxUb1JvdztcbiAgfTtcblxuICBzZXRGb2N1c1RvID0gKGZvY3VzVG8pID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5pc0VkaXRpbmcgfHwgdGhpcy5wcm9wcy5pc0NyZWF0aW5nKSB7XG4gICAgICBpZiAoZm9jdXNUbyAmJiBmb2N1c1RvLmdldCgndHlwZScpICYmIGZvY3VzVG8gIT09IHRoaXMucHJldkZvY3VzVG8pIHtcbiAgICAgICAgdGhpc1tmb2N1c1RvLmdldCgndHlwZScpXSA9IHRydWU7XG4gICAgICAgIHRoaXMuZm9jdXNUb0xhc3RSb3cgPSBmb2N1c1RvLmdldCgnZm9jdXNUb0xhc3RSb3cnKTtcbiAgICAgICAgdGhpcy5wcmV2Rm9jdXNUbyA9IGZvY3VzVG87XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZUNlbGxTZWxlY3QgPSAoY2VsbFR5cGUsIHJvd0luZGV4LCBjb2x1bW5LZXkpID0+ICgpID0+IHtcbiAgICBpZiAoY2VsbFR5cGUgPT09ICd2aWV3JyAmJiB0aGlzLnByb3BzLmNlbGxTZWxlY3QpIHtcbiAgICAgIHRoaXMucHJvcHMuY2VsbFNlbGVjdGlvbkNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIE1hcCh7XG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICBjb2x1bW5LZXksXG4gICAgICB9KSk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZUNyZWF0ZUNlbGxSZWYgPSAocm93SW5kZXgsIGNvbCkgPT4gKHJlZikgPT4ge1xuICAgIC8vIEZvY3VzIHRvIGNyZWF0ZSBjZWxsXG4gICAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCk7XG4gICAgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5jcmVhdGVEYXRhLnNpemUgJiZcbiAgICAgIHRoaXMucHJvcHMuY3JlYXRlRGF0YS5zaXplID09PSByb3dJbmRleCArIDEgJiZcbiAgICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgJiZcbiAgICAgICF0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2NyZWF0ZScpXG4gICAgKSB7XG4gICAgICByZWYuZm9jdXMoKTtcbiAgICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wcm9wcy5lbmFibGVBcnJvd05hdmlnYXRpb24pIHtcbiAgICAgIHRoaXMuY3JlYXRlQ2VsbFJlZnNbYCR7dGhpcy5wcm9wcy5ncmlkLmlkfV8ke2NvbHVtbktleX1fJHtyb3dJbmRleH1gXSA9IHJlZjtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlRWRpdENlbGxSZWYgPSAocm93SW5kZXgsIGNvbCkgPT4gKHJlZikgPT4ge1xuICAgIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2wpO1xuICAgIGlmICh0aGlzLmZvY3VzVG9FZGl0Q2VsbCAmJiAhdGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdlZGl0JykpIHtcbiAgICAgIGNvbnN0IHNlbGVjdGVkUm93SW5kZXggPSB0aGlzLmZvY3VzVG9MYXN0Um93ICYmIHRoaXMucHJvcHMuZGF0YS5zaXplID4gMCA/XG4gICAgICAgIHRoaXMucHJvcHMuZGF0YS5zaXplIC0gMSA6IHRoaXMuZ2V0U2VsZWN0ZWRJdGVtSW5kZXgodGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLmZpcnN0KCkpO1xuXG4gICAgICBjb25zdCB7IHNlbGVjdGVkQ2VsbCB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGlmIChzZWxlY3RlZENlbGwuc2l6ZSA+IDApIHtcbiAgICAgICAgaWYgKHNlbGVjdGVkQ2VsbC5nZXQoJ3Jvd0luZGV4JykgPT09IHJvd0luZGV4ICYmIHNlbGVjdGVkQ2VsbC5nZXQoJ2NvbHVtbktleScpID09PSBjb2x1bW5LZXkpIHtcbiAgICAgICAgICByZWYuZm9jdXMoKTtcbiAgICAgICAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuZm9jdXNUb0xhc3RSb3cgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzZWxlY3RlZFJvd0luZGV4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mb2N1c1RvTGFzdFJvdyA9IGZhbHNlO1xuICAgICAgfSBlbHNlIGlmIChzZWxlY3RlZFJvd0luZGV4ID09PSByb3dJbmRleCkge1xuICAgICAgICByZWYuZm9jdXMoKTtcbiAgICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mb2N1c1RvTGFzdFJvdyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5lbmFibGVBcnJvd05hdmlnYXRpb24pIHtcbiAgICAgIHRoaXMuY2VsbFJlZnNbYCR7dGhpcy5wcm9wcy5ncmlkLmlkfV8ke2NvbHVtbktleX1fJHtyb3dJbmRleH1gXSA9IHJlZjtcbiAgICB9XG4gIH07XG5cbiAgbW92ZUNlbGxGb2N1cyA9IChuZXh0RWxlbWVudCwgcm93SW5kZXgsIGNvbHVtbkluZGV4KSA9PiB7XG4gICAgY29uc3QgZWxlbWVudFR5cGVzID0gWyd0ZXh0JywgJ2NoZWNrYm94J107XG4gICAgaWYgKG5leHRFbGVtZW50ICYmIGVsZW1lbnRUeXBlcy5pbmNsdWRlcyhuZXh0RWxlbWVudC50eXBlKSkge1xuICAgICAgaWYgKHJvd0luZGV4ICE9PSAtMSB8fCBjb2x1bW5JbmRleCAhPT0gLTEpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgY3VycmVudENvbHVtbjogY29sdW1uSW5kZXgsXG4gICAgICAgICAgY3VycmVudFJvdzogcm93SW5kZXgsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmIChuZXh0RWxlbWVudC50eXBlID09PSAnY2hlY2tib3gnKSBuZXh0RWxlbWVudC5mb2N1cygpO1xuICAgICAgICBpZiAobmV4dEVsZW1lbnQudHlwZSA9PT0gJ3RleHQnKSBuZXh0RWxlbWVudC5zZWxlY3QoKTtcbiAgICAgIH0sIDUwKTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlU2VsZWN0aW9uQ2hlY2tCb3hPbkNoYW5nZSA9IHJvd0luZGV4ID0+ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLml0ZW1TZWxlY3Rpb25DaGFuZ2UodGhpcy5wcm9wcy5ncmlkLCByb3dJbmRleCwgdHJ1ZSwgZmFsc2UpO1xuICB9O1xuXG4gIGdlbmVyYXRlQ29sdW1ucyA9ICgpID0+IHtcbiAgICBjb25zdCB7IGV4dHJhQ29sdW1uIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGNvbHVtbnMgPSBbXTtcbiAgICBjb25zdCB0YWJJbmRleCA9IFN0cmluZyh0aGlzLnByb3BzLnRhYkluZGV4KTtcbiAgICBpZiAoZXh0cmFDb2x1bW4pIHtcbiAgICAgIGNvbHVtbnMucHVzaCh7XG4gICAgICAgIHdpZHRoOiBleHRyYUNvbHVtbi53aWR0aCB8fCA0MCxcbiAgICAgICAgaXNSZXNpemFibGU6ICEhZXh0cmFDb2x1bW4uaXNSZXNpemFibGUsXG4gICAgICAgIGlzU29ydGFibGU6IGZhbHNlLFxuICAgICAgICBjb2x1bW5LZXk6ICdleHRyYUNvbHVtbicsXG4gICAgICAgIGNlbGw6IHJvd0luZGV4ID0+IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWV4dHJhLWNvbHVtbi1jZWxsIG5vLXJvdy1zZWxlY3RcIj5cbiAgICAgICAgICAgIHtleHRyYUNvbHVtbi52YWx1ZVJlbmRlcih0aGlzLnByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSwgdGFiSW5kZXgpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApLFxuICAgICAgICBjZWxsRWRpdDogcm93SW5kZXggPT4gKGV4dHJhQ29sdW1uLmNlbGxFZGl0ID8gZXh0cmFDb2x1bW4uY2VsbEVkaXQocm93SW5kZXgpIDogbnVsbCksXG4gICAgICAgIGNlbGxDcmVhdGU6IHJvd0luZGV4ID0+IChleHRyYUNvbHVtbi5jZWxsQ3JlYXRlID8gZXh0cmFDb2x1bW4uY2VsbENyZWF0ZShyb3dJbmRleCkgOiBudWxsKSxcbiAgICAgICAgY2VsbEZpbHRlcjogcm93SW5kZXggPT4gKGV4dHJhQ29sdW1uLmNlbGxGaWx0ZXIgPyBleHRyYUNvbHVtbi5jZWxsRmlsdGVyKHJvd0luZGV4KSA6IG51bGwpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcHMucm93U2VsZWN0Q2hlY2tib3hDb2x1bW4pIHtcbiAgICAgIGNvbHVtbnMucHVzaCh7XG4gICAgICAgIHdpZHRoOiA0MCxcbiAgICAgICAgaXNSZXNpemFibGU6IGZhbHNlLFxuICAgICAgICBpc1NvcnRhYmxlOiBmYWxzZSxcbiAgICAgICAgY29sdW1uS2V5OiAnc2VsZWN0aW9uQ2hlY2tib3gnLFxuICAgICAgICBjZWxsOiAocm93SW5kZXgpID0+IHtcbiAgICAgICAgICBjb25zdCByb3dJdGVtID0gdGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCk7XG4gICAgICAgICAgY29uc3QgaXRlbUlkID0gcm93SXRlbS5nZXRJbih0aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoKTtcbiAgICAgICAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhpdGVtSWQpO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkU2VsZWN0Q2hlY2tCb3gtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtc2VsZWN0LWNoZWNrYm94LWNlbGwgbm8tcm93LXNlbGVjdFwiXG4gICAgICAgICAgICAgIGNoZWNrZWQ9e3NlbGVjdGVkfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVTZWxlY3Rpb25DaGVja0JveE9uQ2hhbmdlKHJvd0luZGV4KX1cbiAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICBjZWxsRWRpdDogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbENyZWF0ZTogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbEZpbHRlcjogKCkgPT4gbnVsbCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHZpc2libGVDb2x1bW5zID0gW107XG4gICAgdGhpcy5wcm9wcy52aXNpYmxlQ29sdW1ucy5mb3JFYWNoKCh2aXNpYmxlQ29sdW1uS2V5KSA9PiB7XG4gICAgICB0aGlzLnByb3BzLmNvbHVtbnMuZm9yRWFjaCgob3JnQ29sKSA9PiB7XG4gICAgICAgIGlmIChVdGlscy5nZXRDb2x1bW5LZXkob3JnQ29sKSA9PT0gdmlzaWJsZUNvbHVtbktleSkge1xuICAgICAgICAgIHZpc2libGVDb2x1bW5zLnB1c2gob3JnQ29sKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgdmlzaWJsZUNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGRhdGEsXG4gICAgICAgIGRhdGVGb3JtYXQsXG4gICAgICAgIHRob3VzYW5kU2VwYXJhdG9yLFxuICAgICAgICBkZWNpbWFsU2VwYXJhdG9yLFxuICAgICAgICBncmlkLFxuICAgICAgICBpbmxpbmVFZGl0LFxuICAgICAgICBmaWx0ZXJpbmcsXG4gICAgICAgIHJlZ2lvbixcbiAgICAgICAgaW50bCxcbiAgICAgICAgc2VsZWN0Q29tcG9uZW50T3B0aW9ucyxcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgICBjb25zdCB2YWx1ZUVtcHR5Q2hlY2tlciA9IFV0aWxzLmdldFZhbHVlRW1wdHlDaGVja2VyKGNvbCk7XG4gICAgICAvLyBDZWxsIHZhbHVlIHJlbmRlcmluZ1xuICAgICAgY29uc3QgdmFsdWVSZW5kZXIgPSAocm93SW5kZXgsIGZvcm1hdCkgPT4ge1xuICAgICAgICBjb25zdCB2YWwgPSBkYXRhLmdldEluKFtyb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsKSkge1xuICAgICAgICAgIHJldHVybiBjb2wuaXNSZXF1aXJlZCA/IDxNIGlkPVwiR3JpZC5WYWx1ZUlzTWlzc2luZ1wiIC8+IDogJyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvcm1hdCA/IGZvcm1hdCh2YWwpIDogdmFsO1xuICAgICAgfTtcblxuICAgICAgbGV0IGNvbHVtbiA9IEdyaWRDb2x1bW5TZXJ2aWNlLmJhc2VDb2x1bW4oY29sKTtcbiAgICAgIC8vIENvbGxlY3QgY29sdW1uIGZ1bmN0aW9ucyBpbnRvIG9uZSBPYmplY3RcbiAgICAgIGNvbnN0IGNvbHVtbkZ1bmN0aW9ucyA9IHtcbiAgICAgICAgZWRpdDoge1xuICAgICAgICAgIGdldEl0ZW1WYWx1ZTogdGhpcy5nZXRFZGl0SXRlbVZhbHVlLFxuICAgICAgICAgIG9uQ2VsbFZhbHVlQ2hhbmdlOiB0aGlzLm9uRWRpdENlbGxWYWx1ZUNoYW5nZSxcbiAgICAgICAgICBvbkNlbGxCbHVyOiB0aGlzLm9uRWRpdENlbGxCbHVyLFxuICAgICAgICAgIG9uQ2VsbEZvY3VzOiB0aGlzLm9uQ2VsbEZvY3VzLFxuICAgICAgICAgIG9uQ2VsbEtleURvd246IHRoaXMub25FZGl0Q2VsbEtleURvd24sXG4gICAgICAgICAgaGFuZGxlQ2VsbFJlZjogdGhpcy5oYW5kbGVFZGl0Q2VsbFJlZixcbiAgICAgICAgfSxcbiAgICAgICAgY3JlYXRlOiB7XG4gICAgICAgICAgZ2V0SXRlbVZhbHVlOiB0aGlzLmdldENyZWF0ZUl0ZW1WYWx1ZSxcbiAgICAgICAgICBvbkNlbGxWYWx1ZUNoYW5nZTogdGhpcy5vbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSxcbiAgICAgICAgICBvbkNlbGxCbHVyOiB0aGlzLm9uQ3JlYXRlQ2VsbEJsdXIsXG4gICAgICAgICAgb25DZWxsRm9jdXM6IHRoaXMub25DZWxsRm9jdXMsXG4gICAgICAgICAgb25DZWxsS2V5RG93bjogdGhpcy5vbkNyZWF0ZUNlbGxLZXlEb3duLFxuICAgICAgICAgIGhhbmRsZUNlbGxSZWY6IHRoaXMuaGFuZGxlQ3JlYXRlQ2VsbFJlZixcbiAgICAgICAgfSxcbiAgICAgICAgZmlsdGVyOiB7XG4gICAgICAgICAgZ2V0SXRlbVZhbHVlOiB0aGlzLmdldEZpbHRlckl0ZW1WYWx1ZSxcbiAgICAgICAgICBvbkNlbGxWYWx1ZUNoYW5nZTogdGhpcy5vbkZpbHRlckNlbGxWYWx1ZUNoYW5nZSxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIC8vIGhhbmRsZSBjb2x1bW4uY2VsbCAvIGNvbHVtbi5jZWxsRWRpdCAvIGNvbHVtbi5jZWxsQ3JlYXRlIC8gY29sdW1uLmNlbGxGaWx0ZXJcbiAgICAgIGNvbnN0IGNlbGxQcm9wcyA9IHtcbiAgICAgICAgZGF0YSxcbiAgICAgICAgZGF0ZUZvcm1hdCxcbiAgICAgICAgdGhvdXNhbmRTZXBhcmF0b3IsXG4gICAgICAgIGRlY2ltYWxTZXBhcmF0b3IsXG4gICAgICB9OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICBjb2x1bW4gPSBHcmlkQ29sdW1uU2VydmljZS5jb2x1bW5DZWxsKGNvbHVtbiwgY2VsbFByb3BzLCBjb2wsIHZhbHVlUmVuZGVyKTtcblxuICAgICAgLy8gaGFuZGxlIGNvbHVtbkNvbXBvbmVudFR5cGVzXG4gICAgICBjb25zdCBjb21wb25lbnRUeXBlUHJvcHMgPSB7XG4gICAgICAgIC4uLmNlbGxQcm9wcyxcbiAgICAgICAgZ3JpZCxcbiAgICAgICAgaW5saW5lRWRpdCxcbiAgICAgICAgZmlsdGVyaW5nLFxuICAgICAgICByZWdpb24sXG4gICAgICAgIGludGwsXG4gICAgICAgIHNlbGVjdENvbXBvbmVudE9wdGlvbnMsXG4gICAgICB9OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICBjb2x1bW4gPSBHcmlkQ29sdW1uU2VydmljZS5jb2x1bW5Db21wb25lbnRUeXBlKFxuICAgICAgICBjb2x1bW4sXG4gICAgICAgIHRhYkluZGV4LFxuICAgICAgICBjb21wb25lbnRUeXBlUHJvcHMsXG4gICAgICAgIGNvbCxcbiAgICAgICAgY29sdW1uRnVuY3Rpb25zLFxuICAgICAgICB0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUsXG4gICAgICApO1xuXG4gICAgICBjb2x1bW5zLnB1c2goY29sdW1uKTtcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLnByb3BzLmlzQ3JlYXRpbmcpIHtcbiAgICAgIGNvbHVtbnMucHVzaCh7XG4gICAgICAgIHdpZHRoOiAzNyxcbiAgICAgICAgaXNSZXNpemFibGU6IGZhbHNlLFxuICAgICAgICBjb2x1bW5LZXk6ICdyZW1vdmVOZXdJdGVtJyxcbiAgICAgICAgY2VsbDogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbEVkaXQ6ICgpID0+IG51bGwsXG4gICAgICAgIGNlbGxDcmVhdGU6IHJvd0luZGV4ID0+IChcbiAgICAgICAgICA8SWNvblxuICAgICAgICAgICAgaWQ9e2BvYy1kYXRhZ3JpZC1uZXctaXRlbS1yZW1vdmUtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgIHR5cGU9XCJpbmRpY2F0b3JcIlxuICAgICAgICAgICAgbmFtZT1cImRlbGV0ZVwiXG4gICAgICAgICAgICB3aWR0aD17MzB9XG4gICAgICAgICAgICBoZWlnaHQ9ezMwfVxuICAgICAgICAgICAgc3R5bGU9e3sgcGFkZGluZzogJzdweCcgfX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMucHJvcHMucmVtb3ZlTmV3SXRlbSh0aGlzLnByb3BzLmdyaWQsIHJvd0luZGV4KX1cbiAgICAgICAgICAvPlxuICAgICAgICApLFxuICAgICAgICBjZWxsRmlsdGVyOiAoKSA9PiBudWxsLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBjb2x1bW5zO1xuICB9O1xuXG4gIGlzQ2VsbEVkaXRlZCA9IChyb3dJbmRleCwgY29sLCBjZWxsVHlwZSkgPT4ge1xuICAgIGlmIChjZWxsVHlwZSAhPT0gJ2VkaXQnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICByZXR1cm4gISF0aGlzLnByb3BzLmVkaXREYXRhLmdldEluKFtpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICB9O1xuXG4gIGhhbmRsZUFmdGVyQWRkSXRlbSA9ICgpID0+IHtcbiAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsID0gdHJ1ZTtcbiAgfTtcblxuICBoYW5kbGVBZnRlckVkaXRQcmVzcyA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLnNpemUpIHtcbiAgICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gdHJ1ZTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjdXJyZW50Um93OiB1bmRlZmluZWQsXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlQWZ0ZXJWYWxpZGF0aW9uRXJyb3IgPSAoKSA9PiB7XG4gICAgdGhpcy5mb2N1c1RvRXJyb3JDZWxsID0gdHJ1ZTtcbiAgfTtcblxuICBoYW5kbGVSb3dDbGljayA9IChlLCByb3dJbmRleCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnJvd1NlbGVjdCAmJiAhdGhpcy5wcm9wcy5pc0NyZWF0aW5nICYmICF0aGlzLnByb3BzLmlzRWRpdGluZykge1xuICAgICAgaWYgKGUuY3RybEtleSB8fCBlLnNoaWZ0S2V5KSB7XG4gICAgICAgIGRvY3VtZW50LmdldFNlbGVjdGlvbigpXG4gICAgICAgICAgLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgfVxuICAgICAgLy8gRG9uJ3QgdHJpZ2dlciBzZWxlY3Rpb24gY2hhbmdlIG9uIHdoZW4gdXNlciBjbGlja3Mgb24gc3BlY2lhbCBjZWxscyBsaWtlIGNoZWNrYm94L2V4dHJhXG4gICAgICAvLyBDaGVjayB0aGF0IGNsaWNrZWQgbm9kZSdzIHBhcmVudCBvciBwYXJlbnQncyBwYXJlbnQgZG9lc24ndCBoYXZlIG5vLXJvdy1zZWxlY3QgY2xhc3NcbiAgICAgIGNvbnN0IHsgcGFyZW50Tm9kZSB9ID0gZS50YXJnZXQ7XG4gICAgICBjb25zdCBwYXJlbnQxY2xhc3MgPSBwYXJlbnROb2RlLmNsYXNzTmFtZSAmJiBwYXJlbnROb2RlLmNsYXNzTmFtZS5pbmRleE9mXG4gICAgICAgID8gcGFyZW50Tm9kZS5jbGFzc05hbWVcbiAgICAgICAgOiAnJztcbiAgICAgIGNvbnN0IHBhcmVudDJjbGFzcyA9IHBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUgJiYgcGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZS5pbmRleE9mIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgPyBwYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgIDogJyc7XG4gICAgICBjb25zdCBwYXJlbnQzY2xhc3MgPSBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUgJiYgcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lLmluZGV4T2YgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICA/IHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZVxuICAgICAgICA6ICcnO1xuICAgICAgY29uc3QgcGFyZW50NGNsYXNzID0gcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUgJiYgcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUuaW5kZXhPZiAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgID8gcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWVcbiAgICAgICAgOiAnJztcbiAgICAgIGlmIChcbiAgICAgICAgcGFyZW50MWNsYXNzLmluZGV4T2YoJ25vLXJvdy1zZWxlY3QnKSA9PT0gLTEgJiZcbiAgICAgICAgcGFyZW50MmNsYXNzLmluZGV4T2YoJ25vLXJvdy1zZWxlY3QnKSA9PT0gLTEgJiZcbiAgICAgICAgcGFyZW50M2NsYXNzLmluZGV4T2YoJ25vLXJvdy1zZWxlY3QnKSA9PT0gLTEgJiZcbiAgICAgICAgcGFyZW50NGNsYXNzLmluZGV4T2YoJ25vLXJvdy1zZWxlY3QnKSA9PT0gLTFcbiAgICAgICkge1xuICAgICAgICB0aGlzLnByb3BzLml0ZW1TZWxlY3Rpb25DaGFuZ2UoXG4gICAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgIHRoaXMucHJvcHMubXVsdGlTZWxlY3QgJiYgZS5jdHJsS2V5LFxuICAgICAgICAgIHRoaXMucHJvcHMubXVsdGlTZWxlY3QgJiYgZS5zaGlmdEtleSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMub25Sb3dDbGljaykge1xuICAgICAgdGhpcy5wcm9wcy5vblJvd0NsaWNrKGUsIHJvd0luZGV4LCB0aGlzLnByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGhhbmRsZUNvbnRleHRNZW51ID0gKGUsIHJvd0luZGV4KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuY29udGV4dE1lbnVJdGVtcykge1xuICAgICAgY29uc3Qge1xuICAgICAgICBpdGVtU2VsZWN0aW9uQ2hhbmdlLFxuICAgICAgICBzZWxlY3RlZEl0ZW1zLFxuICAgICAgICBncmlkLFxuICAgICAgICBkYXRhLFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGNvbnRleHRNZW51T3BlbjogdHJ1ZSxcbiAgICAgICAgY29udGV4dE1lbnVYOiBlLmNsaWVudFgsXG4gICAgICAgIGNvbnRleHRNZW51WTogZS5jbGllbnRZLFxuICAgICAgfSk7XG4gICAgICAvLyBJZiBjbGlja2VkIGl0ZW0gaXMgbm90IHNlbGVjdGVkLCBjaGFuZ2Ugc2VsZWN0aW9uIHRvIGl0XG4gICAgICBpZiAoIXNlbGVjdGVkSXRlbXMuaW5jbHVkZXMoZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmdyaWQuaWRLZXlQYXRoXSkpKSB7XG4gICAgICAgIGl0ZW1TZWxlY3Rpb25DaGFuZ2UoZ3JpZCwgcm93SW5kZXgpO1xuICAgICAgfVxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uRG9jdW1lbnRDbGljayk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGhhbmRsZUNvbnRleHRNZW51SXRlbUNsaWNrID0gKG9uQ2xpY2ssIHNlbGVjdGVkSXRlbXMsIHNlbGVjdGVkRGF0YSkgPT4gKCkgPT4ge1xuICAgIG9uQ2xpY2soc2VsZWN0ZWRJdGVtcywgc2VsZWN0ZWREYXRhKTtcbiAgfTtcblxuICBoYW5kbGVSb3dIZWlnaHRHZXR0ZXIgPSByb3dJbmRleCA9PlxuICAgIHRoaXMucHJvcHMucm93SGVpZ2h0R2V0dGVyKHRoaXMucHJvcHMuZGF0YS5nZXQocm93SW5kZXgpLCByb3dJbmRleCk7XG5cbiAgcmVuZGVyQ2VsbCA9IGNvbCA9PiAoY2VsbFByb3BzKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgaXNDcmVhdGluZyxcbiAgICAgIGlzRWRpdGluZyxcbiAgICAgIGNyZWF0ZURhdGEsXG4gICAgICBzZWxlY3RlZENlbGwsXG4gICAgICBncmlkLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgcm93SW5kZXgsIC4uLnByb3BzIH0gPSBjZWxsUHJvcHM7XG4gICAgbGV0IGNlbGw7XG4gICAgbGV0IGNlbGxUeXBlID0gJ3ZpZXcnO1xuICAgIGxldCBleHRyYVJvd0NvdW50ID0gMDsgLy8gaG93IG1hbnkgcm93cyB0byBpZ25vcmUgZnJvbSB0b3AsIG5ldyArIGZpbHRlciByb3dzXG4gICAgaWYgKGlzQ3JlYXRpbmcpIGV4dHJhUm93Q291bnQgPSBjcmVhdGVEYXRhLnNpemU7XG4gICAgaWYgKGlzQ3JlYXRpbmcpIHtcbiAgICAgIGlmIChyb3dJbmRleCA8PSAoZXh0cmFSb3dDb3VudCAtIDEpKSB7XG4gICAgICAgIGlmIChjb2wuY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNlbGwgPSBjb2wuY2VsbENyZWF0ZShyb3dJbmRleCk7XG4gICAgICAgICAgY2VsbFR5cGUgPSAnY3JlYXRlJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjZWxsID0gbnVsbDtcbiAgICAgICAgICBjZWxsVHlwZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNlbGwgPSBjb2wuY2VsbChyb3dJbmRleCAtIGV4dHJhUm93Q291bnQpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNFZGl0aW5nICYmIGNvbC5jZWxsRWRpdCkge1xuICAgICAgY2VsbCA9IGNvbC5jZWxsRWRpdChyb3dJbmRleCAtIGV4dHJhUm93Q291bnQpO1xuICAgICAgY2VsbFR5cGUgPSAnZWRpdCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNlbGwgPSBjb2wuY2VsbChyb3dJbmRleCAtIGV4dHJhUm93Q291bnQpO1xuICAgIH1cbiAgICBjb25zdCBpc1NwZWNpYWwgPSBwcm9wcy5jb2x1bW5LZXkgPT09ICdzZWxlY3Rpb25DaGVja2JveCcgfHwgcHJvcHMuY29sdW1uS2V5ID09PSAnZXh0cmFDb2x1bW4nO1xuICAgIGlmICgoY2VsbFR5cGUgPT09ICd2aWV3JyB8fCBjZWxsVHlwZSA9PT0gJ2VkaXQnIHx8IGNlbGxUeXBlID09PSAnY3JlYXRlJykgJiYgIWlzU3BlY2lhbCkge1xuICAgICAgY29uc3QgZ2V0Um93SW5kZXggPSAoY2VsbFR5cGUgPT09ICdjcmVhdGUnKSA/IHJvd0luZGV4IDogKHJvd0luZGV4IC0gZXh0cmFSb3dDb3VudCk7XG4gICAgICBjb25zdCBtZXNzYWdlRGF0YSA9IHRoaXMuZ2V0Q2VsbE1lc3NhZ2VzKGdldFJvd0luZGV4LCBjb2wsIGNlbGxUeXBlKTtcbiAgICAgIGNvbnN0IGlzRWRpdGVkID0gdGhpcy5pc0NlbGxFZGl0ZWQoZ2V0Um93SW5kZXgsIGNvbCwgY2VsbFR5cGUpO1xuICAgICAgY29uc3QgY2xhc3NOYW1lID0gKHNlbGVjdGVkQ2VsbC5nZXQoJ3Jvd0luZGV4JykgPT09IHJvd0luZGV4ICYmIHNlbGVjdGVkQ2VsbC5nZXQoJ2NvbHVtbktleScpID09PSBwcm9wcy5jb2x1bW5LZXkpID9cbiAgICAgICAgJ29jLWRhdGFncmlkLWNlbGwgaXMtc2VsZWN0ZWQnIDogJ29jLWRhdGFncmlkLWNlbGwnO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPENlbGxcbiAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG4gICAgICAgICAgc3R5bGU9e2NvbC5zdHlsZX1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNlbGxTZWxlY3QoY2VsbFR5cGUsIHJvd0luZGV4LCBwcm9wcy5jb2x1bW5LZXkpfVxuICAgICAgICA+XG4gICAgICAgICAgPENlbGxUb29sdGlwXG4gICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRDZWxsLSR7Z3JpZC5pZH0tJHtwcm9wcy5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgIGlzRWRpdGVkPXtpc0VkaXRlZH1cbiAgICAgICAgICAgIGlzRXJyb3I9eyEhbWVzc2FnZURhdGEuZXJyb3JNZXNzYWdlfVxuICAgICAgICAgICAgaXNXYXJuaW5nPXshIW1lc3NhZ2VEYXRhLndhcm5pbmdNZXNzYWdlfVxuICAgICAgICAgICAgaW5mb01lc3NhZ2U9e21lc3NhZ2VEYXRhLmluZm9NZXNzYWdlfVxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlPXttZXNzYWdlRGF0YS5lcnJvck1lc3NhZ2V9XG4gICAgICAgICAgICB3YXJuaW5nTWVzc2FnZT17bWVzc2FnZURhdGEud2FybmluZ01lc3NhZ2V9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2NlbGx9XG4gICAgICAgICAgPC9DZWxsVG9vbHRpcD5cbiAgICAgICAgPC9DZWxsPlxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxDZWxsIHsuLi5wcm9wc30gY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtY2VsbFwiIHN0eWxlPXtjb2wuc3R5bGV9PntjZWxsfTwvQ2VsbD5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlckNvbHVtbnMgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmFsbERhdGFTaXplICYmICF0aGlzLnByb3BzLmlzQnVzeSAmJiAhdGhpcy5wcm9wcy5pc0NyZWF0aW5nKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Q29sdW1uXG4gICAgICAgICAgY29sdW1uS2V5PVwiZGF0YUVtcHR5Q29sdW1uXCJcbiAgICAgICAgICBoZWFkZXI9ezxDZWxsIHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicgfX0+PE0gaWQ9XCJHcmlkLk5vSXRlbXNcIiAvPjwvQ2VsbD59XG4gICAgICAgICAgd2lkdGg9ezEwfVxuICAgICAgICAgIGlzUmVzaXphYmxlPXtmYWxzZX1cbiAgICAgICAgICBmbGV4R3Jvdz17MX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICAgIGlmICghdGhpcy5wcm9wcy52aXNpYmxlQ29sdW1ucy5zaXplKSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5pc0J1c3kpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8Q29sdW1uXG4gICAgICAgICAgICBjb2x1bW5LZXk9XCJkYXRhRW1wdHlDb2x1bW5cIlxuICAgICAgICAgICAgaGVhZGVyPXs8Q2VsbD4mbmJzcDs8L0NlbGw+fVxuICAgICAgICAgICAgd2lkdGg9ezEwfVxuICAgICAgICAgICAgaXNSZXNpemFibGU9e2ZhbHNlfVxuICAgICAgICAgICAgZmxleEdyb3c9ezF9XG4gICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxDb2x1bW5cbiAgICAgICAgICBjb2x1bW5LZXk9XCJkYXRhRW1wdHlDb2x1bW5cIlxuICAgICAgICAgIGhlYWRlcj17PENlbGwgc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJyB9fT48TSBpZD1cIkdyaWQuTm9Db2x1bW5zXCIgLz48L0NlbGw+fVxuICAgICAgICAgIHdpZHRoPXsxMH1cbiAgICAgICAgICBpc1Jlc2l6YWJsZT17ZmFsc2V9XG4gICAgICAgICAgZmxleEdyb3c9ezF9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCBjb2x1bW5zID0gdGhpcy5nZW5lcmF0ZUNvbHVtbnMoKTtcbiAgICBpZiAoY29sdW1ucy5sZW5naHQgPT09IDApIHJldHVybiBudWxsO1xuICAgIHJldHVybiBjb2x1bW5zLm1hcChjb2wgPT4gKFxuICAgICAgPENvbHVtblxuICAgICAgICBrZXk9e2NvbC5jb2x1bW5LZXl9XG4gICAgICAgIGNvbHVtbktleT17Y29sLmNvbHVtbktleX1cbiAgICAgICAgaGVhZGVyPXtcbiAgICAgICAgICA8SGVhZGVyQ2VsbFxuICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkSGVhZGVyLSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbC5jb2x1bW5LZXl9YH1cbiAgICAgICAgICAgIGdyaWQ9e3RoaXMucHJvcHMuZ3JpZH1cbiAgICAgICAgICAgIGNvbHVtbnM9e3RoaXMucHJvcHMuY29sdW1uc31cbiAgICAgICAgICAgIGNvbHVtbj17Y29sfVxuICAgICAgICAgICAgY3VycmVudFNvcnRDb2x1bW49e3RoaXMucHJvcHMuc29ydENvbHVtbn1cbiAgICAgICAgICAgIGN1cnJlbnRTb3J0T3JkZXI9e3RoaXMucHJvcHMuc29ydE9yZGVyfVxuICAgICAgICAgICAgb25Tb3J0Q2hhbmdlPXt0aGlzLnByb3BzLnNvcnRDaGFuZ2V9XG4gICAgICAgICAgICBpc0J1c3k9e3RoaXMucHJvcHMuaXNCdXN5fVxuICAgICAgICAgICAgZmlsdGVyaW5nPXt0aGlzLnByb3BzLmlzRmlsdGVyaW5nfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtjb2wuaGVhZGVyfVxuICAgICAgICAgIDwvSGVhZGVyQ2VsbD5cbiAgICAgICAgfVxuICAgICAgICBjZWxsPXt0aGlzLnJlbmRlckNlbGwoY29sKX1cbiAgICAgICAgd2lkdGg9e3RoaXMucHJvcHMuY29sdW1uV2lkdGhzLmdldChjb2wuY29sdW1uS2V5LCBjb2wud2lkdGgpfVxuICAgICAgICBtaW5XaWR0aD17Y29sLm1pbldpZHRofVxuICAgICAgICBtYXhXaWR0aD17Y29sLm1heFdpZHRofVxuICAgICAgICBpc1Jlc2l6YWJsZT17Y29sLmlzUmVzaXphYmxlfVxuICAgICAgICBmbGV4R3Jvdz17Y29sLmZsZXhHcm93ID8gY29sLmZsZXhHcm93IDogMH1cbiAgICAgICAgZml4ZWQ9e2NvbC5maXhlZH1cbiAgICAgICAgYWxsb3dDZWxsc1JlY3ljbGluZz17Y29sLmFsbG93Q2VsbHNSZWN5Y2xpbmd9XG4gICAgICAvPikpO1xuICB9O1xuXG4gIHJlbmRlckNvbnRleHRNZW51ID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGNvbnRleHRNZW51SXRlbXMsXG4gICAgICBkYXRhLFxuICAgICAgZ3JpZCxcbiAgICAgIHNlbGVjdGVkSXRlbXMsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge1xuICAgICAgY29udGV4dE1lbnVYLFxuICAgICAgY29udGV4dE1lbnVZLFxuICAgIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHN0eWxlID0ge1xuICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgIHpJbmRleDogMTAwMDAsXG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIHRvcDogYCR7Y29udGV4dE1lbnVZfXB4YCxcbiAgICAgIGxlZnQ6IGAke2NvbnRleHRNZW51WH1weGAsXG4gICAgfTtcbiAgICBjb25zdCBzZWxlY3RlZERhdGEgPSBkYXRhLmZpbHRlcihkID0+IHNlbGVjdGVkSXRlbXMuaW5jbHVkZXMoZC5nZXRJbihncmlkLmlkS2V5UGF0aCkpKTtcbiAgICByZXR1cm4gKFxuICAgICAgPHVsIGNsYXNzTmFtZT1cImRyb3Bkb3duLW1lbnUgb2MtZGF0YWdyaWQtY29udGV4dC1tZW51IG9wZW5cIiBzdHlsZT17c3R5bGV9PlxuICAgICAgICB7Y29udGV4dE1lbnVJdGVtcyAmJiBjb250ZXh0TWVudUl0ZW1zLm1hcCAmJiBjb250ZXh0TWVudUl0ZW1zLm1hcCgoaXRlbSwgaSkgPT4ge1xuICAgICAgICAgIGxldCB7IGRpc2FibGVkIH0gPSBpdGVtO1xuICAgICAgICAgIGlmICh0eXBlb2YgaXRlbS5kaXNhYmxlZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZGlzYWJsZWQgPSBpdGVtLmRpc2FibGVkKHNlbGVjdGVkSXRlbXMsIHNlbGVjdGVkRGF0YSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8TWVudUl0ZW1cbiAgICAgICAgICAgICAga2V5PXtpfSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgICAgICAgIGhlYWRlcj17aXRlbS5oZWFkZXJ9XG4gICAgICAgICAgICAgIGRpdmlkZXI9e2l0ZW0uZGl2aWRlcn1cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgICB0aXRsZT17aXRlbS50aXRsZX1cbiAgICAgICAgICAgICAgb25DbGljaz17KGRpc2FibGVkIHx8ICFpdGVtLm9uQ2xpY2spID8gbnVsbCA6IHRoaXMuaGFuZGxlQ29udGV4dE1lbnVJdGVtQ2xpY2soXG4gICAgICAgICAgICAgICAgaXRlbS5vbkNsaWNrLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkSXRlbXMsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWREYXRhLFxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7aXRlbS52YWx1ZX1cbiAgICAgICAgICAgIDwvTWVudUl0ZW0+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSl9XG4gICAgICA8L3VsPlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGdyaWRDbGFzc05hbWUgPSBjbGFzc05hbWVzKHtcbiAgICAgICdvYy1kYXRhZ3JpZC1jb250YWluZXInOiB0cnVlLFxuICAgICAgJ3dpdGgtYWN0aW9uYmFyJzogdGhpcy5wcm9wcy5pbmxpbmVFZGl0ICYmICF0aGlzLnByb3BzLmRpc2FibGVBY3Rpb25CYXIsXG4gICAgICAnaXMtYnVzeSc6IHRoaXMucHJvcHMuaXNCdXN5LFxuICAgICAgJ2lzLWVkaXRpbmcnOiB0aGlzLnByb3BzLmlzRWRpdGluZyxcbiAgICAgICdpcy1jcmVhdGluZyc6IHRoaXMucHJvcHMuaXNDcmVhdGluZyxcbiAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgfSk7XG5cbiAgICAvLyBjaGVjayBpZiB0aGVyZSBpcyBhIG5ldyByZXF1ZXN0IHRvIGNoYW5nZSBlZGl0IG1vZGUgZm9jdXNcbiAgICB0aGlzLnNldEZvY3VzVG8odGhpcy5wcm9wcy5mb2N1c1R5cGUpO1xuXG4gICAgbGV0IGFjdGlvbkJhciA9IG51bGw7XG4gICAgbGV0IGFjdGlvbkJhclJpZ2h0ID0gbnVsbDtcbiAgICBsZXQgYWN0aW9uQmFyTGVmdCA9IG51bGw7XG4gICAgaWYgKFxuICAgICAgKHRoaXMucHJvcHMuYWN0aW9uQmFyIHx8XG4gICAgICAgIHRoaXMucHJvcHMuaW5saW5lRWRpdCB8fFxuICAgICAgICB0aGlzLnByb3BzLmZpbHRlcmluZyB8fFxuICAgICAgICB0aGlzLnByb3BzLnJlbW92aW5nKSAmJlxuICAgICAgIXRoaXMucHJvcHMuZGlzYWJsZUFjdGlvbkJhclxuICAgICkge1xuICAgICAgYWN0aW9uQmFyUmlnaHQgPSAoXG4gICAgICAgIDxBY3Rpb25CYXIgcG9zaXRpb249XCJyaWdodFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtYWN0aW9uYmFyLXJpZ2h0XCI+e3RoaXMucHJvcHMuYWN0aW9uQmFyfTwvZGl2PlxuICAgICAgICAgIHsodGhpcy5wcm9wcy5maWx0ZXJpbmcgJiYgdGhpcy5wcm9wcy5kaXNhYmxlRHJvcGRvd24gJiZcbiAgICAgICAgICAgICF0aGlzLnByb3BzLmRpc2FibGVGaWx0ZXJpbmdDb250cm9scykgJiYgPEZpbHRlcmluZ0NvbnRyb2xzIHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICAgIH1cbiAgICAgICAgICB7dGhpcy5wcm9wcy5pbmxpbmVFZGl0ICYmXG4gICAgICAgICAgPElubGluZUVkaXRDb250cm9sc1xuICAgICAgICAgICAgYWZ0ZXJBZGRJdGVtPXt0aGlzLmhhbmRsZUFmdGVyQWRkSXRlbX1cbiAgICAgICAgICAgIGFmdGVyRWRpdFByZXNzPXt0aGlzLmhhbmRsZUFmdGVyRWRpdFByZXNzfVxuICAgICAgICAgICAgYWZ0ZXJWYWxpZGF0aW9uRXJyb3I9e3RoaXMuaGFuZGxlQWZ0ZXJWYWxpZGF0aW9uRXJyb3J9XG4gICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAvPlxuICAgICAgICAgIH1cbiAgICAgICAgICB7KHRoaXMucHJvcHMuZHJvcGRvd25NZW51SXRlbXMgfHxcbiAgICAgICAgICAgIHRoaXMucHJvcHMucmVtb3ZpbmcgfHxcbiAgICAgICAgICAgIHRoaXMucHJvcHMuY29sdW1uU2V0dGluZ3MgfHxcbiAgICAgICAgICAgICh0aGlzLnByb3BzLmZpbHRlcmluZyAmJlxuICAgICAgICAgICAgICAhdGhpcy5wcm9wcy5kaXNhYmxlRHJvcGRvd24pKSAmJiA8RHJvcGRvd25Db250cm9scyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgICB9XG4gICAgICAgIDwvQWN0aW9uQmFyPlxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuYWN0aW9uQmFyTGVmdCB8fCB0aGlzLnByb3BzLmdyaWRIZWFkZXIpIHtcbiAgICAgIGFjdGlvbkJhckxlZnQgPSAoXG4gICAgICAgIDxBY3Rpb25CYXIgcG9zaXRpb249XCJsZWZ0XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1ncmlkaGVhZGVyXCI+e3RoaXMucHJvcHMuZ3JpZEhlYWRlcn08L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWFjdGlvbmJhci1sZWZ0XCI+e3RoaXMucHJvcHMuYWN0aW9uQmFyTGVmdH08L2Rpdj5cbiAgICAgICAgPC9BY3Rpb25CYXI+XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoYWN0aW9uQmFyTGVmdCB8fCBhY3Rpb25CYXJSaWdodCkge1xuICAgICAgYWN0aW9uQmFyID0gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWFjdGlvbmJhci1jb250YWluZXJcIj5cbiAgICAgICAgICB7YWN0aW9uQmFyTGVmdH1cbiAgICAgICAgICB7YWN0aW9uQmFyUmlnaHR9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gICAgbGV0IHJvd3NDb3VudCA9XG4gICAgICAodGhpcy5wcm9wcy5yb3dzQ291bnQgfHwgdGhpcy5wcm9wcy5yb3dzQ291bnQgPT09IDApID9cbiAgICAgICAgdGhpcy5wcm9wcy5yb3dzQ291bnQgOlxuICAgICAgICB0aGlzLnByb3BzLmRhdGEuc2l6ZTtcbiAgICBpZiAodGhpcy5wcm9wcy5pc0NyZWF0aW5nKSByb3dzQ291bnQgKz0gdGhpcy5wcm9wcy5jcmVhdGVEYXRhLnNpemU7XG4gICAgaWYgKCF0aGlzLnByb3BzLnZpc2libGVDb2x1bW5zLnNpemUpIHJvd3NDb3VudCA9IDA7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9e2BvYy1kYXRhZ3JpZC0ke3RoaXMucHJvcHMuZ3JpZC5pZH1gfVxuICAgICAgICBjbGFzc05hbWU9e2dyaWRDbGFzc05hbWV9XG4gICAgICAgIHN0eWxlPXt0aGlzLnByb3BzLmNvbnRhaW5lclN0eWxlfVxuICAgICAgPlxuICAgICAgICB7dGhpcy5wcm9wcy5pc0J1c3kgJiYgPFNwaW5uZXIgLz59XG4gICAgICAgIHt0aGlzLnN0YXRlLmNvbnRleHRNZW51T3BlbiAmJiB0aGlzLnJlbmRlckNvbnRleHRNZW51KCl9XG4gICAgICAgIHthY3Rpb25CYXJ9XG4gICAgICAgIDxSZXNwb25zaXZlRml4ZWREYXRhVGFibGVcbiAgICAgICAgICBpZD17dGhpcy5wcm9wcy5ncmlkLmlkfVxuICAgICAgICAgIHJvd3NDb3VudD17cm93c0NvdW50fVxuICAgICAgICAgIGhlYWRlckhlaWdodD17dGhpcy5wcm9wcy5pc0ZpbHRlcmluZyA/XG4gICAgICAgICAgICB0aGlzLnByb3BzLmhlYWRlckhlaWdodCArIHRoaXMucHJvcHMuZmlsdGVyUm93SGVpZ2h0XG4gICAgICAgICAgICA6IHRoaXMucHJvcHMuaGVhZGVySGVpZ2h0fVxuICAgICAgICAgIHJvd0hlaWdodD17dGhpcy5wcm9wcy5yb3dIZWlnaHR9XG4gICAgICAgICAgb25Db2x1bW5SZXNpemVFbmRDYWxsYmFjaz17dGhpcy5vbkNvbHVtblJlc2l6ZUVuZENhbGxiYWNrfVxuICAgICAgICAgIGlzQ29sdW1uUmVzaXppbmc9e2ZhbHNlfVxuICAgICAgICAgIG9uUm93Q2xpY2s9e3RoaXMuaGFuZGxlUm93Q2xpY2t9XG4gICAgICAgICAgc2Nyb2xsVG9Db2x1bW49e3RoaXMucHJvcHMuc2Nyb2xsVG9Db2x1bW4gfHwgdGhpcy5zdGF0ZS5jdXJyZW50Q29sdW1ufVxuICAgICAgICAgIHNjcm9sbFRvcD17dGhpcy5wcm9wcy5zY3JvbGxUb3B9XG4gICAgICAgICAgc2Nyb2xsVG9Sb3c9e3RoaXMuZ2V0U2Nyb2xsVG9Sb3coKX1cbiAgICAgICAgICBvblJvd0RvdWJsZUNsaWNrPXt0aGlzLnByb3BzLm9uUm93RG91YmxlQ2xpY2t9XG4gICAgICAgICAgb25Sb3dNb3VzZURvd249e3RoaXMucHJvcHMub25Nb3VzZURvd259XG4gICAgICAgICAgb25Sb3dNb3VzZUVudGVyPXt0aGlzLnByb3BzLm9uUm93TW91c2VFbnRlcn1cbiAgICAgICAgICBvblJvd01vdXNlTGVhdmU9e3RoaXMucHJvcHMub25Sb3dNb3VzZUxlYXZlfVxuICAgICAgICAgIG9uU2Nyb2xsU3RhcnQ9e3RoaXMucHJvcHMub25TY3JvbGxTdGFydH1cbiAgICAgICAgICBvblNjcm9sbEVuZD17dGhpcy5wcm9wcy5vblNjcm9sbEVuZH1cbiAgICAgICAgICByb3dDbGFzc05hbWVHZXR0ZXI9e3RoaXMuZ2V0Um93Q2xhc3NOYW1lfVxuICAgICAgICAgIHJvd0hlaWdodEdldHRlcj17dGhpcy5wcm9wcy5yb3dIZWlnaHRHZXR0ZXIgJiYgdGhpcy5oYW5kbGVSb3dIZWlnaHRHZXR0ZXJ9XG4gICAgICAgICAgb25Db250ZW50SGVpZ2h0Q2hhbmdlPXt0aGlzLnByb3BzLm9uQ29udGVudEhlaWdodENoYW5nZX1cbiAgICAgICAgICBvblJvd0NvbnRleHRNZW51PXt0aGlzLmhhbmRsZUNvbnRleHRNZW51fVxuICAgICAgICA+XG4gICAgICAgICAge3RoaXMucmVuZGVyQ29sdW1ucygpfVxuICAgICAgICA8L1Jlc3BvbnNpdmVGaXhlZERhdGFUYWJsZT5cbiAgICAgICAge3RoaXMucHJvcHMuaXNDb2x1bW5TZXR0aW5nc01vZGFsT3BlbiAmJlxuICAgICAgICA8Q29sdW1uU2V0dGluZ3NNb2RhbFxuICAgICAgICAgIGdyaWQ9e3RoaXMucHJvcHMuZ3JpZH1cbiAgICAgICAgICBjb2x1bW5zPXt0aGlzLnByb3BzLmNvbHVtbnN9XG4gICAgICAgICAgdmlzaWJsZUNvbHVtbnM9e3RoaXMucHJvcHMudmlzaWJsZUNvbHVtbnN9XG4gICAgICAgICAgY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsPXt0aGlzLnByb3BzLmNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbH1cbiAgICAgICAgICBzYXZlQ29sdW1uU2V0dGluZ3M9e3RoaXMucHJvcHMuc2F2ZUNvbHVtblNldHRpbmdzfVxuICAgICAgICAvPlxuICAgICAgICB9XG4gICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEYXRhR3JpZDtcbiJdfQ==