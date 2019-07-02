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
        var _this$props2 = _this.props,
            cellSelectionChange = _this$props2.cellSelectionChange,
            cellSelect = _this$props2.cellSelect,
            grid = _this$props2.grid,
            isEditing = _this$props2.isEditing;
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

      if (col.componentType === 'multiselect') {
        // session storage content is converted to immutable and multiselect
        // filters is then list otherwise array
        return val && val.toJS ? val.toJS() : val || [];
      }

      return val;
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
      var _this$props3 = _this.props,
          grid = _this$props3.grid,
          isCreating = _this$props3.isCreating,
          isEditing = _this$props3.isEditing,
          createData = _this$props3.createData,
          selectedItems = _this$props3.selectedItems,
          data = _this$props3.data;
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
      var _this$props4 = _this.props,
          data = _this$props4.data,
          selectedItems = _this$props4.selectedItems,
          dateFormat = _this$props4.dateFormat,
          thousandSeparator = _this$props4.thousandSeparator,
          decimalSeparator = _this$props4.decimalSeparator,
          grid = _this$props4.grid,
          inlineEdit = _this$props4.inlineEdit,
          filtering = _this$props4.filtering,
          region = _this$props4.region,
          intl = _this$props4.intl,
          selectComponentOptions = _this$props4.selectComponentOptions,
          isCreating = _this$props4.isCreating,
          extraColumn = _this$props4.extraColumn,
          rowSelectCheckboxColumn = _this$props4.rowSelectCheckboxColumn,
          showSelectAllCheckbox = _this$props4.showSelectAllCheckbox;
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
            onCellValueChange: _this.onFilterCellValueChange
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
        var _this$props5 = _this.props,
            itemSelectionChange = _this$props5.itemSelectionChange,
            selectedItems = _this$props5.selectedItems,
            grid = _this$props5.grid,
            data = _this$props5.data;
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
        var _this$props6 = _this.props,
            isCreating = _this$props6.isCreating,
            isEditing = _this$props6.isEditing,
            createData = _this$props6.createData,
            selectedCell = _this$props6.selectedCell,
            grid = _this$props6.grid;

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
      var _this$props7 = _this.props,
          allDataSize = _this$props7.allDataSize,
          grid = _this$props7.grid,
          isCreating = _this$props7.isCreating,
          isBusy = _this$props7.isBusy,
          visibleColumns = _this$props7.visibleColumns;

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
      var _this$props8 = _this.props,
          contextMenuItems = _this$props8.contextMenuItems,
          data = _this$props8.data,
          grid = _this$props8.grid,
          selectedItems = _this$props8.selectedItems;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwib3duUHJvcHMiLCJHUklEIiwiZ3JpZCIsImlzQnVzeSIsImRhdGFncmlkIiwiZ2V0SW4iLCJpZCIsImlzRWRpdGluZyIsImlzQ3JlYXRpbmciLCJpc0ZpbHRlcmluZyIsImlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW4iLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwidmlzaWJsZUNvbHVtbnMiLCJjb2x1bW5XaWR0aHMiLCJzZWxlY3RlZENlbGwiLCJzZWxlY3RlZEl0ZW1zIiwiZGF0YSIsImVkaXREYXRhIiwiY3JlYXRlRGF0YSIsImZpbHRlckRhdGEiLCJjZWxsTWVzc2FnZXMiLCJjcmVhdGVDZWxsTWVzc2FnZXMiLCJhbGxEYXRhU2l6ZSIsInNpemUiLCJsYW5ndWFnZSIsIlV0aWxzIiwiZ2V0TGFuZ3VhZ2UiLCJ1c2VyIiwicmVnaW9uIiwiZ2V0UmVnaW9uIiwiZGF0ZUZvcm1hdCIsImdldERhdGVGb3JtYXQiLCJ0aG91c2FuZFNlcGFyYXRvciIsImdldFRob3VzYW5kU2VwYXJhdG9yIiwiZGVjaW1hbFNlcGFyYXRvciIsImdldERlY2ltYWxTZXBhcmF0b3IiLCJmb3JjZVJlZnJlc2hUaW1lc3RhbXAiLCJnZXQiLCJmb2N1c1R5cGUiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJkYXRhZ3JpZEFjdGlvbnMiLCJEYXRhR3JpZCIsInBhZ2luYXRpb24iLCJpbmplY3RJbnRsIiwicHJvcHMiLCJjb250ZXh0TWVudUl0ZW1zIiwic2V0U3RhdGUiLCJjb250ZXh0TWVudU9wZW4iLCJkb2N1bWVudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJvbkRvY3VtZW50Q2xpY2siLCJuZXdDb2x1bW5XaWR0aCIsImNvbHVtbktleSIsInJlc2l6ZUNvbHVtbiIsInJvd0luZGV4IiwiY29sIiwiZSIsImNyZWF0ZSIsImVuYWJsZUFycm93TmF2aWdhdGlvbiIsImNlbGxSZWZzIiwiY3JlYXRlQ2VsbFJlZnMiLCJhcnJvd0tleXMiLCJLRVlfQ09ERVMiLCJET1dOIiwiVVAiLCJMRUZUIiwiUklHSFQiLCJjb2x1bW5zIiwib25MYXN0Q2VsbFRhYlByZXNzIiwiZ3JpZENvbHVtbnMiLCJnZXRDb2x1bW5LZXlCeUluZGV4IiwiaSIsImdldENvbHVtbktleSIsInJvd3NTaXplIiwiY3VycmVudENlbGwiLCJwcm94eSIsImlzQ3Vyc29yQXRTdGFydCIsInR5cGUiLCJzZWxlY3Rpb25TdGFydCIsImlzQ3Vyc29yQXRFbmQiLCJzZWxlY3Rpb25FbmQiLCJ2YWx1ZSIsImxlbmd0aCIsInNlbGVjdFJlZiIsInNlbGVjdCIsImdldFNlbGVjdFJlZiIsImluY2x1ZGVzIiwia2V5Q29kZSIsInByZXZlbnREZWZhdWx0IiwiRU5URVIiLCJFU0MiLCJhZGROZXdJdGVtIiwiZ2V0Q29sdW1uRGVmYXVsdFZhbHVlcyIsImZvY3VzVG9DcmVhdGVDZWxsIiwibmV4dEVsZW1lbnQiLCJtZW51SXNPcGVuIiwibW92ZUNlbGxGb2N1cyIsIlRBQiIsImNvbHVtbkluZCIsImZpbmRJbmRleCIsImMiLCJ2YWx1ZUtleVBhdGgiLCJqb2luIiwiZGlzYWJsZWQiLCJyb3dJbmQiLCJzaGlmdEtleSIsIm9uQ2VsbEtleURvd24iLCJ2YWx1ZVBhcnNlciIsImV2ZW50T3JEYXRhIiwicmF3VmFsdWUiLCJ0YXJnZXQiLCJ1bmRlZmluZWQiLCJmaWx0ZXJDZWxsVmFsdWVDaGFuZ2UiLCJjcmVhdGVDZWxsVmFsdWVDaGFuZ2UiLCJvbkNyZWF0ZVZhbHVlQ2hhbmdlIiwib25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUiLCJtYXRjaFZhbHVlIiwib25DcmVhdGVDZWxsVmFsdWVDaGFuZ2UiLCJuZXdWYWx1ZUtleVBhdGgiLCJ2IiwibmV3VmFsdWUiLCJ2YWxpZGF0b3JzIiwiY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUiLCJkYXRhSWQiLCJnZXREYXRhSWRCeVJvd0luZGV4IiwiZWRpdENlbGxWYWx1ZUNoYW5nZSIsIm9uRWRpdFZhbHVlQ2hhbmdlIiwib25FZGl0Q2VsbFZhbHVlQ2hhbmdlIiwiZWRpdENlbGxWYWx1ZVZhbGlkYXRlIiwib25DcmVhdGVCbHVyIiwiZ2V0RWRpdEl0ZW1WYWx1ZSIsIm9uRWRpdEJsdXIiLCJjZWxsVHlwZSIsImlucHV0VHlwZSIsImNlbGxTZWxlY3Rpb25DaGFuZ2UiLCJjZWxsU2VsZWN0IiwiY29tcG9uZW50IiwiaW5wdXRSZWYiLCJpZEtleVBhdGgiLCJpbmRleCIsIm9wdGlvbnMiLCJlZGl0VmFsdWUiLCJvcmlnaW5hbFZhbHVlIiwiY29tcG9uZW50VHlwZSIsInNlbGVjdE9wdGlvbnMiLCJmaW5kIiwib2JqIiwiU3RyaW5nIiwicmVwbGFjZSIsInZhbCIsInRvSlMiLCJtb2RlIiwiY29tcG9uZW50RGlzYWJsZWQiLCJkaXNhYmxlRWRpdGluZyIsImRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoIiwiZ2V0Q3JlYXRlSXRlbVZhbHVlIiwibWF0Y2hWYWx1ZUtleVBhdGgiLCJyb3dDbGFzc05hbWVzIiwiZXh0cmFSb3dDb3VudCIsInB1c2giLCJpbmRleE9mIiwicm93Q2xhc3NOYW1lR2V0dGVyIiwicmV0dXJuRGF0YSIsImluZm9NZXNzYWdlIiwiZXJyb3JNZXNzYWdlIiwid2FybmluZ01lc3NhZ2UiLCJzY3JvbGxUb1JvdyIsInNjcm9sbE5ld1JvdyIsInNjcm9sbEluRWRpdE1vZGUiLCJjdXJyZW50Um93IiwiZ2V0U2VsZWN0ZWRJdGVtSW5kZXgiLCJmaXJzdCIsImZvY3VzVG8iLCJwcmV2Rm9jdXNUbyIsImZvY3VzVG9MYXN0Um93IiwicmVmIiwiZm9jdXMiLCJnZXRDb21wb25lbnREaXNhYmxlZFN0YXRlIiwiZm9jdXNUb0VkaXRDZWxsIiwic2VsZWN0ZWRSb3dJbmRleCIsImNvbHVtbkluZGV4IiwiZWxlbWVudFR5cGVzIiwiY3VycmVudENvbHVtbiIsInNldFRpbWVvdXQiLCJzZWxlY3RBbGxJdGVtc0NoYW5nZSIsIml0ZW1TZWxlY3Rpb25DaGFuZ2UiLCJpbmxpbmVFZGl0IiwiZmlsdGVyaW5nIiwiaW50bCIsInNlbGVjdENvbXBvbmVudE9wdGlvbnMiLCJleHRyYUNvbHVtbiIsInJvd1NlbGVjdENoZWNrYm94Q29sdW1uIiwic2hvd1NlbGVjdEFsbENoZWNrYm94IiwidGFiSW5kZXgiLCJ3aWR0aCIsImlzUmVzaXphYmxlIiwiaXNTb3J0YWJsZSIsImNlbGwiLCJ2YWx1ZVJlbmRlciIsImNlbGxFZGl0IiwiY2VsbENyZWF0ZSIsImNlbGxGaWx0ZXIiLCJoZWFkZXIiLCJoYW5kbGVTZWxlY3RBbGxDaGVja0JveE9uQ2hhbmdlIiwicm93SXRlbSIsIml0ZW1JZCIsInNlbGVjdGVkIiwiaGFuZGxlU2VsZWN0aW9uQ2hlY2tCb3hPbkNoYW5nZSIsImZvckVhY2giLCJ2aXNpYmxlQ29sdW1uS2V5Iiwib3JnQ29sIiwidmFsdWVFbXB0eUNoZWNrZXIiLCJnZXRWYWx1ZUVtcHR5Q2hlY2tlciIsImZvcm1hdCIsImlzUmVxdWlyZWQiLCJjb2x1bW4iLCJHcmlkQ29sdW1uU2VydmljZSIsImJhc2VDb2x1bW4iLCJjb2x1bW5GdW5jdGlvbnMiLCJlZGl0IiwiZ2V0SXRlbVZhbHVlIiwib25DZWxsVmFsdWVDaGFuZ2UiLCJvbkNlbGxCbHVyIiwib25FZGl0Q2VsbEJsdXIiLCJvbkNlbGxGb2N1cyIsIm9uRWRpdENlbGxLZXlEb3duIiwiaGFuZGxlQ2VsbFJlZiIsImhhbmRsZUVkaXRDZWxsUmVmIiwib25DcmVhdGVDZWxsQmx1ciIsIm9uQ3JlYXRlQ2VsbEtleURvd24iLCJoYW5kbGVDcmVhdGVDZWxsUmVmIiwiZmlsdGVyIiwiZ2V0RmlsdGVySXRlbVZhbHVlIiwib25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UiLCJjZWxsUHJvcHMiLCJjb2x1bW5DZWxsIiwiY29tcG9uZW50VHlwZVByb3BzIiwiY29sdW1uQ29tcG9uZW50VHlwZSIsInBhZGRpbmciLCJyZW1vdmVOZXdJdGVtIiwiZm9jdXNUb0Vycm9yQ2VsbCIsInJvd1NlbGVjdCIsImN0cmxLZXkiLCJnZXRTZWxlY3Rpb24iLCJyZW1vdmVBbGxSYW5nZXMiLCJwYXJlbnROb2RlIiwicGFyZW50MWNsYXNzIiwiY2xhc3NOYW1lIiwicGFyZW50MmNsYXNzIiwicGFyZW50M2NsYXNzIiwicGFyZW50NGNsYXNzIiwibXVsdGlTZWxlY3QiLCJvblJvd0NsaWNrIiwic3RvcFByb3BhZ2F0aW9uIiwiY29udGV4dE1lbnVYIiwiY2xpZW50WCIsImNvbnRleHRNZW51WSIsImNsaWVudFkiLCJhZGRFdmVudExpc3RlbmVyIiwib25DbGljayIsInNlbGVjdGVkRGF0YSIsInJvd0hlaWdodEdldHRlciIsImV4aXN0aW5nUm93c0luZGV4IiwiaXNTcGVjaWFsIiwiZ2V0Um93SW5kZXgiLCJtZXNzYWdlRGF0YSIsImdldENlbGxNZXNzYWdlcyIsImlzRWRpdGVkIiwiaXNDZWxsRWRpdGVkIiwic3R5bGUiLCJoYW5kbGVDZWxsU2VsZWN0IiwidGV4dEFsaWduIiwiZ2VuZXJhdGVDb2x1bW5zIiwibGVuZ2h0IiwibWFwIiwic29ydENoYW5nZSIsInJlbmRlckNlbGwiLCJtaW5XaWR0aCIsIm1heFdpZHRoIiwiZmxleEdyb3ciLCJmaXhlZCIsImZpeGVkUmlnaHQiLCJhbGxvd0NlbGxzUmVjeWNsaW5nIiwiZGlzcGxheSIsInpJbmRleCIsInBvc2l0aW9uIiwidG9wIiwibGVmdCIsImQiLCJpdGVtIiwiZGl2aWRlciIsInRpdGxlIiwiaGFuZGxlQ29udGV4dE1lbnVJdGVtQ2xpY2siLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImludmFsaWRhdGUiLCJyZW5kZXIiLCJncmlkQ2xhc3NOYW1lIiwiZGlzYWJsZUFjdGlvbkJhciIsInNldEZvY3VzVG8iLCJhY3Rpb25CYXIiLCJhY3Rpb25CYXJSaWdodCIsImFjdGlvbkJhckxlZnQiLCJyZW1vdmluZyIsImRpc2FibGVEcm9wZG93biIsImRpc2FibGVGaWx0ZXJpbmdDb250cm9scyIsImhhbmRsZUFmdGVyQWRkSXRlbSIsImhhbmRsZUFmdGVyRWRpdFByZXNzIiwiaGFuZGxlQWZ0ZXJWYWxpZGF0aW9uRXJyb3IiLCJkcm9wZG93bk1lbnVJdGVtcyIsImNvbHVtblNldHRpbmdzIiwiZ3JpZEhlYWRlciIsInJvd3NDb3VudCIsImNvbnRhaW5lclN0eWxlIiwicmVuZGVyQ29udGV4dE1lbnUiLCJoZWFkZXJIZWlnaHQiLCJmaWx0ZXJSb3dIZWlnaHQiLCJyb3dIZWlnaHQiLCJvbkNvbHVtblJlc2l6ZUVuZENhbGxiYWNrIiwiaGFuZGxlUm93Q2xpY2siLCJzY3JvbGxUb0NvbHVtbiIsInNjcm9sbFRvcCIsImdldFNjcm9sbFRvUm93Iiwib25Sb3dEb3VibGVDbGljayIsIm9uTW91c2VEb3duIiwib25Sb3dNb3VzZUVudGVyIiwib25Sb3dNb3VzZUxlYXZlIiwib25TY3JvbGxTdGFydCIsIm9uU2Nyb2xsRW5kIiwiZ2V0Um93Q2xhc3NOYW1lIiwiaGFuZGxlUm93SGVpZ2h0R2V0dGVyIiwib25Db250ZW50SGVpZ2h0Q2hhbmdlIiwiaGFuZGxlQ29udGV4dE1lbnUiLCJyZW5kZXJDb2x1bW5zIiwiY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsIiwic2F2ZUNvbHVtblNldHRpbmdzIiwiY2hpbGRyZW4iLCJSZWFjdCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0IsQ0FBQ0MsS0FBRCxFQUFRQyxRQUFSLEVBQXFCO0FBQzNDLE1BQU1DLElBQUksR0FBR0QsUUFBUSxDQUFDRSxJQUF0QjtBQUNBLFNBQU87QUFDTEMsSUFBQUEsTUFBTSxFQUFFSixLQUFLLENBQUNLLFFBQU4sQ0FBZUMsS0FBZixDQUFxQixDQUFDSixJQUFJLENBQUNLLEVBQU4sRUFBVSxTQUFWLEVBQXFCLFFBQXJCLENBQXJCLEVBQXFELElBQXJELENBREg7QUFFTEMsSUFBQUEsU0FBUyxFQUFFUixLQUFLLENBQUNLLFFBQU4sQ0FBZUMsS0FBZixDQUFxQixDQUFDSixJQUFJLENBQUNLLEVBQU4sRUFBVSxTQUFWLEVBQXFCLFdBQXJCLENBQXJCLEVBQXdELEtBQXhELENBRk47QUFHTEUsSUFBQUEsVUFBVSxFQUFFVCxLQUFLLENBQUNLLFFBQU4sQ0FBZUMsS0FBZixDQUFxQixDQUFDSixJQUFJLENBQUNLLEVBQU4sRUFBVSxTQUFWLEVBQXFCLFlBQXJCLENBQXJCLEVBQXlELEtBQXpELENBSFA7QUFJTEcsSUFBQUEsV0FBVyxFQUFFVixLQUFLLENBQUNLLFFBQU4sQ0FBZUMsS0FBZixDQUFxQixDQUFDSixJQUFJLENBQUNLLEVBQU4sRUFBVSxRQUFWLEVBQW9CLGVBQXBCLEVBQXFDLGFBQXJDLENBQXJCLEVBQTBFLEtBQTFFLENBSlI7QUFLTEksSUFBQUEseUJBQXlCLEVBQUVYLEtBQUssQ0FBQ0ssUUFBTixDQUFlQyxLQUFmLENBQ3pCLENBQUNKLElBQUksQ0FBQ0ssRUFBTixFQUFVLFNBQVYsRUFBcUIscUJBQXJCLEVBQTRDLE1BQTVDLENBRHlCLEVBRXpCLEtBRnlCLENBTHRCO0FBU0xLLElBQUFBLFVBQVUsRUFBRVosS0FBSyxDQUFDSyxRQUFOLENBQWVDLEtBQWYsQ0FBcUIsQ0FBQ0osSUFBSSxDQUFDSyxFQUFOLEVBQVUsUUFBVixFQUFvQixhQUFwQixFQUFtQyxZQUFuQyxDQUFyQixFQUF1RSxJQUF2RSxDQVRQO0FBVUxNLElBQUFBLFNBQVMsRUFBRWIsS0FBSyxDQUFDSyxRQUFOLENBQWVDLEtBQWYsQ0FBcUIsQ0FBQ0osSUFBSSxDQUFDSyxFQUFOLEVBQVUsUUFBVixFQUFvQixhQUFwQixFQUFtQyxXQUFuQyxDQUFyQixFQUFzRSxJQUF0RSxDQVZOO0FBV0xPLElBQUFBLGNBQWMsRUFBRWQsS0FBSyxDQUFDSyxRQUFOLENBQWVDLEtBQWYsQ0FBcUIsQ0FBQ0osSUFBSSxDQUFDSyxFQUFOLEVBQVUsUUFBVixFQUFvQixnQkFBcEIsQ0FBckIsRUFBNEQsc0JBQTVELENBWFg7QUFZTFEsSUFBQUEsWUFBWSxFQUFFZixLQUFLLENBQUNLLFFBQU4sQ0FBZUMsS0FBZixDQUFxQixDQUFDSixJQUFJLENBQUNLLEVBQU4sRUFBVSxRQUFWLEVBQW9CLGNBQXBCLENBQXJCLEVBQTBELHFCQUExRCxDQVpUO0FBYUxTLElBQUFBLFlBQVksRUFBRWhCLEtBQUssQ0FBQ0ssUUFBTixDQUFlQyxLQUFmLENBQXFCLENBQUNKLElBQUksQ0FBQ0ssRUFBTixFQUFVLGNBQVYsQ0FBckIsRUFBZ0QscUJBQWhELENBYlQ7QUFjTFUsSUFBQUEsYUFBYSxFQUFFakIsS0FBSyxDQUFDSyxRQUFOLENBQWVDLEtBQWYsQ0FBcUIsQ0FBQ0osSUFBSSxDQUFDSyxFQUFOLEVBQVUsZUFBVixDQUFyQixFQUFpRCxzQkFBakQsQ0FkVjtBQWVMVyxJQUFBQSxJQUFJLEVBQUVsQixLQUFLLENBQUNLLFFBQU4sQ0FBZUMsS0FBZixDQUFxQixDQUFDSixJQUFJLENBQUNLLEVBQU4sRUFBVSxNQUFWLENBQXJCLEVBQXdDLHNCQUF4QyxDQWZEO0FBZ0JMWSxJQUFBQSxRQUFRLEVBQUVuQixLQUFLLENBQUNLLFFBQU4sQ0FBZUMsS0FBZixDQUFxQixDQUFDSixJQUFJLENBQUNLLEVBQU4sRUFBVSxVQUFWLENBQXJCLEVBQTRDLHFCQUE1QyxDQWhCTDtBQWlCTGEsSUFBQUEsVUFBVSxFQUFFcEIsS0FBSyxDQUFDSyxRQUFOLENBQWVDLEtBQWYsQ0FBcUIsQ0FBQ0osSUFBSSxDQUFDSyxFQUFOLEVBQVUsWUFBVixDQUFyQixFQUE4QyxzQkFBOUMsQ0FqQlA7QUFrQkxjLElBQUFBLFVBQVUsRUFBRXJCLEtBQUssQ0FBQ0ssUUFBTixDQUFlQyxLQUFmLENBQXFCLENBQUNKLElBQUksQ0FBQ0ssRUFBTixFQUFVLFFBQVYsRUFBb0IsZUFBcEIsRUFBcUMsWUFBckMsQ0FBckIsRUFBeUUscUJBQXpFLENBbEJQO0FBbUJMZSxJQUFBQSxZQUFZLEVBQUV0QixLQUFLLENBQUNLLFFBQU4sQ0FBZUMsS0FBZixDQUFxQixDQUFDSixJQUFJLENBQUNLLEVBQU4sRUFBVSxjQUFWLENBQXJCLEVBQWdELHFCQUFoRCxDQW5CVDtBQW9CTGdCLElBQUFBLGtCQUFrQixFQUFFdkIsS0FBSyxDQUFDSyxRQUFOLENBQWVDLEtBQWYsQ0FBcUIsQ0FBQ0osSUFBSSxDQUFDSyxFQUFOLEVBQVUsb0JBQVYsQ0FBckIsRUFBc0QscUJBQXRELENBcEJmO0FBcUJMaUIsSUFBQUEsV0FBVyxFQUFFeEIsS0FBSyxDQUFDSyxRQUFOLENBQWVDLEtBQWYsQ0FBcUIsQ0FBQ0osSUFBSSxDQUFDSyxFQUFOLEVBQVUsU0FBVixDQUFyQixFQUEyQyxzQkFBM0MsRUFBbURrQixJQXJCM0Q7QUFzQkxDLElBQUFBLFFBQVEsRUFBRUMsc0JBQU1DLFdBQU4sQ0FBa0IxQixJQUFsQixFQUF3QkYsS0FBSyxDQUFDNkIsSUFBOUIsQ0F0Qkw7QUF1QkxDLElBQUFBLE1BQU0sRUFBRUgsc0JBQU1JLFNBQU4sQ0FBZ0I3QixJQUFoQixFQUFzQkYsS0FBSyxDQUFDNkIsSUFBNUIsQ0F2Qkg7QUF3QkxHLElBQUFBLFVBQVUsRUFBRUwsc0JBQU1NLGFBQU4sQ0FBb0IvQixJQUFwQixFQUEwQkYsS0FBSyxDQUFDNkIsSUFBaEMsQ0F4QlA7QUF5QkxLLElBQUFBLGlCQUFpQixFQUFFUCxzQkFBTVEsb0JBQU4sQ0FBMkJqQyxJQUEzQixFQUFpQ0YsS0FBSyxDQUFDNkIsSUFBdkMsQ0F6QmQ7QUEwQkxPLElBQUFBLGdCQUFnQixFQUFFVCxzQkFBTVUsbUJBQU4sQ0FBMEJuQyxJQUExQixFQUFnQ0YsS0FBSyxDQUFDNkIsSUFBdEMsQ0ExQmI7QUEyQkxTLElBQUFBLHFCQUFxQixFQUFFdEMsS0FBSyxDQUFDSyxRQUFOLENBQWVrQyxHQUFmLENBQW1CLGNBQW5CLEVBQW1DLENBQW5DLENBM0JsQjtBQTJCeUQ7QUFDOURDLElBQUFBLFNBQVMsRUFBRXhDLEtBQUssQ0FBQ0ssUUFBTixDQUFlQyxLQUFmLENBQXFCLENBQUNKLElBQUksQ0FBQ0ssRUFBTixFQUFVLFNBQVYsRUFBcUIsV0FBckIsQ0FBckIsRUFBd0QscUJBQXhEO0FBNUJOLEdBQVA7QUE4QkQsQ0FoQ0Q7O0FBa0NBLElBQU1rQyxrQkFBa0IsR0FBR0MsZUFBM0I7SUFRTUMsUSxXQUpMLHlCQUNDNUMsZUFERCxFQUVDMEMsa0JBRkQsQyxNQUZBRyxzQixlQUNBQyxxQjs7Ozs7QUFVQyxvQkFBWUMsTUFBWixFQUFtQjtBQUFBOztBQUNqQiw0Q0FBTUEsTUFBTjs7QUFEaUIsc0VBcUJELFlBQU07QUFDdEIsVUFBSSxNQUFLQSxLQUFMLENBQVdDLGdCQUFmLEVBQWlDO0FBQy9CLGNBQUtDLFFBQUwsQ0FBYztBQUNaQyxVQUFBQSxlQUFlLEVBQUU7QUFETCxTQUFkO0FBR0Q7O0FBQ0RDLE1BQUFBLFFBQVEsQ0FBQ0MsbUJBQVQsQ0FBNkIsT0FBN0IsRUFBc0MsTUFBS0MsZUFBM0M7QUFDRCxLQTVCa0I7O0FBQUEsZ0ZBOEJTLFVBQUNDLGNBQUQsRUFBaUJDLFNBQWpCLEVBQStCO0FBQ3pELFlBQUtSLEtBQUwsQ0FBV1MsWUFBWCxDQUF3QixNQUFLVCxLQUFMLENBQVczQyxJQUFuQyxFQUF5Q21ELFNBQXpDLEVBQW9ERCxjQUFwRDtBQUNELEtBaENrQjs7QUFBQSxvRUF3Q0gsVUFBQ0csUUFBRCxFQUFXQyxHQUFYLEVBQWdCQyxDQUFoQixFQUFtQkMsTUFBbkIsRUFBc0M7QUFBQSxVQUFuQkEsTUFBbUI7QUFBbkJBLFFBQUFBLE1BQW1CLEdBQVYsS0FBVTtBQUFBOztBQUNwRCxVQUFJLE1BQUtiLEtBQUwsQ0FBV2MscUJBQWYsRUFBc0M7QUFDcEMsWUFBTUMsUUFBUSxHQUFHRixNQUFNLEdBQUcsTUFBS0csY0FBUixHQUF5QixNQUFLRCxRQUFyRDtBQUNBLFlBQU1FLFNBQVMsR0FBRyxDQUFDQyxxQkFBVUMsSUFBWCxFQUFpQkQscUJBQVVFLEVBQTNCLEVBQStCRixxQkFBVUcsSUFBekMsRUFBK0NILHFCQUFVSSxLQUF6RCxDQUFsQjtBQUZvQywwQkFLaEMsTUFBS3RCLEtBTDJCO0FBQUEsWUFJbEN1QixPQUprQyxlQUlsQ0EsT0FKa0M7QUFBQSxZQUl6QnZELGNBSnlCLGVBSXpCQSxjQUp5QjtBQUFBLFlBSVRYLElBSlMsZUFJVEEsSUFKUztBQUFBLFlBSUhlLElBSkcsZUFJSEEsSUFKRztBQUFBLFlBSUdvRCxrQkFKSCxlQUlHQSxrQkFKSDs7QUFNcEMsWUFBTUMsV0FBVyxHQUFHNUMsc0JBQU1iLGNBQU4sQ0FBcUJ1RCxPQUFyQixFQUE4QnZELGNBQTlCLENBQXBCOztBQUNBLFlBQU0wRCxtQkFBbUIsR0FBRyxTQUF0QkEsbUJBQXNCLENBQUFDLENBQUM7QUFBQSxpQkFBSTlDLHNCQUFNK0MsWUFBTixDQUFtQkgsV0FBVyxDQUFDRSxDQUFELENBQTlCLENBQUo7QUFBQSxTQUE3Qjs7QUFDQSxZQUFNRSxRQUFRLEdBQUd6RCxJQUFJLENBQUNPLElBQXRCOztBQUNBLFlBQU02QixTQUFTLEdBQUczQixzQkFBTStDLFlBQU4sQ0FBbUJqQixHQUFuQixDQUFsQjs7QUFDQSxZQUFJbUIsV0FBVyxHQUFHZixRQUFRLENBQUkxRCxJQUFJLENBQUNJLEVBQVQsU0FBZStDLFNBQWYsU0FBNEJFLFFBQTVCLENBQTFCO0FBQ0EsWUFBSXFCLEtBQUssR0FBRyxJQUFaOztBQUVBLFlBQU1DLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0IsR0FBTTtBQUM1QixjQUFJRixXQUFXLENBQUNHLElBQVosS0FBcUIsTUFBekIsRUFBaUMsT0FBTyxJQUFQO0FBQ2pDLGlCQUFPSCxXQUFXLENBQUNJLGNBQVosS0FBK0IsQ0FBdEM7QUFDRCxTQUhEOztBQUtBLFlBQU1DLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsR0FBTTtBQUMxQixjQUFJTCxXQUFXLENBQUNHLElBQVosS0FBcUIsTUFBekIsRUFBaUMsT0FBTyxJQUFQO0FBQ2pDLGlCQUFPSCxXQUFXLENBQUNNLFlBQVosS0FBNkJOLFdBQVcsQ0FBQ08sS0FBWixDQUFrQkMsTUFBdEQ7QUFDRCxTQUhELENBbEJvQyxDQXVCcEM7OztBQUNBLFlBQUlSLFdBQVcsS0FBS0EsV0FBVyxDQUFDUyxTQUFaLElBQXlCLE9BQU9ULFdBQVcsQ0FBQ1UsTUFBbkIsS0FBOEIsUUFBNUQsQ0FBZixFQUFzRjtBQUNwRlQsVUFBQUEsS0FBSyxHQUFHRCxXQUFSO0FBQ0FBLFVBQUFBLFdBQVcsR0FBRyxNQUFLVyxZQUFMLENBQWtCVixLQUFsQixDQUFkO0FBQ0QsU0EzQm1DLENBNkJwQzs7O0FBQ0EsWUFBSWQsU0FBUyxDQUFDeUIsUUFBVixDQUFtQjlCLENBQUMsQ0FBQytCLE9BQXJCLEtBQWlDYixXQUFXLENBQUNHLElBQVosS0FBcUIsUUFBMUQsRUFBb0VyQixDQUFDLENBQUNnQyxjQUFGOztBQUNwRSxnQkFBUWhDLENBQUMsQ0FBQytCLE9BQVY7QUFDRSxlQUFLekIscUJBQVUyQixLQUFmO0FBQ0EsZUFBSzNCLHFCQUFVNEIsR0FBZjtBQUFvQjtBQUNsQixrQkFBSWpDLE1BQU0sSUFBSUQsQ0FBQyxDQUFDK0IsT0FBRixLQUFjekIscUJBQVUyQixLQUF0QyxFQUE2QztBQUMzQyxzQkFBSzdDLEtBQUwsQ0FBVytDLFVBQVgsQ0FBc0IxRixJQUF0QixFQUE0QndCLHNCQUFNbUUsc0JBQU4sQ0FBNkJ6QixPQUE3QixDQUE1Qjs7QUFDQSxzQkFBSzBCLGlCQUFMLEdBQXlCLElBQXpCO0FBQ0E7QUFDRDs7QUFDRG5CLGNBQUFBLFdBQVcsQ0FBQ1UsTUFBWjtBQUNBO0FBQ0Q7O0FBQ0QsZUFBS3RCLHFCQUFVQyxJQUFmO0FBQXFCO0FBQ25CLGtCQUFJK0IsV0FBVyxHQUFHbkMsUUFBUSxDQUFJMUQsSUFBSSxDQUFDSSxFQUFULFNBQWUrQyxTQUFmLFVBQTRCRSxRQUFRLEdBQUcsQ0FBdkMsRUFBMUIsQ0FEbUIsQ0FHbkI7O0FBQ0Esa0JBQUlxQixLQUFLLElBQUlBLEtBQUssQ0FBQ1EsU0FBZixJQUE0QixDQUFDUixLQUFLLENBQUNRLFNBQU4sQ0FBZ0JyRixLQUFoQixDQUFzQmlHLFVBQXZELEVBQW1FO0FBQ2pFdkMsZ0JBQUFBLENBQUMsQ0FBQ2dDLGNBQUY7QUFDQSxvQkFBSSxDQUFDTSxXQUFMLEVBQWtCO0FBQ2xCQSxnQkFBQUEsV0FBVyxHQUFHLE1BQUtULFlBQUwsQ0FBa0JTLFdBQWxCLENBQWQ7QUFDRDs7QUFDRCxvQkFBS0UsYUFBTCxDQUFtQkYsV0FBbkIsRUFBZ0N4QyxRQUFRLEdBQUcsQ0FBM0MsRUFBOEMsQ0FBQyxDQUEvQzs7QUFDQTtBQUNEOztBQUNELGVBQUtRLHFCQUFVRSxFQUFmO0FBQW1CO0FBQ2pCLGtCQUFJOEIsWUFBVyxHQUFHbkMsUUFBUSxDQUFJMUQsSUFBSSxDQUFDSSxFQUFULFNBQWUrQyxTQUFmLFVBQTRCRSxRQUFRLEdBQUcsQ0FBdkMsRUFBMUIsQ0FEaUIsQ0FHakI7O0FBQ0Esa0JBQUlxQixLQUFLLElBQUlBLEtBQUssQ0FBQ1EsU0FBZixJQUE0QixDQUFDUixLQUFLLENBQUNRLFNBQU4sQ0FBZ0JyRixLQUFoQixDQUFzQmlHLFVBQXZELEVBQW1FO0FBQ2pFdkMsZ0JBQUFBLENBQUMsQ0FBQ2dDLGNBQUY7QUFDQSxvQkFBSSxDQUFDTSxZQUFMLEVBQWtCO0FBQ2xCQSxnQkFBQUEsWUFBVyxHQUFHLE1BQUtULFlBQUwsQ0FBa0JTLFlBQWxCLENBQWQ7QUFDRDs7QUFDRCxvQkFBS0UsYUFBTCxDQUFtQkYsWUFBbkIsRUFBZ0N4QyxRQUFRLEdBQUcsQ0FBM0MsRUFBOEMsQ0FBQyxDQUEvQzs7QUFDQTtBQUNEOztBQUNELGVBQUtRLHFCQUFVbUMsR0FBZjtBQUNBLGVBQUtuQyxxQkFBVUksS0FBZjtBQUNBLGVBQUtKLHFCQUFVRyxJQUFmO0FBQXFCO0FBQ25CLGtCQUFJVCxDQUFDLENBQUMrQixPQUFGLEtBQWN6QixxQkFBVUksS0FBeEIsSUFBaUMsQ0FBQ2EsYUFBYSxFQUFuRCxFQUF1RDtBQUN2RCxrQkFBSXZCLENBQUMsQ0FBQytCLE9BQUYsS0FBY3pCLHFCQUFVRyxJQUF4QixJQUFnQyxDQUFDVyxlQUFlLEVBQXBELEVBQXdEO0FBRXhEcEIsY0FBQUEsQ0FBQyxDQUFDZ0MsY0FBRjtBQUVBLGtCQUFJVSxTQUFTLEdBQUc3QixXQUFXLENBQUM4QixTQUFaLENBQXNCLFVBQUFDLENBQUM7QUFBQSx1QkFBSUEsQ0FBQyxDQUFDQyxZQUFGLENBQWVDLElBQWYsQ0FBb0IsR0FBcEIsTUFBNkJsRCxTQUFqQztBQUFBLGVBQXZCLENBQWhCOztBQUNBLGtCQUFJOEMsU0FBUyxLQUFLLENBQUMsQ0FBbkIsRUFBc0I7QUFDcEIsb0JBQUlLLFFBQVEsR0FBRyxJQUFmO0FBQ0Esb0JBQUlULGFBQVcsR0FBRyxJQUFsQjtBQUNBLG9CQUFJVSxNQUFNLEdBQUdsRCxRQUFiOztBQUNBLHVCQUFPaUQsUUFBUCxFQUFpQjtBQUNmO0FBQ0Esc0JBQUkvQyxDQUFDLENBQUMrQixPQUFGLEtBQWN6QixxQkFBVUcsSUFBeEIsSUFBaUNULENBQUMsQ0FBQytCLE9BQUYsS0FBY3pCLHFCQUFVbUMsR0FBeEIsSUFBK0J6QyxDQUFDLENBQUNpRCxRQUF0RSxFQUFpRjtBQUMvRSx3QkFBSVAsU0FBUyxHQUFHLENBQVosSUFBaUIsQ0FBckIsRUFBd0I7QUFDdEJBLHNCQUFBQSxTQUFTLElBQUksQ0FBYjtBQUNELHFCQUZELE1BRU8sSUFBSU0sTUFBTSxHQUFHLENBQVQsSUFBYyxDQUFsQixFQUFxQjtBQUMxQk4sc0JBQUFBLFNBQVMsR0FBRzdCLFdBQVcsQ0FBQ2EsTUFBWixHQUFxQixDQUFqQztBQUNBc0Isc0JBQUFBLE1BQU0sSUFBSSxDQUFWO0FBQ0QscUJBSE0sTUFHQTtBQUNMO0FBQ0Q7QUFDRixtQkFURCxNQVNPO0FBQ0w7QUFDQSx3QkFBSU4sU0FBUyxHQUFHLENBQVosR0FBZ0I3QixXQUFXLENBQUNhLE1BQWhDLEVBQXdDO0FBQ3RDZ0Isc0JBQUFBLFNBQVMsSUFBSSxDQUFiO0FBQ0QscUJBRkQsTUFFTyxJQUFJTSxNQUFNLEdBQUcsQ0FBVCxHQUFhL0IsUUFBakIsRUFBMkI7QUFDaEN5QixzQkFBQUEsU0FBUyxHQUFHLENBQVo7QUFDQU0sc0JBQUFBLE1BQU0sSUFBSSxDQUFWO0FBQ0QscUJBSE0sTUFHQSxJQUFJQSxNQUFNLEdBQUcsQ0FBVCxLQUFlL0IsUUFBbkIsRUFBNkI7QUFDbEM7QUFDQSwwQkFBSUwsa0JBQWtCLElBQUlaLENBQUMsQ0FBQytCLE9BQUYsS0FBY3pCLHFCQUFVbUMsR0FBbEQsRUFBdUQ3QixrQkFBa0IsQ0FBQ1osQ0FBRCxDQUFsQjtBQUN2RDtBQUNEO0FBQ0Y7O0FBRURzQyxrQkFBQUEsYUFBVyxHQUFHbkMsUUFBUSxDQUFJMUQsSUFBSSxDQUFDSSxFQUFULFNBQWVpRSxtQkFBbUIsQ0FBQzRCLFNBQUQsQ0FBbEMsU0FBaURNLE1BQWpELENBQXRCLENBekJlLENBMkJmOztBQUNBLHNCQUFJLENBQUNWLGFBQUQsSUFBZ0J0QyxDQUFDLENBQUMrQixPQUFGLEtBQWN6QixxQkFBVUcsSUFBNUMsRUFBa0Q7QUFDaEQ7QUFDQSx3QkFBSWlDLFNBQVMsSUFBSTdCLFdBQVcsQ0FBQ2EsTUFBN0IsRUFBcUM7QUFDbkMsNkJBQU9nQixTQUFTLElBQUk3QixXQUFXLENBQUNhLE1BQXpCLElBQW1DLENBQUNZLGFBQTNDLEVBQXdEO0FBQ3REQSx3QkFBQUEsYUFBVyxHQUFHbkMsUUFBUSxDQUFJMUQsSUFBSSxDQUFDSSxFQUFULFNBQWVpRSxtQkFBbUIsQ0FBQzRCLFNBQUQsQ0FBbEMsU0FBaURNLE1BQWpELENBQXRCO0FBQ0FOLHdCQUFBQSxTQUFTLElBQUksQ0FBYixDQUZzRCxDQUl0RDtBQUNBOztBQUNBLDRCQUFJLENBQUNKLGFBQUQsSUFBZ0JJLFNBQVMsS0FBSzdCLFdBQVcsQ0FBQ2EsTUFBOUMsRUFBc0Q7QUFDcEQ7QUFDQSw4QkFBSXNCLE1BQU0sR0FBRyxDQUFULEtBQWUvQixRQUFuQixFQUE2QjtBQUMzQixnQ0FBSUwsa0JBQWtCLElBQUlaLENBQUMsQ0FBQytCLE9BQUYsS0FBY3pCLHFCQUFVbUMsR0FBbEQsRUFBdUQ7QUFDckQ3Qiw4QkFBQUEsa0JBQWtCLENBQUNaLENBQUQsQ0FBbEI7QUFDRDs7QUFDRDtBQUNEOztBQUVEMEMsMEJBQUFBLFNBQVMsR0FBRyxDQUFaO0FBQ0FNLDBCQUFBQSxNQUFNLElBQUksQ0FBVjtBQUNBViwwQkFBQUEsYUFBVyxHQUFHbkMsUUFBUSxDQUFJMUQsSUFBSSxDQUFDSSxFQUFULFNBQWVpRSxtQkFBbUIsQ0FBQzRCLFNBQUQsQ0FBbEMsU0FBaURNLE1BQWpELENBQXRCO0FBQ0Q7QUFDRjtBQUNGLHFCQXZCK0MsQ0F3QmhEOztBQUNELG1CQXpCRCxNQXlCTyxJQUFJLENBQUNWLGFBQUQsSUFBZ0J0QyxDQUFDLENBQUMrQixPQUFGLEtBQWN6QixxQkFBVUcsSUFBNUMsRUFBa0Q7QUFDdkQsMkJBQU9pQyxTQUFTLEdBQUcsQ0FBWixJQUFpQixDQUFDSixhQUF6QixFQUFzQztBQUNwQ0ksc0JBQUFBLFNBQVMsSUFBSSxDQUFiO0FBQ0FKLHNCQUFBQSxhQUFXLEdBQUduQyxRQUFRLENBQUkxRCxJQUFJLENBQUNJLEVBQVQsU0FBZWlFLG1CQUFtQixDQUFDNEIsU0FBRCxDQUFsQyxTQUFpRE0sTUFBakQsQ0FBdEI7QUFDRCxxQkFKc0QsQ0FLdkQ7QUFDQTs7O0FBQ0Esd0JBQUlBLE1BQU0sR0FBRyxDQUFULElBQWMsQ0FBQ1YsYUFBbkIsRUFBZ0M7QUFDOUJJLHNCQUFBQSxTQUFTLEdBQUc3QixXQUFXLENBQUNhLE1BQVosR0FBcUIsQ0FBakM7QUFDQXNCLHNCQUFBQSxNQUFNLElBQUksQ0FBVjtBQUNBVixzQkFBQUEsYUFBVyxHQUFHbkMsUUFBUSxDQUFJMUQsSUFBSSxDQUFDSSxFQUFULFNBQWVpRSxtQkFBbUIsQ0FBQzRCLFNBQUQsQ0FBbEMsU0FBaURNLE1BQWpELENBQXRCO0FBQ0Q7QUFDRjs7QUFDREQsa0JBQUFBLFFBQVEsR0FBR1QsYUFBVyxHQUFHQSxhQUFXLENBQUNTLFFBQWYsR0FBMEIsS0FBaEQ7QUFDRDs7QUFDRCxvQkFBSSxDQUFDQSxRQUFELElBQWFULGFBQWpCLEVBQThCO0FBQzVCLHNCQUFJLE9BQU9BLGFBQVcsQ0FBQ1YsTUFBbkIsS0FBOEIsUUFBOUIsSUFBMENVLGFBQVcsQ0FBQ1gsU0FBMUQsRUFBcUU7QUFDbkVXLG9CQUFBQSxhQUFXLEdBQUcsTUFBS1QsWUFBTCxDQUFrQlMsYUFBbEIsQ0FBZDtBQUNEOztBQUNELHdCQUFLRSxhQUFMLENBQW1CRixhQUFuQixFQUFnQ1UsTUFBaEMsRUFBd0NOLFNBQXhDO0FBQ0Q7QUFDRjs7QUFDRDtBQUNEOztBQUNEO0FBQ0U7QUE5SEo7QUFnSUQ7QUFDRixLQXpNa0I7O0FBQUEsd0VBMk1DLFVBQUM1QyxRQUFELEVBQVdDLEdBQVg7QUFBQSxhQUFtQixVQUFDQyxDQUFELEVBQU87QUFDNUMsY0FBS2tELGFBQUwsQ0FBbUJwRCxRQUFuQixFQUE2QkMsR0FBN0IsRUFBa0NDLENBQWxDO0FBQ0QsT0FGbUI7QUFBQSxLQTNNRDs7QUFBQSwwRUErTUcsVUFBQ0YsUUFBRCxFQUFXQyxHQUFYO0FBQUEsYUFBbUIsVUFBQ0MsQ0FBRCxFQUFPO0FBQzlDLGNBQUtrRCxhQUFMLENBQW1CcEQsUUFBbkIsRUFBNkJDLEdBQTdCLEVBQWtDQyxDQUFsQyxFQUFxQyxJQUFyQztBQUNELE9BRnFCO0FBQUEsS0EvTUg7O0FBQUEsOEVBbU5PLFVBQUNELEdBQUQsRUFBTW9ELFdBQU47QUFBQSxhQUFzQixVQUFDQyxXQUFELEVBQWlCO0FBQy9ELFlBQUlDLFFBQUosQ0FEK0QsQ0FFL0Q7O0FBQ0EsWUFBSUQsV0FBSixFQUFpQjtBQUNmLGNBQUlBLFdBQVcsQ0FBQ0UsTUFBWixLQUF1QkMsU0FBM0IsRUFBc0M7QUFDcENGLFlBQUFBLFFBQVEsR0FBR0QsV0FBVyxDQUFDRSxNQUFaLENBQW1CN0IsS0FBOUI7QUFDRCxXQUZELE1BRU8sSUFBSTJCLFdBQVcsQ0FBQzNCLEtBQVosS0FBc0I4QixTQUExQixFQUFxQztBQUMxQ0YsWUFBQUEsUUFBUSxHQUFHRCxXQUFXLENBQUMzQixLQUF2QjtBQUNELFdBRk0sTUFFQTtBQUNMNEIsWUFBQUEsUUFBUSxHQUFHRCxXQUFYO0FBQ0Q7QUFDRjs7QUFDRCxZQUFNM0IsS0FBSyxHQUFHMEIsV0FBVyxDQUFDRSxRQUFELENBQXpCOztBQUNBLGNBQUtqRSxLQUFMLENBQVdvRSxxQkFBWCxDQUFpQyxNQUFLcEUsS0FBTCxDQUFXM0MsSUFBNUMsRUFBa0QsTUFBSzJDLEtBQUwsQ0FBV3VCLE9BQTdELEVBQXNFWixHQUF0RSxFQUEyRTBCLEtBQTNFO0FBQ0QsT0FkeUI7QUFBQSxLQW5OUDs7QUFBQSw4RUFtT08sVUFBQzNCLFFBQUQsRUFBV0MsR0FBWCxFQUFnQm9ELFdBQWhCO0FBQUEsYUFBZ0MsVUFBQ0MsV0FBRCxFQUFpQjtBQUN6RSxZQUFJQyxRQUFKLENBRHlFLENBRXpFOztBQUNBLFlBQUlELFdBQUosRUFBaUI7QUFDZixjQUFJQSxXQUFXLENBQUNFLE1BQVosS0FBdUJDLFNBQTNCLEVBQXNDO0FBQ3BDRixZQUFBQSxRQUFRLEdBQUdELFdBQVcsQ0FBQ0UsTUFBWixDQUFtQjdCLEtBQTlCO0FBQ0QsV0FGRCxNQUVPLElBQUkyQixXQUFXLENBQUMzQixLQUFaLEtBQXNCOEIsU0FBMUIsRUFBcUM7QUFDMUNGLFlBQUFBLFFBQVEsR0FBR0QsV0FBVyxDQUFDM0IsS0FBdkI7QUFDRCxXQUZNLE1BRUE7QUFDTDRCLFlBQUFBLFFBQVEsR0FBR0QsV0FBWDtBQUNEO0FBQ0Y7O0FBQ0QsWUFBTTNCLEtBQUssR0FBRzBCLFdBQVcsQ0FBQ0UsUUFBRCxDQUF6Qjs7QUFFQSxjQUFLakUsS0FBTCxDQUFXcUUscUJBQVgsQ0FBaUMsTUFBS3JFLEtBQUwsQ0FBVzNDLElBQTVDLEVBQWtEcUQsUUFBbEQsRUFBNERDLEdBQUcsQ0FBQzhDLFlBQWhFLEVBQThFcEIsS0FBOUU7O0FBQ0EsWUFBSTFCLEdBQUcsQ0FBQzJELG1CQUFSLEVBQTZCO0FBQzNCM0QsVUFBQUEsR0FBRyxDQUFDMkQsbUJBQUosQ0FBd0JqQyxLQUF4QixFQUErQjFCLEdBQUcsQ0FBQzhDLFlBQW5DLEVBQWlEL0MsUUFBakQ7QUFDRDs7QUFDRCxZQUFJQyxHQUFHLENBQUM0RCx1QkFBSixJQUErQmxDLEtBQUssS0FBSzFCLEdBQUcsQ0FBQzRELHVCQUFKLENBQTRCQyxVQUF6RSxFQUFxRjtBQUNuRjtBQUNBLGdCQUFLQyx1QkFBTCxDQUNFL0QsUUFERixFQUVFO0FBQUUrQyxZQUFBQSxZQUFZLEVBQUU5QyxHQUFHLENBQUM0RCx1QkFBSixDQUE0Qkc7QUFBNUMsV0FGRixFQUdFLFVBQUFDLENBQUM7QUFBQSxtQkFBSUEsQ0FBSjtBQUFBLFdBSEgsRUFJRWhFLEdBQUcsQ0FBQzRELHVCQUFKLENBQTRCSyxRQUo5QjtBQUtEOztBQUNELFlBQUlqRSxHQUFHLENBQUNrRSxVQUFSLEVBQW9CO0FBQ2xCLGdCQUFLN0UsS0FBTCxDQUFXOEUsdUJBQVgsQ0FDRSxNQUFLOUUsS0FBTCxDQUFXM0MsSUFEYixFQUVFcUQsUUFGRixFQUdFQyxHQUFHLENBQUM4QyxZQUhOLEVBSUVwQixLQUpGLEVBS0UxQixHQUFHLENBQUNrRSxVQUxOO0FBT0Q7QUFDRixPQW5DeUI7QUFBQSxLQW5PUDs7QUFBQSw0RUF3UUssVUFBQ25FLFFBQUQsRUFBV0MsR0FBWCxFQUFnQm9ELFdBQWhCO0FBQUEsYUFBZ0MsVUFBQ0MsV0FBRCxFQUFpQjtBQUN2RSxZQUFNZSxNQUFNLEdBQUcsTUFBS0MsbUJBQUwsQ0FBeUJ0RSxRQUF6QixDQUFmOztBQUNBLFlBQUl1RCxRQUFKLENBRnVFLENBR3ZFOztBQUNBLFlBQUlELFdBQUosRUFBaUI7QUFDZixjQUFJQSxXQUFXLENBQUNFLE1BQVosS0FBdUJDLFNBQTNCLEVBQXNDO0FBQ3BDRixZQUFBQSxRQUFRLEdBQUdELFdBQVcsQ0FBQ0UsTUFBWixDQUFtQjdCLEtBQTlCO0FBQ0QsV0FGRCxNQUVPLElBQUkyQixXQUFXLENBQUMzQixLQUFaLEtBQXNCOEIsU0FBMUIsRUFBcUM7QUFDMUNGLFlBQUFBLFFBQVEsR0FBR0QsV0FBVyxDQUFDM0IsS0FBdkI7QUFDRCxXQUZNLE1BRUE7QUFDTDRCLFlBQUFBLFFBQVEsR0FBR0QsV0FBWDtBQUNEO0FBQ0Y7O0FBQ0QsWUFBTTNCLEtBQUssR0FBRzBCLFdBQVcsQ0FBQ0UsUUFBRCxDQUF6Qjs7QUFDQSxjQUFLakUsS0FBTCxDQUFXaUYsbUJBQVgsQ0FBK0IsTUFBS2pGLEtBQUwsQ0FBVzNDLElBQTFDLEVBQWdEMEgsTUFBaEQsRUFBd0RwRSxHQUFHLENBQUM4QyxZQUE1RCxFQUEwRXBCLEtBQTFFOztBQUNBLFlBQUkxQixHQUFHLENBQUN1RSxpQkFBUixFQUEyQjtBQUN6QnZFLFVBQUFBLEdBQUcsQ0FBQ3VFLGlCQUFKLENBQXNCN0MsS0FBdEIsRUFBNkIxQixHQUFHLENBQUM4QyxZQUFqQyxFQUErQy9DLFFBQS9DLEVBQXlEcUUsTUFBekQ7QUFDRDs7QUFDRCxZQUFJcEUsR0FBRyxDQUFDNEQsdUJBQUosSUFBK0JsQyxLQUFLLEtBQUsxQixHQUFHLENBQUM0RCx1QkFBSixDQUE0QkMsVUFBekUsRUFBcUY7QUFDbkY7QUFDQSxnQkFBS1cscUJBQUwsQ0FDRXpFLFFBREYsRUFFRTtBQUFFK0MsWUFBQUEsWUFBWSxFQUFFOUMsR0FBRyxDQUFDNEQsdUJBQUosQ0FBNEJHO0FBQTVDLFdBRkYsRUFHRSxVQUFBQyxDQUFDO0FBQUEsbUJBQUlBLENBQUo7QUFBQSxXQUhILEVBSUVoRSxHQUFHLENBQUM0RCx1QkFBSixDQUE0QkssUUFKOUI7QUFLRDs7QUFDRCxZQUFJakUsR0FBRyxDQUFDa0UsVUFBUixFQUFvQjtBQUNsQixnQkFBSzdFLEtBQUwsQ0FBV29GLHFCQUFYLENBQ0UsTUFBS3BGLEtBQUwsQ0FBVzNDLElBRGIsRUFFRTBILE1BRkYsRUFHRXBFLEdBQUcsQ0FBQzhDLFlBSE4sRUFJRXBCLEtBSkYsRUFLRTFCLEdBQUcsQ0FBQ2tFLFVBTE47QUFPRDtBQUNGLE9BbkN1QjtBQUFBLEtBeFFMOztBQUFBLHVFQTZTQSxVQUFDbkUsUUFBRCxFQUFXQyxHQUFYLEVBQWdCb0QsV0FBaEI7QUFBQSxhQUFnQyxVQUFDbkQsQ0FBRCxFQUFPO0FBQ3hELFlBQUlELEdBQUcsQ0FBQzBFLFlBQVIsRUFBc0I7QUFDcEIsY0FBSWhELEtBQUssR0FBR3pCLENBQUMsSUFBSUEsQ0FBQyxDQUFDc0QsTUFBUCxJQUFpQnRELENBQUMsQ0FBQ3NELE1BQUYsQ0FBUzdCLEtBQVQsS0FBbUI4QixTQUFwQyxHQUNSdkQsQ0FBQyxDQUFDc0QsTUFBRixDQUFTN0IsS0FERCxHQUVSLE1BQUtpRCxnQkFBTCxDQUFzQjVFLFFBQXRCLEVBQWdDQyxHQUFoQyxDQUZKOztBQUdBLGNBQUlvRCxXQUFXLEtBQUtJLFNBQXBCLEVBQStCO0FBQzdCOUIsWUFBQUEsS0FBSyxHQUFHMEIsV0FBVyxDQUFDMUIsS0FBRCxDQUFuQjtBQUNEOztBQUNEMUIsVUFBQUEsR0FBRyxDQUFDMEUsWUFBSixDQUFpQmhELEtBQWpCLEVBQXdCM0IsUUFBeEI7QUFDRDtBQUNGLE9BVmtCO0FBQUEsS0E3U0E7O0FBQUEscUVBeVRGLFVBQUNBLFFBQUQsRUFBV0MsR0FBWCxFQUFnQm9ELFdBQWhCO0FBQUEsYUFBZ0MsVUFBQ25ELENBQUQsRUFBTztBQUN0RCxZQUFJRCxHQUFHLENBQUM0RSxVQUFSLEVBQW9CO0FBQ2xCLGNBQUlsRCxLQUFLLEdBQUd6QixDQUFDLElBQUlBLENBQUMsQ0FBQ3NELE1BQVAsSUFBaUJ0RCxDQUFDLENBQUNzRCxNQUFGLENBQVM3QixLQUFULEtBQW1COEIsU0FBcEMsR0FDUnZELENBQUMsQ0FBQ3NELE1BQUYsQ0FBUzdCLEtBREQsR0FFUixNQUFLaUQsZ0JBQUwsQ0FBc0I1RSxRQUF0QixFQUFnQ0MsR0FBaEMsQ0FGSjs7QUFHQSxjQUFJb0QsV0FBVyxLQUFLSSxTQUFwQixFQUErQjtBQUM3QjlCLFlBQUFBLEtBQUssR0FBRzBCLFdBQVcsQ0FBQzFCLEtBQUQsQ0FBbkI7QUFDRDs7QUFDRCxjQUFNMEMsTUFBTSxHQUFHLE1BQUtDLG1CQUFMLENBQXlCdEUsUUFBekIsQ0FBZjs7QUFDQUMsVUFBQUEsR0FBRyxDQUFDNEUsVUFBSixDQUFlbEQsS0FBZixFQUFzQjNCLFFBQXRCLEVBQWdDcUUsTUFBaEM7QUFDRDtBQUNGLE9BWGdCO0FBQUEsS0F6VEU7O0FBQUEsa0VBc1VMLFVBQUNTLFFBQUQsRUFBV0MsU0FBWCxFQUFzQi9FLFFBQXRCLEVBQWdDRixTQUFoQztBQUFBLGFBQThDLFVBQUNJLENBQUQsRUFBTztBQUFBLDJCQUc3RCxNQUFLWixLQUh3RDtBQUFBLFlBRS9EMEYsbUJBRitELGdCQUUvREEsbUJBRitEO0FBQUEsWUFFMUNDLFVBRjBDLGdCQUUxQ0EsVUFGMEM7QUFBQSxZQUU5QnRJLElBRjhCLGdCQUU5QkEsSUFGOEI7QUFBQSxZQUV4QkssU0FGd0IsZ0JBRXhCQSxTQUZ3QjtBQUlqRSxZQUFJQSxTQUFKLEVBQWU7O0FBRWYsWUFBSStILFNBQVMsS0FBSyxRQUFsQixFQUE0QjtBQUMxQjdFLFVBQUFBLENBQUMsQ0FBQ3NELE1BQUYsQ0FBUzFCLE1BQVQ7QUFDRDs7QUFDRCxZQUFJZ0QsUUFBUSxLQUFLLE1BQWIsSUFBdUJHLFVBQTNCLEVBQXVDO0FBQ3JDRCxVQUFBQSxtQkFBbUIsQ0FDakJySSxJQURpQixFQUVqQixvQkFBSTtBQUNGcUQsWUFBQUEsUUFBUSxFQUFSQSxRQURFO0FBRUZGLFlBQUFBLFNBQVMsRUFBVEE7QUFGRSxXQUFKLENBRmlCLENBQW5CO0FBT0Q7QUFDRixPQWxCYTtBQUFBLEtBdFVLOztBQUFBLG1FQTBWSixVQUFDb0YsU0FBRCxFQUFlO0FBQzVCLFVBQUksQ0FBQ0EsU0FBTCxFQUFnQixPQUFPLElBQVA7O0FBQ2hCLFVBQUlBLFNBQVMsQ0FBQ3BELE1BQVYsSUFBb0JvRCxTQUFTLENBQUNwRCxNQUFWLENBQWlCcUQsUUFBekMsRUFBbUQ7QUFDakQsZUFBT0QsU0FBUyxDQUFDcEQsTUFBVixDQUFpQnFELFFBQXhCO0FBQ0Q7O0FBQ0QsVUFBSUQsU0FBUyxDQUFDcEQsTUFBVixJQUFvQm9ELFNBQVMsQ0FBQ3BELE1BQVYsQ0FBaUJBLE1BQXpDLEVBQWlEO0FBQy9DLGVBQU9vRCxTQUFTLENBQUNwRCxNQUFWLENBQWlCQSxNQUFqQixDQUF3QnFELFFBQS9CO0FBQ0Q7O0FBQ0QsVUFBSUQsU0FBUyxDQUFDckQsU0FBVixJQUF1QnFELFNBQVMsQ0FBQ3JELFNBQVYsQ0FBb0JDLE1BQXBCLENBQTJCQSxNQUF0RCxFQUE4RDtBQUM1RCxlQUFPb0QsU0FBUyxDQUFDckQsU0FBVixDQUFvQkMsTUFBcEIsQ0FBMkJBLE1BQTNCLENBQWtDcUQsUUFBekM7QUFDRDs7QUFDRCxhQUFPRCxTQUFTLENBQUNyRCxTQUFWLENBQW9CQyxNQUFwQixDQUEyQnFELFFBQWxDO0FBQ0QsS0F0V2tCOztBQUFBLDBFQXdXRyxVQUFBbkYsUUFBUTtBQUFBLGFBQUksTUFBS1YsS0FBTCxDQUFXNUIsSUFBWCxDQUFnQlosS0FBaEIsRUFBdUJrRCxRQUF2QixTQUFvQyxNQUFLVixLQUFMLENBQVczQyxJQUFYLENBQWdCeUksU0FBcEQsRUFBSjtBQUFBLEtBeFdYOztBQUFBLDJFQTBXSSxVQUFDckksRUFBRCxFQUFRO0FBQzdCLFVBQUksQ0FBQ0EsRUFBTCxFQUFTLE9BQU8wRyxTQUFQOztBQUNULFVBQU00QixLQUFLLEdBQUcsTUFBSy9GLEtBQUwsQ0FBVzVCLElBQVgsQ0FBZ0JtRixTQUFoQixDQUEwQixVQUFBb0IsQ0FBQztBQUFBLGVBQUlBLENBQUMsQ0FBQ25ILEtBQUYsQ0FBUSxNQUFLd0MsS0FBTCxDQUFXM0MsSUFBWCxDQUFnQnlJLFNBQXhCLE1BQXVDckksRUFBM0M7QUFBQSxPQUEzQixDQUFkOztBQUNBLGFBQU9zSSxLQUFLLEtBQUssQ0FBQyxDQUFYLEdBQWU1QixTQUFmLEdBQTJCNEIsS0FBbEM7QUFDRCxLQTlXa0I7O0FBQUEsdUVBZ1hBLFVBQUNyRixRQUFELEVBQVdDLEdBQVgsRUFBZ0JxRixPQUFoQixFQUFpQztBQUFBLFVBQWpCQSxPQUFpQjtBQUFqQkEsUUFBQUEsT0FBaUIsR0FBUCxFQUFPO0FBQUE7O0FBQ2xEO0FBQ0EsVUFBTXZJLEVBQUUsR0FBRyxNQUFLdUgsbUJBQUwsQ0FBeUJ0RSxRQUF6QixDQUFYOztBQUNBLFVBQU11RixTQUFTLEdBQUcsTUFBS2pHLEtBQUwsQ0FBVzNCLFFBQVgsQ0FBb0JiLEtBQXBCLEVBQTJCQyxFQUEzQixTQUFrQ2tELEdBQUcsQ0FBQzhDLFlBQXRDLEdBQXFEVSxTQUFyRCxDQUFsQjs7QUFDQSxVQUFJK0IsYUFBSjs7QUFDQSxVQUFJRCxTQUFTLEtBQUs5QixTQUFsQixFQUE2QjtBQUMzQitCLFFBQUFBLGFBQWEsR0FBRyxNQUFLbEcsS0FBTCxDQUFXNUIsSUFBWCxDQUFnQlosS0FBaEIsRUFBdUJrRCxRQUF2QixTQUFvQ0MsR0FBRyxDQUFDOEMsWUFBeEMsR0FBdUQsRUFBdkQsQ0FBaEI7QUFDRCxPQUZELE1BRU8sSUFBSXdDLFNBQVMsS0FBSyxJQUFsQixFQUF3QjtBQUM3QixlQUFPLEVBQVA7QUFDRCxPQUZNLE1BRUE7QUFDTDtBQUNBO0FBQ0EsZ0JBQVF0RixHQUFHLENBQUN3RixhQUFaO0FBQ0UsZUFBSyxhQUFMO0FBQ0EsZUFBSyxRQUFMO0FBQ0UsbUJBQU9ILE9BQU8sQ0FBQ0ksYUFBUixDQUFzQkMsSUFBdEIsQ0FBMkIsVUFBQUMsR0FBRztBQUFBLHFCQUFJQSxHQUFHLENBQUNqRSxLQUFKLEtBQWM0RCxTQUFsQjtBQUFBLGFBQTlCLENBQVA7O0FBQ0YsZUFBSyxTQUFMO0FBQ0UsbUJBQU9ELE9BQU8sQ0FBQ0ssSUFBUixDQUFhLFVBQUFDLEdBQUc7QUFBQSxxQkFBSUEsR0FBRyxDQUFDakUsS0FBSixLQUFjNEQsU0FBbEI7QUFBQSxhQUFoQixDQUFQOztBQUNGO0FBQ0UsbUJBQU9BLFNBQVA7QUFQSjtBQVNEOztBQUNELFVBQUlDLGFBQWEsS0FBSyxJQUFsQixJQUEwQkEsYUFBYSxLQUFLL0IsU0FBNUMsSUFBeUQrQixhQUFhLEtBQUssRUFBL0UsRUFBbUY7QUFDakYsZUFBTyxFQUFQO0FBQ0QsT0F4QmlELENBeUJsRDtBQUNBOzs7QUFDQSxjQUFRdkYsR0FBRyxDQUFDd0YsYUFBWjtBQUNFLGFBQUssT0FBTDtBQUFjO0FBQ1osZ0JBQUlJLE1BQU0sQ0FBQ0wsYUFBRCxDQUFOLENBQXNCNUQsTUFBdEIsR0FBK0IsQ0FBbkMsRUFBc0M7QUFDcEMscUJBQU9pRSxNQUFNLENBQUNMLGFBQUQsQ0FBTixDQUFzQk0sT0FBdEIsQ0FBOEIsR0FBOUIsRUFBbUMsTUFBS3hHLEtBQUwsQ0FBV1YsZ0JBQTlDLENBQVA7QUFDRDs7QUFDRCxtQkFBTzRHLGFBQVA7QUFDRDs7QUFDRCxhQUFLLGFBQUw7QUFDQSxhQUFLLFFBQUw7QUFDRSxpQkFBT0YsT0FBTyxDQUFDSSxhQUFSLENBQXNCQyxJQUF0QixDQUEyQixVQUFBQyxHQUFHO0FBQUEsbUJBQUlBLEdBQUcsQ0FBQ2pFLEtBQUosS0FBYzZELGFBQWxCO0FBQUEsV0FBOUIsQ0FBUDs7QUFDRixhQUFLLFNBQUw7QUFDRSxpQkFBT0YsT0FBTyxDQUFDSyxJQUFSLENBQWEsVUFBQUMsR0FBRztBQUFBLG1CQUFJQSxHQUFHLENBQUNqRSxLQUFKLEtBQWM2RCxhQUFsQjtBQUFBLFdBQWhCLENBQVA7O0FBQ0Y7QUFDRSxpQkFBT0EsYUFBUDtBQWJKO0FBZUQsS0ExWmtCOztBQUFBLHlFQTRaRSxVQUFDeEYsUUFBRCxFQUFXQyxHQUFYLEVBQWdCcUYsT0FBaEIsRUFBaUM7QUFBQSxVQUFqQkEsT0FBaUI7QUFBakJBLFFBQUFBLE9BQWlCLEdBQVAsRUFBTztBQUFBOztBQUNwRCxVQUFNUyxHQUFHLEdBQUcsTUFBS3pHLEtBQUwsQ0FBVzFCLFVBQVgsQ0FBc0JkLEtBQXRCLEVBQTZCa0QsUUFBN0IsU0FBMENDLEdBQUcsQ0FBQzhDLFlBQTlDLEdBQTZELEVBQTdELENBQVo7O0FBQ0EsVUFBSWdELEdBQUcsS0FBSyxJQUFaLEVBQWtCO0FBQ2hCLGVBQU8sRUFBUDtBQUNEOztBQUNELFVBQUk5RixHQUFHLENBQUN3RixhQUFKLEtBQXNCLFFBQXRCLElBQWtDeEYsR0FBRyxDQUFDd0YsYUFBSixLQUFzQixhQUE1RCxFQUEyRTtBQUN6RSxlQUFPSCxPQUFPLENBQUNJLGFBQVIsQ0FBc0JDLElBQXRCLENBQTJCLFVBQUFDLEdBQUc7QUFBQSxpQkFBSUEsR0FBRyxDQUFDakUsS0FBSixLQUFjb0UsR0FBbEI7QUFBQSxTQUE5QixDQUFQO0FBQ0Q7O0FBQ0QsVUFBSSxDQUFDLFNBQUQsRUFBWS9ELFFBQVosQ0FBcUIvQixHQUFHLENBQUN3RixhQUF6QixDQUFKLEVBQTZDO0FBQzNDLGVBQU9ILE9BQU8sQ0FBQ0ssSUFBUixDQUFhLFVBQUFDLEdBQUc7QUFBQSxpQkFBSUEsR0FBRyxDQUFDakUsS0FBSixLQUFjb0UsR0FBbEI7QUFBQSxTQUFoQixDQUFQO0FBQ0Q7O0FBQ0QsYUFBT0EsR0FBUDtBQUNELEtBeGFrQjs7QUFBQSx5RUEwYUUsVUFBQzlGLEdBQUQsRUFBTXFGLE9BQU4sRUFBdUI7QUFBQSxVQUFqQkEsT0FBaUI7QUFBakJBLFFBQUFBLE9BQWlCLEdBQVAsRUFBTztBQUFBOztBQUMxQyxVQUFNUyxHQUFHLEdBQUcsTUFBS3pHLEtBQUwsQ0FBV3pCLFVBQVgsQ0FBc0JrQixHQUF0QixDQUEwQlosc0JBQU0rQyxZQUFOLENBQW1CakIsR0FBbkIsQ0FBMUIsRUFBbUQsRUFBbkQsQ0FBWjs7QUFDQSxVQUFJOEYsR0FBRyxLQUFLLElBQVosRUFBa0I7QUFDaEIsZUFBTyxFQUFQO0FBQ0Q7O0FBQ0QsVUFBSTlGLEdBQUcsQ0FBQ3dGLGFBQUosS0FBc0IsUUFBMUIsRUFBb0M7QUFDbEMsZUFBT0gsT0FBTyxDQUFDSSxhQUFSLENBQXNCQyxJQUF0QixDQUEyQixVQUFBQyxHQUFHO0FBQUEsaUJBQUlBLEdBQUcsQ0FBQ2pFLEtBQUosS0FBY29FLEdBQWxCO0FBQUEsU0FBOUIsQ0FBUDtBQUNEOztBQUNELFVBQUksQ0FBQyxVQUFELEVBQWEsU0FBYixFQUF3Qi9ELFFBQXhCLENBQWlDL0IsR0FBRyxDQUFDd0YsYUFBckMsQ0FBSixFQUF5RDtBQUN2RCxlQUFPSCxPQUFPLENBQUNLLElBQVIsQ0FBYSxVQUFBQyxHQUFHO0FBQUEsaUJBQUlBLEdBQUcsQ0FBQ2pFLEtBQUosS0FBY29FLEdBQWxCO0FBQUEsU0FBaEIsQ0FBUDtBQUNEOztBQUNELFVBQUk5RixHQUFHLENBQUN3RixhQUFKLEtBQXNCLGFBQTFCLEVBQXlDO0FBQ3ZDO0FBQ0E7QUFDQSxlQUFPTSxHQUFHLElBQUlBLEdBQUcsQ0FBQ0MsSUFBWCxHQUFrQkQsR0FBRyxDQUFDQyxJQUFKLEVBQWxCLEdBQStCRCxHQUFHLElBQUksRUFBN0M7QUFDRDs7QUFDRCxhQUFPQSxHQUFQO0FBQ0QsS0EzYmtCOztBQUFBLGdGQTZiUyxVQUFDL0YsUUFBRCxFQUFXQyxHQUFYLEVBQWdCZ0csSUFBaEIsRUFBeUI7QUFDbkQsVUFBSUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDakcsR0FBRyxDQUFDa0csY0FBOUIsQ0FEbUQsQ0FFbkQ7O0FBQ0EsVUFBSSxDQUFDRCxpQkFBRCxJQUFzQmpHLEdBQUcsQ0FBQ21HLDBCQUE5QixFQUEwRDtBQUN4RCxZQUFJSCxJQUFJLEtBQUssUUFBYixFQUF1QjtBQUNyQkMsVUFBQUEsaUJBQWlCLEdBQUcsTUFBS0csa0JBQUwsQ0FBd0JyRyxRQUF4QixFQUFrQztBQUNwRCtDLFlBQUFBLFlBQVksRUFBRTlDLEdBQUcsQ0FBQ21HLDBCQUFKLENBQStCRTtBQURPLFdBQWxDLE1BRWJyRyxHQUFHLENBQUNtRywwQkFBSixDQUErQnRDLFVBRnRDO0FBR0QsU0FKRCxNQUlPO0FBQ0xvQyxVQUFBQSxpQkFBaUIsR0FBRyxNQUFLdEIsZ0JBQUwsQ0FBc0I1RSxRQUF0QixFQUFnQztBQUNsRCtDLFlBQUFBLFlBQVksRUFBRTlDLEdBQUcsQ0FBQ21HLDBCQUFKLENBQStCRTtBQURLLFdBQWhDLE1BRWJyRyxHQUFHLENBQUNtRywwQkFBSixDQUErQnRDLFVBRnRDO0FBR0Q7QUFDRjs7QUFDRCxhQUFPb0MsaUJBQVA7QUFDRCxLQTVja0I7O0FBQUEsc0VBOGNELFVBQUNsRyxRQUFELEVBQWM7QUFBQSx5QkFHMUIsTUFBS1YsS0FIcUI7QUFBQSxVQUU1QjNDLElBRjRCLGdCQUU1QkEsSUFGNEI7QUFBQSxVQUV0Qk0sVUFGc0IsZ0JBRXRCQSxVQUZzQjtBQUFBLFVBRVZELFNBRlUsZ0JBRVZBLFNBRlU7QUFBQSxVQUVDWSxVQUZELGdCQUVDQSxVQUZEO0FBQUEsVUFFYUgsYUFGYixnQkFFYUEsYUFGYjtBQUFBLFVBRTRCQyxJQUY1QixnQkFFNEJBLElBRjVCO0FBSTlCLFVBQU02SSxhQUFhLEdBQUcsQ0FBQyxpQkFBRCxDQUF0QjtBQUNBLFVBQUlDLGFBQWEsR0FBRyxDQUFwQixDQUw4QixDQUtQOztBQUN2QixVQUFJdkosVUFBSixFQUFnQnVKLGFBQWEsR0FBRzVJLFVBQVUsQ0FBQ0ssSUFBM0I7O0FBQ2hCLFVBQUloQixVQUFKLEVBQWdCO0FBQ2QsWUFBSStDLFFBQVEsSUFBSXdHLGFBQWEsR0FBRyxDQUFoQyxFQUFtQztBQUNqQ0QsVUFBQUEsYUFBYSxDQUFDRSxJQUFkLENBQW1CLHFCQUFuQjtBQUNEO0FBQ0YsT0FKRCxNQUlPLElBQUl6SixTQUFKLEVBQWU7QUFDcEJ1SixRQUFBQSxhQUFhLENBQUNFLElBQWQsQ0FBbUIsc0JBQW5CO0FBQ0QsT0FiNkIsQ0FlOUI7OztBQUNBLFVBQUksQ0FBQ3hKLFVBQUQsSUFBZSxDQUFDRCxTQUFoQixJQUE4QlMsYUFBYSxJQUFJZCxJQUFJLENBQUN5SSxTQUF4RCxFQUFvRTtBQUNsRSxZQUFJM0gsYUFBYSxDQUFDaUosT0FBZCxDQUFzQmhKLElBQUksQ0FBQ1osS0FBTCxFQUFZa0QsUUFBUSxHQUFHd0csYUFBdkIsU0FBeUM3SixJQUFJLENBQUN5SSxTQUE5QyxFQUF0QixNQUFxRixDQUFDLENBQTFGLEVBQTZGO0FBQzNGbUIsVUFBQUEsYUFBYSxDQUFDRSxJQUFkLENBQW1CLGFBQW5CO0FBQ0Q7QUFDRjs7QUFFRCxVQUFJLE1BQUtuSCxLQUFMLENBQVdxSCxrQkFBZixFQUFtQztBQUNqQyxlQUFPSixhQUFhLENBQUN2RCxJQUFkLENBQW1CLEdBQW5CLElBQTBCLEdBQTFCLEdBQWdDLE1BQUsxRCxLQUFMLENBQVdxSCxrQkFBWCxDQUE4QjNHLFFBQTlCLENBQXZDO0FBQ0Q7O0FBQ0QsYUFBT3VHLGFBQWEsQ0FBQ3ZELElBQWQsQ0FBbUIsR0FBbkIsQ0FBUDtBQUNELEtBeGVrQjs7QUFBQSxzRUEwZUQsVUFBQ2hELFFBQUQsRUFBV0MsR0FBWCxFQUFnQjZFLFFBQWhCLEVBQTZCO0FBQzdDLFVBQU04QixVQUFVLEdBQUcsRUFBbkI7O0FBQ0EsVUFBSSxDQUFDLE1BQUt0SCxLQUFMLENBQVczQyxJQUFYLENBQWdCeUksU0FBakIsSUFBOEIsQ0FBQ25GLEdBQUcsQ0FBQzhDLFlBQXZDLEVBQXFEO0FBQ25ELGVBQU82RCxVQUFQO0FBQ0Q7O0FBQ0QsVUFBSUMsV0FBSjtBQUNBLFVBQUlDLFlBQUo7QUFDQSxVQUFJQyxjQUFKOztBQUNBLFVBQUlqQyxRQUFRLEtBQUssUUFBakIsRUFBMkI7QUFDekIrQixRQUFBQSxXQUFXLEdBQUcsTUFBS3ZILEtBQUwsQ0FBV3ZCLGtCQUFYLENBQThCakIsS0FBOUIsRUFBcUMsTUFBckMsRUFBNkNrRCxRQUE3QyxTQUEwREMsR0FBRyxDQUFDOEMsWUFBOUQsRUFBZDtBQUNBK0QsUUFBQUEsWUFBWSxHQUFHLE1BQUt4SCxLQUFMLENBQVd2QixrQkFBWCxDQUE4QmpCLEtBQTlCLEVBQXFDLE9BQXJDLEVBQThDa0QsUUFBOUMsU0FBMkRDLEdBQUcsQ0FBQzhDLFlBQS9ELEVBQWY7QUFDQWdFLFFBQUFBLGNBQWMsR0FBRyxNQUFLekgsS0FBTCxDQUFXdkIsa0JBQVgsQ0FBOEJqQixLQUE5QixFQUNmLFNBRGUsRUFFZmtELFFBRmUsU0FHWkMsR0FBRyxDQUFDOEMsWUFIUSxFQUFqQjtBQUtELE9BUkQsTUFRTztBQUNMLFlBQU1oRyxFQUFFLEdBQUcsTUFBS3VILG1CQUFMLENBQXlCdEUsUUFBekIsQ0FBWDs7QUFDQTZHLFFBQUFBLFdBQVcsR0FBRyxNQUFLdkgsS0FBTCxDQUFXeEIsWUFBWCxDQUF3QmhCLEtBQXhCLEVBQStCLE1BQS9CLEVBQXVDQyxFQUF2QyxTQUE4Q2tELEdBQUcsQ0FBQzhDLFlBQWxELEVBQWQ7QUFDQStELFFBQUFBLFlBQVksR0FBRyxNQUFLeEgsS0FBTCxDQUFXeEIsWUFBWCxDQUF3QmhCLEtBQXhCLEVBQStCLE9BQS9CLEVBQXdDQyxFQUF4QyxTQUErQ2tELEdBQUcsQ0FBQzhDLFlBQW5ELEVBQWY7QUFDQWdFLFFBQUFBLGNBQWMsR0FBRyxNQUFLekgsS0FBTCxDQUFXeEIsWUFBWCxDQUF3QmhCLEtBQXhCLEVBQStCLFNBQS9CLEVBQTBDQyxFQUExQyxTQUFpRGtELEdBQUcsQ0FBQzhDLFlBQXJELEVBQWpCO0FBQ0Q7O0FBQ0QsVUFBSThELFdBQUosRUFBaUI7QUFDZkQsUUFBQUEsVUFBVSxDQUFDQyxXQUFYLEdBQXlCQSxXQUF6QjtBQUNEOztBQUNELFVBQUlDLFlBQUosRUFBa0I7QUFDaEJGLFFBQUFBLFVBQVUsQ0FBQ0UsWUFBWCxHQUEwQkEsWUFBMUI7QUFDRDs7QUFDRCxVQUFJQyxjQUFKLEVBQW9CO0FBQ2xCSCxRQUFBQSxVQUFVLENBQUNHLGNBQVgsR0FBNEJBLGNBQTVCO0FBQ0Q7O0FBQ0QsYUFBT0gsVUFBUDtBQUNELEtBMWdCa0I7O0FBQUEscUVBNGdCRixZQUFNO0FBQ3JCLFVBQUlJLFdBQUo7QUFDQSxVQUFJLE1BQUsxSCxLQUFMLENBQVdyQyxVQUFYLElBQXlCLENBQUMsTUFBS3NGLGlCQUFuQyxFQUFzRCxPQUFPeUUsV0FBUDs7QUFDdEQsVUFBSSxNQUFLekUsaUJBQVQsRUFBNEI7QUFDMUIsWUFBTTBFLFlBQVksR0FBRyxNQUFLM0gsS0FBTCxDQUFXMUIsVUFBWCxDQUFzQkssSUFBdEIsR0FBNkIsQ0FBbEQ7O0FBQ0EsWUFBSWdKLFlBQVksSUFBSSxDQUFwQixFQUF1QjtBQUNyQkQsVUFBQUEsV0FBVyxHQUFHQyxZQUFkO0FBQ0Q7QUFDRixPQUxELE1BS087QUFDTCxZQUFJLE1BQUszSCxLQUFMLENBQVd0QyxTQUFYLElBQXdCLENBQUMsTUFBS3NDLEtBQUwsQ0FBVzRILGdCQUF4QyxFQUEwRDtBQUN4REYsVUFBQUEsV0FBVyxHQUFHLE1BQUt4SyxLQUFMLENBQVcySyxVQUF6QjtBQUNELFNBRkQsTUFFTztBQUNMSCxVQUFBQSxXQUFXLEdBQUcsTUFBSzFILEtBQUwsQ0FBVzBILFdBQXpCLENBREssQ0FDaUM7QUFDdkM7O0FBQ0QsWUFBSUEsV0FBVyxLQUFLdkQsU0FBaEIsSUFBNkIsTUFBS25FLEtBQUwsQ0FBVzdCLGFBQVgsQ0FBeUJRLElBQXpCLEdBQWdDLENBQWpFLEVBQW9FO0FBQ2xFK0ksVUFBQUEsV0FBVyxHQUFHLE1BQUtJLG9CQUFMLENBQTBCLE1BQUs5SCxLQUFMLENBQVc3QixhQUFYLENBQXlCNEosS0FBekIsRUFBMUIsQ0FBZDtBQUNEO0FBQ0Y7O0FBQ0QsYUFBT0wsV0FBUDtBQUNELEtBL2hCa0I7O0FBQUEsaUVBaWlCTixVQUFDTSxPQUFELEVBQWE7QUFDeEIsVUFBSSxNQUFLaEksS0FBTCxDQUFXdEMsU0FBWCxJQUF3QixNQUFLc0MsS0FBTCxDQUFXckMsVUFBdkMsRUFBbUQ7QUFDakQsWUFBSXFLLE9BQU8sSUFBSUEsT0FBTyxDQUFDdkksR0FBUixDQUFZLE1BQVosQ0FBWCxJQUFrQ3VJLE9BQU8sS0FBSyxNQUFLQyxXQUF2RCxFQUFvRTtBQUNsRSxnQkFBS0QsT0FBTyxDQUFDdkksR0FBUixDQUFZLE1BQVosQ0FBTCxJQUE0QixJQUE1QjtBQUNBLGdCQUFLeUksY0FBTCxHQUFzQkYsT0FBTyxDQUFDdkksR0FBUixDQUFZLGdCQUFaLENBQXRCO0FBQ0EsZ0JBQUt3SSxXQUFMLEdBQW1CRCxPQUFuQjtBQUNEO0FBQ0Y7QUFDRixLQXppQmtCOztBQUFBLHVFQTJpQkEsVUFBQ3hDLFFBQUQsRUFBVzlFLFFBQVgsRUFBcUJGLFNBQXJCO0FBQUEsYUFBbUMsWUFBTTtBQUMxRCxZQUFJZ0YsUUFBUSxLQUFLLE1BQWIsSUFBdUIsTUFBS3hGLEtBQUwsQ0FBVzJGLFVBQXRDLEVBQWtEO0FBQ2hELGdCQUFLM0YsS0FBTCxDQUFXMEYsbUJBQVgsQ0FDRSxNQUFLMUYsS0FBTCxDQUFXM0MsSUFEYixFQUVFLG9CQUFJO0FBQ0ZxRCxZQUFBQSxRQUFRLEVBQVJBLFFBREU7QUFFRkYsWUFBQUEsU0FBUyxFQUFUQTtBQUZFLFdBQUosQ0FGRjtBQU9EO0FBQ0YsT0FWa0I7QUFBQSxLQTNpQkE7O0FBQUEsMEVBdWpCRyxVQUFDRSxRQUFELEVBQVdDLEdBQVg7QUFBQSxhQUFtQixVQUFDd0gsR0FBRCxFQUFTO0FBQ2hEO0FBQ0EsWUFBTTNILFNBQVMsR0FBRzNCLHNCQUFNK0MsWUFBTixDQUFtQmpCLEdBQW5CLENBQWxCOztBQUNBLFlBQU00QixTQUFTLEdBQUcsQ0FBQzRGLEdBQUQsSUFBUUEsR0FBRyxDQUFDQyxLQUFaLEdBQW9CRCxHQUFwQixHQUEwQixNQUFLMUYsWUFBTCxDQUFrQjBGLEdBQWxCLENBQTVDOztBQUNBLFlBQ0UsTUFBS25JLEtBQUwsQ0FBVzFCLFVBQVgsQ0FBc0JLLElBQXRCLElBQ0csTUFBS3FCLEtBQUwsQ0FBVzFCLFVBQVgsQ0FBc0JLLElBQXRCLEtBQStCK0IsUUFBUSxHQUFHLENBRDdDLElBRUcsTUFBS3VDLGlCQUZSLElBR0csQ0FBQyxNQUFLb0YseUJBQUwsQ0FBK0IzSCxRQUEvQixFQUF5Q0MsR0FBekMsRUFBOEMsUUFBOUMsQ0FISixJQUlHNEIsU0FMTCxFQU1FO0FBQ0FBLFVBQUFBLFNBQVMsQ0FBQzZGLEtBQVY7QUFDQSxnQkFBS25GLGlCQUFMLEdBQXlCLEtBQXpCO0FBQ0Q7O0FBRUQsWUFBSSxNQUFLakQsS0FBTCxDQUFXYyxxQkFBZixFQUFzQztBQUNwQyxnQkFBS0UsY0FBTCxDQUF1QixNQUFLaEIsS0FBTCxDQUFXM0MsSUFBWCxDQUFnQkksRUFBdkMsU0FBNkMrQyxTQUE3QyxTQUEwREUsUUFBMUQsSUFBd0V5SCxHQUF4RTtBQUNEO0FBQ0YsT0FsQnFCO0FBQUEsS0F2akJIOztBQUFBLHdFQTJrQkMsVUFBQ3pILFFBQUQsRUFBV0MsR0FBWDtBQUFBLGFBQW1CLFVBQUN3SCxHQUFELEVBQVM7QUFDOUMsWUFBTTNILFNBQVMsR0FBRzNCLHNCQUFNK0MsWUFBTixDQUFtQmpCLEdBQW5CLENBQWxCOztBQUNBLFlBQUksTUFBSzJILGVBQUwsSUFBd0IsQ0FBQyxNQUFLRCx5QkFBTCxDQUErQjNILFFBQS9CLEVBQXlDQyxHQUF6QyxFQUE4QyxNQUE5QyxDQUE3QixFQUFvRjtBQUNsRixjQUFNNEgsZ0JBQWdCLEdBQUcsTUFBS0wsY0FBTCxJQUF1QixNQUFLbEksS0FBTCxDQUFXNUIsSUFBWCxDQUFnQk8sSUFBaEIsR0FBdUIsQ0FBOUMsR0FDckIsTUFBS3FCLEtBQUwsQ0FBVzVCLElBQVgsQ0FBZ0JPLElBQWhCLEdBQXVCLENBREYsR0FFckIsTUFBS21KLG9CQUFMLENBQTBCLE1BQUs5SCxLQUFMLENBQVc3QixhQUFYLENBQXlCNEosS0FBekIsRUFBMUIsQ0FGSjtBQURrRixjQUsxRTdKLFlBTDBFLEdBS3pELE1BQUs4QixLQUxvRCxDQUsxRTlCLFlBTDBFO0FBTWxGLGNBQU1xRSxTQUFTLEdBQUcsQ0FBQzRGLEdBQUQsSUFBUUEsR0FBRyxDQUFDQyxLQUFaLEdBQW9CRCxHQUFwQixHQUEwQixNQUFLMUYsWUFBTCxDQUFrQjBGLEdBQWxCLENBQTVDOztBQUNBLGNBQUlqSyxZQUFZLENBQUNTLElBQWIsR0FBb0IsQ0FBeEIsRUFBMkI7QUFDekIsZ0JBQ0VULFlBQVksQ0FBQ3VCLEdBQWIsQ0FBaUIsVUFBakIsTUFBaUNpQixRQUFqQyxJQUNHeEMsWUFBWSxDQUFDdUIsR0FBYixDQUFpQixXQUFqQixNQUFrQ2UsU0FEckMsSUFFRytCLFNBSEwsRUFJRTtBQUNBQSxjQUFBQSxTQUFTLENBQUM2RixLQUFWO0FBQ0Esb0JBQUtFLGVBQUwsR0FBdUIsS0FBdkI7QUFDQSxvQkFBS0osY0FBTCxHQUFzQixLQUF0QjtBQUNEO0FBQ0YsV0FWRCxNQVVPLElBQUlLLGdCQUFnQixLQUFLcEUsU0FBekIsRUFBb0M7QUFDekMsa0JBQUttRSxlQUFMLEdBQXVCLEtBQXZCO0FBQ0Esa0JBQUtKLGNBQUwsR0FBc0IsS0FBdEI7QUFDRCxXQUhNLE1BR0EsSUFBSUssZ0JBQWdCLEtBQUs3SCxRQUFyQixJQUFpQzZCLFNBQXJDLEVBQWdEO0FBQ3JEQSxZQUFBQSxTQUFTLENBQUM2RixLQUFWO0FBQ0Esa0JBQUtFLGVBQUwsR0FBdUIsS0FBdkI7QUFDQSxrQkFBS0osY0FBTCxHQUFzQixLQUF0QjtBQUNEO0FBQ0Y7O0FBQ0QsWUFBSSxNQUFLbEksS0FBTCxDQUFXYyxxQkFBZixFQUFzQztBQUNwQyxnQkFBS0MsUUFBTCxDQUFpQixNQUFLZixLQUFMLENBQVczQyxJQUFYLENBQWdCSSxFQUFqQyxTQUF1QytDLFNBQXZDLFNBQW9ERSxRQUFwRCxJQUFrRXlILEdBQWxFO0FBQ0Q7QUFDRixPQS9CbUI7QUFBQSxLQTNrQkQ7O0FBQUEsb0VBNG1CSCxVQUFDakYsV0FBRCxFQUFjeEMsUUFBZCxFQUF3QjhILFdBQXhCLEVBQXdDO0FBQ3RELFVBQU1DLFlBQVksR0FBRyxDQUFDLE1BQUQsRUFBUyxVQUFULENBQXJCOztBQUNBLFVBQUl2RixXQUFXLElBQUl1RixZQUFZLENBQUMvRixRQUFiLENBQXNCUSxXQUFXLENBQUNqQixJQUFsQyxDQUFuQixFQUE0RDtBQUMxRCxZQUFJdkIsUUFBUSxLQUFLLENBQUMsQ0FBZCxJQUFtQjhILFdBQVcsS0FBSyxDQUFDLENBQXhDLEVBQTJDO0FBQ3pDLGdCQUFLdEksUUFBTCxDQUFjO0FBQ1p3SSxZQUFBQSxhQUFhLEVBQUVGLFdBREg7QUFFWlgsWUFBQUEsVUFBVSxFQUFFbkg7QUFGQSxXQUFkO0FBSUQ7O0FBQ0RpSSxRQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNmLGNBQUl6RixXQUFXLENBQUNqQixJQUFaLEtBQXFCLFVBQXpCLEVBQXFDaUIsV0FBVyxDQUFDa0YsS0FBWjtBQUNyQyxjQUFJbEYsV0FBVyxDQUFDakIsSUFBWixLQUFxQixNQUF6QixFQUFpQ2lCLFdBQVcsQ0FBQ1YsTUFBWjtBQUNsQyxTQUhTLEVBR1AsRUFITyxDQUFWO0FBSUQ7QUFDRixLQTFuQmtCOztBQUFBLHNGQTRuQmUsWUFBTTtBQUN0QyxZQUFLeEMsS0FBTCxDQUFXNEksb0JBQVgsQ0FBZ0MsTUFBSzVJLEtBQUwsQ0FBVzNDLElBQTNDO0FBQ0QsS0E5bkJrQjs7QUFBQSxzRkFnb0JlLFVBQUFxRCxRQUFRO0FBQUEsYUFBSSxZQUFNO0FBQ2xELGNBQUtWLEtBQUwsQ0FBVzZJLG1CQUFYLENBQStCLE1BQUs3SSxLQUFMLENBQVczQyxJQUExQyxFQUFnRHFELFFBQWhELEVBQTBELElBQTFELEVBQWdFLEtBQWhFO0FBQ0QsT0FGeUM7QUFBQSxLQWhvQnZCOztBQUFBLHNFQW9vQkQsWUFBTTtBQUFBLHlCQWlCbEIsTUFBS1YsS0FqQmE7QUFBQSxVQUVwQjVCLElBRm9CLGdCQUVwQkEsSUFGb0I7QUFBQSxVQUdwQkQsYUFIb0IsZ0JBR3BCQSxhQUhvQjtBQUFBLFVBSXBCZSxVQUpvQixnQkFJcEJBLFVBSm9CO0FBQUEsVUFLcEJFLGlCQUxvQixnQkFLcEJBLGlCQUxvQjtBQUFBLFVBTXBCRSxnQkFOb0IsZ0JBTXBCQSxnQkFOb0I7QUFBQSxVQU9wQmpDLElBUG9CLGdCQU9wQkEsSUFQb0I7QUFBQSxVQVFwQnlMLFVBUm9CLGdCQVFwQkEsVUFSb0I7QUFBQSxVQVNwQkMsU0FUb0IsZ0JBU3BCQSxTQVRvQjtBQUFBLFVBVXBCL0osTUFWb0IsZ0JBVXBCQSxNQVZvQjtBQUFBLFVBV3BCZ0ssSUFYb0IsZ0JBV3BCQSxJQVhvQjtBQUFBLFVBWXBCQyxzQkFab0IsZ0JBWXBCQSxzQkFab0I7QUFBQSxVQWFwQnRMLFVBYm9CLGdCQWFwQkEsVUFib0I7QUFBQSxVQWNwQnVMLFdBZG9CLGdCQWNwQkEsV0Fkb0I7QUFBQSxVQWVwQkMsdUJBZm9CLGdCQWVwQkEsdUJBZm9CO0FBQUEsVUFnQnBCQyxxQkFoQm9CLGdCQWdCcEJBLHFCQWhCb0I7QUFtQnRCLFVBQU03SCxPQUFPLEdBQUcsRUFBaEI7QUFDQSxVQUFNOEgsUUFBUSxHQUFHOUMsTUFBTSxDQUFDLE1BQUt2RyxLQUFMLENBQVdxSixRQUFaLENBQXZCOztBQUNBLFVBQUlILFdBQUosRUFBaUI7QUFDZjNILFFBQUFBLE9BQU8sQ0FBQzRGLElBQVIsQ0FBYTtBQUNYbUMsVUFBQUEsS0FBSyxFQUFFSixXQUFXLENBQUNJLEtBQVosSUFBcUIsRUFEakI7QUFFWEMsVUFBQUEsV0FBVyxFQUFFLENBQUMsQ0FBQ0wsV0FBVyxDQUFDSyxXQUZoQjtBQUdYQyxVQUFBQSxVQUFVLEVBQUUsS0FIRDtBQUlYaEosVUFBQUEsU0FBUyxFQUFFLGFBSkE7QUFLWGlKLFVBQUFBLElBQUksRUFBRSxjQUFBL0ksUUFBUTtBQUFBLG1CQUNaO0FBQUssY0FBQSxTQUFTLEVBQUM7QUFBZixlQUNHd0ksV0FBVyxDQUFDUSxXQUFaLENBQXdCdEwsSUFBSSxDQUFDcUIsR0FBTCxDQUFTaUIsUUFBVCxDQUF4QixFQUE0QzJJLFFBQTVDLENBREgsQ0FEWTtBQUFBLFdBTEg7QUFVWE0sVUFBQUEsUUFBUSxFQUFFLGtCQUFBakosUUFBUTtBQUFBLG1CQUFLd0ksV0FBVyxDQUFDUyxRQUFaLEdBQXVCVCxXQUFXLENBQUNTLFFBQVosQ0FBcUJqSixRQUFyQixDQUF2QixHQUF3RCxJQUE3RDtBQUFBLFdBVlA7QUFXWGtKLFVBQUFBLFVBQVUsRUFBRSxvQkFBQWxKLFFBQVE7QUFBQSxtQkFBS3dJLFdBQVcsQ0FBQ1UsVUFBWixHQUF5QlYsV0FBVyxDQUFDVSxVQUFaLENBQXVCbEosUUFBdkIsQ0FBekIsR0FBNEQsSUFBakU7QUFBQSxXQVhUO0FBWVhtSixVQUFBQSxVQUFVLEVBQUUsb0JBQUFuSixRQUFRO0FBQUEsbUJBQUt3SSxXQUFXLENBQUNXLFVBQVosR0FBeUJYLFdBQVcsQ0FBQ1csVUFBWixDQUF1Qm5KLFFBQXZCLENBQXpCLEdBQTRELElBQWpFO0FBQUE7QUFaVCxTQUFiO0FBY0Q7O0FBRUQsVUFBSXlJLHVCQUFKLEVBQTZCO0FBQzNCNUgsUUFBQUEsT0FBTyxDQUFDNEYsSUFBUixDQUFhO0FBQ1htQyxVQUFBQSxLQUFLLEVBQUUsRUFESTtBQUVYQyxVQUFBQSxXQUFXLEVBQUUsS0FGRjtBQUdYQyxVQUFBQSxVQUFVLEVBQUUsS0FIRDtBQUlYaEosVUFBQUEsU0FBUyxFQUFFLG1CQUpBO0FBS1hzSixVQUFBQSxNQUFNLEVBQUVWLHFCQUFxQixJQUMzQixnQ0FBQyx5QkFBRDtBQUNFLFlBQUEsRUFBRSxtQ0FBaUMvTCxJQUFJLENBQUNJLEVBRDFDO0FBRUUsWUFBQSxTQUFTLEVBQUMsb0RBRlo7QUFHRSxZQUFBLE9BQU8sRUFBRVcsSUFBSSxDQUFDTyxJQUFMLEtBQWMsQ0FBZCxJQUFtQlAsSUFBSSxDQUFDTyxJQUFMLEtBQWNSLGFBQWEsQ0FBQ1EsSUFIMUQ7QUFJRSxZQUFBLFFBQVEsRUFBRSxNQUFLb0wsK0JBSmpCO0FBS0UsWUFBQSxRQUFRLEVBQUVWO0FBTFosWUFOUztBQWNYSSxVQUFBQSxJQUFJLEVBQUUsY0FBQy9JLFFBQUQsRUFBYztBQUNsQixnQkFBTXNKLE9BQU8sR0FBRzVMLElBQUksQ0FBQ3FCLEdBQUwsQ0FBU2lCLFFBQVQsQ0FBaEI7QUFDQSxnQkFBTXVKLE1BQU0sR0FBR0QsT0FBTyxDQUFDeE0sS0FBUixDQUFjSCxJQUFJLENBQUN5SSxTQUFuQixDQUFmO0FBQ0EsZ0JBQU1vRSxRQUFRLEdBQUcvTCxhQUFhLENBQUN1RSxRQUFkLENBQXVCdUgsTUFBdkIsQ0FBakI7QUFDQSxtQkFDRSxnQ0FBQyx5QkFBRDtBQUNFLGNBQUEsRUFBRSxnQ0FBOEIsTUFBS2pLLEtBQUwsQ0FBVzNDLElBQVgsQ0FBZ0JJLEVBQTlDLFNBQW9EaUQsUUFEeEQ7QUFFRSxjQUFBLFNBQVMsRUFBQyxnREFGWjtBQUdFLGNBQUEsT0FBTyxFQUFFd0osUUFIWDtBQUlFLGNBQUEsUUFBUSxFQUFFLE1BQUtDLCtCQUFMLENBQXFDekosUUFBckMsQ0FKWjtBQUtFLGNBQUEsUUFBUSxFQUFFMkk7QUFMWixjQURGO0FBU0QsV0EzQlU7QUE0QlhNLFVBQUFBLFFBQVEsRUFBRTtBQUFBLG1CQUFNLElBQU47QUFBQSxXQTVCQztBQTZCWEMsVUFBQUEsVUFBVSxFQUFFO0FBQUEsbUJBQU0sSUFBTjtBQUFBLFdBN0JEO0FBOEJYQyxVQUFBQSxVQUFVLEVBQUU7QUFBQSxtQkFBTSxJQUFOO0FBQUE7QUE5QkQsU0FBYjtBQWdDRDs7QUFFRCxVQUFNN0wsY0FBYyxHQUFHLEVBQXZCOztBQUNBLFlBQUtnQyxLQUFMLENBQVdoQyxjQUFYLENBQTBCb00sT0FBMUIsQ0FBa0MsVUFBQ0MsZ0JBQUQsRUFBc0I7QUFDdEQsY0FBS3JLLEtBQUwsQ0FBV3VCLE9BQVgsQ0FBbUI2SSxPQUFuQixDQUEyQixVQUFDRSxNQUFELEVBQVk7QUFDckMsY0FBSXpMLHNCQUFNK0MsWUFBTixDQUFtQjBJLE1BQW5CLE1BQStCRCxnQkFBbkMsRUFBcUQ7QUFDbkRyTSxZQUFBQSxjQUFjLENBQUNtSixJQUFmLENBQW9CbUQsTUFBcEI7QUFDRDtBQUNGLFNBSkQ7QUFLRCxPQU5EOztBQU9BdE0sTUFBQUEsY0FBYyxDQUFDb00sT0FBZixDQUF1QixVQUFDekosR0FBRCxFQUFTO0FBQzlCLFlBQU00SixpQkFBaUIsR0FBRzFMLHNCQUFNMkwsb0JBQU4sQ0FBMkI3SixHQUEzQixDQUExQixDQUQ4QixDQUU5Qjs7O0FBQ0EsWUFBTStJLFdBQVcsR0FBRyxTQUFkQSxXQUFjLENBQUNoSixRQUFELEVBQVcrSixNQUFYLEVBQXNCO0FBQ3hDLGNBQU1oRSxHQUFHLEdBQUdySSxJQUFJLENBQUNaLEtBQUwsRUFBWWtELFFBQVosU0FBeUJDLEdBQUcsQ0FBQzhDLFlBQTdCLEVBQVo7O0FBQ0EsY0FBSThHLGlCQUFpQixDQUFDOUQsR0FBRCxDQUFyQixFQUE0QjtBQUMxQixtQkFBTzlGLEdBQUcsQ0FBQytKLFVBQUosR0FBaUIsZ0NBQUMsMkJBQUQ7QUFBRyxjQUFBLEVBQUUsRUFBQztBQUFOLGNBQWpCLEdBQWtELEVBQXpEO0FBQ0Q7O0FBQ0QsaUJBQU9ELE1BQU0sR0FBR0EsTUFBTSxDQUFDaEUsR0FBRCxDQUFULEdBQWlCQSxHQUE5QjtBQUNELFNBTkQ7O0FBUUEsWUFBSWtFLE1BQU0sR0FBR0MsMEJBQWtCQyxVQUFsQixDQUE2QmxLLEdBQTdCLENBQWIsQ0FYOEIsQ0FZOUI7OztBQUNBLFlBQU1tSyxlQUFlLEdBQUc7QUFDdEJDLFVBQUFBLElBQUksRUFBRTtBQUNKQyxZQUFBQSxZQUFZLEVBQUUsTUFBSzFGLGdCQURmO0FBRUoyRixZQUFBQSxpQkFBaUIsRUFBRSxNQUFLOUYscUJBRnBCO0FBR0orRixZQUFBQSxVQUFVLEVBQUUsTUFBS0MsY0FIYjtBQUlKQyxZQUFBQSxXQUFXLEVBQUUsTUFBS0EsV0FKZDtBQUtKdEgsWUFBQUEsYUFBYSxFQUFFLE1BQUt1SCxpQkFMaEI7QUFNSkMsWUFBQUEsYUFBYSxFQUFFLE1BQUtDO0FBTmhCLFdBRGdCO0FBU3RCMUssVUFBQUEsTUFBTSxFQUFFO0FBQ05tSyxZQUFBQSxZQUFZLEVBQUUsTUFBS2pFLGtCQURiO0FBRU5rRSxZQUFBQSxpQkFBaUIsRUFBRSxNQUFLeEcsdUJBRmxCO0FBR055RyxZQUFBQSxVQUFVLEVBQUUsTUFBS00sZ0JBSFg7QUFJTkosWUFBQUEsV0FBVyxFQUFFLE1BQUtBLFdBSlo7QUFLTnRILFlBQUFBLGFBQWEsRUFBRSxNQUFLMkgsbUJBTGQ7QUFNTkgsWUFBQUEsYUFBYSxFQUFFLE1BQUtJO0FBTmQsV0FUYztBQWlCdEJDLFVBQUFBLE1BQU0sRUFBRTtBQUNOWCxZQUFBQSxZQUFZLEVBQUUsTUFBS1ksa0JBRGI7QUFFTlgsWUFBQUEsaUJBQWlCLEVBQUUsTUFBS1k7QUFGbEI7QUFqQmMsU0FBeEIsQ0FiOEIsQ0FvQzlCOztBQUNBLFlBQU1DLFNBQVMsR0FBRztBQUNoQnpPLFVBQUFBLElBQUksRUFBSkEsSUFEZ0I7QUFFaEJlLFVBQUFBLElBQUksRUFBSkEsSUFGZ0I7QUFHaEJjLFVBQUFBLFVBQVUsRUFBVkEsVUFIZ0I7QUFJaEJFLFVBQUFBLGlCQUFpQixFQUFqQkEsaUJBSmdCO0FBS2hCRSxVQUFBQSxnQkFBZ0IsRUFBaEJBLGdCQUxnQjtBQU1oQjJKLFVBQUFBLHNCQUFzQixFQUF0QkE7QUFOZ0IsU0FBbEIsQ0FyQzhCLENBNEMzQjs7QUFDSDBCLFFBQUFBLE1BQU0sR0FBR0MsMEJBQWtCbUIsVUFBbEIsQ0FBNkJwQixNQUE3QixFQUFxQ21CLFNBQXJDLEVBQWdEbkwsR0FBaEQsRUFBcUQrSSxXQUFyRCxDQUFULENBN0M4QixDQStDOUI7O0FBQ0EsWUFBTXNDLGtCQUFrQixnQkFDbkJGLFNBRG1CO0FBRXRCaEQsVUFBQUEsVUFBVSxFQUFWQSxVQUZzQjtBQUd0QkMsVUFBQUEsU0FBUyxFQUFUQSxTQUhzQjtBQUl0Qi9KLFVBQUFBLE1BQU0sRUFBTkEsTUFKc0I7QUFLdEJnSyxVQUFBQSxJQUFJLEVBQUpBLElBTHNCO0FBTXRCQyxVQUFBQSxzQkFBc0IsRUFBdEJBO0FBTnNCLFVBQXhCLENBaEQ4QixDQXVEM0I7OztBQUNIMEIsUUFBQUEsTUFBTSxHQUFHQywwQkFBa0JxQixtQkFBbEIsQ0FDUHRCLE1BRE8sRUFFUHRCLFFBRk8sRUFHUDJDLGtCQUhPLEVBSVByTCxHQUpPLEVBS1BtSyxlQUxPLEVBTVAsTUFBS3pDLHlCQU5FLENBQVQ7QUFRQTlHLFFBQUFBLE9BQU8sQ0FBQzRGLElBQVIsQ0FBYXdELE1BQWI7QUFDRCxPQWpFRDs7QUFtRUEsVUFBSWhOLFVBQUosRUFBZ0I7QUFDZDRELFFBQUFBLE9BQU8sQ0FBQzRGLElBQVIsQ0FBYTtBQUNYbUMsVUFBQUEsS0FBSyxFQUFFLEVBREk7QUFFWEMsVUFBQUEsV0FBVyxFQUFFLEtBRkY7QUFHWC9JLFVBQUFBLFNBQVMsRUFBRSxlQUhBO0FBSVhpSixVQUFBQSxJQUFJLEVBQUU7QUFBQSxtQkFBTSxJQUFOO0FBQUEsV0FKSztBQUtYRSxVQUFBQSxRQUFRLEVBQUU7QUFBQSxtQkFBTSxJQUFOO0FBQUEsV0FMQztBQU1YQyxVQUFBQSxVQUFVLEVBQUUsb0JBQUFsSixRQUFRO0FBQUEsbUJBQ2xCLGdDQUFDLGdCQUFEO0FBQ0UsY0FBQSxFQUFFLG1DQUFpQ3JELElBQUksQ0FBQ0ksRUFBdEMsU0FBNENpRCxRQURoRDtBQUVFLGNBQUEsSUFBSSxFQUFDLFdBRlA7QUFHRSxjQUFBLElBQUksRUFBQyxRQUhQO0FBSUUsY0FBQSxLQUFLLEVBQUUsRUFKVDtBQUtFLGNBQUEsTUFBTSxFQUFFLEVBTFY7QUFNRSxjQUFBLEtBQUssRUFBRTtBQUFFd0wsZ0JBQUFBLE9BQU8sRUFBRTtBQUFYLGVBTlQ7QUFPRSxjQUFBLE9BQU8sRUFBRTtBQUFBLHVCQUFNLE1BQUtsTSxLQUFMLENBQVdtTSxhQUFYLENBQXlCOU8sSUFBekIsRUFBK0JxRCxRQUEvQixDQUFOO0FBQUE7QUFQWCxjQURrQjtBQUFBLFdBTlQ7QUFpQlhtSixVQUFBQSxVQUFVLEVBQUU7QUFBQSxtQkFBTSxJQUFOO0FBQUE7QUFqQkQsU0FBYjtBQW1CRDs7QUFDRCxhQUFPdEksT0FBUDtBQUNELEtBOXlCa0I7O0FBQUEsbUVBZ3pCSixVQUFDYixRQUFELEVBQVdDLEdBQVgsRUFBZ0I2RSxRQUFoQixFQUE2QjtBQUMxQyxVQUFJQSxRQUFRLEtBQUssTUFBakIsRUFBeUI7QUFDdkIsZUFBTyxLQUFQO0FBQ0Q7O0FBQ0QsVUFBTS9ILEVBQUUsR0FBRyxNQUFLdUgsbUJBQUwsQ0FBeUJ0RSxRQUF6QixDQUFYOztBQUNBLGFBQU8sQ0FBQyxDQUFDLE1BQUtWLEtBQUwsQ0FBVzNCLFFBQVgsQ0FBb0JiLEtBQXBCLEVBQTJCQyxFQUEzQixTQUFrQ2tELEdBQUcsQ0FBQzhDLFlBQXRDLEVBQVQ7QUFDRCxLQXR6QmtCOztBQUFBLHlFQXd6QkUsWUFBTTtBQUN6QixZQUFLUixpQkFBTCxHQUF5QixJQUF6QjtBQUNELEtBMXpCa0I7O0FBQUEsMkVBNHpCSSxZQUFNO0FBQzNCLFVBQUksTUFBS2pELEtBQUwsQ0FBVzdCLGFBQVgsQ0FBeUJRLElBQTdCLEVBQW1DO0FBQ2pDLGNBQUsySixlQUFMLEdBQXVCLElBQXZCOztBQUNBLGNBQUtwSSxRQUFMLENBQWM7QUFDWjJILFVBQUFBLFVBQVUsRUFBRTFEO0FBREEsU0FBZDtBQUdEO0FBQ0YsS0FuMEJrQjs7QUFBQSxpRkFxMEJVLFlBQU07QUFDakMsWUFBS2lJLGdCQUFMLEdBQXdCLElBQXhCO0FBQ0QsS0F2MEJrQjs7QUFBQSxxRUF5MEJGLFVBQUN4TCxDQUFELEVBQUlGLFFBQUosRUFBaUI7QUFDaEMsVUFBSSxNQUFLVixLQUFMLENBQVdxTSxTQUFYLElBQXdCLENBQUMsTUFBS3JNLEtBQUwsQ0FBV3JDLFVBQXBDLElBQWtELENBQUMsTUFBS3FDLEtBQUwsQ0FBV3RDLFNBQWxFLEVBQTZFO0FBQzNFLFlBQUlrRCxDQUFDLENBQUMwTCxPQUFGLElBQWExTCxDQUFDLENBQUNpRCxRQUFuQixFQUE2QjtBQUMzQnpELFVBQUFBLFFBQVEsQ0FBQ21NLFlBQVQsR0FBd0JDLGVBQXhCO0FBQ0QsU0FIMEUsQ0FJM0U7QUFDQTs7O0FBTDJFLFlBTW5FQyxVQU5tRSxHQU1wRDdMLENBQUMsQ0FBQ3NELE1BTmtELENBTW5FdUksVUFObUU7QUFPM0UsWUFBTUMsWUFBWSxHQUFHRCxVQUFVLENBQUNFLFNBQVgsSUFBd0JGLFVBQVUsQ0FBQ0UsU0FBWCxDQUFxQnZGLE9BQTdDLEdBQXVEcUYsVUFBVSxDQUFDRSxTQUFsRSxHQUE4RSxFQUFuRztBQUNBLFlBQU1DLFlBQVksR0FBVUgsVUFBVSxDQUFDQSxVQUFYLENBQXNCRSxTQUF0QixJQUFtQ0YsVUFBVSxDQUFDQSxVQUFYLENBQXNCRSxTQUF0QixDQUFnQ3ZGLE9BQW5FLENBQTJFO0FBQTNFLFVBQ3hCcUYsVUFBVSxDQUFDQSxVQUFYLENBQXNCRSxTQURFLEdBRXhCLEVBRko7QUFHQSxZQUFNRSxZQUFZLEdBQUdKLFVBQVUsQ0FBQ0EsVUFBWCxDQUFzQkEsVUFBdEIsQ0FBaUNFLFNBQWpDLElBQ2hCRixVQUFVLENBQUNBLFVBQVgsQ0FBc0JBLFVBQXRCLENBQWlDRSxTQUFqQyxDQUEyQ3ZGLE9BRDNCLENBQ21DO0FBRG5DLFVBRWpCcUYsVUFBVSxDQUFDQSxVQUFYLENBQXNCQSxVQUF0QixDQUFpQ0UsU0FGaEIsR0FHakIsRUFISjtBQUlBLFlBQU1HLFlBQVksR0FBR0wsVUFBVSxDQUFDQSxVQUFYLENBQXNCQSxVQUF0QixDQUFpQ0EsVUFBakMsQ0FBNENFLFNBQTVDLElBQ2hCRixVQUFVLENBQUNBLFVBQVgsQ0FBc0JBLFVBQXRCLENBQWlDQSxVQUFqQyxDQUE0Q0UsU0FBNUMsQ0FBc0R2RixPQUR0QyxDQUM4QztBQUQ5QyxVQUVqQnFGLFVBQVUsQ0FBQ0EsVUFBWCxDQUFzQkEsVUFBdEIsQ0FBaUNBLFVBQWpDLENBQTRDRSxTQUYzQixHQUdqQixFQUhKOztBQUlBLFlBQ0VELFlBQVksQ0FBQ3RGLE9BQWIsQ0FBcUIsZUFBckIsTUFBMEMsQ0FBQyxDQUEzQyxJQUNHd0YsWUFBWSxDQUFDeEYsT0FBYixDQUFxQixlQUFyQixNQUEwQyxDQUFDLENBRDlDLElBRUd5RixZQUFZLENBQUN6RixPQUFiLENBQXFCLGVBQXJCLE1BQTBDLENBQUMsQ0FGOUMsSUFHRzBGLFlBQVksQ0FBQzFGLE9BQWIsQ0FBcUIsZUFBckIsTUFBMEMsQ0FBQyxDQUpoRCxFQUtFO0FBQ0EsZ0JBQUtwSCxLQUFMLENBQVc2SSxtQkFBWCxDQUNFLE1BQUs3SSxLQUFMLENBQVczQyxJQURiLEVBRUVxRCxRQUZGLEVBR0UsTUFBS1YsS0FBTCxDQUFXK00sV0FBWCxJQUEwQm5NLENBQUMsQ0FBQzBMLE9BSDlCLEVBSUUsTUFBS3RNLEtBQUwsQ0FBVytNLFdBQVgsSUFBMEJuTSxDQUFDLENBQUNpRCxRQUo5QjtBQU1EO0FBQ0Y7O0FBQ0QsVUFBSSxNQUFLN0QsS0FBTCxDQUFXZ04sVUFBZixFQUEyQjtBQUN6QixjQUFLaE4sS0FBTCxDQUFXZ04sVUFBWCxDQUFzQnBNLENBQXRCLEVBQXlCRixRQUF6QixFQUFtQyxNQUFLVixLQUFMLENBQVc1QixJQUFYLENBQWdCcUIsR0FBaEIsQ0FBb0JpQixRQUFwQixDQUFuQztBQUNEOztBQUNELGFBQU8sSUFBUDtBQUNELEtBLzJCa0I7O0FBQUEsd0VBaTNCQyxVQUFDRSxDQUFELEVBQUlGLFFBQUosRUFBaUI7QUFDbkMsVUFBSSxNQUFLVixLQUFMLENBQVdDLGdCQUFmLEVBQWlDO0FBQUEsMkJBRzNCLE1BQUtELEtBSHNCO0FBQUEsWUFFN0I2SSxtQkFGNkIsZ0JBRTdCQSxtQkFGNkI7QUFBQSxZQUVSMUssYUFGUSxnQkFFUkEsYUFGUTtBQUFBLFlBRU9kLElBRlAsZ0JBRU9BLElBRlA7QUFBQSxZQUVhZSxJQUZiLGdCQUVhQSxJQUZiO0FBSS9Cd0MsUUFBQUEsQ0FBQyxDQUFDZ0MsY0FBRjtBQUNBaEMsUUFBQUEsQ0FBQyxDQUFDcU0sZUFBRjs7QUFDQSxjQUFLL00sUUFBTCxDQUFjO0FBQ1pDLFVBQUFBLGVBQWUsRUFBRSxJQURMO0FBRVorTSxVQUFBQSxZQUFZLEVBQUV0TSxDQUFDLENBQUN1TSxPQUZKO0FBR1pDLFVBQUFBLFlBQVksRUFBRXhNLENBQUMsQ0FBQ3lNO0FBSEosU0FBZCxFQU4rQixDQVcvQjs7O0FBQ0EsWUFBSSxDQUFDbFAsYUFBYSxDQUFDdUUsUUFBZCxDQUF1QnRFLElBQUksQ0FBQ1osS0FBTCxFQUFZa0QsUUFBWixTQUF5QnJELElBQUksQ0FBQ3lJLFNBQTlCLEVBQXZCLENBQUwsRUFBd0U7QUFDdEUrQyxVQUFBQSxtQkFBbUIsQ0FBQ3hMLElBQUQsRUFBT3FELFFBQVAsQ0FBbkI7QUFDRDs7QUFDRE4sUUFBQUEsUUFBUSxDQUFDa04sZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUMsTUFBS2hOLGVBQXhDO0FBQ0EsZUFBTyxLQUFQO0FBQ0Q7O0FBQ0QsYUFBTyxJQUFQO0FBQ0QsS0FyNEJrQjs7QUFBQSxpRkF1NEJVLFVBQUNpTixPQUFELEVBQVVwUCxhQUFWLEVBQXlCcVAsWUFBekI7QUFBQSxhQUEwQyxZQUFNO0FBQzNFRCxRQUFBQSxPQUFPLENBQUNwUCxhQUFELEVBQWdCcVAsWUFBaEIsQ0FBUDtBQUNELE9BRjRCO0FBQUEsS0F2NEJWOztBQUFBLDRFQTI0QkssVUFBQTlNLFFBQVE7QUFBQSxhQUFJLE1BQUtWLEtBQUwsQ0FBV3lOLGVBQVgsQ0FDbEMsTUFBS3pOLEtBQUwsQ0FBVzVCLElBQVgsQ0FBZ0JxQixHQUFoQixDQUFvQmlCLFFBQXBCLENBRGtDLEVBRWxDQSxRQUZrQyxDQUFKO0FBQUEsS0EzNEJiOztBQUFBLGlFQWc1Qk4sVUFBQUMsR0FBRztBQUFBLGFBQUksVUFBQ21MLFNBQUQsRUFBZTtBQUFBLDJCQUc3QixNQUFLOUwsS0FId0I7QUFBQSxZQUUvQnJDLFVBRitCLGdCQUUvQkEsVUFGK0I7QUFBQSxZQUVuQkQsU0FGbUIsZ0JBRW5CQSxTQUZtQjtBQUFBLFlBRVJZLFVBRlEsZ0JBRVJBLFVBRlE7QUFBQSxZQUVJSixZQUZKLGdCQUVJQSxZQUZKO0FBQUEsWUFFa0JiLElBRmxCLGdCQUVrQkEsSUFGbEI7O0FBQUEsWUFJekJxRCxRQUp5QixHQUlGb0wsU0FKRSxDQUl6QnBMLFFBSnlCO0FBQUEsWUFJWlYsS0FKWSxpQ0FJRjhMLFNBSkU7O0FBS2pDLFlBQUlyQyxJQUFKO0FBQ0EsWUFBSWpFLFFBQVEsR0FBRyxNQUFmO0FBQ0EsWUFBSTBCLGFBQWEsR0FBRyxDQUFwQixDQVBpQyxDQU9WOztBQUN2QixZQUFJdkosVUFBSixFQUFnQnVKLGFBQWEsR0FBRzVJLFVBQVUsQ0FBQ0ssSUFBM0I7QUFDaEIsWUFBTStPLGlCQUFpQixHQUFHaE4sUUFBUSxHQUFHd0csYUFBckM7O0FBQ0EsWUFBSXZKLFVBQUosRUFBZ0I7QUFDZCxjQUFJK0MsUUFBUSxJQUFJd0csYUFBYSxHQUFHLENBQWhDLEVBQW1DO0FBQ2pDLGdCQUFJdkcsR0FBRyxDQUFDaUosVUFBUixFQUFvQjtBQUNsQkgsY0FBQUEsSUFBSSxHQUFHOUksR0FBRyxDQUFDaUosVUFBSixDQUNMbEosUUFESyxFQUVMLE1BQUtnTCxtQkFBTCxDQUF5QmhMLFFBQXpCLEVBQW1DQyxHQUFuQyxDQUZLLEVBR0wsTUFBSzhLLG1CQUFMLENBQXlCL0ssUUFBekIsRUFBbUNDLEdBQW5DLENBSEssQ0FBUDtBQUtBNkUsY0FBQUEsUUFBUSxHQUFHLFFBQVg7QUFDRCxhQVBELE1BT087QUFDTGlFLGNBQUFBLElBQUksR0FBRyxJQUFQO0FBQ0FqRSxjQUFBQSxRQUFRLEdBQUcsSUFBWDtBQUNEO0FBQ0YsV0FaRCxNQVlPO0FBQ0xpRSxZQUFBQSxJQUFJLEdBQUc5SSxHQUFHLENBQUM4SSxJQUFKLENBQ0xpRSxpQkFESyxFQUVMLE1BQUtoQyxtQkFBTCxDQUF5QmdDLGlCQUF6QixFQUE0Qy9NLEdBQTVDLENBRkssRUFHTCxNQUFLOEssbUJBQUwsQ0FBeUJpQyxpQkFBekIsRUFBNEMvTSxHQUE1QyxDQUhLLENBQVA7QUFLRDtBQUNGLFNBcEJELE1Bb0JPLElBQUlqRCxTQUFTLElBQUlpRCxHQUFHLENBQUNnSixRQUFyQixFQUErQjtBQUNwQ0YsVUFBQUEsSUFBSSxHQUFHOUksR0FBRyxDQUFDZ0osUUFBSixDQUNMK0QsaUJBREssRUFFTCxNQUFLbkMsaUJBQUwsQ0FBdUJtQyxpQkFBdkIsRUFBMEMvTSxHQUExQyxDQUZLLEVBR0wsTUFBSzBLLGlCQUFMLENBQXVCcUMsaUJBQXZCLEVBQTBDL00sR0FBMUMsQ0FISyxDQUFQO0FBS0E2RSxVQUFBQSxRQUFRLEdBQUcsTUFBWDtBQUNELFNBUE0sTUFPQTtBQUNMaUUsVUFBQUEsSUFBSSxHQUFHOUksR0FBRyxDQUFDOEksSUFBSixDQUNMaUUsaUJBREssRUFFTCxNQUFLbkMsaUJBQUwsQ0FBdUJtQyxpQkFBdkIsRUFBMEMvTSxHQUExQyxDQUZLLEVBR0wsTUFBSzBLLGlCQUFMLENBQXVCcUMsaUJBQXZCLEVBQTBDL00sR0FBMUMsQ0FISyxDQUFQO0FBS0Q7O0FBQ0QsWUFBTWdOLFNBQVMsR0FBRzNOLEtBQUssQ0FBQ1EsU0FBTixLQUFvQixtQkFBcEIsSUFBMkNSLEtBQUssQ0FBQ1EsU0FBTixLQUFvQixhQUFqRjs7QUFDQSxZQUFJLENBQUNnRixRQUFRLEtBQUssTUFBYixJQUF1QkEsUUFBUSxLQUFLLE1BQXBDLElBQThDQSxRQUFRLEtBQUssUUFBNUQsS0FBeUUsQ0FBQ21JLFNBQTlFLEVBQXlGO0FBQ3ZGLGNBQU1DLFdBQVcsR0FBR3BJLFFBQVEsS0FBSyxRQUFiLEdBQXdCOUUsUUFBeEIsR0FBbUNBLFFBQVEsR0FBR3dHLGFBQWxFOztBQUNBLGNBQU0yRyxXQUFXLEdBQUcsTUFBS0MsZUFBTCxDQUFxQkYsV0FBckIsRUFBa0NqTixHQUFsQyxFQUF1QzZFLFFBQXZDLENBQXBCOztBQUNBLGNBQU11SSxRQUFRLEdBQUcsTUFBS0MsWUFBTCxDQUFrQkosV0FBbEIsRUFBK0JqTixHQUEvQixFQUFvQzZFLFFBQXBDLENBQWpCOztBQUNBLGNBQU1tSCxTQUFTLEdBQUd6TyxZQUFZLENBQUN1QixHQUFiLENBQWlCLFVBQWpCLE1BQWlDaUIsUUFBakMsSUFDYnhDLFlBQVksQ0FBQ3VCLEdBQWIsQ0FBaUIsV0FBakIsTUFBa0NPLEtBQUssQ0FBQ1EsU0FEM0IsR0FFZCw4QkFGYyxHQUdkLGtCQUhKO0FBSUEsaUJBQ0UsZ0NBQUMsb0JBQUQsZUFDTVIsS0FETjtBQUVFLFlBQUEsU0FBUyxFQUFFMk0sU0FGYjtBQUdFLFlBQUEsS0FBSyxFQUFFaE0sR0FBRyxDQUFDc04sS0FIYjtBQUlFLFlBQUEsT0FBTyxFQUFFLE1BQUtDLGdCQUFMLENBQXNCMUksUUFBdEIsRUFBZ0M5RSxRQUFoQyxFQUEwQ1YsS0FBSyxDQUFDUSxTQUFoRDtBQUpYLGNBTUUsZ0NBQUMsdUJBQUQ7QUFDRSxZQUFBLEVBQUUsc0JBQW9CbkQsSUFBSSxDQUFDSSxFQUF6QixTQUErQnVDLEtBQUssQ0FBQ1EsU0FBckMsU0FBa0RFLFFBRHREO0FBRUUsWUFBQSxRQUFRLEVBQUVxTixRQUZaO0FBR0UsWUFBQSxPQUFPLEVBQUUsQ0FBQyxDQUFDRixXQUFXLENBQUNyRyxZQUh6QjtBQUlFLFlBQUEsU0FBUyxFQUFFLENBQUMsQ0FBQ3FHLFdBQVcsQ0FBQ3BHLGNBSjNCO0FBS0UsWUFBQSxXQUFXLEVBQUVvRyxXQUFXLENBQUN0RyxXQUwzQjtBQU1FLFlBQUEsWUFBWSxFQUFFc0csV0FBVyxDQUFDckcsWUFONUI7QUFPRSxZQUFBLGNBQWMsRUFBRXFHLFdBQVcsQ0FBQ3BHO0FBUDlCLGFBU0dnQyxJQVRILENBTkYsQ0FERjtBQW9CRDs7QUFDRCxlQUNFLGdDQUFDLG9CQUFELGVBQVV6SixLQUFWO0FBQWlCLFVBQUEsU0FBUyxFQUFDLGtCQUEzQjtBQUE4QyxVQUFBLEtBQUssRUFBRVcsR0FBRyxDQUFDc047QUFBekQsWUFDR3hFLElBREgsQ0FERjtBQUtELE9BL0VlO0FBQUEsS0FoNUJHOztBQUFBLG9FQWkrQkgsWUFBTTtBQUFBLHlCQUdoQixNQUFLekosS0FIVztBQUFBLFVBRWxCdEIsV0FGa0IsZ0JBRWxCQSxXQUZrQjtBQUFBLFVBRUxyQixJQUZLLGdCQUVMQSxJQUZLO0FBQUEsVUFFQ00sVUFGRCxnQkFFQ0EsVUFGRDtBQUFBLFVBRWFMLE1BRmIsZ0JBRWFBLE1BRmI7QUFBQSxVQUVxQlUsY0FGckIsZ0JBRXFCQSxjQUZyQjs7QUFJcEIsVUFBSSxDQUFDVSxXQUFELElBQWdCLENBQUNwQixNQUFqQixJQUEyQixDQUFDSyxVQUE1QixJQUEwQyxDQUFDTixJQUFJLENBQUN5QyxVQUFwRCxFQUFnRTtBQUM5RCxlQUNFLGdDQUFDLHNCQUFEO0FBQ0UsVUFBQSxTQUFTLEVBQUMsaUJBRFo7QUFFRSxVQUFBLE1BQU0sRUFDSixnQ0FBQyxvQkFBRDtBQUFNLFlBQUEsS0FBSyxFQUFFO0FBQUVxTyxjQUFBQSxTQUFTLEVBQUU7QUFBYjtBQUFiLGFBQ0UsZ0NBQUMsMkJBQUQ7QUFBRyxZQUFBLEVBQUUsRUFBQztBQUFOLFlBREYsQ0FISjtBQU9FLFVBQUEsS0FBSyxFQUFFLEVBUFQ7QUFRRSxVQUFBLFdBQVcsRUFBRSxLQVJmO0FBU0UsVUFBQSxRQUFRLEVBQUU7QUFUWixVQURGO0FBYUQ7O0FBQ0QsVUFBSSxDQUFDblEsY0FBYyxDQUFDVyxJQUFwQixFQUEwQjtBQUN4QixZQUFJckIsTUFBSixFQUFZO0FBQ1YsaUJBQ0UsZ0NBQUMsc0JBQUQ7QUFDRSxZQUFBLFNBQVMsRUFBQyxpQkFEWjtBQUVFLFlBQUEsTUFBTSxFQUFFLGdDQUFDLG9CQUFELGVBRlY7QUFHRSxZQUFBLEtBQUssRUFBRSxFQUhUO0FBSUUsWUFBQSxXQUFXLEVBQUUsS0FKZjtBQUtFLFlBQUEsUUFBUSxFQUFFO0FBTFosWUFERjtBQVNEOztBQUNELGVBQ0UsZ0NBQUMsc0JBQUQ7QUFDRSxVQUFBLFNBQVMsRUFBQyxpQkFEWjtBQUVFLFVBQUEsTUFBTSxFQUNKLGdDQUFDLG9CQUFEO0FBQU0sWUFBQSxLQUFLLEVBQUU7QUFBRTZRLGNBQUFBLFNBQVMsRUFBRTtBQUFiO0FBQWIsYUFDRSxnQ0FBQywyQkFBRDtBQUFHLFlBQUEsRUFBRSxFQUFDO0FBQU4sWUFERixDQUhKO0FBT0UsVUFBQSxLQUFLLEVBQUUsRUFQVDtBQVFFLFVBQUEsV0FBVyxFQUFFLEtBUmY7QUFTRSxVQUFBLFFBQVEsRUFBRTtBQVRaLFVBREY7QUFhRDs7QUFDRCxVQUFNNU0sT0FBTyxHQUFHLE1BQUs2TSxlQUFMLEVBQWhCOztBQUNBLFVBQUk3TSxPQUFPLENBQUM4TSxNQUFSLEtBQW1CLENBQXZCLEVBQTBCLE9BQU8sSUFBUDtBQUMxQixhQUFPOU0sT0FBTyxDQUFDK00sR0FBUixDQUFZLFVBQUEzTixHQUFHO0FBQUEsZUFDcEIsZ0NBQUMsc0JBQUQ7QUFDRSxVQUFBLEdBQUcsRUFBRUEsR0FBRyxDQUFDSCxTQURYO0FBRUUsVUFBQSxTQUFTLEVBQUVHLEdBQUcsQ0FBQ0gsU0FGakI7QUFHRSxVQUFBLE1BQU0sRUFDSixnQ0FBQyxzQkFBRDtBQUNFLFlBQUEsRUFBRSx3QkFBc0IsTUFBS1IsS0FBTCxDQUFXM0MsSUFBWCxDQUFnQkksRUFBdEMsU0FBNENrRCxHQUFHLENBQUNILFNBRHBEO0FBRUUsWUFBQSxJQUFJLEVBQUUsTUFBS1IsS0FBTCxDQUFXM0MsSUFGbkI7QUFHRSxZQUFBLE9BQU8sRUFBRSxNQUFLMkMsS0FBTCxDQUFXdUIsT0FIdEI7QUFJRSxZQUFBLE1BQU0sRUFBRVosR0FKVjtBQUtFLFlBQUEsaUJBQWlCLEVBQUUsTUFBS1gsS0FBTCxDQUFXbEMsVUFMaEM7QUFNRSxZQUFBLGdCQUFnQixFQUFFLE1BQUtrQyxLQUFMLENBQVdqQyxTQU4vQjtBQU9FLFlBQUEsWUFBWSxFQUFFLE1BQUtpQyxLQUFMLENBQVd1TyxVQVAzQjtBQVFFLFlBQUEsTUFBTSxFQUFFLE1BQUt2TyxLQUFMLENBQVcxQyxNQVJyQjtBQVNFLFlBQUEsU0FBUyxFQUFFLE1BQUswQyxLQUFMLENBQVcrSSxTQUFYLElBQXdCLE1BQUsvSSxLQUFMLENBQVdwQyxXQVRoRDtBQVVFLFlBQUEsS0FBSyxFQUFFLE1BQUtvQyxLQUFMLENBQVcvQixZQUFYLENBQXdCd0IsR0FBeEIsQ0FBNEJrQixHQUFHLENBQUNILFNBQWhDLEVBQTJDRyxHQUFHLENBQUMySSxLQUEvQztBQVZULGFBWUczSSxHQUFHLENBQUNtSixNQVpQLENBSko7QUFtQkUsVUFBQSxJQUFJLEVBQUUsTUFBSzBFLFVBQUwsQ0FBZ0I3TixHQUFoQixDQW5CUjtBQW9CRSxVQUFBLEtBQUssRUFBRSxNQUFLWCxLQUFMLENBQVcvQixZQUFYLENBQXdCd0IsR0FBeEIsQ0FBNEJrQixHQUFHLENBQUNILFNBQWhDLEVBQTJDRyxHQUFHLENBQUMySSxLQUEvQyxDQXBCVDtBQXFCRSxVQUFBLFFBQVEsRUFBRTNJLEdBQUcsQ0FBQzhOLFFBckJoQjtBQXNCRSxVQUFBLFFBQVEsRUFBRTlOLEdBQUcsQ0FBQytOLFFBdEJoQjtBQXVCRSxVQUFBLFdBQVcsRUFBRS9OLEdBQUcsQ0FBQzRJLFdBdkJuQjtBQXdCRSxVQUFBLFFBQVEsRUFBRTVJLEdBQUcsQ0FBQ2dPLFFBQUosR0FBZWhPLEdBQUcsQ0FBQ2dPLFFBQW5CLEdBQThCLENBeEIxQztBQXlCRSxVQUFBLEtBQUssRUFBRWhPLEdBQUcsQ0FBQ2lPLEtBekJiO0FBMEJFLFVBQUEsVUFBVSxFQUFFak8sR0FBRyxDQUFDa08sVUExQmxCO0FBMkJFLFVBQUEsbUJBQW1CLEVBQUVsTyxHQUFHLENBQUNtTztBQTNCM0IsVUFEb0I7QUFBQSxPQUFmLENBQVA7QUErQkQsS0EvaUNrQjs7QUFBQSx3RUFpakNDLFlBQU07QUFBQSx5QkFHcEIsTUFBSzlPLEtBSGU7QUFBQSxVQUV0QkMsZ0JBRnNCLGdCQUV0QkEsZ0JBRnNCO0FBQUEsVUFFSjdCLElBRkksZ0JBRUpBLElBRkk7QUFBQSxVQUVFZixJQUZGLGdCQUVFQSxJQUZGO0FBQUEsVUFFUWMsYUFGUixnQkFFUUEsYUFGUjtBQUFBLHdCQUllLE1BQUtqQixLQUpwQjtBQUFBLFVBSWhCZ1EsWUFKZ0IsZUFJaEJBLFlBSmdCO0FBQUEsVUFJRkUsWUFKRSxlQUlGQSxZQUpFO0FBS3hCLFVBQU1hLEtBQUssR0FBRztBQUNaYyxRQUFBQSxPQUFPLEVBQUUsT0FERztBQUVaQyxRQUFBQSxNQUFNLEVBQUUsS0FGSTtBQUdaQyxRQUFBQSxRQUFRLEVBQUUsVUFIRTtBQUlaQyxRQUFBQSxHQUFHLEVBQUs5QixZQUFMLE9BSlM7QUFLWitCLFFBQUFBLElBQUksRUFBS2pDLFlBQUw7QUFMUSxPQUFkO0FBT0EsVUFBTU0sWUFBWSxHQUFHcFAsSUFBSSxDQUFDdU4sTUFBTCxDQUFZLFVBQUF5RCxDQUFDO0FBQUEsZUFBSWpSLGFBQWEsQ0FBQ3VFLFFBQWQsQ0FBdUIwTSxDQUFDLENBQUM1UixLQUFGLENBQVFILElBQUksQ0FBQ3lJLFNBQWIsQ0FBdkIsQ0FBSjtBQUFBLE9BQWIsQ0FBckI7QUFDQSxhQUNFO0FBQUksUUFBQSxTQUFTLEVBQUMsNkNBQWQ7QUFBNEQsUUFBQSxLQUFLLEVBQUVtSTtBQUFuRSxTQUNHaE8sZ0JBQWdCLElBQ1pBLGdCQUFnQixDQUFDcU8sR0FEckIsSUFFSXJPLGdCQUFnQixDQUFDcU8sR0FBakIsQ0FBcUIsVUFBQ2UsSUFBRCxFQUFPMU4sQ0FBUCxFQUFhO0FBQUEsWUFDN0JnQyxRQUQ2QixHQUNoQjBMLElBRGdCLENBQzdCMUwsUUFENkI7O0FBRW5DLFlBQUksT0FBTzBMLElBQUksQ0FBQzFMLFFBQVosS0FBeUIsVUFBN0IsRUFBeUM7QUFDdkNBLFVBQUFBLFFBQVEsR0FBRzBMLElBQUksQ0FBQzFMLFFBQUwsQ0FBY3hGLGFBQWQsRUFBNkJxUCxZQUE3QixDQUFYO0FBQ0Q7O0FBQ0QsZUFDRSxnQ0FBQyx3QkFBRDtBQUNFLFVBQUEsR0FBRyxFQUFFN0wsQ0FEUCxDQUNVO0FBRFY7QUFFRSxVQUFBLE1BQU0sRUFBRTBOLElBQUksQ0FBQ3ZGLE1BRmY7QUFHRSxVQUFBLE9BQU8sRUFBRXVGLElBQUksQ0FBQ0MsT0FIaEI7QUFJRSxVQUFBLFFBQVEsRUFBRTNMLFFBSlo7QUFLRSxVQUFBLEtBQUssRUFBRTBMLElBQUksQ0FBQ0UsS0FMZDtBQU1FLFVBQUEsT0FBTyxFQUNMNUwsUUFBUSxJQUFJLENBQUMwTCxJQUFJLENBQUM5QixPQUFsQixHQUNJLElBREosR0FFSSxNQUFLaUMsMEJBQUwsQ0FBZ0NILElBQUksQ0FBQzlCLE9BQXJDLEVBQThDcFAsYUFBOUMsRUFBNkRxUCxZQUE3RDtBQVRSLFdBWUc2QixJQUFJLENBQUNoTixLQVpSLENBREY7QUFnQkQsT0FyQkUsQ0FIUCxDQURGO0FBNEJELEtBMWxDa0I7O0FBRWpCLFVBQUtuRixLQUFMLEdBQWE7QUFDWDJLLE1BQUFBLFVBQVUsRUFBRSxDQUREO0FBRVhhLE1BQUFBLGFBQWEsRUFBRSxDQUZKO0FBR1h2SSxNQUFBQSxlQUFlLEVBQUUsS0FITjtBQUlYK00sTUFBQUEsWUFBWSxFQUFFLElBSkg7QUFLWEUsTUFBQUEsWUFBWSxFQUFFO0FBTEgsS0FBYjtBQU9BLFVBQUtyTSxRQUFMLEdBQWdCLEVBQWhCO0FBQ0EsVUFBS0MsY0FBTCxHQUFzQixFQUF0QjtBQUNBLFVBQUtpQyxpQkFBTCxHQUF5QixLQUF6QjtBQUNBLFVBQUtxRixlQUFMLEdBQXVCLEtBQXZCLENBWmlCLENBWWE7O0FBQzlCLFVBQUs4RCxnQkFBTCxHQUF3QixLQUF4QixDQWJpQixDQWFjOztBQWJkO0FBY2xCOzs7O1NBRURxRCxvQixHQUFBLGdDQUF1QjtBQUNyQnJQLElBQUFBLFFBQVEsQ0FBQ0MsbUJBQVQsQ0FBNkIsT0FBN0IsRUFBc0MsS0FBS0MsZUFBM0M7QUFDQSxTQUFLTixLQUFMLENBQVcwUCxVQUFYLENBQXNCLEtBQUsxUCxLQUFMLENBQVczQyxJQUFqQztBQUNELEc7O1NBeWtDRHNTLE0sR0FBQSxrQkFBUztBQUFBOztBQUNQLFFBQU1DLGFBQWEsR0FBRztBQUNwQiwrQkFBeUIsSUFETDtBQUVwQix3QkFBa0IsS0FBSzVQLEtBQUwsQ0FBVzhJLFVBQVgsSUFBeUIsQ0FBQyxLQUFLOUksS0FBTCxDQUFXNlAsZ0JBRm5DO0FBR3BCLGlCQUFXLEtBQUs3UCxLQUFMLENBQVcxQyxNQUhGO0FBSXBCLG9CQUFjLEtBQUswQyxLQUFMLENBQVd0QyxTQUpMO0FBS3BCLHFCQUFlLEtBQUtzQyxLQUFMLENBQVdyQztBQUxOLG1CQU1uQixLQUFLcUMsS0FBTCxDQUFXMk0sU0FOUSxJQU1JLENBQUMsQ0FBQyxLQUFLM00sS0FBTCxDQUFXMk0sU0FOakIsZUFBdEIsQ0FETyxDQVVQOztBQUNBLFNBQUttRCxVQUFMLENBQWdCLEtBQUs5UCxLQUFMLENBQVdOLFNBQTNCO0FBRUEsUUFBSXFRLFNBQVMsR0FBRyxJQUFoQjtBQUNBLFFBQUlDLGNBQWMsR0FBRyxJQUFyQjtBQUNBLFFBQUlDLGFBQWEsR0FBRyxJQUFwQjs7QUFDQSxRQUNFLENBQUMsS0FBS2pRLEtBQUwsQ0FBVytQLFNBQVgsSUFDSSxLQUFLL1AsS0FBTCxDQUFXOEksVUFEZixJQUVJLEtBQUs5SSxLQUFMLENBQVcrSSxTQUZmLElBR0ksS0FBSy9JLEtBQUwsQ0FBV2tRLFFBSGhCLEtBSUcsQ0FBQyxLQUFLbFEsS0FBTCxDQUFXNlAsZ0JBTGpCLEVBTUU7QUFDQUcsTUFBQUEsY0FBYyxHQUNaLGdDQUFDLHFCQUFEO0FBQVcsUUFBQSxRQUFRLEVBQUM7QUFBcEIsU0FDRTtBQUFLLFFBQUEsU0FBUyxFQUFDO0FBQWYsU0FBOEMsS0FBS2hRLEtBQUwsQ0FBVytQLFNBQXpELENBREYsRUFFRyxLQUFLL1AsS0FBTCxDQUFXK0ksU0FBWCxJQUNJLEtBQUsvSSxLQUFMLENBQVdtUSxlQURmLElBRUksQ0FBQyxLQUFLblEsS0FBTCxDQUFXb1Esd0JBRmhCLElBRTRDLGdDQUFDLDZCQUFELEVBQXVCLEtBQUtwUSxLQUE1QixDQUovQyxFQUtHLEtBQUtBLEtBQUwsQ0FBVzhJLFVBQVgsSUFDQyxnQ0FBQyw4QkFBRDtBQUNFLFFBQUEsWUFBWSxFQUFFLEtBQUt1SCxrQkFEckI7QUFFRSxRQUFBLGNBQWMsRUFBRSxLQUFLQyxvQkFGdkI7QUFHRSxRQUFBLG9CQUFvQixFQUFFLEtBQUtDO0FBSDdCLFNBSU0sS0FBS3ZRLEtBSlgsRUFOSixFQWFHLENBQUMsS0FBS0EsS0FBTCxDQUFXd1EsaUJBQVgsSUFDRyxLQUFLeFEsS0FBTCxDQUFXa1EsUUFEZCxJQUVHLEtBQUtsUSxLQUFMLENBQVd5USxjQUZkLElBR0ksS0FBS3pRLEtBQUwsQ0FBVytJLFNBQVgsSUFBd0IsQ0FBQyxLQUFLL0ksS0FBTCxDQUFXbVEsZUFIekMsS0FJQyxnQ0FBQyw0QkFBRCxFQUFzQixLQUFLblEsS0FBM0IsQ0FqQkosQ0FERjtBQXNCRDs7QUFDRCxRQUFJLEtBQUtBLEtBQUwsQ0FBV2lRLGFBQVgsSUFBNEIsS0FBS2pRLEtBQUwsQ0FBVzBRLFVBQTNDLEVBQXVEO0FBQ3JEVCxNQUFBQSxhQUFhLEdBQ1gsZ0NBQUMscUJBQUQ7QUFBVyxRQUFBLFFBQVEsRUFBQztBQUFwQixTQUNFO0FBQUssUUFBQSxTQUFTLEVBQUM7QUFBZixTQUF5QyxLQUFLalEsS0FBTCxDQUFXMFEsVUFBcEQsQ0FERixFQUVFO0FBQUssUUFBQSxTQUFTLEVBQUM7QUFBZixTQUE2QyxLQUFLMVEsS0FBTCxDQUFXaVEsYUFBeEQsQ0FGRixDQURGO0FBTUQ7O0FBQ0QsUUFBSUEsYUFBYSxJQUFJRCxjQUFyQixFQUFxQztBQUNuQ0QsTUFBQUEsU0FBUyxHQUNQO0FBQUssUUFBQSxTQUFTLEVBQUM7QUFBZixTQUNHRSxhQURILEVBRUdELGNBRkgsQ0FERjtBQU1EOztBQUNELFFBQUlXLFNBQVMsR0FBRyxLQUFLM1EsS0FBTCxDQUFXMlEsU0FBWCxJQUF3QixLQUFLM1EsS0FBTCxDQUFXMlEsU0FBWCxLQUF5QixDQUFqRCxHQUNaLEtBQUszUSxLQUFMLENBQVcyUSxTQURDLEdBRVosS0FBSzNRLEtBQUwsQ0FBVzVCLElBQVgsQ0FBZ0JPLElBRnBCO0FBR0EsUUFBSSxLQUFLcUIsS0FBTCxDQUFXckMsVUFBZixFQUEyQmdULFNBQVMsSUFBSSxLQUFLM1EsS0FBTCxDQUFXMUIsVUFBWCxDQUFzQkssSUFBbkM7QUFDM0IsUUFBSSxDQUFDLEtBQUtxQixLQUFMLENBQVdoQyxjQUFYLENBQTBCVyxJQUEvQixFQUFxQ2dTLFNBQVMsR0FBRyxDQUFaO0FBQ3JDLFdBQ0U7QUFDRSxNQUFBLEVBQUUsbUJBQWlCLEtBQUszUSxLQUFMLENBQVczQyxJQUFYLENBQWdCSSxFQURyQztBQUVFLE1BQUEsU0FBUyxFQUFFbVMsYUFGYjtBQUdFLE1BQUEsS0FBSyxFQUFFLEtBQUs1UCxLQUFMLENBQVc0UTtBQUhwQixPQUtHLEtBQUs1USxLQUFMLENBQVcxQyxNQUFYLElBQXFCLGdDQUFDLHdCQUFELE9BTHhCLEVBTUcsS0FBS0osS0FBTCxDQUFXaUQsZUFBWCxJQUE4QixLQUFLMFEsaUJBQUwsRUFOakMsRUFPR2QsU0FQSCxFQVFFLGdDQUFDLG9DQUFEO0FBQ0UsTUFBQSxFQUFFLEVBQUUsS0FBSy9QLEtBQUwsQ0FBVzNDLElBQVgsQ0FBZ0JJLEVBRHRCO0FBRUUsTUFBQSxTQUFTLEVBQUVrVCxTQUZiO0FBR0UsTUFBQSxZQUFZLEVBQ1QsS0FBSzNRLEtBQUwsQ0FBVytJLFNBQVgsSUFBd0IsS0FBSy9JLEtBQUwsQ0FBV3BDLFdBQXBDLEdBQ0ksS0FBS29DLEtBQUwsQ0FBVzhRLFlBQVgsR0FBMEIsS0FBSzlRLEtBQUwsQ0FBVytRLGVBRHpDLEdBRUksS0FBSy9RLEtBQUwsQ0FBVzhRLFlBTm5CO0FBUUUsTUFBQSxTQUFTLEVBQUUsS0FBSzlRLEtBQUwsQ0FBV2dSLFNBUnhCO0FBU0UsTUFBQSx5QkFBeUIsRUFBRSxLQUFLQyx5QkFUbEM7QUFVRSxNQUFBLGdCQUFnQixFQUFFLEtBVnBCO0FBV0UsTUFBQSxVQUFVLEVBQUUsS0FBS0MsY0FYbkI7QUFZRSxNQUFBLGNBQWMsRUFBRSxLQUFLbFIsS0FBTCxDQUFXbVIsY0FBWCxJQUE2QixLQUFLalUsS0FBTCxDQUFXd0wsYUFaMUQ7QUFhRSxNQUFBLFNBQVMsRUFBRSxLQUFLMUksS0FBTCxDQUFXb1IsU0FieEI7QUFjRSxNQUFBLFdBQVcsRUFBRSxLQUFLQyxjQUFMLEVBZGY7QUFlRSxNQUFBLGdCQUFnQixFQUFFLEtBQUtyUixLQUFMLENBQVdzUixnQkFmL0I7QUFnQkUsTUFBQSxjQUFjLEVBQUUsS0FBS3RSLEtBQUwsQ0FBV3VSLFdBaEI3QjtBQWlCRSxNQUFBLGVBQWUsRUFBRSxLQUFLdlIsS0FBTCxDQUFXd1IsZUFqQjlCO0FBa0JFLE1BQUEsZUFBZSxFQUFFLEtBQUt4UixLQUFMLENBQVd5UixlQWxCOUI7QUFtQkUsTUFBQSxhQUFhLEVBQUUsS0FBS3pSLEtBQUwsQ0FBVzBSLGFBbkI1QjtBQW9CRSxNQUFBLFdBQVcsRUFBRSxLQUFLMVIsS0FBTCxDQUFXMlIsV0FwQjFCO0FBcUJFLE1BQUEsa0JBQWtCLEVBQUUsS0FBS0MsZUFyQjNCO0FBc0JFLE1BQUEsZUFBZSxFQUFFLEtBQUs1UixLQUFMLENBQVd5TixlQUFYLElBQThCLEtBQUtvRSxxQkF0QnREO0FBdUJFLE1BQUEscUJBQXFCLEVBQUUsS0FBSzdSLEtBQUwsQ0FBVzhSLHFCQXZCcEM7QUF3QkUsTUFBQSxnQkFBZ0IsRUFBRSxLQUFLQztBQXhCekIsT0EwQkcsS0FBS0MsYUFBTCxFQTFCSCxDQVJGLEVBb0NHLEtBQUtoUyxLQUFMLENBQVduQyx5QkFBWCxJQUNDLGdDQUFDLDBCQUFEO0FBQ0UsTUFBQSxJQUFJLEVBQUUsS0FBS21DLEtBQUwsQ0FBVzNDLElBRG5CO0FBRUUsTUFBQSxPQUFPLEVBQUUsS0FBSzJDLEtBQUwsQ0FBV3VCLE9BRnRCO0FBR0UsTUFBQSxjQUFjLEVBQUUsS0FBS3ZCLEtBQUwsQ0FBV2hDLGNBSDdCO0FBSUUsTUFBQSx3QkFBd0IsRUFBRSxLQUFLZ0MsS0FBTCxDQUFXaVMsd0JBSnZDO0FBS0UsTUFBQSxrQkFBa0IsRUFBRSxLQUFLalMsS0FBTCxDQUFXa1M7QUFMakMsTUFyQ0osRUE2Q0csS0FBS2xTLEtBQUwsQ0FBV21TLFFBN0NkLENBREY7QUFpREQsRzs7O0VBcnRDb0JDLGtCQUFNQyxhLDRDQUdMQyx1QjtlQXF0Q1R6UyxRIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tbG9uZWx5LWlmLCBwcmVmZXItdGVtcGxhdGUsIHJlYWN0L3JlcXVpcmUtZGVmYXVsdC1wcm9wcyAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IE1hcCwgTGlzdCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgaW5qZWN0SW50bCwgRm9ybWF0dGVkTWVzc2FnZSBhcyBNIH0gZnJvbSAncmVhY3QtaW50bCc7XG5pbXBvcnQgeyBDb2x1bW4sIENlbGwgfSBmcm9tICdmaXhlZC1kYXRhLXRhYmxlLTInO1xuaW1wb3J0IHsgTWVudUl0ZW0gfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyBJY29uIH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtaWNvbnMnO1xuaW1wb3J0IFNwaW5uZXIgZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3Qtc3Bpbm5lcic7XG5pbXBvcnQgQ2hlY2tib3ggZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtY2hlY2tib3gnO1xuaW1wb3J0ICdmaXhlZC1kYXRhLXRhYmxlLTIvZGlzdC9maXhlZC1kYXRhLXRhYmxlLmNzcyc7XG5cbmltcG9ydCBSZXNwb25zaXZlRml4ZWREYXRhVGFibGUgZnJvbSAnLi9yZXNwb25zaXZlLWZpeGVkLWRhdGEtdGFibGUuY29tcG9uZW50JztcbmltcG9ydCBIZWFkZXJDZWxsIGZyb20gJy4vaGVhZGVyLWNlbGwuY29tcG9uZW50JztcbmltcG9ydCBBY3Rpb25CYXIgZnJvbSAnLi9hY3Rpb24tYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgSW5saW5lRWRpdENvbnRyb2xzIGZyb20gJy4vaW5saW5lLWVkaXQtY29udHJvbHMuY29tcG9uZW50JztcbmltcG9ydCBGaWx0ZXJpbmdDb250cm9scyBmcm9tICcuL2ZpbHRlcmluZy1jb250cm9scy5jb21wb25lbnQnO1xuaW1wb3J0IERyb3Bkb3duQ29udHJvbHMgZnJvbSAnLi9kcm9wZG93bi1jb250cm9scy5jb21wb25lbnQnO1xuaW1wb3J0ICogYXMgZGF0YWdyaWRBY3Rpb25zIGZyb20gJy4vZGF0YWdyaWQuYWN0aW9ucyc7XG5pbXBvcnQgQ2VsbFRvb2x0aXAgZnJvbSAnLi9jZWxsLXRvb2x0aXAuY29tcG9uZW50JztcbmltcG9ydCBDb2x1bW5TZXR0aW5nc01vZGFsIGZyb20gJy4vY29sdW1uLXNldHRpbmdzL2NvbHVtbi1zZXR0aW5ncy5jb21wb25lbnQnO1xuaW1wb3J0IHsgcHJvcFR5cGVzLCBkZWZhdWx0UHJvcHMgfSBmcm9tICcuL2RhdGFncmlkLnByb3BzJztcbmltcG9ydCB7IEtFWV9DT0RFUyB9IGZyb20gJy4vZGF0YWdyaWQuY29uc3RhbnRzJztcbmltcG9ydCBwYWdpbmF0aW9uIGZyb20gJy4vcGFnaW5hdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4vZGF0YWdyaWQudXRpbHMnO1xuaW1wb3J0IEdyaWRDb2x1bW5TZXJ2aWNlIGZyb20gJy4vY29sdW1uLXNlcnZpY2UvY29sdW1uLXNlcnZpY2UnO1xuaW1wb3J0ICcuL2RhdGFncmlkLmNvbXBvbmVudC5zY3NzJztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlLCBvd25Qcm9wcykgPT4ge1xuICBjb25zdCBHUklEID0gb3duUHJvcHMuZ3JpZDtcbiAgcmV0dXJuIHtcbiAgICBpc0J1c3k6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdpc0J1c3knXSwgdHJ1ZSksXG4gICAgaXNFZGl0aW5nOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnaXNFZGl0aW5nJ10sIGZhbHNlKSxcbiAgICBpc0NyZWF0aW5nOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnaXNDcmVhdGluZyddLCBmYWxzZSksXG4gICAgaXNGaWx0ZXJpbmc6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnaXNGaWx0ZXJpbmcnXSwgZmFsc2UpLFxuICAgIGlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW46IHN0YXRlLmRhdGFncmlkLmdldEluKFxuICAgICAgW0dSSUQuaWQsICdzZXNzaW9uJywgJ2NvbHVtblNldHRpbmdzTW9kYWwnLCAnb3BlbiddLFxuICAgICAgZmFsc2UsXG4gICAgKSxcbiAgICBzb3J0Q29sdW1uOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdzb3J0aW5nRGF0YScsICdzb3J0Q29sdW1uJ10sIG51bGwpLFxuICAgIHNvcnRPcmRlcjogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnc29ydGluZ0RhdGEnLCAnc29ydE9yZGVyJ10sIG51bGwpLFxuICAgIHZpc2libGVDb2x1bW5zOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICd2aXNpYmxlQ29sdW1ucyddLCBMaXN0KCkpLFxuICAgIGNvbHVtbldpZHRoczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnY29sdW1uV2lkdGhzJ10sIE1hcCgpKSxcbiAgICBzZWxlY3RlZENlbGw6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2VsZWN0ZWRDZWxsJ10sIE1hcCgpKSxcbiAgICBzZWxlY3RlZEl0ZW1zOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3NlbGVjdGVkSXRlbXMnXSwgTGlzdCgpKSxcbiAgICBkYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2RhdGEnXSwgTGlzdCgpKSxcbiAgICBlZGl0RGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdlZGl0RGF0YSddLCBNYXAoKSksXG4gICAgY3JlYXRlRGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjcmVhdGVEYXRhJ10sIExpc3QoKSksXG4gICAgZmlsdGVyRGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdmaWx0ZXJEYXRhJ10sIE1hcCgpKSxcbiAgICBjZWxsTWVzc2FnZXM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY2VsbE1lc3NhZ2VzJ10sIE1hcCgpKSxcbiAgICBjcmVhdGVDZWxsTWVzc2FnZXM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY3JlYXRlQ2VsbE1lc3NhZ2VzJ10sIE1hcCgpKSxcbiAgICBhbGxEYXRhU2l6ZTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdhbGxEYXRhJ10sIExpc3QoKSkuc2l6ZSxcbiAgICBsYW5ndWFnZTogVXRpbHMuZ2V0TGFuZ3VhZ2UoR1JJRCwgc3RhdGUudXNlciksXG4gICAgcmVnaW9uOiBVdGlscy5nZXRSZWdpb24oR1JJRCwgc3RhdGUudXNlciksXG4gICAgZGF0ZUZvcm1hdDogVXRpbHMuZ2V0RGF0ZUZvcm1hdChHUklELCBzdGF0ZS51c2VyKSxcbiAgICB0aG91c2FuZFNlcGFyYXRvcjogVXRpbHMuZ2V0VGhvdXNhbmRTZXBhcmF0b3IoR1JJRCwgc3RhdGUudXNlciksXG4gICAgZGVjaW1hbFNlcGFyYXRvcjogVXRpbHMuZ2V0RGVjaW1hbFNlcGFyYXRvcihHUklELCBzdGF0ZS51c2VyKSxcbiAgICBmb3JjZVJlZnJlc2hUaW1lc3RhbXA6IHN0YXRlLmRhdGFncmlkLmdldCgnZm9yY2VSZWZyZXNoJywgMCksIC8vIGZvcmNlIHJlLXJlbmRlciB3aGVuIGNoYW5nZWRcbiAgICBmb2N1c1R5cGU6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdmb2N1c1R5cGUnXSwgTWFwKCkpLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGF0YWdyaWRBY3Rpb25zO1xuXG5AcGFnaW5hdGlvblxuQGluamVjdEludGxcbkBjb25uZWN0KFxuICBtYXBTdGF0ZVRvUHJvcHMsXG4gIG1hcERpc3BhdGNoVG9Qcm9wcyxcbilcbmNsYXNzIERhdGFHcmlkIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSBwcm9wVHlwZXM7XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY3VycmVudFJvdzogMCxcbiAgICAgIGN1cnJlbnRDb2x1bW46IDAsXG4gICAgICBjb250ZXh0TWVudU9wZW46IGZhbHNlLFxuICAgICAgY29udGV4dE1lbnVYOiBudWxsLFxuICAgICAgY29udGV4dE1lbnVZOiBudWxsLFxuICAgIH07XG4gICAgdGhpcy5jZWxsUmVmcyA9IHt9O1xuICAgIHRoaXMuY3JlYXRlQ2VsbFJlZnMgPSB7fTtcbiAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsID0gZmFsc2U7XG4gICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTsgLy8gVE9ETzogSGFuZGxlIGZvY3VzaW5nIHdoZW4gdHJ1ZVxuICAgIHRoaXMuZm9jdXNUb0Vycm9yQ2VsbCA9IGZhbHNlOyAvLyBUT0RPOiBIYW5kbGUgZm9jdXNpbmcgd2hlbiB0cnVlXG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25Eb2N1bWVudENsaWNrKTtcbiAgICB0aGlzLnByb3BzLmludmFsaWRhdGUodGhpcy5wcm9wcy5ncmlkKTtcbiAgfVxuXG4gIG9uRG9jdW1lbnRDbGljayA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5jb250ZXh0TWVudUl0ZW1zKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY29udGV4dE1lbnVPcGVuOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25Eb2N1bWVudENsaWNrKTtcbiAgfTtcblxuICBvbkNvbHVtblJlc2l6ZUVuZENhbGxiYWNrID0gKG5ld0NvbHVtbldpZHRoLCBjb2x1bW5LZXkpID0+IHtcbiAgICB0aGlzLnByb3BzLnJlc2l6ZUNvbHVtbih0aGlzLnByb3BzLmdyaWQsIGNvbHVtbktleSwgbmV3Q29sdW1uV2lkdGgpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gcm93SW5kZXggKGludClcbiAgICogQHBhcmFtIGNvbCAob2JqKS4gQ29sdW1uIG9iamVjdC5cbiAgICogQHBhcmFtIGUuIE9yaWdpbmFsIEtleURvd24gZXZlbnRcbiAgICogQHBhcmFtIGNyZWF0ZSAoYm9vbCkuIElzIHRoZSBjZWxsIGNyZWF0ZSBjZWxsIG9yIGVkaXQgY2VsbD9cbiAgICovXG4gIG9uQ2VsbEtleURvd24gPSAocm93SW5kZXgsIGNvbCwgZSwgY3JlYXRlID0gZmFsc2UpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5lbmFibGVBcnJvd05hdmlnYXRpb24pIHtcbiAgICAgIGNvbnN0IGNlbGxSZWZzID0gY3JlYXRlID8gdGhpcy5jcmVhdGVDZWxsUmVmcyA6IHRoaXMuY2VsbFJlZnM7XG4gICAgICBjb25zdCBhcnJvd0tleXMgPSBbS0VZX0NPREVTLkRPV04sIEtFWV9DT0RFUy5VUCwgS0VZX0NPREVTLkxFRlQsIEtFWV9DT0RFUy5SSUdIVF07XG4gICAgICBjb25zdCB7XG4gICAgICAgIGNvbHVtbnMsIHZpc2libGVDb2x1bW5zLCBncmlkLCBkYXRhLCBvbkxhc3RDZWxsVGFiUHJlc3MsXG4gICAgICB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IGdyaWRDb2x1bW5zID0gVXRpbHMudmlzaWJsZUNvbHVtbnMoY29sdW1ucywgdmlzaWJsZUNvbHVtbnMpO1xuICAgICAgY29uc3QgZ2V0Q29sdW1uS2V5QnlJbmRleCA9IGkgPT4gVXRpbHMuZ2V0Q29sdW1uS2V5KGdyaWRDb2x1bW5zW2ldKTtcbiAgICAgIGNvbnN0IHJvd3NTaXplID0gZGF0YS5zaXplO1xuICAgICAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCk7XG4gICAgICBsZXQgY3VycmVudENlbGwgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2NvbHVtbktleX1fJHtyb3dJbmRleH1gXTtcbiAgICAgIGxldCBwcm94eSA9IG51bGw7XG5cbiAgICAgIGNvbnN0IGlzQ3Vyc29yQXRTdGFydCA9ICgpID0+IHtcbiAgICAgICAgaWYgKGN1cnJlbnRDZWxsLnR5cGUgIT09ICd0ZXh0JykgcmV0dXJuIHRydWU7XG4gICAgICAgIHJldHVybiBjdXJyZW50Q2VsbC5zZWxlY3Rpb25TdGFydCA9PT0gMDtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGlzQ3Vyc29yQXRFbmQgPSAoKSA9PiB7XG4gICAgICAgIGlmIChjdXJyZW50Q2VsbC50eXBlICE9PSAndGV4dCcpIHJldHVybiB0cnVlO1xuICAgICAgICByZXR1cm4gY3VycmVudENlbGwuc2VsZWN0aW9uRW5kID09PSBjdXJyZW50Q2VsbC52YWx1ZS5sZW5ndGg7XG4gICAgICB9O1xuXG4gICAgICAvLyBJZiBjdXJyZW50IGNlbGwgaG9sZHMgYSByZWFjdC1mbG9hdGluZy1zZWxlY3QgY29tcG9uZW50XG4gICAgICBpZiAoY3VycmVudENlbGwgJiYgKGN1cnJlbnRDZWxsLnNlbGVjdFJlZiB8fCB0eXBlb2YgY3VycmVudENlbGwuc2VsZWN0ID09PSAnb2JqZWN0JykpIHtcbiAgICAgICAgcHJveHkgPSBjdXJyZW50Q2VsbDtcbiAgICAgICAgY3VycmVudENlbGwgPSB0aGlzLmdldFNlbGVjdFJlZihwcm94eSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFByZXZlbnRzIHVwL2Rvd24gYXJyb3cgZnJvbSBjaGFuZ2luZyBudW1iZXIgZmllbGQgdmFsdWVcbiAgICAgIGlmIChhcnJvd0tleXMuaW5jbHVkZXMoZS5rZXlDb2RlKSAmJiBjdXJyZW50Q2VsbC50eXBlID09PSAnbnVtYmVyJykgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuRU5URVI6XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLkVTQzoge1xuICAgICAgICAgIGlmIChjcmVhdGUgJiYgZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuRU5URVIpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuYWRkTmV3SXRlbShncmlkLCBVdGlscy5nZXRDb2x1bW5EZWZhdWx0VmFsdWVzKGNvbHVtbnMpKTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGN1cnJlbnRDZWxsLnNlbGVjdCgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLkRPV046IHtcbiAgICAgICAgICBsZXQgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2NvbHVtbktleX1fJHtyb3dJbmRleCArIDF9YF07XG5cbiAgICAgICAgICAvLyBQcmV2ZW50cyBtZW51IGZyb20gb3BlbmluZ1xuICAgICAgICAgIGlmIChwcm94eSAmJiBwcm94eS5zZWxlY3RSZWYgJiYgIXByb3h5LnNlbGVjdFJlZi5zdGF0ZS5tZW51SXNPcGVuKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAoIW5leHRFbGVtZW50KSBicmVhaztcbiAgICAgICAgICAgIG5leHRFbGVtZW50ID0gdGhpcy5nZXRTZWxlY3RSZWYobmV4dEVsZW1lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm1vdmVDZWxsRm9jdXMobmV4dEVsZW1lbnQsIHJvd0luZGV4ICsgMSwgLTEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLlVQOiB7XG4gICAgICAgICAgbGV0IG5leHRFbGVtZW50ID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtjb2x1bW5LZXl9XyR7cm93SW5kZXggLSAxfWBdO1xuXG4gICAgICAgICAgLy8gUHJldmVudHMgbWVudSBmcm9tIG9wZW5pbmdcbiAgICAgICAgICBpZiAocHJveHkgJiYgcHJveHkuc2VsZWN0UmVmICYmICFwcm94eS5zZWxlY3RSZWYuc3RhdGUubWVudUlzT3Blbikge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKCFuZXh0RWxlbWVudCkgYnJlYWs7XG4gICAgICAgICAgICBuZXh0RWxlbWVudCA9IHRoaXMuZ2V0U2VsZWN0UmVmKG5leHRFbGVtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5tb3ZlQ2VsbEZvY3VzKG5leHRFbGVtZW50LCByb3dJbmRleCAtIDEsIC0xKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5UQUI6XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLlJJR0hUOlxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5MRUZUOiB7XG4gICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLlJJR0hUICYmICFpc0N1cnNvckF0RW5kKCkpIGJyZWFrO1xuICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5MRUZUICYmICFpc0N1cnNvckF0U3RhcnQoKSkgYnJlYWs7XG5cbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICBsZXQgY29sdW1uSW5kID0gZ3JpZENvbHVtbnMuZmluZEluZGV4KGMgPT4gYy52YWx1ZUtleVBhdGguam9pbignLycpID09PSBjb2x1bW5LZXkpO1xuICAgICAgICAgIGlmIChjb2x1bW5JbmQgIT09IC0xKSB7XG4gICAgICAgICAgICBsZXQgZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgbGV0IG5leHRFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIGxldCByb3dJbmQgPSByb3dJbmRleDtcbiAgICAgICAgICAgIHdoaWxlIChkaXNhYmxlZCkge1xuICAgICAgICAgICAgICAvLyBNb3ZpbmcgdG8gdGhlIGxlZnRcbiAgICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLkxFRlQgfHwgKGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLlRBQiAmJiBlLnNoaWZ0S2V5KSkge1xuICAgICAgICAgICAgICAgIGlmIChjb2x1bW5JbmQgLSAxID49IDApIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCAtPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm93SW5kIC0gMSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgPSBncmlkQ29sdW1ucy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgICAgcm93SW5kIC09IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBNb3ZpbmcgdG8gdGhlIHJpZ2h0XG4gICAgICAgICAgICAgICAgaWYgKGNvbHVtbkluZCArIDEgPCBncmlkQ29sdW1ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCArPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm93SW5kICsgMSA8IHJvd3NTaXplKSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgPSAwO1xuICAgICAgICAgICAgICAgICAgcm93SW5kICs9IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyb3dJbmQgKyAxID09PSByb3dzU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgLy8gSWYgdHJ5aW5nIHRvIHNlbGVjdCBhIHJvdywgd2hlbiB0aGVyZSBpcyBub25lOlxuICAgICAgICAgICAgICAgICAgaWYgKG9uTGFzdENlbGxUYWJQcmVzcyAmJiBlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5UQUIpIG9uTGFzdENlbGxUYWJQcmVzcyhlKTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIG5leHRFbGVtZW50ID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtnZXRDb2x1bW5LZXlCeUluZGV4KGNvbHVtbkluZCl9XyR7cm93SW5kfWBdO1xuXG4gICAgICAgICAgICAgIC8vIElmIHdlIGNhbm5vdCBmb2N1cyBvbiB0aGUgbmV4dCBlbGVtZW50IHdoaWxlIG1vdmluZyB0byB0aGUgcmlnaHRcbiAgICAgICAgICAgICAgaWYgKCFuZXh0RWxlbWVudCAmJiBlLmtleUNvZGUgIT09IEtFWV9DT0RFUy5MRUZUKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgd2UncmUgbm90IHlldCBpbiB0aGUgbGFzdCBmb2N1c2FibGUgY29sdW1uXG4gICAgICAgICAgICAgICAgaWYgKGNvbHVtbkluZCA8PSBncmlkQ29sdW1ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgIHdoaWxlIChjb2x1bW5JbmQgPD0gZ3JpZENvbHVtbnMubGVuZ3RoICYmICFuZXh0RWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Z2V0Q29sdW1uS2V5QnlJbmRleChjb2x1bW5JbmQpfV8ke3Jvd0luZH1gXTtcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uSW5kICs9IDE7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UgYXJlIGluIHRoZSBsYXN0IGNvbHVtbiBhbmQgd2UgZG9uJ3QgaGF2ZSBhbiBlbGVtZW50IHRvIGZvY3VzIG9uLFxuICAgICAgICAgICAgICAgICAgICAvLyB3ZSBtdXN0IG1vdmUgdG8gdGhlIG5leHQgcm93IChpZiBwb3NzaWJsZSlcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFuZXh0RWxlbWVudCAmJiBjb2x1bW5JbmQgPT09IGdyaWRDb2x1bW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHRyeWluZyB0byBzZWxlY3QgYSByb3csIHdoZW4gdGhlcmUgaXMgbm9uZTpcbiAgICAgICAgICAgICAgICAgICAgICBpZiAocm93SW5kICsgMSA9PT0gcm93c1NpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbkxhc3RDZWxsVGFiUHJlc3MgJiYgZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuVEFCKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uTGFzdENlbGxUYWJQcmVzcyhlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgcm93SW5kICs9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2dldENvbHVtbktleUJ5SW5kZXgoY29sdW1uSW5kKX1fJHtyb3dJbmR9YF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgY2Fubm90IGZvY3VzIG9uIHRoZSBuZXh0IGVsZW1lbnQgd2hpbGUgbW92aW5nIHRvIHRoZSBsZWZ0XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoIW5leHRFbGVtZW50ICYmIGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLkxFRlQpIHtcbiAgICAgICAgICAgICAgICB3aGlsZSAoY29sdW1uSW5kID4gMCAmJiAhbmV4dEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCAtPSAxO1xuICAgICAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2dldENvbHVtbktleUJ5SW5kZXgoY29sdW1uSW5kKX1fJHtyb3dJbmR9YF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGlmIG5vIGVsZW1lbnQgd2FzIGZvdW5kLCB0cnkgbW92aW5nIHRvIHByZXZpb3VzIHJvd1xuICAgICAgICAgICAgICAgIC8vIChuZWVkZWQgaW4gY2FzZSBmaXJzdCBjb2x1bW4gaXMgbm90IGVkaXRhYmxlIGUuZy4gYW4gRXh0cmFDb2x1bW4pXG4gICAgICAgICAgICAgICAgaWYgKHJvd0luZCA+IDAgJiYgIW5leHRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgPSBncmlkQ29sdW1ucy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgICAgcm93SW5kIC09IDE7XG4gICAgICAgICAgICAgICAgICBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Z2V0Q29sdW1uS2V5QnlJbmRleChjb2x1bW5JbmQpfV8ke3Jvd0luZH1gXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZGlzYWJsZWQgPSBuZXh0RWxlbWVudCA/IG5leHRFbGVtZW50LmRpc2FibGVkIDogZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWRpc2FibGVkICYmIG5leHRFbGVtZW50KSB7XG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgbmV4dEVsZW1lbnQuc2VsZWN0ID09PSAnb2JqZWN0JyB8fCBuZXh0RWxlbWVudC5zZWxlY3RSZWYpIHtcbiAgICAgICAgICAgICAgICBuZXh0RWxlbWVudCA9IHRoaXMuZ2V0U2VsZWN0UmVmKG5leHRFbGVtZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGlzLm1vdmVDZWxsRm9jdXMobmV4dEVsZW1lbnQsIHJvd0luZCwgY29sdW1uSW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgb25FZGl0Q2VsbEtleURvd24gPSAocm93SW5kZXgsIGNvbCkgPT4gKGUpID0+IHtcbiAgICB0aGlzLm9uQ2VsbEtleURvd24ocm93SW5kZXgsIGNvbCwgZSk7XG4gIH07XG5cbiAgb25DcmVhdGVDZWxsS2V5RG93biA9IChyb3dJbmRleCwgY29sKSA9PiAoZSkgPT4ge1xuICAgIHRoaXMub25DZWxsS2V5RG93bihyb3dJbmRleCwgY29sLCBlLCB0cnVlKTtcbiAgfTtcblxuICBvbkZpbHRlckNlbGxWYWx1ZUNoYW5nZSA9IChjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZXZlbnRPckRhdGEpID0+IHtcbiAgICBsZXQgcmF3VmFsdWU7XG4gICAgLy8gZXZlbnRPckRhdGEgY2FuIGJlIGlucHV0IG9uQ2hhbmdlIGV2ZW50LCByZWFjdC1zZWxlY3Qgb25DaGFuZ2Ugb3IgcmVhY3QtZGF5LXBpY2tlciBvbkNoYW5nZVxuICAgIGlmIChldmVudE9yRGF0YSkge1xuICAgICAgaWYgKGV2ZW50T3JEYXRhLnRhcmdldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChldmVudE9yRGF0YS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCB2YWx1ZSA9IHZhbHVlUGFyc2VyKHJhd1ZhbHVlKTtcbiAgICB0aGlzLnByb3BzLmZpbHRlckNlbGxWYWx1ZUNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIHRoaXMucHJvcHMuY29sdW1ucywgY29sLCB2YWx1ZSk7XG4gIH07XG5cbiAgb25DcmVhdGVDZWxsVmFsdWVDaGFuZ2UgPSAocm93SW5kZXgsIGNvbCwgdmFsdWVQYXJzZXIpID0+IChldmVudE9yRGF0YSkgPT4ge1xuICAgIGxldCByYXdWYWx1ZTtcbiAgICAvLyBldmVudE9yRGF0YSBjYW4gYmUgaW5wdXQgb25DaGFuZ2UgZXZlbnQsIHJlYWN0LXNlbGVjdCBvbkNoYW5nZSBvciByZWFjdC1kYXktcGlja2VyIG9uQ2hhbmdlXG4gICAgaWYgKGV2ZW50T3JEYXRhKSB7XG4gICAgICBpZiAoZXZlbnRPckRhdGEudGFyZ2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YS50YXJnZXQudmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50T3JEYXRhLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YS52YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGE7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlID0gdmFsdWVQYXJzZXIocmF3VmFsdWUpO1xuXG4gICAgdGhpcy5wcm9wcy5jcmVhdGVDZWxsVmFsdWVDaGFuZ2UodGhpcy5wcm9wcy5ncmlkLCByb3dJbmRleCwgY29sLnZhbHVlS2V5UGF0aCwgdmFsdWUpO1xuICAgIGlmIChjb2wub25DcmVhdGVWYWx1ZUNoYW5nZSkge1xuICAgICAgY29sLm9uQ3JlYXRlVmFsdWVDaGFuZ2UodmFsdWUsIGNvbC52YWx1ZUtleVBhdGgsIHJvd0luZGV4KTtcbiAgICB9XG4gICAgaWYgKGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZSAmJiB2YWx1ZSA9PT0gY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm1hdGNoVmFsdWUpIHtcbiAgICAgIC8vIENhbGwgc3BlY2lhbCBwYWlyZWQgdmFsdWUgY2hhbmdlIG9uIG90aGVyIGNlbGwgaWYgdmFsdWUgbWF0Y2hlc1xuICAgICAgdGhpcy5vbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZShcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIHsgdmFsdWVLZXlQYXRoOiBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWVLZXlQYXRoIH0sXG4gICAgICAgIHYgPT4gdixcbiAgICAgICkoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm5ld1ZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNvbC52YWxpZGF0b3JzKSB7XG4gICAgICB0aGlzLnByb3BzLmNyZWF0ZUNlbGxWYWx1ZVZhbGlkYXRlKFxuICAgICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICBjb2wudmFsdWVLZXlQYXRoLFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgY29sLnZhbGlkYXRvcnMsXG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICBvbkVkaXRDZWxsVmFsdWVDaGFuZ2UgPSAocm93SW5kZXgsIGNvbCwgdmFsdWVQYXJzZXIpID0+IChldmVudE9yRGF0YSkgPT4ge1xuICAgIGNvbnN0IGRhdGFJZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgbGV0IHJhd1ZhbHVlO1xuICAgIC8vIGV2ZW50T3JEYXRhIGNhbiBiZSBpbnB1dCBvbkNoYW5nZSBldmVudCwgcmVhY3Qtc2VsZWN0IG9uQ2hhbmdlIG9yIHJlYWN0LWRheS1waWNrZXIgb25DaGFuZ2VcbiAgICBpZiAoZXZlbnRPckRhdGEpIHtcbiAgICAgIGlmIChldmVudE9yRGF0YS50YXJnZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnRPckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSB2YWx1ZVBhcnNlcihyYXdWYWx1ZSk7XG4gICAgdGhpcy5wcm9wcy5lZGl0Q2VsbFZhbHVlQ2hhbmdlKHRoaXMucHJvcHMuZ3JpZCwgZGF0YUlkLCBjb2wudmFsdWVLZXlQYXRoLCB2YWx1ZSk7XG4gICAgaWYgKGNvbC5vbkVkaXRWYWx1ZUNoYW5nZSkge1xuICAgICAgY29sLm9uRWRpdFZhbHVlQ2hhbmdlKHZhbHVlLCBjb2wudmFsdWVLZXlQYXRoLCByb3dJbmRleCwgZGF0YUlkKTtcbiAgICB9XG4gICAgaWYgKGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZSAmJiB2YWx1ZSA9PT0gY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm1hdGNoVmFsdWUpIHtcbiAgICAgIC8vIENhbGwgc3BlY2lhbCBwYWlyZWQgdmFsdWUgY2hhbmdlIG9uIG90aGVyIGNlbGwgaWYgdmFsdWUgbWF0Y2hlc1xuICAgICAgdGhpcy5vbkVkaXRDZWxsVmFsdWVDaGFuZ2UoXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICB7IHZhbHVlS2V5UGF0aDogY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm5ld1ZhbHVlS2V5UGF0aCB9LFxuICAgICAgICB2ID0+IHYsXG4gICAgICApKGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5uZXdWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjb2wudmFsaWRhdG9ycykge1xuICAgICAgdGhpcy5wcm9wcy5lZGl0Q2VsbFZhbHVlVmFsaWRhdGUoXG4gICAgICAgIHRoaXMucHJvcHMuZ3JpZCxcbiAgICAgICAgZGF0YUlkLFxuICAgICAgICBjb2wudmFsdWVLZXlQYXRoLFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgY29sLnZhbGlkYXRvcnMsXG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICBvbkNyZWF0ZUNlbGxCbHVyID0gKHJvd0luZGV4LCBjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZSkgPT4ge1xuICAgIGlmIChjb2wub25DcmVhdGVCbHVyKSB7XG4gICAgICBsZXQgdmFsdWUgPSBlICYmIGUudGFyZ2V0ICYmIGUudGFyZ2V0LnZhbHVlICE9PSB1bmRlZmluZWRcbiAgICAgICAgPyBlLnRhcmdldC52YWx1ZVxuICAgICAgICA6IHRoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKTtcbiAgICAgIGlmICh2YWx1ZVBhcnNlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWVQYXJzZXIodmFsdWUpO1xuICAgICAgfVxuICAgICAgY29sLm9uQ3JlYXRlQmx1cih2YWx1ZSwgcm93SW5kZXgpO1xuICAgIH1cbiAgfTtcblxuICBvbkVkaXRDZWxsQmx1ciA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGUpID0+IHtcbiAgICBpZiAoY29sLm9uRWRpdEJsdXIpIHtcbiAgICAgIGxldCB2YWx1ZSA9IGUgJiYgZS50YXJnZXQgJiYgZS50YXJnZXQudmFsdWUgIT09IHVuZGVmaW5lZFxuICAgICAgICA/IGUudGFyZ2V0LnZhbHVlXG4gICAgICAgIDogdGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpO1xuICAgICAgaWYgKHZhbHVlUGFyc2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZVBhcnNlcih2YWx1ZSk7XG4gICAgICB9XG4gICAgICBjb25zdCBkYXRhSWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgICAgY29sLm9uRWRpdEJsdXIodmFsdWUsIHJvd0luZGV4LCBkYXRhSWQpO1xuICAgIH1cbiAgfTtcblxuICBvbkNlbGxGb2N1cyA9IChjZWxsVHlwZSwgaW5wdXRUeXBlLCByb3dJbmRleCwgY29sdW1uS2V5KSA9PiAoZSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGNlbGxTZWxlY3Rpb25DaGFuZ2UsIGNlbGxTZWxlY3QsIGdyaWQsIGlzRWRpdGluZyxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoaXNFZGl0aW5nKSByZXR1cm47XG5cbiAgICBpZiAoaW5wdXRUeXBlID09PSAnbnVtYmVyJykge1xuICAgICAgZS50YXJnZXQuc2VsZWN0KCk7XG4gICAgfVxuICAgIGlmIChjZWxsVHlwZSA9PT0gJ2VkaXQnICYmIGNlbGxTZWxlY3QpIHtcbiAgICAgIGNlbGxTZWxlY3Rpb25DaGFuZ2UoXG4gICAgICAgIGdyaWQsXG4gICAgICAgIE1hcCh7XG4gICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgY29sdW1uS2V5LFxuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIGdldFNlbGVjdFJlZiA9IChjb21wb25lbnQpID0+IHtcbiAgICBpZiAoIWNvbXBvbmVudCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKGNvbXBvbmVudC5zZWxlY3QgJiYgY29tcG9uZW50LnNlbGVjdC5pbnB1dFJlZikge1xuICAgICAgcmV0dXJuIGNvbXBvbmVudC5zZWxlY3QuaW5wdXRSZWY7XG4gICAgfVxuICAgIGlmIChjb21wb25lbnQuc2VsZWN0ICYmIGNvbXBvbmVudC5zZWxlY3Quc2VsZWN0KSB7XG4gICAgICByZXR1cm4gY29tcG9uZW50LnNlbGVjdC5zZWxlY3QuaW5wdXRSZWY7XG4gICAgfVxuICAgIGlmIChjb21wb25lbnQuc2VsZWN0UmVmICYmIGNvbXBvbmVudC5zZWxlY3RSZWYuc2VsZWN0LnNlbGVjdCkge1xuICAgICAgcmV0dXJuIGNvbXBvbmVudC5zZWxlY3RSZWYuc2VsZWN0LnNlbGVjdC5pbnB1dFJlZjtcbiAgICB9XG4gICAgcmV0dXJuIGNvbXBvbmVudC5zZWxlY3RSZWYuc2VsZWN0LmlucHV0UmVmO1xuICB9O1xuXG4gIGdldERhdGFJZEJ5Um93SW5kZXggPSByb3dJbmRleCA9PiB0aGlzLnByb3BzLmRhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi50aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoXSk7XG5cbiAgZ2V0U2VsZWN0ZWRJdGVtSW5kZXggPSAoaWQpID0+IHtcbiAgICBpZiAoIWlkKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5wcm9wcy5kYXRhLmZpbmRJbmRleCh2ID0+IHYuZ2V0SW4odGhpcy5wcm9wcy5ncmlkLmlkS2V5UGF0aCkgPT09IGlkKTtcbiAgICByZXR1cm4gaW5kZXggPT09IC0xID8gdW5kZWZpbmVkIDogaW5kZXg7XG4gIH07XG5cbiAgZ2V0RWRpdEl0ZW1WYWx1ZSA9IChyb3dJbmRleCwgY29sLCBvcHRpb25zID0gW10pID0+IHtcbiAgICAvLyBHZXQgdGhlIHZhbHVlIHRvIGRpc3BsYXkgaW4gZWRpdCBjZWxsXG4gICAgY29uc3QgaWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgIGNvbnN0IGVkaXRWYWx1ZSA9IHRoaXMucHJvcHMuZWRpdERhdGEuZ2V0SW4oW2lkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSwgdW5kZWZpbmVkKTtcbiAgICBsZXQgb3JpZ2luYWxWYWx1ZTtcbiAgICBpZiAoZWRpdFZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG9yaWdpbmFsVmFsdWUgPSB0aGlzLnByb3BzLmRhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSwgJycpO1xuICAgIH0gZWxzZSBpZiAoZWRpdFZhbHVlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFZhbHVlIGlzIGZvdW5kIGZyb20gZWRpdERhdGFcbiAgICAgIC8vIEZvcm1hdCBieSB0eXBlXG4gICAgICBzd2l0Y2ggKGNvbC5jb21wb25lbnRUeXBlKSB7XG4gICAgICAgIGNhc2UgJ211bHRpc2VsZWN0JzpcbiAgICAgICAgY2FzZSAnc2VsZWN0JzpcbiAgICAgICAgICByZXR1cm4gb3B0aW9ucy5zZWxlY3RPcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gZWRpdFZhbHVlKTtcbiAgICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgICAgcmV0dXJuIG9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSBlZGl0VmFsdWUpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiBlZGl0VmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvcmlnaW5hbFZhbHVlID09PSBudWxsIHx8IG9yaWdpbmFsVmFsdWUgPT09IHVuZGVmaW5lZCB8fCBvcmlnaW5hbFZhbHVlID09PSAnJykge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICAvLyBSZXR1cm4gdmFsdWUgZnJvbSBvcmlnaW5hbCBkYXRhLCBiZWNhdXNlIGVkaXREYXRhIGlzIG5vdCBhdmFpbGFibGVcbiAgICAvLyBGb3JtYXQgYnkgY29tcG9uZW50IHR5cGVcbiAgICBzd2l0Y2ggKGNvbC5jb21wb25lbnRUeXBlKSB7XG4gICAgICBjYXNlICdmbG9hdCc6IHtcbiAgICAgICAgaWYgKFN0cmluZyhvcmlnaW5hbFZhbHVlKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgcmV0dXJuIFN0cmluZyhvcmlnaW5hbFZhbHVlKS5yZXBsYWNlKCcuJywgdGhpcy5wcm9wcy5kZWNpbWFsU2VwYXJhdG9yKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3JpZ2luYWxWYWx1ZTtcbiAgICAgIH1cbiAgICAgIGNhc2UgJ211bHRpc2VsZWN0JzpcbiAgICAgIGNhc2UgJ3NlbGVjdCc6XG4gICAgICAgIHJldHVybiBvcHRpb25zLnNlbGVjdE9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSBvcmlnaW5hbFZhbHVlKTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICByZXR1cm4gb3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IG9yaWdpbmFsVmFsdWUpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIG9yaWdpbmFsVmFsdWU7XG4gICAgfVxuICB9O1xuXG4gIGdldENyZWF0ZUl0ZW1WYWx1ZSA9IChyb3dJbmRleCwgY29sLCBvcHRpb25zID0gW10pID0+IHtcbiAgICBjb25zdCB2YWwgPSB0aGlzLnByb3BzLmNyZWF0ZURhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSwgJycpO1xuICAgIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgaWYgKGNvbC5jb21wb25lbnRUeXBlID09PSAnc2VsZWN0JyB8fCBjb2wuY29tcG9uZW50VHlwZSA9PT0gJ211bHRpc2VsZWN0Jykge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuc2VsZWN0T3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IHZhbCk7XG4gICAgfVxuICAgIGlmIChbJ2Jvb2xlYW4nXS5pbmNsdWRlcyhjb2wuY29tcG9uZW50VHlwZSkpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gdmFsKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbDtcbiAgfTtcblxuICBnZXRGaWx0ZXJJdGVtVmFsdWUgPSAoY29sLCBvcHRpb25zID0gW10pID0+IHtcbiAgICBjb25zdCB2YWwgPSB0aGlzLnByb3BzLmZpbHRlckRhdGEuZ2V0KFV0aWxzLmdldENvbHVtbktleShjb2wpLCAnJyk7XG4gICAgaWYgKHZhbCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBpZiAoY29sLmNvbXBvbmVudFR5cGUgPT09ICdzZWxlY3QnKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5zZWxlY3RPcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gdmFsKTtcbiAgICB9XG4gICAgaWYgKFsnY2hlY2tib3gnLCAnYm9vbGVhbiddLmluY2x1ZGVzKGNvbC5jb21wb25lbnRUeXBlKSkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSB2YWwpO1xuICAgIH1cbiAgICBpZiAoY29sLmNvbXBvbmVudFR5cGUgPT09ICdtdWx0aXNlbGVjdCcpIHtcbiAgICAgIC8vIHNlc3Npb24gc3RvcmFnZSBjb250ZW50IGlzIGNvbnZlcnRlZCB0byBpbW11dGFibGUgYW5kIG11bHRpc2VsZWN0XG4gICAgICAvLyBmaWx0ZXJzIGlzIHRoZW4gbGlzdCBvdGhlcndpc2UgYXJyYXlcbiAgICAgIHJldHVybiB2YWwgJiYgdmFsLnRvSlMgPyB2YWwudG9KUygpIDogdmFsIHx8IFtdO1xuICAgIH1cbiAgICByZXR1cm4gdmFsO1xuICB9O1xuXG4gIGdldENvbXBvbmVudERpc2FibGVkU3RhdGUgPSAocm93SW5kZXgsIGNvbCwgbW9kZSkgPT4ge1xuICAgIGxldCBjb21wb25lbnREaXNhYmxlZCA9ICEhY29sLmRpc2FibGVFZGl0aW5nO1xuICAgIC8vIGNoZWNrIGlmIGNvbXBvbmVudCBpcyBkaXNhYmxlZCBieSBvdGhlciBjb2x1bW4gZGF0YVxuICAgIGlmICghY29tcG9uZW50RGlzYWJsZWQgJiYgY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoKSB7XG4gICAgICBpZiAobW9kZSA9PT0gJ2NyZWF0ZScpIHtcbiAgICAgICAgY29tcG9uZW50RGlzYWJsZWQgPSB0aGlzLmdldENyZWF0ZUl0ZW1WYWx1ZShyb3dJbmRleCwge1xuICAgICAgICAgIHZhbHVlS2V5UGF0aDogY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWVLZXlQYXRoLFxuICAgICAgICB9KSA9PT0gY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb21wb25lbnREaXNhYmxlZCA9IHRoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwge1xuICAgICAgICAgIHZhbHVlS2V5UGF0aDogY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWVLZXlQYXRoLFxuICAgICAgICB9KSA9PT0gY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb21wb25lbnREaXNhYmxlZDtcbiAgfTtcblxuICBnZXRSb3dDbGFzc05hbWUgPSAocm93SW5kZXgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBncmlkLCBpc0NyZWF0aW5nLCBpc0VkaXRpbmcsIGNyZWF0ZURhdGEsIHNlbGVjdGVkSXRlbXMsIGRhdGEsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgcm93Q2xhc3NOYW1lcyA9IFsnb2MtZGF0YWdyaWQtcm93J107XG4gICAgbGV0IGV4dHJhUm93Q291bnQgPSAwOyAvLyBob3cgbWFueSByb3dzIHRvIGlnbm9yZSBmcm9tIHRvcCwgbmV3ICsgZmlsdGVyIHJvd3NcbiAgICBpZiAoaXNDcmVhdGluZykgZXh0cmFSb3dDb3VudCA9IGNyZWF0ZURhdGEuc2l6ZTtcbiAgICBpZiAoaXNDcmVhdGluZykge1xuICAgICAgaWYgKHJvd0luZGV4IDw9IGV4dHJhUm93Q291bnQgLSAxKSB7XG4gICAgICAgIHJvd0NsYXNzTmFtZXMucHVzaCgnb2MtZGF0YWdyaWQtcm93LW5ldycpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNFZGl0aW5nKSB7XG4gICAgICByb3dDbGFzc05hbWVzLnB1c2goJ29jLWRhdGFncmlkLXJvdy1lZGl0Jyk7XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgaWYgcm93IGlzIHNlbGVjdGVkXG4gICAgaWYgKCFpc0NyZWF0aW5nICYmICFpc0VkaXRpbmcgJiYgKHNlbGVjdGVkSXRlbXMgJiYgZ3JpZC5pZEtleVBhdGgpKSB7XG4gICAgICBpZiAoc2VsZWN0ZWRJdGVtcy5pbmRleE9mKGRhdGEuZ2V0SW4oW3Jvd0luZGV4IC0gZXh0cmFSb3dDb3VudCwgLi4uZ3JpZC5pZEtleVBhdGhdKSkgIT09IC0xKSB7XG4gICAgICAgIHJvd0NsYXNzTmFtZXMucHVzaCgnaXMtc2VsZWN0ZWQnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5wcm9wcy5yb3dDbGFzc05hbWVHZXR0ZXIpIHtcbiAgICAgIHJldHVybiByb3dDbGFzc05hbWVzLmpvaW4oJyAnKSArICcgJyArIHRoaXMucHJvcHMucm93Q2xhc3NOYW1lR2V0dGVyKHJvd0luZGV4KTtcbiAgICB9XG4gICAgcmV0dXJuIHJvd0NsYXNzTmFtZXMuam9pbignICcpO1xuICB9O1xuXG4gIGdldENlbGxNZXNzYWdlcyA9IChyb3dJbmRleCwgY29sLCBjZWxsVHlwZSkgPT4ge1xuICAgIGNvbnN0IHJldHVybkRhdGEgPSB7fTtcbiAgICBpZiAoIXRoaXMucHJvcHMuZ3JpZC5pZEtleVBhdGggfHwgIWNvbC52YWx1ZUtleVBhdGgpIHtcbiAgICAgIHJldHVybiByZXR1cm5EYXRhO1xuICAgIH1cbiAgICBsZXQgaW5mb01lc3NhZ2U7XG4gICAgbGV0IGVycm9yTWVzc2FnZTtcbiAgICBsZXQgd2FybmluZ01lc3NhZ2U7XG4gICAgaWYgKGNlbGxUeXBlID09PSAnY3JlYXRlJykge1xuICAgICAgaW5mb01lc3NhZ2UgPSB0aGlzLnByb3BzLmNyZWF0ZUNlbGxNZXNzYWdlcy5nZXRJbihbJ2luZm8nLCByb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgZXJyb3JNZXNzYWdlID0gdGhpcy5wcm9wcy5jcmVhdGVDZWxsTWVzc2FnZXMuZ2V0SW4oWydlcnJvcicsIHJvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgICB3YXJuaW5nTWVzc2FnZSA9IHRoaXMucHJvcHMuY3JlYXRlQ2VsbE1lc3NhZ2VzLmdldEluKFtcbiAgICAgICAgJ3dhcm5pbmcnLFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgLi4uY29sLnZhbHVlS2V5UGF0aCxcbiAgICAgIF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgICBpbmZvTWVzc2FnZSA9IHRoaXMucHJvcHMuY2VsbE1lc3NhZ2VzLmdldEluKFsnaW5mbycsIGlkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgICBlcnJvck1lc3NhZ2UgPSB0aGlzLnByb3BzLmNlbGxNZXNzYWdlcy5nZXRJbihbJ2Vycm9yJywgaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgIHdhcm5pbmdNZXNzYWdlID0gdGhpcy5wcm9wcy5jZWxsTWVzc2FnZXMuZ2V0SW4oWyd3YXJuaW5nJywgaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICB9XG4gICAgaWYgKGluZm9NZXNzYWdlKSB7XG4gICAgICByZXR1cm5EYXRhLmluZm9NZXNzYWdlID0gaW5mb01lc3NhZ2U7XG4gICAgfVxuICAgIGlmIChlcnJvck1lc3NhZ2UpIHtcbiAgICAgIHJldHVybkRhdGEuZXJyb3JNZXNzYWdlID0gZXJyb3JNZXNzYWdlO1xuICAgIH1cbiAgICBpZiAod2FybmluZ01lc3NhZ2UpIHtcbiAgICAgIHJldHVybkRhdGEud2FybmluZ01lc3NhZ2UgPSB3YXJuaW5nTWVzc2FnZTtcbiAgICB9XG4gICAgcmV0dXJuIHJldHVybkRhdGE7XG4gIH07XG5cbiAgZ2V0U2Nyb2xsVG9Sb3cgPSAoKSA9PiB7XG4gICAgbGV0IHNjcm9sbFRvUm93O1xuICAgIGlmICh0aGlzLnByb3BzLmlzQ3JlYXRpbmcgJiYgIXRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwpIHJldHVybiBzY3JvbGxUb1JvdztcbiAgICBpZiAodGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCkge1xuICAgICAgY29uc3Qgc2Nyb2xsTmV3Um93ID0gdGhpcy5wcm9wcy5jcmVhdGVEYXRhLnNpemUgLSAxO1xuICAgICAgaWYgKHNjcm9sbE5ld1JvdyA+PSAwKSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gc2Nyb2xsTmV3Um93O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5pc0VkaXRpbmcgJiYgIXRoaXMucHJvcHMuc2Nyb2xsSW5FZGl0TW9kZSkge1xuICAgICAgICBzY3JvbGxUb1JvdyA9IHRoaXMuc3RhdGUuY3VycmVudFJvdztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gdGhpcy5wcm9wcy5zY3JvbGxUb1JvdzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgfVxuICAgICAgaWYgKHNjcm9sbFRvUm93ID09PSB1bmRlZmluZWQgJiYgdGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLnNpemUgPiAwKSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gdGhpcy5nZXRTZWxlY3RlZEl0ZW1JbmRleCh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuZmlyc3QoKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzY3JvbGxUb1JvdztcbiAgfTtcblxuICBzZXRGb2N1c1RvID0gKGZvY3VzVG8pID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5pc0VkaXRpbmcgfHwgdGhpcy5wcm9wcy5pc0NyZWF0aW5nKSB7XG4gICAgICBpZiAoZm9jdXNUbyAmJiBmb2N1c1RvLmdldCgndHlwZScpICYmIGZvY3VzVG8gIT09IHRoaXMucHJldkZvY3VzVG8pIHtcbiAgICAgICAgdGhpc1tmb2N1c1RvLmdldCgndHlwZScpXSA9IHRydWU7XG4gICAgICAgIHRoaXMuZm9jdXNUb0xhc3RSb3cgPSBmb2N1c1RvLmdldCgnZm9jdXNUb0xhc3RSb3cnKTtcbiAgICAgICAgdGhpcy5wcmV2Rm9jdXNUbyA9IGZvY3VzVG87XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZUNlbGxTZWxlY3QgPSAoY2VsbFR5cGUsIHJvd0luZGV4LCBjb2x1bW5LZXkpID0+ICgpID0+IHtcbiAgICBpZiAoY2VsbFR5cGUgPT09ICd2aWV3JyAmJiB0aGlzLnByb3BzLmNlbGxTZWxlY3QpIHtcbiAgICAgIHRoaXMucHJvcHMuY2VsbFNlbGVjdGlvbkNoYW5nZShcbiAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICBNYXAoe1xuICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgIGNvbHVtbktleSxcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVDcmVhdGVDZWxsUmVmID0gKHJvd0luZGV4LCBjb2wpID0+IChyZWYpID0+IHtcbiAgICAvLyBGb2N1cyB0byBjcmVhdGUgY2VsbFxuICAgIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2wpO1xuICAgIGNvbnN0IHNlbGVjdFJlZiA9ICFyZWYgfHwgcmVmLmZvY3VzID8gcmVmIDogdGhpcy5nZXRTZWxlY3RSZWYocmVmKTtcbiAgICBpZiAoXG4gICAgICB0aGlzLnByb3BzLmNyZWF0ZURhdGEuc2l6ZVxuICAgICAgJiYgdGhpcy5wcm9wcy5jcmVhdGVEYXRhLnNpemUgPT09IHJvd0luZGV4ICsgMVxuICAgICAgJiYgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbFxuICAgICAgJiYgIXRoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnY3JlYXRlJylcbiAgICAgICYmIHNlbGVjdFJlZlxuICAgICkge1xuICAgICAgc2VsZWN0UmVmLmZvY3VzKCk7XG4gICAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcHMuZW5hYmxlQXJyb3dOYXZpZ2F0aW9uKSB7XG4gICAgICB0aGlzLmNyZWF0ZUNlbGxSZWZzW2Ake3RoaXMucHJvcHMuZ3JpZC5pZH1fJHtjb2x1bW5LZXl9XyR7cm93SW5kZXh9YF0gPSByZWY7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZUVkaXRDZWxsUmVmID0gKHJvd0luZGV4LCBjb2wpID0+IChyZWYpID0+IHtcbiAgICBjb25zdCBjb2x1bW5LZXkgPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sKTtcbiAgICBpZiAodGhpcy5mb2N1c1RvRWRpdENlbGwgJiYgIXRoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnZWRpdCcpKSB7XG4gICAgICBjb25zdCBzZWxlY3RlZFJvd0luZGV4ID0gdGhpcy5mb2N1c1RvTGFzdFJvdyAmJiB0aGlzLnByb3BzLmRhdGEuc2l6ZSA+IDBcbiAgICAgICAgPyB0aGlzLnByb3BzLmRhdGEuc2l6ZSAtIDFcbiAgICAgICAgOiB0aGlzLmdldFNlbGVjdGVkSXRlbUluZGV4KHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5maXJzdCgpKTtcblxuICAgICAgY29uc3QgeyBzZWxlY3RlZENlbGwgfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCBzZWxlY3RSZWYgPSAhcmVmIHx8IHJlZi5mb2N1cyA/IHJlZiA6IHRoaXMuZ2V0U2VsZWN0UmVmKHJlZik7XG4gICAgICBpZiAoc2VsZWN0ZWRDZWxsLnNpemUgPiAwKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBzZWxlY3RlZENlbGwuZ2V0KCdyb3dJbmRleCcpID09PSByb3dJbmRleFxuICAgICAgICAgICYmIHNlbGVjdGVkQ2VsbC5nZXQoJ2NvbHVtbktleScpID09PSBjb2x1bW5LZXlcbiAgICAgICAgICAmJiBzZWxlY3RSZWZcbiAgICAgICAgKSB7XG4gICAgICAgICAgc2VsZWN0UmVmLmZvY3VzKCk7XG4gICAgICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmZvY3VzVG9MYXN0Um93ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWRSb3dJbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZm9jdXNUb0xhc3RSb3cgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWRSb3dJbmRleCA9PT0gcm93SW5kZXggJiYgc2VsZWN0UmVmKSB7XG4gICAgICAgIHNlbGVjdFJlZi5mb2N1cygpO1xuICAgICAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZvY3VzVG9MYXN0Um93ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZUFycm93TmF2aWdhdGlvbikge1xuICAgICAgdGhpcy5jZWxsUmVmc1tgJHt0aGlzLnByb3BzLmdyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4fWBdID0gcmVmO1xuICAgIH1cbiAgfTtcblxuICBtb3ZlQ2VsbEZvY3VzID0gKG5leHRFbGVtZW50LCByb3dJbmRleCwgY29sdW1uSW5kZXgpID0+IHtcbiAgICBjb25zdCBlbGVtZW50VHlwZXMgPSBbJ3RleHQnLCAnY2hlY2tib3gnXTtcbiAgICBpZiAobmV4dEVsZW1lbnQgJiYgZWxlbWVudFR5cGVzLmluY2x1ZGVzKG5leHRFbGVtZW50LnR5cGUpKSB7XG4gICAgICBpZiAocm93SW5kZXggIT09IC0xIHx8IGNvbHVtbkluZGV4ICE9PSAtMSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBjdXJyZW50Q29sdW1uOiBjb2x1bW5JbmRleCxcbiAgICAgICAgICBjdXJyZW50Um93OiByb3dJbmRleCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKG5leHRFbGVtZW50LnR5cGUgPT09ICdjaGVja2JveCcpIG5leHRFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIGlmIChuZXh0RWxlbWVudC50eXBlID09PSAndGV4dCcpIG5leHRFbGVtZW50LnNlbGVjdCgpO1xuICAgICAgfSwgNTApO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVTZWxlY3RBbGxDaGVja0JveE9uQ2hhbmdlID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMuc2VsZWN0QWxsSXRlbXNDaGFuZ2UodGhpcy5wcm9wcy5ncmlkKTtcbiAgfTtcblxuICBoYW5kbGVTZWxlY3Rpb25DaGVja0JveE9uQ2hhbmdlID0gcm93SW5kZXggPT4gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMuaXRlbVNlbGVjdGlvbkNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIHJvd0luZGV4LCB0cnVlLCBmYWxzZSk7XG4gIH07XG5cbiAgZ2VuZXJhdGVDb2x1bW5zID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGRhdGEsXG4gICAgICBzZWxlY3RlZEl0ZW1zLFxuICAgICAgZGF0ZUZvcm1hdCxcbiAgICAgIHRob3VzYW5kU2VwYXJhdG9yLFxuICAgICAgZGVjaW1hbFNlcGFyYXRvcixcbiAgICAgIGdyaWQsXG4gICAgICBpbmxpbmVFZGl0LFxuICAgICAgZmlsdGVyaW5nLFxuICAgICAgcmVnaW9uLFxuICAgICAgaW50bCxcbiAgICAgIHNlbGVjdENvbXBvbmVudE9wdGlvbnMsXG4gICAgICBpc0NyZWF0aW5nLFxuICAgICAgZXh0cmFDb2x1bW4sXG4gICAgICByb3dTZWxlY3RDaGVja2JveENvbHVtbixcbiAgICAgIHNob3dTZWxlY3RBbGxDaGVja2JveCxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IGNvbHVtbnMgPSBbXTtcbiAgICBjb25zdCB0YWJJbmRleCA9IFN0cmluZyh0aGlzLnByb3BzLnRhYkluZGV4KTtcbiAgICBpZiAoZXh0cmFDb2x1bW4pIHtcbiAgICAgIGNvbHVtbnMucHVzaCh7XG4gICAgICAgIHdpZHRoOiBleHRyYUNvbHVtbi53aWR0aCB8fCA0MCxcbiAgICAgICAgaXNSZXNpemFibGU6ICEhZXh0cmFDb2x1bW4uaXNSZXNpemFibGUsXG4gICAgICAgIGlzU29ydGFibGU6IGZhbHNlLFxuICAgICAgICBjb2x1bW5LZXk6ICdleHRyYUNvbHVtbicsXG4gICAgICAgIGNlbGw6IHJvd0luZGV4ID0+IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWV4dHJhLWNvbHVtbi1jZWxsIG5vLXJvdy1zZWxlY3RcIj5cbiAgICAgICAgICAgIHtleHRyYUNvbHVtbi52YWx1ZVJlbmRlcihkYXRhLmdldChyb3dJbmRleCksIHRhYkluZGV4KX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSxcbiAgICAgICAgY2VsbEVkaXQ6IHJvd0luZGV4ID0+IChleHRyYUNvbHVtbi5jZWxsRWRpdCA/IGV4dHJhQ29sdW1uLmNlbGxFZGl0KHJvd0luZGV4KSA6IG51bGwpLFxuICAgICAgICBjZWxsQ3JlYXRlOiByb3dJbmRleCA9PiAoZXh0cmFDb2x1bW4uY2VsbENyZWF0ZSA/IGV4dHJhQ29sdW1uLmNlbGxDcmVhdGUocm93SW5kZXgpIDogbnVsbCksXG4gICAgICAgIGNlbGxGaWx0ZXI6IHJvd0luZGV4ID0+IChleHRyYUNvbHVtbi5jZWxsRmlsdGVyID8gZXh0cmFDb2x1bW4uY2VsbEZpbHRlcihyb3dJbmRleCkgOiBudWxsKSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChyb3dTZWxlY3RDaGVja2JveENvbHVtbikge1xuICAgICAgY29sdW1ucy5wdXNoKHtcbiAgICAgICAgd2lkdGg6IDQwLFxuICAgICAgICBpc1Jlc2l6YWJsZTogZmFsc2UsXG4gICAgICAgIGlzU29ydGFibGU6IGZhbHNlLFxuICAgICAgICBjb2x1bW5LZXk6ICdzZWxlY3Rpb25DaGVja2JveCcsXG4gICAgICAgIGhlYWRlcjogc2hvd1NlbGVjdEFsbENoZWNrYm94ICYmIChcbiAgICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZFNlbGVjdEFsbENoZWNrQm94LSR7Z3JpZC5pZH1gfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtc2VsZWN0LWFsbC1jaGVja2JveC1jZWxsIG5vLXJvdy1zZWxlY3RcIlxuICAgICAgICAgICAgY2hlY2tlZD17ZGF0YS5zaXplICE9PSAwICYmIGRhdGEuc2l6ZSA9PT0gc2VsZWN0ZWRJdGVtcy5zaXplfVxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlU2VsZWN0QWxsQ2hlY2tCb3hPbkNoYW5nZX1cbiAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAvPlxuICAgICAgICApLFxuICAgICAgICBjZWxsOiAocm93SW5kZXgpID0+IHtcbiAgICAgICAgICBjb25zdCByb3dJdGVtID0gZGF0YS5nZXQocm93SW5kZXgpO1xuICAgICAgICAgIGNvbnN0IGl0ZW1JZCA9IHJvd0l0ZW0uZ2V0SW4oZ3JpZC5pZEtleVBhdGgpO1xuICAgICAgICAgIGNvbnN0IHNlbGVjdGVkID0gc2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhpdGVtSWQpO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkU2VsZWN0Q2hlY2tCb3gtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtc2VsZWN0LWNoZWNrYm94LWNlbGwgbm8tcm93LXNlbGVjdFwiXG4gICAgICAgICAgICAgIGNoZWNrZWQ9e3NlbGVjdGVkfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVTZWxlY3Rpb25DaGVja0JveE9uQ2hhbmdlKHJvd0luZGV4KX1cbiAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICBjZWxsRWRpdDogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbENyZWF0ZTogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbEZpbHRlcjogKCkgPT4gbnVsbCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHZpc2libGVDb2x1bW5zID0gW107XG4gICAgdGhpcy5wcm9wcy52aXNpYmxlQ29sdW1ucy5mb3JFYWNoKCh2aXNpYmxlQ29sdW1uS2V5KSA9PiB7XG4gICAgICB0aGlzLnByb3BzLmNvbHVtbnMuZm9yRWFjaCgob3JnQ29sKSA9PiB7XG4gICAgICAgIGlmIChVdGlscy5nZXRDb2x1bW5LZXkob3JnQ29sKSA9PT0gdmlzaWJsZUNvbHVtbktleSkge1xuICAgICAgICAgIHZpc2libGVDb2x1bW5zLnB1c2gob3JnQ29sKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgdmlzaWJsZUNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZUVtcHR5Q2hlY2tlciA9IFV0aWxzLmdldFZhbHVlRW1wdHlDaGVja2VyKGNvbCk7XG4gICAgICAvLyBDZWxsIHZhbHVlIHJlbmRlcmluZ1xuICAgICAgY29uc3QgdmFsdWVSZW5kZXIgPSAocm93SW5kZXgsIGZvcm1hdCkgPT4ge1xuICAgICAgICBjb25zdCB2YWwgPSBkYXRhLmdldEluKFtyb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsKSkge1xuICAgICAgICAgIHJldHVybiBjb2wuaXNSZXF1aXJlZCA/IDxNIGlkPVwiR3JpZC5WYWx1ZUlzTWlzc2luZ1wiIC8+IDogJyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvcm1hdCA/IGZvcm1hdCh2YWwpIDogdmFsO1xuICAgICAgfTtcblxuICAgICAgbGV0IGNvbHVtbiA9IEdyaWRDb2x1bW5TZXJ2aWNlLmJhc2VDb2x1bW4oY29sKTtcbiAgICAgIC8vIENvbGxlY3QgY29sdW1uIGZ1bmN0aW9ucyBpbnRvIG9uZSBPYmplY3RcbiAgICAgIGNvbnN0IGNvbHVtbkZ1bmN0aW9ucyA9IHtcbiAgICAgICAgZWRpdDoge1xuICAgICAgICAgIGdldEl0ZW1WYWx1ZTogdGhpcy5nZXRFZGl0SXRlbVZhbHVlLFxuICAgICAgICAgIG9uQ2VsbFZhbHVlQ2hhbmdlOiB0aGlzLm9uRWRpdENlbGxWYWx1ZUNoYW5nZSxcbiAgICAgICAgICBvbkNlbGxCbHVyOiB0aGlzLm9uRWRpdENlbGxCbHVyLFxuICAgICAgICAgIG9uQ2VsbEZvY3VzOiB0aGlzLm9uQ2VsbEZvY3VzLFxuICAgICAgICAgIG9uQ2VsbEtleURvd246IHRoaXMub25FZGl0Q2VsbEtleURvd24sXG4gICAgICAgICAgaGFuZGxlQ2VsbFJlZjogdGhpcy5oYW5kbGVFZGl0Q2VsbFJlZixcbiAgICAgICAgfSxcbiAgICAgICAgY3JlYXRlOiB7XG4gICAgICAgICAgZ2V0SXRlbVZhbHVlOiB0aGlzLmdldENyZWF0ZUl0ZW1WYWx1ZSxcbiAgICAgICAgICBvbkNlbGxWYWx1ZUNoYW5nZTogdGhpcy5vbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSxcbiAgICAgICAgICBvbkNlbGxCbHVyOiB0aGlzLm9uQ3JlYXRlQ2VsbEJsdXIsXG4gICAgICAgICAgb25DZWxsRm9jdXM6IHRoaXMub25DZWxsRm9jdXMsXG4gICAgICAgICAgb25DZWxsS2V5RG93bjogdGhpcy5vbkNyZWF0ZUNlbGxLZXlEb3duLFxuICAgICAgICAgIGhhbmRsZUNlbGxSZWY6IHRoaXMuaGFuZGxlQ3JlYXRlQ2VsbFJlZixcbiAgICAgICAgfSxcbiAgICAgICAgZmlsdGVyOiB7XG4gICAgICAgICAgZ2V0SXRlbVZhbHVlOiB0aGlzLmdldEZpbHRlckl0ZW1WYWx1ZSxcbiAgICAgICAgICBvbkNlbGxWYWx1ZUNoYW5nZTogdGhpcy5vbkZpbHRlckNlbGxWYWx1ZUNoYW5nZSxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIC8vIGhhbmRsZSBjb2x1bW4uY2VsbCAvIGNvbHVtbi5jZWxsRWRpdCAvIGNvbHVtbi5jZWxsQ3JlYXRlIC8gY29sdW1uLmNlbGxGaWx0ZXJcbiAgICAgIGNvbnN0IGNlbGxQcm9wcyA9IHtcbiAgICAgICAgZ3JpZCxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgZGF0ZUZvcm1hdCxcbiAgICAgICAgdGhvdXNhbmRTZXBhcmF0b3IsXG4gICAgICAgIGRlY2ltYWxTZXBhcmF0b3IsXG4gICAgICAgIHNlbGVjdENvbXBvbmVudE9wdGlvbnMsXG4gICAgICB9OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICBjb2x1bW4gPSBHcmlkQ29sdW1uU2VydmljZS5jb2x1bW5DZWxsKGNvbHVtbiwgY2VsbFByb3BzLCBjb2wsIHZhbHVlUmVuZGVyKTtcblxuICAgICAgLy8gaGFuZGxlIGNvbHVtbkNvbXBvbmVudFR5cGVzXG4gICAgICBjb25zdCBjb21wb25lbnRUeXBlUHJvcHMgPSB7XG4gICAgICAgIC4uLmNlbGxQcm9wcyxcbiAgICAgICAgaW5saW5lRWRpdCxcbiAgICAgICAgZmlsdGVyaW5nLFxuICAgICAgICByZWdpb24sXG4gICAgICAgIGludGwsXG4gICAgICAgIHNlbGVjdENvbXBvbmVudE9wdGlvbnMsXG4gICAgICB9OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICBjb2x1bW4gPSBHcmlkQ29sdW1uU2VydmljZS5jb2x1bW5Db21wb25lbnRUeXBlKFxuICAgICAgICBjb2x1bW4sXG4gICAgICAgIHRhYkluZGV4LFxuICAgICAgICBjb21wb25lbnRUeXBlUHJvcHMsXG4gICAgICAgIGNvbCxcbiAgICAgICAgY29sdW1uRnVuY3Rpb25zLFxuICAgICAgICB0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUsXG4gICAgICApO1xuICAgICAgY29sdW1ucy5wdXNoKGNvbHVtbik7XG4gICAgfSk7XG5cbiAgICBpZiAoaXNDcmVhdGluZykge1xuICAgICAgY29sdW1ucy5wdXNoKHtcbiAgICAgICAgd2lkdGg6IDM3LFxuICAgICAgICBpc1Jlc2l6YWJsZTogZmFsc2UsXG4gICAgICAgIGNvbHVtbktleTogJ3JlbW92ZU5ld0l0ZW0nLFxuICAgICAgICBjZWxsOiAoKSA9PiBudWxsLFxuICAgICAgICBjZWxsRWRpdDogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbENyZWF0ZTogcm93SW5kZXggPT4gKFxuICAgICAgICAgIDxJY29uXG4gICAgICAgICAgICBpZD17YG9jLWRhdGFncmlkLW5ldy1pdGVtLXJlbW92ZS0ke2dyaWQuaWR9LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgIHR5cGU9XCJpbmRpY2F0b3JcIlxuICAgICAgICAgICAgbmFtZT1cImRlbGV0ZVwiXG4gICAgICAgICAgICB3aWR0aD17MzB9XG4gICAgICAgICAgICBoZWlnaHQ9ezMwfVxuICAgICAgICAgICAgc3R5bGU9e3sgcGFkZGluZzogJzdweCcgfX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMucHJvcHMucmVtb3ZlTmV3SXRlbShncmlkLCByb3dJbmRleCl9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSxcbiAgICAgICAgY2VsbEZpbHRlcjogKCkgPT4gbnVsbCxcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gY29sdW1ucztcbiAgfTtcblxuICBpc0NlbGxFZGl0ZWQgPSAocm93SW5kZXgsIGNvbCwgY2VsbFR5cGUpID0+IHtcbiAgICBpZiAoY2VsbFR5cGUgIT09ICdlZGl0Jykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBpZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgcmV0dXJuICEhdGhpcy5wcm9wcy5lZGl0RGF0YS5nZXRJbihbaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgfTtcblxuICBoYW5kbGVBZnRlckFkZEl0ZW0gPSAoKSA9PiB7XG4gICAgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCA9IHRydWU7XG4gIH07XG5cbiAgaGFuZGxlQWZ0ZXJFZGl0UHJlc3MgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5zaXplKSB7XG4gICAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IHRydWU7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY3VycmVudFJvdzogdW5kZWZpbmVkLFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZUFmdGVyVmFsaWRhdGlvbkVycm9yID0gKCkgPT4ge1xuICAgIHRoaXMuZm9jdXNUb0Vycm9yQ2VsbCA9IHRydWU7XG4gIH07XG5cbiAgaGFuZGxlUm93Q2xpY2sgPSAoZSwgcm93SW5kZXgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5yb3dTZWxlY3QgJiYgIXRoaXMucHJvcHMuaXNDcmVhdGluZyAmJiAhdGhpcy5wcm9wcy5pc0VkaXRpbmcpIHtcbiAgICAgIGlmIChlLmN0cmxLZXkgfHwgZS5zaGlmdEtleSkge1xuICAgICAgICBkb2N1bWVudC5nZXRTZWxlY3Rpb24oKS5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICAgIH1cbiAgICAgIC8vIERvbid0IHRyaWdnZXIgc2VsZWN0aW9uIGNoYW5nZSBvbiB3aGVuIHVzZXIgY2xpY2tzIG9uIHNwZWNpYWwgY2VsbHMgbGlrZSBjaGVja2JveC9leHRyYVxuICAgICAgLy8gQ2hlY2sgdGhhdCBjbGlja2VkIG5vZGUncyBwYXJlbnQgb3IgcGFyZW50J3MgcGFyZW50IGRvZXNuJ3QgaGF2ZSBuby1yb3ctc2VsZWN0IGNsYXNzXG4gICAgICBjb25zdCB7IHBhcmVudE5vZGUgfSA9IGUudGFyZ2V0O1xuICAgICAgY29uc3QgcGFyZW50MWNsYXNzID0gcGFyZW50Tm9kZS5jbGFzc05hbWUgJiYgcGFyZW50Tm9kZS5jbGFzc05hbWUuaW5kZXhPZiA/IHBhcmVudE5vZGUuY2xhc3NOYW1lIDogJyc7XG4gICAgICBjb25zdCBwYXJlbnQyY2xhc3MgPSAgICAgICAgcGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZSAmJiBwYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lLmluZGV4T2YgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICA/IHBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWVcbiAgICAgICAgOiAnJztcbiAgICAgIGNvbnN0IHBhcmVudDNjbGFzcyA9IHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZVxuICAgICAgICAmJiBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUuaW5kZXhPZiAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgID8gcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgIDogJyc7XG4gICAgICBjb25zdCBwYXJlbnQ0Y2xhc3MgPSBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZVxuICAgICAgICAmJiBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZS5pbmRleE9mIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgPyBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZVxuICAgICAgICA6ICcnO1xuICAgICAgaWYgKFxuICAgICAgICBwYXJlbnQxY2xhc3MuaW5kZXhPZignbm8tcm93LXNlbGVjdCcpID09PSAtMVxuICAgICAgICAmJiBwYXJlbnQyY2xhc3MuaW5kZXhPZignbm8tcm93LXNlbGVjdCcpID09PSAtMVxuICAgICAgICAmJiBwYXJlbnQzY2xhc3MuaW5kZXhPZignbm8tcm93LXNlbGVjdCcpID09PSAtMVxuICAgICAgICAmJiBwYXJlbnQ0Y2xhc3MuaW5kZXhPZignbm8tcm93LXNlbGVjdCcpID09PSAtMVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMucHJvcHMuaXRlbVNlbGVjdGlvbkNoYW5nZShcbiAgICAgICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgdGhpcy5wcm9wcy5tdWx0aVNlbGVjdCAmJiBlLmN0cmxLZXksXG4gICAgICAgICAgdGhpcy5wcm9wcy5tdWx0aVNlbGVjdCAmJiBlLnNoaWZ0S2V5LFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5vblJvd0NsaWNrKSB7XG4gICAgICB0aGlzLnByb3BzLm9uUm93Q2xpY2soZSwgcm93SW5kZXgsIHRoaXMucHJvcHMuZGF0YS5nZXQocm93SW5kZXgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgaGFuZGxlQ29udGV4dE1lbnUgPSAoZSwgcm93SW5kZXgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5jb250ZXh0TWVudUl0ZW1zKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGl0ZW1TZWxlY3Rpb25DaGFuZ2UsIHNlbGVjdGVkSXRlbXMsIGdyaWQsIGRhdGEsXG4gICAgICB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY29udGV4dE1lbnVPcGVuOiB0cnVlLFxuICAgICAgICBjb250ZXh0TWVudVg6IGUuY2xpZW50WCxcbiAgICAgICAgY29udGV4dE1lbnVZOiBlLmNsaWVudFksXG4gICAgICB9KTtcbiAgICAgIC8vIElmIGNsaWNrZWQgaXRlbSBpcyBub3Qgc2VsZWN0ZWQsIGNoYW5nZSBzZWxlY3Rpb24gdG8gaXRcbiAgICAgIGlmICghc2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhkYXRhLmdldEluKFtyb3dJbmRleCwgLi4uZ3JpZC5pZEtleVBhdGhdKSkpIHtcbiAgICAgICAgaXRlbVNlbGVjdGlvbkNoYW5nZShncmlkLCByb3dJbmRleCk7XG4gICAgICB9XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25Eb2N1bWVudENsaWNrKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgaGFuZGxlQ29udGV4dE1lbnVJdGVtQ2xpY2sgPSAob25DbGljaywgc2VsZWN0ZWRJdGVtcywgc2VsZWN0ZWREYXRhKSA9PiAoKSA9PiB7XG4gICAgb25DbGljayhzZWxlY3RlZEl0ZW1zLCBzZWxlY3RlZERhdGEpO1xuICB9O1xuXG4gIGhhbmRsZVJvd0hlaWdodEdldHRlciA9IHJvd0luZGV4ID0+IHRoaXMucHJvcHMucm93SGVpZ2h0R2V0dGVyKFxuICAgIHRoaXMucHJvcHMuZGF0YS5nZXQocm93SW5kZXgpLFxuICAgIHJvd0luZGV4LFxuICApO1xuXG4gIHJlbmRlckNlbGwgPSBjb2wgPT4gKGNlbGxQcm9wcykgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGlzQ3JlYXRpbmcsIGlzRWRpdGluZywgY3JlYXRlRGF0YSwgc2VsZWN0ZWRDZWxsLCBncmlkLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgcm93SW5kZXgsIC4uLnByb3BzIH0gPSBjZWxsUHJvcHM7XG4gICAgbGV0IGNlbGw7XG4gICAgbGV0IGNlbGxUeXBlID0gJ3ZpZXcnO1xuICAgIGxldCBleHRyYVJvd0NvdW50ID0gMDsgLy8gaG93IG1hbnkgcm93cyB0byBpZ25vcmUgZnJvbSB0b3AsIG5ldyArIGZpbHRlciByb3dzXG4gICAgaWYgKGlzQ3JlYXRpbmcpIGV4dHJhUm93Q291bnQgPSBjcmVhdGVEYXRhLnNpemU7XG4gICAgY29uc3QgZXhpc3RpbmdSb3dzSW5kZXggPSByb3dJbmRleCAtIGV4dHJhUm93Q291bnQ7XG4gICAgaWYgKGlzQ3JlYXRpbmcpIHtcbiAgICAgIGlmIChyb3dJbmRleCA8PSBleHRyYVJvd0NvdW50IC0gMSkge1xuICAgICAgICBpZiAoY29sLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjZWxsID0gY29sLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ3JlYXRlQ2VsbFJlZihyb3dJbmRleCwgY29sKSxcbiAgICAgICAgICAgIHRoaXMub25DcmVhdGVDZWxsS2V5RG93bihyb3dJbmRleCwgY29sKSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGNlbGxUeXBlID0gJ2NyZWF0ZSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2VsbCA9IG51bGw7XG4gICAgICAgICAgY2VsbFR5cGUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjZWxsID0gY29sLmNlbGwoXG4gICAgICAgICAgZXhpc3RpbmdSb3dzSW5kZXgsXG4gICAgICAgICAgdGhpcy5oYW5kbGVDcmVhdGVDZWxsUmVmKGV4aXN0aW5nUm93c0luZGV4LCBjb2wpLFxuICAgICAgICAgIHRoaXMub25DcmVhdGVDZWxsS2V5RG93bihleGlzdGluZ1Jvd3NJbmRleCwgY29sKSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzRWRpdGluZyAmJiBjb2wuY2VsbEVkaXQpIHtcbiAgICAgIGNlbGwgPSBjb2wuY2VsbEVkaXQoXG4gICAgICAgIGV4aXN0aW5nUm93c0luZGV4LFxuICAgICAgICB0aGlzLmhhbmRsZUVkaXRDZWxsUmVmKGV4aXN0aW5nUm93c0luZGV4LCBjb2wpLFxuICAgICAgICB0aGlzLm9uRWRpdENlbGxLZXlEb3duKGV4aXN0aW5nUm93c0luZGV4LCBjb2wpLFxuICAgICAgKTtcbiAgICAgIGNlbGxUeXBlID0gJ2VkaXQnO1xuICAgIH0gZWxzZSB7XG4gICAgICBjZWxsID0gY29sLmNlbGwoXG4gICAgICAgIGV4aXN0aW5nUm93c0luZGV4LFxuICAgICAgICB0aGlzLmhhbmRsZUVkaXRDZWxsUmVmKGV4aXN0aW5nUm93c0luZGV4LCBjb2wpLFxuICAgICAgICB0aGlzLm9uRWRpdENlbGxLZXlEb3duKGV4aXN0aW5nUm93c0luZGV4LCBjb2wpLFxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3QgaXNTcGVjaWFsID0gcHJvcHMuY29sdW1uS2V5ID09PSAnc2VsZWN0aW9uQ2hlY2tib3gnIHx8IHByb3BzLmNvbHVtbktleSA9PT0gJ2V4dHJhQ29sdW1uJztcbiAgICBpZiAoKGNlbGxUeXBlID09PSAndmlldycgfHwgY2VsbFR5cGUgPT09ICdlZGl0JyB8fCBjZWxsVHlwZSA9PT0gJ2NyZWF0ZScpICYmICFpc1NwZWNpYWwpIHtcbiAgICAgIGNvbnN0IGdldFJvd0luZGV4ID0gY2VsbFR5cGUgPT09ICdjcmVhdGUnID8gcm93SW5kZXggOiByb3dJbmRleCAtIGV4dHJhUm93Q291bnQ7XG4gICAgICBjb25zdCBtZXNzYWdlRGF0YSA9IHRoaXMuZ2V0Q2VsbE1lc3NhZ2VzKGdldFJvd0luZGV4LCBjb2wsIGNlbGxUeXBlKTtcbiAgICAgIGNvbnN0IGlzRWRpdGVkID0gdGhpcy5pc0NlbGxFZGl0ZWQoZ2V0Um93SW5kZXgsIGNvbCwgY2VsbFR5cGUpO1xuICAgICAgY29uc3QgY2xhc3NOYW1lID0gc2VsZWN0ZWRDZWxsLmdldCgncm93SW5kZXgnKSA9PT0gcm93SW5kZXhcbiAgICAgICAgJiYgc2VsZWN0ZWRDZWxsLmdldCgnY29sdW1uS2V5JykgPT09IHByb3BzLmNvbHVtbktleVxuICAgICAgICA/ICdvYy1kYXRhZ3JpZC1jZWxsIGlzLXNlbGVjdGVkJ1xuICAgICAgICA6ICdvYy1kYXRhZ3JpZC1jZWxsJztcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxDZWxsXG4gICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICAgIHN0eWxlPXtjb2wuc3R5bGV9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDZWxsU2VsZWN0KGNlbGxUeXBlLCByb3dJbmRleCwgcHJvcHMuY29sdW1uS2V5KX1cbiAgICAgICAgPlxuICAgICAgICAgIDxDZWxsVG9vbHRpcFxuICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkQ2VsbC0ke2dyaWQuaWR9LSR7cHJvcHMuY29sdW1uS2V5fS0ke3Jvd0luZGV4fWB9XG4gICAgICAgICAgICBpc0VkaXRlZD17aXNFZGl0ZWR9XG4gICAgICAgICAgICBpc0Vycm9yPXshIW1lc3NhZ2VEYXRhLmVycm9yTWVzc2FnZX1cbiAgICAgICAgICAgIGlzV2FybmluZz17ISFtZXNzYWdlRGF0YS53YXJuaW5nTWVzc2FnZX1cbiAgICAgICAgICAgIGluZm9NZXNzYWdlPXttZXNzYWdlRGF0YS5pbmZvTWVzc2FnZX1cbiAgICAgICAgICAgIGVycm9yTWVzc2FnZT17bWVzc2FnZURhdGEuZXJyb3JNZXNzYWdlfVxuICAgICAgICAgICAgd2FybmluZ01lc3NhZ2U9e21lc3NhZ2VEYXRhLndhcm5pbmdNZXNzYWdlfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtjZWxsfVxuICAgICAgICAgIDwvQ2VsbFRvb2x0aXA+XG4gICAgICAgIDwvQ2VsbD5cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8Q2VsbCB7Li4ucHJvcHN9IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWNlbGxcIiBzdHlsZT17Y29sLnN0eWxlfT5cbiAgICAgICAge2NlbGx9XG4gICAgICA8L0NlbGw+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJDb2x1bW5zID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGFsbERhdGFTaXplLCBncmlkLCBpc0NyZWF0aW5nLCBpc0J1c3ksIHZpc2libGVDb2x1bW5zLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghYWxsRGF0YVNpemUgJiYgIWlzQnVzeSAmJiAhaXNDcmVhdGluZyAmJiAhZ3JpZC5wYWdpbmF0aW9uKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Q29sdW1uXG4gICAgICAgICAgY29sdW1uS2V5PVwiZGF0YUVtcHR5Q29sdW1uXCJcbiAgICAgICAgICBoZWFkZXI9eyhcbiAgICAgICAgICAgIDxDZWxsIHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgICAgIDxNIGlkPVwiR3JpZC5Ob0l0ZW1zXCIgLz5cbiAgICAgICAgICAgIDwvQ2VsbD5cbil9XG4gICAgICAgICAgd2lkdGg9ezEwfVxuICAgICAgICAgIGlzUmVzaXphYmxlPXtmYWxzZX1cbiAgICAgICAgICBmbGV4R3Jvdz17MX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICAgIGlmICghdmlzaWJsZUNvbHVtbnMuc2l6ZSkge1xuICAgICAgaWYgKGlzQnVzeSkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxDb2x1bW5cbiAgICAgICAgICAgIGNvbHVtbktleT1cImRhdGFFbXB0eUNvbHVtblwiXG4gICAgICAgICAgICBoZWFkZXI9ezxDZWxsPiZuYnNwOzwvQ2VsbD59XG4gICAgICAgICAgICB3aWR0aD17MTB9XG4gICAgICAgICAgICBpc1Jlc2l6YWJsZT17ZmFsc2V9XG4gICAgICAgICAgICBmbGV4R3Jvdz17MX1cbiAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPENvbHVtblxuICAgICAgICAgIGNvbHVtbktleT1cImRhdGFFbXB0eUNvbHVtblwiXG4gICAgICAgICAgaGVhZGVyPXsoXG4gICAgICAgICAgICA8Q2VsbCBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInIH19PlxuICAgICAgICAgICAgICA8TSBpZD1cIkdyaWQuTm9Db2x1bW5zXCIgLz5cbiAgICAgICAgICAgIDwvQ2VsbD5cbil9XG4gICAgICAgICAgd2lkdGg9ezEwfVxuICAgICAgICAgIGlzUmVzaXphYmxlPXtmYWxzZX1cbiAgICAgICAgICBmbGV4R3Jvdz17MX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnN0IGNvbHVtbnMgPSB0aGlzLmdlbmVyYXRlQ29sdW1ucygpO1xuICAgIGlmIChjb2x1bW5zLmxlbmdodCA9PT0gMCkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIGNvbHVtbnMubWFwKGNvbCA9PiAoXG4gICAgICA8Q29sdW1uXG4gICAgICAgIGtleT17Y29sLmNvbHVtbktleX1cbiAgICAgICAgY29sdW1uS2V5PXtjb2wuY29sdW1uS2V5fVxuICAgICAgICBoZWFkZXI9eyhcbiAgICAgICAgICA8SGVhZGVyQ2VsbFxuICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkSGVhZGVyLSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbC5jb2x1bW5LZXl9YH1cbiAgICAgICAgICAgIGdyaWQ9e3RoaXMucHJvcHMuZ3JpZH1cbiAgICAgICAgICAgIGNvbHVtbnM9e3RoaXMucHJvcHMuY29sdW1uc31cbiAgICAgICAgICAgIGNvbHVtbj17Y29sfVxuICAgICAgICAgICAgY3VycmVudFNvcnRDb2x1bW49e3RoaXMucHJvcHMuc29ydENvbHVtbn1cbiAgICAgICAgICAgIGN1cnJlbnRTb3J0T3JkZXI9e3RoaXMucHJvcHMuc29ydE9yZGVyfVxuICAgICAgICAgICAgb25Tb3J0Q2hhbmdlPXt0aGlzLnByb3BzLnNvcnRDaGFuZ2V9XG4gICAgICAgICAgICBpc0J1c3k9e3RoaXMucHJvcHMuaXNCdXN5fVxuICAgICAgICAgICAgZmlsdGVyaW5nPXt0aGlzLnByb3BzLmZpbHRlcmluZyAmJiB0aGlzLnByb3BzLmlzRmlsdGVyaW5nfVxuICAgICAgICAgICAgd2lkdGg9e3RoaXMucHJvcHMuY29sdW1uV2lkdGhzLmdldChjb2wuY29sdW1uS2V5LCBjb2wud2lkdGgpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtjb2wuaGVhZGVyfVxuICAgICAgICAgIDwvSGVhZGVyQ2VsbD5cbil9XG4gICAgICAgIGNlbGw9e3RoaXMucmVuZGVyQ2VsbChjb2wpfVxuICAgICAgICB3aWR0aD17dGhpcy5wcm9wcy5jb2x1bW5XaWR0aHMuZ2V0KGNvbC5jb2x1bW5LZXksIGNvbC53aWR0aCl9XG4gICAgICAgIG1pbldpZHRoPXtjb2wubWluV2lkdGh9XG4gICAgICAgIG1heFdpZHRoPXtjb2wubWF4V2lkdGh9XG4gICAgICAgIGlzUmVzaXphYmxlPXtjb2wuaXNSZXNpemFibGV9XG4gICAgICAgIGZsZXhHcm93PXtjb2wuZmxleEdyb3cgPyBjb2wuZmxleEdyb3cgOiAwfVxuICAgICAgICBmaXhlZD17Y29sLmZpeGVkfVxuICAgICAgICBmaXhlZFJpZ2h0PXtjb2wuZml4ZWRSaWdodH1cbiAgICAgICAgYWxsb3dDZWxsc1JlY3ljbGluZz17Y29sLmFsbG93Q2VsbHNSZWN5Y2xpbmd9XG4gICAgICAvPlxuICAgICkpO1xuICB9O1xuXG4gIHJlbmRlckNvbnRleHRNZW51ID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGNvbnRleHRNZW51SXRlbXMsIGRhdGEsIGdyaWQsIHNlbGVjdGVkSXRlbXMsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBjb250ZXh0TWVudVgsIGNvbnRleHRNZW51WSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBzdHlsZSA9IHtcbiAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICB6SW5kZXg6IDEwMDAwLFxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICB0b3A6IGAke2NvbnRleHRNZW51WX1weGAsXG4gICAgICBsZWZ0OiBgJHtjb250ZXh0TWVudVh9cHhgLFxuICAgIH07XG4gICAgY29uc3Qgc2VsZWN0ZWREYXRhID0gZGF0YS5maWx0ZXIoZCA9PiBzZWxlY3RlZEl0ZW1zLmluY2x1ZGVzKGQuZ2V0SW4oZ3JpZC5pZEtleVBhdGgpKSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDx1bCBjbGFzc05hbWU9XCJkcm9wZG93bi1tZW51IG9jLWRhdGFncmlkLWNvbnRleHQtbWVudSBvcGVuXCIgc3R5bGU9e3N0eWxlfT5cbiAgICAgICAge2NvbnRleHRNZW51SXRlbXNcbiAgICAgICAgICAmJiBjb250ZXh0TWVudUl0ZW1zLm1hcFxuICAgICAgICAgICYmIGNvbnRleHRNZW51SXRlbXMubWFwKChpdGVtLCBpKSA9PiB7XG4gICAgICAgICAgICBsZXQgeyBkaXNhYmxlZCB9ID0gaXRlbTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbS5kaXNhYmxlZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICBkaXNhYmxlZCA9IGl0ZW0uZGlzYWJsZWQoc2VsZWN0ZWRJdGVtcywgc2VsZWN0ZWREYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxNZW51SXRlbVxuICAgICAgICAgICAgICAgIGtleT17aX0gLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAgICAgICAgIGhlYWRlcj17aXRlbS5oZWFkZXJ9XG4gICAgICAgICAgICAgICAgZGl2aWRlcj17aXRlbS5kaXZpZGVyfVxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgICB0aXRsZT17aXRlbS50aXRsZX1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkIHx8ICFpdGVtLm9uQ2xpY2tcbiAgICAgICAgICAgICAgICAgICAgPyBudWxsXG4gICAgICAgICAgICAgICAgICAgIDogdGhpcy5oYW5kbGVDb250ZXh0TWVudUl0ZW1DbGljayhpdGVtLm9uQ2xpY2ssIHNlbGVjdGVkSXRlbXMsIHNlbGVjdGVkRGF0YSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7aXRlbS52YWx1ZX1cbiAgICAgICAgICAgICAgPC9NZW51SXRlbT5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSl9XG4gICAgICA8L3VsPlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGdyaWRDbGFzc05hbWUgPSBjbGFzc05hbWVzKHtcbiAgICAgICdvYy1kYXRhZ3JpZC1jb250YWluZXInOiB0cnVlLFxuICAgICAgJ3dpdGgtYWN0aW9uYmFyJzogdGhpcy5wcm9wcy5pbmxpbmVFZGl0ICYmICF0aGlzLnByb3BzLmRpc2FibGVBY3Rpb25CYXIsXG4gICAgICAnaXMtYnVzeSc6IHRoaXMucHJvcHMuaXNCdXN5LFxuICAgICAgJ2lzLWVkaXRpbmcnOiB0aGlzLnByb3BzLmlzRWRpdGluZyxcbiAgICAgICdpcy1jcmVhdGluZyc6IHRoaXMucHJvcHMuaXNDcmVhdGluZyxcbiAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgfSk7XG5cbiAgICAvLyBjaGVjayBpZiB0aGVyZSBpcyBhIG5ldyByZXF1ZXN0IHRvIGNoYW5nZSBlZGl0IG1vZGUgZm9jdXNcbiAgICB0aGlzLnNldEZvY3VzVG8odGhpcy5wcm9wcy5mb2N1c1R5cGUpO1xuXG4gICAgbGV0IGFjdGlvbkJhciA9IG51bGw7XG4gICAgbGV0IGFjdGlvbkJhclJpZ2h0ID0gbnVsbDtcbiAgICBsZXQgYWN0aW9uQmFyTGVmdCA9IG51bGw7XG4gICAgaWYgKFxuICAgICAgKHRoaXMucHJvcHMuYWN0aW9uQmFyXG4gICAgICAgIHx8IHRoaXMucHJvcHMuaW5saW5lRWRpdFxuICAgICAgICB8fCB0aGlzLnByb3BzLmZpbHRlcmluZ1xuICAgICAgICB8fCB0aGlzLnByb3BzLnJlbW92aW5nKVxuICAgICAgJiYgIXRoaXMucHJvcHMuZGlzYWJsZUFjdGlvbkJhclxuICAgICkge1xuICAgICAgYWN0aW9uQmFyUmlnaHQgPSAoXG4gICAgICAgIDxBY3Rpb25CYXIgcG9zaXRpb249XCJyaWdodFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtYWN0aW9uYmFyLXJpZ2h0XCI+e3RoaXMucHJvcHMuYWN0aW9uQmFyfTwvZGl2PlxuICAgICAgICAgIHt0aGlzLnByb3BzLmZpbHRlcmluZ1xuICAgICAgICAgICAgJiYgdGhpcy5wcm9wcy5kaXNhYmxlRHJvcGRvd25cbiAgICAgICAgICAgICYmICF0aGlzLnByb3BzLmRpc2FibGVGaWx0ZXJpbmdDb250cm9scyAmJiA8RmlsdGVyaW5nQ29udHJvbHMgey4uLnRoaXMucHJvcHN9IC8+fVxuICAgICAgICAgIHt0aGlzLnByb3BzLmlubGluZUVkaXQgJiYgKFxuICAgICAgICAgICAgPElubGluZUVkaXRDb250cm9sc1xuICAgICAgICAgICAgICBhZnRlckFkZEl0ZW09e3RoaXMuaGFuZGxlQWZ0ZXJBZGRJdGVtfVxuICAgICAgICAgICAgICBhZnRlckVkaXRQcmVzcz17dGhpcy5oYW5kbGVBZnRlckVkaXRQcmVzc31cbiAgICAgICAgICAgICAgYWZ0ZXJWYWxpZGF0aW9uRXJyb3I9e3RoaXMuaGFuZGxlQWZ0ZXJWYWxpZGF0aW9uRXJyb3J9XG4gICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuICAgICAgICAgIHsodGhpcy5wcm9wcy5kcm9wZG93bk1lbnVJdGVtc1xuICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5yZW1vdmluZ1xuICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5jb2x1bW5TZXR0aW5nc1xuICAgICAgICAgICAgfHwgKHRoaXMucHJvcHMuZmlsdGVyaW5nICYmICF0aGlzLnByb3BzLmRpc2FibGVEcm9wZG93bikpICYmIChcbiAgICAgICAgICAgIDxEcm9wZG93bkNvbnRyb2xzIHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQWN0aW9uQmFyPlxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuYWN0aW9uQmFyTGVmdCB8fCB0aGlzLnByb3BzLmdyaWRIZWFkZXIpIHtcbiAgICAgIGFjdGlvbkJhckxlZnQgPSAoXG4gICAgICAgIDxBY3Rpb25CYXIgcG9zaXRpb249XCJsZWZ0XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1ncmlkaGVhZGVyXCI+e3RoaXMucHJvcHMuZ3JpZEhlYWRlcn08L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWFjdGlvbmJhci1sZWZ0XCI+e3RoaXMucHJvcHMuYWN0aW9uQmFyTGVmdH08L2Rpdj5cbiAgICAgICAgPC9BY3Rpb25CYXI+XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoYWN0aW9uQmFyTGVmdCB8fCBhY3Rpb25CYXJSaWdodCkge1xuICAgICAgYWN0aW9uQmFyID0gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWFjdGlvbmJhci1jb250YWluZXJcIj5cbiAgICAgICAgICB7YWN0aW9uQmFyTGVmdH1cbiAgICAgICAgICB7YWN0aW9uQmFyUmlnaHR9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gICAgbGV0IHJvd3NDb3VudCA9IHRoaXMucHJvcHMucm93c0NvdW50IHx8IHRoaXMucHJvcHMucm93c0NvdW50ID09PSAwXG4gICAgICA/IHRoaXMucHJvcHMucm93c0NvdW50XG4gICAgICA6IHRoaXMucHJvcHMuZGF0YS5zaXplO1xuICAgIGlmICh0aGlzLnByb3BzLmlzQ3JlYXRpbmcpIHJvd3NDb3VudCArPSB0aGlzLnByb3BzLmNyZWF0ZURhdGEuc2l6ZTtcbiAgICBpZiAoIXRoaXMucHJvcHMudmlzaWJsZUNvbHVtbnMuc2l6ZSkgcm93c0NvdW50ID0gMDtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD17YG9jLWRhdGFncmlkLSR7dGhpcy5wcm9wcy5ncmlkLmlkfWB9XG4gICAgICAgIGNsYXNzTmFtZT17Z3JpZENsYXNzTmFtZX1cbiAgICAgICAgc3R5bGU9e3RoaXMucHJvcHMuY29udGFpbmVyU3R5bGV9XG4gICAgICA+XG4gICAgICAgIHt0aGlzLnByb3BzLmlzQnVzeSAmJiA8U3Bpbm5lciAvPn1cbiAgICAgICAge3RoaXMuc3RhdGUuY29udGV4dE1lbnVPcGVuICYmIHRoaXMucmVuZGVyQ29udGV4dE1lbnUoKX1cbiAgICAgICAge2FjdGlvbkJhcn1cbiAgICAgICAgPFJlc3BvbnNpdmVGaXhlZERhdGFUYWJsZVxuICAgICAgICAgIGlkPXt0aGlzLnByb3BzLmdyaWQuaWR9XG4gICAgICAgICAgcm93c0NvdW50PXtyb3dzQ291bnR9XG4gICAgICAgICAgaGVhZGVySGVpZ2h0PXtcbiAgICAgICAgICAgICh0aGlzLnByb3BzLmZpbHRlcmluZyAmJiB0aGlzLnByb3BzLmlzRmlsdGVyaW5nKVxuICAgICAgICAgICAgICA/IHRoaXMucHJvcHMuaGVhZGVySGVpZ2h0ICsgdGhpcy5wcm9wcy5maWx0ZXJSb3dIZWlnaHRcbiAgICAgICAgICAgICAgOiB0aGlzLnByb3BzLmhlYWRlckhlaWdodFxuICAgICAgICAgIH1cbiAgICAgICAgICByb3dIZWlnaHQ9e3RoaXMucHJvcHMucm93SGVpZ2h0fVxuICAgICAgICAgIG9uQ29sdW1uUmVzaXplRW5kQ2FsbGJhY2s9e3RoaXMub25Db2x1bW5SZXNpemVFbmRDYWxsYmFja31cbiAgICAgICAgICBpc0NvbHVtblJlc2l6aW5nPXtmYWxzZX1cbiAgICAgICAgICBvblJvd0NsaWNrPXt0aGlzLmhhbmRsZVJvd0NsaWNrfVxuICAgICAgICAgIHNjcm9sbFRvQ29sdW1uPXt0aGlzLnByb3BzLnNjcm9sbFRvQ29sdW1uIHx8IHRoaXMuc3RhdGUuY3VycmVudENvbHVtbn1cbiAgICAgICAgICBzY3JvbGxUb3A9e3RoaXMucHJvcHMuc2Nyb2xsVG9wfVxuICAgICAgICAgIHNjcm9sbFRvUm93PXt0aGlzLmdldFNjcm9sbFRvUm93KCl9XG4gICAgICAgICAgb25Sb3dEb3VibGVDbGljaz17dGhpcy5wcm9wcy5vblJvd0RvdWJsZUNsaWNrfVxuICAgICAgICAgIG9uUm93TW91c2VEb3duPXt0aGlzLnByb3BzLm9uTW91c2VEb3dufVxuICAgICAgICAgIG9uUm93TW91c2VFbnRlcj17dGhpcy5wcm9wcy5vblJvd01vdXNlRW50ZXJ9XG4gICAgICAgICAgb25Sb3dNb3VzZUxlYXZlPXt0aGlzLnByb3BzLm9uUm93TW91c2VMZWF2ZX1cbiAgICAgICAgICBvblNjcm9sbFN0YXJ0PXt0aGlzLnByb3BzLm9uU2Nyb2xsU3RhcnR9XG4gICAgICAgICAgb25TY3JvbGxFbmQ9e3RoaXMucHJvcHMub25TY3JvbGxFbmR9XG4gICAgICAgICAgcm93Q2xhc3NOYW1lR2V0dGVyPXt0aGlzLmdldFJvd0NsYXNzTmFtZX1cbiAgICAgICAgICByb3dIZWlnaHRHZXR0ZXI9e3RoaXMucHJvcHMucm93SGVpZ2h0R2V0dGVyICYmIHRoaXMuaGFuZGxlUm93SGVpZ2h0R2V0dGVyfVxuICAgICAgICAgIG9uQ29udGVudEhlaWdodENoYW5nZT17dGhpcy5wcm9wcy5vbkNvbnRlbnRIZWlnaHRDaGFuZ2V9XG4gICAgICAgICAgb25Sb3dDb250ZXh0TWVudT17dGhpcy5oYW5kbGVDb250ZXh0TWVudX1cbiAgICAgICAgPlxuICAgICAgICAgIHt0aGlzLnJlbmRlckNvbHVtbnMoKX1cbiAgICAgICAgPC9SZXNwb25zaXZlRml4ZWREYXRhVGFibGU+XG4gICAgICAgIHt0aGlzLnByb3BzLmlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW4gJiYgKFxuICAgICAgICAgIDxDb2x1bW5TZXR0aW5nc01vZGFsXG4gICAgICAgICAgICBncmlkPXt0aGlzLnByb3BzLmdyaWR9XG4gICAgICAgICAgICBjb2x1bW5zPXt0aGlzLnByb3BzLmNvbHVtbnN9XG4gICAgICAgICAgICB2aXNpYmxlQ29sdW1ucz17dGhpcy5wcm9wcy52aXNpYmxlQ29sdW1uc31cbiAgICAgICAgICAgIGNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbD17dGhpcy5wcm9wcy5jbG9zZUNvbHVtblNldHRpbmdzTW9kYWx9XG4gICAgICAgICAgICBzYXZlQ29sdW1uU2V0dGluZ3M9e3RoaXMucHJvcHMuc2F2ZUNvbHVtblNldHRpbmdzfVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEYXRhR3JpZDtcbiJdfQ==