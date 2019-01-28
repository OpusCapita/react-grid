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
                }
                disabled = _nextElement2 ? _nextElement2.disabled : false;
              }
              if (!disabled && _nextElement2) {
                if (_nextElement2.selectRef) _nextElement2 = _this2.getSelectRef(_nextElement2);
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
    if (component.selectRef.select.select) return component.selectRef.select.select.inputRef;
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
    } else if (col.componentType === 'select') {
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
        fixedRight: col.fixedRight,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbImRhdGFncmlkQWN0aW9ucyIsIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwib3duUHJvcHMiLCJHUklEIiwiZ3JpZCIsImlzQnVzeSIsImRhdGFncmlkIiwiZ2V0SW4iLCJpZCIsImlzRWRpdGluZyIsImlzQ3JlYXRpbmciLCJpc0ZpbHRlcmluZyIsImlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW4iLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwidmlzaWJsZUNvbHVtbnMiLCJjb2x1bW5XaWR0aHMiLCJzZWxlY3RlZENlbGwiLCJzZWxlY3RlZEl0ZW1zIiwiZGF0YSIsImVkaXREYXRhIiwiY3JlYXRlRGF0YSIsImZpbHRlckRhdGEiLCJjZWxsTWVzc2FnZXMiLCJjcmVhdGVDZWxsTWVzc2FnZXMiLCJhbGxEYXRhU2l6ZSIsInNpemUiLCJsYW5ndWFnZSIsIlV0aWxzIiwiZ2V0TGFuZ3VhZ2UiLCJ1c2VyIiwicmVnaW9uIiwiZ2V0UmVnaW9uIiwiZGF0ZUZvcm1hdCIsImdldERhdGVGb3JtYXQiLCJ0aG91c2FuZFNlcGFyYXRvciIsImdldFRob3VzYW5kU2VwYXJhdG9yIiwiZGVjaW1hbFNlcGFyYXRvciIsImdldERlY2ltYWxTZXBhcmF0b3IiLCJmb3JjZVJlZnJlc2hUaW1lc3RhbXAiLCJnZXQiLCJmb2N1c1R5cGUiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJEYXRhR3JpZCIsInBhZ2luYXRpb24iLCJpbmplY3RJbnRsIiwicHJvcHMiLCJjdXJyZW50Um93IiwiY3VycmVudENvbHVtbiIsImNvbnRleHRNZW51T3BlbiIsImNvbnRleHRNZW51WCIsImNvbnRleHRNZW51WSIsImNlbGxSZWZzIiwiY3JlYXRlQ2VsbFJlZnMiLCJmb2N1c1RvQ3JlYXRlQ2VsbCIsImZvY3VzVG9FZGl0Q2VsbCIsImZvY3VzVG9FcnJvckNlbGwiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImRvY3VtZW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIm9uRG9jdW1lbnRDbGljayIsImludmFsaWRhdGUiLCJyZW5kZXIiLCJncmlkQ2xhc3NOYW1lIiwiaW5saW5lRWRpdCIsImRpc2FibGVBY3Rpb25CYXIiLCJjbGFzc05hbWUiLCJzZXRGb2N1c1RvIiwiYWN0aW9uQmFyIiwiYWN0aW9uQmFyUmlnaHQiLCJhY3Rpb25CYXJMZWZ0IiwiZmlsdGVyaW5nIiwicmVtb3ZpbmciLCJkaXNhYmxlRHJvcGRvd24iLCJkaXNhYmxlRmlsdGVyaW5nQ29udHJvbHMiLCJoYW5kbGVBZnRlckFkZEl0ZW0iLCJoYW5kbGVBZnRlckVkaXRQcmVzcyIsImhhbmRsZUFmdGVyVmFsaWRhdGlvbkVycm9yIiwiZHJvcGRvd25NZW51SXRlbXMiLCJjb2x1bW5TZXR0aW5ncyIsImdyaWRIZWFkZXIiLCJyb3dzQ291bnQiLCJjb250YWluZXJTdHlsZSIsInJlbmRlckNvbnRleHRNZW51IiwiaGVhZGVySGVpZ2h0IiwiZmlsdGVyUm93SGVpZ2h0Iiwicm93SGVpZ2h0Iiwib25Db2x1bW5SZXNpemVFbmRDYWxsYmFjayIsImhhbmRsZVJvd0NsaWNrIiwic2Nyb2xsVG9Db2x1bW4iLCJzY3JvbGxUb3AiLCJnZXRTY3JvbGxUb1JvdyIsIm9uUm93RG91YmxlQ2xpY2siLCJvbk1vdXNlRG93biIsIm9uUm93TW91c2VFbnRlciIsIm9uUm93TW91c2VMZWF2ZSIsIm9uU2Nyb2xsU3RhcnQiLCJvblNjcm9sbEVuZCIsImdldFJvd0NsYXNzTmFtZSIsInJvd0hlaWdodEdldHRlciIsImhhbmRsZVJvd0hlaWdodEdldHRlciIsIm9uQ29udGVudEhlaWdodENoYW5nZSIsImhhbmRsZUNvbnRleHRNZW51IiwicmVuZGVyQ29sdW1ucyIsImNvbHVtbnMiLCJjbG9zZUNvbHVtblNldHRpbmdzTW9kYWwiLCJzYXZlQ29sdW1uU2V0dGluZ3MiLCJjaGlsZHJlbiIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyIsImNvbnRleHRNZW51SXRlbXMiLCJzZXRTdGF0ZSIsIm5ld0NvbHVtbldpZHRoIiwiY29sdW1uS2V5IiwicmVzaXplQ29sdW1uIiwib25DZWxsS2V5RG93biIsInJvd0luZGV4IiwiY29sIiwiZSIsImNyZWF0ZSIsImVuYWJsZUFycm93TmF2aWdhdGlvbiIsImFycm93S2V5cyIsIktFWV9DT0RFUyIsIkRPV04iLCJVUCIsIkxFRlQiLCJSSUdIVCIsIm9uTGFzdENlbGxUYWJQcmVzcyIsImdyaWRDb2x1bW5zIiwiZ2V0Q29sdW1uS2V5QnlJbmRleCIsImdldENvbHVtbktleSIsImkiLCJyb3dzU2l6ZSIsImN1cnJlbnRDZWxsIiwicHJveHkiLCJpc0N1cnNvckF0U3RhcnQiLCJ0eXBlIiwic2VsZWN0aW9uU3RhcnQiLCJpc0N1cnNvckF0RW5kIiwic2VsZWN0aW9uRW5kIiwidmFsdWUiLCJsZW5ndGgiLCJzZWxlY3RSZWYiLCJnZXRTZWxlY3RSZWYiLCJpbmNsdWRlcyIsImtleUNvZGUiLCJwcmV2ZW50RGVmYXVsdCIsIkVOVEVSIiwiRVNDIiwiYWRkTmV3SXRlbSIsImdldENvbHVtbkRlZmF1bHRWYWx1ZXMiLCJzZWxlY3QiLCJuZXh0RWxlbWVudCIsIm1lbnVJc09wZW4iLCJtb3ZlQ2VsbEZvY3VzIiwiVEFCIiwiY29sdW1uSW5kIiwiZmluZEluZGV4IiwiYyIsInZhbHVlS2V5UGF0aCIsImpvaW4iLCJkaXNhYmxlZCIsInJvd0luZCIsInNoaWZ0S2V5Iiwib25FZGl0Q2VsbEtleURvd24iLCJvbkNyZWF0ZUNlbGxLZXlEb3duIiwib25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UiLCJ2YWx1ZVBhcnNlciIsImV2ZW50T3JEYXRhIiwicmF3VmFsdWUiLCJ0YXJnZXQiLCJ1bmRlZmluZWQiLCJmaWx0ZXJDZWxsVmFsdWVDaGFuZ2UiLCJvbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSIsImNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSIsIm9uQ3JlYXRlVmFsdWVDaGFuZ2UiLCJvblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZSIsIm1hdGNoVmFsdWUiLCJuZXdWYWx1ZUtleVBhdGgiLCJ2IiwibmV3VmFsdWUiLCJ2YWxpZGF0b3JzIiwiY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUiLCJvbkVkaXRDZWxsVmFsdWVDaGFuZ2UiLCJkYXRhSWQiLCJnZXREYXRhSWRCeVJvd0luZGV4IiwiZWRpdENlbGxWYWx1ZUNoYW5nZSIsIm9uRWRpdFZhbHVlQ2hhbmdlIiwiZWRpdENlbGxWYWx1ZVZhbGlkYXRlIiwib25DcmVhdGVDZWxsQmx1ciIsIm9uQ3JlYXRlQmx1ciIsImdldEVkaXRJdGVtVmFsdWUiLCJvbkVkaXRDZWxsQmx1ciIsIm9uRWRpdEJsdXIiLCJvbkNlbGxGb2N1cyIsImNlbGxUeXBlIiwiaW5wdXRUeXBlIiwiY2VsbFNlbGVjdGlvbkNoYW5nZSIsImNlbGxTZWxlY3QiLCJjb21wb25lbnQiLCJpbnB1dFJlZiIsImlkS2V5UGF0aCIsImdldFNlbGVjdGVkSXRlbUluZGV4IiwiaW5kZXgiLCJvcHRpb25zIiwiZWRpdFZhbHVlIiwib3JpZ2luYWxWYWx1ZSIsImNvbXBvbmVudFR5cGUiLCJzZWxlY3RPcHRpb25zIiwiZmluZCIsIm9iaiIsIlN0cmluZyIsInJlcGxhY2UiLCJnZXRDcmVhdGVJdGVtVmFsdWUiLCJ2YWwiLCJnZXRGaWx0ZXJJdGVtVmFsdWUiLCJnZXRDb21wb25lbnREaXNhYmxlZFN0YXRlIiwibW9kZSIsImNvbXBvbmVudERpc2FibGVkIiwiZGlzYWJsZUVkaXRpbmciLCJkaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaCIsIm1hdGNoVmFsdWVLZXlQYXRoIiwicm93Q2xhc3NOYW1lcyIsImV4dHJhUm93Q291bnQiLCJwdXNoIiwiaW5kZXhPZiIsInJvd0NsYXNzTmFtZUdldHRlciIsImdldENlbGxNZXNzYWdlcyIsInJldHVybkRhdGEiLCJpbmZvTWVzc2FnZSIsImVycm9yTWVzc2FnZSIsIndhcm5pbmdNZXNzYWdlIiwic2Nyb2xsVG9Sb3ciLCJzY3JvbGxOZXdSb3ciLCJmaXJzdCIsImZvY3VzVG8iLCJwcmV2Rm9jdXNUbyIsImZvY3VzVG9MYXN0Um93IiwiaGFuZGxlQ2VsbFNlbGVjdCIsImhhbmRsZUNyZWF0ZUNlbGxSZWYiLCJyZWYiLCJmb2N1cyIsImhhbmRsZUVkaXRDZWxsUmVmIiwic2VsZWN0ZWRSb3dJbmRleCIsImNvbHVtbkluZGV4IiwiZWxlbWVudFR5cGVzIiwic2V0VGltZW91dCIsImhhbmRsZVNlbGVjdEFsbENoZWNrQm94T25DaGFuZ2UiLCJzZWxlY3RBbGxJdGVtc0NoYW5nZSIsImhhbmRsZVNlbGVjdGlvbkNoZWNrQm94T25DaGFuZ2UiLCJpdGVtU2VsZWN0aW9uQ2hhbmdlIiwiZ2VuZXJhdGVDb2x1bW5zIiwiaW50bCIsInNlbGVjdENvbXBvbmVudE9wdGlvbnMiLCJleHRyYUNvbHVtbiIsInJvd1NlbGVjdENoZWNrYm94Q29sdW1uIiwic2hvd1NlbGVjdEFsbENoZWNrYm94IiwidGFiSW5kZXgiLCJ3aWR0aCIsImlzUmVzaXphYmxlIiwiaXNTb3J0YWJsZSIsImNlbGwiLCJ2YWx1ZVJlbmRlciIsImNlbGxFZGl0IiwiY2VsbENyZWF0ZSIsImNlbGxGaWx0ZXIiLCJoZWFkZXIiLCJyb3dJdGVtIiwiaXRlbUlkIiwic2VsZWN0ZWQiLCJmb3JFYWNoIiwidmlzaWJsZUNvbHVtbktleSIsIm9yZ0NvbCIsInZhbHVlRW1wdHlDaGVja2VyIiwiZ2V0VmFsdWVFbXB0eUNoZWNrZXIiLCJmb3JtYXQiLCJpc1JlcXVpcmVkIiwiY29sdW1uIiwiR3JpZENvbHVtblNlcnZpY2UiLCJiYXNlQ29sdW1uIiwiY29sdW1uRnVuY3Rpb25zIiwiZWRpdCIsImdldEl0ZW1WYWx1ZSIsIm9uQ2VsbFZhbHVlQ2hhbmdlIiwib25DZWxsQmx1ciIsImhhbmRsZUNlbGxSZWYiLCJmaWx0ZXIiLCJjZWxsUHJvcHMiLCJjb2x1bW5DZWxsIiwiY29tcG9uZW50VHlwZVByb3BzIiwiY29sdW1uQ29tcG9uZW50VHlwZSIsInBhZGRpbmciLCJyZW1vdmVOZXdJdGVtIiwiaXNDZWxsRWRpdGVkIiwicm93U2VsZWN0IiwiY3RybEtleSIsImdldFNlbGVjdGlvbiIsInJlbW92ZUFsbFJhbmdlcyIsInBhcmVudE5vZGUiLCJwYXJlbnQxY2xhc3MiLCJwYXJlbnQyY2xhc3MiLCJwYXJlbnQzY2xhc3MiLCJwYXJlbnQ0Y2xhc3MiLCJtdWx0aVNlbGVjdCIsIm9uUm93Q2xpY2siLCJzdG9wUHJvcGFnYXRpb24iLCJjbGllbnRYIiwiY2xpZW50WSIsImFkZEV2ZW50TGlzdGVuZXIiLCJoYW5kbGVDb250ZXh0TWVudUl0ZW1DbGljayIsIm9uQ2xpY2siLCJzZWxlY3RlZERhdGEiLCJyZW5kZXJDZWxsIiwiaXNTcGVjaWFsIiwiZ2V0Um93SW5kZXgiLCJtZXNzYWdlRGF0YSIsImlzRWRpdGVkIiwic3R5bGUiLCJ0ZXh0QWxpZ24iLCJsZW5naHQiLCJtYXAiLCJzb3J0Q2hhbmdlIiwibWluV2lkdGgiLCJtYXhXaWR0aCIsImZsZXhHcm93IiwiZml4ZWQiLCJmaXhlZFJpZ2h0IiwiYWxsb3dDZWxsc1JlY3ljbGluZyIsImRpc3BsYXkiLCJ6SW5kZXgiLCJwb3NpdGlvbiIsInRvcCIsImxlZnQiLCJkIiwiaXRlbSIsImRpdmlkZXIiLCJ0aXRsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O29EQUFBOzs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUlBOztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztJQUFZQSxlOztBQUNaOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQyxrQkFBa0IsU0FBbEJBLGVBQWtCLENBQUNDLEtBQUQsRUFBUUMsUUFBUixFQUFxQjtBQUMzQyxNQUFNQyxPQUFPRCxTQUFTRSxJQUF0QjtBQUNBLFNBQU87QUFDTEMsWUFBUUosTUFBTUssUUFBTixDQUFlQyxLQUFmLENBQXFCLENBQUNKLEtBQUtLLEVBQU4sRUFB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Y2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1sb25lbHktaWYsIHByZWZlci10ZW1wbGF0ZSwgcmVhY3QvcmVxdWlyZS1kZWZhdWx0LXByb3BzICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTWFwLCBMaXN0IH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge1xuICBpbmplY3RJbnRsLFxuICBGb3JtYXR0ZWRNZXNzYWdlIGFzIE0sXG59IGZyb20gJ3JlYWN0LWludGwnO1xuaW1wb3J0IHsgQ29sdW1uLCBDZWxsIH0gZnJvbSAnZml4ZWQtZGF0YS10YWJsZS0yJztcbmltcG9ydCB7IE1lbnVJdGVtIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHsgSWNvbiB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWljb25zJztcbmltcG9ydCBTcGlubmVyIGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXNwaW5uZXInO1xuaW1wb3J0IENoZWNrYm94IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWNoZWNrYm94JztcbmltcG9ydCAnZml4ZWQtZGF0YS10YWJsZS0yL2Rpc3QvZml4ZWQtZGF0YS10YWJsZS5jc3MnO1xuXG5pbXBvcnQgUmVzcG9uc2l2ZUZpeGVkRGF0YVRhYmxlIGZyb20gJy4vcmVzcG9uc2l2ZS1maXhlZC1kYXRhLXRhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgSGVhZGVyQ2VsbCBmcm9tICcuL2hlYWRlci1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgQWN0aW9uQmFyIGZyb20gJy4vYWN0aW9uLWJhci5jb21wb25lbnQnO1xuaW1wb3J0IElubGluZUVkaXRDb250cm9scyBmcm9tICcuL2lubGluZS1lZGl0LWNvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgRmlsdGVyaW5nQ29udHJvbHMgZnJvbSAnLi9maWx0ZXJpbmctY29udHJvbHMuY29tcG9uZW50JztcbmltcG9ydCBEcm9wZG93bkNvbnRyb2xzIGZyb20gJy4vZHJvcGRvd24tY29udHJvbHMuY29tcG9uZW50JztcbmltcG9ydCAqIGFzIGRhdGFncmlkQWN0aW9ucyBmcm9tICcuL2RhdGFncmlkLmFjdGlvbnMnO1xuaW1wb3J0IENlbGxUb29sdGlwIGZyb20gJy4vY2VsbC10b29sdGlwLmNvbXBvbmVudCc7XG5pbXBvcnQgQ29sdW1uU2V0dGluZ3NNb2RhbCBmcm9tICcuL2NvbHVtbi1zZXR0aW5ncy9jb2x1bW4tc2V0dGluZ3MuY29tcG9uZW50JztcbmltcG9ydCB7IHByb3BUeXBlcywgZGVmYXVsdFByb3BzIH0gZnJvbSAnLi9kYXRhZ3JpZC5wcm9wcyc7XG5pbXBvcnQgeyBLRVlfQ09ERVMgfSBmcm9tICcuL2RhdGFncmlkLmNvbnN0YW50cyc7XG5pbXBvcnQgcGFnaW5hdGlvbiBmcm9tICcuL3BhZ2luYXRpb24uY29tcG9uZW50JztcbmltcG9ydCBVdGlscyBmcm9tICcuL2RhdGFncmlkLnV0aWxzJztcbmltcG9ydCBHcmlkQ29sdW1uU2VydmljZSBmcm9tICcuL2NvbHVtbi1zZXJ2aWNlL2NvbHVtbi1zZXJ2aWNlJztcbmltcG9ydCAnLi9kYXRhZ3JpZC5jb21wb25lbnQuc2Nzcyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSwgb3duUHJvcHMpID0+IHtcbiAgY29uc3QgR1JJRCA9IG93blByb3BzLmdyaWQ7XG4gIHJldHVybiB7XG4gICAgaXNCdXN5OiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnaXNCdXN5J10sIHRydWUpLFxuICAgIGlzRWRpdGluZzogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2lzRWRpdGluZyddLCBmYWxzZSksXG4gICAgaXNDcmVhdGluZzogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2lzQ3JlYXRpbmcnXSwgZmFsc2UpLFxuICAgIGlzRmlsdGVyaW5nOlxuICAgICAgc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdpc0ZpbHRlcmluZyddLCBmYWxzZSksXG4gICAgaXNDb2x1bW5TZXR0aW5nc01vZGFsT3BlbjpcbiAgICAgIHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdjb2x1bW5TZXR0aW5nc01vZGFsJywgJ29wZW4nXSwgZmFsc2UpLFxuICAgIHNvcnRDb2x1bW46IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ3NvcnRpbmdEYXRhJywgJ3NvcnRDb2x1bW4nXSwgbnVsbCksXG4gICAgc29ydE9yZGVyOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdzb3J0aW5nRGF0YScsICdzb3J0T3JkZXInXSwgbnVsbCksXG4gICAgdmlzaWJsZUNvbHVtbnM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ3Zpc2libGVDb2x1bW5zJ10sIExpc3QoKSksXG4gICAgY29sdW1uV2lkdGhzOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdjb2x1bW5XaWR0aHMnXSwgTWFwKCkpLFxuICAgIHNlbGVjdGVkQ2VsbDogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZWxlY3RlZENlbGwnXSwgTWFwKCkpLFxuICAgIHNlbGVjdGVkSXRlbXM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2VsZWN0ZWRJdGVtcyddLCBMaXN0KCkpLFxuICAgIGRhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnZGF0YSddLCBMaXN0KCkpLFxuICAgIGVkaXREYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2VkaXREYXRhJ10sIE1hcCgpKSxcbiAgICBjcmVhdGVEYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NyZWF0ZURhdGEnXSwgTGlzdCgpKSxcbiAgICBmaWx0ZXJEYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2ZpbHRlckRhdGEnXSwgTWFwKCkpLFxuICAgIGNlbGxNZXNzYWdlczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjZWxsTWVzc2FnZXMnXSwgTWFwKCkpLFxuICAgIGNyZWF0ZUNlbGxNZXNzYWdlczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjcmVhdGVDZWxsTWVzc2FnZXMnXSwgTWFwKCkpLFxuICAgIGFsbERhdGFTaXplOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2FsbERhdGEnXSwgTGlzdCgpKS5zaXplLFxuICAgIGxhbmd1YWdlOiBVdGlscy5nZXRMYW5ndWFnZShHUklELCBzdGF0ZS51c2VyKSxcbiAgICByZWdpb246IFV0aWxzLmdldFJlZ2lvbihHUklELCBzdGF0ZS51c2VyKSxcbiAgICBkYXRlRm9ybWF0OiBVdGlscy5nZXREYXRlRm9ybWF0KEdSSUQsIHN0YXRlLnVzZXIpLFxuICAgIHRob3VzYW5kU2VwYXJhdG9yOiBVdGlscy5nZXRUaG91c2FuZFNlcGFyYXRvcihHUklELCBzdGF0ZS51c2VyKSxcbiAgICBkZWNpbWFsU2VwYXJhdG9yOiBVdGlscy5nZXREZWNpbWFsU2VwYXJhdG9yKEdSSUQsIHN0YXRlLnVzZXIpLFxuICAgIGZvcmNlUmVmcmVzaFRpbWVzdGFtcDogc3RhdGUuZGF0YWdyaWQuZ2V0KCdmb3JjZVJlZnJlc2gnLCAwKSwgLy8gZm9yY2UgcmUtcmVuZGVyIHdoZW4gY2hhbmdlZFxuICAgIGZvY3VzVHlwZTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2ZvY3VzVHlwZSddLCBNYXAoKSksXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkYXRhZ3JpZEFjdGlvbnM7XG5cbkBwYWdpbmF0aW9uXG5AaW5qZWN0SW50bFxuQGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpXG5jbGFzcyBEYXRhR3JpZCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0gcHJvcFR5cGVzO1xuICBzdGF0aWMgZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjdXJyZW50Um93OiAwLFxuICAgICAgY3VycmVudENvbHVtbjogMCxcbiAgICAgIGNvbnRleHRNZW51T3BlbjogZmFsc2UsXG4gICAgICBjb250ZXh0TWVudVg6IG51bGwsXG4gICAgICBjb250ZXh0TWVudVk6IG51bGwsXG4gICAgfTtcbiAgICB0aGlzLmNlbGxSZWZzID0ge307XG4gICAgdGhpcy5jcmVhdGVDZWxsUmVmcyA9IHt9O1xuICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgPSBmYWxzZTtcbiAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IGZhbHNlOyAvLyBUT0RPOiBIYW5kbGUgZm9jdXNpbmcgd2hlbiB0cnVlXG4gICAgdGhpcy5mb2N1c1RvRXJyb3JDZWxsID0gZmFsc2U7IC8vIFRPRE86IEhhbmRsZSBmb2N1c2luZyB3aGVuIHRydWVcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkRvY3VtZW50Q2xpY2spO1xuICAgIHRoaXMucHJvcHMuaW52YWxpZGF0ZSh0aGlzLnByb3BzLmdyaWQpO1xuICB9XG5cbiAgb25Eb2N1bWVudENsaWNrID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmNvbnRleHRNZW51SXRlbXMpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjb250ZXh0TWVudU9wZW46IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkRvY3VtZW50Q2xpY2spO1xuICB9O1xuXG4gIG9uQ29sdW1uUmVzaXplRW5kQ2FsbGJhY2sgPSAobmV3Q29sdW1uV2lkdGgsIGNvbHVtbktleSkgPT4ge1xuICAgIHRoaXMucHJvcHMucmVzaXplQ29sdW1uKHRoaXMucHJvcHMuZ3JpZCwgY29sdW1uS2V5LCBuZXdDb2x1bW5XaWR0aCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEBwYXJhbSByb3dJbmRleCAoaW50KVxuICAgKiBAcGFyYW0gY29sIChvYmopLiBDb2x1bW4gb2JqZWN0LlxuICAgKiBAcGFyYW0gZS4gT3JpZ2luYWwgS2V5RG93biBldmVudFxuICAgKiBAcGFyYW0gY3JlYXRlIChib29sKS4gSXMgdGhlIGNlbGwgY3JlYXRlIGNlbGwgb3IgZWRpdCBjZWxsP1xuICAgKi9cbiAgb25DZWxsS2V5RG93biA9IChyb3dJbmRleCwgY29sLCBlLCBjcmVhdGUgPSBmYWxzZSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZUFycm93TmF2aWdhdGlvbikge1xuICAgICAgY29uc3QgY2VsbFJlZnMgPSBjcmVhdGUgPyB0aGlzLmNyZWF0ZUNlbGxSZWZzIDogdGhpcy5jZWxsUmVmcztcbiAgICAgIGNvbnN0IGFycm93S2V5cyA9IFtLRVlfQ09ERVMuRE9XTiwgS0VZX0NPREVTLlVQLCBLRVlfQ09ERVMuTEVGVCwgS0VZX0NPREVTLlJJR0hUXTtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgY29sdW1ucywgdmlzaWJsZUNvbHVtbnMsIGdyaWQsIGRhdGEsIG9uTGFzdENlbGxUYWJQcmVzcyxcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3QgZ3JpZENvbHVtbnMgPSBVdGlscy52aXNpYmxlQ29sdW1ucyhjb2x1bW5zLCB2aXNpYmxlQ29sdW1ucyk7XG4gICAgICBjb25zdCBnZXRDb2x1bW5LZXlCeUluZGV4ID0gaSA9PiBVdGlscy5nZXRDb2x1bW5LZXkoZ3JpZENvbHVtbnNbaV0pO1xuICAgICAgY29uc3Qgcm93c1NpemUgPSBkYXRhLnNpemU7XG4gICAgICBjb25zdCBjb2x1bW5LZXkgPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sKTtcbiAgICAgIGxldCBjdXJyZW50Q2VsbCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4fWBdO1xuICAgICAgbGV0IHByb3h5ID0gbnVsbDtcblxuICAgICAgY29uc3QgaXNDdXJzb3JBdFN0YXJ0ID0gKCkgPT4ge1xuICAgICAgICBpZiAoY3VycmVudENlbGwudHlwZSAhPT0gJ3RleHQnKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRDZWxsLnNlbGVjdGlvblN0YXJ0ID09PSAwO1xuICAgICAgfTtcblxuICAgICAgY29uc3QgaXNDdXJzb3JBdEVuZCA9ICgpID0+IHtcbiAgICAgICAgaWYgKGN1cnJlbnRDZWxsLnR5cGUgIT09ICd0ZXh0JykgcmV0dXJuIHRydWU7XG4gICAgICAgIHJldHVybiBjdXJyZW50Q2VsbC5zZWxlY3Rpb25FbmQgPT09IGN1cnJlbnRDZWxsLnZhbHVlLmxlbmd0aDtcbiAgICAgIH07XG5cbiAgICAgIC8vIElmIGN1cnJlbnQgY2VsbCBob2xkcyBhIHJlYWN0LWZsb2F0aW5nLXNlbGVjdCBjb21wb25lbnRcbiAgICAgIGlmIChjdXJyZW50Q2VsbCAmJiBjdXJyZW50Q2VsbC5zZWxlY3RSZWYpIHtcbiAgICAgICAgcHJveHkgPSBjdXJyZW50Q2VsbDtcbiAgICAgICAgY3VycmVudENlbGwgPSB0aGlzLmdldFNlbGVjdFJlZihwcm94eSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFByZXZlbnRzIHVwL2Rvd24gYXJyb3cgZnJvbSBjaGFuZ2luZyBudW1iZXIgZmllbGQgdmFsdWVcbiAgICAgIGlmIChhcnJvd0tleXMuaW5jbHVkZXMoZS5rZXlDb2RlKSAmJiBjdXJyZW50Q2VsbC50eXBlID09PSAnbnVtYmVyJykgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuICAgICAgICBjYXNlIEtFWV9DT0RFUy5FTlRFUjpcbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuRVNDOiB7XG4gICAgICAgICAgaWYgKGNyZWF0ZSAmJiBlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5FTlRFUikge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5hZGROZXdJdGVtKGdyaWQsIFV0aWxzLmdldENvbHVtbkRlZmF1bHRWYWx1ZXMoY29sdW1ucykpO1xuICAgICAgICAgICAgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgY3VycmVudENlbGwuc2VsZWN0KCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuRE9XTjoge1xuICAgICAgICAgIGxldCBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4ICsgMX1gXTtcblxuICAgICAgICAgIC8vIFByZXZlbnRzIG1lbnUgZnJvbSBvcGVuaW5nXG4gICAgICAgICAgaWYgKHByb3h5ICYmIHByb3h5LnNlbGVjdFJlZiAmJiAhcHJveHkuc2VsZWN0UmVmLnN0YXRlLm1lbnVJc09wZW4pIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmICghbmV4dEVsZW1lbnQpIGJyZWFrO1xuICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSB0aGlzLmdldFNlbGVjdFJlZihuZXh0RWxlbWVudCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubW92ZUNlbGxGb2N1cyhuZXh0RWxlbWVudCwgcm93SW5kZXggKyAxLCAtMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuVVA6IHtcbiAgICAgICAgICBsZXQgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2NvbHVtbktleX1fJHtyb3dJbmRleCAtIDF9YF07XG5cbiAgICAgICAgICAvLyBQcmV2ZW50cyBtZW51IGZyb20gb3BlbmluZ1xuICAgICAgICAgIGlmIChwcm94eSAmJiBwcm94eS5zZWxlY3RSZWYgJiYgIXByb3h5LnNlbGVjdFJlZi5zdGF0ZS5tZW51SXNPcGVuKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAoIW5leHRFbGVtZW50KSBicmVhaztcbiAgICAgICAgICAgIG5leHRFbGVtZW50ID0gdGhpcy5nZXRTZWxlY3RSZWYobmV4dEVsZW1lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm1vdmVDZWxsRm9jdXMobmV4dEVsZW1lbnQsIHJvd0luZGV4IC0gMSwgLTEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLlRBQjpcbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuUklHSFQ6XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLkxFRlQ6IHtcbiAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuUklHSFQgJiYgIWlzQ3Vyc29yQXRFbmQoKSkgYnJlYWs7XG4gICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLkxFRlQgJiYgIWlzQ3Vyc29yQXRTdGFydCgpKSBicmVhaztcblxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgIGxldCBjb2x1bW5JbmQgPSBncmlkQ29sdW1ucy5maW5kSW5kZXgoYyA9PiBjLnZhbHVlS2V5UGF0aC5qb2luKCcvJykgPT09IGNvbHVtbktleSk7XG4gICAgICAgICAgaWYgKGNvbHVtbkluZCAhPT0gLTEpIHtcbiAgICAgICAgICAgIGxldCBkaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICBsZXQgbmV4dEVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgbGV0IHJvd0luZCA9IHJvd0luZGV4O1xuICAgICAgICAgICAgd2hpbGUgKGRpc2FibGVkKSB7XG4gICAgICAgICAgICAgIC8vIE1vdmluZyB0byB0aGUgbGVmdFxuICAgICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuTEVGVCB8fCAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuVEFCICYmIGUuc2hpZnRLZXkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbHVtbkluZCAtIDEgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kIC09IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyb3dJbmQgLSAxID49IDApIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCA9IGdyaWRDb2x1bW5zLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgICByb3dJbmQgLT0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE1vdmluZyB0byB0aGUgcmlnaHRcbiAgICAgICAgICAgICAgICBpZiAoY29sdW1uSW5kICsgMSA8IGdyaWRDb2x1bW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kICs9IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyb3dJbmQgKyAxIDwgcm93c1NpemUpIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCA9IDA7XG4gICAgICAgICAgICAgICAgICByb3dJbmQgKz0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJvd0luZCArIDEgPT09IHJvd3NTaXplKSB7XG4gICAgICAgICAgICAgICAgICAvLyBJZiB0cnlpbmcgdG8gc2VsZWN0IGEgcm93LCB3aGVuIHRoZXJlIGlzIG5vbmU6XG4gICAgICAgICAgICAgICAgICBpZiAob25MYXN0Q2VsbFRhYlByZXNzICYmIGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLlRBQikgb25MYXN0Q2VsbFRhYlByZXNzKGUpO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2dldENvbHVtbktleUJ5SW5kZXgoY29sdW1uSW5kKX1fJHtyb3dJbmR9YF07XG5cbiAgICAgICAgICAgICAgLy8gSWYgd2UgY2Fubm90IGZvY3VzIG9uIHRoZSBuZXh0IGVsZW1lbnQgd2hpbGUgbW92aW5nIHRvIHRoZSByaWdodFxuICAgICAgICAgICAgICBpZiAoIW5leHRFbGVtZW50ICYmIGUua2V5Q29kZSAhPT0gS0VZX0NPREVTLkxFRlQpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSdyZSBub3QgeWV0IGluIHRoZSBsYXN0IGZvY3VzYWJsZSBjb2x1bW5cbiAgICAgICAgICAgICAgICBpZiAoY29sdW1uSW5kIDw9IGdyaWRDb2x1bW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgd2hpbGUgKGNvbHVtbkluZCA8PSBncmlkQ29sdW1ucy5sZW5ndGggJiYgIW5leHRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHRFbGVtZW50ID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtnZXRDb2x1bW5LZXlCeUluZGV4KGNvbHVtbkluZCl9XyR7cm93SW5kfWBdO1xuICAgICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgKz0gMTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBJZiB3ZSBhcmUgaW4gdGhlIGxhc3QgY29sdW1uIGFuZCB3ZSBkb24ndCBoYXZlIGFuIGVsZW1lbnQgdG8gZm9jdXMgb24sXG4gICAgICAgICAgICAgICAgICAgIC8vIHdlIG11c3QgbW92ZSB0byB0aGUgbmV4dCByb3cgKGlmIHBvc3NpYmxlKVxuICAgICAgICAgICAgICAgICAgICBpZiAoIW5leHRFbGVtZW50ICYmIGNvbHVtbkluZCA9PT0gZ3JpZENvbHVtbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gSWYgdHJ5aW5nIHRvIHNlbGVjdCBhIHJvdywgd2hlbiB0aGVyZSBpcyBub25lOlxuICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3dJbmQgKyAxID09PSByb3dzU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9uTGFzdENlbGxUYWJQcmVzcyAmJiBlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5UQUIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25MYXN0Q2VsbFRhYlByZXNzKGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgY29sdW1uSW5kID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICByb3dJbmQgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgICBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Z2V0Q29sdW1uS2V5QnlJbmRleChjb2x1bW5JbmQpfV8ke3Jvd0luZH1gXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSBjYW5ub3QgZm9jdXMgb24gdGhlIG5leHQgZWxlbWVudCB3aGlsZSBtb3ZpbmcgdG8gdGhlIGxlZnRcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICghbmV4dEVsZW1lbnQgJiYgZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuTEVGVCkge1xuICAgICAgICAgICAgICAgIHdoaWxlIChjb2x1bW5JbmQgPiAwICYmICFuZXh0RWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kIC09IDE7XG4gICAgICAgICAgICAgICAgICBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Z2V0Q29sdW1uS2V5QnlJbmRleChjb2x1bW5JbmQpfV8ke3Jvd0luZH1gXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZGlzYWJsZWQgPSBuZXh0RWxlbWVudCA/IG5leHRFbGVtZW50LmRpc2FibGVkIDogZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWRpc2FibGVkICYmIG5leHRFbGVtZW50KSB7XG4gICAgICAgICAgICAgIGlmIChuZXh0RWxlbWVudC5zZWxlY3RSZWYpIG5leHRFbGVtZW50ID0gdGhpcy5nZXRTZWxlY3RSZWYobmV4dEVsZW1lbnQpO1xuICAgICAgICAgICAgICB0aGlzLm1vdmVDZWxsRm9jdXMobmV4dEVsZW1lbnQsIHJvd0luZCwgY29sdW1uSW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgb25FZGl0Q2VsbEtleURvd24gPSAocm93SW5kZXgsIGNvbCkgPT4gKGUpID0+IHtcbiAgICB0aGlzLm9uQ2VsbEtleURvd24ocm93SW5kZXgsIGNvbCwgZSk7XG4gIH07XG5cbiAgb25DcmVhdGVDZWxsS2V5RG93biA9IChyb3dJbmRleCwgY29sKSA9PiAoZSkgPT4ge1xuICAgIHRoaXMub25DZWxsS2V5RG93bihyb3dJbmRleCwgY29sLCBlLCB0cnVlKTtcbiAgfTtcblxuICBvbkZpbHRlckNlbGxWYWx1ZUNoYW5nZSA9IChjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZXZlbnRPckRhdGEpID0+IHtcbiAgICBsZXQgcmF3VmFsdWU7XG4gICAgLy8gZXZlbnRPckRhdGEgY2FuIGJlIGlucHV0IG9uQ2hhbmdlIGV2ZW50LCByZWFjdC1zZWxlY3Qgb25DaGFuZ2Ugb3IgcmVhY3QtZGF5LXBpY2tlciBvbkNoYW5nZVxuICAgIGlmIChldmVudE9yRGF0YSkge1xuICAgICAgaWYgKGV2ZW50T3JEYXRhLnRhcmdldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChldmVudE9yRGF0YS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCB2YWx1ZSA9IHZhbHVlUGFyc2VyKHJhd1ZhbHVlKTtcbiAgICB0aGlzLnByb3BzLmZpbHRlckNlbGxWYWx1ZUNoYW5nZShcbiAgICAgIHRoaXMucHJvcHMuZ3JpZCxcbiAgICAgIHRoaXMucHJvcHMuY29sdW1ucyxcbiAgICAgIGNvbCxcbiAgICAgIHZhbHVlLFxuICAgICk7XG4gIH07XG5cbiAgb25DcmVhdGVDZWxsVmFsdWVDaGFuZ2UgPSAocm93SW5kZXgsIGNvbCwgdmFsdWVQYXJzZXIpID0+IChldmVudE9yRGF0YSkgPT4ge1xuICAgIGxldCByYXdWYWx1ZTtcbiAgICAvLyBldmVudE9yRGF0YSBjYW4gYmUgaW5wdXQgb25DaGFuZ2UgZXZlbnQsIHJlYWN0LXNlbGVjdCBvbkNoYW5nZSBvciByZWFjdC1kYXktcGlja2VyIG9uQ2hhbmdlXG4gICAgaWYgKGV2ZW50T3JEYXRhKSB7XG4gICAgICBpZiAoZXZlbnRPckRhdGEudGFyZ2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YS50YXJnZXQudmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50T3JEYXRhLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YS52YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGE7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlID0gdmFsdWVQYXJzZXIocmF3VmFsdWUpO1xuICAgIHRoaXMucHJvcHMuY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlKHRoaXMucHJvcHMuZ3JpZCwgcm93SW5kZXgsIGNvbC52YWx1ZUtleVBhdGgsIHZhbHVlKTtcbiAgICBpZiAoY29sLm9uQ3JlYXRlVmFsdWVDaGFuZ2UpIHtcbiAgICAgIGNvbC5vbkNyZWF0ZVZhbHVlQ2hhbmdlKHZhbHVlLCBjb2wudmFsdWVLZXlQYXRoLCByb3dJbmRleCk7XG4gICAgfVxuICAgIGlmIChjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUgJiYgdmFsdWUgPT09IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5tYXRjaFZhbHVlKSB7XG4gICAgICAvLyBDYWxsIHNwZWNpYWwgcGFpcmVkIHZhbHVlIGNoYW5nZSBvbiBvdGhlciBjZWxsIGlmIHZhbHVlIG1hdGNoZXNcbiAgICAgIHRoaXMub25DcmVhdGVDZWxsVmFsdWVDaGFuZ2UoXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICB7IHZhbHVlS2V5UGF0aDogY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm5ld1ZhbHVlS2V5UGF0aCB9LFxuICAgICAgICB2ID0+IHYsXG4gICAgICApKGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5uZXdWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjb2wudmFsaWRhdG9ycykge1xuICAgICAgdGhpcy5wcm9wcy5jcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZShcbiAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgY29sLnZhbHVlS2V5UGF0aCxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIGNvbC52YWxpZGF0b3JzLFxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgb25FZGl0Q2VsbFZhbHVlQ2hhbmdlID0gKHJvd0luZGV4LCBjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZXZlbnRPckRhdGEpID0+IHtcbiAgICBjb25zdCBkYXRhSWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgIGxldCByYXdWYWx1ZTtcbiAgICAvLyBldmVudE9yRGF0YSBjYW4gYmUgaW5wdXQgb25DaGFuZ2UgZXZlbnQsIHJlYWN0LXNlbGVjdCBvbkNoYW5nZSBvciByZWFjdC1kYXktcGlja2VyIG9uQ2hhbmdlXG4gICAgaWYgKGV2ZW50T3JEYXRhKSB7XG4gICAgICBpZiAoZXZlbnRPckRhdGEudGFyZ2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YS50YXJnZXQudmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50T3JEYXRhLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YS52YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGE7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlID0gdmFsdWVQYXJzZXIocmF3VmFsdWUpO1xuICAgIHRoaXMucHJvcHMuZWRpdENlbGxWYWx1ZUNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIGRhdGFJZCwgY29sLnZhbHVlS2V5UGF0aCwgdmFsdWUpO1xuICAgIGlmIChjb2wub25FZGl0VmFsdWVDaGFuZ2UpIHtcbiAgICAgIGNvbC5vbkVkaXRWYWx1ZUNoYW5nZSh2YWx1ZSwgY29sLnZhbHVlS2V5UGF0aCwgcm93SW5kZXgsIGRhdGFJZCk7XG4gICAgfVxuICAgIGlmIChjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUgJiYgdmFsdWUgPT09IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5tYXRjaFZhbHVlKSB7XG4gICAgICAvLyBDYWxsIHNwZWNpYWwgcGFpcmVkIHZhbHVlIGNoYW5nZSBvbiBvdGhlciBjZWxsIGlmIHZhbHVlIG1hdGNoZXNcbiAgICAgIHRoaXMub25FZGl0Q2VsbFZhbHVlQ2hhbmdlKFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgeyB2YWx1ZUtleVBhdGg6IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5uZXdWYWx1ZUtleVBhdGggfSxcbiAgICAgICAgdiA9PiB2LFxuICAgICAgKShjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY29sLnZhbGlkYXRvcnMpIHtcbiAgICAgIHRoaXMucHJvcHMuZWRpdENlbGxWYWx1ZVZhbGlkYXRlKFxuICAgICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICAgIGRhdGFJZCxcbiAgICAgICAgY29sLnZhbHVlS2V5UGF0aCxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIGNvbC52YWxpZGF0b3JzLFxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgb25DcmVhdGVDZWxsQmx1ciA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGUpID0+IHtcbiAgICBpZiAoY29sLm9uQ3JlYXRlQmx1cikge1xuICAgICAgbGV0IHZhbHVlID0gKGUgJiYgZS50YXJnZXQgJiYgZS50YXJnZXQudmFsdWUgIT09IHVuZGVmaW5lZCkgP1xuICAgICAgICBlLnRhcmdldC52YWx1ZSA6XG4gICAgICAgIHRoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKTtcbiAgICAgIGlmICh2YWx1ZVBhcnNlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWVQYXJzZXIodmFsdWUpO1xuICAgICAgfVxuICAgICAgY29sLm9uQ3JlYXRlQmx1cih2YWx1ZSwgcm93SW5kZXgpO1xuICAgIH1cbiAgfTtcblxuICBvbkVkaXRDZWxsQmx1ciA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGUpID0+IHtcbiAgICBpZiAoY29sLm9uRWRpdEJsdXIpIHtcbiAgICAgIGxldCB2YWx1ZSA9IChlICYmIGUudGFyZ2V0ICYmIGUudGFyZ2V0LnZhbHVlICE9PSB1bmRlZmluZWQpID9cbiAgICAgICAgZS50YXJnZXQudmFsdWUgOlxuICAgICAgICB0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCk7XG4gICAgICBpZiAodmFsdWVQYXJzZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlUGFyc2VyKHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGRhdGFJZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgICBjb2wub25FZGl0Qmx1cih2YWx1ZSwgcm93SW5kZXgsIGRhdGFJZCk7XG4gICAgfVxuICB9O1xuXG4gIG9uQ2VsbEZvY3VzID0gKGNlbGxUeXBlLCBpbnB1dFR5cGUsIHJvd0luZGV4LCBjb2x1bW5LZXkpID0+IChlKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgY2VsbFNlbGVjdGlvbkNoYW5nZSwgY2VsbFNlbGVjdCwgZ3JpZCwgaXNFZGl0aW5nLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChpc0VkaXRpbmcpIHJldHVybjtcblxuICAgIGlmIChpbnB1dFR5cGUgPT09ICdudW1iZXInKSB7XG4gICAgICBlLnRhcmdldC5zZWxlY3QoKTtcbiAgICB9XG4gICAgaWYgKGNlbGxUeXBlID09PSAnZWRpdCcgJiYgY2VsbFNlbGVjdCkge1xuICAgICAgY2VsbFNlbGVjdGlvbkNoYW5nZShncmlkLCBNYXAoe1xuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgY29sdW1uS2V5LFxuICAgICAgfSkpO1xuICAgIH1cbiAgfTtcblxuICBnZXRTZWxlY3RSZWYgPSAoY29tcG9uZW50KSA9PiB7XG4gICAgaWYgKCFjb21wb25lbnQpIHJldHVybiBudWxsO1xuICAgIGlmIChjb21wb25lbnQuc2VsZWN0UmVmLnNlbGVjdC5zZWxlY3QpIHJldHVybiBjb21wb25lbnQuc2VsZWN0UmVmLnNlbGVjdC5zZWxlY3QuaW5wdXRSZWY7XG4gICAgcmV0dXJuIGNvbXBvbmVudC5zZWxlY3RSZWYuc2VsZWN0LmlucHV0UmVmO1xuICB9O1xuXG4gIGdldERhdGFJZEJ5Um93SW5kZXggPSByb3dJbmRleCA9PlxuICAgIHRoaXMucHJvcHMuZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLnRoaXMucHJvcHMuZ3JpZC5pZEtleVBhdGhdKTtcblxuICBnZXRTZWxlY3RlZEl0ZW1JbmRleCA9IChpZCkgPT4ge1xuICAgIGlmICghaWQpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnByb3BzLmRhdGEuZmluZEluZGV4KHYgPT4gdi5nZXRJbih0aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoKSA9PT0gaWQpO1xuICAgIHJldHVybiBpbmRleCA9PT0gLTEgPyB1bmRlZmluZWQgOiBpbmRleDtcbiAgfTtcblxuICBnZXRFZGl0SXRlbVZhbHVlID0gKHJvd0luZGV4LCBjb2wsIG9wdGlvbnMgPSBbXSkgPT4ge1xuICAgIC8vIEdldCB0aGUgdmFsdWUgdG8gZGlzcGxheSBpbiBlZGl0IGNlbGxcbiAgICBjb25zdCBpZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgY29uc3QgZWRpdFZhbHVlID0gdGhpcy5wcm9wcy5lZGl0RGF0YS5nZXRJbihbaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdLCB1bmRlZmluZWQpO1xuICAgIGxldCBvcmlnaW5hbFZhbHVlO1xuICAgIGlmIChlZGl0VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgb3JpZ2luYWxWYWx1ZSA9IHRoaXMucHJvcHMuZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdLCAnJyk7XG4gICAgfSBlbHNlIGlmIChlZGl0VmFsdWUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVmFsdWUgaXMgZm91bmQgZnJvbSBlZGl0RGF0YVxuICAgICAgLy8gRm9ybWF0IGJ5IGNvbXBvbmVudCB0eXBlXG4gICAgICBzd2l0Y2ggKGNvbC5jb21wb25lbnRUeXBlKSB7XG4gICAgICAgIGNhc2UgJ3NlbGVjdCc6XG4gICAgICAgICAgcmV0dXJuIG9wdGlvbnMuc2VsZWN0T3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IGVkaXRWYWx1ZSk7XG4gICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICAgIHJldHVybiBvcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gZWRpdFZhbHVlKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gZWRpdFZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAob3JpZ2luYWxWYWx1ZSA9PT0gbnVsbCB8fCBvcmlnaW5hbFZhbHVlID09PSB1bmRlZmluZWQgfHwgb3JpZ2luYWxWYWx1ZSA9PT0gJycpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgLy8gUmV0dXJuIHZhbHVlIGZyb20gb3JpZ2luYWwgZGF0YSwgYmVjYXVzZSBlZGl0RGF0YSBpcyBub3QgYXZhaWxhYmxlXG4gICAgLy8gRm9ybWF0IGJ5IGNvbXBvbmVudCB0eXBlXG4gICAgc3dpdGNoIChjb2wuY29tcG9uZW50VHlwZSkge1xuICAgICAgY2FzZSAnZmxvYXQnOiB7XG4gICAgICAgIGlmIChTdHJpbmcob3JpZ2luYWxWYWx1ZSkubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHJldHVybiBTdHJpbmcob3JpZ2luYWxWYWx1ZSlcbiAgICAgICAgICAgIC5yZXBsYWNlKCcuJywgdGhpcy5wcm9wcy5kZWNpbWFsU2VwYXJhdG9yKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3JpZ2luYWxWYWx1ZTtcbiAgICAgIH1cbiAgICAgIGNhc2UgJ3NlbGVjdCc6XG4gICAgICAgIHJldHVybiBvcHRpb25zLnNlbGVjdE9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSBvcmlnaW5hbFZhbHVlKTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICByZXR1cm4gb3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IG9yaWdpbmFsVmFsdWUpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIG9yaWdpbmFsVmFsdWU7XG4gICAgfVxuICB9O1xuXG4gIGdldENyZWF0ZUl0ZW1WYWx1ZSA9IChyb3dJbmRleCwgY29sLCBvcHRpb25zID0gW10pID0+IHtcbiAgICBjb25zdCB2YWwgPSB0aGlzLnByb3BzLmNyZWF0ZURhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSwgJycpO1xuICAgIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9IGVsc2UgaWYgKGNvbC5jb21wb25lbnRUeXBlID09PSAnc2VsZWN0Jykge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuc2VsZWN0T3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IHZhbCk7XG4gICAgfSBlbHNlIGlmIChbJ2Jvb2xlYW4nXS5pbmNsdWRlcyhjb2wuY29tcG9uZW50VHlwZSkpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gdmFsKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbDtcbiAgfTtcblxuICBnZXRGaWx0ZXJJdGVtVmFsdWUgPSAoY29sLCBvcHRpb25zID0gW10pID0+IHtcbiAgICBjb25zdCB2YWwgPSB0aGlzLnByb3BzLmZpbHRlckRhdGEuZ2V0KFV0aWxzLmdldENvbHVtbktleShjb2wpLCAnJyk7XG4gICAgaWYgKHZhbCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH0gZWxzZSBpZiAoY29sLmNvbXBvbmVudFR5cGUgPT09ICdzZWxlY3QnKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5zZWxlY3RPcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gdmFsKTtcbiAgICB9IGVsc2UgaWYgKFsnY2hlY2tib3gnLCAnYm9vbGVhbiddLmluY2x1ZGVzKGNvbC5jb21wb25lbnRUeXBlKSkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSB2YWwpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsO1xuICB9O1xuXG4gIGdldENvbXBvbmVudERpc2FibGVkU3RhdGUgPSAocm93SW5kZXgsIGNvbCwgbW9kZSkgPT4ge1xuICAgIGxldCBjb21wb25lbnREaXNhYmxlZCA9ICEhY29sLmRpc2FibGVFZGl0aW5nO1xuICAgIC8vIGNoZWNrIGlmIGNvbXBvbmVudCBpcyBkaXNhYmxlZCBieSBvdGhlciBjb2x1bW4gZGF0YVxuICAgIGlmICghY29tcG9uZW50RGlzYWJsZWQgJiYgY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoKSB7XG4gICAgICBpZiAobW9kZSA9PT0gJ2NyZWF0ZScpIHtcbiAgICAgICAgY29tcG9uZW50RGlzYWJsZWQgPSB0aGlzLmdldENyZWF0ZUl0ZW1WYWx1ZShcbiAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICB7IHZhbHVlS2V5UGF0aDogY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWVLZXlQYXRoIH0sXG4gICAgICAgICkgPT09IGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaC5tYXRjaFZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29tcG9uZW50RGlzYWJsZWQgPSB0aGlzLmdldEVkaXRJdGVtVmFsdWUoXG4gICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgeyB2YWx1ZUtleVBhdGg6IGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaC5tYXRjaFZhbHVlS2V5UGF0aCB9LFxuICAgICAgICApID09PSBjb2wuZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2gubWF0Y2hWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvbXBvbmVudERpc2FibGVkO1xuICB9O1xuXG4gIGdldFJvd0NsYXNzTmFtZSA9IChyb3dJbmRleCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGdyaWQsXG4gICAgICBpc0NyZWF0aW5nLFxuICAgICAgaXNFZGl0aW5nLFxuICAgICAgY3JlYXRlRGF0YSxcbiAgICAgIHNlbGVjdGVkSXRlbXMsXG4gICAgICBkYXRhLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHJvd0NsYXNzTmFtZXMgPSBbJ29jLWRhdGFncmlkLXJvdyddO1xuICAgIGxldCBleHRyYVJvd0NvdW50ID0gMDsgLy8gaG93IG1hbnkgcm93cyB0byBpZ25vcmUgZnJvbSB0b3AsIG5ldyArIGZpbHRlciByb3dzXG4gICAgaWYgKGlzQ3JlYXRpbmcpIGV4dHJhUm93Q291bnQgPSBjcmVhdGVEYXRhLnNpemU7XG4gICAgaWYgKGlzQ3JlYXRpbmcpIHtcbiAgICAgIGlmIChyb3dJbmRleCA8PSAoZXh0cmFSb3dDb3VudCAtIDEpKSB7XG4gICAgICAgIHJvd0NsYXNzTmFtZXMucHVzaCgnb2MtZGF0YWdyaWQtcm93LW5ldycpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNFZGl0aW5nKSB7XG4gICAgICByb3dDbGFzc05hbWVzLnB1c2goJ29jLWRhdGFncmlkLXJvdy1lZGl0Jyk7XG4gICAgfVxuXG5cbiAgICAvLyBjaGVjayBpZiByb3cgaXMgc2VsZWN0ZWRcbiAgICBpZiAoKCFpc0NyZWF0aW5nICYmICFpc0VkaXRpbmcpICYmXG4gICAgICAoc2VsZWN0ZWRJdGVtcyAmJiBncmlkLmlkS2V5UGF0aCkpIHtcbiAgICAgIGlmIChcbiAgICAgICAgc2VsZWN0ZWRJdGVtcy5pbmRleE9mKGRhdGEuZ2V0SW4oW3Jvd0luZGV4IC0gZXh0cmFSb3dDb3VudCwgLi4uZ3JpZC5pZEtleVBhdGhdKSkgIT09IC0xXG4gICAgICApIHtcbiAgICAgICAgcm93Q2xhc3NOYW1lcy5wdXNoKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLnJvd0NsYXNzTmFtZUdldHRlcikge1xuICAgICAgcmV0dXJuIHJvd0NsYXNzTmFtZXMuam9pbignICcpICsgJyAnICsgdGhpcy5wcm9wcy5yb3dDbGFzc05hbWVHZXR0ZXIocm93SW5kZXgpO1xuICAgIH1cbiAgICByZXR1cm4gcm93Q2xhc3NOYW1lcy5qb2luKCcgJyk7XG4gIH07XG5cbiAgZ2V0Q2VsbE1lc3NhZ2VzID0gKHJvd0luZGV4LCBjb2wsIGNlbGxUeXBlKSA9PiB7XG4gICAgY29uc3QgcmV0dXJuRGF0YSA9IHt9O1xuICAgIGlmICghdGhpcy5wcm9wcy5ncmlkLmlkS2V5UGF0aCB8fCAhY29sLnZhbHVlS2V5UGF0aCkge1xuICAgICAgcmV0dXJuIHJldHVybkRhdGE7XG4gICAgfVxuICAgIGxldCBpbmZvTWVzc2FnZTtcbiAgICBsZXQgZXJyb3JNZXNzYWdlO1xuICAgIGxldCB3YXJuaW5nTWVzc2FnZTtcbiAgICBpZiAoY2VsbFR5cGUgPT09ICdjcmVhdGUnKSB7XG4gICAgICBpbmZvTWVzc2FnZSA9IHRoaXMucHJvcHMuY3JlYXRlQ2VsbE1lc3NhZ2VzLmdldEluKFsnaW5mbycsIHJvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgICBlcnJvck1lc3NhZ2UgPSB0aGlzLnByb3BzLmNyZWF0ZUNlbGxNZXNzYWdlcy5nZXRJbihbJ2Vycm9yJywgcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgIHdhcm5pbmdNZXNzYWdlID0gdGhpcy5wcm9wcy5jcmVhdGVDZWxsTWVzc2FnZXMuZ2V0SW4oWyd3YXJuaW5nJywgcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgICAgaW5mb01lc3NhZ2UgPSB0aGlzLnByb3BzLmNlbGxNZXNzYWdlcy5nZXRJbihbJ2luZm8nLCBpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgZXJyb3JNZXNzYWdlID0gdGhpcy5wcm9wcy5jZWxsTWVzc2FnZXMuZ2V0SW4oWydlcnJvcicsIGlkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgICB3YXJuaW5nTWVzc2FnZSA9IHRoaXMucHJvcHMuY2VsbE1lc3NhZ2VzLmdldEluKFsnd2FybmluZycsIGlkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgfVxuICAgIGlmIChpbmZvTWVzc2FnZSkge1xuICAgICAgcmV0dXJuRGF0YS5pbmZvTWVzc2FnZSA9IGluZm9NZXNzYWdlO1xuICAgIH1cbiAgICBpZiAoZXJyb3JNZXNzYWdlKSB7XG4gICAgICByZXR1cm5EYXRhLmVycm9yTWVzc2FnZSA9IGVycm9yTWVzc2FnZTtcbiAgICB9XG4gICAgaWYgKHdhcm5pbmdNZXNzYWdlKSB7XG4gICAgICByZXR1cm5EYXRhLndhcm5pbmdNZXNzYWdlID0gd2FybmluZ01lc3NhZ2U7XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5EYXRhO1xuICB9O1xuXG4gIGdldFNjcm9sbFRvUm93ID0gKCkgPT4ge1xuICAgIGxldCBzY3JvbGxUb1JvdztcbiAgICBpZiAodGhpcy5wcm9wcy5pc0NyZWF0aW5nICYmICF0aGlzLmZvY3VzVG9DcmVhdGVDZWxsKSByZXR1cm4gc2Nyb2xsVG9Sb3c7XG4gICAgaWYgKHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwpIHtcbiAgICAgIGNvbnN0IHNjcm9sbE5ld1JvdyA9IHRoaXMucHJvcHMuY3JlYXRlRGF0YS5zaXplIC0gMTtcbiAgICAgIGlmIChzY3JvbGxOZXdSb3cgPj0gMCkge1xuICAgICAgICBzY3JvbGxUb1JvdyA9IHNjcm9sbE5ld1JvdztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMucHJvcHMuaXNFZGl0aW5nKSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gdGhpcy5zdGF0ZS5jdXJyZW50Um93O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2Nyb2xsVG9Sb3cgPSB0aGlzLnByb3BzLnNjcm9sbFRvUm93OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICB9XG4gICAgICBpZiAoc2Nyb2xsVG9Sb3cgPT09IHVuZGVmaW5lZCAmJiB0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuc2l6ZSA+IDApIHtcbiAgICAgICAgc2Nyb2xsVG9Sb3cgPSB0aGlzLmdldFNlbGVjdGVkSXRlbUluZGV4KHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5maXJzdCgpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNjcm9sbFRvUm93O1xuICB9O1xuXG4gIHNldEZvY3VzVG8gPSAoZm9jdXNUbykgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmlzRWRpdGluZyB8fCB0aGlzLnByb3BzLmlzQ3JlYXRpbmcpIHtcbiAgICAgIGlmIChmb2N1c1RvICYmIGZvY3VzVG8uZ2V0KCd0eXBlJykgJiYgZm9jdXNUbyAhPT0gdGhpcy5wcmV2Rm9jdXNUbykge1xuICAgICAgICB0aGlzW2ZvY3VzVG8uZ2V0KCd0eXBlJyldID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5mb2N1c1RvTGFzdFJvdyA9IGZvY3VzVG8uZ2V0KCdmb2N1c1RvTGFzdFJvdycpO1xuICAgICAgICB0aGlzLnByZXZGb2N1c1RvID0gZm9jdXNUbztcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlQ2VsbFNlbGVjdCA9IChjZWxsVHlwZSwgcm93SW5kZXgsIGNvbHVtbktleSkgPT4gKCkgPT4ge1xuICAgIGlmIChjZWxsVHlwZSA9PT0gJ3ZpZXcnICYmIHRoaXMucHJvcHMuY2VsbFNlbGVjdCkge1xuICAgICAgdGhpcy5wcm9wcy5jZWxsU2VsZWN0aW9uQ2hhbmdlKHRoaXMucHJvcHMuZ3JpZCwgTWFwKHtcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIGNvbHVtbktleSxcbiAgICAgIH0pKTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlQ3JlYXRlQ2VsbFJlZiA9IChyb3dJbmRleCwgY29sKSA9PiAocmVmKSA9PiB7XG4gICAgLy8gRm9jdXMgdG8gY3JlYXRlIGNlbGxcbiAgICBjb25zdCBjb2x1bW5LZXkgPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sKTtcbiAgICBjb25zdCBzZWxlY3RSZWYgPSAhcmVmIHx8IHJlZi5mb2N1cyA/IHJlZiA6IHRoaXMuZ2V0U2VsZWN0UmVmKHJlZik7XG4gICAgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5jcmVhdGVEYXRhLnNpemUgJiZcbiAgICAgIHRoaXMucHJvcHMuY3JlYXRlRGF0YS5zaXplID09PSByb3dJbmRleCArIDEgJiZcbiAgICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgJiZcbiAgICAgICF0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2NyZWF0ZScpICYmXG4gICAgICBzZWxlY3RSZWZcbiAgICApIHtcbiAgICAgIHNlbGVjdFJlZi5mb2N1cygpO1xuICAgICAgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZUFycm93TmF2aWdhdGlvbikge1xuICAgICAgdGhpcy5jcmVhdGVDZWxsUmVmc1tgJHt0aGlzLnByb3BzLmdyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4fWBdID0gcmVmO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVFZGl0Q2VsbFJlZiA9IChyb3dJbmRleCwgY29sKSA9PiAocmVmKSA9PiB7XG4gICAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCk7XG4gICAgaWYgKHRoaXMuZm9jdXNUb0VkaXRDZWxsICYmICF0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2VkaXQnKSkge1xuICAgICAgY29uc3Qgc2VsZWN0ZWRSb3dJbmRleCA9IHRoaXMuZm9jdXNUb0xhc3RSb3cgJiYgdGhpcy5wcm9wcy5kYXRhLnNpemUgPiAwID9cbiAgICAgICAgdGhpcy5wcm9wcy5kYXRhLnNpemUgLSAxIDogdGhpcy5nZXRTZWxlY3RlZEl0ZW1JbmRleCh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuZmlyc3QoKSk7XG5cbiAgICAgIGNvbnN0IHsgc2VsZWN0ZWRDZWxsIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3Qgc2VsZWN0UmVmID0gIXJlZiB8fCByZWYuZm9jdXMgPyByZWYgOiB0aGlzLmdldFNlbGVjdFJlZihyZWYpO1xuICAgICAgaWYgKHNlbGVjdGVkQ2VsbC5zaXplID4gMCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgc2VsZWN0ZWRDZWxsLmdldCgncm93SW5kZXgnKSA9PT0gcm93SW5kZXggJiZcbiAgICAgICAgICBzZWxlY3RlZENlbGwuZ2V0KCdjb2x1bW5LZXknKSA9PT0gY29sdW1uS2V5ICYmXG4gICAgICAgICAgc2VsZWN0UmVmXG4gICAgICAgICkge1xuICAgICAgICAgIHNlbGVjdFJlZi5mb2N1cygpO1xuICAgICAgICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5mb2N1c1RvTGFzdFJvdyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHNlbGVjdGVkUm93SW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZvY3VzVG9MYXN0Um93ID0gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKHNlbGVjdGVkUm93SW5kZXggPT09IHJvd0luZGV4ICYmIHNlbGVjdFJlZikge1xuICAgICAgICBzZWxlY3RSZWYuZm9jdXMoKTtcbiAgICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mb2N1c1RvTGFzdFJvdyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5lbmFibGVBcnJvd05hdmlnYXRpb24pIHtcbiAgICAgIHRoaXMuY2VsbFJlZnNbYCR7dGhpcy5wcm9wcy5ncmlkLmlkfV8ke2NvbHVtbktleX1fJHtyb3dJbmRleH1gXSA9IHJlZjtcbiAgICB9XG4gIH07XG5cbiAgbW92ZUNlbGxGb2N1cyA9IChuZXh0RWxlbWVudCwgcm93SW5kZXgsIGNvbHVtbkluZGV4KSA9PiB7XG4gICAgY29uc3QgZWxlbWVudFR5cGVzID0gWyd0ZXh0JywgJ2NoZWNrYm94J107XG4gICAgaWYgKG5leHRFbGVtZW50ICYmIGVsZW1lbnRUeXBlcy5pbmNsdWRlcyhuZXh0RWxlbWVudC50eXBlKSkge1xuICAgICAgaWYgKHJvd0luZGV4ICE9PSAtMSB8fCBjb2x1bW5JbmRleCAhPT0gLTEpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgY3VycmVudENvbHVtbjogY29sdW1uSW5kZXgsXG4gICAgICAgICAgY3VycmVudFJvdzogcm93SW5kZXgsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmIChuZXh0RWxlbWVudC50eXBlID09PSAnY2hlY2tib3gnKSBuZXh0RWxlbWVudC5mb2N1cygpO1xuICAgICAgICBpZiAobmV4dEVsZW1lbnQudHlwZSA9PT0gJ3RleHQnKSBuZXh0RWxlbWVudC5zZWxlY3QoKTtcbiAgICAgIH0sIDUwKTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlU2VsZWN0QWxsQ2hlY2tCb3hPbkNoYW5nZSA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLnNlbGVjdEFsbEl0ZW1zQ2hhbmdlKHRoaXMucHJvcHMuZ3JpZCk7XG4gIH07XG5cbiAgaGFuZGxlU2VsZWN0aW9uQ2hlY2tCb3hPbkNoYW5nZSA9IHJvd0luZGV4ID0+ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLml0ZW1TZWxlY3Rpb25DaGFuZ2UodGhpcy5wcm9wcy5ncmlkLCByb3dJbmRleCwgdHJ1ZSwgZmFsc2UpO1xuICB9O1xuXG4gIGdlbmVyYXRlQ29sdW1ucyA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBkYXRhLFxuICAgICAgc2VsZWN0ZWRJdGVtcyxcbiAgICAgIGRhdGVGb3JtYXQsXG4gICAgICB0aG91c2FuZFNlcGFyYXRvcixcbiAgICAgIGRlY2ltYWxTZXBhcmF0b3IsXG4gICAgICBncmlkLFxuICAgICAgaW5saW5lRWRpdCxcbiAgICAgIGZpbHRlcmluZyxcbiAgICAgIHJlZ2lvbixcbiAgICAgIGludGwsXG4gICAgICBzZWxlY3RDb21wb25lbnRPcHRpb25zLFxuICAgICAgaXNDcmVhdGluZyxcbiAgICAgIGV4dHJhQ29sdW1uLFxuICAgICAgcm93U2VsZWN0Q2hlY2tib3hDb2x1bW4sXG4gICAgICBzaG93U2VsZWN0QWxsQ2hlY2tib3gsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBjb2x1bW5zID0gW107XG4gICAgY29uc3QgdGFiSW5kZXggPSBTdHJpbmcodGhpcy5wcm9wcy50YWJJbmRleCk7XG4gICAgaWYgKGV4dHJhQ29sdW1uKSB7XG4gICAgICBjb2x1bW5zLnB1c2goe1xuICAgICAgICB3aWR0aDogZXh0cmFDb2x1bW4ud2lkdGggfHwgNDAsXG4gICAgICAgIGlzUmVzaXphYmxlOiAhIWV4dHJhQ29sdW1uLmlzUmVzaXphYmxlLFxuICAgICAgICBpc1NvcnRhYmxlOiBmYWxzZSxcbiAgICAgICAgY29sdW1uS2V5OiAnZXh0cmFDb2x1bW4nLFxuICAgICAgICBjZWxsOiByb3dJbmRleCA9PiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1leHRyYS1jb2x1bW4tY2VsbCBuby1yb3ctc2VsZWN0XCI+XG4gICAgICAgICAgICB7ZXh0cmFDb2x1bW4udmFsdWVSZW5kZXIoZGF0YS5nZXQocm93SW5kZXgpLCB0YWJJbmRleCl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICksXG4gICAgICAgIGNlbGxFZGl0OiByb3dJbmRleCA9PiAoZXh0cmFDb2x1bW4uY2VsbEVkaXQgPyBleHRyYUNvbHVtbi5jZWxsRWRpdChyb3dJbmRleCkgOiBudWxsKSxcbiAgICAgICAgY2VsbENyZWF0ZTogcm93SW5kZXggPT4gKGV4dHJhQ29sdW1uLmNlbGxDcmVhdGUgPyBleHRyYUNvbHVtbi5jZWxsQ3JlYXRlKHJvd0luZGV4KSA6IG51bGwpLFxuICAgICAgICBjZWxsRmlsdGVyOiByb3dJbmRleCA9PiAoZXh0cmFDb2x1bW4uY2VsbEZpbHRlciA/IGV4dHJhQ29sdW1uLmNlbGxGaWx0ZXIocm93SW5kZXgpIDogbnVsbCksXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocm93U2VsZWN0Q2hlY2tib3hDb2x1bW4pIHtcbiAgICAgIGNvbHVtbnMucHVzaCh7XG4gICAgICAgIHdpZHRoOiA0MCxcbiAgICAgICAgaXNSZXNpemFibGU6IGZhbHNlLFxuICAgICAgICBpc1NvcnRhYmxlOiBmYWxzZSxcbiAgICAgICAgY29sdW1uS2V5OiAnc2VsZWN0aW9uQ2hlY2tib3gnLFxuICAgICAgICBoZWFkZXI6IChcbiAgICAgICAgICBzaG93U2VsZWN0QWxsQ2hlY2tib3ggJiZcbiAgICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZFNlbGVjdEFsbENoZWNrQm94LSR7Z3JpZC5pZH1gfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtc2VsZWN0LWFsbC1jaGVja2JveC1jZWxsIG5vLXJvdy1zZWxlY3RcIlxuICAgICAgICAgICAgY2hlY2tlZD17ZGF0YS5zaXplICE9PSAwICYmIGRhdGEuc2l6ZSA9PT0gc2VsZWN0ZWRJdGVtcy5zaXplfVxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlU2VsZWN0QWxsQ2hlY2tCb3hPbkNoYW5nZX1cbiAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAvPlxuICAgICAgICApLFxuICAgICAgICBjZWxsOiAocm93SW5kZXgpID0+IHtcbiAgICAgICAgICBjb25zdCByb3dJdGVtID0gZGF0YS5nZXQocm93SW5kZXgpO1xuICAgICAgICAgIGNvbnN0IGl0ZW1JZCA9IHJvd0l0ZW0uZ2V0SW4oZ3JpZC5pZEtleVBhdGgpO1xuICAgICAgICAgIGNvbnN0IHNlbGVjdGVkID0gc2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhpdGVtSWQpO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkU2VsZWN0Q2hlY2tCb3gtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtc2VsZWN0LWNoZWNrYm94LWNlbGwgbm8tcm93LXNlbGVjdFwiXG4gICAgICAgICAgICAgIGNoZWNrZWQ9e3NlbGVjdGVkfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVTZWxlY3Rpb25DaGVja0JveE9uQ2hhbmdlKHJvd0luZGV4KX1cbiAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICBjZWxsRWRpdDogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbENyZWF0ZTogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbEZpbHRlcjogKCkgPT4gbnVsbCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHZpc2libGVDb2x1bW5zID0gW107XG4gICAgdGhpcy5wcm9wcy52aXNpYmxlQ29sdW1ucy5mb3JFYWNoKCh2aXNpYmxlQ29sdW1uS2V5KSA9PiB7XG4gICAgICB0aGlzLnByb3BzLmNvbHVtbnMuZm9yRWFjaCgob3JnQ29sKSA9PiB7XG4gICAgICAgIGlmIChVdGlscy5nZXRDb2x1bW5LZXkob3JnQ29sKSA9PT0gdmlzaWJsZUNvbHVtbktleSkge1xuICAgICAgICAgIHZpc2libGVDb2x1bW5zLnB1c2gob3JnQ29sKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgdmlzaWJsZUNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZUVtcHR5Q2hlY2tlciA9IFV0aWxzLmdldFZhbHVlRW1wdHlDaGVja2VyKGNvbCk7XG4gICAgICAvLyBDZWxsIHZhbHVlIHJlbmRlcmluZ1xuICAgICAgY29uc3QgdmFsdWVSZW5kZXIgPSAocm93SW5kZXgsIGZvcm1hdCkgPT4ge1xuICAgICAgICBjb25zdCB2YWwgPSBkYXRhLmdldEluKFtyb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsKSkge1xuICAgICAgICAgIHJldHVybiBjb2wuaXNSZXF1aXJlZCA/IDxNIGlkPVwiR3JpZC5WYWx1ZUlzTWlzc2luZ1wiIC8+IDogJyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvcm1hdCA/IGZvcm1hdCh2YWwpIDogdmFsO1xuICAgICAgfTtcblxuICAgICAgbGV0IGNvbHVtbiA9IEdyaWRDb2x1bW5TZXJ2aWNlLmJhc2VDb2x1bW4oY29sKTtcbiAgICAgIC8vIENvbGxlY3QgY29sdW1uIGZ1bmN0aW9ucyBpbnRvIG9uZSBPYmplY3RcbiAgICAgIGNvbnN0IGNvbHVtbkZ1bmN0aW9ucyA9IHtcbiAgICAgICAgZWRpdDoge1xuICAgICAgICAgIGdldEl0ZW1WYWx1ZTogdGhpcy5nZXRFZGl0SXRlbVZhbHVlLFxuICAgICAgICAgIG9uQ2VsbFZhbHVlQ2hhbmdlOiB0aGlzLm9uRWRpdENlbGxWYWx1ZUNoYW5nZSxcbiAgICAgICAgICBvbkNlbGxCbHVyOiB0aGlzLm9uRWRpdENlbGxCbHVyLFxuICAgICAgICAgIG9uQ2VsbEZvY3VzOiB0aGlzLm9uQ2VsbEZvY3VzLFxuICAgICAgICAgIG9uQ2VsbEtleURvd246IHRoaXMub25FZGl0Q2VsbEtleURvd24sXG4gICAgICAgICAgaGFuZGxlQ2VsbFJlZjogdGhpcy5oYW5kbGVFZGl0Q2VsbFJlZixcbiAgICAgICAgfSxcbiAgICAgICAgY3JlYXRlOiB7XG4gICAgICAgICAgZ2V0SXRlbVZhbHVlOiB0aGlzLmdldENyZWF0ZUl0ZW1WYWx1ZSxcbiAgICAgICAgICBvbkNlbGxWYWx1ZUNoYW5nZTogdGhpcy5vbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSxcbiAgICAgICAgICBvbkNlbGxCbHVyOiB0aGlzLm9uQ3JlYXRlQ2VsbEJsdXIsXG4gICAgICAgICAgb25DZWxsRm9jdXM6IHRoaXMub25DZWxsRm9jdXMsXG4gICAgICAgICAgb25DZWxsS2V5RG93bjogdGhpcy5vbkNyZWF0ZUNlbGxLZXlEb3duLFxuICAgICAgICAgIGhhbmRsZUNlbGxSZWY6IHRoaXMuaGFuZGxlQ3JlYXRlQ2VsbFJlZixcbiAgICAgICAgfSxcbiAgICAgICAgZmlsdGVyOiB7XG4gICAgICAgICAgZ2V0SXRlbVZhbHVlOiB0aGlzLmdldEZpbHRlckl0ZW1WYWx1ZSxcbiAgICAgICAgICBvbkNlbGxWYWx1ZUNoYW5nZTogdGhpcy5vbkZpbHRlckNlbGxWYWx1ZUNoYW5nZSxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIC8vIGhhbmRsZSBjb2x1bW4uY2VsbCAvIGNvbHVtbi5jZWxsRWRpdCAvIGNvbHVtbi5jZWxsQ3JlYXRlIC8gY29sdW1uLmNlbGxGaWx0ZXJcbiAgICAgIGNvbnN0IGNlbGxQcm9wcyA9IHtcbiAgICAgICAgZGF0YSxcbiAgICAgICAgZGF0ZUZvcm1hdCxcbiAgICAgICAgdGhvdXNhbmRTZXBhcmF0b3IsXG4gICAgICAgIGRlY2ltYWxTZXBhcmF0b3IsXG4gICAgICB9OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICBjb2x1bW4gPSBHcmlkQ29sdW1uU2VydmljZS5jb2x1bW5DZWxsKGNvbHVtbiwgY2VsbFByb3BzLCBjb2wsIHZhbHVlUmVuZGVyKTtcblxuICAgICAgLy8gaGFuZGxlIGNvbHVtbkNvbXBvbmVudFR5cGVzXG4gICAgICBjb25zdCBjb21wb25lbnRUeXBlUHJvcHMgPSB7XG4gICAgICAgIC4uLmNlbGxQcm9wcyxcbiAgICAgICAgZ3JpZCxcbiAgICAgICAgaW5saW5lRWRpdCxcbiAgICAgICAgZmlsdGVyaW5nLFxuICAgICAgICByZWdpb24sXG4gICAgICAgIGludGwsXG4gICAgICAgIHNlbGVjdENvbXBvbmVudE9wdGlvbnMsXG4gICAgICB9OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICBjb2x1bW4gPSBHcmlkQ29sdW1uU2VydmljZS5jb2x1bW5Db21wb25lbnRUeXBlKFxuICAgICAgICBjb2x1bW4sXG4gICAgICAgIHRhYkluZGV4LFxuICAgICAgICBjb21wb25lbnRUeXBlUHJvcHMsXG4gICAgICAgIGNvbCxcbiAgICAgICAgY29sdW1uRnVuY3Rpb25zLFxuICAgICAgICB0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUsXG4gICAgICApO1xuXG4gICAgICBjb2x1bW5zLnB1c2goY29sdW1uKTtcbiAgICB9KTtcblxuICAgIGlmIChpc0NyZWF0aW5nKSB7XG4gICAgICBjb2x1bW5zLnB1c2goe1xuICAgICAgICB3aWR0aDogMzcsXG4gICAgICAgIGlzUmVzaXphYmxlOiBmYWxzZSxcbiAgICAgICAgY29sdW1uS2V5OiAncmVtb3ZlTmV3SXRlbScsXG4gICAgICAgIGNlbGw6ICgpID0+IG51bGwsXG4gICAgICAgIGNlbGxFZGl0OiAoKSA9PiBudWxsLFxuICAgICAgICBjZWxsQ3JlYXRlOiByb3dJbmRleCA9PiAoXG4gICAgICAgICAgPEljb25cbiAgICAgICAgICAgIGlkPXtgb2MtZGF0YWdyaWQtbmV3LWl0ZW0tcmVtb3ZlLSR7Z3JpZC5pZH0tJHtyb3dJbmRleH1gfVxuICAgICAgICAgICAgdHlwZT1cImluZGljYXRvclwiXG4gICAgICAgICAgICBuYW1lPVwiZGVsZXRlXCJcbiAgICAgICAgICAgIHdpZHRoPXszMH1cbiAgICAgICAgICAgIGhlaWdodD17MzB9XG4gICAgICAgICAgICBzdHlsZT17eyBwYWRkaW5nOiAnN3B4JyB9fVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdGhpcy5wcm9wcy5yZW1vdmVOZXdJdGVtKGdyaWQsIHJvd0luZGV4KX1cbiAgICAgICAgICAvPlxuICAgICAgICApLFxuICAgICAgICBjZWxsRmlsdGVyOiAoKSA9PiBudWxsLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBjb2x1bW5zO1xuICB9O1xuXG4gIGlzQ2VsbEVkaXRlZCA9IChyb3dJbmRleCwgY29sLCBjZWxsVHlwZSkgPT4ge1xuICAgIGlmIChjZWxsVHlwZSAhPT0gJ2VkaXQnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICByZXR1cm4gISF0aGlzLnByb3BzLmVkaXREYXRhLmdldEluKFtpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICB9O1xuXG4gIGhhbmRsZUFmdGVyQWRkSXRlbSA9ICgpID0+IHtcbiAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsID0gdHJ1ZTtcbiAgfTtcblxuICBoYW5kbGVBZnRlckVkaXRQcmVzcyA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLnNpemUpIHtcbiAgICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gdHJ1ZTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjdXJyZW50Um93OiB1bmRlZmluZWQsXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlQWZ0ZXJWYWxpZGF0aW9uRXJyb3IgPSAoKSA9PiB7XG4gICAgdGhpcy5mb2N1c1RvRXJyb3JDZWxsID0gdHJ1ZTtcbiAgfTtcblxuICBoYW5kbGVSb3dDbGljayA9IChlLCByb3dJbmRleCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnJvd1NlbGVjdCAmJiAhdGhpcy5wcm9wcy5pc0NyZWF0aW5nICYmICF0aGlzLnByb3BzLmlzRWRpdGluZykge1xuICAgICAgaWYgKGUuY3RybEtleSB8fCBlLnNoaWZ0S2V5KSB7XG4gICAgICAgIGRvY3VtZW50LmdldFNlbGVjdGlvbigpXG4gICAgICAgICAgLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgfVxuICAgICAgLy8gRG9uJ3QgdHJpZ2dlciBzZWxlY3Rpb24gY2hhbmdlIG9uIHdoZW4gdXNlciBjbGlja3Mgb24gc3BlY2lhbCBjZWxscyBsaWtlIGNoZWNrYm94L2V4dHJhXG4gICAgICAvLyBDaGVjayB0aGF0IGNsaWNrZWQgbm9kZSdzIHBhcmVudCBvciBwYXJlbnQncyBwYXJlbnQgZG9lc24ndCBoYXZlIG5vLXJvdy1zZWxlY3QgY2xhc3NcbiAgICAgIGNvbnN0IHsgcGFyZW50Tm9kZSB9ID0gZS50YXJnZXQ7XG4gICAgICBjb25zdCBwYXJlbnQxY2xhc3MgPSBwYXJlbnROb2RlLmNsYXNzTmFtZSAmJiBwYXJlbnROb2RlLmNsYXNzTmFtZS5pbmRleE9mXG4gICAgICAgID8gcGFyZW50Tm9kZS5jbGFzc05hbWVcbiAgICAgICAgOiAnJztcbiAgICAgIGNvbnN0IHBhcmVudDJjbGFzcyA9IHBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUgJiYgcGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZS5pbmRleE9mIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgPyBwYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgIDogJyc7XG4gICAgICBjb25zdCBwYXJlbnQzY2xhc3MgPSBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUgJiYgcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lLmluZGV4T2YgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICA/IHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZVxuICAgICAgICA6ICcnO1xuICAgICAgY29uc3QgcGFyZW50NGNsYXNzID0gcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUgJiYgcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUuaW5kZXhPZiAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgID8gcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWVcbiAgICAgICAgOiAnJztcbiAgICAgIGlmIChcbiAgICAgICAgcGFyZW50MWNsYXNzLmluZGV4T2YoJ25vLXJvdy1zZWxlY3QnKSA9PT0gLTEgJiZcbiAgICAgICAgcGFyZW50MmNsYXNzLmluZGV4T2YoJ25vLXJvdy1zZWxlY3QnKSA9PT0gLTEgJiZcbiAgICAgICAgcGFyZW50M2NsYXNzLmluZGV4T2YoJ25vLXJvdy1zZWxlY3QnKSA9PT0gLTEgJiZcbiAgICAgICAgcGFyZW50NGNsYXNzLmluZGV4T2YoJ25vLXJvdy1zZWxlY3QnKSA9PT0gLTFcbiAgICAgICkge1xuICAgICAgICB0aGlzLnByb3BzLml0ZW1TZWxlY3Rpb25DaGFuZ2UoXG4gICAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgIHRoaXMucHJvcHMubXVsdGlTZWxlY3QgJiYgZS5jdHJsS2V5LFxuICAgICAgICAgIHRoaXMucHJvcHMubXVsdGlTZWxlY3QgJiYgZS5zaGlmdEtleSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMub25Sb3dDbGljaykge1xuICAgICAgdGhpcy5wcm9wcy5vblJvd0NsaWNrKGUsIHJvd0luZGV4LCB0aGlzLnByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGhhbmRsZUNvbnRleHRNZW51ID0gKGUsIHJvd0luZGV4KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuY29udGV4dE1lbnVJdGVtcykge1xuICAgICAgY29uc3Qge1xuICAgICAgICBpdGVtU2VsZWN0aW9uQ2hhbmdlLFxuICAgICAgICBzZWxlY3RlZEl0ZW1zLFxuICAgICAgICBncmlkLFxuICAgICAgICBkYXRhLFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGNvbnRleHRNZW51T3BlbjogdHJ1ZSxcbiAgICAgICAgY29udGV4dE1lbnVYOiBlLmNsaWVudFgsXG4gICAgICAgIGNvbnRleHRNZW51WTogZS5jbGllbnRZLFxuICAgICAgfSk7XG4gICAgICAvLyBJZiBjbGlja2VkIGl0ZW0gaXMgbm90IHNlbGVjdGVkLCBjaGFuZ2Ugc2VsZWN0aW9uIHRvIGl0XG4gICAgICBpZiAoIXNlbGVjdGVkSXRlbXMuaW5jbHVkZXMoZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmdyaWQuaWRLZXlQYXRoXSkpKSB7XG4gICAgICAgIGl0ZW1TZWxlY3Rpb25DaGFuZ2UoZ3JpZCwgcm93SW5kZXgpO1xuICAgICAgfVxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uRG9jdW1lbnRDbGljayk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGhhbmRsZUNvbnRleHRNZW51SXRlbUNsaWNrID0gKG9uQ2xpY2ssIHNlbGVjdGVkSXRlbXMsIHNlbGVjdGVkRGF0YSkgPT4gKCkgPT4ge1xuICAgIG9uQ2xpY2soc2VsZWN0ZWRJdGVtcywgc2VsZWN0ZWREYXRhKTtcbiAgfTtcblxuICBoYW5kbGVSb3dIZWlnaHRHZXR0ZXIgPSByb3dJbmRleCA9PlxuICAgIHRoaXMucHJvcHMucm93SGVpZ2h0R2V0dGVyKHRoaXMucHJvcHMuZGF0YS5nZXQocm93SW5kZXgpLCByb3dJbmRleCk7XG5cbiAgcmVuZGVyQ2VsbCA9IGNvbCA9PiAoY2VsbFByb3BzKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgaXNDcmVhdGluZyxcbiAgICAgIGlzRWRpdGluZyxcbiAgICAgIGNyZWF0ZURhdGEsXG4gICAgICBzZWxlY3RlZENlbGwsXG4gICAgICBncmlkLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgcm93SW5kZXgsIC4uLnByb3BzIH0gPSBjZWxsUHJvcHM7XG4gICAgbGV0IGNlbGw7XG4gICAgbGV0IGNlbGxUeXBlID0gJ3ZpZXcnO1xuICAgIGxldCBleHRyYVJvd0NvdW50ID0gMDsgLy8gaG93IG1hbnkgcm93cyB0byBpZ25vcmUgZnJvbSB0b3AsIG5ldyArIGZpbHRlciByb3dzXG4gICAgaWYgKGlzQ3JlYXRpbmcpIGV4dHJhUm93Q291bnQgPSBjcmVhdGVEYXRhLnNpemU7XG4gICAgaWYgKGlzQ3JlYXRpbmcpIHtcbiAgICAgIGlmIChyb3dJbmRleCA8PSAoZXh0cmFSb3dDb3VudCAtIDEpKSB7XG4gICAgICAgIGlmIChjb2wuY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNlbGwgPSBjb2wuY2VsbENyZWF0ZShyb3dJbmRleCk7XG4gICAgICAgICAgY2VsbFR5cGUgPSAnY3JlYXRlJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjZWxsID0gbnVsbDtcbiAgICAgICAgICBjZWxsVHlwZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNlbGwgPSBjb2wuY2VsbChyb3dJbmRleCAtIGV4dHJhUm93Q291bnQpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNFZGl0aW5nICYmIGNvbC5jZWxsRWRpdCkge1xuICAgICAgY2VsbCA9IGNvbC5jZWxsRWRpdChyb3dJbmRleCAtIGV4dHJhUm93Q291bnQpO1xuICAgICAgY2VsbFR5cGUgPSAnZWRpdCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNlbGwgPSBjb2wuY2VsbChyb3dJbmRleCAtIGV4dHJhUm93Q291bnQpO1xuICAgIH1cbiAgICBjb25zdCBpc1NwZWNpYWwgPSBwcm9wcy5jb2x1bW5LZXkgPT09ICdzZWxlY3Rpb25DaGVja2JveCcgfHwgcHJvcHMuY29sdW1uS2V5ID09PSAnZXh0cmFDb2x1bW4nO1xuICAgIGlmICgoY2VsbFR5cGUgPT09ICd2aWV3JyB8fCBjZWxsVHlwZSA9PT0gJ2VkaXQnIHx8IGNlbGxUeXBlID09PSAnY3JlYXRlJykgJiYgIWlzU3BlY2lhbCkge1xuICAgICAgY29uc3QgZ2V0Um93SW5kZXggPSAoY2VsbFR5cGUgPT09ICdjcmVhdGUnKSA/IHJvd0luZGV4IDogKHJvd0luZGV4IC0gZXh0cmFSb3dDb3VudCk7XG4gICAgICBjb25zdCBtZXNzYWdlRGF0YSA9IHRoaXMuZ2V0Q2VsbE1lc3NhZ2VzKGdldFJvd0luZGV4LCBjb2wsIGNlbGxUeXBlKTtcbiAgICAgIGNvbnN0IGlzRWRpdGVkID0gdGhpcy5pc0NlbGxFZGl0ZWQoZ2V0Um93SW5kZXgsIGNvbCwgY2VsbFR5cGUpO1xuICAgICAgY29uc3QgY2xhc3NOYW1lID0gKHNlbGVjdGVkQ2VsbC5nZXQoJ3Jvd0luZGV4JykgPT09IHJvd0luZGV4ICYmIHNlbGVjdGVkQ2VsbC5nZXQoJ2NvbHVtbktleScpID09PSBwcm9wcy5jb2x1bW5LZXkpID9cbiAgICAgICAgJ29jLWRhdGFncmlkLWNlbGwgaXMtc2VsZWN0ZWQnIDogJ29jLWRhdGFncmlkLWNlbGwnO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPENlbGxcbiAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG4gICAgICAgICAgc3R5bGU9e2NvbC5zdHlsZX1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNlbGxTZWxlY3QoY2VsbFR5cGUsIHJvd0luZGV4LCBwcm9wcy5jb2x1bW5LZXkpfVxuICAgICAgICA+XG4gICAgICAgICAgPENlbGxUb29sdGlwXG4gICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRDZWxsLSR7Z3JpZC5pZH0tJHtwcm9wcy5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgIGlzRWRpdGVkPXtpc0VkaXRlZH1cbiAgICAgICAgICAgIGlzRXJyb3I9eyEhbWVzc2FnZURhdGEuZXJyb3JNZXNzYWdlfVxuICAgICAgICAgICAgaXNXYXJuaW5nPXshIW1lc3NhZ2VEYXRhLndhcm5pbmdNZXNzYWdlfVxuICAgICAgICAgICAgaW5mb01lc3NhZ2U9e21lc3NhZ2VEYXRhLmluZm9NZXNzYWdlfVxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlPXttZXNzYWdlRGF0YS5lcnJvck1lc3NhZ2V9XG4gICAgICAgICAgICB3YXJuaW5nTWVzc2FnZT17bWVzc2FnZURhdGEud2FybmluZ01lc3NhZ2V9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2NlbGx9XG4gICAgICAgICAgPC9DZWxsVG9vbHRpcD5cbiAgICAgICAgPC9DZWxsPlxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxDZWxsIHsuLi5wcm9wc30gY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtY2VsbFwiIHN0eWxlPXtjb2wuc3R5bGV9PntjZWxsfTwvQ2VsbD5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlckNvbHVtbnMgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmFsbERhdGFTaXplICYmICF0aGlzLnByb3BzLmlzQnVzeSAmJiAhdGhpcy5wcm9wcy5pc0NyZWF0aW5nKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Q29sdW1uXG4gICAgICAgICAgY29sdW1uS2V5PVwiZGF0YUVtcHR5Q29sdW1uXCJcbiAgICAgICAgICBoZWFkZXI9ezxDZWxsIHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicgfX0+PE0gaWQ9XCJHcmlkLk5vSXRlbXNcIiAvPjwvQ2VsbD59XG4gICAgICAgICAgd2lkdGg9ezEwfVxuICAgICAgICAgIGlzUmVzaXphYmxlPXtmYWxzZX1cbiAgICAgICAgICBmbGV4R3Jvdz17MX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICAgIGlmICghdGhpcy5wcm9wcy52aXNpYmxlQ29sdW1ucy5zaXplKSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5pc0J1c3kpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8Q29sdW1uXG4gICAgICAgICAgICBjb2x1bW5LZXk9XCJkYXRhRW1wdHlDb2x1bW5cIlxuICAgICAgICAgICAgaGVhZGVyPXs8Q2VsbD4mbmJzcDs8L0NlbGw+fVxuICAgICAgICAgICAgd2lkdGg9ezEwfVxuICAgICAgICAgICAgaXNSZXNpemFibGU9e2ZhbHNlfVxuICAgICAgICAgICAgZmxleEdyb3c9ezF9XG4gICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxDb2x1bW5cbiAgICAgICAgICBjb2x1bW5LZXk9XCJkYXRhRW1wdHlDb2x1bW5cIlxuICAgICAgICAgIGhlYWRlcj17PENlbGwgc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJyB9fT48TSBpZD1cIkdyaWQuTm9Db2x1bW5zXCIgLz48L0NlbGw+fVxuICAgICAgICAgIHdpZHRoPXsxMH1cbiAgICAgICAgICBpc1Jlc2l6YWJsZT17ZmFsc2V9XG4gICAgICAgICAgZmxleEdyb3c9ezF9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCBjb2x1bW5zID0gdGhpcy5nZW5lcmF0ZUNvbHVtbnMoKTtcbiAgICBpZiAoY29sdW1ucy5sZW5naHQgPT09IDApIHJldHVybiBudWxsO1xuICAgIHJldHVybiBjb2x1bW5zLm1hcChjb2wgPT4gKFxuICAgICAgPENvbHVtblxuICAgICAgICBrZXk9e2NvbC5jb2x1bW5LZXl9XG4gICAgICAgIGNvbHVtbktleT17Y29sLmNvbHVtbktleX1cbiAgICAgICAgaGVhZGVyPXtcbiAgICAgICAgICA8SGVhZGVyQ2VsbFxuICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkSGVhZGVyLSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbC5jb2x1bW5LZXl9YH1cbiAgICAgICAgICAgIGdyaWQ9e3RoaXMucHJvcHMuZ3JpZH1cbiAgICAgICAgICAgIGNvbHVtbnM9e3RoaXMucHJvcHMuY29sdW1uc31cbiAgICAgICAgICAgIGNvbHVtbj17Y29sfVxuICAgICAgICAgICAgY3VycmVudFNvcnRDb2x1bW49e3RoaXMucHJvcHMuc29ydENvbHVtbn1cbiAgICAgICAgICAgIGN1cnJlbnRTb3J0T3JkZXI9e3RoaXMucHJvcHMuc29ydE9yZGVyfVxuICAgICAgICAgICAgb25Tb3J0Q2hhbmdlPXt0aGlzLnByb3BzLnNvcnRDaGFuZ2V9XG4gICAgICAgICAgICBpc0J1c3k9e3RoaXMucHJvcHMuaXNCdXN5fVxuICAgICAgICAgICAgZmlsdGVyaW5nPXt0aGlzLnByb3BzLmlzRmlsdGVyaW5nfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtjb2wuaGVhZGVyfVxuICAgICAgICAgIDwvSGVhZGVyQ2VsbD5cbiAgICAgICAgfVxuICAgICAgICBjZWxsPXt0aGlzLnJlbmRlckNlbGwoY29sKX1cbiAgICAgICAgd2lkdGg9e3RoaXMucHJvcHMuY29sdW1uV2lkdGhzLmdldChjb2wuY29sdW1uS2V5LCBjb2wud2lkdGgpfVxuICAgICAgICBtaW5XaWR0aD17Y29sLm1pbldpZHRofVxuICAgICAgICBtYXhXaWR0aD17Y29sLm1heFdpZHRofVxuICAgICAgICBpc1Jlc2l6YWJsZT17Y29sLmlzUmVzaXphYmxlfVxuICAgICAgICBmbGV4R3Jvdz17Y29sLmZsZXhHcm93ID8gY29sLmZsZXhHcm93IDogMH1cbiAgICAgICAgZml4ZWQ9e2NvbC5maXhlZH1cbiAgICAgICAgZml4ZWRSaWdodD17Y29sLmZpeGVkUmlnaHR9XG4gICAgICAgIGFsbG93Q2VsbHNSZWN5Y2xpbmc9e2NvbC5hbGxvd0NlbGxzUmVjeWNsaW5nfVxuICAgICAgLz4pKTtcbiAgfTtcblxuICByZW5kZXJDb250ZXh0TWVudSA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBjb250ZXh0TWVudUl0ZW1zLFxuICAgICAgZGF0YSxcbiAgICAgIGdyaWQsXG4gICAgICBzZWxlY3RlZEl0ZW1zLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHtcbiAgICAgIGNvbnRleHRNZW51WCxcbiAgICAgIGNvbnRleHRNZW51WSxcbiAgICB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBzdHlsZSA9IHtcbiAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICB6SW5kZXg6IDEwMDAwLFxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICB0b3A6IGAke2NvbnRleHRNZW51WX1weGAsXG4gICAgICBsZWZ0OiBgJHtjb250ZXh0TWVudVh9cHhgLFxuICAgIH07XG4gICAgY29uc3Qgc2VsZWN0ZWREYXRhID0gZGF0YS5maWx0ZXIoZCA9PiBzZWxlY3RlZEl0ZW1zLmluY2x1ZGVzKGQuZ2V0SW4oZ3JpZC5pZEtleVBhdGgpKSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDx1bCBjbGFzc05hbWU9XCJkcm9wZG93bi1tZW51IG9jLWRhdGFncmlkLWNvbnRleHQtbWVudSBvcGVuXCIgc3R5bGU9e3N0eWxlfT5cbiAgICAgICAge2NvbnRleHRNZW51SXRlbXMgJiYgY29udGV4dE1lbnVJdGVtcy5tYXAgJiYgY29udGV4dE1lbnVJdGVtcy5tYXAoKGl0ZW0sIGkpID0+IHtcbiAgICAgICAgICBsZXQgeyBkaXNhYmxlZCB9ID0gaXRlbTtcbiAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0uZGlzYWJsZWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGRpc2FibGVkID0gaXRlbS5kaXNhYmxlZChzZWxlY3RlZEl0ZW1zLCBzZWxlY3RlZERhdGEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPE1lbnVJdGVtXG4gICAgICAgICAgICAgIGtleT17aX0gLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAgICAgICBoZWFkZXI9e2l0ZW0uaGVhZGVyfVxuICAgICAgICAgICAgICBkaXZpZGVyPXtpdGVtLmRpdmlkZXJ9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgdGl0bGU9e2l0ZW0udGl0bGV9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9eyhkaXNhYmxlZCB8fCAhaXRlbS5vbkNsaWNrKSA/IG51bGwgOiB0aGlzLmhhbmRsZUNvbnRleHRNZW51SXRlbUNsaWNrKFxuICAgICAgICAgICAgICAgIGl0ZW0ub25DbGljayxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEl0ZW1zLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkRGF0YSxcbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2l0ZW0udmFsdWV9XG4gICAgICAgICAgICA8L01lbnVJdGVtPlxuICAgICAgICAgICk7XG4gICAgICAgIH0pfVxuICAgICAgPC91bD5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBncmlkQ2xhc3NOYW1lID0gY2xhc3NOYW1lcyh7XG4gICAgICAnb2MtZGF0YWdyaWQtY29udGFpbmVyJzogdHJ1ZSxcbiAgICAgICd3aXRoLWFjdGlvbmJhcic6IHRoaXMucHJvcHMuaW5saW5lRWRpdCAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlQWN0aW9uQmFyLFxuICAgICAgJ2lzLWJ1c3knOiB0aGlzLnByb3BzLmlzQnVzeSxcbiAgICAgICdpcy1lZGl0aW5nJzogdGhpcy5wcm9wcy5pc0VkaXRpbmcsXG4gICAgICAnaXMtY3JlYXRpbmcnOiB0aGlzLnByb3BzLmlzQ3JlYXRpbmcsXG4gICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgIH0pO1xuXG4gICAgLy8gY2hlY2sgaWYgdGhlcmUgaXMgYSBuZXcgcmVxdWVzdCB0byBjaGFuZ2UgZWRpdCBtb2RlIGZvY3VzXG4gICAgdGhpcy5zZXRGb2N1c1RvKHRoaXMucHJvcHMuZm9jdXNUeXBlKTtcblxuICAgIGxldCBhY3Rpb25CYXIgPSBudWxsO1xuICAgIGxldCBhY3Rpb25CYXJSaWdodCA9IG51bGw7XG4gICAgbGV0IGFjdGlvbkJhckxlZnQgPSBudWxsO1xuICAgIGlmIChcbiAgICAgICh0aGlzLnByb3BzLmFjdGlvbkJhciB8fFxuICAgICAgICB0aGlzLnByb3BzLmlubGluZUVkaXQgfHxcbiAgICAgICAgdGhpcy5wcm9wcy5maWx0ZXJpbmcgfHxcbiAgICAgICAgdGhpcy5wcm9wcy5yZW1vdmluZykgJiZcbiAgICAgICF0aGlzLnByb3BzLmRpc2FibGVBY3Rpb25CYXJcbiAgICApIHtcbiAgICAgIGFjdGlvbkJhclJpZ2h0ID0gKFxuICAgICAgICA8QWN0aW9uQmFyIHBvc2l0aW9uPVwicmlnaHRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWFjdGlvbmJhci1yaWdodFwiPnt0aGlzLnByb3BzLmFjdGlvbkJhcn08L2Rpdj5cbiAgICAgICAgICB7KHRoaXMucHJvcHMuZmlsdGVyaW5nICYmIHRoaXMucHJvcHMuZGlzYWJsZURyb3Bkb3duICYmXG4gICAgICAgICAgICAhdGhpcy5wcm9wcy5kaXNhYmxlRmlsdGVyaW5nQ29udHJvbHMpICYmIDxGaWx0ZXJpbmdDb250cm9scyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgICB9XG4gICAgICAgICAge3RoaXMucHJvcHMuaW5saW5lRWRpdCAmJlxuICAgICAgICAgIDxJbmxpbmVFZGl0Q29udHJvbHNcbiAgICAgICAgICAgIGFmdGVyQWRkSXRlbT17dGhpcy5oYW5kbGVBZnRlckFkZEl0ZW19XG4gICAgICAgICAgICBhZnRlckVkaXRQcmVzcz17dGhpcy5oYW5kbGVBZnRlckVkaXRQcmVzc31cbiAgICAgICAgICAgIGFmdGVyVmFsaWRhdGlvbkVycm9yPXt0aGlzLmhhbmRsZUFmdGVyVmFsaWRhdGlvbkVycm9yfVxuICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgLz5cbiAgICAgICAgICB9XG4gICAgICAgICAgeyh0aGlzLnByb3BzLmRyb3Bkb3duTWVudUl0ZW1zIHx8XG4gICAgICAgICAgICB0aGlzLnByb3BzLnJlbW92aW5nIHx8XG4gICAgICAgICAgICB0aGlzLnByb3BzLmNvbHVtblNldHRpbmdzIHx8XG4gICAgICAgICAgICAodGhpcy5wcm9wcy5maWx0ZXJpbmcgJiZcbiAgICAgICAgICAgICAgIXRoaXMucHJvcHMuZGlzYWJsZURyb3Bkb3duKSkgJiYgPERyb3Bkb3duQ29udHJvbHMgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICAgfVxuICAgICAgICA8L0FjdGlvbkJhcj5cbiAgICAgICk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLmFjdGlvbkJhckxlZnQgfHwgdGhpcy5wcm9wcy5ncmlkSGVhZGVyKSB7XG4gICAgICBhY3Rpb25CYXJMZWZ0ID0gKFxuICAgICAgICA8QWN0aW9uQmFyIHBvc2l0aW9uPVwibGVmdFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtZ3JpZGhlYWRlclwiPnt0aGlzLnByb3BzLmdyaWRIZWFkZXJ9PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1hY3Rpb25iYXItbGVmdFwiPnt0aGlzLnByb3BzLmFjdGlvbkJhckxlZnR9PC9kaXY+XG4gICAgICAgIDwvQWN0aW9uQmFyPlxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGFjdGlvbkJhckxlZnQgfHwgYWN0aW9uQmFyUmlnaHQpIHtcbiAgICAgIGFjdGlvbkJhciA9IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1hY3Rpb25iYXItY29udGFpbmVyXCI+XG4gICAgICAgICAge2FjdGlvbkJhckxlZnR9XG4gICAgICAgICAge2FjdGlvbkJhclJpZ2h0fVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICAgIGxldCByb3dzQ291bnQgPVxuICAgICAgKHRoaXMucHJvcHMucm93c0NvdW50IHx8IHRoaXMucHJvcHMucm93c0NvdW50ID09PSAwKSA/XG4gICAgICAgIHRoaXMucHJvcHMucm93c0NvdW50IDpcbiAgICAgICAgdGhpcy5wcm9wcy5kYXRhLnNpemU7XG4gICAgaWYgKHRoaXMucHJvcHMuaXNDcmVhdGluZykgcm93c0NvdW50ICs9IHRoaXMucHJvcHMuY3JlYXRlRGF0YS5zaXplO1xuICAgIGlmICghdGhpcy5wcm9wcy52aXNpYmxlQ29sdW1ucy5zaXplKSByb3dzQ291bnQgPSAwO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPXtgb2MtZGF0YWdyaWQtJHt0aGlzLnByb3BzLmdyaWQuaWR9YH1cbiAgICAgICAgY2xhc3NOYW1lPXtncmlkQ2xhc3NOYW1lfVxuICAgICAgICBzdHlsZT17dGhpcy5wcm9wcy5jb250YWluZXJTdHlsZX1cbiAgICAgID5cbiAgICAgICAge3RoaXMucHJvcHMuaXNCdXN5ICYmIDxTcGlubmVyIC8+fVxuICAgICAgICB7dGhpcy5zdGF0ZS5jb250ZXh0TWVudU9wZW4gJiYgdGhpcy5yZW5kZXJDb250ZXh0TWVudSgpfVxuICAgICAgICB7YWN0aW9uQmFyfVxuICAgICAgICA8UmVzcG9uc2l2ZUZpeGVkRGF0YVRhYmxlXG4gICAgICAgICAgaWQ9e3RoaXMucHJvcHMuZ3JpZC5pZH1cbiAgICAgICAgICByb3dzQ291bnQ9e3Jvd3NDb3VudH1cbiAgICAgICAgICBoZWFkZXJIZWlnaHQ9e3RoaXMucHJvcHMuaXNGaWx0ZXJpbmcgP1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5oZWFkZXJIZWlnaHQgKyB0aGlzLnByb3BzLmZpbHRlclJvd0hlaWdodFxuICAgICAgICAgICAgOiB0aGlzLnByb3BzLmhlYWRlckhlaWdodH1cbiAgICAgICAgICByb3dIZWlnaHQ9e3RoaXMucHJvcHMucm93SGVpZ2h0fVxuICAgICAgICAgIG9uQ29sdW1uUmVzaXplRW5kQ2FsbGJhY2s9e3RoaXMub25Db2x1bW5SZXNpemVFbmRDYWxsYmFja31cbiAgICAgICAgICBpc0NvbHVtblJlc2l6aW5nPXtmYWxzZX1cbiAgICAgICAgICBvblJvd0NsaWNrPXt0aGlzLmhhbmRsZVJvd0NsaWNrfVxuICAgICAgICAgIHNjcm9sbFRvQ29sdW1uPXt0aGlzLnByb3BzLnNjcm9sbFRvQ29sdW1uIHx8IHRoaXMuc3RhdGUuY3VycmVudENvbHVtbn1cbiAgICAgICAgICBzY3JvbGxUb3A9e3RoaXMucHJvcHMuc2Nyb2xsVG9wfVxuICAgICAgICAgIHNjcm9sbFRvUm93PXt0aGlzLmdldFNjcm9sbFRvUm93KCl9XG4gICAgICAgICAgb25Sb3dEb3VibGVDbGljaz17dGhpcy5wcm9wcy5vblJvd0RvdWJsZUNsaWNrfVxuICAgICAgICAgIG9uUm93TW91c2VEb3duPXt0aGlzLnByb3BzLm9uTW91c2VEb3dufVxuICAgICAgICAgIG9uUm93TW91c2VFbnRlcj17dGhpcy5wcm9wcy5vblJvd01vdXNlRW50ZXJ9XG4gICAgICAgICAgb25Sb3dNb3VzZUxlYXZlPXt0aGlzLnByb3BzLm9uUm93TW91c2VMZWF2ZX1cbiAgICAgICAgICBvblNjcm9sbFN0YXJ0PXt0aGlzLnByb3BzLm9uU2Nyb2xsU3RhcnR9XG4gICAgICAgICAgb25TY3JvbGxFbmQ9e3RoaXMucHJvcHMub25TY3JvbGxFbmR9XG4gICAgICAgICAgcm93Q2xhc3NOYW1lR2V0dGVyPXt0aGlzLmdldFJvd0NsYXNzTmFtZX1cbiAgICAgICAgICByb3dIZWlnaHRHZXR0ZXI9e3RoaXMucHJvcHMucm93SGVpZ2h0R2V0dGVyICYmIHRoaXMuaGFuZGxlUm93SGVpZ2h0R2V0dGVyfVxuICAgICAgICAgIG9uQ29udGVudEhlaWdodENoYW5nZT17dGhpcy5wcm9wcy5vbkNvbnRlbnRIZWlnaHRDaGFuZ2V9XG4gICAgICAgICAgb25Sb3dDb250ZXh0TWVudT17dGhpcy5oYW5kbGVDb250ZXh0TWVudX1cbiAgICAgICAgPlxuICAgICAgICAgIHt0aGlzLnJlbmRlckNvbHVtbnMoKX1cbiAgICAgICAgPC9SZXNwb25zaXZlRml4ZWREYXRhVGFibGU+XG4gICAgICAgIHt0aGlzLnByb3BzLmlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW4gJiZcbiAgICAgICAgPENvbHVtblNldHRpbmdzTW9kYWxcbiAgICAgICAgICBncmlkPXt0aGlzLnByb3BzLmdyaWR9XG4gICAgICAgICAgY29sdW1ucz17dGhpcy5wcm9wcy5jb2x1bW5zfVxuICAgICAgICAgIHZpc2libGVDb2x1bW5zPXt0aGlzLnByb3BzLnZpc2libGVDb2x1bW5zfVxuICAgICAgICAgIGNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbD17dGhpcy5wcm9wcy5jbG9zZUNvbHVtblNldHRpbmdzTW9kYWx9XG4gICAgICAgICAgc2F2ZUNvbHVtblNldHRpbmdzPXt0aGlzLnByb3BzLnNhdmVDb2x1bW5TZXR0aW5nc31cbiAgICAgICAgLz5cbiAgICAgICAgfVxuICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRGF0YUdyaWQ7XG4iXX0=