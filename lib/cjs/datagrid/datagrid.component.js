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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

        _this.props.createCellValueChange(_this.props.grid, rowIndex, col.valueKeyPath, value);

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

        _this.props.editCellValueChange(_this.props.grid, dataId, col.valueKeyPath, value);

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

    _defineProperty(_assertThisInitialized(_this), "onCreateCellBlur", function (rowIndex, col, valueParser) {
      return function (e) {
        if (col.onCreateBlur) {
          var value = e && e.target && e.target.value !== undefined ? e.target.value : _this.getEditItemValue(rowIndex, col);

          if (valueParser !== undefined) {
            value = valueParser(value);
          }

          col.onCreateBlur(value, rowIndex);
        }
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onEditCellBlur", function (rowIndex, col, valueParser) {
      return function (e) {
        if (col.onEditBlur) {
          var value = e && e.target && e.target.value !== undefined ? e.target.value : _this.getEditItemValue(rowIndex, col);

          if (valueParser !== undefined) {
            value = valueParser(value);
          }

          var dataId = _this.getDataIdByRowIndex(rowIndex);

          col.onEditBlur(value, rowIndex, dataId);
        }
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onCellFocus", function (cellType, inputType, rowIndex, columnKey) {
      return function (e) {
        var _this$props4 = _this.props,
            cellSelectionChange = _this$props4.cellSelectionChange,
            cellSelect = _this$props4.cellSelect,
            grid = _this$props4.grid,
            isEditing = _this$props4.isEditing;
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
      var _this$props5 = _this.props,
          grid = _this$props5.grid,
          isCreating = _this$props5.isCreating,
          isEditing = _this$props5.isEditing,
          createData = _this$props5.createData,
          selectedItems = _this$props5.selectedItems,
          data = _this$props5.data;
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
      var _this$props6 = _this.props,
          data = _this$props6.data,
          selectedItems = _this$props6.selectedItems,
          dateFormat = _this$props6.dateFormat,
          thousandSeparator = _this$props6.thousandSeparator,
          decimalSeparator = _this$props6.decimalSeparator,
          grid = _this$props6.grid,
          inlineEdit = _this$props6.inlineEdit,
          filtering = _this$props6.filtering,
          region = _this$props6.region,
          intl = _this$props6.intl,
          selectComponentOptions = _this$props6.selectComponentOptions,
          isCreating = _this$props6.isCreating,
          extraColumn = _this$props6.extraColumn,
          rowSelectCheckboxColumn = _this$props6.rowSelectCheckboxColumn,
          showSelectAllCheckbox = _this$props6.showSelectAllCheckbox;
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
        var _this$props7 = _this.props,
            itemSelectionChange = _this$props7.itemSelectionChange,
            selectedItems = _this$props7.selectedItems,
            grid = _this$props7.grid,
            data = _this$props7.data;
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
        var _this$props8 = _this.props,
            isCreating = _this$props8.isCreating,
            isEditing = _this$props8.isEditing,
            createData = _this$props8.createData,
            selectedCell = _this$props8.selectedCell,
            grid = _this$props8.grid;

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
      var _this$props9 = _this.props,
          allDataSize = _this$props9.allDataSize,
          grid = _this$props9.grid,
          isCreating = _this$props9.isCreating,
          isBusy = _this$props9.isBusy,
          visibleColumns = _this$props9.visibleColumns;

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
      var _this$props10 = _this.props,
          contextMenuItems = _this$props10.contextMenuItems,
          data = _this$props10.data,
          grid = _this$props10.grid,
          selectedItems = _this$props10.selectedItems;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwib3duUHJvcHMiLCJHUklEIiwiZ3JpZCIsImlzQnVzeSIsImRhdGFncmlkIiwiZ2V0SW4iLCJpZCIsImlzRWRpdGluZyIsImlzQ3JlYXRpbmciLCJpc0ZpbHRlcmluZyIsImlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW4iLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwidmlzaWJsZUNvbHVtbnMiLCJjb2x1bW5XaWR0aHMiLCJzZWxlY3RlZENlbGwiLCJzZWxlY3RlZEl0ZW1zIiwiZGF0YSIsImVkaXREYXRhIiwiY3JlYXRlRGF0YSIsImZpbHRlckRhdGEiLCJjZWxsTWVzc2FnZXMiLCJjcmVhdGVDZWxsTWVzc2FnZXMiLCJhbGxEYXRhU2l6ZSIsInNpemUiLCJsYW5ndWFnZSIsIlV0aWxzIiwiZ2V0TGFuZ3VhZ2UiLCJ1c2VyIiwicmVnaW9uIiwiZ2V0UmVnaW9uIiwiZGF0ZUZvcm1hdCIsImdldERhdGVGb3JtYXQiLCJ0aG91c2FuZFNlcGFyYXRvciIsImdldFRob3VzYW5kU2VwYXJhdG9yIiwiZGVjaW1hbFNlcGFyYXRvciIsImdldERlY2ltYWxTZXBhcmF0b3IiLCJmb3JjZVJlZnJlc2hUaW1lc3RhbXAiLCJnZXQiLCJmb2N1c1R5cGUiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJkYXRhZ3JpZEFjdGlvbnMiLCJEYXRhR3JpZCIsInBhZ2luYXRpb24iLCJpbmplY3RJbnRsIiwicHJvcHMiLCJjb250ZXh0TWVudUl0ZW1zIiwic2V0U3RhdGUiLCJjb250ZXh0TWVudU9wZW4iLCJkb2N1bWVudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJvbkRvY3VtZW50Q2xpY2siLCJuZXdDb2x1bW5XaWR0aCIsImNvbHVtbktleSIsInJlc2l6ZUNvbHVtbiIsInJvd0luZGV4IiwiY29sIiwiZSIsImNyZWF0ZSIsImVuYWJsZUFycm93TmF2aWdhdGlvbiIsImNlbGxSZWZzIiwiY3JlYXRlQ2VsbFJlZnMiLCJhcnJvd0tleXMiLCJLRVlfQ09ERVMiLCJET1dOIiwiVVAiLCJMRUZUIiwiUklHSFQiLCJjb2x1bW5zIiwib25MYXN0Q2VsbFRhYlByZXNzIiwiZ3JpZENvbHVtbnMiLCJnZXRDb2x1bW5LZXlCeUluZGV4IiwiaSIsImdldENvbHVtbktleSIsInJvd3NTaXplIiwiY3VycmVudENlbGwiLCJwcm94eSIsImlzQ3Vyc29yQXRTdGFydCIsInR5cGUiLCJzZWxlY3Rpb25TdGFydCIsImlzQ3Vyc29yQXRFbmQiLCJzZWxlY3Rpb25FbmQiLCJ2YWx1ZSIsImxlbmd0aCIsInNlbGVjdFJlZiIsInNlbGVjdCIsImdldFNlbGVjdFJlZiIsImluY2x1ZGVzIiwia2V5Q29kZSIsInByZXZlbnREZWZhdWx0IiwiRU5URVIiLCJFU0MiLCJhZGROZXdJdGVtIiwiZ2V0Q29sdW1uRGVmYXVsdFZhbHVlcyIsImZvY3VzVG9DcmVhdGVDZWxsIiwibmV4dEVsZW1lbnQiLCJtZW51SXNPcGVuIiwibW92ZUNlbGxGb2N1cyIsIlRBQiIsImNvbHVtbkluZCIsImZpbmRJbmRleCIsImMiLCJ2YWx1ZUtleVBhdGgiLCJqb2luIiwiZGlzYWJsZWQiLCJyb3dJbmQiLCJzaGlmdEtleSIsIm9uQ2VsbEtleURvd24iLCJ2YWx1ZVBhcnNlciIsImV2ZW50T3JEYXRhIiwicmF3VmFsdWUiLCJ0YXJnZXQiLCJ1bmRlZmluZWQiLCJmaWx0ZXJDZWxsVmFsdWVDaGFuZ2UiLCJzZWxlY3RlZEZpbHRlcnMiLCJjcmVhdGVDZWxsVmFsdWVDaGFuZ2UiLCJvbkNyZWF0ZVZhbHVlQ2hhbmdlIiwib25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUiLCJtYXRjaFZhbHVlIiwib25DcmVhdGVDZWxsVmFsdWVDaGFuZ2UiLCJuZXdWYWx1ZUtleVBhdGgiLCJ2IiwibmV3VmFsdWUiLCJ2YWxpZGF0b3JzIiwiY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUiLCJkYXRhSWQiLCJnZXREYXRhSWRCeVJvd0luZGV4IiwiZWRpdENlbGxWYWx1ZUNoYW5nZSIsIm9uRWRpdFZhbHVlQ2hhbmdlIiwib25FZGl0Q2VsbFZhbHVlQ2hhbmdlIiwiZWRpdENlbGxWYWx1ZVZhbGlkYXRlIiwib25DcmVhdGVCbHVyIiwiZ2V0RWRpdEl0ZW1WYWx1ZSIsIm9uRWRpdEJsdXIiLCJjZWxsVHlwZSIsImlucHV0VHlwZSIsImNlbGxTZWxlY3Rpb25DaGFuZ2UiLCJjZWxsU2VsZWN0IiwiY29tcG9uZW50IiwiaW5wdXRSZWYiLCJpZEtleVBhdGgiLCJpbmRleCIsIm9wdGlvbnMiLCJlZGl0VmFsdWUiLCJvcmlnaW5hbFZhbHVlIiwiY29tcG9uZW50VHlwZSIsInNlbGVjdE9wdGlvbnMiLCJmaW5kIiwib2JqIiwiU3RyaW5nIiwicmVwbGFjZSIsInZhbCIsInRvSlMiLCJtb2RlIiwiY29tcG9uZW50RGlzYWJsZWQiLCJkaXNhYmxlRWRpdGluZyIsImRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoIiwiZ2V0Q3JlYXRlSXRlbVZhbHVlIiwibWF0Y2hWYWx1ZUtleVBhdGgiLCJyb3dDbGFzc05hbWVzIiwiZXh0cmFSb3dDb3VudCIsInB1c2giLCJpbmRleE9mIiwicm93Q2xhc3NOYW1lR2V0dGVyIiwicmV0dXJuRGF0YSIsImluZm9NZXNzYWdlIiwiZXJyb3JNZXNzYWdlIiwid2FybmluZ01lc3NhZ2UiLCJzY3JvbGxUb1JvdyIsInNjcm9sbE5ld1JvdyIsInNjcm9sbEluRWRpdE1vZGUiLCJjdXJyZW50Um93IiwiZ2V0U2VsZWN0ZWRJdGVtSW5kZXgiLCJmaXJzdCIsImZvY3VzVG8iLCJwcmV2Rm9jdXNUbyIsImZvY3VzVG9MYXN0Um93IiwicmVmIiwiZm9jdXMiLCJnZXRDb21wb25lbnREaXNhYmxlZFN0YXRlIiwiZm9jdXNUb0VkaXRDZWxsIiwic2VsZWN0ZWRSb3dJbmRleCIsImNvbHVtbkluZGV4IiwiZWxlbWVudFR5cGVzIiwiY3VycmVudENvbHVtbiIsInNldFRpbWVvdXQiLCJzZWxlY3RBbGxJdGVtc0NoYW5nZSIsIml0ZW1TZWxlY3Rpb25DaGFuZ2UiLCJpbmxpbmVFZGl0IiwiZmlsdGVyaW5nIiwiaW50bCIsInNlbGVjdENvbXBvbmVudE9wdGlvbnMiLCJleHRyYUNvbHVtbiIsInJvd1NlbGVjdENoZWNrYm94Q29sdW1uIiwic2hvd1NlbGVjdEFsbENoZWNrYm94IiwidGFiSW5kZXgiLCJ3aWR0aCIsImlzUmVzaXphYmxlIiwiaXNTb3J0YWJsZSIsImNlbGwiLCJ2YWx1ZVJlbmRlciIsImNlbGxFZGl0IiwiY2VsbENyZWF0ZSIsImNlbGxGaWx0ZXIiLCJoZWFkZXIiLCJoYW5kbGVTZWxlY3RBbGxDaGVja0JveE9uQ2hhbmdlIiwicm93SXRlbSIsIml0ZW1JZCIsInNlbGVjdGVkIiwiaGFuZGxlU2VsZWN0aW9uQ2hlY2tCb3hPbkNoYW5nZSIsImZvckVhY2giLCJ2aXNpYmxlQ29sdW1uS2V5Iiwib3JnQ29sIiwidmFsdWVFbXB0eUNoZWNrZXIiLCJnZXRWYWx1ZUVtcHR5Q2hlY2tlciIsImZvcm1hdCIsImlzUmVxdWlyZWQiLCJjb2x1bW4iLCJHcmlkQ29sdW1uU2VydmljZSIsImJhc2VDb2x1bW4iLCJjb2x1bW5GdW5jdGlvbnMiLCJlZGl0IiwiZ2V0SXRlbVZhbHVlIiwib25DZWxsVmFsdWVDaGFuZ2UiLCJvbkNlbGxCbHVyIiwib25FZGl0Q2VsbEJsdXIiLCJvbkNlbGxGb2N1cyIsIm9uRWRpdENlbGxLZXlEb3duIiwiaGFuZGxlQ2VsbFJlZiIsImhhbmRsZUVkaXRDZWxsUmVmIiwib25DcmVhdGVDZWxsQmx1ciIsIm9uQ3JlYXRlQ2VsbEtleURvd24iLCJoYW5kbGVDcmVhdGVDZWxsUmVmIiwiZmlsdGVyIiwiZ2V0RmlsdGVySXRlbVZhbHVlIiwiZ2V0SXRlbU11bHRpVmFsdWUiLCJnZXRGaWx0ZXJJdGVtTXVsdGlWYWx1ZSIsIm9uRmlsdGVyQ2VsbFZhbHVlQ2hhbmdlIiwib25DZWxsTXVsdGlWYWx1ZUJsdXIiLCJvbkZpbHRlckNlbGxNdWx0aVZhbHVlQmx1ciIsIm9uQ2VsbE11bHRpVmFsdWVDaGFuZ2UiLCJvbkZpbHRlckNlbGxNdWx0aVZhbHVlQ2hhbmdlIiwiY2VsbFByb3BzIiwiY29sdW1uQ2VsbCIsImNvbXBvbmVudFR5cGVQcm9wcyIsImNvbHVtbkNvbXBvbmVudFR5cGUiLCJwYWRkaW5nIiwicmVtb3ZlTmV3SXRlbSIsImZvY3VzVG9FcnJvckNlbGwiLCJyb3dTZWxlY3QiLCJjdHJsS2V5IiwiZ2V0U2VsZWN0aW9uIiwicmVtb3ZlQWxsUmFuZ2VzIiwicGFyZW50Tm9kZSIsInBhcmVudDFjbGFzcyIsImNsYXNzTmFtZSIsInBhcmVudDJjbGFzcyIsInBhcmVudDNjbGFzcyIsInBhcmVudDRjbGFzcyIsIm11bHRpU2VsZWN0Iiwib25Sb3dDbGljayIsInN0b3BQcm9wYWdhdGlvbiIsImNvbnRleHRNZW51WCIsImNsaWVudFgiLCJjb250ZXh0TWVudVkiLCJjbGllbnRZIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uQ2xpY2siLCJzZWxlY3RlZERhdGEiLCJyb3dIZWlnaHRHZXR0ZXIiLCJleGlzdGluZ1Jvd3NJbmRleCIsImlzU3BlY2lhbCIsImdldFJvd0luZGV4IiwibWVzc2FnZURhdGEiLCJnZXRDZWxsTWVzc2FnZXMiLCJpc0VkaXRlZCIsImlzQ2VsbEVkaXRlZCIsInN0eWxlIiwiaGFuZGxlQ2VsbFNlbGVjdCIsInRleHRBbGlnbiIsImdlbmVyYXRlQ29sdW1ucyIsImxlbmdodCIsIm1hcCIsInNvcnRDaGFuZ2UiLCJyZW5kZXJDZWxsIiwibWluV2lkdGgiLCJtYXhXaWR0aCIsImZsZXhHcm93IiwiZml4ZWQiLCJmaXhlZFJpZ2h0IiwiYWxsb3dDZWxsc1JlY3ljbGluZyIsImRpc3BsYXkiLCJ6SW5kZXgiLCJwb3NpdGlvbiIsInRvcCIsImxlZnQiLCJkIiwiaXRlbSIsImRpdmlkZXIiLCJ0aXRsZSIsImhhbmRsZUNvbnRleHRNZW51SXRlbUNsaWNrIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJpbnZhbGlkYXRlIiwicmVuZGVyIiwiZ3JpZENsYXNzTmFtZSIsImRpc2FibGVBY3Rpb25CYXIiLCJzZXRGb2N1c1RvIiwiYWN0aW9uQmFyIiwiYWN0aW9uQmFyUmlnaHQiLCJhY3Rpb25CYXJMZWZ0IiwicmVtb3ZpbmciLCJkaXNhYmxlRHJvcGRvd24iLCJkaXNhYmxlRmlsdGVyaW5nQ29udHJvbHMiLCJoYW5kbGVBZnRlckFkZEl0ZW0iLCJoYW5kbGVBZnRlckVkaXRQcmVzcyIsImhhbmRsZUFmdGVyVmFsaWRhdGlvbkVycm9yIiwiZHJvcGRvd25NZW51SXRlbXMiLCJjb2x1bW5TZXR0aW5ncyIsImdyaWRIZWFkZXIiLCJyb3dzQ291bnQiLCJjb250YWluZXJTdHlsZSIsInJlbmRlckNvbnRleHRNZW51IiwiaGVhZGVySGVpZ2h0IiwiZmlsdGVyUm93SGVpZ2h0Iiwicm93SGVpZ2h0Iiwib25Db2x1bW5SZXNpemVFbmRDYWxsYmFjayIsImhhbmRsZVJvd0NsaWNrIiwic2Nyb2xsVG9Db2x1bW4iLCJzY3JvbGxUb3AiLCJnZXRTY3JvbGxUb1JvdyIsIm9uUm93RG91YmxlQ2xpY2siLCJvbk1vdXNlRG93biIsIm9uUm93TW91c2VFbnRlciIsIm9uUm93TW91c2VMZWF2ZSIsIm9uU2Nyb2xsU3RhcnQiLCJvblNjcm9sbEVuZCIsImdldFJvd0NsYXNzTmFtZSIsImhhbmRsZVJvd0hlaWdodEdldHRlciIsIm9uQ29udGVudEhlaWdodENoYW5nZSIsImhhbmRsZUNvbnRleHRNZW51IiwicmVuZGVyQ29sdW1ucyIsImNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbCIsInNhdmVDb2x1bW5TZXR0aW5ncyIsImNoaWxkcmVuIiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7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SUFDQyxnQ0FBQywwQkFBRDtBQUNFLE1BQUEsSUFBSSxFQUFFLEtBQUttQyxLQUFMLENBQVczQyxJQURuQjtBQUVFLE1BQUEsT0FBTyxFQUFFLEtBQUsyQyxLQUFMLENBQVd1QixPQUZ0QjtBQUdFLE1BQUEsY0FBYyxFQUFFLEtBQUt2QixLQUFMLENBQVdoQyxjQUg3QjtBQUlFLE1BQUEsd0JBQXdCLEVBQUUsS0FBS2dDLEtBQUwsQ0FBV3dTLHdCQUp2QztBQUtFLE1BQUEsa0JBQWtCLEVBQUUsS0FBS3hTLEtBQUwsQ0FBV3lTO0FBTGpDLE1BdENKLEVBOENHLEtBQUt6UyxLQUFMLENBQVcwUyxRQTlDZCxDQURGO0FBa0RELEc7OztFQXZ2Q29CQyxrQkFBTUMsYSw0Q0FHTEMsdUI7ZUF1dkNUaFQsUSIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLWxvbmVseS1pZiwgcHJlZmVyLXRlbXBsYXRlLCByZWFjdC9yZXF1aXJlLWRlZmF1bHQtcHJvcHMgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBNYXAsIExpc3QgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IGluamVjdEludGwsIEZvcm1hdHRlZE1lc3NhZ2UgYXMgTSB9IGZyb20gJ3JlYWN0LWludGwnO1xuaW1wb3J0IHsgQ29sdW1uLCBDZWxsIH0gZnJvbSAnZml4ZWQtZGF0YS10YWJsZS0yJztcbmltcG9ydCB7IE1lbnVJdGVtIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHsgSWNvbiB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWljb25zJztcbmltcG9ydCBTcGlubmVyIGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXNwaW5uZXInO1xuaW1wb3J0IENoZWNrYm94IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWNoZWNrYm94JztcbmltcG9ydCAnZml4ZWQtZGF0YS10YWJsZS0yL2Rpc3QvZml4ZWQtZGF0YS10YWJsZS5jc3MnO1xuXG5pbXBvcnQgUmVzcG9uc2l2ZUZpeGVkRGF0YVRhYmxlIGZyb20gJy4vcmVzcG9uc2l2ZS1maXhlZC1kYXRhLXRhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgSGVhZGVyQ2VsbCBmcm9tICcuL2hlYWRlci1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgQWN0aW9uQmFyIGZyb20gJy4vYWN0aW9uLWJhci5jb21wb25lbnQnO1xuaW1wb3J0IElubGluZUVkaXRDb250cm9scyBmcm9tICcuL2lubGluZS1lZGl0LWNvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgRmlsdGVyaW5nQ29udHJvbHMgZnJvbSAnLi9maWx0ZXJpbmctY29udHJvbHMuY29tcG9uZW50JztcbmltcG9ydCBEcm9wZG93bkNvbnRyb2xzIGZyb20gJy4vZHJvcGRvd24tY29udHJvbHMuY29tcG9uZW50JztcbmltcG9ydCAqIGFzIGRhdGFncmlkQWN0aW9ucyBmcm9tICcuL2RhdGFncmlkLmFjdGlvbnMnO1xuaW1wb3J0IENlbGxUb29sdGlwIGZyb20gJy4vY2VsbC10b29sdGlwLmNvbXBvbmVudCc7XG5pbXBvcnQgQ29sdW1uU2V0dGluZ3NNb2RhbCBmcm9tICcuL2NvbHVtbi1zZXR0aW5ncy9jb2x1bW4tc2V0dGluZ3MuY29tcG9uZW50JztcbmltcG9ydCB7IHByb3BUeXBlcywgZGVmYXVsdFByb3BzIH0gZnJvbSAnLi9kYXRhZ3JpZC5wcm9wcyc7XG5pbXBvcnQgeyBLRVlfQ09ERVMgfSBmcm9tICcuL2RhdGFncmlkLmNvbnN0YW50cyc7XG5pbXBvcnQgcGFnaW5hdGlvbiBmcm9tICcuL3BhZ2luYXRpb24uY29tcG9uZW50JztcbmltcG9ydCBVdGlscyBmcm9tICcuL2RhdGFncmlkLnV0aWxzJztcbmltcG9ydCBHcmlkQ29sdW1uU2VydmljZSBmcm9tICcuL2NvbHVtbi1zZXJ2aWNlL2NvbHVtbi1zZXJ2aWNlJztcbmltcG9ydCAnLi9kYXRhZ3JpZC5jb21wb25lbnQuc2Nzcyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSwgb3duUHJvcHMpID0+IHtcbiAgY29uc3QgR1JJRCA9IG93blByb3BzLmdyaWQ7XG4gIHJldHVybiB7XG4gICAgaXNCdXN5OiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnaXNCdXN5J10sIHRydWUpLFxuICAgIGlzRWRpdGluZzogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2lzRWRpdGluZyddLCBmYWxzZSksXG4gICAgaXNDcmVhdGluZzogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2lzQ3JlYXRpbmcnXSwgZmFsc2UpLFxuICAgIGlzRmlsdGVyaW5nOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2lzRmlsdGVyaW5nJ10sIGZhbHNlKSxcbiAgICBpc0NvbHVtblNldHRpbmdzTW9kYWxPcGVuOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihcbiAgICAgIFtHUklELmlkLCAnc2Vzc2lvbicsICdjb2x1bW5TZXR0aW5nc01vZGFsJywgJ29wZW4nXSxcbiAgICAgIGZhbHNlLFxuICAgICksXG4gICAgc29ydENvbHVtbjogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnc29ydGluZ0RhdGEnLCAnc29ydENvbHVtbiddLCBudWxsKSxcbiAgICBzb3J0T3JkZXI6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ3NvcnRpbmdEYXRhJywgJ3NvcnRPcmRlciddLCBudWxsKSxcbiAgICB2aXNpYmxlQ29sdW1uczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAndmlzaWJsZUNvbHVtbnMnXSwgTGlzdCgpKSxcbiAgICBjb2x1bW5XaWR0aHM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ2NvbHVtbldpZHRocyddLCBNYXAoKSksXG4gICAgc2VsZWN0ZWRDZWxsOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3NlbGVjdGVkQ2VsbCddLCBNYXAoKSksXG4gICAgc2VsZWN0ZWRJdGVtczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZWxlY3RlZEl0ZW1zJ10sIExpc3QoKSksXG4gICAgZGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdkYXRhJ10sIExpc3QoKSksXG4gICAgZWRpdERhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnZWRpdERhdGEnXSwgTWFwKCkpLFxuICAgIGNyZWF0ZURhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY3JlYXRlRGF0YSddLCBMaXN0KCkpLFxuICAgIGZpbHRlckRhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnZmlsdGVyRGF0YSddLCBNYXAoKSksXG4gICAgY2VsbE1lc3NhZ2VzOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NlbGxNZXNzYWdlcyddLCBNYXAoKSksXG4gICAgY3JlYXRlQ2VsbE1lc3NhZ2VzOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NyZWF0ZUNlbGxNZXNzYWdlcyddLCBNYXAoKSksXG4gICAgYWxsRGF0YVNpemU6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnYWxsRGF0YSddLCBMaXN0KCkpLnNpemUsXG4gICAgbGFuZ3VhZ2U6IFV0aWxzLmdldExhbmd1YWdlKEdSSUQsIHN0YXRlLnVzZXIpLFxuICAgIHJlZ2lvbjogVXRpbHMuZ2V0UmVnaW9uKEdSSUQsIHN0YXRlLnVzZXIpLFxuICAgIGRhdGVGb3JtYXQ6IFV0aWxzLmdldERhdGVGb3JtYXQoR1JJRCwgc3RhdGUudXNlciksXG4gICAgdGhvdXNhbmRTZXBhcmF0b3I6IFV0aWxzLmdldFRob3VzYW5kU2VwYXJhdG9yKEdSSUQsIHN0YXRlLnVzZXIpLFxuICAgIGRlY2ltYWxTZXBhcmF0b3I6IFV0aWxzLmdldERlY2ltYWxTZXBhcmF0b3IoR1JJRCwgc3RhdGUudXNlciksXG4gICAgZm9yY2VSZWZyZXNoVGltZXN0YW1wOiBzdGF0ZS5kYXRhZ3JpZC5nZXQoJ2ZvcmNlUmVmcmVzaCcsIDApLCAvLyBmb3JjZSByZS1yZW5kZXIgd2hlbiBjaGFuZ2VkXG4gICAgZm9jdXNUeXBlOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnZm9jdXNUeXBlJ10sIE1hcCgpKSxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRhdGFncmlkQWN0aW9ucztcblxuQHBhZ2luYXRpb25cbkBpbmplY3RJbnRsXG5AY29ubmVjdChcbiAgbWFwU3RhdGVUb1Byb3BzLFxuICBtYXBEaXNwYXRjaFRvUHJvcHMsXG4pXG5jbGFzcyBEYXRhR3JpZCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0gcHJvcFR5cGVzO1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGN1cnJlbnRSb3c6IDAsXG4gICAgICBjdXJyZW50Q29sdW1uOiAwLFxuICAgICAgY29udGV4dE1lbnVPcGVuOiBmYWxzZSxcbiAgICAgIGNvbnRleHRNZW51WDogbnVsbCxcbiAgICAgIGNvbnRleHRNZW51WTogbnVsbCxcbiAgICB9O1xuICAgIHRoaXMuY2VsbFJlZnMgPSB7fTtcbiAgICB0aGlzLmNyZWF0ZUNlbGxSZWZzID0ge307XG4gICAgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCA9IGZhbHNlO1xuICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gZmFsc2U7IC8vIFRPRE86IEhhbmRsZSBmb2N1c2luZyB3aGVuIHRydWVcbiAgICB0aGlzLmZvY3VzVG9FcnJvckNlbGwgPSBmYWxzZTsgLy8gVE9ETzogSGFuZGxlIGZvY3VzaW5nIHdoZW4gdHJ1ZVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uRG9jdW1lbnRDbGljayk7XG4gICAgdGhpcy5wcm9wcy5pbnZhbGlkYXRlKHRoaXMucHJvcHMuZ3JpZCk7XG4gIH1cblxuICBvbkRvY3VtZW50Q2xpY2sgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuY29udGV4dE1lbnVJdGVtcykge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGNvbnRleHRNZW51T3BlbjogZmFsc2UsXG4gICAgICB9KTtcbiAgICB9XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uRG9jdW1lbnRDbGljayk7XG4gIH07XG5cbiAgb25Db2x1bW5SZXNpemVFbmRDYWxsYmFjayA9IChuZXdDb2x1bW5XaWR0aCwgY29sdW1uS2V5KSA9PiB7XG4gICAgdGhpcy5wcm9wcy5yZXNpemVDb2x1bW4odGhpcy5wcm9wcy5ncmlkLCBjb2x1bW5LZXksIG5ld0NvbHVtbldpZHRoKTtcbiAgfTtcblxuICAvKipcbiAgICogQHBhcmFtIHJvd0luZGV4IChpbnQpXG4gICAqIEBwYXJhbSBjb2wgKG9iaikuIENvbHVtbiBvYmplY3QuXG4gICAqIEBwYXJhbSBlLiBPcmlnaW5hbCBLZXlEb3duIGV2ZW50XG4gICAqIEBwYXJhbSBjcmVhdGUgKGJvb2wpLiBJcyB0aGUgY2VsbCBjcmVhdGUgY2VsbCBvciBlZGl0IGNlbGw/XG4gICAqL1xuICBvbkNlbGxLZXlEb3duID0gKHJvd0luZGV4LCBjb2wsIGUsIGNyZWF0ZSA9IGZhbHNlKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuZW5hYmxlQXJyb3dOYXZpZ2F0aW9uKSB7XG4gICAgICBjb25zdCBjZWxsUmVmcyA9IGNyZWF0ZSA/IHRoaXMuY3JlYXRlQ2VsbFJlZnMgOiB0aGlzLmNlbGxSZWZzO1xuICAgICAgY29uc3QgYXJyb3dLZXlzID0gW0tFWV9DT0RFUy5ET1dOLCBLRVlfQ09ERVMuVVAsIEtFWV9DT0RFUy5MRUZULCBLRVlfQ09ERVMuUklHSFRdO1xuICAgICAgY29uc3Qge1xuICAgICAgICBjb2x1bW5zLCB2aXNpYmxlQ29sdW1ucywgZ3JpZCwgZGF0YSwgb25MYXN0Q2VsbFRhYlByZXNzLFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCBncmlkQ29sdW1ucyA9IFV0aWxzLnZpc2libGVDb2x1bW5zKGNvbHVtbnMsIHZpc2libGVDb2x1bW5zKTtcbiAgICAgIGNvbnN0IGdldENvbHVtbktleUJ5SW5kZXggPSBpID0+IFV0aWxzLmdldENvbHVtbktleShncmlkQ29sdW1uc1tpXSk7XG4gICAgICBjb25zdCByb3dzU2l6ZSA9IGRhdGEuc2l6ZTtcbiAgICAgIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2wpO1xuICAgICAgbGV0IGN1cnJlbnRDZWxsID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtjb2x1bW5LZXl9XyR7cm93SW5kZXh9YF07XG4gICAgICBsZXQgcHJveHkgPSBudWxsO1xuXG4gICAgICBjb25zdCBpc0N1cnNvckF0U3RhcnQgPSAoKSA9PiB7XG4gICAgICAgIGlmIChjdXJyZW50Q2VsbC50eXBlICE9PSAndGV4dCcpIHJldHVybiB0cnVlO1xuICAgICAgICByZXR1cm4gY3VycmVudENlbGwuc2VsZWN0aW9uU3RhcnQgPT09IDA7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBpc0N1cnNvckF0RW5kID0gKCkgPT4ge1xuICAgICAgICBpZiAoY3VycmVudENlbGwudHlwZSAhPT0gJ3RleHQnKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRDZWxsLnNlbGVjdGlvbkVuZCA9PT0gY3VycmVudENlbGwudmFsdWUubGVuZ3RoO1xuICAgICAgfTtcblxuICAgICAgLy8gSWYgY3VycmVudCBjZWxsIGhvbGRzIGEgcmVhY3QtZmxvYXRpbmctc2VsZWN0IGNvbXBvbmVudFxuICAgICAgaWYgKGN1cnJlbnRDZWxsICYmIChjdXJyZW50Q2VsbC5zZWxlY3RSZWYgfHwgdHlwZW9mIGN1cnJlbnRDZWxsLnNlbGVjdCA9PT0gJ29iamVjdCcpKSB7XG4gICAgICAgIHByb3h5ID0gY3VycmVudENlbGw7XG4gICAgICAgIGN1cnJlbnRDZWxsID0gdGhpcy5nZXRTZWxlY3RSZWYocHJveHkpO1xuICAgICAgfVxuXG4gICAgICAvLyBQcmV2ZW50cyB1cC9kb3duIGFycm93IGZyb20gY2hhbmdpbmcgbnVtYmVyIGZpZWxkIHZhbHVlXG4gICAgICBpZiAoYXJyb3dLZXlzLmluY2x1ZGVzKGUua2V5Q29kZSkgJiYgY3VycmVudENlbGwudHlwZSA9PT0gJ251bWJlcicpIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLkVOVEVSOlxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5FU0M6IHtcbiAgICAgICAgICBpZiAoY3JlYXRlICYmIGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLkVOVEVSKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmFkZE5ld0l0ZW0oZ3JpZCwgVXRpbHMuZ2V0Q29sdW1uRGVmYXVsdFZhbHVlcyhjb2x1bW5zKSk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjdXJyZW50Q2VsbC5zZWxlY3QoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5ET1dOOiB7XG4gICAgICAgICAgbGV0IG5leHRFbGVtZW50ID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtjb2x1bW5LZXl9XyR7cm93SW5kZXggKyAxfWBdO1xuXG4gICAgICAgICAgLy8gUHJldmVudHMgbWVudSBmcm9tIG9wZW5pbmdcbiAgICAgICAgICBpZiAocHJveHkgJiYgcHJveHkuc2VsZWN0UmVmICYmICFwcm94eS5zZWxlY3RSZWYuc3RhdGUubWVudUlzT3Blbikge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKCFuZXh0RWxlbWVudCkgYnJlYWs7XG4gICAgICAgICAgICBuZXh0RWxlbWVudCA9IHRoaXMuZ2V0U2VsZWN0UmVmKG5leHRFbGVtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5tb3ZlQ2VsbEZvY3VzKG5leHRFbGVtZW50LCByb3dJbmRleCArIDEsIC0xKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5VUDoge1xuICAgICAgICAgIGxldCBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4IC0gMX1gXTtcblxuICAgICAgICAgIC8vIFByZXZlbnRzIG1lbnUgZnJvbSBvcGVuaW5nXG4gICAgICAgICAgaWYgKHByb3h5ICYmIHByb3h5LnNlbGVjdFJlZiAmJiAhcHJveHkuc2VsZWN0UmVmLnN0YXRlLm1lbnVJc09wZW4pIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmICghbmV4dEVsZW1lbnQpIGJyZWFrO1xuICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSB0aGlzLmdldFNlbGVjdFJlZihuZXh0RWxlbWVudCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubW92ZUNlbGxGb2N1cyhuZXh0RWxlbWVudCwgcm93SW5kZXggLSAxLCAtMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuVEFCOlxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5SSUdIVDpcbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuTEVGVDoge1xuICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5SSUdIVCAmJiAhaXNDdXJzb3JBdEVuZCgpKSBicmVhaztcbiAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuTEVGVCAmJiAhaXNDdXJzb3JBdFN0YXJ0KCkpIGJyZWFrO1xuXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgbGV0IGNvbHVtbkluZCA9IGdyaWRDb2x1bW5zLmZpbmRJbmRleChjID0+IGMudmFsdWVLZXlQYXRoLmpvaW4oJy8nKSA9PT0gY29sdW1uS2V5KTtcbiAgICAgICAgICBpZiAoY29sdW1uSW5kICE9PSAtMSkge1xuICAgICAgICAgICAgbGV0IGRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCBuZXh0RWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICBsZXQgcm93SW5kID0gcm93SW5kZXg7XG4gICAgICAgICAgICB3aGlsZSAoZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgLy8gTW92aW5nIHRvIHRoZSBsZWZ0XG4gICAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5MRUZUIHx8IChlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5UQUIgJiYgZS5zaGlmdEtleSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29sdW1uSW5kIC0gMSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgLT0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJvd0luZCAtIDEgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kID0gZ3JpZENvbHVtbnMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAgIHJvd0luZCAtPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gTW92aW5nIHRvIHRoZSByaWdodFxuICAgICAgICAgICAgICAgIGlmIChjb2x1bW5JbmQgKyAxIDwgZ3JpZENvbHVtbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgKz0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJvd0luZCArIDEgPCByb3dzU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kID0gMDtcbiAgICAgICAgICAgICAgICAgIHJvd0luZCArPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm93SW5kICsgMSA9PT0gcm93c1NpemUpIHtcbiAgICAgICAgICAgICAgICAgIC8vIElmIHRyeWluZyB0byBzZWxlY3QgYSByb3csIHdoZW4gdGhlcmUgaXMgbm9uZTpcbiAgICAgICAgICAgICAgICAgIGlmIChvbkxhc3RDZWxsVGFiUHJlc3MgJiYgZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuVEFCKSBvbkxhc3RDZWxsVGFiUHJlc3MoZSk7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Z2V0Q29sdW1uS2V5QnlJbmRleChjb2x1bW5JbmQpfV8ke3Jvd0luZH1gXTtcblxuICAgICAgICAgICAgICAvLyBJZiB3ZSBjYW5ub3QgZm9jdXMgb24gdGhlIG5leHQgZWxlbWVudCB3aGlsZSBtb3ZpbmcgdG8gdGhlIHJpZ2h0XG4gICAgICAgICAgICAgIGlmICghbmV4dEVsZW1lbnQgJiYgZS5rZXlDb2RlICE9PSBLRVlfQ09ERVMuTEVGVCkge1xuICAgICAgICAgICAgICAgIC8vIElmIHdlJ3JlIG5vdCB5ZXQgaW4gdGhlIGxhc3QgZm9jdXNhYmxlIGNvbHVtblxuICAgICAgICAgICAgICAgIGlmIChjb2x1bW5JbmQgPD0gZ3JpZENvbHVtbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICB3aGlsZSAoY29sdW1uSW5kIDw9IGdyaWRDb2x1bW5zLmxlbmd0aCAmJiAhbmV4dEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2dldENvbHVtbktleUJ5SW5kZXgoY29sdW1uSW5kKX1fJHtyb3dJbmR9YF07XG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCArPSAxO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHdlIGFyZSBpbiB0aGUgbGFzdCBjb2x1bW4gYW5kIHdlIGRvbid0IGhhdmUgYW4gZWxlbWVudCB0byBmb2N1cyBvbixcbiAgICAgICAgICAgICAgICAgICAgLy8gd2UgbXVzdCBtb3ZlIHRvIHRoZSBuZXh0IHJvdyAoaWYgcG9zc2libGUpXG4gICAgICAgICAgICAgICAgICAgIGlmICghbmV4dEVsZW1lbnQgJiYgY29sdW1uSW5kID09PSBncmlkQ29sdW1ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB0cnlpbmcgdG8gc2VsZWN0IGEgcm93LCB3aGVuIHRoZXJlIGlzIG5vbmU6XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHJvd0luZCArIDEgPT09IHJvd3NTaXplKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob25MYXN0Q2VsbFRhYlByZXNzICYmIGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLlRBQikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkxhc3RDZWxsVGFiUHJlc3MoZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgIHJvd0luZCArPSAxO1xuICAgICAgICAgICAgICAgICAgICAgIG5leHRFbGVtZW50ID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtnZXRDb2x1bW5LZXlCeUluZGV4KGNvbHVtbkluZCl9XyR7cm93SW5kfWBdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIElmIHdlIGNhbm5vdCBmb2N1cyBvbiB0aGUgbmV4dCBlbGVtZW50IHdoaWxlIG1vdmluZyB0byB0aGUgbGVmdFxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFuZXh0RWxlbWVudCAmJiBlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5MRUZUKSB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGNvbHVtbkluZCA+IDAgJiYgIW5leHRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgLT0gMTtcbiAgICAgICAgICAgICAgICAgIG5leHRFbGVtZW50ID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtnZXRDb2x1bW5LZXlCeUluZGV4KGNvbHVtbkluZCl9XyR7cm93SW5kfWBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBpZiBubyBlbGVtZW50IHdhcyBmb3VuZCwgdHJ5IG1vdmluZyB0byBwcmV2aW91cyByb3dcbiAgICAgICAgICAgICAgICAvLyAobmVlZGVkIGluIGNhc2UgZmlyc3QgY29sdW1uIGlzIG5vdCBlZGl0YWJsZSBlLmcuIGFuIEV4dHJhQ29sdW1uKVxuICAgICAgICAgICAgICAgIGlmIChyb3dJbmQgPiAwICYmICFuZXh0RWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kID0gZ3JpZENvbHVtbnMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAgIHJvd0luZCAtPSAxO1xuICAgICAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2dldENvbHVtbktleUJ5SW5kZXgoY29sdW1uSW5kKX1fJHtyb3dJbmR9YF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGRpc2FibGVkID0gbmV4dEVsZW1lbnQgPyBuZXh0RWxlbWVudC5kaXNhYmxlZCA6IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFkaXNhYmxlZCAmJiBuZXh0RWxlbWVudCkge1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIG5leHRFbGVtZW50LnNlbGVjdCA9PT0gJ29iamVjdCcgfHwgbmV4dEVsZW1lbnQuc2VsZWN0UmVmKSB7XG4gICAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSB0aGlzLmdldFNlbGVjdFJlZihuZXh0RWxlbWVudCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy5tb3ZlQ2VsbEZvY3VzKG5leHRFbGVtZW50LCByb3dJbmQsIGNvbHVtbkluZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIG9uRWRpdENlbGxLZXlEb3duID0gKHJvd0luZGV4LCBjb2wpID0+IChlKSA9PiB7XG4gICAgdGhpcy5vbkNlbGxLZXlEb3duKHJvd0luZGV4LCBjb2wsIGUpO1xuICB9O1xuXG4gIG9uQ3JlYXRlQ2VsbEtleURvd24gPSAocm93SW5kZXgsIGNvbCkgPT4gKGUpID0+IHtcbiAgICB0aGlzLm9uQ2VsbEtleURvd24ocm93SW5kZXgsIGNvbCwgZSwgdHJ1ZSk7XG4gIH07XG5cbiAgb25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UgPSAoY29sLCB2YWx1ZVBhcnNlcikgPT4gKGV2ZW50T3JEYXRhKSA9PiB7XG4gICAgbGV0IHJhd1ZhbHVlO1xuICAgIC8vIGV2ZW50T3JEYXRhIGNhbiBiZSBpbnB1dCBvbkNoYW5nZSBldmVudCwgcmVhY3Qtc2VsZWN0IG9uQ2hhbmdlIG9yIHJlYWN0LWRheS1waWNrZXIgb25DaGFuZ2VcbiAgICBpZiAoZXZlbnRPckRhdGEpIHtcbiAgICAgIGlmIChldmVudE9yRGF0YS50YXJnZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnRPckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSB2YWx1ZVBhcnNlcihyYXdWYWx1ZSk7XG4gICAgdGhpcy5wcm9wcy5maWx0ZXJDZWxsVmFsdWVDaGFuZ2UodGhpcy5wcm9wcy5ncmlkLCB0aGlzLnByb3BzLmNvbHVtbnMsIGNvbCwgdmFsdWUpO1xuICB9O1xuXG4gIG9uRmlsdGVyQ2VsbE11bHRpVmFsdWVCbHVyID0gY29sID0+ICgpID0+IHtcbiAgICBjb25zdCBjb2x1bW5LZXkgPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sKTtcbiAgICBjb25zdCB7IGNvbHVtbnMsIGZpbHRlckNlbGxWYWx1ZUNoYW5nZSwgZ3JpZCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzZWxlY3RlZEZpbHRlcnMgPSB0aGlzLnN0YXRlW2NvbHVtbktleV07XG4gICAgaWYgKHNlbGVjdGVkRmlsdGVycykge1xuICAgICAgZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlKGdyaWQsIGNvbHVtbnMsIGNvbCwgc2VsZWN0ZWRGaWx0ZXJzKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBbY29sdW1uS2V5XTogdW5kZWZpbmVkIH0pO1xuICAgIH1cbiAgfTtcblxuICBvbkZpbHRlckNlbGxNdWx0aVZhbHVlQ2hhbmdlID0gKGNvbCwgdmFsdWVQYXJzZXIpID0+IChkYXRhID0gW10pID0+IHtcbiAgICAvLyBkYXRhIGlzIGlucHV0IG9mIHJlYWN0LXNlbGVjdCBvbkNoYW5nZVxuICAgIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2wpO1xuICAgIGNvbnN0IHNlbGVjdGVkRmlsdGVycyA9IHRoaXMuc3RhdGVbY29sdW1uS2V5XTtcbiAgICBpZiAoIXNlbGVjdGVkRmlsdGVycyAmJiBkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgLy8gZW5kcyB1cCBoZXJlIGluIGNhc2Ugb2YgY2xlYXIgYnV0dG9uXG4gICAgICBjb25zdCB7IGNvbHVtbnMsIGZpbHRlckNlbGxWYWx1ZUNoYW5nZSwgZ3JpZCB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGZpbHRlckNlbGxWYWx1ZUNoYW5nZShncmlkLCBjb2x1bW5zLCBjb2wsIGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHZhbHVlUGFyc2VyKGRhdGEpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IFtjb2x1bW5LZXldOiB2YWx1ZSB9KTtcbiAgICB9XG4gIH07XG5cbiAgb25DcmVhdGVDZWxsVmFsdWVDaGFuZ2UgPSAocm93SW5kZXgsIGNvbCwgdmFsdWVQYXJzZXIpID0+IChldmVudE9yRGF0YSkgPT4ge1xuICAgIGxldCByYXdWYWx1ZTtcbiAgICAvLyBldmVudE9yRGF0YSBjYW4gYmUgaW5wdXQgb25DaGFuZ2UgZXZlbnQsIHJlYWN0LXNlbGVjdCBvbkNoYW5nZSBvciByZWFjdC1kYXktcGlja2VyIG9uQ2hhbmdlXG4gICAgaWYgKGV2ZW50T3JEYXRhKSB7XG4gICAgICBpZiAoZXZlbnRPckRhdGEudGFyZ2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YS50YXJnZXQudmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50T3JEYXRhLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YS52YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGE7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlID0gdmFsdWVQYXJzZXIocmF3VmFsdWUpO1xuXG4gICAgdGhpcy5wcm9wcy5jcmVhdGVDZWxsVmFsdWVDaGFuZ2UodGhpcy5wcm9wcy5ncmlkLCByb3dJbmRleCwgY29sLnZhbHVlS2V5UGF0aCwgdmFsdWUpO1xuICAgIGlmIChjb2wub25DcmVhdGVWYWx1ZUNoYW5nZSkge1xuICAgICAgY29sLm9uQ3JlYXRlVmFsdWVDaGFuZ2UodmFsdWUsIGNvbC52YWx1ZUtleVBhdGgsIHJvd0luZGV4KTtcbiAgICB9XG4gICAgaWYgKGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZSAmJiB2YWx1ZSA9PT0gY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm1hdGNoVmFsdWUpIHtcbiAgICAgIC8vIENhbGwgc3BlY2lhbCBwYWlyZWQgdmFsdWUgY2hhbmdlIG9uIG90aGVyIGNlbGwgaWYgdmFsdWUgbWF0Y2hlc1xuICAgICAgdGhpcy5vbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZShcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIHsgdmFsdWVLZXlQYXRoOiBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWVLZXlQYXRoIH0sXG4gICAgICAgIHYgPT4gdixcbiAgICAgICkoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm5ld1ZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNvbC52YWxpZGF0b3JzKSB7XG4gICAgICB0aGlzLnByb3BzLmNyZWF0ZUNlbGxWYWx1ZVZhbGlkYXRlKFxuICAgICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICBjb2wudmFsdWVLZXlQYXRoLFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgY29sLnZhbGlkYXRvcnMsXG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICBvbkVkaXRDZWxsVmFsdWVDaGFuZ2UgPSAocm93SW5kZXgsIGNvbCwgdmFsdWVQYXJzZXIpID0+IChldmVudE9yRGF0YSkgPT4ge1xuICAgIGNvbnN0IGRhdGFJZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgbGV0IHJhd1ZhbHVlO1xuICAgIC8vIGV2ZW50T3JEYXRhIGNhbiBiZSBpbnB1dCBvbkNoYW5nZSBldmVudCwgcmVhY3Qtc2VsZWN0IG9uQ2hhbmdlIG9yIHJlYWN0LWRheS1waWNrZXIgb25DaGFuZ2VcbiAgICBpZiAoZXZlbnRPckRhdGEpIHtcbiAgICAgIGlmIChldmVudE9yRGF0YS50YXJnZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnRPckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSB2YWx1ZVBhcnNlcihyYXdWYWx1ZSk7XG4gICAgdGhpcy5wcm9wcy5lZGl0Q2VsbFZhbHVlQ2hhbmdlKHRoaXMucHJvcHMuZ3JpZCwgZGF0YUlkLCBjb2wudmFsdWVLZXlQYXRoLCB2YWx1ZSk7XG4gICAgaWYgKGNvbC5vbkVkaXRWYWx1ZUNoYW5nZSkge1xuICAgICAgY29sLm9uRWRpdFZhbHVlQ2hhbmdlKHZhbHVlLCBjb2wudmFsdWVLZXlQYXRoLCByb3dJbmRleCwgZGF0YUlkKTtcbiAgICB9XG4gICAgaWYgKGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZSAmJiB2YWx1ZSA9PT0gY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm1hdGNoVmFsdWUpIHtcbiAgICAgIC8vIENhbGwgc3BlY2lhbCBwYWlyZWQgdmFsdWUgY2hhbmdlIG9uIG90aGVyIGNlbGwgaWYgdmFsdWUgbWF0Y2hlc1xuICAgICAgdGhpcy5vbkVkaXRDZWxsVmFsdWVDaGFuZ2UoXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICB7IHZhbHVlS2V5UGF0aDogY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm5ld1ZhbHVlS2V5UGF0aCB9LFxuICAgICAgICB2ID0+IHYsXG4gICAgICApKGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5uZXdWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjb2wudmFsaWRhdG9ycykge1xuICAgICAgdGhpcy5wcm9wcy5lZGl0Q2VsbFZhbHVlVmFsaWRhdGUoXG4gICAgICAgIHRoaXMucHJvcHMuZ3JpZCxcbiAgICAgICAgZGF0YUlkLFxuICAgICAgICBjb2wudmFsdWVLZXlQYXRoLFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgY29sLnZhbGlkYXRvcnMsXG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICBvbkNyZWF0ZUNlbGxCbHVyID0gKHJvd0luZGV4LCBjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZSkgPT4ge1xuICAgIGlmIChjb2wub25DcmVhdGVCbHVyKSB7XG4gICAgICBsZXQgdmFsdWUgPSBlICYmIGUudGFyZ2V0ICYmIGUudGFyZ2V0LnZhbHVlICE9PSB1bmRlZmluZWRcbiAgICAgICAgPyBlLnRhcmdldC52YWx1ZVxuICAgICAgICA6IHRoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKTtcbiAgICAgIGlmICh2YWx1ZVBhcnNlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWVQYXJzZXIodmFsdWUpO1xuICAgICAgfVxuICAgICAgY29sLm9uQ3JlYXRlQmx1cih2YWx1ZSwgcm93SW5kZXgpO1xuICAgIH1cbiAgfTtcblxuICBvbkVkaXRDZWxsQmx1ciA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGUpID0+IHtcbiAgICBpZiAoY29sLm9uRWRpdEJsdXIpIHtcbiAgICAgIGxldCB2YWx1ZSA9IGUgJiYgZS50YXJnZXQgJiYgZS50YXJnZXQudmFsdWUgIT09IHVuZGVmaW5lZFxuICAgICAgICA/IGUudGFyZ2V0LnZhbHVlXG4gICAgICAgIDogdGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpO1xuICAgICAgaWYgKHZhbHVlUGFyc2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZVBhcnNlcih2YWx1ZSk7XG4gICAgICB9XG4gICAgICBjb25zdCBkYXRhSWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgICAgY29sLm9uRWRpdEJsdXIodmFsdWUsIHJvd0luZGV4LCBkYXRhSWQpO1xuICAgIH1cbiAgfTtcblxuICBvbkNlbGxGb2N1cyA9IChjZWxsVHlwZSwgaW5wdXRUeXBlLCByb3dJbmRleCwgY29sdW1uS2V5KSA9PiAoZSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGNlbGxTZWxlY3Rpb25DaGFuZ2UsIGNlbGxTZWxlY3QsIGdyaWQsIGlzRWRpdGluZyxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoaXNFZGl0aW5nKSByZXR1cm47XG5cbiAgICBpZiAoaW5wdXRUeXBlID09PSAnbnVtYmVyJykge1xuICAgICAgZS50YXJnZXQuc2VsZWN0KCk7XG4gICAgfVxuICAgIGlmIChjZWxsVHlwZSA9PT0gJ2VkaXQnICYmIGNlbGxTZWxlY3QpIHtcbiAgICAgIGNlbGxTZWxlY3Rpb25DaGFuZ2UoXG4gICAgICAgIGdyaWQsXG4gICAgICAgIE1hcCh7XG4gICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgY29sdW1uS2V5LFxuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIGdldFNlbGVjdFJlZiA9IChjb21wb25lbnQpID0+IHtcbiAgICBpZiAoIWNvbXBvbmVudCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKGNvbXBvbmVudC5zZWxlY3QgJiYgY29tcG9uZW50LnNlbGVjdC5pbnB1dFJlZikge1xuICAgICAgcmV0dXJuIGNvbXBvbmVudC5zZWxlY3QuaW5wdXRSZWY7XG4gICAgfVxuICAgIGlmIChjb21wb25lbnQuc2VsZWN0ICYmIGNvbXBvbmVudC5zZWxlY3Quc2VsZWN0KSB7XG4gICAgICByZXR1cm4gY29tcG9uZW50LnNlbGVjdC5zZWxlY3QuaW5wdXRSZWY7XG4gICAgfVxuICAgIGlmIChjb21wb25lbnQuc2VsZWN0UmVmICYmIGNvbXBvbmVudC5zZWxlY3RSZWYuc2VsZWN0LnNlbGVjdCkge1xuICAgICAgcmV0dXJuIGNvbXBvbmVudC5zZWxlY3RSZWYuc2VsZWN0LnNlbGVjdC5pbnB1dFJlZjtcbiAgICB9XG4gICAgcmV0dXJuIGNvbXBvbmVudC5zZWxlY3RSZWYuc2VsZWN0LmlucHV0UmVmO1xuICB9O1xuXG4gIGdldERhdGFJZEJ5Um93SW5kZXggPSByb3dJbmRleCA9PiB0aGlzLnByb3BzLmRhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi50aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoXSk7XG5cbiAgZ2V0U2VsZWN0ZWRJdGVtSW5kZXggPSAoaWQpID0+IHtcbiAgICBpZiAoIWlkKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5wcm9wcy5kYXRhLmZpbmRJbmRleCh2ID0+IHYuZ2V0SW4odGhpcy5wcm9wcy5ncmlkLmlkS2V5UGF0aCkgPT09IGlkKTtcbiAgICByZXR1cm4gaW5kZXggPT09IC0xID8gdW5kZWZpbmVkIDogaW5kZXg7XG4gIH07XG5cbiAgZ2V0RWRpdEl0ZW1WYWx1ZSA9IChyb3dJbmRleCwgY29sLCBvcHRpb25zID0gW10pID0+IHtcbiAgICAvLyBHZXQgdGhlIHZhbHVlIHRvIGRpc3BsYXkgaW4gZWRpdCBjZWxsXG4gICAgY29uc3QgaWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgIGNvbnN0IGVkaXRWYWx1ZSA9IHRoaXMucHJvcHMuZWRpdERhdGEuZ2V0SW4oW2lkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSwgdW5kZWZpbmVkKTtcbiAgICBsZXQgb3JpZ2luYWxWYWx1ZTtcbiAgICBpZiAoZWRpdFZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG9yaWdpbmFsVmFsdWUgPSB0aGlzLnByb3BzLmRhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSwgJycpO1xuICAgIH0gZWxzZSBpZiAoZWRpdFZhbHVlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFZhbHVlIGlzIGZvdW5kIGZyb20gZWRpdERhdGFcbiAgICAgIC8vIEZvcm1hdCBieSB0eXBlXG4gICAgICBzd2l0Y2ggKGNvbC5jb21wb25lbnRUeXBlKSB7XG4gICAgICAgIGNhc2UgJ211bHRpc2VsZWN0JzpcbiAgICAgICAgY2FzZSAnc2VsZWN0JzpcbiAgICAgICAgICByZXR1cm4gb3B0aW9ucy5zZWxlY3RPcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gZWRpdFZhbHVlKTtcbiAgICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgICAgcmV0dXJuIG9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSBlZGl0VmFsdWUpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiBlZGl0VmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvcmlnaW5hbFZhbHVlID09PSBudWxsIHx8IG9yaWdpbmFsVmFsdWUgPT09IHVuZGVmaW5lZCB8fCBvcmlnaW5hbFZhbHVlID09PSAnJykge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICAvLyBSZXR1cm4gdmFsdWUgZnJvbSBvcmlnaW5hbCBkYXRhLCBiZWNhdXNlIGVkaXREYXRhIGlzIG5vdCBhdmFpbGFibGVcbiAgICAvLyBGb3JtYXQgYnkgY29tcG9uZW50IHR5cGVcbiAgICBzd2l0Y2ggKGNvbC5jb21wb25lbnRUeXBlKSB7XG4gICAgICBjYXNlICdmbG9hdCc6IHtcbiAgICAgICAgaWYgKFN0cmluZyhvcmlnaW5hbFZhbHVlKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgcmV0dXJuIFN0cmluZyhvcmlnaW5hbFZhbHVlKS5yZXBsYWNlKCcuJywgdGhpcy5wcm9wcy5kZWNpbWFsU2VwYXJhdG9yKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3JpZ2luYWxWYWx1ZTtcbiAgICAgIH1cbiAgICAgIGNhc2UgJ211bHRpc2VsZWN0JzpcbiAgICAgIGNhc2UgJ3NlbGVjdCc6XG4gICAgICAgIHJldHVybiBvcHRpb25zLnNlbGVjdE9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSBvcmlnaW5hbFZhbHVlKTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICByZXR1cm4gb3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IG9yaWdpbmFsVmFsdWUpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIG9yaWdpbmFsVmFsdWU7XG4gICAgfVxuICB9O1xuXG4gIGdldENyZWF0ZUl0ZW1WYWx1ZSA9IChyb3dJbmRleCwgY29sLCBvcHRpb25zID0gW10pID0+IHtcbiAgICBjb25zdCB2YWwgPSB0aGlzLnByb3BzLmNyZWF0ZURhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSwgJycpO1xuICAgIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgaWYgKGNvbC5jb21wb25lbnRUeXBlID09PSAnc2VsZWN0JyB8fCBjb2wuY29tcG9uZW50VHlwZSA9PT0gJ211bHRpc2VsZWN0Jykge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuc2VsZWN0T3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IHZhbCk7XG4gICAgfVxuICAgIGlmIChbJ2Jvb2xlYW4nXS5pbmNsdWRlcyhjb2wuY29tcG9uZW50VHlwZSkpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gdmFsKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbDtcbiAgfTtcblxuICBnZXRGaWx0ZXJJdGVtVmFsdWUgPSAoY29sLCBvcHRpb25zID0gW10pID0+IHtcbiAgICBjb25zdCB2YWwgPSB0aGlzLnByb3BzLmZpbHRlckRhdGEuZ2V0KFV0aWxzLmdldENvbHVtbktleShjb2wpLCAnJyk7XG4gICAgaWYgKHZhbCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBpZiAoY29sLmNvbXBvbmVudFR5cGUgPT09ICdzZWxlY3QnKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5zZWxlY3RPcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gdmFsKTtcbiAgICB9XG4gICAgaWYgKFsnY2hlY2tib3gnLCAnYm9vbGVhbiddLmluY2x1ZGVzKGNvbC5jb21wb25lbnRUeXBlKSkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSB2YWwpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWw7XG4gIH07XG5cbiAgZ2V0RmlsdGVySXRlbU11bHRpVmFsdWUgPSAoY29sKSA9PiB7XG4gICAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCk7XG4gICAgY29uc3QgeyBmaWx0ZXJEYXRhIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGRhdGEgPSB0aGlzLnN0YXRlW2NvbHVtbktleV07XG4gICAgY29uc3QgdmFsID0gZGF0YSB8fCBmaWx0ZXJEYXRhLmdldChjb2x1bW5LZXksICcnKTtcbiAgICAvLyBzZXNzaW9uIHN0b3JhZ2UgY29udGVudCBpcyBjb252ZXJ0ZWQgdG8gaW1tdXRhYmxlIGFuZCBtdWx0aXNlbGVjdFxuICAgIC8vIGZpbHRlcnMgaXMgdGhlbiBsaXN0IG90aGVyd2lzZSBhcnJheVxuICAgIHJldHVybiB2YWwgJiYgdmFsLnRvSlMgPyB2YWwudG9KUygpIDogdmFsIHx8IFtdO1xuICB9O1xuXG4gIGdldENvbXBvbmVudERpc2FibGVkU3RhdGUgPSAocm93SW5kZXgsIGNvbCwgbW9kZSkgPT4ge1xuICAgIGxldCBjb21wb25lbnREaXNhYmxlZCA9ICEhY29sLmRpc2FibGVFZGl0aW5nO1xuICAgIC8vIGNoZWNrIGlmIGNvbXBvbmVudCBpcyBkaXNhYmxlZCBieSBvdGhlciBjb2x1bW4gZGF0YVxuICAgIGlmICghY29tcG9uZW50RGlzYWJsZWQgJiYgY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoKSB7XG4gICAgICBpZiAobW9kZSA9PT0gJ2NyZWF0ZScpIHtcbiAgICAgICAgY29tcG9uZW50RGlzYWJsZWQgPSB0aGlzLmdldENyZWF0ZUl0ZW1WYWx1ZShyb3dJbmRleCwge1xuICAgICAgICAgIHZhbHVlS2V5UGF0aDogY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWVLZXlQYXRoLFxuICAgICAgICB9KSA9PT0gY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb21wb25lbnREaXNhYmxlZCA9IHRoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwge1xuICAgICAgICAgIHZhbHVlS2V5UGF0aDogY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWVLZXlQYXRoLFxuICAgICAgICB9KSA9PT0gY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb21wb25lbnREaXNhYmxlZDtcbiAgfTtcblxuICBnZXRSb3dDbGFzc05hbWUgPSAocm93SW5kZXgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBncmlkLCBpc0NyZWF0aW5nLCBpc0VkaXRpbmcsIGNyZWF0ZURhdGEsIHNlbGVjdGVkSXRlbXMsIGRhdGEsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgcm93Q2xhc3NOYW1lcyA9IFsnb2MtZGF0YWdyaWQtcm93J107XG4gICAgbGV0IGV4dHJhUm93Q291bnQgPSAwOyAvLyBob3cgbWFueSByb3dzIHRvIGlnbm9yZSBmcm9tIHRvcCwgbmV3ICsgZmlsdGVyIHJvd3NcbiAgICBpZiAoaXNDcmVhdGluZykgZXh0cmFSb3dDb3VudCA9IGNyZWF0ZURhdGEuc2l6ZTtcbiAgICBpZiAoaXNDcmVhdGluZykge1xuICAgICAgaWYgKHJvd0luZGV4IDw9IGV4dHJhUm93Q291bnQgLSAxKSB7XG4gICAgICAgIHJvd0NsYXNzTmFtZXMucHVzaCgnb2MtZGF0YWdyaWQtcm93LW5ldycpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNFZGl0aW5nKSB7XG4gICAgICByb3dDbGFzc05hbWVzLnB1c2goJ29jLWRhdGFncmlkLXJvdy1lZGl0Jyk7XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgaWYgcm93IGlzIHNlbGVjdGVkXG4gICAgaWYgKCFpc0NyZWF0aW5nICYmICFpc0VkaXRpbmcgJiYgKHNlbGVjdGVkSXRlbXMgJiYgZ3JpZC5pZEtleVBhdGgpKSB7XG4gICAgICBpZiAoc2VsZWN0ZWRJdGVtcy5pbmRleE9mKGRhdGEuZ2V0SW4oW3Jvd0luZGV4IC0gZXh0cmFSb3dDb3VudCwgLi4uZ3JpZC5pZEtleVBhdGhdKSkgIT09IC0xKSB7XG4gICAgICAgIHJvd0NsYXNzTmFtZXMucHVzaCgnaXMtc2VsZWN0ZWQnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5wcm9wcy5yb3dDbGFzc05hbWVHZXR0ZXIpIHtcbiAgICAgIHJldHVybiByb3dDbGFzc05hbWVzLmpvaW4oJyAnKSArICcgJyArIHRoaXMucHJvcHMucm93Q2xhc3NOYW1lR2V0dGVyKHJvd0luZGV4KTtcbiAgICB9XG4gICAgcmV0dXJuIHJvd0NsYXNzTmFtZXMuam9pbignICcpO1xuICB9O1xuXG4gIGdldENlbGxNZXNzYWdlcyA9IChyb3dJbmRleCwgY29sLCBjZWxsVHlwZSkgPT4ge1xuICAgIGNvbnN0IHJldHVybkRhdGEgPSB7fTtcbiAgICBpZiAoIXRoaXMucHJvcHMuZ3JpZC5pZEtleVBhdGggfHwgIWNvbC52YWx1ZUtleVBhdGgpIHtcbiAgICAgIHJldHVybiByZXR1cm5EYXRhO1xuICAgIH1cbiAgICBsZXQgaW5mb01lc3NhZ2U7XG4gICAgbGV0IGVycm9yTWVzc2FnZTtcbiAgICBsZXQgd2FybmluZ01lc3NhZ2U7XG4gICAgaWYgKGNlbGxUeXBlID09PSAnY3JlYXRlJykge1xuICAgICAgaW5mb01lc3NhZ2UgPSB0aGlzLnByb3BzLmNyZWF0ZUNlbGxNZXNzYWdlcy5nZXRJbihbJ2luZm8nLCByb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgZXJyb3JNZXNzYWdlID0gdGhpcy5wcm9wcy5jcmVhdGVDZWxsTWVzc2FnZXMuZ2V0SW4oWydlcnJvcicsIHJvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgICB3YXJuaW5nTWVzc2FnZSA9IHRoaXMucHJvcHMuY3JlYXRlQ2VsbE1lc3NhZ2VzLmdldEluKFtcbiAgICAgICAgJ3dhcm5pbmcnLFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgLi4uY29sLnZhbHVlS2V5UGF0aCxcbiAgICAgIF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgICBpbmZvTWVzc2FnZSA9IHRoaXMucHJvcHMuY2VsbE1lc3NhZ2VzLmdldEluKFsnaW5mbycsIGlkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgICBlcnJvck1lc3NhZ2UgPSB0aGlzLnByb3BzLmNlbGxNZXNzYWdlcy5nZXRJbihbJ2Vycm9yJywgaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgIHdhcm5pbmdNZXNzYWdlID0gdGhpcy5wcm9wcy5jZWxsTWVzc2FnZXMuZ2V0SW4oWyd3YXJuaW5nJywgaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICB9XG4gICAgaWYgKGluZm9NZXNzYWdlKSB7XG4gICAgICByZXR1cm5EYXRhLmluZm9NZXNzYWdlID0gaW5mb01lc3NhZ2U7XG4gICAgfVxuICAgIGlmIChlcnJvck1lc3NhZ2UpIHtcbiAgICAgIHJldHVybkRhdGEuZXJyb3JNZXNzYWdlID0gZXJyb3JNZXNzYWdlO1xuICAgIH1cbiAgICBpZiAod2FybmluZ01lc3NhZ2UpIHtcbiAgICAgIHJldHVybkRhdGEud2FybmluZ01lc3NhZ2UgPSB3YXJuaW5nTWVzc2FnZTtcbiAgICB9XG4gICAgcmV0dXJuIHJldHVybkRhdGE7XG4gIH07XG5cbiAgZ2V0U2Nyb2xsVG9Sb3cgPSAoKSA9PiB7XG4gICAgbGV0IHNjcm9sbFRvUm93O1xuICAgIGlmICh0aGlzLnByb3BzLmlzQ3JlYXRpbmcgJiYgIXRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwpIHJldHVybiBzY3JvbGxUb1JvdztcbiAgICBpZiAodGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCkge1xuICAgICAgY29uc3Qgc2Nyb2xsTmV3Um93ID0gdGhpcy5wcm9wcy5jcmVhdGVEYXRhLnNpemUgLSAxO1xuICAgICAgaWYgKHNjcm9sbE5ld1JvdyA+PSAwKSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gc2Nyb2xsTmV3Um93O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5pc0VkaXRpbmcgJiYgIXRoaXMucHJvcHMuc2Nyb2xsSW5FZGl0TW9kZSkge1xuICAgICAgICBzY3JvbGxUb1JvdyA9IHRoaXMuc3RhdGUuY3VycmVudFJvdztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gdGhpcy5wcm9wcy5zY3JvbGxUb1JvdzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgfVxuICAgICAgaWYgKHNjcm9sbFRvUm93ID09PSB1bmRlZmluZWQgJiYgdGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLnNpemUgPiAwKSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gdGhpcy5nZXRTZWxlY3RlZEl0ZW1JbmRleCh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuZmlyc3QoKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzY3JvbGxUb1JvdztcbiAgfTtcblxuICBzZXRGb2N1c1RvID0gKGZvY3VzVG8pID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5pc0VkaXRpbmcgfHwgdGhpcy5wcm9wcy5pc0NyZWF0aW5nKSB7XG4gICAgICBpZiAoZm9jdXNUbyAmJiBmb2N1c1RvLmdldCgndHlwZScpICYmIGZvY3VzVG8gIT09IHRoaXMucHJldkZvY3VzVG8pIHtcbiAgICAgICAgdGhpc1tmb2N1c1RvLmdldCgndHlwZScpXSA9IHRydWU7XG4gICAgICAgIHRoaXMuZm9jdXNUb0xhc3RSb3cgPSBmb2N1c1RvLmdldCgnZm9jdXNUb0xhc3RSb3cnKTtcbiAgICAgICAgdGhpcy5wcmV2Rm9jdXNUbyA9IGZvY3VzVG87XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZUNlbGxTZWxlY3QgPSAoY2VsbFR5cGUsIHJvd0luZGV4LCBjb2x1bW5LZXkpID0+ICgpID0+IHtcbiAgICBpZiAoY2VsbFR5cGUgPT09ICd2aWV3JyAmJiB0aGlzLnByb3BzLmNlbGxTZWxlY3QpIHtcbiAgICAgIHRoaXMucHJvcHMuY2VsbFNlbGVjdGlvbkNoYW5nZShcbiAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICBNYXAoe1xuICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgIGNvbHVtbktleSxcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVDcmVhdGVDZWxsUmVmID0gKHJvd0luZGV4LCBjb2wpID0+IChyZWYpID0+IHtcbiAgICAvLyBGb2N1cyB0byBjcmVhdGUgY2VsbFxuICAgIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2wpO1xuICAgIGNvbnN0IHNlbGVjdFJlZiA9ICFyZWYgfHwgcmVmLmZvY3VzID8gcmVmIDogdGhpcy5nZXRTZWxlY3RSZWYocmVmKTtcbiAgICBpZiAoXG4gICAgICB0aGlzLnByb3BzLmNyZWF0ZURhdGEuc2l6ZVxuICAgICAgJiYgdGhpcy5wcm9wcy5jcmVhdGVEYXRhLnNpemUgPT09IHJvd0luZGV4ICsgMVxuICAgICAgJiYgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbFxuICAgICAgJiYgIXRoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnY3JlYXRlJylcbiAgICAgICYmIHNlbGVjdFJlZlxuICAgICkge1xuICAgICAgc2VsZWN0UmVmLmZvY3VzKCk7XG4gICAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcHMuZW5hYmxlQXJyb3dOYXZpZ2F0aW9uKSB7XG4gICAgICB0aGlzLmNyZWF0ZUNlbGxSZWZzW2Ake3RoaXMucHJvcHMuZ3JpZC5pZH1fJHtjb2x1bW5LZXl9XyR7cm93SW5kZXh9YF0gPSByZWY7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZUVkaXRDZWxsUmVmID0gKHJvd0luZGV4LCBjb2wpID0+IChyZWYpID0+IHtcbiAgICBjb25zdCBjb2x1bW5LZXkgPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sKTtcbiAgICBpZiAodGhpcy5mb2N1c1RvRWRpdENlbGwgJiYgIXRoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnZWRpdCcpKSB7XG4gICAgICBjb25zdCBzZWxlY3RlZFJvd0luZGV4ID0gdGhpcy5mb2N1c1RvTGFzdFJvdyAmJiB0aGlzLnByb3BzLmRhdGEuc2l6ZSA+IDBcbiAgICAgICAgPyB0aGlzLnByb3BzLmRhdGEuc2l6ZSAtIDFcbiAgICAgICAgOiB0aGlzLmdldFNlbGVjdGVkSXRlbUluZGV4KHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5maXJzdCgpKTtcblxuICAgICAgY29uc3QgeyBzZWxlY3RlZENlbGwgfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCBzZWxlY3RSZWYgPSAhcmVmIHx8IHJlZi5mb2N1cyA/IHJlZiA6IHRoaXMuZ2V0U2VsZWN0UmVmKHJlZik7XG4gICAgICBpZiAoc2VsZWN0ZWRDZWxsLnNpemUgPiAwKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBzZWxlY3RlZENlbGwuZ2V0KCdyb3dJbmRleCcpID09PSByb3dJbmRleFxuICAgICAgICAgICYmIHNlbGVjdGVkQ2VsbC5nZXQoJ2NvbHVtbktleScpID09PSBjb2x1bW5LZXlcbiAgICAgICAgICAmJiBzZWxlY3RSZWZcbiAgICAgICAgKSB7XG4gICAgICAgICAgc2VsZWN0UmVmLmZvY3VzKCk7XG4gICAgICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmZvY3VzVG9MYXN0Um93ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWRSb3dJbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZm9jdXNUb0xhc3RSb3cgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWRSb3dJbmRleCA9PT0gcm93SW5kZXggJiYgc2VsZWN0UmVmKSB7XG4gICAgICAgIHNlbGVjdFJlZi5mb2N1cygpO1xuICAgICAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZvY3VzVG9MYXN0Um93ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZUFycm93TmF2aWdhdGlvbikge1xuICAgICAgdGhpcy5jZWxsUmVmc1tgJHt0aGlzLnByb3BzLmdyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4fWBdID0gcmVmO1xuICAgIH1cbiAgfTtcblxuICBtb3ZlQ2VsbEZvY3VzID0gKG5leHRFbGVtZW50LCByb3dJbmRleCwgY29sdW1uSW5kZXgpID0+IHtcbiAgICBjb25zdCBlbGVtZW50VHlwZXMgPSBbJ3RleHQnLCAnY2hlY2tib3gnXTtcbiAgICBpZiAobmV4dEVsZW1lbnQgJiYgZWxlbWVudFR5cGVzLmluY2x1ZGVzKG5leHRFbGVtZW50LnR5cGUpKSB7XG4gICAgICBpZiAocm93SW5kZXggIT09IC0xIHx8IGNvbHVtbkluZGV4ICE9PSAtMSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBjdXJyZW50Q29sdW1uOiBjb2x1bW5JbmRleCxcbiAgICAgICAgICBjdXJyZW50Um93OiByb3dJbmRleCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKG5leHRFbGVtZW50LnR5cGUgPT09ICdjaGVja2JveCcpIG5leHRFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIGlmIChuZXh0RWxlbWVudC50eXBlID09PSAndGV4dCcpIG5leHRFbGVtZW50LnNlbGVjdCgpO1xuICAgICAgfSwgNTApO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVTZWxlY3RBbGxDaGVja0JveE9uQ2hhbmdlID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMuc2VsZWN0QWxsSXRlbXNDaGFuZ2UodGhpcy5wcm9wcy5ncmlkKTtcbiAgfTtcblxuICBoYW5kbGVTZWxlY3Rpb25DaGVja0JveE9uQ2hhbmdlID0gcm93SW5kZXggPT4gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMuaXRlbVNlbGVjdGlvbkNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIHJvd0luZGV4LCB0cnVlLCBmYWxzZSk7XG4gIH07XG5cbiAgZ2VuZXJhdGVDb2x1bW5zID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGRhdGEsXG4gICAgICBzZWxlY3RlZEl0ZW1zLFxuICAgICAgZGF0ZUZvcm1hdCxcbiAgICAgIHRob3VzYW5kU2VwYXJhdG9yLFxuICAgICAgZGVjaW1hbFNlcGFyYXRvcixcbiAgICAgIGdyaWQsXG4gICAgICBpbmxpbmVFZGl0LFxuICAgICAgZmlsdGVyaW5nLFxuICAgICAgcmVnaW9uLFxuICAgICAgaW50bCxcbiAgICAgIHNlbGVjdENvbXBvbmVudE9wdGlvbnMsXG4gICAgICBpc0NyZWF0aW5nLFxuICAgICAgZXh0cmFDb2x1bW4sXG4gICAgICByb3dTZWxlY3RDaGVja2JveENvbHVtbixcbiAgICAgIHNob3dTZWxlY3RBbGxDaGVja2JveCxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IGNvbHVtbnMgPSBbXTtcbiAgICBjb25zdCB0YWJJbmRleCA9IFN0cmluZyh0aGlzLnByb3BzLnRhYkluZGV4KTtcbiAgICBpZiAoZXh0cmFDb2x1bW4pIHtcbiAgICAgIGNvbHVtbnMucHVzaCh7XG4gICAgICAgIHdpZHRoOiBleHRyYUNvbHVtbi53aWR0aCB8fCA0MCxcbiAgICAgICAgaXNSZXNpemFibGU6ICEhZXh0cmFDb2x1bW4uaXNSZXNpemFibGUsXG4gICAgICAgIGlzU29ydGFibGU6IGZhbHNlLFxuICAgICAgICBjb2x1bW5LZXk6ICdleHRyYUNvbHVtbicsXG4gICAgICAgIGNlbGw6IHJvd0luZGV4ID0+IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWV4dHJhLWNvbHVtbi1jZWxsIG5vLXJvdy1zZWxlY3RcIj5cbiAgICAgICAgICAgIHtleHRyYUNvbHVtbi52YWx1ZVJlbmRlcihkYXRhLmdldChyb3dJbmRleCksIHJvd0luZGV4KX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSxcbiAgICAgICAgY2VsbEVkaXQ6IHJvd0luZGV4ID0+IChleHRyYUNvbHVtbi5jZWxsRWRpdCA/IGV4dHJhQ29sdW1uLmNlbGxFZGl0KHJvd0luZGV4KSA6IG51bGwpLFxuICAgICAgICBjZWxsQ3JlYXRlOiByb3dJbmRleCA9PiAoZXh0cmFDb2x1bW4uY2VsbENyZWF0ZSA/IGV4dHJhQ29sdW1uLmNlbGxDcmVhdGUocm93SW5kZXgpIDogbnVsbCksXG4gICAgICAgIGNlbGxGaWx0ZXI6IHJvd0luZGV4ID0+IChleHRyYUNvbHVtbi5jZWxsRmlsdGVyID8gZXh0cmFDb2x1bW4uY2VsbEZpbHRlcihyb3dJbmRleCkgOiBudWxsKSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChyb3dTZWxlY3RDaGVja2JveENvbHVtbikge1xuICAgICAgY29sdW1ucy5wdXNoKHtcbiAgICAgICAgd2lkdGg6IDQwLFxuICAgICAgICBpc1Jlc2l6YWJsZTogZmFsc2UsXG4gICAgICAgIGlzU29ydGFibGU6IGZhbHNlLFxuICAgICAgICBjb2x1bW5LZXk6ICdzZWxlY3Rpb25DaGVja2JveCcsXG4gICAgICAgIGhlYWRlcjogc2hvd1NlbGVjdEFsbENoZWNrYm94ICYmIChcbiAgICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZFNlbGVjdEFsbENoZWNrQm94LSR7Z3JpZC5pZH1gfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtc2VsZWN0LWFsbC1jaGVja2JveC1jZWxsIG5vLXJvdy1zZWxlY3RcIlxuICAgICAgICAgICAgY2hlY2tlZD17ZGF0YS5zaXplICE9PSAwICYmIGRhdGEuc2l6ZSA9PT0gc2VsZWN0ZWRJdGVtcy5zaXplfVxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlU2VsZWN0QWxsQ2hlY2tCb3hPbkNoYW5nZX1cbiAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAvPlxuICAgICAgICApLFxuICAgICAgICBjZWxsOiAocm93SW5kZXgpID0+IHtcbiAgICAgICAgICBjb25zdCByb3dJdGVtID0gZGF0YS5nZXQocm93SW5kZXgpO1xuICAgICAgICAgIGNvbnN0IGl0ZW1JZCA9IHJvd0l0ZW0uZ2V0SW4oZ3JpZC5pZEtleVBhdGgpO1xuICAgICAgICAgIGNvbnN0IHNlbGVjdGVkID0gc2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhpdGVtSWQpO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkU2VsZWN0Q2hlY2tCb3gtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtc2VsZWN0LWNoZWNrYm94LWNlbGwgbm8tcm93LXNlbGVjdFwiXG4gICAgICAgICAgICAgIGNoZWNrZWQ9e3NlbGVjdGVkfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVTZWxlY3Rpb25DaGVja0JveE9uQ2hhbmdlKHJvd0luZGV4KX1cbiAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICBjZWxsRWRpdDogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbENyZWF0ZTogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbEZpbHRlcjogKCkgPT4gbnVsbCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHZpc2libGVDb2x1bW5zID0gW107XG4gICAgdGhpcy5wcm9wcy52aXNpYmxlQ29sdW1ucy5mb3JFYWNoKCh2aXNpYmxlQ29sdW1uS2V5KSA9PiB7XG4gICAgICB0aGlzLnByb3BzLmNvbHVtbnMuZm9yRWFjaCgob3JnQ29sKSA9PiB7XG4gICAgICAgIGlmIChVdGlscy5nZXRDb2x1bW5LZXkob3JnQ29sKSA9PT0gdmlzaWJsZUNvbHVtbktleSkge1xuICAgICAgICAgIHZpc2libGVDb2x1bW5zLnB1c2gob3JnQ29sKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgdmlzaWJsZUNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZUVtcHR5Q2hlY2tlciA9IFV0aWxzLmdldFZhbHVlRW1wdHlDaGVja2VyKGNvbCk7XG4gICAgICAvLyBDZWxsIHZhbHVlIHJlbmRlcmluZ1xuICAgICAgY29uc3QgdmFsdWVSZW5kZXIgPSAocm93SW5kZXgsIGZvcm1hdCkgPT4ge1xuICAgICAgICBjb25zdCB2YWwgPSBkYXRhLmdldEluKFtyb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsKSkge1xuICAgICAgICAgIHJldHVybiBjb2wuaXNSZXF1aXJlZCA/IDxNIGlkPVwiR3JpZC5WYWx1ZUlzTWlzc2luZ1wiIC8+IDogJyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvcm1hdCA/IGZvcm1hdCh2YWwpIDogdmFsO1xuICAgICAgfTtcblxuICAgICAgbGV0IGNvbHVtbiA9IEdyaWRDb2x1bW5TZXJ2aWNlLmJhc2VDb2x1bW4oY29sKTtcbiAgICAgIC8vIENvbGxlY3QgY29sdW1uIGZ1bmN0aW9ucyBpbnRvIG9uZSBPYmplY3RcbiAgICAgIGNvbnN0IGNvbHVtbkZ1bmN0aW9ucyA9IHtcbiAgICAgICAgZWRpdDoge1xuICAgICAgICAgIGdldEl0ZW1WYWx1ZTogdGhpcy5nZXRFZGl0SXRlbVZhbHVlLFxuICAgICAgICAgIG9uQ2VsbFZhbHVlQ2hhbmdlOiB0aGlzLm9uRWRpdENlbGxWYWx1ZUNoYW5nZSxcbiAgICAgICAgICBvbkNlbGxCbHVyOiB0aGlzLm9uRWRpdENlbGxCbHVyLFxuICAgICAgICAgIG9uQ2VsbEZvY3VzOiB0aGlzLm9uQ2VsbEZvY3VzLFxuICAgICAgICAgIG9uQ2VsbEtleURvd246IHRoaXMub25FZGl0Q2VsbEtleURvd24sXG4gICAgICAgICAgaGFuZGxlQ2VsbFJlZjogdGhpcy5oYW5kbGVFZGl0Q2VsbFJlZixcbiAgICAgICAgfSxcbiAgICAgICAgY3JlYXRlOiB7XG4gICAgICAgICAgZ2V0SXRlbVZhbHVlOiB0aGlzLmdldENyZWF0ZUl0ZW1WYWx1ZSxcbiAgICAgICAgICBvbkNlbGxWYWx1ZUNoYW5nZTogdGhpcy5vbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSxcbiAgICAgICAgICBvbkNlbGxCbHVyOiB0aGlzLm9uQ3JlYXRlQ2VsbEJsdXIsXG4gICAgICAgICAgb25DZWxsRm9jdXM6IHRoaXMub25DZWxsRm9jdXMsXG4gICAgICAgICAgb25DZWxsS2V5RG93bjogdGhpcy5vbkNyZWF0ZUNlbGxLZXlEb3duLFxuICAgICAgICAgIGhhbmRsZUNlbGxSZWY6IHRoaXMuaGFuZGxlQ3JlYXRlQ2VsbFJlZixcbiAgICAgICAgfSxcbiAgICAgICAgZmlsdGVyOiB7XG4gICAgICAgICAgZ2V0SXRlbVZhbHVlOiB0aGlzLmdldEZpbHRlckl0ZW1WYWx1ZSxcbiAgICAgICAgICBnZXRJdGVtTXVsdGlWYWx1ZTogdGhpcy5nZXRGaWx0ZXJJdGVtTXVsdGlWYWx1ZSxcbiAgICAgICAgICBvbkNlbGxWYWx1ZUNoYW5nZTogdGhpcy5vbkZpbHRlckNlbGxWYWx1ZUNoYW5nZSxcbiAgICAgICAgICBvbkNlbGxNdWx0aVZhbHVlQmx1cjogdGhpcy5vbkZpbHRlckNlbGxNdWx0aVZhbHVlQmx1cixcbiAgICAgICAgICBvbkNlbGxNdWx0aVZhbHVlQ2hhbmdlOiB0aGlzLm9uRmlsdGVyQ2VsbE11bHRpVmFsdWVDaGFuZ2UsXG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICAvLyBoYW5kbGUgY29sdW1uLmNlbGwgLyBjb2x1bW4uY2VsbEVkaXQgLyBjb2x1bW4uY2VsbENyZWF0ZSAvIGNvbHVtbi5jZWxsRmlsdGVyXG4gICAgICBjb25zdCBjZWxsUHJvcHMgPSB7XG4gICAgICAgIGdyaWQsXG4gICAgICAgIGRhdGEsXG4gICAgICAgIGRhdGVGb3JtYXQsXG4gICAgICAgIHRob3VzYW5kU2VwYXJhdG9yLFxuICAgICAgICBkZWNpbWFsU2VwYXJhdG9yLFxuICAgICAgICBzZWxlY3RDb21wb25lbnRPcHRpb25zLFxuICAgICAgfTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgY29sdW1uID0gR3JpZENvbHVtblNlcnZpY2UuY29sdW1uQ2VsbChjb2x1bW4sIGNlbGxQcm9wcywgY29sLCB2YWx1ZVJlbmRlcik7XG5cbiAgICAgIC8vIGhhbmRsZSBjb2x1bW5Db21wb25lbnRUeXBlc1xuICAgICAgY29uc3QgY29tcG9uZW50VHlwZVByb3BzID0ge1xuICAgICAgICAuLi5jZWxsUHJvcHMsXG4gICAgICAgIGlubGluZUVkaXQsXG4gICAgICAgIGZpbHRlcmluZyxcbiAgICAgICAgcmVnaW9uLFxuICAgICAgICBpbnRsLFxuICAgICAgICBzZWxlY3RDb21wb25lbnRPcHRpb25zLFxuICAgICAgfTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgY29sdW1uID0gR3JpZENvbHVtblNlcnZpY2UuY29sdW1uQ29tcG9uZW50VHlwZShcbiAgICAgICAgY29sdW1uLFxuICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgY29tcG9uZW50VHlwZVByb3BzLFxuICAgICAgICBjb2wsXG4gICAgICAgIGNvbHVtbkZ1bmN0aW9ucyxcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlLFxuICAgICAgKTtcbiAgICAgIGNvbHVtbnMucHVzaChjb2x1bW4pO1xuICAgIH0pO1xuXG4gICAgaWYgKGlzQ3JlYXRpbmcpIHtcbiAgICAgIGNvbHVtbnMucHVzaCh7XG4gICAgICAgIHdpZHRoOiAzNyxcbiAgICAgICAgaXNSZXNpemFibGU6IGZhbHNlLFxuICAgICAgICBjb2x1bW5LZXk6ICdyZW1vdmVOZXdJdGVtJyxcbiAgICAgICAgY2VsbDogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbEVkaXQ6ICgpID0+IG51bGwsXG4gICAgICAgIGNlbGxDcmVhdGU6IHJvd0luZGV4ID0+IChcbiAgICAgICAgICA8SWNvblxuICAgICAgICAgICAgaWQ9e2BvYy1kYXRhZ3JpZC1uZXctaXRlbS1yZW1vdmUtJHtncmlkLmlkfS0ke3Jvd0luZGV4fWB9XG4gICAgICAgICAgICB0eXBlPVwiaW5kaWNhdG9yXCJcbiAgICAgICAgICAgIG5hbWU9XCJkZWxldGVcIlxuICAgICAgICAgICAgd2lkdGg9ezMwfVxuICAgICAgICAgICAgaGVpZ2h0PXszMH1cbiAgICAgICAgICAgIHN0eWxlPXt7IHBhZGRpbmc6ICc3cHgnIH19XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0aGlzLnByb3BzLnJlbW92ZU5ld0l0ZW0oZ3JpZCwgcm93SW5kZXgpfVxuICAgICAgICAgIC8+XG4gICAgICAgICksXG4gICAgICAgIGNlbGxGaWx0ZXI6ICgpID0+IG51bGwsXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbHVtbnM7XG4gIH07XG5cbiAgaXNDZWxsRWRpdGVkID0gKHJvd0luZGV4LCBjb2wsIGNlbGxUeXBlKSA9PiB7XG4gICAgaWYgKGNlbGxUeXBlICE9PSAnZWRpdCcpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgaWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgIHJldHVybiAhIXRoaXMucHJvcHMuZWRpdERhdGEuZ2V0SW4oW2lkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gIH07XG5cbiAgaGFuZGxlQWZ0ZXJBZGRJdGVtID0gKCkgPT4ge1xuICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgPSB0cnVlO1xuICB9O1xuXG4gIGhhbmRsZUFmdGVyRWRpdFByZXNzID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuc2l6ZSkge1xuICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSB0cnVlO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGN1cnJlbnRSb3c6IHVuZGVmaW5lZCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVBZnRlclZhbGlkYXRpb25FcnJvciA9ICgpID0+IHtcbiAgICB0aGlzLmZvY3VzVG9FcnJvckNlbGwgPSB0cnVlO1xuICB9O1xuXG4gIGhhbmRsZVJvd0NsaWNrID0gKGUsIHJvd0luZGV4KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMucm93U2VsZWN0ICYmICF0aGlzLnByb3BzLmlzQ3JlYXRpbmcgJiYgIXRoaXMucHJvcHMuaXNFZGl0aW5nKSB7XG4gICAgICBpZiAoZS5jdHJsS2V5IHx8IGUuc2hpZnRLZXkpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0U2VsZWN0aW9uKCkucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICB9XG4gICAgICAvLyBEb24ndCB0cmlnZ2VyIHNlbGVjdGlvbiBjaGFuZ2Ugb24gd2hlbiB1c2VyIGNsaWNrcyBvbiBzcGVjaWFsIGNlbGxzIGxpa2UgY2hlY2tib3gvZXh0cmFcbiAgICAgIC8vIENoZWNrIHRoYXQgY2xpY2tlZCBub2RlJ3MgcGFyZW50IG9yIHBhcmVudCdzIHBhcmVudCBkb2Vzbid0IGhhdmUgbm8tcm93LXNlbGVjdCBjbGFzc1xuICAgICAgY29uc3QgeyBwYXJlbnROb2RlIH0gPSBlLnRhcmdldDtcbiAgICAgIGNvbnN0IHBhcmVudDFjbGFzcyA9IHBhcmVudE5vZGUuY2xhc3NOYW1lICYmIHBhcmVudE5vZGUuY2xhc3NOYW1lLmluZGV4T2YgPyBwYXJlbnROb2RlLmNsYXNzTmFtZSA6ICcnO1xuICAgICAgY29uc3QgcGFyZW50MmNsYXNzID0gICAgICAgIHBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUgJiYgcGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZS5pbmRleE9mIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgPyBwYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgIDogJyc7XG4gICAgICBjb25zdCBwYXJlbnQzY2xhc3MgPSBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWVcbiAgICAgICAgJiYgcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lLmluZGV4T2YgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICA/IHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZVxuICAgICAgICA6ICcnO1xuICAgICAgY29uc3QgcGFyZW50NGNsYXNzID0gcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWVcbiAgICAgICAgJiYgcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUuaW5kZXhPZiAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgID8gcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWVcbiAgICAgICAgOiAnJztcbiAgICAgIGlmIChcbiAgICAgICAgcGFyZW50MWNsYXNzLmluZGV4T2YoJ25vLXJvdy1zZWxlY3QnKSA9PT0gLTFcbiAgICAgICAgJiYgcGFyZW50MmNsYXNzLmluZGV4T2YoJ25vLXJvdy1zZWxlY3QnKSA9PT0gLTFcbiAgICAgICAgJiYgcGFyZW50M2NsYXNzLmluZGV4T2YoJ25vLXJvdy1zZWxlY3QnKSA9PT0gLTFcbiAgICAgICAgJiYgcGFyZW50NGNsYXNzLmluZGV4T2YoJ25vLXJvdy1zZWxlY3QnKSA9PT0gLTFcbiAgICAgICkge1xuICAgICAgICB0aGlzLnByb3BzLml0ZW1TZWxlY3Rpb25DaGFuZ2UoXG4gICAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgIHRoaXMucHJvcHMubXVsdGlTZWxlY3QgJiYgZS5jdHJsS2V5LFxuICAgICAgICAgIHRoaXMucHJvcHMubXVsdGlTZWxlY3QgJiYgZS5zaGlmdEtleSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMub25Sb3dDbGljaykge1xuICAgICAgdGhpcy5wcm9wcy5vblJvd0NsaWNrKGUsIHJvd0luZGV4LCB0aGlzLnByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGhhbmRsZUNvbnRleHRNZW51ID0gKGUsIHJvd0luZGV4KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuY29udGV4dE1lbnVJdGVtcykge1xuICAgICAgY29uc3Qge1xuICAgICAgICBpdGVtU2VsZWN0aW9uQ2hhbmdlLCBzZWxlY3RlZEl0ZW1zLCBncmlkLCBkYXRhLFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGNvbnRleHRNZW51T3BlbjogdHJ1ZSxcbiAgICAgICAgY29udGV4dE1lbnVYOiBlLmNsaWVudFgsXG4gICAgICAgIGNvbnRleHRNZW51WTogZS5jbGllbnRZLFxuICAgICAgfSk7XG4gICAgICAvLyBJZiBjbGlja2VkIGl0ZW0gaXMgbm90IHNlbGVjdGVkLCBjaGFuZ2Ugc2VsZWN0aW9uIHRvIGl0XG4gICAgICBpZiAoIXNlbGVjdGVkSXRlbXMuaW5jbHVkZXMoZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmdyaWQuaWRLZXlQYXRoXSkpKSB7XG4gICAgICAgIGl0ZW1TZWxlY3Rpb25DaGFuZ2UoZ3JpZCwgcm93SW5kZXgpO1xuICAgICAgfVxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uRG9jdW1lbnRDbGljayk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGhhbmRsZUNvbnRleHRNZW51SXRlbUNsaWNrID0gKG9uQ2xpY2ssIHNlbGVjdGVkSXRlbXMsIHNlbGVjdGVkRGF0YSkgPT4gKCkgPT4ge1xuICAgIG9uQ2xpY2soc2VsZWN0ZWRJdGVtcywgc2VsZWN0ZWREYXRhKTtcbiAgfTtcblxuICBoYW5kbGVSb3dIZWlnaHRHZXR0ZXIgPSByb3dJbmRleCA9PiB0aGlzLnByb3BzLnJvd0hlaWdodEdldHRlcihcbiAgICB0aGlzLnByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSxcbiAgICByb3dJbmRleCxcbiAgKTtcblxuICByZW5kZXJDZWxsID0gY29sID0+IChjZWxsUHJvcHMpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBpc0NyZWF0aW5nLCBpc0VkaXRpbmcsIGNyZWF0ZURhdGEsIHNlbGVjdGVkQ2VsbCwgZ3JpZCxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHJvd0luZGV4LCAuLi5wcm9wcyB9ID0gY2VsbFByb3BzO1xuICAgIGxldCBjZWxsO1xuICAgIGxldCBjZWxsVHlwZSA9ICd2aWV3JztcbiAgICBsZXQgZXh0cmFSb3dDb3VudCA9IDA7IC8vIGhvdyBtYW55IHJvd3MgdG8gaWdub3JlIGZyb20gdG9wLCBuZXcgKyBmaWx0ZXIgcm93c1xuICAgIGlmIChpc0NyZWF0aW5nKSBleHRyYVJvd0NvdW50ID0gY3JlYXRlRGF0YS5zaXplO1xuICAgIGNvbnN0IGV4aXN0aW5nUm93c0luZGV4ID0gcm93SW5kZXggLSBleHRyYVJvd0NvdW50O1xuICAgIGlmIChpc0NyZWF0aW5nKSB7XG4gICAgICBpZiAocm93SW5kZXggPD0gZXh0cmFSb3dDb3VudCAtIDEpIHtcbiAgICAgICAgaWYgKGNvbC5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY2VsbCA9IGNvbC5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNyZWF0ZUNlbGxSZWYocm93SW5kZXgsIGNvbCksXG4gICAgICAgICAgICB0aGlzLm9uQ3JlYXRlQ2VsbEtleURvd24ocm93SW5kZXgsIGNvbCksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjZWxsVHlwZSA9ICdjcmVhdGUnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNlbGwgPSBudWxsO1xuICAgICAgICAgIGNlbGxUeXBlID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2VsbCA9IGNvbC5jZWxsKFxuICAgICAgICAgIGV4aXN0aW5nUm93c0luZGV4LFxuICAgICAgICAgIHRoaXMuaGFuZGxlQ3JlYXRlQ2VsbFJlZihleGlzdGluZ1Jvd3NJbmRleCwgY29sKSxcbiAgICAgICAgICB0aGlzLm9uQ3JlYXRlQ2VsbEtleURvd24oZXhpc3RpbmdSb3dzSW5kZXgsIGNvbCksXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc0VkaXRpbmcgJiYgY29sLmNlbGxFZGl0KSB7XG4gICAgICBjZWxsID0gY29sLmNlbGxFZGl0KFxuICAgICAgICBleGlzdGluZ1Jvd3NJbmRleCxcbiAgICAgICAgdGhpcy5oYW5kbGVFZGl0Q2VsbFJlZihleGlzdGluZ1Jvd3NJbmRleCwgY29sKSxcbiAgICAgICAgdGhpcy5vbkVkaXRDZWxsS2V5RG93bihleGlzdGluZ1Jvd3NJbmRleCwgY29sKSxcbiAgICAgICk7XG4gICAgICBjZWxsVHlwZSA9ICdlZGl0JztcbiAgICB9IGVsc2Uge1xuICAgICAgY2VsbCA9IGNvbC5jZWxsKFxuICAgICAgICBleGlzdGluZ1Jvd3NJbmRleCxcbiAgICAgICAgdGhpcy5oYW5kbGVFZGl0Q2VsbFJlZihleGlzdGluZ1Jvd3NJbmRleCwgY29sKSxcbiAgICAgICAgdGhpcy5vbkVkaXRDZWxsS2V5RG93bihleGlzdGluZ1Jvd3NJbmRleCwgY29sKSxcbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnN0IGlzU3BlY2lhbCA9IHByb3BzLmNvbHVtbktleSA9PT0gJ3NlbGVjdGlvbkNoZWNrYm94JyB8fCBwcm9wcy5jb2x1bW5LZXkgPT09ICdleHRyYUNvbHVtbic7XG4gICAgaWYgKChjZWxsVHlwZSA9PT0gJ3ZpZXcnIHx8IGNlbGxUeXBlID09PSAnZWRpdCcgfHwgY2VsbFR5cGUgPT09ICdjcmVhdGUnKSAmJiAhaXNTcGVjaWFsKSB7XG4gICAgICBjb25zdCBnZXRSb3dJbmRleCA9IGNlbGxUeXBlID09PSAnY3JlYXRlJyA/IHJvd0luZGV4IDogcm93SW5kZXggLSBleHRyYVJvd0NvdW50O1xuICAgICAgY29uc3QgbWVzc2FnZURhdGEgPSB0aGlzLmdldENlbGxNZXNzYWdlcyhnZXRSb3dJbmRleCwgY29sLCBjZWxsVHlwZSk7XG4gICAgICBjb25zdCBpc0VkaXRlZCA9IHRoaXMuaXNDZWxsRWRpdGVkKGdldFJvd0luZGV4LCBjb2wsIGNlbGxUeXBlKTtcbiAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IHNlbGVjdGVkQ2VsbC5nZXQoJ3Jvd0luZGV4JykgPT09IHJvd0luZGV4XG4gICAgICAgICYmIHNlbGVjdGVkQ2VsbC5nZXQoJ2NvbHVtbktleScpID09PSBwcm9wcy5jb2x1bW5LZXlcbiAgICAgICAgPyAnb2MtZGF0YWdyaWQtY2VsbCBpcy1zZWxlY3RlZCdcbiAgICAgICAgOiAnb2MtZGF0YWdyaWQtY2VsbCc7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Q2VsbFxuICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgICAgICBzdHlsZT17Y29sLnN0eWxlfVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2VsbFNlbGVjdChjZWxsVHlwZSwgcm93SW5kZXgsIHByb3BzLmNvbHVtbktleSl9XG4gICAgICAgID5cbiAgICAgICAgICA8Q2VsbFRvb2x0aXBcbiAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZENlbGwtJHtncmlkLmlkfS0ke3Byb3BzLmNvbHVtbktleX0tJHtyb3dJbmRleH1gfVxuICAgICAgICAgICAgaXNFZGl0ZWQ9e2lzRWRpdGVkfVxuICAgICAgICAgICAgaXNFcnJvcj17ISFtZXNzYWdlRGF0YS5lcnJvck1lc3NhZ2V9XG4gICAgICAgICAgICBpc1dhcm5pbmc9eyEhbWVzc2FnZURhdGEud2FybmluZ01lc3NhZ2V9XG4gICAgICAgICAgICBpbmZvTWVzc2FnZT17bWVzc2FnZURhdGEuaW5mb01lc3NhZ2V9XG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U9e21lc3NhZ2VEYXRhLmVycm9yTWVzc2FnZX1cbiAgICAgICAgICAgIHdhcm5pbmdNZXNzYWdlPXttZXNzYWdlRGF0YS53YXJuaW5nTWVzc2FnZX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7Y2VsbH1cbiAgICAgICAgICA8L0NlbGxUb29sdGlwPlxuICAgICAgICA8L0NlbGw+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPENlbGwgey4uLnByb3BzfSBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1jZWxsXCIgc3R5bGU9e2NvbC5zdHlsZX0+XG4gICAgICAgIHtjZWxsfVxuICAgICAgPC9DZWxsPlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyQ29sdW1ucyA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBhbGxEYXRhU2l6ZSwgZ3JpZCwgaXNDcmVhdGluZywgaXNCdXN5LCB2aXNpYmxlQ29sdW1ucyxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIWFsbERhdGFTaXplICYmICFpc0J1c3kgJiYgIWlzQ3JlYXRpbmcgJiYgIWdyaWQucGFnaW5hdGlvbikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPENvbHVtblxuICAgICAgICAgIGNvbHVtbktleT1cImRhdGFFbXB0eUNvbHVtblwiXG4gICAgICAgICAgaGVhZGVyPXsoXG4gICAgICAgICAgICA8Q2VsbCBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInIH19PlxuICAgICAgICAgICAgICA8TSBpZD1cIkdyaWQuTm9JdGVtc1wiIC8+XG4gICAgICAgICAgICA8L0NlbGw+XG4pfVxuICAgICAgICAgIHdpZHRoPXsxMH1cbiAgICAgICAgICBpc1Jlc2l6YWJsZT17ZmFsc2V9XG4gICAgICAgICAgZmxleEdyb3c9ezF9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoIXZpc2libGVDb2x1bW5zLnNpemUpIHtcbiAgICAgIGlmIChpc0J1c3kpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8Q29sdW1uXG4gICAgICAgICAgICBjb2x1bW5LZXk9XCJkYXRhRW1wdHlDb2x1bW5cIlxuICAgICAgICAgICAgaGVhZGVyPXs8Q2VsbD4mbmJzcDs8L0NlbGw+fVxuICAgICAgICAgICAgd2lkdGg9ezEwfVxuICAgICAgICAgICAgaXNSZXNpemFibGU9e2ZhbHNlfVxuICAgICAgICAgICAgZmxleEdyb3c9ezF9XG4gICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxDb2x1bW5cbiAgICAgICAgICBjb2x1bW5LZXk9XCJkYXRhRW1wdHlDb2x1bW5cIlxuICAgICAgICAgIGhlYWRlcj17KFxuICAgICAgICAgICAgPENlbGwgc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICAgICAgPE0gaWQ9XCJHcmlkLk5vQ29sdW1uc1wiIC8+XG4gICAgICAgICAgICA8L0NlbGw+XG4pfVxuICAgICAgICAgIHdpZHRoPXsxMH1cbiAgICAgICAgICBpc1Jlc2l6YWJsZT17ZmFsc2V9XG4gICAgICAgICAgZmxleEdyb3c9ezF9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCBjb2x1bW5zID0gdGhpcy5nZW5lcmF0ZUNvbHVtbnMoKTtcbiAgICBpZiAoY29sdW1ucy5sZW5naHQgPT09IDApIHJldHVybiBudWxsO1xuICAgIHJldHVybiBjb2x1bW5zLm1hcChjb2wgPT4gKFxuICAgICAgPENvbHVtblxuICAgICAgICBrZXk9e2NvbC5jb2x1bW5LZXl9XG4gICAgICAgIGNvbHVtbktleT17Y29sLmNvbHVtbktleX1cbiAgICAgICAgaGVhZGVyPXsoXG4gICAgICAgICAgPEhlYWRlckNlbGxcbiAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZEhlYWRlci0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2wuY29sdW1uS2V5fWB9XG4gICAgICAgICAgICBncmlkPXt0aGlzLnByb3BzLmdyaWR9XG4gICAgICAgICAgICBjb2x1bW5zPXt0aGlzLnByb3BzLmNvbHVtbnN9XG4gICAgICAgICAgICBjb2x1bW49e2NvbH1cbiAgICAgICAgICAgIGN1cnJlbnRTb3J0Q29sdW1uPXt0aGlzLnByb3BzLnNvcnRDb2x1bW59XG4gICAgICAgICAgICBjdXJyZW50U29ydE9yZGVyPXt0aGlzLnByb3BzLnNvcnRPcmRlcn1cbiAgICAgICAgICAgIG9uU29ydENoYW5nZT17dGhpcy5wcm9wcy5zb3J0Q2hhbmdlfVxuICAgICAgICAgICAgaXNCdXN5PXt0aGlzLnByb3BzLmlzQnVzeX1cbiAgICAgICAgICAgIGZpbHRlcmluZz17dGhpcy5wcm9wcy5maWx0ZXJpbmcgJiYgdGhpcy5wcm9wcy5pc0ZpbHRlcmluZ31cbiAgICAgICAgICAgIHdpZHRoPXt0aGlzLnByb3BzLmNvbHVtbldpZHRocy5nZXQoY29sLmNvbHVtbktleSwgY29sLndpZHRoKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7Y29sLmhlYWRlcn1cbiAgICAgICAgICA8L0hlYWRlckNlbGw+XG4pfVxuICAgICAgICBjZWxsPXt0aGlzLnJlbmRlckNlbGwoY29sKX1cbiAgICAgICAgd2lkdGg9e3RoaXMucHJvcHMuY29sdW1uV2lkdGhzLmdldChjb2wuY29sdW1uS2V5LCBjb2wud2lkdGgpfVxuICAgICAgICBtaW5XaWR0aD17Y29sLm1pbldpZHRofVxuICAgICAgICBtYXhXaWR0aD17Y29sLm1heFdpZHRofVxuICAgICAgICBpc1Jlc2l6YWJsZT17Y29sLmlzUmVzaXphYmxlfVxuICAgICAgICBmbGV4R3Jvdz17Y29sLmZsZXhHcm93ID8gY29sLmZsZXhHcm93IDogMH1cbiAgICAgICAgZml4ZWQ9e2NvbC5maXhlZH1cbiAgICAgICAgZml4ZWRSaWdodD17Y29sLmZpeGVkUmlnaHR9XG4gICAgICAgIGFsbG93Q2VsbHNSZWN5Y2xpbmc9e2NvbC5hbGxvd0NlbGxzUmVjeWNsaW5nfVxuICAgICAgLz5cbiAgICApKTtcbiAgfTtcblxuICByZW5kZXJDb250ZXh0TWVudSA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBjb250ZXh0TWVudUl0ZW1zLCBkYXRhLCBncmlkLCBzZWxlY3RlZEl0ZW1zLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgY29udGV4dE1lbnVYLCBjb250ZXh0TWVudVkgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3Qgc3R5bGUgPSB7XG4gICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgICAgekluZGV4OiAxMDAwMCxcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgdG9wOiBgJHtjb250ZXh0TWVudVl9cHhgLFxuICAgICAgbGVmdDogYCR7Y29udGV4dE1lbnVYfXB4YCxcbiAgICB9O1xuICAgIGNvbnN0IHNlbGVjdGVkRGF0YSA9IGRhdGEuZmlsdGVyKGQgPT4gc2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhkLmdldEluKGdyaWQuaWRLZXlQYXRoKSkpO1xuICAgIHJldHVybiAoXG4gICAgICA8dWwgY2xhc3NOYW1lPVwiZHJvcGRvd24tbWVudSBvYy1kYXRhZ3JpZC1jb250ZXh0LW1lbnUgb3BlblwiIHN0eWxlPXtzdHlsZX0+XG4gICAgICAgIHtjb250ZXh0TWVudUl0ZW1zXG4gICAgICAgICAgJiYgY29udGV4dE1lbnVJdGVtcy5tYXBcbiAgICAgICAgICAmJiBjb250ZXh0TWVudUl0ZW1zLm1hcCgoaXRlbSwgaSkgPT4ge1xuICAgICAgICAgICAgbGV0IHsgZGlzYWJsZWQgfSA9IGl0ZW07XG4gICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0uZGlzYWJsZWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgZGlzYWJsZWQgPSBpdGVtLmRpc2FibGVkKHNlbGVjdGVkSXRlbXMsIHNlbGVjdGVkRGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8TWVudUl0ZW1cbiAgICAgICAgICAgICAgICBrZXk9e2l9IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgICAgICAgICBoZWFkZXI9e2l0ZW0uaGVhZGVyfVxuICAgICAgICAgICAgICAgIGRpdmlkZXI9e2l0ZW0uZGl2aWRlcn1cbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgdGl0bGU9e2l0ZW0udGl0bGV9XG4gICAgICAgICAgICAgICAgb25DbGljaz17XG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZCB8fCAhaXRlbS5vbkNsaWNrXG4gICAgICAgICAgICAgICAgICAgID8gbnVsbFxuICAgICAgICAgICAgICAgICAgICA6IHRoaXMuaGFuZGxlQ29udGV4dE1lbnVJdGVtQ2xpY2soaXRlbS5vbkNsaWNrLCBzZWxlY3RlZEl0ZW1zLCBzZWxlY3RlZERhdGEpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2l0ZW0udmFsdWV9XG4gICAgICAgICAgICAgIDwvTWVudUl0ZW0+XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pfVxuICAgICAgPC91bD5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBncmlkQ2xhc3NOYW1lID0gY2xhc3NOYW1lcyh7XG4gICAgICAnb2MtZGF0YWdyaWQtY29udGFpbmVyJzogdHJ1ZSxcbiAgICAgICd3aXRoLWFjdGlvbmJhcic6IHRoaXMucHJvcHMuaW5saW5lRWRpdCAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlQWN0aW9uQmFyLFxuICAgICAgJ2lzLWJ1c3knOiB0aGlzLnByb3BzLmlzQnVzeSxcbiAgICAgICdpcy1lZGl0aW5nJzogdGhpcy5wcm9wcy5pc0VkaXRpbmcsXG4gICAgICAnaXMtY3JlYXRpbmcnOiB0aGlzLnByb3BzLmlzQ3JlYXRpbmcsXG4gICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgIH0pO1xuXG4gICAgLy8gY2hlY2sgaWYgdGhlcmUgaXMgYSBuZXcgcmVxdWVzdCB0byBjaGFuZ2UgZWRpdCBtb2RlIGZvY3VzXG4gICAgdGhpcy5zZXRGb2N1c1RvKHRoaXMucHJvcHMuZm9jdXNUeXBlKTtcblxuICAgIGxldCBhY3Rpb25CYXIgPSBudWxsO1xuICAgIGxldCBhY3Rpb25CYXJSaWdodCA9IG51bGw7XG4gICAgbGV0IGFjdGlvbkJhckxlZnQgPSBudWxsO1xuICAgIGlmIChcbiAgICAgICh0aGlzLnByb3BzLmFjdGlvbkJhclxuICAgICAgICB8fCB0aGlzLnByb3BzLmlubGluZUVkaXRcbiAgICAgICAgfHwgdGhpcy5wcm9wcy5maWx0ZXJpbmdcbiAgICAgICAgfHwgdGhpcy5wcm9wcy5yZW1vdmluZylcbiAgICAgICYmICF0aGlzLnByb3BzLmRpc2FibGVBY3Rpb25CYXJcbiAgICApIHtcbiAgICAgIGFjdGlvbkJhclJpZ2h0ID0gKFxuICAgICAgICA8QWN0aW9uQmFyIHBvc2l0aW9uPVwicmlnaHRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWFjdGlvbmJhci1yaWdodFwiPnt0aGlzLnByb3BzLmFjdGlvbkJhcn08L2Rpdj5cbiAgICAgICAgICB7dGhpcy5wcm9wcy5maWx0ZXJpbmdcbiAgICAgICAgICAgICYmIHRoaXMucHJvcHMuZGlzYWJsZURyb3Bkb3duXG4gICAgICAgICAgICAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlRmlsdGVyaW5nQ29udHJvbHMgJiYgPEZpbHRlcmluZ0NvbnRyb2xzIHsuLi50aGlzLnByb3BzfSAvPn1cbiAgICAgICAgICB7dGhpcy5wcm9wcy5pbmxpbmVFZGl0ICYmIChcbiAgICAgICAgICAgIDxJbmxpbmVFZGl0Q29udHJvbHNcbiAgICAgICAgICAgICAgYWZ0ZXJBZGRJdGVtPXt0aGlzLmhhbmRsZUFmdGVyQWRkSXRlbX1cbiAgICAgICAgICAgICAgYWZ0ZXJFZGl0UHJlc3M9e3RoaXMuaGFuZGxlQWZ0ZXJFZGl0UHJlc3N9XG4gICAgICAgICAgICAgIGFmdGVyVmFsaWRhdGlvbkVycm9yPXt0aGlzLmhhbmRsZUFmdGVyVmFsaWRhdGlvbkVycm9yfVxuICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7KHRoaXMucHJvcHMuZHJvcGRvd25NZW51SXRlbXNcbiAgICAgICAgICAgIHx8IHRoaXMucHJvcHMucmVtb3ZpbmdcbiAgICAgICAgICAgIHx8IHRoaXMucHJvcHMuY29sdW1uU2V0dGluZ3NcbiAgICAgICAgICAgIHx8ICh0aGlzLnByb3BzLmZpbHRlcmluZyAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlRHJvcGRvd24pKSAmJiAoXG4gICAgICAgICAgICA8RHJvcGRvd25Db250cm9scyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgICApfVxuICAgICAgICA8L0FjdGlvbkJhcj5cbiAgICAgICk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLmFjdGlvbkJhckxlZnQgfHwgdGhpcy5wcm9wcy5ncmlkSGVhZGVyKSB7XG4gICAgICBhY3Rpb25CYXJMZWZ0ID0gKFxuICAgICAgICA8QWN0aW9uQmFyIHBvc2l0aW9uPVwibGVmdFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtZ3JpZGhlYWRlclwiPnt0aGlzLnByb3BzLmdyaWRIZWFkZXJ9PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1hY3Rpb25iYXItbGVmdFwiPnt0aGlzLnByb3BzLmFjdGlvbkJhckxlZnR9PC9kaXY+XG4gICAgICAgIDwvQWN0aW9uQmFyPlxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGFjdGlvbkJhckxlZnQgfHwgYWN0aW9uQmFyUmlnaHQpIHtcbiAgICAgIGFjdGlvbkJhciA9IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1hY3Rpb25iYXItY29udGFpbmVyXCI+XG4gICAgICAgICAge2FjdGlvbkJhckxlZnR9XG4gICAgICAgICAge2FjdGlvbkJhclJpZ2h0fVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICAgIGxldCByb3dzQ291bnQgPSB0aGlzLnByb3BzLnJvd3NDb3VudCB8fCB0aGlzLnByb3BzLnJvd3NDb3VudCA9PT0gMFxuICAgICAgPyB0aGlzLnByb3BzLnJvd3NDb3VudFxuICAgICAgOiB0aGlzLnByb3BzLmRhdGEuc2l6ZTtcbiAgICBpZiAodGhpcy5wcm9wcy5pc0NyZWF0aW5nKSByb3dzQ291bnQgKz0gdGhpcy5wcm9wcy5jcmVhdGVEYXRhLnNpemU7XG4gICAgaWYgKCF0aGlzLnByb3BzLnZpc2libGVDb2x1bW5zLnNpemUpIHJvd3NDb3VudCA9IDA7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9e2BvYy1kYXRhZ3JpZC0ke3RoaXMucHJvcHMuZ3JpZC5pZH1gfVxuICAgICAgICBjbGFzc05hbWU9e2dyaWRDbGFzc05hbWV9XG4gICAgICAgIHN0eWxlPXt0aGlzLnByb3BzLmNvbnRhaW5lclN0eWxlfVxuICAgICAgPlxuICAgICAgICB7dGhpcy5wcm9wcy5pc0J1c3kgJiYgPFNwaW5uZXIgLz59XG4gICAgICAgIHt0aGlzLnN0YXRlLmNvbnRleHRNZW51T3BlbiAmJiB0aGlzLnJlbmRlckNvbnRleHRNZW51KCl9XG4gICAgICAgIHthY3Rpb25CYXJ9XG4gICAgICAgIDxSZXNwb25zaXZlRml4ZWREYXRhVGFibGVcbiAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICBpZD17dGhpcy5wcm9wcy5ncmlkLmlkfVxuICAgICAgICAgIHJvd3NDb3VudD17cm93c0NvdW50fVxuICAgICAgICAgIGhlYWRlckhlaWdodD17XG4gICAgICAgICAgICAodGhpcy5wcm9wcy5maWx0ZXJpbmcgJiYgdGhpcy5wcm9wcy5pc0ZpbHRlcmluZylcbiAgICAgICAgICAgICAgPyB0aGlzLnByb3BzLmhlYWRlckhlaWdodCArIHRoaXMucHJvcHMuZmlsdGVyUm93SGVpZ2h0XG4gICAgICAgICAgICAgIDogdGhpcy5wcm9wcy5oZWFkZXJIZWlnaHRcbiAgICAgICAgICB9XG4gICAgICAgICAgcm93SGVpZ2h0PXt0aGlzLnByb3BzLnJvd0hlaWdodH1cbiAgICAgICAgICBvbkNvbHVtblJlc2l6ZUVuZENhbGxiYWNrPXt0aGlzLm9uQ29sdW1uUmVzaXplRW5kQ2FsbGJhY2t9XG4gICAgICAgICAgaXNDb2x1bW5SZXNpemluZz17ZmFsc2V9XG4gICAgICAgICAgb25Sb3dDbGljaz17dGhpcy5oYW5kbGVSb3dDbGlja31cbiAgICAgICAgICBzY3JvbGxUb0NvbHVtbj17dGhpcy5wcm9wcy5zY3JvbGxUb0NvbHVtbiB8fCB0aGlzLnN0YXRlLmN1cnJlbnRDb2x1bW59XG4gICAgICAgICAgc2Nyb2xsVG9wPXt0aGlzLnByb3BzLnNjcm9sbFRvcH1cbiAgICAgICAgICBzY3JvbGxUb1Jvdz17dGhpcy5nZXRTY3JvbGxUb1JvdygpfVxuICAgICAgICAgIG9uUm93RG91YmxlQ2xpY2s9e3RoaXMucHJvcHMub25Sb3dEb3VibGVDbGlja31cbiAgICAgICAgICBvblJvd01vdXNlRG93bj17dGhpcy5wcm9wcy5vbk1vdXNlRG93bn1cbiAgICAgICAgICBvblJvd01vdXNlRW50ZXI9e3RoaXMucHJvcHMub25Sb3dNb3VzZUVudGVyfVxuICAgICAgICAgIG9uUm93TW91c2VMZWF2ZT17dGhpcy5wcm9wcy5vblJvd01vdXNlTGVhdmV9XG4gICAgICAgICAgb25TY3JvbGxTdGFydD17dGhpcy5wcm9wcy5vblNjcm9sbFN0YXJ0fVxuICAgICAgICAgIG9uU2Nyb2xsRW5kPXt0aGlzLnByb3BzLm9uU2Nyb2xsRW5kfVxuICAgICAgICAgIHJvd0NsYXNzTmFtZUdldHRlcj17dGhpcy5nZXRSb3dDbGFzc05hbWV9XG4gICAgICAgICAgcm93SGVpZ2h0R2V0dGVyPXt0aGlzLnByb3BzLnJvd0hlaWdodEdldHRlciAmJiB0aGlzLmhhbmRsZVJvd0hlaWdodEdldHRlcn1cbiAgICAgICAgICBvbkNvbnRlbnRIZWlnaHRDaGFuZ2U9e3RoaXMucHJvcHMub25Db250ZW50SGVpZ2h0Q2hhbmdlfVxuICAgICAgICAgIG9uUm93Q29udGV4dE1lbnU9e3RoaXMuaGFuZGxlQ29udGV4dE1lbnV9XG4gICAgICAgID5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJDb2x1bW5zKCl9XG4gICAgICAgIDwvUmVzcG9uc2l2ZUZpeGVkRGF0YVRhYmxlPlxuICAgICAgICB7dGhpcy5wcm9wcy5pc0NvbHVtblNldHRpbmdzTW9kYWxPcGVuICYmIChcbiAgICAgICAgICA8Q29sdW1uU2V0dGluZ3NNb2RhbFxuICAgICAgICAgICAgZ3JpZD17dGhpcy5wcm9wcy5ncmlkfVxuICAgICAgICAgICAgY29sdW1ucz17dGhpcy5wcm9wcy5jb2x1bW5zfVxuICAgICAgICAgICAgdmlzaWJsZUNvbHVtbnM9e3RoaXMucHJvcHMudmlzaWJsZUNvbHVtbnN9XG4gICAgICAgICAgICBjbG9zZUNvbHVtblNldHRpbmdzTW9kYWw9e3RoaXMucHJvcHMuY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsfVxuICAgICAgICAgICAgc2F2ZUNvbHVtblNldHRpbmdzPXt0aGlzLnByb3BzLnNhdmVDb2x1bW5TZXR0aW5nc31cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRGF0YUdyaWQ7XG4iXX0=