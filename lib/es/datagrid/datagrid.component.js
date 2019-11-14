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
import { MenuItem } from 'react-bootstrap';
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
      return React.createElement("ul", {
        className: "dropdown-menu oc-datagrid-context-menu open",
        style: style
      }, contextMenuItems && contextMenuItems.map && contextMenuItems.map(function (item, i) {
        var disabled = item.disabled;

        if (typeof item.disabled === 'function') {
          disabled = item.disabled(selectedItems, selectedData);
        }

        return React.createElement(MenuItem, {
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
    }, this.props.isBusy && React.createElement(Spinner, null), this.state.contextMenuOpen && this.renderContextMenu(), actionBar, React.createElement(ResponsiveFixedDataTable, _extends({}, this.props, {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiTWFwIiwiTGlzdCIsImNvbm5lY3QiLCJpbmplY3RJbnRsIiwiRm9ybWF0dGVkTWVzc2FnZSIsIk0iLCJDb2x1bW4iLCJDZWxsIiwiTWVudUl0ZW0iLCJjbGFzc05hbWVzIiwiSWNvbiIsIlNwaW5uZXIiLCJDaGVja2JveCIsIlJlc3BvbnNpdmVGaXhlZERhdGFUYWJsZSIsIkhlYWRlckNlbGwiLCJBY3Rpb25CYXIiLCJJbmxpbmVFZGl0Q29udHJvbHMiLCJGaWx0ZXJpbmdDb250cm9scyIsIkRyb3Bkb3duQ29udHJvbHMiLCJkYXRhZ3JpZEFjdGlvbnMiLCJDZWxsVG9vbHRpcCIsIkNvbHVtblNldHRpbmdzTW9kYWwiLCJwcm9wVHlwZXMiLCJkZWZhdWx0UHJvcHMiLCJLRVlfQ09ERVMiLCJwYWdpbmF0aW9uIiwiVXRpbHMiLCJHcmlkQ29sdW1uU2VydmljZSIsIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwib3duUHJvcHMiLCJHUklEIiwiZ3JpZCIsImlzQnVzeSIsImRhdGFncmlkIiwiZ2V0SW4iLCJpZCIsImlzRWRpdGluZyIsImlzQ3JlYXRpbmciLCJpc0ZpbHRlcmluZyIsImlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW4iLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwidmlzaWJsZUNvbHVtbnMiLCJjb2x1bW5XaWR0aHMiLCJzZWxlY3RlZENlbGwiLCJzZWxlY3RlZEl0ZW1zIiwiZGF0YSIsImVkaXREYXRhIiwiY3JlYXRlRGF0YSIsImZpbHRlckRhdGEiLCJjZWxsTWVzc2FnZXMiLCJjcmVhdGVDZWxsTWVzc2FnZXMiLCJhbGxEYXRhU2l6ZSIsInNpemUiLCJsYW5ndWFnZSIsImdldExhbmd1YWdlIiwidXNlciIsInJlZ2lvbiIsImdldFJlZ2lvbiIsImRhdGVGb3JtYXQiLCJnZXREYXRlRm9ybWF0IiwidGhvdXNhbmRTZXBhcmF0b3IiLCJnZXRUaG91c2FuZFNlcGFyYXRvciIsImRlY2ltYWxTZXBhcmF0b3IiLCJnZXREZWNpbWFsU2VwYXJhdG9yIiwiZm9yY2VSZWZyZXNoVGltZXN0YW1wIiwiZ2V0IiwiZm9jdXNUeXBlIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwiRGF0YUdyaWQiLCJwcm9wcyIsImNvbnRleHRNZW51SXRlbXMiLCJzZXRTdGF0ZSIsImNvbnRleHRNZW51T3BlbiIsImRvY3VtZW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIm9uRG9jdW1lbnRDbGljayIsIm5ld0NvbHVtbldpZHRoIiwiY29sdW1uS2V5IiwicmVzaXplQ29sdW1uIiwicm93SW5kZXgiLCJjb2wiLCJlIiwiY3JlYXRlIiwiZW5hYmxlQXJyb3dOYXZpZ2F0aW9uIiwiY2VsbFJlZnMiLCJjcmVhdGVDZWxsUmVmcyIsImFycm93S2V5cyIsIkRPV04iLCJVUCIsIkxFRlQiLCJSSUdIVCIsImNvbHVtbnMiLCJvbkxhc3RDZWxsVGFiUHJlc3MiLCJncmlkQ29sdW1ucyIsImdldENvbHVtbktleUJ5SW5kZXgiLCJpIiwiZ2V0Q29sdW1uS2V5Iiwicm93c1NpemUiLCJjdXJyZW50Q2VsbCIsInByb3h5IiwiaXNDdXJzb3JBdFN0YXJ0IiwidHlwZSIsInNlbGVjdGlvblN0YXJ0IiwiaXNDdXJzb3JBdEVuZCIsInNlbGVjdGlvbkVuZCIsInZhbHVlIiwibGVuZ3RoIiwic2VsZWN0UmVmIiwic2VsZWN0IiwiZ2V0U2VsZWN0UmVmIiwiaW5jbHVkZXMiLCJrZXlDb2RlIiwicHJldmVudERlZmF1bHQiLCJFTlRFUiIsIkVTQyIsImFkZE5ld0l0ZW0iLCJnZXRDb2x1bW5EZWZhdWx0VmFsdWVzIiwiZm9jdXNUb0NyZWF0ZUNlbGwiLCJuZXh0RWxlbWVudCIsIm1lbnVJc09wZW4iLCJtb3ZlQ2VsbEZvY3VzIiwiVEFCIiwiY29sdW1uSW5kIiwiZmluZEluZGV4IiwiYyIsInZhbHVlS2V5UGF0aCIsImpvaW4iLCJkaXNhYmxlZCIsInJvd0luZCIsInNoaWZ0S2V5Iiwib25DZWxsS2V5RG93biIsInZhbHVlUGFyc2VyIiwiZXZlbnRPckRhdGEiLCJyYXdWYWx1ZSIsInRhcmdldCIsInVuZGVmaW5lZCIsImZpbHRlckNlbGxWYWx1ZUNoYW5nZSIsInNlbGVjdGVkRmlsdGVycyIsImNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSIsImNvbXBvbmVudFR5cGUiLCJvbkNyZWF0ZVZhbHVlQ2hhbmdlIiwib25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUiLCJtYXRjaFZhbHVlIiwib25DcmVhdGVDZWxsVmFsdWVDaGFuZ2UiLCJuZXdWYWx1ZUtleVBhdGgiLCJ2IiwibmV3VmFsdWUiLCJ2YWxpZGF0b3JzIiwiY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUiLCJlZGl0Q2VsbFZhbHVlQ2hhbmdlIiwiZGF0YUlkIiwiZ2V0RGF0YUlkQnlSb3dJbmRleCIsIm9uRWRpdFZhbHVlQ2hhbmdlIiwib25FZGl0Q2VsbFZhbHVlQ2hhbmdlIiwiZWRpdENlbGxWYWx1ZVZhbGlkYXRlIiwic2VwYXJhdG9yIiwiUmVnRXhwIiwiZ2V0RWRpdEl0ZW1WYWx1ZSIsIm51bWVyaWNWYWx1ZSIsIk51bWJlciIsInJlcGxhY2UiLCJnZXRSZWdFeCIsInZhbHVlT3B0aW9ucyIsIm9uQ3JlYXRlQmx1ciIsIm9uRWRpdEJsdXIiLCJjZWxsVHlwZSIsImlucHV0VHlwZSIsImNlbGxTZWxlY3Rpb25DaGFuZ2UiLCJjZWxsU2VsZWN0IiwiY29tcG9uZW50IiwiaW5wdXRSZWYiLCJpZEtleVBhdGgiLCJpbmRleCIsIm9wdGlvbnMiLCJlZGl0VmFsdWUiLCJvcmlnaW5hbFZhbHVlIiwic2VsZWN0T3B0aW9ucyIsImZpbmQiLCJvYmoiLCJTdHJpbmciLCJ2YWwiLCJ0b0pTIiwibW9kZSIsImNvbXBvbmVudERpc2FibGVkIiwiZGlzYWJsZUVkaXRpbmciLCJkaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaCIsImdldENyZWF0ZUl0ZW1WYWx1ZSIsIm1hdGNoVmFsdWVLZXlQYXRoIiwicm93Q2xhc3NOYW1lcyIsImV4dHJhUm93Q291bnQiLCJwdXNoIiwiaW5kZXhPZiIsInJvd0NsYXNzTmFtZUdldHRlciIsInJldHVybkRhdGEiLCJpbmZvTWVzc2FnZSIsImVycm9yTWVzc2FnZSIsIndhcm5pbmdNZXNzYWdlIiwic2Nyb2xsVG9Sb3ciLCJzY3JvbGxOZXdSb3ciLCJzY3JvbGxJbkVkaXRNb2RlIiwiY3VycmVudFJvdyIsImdldFNlbGVjdGVkSXRlbUluZGV4IiwiZmlyc3QiLCJmb2N1c1RvIiwicHJldkZvY3VzVG8iLCJmb2N1c1RvTGFzdFJvdyIsInJlZiIsImZvY3VzIiwiZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZSIsImZvY3VzVG9FZGl0Q2VsbCIsInNlbGVjdGVkUm93SW5kZXgiLCJjb2x1bW5JbmRleCIsImVsZW1lbnRUeXBlcyIsImN1cnJlbnRDb2x1bW4iLCJzZXRUaW1lb3V0Iiwic2VsZWN0QWxsSXRlbXNDaGFuZ2UiLCJpdGVtU2VsZWN0aW9uQ2hhbmdlIiwiaW5saW5lRWRpdCIsImZpbHRlcmluZyIsImludGwiLCJzZWxlY3RDb21wb25lbnRPcHRpb25zIiwiZXh0cmFDb2x1bW4iLCJyb3dTZWxlY3RDaGVja2JveENvbHVtbiIsInNob3dTZWxlY3RBbGxDaGVja2JveCIsInRhYkluZGV4Iiwid2lkdGgiLCJpc1Jlc2l6YWJsZSIsImlzU29ydGFibGUiLCJjZWxsIiwidmFsdWVSZW5kZXIiLCJjZWxsRWRpdCIsImNlbGxDcmVhdGUiLCJjZWxsRmlsdGVyIiwiaGVhZGVyIiwiaGFuZGxlU2VsZWN0QWxsQ2hlY2tCb3hPbkNoYW5nZSIsInJvd0l0ZW0iLCJpdGVtSWQiLCJzZWxlY3RlZCIsImhhbmRsZVNlbGVjdGlvbkNoZWNrQm94T25DaGFuZ2UiLCJmb3JFYWNoIiwidmlzaWJsZUNvbHVtbktleSIsIm9yZ0NvbCIsInZhbHVlRW1wdHlDaGVja2VyIiwiZ2V0VmFsdWVFbXB0eUNoZWNrZXIiLCJmb3JtYXQiLCJpc1JlcXVpcmVkIiwiY29sdW1uIiwiYmFzZUNvbHVtbiIsImNvbHVtbkZ1bmN0aW9ucyIsImVkaXQiLCJnZXRJdGVtVmFsdWUiLCJvbkNlbGxWYWx1ZUNoYW5nZSIsIm9uQ2VsbEJsdXIiLCJvbkVkaXRDZWxsQmx1ciIsIm9uQ2VsbEZvY3VzIiwib25FZGl0Q2VsbEtleURvd24iLCJoYW5kbGVDZWxsUmVmIiwiaGFuZGxlRWRpdENlbGxSZWYiLCJvbkNyZWF0ZUNlbGxCbHVyIiwib25DcmVhdGVDZWxsS2V5RG93biIsImhhbmRsZUNyZWF0ZUNlbGxSZWYiLCJmaWx0ZXIiLCJnZXRGaWx0ZXJJdGVtVmFsdWUiLCJnZXRJdGVtTXVsdGlWYWx1ZSIsImdldEZpbHRlckl0ZW1NdWx0aVZhbHVlIiwib25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UiLCJvbkNlbGxNdWx0aVZhbHVlQmx1ciIsIm9uRmlsdGVyQ2VsbE11bHRpVmFsdWVCbHVyIiwib25DZWxsTXVsdGlWYWx1ZUNoYW5nZSIsIm9uRmlsdGVyQ2VsbE11bHRpVmFsdWVDaGFuZ2UiLCJjZWxsUHJvcHMiLCJjb2x1bW5DZWxsIiwiY29tcG9uZW50VHlwZVByb3BzIiwiY29sdW1uQ29tcG9uZW50VHlwZSIsInBhZGRpbmciLCJyZW1vdmVOZXdJdGVtIiwiZm9jdXNUb0Vycm9yQ2VsbCIsInJvd1NlbGVjdCIsImN0cmxLZXkiLCJnZXRTZWxlY3Rpb24iLCJyZW1vdmVBbGxSYW5nZXMiLCJwYXJlbnROb2RlIiwicGFyZW50MWNsYXNzIiwiY2xhc3NOYW1lIiwicGFyZW50MmNsYXNzIiwicGFyZW50M2NsYXNzIiwicGFyZW50NGNsYXNzIiwibXVsdGlTZWxlY3QiLCJvblJvd0NsaWNrIiwic3RvcFByb3BhZ2F0aW9uIiwiY29udGV4dE1lbnVYIiwiY2xpZW50WCIsImNvbnRleHRNZW51WSIsImNsaWVudFkiLCJhZGRFdmVudExpc3RlbmVyIiwib25DbGljayIsInNlbGVjdGVkRGF0YSIsInJvd0hlaWdodEdldHRlciIsImV4aXN0aW5nUm93c0luZGV4IiwiaXNTcGVjaWFsIiwiZ2V0Um93SW5kZXgiLCJtZXNzYWdlRGF0YSIsImdldENlbGxNZXNzYWdlcyIsImlzRWRpdGVkIiwiaXNDZWxsRWRpdGVkIiwic3R5bGUiLCJoYW5kbGVDZWxsU2VsZWN0IiwidGV4dEFsaWduIiwiZ2VuZXJhdGVDb2x1bW5zIiwibGVuZ2h0IiwibWFwIiwic29ydENoYW5nZSIsInJlbmRlckNlbGwiLCJtaW5XaWR0aCIsIm1heFdpZHRoIiwiZmxleEdyb3ciLCJmaXhlZCIsImZpeGVkUmlnaHQiLCJhbGxvd0NlbGxzUmVjeWNsaW5nIiwiZGlzcGxheSIsInpJbmRleCIsInBvc2l0aW9uIiwidG9wIiwibGVmdCIsImQiLCJpdGVtIiwiZGl2aWRlciIsInRpdGxlIiwiaGFuZGxlQ29udGV4dE1lbnVJdGVtQ2xpY2siLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImludmFsaWRhdGUiLCJyZW5kZXIiLCJncmlkQ2xhc3NOYW1lIiwiZGlzYWJsZUFjdGlvbkJhciIsInNldEZvY3VzVG8iLCJhY3Rpb25CYXIiLCJhY3Rpb25CYXJSaWdodCIsImFjdGlvbkJhckxlZnQiLCJyZW1vdmluZyIsImRpc2FibGVEcm9wZG93biIsImRpc2FibGVGaWx0ZXJpbmdDb250cm9scyIsImhhbmRsZUFmdGVyQWRkSXRlbSIsImhhbmRsZUFmdGVyRWRpdFByZXNzIiwiaGFuZGxlQWZ0ZXJWYWxpZGF0aW9uRXJyb3IiLCJkcm9wZG93bk1lbnVJdGVtcyIsImNvbHVtblNldHRpbmdzIiwiZ3JpZEhlYWRlciIsInJvd3NDb3VudCIsImNvbnRhaW5lclN0eWxlIiwicmVuZGVyQ29udGV4dE1lbnUiLCJoZWFkZXJIZWlnaHQiLCJmaWx0ZXJSb3dIZWlnaHQiLCJyb3dIZWlnaHQiLCJvbkNvbHVtblJlc2l6ZUVuZENhbGxiYWNrIiwiaGFuZGxlUm93Q2xpY2siLCJzY3JvbGxUb0NvbHVtbiIsInNjcm9sbFRvcCIsImdldFNjcm9sbFRvUm93Iiwib25Sb3dEb3VibGVDbGljayIsIm9uTW91c2VEb3duIiwib25Sb3dNb3VzZUVudGVyIiwib25Sb3dNb3VzZUxlYXZlIiwib25TY3JvbGxTdGFydCIsIm9uU2Nyb2xsRW5kIiwiZ2V0Um93Q2xhc3NOYW1lIiwiaGFuZGxlUm93SGVpZ2h0R2V0dGVyIiwib25Db250ZW50SGVpZ2h0Q2hhbmdlIiwiaGFuZGxlQ29udGV4dE1lbnUiLCJyZW5kZXJDb2x1bW5zIiwiY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsIiwic2F2ZUNvbHVtblNldHRpbmdzIiwiY2hpbGRyZW4iLCJQdXJlQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTtBQUNBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxTQUFTQyxHQUFULEVBQWNDLElBQWQsUUFBMEIsV0FBMUI7QUFDQSxTQUFTQyxPQUFULFFBQXdCLGFBQXhCO0FBQ0EsU0FBU0MsVUFBVCxFQUFxQkMsZ0JBQWdCLElBQUlDLENBQXpDLFFBQWtELFlBQWxEO0FBQ0EsU0FBU0MsTUFBVCxFQUFpQkMsSUFBakIsUUFBNkIsb0JBQTdCO0FBQ0EsU0FBU0MsUUFBVCxRQUF5QixpQkFBekI7QUFDQSxPQUFPQyxVQUFQLE1BQXVCLFlBQXZCO0FBQ0EsU0FBU0MsSUFBVCxRQUFxQix5QkFBckI7QUFDQSxPQUFPQyxPQUFQLE1BQW9CLDJCQUFwQjtBQUNBLE9BQU9DLFFBQVAsTUFBcUIsNEJBQXJCO0FBQ0EsT0FBTyw4Q0FBUDtBQUVBLE9BQU9DLHdCQUFQLE1BQXFDLHlDQUFyQztBQUNBLE9BQU9DLFVBQVAsTUFBdUIseUJBQXZCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQix3QkFBdEI7QUFDQSxPQUFPQyxrQkFBUCxNQUErQixrQ0FBL0I7QUFDQSxPQUFPQyxpQkFBUCxNQUE4QixnQ0FBOUI7QUFDQSxPQUFPQyxnQkFBUCxNQUE2QiwrQkFBN0I7QUFDQSxPQUFPLEtBQUtDLGVBQVosTUFBaUMsb0JBQWpDO0FBQ0EsT0FBT0MsV0FBUCxNQUF3QiwwQkFBeEI7QUFDQSxPQUFPQyxtQkFBUCxNQUFnQyw2Q0FBaEM7QUFDQSxTQUFTQyxTQUFULEVBQW9CQyxZQUFwQixRQUF3QyxrQkFBeEM7QUFDQSxTQUFTQyxTQUFULFFBQTBCLHNCQUExQjtB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RSxLQUFLK0IsS0FBTCxDQUFXdkMsSUFEbkI7QUFFRSxNQUFBLE9BQU8sRUFBRSxLQUFLdUMsS0FBTCxDQUFXc0IsT0FGdEI7QUFHRSxNQUFBLGNBQWMsRUFBRSxLQUFLdEIsS0FBTCxDQUFXNUIsY0FIN0I7QUFJRSxNQUFBLHdCQUF3QixFQUFFLEtBQUs0QixLQUFMLENBQVc0Uyx3QkFKdkM7QUFLRSxNQUFBLGtCQUFrQixFQUFFLEtBQUs1UyxLQUFMLENBQVc2UztBQUxqQyxNQXRDSixFQThDRyxLQUFLN1MsS0FBTCxDQUFXOFMsUUE5Q2QsQ0FERjtBQWtERCxHOzs7RUFqMkNvQnRYLEtBQUssQ0FBQ3VYLGEsNENBR0wvVixZO0FBaTJDeEIsZUFBZStDLFFBQWYiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBwcmVmZXItZGVzdHJ1Y3R1cmluZyAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tbG9uZWx5LWlmLCBwcmVmZXItdGVtcGxhdGUsIHJlYWN0L3JlcXVpcmUtZGVmYXVsdC1wcm9wcyAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IE1hcCwgTGlzdCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgaW5qZWN0SW50bCwgRm9ybWF0dGVkTWVzc2FnZSBhcyBNIH0gZnJvbSAncmVhY3QtaW50bCc7XG5pbXBvcnQgeyBDb2x1bW4sIENlbGwgfSBmcm9tICdmaXhlZC1kYXRhLXRhYmxlLTInO1xuaW1wb3J0IHsgTWVudUl0ZW0gfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyBJY29uIH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtaWNvbnMnO1xuaW1wb3J0IFNwaW5uZXIgZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3Qtc3Bpbm5lcic7XG5pbXBvcnQgQ2hlY2tib3ggZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtY2hlY2tib3gnO1xuaW1wb3J0ICdmaXhlZC1kYXRhLXRhYmxlLTIvZGlzdC9maXhlZC1kYXRhLXRhYmxlLmNzcyc7XG5cbmltcG9ydCBSZXNwb25zaXZlRml4ZWREYXRhVGFibGUgZnJvbSAnLi9yZXNwb25zaXZlLWZpeGVkLWRhdGEtdGFibGUuY29tcG9uZW50JztcbmltcG9ydCBIZWFkZXJDZWxsIGZyb20gJy4vaGVhZGVyLWNlbGwuY29tcG9uZW50JztcbmltcG9ydCBBY3Rpb25CYXIgZnJvbSAnLi9hY3Rpb24tYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgSW5saW5lRWRpdENvbnRyb2xzIGZyb20gJy4vaW5saW5lLWVkaXQtY29udHJvbHMuY29tcG9uZW50JztcbmltcG9ydCBGaWx0ZXJpbmdDb250cm9scyBmcm9tICcuL2ZpbHRlcmluZy1jb250cm9scy5jb21wb25lbnQnO1xuaW1wb3J0IERyb3Bkb3duQ29udHJvbHMgZnJvbSAnLi9kcm9wZG93bi1jb250cm9scy5jb21wb25lbnQnO1xuaW1wb3J0ICogYXMgZGF0YWdyaWRBY3Rpb25zIGZyb20gJy4vZGF0YWdyaWQuYWN0aW9ucyc7XG5pbXBvcnQgQ2VsbFRvb2x0aXAgZnJvbSAnLi9jZWxsLXRvb2x0aXAuY29tcG9uZW50JztcbmltcG9ydCBDb2x1bW5TZXR0aW5nc01vZGFsIGZyb20gJy4vY29sdW1uLXNldHRpbmdzL2NvbHVtbi1zZXR0aW5ncy5jb21wb25lbnQnO1xuaW1wb3J0IHsgcHJvcFR5cGVzLCBkZWZhdWx0UHJvcHMgfSBmcm9tICcuL2RhdGFncmlkLnByb3BzJztcbmltcG9ydCB7IEtFWV9DT0RFUyB9IGZyb20gJy4vZGF0YWdyaWQuY29uc3RhbnRzJztcbmltcG9ydCBwYWdpbmF0aW9uIGZyb20gJy4vcGFnaW5hdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4vZGF0YWdyaWQudXRpbHMnO1xuaW1wb3J0IEdyaWRDb2x1bW5TZXJ2aWNlIGZyb20gJy4vY29sdW1uLXNlcnZpY2UvY29sdW1uLXNlcnZpY2UnO1xuaW1wb3J0ICcuL2RhdGFncmlkLmNvbXBvbmVudC5zY3NzJztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlLCBvd25Qcm9wcykgPT4ge1xuICBjb25zdCBHUklEID0gb3duUHJvcHMuZ3JpZDtcbiAgcmV0dXJuIHtcbiAgICBpc0J1c3k6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdpc0J1c3knXSwgdHJ1ZSksXG4gICAgaXNFZGl0aW5nOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnaXNFZGl0aW5nJ10sIGZhbHNlKSxcbiAgICBpc0NyZWF0aW5nOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnaXNDcmVhdGluZyddLCBmYWxzZSksXG4gICAgaXNGaWx0ZXJpbmc6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnaXNGaWx0ZXJpbmcnXSwgZmFsc2UpLFxuICAgIGlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW46IHN0YXRlLmRhdGFncmlkLmdldEluKFxuICAgICAgW0dSSUQuaWQsICdzZXNzaW9uJywgJ2NvbHVtblNldHRpbmdzTW9kYWwnLCAnb3BlbiddLFxuICAgICAgZmFsc2UsXG4gICAgKSxcbiAgICBzb3J0Q29sdW1uOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdzb3J0aW5nRGF0YScsICdzb3J0Q29sdW1uJ10sIG51bGwpLFxuICAgIHNvcnRPcmRlcjogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnc29ydGluZ0RhdGEnLCAnc29ydE9yZGVyJ10sIG51bGwpLFxuICAgIHZpc2libGVDb2x1bW5zOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICd2aXNpYmxlQ29sdW1ucyddLCBMaXN0KCkpLFxuICAgIGNvbHVtbldpZHRoczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnY29sdW1uV2lkdGhzJ10sIE1hcCgpKSxcbiAgICBzZWxlY3RlZENlbGw6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2VsZWN0ZWRDZWxsJ10sIE1hcCgpKSxcbiAgICBzZWxlY3RlZEl0ZW1zOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3NlbGVjdGVkSXRlbXMnXSwgTGlzdCgpKSxcbiAgICBkYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2RhdGEnXSwgTGlzdCgpKSxcbiAgICBlZGl0RGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdlZGl0RGF0YSddLCBNYXAoKSksXG4gICAgY3JlYXRlRGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjcmVhdGVEYXRhJ10sIExpc3QoKSksXG4gICAgZmlsdGVyRGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdmaWx0ZXJEYXRhJ10sIE1hcCgpKSxcbiAgICBjZWxsTWVzc2FnZXM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY2VsbE1lc3NhZ2VzJ10sIE1hcCgpKSxcbiAgICBjcmVhdGVDZWxsTWVzc2FnZXM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY3JlYXRlQ2VsbE1lc3NhZ2VzJ10sIE1hcCgpKSxcbiAgICBhbGxEYXRhU2l6ZTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdhbGxEYXRhJ10sIExpc3QoKSkuc2l6ZSxcbiAgICBsYW5ndWFnZTogVXRpbHMuZ2V0TGFuZ3VhZ2UoR1JJRCwgc3RhdGUudXNlciksXG4gICAgcmVnaW9uOiBVdGlscy5nZXRSZWdpb24oR1JJRCwgc3RhdGUudXNlciksXG4gICAgZGF0ZUZvcm1hdDogVXRpbHMuZ2V0RGF0ZUZvcm1hdChHUklELCBzdGF0ZS51c2VyKSxcbiAgICB0aG91c2FuZFNlcGFyYXRvcjogVXRpbHMuZ2V0VGhvdXNhbmRTZXBhcmF0b3IoR1JJRCwgc3RhdGUudXNlciksXG4gICAgZGVjaW1hbFNlcGFyYXRvcjogVXRpbHMuZ2V0RGVjaW1hbFNlcGFyYXRvcihHUklELCBzdGF0ZS51c2VyKSxcbiAgICBmb3JjZVJlZnJlc2hUaW1lc3RhbXA6IHN0YXRlLmRhdGFncmlkLmdldCgnZm9yY2VSZWZyZXNoJywgMCksIC8vIGZvcmNlIHJlLXJlbmRlciB3aGVuIGNoYW5nZWRcbiAgICBmb2N1c1R5cGU6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdmb2N1c1R5cGUnXSwgTWFwKCkpLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGF0YWdyaWRBY3Rpb25zO1xuXG5AcGFnaW5hdGlvblxuQGluamVjdEludGxcbkBjb25uZWN0KFxuICBtYXBTdGF0ZVRvUHJvcHMsXG4gIG1hcERpc3BhdGNoVG9Qcm9wcyxcbilcbmNsYXNzIERhdGFHcmlkIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSBwcm9wVHlwZXM7XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY3VycmVudFJvdzogMCxcbiAgICAgIGN1cnJlbnRDb2x1bW46IDAsXG4gICAgICBjb250ZXh0TWVudU9wZW46IGZhbHNlLFxuICAgICAgY29udGV4dE1lbnVYOiBudWxsLFxuICAgICAgY29udGV4dE1lbnVZOiBudWxsLFxuICAgIH07XG4gICAgdGhpcy5jZWxsUmVmcyA9IHt9O1xuICAgIHRoaXMuY3JlYXRlQ2VsbFJlZnMgPSB7fTtcbiAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsID0gZmFsc2U7XG4gICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTsgLy8gVE9ETzogSGFuZGxlIGZvY3VzaW5nIHdoZW4gdHJ1ZVxuICAgIHRoaXMuZm9jdXNUb0Vycm9yQ2VsbCA9IGZhbHNlOyAvLyBUT0RPOiBIYW5kbGUgZm9jdXNpbmcgd2hlbiB0cnVlXG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25Eb2N1bWVudENsaWNrKTtcbiAgICB0aGlzLnByb3BzLmludmFsaWRhdGUodGhpcy5wcm9wcy5ncmlkKTtcbiAgfVxuXG4gIG9uRG9jdW1lbnRDbGljayA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5jb250ZXh0TWVudUl0ZW1zKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY29udGV4dE1lbnVPcGVuOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25Eb2N1bWVudENsaWNrKTtcbiAgfTtcblxuICBvbkNvbHVtblJlc2l6ZUVuZENhbGxiYWNrID0gKG5ld0NvbHVtbldpZHRoLCBjb2x1bW5LZXkpID0+IHtcbiAgICB0aGlzLnByb3BzLnJlc2l6ZUNvbHVtbih0aGlzLnByb3BzLmdyaWQsIGNvbHVtbktleSwgbmV3Q29sdW1uV2lkdGgpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gcm93SW5kZXggKGludClcbiAgICogQHBhcmFtIGNvbCAob2JqKS4gQ29sdW1uIG9iamVjdC5cbiAgICogQHBhcmFtIGUuIE9yaWdpbmFsIEtleURvd24gZXZlbnRcbiAgICogQHBhcmFtIGNyZWF0ZSAoYm9vbCkuIElzIHRoZSBjZWxsIGNyZWF0ZSBjZWxsIG9yIGVkaXQgY2VsbD9cbiAgICovXG4gIG9uQ2VsbEtleURvd24gPSAocm93SW5kZXgsIGNvbCwgZSwgY3JlYXRlID0gZmFsc2UpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5lbmFibGVBcnJvd05hdmlnYXRpb24pIHtcbiAgICAgIGNvbnN0IGNlbGxSZWZzID0gY3JlYXRlID8gdGhpcy5jcmVhdGVDZWxsUmVmcyA6IHRoaXMuY2VsbFJlZnM7XG4gICAgICBjb25zdCBhcnJvd0tleXMgPSBbS0VZX0NPREVTLkRPV04sIEtFWV9DT0RFUy5VUCwgS0VZX0NPREVTLkxFRlQsIEtFWV9DT0RFUy5SSUdIVF07XG4gICAgICBjb25zdCB7XG4gICAgICAgIGNvbHVtbnMsIHZpc2libGVDb2x1bW5zLCBncmlkLCBkYXRhLCBvbkxhc3RDZWxsVGFiUHJlc3MsXG4gICAgICB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IGdyaWRDb2x1bW5zID0gVXRpbHMudmlzaWJsZUNvbHVtbnMoY29sdW1ucywgdmlzaWJsZUNvbHVtbnMpO1xuICAgICAgY29uc3QgZ2V0Q29sdW1uS2V5QnlJbmRleCA9IGkgPT4gVXRpbHMuZ2V0Q29sdW1uS2V5KGdyaWRDb2x1bW5zW2ldKTtcbiAgICAgIGNvbnN0IHJvd3NTaXplID0gZGF0YS5zaXplO1xuICAgICAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCk7XG4gICAgICBsZXQgY3VycmVudENlbGwgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2NvbHVtbktleX1fJHtyb3dJbmRleH1gXTtcbiAgICAgIGxldCBwcm94eSA9IG51bGw7XG5cbiAgICAgIGNvbnN0IGlzQ3Vyc29yQXRTdGFydCA9ICgpID0+IHtcbiAgICAgICAgaWYgKGN1cnJlbnRDZWxsLnR5cGUgIT09ICd0ZXh0JykgcmV0dXJuIHRydWU7XG4gICAgICAgIHJldHVybiBjdXJyZW50Q2VsbC5zZWxlY3Rpb25TdGFydCA9PT0gMDtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGlzQ3Vyc29yQXRFbmQgPSAoKSA9PiB7XG4gICAgICAgIGlmIChjdXJyZW50Q2VsbC50eXBlICE9PSAndGV4dCcpIHJldHVybiB0cnVlO1xuICAgICAgICByZXR1cm4gY3VycmVudENlbGwuc2VsZWN0aW9uRW5kID09PSBjdXJyZW50Q2VsbC52YWx1ZS5sZW5ndGg7XG4gICAgICB9O1xuXG4gICAgICAvLyBJZiBjdXJyZW50IGNlbGwgaG9sZHMgYSByZWFjdC1mbG9hdGluZy1zZWxlY3QgY29tcG9uZW50XG4gICAgICBpZiAoY3VycmVudENlbGwgJiYgKGN1cnJlbnRDZWxsLnNlbGVjdFJlZiB8fCB0eXBlb2YgY3VycmVudENlbGwuc2VsZWN0ID09PSAnb2JqZWN0JykpIHtcbiAgICAgICAgcHJveHkgPSBjdXJyZW50Q2VsbDtcbiAgICAgICAgY3VycmVudENlbGwgPSB0aGlzLmdldFNlbGVjdFJlZihwcm94eSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFByZXZlbnRzIHVwL2Rvd24gYXJyb3cgZnJvbSBjaGFuZ2luZyBudW1iZXIgZmllbGQgdmFsdWVcbiAgICAgIGlmIChhcnJvd0tleXMuaW5jbHVkZXMoZS5rZXlDb2RlKSAmJiBjdXJyZW50Q2VsbC50eXBlID09PSAnbnVtYmVyJykgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuRU5URVI6XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLkVTQzoge1xuICAgICAgICAgIGlmIChjcmVhdGUgJiYgZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuRU5URVIpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuYWRkTmV3SXRlbShncmlkLCBVdGlscy5nZXRDb2x1bW5EZWZhdWx0VmFsdWVzKGNvbHVtbnMpKTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGN1cnJlbnRDZWxsLnNlbGVjdCgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLkRPV046IHtcbiAgICAgICAgICBsZXQgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2NvbHVtbktleX1fJHtyb3dJbmRleCArIDF9YF07XG5cbiAgICAgICAgICAvLyBQcmV2ZW50cyBtZW51IGZyb20gb3BlbmluZ1xuICAgICAgICAgIGlmIChwcm94eSAmJiBwcm94eS5zZWxlY3RSZWYgJiYgIXByb3h5LnNlbGVjdFJlZi5zdGF0ZS5tZW51SXNPcGVuKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAoIW5leHRFbGVtZW50KSBicmVhaztcbiAgICAgICAgICAgIG5leHRFbGVtZW50ID0gdGhpcy5nZXRTZWxlY3RSZWYobmV4dEVsZW1lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm1vdmVDZWxsRm9jdXMobmV4dEVsZW1lbnQsIHJvd0luZGV4ICsgMSwgLTEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLlVQOiB7XG4gICAgICAgICAgbGV0IG5leHRFbGVtZW50ID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtjb2x1bW5LZXl9XyR7cm93SW5kZXggLSAxfWBdO1xuXG4gICAgICAgICAgLy8gUHJldmVudHMgbWVudSBmcm9tIG9wZW5pbmdcbiAgICAgICAgICBpZiAocHJveHkgJiYgcHJveHkuc2VsZWN0UmVmICYmICFwcm94eS5zZWxlY3RSZWYuc3RhdGUubWVudUlzT3Blbikge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKCFuZXh0RWxlbWVudCkgYnJlYWs7XG4gICAgICAgICAgICBuZXh0RWxlbWVudCA9IHRoaXMuZ2V0U2VsZWN0UmVmKG5leHRFbGVtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5tb3ZlQ2VsbEZvY3VzKG5leHRFbGVtZW50LCByb3dJbmRleCAtIDEsIC0xKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5UQUI6XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLlJJR0hUOlxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5MRUZUOiB7XG4gICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLlJJR0hUICYmICFpc0N1cnNvckF0RW5kKCkpIGJyZWFrO1xuICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5MRUZUICYmICFpc0N1cnNvckF0U3RhcnQoKSkgYnJlYWs7XG5cbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICBsZXQgY29sdW1uSW5kID0gZ3JpZENvbHVtbnMuZmluZEluZGV4KGMgPT4gYy52YWx1ZUtleVBhdGguam9pbignLycpID09PSBjb2x1bW5LZXkpO1xuICAgICAgICAgIGlmIChjb2x1bW5JbmQgIT09IC0xKSB7XG4gICAgICAgICAgICBsZXQgZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgbGV0IG5leHRFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIGxldCByb3dJbmQgPSByb3dJbmRleDtcbiAgICAgICAgICAgIHdoaWxlIChkaXNhYmxlZCkge1xuICAgICAgICAgICAgICAvLyBNb3ZpbmcgdG8gdGhlIGxlZnRcbiAgICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLkxFRlQgfHwgKGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLlRBQiAmJiBlLnNoaWZ0S2V5KSkge1xuICAgICAgICAgICAgICAgIGlmIChjb2x1bW5JbmQgLSAxID49IDApIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCAtPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm93SW5kIC0gMSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgPSBncmlkQ29sdW1ucy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgICAgcm93SW5kIC09IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBNb3ZpbmcgdG8gdGhlIHJpZ2h0XG4gICAgICAgICAgICAgICAgaWYgKGNvbHVtbkluZCArIDEgPCBncmlkQ29sdW1ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCArPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm93SW5kICsgMSA8IHJvd3NTaXplKSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgPSAwO1xuICAgICAgICAgICAgICAgICAgcm93SW5kICs9IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyb3dJbmQgKyAxID09PSByb3dzU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgLy8gSWYgdHJ5aW5nIHRvIHNlbGVjdCBhIHJvdywgd2hlbiB0aGVyZSBpcyBub25lOlxuICAgICAgICAgICAgICAgICAgaWYgKG9uTGFzdENlbGxUYWJQcmVzcyAmJiBlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5UQUIpIG9uTGFzdENlbGxUYWJQcmVzcyhlKTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIG5leHRFbGVtZW50ID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtnZXRDb2x1bW5LZXlCeUluZGV4KGNvbHVtbkluZCl9XyR7cm93SW5kfWBdO1xuXG4gICAgICAgICAgICAgIC8vIElmIHdlIGNhbm5vdCBmb2N1cyBvbiB0aGUgbmV4dCBlbGVtZW50IHdoaWxlIG1vdmluZyB0byB0aGUgcmlnaHRcbiAgICAgICAgICAgICAgaWYgKCFuZXh0RWxlbWVudCAmJiBlLmtleUNvZGUgIT09IEtFWV9DT0RFUy5MRUZUKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgd2UncmUgbm90IHlldCBpbiB0aGUgbGFzdCBmb2N1c2FibGUgY29sdW1uXG4gICAgICAgICAgICAgICAgaWYgKGNvbHVtbkluZCA8PSBncmlkQ29sdW1ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgIHdoaWxlIChjb2x1bW5JbmQgPD0gZ3JpZENvbHVtbnMubGVuZ3RoICYmICFuZXh0RWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Z2V0Q29sdW1uS2V5QnlJbmRleChjb2x1bW5JbmQpfV8ke3Jvd0luZH1gXTtcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uSW5kICs9IDE7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UgYXJlIGluIHRoZSBsYXN0IGNvbHVtbiBhbmQgd2UgZG9uJ3QgaGF2ZSBhbiBlbGVtZW50IHRvIGZvY3VzIG9uLFxuICAgICAgICAgICAgICAgICAgICAvLyB3ZSBtdXN0IG1vdmUgdG8gdGhlIG5leHQgcm93IChpZiBwb3NzaWJsZSlcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFuZXh0RWxlbWVudCAmJiBjb2x1bW5JbmQgPT09IGdyaWRDb2x1bW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHRyeWluZyB0byBzZWxlY3QgYSByb3csIHdoZW4gdGhlcmUgaXMgbm9uZTpcbiAgICAgICAgICAgICAgICAgICAgICBpZiAocm93SW5kICsgMSA9PT0gcm93c1NpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbkxhc3RDZWxsVGFiUHJlc3MgJiYgZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuVEFCKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uTGFzdENlbGxUYWJQcmVzcyhlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgcm93SW5kICs9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2dldENvbHVtbktleUJ5SW5kZXgoY29sdW1uSW5kKX1fJHtyb3dJbmR9YF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgY2Fubm90IGZvY3VzIG9uIHRoZSBuZXh0IGVsZW1lbnQgd2hpbGUgbW92aW5nIHRvIHRoZSBsZWZ0XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoIW5leHRFbGVtZW50ICYmIGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLkxFRlQpIHtcbiAgICAgICAgICAgICAgICB3aGlsZSAoY29sdW1uSW5kID4gMCAmJiAhbmV4dEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCAtPSAxO1xuICAgICAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2dldENvbHVtbktleUJ5SW5kZXgoY29sdW1uSW5kKX1fJHtyb3dJbmR9YF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGlmIG5vIGVsZW1lbnQgd2FzIGZvdW5kLCB0cnkgbW92aW5nIHRvIHByZXZpb3VzIHJvd1xuICAgICAgICAgICAgICAgIC8vIChuZWVkZWQgaW4gY2FzZSBmaXJzdCBjb2x1bW4gaXMgbm90IGVkaXRhYmxlIGUuZy4gYW4gRXh0cmFDb2x1bW4pXG4gICAgICAgICAgICAgICAgaWYgKHJvd0luZCA+IDAgJiYgIW5leHRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgPSBncmlkQ29sdW1ucy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgICAgcm93SW5kIC09IDE7XG4gICAgICAgICAgICAgICAgICBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Z2V0Q29sdW1uS2V5QnlJbmRleChjb2x1bW5JbmQpfV8ke3Jvd0luZH1gXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZGlzYWJsZWQgPSBuZXh0RWxlbWVudCA/IG5leHRFbGVtZW50LmRpc2FibGVkIDogZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWRpc2FibGVkICYmIG5leHRFbGVtZW50KSB7XG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgbmV4dEVsZW1lbnQuc2VsZWN0ID09PSAnb2JqZWN0JyB8fCBuZXh0RWxlbWVudC5zZWxlY3RSZWYpIHtcbiAgICAgICAgICAgICAgICBuZXh0RWxlbWVudCA9IHRoaXMuZ2V0U2VsZWN0UmVmKG5leHRFbGVtZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGlzLm1vdmVDZWxsRm9jdXMobmV4dEVsZW1lbnQsIHJvd0luZCwgY29sdW1uSW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgb25FZGl0Q2VsbEtleURvd24gPSAocm93SW5kZXgsIGNvbCkgPT4gKGUpID0+IHtcbiAgICB0aGlzLm9uQ2VsbEtleURvd24ocm93SW5kZXgsIGNvbCwgZSk7XG4gIH07XG5cbiAgb25DcmVhdGVDZWxsS2V5RG93biA9IChyb3dJbmRleCwgY29sKSA9PiAoZSkgPT4ge1xuICAgIHRoaXMub25DZWxsS2V5RG93bihyb3dJbmRleCwgY29sLCBlLCB0cnVlKTtcbiAgfTtcblxuICBvbkZpbHRlckNlbGxWYWx1ZUNoYW5nZSA9IChjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZXZlbnRPckRhdGEpID0+IHtcbiAgICBsZXQgcmF3VmFsdWU7XG4gICAgLy8gZXZlbnRPckRhdGEgY2FuIGJlIGlucHV0IG9uQ2hhbmdlIGV2ZW50LCByZWFjdC1zZWxlY3Qgb25DaGFuZ2Ugb3IgcmVhY3QtZGF5LXBpY2tlciBvbkNoYW5nZVxuICAgIGlmIChldmVudE9yRGF0YSkge1xuICAgICAgaWYgKGV2ZW50T3JEYXRhLnRhcmdldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChldmVudE9yRGF0YS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCB2YWx1ZSA9IHZhbHVlUGFyc2VyKHJhd1ZhbHVlKTtcbiAgICB0aGlzLnByb3BzLmZpbHRlckNlbGxWYWx1ZUNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIHRoaXMucHJvcHMuY29sdW1ucywgY29sLCB2YWx1ZSk7XG4gIH07XG5cbiAgb25GaWx0ZXJDZWxsTXVsdGlWYWx1ZUJsdXIgPSBjb2wgPT4gKCkgPT4ge1xuICAgIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2wpO1xuICAgIGNvbnN0IHsgY29sdW1ucywgZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlLCBncmlkIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNlbGVjdGVkRmlsdGVycyA9IHRoaXMuc3RhdGVbY29sdW1uS2V5XTtcbiAgICBpZiAoc2VsZWN0ZWRGaWx0ZXJzKSB7XG4gICAgICBmaWx0ZXJDZWxsVmFsdWVDaGFuZ2UoZ3JpZCwgY29sdW1ucywgY29sLCBzZWxlY3RlZEZpbHRlcnMpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IFtjb2x1bW5LZXldOiB1bmRlZmluZWQgfSk7XG4gICAgfVxuICB9O1xuXG4gIG9uRmlsdGVyQ2VsbE11bHRpVmFsdWVDaGFuZ2UgPSAoY29sLCB2YWx1ZVBhcnNlcikgPT4gKGRhdGEgPSBbXSkgPT4ge1xuICAgIC8vIGRhdGEgaXMgaW5wdXQgb2YgcmVhY3Qtc2VsZWN0IG9uQ2hhbmdlXG4gICAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCk7XG4gICAgY29uc3Qgc2VsZWN0ZWRGaWx0ZXJzID0gdGhpcy5zdGF0ZVtjb2x1bW5LZXldO1xuICAgIGlmICghc2VsZWN0ZWRGaWx0ZXJzICYmIGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAvLyBlbmRzIHVwIGhlcmUgaW4gY2FzZSBvZiBjbGVhciBidXR0b25cbiAgICAgIGNvbnN0IHsgY29sdW1ucywgZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlLCBncmlkIH0gPSB0aGlzLnByb3BzO1xuICAgICAgZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlKGdyaWQsIGNvbHVtbnMsIGNvbCwgZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdmFsdWVQYXJzZXIoZGF0YSk7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgW2NvbHVtbktleV06IHZhbHVlIH0pO1xuICAgIH1cbiAgfTtcblxuICBvbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGV2ZW50T3JEYXRhKSA9PiB7XG4gICAgY29uc3QgeyBjcmVhdGVDZWxsVmFsdWVDaGFuZ2UsIGdyaWQgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IHJhd1ZhbHVlO1xuICAgIC8vIGV2ZW50T3JEYXRhIGNhbiBiZSBpbnB1dCBvbkNoYW5nZSBldmVudCwgcmVhY3Qtc2VsZWN0IG9uQ2hhbmdlIG9yIHJlYWN0LWRheS1waWNrZXIgb25DaGFuZ2VcbiAgICBpZiAoZXZlbnRPckRhdGEpIHtcbiAgICAgIGlmIChldmVudE9yRGF0YS50YXJnZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnRPckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSB2YWx1ZVBhcnNlcihyYXdWYWx1ZSk7XG5cbiAgICBjb25zdCB7IGNvbXBvbmVudFR5cGUgfSA9IGNvbDtcbiAgICBzd2l0Y2ggKGNvbXBvbmVudFR5cGUpIHtcbiAgICAgIGNhc2UgJ2N1cnJlbmN5JzpcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICd0ZXh0Jzoge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlKGdyaWQsIHJvd0luZGV4LCBjb2wudmFsdWVLZXlQYXRoLCB2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY29sLm9uQ3JlYXRlVmFsdWVDaGFuZ2UpIHtcbiAgICAgIGNvbC5vbkNyZWF0ZVZhbHVlQ2hhbmdlKHZhbHVlLCBjb2wudmFsdWVLZXlQYXRoLCByb3dJbmRleCk7XG4gICAgfVxuICAgIGlmIChjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUgJiYgdmFsdWUgPT09IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5tYXRjaFZhbHVlKSB7XG4gICAgICAvLyBDYWxsIHNwZWNpYWwgcGFpcmVkIHZhbHVlIGNoYW5nZSBvbiBvdGhlciBjZWxsIGlmIHZhbHVlIG1hdGNoZXNcbiAgICAgIHRoaXMub25DcmVhdGVDZWxsVmFsdWVDaGFuZ2UoXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICB7IHZhbHVlS2V5UGF0aDogY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm5ld1ZhbHVlS2V5UGF0aCB9LFxuICAgICAgICB2ID0+IHYsXG4gICAgICApKGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5uZXdWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjb2wudmFsaWRhdG9ycykge1xuICAgICAgdGhpcy5wcm9wcy5jcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZShcbiAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgY29sLnZhbHVlS2V5UGF0aCxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIGNvbC52YWxpZGF0b3JzLFxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgb25FZGl0Q2VsbFZhbHVlQ2hhbmdlID0gKHJvd0luZGV4LCBjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZXZlbnRPckRhdGEpID0+IHtcbiAgICBjb25zdCB7IGVkaXRDZWxsVmFsdWVDaGFuZ2UsIGdyaWQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgZGF0YUlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICBsZXQgcmF3VmFsdWU7XG4gICAgLy8gZXZlbnRPckRhdGEgY2FuIGJlIGlucHV0IG9uQ2hhbmdlIGV2ZW50LCByZWFjdC1zZWxlY3Qgb25DaGFuZ2Ugb3IgcmVhY3QtZGF5LXBpY2tlciBvbkNoYW5nZVxuICAgIGlmIChldmVudE9yRGF0YSkge1xuICAgICAgaWYgKGV2ZW50T3JEYXRhLnRhcmdldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChldmVudE9yRGF0YS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCB2YWx1ZSA9IHZhbHVlUGFyc2VyKHJhd1ZhbHVlKTtcbiAgICBjb25zdCB7IGNvbXBvbmVudFR5cGUgfSA9IGNvbDtcbiAgICBzd2l0Y2ggKGNvbXBvbmVudFR5cGUpIHtcbiAgICAgIGNhc2UgJ2N1cnJlbmN5JzpcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICd0ZXh0Jzoge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgZWRpdENlbGxWYWx1ZUNoYW5nZShncmlkLCBkYXRhSWQsIGNvbC52YWx1ZUtleVBhdGgsIHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChjb2wub25FZGl0VmFsdWVDaGFuZ2UpIHtcbiAgICAgIGNvbC5vbkVkaXRWYWx1ZUNoYW5nZSh2YWx1ZSwgY29sLnZhbHVlS2V5UGF0aCwgcm93SW5kZXgsIGRhdGFJZCk7XG4gICAgfVxuICAgIGlmIChjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUgJiYgdmFsdWUgPT09IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5tYXRjaFZhbHVlKSB7XG4gICAgICAvLyBDYWxsIHNwZWNpYWwgcGFpcmVkIHZhbHVlIGNoYW5nZSBvbiBvdGhlciBjZWxsIGlmIHZhbHVlIG1hdGNoZXNcbiAgICAgIHRoaXMub25FZGl0Q2VsbFZhbHVlQ2hhbmdlKFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgeyB2YWx1ZUtleVBhdGg6IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5uZXdWYWx1ZUtleVBhdGggfSxcbiAgICAgICAgdiA9PiB2LFxuICAgICAgKShjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY29sLnZhbGlkYXRvcnMpIHtcbiAgICAgIHRoaXMucHJvcHMuZWRpdENlbGxWYWx1ZVZhbGlkYXRlKFxuICAgICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICAgIGRhdGFJZCxcbiAgICAgICAgY29sLnZhbHVlS2V5UGF0aCxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIGNvbC52YWxpZGF0b3JzLFxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgZ2V0UmVnRXggPSBzZXBhcmF0b3IgPT4gKHNlcGFyYXRvciA/IG5ldyBSZWdFeHAoYFxcXFwke3NlcGFyYXRvcn1gLCAnZycpIDogbmV3IFJlZ0V4cCgnXFxcXHMnLCAnZycpKTtcblxuICBvbkNyZWF0ZUNlbGxCbHVyID0gKHJvd0luZGV4LCBjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZXZlbnRPckRhdGEpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBkZWNpbWFsU2VwYXJhdG9yLCBjcmVhdGVDZWxsVmFsdWVDaGFuZ2UsIGdyaWQsIHRob3VzYW5kU2VwYXJhdG9yLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgY29tcG9uZW50VHlwZSB9ID0gY29sO1xuICAgIGxldCB2YWx1ZTtcbiAgICAvLyBldmVudE9yRGF0YSBjYW4gYmUgZm9ybWF0dGVkLWlucHV0LCByZWFjdC1zZWxlY3QsIHJlYWN0LWNoZWNrYm94IG9yIHJlYWN0LWRheS1waWNrZXJcbiAgICAvLyBvbkNoYW5nZSBldmVudFxuICAgIGlmIChldmVudE9yRGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoZXZlbnRPckRhdGEgJiYgZXZlbnRPckRhdGEudGFyZ2V0ICYmIGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlID0gZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChldmVudE9yRGF0YS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlID0gZXZlbnRPckRhdGEudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IGV2ZW50T3JEYXRhO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSA9IHRoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKTtcbiAgICB9XG4gICAgc3dpdGNoIChjb21wb25lbnRUeXBlKSB7XG4gICAgICBjYXNlICdjdXJyZW5jeSc6IHtcbiAgICAgICAgY29uc3QgbnVtZXJpY1ZhbHVlID0gdmFsdWVcbiAgICAgICAgICA/IE51bWJlcih2YWx1ZS5yZXBsYWNlKHRoaXMuZ2V0UmVnRXgoKGNvbC52YWx1ZU9wdGlvbnMgJiYgY29sLnZhbHVlT3B0aW9ucy50aG91c2FuZFNlcGFyYXRvcikgfHwgdGhvdXNhbmRTZXBhcmF0b3IpLCAnJylcbiAgICAgICAgICAgIC5yZXBsYWNlKHRoaXMuZ2V0UmVnRXgoKGNvbC52YWx1ZU9wdGlvbnMgJiYgY29sLnZhbHVlT3B0aW9ucy5kZWNpbWFsU2VwYXJhdG9yKSB8fCBkZWNpbWFsU2VwYXJhdG9yKSwgJy4nKSlcbiAgICAgICAgICA6IHZhbHVlO1xuICAgICAgICBpZiAobnVtZXJpY1ZhbHVlICE9PSB0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCkpIHtcbiAgICAgICAgICBjcmVhdGVDZWxsVmFsdWVDaGFuZ2UoZ3JpZCwgcm93SW5kZXgsIGNvbC52YWx1ZUtleVBhdGgsIG51bWVyaWNWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAndGV4dCc6IHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCkpIHtcbiAgICAgICAgICBjcmVhdGVDZWxsVmFsdWVDaGFuZ2UoZ3JpZCwgcm93SW5kZXgsIGNvbC52YWx1ZUtleVBhdGgsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNvbC5vbkNyZWF0ZUJsdXIpIHtcbiAgICAgIGlmICh2YWx1ZVBhcnNlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWVQYXJzZXIodmFsdWUpO1xuICAgICAgfVxuICAgICAgY29sLm9uQ3JlYXRlQmx1cih2YWx1ZSwgcm93SW5kZXgpO1xuICAgIH1cbiAgfTtcblxuICBvbkVkaXRDZWxsQmx1ciA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGV2ZW50T3JEYXRhKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGVjaW1hbFNlcGFyYXRvciwgZWRpdENlbGxWYWx1ZUNoYW5nZSwgZ3JpZCwgdGhvdXNhbmRTZXBhcmF0b3IsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBjb21wb25lbnRUeXBlIH0gPSBjb2w7XG4gICAgY29uc3QgZGF0YUlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICBsZXQgdmFsdWU7XG4gICAgLy8gZXZlbnRPckRhdGEgY2FuIGJlIGZvcm1hdHRlZC1pbnB1dCwgcmVhY3Qtc2VsZWN0LCByZWFjdC1jaGVja2JveCBvciByZWFjdC1kYXktcGlja2VyXG4gICAgLy8gb25DaGFuZ2UgZXZlbnRcbiAgICBpZiAoZXZlbnRPckRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGV2ZW50T3JEYXRhICYmIGV2ZW50T3JEYXRhLnRhcmdldCAmJiBldmVudE9yRGF0YS50YXJnZXQudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YWx1ZSA9IGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnRPckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YWx1ZSA9IGV2ZW50T3JEYXRhLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBldmVudE9yRGF0YTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgPSB0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCk7XG4gICAgfVxuICAgIHN3aXRjaCAoY29tcG9uZW50VHlwZSkge1xuICAgICAgY2FzZSAnY3VycmVuY3knOiB7XG4gICAgICAgIGNvbnN0IG51bWVyaWNWYWx1ZSA9IHZhbHVlXG4gICAgICAgICAgPyBOdW1iZXIodmFsdWUucmVwbGFjZSh0aGlzLmdldFJlZ0V4KChjb2wudmFsdWVPcHRpb25zICYmIGNvbC52YWx1ZU9wdGlvbnMudGhvdXNhbmRTZXBhcmF0b3IpIHx8IHRob3VzYW5kU2VwYXJhdG9yKSwgJycpXG4gICAgICAgICAgICAucmVwbGFjZSh0aGlzLmdldFJlZ0V4KChjb2wudmFsdWVPcHRpb25zICYmIGNvbC52YWx1ZU9wdGlvbnMuZGVjaW1hbFNlcGFyYXRvcikgfHwgZGVjaW1hbFNlcGFyYXRvciksICcuJykpXG4gICAgICAgICAgOiB2YWx1ZTtcbiAgICAgICAgaWYgKG51bWVyaWNWYWx1ZSAhPT0gdGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpKSB7XG4gICAgICAgICAgZWRpdENlbGxWYWx1ZUNoYW5nZShncmlkLCBkYXRhSWQsIGNvbC52YWx1ZUtleVBhdGgsIG51bWVyaWNWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAndGV4dCc6IHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCkpIHtcbiAgICAgICAgICBlZGl0Q2VsbFZhbHVlQ2hhbmdlKGdyaWQsIGRhdGFJZCwgY29sLnZhbHVlS2V5UGF0aCwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29sLm9uRWRpdEJsdXIpIHtcbiAgICAgIGlmICh2YWx1ZVBhcnNlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWVQYXJzZXIodmFsdWUpO1xuICAgICAgfVxuICAgICAgY29sLm9uRWRpdEJsdXIodmFsdWUsIHJvd0luZGV4LCBkYXRhSWQpO1xuICAgIH1cbiAgfTtcblxuICBvbkNlbGxGb2N1cyA9IChjZWxsVHlwZSwgaW5wdXRUeXBlLCByb3dJbmRleCwgY29sdW1uS2V5KSA9PiAoZSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGNlbGxTZWxlY3Rpb25DaGFuZ2UsIGNlbGxTZWxlY3QsIGdyaWQsIGlzRWRpdGluZyxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoaXNFZGl0aW5nKSByZXR1cm47XG5cbiAgICBpZiAoaW5wdXRUeXBlID09PSAnbnVtYmVyJykge1xuICAgICAgZS50YXJnZXQuc2VsZWN0KCk7XG4gICAgfVxuICAgIGlmIChjZWxsVHlwZSA9PT0gJ2VkaXQnICYmIGNlbGxTZWxlY3QpIHtcbiAgICAgIGNlbGxTZWxlY3Rpb25DaGFuZ2UoXG4gICAgICAgIGdyaWQsXG4gICAgICAgIE1hcCh7XG4gICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgY29sdW1uS2V5LFxuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIGdldFNlbGVjdFJlZiA9IChjb21wb25lbnQpID0+IHtcbiAgICBpZiAoIWNvbXBvbmVudCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKGNvbXBvbmVudC5zZWxlY3QgJiYgY29tcG9uZW50LnNlbGVjdC5pbnB1dFJlZikge1xuICAgICAgcmV0dXJuIGNvbXBvbmVudC5zZWxlY3QuaW5wdXRSZWY7XG4gICAgfVxuICAgIGlmIChjb21wb25lbnQuc2VsZWN0ICYmIGNvbXBvbmVudC5zZWxlY3Quc2VsZWN0KSB7XG4gICAgICByZXR1cm4gY29tcG9uZW50LnNlbGVjdC5zZWxlY3QuaW5wdXRSZWY7XG4gICAgfVxuICAgIGlmIChjb21wb25lbnQuc2VsZWN0UmVmICYmIGNvbXBvbmVudC5zZWxlY3RSZWYuc2VsZWN0LnNlbGVjdCkge1xuICAgICAgcmV0dXJuIGNvbXBvbmVudC5zZWxlY3RSZWYuc2VsZWN0LnNlbGVjdC5pbnB1dFJlZjtcbiAgICB9XG4gICAgcmV0dXJuIGNvbXBvbmVudC5zZWxlY3RSZWYuc2VsZWN0LmlucHV0UmVmO1xuICB9O1xuXG4gIGdldERhdGFJZEJ5Um93SW5kZXggPSByb3dJbmRleCA9PiB0aGlzLnByb3BzLmRhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi50aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoXSk7XG5cbiAgZ2V0U2VsZWN0ZWRJdGVtSW5kZXggPSAoaWQpID0+IHtcbiAgICBpZiAoIWlkKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5wcm9wcy5kYXRhLmZpbmRJbmRleCh2ID0+IHYuZ2V0SW4odGhpcy5wcm9wcy5ncmlkLmlkS2V5UGF0aCkgPT09IGlkKTtcbiAgICByZXR1cm4gaW5kZXggPT09IC0xID8gdW5kZWZpbmVkIDogaW5kZXg7XG4gIH07XG5cbiAgZ2V0RWRpdEl0ZW1WYWx1ZSA9IChyb3dJbmRleCwgY29sLCBvcHRpb25zID0gW10pID0+IHtcbiAgICAvLyBHZXQgdGhlIHZhbHVlIHRvIGRpc3BsYXkgaW4gZWRpdCBjZWxsXG4gICAgY29uc3QgaWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgIGNvbnN0IGVkaXRWYWx1ZSA9IHRoaXMucHJvcHMuZWRpdERhdGEuZ2V0SW4oW2lkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSwgdW5kZWZpbmVkKTtcbiAgICBsZXQgb3JpZ2luYWxWYWx1ZTtcbiAgICBpZiAoZWRpdFZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG9yaWdpbmFsVmFsdWUgPSB0aGlzLnByb3BzLmRhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSwgJycpO1xuICAgIH0gZWxzZSBpZiAoZWRpdFZhbHVlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFZhbHVlIGlzIGZvdW5kIGZyb20gZWRpdERhdGFcbiAgICAgIC8vIEZvcm1hdCBieSB0eXBlXG4gICAgICBzd2l0Y2ggKGNvbC5jb21wb25lbnRUeXBlKSB7XG4gICAgICAgIGNhc2UgJ211bHRpc2VsZWN0JzpcbiAgICAgICAgY2FzZSAnc2VsZWN0JzpcbiAgICAgICAgICByZXR1cm4gb3B0aW9ucy5zZWxlY3RPcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gZWRpdFZhbHVlKTtcbiAgICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgICAgcmV0dXJuIG9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSBlZGl0VmFsdWUpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiBlZGl0VmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvcmlnaW5hbFZhbHVlID09PSBudWxsIHx8IG9yaWdpbmFsVmFsdWUgPT09IHVuZGVmaW5lZCB8fCBvcmlnaW5hbFZhbHVlID09PSAnJykge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICAvLyBSZXR1cm4gdmFsdWUgZnJvbSBvcmlnaW5hbCBkYXRhLCBiZWNhdXNlIGVkaXREYXRhIGlzIG5vdCBhdmFpbGFibGVcbiAgICAvLyBGb3JtYXQgYnkgY29tcG9uZW50IHR5cGVcbiAgICBzd2l0Y2ggKGNvbC5jb21wb25lbnRUeXBlKSB7XG4gICAgICBjYXNlICdmbG9hdCc6IHtcbiAgICAgICAgaWYgKFN0cmluZyhvcmlnaW5hbFZhbHVlKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgcmV0dXJuIFN0cmluZyhvcmlnaW5hbFZhbHVlKS5yZXBsYWNlKCcuJywgdGhpcy5wcm9wcy5kZWNpbWFsU2VwYXJhdG9yKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3JpZ2luYWxWYWx1ZTtcbiAgICAgIH1cbiAgICAgIGNhc2UgJ211bHRpc2VsZWN0JzpcbiAgICAgIGNhc2UgJ3NlbGVjdCc6XG4gICAgICAgIHJldHVybiBvcHRpb25zLnNlbGVjdE9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSBvcmlnaW5hbFZhbHVlKTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICByZXR1cm4gb3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IG9yaWdpbmFsVmFsdWUpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIG9yaWdpbmFsVmFsdWU7XG4gICAgfVxuICB9O1xuXG4gIGdldENyZWF0ZUl0ZW1WYWx1ZSA9IChyb3dJbmRleCwgY29sLCBvcHRpb25zID0gW10pID0+IHtcbiAgICBjb25zdCB2YWwgPSB0aGlzLnByb3BzLmNyZWF0ZURhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSwgJycpO1xuICAgIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgaWYgKGNvbC5jb21wb25lbnRUeXBlID09PSAnc2VsZWN0JyB8fCBjb2wuY29tcG9uZW50VHlwZSA9PT0gJ211bHRpc2VsZWN0Jykge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuc2VsZWN0T3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IHZhbCk7XG4gICAgfVxuICAgIGlmIChbJ2Jvb2xlYW4nXS5pbmNsdWRlcyhjb2wuY29tcG9uZW50VHlwZSkpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gdmFsKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbDtcbiAgfTtcblxuICBnZXRGaWx0ZXJJdGVtVmFsdWUgPSAoY29sLCBvcHRpb25zID0gW10pID0+IHtcbiAgICBjb25zdCB2YWwgPSB0aGlzLnByb3BzLmZpbHRlckRhdGEuZ2V0KFV0aWxzLmdldENvbHVtbktleShjb2wpLCAnJyk7XG4gICAgaWYgKHZhbCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBpZiAoY29sLmNvbXBvbmVudFR5cGUgPT09ICdzZWxlY3QnKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5zZWxlY3RPcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gdmFsKTtcbiAgICB9XG4gICAgaWYgKFsnY2hlY2tib3gnLCAnYm9vbGVhbiddLmluY2x1ZGVzKGNvbC5jb21wb25lbnRUeXBlKSkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSB2YWwpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWw7XG4gIH07XG5cbiAgZ2V0RmlsdGVySXRlbU11bHRpVmFsdWUgPSAoY29sKSA9PiB7XG4gICAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCk7XG4gICAgY29uc3QgeyBmaWx0ZXJEYXRhIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGRhdGEgPSB0aGlzLnN0YXRlW2NvbHVtbktleV07XG4gICAgY29uc3QgdmFsID0gZGF0YSB8fCBmaWx0ZXJEYXRhLmdldChjb2x1bW5LZXksICcnKTtcbiAgICAvLyBzZXNzaW9uIHN0b3JhZ2UgY29udGVudCBpcyBjb252ZXJ0ZWQgdG8gaW1tdXRhYmxlIGFuZCBtdWx0aXNlbGVjdFxuICAgIC8vIGZpbHRlcnMgaXMgdGhlbiBsaXN0IG90aGVyd2lzZSBhcnJheVxuICAgIHJldHVybiB2YWwgJiYgdmFsLnRvSlMgPyB2YWwudG9KUygpIDogdmFsIHx8IFtdO1xuICB9O1xuXG4gIGdldENvbXBvbmVudERpc2FibGVkU3RhdGUgPSAocm93SW5kZXgsIGNvbCwgbW9kZSkgPT4ge1xuICAgIGxldCBjb21wb25lbnREaXNhYmxlZCA9ICEhY29sLmRpc2FibGVFZGl0aW5nO1xuICAgIC8vIGNoZWNrIGlmIGNvbXBvbmVudCBpcyBkaXNhYmxlZCBieSBvdGhlciBjb2x1bW4gZGF0YVxuICAgIGlmICghY29tcG9uZW50RGlzYWJsZWQgJiYgY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoKSB7XG4gICAgICBpZiAobW9kZSA9PT0gJ2NyZWF0ZScpIHtcbiAgICAgICAgY29tcG9uZW50RGlzYWJsZWQgPSB0aGlzLmdldENyZWF0ZUl0ZW1WYWx1ZShyb3dJbmRleCwge1xuICAgICAgICAgIHZhbHVlS2V5UGF0aDogY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWVLZXlQYXRoLFxuICAgICAgICB9KSA9PT0gY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb21wb25lbnREaXNhYmxlZCA9IHRoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwge1xuICAgICAgICAgIHZhbHVlS2V5UGF0aDogY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWVLZXlQYXRoLFxuICAgICAgICB9KSA9PT0gY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb21wb25lbnREaXNhYmxlZDtcbiAgfTtcblxuICBnZXRSb3dDbGFzc05hbWUgPSAocm93SW5kZXgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBncmlkLCBpc0NyZWF0aW5nLCBpc0VkaXRpbmcsIGNyZWF0ZURhdGEsIHNlbGVjdGVkSXRlbXMsIGRhdGEsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgcm93Q2xhc3NOYW1lcyA9IFsnb2MtZGF0YWdyaWQtcm93J107XG4gICAgbGV0IGV4dHJhUm93Q291bnQgPSAwOyAvLyBob3cgbWFueSByb3dzIHRvIGlnbm9yZSBmcm9tIHRvcCwgbmV3ICsgZmlsdGVyIHJvd3NcbiAgICBpZiAoaXNDcmVhdGluZykgZXh0cmFSb3dDb3VudCA9IGNyZWF0ZURhdGEuc2l6ZTtcbiAgICBpZiAoaXNDcmVhdGluZykge1xuICAgICAgaWYgKHJvd0luZGV4IDw9IGV4dHJhUm93Q291bnQgLSAxKSB7XG4gICAgICAgIHJvd0NsYXNzTmFtZXMucHVzaCgnb2MtZGF0YWdyaWQtcm93LW5ldycpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNFZGl0aW5nKSB7XG4gICAgICByb3dDbGFzc05hbWVzLnB1c2goJ29jLWRhdGFncmlkLXJvdy1lZGl0Jyk7XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgaWYgcm93IGlzIHNlbGVjdGVkXG4gICAgaWYgKCFpc0NyZWF0aW5nICYmICFpc0VkaXRpbmcgJiYgKHNlbGVjdGVkSXRlbXMgJiYgZ3JpZC5pZEtleVBhdGgpKSB7XG4gICAgICBpZiAoc2VsZWN0ZWRJdGVtcy5pbmRleE9mKGRhdGEuZ2V0SW4oW3Jvd0luZGV4IC0gZXh0cmFSb3dDb3VudCwgLi4uZ3JpZC5pZEtleVBhdGhdKSkgIT09IC0xKSB7XG4gICAgICAgIHJvd0NsYXNzTmFtZXMucHVzaCgnaXMtc2VsZWN0ZWQnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5wcm9wcy5yb3dDbGFzc05hbWVHZXR0ZXIpIHtcbiAgICAgIHJldHVybiByb3dDbGFzc05hbWVzLmpvaW4oJyAnKSArICcgJyArIHRoaXMucHJvcHMucm93Q2xhc3NOYW1lR2V0dGVyKHJvd0luZGV4KTtcbiAgICB9XG4gICAgcmV0dXJuIHJvd0NsYXNzTmFtZXMuam9pbignICcpO1xuICB9O1xuXG4gIGdldENlbGxNZXNzYWdlcyA9IChyb3dJbmRleCwgY29sLCBjZWxsVHlwZSkgPT4ge1xuICAgIGNvbnN0IHJldHVybkRhdGEgPSB7fTtcbiAgICBpZiAoIXRoaXMucHJvcHMuZ3JpZC5pZEtleVBhdGggfHwgIWNvbC52YWx1ZUtleVBhdGgpIHtcbiAgICAgIHJldHVybiByZXR1cm5EYXRhO1xuICAgIH1cbiAgICBsZXQgaW5mb01lc3NhZ2U7XG4gICAgbGV0IGVycm9yTWVzc2FnZTtcbiAgICBsZXQgd2FybmluZ01lc3NhZ2U7XG4gICAgaWYgKGNlbGxUeXBlID09PSAnY3JlYXRlJykge1xuICAgICAgaW5mb01lc3NhZ2UgPSB0aGlzLnByb3BzLmNyZWF0ZUNlbGxNZXNzYWdlcy5nZXRJbihbJ2luZm8nLCByb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgZXJyb3JNZXNzYWdlID0gdGhpcy5wcm9wcy5jcmVhdGVDZWxsTWVzc2FnZXMuZ2V0SW4oWydlcnJvcicsIHJvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgICB3YXJuaW5nTWVzc2FnZSA9IHRoaXMucHJvcHMuY3JlYXRlQ2VsbE1lc3NhZ2VzLmdldEluKFtcbiAgICAgICAgJ3dhcm5pbmcnLFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgLi4uY29sLnZhbHVlS2V5UGF0aCxcbiAgICAgIF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgICBpbmZvTWVzc2FnZSA9IHRoaXMucHJvcHMuY2VsbE1lc3NhZ2VzLmdldEluKFsnaW5mbycsIGlkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgICBlcnJvck1lc3NhZ2UgPSB0aGlzLnByb3BzLmNlbGxNZXNzYWdlcy5nZXRJbihbJ2Vycm9yJywgaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgIHdhcm5pbmdNZXNzYWdlID0gdGhpcy5wcm9wcy5jZWxsTWVzc2FnZXMuZ2V0SW4oWyd3YXJuaW5nJywgaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICB9XG4gICAgaWYgKGluZm9NZXNzYWdlKSB7XG4gICAgICByZXR1cm5EYXRhLmluZm9NZXNzYWdlID0gaW5mb01lc3NhZ2U7XG4gICAgfVxuICAgIGlmIChlcnJvck1lc3NhZ2UpIHtcbiAgICAgIHJldHVybkRhdGEuZXJyb3JNZXNzYWdlID0gZXJyb3JNZXNzYWdlO1xuICAgIH1cbiAgICBpZiAod2FybmluZ01lc3NhZ2UpIHtcbiAgICAgIHJldHVybkRhdGEud2FybmluZ01lc3NhZ2UgPSB3YXJuaW5nTWVzc2FnZTtcbiAgICB9XG4gICAgcmV0dXJuIHJldHVybkRhdGE7XG4gIH07XG5cbiAgZ2V0U2Nyb2xsVG9Sb3cgPSAoKSA9PiB7XG4gICAgbGV0IHNjcm9sbFRvUm93O1xuICAgIGlmICh0aGlzLnByb3BzLmlzQ3JlYXRpbmcgJiYgIXRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwpIHJldHVybiBzY3JvbGxUb1JvdztcbiAgICBpZiAodGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCkge1xuICAgICAgY29uc3Qgc2Nyb2xsTmV3Um93ID0gdGhpcy5wcm9wcy5jcmVhdGVEYXRhLnNpemUgLSAxO1xuICAgICAgaWYgKHNjcm9sbE5ld1JvdyA+PSAwKSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gc2Nyb2xsTmV3Um93O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5pc0VkaXRpbmcgJiYgIXRoaXMucHJvcHMuc2Nyb2xsSW5FZGl0TW9kZSkge1xuICAgICAgICBzY3JvbGxUb1JvdyA9IHRoaXMuc3RhdGUuY3VycmVudFJvdztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gdGhpcy5wcm9wcy5zY3JvbGxUb1JvdzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgfVxuICAgICAgaWYgKHNjcm9sbFRvUm93ID09PSB1bmRlZmluZWQgJiYgdGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLnNpemUgPiAwKSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gdGhpcy5nZXRTZWxlY3RlZEl0ZW1JbmRleCh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuZmlyc3QoKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzY3JvbGxUb1JvdztcbiAgfTtcblxuICBzZXRGb2N1c1RvID0gKGZvY3VzVG8pID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5pc0VkaXRpbmcgfHwgdGhpcy5wcm9wcy5pc0NyZWF0aW5nKSB7XG4gICAgICBpZiAoZm9jdXNUbyAmJiBmb2N1c1RvLmdldCgndHlwZScpICYmIGZvY3VzVG8gIT09IHRoaXMucHJldkZvY3VzVG8pIHtcbiAgICAgICAgdGhpc1tmb2N1c1RvLmdldCgndHlwZScpXSA9IHRydWU7XG4gICAgICAgIHRoaXMuZm9jdXNUb0xhc3RSb3cgPSBmb2N1c1RvLmdldCgnZm9jdXNUb0xhc3RSb3cnKTtcbiAgICAgICAgdGhpcy5wcmV2Rm9jdXNUbyA9IGZvY3VzVG87XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZUNlbGxTZWxlY3QgPSAoY2VsbFR5cGUsIHJvd0luZGV4LCBjb2x1bW5LZXkpID0+ICgpID0+IHtcbiAgICBpZiAoY2VsbFR5cGUgPT09ICd2aWV3JyAmJiB0aGlzLnByb3BzLmNlbGxTZWxlY3QpIHtcbiAgICAgIHRoaXMucHJvcHMuY2VsbFNlbGVjdGlvbkNoYW5nZShcbiAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICBNYXAoe1xuICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgIGNvbHVtbktleSxcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVDcmVhdGVDZWxsUmVmID0gKHJvd0luZGV4LCBjb2wpID0+IChyZWYpID0+IHtcbiAgICAvLyBGb2N1cyB0byBjcmVhdGUgY2VsbFxuICAgIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2wpO1xuICAgIGNvbnN0IHNlbGVjdFJlZiA9ICFyZWYgfHwgcmVmLmZvY3VzID8gcmVmIDogdGhpcy5nZXRTZWxlY3RSZWYocmVmKTtcbiAgICBpZiAoXG4gICAgICB0aGlzLnByb3BzLmNyZWF0ZURhdGEuc2l6ZVxuICAgICAgJiYgdGhpcy5wcm9wcy5jcmVhdGVEYXRhLnNpemUgPT09IHJvd0luZGV4ICsgMVxuICAgICAgJiYgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbFxuICAgICAgJiYgIXRoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnY3JlYXRlJylcbiAgICAgICYmIHNlbGVjdFJlZlxuICAgICkge1xuICAgICAgc2VsZWN0UmVmLmZvY3VzKCk7XG4gICAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcHMuZW5hYmxlQXJyb3dOYXZpZ2F0aW9uKSB7XG4gICAgICB0aGlzLmNyZWF0ZUNlbGxSZWZzW2Ake3RoaXMucHJvcHMuZ3JpZC5pZH1fJHtjb2x1bW5LZXl9XyR7cm93SW5kZXh9YF0gPSByZWY7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZUVkaXRDZWxsUmVmID0gKHJvd0luZGV4LCBjb2wpID0+IChyZWYpID0+IHtcbiAgICBjb25zdCBjb2x1bW5LZXkgPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sKTtcbiAgICBpZiAodGhpcy5mb2N1c1RvRWRpdENlbGwgJiYgIXRoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnZWRpdCcpKSB7XG4gICAgICBjb25zdCBzZWxlY3RlZFJvd0luZGV4ID0gdGhpcy5mb2N1c1RvTGFzdFJvdyAmJiB0aGlzLnByb3BzLmRhdGEuc2l6ZSA+IDBcbiAgICAgICAgPyB0aGlzLnByb3BzLmRhdGEuc2l6ZSAtIDFcbiAgICAgICAgOiB0aGlzLmdldFNlbGVjdGVkSXRlbUluZGV4KHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5maXJzdCgpKTtcblxuICAgICAgY29uc3QgeyBzZWxlY3RlZENlbGwgfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCBzZWxlY3RSZWYgPSAhcmVmIHx8IHJlZi5mb2N1cyA/IHJlZiA6IHRoaXMuZ2V0U2VsZWN0UmVmKHJlZik7XG4gICAgICBpZiAoc2VsZWN0ZWRDZWxsLnNpemUgPiAwKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBzZWxlY3RlZENlbGwuZ2V0KCdyb3dJbmRleCcpID09PSByb3dJbmRleFxuICAgICAgICAgICYmIHNlbGVjdGVkQ2VsbC5nZXQoJ2NvbHVtbktleScpID09PSBjb2x1bW5LZXlcbiAgICAgICAgICAmJiBzZWxlY3RSZWZcbiAgICAgICAgKSB7XG4gICAgICAgICAgc2VsZWN0UmVmLmZvY3VzKCk7XG4gICAgICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmZvY3VzVG9MYXN0Um93ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWRSb3dJbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZm9jdXNUb0xhc3RSb3cgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWRSb3dJbmRleCA9PT0gcm93SW5kZXggJiYgc2VsZWN0UmVmKSB7XG4gICAgICAgIHNlbGVjdFJlZi5mb2N1cygpO1xuICAgICAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZvY3VzVG9MYXN0Um93ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZUFycm93TmF2aWdhdGlvbikge1xuICAgICAgdGhpcy5jZWxsUmVmc1tgJHt0aGlzLnByb3BzLmdyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4fWBdID0gcmVmO1xuICAgIH1cbiAgfTtcblxuICBtb3ZlQ2VsbEZvY3VzID0gKG5leHRFbGVtZW50LCByb3dJbmRleCwgY29sdW1uSW5kZXgpID0+IHtcbiAgICBjb25zdCBlbGVtZW50VHlwZXMgPSBbJ3RleHQnLCAnY2hlY2tib3gnXTtcbiAgICBpZiAobmV4dEVsZW1lbnQgJiYgZWxlbWVudFR5cGVzLmluY2x1ZGVzKG5leHRFbGVtZW50LnR5cGUpKSB7XG4gICAgICBpZiAocm93SW5kZXggIT09IC0xIHx8IGNvbHVtbkluZGV4ICE9PSAtMSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBjdXJyZW50Q29sdW1uOiBjb2x1bW5JbmRleCxcbiAgICAgICAgICBjdXJyZW50Um93OiByb3dJbmRleCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKG5leHRFbGVtZW50LnR5cGUgPT09ICdjaGVja2JveCcpIG5leHRFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIGlmIChuZXh0RWxlbWVudC50eXBlID09PSAndGV4dCcpIG5leHRFbGVtZW50LnNlbGVjdCgpO1xuICAgICAgfSwgNTApO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVTZWxlY3RBbGxDaGVja0JveE9uQ2hhbmdlID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMuc2VsZWN0QWxsSXRlbXNDaGFuZ2UodGhpcy5wcm9wcy5ncmlkKTtcbiAgfTtcblxuICBoYW5kbGVTZWxlY3Rpb25DaGVja0JveE9uQ2hhbmdlID0gcm93SW5kZXggPT4gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMuaXRlbVNlbGVjdGlvbkNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIHJvd0luZGV4LCB0cnVlLCBmYWxzZSk7XG4gIH07XG5cbiAgZ2VuZXJhdGVDb2x1bW5zID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGRhdGEsXG4gICAgICBzZWxlY3RlZEl0ZW1zLFxuICAgICAgZGF0ZUZvcm1hdCxcbiAgICAgIHRob3VzYW5kU2VwYXJhdG9yLFxuICAgICAgZGVjaW1hbFNlcGFyYXRvcixcbiAgICAgIGdyaWQsXG4gICAgICBpbmxpbmVFZGl0LFxuICAgICAgZmlsdGVyaW5nLFxuICAgICAgcmVnaW9uLFxuICAgICAgaW50bCxcbiAgICAgIHNlbGVjdENvbXBvbmVudE9wdGlvbnMsXG4gICAgICBpc0NyZWF0aW5nLFxuICAgICAgZXh0cmFDb2x1bW4sXG4gICAgICByb3dTZWxlY3RDaGVja2JveENvbHVtbixcbiAgICAgIHNob3dTZWxlY3RBbGxDaGVja2JveCxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IGNvbHVtbnMgPSBbXTtcbiAgICBjb25zdCB0YWJJbmRleCA9IFN0cmluZyh0aGlzLnByb3BzLnRhYkluZGV4KTtcbiAgICBpZiAoZXh0cmFDb2x1bW4pIHtcbiAgICAgIGNvbHVtbnMucHVzaCh7XG4gICAgICAgIHdpZHRoOiBleHRyYUNvbHVtbi53aWR0aCB8fCA0MCxcbiAgICAgICAgaXNSZXNpemFibGU6ICEhZXh0cmFDb2x1bW4uaXNSZXNpemFibGUsXG4gICAgICAgIGlzU29ydGFibGU6IGZhbHNlLFxuICAgICAgICBjb2x1bW5LZXk6ICdleHRyYUNvbHVtbicsXG4gICAgICAgIGNlbGw6IHJvd0luZGV4ID0+IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWV4dHJhLWNvbHVtbi1jZWxsIG5vLXJvdy1zZWxlY3RcIj5cbiAgICAgICAgICAgIHtleHRyYUNvbHVtbi52YWx1ZVJlbmRlcihkYXRhLmdldChyb3dJbmRleCksIHJvd0luZGV4KX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSxcbiAgICAgICAgY2VsbEVkaXQ6IHJvd0luZGV4ID0+IChleHRyYUNvbHVtbi5jZWxsRWRpdCA/IGV4dHJhQ29sdW1uLmNlbGxFZGl0KHJvd0luZGV4KSA6IG51bGwpLFxuICAgICAgICBjZWxsQ3JlYXRlOiByb3dJbmRleCA9PiAoZXh0cmFDb2x1bW4uY2VsbENyZWF0ZSA/IGV4dHJhQ29sdW1uLmNlbGxDcmVhdGUocm93SW5kZXgpIDogbnVsbCksXG4gICAgICAgIGNlbGxGaWx0ZXI6IHJvd0luZGV4ID0+IChleHRyYUNvbHVtbi5jZWxsRmlsdGVyID8gZXh0cmFDb2x1bW4uY2VsbEZpbHRlcihyb3dJbmRleCkgOiBudWxsKSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChyb3dTZWxlY3RDaGVja2JveENvbHVtbikge1xuICAgICAgY29sdW1ucy5wdXNoKHtcbiAgICAgICAgd2lkdGg6IDQwLFxuICAgICAgICBpc1Jlc2l6YWJsZTogZmFsc2UsXG4gICAgICAgIGlzU29ydGFibGU6IGZhbHNlLFxuICAgICAgICBjb2x1bW5LZXk6ICdzZWxlY3Rpb25DaGVja2JveCcsXG4gICAgICAgIGhlYWRlcjogc2hvd1NlbGVjdEFsbENoZWNrYm94ICYmIChcbiAgICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZFNlbGVjdEFsbENoZWNrQm94LSR7Z3JpZC5pZH1gfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtc2VsZWN0LWFsbC1jaGVja2JveC1jZWxsIG5vLXJvdy1zZWxlY3RcIlxuICAgICAgICAgICAgY2hlY2tlZD17ZGF0YS5zaXplICE9PSAwICYmIGRhdGEuc2l6ZSA9PT0gc2VsZWN0ZWRJdGVtcy5zaXplfVxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlU2VsZWN0QWxsQ2hlY2tCb3hPbkNoYW5nZX1cbiAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAvPlxuICAgICAgICApLFxuICAgICAgICBjZWxsOiAocm93SW5kZXgpID0+IHtcbiAgICAgICAgICBjb25zdCByb3dJdGVtID0gZGF0YS5nZXQocm93SW5kZXgpO1xuICAgICAgICAgIGNvbnN0IGl0ZW1JZCA9IHJvd0l0ZW0uZ2V0SW4oZ3JpZC5pZEtleVBhdGgpO1xuICAgICAgICAgIGNvbnN0IHNlbGVjdGVkID0gc2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhpdGVtSWQpO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkU2VsZWN0Q2hlY2tCb3gtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtc2VsZWN0LWNoZWNrYm94LWNlbGwgbm8tcm93LXNlbGVjdFwiXG4gICAgICAgICAgICAgIGNoZWNrZWQ9e3NlbGVjdGVkfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVTZWxlY3Rpb25DaGVja0JveE9uQ2hhbmdlKHJvd0luZGV4KX1cbiAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICBjZWxsRWRpdDogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbENyZWF0ZTogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbEZpbHRlcjogKCkgPT4gbnVsbCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHZpc2libGVDb2x1bW5zID0gW107XG4gICAgdGhpcy5wcm9wcy52aXNpYmxlQ29sdW1ucy5mb3JFYWNoKCh2aXNpYmxlQ29sdW1uS2V5KSA9PiB7XG4gICAgICB0aGlzLnByb3BzLmNvbHVtbnMuZm9yRWFjaCgob3JnQ29sKSA9PiB7XG4gICAgICAgIGlmIChVdGlscy5nZXRDb2x1bW5LZXkob3JnQ29sKSA9PT0gdmlzaWJsZUNvbHVtbktleSkge1xuICAgICAgICAgIHZpc2libGVDb2x1bW5zLnB1c2gob3JnQ29sKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgdmlzaWJsZUNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZUVtcHR5Q2hlY2tlciA9IFV0aWxzLmdldFZhbHVlRW1wdHlDaGVja2VyKGNvbCk7XG4gICAgICAvLyBDZWxsIHZhbHVlIHJlbmRlcmluZ1xuICAgICAgY29uc3QgdmFsdWVSZW5kZXIgPSAocm93SW5kZXgsIGZvcm1hdCkgPT4ge1xuICAgICAgICBjb25zdCB2YWwgPSBkYXRhLmdldEluKFtyb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsKSkge1xuICAgICAgICAgIHJldHVybiBjb2wuaXNSZXF1aXJlZCA/IDxNIGlkPVwiR3JpZC5WYWx1ZUlzTWlzc2luZ1wiIC8+IDogJyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvcm1hdCA/IGZvcm1hdCh2YWwpIDogdmFsO1xuICAgICAgfTtcblxuICAgICAgbGV0IGNvbHVtbiA9IEdyaWRDb2x1bW5TZXJ2aWNlLmJhc2VDb2x1bW4oY29sKTtcbiAgICAgIC8vIENvbGxlY3QgY29sdW1uIGZ1bmN0aW9ucyBpbnRvIG9uZSBPYmplY3RcbiAgICAgIGNvbnN0IGNvbHVtbkZ1bmN0aW9ucyA9IHtcbiAgICAgICAgZWRpdDoge1xuICAgICAgICAgIGdldEl0ZW1WYWx1ZTogdGhpcy5nZXRFZGl0SXRlbVZhbHVlLFxuICAgICAgICAgIG9uQ2VsbFZhbHVlQ2hhbmdlOiB0aGlzLm9uRWRpdENlbGxWYWx1ZUNoYW5nZSxcbiAgICAgICAgICBvbkNlbGxCbHVyOiB0aGlzLm9uRWRpdENlbGxCbHVyLFxuICAgICAgICAgIG9uQ2VsbEZvY3VzOiB0aGlzLm9uQ2VsbEZvY3VzLFxuICAgICAgICAgIG9uQ2VsbEtleURvd246IHRoaXMub25FZGl0Q2VsbEtleURvd24sXG4gICAgICAgICAgaGFuZGxlQ2VsbFJlZjogdGhpcy5oYW5kbGVFZGl0Q2VsbFJlZixcbiAgICAgICAgfSxcbiAgICAgICAgY3JlYXRlOiB7XG4gICAgICAgICAgZ2V0SXRlbVZhbHVlOiB0aGlzLmdldENyZWF0ZUl0ZW1WYWx1ZSxcbiAgICAgICAgICBvbkNlbGxWYWx1ZUNoYW5nZTogdGhpcy5vbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSxcbiAgICAgICAgICBvbkNlbGxCbHVyOiB0aGlzLm9uQ3JlYXRlQ2VsbEJsdXIsXG4gICAgICAgICAgb25DZWxsRm9jdXM6IHRoaXMub25DZWxsRm9jdXMsXG4gICAgICAgICAgb25DZWxsS2V5RG93bjogdGhpcy5vbkNyZWF0ZUNlbGxLZXlEb3duLFxuICAgICAgICAgIGhhbmRsZUNlbGxSZWY6IHRoaXMuaGFuZGxlQ3JlYXRlQ2VsbFJlZixcbiAgICAgICAgfSxcbiAgICAgICAgZmlsdGVyOiB7XG4gICAgICAgICAgZ2V0SXRlbVZhbHVlOiB0aGlzLmdldEZpbHRlckl0ZW1WYWx1ZSxcbiAgICAgICAgICBnZXRJdGVtTXVsdGlWYWx1ZTogdGhpcy5nZXRGaWx0ZXJJdGVtTXVsdGlWYWx1ZSxcbiAgICAgICAgICBvbkNlbGxWYWx1ZUNoYW5nZTogdGhpcy5vbkZpbHRlckNlbGxWYWx1ZUNoYW5nZSxcbiAgICAgICAgICBvbkNlbGxNdWx0aVZhbHVlQmx1cjogdGhpcy5vbkZpbHRlckNlbGxNdWx0aVZhbHVlQmx1cixcbiAgICAgICAgICBvbkNlbGxNdWx0aVZhbHVlQ2hhbmdlOiB0aGlzLm9uRmlsdGVyQ2VsbE11bHRpVmFsdWVDaGFuZ2UsXG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICAvLyBoYW5kbGUgY29sdW1uLmNlbGwgLyBjb2x1bW4uY2VsbEVkaXQgLyBjb2x1bW4uY2VsbENyZWF0ZSAvIGNvbHVtbi5jZWxsRmlsdGVyXG4gICAgICBjb25zdCBjZWxsUHJvcHMgPSB7XG4gICAgICAgIGdyaWQsXG4gICAgICAgIGRhdGEsXG4gICAgICAgIGRhdGVGb3JtYXQsXG4gICAgICAgIHRob3VzYW5kU2VwYXJhdG9yLFxuICAgICAgICBkZWNpbWFsU2VwYXJhdG9yLFxuICAgICAgICBzZWxlY3RDb21wb25lbnRPcHRpb25zLFxuICAgICAgfTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgY29sdW1uID0gR3JpZENvbHVtblNlcnZpY2UuY29sdW1uQ2VsbChjb2x1bW4sIGNlbGxQcm9wcywgY29sLCB2YWx1ZVJlbmRlcik7XG5cbiAgICAgIC8vIGhhbmRsZSBjb2x1bW5Db21wb25lbnRUeXBlc1xuICAgICAgY29uc3QgY29tcG9uZW50VHlwZVByb3BzID0ge1xuICAgICAgICAuLi5jZWxsUHJvcHMsXG4gICAgICAgIGlubGluZUVkaXQsXG4gICAgICAgIGZpbHRlcmluZyxcbiAgICAgICAgcmVnaW9uLFxuICAgICAgICBpbnRsLFxuICAgICAgICBzZWxlY3RDb21wb25lbnRPcHRpb25zLFxuICAgICAgfTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgY29sdW1uID0gR3JpZENvbHVtblNlcnZpY2UuY29sdW1uQ29tcG9uZW50VHlwZShcbiAgICAgICAgY29sdW1uLFxuICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgY29tcG9uZW50VHlwZVByb3BzLFxuICAgICAgICBjb2wsXG4gICAgICAgIGNvbHVtbkZ1bmN0aW9ucyxcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlLFxuICAgICAgKTtcbiAgICAgIGNvbHVtbnMucHVzaChjb2x1bW4pO1xuICAgIH0pO1xuXG4gICAgaWYgKGlzQ3JlYXRpbmcpIHtcbiAgICAgIGNvbHVtbnMucHVzaCh7XG4gICAgICAgIHdpZHRoOiAzNyxcbiAgICAgICAgaXNSZXNpemFibGU6IGZhbHNlLFxuICAgICAgICBjb2x1bW5LZXk6ICdyZW1vdmVOZXdJdGVtJyxcbiAgICAgICAgY2VsbDogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbEVkaXQ6ICgpID0+IG51bGwsXG4gICAgICAgIGNlbGxDcmVhdGU6IHJvd0luZGV4ID0+IChcbiAgICAgICAgICA8SWNvblxuICAgICAgICAgICAgaWQ9e2BvYy1kYXRhZ3JpZC1uZXctaXRlbS1yZW1vdmUtJHtncmlkLmlkfS0ke3Jvd0luZGV4fWB9XG4gICAgICAgICAgICB0eXBlPVwiaW5kaWNhdG9yXCJcbiAgICAgICAgICAgIG5hbWU9XCJkZWxldGVcIlxuICAgICAgICAgICAgd2lkdGg9ezMwfVxuICAgICAgICAgICAgaGVpZ2h0PXszMH1cbiAgICAgICAgICAgIHN0eWxlPXt7IHBhZGRpbmc6ICc3cHgnIH19XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0aGlzLnByb3BzLnJlbW92ZU5ld0l0ZW0oZ3JpZCwgcm93SW5kZXgpfVxuICAgICAgICAgIC8+XG4gICAgICAgICksXG4gICAgICAgIGNlbGxGaWx0ZXI6ICgpID0+IG51bGwsXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbHVtbnM7XG4gIH07XG5cbiAgaXNDZWxsRWRpdGVkID0gKHJvd0luZGV4LCBjb2wsIGNlbGxUeXBlKSA9PiB7XG4gICAgaWYgKGNlbGxUeXBlICE9PSAnZWRpdCcpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgaWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgIHJldHVybiAhIXRoaXMucHJvcHMuZWRpdERhdGEuZ2V0SW4oW2lkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gIH07XG5cbiAgaGFuZGxlQWZ0ZXJBZGRJdGVtID0gKCkgPT4ge1xuICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgPSB0cnVlO1xuICB9O1xuXG4gIGhhbmRsZUFmdGVyRWRpdFByZXNzID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuc2l6ZSkge1xuICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSB0cnVlO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGN1cnJlbnRSb3c6IHVuZGVmaW5lZCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVBZnRlclZhbGlkYXRpb25FcnJvciA9ICgpID0+IHtcbiAgICB0aGlzLmZvY3VzVG9FcnJvckNlbGwgPSB0cnVlO1xuICB9O1xuXG4gIGhhbmRsZVJvd0NsaWNrID0gKGUsIHJvd0luZGV4KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMucm93U2VsZWN0ICYmICF0aGlzLnByb3BzLmlzQ3JlYXRpbmcgJiYgIXRoaXMucHJvcHMuaXNFZGl0aW5nKSB7XG4gICAgICBpZiAoZS5jdHJsS2V5IHx8IGUuc2hpZnRLZXkpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0U2VsZWN0aW9uKCkucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICB9XG4gICAgICAvLyBEb24ndCB0cmlnZ2VyIHNlbGVjdGlvbiBjaGFuZ2Ugb24gd2hlbiB1c2VyIGNsaWNrcyBvbiBzcGVjaWFsIGNlbGxzIGxpa2UgY2hlY2tib3gvZXh0cmFcbiAgICAgIC8vIENoZWNrIHRoYXQgY2xpY2tlZCBub2RlJ3MgcGFyZW50IG9yIHBhcmVudCdzIHBhcmVudCBkb2Vzbid0IGhhdmUgbm8tcm93LXNlbGVjdCBjbGFzc1xuICAgICAgY29uc3QgeyBwYXJlbnROb2RlIH0gPSBlLnRhcmdldDtcbiAgICAgIGNvbnN0IHBhcmVudDFjbGFzcyA9IHBhcmVudE5vZGUuY2xhc3NOYW1lICYmIHBhcmVudE5vZGUuY2xhc3NOYW1lLmluZGV4T2YgPyBwYXJlbnROb2RlLmNsYXNzTmFtZSA6ICcnO1xuICAgICAgY29uc3QgcGFyZW50MmNsYXNzID0gICAgICAgIHBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUgJiYgcGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZS5pbmRleE9mIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgPyBwYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgIDogJyc7XG4gICAgICBjb25zdCBwYXJlbnQzY2xhc3MgPSBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWVcbiAgICAgICAgJiYgcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lLmluZGV4T2YgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICA/IHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZVxuICAgICAgICA6ICcnO1xuICAgICAgY29uc3QgcGFyZW50NGNsYXNzID0gcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWVcbiAgICAgICAgJiYgcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUuaW5kZXhPZiAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgID8gcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWVcbiAgICAgICAgOiAnJztcbiAgICAgIGlmIChcbiAgICAgICAgcGFyZW50MWNsYXNzLmluZGV4T2YoJ25vLXJvdy1zZWxlY3QnKSA9PT0gLTFcbiAgICAgICAgJiYgcGFyZW50MmNsYXNzLmluZGV4T2YoJ25vLXJvdy1zZWxlY3QnKSA9PT0gLTFcbiAgICAgICAgJiYgcGFyZW50M2NsYXNzLmluZGV4T2YoJ25vLXJvdy1zZWxlY3QnKSA9PT0gLTFcbiAgICAgICAgJiYgcGFyZW50NGNsYXNzLmluZGV4T2YoJ25vLXJvdy1zZWxlY3QnKSA9PT0gLTFcbiAgICAgICkge1xuICAgICAgICB0aGlzLnByb3BzLml0ZW1TZWxlY3Rpb25DaGFuZ2UoXG4gICAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgIHRoaXMucHJvcHMubXVsdGlTZWxlY3QgJiYgZS5jdHJsS2V5LFxuICAgICAgICAgIHRoaXMucHJvcHMubXVsdGlTZWxlY3QgJiYgZS5zaGlmdEtleSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMub25Sb3dDbGljaykge1xuICAgICAgdGhpcy5wcm9wcy5vblJvd0NsaWNrKGUsIHJvd0luZGV4LCB0aGlzLnByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGhhbmRsZUNvbnRleHRNZW51ID0gKGUsIHJvd0luZGV4KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuY29udGV4dE1lbnVJdGVtcykge1xuICAgICAgY29uc3Qge1xuICAgICAgICBpdGVtU2VsZWN0aW9uQ2hhbmdlLCBzZWxlY3RlZEl0ZW1zLCBncmlkLCBkYXRhLFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGNvbnRleHRNZW51T3BlbjogdHJ1ZSxcbiAgICAgICAgY29udGV4dE1lbnVYOiBlLmNsaWVudFgsXG4gICAgICAgIGNvbnRleHRNZW51WTogZS5jbGllbnRZLFxuICAgICAgfSk7XG4gICAgICAvLyBJZiBjbGlja2VkIGl0ZW0gaXMgbm90IHNlbGVjdGVkLCBjaGFuZ2Ugc2VsZWN0aW9uIHRvIGl0XG4gICAgICBpZiAoIXNlbGVjdGVkSXRlbXMuaW5jbHVkZXMoZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmdyaWQuaWRLZXlQYXRoXSkpKSB7XG4gICAgICAgIGl0ZW1TZWxlY3Rpb25DaGFuZ2UoZ3JpZCwgcm93SW5kZXgpO1xuICAgICAgfVxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uRG9jdW1lbnRDbGljayk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGhhbmRsZUNvbnRleHRNZW51SXRlbUNsaWNrID0gKG9uQ2xpY2ssIHNlbGVjdGVkSXRlbXMsIHNlbGVjdGVkRGF0YSkgPT4gKCkgPT4ge1xuICAgIG9uQ2xpY2soc2VsZWN0ZWRJdGVtcywgc2VsZWN0ZWREYXRhKTtcbiAgfTtcblxuICBoYW5kbGVSb3dIZWlnaHRHZXR0ZXIgPSByb3dJbmRleCA9PiB0aGlzLnByb3BzLnJvd0hlaWdodEdldHRlcihcbiAgICB0aGlzLnByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSxcbiAgICByb3dJbmRleCxcbiAgKTtcblxuICByZW5kZXJDZWxsID0gY29sID0+IChjZWxsUHJvcHMpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBpc0NyZWF0aW5nLCBpc0VkaXRpbmcsIGNyZWF0ZURhdGEsIHNlbGVjdGVkQ2VsbCwgZ3JpZCxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHJvd0luZGV4LCAuLi5wcm9wcyB9ID0gY2VsbFByb3BzO1xuICAgIGxldCBjZWxsO1xuICAgIGxldCBjZWxsVHlwZSA9ICd2aWV3JztcbiAgICBsZXQgZXh0cmFSb3dDb3VudCA9IDA7IC8vIGhvdyBtYW55IHJvd3MgdG8gaWdub3JlIGZyb20gdG9wLCBuZXcgKyBmaWx0ZXIgcm93c1xuICAgIGlmIChpc0NyZWF0aW5nKSBleHRyYVJvd0NvdW50ID0gY3JlYXRlRGF0YS5zaXplO1xuICAgIGNvbnN0IGV4aXN0aW5nUm93c0luZGV4ID0gcm93SW5kZXggLSBleHRyYVJvd0NvdW50O1xuICAgIGlmIChpc0NyZWF0aW5nKSB7XG4gICAgICBpZiAocm93SW5kZXggPD0gZXh0cmFSb3dDb3VudCAtIDEpIHtcbiAgICAgICAgaWYgKGNvbC5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY2VsbCA9IGNvbC5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNyZWF0ZUNlbGxSZWYocm93SW5kZXgsIGNvbCksXG4gICAgICAgICAgICB0aGlzLm9uQ3JlYXRlQ2VsbEtleURvd24ocm93SW5kZXgsIGNvbCksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjZWxsVHlwZSA9ICdjcmVhdGUnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNlbGwgPSBudWxsO1xuICAgICAgICAgIGNlbGxUeXBlID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2VsbCA9IGNvbC5jZWxsKFxuICAgICAgICAgIGV4aXN0aW5nUm93c0luZGV4LFxuICAgICAgICAgIHRoaXMuaGFuZGxlQ3JlYXRlQ2VsbFJlZihleGlzdGluZ1Jvd3NJbmRleCwgY29sKSxcbiAgICAgICAgICB0aGlzLm9uQ3JlYXRlQ2VsbEtleURvd24oZXhpc3RpbmdSb3dzSW5kZXgsIGNvbCksXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc0VkaXRpbmcgJiYgY29sLmNlbGxFZGl0KSB7XG4gICAgICBjZWxsID0gY29sLmNlbGxFZGl0KFxuICAgICAgICBleGlzdGluZ1Jvd3NJbmRleCxcbiAgICAgICAgdGhpcy5oYW5kbGVFZGl0Q2VsbFJlZihleGlzdGluZ1Jvd3NJbmRleCwgY29sKSxcbiAgICAgICAgdGhpcy5vbkVkaXRDZWxsS2V5RG93bihleGlzdGluZ1Jvd3NJbmRleCwgY29sKSxcbiAgICAgICk7XG4gICAgICBjZWxsVHlwZSA9ICdlZGl0JztcbiAgICB9IGVsc2Uge1xuICAgICAgY2VsbCA9IGNvbC5jZWxsKFxuICAgICAgICBleGlzdGluZ1Jvd3NJbmRleCxcbiAgICAgICAgdGhpcy5oYW5kbGVFZGl0Q2VsbFJlZihleGlzdGluZ1Jvd3NJbmRleCwgY29sKSxcbiAgICAgICAgdGhpcy5vbkVkaXRDZWxsS2V5RG93bihleGlzdGluZ1Jvd3NJbmRleCwgY29sKSxcbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnN0IGlzU3BlY2lhbCA9IHByb3BzLmNvbHVtbktleSA9PT0gJ3NlbGVjdGlvbkNoZWNrYm94JyB8fCBwcm9wcy5jb2x1bW5LZXkgPT09ICdleHRyYUNvbHVtbic7XG4gICAgaWYgKChjZWxsVHlwZSA9PT0gJ3ZpZXcnIHx8IGNlbGxUeXBlID09PSAnZWRpdCcgfHwgY2VsbFR5cGUgPT09ICdjcmVhdGUnKSAmJiAhaXNTcGVjaWFsKSB7XG4gICAgICBjb25zdCBnZXRSb3dJbmRleCA9IGNlbGxUeXBlID09PSAnY3JlYXRlJyA/IHJvd0luZGV4IDogcm93SW5kZXggLSBleHRyYVJvd0NvdW50O1xuICAgICAgY29uc3QgbWVzc2FnZURhdGEgPSB0aGlzLmdldENlbGxNZXNzYWdlcyhnZXRSb3dJbmRleCwgY29sLCBjZWxsVHlwZSk7XG4gICAgICBjb25zdCBpc0VkaXRlZCA9IHRoaXMuaXNDZWxsRWRpdGVkKGdldFJvd0luZGV4LCBjb2wsIGNlbGxUeXBlKTtcbiAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IHNlbGVjdGVkQ2VsbC5nZXQoJ3Jvd0luZGV4JykgPT09IHJvd0luZGV4XG4gICAgICAgICYmIHNlbGVjdGVkQ2VsbC5nZXQoJ2NvbHVtbktleScpID09PSBwcm9wcy5jb2x1bW5LZXlcbiAgICAgICAgPyAnb2MtZGF0YWdyaWQtY2VsbCBpcy1zZWxlY3RlZCdcbiAgICAgICAgOiAnb2MtZGF0YWdyaWQtY2VsbCc7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Q2VsbFxuICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgICAgICBzdHlsZT17Y29sLnN0eWxlfVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2VsbFNlbGVjdChjZWxsVHlwZSwgcm93SW5kZXgsIHByb3BzLmNvbHVtbktleSl9XG4gICAgICAgID5cbiAgICAgICAgICA8Q2VsbFRvb2x0aXBcbiAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZENlbGwtJHtncmlkLmlkfS0ke3Byb3BzLmNvbHVtbktleX0tJHtyb3dJbmRleH1gfVxuICAgICAgICAgICAgaXNFZGl0ZWQ9e2lzRWRpdGVkfVxuICAgICAgICAgICAgaXNFcnJvcj17ISFtZXNzYWdlRGF0YS5lcnJvck1lc3NhZ2V9XG4gICAgICAgICAgICBpc1dhcm5pbmc9eyEhbWVzc2FnZURhdGEud2FybmluZ01lc3NhZ2V9XG4gICAgICAgICAgICBpbmZvTWVzc2FnZT17bWVzc2FnZURhdGEuaW5mb01lc3NhZ2V9XG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U9e21lc3NhZ2VEYXRhLmVycm9yTWVzc2FnZX1cbiAgICAgICAgICAgIHdhcm5pbmdNZXNzYWdlPXttZXNzYWdlRGF0YS53YXJuaW5nTWVzc2FnZX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7Y2VsbH1cbiAgICAgICAgICA8L0NlbGxUb29sdGlwPlxuICAgICAgICA8L0NlbGw+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPENlbGwgey4uLnByb3BzfSBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1jZWxsXCIgc3R5bGU9e2NvbC5zdHlsZX0+XG4gICAgICAgIHtjZWxsfVxuICAgICAgPC9DZWxsPlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyQ29sdW1ucyA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBhbGxEYXRhU2l6ZSwgZ3JpZCwgaXNDcmVhdGluZywgaXNCdXN5LCB2aXNpYmxlQ29sdW1ucyxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIWFsbERhdGFTaXplICYmICFpc0J1c3kgJiYgIWlzQ3JlYXRpbmcgJiYgIWdyaWQucGFnaW5hdGlvbikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPENvbHVtblxuICAgICAgICAgIGNvbHVtbktleT1cImRhdGFFbXB0eUNvbHVtblwiXG4gICAgICAgICAgaGVhZGVyPXsoXG4gICAgICAgICAgICA8Q2VsbCBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInIH19PlxuICAgICAgICAgICAgICA8TSBpZD1cIkdyaWQuTm9JdGVtc1wiIC8+XG4gICAgICAgICAgICA8L0NlbGw+XG4pfVxuICAgICAgICAgIHdpZHRoPXsxMH1cbiAgICAgICAgICBpc1Jlc2l6YWJsZT17ZmFsc2V9XG4gICAgICAgICAgZmxleEdyb3c9ezF9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoIXZpc2libGVDb2x1bW5zLnNpemUpIHtcbiAgICAgIGlmIChpc0J1c3kpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8Q29sdW1uXG4gICAgICAgICAgICBjb2x1bW5LZXk9XCJkYXRhRW1wdHlDb2x1bW5cIlxuICAgICAgICAgICAgaGVhZGVyPXs8Q2VsbD4mbmJzcDs8L0NlbGw+fVxuICAgICAgICAgICAgd2lkdGg9ezEwfVxuICAgICAgICAgICAgaXNSZXNpemFibGU9e2ZhbHNlfVxuICAgICAgICAgICAgZmxleEdyb3c9ezF9XG4gICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxDb2x1bW5cbiAgICAgICAgICBjb2x1bW5LZXk9XCJkYXRhRW1wdHlDb2x1bW5cIlxuICAgICAgICAgIGhlYWRlcj17KFxuICAgICAgICAgICAgPENlbGwgc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICAgICAgPE0gaWQ9XCJHcmlkLk5vQ29sdW1uc1wiIC8+XG4gICAgICAgICAgICA8L0NlbGw+XG4pfVxuICAgICAgICAgIHdpZHRoPXsxMH1cbiAgICAgICAgICBpc1Jlc2l6YWJsZT17ZmFsc2V9XG4gICAgICAgICAgZmxleEdyb3c9ezF9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCBjb2x1bW5zID0gdGhpcy5nZW5lcmF0ZUNvbHVtbnMoKTtcbiAgICBpZiAoY29sdW1ucy5sZW5naHQgPT09IDApIHJldHVybiBudWxsO1xuICAgIHJldHVybiBjb2x1bW5zLm1hcChjb2wgPT4gKFxuICAgICAgPENvbHVtblxuICAgICAgICBrZXk9e2NvbC5jb2x1bW5LZXl9XG4gICAgICAgIGNvbHVtbktleT17Y29sLmNvbHVtbktleX1cbiAgICAgICAgaGVhZGVyPXsoXG4gICAgICAgICAgPEhlYWRlckNlbGxcbiAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZEhlYWRlci0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2wuY29sdW1uS2V5fWB9XG4gICAgICAgICAgICBncmlkPXt0aGlzLnByb3BzLmdyaWR9XG4gICAgICAgICAgICBjb2x1bW5zPXt0aGlzLnByb3BzLmNvbHVtbnN9XG4gICAgICAgICAgICBjb2x1bW49e2NvbH1cbiAgICAgICAgICAgIGN1cnJlbnRTb3J0Q29sdW1uPXt0aGlzLnByb3BzLnNvcnRDb2x1bW59XG4gICAgICAgICAgICBjdXJyZW50U29ydE9yZGVyPXt0aGlzLnByb3BzLnNvcnRPcmRlcn1cbiAgICAgICAgICAgIG9uU29ydENoYW5nZT17dGhpcy5wcm9wcy5zb3J0Q2hhbmdlfVxuICAgICAgICAgICAgaXNCdXN5PXt0aGlzLnByb3BzLmlzQnVzeX1cbiAgICAgICAgICAgIGZpbHRlcmluZz17dGhpcy5wcm9wcy5maWx0ZXJpbmcgJiYgdGhpcy5wcm9wcy5pc0ZpbHRlcmluZ31cbiAgICAgICAgICAgIHdpZHRoPXt0aGlzLnByb3BzLmNvbHVtbldpZHRocy5nZXQoY29sLmNvbHVtbktleSwgY29sLndpZHRoKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7Y29sLmhlYWRlcn1cbiAgICAgICAgICA8L0hlYWRlckNlbGw+XG4pfVxuICAgICAgICBjZWxsPXt0aGlzLnJlbmRlckNlbGwoY29sKX1cbiAgICAgICAgd2lkdGg9e3RoaXMucHJvcHMuY29sdW1uV2lkdGhzLmdldChjb2wuY29sdW1uS2V5LCBjb2wud2lkdGgpfVxuICAgICAgICBtaW5XaWR0aD17Y29sLm1pbldpZHRofVxuICAgICAgICBtYXhXaWR0aD17Y29sLm1heFdpZHRofVxuICAgICAgICBpc1Jlc2l6YWJsZT17Y29sLmlzUmVzaXphYmxlfVxuICAgICAgICBmbGV4R3Jvdz17Y29sLmZsZXhHcm93ID8gY29sLmZsZXhHcm93IDogMH1cbiAgICAgICAgZml4ZWQ9e2NvbC5maXhlZH1cbiAgICAgICAgZml4ZWRSaWdodD17Y29sLmZpeGVkUmlnaHR9XG4gICAgICAgIGFsbG93Q2VsbHNSZWN5Y2xpbmc9e2NvbC5hbGxvd0NlbGxzUmVjeWNsaW5nfVxuICAgICAgLz5cbiAgICApKTtcbiAgfTtcblxuICByZW5kZXJDb250ZXh0TWVudSA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBjb250ZXh0TWVudUl0ZW1zLCBkYXRhLCBncmlkLCBzZWxlY3RlZEl0ZW1zLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgY29udGV4dE1lbnVYLCBjb250ZXh0TWVudVkgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3Qgc3R5bGUgPSB7XG4gICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgICAgekluZGV4OiAxMDAwMCxcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgdG9wOiBgJHtjb250ZXh0TWVudVl9cHhgLFxuICAgICAgbGVmdDogYCR7Y29udGV4dE1lbnVYfXB4YCxcbiAgICB9O1xuICAgIGNvbnN0IHNlbGVjdGVkRGF0YSA9IGRhdGEuZmlsdGVyKGQgPT4gc2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhkLmdldEluKGdyaWQuaWRLZXlQYXRoKSkpO1xuICAgIHJldHVybiAoXG4gICAgICA8dWwgY2xhc3NOYW1lPVwiZHJvcGRvd24tbWVudSBvYy1kYXRhZ3JpZC1jb250ZXh0LW1lbnUgb3BlblwiIHN0eWxlPXtzdHlsZX0+XG4gICAgICAgIHtjb250ZXh0TWVudUl0ZW1zXG4gICAgICAgICAgJiYgY29udGV4dE1lbnVJdGVtcy5tYXBcbiAgICAgICAgICAmJiBjb250ZXh0TWVudUl0ZW1zLm1hcCgoaXRlbSwgaSkgPT4ge1xuICAgICAgICAgICAgbGV0IHsgZGlzYWJsZWQgfSA9IGl0ZW07XG4gICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0uZGlzYWJsZWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgZGlzYWJsZWQgPSBpdGVtLmRpc2FibGVkKHNlbGVjdGVkSXRlbXMsIHNlbGVjdGVkRGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8TWVudUl0ZW1cbiAgICAgICAgICAgICAgICBrZXk9e2l9IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgICAgICAgICBoZWFkZXI9e2l0ZW0uaGVhZGVyfVxuICAgICAgICAgICAgICAgIGRpdmlkZXI9e2l0ZW0uZGl2aWRlcn1cbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgdGl0bGU9e2l0ZW0udGl0bGV9XG4gICAgICAgICAgICAgICAgb25DbGljaz17XG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZCB8fCAhaXRlbS5vbkNsaWNrXG4gICAgICAgICAgICAgICAgICAgID8gbnVsbFxuICAgICAgICAgICAgICAgICAgICA6IHRoaXMuaGFuZGxlQ29udGV4dE1lbnVJdGVtQ2xpY2soaXRlbS5vbkNsaWNrLCBzZWxlY3RlZEl0ZW1zLCBzZWxlY3RlZERhdGEpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2l0ZW0udmFsdWV9XG4gICAgICAgICAgICAgIDwvTWVudUl0ZW0+XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pfVxuICAgICAgPC91bD5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBncmlkQ2xhc3NOYW1lID0gY2xhc3NOYW1lcyh7XG4gICAgICAnb2MtZGF0YWdyaWQtY29udGFpbmVyJzogdHJ1ZSxcbiAgICAgICd3aXRoLWFjdGlvbmJhcic6IHRoaXMucHJvcHMuaW5saW5lRWRpdCAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlQWN0aW9uQmFyLFxuICAgICAgJ2lzLWJ1c3knOiB0aGlzLnByb3BzLmlzQnVzeSxcbiAgICAgICdpcy1lZGl0aW5nJzogdGhpcy5wcm9wcy5pc0VkaXRpbmcsXG4gICAgICAnaXMtY3JlYXRpbmcnOiB0aGlzLnByb3BzLmlzQ3JlYXRpbmcsXG4gICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgIH0pO1xuXG4gICAgLy8gY2hlY2sgaWYgdGhlcmUgaXMgYSBuZXcgcmVxdWVzdCB0byBjaGFuZ2UgZWRpdCBtb2RlIGZvY3VzXG4gICAgdGhpcy5zZXRGb2N1c1RvKHRoaXMucHJvcHMuZm9jdXNUeXBlKTtcblxuICAgIGxldCBhY3Rpb25CYXIgPSBudWxsO1xuICAgIGxldCBhY3Rpb25CYXJSaWdodCA9IG51bGw7XG4gICAgbGV0IGFjdGlvbkJhckxlZnQgPSBudWxsO1xuICAgIGlmIChcbiAgICAgICh0aGlzLnByb3BzLmFjdGlvbkJhclxuICAgICAgICB8fCB0aGlzLnByb3BzLmlubGluZUVkaXRcbiAgICAgICAgfHwgdGhpcy5wcm9wcy5maWx0ZXJpbmdcbiAgICAgICAgfHwgdGhpcy5wcm9wcy5yZW1vdmluZylcbiAgICAgICYmICF0aGlzLnByb3BzLmRpc2FibGVBY3Rpb25CYXJcbiAgICApIHtcbiAgICAgIGFjdGlvbkJhclJpZ2h0ID0gKFxuICAgICAgICA8QWN0aW9uQmFyIHBvc2l0aW9uPVwicmlnaHRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWFjdGlvbmJhci1yaWdodFwiPnt0aGlzLnByb3BzLmFjdGlvbkJhcn08L2Rpdj5cbiAgICAgICAgICB7dGhpcy5wcm9wcy5maWx0ZXJpbmdcbiAgICAgICAgICAgICYmIHRoaXMucHJvcHMuZGlzYWJsZURyb3Bkb3duXG4gICAgICAgICAgICAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlRmlsdGVyaW5nQ29udHJvbHMgJiYgPEZpbHRlcmluZ0NvbnRyb2xzIHsuLi50aGlzLnByb3BzfSAvPn1cbiAgICAgICAgICB7dGhpcy5wcm9wcy5pbmxpbmVFZGl0ICYmIChcbiAgICAgICAgICAgIDxJbmxpbmVFZGl0Q29udHJvbHNcbiAgICAgICAgICAgICAgYWZ0ZXJBZGRJdGVtPXt0aGlzLmhhbmRsZUFmdGVyQWRkSXRlbX1cbiAgICAgICAgICAgICAgYWZ0ZXJFZGl0UHJlc3M9e3RoaXMuaGFuZGxlQWZ0ZXJFZGl0UHJlc3N9XG4gICAgICAgICAgICAgIGFmdGVyVmFsaWRhdGlvbkVycm9yPXt0aGlzLmhhbmRsZUFmdGVyVmFsaWRhdGlvbkVycm9yfVxuICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7KHRoaXMucHJvcHMuZHJvcGRvd25NZW51SXRlbXNcbiAgICAgICAgICAgIHx8IHRoaXMucHJvcHMucmVtb3ZpbmdcbiAgICAgICAgICAgIHx8IHRoaXMucHJvcHMuY29sdW1uU2V0dGluZ3NcbiAgICAgICAgICAgIHx8ICh0aGlzLnByb3BzLmZpbHRlcmluZyAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlRHJvcGRvd24pKSAmJiAoXG4gICAgICAgICAgICA8RHJvcGRvd25Db250cm9scyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgICApfVxuICAgICAgICA8L0FjdGlvbkJhcj5cbiAgICAgICk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLmFjdGlvbkJhckxlZnQgfHwgdGhpcy5wcm9wcy5ncmlkSGVhZGVyKSB7XG4gICAgICBhY3Rpb25CYXJMZWZ0ID0gKFxuICAgICAgICA8QWN0aW9uQmFyIHBvc2l0aW9uPVwibGVmdFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtZ3JpZGhlYWRlclwiPnt0aGlzLnByb3BzLmdyaWRIZWFkZXJ9PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1hY3Rpb25iYXItbGVmdFwiPnt0aGlzLnByb3BzLmFjdGlvbkJhckxlZnR9PC9kaXY+XG4gICAgICAgIDwvQWN0aW9uQmFyPlxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGFjdGlvbkJhckxlZnQgfHwgYWN0aW9uQmFyUmlnaHQpIHtcbiAgICAgIGFjdGlvbkJhciA9IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1hY3Rpb25iYXItY29udGFpbmVyXCI+XG4gICAgICAgICAge2FjdGlvbkJhckxlZnR9XG4gICAgICAgICAge2FjdGlvbkJhclJpZ2h0fVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICAgIGxldCByb3dzQ291bnQgPSB0aGlzLnByb3BzLnJvd3NDb3VudCB8fCB0aGlzLnByb3BzLnJvd3NDb3VudCA9PT0gMFxuICAgICAgPyB0aGlzLnByb3BzLnJvd3NDb3VudFxuICAgICAgOiB0aGlzLnByb3BzLmRhdGEuc2l6ZTtcbiAgICBpZiAodGhpcy5wcm9wcy5pc0NyZWF0aW5nKSByb3dzQ291bnQgKz0gdGhpcy5wcm9wcy5jcmVhdGVEYXRhLnNpemU7XG4gICAgaWYgKCF0aGlzLnByb3BzLnZpc2libGVDb2x1bW5zLnNpemUpIHJvd3NDb3VudCA9IDA7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9e2BvYy1kYXRhZ3JpZC0ke3RoaXMucHJvcHMuZ3JpZC5pZH1gfVxuICAgICAgICBjbGFzc05hbWU9e2dyaWRDbGFzc05hbWV9XG4gICAgICAgIHN0eWxlPXt0aGlzLnByb3BzLmNvbnRhaW5lclN0eWxlfVxuICAgICAgPlxuICAgICAgICB7dGhpcy5wcm9wcy5pc0J1c3kgJiYgPFNwaW5uZXIgLz59XG4gICAgICAgIHt0aGlzLnN0YXRlLmNvbnRleHRNZW51T3BlbiAmJiB0aGlzLnJlbmRlckNvbnRleHRNZW51KCl9XG4gICAgICAgIHthY3Rpb25CYXJ9XG4gICAgICAgIDxSZXNwb25zaXZlRml4ZWREYXRhVGFibGVcbiAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICBpZD17dGhpcy5wcm9wcy5ncmlkLmlkfVxuICAgICAgICAgIHJvd3NDb3VudD17cm93c0NvdW50fVxuICAgICAgICAgIGhlYWRlckhlaWdodD17XG4gICAgICAgICAgICAodGhpcy5wcm9wcy5maWx0ZXJpbmcgJiYgdGhpcy5wcm9wcy5pc0ZpbHRlcmluZylcbiAgICAgICAgICAgICAgPyB0aGlzLnByb3BzLmhlYWRlckhlaWdodCArIHRoaXMucHJvcHMuZmlsdGVyUm93SGVpZ2h0XG4gICAgICAgICAgICAgIDogdGhpcy5wcm9wcy5oZWFkZXJIZWlnaHRcbiAgICAgICAgICB9XG4gICAgICAgICAgcm93SGVpZ2h0PXt0aGlzLnByb3BzLnJvd0hlaWdodH1cbiAgICAgICAgICBvbkNvbHVtblJlc2l6ZUVuZENhbGxiYWNrPXt0aGlzLm9uQ29sdW1uUmVzaXplRW5kQ2FsbGJhY2t9XG4gICAgICAgICAgaXNDb2x1bW5SZXNpemluZz17ZmFsc2V9XG4gICAgICAgICAgb25Sb3dDbGljaz17dGhpcy5oYW5kbGVSb3dDbGlja31cbiAgICAgICAgICBzY3JvbGxUb0NvbHVtbj17dGhpcy5wcm9wcy5zY3JvbGxUb0NvbHVtbiB8fCB0aGlzLnN0YXRlLmN1cnJlbnRDb2x1bW59XG4gICAgICAgICAgc2Nyb2xsVG9wPXt0aGlzLnByb3BzLnNjcm9sbFRvcH1cbiAgICAgICAgICBzY3JvbGxUb1Jvdz17dGhpcy5nZXRTY3JvbGxUb1JvdygpfVxuICAgICAgICAgIG9uUm93RG91YmxlQ2xpY2s9e3RoaXMucHJvcHMub25Sb3dEb3VibGVDbGlja31cbiAgICAgICAgICBvblJvd01vdXNlRG93bj17dGhpcy5wcm9wcy5vbk1vdXNlRG93bn1cbiAgICAgICAgICBvblJvd01vdXNlRW50ZXI9e3RoaXMucHJvcHMub25Sb3dNb3VzZUVudGVyfVxuICAgICAgICAgIG9uUm93TW91c2VMZWF2ZT17dGhpcy5wcm9wcy5vblJvd01vdXNlTGVhdmV9XG4gICAgICAgICAgb25TY3JvbGxTdGFydD17dGhpcy5wcm9wcy5vblNjcm9sbFN0YXJ0fVxuICAgICAgICAgIG9uU2Nyb2xsRW5kPXt0aGlzLnByb3BzLm9uU2Nyb2xsRW5kfVxuICAgICAgICAgIHJvd0NsYXNzTmFtZUdldHRlcj17dGhpcy5nZXRSb3dDbGFzc05hbWV9XG4gICAgICAgICAgcm93SGVpZ2h0R2V0dGVyPXt0aGlzLnByb3BzLnJvd0hlaWdodEdldHRlciAmJiB0aGlzLmhhbmRsZVJvd0hlaWdodEdldHRlcn1cbiAgICAgICAgICBvbkNvbnRlbnRIZWlnaHRDaGFuZ2U9e3RoaXMucHJvcHMub25Db250ZW50SGVpZ2h0Q2hhbmdlfVxuICAgICAgICAgIG9uUm93Q29udGV4dE1lbnU9e3RoaXMuaGFuZGxlQ29udGV4dE1lbnV9XG4gICAgICAgID5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJDb2x1bW5zKCl9XG4gICAgICAgIDwvUmVzcG9uc2l2ZUZpeGVkRGF0YVRhYmxlPlxuICAgICAgICB7dGhpcy5wcm9wcy5pc0NvbHVtblNldHRpbmdzTW9kYWxPcGVuICYmIChcbiAgICAgICAgICA8Q29sdW1uU2V0dGluZ3NNb2RhbFxuICAgICAgICAgICAgZ3JpZD17dGhpcy5wcm9wcy5ncmlkfVxuICAgICAgICAgICAgY29sdW1ucz17dGhpcy5wcm9wcy5jb2x1bW5zfVxuICAgICAgICAgICAgdmlzaWJsZUNvbHVtbnM9e3RoaXMucHJvcHMudmlzaWJsZUNvbHVtbnN9XG4gICAgICAgICAgICBjbG9zZUNvbHVtblNldHRpbmdzTW9kYWw9e3RoaXMucHJvcHMuY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsfVxuICAgICAgICAgICAgc2F2ZUNvbHVtblNldHRpbmdzPXt0aGlzLnByb3BzLnNhdmVDb2x1bW5TZXR0aW5nc31cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRGF0YUdyaWQ7XG4iXX0=