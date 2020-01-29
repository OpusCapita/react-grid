var _dec, _class, _class2, _temp;

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable prefer-destructuring */

/* eslint-disable no-lonely-if, prefer-template, react/require-default-props */
import React from 'react';
import { Map, List } from 'immutable';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage as M } from 'react-intl';
import { Column, Cell } from 'fixed-data-table-2';
import classNames from 'classnames';
import { Icon } from '@opuscapita/react-icons';
import Spinner from '@opuscapita/react-spinner';
import Checkbox from '@opuscapita/react-checkbox';
import 'fixed-data-table-2/dist/fixed-data-table.css';
import ResponsiveFixedDataTable from './responsive-fixed-data-table.component';
import HeaderCell from './header-cell.component';
import ActionBar from './action-bar.component';
import InlineEditControls from './inline-edit-controls.component';
import FilteringControls from './filtering-controls.component';
import DropdownControls from './dropdown-controls.component';
import * as datagridActions from './datagrid.actions';
import CellTooltip from './cell-tooltip.component';
import ColumnSettingsModal from './column-settings/column-settings.component';
import { propTypes, defaultProps } from './datagrid.props';
import { KEY_CODES } from './datagrid.constants';
import pagination from './pagination.component';
import ContextMenu from './context-menu.component';
import Utils from './datagrid.utils';
import GridColumnService from './column-service/column-service';
import './datagrid.component.scss';

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
    visibleColumns: state.datagrid.getIn([GRID.id, 'config', 'visibleColumns'], List()),
    columnWidths: state.datagrid.getIn([GRID.id, 'config', 'columnWidths'], Map()),
    selectedCell: state.datagrid.getIn([GRID.id, 'selectedCell'], Map()),
    selectedItems: state.datagrid.getIn([GRID.id, 'selectedItems'], List()),
    data: state.datagrid.getIn([GRID.id, 'data'], List()),
    editData: state.datagrid.getIn([GRID.id, 'editData'], Map()),
    createData: state.datagrid.getIn([GRID.id, 'createData'], List()),
    filterData: state.datagrid.getIn([GRID.id, 'config', 'filteringData', 'filterData'], Map()),
    cellMessages: state.datagrid.getIn([GRID.id, 'cellMessages'], Map()),
    createCellMessages: state.datagrid.getIn([GRID.id, 'createCellMessages'], Map()),
    allDataSize: state.datagrid.getIn([GRID.id, 'allData'], List()).size,
    language: Utils.getLanguage(GRID, state.user),
    region: Utils.getRegion(GRID, state.user),
    dateFormat: Utils.getDateFormat(GRID, state.user),
    thousandSeparator: Utils.getThousandSeparator(GRID, state.user),
    decimalSeparator: Utils.getDecimalSeparator(GRID, state.user),
    forceRefreshTimestamp: state.datagrid.get('forceRefresh', 0),
    // force re-render when changed
    focusType: state.datagrid.getIn([GRID.id, 'session', 'focusType'], Map())
  };
};

var mapDispatchToProps = datagridActions;
var DataGrid = (_dec = connect(mapStateToProps, mapDispatchToProps), pagination(_class = injectIntl(_class = _dec(_class = (_temp = _class2 =
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
        var arrowKeys = [KEY_CODES.DOWN, KEY_CODES.UP, KEY_CODES.LEFT, KEY_CODES.RIGHT];
        var _this$props = _this.props,
            columns = _this$props.columns,
            visibleColumns = _this$props.visibleColumns,
            grid = _this$props.grid,
            data = _this$props.data,
            onLastCellTabPress = _this$props.onLastCellTabPress;
        var gridColumns = Utils.visibleColumns(columns, visibleColumns);

        var getColumnKeyByIndex = function getColumnKeyByIndex(i) {
          return Utils.getColumnKey(gridColumns[i]);
        };

        var rowsSize = data.size;
        var columnKey = Utils.getColumnKey(col);
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
          case KEY_CODES.ENTER:
          case KEY_CODES.ESC:
            {
              if (create && e.keyCode === KEY_CODES.ENTER) {
                _this.props.addNewItem(grid, Utils.getColumnDefaultValues(columns));

                _this.focusToCreateCell = true;
                break;
              }

              currentCell.select();
              break;
            }

          case KEY_CODES.DOWN:
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

          case KEY_CODES.UP:
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

          case KEY_CODES.TAB:
          case KEY_CODES.RIGHT:
          case KEY_CODES.LEFT:
            {
              if (e.keyCode === KEY_CODES.RIGHT && !isCursorAtEnd()) break;
              if (e.keyCode === KEY_CODES.LEFT && !isCursorAtStart()) break;
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
                  if (e.keyCode === KEY_CODES.LEFT || e.keyCode === KEY_CODES.TAB && e.shiftKey) {
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
                      if (onLastCellTabPress && e.keyCode === KEY_CODES.TAB) onLastCellTabPress(e);
                      break;
                    }
                  }

                  _nextElement2 = cellRefs[grid.id + "_" + getColumnKeyByIndex(columnInd) + "_" + rowInd]; // If we cannot focus on the next element while moving to the right

                  if (!_nextElement2 && e.keyCode !== KEY_CODES.LEFT) {
                    // If we're not yet in the last focusable column
                    if (columnInd <= gridColumns.length) {
                      while (columnInd <= gridColumns.length && !_nextElement2) {
                        _nextElement2 = cellRefs[grid.id + "_" + getColumnKeyByIndex(columnInd) + "_" + rowInd];
                        columnInd += 1; // If we are in the last column and we don't have an element to focus on,
                        // we must move to the next row (if possible)

                        if (!_nextElement2 && columnInd === gridColumns.length) {
                          // If trying to select a row, when there is none:
                          if (rowInd + 1 === rowsSize) {
                            if (onLastCellTabPress && e.keyCode === KEY_CODES.TAB) {
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

                  } else if (!_nextElement2 && e.keyCode === KEY_CODES.LEFT) {
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
        var columnKey = Utils.getColumnKey(col);
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
        var columnKey = Utils.getColumnKey(col);
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
          cellSelectionChange(grid, Map({
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

      var val = _this.props.filterData.get(Utils.getColumnKey(col), '');

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
      var columnKey = Utils.getColumnKey(col);
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
          _this.props.cellSelectionChange(_this.props.grid, Map({
            rowIndex: rowIndex,
            columnKey: columnKey
          }));
        }
      };
    });

    _defineProperty(_assertThisInitialized(_this), "handleCreateCellRef", function (rowIndex, col) {
      return function (ref) {
        // Focus to create cell
        var columnKey = Utils.getColumnKey(col);
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
        var columnKey = Utils.getColumnKey(col);

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

    _defineProperty(_assertThisInitialized(_this), "handleSelectionCheckBoxOnChange", function () {
      return function () {// Logic for this action contains in handleRowClick (in 'else' block)
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
            return React.createElement("div", {
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
          header: showSelectAllCheckbox && React.createElement(Checkbox, {
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
            return React.createElement(Checkbox, {
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
          if (Utils.getColumnKey(orgCol) === visibleColumnKey) {
            visibleColumns.push(orgCol);
          }
        });
      });

      visibleColumns.forEach(function (col) {
        var valueEmptyChecker = Utils.getValueEmptyChecker(col); // Cell value rendering

        var valueRender = function valueRender(rowIndex, format) {
          var val = data.getIn([rowIndex].concat(col.valueKeyPath));

          if (valueEmptyChecker(val)) {
            return col.isRequired ? React.createElement(M, {
              id: "Grid.ValueIsMissing"
            }) : '';
          }

          return format ? format(val) : val;
        };

        var column = GridColumnService.baseColumn(col); // Collect column functions into one Object

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

        column = GridColumnService.columnCell(column, cellProps, col, valueRender); // handle columnComponentTypes

        var componentTypeProps = _extends({}, cellProps, {
          inlineEdit: inlineEdit,
          filtering: filtering,
          region: region,
          intl: intl,
          selectComponentOptions: selectComponentOptions
        }); // eslint-disable-line


        column = GridColumnService.columnComponentType(column, tabIndex, componentTypeProps, col, columnFunctions, _this.getComponentDisabledState);
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
            return React.createElement(Icon, {
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
      if (!_this.props.isCreating && !_this.props.isEditing) {
        e.preventDefault();

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
          if (_this.props.rowSelect) {
            _this.props.itemSelectionChange(_this.props.grid, rowIndex, _this.props.multiSelect && e.ctrlKey, _this.props.multiSelect && e.shiftKey);
          }
        } else {
          _this.props.itemSelectionChange(_this.props.grid, rowIndex, _this.props.multiSelect, false);
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
          return React.createElement(Cell, _extends({}, props, {
            className: className,
            style: col.style,
            onClick: _this.handleCellSelect(cellType, rowIndex, props.columnKey)
          }), React.createElement(CellTooltip, {
            id: "ocDatagridCell-" + grid.id + "-" + props.columnKey + "-" + rowIndex,
            isEdited: isEdited,
            isError: !!messageData.errorMessage,
            isWarning: !!messageData.warningMessage,
            infoMessage: messageData.infoMessage,
            errorMessage: messageData.errorMessage,
            warningMessage: messageData.warningMessage
          }, cell));
        }

        return React.createElement(Cell, _extends({}, props, {
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
        return React.createElement(Column, {
          columnKey: "dataEmptyColumn",
          header: React.createElement(Cell, {
            style: {
              textAlign: 'center'
            }
          }, React.createElement(M, {
            id: "Grid.NoItems"
          })),
          width: 10,
          isResizable: false,
          flexGrow: 1
        });
      }

      if (!visibleColumns.size) {
        if (isBusy) {
          return React.createElement(Column, {
            columnKey: "dataEmptyColumn",
            header: React.createElement(Cell, null, "\xA0"),
            width: 10,
            isResizable: false,
            flexGrow: 1
          });
        }

        return React.createElement(Column, {
          columnKey: "dataEmptyColumn",
          header: React.createElement(Cell, {
            style: {
              textAlign: 'center'
            }
          }, React.createElement(M, {
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
        return React.createElement(Column, {
          key: col.columnKey,
          columnKey: col.columnKey,
          header: React.createElement(HeaderCell, {
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

    var gridClassName = classNames((_classNames = {
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
      actionBarRight = React.createElement(ActionBar, {
        position: "right"
      }, React.createElement("div", {
        className: "oc-datagrid-actionbar-right"
      }, this.props.actionBar), this.props.filtering && this.props.disableDropdown && !this.props.disableFilteringControls && React.createElement(FilteringControls, this.props), this.props.inlineEdit && React.createElement(InlineEditControls, _extends({
        afterAddItem: this.handleAfterAddItem,
        afterEditPress: this.handleAfterEditPress,
        afterValidationError: this.handleAfterValidationError
      }, this.props)), (this.props.dropdownMenuItems || this.props.removing || this.props.columnSettings || this.props.filtering && !this.props.disableDropdown) && React.createElement(DropdownControls, this.props));
    }

    if (this.props.actionBarLeft || this.props.gridHeader) {
      actionBarLeft = React.createElement(ActionBar, {
        position: "left"
      }, React.createElement("div", {
        className: "oc-datagrid-gridheader"
      }, this.props.gridHeader), React.createElement("div", {
        className: "oc-datagrid-actionbar-left"
      }, this.props.actionBarLeft));
    }

    if (actionBarLeft || actionBarRight) {
      actionBar = React.createElement("div", {
        className: "oc-datagrid-actionbar-container"
      }, actionBarLeft, actionBarRight);
    }

    var rowsCount = this.props.rowsCount || this.props.rowsCount === 0 ? this.props.rowsCount : this.props.data.size;
    if (this.props.isCreating) rowsCount += this.props.createData.size;
    if (!this.props.visibleColumns.size) rowsCount = 0;
    return React.createElement("div", {
      id: "oc-datagrid-" + this.props.grid.id,
      className: gridClassName,
      style: this.props.containerStyle
    }, this.props.isBusy && React.createElement(Spinner, null), this.state.contextMenuOpen && React.createElement(ContextMenu, {
      x: this.state.contextMenuX,
      y: this.state.contextMenuY,
      isVisible: this.state.contextMenuOpen,
      contextMenuItems: this.props.contextMenuItems,
      data: this.props.data,
      grid: this.props.grid,
      selectedItems: this.props.selectedItems
    }), actionBar, React.createElement(ResponsiveFixedDataTable, _extends({}, this.props, {
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
    }), this.renderColumns()), this.props.isColumnSettingsModalOpen && React.createElement(ColumnSettingsModal, {
      grid: this.props.grid,
      columns: this.props.columns,
      visibleColumns: this.props.visibleColumns,
      closeColumnSettingsModal: this.props.closeColumnSettingsModal,
      saveColumnSettings: this.props.saveColumnSettings
    }), this.props.children);
  };

  return DataGrid;
}(React.PureComponent), _defineProperty(_class2, "defaultProps", defaultProps), _temp)) || _class) || _class) || _class);
export default DataGrid;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiTWFwIiwiTGlzdCIsImNvbm5lY3QiLCJpbmplY3RJbnRsIiwiRm9ybWF0dGVkTWVzc2FnZSIsIk0iLCJDb2x1bW4iLCJDZWxsIiwiY2xhc3NOYW1lcyIsIkljb24iLCJTcGlubmVyIiwiQ2hlY2tib3giLCJSZXNwb25zaXZlRml4ZWREYXRhVGFibGUiLCJIZWFkZXJDZWxsIiwiQWN0aW9uQmFyIiwiSW5saW5lRWRpdENvbnRyb2xzIiwiRmlsdGVyaW5nQ29udHJvbHMiLCJEcm9wZG93bkNvbnRyb2xzIiwiZGF0YWdyaWRBY3Rpb25zIiwiQ2VsbFRvb2x0aXAiLCJDb2x1bW5TZXR0aW5nc01vZGFsIiwicHJvcFR5cGVzIiwiZGVmYXVsdFByb3BzIiwiS0VZX0NPREVTIiwicGFnaW5hdGlvbiIsIkNvbnRleHRNZW51IiwiVXRpbHMiLCJHcmlkQ29sdW1uU2VydmljZSIsIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwib3duUHJvcHMiLCJHUklEIiwiZ3JpZCIsImlzQnVzeSIsImRhdGFncmlkIiwiZ2V0SW4iLCJpZCIsImlzRWRpdGluZyIsImlzQ3JlYXRpbmciLCJpc0ZpbHRlcmluZyIsImlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW4iLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwidmlzaWJsZUNvbHVtbnMiLCJjb2x1bW5XaWR0aHMiLCJzZWxlY3RlZENlbGwiLCJzZWxlY3RlZEl0ZW1zIiwiZGF0YSIsImVkaXREYXRhIiwiY3JlYXRlRGF0YSIsImZpbHRlckRhdGEiLCJjZWxsTWVzc2FnZXMiLCJjcmVhdGVDZWxsTWVzc2FnZXMiLCJhbGxEYXRhU2l6ZSIsInNpemUiLCJsYW5ndWFnZSIsImdldExhbmd1YWdlIiwidXNlciIsInJlZ2lvbiIsImdldFJlZ2lvbiIsImRhdGVGb3JtYXQiLCJnZXREYXRlRm9ybWF0IiwidGhvdXNhbmRTZXBhcmF0b3IiLCJnZXRUaG91c2FuZFNlcGFyYXRvciIsImRlY2ltYWxTZXBhcmF0b3IiLCJnZXREZWNpbWFsU2VwYXJhdG9yIiwiZm9yY2VSZWZyZXNoVGltZXN0YW1wIiwiZ2V0IiwiZm9jdXNUeXBlIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwiRGF0YUdyaWQiLCJwcm9wcyIsImNvbnRleHRNZW51SXRlbXMiLCJzZXRTdGF0ZSIsImNvbnRleHRNZW51T3BlbiIsImRvY3VtZW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIm9uRG9jdW1lbnRDbGljayIsIm5ld0NvbHVtbldpZHRoIiwiY29sdW1uS2V5IiwicmVzaXplQ29sdW1uIiwicm93SW5kZXgiLCJjb2wiLCJlIiwiY3JlYXRlIiwiZW5hYmxlQXJyb3dOYXZpZ2F0aW9uIiwiY2VsbFJlZnMiLCJjcmVhdGVDZWxsUmVmcyIsImFycm93S2V5cyIsIkRPV04iLCJVUCIsIkxFRlQiLCJSSUdIVCIsImNvbHVtbnMiLCJvbkxhc3RDZWxsVGFiUHJlc3MiLCJncmlkQ29sdW1ucyIsImdldENvbHVtbktleUJ5SW5kZXgiLCJpIiwiZ2V0Q29sdW1uS2V5Iiwicm93c1NpemUiLCJjdXJyZW50Q2VsbCIsInByb3h5IiwiaXNDdXJzb3JBdFN0YXJ0IiwidHlwZSIsInNlbGVjdGlvblN0YXJ0IiwiaXNDdXJzb3JBdEVuZCIsInNlbGVjdGlvbkVuZCIsInZhbHVlIiwibGVuZ3RoIiwic2VsZWN0UmVmIiwic2VsZWN0IiwiZ2V0U2VsZWN0UmVmIiwiaW5jbHVkZXMiLCJrZXlDb2RlIiwicHJldmVudERlZmF1bHQiLCJFTlRFUiIsIkVTQyIsImFkZE5ld0l0ZW0iLCJnZXRDb2x1bW5EZWZhdWx0VmFsdWVzIiwiZm9jdXNUb0NyZWF0ZUNlbGwiLCJuZXh0RWxlbWVudCIsIm1lbnVJc09wZW4iLCJtb3ZlQ2VsbEZvY3VzIiwiVEFCIiwiY29sdW1uSW5kIiwiZmluZEluZGV4IiwiYyIsInZhbHVlS2V5UGF0aCIsImpvaW4iLCJkaXNhYmxlZCIsInJvd0luZCIsInNoaWZ0S2V5Iiwib25DZWxsS2V5RG93biIsInZhbHVlUGFyc2VyIiwiZXZlbnRPckRhdGEiLCJyYXdWYWx1ZSIsInRhcmdldCIsInVuZGVmaW5lZCIsImZpbHRlckNlbGxWYWx1ZUNoYW5nZSIsInNlbGVjdGVkRmlsdGVycyIsImNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSIsImNvbXBvbmVudFR5cGUiLCJvbkNyZWF0ZVZhbHVlQ2hhbmdlIiwib25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUiLCJtYXRjaFZhbHVlIiwib25DcmVhdGVDZWxsVmFsdWVDaGFuZ2UiLCJuZXdWYWx1ZUtleVBhdGgiLCJ2IiwibmV3VmFsdWUiLCJ2YWxpZGF0b3JzIiwiY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUiLCJlZGl0Q2VsbFZhbHVlQ2hhbmdlIiwiZGF0YUlkIiwiZ2V0RGF0YUlkQnlSb3dJbmRleCIsIm9uRWRpdFZhbHVlQ2hhbmdlIiwib25FZGl0Q2VsbFZhbHVlQ2hhbmdlIiwiZWRpdENlbGxWYWx1ZVZhbGlkYXRlIiwic2VwYXJhdG9yIiwiUmVnRXhwIiwiZ2V0RWRpdEl0ZW1WYWx1ZSIsIm51bWVyaWNWYWx1ZSIsIk51bWJlciIsInJlcGxhY2UiLCJnZXRSZWdFeCIsInZhbHVlT3B0aW9ucyIsIm9uQ3JlYXRlQmx1ciIsIm9uRWRpdEJsdXIiLCJjZWxsVHlwZSIsImlucHV0VHlwZSIsImNlbGxTZWxlY3Rpb25DaGFuZ2UiLCJjZWxsU2VsZWN0IiwiY29tcG9uZW50IiwiaW5wdXRSZWYiLCJpZEtleVBhdGgiLCJpbmRleCIsIm9wdGlvbnMiLCJlZGl0VmFsdWUiLCJvcmlnaW5hbFZhbHVlIiwic2VsZWN0T3B0aW9ucyIsImZpbmQiLCJvYmoiLCJTdHJpbmciLCJ2YWwiLCJ0b0pTIiwibW9kZSIsImNvbXBvbmVudERpc2FibGVkIiwiZGlzYWJsZUVkaXRpbmciLCJkaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaCIsImdldENyZWF0ZUl0ZW1WYWx1ZSIsIm1hdGNoVmFsdWVLZXlQYXRoIiwicm93Q2xhc3NOYW1lcyIsImV4dHJhUm93Q291bnQiLCJwdXNoIiwiaW5kZXhPZiIsInJvd0NsYXNzTmFtZUdldHRlciIsInJldHVybkRhdGEiLCJpbmZvTWVzc2FnZSIsImVycm9yTWVzc2FnZSIsIndhcm5pbmdNZXNzYWdlIiwic2Nyb2xsVG9Sb3ciLCJzY3JvbGxOZXdSb3ciLCJzY3JvbGxJbkVkaXRNb2RlIiwiY3VycmVudFJvdyIsImdldFNlbGVjdGVkSXRlbUluZGV4IiwiZmlyc3QiLCJmb2N1c1RvIiwicHJldkZvY3VzVG8iLCJmb2N1c1RvTGFzdFJvdyIsInJlZiIsImZvY3VzIiwiZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZSIsImZvY3VzVG9FZGl0Q2VsbCIsInNlbGVjdGVkUm93SW5kZXgiLCJjb2x1bW5JbmRleCIsImVsZW1lbnRUeXBlcyIsImN1cnJlbnRDb2x1bW4iLCJzZXRUaW1lb3V0Iiwic2VsZWN0QWxsSXRlbXNDaGFuZ2UiLCJpbmxpbmVFZGl0IiwiZmlsdGVyaW5nIiwiaW50bCIsInNlbGVjdENvbXBvbmVudE9wdGlvbnMiLCJleHRyYUNvbHVtbiIsInJvd1NlbGVjdENoZWNrYm94Q29sdW1uIiwic2hvd1NlbGVjdEFsbENoZWNrYm94IiwidGFiSW5kZXgiLCJ3aWR0aCIsImlzUmVzaXphYmxlIiwiaXNTb3J0YWJsZSIsImNlbGwiLCJ2YWx1ZVJlbmRlciIsImNlbGxFZGl0IiwiY2VsbENyZWF0ZSIsImNlbGxGaWx0ZXIiLCJoZWFkZXIiLCJoYW5kbGVTZWxlY3RBbGxDaGVja0JveE9uQ2hhbmdlIiwicm93SXRlbSIsIml0ZW1JZCIsInNlbGVjdGVkIiwiaGFuZGxlU2VsZWN0aW9uQ2hlY2tCb3hPbkNoYW5nZSIsImZvckVhY2giLCJ2aXNpYmxlQ29sdW1uS2V5Iiwib3JnQ29sIiwidmFsdWVFbXB0eUNoZWNrZXIiLCJnZXRWYWx1ZUVtcHR5Q2hlY2tlciIsImZvcm1hdCIsImlzUmVxdWlyZWQiLCJjb2x1bW4iLCJiYXNlQ29sdW1uIiwiY29sdW1uRnVuY3Rpb25zIiwiZWRpdCIsImdldEl0ZW1WYWx1ZSIsIm9uQ2VsbFZhbHVlQ2hhbmdlIiwib25DZWxsQmx1ciIsIm9uRWRpdENlbGxCbHVyIiwib25DZWxsRm9jdXMiLCJvbkVkaXRDZWxsS2V5RG93biIsImhhbmRsZUNlbGxSZWYiLCJoYW5kbGVFZGl0Q2VsbFJlZiIsIm9uQ3JlYXRlQ2VsbEJsdXIiLCJvbkNyZWF0ZUNlbGxLZXlEb3duIiwiaGFuZGxlQ3JlYXRlQ2VsbFJlZiIsImZpbHRlciIsImdldEZpbHRlckl0ZW1WYWx1ZSIsImdldEl0ZW1NdWx0aVZhbHVlIiwiZ2V0RmlsdGVySXRlbU11bHRpVmFsdWUiLCJvbkZpbHRlckNlbGxWYWx1ZUNoYW5nZSIsIm9uQ2VsbE11bHRpVmFsdWVCbHVyIiwib25GaWx0ZXJDZWxsTXVsdGlWYWx1ZUJsdXIiLCJvbkNlbGxNdWx0aVZhbHVlQ2hhbmdlIiwib25GaWx0ZXJDZWxsTXVsdGlWYWx1ZUNoYW5nZSIsImNlbGxQcm9wcyIsImNvbHVtbkNlbGwiLCJjb21wb25lbnRUeXBlUHJvcHMiLCJjb2x1bW5Db21wb25lbnRUeXBlIiwicGFkZGluZyIsInJlbW92ZU5ld0l0ZW0iLCJmb2N1c1RvRXJyb3JDZWxsIiwiY3RybEtleSIsImdldFNlbGVjdGlvbiIsInJlbW92ZUFsbFJhbmdlcyIsInBhcmVudE5vZGUiLCJwYXJlbnQxY2xhc3MiLCJjbGFzc05hbWUiLCJwYXJlbnQyY2xhc3MiLCJwYXJlbnQzY2xhc3MiLCJwYXJlbnQ0Y2xhc3MiLCJyb3dTZWxlY3QiLCJpdGVtU2VsZWN0aW9uQ2hhbmdlIiwibXVsdGlTZWxlY3QiLCJvblJvd0NsaWNrIiwic3RvcFByb3BhZ2F0aW9uIiwiY29udGV4dE1lbnVYIiwiY2xpZW50WCIsImNvbnRleHRNZW51WSIsImNsaWVudFkiLCJhZGRFdmVudExpc3RlbmVyIiwicm93SGVpZ2h0R2V0dGVyIiwiZXhpc3RpbmdSb3dzSW5kZXgiLCJpc1NwZWNpYWwiLCJnZXRSb3dJbmRleCIsIm1lc3NhZ2VEYXRhIiwiZ2V0Q2VsbE1lc3NhZ2VzIiwiaXNFZGl0ZWQiLCJpc0NlbGxFZGl0ZWQiLCJzdHlsZSIsImhhbmRsZUNlbGxTZWxlY3QiLCJ0ZXh0QWxpZ24iLCJnZW5lcmF0ZUNvbHVtbnMiLCJsZW5naHQiLCJtYXAiLCJzb3J0Q2hhbmdlIiwicmVuZGVyQ2VsbCIsIm1pbldpZHRoIiwibWF4V2lkdGgiLCJmbGV4R3JvdyIsImZpeGVkIiwiZml4ZWRSaWdodCIsImFsbG93Q2VsbHNSZWN5Y2xpbmciLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImludmFsaWRhdGUiLCJyZW5kZXIiLCJncmlkQ2xhc3NOYW1lIiwiZGlzYWJsZUFjdGlvbkJhciIsInNldEZvY3VzVG8iLCJhY3Rpb25CYXIiLCJhY3Rpb25CYXJSaWdodCIsImFjdGlvbkJhckxlZnQiLCJyZW1vdmluZyIsImRpc2FibGVEcm9wZG93biIsImRpc2FibGVGaWx0ZXJpbmdDb250cm9scyIsImhhbmRsZUFmdGVyQWRkSXRlbSIsImhhbmRsZUFmdGVyRWRpdFByZXNzIiwiaGFuZGxlQWZ0ZXJWYWxpZGF0aW9uRXJyb3IiLCJkcm9wZG93bk1lbnVJdGVtcyIsImNvbHVtblNldHRpbmdzIiwiZ3JpZEhlYWRlciIsInJvd3NDb3VudCIsImNvbnRhaW5lclN0eWxlIiwiaGVhZGVySGVpZ2h0IiwiZmlsdGVyUm93SGVpZ2h0Iiwicm93SGVpZ2h0Iiwib25Db2x1bW5SZXNpemVFbmRDYWxsYmFjayIsImhhbmRsZVJvd0NsaWNrIiwic2Nyb2xsVG9Db2x1bW4iLCJzY3JvbGxUb3AiLCJnZXRTY3JvbGxUb1JvdyIsIm9uUm93RG91YmxlQ2xpY2siLCJvbk1vdXNlRG93biIsIm9uUm93TW91c2VFbnRlciIsIm9uUm93TW91c2VMZWF2ZSIsIm9uU2Nyb2xsU3RhcnQiLCJvblNjcm9sbEVuZCIsImdldFJvd0NsYXNzTmFtZSIsImhhbmRsZVJvd0hlaWdodEdldHRlciIsIm9uQ29udGVudEhlaWdodENoYW5nZSIsImhhbmRsZUNvbnRleHRNZW51IiwicmVuZGVyQ29sdW1ucyIsImNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbCIsInNhdmVDb2x1bW5TZXR0aW5ncyIsImNoaWxkcmVuIiwiUHVyZUNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7QUFDQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsU0FBU0MsR0FBVCxFQUFjQyxJQUFkLFFBQTBCLFdBQTFCO0FBQ0EsU0FBU0MsT0FBVCxRQUF3QixhQUF4QjtBQUNBLFNBQVNDLFVBQVQsRUFBcUJDLGdCQUFnQixJQUFJQyxDQUF6QyxRQUFrRCxZQUFsRDtBQUNBLFNBQVNDLE1BQVQsRUFBaUJDLElBQWpCLFFBQTZCLG9CQUE3QjtBQUNBLE9BQU9DLFVBQVAsTUFBdUIsWUFBdkI7QUFDQSxTQUFTQyxJQUFULFFBQXFCLHlCQUFyQjtBQUNBLE9BQU9DLE9BQVAsTUFBb0IsMkJBQXBCO0FBQ0EsT0FBT0MsUUFBUCxNQUFxQiw0QkFBckI7QUFDQSxPQUFPLDhDQUFQO0FBRUEsT0FBT0Msd0JBQVAsTUFBcUMseUNBQXJDO0FBQ0EsT0FBT0MsVUFBUCxNQUF1Qix5QkFBdkI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLHdCQUF0QjtBQUNBLE9BQU9DLGtCQUFQLE1BQStCLGtDQUEvQjtBQUNBLE9BQU9DLGlCQUFQLE1BQThCLGdDQUE5QjtBQUNBLE9BQU9DLGdCQUFQLE1BQTZCLCtCQUE3QjtBQUNBLE9BQU8sS0FBS0MsZUFBWixNQUFpQyxvQkFBakM7QUFDQSxPQUFPQyxXQUFQLE1BQXdCLDBCQUF4QjtBQUNBLE9BQU9DLG1CQUFQLE1BQWdDLDZDQUFoQztBQUNBLFNBQVNDLFNBQVQsRUFBb0JDLFlBQXBCLFFBQXdDLGtCQUF4QztBQUNBLFNBQVNDLFNBQVQsUUFBMEIsc0JBQTFCO0FBQ0EsT0FBT0MsVUFBUCxNQUF1Qix3QkFBdkI7QUFDQSxPQUFPQyxXQUFQLE1BQXdCLDBCQUF4QjtBQUNBLE9BQU9DLEtBQVAsTUFBa0Isa0JBQWxCO0FBQ0EsT0FBT0MsaUJBQVAsTUFBOEIsaUNBQTlCO0FBQ0EsT0FBTywyQkFBUDs7QUFFQSxJQUFNQyxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLENBQUNDLEtBQUQsRUFBUUMsUUFBUixFQUFxQjtBQUMzQyxNQUFNQyxJQUFJLEdBQUdELFFBQVEsQ0FBQ0UsSUFBdEI7QUFDQSxTQUFPO0FBQ0xDLElBQUFBLE1BQU0sRUFBRUosS0FBSyxDQUFDSyxRQUFOLENBQWVDLEtBQWYsQ0FBcUIsQ0FBQ0osSUFBSSxDQUFDSyxFQUFOLEVBQVUsU0FBVixFQUFxQixRQUFyQixDQUFyQixFQUFxRCxJQUFyRCxDQURIO0FBRUxDLElBQUFBLFNBQVMsRUFBRVIsS0FBSyxDQUFDSyxRQUFOLENBQWVDLEtBQWYsQ0FBcUIsQ0FBQ0osSUFBSSxDQUFDSyxFQUFOLEVBQVUsU0FBVixFQUFxQixXQUFyQixDQUFyQixFQUF3RCxLQUF4RCxDQUZOO0FBR0xFLElBQUFBLFVBQVUsRUFBRVQsS0FBSyxDQUFDSyxRQUFOLENBQWVDLEtBQWYsQ0FBcUIsQ0FBQ0osSUFBSSxDQUFDSyxFQUFOLEVBQVUsU0FBVixFQUFxQixZQUFyQixDQUFyQixFQUF5RCxLQUF6RCxDQUhQO0FBSUxHLElBQUFBLFdBQVcsRUFBRVYsS0FBSyxDQUFDSyxRQUFOLENBQWVDLEtBQWYsQ0FBcUIsQ0FBQ0osSUFBSSxDQUFDSyxFQUFOLEVBQVUsUUFBVixFQUFvQixlQUFwQixFQUFxQyxhQUFyQyxDQUFyQixFQUEwRSxLQUExRSxDQUpSO0FBS0xJLElBQUFBLHlCQUF5QixFQUFFWCxLQUFLLENBQUNLLFFBQU4sQ0FBZUMsS0FBZixDQUN6QixDQUFDSixJQUFJLENBQUNLLEVBQU4sRUFBVSxTQUFWLEVBQXFCLHFCQUFyQixFQUE0QyxNQUE1QyxDQUR5QixFQUV6QixLQUZ5QixDQUx0QjtBQVNMSyxJQUFBQSxVQUFVLEVBQUVaLEtBQUssQ0FBQ0ssUUFBTixDQUFlQyxLQUFmLENBQXFCLENBQUNKLElBQUksQ0FBQ0ssRUFBTixFQUFVLFFBQVYsRUFBb0IsYUFBcEIsRUFBbUMsWUFBbkMsQ0FBckIsRUFBdUUsSUFBdkUsQ0FUUDtBQVVMTSxJQUFBQSxTQUFTLEVBQUViLEtBQUssQ0FBQ0ssUUFBTixDQUFlQyxLQUFmLENBQXFCLENBQUNKLElBQUksQ0FBQ0ssRUFBTixFQUFVLFFBQVYsRUFBb0IsYUFBcEIsRUFBbUMsV0FBbkMsQ0FBckIsRUFBc0UsSUFBdEUsQ0FWTjtBQVdMTyxJQUFBQSxjQUFjLEVBQUVkLEtBQUssQ0FBQ0ssUUFBTixDQUFlQyxLQUFmLENBQXFCLENBQUNKLElBQUksQ0FBQ0ssRUFBTixFQUFVLFFBQVYsRUFBb0IsZ0JBQXBCLENBQXJCLEVBQTREbkMsSUFBSSxFQUFoRSxDQVhYO0FBWUwyQyxJQUFBQSxZQUFZLEVBQUVmLEtBQUssQ0FBQ0ssUUFBTixDQUFlQyxLQUFmLENBQXFCLENBQUNKLElBQUksQ0FBQ0ssRUFBTixFQUFVLFFBQVYsRUFBb0IsY0FBcEIsQ0FBckIsRUFBMERwQyxHQUFHLEVBQTdELENBWlQ7QUFhTDZDLElBQUFBLFlBQVksRUFBRWhCLEtBQUssQ0FBQ0ssUUFBTixDQUFlQyxLQUFmLENBQXFCLENBQUNKLElBQUksQ0FBQ0ssRUFBTixFQUFVLGNBQVYsQ0FBckIsRUFBZ0RwQyxHQUFHLEVBQW5ELENBYlQ7QUFjTDhDLElBQUFBLGFBQWEsRUFBRWpCLEtBQUssQ0FBQ0ssUUFBTixDQUFlQyxLQUFmLENBQXFCLENBQUNKLElBQUksQ0FBQ0ssRUFBTixFQUFVLGVBQVYsQ0FBckIsRUFBaURuQyxJQUFJLEVBQXJELENBZFY7QUFlTDhDLElBQUFBLElBQUksRUFBRWxCLEtBQUssQ0FBQ0ssUUFBTixDQUFlQyxLQUFmLENBQXFCLENBQUNKLElBQUksQ0FBQ0ssRUFBTixFQUFVLE1BQVYsQ0FBckIsRUFBd0NuQyxJQUFJLEVBQTVDLENBZkQ7QUFnQkwrQyxJQUFBQSxRQUFRLEVBQUVuQixLQUFLLENBQUNLLFFBQU4sQ0FBZUMsS0FBZixDQUFxQixDQUFDSixJQUFJLENBQUNLLEVBQU4sRUFBVSxVQUFWLENBQXJCLEVBQTRDcEMsR0FBRyxFQUEvQyxDQWhCTDtBQWlCTGlELElBQUFBLFVBQVUsRUFBRXBCLEtBQUssQ0FBQ0ssUUFBTixDQUFlQyxLQUFmLENBQXFCLENBQUNKLElBQUksQ0FBQ0ssRUFBTixFQUFVLFlBQVYsQ0FBckIsRUFBOENuQyxJQUFJLEVBQWxELENBakJQO0FBa0JMaUQsSUFBQUEsVUFBVSxFQUFFckIsS0FBSyxDQUFDSyxRQUFOLENBQWVDLEtBQWYsQ0FBcUIsQ0FBQ0osSUFBSSxDQUFDSyxFQUFOLEVBQVUsUUFBVixFQUFvQixlQUFwQixFQUFxQyxZQUFyQyxDQUFyQixFQUF5RXBDLEdBQUcsRUFBNUUsQ0FsQlA7QUFtQkxtRCxJQUFBQSxZQUFZLEVBQUV0QixLQUFLLENBQUNLLFFBQU4sQ0FBZUMsS0FBZixDQUFxQixDQUFDSixJQUFJLENBQUNLLEVBQU4sRUFBVSxjQUFWLENBQXJCLEVBQWdEcEMsR0FBRyxFQUFuRCxDQW5CVDtBQW9CTG9ELElBQUFBLGtCQUFrQixFQUFFdkIsS0FBSyxDQUFDSyxRQUFOLENBQWVDLEtBQWYsQ0FBcUIsQ0FBQ0osSUFBSSxDQUFDSyxFQUFOLEVBQVUsb0JBQVYsQ0FBckIsRUFBc0RwQyxHQUFHLEVBQXpELENBcEJmO0FBcUJMcUQsSUFBQUEsV0FBVyxFQUFFeEIsS0FBSyxDQUFDSyxRQUFOLENBQWVDLEtBQWYsQ0FBcUIsQ0FBQ0osSUFBSSxDQUFDSyxFQUFOLEVBQVUsU0FBVixDQUFyQixFQUEyQ25DLElBQUksRUFBL0MsRUFBbURxRCxJQXJCM0Q7QUFzQkxDLElBQUFBLFFBQVEsRUFBRTdCLEtBQUssQ0FBQzhCLFdBQU4sQ0FBa0J6QixJQUFsQixFQUF3QkYsS0FBSyxDQUFDNEIsSUFBOUIsQ0F0Qkw7QUF1QkxDLElBQUFBLE1BQU0sRUFBRWhDLEtBQUssQ0FBQ2lDLFNBQU4sQ0FBZ0I1QixJQUFoQixFQUFzQkYsS0FBSyxDQUFDNEIsSUFBNUIsQ0F2Qkg7QUF3QkxHLElBQUFBLFVBQVUsRUFBRWxDLEtBQUssQ0FBQ21DLGFBQU4sQ0FBb0I5QixJQUFwQixFQUEwQkYsS0FBSyxDQUFDNEIsSUFBaEMsQ0F4QlA7QUF5QkxLLElBQUFBLGlCQUFpQixFQUFFcEMsS0FBSyxDQUFDcUMsb0JBQU4sQ0FBMkJoQyxJQUEzQixFQUFpQ0YsS0FBSyxDQUFDNEIsSUFBdkMsQ0F6QmQ7QUEwQkxPLElBQUFBLGdCQUFnQixFQUFFdEMsS0FBSyxDQUFDdUMsbUJBQU4sQ0FBMEJsQyxJQUExQixFQUFnQ0YsS0FBSyxDQUFDNEIsSUFBdEMsQ0ExQmI7QUEyQkxTLElBQUFBLHFCQUFxQixFQUFFckMsS0FBSyxDQUFDSyxRQUFOLENBQWVpQyxHQUFmLENBQW1CLGNBQW5CLEVBQW1DLENBQW5DLENBM0JsQjtBQTJCeUQ7QUFDOURDLElBQUFBLFNBQVMsRUFBRXZDLEtBQUssQ0FBQ0ssUUFBTixDQUFlQyxLQUFmLENBQXFCLENBQUNKLElBQUksQ0FBQ0ssRUFBTixFQUFVLFNBQVYsRUFBcUIsV0FBckIsQ0FBckIsRUFBd0RwQyxHQUFHLEVBQTNEO0FBNUJOLEdBQVA7QUE4QkQsQ0FoQ0Q7O0FBa0NBLElBQU1xRSxrQkFBa0IsR0FBR25ELGVBQTNCO0lBUU1vRCxRLFdBSkxwRSxPQUFPLENBQ04wQixlQURNLEVBRU55QyxrQkFGTSxDLEVBRlA3QyxVLFVBQ0FyQixVOzs7OztBQVVDLG9CQUFZb0UsTUFBWixFQUFtQjtBQUFBOztBQUNqQiw0Q0FBTUEsTUFBTjs7QUFEaUIsc0VBcUJELFlBQU07QUFDdEIsVUFBSSxNQUFLQSxLQUFMLENBQVdDLGdCQUFmLEVBQWlDO0FBQy9CLGNBQUtDLFFBQUwsQ0FBYztBQUNaQyxVQUFBQSxlQUFlLEVBQUU7QUFETCxTQUFkO0FBR0Q7O0FBQ0RDLE1BQUFBLFFBQVEsQ0FBQ0MsbUJBQVQsQ0FBNkIsT0FBN0IsRUFBc0MsTUFBS0MsZUFBM0M7QUFDRCxLQTVCa0I7O0FBQUEsZ0ZBOEJTLFVBQUNDLGNBQUQsRUFBaUJDLFNBQWpCLEVBQStCO0FBQ3pELFlBQUtSLEtBQUwsQ0FBV1MsWUFBWCxDQUF3QixNQUFLVCxLQUFMLENBQVd2QyxJQUFuQyxFQUF5QytDLFNBQXpDLEVBQW9ERCxjQUFwRDtBQUNELEtBaENrQjs7QUFBQSxvRUF3Q0gsVUFBQ0csUUFBRCxFQUFXQyxHQUFYLEVBQWdCQyxDQUFoQixFQUFtQkMsTUFBbkIsRUFBc0M7QUFBQSxVQUFuQkEsTUFBbUI7QUFBbkJBLFFBQUFBLE1BQW1CLEdBQVYsS0FBVTtBQUFBOztBQUNwRCxVQUFJLE1BQUtiLEtBQUwsQ0FBV2MscUJBQWYsRUFBc0M7QUFDcEMsWUFBTUMsUUFBUSxHQUFHRixNQUFNLEdBQUcsTUFBS0csY0FBUixHQUF5QixNQUFLRCxRQUFyRDtBQUNBLFlBQU1FLFNBQVMsR0FBRyxDQUFDakUsU0FBUyxDQUFDa0UsSUFBWCxFQUFpQmxFLFNBQVMsQ0FBQ21FLEVBQTNCLEVBQStCbkUsU0FBUyxDQUFDb0UsSUFBekMsRUFBK0NwRSxTQUFTLENBQUNxRSxLQUF6RCxDQUFsQjtBQUZvQywwQkFLaEMsTUFBS3JCLEtBTDJCO0FBQUEsWUFJbENzQixPQUprQyxlQUlsQ0EsT0FKa0M7QUFBQSxZQUl6QmxELGNBSnlCLGVBSXpCQSxjQUp5QjtBQUFBLFlBSVRYLElBSlMsZUFJVEEsSUFKUztBQUFBLFlBSUhlLElBSkcsZUFJSEEsSUFKRztBQUFBLFlBSUcrQyxrQkFKSCxlQUlHQSxrQkFKSDtBQU1wQyxZQUFNQyxXQUFXLEdBQUdyRSxLQUFLLENBQUNpQixjQUFOLENBQXFCa0QsT0FBckIsRUFBOEJsRCxjQUE5QixDQUFwQjs7QUFDQSxZQUFNcUQsbUJBQW1CLEdBQUcsU0FBdEJBLG1CQUFzQixDQUFBQyxDQUFDO0FBQUEsaUJBQUl2RSxLQUFLLENBQUN3RSxZQUFOLENBQW1CSCxXQUFXLENBQUNFLENBQUQsQ0FBOUIsQ0FBSjtBQUFBLFNBQTdCOztBQUNBLFlBQU1FLFFBQVEsR0FBR3BELElBQUksQ0FBQ08sSUFBdEI7QUFDQSxZQUFNeUIsU0FBUyxHQUFHckQsS0FBSyxDQUFDd0UsWUFBTixDQUFtQmhCLEdBQW5CLENBQWxCO0FBQ0EsWUFBSWtCLFdBQVcsR0FBR2QsUUFBUSxDQUFJdEQsSUFBSSxDQUFDSSxFQUFULFNBQWUyQyxTQUFmLFNBQTRCRSxRQUE1QixDQUExQjtBQUNBLFlBQUlvQixLQUFLLEdBQUcsSUFBWjs7QUFFQSxZQUFNQyxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLEdBQU07QUFDNUIsY0FBSUYsV0FBVyxDQUFDRyxJQUFaLEtBQXFCLE1BQXpCLEVBQWlDLE9BQU8sSUFBUDtBQUNqQyxpQkFBT0gsV0FBVyxDQUFDSSxjQUFaLEtBQStCLENBQXRDO0FBQ0QsU0FIRDs7QUFLQSxZQUFNQyxhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLEdBQU07QUFDMUIsY0FBSUwsV0FBVyxDQUFDRyxJQUFaLEtBQXFCLE1BQXpCLEVBQWlDLE9BQU8sSUFBUDtBQUNqQyxpQkFBT0gsV0FBVyxDQUFDTSxZQUFaLEtBQTZCTixXQUFXLENBQUNPLEtBQVosQ0FBa0JDLE1BQXREO0FBQ0QsU0FIRCxDQWxCb0MsQ0F1QnBDOzs7QUFDQSxZQUFJUixXQUFXLEtBQUtBLFdBQVcsQ0FBQ1MsU0FBWixJQUF5QixPQUFPVCxXQUFXLENBQUNVLE1BQW5CLEtBQThCLFFBQTVELENBQWYsRUFBc0Y7QUFDcEZULFVBQUFBLEtBQUssR0FBR0QsV0FBUjtBQUNBQSxVQUFBQSxXQUFXLEdBQUcsTUFBS1csWUFBTCxDQUFrQlYsS0FBbEIsQ0FBZDtBQUNELFNBM0JtQyxDQTZCcEM7OztBQUNBLFlBQUliLFNBQVMsQ0FBQ3dCLFFBQVYsQ0FBbUI3QixDQUFDLENBQUM4QixPQUFyQixLQUFpQ2IsV0FBVyxDQUFDRyxJQUFaLEtBQXFCLFFBQTFELEVBQW9FcEIsQ0FBQyxDQUFDK0IsY0FBRjs7QUFDcEUsZ0JBQVEvQixDQUFDLENBQUM4QixPQUFWO0FBQ0UsZUFBSzFGLFNBQVMsQ0FBQzRGLEtBQWY7QUFDQSxlQUFLNUYsU0FBUyxDQUFDNkYsR0FBZjtBQUFvQjtBQUNsQixrQkFBSWhDLE1BQU0sSUFBSUQsQ0FBQyxDQUFDOEIsT0FBRixLQUFjMUYsU0FBUyxDQUFDNEYsS0FBdEMsRUFBNkM7QUFDM0Msc0JBQUs1QyxLQUFMLENBQVc4QyxVQUFYLENBQXNCckYsSUFBdEIsRUFBNEJOLEtBQUssQ0FBQzRGLHNCQUFOLENBQTZCekIsT0FBN0IsQ0FBNUI7O0FBQ0Esc0JBQUswQixpQkFBTCxHQUF5QixJQUF6QjtBQUNBO0FBQ0Q7O0FBQ0RuQixjQUFBQSxXQUFXLENBQUNVLE1BQVo7QUFDQTtBQUNEOztBQUNELGVBQUt2RixTQUFTLENBQUNrRSxJQUFmO0FBQXFCO0FBQ25CLGtCQUFJK0IsV0FBVyxHQUFHbEMsUUFBUSxDQUFJdEQsSUFBSSxDQUFDSSxFQUFULFNBQWUyQyxTQUFmLFVBQTRCRSxRQUFRLEdBQUcsQ0FBdkMsRUFBMUIsQ0FEbUIsQ0FHbkI7O0FBQ0Esa0JBQUlvQixLQUFLLElBQUlBLEtBQUssQ0FBQ1EsU0FBZixJQUE0QixDQUFDUixLQUFLLENBQUNRLFNBQU4sQ0FBZ0JoRixLQUFoQixDQUFzQjRGLFVBQXZELEVBQW1FO0FBQ2pFdEMsZ0JBQUFBLENBQUMsQ0FBQytCLGNBQUY7QUFDQSxvQkFBSSxDQUFDTSxXQUFMLEVBQWtCO0FBQ2xCQSxnQkFBQUEsV0FBVyxHQUFHLE1BQUtULFlBQUwsQ0FBa0JTLFdBQWxCLENBQWQ7QUFDRDs7QUFDRCxvQkFBS0UsYUFBTCxDQUFtQkYsV0FBbkIsRUFBZ0N2QyxRQUFRLEdBQUcsQ0FBM0MsRUFBOEMsQ0FBQyxDQUEvQzs7QUFDQTtBQUNEOztBQUNELGVBQUsxRCxTQUFTLENBQUNtRSxFQUFmO0FBQW1CO0FBQ2pCLGtCQUFJOEIsWUFBVyxHQUFHbEMsUUFBUSxDQUFJdEQsSUFBSSxDQUFDSSxFQUFULFNBQWUyQyxTQUFmLFVBQTRCRSxRQUFRLEdBQUcsQ0FBdkMsRUFBMUIsQ0FEaUIsQ0FHakI7O0FBQ0Esa0JBQUlvQixLQUFLLElBQUlBLEtBQUssQ0FBQ1EsU0FBZixJQUE0QixDQUFDUixLQUFLLENBQUNRLFNBQU4sQ0FBZ0JoRixLQUFoQixDQUFzQjRGLFVBQXZELEVBQW1FO0FBQ2pFdEMsZ0JBQUFBLENBQUMsQ0FBQytCLGNBQUY7QUFDQSxvQkFBSSxDQUFDTSxZQUFMLEVBQWtCO0FBQ2xCQSxnQkFBQUEsWUFBVyxHQUFHLE1BQUtULFlBQUwsQ0FBa0JTLFlBQWxCLENBQWQ7QUFDRDs7QUFDRCxvQkFBS0UsYUFBTCxDQUFtQkYsWUFBbkIsRUFBZ0N2QyxRQUFRLEdBQUcsQ0FBM0MsRUFBOEMsQ0FBQyxDQUEvQzs7QUFDQTtBQUNEOztBQUNELGVBQUsxRCxTQUFTLENBQUNvRyxHQUFmO0FBQ0EsZUFBS3BHLFNBQVMsQ0FBQ3FFLEtBQWY7QUFDQSxlQUFLckUsU0FBUyxDQUFDb0UsSUFBZjtBQUFxQjtBQUNuQixrQkFBSVIsQ0FBQyxDQUFDOEIsT0FBRixLQUFjMUYsU0FBUyxDQUFDcUUsS0FBeEIsSUFBaUMsQ0FBQ2EsYUFBYSxFQUFuRCxFQUF1RDtBQUN2RCxrQkFBSXRCLENBQUMsQ0FBQzhCLE9BQUYsS0FBYzFGLFNBQVMsQ0FBQ29FLElBQXhCLElBQWdDLENBQUNXLGVBQWUsRUFBcEQsRUFBd0Q7QUFFeERuQixjQUFBQSxDQUFDLENBQUMrQixjQUFGO0FBRUEsa0JBQUlVLFNBQVMsR0FBRzdCLFdBQVcsQ0FBQzhCLFNBQVosQ0FBc0IsVUFBQUMsQ0FBQztBQUFBLHVCQUFJQSxDQUFDLENBQUNDLFlBQUYsQ0FBZUMsSUFBZixDQUFvQixHQUFwQixNQUE2QmpELFNBQWpDO0FBQUEsZUFBdkIsQ0FBaEI7O0FBQ0Esa0JBQUk2QyxTQUFTLEtBQUssQ0FBQyxDQUFuQixFQUFzQjtBQUNwQixvQkFBSUssUUFBUSxHQUFHLElBQWY7QUFDQSxvQkFBSVQsYUFBVyxHQUFHLElBQWxCO0FBQ0Esb0JBQUlVLE1BQU0sR0FBR2pELFFBQWI7O0FBQ0EsdUJBQU9nRCxRQUFQLEVBQWlCO0FBQ2Y7QUFDQSxzQkFBSTlDLENBQUMsQ0FBQzhCLE9BQUYsS0FBYzFGLFNBQVMsQ0FBQ29FLElBQXhCLElBQWlDUixDQUFDLENBQUM4QixPQUFGLEtBQWMxRixTQUFTLENBQUNvRyxHQUF4QixJQUErQnhDLENBQUMsQ0FBQ2dELFFBQXRFLEVBQWlGO0FBQy9FLHdCQUFJUCxTQUFTLEdBQUcsQ0FBWixJQUFpQixDQUFyQixFQUF3QjtBQUN0QkEsc0JBQUFBLFNBQVMsSUFBSSxDQUFiO0FBQ0QscUJBRkQsTUFFTyxJQUFJTSxNQUFNLEdBQUcsQ0FBVCxJQUFjLENBQWxCLEVBQXFCO0FBQzFCTixzQkFBQUEsU0FBUyxHQUFHN0IsV0FBVyxDQUFDYSxNQUFaLEdBQXFCLENBQWpDO0FBQ0FzQixzQkFBQUEsTUFBTSxJQUFJLENBQVY7QUFDRCxxQkFITSxNQUdBO0FBQ0w7QUFDRDtBQUNGLG1CQVRELE1BU087QUFDTDtBQUNBLHdCQUFJTixTQUFTLEdBQUcsQ0FBWixHQUFnQjdCLFdBQVcsQ0FBQ2EsTUFBaEMsRUFBd0M7QUFDdENnQixzQkFBQUEsU0FBUyxJQUFJLENBQWI7QUFDRCxxQkFGRCxNQUVPLElBQUlNLE1BQU0sR0FBRyxDQUFULEdBQWEvQixRQUFqQixFQUEyQjtBQUNoQ3lCLHNCQUFBQSxTQUFTLEdBQUcsQ0FBWjtBQUNBTSxzQkFBQUEsTUFBTSxJQUFJLENBQVY7QUFDRCxxQkFITSxNQUdBLElBQUlBLE1BQU0sR0FBRyxDQUFULEtBQWUvQixRQUFuQixFQUE2QjtBQUNsQztBQUNBLDBCQUFJTCxrQkFBa0IsSUFBSVgsQ0FBQyxDQUFDOEIsT0FBRixLQUFjMUYsU0FBUyxDQUFDb0csR0FBbEQsRUFBdUQ3QixrQkFBa0IsQ0FBQ1gsQ0FBRCxDQUFsQjtBQUN2RDtBQUNEO0FBQ0Y7O0FBRURxQyxrQkFBQUEsYUFBVyxHQUFHbEMsUUFBUSxDQUFJdEQsSUFBSSxDQUFDSSxFQUFULFNBQWU0RCxtQkFBbUIsQ0FBQzRCLFNBQUQsQ0FBbEMsU0FBaURNLE1BQWpELENBQXRCLENBekJlLENBMkJmOztBQUNBLHNCQUFJLENBQUNWLGFBQUQsSUFBZ0JyQyxDQUFDLENBQUM4QixPQUFGLEtBQWMxRixTQUFTLENBQUNvRSxJQUE1QyxFQUFrRDtBQUNoRDtBQUNBLHdCQUFJaUMsU0FBUyxJQUFJN0IsV0FBVyxDQUFDYSxNQUE3QixFQUFxQztBQUNuQyw2QkFBT2dCLFNBQVMsSUFBSTdCLFdBQVcsQ0FBQ2EsTUFBekIsSUFBbUMsQ0FBQ1ksYUFBM0MsRUFBd0Q7QUFDdERBLHdCQUFBQSxhQUFXLEdBQUdsQyxRQUFRLENBQUl0RCxJQUFJLENBQUNJLEVBQVQsU0FBZTRELG1CQUFtQixDQUFDNEIsU0FBRCxDQUFsQyxTQUFpRE0sTUFBakQsQ0FBdEI7QUFDQU4sd0JBQUFBLFNBQVMsSUFBSSxDQUFiLENBRnNELENBSXREO0FBQ0E7O0FBQ0EsNEJBQUksQ0FBQ0osYUFBRCxJQUFnQkksU0FBUyxLQUFLN0IsV0FBVyxDQUFDYSxNQUE5QyxFQUFzRDtBQUNwRDtBQUNBLDhCQUFJc0IsTUFBTSxHQUFHLENBQVQsS0FBZS9CLFFBQW5CLEVBQTZCO0FBQzNCLGdDQUFJTCxrQkFBa0IsSUFBSVgsQ0FBQyxDQUFDOEIsT0FBRixLQUFjMUYsU0FBUyxDQUFDb0csR0FBbEQsRUFBdUQ7QUFDckQ3Qiw4QkFBQUEsa0JBQWtCLENBQUNYLENBQUQsQ0FBbEI7QUFDRDs7QUFDRDtBQUNEOztBQUVEeUMsMEJBQUFBLFNBQVMsR0FBRyxDQUFaO0FBQ0FNLDBCQUFBQSxNQUFNLElBQUksQ0FBVjtBQUNBViwwQkFBQUEsYUFBVyxHQUFHbEMsUUFBUSxDQUFJdEQsSUFBSSxDQUFDSSxFQUFULFNBQWU0RCxtQkFBbUIsQ0FBQzRCLFNBQUQsQ0FBbEMsU0FBaURNLE1BQWpELENBQXRCO0FBQ0Q7QUFDRjtBQUNGLHFCQXZCK0MsQ0F3QmhEOztBQUNELG1CQXpCRCxNQXlCTyxJQUFJLENBQUNWLGFBQUQsSUFBZ0JyQyxDQUFDLENBQUM4QixPQUFGLEtBQWMxRixTQUFTLENBQUNvRSxJQUE1QyxFQUFrRDtBQUN2RCwyQkFBT2lDLFNBQVMsR0FBRyxDQUFaLElBQWlCLENBQUNKLGFBQXpCLEVBQXNDO0FBQ3BDSSxzQkFBQUEsU0FBUyxJQUFJLENBQWI7QUFDQUosc0JBQUFBLGFBQVcsR0FBR2xDLFFBQVEsQ0FBSXRELElBQUksQ0FBQ0ksRUFBVCxTQUFlNEQsbUJBQW1CLENBQUM0QixTQUFELENBQWxDLFNBQWlETSxNQUFqRCxDQUF0QjtBQUNELHFCQUpzRCxDQUt2RDtBQUNBOzs7QUFDQSx3QkFBSUEsTUFBTSxHQUFHLENBQVQsSUFBYyxDQUFDVixhQUFuQixFQUFnQztBQUM5Qkksc0JBQUFBLFNBQVMsR0FBRzdCLFdBQVcsQ0FBQ2EsTUFBWixHQUFxQixDQUFqQztBQUNBc0Isc0JBQUFBLE1BQU0sSUFBSSxDQUFWO0FBQ0FWLHNCQUFBQSxhQUFXLEdBQUdsQyxRQUFRLENBQUl0RCxJQUFJLENBQUNJLEVBQVQsU0FBZTRELG1CQUFtQixDQUFDNEIsU0FBRCxDQUFsQyxTQUFpRE0sTUFBakQsQ0FBdEI7QUFDRDtBQUNGOztBQUNERCxrQkFBQUEsUUFBUSxHQUFHVCxhQUFXLEdBQUdBLGFBQVcsQ0FBQ1MsUUFBZixHQUEwQixLQUFoRDtBQUNEOztBQUNELG9CQUFJLENBQUNBLFFBQUQsSUFBYVQsYUFBakIsRUFBOEI7QUFDNUIsc0JBQUksT0FBT0EsYUFBVyxDQUFDVixNQUFuQixLQUE4QixRQUE5QixJQUEwQ1UsYUFBVyxDQUFDWCxTQUExRCxFQUFxRTtBQUNuRVcsb0JBQUFBLGFBQVcsR0FBRyxNQUFLVCxZQUFMLENBQWtCUyxhQUFsQixDQUFkO0FBQ0Q7O0FBQ0Qsd0JBQUtFLGFBQUwsQ0FBbUJGLGFBQW5CLEVBQWdDVSxNQUFoQyxFQUF3Q04sU0FBeEM7QUFDRDtBQUNGOztBQUNEO0FBQ0Q7O0FBQ0Q7QUFDRTtBQTlISjtBQWdJRDtBQUNGLEtBek1rQjs7QUFBQSx3RUEyTUMsVUFBQzNDLFFBQUQsRUFBV0MsR0FBWDtBQUFBLGFBQW1CLFVBQUNDLENBQUQsRUFBTztBQUM1QyxjQUFLaUQsYUFBTCxDQUFtQm5ELFFBQW5CLEVBQTZCQyxHQUE3QixFQUFrQ0MsQ0FBbEM7QUFDRCxPQUZtQjtBQUFBLEtBM01EOztBQUFBLDBFQStNRyxVQUFDRixRQUFELEVBQVdDLEdBQVg7QUFBQSxhQUFtQixVQUFDQyxDQUFELEVBQU87QUFDOUMsY0FBS2lELGFBQUwsQ0FBbUJuRCxRQUFuQixFQUE2QkMsR0FBN0IsRUFBa0NDLENBQWxDLEVBQXFDLElBQXJDO0FBQ0QsT0FGcUI7QUFBQSxLQS9NSDs7QUFBQSw4RUFtTk8sVUFBQ0QsR0FBRCxFQUFNbUQsV0FBTjtBQUFBLGFBQXNCLFVBQUNDLFdBQUQsRUFBaUI7QUFDL0QsWUFBSUMsUUFBSixDQUQrRCxDQUUvRDs7QUFDQSxZQUFJRCxXQUFKLEVBQWlCO0FBQ2YsY0FBSUEsV0FBVyxDQUFDRSxNQUFaLEtBQXVCQyxTQUEzQixFQUFzQztBQUNwQ0YsWUFBQUEsUUFBUSxHQUFHRCxXQUFXLENBQUNFLE1BQVosQ0FBbUI3QixLQUE5QjtBQUNELFdBRkQsTUFFTyxJQUFJMkIsV0FBVyxDQUFDM0IsS0FBWixLQUFzQjhCLFNBQTFCLEVBQXFDO0FBQzFDRixZQUFBQSxRQUFRLEdBQUdELFdBQVcsQ0FBQzNCLEtBQXZCO0FBQ0QsV0FGTSxNQUVBO0FBQ0w0QixZQUFBQSxRQUFRLEdBQUdELFdBQVg7QUFDRDtBQUNGOztBQUNELFlBQU0zQixLQUFLLEdBQUcwQixXQUFXLENBQUNFLFFBQUQsQ0FBekI7O0FBQ0EsY0FBS2hFLEtBQUwsQ0FBV21FLHFCQUFYLENBQWlDLE1BQUtuRSxLQUFMLENBQVd2QyxJQUE1QyxFQUFrRCxNQUFLdUMsS0FBTCxDQUFXc0IsT0FBN0QsRUFBc0VYLEdBQXRFLEVBQTJFeUIsS0FBM0U7QUFDRCxPQWR5QjtBQUFBLEtBbk5QOztBQUFBLGlGQW1PVSxVQUFBekIsR0FBRztBQUFBLGFBQUksWUFBTTtBQUN4QyxZQUFNSCxTQUFTLEdBQUdyRCxLQUFLLENBQUN3RSxZQUFOLENBQW1CaEIsR0FBbkIsQ0FBbEI7QUFEd0MsMkJBRVMsTUFBS1gsS0FGZDtBQUFBLFlBRWhDc0IsT0FGZ0MsZ0JBRWhDQSxPQUZnQztBQUFBLFlBRXZCNkMscUJBRnVCLGdCQUV2QkEscUJBRnVCO0FBQUEsWUFFQTFHLElBRkEsZ0JBRUFBLElBRkE7QUFHeEMsWUFBTTJHLGVBQWUsR0FBRyxNQUFLOUcsS0FBTCxDQUFXa0QsU0FBWCxDQUF4Qjs7QUFDQSxZQUFJNEQsZUFBSixFQUFxQjtBQUFBOztBQUNuQkQsVUFBQUEscUJBQXFCLENBQUMxRyxJQUFELEVBQU82RCxPQUFQLEVBQWdCWCxHQUFoQixFQUFxQnlELGVBQXJCLENBQXJCOztBQUNBLGdCQUFLbEUsUUFBTCxzQ0FBaUJNLFNBQWpCLElBQTZCMEQsU0FBN0I7QUFDRDtBQUNGLE9BUitCO0FBQUEsS0FuT2I7O0FBQUEsbUZBNk9ZLFVBQUN2RCxHQUFELEVBQU1tRCxXQUFOO0FBQUEsYUFBc0IsVUFBQ3RGLElBQUQsRUFBZTtBQUFBLFlBQWRBLElBQWM7QUFBZEEsVUFBQUEsSUFBYyxHQUFQLEVBQU87QUFBQTs7QUFDbEU7QUFDQSxZQUFNZ0MsU0FBUyxHQUFHckQsS0FBSyxDQUFDd0UsWUFBTixDQUFtQmhCLEdBQW5CLENBQWxCO0FBQ0EsWUFBTXlELGVBQWUsR0FBRyxNQUFLOUcsS0FBTCxDQUFXa0QsU0FBWCxDQUF4Qjs7QUFDQSxZQUFJLENBQUM0RCxlQUFELElBQW9CNUYsSUFBSSxDQUFDNkQsTUFBTCxLQUFnQixDQUF4QyxFQUEyQztBQUN6QztBQUR5Qyw2QkFFUSxNQUFLckMsS0FGYjtBQUFBLGNBRWpDc0IsT0FGaUMsZ0JBRWpDQSxPQUZpQztBQUFBLGNBRXhCNkMscUJBRndCLGdCQUV4QkEscUJBRndCO0FBQUEsY0FFRDFHLElBRkMsZ0JBRURBLElBRkM7QUFHekMwRyxVQUFBQSxxQkFBcUIsQ0FBQzFHLElBQUQsRUFBTzZELE9BQVAsRUFBZ0JYLEdBQWhCLEVBQXFCbkMsSUFBckIsQ0FBckI7QUFDRCxTQUpELE1BSU87QUFBQTs7QUFDTCxjQUFNNEQsS0FBSyxHQUFHMEIsV0FBVyxDQUFDdEYsSUFBRCxDQUF6Qjs7QUFDQSxnQkFBSzBCLFFBQUwsd0NBQWlCTSxTQUFqQixJQUE2QjRCLEtBQTdCO0FBQ0Q7QUFDRixPQVo4QjtBQUFBLEtBN09aOztBQUFBLDhFQTJQTyxVQUFDMUIsUUFBRCxFQUFXQyxHQUFYLEVBQWdCbUQsV0FBaEI7QUFBQSxhQUFnQyxVQUFDQyxXQUFELEVBQWlCO0FBQUEsMkJBQ2pDLE1BQUsvRCxLQUQ0QjtBQUFBLFlBQ2pFcUUscUJBRGlFLGdCQUNqRUEscUJBRGlFO0FBQUEsWUFDMUM1RyxJQUQwQyxnQkFDMUNBLElBRDBDO0FBRXpFLFlBQUl1RyxRQUFKLENBRnlFLENBR3pFOztBQUNBLFlBQUlELFdBQUosRUFBaUI7QUFDZixjQUFJQSxXQUFXLENBQUNFLE1BQVosS0FBdUJDLFNBQTNCLEVBQXNDO0FBQ3BDRixZQUFBQSxRQUFRLEdBQUdELFdBQVcsQ0FBQ0UsTUFBWixDQUFtQjdCLEtBQTlCO0FBQ0QsV0FGRCxNQUVPLElBQUkyQixXQUFXLENBQUMzQixLQUFaLEtBQXNCOEIsU0FBMUIsRUFBcUM7QUFDMUNGLFlBQUFBLFFBQVEsR0FBR0QsV0FBVyxDQUFDM0IsS0FBdkI7QUFDRCxXQUZNLE1BRUE7QUFDTDRCLFlBQUFBLFFBQVEsR0FBR0QsV0FBWDtBQUNEO0FBQ0Y7O0FBQ0QsWUFBTTNCLEtBQUssR0FBRzBCLFdBQVcsQ0FBQ0UsUUFBRCxDQUF6QjtBQWJ5RSxZQWVqRU0sYUFmaUUsR0FlL0MzRCxHQWYrQyxDQWVqRTJELGFBZmlFOztBQWdCekUsZ0JBQVFBLGFBQVI7QUFDRSxlQUFLLFVBQUw7QUFDQSxlQUFLLE9BQUw7QUFDQSxlQUFLLFFBQUw7QUFDQSxlQUFLLE1BQUw7QUFBYTtBQUNYO0FBQ0Q7O0FBQ0Q7QUFBUztBQUNQRCxjQUFBQSxxQkFBcUIsQ0FBQzVHLElBQUQsRUFBT2lELFFBQVAsRUFBaUJDLEdBQUcsQ0FBQzZDLFlBQXJCLEVBQW1DcEIsS0FBbkMsQ0FBckI7QUFDQTtBQUNEO0FBVkg7O0FBWUEsWUFBSXpCLEdBQUcsQ0FBQzRELG1CQUFSLEVBQTZCO0FBQzNCNUQsVUFBQUEsR0FBRyxDQUFDNEQsbUJBQUosQ0FBd0JuQyxLQUF4QixFQUErQnpCLEdBQUcsQ0FBQzZDLFlBQW5DLEVBQWlEOUMsUUFBakQ7QUFDRDs7QUFDRCxZQUFJQyxHQUFHLENBQUM2RCx1QkFBSixJQUErQnBDLEtBQUssS0FBS3pCLEdBQUcsQ0FBQzZELHVCQUFKLENBQTRCQyxVQUF6RSxFQUFxRjtBQUNuRjtBQUNBLGdCQUFLQyx1QkFBTCxDQUNFaEUsUUFERixFQUVFO0FBQUU4QyxZQUFBQSxZQUFZLEVBQUU3QyxHQUFHLENBQUM2RCx1QkFBSixDQUE0Qkc7QUFBNUMsV0FGRixFQUdFLFVBQUFDLENBQUM7QUFBQSxtQkFBSUEsQ0FBSjtBQUFBLFdBSEgsRUFJRWpFLEdBQUcsQ0FBQzZELHVCQUFKLENBQTRCSyxRQUo5QjtBQUtEOztBQUNELFlBQUlsRSxHQUFHLENBQUNtRSxVQUFSLEVBQW9CO0FBQ2xCLGdCQUFLOUUsS0FBTCxDQUFXK0UsdUJBQVgsQ0FDRSxNQUFLL0UsS0FBTCxDQUFXdkMsSUFEYixFQUVFaUQsUUFGRixFQUdFQyxHQUFHLENBQUM2QyxZQUhOLEVBSUVwQixLQUpGLEVBS0V6QixHQUFHLENBQUNtRSxVQUxOO0FBT0Q7QUFDRixPQWhEeUI7QUFBQSxLQTNQUDs7QUFBQSw0RUE2U0ssVUFBQ3BFLFFBQUQsRUFBV0MsR0FBWCxFQUFnQm1ELFdBQWhCO0FBQUEsYUFBZ0MsVUFBQ0MsV0FBRCxFQUFpQjtBQUFBLDJCQUNqQyxNQUFLL0QsS0FENEI7QUFBQSxZQUMvRGdGLG1CQUQrRCxnQkFDL0RBLG1CQUQrRDtBQUFBLFlBQzFDdkgsSUFEMEMsZ0JBQzFDQSxJQUQwQzs7QUFFdkUsWUFBTXdILE1BQU0sR0FBRyxNQUFLQyxtQkFBTCxDQUF5QnhFLFFBQXpCLENBQWY7O0FBQ0EsWUFBSXNELFFBQUosQ0FIdUUsQ0FJdkU7O0FBQ0EsWUFBSUQsV0FBSixFQUFpQjtBQUNmLGNBQUlBLFdBQVcsQ0FBQ0UsTUFBWixLQUF1QkMsU0FBM0IsRUFBc0M7QUFDcENGLFlBQUFBLFFBQVEsR0FBR0QsV0FBVyxDQUFDRSxNQUFaLENBQW1CN0IsS0FBOUI7QUFDRCxXQUZELE1BRU8sSUFBSTJCLFdBQVcsQ0FBQzNCLEtBQVosS0FBc0I4QixTQUExQixFQUFxQztBQUMxQ0YsWUFBQUEsUUFBUSxHQUFHRCxXQUFXLENBQUMzQixLQUF2QjtBQUNELFdBRk0sTUFFQTtBQUNMNEIsWUFBQUEsUUFBUSxHQUFHRCxXQUFYO0FBQ0Q7QUFDRjs7QUFDRCxZQUFNM0IsS0FBSyxHQUFHMEIsV0FBVyxDQUFDRSxRQUFELENBQXpCO0FBZHVFLFlBZS9ETSxhQWYrRCxHQWU3QzNELEdBZjZDLENBZS9EMkQsYUFmK0Q7O0FBZ0J2RSxnQkFBUUEsYUFBUjtBQUNFLGVBQUssVUFBTDtBQUNBLGVBQUssT0FBTDtBQUNBLGVBQUssUUFBTDtBQUNBLGVBQUssTUFBTDtBQUFhO0FBQ1g7QUFDRDs7QUFDRDtBQUFTO0FBQ1BVLGNBQUFBLG1CQUFtQixDQUFDdkgsSUFBRCxFQUFPd0gsTUFBUCxFQUFldEUsR0FBRyxDQUFDNkMsWUFBbkIsRUFBaUNwQixLQUFqQyxDQUFuQjtBQUNBO0FBQ0Q7QUFWSDs7QUFZQSxZQUFJekIsR0FBRyxDQUFDd0UsaUJBQVIsRUFBMkI7QUFDekJ4RSxVQUFBQSxHQUFHLENBQUN3RSxpQkFBSixDQUFzQi9DLEtBQXRCLEVBQTZCekIsR0FBRyxDQUFDNkMsWUFBakMsRUFBK0M5QyxRQUEvQyxFQUF5RHVFLE1BQXpEO0FBQ0Q7O0FBQ0QsWUFBSXRFLEdBQUcsQ0FBQzZELHVCQUFKLElBQStCcEMsS0FBSyxLQUFLekIsR0FBRyxDQUFDNkQsdUJBQUosQ0FBNEJDLFVBQXpFLEVBQXFGO0FBQ25GO0FBQ0EsZ0JBQUtXLHFCQUFMLENBQ0UxRSxRQURGLEVBRUU7QUFBRThDLFlBQUFBLFlBQVksRUFBRTdDLEdBQUcsQ0FBQzZELHVCQUFKLENBQTRCRztBQUE1QyxXQUZGLEVBR0UsVUFBQUMsQ0FBQztBQUFBLG1CQUFJQSxDQUFKO0FBQUEsV0FISCxFQUlFakUsR0FBRyxDQUFDNkQsdUJBQUosQ0FBNEJLLFFBSjlCO0FBS0Q7O0FBQ0QsWUFBSWxFLEdBQUcsQ0FBQ21FLFVBQVIsRUFBb0I7QUFDbEIsZ0JBQUs5RSxLQUFMLENBQVdxRixxQkFBWCxDQUNFLE1BQUtyRixLQUFMLENBQVd2QyxJQURiLEVBRUV3SCxNQUZGLEVBR0V0RSxHQUFHLENBQUM2QyxZQUhOLEVBSUVwQixLQUpGLEVBS0V6QixHQUFHLENBQUNtRSxVQUxOO0FBT0Q7QUFDRixPQWhEdUI7QUFBQSxLQTdTTDs7QUFBQSwrREErVlIsVUFBQVEsU0FBUztBQUFBLGFBQUtBLFNBQVMsR0FBRyxJQUFJQyxNQUFKLFFBQWdCRCxTQUFoQixFQUE2QixHQUE3QixDQUFILEdBQXVDLElBQUlDLE1BQUosQ0FBVyxLQUFYLEVBQWtCLEdBQWxCLENBQXJEO0FBQUEsS0EvVkQ7O0FBQUEsdUVBaVdBLFVBQUM3RSxRQUFELEVBQVdDLEdBQVgsRUFBZ0JtRCxXQUFoQjtBQUFBLGFBQWdDLFVBQUNDLFdBQUQsRUFBaUI7QUFBQSwyQkFHOUQsTUFBSy9ELEtBSHlEO0FBQUEsWUFFaEVQLGdCQUZnRSxnQkFFaEVBLGdCQUZnRTtBQUFBLFlBRTlDNEUscUJBRjhDLGdCQUU5Q0EscUJBRjhDO0FBQUEsWUFFdkI1RyxJQUZ1QixnQkFFdkJBLElBRnVCO0FBQUEsWUFFakI4QixpQkFGaUIsZ0JBRWpCQSxpQkFGaUI7QUFBQSxZQUkxRCtFLGFBSjBELEdBSXhDM0QsR0FKd0MsQ0FJMUQyRCxhQUowRDtBQUtsRSxZQUFJbEMsS0FBSixDQUxrRSxDQU1sRTtBQUNBOztBQUNBLFlBQUkyQixXQUFXLEtBQUtHLFNBQXBCLEVBQStCO0FBQzdCLGNBQUlILFdBQVcsSUFBSUEsV0FBVyxDQUFDRSxNQUEzQixJQUFxQ0YsV0FBVyxDQUFDRSxNQUFaLENBQW1CN0IsS0FBbkIsS0FBNkI4QixTQUF0RSxFQUFpRjtBQUMvRTlCLFlBQUFBLEtBQUssR0FBRzJCLFdBQVcsQ0FBQ0UsTUFBWixDQUFtQjdCLEtBQTNCO0FBQ0QsV0FGRCxNQUVPLElBQUkyQixXQUFXLENBQUMzQixLQUFaLEtBQXNCOEIsU0FBMUIsRUFBcUM7QUFDMUM5QixZQUFBQSxLQUFLLEdBQUcyQixXQUFXLENBQUMzQixLQUFwQjtBQUNELFdBRk0sTUFFQTtBQUNMQSxZQUFBQSxLQUFLLEdBQUcyQixXQUFSO0FBQ0Q7QUFDRixTQVJELE1BUU87QUFDTDNCLFVBQUFBLEtBQUssR0FBRyxNQUFLb0QsZ0JBQUwsQ0FBc0I5RSxRQUF0QixFQUFnQ0MsR0FBaEMsQ0FBUjtBQUNEOztBQUNELGdCQUFRMkQsYUFBUjtBQUNFLGVBQUssVUFBTDtBQUFpQjtBQUNmLGtCQUFNbUIsWUFBWSxHQUFHckQsS0FBSyxHQUN0QnNELE1BQU0sQ0FBQ3RELEtBQUssQ0FBQ3VELE9BQU4sQ0FBYyxNQUFLQyxRQUFMLENBQWVqRixHQUFHLENBQUNrRixZQUFKLElBQW9CbEYsR0FBRyxDQUFDa0YsWUFBSixDQUFpQnRHLGlCQUF0QyxJQUE0REEsaUJBQTFFLENBQWQsRUFBNEcsRUFBNUcsRUFDTm9HLE9BRE0sQ0FDRSxNQUFLQyxRQUFMLENBQWVqRixHQUFHLENBQUNrRixZQUFKLElBQW9CbEYsR0FBRyxDQUFDa0YsWUFBSixDQUFpQnBHLGdCQUF0QyxJQUEyREEsZ0JBQXpFLENBREYsRUFDOEYsR0FEOUYsQ0FBRCxDQURnQixHQUd0QjJDLEtBSEo7O0FBSUEsa0JBQUlxRCxZQUFZLEtBQUssTUFBS0QsZ0JBQUwsQ0FBc0I5RSxRQUF0QixFQUFnQ0MsR0FBaEMsQ0FBckIsRUFBMkQ7QUFDekQwRCxnQkFBQUEscUJBQXFCLENBQUM1RyxJQUFELEVBQU9pRCxRQUFQLEVBQWlCQyxHQUFHLENBQUM2QyxZQUFyQixFQUFtQ2lDLFlBQW5DLENBQXJCO0FBQ0Q7O0FBQ0Q7QUFDRDs7QUFDRCxlQUFLLE9BQUw7QUFDQSxlQUFLLFFBQUw7QUFDQSxlQUFLLE1BQUw7QUFBYTtBQUNYLGtCQUFJckQsS0FBSyxLQUFLLE1BQUtvRCxnQkFBTCxDQUFzQjlFLFFBQXRCLEVBQWdDQyxHQUFoQyxDQUFkLEVBQW9EO0FBQ2xEMEQsZ0JBQUFBLHFCQUFxQixDQUFDNUcsSUFBRCxFQUFPaUQsUUFBUCxFQUFpQkMsR0FBRyxDQUFDNkMsWUFBckIsRUFBbUNwQixLQUFuQyxDQUFyQjtBQUNEOztBQUNEO0FBQ0Q7O0FBQ0Q7QUFBUztBQUNQO0FBQ0Q7QUFyQkg7O0FBd0JBLFlBQUl6QixHQUFHLENBQUNtRixZQUFSLEVBQXNCO0FBQ3BCLGNBQUloQyxXQUFXLEtBQUtJLFNBQXBCLEVBQStCO0FBQzdCOUIsWUFBQUEsS0FBSyxHQUFHMEIsV0FBVyxDQUFDMUIsS0FBRCxDQUFuQjtBQUNEOztBQUNEekIsVUFBQUEsR0FBRyxDQUFDbUYsWUFBSixDQUFpQjFELEtBQWpCLEVBQXdCMUIsUUFBeEI7QUFDRDtBQUNGLE9BakRrQjtBQUFBLEtBaldBOztBQUFBLHFFQW9aRixVQUFDQSxRQUFELEVBQVdDLEdBQVgsRUFBZ0JtRCxXQUFoQjtBQUFBLGFBQWdDLFVBQUNDLFdBQUQsRUFBaUI7QUFBQSwyQkFHNUQsTUFBSy9ELEtBSHVEO0FBQUEsWUFFOURQLGdCQUY4RCxnQkFFOURBLGdCQUY4RDtBQUFBLFlBRTVDdUYsbUJBRjRDLGdCQUU1Q0EsbUJBRjRDO0FBQUEsWUFFdkJ2SCxJQUZ1QixnQkFFdkJBLElBRnVCO0FBQUEsWUFFakI4QixpQkFGaUIsZ0JBRWpCQSxpQkFGaUI7QUFBQSxZQUl4RCtFLGFBSndELEdBSXRDM0QsR0FKc0MsQ0FJeEQyRCxhQUp3RDs7QUFLaEUsWUFBTVcsTUFBTSxHQUFHLE1BQUtDLG1CQUFMLENBQXlCeEUsUUFBekIsQ0FBZjs7QUFDQSxZQUFJMEIsS0FBSixDQU5nRSxDQU9oRTtBQUNBOztBQUNBLFlBQUkyQixXQUFXLEtBQUtHLFNBQXBCLEVBQStCO0FBQzdCLGNBQUlILFdBQVcsSUFBSUEsV0FBVyxDQUFDRSxNQUEzQixJQUFxQ0YsV0FBVyxDQUFDRSxNQUFaLENBQW1CN0IsS0FBbkIsS0FBNkI4QixTQUF0RSxFQUFpRjtBQUMvRTlCLFlBQUFBLEtBQUssR0FBRzJCLFdBQVcsQ0FBQ0UsTUFBWixDQUFtQjdCLEtBQTNCO0FBQ0QsV0FGRCxNQUVPLElBQUkyQixXQUFXLENBQUMzQixLQUFaLEtBQXNCOEIsU0FBMUIsRUFBcUM7QUFDMUM5QixZQUFBQSxLQUFLLEdBQUcyQixXQUFXLENBQUMzQixLQUFwQjtBQUNELFdBRk0sTUFFQTtBQUNMQSxZQUFBQSxLQUFLLEdBQUcyQixXQUFSO0FBQ0Q7QUFDRixTQVJELE1BUU87QUFDTDNCLFVBQUFBLEtBQUssR0FBRyxNQUFLb0QsZ0JBQUwsQ0FBc0I5RSxRQUF0QixFQUFnQ0MsR0FBaEMsQ0FBUjtBQUNEOztBQUNELGdCQUFRMkQsYUFBUjtBQUNFLGVBQUssVUFBTDtBQUFpQjtBQUNmLGtCQUFNbUIsWUFBWSxHQUFHckQsS0FBSyxHQUN0QnNELE1BQU0sQ0FBQ3RELEtBQUssQ0FBQ3VELE9BQU4sQ0FBYyxNQUFLQyxRQUFMLENBQWVqRixHQUFHLENBQUNrRixZQUFKLElBQW9CbEYsR0FBRyxDQUFDa0YsWUFBSixDQUFpQnRHLGlCQUF0QyxJQUE0REEsaUJBQTFFLENBQWQsRUFBNEcsRUFBNUcsRUFDTm9HLE9BRE0sQ0FDRSxNQUFLQyxRQUFMLENBQWVqRixHQUFHLENBQUNrRixZQUFKLElBQW9CbEYsR0FBRyxDQUFDa0YsWUFBSixDQUFpQnBHLGdCQUF0QyxJQUEyREEsZ0JBQXpFLENBREYsRUFDOEYsR0FEOUYsQ0FBRCxDQURnQixHQUd0QjJDLEtBSEo7O0FBSUEsa0JBQUlxRCxZQUFZLEtBQUssTUFBS0QsZ0JBQUwsQ0FBc0I5RSxRQUF0QixFQUFnQ0MsR0FBaEMsQ0FBckIsRUFBMkQ7QUFDekRxRSxnQkFBQUEsbUJBQW1CLENBQUN2SCxJQUFELEVBQU93SCxNQUFQLEVBQWV0RSxHQUFHLENBQUM2QyxZQUFuQixFQUFpQ2lDLFlBQWpDLENBQW5CO0FBQ0Q7O0FBQ0Q7QUFDRDs7QUFDRCxlQUFLLE9BQUw7QUFDQSxlQUFLLFFBQUw7QUFDQSxlQUFLLE1BQUw7QUFBYTtBQUNYLGtCQUFJckQsS0FBSyxLQUFLLE1BQUtvRCxnQkFBTCxDQUFzQjlFLFFBQXRCLEVBQWdDQyxHQUFoQyxDQUFkLEVBQW9EO0FBQ2xEcUUsZ0JBQUFBLG1CQUFtQixDQUFDdkgsSUFBRCxFQUFPd0gsTUFBUCxFQUFldEUsR0FBRyxDQUFDNkMsWUFBbkIsRUFBaUNwQixLQUFqQyxDQUFuQjtBQUNEOztBQUNEO0FBQ0Q7O0FBQ0Q7QUFBUztBQUNQO0FBQ0Q7QUFyQkg7O0FBd0JBLFlBQUl6QixHQUFHLENBQUNvRixVQUFSLEVBQW9CO0FBQ2xCLGNBQUlqQyxXQUFXLEtBQUtJLFNBQXBCLEVBQStCO0FBQzdCOUIsWUFBQUEsS0FBSyxHQUFHMEIsV0FBVyxDQUFDMUIsS0FBRCxDQUFuQjtBQUNEOztBQUNEekIsVUFBQUEsR0FBRyxDQUFDb0YsVUFBSixDQUFlM0QsS0FBZixFQUFzQjFCLFFBQXRCLEVBQWdDdUUsTUFBaEM7QUFDRDtBQUNGLE9BbERnQjtBQUFBLEtBcFpFOztBQUFBLGtFQXdjTCxVQUFDZSxRQUFELEVBQVdDLFNBQVgsRUFBc0J2RixRQUF0QixFQUFnQ0YsU0FBaEM7QUFBQSxhQUE4QyxVQUFDSSxDQUFELEVBQU87QUFBQSwyQkFHN0QsTUFBS1osS0FId0Q7QUFBQSxZQUUvRGtHLG1CQUYrRCxnQkFFL0RBLG1CQUYrRDtBQUFBLFlBRTFDQyxVQUYwQyxnQkFFMUNBLFVBRjBDO0FBQUEsWUFFOUIxSSxJQUY4QixnQkFFOUJBLElBRjhCO0FBQUEsWUFFeEJLLFNBRndCLGdCQUV4QkEsU0FGd0I7QUFJakUsWUFBSUEsU0FBSixFQUFlOztBQUVmLFlBQUltSSxTQUFTLEtBQUssUUFBbEIsRUFBNEI7QUFDMUJyRixVQUFBQSxDQUFDLENBQUNxRCxNQUFGLENBQVMxQixNQUFUO0FBQ0Q7O0FBQ0QsWUFBSXlELFFBQVEsS0FBSyxNQUFiLElBQXVCRyxVQUEzQixFQUF1QztBQUNyQ0QsVUFBQUEsbUJBQW1CLENBQ2pCekksSUFEaUIsRUFFakJoQyxHQUFHLENBQUM7QUFDRmlGLFlBQUFBLFFBQVEsRUFBUkEsUUFERTtBQUVGRixZQUFBQSxTQUFTLEVBQVRBO0FBRkUsV0FBRCxDQUZjLENBQW5CO0FBT0Q7QUFDRixPQWxCYTtBQUFBLEtBeGNLOztBQUFBLG1FQTRkSixVQUFDNEYsU0FBRCxFQUFlO0FBQzVCLFVBQUksQ0FBQ0EsU0FBTCxFQUFnQixPQUFPLElBQVA7O0FBQ2hCLFVBQUlBLFNBQVMsQ0FBQzdELE1BQVYsSUFBb0I2RCxTQUFTLENBQUM3RCxNQUFWLENBQWlCOEQsUUFBekMsRUFBbUQ7QUFDakQsZUFBT0QsU0FBUyxDQUFDN0QsTUFBVixDQUFpQjhELFFBQXhCO0FBQ0Q7O0FBQ0QsVUFBSUQsU0FBUyxDQUFDN0QsTUFBVixJQUFvQjZELFNBQVMsQ0FBQzdELE1BQVYsQ0FBaUJBLE1BQXpDLEVBQWlEO0FBQy9DLGVBQU82RCxTQUFTLENBQUM3RCxNQUFWLENBQWlCQSxNQUFqQixDQUF3QjhELFFBQS9CO0FBQ0Q7O0FBQ0QsVUFBSUQsU0FBUyxDQUFDOUQsU0FBVixJQUF1QjhELFNBQVMsQ0FBQzlELFNBQVYsQ0FBb0JDLE1BQXBCLENBQTJCQSxNQUF0RCxFQUE4RDtBQUM1RCxlQUFPNkQsU0FBUyxDQUFDOUQsU0FBVixDQUFvQkMsTUFBcEIsQ0FBMkJBLE1BQTNCLENBQWtDOEQsUUFBekM7QUFDRDs7QUFDRCxhQUFPRCxTQUFTLENBQUM5RCxTQUFWLENBQW9CQyxNQUFwQixDQUEyQjhELFFBQWxDO0FBQ0QsS0F4ZWtCOztBQUFBLDBFQTBlRyxVQUFBM0YsUUFBUTtBQUFBLGFBQUksTUFBS1YsS0FBTCxDQUFXeEIsSUFBWCxDQUFnQlosS0FBaEIsRUFBdUI4QyxRQUF2QixTQUFvQyxNQUFLVixLQUFMLENBQVd2QyxJQUFYLENBQWdCNkksU0FBcEQsRUFBSjtBQUFBLEtBMWVYOztBQUFBLDJFQTRlSSxVQUFDekksRUFBRCxFQUFRO0FBQzdCLFVBQUksQ0FBQ0EsRUFBTCxFQUFTLE9BQU9xRyxTQUFQOztBQUNULFVBQU1xQyxLQUFLLEdBQUcsTUFBS3ZHLEtBQUwsQ0FBV3hCLElBQVgsQ0FBZ0I4RSxTQUFoQixDQUEwQixVQUFBc0IsQ0FBQztBQUFBLGVBQUlBLENBQUMsQ0FBQ2hILEtBQUYsQ0FBUSxNQUFLb0MsS0FBTCxDQUFXdkMsSUFBWCxDQUFnQjZJLFNBQXhCLE1BQXVDekksRUFBM0M7QUFBQSxPQUEzQixDQUFkOztBQUNBLGFBQU8wSSxLQUFLLEtBQUssQ0FBQyxDQUFYLEdBQWVyQyxTQUFmLEdBQTJCcUMsS0FBbEM7QUFDRCxLQWhma0I7O0FBQUEsdUVBa2ZBLFVBQUM3RixRQUFELEVBQVdDLEdBQVgsRUFBZ0I2RixPQUFoQixFQUFpQztBQUFBLFVBQWpCQSxPQUFpQjtBQUFqQkEsUUFBQUEsT0FBaUIsR0FBUCxFQUFPO0FBQUE7O0FBQ2xEO0FBQ0EsVUFBTTNJLEVBQUUsR0FBRyxNQUFLcUgsbUJBQUwsQ0FBeUJ4RSxRQUF6QixDQUFYOztBQUNBLFVBQU0rRixTQUFTLEdBQUcsTUFBS3pHLEtBQUwsQ0FBV3ZCLFFBQVgsQ0FBb0JiLEtBQXBCLEVBQTJCQyxFQUEzQixTQUFrQzhDLEdBQUcsQ0FBQzZDLFlBQXRDLEdBQXFEVSxTQUFyRCxDQUFsQjs7QUFDQSxVQUFJd0MsYUFBSjs7QUFDQSxVQUFJRCxTQUFTLEtBQUt2QyxTQUFsQixFQUE2QjtBQUMzQndDLFFBQUFBLGFBQWEsR0FBRyxNQUFLMUcsS0FBTCxDQUFXeEIsSUFBWCxDQUFnQlosS0FBaEIsRUFBdUI4QyxRQUF2QixTQUFvQ0MsR0FBRyxDQUFDNkMsWUFBeEMsR0FBdUQsRUFBdkQsQ0FBaEI7QUFDRCxPQUZELE1BRU8sSUFBSWlELFNBQVMsS0FBSyxJQUFsQixFQUF3QjtBQUM3QixlQUFPLEVBQVA7QUFDRCxPQUZNLE1BRUE7QUFDTDtBQUNBO0FBQ0EsZ0JBQVE5RixHQUFHLENBQUMyRCxhQUFaO0FBQ0UsZUFBSyxhQUFMO0FBQ0EsZUFBSyxRQUFMO0FBQ0UsbUJBQU9rQyxPQUFPLENBQUNHLGFBQVIsQ0FBc0JDLElBQXRCLENBQTJCLFVBQUFDLEdBQUc7QUFBQSxxQkFBSUEsR0FBRyxDQUFDekUsS0FBSixLQUFjcUUsU0FBbEI7QUFBQSxhQUE5QixDQUFQOztBQUNGLGVBQUssU0FBTDtBQUNFLG1CQUFPRCxPQUFPLENBQUNJLElBQVIsQ0FBYSxVQUFBQyxHQUFHO0FBQUEscUJBQUlBLEdBQUcsQ0FBQ3pFLEtBQUosS0FBY3FFLFNBQWxCO0FBQUEsYUFBaEIsQ0FBUDs7QUFDRjtBQUNFLG1CQUFPQSxTQUFQO0FBUEo7QUFTRDs7QUFDRCxVQUFJQyxhQUFhLEtBQUssSUFBbEIsSUFBMEJBLGFBQWEsS0FBS3hDLFNBQTVDLElBQXlEd0MsYUFBYSxLQUFLLEVBQS9FLEVBQW1GO0FBQ2pGLGVBQU8sRUFBUDtBQUNELE9BeEJpRCxDQXlCbEQ7QUFDQTs7O0FBQ0EsY0FBUS9GLEdBQUcsQ0FBQzJELGFBQVo7QUFDRSxhQUFLLE9BQUw7QUFBYztBQUNaLGdCQUFJd0MsTUFBTSxDQUFDSixhQUFELENBQU4sQ0FBc0JyRSxNQUF0QixHQUErQixDQUFuQyxFQUFzQztBQUNwQyxxQkFBT3lFLE1BQU0sQ0FBQ0osYUFBRCxDQUFOLENBQXNCZixPQUF0QixDQUE4QixHQUE5QixFQUFtQyxNQUFLM0YsS0FBTCxDQUFXUCxnQkFBOUMsQ0FBUDtBQUNEOztBQUNELG1CQUFPaUgsYUFBUDtBQUNEOztBQUNELGFBQUssYUFBTDtBQUNBLGFBQUssUUFBTDtBQUNFLGlCQUFPRixPQUFPLENBQUNHLGFBQVIsQ0FBc0JDLElBQXRCLENBQTJCLFVBQUFDLEdBQUc7QUFBQSxtQkFBSUEsR0FBRyxDQUFDekUsS0FBSixLQUFjc0UsYUFBbEI7QUFBQSxXQUE5QixDQUFQOztBQUNGLGFBQUssU0FBTDtBQUNFLGlCQUFPRixPQUFPLENBQUNJLElBQVIsQ0FBYSxVQUFBQyxHQUFHO0FBQUEsbUJBQUlBLEdBQUcsQ0FBQ3pFLEtBQUosS0FBY3NFLGFBQWxCO0FBQUEsV0FBaEIsQ0FBUDs7QUFDRjtBQUNFLGlCQUFPQSxhQUFQO0FBYko7QUFlRCxLQTVoQmtCOztBQUFBLHlFQThoQkUsVUFBQ2hHLFFBQUQsRUFBV0MsR0FBWCxFQUFnQjZGLE9BQWhCLEVBQWlDO0FBQUEsVUFBakJBLE9BQWlCO0FBQWpCQSxRQUFBQSxPQUFpQixHQUFQLEVBQU87QUFBQTs7QUFDcEQsVUFBTU8sR0FBRyxHQUFHLE1BQUsvRyxLQUFMLENBQVd0QixVQUFYLENBQXNCZCxLQUF0QixFQUE2QjhDLFFBQTdCLFNBQTBDQyxHQUFHLENBQUM2QyxZQUE5QyxHQUE2RCxFQUE3RCxDQUFaOztBQUNBLFVBQUl1RCxHQUFHLEtBQUssSUFBWixFQUFrQjtBQUNoQixlQUFPLEVBQVA7QUFDRDs7QUFDRCxVQUFJcEcsR0FBRyxDQUFDMkQsYUFBSixLQUFzQixRQUF0QixJQUFrQzNELEdBQUcsQ0FBQzJELGFBQUosS0FBc0IsYUFBNUQsRUFBMkU7QUFDekUsZUFBT2tDLE9BQU8sQ0FBQ0csYUFBUixDQUFzQkMsSUFBdEIsQ0FBMkIsVUFBQUMsR0FBRztBQUFBLGlCQUFJQSxHQUFHLENBQUN6RSxLQUFKLEtBQWMyRSxHQUFsQjtBQUFBLFNBQTlCLENBQVA7QUFDRDs7QUFDRCxVQUFJLENBQUMsU0FBRCxFQUFZdEUsUUFBWixDQUFxQjlCLEdBQUcsQ0FBQzJELGFBQXpCLENBQUosRUFBNkM7QUFDM0MsZUFBT2tDLE9BQU8sQ0FBQ0ksSUFBUixDQUFhLFVBQUFDLEdBQUc7QUFBQSxpQkFBSUEsR0FBRyxDQUFDekUsS0FBSixLQUFjMkUsR0FBbEI7QUFBQSxTQUFoQixDQUFQO0FBQ0Q7O0FBQ0QsYUFBT0EsR0FBUDtBQUNELEtBMWlCa0I7O0FBQUEseUVBNGlCRSxVQUFDcEcsR0FBRCxFQUFNNkYsT0FBTixFQUF1QjtBQUFBLFVBQWpCQSxPQUFpQjtBQUFqQkEsUUFBQUEsT0FBaUIsR0FBUCxFQUFPO0FBQUE7O0FBQzFDLFVBQU1PLEdBQUcsR0FBRyxNQUFLL0csS0FBTCxDQUFXckIsVUFBWCxDQUFzQmlCLEdBQXRCLENBQTBCekMsS0FBSyxDQUFDd0UsWUFBTixDQUFtQmhCLEdBQW5CLENBQTFCLEVBQW1ELEVBQW5ELENBQVo7O0FBQ0EsVUFBSW9HLEdBQUcsS0FBSyxJQUFaLEVBQWtCO0FBQ2hCLGVBQU8sRUFBUDtBQUNEOztBQUNELFVBQUlwRyxHQUFHLENBQUMyRCxhQUFKLEtBQXNCLFFBQTFCLEVBQW9DO0FBQ2xDLGVBQU9rQyxPQUFPLENBQUNHLGFBQVIsQ0FBc0JDLElBQXRCLENBQTJCLFVBQUFDLEdBQUc7QUFBQSxpQkFBSUEsR0FBRyxDQUFDekUsS0FBSixLQUFjMkUsR0FBbEI7QUFBQSxTQUE5QixDQUFQO0FBQ0Q7O0FBQ0QsVUFBSSxDQUFDLFVBQUQsRUFBYSxTQUFiLEVBQXdCdEUsUUFBeEIsQ0FBaUM5QixHQUFHLENBQUMyRCxhQUFyQyxDQUFKLEVBQXlEO0FBQ3ZELGVBQU9rQyxPQUFPLENBQUNJLElBQVIsQ0FBYSxVQUFBQyxHQUFHO0FBQUEsaUJBQUlBLEdBQUcsQ0FBQ3pFLEtBQUosS0FBYzJFLEdBQWxCO0FBQUEsU0FBaEIsQ0FBUDtBQUNEOztBQUVELGFBQU9BLEdBQVA7QUFDRCxLQXpqQmtCOztBQUFBLDhFQTJqQk8sVUFBQ3BHLEdBQUQsRUFBUztBQUNqQyxVQUFNSCxTQUFTLEdBQUdyRCxLQUFLLENBQUN3RSxZQUFOLENBQW1CaEIsR0FBbkIsQ0FBbEI7QUFEaUMsVUFFekJoQyxVQUZ5QixHQUVWLE1BQUtxQixLQUZLLENBRXpCckIsVUFGeUI7QUFHakMsVUFBTUgsSUFBSSxHQUFHLE1BQUtsQixLQUFMLENBQVdrRCxTQUFYLENBQWI7QUFDQSxVQUFNdUcsR0FBRyxHQUFHdkksSUFBSSxJQUFJRyxVQUFVLENBQUNpQixHQUFYLENBQWVZLFNBQWYsRUFBMEIsRUFBMUIsQ0FBcEIsQ0FKaUMsQ0FLakM7QUFDQTs7QUFDQSxhQUFPdUcsR0FBRyxJQUFJQSxHQUFHLENBQUNDLElBQVgsR0FBa0JELEdBQUcsQ0FBQ0MsSUFBSixFQUFsQixHQUErQkQsR0FBRyxJQUFJLEVBQTdDO0FBQ0QsS0Fua0JrQjs7QUFBQSxnRkFxa0JTLFVBQUNyRyxRQUFELEVBQVdDLEdBQVgsRUFBZ0JzRyxJQUFoQixFQUF5QjtBQUNuRCxVQUFJQyxpQkFBaUIsR0FBRyxDQUFDLENBQUN2RyxHQUFHLENBQUN3RyxjQUE5QixDQURtRCxDQUVuRDs7QUFDQSxVQUFJLENBQUNELGlCQUFELElBQXNCdkcsR0FBRyxDQUFDeUcsMEJBQTlCLEVBQTBEO0FBQ3hELFlBQUlILElBQUksS0FBSyxRQUFiLEVBQXVCO0FBQ3JCQyxVQUFBQSxpQkFBaUIsR0FBRyxNQUFLRyxrQkFBTCxDQUF3QjNHLFFBQXhCLEVBQWtDO0FBQ3BEOEMsWUFBQUEsWUFBWSxFQUFFN0MsR0FBRyxDQUFDeUcsMEJBQUosQ0FBK0JFO0FBRE8sV0FBbEMsTUFFYjNHLEdBQUcsQ0FBQ3lHLDBCQUFKLENBQStCM0MsVUFGdEM7QUFHRCxTQUpELE1BSU87QUFDTHlDLFVBQUFBLGlCQUFpQixHQUFHLE1BQUsxQixnQkFBTCxDQUFzQjlFLFFBQXRCLEVBQWdDO0FBQ2xEOEMsWUFBQUEsWUFBWSxFQUFFN0MsR0FBRyxDQUFDeUcsMEJBQUosQ0FBK0JFO0FBREssV0FBaEMsTUFFYjNHLEdBQUcsQ0FBQ3lHLDBCQUFKLENBQStCM0MsVUFGdEM7QUFHRDtBQUNGOztBQUNELGFBQU95QyxpQkFBUDtBQUNELEtBcGxCa0I7O0FBQUEsc0VBc2xCRCxVQUFDeEcsUUFBRCxFQUFjO0FBQUEseUJBRzFCLE1BQUtWLEtBSHFCO0FBQUEsVUFFNUJ2QyxJQUY0QixnQkFFNUJBLElBRjRCO0FBQUEsVUFFdEJNLFVBRnNCLGdCQUV0QkEsVUFGc0I7QUFBQSxVQUVWRCxTQUZVLGdCQUVWQSxTQUZVO0FBQUEsVUFFQ1ksVUFGRCxnQkFFQ0EsVUFGRDtBQUFBLFVBRWFILGFBRmIsZ0JBRWFBLGFBRmI7QUFBQSxVQUU0QkMsSUFGNUIsZ0JBRTRCQSxJQUY1QjtBQUk5QixVQUFNK0ksYUFBYSxHQUFHLENBQUMsaUJBQUQsQ0FBdEI7QUFDQSxVQUFJQyxhQUFhLEdBQUcsQ0FBcEIsQ0FMOEIsQ0FLUDs7QUFDdkIsVUFBSXpKLFVBQUosRUFBZ0J5SixhQUFhLEdBQUc5SSxVQUFVLENBQUNLLElBQTNCOztBQUNoQixVQUFJaEIsVUFBSixFQUFnQjtBQUNkLFlBQUkyQyxRQUFRLElBQUk4RyxhQUFhLEdBQUcsQ0FBaEMsRUFBbUM7QUFDakNELFVBQUFBLGFBQWEsQ0FBQ0UsSUFBZCxDQUFtQixxQkFBbkI7QUFDRDtBQUNGLE9BSkQsTUFJTyxJQUFJM0osU0FBSixFQUFlO0FBQ3BCeUosUUFBQUEsYUFBYSxDQUFDRSxJQUFkLENBQW1CLHNCQUFuQjtBQUNELE9BYjZCLENBZTlCOzs7QUFDQSxVQUFJLENBQUMxSixVQUFELElBQWUsQ0FBQ0QsU0FBaEIsSUFBOEJTLGFBQWEsSUFBSWQsSUFBSSxDQUFDNkksU0FBeEQsRUFBb0U7QUFDbEUsWUFBSS9ILGFBQWEsQ0FBQ21KLE9BQWQsQ0FBc0JsSixJQUFJLENBQUNaLEtBQUwsRUFBWThDLFFBQVEsR0FBRzhHLGFBQXZCLFNBQXlDL0osSUFBSSxDQUFDNkksU0FBOUMsRUFBdEIsTUFBcUYsQ0FBQyxDQUExRixFQUE2RjtBQUMzRmlCLFVBQUFBLGFBQWEsQ0FBQ0UsSUFBZCxDQUFtQixhQUFuQjtBQUNEO0FBQ0Y7O0FBRUQsVUFBSSxNQUFLekgsS0FBTCxDQUFXMkgsa0JBQWYsRUFBbUM7QUFDakMsZUFBT0osYUFBYSxDQUFDOUQsSUFBZCxDQUFtQixHQUFuQixJQUEwQixHQUExQixHQUFnQyxNQUFLekQsS0FBTCxDQUFXMkgsa0JBQVgsQ0FBOEJqSCxRQUE5QixDQUF2QztBQUNEOztBQUNELGFBQU82RyxhQUFhLENBQUM5RCxJQUFkLENBQW1CLEdBQW5CLENBQVA7QUFDRCxLQWhuQmtCOztBQUFBLHNFQWtuQkQsVUFBQy9DLFFBQUQsRUFBV0MsR0FBWCxFQUFnQnFGLFFBQWhCLEVBQTZCO0FBQzdDLFVBQU00QixVQUFVLEdBQUcsRUFBbkI7O0FBQ0EsVUFBSSxDQUFDLE1BQUs1SCxLQUFMLENBQVd2QyxJQUFYLENBQWdCNkksU0FBakIsSUFBOEIsQ0FBQzNGLEdBQUcsQ0FBQzZDLFlBQXZDLEVBQXFEO0FBQ25ELGVBQU9vRSxVQUFQO0FBQ0Q7O0FBQ0QsVUFBSUMsV0FBSjtBQUNBLFVBQUlDLFlBQUo7QUFDQSxVQUFJQyxjQUFKOztBQUNBLFVBQUkvQixRQUFRLEtBQUssUUFBakIsRUFBMkI7QUFDekI2QixRQUFBQSxXQUFXLEdBQUcsTUFBSzdILEtBQUwsQ0FBV25CLGtCQUFYLENBQThCakIsS0FBOUIsRUFBcUMsTUFBckMsRUFBNkM4QyxRQUE3QyxTQUEwREMsR0FBRyxDQUFDNkMsWUFBOUQsRUFBZDtBQUNBc0UsUUFBQUEsWUFBWSxHQUFHLE1BQUs5SCxLQUFMLENBQVduQixrQkFBWCxDQUE4QmpCLEtBQTlCLEVBQXFDLE9BQXJDLEVBQThDOEMsUUFBOUMsU0FBMkRDLEdBQUcsQ0FBQzZDLFlBQS9ELEVBQWY7QUFDQXVFLFFBQUFBLGNBQWMsR0FBRyxNQUFLL0gsS0FBTCxDQUFXbkIsa0JBQVgsQ0FBOEJqQixLQUE5QixFQUNmLFNBRGUsRUFFZjhDLFFBRmUsU0FHWkMsR0FBRyxDQUFDNkMsWUFIUSxFQUFqQjtBQUtELE9BUkQsTUFRTztBQUNMLFlBQU0zRixFQUFFLEdBQUcsTUFBS3FILG1CQUFMLENBQXlCeEUsUUFBekIsQ0FBWDs7QUFDQW1ILFFBQUFBLFdBQVcsR0FBRyxNQUFLN0gsS0FBTCxDQUFXcEIsWUFBWCxDQUF3QmhCLEtBQXhCLEVBQStCLE1BQS9CLEVBQXVDQyxFQUF2QyxTQUE4QzhDLEdBQUcsQ0FBQzZDLFlBQWxELEVBQWQ7QUFDQXNFLFFBQUFBLFlBQVksR0FBRyxNQUFLOUgsS0FBTCxDQUFXcEIsWUFBWCxDQUF3QmhCLEtBQXhCLEVBQStCLE9BQS9CLEVBQXdDQyxFQUF4QyxTQUErQzhDLEdBQUcsQ0FBQzZDLFlBQW5ELEVBQWY7QUFDQXVFLFFBQUFBLGNBQWMsR0FBRyxNQUFLL0gsS0FBTCxDQUFXcEIsWUFBWCxDQUF3QmhCLEtBQXhCLEVBQStCLFNBQS9CLEVBQTBDQyxFQUExQyxTQUFpRDhDLEdBQUcsQ0FBQzZDLFlBQXJELEVBQWpCO0FBQ0Q7O0FBQ0QsVUFBSXFFLFdBQUosRUFBaUI7QUFDZkQsUUFBQUEsVUFBVSxDQUFDQyxXQUFYLEdBQXlCQSxXQUF6QjtBQUNEOztBQUNELFVBQUlDLFlBQUosRUFBa0I7QUFDaEJGLFFBQUFBLFVBQVUsQ0FBQ0UsWUFBWCxHQUEwQkEsWUFBMUI7QUFDRDs7QUFDRCxVQUFJQyxjQUFKLEVBQW9CO0FBQ2xCSCxRQUFBQSxVQUFVLENBQUNHLGNBQVgsR0FBNEJBLGNBQTVCO0FBQ0Q7O0FBQ0QsYUFBT0gsVUFBUDtBQUNELEtBbHBCa0I7O0FBQUEscUVBb3BCRixZQUFNO0FBQ3JCLFVBQUlJLFdBQUo7QUFDQSxVQUFJLE1BQUtoSSxLQUFMLENBQVdqQyxVQUFYLElBQXlCLENBQUMsTUFBS2lGLGlCQUFuQyxFQUFzRCxPQUFPZ0YsV0FBUDs7QUFDdEQsVUFBSSxNQUFLaEYsaUJBQVQsRUFBNEI7QUFDMUIsWUFBTWlGLFlBQVksR0FBRyxNQUFLakksS0FBTCxDQUFXdEIsVUFBWCxDQUFzQkssSUFBdEIsR0FBNkIsQ0FBbEQ7O0FBQ0EsWUFBSWtKLFlBQVksSUFBSSxDQUFwQixFQUF1QjtBQUNyQkQsVUFBQUEsV0FBVyxHQUFHQyxZQUFkO0FBQ0Q7QUFDRixPQUxELE1BS087QUFDTCxZQUFJLE1BQUtqSSxLQUFMLENBQVdsQyxTQUFYLElBQXdCLENBQUMsTUFBS2tDLEtBQUwsQ0FBV2tJLGdCQUF4QyxFQUEwRDtBQUN4REYsVUFBQUEsV0FBVyxHQUFHLE1BQUsxSyxLQUFMLENBQVc2SyxVQUF6QjtBQUNELFNBRkQsTUFFTztBQUNMSCxVQUFBQSxXQUFXLEdBQUcsTUFBS2hJLEtBQUwsQ0FBV2dJLFdBQXpCLENBREssQ0FDaUM7QUFDdkM7O0FBQ0QsWUFBSUEsV0FBVyxLQUFLOUQsU0FBaEIsSUFBNkIsTUFBS2xFLEtBQUwsQ0FBV3pCLGFBQVgsQ0FBeUJRLElBQXpCLEdBQWdDLENBQWpFLEVBQW9FO0FBQ2xFaUosVUFBQUEsV0FBVyxHQUFHLE1BQUtJLG9CQUFMLENBQTBCLE1BQUtwSSxLQUFMLENBQVd6QixhQUFYLENBQXlCOEosS0FBekIsRUFBMUIsQ0FBZDtBQUNEO0FBQ0Y7O0FBQ0QsYUFBT0wsV0FBUDtBQUNELEtBdnFCa0I7O0FBQUEsaUVBeXFCTixVQUFDTSxPQUFELEVBQWE7QUFDeEIsVUFBSSxNQUFLdEksS0FBTCxDQUFXbEMsU0FBWCxJQUF3QixNQUFLa0MsS0FBTCxDQUFXakMsVUFBdkMsRUFBbUQ7QUFDakQsWUFBSXVLLE9BQU8sSUFBSUEsT0FBTyxDQUFDMUksR0FBUixDQUFZLE1BQVosQ0FBWCxJQUFrQzBJLE9BQU8sS0FBSyxNQUFLQyxXQUF2RCxFQUFvRTtBQUNsRSxnQkFBS0QsT0FBTyxDQUFDMUksR0FBUixDQUFZLE1BQVosQ0FBTCxJQUE0QixJQUE1QjtBQUNBLGdCQUFLNEksY0FBTCxHQUFzQkYsT0FBTyxDQUFDMUksR0FBUixDQUFZLGdCQUFaLENBQXRCO0FBQ0EsZ0JBQUsySSxXQUFMLEdBQW1CRCxPQUFuQjtBQUNEO0FBQ0Y7QUFDRixLQWpyQmtCOztBQUFBLHVFQW1yQkEsVUFBQ3RDLFFBQUQsRUFBV3RGLFFBQVgsRUFBcUJGLFNBQXJCO0FBQUEsYUFBbUMsWUFBTTtBQUMxRCxZQUFJd0YsUUFBUSxLQUFLLE1BQWIsSUFBdUIsTUFBS2hHLEtBQUwsQ0FBV21HLFVBQXRDLEVBQWtEO0FBQ2hELGdCQUFLbkcsS0FBTCxDQUFXa0csbUJBQVgsQ0FDRSxNQUFLbEcsS0FBTCxDQUFXdkMsSUFEYixFQUVFaEMsR0FBRyxDQUFDO0FBQ0ZpRixZQUFBQSxRQUFRLEVBQVJBLFFBREU7QUFFRkYsWUFBQUEsU0FBUyxFQUFUQTtBQUZFLFdBQUQsQ0FGTDtBQU9EO0FBQ0YsT0FWa0I7QUFBQSxLQW5yQkE7O0FBQUEsMEVBK3JCRyxVQUFDRSxRQUFELEVBQVdDLEdBQVg7QUFBQSxhQUFtQixVQUFDOEgsR0FBRCxFQUFTO0FBQ2hEO0FBQ0EsWUFBTWpJLFNBQVMsR0FBR3JELEtBQUssQ0FBQ3dFLFlBQU4sQ0FBbUJoQixHQUFuQixDQUFsQjtBQUNBLFlBQU0yQixTQUFTLEdBQUcsQ0FBQ21HLEdBQUQsSUFBUUEsR0FBRyxDQUFDQyxLQUFaLEdBQW9CRCxHQUFwQixHQUEwQixNQUFLakcsWUFBTCxDQUFrQmlHLEdBQWxCLENBQTVDOztBQUNBLFlBQ0UsTUFBS3pJLEtBQUwsQ0FBV3RCLFVBQVgsQ0FBc0JLLElBQXRCLElBQ0csTUFBS2lCLEtBQUwsQ0FBV3RCLFVBQVgsQ0FBc0JLLElBQXRCLEtBQStCMkIsUUFBUSxHQUFHLENBRDdDLElBRUcsTUFBS3NDLGlCQUZSLElBR0csQ0FBQyxNQUFLMkYseUJBQUwsQ0FBK0JqSSxRQUEvQixFQUF5Q0MsR0FBekMsRUFBOEMsUUFBOUMsQ0FISixJQUlHMkIsU0FMTCxFQU1FO0FBQ0FBLFVBQUFBLFNBQVMsQ0FBQ29HLEtBQVY7QUFDQSxnQkFBSzFGLGlCQUFMLEdBQXlCLEtBQXpCO0FBQ0Q7O0FBRUQsWUFBSSxNQUFLaEQsS0FBTCxDQUFXYyxxQkFBZixFQUFzQztBQUNwQyxnQkFBS0UsY0FBTCxDQUF1QixNQUFLaEIsS0FBTCxDQUFXdkMsSUFBWCxDQUFnQkksRUFBdkMsU0FBNkMyQyxTQUE3QyxTQUEwREUsUUFBMUQsSUFBd0UrSCxHQUF4RTtBQUNEO0FBQ0YsT0FsQnFCO0FBQUEsS0EvckJIOztBQUFBLHdFQW10QkMsVUFBQy9ILFFBQUQsRUFBV0MsR0FBWDtBQUFBLGFBQW1CLFVBQUM4SCxHQUFELEVBQVM7QUFDOUMsWUFBTWpJLFNBQVMsR0FBR3JELEtBQUssQ0FBQ3dFLFlBQU4sQ0FBbUJoQixHQUFuQixDQUFsQjs7QUFDQSxZQUFJLE1BQUtpSSxlQUFMLElBQXdCLENBQUMsTUFBS0QseUJBQUwsQ0FBK0JqSSxRQUEvQixFQUF5Q0MsR0FBekMsRUFBOEMsTUFBOUMsQ0FBN0IsRUFBb0Y7QUFDbEYsY0FBTWtJLGdCQUFnQixHQUFHLE1BQUtMLGNBQUwsSUFBdUIsTUFBS3hJLEtBQUwsQ0FBV3hCLElBQVgsQ0FBZ0JPLElBQWhCLEdBQXVCLENBQTlDLEdBQ3JCLE1BQUtpQixLQUFMLENBQVd4QixJQUFYLENBQWdCTyxJQUFoQixHQUF1QixDQURGLEdBRXJCLE1BQUtxSixvQkFBTCxDQUEwQixNQUFLcEksS0FBTCxDQUFXekIsYUFBWCxDQUF5QjhKLEtBQXpCLEVBQTFCLENBRko7QUFEa0YsY0FLMUUvSixZQUwwRSxHQUt6RCxNQUFLMEIsS0FMb0QsQ0FLMUUxQixZQUwwRTtBQU1sRixjQUFNZ0UsU0FBUyxHQUFHLENBQUNtRyxHQUFELElBQVFBLEdBQUcsQ0FBQ0MsS0FBWixHQUFvQkQsR0FBcEIsR0FBMEIsTUFBS2pHLFlBQUwsQ0FBa0JpRyxHQUFsQixDQUE1Qzs7QUFDQSxjQUFJbkssWUFBWSxDQUFDUyxJQUFiLEdBQW9CLENBQXhCLEVBQTJCO0FBQ3pCLGdCQUNFVCxZQUFZLENBQUNzQixHQUFiLENBQWlCLFVBQWpCLE1BQWlDYyxRQUFqQyxJQUNHcEMsWUFBWSxDQUFDc0IsR0FBYixDQUFpQixXQUFqQixNQUFrQ1ksU0FEckMsSUFFRzhCLFNBSEwsRUFJRTtBQUNBQSxjQUFBQSxTQUFTLENBQUNvRyxLQUFWO0FBQ0Esb0JBQUtFLGVBQUwsR0FBdUIsS0FBdkI7QUFDQSxvQkFBS0osY0FBTCxHQUFzQixLQUF0QjtBQUNEO0FBQ0YsV0FWRCxNQVVPLElBQUlLLGdCQUFnQixLQUFLM0UsU0FBekIsRUFBb0M7QUFDekMsa0JBQUswRSxlQUFMLEdBQXVCLEtBQXZCO0FBQ0Esa0JBQUtKLGNBQUwsR0FBc0IsS0FBdEI7QUFDRCxXQUhNLE1BR0EsSUFBSUssZ0JBQWdCLEtBQUtuSSxRQUFyQixJQUFpQzRCLFNBQXJDLEVBQWdEO0FBQ3JEQSxZQUFBQSxTQUFTLENBQUNvRyxLQUFWO0FBQ0Esa0JBQUtFLGVBQUwsR0FBdUIsS0FBdkI7QUFDQSxrQkFBS0osY0FBTCxHQUFzQixLQUF0QjtBQUNEO0FBQ0Y7O0FBQ0QsWUFBSSxNQUFLeEksS0FBTCxDQUFXYyxxQkFBZixFQUFzQztBQUNwQyxnQkFBS0MsUUFBTCxDQUFpQixNQUFLZixLQUFMLENBQVd2QyxJQUFYLENBQWdCSSxFQUFqQyxTQUF1QzJDLFNBQXZDLFNBQW9ERSxRQUFwRCxJQUFrRStILEdBQWxFO0FBQ0Q7QUFDRixPQS9CbUI7QUFBQSxLQW50QkQ7O0FBQUEsb0VBb3ZCSCxVQUFDeEYsV0FBRCxFQUFjdkMsUUFBZCxFQUF3Qm9JLFdBQXhCLEVBQXdDO0FBQ3RELFVBQU1DLFlBQVksR0FBRyxDQUFDLE1BQUQsRUFBUyxVQUFULENBQXJCOztBQUNBLFVBQUk5RixXQUFXLElBQUk4RixZQUFZLENBQUN0RyxRQUFiLENBQXNCUSxXQUFXLENBQUNqQixJQUFsQyxDQUFuQixFQUE0RDtBQUMxRCxZQUFJdEIsUUFBUSxLQUFLLENBQUMsQ0FBZCxJQUFtQm9JLFdBQVcsS0FBSyxDQUFDLENBQXhDLEVBQTJDO0FBQ3pDLGdCQUFLNUksUUFBTCxDQUFjO0FBQ1o4SSxZQUFBQSxhQUFhLEVBQUVGLFdBREg7QUFFWlgsWUFBQUEsVUFBVSxFQUFFekg7QUFGQSxXQUFkO0FBSUQ7O0FBQ0R1SSxRQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNmLGNBQUloRyxXQUFXLENBQUNqQixJQUFaLEtBQXFCLFVBQXpCLEVBQXFDaUIsV0FBVyxDQUFDeUYsS0FBWjtBQUNyQyxjQUFJekYsV0FBVyxDQUFDakIsSUFBWixLQUFxQixNQUF6QixFQUFpQ2lCLFdBQVcsQ0FBQ1YsTUFBWjtBQUNsQyxTQUhTLEVBR1AsRUFITyxDQUFWO0FBSUQ7QUFDRixLQWx3QmtCOztBQUFBLHNGQW93QmUsWUFBTTtBQUN0QyxZQUFLdkMsS0FBTCxDQUFXa0osb0JBQVgsQ0FBZ0MsTUFBS2xKLEtBQUwsQ0FBV3ZDLElBQTNDO0FBQ0QsS0F0d0JrQjs7QUFBQSxzRkF3d0JlO0FBQUEsYUFBTSxZQUFNLENBQzVDO0FBQ0QsT0FGaUM7QUFBQSxLQXh3QmY7O0FBQUEsc0VBNHdCRCxZQUFNO0FBQUEsMEJBaUJsQixNQUFLdUMsS0FqQmE7QUFBQSxVQUVwQnhCLElBRm9CLGlCQUVwQkEsSUFGb0I7QUFBQSxVQUdwQkQsYUFIb0IsaUJBR3BCQSxhQUhvQjtBQUFBLFVBSXBCYyxVQUpvQixpQkFJcEJBLFVBSm9CO0FBQUEsVUFLcEJFLGlCQUxvQixpQkFLcEJBLGlCQUxvQjtBQUFBLFVBTXBCRSxnQkFOb0IsaUJBTXBCQSxnQkFOb0I7QUFBQSxVQU9wQmhDLElBUG9CLGlCQU9wQkEsSUFQb0I7QUFBQSxVQVFwQjBMLFVBUm9CLGlCQVFwQkEsVUFSb0I7QUFBQSxVQVNwQkMsU0FUb0IsaUJBU3BCQSxTQVRvQjtBQUFBLFVBVXBCakssTUFWb0IsaUJBVXBCQSxNQVZvQjtBQUFBLFVBV3BCa0ssSUFYb0IsaUJBV3BCQSxJQVhvQjtBQUFBLFVBWXBCQyxzQkFab0IsaUJBWXBCQSxzQkFab0I7QUFBQSxVQWFwQnZMLFVBYm9CLGlCQWFwQkEsVUFib0I7QUFBQSxVQWNwQndMLFdBZG9CLGlCQWNwQkEsV0Fkb0I7QUFBQSxVQWVwQkMsdUJBZm9CLGlCQWVwQkEsdUJBZm9CO0FBQUEsVUFnQnBCQyxxQkFoQm9CLGlCQWdCcEJBLHFCQWhCb0I7QUFtQnRCLFVBQU1uSSxPQUFPLEdBQUcsRUFBaEI7QUFDQSxVQUFNb0ksUUFBUSxHQUFHNUMsTUFBTSxDQUFDLE1BQUs5RyxLQUFMLENBQVcwSixRQUFaLENBQXZCOztBQUNBLFVBQUlILFdBQUosRUFBaUI7QUFDZmpJLFFBQUFBLE9BQU8sQ0FBQ21HLElBQVIsQ0FBYTtBQUNYa0MsVUFBQUEsS0FBSyxFQUFFSixXQUFXLENBQUNJLEtBQVosSUFBcUIsRUFEakI7QUFFWEMsVUFBQUEsV0FBVyxFQUFFLENBQUMsQ0FBQ0wsV0FBVyxDQUFDSyxXQUZoQjtBQUdYQyxVQUFBQSxVQUFVLEVBQUUsS0FIRDtBQUlYckosVUFBQUEsU0FBUyxFQUFFLGFBSkE7QUFLWHNKLFVBQUFBLElBQUksRUFBRSxjQUFBcEosUUFBUTtBQUFBLG1CQUNaO0FBQUssY0FBQSxTQUFTLEVBQUM7QUFBZixlQUNHNkksV0FBVyxDQUFDUSxXQUFaLENBQXdCdkwsSUFBSSxDQUFDb0IsR0FBTCxDQUFTYyxRQUFULENBQXhCLEVBQTRDQSxRQUE1QyxDQURILENBRFk7QUFBQSxXQUxIO0FBVVhzSixVQUFBQSxRQUFRLEVBQUUsa0JBQUF0SixRQUFRO0FBQUEsbUJBQUs2SSxXQUFXLENBQUNTLFFBQVosR0FBdUJULFdBQVcsQ0FBQ1MsUUFBWixDQUFxQnRKLFFBQXJCLENBQXZCLEdBQXdELElBQTdEO0FBQUEsV0FWUDtBQVdYdUosVUFBQUEsVUFBVSxFQUFFLG9CQUFBdkosUUFBUTtBQUFBLG1CQUFLNkksV0FBVyxDQUFDVSxVQUFaLEdBQXlCVixXQUFXLENBQUNVLFVBQVosQ0FBdUJ2SixRQUF2QixDQUF6QixHQUE0RCxJQUFqRTtBQUFBLFdBWFQ7QUFZWHdKLFVBQUFBLFVBQVUsRUFBRSxvQkFBQXhKLFFBQVE7QUFBQSxtQkFBSzZJLFdBQVcsQ0FBQ1csVUFBWixHQUF5QlgsV0FBVyxDQUFDVyxVQUFaLENBQXVCeEosUUFBdkIsQ0FBekIsR0FBNEQsSUFBakU7QUFBQTtBQVpULFNBQWI7QUFjRDs7QUFFRCxVQUFJOEksdUJBQUosRUFBNkI7QUFDM0JsSSxRQUFBQSxPQUFPLENBQUNtRyxJQUFSLENBQWE7QUFDWGtDLFVBQUFBLEtBQUssRUFBRSxFQURJO0FBRVhDLFVBQUFBLFdBQVcsRUFBRSxLQUZGO0FBR1hDLFVBQUFBLFVBQVUsRUFBRSxLQUhEO0FBSVhySixVQUFBQSxTQUFTLEVBQUUsbUJBSkE7QUFLWDJKLFVBQUFBLE1BQU0sRUFBRVYscUJBQXFCLElBQzNCLG9CQUFDLFFBQUQ7QUFDRSxZQUFBLEVBQUUsbUNBQWlDaE0sSUFBSSxDQUFDSSxFQUQxQztBQUVFLFlBQUEsU0FBUyxFQUFDLG9EQUZaO0FBR0UsWUFBQSxPQUFPLEVBQUVXLElBQUksQ0FBQ08sSUFBTCxLQUFjLENBQWQsSUFBbUJQLElBQUksQ0FBQ08sSUFBTCxLQUFjUixhQUFhLENBQUNRLElBSDFEO0FBSUUsWUFBQSxRQUFRLEVBQUUsTUFBS3FMLCtCQUpqQjtBQUtFLFlBQUEsUUFBUSxFQUFFVjtBQUxaLFlBTlM7QUFjWEksVUFBQUEsSUFBSSxFQUFFLGNBQUNwSixRQUFELEVBQWM7QUFDbEIsZ0JBQU0ySixPQUFPLEdBQUc3TCxJQUFJLENBQUNvQixHQUFMLENBQVNjLFFBQVQsQ0FBaEI7QUFDQSxnQkFBTTRKLE1BQU0sR0FBR0QsT0FBTyxDQUFDek0sS0FBUixDQUFjSCxJQUFJLENBQUM2SSxTQUFuQixDQUFmO0FBQ0EsZ0JBQU1pRSxRQUFRLEdBQUdoTSxhQUFhLENBQUNrRSxRQUFkLENBQXVCNkgsTUFBdkIsQ0FBakI7QUFDQSxtQkFDRSxvQkFBQyxRQUFEO0FBQ0UsY0FBQSxFQUFFLGdDQUE4QixNQUFLdEssS0FBTCxDQUFXdkMsSUFBWCxDQUFnQkksRUFBOUMsU0FBb0Q2QyxRQUR4RDtBQUVFLGNBQUEsU0FBUyxFQUFDLGdEQUZaO0FBR0UsY0FBQSxPQUFPLEVBQUU2SixRQUhYO0FBSUUsY0FBQSxRQUFRLEVBQUUsTUFBS0MsK0JBQUwsQ0FBcUM5SixRQUFyQyxDQUpaO0FBS0UsY0FBQSxRQUFRLEVBQUVnSjtBQUxaLGNBREY7QUFTRCxXQTNCVTtBQTRCWE0sVUFBQUEsUUFBUSxFQUFFO0FBQUEsbUJBQU0sSUFBTjtBQUFBLFdBNUJDO0FBNkJYQyxVQUFBQSxVQUFVLEVBQUU7QUFBQSxtQkFBTSxJQUFOO0FBQUEsV0E3QkQ7QUE4QlhDLFVBQUFBLFVBQVUsRUFBRTtBQUFBLG1CQUFNLElBQU47QUFBQTtBQTlCRCxTQUFiO0FBZ0NEOztBQUVELFVBQU05TCxjQUFjLEdBQUcsRUFBdkI7O0FBQ0EsWUFBSzRCLEtBQUwsQ0FBVzVCLGNBQVgsQ0FBMEJxTSxPQUExQixDQUFrQyxVQUFDQyxnQkFBRCxFQUFzQjtBQUN0RCxjQUFLMUssS0FBTCxDQUFXc0IsT0FBWCxDQUFtQm1KLE9BQW5CLENBQTJCLFVBQUNFLE1BQUQsRUFBWTtBQUNyQyxjQUFJeE4sS0FBSyxDQUFDd0UsWUFBTixDQUFtQmdKLE1BQW5CLE1BQStCRCxnQkFBbkMsRUFBcUQ7QUFDbkR0TSxZQUFBQSxjQUFjLENBQUNxSixJQUFmLENBQW9Ca0QsTUFBcEI7QUFDRDtBQUNGLFNBSkQ7QUFLRCxPQU5EOztBQU9Bdk0sTUFBQUEsY0FBYyxDQUFDcU0sT0FBZixDQUF1QixVQUFDOUosR0FBRCxFQUFTO0FBQzlCLFlBQU1pSyxpQkFBaUIsR0FBR3pOLEtBQUssQ0FBQzBOLG9CQUFOLENBQTJCbEssR0FBM0IsQ0FBMUIsQ0FEOEIsQ0FFOUI7O0FBQ0EsWUFBTW9KLFdBQVcsR0FBRyxTQUFkQSxXQUFjLENBQUNySixRQUFELEVBQVdvSyxNQUFYLEVBQXNCO0FBQ3hDLGNBQU0vRCxHQUFHLEdBQUd2SSxJQUFJLENBQUNaLEtBQUwsRUFBWThDLFFBQVosU0FBeUJDLEdBQUcsQ0FBQzZDLFlBQTdCLEVBQVo7O0FBQ0EsY0FBSW9ILGlCQUFpQixDQUFDN0QsR0FBRCxDQUFyQixFQUE0QjtBQUMxQixtQkFBT3BHLEdBQUcsQ0FBQ29LLFVBQUosR0FBaUIsb0JBQUMsQ0FBRDtBQUFHLGNBQUEsRUFBRSxFQUFDO0FBQU4sY0FBakIsR0FBa0QsRUFBekQ7QUFDRDs7QUFDRCxpQkFBT0QsTUFBTSxHQUFHQSxNQUFNLENBQUMvRCxHQUFELENBQVQsR0FBaUJBLEdBQTlCO0FBQ0QsU0FORDs7QUFRQSxZQUFJaUUsTUFBTSxHQUFHNU4saUJBQWlCLENBQUM2TixVQUFsQixDQUE2QnRLLEdBQTdCLENBQWIsQ0FYOEIsQ0FZOUI7O0FBQ0EsWUFBTXVLLGVBQWUsR0FBRztBQUN0QkMsVUFBQUEsSUFBSSxFQUFFO0FBQ0pDLFlBQUFBLFlBQVksRUFBRSxNQUFLNUYsZ0JBRGY7QUFFSjZGLFlBQUFBLGlCQUFpQixFQUFFLE1BQUtqRyxxQkFGcEI7QUFHSmtHLFlBQUFBLFVBQVUsRUFBRSxNQUFLQyxjQUhiO0FBSUpDLFlBQUFBLFdBQVcsRUFBRSxNQUFLQSxXQUpkO0FBS0ozSCxZQUFBQSxhQUFhLEVBQUUsTUFBSzRILGlCQUxoQjtBQU1KQyxZQUFBQSxhQUFhLEVBQUUsTUFBS0M7QUFOaEIsV0FEZ0I7QUFTdEI5SyxVQUFBQSxNQUFNLEVBQUU7QUFDTnVLLFlBQUFBLFlBQVksRUFBRSxNQUFLL0Qsa0JBRGI7QUFFTmdFLFlBQUFBLGlCQUFpQixFQUFFLE1BQUszRyx1QkFGbEI7QUFHTjRHLFlBQUFBLFVBQVUsRUFBRSxNQUFLTSxnQkFIWDtBQUlOSixZQUFBQSxXQUFXLEVBQUUsTUFBS0EsV0FKWjtBQUtOM0gsWUFBQUEsYUFBYSxFQUFFLE1BQUtnSSxtQkFMZDtBQU1OSCxZQUFBQSxhQUFhLEVBQUUsTUFBS0k7QUFOZCxXQVRjO0FBaUJ0QkMsVUFBQUEsTUFBTSxFQUFFO0FBQ05YLFlBQUFBLFlBQVksRUFBRSxNQUFLWSxrQkFEYjtBQUVOQyxZQUFBQSxpQkFBaUIsRUFBRSxNQUFLQyx1QkFGbEI7QUFHTmIsWUFBQUEsaUJBQWlCLEVBQUUsTUFBS2MsdUJBSGxCO0FBSU5DLFlBQUFBLG9CQUFvQixFQUFFLE1BQUtDLDBCQUpyQjtBQUtOQyxZQUFBQSxzQkFBc0IsRUFBRSxNQUFLQztBQUx2QjtBQWpCYyxTQUF4QixDQWI4QixDQXVDOUI7O0FBQ0EsWUFBTUMsU0FBUyxHQUFHO0FBQ2hCL08sVUFBQUEsSUFBSSxFQUFKQSxJQURnQjtBQUVoQmUsVUFBQUEsSUFBSSxFQUFKQSxJQUZnQjtBQUdoQmEsVUFBQUEsVUFBVSxFQUFWQSxVQUhnQjtBQUloQkUsVUFBQUEsaUJBQWlCLEVBQWpCQSxpQkFKZ0I7QUFLaEJFLFVBQUFBLGdCQUFnQixFQUFoQkEsZ0JBTGdCO0FBTWhCNkosVUFBQUEsc0JBQXNCLEVBQXRCQTtBQU5nQixTQUFsQixDQXhDOEIsQ0ErQzNCOztBQUNIMEIsUUFBQUEsTUFBTSxHQUFHNU4saUJBQWlCLENBQUNxUCxVQUFsQixDQUE2QnpCLE1BQTdCLEVBQXFDd0IsU0FBckMsRUFBZ0Q3TCxHQUFoRCxFQUFxRG9KLFdBQXJELENBQVQsQ0FoRDhCLENBa0Q5Qjs7QUFDQSxZQUFNMkMsa0JBQWtCLGdCQUNuQkYsU0FEbUI7QUFFdEJyRCxVQUFBQSxVQUFVLEVBQVZBLFVBRnNCO0FBR3RCQyxVQUFBQSxTQUFTLEVBQVRBLFNBSHNCO0FBSXRCakssVUFBQUEsTUFBTSxFQUFOQSxNQUpzQjtBQUt0QmtLLFVBQUFBLElBQUksRUFBSkEsSUFMc0I7QUFNdEJDLFVBQUFBLHNCQUFzQixFQUF0QkE7QUFOc0IsVUFBeEIsQ0FuRDhCLENBMEQzQjs7O0FBQ0gwQixRQUFBQSxNQUFNLEdBQUc1TixpQkFBaUIsQ0FBQ3VQLG1CQUFsQixDQUNQM0IsTUFETyxFQUVQdEIsUUFGTyxFQUdQZ0Qsa0JBSE8sRUFJUC9MLEdBSk8sRUFLUHVLLGVBTE8sRUFNUCxNQUFLdkMseUJBTkUsQ0FBVDtBQVFBckgsUUFBQUEsT0FBTyxDQUFDbUcsSUFBUixDQUFhdUQsTUFBYjtBQUNELE9BcEVEOztBQXNFQSxVQUFJak4sVUFBSixFQUFnQjtBQUNkdUQsUUFBQUEsT0FBTyxDQUFDbUcsSUFBUixDQUFhO0FBQ1hrQyxVQUFBQSxLQUFLLEVBQUUsRUFESTtBQUVYQyxVQUFBQSxXQUFXLEVBQUUsS0FGRjtBQUdYcEosVUFBQUEsU0FBUyxFQUFFLGVBSEE7QUFJWHNKLFVBQUFBLElBQUksRUFBRTtBQUFBLG1CQUFNLElBQU47QUFBQSxXQUpLO0FBS1hFLFVBQUFBLFFBQVEsRUFBRTtBQUFBLG1CQUFNLElBQU47QUFBQSxXQUxDO0FBTVhDLFVBQUFBLFVBQVUsRUFBRSxvQkFBQXZKLFFBQVE7QUFBQSxtQkFDbEIsb0JBQUMsSUFBRDtBQUNFLGNBQUEsRUFBRSxtQ0FBaUNqRCxJQUFJLENBQUNJLEVBQXRDLFNBQTRDNkMsUUFEaEQ7QUFFRSxjQUFBLElBQUksRUFBQyxXQUZQO0FBR0UsY0FBQSxJQUFJLEVBQUMsUUFIUDtBQUlFLGNBQUEsS0FBSyxFQUFFLEVBSlQ7QUFLRSxjQUFBLE1BQU0sRUFBRSxFQUxWO0FBTUUsY0FBQSxLQUFLLEVBQUU7QUFBRWtNLGdCQUFBQSxPQUFPLEVBQUU7QUFBWCxlQU5UO0FBT0UsY0FBQSxPQUFPLEVBQUU7QUFBQSx1QkFBTSxNQUFLNU0sS0FBTCxDQUFXNk0sYUFBWCxDQUF5QnBQLElBQXpCLEVBQStCaUQsUUFBL0IsQ0FBTjtBQUFBO0FBUFgsY0FEa0I7QUFBQSxXQU5UO0FBaUJYd0osVUFBQUEsVUFBVSxFQUFFO0FBQUEsbUJBQU0sSUFBTjtBQUFBO0FBakJELFNBQWI7QUFtQkQ7O0FBQ0QsYUFBTzVJLE9BQVA7QUFDRCxLQXo3QmtCOztBQUFBLG1FQTI3QkosVUFBQ1osUUFBRCxFQUFXQyxHQUFYLEVBQWdCcUYsUUFBaEIsRUFBNkI7QUFDMUMsVUFBSUEsUUFBUSxLQUFLLE1BQWpCLEVBQXlCO0FBQ3ZCLGVBQU8sS0FBUDtBQUNEOztBQUNELFVBQU1uSSxFQUFFLEdBQUcsTUFBS3FILG1CQUFMLENBQXlCeEUsUUFBekIsQ0FBWDs7QUFDQSxhQUFPLENBQUMsQ0FBQyxNQUFLVixLQUFMLENBQVd2QixRQUFYLENBQW9CYixLQUFwQixFQUEyQkMsRUFBM0IsU0FBa0M4QyxHQUFHLENBQUM2QyxZQUF0QyxFQUFUO0FBQ0QsS0FqOEJrQjs7QUFBQSx5RUFtOEJFLFlBQU07QUFDekIsWUFBS1IsaUJBQUwsR0FBeUIsSUFBekI7QUFDRCxLQXI4QmtCOztBQUFBLDJFQXU4QkksWUFBTTtBQUMzQixVQUFJLE1BQUtoRCxLQUFMLENBQVd6QixhQUFYLENBQXlCUSxJQUE3QixFQUFtQztBQUNqQyxjQUFLNkosZUFBTCxHQUF1QixJQUF2Qjs7QUFDQSxjQUFLMUksUUFBTCxDQUFjO0FBQ1ppSSxVQUFBQSxVQUFVLEVBQUVqRTtBQURBLFNBQWQ7QUFHRDtBQUNGLEtBOThCa0I7O0FBQUEsaUZBZzlCVSxZQUFNO0FBQ2pDLFlBQUs0SSxnQkFBTCxHQUF3QixJQUF4QjtBQUNELEtBbDlCa0I7O0FBQUEscUVBbzlCRixVQUFDbE0sQ0FBRCxFQUFJRixRQUFKLEVBQWlCO0FBQ2hDLFVBQUksQ0FBQyxNQUFLVixLQUFMLENBQVdqQyxVQUFaLElBQTBCLENBQUMsTUFBS2lDLEtBQUwsQ0FBV2xDLFNBQTFDLEVBQXFEO0FBQ25EOEMsUUFBQUEsQ0FBQyxDQUFDK0IsY0FBRjs7QUFDQSxZQUFJL0IsQ0FBQyxDQUFDbU0sT0FBRixJQUFhbk0sQ0FBQyxDQUFDZ0QsUUFBbkIsRUFBNkI7QUFDM0J4RCxVQUFBQSxRQUFRLENBQUM0TSxZQUFULEdBQXdCQyxlQUF4QjtBQUNELFNBSmtELENBS25EO0FBQ0E7OztBQU5tRCxZQU8zQ0MsVUFQMkMsR0FPNUJ0TSxDQUFDLENBQUNxRCxNQVAwQixDQU8zQ2lKLFVBUDJDO0FBUW5ELFlBQU1DLFlBQVksR0FBR0QsVUFBVSxDQUFDRSxTQUFYLElBQXdCRixVQUFVLENBQUNFLFNBQVgsQ0FBcUIxRixPQUE3QyxHQUF1RHdGLFVBQVUsQ0FBQ0UsU0FBbEUsR0FBOEUsRUFBbkc7QUFDQSxZQUFNQyxZQUFZLEdBQVVILFVBQVUsQ0FBQ0EsVUFBWCxDQUFzQkUsU0FBdEIsSUFBbUNGLFVBQVUsQ0FBQ0EsVUFBWCxDQUFzQkUsU0FBdEIsQ0FBZ0MxRixPQUFuRSxDQUEyRTtBQUEzRSxVQUN4QndGLFVBQVUsQ0FBQ0EsVUFBWCxDQUFzQkUsU0FERSxHQUV4QixFQUZKO0FBR0EsWUFBTUUsWUFBWSxHQUFHSixVQUFVLENBQUNBLFVBQVgsQ0FBc0JBLFVBQXRCLENBQWlDRSxTQUFqQyxJQUNoQkYsVUFBVSxDQUFDQSxVQUFYLENBQXNCQSxVQUF0QixDQUFpQ0UsU0FBakMsQ0FBMkMxRixPQUQzQixDQUNtQztBQURuQyxVQUVqQndGLFVBQVUsQ0FBQ0EsVUFBWCxDQUFzQkEsVUFBdEIsQ0FBaUNFLFNBRmhCLEdBR2pCLEVBSEo7QUFJQSxZQUFNRyxZQUFZLEdBQUdMLFVBQVUsQ0FBQ0EsVUFBWCxDQUFzQkEsVUFBdEIsQ0FBaUNBLFVBQWpDLENBQTRDRSxTQUE1QyxJQUNoQkYsVUFBVSxDQUFDQSxVQUFYLENBQXNCQSxVQUF0QixDQUFpQ0EsVUFBakMsQ0FBNENFLFNBQTVDLENBQXNEMUYsT0FEdEMsQ0FDOEM7QUFEOUMsVUFFakJ3RixVQUFVLENBQUNBLFVBQVgsQ0FBc0JBLFVBQXRCLENBQWlDQSxVQUFqQyxDQUE0Q0UsU0FGM0IsR0FHakIsRUFISjs7QUFJQSxZQUNFRCxZQUFZLENBQUN6RixPQUFiLENBQXFCLGVBQXJCLE1BQTBDLENBQUMsQ0FBM0MsSUFDRzJGLFlBQVksQ0FBQzNGLE9BQWIsQ0FBcUIsZUFBckIsTUFBMEMsQ0FBQyxDQUQ5QyxJQUVHNEYsWUFBWSxDQUFDNUYsT0FBYixDQUFxQixlQUFyQixNQUEwQyxDQUFDLENBRjlDLElBR0c2RixZQUFZLENBQUM3RixPQUFiLENBQXFCLGVBQXJCLE1BQTBDLENBQUMsQ0FKaEQsRUFLRTtBQUNBLGNBQUksTUFBSzFILEtBQUwsQ0FBV3dOLFNBQWYsRUFBMEI7QUFDeEIsa0JBQUt4TixLQUFMLENBQVd5TixtQkFBWCxDQUNFLE1BQUt6TixLQUFMLENBQVd2QyxJQURiLEVBRUVpRCxRQUZGLEVBR0UsTUFBS1YsS0FBTCxDQUFXME4sV0FBWCxJQUEwQjlNLENBQUMsQ0FBQ21NLE9BSDlCLEVBSUUsTUFBSy9NLEtBQUwsQ0FBVzBOLFdBQVgsSUFBMEI5TSxDQUFDLENBQUNnRCxRQUo5QjtBQU1EO0FBQ0YsU0FkRCxNQWNPO0FBQ0wsZ0JBQUs1RCxLQUFMLENBQVd5TixtQkFBWCxDQUErQixNQUFLek4sS0FBTCxDQUFXdkMsSUFBMUMsRUFBZ0RpRCxRQUFoRCxFQUEwRCxNQUFLVixLQUFMLENBQVcwTixXQUFyRSxFQUFrRixLQUFsRjtBQUNEO0FBQ0Y7O0FBQ0QsVUFBSSxNQUFLMU4sS0FBTCxDQUFXMk4sVUFBZixFQUEyQjtBQUN6QixjQUFLM04sS0FBTCxDQUFXMk4sVUFBWCxDQUFzQi9NLENBQXRCLEVBQXlCRixRQUF6QixFQUFtQyxNQUFLVixLQUFMLENBQVd4QixJQUFYLENBQWdCb0IsR0FBaEIsQ0FBb0JjLFFBQXBCLENBQW5DO0FBQ0Q7O0FBQ0QsYUFBTyxJQUFQO0FBQ0QsS0EvL0JrQjs7QUFBQSx3RUFpZ0NDLFVBQUNFLENBQUQsRUFBSUYsUUFBSixFQUFpQjtBQUNuQyxVQUFJLE1BQUtWLEtBQUwsQ0FBV0MsZ0JBQWYsRUFBaUM7QUFBQSw0QkFHM0IsTUFBS0QsS0FIc0I7QUFBQSxZQUU3QnlOLG1CQUY2QixpQkFFN0JBLG1CQUY2QjtBQUFBLFlBRVJsUCxhQUZRLGlCQUVSQSxhQUZRO0FBQUEsWUFFT2QsSUFGUCxpQkFFT0EsSUFGUDtBQUFBLFlBRWFlLElBRmIsaUJBRWFBLElBRmI7QUFJL0JvQyxRQUFBQSxDQUFDLENBQUMrQixjQUFGO0FBQ0EvQixRQUFBQSxDQUFDLENBQUNnTixlQUFGOztBQUNBLGNBQUsxTixRQUFMLENBQWM7QUFDWkMsVUFBQUEsZUFBZSxFQUFFLElBREw7QUFFWjBOLFVBQUFBLFlBQVksRUFBRWpOLENBQUMsQ0FBQ2tOLE9BRko7QUFHWkMsVUFBQUEsWUFBWSxFQUFFbk4sQ0FBQyxDQUFDb047QUFISixTQUFkLEVBTitCLENBVy9COzs7QUFDQSxZQUFJLENBQUN6UCxhQUFhLENBQUNrRSxRQUFkLENBQXVCakUsSUFBSSxDQUFDWixLQUFMLEVBQVk4QyxRQUFaLFNBQXlCakQsSUFBSSxDQUFDNkksU0FBOUIsRUFBdkIsQ0FBTCxFQUF3RTtBQUN0RW1ILFVBQUFBLG1CQUFtQixDQUFDaFEsSUFBRCxFQUFPaUQsUUFBUCxDQUFuQjtBQUNEOztBQUNETixRQUFBQSxRQUFRLENBQUM2TixnQkFBVCxDQUEwQixPQUExQixFQUFtQyxNQUFLM04sZUFBeEM7QUFDQSxlQUFPLEtBQVA7QUFDRDs7QUFDRCxhQUFPLElBQVA7QUFDRCxLQXJoQ2tCOztBQUFBLDRFQXVoQ0ssVUFBQUksUUFBUTtBQUFBLGFBQUksTUFBS1YsS0FBTCxDQUFXa08sZUFBWCxDQUNsQyxNQUFLbE8sS0FBTCxDQUFXeEIsSUFBWCxDQUFnQm9CLEdBQWhCLENBQW9CYyxRQUFwQixDQURrQyxFQUVsQ0EsUUFGa0MsQ0FBSjtBQUFBLEtBdmhDYjs7QUFBQSxpRUE0aENOLFVBQUFDLEdBQUc7QUFBQSxhQUFJLFVBQUM2TCxTQUFELEVBQWU7QUFBQSw0QkFHN0IsTUFBS3hNLEtBSHdCO0FBQUEsWUFFL0JqQyxVQUYrQixpQkFFL0JBLFVBRitCO0FBQUEsWUFFbkJELFNBRm1CLGlCQUVuQkEsU0FGbUI7QUFBQSxZQUVSWSxVQUZRLGlCQUVSQSxVQUZRO0FBQUEsWUFFSUosWUFGSixpQkFFSUEsWUFGSjtBQUFBLFlBRWtCYixJQUZsQixpQkFFa0JBLElBRmxCOztBQUFBLFlBSXpCaUQsUUFKeUIsR0FJRjhMLFNBSkUsQ0FJekI5TCxRQUp5QjtBQUFBLFlBSVpWLEtBSlksaUNBSUZ3TSxTQUpFOztBQUtqQyxZQUFJMUMsSUFBSjtBQUNBLFlBQUk5RCxRQUFRLEdBQUcsTUFBZjtBQUNBLFlBQUl3QixhQUFhLEdBQUcsQ0FBcEIsQ0FQaUMsQ0FPVjs7QUFDdkIsWUFBSXpKLFVBQUosRUFBZ0J5SixhQUFhLEdBQUc5SSxVQUFVLENBQUNLLElBQTNCO0FBQ2hCLFlBQU1vUCxpQkFBaUIsR0FBR3pOLFFBQVEsR0FBRzhHLGFBQXJDOztBQUNBLFlBQUl6SixVQUFKLEVBQWdCO0FBQ2QsY0FBSTJDLFFBQVEsSUFBSThHLGFBQWEsR0FBRyxDQUFoQyxFQUFtQztBQUNqQyxnQkFBSTdHLEdBQUcsQ0FBQ3NKLFVBQVIsRUFBb0I7QUFDbEJILGNBQUFBLElBQUksR0FBR25KLEdBQUcsQ0FBQ3NKLFVBQUosQ0FDTHZKLFFBREssRUFFTCxNQUFLb0wsbUJBQUwsQ0FBeUJwTCxRQUF6QixFQUFtQ0MsR0FBbkMsQ0FGSyxFQUdMLE1BQUtrTCxtQkFBTCxDQUF5Qm5MLFFBQXpCLEVBQW1DQyxHQUFuQyxDQUhLLENBQVA7QUFLQXFGLGNBQUFBLFFBQVEsR0FBRyxRQUFYO0FBQ0QsYUFQRCxNQU9PO0FBQ0w4RCxjQUFBQSxJQUFJLEdBQUcsSUFBUDtBQUNBOUQsY0FBQUEsUUFBUSxHQUFHLElBQVg7QUFDRDtBQUNGLFdBWkQsTUFZTztBQUNMOEQsWUFBQUEsSUFBSSxHQUFHbkosR0FBRyxDQUFDbUosSUFBSixDQUNMcUUsaUJBREssRUFFTCxNQUFLckMsbUJBQUwsQ0FBeUJxQyxpQkFBekIsRUFBNEN4TixHQUE1QyxDQUZLLEVBR0wsTUFBS2tMLG1CQUFMLENBQXlCc0MsaUJBQXpCLEVBQTRDeE4sR0FBNUMsQ0FISyxDQUFQO0FBS0Q7QUFDRixTQXBCRCxNQW9CTyxJQUFJN0MsU0FBUyxJQUFJNkMsR0FBRyxDQUFDcUosUUFBckIsRUFBK0I7QUFDcENGLFVBQUFBLElBQUksR0FBR25KLEdBQUcsQ0FBQ3FKLFFBQUosQ0FDTG1FLGlCQURLLEVBRUwsTUFBS3hDLGlCQUFMLENBQXVCd0MsaUJBQXZCLEVBQTBDeE4sR0FBMUMsQ0FGSyxFQUdMLE1BQUs4SyxpQkFBTCxDQUF1QjBDLGlCQUF2QixFQUEwQ3hOLEdBQTFDLENBSEssQ0FBUDtBQUtBcUYsVUFBQUEsUUFBUSxHQUFHLE1BQVg7QUFDRCxTQVBNLE1BT0E7QUFDTDhELFVBQUFBLElBQUksR0FBR25KLEdBQUcsQ0FBQ21KLElBQUosQ0FDTHFFLGlCQURLLEVBRUwsTUFBS3hDLGlCQUFMLENBQXVCd0MsaUJBQXZCLEVBQTBDeE4sR0FBMUMsQ0FGSyxFQUdMLE1BQUs4SyxpQkFBTCxDQUF1QjBDLGlCQUF2QixFQUEwQ3hOLEdBQTFDLENBSEssQ0FBUDtBQUtEOztBQUNELFlBQU15TixTQUFTLEdBQUdwTyxLQUFLLENBQUNRLFNBQU4sS0FBb0IsbUJBQXBCLElBQTJDUixLQUFLLENBQUNRLFNBQU4sS0FBb0IsYUFBakY7O0FBQ0EsWUFBSSxDQUFDd0YsUUFBUSxLQUFLLE1BQWIsSUFBdUJBLFFBQVEsS0FBSyxNQUFwQyxJQUE4Q0EsUUFBUSxLQUFLLFFBQTVELEtBQXlFLENBQUNvSSxTQUE5RSxFQUF5RjtBQUN2RixjQUFNQyxXQUFXLEdBQUdySSxRQUFRLEtBQUssUUFBYixHQUF3QnRGLFFBQXhCLEdBQW1DQSxRQUFRLEdBQUc4RyxhQUFsRTs7QUFDQSxjQUFNOEcsV0FBVyxHQUFHLE1BQUtDLGVBQUwsQ0FBcUJGLFdBQXJCLEVBQWtDMU4sR0FBbEMsRUFBdUNxRixRQUF2QyxDQUFwQjs7QUFDQSxjQUFNd0ksUUFBUSxHQUFHLE1BQUtDLFlBQUwsQ0FBa0JKLFdBQWxCLEVBQStCMU4sR0FBL0IsRUFBb0NxRixRQUFwQyxDQUFqQjs7QUFDQSxjQUFNb0gsU0FBUyxHQUFHOU8sWUFBWSxDQUFDc0IsR0FBYixDQUFpQixVQUFqQixNQUFpQ2MsUUFBakMsSUFDYnBDLFlBQVksQ0FBQ3NCLEdBQWIsQ0FBaUIsV0FBakIsTUFBa0NJLEtBQUssQ0FBQ1EsU0FEM0IsR0FFZCw4QkFGYyxHQUdkLGtCQUhKO0FBSUEsaUJBQ0Usb0JBQUMsSUFBRCxlQUNNUixLQUROO0FBRUUsWUFBQSxTQUFTLEVBQUVvTixTQUZiO0FBR0UsWUFBQSxLQUFLLEVBQUV6TSxHQUFHLENBQUMrTixLQUhiO0FBSUUsWUFBQSxPQUFPLEVBQUUsTUFBS0MsZ0JBQUwsQ0FBc0IzSSxRQUF0QixFQUFnQ3RGLFFBQWhDLEVBQTBDVixLQUFLLENBQUNRLFNBQWhEO0FBSlgsY0FNRSxvQkFBQyxXQUFEO0FBQ0UsWUFBQSxFQUFFLHNCQUFvQi9DLElBQUksQ0FBQ0ksRUFBekIsU0FBK0JtQyxLQUFLLENBQUNRLFNBQXJDLFNBQWtERSxRQUR0RDtBQUVFLFlBQUEsUUFBUSxFQUFFOE4sUUFGWjtBQUdFLFlBQUEsT0FBTyxFQUFFLENBQUMsQ0FBQ0YsV0FBVyxDQUFDeEcsWUFIekI7QUFJRSxZQUFBLFNBQVMsRUFBRSxDQUFDLENBQUN3RyxXQUFXLENBQUN2RyxjQUozQjtBQUtFLFlBQUEsV0FBVyxFQUFFdUcsV0FBVyxDQUFDekcsV0FMM0I7QUFNRSxZQUFBLFlBQVksRUFBRXlHLFdBQVcsQ0FBQ3hHLFlBTjVCO0FBT0UsWUFBQSxjQUFjLEVBQUV3RyxXQUFXLENBQUN2RztBQVA5QixhQVNHK0IsSUFUSCxDQU5GLENBREY7QUFvQkQ7O0FBQ0QsZUFDRSxvQkFBQyxJQUFELGVBQVU5SixLQUFWO0FBQWlCLFVBQUEsU0FBUyxFQUFDLGtCQUEzQjtBQUE4QyxVQUFBLEtBQUssRUFBRVcsR0FBRyxDQUFDK047QUFBekQsWUFDRzVFLElBREgsQ0FERjtBQUtELE9BL0VlO0FBQUEsS0E1aENHOztBQUFBLG9FQTZtQ0gsWUFBTTtBQUFBLDBCQUdoQixNQUFLOUosS0FIVztBQUFBLFVBRWxCbEIsV0FGa0IsaUJBRWxCQSxXQUZrQjtBQUFBLFVBRUxyQixJQUZLLGlCQUVMQSxJQUZLO0FBQUEsVUFFQ00sVUFGRCxpQkFFQ0EsVUFGRDtBQUFBLFVBRWFMLE1BRmIsaUJBRWFBLE1BRmI7QUFBQSxVQUVxQlUsY0FGckIsaUJBRXFCQSxjQUZyQjs7QUFJcEIsVUFBSSxDQUFDVSxXQUFELElBQWdCLENBQUNwQixNQUFqQixJQUEyQixDQUFDSyxVQUE1QixJQUEwQyxDQUFDTixJQUFJLENBQUNSLFVBQXBELEVBQWdFO0FBQzlELGVBQ0Usb0JBQUMsTUFBRDtBQUNFLFVBQUEsU0FBUyxFQUFDLGlCQURaO0FBRUUsVUFBQSxNQUFNLEVBQ0osb0JBQUMsSUFBRDtBQUFNLFlBQUEsS0FBSyxFQUFFO0FBQUUyUixjQUFBQSxTQUFTLEVBQUU7QUFBYjtBQUFiLGFBQ0Usb0JBQUMsQ0FBRDtBQUFHLFlBQUEsRUFBRSxFQUFDO0FBQU4sWUFERixDQUhKO0FBT0UsVUFBQSxLQUFLLEVBQUUsRUFQVDtBQVFFLFVBQUEsV0FBVyxFQUFFLEtBUmY7QUFTRSxVQUFBLFFBQVEsRUFBRTtBQVRaLFVBREY7QUFhRDs7QUFDRCxVQUFJLENBQUN4USxjQUFjLENBQUNXLElBQXBCLEVBQTBCO0FBQ3hCLFlBQUlyQixNQUFKLEVBQVk7QUFDVixpQkFDRSxvQkFBQyxNQUFEO0FBQ0UsWUFBQSxTQUFTLEVBQUMsaUJBRFo7QUFFRSxZQUFBLE1BQU0sRUFBRSxvQkFBQyxJQUFELGVBRlY7QUFHRSxZQUFBLEtBQUssRUFBRSxFQUhUO0FBSUUsWUFBQSxXQUFXLEVBQUUsS0FKZjtBQUtFLFlBQUEsUUFBUSxFQUFFO0FBTFosWUFERjtBQVNEOztBQUNELGVBQ0Usb0JBQUMsTUFBRDtBQUNFLFVBQUEsU0FBUyxFQUFDLGlCQURaO0FBRUUsVUFBQSxNQUFNLEVBQ0osb0JBQUMsSUFBRDtBQUFNLFlBQUEsS0FBSyxFQUFFO0FBQUVrUixjQUFBQSxTQUFTLEVBQUU7QUFBYjtBQUFiLGFBQ0Usb0JBQUMsQ0FBRDtBQUFHLFlBQUEsRUFBRSxFQUFDO0FBQU4sWUFERixDQUhKO0FBT0UsVUFBQSxLQUFLLEVBQUUsRUFQVDtBQVFFLFVBQUEsV0FBVyxFQUFFLEtBUmY7QUFTRSxVQUFBLFFBQVEsRUFBRTtBQVRaLFVBREY7QUFhRDs7QUFDRCxVQUFNdE4sT0FBTyxHQUFHLE1BQUt1TixlQUFMLEVBQWhCOztBQUNBLFVBQUl2TixPQUFPLENBQUN3TixNQUFSLEtBQW1CLENBQXZCLEVBQTBCLE9BQU8sSUFBUDtBQUMxQixhQUFPeE4sT0FBTyxDQUFDeU4sR0FBUixDQUFZLFVBQUFwTyxHQUFHO0FBQUEsZUFDcEIsb0JBQUMsTUFBRDtBQUNFLFVBQUEsR0FBRyxFQUFFQSxHQUFHLENBQUNILFNBRFg7QUFFRSxVQUFBLFNBQVMsRUFBRUcsR0FBRyxDQUFDSCxTQUZqQjtBQUdFLFVBQUEsTUFBTSxFQUNKLG9CQUFDLFVBQUQ7QUFDRSxZQUFBLEVBQUUsd0JBQXNCLE1BQUtSLEtBQUwsQ0FBV3ZDLElBQVgsQ0FBZ0JJLEVBQXRDLFNBQTRDOEMsR0FBRyxDQUFDSCxTQURwRDtBQUVFLFlBQUEsSUFBSSxFQUFFLE1BQUtSLEtBQUwsQ0FBV3ZDLElBRm5CO0FBR0UsWUFBQSxPQUFPLEVBQUUsTUFBS3VDLEtBQUwsQ0FBV3NCLE9BSHRCO0FBSUUsWUFBQSxNQUFNLEVBQUVYLEdBSlY7QUFLRSxZQUFBLGlCQUFpQixFQUFFLE1BQUtYLEtBQUwsQ0FBVzlCLFVBTGhDO0FBTUUsWUFBQSxnQkFBZ0IsRUFBRSxNQUFLOEIsS0FBTCxDQUFXN0IsU0FOL0I7QUFPRSxZQUFBLFlBQVksRUFBRSxNQUFLNkIsS0FBTCxDQUFXZ1AsVUFQM0I7QUFRRSxZQUFBLE1BQU0sRUFBRSxNQUFLaFAsS0FBTCxDQUFXdEMsTUFSckI7QUFTRSxZQUFBLFNBQVMsRUFBRSxNQUFLc0MsS0FBTCxDQUFXb0osU0FBWCxJQUF3QixNQUFLcEosS0FBTCxDQUFXaEMsV0FUaEQ7QUFVRSxZQUFBLEtBQUssRUFBRSxNQUFLZ0MsS0FBTCxDQUFXM0IsWUFBWCxDQUF3QnVCLEdBQXhCLENBQTRCZSxHQUFHLENBQUNILFNBQWhDLEVBQTJDRyxHQUFHLENBQUNnSixLQUEvQztBQVZULGFBWUdoSixHQUFHLENBQUN3SixNQVpQLENBSko7QUFtQkUsVUFBQSxJQUFJLEVBQUUsTUFBSzhFLFVBQUwsQ0FBZ0J0TyxHQUFoQixDQW5CUjtBQW9CRSxVQUFBLEtBQUssRUFBRSxNQUFLWCxLQUFMLENBQVczQixZQUFYLENBQXdCdUIsR0FBeEIsQ0FBNEJlLEdBQUcsQ0FBQ0gsU0FBaEMsRUFBMkNHLEdBQUcsQ0FBQ2dKLEtBQS9DLENBcEJUO0FBcUJFLFVBQUEsUUFBUSxFQUFFaEosR0FBRyxDQUFDdU8sUUFyQmhCO0FBc0JFLFVBQUEsUUFBUSxFQUFFdk8sR0FBRyxDQUFDd08sUUF0QmhCO0FBdUJFLFVBQUEsV0FBVyxFQUFFeE8sR0FBRyxDQUFDaUosV0F2Qm5CO0FBd0JFLFVBQUEsUUFBUSxFQUFFakosR0FBRyxDQUFDeU8sUUFBSixHQUFlek8sR0FBRyxDQUFDeU8sUUFBbkIsR0FBOEIsQ0F4QjFDO0FBeUJFLFVBQUEsS0FBSyxFQUFFek8sR0FBRyxDQUFDME8sS0F6QmI7QUEwQkUsVUFBQSxVQUFVLEVBQUUxTyxHQUFHLENBQUMyTyxVQTFCbEI7QUEyQkUsVUFBQSxtQkFBbUIsRUFBRTNPLEdBQUcsQ0FBQzRPO0FBM0IzQixVQURvQjtBQUFBLE9BQWYsQ0FBUDtBQStCRCxLQTNyQ2tCOztBQUVqQixVQUFLalMsS0FBTCxHQUFhO0FBQ1g2SyxNQUFBQSxVQUFVLEVBQUUsQ0FERDtBQUVYYSxNQUFBQSxhQUFhLEVBQUUsQ0FGSjtBQUdYN0ksTUFBQUEsZUFBZSxFQUFFLEtBSE47QUFJWDBOLE1BQUFBLFlBQVksRUFBRSxDQUpIO0FBS1hFLE1BQUFBLFlBQVksRUFBRTtBQUxILEtBQWI7QUFPQSxVQUFLaE4sUUFBTCxHQUFnQixFQUFoQjtBQUNBLFVBQUtDLGNBQUwsR0FBc0IsRUFBdEI7QUFDQSxVQUFLZ0MsaUJBQUwsR0FBeUIsS0FBekI7QUFDQSxVQUFLNEYsZUFBTCxHQUF1QixLQUF2QixDQVppQixDQVlhOztBQUM5QixVQUFLa0UsZ0JBQUwsR0FBd0IsS0FBeEIsQ0FiaUIsQ0FhYzs7QUFiZDtBQWNsQjs7OztTQUVEMEMsb0IsR0FBQSxnQ0FBdUI7QUFDckJwUCxJQUFBQSxRQUFRLENBQUNDLG1CQUFULENBQTZCLE9BQTdCLEVBQXNDLEtBQUtDLGVBQTNDO0FBQ0EsU0FBS04sS0FBTCxDQUFXeVAsVUFBWCxDQUFzQixLQUFLelAsS0FBTCxDQUFXdkMsSUFBakM7QUFDRCxHOztTQTBxQ0RpUyxNLEdBQUEsa0JBQVM7QUFBQTs7QUFDUCxRQUFNQyxhQUFhLEdBQUcxVCxVQUFVO0FBQzlCLCtCQUF5QixJQURLO0FBRTlCLHdCQUFrQixLQUFLK0QsS0FBTCxDQUFXbUosVUFBWCxJQUF5QixDQUFDLEtBQUtuSixLQUFMLENBQVc0UCxnQkFGekI7QUFHOUIsaUJBQVcsS0FBSzVQLEtBQUwsQ0FBV3RDLE1BSFE7QUFJOUIsb0JBQWMsS0FBS3NDLEtBQUwsQ0FBV2xDLFNBSks7QUFLOUIscUJBQWUsS0FBS2tDLEtBQUwsQ0FBV2pDO0FBTEksbUJBTTdCLEtBQUtpQyxLQUFMLENBQVdvTixTQU5rQixJQU1OLENBQUMsQ0FBQyxLQUFLcE4sS0FBTCxDQUFXb04sU0FOUCxlQUFoQyxDQURPLENBVVA7O0FBQ0EsU0FBS3lDLFVBQUwsQ0FBZ0IsS0FBSzdQLEtBQUwsQ0FBV0gsU0FBM0I7QUFFQSxRQUFJaVEsU0FBUyxHQUFHLElBQWhCO0FBQ0EsUUFBSUMsY0FBYyxHQUFHLElBQXJCO0FBQ0EsUUFBSUMsYUFBYSxHQUFHLElBQXBCOztBQUNBLFFBQ0UsQ0FBQyxLQUFLaFEsS0FBTCxDQUFXOFAsU0FBWCxJQUNJLEtBQUs5UCxLQUFMLENBQVdtSixVQURmLElBRUksS0FBS25KLEtBQUwsQ0FBV29KLFNBRmYsSUFHSSxLQUFLcEosS0FBTCxDQUFXaVEsUUFIaEIsS0FJRyxDQUFDLEtBQUtqUSxLQUFMLENBQVc0UCxnQkFMakIsRUFNRTtBQUNBRyxNQUFBQSxjQUFjLEdBQ1osb0JBQUMsU0FBRDtBQUFXLFFBQUEsUUFBUSxFQUFDO0FBQXBCLFNBQ0U7QUFBSyxRQUFBLFNBQVMsRUFBQztBQUFmLFNBQThDLEtBQUsvUCxLQUFMLENBQVc4UCxTQUF6RCxDQURGLEVBRUcsS0FBSzlQLEtBQUwsQ0FBV29KLFNBQVgsSUFDSSxLQUFLcEosS0FBTCxDQUFXa1EsZUFEZixJQUVJLENBQUMsS0FBS2xRLEtBQUwsQ0FBV21RLHdCQUZoQixJQUU0QyxvQkFBQyxpQkFBRCxFQUF1QixLQUFLblEsS0FBNUIsQ0FKL0MsRUFLRyxLQUFLQSxLQUFMLENBQVdtSixVQUFYLElBQ0Msb0JBQUMsa0JBQUQ7QUFDRSxRQUFBLFlBQVksRUFBRSxLQUFLaUgsa0JBRHJCO0FBRUUsUUFBQSxjQUFjLEVBQUUsS0FBS0Msb0JBRnZCO0FBR0UsUUFBQSxvQkFBb0IsRUFBRSxLQUFLQztBQUg3QixTQUlNLEtBQUt0USxLQUpYLEVBTkosRUFhRyxDQUFDLEtBQUtBLEtBQUwsQ0FBV3VRLGlCQUFYLElBQ0csS0FBS3ZRLEtBQUwsQ0FBV2lRLFFBRGQsSUFFRyxLQUFLalEsS0FBTCxDQUFXd1EsY0FGZCxJQUdJLEtBQUt4USxLQUFMLENBQVdvSixTQUFYLElBQXdCLENBQUMsS0FBS3BKLEtBQUwsQ0FBV2tRLGVBSHpDLEtBSUMsb0JBQUMsZ0JBQUQsRUFBc0IsS0FBS2xRLEtBQTNCLENBakJKLENBREY7QUFzQkQ7O0FBQ0QsUUFBSSxLQUFLQSxLQUFMLENBQVdnUSxhQUFYLElBQTRCLEtBQUtoUSxLQUFMLENBQVd5USxVQUEzQyxFQUF1RDtBQUNyRFQsTUFBQUEsYUFBYSxHQUNYLG9CQUFDLFNBQUQ7QUFBVyxRQUFBLFFBQVEsRUFBQztBQUFwQixTQUNFO0FBQUssUUFBQSxTQUFTLEVBQUM7QUFBZixTQUF5QyxLQUFLaFEsS0FBTCxDQUFXeVEsVUFBcEQsQ0FERixFQUVFO0FBQUssUUFBQSxTQUFTLEVBQUM7QUFBZixTQUE2QyxLQUFLelEsS0FBTCxDQUFXZ1EsYUFBeEQsQ0FGRixDQURGO0FBTUQ7O0FBQ0QsUUFBSUEsYUFBYSxJQUFJRCxjQUFyQixFQUFxQztBQUNuQ0QsTUFBQUEsU0FBUyxHQUNQO0FBQUssUUFBQSxTQUFTLEVBQUM7QUFBZixTQUNHRSxhQURILEVBRUdELGNBRkgsQ0FERjtBQU1EOztBQUNELFFBQUlXLFNBQVMsR0FBRyxLQUFLMVEsS0FBTCxDQUFXMFEsU0FBWCxJQUF3QixLQUFLMVEsS0FBTCxDQUFXMFEsU0FBWCxLQUF5QixDQUFqRCxHQUNaLEtBQUsxUSxLQUFMLENBQVcwUSxTQURDLEdBRVosS0FBSzFRLEtBQUwsQ0FBV3hCLElBQVgsQ0FBZ0JPLElBRnBCO0FBR0EsUUFBSSxLQUFLaUIsS0FBTCxDQUFXakMsVUFBZixFQUEyQjJTLFNBQVMsSUFBSSxLQUFLMVEsS0FBTCxDQUFXdEIsVUFBWCxDQUFzQkssSUFBbkM7QUFDM0IsUUFBSSxDQUFDLEtBQUtpQixLQUFMLENBQVc1QixjQUFYLENBQTBCVyxJQUEvQixFQUFxQzJSLFNBQVMsR0FBRyxDQUFaO0FBQ3JDLFdBQ0U7QUFDRSxNQUFBLEVBQUUsbUJBQWlCLEtBQUsxUSxLQUFMLENBQVd2QyxJQUFYLENBQWdCSSxFQURyQztBQUVFLE1BQUEsU0FBUyxFQUFFOFIsYUFGYjtBQUdFLE1BQUEsS0FBSyxFQUFFLEtBQUszUCxLQUFMLENBQVcyUTtBQUhwQixPQUtHLEtBQUszUSxLQUFMLENBQVd0QyxNQUFYLElBQXFCLG9CQUFDLE9BQUQsT0FMeEIsRUFNRyxLQUFLSixLQUFMLENBQVc2QyxlQUFYLElBQ0Msb0JBQUMsV0FBRDtBQUNFLE1BQUEsQ0FBQyxFQUFFLEtBQUs3QyxLQUFMLENBQVd1USxZQURoQjtBQUVFLE1BQUEsQ0FBQyxFQUFFLEtBQUt2USxLQUFMLENBQVd5USxZQUZoQjtBQUdFLE1BQUEsU0FBUyxFQUFFLEtBQUt6USxLQUFMLENBQVc2QyxlQUh4QjtBQUlFLE1BQUEsZ0JBQWdCLEVBQUUsS0FBS0gsS0FBTCxDQUFXQyxnQkFKL0I7QUFLRSxNQUFBLElBQUksRUFBRSxLQUFLRCxLQUFMLENBQVd4QixJQUxuQjtBQU1FLE1BQUEsSUFBSSxFQUFFLEtBQUt3QixLQUFMLENBQVd2QyxJQU5uQjtBQU9FLE1BQUEsYUFBYSxFQUFFLEtBQUt1QyxLQUFMLENBQVd6QjtBQVA1QixNQVBKLEVBaUJHdVIsU0FqQkgsRUFrQkUsb0JBQUMsd0JBQUQsZUFDTSxLQUFLOVAsS0FEWDtBQUVFLE1BQUEsRUFBRSxFQUFFLEtBQUtBLEtBQUwsQ0FBV3ZDLElBQVgsQ0FBZ0JJLEVBRnRCO0FBR0UsTUFBQSxTQUFTLEVBQUU2UyxTQUhiO0FBSUUsTUFBQSxZQUFZLEVBQ1QsS0FBSzFRLEtBQUwsQ0FBV29KLFNBQVgsSUFBd0IsS0FBS3BKLEtBQUwsQ0FBV2hDLFdBQXBDLEdBQ0ksS0FBS2dDLEtBQUwsQ0FBVzRRLFlBQVgsR0FBMEIsS0FBSzVRLEtBQUwsQ0FBVzZRLGVBRHpDLEdBRUksS0FBSzdRLEtBQUwsQ0FBVzRRLFlBUG5CO0FBU0UsTUFBQSxTQUFTLEVBQUUsS0FBSzVRLEtBQUwsQ0FBVzhRLFNBVHhCO0FBVUUsTUFBQSx5QkFBeUIsRUFBRSxLQUFLQyx5QkFWbEM7QUFXRSxNQUFBLGdCQUFnQixFQUFFLEtBWHBCO0FBWUUsTUFBQSxVQUFVLEVBQUUsS0FBS0MsY0FabkI7QUFhRSxNQUFBLGNBQWMsRUFBRSxLQUFLaFIsS0FBTCxDQUFXaVIsY0FBWCxJQUE2QixLQUFLM1QsS0FBTCxDQUFXMEwsYUFiMUQ7QUFjRSxNQUFBLFNBQVMsRUFBRSxLQUFLaEosS0FBTCxDQUFXa1IsU0FkeEI7QUFlRSxNQUFBLFdBQVcsRUFBRSxLQUFLQyxjQUFMLEVBZmY7QUFnQkUsTUFBQSxnQkFBZ0IsRUFBRSxLQUFLblIsS0FBTCxDQUFXb1IsZ0JBaEIvQjtBQWlCRSxNQUFBLGNBQWMsRUFBRSxLQUFLcFIsS0FBTCxDQUFXcVIsV0FqQjdCO0FBa0JFLE1BQUEsZUFBZSxFQUFFLEtBQUtyUixLQUFMLENBQVdzUixlQWxCOUI7QUFtQkUsTUFBQSxlQUFlLEVBQUUsS0FBS3RSLEtBQUwsQ0FBV3VSLGVBbkI5QjtBQW9CRSxNQUFBLGFBQWEsRUFBRSxLQUFLdlIsS0FBTCxDQUFXd1IsYUFwQjVCO0FBcUJFLE1BQUEsV0FBVyxFQUFFLEtBQUt4UixLQUFMLENBQVd5UixXQXJCMUI7QUFzQkUsTUFBQSxrQkFBa0IsRUFBRSxLQUFLQyxlQXRCM0I7QUF1QkUsTUFBQSxlQUFlLEVBQUUsS0FBSzFSLEtBQUwsQ0FBV2tPLGVBQVgsSUFBOEIsS0FBS3lELHFCQXZCdEQ7QUF3QkUsTUFBQSxxQkFBcUIsRUFBRSxLQUFLM1IsS0FBTCxDQUFXNFIscUJBeEJwQztBQXlCRSxNQUFBLGdCQUFnQixFQUFFLEtBQUtDO0FBekJ6QixRQTJCRyxLQUFLQyxhQUFMLEVBM0JILENBbEJGLEVBK0NHLEtBQUs5UixLQUFMLENBQVcvQix5QkFBWCxJQUNDLG9CQUFDLG1CQUFEO0FBQ0UsTUFBQSxJQUFJLEVBQUUsS0FBSytCLEtBQUwsQ0FBV3ZDLElBRG5CO0FBRUUsTUFBQSxPQUFPLEVBQUUsS0FBS3VDLEtBQUwsQ0FBV3NCLE9BRnRCO0FBR0UsTUFBQSxjQUFjLEVBQUUsS0FBS3RCLEtBQUwsQ0FBVzVCLGNBSDdCO0FBSUUsTUFBQSx3QkFBd0IsRUFBRSxLQUFLNEIsS0FBTCxDQUFXK1Isd0JBSnZDO0FBS0UsTUFBQSxrQkFBa0IsRUFBRSxLQUFLL1IsS0FBTCxDQUFXZ1M7QUFMakMsTUFoREosRUF3REcsS0FBS2hTLEtBQUwsQ0FBV2lTLFFBeERkLENBREY7QUE0REQsRzs7O0VBajBDb0J6VyxLQUFLLENBQUMwVyxhLDRDQUdMblYsWTtBQWkwQ3hCLGVBQWVnRCxRQUFmIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcHJlZmVyLWRlc3RydWN0dXJpbmcgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLWxvbmVseS1pZiwgcHJlZmVyLXRlbXBsYXRlLCByZWFjdC9yZXF1aXJlLWRlZmF1bHQtcHJvcHMgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBNYXAsIExpc3QgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IGluamVjdEludGwsIEZvcm1hdHRlZE1lc3NhZ2UgYXMgTSB9IGZyb20gJ3JlYWN0LWludGwnO1xuaW1wb3J0IHsgQ29sdW1uLCBDZWxsIH0gZnJvbSAnZml4ZWQtZGF0YS10YWJsZS0yJztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHsgSWNvbiB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWljb25zJztcbmltcG9ydCBTcGlubmVyIGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXNwaW5uZXInO1xuaW1wb3J0IENoZWNrYm94IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWNoZWNrYm94JztcbmltcG9ydCAnZml4ZWQtZGF0YS10YWJsZS0yL2Rpc3QvZml4ZWQtZGF0YS10YWJsZS5jc3MnO1xuXG5pbXBvcnQgUmVzcG9uc2l2ZUZpeGVkRGF0YVRhYmxlIGZyb20gJy4vcmVzcG9uc2l2ZS1maXhlZC1kYXRhLXRhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgSGVhZGVyQ2VsbCBmcm9tICcuL2hlYWRlci1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgQWN0aW9uQmFyIGZyb20gJy4vYWN0aW9uLWJhci5jb21wb25lbnQnO1xuaW1wb3J0IElubGluZUVkaXRDb250cm9scyBmcm9tICcuL2lubGluZS1lZGl0LWNvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgRmlsdGVyaW5nQ29udHJvbHMgZnJvbSAnLi9maWx0ZXJpbmctY29udHJvbHMuY29tcG9uZW50JztcbmltcG9ydCBEcm9wZG93bkNvbnRyb2xzIGZyb20gJy4vZHJvcGRvd24tY29udHJvbHMuY29tcG9uZW50JztcbmltcG9ydCAqIGFzIGRhdGFncmlkQWN0aW9ucyBmcm9tICcuL2RhdGFncmlkLmFjdGlvbnMnO1xuaW1wb3J0IENlbGxUb29sdGlwIGZyb20gJy4vY2VsbC10b29sdGlwLmNvbXBvbmVudCc7XG5pbXBvcnQgQ29sdW1uU2V0dGluZ3NNb2RhbCBmcm9tICcuL2NvbHVtbi1zZXR0aW5ncy9jb2x1bW4tc2V0dGluZ3MuY29tcG9uZW50JztcbmltcG9ydCB7IHByb3BUeXBlcywgZGVmYXVsdFByb3BzIH0gZnJvbSAnLi9kYXRhZ3JpZC5wcm9wcyc7XG5pbXBvcnQgeyBLRVlfQ09ERVMgfSBmcm9tICcuL2RhdGFncmlkLmNvbnN0YW50cyc7XG5pbXBvcnQgcGFnaW5hdGlvbiBmcm9tICcuL3BhZ2luYXRpb24uY29tcG9uZW50JztcbmltcG9ydCBDb250ZXh0TWVudSBmcm9tICcuL2NvbnRleHQtbWVudS5jb21wb25lbnQnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4vZGF0YWdyaWQudXRpbHMnO1xuaW1wb3J0IEdyaWRDb2x1bW5TZXJ2aWNlIGZyb20gJy4vY29sdW1uLXNlcnZpY2UvY29sdW1uLXNlcnZpY2UnO1xuaW1wb3J0ICcuL2RhdGFncmlkLmNvbXBvbmVudC5zY3NzJztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlLCBvd25Qcm9wcykgPT4ge1xuICBjb25zdCBHUklEID0gb3duUHJvcHMuZ3JpZDtcbiAgcmV0dXJuIHtcbiAgICBpc0J1c3k6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdpc0J1c3knXSwgdHJ1ZSksXG4gICAgaXNFZGl0aW5nOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnaXNFZGl0aW5nJ10sIGZhbHNlKSxcbiAgICBpc0NyZWF0aW5nOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnaXNDcmVhdGluZyddLCBmYWxzZSksXG4gICAgaXNGaWx0ZXJpbmc6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnaXNGaWx0ZXJpbmcnXSwgZmFsc2UpLFxuICAgIGlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW46IHN0YXRlLmRhdGFncmlkLmdldEluKFxuICAgICAgW0dSSUQuaWQsICdzZXNzaW9uJywgJ2NvbHVtblNldHRpbmdzTW9kYWwnLCAnb3BlbiddLFxuICAgICAgZmFsc2UsXG4gICAgKSxcbiAgICBzb3J0Q29sdW1uOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdzb3J0aW5nRGF0YScsICdzb3J0Q29sdW1uJ10sIG51bGwpLFxuICAgIHNvcnRPcmRlcjogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnc29ydGluZ0RhdGEnLCAnc29ydE9yZGVyJ10sIG51bGwpLFxuICAgIHZpc2libGVDb2x1bW5zOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICd2aXNpYmxlQ29sdW1ucyddLCBMaXN0KCkpLFxuICAgIGNvbHVtbldpZHRoczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnY29sdW1uV2lkdGhzJ10sIE1hcCgpKSxcbiAgICBzZWxlY3RlZENlbGw6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2VsZWN0ZWRDZWxsJ10sIE1hcCgpKSxcbiAgICBzZWxlY3RlZEl0ZW1zOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3NlbGVjdGVkSXRlbXMnXSwgTGlzdCgpKSxcbiAgICBkYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2RhdGEnXSwgTGlzdCgpKSxcbiAgICBlZGl0RGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdlZGl0RGF0YSddLCBNYXAoKSksXG4gICAgY3JlYXRlRGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjcmVhdGVEYXRhJ10sIExpc3QoKSksXG4gICAgZmlsdGVyRGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdmaWx0ZXJEYXRhJ10sIE1hcCgpKSxcbiAgICBjZWxsTWVzc2FnZXM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY2VsbE1lc3NhZ2VzJ10sIE1hcCgpKSxcbiAgICBjcmVhdGVDZWxsTWVzc2FnZXM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY3JlYXRlQ2VsbE1lc3NhZ2VzJ10sIE1hcCgpKSxcbiAgICBhbGxEYXRhU2l6ZTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdhbGxEYXRhJ10sIExpc3QoKSkuc2l6ZSxcbiAgICBsYW5ndWFnZTogVXRpbHMuZ2V0TGFuZ3VhZ2UoR1JJRCwgc3RhdGUudXNlciksXG4gICAgcmVnaW9uOiBVdGlscy5nZXRSZWdpb24oR1JJRCwgc3RhdGUudXNlciksXG4gICAgZGF0ZUZvcm1hdDogVXRpbHMuZ2V0RGF0ZUZvcm1hdChHUklELCBzdGF0ZS51c2VyKSxcbiAgICB0aG91c2FuZFNlcGFyYXRvcjogVXRpbHMuZ2V0VGhvdXNhbmRTZXBhcmF0b3IoR1JJRCwgc3RhdGUudXNlciksXG4gICAgZGVjaW1hbFNlcGFyYXRvcjogVXRpbHMuZ2V0RGVjaW1hbFNlcGFyYXRvcihHUklELCBzdGF0ZS51c2VyKSxcbiAgICBmb3JjZVJlZnJlc2hUaW1lc3RhbXA6IHN0YXRlLmRhdGFncmlkLmdldCgnZm9yY2VSZWZyZXNoJywgMCksIC8vIGZvcmNlIHJlLXJlbmRlciB3aGVuIGNoYW5nZWRcbiAgICBmb2N1c1R5cGU6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdmb2N1c1R5cGUnXSwgTWFwKCkpLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGF0YWdyaWRBY3Rpb25zO1xuXG5AcGFnaW5hdGlvblxuQGluamVjdEludGxcbkBjb25uZWN0KFxuICBtYXBTdGF0ZVRvUHJvcHMsXG4gIG1hcERpc3BhdGNoVG9Qcm9wcyxcbilcbmNsYXNzIERhdGFHcmlkIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSBwcm9wVHlwZXM7XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY3VycmVudFJvdzogMCxcbiAgICAgIGN1cnJlbnRDb2x1bW46IDAsXG4gICAgICBjb250ZXh0TWVudU9wZW46IGZhbHNlLFxuICAgICAgY29udGV4dE1lbnVYOiAwLFxuICAgICAgY29udGV4dE1lbnVZOiAwLFxuICAgIH07XG4gICAgdGhpcy5jZWxsUmVmcyA9IHt9O1xuICAgIHRoaXMuY3JlYXRlQ2VsbFJlZnMgPSB7fTtcbiAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsID0gZmFsc2U7XG4gICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTsgLy8gVE9ETzogSGFuZGxlIGZvY3VzaW5nIHdoZW4gdHJ1ZVxuICAgIHRoaXMuZm9jdXNUb0Vycm9yQ2VsbCA9IGZhbHNlOyAvLyBUT0RPOiBIYW5kbGUgZm9jdXNpbmcgd2hlbiB0cnVlXG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25Eb2N1bWVudENsaWNrKTtcbiAgICB0aGlzLnByb3BzLmludmFsaWRhdGUodGhpcy5wcm9wcy5ncmlkKTtcbiAgfVxuXG4gIG9uRG9jdW1lbnRDbGljayA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5jb250ZXh0TWVudUl0ZW1zKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY29udGV4dE1lbnVPcGVuOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25Eb2N1bWVudENsaWNrKTtcbiAgfTtcblxuICBvbkNvbHVtblJlc2l6ZUVuZENhbGxiYWNrID0gKG5ld0NvbHVtbldpZHRoLCBjb2x1bW5LZXkpID0+IHtcbiAgICB0aGlzLnByb3BzLnJlc2l6ZUNvbHVtbih0aGlzLnByb3BzLmdyaWQsIGNvbHVtbktleSwgbmV3Q29sdW1uV2lkdGgpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gcm93SW5kZXggKGludClcbiAgICogQHBhcmFtIGNvbCAob2JqKS4gQ29sdW1uIG9iamVjdC5cbiAgICogQHBhcmFtIGUuIE9yaWdpbmFsIEtleURvd24gZXZlbnRcbiAgICogQHBhcmFtIGNyZWF0ZSAoYm9vbCkuIElzIHRoZSBjZWxsIGNyZWF0ZSBjZWxsIG9yIGVkaXQgY2VsbD9cbiAgICovXG4gIG9uQ2VsbEtleURvd24gPSAocm93SW5kZXgsIGNvbCwgZSwgY3JlYXRlID0gZmFsc2UpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5lbmFibGVBcnJvd05hdmlnYXRpb24pIHtcbiAgICAgIGNvbnN0IGNlbGxSZWZzID0gY3JlYXRlID8gdGhpcy5jcmVhdGVDZWxsUmVmcyA6IHRoaXMuY2VsbFJlZnM7XG4gICAgICBjb25zdCBhcnJvd0tleXMgPSBbS0VZX0NPREVTLkRPV04sIEtFWV9DT0RFUy5VUCwgS0VZX0NPREVTLkxFRlQsIEtFWV9DT0RFUy5SSUdIVF07XG4gICAgICBjb25zdCB7XG4gICAgICAgIGNvbHVtbnMsIHZpc2libGVDb2x1bW5zLCBncmlkLCBkYXRhLCBvbkxhc3RDZWxsVGFiUHJlc3MsXG4gICAgICB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IGdyaWRDb2x1bW5zID0gVXRpbHMudmlzaWJsZUNvbHVtbnMoY29sdW1ucywgdmlzaWJsZUNvbHVtbnMpO1xuICAgICAgY29uc3QgZ2V0Q29sdW1uS2V5QnlJbmRleCA9IGkgPT4gVXRpbHMuZ2V0Q29sdW1uS2V5KGdyaWRDb2x1bW5zW2ldKTtcbiAgICAgIGNvbnN0IHJvd3NTaXplID0gZGF0YS5zaXplO1xuICAgICAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCk7XG4gICAgICBsZXQgY3VycmVudENlbGwgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2NvbHVtbktleX1fJHtyb3dJbmRleH1gXTtcbiAgICAgIGxldCBwcm94eSA9IG51bGw7XG5cbiAgICAgIGNvbnN0IGlzQ3Vyc29yQXRTdGFydCA9ICgpID0+IHtcbiAgICAgICAgaWYgKGN1cnJlbnRDZWxsLnR5cGUgIT09ICd0ZXh0JykgcmV0dXJuIHRydWU7XG4gICAgICAgIHJldHVybiBjdXJyZW50Q2VsbC5zZWxlY3Rpb25TdGFydCA9PT0gMDtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGlzQ3Vyc29yQXRFbmQgPSAoKSA9PiB7XG4gICAgICAgIGlmIChjdXJyZW50Q2VsbC50eXBlICE9PSAndGV4dCcpIHJldHVybiB0cnVlO1xuICAgICAgICByZXR1cm4gY3VycmVudENlbGwuc2VsZWN0aW9uRW5kID09PSBjdXJyZW50Q2VsbC52YWx1ZS5sZW5ndGg7XG4gICAgICB9O1xuXG4gICAgICAvLyBJZiBjdXJyZW50IGNlbGwgaG9sZHMgYSByZWFjdC1mbG9hdGluZy1zZWxlY3QgY29tcG9uZW50XG4gICAgICBpZiAoY3VycmVudENlbGwgJiYgKGN1cnJlbnRDZWxsLnNlbGVjdFJlZiB8fCB0eXBlb2YgY3VycmVudENlbGwuc2VsZWN0ID09PSAnb2JqZWN0JykpIHtcbiAgICAgICAgcHJveHkgPSBjdXJyZW50Q2VsbDtcbiAgICAgICAgY3VycmVudENlbGwgPSB0aGlzLmdldFNlbGVjdFJlZihwcm94eSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFByZXZlbnRzIHVwL2Rvd24gYXJyb3cgZnJvbSBjaGFuZ2luZyBudW1iZXIgZmllbGQgdmFsdWVcbiAgICAgIGlmIChhcnJvd0tleXMuaW5jbHVkZXMoZS5rZXlDb2RlKSAmJiBjdXJyZW50Q2VsbC50eXBlID09PSAnbnVtYmVyJykgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuRU5URVI6XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLkVTQzoge1xuICAgICAgICAgIGlmIChjcmVhdGUgJiYgZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuRU5URVIpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuYWRkTmV3SXRlbShncmlkLCBVdGlscy5nZXRDb2x1bW5EZWZhdWx0VmFsdWVzKGNvbHVtbnMpKTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGN1cnJlbnRDZWxsLnNlbGVjdCgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLkRPV046IHtcbiAgICAgICAgICBsZXQgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2NvbHVtbktleX1fJHtyb3dJbmRleCArIDF9YF07XG5cbiAgICAgICAgICAvLyBQcmV2ZW50cyBtZW51IGZyb20gb3BlbmluZ1xuICAgICAgICAgIGlmIChwcm94eSAmJiBwcm94eS5zZWxlY3RSZWYgJiYgIXByb3h5LnNlbGVjdFJlZi5zdGF0ZS5tZW51SXNPcGVuKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAoIW5leHRFbGVtZW50KSBicmVhaztcbiAgICAgICAgICAgIG5leHRFbGVtZW50ID0gdGhpcy5nZXRTZWxlY3RSZWYobmV4dEVsZW1lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm1vdmVDZWxsRm9jdXMobmV4dEVsZW1lbnQsIHJvd0luZGV4ICsgMSwgLTEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLlVQOiB7XG4gICAgICAgICAgbGV0IG5leHRFbGVtZW50ID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtjb2x1bW5LZXl9XyR7cm93SW5kZXggLSAxfWBdO1xuXG4gICAgICAgICAgLy8gUHJldmVudHMgbWVudSBmcm9tIG9wZW5pbmdcbiAgICAgICAgICBpZiAocHJveHkgJiYgcHJveHkuc2VsZWN0UmVmICYmICFwcm94eS5zZWxlY3RSZWYuc3RhdGUubWVudUlzT3Blbikge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKCFuZXh0RWxlbWVudCkgYnJlYWs7XG4gICAgICAgICAgICBuZXh0RWxlbWVudCA9IHRoaXMuZ2V0U2VsZWN0UmVmKG5leHRFbGVtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5tb3ZlQ2VsbEZvY3VzKG5leHRFbGVtZW50LCByb3dJbmRleCAtIDEsIC0xKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5UQUI6XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLlJJR0hUOlxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5MRUZUOiB7XG4gICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLlJJR0hUICYmICFpc0N1cnNvckF0RW5kKCkpIGJyZWFrO1xuICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5MRUZUICYmICFpc0N1cnNvckF0U3RhcnQoKSkgYnJlYWs7XG5cbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICBsZXQgY29sdW1uSW5kID0gZ3JpZENvbHVtbnMuZmluZEluZGV4KGMgPT4gYy52YWx1ZUtleVBhdGguam9pbignLycpID09PSBjb2x1bW5LZXkpO1xuICAgICAgICAgIGlmIChjb2x1bW5JbmQgIT09IC0xKSB7XG4gICAgICAgICAgICBsZXQgZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgbGV0IG5leHRFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIGxldCByb3dJbmQgPSByb3dJbmRleDtcbiAgICAgICAgICAgIHdoaWxlIChkaXNhYmxlZCkge1xuICAgICAgICAgICAgICAvLyBNb3ZpbmcgdG8gdGhlIGxlZnRcbiAgICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLkxFRlQgfHwgKGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLlRBQiAmJiBlLnNoaWZ0S2V5KSkge1xuICAgICAgICAgICAgICAgIGlmIChjb2x1bW5JbmQgLSAxID49IDApIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCAtPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm93SW5kIC0gMSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgPSBncmlkQ29sdW1ucy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgICAgcm93SW5kIC09IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBNb3ZpbmcgdG8gdGhlIHJpZ2h0XG4gICAgICAgICAgICAgICAgaWYgKGNvbHVtbkluZCArIDEgPCBncmlkQ29sdW1ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCArPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm93SW5kICsgMSA8IHJvd3NTaXplKSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgPSAwO1xuICAgICAgICAgICAgICAgICAgcm93SW5kICs9IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyb3dJbmQgKyAxID09PSByb3dzU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgLy8gSWYgdHJ5aW5nIHRvIHNlbGVjdCBhIHJvdywgd2hlbiB0aGVyZSBpcyBub25lOlxuICAgICAgICAgICAgICAgICAgaWYgKG9uTGFzdENlbGxUYWJQcmVzcyAmJiBlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5UQUIpIG9uTGFzdENlbGxUYWJQcmVzcyhlKTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIG5leHRFbGVtZW50ID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtnZXRDb2x1bW5LZXlCeUluZGV4KGNvbHVtbkluZCl9XyR7cm93SW5kfWBdO1xuXG4gICAgICAgICAgICAgIC8vIElmIHdlIGNhbm5vdCBmb2N1cyBvbiB0aGUgbmV4dCBlbGVtZW50IHdoaWxlIG1vdmluZyB0byB0aGUgcmlnaHRcbiAgICAgICAgICAgICAgaWYgKCFuZXh0RWxlbWVudCAmJiBlLmtleUNvZGUgIT09IEtFWV9DT0RFUy5MRUZUKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgd2UncmUgbm90IHlldCBpbiB0aGUgbGFzdCBmb2N1c2FibGUgY29sdW1uXG4gICAgICAgICAgICAgICAgaWYgKGNvbHVtbkluZCA8PSBncmlkQ29sdW1ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgIHdoaWxlIChjb2x1bW5JbmQgPD0gZ3JpZENvbHVtbnMubGVuZ3RoICYmICFuZXh0RWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Z2V0Q29sdW1uS2V5QnlJbmRleChjb2x1bW5JbmQpfV8ke3Jvd0luZH1gXTtcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uSW5kICs9IDE7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UgYXJlIGluIHRoZSBsYXN0IGNvbHVtbiBhbmQgd2UgZG9uJ3QgaGF2ZSBhbiBlbGVtZW50IHRvIGZvY3VzIG9uLFxuICAgICAgICAgICAgICAgICAgICAvLyB3ZSBtdXN0IG1vdmUgdG8gdGhlIG5leHQgcm93IChpZiBwb3NzaWJsZSlcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFuZXh0RWxlbWVudCAmJiBjb2x1bW5JbmQgPT09IGdyaWRDb2x1bW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHRyeWluZyB0byBzZWxlY3QgYSByb3csIHdoZW4gdGhlcmUgaXMgbm9uZTpcbiAgICAgICAgICAgICAgICAgICAgICBpZiAocm93SW5kICsgMSA9PT0gcm93c1NpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbkxhc3RDZWxsVGFiUHJlc3MgJiYgZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuVEFCKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uTGFzdENlbGxUYWJQcmVzcyhlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgcm93SW5kICs9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2dldENvbHVtbktleUJ5SW5kZXgoY29sdW1uSW5kKX1fJHtyb3dJbmR9YF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgY2Fubm90IGZvY3VzIG9uIHRoZSBuZXh0IGVsZW1lbnQgd2hpbGUgbW92aW5nIHRvIHRoZSBsZWZ0XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoIW5leHRFbGVtZW50ICYmIGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLkxFRlQpIHtcbiAgICAgICAgICAgICAgICB3aGlsZSAoY29sdW1uSW5kID4gMCAmJiAhbmV4dEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCAtPSAxO1xuICAgICAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2dldENvbHVtbktleUJ5SW5kZXgoY29sdW1uSW5kKX1fJHtyb3dJbmR9YF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGlmIG5vIGVsZW1lbnQgd2FzIGZvdW5kLCB0cnkgbW92aW5nIHRvIHByZXZpb3VzIHJvd1xuICAgICAgICAgICAgICAgIC8vIChuZWVkZWQgaW4gY2FzZSBmaXJzdCBjb2x1bW4gaXMgbm90IGVkaXRhYmxlIGUuZy4gYW4gRXh0cmFDb2x1bW4pXG4gICAgICAgICAgICAgICAgaWYgKHJvd0luZCA+IDAgJiYgIW5leHRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgPSBncmlkQ29sdW1ucy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgICAgcm93SW5kIC09IDE7XG4gICAgICAgICAgICAgICAgICBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Z2V0Q29sdW1uS2V5QnlJbmRleChjb2x1bW5JbmQpfV8ke3Jvd0luZH1gXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZGlzYWJsZWQgPSBuZXh0RWxlbWVudCA/IG5leHRFbGVtZW50LmRpc2FibGVkIDogZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWRpc2FibGVkICYmIG5leHRFbGVtZW50KSB7XG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgbmV4dEVsZW1lbnQuc2VsZWN0ID09PSAnb2JqZWN0JyB8fCBuZXh0RWxlbWVudC5zZWxlY3RSZWYpIHtcbiAgICAgICAgICAgICAgICBuZXh0RWxlbWVudCA9IHRoaXMuZ2V0U2VsZWN0UmVmKG5leHRFbGVtZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGlzLm1vdmVDZWxsRm9jdXMobmV4dEVsZW1lbnQsIHJvd0luZCwgY29sdW1uSW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgb25FZGl0Q2VsbEtleURvd24gPSAocm93SW5kZXgsIGNvbCkgPT4gKGUpID0+IHtcbiAgICB0aGlzLm9uQ2VsbEtleURvd24ocm93SW5kZXgsIGNvbCwgZSk7XG4gIH07XG5cbiAgb25DcmVhdGVDZWxsS2V5RG93biA9IChyb3dJbmRleCwgY29sKSA9PiAoZSkgPT4ge1xuICAgIHRoaXMub25DZWxsS2V5RG93bihyb3dJbmRleCwgY29sLCBlLCB0cnVlKTtcbiAgfTtcblxuICBvbkZpbHRlckNlbGxWYWx1ZUNoYW5nZSA9IChjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZXZlbnRPckRhdGEpID0+IHtcbiAgICBsZXQgcmF3VmFsdWU7XG4gICAgLy8gZXZlbnRPckRhdGEgY2FuIGJlIGlucHV0IG9uQ2hhbmdlIGV2ZW50LCByZWFjdC1zZWxlY3Qgb25DaGFuZ2Ugb3IgcmVhY3QtZGF5LXBpY2tlciBvbkNoYW5nZVxuICAgIGlmIChldmVudE9yRGF0YSkge1xuICAgICAgaWYgKGV2ZW50T3JEYXRhLnRhcmdldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChldmVudE9yRGF0YS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCB2YWx1ZSA9IHZhbHVlUGFyc2VyKHJhd1ZhbHVlKTtcbiAgICB0aGlzLnByb3BzLmZpbHRlckNlbGxWYWx1ZUNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIHRoaXMucHJvcHMuY29sdW1ucywgY29sLCB2YWx1ZSk7XG4gIH07XG5cbiAgb25GaWx0ZXJDZWxsTXVsdGlWYWx1ZUJsdXIgPSBjb2wgPT4gKCkgPT4ge1xuICAgIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2wpO1xuICAgIGNvbnN0IHsgY29sdW1ucywgZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlLCBncmlkIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNlbGVjdGVkRmlsdGVycyA9IHRoaXMuc3RhdGVbY29sdW1uS2V5XTtcbiAgICBpZiAoc2VsZWN0ZWRGaWx0ZXJzKSB7XG4gICAgICBmaWx0ZXJDZWxsVmFsdWVDaGFuZ2UoZ3JpZCwgY29sdW1ucywgY29sLCBzZWxlY3RlZEZpbHRlcnMpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IFtjb2x1bW5LZXldOiB1bmRlZmluZWQgfSk7XG4gICAgfVxuICB9O1xuXG4gIG9uRmlsdGVyQ2VsbE11bHRpVmFsdWVDaGFuZ2UgPSAoY29sLCB2YWx1ZVBhcnNlcikgPT4gKGRhdGEgPSBbXSkgPT4ge1xuICAgIC8vIGRhdGEgaXMgaW5wdXQgb2YgcmVhY3Qtc2VsZWN0IG9uQ2hhbmdlXG4gICAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCk7XG4gICAgY29uc3Qgc2VsZWN0ZWRGaWx0ZXJzID0gdGhpcy5zdGF0ZVtjb2x1bW5LZXldO1xuICAgIGlmICghc2VsZWN0ZWRGaWx0ZXJzICYmIGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAvLyBlbmRzIHVwIGhlcmUgaW4gY2FzZSBvZiBjbGVhciBidXR0b25cbiAgICAgIGNvbnN0IHsgY29sdW1ucywgZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlLCBncmlkIH0gPSB0aGlzLnByb3BzO1xuICAgICAgZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlKGdyaWQsIGNvbHVtbnMsIGNvbCwgZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdmFsdWVQYXJzZXIoZGF0YSk7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgW2NvbHVtbktleV06IHZhbHVlIH0pO1xuICAgIH1cbiAgfTtcblxuICBvbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGV2ZW50T3JEYXRhKSA9PiB7XG4gICAgY29uc3QgeyBjcmVhdGVDZWxsVmFsdWVDaGFuZ2UsIGdyaWQgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IHJhd1ZhbHVlO1xuICAgIC8vIGV2ZW50T3JEYXRhIGNhbiBiZSBpbnB1dCBvbkNoYW5nZSBldmVudCwgcmVhY3Qtc2VsZWN0IG9uQ2hhbmdlIG9yIHJlYWN0LWRheS1waWNrZXIgb25DaGFuZ2VcbiAgICBpZiAoZXZlbnRPckRhdGEpIHtcbiAgICAgIGlmIChldmVudE9yRGF0YS50YXJnZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnRPckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSB2YWx1ZVBhcnNlcihyYXdWYWx1ZSk7XG5cbiAgICBjb25zdCB7IGNvbXBvbmVudFR5cGUgfSA9IGNvbDtcbiAgICBzd2l0Y2ggKGNvbXBvbmVudFR5cGUpIHtcbiAgICAgIGNhc2UgJ2N1cnJlbmN5JzpcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICd0ZXh0Jzoge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlKGdyaWQsIHJvd0luZGV4LCBjb2wudmFsdWVLZXlQYXRoLCB2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY29sLm9uQ3JlYXRlVmFsdWVDaGFuZ2UpIHtcbiAgICAgIGNvbC5vbkNyZWF0ZVZhbHVlQ2hhbmdlKHZhbHVlLCBjb2wudmFsdWVLZXlQYXRoLCByb3dJbmRleCk7XG4gICAgfVxuICAgIGlmIChjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUgJiYgdmFsdWUgPT09IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5tYXRjaFZhbHVlKSB7XG4gICAgICAvLyBDYWxsIHNwZWNpYWwgcGFpcmVkIHZhbHVlIGNoYW5nZSBvbiBvdGhlciBjZWxsIGlmIHZhbHVlIG1hdGNoZXNcbiAgICAgIHRoaXMub25DcmVhdGVDZWxsVmFsdWVDaGFuZ2UoXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICB7IHZhbHVlS2V5UGF0aDogY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm5ld1ZhbHVlS2V5UGF0aCB9LFxuICAgICAgICB2ID0+IHYsXG4gICAgICApKGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5uZXdWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjb2wudmFsaWRhdG9ycykge1xuICAgICAgdGhpcy5wcm9wcy5jcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZShcbiAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgY29sLnZhbHVlS2V5UGF0aCxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIGNvbC52YWxpZGF0b3JzLFxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgb25FZGl0Q2VsbFZhbHVlQ2hhbmdlID0gKHJvd0luZGV4LCBjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZXZlbnRPckRhdGEpID0+IHtcbiAgICBjb25zdCB7IGVkaXRDZWxsVmFsdWVDaGFuZ2UsIGdyaWQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgZGF0YUlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICBsZXQgcmF3VmFsdWU7XG4gICAgLy8gZXZlbnRPckRhdGEgY2FuIGJlIGlucHV0IG9uQ2hhbmdlIGV2ZW50LCByZWFjdC1zZWxlY3Qgb25DaGFuZ2Ugb3IgcmVhY3QtZGF5LXBpY2tlciBvbkNoYW5nZVxuICAgIGlmIChldmVudE9yRGF0YSkge1xuICAgICAgaWYgKGV2ZW50T3JEYXRhLnRhcmdldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChldmVudE9yRGF0YS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCB2YWx1ZSA9IHZhbHVlUGFyc2VyKHJhd1ZhbHVlKTtcbiAgICBjb25zdCB7IGNvbXBvbmVudFR5cGUgfSA9IGNvbDtcbiAgICBzd2l0Y2ggKGNvbXBvbmVudFR5cGUpIHtcbiAgICAgIGNhc2UgJ2N1cnJlbmN5JzpcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICd0ZXh0Jzoge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgZWRpdENlbGxWYWx1ZUNoYW5nZShncmlkLCBkYXRhSWQsIGNvbC52YWx1ZUtleVBhdGgsIHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChjb2wub25FZGl0VmFsdWVDaGFuZ2UpIHtcbiAgICAgIGNvbC5vbkVkaXRWYWx1ZUNoYW5nZSh2YWx1ZSwgY29sLnZhbHVlS2V5UGF0aCwgcm93SW5kZXgsIGRhdGFJZCk7XG4gICAgfVxuICAgIGlmIChjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUgJiYgdmFsdWUgPT09IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5tYXRjaFZhbHVlKSB7XG4gICAgICAvLyBDYWxsIHNwZWNpYWwgcGFpcmVkIHZhbHVlIGNoYW5nZSBvbiBvdGhlciBjZWxsIGlmIHZhbHVlIG1hdGNoZXNcbiAgICAgIHRoaXMub25FZGl0Q2VsbFZhbHVlQ2hhbmdlKFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgeyB2YWx1ZUtleVBhdGg6IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5uZXdWYWx1ZUtleVBhdGggfSxcbiAgICAgICAgdiA9PiB2LFxuICAgICAgKShjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY29sLnZhbGlkYXRvcnMpIHtcbiAgICAgIHRoaXMucHJvcHMuZWRpdENlbGxWYWx1ZVZhbGlkYXRlKFxuICAgICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICAgIGRhdGFJZCxcbiAgICAgICAgY29sLnZhbHVlS2V5UGF0aCxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIGNvbC52YWxpZGF0b3JzLFxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgZ2V0UmVnRXggPSBzZXBhcmF0b3IgPT4gKHNlcGFyYXRvciA/IG5ldyBSZWdFeHAoYFxcXFwke3NlcGFyYXRvcn1gLCAnZycpIDogbmV3IFJlZ0V4cCgnXFxcXHMnLCAnZycpKTtcblxuICBvbkNyZWF0ZUNlbGxCbHVyID0gKHJvd0luZGV4LCBjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZXZlbnRPckRhdGEpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBkZWNpbWFsU2VwYXJhdG9yLCBjcmVhdGVDZWxsVmFsdWVDaGFuZ2UsIGdyaWQsIHRob3VzYW5kU2VwYXJhdG9yLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgY29tcG9uZW50VHlwZSB9ID0gY29sO1xuICAgIGxldCB2YWx1ZTtcbiAgICAvLyBldmVudE9yRGF0YSBjYW4gYmUgZm9ybWF0dGVkLWlucHV0LCByZWFjdC1zZWxlY3QsIHJlYWN0LWNoZWNrYm94IG9yIHJlYWN0LWRheS1waWNrZXJcbiAgICAvLyBvbkNoYW5nZSBldmVudFxuICAgIGlmIChldmVudE9yRGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoZXZlbnRPckRhdGEgJiYgZXZlbnRPckRhdGEudGFyZ2V0ICYmIGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlID0gZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChldmVudE9yRGF0YS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlID0gZXZlbnRPckRhdGEudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IGV2ZW50T3JEYXRhO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSA9IHRoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKTtcbiAgICB9XG4gICAgc3dpdGNoIChjb21wb25lbnRUeXBlKSB7XG4gICAgICBjYXNlICdjdXJyZW5jeSc6IHtcbiAgICAgICAgY29uc3QgbnVtZXJpY1ZhbHVlID0gdmFsdWVcbiAgICAgICAgICA/IE51bWJlcih2YWx1ZS5yZXBsYWNlKHRoaXMuZ2V0UmVnRXgoKGNvbC52YWx1ZU9wdGlvbnMgJiYgY29sLnZhbHVlT3B0aW9ucy50aG91c2FuZFNlcGFyYXRvcikgfHwgdGhvdXNhbmRTZXBhcmF0b3IpLCAnJylcbiAgICAgICAgICAgIC5yZXBsYWNlKHRoaXMuZ2V0UmVnRXgoKGNvbC52YWx1ZU9wdGlvbnMgJiYgY29sLnZhbHVlT3B0aW9ucy5kZWNpbWFsU2VwYXJhdG9yKSB8fCBkZWNpbWFsU2VwYXJhdG9yKSwgJy4nKSlcbiAgICAgICAgICA6IHZhbHVlO1xuICAgICAgICBpZiAobnVtZXJpY1ZhbHVlICE9PSB0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCkpIHtcbiAgICAgICAgICBjcmVhdGVDZWxsVmFsdWVDaGFuZ2UoZ3JpZCwgcm93SW5kZXgsIGNvbC52YWx1ZUtleVBhdGgsIG51bWVyaWNWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAndGV4dCc6IHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCkpIHtcbiAgICAgICAgICBjcmVhdGVDZWxsVmFsdWVDaGFuZ2UoZ3JpZCwgcm93SW5kZXgsIGNvbC52YWx1ZUtleVBhdGgsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNvbC5vbkNyZWF0ZUJsdXIpIHtcbiAgICAgIGlmICh2YWx1ZVBhcnNlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWVQYXJzZXIodmFsdWUpO1xuICAgICAgfVxuICAgICAgY29sLm9uQ3JlYXRlQmx1cih2YWx1ZSwgcm93SW5kZXgpO1xuICAgIH1cbiAgfTtcblxuICBvbkVkaXRDZWxsQmx1ciA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGV2ZW50T3JEYXRhKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGVjaW1hbFNlcGFyYXRvciwgZWRpdENlbGxWYWx1ZUNoYW5nZSwgZ3JpZCwgdGhvdXNhbmRTZXBhcmF0b3IsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBjb21wb25lbnRUeXBlIH0gPSBjb2w7XG4gICAgY29uc3QgZGF0YUlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICBsZXQgdmFsdWU7XG4gICAgLy8gZXZlbnRPckRhdGEgY2FuIGJlIGZvcm1hdHRlZC1pbnB1dCwgcmVhY3Qtc2VsZWN0LCByZWFjdC1jaGVja2JveCBvciByZWFjdC1kYXktcGlja2VyXG4gICAgLy8gb25DaGFuZ2UgZXZlbnRcbiAgICBpZiAoZXZlbnRPckRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGV2ZW50T3JEYXRhICYmIGV2ZW50T3JEYXRhLnRhcmdldCAmJiBldmVudE9yRGF0YS50YXJnZXQudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YWx1ZSA9IGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnRPckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YWx1ZSA9IGV2ZW50T3JEYXRhLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBldmVudE9yRGF0YTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgPSB0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCk7XG4gICAgfVxuICAgIHN3aXRjaCAoY29tcG9uZW50VHlwZSkge1xuICAgICAgY2FzZSAnY3VycmVuY3knOiB7XG4gICAgICAgIGNvbnN0IG51bWVyaWNWYWx1ZSA9IHZhbHVlXG4gICAgICAgICAgPyBOdW1iZXIodmFsdWUucmVwbGFjZSh0aGlzLmdldFJlZ0V4KChjb2wudmFsdWVPcHRpb25zICYmIGNvbC52YWx1ZU9wdGlvbnMudGhvdXNhbmRTZXBhcmF0b3IpIHx8IHRob3VzYW5kU2VwYXJhdG9yKSwgJycpXG4gICAgICAgICAgICAucmVwbGFjZSh0aGlzLmdldFJlZ0V4KChjb2wudmFsdWVPcHRpb25zICYmIGNvbC52YWx1ZU9wdGlvbnMuZGVjaW1hbFNlcGFyYXRvcikgfHwgZGVjaW1hbFNlcGFyYXRvciksICcuJykpXG4gICAgICAgICAgOiB2YWx1ZTtcbiAgICAgICAgaWYgKG51bWVyaWNWYWx1ZSAhPT0gdGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpKSB7XG4gICAgICAgICAgZWRpdENlbGxWYWx1ZUNoYW5nZShncmlkLCBkYXRhSWQsIGNvbC52YWx1ZUtleVBhdGgsIG51bWVyaWNWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAndGV4dCc6IHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCkpIHtcbiAgICAgICAgICBlZGl0Q2VsbFZhbHVlQ2hhbmdlKGdyaWQsIGRhdGFJZCwgY29sLnZhbHVlS2V5UGF0aCwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29sLm9uRWRpdEJsdXIpIHtcbiAgICAgIGlmICh2YWx1ZVBhcnNlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWVQYXJzZXIodmFsdWUpO1xuICAgICAgfVxuICAgICAgY29sLm9uRWRpdEJsdXIodmFsdWUsIHJvd0luZGV4LCBkYXRhSWQpO1xuICAgIH1cbiAgfTtcblxuICBvbkNlbGxGb2N1cyA9IChjZWxsVHlwZSwgaW5wdXRUeXBlLCByb3dJbmRleCwgY29sdW1uS2V5KSA9PiAoZSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGNlbGxTZWxlY3Rpb25DaGFuZ2UsIGNlbGxTZWxlY3QsIGdyaWQsIGlzRWRpdGluZyxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoaXNFZGl0aW5nKSByZXR1cm47XG5cbiAgICBpZiAoaW5wdXRUeXBlID09PSAnbnVtYmVyJykge1xuICAgICAgZS50YXJnZXQuc2VsZWN0KCk7XG4gICAgfVxuICAgIGlmIChjZWxsVHlwZSA9PT0gJ2VkaXQnICYmIGNlbGxTZWxlY3QpIHtcbiAgICAgIGNlbGxTZWxlY3Rpb25DaGFuZ2UoXG4gICAgICAgIGdyaWQsXG4gICAgICAgIE1hcCh7XG4gICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgY29sdW1uS2V5LFxuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIGdldFNlbGVjdFJlZiA9IChjb21wb25lbnQpID0+IHtcbiAgICBpZiAoIWNvbXBvbmVudCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKGNvbXBvbmVudC5zZWxlY3QgJiYgY29tcG9uZW50LnNlbGVjdC5pbnB1dFJlZikge1xuICAgICAgcmV0dXJuIGNvbXBvbmVudC5zZWxlY3QuaW5wdXRSZWY7XG4gICAgfVxuICAgIGlmIChjb21wb25lbnQuc2VsZWN0ICYmIGNvbXBvbmVudC5zZWxlY3Quc2VsZWN0KSB7XG4gICAgICByZXR1cm4gY29tcG9uZW50LnNlbGVjdC5zZWxlY3QuaW5wdXRSZWY7XG4gICAgfVxuICAgIGlmIChjb21wb25lbnQuc2VsZWN0UmVmICYmIGNvbXBvbmVudC5zZWxlY3RSZWYuc2VsZWN0LnNlbGVjdCkge1xuICAgICAgcmV0dXJuIGNvbXBvbmVudC5zZWxlY3RSZWYuc2VsZWN0LnNlbGVjdC5pbnB1dFJlZjtcbiAgICB9XG4gICAgcmV0dXJuIGNvbXBvbmVudC5zZWxlY3RSZWYuc2VsZWN0LmlucHV0UmVmO1xuICB9O1xuXG4gIGdldERhdGFJZEJ5Um93SW5kZXggPSByb3dJbmRleCA9PiB0aGlzLnByb3BzLmRhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi50aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoXSk7XG5cbiAgZ2V0U2VsZWN0ZWRJdGVtSW5kZXggPSAoaWQpID0+IHtcbiAgICBpZiAoIWlkKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5wcm9wcy5kYXRhLmZpbmRJbmRleCh2ID0+IHYuZ2V0SW4odGhpcy5wcm9wcy5ncmlkLmlkS2V5UGF0aCkgPT09IGlkKTtcbiAgICByZXR1cm4gaW5kZXggPT09IC0xID8gdW5kZWZpbmVkIDogaW5kZXg7XG4gIH07XG5cbiAgZ2V0RWRpdEl0ZW1WYWx1ZSA9IChyb3dJbmRleCwgY29sLCBvcHRpb25zID0gW10pID0+IHtcbiAgICAvLyBHZXQgdGhlIHZhbHVlIHRvIGRpc3BsYXkgaW4gZWRpdCBjZWxsXG4gICAgY29uc3QgaWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgIGNvbnN0IGVkaXRWYWx1ZSA9IHRoaXMucHJvcHMuZWRpdERhdGEuZ2V0SW4oW2lkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSwgdW5kZWZpbmVkKTtcbiAgICBsZXQgb3JpZ2luYWxWYWx1ZTtcbiAgICBpZiAoZWRpdFZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG9yaWdpbmFsVmFsdWUgPSB0aGlzLnByb3BzLmRhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSwgJycpO1xuICAgIH0gZWxzZSBpZiAoZWRpdFZhbHVlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFZhbHVlIGlzIGZvdW5kIGZyb20gZWRpdERhdGFcbiAgICAgIC8vIEZvcm1hdCBieSB0eXBlXG4gICAgICBzd2l0Y2ggKGNvbC5jb21wb25lbnRUeXBlKSB7XG4gICAgICAgIGNhc2UgJ211bHRpc2VsZWN0JzpcbiAgICAgICAgY2FzZSAnc2VsZWN0JzpcbiAgICAgICAgICByZXR1cm4gb3B0aW9ucy5zZWxlY3RPcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gZWRpdFZhbHVlKTtcbiAgICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgICAgcmV0dXJuIG9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSBlZGl0VmFsdWUpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiBlZGl0VmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvcmlnaW5hbFZhbHVlID09PSBudWxsIHx8IG9yaWdpbmFsVmFsdWUgPT09IHVuZGVmaW5lZCB8fCBvcmlnaW5hbFZhbHVlID09PSAnJykge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICAvLyBSZXR1cm4gdmFsdWUgZnJvbSBvcmlnaW5hbCBkYXRhLCBiZWNhdXNlIGVkaXREYXRhIGlzIG5vdCBhdmFpbGFibGVcbiAgICAvLyBGb3JtYXQgYnkgY29tcG9uZW50IHR5cGVcbiAgICBzd2l0Y2ggKGNvbC5jb21wb25lbnRUeXBlKSB7XG4gICAgICBjYXNlICdmbG9hdCc6IHtcbiAgICAgICAgaWYgKFN0cmluZyhvcmlnaW5hbFZhbHVlKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgcmV0dXJuIFN0cmluZyhvcmlnaW5hbFZhbHVlKS5yZXBsYWNlKCcuJywgdGhpcy5wcm9wcy5kZWNpbWFsU2VwYXJhdG9yKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3JpZ2luYWxWYWx1ZTtcbiAgICAgIH1cbiAgICAgIGNhc2UgJ211bHRpc2VsZWN0JzpcbiAgICAgIGNhc2UgJ3NlbGVjdCc6XG4gICAgICAgIHJldHVybiBvcHRpb25zLnNlbGVjdE9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSBvcmlnaW5hbFZhbHVlKTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICByZXR1cm4gb3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IG9yaWdpbmFsVmFsdWUpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIG9yaWdpbmFsVmFsdWU7XG4gICAgfVxuICB9O1xuXG4gIGdldENyZWF0ZUl0ZW1WYWx1ZSA9IChyb3dJbmRleCwgY29sLCBvcHRpb25zID0gW10pID0+IHtcbiAgICBjb25zdCB2YWwgPSB0aGlzLnByb3BzLmNyZWF0ZURhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSwgJycpO1xuICAgIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgaWYgKGNvbC5jb21wb25lbnRUeXBlID09PSAnc2VsZWN0JyB8fCBjb2wuY29tcG9uZW50VHlwZSA9PT0gJ211bHRpc2VsZWN0Jykge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuc2VsZWN0T3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IHZhbCk7XG4gICAgfVxuICAgIGlmIChbJ2Jvb2xlYW4nXS5pbmNsdWRlcyhjb2wuY29tcG9uZW50VHlwZSkpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gdmFsKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbDtcbiAgfTtcblxuICBnZXRGaWx0ZXJJdGVtVmFsdWUgPSAoY29sLCBvcHRpb25zID0gW10pID0+IHtcbiAgICBjb25zdCB2YWwgPSB0aGlzLnByb3BzLmZpbHRlckRhdGEuZ2V0KFV0aWxzLmdldENvbHVtbktleShjb2wpLCAnJyk7XG4gICAgaWYgKHZhbCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBpZiAoY29sLmNvbXBvbmVudFR5cGUgPT09ICdzZWxlY3QnKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5zZWxlY3RPcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gdmFsKTtcbiAgICB9XG4gICAgaWYgKFsnY2hlY2tib3gnLCAnYm9vbGVhbiddLmluY2x1ZGVzKGNvbC5jb21wb25lbnRUeXBlKSkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSB2YWwpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWw7XG4gIH07XG5cbiAgZ2V0RmlsdGVySXRlbU11bHRpVmFsdWUgPSAoY29sKSA9PiB7XG4gICAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCk7XG4gICAgY29uc3QgeyBmaWx0ZXJEYXRhIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGRhdGEgPSB0aGlzLnN0YXRlW2NvbHVtbktleV07XG4gICAgY29uc3QgdmFsID0gZGF0YSB8fCBmaWx0ZXJEYXRhLmdldChjb2x1bW5LZXksICcnKTtcbiAgICAvLyBzZXNzaW9uIHN0b3JhZ2UgY29udGVudCBpcyBjb252ZXJ0ZWQgdG8gaW1tdXRhYmxlIGFuZCBtdWx0aXNlbGVjdFxuICAgIC8vIGZpbHRlcnMgaXMgdGhlbiBsaXN0IG90aGVyd2lzZSBhcnJheVxuICAgIHJldHVybiB2YWwgJiYgdmFsLnRvSlMgPyB2YWwudG9KUygpIDogdmFsIHx8IFtdO1xuICB9O1xuXG4gIGdldENvbXBvbmVudERpc2FibGVkU3RhdGUgPSAocm93SW5kZXgsIGNvbCwgbW9kZSkgPT4ge1xuICAgIGxldCBjb21wb25lbnREaXNhYmxlZCA9ICEhY29sLmRpc2FibGVFZGl0aW5nO1xuICAgIC8vIGNoZWNrIGlmIGNvbXBvbmVudCBpcyBkaXNhYmxlZCBieSBvdGhlciBjb2x1bW4gZGF0YVxuICAgIGlmICghY29tcG9uZW50RGlzYWJsZWQgJiYgY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoKSB7XG4gICAgICBpZiAobW9kZSA9PT0gJ2NyZWF0ZScpIHtcbiAgICAgICAgY29tcG9uZW50RGlzYWJsZWQgPSB0aGlzLmdldENyZWF0ZUl0ZW1WYWx1ZShyb3dJbmRleCwge1xuICAgICAgICAgIHZhbHVlS2V5UGF0aDogY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWVLZXlQYXRoLFxuICAgICAgICB9KSA9PT0gY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb21wb25lbnREaXNhYmxlZCA9IHRoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwge1xuICAgICAgICAgIHZhbHVlS2V5UGF0aDogY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWVLZXlQYXRoLFxuICAgICAgICB9KSA9PT0gY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb21wb25lbnREaXNhYmxlZDtcbiAgfTtcblxuICBnZXRSb3dDbGFzc05hbWUgPSAocm93SW5kZXgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBncmlkLCBpc0NyZWF0aW5nLCBpc0VkaXRpbmcsIGNyZWF0ZURhdGEsIHNlbGVjdGVkSXRlbXMsIGRhdGEsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgcm93Q2xhc3NOYW1lcyA9IFsnb2MtZGF0YWdyaWQtcm93J107XG4gICAgbGV0IGV4dHJhUm93Q291bnQgPSAwOyAvLyBob3cgbWFueSByb3dzIHRvIGlnbm9yZSBmcm9tIHRvcCwgbmV3ICsgZmlsdGVyIHJvd3NcbiAgICBpZiAoaXNDcmVhdGluZykgZXh0cmFSb3dDb3VudCA9IGNyZWF0ZURhdGEuc2l6ZTtcbiAgICBpZiAoaXNDcmVhdGluZykge1xuICAgICAgaWYgKHJvd0luZGV4IDw9IGV4dHJhUm93Q291bnQgLSAxKSB7XG4gICAgICAgIHJvd0NsYXNzTmFtZXMucHVzaCgnb2MtZGF0YWdyaWQtcm93LW5ldycpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNFZGl0aW5nKSB7XG4gICAgICByb3dDbGFzc05hbWVzLnB1c2goJ29jLWRhdGFncmlkLXJvdy1lZGl0Jyk7XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgaWYgcm93IGlzIHNlbGVjdGVkXG4gICAgaWYgKCFpc0NyZWF0aW5nICYmICFpc0VkaXRpbmcgJiYgKHNlbGVjdGVkSXRlbXMgJiYgZ3JpZC5pZEtleVBhdGgpKSB7XG4gICAgICBpZiAoc2VsZWN0ZWRJdGVtcy5pbmRleE9mKGRhdGEuZ2V0SW4oW3Jvd0luZGV4IC0gZXh0cmFSb3dDb3VudCwgLi4uZ3JpZC5pZEtleVBhdGhdKSkgIT09IC0xKSB7XG4gICAgICAgIHJvd0NsYXNzTmFtZXMucHVzaCgnaXMtc2VsZWN0ZWQnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5wcm9wcy5yb3dDbGFzc05hbWVHZXR0ZXIpIHtcbiAgICAgIHJldHVybiByb3dDbGFzc05hbWVzLmpvaW4oJyAnKSArICcgJyArIHRoaXMucHJvcHMucm93Q2xhc3NOYW1lR2V0dGVyKHJvd0luZGV4KTtcbiAgICB9XG4gICAgcmV0dXJuIHJvd0NsYXNzTmFtZXMuam9pbignICcpO1xuICB9O1xuXG4gIGdldENlbGxNZXNzYWdlcyA9IChyb3dJbmRleCwgY29sLCBjZWxsVHlwZSkgPT4ge1xuICAgIGNvbnN0IHJldHVybkRhdGEgPSB7fTtcbiAgICBpZiAoIXRoaXMucHJvcHMuZ3JpZC5pZEtleVBhdGggfHwgIWNvbC52YWx1ZUtleVBhdGgpIHtcbiAgICAgIHJldHVybiByZXR1cm5EYXRhO1xuICAgIH1cbiAgICBsZXQgaW5mb01lc3NhZ2U7XG4gICAgbGV0IGVycm9yTWVzc2FnZTtcbiAgICBsZXQgd2FybmluZ01lc3NhZ2U7XG4gICAgaWYgKGNlbGxUeXBlID09PSAnY3JlYXRlJykge1xuICAgICAgaW5mb01lc3NhZ2UgPSB0aGlzLnByb3BzLmNyZWF0ZUNlbGxNZXNzYWdlcy5nZXRJbihbJ2luZm8nLCByb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgZXJyb3JNZXNzYWdlID0gdGhpcy5wcm9wcy5jcmVhdGVDZWxsTWVzc2FnZXMuZ2V0SW4oWydlcnJvcicsIHJvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgICB3YXJuaW5nTWVzc2FnZSA9IHRoaXMucHJvcHMuY3JlYXRlQ2VsbE1lc3NhZ2VzLmdldEluKFtcbiAgICAgICAgJ3dhcm5pbmcnLFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgLi4uY29sLnZhbHVlS2V5UGF0aCxcbiAgICAgIF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgICBpbmZvTWVzc2FnZSA9IHRoaXMucHJvcHMuY2VsbE1lc3NhZ2VzLmdldEluKFsnaW5mbycsIGlkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgICBlcnJvck1lc3NhZ2UgPSB0aGlzLnByb3BzLmNlbGxNZXNzYWdlcy5nZXRJbihbJ2Vycm9yJywgaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgIHdhcm5pbmdNZXNzYWdlID0gdGhpcy5wcm9wcy5jZWxsTWVzc2FnZXMuZ2V0SW4oWyd3YXJuaW5nJywgaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICB9XG4gICAgaWYgKGluZm9NZXNzYWdlKSB7XG4gICAgICByZXR1cm5EYXRhLmluZm9NZXNzYWdlID0gaW5mb01lc3NhZ2U7XG4gICAgfVxuICAgIGlmIChlcnJvck1lc3NhZ2UpIHtcbiAgICAgIHJldHVybkRhdGEuZXJyb3JNZXNzYWdlID0gZXJyb3JNZXNzYWdlO1xuICAgIH1cbiAgICBpZiAod2FybmluZ01lc3NhZ2UpIHtcbiAgICAgIHJldHVybkRhdGEud2FybmluZ01lc3NhZ2UgPSB3YXJuaW5nTWVzc2FnZTtcbiAgICB9XG4gICAgcmV0dXJuIHJldHVybkRhdGE7XG4gIH07XG5cbiAgZ2V0U2Nyb2xsVG9Sb3cgPSAoKSA9PiB7XG4gICAgbGV0IHNjcm9sbFRvUm93O1xuICAgIGlmICh0aGlzLnByb3BzLmlzQ3JlYXRpbmcgJiYgIXRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwpIHJldHVybiBzY3JvbGxUb1JvdztcbiAgICBpZiAodGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCkge1xuICAgICAgY29uc3Qgc2Nyb2xsTmV3Um93ID0gdGhpcy5wcm9wcy5jcmVhdGVEYXRhLnNpemUgLSAxO1xuICAgICAgaWYgKHNjcm9sbE5ld1JvdyA+PSAwKSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gc2Nyb2xsTmV3Um93O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5pc0VkaXRpbmcgJiYgIXRoaXMucHJvcHMuc2Nyb2xsSW5FZGl0TW9kZSkge1xuICAgICAgICBzY3JvbGxUb1JvdyA9IHRoaXMuc3RhdGUuY3VycmVudFJvdztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gdGhpcy5wcm9wcy5zY3JvbGxUb1JvdzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgfVxuICAgICAgaWYgKHNjcm9sbFRvUm93ID09PSB1bmRlZmluZWQgJiYgdGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLnNpemUgPiAwKSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gdGhpcy5nZXRTZWxlY3RlZEl0ZW1JbmRleCh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuZmlyc3QoKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzY3JvbGxUb1JvdztcbiAgfTtcblxuICBzZXRGb2N1c1RvID0gKGZvY3VzVG8pID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5pc0VkaXRpbmcgfHwgdGhpcy5wcm9wcy5pc0NyZWF0aW5nKSB7XG4gICAgICBpZiAoZm9jdXNUbyAmJiBmb2N1c1RvLmdldCgndHlwZScpICYmIGZvY3VzVG8gIT09IHRoaXMucHJldkZvY3VzVG8pIHtcbiAgICAgICAgdGhpc1tmb2N1c1RvLmdldCgndHlwZScpXSA9IHRydWU7XG4gICAgICAgIHRoaXMuZm9jdXNUb0xhc3RSb3cgPSBmb2N1c1RvLmdldCgnZm9jdXNUb0xhc3RSb3cnKTtcbiAgICAgICAgdGhpcy5wcmV2Rm9jdXNUbyA9IGZvY3VzVG87XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZUNlbGxTZWxlY3QgPSAoY2VsbFR5cGUsIHJvd0luZGV4LCBjb2x1bW5LZXkpID0+ICgpID0+IHtcbiAgICBpZiAoY2VsbFR5cGUgPT09ICd2aWV3JyAmJiB0aGlzLnByb3BzLmNlbGxTZWxlY3QpIHtcbiAgICAgIHRoaXMucHJvcHMuY2VsbFNlbGVjdGlvbkNoYW5nZShcbiAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICBNYXAoe1xuICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgIGNvbHVtbktleSxcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVDcmVhdGVDZWxsUmVmID0gKHJvd0luZGV4LCBjb2wpID0+IChyZWYpID0+IHtcbiAgICAvLyBGb2N1cyB0byBjcmVhdGUgY2VsbFxuICAgIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2wpO1xuICAgIGNvbnN0IHNlbGVjdFJlZiA9ICFyZWYgfHwgcmVmLmZvY3VzID8gcmVmIDogdGhpcy5nZXRTZWxlY3RSZWYocmVmKTtcbiAgICBpZiAoXG4gICAgICB0aGlzLnByb3BzLmNyZWF0ZURhdGEuc2l6ZVxuICAgICAgJiYgdGhpcy5wcm9wcy5jcmVhdGVEYXRhLnNpemUgPT09IHJvd0luZGV4ICsgMVxuICAgICAgJiYgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbFxuICAgICAgJiYgIXRoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnY3JlYXRlJylcbiAgICAgICYmIHNlbGVjdFJlZlxuICAgICkge1xuICAgICAgc2VsZWN0UmVmLmZvY3VzKCk7XG4gICAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcHMuZW5hYmxlQXJyb3dOYXZpZ2F0aW9uKSB7XG4gICAgICB0aGlzLmNyZWF0ZUNlbGxSZWZzW2Ake3RoaXMucHJvcHMuZ3JpZC5pZH1fJHtjb2x1bW5LZXl9XyR7cm93SW5kZXh9YF0gPSByZWY7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZUVkaXRDZWxsUmVmID0gKHJvd0luZGV4LCBjb2wpID0+IChyZWYpID0+IHtcbiAgICBjb25zdCBjb2x1bW5LZXkgPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sKTtcbiAgICBpZiAodGhpcy5mb2N1c1RvRWRpdENlbGwgJiYgIXRoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnZWRpdCcpKSB7XG4gICAgICBjb25zdCBzZWxlY3RlZFJvd0luZGV4ID0gdGhpcy5mb2N1c1RvTGFzdFJvdyAmJiB0aGlzLnByb3BzLmRhdGEuc2l6ZSA+IDBcbiAgICAgICAgPyB0aGlzLnByb3BzLmRhdGEuc2l6ZSAtIDFcbiAgICAgICAgOiB0aGlzLmdldFNlbGVjdGVkSXRlbUluZGV4KHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5maXJzdCgpKTtcblxuICAgICAgY29uc3QgeyBzZWxlY3RlZENlbGwgfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCBzZWxlY3RSZWYgPSAhcmVmIHx8IHJlZi5mb2N1cyA/IHJlZiA6IHRoaXMuZ2V0U2VsZWN0UmVmKHJlZik7XG4gICAgICBpZiAoc2VsZWN0ZWRDZWxsLnNpemUgPiAwKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBzZWxlY3RlZENlbGwuZ2V0KCdyb3dJbmRleCcpID09PSByb3dJbmRleFxuICAgICAgICAgICYmIHNlbGVjdGVkQ2VsbC5nZXQoJ2NvbHVtbktleScpID09PSBjb2x1bW5LZXlcbiAgICAgICAgICAmJiBzZWxlY3RSZWZcbiAgICAgICAgKSB7XG4gICAgICAgICAgc2VsZWN0UmVmLmZvY3VzKCk7XG4gICAgICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmZvY3VzVG9MYXN0Um93ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWRSb3dJbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZm9jdXNUb0xhc3RSb3cgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWRSb3dJbmRleCA9PT0gcm93SW5kZXggJiYgc2VsZWN0UmVmKSB7XG4gICAgICAgIHNlbGVjdFJlZi5mb2N1cygpO1xuICAgICAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZvY3VzVG9MYXN0Um93ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZUFycm93TmF2aWdhdGlvbikge1xuICAgICAgdGhpcy5jZWxsUmVmc1tgJHt0aGlzLnByb3BzLmdyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4fWBdID0gcmVmO1xuICAgIH1cbiAgfTtcblxuICBtb3ZlQ2VsbEZvY3VzID0gKG5leHRFbGVtZW50LCByb3dJbmRleCwgY29sdW1uSW5kZXgpID0+IHtcbiAgICBjb25zdCBlbGVtZW50VHlwZXMgPSBbJ3RleHQnLCAnY2hlY2tib3gnXTtcbiAgICBpZiAobmV4dEVsZW1lbnQgJiYgZWxlbWVudFR5cGVzLmluY2x1ZGVzKG5leHRFbGVtZW50LnR5cGUpKSB7XG4gICAgICBpZiAocm93SW5kZXggIT09IC0xIHx8IGNvbHVtbkluZGV4ICE9PSAtMSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBjdXJyZW50Q29sdW1uOiBjb2x1bW5JbmRleCxcbiAgICAgICAgICBjdXJyZW50Um93OiByb3dJbmRleCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKG5leHRFbGVtZW50LnR5cGUgPT09ICdjaGVja2JveCcpIG5leHRFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIGlmIChuZXh0RWxlbWVudC50eXBlID09PSAndGV4dCcpIG5leHRFbGVtZW50LnNlbGVjdCgpO1xuICAgICAgfSwgNTApO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVTZWxlY3RBbGxDaGVja0JveE9uQ2hhbmdlID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMuc2VsZWN0QWxsSXRlbXNDaGFuZ2UodGhpcy5wcm9wcy5ncmlkKTtcbiAgfTtcblxuICBoYW5kbGVTZWxlY3Rpb25DaGVja0JveE9uQ2hhbmdlID0gKCkgPT4gKCkgPT4ge1xuICAgIC8vIExvZ2ljIGZvciB0aGlzIGFjdGlvbiBjb250YWlucyBpbiBoYW5kbGVSb3dDbGljayAoaW4gJ2Vsc2UnIGJsb2NrKVxuICB9O1xuXG4gIGdlbmVyYXRlQ29sdW1ucyA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBkYXRhLFxuICAgICAgc2VsZWN0ZWRJdGVtcyxcbiAgICAgIGRhdGVGb3JtYXQsXG4gICAgICB0aG91c2FuZFNlcGFyYXRvcixcbiAgICAgIGRlY2ltYWxTZXBhcmF0b3IsXG4gICAgICBncmlkLFxuICAgICAgaW5saW5lRWRpdCxcbiAgICAgIGZpbHRlcmluZyxcbiAgICAgIHJlZ2lvbixcbiAgICAgIGludGwsXG4gICAgICBzZWxlY3RDb21wb25lbnRPcHRpb25zLFxuICAgICAgaXNDcmVhdGluZyxcbiAgICAgIGV4dHJhQ29sdW1uLFxuICAgICAgcm93U2VsZWN0Q2hlY2tib3hDb2x1bW4sXG4gICAgICBzaG93U2VsZWN0QWxsQ2hlY2tib3gsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBjb2x1bW5zID0gW107XG4gICAgY29uc3QgdGFiSW5kZXggPSBTdHJpbmcodGhpcy5wcm9wcy50YWJJbmRleCk7XG4gICAgaWYgKGV4dHJhQ29sdW1uKSB7XG4gICAgICBjb2x1bW5zLnB1c2goe1xuICAgICAgICB3aWR0aDogZXh0cmFDb2x1bW4ud2lkdGggfHwgNDAsXG4gICAgICAgIGlzUmVzaXphYmxlOiAhIWV4dHJhQ29sdW1uLmlzUmVzaXphYmxlLFxuICAgICAgICBpc1NvcnRhYmxlOiBmYWxzZSxcbiAgICAgICAgY29sdW1uS2V5OiAnZXh0cmFDb2x1bW4nLFxuICAgICAgICBjZWxsOiByb3dJbmRleCA9PiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1leHRyYS1jb2x1bW4tY2VsbCBuby1yb3ctc2VsZWN0XCI+XG4gICAgICAgICAgICB7ZXh0cmFDb2x1bW4udmFsdWVSZW5kZXIoZGF0YS5nZXQocm93SW5kZXgpLCByb3dJbmRleCl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICksXG4gICAgICAgIGNlbGxFZGl0OiByb3dJbmRleCA9PiAoZXh0cmFDb2x1bW4uY2VsbEVkaXQgPyBleHRyYUNvbHVtbi5jZWxsRWRpdChyb3dJbmRleCkgOiBudWxsKSxcbiAgICAgICAgY2VsbENyZWF0ZTogcm93SW5kZXggPT4gKGV4dHJhQ29sdW1uLmNlbGxDcmVhdGUgPyBleHRyYUNvbHVtbi5jZWxsQ3JlYXRlKHJvd0luZGV4KSA6IG51bGwpLFxuICAgICAgICBjZWxsRmlsdGVyOiByb3dJbmRleCA9PiAoZXh0cmFDb2x1bW4uY2VsbEZpbHRlciA/IGV4dHJhQ29sdW1uLmNlbGxGaWx0ZXIocm93SW5kZXgpIDogbnVsbCksXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocm93U2VsZWN0Q2hlY2tib3hDb2x1bW4pIHtcbiAgICAgIGNvbHVtbnMucHVzaCh7XG4gICAgICAgIHdpZHRoOiA0MCxcbiAgICAgICAgaXNSZXNpemFibGU6IGZhbHNlLFxuICAgICAgICBpc1NvcnRhYmxlOiBmYWxzZSxcbiAgICAgICAgY29sdW1uS2V5OiAnc2VsZWN0aW9uQ2hlY2tib3gnLFxuICAgICAgICBoZWFkZXI6IHNob3dTZWxlY3RBbGxDaGVja2JveCAmJiAoXG4gICAgICAgICAgPENoZWNrYm94XG4gICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRTZWxlY3RBbGxDaGVja0JveC0ke2dyaWQuaWR9YH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLXNlbGVjdC1hbGwtY2hlY2tib3gtY2VsbCBuby1yb3ctc2VsZWN0XCJcbiAgICAgICAgICAgIGNoZWNrZWQ9e2RhdGEuc2l6ZSAhPT0gMCAmJiBkYXRhLnNpemUgPT09IHNlbGVjdGVkSXRlbXMuc2l6ZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVNlbGVjdEFsbENoZWNrQm94T25DaGFuZ2V9XG4gICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSxcbiAgICAgICAgY2VsbDogKHJvd0luZGV4KSA9PiB7XG4gICAgICAgICAgY29uc3Qgcm93SXRlbSA9IGRhdGEuZ2V0KHJvd0luZGV4KTtcbiAgICAgICAgICBjb25zdCBpdGVtSWQgPSByb3dJdGVtLmdldEluKGdyaWQuaWRLZXlQYXRoKTtcbiAgICAgICAgICBjb25zdCBzZWxlY3RlZCA9IHNlbGVjdGVkSXRlbXMuaW5jbHVkZXMoaXRlbUlkKTtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPENoZWNrYm94XG4gICAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZFNlbGVjdENoZWNrQm94LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke3Jvd0luZGV4fWB9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLXNlbGVjdC1jaGVja2JveC1jZWxsIG5vLXJvdy1zZWxlY3RcIlxuICAgICAgICAgICAgICBjaGVja2VkPXtzZWxlY3RlZH1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlU2VsZWN0aW9uQ2hlY2tCb3hPbkNoYW5nZShyb3dJbmRleCl9XG4gICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgY2VsbEVkaXQ6ICgpID0+IG51bGwsXG4gICAgICAgIGNlbGxDcmVhdGU6ICgpID0+IG51bGwsXG4gICAgICAgIGNlbGxGaWx0ZXI6ICgpID0+IG51bGwsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCB2aXNpYmxlQ29sdW1ucyA9IFtdO1xuICAgIHRoaXMucHJvcHMudmlzaWJsZUNvbHVtbnMuZm9yRWFjaCgodmlzaWJsZUNvbHVtbktleSkgPT4ge1xuICAgICAgdGhpcy5wcm9wcy5jb2x1bW5zLmZvckVhY2goKG9yZ0NvbCkgPT4ge1xuICAgICAgICBpZiAoVXRpbHMuZ2V0Q29sdW1uS2V5KG9yZ0NvbCkgPT09IHZpc2libGVDb2x1bW5LZXkpIHtcbiAgICAgICAgICB2aXNpYmxlQ29sdW1ucy5wdXNoKG9yZ0NvbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHZpc2libGVDb2x1bW5zLmZvckVhY2goKGNvbCkgPT4ge1xuICAgICAgY29uc3QgdmFsdWVFbXB0eUNoZWNrZXIgPSBVdGlscy5nZXRWYWx1ZUVtcHR5Q2hlY2tlcihjb2wpO1xuICAgICAgLy8gQ2VsbCB2YWx1ZSByZW5kZXJpbmdcbiAgICAgIGNvbnN0IHZhbHVlUmVuZGVyID0gKHJvd0luZGV4LCBmb3JtYXQpID0+IHtcbiAgICAgICAgY29uc3QgdmFsID0gZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbCkpIHtcbiAgICAgICAgICByZXR1cm4gY29sLmlzUmVxdWlyZWQgPyA8TSBpZD1cIkdyaWQuVmFsdWVJc01pc3NpbmdcIiAvPiA6ICcnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3JtYXQgPyBmb3JtYXQodmFsKSA6IHZhbDtcbiAgICAgIH07XG5cbiAgICAgIGxldCBjb2x1bW4gPSBHcmlkQ29sdW1uU2VydmljZS5iYXNlQ29sdW1uKGNvbCk7XG4gICAgICAvLyBDb2xsZWN0IGNvbHVtbiBmdW5jdGlvbnMgaW50byBvbmUgT2JqZWN0XG4gICAgICBjb25zdCBjb2x1bW5GdW5jdGlvbnMgPSB7XG4gICAgICAgIGVkaXQ6IHtcbiAgICAgICAgICBnZXRJdGVtVmFsdWU6IHRoaXMuZ2V0RWRpdEl0ZW1WYWx1ZSxcbiAgICAgICAgICBvbkNlbGxWYWx1ZUNoYW5nZTogdGhpcy5vbkVkaXRDZWxsVmFsdWVDaGFuZ2UsXG4gICAgICAgICAgb25DZWxsQmx1cjogdGhpcy5vbkVkaXRDZWxsQmx1cixcbiAgICAgICAgICBvbkNlbGxGb2N1czogdGhpcy5vbkNlbGxGb2N1cyxcbiAgICAgICAgICBvbkNlbGxLZXlEb3duOiB0aGlzLm9uRWRpdENlbGxLZXlEb3duLFxuICAgICAgICAgIGhhbmRsZUNlbGxSZWY6IHRoaXMuaGFuZGxlRWRpdENlbGxSZWYsXG4gICAgICAgIH0sXG4gICAgICAgIGNyZWF0ZToge1xuICAgICAgICAgIGdldEl0ZW1WYWx1ZTogdGhpcy5nZXRDcmVhdGVJdGVtVmFsdWUsXG4gICAgICAgICAgb25DZWxsVmFsdWVDaGFuZ2U6IHRoaXMub25DcmVhdGVDZWxsVmFsdWVDaGFuZ2UsXG4gICAgICAgICAgb25DZWxsQmx1cjogdGhpcy5vbkNyZWF0ZUNlbGxCbHVyLFxuICAgICAgICAgIG9uQ2VsbEZvY3VzOiB0aGlzLm9uQ2VsbEZvY3VzLFxuICAgICAgICAgIG9uQ2VsbEtleURvd246IHRoaXMub25DcmVhdGVDZWxsS2V5RG93bixcbiAgICAgICAgICBoYW5kbGVDZWxsUmVmOiB0aGlzLmhhbmRsZUNyZWF0ZUNlbGxSZWYsXG4gICAgICAgIH0sXG4gICAgICAgIGZpbHRlcjoge1xuICAgICAgICAgIGdldEl0ZW1WYWx1ZTogdGhpcy5nZXRGaWx0ZXJJdGVtVmFsdWUsXG4gICAgICAgICAgZ2V0SXRlbU11bHRpVmFsdWU6IHRoaXMuZ2V0RmlsdGVySXRlbU11bHRpVmFsdWUsXG4gICAgICAgICAgb25DZWxsVmFsdWVDaGFuZ2U6IHRoaXMub25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UsXG4gICAgICAgICAgb25DZWxsTXVsdGlWYWx1ZUJsdXI6IHRoaXMub25GaWx0ZXJDZWxsTXVsdGlWYWx1ZUJsdXIsXG4gICAgICAgICAgb25DZWxsTXVsdGlWYWx1ZUNoYW5nZTogdGhpcy5vbkZpbHRlckNlbGxNdWx0aVZhbHVlQ2hhbmdlLFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgLy8gaGFuZGxlIGNvbHVtbi5jZWxsIC8gY29sdW1uLmNlbGxFZGl0IC8gY29sdW1uLmNlbGxDcmVhdGUgLyBjb2x1bW4uY2VsbEZpbHRlclxuICAgICAgY29uc3QgY2VsbFByb3BzID0ge1xuICAgICAgICBncmlkLFxuICAgICAgICBkYXRhLFxuICAgICAgICBkYXRlRm9ybWF0LFxuICAgICAgICB0aG91c2FuZFNlcGFyYXRvcixcbiAgICAgICAgZGVjaW1hbFNlcGFyYXRvcixcbiAgICAgICAgc2VsZWN0Q29tcG9uZW50T3B0aW9ucyxcbiAgICAgIH07IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIGNvbHVtbiA9IEdyaWRDb2x1bW5TZXJ2aWNlLmNvbHVtbkNlbGwoY29sdW1uLCBjZWxsUHJvcHMsIGNvbCwgdmFsdWVSZW5kZXIpO1xuXG4gICAgICAvLyBoYW5kbGUgY29sdW1uQ29tcG9uZW50VHlwZXNcbiAgICAgIGNvbnN0IGNvbXBvbmVudFR5cGVQcm9wcyA9IHtcbiAgICAgICAgLi4uY2VsbFByb3BzLFxuICAgICAgICBpbmxpbmVFZGl0LFxuICAgICAgICBmaWx0ZXJpbmcsXG4gICAgICAgIHJlZ2lvbixcbiAgICAgICAgaW50bCxcbiAgICAgICAgc2VsZWN0Q29tcG9uZW50T3B0aW9ucyxcbiAgICAgIH07IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIGNvbHVtbiA9IEdyaWRDb2x1bW5TZXJ2aWNlLmNvbHVtbkNvbXBvbmVudFR5cGUoXG4gICAgICAgIGNvbHVtbixcbiAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgIGNvbXBvbmVudFR5cGVQcm9wcyxcbiAgICAgICAgY29sLFxuICAgICAgICBjb2x1bW5GdW5jdGlvbnMsXG4gICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZSxcbiAgICAgICk7XG4gICAgICBjb2x1bW5zLnB1c2goY29sdW1uKTtcbiAgICB9KTtcblxuICAgIGlmIChpc0NyZWF0aW5nKSB7XG4gICAgICBjb2x1bW5zLnB1c2goe1xuICAgICAgICB3aWR0aDogMzcsXG4gICAgICAgIGlzUmVzaXphYmxlOiBmYWxzZSxcbiAgICAgICAgY29sdW1uS2V5OiAncmVtb3ZlTmV3SXRlbScsXG4gICAgICAgIGNlbGw6ICgpID0+IG51bGwsXG4gICAgICAgIGNlbGxFZGl0OiAoKSA9PiBudWxsLFxuICAgICAgICBjZWxsQ3JlYXRlOiByb3dJbmRleCA9PiAoXG4gICAgICAgICAgPEljb25cbiAgICAgICAgICAgIGlkPXtgb2MtZGF0YWdyaWQtbmV3LWl0ZW0tcmVtb3ZlLSR7Z3JpZC5pZH0tJHtyb3dJbmRleH1gfVxuICAgICAgICAgICAgdHlwZT1cImluZGljYXRvclwiXG4gICAgICAgICAgICBuYW1lPVwiZGVsZXRlXCJcbiAgICAgICAgICAgIHdpZHRoPXszMH1cbiAgICAgICAgICAgIGhlaWdodD17MzB9XG4gICAgICAgICAgICBzdHlsZT17eyBwYWRkaW5nOiAnN3B4JyB9fVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdGhpcy5wcm9wcy5yZW1vdmVOZXdJdGVtKGdyaWQsIHJvd0luZGV4KX1cbiAgICAgICAgICAvPlxuICAgICAgICApLFxuICAgICAgICBjZWxsRmlsdGVyOiAoKSA9PiBudWxsLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBjb2x1bW5zO1xuICB9O1xuXG4gIGlzQ2VsbEVkaXRlZCA9IChyb3dJbmRleCwgY29sLCBjZWxsVHlwZSkgPT4ge1xuICAgIGlmIChjZWxsVHlwZSAhPT0gJ2VkaXQnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICByZXR1cm4gISF0aGlzLnByb3BzLmVkaXREYXRhLmdldEluKFtpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICB9O1xuXG4gIGhhbmRsZUFmdGVyQWRkSXRlbSA9ICgpID0+IHtcbiAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsID0gdHJ1ZTtcbiAgfTtcblxuICBoYW5kbGVBZnRlckVkaXRQcmVzcyA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLnNpemUpIHtcbiAgICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gdHJ1ZTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjdXJyZW50Um93OiB1bmRlZmluZWQsXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlQWZ0ZXJWYWxpZGF0aW9uRXJyb3IgPSAoKSA9PiB7XG4gICAgdGhpcy5mb2N1c1RvRXJyb3JDZWxsID0gdHJ1ZTtcbiAgfTtcblxuICBoYW5kbGVSb3dDbGljayA9IChlLCByb3dJbmRleCkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5pc0NyZWF0aW5nICYmICF0aGlzLnByb3BzLmlzRWRpdGluZykge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgaWYgKGUuY3RybEtleSB8fCBlLnNoaWZ0S2V5KSB7XG4gICAgICAgIGRvY3VtZW50LmdldFNlbGVjdGlvbigpLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgfVxuICAgICAgLy8gRG9uJ3QgdHJpZ2dlciBzZWxlY3Rpb24gY2hhbmdlIG9uIHdoZW4gdXNlciBjbGlja3Mgb24gc3BlY2lhbCBjZWxscyBsaWtlIGNoZWNrYm94L2V4dHJhXG4gICAgICAvLyBDaGVjayB0aGF0IGNsaWNrZWQgbm9kZSdzIHBhcmVudCBvciBwYXJlbnQncyBwYXJlbnQgZG9lc24ndCBoYXZlIG5vLXJvdy1zZWxlY3QgY2xhc3NcbiAgICAgIGNvbnN0IHsgcGFyZW50Tm9kZSB9ID0gZS50YXJnZXQ7XG4gICAgICBjb25zdCBwYXJlbnQxY2xhc3MgPSBwYXJlbnROb2RlLmNsYXNzTmFtZSAmJiBwYXJlbnROb2RlLmNsYXNzTmFtZS5pbmRleE9mID8gcGFyZW50Tm9kZS5jbGFzc05hbWUgOiAnJztcbiAgICAgIGNvbnN0IHBhcmVudDJjbGFzcyA9ICAgICAgICBwYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lICYmIHBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUuaW5kZXhPZiAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgID8gcGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZVxuICAgICAgICA6ICcnO1xuICAgICAgY29uc3QgcGFyZW50M2NsYXNzID0gcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgICYmIHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZS5pbmRleE9mIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgPyBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWVcbiAgICAgICAgOiAnJztcbiAgICAgIGNvbnN0IHBhcmVudDRjbGFzcyA9IHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgICYmIHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lLmluZGV4T2YgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICA/IHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgIDogJyc7XG4gICAgICBpZiAoXG4gICAgICAgIHBhcmVudDFjbGFzcy5pbmRleE9mKCduby1yb3ctc2VsZWN0JykgPT09IC0xXG4gICAgICAgICYmIHBhcmVudDJjbGFzcy5pbmRleE9mKCduby1yb3ctc2VsZWN0JykgPT09IC0xXG4gICAgICAgICYmIHBhcmVudDNjbGFzcy5pbmRleE9mKCduby1yb3ctc2VsZWN0JykgPT09IC0xXG4gICAgICAgICYmIHBhcmVudDRjbGFzcy5pbmRleE9mKCduby1yb3ctc2VsZWN0JykgPT09IC0xXG4gICAgICApIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucm93U2VsZWN0KSB7XG4gICAgICAgICAgdGhpcy5wcm9wcy5pdGVtU2VsZWN0aW9uQ2hhbmdlKFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0aGlzLnByb3BzLm11bHRpU2VsZWN0ICYmIGUuY3RybEtleSxcbiAgICAgICAgICAgIHRoaXMucHJvcHMubXVsdGlTZWxlY3QgJiYgZS5zaGlmdEtleSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnByb3BzLml0ZW1TZWxlY3Rpb25DaGFuZ2UodGhpcy5wcm9wcy5ncmlkLCByb3dJbmRleCwgdGhpcy5wcm9wcy5tdWx0aVNlbGVjdCwgZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5vblJvd0NsaWNrKSB7XG4gICAgICB0aGlzLnByb3BzLm9uUm93Q2xpY2soZSwgcm93SW5kZXgsIHRoaXMucHJvcHMuZGF0YS5nZXQocm93SW5kZXgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgaGFuZGxlQ29udGV4dE1lbnUgPSAoZSwgcm93SW5kZXgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5jb250ZXh0TWVudUl0ZW1zKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGl0ZW1TZWxlY3Rpb25DaGFuZ2UsIHNlbGVjdGVkSXRlbXMsIGdyaWQsIGRhdGEsXG4gICAgICB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY29udGV4dE1lbnVPcGVuOiB0cnVlLFxuICAgICAgICBjb250ZXh0TWVudVg6IGUuY2xpZW50WCxcbiAgICAgICAgY29udGV4dE1lbnVZOiBlLmNsaWVudFksXG4gICAgICB9KTtcbiAgICAgIC8vIElmIGNsaWNrZWQgaXRlbSBpcyBub3Qgc2VsZWN0ZWQsIGNoYW5nZSBzZWxlY3Rpb24gdG8gaXRcbiAgICAgIGlmICghc2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhkYXRhLmdldEluKFtyb3dJbmRleCwgLi4uZ3JpZC5pZEtleVBhdGhdKSkpIHtcbiAgICAgICAgaXRlbVNlbGVjdGlvbkNoYW5nZShncmlkLCByb3dJbmRleCk7XG4gICAgICB9XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25Eb2N1bWVudENsaWNrKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgaGFuZGxlUm93SGVpZ2h0R2V0dGVyID0gcm93SW5kZXggPT4gdGhpcy5wcm9wcy5yb3dIZWlnaHRHZXR0ZXIoXG4gICAgdGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCksXG4gICAgcm93SW5kZXgsXG4gICk7XG5cbiAgcmVuZGVyQ2VsbCA9IGNvbCA9PiAoY2VsbFByb3BzKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgaXNDcmVhdGluZywgaXNFZGl0aW5nLCBjcmVhdGVEYXRhLCBzZWxlY3RlZENlbGwsIGdyaWQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyByb3dJbmRleCwgLi4ucHJvcHMgfSA9IGNlbGxQcm9wcztcbiAgICBsZXQgY2VsbDtcbiAgICBsZXQgY2VsbFR5cGUgPSAndmlldyc7XG4gICAgbGV0IGV4dHJhUm93Q291bnQgPSAwOyAvLyBob3cgbWFueSByb3dzIHRvIGlnbm9yZSBmcm9tIHRvcCwgbmV3ICsgZmlsdGVyIHJvd3NcbiAgICBpZiAoaXNDcmVhdGluZykgZXh0cmFSb3dDb3VudCA9IGNyZWF0ZURhdGEuc2l6ZTtcbiAgICBjb25zdCBleGlzdGluZ1Jvd3NJbmRleCA9IHJvd0luZGV4IC0gZXh0cmFSb3dDb3VudDtcbiAgICBpZiAoaXNDcmVhdGluZykge1xuICAgICAgaWYgKHJvd0luZGV4IDw9IGV4dHJhUm93Q291bnQgLSAxKSB7XG4gICAgICAgIGlmIChjb2wuY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNlbGwgPSBjb2wuY2VsbENyZWF0ZShcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGhpcy5oYW5kbGVDcmVhdGVDZWxsUmVmKHJvd0luZGV4LCBjb2wpLFxuICAgICAgICAgICAgdGhpcy5vbkNyZWF0ZUNlbGxLZXlEb3duKHJvd0luZGV4LCBjb2wpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgY2VsbFR5cGUgPSAnY3JlYXRlJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjZWxsID0gbnVsbDtcbiAgICAgICAgICBjZWxsVHlwZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNlbGwgPSBjb2wuY2VsbChcbiAgICAgICAgICBleGlzdGluZ1Jvd3NJbmRleCxcbiAgICAgICAgICB0aGlzLmhhbmRsZUNyZWF0ZUNlbGxSZWYoZXhpc3RpbmdSb3dzSW5kZXgsIGNvbCksXG4gICAgICAgICAgdGhpcy5vbkNyZWF0ZUNlbGxLZXlEb3duKGV4aXN0aW5nUm93c0luZGV4LCBjb2wpLFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNFZGl0aW5nICYmIGNvbC5jZWxsRWRpdCkge1xuICAgICAgY2VsbCA9IGNvbC5jZWxsRWRpdChcbiAgICAgICAgZXhpc3RpbmdSb3dzSW5kZXgsXG4gICAgICAgIHRoaXMuaGFuZGxlRWRpdENlbGxSZWYoZXhpc3RpbmdSb3dzSW5kZXgsIGNvbCksXG4gICAgICAgIHRoaXMub25FZGl0Q2VsbEtleURvd24oZXhpc3RpbmdSb3dzSW5kZXgsIGNvbCksXG4gICAgICApO1xuICAgICAgY2VsbFR5cGUgPSAnZWRpdCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNlbGwgPSBjb2wuY2VsbChcbiAgICAgICAgZXhpc3RpbmdSb3dzSW5kZXgsXG4gICAgICAgIHRoaXMuaGFuZGxlRWRpdENlbGxSZWYoZXhpc3RpbmdSb3dzSW5kZXgsIGNvbCksXG4gICAgICAgIHRoaXMub25FZGl0Q2VsbEtleURvd24oZXhpc3RpbmdSb3dzSW5kZXgsIGNvbCksXG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCBpc1NwZWNpYWwgPSBwcm9wcy5jb2x1bW5LZXkgPT09ICdzZWxlY3Rpb25DaGVja2JveCcgfHwgcHJvcHMuY29sdW1uS2V5ID09PSAnZXh0cmFDb2x1bW4nO1xuICAgIGlmICgoY2VsbFR5cGUgPT09ICd2aWV3JyB8fCBjZWxsVHlwZSA9PT0gJ2VkaXQnIHx8IGNlbGxUeXBlID09PSAnY3JlYXRlJykgJiYgIWlzU3BlY2lhbCkge1xuICAgICAgY29uc3QgZ2V0Um93SW5kZXggPSBjZWxsVHlwZSA9PT0gJ2NyZWF0ZScgPyByb3dJbmRleCA6IHJvd0luZGV4IC0gZXh0cmFSb3dDb3VudDtcbiAgICAgIGNvbnN0IG1lc3NhZ2VEYXRhID0gdGhpcy5nZXRDZWxsTWVzc2FnZXMoZ2V0Um93SW5kZXgsIGNvbCwgY2VsbFR5cGUpO1xuICAgICAgY29uc3QgaXNFZGl0ZWQgPSB0aGlzLmlzQ2VsbEVkaXRlZChnZXRSb3dJbmRleCwgY29sLCBjZWxsVHlwZSk7XG4gICAgICBjb25zdCBjbGFzc05hbWUgPSBzZWxlY3RlZENlbGwuZ2V0KCdyb3dJbmRleCcpID09PSByb3dJbmRleFxuICAgICAgICAmJiBzZWxlY3RlZENlbGwuZ2V0KCdjb2x1bW5LZXknKSA9PT0gcHJvcHMuY29sdW1uS2V5XG4gICAgICAgID8gJ29jLWRhdGFncmlkLWNlbGwgaXMtc2VsZWN0ZWQnXG4gICAgICAgIDogJ29jLWRhdGFncmlkLWNlbGwnO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPENlbGxcbiAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG4gICAgICAgICAgc3R5bGU9e2NvbC5zdHlsZX1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNlbGxTZWxlY3QoY2VsbFR5cGUsIHJvd0luZGV4LCBwcm9wcy5jb2x1bW5LZXkpfVxuICAgICAgICA+XG4gICAgICAgICAgPENlbGxUb29sdGlwXG4gICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRDZWxsLSR7Z3JpZC5pZH0tJHtwcm9wcy5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgIGlzRWRpdGVkPXtpc0VkaXRlZH1cbiAgICAgICAgICAgIGlzRXJyb3I9eyEhbWVzc2FnZURhdGEuZXJyb3JNZXNzYWdlfVxuICAgICAgICAgICAgaXNXYXJuaW5nPXshIW1lc3NhZ2VEYXRhLndhcm5pbmdNZXNzYWdlfVxuICAgICAgICAgICAgaW5mb01lc3NhZ2U9e21lc3NhZ2VEYXRhLmluZm9NZXNzYWdlfVxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlPXttZXNzYWdlRGF0YS5lcnJvck1lc3NhZ2V9XG4gICAgICAgICAgICB3YXJuaW5nTWVzc2FnZT17bWVzc2FnZURhdGEud2FybmluZ01lc3NhZ2V9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2NlbGx9XG4gICAgICAgICAgPC9DZWxsVG9vbHRpcD5cbiAgICAgICAgPC9DZWxsPlxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxDZWxsIHsuLi5wcm9wc30gY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtY2VsbFwiIHN0eWxlPXtjb2wuc3R5bGV9PlxuICAgICAgICB7Y2VsbH1cbiAgICAgIDwvQ2VsbD5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlckNvbHVtbnMgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgYWxsRGF0YVNpemUsIGdyaWQsIGlzQ3JlYXRpbmcsIGlzQnVzeSwgdmlzaWJsZUNvbHVtbnMsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFhbGxEYXRhU2l6ZSAmJiAhaXNCdXN5ICYmICFpc0NyZWF0aW5nICYmICFncmlkLnBhZ2luYXRpb24pIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxDb2x1bW5cbiAgICAgICAgICBjb2x1bW5LZXk9XCJkYXRhRW1wdHlDb2x1bW5cIlxuICAgICAgICAgIGhlYWRlcj17KFxuICAgICAgICAgICAgPENlbGwgc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICAgICAgPE0gaWQ9XCJHcmlkLk5vSXRlbXNcIiAvPlxuICAgICAgICAgICAgPC9DZWxsPlxuKX1cbiAgICAgICAgICB3aWR0aD17MTB9XG4gICAgICAgICAgaXNSZXNpemFibGU9e2ZhbHNlfVxuICAgICAgICAgIGZsZXhHcm93PXsxfVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKCF2aXNpYmxlQ29sdW1ucy5zaXplKSB7XG4gICAgICBpZiAoaXNCdXN5KSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPENvbHVtblxuICAgICAgICAgICAgY29sdW1uS2V5PVwiZGF0YUVtcHR5Q29sdW1uXCJcbiAgICAgICAgICAgIGhlYWRlcj17PENlbGw+Jm5ic3A7PC9DZWxsPn1cbiAgICAgICAgICAgIHdpZHRoPXsxMH1cbiAgICAgICAgICAgIGlzUmVzaXphYmxlPXtmYWxzZX1cbiAgICAgICAgICAgIGZsZXhHcm93PXsxfVxuICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Q29sdW1uXG4gICAgICAgICAgY29sdW1uS2V5PVwiZGF0YUVtcHR5Q29sdW1uXCJcbiAgICAgICAgICBoZWFkZXI9eyhcbiAgICAgICAgICAgIDxDZWxsIHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgICAgIDxNIGlkPVwiR3JpZC5Ob0NvbHVtbnNcIiAvPlxuICAgICAgICAgICAgPC9DZWxsPlxuKX1cbiAgICAgICAgICB3aWR0aD17MTB9XG4gICAgICAgICAgaXNSZXNpemFibGU9e2ZhbHNlfVxuICAgICAgICAgIGZsZXhHcm93PXsxfVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3QgY29sdW1ucyA9IHRoaXMuZ2VuZXJhdGVDb2x1bW5zKCk7XG4gICAgaWYgKGNvbHVtbnMubGVuZ2h0ID09PSAwKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gY29sdW1ucy5tYXAoY29sID0+IChcbiAgICAgIDxDb2x1bW5cbiAgICAgICAga2V5PXtjb2wuY29sdW1uS2V5fVxuICAgICAgICBjb2x1bW5LZXk9e2NvbC5jb2x1bW5LZXl9XG4gICAgICAgIGhlYWRlcj17KFxuICAgICAgICAgIDxIZWFkZXJDZWxsXG4gICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRIZWFkZXItJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sLmNvbHVtbktleX1gfVxuICAgICAgICAgICAgZ3JpZD17dGhpcy5wcm9wcy5ncmlkfVxuICAgICAgICAgICAgY29sdW1ucz17dGhpcy5wcm9wcy5jb2x1bW5zfVxuICAgICAgICAgICAgY29sdW1uPXtjb2x9XG4gICAgICAgICAgICBjdXJyZW50U29ydENvbHVtbj17dGhpcy5wcm9wcy5zb3J0Q29sdW1ufVxuICAgICAgICAgICAgY3VycmVudFNvcnRPcmRlcj17dGhpcy5wcm9wcy5zb3J0T3JkZXJ9XG4gICAgICAgICAgICBvblNvcnRDaGFuZ2U9e3RoaXMucHJvcHMuc29ydENoYW5nZX1cbiAgICAgICAgICAgIGlzQnVzeT17dGhpcy5wcm9wcy5pc0J1c3l9XG4gICAgICAgICAgICBmaWx0ZXJpbmc9e3RoaXMucHJvcHMuZmlsdGVyaW5nICYmIHRoaXMucHJvcHMuaXNGaWx0ZXJpbmd9XG4gICAgICAgICAgICB3aWR0aD17dGhpcy5wcm9wcy5jb2x1bW5XaWR0aHMuZ2V0KGNvbC5jb2x1bW5LZXksIGNvbC53aWR0aCl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2NvbC5oZWFkZXJ9XG4gICAgICAgICAgPC9IZWFkZXJDZWxsPlxuKX1cbiAgICAgICAgY2VsbD17dGhpcy5yZW5kZXJDZWxsKGNvbCl9XG4gICAgICAgIHdpZHRoPXt0aGlzLnByb3BzLmNvbHVtbldpZHRocy5nZXQoY29sLmNvbHVtbktleSwgY29sLndpZHRoKX1cbiAgICAgICAgbWluV2lkdGg9e2NvbC5taW5XaWR0aH1cbiAgICAgICAgbWF4V2lkdGg9e2NvbC5tYXhXaWR0aH1cbiAgICAgICAgaXNSZXNpemFibGU9e2NvbC5pc1Jlc2l6YWJsZX1cbiAgICAgICAgZmxleEdyb3c9e2NvbC5mbGV4R3JvdyA/IGNvbC5mbGV4R3JvdyA6IDB9XG4gICAgICAgIGZpeGVkPXtjb2wuZml4ZWR9XG4gICAgICAgIGZpeGVkUmlnaHQ9e2NvbC5maXhlZFJpZ2h0fVxuICAgICAgICBhbGxvd0NlbGxzUmVjeWNsaW5nPXtjb2wuYWxsb3dDZWxsc1JlY3ljbGluZ31cbiAgICAgIC8+XG4gICAgKSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGdyaWRDbGFzc05hbWUgPSBjbGFzc05hbWVzKHtcbiAgICAgICdvYy1kYXRhZ3JpZC1jb250YWluZXInOiB0cnVlLFxuICAgICAgJ3dpdGgtYWN0aW9uYmFyJzogdGhpcy5wcm9wcy5pbmxpbmVFZGl0ICYmICF0aGlzLnByb3BzLmRpc2FibGVBY3Rpb25CYXIsXG4gICAgICAnaXMtYnVzeSc6IHRoaXMucHJvcHMuaXNCdXN5LFxuICAgICAgJ2lzLWVkaXRpbmcnOiB0aGlzLnByb3BzLmlzRWRpdGluZyxcbiAgICAgICdpcy1jcmVhdGluZyc6IHRoaXMucHJvcHMuaXNDcmVhdGluZyxcbiAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgfSk7XG5cbiAgICAvLyBjaGVjayBpZiB0aGVyZSBpcyBhIG5ldyByZXF1ZXN0IHRvIGNoYW5nZSBlZGl0IG1vZGUgZm9jdXNcbiAgICB0aGlzLnNldEZvY3VzVG8odGhpcy5wcm9wcy5mb2N1c1R5cGUpO1xuXG4gICAgbGV0IGFjdGlvbkJhciA9IG51bGw7XG4gICAgbGV0IGFjdGlvbkJhclJpZ2h0ID0gbnVsbDtcbiAgICBsZXQgYWN0aW9uQmFyTGVmdCA9IG51bGw7XG4gICAgaWYgKFxuICAgICAgKHRoaXMucHJvcHMuYWN0aW9uQmFyXG4gICAgICAgIHx8IHRoaXMucHJvcHMuaW5saW5lRWRpdFxuICAgICAgICB8fCB0aGlzLnByb3BzLmZpbHRlcmluZ1xuICAgICAgICB8fCB0aGlzLnByb3BzLnJlbW92aW5nKVxuICAgICAgJiYgIXRoaXMucHJvcHMuZGlzYWJsZUFjdGlvbkJhclxuICAgICkge1xuICAgICAgYWN0aW9uQmFyUmlnaHQgPSAoXG4gICAgICAgIDxBY3Rpb25CYXIgcG9zaXRpb249XCJyaWdodFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtYWN0aW9uYmFyLXJpZ2h0XCI+e3RoaXMucHJvcHMuYWN0aW9uQmFyfTwvZGl2PlxuICAgICAgICAgIHt0aGlzLnByb3BzLmZpbHRlcmluZ1xuICAgICAgICAgICAgJiYgdGhpcy5wcm9wcy5kaXNhYmxlRHJvcGRvd25cbiAgICAgICAgICAgICYmICF0aGlzLnByb3BzLmRpc2FibGVGaWx0ZXJpbmdDb250cm9scyAmJiA8RmlsdGVyaW5nQ29udHJvbHMgey4uLnRoaXMucHJvcHN9IC8+fVxuICAgICAgICAgIHt0aGlzLnByb3BzLmlubGluZUVkaXQgJiYgKFxuICAgICAgICAgICAgPElubGluZUVkaXRDb250cm9sc1xuICAgICAgICAgICAgICBhZnRlckFkZEl0ZW09e3RoaXMuaGFuZGxlQWZ0ZXJBZGRJdGVtfVxuICAgICAgICAgICAgICBhZnRlckVkaXRQcmVzcz17dGhpcy5oYW5kbGVBZnRlckVkaXRQcmVzc31cbiAgICAgICAgICAgICAgYWZ0ZXJWYWxpZGF0aW9uRXJyb3I9e3RoaXMuaGFuZGxlQWZ0ZXJWYWxpZGF0aW9uRXJyb3J9XG4gICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuICAgICAgICAgIHsodGhpcy5wcm9wcy5kcm9wZG93bk1lbnVJdGVtc1xuICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5yZW1vdmluZ1xuICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5jb2x1bW5TZXR0aW5nc1xuICAgICAgICAgICAgfHwgKHRoaXMucHJvcHMuZmlsdGVyaW5nICYmICF0aGlzLnByb3BzLmRpc2FibGVEcm9wZG93bikpICYmIChcbiAgICAgICAgICAgIDxEcm9wZG93bkNvbnRyb2xzIHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQWN0aW9uQmFyPlxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuYWN0aW9uQmFyTGVmdCB8fCB0aGlzLnByb3BzLmdyaWRIZWFkZXIpIHtcbiAgICAgIGFjdGlvbkJhckxlZnQgPSAoXG4gICAgICAgIDxBY3Rpb25CYXIgcG9zaXRpb249XCJsZWZ0XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1ncmlkaGVhZGVyXCI+e3RoaXMucHJvcHMuZ3JpZEhlYWRlcn08L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWFjdGlvbmJhci1sZWZ0XCI+e3RoaXMucHJvcHMuYWN0aW9uQmFyTGVmdH08L2Rpdj5cbiAgICAgICAgPC9BY3Rpb25CYXI+XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoYWN0aW9uQmFyTGVmdCB8fCBhY3Rpb25CYXJSaWdodCkge1xuICAgICAgYWN0aW9uQmFyID0gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWFjdGlvbmJhci1jb250YWluZXJcIj5cbiAgICAgICAgICB7YWN0aW9uQmFyTGVmdH1cbiAgICAgICAgICB7YWN0aW9uQmFyUmlnaHR9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gICAgbGV0IHJvd3NDb3VudCA9IHRoaXMucHJvcHMucm93c0NvdW50IHx8IHRoaXMucHJvcHMucm93c0NvdW50ID09PSAwXG4gICAgICA/IHRoaXMucHJvcHMucm93c0NvdW50XG4gICAgICA6IHRoaXMucHJvcHMuZGF0YS5zaXplO1xuICAgIGlmICh0aGlzLnByb3BzLmlzQ3JlYXRpbmcpIHJvd3NDb3VudCArPSB0aGlzLnByb3BzLmNyZWF0ZURhdGEuc2l6ZTtcbiAgICBpZiAoIXRoaXMucHJvcHMudmlzaWJsZUNvbHVtbnMuc2l6ZSkgcm93c0NvdW50ID0gMDtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD17YG9jLWRhdGFncmlkLSR7dGhpcy5wcm9wcy5ncmlkLmlkfWB9XG4gICAgICAgIGNsYXNzTmFtZT17Z3JpZENsYXNzTmFtZX1cbiAgICAgICAgc3R5bGU9e3RoaXMucHJvcHMuY29udGFpbmVyU3R5bGV9XG4gICAgICA+XG4gICAgICAgIHt0aGlzLnByb3BzLmlzQnVzeSAmJiA8U3Bpbm5lciAvPn1cbiAgICAgICAge3RoaXMuc3RhdGUuY29udGV4dE1lbnVPcGVuICYmIChcbiAgICAgICAgICA8Q29udGV4dE1lbnVcbiAgICAgICAgICAgIHg9e3RoaXMuc3RhdGUuY29udGV4dE1lbnVYfVxuICAgICAgICAgICAgeT17dGhpcy5zdGF0ZS5jb250ZXh0TWVudVl9XG4gICAgICAgICAgICBpc1Zpc2libGU9e3RoaXMuc3RhdGUuY29udGV4dE1lbnVPcGVufVxuICAgICAgICAgICAgY29udGV4dE1lbnVJdGVtcz17dGhpcy5wcm9wcy5jb250ZXh0TWVudUl0ZW1zfVxuICAgICAgICAgICAgZGF0YT17dGhpcy5wcm9wcy5kYXRhfVxuICAgICAgICAgICAgZ3JpZD17dGhpcy5wcm9wcy5ncmlkfVxuICAgICAgICAgICAgc2VsZWN0ZWRJdGVtcz17dGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zfVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICAgIHthY3Rpb25CYXJ9XG4gICAgICAgIDxSZXNwb25zaXZlRml4ZWREYXRhVGFibGVcbiAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICBpZD17dGhpcy5wcm9wcy5ncmlkLmlkfVxuICAgICAgICAgIHJvd3NDb3VudD17cm93c0NvdW50fVxuICAgICAgICAgIGhlYWRlckhlaWdodD17XG4gICAgICAgICAgICAodGhpcy5wcm9wcy5maWx0ZXJpbmcgJiYgdGhpcy5wcm9wcy5pc0ZpbHRlcmluZylcbiAgICAgICAgICAgICAgPyB0aGlzLnByb3BzLmhlYWRlckhlaWdodCArIHRoaXMucHJvcHMuZmlsdGVyUm93SGVpZ2h0XG4gICAgICAgICAgICAgIDogdGhpcy5wcm9wcy5oZWFkZXJIZWlnaHRcbiAgICAgICAgICB9XG4gICAgICAgICAgcm93SGVpZ2h0PXt0aGlzLnByb3BzLnJvd0hlaWdodH1cbiAgICAgICAgICBvbkNvbHVtblJlc2l6ZUVuZENhbGxiYWNrPXt0aGlzLm9uQ29sdW1uUmVzaXplRW5kQ2FsbGJhY2t9XG4gICAgICAgICAgaXNDb2x1bW5SZXNpemluZz17ZmFsc2V9XG4gICAgICAgICAgb25Sb3dDbGljaz17dGhpcy5oYW5kbGVSb3dDbGlja31cbiAgICAgICAgICBzY3JvbGxUb0NvbHVtbj17dGhpcy5wcm9wcy5zY3JvbGxUb0NvbHVtbiB8fCB0aGlzLnN0YXRlLmN1cnJlbnRDb2x1bW59XG4gICAgICAgICAgc2Nyb2xsVG9wPXt0aGlzLnByb3BzLnNjcm9sbFRvcH1cbiAgICAgICAgICBzY3JvbGxUb1Jvdz17dGhpcy5nZXRTY3JvbGxUb1JvdygpfVxuICAgICAgICAgIG9uUm93RG91YmxlQ2xpY2s9e3RoaXMucHJvcHMub25Sb3dEb3VibGVDbGlja31cbiAgICAgICAgICBvblJvd01vdXNlRG93bj17dGhpcy5wcm9wcy5vbk1vdXNlRG93bn1cbiAgICAgICAgICBvblJvd01vdXNlRW50ZXI9e3RoaXMucHJvcHMub25Sb3dNb3VzZUVudGVyfVxuICAgICAgICAgIG9uUm93TW91c2VMZWF2ZT17dGhpcy5wcm9wcy5vblJvd01vdXNlTGVhdmV9XG4gICAgICAgICAgb25TY3JvbGxTdGFydD17dGhpcy5wcm9wcy5vblNjcm9sbFN0YXJ0fVxuICAgICAgICAgIG9uU2Nyb2xsRW5kPXt0aGlzLnByb3BzLm9uU2Nyb2xsRW5kfVxuICAgICAgICAgIHJvd0NsYXNzTmFtZUdldHRlcj17dGhpcy5nZXRSb3dDbGFzc05hbWV9XG4gICAgICAgICAgcm93SGVpZ2h0R2V0dGVyPXt0aGlzLnByb3BzLnJvd0hlaWdodEdldHRlciAmJiB0aGlzLmhhbmRsZVJvd0hlaWdodEdldHRlcn1cbiAgICAgICAgICBvbkNvbnRlbnRIZWlnaHRDaGFuZ2U9e3RoaXMucHJvcHMub25Db250ZW50SGVpZ2h0Q2hhbmdlfVxuICAgICAgICAgIG9uUm93Q29udGV4dE1lbnU9e3RoaXMuaGFuZGxlQ29udGV4dE1lbnV9XG4gICAgICAgID5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJDb2x1bW5zKCl9XG4gICAgICAgIDwvUmVzcG9uc2l2ZUZpeGVkRGF0YVRhYmxlPlxuICAgICAgICB7dGhpcy5wcm9wcy5pc0NvbHVtblNldHRpbmdzTW9kYWxPcGVuICYmIChcbiAgICAgICAgICA8Q29sdW1uU2V0dGluZ3NNb2RhbFxuICAgICAgICAgICAgZ3JpZD17dGhpcy5wcm9wcy5ncmlkfVxuICAgICAgICAgICAgY29sdW1ucz17dGhpcy5wcm9wcy5jb2x1bW5zfVxuICAgICAgICAgICAgdmlzaWJsZUNvbHVtbnM9e3RoaXMucHJvcHMudmlzaWJsZUNvbHVtbnN9XG4gICAgICAgICAgICBjbG9zZUNvbHVtblNldHRpbmdzTW9kYWw9e3RoaXMucHJvcHMuY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsfVxuICAgICAgICAgICAgc2F2ZUNvbHVtblNldHRpbmdzPXt0aGlzLnByb3BzLnNhdmVDb2x1bW5TZXR0aW5nc31cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRGF0YUdyaWQ7XG4iXX0=