"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _immutable = require("immutable");

var _reactRedux = require("react-redux");

var _reactIntl = require("react-intl");

var _fixedDataTable = require("fixed-data-table-2");

var _classnames = _interopRequireDefault(require("classnames"));

var _reactIcons = require("@opuscapita/react-icons");

var _reactSpinner = _interopRequireDefault(require("@opuscapita/react-spinner"));

var _reactCheckbox = _interopRequireDefault(require("@opuscapita/react-checkbox"));

require("fixed-data-table-2/dist/fixed-data-table.css");

var _responsiveFixedDataTable = _interopRequireDefault(require("./responsive-fixed-data-table.component"));

var _headerCell = _interopRequireDefault(require("./header-cell.component"));

var _actionBar = _interopRequireDefault(require("./action-bar.component"));

var _inlineEditControls = _interopRequireDefault(require("./inline-edit-controls.component"));

var _filteringControls = _interopRequireDefault(require("./filtering-controls.component"));

var _dropdownControls = _interopRequireDefault(require("./dropdown-controls.component"));

var datagridActions = _interopRequireWildcard(require("./datagrid.actions"));

var _cellTooltip = _interopRequireDefault(require("./cell-tooltip.component"));

var _columnSettings = _interopRequireDefault(require("./column-settings/column-settings.component"));

var _datagrid2 = require("./datagrid.props");

var _datagrid3 = require("./datagrid.constants");

var _pagination = _interopRequireDefault(require("./pagination.component"));

var _contextMenu = _interopRequireDefault(require("./context-menu.component"));

var _datagrid4 = _interopRequireDefault(require("./datagrid.utils"));

var _columnService = _interopRequireDefault(require("./column-service/column-service"));

require("./datagrid.component.scss");

var _dec, _class, _class2, _temp;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    language: _datagrid4["default"].getLanguage(GRID, state.user),
    region: _datagrid4["default"].getRegion(GRID, state.user),
    dateFormat: _datagrid4["default"].getDateFormat(GRID, state.user),
    thousandSeparator: _datagrid4["default"].getThousandSeparator(GRID, state.user),
    decimalSeparator: _datagrid4["default"].getDecimalSeparator(GRID, state.user),
    forceRefreshTimestamp: state.datagrid.get('forceRefresh', 0),
    // force re-render when changed
    focusType: state.datagrid.getIn([GRID.id, 'session', 'focusType'], (0, _immutable.Map)())
  };
};

var mapDispatchToProps = datagridActions;
var DataGrid = (_dec = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _pagination["default"])(_class = (0, _reactIntl.injectIntl)(_class = _dec(_class = (_temp = _class2 =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(DataGrid, _React$PureComponent);

  function DataGrid(_props) {
    var _this;

    _this = _React$PureComponent.call(this, _props) || this;

    _defineProperty(_assertThisInitialized(_this), "onDocumentClick", function () {
      if (_this.props.contextMenuItems) {
        _this.setState({
          contextMenuOpen: false
        });
      }

      document.removeEventListener('click', _this.onDocumentClick);
    });

    _defineProperty(_assertThisInitialized(_this), "onColumnResizeEndCallback", function (newColumnWidth, columnKey) {
      _this.props.resizeColumn(_this.props.grid, columnKey, newColumnWidth);
    });

    _defineProperty(_assertThisInitialized(_this), "onCellKeyDown", function (rowIndex, col, e, create) {
      if (create === void 0) {
        create = false;
      }

      if (_this.props.enableArrowNavigation) {
        var cellRefs = create ? _this.createCellRefs : _this.cellRefs;
        var arrowKeys = [_datagrid3.KEY_CODES.DOWN, _datagrid3.KEY_CODES.UP, _datagrid3.KEY_CODES.LEFT, _datagrid3.KEY_CODES.RIGHT];
        var _this$props = _this.props,
            columns = _this$props.columns,
            visibleColumns = _this$props.visibleColumns,
            grid = _this$props.grid,
            data = _this$props.data,
            onLastCellTabPress = _this$props.onLastCellTabPress;

        var gridColumns = _datagrid4["default"].visibleColumns(columns, visibleColumns);

        var getColumnKeyByIndex = function getColumnKeyByIndex(i) {
          return _datagrid4["default"].getColumnKey(gridColumns[i]);
        };

        var rowsSize = data.size;

        var columnKey = _datagrid4["default"].getColumnKey(col);

        var currentCell = cellRefs[grid.id + "_" + columnKey + "_" + rowIndex];
        var proxy = null;

        var isCursorAtStart = function isCursorAtStart() {
          if (currentCell.type !== 'text') return true;
          return currentCell.selectionStart === 0;
        };

        var isCursorAtEnd = function isCursorAtEnd() {
          if (currentCell.type !== 'text') return true;
          return currentCell.selectionEnd === currentCell.value.length;
        }; // If current cell holds a react-floating-select component


        if (currentCell && (currentCell.selectRef || typeof currentCell.select === 'object')) {
          proxy = currentCell;
          currentCell = _this.getSelectRef(proxy);
        } // Prevents up/down arrow from changing number field value


        if (arrowKeys.includes(e.keyCode) && currentCell.type === 'number') e.preventDefault();

        switch (e.keyCode) {
          case _datagrid3.KEY_CODES.ENTER:
          case _datagrid3.KEY_CODES.ESC:
            {
              if (create && e.keyCode === _datagrid3.KEY_CODES.ENTER) {
                _this.props.addNewItem(grid, _datagrid4["default"].getColumnDefaultValues(columns));

                _this.focusToCreateCell = true;
                break;
              }

              currentCell.select();
              break;
            }

          case _datagrid3.KEY_CODES.DOWN:
            {
              var nextElement = cellRefs[grid.id + "_" + columnKey + "_" + (rowIndex + 1)]; // Prevents menu from opening

              if (proxy && proxy.selectRef && !proxy.selectRef.state.menuIsOpen) {
                e.preventDefault();
                if (!nextElement) break;
                nextElement = _this.getSelectRef(nextElement);
              }

              _this.moveCellFocus(nextElement, rowIndex + 1, -1);

              break;
            }

          case _datagrid3.KEY_CODES.UP:
            {
              var _nextElement = cellRefs[grid.id + "_" + columnKey + "_" + (rowIndex - 1)]; // Prevents menu from opening

              if (proxy && proxy.selectRef && !proxy.selectRef.state.menuIsOpen) {
                e.preventDefault();
                if (!_nextElement) break;
                _nextElement = _this.getSelectRef(_nextElement);
              }

              _this.moveCellFocus(_nextElement, rowIndex - 1, -1);

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

                  _nextElement2 = cellRefs[grid.id + "_" + getColumnKeyByIndex(columnInd) + "_" + rowInd]; // If we cannot focus on the next element while moving to the right

                  if (!_nextElement2 && e.keyCode !== _datagrid3.KEY_CODES.LEFT) {
                    // If we're not yet in the last focusable column
                    if (columnInd <= gridColumns.length) {
                      while (columnInd <= gridColumns.length && !_nextElement2) {
                        _nextElement2 = cellRefs[grid.id + "_" + getColumnKeyByIndex(columnInd) + "_" + rowInd];
                        columnInd += 1; // If we are in the last column and we don't have an element to focus on,
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
                          _nextElement2 = cellRefs[grid.id + "_" + getColumnKeyByIndex(columnInd) + "_" + rowInd];
                        }
                      }
                    } // If we cannot focus on the next element while moving to the left

                  } else if (!_nextElement2 && e.keyCode === _datagrid3.KEY_CODES.LEFT) {
                    while (columnInd > 0 && !_nextElement2) {
                      columnInd -= 1;
                      _nextElement2 = cellRefs[grid.id + "_" + getColumnKeyByIndex(columnInd) + "_" + rowInd];
                    } // if no element was found, try moving to previous row
                    // (needed in case first column is not editable e.g. an ExtraColumn)


                    if (rowInd > 0 && !_nextElement2) {
                      columnInd = gridColumns.length - 1;
                      rowInd -= 1;
                      _nextElement2 = cellRefs[grid.id + "_" + getColumnKeyByIndex(columnInd) + "_" + rowInd];
                    }
                  }

                  disabled = _nextElement2 ? _nextElement2.disabled : false;
                }

                if (!disabled && _nextElement2) {
                  if (typeof _nextElement2.select === 'object' || _nextElement2.selectRef) {
                    _nextElement2 = _this.getSelectRef(_nextElement2);
                  }

                  _this.moveCellFocus(_nextElement2, rowInd, columnInd);
                }
              }

              break;
            }

          default:
            break;
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onEditCellKeyDown", function (rowIndex, col) {
      return function (e) {
        _this.onCellKeyDown(rowIndex, col, e);
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onCreateCellKeyDown", function (rowIndex, col) {
      return function (e) {
        _this.onCellKeyDown(rowIndex, col, e, true);
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onFilterCellValueChange", function (col, valueParser) {
      return function (eventOrData) {
        var rawValue; // eventOrData can be input onChange event, react-select onChange or react-day-picker onChange

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

        _this.props.filterCellValueChange(_this.props.grid, _this.props.columns, col, value);
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onFilterCellMultiValueBlur", function (col) {
      return function () {
        var columnKey = _datagrid4["default"].getColumnKey(col);

        var _this$props2 = _this.props,
            columns = _this$props2.columns,
            filterCellValueChange = _this$props2.filterCellValueChange,
            grid = _this$props2.grid;
        var selectedFilters = _this.state[columnKey];

        if (selectedFilters) {
          var _this$setState;

          filterCellValueChange(grid, columns, col, selectedFilters);

          _this.setState((_this$setState = {}, _this$setState[columnKey] = undefined, _this$setState));
        }
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onFilterCellMultiValueChange", function (col, valueParser) {
      return function (data) {
        if (data === void 0) {
          data = [];
        }

        // data is input of react-select onChange
        var columnKey = _datagrid4["default"].getColumnKey(col);

        var selectedFilters = _this.state[columnKey];

        if (!selectedFilters && data.length === 0) {
          // ends up here in case of clear button
          var _this$props3 = _this.props,
              columns = _this$props3.columns,
              filterCellValueChange = _this$props3.filterCellValueChange,
              grid = _this$props3.grid;
          filterCellValueChange(grid, columns, col, data);
        } else {
          var _this$setState2;

          var value = valueParser(data);

          _this.setState((_this$setState2 = {}, _this$setState2[columnKey] = value, _this$setState2));
        }
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onCreateCellValueChange", function (rowIndex, col, valueParser) {
      return function (eventOrData) {
        var _this$props4 = _this.props,
            createCellValueChange = _this$props4.createCellValueChange,
            grid = _this$props4.grid;
        var rawValue; // eventOrData can be input onChange event, react-select onChange or react-day-picker onChange

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
        var componentType = col.componentType;

        switch (componentType) {
          case 'currency':
          case 'float':
          case 'number':
          case 'text':
            {
              break;
            }

          default:
            {
              createCellValueChange(grid, rowIndex, col.valueKeyPath, value);
              break;
            }
        }

        if (col.onCreateValueChange) {
          col.onCreateValueChange(value, col.valueKeyPath, rowIndex);
        }

        if (col.onValueMatchChangeValue && value === col.onValueMatchChangeValue.matchValue) {
          // Call special paired value change on other cell if value matches
          _this.onCreateCellValueChange(rowIndex, {
            valueKeyPath: col.onValueMatchChangeValue.newValueKeyPath
          }, function (v) {
            return v;
          })(col.onValueMatchChangeValue.newValue);
        }

        if (col.validators) {
          _this.props.createCellValueValidate(_this.props.grid, rowIndex, col.valueKeyPath, value, col.validators);
        }
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onEditCellValueChange", function (rowIndex, col, valueParser) {
      return function (eventOrData) {
        var _this$props5 = _this.props,
            editCellValueChange = _this$props5.editCellValueChange,
            grid = _this$props5.grid;

        var dataId = _this.getDataIdByRowIndex(rowIndex);

        var rawValue; // eventOrData can be input onChange event, react-select onChange or react-day-picker onChange

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
        var componentType = col.componentType;

        switch (componentType) {
          case 'currency':
          case 'float':
          case 'number':
          case 'text':
            {
              break;
            }

          default:
            {
              editCellValueChange(grid, dataId, col.valueKeyPath, value);
              break;
            }
        }

        if (col.onEditValueChange) {
          col.onEditValueChange(value, col.valueKeyPath, rowIndex, dataId);
        }

        if (col.onValueMatchChangeValue && value === col.onValueMatchChangeValue.matchValue) {
          // Call special paired value change on other cell if value matches
          _this.onEditCellValueChange(rowIndex, {
            valueKeyPath: col.onValueMatchChangeValue.newValueKeyPath
          }, function (v) {
            return v;
          })(col.onValueMatchChangeValue.newValue);
        }

        if (col.validators) {
          _this.props.editCellValueValidate(_this.props.grid, dataId, col.valueKeyPath, value, col.validators);
        }
      };
    });

    _defineProperty(_assertThisInitialized(_this), "getRegEx", function (separator) {
      return separator ? new RegExp("\\" + separator, 'g') : new RegExp('\\s', 'g');
    });

    _defineProperty(_assertThisInitialized(_this), "onCreateCellBlur", function (rowIndex, col, valueParser) {
      return function (eventOrData) {
        var _this$props6 = _this.props,
            decimalSeparator = _this$props6.decimalSeparator,
            createCellValueChange = _this$props6.createCellValueChange,
            grid = _this$props6.grid,
            thousandSeparator = _this$props6.thousandSeparator;
        var componentType = col.componentType;
        var value; // eventOrData can be formatted-input, react-select, react-checkbox or react-day-picker
        // onChange event

        if (eventOrData !== undefined) {
          if (eventOrData && eventOrData.target && eventOrData.target.value !== undefined) {
            value = eventOrData.target.value;
          } else if (eventOrData.value !== undefined) {
            value = eventOrData.value;
          } else {
            value = eventOrData;
          }
        } else {
          value = _this.getEditItemValue(rowIndex, col);
        }

        switch (componentType) {
          case 'currency':
            {
              var numericValue = value ? Number(value.replace(_this.getRegEx(col.valueOptions && col.valueOptions.thousandSeparator || thousandSeparator), '').replace(_this.getRegEx(col.valueOptions && col.valueOptions.decimalSeparator || decimalSeparator), '.')) : value;

              if (numericValue !== _this.getEditItemValue(rowIndex, col)) {
                createCellValueChange(grid, rowIndex, col.valueKeyPath, numericValue);
              }

              break;
            }

          case 'float':
          case 'number':
          case 'text':
            {
              if (value !== _this.getEditItemValue(rowIndex, col)) {
                createCellValueChange(grid, rowIndex, col.valueKeyPath, value);
              }

              break;
            }

          default:
            {
              break;
            }
        }

        if (col.onCreateBlur) {
          if (valueParser !== undefined) {
            value = valueParser(value);
          }

          col.onCreateBlur(value, rowIndex);
        }
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onEditCellBlur", function (rowIndex, col, valueParser) {
      return function (eventOrData) {
        var _this$props7 = _this.props,
            decimalSeparator = _this$props7.decimalSeparator,
            editCellValueChange = _this$props7.editCellValueChange,
            grid = _this$props7.grid,
            thousandSeparator = _this$props7.thousandSeparator;
        var componentType = col.componentType;

        var dataId = _this.getDataIdByRowIndex(rowIndex);

        var value; // eventOrData can be formatted-input, react-select, react-checkbox or react-day-picker
        // onChange event

        if (eventOrData !== undefined) {
          if (eventOrData && eventOrData.target && eventOrData.target.value !== undefined) {
            value = eventOrData.target.value;
          } else if (eventOrData.value !== undefined) {
            value = eventOrData.value;
          } else {
            value = eventOrData;
          }
        } else {
          value = _this.getEditItemValue(rowIndex, col);
        }

        switch (componentType) {
          case 'currency':
            {
              var numericValue = value ? Number(value.replace(_this.getRegEx(col.valueOptions && col.valueOptions.thousandSeparator || thousandSeparator), '').replace(_this.getRegEx(col.valueOptions && col.valueOptions.decimalSeparator || decimalSeparator), '.')) : value;

              if (numericValue !== _this.getEditItemValue(rowIndex, col)) {
                editCellValueChange(grid, dataId, col.valueKeyPath, numericValue);
              }

              break;
            }

          case 'float':
          case 'number':
          case 'text':
            {
              if (value !== _this.getEditItemValue(rowIndex, col)) {
                editCellValueChange(grid, dataId, col.valueKeyPath, value);
              }

              break;
            }

          default:
            {
              break;
            }
        }

        if (col.onEditBlur) {
          if (valueParser !== undefined) {
            value = valueParser(value);
          }

          col.onEditBlur(value, rowIndex, dataId);
        }
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onCellFocus", function (cellType, inputType, rowIndex, columnKey) {
      return function (e) {
        var _this$props8 = _this.props,
            cellSelectionChange = _this$props8.cellSelectionChange,
            cellSelect = _this$props8.cellSelect,
            grid = _this$props8.grid,
            isEditing = _this$props8.isEditing;
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
    });

    _defineProperty(_assertThisInitialized(_this), "getSelectRef", function (component) {
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
    });

    _defineProperty(_assertThisInitialized(_this), "getDataIdByRowIndex", function (rowIndex) {
      return _this.props.data.getIn([rowIndex].concat(_this.props.grid.idKeyPath));
    });

    _defineProperty(_assertThisInitialized(_this), "getSelectedItemIndex", function (id) {
      if (!id) return undefined;

      var index = _this.props.data.findIndex(function (v) {
        return v.getIn(_this.props.grid.idKeyPath) === id;
      });

      return index === -1 ? undefined : index;
    });

    _defineProperty(_assertThisInitialized(_this), "getEditItemValue", function (rowIndex, col, options) {
      if (options === void 0) {
        options = [];
      }

      // Get the value to display in edit cell
      var id = _this.getDataIdByRowIndex(rowIndex);

      var editValue = _this.props.editData.getIn([id].concat(col.valueKeyPath), undefined);

      var originalValue;

      if (editValue === undefined) {
        originalValue = _this.props.data.getIn([rowIndex].concat(col.valueKeyPath), '');
      } else if (editValue === null) {
        return '';
      } else {
        // Value is found from editData
        // Format by type
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
      } // Return value from original data, because editData is not available
      // Format by component type


      switch (col.componentType) {
        case 'float':
          {
            if (String(originalValue).length > 0) {
              return String(originalValue).replace('.', _this.props.decimalSeparator);
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
    });

    _defineProperty(_assertThisInitialized(_this), "getCreateItemValue", function (rowIndex, col, options) {
      if (options === void 0) {
        options = [];
      }

      var val = _this.props.createData.getIn([rowIndex].concat(col.valueKeyPath), '');

      if (val === null) {
        return '';
      }

      if (col.componentType === 'select' || col.componentType === 'multiselect') {
        return options.selectOptions.find(function (obj) {
          return obj.value === val;
        });
      }

      if (['boolean'].includes(col.componentType)) {
        return options.find(function (obj) {
          return obj.value === val;
        });
      }

      return val;
    });

    _defineProperty(_assertThisInitialized(_this), "getFilterItemValue", function (col, options) {
      if (options === void 0) {
        options = [];
      }

      var val = _this.props.filterData.get(_datagrid4["default"].getColumnKey(col), '');

      if (val === null) {
        return '';
      }

      if (col.componentType === 'select') {
        return options.selectOptions.find(function (obj) {
          return obj.value === val;
        });
      }

      if (['checkbox', 'boolean'].includes(col.componentType)) {
        return options.find(function (obj) {
          return obj.value === val;
        });
      }

      return val;
    });

    _defineProperty(_assertThisInitialized(_this), "getFilterItemMultiValue", function (col) {
      var columnKey = _datagrid4["default"].getColumnKey(col);

      var filterData = _this.props.filterData;
      var data = _this.state[columnKey];
      var val = data || filterData.get(columnKey, ''); // session storage content is converted to immutable and multiselect
      // filters is then list otherwise array

      return val && val.toJS ? val.toJS() : val || [];
    });

    _defineProperty(_assertThisInitialized(_this), "getComponentDisabledState", function (rowIndex, col, mode) {
      var componentDisabled = !!col.disableEditing; // check if component is disabled by other column data

      if (!componentDisabled && col.disableEditingOnValueMatch) {
        if (mode === 'create') {
          componentDisabled = _this.getCreateItemValue(rowIndex, {
            valueKeyPath: col.disableEditingOnValueMatch.matchValueKeyPath
          }) === col.disableEditingOnValueMatch.matchValue;
        } else {
          componentDisabled = _this.getEditItemValue(rowIndex, {
            valueKeyPath: col.disableEditingOnValueMatch.matchValueKeyPath
          }) === col.disableEditingOnValueMatch.matchValue;
        }
      }

      return componentDisabled;
    });

    _defineProperty(_assertThisInitialized(_this), "getRowClassName", function (rowIndex) {
      var _this$props9 = _this.props,
          grid = _this$props9.grid,
          isCreating = _this$props9.isCreating,
          isEditing = _this$props9.isEditing,
          createData = _this$props9.createData,
          selectedItems = _this$props9.selectedItems,
          data = _this$props9.data;
      var rowClassNames = ['oc-datagrid-row'];
      var extraRowCount = 0; // how many rows to ignore from top, new + filter rows

      if (isCreating) extraRowCount = createData.size;

      if (isCreating) {
        if (rowIndex <= extraRowCount - 1) {
          rowClassNames.push('oc-datagrid-row-new');
        }
      } else if (isEditing) {
        rowClassNames.push('oc-datagrid-row-edit');
      } // check if row is selected


      if (!isCreating && !isEditing && selectedItems && grid.idKeyPath) {
        if (selectedItems.indexOf(data.getIn([rowIndex - extraRowCount].concat(grid.idKeyPath))) !== -1) {
          rowClassNames.push('is-selected');
        }
      }

      if (_this.props.rowClassNameGetter) {
        return rowClassNames.join(' ') + ' ' + _this.props.rowClassNameGetter(rowIndex);
      }

      return rowClassNames.join(' ');
    });

    _defineProperty(_assertThisInitialized(_this), "getCellMessages", function (rowIndex, col, cellType) {
      var returnData = {};

      if (!_this.props.grid.idKeyPath || !col.valueKeyPath) {
        return returnData;
      }

      var infoMessage;
      var errorMessage;
      var warningMessage;

      if (cellType === 'create') {
        infoMessage = _this.props.createCellMessages.getIn(['info', rowIndex].concat(col.valueKeyPath));
        errorMessage = _this.props.createCellMessages.getIn(['error', rowIndex].concat(col.valueKeyPath));
        warningMessage = _this.props.createCellMessages.getIn(['warning', rowIndex].concat(col.valueKeyPath));
      } else {
        var id = _this.getDataIdByRowIndex(rowIndex);

        infoMessage = _this.props.cellMessages.getIn(['info', id].concat(col.valueKeyPath));
        errorMessage = _this.props.cellMessages.getIn(['error', id].concat(col.valueKeyPath));
        warningMessage = _this.props.cellMessages.getIn(['warning', id].concat(col.valueKeyPath));
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
    });

    _defineProperty(_assertThisInitialized(_this), "getScrollToRow", function () {
      var scrollToRow;
      if (_this.props.isCreating && !_this.focusToCreateCell) return scrollToRow;

      if (_this.focusToCreateCell) {
        var scrollNewRow = _this.props.createData.size - 1;

        if (scrollNewRow >= 0) {
          scrollToRow = scrollNewRow;
        }
      } else {
        if (_this.props.isEditing && !_this.props.scrollInEditMode) {
          scrollToRow = _this.state.currentRow;
        } else {
          scrollToRow = _this.props.scrollToRow; // eslint-disable-line
        }

        if (scrollToRow === undefined && _this.props.selectedItems.size > 0) {
          scrollToRow = _this.getSelectedItemIndex(_this.props.selectedItems.first());
        }
      }

      return scrollToRow;
    });

    _defineProperty(_assertThisInitialized(_this), "setFocusTo", function (focusTo) {
      if (_this.props.isEditing || _this.props.isCreating) {
        if (focusTo && focusTo.get('type') && focusTo !== _this.prevFocusTo) {
          _this[focusTo.get('type')] = true;
          _this.focusToLastRow = focusTo.get('focusToLastRow');
          _this.prevFocusTo = focusTo;
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleCellSelect", function (cellType, rowIndex, columnKey) {
      return function () {
        if (cellType === 'view' && _this.props.cellSelect) {
          _this.props.cellSelectionChange(_this.props.grid, (0, _immutable.Map)({
            rowIndex: rowIndex,
            columnKey: columnKey
          }));
        }
      };
    });

    _defineProperty(_assertThisInitialized(_this), "handleCreateCellRef", function (rowIndex, col) {
      return function (ref) {
        // Focus to create cell
        var columnKey = _datagrid4["default"].getColumnKey(col);

        var selectRef = !ref || ref.focus ? ref : _this.getSelectRef(ref);

        if (_this.props.createData.size && _this.props.createData.size === rowIndex + 1 && _this.focusToCreateCell && !_this.getComponentDisabledState(rowIndex, col, 'create') && selectRef) {
          selectRef.focus();
          _this.focusToCreateCell = false;
        }

        if (_this.props.enableArrowNavigation) {
          _this.createCellRefs[_this.props.grid.id + "_" + columnKey + "_" + rowIndex] = ref;
        }
      };
    });

    _defineProperty(_assertThisInitialized(_this), "handleEditCellRef", function (rowIndex, col) {
      return function (ref) {
        var columnKey = _datagrid4["default"].getColumnKey(col);

        if (_this.focusToEditCell && !_this.getComponentDisabledState(rowIndex, col, 'edit')) {
          var selectedRowIndex = _this.focusToLastRow && _this.props.data.size > 0 ? _this.props.data.size - 1 : _this.getSelectedItemIndex(_this.props.selectedItems.first());
          var selectedCell = _this.props.selectedCell;
          var selectRef = !ref || ref.focus ? ref : _this.getSelectRef(ref);

          if (selectedCell.size > 0) {
            if (selectedCell.get('rowIndex') === rowIndex && selectedCell.get('columnKey') === columnKey && selectRef) {
              selectRef.focus();
              _this.focusToEditCell = false;
              _this.focusToLastRow = false;
            }
          } else if (selectedRowIndex === undefined) {
            _this.focusToEditCell = false;
            _this.focusToLastRow = false;
          } else if (selectedRowIndex === rowIndex && selectRef) {
            selectRef.focus();
            _this.focusToEditCell = false;
            _this.focusToLastRow = false;
          }
        }

        if (_this.props.enableArrowNavigation) {
          _this.cellRefs[_this.props.grid.id + "_" + columnKey + "_" + rowIndex] = ref;
        }
      };
    });

    _defineProperty(_assertThisInitialized(_this), "moveCellFocus", function (nextElement, rowIndex, columnIndex) {
      var elementTypes = ['text', 'checkbox'];

      if (nextElement && elementTypes.includes(nextElement.type)) {
        if (rowIndex !== -1 || columnIndex !== -1) {
          _this.setState({
            currentColumn: columnIndex,
            currentRow: rowIndex
          });
        }

        setTimeout(function () {
          if (nextElement.type === 'checkbox') nextElement.focus();
          if (nextElement.type === 'text') nextElement.select();
        }, 50);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleSelectAllCheckBoxOnChange", function () {
      _this.props.selectAllItemsChange(_this.props.grid);
    });

    _defineProperty(_assertThisInitialized(_this), "handleSelectionCheckBoxOnChange", function (rowIndex) {
      return function () {
        _this.props.itemSelectionChange(_this.props.grid, rowIndex, true, false);
      };
    });

    _defineProperty(_assertThisInitialized(_this), "generateColumns", function () {
      var _this$props10 = _this.props,
          data = _this$props10.data,
          selectedItems = _this$props10.selectedItems,
          dateFormat = _this$props10.dateFormat,
          thousandSeparator = _this$props10.thousandSeparator,
          decimalSeparator = _this$props10.decimalSeparator,
          grid = _this$props10.grid,
          inlineEdit = _this$props10.inlineEdit,
          filtering = _this$props10.filtering,
          region = _this$props10.region,
          intl = _this$props10.intl,
          selectComponentOptions = _this$props10.selectComponentOptions,
          isCreating = _this$props10.isCreating,
          extraColumn = _this$props10.extraColumn,
          rowSelectCheckboxColumn = _this$props10.rowSelectCheckboxColumn,
          showSelectAllCheckbox = _this$props10.showSelectAllCheckbox;
      var columns = [];
      var tabIndex = String(_this.props.tabIndex);

      if (extraColumn) {
        columns.push({
          width: extraColumn.width || 40,
          isResizable: !!extraColumn.isResizable,
          isSortable: false,
          columnKey: 'extraColumn',
          cell: function cell(rowIndex) {
            return _react["default"].createElement("div", {
              className: "oc-datagrid-extra-column-cell no-row-select"
            }, extraColumn.valueRender(data.get(rowIndex), rowIndex));
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
          header: showSelectAllCheckbox && _react["default"].createElement(_reactCheckbox["default"], {
            id: "ocDatagridSelectAllCheckBox-" + grid.id,
            className: "oc-datagrid-select-all-checkbox-cell no-row-select",
            checked: data.size !== 0 && data.size === selectedItems.size,
            onChange: _this.handleSelectAllCheckBoxOnChange,
            tabIndex: tabIndex
          }),
          cell: function cell(rowIndex) {
            var rowItem = data.get(rowIndex);
            var itemId = rowItem.getIn(grid.idKeyPath);
            var selected = selectedItems.includes(itemId);
            return _react["default"].createElement(_reactCheckbox["default"], {
              id: "ocDatagridSelectCheckBox-" + _this.props.grid.id + "-" + rowIndex,
              className: "oc-datagrid-select-checkbox-cell no-row-select",
              checked: selected,
              onChange: _this.handleSelectionCheckBoxOnChange(rowIndex),
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

      _this.props.visibleColumns.forEach(function (visibleColumnKey) {
        _this.props.columns.forEach(function (orgCol) {
          if (_datagrid4["default"].getColumnKey(orgCol) === visibleColumnKey) {
            visibleColumns.push(orgCol);
          }
        });
      });

      visibleColumns.forEach(function (col) {
        var valueEmptyChecker = _datagrid4["default"].getValueEmptyChecker(col); // Cell value rendering


        var valueRender = function valueRender(rowIndex, format) {
          var val = data.getIn([rowIndex].concat(col.valueKeyPath));

          if (valueEmptyChecker(val)) {
            return col.isRequired ? _react["default"].createElement(_reactIntl.FormattedMessage, {
              id: "Grid.ValueIsMissing"
            }) : '';
          }

          return format ? format(val) : val;
        };

        var column = _columnService["default"].baseColumn(col); // Collect column functions into one Object


        var columnFunctions = {
          edit: {
            getItemValue: _this.getEditItemValue,
            onCellValueChange: _this.onEditCellValueChange,
            onCellBlur: _this.onEditCellBlur,
            onCellFocus: _this.onCellFocus,
            onCellKeyDown: _this.onEditCellKeyDown,
            handleCellRef: _this.handleEditCellRef
          },
          create: {
            getItemValue: _this.getCreateItemValue,
            onCellValueChange: _this.onCreateCellValueChange,
            onCellBlur: _this.onCreateCellBlur,
            onCellFocus: _this.onCellFocus,
            onCellKeyDown: _this.onCreateCellKeyDown,
            handleCellRef: _this.handleCreateCellRef
          },
          filter: {
            getItemValue: _this.getFilterItemValue,
            getItemMultiValue: _this.getFilterItemMultiValue,
            onCellValueChange: _this.onFilterCellValueChange,
            onCellMultiValueBlur: _this.onFilterCellMultiValueBlur,
            onCellMultiValueChange: _this.onFilterCellMultiValueChange
          }
        }; // handle column.cell / column.cellEdit / column.cellCreate / column.cellFilter

        var cellProps = {
          grid: grid,
          data: data,
          dateFormat: dateFormat,
          thousandSeparator: thousandSeparator,
          decimalSeparator: decimalSeparator,
          selectComponentOptions: selectComponentOptions
        }; // eslint-disable-line

        column = _columnService["default"].columnCell(column, cellProps, col, valueRender); // handle columnComponentTypes

        var componentTypeProps = _extends({}, cellProps, {
          inlineEdit: inlineEdit,
          filtering: filtering,
          region: region,
          intl: intl,
          selectComponentOptions: selectComponentOptions
        }); // eslint-disable-line


        column = _columnService["default"].columnComponentType(column, tabIndex, componentTypeProps, col, columnFunctions, _this.getComponentDisabledState);
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
            return _react["default"].createElement(_reactIcons.Icon, {
              id: "oc-datagrid-new-item-remove-" + grid.id + "-" + rowIndex,
              type: "indicator",
              name: "delete",
              width: 30,
              height: 30,
              style: {
                padding: '7px'
              },
              onClick: function onClick() {
                return _this.props.removeNewItem(grid, rowIndex);
              }
            });
          },
          cellFilter: function cellFilter() {
            return null;
          }
        });
      }

      return columns;
    });

    _defineProperty(_assertThisInitialized(_this), "isCellEdited", function (rowIndex, col, cellType) {
      if (cellType !== 'edit') {
        return false;
      }

      var id = _this.getDataIdByRowIndex(rowIndex);

      return !!_this.props.editData.getIn([id].concat(col.valueKeyPath));
    });

    _defineProperty(_assertThisInitialized(_this), "handleAfterAddItem", function () {
      _this.focusToCreateCell = true;
    });

    _defineProperty(_assertThisInitialized(_this), "handleAfterEditPress", function () {
      if (_this.props.selectedItems.size) {
        _this.focusToEditCell = true;

        _this.setState({
          currentRow: undefined
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleAfterValidationError", function () {
      _this.focusToErrorCell = true;
    });

    _defineProperty(_assertThisInitialized(_this), "handleRowClick", function (e, rowIndex) {
      if (_this.props.rowSelect && !_this.props.isCreating && !_this.props.isEditing) {
        if (e.ctrlKey || e.shiftKey) {
          document.getSelection().removeAllRanges();
        } // Don't trigger selection change on when user clicks on special cells like checkbox/extra
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
          _this.props.itemSelectionChange(_this.props.grid, rowIndex, _this.props.multiSelect && e.ctrlKey, _this.props.multiSelect && e.shiftKey);
        }
      }

      if (_this.props.onRowClick) {
        _this.props.onRowClick(e, rowIndex, _this.props.data.get(rowIndex));
      }

      return true;
    });

    _defineProperty(_assertThisInitialized(_this), "handleContextMenu", function (e, rowIndex) {
      if (_this.props.contextMenuItems) {
        var _this$props11 = _this.props,
            itemSelectionChange = _this$props11.itemSelectionChange,
            selectedItems = _this$props11.selectedItems,
            grid = _this$props11.grid,
            data = _this$props11.data;
        e.preventDefault();
        e.stopPropagation();

        _this.setState({
          contextMenuOpen: true,
          contextMenuX: e.clientX,
          contextMenuY: e.clientY
        }); // If clicked item is not selected, change selection to it


        if (!selectedItems.includes(data.getIn([rowIndex].concat(grid.idKeyPath)))) {
          itemSelectionChange(grid, rowIndex);
        }

        document.addEventListener('click', _this.onDocumentClick);
        return false;
      }

      return true;
    });

    _defineProperty(_assertThisInitialized(_this), "handleRowHeightGetter", function (rowIndex) {
      return _this.props.rowHeightGetter(_this.props.data.get(rowIndex), rowIndex);
    });

    _defineProperty(_assertThisInitialized(_this), "renderCell", function (col) {
      return function (cellProps) {
        var _this$props12 = _this.props,
            isCreating = _this$props12.isCreating,
            isEditing = _this$props12.isEditing,
            createData = _this$props12.createData,
            selectedCell = _this$props12.selectedCell,
            grid = _this$props12.grid;

        var rowIndex = cellProps.rowIndex,
            props = _objectWithoutPropertiesLoose(cellProps, ["rowIndex"]);

        var cell;
        var cellType = 'view';
        var extraRowCount = 0; // how many rows to ignore from top, new + filter rows

        if (isCreating) extraRowCount = createData.size;
        var existingRowsIndex = rowIndex - extraRowCount;

        if (isCreating) {
          if (rowIndex <= extraRowCount - 1) {
            if (col.cellCreate) {
              cell = col.cellCreate(rowIndex, _this.handleCreateCellRef(rowIndex, col), _this.onCreateCellKeyDown(rowIndex, col));
              cellType = 'create';
            } else {
              cell = null;
              cellType = null;
            }
          } else {
            cell = col.cell(existingRowsIndex, _this.handleCreateCellRef(existingRowsIndex, col), _this.onCreateCellKeyDown(existingRowsIndex, col));
          }
        } else if (isEditing && col.cellEdit) {
          cell = col.cellEdit(existingRowsIndex, _this.handleEditCellRef(existingRowsIndex, col), _this.onEditCellKeyDown(existingRowsIndex, col));
          cellType = 'edit';
        } else {
          cell = col.cell(existingRowsIndex, _this.handleEditCellRef(existingRowsIndex, col), _this.onEditCellKeyDown(existingRowsIndex, col));
        }

        var isSpecial = props.columnKey === 'selectionCheckbox' || props.columnKey === 'extraColumn';

        if ((cellType === 'view' || cellType === 'edit' || cellType === 'create') && !isSpecial) {
          var getRowIndex = cellType === 'create' ? rowIndex : rowIndex - extraRowCount;

          var messageData = _this.getCellMessages(getRowIndex, col, cellType);

          var isEdited = _this.isCellEdited(getRowIndex, col, cellType);

          var className = selectedCell.get('rowIndex') === rowIndex && selectedCell.get('columnKey') === props.columnKey ? 'oc-datagrid-cell is-selected' : 'oc-datagrid-cell';
          return _react["default"].createElement(_fixedDataTable.Cell, _extends({}, props, {
            className: className,
            style: col.style,
            onClick: _this.handleCellSelect(cellType, rowIndex, props.columnKey)
          }), _react["default"].createElement(_cellTooltip["default"], {
            id: "ocDatagridCell-" + grid.id + "-" + props.columnKey + "-" + rowIndex,
            isEdited: isEdited,
            isError: !!messageData.errorMessage,
            isWarning: !!messageData.warningMessage,
            infoMessage: messageData.infoMessage,
            errorMessage: messageData.errorMessage,
            warningMessage: messageData.warningMessage
          }, cell));
        }

        return _react["default"].createElement(_fixedDataTable.Cell, _extends({}, props, {
          className: "oc-datagrid-cell",
          style: col.style
        }), cell);
      };
    });

    _defineProperty(_assertThisInitialized(_this), "renderColumns", function () {
      var _this$props13 = _this.props,
          allDataSize = _this$props13.allDataSize,
          grid = _this$props13.grid,
          isCreating = _this$props13.isCreating,
          isBusy = _this$props13.isBusy,
          visibleColumns = _this$props13.visibleColumns;

      if (!allDataSize && !isBusy && !isCreating && !grid.pagination) {
        return _react["default"].createElement(_fixedDataTable.Column, {
          columnKey: "dataEmptyColumn",
          header: _react["default"].createElement(_fixedDataTable.Cell, {
            style: {
              textAlign: 'center'
            }
          }, _react["default"].createElement(_reactIntl.FormattedMessage, {
            id: "Grid.NoItems"
          })),
          width: 10,
          isResizable: false,
          flexGrow: 1
        });
      }

      if (!visibleColumns.size) {
        if (isBusy) {
          return _react["default"].createElement(_fixedDataTable.Column, {
            columnKey: "dataEmptyColumn",
            header: _react["default"].createElement(_fixedDataTable.Cell, null, "\xA0"),
            width: 10,
            isResizable: false,
            flexGrow: 1
          });
        }

        return _react["default"].createElement(_fixedDataTable.Column, {
          columnKey: "dataEmptyColumn",
          header: _react["default"].createElement(_fixedDataTable.Cell, {
            style: {
              textAlign: 'center'
            }
          }, _react["default"].createElement(_reactIntl.FormattedMessage, {
            id: "Grid.NoColumns"
          })),
          width: 10,
          isResizable: false,
          flexGrow: 1
        });
      }

      var columns = _this.generateColumns();

      if (columns.lenght === 0) return null;
      return columns.map(function (col) {
        return _react["default"].createElement(_fixedDataTable.Column, {
          key: col.columnKey,
          columnKey: col.columnKey,
          header: _react["default"].createElement(_headerCell["default"], {
            id: "ocDatagridHeader-" + _this.props.grid.id + "-" + col.columnKey,
            grid: _this.props.grid,
            columns: _this.props.columns,
            column: col,
            currentSortColumn: _this.props.sortColumn,
            currentSortOrder: _this.props.sortOrder,
            onSortChange: _this.props.sortChange,
            isBusy: _this.props.isBusy,
            filtering: _this.props.filtering && _this.props.isFiltering,
            width: _this.props.columnWidths.get(col.columnKey, col.width)
          }, col.header),
          cell: _this.renderCell(col),
          width: _this.props.columnWidths.get(col.columnKey, col.width),
          minWidth: col.minWidth,
          maxWidth: col.maxWidth,
          isResizable: col.isResizable,
          flexGrow: col.flexGrow ? col.flexGrow : 0,
          fixed: col.fixed,
          fixedRight: col.fixedRight,
          allowCellsRecycling: col.allowCellsRecycling
        });
      });
    });

    _this.state = {
      currentRow: 0,
      currentColumn: 0,
      contextMenuOpen: false,
      contextMenuX: 0,
      contextMenuY: 0
    };
    _this.cellRefs = {};
    _this.createCellRefs = {};
    _this.focusToCreateCell = false;
    _this.focusToEditCell = false; // TODO: Handle focusing when true

    _this.focusToErrorCell = false; // TODO: Handle focusing when true

    return _this;
  }

  var _proto = DataGrid.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    document.removeEventListener('click', this.onDocumentClick);
    this.props.invalidate(this.props.grid);
  };

  _proto.render = function render() {
    var _classNames;

    var gridClassName = (0, _classnames["default"])((_classNames = {
      'oc-datagrid-container': true,
      'with-actionbar': this.props.inlineEdit && !this.props.disableActionBar,
      'is-busy': this.props.isBusy,
      'is-editing': this.props.isEditing,
      'is-creating': this.props.isCreating
    }, _classNames[this.props.className] = !!this.props.className, _classNames)); // check if there is a new request to change edit mode focus

    this.setFocusTo(this.props.focusType);
    var actionBar = null;
    var actionBarRight = null;
    var actionBarLeft = null;

    if ((this.props.actionBar || this.props.inlineEdit || this.props.filtering || this.props.removing) && !this.props.disableActionBar) {
      actionBarRight = _react["default"].createElement(_actionBar["default"], {
        position: "right"
      }, _react["default"].createElement("div", {
        className: "oc-datagrid-actionbar-right"
      }, this.props.actionBar), this.props.filtering && this.props.disableDropdown && !this.props.disableFilteringControls && _react["default"].createElement(_filteringControls["default"], this.props), this.props.inlineEdit && _react["default"].createElement(_inlineEditControls["default"], _extends({
        afterAddItem: this.handleAfterAddItem,
        afterEditPress: this.handleAfterEditPress,
        afterValidationError: this.handleAfterValidationError
      }, this.props)), (this.props.dropdownMenuItems || this.props.removing || this.props.columnSettings || this.props.filtering && !this.props.disableDropdown) && _react["default"].createElement(_dropdownControls["default"], this.props));
    }

    if (this.props.actionBarLeft || this.props.gridHeader) {
      actionBarLeft = _react["default"].createElement(_actionBar["default"], {
        position: "left"
      }, _react["default"].createElement("div", {
        className: "oc-datagrid-gridheader"
      }, this.props.gridHeader), _react["default"].createElement("div", {
        className: "oc-datagrid-actionbar-left"
      }, this.props.actionBarLeft));
    }

    if (actionBarLeft || actionBarRight) {
      actionBar = _react["default"].createElement("div", {
        className: "oc-datagrid-actionbar-container"
      }, actionBarLeft, actionBarRight);
    }

    var rowsCount = this.props.rowsCount || this.props.rowsCount === 0 ? this.props.rowsCount : this.props.data.size;
    if (this.props.isCreating) rowsCount += this.props.createData.size;
    if (!this.props.visibleColumns.size) rowsCount = 0;
    return _react["default"].createElement("div", {
      id: "oc-datagrid-" + this.props.grid.id,
      className: gridClassName,
      style: this.props.containerStyle
    }, this.props.isBusy && _react["default"].createElement(_reactSpinner["default"], null), this.state.contextMenuOpen && _react["default"].createElement(_contextMenu["default"], {
      x: this.state.contextMenuX,
      y: this.state.contextMenuY,
      isVisible: this.state.contextMenuOpen,
      contextMenuItems: this.props.contextMenuItems,
      data: this.props.data,
      grid: this.props.grid,
      selectedItems: this.props.selectedItems
    }), actionBar, _react["default"].createElement(_responsiveFixedDataTable["default"], _extends({}, this.props, {
      id: this.props.grid.id,
      rowsCount: rowsCount,
      headerHeight: this.props.filtering && this.props.isFiltering ? this.props.headerHeight + this.props.filterRowHeight : this.props.headerHeight,
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
    }), this.renderColumns()), this.props.isColumnSettingsModalOpen && _react["default"].createElement(_columnSettings["default"], {
      grid: this.props.grid,
      columns: this.props.columns,
      visibleColumns: this.props.visibleColumns,
      closeColumnSettingsModal: this.props.closeColumnSettingsModal,
      saveColumnSettings: this.props.saveColumnSettings
    }), this.props.children);
  };

  return DataGrid;
}(_react["default"].PureComponent), _defineProperty(_class2, "defaultProps", _datagrid2.defaultProps), _temp)) || _class) || _class) || _class);
var _default = DataGrid;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwib3duUHJvcHMiLCJHUklEIiwiZ3JpZCIsImlzQnVzeSIsImRhdGFncmlkIiwiZ2V0SW4iLCJpZCIsImlzRWRpdGluZyIsImlzQ3JlYXRpbmciLCJpc0ZpbHRlcmluZyIsImlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW4iLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwidmlzaWJsZUNvbHVtbnMiLCJjb2x1bW5XaWR0aHMiLCJzZWxlY3RlZENlbGwiLCJzZWxlY3RlZEl0ZW1zIiwiZGF0YSIsImVkaXREYXRhIiwiY3JlYXRlRGF0YSIsImZpbHRlckRhdGEiLCJjZWxsTWVzc2FnZXMiLCJjcmVhdGVDZWxsTWVzc2FnZXMiLCJhbGxEYXRhU2l6ZSIsInNpemUiLCJsYW5ndWFnZSIsIlV0aWxzIiwiZ2V0TGFuZ3VhZ2UiLCJ1c2VyIiwicmVnaW9uIiwiZ2V0UmVnaW9uIiwiZGF0ZUZvcm1hdCIsImdldERhdGVGb3JtYXQiLCJ0aG91c2FuZFNlcGFyYXRvciIsImdldFRob3VzYW5kU2VwYXJhdG9yIiwiZGVjaW1hbFNlcGFyYXRvciIsImdldERlY2ltYWxTZXBhcmF0b3IiLCJmb3JjZVJlZnJlc2hUaW1lc3RhbXAiLCJnZXQiLCJmb2N1c1R5cGUiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJkYXRhZ3JpZEFjdGlvbnMiLCJEYXRhR3JpZCIsInBhZ2luYXRpb24iLCJpbmplY3RJbnRsIiwicHJvcHMiLCJjb250ZXh0TWVudUl0ZW1zIiwic2V0U3RhdGUiLCJjb250ZXh0TWVudU9wZW4iLCJkb2N1bWVudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJvbkRvY3VtZW50Q2xpY2siLCJuZXdDb2x1bW5XaWR0aCIsImNvbHVtbktleSIsInJlc2l6ZUNvbHVtbiIsInJvd0luZGV4IiwiY29sIiwiZSIsImNyZWF0ZSIsImVuYWJsZUFycm93TmF2aWdhdGlvbiIsImNlbGxSZWZzIiwiY3JlYXRlQ2VsbFJlZnMiLCJhcnJvd0tleXMiLCJLRVlfQ09ERVMiLCJET1dOIiwiVVAiLCJMRUZUIiwiUklHSFQiLCJjb2x1bW5zIiwib25MYXN0Q2VsbFRhYlByZXNzIiwiZ3JpZENvbHVtbnMiLCJnZXRDb2x1bW5LZXlCeUluZGV4IiwiaSIsImdldENvbHVtbktleSIsInJvd3NTaXplIiwiY3VycmVudENlbGwiLCJwcm94eSIsImlzQ3Vyc29yQXRTdGFydCIsInR5cGUiLCJzZWxlY3Rpb25TdGFydCIsImlzQ3Vyc29yQXRFbmQiLCJzZWxlY3Rpb25FbmQiLCJ2YWx1ZSIsImxlbmd0aCIsInNlbGVjdFJlZiIsInNlbGVjdCIsImdldFNlbGVjdFJlZiIsImluY2x1ZGVzIiwia2V5Q29kZSIsInByZXZlbnREZWZhdWx0IiwiRU5URVIiLCJFU0MiLCJhZGROZXdJdGVtIiwiZ2V0Q29sdW1uRGVmYXVsdFZhbHVlcyIsImZvY3VzVG9DcmVhdGVDZWxsIiwibmV4dEVsZW1lbnQiLCJtZW51SXNPcGVuIiwibW92ZUNlbGxGb2N1cyIsIlRBQiIsImNvbHVtbkluZCIsImZpbmRJbmRleCIsImMiLCJ2YWx1ZUtleVBhdGgiLCJqb2luIiwiZGlzYWJsZWQiLCJyb3dJbmQiLCJzaGlmdEtleSIsIm9uQ2VsbEtleURvd24iLCJ2YWx1ZVBhcnNlciIsImV2ZW50T3JEYXRhIiwicmF3VmFsdWUiLCJ0YXJnZXQiLCJ1bmRlZmluZWQiLCJmaWx0ZXJDZWxsVmFsdWVDaGFuZ2UiLCJzZWxlY3RlZEZpbHRlcnMiLCJjcmVhdGVDZWxsVmFsdWVDaGFuZ2UiLCJjb21wb25lbnRUeXBlIiwib25DcmVhdGVWYWx1ZUNoYW5nZSIsIm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlIiwibWF0Y2hWYWx1ZSIsIm9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlIiwibmV3VmFsdWVLZXlQYXRoIiwidiIsIm5ld1ZhbHVlIiwidmFsaWRhdG9ycyIsImNyZWF0ZUNlbGxWYWx1ZVZhbGlkYXRlIiwiZWRpdENlbGxWYWx1ZUNoYW5nZSIsImRhdGFJZCIsImdldERhdGFJZEJ5Um93SW5kZXgiLCJvbkVkaXRWYWx1ZUNoYW5nZSIsIm9uRWRpdENlbGxWYWx1ZUNoYW5nZSIsImVkaXRDZWxsVmFsdWVWYWxpZGF0ZSIsInNlcGFyYXRvciIsIlJlZ0V4cCIsImdldEVkaXRJdGVtVmFsdWUiLCJudW1lcmljVmFsdWUiLCJOdW1iZXIiLCJyZXBsYWNlIiwiZ2V0UmVnRXgiLCJ2YWx1ZU9wdGlvbnMiLCJvbkNyZWF0ZUJsdXIiLCJvbkVkaXRCbHVyIiwiY2VsbFR5cGUiLCJpbnB1dFR5cGUiLCJjZWxsU2VsZWN0aW9uQ2hhbmdlIiwiY2VsbFNlbGVjdCIsImNvbXBvbmVudCIsImlucHV0UmVmIiwiaWRLZXlQYXRoIiwiaW5kZXgiLCJvcHRpb25zIiwiZWRpdFZhbHVlIiwib3JpZ2luYWxWYWx1ZSIsInNlbGVjdE9wdGlvbnMiLCJmaW5kIiwib2JqIiwiU3RyaW5nIiwidmFsIiwidG9KUyIsIm1vZGUiLCJjb21wb25lbnREaXNhYmxlZCIsImRpc2FibGVFZGl0aW5nIiwiZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2giLCJnZXRDcmVhdGVJdGVtVmFsdWUiLCJtYXRjaFZhbHVlS2V5UGF0aCIsInJvd0NsYXNzTmFtZXMiLCJleHRyYVJvd0NvdW50IiwicHVzaCIsImluZGV4T2YiLCJyb3dDbGFzc05hbWVHZXR0ZXIiLCJyZXR1cm5EYXRhIiwiaW5mb01lc3NhZ2UiLCJlcnJvck1lc3NhZ2UiLCJ3YXJuaW5nTWVzc2FnZSIsInNjcm9sbFRvUm93Iiwic2Nyb2xsTmV3Um93Iiwic2Nyb2xsSW5FZGl0TW9kZSIsImN1cnJlbnRSb3ciLCJnZXRTZWxlY3RlZEl0ZW1JbmRleCIsImZpcnN0IiwiZm9jdXNUbyIsInByZXZGb2N1c1RvIiwiZm9jdXNUb0xhc3RSb3ciLCJyZWYiLCJmb2N1cyIsImdldENvbXBvbmVudERpc2FibGVkU3RhdGUiLCJmb2N1c1RvRWRpdENlbGwiLCJzZWxlY3RlZFJvd0luZGV4IiwiY29sdW1uSW5kZXgiLCJlbGVtZW50VHlwZXMiLCJjdXJyZW50Q29sdW1uIiwic2V0VGltZW91dCIsInNlbGVjdEFsbEl0ZW1zQ2hhbmdlIiwiaXRlbVNlbGVjdGlvbkNoYW5nZSIsImlubGluZUVkaXQiLCJmaWx0ZXJpbmciLCJpbnRsIiwic2VsZWN0Q29tcG9uZW50T3B0aW9ucyIsImV4dHJhQ29sdW1uIiwicm93U2VsZWN0Q2hlY2tib3hDb2x1bW4iLCJzaG93U2VsZWN0QWxsQ2hlY2tib3giLCJ0YWJJbmRleCIsIndpZHRoIiwiaXNSZXNpemFibGUiLCJpc1NvcnRhYmxlIiwiY2VsbCIsInZhbHVlUmVuZGVyIiwiY2VsbEVkaXQiLCJjZWxsQ3JlYXRlIiwiY2VsbEZpbHRlciIsImhlYWRlciIsImhhbmRsZVNlbGVjdEFsbENoZWNrQm94T25DaGFuZ2UiLCJyb3dJdGVtIiwiaXRlbUlkIiwic2VsZWN0ZWQiLCJoYW5kbGVTZWxlY3Rpb25DaGVja0JveE9uQ2hhbmdlIiwiZm9yRWFjaCIsInZpc2libGVDb2x1bW5LZXkiLCJvcmdDb2wiLCJ2YWx1ZUVtcHR5Q2hlY2tlciIsImdldFZhbHVlRW1wdHlDaGVja2VyIiwiZm9ybWF0IiwiaXNSZXF1aXJlZCIsImNvbHVtbiIsIkdyaWRDb2x1bW5TZXJ2aWNlIiwiYmFzZUNvbHVtbiIsImNvbHVtbkZ1bmN0aW9ucyIsImVkaXQiLCJnZXRJdGVtVmFsdWUiLCJvbkNlbGxWYWx1ZUNoYW5nZSIsIm9uQ2VsbEJsdXIiLCJvbkVkaXRDZWxsQmx1ciIsIm9uQ2VsbEZvY3VzIiwib25FZGl0Q2VsbEtleURvd24iLCJoYW5kbGVDZWxsUmVmIiwiaGFuZGxlRWRpdENlbGxSZWYiLCJvbkNyZWF0ZUNlbGxCbHVyIiwib25DcmVhdGVDZWxsS2V5RG93biIsImhhbmRsZUNyZWF0ZUNlbGxSZWYiLCJmaWx0ZXIiLCJnZXRGaWx0ZXJJdGVtVmFsdWUiLCJnZXRJdGVtTXVsdGlWYWx1ZSIsImdldEZpbHRlckl0ZW1NdWx0aVZhbHVlIiwib25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UiLCJvbkNlbGxNdWx0aVZhbHVlQmx1ciIsIm9uRmlsdGVyQ2VsbE11bHRpVmFsdWVCbHVyIiwib25DZWxsTXVsdGlWYWx1ZUNoYW5nZSIsIm9uRmlsdGVyQ2VsbE11bHRpVmFsdWVDaGFuZ2UiLCJjZWxsUHJvcHMiLCJjb2x1bW5DZWxsIiwiY29tcG9uZW50VHlwZVByb3BzIiwiY29sdW1uQ29tcG9uZW50VHlwZSIsInBhZGRpbmciLCJyZW1vdmVOZXdJdGVtIiwiZm9jdXNUb0Vycm9yQ2VsbCIsInJvd1NlbGVjdCIsImN0cmxLZXkiLCJnZXRTZWxlY3Rpb24iLCJyZW1vdmVBbGxSYW5nZXMiLCJwYXJlbnROb2RlIiwicGFyZW50MWNsYXNzIiwiY2xhc3NOYW1lIiwicGFyZW50MmNsYXNzIiwicGFyZW50M2NsYXNzIiwicGFyZW50NGNsYXNzIiwibXVsdGlTZWxlY3QiLCJvblJvd0NsaWNrIiwic3RvcFByb3BhZ2F0aW9uIiwiY29udGV4dE1lbnVYIiwiY2xpZW50WCIsImNvbnRleHRNZW51WSIsImNsaWVudFkiLCJhZGRFdmVudExpc3RlbmVyIiwicm93SGVpZ2h0R2V0dGVyIiwiZXhpc3RpbmdSb3dzSW5kZXgiLCJpc1NwZWNpYWwiLCJnZXRSb3dJbmRleCIsIm1lc3NhZ2VEYXRhIiwiZ2V0Q2VsbE1lc3NhZ2VzIiwiaXNFZGl0ZWQiLCJpc0NlbGxFZGl0ZWQiLCJzdHlsZSIsImhhbmRsZUNlbGxTZWxlY3QiLCJ0ZXh0QWxpZ24iLCJnZW5lcmF0ZUNvbHVtbnMiLCJsZW5naHQiLCJtYXAiLCJzb3J0Q2hhbmdlIiwicmVuZGVyQ2VsbCIsIm1pbldpZHRoIiwibWF4V2lkdGgiLCJmbGV4R3JvdyIsImZpeGVkIiwiZml4ZWRSaWdodCIsImFsbG93Q2VsbHNSZWN5Y2xpbmciLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImludmFsaWRhdGUiLCJyZW5kZXIiLCJncmlkQ2xhc3NOYW1lIiwiZGlzYWJsZUFjdGlvbkJhciIsInNldEZvY3VzVG8iLCJhY3Rpb25CYXIiLCJhY3Rpb25CYXJSaWdodCIsImFjdGlvbkJhckxlZnQiLCJyZW1vdmluZyIsImRpc2FibGVEcm9wZG93biIsImRpc2FibGVGaWx0ZXJpbmdDb250cm9scyIsImhhbmRsZUFmdGVyQWRkSXRlbSIsImhhbmRsZUFmdGVyRWRpdFByZXNzIiwiaGFuZGxlQWZ0ZXJWYWxpZGF0aW9uRXJyb3IiLCJkcm9wZG93bk1lbnVJdGVtcyIsImNvbHVtblNldHRpbmdzIiwiZ3JpZEhlYWRlciIsInJvd3NDb3VudCIsImNvbnRhaW5lclN0eWxlIiwiaGVhZGVySGVpZ2h0IiwiZmlsdGVyUm93SGVpZ2h0Iiwicm93SGVpZ2h0Iiwib25Db2x1bW5SZXNpemVFbmRDYWxsYmFjayIsImhhbmRsZVJvd0NsaWNrIiwic2Nyb2xsVG9Db2x1bW4iLCJzY3JvbGxUb3AiLCJnZXRTY3JvbGxUb1JvdyIsIm9uUm93RG91YmxlQ2xpY2siLCJvbk1vdXNlRG93biIsIm9uUm93TW91c2VFbnRlciIsIm9uUm93TW91c2VMZWF2ZSIsIm9uU2Nyb2xsU3RhcnQiLCJvblNjcm9sbEVuZCIsImdldFJvd0NsYXNzTmFtZSIsImhhbmRsZVJvd0hlaWdodEdldHRlciIsIm9uQ29udGVudEhlaWdodENoYW5nZSIsImhhbmRsZUNvbnRleHRNZW51IiwicmVuZGVyQ29sdW1ucyIsImNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbCIsInNhdmVDb2x1bW5TZXR0aW5ncyIsImNoaWxkcmVuIiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0IsQ0FBQ0MsS0FBRCxFQUFRQyxRQUFSLEVB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TyxlQUFYLElBQThCLEtBQUt5RCxxQkF2QnREO0FBd0JFLE1BQUEscUJBQXFCLEVBQUUsS0FBSzdSLEtBQUwsQ0FBVzhSLHFCQXhCcEM7QUF5QkUsTUFBQSxnQkFBZ0IsRUFBRSxLQUFLQztBQXpCekIsUUEyQkcsS0FBS0MsYUFBTCxFQTNCSCxDQWxCRixFQStDRyxLQUFLaFMsS0FBTCxDQUFXbkMseUJBQVgsSUFDQyxnQ0FBQywwQkFBRDtBQUNFLE1BQUEsSUFBSSxFQUFFLEtBQUttQyxLQUFMLENBQVczQyxJQURuQjtBQUVFLE1BQUEsT0FBTyxFQUFFLEtBQUsyQyxLQUFMLENBQVd1QixPQUZ0QjtBQUdFLE1BQUEsY0FBYyxFQUFFLEtBQUt2QixLQUFMLENBQVdoQyxjQUg3QjtBQUlFLE1BQUEsd0JBQXdCLEVBQUUsS0FBS2dDLEtBQUwsQ0FBV2lTLHdCQUp2QztBQUtFLE1BQUEsa0JBQWtCLEVBQUUsS0FBS2pTLEtBQUwsQ0FBV2tTO0FBTGpDLE1BaERKLEVBd0RHLEtBQUtsUyxLQUFMLENBQVdtUyxRQXhEZCxDQURGO0FBNERELEc7OztFQTV6Q29CQyxrQkFBTUMsYSw0Q0FHTEMsdUI7ZUE0ekNUelMsUSIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHByZWZlci1kZXN0cnVjdHVyaW5nICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1sb25lbHktaWYsIHByZWZlci10ZW1wbGF0ZSwgcmVhY3QvcmVxdWlyZS1kZWZhdWx0LXByb3BzICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTWFwLCBMaXN0IH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBpbmplY3RJbnRsLCBGb3JtYXR0ZWRNZXNzYWdlIGFzIE0gfSBmcm9tICdyZWFjdC1pbnRsJztcbmltcG9ydCB7IENvbHVtbiwgQ2VsbCB9IGZyb20gJ2ZpeGVkLWRhdGEtdGFibGUtMic7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IEljb24gfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1pY29ucyc7XG5pbXBvcnQgU3Bpbm5lciBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1zcGlubmVyJztcbmltcG9ydCBDaGVja2JveCBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1jaGVja2JveCc7XG5pbXBvcnQgJ2ZpeGVkLWRhdGEtdGFibGUtMi9kaXN0L2ZpeGVkLWRhdGEtdGFibGUuY3NzJztcblxuaW1wb3J0IFJlc3BvbnNpdmVGaXhlZERhdGFUYWJsZSBmcm9tICcuL3Jlc3BvbnNpdmUtZml4ZWQtZGF0YS10YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IEhlYWRlckNlbGwgZnJvbSAnLi9oZWFkZXItY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IEFjdGlvbkJhciBmcm9tICcuL2FjdGlvbi1iYXIuY29tcG9uZW50JztcbmltcG9ydCBJbmxpbmVFZGl0Q29udHJvbHMgZnJvbSAnLi9pbmxpbmUtZWRpdC1jb250cm9scy5jb21wb25lbnQnO1xuaW1wb3J0IEZpbHRlcmluZ0NvbnRyb2xzIGZyb20gJy4vZmlsdGVyaW5nLWNvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgRHJvcGRvd25Db250cm9scyBmcm9tICcuL2Ryb3Bkb3duLWNvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgKiBhcyBkYXRhZ3JpZEFjdGlvbnMgZnJvbSAnLi9kYXRhZ3JpZC5hY3Rpb25zJztcbmltcG9ydCBDZWxsVG9vbHRpcCBmcm9tICcuL2NlbGwtdG9vbHRpcC5jb21wb25lbnQnO1xuaW1wb3J0IENvbHVtblNldHRpbmdzTW9kYWwgZnJvbSAnLi9jb2x1bW4tc2V0dGluZ3MvY29sdW1uLXNldHRpbmdzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBwcm9wVHlwZXMsIGRlZmF1bHRQcm9wcyB9IGZyb20gJy4vZGF0YWdyaWQucHJvcHMnO1xuaW1wb3J0IHsgS0VZX0NPREVTIH0gZnJvbSAnLi9kYXRhZ3JpZC5jb25zdGFudHMnO1xuaW1wb3J0IHBhZ2luYXRpb24gZnJvbSAnLi9wYWdpbmF0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgQ29udGV4dE1lbnUgZnJvbSAnLi9jb250ZXh0LW1lbnUuY29tcG9uZW50JztcbmltcG9ydCBVdGlscyBmcm9tICcuL2RhdGFncmlkLnV0aWxzJztcbmltcG9ydCBHcmlkQ29sdW1uU2VydmljZSBmcm9tICcuL2NvbHVtbi1zZXJ2aWNlL2NvbHVtbi1zZXJ2aWNlJztcbmltcG9ydCAnLi9kYXRhZ3JpZC5jb21wb25lbnQuc2Nzcyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSwgb3duUHJvcHMpID0+IHtcbiAgY29uc3QgR1JJRCA9IG93blByb3BzLmdyaWQ7XG4gIHJldHVybiB7XG4gICAgaXNCdXN5OiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnaXNCdXN5J10sIHRydWUpLFxuICAgIGlzRWRpdGluZzogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2lzRWRpdGluZyddLCBmYWxzZSksXG4gICAgaXNDcmVhdGluZzogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2lzQ3JlYXRpbmcnXSwgZmFsc2UpLFxuICAgIGlzRmlsdGVyaW5nOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2lzRmlsdGVyaW5nJ10sIGZhbHNlKSxcbiAgICBpc0NvbHVtblNldHRpbmdzTW9kYWxPcGVuOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihcbiAgICAgIFtHUklELmlkLCAnc2Vzc2lvbicsICdjb2x1bW5TZXR0aW5nc01vZGFsJywgJ29wZW4nXSxcbiAgICAgIGZhbHNlLFxuICAgICksXG4gICAgc29ydENvbHVtbjogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnc29ydGluZ0RhdGEnLCAnc29ydENvbHVtbiddLCBudWxsKSxcbiAgICBzb3J0T3JkZXI6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ3NvcnRpbmdEYXRhJywgJ3NvcnRPcmRlciddLCBudWxsKSxcbiAgICB2aXNpYmxlQ29sdW1uczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAndmlzaWJsZUNvbHVtbnMnXSwgTGlzdCgpKSxcbiAgICBjb2x1bW5XaWR0aHM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ2NvbHVtbldpZHRocyddLCBNYXAoKSksXG4gICAgc2VsZWN0ZWRDZWxsOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3NlbGVjdGVkQ2VsbCddLCBNYXAoKSksXG4gICAgc2VsZWN0ZWRJdGVtczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZWxlY3RlZEl0ZW1zJ10sIExpc3QoKSksXG4gICAgZGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdkYXRhJ10sIExpc3QoKSksXG4gICAgZWRpdERhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnZWRpdERhdGEnXSwgTWFwKCkpLFxuICAgIGNyZWF0ZURhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY3JlYXRlRGF0YSddLCBMaXN0KCkpLFxuICAgIGZpbHRlckRhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnZmlsdGVyRGF0YSddLCBNYXAoKSksXG4gICAgY2VsbE1lc3NhZ2VzOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NlbGxNZXNzYWdlcyddLCBNYXAoKSksXG4gICAgY3JlYXRlQ2VsbE1lc3NhZ2VzOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NyZWF0ZUNlbGxNZXNzYWdlcyddLCBNYXAoKSksXG4gICAgYWxsRGF0YVNpemU6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnYWxsRGF0YSddLCBMaXN0KCkpLnNpemUsXG4gICAgbGFuZ3VhZ2U6IFV0aWxzLmdldExhbmd1YWdlKEdSSUQsIHN0YXRlLnVzZXIpLFxuICAgIHJlZ2lvbjogVXRpbHMuZ2V0UmVnaW9uKEdSSUQsIHN0YXRlLnVzZXIpLFxuICAgIGRhdGVGb3JtYXQ6IFV0aWxzLmdldERhdGVGb3JtYXQoR1JJRCwgc3RhdGUudXNlciksXG4gICAgdGhvdXNhbmRTZXBhcmF0b3I6IFV0aWxzLmdldFRob3VzYW5kU2VwYXJhdG9yKEdSSUQsIHN0YXRlLnVzZXIpLFxuICAgIGRlY2ltYWxTZXBhcmF0b3I6IFV0aWxzLmdldERlY2ltYWxTZXBhcmF0b3IoR1JJRCwgc3RhdGUudXNlciksXG4gICAgZm9yY2VSZWZyZXNoVGltZXN0YW1wOiBzdGF0ZS5kYXRhZ3JpZC5nZXQoJ2ZvcmNlUmVmcmVzaCcsIDApLCAvLyBmb3JjZSByZS1yZW5kZXIgd2hlbiBjaGFuZ2VkXG4gICAgZm9jdXNUeXBlOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnZm9jdXNUeXBlJ10sIE1hcCgpKSxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRhdGFncmlkQWN0aW9ucztcblxuQHBhZ2luYXRpb25cbkBpbmplY3RJbnRsXG5AY29ubmVjdChcbiAgbWFwU3RhdGVUb1Byb3BzLFxuICBtYXBEaXNwYXRjaFRvUHJvcHMsXG4pXG5jbGFzcyBEYXRhR3JpZCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0gcHJvcFR5cGVzO1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGN1cnJlbnRSb3c6IDAsXG4gICAgICBjdXJyZW50Q29sdW1uOiAwLFxuICAgICAgY29udGV4dE1lbnVPcGVuOiBmYWxzZSxcbiAgICAgIGNvbnRleHRNZW51WDogMCxcbiAgICAgIGNvbnRleHRNZW51WTogMCxcbiAgICB9O1xuICAgIHRoaXMuY2VsbFJlZnMgPSB7fTtcbiAgICB0aGlzLmNyZWF0ZUNlbGxSZWZzID0ge307XG4gICAgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCA9IGZhbHNlO1xuICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gZmFsc2U7IC8vIFRPRE86IEhhbmRsZSBmb2N1c2luZyB3aGVuIHRydWVcbiAgICB0aGlzLmZvY3VzVG9FcnJvckNlbGwgPSBmYWxzZTsgLy8gVE9ETzogSGFuZGxlIGZvY3VzaW5nIHdoZW4gdHJ1ZVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uRG9jdW1lbnRDbGljayk7XG4gICAgdGhpcy5wcm9wcy5pbnZhbGlkYXRlKHRoaXMucHJvcHMuZ3JpZCk7XG4gIH1cblxuICBvbkRvY3VtZW50Q2xpY2sgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuY29udGV4dE1lbnVJdGVtcykge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGNvbnRleHRNZW51T3BlbjogZmFsc2UsXG4gICAgICB9KTtcbiAgICB9XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uRG9jdW1lbnRDbGljayk7XG4gIH07XG5cbiAgb25Db2x1bW5SZXNpemVFbmRDYWxsYmFjayA9IChuZXdDb2x1bW5XaWR0aCwgY29sdW1uS2V5KSA9PiB7XG4gICAgdGhpcy5wcm9wcy5yZXNpemVDb2x1bW4odGhpcy5wcm9wcy5ncmlkLCBjb2x1bW5LZXksIG5ld0NvbHVtbldpZHRoKTtcbiAgfTtcblxuICAvKipcbiAgICogQHBhcmFtIHJvd0luZGV4IChpbnQpXG4gICAqIEBwYXJhbSBjb2wgKG9iaikuIENvbHVtbiBvYmplY3QuXG4gICAqIEBwYXJhbSBlLiBPcmlnaW5hbCBLZXlEb3duIGV2ZW50XG4gICAqIEBwYXJhbSBjcmVhdGUgKGJvb2wpLiBJcyB0aGUgY2VsbCBjcmVhdGUgY2VsbCBvciBlZGl0IGNlbGw/XG4gICAqL1xuICBvbkNlbGxLZXlEb3duID0gKHJvd0luZGV4LCBjb2wsIGUsIGNyZWF0ZSA9IGZhbHNlKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuZW5hYmxlQXJyb3dOYXZpZ2F0aW9uKSB7XG4gICAgICBjb25zdCBjZWxsUmVmcyA9IGNyZWF0ZSA/IHRoaXMuY3JlYXRlQ2VsbFJlZnMgOiB0aGlzLmNlbGxSZWZzO1xuICAgICAgY29uc3QgYXJyb3dLZXlzID0gW0tFWV9DT0RFUy5ET1dOLCBLRVlfQ09ERVMuVVAsIEtFWV9DT0RFUy5MRUZULCBLRVlfQ09ERVMuUklHSFRdO1xuICAgICAgY29uc3Qge1xuICAgICAgICBjb2x1bW5zLCB2aXNpYmxlQ29sdW1ucywgZ3JpZCwgZGF0YSwgb25MYXN0Q2VsbFRhYlByZXNzLFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCBncmlkQ29sdW1ucyA9IFV0aWxzLnZpc2libGVDb2x1bW5zKGNvbHVtbnMsIHZpc2libGVDb2x1bW5zKTtcbiAgICAgIGNvbnN0IGdldENvbHVtbktleUJ5SW5kZXggPSBpID0+IFV0aWxzLmdldENvbHVtbktleShncmlkQ29sdW1uc1tpXSk7XG4gICAgICBjb25zdCByb3dzU2l6ZSA9IGRhdGEuc2l6ZTtcbiAgICAgIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2wpO1xuICAgICAgbGV0IGN1cnJlbnRDZWxsID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtjb2x1bW5LZXl9XyR7cm93SW5kZXh9YF07XG4gICAgICBsZXQgcHJveHkgPSBudWxsO1xuXG4gICAgICBjb25zdCBpc0N1cnNvckF0U3RhcnQgPSAoKSA9PiB7XG4gICAgICAgIGlmIChjdXJyZW50Q2VsbC50eXBlICE9PSAndGV4dCcpIHJldHVybiB0cnVlO1xuICAgICAgICByZXR1cm4gY3VycmVudENlbGwuc2VsZWN0aW9uU3RhcnQgPT09IDA7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBpc0N1cnNvckF0RW5kID0gKCkgPT4ge1xuICAgICAgICBpZiAoY3VycmVudENlbGwudHlwZSAhPT0gJ3RleHQnKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRDZWxsLnNlbGVjdGlvbkVuZCA9PT0gY3VycmVudENlbGwudmFsdWUubGVuZ3RoO1xuICAgICAgfTtcblxuICAgICAgLy8gSWYgY3VycmVudCBjZWxsIGhvbGRzIGEgcmVhY3QtZmxvYXRpbmctc2VsZWN0IGNvbXBvbmVudFxuICAgICAgaWYgKGN1cnJlbnRDZWxsICYmIChjdXJyZW50Q2VsbC5zZWxlY3RSZWYgfHwgdHlwZW9mIGN1cnJlbnRDZWxsLnNlbGVjdCA9PT0gJ29iamVjdCcpKSB7XG4gICAgICAgIHByb3h5ID0gY3VycmVudENlbGw7XG4gICAgICAgIGN1cnJlbnRDZWxsID0gdGhpcy5nZXRTZWxlY3RSZWYocHJveHkpO1xuICAgICAgfVxuXG4gICAgICAvLyBQcmV2ZW50cyB1cC9kb3duIGFycm93IGZyb20gY2hhbmdpbmcgbnVtYmVyIGZpZWxkIHZhbHVlXG4gICAgICBpZiAoYXJyb3dLZXlzLmluY2x1ZGVzKGUua2V5Q29kZSkgJiYgY3VycmVudENlbGwudHlwZSA9PT0gJ251bWJlcicpIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLkVOVEVSOlxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5FU0M6IHtcbiAgICAgICAgICBpZiAoY3JlYXRlICYmIGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLkVOVEVSKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmFkZE5ld0l0ZW0oZ3JpZCwgVXRpbHMuZ2V0Q29sdW1uRGVmYXVsdFZhbHVlcyhjb2x1bW5zKSk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjdXJyZW50Q2VsbC5zZWxlY3QoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5ET1dOOiB7XG4gICAgICAgICAgbGV0IG5leHRFbGVtZW50ID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtjb2x1bW5LZXl9XyR7cm93SW5kZXggKyAxfWBdO1xuXG4gICAgICAgICAgLy8gUHJldmVudHMgbWVudSBmcm9tIG9wZW5pbmdcbiAgICAgICAgICBpZiAocHJveHkgJiYgcHJveHkuc2VsZWN0UmVmICYmICFwcm94eS5zZWxlY3RSZWYuc3RhdGUubWVudUlzT3Blbikge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKCFuZXh0RWxlbWVudCkgYnJlYWs7XG4gICAgICAgICAgICBuZXh0RWxlbWVudCA9IHRoaXMuZ2V0U2VsZWN0UmVmKG5leHRFbGVtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5tb3ZlQ2VsbEZvY3VzKG5leHRFbGVtZW50LCByb3dJbmRleCArIDEsIC0xKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5VUDoge1xuICAgICAgICAgIGxldCBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4IC0gMX1gXTtcblxuICAgICAgICAgIC8vIFByZXZlbnRzIG1lbnUgZnJvbSBvcGVuaW5nXG4gICAgICAgICAgaWYgKHByb3h5ICYmIHByb3h5LnNlbGVjdFJlZiAmJiAhcHJveHkuc2VsZWN0UmVmLnN0YXRlLm1lbnVJc09wZW4pIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmICghbmV4dEVsZW1lbnQpIGJyZWFrO1xuICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSB0aGlzLmdldFNlbGVjdFJlZihuZXh0RWxlbWVudCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubW92ZUNlbGxGb2N1cyhuZXh0RWxlbWVudCwgcm93SW5kZXggLSAxLCAtMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuVEFCOlxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5SSUdIVDpcbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuTEVGVDoge1xuICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5SSUdIVCAmJiAhaXNDdXJzb3JBdEVuZCgpKSBicmVhaztcbiAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuTEVGVCAmJiAhaXNDdXJzb3JBdFN0YXJ0KCkpIGJyZWFrO1xuXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgbGV0IGNvbHVtbkluZCA9IGdyaWRDb2x1bW5zLmZpbmRJbmRleChjID0+IGMudmFsdWVLZXlQYXRoLmpvaW4oJy8nKSA9PT0gY29sdW1uS2V5KTtcbiAgICAgICAgICBpZiAoY29sdW1uSW5kICE9PSAtMSkge1xuICAgICAgICAgICAgbGV0IGRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCBuZXh0RWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICBsZXQgcm93SW5kID0gcm93SW5kZXg7XG4gICAgICAgICAgICB3aGlsZSAoZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgLy8gTW92aW5nIHRvIHRoZSBsZWZ0XG4gICAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5MRUZUIHx8IChlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5UQUIgJiYgZS5zaGlmdEtleSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29sdW1uSW5kIC0gMSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgLT0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJvd0luZCAtIDEgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kID0gZ3JpZENvbHVtbnMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAgIHJvd0luZCAtPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gTW92aW5nIHRvIHRoZSByaWdodFxuICAgICAgICAgICAgICAgIGlmIChjb2x1bW5JbmQgKyAxIDwgZ3JpZENvbHVtbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgKz0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJvd0luZCArIDEgPCByb3dzU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kID0gMDtcbiAgICAgICAgICAgICAgICAgIHJvd0luZCArPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm93SW5kICsgMSA9PT0gcm93c1NpemUpIHtcbiAgICAgICAgICAgICAgICAgIC8vIElmIHRyeWluZyB0byBzZWxlY3QgYSByb3csIHdoZW4gdGhlcmUgaXMgbm9uZTpcbiAgICAgICAgICAgICAgICAgIGlmIChvbkxhc3RDZWxsVGFiUHJlc3MgJiYgZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuVEFCKSBvbkxhc3RDZWxsVGFiUHJlc3MoZSk7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Z2V0Q29sdW1uS2V5QnlJbmRleChjb2x1bW5JbmQpfV8ke3Jvd0luZH1gXTtcblxuICAgICAgICAgICAgICAvLyBJZiB3ZSBjYW5ub3QgZm9jdXMgb24gdGhlIG5leHQgZWxlbWVudCB3aGlsZSBtb3ZpbmcgdG8gdGhlIHJpZ2h0XG4gICAgICAgICAgICAgIGlmICghbmV4dEVsZW1lbnQgJiYgZS5rZXlDb2RlICE9PSBLRVlfQ09ERVMuTEVGVCkge1xuICAgICAgICAgICAgICAgIC8vIElmIHdlJ3JlIG5vdCB5ZXQgaW4gdGhlIGxhc3QgZm9jdXNhYmxlIGNvbHVtblxuICAgICAgICAgICAgICAgIGlmIChjb2x1bW5JbmQgPD0gZ3JpZENvbHVtbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICB3aGlsZSAoY29sdW1uSW5kIDw9IGdyaWRDb2x1bW5zLmxlbmd0aCAmJiAhbmV4dEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2dldENvbHVtbktleUJ5SW5kZXgoY29sdW1uSW5kKX1fJHtyb3dJbmR9YF07XG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCArPSAxO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHdlIGFyZSBpbiB0aGUgbGFzdCBjb2x1bW4gYW5kIHdlIGRvbid0IGhhdmUgYW4gZWxlbWVudCB0byBmb2N1cyBvbixcbiAgICAgICAgICAgICAgICAgICAgLy8gd2UgbXVzdCBtb3ZlIHRvIHRoZSBuZXh0IHJvdyAoaWYgcG9zc2libGUpXG4gICAgICAgICAgICAgICAgICAgIGlmICghbmV4dEVsZW1lbnQgJiYgY29sdW1uSW5kID09PSBncmlkQ29sdW1ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB0cnlpbmcgdG8gc2VsZWN0IGEgcm93LCB3aGVuIHRoZXJlIGlzIG5vbmU6XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHJvd0luZCArIDEgPT09IHJvd3NTaXplKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob25MYXN0Q2VsbFRhYlByZXNzICYmIGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLlRBQikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkxhc3RDZWxsVGFiUHJlc3MoZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgIHJvd0luZCArPSAxO1xuICAgICAgICAgICAgICAgICAgICAgIG5leHRFbGVtZW50ID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtnZXRDb2x1bW5LZXlCeUluZGV4KGNvbHVtbkluZCl9XyR7cm93SW5kfWBdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIElmIHdlIGNhbm5vdCBmb2N1cyBvbiB0aGUgbmV4dCBlbGVtZW50IHdoaWxlIG1vdmluZyB0byB0aGUgbGVmdFxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFuZXh0RWxlbWVudCAmJiBlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5MRUZUKSB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGNvbHVtbkluZCA+IDAgJiYgIW5leHRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgLT0gMTtcbiAgICAgICAgICAgICAgICAgIG5leHRFbGVtZW50ID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtnZXRDb2x1bW5LZXlCeUluZGV4KGNvbHVtbkluZCl9XyR7cm93SW5kfWBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBpZiBubyBlbGVtZW50IHdhcyBmb3VuZCwgdHJ5IG1vdmluZyB0byBwcmV2aW91cyByb3dcbiAgICAgICAgICAgICAgICAvLyAobmVlZGVkIGluIGNhc2UgZmlyc3QgY29sdW1uIGlzIG5vdCBlZGl0YWJsZSBlLmcuIGFuIEV4dHJhQ29sdW1uKVxuICAgICAgICAgICAgICAgIGlmIChyb3dJbmQgPiAwICYmICFuZXh0RWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kID0gZ3JpZENvbHVtbnMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAgIHJvd0luZCAtPSAxO1xuICAgICAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2dldENvbHVtbktleUJ5SW5kZXgoY29sdW1uSW5kKX1fJHtyb3dJbmR9YF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGRpc2FibGVkID0gbmV4dEVsZW1lbnQgPyBuZXh0RWxlbWVudC5kaXNhYmxlZCA6IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFkaXNhYmxlZCAmJiBuZXh0RWxlbWVudCkge1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIG5leHRFbGVtZW50LnNlbGVjdCA9PT0gJ29iamVjdCcgfHwgbmV4dEVsZW1lbnQuc2VsZWN0UmVmKSB7XG4gICAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSB0aGlzLmdldFNlbGVjdFJlZihuZXh0RWxlbWVudCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy5tb3ZlQ2VsbEZvY3VzKG5leHRFbGVtZW50LCByb3dJbmQsIGNvbHVtbkluZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIG9uRWRpdENlbGxLZXlEb3duID0gKHJvd0luZGV4LCBjb2wpID0+IChlKSA9PiB7XG4gICAgdGhpcy5vbkNlbGxLZXlEb3duKHJvd0luZGV4LCBjb2wsIGUpO1xuICB9O1xuXG4gIG9uQ3JlYXRlQ2VsbEtleURvd24gPSAocm93SW5kZXgsIGNvbCkgPT4gKGUpID0+IHtcbiAgICB0aGlzLm9uQ2VsbEtleURvd24ocm93SW5kZXgsIGNvbCwgZSwgdHJ1ZSk7XG4gIH07XG5cbiAgb25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UgPSAoY29sLCB2YWx1ZVBhcnNlcikgPT4gKGV2ZW50T3JEYXRhKSA9PiB7XG4gICAgbGV0IHJhd1ZhbHVlO1xuICAgIC8vIGV2ZW50T3JEYXRhIGNhbiBiZSBpbnB1dCBvbkNoYW5nZSBldmVudCwgcmVhY3Qtc2VsZWN0IG9uQ2hhbmdlIG9yIHJlYWN0LWRheS1waWNrZXIgb25DaGFuZ2VcbiAgICBpZiAoZXZlbnRPckRhdGEpIHtcbiAgICAgIGlmIChldmVudE9yRGF0YS50YXJnZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnRPckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSB2YWx1ZVBhcnNlcihyYXdWYWx1ZSk7XG4gICAgdGhpcy5wcm9wcy5maWx0ZXJDZWxsVmFsdWVDaGFuZ2UodGhpcy5wcm9wcy5ncmlkLCB0aGlzLnByb3BzLmNvbHVtbnMsIGNvbCwgdmFsdWUpO1xuICB9O1xuXG4gIG9uRmlsdGVyQ2VsbE11bHRpVmFsdWVCbHVyID0gY29sID0+ICgpID0+IHtcbiAgICBjb25zdCBjb2x1bW5LZXkgPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sKTtcbiAgICBjb25zdCB7IGNvbHVtbnMsIGZpbHRlckNlbGxWYWx1ZUNoYW5nZSwgZ3JpZCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzZWxlY3RlZEZpbHRlcnMgPSB0aGlzLnN0YXRlW2NvbHVtbktleV07XG4gICAgaWYgKHNlbGVjdGVkRmlsdGVycykge1xuICAgICAgZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlKGdyaWQsIGNvbHVtbnMsIGNvbCwgc2VsZWN0ZWRGaWx0ZXJzKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBbY29sdW1uS2V5XTogdW5kZWZpbmVkIH0pO1xuICAgIH1cbiAgfTtcblxuICBvbkZpbHRlckNlbGxNdWx0aVZhbHVlQ2hhbmdlID0gKGNvbCwgdmFsdWVQYXJzZXIpID0+IChkYXRhID0gW10pID0+IHtcbiAgICAvLyBkYXRhIGlzIGlucHV0IG9mIHJlYWN0LXNlbGVjdCBvbkNoYW5nZVxuICAgIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2wpO1xuICAgIGNvbnN0IHNlbGVjdGVkRmlsdGVycyA9IHRoaXMuc3RhdGVbY29sdW1uS2V5XTtcbiAgICBpZiAoIXNlbGVjdGVkRmlsdGVycyAmJiBkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgLy8gZW5kcyB1cCBoZXJlIGluIGNhc2Ugb2YgY2xlYXIgYnV0dG9uXG4gICAgICBjb25zdCB7IGNvbHVtbnMsIGZpbHRlckNlbGxWYWx1ZUNoYW5nZSwgZ3JpZCB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGZpbHRlckNlbGxWYWx1ZUNoYW5nZShncmlkLCBjb2x1bW5zLCBjb2wsIGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHZhbHVlUGFyc2VyKGRhdGEpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IFtjb2x1bW5LZXldOiB2YWx1ZSB9KTtcbiAgICB9XG4gIH07XG5cbiAgb25DcmVhdGVDZWxsVmFsdWVDaGFuZ2UgPSAocm93SW5kZXgsIGNvbCwgdmFsdWVQYXJzZXIpID0+IChldmVudE9yRGF0YSkgPT4ge1xuICAgIGNvbnN0IHsgY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlLCBncmlkIH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCByYXdWYWx1ZTtcbiAgICAvLyBldmVudE9yRGF0YSBjYW4gYmUgaW5wdXQgb25DaGFuZ2UgZXZlbnQsIHJlYWN0LXNlbGVjdCBvbkNoYW5nZSBvciByZWFjdC1kYXktcGlja2VyIG9uQ2hhbmdlXG4gICAgaWYgKGV2ZW50T3JEYXRhKSB7XG4gICAgICBpZiAoZXZlbnRPckRhdGEudGFyZ2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YS50YXJnZXQudmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50T3JEYXRhLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YS52YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGE7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlID0gdmFsdWVQYXJzZXIocmF3VmFsdWUpO1xuXG4gICAgY29uc3QgeyBjb21wb25lbnRUeXBlIH0gPSBjb2w7XG4gICAgc3dpdGNoIChjb21wb25lbnRUeXBlKSB7XG4gICAgICBjYXNlICdjdXJyZW5jeSc6XG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAndGV4dCc6IHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGNyZWF0ZUNlbGxWYWx1ZUNoYW5nZShncmlkLCByb3dJbmRleCwgY29sLnZhbHVlS2V5UGF0aCwgdmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNvbC5vbkNyZWF0ZVZhbHVlQ2hhbmdlKSB7XG4gICAgICBjb2wub25DcmVhdGVWYWx1ZUNoYW5nZSh2YWx1ZSwgY29sLnZhbHVlS2V5UGF0aCwgcm93SW5kZXgpO1xuICAgIH1cbiAgICBpZiAoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlICYmIHZhbHVlID09PSBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubWF0Y2hWYWx1ZSkge1xuICAgICAgLy8gQ2FsbCBzcGVjaWFsIHBhaXJlZCB2YWx1ZSBjaGFuZ2Ugb24gb3RoZXIgY2VsbCBpZiB2YWx1ZSBtYXRjaGVzXG4gICAgICB0aGlzLm9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlKFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgeyB2YWx1ZUtleVBhdGg6IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5uZXdWYWx1ZUtleVBhdGggfSxcbiAgICAgICAgdiA9PiB2LFxuICAgICAgKShjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY29sLnZhbGlkYXRvcnMpIHtcbiAgICAgIHRoaXMucHJvcHMuY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUoXG4gICAgICAgIHRoaXMucHJvcHMuZ3JpZCxcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIGNvbC52YWx1ZUtleVBhdGgsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBjb2wudmFsaWRhdG9ycyxcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIG9uRWRpdENlbGxWYWx1ZUNoYW5nZSA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGV2ZW50T3JEYXRhKSA9PiB7XG4gICAgY29uc3QgeyBlZGl0Q2VsbFZhbHVlQ2hhbmdlLCBncmlkIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGRhdGFJZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgbGV0IHJhd1ZhbHVlO1xuICAgIC8vIGV2ZW50T3JEYXRhIGNhbiBiZSBpbnB1dCBvbkNoYW5nZSBldmVudCwgcmVhY3Qtc2VsZWN0IG9uQ2hhbmdlIG9yIHJlYWN0LWRheS1waWNrZXIgb25DaGFuZ2VcbiAgICBpZiAoZXZlbnRPckRhdGEpIHtcbiAgICAgIGlmIChldmVudE9yRGF0YS50YXJnZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnRPckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSB2YWx1ZVBhcnNlcihyYXdWYWx1ZSk7XG4gICAgY29uc3QgeyBjb21wb25lbnRUeXBlIH0gPSBjb2w7XG4gICAgc3dpdGNoIChjb21wb25lbnRUeXBlKSB7XG4gICAgICBjYXNlICdjdXJyZW5jeSc6XG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAndGV4dCc6IHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGVkaXRDZWxsVmFsdWVDaGFuZ2UoZ3JpZCwgZGF0YUlkLCBjb2wudmFsdWVLZXlQYXRoLCB2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY29sLm9uRWRpdFZhbHVlQ2hhbmdlKSB7XG4gICAgICBjb2wub25FZGl0VmFsdWVDaGFuZ2UodmFsdWUsIGNvbC52YWx1ZUtleVBhdGgsIHJvd0luZGV4LCBkYXRhSWQpO1xuICAgIH1cbiAgICBpZiAoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlICYmIHZhbHVlID09PSBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubWF0Y2hWYWx1ZSkge1xuICAgICAgLy8gQ2FsbCBzcGVjaWFsIHBhaXJlZCB2YWx1ZSBjaGFuZ2Ugb24gb3RoZXIgY2VsbCBpZiB2YWx1ZSBtYXRjaGVzXG4gICAgICB0aGlzLm9uRWRpdENlbGxWYWx1ZUNoYW5nZShcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIHsgdmFsdWVLZXlQYXRoOiBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWVLZXlQYXRoIH0sXG4gICAgICAgIHYgPT4gdixcbiAgICAgICkoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm5ld1ZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNvbC52YWxpZGF0b3JzKSB7XG4gICAgICB0aGlzLnByb3BzLmVkaXRDZWxsVmFsdWVWYWxpZGF0ZShcbiAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICBkYXRhSWQsXG4gICAgICAgIGNvbC52YWx1ZUtleVBhdGgsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBjb2wudmFsaWRhdG9ycyxcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIGdldFJlZ0V4ID0gc2VwYXJhdG9yID0+IChzZXBhcmF0b3IgPyBuZXcgUmVnRXhwKGBcXFxcJHtzZXBhcmF0b3J9YCwgJ2cnKSA6IG5ldyBSZWdFeHAoJ1xcXFxzJywgJ2cnKSk7XG5cbiAgb25DcmVhdGVDZWxsQmx1ciA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGV2ZW50T3JEYXRhKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGVjaW1hbFNlcGFyYXRvciwgY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlLCBncmlkLCB0aG91c2FuZFNlcGFyYXRvcixcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IGNvbXBvbmVudFR5cGUgfSA9IGNvbDtcbiAgICBsZXQgdmFsdWU7XG4gICAgLy8gZXZlbnRPckRhdGEgY2FuIGJlIGZvcm1hdHRlZC1pbnB1dCwgcmVhY3Qtc2VsZWN0LCByZWFjdC1jaGVja2JveCBvciByZWFjdC1kYXktcGlja2VyXG4gICAgLy8gb25DaGFuZ2UgZXZlbnRcbiAgICBpZiAoZXZlbnRPckRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGV2ZW50T3JEYXRhICYmIGV2ZW50T3JEYXRhLnRhcmdldCAmJiBldmVudE9yRGF0YS50YXJnZXQudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YWx1ZSA9IGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnRPckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YWx1ZSA9IGV2ZW50T3JEYXRhLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBldmVudE9yRGF0YTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgPSB0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCk7XG4gICAgfVxuICAgIHN3aXRjaCAoY29tcG9uZW50VHlwZSkge1xuICAgICAgY2FzZSAnY3VycmVuY3knOiB7XG4gICAgICAgIGNvbnN0IG51bWVyaWNWYWx1ZSA9IHZhbHVlXG4gICAgICAgICAgPyBOdW1iZXIodmFsdWUucmVwbGFjZSh0aGlzLmdldFJlZ0V4KChjb2wudmFsdWVPcHRpb25zICYmIGNvbC52YWx1ZU9wdGlvbnMudGhvdXNhbmRTZXBhcmF0b3IpIHx8IHRob3VzYW5kU2VwYXJhdG9yKSwgJycpXG4gICAgICAgICAgICAucmVwbGFjZSh0aGlzLmdldFJlZ0V4KChjb2wudmFsdWVPcHRpb25zICYmIGNvbC52YWx1ZU9wdGlvbnMuZGVjaW1hbFNlcGFyYXRvcikgfHwgZGVjaW1hbFNlcGFyYXRvciksICcuJykpXG4gICAgICAgICAgOiB2YWx1ZTtcbiAgICAgICAgaWYgKG51bWVyaWNWYWx1ZSAhPT0gdGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpKSB7XG4gICAgICAgICAgY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlKGdyaWQsIHJvd0luZGV4LCBjb2wudmFsdWVLZXlQYXRoLCBudW1lcmljVmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ3RleHQnOiB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpKSB7XG4gICAgICAgICAgY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlKGdyaWQsIHJvd0luZGV4LCBjb2wudmFsdWVLZXlQYXRoLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjb2wub25DcmVhdGVCbHVyKSB7XG4gICAgICBpZiAodmFsdWVQYXJzZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlUGFyc2VyKHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGNvbC5vbkNyZWF0ZUJsdXIodmFsdWUsIHJvd0luZGV4KTtcbiAgICB9XG4gIH07XG5cbiAgb25FZGl0Q2VsbEJsdXIgPSAocm93SW5kZXgsIGNvbCwgdmFsdWVQYXJzZXIpID0+IChldmVudE9yRGF0YSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGRlY2ltYWxTZXBhcmF0b3IsIGVkaXRDZWxsVmFsdWVDaGFuZ2UsIGdyaWQsIHRob3VzYW5kU2VwYXJhdG9yLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgY29tcG9uZW50VHlwZSB9ID0gY29sO1xuICAgIGNvbnN0IGRhdGFJZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgbGV0IHZhbHVlO1xuICAgIC8vIGV2ZW50T3JEYXRhIGNhbiBiZSBmb3JtYXR0ZWQtaW5wdXQsIHJlYWN0LXNlbGVjdCwgcmVhY3QtY2hlY2tib3ggb3IgcmVhY3QtZGF5LXBpY2tlclxuICAgIC8vIG9uQ2hhbmdlIGV2ZW50XG4gICAgaWYgKGV2ZW50T3JEYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChldmVudE9yRGF0YSAmJiBldmVudE9yRGF0YS50YXJnZXQgJiYgZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsdWUgPSBldmVudE9yRGF0YS50YXJnZXQudmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50T3JEYXRhLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsdWUgPSBldmVudE9yRGF0YS52YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gZXZlbnRPckRhdGE7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlID0gdGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpO1xuICAgIH1cbiAgICBzd2l0Y2ggKGNvbXBvbmVudFR5cGUpIHtcbiAgICAgIGNhc2UgJ2N1cnJlbmN5Jzoge1xuICAgICAgICBjb25zdCBudW1lcmljVmFsdWUgPSB2YWx1ZVxuICAgICAgICAgID8gTnVtYmVyKHZhbHVlLnJlcGxhY2UodGhpcy5nZXRSZWdFeCgoY29sLnZhbHVlT3B0aW9ucyAmJiBjb2wudmFsdWVPcHRpb25zLnRob3VzYW5kU2VwYXJhdG9yKSB8fCB0aG91c2FuZFNlcGFyYXRvciksICcnKVxuICAgICAgICAgICAgLnJlcGxhY2UodGhpcy5nZXRSZWdFeCgoY29sLnZhbHVlT3B0aW9ucyAmJiBjb2wudmFsdWVPcHRpb25zLmRlY2ltYWxTZXBhcmF0b3IpIHx8IGRlY2ltYWxTZXBhcmF0b3IpLCAnLicpKVxuICAgICAgICAgIDogdmFsdWU7XG4gICAgICAgIGlmIChudW1lcmljVmFsdWUgIT09IHRoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKSkge1xuICAgICAgICAgIGVkaXRDZWxsVmFsdWVDaGFuZ2UoZ3JpZCwgZGF0YUlkLCBjb2wudmFsdWVLZXlQYXRoLCBudW1lcmljVmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ3RleHQnOiB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpKSB7XG4gICAgICAgICAgZWRpdENlbGxWYWx1ZUNoYW5nZShncmlkLCBkYXRhSWQsIGNvbC52YWx1ZUtleVBhdGgsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNvbC5vbkVkaXRCbHVyKSB7XG4gICAgICBpZiAodmFsdWVQYXJzZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlUGFyc2VyKHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGNvbC5vbkVkaXRCbHVyKHZhbHVlLCByb3dJbmRleCwgZGF0YUlkKTtcbiAgICB9XG4gIH07XG5cbiAgb25DZWxsRm9jdXMgPSAoY2VsbFR5cGUsIGlucHV0VHlwZSwgcm93SW5kZXgsIGNvbHVtbktleSkgPT4gKGUpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBjZWxsU2VsZWN0aW9uQ2hhbmdlLCBjZWxsU2VsZWN0LCBncmlkLCBpc0VkaXRpbmcsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKGlzRWRpdGluZykgcmV0dXJuO1xuXG4gICAgaWYgKGlucHV0VHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIGUudGFyZ2V0LnNlbGVjdCgpO1xuICAgIH1cbiAgICBpZiAoY2VsbFR5cGUgPT09ICdlZGl0JyAmJiBjZWxsU2VsZWN0KSB7XG4gICAgICBjZWxsU2VsZWN0aW9uQ2hhbmdlKFxuICAgICAgICBncmlkLFxuICAgICAgICBNYXAoe1xuICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgIGNvbHVtbktleSxcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICBnZXRTZWxlY3RSZWYgPSAoY29tcG9uZW50KSA9PiB7XG4gICAgaWYgKCFjb21wb25lbnQpIHJldHVybiBudWxsO1xuICAgIGlmIChjb21wb25lbnQuc2VsZWN0ICYmIGNvbXBvbmVudC5zZWxlY3QuaW5wdXRSZWYpIHtcbiAgICAgIHJldHVybiBjb21wb25lbnQuc2VsZWN0LmlucHV0UmVmO1xuICAgIH1cbiAgICBpZiAoY29tcG9uZW50LnNlbGVjdCAmJiBjb21wb25lbnQuc2VsZWN0LnNlbGVjdCkge1xuICAgICAgcmV0dXJuIGNvbXBvbmVudC5zZWxlY3Quc2VsZWN0LmlucHV0UmVmO1xuICAgIH1cbiAgICBpZiAoY29tcG9uZW50LnNlbGVjdFJlZiAmJiBjb21wb25lbnQuc2VsZWN0UmVmLnNlbGVjdC5zZWxlY3QpIHtcbiAgICAgIHJldHVybiBjb21wb25lbnQuc2VsZWN0UmVmLnNlbGVjdC5zZWxlY3QuaW5wdXRSZWY7XG4gICAgfVxuICAgIHJldHVybiBjb21wb25lbnQuc2VsZWN0UmVmLnNlbGVjdC5pbnB1dFJlZjtcbiAgfTtcblxuICBnZXREYXRhSWRCeVJvd0luZGV4ID0gcm93SW5kZXggPT4gdGhpcy5wcm9wcy5kYXRhLmdldEluKFtyb3dJbmRleCwgLi4udGhpcy5wcm9wcy5ncmlkLmlkS2V5UGF0aF0pO1xuXG4gIGdldFNlbGVjdGVkSXRlbUluZGV4ID0gKGlkKSA9PiB7XG4gICAgaWYgKCFpZCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMucHJvcHMuZGF0YS5maW5kSW5kZXgodiA9PiB2LmdldEluKHRoaXMucHJvcHMuZ3JpZC5pZEtleVBhdGgpID09PSBpZCk7XG4gICAgcmV0dXJuIGluZGV4ID09PSAtMSA/IHVuZGVmaW5lZCA6IGluZGV4O1xuICB9O1xuXG4gIGdldEVkaXRJdGVtVmFsdWUgPSAocm93SW5kZXgsIGNvbCwgb3B0aW9ucyA9IFtdKSA9PiB7XG4gICAgLy8gR2V0IHRoZSB2YWx1ZSB0byBkaXNwbGF5IGluIGVkaXQgY2VsbFxuICAgIGNvbnN0IGlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICBjb25zdCBlZGl0VmFsdWUgPSB0aGlzLnByb3BzLmVkaXREYXRhLmdldEluKFtpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0sIHVuZGVmaW5lZCk7XG4gICAgbGV0IG9yaWdpbmFsVmFsdWU7XG4gICAgaWYgKGVkaXRWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBvcmlnaW5hbFZhbHVlID0gdGhpcy5wcm9wcy5kYXRhLmdldEluKFtyb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0sICcnKTtcbiAgICB9IGVsc2UgaWYgKGVkaXRWYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBWYWx1ZSBpcyBmb3VuZCBmcm9tIGVkaXREYXRhXG4gICAgICAvLyBGb3JtYXQgYnkgdHlwZVxuICAgICAgc3dpdGNoIChjb2wuY29tcG9uZW50VHlwZSkge1xuICAgICAgICBjYXNlICdtdWx0aXNlbGVjdCc6XG4gICAgICAgIGNhc2UgJ3NlbGVjdCc6XG4gICAgICAgICAgcmV0dXJuIG9wdGlvbnMuc2VsZWN0T3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IGVkaXRWYWx1ZSk7XG4gICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICAgIHJldHVybiBvcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gZWRpdFZhbHVlKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gZWRpdFZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAob3JpZ2luYWxWYWx1ZSA9PT0gbnVsbCB8fCBvcmlnaW5hbFZhbHVlID09PSB1bmRlZmluZWQgfHwgb3JpZ2luYWxWYWx1ZSA9PT0gJycpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgLy8gUmV0dXJuIHZhbHVlIGZyb20gb3JpZ2luYWwgZGF0YSwgYmVjYXVzZSBlZGl0RGF0YSBpcyBub3QgYXZhaWxhYmxlXG4gICAgLy8gRm9ybWF0IGJ5IGNvbXBvbmVudCB0eXBlXG4gICAgc3dpdGNoIChjb2wuY29tcG9uZW50VHlwZSkge1xuICAgICAgY2FzZSAnZmxvYXQnOiB7XG4gICAgICAgIGlmIChTdHJpbmcob3JpZ2luYWxWYWx1ZSkubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHJldHVybiBTdHJpbmcob3JpZ2luYWxWYWx1ZSkucmVwbGFjZSgnLicsIHRoaXMucHJvcHMuZGVjaW1hbFNlcGFyYXRvcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9yaWdpbmFsVmFsdWU7XG4gICAgICB9XG4gICAgICBjYXNlICdtdWx0aXNlbGVjdCc6XG4gICAgICBjYXNlICdzZWxlY3QnOlxuICAgICAgICByZXR1cm4gb3B0aW9ucy5zZWxlY3RPcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gb3JpZ2luYWxWYWx1ZSk7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSBvcmlnaW5hbFZhbHVlKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBvcmlnaW5hbFZhbHVlO1xuICAgIH1cbiAgfTtcblxuICBnZXRDcmVhdGVJdGVtVmFsdWUgPSAocm93SW5kZXgsIGNvbCwgb3B0aW9ucyA9IFtdKSA9PiB7XG4gICAgY29uc3QgdmFsID0gdGhpcy5wcm9wcy5jcmVhdGVEYXRhLmdldEluKFtyb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0sICcnKTtcbiAgICBpZiAodmFsID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGlmIChjb2wuY29tcG9uZW50VHlwZSA9PT0gJ3NlbGVjdCcgfHwgY29sLmNvbXBvbmVudFR5cGUgPT09ICdtdWx0aXNlbGVjdCcpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLnNlbGVjdE9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSB2YWwpO1xuICAgIH1cbiAgICBpZiAoWydib29sZWFuJ10uaW5jbHVkZXMoY29sLmNvbXBvbmVudFR5cGUpKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IHZhbCk7XG4gICAgfVxuICAgIHJldHVybiB2YWw7XG4gIH07XG5cbiAgZ2V0RmlsdGVySXRlbVZhbHVlID0gKGNvbCwgb3B0aW9ucyA9IFtdKSA9PiB7XG4gICAgY29uc3QgdmFsID0gdGhpcy5wcm9wcy5maWx0ZXJEYXRhLmdldChVdGlscy5nZXRDb2x1bW5LZXkoY29sKSwgJycpO1xuICAgIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgaWYgKGNvbC5jb21wb25lbnRUeXBlID09PSAnc2VsZWN0Jykge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuc2VsZWN0T3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IHZhbCk7XG4gICAgfVxuICAgIGlmIChbJ2NoZWNrYm94JywgJ2Jvb2xlYW4nXS5pbmNsdWRlcyhjb2wuY29tcG9uZW50VHlwZSkpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gdmFsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsO1xuICB9O1xuXG4gIGdldEZpbHRlckl0ZW1NdWx0aVZhbHVlID0gKGNvbCkgPT4ge1xuICAgIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2wpO1xuICAgIGNvbnN0IHsgZmlsdGVyRGF0YSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBkYXRhID0gdGhpcy5zdGF0ZVtjb2x1bW5LZXldO1xuICAgIGNvbnN0IHZhbCA9IGRhdGEgfHwgZmlsdGVyRGF0YS5nZXQoY29sdW1uS2V5LCAnJyk7XG4gICAgLy8gc2Vzc2lvbiBzdG9yYWdlIGNvbnRlbnQgaXMgY29udmVydGVkIHRvIGltbXV0YWJsZSBhbmQgbXVsdGlzZWxlY3RcbiAgICAvLyBmaWx0ZXJzIGlzIHRoZW4gbGlzdCBvdGhlcndpc2UgYXJyYXlcbiAgICByZXR1cm4gdmFsICYmIHZhbC50b0pTID8gdmFsLnRvSlMoKSA6IHZhbCB8fCBbXTtcbiAgfTtcblxuICBnZXRDb21wb25lbnREaXNhYmxlZFN0YXRlID0gKHJvd0luZGV4LCBjb2wsIG1vZGUpID0+IHtcbiAgICBsZXQgY29tcG9uZW50RGlzYWJsZWQgPSAhIWNvbC5kaXNhYmxlRWRpdGluZztcbiAgICAvLyBjaGVjayBpZiBjb21wb25lbnQgaXMgZGlzYWJsZWQgYnkgb3RoZXIgY29sdW1uIGRhdGFcbiAgICBpZiAoIWNvbXBvbmVudERpc2FibGVkICYmIGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaCkge1xuICAgICAgaWYgKG1vZGUgPT09ICdjcmVhdGUnKSB7XG4gICAgICAgIGNvbXBvbmVudERpc2FibGVkID0gdGhpcy5nZXRDcmVhdGVJdGVtVmFsdWUocm93SW5kZXgsIHtcbiAgICAgICAgICB2YWx1ZUtleVBhdGg6IGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaC5tYXRjaFZhbHVlS2V5UGF0aCxcbiAgICAgICAgfSkgPT09IGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaC5tYXRjaFZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29tcG9uZW50RGlzYWJsZWQgPSB0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIHtcbiAgICAgICAgICB2YWx1ZUtleVBhdGg6IGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaC5tYXRjaFZhbHVlS2V5UGF0aCxcbiAgICAgICAgfSkgPT09IGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaC5tYXRjaFZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29tcG9uZW50RGlzYWJsZWQ7XG4gIH07XG5cbiAgZ2V0Um93Q2xhc3NOYW1lID0gKHJvd0luZGV4KSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZ3JpZCwgaXNDcmVhdGluZywgaXNFZGl0aW5nLCBjcmVhdGVEYXRhLCBzZWxlY3RlZEl0ZW1zLCBkYXRhLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHJvd0NsYXNzTmFtZXMgPSBbJ29jLWRhdGFncmlkLXJvdyddO1xuICAgIGxldCBleHRyYVJvd0NvdW50ID0gMDsgLy8gaG93IG1hbnkgcm93cyB0byBpZ25vcmUgZnJvbSB0b3AsIG5ldyArIGZpbHRlciByb3dzXG4gICAgaWYgKGlzQ3JlYXRpbmcpIGV4dHJhUm93Q291bnQgPSBjcmVhdGVEYXRhLnNpemU7XG4gICAgaWYgKGlzQ3JlYXRpbmcpIHtcbiAgICAgIGlmIChyb3dJbmRleCA8PSBleHRyYVJvd0NvdW50IC0gMSkge1xuICAgICAgICByb3dDbGFzc05hbWVzLnB1c2goJ29jLWRhdGFncmlkLXJvdy1uZXcnKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzRWRpdGluZykge1xuICAgICAgcm93Q2xhc3NOYW1lcy5wdXNoKCdvYy1kYXRhZ3JpZC1yb3ctZWRpdCcpO1xuICAgIH1cblxuICAgIC8vIGNoZWNrIGlmIHJvdyBpcyBzZWxlY3RlZFxuICAgIGlmICghaXNDcmVhdGluZyAmJiAhaXNFZGl0aW5nICYmIChzZWxlY3RlZEl0ZW1zICYmIGdyaWQuaWRLZXlQYXRoKSkge1xuICAgICAgaWYgKHNlbGVjdGVkSXRlbXMuaW5kZXhPZihkYXRhLmdldEluKFtyb3dJbmRleCAtIGV4dHJhUm93Q291bnQsIC4uLmdyaWQuaWRLZXlQYXRoXSkpICE9PSAtMSkge1xuICAgICAgICByb3dDbGFzc05hbWVzLnB1c2goJ2lzLXNlbGVjdGVkJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcHMucm93Q2xhc3NOYW1lR2V0dGVyKSB7XG4gICAgICByZXR1cm4gcm93Q2xhc3NOYW1lcy5qb2luKCcgJykgKyAnICcgKyB0aGlzLnByb3BzLnJvd0NsYXNzTmFtZUdldHRlcihyb3dJbmRleCk7XG4gICAgfVxuICAgIHJldHVybiByb3dDbGFzc05hbWVzLmpvaW4oJyAnKTtcbiAgfTtcblxuICBnZXRDZWxsTWVzc2FnZXMgPSAocm93SW5kZXgsIGNvbCwgY2VsbFR5cGUpID0+IHtcbiAgICBjb25zdCByZXR1cm5EYXRhID0ge307XG4gICAgaWYgKCF0aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoIHx8ICFjb2wudmFsdWVLZXlQYXRoKSB7XG4gICAgICByZXR1cm4gcmV0dXJuRGF0YTtcbiAgICB9XG4gICAgbGV0IGluZm9NZXNzYWdlO1xuICAgIGxldCBlcnJvck1lc3NhZ2U7XG4gICAgbGV0IHdhcm5pbmdNZXNzYWdlO1xuICAgIGlmIChjZWxsVHlwZSA9PT0gJ2NyZWF0ZScpIHtcbiAgICAgIGluZm9NZXNzYWdlID0gdGhpcy5wcm9wcy5jcmVhdGVDZWxsTWVzc2FnZXMuZ2V0SW4oWydpbmZvJywgcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgIGVycm9yTWVzc2FnZSA9IHRoaXMucHJvcHMuY3JlYXRlQ2VsbE1lc3NhZ2VzLmdldEluKFsnZXJyb3InLCByb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgd2FybmluZ01lc3NhZ2UgPSB0aGlzLnByb3BzLmNyZWF0ZUNlbGxNZXNzYWdlcy5nZXRJbihbXG4gICAgICAgICd3YXJuaW5nJyxcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIC4uLmNvbC52YWx1ZUtleVBhdGgsXG4gICAgICBdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgICAgaW5mb01lc3NhZ2UgPSB0aGlzLnByb3BzLmNlbGxNZXNzYWdlcy5nZXRJbihbJ2luZm8nLCBpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgZXJyb3JNZXNzYWdlID0gdGhpcy5wcm9wcy5jZWxsTWVzc2FnZXMuZ2V0SW4oWydlcnJvcicsIGlkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgICB3YXJuaW5nTWVzc2FnZSA9IHRoaXMucHJvcHMuY2VsbE1lc3NhZ2VzLmdldEluKFsnd2FybmluZycsIGlkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgfVxuICAgIGlmIChpbmZvTWVzc2FnZSkge1xuICAgICAgcmV0dXJuRGF0YS5pbmZvTWVzc2FnZSA9IGluZm9NZXNzYWdlO1xuICAgIH1cbiAgICBpZiAoZXJyb3JNZXNzYWdlKSB7XG4gICAgICByZXR1cm5EYXRhLmVycm9yTWVzc2FnZSA9IGVycm9yTWVzc2FnZTtcbiAgICB9XG4gICAgaWYgKHdhcm5pbmdNZXNzYWdlKSB7XG4gICAgICByZXR1cm5EYXRhLndhcm5pbmdNZXNzYWdlID0gd2FybmluZ01lc3NhZ2U7XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5EYXRhO1xuICB9O1xuXG4gIGdldFNjcm9sbFRvUm93ID0gKCkgPT4ge1xuICAgIGxldCBzY3JvbGxUb1JvdztcbiAgICBpZiAodGhpcy5wcm9wcy5pc0NyZWF0aW5nICYmICF0aGlzLmZvY3VzVG9DcmVhdGVDZWxsKSByZXR1cm4gc2Nyb2xsVG9Sb3c7XG4gICAgaWYgKHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwpIHtcbiAgICAgIGNvbnN0IHNjcm9sbE5ld1JvdyA9IHRoaXMucHJvcHMuY3JlYXRlRGF0YS5zaXplIC0gMTtcbiAgICAgIGlmIChzY3JvbGxOZXdSb3cgPj0gMCkge1xuICAgICAgICBzY3JvbGxUb1JvdyA9IHNjcm9sbE5ld1JvdztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMucHJvcHMuaXNFZGl0aW5nICYmICF0aGlzLnByb3BzLnNjcm9sbEluRWRpdE1vZGUpIHtcbiAgICAgICAgc2Nyb2xsVG9Sb3cgPSB0aGlzLnN0YXRlLmN1cnJlbnRSb3c7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzY3JvbGxUb1JvdyA9IHRoaXMucHJvcHMuc2Nyb2xsVG9Sb3c7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIH1cbiAgICAgIGlmIChzY3JvbGxUb1JvdyA9PT0gdW5kZWZpbmVkICYmIHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5zaXplID4gMCkge1xuICAgICAgICBzY3JvbGxUb1JvdyA9IHRoaXMuZ2V0U2VsZWN0ZWRJdGVtSW5kZXgodGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLmZpcnN0KCkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc2Nyb2xsVG9Sb3c7XG4gIH07XG5cbiAgc2V0Rm9jdXNUbyA9IChmb2N1c1RvKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuaXNFZGl0aW5nIHx8IHRoaXMucHJvcHMuaXNDcmVhdGluZykge1xuICAgICAgaWYgKGZvY3VzVG8gJiYgZm9jdXNUby5nZXQoJ3R5cGUnKSAmJiBmb2N1c1RvICE9PSB0aGlzLnByZXZGb2N1c1RvKSB7XG4gICAgICAgIHRoaXNbZm9jdXNUby5nZXQoJ3R5cGUnKV0gPSB0cnVlO1xuICAgICAgICB0aGlzLmZvY3VzVG9MYXN0Um93ID0gZm9jdXNUby5nZXQoJ2ZvY3VzVG9MYXN0Um93Jyk7XG4gICAgICAgIHRoaXMucHJldkZvY3VzVG8gPSBmb2N1c1RvO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBoYW5kbGVDZWxsU2VsZWN0ID0gKGNlbGxUeXBlLCByb3dJbmRleCwgY29sdW1uS2V5KSA9PiAoKSA9PiB7XG4gICAgaWYgKGNlbGxUeXBlID09PSAndmlldycgJiYgdGhpcy5wcm9wcy5jZWxsU2VsZWN0KSB7XG4gICAgICB0aGlzLnByb3BzLmNlbGxTZWxlY3Rpb25DaGFuZ2UoXG4gICAgICAgIHRoaXMucHJvcHMuZ3JpZCxcbiAgICAgICAgTWFwKHtcbiAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICBjb2x1bW5LZXksXG4gICAgICAgIH0pLFxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlQ3JlYXRlQ2VsbFJlZiA9IChyb3dJbmRleCwgY29sKSA9PiAocmVmKSA9PiB7XG4gICAgLy8gRm9jdXMgdG8gY3JlYXRlIGNlbGxcbiAgICBjb25zdCBjb2x1bW5LZXkgPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sKTtcbiAgICBjb25zdCBzZWxlY3RSZWYgPSAhcmVmIHx8IHJlZi5mb2N1cyA/IHJlZiA6IHRoaXMuZ2V0U2VsZWN0UmVmKHJlZik7XG4gICAgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5jcmVhdGVEYXRhLnNpemVcbiAgICAgICYmIHRoaXMucHJvcHMuY3JlYXRlRGF0YS5zaXplID09PSByb3dJbmRleCArIDFcbiAgICAgICYmIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGxcbiAgICAgICYmICF0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2NyZWF0ZScpXG4gICAgICAmJiBzZWxlY3RSZWZcbiAgICApIHtcbiAgICAgIHNlbGVjdFJlZi5mb2N1cygpO1xuICAgICAgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZUFycm93TmF2aWdhdGlvbikge1xuICAgICAgdGhpcy5jcmVhdGVDZWxsUmVmc1tgJHt0aGlzLnByb3BzLmdyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4fWBdID0gcmVmO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVFZGl0Q2VsbFJlZiA9IChyb3dJbmRleCwgY29sKSA9PiAocmVmKSA9PiB7XG4gICAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCk7XG4gICAgaWYgKHRoaXMuZm9jdXNUb0VkaXRDZWxsICYmICF0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2VkaXQnKSkge1xuICAgICAgY29uc3Qgc2VsZWN0ZWRSb3dJbmRleCA9IHRoaXMuZm9jdXNUb0xhc3RSb3cgJiYgdGhpcy5wcm9wcy5kYXRhLnNpemUgPiAwXG4gICAgICAgID8gdGhpcy5wcm9wcy5kYXRhLnNpemUgLSAxXG4gICAgICAgIDogdGhpcy5nZXRTZWxlY3RlZEl0ZW1JbmRleCh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuZmlyc3QoKSk7XG5cbiAgICAgIGNvbnN0IHsgc2VsZWN0ZWRDZWxsIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3Qgc2VsZWN0UmVmID0gIXJlZiB8fCByZWYuZm9jdXMgPyByZWYgOiB0aGlzLmdldFNlbGVjdFJlZihyZWYpO1xuICAgICAgaWYgKHNlbGVjdGVkQ2VsbC5zaXplID4gMCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgc2VsZWN0ZWRDZWxsLmdldCgncm93SW5kZXgnKSA9PT0gcm93SW5kZXhcbiAgICAgICAgICAmJiBzZWxlY3RlZENlbGwuZ2V0KCdjb2x1bW5LZXknKSA9PT0gY29sdW1uS2V5XG4gICAgICAgICAgJiYgc2VsZWN0UmVmXG4gICAgICAgICkge1xuICAgICAgICAgIHNlbGVjdFJlZi5mb2N1cygpO1xuICAgICAgICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5mb2N1c1RvTGFzdFJvdyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHNlbGVjdGVkUm93SW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZvY3VzVG9MYXN0Um93ID0gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKHNlbGVjdGVkUm93SW5kZXggPT09IHJvd0luZGV4ICYmIHNlbGVjdFJlZikge1xuICAgICAgICBzZWxlY3RSZWYuZm9jdXMoKTtcbiAgICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mb2N1c1RvTGFzdFJvdyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5lbmFibGVBcnJvd05hdmlnYXRpb24pIHtcbiAgICAgIHRoaXMuY2VsbFJlZnNbYCR7dGhpcy5wcm9wcy5ncmlkLmlkfV8ke2NvbHVtbktleX1fJHtyb3dJbmRleH1gXSA9IHJlZjtcbiAgICB9XG4gIH07XG5cbiAgbW92ZUNlbGxGb2N1cyA9IChuZXh0RWxlbWVudCwgcm93SW5kZXgsIGNvbHVtbkluZGV4KSA9PiB7XG4gICAgY29uc3QgZWxlbWVudFR5cGVzID0gWyd0ZXh0JywgJ2NoZWNrYm94J107XG4gICAgaWYgKG5leHRFbGVtZW50ICYmIGVsZW1lbnRUeXBlcy5pbmNsdWRlcyhuZXh0RWxlbWVudC50eXBlKSkge1xuICAgICAgaWYgKHJvd0luZGV4ICE9PSAtMSB8fCBjb2x1bW5JbmRleCAhPT0gLTEpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgY3VycmVudENvbHVtbjogY29sdW1uSW5kZXgsXG4gICAgICAgICAgY3VycmVudFJvdzogcm93SW5kZXgsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmIChuZXh0RWxlbWVudC50eXBlID09PSAnY2hlY2tib3gnKSBuZXh0RWxlbWVudC5mb2N1cygpO1xuICAgICAgICBpZiAobmV4dEVsZW1lbnQudHlwZSA9PT0gJ3RleHQnKSBuZXh0RWxlbWVudC5zZWxlY3QoKTtcbiAgICAgIH0sIDUwKTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlU2VsZWN0QWxsQ2hlY2tCb3hPbkNoYW5nZSA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLnNlbGVjdEFsbEl0ZW1zQ2hhbmdlKHRoaXMucHJvcHMuZ3JpZCk7XG4gIH07XG5cbiAgaGFuZGxlU2VsZWN0aW9uQ2hlY2tCb3hPbkNoYW5nZSA9IHJvd0luZGV4ID0+ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLml0ZW1TZWxlY3Rpb25DaGFuZ2UodGhpcy5wcm9wcy5ncmlkLCByb3dJbmRleCwgdHJ1ZSwgZmFsc2UpO1xuICB9O1xuXG4gIGdlbmVyYXRlQ29sdW1ucyA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBkYXRhLFxuICAgICAgc2VsZWN0ZWRJdGVtcyxcbiAgICAgIGRhdGVGb3JtYXQsXG4gICAgICB0aG91c2FuZFNlcGFyYXRvcixcbiAgICAgIGRlY2ltYWxTZXBhcmF0b3IsXG4gICAgICBncmlkLFxuICAgICAgaW5saW5lRWRpdCxcbiAgICAgIGZpbHRlcmluZyxcbiAgICAgIHJlZ2lvbixcbiAgICAgIGludGwsXG4gICAgICBzZWxlY3RDb21wb25lbnRPcHRpb25zLFxuICAgICAgaXNDcmVhdGluZyxcbiAgICAgIGV4dHJhQ29sdW1uLFxuICAgICAgcm93U2VsZWN0Q2hlY2tib3hDb2x1bW4sXG4gICAgICBzaG93U2VsZWN0QWxsQ2hlY2tib3gsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBjb2x1bW5zID0gW107XG4gICAgY29uc3QgdGFiSW5kZXggPSBTdHJpbmcodGhpcy5wcm9wcy50YWJJbmRleCk7XG4gICAgaWYgKGV4dHJhQ29sdW1uKSB7XG4gICAgICBjb2x1bW5zLnB1c2goe1xuICAgICAgICB3aWR0aDogZXh0cmFDb2x1bW4ud2lkdGggfHwgNDAsXG4gICAgICAgIGlzUmVzaXphYmxlOiAhIWV4dHJhQ29sdW1uLmlzUmVzaXphYmxlLFxuICAgICAgICBpc1NvcnRhYmxlOiBmYWxzZSxcbiAgICAgICAgY29sdW1uS2V5OiAnZXh0cmFDb2x1bW4nLFxuICAgICAgICBjZWxsOiByb3dJbmRleCA9PiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1leHRyYS1jb2x1bW4tY2VsbCBuby1yb3ctc2VsZWN0XCI+XG4gICAgICAgICAgICB7ZXh0cmFDb2x1bW4udmFsdWVSZW5kZXIoZGF0YS5nZXQocm93SW5kZXgpLCByb3dJbmRleCl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICksXG4gICAgICAgIGNlbGxFZGl0OiByb3dJbmRleCA9PiAoZXh0cmFDb2x1bW4uY2VsbEVkaXQgPyBleHRyYUNvbHVtbi5jZWxsRWRpdChyb3dJbmRleCkgOiBudWxsKSxcbiAgICAgICAgY2VsbENyZWF0ZTogcm93SW5kZXggPT4gKGV4dHJhQ29sdW1uLmNlbGxDcmVhdGUgPyBleHRyYUNvbHVtbi5jZWxsQ3JlYXRlKHJvd0luZGV4KSA6IG51bGwpLFxuICAgICAgICBjZWxsRmlsdGVyOiByb3dJbmRleCA9PiAoZXh0cmFDb2x1bW4uY2VsbEZpbHRlciA/IGV4dHJhQ29sdW1uLmNlbGxGaWx0ZXIocm93SW5kZXgpIDogbnVsbCksXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocm93U2VsZWN0Q2hlY2tib3hDb2x1bW4pIHtcbiAgICAgIGNvbHVtbnMucHVzaCh7XG4gICAgICAgIHdpZHRoOiA0MCxcbiAgICAgICAgaXNSZXNpemFibGU6IGZhbHNlLFxuICAgICAgICBpc1NvcnRhYmxlOiBmYWxzZSxcbiAgICAgICAgY29sdW1uS2V5OiAnc2VsZWN0aW9uQ2hlY2tib3gnLFxuICAgICAgICBoZWFkZXI6IHNob3dTZWxlY3RBbGxDaGVja2JveCAmJiAoXG4gICAgICAgICAgPENoZWNrYm94XG4gICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRTZWxlY3RBbGxDaGVja0JveC0ke2dyaWQuaWR9YH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLXNlbGVjdC1hbGwtY2hlY2tib3gtY2VsbCBuby1yb3ctc2VsZWN0XCJcbiAgICAgICAgICAgIGNoZWNrZWQ9e2RhdGEuc2l6ZSAhPT0gMCAmJiBkYXRhLnNpemUgPT09IHNlbGVjdGVkSXRlbXMuc2l6ZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVNlbGVjdEFsbENoZWNrQm94T25DaGFuZ2V9XG4gICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSxcbiAgICAgICAgY2VsbDogKHJvd0luZGV4KSA9PiB7XG4gICAgICAgICAgY29uc3Qgcm93SXRlbSA9IGRhdGEuZ2V0KHJvd0luZGV4KTtcbiAgICAgICAgICBjb25zdCBpdGVtSWQgPSByb3dJdGVtLmdldEluKGdyaWQuaWRLZXlQYXRoKTtcbiAgICAgICAgICBjb25zdCBzZWxlY3RlZCA9IHNlbGVjdGVkSXRlbXMuaW5jbHVkZXMoaXRlbUlkKTtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPENoZWNrYm94XG4gICAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZFNlbGVjdENoZWNrQm94LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke3Jvd0luZGV4fWB9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLXNlbGVjdC1jaGVja2JveC1jZWxsIG5vLXJvdy1zZWxlY3RcIlxuICAgICAgICAgICAgICBjaGVja2VkPXtzZWxlY3RlZH1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlU2VsZWN0aW9uQ2hlY2tCb3hPbkNoYW5nZShyb3dJbmRleCl9XG4gICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgY2VsbEVkaXQ6ICgpID0+IG51bGwsXG4gICAgICAgIGNlbGxDcmVhdGU6ICgpID0+IG51bGwsXG4gICAgICAgIGNlbGxGaWx0ZXI6ICgpID0+IG51bGwsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCB2aXNpYmxlQ29sdW1ucyA9IFtdO1xuICAgIHRoaXMucHJvcHMudmlzaWJsZUNvbHVtbnMuZm9yRWFjaCgodmlzaWJsZUNvbHVtbktleSkgPT4ge1xuICAgICAgdGhpcy5wcm9wcy5jb2x1bW5zLmZvckVhY2goKG9yZ0NvbCkgPT4ge1xuICAgICAgICBpZiAoVXRpbHMuZ2V0Q29sdW1uS2V5KG9yZ0NvbCkgPT09IHZpc2libGVDb2x1bW5LZXkpIHtcbiAgICAgICAgICB2aXNpYmxlQ29sdW1ucy5wdXNoKG9yZ0NvbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHZpc2libGVDb2x1bW5zLmZvckVhY2goKGNvbCkgPT4ge1xuICAgICAgY29uc3QgdmFsdWVFbXB0eUNoZWNrZXIgPSBVdGlscy5nZXRWYWx1ZUVtcHR5Q2hlY2tlcihjb2wpO1xuICAgICAgLy8gQ2VsbCB2YWx1ZSByZW5kZXJpbmdcbiAgICAgIGNvbnN0IHZhbHVlUmVuZGVyID0gKHJvd0luZGV4LCBmb3JtYXQpID0+IHtcbiAgICAgICAgY29uc3QgdmFsID0gZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbCkpIHtcbiAgICAgICAgICByZXR1cm4gY29sLmlzUmVxdWlyZWQgPyA8TSBpZD1cIkdyaWQuVmFsdWVJc01pc3NpbmdcIiAvPiA6ICcnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3JtYXQgPyBmb3JtYXQodmFsKSA6IHZhbDtcbiAgICAgIH07XG5cbiAgICAgIGxldCBjb2x1bW4gPSBHcmlkQ29sdW1uU2VydmljZS5iYXNlQ29sdW1uKGNvbCk7XG4gICAgICAvLyBDb2xsZWN0IGNvbHVtbiBmdW5jdGlvbnMgaW50byBvbmUgT2JqZWN0XG4gICAgICBjb25zdCBjb2x1bW5GdW5jdGlvbnMgPSB7XG4gICAgICAgIGVkaXQ6IHtcbiAgICAgICAgICBnZXRJdGVtVmFsdWU6IHRoaXMuZ2V0RWRpdEl0ZW1WYWx1ZSxcbiAgICAgICAgICBvbkNlbGxWYWx1ZUNoYW5nZTogdGhpcy5vbkVkaXRDZWxsVmFsdWVDaGFuZ2UsXG4gICAgICAgICAgb25DZWxsQmx1cjogdGhpcy5vbkVkaXRDZWxsQmx1cixcbiAgICAgICAgICBvbkNlbGxGb2N1czogdGhpcy5vbkNlbGxGb2N1cyxcbiAgICAgICAgICBvbkNlbGxLZXlEb3duOiB0aGlzLm9uRWRpdENlbGxLZXlEb3duLFxuICAgICAgICAgIGhhbmRsZUNlbGxSZWY6IHRoaXMuaGFuZGxlRWRpdENlbGxSZWYsXG4gICAgICAgIH0sXG4gICAgICAgIGNyZWF0ZToge1xuICAgICAgICAgIGdldEl0ZW1WYWx1ZTogdGhpcy5nZXRDcmVhdGVJdGVtVmFsdWUsXG4gICAgICAgICAgb25DZWxsVmFsdWVDaGFuZ2U6IHRoaXMub25DcmVhdGVDZWxsVmFsdWVDaGFuZ2UsXG4gICAgICAgICAgb25DZWxsQmx1cjogdGhpcy5vbkNyZWF0ZUNlbGxCbHVyLFxuICAgICAgICAgIG9uQ2VsbEZvY3VzOiB0aGlzLm9uQ2VsbEZvY3VzLFxuICAgICAgICAgIG9uQ2VsbEtleURvd246IHRoaXMub25DcmVhdGVDZWxsS2V5RG93bixcbiAgICAgICAgICBoYW5kbGVDZWxsUmVmOiB0aGlzLmhhbmRsZUNyZWF0ZUNlbGxSZWYsXG4gICAgICAgIH0sXG4gICAgICAgIGZpbHRlcjoge1xuICAgICAgICAgIGdldEl0ZW1WYWx1ZTogdGhpcy5nZXRGaWx0ZXJJdGVtVmFsdWUsXG4gICAgICAgICAgZ2V0SXRlbU11bHRpVmFsdWU6IHRoaXMuZ2V0RmlsdGVySXRlbU11bHRpVmFsdWUsXG4gICAgICAgICAgb25DZWxsVmFsdWVDaGFuZ2U6IHRoaXMub25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UsXG4gICAgICAgICAgb25DZWxsTXVsdGlWYWx1ZUJsdXI6IHRoaXMub25GaWx0ZXJDZWxsTXVsdGlWYWx1ZUJsdXIsXG4gICAgICAgICAgb25DZWxsTXVsdGlWYWx1ZUNoYW5nZTogdGhpcy5vbkZpbHRlckNlbGxNdWx0aVZhbHVlQ2hhbmdlLFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgLy8gaGFuZGxlIGNvbHVtbi5jZWxsIC8gY29sdW1uLmNlbGxFZGl0IC8gY29sdW1uLmNlbGxDcmVhdGUgLyBjb2x1bW4uY2VsbEZpbHRlclxuICAgICAgY29uc3QgY2VsbFByb3BzID0ge1xuICAgICAgICBncmlkLFxuICAgICAgICBkYXRhLFxuICAgICAgICBkYXRlRm9ybWF0LFxuICAgICAgICB0aG91c2FuZFNlcGFyYXRvcixcbiAgICAgICAgZGVjaW1hbFNlcGFyYXRvcixcbiAgICAgICAgc2VsZWN0Q29tcG9uZW50T3B0aW9ucyxcbiAgICAgIH07IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIGNvbHVtbiA9IEdyaWRDb2x1bW5TZXJ2aWNlLmNvbHVtbkNlbGwoY29sdW1uLCBjZWxsUHJvcHMsIGNvbCwgdmFsdWVSZW5kZXIpO1xuXG4gICAgICAvLyBoYW5kbGUgY29sdW1uQ29tcG9uZW50VHlwZXNcbiAgICAgIGNvbnN0IGNvbXBvbmVudFR5cGVQcm9wcyA9IHtcbiAgICAgICAgLi4uY2VsbFByb3BzLFxuICAgICAgICBpbmxpbmVFZGl0LFxuICAgICAgICBmaWx0ZXJpbmcsXG4gICAgICAgIHJlZ2lvbixcbiAgICAgICAgaW50bCxcbiAgICAgICAgc2VsZWN0Q29tcG9uZW50T3B0aW9ucyxcbiAgICAgIH07IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIGNvbHVtbiA9IEdyaWRDb2x1bW5TZXJ2aWNlLmNvbHVtbkNvbXBvbmVudFR5cGUoXG4gICAgICAgIGNvbHVtbixcbiAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgIGNvbXBvbmVudFR5cGVQcm9wcyxcbiAgICAgICAgY29sLFxuICAgICAgICBjb2x1bW5GdW5jdGlvbnMsXG4gICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZSxcbiAgICAgICk7XG4gICAgICBjb2x1bW5zLnB1c2goY29sdW1uKTtcbiAgICB9KTtcblxuICAgIGlmIChpc0NyZWF0aW5nKSB7XG4gICAgICBjb2x1bW5zLnB1c2goe1xuICAgICAgICB3aWR0aDogMzcsXG4gICAgICAgIGlzUmVzaXphYmxlOiBmYWxzZSxcbiAgICAgICAgY29sdW1uS2V5OiAncmVtb3ZlTmV3SXRlbScsXG4gICAgICAgIGNlbGw6ICgpID0+IG51bGwsXG4gICAgICAgIGNlbGxFZGl0OiAoKSA9PiBudWxsLFxuICAgICAgICBjZWxsQ3JlYXRlOiByb3dJbmRleCA9PiAoXG4gICAgICAgICAgPEljb25cbiAgICAgICAgICAgIGlkPXtgb2MtZGF0YWdyaWQtbmV3LWl0ZW0tcmVtb3ZlLSR7Z3JpZC5pZH0tJHtyb3dJbmRleH1gfVxuICAgICAgICAgICAgdHlwZT1cImluZGljYXRvclwiXG4gICAgICAgICAgICBuYW1lPVwiZGVsZXRlXCJcbiAgICAgICAgICAgIHdpZHRoPXszMH1cbiAgICAgICAgICAgIGhlaWdodD17MzB9XG4gICAgICAgICAgICBzdHlsZT17eyBwYWRkaW5nOiAnN3B4JyB9fVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdGhpcy5wcm9wcy5yZW1vdmVOZXdJdGVtKGdyaWQsIHJvd0luZGV4KX1cbiAgICAgICAgICAvPlxuICAgICAgICApLFxuICAgICAgICBjZWxsRmlsdGVyOiAoKSA9PiBudWxsLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBjb2x1bW5zO1xuICB9O1xuXG4gIGlzQ2VsbEVkaXRlZCA9IChyb3dJbmRleCwgY29sLCBjZWxsVHlwZSkgPT4ge1xuICAgIGlmIChjZWxsVHlwZSAhPT0gJ2VkaXQnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICByZXR1cm4gISF0aGlzLnByb3BzLmVkaXREYXRhLmdldEluKFtpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICB9O1xuXG4gIGhhbmRsZUFmdGVyQWRkSXRlbSA9ICgpID0+IHtcbiAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsID0gdHJ1ZTtcbiAgfTtcblxuICBoYW5kbGVBZnRlckVkaXRQcmVzcyA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLnNpemUpIHtcbiAgICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gdHJ1ZTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjdXJyZW50Um93OiB1bmRlZmluZWQsXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlQWZ0ZXJWYWxpZGF0aW9uRXJyb3IgPSAoKSA9PiB7XG4gICAgdGhpcy5mb2N1c1RvRXJyb3JDZWxsID0gdHJ1ZTtcbiAgfTtcblxuICBoYW5kbGVSb3dDbGljayA9IChlLCByb3dJbmRleCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnJvd1NlbGVjdCAmJiAhdGhpcy5wcm9wcy5pc0NyZWF0aW5nICYmICF0aGlzLnByb3BzLmlzRWRpdGluZykge1xuICAgICAgaWYgKGUuY3RybEtleSB8fCBlLnNoaWZ0S2V5KSB7XG4gICAgICAgIGRvY3VtZW50LmdldFNlbGVjdGlvbigpLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgfVxuICAgICAgLy8gRG9uJ3QgdHJpZ2dlciBzZWxlY3Rpb24gY2hhbmdlIG9uIHdoZW4gdXNlciBjbGlja3Mgb24gc3BlY2lhbCBjZWxscyBsaWtlIGNoZWNrYm94L2V4dHJhXG4gICAgICAvLyBDaGVjayB0aGF0IGNsaWNrZWQgbm9kZSdzIHBhcmVudCBvciBwYXJlbnQncyBwYXJlbnQgZG9lc24ndCBoYXZlIG5vLXJvdy1zZWxlY3QgY2xhc3NcbiAgICAgIGNvbnN0IHsgcGFyZW50Tm9kZSB9ID0gZS50YXJnZXQ7XG4gICAgICBjb25zdCBwYXJlbnQxY2xhc3MgPSBwYXJlbnROb2RlLmNsYXNzTmFtZSAmJiBwYXJlbnROb2RlLmNsYXNzTmFtZS5pbmRleE9mID8gcGFyZW50Tm9kZS5jbGFzc05hbWUgOiAnJztcbiAgICAgIGNvbnN0IHBhcmVudDJjbGFzcyA9ICAgICAgICBwYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lICYmIHBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUuaW5kZXhPZiAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgID8gcGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZVxuICAgICAgICA6ICcnO1xuICAgICAgY29uc3QgcGFyZW50M2NsYXNzID0gcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgICYmIHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZS5pbmRleE9mIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgPyBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWVcbiAgICAgICAgOiAnJztcbiAgICAgIGNvbnN0IHBhcmVudDRjbGFzcyA9IHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgICYmIHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lLmluZGV4T2YgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICA/IHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgIDogJyc7XG4gICAgICBpZiAoXG4gICAgICAgIHBhcmVudDFjbGFzcy5pbmRleE9mKCduby1yb3ctc2VsZWN0JykgPT09IC0xXG4gICAgICAgICYmIHBhcmVudDJjbGFzcy5pbmRleE9mKCduby1yb3ctc2VsZWN0JykgPT09IC0xXG4gICAgICAgICYmIHBhcmVudDNjbGFzcy5pbmRleE9mKCduby1yb3ctc2VsZWN0JykgPT09IC0xXG4gICAgICAgICYmIHBhcmVudDRjbGFzcy5pbmRleE9mKCduby1yb3ctc2VsZWN0JykgPT09IC0xXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5wcm9wcy5pdGVtU2VsZWN0aW9uQ2hhbmdlKFxuICAgICAgICAgIHRoaXMucHJvcHMuZ3JpZCxcbiAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICB0aGlzLnByb3BzLm11bHRpU2VsZWN0ICYmIGUuY3RybEtleSxcbiAgICAgICAgICB0aGlzLnByb3BzLm11bHRpU2VsZWN0ICYmIGUuc2hpZnRLZXksXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLm9uUm93Q2xpY2spIHtcbiAgICAgIHRoaXMucHJvcHMub25Sb3dDbGljayhlLCByb3dJbmRleCwgdGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCkpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBoYW5kbGVDb250ZXh0TWVudSA9IChlLCByb3dJbmRleCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmNvbnRleHRNZW51SXRlbXMpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgaXRlbVNlbGVjdGlvbkNoYW5nZSwgc2VsZWN0ZWRJdGVtcywgZ3JpZCwgZGF0YSxcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjb250ZXh0TWVudU9wZW46IHRydWUsXG4gICAgICAgIGNvbnRleHRNZW51WDogZS5jbGllbnRYLFxuICAgICAgICBjb250ZXh0TWVudVk6IGUuY2xpZW50WSxcbiAgICAgIH0pO1xuICAgICAgLy8gSWYgY2xpY2tlZCBpdGVtIGlzIG5vdCBzZWxlY3RlZCwgY2hhbmdlIHNlbGVjdGlvbiB0byBpdFxuICAgICAgaWYgKCFzZWxlY3RlZEl0ZW1zLmluY2x1ZGVzKGRhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi5ncmlkLmlkS2V5UGF0aF0pKSkge1xuICAgICAgICBpdGVtU2VsZWN0aW9uQ2hhbmdlKGdyaWQsIHJvd0luZGV4KTtcbiAgICAgIH1cbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkRvY3VtZW50Q2xpY2spO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBoYW5kbGVSb3dIZWlnaHRHZXR0ZXIgPSByb3dJbmRleCA9PiB0aGlzLnByb3BzLnJvd0hlaWdodEdldHRlcihcbiAgICB0aGlzLnByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSxcbiAgICByb3dJbmRleCxcbiAgKTtcblxuICByZW5kZXJDZWxsID0gY29sID0+IChjZWxsUHJvcHMpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBpc0NyZWF0aW5nLCBpc0VkaXRpbmcsIGNyZWF0ZURhdGEsIHNlbGVjdGVkQ2VsbCwgZ3JpZCxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHJvd0luZGV4LCAuLi5wcm9wcyB9ID0gY2VsbFByb3BzO1xuICAgIGxldCBjZWxsO1xuICAgIGxldCBjZWxsVHlwZSA9ICd2aWV3JztcbiAgICBsZXQgZXh0cmFSb3dDb3VudCA9IDA7IC8vIGhvdyBtYW55IHJvd3MgdG8gaWdub3JlIGZyb20gdG9wLCBuZXcgKyBmaWx0ZXIgcm93c1xuICAgIGlmIChpc0NyZWF0aW5nKSBleHRyYVJvd0NvdW50ID0gY3JlYXRlRGF0YS5zaXplO1xuICAgIGNvbnN0IGV4aXN0aW5nUm93c0luZGV4ID0gcm93SW5kZXggLSBleHRyYVJvd0NvdW50O1xuICAgIGlmIChpc0NyZWF0aW5nKSB7XG4gICAgICBpZiAocm93SW5kZXggPD0gZXh0cmFSb3dDb3VudCAtIDEpIHtcbiAgICAgICAgaWYgKGNvbC5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY2VsbCA9IGNvbC5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNyZWF0ZUNlbGxSZWYocm93SW5kZXgsIGNvbCksXG4gICAgICAgICAgICB0aGlzLm9uQ3JlYXRlQ2VsbEtleURvd24ocm93SW5kZXgsIGNvbCksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjZWxsVHlwZSA9ICdjcmVhdGUnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNlbGwgPSBudWxsO1xuICAgICAgICAgIGNlbGxUeXBlID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2VsbCA9IGNvbC5jZWxsKFxuICAgICAgICAgIGV4aXN0aW5nUm93c0luZGV4LFxuICAgICAgICAgIHRoaXMuaGFuZGxlQ3JlYXRlQ2VsbFJlZihleGlzdGluZ1Jvd3NJbmRleCwgY29sKSxcbiAgICAgICAgICB0aGlzLm9uQ3JlYXRlQ2VsbEtleURvd24oZXhpc3RpbmdSb3dzSW5kZXgsIGNvbCksXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc0VkaXRpbmcgJiYgY29sLmNlbGxFZGl0KSB7XG4gICAgICBjZWxsID0gY29sLmNlbGxFZGl0KFxuICAgICAgICBleGlzdGluZ1Jvd3NJbmRleCxcbiAgICAgICAgdGhpcy5oYW5kbGVFZGl0Q2VsbFJlZihleGlzdGluZ1Jvd3NJbmRleCwgY29sKSxcbiAgICAgICAgdGhpcy5vbkVkaXRDZWxsS2V5RG93bihleGlzdGluZ1Jvd3NJbmRleCwgY29sKSxcbiAgICAgICk7XG4gICAgICBjZWxsVHlwZSA9ICdlZGl0JztcbiAgICB9IGVsc2Uge1xuICAgICAgY2VsbCA9IGNvbC5jZWxsKFxuICAgICAgICBleGlzdGluZ1Jvd3NJbmRleCxcbiAgICAgICAgdGhpcy5oYW5kbGVFZGl0Q2VsbFJlZihleGlzdGluZ1Jvd3NJbmRleCwgY29sKSxcbiAgICAgICAgdGhpcy5vbkVkaXRDZWxsS2V5RG93bihleGlzdGluZ1Jvd3NJbmRleCwgY29sKSxcbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnN0IGlzU3BlY2lhbCA9IHByb3BzLmNvbHVtbktleSA9PT0gJ3NlbGVjdGlvbkNoZWNrYm94JyB8fCBwcm9wcy5jb2x1bW5LZXkgPT09ICdleHRyYUNvbHVtbic7XG4gICAgaWYgKChjZWxsVHlwZSA9PT0gJ3ZpZXcnIHx8IGNlbGxUeXBlID09PSAnZWRpdCcgfHwgY2VsbFR5cGUgPT09ICdjcmVhdGUnKSAmJiAhaXNTcGVjaWFsKSB7XG4gICAgICBjb25zdCBnZXRSb3dJbmRleCA9IGNlbGxUeXBlID09PSAnY3JlYXRlJyA/IHJvd0luZGV4IDogcm93SW5kZXggLSBleHRyYVJvd0NvdW50O1xuICAgICAgY29uc3QgbWVzc2FnZURhdGEgPSB0aGlzLmdldENlbGxNZXNzYWdlcyhnZXRSb3dJbmRleCwgY29sLCBjZWxsVHlwZSk7XG4gICAgICBjb25zdCBpc0VkaXRlZCA9IHRoaXMuaXNDZWxsRWRpdGVkKGdldFJvd0luZGV4LCBjb2wsIGNlbGxUeXBlKTtcbiAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IHNlbGVjdGVkQ2VsbC5nZXQoJ3Jvd0luZGV4JykgPT09IHJvd0luZGV4XG4gICAgICAgICYmIHNlbGVjdGVkQ2VsbC5nZXQoJ2NvbHVtbktleScpID09PSBwcm9wcy5jb2x1bW5LZXlcbiAgICAgICAgPyAnb2MtZGF0YWdyaWQtY2VsbCBpcy1zZWxlY3RlZCdcbiAgICAgICAgOiAnb2MtZGF0YWdyaWQtY2VsbCc7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Q2VsbFxuICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgICAgICBzdHlsZT17Y29sLnN0eWxlfVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2VsbFNlbGVjdChjZWxsVHlwZSwgcm93SW5kZXgsIHByb3BzLmNvbHVtbktleSl9XG4gICAgICAgID5cbiAgICAgICAgICA8Q2VsbFRvb2x0aXBcbiAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZENlbGwtJHtncmlkLmlkfS0ke3Byb3BzLmNvbHVtbktleX0tJHtyb3dJbmRleH1gfVxuICAgICAgICAgICAgaXNFZGl0ZWQ9e2lzRWRpdGVkfVxuICAgICAgICAgICAgaXNFcnJvcj17ISFtZXNzYWdlRGF0YS5lcnJvck1lc3NhZ2V9XG4gICAgICAgICAgICBpc1dhcm5pbmc9eyEhbWVzc2FnZURhdGEud2FybmluZ01lc3NhZ2V9XG4gICAgICAgICAgICBpbmZvTWVzc2FnZT17bWVzc2FnZURhdGEuaW5mb01lc3NhZ2V9XG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U9e21lc3NhZ2VEYXRhLmVycm9yTWVzc2FnZX1cbiAgICAgICAgICAgIHdhcm5pbmdNZXNzYWdlPXttZXNzYWdlRGF0YS53YXJuaW5nTWVzc2FnZX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7Y2VsbH1cbiAgICAgICAgICA8L0NlbGxUb29sdGlwPlxuICAgICAgICA8L0NlbGw+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPENlbGwgey4uLnByb3BzfSBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1jZWxsXCIgc3R5bGU9e2NvbC5zdHlsZX0+XG4gICAgICAgIHtjZWxsfVxuICAgICAgPC9DZWxsPlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyQ29sdW1ucyA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBhbGxEYXRhU2l6ZSwgZ3JpZCwgaXNDcmVhdGluZywgaXNCdXN5LCB2aXNpYmxlQ29sdW1ucyxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIWFsbERhdGFTaXplICYmICFpc0J1c3kgJiYgIWlzQ3JlYXRpbmcgJiYgIWdyaWQucGFnaW5hdGlvbikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPENvbHVtblxuICAgICAgICAgIGNvbHVtbktleT1cImRhdGFFbXB0eUNvbHVtblwiXG4gICAgICAgICAgaGVhZGVyPXsoXG4gICAgICAgICAgICA8Q2VsbCBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInIH19PlxuICAgICAgICAgICAgICA8TSBpZD1cIkdyaWQuTm9JdGVtc1wiIC8+XG4gICAgICAgICAgICA8L0NlbGw+XG4pfVxuICAgICAgICAgIHdpZHRoPXsxMH1cbiAgICAgICAgICBpc1Jlc2l6YWJsZT17ZmFsc2V9XG4gICAgICAgICAgZmxleEdyb3c9ezF9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoIXZpc2libGVDb2x1bW5zLnNpemUpIHtcbiAgICAgIGlmIChpc0J1c3kpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8Q29sdW1uXG4gICAgICAgICAgICBjb2x1bW5LZXk9XCJkYXRhRW1wdHlDb2x1bW5cIlxuICAgICAgICAgICAgaGVhZGVyPXs8Q2VsbD4mbmJzcDs8L0NlbGw+fVxuICAgICAgICAgICAgd2lkdGg9ezEwfVxuICAgICAgICAgICAgaXNSZXNpemFibGU9e2ZhbHNlfVxuICAgICAgICAgICAgZmxleEdyb3c9ezF9XG4gICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxDb2x1bW5cbiAgICAgICAgICBjb2x1bW5LZXk9XCJkYXRhRW1wdHlDb2x1bW5cIlxuICAgICAgICAgIGhlYWRlcj17KFxuICAgICAgICAgICAgPENlbGwgc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICAgICAgPE0gaWQ9XCJHcmlkLk5vQ29sdW1uc1wiIC8+XG4gICAgICAgICAgICA8L0NlbGw+XG4pfVxuICAgICAgICAgIHdpZHRoPXsxMH1cbiAgICAgICAgICBpc1Jlc2l6YWJsZT17ZmFsc2V9XG4gICAgICAgICAgZmxleEdyb3c9ezF9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCBjb2x1bW5zID0gdGhpcy5nZW5lcmF0ZUNvbHVtbnMoKTtcbiAgICBpZiAoY29sdW1ucy5sZW5naHQgPT09IDApIHJldHVybiBudWxsO1xuICAgIHJldHVybiBjb2x1bW5zLm1hcChjb2wgPT4gKFxuICAgICAgPENvbHVtblxuICAgICAgICBrZXk9e2NvbC5jb2x1bW5LZXl9XG4gICAgICAgIGNvbHVtbktleT17Y29sLmNvbHVtbktleX1cbiAgICAgICAgaGVhZGVyPXsoXG4gICAgICAgICAgPEhlYWRlckNlbGxcbiAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZEhlYWRlci0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2wuY29sdW1uS2V5fWB9XG4gICAgICAgICAgICBncmlkPXt0aGlzLnByb3BzLmdyaWR9XG4gICAgICAgICAgICBjb2x1bW5zPXt0aGlzLnByb3BzLmNvbHVtbnN9XG4gICAgICAgICAgICBjb2x1bW49e2NvbH1cbiAgICAgICAgICAgIGN1cnJlbnRTb3J0Q29sdW1uPXt0aGlzLnByb3BzLnNvcnRDb2x1bW59XG4gICAgICAgICAgICBjdXJyZW50U29ydE9yZGVyPXt0aGlzLnByb3BzLnNvcnRPcmRlcn1cbiAgICAgICAgICAgIG9uU29ydENoYW5nZT17dGhpcy5wcm9wcy5zb3J0Q2hhbmdlfVxuICAgICAgICAgICAgaXNCdXN5PXt0aGlzLnByb3BzLmlzQnVzeX1cbiAgICAgICAgICAgIGZpbHRlcmluZz17dGhpcy5wcm9wcy5maWx0ZXJpbmcgJiYgdGhpcy5wcm9wcy5pc0ZpbHRlcmluZ31cbiAgICAgICAgICAgIHdpZHRoPXt0aGlzLnByb3BzLmNvbHVtbldpZHRocy5nZXQoY29sLmNvbHVtbktleSwgY29sLndpZHRoKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7Y29sLmhlYWRlcn1cbiAgICAgICAgICA8L0hlYWRlckNlbGw+XG4pfVxuICAgICAgICBjZWxsPXt0aGlzLnJlbmRlckNlbGwoY29sKX1cbiAgICAgICAgd2lkdGg9e3RoaXMucHJvcHMuY29sdW1uV2lkdGhzLmdldChjb2wuY29sdW1uS2V5LCBjb2wud2lkdGgpfVxuICAgICAgICBtaW5XaWR0aD17Y29sLm1pbldpZHRofVxuICAgICAgICBtYXhXaWR0aD17Y29sLm1heFdpZHRofVxuICAgICAgICBpc1Jlc2l6YWJsZT17Y29sLmlzUmVzaXphYmxlfVxuICAgICAgICBmbGV4R3Jvdz17Y29sLmZsZXhHcm93ID8gY29sLmZsZXhHcm93IDogMH1cbiAgICAgICAgZml4ZWQ9e2NvbC5maXhlZH1cbiAgICAgICAgZml4ZWRSaWdodD17Y29sLmZpeGVkUmlnaHR9XG4gICAgICAgIGFsbG93Q2VsbHNSZWN5Y2xpbmc9e2NvbC5hbGxvd0NlbGxzUmVjeWNsaW5nfVxuICAgICAgLz5cbiAgICApKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgZ3JpZENsYXNzTmFtZSA9IGNsYXNzTmFtZXMoe1xuICAgICAgJ29jLWRhdGFncmlkLWNvbnRhaW5lcic6IHRydWUsXG4gICAgICAnd2l0aC1hY3Rpb25iYXInOiB0aGlzLnByb3BzLmlubGluZUVkaXQgJiYgIXRoaXMucHJvcHMuZGlzYWJsZUFjdGlvbkJhcixcbiAgICAgICdpcy1idXN5JzogdGhpcy5wcm9wcy5pc0J1c3ksXG4gICAgICAnaXMtZWRpdGluZyc6IHRoaXMucHJvcHMuaXNFZGl0aW5nLFxuICAgICAgJ2lzLWNyZWF0aW5nJzogdGhpcy5wcm9wcy5pc0NyZWF0aW5nLFxuICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICB9KTtcblxuICAgIC8vIGNoZWNrIGlmIHRoZXJlIGlzIGEgbmV3IHJlcXVlc3QgdG8gY2hhbmdlIGVkaXQgbW9kZSBmb2N1c1xuICAgIHRoaXMuc2V0Rm9jdXNUbyh0aGlzLnByb3BzLmZvY3VzVHlwZSk7XG5cbiAgICBsZXQgYWN0aW9uQmFyID0gbnVsbDtcbiAgICBsZXQgYWN0aW9uQmFyUmlnaHQgPSBudWxsO1xuICAgIGxldCBhY3Rpb25CYXJMZWZ0ID0gbnVsbDtcbiAgICBpZiAoXG4gICAgICAodGhpcy5wcm9wcy5hY3Rpb25CYXJcbiAgICAgICAgfHwgdGhpcy5wcm9wcy5pbmxpbmVFZGl0XG4gICAgICAgIHx8IHRoaXMucHJvcHMuZmlsdGVyaW5nXG4gICAgICAgIHx8IHRoaXMucHJvcHMucmVtb3ZpbmcpXG4gICAgICAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlQWN0aW9uQmFyXG4gICAgKSB7XG4gICAgICBhY3Rpb25CYXJSaWdodCA9IChcbiAgICAgICAgPEFjdGlvbkJhciBwb3NpdGlvbj1cInJpZ2h0XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1hY3Rpb25iYXItcmlnaHRcIj57dGhpcy5wcm9wcy5hY3Rpb25CYXJ9PC9kaXY+XG4gICAgICAgICAge3RoaXMucHJvcHMuZmlsdGVyaW5nXG4gICAgICAgICAgICAmJiB0aGlzLnByb3BzLmRpc2FibGVEcm9wZG93blxuICAgICAgICAgICAgJiYgIXRoaXMucHJvcHMuZGlzYWJsZUZpbHRlcmluZ0NvbnRyb2xzICYmIDxGaWx0ZXJpbmdDb250cm9scyB7Li4udGhpcy5wcm9wc30gLz59XG4gICAgICAgICAge3RoaXMucHJvcHMuaW5saW5lRWRpdCAmJiAoXG4gICAgICAgICAgICA8SW5saW5lRWRpdENvbnRyb2xzXG4gICAgICAgICAgICAgIGFmdGVyQWRkSXRlbT17dGhpcy5oYW5kbGVBZnRlckFkZEl0ZW19XG4gICAgICAgICAgICAgIGFmdGVyRWRpdFByZXNzPXt0aGlzLmhhbmRsZUFmdGVyRWRpdFByZXNzfVxuICAgICAgICAgICAgICBhZnRlclZhbGlkYXRpb25FcnJvcj17dGhpcy5oYW5kbGVBZnRlclZhbGlkYXRpb25FcnJvcn1cbiAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG4gICAgICAgICAgeyh0aGlzLnByb3BzLmRyb3Bkb3duTWVudUl0ZW1zXG4gICAgICAgICAgICB8fCB0aGlzLnByb3BzLnJlbW92aW5nXG4gICAgICAgICAgICB8fCB0aGlzLnByb3BzLmNvbHVtblNldHRpbmdzXG4gICAgICAgICAgICB8fCAodGhpcy5wcm9wcy5maWx0ZXJpbmcgJiYgIXRoaXMucHJvcHMuZGlzYWJsZURyb3Bkb3duKSkgJiYgKFxuICAgICAgICAgICAgPERyb3Bkb3duQ29udHJvbHMgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9BY3Rpb25CYXI+XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5hY3Rpb25CYXJMZWZ0IHx8IHRoaXMucHJvcHMuZ3JpZEhlYWRlcikge1xuICAgICAgYWN0aW9uQmFyTGVmdCA9IChcbiAgICAgICAgPEFjdGlvbkJhciBwb3NpdGlvbj1cImxlZnRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWdyaWRoZWFkZXJcIj57dGhpcy5wcm9wcy5ncmlkSGVhZGVyfTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtYWN0aW9uYmFyLWxlZnRcIj57dGhpcy5wcm9wcy5hY3Rpb25CYXJMZWZ0fTwvZGl2PlxuICAgICAgICA8L0FjdGlvbkJhcj5cbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChhY3Rpb25CYXJMZWZ0IHx8IGFjdGlvbkJhclJpZ2h0KSB7XG4gICAgICBhY3Rpb25CYXIgPSAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtYWN0aW9uYmFyLWNvbnRhaW5lclwiPlxuICAgICAgICAgIHthY3Rpb25CYXJMZWZ0fVxuICAgICAgICAgIHthY3Rpb25CYXJSaWdodH1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgICBsZXQgcm93c0NvdW50ID0gdGhpcy5wcm9wcy5yb3dzQ291bnQgfHwgdGhpcy5wcm9wcy5yb3dzQ291bnQgPT09IDBcbiAgICAgID8gdGhpcy5wcm9wcy5yb3dzQ291bnRcbiAgICAgIDogdGhpcy5wcm9wcy5kYXRhLnNpemU7XG4gICAgaWYgKHRoaXMucHJvcHMuaXNDcmVhdGluZykgcm93c0NvdW50ICs9IHRoaXMucHJvcHMuY3JlYXRlRGF0YS5zaXplO1xuICAgIGlmICghdGhpcy5wcm9wcy52aXNpYmxlQ29sdW1ucy5zaXplKSByb3dzQ291bnQgPSAwO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPXtgb2MtZGF0YWdyaWQtJHt0aGlzLnByb3BzLmdyaWQuaWR9YH1cbiAgICAgICAgY2xhc3NOYW1lPXtncmlkQ2xhc3NOYW1lfVxuICAgICAgICBzdHlsZT17dGhpcy5wcm9wcy5jb250YWluZXJTdHlsZX1cbiAgICAgID5cbiAgICAgICAge3RoaXMucHJvcHMuaXNCdXN5ICYmIDxTcGlubmVyIC8+fVxuICAgICAgICB7dGhpcy5zdGF0ZS5jb250ZXh0TWVudU9wZW4gJiYgKFxuICAgICAgICAgIDxDb250ZXh0TWVudVxuICAgICAgICAgICAgeD17dGhpcy5zdGF0ZS5jb250ZXh0TWVudVh9XG4gICAgICAgICAgICB5PXt0aGlzLnN0YXRlLmNvbnRleHRNZW51WX1cbiAgICAgICAgICAgIGlzVmlzaWJsZT17dGhpcy5zdGF0ZS5jb250ZXh0TWVudU9wZW59XG4gICAgICAgICAgICBjb250ZXh0TWVudUl0ZW1zPXt0aGlzLnByb3BzLmNvbnRleHRNZW51SXRlbXN9XG4gICAgICAgICAgICBkYXRhPXt0aGlzLnByb3BzLmRhdGF9XG4gICAgICAgICAgICBncmlkPXt0aGlzLnByb3BzLmdyaWR9XG4gICAgICAgICAgICBzZWxlY3RlZEl0ZW1zPXt0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXN9XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgICAge2FjdGlvbkJhcn1cbiAgICAgICAgPFJlc3BvbnNpdmVGaXhlZERhdGFUYWJsZVxuICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgIGlkPXt0aGlzLnByb3BzLmdyaWQuaWR9XG4gICAgICAgICAgcm93c0NvdW50PXtyb3dzQ291bnR9XG4gICAgICAgICAgaGVhZGVySGVpZ2h0PXtcbiAgICAgICAgICAgICh0aGlzLnByb3BzLmZpbHRlcmluZyAmJiB0aGlzLnByb3BzLmlzRmlsdGVyaW5nKVxuICAgICAgICAgICAgICA/IHRoaXMucHJvcHMuaGVhZGVySGVpZ2h0ICsgdGhpcy5wcm9wcy5maWx0ZXJSb3dIZWlnaHRcbiAgICAgICAgICAgICAgOiB0aGlzLnByb3BzLmhlYWRlckhlaWdodFxuICAgICAgICAgIH1cbiAgICAgICAgICByb3dIZWlnaHQ9e3RoaXMucHJvcHMucm93SGVpZ2h0fVxuICAgICAgICAgIG9uQ29sdW1uUmVzaXplRW5kQ2FsbGJhY2s9e3RoaXMub25Db2x1bW5SZXNpemVFbmRDYWxsYmFja31cbiAgICAgICAgICBpc0NvbHVtblJlc2l6aW5nPXtmYWxzZX1cbiAgICAgICAgICBvblJvd0NsaWNrPXt0aGlzLmhhbmRsZVJvd0NsaWNrfVxuICAgICAgICAgIHNjcm9sbFRvQ29sdW1uPXt0aGlzLnByb3BzLnNjcm9sbFRvQ29sdW1uIHx8IHRoaXMuc3RhdGUuY3VycmVudENvbHVtbn1cbiAgICAgICAgICBzY3JvbGxUb3A9e3RoaXMucHJvcHMuc2Nyb2xsVG9wfVxuICAgICAgICAgIHNjcm9sbFRvUm93PXt0aGlzLmdldFNjcm9sbFRvUm93KCl9XG4gICAgICAgICAgb25Sb3dEb3VibGVDbGljaz17dGhpcy5wcm9wcy5vblJvd0RvdWJsZUNsaWNrfVxuICAgICAgICAgIG9uUm93TW91c2VEb3duPXt0aGlzLnByb3BzLm9uTW91c2VEb3dufVxuICAgICAgICAgIG9uUm93TW91c2VFbnRlcj17dGhpcy5wcm9wcy5vblJvd01vdXNlRW50ZXJ9XG4gICAgICAgICAgb25Sb3dNb3VzZUxlYXZlPXt0aGlzLnByb3BzLm9uUm93TW91c2VMZWF2ZX1cbiAgICAgICAgICBvblNjcm9sbFN0YXJ0PXt0aGlzLnByb3BzLm9uU2Nyb2xsU3RhcnR9XG4gICAgICAgICAgb25TY3JvbGxFbmQ9e3RoaXMucHJvcHMub25TY3JvbGxFbmR9XG4gICAgICAgICAgcm93Q2xhc3NOYW1lR2V0dGVyPXt0aGlzLmdldFJvd0NsYXNzTmFtZX1cbiAgICAgICAgICByb3dIZWlnaHRHZXR0ZXI9e3RoaXMucHJvcHMucm93SGVpZ2h0R2V0dGVyICYmIHRoaXMuaGFuZGxlUm93SGVpZ2h0R2V0dGVyfVxuICAgICAgICAgIG9uQ29udGVudEhlaWdodENoYW5nZT17dGhpcy5wcm9wcy5vbkNvbnRlbnRIZWlnaHRDaGFuZ2V9XG4gICAgICAgICAgb25Sb3dDb250ZXh0TWVudT17dGhpcy5oYW5kbGVDb250ZXh0TWVudX1cbiAgICAgICAgPlxuICAgICAgICAgIHt0aGlzLnJlbmRlckNvbHVtbnMoKX1cbiAgICAgICAgPC9SZXNwb25zaXZlRml4ZWREYXRhVGFibGU+XG4gICAgICAgIHt0aGlzLnByb3BzLmlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW4gJiYgKFxuICAgICAgICAgIDxDb2x1bW5TZXR0aW5nc01vZGFsXG4gICAgICAgICAgICBncmlkPXt0aGlzLnByb3BzLmdyaWR9XG4gICAgICAgICAgICBjb2x1bW5zPXt0aGlzLnByb3BzLmNvbHVtbnN9XG4gICAgICAgICAgICB2aXNpYmxlQ29sdW1ucz17dGhpcy5wcm9wcy52aXNpYmxlQ29sdW1uc31cbiAgICAgICAgICAgIGNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbD17dGhpcy5wcm9wcy5jbG9zZUNvbHVtblNldHRpbmdzTW9kYWx9XG4gICAgICAgICAgICBzYXZlQ29sdW1uU2V0dGluZ3M9e3RoaXMucHJvcHMuc2F2ZUNvbHVtblNldHRpbmdzfVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEYXRhR3JpZDtcbiJdfQ==