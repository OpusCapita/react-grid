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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbImRhdGFncmlkQWN0aW9ucyIsIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwib3duUHJvcHMiLCJHUklEIiwiZ3JpZCIsImlzQnVzeSIsImRhdGFncmlkIiwiZ2V0SW4iLCJpZCIsImlzRWRpdGluZyIsImlzQ3JlYXRpbmciLCJpc0ZpbHRlcmluZyIsImlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW4iLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwidmlzaWJsZUNvbHVtbnMiLCJjb2x1bW5XaWR0aHMiLCJzZWxlY3RlZENlbGwiLCJzZWxlY3RlZEl0ZW1zIiwiZGF0YSIsImVkaXREYXRhIiwiY3JlYXRlRGF0YSIsImZpbHRlckRhdGEiLCJjZWxsTWVzc2FnZXMiLCJjcmVhdGVDZWxsTWVzc2FnZXMiLCJhbGxEYXRhU2l6ZSIsInNpemUiLCJsYW5ndWFnZSIsIlV0aWxzIiwiZ2V0TGFuZ3VhZ2UiLCJ1c2VyIiwicmVnaW9uIiwiZ2V0UmVnaW9uIiwiZGF0ZUZvcm1hdCIsImdldERhdGVGb3JtYXQiLCJ0aG91c2FuZFNlcGFyYXRvciIsImdldFRob3VzYW5kU2VwYXJhdG9yIiwiZGVjaW1hbFNlcGFyYXRvciIsImdldERlY2ltYWxTZXBhcmF0b3IiLCJmb3JjZVJlZnJlc2hUaW1lc3RhbXAiLCJnZXQiLCJmb2N1c1R5cGUiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJEYXRhR3JpZCIsInBhZ2luYXRpb24iLCJpbmplY3RJbnRsIiwicHJvcHMiLCJjdXJyZW50Um93IiwiY3VycmVudENvbHVtbiIsImNvbnRleHRNZW51T3BlbiIsImNvbnRleHRNZW51WCIsImNvbnRleHRNZW51WSIsImNlbGxSZWZzIiwiY3JlYXRlQ2VsbFJlZnMiLCJmb2N1c1RvQ3JlYXRlQ2VsbCIsImZvY3VzVG9FZGl0Q2VsbCIsImZvY3VzVG9FcnJvckNlbGwiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImRvY3VtZW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIm9uRG9jdW1lbnRDbGljayIsImludmFsaWRhdGUiLCJyZW5kZXIiLCJncmlkQ2xhc3NOYW1lIiwiaW5saW5lRWRpdCIsImRpc2FibGVBY3Rpb25CYXIiLCJjbGFzc05hbWUiLCJzZXRGb2N1c1RvIiwiYWN0aW9uQmFyIiwiYWN0aW9uQmFyUmlnaHQiLCJhY3Rpb25CYXJMZWZ0IiwiZmlsdGVyaW5nIiwicmVtb3ZpbmciLCJkaXNhYmxlRHJvcGRvd24iLCJkaXNhYmxlRmlsdGVyaW5nQ29udHJvbHMiLCJoYW5kbGVBZnRlckFkZEl0ZW0iLCJoYW5kbGVBZnRlckVkaXRQcmVzcyIsImhhbmRsZUFmdGVyVmFsaWRhdGlvbkVycm9yIiwiZHJvcGRvd25NZW51SXRlbXMiLCJjb2x1bW5TZXR0aW5ncyIsImdyaWRIZWFkZXIiLCJyb3dzQ291bnQiLCJjb250YWluZXJTdHlsZSIsInJlbmRlckNvbnRleHRNZW51IiwiaGVhZGVySGVpZ2h0IiwiZmlsdGVyUm93SGVpZ2h0Iiwicm93SGVpZ2h0Iiwib25Db2x1bW5SZXNpemVFbmRDYWxsYmFjayIsImhhbmRsZVJvd0NsaWNrIiwic2Nyb2xsVG9Db2x1bW4iLCJzY3JvbGxUb3AiLCJnZXRTY3JvbGxUb1JvdyIsIm9uUm93RG91YmxlQ2xpY2siLCJvbk1vdXNlRG93biIsIm9uUm93TW91c2VFbnRlciIsIm9uUm93TW91c2VMZWF2ZSIsIm9uU2Nyb2xsU3RhcnQiLCJvblNjcm9sbEVuZCIsImdldFJvd0NsYXNzTmFtZSIsInJvd0hlaWdodEdldHRlciIsImhhbmRsZVJvd0hlaWdodEdldHRlciIsIm9uQ29udGVudEhlaWdodENoYW5nZSIsImhhbmRsZUNvbnRleHRNZW51IiwicmVuZGVyQ29sdW1ucyIsImNvbHVtbnMiLCJjbG9zZUNvbHVtblNldHRpbmdzTW9kYWwiLCJzYXZlQ29sdW1uU2V0dGluZ3MiLCJjaGlsZHJlbiIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyIsImNvbnRleHRNZW51SXRlbXMiLCJzZXRTdGF0ZSIsIm5ld0NvbHVtbldpZHRoIiwiY29sdW1uS2V5IiwicmVzaXplQ29sdW1uIiwib25DZWxsS2V5RG93biIsInJvd0luZGV4IiwiY29sIiwiZSIsImNyZWF0ZSIsImVuYWJsZUFycm93TmF2aWdhdGlvbiIsImFycm93S2V5cyIsIktFWV9DT0RFUyIsIkRPV04iLCJVUCIsIkxFRlQiLCJSSUdIVCIsIm9uTGFzdENlbGxUYWJQcmVzcyIsImdyaWRDb2x1bW5zIiwiZ2V0Q29sdW1uS2V5QnlJbmRleCIsImdldENvbHVtbktleSIsImkiLCJyb3dzU2l6ZSIsImN1cnJlbnRDZWxsIiwicHJveHkiLCJpc0N1cnNvckF0U3RhcnQiLCJ0eXBlIiwic2VsZWN0aW9uU3RhcnQiLCJpc0N1cnNvckF0RW5kIiwic2VsZWN0aW9uRW5kIiwidmFsdWUiLCJsZW5ndGgiLCJzZWxlY3RSZWYiLCJnZXRTZWxlY3RSZWYiLCJpbmNsdWRlcyIsImtleUNvZGUiLCJwcmV2ZW50RGVmYXVsdCIsIkVOVEVSIiwiRVNDIiwiYWRkTmV3SXRlbSIsImdldENvbHVtbkRlZmF1bHRWYWx1ZXMiLCJzZWxlY3QiLCJuZXh0RWxlbWVudCIsIm1lbnVJc09wZW4iLCJtb3ZlQ2VsbEZvY3VzIiwiVEFCIiwiY29sdW1uSW5kIiwiZmluZEluZGV4IiwiYyIsInZhbHVlS2V5UGF0aCIsImpvaW4iLCJkaXNhYmxlZCIsInJvd0luZCIsInNoaWZ0S2V5Iiwib25FZGl0Q2VsbEtleURvd24iLCJvbkNyZWF0ZUNlbGxLZXlEb3duIiwib25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UiLCJ2YWx1ZVBhcnNlciIsImV2ZW50T3JEYXRhIiwicmF3VmFsdWUiLCJ0YXJnZXQiLCJ1bmRlZmluZWQiLCJmaWx0ZXJDZWxsVmFsdWVDaGFuZ2UiLCJvbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSIsImNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSIsIm9uQ3JlYXRlVmFsdWVDaGFuZ2UiLCJvblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZSIsIm1hdGNoVmFsdWUiLCJuZXdWYWx1ZUtleVBhdGgiLCJ2IiwibmV3VmFsdWUiLCJ2YWxpZGF0b3JzIiwiY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUiLCJvbkVkaXRDZWxsVmFsdWVDaGFuZ2UiLCJkYXRhSWQiLCJnZXREYXRhSWRCeVJvd0luZGV4IiwiZWRpdENlbGxWYWx1ZUNoYW5nZSIsIm9uRWRpdFZhbHVlQ2hhbmdlIiwiZWRpdENlbGxWYWx1ZVZhbGlkYXRlIiwib25DcmVhdGVDZWxsQmx1ciIsIm9uQ3JlYXRlQmx1ciIsImdldEVkaXRJdGVtVmFsdWUiLCJvbkVkaXRDZWxsQmx1ciIsIm9uRWRpdEJsdXIiLCJvbkNlbGxGb2N1cyIsImNlbGxUeXBlIiwiaW5wdXRUeXBlIiwiY2VsbFNlbGVjdGlvbkNoYW5nZSIsImNlbGxTZWxlY3QiLCJjb21wb25lbnQiLCJpbnB1dFJlZiIsImlkS2V5UGF0aCIsImdldFNlbGVjdGVkSXRlbUluZGV4IiwiaW5kZXgiLCJvcHRpb25zIiwiZWRpdFZhbHVlIiwib3JpZ2luYWxWYWx1ZSIsImNvbXBvbmVudFR5cGUiLCJzZWxlY3RPcHRpb25zIiwiZmluZCIsIm9iaiIsIlN0cmluZyIsInJlcGxhY2UiLCJnZXRDcmVhdGVJdGVtVmFsdWUiLCJ2YWwiLCJnZXRGaWx0ZXJJdGVtVmFsdWUiLCJnZXRDb21wb25lbnREaXNhYmxlZFN0YXRlIiwibW9kZSIsImNvbXBvbmVudERpc2FibGVkIiwiZGlzYWJsZUVkaXRpbmciLCJkaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaCIsIm1hdGNoVmFsdWVLZXlQYXRoIiwicm93Q2xhc3NOYW1lcyIsImV4dHJhUm93Q291bnQiLCJwdXNoIiwiaW5kZXhPZiIsInJvd0NsYXNzTmFtZUdldHRlciIsImdldENlbGxNZXNzYWdlcyIsInJldHVybkRhdGEiLCJpbmZvTWVzc2FnZSIsImVycm9yTWVzc2FnZSIsIndhcm5pbmdNZXNzYWdlIiwic2Nyb2xsVG9Sb3ciLCJzY3JvbGxOZXdSb3ciLCJmaXJzdCIsImZvY3VzVG8iLCJwcmV2Rm9jdXNUbyIsImZvY3VzVG9MYXN0Um93IiwiaGFuZGxlQ2VsbFNlbGVjdCIsImhhbmRsZUNyZWF0ZUNlbGxSZWYiLCJyZWYiLCJmb2N1cyIsImhhbmRsZUVkaXRDZWxsUmVmIiwic2VsZWN0ZWRSb3dJbmRleCIsImNvbHVtbkluZGV4IiwiZWxlbWVudFR5cGVzIiwic2V0VGltZW91dCIsImhhbmRsZVNlbGVjdEFsbENoZWNrQm94T25DaGFuZ2UiLCJzZWxlY3RBbGxJdGVtc0NoYW5nZSIsImhhbmRsZVNlbGVjdGlvbkNoZWNrQm94T25DaGFuZ2UiLCJpdGVtU2VsZWN0aW9uQ2hhbmdlIiwiZ2VuZXJhdGVDb2x1bW5zIiwiaW50bCIsInNlbGVjdENvbXBvbmVudE9wdGlvbnMiLCJleHRyYUNvbHVtbiIsInJvd1NlbGVjdENoZWNrYm94Q29sdW1uIiwic2hvd1NlbGVjdEFsbENoZWNrYm94IiwidGFiSW5kZXgiLCJ3aWR0aCIsImlzUmVzaXphYmxlIiwiaXNTb3J0YWJsZSIsImNlbGwiLCJ2YWx1ZVJlbmRlciIsImNlbGxFZGl0IiwiY2VsbENyZWF0ZSIsImNlbGxGaWx0ZXIiLCJoZWFkZXIiLCJyb3dJdGVtIiwiaXRlbUlkIiwic2VsZWN0ZWQiLCJmb3JFYWNoIiwidmlzaWJsZUNvbHVtbktleSIsIm9yZ0NvbCIsInZhbHVlRW1wdHlDaGVja2VyIiwiZ2V0VmFsdWVFbXB0eUNoZWNrZXIiLCJmb3JtYXQiLCJpc1JlcXVpcmVkIiwiY29sdW1uIiwiR3JpZENvbHVtblNlcnZpY2UiLCJiYXNlQ29sdW1uIiwiY29sdW1uRnVuY3Rpb25zIiwiZWRpdCIsImdldEl0ZW1WYWx1ZSIsIm9uQ2VsbFZhbHVlQ2hhbmdlIiwib25DZWxsQmx1ciIsImhhbmRsZUNlbGxSZWYiLCJmaWx0ZXIiLCJjZWxsUHJvcHMiLCJjb2x1bW5DZWxsIiwiY29tcG9uZW50VHlwZVByb3BzIiwiY29sdW1uQ29tcG9uZW50VHlwZSIsInBhZGRpbmciLCJyZW1vdmVOZXdJdGVtIiwiaXNDZWxsRWRpdGVkIiwicm93U2VsZWN0IiwiY3RybEtleSIsImdldFNlbGVjdGlvbiIsInJlbW92ZUFsbFJhbmdlcyIsInBhcmVudE5vZGUiLCJwYXJlbnQxY2xhc3MiLCJwYXJlbnQyY2xhc3MiLCJwYXJlbnQzY2xhc3MiLCJwYXJlbnQ0Y2xhc3MiLCJtdWx0aVNlbGVjdCIsIm9uUm93Q2xpY2siLCJzdG9wUHJvcGFnYXRpb24iLCJjbGllbnRYIiwiY2xpZW50WSIsImFkZEV2ZW50TGlzdGVuZXIiLCJoYW5kbGVDb250ZXh0TWVudUl0ZW1DbGljayIsIm9uQ2xpY2siLCJzZWxlY3RlZERhdGEiLCJyZW5kZXJDZWxsIiwiaXNTcGVjaWFsIiwiZ2V0Um93SW5kZXgiLCJtZXNzYWdlRGF0YSIsImlzRWRpdGVkIiwic3R5bGUiLCJ0ZXh0QWxpZ24iLCJsZW5naHQiLCJtYXAiLCJzb3J0Q2hhbmdlIiwibWluV2lkdGgiLCJtYXhXaWR0aCIsImZsZXhHcm93IiwiZml4ZWQiLCJhbGxvd0NlbGxzUmVjeWNsaW5nIiwiZGlzcGxheSIsInpJbmRleCIsInBvc2l0aW9uIiwidG9wIiwibGVmdCIsImQiLCJpdGVtIiwiZGl2aWRlciIsInRpdGxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7b0RBQUE7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBSUE7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0lBQVlBLGU7O0FBQ1o7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1DLGtCQUFrQixTQUFsQkEsZUFBa0IsQ0FBQ0MsS0FBRCxFQUFRQyxRQUFSLEVBQXFCO0FBQzNDLE1BQU1DLE9BQU9ELFNBQVNFLElBQXRCO0FBQ0EsU0FBTztBQUNMQyxZQUFRSixNQUFNSyxRQUFOLENBQWVDLEtBQWYsQ0FBcUIsQ0FBQ0osS0FBS0ssRUFBTixFQUFVLFNBQVYsRUFBcUIs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QVUsVUFIRTtBQUlaQyxXQUFReFIsWUFBUixPQUpZO0FBS1p5UixZQUFTMVIsWUFBVDtBQUxZLEtBQWQ7QUFPQSxRQUFNc1EsZUFBZXJTLEtBQUs0USxNQUFMLENBQVk7QUFBQSxhQUFLN1EsY0FBYytILFFBQWQsQ0FBdUI0TCxFQUFFdFUsS0FBRixDQUFRSCxLQUFLc00sU0FBYixDQUF2QixDQUFMO0FBQUEsS0FBWixDQUFyQjtBQUNBLFdBQ0U7QUFBQTtBQUFBLFFBQUksV0FBVSw2Q0FBZCxFQUE0RCxPQUFPb0gsS0FBbkU7QUFDRy9NLDBCQUFvQkEsaUJBQWlCa04sR0FBckMsSUFBNENsTixpQkFBaUJrTixHQUFqQixDQUFxQixVQUFDYSxJQUFELEVBQU8xTSxDQUFQLEVBQWE7QUFBQSxZQUN2RThCLFFBRHVFLEdBQzFENEssSUFEMEQsQ0FDdkU1SyxRQUR1RTs7QUFFN0UsWUFBSSxPQUFPNEssS0FBSzVLLFFBQVosS0FBeUIsVUFBN0IsRUFBeUM7QUFDdkNBLHFCQUFXNEssS0FBSzVLLFFBQUwsQ0FBY2hKLGFBQWQsRUFBNkJzUyxZQUE3QixDQUFYO0FBQ0Q7QUFDRCxlQUNFO0FBQUMsa0NBQUQ7QUFBQTtBQUNFLGlCQUFLcEwsQ0FEUCxDQUNVO0FBRFYsY0FFRSxRQUFRME0sS0FBS25FLE1BRmY7QUFHRSxxQkFBU21FLEtBQUtDLE9BSGhCO0FBSUUsc0JBQVU3SyxRQUpaO0FBS0UsbUJBQU80SyxLQUFLRSxLQUxkO0FBTUUscUJBQVU5SyxZQUFZLENBQUM0SyxLQUFLdkIsT0FBbkIsR0FBOEIsSUFBOUIsR0FBcUMsT0FBS0QsMEJBQUwsQ0FDNUN3QixLQUFLdkIsT0FEdUMsRUFFNUNyUyxhQUY0QyxFQUc1Q3NTLFlBSDRDO0FBTmhEO0FBWUdzQixlQUFLak07QUFaUixTQURGO0FBZ0JELE9BckI0QztBQUQvQyxLQURGO0FBMEJELEc7O2tCQXdIWWxHLFEiLCJmaWxlIjoiZGF0YWdyaWQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tbG9uZWx5LWlmLCBwcmVmZXItdGVtcGxhdGUsIHJlYWN0L3JlcXVpcmUtZGVmYXVsdC1wcm9wcyAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IE1hcCwgTGlzdCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHtcbiAgaW5qZWN0SW50bCxcbiAgRm9ybWF0dGVkTWVzc2FnZSBhcyBNLFxufSBmcm9tICdyZWFjdC1pbnRsJztcbmltcG9ydCB7IENvbHVtbiwgQ2VsbCB9IGZyb20gJ2ZpeGVkLWRhdGEtdGFibGUtMic7XG5pbXBvcnQgeyBNZW51SXRlbSB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IEljb24gfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1pY29ucyc7XG5pbXBvcnQgU3Bpbm5lciBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1zcGlubmVyJztcbmltcG9ydCBDaGVja2JveCBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1jaGVja2JveCc7XG5pbXBvcnQgJ2ZpeGVkLWRhdGEtdGFibGUtMi9kaXN0L2ZpeGVkLWRhdGEtdGFibGUuY3NzJztcblxuaW1wb3J0IFJlc3BvbnNpdmVGaXhlZERhdGFUYWJsZSBmcm9tICcuL3Jlc3BvbnNpdmUtZml4ZWQtZGF0YS10YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IEhlYWRlckNlbGwgZnJvbSAnLi9oZWFkZXItY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IEFjdGlvbkJhciBmcm9tICcuL2FjdGlvbi1iYXIuY29tcG9uZW50JztcbmltcG9ydCBJbmxpbmVFZGl0Q29udHJvbHMgZnJvbSAnLi9pbmxpbmUtZWRpdC1jb250cm9scy5jb21wb25lbnQnO1xuaW1wb3J0IEZpbHRlcmluZ0NvbnRyb2xzIGZyb20gJy4vZmlsdGVyaW5nLWNvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgRHJvcGRvd25Db250cm9scyBmcm9tICcuL2Ryb3Bkb3duLWNvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgKiBhcyBkYXRhZ3JpZEFjdGlvbnMgZnJvbSAnLi9kYXRhZ3JpZC5hY3Rpb25zJztcbmltcG9ydCBDZWxsVG9vbHRpcCBmcm9tICcuL2NlbGwtdG9vbHRpcC5jb21wb25lbnQnO1xuaW1wb3J0IENvbHVtblNldHRpbmdzTW9kYWwgZnJvbSAnLi9jb2x1bW4tc2V0dGluZ3MvY29sdW1uLXNldHRpbmdzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBwcm9wVHlwZXMsIGRlZmF1bHRQcm9wcyB9IGZyb20gJy4vZGF0YWdyaWQucHJvcHMnO1xuaW1wb3J0IHsgS0VZX0NPREVTIH0gZnJvbSAnLi9kYXRhZ3JpZC5jb25zdGFudHMnO1xuaW1wb3J0IHBhZ2luYXRpb24gZnJvbSAnLi9wYWdpbmF0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9kYXRhZ3JpZC51dGlscyc7XG5pbXBvcnQgR3JpZENvbHVtblNlcnZpY2UgZnJvbSAnLi9jb2x1bW4tc2VydmljZS9jb2x1bW4tc2VydmljZSc7XG5pbXBvcnQgJy4vZGF0YWdyaWQuY29tcG9uZW50LnNjc3MnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUsIG93blByb3BzKSA9PiB7XG4gIGNvbnN0IEdSSUQgPSBvd25Qcm9wcy5ncmlkO1xuICByZXR1cm4ge1xuICAgIGlzQnVzeTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2lzQnVzeSddLCB0cnVlKSxcbiAgICBpc0VkaXRpbmc6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdpc0VkaXRpbmcnXSwgZmFsc2UpLFxuICAgIGlzQ3JlYXRpbmc6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdpc0NyZWF0aW5nJ10sIGZhbHNlKSxcbiAgICBpc0ZpbHRlcmluZzpcbiAgICAgIHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnaXNGaWx0ZXJpbmcnXSwgZmFsc2UpLFxuICAgIGlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW46XG4gICAgICBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnY29sdW1uU2V0dGluZ3NNb2RhbCcsICdvcGVuJ10sIGZhbHNlKSxcbiAgICBzb3J0Q29sdW1uOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdzb3J0aW5nRGF0YScsICdzb3J0Q29sdW1uJ10sIG51bGwpLFxuICAgIHNvcnRPcmRlcjogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnc29ydGluZ0RhdGEnLCAnc29ydE9yZGVyJ10sIG51bGwpLFxuICAgIHZpc2libGVDb2x1bW5zOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICd2aXNpYmxlQ29sdW1ucyddLCBMaXN0KCkpLFxuICAgIGNvbHVtbldpZHRoczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnY29sdW1uV2lkdGhzJ10sIE1hcCgpKSxcbiAgICBzZWxlY3RlZENlbGw6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2VsZWN0ZWRDZWxsJ10sIE1hcCgpKSxcbiAgICBzZWxlY3RlZEl0ZW1zOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3NlbGVjdGVkSXRlbXMnXSwgTGlzdCgpKSxcbiAgICBkYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2RhdGEnXSwgTGlzdCgpKSxcbiAgICBlZGl0RGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdlZGl0RGF0YSddLCBNYXAoKSksXG4gICAgY3JlYXRlRGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjcmVhdGVEYXRhJ10sIExpc3QoKSksXG4gICAgZmlsdGVyRGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdmaWx0ZXJEYXRhJ10sIE1hcCgpKSxcbiAgICBjZWxsTWVzc2FnZXM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY2VsbE1lc3NhZ2VzJ10sIE1hcCgpKSxcbiAgICBjcmVhdGVDZWxsTWVzc2FnZXM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY3JlYXRlQ2VsbE1lc3NhZ2VzJ10sIE1hcCgpKSxcbiAgICBhbGxEYXRhU2l6ZTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdhbGxEYXRhJ10sIExpc3QoKSkuc2l6ZSxcbiAgICBsYW5ndWFnZTogVXRpbHMuZ2V0TGFuZ3VhZ2UoR1JJRCwgc3RhdGUudXNlciksXG4gICAgcmVnaW9uOiBVdGlscy5nZXRSZWdpb24oR1JJRCwgc3RhdGUudXNlciksXG4gICAgZGF0ZUZvcm1hdDogVXRpbHMuZ2V0RGF0ZUZvcm1hdChHUklELCBzdGF0ZS51c2VyKSxcbiAgICB0aG91c2FuZFNlcGFyYXRvcjogVXRpbHMuZ2V0VGhvdXNhbmRTZXBhcmF0b3IoR1JJRCwgc3RhdGUudXNlciksXG4gICAgZGVjaW1hbFNlcGFyYXRvcjogVXRpbHMuZ2V0RGVjaW1hbFNlcGFyYXRvcihHUklELCBzdGF0ZS51c2VyKSxcbiAgICBmb3JjZVJlZnJlc2hUaW1lc3RhbXA6IHN0YXRlLmRhdGFncmlkLmdldCgnZm9yY2VSZWZyZXNoJywgMCksIC8vIGZvcmNlIHJlLXJlbmRlciB3aGVuIGNoYW5nZWRcbiAgICBmb2N1c1R5cGU6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdmb2N1c1R5cGUnXSwgTWFwKCkpLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGF0YWdyaWRBY3Rpb25zO1xuXG5AcGFnaW5hdGlvblxuQGluamVjdEludGxcbkBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKVxuY2xhc3MgRGF0YUdyaWQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHByb3BUeXBlcztcbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY3VycmVudFJvdzogMCxcbiAgICAgIGN1cnJlbnRDb2x1bW46IDAsXG4gICAgICBjb250ZXh0TWVudU9wZW46IGZhbHNlLFxuICAgICAgY29udGV4dE1lbnVYOiBudWxsLFxuICAgICAgY29udGV4dE1lbnVZOiBudWxsLFxuICAgIH07XG4gICAgdGhpcy5jZWxsUmVmcyA9IHt9O1xuICAgIHRoaXMuY3JlYXRlQ2VsbFJlZnMgPSB7fTtcbiAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsID0gZmFsc2U7XG4gICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTsgLy8gVE9ETzogSGFuZGxlIGZvY3VzaW5nIHdoZW4gdHJ1ZVxuICAgIHRoaXMuZm9jdXNUb0Vycm9yQ2VsbCA9IGZhbHNlOyAvLyBUT0RPOiBIYW5kbGUgZm9jdXNpbmcgd2hlbiB0cnVlXG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25Eb2N1bWVudENsaWNrKTtcbiAgICB0aGlzLnByb3BzLmludmFsaWRhdGUodGhpcy5wcm9wcy5ncmlkKTtcbiAgfVxuXG4gIG9uRG9jdW1lbnRDbGljayA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5jb250ZXh0TWVudUl0ZW1zKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY29udGV4dE1lbnVPcGVuOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25Eb2N1bWVudENsaWNrKTtcbiAgfTtcblxuICBvbkNvbHVtblJlc2l6ZUVuZENhbGxiYWNrID0gKG5ld0NvbHVtbldpZHRoLCBjb2x1bW5LZXkpID0+IHtcbiAgICB0aGlzLnByb3BzLnJlc2l6ZUNvbHVtbih0aGlzLnByb3BzLmdyaWQsIGNvbHVtbktleSwgbmV3Q29sdW1uV2lkdGgpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gcm93SW5kZXggKGludClcbiAgICogQHBhcmFtIGNvbCAob2JqKS4gQ29sdW1uIG9iamVjdC5cbiAgICogQHBhcmFtIGUuIE9yaWdpbmFsIEtleURvd24gZXZlbnRcbiAgICogQHBhcmFtIGNyZWF0ZSAoYm9vbCkuIElzIHRoZSBjZWxsIGNyZWF0ZSBjZWxsIG9yIGVkaXQgY2VsbD9cbiAgICovXG4gIG9uQ2VsbEtleURvd24gPSAocm93SW5kZXgsIGNvbCwgZSwgY3JlYXRlID0gZmFsc2UpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5lbmFibGVBcnJvd05hdmlnYXRpb24pIHtcbiAgICAgIGNvbnN0IGNlbGxSZWZzID0gY3JlYXRlID8gdGhpcy5jcmVhdGVDZWxsUmVmcyA6IHRoaXMuY2VsbFJlZnM7XG4gICAgICBjb25zdCBhcnJvd0tleXMgPSBbS0VZX0NPREVTLkRPV04sIEtFWV9DT0RFUy5VUCwgS0VZX0NPREVTLkxFRlQsIEtFWV9DT0RFUy5SSUdIVF07XG4gICAgICBjb25zdCB7XG4gICAgICAgIGNvbHVtbnMsIHZpc2libGVDb2x1bW5zLCBncmlkLCBkYXRhLCBvbkxhc3RDZWxsVGFiUHJlc3MsXG4gICAgICB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IGdyaWRDb2x1bW5zID0gVXRpbHMudmlzaWJsZUNvbHVtbnMoY29sdW1ucywgdmlzaWJsZUNvbHVtbnMpO1xuICAgICAgY29uc3QgZ2V0Q29sdW1uS2V5QnlJbmRleCA9IGkgPT4gVXRpbHMuZ2V0Q29sdW1uS2V5KGdyaWRDb2x1bW5zW2ldKTtcbiAgICAgIGNvbnN0IHJvd3NTaXplID0gZGF0YS5zaXplO1xuICAgICAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCk7XG4gICAgICBsZXQgY3VycmVudENlbGwgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2NvbHVtbktleX1fJHtyb3dJbmRleH1gXTtcbiAgICAgIGxldCBwcm94eSA9IG51bGw7XG5cbiAgICAgIGNvbnN0IGlzQ3Vyc29yQXRTdGFydCA9ICgpID0+IHtcbiAgICAgICAgaWYgKGN1cnJlbnRDZWxsLnR5cGUgIT09ICd0ZXh0JykgcmV0dXJuIHRydWU7XG4gICAgICAgIHJldHVybiBjdXJyZW50Q2VsbC5zZWxlY3Rpb25TdGFydCA9PT0gMDtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGlzQ3Vyc29yQXRFbmQgPSAoKSA9PiB7XG4gICAgICAgIGlmIChjdXJyZW50Q2VsbC50eXBlICE9PSAndGV4dCcpIHJldHVybiB0cnVlO1xuICAgICAgICByZXR1cm4gY3VycmVudENlbGwuc2VsZWN0aW9uRW5kID09PSBjdXJyZW50Q2VsbC52YWx1ZS5sZW5ndGg7XG4gICAgICB9O1xuXG4gICAgICAvLyBJZiBjdXJyZW50IGNlbGwgaG9sZHMgYSByZWFjdC1mbG9hdGluZy1zZWxlY3QgY29tcG9uZW50XG4gICAgICBpZiAoY3VycmVudENlbGwgJiYgY3VycmVudENlbGwuc2VsZWN0UmVmKSB7XG4gICAgICAgIHByb3h5ID0gY3VycmVudENlbGw7XG4gICAgICAgIGN1cnJlbnRDZWxsID0gdGhpcy5nZXRTZWxlY3RSZWYocHJveHkpO1xuICAgICAgfVxuXG4gICAgICAvLyBQcmV2ZW50cyB1cC9kb3duIGFycm93IGZyb20gY2hhbmdpbmcgbnVtYmVyIGZpZWxkIHZhbHVlXG4gICAgICBpZiAoYXJyb3dLZXlzLmluY2x1ZGVzKGUua2V5Q29kZSkgJiYgY3VycmVudENlbGwudHlwZSA9PT0gJ251bWJlcicpIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuRU5URVI6XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLkVTQzoge1xuICAgICAgICAgIGlmIChjcmVhdGUgJiYgZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuRU5URVIpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuYWRkTmV3SXRlbShncmlkLCBVdGlscy5nZXRDb2x1bW5EZWZhdWx0VmFsdWVzKGNvbHVtbnMpKTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGN1cnJlbnRDZWxsLnNlbGVjdCgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLkRPV046IHtcbiAgICAgICAgICBsZXQgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2NvbHVtbktleX1fJHtyb3dJbmRleCArIDF9YF07XG5cbiAgICAgICAgICAvLyBQcmV2ZW50cyBtZW51IGZyb20gb3BlbmluZ1xuICAgICAgICAgIGlmIChwcm94eSAmJiBwcm94eS5zZWxlY3RSZWYgJiYgIXByb3h5LnNlbGVjdFJlZi5zdGF0ZS5tZW51SXNPcGVuKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAoIW5leHRFbGVtZW50KSBicmVhaztcbiAgICAgICAgICAgIG5leHRFbGVtZW50ID0gdGhpcy5nZXRTZWxlY3RSZWYobmV4dEVsZW1lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm1vdmVDZWxsRm9jdXMobmV4dEVsZW1lbnQsIHJvd0luZGV4ICsgMSwgLTEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLlVQOiB7XG4gICAgICAgICAgbGV0IG5leHRFbGVtZW50ID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtjb2x1bW5LZXl9XyR7cm93SW5kZXggLSAxfWBdO1xuXG4gICAgICAgICAgLy8gUHJldmVudHMgbWVudSBmcm9tIG9wZW5pbmdcbiAgICAgICAgICBpZiAocHJveHkgJiYgcHJveHkuc2VsZWN0UmVmICYmICFwcm94eS5zZWxlY3RSZWYuc3RhdGUubWVudUlzT3Blbikge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKCFuZXh0RWxlbWVudCkgYnJlYWs7XG4gICAgICAgICAgICBuZXh0RWxlbWVudCA9IHRoaXMuZ2V0U2VsZWN0UmVmKG5leHRFbGVtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5tb3ZlQ2VsbEZvY3VzKG5leHRFbGVtZW50LCByb3dJbmRleCAtIDEsIC0xKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5UQUI6XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLlJJR0hUOlxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5MRUZUOiB7XG4gICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLlJJR0hUICYmICFpc0N1cnNvckF0RW5kKCkpIGJyZWFrO1xuICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5MRUZUICYmICFpc0N1cnNvckF0U3RhcnQoKSkgYnJlYWs7XG5cbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICBsZXQgY29sdW1uSW5kID0gZ3JpZENvbHVtbnMuZmluZEluZGV4KGMgPT4gYy52YWx1ZUtleVBhdGguam9pbignLycpID09PSBjb2x1bW5LZXkpO1xuICAgICAgICAgIGlmIChjb2x1bW5JbmQgIT09IC0xKSB7XG4gICAgICAgICAgICBsZXQgZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgbGV0IG5leHRFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIGxldCByb3dJbmQgPSByb3dJbmRleDtcbiAgICAgICAgICAgIHdoaWxlIChkaXNhYmxlZCkge1xuICAgICAgICAgICAgICAvLyBNb3ZpbmcgdG8gdGhlIGxlZnRcbiAgICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLkxFRlQgfHwgKGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLlRBQiAmJiBlLnNoaWZ0S2V5KSkge1xuICAgICAgICAgICAgICAgIGlmIChjb2x1bW5JbmQgLSAxID49IDApIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCAtPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm93SW5kIC0gMSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgPSBncmlkQ29sdW1ucy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgICAgcm93SW5kIC09IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBNb3ZpbmcgdG8gdGhlIHJpZ2h0XG4gICAgICAgICAgICAgICAgaWYgKGNvbHVtbkluZCArIDEgPCBncmlkQ29sdW1ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCArPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm93SW5kICsgMSA8IHJvd3NTaXplKSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgPSAwO1xuICAgICAgICAgICAgICAgICAgcm93SW5kICs9IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyb3dJbmQgKyAxID09PSByb3dzU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgLy8gSWYgdHJ5aW5nIHRvIHNlbGVjdCBhIHJvdywgd2hlbiB0aGVyZSBpcyBub25lOlxuICAgICAgICAgICAgICAgICAgaWYgKG9uTGFzdENlbGxUYWJQcmVzcyAmJiBlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5UQUIpIG9uTGFzdENlbGxUYWJQcmVzcyhlKTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIG5leHRFbGVtZW50ID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtnZXRDb2x1bW5LZXlCeUluZGV4KGNvbHVtbkluZCl9XyR7cm93SW5kfWBdO1xuXG4gICAgICAgICAgICAgIC8vIElmIHdlIGNhbm5vdCBmb2N1cyBvbiB0aGUgbmV4dCBlbGVtZW50IHdoaWxlIG1vdmluZyB0byB0aGUgcmlnaHRcbiAgICAgICAgICAgICAgaWYgKCFuZXh0RWxlbWVudCAmJiBlLmtleUNvZGUgIT09IEtFWV9DT0RFUy5MRUZUKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgd2UncmUgbm90IHlldCBpbiB0aGUgbGFzdCBmb2N1c2FibGUgY29sdW1uXG4gICAgICAgICAgICAgICAgaWYgKGNvbHVtbkluZCA8PSBncmlkQ29sdW1ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgIHdoaWxlIChjb2x1bW5JbmQgPD0gZ3JpZENvbHVtbnMubGVuZ3RoICYmICFuZXh0RWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Z2V0Q29sdW1uS2V5QnlJbmRleChjb2x1bW5JbmQpfV8ke3Jvd0luZH1gXTtcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uSW5kICs9IDE7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UgYXJlIGluIHRoZSBsYXN0IGNvbHVtbiBhbmQgd2UgZG9uJ3QgaGF2ZSBhbiBlbGVtZW50IHRvIGZvY3VzIG9uLFxuICAgICAgICAgICAgICAgICAgICAvLyB3ZSBtdXN0IG1vdmUgdG8gdGhlIG5leHQgcm93IChpZiBwb3NzaWJsZSlcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFuZXh0RWxlbWVudCAmJiBjb2x1bW5JbmQgPT09IGdyaWRDb2x1bW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHRyeWluZyB0byBzZWxlY3QgYSByb3csIHdoZW4gdGhlcmUgaXMgbm9uZTpcbiAgICAgICAgICAgICAgICAgICAgICBpZiAocm93SW5kICsgMSA9PT0gcm93c1NpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbkxhc3RDZWxsVGFiUHJlc3MgJiYgZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuVEFCKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uTGFzdENlbGxUYWJQcmVzcyhlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgcm93SW5kICs9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2dldENvbHVtbktleUJ5SW5kZXgoY29sdW1uSW5kKX1fJHtyb3dJbmR9YF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgY2Fubm90IGZvY3VzIG9uIHRoZSBuZXh0IGVsZW1lbnQgd2hpbGUgbW92aW5nIHRvIHRoZSBsZWZ0XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoIW5leHRFbGVtZW50ICYmIGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLkxFRlQpIHtcbiAgICAgICAgICAgICAgICB3aGlsZSAoY29sdW1uSW5kID4gMCAmJiAhbmV4dEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCAtPSAxO1xuICAgICAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2dldENvbHVtbktleUJ5SW5kZXgoY29sdW1uSW5kKX1fJHtyb3dJbmR9YF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGRpc2FibGVkID0gbmV4dEVsZW1lbnQgPyBuZXh0RWxlbWVudC5kaXNhYmxlZCA6IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFkaXNhYmxlZCAmJiBuZXh0RWxlbWVudCkge1xuICAgICAgICAgICAgICBpZiAobmV4dEVsZW1lbnQuc2VsZWN0UmVmKSBuZXh0RWxlbWVudCA9IHRoaXMuZ2V0U2VsZWN0UmVmKG5leHRFbGVtZW50KTtcbiAgICAgICAgICAgICAgdGhpcy5tb3ZlQ2VsbEZvY3VzKG5leHRFbGVtZW50LCByb3dJbmQsIGNvbHVtbkluZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIG9uRWRpdENlbGxLZXlEb3duID0gKHJvd0luZGV4LCBjb2wpID0+IChlKSA9PiB7XG4gICAgdGhpcy5vbkNlbGxLZXlEb3duKHJvd0luZGV4LCBjb2wsIGUpO1xuICB9O1xuXG4gIG9uQ3JlYXRlQ2VsbEtleURvd24gPSAocm93SW5kZXgsIGNvbCkgPT4gKGUpID0+IHtcbiAgICB0aGlzLm9uQ2VsbEtleURvd24ocm93SW5kZXgsIGNvbCwgZSwgdHJ1ZSk7XG4gIH07XG5cbiAgb25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UgPSAoY29sLCB2YWx1ZVBhcnNlcikgPT4gKGV2ZW50T3JEYXRhKSA9PiB7XG4gICAgbGV0IHJhd1ZhbHVlO1xuICAgIC8vIGV2ZW50T3JEYXRhIGNhbiBiZSBpbnB1dCBvbkNoYW5nZSBldmVudCwgcmVhY3Qtc2VsZWN0IG9uQ2hhbmdlIG9yIHJlYWN0LWRheS1waWNrZXIgb25DaGFuZ2VcbiAgICBpZiAoZXZlbnRPckRhdGEpIHtcbiAgICAgIGlmIChldmVudE9yRGF0YS50YXJnZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnRPckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSB2YWx1ZVBhcnNlcihyYXdWYWx1ZSk7XG4gICAgdGhpcy5wcm9wcy5maWx0ZXJDZWxsVmFsdWVDaGFuZ2UoXG4gICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICB0aGlzLnByb3BzLmNvbHVtbnMsXG4gICAgICBjb2wsXG4gICAgICB2YWx1ZSxcbiAgICApO1xuICB9O1xuXG4gIG9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlID0gKHJvd0luZGV4LCBjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZXZlbnRPckRhdGEpID0+IHtcbiAgICBsZXQgcmF3VmFsdWU7XG4gICAgLy8gZXZlbnRPckRhdGEgY2FuIGJlIGlucHV0IG9uQ2hhbmdlIGV2ZW50LCByZWFjdC1zZWxlY3Qgb25DaGFuZ2Ugb3IgcmVhY3QtZGF5LXBpY2tlciBvbkNoYW5nZVxuICAgIGlmIChldmVudE9yRGF0YSkge1xuICAgICAgaWYgKGV2ZW50T3JEYXRhLnRhcmdldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChldmVudE9yRGF0YS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCB2YWx1ZSA9IHZhbHVlUGFyc2VyKHJhd1ZhbHVlKTtcbiAgICB0aGlzLnByb3BzLmNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIHJvd0luZGV4LCBjb2wudmFsdWVLZXlQYXRoLCB2YWx1ZSk7XG4gICAgaWYgKGNvbC5vbkNyZWF0ZVZhbHVlQ2hhbmdlKSB7XG4gICAgICBjb2wub25DcmVhdGVWYWx1ZUNoYW5nZSh2YWx1ZSwgY29sLnZhbHVlS2V5UGF0aCwgcm93SW5kZXgpO1xuICAgIH1cbiAgICBpZiAoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlICYmIHZhbHVlID09PSBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubWF0Y2hWYWx1ZSkge1xuICAgICAgLy8gQ2FsbCBzcGVjaWFsIHBhaXJlZCB2YWx1ZSBjaGFuZ2Ugb24gb3RoZXIgY2VsbCBpZiB2YWx1ZSBtYXRjaGVzXG4gICAgICB0aGlzLm9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlKFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgeyB2YWx1ZUtleVBhdGg6IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5uZXdWYWx1ZUtleVBhdGggfSxcbiAgICAgICAgdiA9PiB2LFxuICAgICAgKShjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY29sLnZhbGlkYXRvcnMpIHtcbiAgICAgIHRoaXMucHJvcHMuY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUoXG4gICAgICAgIHRoaXMucHJvcHMuZ3JpZCxcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIGNvbC52YWx1ZUtleVBhdGgsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBjb2wudmFsaWRhdG9ycyxcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIG9uRWRpdENlbGxWYWx1ZUNoYW5nZSA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGV2ZW50T3JEYXRhKSA9PiB7XG4gICAgY29uc3QgZGF0YUlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICBsZXQgcmF3VmFsdWU7XG4gICAgLy8gZXZlbnRPckRhdGEgY2FuIGJlIGlucHV0IG9uQ2hhbmdlIGV2ZW50LCByZWFjdC1zZWxlY3Qgb25DaGFuZ2Ugb3IgcmVhY3QtZGF5LXBpY2tlciBvbkNoYW5nZVxuICAgIGlmIChldmVudE9yRGF0YSkge1xuICAgICAgaWYgKGV2ZW50T3JEYXRhLnRhcmdldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChldmVudE9yRGF0YS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCB2YWx1ZSA9IHZhbHVlUGFyc2VyKHJhd1ZhbHVlKTtcbiAgICB0aGlzLnByb3BzLmVkaXRDZWxsVmFsdWVDaGFuZ2UodGhpcy5wcm9wcy5ncmlkLCBkYXRhSWQsIGNvbC52YWx1ZUtleVBhdGgsIHZhbHVlKTtcbiAgICBpZiAoY29sLm9uRWRpdFZhbHVlQ2hhbmdlKSB7XG4gICAgICBjb2wub25FZGl0VmFsdWVDaGFuZ2UodmFsdWUsIGNvbC52YWx1ZUtleVBhdGgsIHJvd0luZGV4LCBkYXRhSWQpO1xuICAgIH1cbiAgICBpZiAoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlICYmIHZhbHVlID09PSBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubWF0Y2hWYWx1ZSkge1xuICAgICAgLy8gQ2FsbCBzcGVjaWFsIHBhaXJlZCB2YWx1ZSBjaGFuZ2Ugb24gb3RoZXIgY2VsbCBpZiB2YWx1ZSBtYXRjaGVzXG4gICAgICB0aGlzLm9uRWRpdENlbGxWYWx1ZUNoYW5nZShcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIHsgdmFsdWVLZXlQYXRoOiBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWVLZXlQYXRoIH0sXG4gICAgICAgIHYgPT4gdixcbiAgICAgICkoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm5ld1ZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNvbC52YWxpZGF0b3JzKSB7XG4gICAgICB0aGlzLnByb3BzLmVkaXRDZWxsVmFsdWVWYWxpZGF0ZShcbiAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICBkYXRhSWQsXG4gICAgICAgIGNvbC52YWx1ZUtleVBhdGgsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBjb2wudmFsaWRhdG9ycyxcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIG9uQ3JlYXRlQ2VsbEJsdXIgPSAocm93SW5kZXgsIGNvbCwgdmFsdWVQYXJzZXIpID0+IChlKSA9PiB7XG4gICAgaWYgKGNvbC5vbkNyZWF0ZUJsdXIpIHtcbiAgICAgIGxldCB2YWx1ZSA9IChlICYmIGUudGFyZ2V0ICYmIGUudGFyZ2V0LnZhbHVlICE9PSB1bmRlZmluZWQpID9cbiAgICAgICAgZS50YXJnZXQudmFsdWUgOlxuICAgICAgICB0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCk7XG4gICAgICBpZiAodmFsdWVQYXJzZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlUGFyc2VyKHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGNvbC5vbkNyZWF0ZUJsdXIodmFsdWUsIHJvd0luZGV4KTtcbiAgICB9XG4gIH07XG5cbiAgb25FZGl0Q2VsbEJsdXIgPSAocm93SW5kZXgsIGNvbCwgdmFsdWVQYXJzZXIpID0+IChlKSA9PiB7XG4gICAgaWYgKGNvbC5vbkVkaXRCbHVyKSB7XG4gICAgICBsZXQgdmFsdWUgPSAoZSAmJiBlLnRhcmdldCAmJiBlLnRhcmdldC52YWx1ZSAhPT0gdW5kZWZpbmVkKSA/XG4gICAgICAgIGUudGFyZ2V0LnZhbHVlIDpcbiAgICAgICAgdGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpO1xuICAgICAgaWYgKHZhbHVlUGFyc2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZVBhcnNlcih2YWx1ZSk7XG4gICAgICB9XG4gICAgICBjb25zdCBkYXRhSWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgICAgY29sLm9uRWRpdEJsdXIodmFsdWUsIHJvd0luZGV4LCBkYXRhSWQpO1xuICAgIH1cbiAgfTtcblxuICBvbkNlbGxGb2N1cyA9IChjZWxsVHlwZSwgaW5wdXRUeXBlLCByb3dJbmRleCwgY29sdW1uS2V5KSA9PiAoZSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGNlbGxTZWxlY3Rpb25DaGFuZ2UsIGNlbGxTZWxlY3QsIGdyaWQsIGlzRWRpdGluZyxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoaXNFZGl0aW5nKSByZXR1cm47XG5cbiAgICBpZiAoaW5wdXRUeXBlID09PSAnbnVtYmVyJykge1xuICAgICAgZS50YXJnZXQuc2VsZWN0KCk7XG4gICAgfVxuICAgIGlmIChjZWxsVHlwZSA9PT0gJ2VkaXQnICYmIGNlbGxTZWxlY3QpIHtcbiAgICAgIGNlbGxTZWxlY3Rpb25DaGFuZ2UoZ3JpZCwgTWFwKHtcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIGNvbHVtbktleSxcbiAgICAgIH0pKTtcbiAgICB9XG4gIH07XG5cbiAgZ2V0U2VsZWN0UmVmID0gKGNvbXBvbmVudCkgPT4ge1xuICAgIGlmICghY29tcG9uZW50KSByZXR1cm4gbnVsbDtcbiAgICBpZiAoY29tcG9uZW50LnNlbGVjdFJlZi5zZWxlY3Quc2VsZWN0KSByZXR1cm4gY29tcG9uZW50LnNlbGVjdFJlZi5zZWxlY3Quc2VsZWN0LmlucHV0UmVmO1xuICAgIHJldHVybiBjb21wb25lbnQuc2VsZWN0UmVmLnNlbGVjdC5pbnB1dFJlZjtcbiAgfTtcblxuICBnZXREYXRhSWRCeVJvd0luZGV4ID0gcm93SW5kZXggPT5cbiAgICB0aGlzLnByb3BzLmRhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi50aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoXSk7XG5cbiAgZ2V0U2VsZWN0ZWRJdGVtSW5kZXggPSAoaWQpID0+IHtcbiAgICBpZiAoIWlkKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5wcm9wcy5kYXRhLmZpbmRJbmRleCh2ID0+IHYuZ2V0SW4odGhpcy5wcm9wcy5ncmlkLmlkS2V5UGF0aCkgPT09IGlkKTtcbiAgICByZXR1cm4gaW5kZXggPT09IC0xID8gdW5kZWZpbmVkIDogaW5kZXg7XG4gIH07XG5cbiAgZ2V0RWRpdEl0ZW1WYWx1ZSA9IChyb3dJbmRleCwgY29sLCBvcHRpb25zID0gW10pID0+IHtcbiAgICAvLyBHZXQgdGhlIHZhbHVlIHRvIGRpc3BsYXkgaW4gZWRpdCBjZWxsXG4gICAgY29uc3QgaWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgIGNvbnN0IGVkaXRWYWx1ZSA9IHRoaXMucHJvcHMuZWRpdERhdGEuZ2V0SW4oW2lkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSwgdW5kZWZpbmVkKTtcbiAgICBsZXQgb3JpZ2luYWxWYWx1ZTtcbiAgICBpZiAoZWRpdFZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG9yaWdpbmFsVmFsdWUgPSB0aGlzLnByb3BzLmRhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSwgJycpO1xuICAgIH0gZWxzZSBpZiAoZWRpdFZhbHVlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFZhbHVlIGlzIGZvdW5kIGZyb20gZWRpdERhdGFcbiAgICAgIC8vIEZvcm1hdCBieSBjb21wb25lbnQgdHlwZVxuICAgICAgc3dpdGNoIChjb2wuY29tcG9uZW50VHlwZSkge1xuICAgICAgICBjYXNlICdzZWxlY3QnOlxuICAgICAgICAgIHJldHVybiBvcHRpb25zLnNlbGVjdE9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSBlZGl0VmFsdWUpO1xuICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgICByZXR1cm4gb3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IGVkaXRWYWx1ZSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuIGVkaXRWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG9yaWdpbmFsVmFsdWUgPT09IG51bGwgfHwgb3JpZ2luYWxWYWx1ZSA9PT0gdW5kZWZpbmVkIHx8IG9yaWdpbmFsVmFsdWUgPT09ICcnKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIC8vIFJldHVybiB2YWx1ZSBmcm9tIG9yaWdpbmFsIGRhdGEsIGJlY2F1c2UgZWRpdERhdGEgaXMgbm90IGF2YWlsYWJsZVxuICAgIC8vIEZvcm1hdCBieSBjb21wb25lbnQgdHlwZVxuICAgIHN3aXRjaCAoY29sLmNvbXBvbmVudFR5cGUpIHtcbiAgICAgIGNhc2UgJ2Zsb2F0Jzoge1xuICAgICAgICBpZiAoU3RyaW5nKG9yaWdpbmFsVmFsdWUpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZXR1cm4gU3RyaW5nKG9yaWdpbmFsVmFsdWUpXG4gICAgICAgICAgICAucmVwbGFjZSgnLicsIHRoaXMucHJvcHMuZGVjaW1hbFNlcGFyYXRvcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9yaWdpbmFsVmFsdWU7XG4gICAgICB9XG4gICAgICBjYXNlICdzZWxlY3QnOlxuICAgICAgICByZXR1cm4gb3B0aW9ucy5zZWxlY3RPcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gb3JpZ2luYWxWYWx1ZSk7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSBvcmlnaW5hbFZhbHVlKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBvcmlnaW5hbFZhbHVlO1xuICAgIH1cbiAgfTtcblxuICBnZXRDcmVhdGVJdGVtVmFsdWUgPSAocm93SW5kZXgsIGNvbCwgb3B0aW9ucyA9IFtdKSA9PiB7XG4gICAgY29uc3QgdmFsID0gdGhpcy5wcm9wcy5jcmVhdGVEYXRhLmdldEluKFtyb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0sICcnKTtcbiAgICBpZiAodmFsID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSBlbHNlIGlmIChjb2wuY29tcG9uZW50VHlwZSA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLnNlbGVjdE9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSB2YWwpO1xuICAgIH0gZWxzZSBpZiAoWydib29sZWFuJ10uaW5jbHVkZXMoY29sLmNvbXBvbmVudFR5cGUpKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IHZhbCk7XG4gICAgfVxuICAgIHJldHVybiB2YWw7XG4gIH07XG5cbiAgZ2V0RmlsdGVySXRlbVZhbHVlID0gKGNvbCwgb3B0aW9ucyA9IFtdKSA9PiB7XG4gICAgY29uc3QgdmFsID0gdGhpcy5wcm9wcy5maWx0ZXJEYXRhLmdldChVdGlscy5nZXRDb2x1bW5LZXkoY29sKSwgJycpO1xuICAgIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9IGVsc2UgaWYgKGNvbC5jb21wb25lbnRUeXBlID09PSAnc2VsZWN0Jykge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuc2VsZWN0T3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IHZhbCk7XG4gICAgfSBlbHNlIGlmIChbJ2NoZWNrYm94JywgJ2Jvb2xlYW4nXS5pbmNsdWRlcyhjb2wuY29tcG9uZW50VHlwZSkpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gdmFsKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbDtcbiAgfTtcblxuICBnZXRDb21wb25lbnREaXNhYmxlZFN0YXRlID0gKHJvd0luZGV4LCBjb2wsIG1vZGUpID0+IHtcbiAgICBsZXQgY29tcG9uZW50RGlzYWJsZWQgPSAhIWNvbC5kaXNhYmxlRWRpdGluZztcbiAgICAvLyBjaGVjayBpZiBjb21wb25lbnQgaXMgZGlzYWJsZWQgYnkgb3RoZXIgY29sdW1uIGRhdGFcbiAgICBpZiAoIWNvbXBvbmVudERpc2FibGVkICYmIGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaCkge1xuICAgICAgaWYgKG1vZGUgPT09ICdjcmVhdGUnKSB7XG4gICAgICAgIGNvbXBvbmVudERpc2FibGVkID0gdGhpcy5nZXRDcmVhdGVJdGVtVmFsdWUoXG4gICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgeyB2YWx1ZUtleVBhdGg6IGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaC5tYXRjaFZhbHVlS2V5UGF0aCB9LFxuICAgICAgICApID09PSBjb2wuZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2gubWF0Y2hWYWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbXBvbmVudERpc2FibGVkID0gdGhpcy5nZXRFZGl0SXRlbVZhbHVlKFxuICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgIHsgdmFsdWVLZXlQYXRoOiBjb2wuZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2gubWF0Y2hWYWx1ZUtleVBhdGggfSxcbiAgICAgICAgKSA9PT0gY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb21wb25lbnREaXNhYmxlZDtcbiAgfTtcblxuICBnZXRSb3dDbGFzc05hbWUgPSAocm93SW5kZXgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBncmlkLFxuICAgICAgaXNDcmVhdGluZyxcbiAgICAgIGlzRWRpdGluZyxcbiAgICAgIGNyZWF0ZURhdGEsXG4gICAgICBzZWxlY3RlZEl0ZW1zLFxuICAgICAgZGF0YSxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCByb3dDbGFzc05hbWVzID0gWydvYy1kYXRhZ3JpZC1yb3cnXTtcbiAgICBsZXQgZXh0cmFSb3dDb3VudCA9IDA7IC8vIGhvdyBtYW55IHJvd3MgdG8gaWdub3JlIGZyb20gdG9wLCBuZXcgKyBmaWx0ZXIgcm93c1xuICAgIGlmIChpc0NyZWF0aW5nKSBleHRyYVJvd0NvdW50ID0gY3JlYXRlRGF0YS5zaXplO1xuICAgIGlmIChpc0NyZWF0aW5nKSB7XG4gICAgICBpZiAocm93SW5kZXggPD0gKGV4dHJhUm93Q291bnQgLSAxKSkge1xuICAgICAgICByb3dDbGFzc05hbWVzLnB1c2goJ29jLWRhdGFncmlkLXJvdy1uZXcnKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzRWRpdGluZykge1xuICAgICAgcm93Q2xhc3NOYW1lcy5wdXNoKCdvYy1kYXRhZ3JpZC1yb3ctZWRpdCcpO1xuICAgIH1cblxuXG4gICAgLy8gY2hlY2sgaWYgcm93IGlzIHNlbGVjdGVkXG4gICAgaWYgKCghaXNDcmVhdGluZyAmJiAhaXNFZGl0aW5nKSAmJlxuICAgICAgKHNlbGVjdGVkSXRlbXMgJiYgZ3JpZC5pZEtleVBhdGgpKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHNlbGVjdGVkSXRlbXMuaW5kZXhPZihkYXRhLmdldEluKFtyb3dJbmRleCAtIGV4dHJhUm93Q291bnQsIC4uLmdyaWQuaWRLZXlQYXRoXSkpICE9PSAtMVxuICAgICAgKSB7XG4gICAgICAgIHJvd0NsYXNzTmFtZXMucHVzaCgnaXMtc2VsZWN0ZWQnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5wcm9wcy5yb3dDbGFzc05hbWVHZXR0ZXIpIHtcbiAgICAgIHJldHVybiByb3dDbGFzc05hbWVzLmpvaW4oJyAnKSArICcgJyArIHRoaXMucHJvcHMucm93Q2xhc3NOYW1lR2V0dGVyKHJvd0luZGV4KTtcbiAgICB9XG4gICAgcmV0dXJuIHJvd0NsYXNzTmFtZXMuam9pbignICcpO1xuICB9O1xuXG4gIGdldENlbGxNZXNzYWdlcyA9IChyb3dJbmRleCwgY29sLCBjZWxsVHlwZSkgPT4ge1xuICAgIGNvbnN0IHJldHVybkRhdGEgPSB7fTtcbiAgICBpZiAoIXRoaXMucHJvcHMuZ3JpZC5pZEtleVBhdGggfHwgIWNvbC52YWx1ZUtleVBhdGgpIHtcbiAgICAgIHJldHVybiByZXR1cm5EYXRhO1xuICAgIH1cbiAgICBsZXQgaW5mb01lc3NhZ2U7XG4gICAgbGV0IGVycm9yTWVzc2FnZTtcbiAgICBsZXQgd2FybmluZ01lc3NhZ2U7XG4gICAgaWYgKGNlbGxUeXBlID09PSAnY3JlYXRlJykge1xuICAgICAgaW5mb01lc3NhZ2UgPSB0aGlzLnByb3BzLmNyZWF0ZUNlbGxNZXNzYWdlcy5nZXRJbihbJ2luZm8nLCByb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgZXJyb3JNZXNzYWdlID0gdGhpcy5wcm9wcy5jcmVhdGVDZWxsTWVzc2FnZXMuZ2V0SW4oWydlcnJvcicsIHJvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgICB3YXJuaW5nTWVzc2FnZSA9IHRoaXMucHJvcHMuY3JlYXRlQ2VsbE1lc3NhZ2VzLmdldEluKFsnd2FybmluZycsIHJvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICAgIGluZm9NZXNzYWdlID0gdGhpcy5wcm9wcy5jZWxsTWVzc2FnZXMuZ2V0SW4oWydpbmZvJywgaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgIGVycm9yTWVzc2FnZSA9IHRoaXMucHJvcHMuY2VsbE1lc3NhZ2VzLmdldEluKFsnZXJyb3InLCBpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgd2FybmluZ01lc3NhZ2UgPSB0aGlzLnByb3BzLmNlbGxNZXNzYWdlcy5nZXRJbihbJ3dhcm5pbmcnLCBpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgIH1cbiAgICBpZiAoaW5mb01lc3NhZ2UpIHtcbiAgICAgIHJldHVybkRhdGEuaW5mb01lc3NhZ2UgPSBpbmZvTWVzc2FnZTtcbiAgICB9XG4gICAgaWYgKGVycm9yTWVzc2FnZSkge1xuICAgICAgcmV0dXJuRGF0YS5lcnJvck1lc3NhZ2UgPSBlcnJvck1lc3NhZ2U7XG4gICAgfVxuICAgIGlmICh3YXJuaW5nTWVzc2FnZSkge1xuICAgICAgcmV0dXJuRGF0YS53YXJuaW5nTWVzc2FnZSA9IHdhcm5pbmdNZXNzYWdlO1xuICAgIH1cbiAgICByZXR1cm4gcmV0dXJuRGF0YTtcbiAgfTtcblxuICBnZXRTY3JvbGxUb1JvdyA9ICgpID0+IHtcbiAgICBsZXQgc2Nyb2xsVG9Sb3c7XG4gICAgaWYgKHRoaXMucHJvcHMuaXNDcmVhdGluZyAmJiAhdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCkgcmV0dXJuIHNjcm9sbFRvUm93O1xuICAgIGlmICh0aGlzLmZvY3VzVG9DcmVhdGVDZWxsKSB7XG4gICAgICBjb25zdCBzY3JvbGxOZXdSb3cgPSB0aGlzLnByb3BzLmNyZWF0ZURhdGEuc2l6ZSAtIDE7XG4gICAgICBpZiAoc2Nyb2xsTmV3Um93ID49IDApIHtcbiAgICAgICAgc2Nyb2xsVG9Sb3cgPSBzY3JvbGxOZXdSb3c7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLmlzRWRpdGluZykge1xuICAgICAgICBzY3JvbGxUb1JvdyA9IHRoaXMuc3RhdGUuY3VycmVudFJvdztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gdGhpcy5wcm9wcy5zY3JvbGxUb1JvdzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgfVxuICAgICAgaWYgKHNjcm9sbFRvUm93ID09PSB1bmRlZmluZWQgJiYgdGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLnNpemUgPiAwKSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gdGhpcy5nZXRTZWxlY3RlZEl0ZW1JbmRleCh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuZmlyc3QoKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzY3JvbGxUb1JvdztcbiAgfTtcblxuICBzZXRGb2N1c1RvID0gKGZvY3VzVG8pID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5pc0VkaXRpbmcgfHwgdGhpcy5wcm9wcy5pc0NyZWF0aW5nKSB7XG4gICAgICBpZiAoZm9jdXNUbyAmJiBmb2N1c1RvLmdldCgndHlwZScpICYmIGZvY3VzVG8gIT09IHRoaXMucHJldkZvY3VzVG8pIHtcbiAgICAgICAgdGhpc1tmb2N1c1RvLmdldCgndHlwZScpXSA9IHRydWU7XG4gICAgICAgIHRoaXMuZm9jdXNUb0xhc3RSb3cgPSBmb2N1c1RvLmdldCgnZm9jdXNUb0xhc3RSb3cnKTtcbiAgICAgICAgdGhpcy5wcmV2Rm9jdXNUbyA9IGZvY3VzVG87XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZUNlbGxTZWxlY3QgPSAoY2VsbFR5cGUsIHJvd0luZGV4LCBjb2x1bW5LZXkpID0+ICgpID0+IHtcbiAgICBpZiAoY2VsbFR5cGUgPT09ICd2aWV3JyAmJiB0aGlzLnByb3BzLmNlbGxTZWxlY3QpIHtcbiAgICAgIHRoaXMucHJvcHMuY2VsbFNlbGVjdGlvbkNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIE1hcCh7XG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICBjb2x1bW5LZXksXG4gICAgICB9KSk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZUNyZWF0ZUNlbGxSZWYgPSAocm93SW5kZXgsIGNvbCkgPT4gKHJlZikgPT4ge1xuICAgIC8vIEZvY3VzIHRvIGNyZWF0ZSBjZWxsXG4gICAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCk7XG4gICAgY29uc3Qgc2VsZWN0UmVmID0gIXJlZiB8fCByZWYuZm9jdXMgPyByZWYgOiB0aGlzLmdldFNlbGVjdFJlZihyZWYpO1xuICAgIGlmIChcbiAgICAgIHRoaXMucHJvcHMuY3JlYXRlRGF0YS5zaXplICYmXG4gICAgICB0aGlzLnByb3BzLmNyZWF0ZURhdGEuc2l6ZSA9PT0gcm93SW5kZXggKyAxICYmXG4gICAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsICYmXG4gICAgICAhdGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdjcmVhdGUnKSAmJlxuICAgICAgc2VsZWN0UmVmXG4gICAgKSB7XG4gICAgICBzZWxlY3RSZWYuZm9jdXMoKTtcbiAgICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wcm9wcy5lbmFibGVBcnJvd05hdmlnYXRpb24pIHtcbiAgICAgIHRoaXMuY3JlYXRlQ2VsbFJlZnNbYCR7dGhpcy5wcm9wcy5ncmlkLmlkfV8ke2NvbHVtbktleX1fJHtyb3dJbmRleH1gXSA9IHJlZjtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlRWRpdENlbGxSZWYgPSAocm93SW5kZXgsIGNvbCkgPT4gKHJlZikgPT4ge1xuICAgIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2wpO1xuICAgIGlmICh0aGlzLmZvY3VzVG9FZGl0Q2VsbCAmJiAhdGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdlZGl0JykpIHtcbiAgICAgIGNvbnN0IHNlbGVjdGVkUm93SW5kZXggPSB0aGlzLmZvY3VzVG9MYXN0Um93ICYmIHRoaXMucHJvcHMuZGF0YS5zaXplID4gMCA/XG4gICAgICAgIHRoaXMucHJvcHMuZGF0YS5zaXplIC0gMSA6IHRoaXMuZ2V0U2VsZWN0ZWRJdGVtSW5kZXgodGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLmZpcnN0KCkpO1xuXG4gICAgICBjb25zdCB7IHNlbGVjdGVkQ2VsbCB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IHNlbGVjdFJlZiA9ICFyZWYgfHwgcmVmLmZvY3VzID8gcmVmIDogdGhpcy5nZXRTZWxlY3RSZWYocmVmKTtcbiAgICAgIGlmIChzZWxlY3RlZENlbGwuc2l6ZSA+IDApIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHNlbGVjdGVkQ2VsbC5nZXQoJ3Jvd0luZGV4JykgPT09IHJvd0luZGV4ICYmXG4gICAgICAgICAgc2VsZWN0ZWRDZWxsLmdldCgnY29sdW1uS2V5JykgPT09IGNvbHVtbktleSAmJlxuICAgICAgICAgIHNlbGVjdFJlZlxuICAgICAgICApIHtcbiAgICAgICAgICBzZWxlY3RSZWYuZm9jdXMoKTtcbiAgICAgICAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuZm9jdXNUb0xhc3RSb3cgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzZWxlY3RlZFJvd0luZGV4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mb2N1c1RvTGFzdFJvdyA9IGZhbHNlO1xuICAgICAgfSBlbHNlIGlmIChzZWxlY3RlZFJvd0luZGV4ID09PSByb3dJbmRleCAmJiBzZWxlY3RSZWYpIHtcbiAgICAgICAgc2VsZWN0UmVmLmZvY3VzKCk7XG4gICAgICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZm9jdXNUb0xhc3RSb3cgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuZW5hYmxlQXJyb3dOYXZpZ2F0aW9uKSB7XG4gICAgICB0aGlzLmNlbGxSZWZzW2Ake3RoaXMucHJvcHMuZ3JpZC5pZH1fJHtjb2x1bW5LZXl9XyR7cm93SW5kZXh9YF0gPSByZWY7XG4gICAgfVxuICB9O1xuXG4gIG1vdmVDZWxsRm9jdXMgPSAobmV4dEVsZW1lbnQsIHJvd0luZGV4LCBjb2x1bW5JbmRleCkgPT4ge1xuICAgIGNvbnN0IGVsZW1lbnRUeXBlcyA9IFsndGV4dCcsICdjaGVja2JveCddO1xuICAgIGlmIChuZXh0RWxlbWVudCAmJiBlbGVtZW50VHlwZXMuaW5jbHVkZXMobmV4dEVsZW1lbnQudHlwZSkpIHtcbiAgICAgIGlmIChyb3dJbmRleCAhPT0gLTEgfHwgY29sdW1uSW5kZXggIT09IC0xKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIGN1cnJlbnRDb2x1bW46IGNvbHVtbkluZGV4LFxuICAgICAgICAgIGN1cnJlbnRSb3c6IHJvd0luZGV4LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAobmV4dEVsZW1lbnQudHlwZSA9PT0gJ2NoZWNrYm94JykgbmV4dEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgaWYgKG5leHRFbGVtZW50LnR5cGUgPT09ICd0ZXh0JykgbmV4dEVsZW1lbnQuc2VsZWN0KCk7XG4gICAgICB9LCA1MCk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZVNlbGVjdEFsbENoZWNrQm94T25DaGFuZ2UgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5zZWxlY3RBbGxJdGVtc0NoYW5nZSh0aGlzLnByb3BzLmdyaWQpO1xuICB9O1xuXG4gIGhhbmRsZVNlbGVjdGlvbkNoZWNrQm94T25DaGFuZ2UgPSByb3dJbmRleCA9PiAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5pdGVtU2VsZWN0aW9uQ2hhbmdlKHRoaXMucHJvcHMuZ3JpZCwgcm93SW5kZXgsIHRydWUsIGZhbHNlKTtcbiAgfTtcblxuICBnZW5lcmF0ZUNvbHVtbnMgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGF0YSxcbiAgICAgIHNlbGVjdGVkSXRlbXMsXG4gICAgICBkYXRlRm9ybWF0LFxuICAgICAgdGhvdXNhbmRTZXBhcmF0b3IsXG4gICAgICBkZWNpbWFsU2VwYXJhdG9yLFxuICAgICAgZ3JpZCxcbiAgICAgIGlubGluZUVkaXQsXG4gICAgICBmaWx0ZXJpbmcsXG4gICAgICByZWdpb24sXG4gICAgICBpbnRsLFxuICAgICAgc2VsZWN0Q29tcG9uZW50T3B0aW9ucyxcbiAgICAgIGlzQ3JlYXRpbmcsXG4gICAgICBleHRyYUNvbHVtbixcbiAgICAgIHJvd1NlbGVjdENoZWNrYm94Q29sdW1uLFxuICAgICAgc2hvd1NlbGVjdEFsbENoZWNrYm94LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgY29sdW1ucyA9IFtdO1xuICAgIGNvbnN0IHRhYkluZGV4ID0gU3RyaW5nKHRoaXMucHJvcHMudGFiSW5kZXgpO1xuICAgIGlmIChleHRyYUNvbHVtbikge1xuICAgICAgY29sdW1ucy5wdXNoKHtcbiAgICAgICAgd2lkdGg6IGV4dHJhQ29sdW1uLndpZHRoIHx8IDQwLFxuICAgICAgICBpc1Jlc2l6YWJsZTogISFleHRyYUNvbHVtbi5pc1Jlc2l6YWJsZSxcbiAgICAgICAgaXNTb3J0YWJsZTogZmFsc2UsXG4gICAgICAgIGNvbHVtbktleTogJ2V4dHJhQ29sdW1uJyxcbiAgICAgICAgY2VsbDogcm93SW5kZXggPT4gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtZXh0cmEtY29sdW1uLWNlbGwgbm8tcm93LXNlbGVjdFwiPlxuICAgICAgICAgICAge2V4dHJhQ29sdW1uLnZhbHVlUmVuZGVyKGRhdGEuZ2V0KHJvd0luZGV4KSwgdGFiSW5kZXgpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApLFxuICAgICAgICBjZWxsRWRpdDogcm93SW5kZXggPT4gKGV4dHJhQ29sdW1uLmNlbGxFZGl0ID8gZXh0cmFDb2x1bW4uY2VsbEVkaXQocm93SW5kZXgpIDogbnVsbCksXG4gICAgICAgIGNlbGxDcmVhdGU6IHJvd0luZGV4ID0+IChleHRyYUNvbHVtbi5jZWxsQ3JlYXRlID8gZXh0cmFDb2x1bW4uY2VsbENyZWF0ZShyb3dJbmRleCkgOiBudWxsKSxcbiAgICAgICAgY2VsbEZpbHRlcjogcm93SW5kZXggPT4gKGV4dHJhQ29sdW1uLmNlbGxGaWx0ZXIgPyBleHRyYUNvbHVtbi5jZWxsRmlsdGVyKHJvd0luZGV4KSA6IG51bGwpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHJvd1NlbGVjdENoZWNrYm94Q29sdW1uKSB7XG4gICAgICBjb2x1bW5zLnB1c2goe1xuICAgICAgICB3aWR0aDogNDAsXG4gICAgICAgIGlzUmVzaXphYmxlOiBmYWxzZSxcbiAgICAgICAgaXNTb3J0YWJsZTogZmFsc2UsXG4gICAgICAgIGNvbHVtbktleTogJ3NlbGVjdGlvbkNoZWNrYm94JyxcbiAgICAgICAgaGVhZGVyOiAoXG4gICAgICAgICAgc2hvd1NlbGVjdEFsbENoZWNrYm94ICYmXG4gICAgICAgICAgPENoZWNrYm94XG4gICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRTZWxlY3RBbGxDaGVja0JveC0ke2dyaWQuaWR9YH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLXNlbGVjdC1hbGwtY2hlY2tib3gtY2VsbCBuby1yb3ctc2VsZWN0XCJcbiAgICAgICAgICAgIGNoZWNrZWQ9e2RhdGEuc2l6ZSAhPT0gMCAmJiBkYXRhLnNpemUgPT09IHNlbGVjdGVkSXRlbXMuc2l6ZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVNlbGVjdEFsbENoZWNrQm94T25DaGFuZ2V9XG4gICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSxcbiAgICAgICAgY2VsbDogKHJvd0luZGV4KSA9PiB7XG4gICAgICAgICAgY29uc3Qgcm93SXRlbSA9IGRhdGEuZ2V0KHJvd0luZGV4KTtcbiAgICAgICAgICBjb25zdCBpdGVtSWQgPSByb3dJdGVtLmdldEluKGdyaWQuaWRLZXlQYXRoKTtcbiAgICAgICAgICBjb25zdCBzZWxlY3RlZCA9IHNlbGVjdGVkSXRlbXMuaW5jbHVkZXMoaXRlbUlkKTtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPENoZWNrYm94XG4gICAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZFNlbGVjdENoZWNrQm94LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke3Jvd0luZGV4fWB9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLXNlbGVjdC1jaGVja2JveC1jZWxsIG5vLXJvdy1zZWxlY3RcIlxuICAgICAgICAgICAgICBjaGVja2VkPXtzZWxlY3RlZH1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlU2VsZWN0aW9uQ2hlY2tCb3hPbkNoYW5nZShyb3dJbmRleCl9XG4gICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgY2VsbEVkaXQ6ICgpID0+IG51bGwsXG4gICAgICAgIGNlbGxDcmVhdGU6ICgpID0+IG51bGwsXG4gICAgICAgIGNlbGxGaWx0ZXI6ICgpID0+IG51bGwsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCB2aXNpYmxlQ29sdW1ucyA9IFtdO1xuICAgIHRoaXMucHJvcHMudmlzaWJsZUNvbHVtbnMuZm9yRWFjaCgodmlzaWJsZUNvbHVtbktleSkgPT4ge1xuICAgICAgdGhpcy5wcm9wcy5jb2x1bW5zLmZvckVhY2goKG9yZ0NvbCkgPT4ge1xuICAgICAgICBpZiAoVXRpbHMuZ2V0Q29sdW1uS2V5KG9yZ0NvbCkgPT09IHZpc2libGVDb2x1bW5LZXkpIHtcbiAgICAgICAgICB2aXNpYmxlQ29sdW1ucy5wdXNoKG9yZ0NvbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHZpc2libGVDb2x1bW5zLmZvckVhY2goKGNvbCkgPT4ge1xuICAgICAgY29uc3QgdmFsdWVFbXB0eUNoZWNrZXIgPSBVdGlscy5nZXRWYWx1ZUVtcHR5Q2hlY2tlcihjb2wpO1xuICAgICAgLy8gQ2VsbCB2YWx1ZSByZW5kZXJpbmdcbiAgICAgIGNvbnN0IHZhbHVlUmVuZGVyID0gKHJvd0luZGV4LCBmb3JtYXQpID0+IHtcbiAgICAgICAgY29uc3QgdmFsID0gZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbCkpIHtcbiAgICAgICAgICByZXR1cm4gY29sLmlzUmVxdWlyZWQgPyA8TSBpZD1cIkdyaWQuVmFsdWVJc01pc3NpbmdcIiAvPiA6ICcnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3JtYXQgPyBmb3JtYXQodmFsKSA6IHZhbDtcbiAgICAgIH07XG5cbiAgICAgIGxldCBjb2x1bW4gPSBHcmlkQ29sdW1uU2VydmljZS5iYXNlQ29sdW1uKGNvbCk7XG4gICAgICAvLyBDb2xsZWN0IGNvbHVtbiBmdW5jdGlvbnMgaW50byBvbmUgT2JqZWN0XG4gICAgICBjb25zdCBjb2x1bW5GdW5jdGlvbnMgPSB7XG4gICAgICAgIGVkaXQ6IHtcbiAgICAgICAgICBnZXRJdGVtVmFsdWU6IHRoaXMuZ2V0RWRpdEl0ZW1WYWx1ZSxcbiAgICAgICAgICBvbkNlbGxWYWx1ZUNoYW5nZTogdGhpcy5vbkVkaXRDZWxsVmFsdWVDaGFuZ2UsXG4gICAgICAgICAgb25DZWxsQmx1cjogdGhpcy5vbkVkaXRDZWxsQmx1cixcbiAgICAgICAgICBvbkNlbGxGb2N1czogdGhpcy5vbkNlbGxGb2N1cyxcbiAgICAgICAgICBvbkNlbGxLZXlEb3duOiB0aGlzLm9uRWRpdENlbGxLZXlEb3duLFxuICAgICAgICAgIGhhbmRsZUNlbGxSZWY6IHRoaXMuaGFuZGxlRWRpdENlbGxSZWYsXG4gICAgICAgIH0sXG4gICAgICAgIGNyZWF0ZToge1xuICAgICAgICAgIGdldEl0ZW1WYWx1ZTogdGhpcy5nZXRDcmVhdGVJdGVtVmFsdWUsXG4gICAgICAgICAgb25DZWxsVmFsdWVDaGFuZ2U6IHRoaXMub25DcmVhdGVDZWxsVmFsdWVDaGFuZ2UsXG4gICAgICAgICAgb25DZWxsQmx1cjogdGhpcy5vbkNyZWF0ZUNlbGxCbHVyLFxuICAgICAgICAgIG9uQ2VsbEZvY3VzOiB0aGlzLm9uQ2VsbEZvY3VzLFxuICAgICAgICAgIG9uQ2VsbEtleURvd246IHRoaXMub25DcmVhdGVDZWxsS2V5RG93bixcbiAgICAgICAgICBoYW5kbGVDZWxsUmVmOiB0aGlzLmhhbmRsZUNyZWF0ZUNlbGxSZWYsXG4gICAgICAgIH0sXG4gICAgICAgIGZpbHRlcjoge1xuICAgICAgICAgIGdldEl0ZW1WYWx1ZTogdGhpcy5nZXRGaWx0ZXJJdGVtVmFsdWUsXG4gICAgICAgICAgb25DZWxsVmFsdWVDaGFuZ2U6IHRoaXMub25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UsXG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICAvLyBoYW5kbGUgY29sdW1uLmNlbGwgLyBjb2x1bW4uY2VsbEVkaXQgLyBjb2x1bW4uY2VsbENyZWF0ZSAvIGNvbHVtbi5jZWxsRmlsdGVyXG4gICAgICBjb25zdCBjZWxsUHJvcHMgPSB7XG4gICAgICAgIGRhdGEsXG4gICAgICAgIGRhdGVGb3JtYXQsXG4gICAgICAgIHRob3VzYW5kU2VwYXJhdG9yLFxuICAgICAgICBkZWNpbWFsU2VwYXJhdG9yLFxuICAgICAgfTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgY29sdW1uID0gR3JpZENvbHVtblNlcnZpY2UuY29sdW1uQ2VsbChjb2x1bW4sIGNlbGxQcm9wcywgY29sLCB2YWx1ZVJlbmRlcik7XG5cbiAgICAgIC8vIGhhbmRsZSBjb2x1bW5Db21wb25lbnRUeXBlc1xuICAgICAgY29uc3QgY29tcG9uZW50VHlwZVByb3BzID0ge1xuICAgICAgICAuLi5jZWxsUHJvcHMsXG4gICAgICAgIGdyaWQsXG4gICAgICAgIGlubGluZUVkaXQsXG4gICAgICAgIGZpbHRlcmluZyxcbiAgICAgICAgcmVnaW9uLFxuICAgICAgICBpbnRsLFxuICAgICAgICBzZWxlY3RDb21wb25lbnRPcHRpb25zLFxuICAgICAgfTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgY29sdW1uID0gR3JpZENvbHVtblNlcnZpY2UuY29sdW1uQ29tcG9uZW50VHlwZShcbiAgICAgICAgY29sdW1uLFxuICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgY29tcG9uZW50VHlwZVByb3BzLFxuICAgICAgICBjb2wsXG4gICAgICAgIGNvbHVtbkZ1bmN0aW9ucyxcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlLFxuICAgICAgKTtcblxuICAgICAgY29sdW1ucy5wdXNoKGNvbHVtbik7XG4gICAgfSk7XG5cbiAgICBpZiAoaXNDcmVhdGluZykge1xuICAgICAgY29sdW1ucy5wdXNoKHtcbiAgICAgICAgd2lkdGg6IDM3LFxuICAgICAgICBpc1Jlc2l6YWJsZTogZmFsc2UsXG4gICAgICAgIGNvbHVtbktleTogJ3JlbW92ZU5ld0l0ZW0nLFxuICAgICAgICBjZWxsOiAoKSA9PiBudWxsLFxuICAgICAgICBjZWxsRWRpdDogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbENyZWF0ZTogcm93SW5kZXggPT4gKFxuICAgICAgICAgIDxJY29uXG4gICAgICAgICAgICBpZD17YG9jLWRhdGFncmlkLW5ldy1pdGVtLXJlbW92ZS0ke2dyaWQuaWR9LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgIHR5cGU9XCJpbmRpY2F0b3JcIlxuICAgICAgICAgICAgbmFtZT1cImRlbGV0ZVwiXG4gICAgICAgICAgICB3aWR0aD17MzB9XG4gICAgICAgICAgICBoZWlnaHQ9ezMwfVxuICAgICAgICAgICAgc3R5bGU9e3sgcGFkZGluZzogJzdweCcgfX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMucHJvcHMucmVtb3ZlTmV3SXRlbShncmlkLCByb3dJbmRleCl9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSxcbiAgICAgICAgY2VsbEZpbHRlcjogKCkgPT4gbnVsbCxcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gY29sdW1ucztcbiAgfTtcblxuICBpc0NlbGxFZGl0ZWQgPSAocm93SW5kZXgsIGNvbCwgY2VsbFR5cGUpID0+IHtcbiAgICBpZiAoY2VsbFR5cGUgIT09ICdlZGl0Jykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBpZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgcmV0dXJuICEhdGhpcy5wcm9wcy5lZGl0RGF0YS5nZXRJbihbaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgfTtcblxuICBoYW5kbGVBZnRlckFkZEl0ZW0gPSAoKSA9PiB7XG4gICAgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCA9IHRydWU7XG4gIH07XG5cbiAgaGFuZGxlQWZ0ZXJFZGl0UHJlc3MgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5zaXplKSB7XG4gICAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IHRydWU7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY3VycmVudFJvdzogdW5kZWZpbmVkLFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZUFmdGVyVmFsaWRhdGlvbkVycm9yID0gKCkgPT4ge1xuICAgIHRoaXMuZm9jdXNUb0Vycm9yQ2VsbCA9IHRydWU7XG4gIH07XG5cbiAgaGFuZGxlUm93Q2xpY2sgPSAoZSwgcm93SW5kZXgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5yb3dTZWxlY3QgJiYgIXRoaXMucHJvcHMuaXNDcmVhdGluZyAmJiAhdGhpcy5wcm9wcy5pc0VkaXRpbmcpIHtcbiAgICAgIGlmIChlLmN0cmxLZXkgfHwgZS5zaGlmdEtleSkge1xuICAgICAgICBkb2N1bWVudC5nZXRTZWxlY3Rpb24oKVxuICAgICAgICAgIC5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICAgIH1cbiAgICAgIC8vIERvbid0IHRyaWdnZXIgc2VsZWN0aW9uIGNoYW5nZSBvbiB3aGVuIHVzZXIgY2xpY2tzIG9uIHNwZWNpYWwgY2VsbHMgbGlrZSBjaGVja2JveC9leHRyYVxuICAgICAgLy8gQ2hlY2sgdGhhdCBjbGlja2VkIG5vZGUncyBwYXJlbnQgb3IgcGFyZW50J3MgcGFyZW50IGRvZXNuJ3QgaGF2ZSBuby1yb3ctc2VsZWN0IGNsYXNzXG4gICAgICBjb25zdCB7IHBhcmVudE5vZGUgfSA9IGUudGFyZ2V0O1xuICAgICAgY29uc3QgcGFyZW50MWNsYXNzID0gcGFyZW50Tm9kZS5jbGFzc05hbWUgJiYgcGFyZW50Tm9kZS5jbGFzc05hbWUuaW5kZXhPZlxuICAgICAgICA/IHBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgIDogJyc7XG4gICAgICBjb25zdCBwYXJlbnQyY2xhc3MgPSBwYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lICYmIHBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUuaW5kZXhPZiAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgID8gcGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZVxuICAgICAgICA6ICcnO1xuICAgICAgY29uc3QgcGFyZW50M2NsYXNzID0gcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lICYmIHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZS5pbmRleE9mIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgPyBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWVcbiAgICAgICAgOiAnJztcbiAgICAgIGNvbnN0IHBhcmVudDRjbGFzcyA9IHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lICYmIHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lLmluZGV4T2YgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICA/IHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgIDogJyc7XG4gICAgICBpZiAoXG4gICAgICAgIHBhcmVudDFjbGFzcy5pbmRleE9mKCduby1yb3ctc2VsZWN0JykgPT09IC0xICYmXG4gICAgICAgIHBhcmVudDJjbGFzcy5pbmRleE9mKCduby1yb3ctc2VsZWN0JykgPT09IC0xICYmXG4gICAgICAgIHBhcmVudDNjbGFzcy5pbmRleE9mKCduby1yb3ctc2VsZWN0JykgPT09IC0xICYmXG4gICAgICAgIHBhcmVudDRjbGFzcy5pbmRleE9mKCduby1yb3ctc2VsZWN0JykgPT09IC0xXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5wcm9wcy5pdGVtU2VsZWN0aW9uQ2hhbmdlKFxuICAgICAgICAgIHRoaXMucHJvcHMuZ3JpZCxcbiAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICB0aGlzLnByb3BzLm11bHRpU2VsZWN0ICYmIGUuY3RybEtleSxcbiAgICAgICAgICB0aGlzLnByb3BzLm11bHRpU2VsZWN0ICYmIGUuc2hpZnRLZXksXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLm9uUm93Q2xpY2spIHtcbiAgICAgIHRoaXMucHJvcHMub25Sb3dDbGljayhlLCByb3dJbmRleCwgdGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCkpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBoYW5kbGVDb250ZXh0TWVudSA9IChlLCByb3dJbmRleCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmNvbnRleHRNZW51SXRlbXMpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgaXRlbVNlbGVjdGlvbkNoYW5nZSxcbiAgICAgICAgc2VsZWN0ZWRJdGVtcyxcbiAgICAgICAgZ3JpZCxcbiAgICAgICAgZGF0YSxcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjb250ZXh0TWVudU9wZW46IHRydWUsXG4gICAgICAgIGNvbnRleHRNZW51WDogZS5jbGllbnRYLFxuICAgICAgICBjb250ZXh0TWVudVk6IGUuY2xpZW50WSxcbiAgICAgIH0pO1xuICAgICAgLy8gSWYgY2xpY2tlZCBpdGVtIGlzIG5vdCBzZWxlY3RlZCwgY2hhbmdlIHNlbGVjdGlvbiB0byBpdFxuICAgICAgaWYgKCFzZWxlY3RlZEl0ZW1zLmluY2x1ZGVzKGRhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi5ncmlkLmlkS2V5UGF0aF0pKSkge1xuICAgICAgICBpdGVtU2VsZWN0aW9uQ2hhbmdlKGdyaWQsIHJvd0luZGV4KTtcbiAgICAgIH1cbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkRvY3VtZW50Q2xpY2spO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBoYW5kbGVDb250ZXh0TWVudUl0ZW1DbGljayA9IChvbkNsaWNrLCBzZWxlY3RlZEl0ZW1zLCBzZWxlY3RlZERhdGEpID0+ICgpID0+IHtcbiAgICBvbkNsaWNrKHNlbGVjdGVkSXRlbXMsIHNlbGVjdGVkRGF0YSk7XG4gIH07XG5cbiAgaGFuZGxlUm93SGVpZ2h0R2V0dGVyID0gcm93SW5kZXggPT5cbiAgICB0aGlzLnByb3BzLnJvd0hlaWdodEdldHRlcih0aGlzLnByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSwgcm93SW5kZXgpO1xuXG4gIHJlbmRlckNlbGwgPSBjb2wgPT4gKGNlbGxQcm9wcykgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGlzQ3JlYXRpbmcsXG4gICAgICBpc0VkaXRpbmcsXG4gICAgICBjcmVhdGVEYXRhLFxuICAgICAgc2VsZWN0ZWRDZWxsLFxuICAgICAgZ3JpZCxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHJvd0luZGV4LCAuLi5wcm9wcyB9ID0gY2VsbFByb3BzO1xuICAgIGxldCBjZWxsO1xuICAgIGxldCBjZWxsVHlwZSA9ICd2aWV3JztcbiAgICBsZXQgZXh0cmFSb3dDb3VudCA9IDA7IC8vIGhvdyBtYW55IHJvd3MgdG8gaWdub3JlIGZyb20gdG9wLCBuZXcgKyBmaWx0ZXIgcm93c1xuICAgIGlmIChpc0NyZWF0aW5nKSBleHRyYVJvd0NvdW50ID0gY3JlYXRlRGF0YS5zaXplO1xuICAgIGlmIChpc0NyZWF0aW5nKSB7XG4gICAgICBpZiAocm93SW5kZXggPD0gKGV4dHJhUm93Q291bnQgLSAxKSkge1xuICAgICAgICBpZiAoY29sLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjZWxsID0gY29sLmNlbGxDcmVhdGUocm93SW5kZXgpO1xuICAgICAgICAgIGNlbGxUeXBlID0gJ2NyZWF0ZSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2VsbCA9IG51bGw7XG4gICAgICAgICAgY2VsbFR5cGUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjZWxsID0gY29sLmNlbGwocm93SW5kZXggLSBleHRyYVJvd0NvdW50KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzRWRpdGluZyAmJiBjb2wuY2VsbEVkaXQpIHtcbiAgICAgIGNlbGwgPSBjb2wuY2VsbEVkaXQocm93SW5kZXggLSBleHRyYVJvd0NvdW50KTtcbiAgICAgIGNlbGxUeXBlID0gJ2VkaXQnO1xuICAgIH0gZWxzZSB7XG4gICAgICBjZWxsID0gY29sLmNlbGwocm93SW5kZXggLSBleHRyYVJvd0NvdW50KTtcbiAgICB9XG4gICAgY29uc3QgaXNTcGVjaWFsID0gcHJvcHMuY29sdW1uS2V5ID09PSAnc2VsZWN0aW9uQ2hlY2tib3gnIHx8IHByb3BzLmNvbHVtbktleSA9PT0gJ2V4dHJhQ29sdW1uJztcbiAgICBpZiAoKGNlbGxUeXBlID09PSAndmlldycgfHwgY2VsbFR5cGUgPT09ICdlZGl0JyB8fCBjZWxsVHlwZSA9PT0gJ2NyZWF0ZScpICYmICFpc1NwZWNpYWwpIHtcbiAgICAgIGNvbnN0IGdldFJvd0luZGV4ID0gKGNlbGxUeXBlID09PSAnY3JlYXRlJykgPyByb3dJbmRleCA6IChyb3dJbmRleCAtIGV4dHJhUm93Q291bnQpO1xuICAgICAgY29uc3QgbWVzc2FnZURhdGEgPSB0aGlzLmdldENlbGxNZXNzYWdlcyhnZXRSb3dJbmRleCwgY29sLCBjZWxsVHlwZSk7XG4gICAgICBjb25zdCBpc0VkaXRlZCA9IHRoaXMuaXNDZWxsRWRpdGVkKGdldFJvd0luZGV4LCBjb2wsIGNlbGxUeXBlKTtcbiAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IChzZWxlY3RlZENlbGwuZ2V0KCdyb3dJbmRleCcpID09PSByb3dJbmRleCAmJiBzZWxlY3RlZENlbGwuZ2V0KCdjb2x1bW5LZXknKSA9PT0gcHJvcHMuY29sdW1uS2V5KSA/XG4gICAgICAgICdvYy1kYXRhZ3JpZC1jZWxsIGlzLXNlbGVjdGVkJyA6ICdvYy1kYXRhZ3JpZC1jZWxsJztcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxDZWxsXG4gICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICAgIHN0eWxlPXtjb2wuc3R5bGV9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDZWxsU2VsZWN0KGNlbGxUeXBlLCByb3dJbmRleCwgcHJvcHMuY29sdW1uS2V5KX1cbiAgICAgICAgPlxuICAgICAgICAgIDxDZWxsVG9vbHRpcFxuICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkQ2VsbC0ke2dyaWQuaWR9LSR7cHJvcHMuY29sdW1uS2V5fS0ke3Jvd0luZGV4fWB9XG4gICAgICAgICAgICBpc0VkaXRlZD17aXNFZGl0ZWR9XG4gICAgICAgICAgICBpc0Vycm9yPXshIW1lc3NhZ2VEYXRhLmVycm9yTWVzc2FnZX1cbiAgICAgICAgICAgIGlzV2FybmluZz17ISFtZXNzYWdlRGF0YS53YXJuaW5nTWVzc2FnZX1cbiAgICAgICAgICAgIGluZm9NZXNzYWdlPXttZXNzYWdlRGF0YS5pbmZvTWVzc2FnZX1cbiAgICAgICAgICAgIGVycm9yTWVzc2FnZT17bWVzc2FnZURhdGEuZXJyb3JNZXNzYWdlfVxuICAgICAgICAgICAgd2FybmluZ01lc3NhZ2U9e21lc3NhZ2VEYXRhLndhcm5pbmdNZXNzYWdlfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtjZWxsfVxuICAgICAgICAgIDwvQ2VsbFRvb2x0aXA+XG4gICAgICAgIDwvQ2VsbD5cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8Q2VsbCB7Li4ucHJvcHN9IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWNlbGxcIiBzdHlsZT17Y29sLnN0eWxlfT57Y2VsbH08L0NlbGw+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJDb2x1bW5zID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5hbGxEYXRhU2l6ZSAmJiAhdGhpcy5wcm9wcy5pc0J1c3kgJiYgIXRoaXMucHJvcHMuaXNDcmVhdGluZykge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPENvbHVtblxuICAgICAgICAgIGNvbHVtbktleT1cImRhdGFFbXB0eUNvbHVtblwiXG4gICAgICAgICAgaGVhZGVyPXs8Q2VsbCBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInIH19PjxNIGlkPVwiR3JpZC5Ob0l0ZW1zXCIgLz48L0NlbGw+fVxuICAgICAgICAgIHdpZHRoPXsxMH1cbiAgICAgICAgICBpc1Jlc2l6YWJsZT17ZmFsc2V9XG4gICAgICAgICAgZmxleEdyb3c9ezF9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoIXRoaXMucHJvcHMudmlzaWJsZUNvbHVtbnMuc2l6ZSkge1xuICAgICAgaWYgKHRoaXMucHJvcHMuaXNCdXN5KSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPENvbHVtblxuICAgICAgICAgICAgY29sdW1uS2V5PVwiZGF0YUVtcHR5Q29sdW1uXCJcbiAgICAgICAgICAgIGhlYWRlcj17PENlbGw+Jm5ic3A7PC9DZWxsPn1cbiAgICAgICAgICAgIHdpZHRoPXsxMH1cbiAgICAgICAgICAgIGlzUmVzaXphYmxlPXtmYWxzZX1cbiAgICAgICAgICAgIGZsZXhHcm93PXsxfVxuICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Q29sdW1uXG4gICAgICAgICAgY29sdW1uS2V5PVwiZGF0YUVtcHR5Q29sdW1uXCJcbiAgICAgICAgICBoZWFkZXI9ezxDZWxsIHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicgfX0+PE0gaWQ9XCJHcmlkLk5vQ29sdW1uc1wiIC8+PC9DZWxsPn1cbiAgICAgICAgICB3aWR0aD17MTB9XG4gICAgICAgICAgaXNSZXNpemFibGU9e2ZhbHNlfVxuICAgICAgICAgIGZsZXhHcm93PXsxfVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3QgY29sdW1ucyA9IHRoaXMuZ2VuZXJhdGVDb2x1bW5zKCk7XG4gICAgaWYgKGNvbHVtbnMubGVuZ2h0ID09PSAwKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gY29sdW1ucy5tYXAoY29sID0+IChcbiAgICAgIDxDb2x1bW5cbiAgICAgICAga2V5PXtjb2wuY29sdW1uS2V5fVxuICAgICAgICBjb2x1bW5LZXk9e2NvbC5jb2x1bW5LZXl9XG4gICAgICAgIGhlYWRlcj17XG4gICAgICAgICAgPEhlYWRlckNlbGxcbiAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZEhlYWRlci0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2wuY29sdW1uS2V5fWB9XG4gICAgICAgICAgICBncmlkPXt0aGlzLnByb3BzLmdyaWR9XG4gICAgICAgICAgICBjb2x1bW5zPXt0aGlzLnByb3BzLmNvbHVtbnN9XG4gICAgICAgICAgICBjb2x1bW49e2NvbH1cbiAgICAgICAgICAgIGN1cnJlbnRTb3J0Q29sdW1uPXt0aGlzLnByb3BzLnNvcnRDb2x1bW59XG4gICAgICAgICAgICBjdXJyZW50U29ydE9yZGVyPXt0aGlzLnByb3BzLnNvcnRPcmRlcn1cbiAgICAgICAgICAgIG9uU29ydENoYW5nZT17dGhpcy5wcm9wcy5zb3J0Q2hhbmdlfVxuICAgICAgICAgICAgaXNCdXN5PXt0aGlzLnByb3BzLmlzQnVzeX1cbiAgICAgICAgICAgIGZpbHRlcmluZz17dGhpcy5wcm9wcy5pc0ZpbHRlcmluZ31cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7Y29sLmhlYWRlcn1cbiAgICAgICAgICA8L0hlYWRlckNlbGw+XG4gICAgICAgIH1cbiAgICAgICAgY2VsbD17dGhpcy5yZW5kZXJDZWxsKGNvbCl9XG4gICAgICAgIHdpZHRoPXt0aGlzLnByb3BzLmNvbHVtbldpZHRocy5nZXQoY29sLmNvbHVtbktleSwgY29sLndpZHRoKX1cbiAgICAgICAgbWluV2lkdGg9e2NvbC5taW5XaWR0aH1cbiAgICAgICAgbWF4V2lkdGg9e2NvbC5tYXhXaWR0aH1cbiAgICAgICAgaXNSZXNpemFibGU9e2NvbC5pc1Jlc2l6YWJsZX1cbiAgICAgICAgZmxleEdyb3c9e2NvbC5mbGV4R3JvdyA/IGNvbC5mbGV4R3JvdyA6IDB9XG4gICAgICAgIGZpeGVkPXtjb2wuZml4ZWR9XG4gICAgICAgIGFsbG93Q2VsbHNSZWN5Y2xpbmc9e2NvbC5hbGxvd0NlbGxzUmVjeWNsaW5nfVxuICAgICAgLz4pKTtcbiAgfTtcblxuICByZW5kZXJDb250ZXh0TWVudSA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBjb250ZXh0TWVudUl0ZW1zLFxuICAgICAgZGF0YSxcbiAgICAgIGdyaWQsXG4gICAgICBzZWxlY3RlZEl0ZW1zLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHtcbiAgICAgIGNvbnRleHRNZW51WCxcbiAgICAgIGNvbnRleHRNZW51WSxcbiAgICB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBzdHlsZSA9IHtcbiAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICB6SW5kZXg6IDEwMDAwLFxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICB0b3A6IGAke2NvbnRleHRNZW51WX1weGAsXG4gICAgICBsZWZ0OiBgJHtjb250ZXh0TWVudVh9cHhgLFxuICAgIH07XG4gICAgY29uc3Qgc2VsZWN0ZWREYXRhID0gZGF0YS5maWx0ZXIoZCA9PiBzZWxlY3RlZEl0ZW1zLmluY2x1ZGVzKGQuZ2V0SW4oZ3JpZC5pZEtleVBhdGgpKSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDx1bCBjbGFzc05hbWU9XCJkcm9wZG93bi1tZW51IG9jLWRhdGFncmlkLWNvbnRleHQtbWVudSBvcGVuXCIgc3R5bGU9e3N0eWxlfT5cbiAgICAgICAge2NvbnRleHRNZW51SXRlbXMgJiYgY29udGV4dE1lbnVJdGVtcy5tYXAgJiYgY29udGV4dE1lbnVJdGVtcy5tYXAoKGl0ZW0sIGkpID0+IHtcbiAgICAgICAgICBsZXQgeyBkaXNhYmxlZCB9ID0gaXRlbTtcbiAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0uZGlzYWJsZWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGRpc2FibGVkID0gaXRlbS5kaXNhYmxlZChzZWxlY3RlZEl0ZW1zLCBzZWxlY3RlZERhdGEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPE1lbnVJdGVtXG4gICAgICAgICAgICAgIGtleT17aX0gLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAgICAgICBoZWFkZXI9e2l0ZW0uaGVhZGVyfVxuICAgICAgICAgICAgICBkaXZpZGVyPXtpdGVtLmRpdmlkZXJ9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgdGl0bGU9e2l0ZW0udGl0bGV9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9eyhkaXNhYmxlZCB8fCAhaXRlbS5vbkNsaWNrKSA/IG51bGwgOiB0aGlzLmhhbmRsZUNvbnRleHRNZW51SXRlbUNsaWNrKFxuICAgICAgICAgICAgICAgIGl0ZW0ub25DbGljayxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEl0ZW1zLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkRGF0YSxcbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2l0ZW0udmFsdWV9XG4gICAgICAgICAgICA8L01lbnVJdGVtPlxuICAgICAgICAgICk7XG4gICAgICAgIH0pfVxuICAgICAgPC91bD5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBncmlkQ2xhc3NOYW1lID0gY2xhc3NOYW1lcyh7XG4gICAgICAnb2MtZGF0YWdyaWQtY29udGFpbmVyJzogdHJ1ZSxcbiAgICAgICd3aXRoLWFjdGlvbmJhcic6IHRoaXMucHJvcHMuaW5saW5lRWRpdCAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlQWN0aW9uQmFyLFxuICAgICAgJ2lzLWJ1c3knOiB0aGlzLnByb3BzLmlzQnVzeSxcbiAgICAgICdpcy1lZGl0aW5nJzogdGhpcy5wcm9wcy5pc0VkaXRpbmcsXG4gICAgICAnaXMtY3JlYXRpbmcnOiB0aGlzLnByb3BzLmlzQ3JlYXRpbmcsXG4gICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgIH0pO1xuXG4gICAgLy8gY2hlY2sgaWYgdGhlcmUgaXMgYSBuZXcgcmVxdWVzdCB0byBjaGFuZ2UgZWRpdCBtb2RlIGZvY3VzXG4gICAgdGhpcy5zZXRGb2N1c1RvKHRoaXMucHJvcHMuZm9jdXNUeXBlKTtcblxuICAgIGxldCBhY3Rpb25CYXIgPSBudWxsO1xuICAgIGxldCBhY3Rpb25CYXJSaWdodCA9IG51bGw7XG4gICAgbGV0IGFjdGlvbkJhckxlZnQgPSBudWxsO1xuICAgIGlmIChcbiAgICAgICh0aGlzLnByb3BzLmFjdGlvbkJhciB8fFxuICAgICAgICB0aGlzLnByb3BzLmlubGluZUVkaXQgfHxcbiAgICAgICAgdGhpcy5wcm9wcy5maWx0ZXJpbmcgfHxcbiAgICAgICAgdGhpcy5wcm9wcy5yZW1vdmluZykgJiZcbiAgICAgICF0aGlzLnByb3BzLmRpc2FibGVBY3Rpb25CYXJcbiAgICApIHtcbiAgICAgIGFjdGlvbkJhclJpZ2h0ID0gKFxuICAgICAgICA8QWN0aW9uQmFyIHBvc2l0aW9uPVwicmlnaHRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWFjdGlvbmJhci1yaWdodFwiPnt0aGlzLnByb3BzLmFjdGlvbkJhcn08L2Rpdj5cbiAgICAgICAgICB7KHRoaXMucHJvcHMuZmlsdGVyaW5nICYmIHRoaXMucHJvcHMuZGlzYWJsZURyb3Bkb3duICYmXG4gICAgICAgICAgICAhdGhpcy5wcm9wcy5kaXNhYmxlRmlsdGVyaW5nQ29udHJvbHMpICYmIDxGaWx0ZXJpbmdDb250cm9scyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgICB9XG4gICAgICAgICAge3RoaXMucHJvcHMuaW5saW5lRWRpdCAmJlxuICAgICAgICAgIDxJbmxpbmVFZGl0Q29udHJvbHNcbiAgICAgICAgICAgIGFmdGVyQWRkSXRlbT17dGhpcy5oYW5kbGVBZnRlckFkZEl0ZW19XG4gICAgICAgICAgICBhZnRlckVkaXRQcmVzcz17dGhpcy5oYW5kbGVBZnRlckVkaXRQcmVzc31cbiAgICAgICAgICAgIGFmdGVyVmFsaWRhdGlvbkVycm9yPXt0aGlzLmhhbmRsZUFmdGVyVmFsaWRhdGlvbkVycm9yfVxuICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgLz5cbiAgICAgICAgICB9XG4gICAgICAgICAgeyh0aGlzLnByb3BzLmRyb3Bkb3duTWVudUl0ZW1zIHx8XG4gICAgICAgICAgICB0aGlzLnByb3BzLnJlbW92aW5nIHx8XG4gICAgICAgICAgICB0aGlzLnByb3BzLmNvbHVtblNldHRpbmdzIHx8XG4gICAgICAgICAgICAodGhpcy5wcm9wcy5maWx0ZXJpbmcgJiZcbiAgICAgICAgICAgICAgIXRoaXMucHJvcHMuZGlzYWJsZURyb3Bkb3duKSkgJiYgPERyb3Bkb3duQ29udHJvbHMgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICAgfVxuICAgICAgICA8L0FjdGlvbkJhcj5cbiAgICAgICk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLmFjdGlvbkJhckxlZnQgfHwgdGhpcy5wcm9wcy5ncmlkSGVhZGVyKSB7XG4gICAgICBhY3Rpb25CYXJMZWZ0ID0gKFxuICAgICAgICA8QWN0aW9uQmFyIHBvc2l0aW9uPVwibGVmdFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtZ3JpZGhlYWRlclwiPnt0aGlzLnByb3BzLmdyaWRIZWFkZXJ9PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1hY3Rpb25iYXItbGVmdFwiPnt0aGlzLnByb3BzLmFjdGlvbkJhckxlZnR9PC9kaXY+XG4gICAgICAgIDwvQWN0aW9uQmFyPlxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGFjdGlvbkJhckxlZnQgfHwgYWN0aW9uQmFyUmlnaHQpIHtcbiAgICAgIGFjdGlvbkJhciA9IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1hY3Rpb25iYXItY29udGFpbmVyXCI+XG4gICAgICAgICAge2FjdGlvbkJhckxlZnR9XG4gICAgICAgICAge2FjdGlvbkJhclJpZ2h0fVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICAgIGxldCByb3dzQ291bnQgPVxuICAgICAgKHRoaXMucHJvcHMucm93c0NvdW50IHx8IHRoaXMucHJvcHMucm93c0NvdW50ID09PSAwKSA/XG4gICAgICAgIHRoaXMucHJvcHMucm93c0NvdW50IDpcbiAgICAgICAgdGhpcy5wcm9wcy5kYXRhLnNpemU7XG4gICAgaWYgKHRoaXMucHJvcHMuaXNDcmVhdGluZykgcm93c0NvdW50ICs9IHRoaXMucHJvcHMuY3JlYXRlRGF0YS5zaXplO1xuICAgIGlmICghdGhpcy5wcm9wcy52aXNpYmxlQ29sdW1ucy5zaXplKSByb3dzQ291bnQgPSAwO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPXtgb2MtZGF0YWdyaWQtJHt0aGlzLnByb3BzLmdyaWQuaWR9YH1cbiAgICAgICAgY2xhc3NOYW1lPXtncmlkQ2xhc3NOYW1lfVxuICAgICAgICBzdHlsZT17dGhpcy5wcm9wcy5jb250YWluZXJTdHlsZX1cbiAgICAgID5cbiAgICAgICAge3RoaXMucHJvcHMuaXNCdXN5ICYmIDxTcGlubmVyIC8+fVxuICAgICAgICB7dGhpcy5zdGF0ZS5jb250ZXh0TWVudU9wZW4gJiYgdGhpcy5yZW5kZXJDb250ZXh0TWVudSgpfVxuICAgICAgICB7YWN0aW9uQmFyfVxuICAgICAgICA8UmVzcG9uc2l2ZUZpeGVkRGF0YVRhYmxlXG4gICAgICAgICAgaWQ9e3RoaXMucHJvcHMuZ3JpZC5pZH1cbiAgICAgICAgICByb3dzQ291bnQ9e3Jvd3NDb3VudH1cbiAgICAgICAgICBoZWFkZXJIZWlnaHQ9e3RoaXMucHJvcHMuaXNGaWx0ZXJpbmcgP1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5oZWFkZXJIZWlnaHQgKyB0aGlzLnByb3BzLmZpbHRlclJvd0hlaWdodFxuICAgICAgICAgICAgOiB0aGlzLnByb3BzLmhlYWRlckhlaWdodH1cbiAgICAgICAgICByb3dIZWlnaHQ9e3RoaXMucHJvcHMucm93SGVpZ2h0fVxuICAgICAgICAgIG9uQ29sdW1uUmVzaXplRW5kQ2FsbGJhY2s9e3RoaXMub25Db2x1bW5SZXNpemVFbmRDYWxsYmFja31cbiAgICAgICAgICBpc0NvbHVtblJlc2l6aW5nPXtmYWxzZX1cbiAgICAgICAgICBvblJvd0NsaWNrPXt0aGlzLmhhbmRsZVJvd0NsaWNrfVxuICAgICAgICAgIHNjcm9sbFRvQ29sdW1uPXt0aGlzLnByb3BzLnNjcm9sbFRvQ29sdW1uIHx8IHRoaXMuc3RhdGUuY3VycmVudENvbHVtbn1cbiAgICAgICAgICBzY3JvbGxUb3A9e3RoaXMucHJvcHMuc2Nyb2xsVG9wfVxuICAgICAgICAgIHNjcm9sbFRvUm93PXt0aGlzLmdldFNjcm9sbFRvUm93KCl9XG4gICAgICAgICAgb25Sb3dEb3VibGVDbGljaz17dGhpcy5wcm9wcy5vblJvd0RvdWJsZUNsaWNrfVxuICAgICAgICAgIG9uUm93TW91c2VEb3duPXt0aGlzLnByb3BzLm9uTW91c2VEb3dufVxuICAgICAgICAgIG9uUm93TW91c2VFbnRlcj17dGhpcy5wcm9wcy5vblJvd01vdXNlRW50ZXJ9XG4gICAgICAgICAgb25Sb3dNb3VzZUxlYXZlPXt0aGlzLnByb3BzLm9uUm93TW91c2VMZWF2ZX1cbiAgICAgICAgICBvblNjcm9sbFN0YXJ0PXt0aGlzLnByb3BzLm9uU2Nyb2xsU3RhcnR9XG4gICAgICAgICAgb25TY3JvbGxFbmQ9e3RoaXMucHJvcHMub25TY3JvbGxFbmR9XG4gICAgICAgICAgcm93Q2xhc3NOYW1lR2V0dGVyPXt0aGlzLmdldFJvd0NsYXNzTmFtZX1cbiAgICAgICAgICByb3dIZWlnaHRHZXR0ZXI9e3RoaXMucHJvcHMucm93SGVpZ2h0R2V0dGVyICYmIHRoaXMuaGFuZGxlUm93SGVpZ2h0R2V0dGVyfVxuICAgICAgICAgIG9uQ29udGVudEhlaWdodENoYW5nZT17dGhpcy5wcm9wcy5vbkNvbnRlbnRIZWlnaHRDaGFuZ2V9XG4gICAgICAgICAgb25Sb3dDb250ZXh0TWVudT17dGhpcy5oYW5kbGVDb250ZXh0TWVudX1cbiAgICAgICAgPlxuICAgICAgICAgIHt0aGlzLnJlbmRlckNvbHVtbnMoKX1cbiAgICAgICAgPC9SZXNwb25zaXZlRml4ZWREYXRhVGFibGU+XG4gICAgICAgIHt0aGlzLnByb3BzLmlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW4gJiZcbiAgICAgICAgPENvbHVtblNldHRpbmdzTW9kYWxcbiAgICAgICAgICBncmlkPXt0aGlzLnByb3BzLmdyaWR9XG4gICAgICAgICAgY29sdW1ucz17dGhpcy5wcm9wcy5jb2x1bW5zfVxuICAgICAgICAgIHZpc2libGVDb2x1bW5zPXt0aGlzLnByb3BzLnZpc2libGVDb2x1bW5zfVxuICAgICAgICAgIGNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbD17dGhpcy5wcm9wcy5jbG9zZUNvbHVtblNldHRpbmdzTW9kYWx9XG4gICAgICAgICAgc2F2ZUNvbHVtblNldHRpbmdzPXt0aGlzLnByb3BzLnNhdmVDb2x1bW5TZXR0aW5nc31cbiAgICAgICAgLz5cbiAgICAgICAgfVxuICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRGF0YUdyaWQ7XG4iXX0=