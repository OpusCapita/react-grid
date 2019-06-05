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
            filtering: _this.props.isFiltering,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwib3duUHJvcHMiLCJHUklEIiwiZ3JpZCIsImlzQnVzeSIsImRhdGFncmlkIiwiZ2V0SW4iLCJpZCIsImlzRWRpdGluZyIsImlzQ3JlYXRpbmciLCJpc0ZpbHRlcmluZyIsImlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW4iLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwidmlzaWJsZUNvbHVtbnMiLCJjb2x1bW5XaWR0aHMiLCJzZWxlY3RlZENlbGwiLCJzZWxlY3RlZEl0ZW1zIiwiZGF0YSIsImVkaXREYXRhIiwiY3JlYXRlRGF0YSIsImZpbHRlckRhdGEiLCJjZWxsTWVzc2FnZXMiLCJjcmVhdGVDZWxsTWVzc2FnZXMiLCJhbGxEYXRhU2l6ZSIsInNpemUiLCJsYW5ndWFnZSIsIlV0aWxzIiwiZ2V0TGFuZ3VhZ2UiLCJ1c2VyIiwicmVnaW9uIiwiZ2V0UmVnaW9uIiwiZGF0ZUZvcm1hdCIsImdldERhdGVGb3JtYXQiLCJ0aG91c2FuZFNlcGFyYXRvciIsImdldFRob3VzYW5kU2VwYXJhdG9yIiwiZGVjaW1hbFNlcGFyYXRvciIsImdldERlY2ltYWxTZXBhcmF0b3IiLCJmb3JjZVJlZnJlc2hUaW1lc3RhbXAiLCJnZXQiLCJmb2N1c1R5cGUiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJkYXRhZ3JpZEFjdGlvbnMiLCJEYXRhR3JpZCIsInBhZ2luYXRpb24iLCJpbmplY3RJbnRsIiwicHJvcHMiLCJjb250ZXh0TWVudUl0ZW1zIiwic2V0U3RhdGUiLCJjb250ZXh0TWVudU9wZW4iLCJkb2N1bWVudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJvbkRvY3VtZW50Q2xpY2siLCJuZXdDb2x1bW5XaWR0aCIsImNvbHVtbktleSIsInJlc2l6ZUNvbHVtbiIsInJvd0luZGV4IiwiY29sIiwiZSIsImNyZWF0ZSIsImVuYWJsZUFycm93TmF2aWdhdGlvbiIsImNlbGxSZWZzIiwiY3JlYXRlQ2VsbFJlZnMiLCJhcnJvd0tleXMiLCJLRVlfQ09ERVMiLCJET1dOIiwiVVAiLCJMRUZUIiwiUklHSFQiLCJjb2x1bW5zIiwib25MYXN0Q2VsbFRhYlByZXNzIiwiZ3JpZENvbHVtbnMiLCJnZXRDb2x1bW5LZXlCeUluZGV4IiwiaSIsImdldENvbHVtbktleSIsInJvd3NTaXplIiwiY3VycmVudENlbGwiLCJwcm94eSIsImlzQ3Vyc29yQXRTdGFydCIsInR5cGUiLCJzZWxlY3Rpb25TdGFydCIsImlzQ3Vyc29yQXRFbmQiLCJzZWxlY3Rpb25FbmQiLCJ2YWx1ZSIsImxlbmd0aCIsInNlbGVjdFJlZiIsInNlbGVjdCIsImdldFNlbGVjdFJlZiIsImluY2x1ZGVzIiwia2V5Q29kZSIsInByZXZlbnREZWZhdWx0IiwiRU5URVIiLCJFU0MiLCJhZGROZXdJdGVtIiwiZ2V0Q29sdW1uRGVmYXVsdFZhbHVlcyIsImZvY3VzVG9DcmVhdGVDZWxsIiwibmV4dEVsZW1lbnQiLCJtZW51SXNPcGVuIiwibW92ZUNlbGxGb2N1cyIsIlRBQiIsImNvbHVtbkluZCIsImZpbmRJbmRleCIsImMiLCJ2YWx1ZUtleVBhdGgiLCJqb2luIiwiZGlzYWJsZWQiLCJyb3dJbmQiLCJzaGlmdEtleSIsIm9uQ2VsbEtleURvd24iLCJ2YWx1ZVBhcnNlciIsImV2ZW50T3JEYXRhIiwicmF3VmFsdWUiLCJ0YXJnZXQiLCJ1bmRlZmluZWQiLCJmaWx0ZXJDZWxsVmFsdWVDaGFuZ2UiLCJjcmVhdGVDZWxsVmFsdWVDaGFuZ2UiLCJvbkNyZWF0ZVZhbHVlQ2hhbmdlIiwib25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUiLCJtYXRjaFZhbHVlIiwib25DcmVhdGVDZWxsVmFsdWVDaGFuZ2UiLCJuZXdWYWx1ZUtleVBhdGgiLCJ2IiwibmV3VmFsdWUiLCJ2YWxpZGF0b3JzIiwiY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUiLCJkYXRhSWQiLCJnZXREYXRhSWRCeVJvd0luZGV4IiwiZWRpdENlbGxWYWx1ZUNoYW5nZSIsIm9uRWRpdFZhbHVlQ2hhbmdlIiwib25FZGl0Q2VsbFZhbHVlQ2hhbmdlIiwiZWRpdENlbGxWYWx1ZVZhbGlkYXRlIiwib25DcmVhdGVCbHVyIiwiZ2V0RWRpdEl0ZW1WYWx1ZSIsIm9uRWRpdEJsdXIiLCJjZWxsVHlwZSIsImlucHV0VHlwZSIsImNlbGxTZWxlY3Rpb25DaGFuZ2UiLCJjZWxsU2VsZWN0IiwiY29tcG9uZW50IiwiaW5wdXRSZWYiLCJpZEtleVBhdGgiLCJpbmRleCIsIm9wdGlvbnMiLCJlZGl0VmFsdWUiLCJvcmlnaW5hbFZhbHVlIiwiY29tcG9uZW50VHlwZSIsInNlbGVjdE9wdGlvbnMiLCJmaW5kIiwib2JqIiwiU3RyaW5nIiwicmVwbGFjZSIsInZhbCIsInRvSlMiLCJtb2RlIiwiY29tcG9uZW50RGlzYWJsZWQiLCJkaXNhYmxlRWRpdGluZyIsImRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoIiwiZ2V0Q3JlYXRlSXRlbVZhbHVlIiwibWF0Y2hWYWx1ZUtleVBhdGgiLCJyb3dDbGFzc05hbWVzIiwiZXh0cmFSb3dDb3VudCIsInB1c2giLCJpbmRleE9mIiwicm93Q2xhc3NOYW1lR2V0dGVyIiwicmV0dXJuRGF0YSIsImluZm9NZXNzYWdlIiwiZXJyb3JNZXNzYWdlIiwid2FybmluZ01lc3NhZ2UiLCJzY3JvbGxUb1JvdyIsInNjcm9sbE5ld1JvdyIsInNjcm9sbEluRWRpdE1vZGUiLCJjdXJyZW50Um93IiwiZ2V0U2VsZWN0ZWRJdGVtSW5kZXgiLCJmaXJzdCIsImZvY3VzVG8iLCJwcmV2Rm9jdXNUbyIsImZvY3VzVG9MYXN0Um93IiwicmVmIiwiZm9jdXMiLCJnZXRDb21wb25lbnREaXNhYmxlZFN0YXRlIiwiZm9jdXNUb0VkaXRDZWxsIiwic2VsZWN0ZWRSb3dJbmRleCIsImNvbHVtbkluZGV4IiwiZWxlbWVudFR5cGVzIiwiY3VycmVudENvbHVtbiIsInNldFRpbWVvdXQiLCJzZWxlY3RBbGxJdGVtc0NoYW5nZSIsIml0ZW1TZWxlY3Rpb25DaGFuZ2UiLCJpbmxpbmVFZGl0IiwiZmlsdGVyaW5nIiwiaW50bCIsInNlbGVjdENvbXBvbmVudE9wdGlvbnMiLCJleHRyYUNvbHVtbiIsInJvd1NlbGVjdENoZWNrYm94Q29sdW1uIiwic2hvd1NlbGVjdEFsbENoZWNrYm94IiwidGFiSW5kZXgiLCJ3aWR0aCIsImlzUmVzaXphYmxlIiwiaXNTb3J0YWJsZSIsImNlbGwiLCJ2YWx1ZVJlbmRlciIsImNlbGxFZGl0IiwiY2VsbENyZWF0ZSIsImNlbGxGaWx0ZXIiLCJoZWFkZXIiLCJoYW5kbGVTZWxlY3RBbGxDaGVja0JveE9uQ2hhbmdlIiwicm93SXRlbSIsIml0ZW1JZCIsInNlbGVjdGVkIiwiaGFuZGxlU2VsZWN0aW9uQ2hlY2tCb3hPbkNoYW5nZSIsImZvckVhY2giLCJ2aXNpYmxlQ29sdW1uS2V5Iiwib3JnQ29sIiwidmFsdWVFbXB0eUNoZWNrZXIiLCJnZXRWYWx1ZUVtcHR5Q2hlY2tlciIsImZvcm1hdCIsImlzUmVxdWlyZWQiLCJjb2x1bW4iLCJHcmlkQ29sdW1uU2VydmljZSIsImJhc2VDb2x1bW4iLCJjb2x1bW5GdW5jdGlvbnMiLCJlZGl0IiwiZ2V0SXRlbVZhbHVlIiwib25DZWxsVmFsdWVDaGFuZ2UiLCJvbkNlbGxCbHVyIiwib25FZGl0Q2VsbEJsdXIiLCJvbkNlbGxGb2N1cyIsIm9uRWRpdENlbGxLZXlEb3duIiwiaGFuZGxlQ2VsbFJlZiIsImhhbmRsZUVkaXRDZWxsUmVmIiwib25DcmVhdGVDZWxsQmx1ciIsIm9uQ3JlYXRlQ2VsbEtleURvd24iLCJoYW5kbGVDcmVhdGVDZWxsUmVmIiwiZmlsdGVyIiwiZ2V0RmlsdGVySXRlbVZhbHVlIiwib25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UiLCJjZWxsUHJvcHMiLCJjb2x1bW5DZWxsIiwiY29tcG9uZW50VHlwZVByb3BzIiwiY29sdW1uQ29tcG9uZW50VHlwZSIsInBhZGRpbmciLCJyZW1vdmVOZXdJdGVtIiwiZm9jdXNUb0Vycm9yQ2VsbCIsInJvd1NlbGVjdCIsImN0cmxLZXkiLCJnZXRTZWxlY3Rpb24iLCJyZW1vdmVBbGxSYW5nZXMiLCJwYXJlbnROb2RlIiwicGFyZW50MWNsYXNzIiwiY2xhc3NOYW1lIiwicGFyZW50MmNsYXNzIiwicGFyZW50M2NsYXNzIiwicGFyZW50NGNsYXNzIiwibXVsdGlTZWxlY3QiLCJvblJvd0NsaWNrIiwic3RvcFByb3BhZ2F0aW9uIiwiY29udGV4dE1lbnVYIiwiY2xpZW50WCIsImNvbnRleHRNZW51WSIsImNsaWVudFkiLCJhZGRFdmVudExpc3RlbmVyIiwib25DbGljayIsInNlbGVjdGVkRGF0YSIsInJvd0hlaWdodEdldHRlciIsImV4aXN0aW5nUm93c0luZGV4IiwiaXNTcGVjaWFsIiwiZ2V0Um93SW5kZXgiLCJtZXNzYWdlRGF0YSIsImdldENlbGxNZXNzYWdlcyIsImlzRWRpdGVkIiwiaXNDZWxsRWRpdGVkIiwic3R5bGUiLCJoYW5kbGVDZWxsU2VsZWN0IiwidGV4dEFsaWduIiwiZ2VuZXJhdGVDb2x1bW5zIiwibGVuZ2h0IiwibWFwIiwic29ydENoYW5nZSIsInJlbmRlckNlbGwiLCJtaW5XaWR0aCIsIm1heFdpZHRoIiwiZmxleEdyb3ciLCJmaXhlZCIsImZpeGVkUmlnaHQiLCJhbGxvd0NlbGxzUmVjeWNsaW5nIiwiZGlzcGxheSIsInpJbmRleCIsInBvc2l0aW9uIiwidG9wIiwibGVmdCIsImQiLCJpdGVtIiwiZGl2aWRlciIsInRpdGxlIiwiaGFuZGxlQ29udGV4dE1lbnVJdGVtQ2xpY2siLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImludmFsaWRhdGUiLCJyZW5kZXIiLCJncmlkQ2xhc3NOYW1lIiwiZGlzYWJsZUFjdGlvbkJhciIsInNldEZvY3VzVG8iLCJhY3Rpb25CYXIiLCJhY3Rpb25CYXJSaWdodCIsImFjdGlvbkJhckxlZnQiLCJyZW1vdmluZyIsImRpc2FibGVEcm9wZG93biIsImRpc2FibGVGaWx0ZXJpbmdDb250cm9scyIsImhhbmRsZUFmdGVyQWRkSXRlbSIsImhhbmRsZUFmdGVyRWRpdFByZXNzIiwiaGFuZGxlQWZ0ZXJWYWxpZGF0aW9uRXJyb3IiLCJkcm9wZG93bk1lbnVJdGVtcyIsImNvbHVtblNldHRpbmdzIiwiZ3JpZEhlYWRlciIsInJvd3NDb3VudCIsImNvbnRhaW5lclN0eWxlIiwicmVuZGVyQ29udGV4dE1lbnUiLCJoZWFkZXJIZWlnaHQiLCJmaWx0ZXJSb3dIZWlnaHQiLCJyb3dIZWlnaHQiLCJvbkNvbHVtblJlc2l6ZUVuZENhbGxiYWNrIiwiaGFuZGxlUm93Q2xpY2siLCJzY3JvbGxUb0NvbHVtbiIsInNjcm9sbFRvcCIsImdldFNjcm9sbFRvUm93Iiwib25Sb3dEb3VibGVDbGljayIsIm9uTW91c2VEb3duIiwib25Sb3dNb3VzZUVudGVyIiwib25Sb3dNb3VzZUxlYXZlIiwib25TY3JvbGxTdGFydCIsIm9uU2Nyb2xsRW5kIiwiZ2V0Um93Q2xhc3NOYW1lIiwiaGFuZGxlUm93SGVpZ2h0R2V0dGVyIiwib25Db250ZW50SGVpZ2h0Q2hhbmdlIiwiaGFuZGxlQ29udGV4dE1lbnUiLCJyZW5kZXJDb2x1bW5zIiwiY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsIiwic2F2ZUNvbHVtblNldHRpbmdzIiwiY2hpbGRyZW4iLCJSZWFjdCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0IsQ0FBQ0MsS0FBRCxFQUFRQyxRQUFSLEVBQXFCO0FBQzNDLE1BQU1DLElBQUksR0FBR0QsUUFBUSxDQUFDRSxJQUF0QjtBQUNBLFNBQU87QUFDTEMsSUFBQUEsTUFBTSxFQUFFSixLQUFLLENBQUNLLFFBQU4sQ0FBZUMs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dkJwQztBQXdCRSxNQUFBLGdCQUFnQixFQUFFLEtBQUtDO0FBeEJ6QixPQTBCRyxLQUFLQyxhQUFMLEVBMUJILENBUkYsRUFvQ0csS0FBS2hTLEtBQUwsQ0FBV25DLHlCQUFYLElBQ0MsZ0NBQUMsMEJBQUQ7QUFDRSxNQUFBLElBQUksRUFBRSxLQUFLbUMsS0FBTCxDQUFXM0MsSUFEbkI7QUFFRSxNQUFBLE9BQU8sRUFBRSxLQUFLMkMsS0FBTCxDQUFXdUIsT0FGdEI7QUFHRSxNQUFBLGNBQWMsRUFBRSxLQUFLdkIsS0FBTCxDQUFXaEMsY0FIN0I7QUFJRSxNQUFBLHdCQUF3QixFQUFFLEtBQUtnQyxLQUFMLENBQVdpUyx3QkFKdkM7QUFLRSxNQUFBLGtCQUFrQixFQUFFLEtBQUtqUyxLQUFMLENBQVdrUztBQUxqQyxNQXJDSixFQTZDRyxLQUFLbFMsS0FBTCxDQUFXbVMsUUE3Q2QsQ0FERjtBQWlERCxHOzs7RUFydENvQkMsa0JBQU1DLGEsNENBR0xDLHVCO2VBcXRDVHpTLFEiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1sb25lbHktaWYsIHByZWZlci10ZW1wbGF0ZSwgcmVhY3QvcmVxdWlyZS1kZWZhdWx0LXByb3BzICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTWFwLCBMaXN0IH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBpbmplY3RJbnRsLCBGb3JtYXR0ZWRNZXNzYWdlIGFzIE0gfSBmcm9tICdyZWFjdC1pbnRsJztcbmltcG9ydCB7IENvbHVtbiwgQ2VsbCB9IGZyb20gJ2ZpeGVkLWRhdGEtdGFibGUtMic7XG5pbXBvcnQgeyBNZW51SXRlbSB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IEljb24gfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1pY29ucyc7XG5pbXBvcnQgU3Bpbm5lciBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1zcGlubmVyJztcbmltcG9ydCBDaGVja2JveCBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1jaGVja2JveCc7XG5pbXBvcnQgJ2ZpeGVkLWRhdGEtdGFibGUtMi9kaXN0L2ZpeGVkLWRhdGEtdGFibGUuY3NzJztcblxuaW1wb3J0IFJlc3BvbnNpdmVGaXhlZERhdGFUYWJsZSBmcm9tICcuL3Jlc3BvbnNpdmUtZml4ZWQtZGF0YS10YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IEhlYWRlckNlbGwgZnJvbSAnLi9oZWFkZXItY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IEFjdGlvbkJhciBmcm9tICcuL2FjdGlvbi1iYXIuY29tcG9uZW50JztcbmltcG9ydCBJbmxpbmVFZGl0Q29udHJvbHMgZnJvbSAnLi9pbmxpbmUtZWRpdC1jb250cm9scy5jb21wb25lbnQnO1xuaW1wb3J0IEZpbHRlcmluZ0NvbnRyb2xzIGZyb20gJy4vZmlsdGVyaW5nLWNvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgRHJvcGRvd25Db250cm9scyBmcm9tICcuL2Ryb3Bkb3duLWNvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgKiBhcyBkYXRhZ3JpZEFjdGlvbnMgZnJvbSAnLi9kYXRhZ3JpZC5hY3Rpb25zJztcbmltcG9ydCBDZWxsVG9vbHRpcCBmcm9tICcuL2NlbGwtdG9vbHRpcC5jb21wb25lbnQnO1xuaW1wb3J0IENvbHVtblNldHRpbmdzTW9kYWwgZnJvbSAnLi9jb2x1bW4tc2V0dGluZ3MvY29sdW1uLXNldHRpbmdzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBwcm9wVHlwZXMsIGRlZmF1bHRQcm9wcyB9IGZyb20gJy4vZGF0YWdyaWQucHJvcHMnO1xuaW1wb3J0IHsgS0VZX0NPREVTIH0gZnJvbSAnLi9kYXRhZ3JpZC5jb25zdGFudHMnO1xuaW1wb3J0IHBhZ2luYXRpb24gZnJvbSAnLi9wYWdpbmF0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9kYXRhZ3JpZC51dGlscyc7XG5pbXBvcnQgR3JpZENvbHVtblNlcnZpY2UgZnJvbSAnLi9jb2x1bW4tc2VydmljZS9jb2x1bW4tc2VydmljZSc7XG5pbXBvcnQgJy4vZGF0YWdyaWQuY29tcG9uZW50LnNjc3MnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUsIG93blByb3BzKSA9PiB7XG4gIGNvbnN0IEdSSUQgPSBvd25Qcm9wcy5ncmlkO1xuICByZXR1cm4ge1xuICAgIGlzQnVzeTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2lzQnVzeSddLCB0cnVlKSxcbiAgICBpc0VkaXRpbmc6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdpc0VkaXRpbmcnXSwgZmFsc2UpLFxuICAgIGlzQ3JlYXRpbmc6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdpc0NyZWF0aW5nJ10sIGZhbHNlKSxcbiAgICBpc0ZpbHRlcmluZzogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdpc0ZpbHRlcmluZyddLCBmYWxzZSksXG4gICAgaXNDb2x1bW5TZXR0aW5nc01vZGFsT3Blbjogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oXG4gICAgICBbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnY29sdW1uU2V0dGluZ3NNb2RhbCcsICdvcGVuJ10sXG4gICAgICBmYWxzZSxcbiAgICApLFxuICAgIHNvcnRDb2x1bW46IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ3NvcnRpbmdEYXRhJywgJ3NvcnRDb2x1bW4nXSwgbnVsbCksXG4gICAgc29ydE9yZGVyOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdzb3J0aW5nRGF0YScsICdzb3J0T3JkZXInXSwgbnVsbCksXG4gICAgdmlzaWJsZUNvbHVtbnM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ3Zpc2libGVDb2x1bW5zJ10sIExpc3QoKSksXG4gICAgY29sdW1uV2lkdGhzOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdjb2x1bW5XaWR0aHMnXSwgTWFwKCkpLFxuICAgIHNlbGVjdGVkQ2VsbDogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZWxlY3RlZENlbGwnXSwgTWFwKCkpLFxuICAgIHNlbGVjdGVkSXRlbXM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2VsZWN0ZWRJdGVtcyddLCBMaXN0KCkpLFxuICAgIGRhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnZGF0YSddLCBMaXN0KCkpLFxuICAgIGVkaXREYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2VkaXREYXRhJ10sIE1hcCgpKSxcbiAgICBjcmVhdGVEYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NyZWF0ZURhdGEnXSwgTGlzdCgpKSxcbiAgICBmaWx0ZXJEYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2ZpbHRlckRhdGEnXSwgTWFwKCkpLFxuICAgIGNlbGxNZXNzYWdlczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjZWxsTWVzc2FnZXMnXSwgTWFwKCkpLFxuICAgIGNyZWF0ZUNlbGxNZXNzYWdlczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjcmVhdGVDZWxsTWVzc2FnZXMnXSwgTWFwKCkpLFxuICAgIGFsbERhdGFTaXplOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2FsbERhdGEnXSwgTGlzdCgpKS5zaXplLFxuICAgIGxhbmd1YWdlOiBVdGlscy5nZXRMYW5ndWFnZShHUklELCBzdGF0ZS51c2VyKSxcbiAgICByZWdpb246IFV0aWxzLmdldFJlZ2lvbihHUklELCBzdGF0ZS51c2VyKSxcbiAgICBkYXRlRm9ybWF0OiBVdGlscy5nZXREYXRlRm9ybWF0KEdSSUQsIHN0YXRlLnVzZXIpLFxuICAgIHRob3VzYW5kU2VwYXJhdG9yOiBVdGlscy5nZXRUaG91c2FuZFNlcGFyYXRvcihHUklELCBzdGF0ZS51c2VyKSxcbiAgICBkZWNpbWFsU2VwYXJhdG9yOiBVdGlscy5nZXREZWNpbWFsU2VwYXJhdG9yKEdSSUQsIHN0YXRlLnVzZXIpLFxuICAgIGZvcmNlUmVmcmVzaFRpbWVzdGFtcDogc3RhdGUuZGF0YWdyaWQuZ2V0KCdmb3JjZVJlZnJlc2gnLCAwKSwgLy8gZm9yY2UgcmUtcmVuZGVyIHdoZW4gY2hhbmdlZFxuICAgIGZvY3VzVHlwZTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2ZvY3VzVHlwZSddLCBNYXAoKSksXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkYXRhZ3JpZEFjdGlvbnM7XG5cbkBwYWdpbmF0aW9uXG5AaW5qZWN0SW50bFxuQGNvbm5lY3QoXG4gIG1hcFN0YXRlVG9Qcm9wcyxcbiAgbWFwRGlzcGF0Y2hUb1Byb3BzLFxuKVxuY2xhc3MgRGF0YUdyaWQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHByb3BUeXBlcztcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjdXJyZW50Um93OiAwLFxuICAgICAgY3VycmVudENvbHVtbjogMCxcbiAgICAgIGNvbnRleHRNZW51T3BlbjogZmFsc2UsXG4gICAgICBjb250ZXh0TWVudVg6IG51bGwsXG4gICAgICBjb250ZXh0TWVudVk6IG51bGwsXG4gICAgfTtcbiAgICB0aGlzLmNlbGxSZWZzID0ge307XG4gICAgdGhpcy5jcmVhdGVDZWxsUmVmcyA9IHt9O1xuICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgPSBmYWxzZTtcbiAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IGZhbHNlOyAvLyBUT0RPOiBIYW5kbGUgZm9jdXNpbmcgd2hlbiB0cnVlXG4gICAgdGhpcy5mb2N1c1RvRXJyb3JDZWxsID0gZmFsc2U7IC8vIFRPRE86IEhhbmRsZSBmb2N1c2luZyB3aGVuIHRydWVcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkRvY3VtZW50Q2xpY2spO1xuICAgIHRoaXMucHJvcHMuaW52YWxpZGF0ZSh0aGlzLnByb3BzLmdyaWQpO1xuICB9XG5cbiAgb25Eb2N1bWVudENsaWNrID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmNvbnRleHRNZW51SXRlbXMpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjb250ZXh0TWVudU9wZW46IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkRvY3VtZW50Q2xpY2spO1xuICB9O1xuXG4gIG9uQ29sdW1uUmVzaXplRW5kQ2FsbGJhY2sgPSAobmV3Q29sdW1uV2lkdGgsIGNvbHVtbktleSkgPT4ge1xuICAgIHRoaXMucHJvcHMucmVzaXplQ29sdW1uKHRoaXMucHJvcHMuZ3JpZCwgY29sdW1uS2V5LCBuZXdDb2x1bW5XaWR0aCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEBwYXJhbSByb3dJbmRleCAoaW50KVxuICAgKiBAcGFyYW0gY29sIChvYmopLiBDb2x1bW4gb2JqZWN0LlxuICAgKiBAcGFyYW0gZS4gT3JpZ2luYWwgS2V5RG93biBldmVudFxuICAgKiBAcGFyYW0gY3JlYXRlIChib29sKS4gSXMgdGhlIGNlbGwgY3JlYXRlIGNlbGwgb3IgZWRpdCBjZWxsP1xuICAgKi9cbiAgb25DZWxsS2V5RG93biA9IChyb3dJbmRleCwgY29sLCBlLCBjcmVhdGUgPSBmYWxzZSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZUFycm93TmF2aWdhdGlvbikge1xuICAgICAgY29uc3QgY2VsbFJlZnMgPSBjcmVhdGUgPyB0aGlzLmNyZWF0ZUNlbGxSZWZzIDogdGhpcy5jZWxsUmVmcztcbiAgICAgIGNvbnN0IGFycm93S2V5cyA9IFtLRVlfQ09ERVMuRE9XTiwgS0VZX0NPREVTLlVQLCBLRVlfQ09ERVMuTEVGVCwgS0VZX0NPREVTLlJJR0hUXTtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgY29sdW1ucywgdmlzaWJsZUNvbHVtbnMsIGdyaWQsIGRhdGEsIG9uTGFzdENlbGxUYWJQcmVzcyxcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3QgZ3JpZENvbHVtbnMgPSBVdGlscy52aXNpYmxlQ29sdW1ucyhjb2x1bW5zLCB2aXNpYmxlQ29sdW1ucyk7XG4gICAgICBjb25zdCBnZXRDb2x1bW5LZXlCeUluZGV4ID0gaSA9PiBVdGlscy5nZXRDb2x1bW5LZXkoZ3JpZENvbHVtbnNbaV0pO1xuICAgICAgY29uc3Qgcm93c1NpemUgPSBkYXRhLnNpemU7XG4gICAgICBjb25zdCBjb2x1bW5LZXkgPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sKTtcbiAgICAgIGxldCBjdXJyZW50Q2VsbCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4fWBdO1xuICAgICAgbGV0IHByb3h5ID0gbnVsbDtcblxuICAgICAgY29uc3QgaXNDdXJzb3JBdFN0YXJ0ID0gKCkgPT4ge1xuICAgICAgICBpZiAoY3VycmVudENlbGwudHlwZSAhPT0gJ3RleHQnKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRDZWxsLnNlbGVjdGlvblN0YXJ0ID09PSAwO1xuICAgICAgfTtcblxuICAgICAgY29uc3QgaXNDdXJzb3JBdEVuZCA9ICgpID0+IHtcbiAgICAgICAgaWYgKGN1cnJlbnRDZWxsLnR5cGUgIT09ICd0ZXh0JykgcmV0dXJuIHRydWU7XG4gICAgICAgIHJldHVybiBjdXJyZW50Q2VsbC5zZWxlY3Rpb25FbmQgPT09IGN1cnJlbnRDZWxsLnZhbHVlLmxlbmd0aDtcbiAgICAgIH07XG5cbiAgICAgIC8vIElmIGN1cnJlbnQgY2VsbCBob2xkcyBhIHJlYWN0LWZsb2F0aW5nLXNlbGVjdCBjb21wb25lbnRcbiAgICAgIGlmIChjdXJyZW50Q2VsbCAmJiAoY3VycmVudENlbGwuc2VsZWN0UmVmIHx8IHR5cGVvZiBjdXJyZW50Q2VsbC5zZWxlY3QgPT09ICdvYmplY3QnKSkge1xuICAgICAgICBwcm94eSA9IGN1cnJlbnRDZWxsO1xuICAgICAgICBjdXJyZW50Q2VsbCA9IHRoaXMuZ2V0U2VsZWN0UmVmKHByb3h5KTtcbiAgICAgIH1cblxuICAgICAgLy8gUHJldmVudHMgdXAvZG93biBhcnJvdyBmcm9tIGNoYW5naW5nIG51bWJlciBmaWVsZCB2YWx1ZVxuICAgICAgaWYgKGFycm93S2V5cy5pbmNsdWRlcyhlLmtleUNvZGUpICYmIGN1cnJlbnRDZWxsLnR5cGUgPT09ICdudW1iZXInKSBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuICAgICAgICBjYXNlIEtFWV9DT0RFUy5FTlRFUjpcbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuRVNDOiB7XG4gICAgICAgICAgaWYgKGNyZWF0ZSAmJiBlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5FTlRFUikge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5hZGROZXdJdGVtKGdyaWQsIFV0aWxzLmdldENvbHVtbkRlZmF1bHRWYWx1ZXMoY29sdW1ucykpO1xuICAgICAgICAgICAgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgY3VycmVudENlbGwuc2VsZWN0KCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuRE9XTjoge1xuICAgICAgICAgIGxldCBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4ICsgMX1gXTtcblxuICAgICAgICAgIC8vIFByZXZlbnRzIG1lbnUgZnJvbSBvcGVuaW5nXG4gICAgICAgICAgaWYgKHByb3h5ICYmIHByb3h5LnNlbGVjdFJlZiAmJiAhcHJveHkuc2VsZWN0UmVmLnN0YXRlLm1lbnVJc09wZW4pIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmICghbmV4dEVsZW1lbnQpIGJyZWFrO1xuICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSB0aGlzLmdldFNlbGVjdFJlZihuZXh0RWxlbWVudCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubW92ZUNlbGxGb2N1cyhuZXh0RWxlbWVudCwgcm93SW5kZXggKyAxLCAtMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuVVA6IHtcbiAgICAgICAgICBsZXQgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2NvbHVtbktleX1fJHtyb3dJbmRleCAtIDF9YF07XG5cbiAgICAgICAgICAvLyBQcmV2ZW50cyBtZW51IGZyb20gb3BlbmluZ1xuICAgICAgICAgIGlmIChwcm94eSAmJiBwcm94eS5zZWxlY3RSZWYgJiYgIXByb3h5LnNlbGVjdFJlZi5zdGF0ZS5tZW51SXNPcGVuKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAoIW5leHRFbGVtZW50KSBicmVhaztcbiAgICAgICAgICAgIG5leHRFbGVtZW50ID0gdGhpcy5nZXRTZWxlY3RSZWYobmV4dEVsZW1lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm1vdmVDZWxsRm9jdXMobmV4dEVsZW1lbnQsIHJvd0luZGV4IC0gMSwgLTEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLlRBQjpcbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuUklHSFQ6XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLkxFRlQ6IHtcbiAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuUklHSFQgJiYgIWlzQ3Vyc29yQXRFbmQoKSkgYnJlYWs7XG4gICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLkxFRlQgJiYgIWlzQ3Vyc29yQXRTdGFydCgpKSBicmVhaztcblxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgIGxldCBjb2x1bW5JbmQgPSBncmlkQ29sdW1ucy5maW5kSW5kZXgoYyA9PiBjLnZhbHVlS2V5UGF0aC5qb2luKCcvJykgPT09IGNvbHVtbktleSk7XG4gICAgICAgICAgaWYgKGNvbHVtbkluZCAhPT0gLTEpIHtcbiAgICAgICAgICAgIGxldCBkaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICBsZXQgbmV4dEVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgbGV0IHJvd0luZCA9IHJvd0luZGV4O1xuICAgICAgICAgICAgd2hpbGUgKGRpc2FibGVkKSB7XG4gICAgICAgICAgICAgIC8vIE1vdmluZyB0byB0aGUgbGVmdFxuICAgICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuTEVGVCB8fCAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuVEFCICYmIGUuc2hpZnRLZXkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbHVtbkluZCAtIDEgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kIC09IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyb3dJbmQgLSAxID49IDApIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCA9IGdyaWRDb2x1bW5zLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgICByb3dJbmQgLT0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE1vdmluZyB0byB0aGUgcmlnaHRcbiAgICAgICAgICAgICAgICBpZiAoY29sdW1uSW5kICsgMSA8IGdyaWRDb2x1bW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kICs9IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyb3dJbmQgKyAxIDwgcm93c1NpemUpIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCA9IDA7XG4gICAgICAgICAgICAgICAgICByb3dJbmQgKz0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJvd0luZCArIDEgPT09IHJvd3NTaXplKSB7XG4gICAgICAgICAgICAgICAgICAvLyBJZiB0cnlpbmcgdG8gc2VsZWN0IGEgcm93LCB3aGVuIHRoZXJlIGlzIG5vbmU6XG4gICAgICAgICAgICAgICAgICBpZiAob25MYXN0Q2VsbFRhYlByZXNzICYmIGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLlRBQikgb25MYXN0Q2VsbFRhYlByZXNzKGUpO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2dldENvbHVtbktleUJ5SW5kZXgoY29sdW1uSW5kKX1fJHtyb3dJbmR9YF07XG5cbiAgICAgICAgICAgICAgLy8gSWYgd2UgY2Fubm90IGZvY3VzIG9uIHRoZSBuZXh0IGVsZW1lbnQgd2hpbGUgbW92aW5nIHRvIHRoZSByaWdodFxuICAgICAgICAgICAgICBpZiAoIW5leHRFbGVtZW50ICYmIGUua2V5Q29kZSAhPT0gS0VZX0NPREVTLkxFRlQpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSdyZSBub3QgeWV0IGluIHRoZSBsYXN0IGZvY3VzYWJsZSBjb2x1bW5cbiAgICAgICAgICAgICAgICBpZiAoY29sdW1uSW5kIDw9IGdyaWRDb2x1bW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgd2hpbGUgKGNvbHVtbkluZCA8PSBncmlkQ29sdW1ucy5sZW5ndGggJiYgIW5leHRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHRFbGVtZW50ID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtnZXRDb2x1bW5LZXlCeUluZGV4KGNvbHVtbkluZCl9XyR7cm93SW5kfWBdO1xuICAgICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgKz0gMTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBJZiB3ZSBhcmUgaW4gdGhlIGxhc3QgY29sdW1uIGFuZCB3ZSBkb24ndCBoYXZlIGFuIGVsZW1lbnQgdG8gZm9jdXMgb24sXG4gICAgICAgICAgICAgICAgICAgIC8vIHdlIG11c3QgbW92ZSB0byB0aGUgbmV4dCByb3cgKGlmIHBvc3NpYmxlKVxuICAgICAgICAgICAgICAgICAgICBpZiAoIW5leHRFbGVtZW50ICYmIGNvbHVtbkluZCA9PT0gZ3JpZENvbHVtbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gSWYgdHJ5aW5nIHRvIHNlbGVjdCBhIHJvdywgd2hlbiB0aGVyZSBpcyBub25lOlxuICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3dJbmQgKyAxID09PSByb3dzU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9uTGFzdENlbGxUYWJQcmVzcyAmJiBlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5UQUIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25MYXN0Q2VsbFRhYlByZXNzKGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgY29sdW1uSW5kID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICByb3dJbmQgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgICBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Z2V0Q29sdW1uS2V5QnlJbmRleChjb2x1bW5JbmQpfV8ke3Jvd0luZH1gXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSBjYW5ub3QgZm9jdXMgb24gdGhlIG5leHQgZWxlbWVudCB3aGlsZSBtb3ZpbmcgdG8gdGhlIGxlZnRcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICghbmV4dEVsZW1lbnQgJiYgZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuTEVGVCkge1xuICAgICAgICAgICAgICAgIHdoaWxlIChjb2x1bW5JbmQgPiAwICYmICFuZXh0RWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kIC09IDE7XG4gICAgICAgICAgICAgICAgICBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Z2V0Q29sdW1uS2V5QnlJbmRleChjb2x1bW5JbmQpfV8ke3Jvd0luZH1gXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gaWYgbm8gZWxlbWVudCB3YXMgZm91bmQsIHRyeSBtb3ZpbmcgdG8gcHJldmlvdXMgcm93XG4gICAgICAgICAgICAgICAgLy8gKG5lZWRlZCBpbiBjYXNlIGZpcnN0IGNvbHVtbiBpcyBub3QgZWRpdGFibGUgZS5nLiBhbiBFeHRyYUNvbHVtbilcbiAgICAgICAgICAgICAgICBpZiAocm93SW5kID4gMCAmJiAhbmV4dEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCA9IGdyaWRDb2x1bW5zLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgICByb3dJbmQgLT0gMTtcbiAgICAgICAgICAgICAgICAgIG5leHRFbGVtZW50ID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtnZXRDb2x1bW5LZXlCeUluZGV4KGNvbHVtbkluZCl9XyR7cm93SW5kfWBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBkaXNhYmxlZCA9IG5leHRFbGVtZW50ID8gbmV4dEVsZW1lbnQuZGlzYWJsZWQgOiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZGlzYWJsZWQgJiYgbmV4dEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXh0RWxlbWVudC5zZWxlY3QgPT09ICdvYmplY3QnIHx8IG5leHRFbGVtZW50LnNlbGVjdFJlZikge1xuICAgICAgICAgICAgICAgIG5leHRFbGVtZW50ID0gdGhpcy5nZXRTZWxlY3RSZWYobmV4dEVsZW1lbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMubW92ZUNlbGxGb2N1cyhuZXh0RWxlbWVudCwgcm93SW5kLCBjb2x1bW5JbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBvbkVkaXRDZWxsS2V5RG93biA9IChyb3dJbmRleCwgY29sKSA9PiAoZSkgPT4ge1xuICAgIHRoaXMub25DZWxsS2V5RG93bihyb3dJbmRleCwgY29sLCBlKTtcbiAgfTtcblxuICBvbkNyZWF0ZUNlbGxLZXlEb3duID0gKHJvd0luZGV4LCBjb2wpID0+IChlKSA9PiB7XG4gICAgdGhpcy5vbkNlbGxLZXlEb3duKHJvd0luZGV4LCBjb2wsIGUsIHRydWUpO1xuICB9O1xuXG4gIG9uRmlsdGVyQ2VsbFZhbHVlQ2hhbmdlID0gKGNvbCwgdmFsdWVQYXJzZXIpID0+IChldmVudE9yRGF0YSkgPT4ge1xuICAgIGxldCByYXdWYWx1ZTtcbiAgICAvLyBldmVudE9yRGF0YSBjYW4gYmUgaW5wdXQgb25DaGFuZ2UgZXZlbnQsIHJlYWN0LXNlbGVjdCBvbkNoYW5nZSBvciByZWFjdC1kYXktcGlja2VyIG9uQ2hhbmdlXG4gICAgaWYgKGV2ZW50T3JEYXRhKSB7XG4gICAgICBpZiAoZXZlbnRPckRhdGEudGFyZ2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YS50YXJnZXQudmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50T3JEYXRhLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YS52YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGE7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlID0gdmFsdWVQYXJzZXIocmF3VmFsdWUpO1xuICAgIHRoaXMucHJvcHMuZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlKHRoaXMucHJvcHMuZ3JpZCwgdGhpcy5wcm9wcy5jb2x1bW5zLCBjb2wsIHZhbHVlKTtcbiAgfTtcblxuICBvbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGV2ZW50T3JEYXRhKSA9PiB7XG4gICAgbGV0IHJhd1ZhbHVlO1xuICAgIC8vIGV2ZW50T3JEYXRhIGNhbiBiZSBpbnB1dCBvbkNoYW5nZSBldmVudCwgcmVhY3Qtc2VsZWN0IG9uQ2hhbmdlIG9yIHJlYWN0LWRheS1waWNrZXIgb25DaGFuZ2VcbiAgICBpZiAoZXZlbnRPckRhdGEpIHtcbiAgICAgIGlmIChldmVudE9yRGF0YS50YXJnZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnRPckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSB2YWx1ZVBhcnNlcihyYXdWYWx1ZSk7XG5cbiAgICB0aGlzLnByb3BzLmNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIHJvd0luZGV4LCBjb2wudmFsdWVLZXlQYXRoLCB2YWx1ZSk7XG4gICAgaWYgKGNvbC5vbkNyZWF0ZVZhbHVlQ2hhbmdlKSB7XG4gICAgICBjb2wub25DcmVhdGVWYWx1ZUNoYW5nZSh2YWx1ZSwgY29sLnZhbHVlS2V5UGF0aCwgcm93SW5kZXgpO1xuICAgIH1cbiAgICBpZiAoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlICYmIHZhbHVlID09PSBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubWF0Y2hWYWx1ZSkge1xuICAgICAgLy8gQ2FsbCBzcGVjaWFsIHBhaXJlZCB2YWx1ZSBjaGFuZ2Ugb24gb3RoZXIgY2VsbCBpZiB2YWx1ZSBtYXRjaGVzXG4gICAgICB0aGlzLm9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlKFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgeyB2YWx1ZUtleVBhdGg6IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5uZXdWYWx1ZUtleVBhdGggfSxcbiAgICAgICAgdiA9PiB2LFxuICAgICAgKShjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY29sLnZhbGlkYXRvcnMpIHtcbiAgICAgIHRoaXMucHJvcHMuY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUoXG4gICAgICAgIHRoaXMucHJvcHMuZ3JpZCxcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIGNvbC52YWx1ZUtleVBhdGgsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBjb2wudmFsaWRhdG9ycyxcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIG9uRWRpdENlbGxWYWx1ZUNoYW5nZSA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGV2ZW50T3JEYXRhKSA9PiB7XG4gICAgY29uc3QgZGF0YUlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICBsZXQgcmF3VmFsdWU7XG4gICAgLy8gZXZlbnRPckRhdGEgY2FuIGJlIGlucHV0IG9uQ2hhbmdlIGV2ZW50LCByZWFjdC1zZWxlY3Qgb25DaGFuZ2Ugb3IgcmVhY3QtZGF5LXBpY2tlciBvbkNoYW5nZVxuICAgIGlmIChldmVudE9yRGF0YSkge1xuICAgICAgaWYgKGV2ZW50T3JEYXRhLnRhcmdldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChldmVudE9yRGF0YS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCB2YWx1ZSA9IHZhbHVlUGFyc2VyKHJhd1ZhbHVlKTtcbiAgICB0aGlzLnByb3BzLmVkaXRDZWxsVmFsdWVDaGFuZ2UodGhpcy5wcm9wcy5ncmlkLCBkYXRhSWQsIGNvbC52YWx1ZUtleVBhdGgsIHZhbHVlKTtcbiAgICBpZiAoY29sLm9uRWRpdFZhbHVlQ2hhbmdlKSB7XG4gICAgICBjb2wub25FZGl0VmFsdWVDaGFuZ2UodmFsdWUsIGNvbC52YWx1ZUtleVBhdGgsIHJvd0luZGV4LCBkYXRhSWQpO1xuICAgIH1cbiAgICBpZiAoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlICYmIHZhbHVlID09PSBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubWF0Y2hWYWx1ZSkge1xuICAgICAgLy8gQ2FsbCBzcGVjaWFsIHBhaXJlZCB2YWx1ZSBjaGFuZ2Ugb24gb3RoZXIgY2VsbCBpZiB2YWx1ZSBtYXRjaGVzXG4gICAgICB0aGlzLm9uRWRpdENlbGxWYWx1ZUNoYW5nZShcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIHsgdmFsdWVLZXlQYXRoOiBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWVLZXlQYXRoIH0sXG4gICAgICAgIHYgPT4gdixcbiAgICAgICkoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm5ld1ZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNvbC52YWxpZGF0b3JzKSB7XG4gICAgICB0aGlzLnByb3BzLmVkaXRDZWxsVmFsdWVWYWxpZGF0ZShcbiAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICBkYXRhSWQsXG4gICAgICAgIGNvbC52YWx1ZUtleVBhdGgsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBjb2wudmFsaWRhdG9ycyxcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIG9uQ3JlYXRlQ2VsbEJsdXIgPSAocm93SW5kZXgsIGNvbCwgdmFsdWVQYXJzZXIpID0+IChlKSA9PiB7XG4gICAgaWYgKGNvbC5vbkNyZWF0ZUJsdXIpIHtcbiAgICAgIGxldCB2YWx1ZSA9IGUgJiYgZS50YXJnZXQgJiYgZS50YXJnZXQudmFsdWUgIT09IHVuZGVmaW5lZFxuICAgICAgICA/IGUudGFyZ2V0LnZhbHVlXG4gICAgICAgIDogdGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpO1xuICAgICAgaWYgKHZhbHVlUGFyc2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZVBhcnNlcih2YWx1ZSk7XG4gICAgICB9XG4gICAgICBjb2wub25DcmVhdGVCbHVyKHZhbHVlLCByb3dJbmRleCk7XG4gICAgfVxuICB9O1xuXG4gIG9uRWRpdENlbGxCbHVyID0gKHJvd0luZGV4LCBjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZSkgPT4ge1xuICAgIGlmIChjb2wub25FZGl0Qmx1cikge1xuICAgICAgbGV0IHZhbHVlID0gZSAmJiBlLnRhcmdldCAmJiBlLnRhcmdldC52YWx1ZSAhPT0gdW5kZWZpbmVkXG4gICAgICAgID8gZS50YXJnZXQudmFsdWVcbiAgICAgICAgOiB0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCk7XG4gICAgICBpZiAodmFsdWVQYXJzZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlUGFyc2VyKHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGRhdGFJZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgICBjb2wub25FZGl0Qmx1cih2YWx1ZSwgcm93SW5kZXgsIGRhdGFJZCk7XG4gICAgfVxuICB9O1xuXG4gIG9uQ2VsbEZvY3VzID0gKGNlbGxUeXBlLCBpbnB1dFR5cGUsIHJvd0luZGV4LCBjb2x1bW5LZXkpID0+IChlKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgY2VsbFNlbGVjdGlvbkNoYW5nZSwgY2VsbFNlbGVjdCwgZ3JpZCwgaXNFZGl0aW5nLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChpc0VkaXRpbmcpIHJldHVybjtcblxuICAgIGlmIChpbnB1dFR5cGUgPT09ICdudW1iZXInKSB7XG4gICAgICBlLnRhcmdldC5zZWxlY3QoKTtcbiAgICB9XG4gICAgaWYgKGNlbGxUeXBlID09PSAnZWRpdCcgJiYgY2VsbFNlbGVjdCkge1xuICAgICAgY2VsbFNlbGVjdGlvbkNoYW5nZShcbiAgICAgICAgZ3JpZCxcbiAgICAgICAgTWFwKHtcbiAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICBjb2x1bW5LZXksXG4gICAgICAgIH0pLFxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgZ2V0U2VsZWN0UmVmID0gKGNvbXBvbmVudCkgPT4ge1xuICAgIGlmICghY29tcG9uZW50KSByZXR1cm4gbnVsbDtcbiAgICBpZiAoY29tcG9uZW50LnNlbGVjdCAmJiBjb21wb25lbnQuc2VsZWN0LmlucHV0UmVmKSB7XG4gICAgICByZXR1cm4gY29tcG9uZW50LnNlbGVjdC5pbnB1dFJlZjtcbiAgICB9XG4gICAgaWYgKGNvbXBvbmVudC5zZWxlY3QgJiYgY29tcG9uZW50LnNlbGVjdC5zZWxlY3QpIHtcbiAgICAgIHJldHVybiBjb21wb25lbnQuc2VsZWN0LnNlbGVjdC5pbnB1dFJlZjtcbiAgICB9XG4gICAgaWYgKGNvbXBvbmVudC5zZWxlY3RSZWYgJiYgY29tcG9uZW50LnNlbGVjdFJlZi5zZWxlY3Quc2VsZWN0KSB7XG4gICAgICByZXR1cm4gY29tcG9uZW50LnNlbGVjdFJlZi5zZWxlY3Quc2VsZWN0LmlucHV0UmVmO1xuICAgIH1cbiAgICByZXR1cm4gY29tcG9uZW50LnNlbGVjdFJlZi5zZWxlY3QuaW5wdXRSZWY7XG4gIH07XG5cbiAgZ2V0RGF0YUlkQnlSb3dJbmRleCA9IHJvd0luZGV4ID0+IHRoaXMucHJvcHMuZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLnRoaXMucHJvcHMuZ3JpZC5pZEtleVBhdGhdKTtcblxuICBnZXRTZWxlY3RlZEl0ZW1JbmRleCA9IChpZCkgPT4ge1xuICAgIGlmICghaWQpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnByb3BzLmRhdGEuZmluZEluZGV4KHYgPT4gdi5nZXRJbih0aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoKSA9PT0gaWQpO1xuICAgIHJldHVybiBpbmRleCA9PT0gLTEgPyB1bmRlZmluZWQgOiBpbmRleDtcbiAgfTtcblxuICBnZXRFZGl0SXRlbVZhbHVlID0gKHJvd0luZGV4LCBjb2wsIG9wdGlvbnMgPSBbXSkgPT4ge1xuICAgIC8vIEdldCB0aGUgdmFsdWUgdG8gZGlzcGxheSBpbiBlZGl0IGNlbGxcbiAgICBjb25zdCBpZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgY29uc3QgZWRpdFZhbHVlID0gdGhpcy5wcm9wcy5lZGl0RGF0YS5nZXRJbihbaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdLCB1bmRlZmluZWQpO1xuICAgIGxldCBvcmlnaW5hbFZhbHVlO1xuICAgIGlmIChlZGl0VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgb3JpZ2luYWxWYWx1ZSA9IHRoaXMucHJvcHMuZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdLCAnJyk7XG4gICAgfSBlbHNlIGlmIChlZGl0VmFsdWUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVmFsdWUgaXMgZm91bmQgZnJvbSBlZGl0RGF0YVxuICAgICAgLy8gRm9ybWF0IGJ5IHR5cGVcbiAgICAgIHN3aXRjaCAoY29sLmNvbXBvbmVudFR5cGUpIHtcbiAgICAgICAgY2FzZSAnbXVsdGlzZWxlY3QnOlxuICAgICAgICBjYXNlICdzZWxlY3QnOlxuICAgICAgICAgIHJldHVybiBvcHRpb25zLnNlbGVjdE9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSBlZGl0VmFsdWUpO1xuICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgICByZXR1cm4gb3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IGVkaXRWYWx1ZSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuIGVkaXRWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG9yaWdpbmFsVmFsdWUgPT09IG51bGwgfHwgb3JpZ2luYWxWYWx1ZSA9PT0gdW5kZWZpbmVkIHx8IG9yaWdpbmFsVmFsdWUgPT09ICcnKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIC8vIFJldHVybiB2YWx1ZSBmcm9tIG9yaWdpbmFsIGRhdGEsIGJlY2F1c2UgZWRpdERhdGEgaXMgbm90IGF2YWlsYWJsZVxuICAgIC8vIEZvcm1hdCBieSBjb21wb25lbnQgdHlwZVxuICAgIHN3aXRjaCAoY29sLmNvbXBvbmVudFR5cGUpIHtcbiAgICAgIGNhc2UgJ2Zsb2F0Jzoge1xuICAgICAgICBpZiAoU3RyaW5nKG9yaWdpbmFsVmFsdWUpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZXR1cm4gU3RyaW5nKG9yaWdpbmFsVmFsdWUpLnJlcGxhY2UoJy4nLCB0aGlzLnByb3BzLmRlY2ltYWxTZXBhcmF0b3IpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvcmlnaW5hbFZhbHVlO1xuICAgICAgfVxuICAgICAgY2FzZSAnbXVsdGlzZWxlY3QnOlxuICAgICAgY2FzZSAnc2VsZWN0JzpcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuc2VsZWN0T3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IG9yaWdpbmFsVmFsdWUpO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIHJldHVybiBvcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gb3JpZ2luYWxWYWx1ZSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gb3JpZ2luYWxWYWx1ZTtcbiAgICB9XG4gIH07XG5cbiAgZ2V0Q3JlYXRlSXRlbVZhbHVlID0gKHJvd0luZGV4LCBjb2wsIG9wdGlvbnMgPSBbXSkgPT4ge1xuICAgIGNvbnN0IHZhbCA9IHRoaXMucHJvcHMuY3JlYXRlRGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdLCAnJyk7XG4gICAgaWYgKHZhbCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBpZiAoY29sLmNvbXBvbmVudFR5cGUgPT09ICdzZWxlY3QnIHx8IGNvbC5jb21wb25lbnRUeXBlID09PSAnbXVsdGlzZWxlY3QnKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5zZWxlY3RPcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gdmFsKTtcbiAgICB9XG4gICAgaWYgKFsnYm9vbGVhbiddLmluY2x1ZGVzKGNvbC5jb21wb25lbnRUeXBlKSkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSB2YWwpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsO1xuICB9O1xuXG4gIGdldEZpbHRlckl0ZW1WYWx1ZSA9IChjb2wsIG9wdGlvbnMgPSBbXSkgPT4ge1xuICAgIGNvbnN0IHZhbCA9IHRoaXMucHJvcHMuZmlsdGVyRGF0YS5nZXQoVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCksICcnKTtcbiAgICBpZiAodmFsID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGlmIChjb2wuY29tcG9uZW50VHlwZSA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLnNlbGVjdE9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSB2YWwpO1xuICAgIH1cbiAgICBpZiAoWydjaGVja2JveCcsICdib29sZWFuJ10uaW5jbHVkZXMoY29sLmNvbXBvbmVudFR5cGUpKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IHZhbCk7XG4gICAgfVxuICAgIGlmIChjb2wuY29tcG9uZW50VHlwZSA9PT0gJ211bHRpc2VsZWN0Jykge1xuICAgICAgLy8gc2Vzc2lvbiBzdG9yYWdlIGNvbnRlbnQgaXMgY29udmVydGVkIHRvIGltbXV0YWJsZSBhbmQgbXVsdGlzZWxlY3RcbiAgICAgIC8vIGZpbHRlcnMgaXMgdGhlbiBsaXN0IG90aGVyd2lzZSBhcnJheVxuICAgICAgcmV0dXJuIHZhbCAmJiB2YWwudG9KUyA/IHZhbC50b0pTKCkgOiB2YWwgfHwgW107XG4gICAgfVxuICAgIHJldHVybiB2YWw7XG4gIH07XG5cbiAgZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZSA9IChyb3dJbmRleCwgY29sLCBtb2RlKSA9PiB7XG4gICAgbGV0IGNvbXBvbmVudERpc2FibGVkID0gISFjb2wuZGlzYWJsZUVkaXRpbmc7XG4gICAgLy8gY2hlY2sgaWYgY29tcG9uZW50IGlzIGRpc2FibGVkIGJ5IG90aGVyIGNvbHVtbiBkYXRhXG4gICAgaWYgKCFjb21wb25lbnREaXNhYmxlZCAmJiBjb2wuZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2gpIHtcbiAgICAgIGlmIChtb2RlID09PSAnY3JlYXRlJykge1xuICAgICAgICBjb21wb25lbnREaXNhYmxlZCA9IHRoaXMuZ2V0Q3JlYXRlSXRlbVZhbHVlKHJvd0luZGV4LCB7XG4gICAgICAgICAgdmFsdWVLZXlQYXRoOiBjb2wuZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2gubWF0Y2hWYWx1ZUtleVBhdGgsXG4gICAgICAgIH0pID09PSBjb2wuZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2gubWF0Y2hWYWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbXBvbmVudERpc2FibGVkID0gdGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCB7XG4gICAgICAgICAgdmFsdWVLZXlQYXRoOiBjb2wuZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2gubWF0Y2hWYWx1ZUtleVBhdGgsXG4gICAgICAgIH0pID09PSBjb2wuZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2gubWF0Y2hWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvbXBvbmVudERpc2FibGVkO1xuICB9O1xuXG4gIGdldFJvd0NsYXNzTmFtZSA9IChyb3dJbmRleCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGdyaWQsIGlzQ3JlYXRpbmcsIGlzRWRpdGluZywgY3JlYXRlRGF0YSwgc2VsZWN0ZWRJdGVtcywgZGF0YSxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCByb3dDbGFzc05hbWVzID0gWydvYy1kYXRhZ3JpZC1yb3cnXTtcbiAgICBsZXQgZXh0cmFSb3dDb3VudCA9IDA7IC8vIGhvdyBtYW55IHJvd3MgdG8gaWdub3JlIGZyb20gdG9wLCBuZXcgKyBmaWx0ZXIgcm93c1xuICAgIGlmIChpc0NyZWF0aW5nKSBleHRyYVJvd0NvdW50ID0gY3JlYXRlRGF0YS5zaXplO1xuICAgIGlmIChpc0NyZWF0aW5nKSB7XG4gICAgICBpZiAocm93SW5kZXggPD0gZXh0cmFSb3dDb3VudCAtIDEpIHtcbiAgICAgICAgcm93Q2xhc3NOYW1lcy5wdXNoKCdvYy1kYXRhZ3JpZC1yb3ctbmV3Jyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc0VkaXRpbmcpIHtcbiAgICAgIHJvd0NsYXNzTmFtZXMucHVzaCgnb2MtZGF0YWdyaWQtcm93LWVkaXQnKTtcbiAgICB9XG5cbiAgICAvLyBjaGVjayBpZiByb3cgaXMgc2VsZWN0ZWRcbiAgICBpZiAoIWlzQ3JlYXRpbmcgJiYgIWlzRWRpdGluZyAmJiAoc2VsZWN0ZWRJdGVtcyAmJiBncmlkLmlkS2V5UGF0aCkpIHtcbiAgICAgIGlmIChzZWxlY3RlZEl0ZW1zLmluZGV4T2YoZGF0YS5nZXRJbihbcm93SW5kZXggLSBleHRyYVJvd0NvdW50LCAuLi5ncmlkLmlkS2V5UGF0aF0pKSAhPT0gLTEpIHtcbiAgICAgICAgcm93Q2xhc3NOYW1lcy5wdXNoKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLnJvd0NsYXNzTmFtZUdldHRlcikge1xuICAgICAgcmV0dXJuIHJvd0NsYXNzTmFtZXMuam9pbignICcpICsgJyAnICsgdGhpcy5wcm9wcy5yb3dDbGFzc05hbWVHZXR0ZXIocm93SW5kZXgpO1xuICAgIH1cbiAgICByZXR1cm4gcm93Q2xhc3NOYW1lcy5qb2luKCcgJyk7XG4gIH07XG5cbiAgZ2V0Q2VsbE1lc3NhZ2VzID0gKHJvd0luZGV4LCBjb2wsIGNlbGxUeXBlKSA9PiB7XG4gICAgY29uc3QgcmV0dXJuRGF0YSA9IHt9O1xuICAgIGlmICghdGhpcy5wcm9wcy5ncmlkLmlkS2V5UGF0aCB8fCAhY29sLnZhbHVlS2V5UGF0aCkge1xuICAgICAgcmV0dXJuIHJldHVybkRhdGE7XG4gICAgfVxuICAgIGxldCBpbmZvTWVzc2FnZTtcbiAgICBsZXQgZXJyb3JNZXNzYWdlO1xuICAgIGxldCB3YXJuaW5nTWVzc2FnZTtcbiAgICBpZiAoY2VsbFR5cGUgPT09ICdjcmVhdGUnKSB7XG4gICAgICBpbmZvTWVzc2FnZSA9IHRoaXMucHJvcHMuY3JlYXRlQ2VsbE1lc3NhZ2VzLmdldEluKFsnaW5mbycsIHJvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgICBlcnJvck1lc3NhZ2UgPSB0aGlzLnByb3BzLmNyZWF0ZUNlbGxNZXNzYWdlcy5nZXRJbihbJ2Vycm9yJywgcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgIHdhcm5pbmdNZXNzYWdlID0gdGhpcy5wcm9wcy5jcmVhdGVDZWxsTWVzc2FnZXMuZ2V0SW4oW1xuICAgICAgICAnd2FybmluZycsXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICAuLi5jb2wudmFsdWVLZXlQYXRoLFxuICAgICAgXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICAgIGluZm9NZXNzYWdlID0gdGhpcy5wcm9wcy5jZWxsTWVzc2FnZXMuZ2V0SW4oWydpbmZvJywgaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgIGVycm9yTWVzc2FnZSA9IHRoaXMucHJvcHMuY2VsbE1lc3NhZ2VzLmdldEluKFsnZXJyb3InLCBpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgd2FybmluZ01lc3NhZ2UgPSB0aGlzLnByb3BzLmNlbGxNZXNzYWdlcy5nZXRJbihbJ3dhcm5pbmcnLCBpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgIH1cbiAgICBpZiAoaW5mb01lc3NhZ2UpIHtcbiAgICAgIHJldHVybkRhdGEuaW5mb01lc3NhZ2UgPSBpbmZvTWVzc2FnZTtcbiAgICB9XG4gICAgaWYgKGVycm9yTWVzc2FnZSkge1xuICAgICAgcmV0dXJuRGF0YS5lcnJvck1lc3NhZ2UgPSBlcnJvck1lc3NhZ2U7XG4gICAgfVxuICAgIGlmICh3YXJuaW5nTWVzc2FnZSkge1xuICAgICAgcmV0dXJuRGF0YS53YXJuaW5nTWVzc2FnZSA9IHdhcm5pbmdNZXNzYWdlO1xuICAgIH1cbiAgICByZXR1cm4gcmV0dXJuRGF0YTtcbiAgfTtcblxuICBnZXRTY3JvbGxUb1JvdyA9ICgpID0+IHtcbiAgICBsZXQgc2Nyb2xsVG9Sb3c7XG4gICAgaWYgKHRoaXMucHJvcHMuaXNDcmVhdGluZyAmJiAhdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCkgcmV0dXJuIHNjcm9sbFRvUm93O1xuICAgIGlmICh0aGlzLmZvY3VzVG9DcmVhdGVDZWxsKSB7XG4gICAgICBjb25zdCBzY3JvbGxOZXdSb3cgPSB0aGlzLnByb3BzLmNyZWF0ZURhdGEuc2l6ZSAtIDE7XG4gICAgICBpZiAoc2Nyb2xsTmV3Um93ID49IDApIHtcbiAgICAgICAgc2Nyb2xsVG9Sb3cgPSBzY3JvbGxOZXdSb3c7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLmlzRWRpdGluZyAmJiAhdGhpcy5wcm9wcy5zY3JvbGxJbkVkaXRNb2RlKSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gdGhpcy5zdGF0ZS5jdXJyZW50Um93O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2Nyb2xsVG9Sb3cgPSB0aGlzLnByb3BzLnNjcm9sbFRvUm93OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICB9XG4gICAgICBpZiAoc2Nyb2xsVG9Sb3cgPT09IHVuZGVmaW5lZCAmJiB0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuc2l6ZSA+IDApIHtcbiAgICAgICAgc2Nyb2xsVG9Sb3cgPSB0aGlzLmdldFNlbGVjdGVkSXRlbUluZGV4KHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5maXJzdCgpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNjcm9sbFRvUm93O1xuICB9O1xuXG4gIHNldEZvY3VzVG8gPSAoZm9jdXNUbykgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmlzRWRpdGluZyB8fCB0aGlzLnByb3BzLmlzQ3JlYXRpbmcpIHtcbiAgICAgIGlmIChmb2N1c1RvICYmIGZvY3VzVG8uZ2V0KCd0eXBlJykgJiYgZm9jdXNUbyAhPT0gdGhpcy5wcmV2Rm9jdXNUbykge1xuICAgICAgICB0aGlzW2ZvY3VzVG8uZ2V0KCd0eXBlJyldID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5mb2N1c1RvTGFzdFJvdyA9IGZvY3VzVG8uZ2V0KCdmb2N1c1RvTGFzdFJvdycpO1xuICAgICAgICB0aGlzLnByZXZGb2N1c1RvID0gZm9jdXNUbztcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlQ2VsbFNlbGVjdCA9IChjZWxsVHlwZSwgcm93SW5kZXgsIGNvbHVtbktleSkgPT4gKCkgPT4ge1xuICAgIGlmIChjZWxsVHlwZSA9PT0gJ3ZpZXcnICYmIHRoaXMucHJvcHMuY2VsbFNlbGVjdCkge1xuICAgICAgdGhpcy5wcm9wcy5jZWxsU2VsZWN0aW9uQ2hhbmdlKFxuICAgICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICAgIE1hcCh7XG4gICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgY29sdW1uS2V5LFxuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZUNyZWF0ZUNlbGxSZWYgPSAocm93SW5kZXgsIGNvbCkgPT4gKHJlZikgPT4ge1xuICAgIC8vIEZvY3VzIHRvIGNyZWF0ZSBjZWxsXG4gICAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCk7XG4gICAgY29uc3Qgc2VsZWN0UmVmID0gIXJlZiB8fCByZWYuZm9jdXMgPyByZWYgOiB0aGlzLmdldFNlbGVjdFJlZihyZWYpO1xuICAgIGlmIChcbiAgICAgIHRoaXMucHJvcHMuY3JlYXRlRGF0YS5zaXplXG4gICAgICAmJiB0aGlzLnByb3BzLmNyZWF0ZURhdGEuc2l6ZSA9PT0gcm93SW5kZXggKyAxXG4gICAgICAmJiB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsXG4gICAgICAmJiAhdGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdjcmVhdGUnKVxuICAgICAgJiYgc2VsZWN0UmVmXG4gICAgKSB7XG4gICAgICBzZWxlY3RSZWYuZm9jdXMoKTtcbiAgICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wcm9wcy5lbmFibGVBcnJvd05hdmlnYXRpb24pIHtcbiAgICAgIHRoaXMuY3JlYXRlQ2VsbFJlZnNbYCR7dGhpcy5wcm9wcy5ncmlkLmlkfV8ke2NvbHVtbktleX1fJHtyb3dJbmRleH1gXSA9IHJlZjtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlRWRpdENlbGxSZWYgPSAocm93SW5kZXgsIGNvbCkgPT4gKHJlZikgPT4ge1xuICAgIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2wpO1xuICAgIGlmICh0aGlzLmZvY3VzVG9FZGl0Q2VsbCAmJiAhdGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdlZGl0JykpIHtcbiAgICAgIGNvbnN0IHNlbGVjdGVkUm93SW5kZXggPSB0aGlzLmZvY3VzVG9MYXN0Um93ICYmIHRoaXMucHJvcHMuZGF0YS5zaXplID4gMFxuICAgICAgICA/IHRoaXMucHJvcHMuZGF0YS5zaXplIC0gMVxuICAgICAgICA6IHRoaXMuZ2V0U2VsZWN0ZWRJdGVtSW5kZXgodGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLmZpcnN0KCkpO1xuXG4gICAgICBjb25zdCB7IHNlbGVjdGVkQ2VsbCB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IHNlbGVjdFJlZiA9ICFyZWYgfHwgcmVmLmZvY3VzID8gcmVmIDogdGhpcy5nZXRTZWxlY3RSZWYocmVmKTtcbiAgICAgIGlmIChzZWxlY3RlZENlbGwuc2l6ZSA+IDApIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHNlbGVjdGVkQ2VsbC5nZXQoJ3Jvd0luZGV4JykgPT09IHJvd0luZGV4XG4gICAgICAgICAgJiYgc2VsZWN0ZWRDZWxsLmdldCgnY29sdW1uS2V5JykgPT09IGNvbHVtbktleVxuICAgICAgICAgICYmIHNlbGVjdFJlZlxuICAgICAgICApIHtcbiAgICAgICAgICBzZWxlY3RSZWYuZm9jdXMoKTtcbiAgICAgICAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuZm9jdXNUb0xhc3RSb3cgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzZWxlY3RlZFJvd0luZGV4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mb2N1c1RvTGFzdFJvdyA9IGZhbHNlO1xuICAgICAgfSBlbHNlIGlmIChzZWxlY3RlZFJvd0luZGV4ID09PSByb3dJbmRleCAmJiBzZWxlY3RSZWYpIHtcbiAgICAgICAgc2VsZWN0UmVmLmZvY3VzKCk7XG4gICAgICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZm9jdXNUb0xhc3RSb3cgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuZW5hYmxlQXJyb3dOYXZpZ2F0aW9uKSB7XG4gICAgICB0aGlzLmNlbGxSZWZzW2Ake3RoaXMucHJvcHMuZ3JpZC5pZH1fJHtjb2x1bW5LZXl9XyR7cm93SW5kZXh9YF0gPSByZWY7XG4gICAgfVxuICB9O1xuXG4gIG1vdmVDZWxsRm9jdXMgPSAobmV4dEVsZW1lbnQsIHJvd0luZGV4LCBjb2x1bW5JbmRleCkgPT4ge1xuICAgIGNvbnN0IGVsZW1lbnRUeXBlcyA9IFsndGV4dCcsICdjaGVja2JveCddO1xuICAgIGlmIChuZXh0RWxlbWVudCAmJiBlbGVtZW50VHlwZXMuaW5jbHVkZXMobmV4dEVsZW1lbnQudHlwZSkpIHtcbiAgICAgIGlmIChyb3dJbmRleCAhPT0gLTEgfHwgY29sdW1uSW5kZXggIT09IC0xKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIGN1cnJlbnRDb2x1bW46IGNvbHVtbkluZGV4LFxuICAgICAgICAgIGN1cnJlbnRSb3c6IHJvd0luZGV4LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAobmV4dEVsZW1lbnQudHlwZSA9PT0gJ2NoZWNrYm94JykgbmV4dEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgaWYgKG5leHRFbGVtZW50LnR5cGUgPT09ICd0ZXh0JykgbmV4dEVsZW1lbnQuc2VsZWN0KCk7XG4gICAgICB9LCA1MCk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZVNlbGVjdEFsbENoZWNrQm94T25DaGFuZ2UgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5zZWxlY3RBbGxJdGVtc0NoYW5nZSh0aGlzLnByb3BzLmdyaWQpO1xuICB9O1xuXG4gIGhhbmRsZVNlbGVjdGlvbkNoZWNrQm94T25DaGFuZ2UgPSByb3dJbmRleCA9PiAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5pdGVtU2VsZWN0aW9uQ2hhbmdlKHRoaXMucHJvcHMuZ3JpZCwgcm93SW5kZXgsIHRydWUsIGZhbHNlKTtcbiAgfTtcblxuICBnZW5lcmF0ZUNvbHVtbnMgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGF0YSxcbiAgICAgIHNlbGVjdGVkSXRlbXMsXG4gICAgICBkYXRlRm9ybWF0LFxuICAgICAgdGhvdXNhbmRTZXBhcmF0b3IsXG4gICAgICBkZWNpbWFsU2VwYXJhdG9yLFxuICAgICAgZ3JpZCxcbiAgICAgIGlubGluZUVkaXQsXG4gICAgICBmaWx0ZXJpbmcsXG4gICAgICByZWdpb24sXG4gICAgICBpbnRsLFxuICAgICAgc2VsZWN0Q29tcG9uZW50T3B0aW9ucyxcbiAgICAgIGlzQ3JlYXRpbmcsXG4gICAgICBleHRyYUNvbHVtbixcbiAgICAgIHJvd1NlbGVjdENoZWNrYm94Q29sdW1uLFxuICAgICAgc2hvd1NlbGVjdEFsbENoZWNrYm94LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgY29sdW1ucyA9IFtdO1xuICAgIGNvbnN0IHRhYkluZGV4ID0gU3RyaW5nKHRoaXMucHJvcHMudGFiSW5kZXgpO1xuICAgIGlmIChleHRyYUNvbHVtbikge1xuICAgICAgY29sdW1ucy5wdXNoKHtcbiAgICAgICAgd2lkdGg6IGV4dHJhQ29sdW1uLndpZHRoIHx8IDQwLFxuICAgICAgICBpc1Jlc2l6YWJsZTogISFleHRyYUNvbHVtbi5pc1Jlc2l6YWJsZSxcbiAgICAgICAgaXNTb3J0YWJsZTogZmFsc2UsXG4gICAgICAgIGNvbHVtbktleTogJ2V4dHJhQ29sdW1uJyxcbiAgICAgICAgY2VsbDogcm93SW5kZXggPT4gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtZXh0cmEtY29sdW1uLWNlbGwgbm8tcm93LXNlbGVjdFwiPlxuICAgICAgICAgICAge2V4dHJhQ29sdW1uLnZhbHVlUmVuZGVyKGRhdGEuZ2V0KHJvd0luZGV4KSwgdGFiSW5kZXgpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApLFxuICAgICAgICBjZWxsRWRpdDogcm93SW5kZXggPT4gKGV4dHJhQ29sdW1uLmNlbGxFZGl0ID8gZXh0cmFDb2x1bW4uY2VsbEVkaXQocm93SW5kZXgpIDogbnVsbCksXG4gICAgICAgIGNlbGxDcmVhdGU6IHJvd0luZGV4ID0+IChleHRyYUNvbHVtbi5jZWxsQ3JlYXRlID8gZXh0cmFDb2x1bW4uY2VsbENyZWF0ZShyb3dJbmRleCkgOiBudWxsKSxcbiAgICAgICAgY2VsbEZpbHRlcjogcm93SW5kZXggPT4gKGV4dHJhQ29sdW1uLmNlbGxGaWx0ZXIgPyBleHRyYUNvbHVtbi5jZWxsRmlsdGVyKHJvd0luZGV4KSA6IG51bGwpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHJvd1NlbGVjdENoZWNrYm94Q29sdW1uKSB7XG4gICAgICBjb2x1bW5zLnB1c2goe1xuICAgICAgICB3aWR0aDogNDAsXG4gICAgICAgIGlzUmVzaXphYmxlOiBmYWxzZSxcbiAgICAgICAgaXNTb3J0YWJsZTogZmFsc2UsXG4gICAgICAgIGNvbHVtbktleTogJ3NlbGVjdGlvbkNoZWNrYm94JyxcbiAgICAgICAgaGVhZGVyOiBzaG93U2VsZWN0QWxsQ2hlY2tib3ggJiYgKFxuICAgICAgICAgIDxDaGVja2JveFxuICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkU2VsZWN0QWxsQ2hlY2tCb3gtJHtncmlkLmlkfWB9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1zZWxlY3QtYWxsLWNoZWNrYm94LWNlbGwgbm8tcm93LXNlbGVjdFwiXG4gICAgICAgICAgICBjaGVja2VkPXtkYXRhLnNpemUgIT09IDAgJiYgZGF0YS5zaXplID09PSBzZWxlY3RlZEl0ZW1zLnNpemV9XG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVTZWxlY3RBbGxDaGVja0JveE9uQ2hhbmdlfVxuICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgIC8+XG4gICAgICAgICksXG4gICAgICAgIGNlbGw6IChyb3dJbmRleCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHJvd0l0ZW0gPSBkYXRhLmdldChyb3dJbmRleCk7XG4gICAgICAgICAgY29uc3QgaXRlbUlkID0gcm93SXRlbS5nZXRJbihncmlkLmlkS2V5UGF0aCk7XG4gICAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSBzZWxlY3RlZEl0ZW1zLmluY2x1ZGVzKGl0ZW1JZCk7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxDaGVja2JveFxuICAgICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRTZWxlY3RDaGVja0JveC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtyb3dJbmRleH1gfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1zZWxlY3QtY2hlY2tib3gtY2VsbCBuby1yb3ctc2VsZWN0XCJcbiAgICAgICAgICAgICAgY2hlY2tlZD17c2VsZWN0ZWR9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVNlbGVjdGlvbkNoZWNrQm94T25DaGFuZ2Uocm93SW5kZXgpfVxuICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIGNlbGxFZGl0OiAoKSA9PiBudWxsLFxuICAgICAgICBjZWxsQ3JlYXRlOiAoKSA9PiBudWxsLFxuICAgICAgICBjZWxsRmlsdGVyOiAoKSA9PiBudWxsLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgdmlzaWJsZUNvbHVtbnMgPSBbXTtcbiAgICB0aGlzLnByb3BzLnZpc2libGVDb2x1bW5zLmZvckVhY2goKHZpc2libGVDb2x1bW5LZXkpID0+IHtcbiAgICAgIHRoaXMucHJvcHMuY29sdW1ucy5mb3JFYWNoKChvcmdDb2wpID0+IHtcbiAgICAgICAgaWYgKFV0aWxzLmdldENvbHVtbktleShvcmdDb2wpID09PSB2aXNpYmxlQ29sdW1uS2V5KSB7XG4gICAgICAgICAgdmlzaWJsZUNvbHVtbnMucHVzaChvcmdDb2wpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICB2aXNpYmxlQ29sdW1ucy5mb3JFYWNoKChjb2wpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlRW1wdHlDaGVja2VyID0gVXRpbHMuZ2V0VmFsdWVFbXB0eUNoZWNrZXIoY29sKTtcbiAgICAgIC8vIENlbGwgdmFsdWUgcmVuZGVyaW5nXG4gICAgICBjb25zdCB2YWx1ZVJlbmRlciA9IChyb3dJbmRleCwgZm9ybWF0KSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbCA9IGRhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWwpKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbC5pc1JlcXVpcmVkID8gPE0gaWQ9XCJHcmlkLlZhbHVlSXNNaXNzaW5nXCIgLz4gOiAnJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZm9ybWF0ID8gZm9ybWF0KHZhbCkgOiB2YWw7XG4gICAgICB9O1xuXG4gICAgICBsZXQgY29sdW1uID0gR3JpZENvbHVtblNlcnZpY2UuYmFzZUNvbHVtbihjb2wpO1xuICAgICAgLy8gQ29sbGVjdCBjb2x1bW4gZnVuY3Rpb25zIGludG8gb25lIE9iamVjdFxuICAgICAgY29uc3QgY29sdW1uRnVuY3Rpb25zID0ge1xuICAgICAgICBlZGl0OiB7XG4gICAgICAgICAgZ2V0SXRlbVZhbHVlOiB0aGlzLmdldEVkaXRJdGVtVmFsdWUsXG4gICAgICAgICAgb25DZWxsVmFsdWVDaGFuZ2U6IHRoaXMub25FZGl0Q2VsbFZhbHVlQ2hhbmdlLFxuICAgICAgICAgIG9uQ2VsbEJsdXI6IHRoaXMub25FZGl0Q2VsbEJsdXIsXG4gICAgICAgICAgb25DZWxsRm9jdXM6IHRoaXMub25DZWxsRm9jdXMsXG4gICAgICAgICAgb25DZWxsS2V5RG93bjogdGhpcy5vbkVkaXRDZWxsS2V5RG93bixcbiAgICAgICAgICBoYW5kbGVDZWxsUmVmOiB0aGlzLmhhbmRsZUVkaXRDZWxsUmVmLFxuICAgICAgICB9LFxuICAgICAgICBjcmVhdGU6IHtcbiAgICAgICAgICBnZXRJdGVtVmFsdWU6IHRoaXMuZ2V0Q3JlYXRlSXRlbVZhbHVlLFxuICAgICAgICAgIG9uQ2VsbFZhbHVlQ2hhbmdlOiB0aGlzLm9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlLFxuICAgICAgICAgIG9uQ2VsbEJsdXI6IHRoaXMub25DcmVhdGVDZWxsQmx1cixcbiAgICAgICAgICBvbkNlbGxGb2N1czogdGhpcy5vbkNlbGxGb2N1cyxcbiAgICAgICAgICBvbkNlbGxLZXlEb3duOiB0aGlzLm9uQ3JlYXRlQ2VsbEtleURvd24sXG4gICAgICAgICAgaGFuZGxlQ2VsbFJlZjogdGhpcy5oYW5kbGVDcmVhdGVDZWxsUmVmLFxuICAgICAgICB9LFxuICAgICAgICBmaWx0ZXI6IHtcbiAgICAgICAgICBnZXRJdGVtVmFsdWU6IHRoaXMuZ2V0RmlsdGVySXRlbVZhbHVlLFxuICAgICAgICAgIG9uQ2VsbFZhbHVlQ2hhbmdlOiB0aGlzLm9uRmlsdGVyQ2VsbFZhbHVlQ2hhbmdlLFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgLy8gaGFuZGxlIGNvbHVtbi5jZWxsIC8gY29sdW1uLmNlbGxFZGl0IC8gY29sdW1uLmNlbGxDcmVhdGUgLyBjb2x1bW4uY2VsbEZpbHRlclxuICAgICAgY29uc3QgY2VsbFByb3BzID0ge1xuICAgICAgICBncmlkLFxuICAgICAgICBkYXRhLFxuICAgICAgICBkYXRlRm9ybWF0LFxuICAgICAgICB0aG91c2FuZFNlcGFyYXRvcixcbiAgICAgICAgZGVjaW1hbFNlcGFyYXRvcixcbiAgICAgICAgc2VsZWN0Q29tcG9uZW50T3B0aW9ucyxcbiAgICAgIH07IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIGNvbHVtbiA9IEdyaWRDb2x1bW5TZXJ2aWNlLmNvbHVtbkNlbGwoY29sdW1uLCBjZWxsUHJvcHMsIGNvbCwgdmFsdWVSZW5kZXIpO1xuXG4gICAgICAvLyBoYW5kbGUgY29sdW1uQ29tcG9uZW50VHlwZXNcbiAgICAgIGNvbnN0IGNvbXBvbmVudFR5cGVQcm9wcyA9IHtcbiAgICAgICAgLi4uY2VsbFByb3BzLFxuICAgICAgICBpbmxpbmVFZGl0LFxuICAgICAgICBmaWx0ZXJpbmcsXG4gICAgICAgIHJlZ2lvbixcbiAgICAgICAgaW50bCxcbiAgICAgICAgc2VsZWN0Q29tcG9uZW50T3B0aW9ucyxcbiAgICAgIH07IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIGNvbHVtbiA9IEdyaWRDb2x1bW5TZXJ2aWNlLmNvbHVtbkNvbXBvbmVudFR5cGUoXG4gICAgICAgIGNvbHVtbixcbiAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgIGNvbXBvbmVudFR5cGVQcm9wcyxcbiAgICAgICAgY29sLFxuICAgICAgICBjb2x1bW5GdW5jdGlvbnMsXG4gICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZSxcbiAgICAgICk7XG4gICAgICBjb2x1bW5zLnB1c2goY29sdW1uKTtcbiAgICB9KTtcblxuICAgIGlmIChpc0NyZWF0aW5nKSB7XG4gICAgICBjb2x1bW5zLnB1c2goe1xuICAgICAgICB3aWR0aDogMzcsXG4gICAgICAgIGlzUmVzaXphYmxlOiBmYWxzZSxcbiAgICAgICAgY29sdW1uS2V5OiAncmVtb3ZlTmV3SXRlbScsXG4gICAgICAgIGNlbGw6ICgpID0+IG51bGwsXG4gICAgICAgIGNlbGxFZGl0OiAoKSA9PiBudWxsLFxuICAgICAgICBjZWxsQ3JlYXRlOiByb3dJbmRleCA9PiAoXG4gICAgICAgICAgPEljb25cbiAgICAgICAgICAgIGlkPXtgb2MtZGF0YWdyaWQtbmV3LWl0ZW0tcmVtb3ZlLSR7Z3JpZC5pZH0tJHtyb3dJbmRleH1gfVxuICAgICAgICAgICAgdHlwZT1cImluZGljYXRvclwiXG4gICAgICAgICAgICBuYW1lPVwiZGVsZXRlXCJcbiAgICAgICAgICAgIHdpZHRoPXszMH1cbiAgICAgICAgICAgIGhlaWdodD17MzB9XG4gICAgICAgICAgICBzdHlsZT17eyBwYWRkaW5nOiAnN3B4JyB9fVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdGhpcy5wcm9wcy5yZW1vdmVOZXdJdGVtKGdyaWQsIHJvd0luZGV4KX1cbiAgICAgICAgICAvPlxuICAgICAgICApLFxuICAgICAgICBjZWxsRmlsdGVyOiAoKSA9PiBudWxsLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBjb2x1bW5zO1xuICB9O1xuXG4gIGlzQ2VsbEVkaXRlZCA9IChyb3dJbmRleCwgY29sLCBjZWxsVHlwZSkgPT4ge1xuICAgIGlmIChjZWxsVHlwZSAhPT0gJ2VkaXQnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICByZXR1cm4gISF0aGlzLnByb3BzLmVkaXREYXRhLmdldEluKFtpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICB9O1xuXG4gIGhhbmRsZUFmdGVyQWRkSXRlbSA9ICgpID0+IHtcbiAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsID0gdHJ1ZTtcbiAgfTtcblxuICBoYW5kbGVBZnRlckVkaXRQcmVzcyA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLnNpemUpIHtcbiAgICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gdHJ1ZTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjdXJyZW50Um93OiB1bmRlZmluZWQsXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlQWZ0ZXJWYWxpZGF0aW9uRXJyb3IgPSAoKSA9PiB7XG4gICAgdGhpcy5mb2N1c1RvRXJyb3JDZWxsID0gdHJ1ZTtcbiAgfTtcblxuICBoYW5kbGVSb3dDbGljayA9IChlLCByb3dJbmRleCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnJvd1NlbGVjdCAmJiAhdGhpcy5wcm9wcy5pc0NyZWF0aW5nICYmICF0aGlzLnByb3BzLmlzRWRpdGluZykge1xuICAgICAgaWYgKGUuY3RybEtleSB8fCBlLnNoaWZ0S2V5KSB7XG4gICAgICAgIGRvY3VtZW50LmdldFNlbGVjdGlvbigpLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgfVxuICAgICAgLy8gRG9uJ3QgdHJpZ2dlciBzZWxlY3Rpb24gY2hhbmdlIG9uIHdoZW4gdXNlciBjbGlja3Mgb24gc3BlY2lhbCBjZWxscyBsaWtlIGNoZWNrYm94L2V4dHJhXG4gICAgICAvLyBDaGVjayB0aGF0IGNsaWNrZWQgbm9kZSdzIHBhcmVudCBvciBwYXJlbnQncyBwYXJlbnQgZG9lc24ndCBoYXZlIG5vLXJvdy1zZWxlY3QgY2xhc3NcbiAgICAgIGNvbnN0IHsgcGFyZW50Tm9kZSB9ID0gZS50YXJnZXQ7XG4gICAgICBjb25zdCBwYXJlbnQxY2xhc3MgPSBwYXJlbnROb2RlLmNsYXNzTmFtZSAmJiBwYXJlbnROb2RlLmNsYXNzTmFtZS5pbmRleE9mID8gcGFyZW50Tm9kZS5jbGFzc05hbWUgOiAnJztcbiAgICAgIGNvbnN0IHBhcmVudDJjbGFzcyA9ICAgICAgICBwYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lICYmIHBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUuaW5kZXhPZiAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgID8gcGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZVxuICAgICAgICA6ICcnO1xuICAgICAgY29uc3QgcGFyZW50M2NsYXNzID0gcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgICYmIHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZS5pbmRleE9mIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgPyBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWVcbiAgICAgICAgOiAnJztcbiAgICAgIGNvbnN0IHBhcmVudDRjbGFzcyA9IHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgICYmIHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lLmluZGV4T2YgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICA/IHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgIDogJyc7XG4gICAgICBpZiAoXG4gICAgICAgIHBhcmVudDFjbGFzcy5pbmRleE9mKCduby1yb3ctc2VsZWN0JykgPT09IC0xXG4gICAgICAgICYmIHBhcmVudDJjbGFzcy5pbmRleE9mKCduby1yb3ctc2VsZWN0JykgPT09IC0xXG4gICAgICAgICYmIHBhcmVudDNjbGFzcy5pbmRleE9mKCduby1yb3ctc2VsZWN0JykgPT09IC0xXG4gICAgICAgICYmIHBhcmVudDRjbGFzcy5pbmRleE9mKCduby1yb3ctc2VsZWN0JykgPT09IC0xXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5wcm9wcy5pdGVtU2VsZWN0aW9uQ2hhbmdlKFxuICAgICAgICAgIHRoaXMucHJvcHMuZ3JpZCxcbiAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICB0aGlzLnByb3BzLm11bHRpU2VsZWN0ICYmIGUuY3RybEtleSxcbiAgICAgICAgICB0aGlzLnByb3BzLm11bHRpU2VsZWN0ICYmIGUuc2hpZnRLZXksXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLm9uUm93Q2xpY2spIHtcbiAgICAgIHRoaXMucHJvcHMub25Sb3dDbGljayhlLCByb3dJbmRleCwgdGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCkpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBoYW5kbGVDb250ZXh0TWVudSA9IChlLCByb3dJbmRleCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmNvbnRleHRNZW51SXRlbXMpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgaXRlbVNlbGVjdGlvbkNoYW5nZSwgc2VsZWN0ZWRJdGVtcywgZ3JpZCwgZGF0YSxcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjb250ZXh0TWVudU9wZW46IHRydWUsXG4gICAgICAgIGNvbnRleHRNZW51WDogZS5jbGllbnRYLFxuICAgICAgICBjb250ZXh0TWVudVk6IGUuY2xpZW50WSxcbiAgICAgIH0pO1xuICAgICAgLy8gSWYgY2xpY2tlZCBpdGVtIGlzIG5vdCBzZWxlY3RlZCwgY2hhbmdlIHNlbGVjdGlvbiB0byBpdFxuICAgICAgaWYgKCFzZWxlY3RlZEl0ZW1zLmluY2x1ZGVzKGRhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi5ncmlkLmlkS2V5UGF0aF0pKSkge1xuICAgICAgICBpdGVtU2VsZWN0aW9uQ2hhbmdlKGdyaWQsIHJvd0luZGV4KTtcbiAgICAgIH1cbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkRvY3VtZW50Q2xpY2spO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBoYW5kbGVDb250ZXh0TWVudUl0ZW1DbGljayA9IChvbkNsaWNrLCBzZWxlY3RlZEl0ZW1zLCBzZWxlY3RlZERhdGEpID0+ICgpID0+IHtcbiAgICBvbkNsaWNrKHNlbGVjdGVkSXRlbXMsIHNlbGVjdGVkRGF0YSk7XG4gIH07XG5cbiAgaGFuZGxlUm93SGVpZ2h0R2V0dGVyID0gcm93SW5kZXggPT4gdGhpcy5wcm9wcy5yb3dIZWlnaHRHZXR0ZXIoXG4gICAgdGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCksXG4gICAgcm93SW5kZXgsXG4gICk7XG5cbiAgcmVuZGVyQ2VsbCA9IGNvbCA9PiAoY2VsbFByb3BzKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgaXNDcmVhdGluZywgaXNFZGl0aW5nLCBjcmVhdGVEYXRhLCBzZWxlY3RlZENlbGwsIGdyaWQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyByb3dJbmRleCwgLi4ucHJvcHMgfSA9IGNlbGxQcm9wcztcbiAgICBsZXQgY2VsbDtcbiAgICBsZXQgY2VsbFR5cGUgPSAndmlldyc7XG4gICAgbGV0IGV4dHJhUm93Q291bnQgPSAwOyAvLyBob3cgbWFueSByb3dzIHRvIGlnbm9yZSBmcm9tIHRvcCwgbmV3ICsgZmlsdGVyIHJvd3NcbiAgICBpZiAoaXNDcmVhdGluZykgZXh0cmFSb3dDb3VudCA9IGNyZWF0ZURhdGEuc2l6ZTtcbiAgICBjb25zdCBleGlzdGluZ1Jvd3NJbmRleCA9IHJvd0luZGV4IC0gZXh0cmFSb3dDb3VudDtcbiAgICBpZiAoaXNDcmVhdGluZykge1xuICAgICAgaWYgKHJvd0luZGV4IDw9IGV4dHJhUm93Q291bnQgLSAxKSB7XG4gICAgICAgIGlmIChjb2wuY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNlbGwgPSBjb2wuY2VsbENyZWF0ZShcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGhpcy5oYW5kbGVDcmVhdGVDZWxsUmVmKHJvd0luZGV4LCBjb2wpLFxuICAgICAgICAgICAgdGhpcy5vbkNyZWF0ZUNlbGxLZXlEb3duKHJvd0luZGV4LCBjb2wpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgY2VsbFR5cGUgPSAnY3JlYXRlJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjZWxsID0gbnVsbDtcbiAgICAgICAgICBjZWxsVHlwZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNlbGwgPSBjb2wuY2VsbChcbiAgICAgICAgICBleGlzdGluZ1Jvd3NJbmRleCxcbiAgICAgICAgICB0aGlzLmhhbmRsZUNyZWF0ZUNlbGxSZWYoZXhpc3RpbmdSb3dzSW5kZXgsIGNvbCksXG4gICAgICAgICAgdGhpcy5vbkNyZWF0ZUNlbGxLZXlEb3duKGV4aXN0aW5nUm93c0luZGV4LCBjb2wpLFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNFZGl0aW5nICYmIGNvbC5jZWxsRWRpdCkge1xuICAgICAgY2VsbCA9IGNvbC5jZWxsRWRpdChcbiAgICAgICAgZXhpc3RpbmdSb3dzSW5kZXgsXG4gICAgICAgIHRoaXMuaGFuZGxlRWRpdENlbGxSZWYoZXhpc3RpbmdSb3dzSW5kZXgsIGNvbCksXG4gICAgICAgIHRoaXMub25FZGl0Q2VsbEtleURvd24oZXhpc3RpbmdSb3dzSW5kZXgsIGNvbCksXG4gICAgICApO1xuICAgICAgY2VsbFR5cGUgPSAnZWRpdCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNlbGwgPSBjb2wuY2VsbChcbiAgICAgICAgZXhpc3RpbmdSb3dzSW5kZXgsXG4gICAgICAgIHRoaXMuaGFuZGxlRWRpdENlbGxSZWYoZXhpc3RpbmdSb3dzSW5kZXgsIGNvbCksXG4gICAgICAgIHRoaXMub25FZGl0Q2VsbEtleURvd24oZXhpc3RpbmdSb3dzSW5kZXgsIGNvbCksXG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCBpc1NwZWNpYWwgPSBwcm9wcy5jb2x1bW5LZXkgPT09ICdzZWxlY3Rpb25DaGVja2JveCcgfHwgcHJvcHMuY29sdW1uS2V5ID09PSAnZXh0cmFDb2x1bW4nO1xuICAgIGlmICgoY2VsbFR5cGUgPT09ICd2aWV3JyB8fCBjZWxsVHlwZSA9PT0gJ2VkaXQnIHx8IGNlbGxUeXBlID09PSAnY3JlYXRlJykgJiYgIWlzU3BlY2lhbCkge1xuICAgICAgY29uc3QgZ2V0Um93SW5kZXggPSBjZWxsVHlwZSA9PT0gJ2NyZWF0ZScgPyByb3dJbmRleCA6IHJvd0luZGV4IC0gZXh0cmFSb3dDb3VudDtcbiAgICAgIGNvbnN0IG1lc3NhZ2VEYXRhID0gdGhpcy5nZXRDZWxsTWVzc2FnZXMoZ2V0Um93SW5kZXgsIGNvbCwgY2VsbFR5cGUpO1xuICAgICAgY29uc3QgaXNFZGl0ZWQgPSB0aGlzLmlzQ2VsbEVkaXRlZChnZXRSb3dJbmRleCwgY29sLCBjZWxsVHlwZSk7XG4gICAgICBjb25zdCBjbGFzc05hbWUgPSBzZWxlY3RlZENlbGwuZ2V0KCdyb3dJbmRleCcpID09PSByb3dJbmRleFxuICAgICAgICAmJiBzZWxlY3RlZENlbGwuZ2V0KCdjb2x1bW5LZXknKSA9PT0gcHJvcHMuY29sdW1uS2V5XG4gICAgICAgID8gJ29jLWRhdGFncmlkLWNlbGwgaXMtc2VsZWN0ZWQnXG4gICAgICAgIDogJ29jLWRhdGFncmlkLWNlbGwnO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPENlbGxcbiAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG4gICAgICAgICAgc3R5bGU9e2NvbC5zdHlsZX1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNlbGxTZWxlY3QoY2VsbFR5cGUsIHJvd0luZGV4LCBwcm9wcy5jb2x1bW5LZXkpfVxuICAgICAgICA+XG4gICAgICAgICAgPENlbGxUb29sdGlwXG4gICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRDZWxsLSR7Z3JpZC5pZH0tJHtwcm9wcy5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgIGlzRWRpdGVkPXtpc0VkaXRlZH1cbiAgICAgICAgICAgIGlzRXJyb3I9eyEhbWVzc2FnZURhdGEuZXJyb3JNZXNzYWdlfVxuICAgICAgICAgICAgaXNXYXJuaW5nPXshIW1lc3NhZ2VEYXRhLndhcm5pbmdNZXNzYWdlfVxuICAgICAgICAgICAgaW5mb01lc3NhZ2U9e21lc3NhZ2VEYXRhLmluZm9NZXNzYWdlfVxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlPXttZXNzYWdlRGF0YS5lcnJvck1lc3NhZ2V9XG4gICAgICAgICAgICB3YXJuaW5nTWVzc2FnZT17bWVzc2FnZURhdGEud2FybmluZ01lc3NhZ2V9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2NlbGx9XG4gICAgICAgICAgPC9DZWxsVG9vbHRpcD5cbiAgICAgICAgPC9DZWxsPlxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxDZWxsIHsuLi5wcm9wc30gY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtY2VsbFwiIHN0eWxlPXtjb2wuc3R5bGV9PlxuICAgICAgICB7Y2VsbH1cbiAgICAgIDwvQ2VsbD5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlckNvbHVtbnMgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgYWxsRGF0YVNpemUsIGdyaWQsIGlzQ3JlYXRpbmcsIGlzQnVzeSwgdmlzaWJsZUNvbHVtbnMsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFhbGxEYXRhU2l6ZSAmJiAhaXNCdXN5ICYmICFpc0NyZWF0aW5nICYmICFncmlkLnBhZ2luYXRpb24pIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxDb2x1bW5cbiAgICAgICAgICBjb2x1bW5LZXk9XCJkYXRhRW1wdHlDb2x1bW5cIlxuICAgICAgICAgIGhlYWRlcj17KFxuICAgICAgICAgICAgPENlbGwgc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICAgICAgPE0gaWQ9XCJHcmlkLk5vSXRlbXNcIiAvPlxuICAgICAgICAgICAgPC9DZWxsPlxuKX1cbiAgICAgICAgICB3aWR0aD17MTB9XG4gICAgICAgICAgaXNSZXNpemFibGU9e2ZhbHNlfVxuICAgICAgICAgIGZsZXhHcm93PXsxfVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKCF2aXNpYmxlQ29sdW1ucy5zaXplKSB7XG4gICAgICBpZiAoaXNCdXN5KSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPENvbHVtblxuICAgICAgICAgICAgY29sdW1uS2V5PVwiZGF0YUVtcHR5Q29sdW1uXCJcbiAgICAgICAgICAgIGhlYWRlcj17PENlbGw+Jm5ic3A7PC9DZWxsPn1cbiAgICAgICAgICAgIHdpZHRoPXsxMH1cbiAgICAgICAgICAgIGlzUmVzaXphYmxlPXtmYWxzZX1cbiAgICAgICAgICAgIGZsZXhHcm93PXsxfVxuICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Q29sdW1uXG4gICAgICAgICAgY29sdW1uS2V5PVwiZGF0YUVtcHR5Q29sdW1uXCJcbiAgICAgICAgICBoZWFkZXI9eyhcbiAgICAgICAgICAgIDxDZWxsIHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgICAgIDxNIGlkPVwiR3JpZC5Ob0NvbHVtbnNcIiAvPlxuICAgICAgICAgICAgPC9DZWxsPlxuKX1cbiAgICAgICAgICB3aWR0aD17MTB9XG4gICAgICAgICAgaXNSZXNpemFibGU9e2ZhbHNlfVxuICAgICAgICAgIGZsZXhHcm93PXsxfVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3QgY29sdW1ucyA9IHRoaXMuZ2VuZXJhdGVDb2x1bW5zKCk7XG4gICAgaWYgKGNvbHVtbnMubGVuZ2h0ID09PSAwKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gY29sdW1ucy5tYXAoY29sID0+IChcbiAgICAgIDxDb2x1bW5cbiAgICAgICAga2V5PXtjb2wuY29sdW1uS2V5fVxuICAgICAgICBjb2x1bW5LZXk9e2NvbC5jb2x1bW5LZXl9XG4gICAgICAgIGhlYWRlcj17KFxuICAgICAgICAgIDxIZWFkZXJDZWxsXG4gICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRIZWFkZXItJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sLmNvbHVtbktleX1gfVxuICAgICAgICAgICAgZ3JpZD17dGhpcy5wcm9wcy5ncmlkfVxuICAgICAgICAgICAgY29sdW1ucz17dGhpcy5wcm9wcy5jb2x1bW5zfVxuICAgICAgICAgICAgY29sdW1uPXtjb2x9XG4gICAgICAgICAgICBjdXJyZW50U29ydENvbHVtbj17dGhpcy5wcm9wcy5zb3J0Q29sdW1ufVxuICAgICAgICAgICAgY3VycmVudFNvcnRPcmRlcj17dGhpcy5wcm9wcy5zb3J0T3JkZXJ9XG4gICAgICAgICAgICBvblNvcnRDaGFuZ2U9e3RoaXMucHJvcHMuc29ydENoYW5nZX1cbiAgICAgICAgICAgIGlzQnVzeT17dGhpcy5wcm9wcy5pc0J1c3l9XG4gICAgICAgICAgICBmaWx0ZXJpbmc9e3RoaXMucHJvcHMuaXNGaWx0ZXJpbmd9XG4gICAgICAgICAgICB3aWR0aD17dGhpcy5wcm9wcy5jb2x1bW5XaWR0aHMuZ2V0KGNvbC5jb2x1bW5LZXksIGNvbC53aWR0aCl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2NvbC5oZWFkZXJ9XG4gICAgICAgICAgPC9IZWFkZXJDZWxsPlxuKX1cbiAgICAgICAgY2VsbD17dGhpcy5yZW5kZXJDZWxsKGNvbCl9XG4gICAgICAgIHdpZHRoPXt0aGlzLnByb3BzLmNvbHVtbldpZHRocy5nZXQoY29sLmNvbHVtbktleSwgY29sLndpZHRoKX1cbiAgICAgICAgbWluV2lkdGg9e2NvbC5taW5XaWR0aH1cbiAgICAgICAgbWF4V2lkdGg9e2NvbC5tYXhXaWR0aH1cbiAgICAgICAgaXNSZXNpemFibGU9e2NvbC5pc1Jlc2l6YWJsZX1cbiAgICAgICAgZmxleEdyb3c9e2NvbC5mbGV4R3JvdyA/IGNvbC5mbGV4R3JvdyA6IDB9XG4gICAgICAgIGZpeGVkPXtjb2wuZml4ZWR9XG4gICAgICAgIGZpeGVkUmlnaHQ9e2NvbC5maXhlZFJpZ2h0fVxuICAgICAgICBhbGxvd0NlbGxzUmVjeWNsaW5nPXtjb2wuYWxsb3dDZWxsc1JlY3ljbGluZ31cbiAgICAgIC8+XG4gICAgKSk7XG4gIH07XG5cbiAgcmVuZGVyQ29udGV4dE1lbnUgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgY29udGV4dE1lbnVJdGVtcywgZGF0YSwgZ3JpZCwgc2VsZWN0ZWRJdGVtcyxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IGNvbnRleHRNZW51WCwgY29udGV4dE1lbnVZIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHN0eWxlID0ge1xuICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgIHpJbmRleDogMTAwMDAsXG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIHRvcDogYCR7Y29udGV4dE1lbnVZfXB4YCxcbiAgICAgIGxlZnQ6IGAke2NvbnRleHRNZW51WH1weGAsXG4gICAgfTtcbiAgICBjb25zdCBzZWxlY3RlZERhdGEgPSBkYXRhLmZpbHRlcihkID0+IHNlbGVjdGVkSXRlbXMuaW5jbHVkZXMoZC5nZXRJbihncmlkLmlkS2V5UGF0aCkpKTtcbiAgICByZXR1cm4gKFxuICAgICAgPHVsIGNsYXNzTmFtZT1cImRyb3Bkb3duLW1lbnUgb2MtZGF0YWdyaWQtY29udGV4dC1tZW51IG9wZW5cIiBzdHlsZT17c3R5bGV9PlxuICAgICAgICB7Y29udGV4dE1lbnVJdGVtc1xuICAgICAgICAgICYmIGNvbnRleHRNZW51SXRlbXMubWFwXG4gICAgICAgICAgJiYgY29udGV4dE1lbnVJdGVtcy5tYXAoKGl0ZW0sIGkpID0+IHtcbiAgICAgICAgICAgIGxldCB7IGRpc2FibGVkIH0gPSBpdGVtO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBpdGVtLmRpc2FibGVkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgIGRpc2FibGVkID0gaXRlbS5kaXNhYmxlZChzZWxlY3RlZEl0ZW1zLCBzZWxlY3RlZERhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPE1lbnVJdGVtXG4gICAgICAgICAgICAgICAga2V5PXtpfSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgICAgICAgICAgaGVhZGVyPXtpdGVtLmhlYWRlcn1cbiAgICAgICAgICAgICAgICBkaXZpZGVyPXtpdGVtLmRpdmlkZXJ9XG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgICAgIHRpdGxlPXtpdGVtLnRpdGxlfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e1xuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQgfHwgIWl0ZW0ub25DbGlja1xuICAgICAgICAgICAgICAgICAgICA/IG51bGxcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLmhhbmRsZUNvbnRleHRNZW51SXRlbUNsaWNrKGl0ZW0ub25DbGljaywgc2VsZWN0ZWRJdGVtcywgc2VsZWN0ZWREYXRhKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtpdGVtLnZhbHVlfVxuICAgICAgICAgICAgICA8L01lbnVJdGVtPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KX1cbiAgICAgIDwvdWw+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgZ3JpZENsYXNzTmFtZSA9IGNsYXNzTmFtZXMoe1xuICAgICAgJ29jLWRhdGFncmlkLWNvbnRhaW5lcic6IHRydWUsXG4gICAgICAnd2l0aC1hY3Rpb25iYXInOiB0aGlzLnByb3BzLmlubGluZUVkaXQgJiYgIXRoaXMucHJvcHMuZGlzYWJsZUFjdGlvbkJhcixcbiAgICAgICdpcy1idXN5JzogdGhpcy5wcm9wcy5pc0J1c3ksXG4gICAgICAnaXMtZWRpdGluZyc6IHRoaXMucHJvcHMuaXNFZGl0aW5nLFxuICAgICAgJ2lzLWNyZWF0aW5nJzogdGhpcy5wcm9wcy5pc0NyZWF0aW5nLFxuICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICB9KTtcblxuICAgIC8vIGNoZWNrIGlmIHRoZXJlIGlzIGEgbmV3IHJlcXVlc3QgdG8gY2hhbmdlIGVkaXQgbW9kZSBmb2N1c1xuICAgIHRoaXMuc2V0Rm9jdXNUbyh0aGlzLnByb3BzLmZvY3VzVHlwZSk7XG5cbiAgICBsZXQgYWN0aW9uQmFyID0gbnVsbDtcbiAgICBsZXQgYWN0aW9uQmFyUmlnaHQgPSBudWxsO1xuICAgIGxldCBhY3Rpb25CYXJMZWZ0ID0gbnVsbDtcbiAgICBpZiAoXG4gICAgICAodGhpcy5wcm9wcy5hY3Rpb25CYXJcbiAgICAgICAgfHwgdGhpcy5wcm9wcy5pbmxpbmVFZGl0XG4gICAgICAgIHx8IHRoaXMucHJvcHMuZmlsdGVyaW5nXG4gICAgICAgIHx8IHRoaXMucHJvcHMucmVtb3ZpbmcpXG4gICAgICAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlQWN0aW9uQmFyXG4gICAgKSB7XG4gICAgICBhY3Rpb25CYXJSaWdodCA9IChcbiAgICAgICAgPEFjdGlvbkJhciBwb3NpdGlvbj1cInJpZ2h0XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1hY3Rpb25iYXItcmlnaHRcIj57dGhpcy5wcm9wcy5hY3Rpb25CYXJ9PC9kaXY+XG4gICAgICAgICAge3RoaXMucHJvcHMuZmlsdGVyaW5nXG4gICAgICAgICAgICAmJiB0aGlzLnByb3BzLmRpc2FibGVEcm9wZG93blxuICAgICAgICAgICAgJiYgIXRoaXMucHJvcHMuZGlzYWJsZUZpbHRlcmluZ0NvbnRyb2xzICYmIDxGaWx0ZXJpbmdDb250cm9scyB7Li4udGhpcy5wcm9wc30gLz59XG4gICAgICAgICAge3RoaXMucHJvcHMuaW5saW5lRWRpdCAmJiAoXG4gICAgICAgICAgICA8SW5saW5lRWRpdENvbnRyb2xzXG4gICAgICAgICAgICAgIGFmdGVyQWRkSXRlbT17dGhpcy5oYW5kbGVBZnRlckFkZEl0ZW19XG4gICAgICAgICAgICAgIGFmdGVyRWRpdFByZXNzPXt0aGlzLmhhbmRsZUFmdGVyRWRpdFByZXNzfVxuICAgICAgICAgICAgICBhZnRlclZhbGlkYXRpb25FcnJvcj17dGhpcy5oYW5kbGVBZnRlclZhbGlkYXRpb25FcnJvcn1cbiAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG4gICAgICAgICAgeyh0aGlzLnByb3BzLmRyb3Bkb3duTWVudUl0ZW1zXG4gICAgICAgICAgICB8fCB0aGlzLnByb3BzLnJlbW92aW5nXG4gICAgICAgICAgICB8fCB0aGlzLnByb3BzLmNvbHVtblNldHRpbmdzXG4gICAgICAgICAgICB8fCAodGhpcy5wcm9wcy5maWx0ZXJpbmcgJiYgIXRoaXMucHJvcHMuZGlzYWJsZURyb3Bkb3duKSkgJiYgKFxuICAgICAgICAgICAgPERyb3Bkb3duQ29udHJvbHMgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9BY3Rpb25CYXI+XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5hY3Rpb25CYXJMZWZ0IHx8IHRoaXMucHJvcHMuZ3JpZEhlYWRlcikge1xuICAgICAgYWN0aW9uQmFyTGVmdCA9IChcbiAgICAgICAgPEFjdGlvbkJhciBwb3NpdGlvbj1cImxlZnRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWdyaWRoZWFkZXJcIj57dGhpcy5wcm9wcy5ncmlkSGVhZGVyfTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtYWN0aW9uYmFyLWxlZnRcIj57dGhpcy5wcm9wcy5hY3Rpb25CYXJMZWZ0fTwvZGl2PlxuICAgICAgICA8L0FjdGlvbkJhcj5cbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChhY3Rpb25CYXJMZWZ0IHx8IGFjdGlvbkJhclJpZ2h0KSB7XG4gICAgICBhY3Rpb25CYXIgPSAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtYWN0aW9uYmFyLWNvbnRhaW5lclwiPlxuICAgICAgICAgIHthY3Rpb25CYXJMZWZ0fVxuICAgICAgICAgIHthY3Rpb25CYXJSaWdodH1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgICBsZXQgcm93c0NvdW50ID0gdGhpcy5wcm9wcy5yb3dzQ291bnQgfHwgdGhpcy5wcm9wcy5yb3dzQ291bnQgPT09IDBcbiAgICAgID8gdGhpcy5wcm9wcy5yb3dzQ291bnRcbiAgICAgIDogdGhpcy5wcm9wcy5kYXRhLnNpemU7XG4gICAgaWYgKHRoaXMucHJvcHMuaXNDcmVhdGluZykgcm93c0NvdW50ICs9IHRoaXMucHJvcHMuY3JlYXRlRGF0YS5zaXplO1xuICAgIGlmICghdGhpcy5wcm9wcy52aXNpYmxlQ29sdW1ucy5zaXplKSByb3dzQ291bnQgPSAwO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPXtgb2MtZGF0YWdyaWQtJHt0aGlzLnByb3BzLmdyaWQuaWR9YH1cbiAgICAgICAgY2xhc3NOYW1lPXtncmlkQ2xhc3NOYW1lfVxuICAgICAgICBzdHlsZT17dGhpcy5wcm9wcy5jb250YWluZXJTdHlsZX1cbiAgICAgID5cbiAgICAgICAge3RoaXMucHJvcHMuaXNCdXN5ICYmIDxTcGlubmVyIC8+fVxuICAgICAgICB7dGhpcy5zdGF0ZS5jb250ZXh0TWVudU9wZW4gJiYgdGhpcy5yZW5kZXJDb250ZXh0TWVudSgpfVxuICAgICAgICB7YWN0aW9uQmFyfVxuICAgICAgICA8UmVzcG9uc2l2ZUZpeGVkRGF0YVRhYmxlXG4gICAgICAgICAgaWQ9e3RoaXMucHJvcHMuZ3JpZC5pZH1cbiAgICAgICAgICByb3dzQ291bnQ9e3Jvd3NDb3VudH1cbiAgICAgICAgICBoZWFkZXJIZWlnaHQ9e1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5pc0ZpbHRlcmluZ1xuICAgICAgICAgICAgICA/IHRoaXMucHJvcHMuaGVhZGVySGVpZ2h0ICsgdGhpcy5wcm9wcy5maWx0ZXJSb3dIZWlnaHRcbiAgICAgICAgICAgICAgOiB0aGlzLnByb3BzLmhlYWRlckhlaWdodFxuICAgICAgICAgIH1cbiAgICAgICAgICByb3dIZWlnaHQ9e3RoaXMucHJvcHMucm93SGVpZ2h0fVxuICAgICAgICAgIG9uQ29sdW1uUmVzaXplRW5kQ2FsbGJhY2s9e3RoaXMub25Db2x1bW5SZXNpemVFbmRDYWxsYmFja31cbiAgICAgICAgICBpc0NvbHVtblJlc2l6aW5nPXtmYWxzZX1cbiAgICAgICAgICBvblJvd0NsaWNrPXt0aGlzLmhhbmRsZVJvd0NsaWNrfVxuICAgICAgICAgIHNjcm9sbFRvQ29sdW1uPXt0aGlzLnByb3BzLnNjcm9sbFRvQ29sdW1uIHx8IHRoaXMuc3RhdGUuY3VycmVudENvbHVtbn1cbiAgICAgICAgICBzY3JvbGxUb3A9e3RoaXMucHJvcHMuc2Nyb2xsVG9wfVxuICAgICAgICAgIHNjcm9sbFRvUm93PXt0aGlzLmdldFNjcm9sbFRvUm93KCl9XG4gICAgICAgICAgb25Sb3dEb3VibGVDbGljaz17dGhpcy5wcm9wcy5vblJvd0RvdWJsZUNsaWNrfVxuICAgICAgICAgIG9uUm93TW91c2VEb3duPXt0aGlzLnByb3BzLm9uTW91c2VEb3dufVxuICAgICAgICAgIG9uUm93TW91c2VFbnRlcj17dGhpcy5wcm9wcy5vblJvd01vdXNlRW50ZXJ9XG4gICAgICAgICAgb25Sb3dNb3VzZUxlYXZlPXt0aGlzLnByb3BzLm9uUm93TW91c2VMZWF2ZX1cbiAgICAgICAgICBvblNjcm9sbFN0YXJ0PXt0aGlzLnByb3BzLm9uU2Nyb2xsU3RhcnR9XG4gICAgICAgICAgb25TY3JvbGxFbmQ9e3RoaXMucHJvcHMub25TY3JvbGxFbmR9XG4gICAgICAgICAgcm93Q2xhc3NOYW1lR2V0dGVyPXt0aGlzLmdldFJvd0NsYXNzTmFtZX1cbiAgICAgICAgICByb3dIZWlnaHRHZXR0ZXI9e3RoaXMucHJvcHMucm93SGVpZ2h0R2V0dGVyICYmIHRoaXMuaGFuZGxlUm93SGVpZ2h0R2V0dGVyfVxuICAgICAgICAgIG9uQ29udGVudEhlaWdodENoYW5nZT17dGhpcy5wcm9wcy5vbkNvbnRlbnRIZWlnaHRDaGFuZ2V9XG4gICAgICAgICAgb25Sb3dDb250ZXh0TWVudT17dGhpcy5oYW5kbGVDb250ZXh0TWVudX1cbiAgICAgICAgPlxuICAgICAgICAgIHt0aGlzLnJlbmRlckNvbHVtbnMoKX1cbiAgICAgICAgPC9SZXNwb25zaXZlRml4ZWREYXRhVGFibGU+XG4gICAgICAgIHt0aGlzLnByb3BzLmlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW4gJiYgKFxuICAgICAgICAgIDxDb2x1bW5TZXR0aW5nc01vZGFsXG4gICAgICAgICAgICBncmlkPXt0aGlzLnByb3BzLmdyaWR9XG4gICAgICAgICAgICBjb2x1bW5zPXt0aGlzLnByb3BzLmNvbHVtbnN9XG4gICAgICAgICAgICB2aXNpYmxlQ29sdW1ucz17dGhpcy5wcm9wcy52aXNpYmxlQ29sdW1uc31cbiAgICAgICAgICAgIGNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbD17dGhpcy5wcm9wcy5jbG9zZUNvbHVtblNldHRpbmdzTW9kYWx9XG4gICAgICAgICAgICBzYXZlQ29sdW1uU2V0dGluZ3M9e3RoaXMucHJvcHMuc2F2ZUNvbHVtblNldHRpbmdzfVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEYXRhR3JpZDtcbiJdfQ==