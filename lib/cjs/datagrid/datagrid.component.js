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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

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
            }, extraColumn.valueRender(data.get(rowIndex), tabIndex));
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
    }, this.props.isBusy && _react["default"].createElement(_reactSpinner["default"], null), this.state.contextMenuOpen && this.renderContextMenu(), actionBar, _react["default"].createElement(_responsiveFixedDataTable["default"], {
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
    }, this.renderColumns()), this.props.isColumnSettingsModalOpen && _react["default"].createElement(_columnSettings["default"], {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwib3duUHJvcHMiLCJHUklEIiwiZ3JpZCIsImlzQnVzeSIsImRhdGFncmlkIiwiZ2V0SW4iLCJpZCIsImlzRWRpdGluZyIsImlzQ3JlYXRpbmciLCJpc0ZpbHRlcmluZyIsImlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW4iLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwidmlzaWJsZUNvbHVtbnMiLCJjb2x1bW5XaWR0aHMiLCJzZWxlY3RlZENlbGwiLCJzZWxlY3RlZEl0ZW1zIiwiZGF0YSIsImVkaXREYXRhIiwiY3JlYXRlRGF0YSIsImZpbHRlckRhdGEiLCJjZWxsTWVzc2FnZXMiLCJjcmVhdGVDZWxsTWVzc2FnZXMiLCJhbGxEYXRhU2l6ZSIsInNpemUiLCJsYW5ndWFnZSIsIlV0aWxzIiwiZ2V0TGFuZ3VhZ2UiLCJ1c2VyIiwicmVnaW9uIiwiZ2V0UmVnaW9uIiwiZGF0ZUZvcm1hdCIsImdldERhdGVGb3JtYXQiLCJ0aG91c2FuZFNlcGFyYXRvciIsImdldFRob3VzYW5kU2VwYXJhdG9yIiwiZGVjaW1hbFNlcGFyYXRvciIsImdldERlY2ltYWxTZXBhcmF0b3IiLCJmb3JjZVJlZnJlc2hUaW1lc3RhbXAiLCJnZXQiLCJmb2N1c1R5cGUiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJkYXRhZ3JpZEFjdGlvbnMiLCJEYXRhR3JpZCIsInBhZ2luYXRpb24iLCJpbmplY3RJbnRsIiwicHJvcHMiLCJjb250ZXh0TWVudUl0ZW1zIiwic2V0U3RhdGUiLCJjb250ZXh0TWVudU9wZW4iLCJkb2N1bWVudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJvbkRvY3VtZW50Q2xpY2siLCJuZXdDb2x1bW5XaWR0aCIsImNvbHVtbktleSIsInJlc2l6ZUNvbHVtbiIsInJvd0luZGV4IiwiY29sIiwiZSIsImNyZWF0ZSIsImVuYWJsZUFycm93TmF2aWdhdGlvbiIsImNlbGxSZWZzIiwiY3JlYXRlQ2VsbFJlZnMiLCJhcnJvd0tleXMiLCJLRVlfQ09ERVMiLCJET1dOIiwiVVAiLCJMRUZUIiwiUklHSFQiLCJjb2x1bW5zIiwib25MYXN0Q2VsbFRhYlByZXNzIiwiZ3JpZENvbHVtbnMiLCJnZXRDb2x1bW5LZXlCeUluZGV4IiwiaSIsImdldENvbHVtbktleSIsInJvd3NTaXplIiwiY3VycmVudENlbGwiLCJwcm94eSIsImlzQ3Vyc29yQXRTdGFydCIsInR5cGUiLCJzZWxlY3Rpb25TdGFydCIsImlzQ3Vyc29yQXRFbmQiLCJzZWxlY3Rpb25FbmQiLCJ2YWx1ZSIsImxlbmd0aCIsInNlbGVjdFJlZiIsInNlbGVjdCIsImdldFNlbGVjdFJlZiIsImluY2x1ZGVzIiwia2V5Q29kZSIsInByZXZlbnREZWZhdWx0IiwiRU5URVIiLCJFU0MiLCJhZGROZXdJdGVtIiwiZ2V0Q29sdW1uRGVmYXVsdFZhbHVlcyIsImZvY3VzVG9DcmVhdGVDZWxsIiwibmV4dEVsZW1lbnQiLCJtZW51SXNPcGVuIiwibW92ZUNlbGxGb2N1cyIsIlRBQiIsImNvbHVtbkluZCIsImZpbmRJbmRleCIsImMiLCJ2YWx1ZUtleVBhdGgiLCJqb2luIiwiZGlzYWJsZWQiLCJyb3dJbmQiLCJzaGlmdEtleSIsIm9uQ2VsbEtleURvd24iLCJ2YWx1ZVBhcnNlciIsImV2ZW50T3JEYXRhIiwicmF3VmFsdWUiLCJ0YXJnZXQiLCJ1bmRlZmluZWQiLCJmaWx0ZXJDZWxsVmFsdWVDaGFuZ2UiLCJzZWxlY3RlZEZpbHRlcnMiLCJjcmVhdGVDZWxsVmFsdWVDaGFuZ2UiLCJvbkNyZWF0ZVZhbHVlQ2hhbmdlIiwib25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUiLCJtYXRjaFZhbHVlIiwib25DcmVhdGVDZWxsVmFsdWVDaGFuZ2UiLCJuZXdWYWx1ZUtleVBhdGgiLCJ2IiwibmV3VmFsdWUiLCJ2YWxpZGF0b3JzIiwiY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUiLCJkYXRhSWQiLCJnZXREYXRhSWRCeVJvd0luZGV4IiwiZWRpdENlbGxWYWx1ZUNoYW5nZSIsIm9uRWRpdFZhbHVlQ2hhbmdlIiwib25FZGl0Q2VsbFZhbHVlQ2hhbmdlIiwiZWRpdENlbGxWYWx1ZVZhbGlkYXRlIiwib25DcmVhdGVCbHVyIiwiZ2V0RWRpdEl0ZW1WYWx1ZSIsIm9uRWRpdEJsdXIiLCJjZWxsVHlwZSIsImlucHV0VHlwZSIsImNlbGxTZWxlY3Rpb25DaGFuZ2UiLCJjZWxsU2VsZWN0IiwiY29tcG9uZW50IiwiaW5wdXRSZWYiLCJpZEtleVBhdGgiLCJpbmRleCIsIm9wdGlvbnMiLCJlZGl0VmFsdWUiLCJvcmlnaW5hbFZhbHVlIiwiY29tcG9uZW50VHlwZSIsInNlbGVjdE9wdGlvbnMiLCJmaW5kIiwib2JqIiwiU3RyaW5nIiwicmVwbGFjZSIsInZhbCIsInRvSlMiLCJtb2RlIiwiY29tcG9uZW50RGlzYWJsZWQiLCJkaXNhYmxlRWRpdGluZyIsImRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoIiwiZ2V0Q3JlYXRlSXRlbVZhbHVlIiwibWF0Y2hWYWx1ZUtleVBhdGgiLCJyb3dDbGFzc05hbWVzIiwiZXh0cmFSb3dDb3VudCIsInB1c2giLCJpbmRleE9mIiwicm93Q2xhc3NOYW1lR2V0dGVyIiwicmV0dXJuRGF0YSIsImluZm9NZXNzYWdlIiwiZXJyb3JNZXNzYWdlIiwid2FybmluZ01lc3NhZ2UiLCJzY3JvbGxUb1JvdyIsInNjcm9sbE5ld1JvdyIsInNjcm9sbEluRWRpdE1vZGUiLCJjdXJyZW50Um93IiwiZ2V0U2VsZWN0ZWRJdGVtSW5kZXgiLCJmaXJzdCIsImZvY3VzVG8iLCJwcmV2Rm9jdXNUbyIsImZvY3VzVG9MYXN0Um93IiwicmVmIiwiZm9jdXMiLCJnZXRDb21wb25lbnREaXNhYmxlZFN0YXRlIiwiZm9jdXNUb0VkaXRDZWxsIiwic2VsZWN0ZWRSb3dJbmRleCIsImNvbHVtbkluZGV4IiwiZWxlbWVudFR5cGVzIiwiY3VycmVudENvbHVtbiIsInNldFRpbWVvdXQiLCJzZWxlY3RBbGxJdGVtc0NoYW5nZSIsIml0ZW1TZWxlY3Rpb25DaGFuZ2UiLCJpbmxpbmVFZGl0IiwiZmlsdGVyaW5nIiwiaW50bCIsInNlbGVjdENvbXBvbmVudE9wdGlvbnMiLCJleHRyYUNvbHVtbiIsInJvd1NlbGVjdENoZWNrYm94Q29sdW1uIiwic2hvd1NlbGVjdEFsbENoZWNrYm94IiwidGFiSW5kZXgiLCJ3aWR0aCIsImlzUmVzaXphYmxlIiwiaXNTb3J0YWJsZSIsImNlbGwiLCJ2YWx1ZVJlbmRlciIsImNlbGxFZGl0IiwiY2VsbENyZWF0ZSIsImNlbGxGaWx0ZXIiLCJoZWFkZXIiLCJoYW5kbGVTZWxlY3RBbGxDaGVja0JveE9uQ2hhbmdlIiwicm93SXRlbSIsIml0ZW1JZCIsInNlbGVjdGVkIiwiaGFuZGxlU2VsZWN0aW9uQ2hlY2tCb3hPbkNoYW5nZSIsImZvckVhY2giLCJ2aXNpYmxlQ29sdW1uS2V5Iiwib3JnQ29sIiwidmFsdWVFbXB0eUNoZWNrZXIiLCJnZXRWYWx1ZUVtcHR5Q2hlY2tlciIsImZvcm1hdCIsImlzUmVxdWlyZWQiLCJjb2x1bW4iLCJHcmlkQ29sdW1uU2VydmljZSIsImJhc2VDb2x1bW4iLCJjb2x1bW5GdW5jdGlvbnMiLCJlZGl0IiwiZ2V0SXRlbVZhbHVlIiwib25DZWxsVmFsdWVDaGFuZ2UiLCJvbkNlbGxCbHVyIiwib25FZGl0Q2VsbEJsdXIiLCJvbkNlbGxGb2N1cyIsIm9uRWRpdENlbGxLZXlEb3duIiwiaGFuZGxlQ2VsbFJlZiIsImhhbmRsZUVkaXRDZWxsUmVmIiwib25DcmVhdGVDZWxsQmx1ciIsIm9uQ3JlYXRlQ2VsbEtleURvd24iLCJoYW5kbGVDcmVhdGVDZWxsUmVmIiwiZmlsdGVyIiwiZ2V0RmlsdGVySXRlbVZhbHVlIiwiZ2V0SXRlbU11bHRpVmFsdWUiLCJnZXRGaWx0ZXJJdGVtTXVsdGlWYWx1ZSIsIm9uRmlsdGVyQ2VsbFZhbHVlQ2hhbmdlIiwib25DZWxsTXVsdGlWYWx1ZUJsdXIiLCJvbkZpbHRlckNlbGxNdWx0aVZhbHVlQmx1ciIsIm9uQ2VsbE11bHRpVmFsdWVDaGFuZ2UiLCJvbkZpbHRlckNlbGxNdWx0aVZhbHVlQ2hhbmdlIiwiY2VsbFByb3BzIiwiY29sdW1uQ2VsbCIsImNvbXBvbmVudFR5cGVQcm9wcyIsImNvbHVtbkNvbXBvbmVudFR5cGUiLCJwYWRkaW5nIiwicmVtb3ZlTmV3SXRlbSIsImZvY3VzVG9FcnJvckNlbGwiLCJyb3dTZWxlY3QiLCJjdHJsS2V5IiwiZ2V0U2VsZWN0aW9uIiwicmVtb3ZlQWxsUmFuZ2VzIiwicGFyZW50Tm9kZSIsInBhcmVudDFjbGFzcyIsImNsYXNzTmFtZSIsInBhcmVudDJjbGFzcyIsInBhcmVudDNjbGFzcyIsInBhcmVudDRjbGFzcyIsIm11bHRpU2VsZWN0Iiwib25Sb3dDbGljayIsInN0b3BQcm9wYWdhdGlvbiIsImNvbnRleHRNZW51WCIsImNsaWVudFgiLCJjb250ZXh0TWVudVkiLCJjbGllbnRZIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uQ2xpY2siLCJzZWxlY3RlZERhdGEiLCJyb3dIZWlnaHRHZXR0ZXIiLCJleGlzdGluZ1Jvd3NJbmRleCIsImlzU3BlY2lhbCIsImdldFJvd0luZGV4IiwibWVzc2FnZURhdGEiLCJnZXRDZWxsTWVzc2FnZXMiLCJpc0VkaXRlZCIsImlzQ2VsbEVkaXRlZCIsInN0eWxlIiwiaGFuZGxlQ2VsbFNlbGVjdCIsInRleHRBbGlnbiIsImdlbmVyYXRlQ29sdW1ucyIsImxlbmdodCIsIm1hcCIsInNvcnRDaGFuZ2UiLCJyZW5kZXJDZWxsIiwibWluV2lkdGgiLCJtYXhXaWR0aCIsImZsZXhHcm93IiwiZml4ZWQiLCJmaXhlZFJpZ2h0IiwiYWxsb3dDZWxsc1JlY3ljbGluZyIsImRpc3BsYXkiLCJ6SW5kZXgiLCJwb3NpdGlvbiIsInRvcCIsImxlZnQiLCJkIiwiaXRlbSIsImRpdmlkZXIiLCJ0aXRsZSIsImhhbmRsZUNvbnRleHRNZW51SXRlbUNsaWNrIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJpbnZhbGlkYXRlIiwicmVuZGVyIiwiZ3JpZENsYXNzTmFtZSIsImRpc2FibGVBY3Rpb25CYXIiLCJzZXRGb2N1c1RvIiwiYWN0aW9uQmFyIiwiYWN0aW9uQmFyUmlnaHQiLCJhY3Rpb25CYXJMZWZ0IiwicmVtb3ZpbmciLCJkaXNhYmxlRHJvcGRvd24iLCJkaXNhYmxlRmlsdGVyaW5nQ29udHJvbHMiLCJoYW5kbGVBZnRlckFkZEl0ZW0iLCJoYW5kbGVBZnRlckVkaXRQcmVzcyIsImhhbmRsZUFmdGVyVmFsaWRhdGlvbkVycm9yIiwiZHJvcGRvd25NZW51SXRlbXMiLCJjb2x1bW5TZXR0aW5ncyIsImdyaWRIZWFkZXIiLCJyb3dzQ291bnQiLCJjb250YWluZXJTdHlsZSIsInJlbmRlckNvbnRleHRNZW51IiwiaGVhZGVySGVpZ2h0IiwiZmlsdGVyUm93SGVpZ2h0Iiwicm93SGVpZ2h0Iiwib25Db2x1bW5SZXNpemVFbmRDYWxsYmFjayIsImhhbmRsZVJvd0NsaWNrIiwic2Nyb2xsVG9Db2x1bW4iLCJzY3JvbGxUb3AiLCJnZXRTY3JvbGxUb1JvdyIsIm9uUm93RG91YmxlQ2xpY2siLCJvbk1vdXNlRG93biIsIm9uUm93TW91c2VFbnRlciIsIm9uUm93TW91c2VMZWF2ZSIsIm9uU2Nyb2xsU3RhcnQiLCJvblNjcm9sbEVuZCIsImdldFJvd0NsYXNzTmFtZSIsImhhbmRsZVJvd0hlaWdodEdldHRlciIsIm9uQ29udGVudEhlaWdodENoYW5nZSIsImhhbmRsZUNvbnRleHRNZW51IiwicmVuZGVyQ29sdW1ucyIsImNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbCIsInNhdmVDb2x1bW5TZXR0aW5ncyIsImNoaWxkcmVuIiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7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RSxNQUFBLElBQUksRUFBRSxLQUFLbUMsS0FBTCxDQUFXM0MsSUFEbkI7QUFFRSxNQUFBLE9BQU8sRUFBRSxLQUFLMkMsS0FBTCxDQUFXdUIsT0FGdEI7QUFHRSxNQUFBLGNBQWMsRUFBRSxLQUFLdkIsS0FBTCxDQUFXaEMsY0FIN0I7QUFJRSxNQUFBLHdCQUF3QixFQUFFLEtBQUtnQyxLQUFMLENBQVd3Uyx3QkFKdkM7QUFLRSxNQUFBLGtCQUFrQixFQUFFLEtBQUt4UyxLQUFMLENBQVd5UztBQUxqQyxNQXJDSixFQTZDRyxLQUFLelMsS0FBTCxDQUFXMFMsUUE3Q2QsQ0FERjtBQWlERCxHOzs7RUF0dkNvQkMsa0JBQU1DLGEsNENBR0xDLHVCO2VBc3ZDVGhULFEiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1sb25lbHktaWYsIHByZWZlci10ZW1wbGF0ZSwgcmVhY3QvcmVxdWlyZS1kZWZhdWx0LXByb3BzICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTWFwLCBMaXN0IH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBpbmplY3RJbnRsLCBGb3JtYXR0ZWRNZXNzYWdlIGFzIE0gfSBmcm9tICdyZWFjdC1pbnRsJztcbmltcG9ydCB7IENvbHVtbiwgQ2VsbCB9IGZyb20gJ2ZpeGVkLWRhdGEtdGFibGUtMic7XG5pbXBvcnQgeyBNZW51SXRlbSB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IEljb24gfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1pY29ucyc7XG5pbXBvcnQgU3Bpbm5lciBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1zcGlubmVyJztcbmltcG9ydCBDaGVja2JveCBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1jaGVja2JveCc7XG5pbXBvcnQgJ2ZpeGVkLWRhdGEtdGFibGUtMi9kaXN0L2ZpeGVkLWRhdGEtdGFibGUuY3NzJztcblxuaW1wb3J0IFJlc3BvbnNpdmVGaXhlZERhdGFUYWJsZSBmcm9tICcuL3Jlc3BvbnNpdmUtZml4ZWQtZGF0YS10YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IEhlYWRlckNlbGwgZnJvbSAnLi9oZWFkZXItY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IEFjdGlvbkJhciBmcm9tICcuL2FjdGlvbi1iYXIuY29tcG9uZW50JztcbmltcG9ydCBJbmxpbmVFZGl0Q29udHJvbHMgZnJvbSAnLi9pbmxpbmUtZWRpdC1jb250cm9scy5jb21wb25lbnQnO1xuaW1wb3J0IEZpbHRlcmluZ0NvbnRyb2xzIGZyb20gJy4vZmlsdGVyaW5nLWNvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgRHJvcGRvd25Db250cm9scyBmcm9tICcuL2Ryb3Bkb3duLWNvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgKiBhcyBkYXRhZ3JpZEFjdGlvbnMgZnJvbSAnLi9kYXRhZ3JpZC5hY3Rpb25zJztcbmltcG9ydCBDZWxsVG9vbHRpcCBmcm9tICcuL2NlbGwtdG9vbHRpcC5jb21wb25lbnQnO1xuaW1wb3J0IENvbHVtblNldHRpbmdzTW9kYWwgZnJvbSAnLi9jb2x1bW4tc2V0dGluZ3MvY29sdW1uLXNldHRpbmdzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBwcm9wVHlwZXMsIGRlZmF1bHRQcm9wcyB9IGZyb20gJy4vZGF0YWdyaWQucHJvcHMnO1xuaW1wb3J0IHsgS0VZX0NPREVTIH0gZnJvbSAnLi9kYXRhZ3JpZC5jb25zdGFudHMnO1xuaW1wb3J0IHBhZ2luYXRpb24gZnJvbSAnLi9wYWdpbmF0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9kYXRhZ3JpZC51dGlscyc7XG5pbXBvcnQgR3JpZENvbHVtblNlcnZpY2UgZnJvbSAnLi9jb2x1bW4tc2VydmljZS9jb2x1bW4tc2VydmljZSc7XG5pbXBvcnQgJy4vZGF0YWdyaWQuY29tcG9uZW50LnNjc3MnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUsIG93blByb3BzKSA9PiB7XG4gIGNvbnN0IEdSSUQgPSBvd25Qcm9wcy5ncmlkO1xuICByZXR1cm4ge1xuICAgIGlzQnVzeTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2lzQnVzeSddLCB0cnVlKSxcbiAgICBpc0VkaXRpbmc6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdpc0VkaXRpbmcnXSwgZmFsc2UpLFxuICAgIGlzQ3JlYXRpbmc6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdpc0NyZWF0aW5nJ10sIGZhbHNlKSxcbiAgICBpc0ZpbHRlcmluZzogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdpc0ZpbHRlcmluZyddLCBmYWxzZSksXG4gICAgaXNDb2x1bW5TZXR0aW5nc01vZGFsT3Blbjogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oXG4gICAgICBbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnY29sdW1uU2V0dGluZ3NNb2RhbCcsICdvcGVuJ10sXG4gICAgICBmYWxzZSxcbiAgICApLFxuICAgIHNvcnRDb2x1bW46IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ3NvcnRpbmdEYXRhJywgJ3NvcnRDb2x1bW4nXSwgbnVsbCksXG4gICAgc29ydE9yZGVyOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdzb3J0aW5nRGF0YScsICdzb3J0T3JkZXInXSwgbnVsbCksXG4gICAgdmlzaWJsZUNvbHVtbnM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ3Zpc2libGVDb2x1bW5zJ10sIExpc3QoKSksXG4gICAgY29sdW1uV2lkdGhzOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdjb2x1bW5XaWR0aHMnXSwgTWFwKCkpLFxuICAgIHNlbGVjdGVkQ2VsbDogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZWxlY3RlZENlbGwnXSwgTWFwKCkpLFxuICAgIHNlbGVjdGVkSXRlbXM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2VsZWN0ZWRJdGVtcyddLCBMaXN0KCkpLFxuICAgIGRhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnZGF0YSddLCBMaXN0KCkpLFxuICAgIGVkaXREYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2VkaXREYXRhJ10sIE1hcCgpKSxcbiAgICBjcmVhdGVEYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NyZWF0ZURhdGEnXSwgTGlzdCgpKSxcbiAgICBmaWx0ZXJEYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2ZpbHRlckRhdGEnXSwgTWFwKCkpLFxuICAgIGNlbGxNZXNzYWdlczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjZWxsTWVzc2FnZXMnXSwgTWFwKCkpLFxuICAgIGNyZWF0ZUNlbGxNZXNzYWdlczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjcmVhdGVDZWxsTWVzc2FnZXMnXSwgTWFwKCkpLFxuICAgIGFsbERhdGFTaXplOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2FsbERhdGEnXSwgTGlzdCgpKS5zaXplLFxuICAgIGxhbmd1YWdlOiBVdGlscy5nZXRMYW5ndWFnZShHUklELCBzdGF0ZS51c2VyKSxcbiAgICByZWdpb246IFV0aWxzLmdldFJlZ2lvbihHUklELCBzdGF0ZS51c2VyKSxcbiAgICBkYXRlRm9ybWF0OiBVdGlscy5nZXREYXRlRm9ybWF0KEdSSUQsIHN0YXRlLnVzZXIpLFxuICAgIHRob3VzYW5kU2VwYXJhdG9yOiBVdGlscy5nZXRUaG91c2FuZFNlcGFyYXRvcihHUklELCBzdGF0ZS51c2VyKSxcbiAgICBkZWNpbWFsU2VwYXJhdG9yOiBVdGlscy5nZXREZWNpbWFsU2VwYXJhdG9yKEdSSUQsIHN0YXRlLnVzZXIpLFxuICAgIGZvcmNlUmVmcmVzaFRpbWVzdGFtcDogc3RhdGUuZGF0YWdyaWQuZ2V0KCdmb3JjZVJlZnJlc2gnLCAwKSwgLy8gZm9yY2UgcmUtcmVuZGVyIHdoZW4gY2hhbmdlZFxuICAgIGZvY3VzVHlwZTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2ZvY3VzVHlwZSddLCBNYXAoKSksXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkYXRhZ3JpZEFjdGlvbnM7XG5cbkBwYWdpbmF0aW9uXG5AaW5qZWN0SW50bFxuQGNvbm5lY3QoXG4gIG1hcFN0YXRlVG9Qcm9wcyxcbiAgbWFwRGlzcGF0Y2hUb1Byb3BzLFxuKVxuY2xhc3MgRGF0YUdyaWQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHByb3BUeXBlcztcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjdXJyZW50Um93OiAwLFxuICAgICAgY3VycmVudENvbHVtbjogMCxcbiAgICAgIGNvbnRleHRNZW51T3BlbjogZmFsc2UsXG4gICAgICBjb250ZXh0TWVudVg6IG51bGwsXG4gICAgICBjb250ZXh0TWVudVk6IG51bGwsXG4gICAgfTtcbiAgICB0aGlzLmNlbGxSZWZzID0ge307XG4gICAgdGhpcy5jcmVhdGVDZWxsUmVmcyA9IHt9O1xuICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgPSBmYWxzZTtcbiAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IGZhbHNlOyAvLyBUT0RPOiBIYW5kbGUgZm9jdXNpbmcgd2hlbiB0cnVlXG4gICAgdGhpcy5mb2N1c1RvRXJyb3JDZWxsID0gZmFsc2U7IC8vIFRPRE86IEhhbmRsZSBmb2N1c2luZyB3aGVuIHRydWVcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkRvY3VtZW50Q2xpY2spO1xuICAgIHRoaXMucHJvcHMuaW52YWxpZGF0ZSh0aGlzLnByb3BzLmdyaWQpO1xuICB9XG5cbiAgb25Eb2N1bWVudENsaWNrID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmNvbnRleHRNZW51SXRlbXMpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjb250ZXh0TWVudU9wZW46IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkRvY3VtZW50Q2xpY2spO1xuICB9O1xuXG4gIG9uQ29sdW1uUmVzaXplRW5kQ2FsbGJhY2sgPSAobmV3Q29sdW1uV2lkdGgsIGNvbHVtbktleSkgPT4ge1xuICAgIHRoaXMucHJvcHMucmVzaXplQ29sdW1uKHRoaXMucHJvcHMuZ3JpZCwgY29sdW1uS2V5LCBuZXdDb2x1bW5XaWR0aCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEBwYXJhbSByb3dJbmRleCAoaW50KVxuICAgKiBAcGFyYW0gY29sIChvYmopLiBDb2x1bW4gb2JqZWN0LlxuICAgKiBAcGFyYW0gZS4gT3JpZ2luYWwgS2V5RG93biBldmVudFxuICAgKiBAcGFyYW0gY3JlYXRlIChib29sKS4gSXMgdGhlIGNlbGwgY3JlYXRlIGNlbGwgb3IgZWRpdCBjZWxsP1xuICAgKi9cbiAgb25DZWxsS2V5RG93biA9IChyb3dJbmRleCwgY29sLCBlLCBjcmVhdGUgPSBmYWxzZSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZUFycm93TmF2aWdhdGlvbikge1xuICAgICAgY29uc3QgY2VsbFJlZnMgPSBjcmVhdGUgPyB0aGlzLmNyZWF0ZUNlbGxSZWZzIDogdGhpcy5jZWxsUmVmcztcbiAgICAgIGNvbnN0IGFycm93S2V5cyA9IFtLRVlfQ09ERVMuRE9XTiwgS0VZX0NPREVTLlVQLCBLRVlfQ09ERVMuTEVGVCwgS0VZX0NPREVTLlJJR0hUXTtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgY29sdW1ucywgdmlzaWJsZUNvbHVtbnMsIGdyaWQsIGRhdGEsIG9uTGFzdENlbGxUYWJQcmVzcyxcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3QgZ3JpZENvbHVtbnMgPSBVdGlscy52aXNpYmxlQ29sdW1ucyhjb2x1bW5zLCB2aXNpYmxlQ29sdW1ucyk7XG4gICAgICBjb25zdCBnZXRDb2x1bW5LZXlCeUluZGV4ID0gaSA9PiBVdGlscy5nZXRDb2x1bW5LZXkoZ3JpZENvbHVtbnNbaV0pO1xuICAgICAgY29uc3Qgcm93c1NpemUgPSBkYXRhLnNpemU7XG4gICAgICBjb25zdCBjb2x1bW5LZXkgPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sKTtcbiAgICAgIGxldCBjdXJyZW50Q2VsbCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4fWBdO1xuICAgICAgbGV0IHByb3h5ID0gbnVsbDtcblxuICAgICAgY29uc3QgaXNDdXJzb3JBdFN0YXJ0ID0gKCkgPT4ge1xuICAgICAgICBpZiAoY3VycmVudENlbGwudHlwZSAhPT0gJ3RleHQnKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRDZWxsLnNlbGVjdGlvblN0YXJ0ID09PSAwO1xuICAgICAgfTtcblxuICAgICAgY29uc3QgaXNDdXJzb3JBdEVuZCA9ICgpID0+IHtcbiAgICAgICAgaWYgKGN1cnJlbnRDZWxsLnR5cGUgIT09ICd0ZXh0JykgcmV0dXJuIHRydWU7XG4gICAgICAgIHJldHVybiBjdXJyZW50Q2VsbC5zZWxlY3Rpb25FbmQgPT09IGN1cnJlbnRDZWxsLnZhbHVlLmxlbmd0aDtcbiAgICAgIH07XG5cbiAgICAgIC8vIElmIGN1cnJlbnQgY2VsbCBob2xkcyBhIHJlYWN0LWZsb2F0aW5nLXNlbGVjdCBjb21wb25lbnRcbiAgICAgIGlmIChjdXJyZW50Q2VsbCAmJiAoY3VycmVudENlbGwuc2VsZWN0UmVmIHx8IHR5cGVvZiBjdXJyZW50Q2VsbC5zZWxlY3QgPT09ICdvYmplY3QnKSkge1xuICAgICAgICBwcm94eSA9IGN1cnJlbnRDZWxsO1xuICAgICAgICBjdXJyZW50Q2VsbCA9IHRoaXMuZ2V0U2VsZWN0UmVmKHByb3h5KTtcbiAgICAgIH1cblxuICAgICAgLy8gUHJldmVudHMgdXAvZG93biBhcnJvdyBmcm9tIGNoYW5naW5nIG51bWJlciBmaWVsZCB2YWx1ZVxuICAgICAgaWYgKGFycm93S2V5cy5pbmNsdWRlcyhlLmtleUNvZGUpICYmIGN1cnJlbnRDZWxsLnR5cGUgPT09ICdudW1iZXInKSBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuICAgICAgICBjYXNlIEtFWV9DT0RFUy5FTlRFUjpcbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuRVNDOiB7XG4gICAgICAgICAgaWYgKGNyZWF0ZSAmJiBlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5FTlRFUikge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5hZGROZXdJdGVtKGdyaWQsIFV0aWxzLmdldENvbHVtbkRlZmF1bHRWYWx1ZXMoY29sdW1ucykpO1xuICAgICAgICAgICAgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgY3VycmVudENlbGwuc2VsZWN0KCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuRE9XTjoge1xuICAgICAgICAgIGxldCBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4ICsgMX1gXTtcblxuICAgICAgICAgIC8vIFByZXZlbnRzIG1lbnUgZnJvbSBvcGVuaW5nXG4gICAgICAgICAgaWYgKHByb3h5ICYmIHByb3h5LnNlbGVjdFJlZiAmJiAhcHJveHkuc2VsZWN0UmVmLnN0YXRlLm1lbnVJc09wZW4pIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmICghbmV4dEVsZW1lbnQpIGJyZWFrO1xuICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSB0aGlzLmdldFNlbGVjdFJlZihuZXh0RWxlbWVudCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubW92ZUNlbGxGb2N1cyhuZXh0RWxlbWVudCwgcm93SW5kZXggKyAxLCAtMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuVVA6IHtcbiAgICAgICAgICBsZXQgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2NvbHVtbktleX1fJHtyb3dJbmRleCAtIDF9YF07XG5cbiAgICAgICAgICAvLyBQcmV2ZW50cyBtZW51IGZyb20gb3BlbmluZ1xuICAgICAgICAgIGlmIChwcm94eSAmJiBwcm94eS5zZWxlY3RSZWYgJiYgIXByb3h5LnNlbGVjdFJlZi5zdGF0ZS5tZW51SXNPcGVuKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAoIW5leHRFbGVtZW50KSBicmVhaztcbiAgICAgICAgICAgIG5leHRFbGVtZW50ID0gdGhpcy5nZXRTZWxlY3RSZWYobmV4dEVsZW1lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm1vdmVDZWxsRm9jdXMobmV4dEVsZW1lbnQsIHJvd0luZGV4IC0gMSwgLTEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLlRBQjpcbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuUklHSFQ6XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLkxFRlQ6IHtcbiAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuUklHSFQgJiYgIWlzQ3Vyc29yQXRFbmQoKSkgYnJlYWs7XG4gICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLkxFRlQgJiYgIWlzQ3Vyc29yQXRTdGFydCgpKSBicmVhaztcblxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgIGxldCBjb2x1bW5JbmQgPSBncmlkQ29sdW1ucy5maW5kSW5kZXgoYyA9PiBjLnZhbHVlS2V5UGF0aC5qb2luKCcvJykgPT09IGNvbHVtbktleSk7XG4gICAgICAgICAgaWYgKGNvbHVtbkluZCAhPT0gLTEpIHtcbiAgICAgICAgICAgIGxldCBkaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICBsZXQgbmV4dEVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgbGV0IHJvd0luZCA9IHJvd0luZGV4O1xuICAgICAgICAgICAgd2hpbGUgKGRpc2FibGVkKSB7XG4gICAgICAgICAgICAgIC8vIE1vdmluZyB0byB0aGUgbGVmdFxuICAgICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuTEVGVCB8fCAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuVEFCICYmIGUuc2hpZnRLZXkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbHVtbkluZCAtIDEgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kIC09IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyb3dJbmQgLSAxID49IDApIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCA9IGdyaWRDb2x1bW5zLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgICByb3dJbmQgLT0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE1vdmluZyB0byB0aGUgcmlnaHRcbiAgICAgICAgICAgICAgICBpZiAoY29sdW1uSW5kICsgMSA8IGdyaWRDb2x1bW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kICs9IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyb3dJbmQgKyAxIDwgcm93c1NpemUpIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCA9IDA7XG4gICAgICAgICAgICAgICAgICByb3dJbmQgKz0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJvd0luZCArIDEgPT09IHJvd3NTaXplKSB7XG4gICAgICAgICAgICAgICAgICAvLyBJZiB0cnlpbmcgdG8gc2VsZWN0IGEgcm93LCB3aGVuIHRoZXJlIGlzIG5vbmU6XG4gICAgICAgICAgICAgICAgICBpZiAob25MYXN0Q2VsbFRhYlByZXNzICYmIGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLlRBQikgb25MYXN0Q2VsbFRhYlByZXNzKGUpO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2dldENvbHVtbktleUJ5SW5kZXgoY29sdW1uSW5kKX1fJHtyb3dJbmR9YF07XG5cbiAgICAgICAgICAgICAgLy8gSWYgd2UgY2Fubm90IGZvY3VzIG9uIHRoZSBuZXh0IGVsZW1lbnQgd2hpbGUgbW92aW5nIHRvIHRoZSByaWdodFxuICAgICAgICAgICAgICBpZiAoIW5leHRFbGVtZW50ICYmIGUua2V5Q29kZSAhPT0gS0VZX0NPREVTLkxFRlQpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSdyZSBub3QgeWV0IGluIHRoZSBsYXN0IGZvY3VzYWJsZSBjb2x1bW5cbiAgICAgICAgICAgICAgICBpZiAoY29sdW1uSW5kIDw9IGdyaWRDb2x1bW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgd2hpbGUgKGNvbHVtbkluZCA8PSBncmlkQ29sdW1ucy5sZW5ndGggJiYgIW5leHRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHRFbGVtZW50ID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtnZXRDb2x1bW5LZXlCeUluZGV4KGNvbHVtbkluZCl9XyR7cm93SW5kfWBdO1xuICAgICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgKz0gMTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBJZiB3ZSBhcmUgaW4gdGhlIGxhc3QgY29sdW1uIGFuZCB3ZSBkb24ndCBoYXZlIGFuIGVsZW1lbnQgdG8gZm9jdXMgb24sXG4gICAgICAgICAgICAgICAgICAgIC8vIHdlIG11c3QgbW92ZSB0byB0aGUgbmV4dCByb3cgKGlmIHBvc3NpYmxlKVxuICAgICAgICAgICAgICAgICAgICBpZiAoIW5leHRFbGVtZW50ICYmIGNvbHVtbkluZCA9PT0gZ3JpZENvbHVtbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gSWYgdHJ5aW5nIHRvIHNlbGVjdCBhIHJvdywgd2hlbiB0aGVyZSBpcyBub25lOlxuICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3dJbmQgKyAxID09PSByb3dzU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9uTGFzdENlbGxUYWJQcmVzcyAmJiBlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5UQUIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25MYXN0Q2VsbFRhYlByZXNzKGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgY29sdW1uSW5kID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICByb3dJbmQgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgICBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Z2V0Q29sdW1uS2V5QnlJbmRleChjb2x1bW5JbmQpfV8ke3Jvd0luZH1gXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSBjYW5ub3QgZm9jdXMgb24gdGhlIG5leHQgZWxlbWVudCB3aGlsZSBtb3ZpbmcgdG8gdGhlIGxlZnRcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICghbmV4dEVsZW1lbnQgJiYgZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuTEVGVCkge1xuICAgICAgICAgICAgICAgIHdoaWxlIChjb2x1bW5JbmQgPiAwICYmICFuZXh0RWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kIC09IDE7XG4gICAgICAgICAgICAgICAgICBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Z2V0Q29sdW1uS2V5QnlJbmRleChjb2x1bW5JbmQpfV8ke3Jvd0luZH1gXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gaWYgbm8gZWxlbWVudCB3YXMgZm91bmQsIHRyeSBtb3ZpbmcgdG8gcHJldmlvdXMgcm93XG4gICAgICAgICAgICAgICAgLy8gKG5lZWRlZCBpbiBjYXNlIGZpcnN0IGNvbHVtbiBpcyBub3QgZWRpdGFibGUgZS5nLiBhbiBFeHRyYUNvbHVtbilcbiAgICAgICAgICAgICAgICBpZiAocm93SW5kID4gMCAmJiAhbmV4dEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCA9IGdyaWRDb2x1bW5zLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgICByb3dJbmQgLT0gMTtcbiAgICAgICAgICAgICAgICAgIG5leHRFbGVtZW50ID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtnZXRDb2x1bW5LZXlCeUluZGV4KGNvbHVtbkluZCl9XyR7cm93SW5kfWBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBkaXNhYmxlZCA9IG5leHRFbGVtZW50ID8gbmV4dEVsZW1lbnQuZGlzYWJsZWQgOiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZGlzYWJsZWQgJiYgbmV4dEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXh0RWxlbWVudC5zZWxlY3QgPT09ICdvYmplY3QnIHx8IG5leHRFbGVtZW50LnNlbGVjdFJlZikge1xuICAgICAgICAgICAgICAgIG5leHRFbGVtZW50ID0gdGhpcy5nZXRTZWxlY3RSZWYobmV4dEVsZW1lbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMubW92ZUNlbGxGb2N1cyhuZXh0RWxlbWVudCwgcm93SW5kLCBjb2x1bW5JbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBvbkVkaXRDZWxsS2V5RG93biA9IChyb3dJbmRleCwgY29sKSA9PiAoZSkgPT4ge1xuICAgIHRoaXMub25DZWxsS2V5RG93bihyb3dJbmRleCwgY29sLCBlKTtcbiAgfTtcblxuICBvbkNyZWF0ZUNlbGxLZXlEb3duID0gKHJvd0luZGV4LCBjb2wpID0+IChlKSA9PiB7XG4gICAgdGhpcy5vbkNlbGxLZXlEb3duKHJvd0luZGV4LCBjb2wsIGUsIHRydWUpO1xuICB9O1xuXG4gIG9uRmlsdGVyQ2VsbFZhbHVlQ2hhbmdlID0gKGNvbCwgdmFsdWVQYXJzZXIpID0+IChldmVudE9yRGF0YSkgPT4ge1xuICAgIGxldCByYXdWYWx1ZTtcbiAgICAvLyBldmVudE9yRGF0YSBjYW4gYmUgaW5wdXQgb25DaGFuZ2UgZXZlbnQsIHJlYWN0LXNlbGVjdCBvbkNoYW5nZSBvciByZWFjdC1kYXktcGlja2VyIG9uQ2hhbmdlXG4gICAgaWYgKGV2ZW50T3JEYXRhKSB7XG4gICAgICBpZiAoZXZlbnRPckRhdGEudGFyZ2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YS50YXJnZXQudmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50T3JEYXRhLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YS52YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGE7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlID0gdmFsdWVQYXJzZXIocmF3VmFsdWUpO1xuICAgIHRoaXMucHJvcHMuZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlKHRoaXMucHJvcHMuZ3JpZCwgdGhpcy5wcm9wcy5jb2x1bW5zLCBjb2wsIHZhbHVlKTtcbiAgfTtcblxuICBvbkZpbHRlckNlbGxNdWx0aVZhbHVlQmx1ciA9IGNvbCA9PiAoKSA9PiB7XG4gICAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCk7XG4gICAgY29uc3QgeyBjb2x1bW5zLCBmaWx0ZXJDZWxsVmFsdWVDaGFuZ2UsIGdyaWQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2VsZWN0ZWRGaWx0ZXJzID0gdGhpcy5zdGF0ZVtjb2x1bW5LZXldO1xuICAgIGlmIChzZWxlY3RlZEZpbHRlcnMpIHtcbiAgICAgIGZpbHRlckNlbGxWYWx1ZUNoYW5nZShncmlkLCBjb2x1bW5zLCBjb2wsIHNlbGVjdGVkRmlsdGVycyk7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgW2NvbHVtbktleV06IHVuZGVmaW5lZCB9KTtcbiAgICB9XG4gIH07XG5cbiAgb25GaWx0ZXJDZWxsTXVsdGlWYWx1ZUNoYW5nZSA9IChjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZGF0YSA9IFtdKSA9PiB7XG4gICAgLy8gZGF0YSBpcyBpbnB1dCBvZiByZWFjdC1zZWxlY3Qgb25DaGFuZ2VcbiAgICBjb25zdCBjb2x1bW5LZXkgPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sKTtcbiAgICBjb25zdCBzZWxlY3RlZEZpbHRlcnMgPSB0aGlzLnN0YXRlW2NvbHVtbktleV07XG4gICAgaWYgKCFzZWxlY3RlZEZpbHRlcnMgJiYgZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgIC8vIGVuZHMgdXAgaGVyZSBpbiBjYXNlIG9mIGNsZWFyIGJ1dHRvblxuICAgICAgY29uc3QgeyBjb2x1bW5zLCBmaWx0ZXJDZWxsVmFsdWVDaGFuZ2UsIGdyaWQgfSA9IHRoaXMucHJvcHM7XG4gICAgICBmaWx0ZXJDZWxsVmFsdWVDaGFuZ2UoZ3JpZCwgY29sdW1ucywgY29sLCBkYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdmFsdWUgPSB2YWx1ZVBhcnNlcihkYXRhKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBbY29sdW1uS2V5XTogdmFsdWUgfSk7XG4gICAgfVxuICB9O1xuXG4gIG9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlID0gKHJvd0luZGV4LCBjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZXZlbnRPckRhdGEpID0+IHtcbiAgICBsZXQgcmF3VmFsdWU7XG4gICAgLy8gZXZlbnRPckRhdGEgY2FuIGJlIGlucHV0IG9uQ2hhbmdlIGV2ZW50LCByZWFjdC1zZWxlY3Qgb25DaGFuZ2Ugb3IgcmVhY3QtZGF5LXBpY2tlciBvbkNoYW5nZVxuICAgIGlmIChldmVudE9yRGF0YSkge1xuICAgICAgaWYgKGV2ZW50T3JEYXRhLnRhcmdldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChldmVudE9yRGF0YS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCB2YWx1ZSA9IHZhbHVlUGFyc2VyKHJhd1ZhbHVlKTtcblxuICAgIHRoaXMucHJvcHMuY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlKHRoaXMucHJvcHMuZ3JpZCwgcm93SW5kZXgsIGNvbC52YWx1ZUtleVBhdGgsIHZhbHVlKTtcbiAgICBpZiAoY29sLm9uQ3JlYXRlVmFsdWVDaGFuZ2UpIHtcbiAgICAgIGNvbC5vbkNyZWF0ZVZhbHVlQ2hhbmdlKHZhbHVlLCBjb2wudmFsdWVLZXlQYXRoLCByb3dJbmRleCk7XG4gICAgfVxuICAgIGlmIChjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUgJiYgdmFsdWUgPT09IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5tYXRjaFZhbHVlKSB7XG4gICAgICAvLyBDYWxsIHNwZWNpYWwgcGFpcmVkIHZhbHVlIGNoYW5nZSBvbiBvdGhlciBjZWxsIGlmIHZhbHVlIG1hdGNoZXNcbiAgICAgIHRoaXMub25DcmVhdGVDZWxsVmFsdWVDaGFuZ2UoXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICB7IHZhbHVlS2V5UGF0aDogY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm5ld1ZhbHVlS2V5UGF0aCB9LFxuICAgICAgICB2ID0+IHYsXG4gICAgICApKGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5uZXdWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjb2wudmFsaWRhdG9ycykge1xuICAgICAgdGhpcy5wcm9wcy5jcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZShcbiAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgY29sLnZhbHVlS2V5UGF0aCxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIGNvbC52YWxpZGF0b3JzLFxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgb25FZGl0Q2VsbFZhbHVlQ2hhbmdlID0gKHJvd0luZGV4LCBjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZXZlbnRPckRhdGEpID0+IHtcbiAgICBjb25zdCBkYXRhSWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgIGxldCByYXdWYWx1ZTtcbiAgICAvLyBldmVudE9yRGF0YSBjYW4gYmUgaW5wdXQgb25DaGFuZ2UgZXZlbnQsIHJlYWN0LXNlbGVjdCBvbkNoYW5nZSBvciByZWFjdC1kYXktcGlja2VyIG9uQ2hhbmdlXG4gICAgaWYgKGV2ZW50T3JEYXRhKSB7XG4gICAgICBpZiAoZXZlbnRPckRhdGEudGFyZ2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YS50YXJnZXQudmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50T3JEYXRhLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YS52YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGE7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlID0gdmFsdWVQYXJzZXIocmF3VmFsdWUpO1xuICAgIHRoaXMucHJvcHMuZWRpdENlbGxWYWx1ZUNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIGRhdGFJZCwgY29sLnZhbHVlS2V5UGF0aCwgdmFsdWUpO1xuICAgIGlmIChjb2wub25FZGl0VmFsdWVDaGFuZ2UpIHtcbiAgICAgIGNvbC5vbkVkaXRWYWx1ZUNoYW5nZSh2YWx1ZSwgY29sLnZhbHVlS2V5UGF0aCwgcm93SW5kZXgsIGRhdGFJZCk7XG4gICAgfVxuICAgIGlmIChjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUgJiYgdmFsdWUgPT09IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5tYXRjaFZhbHVlKSB7XG4gICAgICAvLyBDYWxsIHNwZWNpYWwgcGFpcmVkIHZhbHVlIGNoYW5nZSBvbiBvdGhlciBjZWxsIGlmIHZhbHVlIG1hdGNoZXNcbiAgICAgIHRoaXMub25FZGl0Q2VsbFZhbHVlQ2hhbmdlKFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgeyB2YWx1ZUtleVBhdGg6IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5uZXdWYWx1ZUtleVBhdGggfSxcbiAgICAgICAgdiA9PiB2LFxuICAgICAgKShjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY29sLnZhbGlkYXRvcnMpIHtcbiAgICAgIHRoaXMucHJvcHMuZWRpdENlbGxWYWx1ZVZhbGlkYXRlKFxuICAgICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICAgIGRhdGFJZCxcbiAgICAgICAgY29sLnZhbHVlS2V5UGF0aCxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIGNvbC52YWxpZGF0b3JzLFxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgb25DcmVhdGVDZWxsQmx1ciA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGUpID0+IHtcbiAgICBpZiAoY29sLm9uQ3JlYXRlQmx1cikge1xuICAgICAgbGV0IHZhbHVlID0gZSAmJiBlLnRhcmdldCAmJiBlLnRhcmdldC52YWx1ZSAhPT0gdW5kZWZpbmVkXG4gICAgICAgID8gZS50YXJnZXQudmFsdWVcbiAgICAgICAgOiB0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCk7XG4gICAgICBpZiAodmFsdWVQYXJzZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlUGFyc2VyKHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGNvbC5vbkNyZWF0ZUJsdXIodmFsdWUsIHJvd0luZGV4KTtcbiAgICB9XG4gIH07XG5cbiAgb25FZGl0Q2VsbEJsdXIgPSAocm93SW5kZXgsIGNvbCwgdmFsdWVQYXJzZXIpID0+IChlKSA9PiB7XG4gICAgaWYgKGNvbC5vbkVkaXRCbHVyKSB7XG4gICAgICBsZXQgdmFsdWUgPSBlICYmIGUudGFyZ2V0ICYmIGUudGFyZ2V0LnZhbHVlICE9PSB1bmRlZmluZWRcbiAgICAgICAgPyBlLnRhcmdldC52YWx1ZVxuICAgICAgICA6IHRoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKTtcbiAgICAgIGlmICh2YWx1ZVBhcnNlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWVQYXJzZXIodmFsdWUpO1xuICAgICAgfVxuICAgICAgY29uc3QgZGF0YUlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICAgIGNvbC5vbkVkaXRCbHVyKHZhbHVlLCByb3dJbmRleCwgZGF0YUlkKTtcbiAgICB9XG4gIH07XG5cbiAgb25DZWxsRm9jdXMgPSAoY2VsbFR5cGUsIGlucHV0VHlwZSwgcm93SW5kZXgsIGNvbHVtbktleSkgPT4gKGUpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBjZWxsU2VsZWN0aW9uQ2hhbmdlLCBjZWxsU2VsZWN0LCBncmlkLCBpc0VkaXRpbmcsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKGlzRWRpdGluZykgcmV0dXJuO1xuXG4gICAgaWYgKGlucHV0VHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIGUudGFyZ2V0LnNlbGVjdCgpO1xuICAgIH1cbiAgICBpZiAoY2VsbFR5cGUgPT09ICdlZGl0JyAmJiBjZWxsU2VsZWN0KSB7XG4gICAgICBjZWxsU2VsZWN0aW9uQ2hhbmdlKFxuICAgICAgICBncmlkLFxuICAgICAgICBNYXAoe1xuICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgIGNvbHVtbktleSxcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICBnZXRTZWxlY3RSZWYgPSAoY29tcG9uZW50KSA9PiB7XG4gICAgaWYgKCFjb21wb25lbnQpIHJldHVybiBudWxsO1xuICAgIGlmIChjb21wb25lbnQuc2VsZWN0ICYmIGNvbXBvbmVudC5zZWxlY3QuaW5wdXRSZWYpIHtcbiAgICAgIHJldHVybiBjb21wb25lbnQuc2VsZWN0LmlucHV0UmVmO1xuICAgIH1cbiAgICBpZiAoY29tcG9uZW50LnNlbGVjdCAmJiBjb21wb25lbnQuc2VsZWN0LnNlbGVjdCkge1xuICAgICAgcmV0dXJuIGNvbXBvbmVudC5zZWxlY3Quc2VsZWN0LmlucHV0UmVmO1xuICAgIH1cbiAgICBpZiAoY29tcG9uZW50LnNlbGVjdFJlZiAmJiBjb21wb25lbnQuc2VsZWN0UmVmLnNlbGVjdC5zZWxlY3QpIHtcbiAgICAgIHJldHVybiBjb21wb25lbnQuc2VsZWN0UmVmLnNlbGVjdC5zZWxlY3QuaW5wdXRSZWY7XG4gICAgfVxuICAgIHJldHVybiBjb21wb25lbnQuc2VsZWN0UmVmLnNlbGVjdC5pbnB1dFJlZjtcbiAgfTtcblxuICBnZXREYXRhSWRCeVJvd0luZGV4ID0gcm93SW5kZXggPT4gdGhpcy5wcm9wcy5kYXRhLmdldEluKFtyb3dJbmRleCwgLi4udGhpcy5wcm9wcy5ncmlkLmlkS2V5UGF0aF0pO1xuXG4gIGdldFNlbGVjdGVkSXRlbUluZGV4ID0gKGlkKSA9PiB7XG4gICAgaWYgKCFpZCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMucHJvcHMuZGF0YS5maW5kSW5kZXgodiA9PiB2LmdldEluKHRoaXMucHJvcHMuZ3JpZC5pZEtleVBhdGgpID09PSBpZCk7XG4gICAgcmV0dXJuIGluZGV4ID09PSAtMSA/IHVuZGVmaW5lZCA6IGluZGV4O1xuICB9O1xuXG4gIGdldEVkaXRJdGVtVmFsdWUgPSAocm93SW5kZXgsIGNvbCwgb3B0aW9ucyA9IFtdKSA9PiB7XG4gICAgLy8gR2V0IHRoZSB2YWx1ZSB0byBkaXNwbGF5IGluIGVkaXQgY2VsbFxuICAgIGNvbnN0IGlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICBjb25zdCBlZGl0VmFsdWUgPSB0aGlzLnByb3BzLmVkaXREYXRhLmdldEluKFtpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0sIHVuZGVmaW5lZCk7XG4gICAgbGV0IG9yaWdpbmFsVmFsdWU7XG4gICAgaWYgKGVkaXRWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBvcmlnaW5hbFZhbHVlID0gdGhpcy5wcm9wcy5kYXRhLmdldEluKFtyb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0sICcnKTtcbiAgICB9IGVsc2UgaWYgKGVkaXRWYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBWYWx1ZSBpcyBmb3VuZCBmcm9tIGVkaXREYXRhXG4gICAgICAvLyBGb3JtYXQgYnkgdHlwZVxuICAgICAgc3dpdGNoIChjb2wuY29tcG9uZW50VHlwZSkge1xuICAgICAgICBjYXNlICdtdWx0aXNlbGVjdCc6XG4gICAgICAgIGNhc2UgJ3NlbGVjdCc6XG4gICAgICAgICAgcmV0dXJuIG9wdGlvbnMuc2VsZWN0T3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IGVkaXRWYWx1ZSk7XG4gICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICAgIHJldHVybiBvcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gZWRpdFZhbHVlKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gZWRpdFZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAob3JpZ2luYWxWYWx1ZSA9PT0gbnVsbCB8fCBvcmlnaW5hbFZhbHVlID09PSB1bmRlZmluZWQgfHwgb3JpZ2luYWxWYWx1ZSA9PT0gJycpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgLy8gUmV0dXJuIHZhbHVlIGZyb20gb3JpZ2luYWwgZGF0YSwgYmVjYXVzZSBlZGl0RGF0YSBpcyBub3QgYXZhaWxhYmxlXG4gICAgLy8gRm9ybWF0IGJ5IGNvbXBvbmVudCB0eXBlXG4gICAgc3dpdGNoIChjb2wuY29tcG9uZW50VHlwZSkge1xuICAgICAgY2FzZSAnZmxvYXQnOiB7XG4gICAgICAgIGlmIChTdHJpbmcob3JpZ2luYWxWYWx1ZSkubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHJldHVybiBTdHJpbmcob3JpZ2luYWxWYWx1ZSkucmVwbGFjZSgnLicsIHRoaXMucHJvcHMuZGVjaW1hbFNlcGFyYXRvcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9yaWdpbmFsVmFsdWU7XG4gICAgICB9XG4gICAgICBjYXNlICdtdWx0aXNlbGVjdCc6XG4gICAgICBjYXNlICdzZWxlY3QnOlxuICAgICAgICByZXR1cm4gb3B0aW9ucy5zZWxlY3RPcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gb3JpZ2luYWxWYWx1ZSk7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSBvcmlnaW5hbFZhbHVlKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBvcmlnaW5hbFZhbHVlO1xuICAgIH1cbiAgfTtcblxuICBnZXRDcmVhdGVJdGVtVmFsdWUgPSAocm93SW5kZXgsIGNvbCwgb3B0aW9ucyA9IFtdKSA9PiB7XG4gICAgY29uc3QgdmFsID0gdGhpcy5wcm9wcy5jcmVhdGVEYXRhLmdldEluKFtyb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0sICcnKTtcbiAgICBpZiAodmFsID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGlmIChjb2wuY29tcG9uZW50VHlwZSA9PT0gJ3NlbGVjdCcgfHwgY29sLmNvbXBvbmVudFR5cGUgPT09ICdtdWx0aXNlbGVjdCcpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLnNlbGVjdE9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSB2YWwpO1xuICAgIH1cbiAgICBpZiAoWydib29sZWFuJ10uaW5jbHVkZXMoY29sLmNvbXBvbmVudFR5cGUpKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IHZhbCk7XG4gICAgfVxuICAgIHJldHVybiB2YWw7XG4gIH07XG5cbiAgZ2V0RmlsdGVySXRlbVZhbHVlID0gKGNvbCwgb3B0aW9ucyA9IFtdKSA9PiB7XG4gICAgY29uc3QgdmFsID0gdGhpcy5wcm9wcy5maWx0ZXJEYXRhLmdldChVdGlscy5nZXRDb2x1bW5LZXkoY29sKSwgJycpO1xuICAgIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgaWYgKGNvbC5jb21wb25lbnRUeXBlID09PSAnc2VsZWN0Jykge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuc2VsZWN0T3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IHZhbCk7XG4gICAgfVxuICAgIGlmIChbJ2NoZWNrYm94JywgJ2Jvb2xlYW4nXS5pbmNsdWRlcyhjb2wuY29tcG9uZW50VHlwZSkpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gdmFsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsO1xuICB9O1xuXG4gIGdldEZpbHRlckl0ZW1NdWx0aVZhbHVlID0gKGNvbCkgPT4ge1xuICAgIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2wpO1xuICAgIGNvbnN0IHsgZmlsdGVyRGF0YSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBkYXRhID0gdGhpcy5zdGF0ZVtjb2x1bW5LZXldO1xuICAgIGNvbnN0IHZhbCA9IGRhdGEgfHwgZmlsdGVyRGF0YS5nZXQoY29sdW1uS2V5LCAnJyk7XG4gICAgLy8gc2Vzc2lvbiBzdG9yYWdlIGNvbnRlbnQgaXMgY29udmVydGVkIHRvIGltbXV0YWJsZSBhbmQgbXVsdGlzZWxlY3RcbiAgICAvLyBmaWx0ZXJzIGlzIHRoZW4gbGlzdCBvdGhlcndpc2UgYXJyYXlcbiAgICByZXR1cm4gdmFsICYmIHZhbC50b0pTID8gdmFsLnRvSlMoKSA6IHZhbCB8fCBbXTtcbiAgfTtcblxuICBnZXRDb21wb25lbnREaXNhYmxlZFN0YXRlID0gKHJvd0luZGV4LCBjb2wsIG1vZGUpID0+IHtcbiAgICBsZXQgY29tcG9uZW50RGlzYWJsZWQgPSAhIWNvbC5kaXNhYmxlRWRpdGluZztcbiAgICAvLyBjaGVjayBpZiBjb21wb25lbnQgaXMgZGlzYWJsZWQgYnkgb3RoZXIgY29sdW1uIGRhdGFcbiAgICBpZiAoIWNvbXBvbmVudERpc2FibGVkICYmIGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaCkge1xuICAgICAgaWYgKG1vZGUgPT09ICdjcmVhdGUnKSB7XG4gICAgICAgIGNvbXBvbmVudERpc2FibGVkID0gdGhpcy5nZXRDcmVhdGVJdGVtVmFsdWUocm93SW5kZXgsIHtcbiAgICAgICAgICB2YWx1ZUtleVBhdGg6IGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaC5tYXRjaFZhbHVlS2V5UGF0aCxcbiAgICAgICAgfSkgPT09IGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaC5tYXRjaFZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29tcG9uZW50RGlzYWJsZWQgPSB0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIHtcbiAgICAgICAgICB2YWx1ZUtleVBhdGg6IGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaC5tYXRjaFZhbHVlS2V5UGF0aCxcbiAgICAgICAgfSkgPT09IGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaC5tYXRjaFZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29tcG9uZW50RGlzYWJsZWQ7XG4gIH07XG5cbiAgZ2V0Um93Q2xhc3NOYW1lID0gKHJvd0luZGV4KSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZ3JpZCwgaXNDcmVhdGluZywgaXNFZGl0aW5nLCBjcmVhdGVEYXRhLCBzZWxlY3RlZEl0ZW1zLCBkYXRhLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHJvd0NsYXNzTmFtZXMgPSBbJ29jLWRhdGFncmlkLXJvdyddO1xuICAgIGxldCBleHRyYVJvd0NvdW50ID0gMDsgLy8gaG93IG1hbnkgcm93cyB0byBpZ25vcmUgZnJvbSB0b3AsIG5ldyArIGZpbHRlciByb3dzXG4gICAgaWYgKGlzQ3JlYXRpbmcpIGV4dHJhUm93Q291bnQgPSBjcmVhdGVEYXRhLnNpemU7XG4gICAgaWYgKGlzQ3JlYXRpbmcpIHtcbiAgICAgIGlmIChyb3dJbmRleCA8PSBleHRyYVJvd0NvdW50IC0gMSkge1xuICAgICAgICByb3dDbGFzc05hbWVzLnB1c2goJ29jLWRhdGFncmlkLXJvdy1uZXcnKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzRWRpdGluZykge1xuICAgICAgcm93Q2xhc3NOYW1lcy5wdXNoKCdvYy1kYXRhZ3JpZC1yb3ctZWRpdCcpO1xuICAgIH1cblxuICAgIC8vIGNoZWNrIGlmIHJvdyBpcyBzZWxlY3RlZFxuICAgIGlmICghaXNDcmVhdGluZyAmJiAhaXNFZGl0aW5nICYmIChzZWxlY3RlZEl0ZW1zICYmIGdyaWQuaWRLZXlQYXRoKSkge1xuICAgICAgaWYgKHNlbGVjdGVkSXRlbXMuaW5kZXhPZihkYXRhLmdldEluKFtyb3dJbmRleCAtIGV4dHJhUm93Q291bnQsIC4uLmdyaWQuaWRLZXlQYXRoXSkpICE9PSAtMSkge1xuICAgICAgICByb3dDbGFzc05hbWVzLnB1c2goJ2lzLXNlbGVjdGVkJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcHMucm93Q2xhc3NOYW1lR2V0dGVyKSB7XG4gICAgICByZXR1cm4gcm93Q2xhc3NOYW1lcy5qb2luKCcgJykgKyAnICcgKyB0aGlzLnByb3BzLnJvd0NsYXNzTmFtZUdldHRlcihyb3dJbmRleCk7XG4gICAgfVxuICAgIHJldHVybiByb3dDbGFzc05hbWVzLmpvaW4oJyAnKTtcbiAgfTtcblxuICBnZXRDZWxsTWVzc2FnZXMgPSAocm93SW5kZXgsIGNvbCwgY2VsbFR5cGUpID0+IHtcbiAgICBjb25zdCByZXR1cm5EYXRhID0ge307XG4gICAgaWYgKCF0aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoIHx8ICFjb2wudmFsdWVLZXlQYXRoKSB7XG4gICAgICByZXR1cm4gcmV0dXJuRGF0YTtcbiAgICB9XG4gICAgbGV0IGluZm9NZXNzYWdlO1xuICAgIGxldCBlcnJvck1lc3NhZ2U7XG4gICAgbGV0IHdhcm5pbmdNZXNzYWdlO1xuICAgIGlmIChjZWxsVHlwZSA9PT0gJ2NyZWF0ZScpIHtcbiAgICAgIGluZm9NZXNzYWdlID0gdGhpcy5wcm9wcy5jcmVhdGVDZWxsTWVzc2FnZXMuZ2V0SW4oWydpbmZvJywgcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgIGVycm9yTWVzc2FnZSA9IHRoaXMucHJvcHMuY3JlYXRlQ2VsbE1lc3NhZ2VzLmdldEluKFsnZXJyb3InLCByb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgd2FybmluZ01lc3NhZ2UgPSB0aGlzLnByb3BzLmNyZWF0ZUNlbGxNZXNzYWdlcy5nZXRJbihbXG4gICAgICAgICd3YXJuaW5nJyxcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIC4uLmNvbC52YWx1ZUtleVBhdGgsXG4gICAgICBdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgICAgaW5mb01lc3NhZ2UgPSB0aGlzLnByb3BzLmNlbGxNZXNzYWdlcy5nZXRJbihbJ2luZm8nLCBpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgZXJyb3JNZXNzYWdlID0gdGhpcy5wcm9wcy5jZWxsTWVzc2FnZXMuZ2V0SW4oWydlcnJvcicsIGlkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgICB3YXJuaW5nTWVzc2FnZSA9IHRoaXMucHJvcHMuY2VsbE1lc3NhZ2VzLmdldEluKFsnd2FybmluZycsIGlkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgfVxuICAgIGlmIChpbmZvTWVzc2FnZSkge1xuICAgICAgcmV0dXJuRGF0YS5pbmZvTWVzc2FnZSA9IGluZm9NZXNzYWdlO1xuICAgIH1cbiAgICBpZiAoZXJyb3JNZXNzYWdlKSB7XG4gICAgICByZXR1cm5EYXRhLmVycm9yTWVzc2FnZSA9IGVycm9yTWVzc2FnZTtcbiAgICB9XG4gICAgaWYgKHdhcm5pbmdNZXNzYWdlKSB7XG4gICAgICByZXR1cm5EYXRhLndhcm5pbmdNZXNzYWdlID0gd2FybmluZ01lc3NhZ2U7XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5EYXRhO1xuICB9O1xuXG4gIGdldFNjcm9sbFRvUm93ID0gKCkgPT4ge1xuICAgIGxldCBzY3JvbGxUb1JvdztcbiAgICBpZiAodGhpcy5wcm9wcy5pc0NyZWF0aW5nICYmICF0aGlzLmZvY3VzVG9DcmVhdGVDZWxsKSByZXR1cm4gc2Nyb2xsVG9Sb3c7XG4gICAgaWYgKHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwpIHtcbiAgICAgIGNvbnN0IHNjcm9sbE5ld1JvdyA9IHRoaXMucHJvcHMuY3JlYXRlRGF0YS5zaXplIC0gMTtcbiAgICAgIGlmIChzY3JvbGxOZXdSb3cgPj0gMCkge1xuICAgICAgICBzY3JvbGxUb1JvdyA9IHNjcm9sbE5ld1JvdztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMucHJvcHMuaXNFZGl0aW5nICYmICF0aGlzLnByb3BzLnNjcm9sbEluRWRpdE1vZGUpIHtcbiAgICAgICAgc2Nyb2xsVG9Sb3cgPSB0aGlzLnN0YXRlLmN1cnJlbnRSb3c7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzY3JvbGxUb1JvdyA9IHRoaXMucHJvcHMuc2Nyb2xsVG9Sb3c7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIH1cbiAgICAgIGlmIChzY3JvbGxUb1JvdyA9PT0gdW5kZWZpbmVkICYmIHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5zaXplID4gMCkge1xuICAgICAgICBzY3JvbGxUb1JvdyA9IHRoaXMuZ2V0U2VsZWN0ZWRJdGVtSW5kZXgodGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLmZpcnN0KCkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc2Nyb2xsVG9Sb3c7XG4gIH07XG5cbiAgc2V0Rm9jdXNUbyA9IChmb2N1c1RvKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuaXNFZGl0aW5nIHx8IHRoaXMucHJvcHMuaXNDcmVhdGluZykge1xuICAgICAgaWYgKGZvY3VzVG8gJiYgZm9jdXNUby5nZXQoJ3R5cGUnKSAmJiBmb2N1c1RvICE9PSB0aGlzLnByZXZGb2N1c1RvKSB7XG4gICAgICAgIHRoaXNbZm9jdXNUby5nZXQoJ3R5cGUnKV0gPSB0cnVlO1xuICAgICAgICB0aGlzLmZvY3VzVG9MYXN0Um93ID0gZm9jdXNUby5nZXQoJ2ZvY3VzVG9MYXN0Um93Jyk7XG4gICAgICAgIHRoaXMucHJldkZvY3VzVG8gPSBmb2N1c1RvO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBoYW5kbGVDZWxsU2VsZWN0ID0gKGNlbGxUeXBlLCByb3dJbmRleCwgY29sdW1uS2V5KSA9PiAoKSA9PiB7XG4gICAgaWYgKGNlbGxUeXBlID09PSAndmlldycgJiYgdGhpcy5wcm9wcy5jZWxsU2VsZWN0KSB7XG4gICAgICB0aGlzLnByb3BzLmNlbGxTZWxlY3Rpb25DaGFuZ2UoXG4gICAgICAgIHRoaXMucHJvcHMuZ3JpZCxcbiAgICAgICAgTWFwKHtcbiAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICBjb2x1bW5LZXksXG4gICAgICAgIH0pLFxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlQ3JlYXRlQ2VsbFJlZiA9IChyb3dJbmRleCwgY29sKSA9PiAocmVmKSA9PiB7XG4gICAgLy8gRm9jdXMgdG8gY3JlYXRlIGNlbGxcbiAgICBjb25zdCBjb2x1bW5LZXkgPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sKTtcbiAgICBjb25zdCBzZWxlY3RSZWYgPSAhcmVmIHx8IHJlZi5mb2N1cyA/IHJlZiA6IHRoaXMuZ2V0U2VsZWN0UmVmKHJlZik7XG4gICAgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5jcmVhdGVEYXRhLnNpemVcbiAgICAgICYmIHRoaXMucHJvcHMuY3JlYXRlRGF0YS5zaXplID09PSByb3dJbmRleCArIDFcbiAgICAgICYmIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGxcbiAgICAgICYmICF0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2NyZWF0ZScpXG4gICAgICAmJiBzZWxlY3RSZWZcbiAgICApIHtcbiAgICAgIHNlbGVjdFJlZi5mb2N1cygpO1xuICAgICAgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZUFycm93TmF2aWdhdGlvbikge1xuICAgICAgdGhpcy5jcmVhdGVDZWxsUmVmc1tgJHt0aGlzLnByb3BzLmdyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4fWBdID0gcmVmO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVFZGl0Q2VsbFJlZiA9IChyb3dJbmRleCwgY29sKSA9PiAocmVmKSA9PiB7XG4gICAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCk7XG4gICAgaWYgKHRoaXMuZm9jdXNUb0VkaXRDZWxsICYmICF0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2VkaXQnKSkge1xuICAgICAgY29uc3Qgc2VsZWN0ZWRSb3dJbmRleCA9IHRoaXMuZm9jdXNUb0xhc3RSb3cgJiYgdGhpcy5wcm9wcy5kYXRhLnNpemUgPiAwXG4gICAgICAgID8gdGhpcy5wcm9wcy5kYXRhLnNpemUgLSAxXG4gICAgICAgIDogdGhpcy5nZXRTZWxlY3RlZEl0ZW1JbmRleCh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuZmlyc3QoKSk7XG5cbiAgICAgIGNvbnN0IHsgc2VsZWN0ZWRDZWxsIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3Qgc2VsZWN0UmVmID0gIXJlZiB8fCByZWYuZm9jdXMgPyByZWYgOiB0aGlzLmdldFNlbGVjdFJlZihyZWYpO1xuICAgICAgaWYgKHNlbGVjdGVkQ2VsbC5zaXplID4gMCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgc2VsZWN0ZWRDZWxsLmdldCgncm93SW5kZXgnKSA9PT0gcm93SW5kZXhcbiAgICAgICAgICAmJiBzZWxlY3RlZENlbGwuZ2V0KCdjb2x1bW5LZXknKSA9PT0gY29sdW1uS2V5XG4gICAgICAgICAgJiYgc2VsZWN0UmVmXG4gICAgICAgICkge1xuICAgICAgICAgIHNlbGVjdFJlZi5mb2N1cygpO1xuICAgICAgICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5mb2N1c1RvTGFzdFJvdyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHNlbGVjdGVkUm93SW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZvY3VzVG9MYXN0Um93ID0gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKHNlbGVjdGVkUm93SW5kZXggPT09IHJvd0luZGV4ICYmIHNlbGVjdFJlZikge1xuICAgICAgICBzZWxlY3RSZWYuZm9jdXMoKTtcbiAgICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mb2N1c1RvTGFzdFJvdyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5lbmFibGVBcnJvd05hdmlnYXRpb24pIHtcbiAgICAgIHRoaXMuY2VsbFJlZnNbYCR7dGhpcy5wcm9wcy5ncmlkLmlkfV8ke2NvbHVtbktleX1fJHtyb3dJbmRleH1gXSA9IHJlZjtcbiAgICB9XG4gIH07XG5cbiAgbW92ZUNlbGxGb2N1cyA9IChuZXh0RWxlbWVudCwgcm93SW5kZXgsIGNvbHVtbkluZGV4KSA9PiB7XG4gICAgY29uc3QgZWxlbWVudFR5cGVzID0gWyd0ZXh0JywgJ2NoZWNrYm94J107XG4gICAgaWYgKG5leHRFbGVtZW50ICYmIGVsZW1lbnRUeXBlcy5pbmNsdWRlcyhuZXh0RWxlbWVudC50eXBlKSkge1xuICAgICAgaWYgKHJvd0luZGV4ICE9PSAtMSB8fCBjb2x1bW5JbmRleCAhPT0gLTEpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgY3VycmVudENvbHVtbjogY29sdW1uSW5kZXgsXG4gICAgICAgICAgY3VycmVudFJvdzogcm93SW5kZXgsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmIChuZXh0RWxlbWVudC50eXBlID09PSAnY2hlY2tib3gnKSBuZXh0RWxlbWVudC5mb2N1cygpO1xuICAgICAgICBpZiAobmV4dEVsZW1lbnQudHlwZSA9PT0gJ3RleHQnKSBuZXh0RWxlbWVudC5zZWxlY3QoKTtcbiAgICAgIH0sIDUwKTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlU2VsZWN0QWxsQ2hlY2tCb3hPbkNoYW5nZSA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLnNlbGVjdEFsbEl0ZW1zQ2hhbmdlKHRoaXMucHJvcHMuZ3JpZCk7XG4gIH07XG5cbiAgaGFuZGxlU2VsZWN0aW9uQ2hlY2tCb3hPbkNoYW5nZSA9IHJvd0luZGV4ID0+ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLml0ZW1TZWxlY3Rpb25DaGFuZ2UodGhpcy5wcm9wcy5ncmlkLCByb3dJbmRleCwgdHJ1ZSwgZmFsc2UpO1xuICB9O1xuXG4gIGdlbmVyYXRlQ29sdW1ucyA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBkYXRhLFxuICAgICAgc2VsZWN0ZWRJdGVtcyxcbiAgICAgIGRhdGVGb3JtYXQsXG4gICAgICB0aG91c2FuZFNlcGFyYXRvcixcbiAgICAgIGRlY2ltYWxTZXBhcmF0b3IsXG4gICAgICBncmlkLFxuICAgICAgaW5saW5lRWRpdCxcbiAgICAgIGZpbHRlcmluZyxcbiAgICAgIHJlZ2lvbixcbiAgICAgIGludGwsXG4gICAgICBzZWxlY3RDb21wb25lbnRPcHRpb25zLFxuICAgICAgaXNDcmVhdGluZyxcbiAgICAgIGV4dHJhQ29sdW1uLFxuICAgICAgcm93U2VsZWN0Q2hlY2tib3hDb2x1bW4sXG4gICAgICBzaG93U2VsZWN0QWxsQ2hlY2tib3gsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBjb2x1bW5zID0gW107XG4gICAgY29uc3QgdGFiSW5kZXggPSBTdHJpbmcodGhpcy5wcm9wcy50YWJJbmRleCk7XG4gICAgaWYgKGV4dHJhQ29sdW1uKSB7XG4gICAgICBjb2x1bW5zLnB1c2goe1xuICAgICAgICB3aWR0aDogZXh0cmFDb2x1bW4ud2lkdGggfHwgNDAsXG4gICAgICAgIGlzUmVzaXphYmxlOiAhIWV4dHJhQ29sdW1uLmlzUmVzaXphYmxlLFxuICAgICAgICBpc1NvcnRhYmxlOiBmYWxzZSxcbiAgICAgICAgY29sdW1uS2V5OiAnZXh0cmFDb2x1bW4nLFxuICAgICAgICBjZWxsOiByb3dJbmRleCA9PiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1leHRyYS1jb2x1bW4tY2VsbCBuby1yb3ctc2VsZWN0XCI+XG4gICAgICAgICAgICB7ZXh0cmFDb2x1bW4udmFsdWVSZW5kZXIoZGF0YS5nZXQocm93SW5kZXgpLCB0YWJJbmRleCl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICksXG4gICAgICAgIGNlbGxFZGl0OiByb3dJbmRleCA9PiAoZXh0cmFDb2x1bW4uY2VsbEVkaXQgPyBleHRyYUNvbHVtbi5jZWxsRWRpdChyb3dJbmRleCkgOiBudWxsKSxcbiAgICAgICAgY2VsbENyZWF0ZTogcm93SW5kZXggPT4gKGV4dHJhQ29sdW1uLmNlbGxDcmVhdGUgPyBleHRyYUNvbHVtbi5jZWxsQ3JlYXRlKHJvd0luZGV4KSA6IG51bGwpLFxuICAgICAgICBjZWxsRmlsdGVyOiByb3dJbmRleCA9PiAoZXh0cmFDb2x1bW4uY2VsbEZpbHRlciA/IGV4dHJhQ29sdW1uLmNlbGxGaWx0ZXIocm93SW5kZXgpIDogbnVsbCksXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocm93U2VsZWN0Q2hlY2tib3hDb2x1bW4pIHtcbiAgICAgIGNvbHVtbnMucHVzaCh7XG4gICAgICAgIHdpZHRoOiA0MCxcbiAgICAgICAgaXNSZXNpemFibGU6IGZhbHNlLFxuICAgICAgICBpc1NvcnRhYmxlOiBmYWxzZSxcbiAgICAgICAgY29sdW1uS2V5OiAnc2VsZWN0aW9uQ2hlY2tib3gnLFxuICAgICAgICBoZWFkZXI6IHNob3dTZWxlY3RBbGxDaGVja2JveCAmJiAoXG4gICAgICAgICAgPENoZWNrYm94XG4gICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRTZWxlY3RBbGxDaGVja0JveC0ke2dyaWQuaWR9YH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLXNlbGVjdC1hbGwtY2hlY2tib3gtY2VsbCBuby1yb3ctc2VsZWN0XCJcbiAgICAgICAgICAgIGNoZWNrZWQ9e2RhdGEuc2l6ZSAhPT0gMCAmJiBkYXRhLnNpemUgPT09IHNlbGVjdGVkSXRlbXMuc2l6ZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVNlbGVjdEFsbENoZWNrQm94T25DaGFuZ2V9XG4gICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSxcbiAgICAgICAgY2VsbDogKHJvd0luZGV4KSA9PiB7XG4gICAgICAgICAgY29uc3Qgcm93SXRlbSA9IGRhdGEuZ2V0KHJvd0luZGV4KTtcbiAgICAgICAgICBjb25zdCBpdGVtSWQgPSByb3dJdGVtLmdldEluKGdyaWQuaWRLZXlQYXRoKTtcbiAgICAgICAgICBjb25zdCBzZWxlY3RlZCA9IHNlbGVjdGVkSXRlbXMuaW5jbHVkZXMoaXRlbUlkKTtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPENoZWNrYm94XG4gICAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZFNlbGVjdENoZWNrQm94LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke3Jvd0luZGV4fWB9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLXNlbGVjdC1jaGVja2JveC1jZWxsIG5vLXJvdy1zZWxlY3RcIlxuICAgICAgICAgICAgICBjaGVja2VkPXtzZWxlY3RlZH1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlU2VsZWN0aW9uQ2hlY2tCb3hPbkNoYW5nZShyb3dJbmRleCl9XG4gICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgY2VsbEVkaXQ6ICgpID0+IG51bGwsXG4gICAgICAgIGNlbGxDcmVhdGU6ICgpID0+IG51bGwsXG4gICAgICAgIGNlbGxGaWx0ZXI6ICgpID0+IG51bGwsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCB2aXNpYmxlQ29sdW1ucyA9IFtdO1xuICAgIHRoaXMucHJvcHMudmlzaWJsZUNvbHVtbnMuZm9yRWFjaCgodmlzaWJsZUNvbHVtbktleSkgPT4ge1xuICAgICAgdGhpcy5wcm9wcy5jb2x1bW5zLmZvckVhY2goKG9yZ0NvbCkgPT4ge1xuICAgICAgICBpZiAoVXRpbHMuZ2V0Q29sdW1uS2V5KG9yZ0NvbCkgPT09IHZpc2libGVDb2x1bW5LZXkpIHtcbiAgICAgICAgICB2aXNpYmxlQ29sdW1ucy5wdXNoKG9yZ0NvbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHZpc2libGVDb2x1bW5zLmZvckVhY2goKGNvbCkgPT4ge1xuICAgICAgY29uc3QgdmFsdWVFbXB0eUNoZWNrZXIgPSBVdGlscy5nZXRWYWx1ZUVtcHR5Q2hlY2tlcihjb2wpO1xuICAgICAgLy8gQ2VsbCB2YWx1ZSByZW5kZXJpbmdcbiAgICAgIGNvbnN0IHZhbHVlUmVuZGVyID0gKHJvd0luZGV4LCBmb3JtYXQpID0+IHtcbiAgICAgICAgY29uc3QgdmFsID0gZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbCkpIHtcbiAgICAgICAgICByZXR1cm4gY29sLmlzUmVxdWlyZWQgPyA8TSBpZD1cIkdyaWQuVmFsdWVJc01pc3NpbmdcIiAvPiA6ICcnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3JtYXQgPyBmb3JtYXQodmFsKSA6IHZhbDtcbiAgICAgIH07XG5cbiAgICAgIGxldCBjb2x1bW4gPSBHcmlkQ29sdW1uU2VydmljZS5iYXNlQ29sdW1uKGNvbCk7XG4gICAgICAvLyBDb2xsZWN0IGNvbHVtbiBmdW5jdGlvbnMgaW50byBvbmUgT2JqZWN0XG4gICAgICBjb25zdCBjb2x1bW5GdW5jdGlvbnMgPSB7XG4gICAgICAgIGVkaXQ6IHtcbiAgICAgICAgICBnZXRJdGVtVmFsdWU6IHRoaXMuZ2V0RWRpdEl0ZW1WYWx1ZSxcbiAgICAgICAgICBvbkNlbGxWYWx1ZUNoYW5nZTogdGhpcy5vbkVkaXRDZWxsVmFsdWVDaGFuZ2UsXG4gICAgICAgICAgb25DZWxsQmx1cjogdGhpcy5vbkVkaXRDZWxsQmx1cixcbiAgICAgICAgICBvbkNlbGxGb2N1czogdGhpcy5vbkNlbGxGb2N1cyxcbiAgICAgICAgICBvbkNlbGxLZXlEb3duOiB0aGlzLm9uRWRpdENlbGxLZXlEb3duLFxuICAgICAgICAgIGhhbmRsZUNlbGxSZWY6IHRoaXMuaGFuZGxlRWRpdENlbGxSZWYsXG4gICAgICAgIH0sXG4gICAgICAgIGNyZWF0ZToge1xuICAgICAgICAgIGdldEl0ZW1WYWx1ZTogdGhpcy5nZXRDcmVhdGVJdGVtVmFsdWUsXG4gICAgICAgICAgb25DZWxsVmFsdWVDaGFuZ2U6IHRoaXMub25DcmVhdGVDZWxsVmFsdWVDaGFuZ2UsXG4gICAgICAgICAgb25DZWxsQmx1cjogdGhpcy5vbkNyZWF0ZUNlbGxCbHVyLFxuICAgICAgICAgIG9uQ2VsbEZvY3VzOiB0aGlzLm9uQ2VsbEZvY3VzLFxuICAgICAgICAgIG9uQ2VsbEtleURvd246IHRoaXMub25DcmVhdGVDZWxsS2V5RG93bixcbiAgICAgICAgICBoYW5kbGVDZWxsUmVmOiB0aGlzLmhhbmRsZUNyZWF0ZUNlbGxSZWYsXG4gICAgICAgIH0sXG4gICAgICAgIGZpbHRlcjoge1xuICAgICAgICAgIGdldEl0ZW1WYWx1ZTogdGhpcy5nZXRGaWx0ZXJJdGVtVmFsdWUsXG4gICAgICAgICAgZ2V0SXRlbU11bHRpVmFsdWU6IHRoaXMuZ2V0RmlsdGVySXRlbU11bHRpVmFsdWUsXG4gICAgICAgICAgb25DZWxsVmFsdWVDaGFuZ2U6IHRoaXMub25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UsXG4gICAgICAgICAgb25DZWxsTXVsdGlWYWx1ZUJsdXI6IHRoaXMub25GaWx0ZXJDZWxsTXVsdGlWYWx1ZUJsdXIsXG4gICAgICAgICAgb25DZWxsTXVsdGlWYWx1ZUNoYW5nZTogdGhpcy5vbkZpbHRlckNlbGxNdWx0aVZhbHVlQ2hhbmdlLFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgLy8gaGFuZGxlIGNvbHVtbi5jZWxsIC8gY29sdW1uLmNlbGxFZGl0IC8gY29sdW1uLmNlbGxDcmVhdGUgLyBjb2x1bW4uY2VsbEZpbHRlclxuICAgICAgY29uc3QgY2VsbFByb3BzID0ge1xuICAgICAgICBncmlkLFxuICAgICAgICBkYXRhLFxuICAgICAgICBkYXRlRm9ybWF0LFxuICAgICAgICB0aG91c2FuZFNlcGFyYXRvcixcbiAgICAgICAgZGVjaW1hbFNlcGFyYXRvcixcbiAgICAgICAgc2VsZWN0Q29tcG9uZW50T3B0aW9ucyxcbiAgICAgIH07IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIGNvbHVtbiA9IEdyaWRDb2x1bW5TZXJ2aWNlLmNvbHVtbkNlbGwoY29sdW1uLCBjZWxsUHJvcHMsIGNvbCwgdmFsdWVSZW5kZXIpO1xuXG4gICAgICAvLyBoYW5kbGUgY29sdW1uQ29tcG9uZW50VHlwZXNcbiAgICAgIGNvbnN0IGNvbXBvbmVudFR5cGVQcm9wcyA9IHtcbiAgICAgICAgLi4uY2VsbFByb3BzLFxuICAgICAgICBpbmxpbmVFZGl0LFxuICAgICAgICBmaWx0ZXJpbmcsXG4gICAgICAgIHJlZ2lvbixcbiAgICAgICAgaW50bCxcbiAgICAgICAgc2VsZWN0Q29tcG9uZW50T3B0aW9ucyxcbiAgICAgIH07IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIGNvbHVtbiA9IEdyaWRDb2x1bW5TZXJ2aWNlLmNvbHVtbkNvbXBvbmVudFR5cGUoXG4gICAgICAgIGNvbHVtbixcbiAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgIGNvbXBvbmVudFR5cGVQcm9wcyxcbiAgICAgICAgY29sLFxuICAgICAgICBjb2x1bW5GdW5jdGlvbnMsXG4gICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZSxcbiAgICAgICk7XG4gICAgICBjb2x1bW5zLnB1c2goY29sdW1uKTtcbiAgICB9KTtcblxuICAgIGlmIChpc0NyZWF0aW5nKSB7XG4gICAgICBjb2x1bW5zLnB1c2goe1xuICAgICAgICB3aWR0aDogMzcsXG4gICAgICAgIGlzUmVzaXphYmxlOiBmYWxzZSxcbiAgICAgICAgY29sdW1uS2V5OiAncmVtb3ZlTmV3SXRlbScsXG4gICAgICAgIGNlbGw6ICgpID0+IG51bGwsXG4gICAgICAgIGNlbGxFZGl0OiAoKSA9PiBudWxsLFxuICAgICAgICBjZWxsQ3JlYXRlOiByb3dJbmRleCA9PiAoXG4gICAgICAgICAgPEljb25cbiAgICAgICAgICAgIGlkPXtgb2MtZGF0YWdyaWQtbmV3LWl0ZW0tcmVtb3ZlLSR7Z3JpZC5pZH0tJHtyb3dJbmRleH1gfVxuICAgICAgICAgICAgdHlwZT1cImluZGljYXRvclwiXG4gICAgICAgICAgICBuYW1lPVwiZGVsZXRlXCJcbiAgICAgICAgICAgIHdpZHRoPXszMH1cbiAgICAgICAgICAgIGhlaWdodD17MzB9XG4gICAgICAgICAgICBzdHlsZT17eyBwYWRkaW5nOiAnN3B4JyB9fVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdGhpcy5wcm9wcy5yZW1vdmVOZXdJdGVtKGdyaWQsIHJvd0luZGV4KX1cbiAgICAgICAgICAvPlxuICAgICAgICApLFxuICAgICAgICBjZWxsRmlsdGVyOiAoKSA9PiBudWxsLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBjb2x1bW5zO1xuICB9O1xuXG4gIGlzQ2VsbEVkaXRlZCA9IChyb3dJbmRleCwgY29sLCBjZWxsVHlwZSkgPT4ge1xuICAgIGlmIChjZWxsVHlwZSAhPT0gJ2VkaXQnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICByZXR1cm4gISF0aGlzLnByb3BzLmVkaXREYXRhLmdldEluKFtpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICB9O1xuXG4gIGhhbmRsZUFmdGVyQWRkSXRlbSA9ICgpID0+IHtcbiAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsID0gdHJ1ZTtcbiAgfTtcblxuICBoYW5kbGVBZnRlckVkaXRQcmVzcyA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLnNpemUpIHtcbiAgICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gdHJ1ZTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjdXJyZW50Um93OiB1bmRlZmluZWQsXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlQWZ0ZXJWYWxpZGF0aW9uRXJyb3IgPSAoKSA9PiB7XG4gICAgdGhpcy5mb2N1c1RvRXJyb3JDZWxsID0gdHJ1ZTtcbiAgfTtcblxuICBoYW5kbGVSb3dDbGljayA9IChlLCByb3dJbmRleCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnJvd1NlbGVjdCAmJiAhdGhpcy5wcm9wcy5pc0NyZWF0aW5nICYmICF0aGlzLnByb3BzLmlzRWRpdGluZykge1xuICAgICAgaWYgKGUuY3RybEtleSB8fCBlLnNoaWZ0S2V5KSB7XG4gICAgICAgIGRvY3VtZW50LmdldFNlbGVjdGlvbigpLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgfVxuICAgICAgLy8gRG9uJ3QgdHJpZ2dlciBzZWxlY3Rpb24gY2hhbmdlIG9uIHdoZW4gdXNlciBjbGlja3Mgb24gc3BlY2lhbCBjZWxscyBsaWtlIGNoZWNrYm94L2V4dHJhXG4gICAgICAvLyBDaGVjayB0aGF0IGNsaWNrZWQgbm9kZSdzIHBhcmVudCBvciBwYXJlbnQncyBwYXJlbnQgZG9lc24ndCBoYXZlIG5vLXJvdy1zZWxlY3QgY2xhc3NcbiAgICAgIGNvbnN0IHsgcGFyZW50Tm9kZSB9ID0gZS50YXJnZXQ7XG4gICAgICBjb25zdCBwYXJlbnQxY2xhc3MgPSBwYXJlbnROb2RlLmNsYXNzTmFtZSAmJiBwYXJlbnROb2RlLmNsYXNzTmFtZS5pbmRleE9mID8gcGFyZW50Tm9kZS5jbGFzc05hbWUgOiAnJztcbiAgICAgIGNvbnN0IHBhcmVudDJjbGFzcyA9ICAgICAgICBwYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lICYmIHBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUuaW5kZXhPZiAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgID8gcGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZVxuICAgICAgICA6ICcnO1xuICAgICAgY29uc3QgcGFyZW50M2NsYXNzID0gcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgICYmIHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZS5pbmRleE9mIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgPyBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWVcbiAgICAgICAgOiAnJztcbiAgICAgIGNvbnN0IHBhcmVudDRjbGFzcyA9IHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgICYmIHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lLmluZGV4T2YgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICA/IHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgIDogJyc7XG4gICAgICBpZiAoXG4gICAgICAgIHBhcmVudDFjbGFzcy5pbmRleE9mKCduby1yb3ctc2VsZWN0JykgPT09IC0xXG4gICAgICAgICYmIHBhcmVudDJjbGFzcy5pbmRleE9mKCduby1yb3ctc2VsZWN0JykgPT09IC0xXG4gICAgICAgICYmIHBhcmVudDNjbGFzcy5pbmRleE9mKCduby1yb3ctc2VsZWN0JykgPT09IC0xXG4gICAgICAgICYmIHBhcmVudDRjbGFzcy5pbmRleE9mKCduby1yb3ctc2VsZWN0JykgPT09IC0xXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5wcm9wcy5pdGVtU2VsZWN0aW9uQ2hhbmdlKFxuICAgICAgICAgIHRoaXMucHJvcHMuZ3JpZCxcbiAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICB0aGlzLnByb3BzLm11bHRpU2VsZWN0ICYmIGUuY3RybEtleSxcbiAgICAgICAgICB0aGlzLnByb3BzLm11bHRpU2VsZWN0ICYmIGUuc2hpZnRLZXksXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLm9uUm93Q2xpY2spIHtcbiAgICAgIHRoaXMucHJvcHMub25Sb3dDbGljayhlLCByb3dJbmRleCwgdGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCkpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBoYW5kbGVDb250ZXh0TWVudSA9IChlLCByb3dJbmRleCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmNvbnRleHRNZW51SXRlbXMpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgaXRlbVNlbGVjdGlvbkNoYW5nZSwgc2VsZWN0ZWRJdGVtcywgZ3JpZCwgZGF0YSxcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjb250ZXh0TWVudU9wZW46IHRydWUsXG4gICAgICAgIGNvbnRleHRNZW51WDogZS5jbGllbnRYLFxuICAgICAgICBjb250ZXh0TWVudVk6IGUuY2xpZW50WSxcbiAgICAgIH0pO1xuICAgICAgLy8gSWYgY2xpY2tlZCBpdGVtIGlzIG5vdCBzZWxlY3RlZCwgY2hhbmdlIHNlbGVjdGlvbiB0byBpdFxuICAgICAgaWYgKCFzZWxlY3RlZEl0ZW1zLmluY2x1ZGVzKGRhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi5ncmlkLmlkS2V5UGF0aF0pKSkge1xuICAgICAgICBpdGVtU2VsZWN0aW9uQ2hhbmdlKGdyaWQsIHJvd0luZGV4KTtcbiAgICAgIH1cbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkRvY3VtZW50Q2xpY2spO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBoYW5kbGVDb250ZXh0TWVudUl0ZW1DbGljayA9IChvbkNsaWNrLCBzZWxlY3RlZEl0ZW1zLCBzZWxlY3RlZERhdGEpID0+ICgpID0+IHtcbiAgICBvbkNsaWNrKHNlbGVjdGVkSXRlbXMsIHNlbGVjdGVkRGF0YSk7XG4gIH07XG5cbiAgaGFuZGxlUm93SGVpZ2h0R2V0dGVyID0gcm93SW5kZXggPT4gdGhpcy5wcm9wcy5yb3dIZWlnaHRHZXR0ZXIoXG4gICAgdGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCksXG4gICAgcm93SW5kZXgsXG4gICk7XG5cbiAgcmVuZGVyQ2VsbCA9IGNvbCA9PiAoY2VsbFByb3BzKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgaXNDcmVhdGluZywgaXNFZGl0aW5nLCBjcmVhdGVEYXRhLCBzZWxlY3RlZENlbGwsIGdyaWQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyByb3dJbmRleCwgLi4ucHJvcHMgfSA9IGNlbGxQcm9wcztcbiAgICBsZXQgY2VsbDtcbiAgICBsZXQgY2VsbFR5cGUgPSAndmlldyc7XG4gICAgbGV0IGV4dHJhUm93Q291bnQgPSAwOyAvLyBob3cgbWFueSByb3dzIHRvIGlnbm9yZSBmcm9tIHRvcCwgbmV3ICsgZmlsdGVyIHJvd3NcbiAgICBpZiAoaXNDcmVhdGluZykgZXh0cmFSb3dDb3VudCA9IGNyZWF0ZURhdGEuc2l6ZTtcbiAgICBjb25zdCBleGlzdGluZ1Jvd3NJbmRleCA9IHJvd0luZGV4IC0gZXh0cmFSb3dDb3VudDtcbiAgICBpZiAoaXNDcmVhdGluZykge1xuICAgICAgaWYgKHJvd0luZGV4IDw9IGV4dHJhUm93Q291bnQgLSAxKSB7XG4gICAgICAgIGlmIChjb2wuY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNlbGwgPSBjb2wuY2VsbENyZWF0ZShcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGhpcy5oYW5kbGVDcmVhdGVDZWxsUmVmKHJvd0luZGV4LCBjb2wpLFxuICAgICAgICAgICAgdGhpcy5vbkNyZWF0ZUNlbGxLZXlEb3duKHJvd0luZGV4LCBjb2wpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgY2VsbFR5cGUgPSAnY3JlYXRlJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjZWxsID0gbnVsbDtcbiAgICAgICAgICBjZWxsVHlwZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNlbGwgPSBjb2wuY2VsbChcbiAgICAgICAgICBleGlzdGluZ1Jvd3NJbmRleCxcbiAgICAgICAgICB0aGlzLmhhbmRsZUNyZWF0ZUNlbGxSZWYoZXhpc3RpbmdSb3dzSW5kZXgsIGNvbCksXG4gICAgICAgICAgdGhpcy5vbkNyZWF0ZUNlbGxLZXlEb3duKGV4aXN0aW5nUm93c0luZGV4LCBjb2wpLFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNFZGl0aW5nICYmIGNvbC5jZWxsRWRpdCkge1xuICAgICAgY2VsbCA9IGNvbC5jZWxsRWRpdChcbiAgICAgICAgZXhpc3RpbmdSb3dzSW5kZXgsXG4gICAgICAgIHRoaXMuaGFuZGxlRWRpdENlbGxSZWYoZXhpc3RpbmdSb3dzSW5kZXgsIGNvbCksXG4gICAgICAgIHRoaXMub25FZGl0Q2VsbEtleURvd24oZXhpc3RpbmdSb3dzSW5kZXgsIGNvbCksXG4gICAgICApO1xuICAgICAgY2VsbFR5cGUgPSAnZWRpdCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNlbGwgPSBjb2wuY2VsbChcbiAgICAgICAgZXhpc3RpbmdSb3dzSW5kZXgsXG4gICAgICAgIHRoaXMuaGFuZGxlRWRpdENlbGxSZWYoZXhpc3RpbmdSb3dzSW5kZXgsIGNvbCksXG4gICAgICAgIHRoaXMub25FZGl0Q2VsbEtleURvd24oZXhpc3RpbmdSb3dzSW5kZXgsIGNvbCksXG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCBpc1NwZWNpYWwgPSBwcm9wcy5jb2x1bW5LZXkgPT09ICdzZWxlY3Rpb25DaGVja2JveCcgfHwgcHJvcHMuY29sdW1uS2V5ID09PSAnZXh0cmFDb2x1bW4nO1xuICAgIGlmICgoY2VsbFR5cGUgPT09ICd2aWV3JyB8fCBjZWxsVHlwZSA9PT0gJ2VkaXQnIHx8IGNlbGxUeXBlID09PSAnY3JlYXRlJykgJiYgIWlzU3BlY2lhbCkge1xuICAgICAgY29uc3QgZ2V0Um93SW5kZXggPSBjZWxsVHlwZSA9PT0gJ2NyZWF0ZScgPyByb3dJbmRleCA6IHJvd0luZGV4IC0gZXh0cmFSb3dDb3VudDtcbiAgICAgIGNvbnN0IG1lc3NhZ2VEYXRhID0gdGhpcy5nZXRDZWxsTWVzc2FnZXMoZ2V0Um93SW5kZXgsIGNvbCwgY2VsbFR5cGUpO1xuICAgICAgY29uc3QgaXNFZGl0ZWQgPSB0aGlzLmlzQ2VsbEVkaXRlZChnZXRSb3dJbmRleCwgY29sLCBjZWxsVHlwZSk7XG4gICAgICBjb25zdCBjbGFzc05hbWUgPSBzZWxlY3RlZENlbGwuZ2V0KCdyb3dJbmRleCcpID09PSByb3dJbmRleFxuICAgICAgICAmJiBzZWxlY3RlZENlbGwuZ2V0KCdjb2x1bW5LZXknKSA9PT0gcHJvcHMuY29sdW1uS2V5XG4gICAgICAgID8gJ29jLWRhdGFncmlkLWNlbGwgaXMtc2VsZWN0ZWQnXG4gICAgICAgIDogJ29jLWRhdGFncmlkLWNlbGwnO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPENlbGxcbiAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG4gICAgICAgICAgc3R5bGU9e2NvbC5zdHlsZX1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNlbGxTZWxlY3QoY2VsbFR5cGUsIHJvd0luZGV4LCBwcm9wcy5jb2x1bW5LZXkpfVxuICAgICAgICA+XG4gICAgICAgICAgPENlbGxUb29sdGlwXG4gICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRDZWxsLSR7Z3JpZC5pZH0tJHtwcm9wcy5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgIGlzRWRpdGVkPXtpc0VkaXRlZH1cbiAgICAgICAgICAgIGlzRXJyb3I9eyEhbWVzc2FnZURhdGEuZXJyb3JNZXNzYWdlfVxuICAgICAgICAgICAgaXNXYXJuaW5nPXshIW1lc3NhZ2VEYXRhLndhcm5pbmdNZXNzYWdlfVxuICAgICAgICAgICAgaW5mb01lc3NhZ2U9e21lc3NhZ2VEYXRhLmluZm9NZXNzYWdlfVxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlPXttZXNzYWdlRGF0YS5lcnJvck1lc3NhZ2V9XG4gICAgICAgICAgICB3YXJuaW5nTWVzc2FnZT17bWVzc2FnZURhdGEud2FybmluZ01lc3NhZ2V9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2NlbGx9XG4gICAgICAgICAgPC9DZWxsVG9vbHRpcD5cbiAgICAgICAgPC9DZWxsPlxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxDZWxsIHsuLi5wcm9wc30gY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtY2VsbFwiIHN0eWxlPXtjb2wuc3R5bGV9PlxuICAgICAgICB7Y2VsbH1cbiAgICAgIDwvQ2VsbD5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlckNvbHVtbnMgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgYWxsRGF0YVNpemUsIGdyaWQsIGlzQ3JlYXRpbmcsIGlzQnVzeSwgdmlzaWJsZUNvbHVtbnMsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFhbGxEYXRhU2l6ZSAmJiAhaXNCdXN5ICYmICFpc0NyZWF0aW5nICYmICFncmlkLnBhZ2luYXRpb24pIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxDb2x1bW5cbiAgICAgICAgICBjb2x1bW5LZXk9XCJkYXRhRW1wdHlDb2x1bW5cIlxuICAgICAgICAgIGhlYWRlcj17KFxuICAgICAgICAgICAgPENlbGwgc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICAgICAgPE0gaWQ9XCJHcmlkLk5vSXRlbXNcIiAvPlxuICAgICAgICAgICAgPC9DZWxsPlxuKX1cbiAgICAgICAgICB3aWR0aD17MTB9XG4gICAgICAgICAgaXNSZXNpemFibGU9e2ZhbHNlfVxuICAgICAgICAgIGZsZXhHcm93PXsxfVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKCF2aXNpYmxlQ29sdW1ucy5zaXplKSB7XG4gICAgICBpZiAoaXNCdXN5KSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPENvbHVtblxuICAgICAgICAgICAgY29sdW1uS2V5PVwiZGF0YUVtcHR5Q29sdW1uXCJcbiAgICAgICAgICAgIGhlYWRlcj17PENlbGw+Jm5ic3A7PC9DZWxsPn1cbiAgICAgICAgICAgIHdpZHRoPXsxMH1cbiAgICAgICAgICAgIGlzUmVzaXphYmxlPXtmYWxzZX1cbiAgICAgICAgICAgIGZsZXhHcm93PXsxfVxuICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Q29sdW1uXG4gICAgICAgICAgY29sdW1uS2V5PVwiZGF0YUVtcHR5Q29sdW1uXCJcbiAgICAgICAgICBoZWFkZXI9eyhcbiAgICAgICAgICAgIDxDZWxsIHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgICAgIDxNIGlkPVwiR3JpZC5Ob0NvbHVtbnNcIiAvPlxuICAgICAgICAgICAgPC9DZWxsPlxuKX1cbiAgICAgICAgICB3aWR0aD17MTB9XG4gICAgICAgICAgaXNSZXNpemFibGU9e2ZhbHNlfVxuICAgICAgICAgIGZsZXhHcm93PXsxfVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3QgY29sdW1ucyA9IHRoaXMuZ2VuZXJhdGVDb2x1bW5zKCk7XG4gICAgaWYgKGNvbHVtbnMubGVuZ2h0ID09PSAwKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gY29sdW1ucy5tYXAoY29sID0+IChcbiAgICAgIDxDb2x1bW5cbiAgICAgICAga2V5PXtjb2wuY29sdW1uS2V5fVxuICAgICAgICBjb2x1bW5LZXk9e2NvbC5jb2x1bW5LZXl9XG4gICAgICAgIGhlYWRlcj17KFxuICAgICAgICAgIDxIZWFkZXJDZWxsXG4gICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRIZWFkZXItJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sLmNvbHVtbktleX1gfVxuICAgICAgICAgICAgZ3JpZD17dGhpcy5wcm9wcy5ncmlkfVxuICAgICAgICAgICAgY29sdW1ucz17dGhpcy5wcm9wcy5jb2x1bW5zfVxuICAgICAgICAgICAgY29sdW1uPXtjb2x9XG4gICAgICAgICAgICBjdXJyZW50U29ydENvbHVtbj17dGhpcy5wcm9wcy5zb3J0Q29sdW1ufVxuICAgICAgICAgICAgY3VycmVudFNvcnRPcmRlcj17dGhpcy5wcm9wcy5zb3J0T3JkZXJ9XG4gICAgICAgICAgICBvblNvcnRDaGFuZ2U9e3RoaXMucHJvcHMuc29ydENoYW5nZX1cbiAgICAgICAgICAgIGlzQnVzeT17dGhpcy5wcm9wcy5pc0J1c3l9XG4gICAgICAgICAgICBmaWx0ZXJpbmc9e3RoaXMucHJvcHMuZmlsdGVyaW5nICYmIHRoaXMucHJvcHMuaXNGaWx0ZXJpbmd9XG4gICAgICAgICAgICB3aWR0aD17dGhpcy5wcm9wcy5jb2x1bW5XaWR0aHMuZ2V0KGNvbC5jb2x1bW5LZXksIGNvbC53aWR0aCl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2NvbC5oZWFkZXJ9XG4gICAgICAgICAgPC9IZWFkZXJDZWxsPlxuKX1cbiAgICAgICAgY2VsbD17dGhpcy5yZW5kZXJDZWxsKGNvbCl9XG4gICAgICAgIHdpZHRoPXt0aGlzLnByb3BzLmNvbHVtbldpZHRocy5nZXQoY29sLmNvbHVtbktleSwgY29sLndpZHRoKX1cbiAgICAgICAgbWluV2lkdGg9e2NvbC5taW5XaWR0aH1cbiAgICAgICAgbWF4V2lkdGg9e2NvbC5tYXhXaWR0aH1cbiAgICAgICAgaXNSZXNpemFibGU9e2NvbC5pc1Jlc2l6YWJsZX1cbiAgICAgICAgZmxleEdyb3c9e2NvbC5mbGV4R3JvdyA/IGNvbC5mbGV4R3JvdyA6IDB9XG4gICAgICAgIGZpeGVkPXtjb2wuZml4ZWR9XG4gICAgICAgIGZpeGVkUmlnaHQ9e2NvbC5maXhlZFJpZ2h0fVxuICAgICAgICBhbGxvd0NlbGxzUmVjeWNsaW5nPXtjb2wuYWxsb3dDZWxsc1JlY3ljbGluZ31cbiAgICAgIC8+XG4gICAgKSk7XG4gIH07XG5cbiAgcmVuZGVyQ29udGV4dE1lbnUgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgY29udGV4dE1lbnVJdGVtcywgZGF0YSwgZ3JpZCwgc2VsZWN0ZWRJdGVtcyxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IGNvbnRleHRNZW51WCwgY29udGV4dE1lbnVZIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHN0eWxlID0ge1xuICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgIHpJbmRleDogMTAwMDAsXG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIHRvcDogYCR7Y29udGV4dE1lbnVZfXB4YCxcbiAgICAgIGxlZnQ6IGAke2NvbnRleHRNZW51WH1weGAsXG4gICAgfTtcbiAgICBjb25zdCBzZWxlY3RlZERhdGEgPSBkYXRhLmZpbHRlcihkID0+IHNlbGVjdGVkSXRlbXMuaW5jbHVkZXMoZC5nZXRJbihncmlkLmlkS2V5UGF0aCkpKTtcbiAgICByZXR1cm4gKFxuICAgICAgPHVsIGNsYXNzTmFtZT1cImRyb3Bkb3duLW1lbnUgb2MtZGF0YWdyaWQtY29udGV4dC1tZW51IG9wZW5cIiBzdHlsZT17c3R5bGV9PlxuICAgICAgICB7Y29udGV4dE1lbnVJdGVtc1xuICAgICAgICAgICYmIGNvbnRleHRNZW51SXRlbXMubWFwXG4gICAgICAgICAgJiYgY29udGV4dE1lbnVJdGVtcy5tYXAoKGl0ZW0sIGkpID0+IHtcbiAgICAgICAgICAgIGxldCB7IGRpc2FibGVkIH0gPSBpdGVtO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBpdGVtLmRpc2FibGVkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgIGRpc2FibGVkID0gaXRlbS5kaXNhYmxlZChzZWxlY3RlZEl0ZW1zLCBzZWxlY3RlZERhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPE1lbnVJdGVtXG4gICAgICAgICAgICAgICAga2V5PXtpfSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgICAgICAgICAgaGVhZGVyPXtpdGVtLmhlYWRlcn1cbiAgICAgICAgICAgICAgICBkaXZpZGVyPXtpdGVtLmRpdmlkZXJ9XG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgICAgIHRpdGxlPXtpdGVtLnRpdGxlfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e1xuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQgfHwgIWl0ZW0ub25DbGlja1xuICAgICAgICAgICAgICAgICAgICA/IG51bGxcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLmhhbmRsZUNvbnRleHRNZW51SXRlbUNsaWNrKGl0ZW0ub25DbGljaywgc2VsZWN0ZWRJdGVtcywgc2VsZWN0ZWREYXRhKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtpdGVtLnZhbHVlfVxuICAgICAgICAgICAgICA8L01lbnVJdGVtPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KX1cbiAgICAgIDwvdWw+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgZ3JpZENsYXNzTmFtZSA9IGNsYXNzTmFtZXMoe1xuICAgICAgJ29jLWRhdGFncmlkLWNvbnRhaW5lcic6IHRydWUsXG4gICAgICAnd2l0aC1hY3Rpb25iYXInOiB0aGlzLnByb3BzLmlubGluZUVkaXQgJiYgIXRoaXMucHJvcHMuZGlzYWJsZUFjdGlvbkJhcixcbiAgICAgICdpcy1idXN5JzogdGhpcy5wcm9wcy5pc0J1c3ksXG4gICAgICAnaXMtZWRpdGluZyc6IHRoaXMucHJvcHMuaXNFZGl0aW5nLFxuICAgICAgJ2lzLWNyZWF0aW5nJzogdGhpcy5wcm9wcy5pc0NyZWF0aW5nLFxuICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICB9KTtcblxuICAgIC8vIGNoZWNrIGlmIHRoZXJlIGlzIGEgbmV3IHJlcXVlc3QgdG8gY2hhbmdlIGVkaXQgbW9kZSBmb2N1c1xuICAgIHRoaXMuc2V0Rm9jdXNUbyh0aGlzLnByb3BzLmZvY3VzVHlwZSk7XG5cbiAgICBsZXQgYWN0aW9uQmFyID0gbnVsbDtcbiAgICBsZXQgYWN0aW9uQmFyUmlnaHQgPSBudWxsO1xuICAgIGxldCBhY3Rpb25CYXJMZWZ0ID0gbnVsbDtcbiAgICBpZiAoXG4gICAgICAodGhpcy5wcm9wcy5hY3Rpb25CYXJcbiAgICAgICAgfHwgdGhpcy5wcm9wcy5pbmxpbmVFZGl0XG4gICAgICAgIHx8IHRoaXMucHJvcHMuZmlsdGVyaW5nXG4gICAgICAgIHx8IHRoaXMucHJvcHMucmVtb3ZpbmcpXG4gICAgICAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlQWN0aW9uQmFyXG4gICAgKSB7XG4gICAgICBhY3Rpb25CYXJSaWdodCA9IChcbiAgICAgICAgPEFjdGlvbkJhciBwb3NpdGlvbj1cInJpZ2h0XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1hY3Rpb25iYXItcmlnaHRcIj57dGhpcy5wcm9wcy5hY3Rpb25CYXJ9PC9kaXY+XG4gICAgICAgICAge3RoaXMucHJvcHMuZmlsdGVyaW5nXG4gICAgICAgICAgICAmJiB0aGlzLnByb3BzLmRpc2FibGVEcm9wZG93blxuICAgICAgICAgICAgJiYgIXRoaXMucHJvcHMuZGlzYWJsZUZpbHRlcmluZ0NvbnRyb2xzICYmIDxGaWx0ZXJpbmdDb250cm9scyB7Li4udGhpcy5wcm9wc30gLz59XG4gICAgICAgICAge3RoaXMucHJvcHMuaW5saW5lRWRpdCAmJiAoXG4gICAgICAgICAgICA8SW5saW5lRWRpdENvbnRyb2xzXG4gICAgICAgICAgICAgIGFmdGVyQWRkSXRlbT17dGhpcy5oYW5kbGVBZnRlckFkZEl0ZW19XG4gICAgICAgICAgICAgIGFmdGVyRWRpdFByZXNzPXt0aGlzLmhhbmRsZUFmdGVyRWRpdFByZXNzfVxuICAgICAgICAgICAgICBhZnRlclZhbGlkYXRpb25FcnJvcj17dGhpcy5oYW5kbGVBZnRlclZhbGlkYXRpb25FcnJvcn1cbiAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG4gICAgICAgICAgeyh0aGlzLnByb3BzLmRyb3Bkb3duTWVudUl0ZW1zXG4gICAgICAgICAgICB8fCB0aGlzLnByb3BzLnJlbW92aW5nXG4gICAgICAgICAgICB8fCB0aGlzLnByb3BzLmNvbHVtblNldHRpbmdzXG4gICAgICAgICAgICB8fCAodGhpcy5wcm9wcy5maWx0ZXJpbmcgJiYgIXRoaXMucHJvcHMuZGlzYWJsZURyb3Bkb3duKSkgJiYgKFxuICAgICAgICAgICAgPERyb3Bkb3duQ29udHJvbHMgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9BY3Rpb25CYXI+XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5hY3Rpb25CYXJMZWZ0IHx8IHRoaXMucHJvcHMuZ3JpZEhlYWRlcikge1xuICAgICAgYWN0aW9uQmFyTGVmdCA9IChcbiAgICAgICAgPEFjdGlvbkJhciBwb3NpdGlvbj1cImxlZnRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWdyaWRoZWFkZXJcIj57dGhpcy5wcm9wcy5ncmlkSGVhZGVyfTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtYWN0aW9uYmFyLWxlZnRcIj57dGhpcy5wcm9wcy5hY3Rpb25CYXJMZWZ0fTwvZGl2PlxuICAgICAgICA8L0FjdGlvbkJhcj5cbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChhY3Rpb25CYXJMZWZ0IHx8IGFjdGlvbkJhclJpZ2h0KSB7XG4gICAgICBhY3Rpb25CYXIgPSAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtYWN0aW9uYmFyLWNvbnRhaW5lclwiPlxuICAgICAgICAgIHthY3Rpb25CYXJMZWZ0fVxuICAgICAgICAgIHthY3Rpb25CYXJSaWdodH1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgICBsZXQgcm93c0NvdW50ID0gdGhpcy5wcm9wcy5yb3dzQ291bnQgfHwgdGhpcy5wcm9wcy5yb3dzQ291bnQgPT09IDBcbiAgICAgID8gdGhpcy5wcm9wcy5yb3dzQ291bnRcbiAgICAgIDogdGhpcy5wcm9wcy5kYXRhLnNpemU7XG4gICAgaWYgKHRoaXMucHJvcHMuaXNDcmVhdGluZykgcm93c0NvdW50ICs9IHRoaXMucHJvcHMuY3JlYXRlRGF0YS5zaXplO1xuICAgIGlmICghdGhpcy5wcm9wcy52aXNpYmxlQ29sdW1ucy5zaXplKSByb3dzQ291bnQgPSAwO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPXtgb2MtZGF0YWdyaWQtJHt0aGlzLnByb3BzLmdyaWQuaWR9YH1cbiAgICAgICAgY2xhc3NOYW1lPXtncmlkQ2xhc3NOYW1lfVxuICAgICAgICBzdHlsZT17dGhpcy5wcm9wcy5jb250YWluZXJTdHlsZX1cbiAgICAgID5cbiAgICAgICAge3RoaXMucHJvcHMuaXNCdXN5ICYmIDxTcGlubmVyIC8+fVxuICAgICAgICB7dGhpcy5zdGF0ZS5jb250ZXh0TWVudU9wZW4gJiYgdGhpcy5yZW5kZXJDb250ZXh0TWVudSgpfVxuICAgICAgICB7YWN0aW9uQmFyfVxuICAgICAgICA8UmVzcG9uc2l2ZUZpeGVkRGF0YVRhYmxlXG4gICAgICAgICAgaWQ9e3RoaXMucHJvcHMuZ3JpZC5pZH1cbiAgICAgICAgICByb3dzQ291bnQ9e3Jvd3NDb3VudH1cbiAgICAgICAgICBoZWFkZXJIZWlnaHQ9e1xuICAgICAgICAgICAgKHRoaXMucHJvcHMuZmlsdGVyaW5nICYmIHRoaXMucHJvcHMuaXNGaWx0ZXJpbmcpXG4gICAgICAgICAgICAgID8gdGhpcy5wcm9wcy5oZWFkZXJIZWlnaHQgKyB0aGlzLnByb3BzLmZpbHRlclJvd0hlaWdodFxuICAgICAgICAgICAgICA6IHRoaXMucHJvcHMuaGVhZGVySGVpZ2h0XG4gICAgICAgICAgfVxuICAgICAgICAgIHJvd0hlaWdodD17dGhpcy5wcm9wcy5yb3dIZWlnaHR9XG4gICAgICAgICAgb25Db2x1bW5SZXNpemVFbmRDYWxsYmFjaz17dGhpcy5vbkNvbHVtblJlc2l6ZUVuZENhbGxiYWNrfVxuICAgICAgICAgIGlzQ29sdW1uUmVzaXppbmc9e2ZhbHNlfVxuICAgICAgICAgIG9uUm93Q2xpY2s9e3RoaXMuaGFuZGxlUm93Q2xpY2t9XG4gICAgICAgICAgc2Nyb2xsVG9Db2x1bW49e3RoaXMucHJvcHMuc2Nyb2xsVG9Db2x1bW4gfHwgdGhpcy5zdGF0ZS5jdXJyZW50Q29sdW1ufVxuICAgICAgICAgIHNjcm9sbFRvcD17dGhpcy5wcm9wcy5zY3JvbGxUb3B9XG4gICAgICAgICAgc2Nyb2xsVG9Sb3c9e3RoaXMuZ2V0U2Nyb2xsVG9Sb3coKX1cbiAgICAgICAgICBvblJvd0RvdWJsZUNsaWNrPXt0aGlzLnByb3BzLm9uUm93RG91YmxlQ2xpY2t9XG4gICAgICAgICAgb25Sb3dNb3VzZURvd249e3RoaXMucHJvcHMub25Nb3VzZURvd259XG4gICAgICAgICAgb25Sb3dNb3VzZUVudGVyPXt0aGlzLnByb3BzLm9uUm93TW91c2VFbnRlcn1cbiAgICAgICAgICBvblJvd01vdXNlTGVhdmU9e3RoaXMucHJvcHMub25Sb3dNb3VzZUxlYXZlfVxuICAgICAgICAgIG9uU2Nyb2xsU3RhcnQ9e3RoaXMucHJvcHMub25TY3JvbGxTdGFydH1cbiAgICAgICAgICBvblNjcm9sbEVuZD17dGhpcy5wcm9wcy5vblNjcm9sbEVuZH1cbiAgICAgICAgICByb3dDbGFzc05hbWVHZXR0ZXI9e3RoaXMuZ2V0Um93Q2xhc3NOYW1lfVxuICAgICAgICAgIHJvd0hlaWdodEdldHRlcj17dGhpcy5wcm9wcy5yb3dIZWlnaHRHZXR0ZXIgJiYgdGhpcy5oYW5kbGVSb3dIZWlnaHRHZXR0ZXJ9XG4gICAgICAgICAgb25Db250ZW50SGVpZ2h0Q2hhbmdlPXt0aGlzLnByb3BzLm9uQ29udGVudEhlaWdodENoYW5nZX1cbiAgICAgICAgICBvblJvd0NvbnRleHRNZW51PXt0aGlzLmhhbmRsZUNvbnRleHRNZW51fVxuICAgICAgICA+XG4gICAgICAgICAge3RoaXMucmVuZGVyQ29sdW1ucygpfVxuICAgICAgICA8L1Jlc3BvbnNpdmVGaXhlZERhdGFUYWJsZT5cbiAgICAgICAge3RoaXMucHJvcHMuaXNDb2x1bW5TZXR0aW5nc01vZGFsT3BlbiAmJiAoXG4gICAgICAgICAgPENvbHVtblNldHRpbmdzTW9kYWxcbiAgICAgICAgICAgIGdyaWQ9e3RoaXMucHJvcHMuZ3JpZH1cbiAgICAgICAgICAgIGNvbHVtbnM9e3RoaXMucHJvcHMuY29sdW1uc31cbiAgICAgICAgICAgIHZpc2libGVDb2x1bW5zPXt0aGlzLnByb3BzLnZpc2libGVDb2x1bW5zfVxuICAgICAgICAgICAgY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsPXt0aGlzLnByb3BzLmNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbH1cbiAgICAgICAgICAgIHNhdmVDb2x1bW5TZXR0aW5ncz17dGhpcy5wcm9wcy5zYXZlQ29sdW1uU2V0dGluZ3N9XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERhdGFHcmlkO1xuIl19