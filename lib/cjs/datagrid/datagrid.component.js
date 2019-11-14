"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _immutable = require("immutable");

var _reactRedux = require("react-redux");

var _reactIntl = require("react-intl");

var _fixedDataTable = require("fixed-data-table-2");

var _reactBootstrap = require("react-bootstrap");

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

    _defineProperty(_assertThisInitialized(_this), "handleContextMenuItemClick", function (onClick, selectedItems, selectedData) {
      return function () {
        onClick(selectedItems, selectedData);
      };
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

    _defineProperty(_assertThisInitialized(_this), "renderContextMenu", function () {
      var _this$props14 = _this.props,
          contextMenuItems = _this$props14.contextMenuItems,
          data = _this$props14.data,
          grid = _this$props14.grid,
          selectedItems = _this$props14.selectedItems;
      var _this$state = _this.state,
          contextMenuX = _this$state.contextMenuX,
          contextMenuY = _this$state.contextMenuY;
      var style = {
        display: 'block',
        zIndex: 10000,
        position: 'absolute',
        top: contextMenuY + "px",
        left: contextMenuX + "px"
      };
      var selectedData = data.filter(function (d) {
        return selectedItems.includes(d.getIn(grid.idKeyPath));
      });
      return _react["default"].createElement("ul", {
        className: "dropdown-menu oc-datagrid-context-menu open",
        style: style
      }, contextMenuItems && contextMenuItems.map && contextMenuItems.map(function (item, i) {
        var disabled = item.disabled;

        if (typeof item.disabled === 'function') {
          disabled = item.disabled(selectedItems, selectedData);
        }

        return _react["default"].createElement(_reactBootstrap.MenuItem, {
          key: i // eslint-disable-line
          ,
          header: item.header,
          divider: item.divider,
          disabled: disabled,
          title: item.title,
          onClick: disabled || !item.onClick ? null : _this.handleContextMenuItemClick(item.onClick, selectedItems, selectedData)
        }, item.value);
      }));
    });

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
    }, this.props.isBusy && _react["default"].createElement(_reactSpinner["default"], null), this.state.contextMenuOpen && this.renderContextMenu(), actionBar, _react["default"].createElement(_responsiveFixedDataTable["default"], _extends({}, this.props, {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwib3duUHJvcHMiLCJHUklEIiwiZ3JpZCIsImlzQnVzeSIsImRhdGFncmlkIiwiZ2V0SW4iLCJpZCIsImlzRWRpdGluZyIsImlzQ3JlYXRpbmciLCJpc0ZpbHRlcmluZyIsImlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW4iLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwidmlzaWJsZUNvbHVtbnMiLCJjb2x1bW5XaWR0aHMiLCJzZWxlY3RlZENlbGwiLCJzZWxlY3RlZEl0ZW1zIiwiZGF0YSIsImVkaXREYXRhIiwiY3JlYXRlRGF0YSIsImZpbHRlckRhdGEiLCJjZWxsTWVzc2FnZXMiLCJjcmVhdGVDZWxsTWVzc2FnZXMiLCJhbGxEYXRhU2l6ZSIsInNpemUiLCJsYW5ndWFnZSIsIlV0aWxzIiwiZ2V0TGFuZ3VhZ2UiLCJ1c2VyIiwicmVnaW9uIiwiZ2V0UmVnaW9uIiwiZGF0ZUZvcm1hdCIsImdldERhdGVGb3JtYXQiLCJ0aG91c2FuZFNlcGFyYXRvciIsImdldFRob3VzYW5kU2VwYXJhdG9yIiwiZGVjaW1hbFNlcGFyYXRvciIsImdldERlY2ltYWxTZXBhcmF0b3IiLCJmb3JjZVJlZnJlc2hUaW1lc3RhbXAiLCJnZXQiLCJmb2N1c1R5cGUiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJkYXRhZ3JpZEFjdGlvbnMiLCJEYXRhR3JpZCIsInBhZ2luYXRpb24iLCJpbmplY3RJbnRsIiwicHJvcHMiLCJjb250ZXh0TWVudUl0ZW1zIiwic2V0U3RhdGUiLCJjb250ZXh0TWVudU9wZW4iLCJkb2N1bWVudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJvbkRvY3VtZW50Q2xpY2siLCJuZXdDb2x1bW5XaWR0aCIsImNvbHVtbktleSIsInJlc2l6ZUNvbHVtbiIsInJvd0luZGV4IiwiY29sIiwiZSIsImNyZWF0ZSIsImVuYWJsZUFycm93TmF2aWdhdGlvbiIsImNlbGxSZWZzIiwiY3JlYXRlQ2VsbFJlZnMiLCJhcnJvd0tleXMiLCJLRVlfQ09ERVMiLCJET1dOIiwiVVAiLCJMRUZUIiwiUklHSFQiLCJjb2x1bW5zIiwib25MYXN0Q2VsbFRhYlByZXNzIiwiZ3JpZENvbHVtbnMiLCJnZXRDb2x1bW5LZXlCeUluZGV4IiwiaSIsImdldENvbHVtbktleSIsInJvd3NTaXplIiwiY3VycmVudENlbGwiLCJwcm94eSIsImlzQ3Vyc29yQXRTdGFydCIsInR5cGUiLCJzZWxlY3Rpb25TdGFydCIsImlzQ3Vyc29yQXRFbmQiLCJzZWxlY3Rpb25FbmQiLCJ2YWx1ZSIsImxlbmd0aCIsInNlbGVjdFJlZiIsInNlbGVjdCIsImdldFNlbGVjdFJlZiIsImluY2x1ZGVzIiwia2V5Q29kZSIsInByZXZlbnREZWZhdWx0IiwiRU5URVIiLCJFU0MiLCJhZGROZXdJdGVtIiwiZ2V0Q29sdW1uRGVmYXVsdFZhbHVlcyIsImZvY3VzVG9DcmVhdGVDZWxsIiwibmV4dEVsZW1lbnQiLCJtZW51SXNPcGVuIiwibW92ZUNlbGxGb2N1cyIsIlRBQiIsImNvbHVtbkluZCIsImZpbmRJbmRleCIsImMiLCJ2YWx1ZUtleVBhdGgiLCJqb2luIiwiZGlzYWJsZWQiLCJyb3dJbmQiLCJzaGlmdEtleSIsIm9uQ2VsbEtleURvd24iLCJ2YWx1ZVBhcnNlciIsImV2ZW50T3JEYXRhIiwicmF3VmFsdWUiLCJ0YXJnZXQiLCJ1bmRlZmluZWQiLCJmaWx0ZXJDZWxsVmFsdWVDaGFuZ2UiLCJzZWxlY3RlZEZpbHRlcnMiLCJjcmVhdGVDZWxsVmFsdWVDaGFuZ2UiLCJjb21wb25lbnRUeXBlIiwib25DcmVhdGVWYWx1ZUNoYW5nZSIsIm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlIiwibWF0Y2hWYWx1ZSIsIm9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlIiwibmV3VmFsdWVLZXlQYXRoIiwidiIsIm5ld1ZhbHVlIiwidmFsaWRhdG9ycyIsImNyZWF0ZUNlbGxWYWx1ZVZhbGlkYXRlIiwiZWRpdENlbGxWYWx1ZUNoYW5nZSIsImRhdGFJZCIsImdldERhdGFJZEJ5Um93SW5kZXgiLCJvbkVkaXRWYWx1ZUNoYW5nZSIsIm9uRWRpdENlbGxWYWx1ZUNoYW5nZSIsImVkaXRDZWxsVmFsdWVWYWxpZGF0ZSIsInNlcGFyYXRvciIsIlJlZ0V4cCIsImdldEVkaXRJdGVtVmFsdWUiLCJudW1lcmljVmFsdWUiLCJOdW1iZXIiLCJyZXBsYWNlIiwiZ2V0UmVnRXgiLCJ2YWx1ZU9wdGlvbnMiLCJvbkNyZWF0ZUJsdXIiLCJvbkVkaXRCbHVyIiwiY2VsbFR5cGUiLCJpbnB1dFR5cGUiLCJjZWxsU2VsZWN0aW9uQ2hhbmdlIiwiY2VsbFNlbGVjdCIsImNvbXBvbmVudCIsImlucHV0UmVmIiwiaWRLZXlQYXRoIiwiaW5kZXgiLCJvcHRpb25zIiwiZWRpdFZhbHVlIiwib3JpZ2luYWxWYWx1ZSIsInNlbGVjdE9wdGlvbnMiLCJmaW5kIiwib2JqIiwiU3RyaW5nIiwidmFsIiwidG9KUyIsIm1vZGUiLCJjb21wb25lbnREaXNhYmxlZCIsImRpc2FibGVFZGl0aW5nIiwiZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2giLCJnZXRDcmVhdGVJdGVtVmFsdWUiLCJtYXRjaFZhbHVlS2V5UGF0aCIsInJvd0NsYXNzTmFtZXMiLCJleHRyYVJvd0NvdW50IiwicHVzaCIsImluZGV4T2YiLCJyb3dDbGFzc05hbWVHZXR0ZXIiLCJyZXR1cm5EYXRhIiwiaW5mb01lc3NhZ2UiLCJlcnJvck1lc3NhZ2UiLCJ3YXJuaW5nTWVzc2FnZSIsInNjcm9sbFRvUm93Iiwic2Nyb2xsTmV3Um93Iiwic2Nyb2xsSW5FZGl0TW9kZSIsImN1cnJlbnRSb3ciLCJnZXRTZWxlY3RlZEl0ZW1JbmRleCIsImZpcnN0IiwiZm9jdXNUbyIsInByZXZGb2N1c1RvIiwiZm9jdXNUb0xhc3RSb3ciLCJyZWYiLCJmb2N1cyIsImdldENvbXBvbmVudERpc2FibGVkU3RhdGUiLCJmb2N1c1RvRWRpdENlbGwiLCJzZWxlY3RlZFJvd0luZGV4IiwiY29sdW1uSW5kZXgiLCJlbGVtZW50VHlwZXMiLCJjdXJyZW50Q29sdW1uIiwic2V0VGltZW91dCIsInNlbGVjdEFsbEl0ZW1zQ2hhbmdlIiwiaXRlbVNlbGVjdGlvbkNoYW5nZSIsImlubGluZUVkaXQiLCJmaWx0ZXJpbmciLCJpbnRsIiwic2VsZWN0Q29tcG9uZW50T3B0aW9ucyIsImV4dHJhQ29sdW1uIiwicm93U2VsZWN0Q2hlY2tib3hDb2x1bW4iLCJzaG93U2VsZWN0QWxsQ2hlY2tib3giLCJ0YWJJbmRleCIsIndpZHRoIiwiaXNSZXNpemFibGUiLCJpc1NvcnRhYmxlIiwiY2VsbCIsInZhbHVlUmVuZGVyIiwiY2VsbEVkaXQiLCJjZWxsQ3JlYXRlIiwiY2VsbEZpbHRlciIsImhlYWRlciIsImhhbmRsZVNlbGVjdEFsbENoZWNrQm94T25DaGFuZ2UiLCJyb3dJdGVtIiwiaXRlbUlkIiwic2VsZWN0ZWQiLCJoYW5kbGVTZWxlY3Rpb25DaGVja0JveE9uQ2hhbmdlIiwiZm9yRWFjaCIsInZpc2libGVDb2x1bW5LZXkiLCJvcmdDb2wiLCJ2YWx1ZUVtcHR5Q2hlY2tlciIsImdldFZhbHVlRW1wdHlDaGVja2VyIiwiZm9ybWF0IiwiaXNSZXF1aXJlZCIsImNvbHVtbiIsIkdyaWRDb2x1bW5TZXJ2aWNlIiwiYmFzZUNvbHVtbiIsImNvbHVtbkZ1bmN0aW9ucyIsImVkaXQiLCJnZXRJdGVtVmFsdWUiLCJvbkNlbGxWYWx1ZUNoYW5nZSIsIm9uQ2VsbEJsdXIiLCJvbkVkaXRDZWxsQmx1ciIsIm9uQ2VsbEZvY3VzIiwib25FZGl0Q2VsbEtleURvd24iLCJoYW5kbGVDZWxsUmVmIiwiaGFuZGxlRWRpdENlbGxSZWYiLCJvbkNyZWF0ZUNlbGxCbHVyIiwib25DcmVhdGVDZWxsS2V5RG93biIsImhhbmRsZUNyZWF0ZUNlbGxSZWYiLCJmaWx0ZXIiLCJnZXRGaWx0ZXJJdGVtVmFsdWUiLCJnZXRJdGVtTXVsdGlWYWx1ZSIsImdldEZpbHRlckl0ZW1NdWx0aVZhbHVlIiwib25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UiLCJvbkNlbGxNdWx0aVZhbHVlQmx1ciIsIm9uRmlsdGVyQ2VsbE11bHRpVmFsdWVCbHVyIiwib25DZWxsTXVsdGlWYWx1ZUNoYW5nZSIsIm9uRmlsdGVyQ2VsbE11bHRpVmFsdWVDaGFuZ2UiLCJjZWxsUHJvcHMiLCJjb2x1bW5DZWxsIiwiY29tcG9uZW50VHlwZVByb3BzIiwiY29sdW1uQ29tcG9uZW50VHlwZSIsInBhZGRpbmciLCJyZW1vdmVOZXdJdGVtIiwiZm9jdXNUb0Vycm9yQ2VsbCIsInJvd1NlbGVjdCIsImN0cmxLZXkiLCJnZXRTZWxlY3Rpb24iLCJyZW1vdmVBbGxSYW5nZXMiLCJwYXJlbnROb2RlIiwicGFyZW50MWNsYXNzIiwiY2xhc3NOYW1lIiwicGFyZW50MmNsYXNzIiwicGFyZW50M2NsYXNzIiwicGFyZW50NGNsYXNzIiwibXVsdGlTZWxlY3QiLCJvblJvd0NsaWNrIiwic3RvcFByb3BhZ2F0aW9uIiwiY29udGV4dE1lbnVYIiwiY2xpZW50WCIsImNvbnRleHRNZW51WSIsImNsaWVudFkiLCJhZGRFdmVudExpc3RlbmVyIiwib25DbGljayIsInNlbGVjdGVkRGF0YSIsInJvd0hlaWdodEdldHRlciIsImV4aXN0aW5nUm93c0luZGV4IiwiaXNTcGVjaWFsIiwiZ2V0Um93SW5kZXgiLCJtZXNzYWdlRGF0YSIsImdldENlbGxNZXNzYWdlcyIsImlzRWRpdGVkIiwiaXNDZWxsRWRpdGVkIiwic3R5bGUiLCJoYW5kbGVDZWxsU2VsZWN0IiwidGV4dEFsaWduIiwiZ2VuZXJhdGVDb2x1bW5zIiwibGVuZ2h0IiwibWFwIiwic29ydENoYW5nZSIsInJlbmRlckNlbGwiLCJtaW5XaWR0aCIsIm1heFdpZHRoIiwiZmxleEdyb3ciLCJmaXhlZCIsImZpeGVkUmlnaHQiLCJhbGxvd0NlbGxzUmVjeWNsaW5nIiwiZGlzcGxheSIsInpJbmRleCIsInBvc2l0aW9uIiwidG9wIiwibGVmdCIsImQiLCJpdGVtIiwiZGl2aWRlciIsInRpdGxlIiwiaGFuZGxlQ29udGV4dE1lbnVJdGVtQ2xpY2siLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImludmFsaWRhdGUiLCJyZW5kZXIiLCJncmlkQ2xhc3NOYW1lIiwiZGlzYWJsZUFjdGlvbkJhciIsInNldEZvY3VzVG8iLCJhY3Rpb25CYXIiLCJhY3Rpb25CYXJSaWdodCIsImFjdGlvbkJhckxlZnQiLCJyZW1vdmluZyIsImRpc2FibGVEcm9wZG93biIsImRpc2FibGVGaWx0ZXJpbmdDb250cm9scyIsImhhbmRsZUFmdGVyQWRkSXRlbSIsImhhbmRsZUFmdGVyRWRpdFByZXNzIiwiaGFuZGxlQWZ0ZXJWYWxpZGF0aW9uRXJyb3IiLCJkcm9wZG93bk1lbnVJdGVtcyIsImNvbHVtblNldHRpbmdzIiwiZ3JpZEhlYWRlciIsInJvd3NDb3VudCIsImNvbnRhaW5lclN0eWxlIiwicmVuZGVyQ29udGV4dE1lbnUiLCJoZWFkZXJIZWlnaHQiLCJmaWx0ZXJSb3dIZWlnaHQiLCJyb3dIZWlnaHQiLCJvbkNvbHVtblJlc2l6ZUVuZENhbGxiYWNrIiwiaGFuZGxlUm93Q2xpY2siLCJzY3JvbGxUb0NvbHVtbiIsInNjcm9sbFRvcCIsImdldFNjcm9sbFRvUm93Iiwib25Sb3dEb3VibGVDbGljayIsIm9uTW91c2VEb3duIiwib25Sb3dNb3VzZUVudGVyIiwib25Sb3dNb3VzZUxlYXZlIiwib25TY3JvbGxTdGFydCIsIm9uU2Nyb2xsRW5kIiwiZ2V0Um93Q2xhc3NOYW1lIiwiaGFuZGxlUm93SGVpZ2h0R2V0dGVyIiwib25Db250ZW50SGVpZ2h0Q2hhbmdlIiwiaGFuZGxlQ29udGV4dE1lbnUiLCJyZW5kZXJDb2x1bW5zIiwiY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsIiwic2F2ZUNvbHVtblNldHRpbmdzIiwiY2hpbGRyZW4iLCJSZWFjdCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FB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NENBR0xDLHVCO2VBaTJDVHRULFEiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBwcmVmZXItZGVzdHJ1Y3R1cmluZyAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tbG9uZWx5LWlmLCBwcmVmZXItdGVtcGxhdGUsIHJlYWN0L3JlcXVpcmUtZGVmYXVsdC1wcm9wcyAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IE1hcCwgTGlzdCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgaW5qZWN0SW50bCwgRm9ybWF0dGVkTWVzc2FnZSBhcyBNIH0gZnJvbSAncmVhY3QtaW50bCc7XG5pbXBvcnQgeyBDb2x1bW4sIENlbGwgfSBmcm9tICdmaXhlZC1kYXRhLXRhYmxlLTInO1xuaW1wb3J0IHsgTWVudUl0ZW0gfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyBJY29uIH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtaWNvbnMnO1xuaW1wb3J0IFNwaW5uZXIgZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3Qtc3Bpbm5lcic7XG5pbXBvcnQgQ2hlY2tib3ggZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtY2hlY2tib3gnO1xuaW1wb3J0ICdmaXhlZC1kYXRhLXRhYmxlLTIvZGlzdC9maXhlZC1kYXRhLXRhYmxlLmNzcyc7XG5cbmltcG9ydCBSZXNwb25zaXZlRml4ZWREYXRhVGFibGUgZnJvbSAnLi9yZXNwb25zaXZlLWZpeGVkLWRhdGEtdGFibGUuY29tcG9uZW50JztcbmltcG9ydCBIZWFkZXJDZWxsIGZyb20gJy4vaGVhZGVyLWNlbGwuY29tcG9uZW50JztcbmltcG9ydCBBY3Rpb25CYXIgZnJvbSAnLi9hY3Rpb24tYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgSW5saW5lRWRpdENvbnRyb2xzIGZyb20gJy4vaW5saW5lLWVkaXQtY29udHJvbHMuY29tcG9uZW50JztcbmltcG9ydCBGaWx0ZXJpbmdDb250cm9scyBmcm9tICcuL2ZpbHRlcmluZy1jb250cm9scy5jb21wb25lbnQnO1xuaW1wb3J0IERyb3Bkb3duQ29udHJvbHMgZnJvbSAnLi9kcm9wZG93bi1jb250cm9scy5jb21wb25lbnQnO1xuaW1wb3J0ICogYXMgZGF0YWdyaWRBY3Rpb25zIGZyb20gJy4vZGF0YWdyaWQuYWN0aW9ucyc7XG5pbXBvcnQgQ2VsbFRvb2x0aXAgZnJvbSAnLi9jZWxsLXRvb2x0aXAuY29tcG9uZW50JztcbmltcG9ydCBDb2x1bW5TZXR0aW5nc01vZGFsIGZyb20gJy4vY29sdW1uLXNldHRpbmdzL2NvbHVtbi1zZXR0aW5ncy5jb21wb25lbnQnO1xuaW1wb3J0IHsgcHJvcFR5cGVzLCBkZWZhdWx0UHJvcHMgfSBmcm9tICcuL2RhdGFncmlkLnByb3BzJztcbmltcG9ydCB7IEtFWV9DT0RFUyB9IGZyb20gJy4vZGF0YWdyaWQuY29uc3RhbnRzJztcbmltcG9ydCBwYWdpbmF0aW9uIGZyb20gJy4vcGFnaW5hdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4vZGF0YWdyaWQudXRpbHMnO1xuaW1wb3J0IEdyaWRDb2x1bW5TZXJ2aWNlIGZyb20gJy4vY29sdW1uLXNlcnZpY2UvY29sdW1uLXNlcnZpY2UnO1xuaW1wb3J0ICcuL2RhdGFncmlkLmNvbXBvbmVudC5zY3NzJztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlLCBvd25Qcm9wcykgPT4ge1xuICBjb25zdCBHUklEID0gb3duUHJvcHMuZ3JpZDtcbiAgcmV0dXJuIHtcbiAgICBpc0J1c3k6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdpc0J1c3knXSwgdHJ1ZSksXG4gICAgaXNFZGl0aW5nOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnaXNFZGl0aW5nJ10sIGZhbHNlKSxcbiAgICBpc0NyZWF0aW5nOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnaXNDcmVhdGluZyddLCBmYWxzZSksXG4gICAgaXNGaWx0ZXJpbmc6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnaXNGaWx0ZXJpbmcnXSwgZmFsc2UpLFxuICAgIGlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW46IHN0YXRlLmRhdGFncmlkLmdldEluKFxuICAgICAgW0dSSUQuaWQsICdzZXNzaW9uJywgJ2NvbHVtblNldHRpbmdzTW9kYWwnLCAnb3BlbiddLFxuICAgICAgZmFsc2UsXG4gICAgKSxcbiAgICBzb3J0Q29sdW1uOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdzb3J0aW5nRGF0YScsICdzb3J0Q29sdW1uJ10sIG51bGwpLFxuICAgIHNvcnRPcmRlcjogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnc29ydGluZ0RhdGEnLCAnc29ydE9yZGVyJ10sIG51bGwpLFxuICAgIHZpc2libGVDb2x1bW5zOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICd2aXNpYmxlQ29sdW1ucyddLCBMaXN0KCkpLFxuICAgIGNvbHVtbldpZHRoczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnY29sdW1uV2lkdGhzJ10sIE1hcCgpKSxcbiAgICBzZWxlY3RlZENlbGw6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2VsZWN0ZWRDZWxsJ10sIE1hcCgpKSxcbiAgICBzZWxlY3RlZEl0ZW1zOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3NlbGVjdGVkSXRlbXMnXSwgTGlzdCgpKSxcbiAgICBkYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2RhdGEnXSwgTGlzdCgpKSxcbiAgICBlZGl0RGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdlZGl0RGF0YSddLCBNYXAoKSksXG4gICAgY3JlYXRlRGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjcmVhdGVEYXRhJ10sIExpc3QoKSksXG4gICAgZmlsdGVyRGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdmaWx0ZXJEYXRhJ10sIE1hcCgpKSxcbiAgICBjZWxsTWVzc2FnZXM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY2VsbE1lc3NhZ2VzJ10sIE1hcCgpKSxcbiAgICBjcmVhdGVDZWxsTWVzc2FnZXM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY3JlYXRlQ2VsbE1lc3NhZ2VzJ10sIE1hcCgpKSxcbiAgICBhbGxEYXRhU2l6ZTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdhbGxEYXRhJ10sIExpc3QoKSkuc2l6ZSxcbiAgICBsYW5ndWFnZTogVXRpbHMuZ2V0TGFuZ3VhZ2UoR1JJRCwgc3RhdGUudXNlciksXG4gICAgcmVnaW9uOiBVdGlscy5nZXRSZWdpb24oR1JJRCwgc3RhdGUudXNlciksXG4gICAgZGF0ZUZvcm1hdDogVXRpbHMuZ2V0RGF0ZUZvcm1hdChHUklELCBzdGF0ZS51c2VyKSxcbiAgICB0aG91c2FuZFNlcGFyYXRvcjogVXRpbHMuZ2V0VGhvdXNhbmRTZXBhcmF0b3IoR1JJRCwgc3RhdGUudXNlciksXG4gICAgZGVjaW1hbFNlcGFyYXRvcjogVXRpbHMuZ2V0RGVjaW1hbFNlcGFyYXRvcihHUklELCBzdGF0ZS51c2VyKSxcbiAgICBmb3JjZVJlZnJlc2hUaW1lc3RhbXA6IHN0YXRlLmRhdGFncmlkLmdldCgnZm9yY2VSZWZyZXNoJywgMCksIC8vIGZvcmNlIHJlLXJlbmRlciB3aGVuIGNoYW5nZWRcbiAgICBmb2N1c1R5cGU6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdmb2N1c1R5cGUnXSwgTWFwKCkpLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGF0YWdyaWRBY3Rpb25zO1xuXG5AcGFnaW5hdGlvblxuQGluamVjdEludGxcbkBjb25uZWN0KFxuICBtYXBTdGF0ZVRvUHJvcHMsXG4gIG1hcERpc3BhdGNoVG9Qcm9wcyxcbilcbmNsYXNzIERhdGFHcmlkIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSBwcm9wVHlwZXM7XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY3VycmVudFJvdzogMCxcbiAgICAgIGN1cnJlbnRDb2x1bW46IDAsXG4gICAgICBjb250ZXh0TWVudU9wZW46IGZhbHNlLFxuICAgICAgY29udGV4dE1lbnVYOiBudWxsLFxuICAgICAgY29udGV4dE1lbnVZOiBudWxsLFxuICAgIH07XG4gICAgdGhpcy5jZWxsUmVmcyA9IHt9O1xuICAgIHRoaXMuY3JlYXRlQ2VsbFJlZnMgPSB7fTtcbiAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsID0gZmFsc2U7XG4gICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTsgLy8gVE9ETzogSGFuZGxlIGZvY3VzaW5nIHdoZW4gdHJ1ZVxuICAgIHRoaXMuZm9jdXNUb0Vycm9yQ2VsbCA9IGZhbHNlOyAvLyBUT0RPOiBIYW5kbGUgZm9jdXNpbmcgd2hlbiB0cnVlXG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25Eb2N1bWVudENsaWNrKTtcbiAgICB0aGlzLnByb3BzLmludmFsaWRhdGUodGhpcy5wcm9wcy5ncmlkKTtcbiAgfVxuXG4gIG9uRG9jdW1lbnRDbGljayA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5jb250ZXh0TWVudUl0ZW1zKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY29udGV4dE1lbnVPcGVuOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25Eb2N1bWVudENsaWNrKTtcbiAgfTtcblxuICBvbkNvbHVtblJlc2l6ZUVuZENhbGxiYWNrID0gKG5ld0NvbHVtbldpZHRoLCBjb2x1bW5LZXkpID0+IHtcbiAgICB0aGlzLnByb3BzLnJlc2l6ZUNvbHVtbih0aGlzLnByb3BzLmdyaWQsIGNvbHVtbktleSwgbmV3Q29sdW1uV2lkdGgpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gcm93SW5kZXggKGludClcbiAgICogQHBhcmFtIGNvbCAob2JqKS4gQ29sdW1uIG9iamVjdC5cbiAgICogQHBhcmFtIGUuIE9yaWdpbmFsIEtleURvd24gZXZlbnRcbiAgICogQHBhcmFtIGNyZWF0ZSAoYm9vbCkuIElzIHRoZSBjZWxsIGNyZWF0ZSBjZWxsIG9yIGVkaXQgY2VsbD9cbiAgICovXG4gIG9uQ2VsbEtleURvd24gPSAocm93SW5kZXgsIGNvbCwgZSwgY3JlYXRlID0gZmFsc2UpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5lbmFibGVBcnJvd05hdmlnYXRpb24pIHtcbiAgICAgIGNvbnN0IGNlbGxSZWZzID0gY3JlYXRlID8gdGhpcy5jcmVhdGVDZWxsUmVmcyA6IHRoaXMuY2VsbFJlZnM7XG4gICAgICBjb25zdCBhcnJvd0tleXMgPSBbS0VZX0NPREVTLkRPV04sIEtFWV9DT0RFUy5VUCwgS0VZX0NPREVTLkxFRlQsIEtFWV9DT0RFUy5SSUdIVF07XG4gICAgICBjb25zdCB7XG4gICAgICAgIGNvbHVtbnMsIHZpc2libGVDb2x1bW5zLCBncmlkLCBkYXRhLCBvbkxhc3RDZWxsVGFiUHJlc3MsXG4gICAgICB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IGdyaWRDb2x1bW5zID0gVXRpbHMudmlzaWJsZUNvbHVtbnMoY29sdW1ucywgdmlzaWJsZUNvbHVtbnMpO1xuICAgICAgY29uc3QgZ2V0Q29sdW1uS2V5QnlJbmRleCA9IGkgPT4gVXRpbHMuZ2V0Q29sdW1uS2V5KGdyaWRDb2x1bW5zW2ldKTtcbiAgICAgIGNvbnN0IHJvd3NTaXplID0gZGF0YS5zaXplO1xuICAgICAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCk7XG4gICAgICBsZXQgY3VycmVudENlbGwgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2NvbHVtbktleX1fJHtyb3dJbmRleH1gXTtcbiAgICAgIGxldCBwcm94eSA9IG51bGw7XG5cbiAgICAgIGNvbnN0IGlzQ3Vyc29yQXRTdGFydCA9ICgpID0+IHtcbiAgICAgICAgaWYgKGN1cnJlbnRDZWxsLnR5cGUgIT09ICd0ZXh0JykgcmV0dXJuIHRydWU7XG4gICAgICAgIHJldHVybiBjdXJyZW50Q2VsbC5zZWxlY3Rpb25TdGFydCA9PT0gMDtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGlzQ3Vyc29yQXRFbmQgPSAoKSA9PiB7XG4gICAgICAgIGlmIChjdXJyZW50Q2VsbC50eXBlICE9PSAndGV4dCcpIHJldHVybiB0cnVlO1xuICAgICAgICByZXR1cm4gY3VycmVudENlbGwuc2VsZWN0aW9uRW5kID09PSBjdXJyZW50Q2VsbC52YWx1ZS5sZW5ndGg7XG4gICAgICB9O1xuXG4gICAgICAvLyBJZiBjdXJyZW50IGNlbGwgaG9sZHMgYSByZWFjdC1mbG9hdGluZy1zZWxlY3QgY29tcG9uZW50XG4gICAgICBpZiAoY3VycmVudENlbGwgJiYgKGN1cnJlbnRDZWxsLnNlbGVjdFJlZiB8fCB0eXBlb2YgY3VycmVudENlbGwuc2VsZWN0ID09PSAnb2JqZWN0JykpIHtcbiAgICAgICAgcHJveHkgPSBjdXJyZW50Q2VsbDtcbiAgICAgICAgY3VycmVudENlbGwgPSB0aGlzLmdldFNlbGVjdFJlZihwcm94eSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFByZXZlbnRzIHVwL2Rvd24gYXJyb3cgZnJvbSBjaGFuZ2luZyBudW1iZXIgZmllbGQgdmFsdWVcbiAgICAgIGlmIChhcnJvd0tleXMuaW5jbHVkZXMoZS5rZXlDb2RlKSAmJiBjdXJyZW50Q2VsbC50eXBlID09PSAnbnVtYmVyJykgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuRU5URVI6XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLkVTQzoge1xuICAgICAgICAgIGlmIChjcmVhdGUgJiYgZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuRU5URVIpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuYWRkTmV3SXRlbShncmlkLCBVdGlscy5nZXRDb2x1bW5EZWZhdWx0VmFsdWVzKGNvbHVtbnMpKTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGN1cnJlbnRDZWxsLnNlbGVjdCgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLkRPV046IHtcbiAgICAgICAgICBsZXQgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2NvbHVtbktleX1fJHtyb3dJbmRleCArIDF9YF07XG5cbiAgICAgICAgICAvLyBQcmV2ZW50cyBtZW51IGZyb20gb3BlbmluZ1xuICAgICAgICAgIGlmIChwcm94eSAmJiBwcm94eS5zZWxlY3RSZWYgJiYgIXByb3h5LnNlbGVjdFJlZi5zdGF0ZS5tZW51SXNPcGVuKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAoIW5leHRFbGVtZW50KSBicmVhaztcbiAgICAgICAgICAgIG5leHRFbGVtZW50ID0gdGhpcy5nZXRTZWxlY3RSZWYobmV4dEVsZW1lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm1vdmVDZWxsRm9jdXMobmV4dEVsZW1lbnQsIHJvd0luZGV4ICsgMSwgLTEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLlVQOiB7XG4gICAgICAgICAgbGV0IG5leHRFbGVtZW50ID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtjb2x1bW5LZXl9XyR7cm93SW5kZXggLSAxfWBdO1xuXG4gICAgICAgICAgLy8gUHJldmVudHMgbWVudSBmcm9tIG9wZW5pbmdcbiAgICAgICAgICBpZiAocHJveHkgJiYgcHJveHkuc2VsZWN0UmVmICYmICFwcm94eS5zZWxlY3RSZWYuc3RhdGUubWVudUlzT3Blbikge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKCFuZXh0RWxlbWVudCkgYnJlYWs7XG4gICAgICAgICAgICBuZXh0RWxlbWVudCA9IHRoaXMuZ2V0U2VsZWN0UmVmKG5leHRFbGVtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5tb3ZlQ2VsbEZvY3VzKG5leHRFbGVtZW50LCByb3dJbmRleCAtIDEsIC0xKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5UQUI6XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLlJJR0hUOlxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5MRUZUOiB7XG4gICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLlJJR0hUICYmICFpc0N1cnNvckF0RW5kKCkpIGJyZWFrO1xuICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5MRUZUICYmICFpc0N1cnNvckF0U3RhcnQoKSkgYnJlYWs7XG5cbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICBsZXQgY29sdW1uSW5kID0gZ3JpZENvbHVtbnMuZmluZEluZGV4KGMgPT4gYy52YWx1ZUtleVBhdGguam9pbignLycpID09PSBjb2x1bW5LZXkpO1xuICAgICAgICAgIGlmIChjb2x1bW5JbmQgIT09IC0xKSB7XG4gICAgICAgICAgICBsZXQgZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgbGV0IG5leHRFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIGxldCByb3dJbmQgPSByb3dJbmRleDtcbiAgICAgICAgICAgIHdoaWxlIChkaXNhYmxlZCkge1xuICAgICAgICAgICAgICAvLyBNb3ZpbmcgdG8gdGhlIGxlZnRcbiAgICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLkxFRlQgfHwgKGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLlRBQiAmJiBlLnNoaWZ0S2V5KSkge1xuICAgICAgICAgICAgICAgIGlmIChjb2x1bW5JbmQgLSAxID49IDApIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCAtPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm93SW5kIC0gMSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgPSBncmlkQ29sdW1ucy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgICAgcm93SW5kIC09IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBNb3ZpbmcgdG8gdGhlIHJpZ2h0XG4gICAgICAgICAgICAgICAgaWYgKGNvbHVtbkluZCArIDEgPCBncmlkQ29sdW1ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCArPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm93SW5kICsgMSA8IHJvd3NTaXplKSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgPSAwO1xuICAgICAgICAgICAgICAgICAgcm93SW5kICs9IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyb3dJbmQgKyAxID09PSByb3dzU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgLy8gSWYgdHJ5aW5nIHRvIHNlbGVjdCBhIHJvdywgd2hlbiB0aGVyZSBpcyBub25lOlxuICAgICAgICAgICAgICAgICAgaWYgKG9uTGFzdENlbGxUYWJQcmVzcyAmJiBlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5UQUIpIG9uTGFzdENlbGxUYWJQcmVzcyhlKTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIG5leHRFbGVtZW50ID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtnZXRDb2x1bW5LZXlCeUluZGV4KGNvbHVtbkluZCl9XyR7cm93SW5kfWBdO1xuXG4gICAgICAgICAgICAgIC8vIElmIHdlIGNhbm5vdCBmb2N1cyBvbiB0aGUgbmV4dCBlbGVtZW50IHdoaWxlIG1vdmluZyB0byB0aGUgcmlnaHRcbiAgICAgICAgICAgICAgaWYgKCFuZXh0RWxlbWVudCAmJiBlLmtleUNvZGUgIT09IEtFWV9DT0RFUy5MRUZUKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgd2UncmUgbm90IHlldCBpbiB0aGUgbGFzdCBmb2N1c2FibGUgY29sdW1uXG4gICAgICAgICAgICAgICAgaWYgKGNvbHVtbkluZCA8PSBncmlkQ29sdW1ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgIHdoaWxlIChjb2x1bW5JbmQgPD0gZ3JpZENvbHVtbnMubGVuZ3RoICYmICFuZXh0RWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Z2V0Q29sdW1uS2V5QnlJbmRleChjb2x1bW5JbmQpfV8ke3Jvd0luZH1gXTtcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uSW5kICs9IDE7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UgYXJlIGluIHRoZSBsYXN0IGNvbHVtbiBhbmQgd2UgZG9uJ3QgaGF2ZSBhbiBlbGVtZW50IHRvIGZvY3VzIG9uLFxuICAgICAgICAgICAgICAgICAgICAvLyB3ZSBtdXN0IG1vdmUgdG8gdGhlIG5leHQgcm93IChpZiBwb3NzaWJsZSlcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFuZXh0RWxlbWVudCAmJiBjb2x1bW5JbmQgPT09IGdyaWRDb2x1bW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHRyeWluZyB0byBzZWxlY3QgYSByb3csIHdoZW4gdGhlcmUgaXMgbm9uZTpcbiAgICAgICAgICAgICAgICAgICAgICBpZiAocm93SW5kICsgMSA9PT0gcm93c1NpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbkxhc3RDZWxsVGFiUHJlc3MgJiYgZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuVEFCKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uTGFzdENlbGxUYWJQcmVzcyhlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgcm93SW5kICs9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2dldENvbHVtbktleUJ5SW5kZXgoY29sdW1uSW5kKX1fJHtyb3dJbmR9YF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgY2Fubm90IGZvY3VzIG9uIHRoZSBuZXh0IGVsZW1lbnQgd2hpbGUgbW92aW5nIHRvIHRoZSBsZWZ0XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoIW5leHRFbGVtZW50ICYmIGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLkxFRlQpIHtcbiAgICAgICAgICAgICAgICB3aGlsZSAoY29sdW1uSW5kID4gMCAmJiAhbmV4dEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCAtPSAxO1xuICAgICAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2dldENvbHVtbktleUJ5SW5kZXgoY29sdW1uSW5kKX1fJHtyb3dJbmR9YF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGlmIG5vIGVsZW1lbnQgd2FzIGZvdW5kLCB0cnkgbW92aW5nIHRvIHByZXZpb3VzIHJvd1xuICAgICAgICAgICAgICAgIC8vIChuZWVkZWQgaW4gY2FzZSBmaXJzdCBjb2x1bW4gaXMgbm90IGVkaXRhYmxlIGUuZy4gYW4gRXh0cmFDb2x1bW4pXG4gICAgICAgICAgICAgICAgaWYgKHJvd0luZCA+IDAgJiYgIW5leHRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgPSBncmlkQ29sdW1ucy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgICAgcm93SW5kIC09IDE7XG4gICAgICAgICAgICAgICAgICBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Z2V0Q29sdW1uS2V5QnlJbmRleChjb2x1bW5JbmQpfV8ke3Jvd0luZH1gXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZGlzYWJsZWQgPSBuZXh0RWxlbWVudCA/IG5leHRFbGVtZW50LmRpc2FibGVkIDogZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWRpc2FibGVkICYmIG5leHRFbGVtZW50KSB7XG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgbmV4dEVsZW1lbnQuc2VsZWN0ID09PSAnb2JqZWN0JyB8fCBuZXh0RWxlbWVudC5zZWxlY3RSZWYpIHtcbiAgICAgICAgICAgICAgICBuZXh0RWxlbWVudCA9IHRoaXMuZ2V0U2VsZWN0UmVmKG5leHRFbGVtZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGlzLm1vdmVDZWxsRm9jdXMobmV4dEVsZW1lbnQsIHJvd0luZCwgY29sdW1uSW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgb25FZGl0Q2VsbEtleURvd24gPSAocm93SW5kZXgsIGNvbCkgPT4gKGUpID0+IHtcbiAgICB0aGlzLm9uQ2VsbEtleURvd24ocm93SW5kZXgsIGNvbCwgZSk7XG4gIH07XG5cbiAgb25DcmVhdGVDZWxsS2V5RG93biA9IChyb3dJbmRleCwgY29sKSA9PiAoZSkgPT4ge1xuICAgIHRoaXMub25DZWxsS2V5RG93bihyb3dJbmRleCwgY29sLCBlLCB0cnVlKTtcbiAgfTtcblxuICBvbkZpbHRlckNlbGxWYWx1ZUNoYW5nZSA9IChjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZXZlbnRPckRhdGEpID0+IHtcbiAgICBsZXQgcmF3VmFsdWU7XG4gICAgLy8gZXZlbnRPckRhdGEgY2FuIGJlIGlucHV0IG9uQ2hhbmdlIGV2ZW50LCByZWFjdC1zZWxlY3Qgb25DaGFuZ2Ugb3IgcmVhY3QtZGF5LXBpY2tlciBvbkNoYW5nZVxuICAgIGlmIChldmVudE9yRGF0YSkge1xuICAgICAgaWYgKGV2ZW50T3JEYXRhLnRhcmdldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChldmVudE9yRGF0YS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCB2YWx1ZSA9IHZhbHVlUGFyc2VyKHJhd1ZhbHVlKTtcbiAgICB0aGlzLnByb3BzLmZpbHRlckNlbGxWYWx1ZUNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIHRoaXMucHJvcHMuY29sdW1ucywgY29sLCB2YWx1ZSk7XG4gIH07XG5cbiAgb25GaWx0ZXJDZWxsTXVsdGlWYWx1ZUJsdXIgPSBjb2wgPT4gKCkgPT4ge1xuICAgIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2wpO1xuICAgIGNvbnN0IHsgY29sdW1ucywgZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlLCBncmlkIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNlbGVjdGVkRmlsdGVycyA9IHRoaXMuc3RhdGVbY29sdW1uS2V5XTtcbiAgICBpZiAoc2VsZWN0ZWRGaWx0ZXJzKSB7XG4gICAgICBmaWx0ZXJDZWxsVmFsdWVDaGFuZ2UoZ3JpZCwgY29sdW1ucywgY29sLCBzZWxlY3RlZEZpbHRlcnMpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IFtjb2x1bW5LZXldOiB1bmRlZmluZWQgfSk7XG4gICAgfVxuICB9O1xuXG4gIG9uRmlsdGVyQ2VsbE11bHRpVmFsdWVDaGFuZ2UgPSAoY29sLCB2YWx1ZVBhcnNlcikgPT4gKGRhdGEgPSBbXSkgPT4ge1xuICAgIC8vIGRhdGEgaXMgaW5wdXQgb2YgcmVhY3Qtc2VsZWN0IG9uQ2hhbmdlXG4gICAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCk7XG4gICAgY29uc3Qgc2VsZWN0ZWRGaWx0ZXJzID0gdGhpcy5zdGF0ZVtjb2x1bW5LZXldO1xuICAgIGlmICghc2VsZWN0ZWRGaWx0ZXJzICYmIGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAvLyBlbmRzIHVwIGhlcmUgaW4gY2FzZSBvZiBjbGVhciBidXR0b25cbiAgICAgIGNvbnN0IHsgY29sdW1ucywgZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlLCBncmlkIH0gPSB0aGlzLnByb3BzO1xuICAgICAgZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlKGdyaWQsIGNvbHVtbnMsIGNvbCwgZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdmFsdWVQYXJzZXIoZGF0YSk7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgW2NvbHVtbktleV06IHZhbHVlIH0pO1xuICAgIH1cbiAgfTtcblxuICBvbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGV2ZW50T3JEYXRhKSA9PiB7XG4gICAgY29uc3QgeyBjcmVhdGVDZWxsVmFsdWVDaGFuZ2UsIGdyaWQgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IHJhd1ZhbHVlO1xuICAgIC8vIGV2ZW50T3JEYXRhIGNhbiBiZSBpbnB1dCBvbkNoYW5nZSBldmVudCwgcmVhY3Qtc2VsZWN0IG9uQ2hhbmdlIG9yIHJlYWN0LWRheS1waWNrZXIgb25DaGFuZ2VcbiAgICBpZiAoZXZlbnRPckRhdGEpIHtcbiAgICAgIGlmIChldmVudE9yRGF0YS50YXJnZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnRPckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSB2YWx1ZVBhcnNlcihyYXdWYWx1ZSk7XG5cbiAgICBjb25zdCB7IGNvbXBvbmVudFR5cGUgfSA9IGNvbDtcbiAgICBzd2l0Y2ggKGNvbXBvbmVudFR5cGUpIHtcbiAgICAgIGNhc2UgJ2N1cnJlbmN5JzpcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICd0ZXh0Jzoge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlKGdyaWQsIHJvd0luZGV4LCBjb2wudmFsdWVLZXlQYXRoLCB2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY29sLm9uQ3JlYXRlVmFsdWVDaGFuZ2UpIHtcbiAgICAgIGNvbC5vbkNyZWF0ZVZhbHVlQ2hhbmdlKHZhbHVlLCBjb2wudmFsdWVLZXlQYXRoLCByb3dJbmRleCk7XG4gICAgfVxuICAgIGlmIChjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUgJiYgdmFsdWUgPT09IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5tYXRjaFZhbHVlKSB7XG4gICAgICAvLyBDYWxsIHNwZWNpYWwgcGFpcmVkIHZhbHVlIGNoYW5nZSBvbiBvdGhlciBjZWxsIGlmIHZhbHVlIG1hdGNoZXNcbiAgICAgIHRoaXMub25DcmVhdGVDZWxsVmFsdWVDaGFuZ2UoXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICB7IHZhbHVlS2V5UGF0aDogY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm5ld1ZhbHVlS2V5UGF0aCB9LFxuICAgICAgICB2ID0+IHYsXG4gICAgICApKGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5uZXdWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjb2wudmFsaWRhdG9ycykge1xuICAgICAgdGhpcy5wcm9wcy5jcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZShcbiAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgY29sLnZhbHVlS2V5UGF0aCxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIGNvbC52YWxpZGF0b3JzLFxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgb25FZGl0Q2VsbFZhbHVlQ2hhbmdlID0gKHJvd0luZGV4LCBjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZXZlbnRPckRhdGEpID0+IHtcbiAgICBjb25zdCB7IGVkaXRDZWxsVmFsdWVDaGFuZ2UsIGdyaWQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgZGF0YUlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICBsZXQgcmF3VmFsdWU7XG4gICAgLy8gZXZlbnRPckRhdGEgY2FuIGJlIGlucHV0IG9uQ2hhbmdlIGV2ZW50LCByZWFjdC1zZWxlY3Qgb25DaGFuZ2Ugb3IgcmVhY3QtZGF5LXBpY2tlciBvbkNoYW5nZVxuICAgIGlmIChldmVudE9yRGF0YSkge1xuICAgICAgaWYgKGV2ZW50T3JEYXRhLnRhcmdldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChldmVudE9yRGF0YS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCB2YWx1ZSA9IHZhbHVlUGFyc2VyKHJhd1ZhbHVlKTtcbiAgICBjb25zdCB7IGNvbXBvbmVudFR5cGUgfSA9IGNvbDtcbiAgICBzd2l0Y2ggKGNvbXBvbmVudFR5cGUpIHtcbiAgICAgIGNhc2UgJ2N1cnJlbmN5JzpcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICd0ZXh0Jzoge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgZWRpdENlbGxWYWx1ZUNoYW5nZShncmlkLCBkYXRhSWQsIGNvbC52YWx1ZUtleVBhdGgsIHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChjb2wub25FZGl0VmFsdWVDaGFuZ2UpIHtcbiAgICAgIGNvbC5vbkVkaXRWYWx1ZUNoYW5nZSh2YWx1ZSwgY29sLnZhbHVlS2V5UGF0aCwgcm93SW5kZXgsIGRhdGFJZCk7XG4gICAgfVxuICAgIGlmIChjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUgJiYgdmFsdWUgPT09IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5tYXRjaFZhbHVlKSB7XG4gICAgICAvLyBDYWxsIHNwZWNpYWwgcGFpcmVkIHZhbHVlIGNoYW5nZSBvbiBvdGhlciBjZWxsIGlmIHZhbHVlIG1hdGNoZXNcbiAgICAgIHRoaXMub25FZGl0Q2VsbFZhbHVlQ2hhbmdlKFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgeyB2YWx1ZUtleVBhdGg6IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5uZXdWYWx1ZUtleVBhdGggfSxcbiAgICAgICAgdiA9PiB2LFxuICAgICAgKShjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY29sLnZhbGlkYXRvcnMpIHtcbiAgICAgIHRoaXMucHJvcHMuZWRpdENlbGxWYWx1ZVZhbGlkYXRlKFxuICAgICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICAgIGRhdGFJZCxcbiAgICAgICAgY29sLnZhbHVlS2V5UGF0aCxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIGNvbC52YWxpZGF0b3JzLFxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgZ2V0UmVnRXggPSBzZXBhcmF0b3IgPT4gKHNlcGFyYXRvciA/IG5ldyBSZWdFeHAoYFxcXFwke3NlcGFyYXRvcn1gLCAnZycpIDogbmV3IFJlZ0V4cCgnXFxcXHMnLCAnZycpKTtcblxuICBvbkNyZWF0ZUNlbGxCbHVyID0gKHJvd0luZGV4LCBjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZXZlbnRPckRhdGEpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBkZWNpbWFsU2VwYXJhdG9yLCBjcmVhdGVDZWxsVmFsdWVDaGFuZ2UsIGdyaWQsIHRob3VzYW5kU2VwYXJhdG9yLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgY29tcG9uZW50VHlwZSB9ID0gY29sO1xuICAgIGxldCB2YWx1ZTtcbiAgICAvLyBldmVudE9yRGF0YSBjYW4gYmUgZm9ybWF0dGVkLWlucHV0LCByZWFjdC1zZWxlY3QsIHJlYWN0LWNoZWNrYm94IG9yIHJlYWN0LWRheS1waWNrZXJcbiAgICAvLyBvbkNoYW5nZSBldmVudFxuICAgIGlmIChldmVudE9yRGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoZXZlbnRPckRhdGEgJiYgZXZlbnRPckRhdGEudGFyZ2V0ICYmIGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlID0gZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChldmVudE9yRGF0YS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlID0gZXZlbnRPckRhdGEudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IGV2ZW50T3JEYXRhO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSA9IHRoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKTtcbiAgICB9XG4gICAgc3dpdGNoIChjb21wb25lbnRUeXBlKSB7XG4gICAgICBjYXNlICdjdXJyZW5jeSc6IHtcbiAgICAgICAgY29uc3QgbnVtZXJpY1ZhbHVlID0gdmFsdWVcbiAgICAgICAgICA/IE51bWJlcih2YWx1ZS5yZXBsYWNlKHRoaXMuZ2V0UmVnRXgoKGNvbC52YWx1ZU9wdGlvbnMgJiYgY29sLnZhbHVlT3B0aW9ucy50aG91c2FuZFNlcGFyYXRvcikgfHwgdGhvdXNhbmRTZXBhcmF0b3IpLCAnJylcbiAgICAgICAgICAgIC5yZXBsYWNlKHRoaXMuZ2V0UmVnRXgoKGNvbC52YWx1ZU9wdGlvbnMgJiYgY29sLnZhbHVlT3B0aW9ucy5kZWNpbWFsU2VwYXJhdG9yKSB8fCBkZWNpbWFsU2VwYXJhdG9yKSwgJy4nKSlcbiAgICAgICAgICA6IHZhbHVlO1xuICAgICAgICBpZiAobnVtZXJpY1ZhbHVlICE9PSB0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCkpIHtcbiAgICAgICAgICBjcmVhdGVDZWxsVmFsdWVDaGFuZ2UoZ3JpZCwgcm93SW5kZXgsIGNvbC52YWx1ZUtleVBhdGgsIG51bWVyaWNWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAndGV4dCc6IHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCkpIHtcbiAgICAgICAgICBjcmVhdGVDZWxsVmFsdWVDaGFuZ2UoZ3JpZCwgcm93SW5kZXgsIGNvbC52YWx1ZUtleVBhdGgsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNvbC5vbkNyZWF0ZUJsdXIpIHtcbiAgICAgIGlmICh2YWx1ZVBhcnNlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWVQYXJzZXIodmFsdWUpO1xuICAgICAgfVxuICAgICAgY29sLm9uQ3JlYXRlQmx1cih2YWx1ZSwgcm93SW5kZXgpO1xuICAgIH1cbiAgfTtcblxuICBvbkVkaXRDZWxsQmx1ciA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGV2ZW50T3JEYXRhKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGVjaW1hbFNlcGFyYXRvciwgZWRpdENlbGxWYWx1ZUNoYW5nZSwgZ3JpZCwgdGhvdXNhbmRTZXBhcmF0b3IsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBjb21wb25lbnRUeXBlIH0gPSBjb2w7XG4gICAgY29uc3QgZGF0YUlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICBsZXQgdmFsdWU7XG4gICAgLy8gZXZlbnRPckRhdGEgY2FuIGJlIGZvcm1hdHRlZC1pbnB1dCwgcmVhY3Qtc2VsZWN0LCByZWFjdC1jaGVja2JveCBvciByZWFjdC1kYXktcGlja2VyXG4gICAgLy8gb25DaGFuZ2UgZXZlbnRcbiAgICBpZiAoZXZlbnRPckRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGV2ZW50T3JEYXRhICYmIGV2ZW50T3JEYXRhLnRhcmdldCAmJiBldmVudE9yRGF0YS50YXJnZXQudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YWx1ZSA9IGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnRPckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YWx1ZSA9IGV2ZW50T3JEYXRhLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBldmVudE9yRGF0YTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgPSB0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCk7XG4gICAgfVxuICAgIHN3aXRjaCAoY29tcG9uZW50VHlwZSkge1xuICAgICAgY2FzZSAnY3VycmVuY3knOiB7XG4gICAgICAgIGNvbnN0IG51bWVyaWNWYWx1ZSA9IHZhbHVlXG4gICAgICAgICAgPyBOdW1iZXIodmFsdWUucmVwbGFjZSh0aGlzLmdldFJlZ0V4KChjb2wudmFsdWVPcHRpb25zICYmIGNvbC52YWx1ZU9wdGlvbnMudGhvdXNhbmRTZXBhcmF0b3IpIHx8IHRob3VzYW5kU2VwYXJhdG9yKSwgJycpXG4gICAgICAgICAgICAucmVwbGFjZSh0aGlzLmdldFJlZ0V4KChjb2wudmFsdWVPcHRpb25zICYmIGNvbC52YWx1ZU9wdGlvbnMuZGVjaW1hbFNlcGFyYXRvcikgfHwgZGVjaW1hbFNlcGFyYXRvciksICcuJykpXG4gICAgICAgICAgOiB2YWx1ZTtcbiAgICAgICAgaWYgKG51bWVyaWNWYWx1ZSAhPT0gdGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpKSB7XG4gICAgICAgICAgZWRpdENlbGxWYWx1ZUNoYW5nZShncmlkLCBkYXRhSWQsIGNvbC52YWx1ZUtleVBhdGgsIG51bWVyaWNWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAndGV4dCc6IHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCkpIHtcbiAgICAgICAgICBlZGl0Q2VsbFZhbHVlQ2hhbmdlKGdyaWQsIGRhdGFJZCwgY29sLnZhbHVlS2V5UGF0aCwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29sLm9uRWRpdEJsdXIpIHtcbiAgICAgIGlmICh2YWx1ZVBhcnNlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWVQYXJzZXIodmFsdWUpO1xuICAgICAgfVxuICAgICAgY29sLm9uRWRpdEJsdXIodmFsdWUsIHJvd0luZGV4LCBkYXRhSWQpO1xuICAgIH1cbiAgfTtcblxuICBvbkNlbGxGb2N1cyA9IChjZWxsVHlwZSwgaW5wdXRUeXBlLCByb3dJbmRleCwgY29sdW1uS2V5KSA9PiAoZSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGNlbGxTZWxlY3Rpb25DaGFuZ2UsIGNlbGxTZWxlY3QsIGdyaWQsIGlzRWRpdGluZyxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoaXNFZGl0aW5nKSByZXR1cm47XG5cbiAgICBpZiAoaW5wdXRUeXBlID09PSAnbnVtYmVyJykge1xuICAgICAgZS50YXJnZXQuc2VsZWN0KCk7XG4gICAgfVxuICAgIGlmIChjZWxsVHlwZSA9PT0gJ2VkaXQnICYmIGNlbGxTZWxlY3QpIHtcbiAgICAgIGNlbGxTZWxlY3Rpb25DaGFuZ2UoXG4gICAgICAgIGdyaWQsXG4gICAgICAgIE1hcCh7XG4gICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgY29sdW1uS2V5LFxuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIGdldFNlbGVjdFJlZiA9IChjb21wb25lbnQpID0+IHtcbiAgICBpZiAoIWNvbXBvbmVudCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKGNvbXBvbmVudC5zZWxlY3QgJiYgY29tcG9uZW50LnNlbGVjdC5pbnB1dFJlZikge1xuICAgICAgcmV0dXJuIGNvbXBvbmVudC5zZWxlY3QuaW5wdXRSZWY7XG4gICAgfVxuICAgIGlmIChjb21wb25lbnQuc2VsZWN0ICYmIGNvbXBvbmVudC5zZWxlY3Quc2VsZWN0KSB7XG4gICAgICByZXR1cm4gY29tcG9uZW50LnNlbGVjdC5zZWxlY3QuaW5wdXRSZWY7XG4gICAgfVxuICAgIGlmIChjb21wb25lbnQuc2VsZWN0UmVmICYmIGNvbXBvbmVudC5zZWxlY3RSZWYuc2VsZWN0LnNlbGVjdCkge1xuICAgICAgcmV0dXJuIGNvbXBvbmVudC5zZWxlY3RSZWYuc2VsZWN0LnNlbGVjdC5pbnB1dFJlZjtcbiAgICB9XG4gICAgcmV0dXJuIGNvbXBvbmVudC5zZWxlY3RSZWYuc2VsZWN0LmlucHV0UmVmO1xuICB9O1xuXG4gIGdldERhdGFJZEJ5Um93SW5kZXggPSByb3dJbmRleCA9PiB0aGlzLnByb3BzLmRhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi50aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoXSk7XG5cbiAgZ2V0U2VsZWN0ZWRJdGVtSW5kZXggPSAoaWQpID0+IHtcbiAgICBpZiAoIWlkKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5wcm9wcy5kYXRhLmZpbmRJbmRleCh2ID0+IHYuZ2V0SW4odGhpcy5wcm9wcy5ncmlkLmlkS2V5UGF0aCkgPT09IGlkKTtcbiAgICByZXR1cm4gaW5kZXggPT09IC0xID8gdW5kZWZpbmVkIDogaW5kZXg7XG4gIH07XG5cbiAgZ2V0RWRpdEl0ZW1WYWx1ZSA9IChyb3dJbmRleCwgY29sLCBvcHRpb25zID0gW10pID0+IHtcbiAgICAvLyBHZXQgdGhlIHZhbHVlIHRvIGRpc3BsYXkgaW4gZWRpdCBjZWxsXG4gICAgY29uc3QgaWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgIGNvbnN0IGVkaXRWYWx1ZSA9IHRoaXMucHJvcHMuZWRpdERhdGEuZ2V0SW4oW2lkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSwgdW5kZWZpbmVkKTtcbiAgICBsZXQgb3JpZ2luYWxWYWx1ZTtcbiAgICBpZiAoZWRpdFZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG9yaWdpbmFsVmFsdWUgPSB0aGlzLnByb3BzLmRhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSwgJycpO1xuICAgIH0gZWxzZSBpZiAoZWRpdFZhbHVlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFZhbHVlIGlzIGZvdW5kIGZyb20gZWRpdERhdGFcbiAgICAgIC8vIEZvcm1hdCBieSB0eXBlXG4gICAgICBzd2l0Y2ggKGNvbC5jb21wb25lbnRUeXBlKSB7XG4gICAgICAgIGNhc2UgJ211bHRpc2VsZWN0JzpcbiAgICAgICAgY2FzZSAnc2VsZWN0JzpcbiAgICAgICAgICByZXR1cm4gb3B0aW9ucy5zZWxlY3RPcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gZWRpdFZhbHVlKTtcbiAgICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgICAgcmV0dXJuIG9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSBlZGl0VmFsdWUpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiBlZGl0VmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvcmlnaW5hbFZhbHVlID09PSBudWxsIHx8IG9yaWdpbmFsVmFsdWUgPT09IHVuZGVmaW5lZCB8fCBvcmlnaW5hbFZhbHVlID09PSAnJykge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICAvLyBSZXR1cm4gdmFsdWUgZnJvbSBvcmlnaW5hbCBkYXRhLCBiZWNhdXNlIGVkaXREYXRhIGlzIG5vdCBhdmFpbGFibGVcbiAgICAvLyBGb3JtYXQgYnkgY29tcG9uZW50IHR5cGVcbiAgICBzd2l0Y2ggKGNvbC5jb21wb25lbnRUeXBlKSB7XG4gICAgICBjYXNlICdmbG9hdCc6IHtcbiAgICAgICAgaWYgKFN0cmluZyhvcmlnaW5hbFZhbHVlKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgcmV0dXJuIFN0cmluZyhvcmlnaW5hbFZhbHVlKS5yZXBsYWNlKCcuJywgdGhpcy5wcm9wcy5kZWNpbWFsU2VwYXJhdG9yKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3JpZ2luYWxWYWx1ZTtcbiAgICAgIH1cbiAgICAgIGNhc2UgJ211bHRpc2VsZWN0JzpcbiAgICAgIGNhc2UgJ3NlbGVjdCc6XG4gICAgICAgIHJldHVybiBvcHRpb25zLnNlbGVjdE9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSBvcmlnaW5hbFZhbHVlKTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICByZXR1cm4gb3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IG9yaWdpbmFsVmFsdWUpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIG9yaWdpbmFsVmFsdWU7XG4gICAgfVxuICB9O1xuXG4gIGdldENyZWF0ZUl0ZW1WYWx1ZSA9IChyb3dJbmRleCwgY29sLCBvcHRpb25zID0gW10pID0+IHtcbiAgICBjb25zdCB2YWwgPSB0aGlzLnByb3BzLmNyZWF0ZURhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSwgJycpO1xuICAgIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgaWYgKGNvbC5jb21wb25lbnRUeXBlID09PSAnc2VsZWN0JyB8fCBjb2wuY29tcG9uZW50VHlwZSA9PT0gJ211bHRpc2VsZWN0Jykge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuc2VsZWN0T3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IHZhbCk7XG4gICAgfVxuICAgIGlmIChbJ2Jvb2xlYW4nXS5pbmNsdWRlcyhjb2wuY29tcG9uZW50VHlwZSkpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gdmFsKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbDtcbiAgfTtcblxuICBnZXRGaWx0ZXJJdGVtVmFsdWUgPSAoY29sLCBvcHRpb25zID0gW10pID0+IHtcbiAgICBjb25zdCB2YWwgPSB0aGlzLnByb3BzLmZpbHRlckRhdGEuZ2V0KFV0aWxzLmdldENvbHVtbktleShjb2wpLCAnJyk7XG4gICAgaWYgKHZhbCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBpZiAoY29sLmNvbXBvbmVudFR5cGUgPT09ICdzZWxlY3QnKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5zZWxlY3RPcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gdmFsKTtcbiAgICB9XG4gICAgaWYgKFsnY2hlY2tib3gnLCAnYm9vbGVhbiddLmluY2x1ZGVzKGNvbC5jb21wb25lbnRUeXBlKSkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSB2YWwpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWw7XG4gIH07XG5cbiAgZ2V0RmlsdGVySXRlbU11bHRpVmFsdWUgPSAoY29sKSA9PiB7XG4gICAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCk7XG4gICAgY29uc3QgeyBmaWx0ZXJEYXRhIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGRhdGEgPSB0aGlzLnN0YXRlW2NvbHVtbktleV07XG4gICAgY29uc3QgdmFsID0gZGF0YSB8fCBmaWx0ZXJEYXRhLmdldChjb2x1bW5LZXksICcnKTtcbiAgICAvLyBzZXNzaW9uIHN0b3JhZ2UgY29udGVudCBpcyBjb252ZXJ0ZWQgdG8gaW1tdXRhYmxlIGFuZCBtdWx0aXNlbGVjdFxuICAgIC8vIGZpbHRlcnMgaXMgdGhlbiBsaXN0IG90aGVyd2lzZSBhcnJheVxuICAgIHJldHVybiB2YWwgJiYgdmFsLnRvSlMgPyB2YWwudG9KUygpIDogdmFsIHx8IFtdO1xuICB9O1xuXG4gIGdldENvbXBvbmVudERpc2FibGVkU3RhdGUgPSAocm93SW5kZXgsIGNvbCwgbW9kZSkgPT4ge1xuICAgIGxldCBjb21wb25lbnREaXNhYmxlZCA9ICEhY29sLmRpc2FibGVFZGl0aW5nO1xuICAgIC8vIGNoZWNrIGlmIGNvbXBvbmVudCBpcyBkaXNhYmxlZCBieSBvdGhlciBjb2x1bW4gZGF0YVxuICAgIGlmICghY29tcG9uZW50RGlzYWJsZWQgJiYgY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoKSB7XG4gICAgICBpZiAobW9kZSA9PT0gJ2NyZWF0ZScpIHtcbiAgICAgICAgY29tcG9uZW50RGlzYWJsZWQgPSB0aGlzLmdldENyZWF0ZUl0ZW1WYWx1ZShyb3dJbmRleCwge1xuICAgICAgICAgIHZhbHVlS2V5UGF0aDogY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWVLZXlQYXRoLFxuICAgICAgICB9KSA9PT0gY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb21wb25lbnREaXNhYmxlZCA9IHRoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwge1xuICAgICAgICAgIHZhbHVlS2V5UGF0aDogY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWVLZXlQYXRoLFxuICAgICAgICB9KSA9PT0gY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb21wb25lbnREaXNhYmxlZDtcbiAgfTtcblxuICBnZXRSb3dDbGFzc05hbWUgPSAocm93SW5kZXgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBncmlkLCBpc0NyZWF0aW5nLCBpc0VkaXRpbmcsIGNyZWF0ZURhdGEsIHNlbGVjdGVkSXRlbXMsIGRhdGEsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgcm93Q2xhc3NOYW1lcyA9IFsnb2MtZGF0YWdyaWQtcm93J107XG4gICAgbGV0IGV4dHJhUm93Q291bnQgPSAwOyAvLyBob3cgbWFueSByb3dzIHRvIGlnbm9yZSBmcm9tIHRvcCwgbmV3ICsgZmlsdGVyIHJvd3NcbiAgICBpZiAoaXNDcmVhdGluZykgZXh0cmFSb3dDb3VudCA9IGNyZWF0ZURhdGEuc2l6ZTtcbiAgICBpZiAoaXNDcmVhdGluZykge1xuICAgICAgaWYgKHJvd0luZGV4IDw9IGV4dHJhUm93Q291bnQgLSAxKSB7XG4gICAgICAgIHJvd0NsYXNzTmFtZXMucHVzaCgnb2MtZGF0YWdyaWQtcm93LW5ldycpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNFZGl0aW5nKSB7XG4gICAgICByb3dDbGFzc05hbWVzLnB1c2goJ29jLWRhdGFncmlkLXJvdy1lZGl0Jyk7XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgaWYgcm93IGlzIHNlbGVjdGVkXG4gICAgaWYgKCFpc0NyZWF0aW5nICYmICFpc0VkaXRpbmcgJiYgKHNlbGVjdGVkSXRlbXMgJiYgZ3JpZC5pZEtleVBhdGgpKSB7XG4gICAgICBpZiAoc2VsZWN0ZWRJdGVtcy5pbmRleE9mKGRhdGEuZ2V0SW4oW3Jvd0luZGV4IC0gZXh0cmFSb3dDb3VudCwgLi4uZ3JpZC5pZEtleVBhdGhdKSkgIT09IC0xKSB7XG4gICAgICAgIHJvd0NsYXNzTmFtZXMucHVzaCgnaXMtc2VsZWN0ZWQnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5wcm9wcy5yb3dDbGFzc05hbWVHZXR0ZXIpIHtcbiAgICAgIHJldHVybiByb3dDbGFzc05hbWVzLmpvaW4oJyAnKSArICcgJyArIHRoaXMucHJvcHMucm93Q2xhc3NOYW1lR2V0dGVyKHJvd0luZGV4KTtcbiAgICB9XG4gICAgcmV0dXJuIHJvd0NsYXNzTmFtZXMuam9pbignICcpO1xuICB9O1xuXG4gIGdldENlbGxNZXNzYWdlcyA9IChyb3dJbmRleCwgY29sLCBjZWxsVHlwZSkgPT4ge1xuICAgIGNvbnN0IHJldHVybkRhdGEgPSB7fTtcbiAgICBpZiAoIXRoaXMucHJvcHMuZ3JpZC5pZEtleVBhdGggfHwgIWNvbC52YWx1ZUtleVBhdGgpIHtcbiAgICAgIHJldHVybiByZXR1cm5EYXRhO1xuICAgIH1cbiAgICBsZXQgaW5mb01lc3NhZ2U7XG4gICAgbGV0IGVycm9yTWVzc2FnZTtcbiAgICBsZXQgd2FybmluZ01lc3NhZ2U7XG4gICAgaWYgKGNlbGxUeXBlID09PSAnY3JlYXRlJykge1xuICAgICAgaW5mb01lc3NhZ2UgPSB0aGlzLnByb3BzLmNyZWF0ZUNlbGxNZXNzYWdlcy5nZXRJbihbJ2luZm8nLCByb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgZXJyb3JNZXNzYWdlID0gdGhpcy5wcm9wcy5jcmVhdGVDZWxsTWVzc2FnZXMuZ2V0SW4oWydlcnJvcicsIHJvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgICB3YXJuaW5nTWVzc2FnZSA9IHRoaXMucHJvcHMuY3JlYXRlQ2VsbE1lc3NhZ2VzLmdldEluKFtcbiAgICAgICAgJ3dhcm5pbmcnLFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgLi4uY29sLnZhbHVlS2V5UGF0aCxcbiAgICAgIF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgICBpbmZvTWVzc2FnZSA9IHRoaXMucHJvcHMuY2VsbE1lc3NhZ2VzLmdldEluKFsnaW5mbycsIGlkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgICBlcnJvck1lc3NhZ2UgPSB0aGlzLnByb3BzLmNlbGxNZXNzYWdlcy5nZXRJbihbJ2Vycm9yJywgaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgIHdhcm5pbmdNZXNzYWdlID0gdGhpcy5wcm9wcy5jZWxsTWVzc2FnZXMuZ2V0SW4oWyd3YXJuaW5nJywgaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICB9XG4gICAgaWYgKGluZm9NZXNzYWdlKSB7XG4gICAgICByZXR1cm5EYXRhLmluZm9NZXNzYWdlID0gaW5mb01lc3NhZ2U7XG4gICAgfVxuICAgIGlmIChlcnJvck1lc3NhZ2UpIHtcbiAgICAgIHJldHVybkRhdGEuZXJyb3JNZXNzYWdlID0gZXJyb3JNZXNzYWdlO1xuICAgIH1cbiAgICBpZiAod2FybmluZ01lc3NhZ2UpIHtcbiAgICAgIHJldHVybkRhdGEud2FybmluZ01lc3NhZ2UgPSB3YXJuaW5nTWVzc2FnZTtcbiAgICB9XG4gICAgcmV0dXJuIHJldHVybkRhdGE7XG4gIH07XG5cbiAgZ2V0U2Nyb2xsVG9Sb3cgPSAoKSA9PiB7XG4gICAgbGV0IHNjcm9sbFRvUm93O1xuICAgIGlmICh0aGlzLnByb3BzLmlzQ3JlYXRpbmcgJiYgIXRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwpIHJldHVybiBzY3JvbGxUb1JvdztcbiAgICBpZiAodGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCkge1xuICAgICAgY29uc3Qgc2Nyb2xsTmV3Um93ID0gdGhpcy5wcm9wcy5jcmVhdGVEYXRhLnNpemUgLSAxO1xuICAgICAgaWYgKHNjcm9sbE5ld1JvdyA+PSAwKSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gc2Nyb2xsTmV3Um93O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5pc0VkaXRpbmcgJiYgIXRoaXMucHJvcHMuc2Nyb2xsSW5FZGl0TW9kZSkge1xuICAgICAgICBzY3JvbGxUb1JvdyA9IHRoaXMuc3RhdGUuY3VycmVudFJvdztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gdGhpcy5wcm9wcy5zY3JvbGxUb1JvdzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgfVxuICAgICAgaWYgKHNjcm9sbFRvUm93ID09PSB1bmRlZmluZWQgJiYgdGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLnNpemUgPiAwKSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gdGhpcy5nZXRTZWxlY3RlZEl0ZW1JbmRleCh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuZmlyc3QoKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzY3JvbGxUb1JvdztcbiAgfTtcblxuICBzZXRGb2N1c1RvID0gKGZvY3VzVG8pID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5pc0VkaXRpbmcgfHwgdGhpcy5wcm9wcy5pc0NyZWF0aW5nKSB7XG4gICAgICBpZiAoZm9jdXNUbyAmJiBmb2N1c1RvLmdldCgndHlwZScpICYmIGZvY3VzVG8gIT09IHRoaXMucHJldkZvY3VzVG8pIHtcbiAgICAgICAgdGhpc1tmb2N1c1RvLmdldCgndHlwZScpXSA9IHRydWU7XG4gICAgICAgIHRoaXMuZm9jdXNUb0xhc3RSb3cgPSBmb2N1c1RvLmdldCgnZm9jdXNUb0xhc3RSb3cnKTtcbiAgICAgICAgdGhpcy5wcmV2Rm9jdXNUbyA9IGZvY3VzVG87XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZUNlbGxTZWxlY3QgPSAoY2VsbFR5cGUsIHJvd0luZGV4LCBjb2x1bW5LZXkpID0+ICgpID0+IHtcbiAgICBpZiAoY2VsbFR5cGUgPT09ICd2aWV3JyAmJiB0aGlzLnByb3BzLmNlbGxTZWxlY3QpIHtcbiAgICAgIHRoaXMucHJvcHMuY2VsbFNlbGVjdGlvbkNoYW5nZShcbiAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICBNYXAoe1xuICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgIGNvbHVtbktleSxcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVDcmVhdGVDZWxsUmVmID0gKHJvd0luZGV4LCBjb2wpID0+IChyZWYpID0+IHtcbiAgICAvLyBGb2N1cyB0byBjcmVhdGUgY2VsbFxuICAgIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2wpO1xuICAgIGNvbnN0IHNlbGVjdFJlZiA9ICFyZWYgfHwgcmVmLmZvY3VzID8gcmVmIDogdGhpcy5nZXRTZWxlY3RSZWYocmVmKTtcbiAgICBpZiAoXG4gICAgICB0aGlzLnByb3BzLmNyZWF0ZURhdGEuc2l6ZVxuICAgICAgJiYgdGhpcy5wcm9wcy5jcmVhdGVEYXRhLnNpemUgPT09IHJvd0luZGV4ICsgMVxuICAgICAgJiYgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbFxuICAgICAgJiYgIXRoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnY3JlYXRlJylcbiAgICAgICYmIHNlbGVjdFJlZlxuICAgICkge1xuICAgICAgc2VsZWN0UmVmLmZvY3VzKCk7XG4gICAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcHMuZW5hYmxlQXJyb3dOYXZpZ2F0aW9uKSB7XG4gICAgICB0aGlzLmNyZWF0ZUNlbGxSZWZzW2Ake3RoaXMucHJvcHMuZ3JpZC5pZH1fJHtjb2x1bW5LZXl9XyR7cm93SW5kZXh9YF0gPSByZWY7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZUVkaXRDZWxsUmVmID0gKHJvd0luZGV4LCBjb2wpID0+IChyZWYpID0+IHtcbiAgICBjb25zdCBjb2x1bW5LZXkgPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sKTtcbiAgICBpZiAodGhpcy5mb2N1c1RvRWRpdENlbGwgJiYgIXRoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnZWRpdCcpKSB7XG4gICAgICBjb25zdCBzZWxlY3RlZFJvd0luZGV4ID0gdGhpcy5mb2N1c1RvTGFzdFJvdyAmJiB0aGlzLnByb3BzLmRhdGEuc2l6ZSA+IDBcbiAgICAgICAgPyB0aGlzLnByb3BzLmRhdGEuc2l6ZSAtIDFcbiAgICAgICAgOiB0aGlzLmdldFNlbGVjdGVkSXRlbUluZGV4KHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5maXJzdCgpKTtcblxuICAgICAgY29uc3QgeyBzZWxlY3RlZENlbGwgfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCBzZWxlY3RSZWYgPSAhcmVmIHx8IHJlZi5mb2N1cyA/IHJlZiA6IHRoaXMuZ2V0U2VsZWN0UmVmKHJlZik7XG4gICAgICBpZiAoc2VsZWN0ZWRDZWxsLnNpemUgPiAwKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBzZWxlY3RlZENlbGwuZ2V0KCdyb3dJbmRleCcpID09PSByb3dJbmRleFxuICAgICAgICAgICYmIHNlbGVjdGVkQ2VsbC5nZXQoJ2NvbHVtbktleScpID09PSBjb2x1bW5LZXlcbiAgICAgICAgICAmJiBzZWxlY3RSZWZcbiAgICAgICAgKSB7XG4gICAgICAgICAgc2VsZWN0UmVmLmZvY3VzKCk7XG4gICAgICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmZvY3VzVG9MYXN0Um93ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWRSb3dJbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZm9jdXNUb0xhc3RSb3cgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWRSb3dJbmRleCA9PT0gcm93SW5kZXggJiYgc2VsZWN0UmVmKSB7XG4gICAgICAgIHNlbGVjdFJlZi5mb2N1cygpO1xuICAgICAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZvY3VzVG9MYXN0Um93ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZUFycm93TmF2aWdhdGlvbikge1xuICAgICAgdGhpcy5jZWxsUmVmc1tgJHt0aGlzLnByb3BzLmdyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4fWBdID0gcmVmO1xuICAgIH1cbiAgfTtcblxuICBtb3ZlQ2VsbEZvY3VzID0gKG5leHRFbGVtZW50LCByb3dJbmRleCwgY29sdW1uSW5kZXgpID0+IHtcbiAgICBjb25zdCBlbGVtZW50VHlwZXMgPSBbJ3RleHQnLCAnY2hlY2tib3gnXTtcbiAgICBpZiAobmV4dEVsZW1lbnQgJiYgZWxlbWVudFR5cGVzLmluY2x1ZGVzKG5leHRFbGVtZW50LnR5cGUpKSB7XG4gICAgICBpZiAocm93SW5kZXggIT09IC0xIHx8IGNvbHVtbkluZGV4ICE9PSAtMSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBjdXJyZW50Q29sdW1uOiBjb2x1bW5JbmRleCxcbiAgICAgICAgICBjdXJyZW50Um93OiByb3dJbmRleCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKG5leHRFbGVtZW50LnR5cGUgPT09ICdjaGVja2JveCcpIG5leHRFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIGlmIChuZXh0RWxlbWVudC50eXBlID09PSAndGV4dCcpIG5leHRFbGVtZW50LnNlbGVjdCgpO1xuICAgICAgfSwgNTApO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVTZWxlY3RBbGxDaGVja0JveE9uQ2hhbmdlID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMuc2VsZWN0QWxsSXRlbXNDaGFuZ2UodGhpcy5wcm9wcy5ncmlkKTtcbiAgfTtcblxuICBoYW5kbGVTZWxlY3Rpb25DaGVja0JveE9uQ2hhbmdlID0gcm93SW5kZXggPT4gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMuaXRlbVNlbGVjdGlvbkNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIHJvd0luZGV4LCB0cnVlLCBmYWxzZSk7XG4gIH07XG5cbiAgZ2VuZXJhdGVDb2x1bW5zID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGRhdGEsXG4gICAgICBzZWxlY3RlZEl0ZW1zLFxuICAgICAgZGF0ZUZvcm1hdCxcbiAgICAgIHRob3VzYW5kU2VwYXJhdG9yLFxuICAgICAgZGVjaW1hbFNlcGFyYXRvcixcbiAgICAgIGdyaWQsXG4gICAgICBpbmxpbmVFZGl0LFxuICAgICAgZmlsdGVyaW5nLFxuICAgICAgcmVnaW9uLFxuICAgICAgaW50bCxcbiAgICAgIHNlbGVjdENvbXBvbmVudE9wdGlvbnMsXG4gICAgICBpc0NyZWF0aW5nLFxuICAgICAgZXh0cmFDb2x1bW4sXG4gICAgICByb3dTZWxlY3RDaGVja2JveENvbHVtbixcbiAgICAgIHNob3dTZWxlY3RBbGxDaGVja2JveCxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IGNvbHVtbnMgPSBbXTtcbiAgICBjb25zdCB0YWJJbmRleCA9IFN0cmluZyh0aGlzLnByb3BzLnRhYkluZGV4KTtcbiAgICBpZiAoZXh0cmFDb2x1bW4pIHtcbiAgICAgIGNvbHVtbnMucHVzaCh7XG4gICAgICAgIHdpZHRoOiBleHRyYUNvbHVtbi53aWR0aCB8fCA0MCxcbiAgICAgICAgaXNSZXNpemFibGU6ICEhZXh0cmFDb2x1bW4uaXNSZXNpemFibGUsXG4gICAgICAgIGlzU29ydGFibGU6IGZhbHNlLFxuICAgICAgICBjb2x1bW5LZXk6ICdleHRyYUNvbHVtbicsXG4gICAgICAgIGNlbGw6IHJvd0luZGV4ID0+IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWV4dHJhLWNvbHVtbi1jZWxsIG5vLXJvdy1zZWxlY3RcIj5cbiAgICAgICAgICAgIHtleHRyYUNvbHVtbi52YWx1ZVJlbmRlcihkYXRhLmdldChyb3dJbmRleCksIHJvd0luZGV4KX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSxcbiAgICAgICAgY2VsbEVkaXQ6IHJvd0luZGV4ID0+IChleHRyYUNvbHVtbi5jZWxsRWRpdCA/IGV4dHJhQ29sdW1uLmNlbGxFZGl0KHJvd0luZGV4KSA6IG51bGwpLFxuICAgICAgICBjZWxsQ3JlYXRlOiByb3dJbmRleCA9PiAoZXh0cmFDb2x1bW4uY2VsbENyZWF0ZSA/IGV4dHJhQ29sdW1uLmNlbGxDcmVhdGUocm93SW5kZXgpIDogbnVsbCksXG4gICAgICAgIGNlbGxGaWx0ZXI6IHJvd0luZGV4ID0+IChleHRyYUNvbHVtbi5jZWxsRmlsdGVyID8gZXh0cmFDb2x1bW4uY2VsbEZpbHRlcihyb3dJbmRleCkgOiBudWxsKSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChyb3dTZWxlY3RDaGVja2JveENvbHVtbikge1xuICAgICAgY29sdW1ucy5wdXNoKHtcbiAgICAgICAgd2lkdGg6IDQwLFxuICAgICAgICBpc1Jlc2l6YWJsZTogZmFsc2UsXG4gICAgICAgIGlzU29ydGFibGU6IGZhbHNlLFxuICAgICAgICBjb2x1bW5LZXk6ICdzZWxlY3Rpb25DaGVja2JveCcsXG4gICAgICAgIGhlYWRlcjogc2hvd1NlbGVjdEFsbENoZWNrYm94ICYmIChcbiAgICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZFNlbGVjdEFsbENoZWNrQm94LSR7Z3JpZC5pZH1gfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtc2VsZWN0LWFsbC1jaGVja2JveC1jZWxsIG5vLXJvdy1zZWxlY3RcIlxuICAgICAgICAgICAgY2hlY2tlZD17ZGF0YS5zaXplICE9PSAwICYmIGRhdGEuc2l6ZSA9PT0gc2VsZWN0ZWRJdGVtcy5zaXplfVxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlU2VsZWN0QWxsQ2hlY2tCb3hPbkNoYW5nZX1cbiAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAvPlxuICAgICAgICApLFxuICAgICAgICBjZWxsOiAocm93SW5kZXgpID0+IHtcbiAgICAgICAgICBjb25zdCByb3dJdGVtID0gZGF0YS5nZXQocm93SW5kZXgpO1xuICAgICAgICAgIGNvbnN0IGl0ZW1JZCA9IHJvd0l0ZW0uZ2V0SW4oZ3JpZC5pZEtleVBhdGgpO1xuICAgICAgICAgIGNvbnN0IHNlbGVjdGVkID0gc2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhpdGVtSWQpO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkU2VsZWN0Q2hlY2tCb3gtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtc2VsZWN0LWNoZWNrYm94LWNlbGwgbm8tcm93LXNlbGVjdFwiXG4gICAgICAgICAgICAgIGNoZWNrZWQ9e3NlbGVjdGVkfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVTZWxlY3Rpb25DaGVja0JveE9uQ2hhbmdlKHJvd0luZGV4KX1cbiAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICBjZWxsRWRpdDogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbENyZWF0ZTogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbEZpbHRlcjogKCkgPT4gbnVsbCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHZpc2libGVDb2x1bW5zID0gW107XG4gICAgdGhpcy5wcm9wcy52aXNpYmxlQ29sdW1ucy5mb3JFYWNoKCh2aXNpYmxlQ29sdW1uS2V5KSA9PiB7XG4gICAgICB0aGlzLnByb3BzLmNvbHVtbnMuZm9yRWFjaCgob3JnQ29sKSA9PiB7XG4gICAgICAgIGlmIChVdGlscy5nZXRDb2x1bW5LZXkob3JnQ29sKSA9PT0gdmlzaWJsZUNvbHVtbktleSkge1xuICAgICAgICAgIHZpc2libGVDb2x1bW5zLnB1c2gob3JnQ29sKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgdmlzaWJsZUNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZUVtcHR5Q2hlY2tlciA9IFV0aWxzLmdldFZhbHVlRW1wdHlDaGVja2VyKGNvbCk7XG4gICAgICAvLyBDZWxsIHZhbHVlIHJlbmRlcmluZ1xuICAgICAgY29uc3QgdmFsdWVSZW5kZXIgPSAocm93SW5kZXgsIGZvcm1hdCkgPT4ge1xuICAgICAgICBjb25zdCB2YWwgPSBkYXRhLmdldEluKFtyb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsKSkge1xuICAgICAgICAgIHJldHVybiBjb2wuaXNSZXF1aXJlZCA/IDxNIGlkPVwiR3JpZC5WYWx1ZUlzTWlzc2luZ1wiIC8+IDogJyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvcm1hdCA/IGZvcm1hdCh2YWwpIDogdmFsO1xuICAgICAgfTtcblxuICAgICAgbGV0IGNvbHVtbiA9IEdyaWRDb2x1bW5TZXJ2aWNlLmJhc2VDb2x1bW4oY29sKTtcbiAgICAgIC8vIENvbGxlY3QgY29sdW1uIGZ1bmN0aW9ucyBpbnRvIG9uZSBPYmplY3RcbiAgICAgIGNvbnN0IGNvbHVtbkZ1bmN0aW9ucyA9IHtcbiAgICAgICAgZWRpdDoge1xuICAgICAgICAgIGdldEl0ZW1WYWx1ZTogdGhpcy5nZXRFZGl0SXRlbVZhbHVlLFxuICAgICAgICAgIG9uQ2VsbFZhbHVlQ2hhbmdlOiB0aGlzLm9uRWRpdENlbGxWYWx1ZUNoYW5nZSxcbiAgICAgICAgICBvbkNlbGxCbHVyOiB0aGlzLm9uRWRpdENlbGxCbHVyLFxuICAgICAgICAgIG9uQ2VsbEZvY3VzOiB0aGlzLm9uQ2VsbEZvY3VzLFxuICAgICAgICAgIG9uQ2VsbEtleURvd246IHRoaXMub25FZGl0Q2VsbEtleURvd24sXG4gICAgICAgICAgaGFuZGxlQ2VsbFJlZjogdGhpcy5oYW5kbGVFZGl0Q2VsbFJlZixcbiAgICAgICAgfSxcbiAgICAgICAgY3JlYXRlOiB7XG4gICAgICAgICAgZ2V0SXRlbVZhbHVlOiB0aGlzLmdldENyZWF0ZUl0ZW1WYWx1ZSxcbiAgICAgICAgICBvbkNlbGxWYWx1ZUNoYW5nZTogdGhpcy5vbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSxcbiAgICAgICAgICBvbkNlbGxCbHVyOiB0aGlzLm9uQ3JlYXRlQ2VsbEJsdXIsXG4gICAgICAgICAgb25DZWxsRm9jdXM6IHRoaXMub25DZWxsRm9jdXMsXG4gICAgICAgICAgb25DZWxsS2V5RG93bjogdGhpcy5vbkNyZWF0ZUNlbGxLZXlEb3duLFxuICAgICAgICAgIGhhbmRsZUNlbGxSZWY6IHRoaXMuaGFuZGxlQ3JlYXRlQ2VsbFJlZixcbiAgICAgICAgfSxcbiAgICAgICAgZmlsdGVyOiB7XG4gICAgICAgICAgZ2V0SXRlbVZhbHVlOiB0aGlzLmdldEZpbHRlckl0ZW1WYWx1ZSxcbiAgICAgICAgICBnZXRJdGVtTXVsdGlWYWx1ZTogdGhpcy5nZXRGaWx0ZXJJdGVtTXVsdGlWYWx1ZSxcbiAgICAgICAgICBvbkNlbGxWYWx1ZUNoYW5nZTogdGhpcy5vbkZpbHRlckNlbGxWYWx1ZUNoYW5nZSxcbiAgICAgICAgICBvbkNlbGxNdWx0aVZhbHVlQmx1cjogdGhpcy5vbkZpbHRlckNlbGxNdWx0aVZhbHVlQmx1cixcbiAgICAgICAgICBvbkNlbGxNdWx0aVZhbHVlQ2hhbmdlOiB0aGlzLm9uRmlsdGVyQ2VsbE11bHRpVmFsdWVDaGFuZ2UsXG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICAvLyBoYW5kbGUgY29sdW1uLmNlbGwgLyBjb2x1bW4uY2VsbEVkaXQgLyBjb2x1bW4uY2VsbENyZWF0ZSAvIGNvbHVtbi5jZWxsRmlsdGVyXG4gICAgICBjb25zdCBjZWxsUHJvcHMgPSB7XG4gICAgICAgIGdyaWQsXG4gICAgICAgIGRhdGEsXG4gICAgICAgIGRhdGVGb3JtYXQsXG4gICAgICAgIHRob3VzYW5kU2VwYXJhdG9yLFxuICAgICAgICBkZWNpbWFsU2VwYXJhdG9yLFxuICAgICAgICBzZWxlY3RDb21wb25lbnRPcHRpb25zLFxuICAgICAgfTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgY29sdW1uID0gR3JpZENvbHVtblNlcnZpY2UuY29sdW1uQ2VsbChjb2x1bW4sIGNlbGxQcm9wcywgY29sLCB2YWx1ZVJlbmRlcik7XG5cbiAgICAgIC8vIGhhbmRsZSBjb2x1bW5Db21wb25lbnRUeXBlc1xuICAgICAgY29uc3QgY29tcG9uZW50VHlwZVByb3BzID0ge1xuICAgICAgICAuLi5jZWxsUHJvcHMsXG4gICAgICAgIGlubGluZUVkaXQsXG4gICAgICAgIGZpbHRlcmluZyxcbiAgICAgICAgcmVnaW9uLFxuICAgICAgICBpbnRsLFxuICAgICAgICBzZWxlY3RDb21wb25lbnRPcHRpb25zLFxuICAgICAgfTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgY29sdW1uID0gR3JpZENvbHVtblNlcnZpY2UuY29sdW1uQ29tcG9uZW50VHlwZShcbiAgICAgICAgY29sdW1uLFxuICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgY29tcG9uZW50VHlwZVByb3BzLFxuICAgICAgICBjb2wsXG4gICAgICAgIGNvbHVtbkZ1bmN0aW9ucyxcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlLFxuICAgICAgKTtcbiAgICAgIGNvbHVtbnMucHVzaChjb2x1bW4pO1xuICAgIH0pO1xuXG4gICAgaWYgKGlzQ3JlYXRpbmcpIHtcbiAgICAgIGNvbHVtbnMucHVzaCh7XG4gICAgICAgIHdpZHRoOiAzNyxcbiAgICAgICAgaXNSZXNpemFibGU6IGZhbHNlLFxuICAgICAgICBjb2x1bW5LZXk6ICdyZW1vdmVOZXdJdGVtJyxcbiAgICAgICAgY2VsbDogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbEVkaXQ6ICgpID0+IG51bGwsXG4gICAgICAgIGNlbGxDcmVhdGU6IHJvd0luZGV4ID0+IChcbiAgICAgICAgICA8SWNvblxuICAgICAgICAgICAgaWQ9e2BvYy1kYXRhZ3JpZC1uZXctaXRlbS1yZW1vdmUtJHtncmlkLmlkfS0ke3Jvd0luZGV4fWB9XG4gICAgICAgICAgICB0eXBlPVwiaW5kaWNhdG9yXCJcbiAgICAgICAgICAgIG5hbWU9XCJkZWxldGVcIlxuICAgICAgICAgICAgd2lkdGg9ezMwfVxuICAgICAgICAgICAgaGVpZ2h0PXszMH1cbiAgICAgICAgICAgIHN0eWxlPXt7IHBhZGRpbmc6ICc3cHgnIH19XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0aGlzLnByb3BzLnJlbW92ZU5ld0l0ZW0oZ3JpZCwgcm93SW5kZXgpfVxuICAgICAgICAgIC8+XG4gICAgICAgICksXG4gICAgICAgIGNlbGxGaWx0ZXI6ICgpID0+IG51bGwsXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbHVtbnM7XG4gIH07XG5cbiAgaXNDZWxsRWRpdGVkID0gKHJvd0luZGV4LCBjb2wsIGNlbGxUeXBlKSA9PiB7XG4gICAgaWYgKGNlbGxUeXBlICE9PSAnZWRpdCcpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgaWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgIHJldHVybiAhIXRoaXMucHJvcHMuZWRpdERhdGEuZ2V0SW4oW2lkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gIH07XG5cbiAgaGFuZGxlQWZ0ZXJBZGRJdGVtID0gKCkgPT4ge1xuICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgPSB0cnVlO1xuICB9O1xuXG4gIGhhbmRsZUFmdGVyRWRpdFByZXNzID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuc2l6ZSkge1xuICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSB0cnVlO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGN1cnJlbnRSb3c6IHVuZGVmaW5lZCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVBZnRlclZhbGlkYXRpb25FcnJvciA9ICgpID0+IHtcbiAgICB0aGlzLmZvY3VzVG9FcnJvckNlbGwgPSB0cnVlO1xuICB9O1xuXG4gIGhhbmRsZVJvd0NsaWNrID0gKGUsIHJvd0luZGV4KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMucm93U2VsZWN0ICYmICF0aGlzLnByb3BzLmlzQ3JlYXRpbmcgJiYgIXRoaXMucHJvcHMuaXNFZGl0aW5nKSB7XG4gICAgICBpZiAoZS5jdHJsS2V5IHx8IGUuc2hpZnRLZXkpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0U2VsZWN0aW9uKCkucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICB9XG4gICAgICAvLyBEb24ndCB0cmlnZ2VyIHNlbGVjdGlvbiBjaGFuZ2Ugb24gd2hlbiB1c2VyIGNsaWNrcyBvbiBzcGVjaWFsIGNlbGxzIGxpa2UgY2hlY2tib3gvZXh0cmFcbiAgICAgIC8vIENoZWNrIHRoYXQgY2xpY2tlZCBub2RlJ3MgcGFyZW50IG9yIHBhcmVudCdzIHBhcmVudCBkb2Vzbid0IGhhdmUgbm8tcm93LXNlbGVjdCBjbGFzc1xuICAgICAgY29uc3QgeyBwYXJlbnROb2RlIH0gPSBlLnRhcmdldDtcbiAgICAgIGNvbnN0IHBhcmVudDFjbGFzcyA9IHBhcmVudE5vZGUuY2xhc3NOYW1lICYmIHBhcmVudE5vZGUuY2xhc3NOYW1lLmluZGV4T2YgPyBwYXJlbnROb2RlLmNsYXNzTmFtZSA6ICcnO1xuICAgICAgY29uc3QgcGFyZW50MmNsYXNzID0gICAgICAgIHBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUgJiYgcGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZS5pbmRleE9mIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgPyBwYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgIDogJyc7XG4gICAgICBjb25zdCBwYXJlbnQzY2xhc3MgPSBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWVcbiAgICAgICAgJiYgcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lLmluZGV4T2YgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICA/IHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZVxuICAgICAgICA6ICcnO1xuICAgICAgY29uc3QgcGFyZW50NGNsYXNzID0gcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWVcbiAgICAgICAgJiYgcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUuaW5kZXhPZiAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgID8gcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWVcbiAgICAgICAgOiAnJztcbiAgICAgIGlmIChcbiAgICAgICAgcGFyZW50MWNsYXNzLmluZGV4T2YoJ25vLXJvdy1zZWxlY3QnKSA9PT0gLTFcbiAgICAgICAgJiYgcGFyZW50MmNsYXNzLmluZGV4T2YoJ25vLXJvdy1zZWxlY3QnKSA9PT0gLTFcbiAgICAgICAgJiYgcGFyZW50M2NsYXNzLmluZGV4T2YoJ25vLXJvdy1zZWxlY3QnKSA9PT0gLTFcbiAgICAgICAgJiYgcGFyZW50NGNsYXNzLmluZGV4T2YoJ25vLXJvdy1zZWxlY3QnKSA9PT0gLTFcbiAgICAgICkge1xuICAgICAgICB0aGlzLnByb3BzLml0ZW1TZWxlY3Rpb25DaGFuZ2UoXG4gICAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgIHRoaXMucHJvcHMubXVsdGlTZWxlY3QgJiYgZS5jdHJsS2V5LFxuICAgICAgICAgIHRoaXMucHJvcHMubXVsdGlTZWxlY3QgJiYgZS5zaGlmdEtleSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMub25Sb3dDbGljaykge1xuICAgICAgdGhpcy5wcm9wcy5vblJvd0NsaWNrKGUsIHJvd0luZGV4LCB0aGlzLnByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGhhbmRsZUNvbnRleHRNZW51ID0gKGUsIHJvd0luZGV4KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuY29udGV4dE1lbnVJdGVtcykge1xuICAgICAgY29uc3Qge1xuICAgICAgICBpdGVtU2VsZWN0aW9uQ2hhbmdlLCBzZWxlY3RlZEl0ZW1zLCBncmlkLCBkYXRhLFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGNvbnRleHRNZW51T3BlbjogdHJ1ZSxcbiAgICAgICAgY29udGV4dE1lbnVYOiBlLmNsaWVudFgsXG4gICAgICAgIGNvbnRleHRNZW51WTogZS5jbGllbnRZLFxuICAgICAgfSk7XG4gICAgICAvLyBJZiBjbGlja2VkIGl0ZW0gaXMgbm90IHNlbGVjdGVkLCBjaGFuZ2Ugc2VsZWN0aW9uIHRvIGl0XG4gICAgICBpZiAoIXNlbGVjdGVkSXRlbXMuaW5jbHVkZXMoZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmdyaWQuaWRLZXlQYXRoXSkpKSB7XG4gICAgICAgIGl0ZW1TZWxlY3Rpb25DaGFuZ2UoZ3JpZCwgcm93SW5kZXgpO1xuICAgICAgfVxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uRG9jdW1lbnRDbGljayk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGhhbmRsZUNvbnRleHRNZW51SXRlbUNsaWNrID0gKG9uQ2xpY2ssIHNlbGVjdGVkSXRlbXMsIHNlbGVjdGVkRGF0YSkgPT4gKCkgPT4ge1xuICAgIG9uQ2xpY2soc2VsZWN0ZWRJdGVtcywgc2VsZWN0ZWREYXRhKTtcbiAgfTtcblxuICBoYW5kbGVSb3dIZWlnaHRHZXR0ZXIgPSByb3dJbmRleCA9PiB0aGlzLnByb3BzLnJvd0hlaWdodEdldHRlcihcbiAgICB0aGlzLnByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSxcbiAgICByb3dJbmRleCxcbiAgKTtcblxuICByZW5kZXJDZWxsID0gY29sID0+IChjZWxsUHJvcHMpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBpc0NyZWF0aW5nLCBpc0VkaXRpbmcsIGNyZWF0ZURhdGEsIHNlbGVjdGVkQ2VsbCwgZ3JpZCxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHJvd0luZGV4LCAuLi5wcm9wcyB9ID0gY2VsbFByb3BzO1xuICAgIGxldCBjZWxsO1xuICAgIGxldCBjZWxsVHlwZSA9ICd2aWV3JztcbiAgICBsZXQgZXh0cmFSb3dDb3VudCA9IDA7IC8vIGhvdyBtYW55IHJvd3MgdG8gaWdub3JlIGZyb20gdG9wLCBuZXcgKyBmaWx0ZXIgcm93c1xuICAgIGlmIChpc0NyZWF0aW5nKSBleHRyYVJvd0NvdW50ID0gY3JlYXRlRGF0YS5zaXplO1xuICAgIGNvbnN0IGV4aXN0aW5nUm93c0luZGV4ID0gcm93SW5kZXggLSBleHRyYVJvd0NvdW50O1xuICAgIGlmIChpc0NyZWF0aW5nKSB7XG4gICAgICBpZiAocm93SW5kZXggPD0gZXh0cmFSb3dDb3VudCAtIDEpIHtcbiAgICAgICAgaWYgKGNvbC5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY2VsbCA9IGNvbC5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNyZWF0ZUNlbGxSZWYocm93SW5kZXgsIGNvbCksXG4gICAgICAgICAgICB0aGlzLm9uQ3JlYXRlQ2VsbEtleURvd24ocm93SW5kZXgsIGNvbCksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjZWxsVHlwZSA9ICdjcmVhdGUnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNlbGwgPSBudWxsO1xuICAgICAgICAgIGNlbGxUeXBlID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2VsbCA9IGNvbC5jZWxsKFxuICAgICAgICAgIGV4aXN0aW5nUm93c0luZGV4LFxuICAgICAgICAgIHRoaXMuaGFuZGxlQ3JlYXRlQ2VsbFJlZihleGlzdGluZ1Jvd3NJbmRleCwgY29sKSxcbiAgICAgICAgICB0aGlzLm9uQ3JlYXRlQ2VsbEtleURvd24oZXhpc3RpbmdSb3dzSW5kZXgsIGNvbCksXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc0VkaXRpbmcgJiYgY29sLmNlbGxFZGl0KSB7XG4gICAgICBjZWxsID0gY29sLmNlbGxFZGl0KFxuICAgICAgICBleGlzdGluZ1Jvd3NJbmRleCxcbiAgICAgICAgdGhpcy5oYW5kbGVFZGl0Q2VsbFJlZihleGlzdGluZ1Jvd3NJbmRleCwgY29sKSxcbiAgICAgICAgdGhpcy5vbkVkaXRDZWxsS2V5RG93bihleGlzdGluZ1Jvd3NJbmRleCwgY29sKSxcbiAgICAgICk7XG4gICAgICBjZWxsVHlwZSA9ICdlZGl0JztcbiAgICB9IGVsc2Uge1xuICAgICAgY2VsbCA9IGNvbC5jZWxsKFxuICAgICAgICBleGlzdGluZ1Jvd3NJbmRleCxcbiAgICAgICAgdGhpcy5oYW5kbGVFZGl0Q2VsbFJlZihleGlzdGluZ1Jvd3NJbmRleCwgY29sKSxcbiAgICAgICAgdGhpcy5vbkVkaXRDZWxsS2V5RG93bihleGlzdGluZ1Jvd3NJbmRleCwgY29sKSxcbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnN0IGlzU3BlY2lhbCA9IHByb3BzLmNvbHVtbktleSA9PT0gJ3NlbGVjdGlvbkNoZWNrYm94JyB8fCBwcm9wcy5jb2x1bW5LZXkgPT09ICdleHRyYUNvbHVtbic7XG4gICAgaWYgKChjZWxsVHlwZSA9PT0gJ3ZpZXcnIHx8IGNlbGxUeXBlID09PSAnZWRpdCcgfHwgY2VsbFR5cGUgPT09ICdjcmVhdGUnKSAmJiAhaXNTcGVjaWFsKSB7XG4gICAgICBjb25zdCBnZXRSb3dJbmRleCA9IGNlbGxUeXBlID09PSAnY3JlYXRlJyA/IHJvd0luZGV4IDogcm93SW5kZXggLSBleHRyYVJvd0NvdW50O1xuICAgICAgY29uc3QgbWVzc2FnZURhdGEgPSB0aGlzLmdldENlbGxNZXNzYWdlcyhnZXRSb3dJbmRleCwgY29sLCBjZWxsVHlwZSk7XG4gICAgICBjb25zdCBpc0VkaXRlZCA9IHRoaXMuaXNDZWxsRWRpdGVkKGdldFJvd0luZGV4LCBjb2wsIGNlbGxUeXBlKTtcbiAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IHNlbGVjdGVkQ2VsbC5nZXQoJ3Jvd0luZGV4JykgPT09IHJvd0luZGV4XG4gICAgICAgICYmIHNlbGVjdGVkQ2VsbC5nZXQoJ2NvbHVtbktleScpID09PSBwcm9wcy5jb2x1bW5LZXlcbiAgICAgICAgPyAnb2MtZGF0YWdyaWQtY2VsbCBpcy1zZWxlY3RlZCdcbiAgICAgICAgOiAnb2MtZGF0YWdyaWQtY2VsbCc7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Q2VsbFxuICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgICAgICBzdHlsZT17Y29sLnN0eWxlfVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2VsbFNlbGVjdChjZWxsVHlwZSwgcm93SW5kZXgsIHByb3BzLmNvbHVtbktleSl9XG4gICAgICAgID5cbiAgICAgICAgICA8Q2VsbFRvb2x0aXBcbiAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZENlbGwtJHtncmlkLmlkfS0ke3Byb3BzLmNvbHVtbktleX0tJHtyb3dJbmRleH1gfVxuICAgICAgICAgICAgaXNFZGl0ZWQ9e2lzRWRpdGVkfVxuICAgICAgICAgICAgaXNFcnJvcj17ISFtZXNzYWdlRGF0YS5lcnJvck1lc3NhZ2V9XG4gICAgICAgICAgICBpc1dhcm5pbmc9eyEhbWVzc2FnZURhdGEud2FybmluZ01lc3NhZ2V9XG4gICAgICAgICAgICBpbmZvTWVzc2FnZT17bWVzc2FnZURhdGEuaW5mb01lc3NhZ2V9XG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U9e21lc3NhZ2VEYXRhLmVycm9yTWVzc2FnZX1cbiAgICAgICAgICAgIHdhcm5pbmdNZXNzYWdlPXttZXNzYWdlRGF0YS53YXJuaW5nTWVzc2FnZX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7Y2VsbH1cbiAgICAgICAgICA8L0NlbGxUb29sdGlwPlxuICAgICAgICA8L0NlbGw+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPENlbGwgey4uLnByb3BzfSBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1jZWxsXCIgc3R5bGU9e2NvbC5zdHlsZX0+XG4gICAgICAgIHtjZWxsfVxuICAgICAgPC9DZWxsPlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyQ29sdW1ucyA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBhbGxEYXRhU2l6ZSwgZ3JpZCwgaXNDcmVhdGluZywgaXNCdXN5LCB2aXNpYmxlQ29sdW1ucyxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIWFsbERhdGFTaXplICYmICFpc0J1c3kgJiYgIWlzQ3JlYXRpbmcgJiYgIWdyaWQucGFnaW5hdGlvbikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPENvbHVtblxuICAgICAgICAgIGNvbHVtbktleT1cImRhdGFFbXB0eUNvbHVtblwiXG4gICAgICAgICAgaGVhZGVyPXsoXG4gICAgICAgICAgICA8Q2VsbCBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInIH19PlxuICAgICAgICAgICAgICA8TSBpZD1cIkdyaWQuTm9JdGVtc1wiIC8+XG4gICAgICAgICAgICA8L0NlbGw+XG4pfVxuICAgICAgICAgIHdpZHRoPXsxMH1cbiAgICAgICAgICBpc1Jlc2l6YWJsZT17ZmFsc2V9XG4gICAgICAgICAgZmxleEdyb3c9ezF9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoIXZpc2libGVDb2x1bW5zLnNpemUpIHtcbiAgICAgIGlmIChpc0J1c3kpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8Q29sdW1uXG4gICAgICAgICAgICBjb2x1bW5LZXk9XCJkYXRhRW1wdHlDb2x1bW5cIlxuICAgICAgICAgICAgaGVhZGVyPXs8Q2VsbD4mbmJzcDs8L0NlbGw+fVxuICAgICAgICAgICAgd2lkdGg9ezEwfVxuICAgICAgICAgICAgaXNSZXNpemFibGU9e2ZhbHNlfVxuICAgICAgICAgICAgZmxleEdyb3c9ezF9XG4gICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxDb2x1bW5cbiAgICAgICAgICBjb2x1bW5LZXk9XCJkYXRhRW1wdHlDb2x1bW5cIlxuICAgICAgICAgIGhlYWRlcj17KFxuICAgICAgICAgICAgPENlbGwgc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICAgICAgPE0gaWQ9XCJHcmlkLk5vQ29sdW1uc1wiIC8+XG4gICAgICAgICAgICA8L0NlbGw+XG4pfVxuICAgICAgICAgIHdpZHRoPXsxMH1cbiAgICAgICAgICBpc1Jlc2l6YWJsZT17ZmFsc2V9XG4gICAgICAgICAgZmxleEdyb3c9ezF9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCBjb2x1bW5zID0gdGhpcy5nZW5lcmF0ZUNvbHVtbnMoKTtcbiAgICBpZiAoY29sdW1ucy5sZW5naHQgPT09IDApIHJldHVybiBudWxsO1xuICAgIHJldHVybiBjb2x1bW5zLm1hcChjb2wgPT4gKFxuICAgICAgPENvbHVtblxuICAgICAgICBrZXk9e2NvbC5jb2x1bW5LZXl9XG4gICAgICAgIGNvbHVtbktleT17Y29sLmNvbHVtbktleX1cbiAgICAgICAgaGVhZGVyPXsoXG4gICAgICAgICAgPEhlYWRlckNlbGxcbiAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZEhlYWRlci0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2wuY29sdW1uS2V5fWB9XG4gICAgICAgICAgICBncmlkPXt0aGlzLnByb3BzLmdyaWR9XG4gICAgICAgICAgICBjb2x1bW5zPXt0aGlzLnByb3BzLmNvbHVtbnN9XG4gICAgICAgICAgICBjb2x1bW49e2NvbH1cbiAgICAgICAgICAgIGN1cnJlbnRTb3J0Q29sdW1uPXt0aGlzLnByb3BzLnNvcnRDb2x1bW59XG4gICAgICAgICAgICBjdXJyZW50U29ydE9yZGVyPXt0aGlzLnByb3BzLnNvcnRPcmRlcn1cbiAgICAgICAgICAgIG9uU29ydENoYW5nZT17dGhpcy5wcm9wcy5zb3J0Q2hhbmdlfVxuICAgICAgICAgICAgaXNCdXN5PXt0aGlzLnByb3BzLmlzQnVzeX1cbiAgICAgICAgICAgIGZpbHRlcmluZz17dGhpcy5wcm9wcy5maWx0ZXJpbmcgJiYgdGhpcy5wcm9wcy5pc0ZpbHRlcmluZ31cbiAgICAgICAgICAgIHdpZHRoPXt0aGlzLnByb3BzLmNvbHVtbldpZHRocy5nZXQoY29sLmNvbHVtbktleSwgY29sLndpZHRoKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7Y29sLmhlYWRlcn1cbiAgICAgICAgICA8L0hlYWRlckNlbGw+XG4pfVxuICAgICAgICBjZWxsPXt0aGlzLnJlbmRlckNlbGwoY29sKX1cbiAgICAgICAgd2lkdGg9e3RoaXMucHJvcHMuY29sdW1uV2lkdGhzLmdldChjb2wuY29sdW1uS2V5LCBjb2wud2lkdGgpfVxuICAgICAgICBtaW5XaWR0aD17Y29sLm1pbldpZHRofVxuICAgICAgICBtYXhXaWR0aD17Y29sLm1heFdpZHRofVxuICAgICAgICBpc1Jlc2l6YWJsZT17Y29sLmlzUmVzaXphYmxlfVxuICAgICAgICBmbGV4R3Jvdz17Y29sLmZsZXhHcm93ID8gY29sLmZsZXhHcm93IDogMH1cbiAgICAgICAgZml4ZWQ9e2NvbC5maXhlZH1cbiAgICAgICAgZml4ZWRSaWdodD17Y29sLmZpeGVkUmlnaHR9XG4gICAgICAgIGFsbG93Q2VsbHNSZWN5Y2xpbmc9e2NvbC5hbGxvd0NlbGxzUmVjeWNsaW5nfVxuICAgICAgLz5cbiAgICApKTtcbiAgfTtcblxuICByZW5kZXJDb250ZXh0TWVudSA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBjb250ZXh0TWVudUl0ZW1zLCBkYXRhLCBncmlkLCBzZWxlY3RlZEl0ZW1zLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgY29udGV4dE1lbnVYLCBjb250ZXh0TWVudVkgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3Qgc3R5bGUgPSB7XG4gICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgICAgekluZGV4OiAxMDAwMCxcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgdG9wOiBgJHtjb250ZXh0TWVudVl9cHhgLFxuICAgICAgbGVmdDogYCR7Y29udGV4dE1lbnVYfXB4YCxcbiAgICB9O1xuICAgIGNvbnN0IHNlbGVjdGVkRGF0YSA9IGRhdGEuZmlsdGVyKGQgPT4gc2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhkLmdldEluKGdyaWQuaWRLZXlQYXRoKSkpO1xuICAgIHJldHVybiAoXG4gICAgICA8dWwgY2xhc3NOYW1lPVwiZHJvcGRvd24tbWVudSBvYy1kYXRhZ3JpZC1jb250ZXh0LW1lbnUgb3BlblwiIHN0eWxlPXtzdHlsZX0+XG4gICAgICAgIHtjb250ZXh0TWVudUl0ZW1zXG4gICAgICAgICAgJiYgY29udGV4dE1lbnVJdGVtcy5tYXBcbiAgICAgICAgICAmJiBjb250ZXh0TWVudUl0ZW1zLm1hcCgoaXRlbSwgaSkgPT4ge1xuICAgICAgICAgICAgbGV0IHsgZGlzYWJsZWQgfSA9IGl0ZW07XG4gICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0uZGlzYWJsZWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgZGlzYWJsZWQgPSBpdGVtLmRpc2FibGVkKHNlbGVjdGVkSXRlbXMsIHNlbGVjdGVkRGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8TWVudUl0ZW1cbiAgICAgICAgICAgICAgICBrZXk9e2l9IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgICAgICAgICBoZWFkZXI9e2l0ZW0uaGVhZGVyfVxuICAgICAgICAgICAgICAgIGRpdmlkZXI9e2l0ZW0uZGl2aWRlcn1cbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgdGl0bGU9e2l0ZW0udGl0bGV9XG4gICAgICAgICAgICAgICAgb25DbGljaz17XG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZCB8fCAhaXRlbS5vbkNsaWNrXG4gICAgICAgICAgICAgICAgICAgID8gbnVsbFxuICAgICAgICAgICAgICAgICAgICA6IHRoaXMuaGFuZGxlQ29udGV4dE1lbnVJdGVtQ2xpY2soaXRlbS5vbkNsaWNrLCBzZWxlY3RlZEl0ZW1zLCBzZWxlY3RlZERhdGEpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2l0ZW0udmFsdWV9XG4gICAgICAgICAgICAgIDwvTWVudUl0ZW0+XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pfVxuICAgICAgPC91bD5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBncmlkQ2xhc3NOYW1lID0gY2xhc3NOYW1lcyh7XG4gICAgICAnb2MtZGF0YWdyaWQtY29udGFpbmVyJzogdHJ1ZSxcbiAgICAgICd3aXRoLWFjdGlvbmJhcic6IHRoaXMucHJvcHMuaW5saW5lRWRpdCAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlQWN0aW9uQmFyLFxuICAgICAgJ2lzLWJ1c3knOiB0aGlzLnByb3BzLmlzQnVzeSxcbiAgICAgICdpcy1lZGl0aW5nJzogdGhpcy5wcm9wcy5pc0VkaXRpbmcsXG4gICAgICAnaXMtY3JlYXRpbmcnOiB0aGlzLnByb3BzLmlzQ3JlYXRpbmcsXG4gICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgIH0pO1xuXG4gICAgLy8gY2hlY2sgaWYgdGhlcmUgaXMgYSBuZXcgcmVxdWVzdCB0byBjaGFuZ2UgZWRpdCBtb2RlIGZvY3VzXG4gICAgdGhpcy5zZXRGb2N1c1RvKHRoaXMucHJvcHMuZm9jdXNUeXBlKTtcblxuICAgIGxldCBhY3Rpb25CYXIgPSBudWxsO1xuICAgIGxldCBhY3Rpb25CYXJSaWdodCA9IG51bGw7XG4gICAgbGV0IGFjdGlvbkJhckxlZnQgPSBudWxsO1xuICAgIGlmIChcbiAgICAgICh0aGlzLnByb3BzLmFjdGlvbkJhclxuICAgICAgICB8fCB0aGlzLnByb3BzLmlubGluZUVkaXRcbiAgICAgICAgfHwgdGhpcy5wcm9wcy5maWx0ZXJpbmdcbiAgICAgICAgfHwgdGhpcy5wcm9wcy5yZW1vdmluZylcbiAgICAgICYmICF0aGlzLnByb3BzLmRpc2FibGVBY3Rpb25CYXJcbiAgICApIHtcbiAgICAgIGFjdGlvbkJhclJpZ2h0ID0gKFxuICAgICAgICA8QWN0aW9uQmFyIHBvc2l0aW9uPVwicmlnaHRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWFjdGlvbmJhci1yaWdodFwiPnt0aGlzLnByb3BzLmFjdGlvbkJhcn08L2Rpdj5cbiAgICAgICAgICB7dGhpcy5wcm9wcy5maWx0ZXJpbmdcbiAgICAgICAgICAgICYmIHRoaXMucHJvcHMuZGlzYWJsZURyb3Bkb3duXG4gICAgICAgICAgICAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlRmlsdGVyaW5nQ29udHJvbHMgJiYgPEZpbHRlcmluZ0NvbnRyb2xzIHsuLi50aGlzLnByb3BzfSAvPn1cbiAgICAgICAgICB7dGhpcy5wcm9wcy5pbmxpbmVFZGl0ICYmIChcbiAgICAgICAgICAgIDxJbmxpbmVFZGl0Q29udHJvbHNcbiAgICAgICAgICAgICAgYWZ0ZXJBZGRJdGVtPXt0aGlzLmhhbmRsZUFmdGVyQWRkSXRlbX1cbiAgICAgICAgICAgICAgYWZ0ZXJFZGl0UHJlc3M9e3RoaXMuaGFuZGxlQWZ0ZXJFZGl0UHJlc3N9XG4gICAgICAgICAgICAgIGFmdGVyVmFsaWRhdGlvbkVycm9yPXt0aGlzLmhhbmRsZUFmdGVyVmFsaWRhdGlvbkVycm9yfVxuICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7KHRoaXMucHJvcHMuZHJvcGRvd25NZW51SXRlbXNcbiAgICAgICAgICAgIHx8IHRoaXMucHJvcHMucmVtb3ZpbmdcbiAgICAgICAgICAgIHx8IHRoaXMucHJvcHMuY29sdW1uU2V0dGluZ3NcbiAgICAgICAgICAgIHx8ICh0aGlzLnByb3BzLmZpbHRlcmluZyAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlRHJvcGRvd24pKSAmJiAoXG4gICAgICAgICAgICA8RHJvcGRvd25Db250cm9scyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgICApfVxuICAgICAgICA8L0FjdGlvbkJhcj5cbiAgICAgICk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLmFjdGlvbkJhckxlZnQgfHwgdGhpcy5wcm9wcy5ncmlkSGVhZGVyKSB7XG4gICAgICBhY3Rpb25CYXJMZWZ0ID0gKFxuICAgICAgICA8QWN0aW9uQmFyIHBvc2l0aW9uPVwibGVmdFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtZ3JpZGhlYWRlclwiPnt0aGlzLnByb3BzLmdyaWRIZWFkZXJ9PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1hY3Rpb25iYXItbGVmdFwiPnt0aGlzLnByb3BzLmFjdGlvbkJhckxlZnR9PC9kaXY+XG4gICAgICAgIDwvQWN0aW9uQmFyPlxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGFjdGlvbkJhckxlZnQgfHwgYWN0aW9uQmFyUmlnaHQpIHtcbiAgICAgIGFjdGlvbkJhciA9IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1hY3Rpb25iYXItY29udGFpbmVyXCI+XG4gICAgICAgICAge2FjdGlvbkJhckxlZnR9XG4gICAgICAgICAge2FjdGlvbkJhclJpZ2h0fVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICAgIGxldCByb3dzQ291bnQgPSB0aGlzLnByb3BzLnJvd3NDb3VudCB8fCB0aGlzLnByb3BzLnJvd3NDb3VudCA9PT0gMFxuICAgICAgPyB0aGlzLnByb3BzLnJvd3NDb3VudFxuICAgICAgOiB0aGlzLnByb3BzLmRhdGEuc2l6ZTtcbiAgICBpZiAodGhpcy5wcm9wcy5pc0NyZWF0aW5nKSByb3dzQ291bnQgKz0gdGhpcy5wcm9wcy5jcmVhdGVEYXRhLnNpemU7XG4gICAgaWYgKCF0aGlzLnByb3BzLnZpc2libGVDb2x1bW5zLnNpemUpIHJvd3NDb3VudCA9IDA7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9e2BvYy1kYXRhZ3JpZC0ke3RoaXMucHJvcHMuZ3JpZC5pZH1gfVxuICAgICAgICBjbGFzc05hbWU9e2dyaWRDbGFzc05hbWV9XG4gICAgICAgIHN0eWxlPXt0aGlzLnByb3BzLmNvbnRhaW5lclN0eWxlfVxuICAgICAgPlxuICAgICAgICB7dGhpcy5wcm9wcy5pc0J1c3kgJiYgPFNwaW5uZXIgLz59XG4gICAgICAgIHt0aGlzLnN0YXRlLmNvbnRleHRNZW51T3BlbiAmJiB0aGlzLnJlbmRlckNvbnRleHRNZW51KCl9XG4gICAgICAgIHthY3Rpb25CYXJ9XG4gICAgICAgIDxSZXNwb25zaXZlRml4ZWREYXRhVGFibGVcbiAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICBpZD17dGhpcy5wcm9wcy5ncmlkLmlkfVxuICAgICAgICAgIHJvd3NDb3VudD17cm93c0NvdW50fVxuICAgICAgICAgIGhlYWRlckhlaWdodD17XG4gICAgICAgICAgICAodGhpcy5wcm9wcy5maWx0ZXJpbmcgJiYgdGhpcy5wcm9wcy5pc0ZpbHRlcmluZylcbiAgICAgICAgICAgICAgPyB0aGlzLnByb3BzLmhlYWRlckhlaWdodCArIHRoaXMucHJvcHMuZmlsdGVyUm93SGVpZ2h0XG4gICAgICAgICAgICAgIDogdGhpcy5wcm9wcy5oZWFkZXJIZWlnaHRcbiAgICAgICAgICB9XG4gICAgICAgICAgcm93SGVpZ2h0PXt0aGlzLnByb3BzLnJvd0hlaWdodH1cbiAgICAgICAgICBvbkNvbHVtblJlc2l6ZUVuZENhbGxiYWNrPXt0aGlzLm9uQ29sdW1uUmVzaXplRW5kQ2FsbGJhY2t9XG4gICAgICAgICAgaXNDb2x1bW5SZXNpemluZz17ZmFsc2V9XG4gICAgICAgICAgb25Sb3dDbGljaz17dGhpcy5oYW5kbGVSb3dDbGlja31cbiAgICAgICAgICBzY3JvbGxUb0NvbHVtbj17dGhpcy5wcm9wcy5zY3JvbGxUb0NvbHVtbiB8fCB0aGlzLnN0YXRlLmN1cnJlbnRDb2x1bW59XG4gICAgICAgICAgc2Nyb2xsVG9wPXt0aGlzLnByb3BzLnNjcm9sbFRvcH1cbiAgICAgICAgICBzY3JvbGxUb1Jvdz17dGhpcy5nZXRTY3JvbGxUb1JvdygpfVxuICAgICAgICAgIG9uUm93RG91YmxlQ2xpY2s9e3RoaXMucHJvcHMub25Sb3dEb3VibGVDbGlja31cbiAgICAgICAgICBvblJvd01vdXNlRG93bj17dGhpcy5wcm9wcy5vbk1vdXNlRG93bn1cbiAgICAgICAgICBvblJvd01vdXNlRW50ZXI9e3RoaXMucHJvcHMub25Sb3dNb3VzZUVudGVyfVxuICAgICAgICAgIG9uUm93TW91c2VMZWF2ZT17dGhpcy5wcm9wcy5vblJvd01vdXNlTGVhdmV9XG4gICAgICAgICAgb25TY3JvbGxTdGFydD17dGhpcy5wcm9wcy5vblNjcm9sbFN0YXJ0fVxuICAgICAgICAgIG9uU2Nyb2xsRW5kPXt0aGlzLnByb3BzLm9uU2Nyb2xsRW5kfVxuICAgICAgICAgIHJvd0NsYXNzTmFtZUdldHRlcj17dGhpcy5nZXRSb3dDbGFzc05hbWV9XG4gICAgICAgICAgcm93SGVpZ2h0R2V0dGVyPXt0aGlzLnByb3BzLnJvd0hlaWdodEdldHRlciAmJiB0aGlzLmhhbmRsZVJvd0hlaWdodEdldHRlcn1cbiAgICAgICAgICBvbkNvbnRlbnRIZWlnaHRDaGFuZ2U9e3RoaXMucHJvcHMub25Db250ZW50SGVpZ2h0Q2hhbmdlfVxuICAgICAgICAgIG9uUm93Q29udGV4dE1lbnU9e3RoaXMuaGFuZGxlQ29udGV4dE1lbnV9XG4gICAgICAgID5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJDb2x1bW5zKCl9XG4gICAgICAgIDwvUmVzcG9uc2l2ZUZpeGVkRGF0YVRhYmxlPlxuICAgICAgICB7dGhpcy5wcm9wcy5pc0NvbHVtblNldHRpbmdzTW9kYWxPcGVuICYmIChcbiAgICAgICAgICA8Q29sdW1uU2V0dGluZ3NNb2RhbFxuICAgICAgICAgICAgZ3JpZD17dGhpcy5wcm9wcy5ncmlkfVxuICAgICAgICAgICAgY29sdW1ucz17dGhpcy5wcm9wcy5jb2x1bW5zfVxuICAgICAgICAgICAgdmlzaWJsZUNvbHVtbnM9e3RoaXMucHJvcHMudmlzaWJsZUNvbHVtbnN9XG4gICAgICAgICAgICBjbG9zZUNvbHVtblNldHRpbmdzTW9kYWw9e3RoaXMucHJvcHMuY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsfVxuICAgICAgICAgICAgc2F2ZUNvbHVtblNldHRpbmdzPXt0aGlzLnByb3BzLnNhdmVDb2x1bW5TZXR0aW5nc31cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRGF0YUdyaWQ7XG4iXX0=