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
        var value; // eventOrData can be formatted-input, react-select or react-day-picker onChange event

        if (eventOrData !== undefined) {
          if (eventOrData.target !== undefined) {
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

        var value; // eventOrData can be formatted-input, react-select or react-day-picker onChange event

        if (eventOrData !== undefined) {
          if (eventOrData.target !== undefined) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiTWFwIiwiTGlzdCIsImNvbm5lY3QiLCJpbmplY3RJbnRsIiwiRm9ybWF0dGVkTWVzc2FnZSIsIk0iLCJDb2x1bW4iLCJDZWxsIiwiTWVudUl0ZW0iLCJjbGFzc05hbWVzIiwiSWNvbiIsIlNwaW5uZXIiLCJDaGVja2JveCIsIlJlc3BvbnNpdmVGaXhlZERhdGFUYWJsZSIsIkhlYWRlckNlbGwiLCJBY3Rpb25CYXIiLCJJbmxpbmVFZGl0Q29udHJvbHMiLCJGaWx0ZXJpbmdDb250cm9scyIsIkRyb3Bkb3duQ29udHJvbHMiLCJkYXRhZ3JpZEFjdGlvbnMiLCJDZWxsVG9vbHRpcCIsIkNvbHVtblNldHRpbmdzTW9kYWwiLCJwcm9wVHlwZXMiLCJkZWZhdWx0UHJvcHMiLCJLRVlfQ09ERVMiLCJwYWdpbmF0aW9uIiwiVXRpbHMiLCJHcmlkQ29sdW1uU2VydmljZSIsIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwib3duUHJvcHMiLCJHUklEIiwiZ3JpZCIsImlzQnVzeSIsImRhdGFncmlkIiwiZ2V0SW4iLCJpZCIsImlzRWRpdGluZyIsImlzQ3JlYXRpbmciLCJpc0ZpbHRlcmluZyIsImlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW4iLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwidmlzaWJsZUNvbHVtbnMiLCJjb2x1bW5XaWR0aHMiLCJzZWxlY3RlZENlbGwiLCJzZWxlY3RlZEl0ZW1zIiwiZGF0YSIsImVkaXREYXRhIiwiY3JlYXRlRGF0YSIsImZpbHRlckRhdGEiLCJjZWxsTWVzc2FnZXMiLCJjcmVhdGVDZWxsTWVzc2FnZXMiLCJhbGxEYXRhU2l6ZSIsInNpemUiLCJsYW5ndWFnZSIsImdldExhbmd1YWdlIiwidXNlciIsInJlZ2lvbiIsImdldFJlZ2lvbiIsImRhdGVGb3JtYXQiLCJnZXREYXRlRm9ybWF0IiwidGhvdXNhbmRTZXBhcmF0b3IiLCJnZXRUaG91c2FuZFNlcGFyYXRvciIsImRlY2ltYWxTZXBhcmF0b3IiLCJnZXREZWNpbWFsU2VwYXJhdG9yIiwiZm9yY2VSZWZyZXNoVGltZXN0YW1wIiwiZ2V0IiwiZm9jdXNUeXBlIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwiRGF0YUdyaWQiLCJwcm9wcyIsImNvbnRleHRNZW51SXRlbXMiLCJzZXRTdGF0ZSIsImNvbnRleHRNZW51T3BlbiIsImRvY3VtZW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIm9uRG9jdW1lbnRDbGljayIsIm5ld0NvbHVtbldpZHRoIiwiY29sdW1uS2V5IiwicmVzaXplQ29sdW1uIiwicm93SW5kZXgiLCJjb2wiLCJlIiwiY3JlYXRlIiwiZW5hYmxlQXJyb3dOYXZpZ2F0aW9uIiwiY2VsbFJlZnMiLCJjcmVhdGVDZWxsUmVmcyIsImFycm93S2V5cyIsIkRPV04iLCJVUCIsIkxFRlQiLCJSSUdIVCIsImNvbHVtbnMiLCJvbkxhc3RDZWxsVGFiUHJlc3MiLCJncmlkQ29sdW1ucyIsImdldENvbHVtbktleUJ5SW5kZXgiLCJpIiwiZ2V0Q29sdW1uS2V5Iiwicm93c1NpemUiLCJjdXJyZW50Q2VsbCIsInByb3h5IiwiaXNDdXJzb3JBdFN0YXJ0IiwidHlwZSIsInNlbGVjdGlvblN0YXJ0IiwiaXNDdXJzb3JBdEVuZCIsInNlbGVjdGlvbkVuZCIsInZhbHVlIiwibGVuZ3RoIiwic2VsZWN0UmVmIiwic2VsZWN0IiwiZ2V0U2VsZWN0UmVmIiwiaW5jbHVkZXMiLCJrZXlDb2RlIiwicHJldmVudERlZmF1bHQiLCJFTlRFUiIsIkVTQyIsImFkZE5ld0l0ZW0iLCJnZXRDb2x1bW5EZWZhdWx0VmFsdWVzIiwiZm9jdXNUb0NyZWF0ZUNlbGwiLCJuZXh0RWxlbWVudCIsIm1lbnVJc09wZW4iLCJtb3ZlQ2VsbEZvY3VzIiwiVEFCIiwiY29sdW1uSW5kIiwiZmluZEluZGV4IiwiYyIsInZhbHVlS2V5UGF0aCIsImpvaW4iLCJkaXNhYmxlZCIsInJvd0luZCIsInNoaWZ0S2V5Iiwib25DZWxsS2V5RG93biIsInZhbHVlUGFyc2VyIiwiZXZlbnRPckRhdGEiLCJyYXdWYWx1ZSIsInRhcmdldCIsInVuZGVmaW5lZCIsImZpbHRlckNlbGxWYWx1ZUNoYW5nZSIsInNlbGVjdGVkRmlsdGVycyIsImNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSIsImNvbXBvbmVudFR5cGUiLCJvbkNyZWF0ZVZhbHVlQ2hhbmdlIiwib25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUiLCJtYXRjaFZhbHVlIiwib25DcmVhdGVDZWxsVmFsdWVDaGFuZ2UiLCJuZXdWYWx1ZUtleVBhdGgiLCJ2IiwibmV3VmFsdWUiLCJ2YWxpZGF0b3JzIiwiY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUiLCJlZGl0Q2VsbFZhbHVlQ2hhbmdlIiwiZGF0YUlkIiwiZ2V0RGF0YUlkQnlSb3dJbmRleCIsIm9uRWRpdFZhbHVlQ2hhbmdlIiwib25FZGl0Q2VsbFZhbHVlQ2hhbmdlIiwiZWRpdENlbGxWYWx1ZVZhbGlkYXRlIiwic2VwYXJhdG9yIiwiUmVnRXhwIiwiZ2V0RWRpdEl0ZW1WYWx1ZSIsIm51bWVyaWNWYWx1ZSIsIk51bWJlciIsInJlcGxhY2UiLCJnZXRSZWdFeCIsInZhbHVlT3B0aW9ucyIsIm9uQ3JlYXRlQmx1ciIsIm9uRWRpdEJsdXIiLCJjZWxsVHlwZSIsImlucHV0VHlwZSIsImNlbGxTZWxlY3Rpb25DaGFuZ2UiLCJjZWxsU2VsZWN0IiwiY29tcG9uZW50IiwiaW5wdXRSZWYiLCJpZEtleVBhdGgiLCJpbmRleCIsIm9wdGlvbnMiLCJlZGl0VmFsdWUiLCJvcmlnaW5hbFZhbHVlIiwic2VsZWN0T3B0aW9ucyIsImZpbmQiLCJvYmoiLCJTdHJpbmciLCJ2YWwiLCJ0b0pTIiwibW9kZSIsImNvbXBvbmVudERpc2FibGVkIiwiZGlzYWJsZUVkaXRpbmciLCJkaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaCIsImdldENyZWF0ZUl0ZW1WYWx1ZSIsIm1hdGNoVmFsdWVLZXlQYXRoIiwicm93Q2xhc3NOYW1lcyIsImV4dHJhUm93Q291bnQiLCJwdXNoIiwiaW5kZXhPZiIsInJvd0NsYXNzTmFtZUdldHRlciIsInJldHVybkRhdGEiLCJpbmZvTWVzc2FnZSIsImVycm9yTWVzc2FnZSIsIndhcm5pbmdNZXNzYWdlIiwic2Nyb2xsVG9Sb3ciLCJzY3JvbGxOZXdSb3ciLCJzY3JvbGxJbkVkaXRNb2RlIiwiY3VycmVudFJvdyIsImdldFNlbGVjdGVkSXRlbUluZGV4IiwiZmlyc3QiLCJmb2N1c1RvIiwicHJldkZvY3VzVG8iLCJmb2N1c1RvTGFzdFJvdyIsInJlZiIsImZvY3VzIiwiZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZSIsImZvY3VzVG9FZGl0Q2VsbCIsInNlbGVjdGVkUm93SW5kZXgiLCJjb2x1bW5JbmRleCIsImVsZW1lbnRUeXBlcyIsImN1cnJlbnRDb2x1bW4iLCJzZXRUaW1lb3V0Iiwic2VsZWN0QWxsSXRlbXNDaGFuZ2UiLCJpdGVtU2VsZWN0aW9uQ2hhbmdlIiwiaW5saW5lRWRpdCIsImZpbHRlcmluZyIsImludGwiLCJzZWxlY3RDb21wb25lbnRPcHRpb25zIiwiZXh0cmFDb2x1bW4iLCJyb3dTZWxlY3RDaGVja2JveENvbHVtbiIsInNob3dTZWxlY3RBbGxDaGVja2JveCIsInRhYkluZGV4Iiwid2lkdGgiLCJpc1Jlc2l6YWJsZSIsImlzU29ydGFibGUiLCJjZWxsIiwidmFsdWVSZW5kZXIiLCJjZWxsRWRpdCIsImNlbGxDcmVhdGUiLCJjZWxsRmlsdGVyIiwiaGVhZGVyIiwiaGFuZGxlU2VsZWN0QWxsQ2hlY2tCb3hPbkNoYW5nZSIsInJvd0l0ZW0iLCJpdGVtSWQiLCJzZWxlY3RlZCIsImhhbmRsZVNlbGVjdGlvbkNoZWNrQm94T25DaGFuZ2UiLCJmb3JFYWNoIiwidmlzaWJsZUNvbHVtbktleSIsIm9yZ0NvbCIsInZhbHVlRW1wdHlDaGVja2VyIiwiZ2V0VmFsdWVFbXB0eUNoZWNrZXIiLCJmb3JtYXQiLCJpc1JlcXVpcmVkIiwiY29sdW1uIiwiYmFzZUNvbHVtbiIsImNvbHVtbkZ1bmN0aW9ucyIsImVkaXQiLCJnZXRJdGVtVmFsdWUiLCJvbkNlbGxWYWx1ZUNoYW5nZSIsIm9uQ2VsbEJsdXIiLCJvbkVkaXRDZWxsQmx1ciIsIm9uQ2VsbEZvY3VzIiwib25FZGl0Q2VsbEtleURvd24iLCJoYW5kbGVDZWxsUmVmIiwiaGFuZGxlRWRpdENlbGxSZWYiLCJvbkNyZWF0ZUNlbGxCbHVyIiwib25DcmVhdGVDZWxsS2V5RG93biIsImhhbmRsZUNyZWF0ZUNlbGxSZWYiLCJmaWx0ZXIiLCJnZXRGaWx0ZXJJdGVtVmFsdWUiLCJnZXRJdGVtTXVsdGlWYWx1ZSIsImdldEZpbHRlckl0ZW1NdWx0aVZhbHVlIiwib25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UiLCJvbkNlbGxNdWx0aVZhbHVlQmx1ciIsIm9uRmlsdGVyQ2VsbE11bHRpVmFsdWVCbHVyIiwib25DZWxsTXVsdGlWYWx1ZUNoYW5nZSIsIm9uRmlsdGVyQ2VsbE11bHRpVmFsdWVDaGFuZ2UiLCJjZWxsUHJvcHMiLCJjb2x1bW5DZWxsIiwiY29tcG9uZW50VHlwZVByb3BzIiwiY29sdW1uQ29tcG9uZW50VHlwZSIsInBhZGRpbmciLCJyZW1vdmVOZXdJdGVtIiwiZm9jdXNUb0Vycm9yQ2VsbCIsInJvd1NlbGVjdCIsImN0cmxLZXkiLCJnZXRTZWxlY3Rpb24iLCJyZW1vdmVBbGxSYW5nZXMiLCJwYXJlbnROb2RlIiwicGFyZW50MWNsYXNzIiwiY2xhc3NOYW1lIiwicGFyZW50MmNsYXNzIiwicGFyZW50M2NsYXNzIiwicGFyZW50NGNsYXNzIiwibXVsdGlTZWxlY3QiLCJvblJvd0NsaWNrIiwic3RvcFByb3BhZ2F0aW9uIiwiY29udGV4dE1lbnVYIiwiY2xpZW50WCIsImNvbnRleHRNZW51WSIsImNsaWVudFkiLCJhZGRFdmVudExpc3RlbmVyIiwib25DbGljayIsInNlbGVjdGVkRGF0YSIsInJvd0hlaWdodEdldHRlciIsImV4aXN0aW5nUm93c0luZGV4IiwiaXNTcGVjaWFsIiwiZ2V0Um93SW5kZXgiLCJtZXNzYWdlRGF0YSIsImdldENlbGxNZXNzYWdlcyIsImlzRWRpdGVkIiwiaXNDZWxsRWRpdGVkIiwic3R5bGUiLCJoYW5kbGVDZWxsU2VsZWN0IiwidGV4dEFsaWduIiwiZ2VuZXJhdGVDb2x1bW5zIiwibGVuZ2h0IiwibWFwIiwic29ydENoYW5nZSIsInJlbmRlckNlbGwiLCJtaW5XaWR0aCIsIm1heFdpZHRoIiwiZmxleEdyb3ciLCJmaXhlZCIsImZpeGVkUmlnaHQiLCJhbGxvd0NlbGxzUmVjeWNsaW5nIiwiZGlzcGxheSIsInpJbmRleCIsInBvc2l0aW9uIiwidG9wIiwibGVmdCIsImQiLCJpdGVtIiwiZGl2aWRlciIsInRpdGxlIiwiaGFuZGxlQ29udGV4dE1lbnVJdGVtQ2xpY2siLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImludmFsaWRhdGUiLCJyZW5kZXIiLCJncmlkQ2xhc3NOYW1lIiwiZGlzYWJsZUFjdGlvbkJhciIsInNldEZvY3VzVG8iLCJhY3Rpb25CYXIiLCJhY3Rpb25CYXJSaWdodCIsImFjdGlvbkJhckxlZnQiLCJyZW1vdmluZyIsImRpc2FibGVEcm9wZG93biIsImRpc2FibGVGaWx0ZXJpbmdDb250cm9scyIsImhhbmRsZUFmdGVyQWRkSXRlbSIsImhhbmRsZUFmdGVyRWRpdFByZXNzIiwiaGFuZGxlQWZ0ZXJWYWxpZGF0aW9uRXJyb3IiLCJkcm9wZG93bk1lbnVJdGVtcyIsImNvbHVtblNldHRpbmdzIiwiZ3JpZEhlYWRlciIsInJvd3NDb3VudCIsImNvbnRhaW5lclN0eWxlIiwicmVuZGVyQ29udGV4dE1lbnUiLCJoZWFkZXJIZWlnaHQiLCJmaWx0ZXJSb3dIZWlnaHQiLCJyb3dIZWlnaHQiLCJvbkNvbHVtblJlc2l6ZUVuZENhbGxiYWNrIiwiaGFuZGxlUm93Q2xpY2siLCJzY3JvbGxUb0NvbHVtbiIsInNjcm9sbFRvcCIsImdldFNjcm9sbFRvUm93Iiwib25Sb3dEb3VibGVDbGljayIsIm9uTW91c2VEb3duIiwib25Sb3dNb3VzZUVudGVyIiwib25Sb3dNb3VzZUxlYXZlIiwib25TY3JvbGxTdGFydCIsIm9uU2Nyb2xsRW5kIiwiZ2V0Um93Q2xhc3NOYW1lIiwiaGFuZGxlUm93SGVpZ2h0R2V0dGVyIiwib25Db250ZW50SGVpZ2h0Q2hhbmdlIiwiaGFuZGxlQ29udGV4dE1lbnUiLCJyZW5kZXJDb2x1bW5zIiwiY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsIiwic2F2ZUNvbHVtblNldHRpbmdzIiwiY2hpbGRyZW4iLCJQdXJlQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTtBQUNBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxTQUFTQyxHQUFULEVBQWNDLElBQWQsUUFBMEIsV0FBMUI7QUFDQSxTQUFTQyxPQUFULFFBQXdCLGFBQXhCO0FBQ0EsU0FBU0MsVUFBVCxFQUFxQkMsZ0JBQWdCLElBQUlDLENBQXpDLFFBQWtELFlBQWxEO0FBQ0EsU0FBU0MsTUFBVCxFQUFpQkMsSUFBakIsUUFBNkIsb0JBQTdCO0FBQ0EsU0FBU0MsUUFBVCxRQUF5QixpQkFBekI7QUFDQSxPQUFPQyxVQUFQLE1BQXVCLFlBQXZCO0FBQ0EsU0FBU0MsSUFBVCxRQUFxQix5QkFBckI7QUFDQSxPQUFPQyxPQUFQLE1BQW9CLDJCQUFwQjtBQUNBLE9BQU9DLFFBQVAsTUFBcUIsNEJBQXJCO0FBQ0EsT0FBTyw4Q0FBUDtBQUVBLE9BQU9DLHdCQUFQLE1BQXFDLHlDQUFyQztBQUNBLE9BQU9DLFVBQVAsTUFBdUIseUJBQXZCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQix3QkFBdEI7QUFDQSxPQUFPQyxrQkFBUCxNQUErQixrQ0FBL0I7QUFDQSxPQUFPQyxpQkFBUCxNQUE4QixnQ0FBOUI7QUFDQSxPQUFPQyxnQkFBUCxNQUE2QiwrQkFBN0I7QUFDQSxPQUFPLEtBQUtDLGVBQVosTUFBaUMsb0JBQWpDO0FBQ0EsT0FBT0MsV0FBUCxNQUF3QiwwQkFBeEI7QUFDQSxPQUFPQyxtQkFBUCxNQUFnQyw2Q0FBaEM7QUFDQSxTQUFTQyxTQUFULEVBQW9CQyxZQUFwQixRQUF3QyxrQkFBeEM7QUFDQSxTQUFTQyxTQUFULFFBQTBCLHNCQUExQjtB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LGNBSDdCO0FBSUUsTUFBQSx3QkFBd0IsRUFBRSxLQUFLNEIsS0FBTCxDQUFXNFMsd0JBSnZDO0FBS0UsTUFBQSxrQkFBa0IsRUFBRSxLQUFLNVMsS0FBTCxDQUFXNlM7QUFMakMsTUF0Q0osRUE4Q0csS0FBSzdTLEtBQUwsQ0FBVzhTLFFBOUNkLENBREY7QUFrREQsRzs7O0VBLzFDb0J0WCxLQUFLLENBQUN1WCxhLDRDQUdML1YsWTtBQSsxQ3hCLGVBQWUrQyxRQUFmIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcHJlZmVyLWRlc3RydWN0dXJpbmcgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLWxvbmVseS1pZiwgcHJlZmVyLXRlbXBsYXRlLCByZWFjdC9yZXF1aXJlLWRlZmF1bHQtcHJvcHMgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBNYXAsIExpc3QgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IGluamVjdEludGwsIEZvcm1hdHRlZE1lc3NhZ2UgYXMgTSB9IGZyb20gJ3JlYWN0LWludGwnO1xuaW1wb3J0IHsgQ29sdW1uLCBDZWxsIH0gZnJvbSAnZml4ZWQtZGF0YS10YWJsZS0yJztcbmltcG9ydCB7IE1lbnVJdGVtIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHsgSWNvbiB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWljb25zJztcbmltcG9ydCBTcGlubmVyIGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXNwaW5uZXInO1xuaW1wb3J0IENoZWNrYm94IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWNoZWNrYm94JztcbmltcG9ydCAnZml4ZWQtZGF0YS10YWJsZS0yL2Rpc3QvZml4ZWQtZGF0YS10YWJsZS5jc3MnO1xuXG5pbXBvcnQgUmVzcG9uc2l2ZUZpeGVkRGF0YVRhYmxlIGZyb20gJy4vcmVzcG9uc2l2ZS1maXhlZC1kYXRhLXRhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgSGVhZGVyQ2VsbCBmcm9tICcuL2hlYWRlci1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgQWN0aW9uQmFyIGZyb20gJy4vYWN0aW9uLWJhci5jb21wb25lbnQnO1xuaW1wb3J0IElubGluZUVkaXRDb250cm9scyBmcm9tICcuL2lubGluZS1lZGl0LWNvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgRmlsdGVyaW5nQ29udHJvbHMgZnJvbSAnLi9maWx0ZXJpbmctY29udHJvbHMuY29tcG9uZW50JztcbmltcG9ydCBEcm9wZG93bkNvbnRyb2xzIGZyb20gJy4vZHJvcGRvd24tY29udHJvbHMuY29tcG9uZW50JztcbmltcG9ydCAqIGFzIGRhdGFncmlkQWN0aW9ucyBmcm9tICcuL2RhdGFncmlkLmFjdGlvbnMnO1xuaW1wb3J0IENlbGxUb29sdGlwIGZyb20gJy4vY2VsbC10b29sdGlwLmNvbXBvbmVudCc7XG5pbXBvcnQgQ29sdW1uU2V0dGluZ3NNb2RhbCBmcm9tICcuL2NvbHVtbi1zZXR0aW5ncy9jb2x1bW4tc2V0dGluZ3MuY29tcG9uZW50JztcbmltcG9ydCB7IHByb3BUeXBlcywgZGVmYXVsdFByb3BzIH0gZnJvbSAnLi9kYXRhZ3JpZC5wcm9wcyc7XG5pbXBvcnQgeyBLRVlfQ09ERVMgfSBmcm9tICcuL2RhdGFncmlkLmNvbnN0YW50cyc7XG5pbXBvcnQgcGFnaW5hdGlvbiBmcm9tICcuL3BhZ2luYXRpb24uY29tcG9uZW50JztcbmltcG9ydCBVdGlscyBmcm9tICcuL2RhdGFncmlkLnV0aWxzJztcbmltcG9ydCBHcmlkQ29sdW1uU2VydmljZSBmcm9tICcuL2NvbHVtbi1zZXJ2aWNlL2NvbHVtbi1zZXJ2aWNlJztcbmltcG9ydCAnLi9kYXRhZ3JpZC5jb21wb25lbnQuc2Nzcyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSwgb3duUHJvcHMpID0+IHtcbiAgY29uc3QgR1JJRCA9IG93blByb3BzLmdyaWQ7XG4gIHJldHVybiB7XG4gICAgaXNCdXN5OiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnaXNCdXN5J10sIHRydWUpLFxuICAgIGlzRWRpdGluZzogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2lzRWRpdGluZyddLCBmYWxzZSksXG4gICAgaXNDcmVhdGluZzogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2lzQ3JlYXRpbmcnXSwgZmFsc2UpLFxuICAgIGlzRmlsdGVyaW5nOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2lzRmlsdGVyaW5nJ10sIGZhbHNlKSxcbiAgICBpc0NvbHVtblNldHRpbmdzTW9kYWxPcGVuOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihcbiAgICAgIFtHUklELmlkLCAnc2Vzc2lvbicsICdjb2x1bW5TZXR0aW5nc01vZGFsJywgJ29wZW4nXSxcbiAgICAgIGZhbHNlLFxuICAgICksXG4gICAgc29ydENvbHVtbjogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnc29ydGluZ0RhdGEnLCAnc29ydENvbHVtbiddLCBudWxsKSxcbiAgICBzb3J0T3JkZXI6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ3NvcnRpbmdEYXRhJywgJ3NvcnRPcmRlciddLCBudWxsKSxcbiAgICB2aXNpYmxlQ29sdW1uczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAndmlzaWJsZUNvbHVtbnMnXSwgTGlzdCgpKSxcbiAgICBjb2x1bW5XaWR0aHM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ2NvbHVtbldpZHRocyddLCBNYXAoKSksXG4gICAgc2VsZWN0ZWRDZWxsOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3NlbGVjdGVkQ2VsbCddLCBNYXAoKSksXG4gICAgc2VsZWN0ZWRJdGVtczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZWxlY3RlZEl0ZW1zJ10sIExpc3QoKSksXG4gICAgZGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdkYXRhJ10sIExpc3QoKSksXG4gICAgZWRpdERhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnZWRpdERhdGEnXSwgTWFwKCkpLFxuICAgIGNyZWF0ZURhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY3JlYXRlRGF0YSddLCBMaXN0KCkpLFxuICAgIGZpbHRlckRhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnZmlsdGVyRGF0YSddLCBNYXAoKSksXG4gICAgY2VsbE1lc3NhZ2VzOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NlbGxNZXNzYWdlcyddLCBNYXAoKSksXG4gICAgY3JlYXRlQ2VsbE1lc3NhZ2VzOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NyZWF0ZUNlbGxNZXNzYWdlcyddLCBNYXAoKSksXG4gICAgYWxsRGF0YVNpemU6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnYWxsRGF0YSddLCBMaXN0KCkpLnNpemUsXG4gICAgbGFuZ3VhZ2U6IFV0aWxzLmdldExhbmd1YWdlKEdSSUQsIHN0YXRlLnVzZXIpLFxuICAgIHJlZ2lvbjogVXRpbHMuZ2V0UmVnaW9uKEdSSUQsIHN0YXRlLnVzZXIpLFxuICAgIGRhdGVGb3JtYXQ6IFV0aWxzLmdldERhdGVGb3JtYXQoR1JJRCwgc3RhdGUudXNlciksXG4gICAgdGhvdXNhbmRTZXBhcmF0b3I6IFV0aWxzLmdldFRob3VzYW5kU2VwYXJhdG9yKEdSSUQsIHN0YXRlLnVzZXIpLFxuICAgIGRlY2ltYWxTZXBhcmF0b3I6IFV0aWxzLmdldERlY2ltYWxTZXBhcmF0b3IoR1JJRCwgc3RhdGUudXNlciksXG4gICAgZm9yY2VSZWZyZXNoVGltZXN0YW1wOiBzdGF0ZS5kYXRhZ3JpZC5nZXQoJ2ZvcmNlUmVmcmVzaCcsIDApLCAvLyBmb3JjZSByZS1yZW5kZXIgd2hlbiBjaGFuZ2VkXG4gICAgZm9jdXNUeXBlOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnZm9jdXNUeXBlJ10sIE1hcCgpKSxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRhdGFncmlkQWN0aW9ucztcblxuQHBhZ2luYXRpb25cbkBpbmplY3RJbnRsXG5AY29ubmVjdChcbiAgbWFwU3RhdGVUb1Byb3BzLFxuICBtYXBEaXNwYXRjaFRvUHJvcHMsXG4pXG5jbGFzcyBEYXRhR3JpZCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0gcHJvcFR5cGVzO1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGN1cnJlbnRSb3c6IDAsXG4gICAgICBjdXJyZW50Q29sdW1uOiAwLFxuICAgICAgY29udGV4dE1lbnVPcGVuOiBmYWxzZSxcbiAgICAgIGNvbnRleHRNZW51WDogbnVsbCxcbiAgICAgIGNvbnRleHRNZW51WTogbnVsbCxcbiAgICB9O1xuICAgIHRoaXMuY2VsbFJlZnMgPSB7fTtcbiAgICB0aGlzLmNyZWF0ZUNlbGxSZWZzID0ge307XG4gICAgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCA9IGZhbHNlO1xuICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gZmFsc2U7IC8vIFRPRE86IEhhbmRsZSBmb2N1c2luZyB3aGVuIHRydWVcbiAgICB0aGlzLmZvY3VzVG9FcnJvckNlbGwgPSBmYWxzZTsgLy8gVE9ETzogSGFuZGxlIGZvY3VzaW5nIHdoZW4gdHJ1ZVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uRG9jdW1lbnRDbGljayk7XG4gICAgdGhpcy5wcm9wcy5pbnZhbGlkYXRlKHRoaXMucHJvcHMuZ3JpZCk7XG4gIH1cblxuICBvbkRvY3VtZW50Q2xpY2sgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuY29udGV4dE1lbnVJdGVtcykge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGNvbnRleHRNZW51T3BlbjogZmFsc2UsXG4gICAgICB9KTtcbiAgICB9XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uRG9jdW1lbnRDbGljayk7XG4gIH07XG5cbiAgb25Db2x1bW5SZXNpemVFbmRDYWxsYmFjayA9IChuZXdDb2x1bW5XaWR0aCwgY29sdW1uS2V5KSA9PiB7XG4gICAgdGhpcy5wcm9wcy5yZXNpemVDb2x1bW4odGhpcy5wcm9wcy5ncmlkLCBjb2x1bW5LZXksIG5ld0NvbHVtbldpZHRoKTtcbiAgfTtcblxuICAvKipcbiAgICogQHBhcmFtIHJvd0luZGV4IChpbnQpXG4gICAqIEBwYXJhbSBjb2wgKG9iaikuIENvbHVtbiBvYmplY3QuXG4gICAqIEBwYXJhbSBlLiBPcmlnaW5hbCBLZXlEb3duIGV2ZW50XG4gICAqIEBwYXJhbSBjcmVhdGUgKGJvb2wpLiBJcyB0aGUgY2VsbCBjcmVhdGUgY2VsbCBvciBlZGl0IGNlbGw/XG4gICAqL1xuICBvbkNlbGxLZXlEb3duID0gKHJvd0luZGV4LCBjb2wsIGUsIGNyZWF0ZSA9IGZhbHNlKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuZW5hYmxlQXJyb3dOYXZpZ2F0aW9uKSB7XG4gICAgICBjb25zdCBjZWxsUmVmcyA9IGNyZWF0ZSA/IHRoaXMuY3JlYXRlQ2VsbFJlZnMgOiB0aGlzLmNlbGxSZWZzO1xuICAgICAgY29uc3QgYXJyb3dLZXlzID0gW0tFWV9DT0RFUy5ET1dOLCBLRVlfQ09ERVMuVVAsIEtFWV9DT0RFUy5MRUZULCBLRVlfQ09ERVMuUklHSFRdO1xuICAgICAgY29uc3Qge1xuICAgICAgICBjb2x1bW5zLCB2aXNpYmxlQ29sdW1ucywgZ3JpZCwgZGF0YSwgb25MYXN0Q2VsbFRhYlByZXNzLFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCBncmlkQ29sdW1ucyA9IFV0aWxzLnZpc2libGVDb2x1bW5zKGNvbHVtbnMsIHZpc2libGVDb2x1bW5zKTtcbiAgICAgIGNvbnN0IGdldENvbHVtbktleUJ5SW5kZXggPSBpID0+IFV0aWxzLmdldENvbHVtbktleShncmlkQ29sdW1uc1tpXSk7XG4gICAgICBjb25zdCByb3dzU2l6ZSA9IGRhdGEuc2l6ZTtcbiAgICAgIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2wpO1xuICAgICAgbGV0IGN1cnJlbnRDZWxsID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtjb2x1bW5LZXl9XyR7cm93SW5kZXh9YF07XG4gICAgICBsZXQgcHJveHkgPSBudWxsO1xuXG4gICAgICBjb25zdCBpc0N1cnNvckF0U3RhcnQgPSAoKSA9PiB7XG4gICAgICAgIGlmIChjdXJyZW50Q2VsbC50eXBlICE9PSAndGV4dCcpIHJldHVybiB0cnVlO1xuICAgICAgICByZXR1cm4gY3VycmVudENlbGwuc2VsZWN0aW9uU3RhcnQgPT09IDA7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBpc0N1cnNvckF0RW5kID0gKCkgPT4ge1xuICAgICAgICBpZiAoY3VycmVudENlbGwudHlwZSAhPT0gJ3RleHQnKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRDZWxsLnNlbGVjdGlvbkVuZCA9PT0gY3VycmVudENlbGwudmFsdWUubGVuZ3RoO1xuICAgICAgfTtcblxuICAgICAgLy8gSWYgY3VycmVudCBjZWxsIGhvbGRzIGEgcmVhY3QtZmxvYXRpbmctc2VsZWN0IGNvbXBvbmVudFxuICAgICAgaWYgKGN1cnJlbnRDZWxsICYmIChjdXJyZW50Q2VsbC5zZWxlY3RSZWYgfHwgdHlwZW9mIGN1cnJlbnRDZWxsLnNlbGVjdCA9PT0gJ29iamVjdCcpKSB7XG4gICAgICAgIHByb3h5ID0gY3VycmVudENlbGw7XG4gICAgICAgIGN1cnJlbnRDZWxsID0gdGhpcy5nZXRTZWxlY3RSZWYocHJveHkpO1xuICAgICAgfVxuXG4gICAgICAvLyBQcmV2ZW50cyB1cC9kb3duIGFycm93IGZyb20gY2hhbmdpbmcgbnVtYmVyIGZpZWxkIHZhbHVlXG4gICAgICBpZiAoYXJyb3dLZXlzLmluY2x1ZGVzKGUua2V5Q29kZSkgJiYgY3VycmVudENlbGwudHlwZSA9PT0gJ251bWJlcicpIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLkVOVEVSOlxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5FU0M6IHtcbiAgICAgICAgICBpZiAoY3JlYXRlICYmIGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLkVOVEVSKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmFkZE5ld0l0ZW0oZ3JpZCwgVXRpbHMuZ2V0Q29sdW1uRGVmYXVsdFZhbHVlcyhjb2x1bW5zKSk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjdXJyZW50Q2VsbC5zZWxlY3QoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5ET1dOOiB7XG4gICAgICAgICAgbGV0IG5leHRFbGVtZW50ID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtjb2x1bW5LZXl9XyR7cm93SW5kZXggKyAxfWBdO1xuXG4gICAgICAgICAgLy8gUHJldmVudHMgbWVudSBmcm9tIG9wZW5pbmdcbiAgICAgICAgICBpZiAocHJveHkgJiYgcHJveHkuc2VsZWN0UmVmICYmICFwcm94eS5zZWxlY3RSZWYuc3RhdGUubWVudUlzT3Blbikge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKCFuZXh0RWxlbWVudCkgYnJlYWs7XG4gICAgICAgICAgICBuZXh0RWxlbWVudCA9IHRoaXMuZ2V0U2VsZWN0UmVmKG5leHRFbGVtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5tb3ZlQ2VsbEZvY3VzKG5leHRFbGVtZW50LCByb3dJbmRleCArIDEsIC0xKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5VUDoge1xuICAgICAgICAgIGxldCBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4IC0gMX1gXTtcblxuICAgICAgICAgIC8vIFByZXZlbnRzIG1lbnUgZnJvbSBvcGVuaW5nXG4gICAgICAgICAgaWYgKHByb3h5ICYmIHByb3h5LnNlbGVjdFJlZiAmJiAhcHJveHkuc2VsZWN0UmVmLnN0YXRlLm1lbnVJc09wZW4pIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmICghbmV4dEVsZW1lbnQpIGJyZWFrO1xuICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSB0aGlzLmdldFNlbGVjdFJlZihuZXh0RWxlbWVudCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubW92ZUNlbGxGb2N1cyhuZXh0RWxlbWVudCwgcm93SW5kZXggLSAxLCAtMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuVEFCOlxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5SSUdIVDpcbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuTEVGVDoge1xuICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5SSUdIVCAmJiAhaXNDdXJzb3JBdEVuZCgpKSBicmVhaztcbiAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuTEVGVCAmJiAhaXNDdXJzb3JBdFN0YXJ0KCkpIGJyZWFrO1xuXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgbGV0IGNvbHVtbkluZCA9IGdyaWRDb2x1bW5zLmZpbmRJbmRleChjID0+IGMudmFsdWVLZXlQYXRoLmpvaW4oJy8nKSA9PT0gY29sdW1uS2V5KTtcbiAgICAgICAgICBpZiAoY29sdW1uSW5kICE9PSAtMSkge1xuICAgICAgICAgICAgbGV0IGRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCBuZXh0RWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICBsZXQgcm93SW5kID0gcm93SW5kZXg7XG4gICAgICAgICAgICB3aGlsZSAoZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgLy8gTW92aW5nIHRvIHRoZSBsZWZ0XG4gICAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5MRUZUIHx8IChlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5UQUIgJiYgZS5zaGlmdEtleSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29sdW1uSW5kIC0gMSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgLT0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJvd0luZCAtIDEgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kID0gZ3JpZENvbHVtbnMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAgIHJvd0luZCAtPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gTW92aW5nIHRvIHRoZSByaWdodFxuICAgICAgICAgICAgICAgIGlmIChjb2x1bW5JbmQgKyAxIDwgZ3JpZENvbHVtbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgKz0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJvd0luZCArIDEgPCByb3dzU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kID0gMDtcbiAgICAgICAgICAgICAgICAgIHJvd0luZCArPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm93SW5kICsgMSA9PT0gcm93c1NpemUpIHtcbiAgICAgICAgICAgICAgICAgIC8vIElmIHRyeWluZyB0byBzZWxlY3QgYSByb3csIHdoZW4gdGhlcmUgaXMgbm9uZTpcbiAgICAgICAgICAgICAgICAgIGlmIChvbkxhc3RDZWxsVGFiUHJlc3MgJiYgZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuVEFCKSBvbkxhc3RDZWxsVGFiUHJlc3MoZSk7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Z2V0Q29sdW1uS2V5QnlJbmRleChjb2x1bW5JbmQpfV8ke3Jvd0luZH1gXTtcblxuICAgICAgICAgICAgICAvLyBJZiB3ZSBjYW5ub3QgZm9jdXMgb24gdGhlIG5leHQgZWxlbWVudCB3aGlsZSBtb3ZpbmcgdG8gdGhlIHJpZ2h0XG4gICAgICAgICAgICAgIGlmICghbmV4dEVsZW1lbnQgJiYgZS5rZXlDb2RlICE9PSBLRVlfQ09ERVMuTEVGVCkge1xuICAgICAgICAgICAgICAgIC8vIElmIHdlJ3JlIG5vdCB5ZXQgaW4gdGhlIGxhc3QgZm9jdXNhYmxlIGNvbHVtblxuICAgICAgICAgICAgICAgIGlmIChjb2x1bW5JbmQgPD0gZ3JpZENvbHVtbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICB3aGlsZSAoY29sdW1uSW5kIDw9IGdyaWRDb2x1bW5zLmxlbmd0aCAmJiAhbmV4dEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2dldENvbHVtbktleUJ5SW5kZXgoY29sdW1uSW5kKX1fJHtyb3dJbmR9YF07XG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCArPSAxO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHdlIGFyZSBpbiB0aGUgbGFzdCBjb2x1bW4gYW5kIHdlIGRvbid0IGhhdmUgYW4gZWxlbWVudCB0byBmb2N1cyBvbixcbiAgICAgICAgICAgICAgICAgICAgLy8gd2UgbXVzdCBtb3ZlIHRvIHRoZSBuZXh0IHJvdyAoaWYgcG9zc2libGUpXG4gICAgICAgICAgICAgICAgICAgIGlmICghbmV4dEVsZW1lbnQgJiYgY29sdW1uSW5kID09PSBncmlkQ29sdW1ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB0cnlpbmcgdG8gc2VsZWN0IGEgcm93LCB3aGVuIHRoZXJlIGlzIG5vbmU6XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHJvd0luZCArIDEgPT09IHJvd3NTaXplKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob25MYXN0Q2VsbFRhYlByZXNzICYmIGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLlRBQikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkxhc3RDZWxsVGFiUHJlc3MoZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgIHJvd0luZCArPSAxO1xuICAgICAgICAgICAgICAgICAgICAgIG5leHRFbGVtZW50ID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtnZXRDb2x1bW5LZXlCeUluZGV4KGNvbHVtbkluZCl9XyR7cm93SW5kfWBdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIElmIHdlIGNhbm5vdCBmb2N1cyBvbiB0aGUgbmV4dCBlbGVtZW50IHdoaWxlIG1vdmluZyB0byB0aGUgbGVmdFxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFuZXh0RWxlbWVudCAmJiBlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5MRUZUKSB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGNvbHVtbkluZCA+IDAgJiYgIW5leHRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgLT0gMTtcbiAgICAgICAgICAgICAgICAgIG5leHRFbGVtZW50ID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtnZXRDb2x1bW5LZXlCeUluZGV4KGNvbHVtbkluZCl9XyR7cm93SW5kfWBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBpZiBubyBlbGVtZW50IHdhcyBmb3VuZCwgdHJ5IG1vdmluZyB0byBwcmV2aW91cyByb3dcbiAgICAgICAgICAgICAgICAvLyAobmVlZGVkIGluIGNhc2UgZmlyc3QgY29sdW1uIGlzIG5vdCBlZGl0YWJsZSBlLmcuIGFuIEV4dHJhQ29sdW1uKVxuICAgICAgICAgICAgICAgIGlmIChyb3dJbmQgPiAwICYmICFuZXh0RWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kID0gZ3JpZENvbHVtbnMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAgIHJvd0luZCAtPSAxO1xuICAgICAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2dldENvbHVtbktleUJ5SW5kZXgoY29sdW1uSW5kKX1fJHtyb3dJbmR9YF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGRpc2FibGVkID0gbmV4dEVsZW1lbnQgPyBuZXh0RWxlbWVudC5kaXNhYmxlZCA6IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFkaXNhYmxlZCAmJiBuZXh0RWxlbWVudCkge1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIG5leHRFbGVtZW50LnNlbGVjdCA9PT0gJ29iamVjdCcgfHwgbmV4dEVsZW1lbnQuc2VsZWN0UmVmKSB7XG4gICAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSB0aGlzLmdldFNlbGVjdFJlZihuZXh0RWxlbWVudCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy5tb3ZlQ2VsbEZvY3VzKG5leHRFbGVtZW50LCByb3dJbmQsIGNvbHVtbkluZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIG9uRWRpdENlbGxLZXlEb3duID0gKHJvd0luZGV4LCBjb2wpID0+IChlKSA9PiB7XG4gICAgdGhpcy5vbkNlbGxLZXlEb3duKHJvd0luZGV4LCBjb2wsIGUpO1xuICB9O1xuXG4gIG9uQ3JlYXRlQ2VsbEtleURvd24gPSAocm93SW5kZXgsIGNvbCkgPT4gKGUpID0+IHtcbiAgICB0aGlzLm9uQ2VsbEtleURvd24ocm93SW5kZXgsIGNvbCwgZSwgdHJ1ZSk7XG4gIH07XG5cbiAgb25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UgPSAoY29sLCB2YWx1ZVBhcnNlcikgPT4gKGV2ZW50T3JEYXRhKSA9PiB7XG4gICAgbGV0IHJhd1ZhbHVlO1xuICAgIC8vIGV2ZW50T3JEYXRhIGNhbiBiZSBpbnB1dCBvbkNoYW5nZSBldmVudCwgcmVhY3Qtc2VsZWN0IG9uQ2hhbmdlIG9yIHJlYWN0LWRheS1waWNrZXIgb25DaGFuZ2VcbiAgICBpZiAoZXZlbnRPckRhdGEpIHtcbiAgICAgIGlmIChldmVudE9yRGF0YS50YXJnZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnRPckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSB2YWx1ZVBhcnNlcihyYXdWYWx1ZSk7XG4gICAgdGhpcy5wcm9wcy5maWx0ZXJDZWxsVmFsdWVDaGFuZ2UodGhpcy5wcm9wcy5ncmlkLCB0aGlzLnByb3BzLmNvbHVtbnMsIGNvbCwgdmFsdWUpO1xuICB9O1xuXG4gIG9uRmlsdGVyQ2VsbE11bHRpVmFsdWVCbHVyID0gY29sID0+ICgpID0+IHtcbiAgICBjb25zdCBjb2x1bW5LZXkgPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sKTtcbiAgICBjb25zdCB7IGNvbHVtbnMsIGZpbHRlckNlbGxWYWx1ZUNoYW5nZSwgZ3JpZCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzZWxlY3RlZEZpbHRlcnMgPSB0aGlzLnN0YXRlW2NvbHVtbktleV07XG4gICAgaWYgKHNlbGVjdGVkRmlsdGVycykge1xuICAgICAgZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlKGdyaWQsIGNvbHVtbnMsIGNvbCwgc2VsZWN0ZWRGaWx0ZXJzKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBbY29sdW1uS2V5XTogdW5kZWZpbmVkIH0pO1xuICAgIH1cbiAgfTtcblxuICBvbkZpbHRlckNlbGxNdWx0aVZhbHVlQ2hhbmdlID0gKGNvbCwgdmFsdWVQYXJzZXIpID0+IChkYXRhID0gW10pID0+IHtcbiAgICAvLyBkYXRhIGlzIGlucHV0IG9mIHJlYWN0LXNlbGVjdCBvbkNoYW5nZVxuICAgIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2wpO1xuICAgIGNvbnN0IHNlbGVjdGVkRmlsdGVycyA9IHRoaXMuc3RhdGVbY29sdW1uS2V5XTtcbiAgICBpZiAoIXNlbGVjdGVkRmlsdGVycyAmJiBkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgLy8gZW5kcyB1cCBoZXJlIGluIGNhc2Ugb2YgY2xlYXIgYnV0dG9uXG4gICAgICBjb25zdCB7IGNvbHVtbnMsIGZpbHRlckNlbGxWYWx1ZUNoYW5nZSwgZ3JpZCB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGZpbHRlckNlbGxWYWx1ZUNoYW5nZShncmlkLCBjb2x1bW5zLCBjb2wsIGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHZhbHVlUGFyc2VyKGRhdGEpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IFtjb2x1bW5LZXldOiB2YWx1ZSB9KTtcbiAgICB9XG4gIH07XG5cbiAgb25DcmVhdGVDZWxsVmFsdWVDaGFuZ2UgPSAocm93SW5kZXgsIGNvbCwgdmFsdWVQYXJzZXIpID0+IChldmVudE9yRGF0YSkgPT4ge1xuICAgIGNvbnN0IHsgY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlLCBncmlkIH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCByYXdWYWx1ZTtcbiAgICAvLyBldmVudE9yRGF0YSBjYW4gYmUgaW5wdXQgb25DaGFuZ2UgZXZlbnQsIHJlYWN0LXNlbGVjdCBvbkNoYW5nZSBvciByZWFjdC1kYXktcGlja2VyIG9uQ2hhbmdlXG4gICAgaWYgKGV2ZW50T3JEYXRhKSB7XG4gICAgICBpZiAoZXZlbnRPckRhdGEudGFyZ2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YS50YXJnZXQudmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50T3JEYXRhLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YS52YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGE7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlID0gdmFsdWVQYXJzZXIocmF3VmFsdWUpO1xuXG4gICAgY29uc3QgeyBjb21wb25lbnRUeXBlIH0gPSBjb2w7XG4gICAgc3dpdGNoIChjb21wb25lbnRUeXBlKSB7XG4gICAgICBjYXNlICdjdXJyZW5jeSc6XG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAndGV4dCc6IHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGNyZWF0ZUNlbGxWYWx1ZUNoYW5nZShncmlkLCByb3dJbmRleCwgY29sLnZhbHVlS2V5UGF0aCwgdmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNvbC5vbkNyZWF0ZVZhbHVlQ2hhbmdlKSB7XG4gICAgICBjb2wub25DcmVhdGVWYWx1ZUNoYW5nZSh2YWx1ZSwgY29sLnZhbHVlS2V5UGF0aCwgcm93SW5kZXgpO1xuICAgIH1cbiAgICBpZiAoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlICYmIHZhbHVlID09PSBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubWF0Y2hWYWx1ZSkge1xuICAgICAgLy8gQ2FsbCBzcGVjaWFsIHBhaXJlZCB2YWx1ZSBjaGFuZ2Ugb24gb3RoZXIgY2VsbCBpZiB2YWx1ZSBtYXRjaGVzXG4gICAgICB0aGlzLm9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlKFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgeyB2YWx1ZUtleVBhdGg6IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5uZXdWYWx1ZUtleVBhdGggfSxcbiAgICAgICAgdiA9PiB2LFxuICAgICAgKShjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY29sLnZhbGlkYXRvcnMpIHtcbiAgICAgIHRoaXMucHJvcHMuY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUoXG4gICAgICAgIHRoaXMucHJvcHMuZ3JpZCxcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIGNvbC52YWx1ZUtleVBhdGgsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBjb2wudmFsaWRhdG9ycyxcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIG9uRWRpdENlbGxWYWx1ZUNoYW5nZSA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGV2ZW50T3JEYXRhKSA9PiB7XG4gICAgY29uc3QgeyBlZGl0Q2VsbFZhbHVlQ2hhbmdlLCBncmlkIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGRhdGFJZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgbGV0IHJhd1ZhbHVlO1xuICAgIC8vIGV2ZW50T3JEYXRhIGNhbiBiZSBpbnB1dCBvbkNoYW5nZSBldmVudCwgcmVhY3Qtc2VsZWN0IG9uQ2hhbmdlIG9yIHJlYWN0LWRheS1waWNrZXIgb25DaGFuZ2VcbiAgICBpZiAoZXZlbnRPckRhdGEpIHtcbiAgICAgIGlmIChldmVudE9yRGF0YS50YXJnZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnRPckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSB2YWx1ZVBhcnNlcihyYXdWYWx1ZSk7XG4gICAgY29uc3QgeyBjb21wb25lbnRUeXBlIH0gPSBjb2w7XG4gICAgc3dpdGNoIChjb21wb25lbnRUeXBlKSB7XG4gICAgICBjYXNlICdjdXJyZW5jeSc6XG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAndGV4dCc6IHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGVkaXRDZWxsVmFsdWVDaGFuZ2UoZ3JpZCwgZGF0YUlkLCBjb2wudmFsdWVLZXlQYXRoLCB2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY29sLm9uRWRpdFZhbHVlQ2hhbmdlKSB7XG4gICAgICBjb2wub25FZGl0VmFsdWVDaGFuZ2UodmFsdWUsIGNvbC52YWx1ZUtleVBhdGgsIHJvd0luZGV4LCBkYXRhSWQpO1xuICAgIH1cbiAgICBpZiAoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlICYmIHZhbHVlID09PSBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubWF0Y2hWYWx1ZSkge1xuICAgICAgLy8gQ2FsbCBzcGVjaWFsIHBhaXJlZCB2YWx1ZSBjaGFuZ2Ugb24gb3RoZXIgY2VsbCBpZiB2YWx1ZSBtYXRjaGVzXG4gICAgICB0aGlzLm9uRWRpdENlbGxWYWx1ZUNoYW5nZShcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIHsgdmFsdWVLZXlQYXRoOiBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWVLZXlQYXRoIH0sXG4gICAgICAgIHYgPT4gdixcbiAgICAgICkoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm5ld1ZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNvbC52YWxpZGF0b3JzKSB7XG4gICAgICB0aGlzLnByb3BzLmVkaXRDZWxsVmFsdWVWYWxpZGF0ZShcbiAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICBkYXRhSWQsXG4gICAgICAgIGNvbC52YWx1ZUtleVBhdGgsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBjb2wudmFsaWRhdG9ycyxcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIGdldFJlZ0V4ID0gc2VwYXJhdG9yID0+IChzZXBhcmF0b3IgPyBuZXcgUmVnRXhwKGBcXFxcJHtzZXBhcmF0b3J9YCwgJ2cnKSA6IG5ldyBSZWdFeHAoJ1xcXFxzJywgJ2cnKSk7XG5cbiAgb25DcmVhdGVDZWxsQmx1ciA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGV2ZW50T3JEYXRhKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGVjaW1hbFNlcGFyYXRvciwgY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlLCBncmlkLCB0aG91c2FuZFNlcGFyYXRvcixcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IGNvbXBvbmVudFR5cGUgfSA9IGNvbDtcbiAgICBsZXQgdmFsdWU7XG4gICAgLy8gZXZlbnRPckRhdGEgY2FuIGJlIGZvcm1hdHRlZC1pbnB1dCwgcmVhY3Qtc2VsZWN0IG9yIHJlYWN0LWRheS1waWNrZXIgb25DaGFuZ2UgZXZlbnRcbiAgICBpZiAoZXZlbnRPckRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGV2ZW50T3JEYXRhLnRhcmdldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlID0gZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChldmVudE9yRGF0YS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlID0gZXZlbnRPckRhdGEudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IGV2ZW50T3JEYXRhO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSA9IHRoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKTtcbiAgICB9XG4gICAgc3dpdGNoIChjb21wb25lbnRUeXBlKSB7XG4gICAgICBjYXNlICdjdXJyZW5jeSc6IHtcbiAgICAgICAgY29uc3QgbnVtZXJpY1ZhbHVlID0gdmFsdWVcbiAgICAgICAgICA/IE51bWJlcih2YWx1ZS5yZXBsYWNlKHRoaXMuZ2V0UmVnRXgoKGNvbC52YWx1ZU9wdGlvbnMgJiYgY29sLnZhbHVlT3B0aW9ucy50aG91c2FuZFNlcGFyYXRvcikgfHwgdGhvdXNhbmRTZXBhcmF0b3IpLCAnJylcbiAgICAgICAgICAgIC5yZXBsYWNlKHRoaXMuZ2V0UmVnRXgoKGNvbC52YWx1ZU9wdGlvbnMgJiYgY29sLnZhbHVlT3B0aW9ucy5kZWNpbWFsU2VwYXJhdG9yKSB8fCBkZWNpbWFsU2VwYXJhdG9yKSwgJy4nKSlcbiAgICAgICAgICA6IHZhbHVlO1xuICAgICAgICBpZiAobnVtZXJpY1ZhbHVlICE9PSB0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCkpIHtcbiAgICAgICAgICBjcmVhdGVDZWxsVmFsdWVDaGFuZ2UoZ3JpZCwgcm93SW5kZXgsIGNvbC52YWx1ZUtleVBhdGgsIG51bWVyaWNWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAndGV4dCc6IHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCkpIHtcbiAgICAgICAgICBjcmVhdGVDZWxsVmFsdWVDaGFuZ2UoZ3JpZCwgcm93SW5kZXgsIGNvbC52YWx1ZUtleVBhdGgsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNvbC5vbkNyZWF0ZUJsdXIpIHtcbiAgICAgIGlmICh2YWx1ZVBhcnNlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWVQYXJzZXIodmFsdWUpO1xuICAgICAgfVxuICAgICAgY29sLm9uQ3JlYXRlQmx1cih2YWx1ZSwgcm93SW5kZXgpO1xuICAgIH1cbiAgfTtcblxuICBvbkVkaXRDZWxsQmx1ciA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGV2ZW50T3JEYXRhKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGVjaW1hbFNlcGFyYXRvciwgZWRpdENlbGxWYWx1ZUNoYW5nZSwgZ3JpZCwgdGhvdXNhbmRTZXBhcmF0b3IsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBjb21wb25lbnRUeXBlIH0gPSBjb2w7XG4gICAgY29uc3QgZGF0YUlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICBsZXQgdmFsdWU7XG4gICAgLy8gZXZlbnRPckRhdGEgY2FuIGJlIGZvcm1hdHRlZC1pbnB1dCwgcmVhY3Qtc2VsZWN0IG9yIHJlYWN0LWRheS1waWNrZXIgb25DaGFuZ2UgZXZlbnRcbiAgICBpZiAoZXZlbnRPckRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGV2ZW50T3JEYXRhLnRhcmdldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlID0gZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChldmVudE9yRGF0YS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlID0gZXZlbnRPckRhdGEudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IGV2ZW50T3JEYXRhO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSA9IHRoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKTtcbiAgICB9XG4gICAgc3dpdGNoIChjb21wb25lbnRUeXBlKSB7XG4gICAgICBjYXNlICdjdXJyZW5jeSc6IHtcbiAgICAgICAgY29uc3QgbnVtZXJpY1ZhbHVlID0gdmFsdWVcbiAgICAgICAgICA/IE51bWJlcih2YWx1ZS5yZXBsYWNlKHRoaXMuZ2V0UmVnRXgoKGNvbC52YWx1ZU9wdGlvbnMgJiYgY29sLnZhbHVlT3B0aW9ucy50aG91c2FuZFNlcGFyYXRvcikgfHwgdGhvdXNhbmRTZXBhcmF0b3IpLCAnJylcbiAgICAgICAgICAgIC5yZXBsYWNlKHRoaXMuZ2V0UmVnRXgoKGNvbC52YWx1ZU9wdGlvbnMgJiYgY29sLnZhbHVlT3B0aW9ucy5kZWNpbWFsU2VwYXJhdG9yKSB8fCBkZWNpbWFsU2VwYXJhdG9yKSwgJy4nKSlcbiAgICAgICAgICA6IHZhbHVlO1xuICAgICAgICBpZiAobnVtZXJpY1ZhbHVlICE9PSB0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCkpIHtcbiAgICAgICAgICBlZGl0Q2VsbFZhbHVlQ2hhbmdlKGdyaWQsIGRhdGFJZCwgY29sLnZhbHVlS2V5UGF0aCwgbnVtZXJpY1ZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICd0ZXh0Jzoge1xuICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKSkge1xuICAgICAgICAgIGVkaXRDZWxsVmFsdWVDaGFuZ2UoZ3JpZCwgZGF0YUlkLCBjb2wudmFsdWVLZXlQYXRoLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjb2wub25FZGl0Qmx1cikge1xuICAgICAgaWYgKHZhbHVlUGFyc2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZVBhcnNlcih2YWx1ZSk7XG4gICAgICB9XG4gICAgICBjb2wub25FZGl0Qmx1cih2YWx1ZSwgcm93SW5kZXgsIGRhdGFJZCk7XG4gICAgfVxuICB9O1xuXG4gIG9uQ2VsbEZvY3VzID0gKGNlbGxUeXBlLCBpbnB1dFR5cGUsIHJvd0luZGV4LCBjb2x1bW5LZXkpID0+IChlKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgY2VsbFNlbGVjdGlvbkNoYW5nZSwgY2VsbFNlbGVjdCwgZ3JpZCwgaXNFZGl0aW5nLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChpc0VkaXRpbmcpIHJldHVybjtcblxuICAgIGlmIChpbnB1dFR5cGUgPT09ICdudW1iZXInKSB7XG4gICAgICBlLnRhcmdldC5zZWxlY3QoKTtcbiAgICB9XG4gICAgaWYgKGNlbGxUeXBlID09PSAnZWRpdCcgJiYgY2VsbFNlbGVjdCkge1xuICAgICAgY2VsbFNlbGVjdGlvbkNoYW5nZShcbiAgICAgICAgZ3JpZCxcbiAgICAgICAgTWFwKHtcbiAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICBjb2x1bW5LZXksXG4gICAgICAgIH0pLFxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgZ2V0U2VsZWN0UmVmID0gKGNvbXBvbmVudCkgPT4ge1xuICAgIGlmICghY29tcG9uZW50KSByZXR1cm4gbnVsbDtcbiAgICBpZiAoY29tcG9uZW50LnNlbGVjdCAmJiBjb21wb25lbnQuc2VsZWN0LmlucHV0UmVmKSB7XG4gICAgICByZXR1cm4gY29tcG9uZW50LnNlbGVjdC5pbnB1dFJlZjtcbiAgICB9XG4gICAgaWYgKGNvbXBvbmVudC5zZWxlY3QgJiYgY29tcG9uZW50LnNlbGVjdC5zZWxlY3QpIHtcbiAgICAgIHJldHVybiBjb21wb25lbnQuc2VsZWN0LnNlbGVjdC5pbnB1dFJlZjtcbiAgICB9XG4gICAgaWYgKGNvbXBvbmVudC5zZWxlY3RSZWYgJiYgY29tcG9uZW50LnNlbGVjdFJlZi5zZWxlY3Quc2VsZWN0KSB7XG4gICAgICByZXR1cm4gY29tcG9uZW50LnNlbGVjdFJlZi5zZWxlY3Quc2VsZWN0LmlucHV0UmVmO1xuICAgIH1cbiAgICByZXR1cm4gY29tcG9uZW50LnNlbGVjdFJlZi5zZWxlY3QuaW5wdXRSZWY7XG4gIH07XG5cbiAgZ2V0RGF0YUlkQnlSb3dJbmRleCA9IHJvd0luZGV4ID0+IHRoaXMucHJvcHMuZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLnRoaXMucHJvcHMuZ3JpZC5pZEtleVBhdGhdKTtcblxuICBnZXRTZWxlY3RlZEl0ZW1JbmRleCA9IChpZCkgPT4ge1xuICAgIGlmICghaWQpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnByb3BzLmRhdGEuZmluZEluZGV4KHYgPT4gdi5nZXRJbih0aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoKSA9PT0gaWQpO1xuICAgIHJldHVybiBpbmRleCA9PT0gLTEgPyB1bmRlZmluZWQgOiBpbmRleDtcbiAgfTtcblxuICBnZXRFZGl0SXRlbVZhbHVlID0gKHJvd0luZGV4LCBjb2wsIG9wdGlvbnMgPSBbXSkgPT4ge1xuICAgIC8vIEdldCB0aGUgdmFsdWUgdG8gZGlzcGxheSBpbiBlZGl0IGNlbGxcbiAgICBjb25zdCBpZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgY29uc3QgZWRpdFZhbHVlID0gdGhpcy5wcm9wcy5lZGl0RGF0YS5nZXRJbihbaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdLCB1bmRlZmluZWQpO1xuICAgIGxldCBvcmlnaW5hbFZhbHVlO1xuICAgIGlmIChlZGl0VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgb3JpZ2luYWxWYWx1ZSA9IHRoaXMucHJvcHMuZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdLCAnJyk7XG4gICAgfSBlbHNlIGlmIChlZGl0VmFsdWUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVmFsdWUgaXMgZm91bmQgZnJvbSBlZGl0RGF0YVxuICAgICAgLy8gRm9ybWF0IGJ5IHR5cGVcbiAgICAgIHN3aXRjaCAoY29sLmNvbXBvbmVudFR5cGUpIHtcbiAgICAgICAgY2FzZSAnbXVsdGlzZWxlY3QnOlxuICAgICAgICBjYXNlICdzZWxlY3QnOlxuICAgICAgICAgIHJldHVybiBvcHRpb25zLnNlbGVjdE9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSBlZGl0VmFsdWUpO1xuICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgICByZXR1cm4gb3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IGVkaXRWYWx1ZSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuIGVkaXRWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG9yaWdpbmFsVmFsdWUgPT09IG51bGwgfHwgb3JpZ2luYWxWYWx1ZSA9PT0gdW5kZWZpbmVkIHx8IG9yaWdpbmFsVmFsdWUgPT09ICcnKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIC8vIFJldHVybiB2YWx1ZSBmcm9tIG9yaWdpbmFsIGRhdGEsIGJlY2F1c2UgZWRpdERhdGEgaXMgbm90IGF2YWlsYWJsZVxuICAgIC8vIEZvcm1hdCBieSBjb21wb25lbnQgdHlwZVxuICAgIHN3aXRjaCAoY29sLmNvbXBvbmVudFR5cGUpIHtcbiAgICAgIGNhc2UgJ2Zsb2F0Jzoge1xuICAgICAgICBpZiAoU3RyaW5nKG9yaWdpbmFsVmFsdWUpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZXR1cm4gU3RyaW5nKG9yaWdpbmFsVmFsdWUpLnJlcGxhY2UoJy4nLCB0aGlzLnByb3BzLmRlY2ltYWxTZXBhcmF0b3IpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvcmlnaW5hbFZhbHVlO1xuICAgICAgfVxuICAgICAgY2FzZSAnbXVsdGlzZWxlY3QnOlxuICAgICAgY2FzZSAnc2VsZWN0JzpcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuc2VsZWN0T3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IG9yaWdpbmFsVmFsdWUpO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIHJldHVybiBvcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gb3JpZ2luYWxWYWx1ZSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gb3JpZ2luYWxWYWx1ZTtcbiAgICB9XG4gIH07XG5cbiAgZ2V0Q3JlYXRlSXRlbVZhbHVlID0gKHJvd0luZGV4LCBjb2wsIG9wdGlvbnMgPSBbXSkgPT4ge1xuICAgIGNvbnN0IHZhbCA9IHRoaXMucHJvcHMuY3JlYXRlRGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdLCAnJyk7XG4gICAgaWYgKHZhbCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBpZiAoY29sLmNvbXBvbmVudFR5cGUgPT09ICdzZWxlY3QnIHx8IGNvbC5jb21wb25lbnRUeXBlID09PSAnbXVsdGlzZWxlY3QnKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5zZWxlY3RPcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gdmFsKTtcbiAgICB9XG4gICAgaWYgKFsnYm9vbGVhbiddLmluY2x1ZGVzKGNvbC5jb21wb25lbnRUeXBlKSkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSB2YWwpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsO1xuICB9O1xuXG4gIGdldEZpbHRlckl0ZW1WYWx1ZSA9IChjb2wsIG9wdGlvbnMgPSBbXSkgPT4ge1xuICAgIGNvbnN0IHZhbCA9IHRoaXMucHJvcHMuZmlsdGVyRGF0YS5nZXQoVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCksICcnKTtcbiAgICBpZiAodmFsID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGlmIChjb2wuY29tcG9uZW50VHlwZSA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLnNlbGVjdE9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSB2YWwpO1xuICAgIH1cbiAgICBpZiAoWydjaGVja2JveCcsICdib29sZWFuJ10uaW5jbHVkZXMoY29sLmNvbXBvbmVudFR5cGUpKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IHZhbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbDtcbiAgfTtcblxuICBnZXRGaWx0ZXJJdGVtTXVsdGlWYWx1ZSA9IChjb2wpID0+IHtcbiAgICBjb25zdCBjb2x1bW5LZXkgPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sKTtcbiAgICBjb25zdCB7IGZpbHRlckRhdGEgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgZGF0YSA9IHRoaXMuc3RhdGVbY29sdW1uS2V5XTtcbiAgICBjb25zdCB2YWwgPSBkYXRhIHx8IGZpbHRlckRhdGEuZ2V0KGNvbHVtbktleSwgJycpO1xuICAgIC8vIHNlc3Npb24gc3RvcmFnZSBjb250ZW50IGlzIGNvbnZlcnRlZCB0byBpbW11dGFibGUgYW5kIG11bHRpc2VsZWN0XG4gICAgLy8gZmlsdGVycyBpcyB0aGVuIGxpc3Qgb3RoZXJ3aXNlIGFycmF5XG4gICAgcmV0dXJuIHZhbCAmJiB2YWwudG9KUyA/IHZhbC50b0pTKCkgOiB2YWwgfHwgW107XG4gIH07XG5cbiAgZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZSA9IChyb3dJbmRleCwgY29sLCBtb2RlKSA9PiB7XG4gICAgbGV0IGNvbXBvbmVudERpc2FibGVkID0gISFjb2wuZGlzYWJsZUVkaXRpbmc7XG4gICAgLy8gY2hlY2sgaWYgY29tcG9uZW50IGlzIGRpc2FibGVkIGJ5IG90aGVyIGNvbHVtbiBkYXRhXG4gICAgaWYgKCFjb21wb25lbnREaXNhYmxlZCAmJiBjb2wuZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2gpIHtcbiAgICAgIGlmIChtb2RlID09PSAnY3JlYXRlJykge1xuICAgICAgICBjb21wb25lbnREaXNhYmxlZCA9IHRoaXMuZ2V0Q3JlYXRlSXRlbVZhbHVlKHJvd0luZGV4LCB7XG4gICAgICAgICAgdmFsdWVLZXlQYXRoOiBjb2wuZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2gubWF0Y2hWYWx1ZUtleVBhdGgsXG4gICAgICAgIH0pID09PSBjb2wuZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2gubWF0Y2hWYWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbXBvbmVudERpc2FibGVkID0gdGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCB7XG4gICAgICAgICAgdmFsdWVLZXlQYXRoOiBjb2wuZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2gubWF0Y2hWYWx1ZUtleVBhdGgsXG4gICAgICAgIH0pID09PSBjb2wuZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2gubWF0Y2hWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvbXBvbmVudERpc2FibGVkO1xuICB9O1xuXG4gIGdldFJvd0NsYXNzTmFtZSA9IChyb3dJbmRleCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGdyaWQsIGlzQ3JlYXRpbmcsIGlzRWRpdGluZywgY3JlYXRlRGF0YSwgc2VsZWN0ZWRJdGVtcywgZGF0YSxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCByb3dDbGFzc05hbWVzID0gWydvYy1kYXRhZ3JpZC1yb3cnXTtcbiAgICBsZXQgZXh0cmFSb3dDb3VudCA9IDA7IC8vIGhvdyBtYW55IHJvd3MgdG8gaWdub3JlIGZyb20gdG9wLCBuZXcgKyBmaWx0ZXIgcm93c1xuICAgIGlmIChpc0NyZWF0aW5nKSBleHRyYVJvd0NvdW50ID0gY3JlYXRlRGF0YS5zaXplO1xuICAgIGlmIChpc0NyZWF0aW5nKSB7XG4gICAgICBpZiAocm93SW5kZXggPD0gZXh0cmFSb3dDb3VudCAtIDEpIHtcbiAgICAgICAgcm93Q2xhc3NOYW1lcy5wdXNoKCdvYy1kYXRhZ3JpZC1yb3ctbmV3Jyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc0VkaXRpbmcpIHtcbiAgICAgIHJvd0NsYXNzTmFtZXMucHVzaCgnb2MtZGF0YWdyaWQtcm93LWVkaXQnKTtcbiAgICB9XG5cbiAgICAvLyBjaGVjayBpZiByb3cgaXMgc2VsZWN0ZWRcbiAgICBpZiAoIWlzQ3JlYXRpbmcgJiYgIWlzRWRpdGluZyAmJiAoc2VsZWN0ZWRJdGVtcyAmJiBncmlkLmlkS2V5UGF0aCkpIHtcbiAgICAgIGlmIChzZWxlY3RlZEl0ZW1zLmluZGV4T2YoZGF0YS5nZXRJbihbcm93SW5kZXggLSBleHRyYVJvd0NvdW50LCAuLi5ncmlkLmlkS2V5UGF0aF0pKSAhPT0gLTEpIHtcbiAgICAgICAgcm93Q2xhc3NOYW1lcy5wdXNoKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLnJvd0NsYXNzTmFtZUdldHRlcikge1xuICAgICAgcmV0dXJuIHJvd0NsYXNzTmFtZXMuam9pbignICcpICsgJyAnICsgdGhpcy5wcm9wcy5yb3dDbGFzc05hbWVHZXR0ZXIocm93SW5kZXgpO1xuICAgIH1cbiAgICByZXR1cm4gcm93Q2xhc3NOYW1lcy5qb2luKCcgJyk7XG4gIH07XG5cbiAgZ2V0Q2VsbE1lc3NhZ2VzID0gKHJvd0luZGV4LCBjb2wsIGNlbGxUeXBlKSA9PiB7XG4gICAgY29uc3QgcmV0dXJuRGF0YSA9IHt9O1xuICAgIGlmICghdGhpcy5wcm9wcy5ncmlkLmlkS2V5UGF0aCB8fCAhY29sLnZhbHVlS2V5UGF0aCkge1xuICAgICAgcmV0dXJuIHJldHVybkRhdGE7XG4gICAgfVxuICAgIGxldCBpbmZvTWVzc2FnZTtcbiAgICBsZXQgZXJyb3JNZXNzYWdlO1xuICAgIGxldCB3YXJuaW5nTWVzc2FnZTtcbiAgICBpZiAoY2VsbFR5cGUgPT09ICdjcmVhdGUnKSB7XG4gICAgICBpbmZvTWVzc2FnZSA9IHRoaXMucHJvcHMuY3JlYXRlQ2VsbE1lc3NhZ2VzLmdldEluKFsnaW5mbycsIHJvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgICBlcnJvck1lc3NhZ2UgPSB0aGlzLnByb3BzLmNyZWF0ZUNlbGxNZXNzYWdlcy5nZXRJbihbJ2Vycm9yJywgcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgIHdhcm5pbmdNZXNzYWdlID0gdGhpcy5wcm9wcy5jcmVhdGVDZWxsTWVzc2FnZXMuZ2V0SW4oW1xuICAgICAgICAnd2FybmluZycsXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICAuLi5jb2wudmFsdWVLZXlQYXRoLFxuICAgICAgXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICAgIGluZm9NZXNzYWdlID0gdGhpcy5wcm9wcy5jZWxsTWVzc2FnZXMuZ2V0SW4oWydpbmZvJywgaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgIGVycm9yTWVzc2FnZSA9IHRoaXMucHJvcHMuY2VsbE1lc3NhZ2VzLmdldEluKFsnZXJyb3InLCBpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgd2FybmluZ01lc3NhZ2UgPSB0aGlzLnByb3BzLmNlbGxNZXNzYWdlcy5nZXRJbihbJ3dhcm5pbmcnLCBpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgIH1cbiAgICBpZiAoaW5mb01lc3NhZ2UpIHtcbiAgICAgIHJldHVybkRhdGEuaW5mb01lc3NhZ2UgPSBpbmZvTWVzc2FnZTtcbiAgICB9XG4gICAgaWYgKGVycm9yTWVzc2FnZSkge1xuICAgICAgcmV0dXJuRGF0YS5lcnJvck1lc3NhZ2UgPSBlcnJvck1lc3NhZ2U7XG4gICAgfVxuICAgIGlmICh3YXJuaW5nTWVzc2FnZSkge1xuICAgICAgcmV0dXJuRGF0YS53YXJuaW5nTWVzc2FnZSA9IHdhcm5pbmdNZXNzYWdlO1xuICAgIH1cbiAgICByZXR1cm4gcmV0dXJuRGF0YTtcbiAgfTtcblxuICBnZXRTY3JvbGxUb1JvdyA9ICgpID0+IHtcbiAgICBsZXQgc2Nyb2xsVG9Sb3c7XG4gICAgaWYgKHRoaXMucHJvcHMuaXNDcmVhdGluZyAmJiAhdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCkgcmV0dXJuIHNjcm9sbFRvUm93O1xuICAgIGlmICh0aGlzLmZvY3VzVG9DcmVhdGVDZWxsKSB7XG4gICAgICBjb25zdCBzY3JvbGxOZXdSb3cgPSB0aGlzLnByb3BzLmNyZWF0ZURhdGEuc2l6ZSAtIDE7XG4gICAgICBpZiAoc2Nyb2xsTmV3Um93ID49IDApIHtcbiAgICAgICAgc2Nyb2xsVG9Sb3cgPSBzY3JvbGxOZXdSb3c7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLmlzRWRpdGluZyAmJiAhdGhpcy5wcm9wcy5zY3JvbGxJbkVkaXRNb2RlKSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gdGhpcy5zdGF0ZS5jdXJyZW50Um93O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2Nyb2xsVG9Sb3cgPSB0aGlzLnByb3BzLnNjcm9sbFRvUm93OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICB9XG4gICAgICBpZiAoc2Nyb2xsVG9Sb3cgPT09IHVuZGVmaW5lZCAmJiB0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuc2l6ZSA+IDApIHtcbiAgICAgICAgc2Nyb2xsVG9Sb3cgPSB0aGlzLmdldFNlbGVjdGVkSXRlbUluZGV4KHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5maXJzdCgpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNjcm9sbFRvUm93O1xuICB9O1xuXG4gIHNldEZvY3VzVG8gPSAoZm9jdXNUbykgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmlzRWRpdGluZyB8fCB0aGlzLnByb3BzLmlzQ3JlYXRpbmcpIHtcbiAgICAgIGlmIChmb2N1c1RvICYmIGZvY3VzVG8uZ2V0KCd0eXBlJykgJiYgZm9jdXNUbyAhPT0gdGhpcy5wcmV2Rm9jdXNUbykge1xuICAgICAgICB0aGlzW2ZvY3VzVG8uZ2V0KCd0eXBlJyldID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5mb2N1c1RvTGFzdFJvdyA9IGZvY3VzVG8uZ2V0KCdmb2N1c1RvTGFzdFJvdycpO1xuICAgICAgICB0aGlzLnByZXZGb2N1c1RvID0gZm9jdXNUbztcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlQ2VsbFNlbGVjdCA9IChjZWxsVHlwZSwgcm93SW5kZXgsIGNvbHVtbktleSkgPT4gKCkgPT4ge1xuICAgIGlmIChjZWxsVHlwZSA9PT0gJ3ZpZXcnICYmIHRoaXMucHJvcHMuY2VsbFNlbGVjdCkge1xuICAgICAgdGhpcy5wcm9wcy5jZWxsU2VsZWN0aW9uQ2hhbmdlKFxuICAgICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICAgIE1hcCh7XG4gICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgY29sdW1uS2V5LFxuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZUNyZWF0ZUNlbGxSZWYgPSAocm93SW5kZXgsIGNvbCkgPT4gKHJlZikgPT4ge1xuICAgIC8vIEZvY3VzIHRvIGNyZWF0ZSBjZWxsXG4gICAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCk7XG4gICAgY29uc3Qgc2VsZWN0UmVmID0gIXJlZiB8fCByZWYuZm9jdXMgPyByZWYgOiB0aGlzLmdldFNlbGVjdFJlZihyZWYpO1xuICAgIGlmIChcbiAgICAgIHRoaXMucHJvcHMuY3JlYXRlRGF0YS5zaXplXG4gICAgICAmJiB0aGlzLnByb3BzLmNyZWF0ZURhdGEuc2l6ZSA9PT0gcm93SW5kZXggKyAxXG4gICAgICAmJiB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsXG4gICAgICAmJiAhdGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdjcmVhdGUnKVxuICAgICAgJiYgc2VsZWN0UmVmXG4gICAgKSB7XG4gICAgICBzZWxlY3RSZWYuZm9jdXMoKTtcbiAgICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wcm9wcy5lbmFibGVBcnJvd05hdmlnYXRpb24pIHtcbiAgICAgIHRoaXMuY3JlYXRlQ2VsbFJlZnNbYCR7dGhpcy5wcm9wcy5ncmlkLmlkfV8ke2NvbHVtbktleX1fJHtyb3dJbmRleH1gXSA9IHJlZjtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlRWRpdENlbGxSZWYgPSAocm93SW5kZXgsIGNvbCkgPT4gKHJlZikgPT4ge1xuICAgIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2wpO1xuICAgIGlmICh0aGlzLmZvY3VzVG9FZGl0Q2VsbCAmJiAhdGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdlZGl0JykpIHtcbiAgICAgIGNvbnN0IHNlbGVjdGVkUm93SW5kZXggPSB0aGlzLmZvY3VzVG9MYXN0Um93ICYmIHRoaXMucHJvcHMuZGF0YS5zaXplID4gMFxuICAgICAgICA/IHRoaXMucHJvcHMuZGF0YS5zaXplIC0gMVxuICAgICAgICA6IHRoaXMuZ2V0U2VsZWN0ZWRJdGVtSW5kZXgodGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLmZpcnN0KCkpO1xuXG4gICAgICBjb25zdCB7IHNlbGVjdGVkQ2VsbCB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IHNlbGVjdFJlZiA9ICFyZWYgfHwgcmVmLmZvY3VzID8gcmVmIDogdGhpcy5nZXRTZWxlY3RSZWYocmVmKTtcbiAgICAgIGlmIChzZWxlY3RlZENlbGwuc2l6ZSA+IDApIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHNlbGVjdGVkQ2VsbC5nZXQoJ3Jvd0luZGV4JykgPT09IHJvd0luZGV4XG4gICAgICAgICAgJiYgc2VsZWN0ZWRDZWxsLmdldCgnY29sdW1uS2V5JykgPT09IGNvbHVtbktleVxuICAgICAgICAgICYmIHNlbGVjdFJlZlxuICAgICAgICApIHtcbiAgICAgICAgICBzZWxlY3RSZWYuZm9jdXMoKTtcbiAgICAgICAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuZm9jdXNUb0xhc3RSb3cgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzZWxlY3RlZFJvd0luZGV4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mb2N1c1RvTGFzdFJvdyA9IGZhbHNlO1xuICAgICAgfSBlbHNlIGlmIChzZWxlY3RlZFJvd0luZGV4ID09PSByb3dJbmRleCAmJiBzZWxlY3RSZWYpIHtcbiAgICAgICAgc2VsZWN0UmVmLmZvY3VzKCk7XG4gICAgICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZm9jdXNUb0xhc3RSb3cgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuZW5hYmxlQXJyb3dOYXZpZ2F0aW9uKSB7XG4gICAgICB0aGlzLmNlbGxSZWZzW2Ake3RoaXMucHJvcHMuZ3JpZC5pZH1fJHtjb2x1bW5LZXl9XyR7cm93SW5kZXh9YF0gPSByZWY7XG4gICAgfVxuICB9O1xuXG4gIG1vdmVDZWxsRm9jdXMgPSAobmV4dEVsZW1lbnQsIHJvd0luZGV4LCBjb2x1bW5JbmRleCkgPT4ge1xuICAgIGNvbnN0IGVsZW1lbnRUeXBlcyA9IFsndGV4dCcsICdjaGVja2JveCddO1xuICAgIGlmIChuZXh0RWxlbWVudCAmJiBlbGVtZW50VHlwZXMuaW5jbHVkZXMobmV4dEVsZW1lbnQudHlwZSkpIHtcbiAgICAgIGlmIChyb3dJbmRleCAhPT0gLTEgfHwgY29sdW1uSW5kZXggIT09IC0xKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIGN1cnJlbnRDb2x1bW46IGNvbHVtbkluZGV4LFxuICAgICAgICAgIGN1cnJlbnRSb3c6IHJvd0luZGV4LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAobmV4dEVsZW1lbnQudHlwZSA9PT0gJ2NoZWNrYm94JykgbmV4dEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgaWYgKG5leHRFbGVtZW50LnR5cGUgPT09ICd0ZXh0JykgbmV4dEVsZW1lbnQuc2VsZWN0KCk7XG4gICAgICB9LCA1MCk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZVNlbGVjdEFsbENoZWNrQm94T25DaGFuZ2UgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5zZWxlY3RBbGxJdGVtc0NoYW5nZSh0aGlzLnByb3BzLmdyaWQpO1xuICB9O1xuXG4gIGhhbmRsZVNlbGVjdGlvbkNoZWNrQm94T25DaGFuZ2UgPSByb3dJbmRleCA9PiAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5pdGVtU2VsZWN0aW9uQ2hhbmdlKHRoaXMucHJvcHMuZ3JpZCwgcm93SW5kZXgsIHRydWUsIGZhbHNlKTtcbiAgfTtcblxuICBnZW5lcmF0ZUNvbHVtbnMgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGF0YSxcbiAgICAgIHNlbGVjdGVkSXRlbXMsXG4gICAgICBkYXRlRm9ybWF0LFxuICAgICAgdGhvdXNhbmRTZXBhcmF0b3IsXG4gICAgICBkZWNpbWFsU2VwYXJhdG9yLFxuICAgICAgZ3JpZCxcbiAgICAgIGlubGluZUVkaXQsXG4gICAgICBmaWx0ZXJpbmcsXG4gICAgICByZWdpb24sXG4gICAgICBpbnRsLFxuICAgICAgc2VsZWN0Q29tcG9uZW50T3B0aW9ucyxcbiAgICAgIGlzQ3JlYXRpbmcsXG4gICAgICBleHRyYUNvbHVtbixcbiAgICAgIHJvd1NlbGVjdENoZWNrYm94Q29sdW1uLFxuICAgICAgc2hvd1NlbGVjdEFsbENoZWNrYm94LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgY29sdW1ucyA9IFtdO1xuICAgIGNvbnN0IHRhYkluZGV4ID0gU3RyaW5nKHRoaXMucHJvcHMudGFiSW5kZXgpO1xuICAgIGlmIChleHRyYUNvbHVtbikge1xuICAgICAgY29sdW1ucy5wdXNoKHtcbiAgICAgICAgd2lkdGg6IGV4dHJhQ29sdW1uLndpZHRoIHx8IDQwLFxuICAgICAgICBpc1Jlc2l6YWJsZTogISFleHRyYUNvbHVtbi5pc1Jlc2l6YWJsZSxcbiAgICAgICAgaXNTb3J0YWJsZTogZmFsc2UsXG4gICAgICAgIGNvbHVtbktleTogJ2V4dHJhQ29sdW1uJyxcbiAgICAgICAgY2VsbDogcm93SW5kZXggPT4gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtZXh0cmEtY29sdW1uLWNlbGwgbm8tcm93LXNlbGVjdFwiPlxuICAgICAgICAgICAge2V4dHJhQ29sdW1uLnZhbHVlUmVuZGVyKGRhdGEuZ2V0KHJvd0luZGV4KSwgcm93SW5kZXgpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApLFxuICAgICAgICBjZWxsRWRpdDogcm93SW5kZXggPT4gKGV4dHJhQ29sdW1uLmNlbGxFZGl0ID8gZXh0cmFDb2x1bW4uY2VsbEVkaXQocm93SW5kZXgpIDogbnVsbCksXG4gICAgICAgIGNlbGxDcmVhdGU6IHJvd0luZGV4ID0+IChleHRyYUNvbHVtbi5jZWxsQ3JlYXRlID8gZXh0cmFDb2x1bW4uY2VsbENyZWF0ZShyb3dJbmRleCkgOiBudWxsKSxcbiAgICAgICAgY2VsbEZpbHRlcjogcm93SW5kZXggPT4gKGV4dHJhQ29sdW1uLmNlbGxGaWx0ZXIgPyBleHRyYUNvbHVtbi5jZWxsRmlsdGVyKHJvd0luZGV4KSA6IG51bGwpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHJvd1NlbGVjdENoZWNrYm94Q29sdW1uKSB7XG4gICAgICBjb2x1bW5zLnB1c2goe1xuICAgICAgICB3aWR0aDogNDAsXG4gICAgICAgIGlzUmVzaXphYmxlOiBmYWxzZSxcbiAgICAgICAgaXNTb3J0YWJsZTogZmFsc2UsXG4gICAgICAgIGNvbHVtbktleTogJ3NlbGVjdGlvbkNoZWNrYm94JyxcbiAgICAgICAgaGVhZGVyOiBzaG93U2VsZWN0QWxsQ2hlY2tib3ggJiYgKFxuICAgICAgICAgIDxDaGVja2JveFxuICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkU2VsZWN0QWxsQ2hlY2tCb3gtJHtncmlkLmlkfWB9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1zZWxlY3QtYWxsLWNoZWNrYm94LWNlbGwgbm8tcm93LXNlbGVjdFwiXG4gICAgICAgICAgICBjaGVja2VkPXtkYXRhLnNpemUgIT09IDAgJiYgZGF0YS5zaXplID09PSBzZWxlY3RlZEl0ZW1zLnNpemV9XG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVTZWxlY3RBbGxDaGVja0JveE9uQ2hhbmdlfVxuICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgIC8+XG4gICAgICAgICksXG4gICAgICAgIGNlbGw6IChyb3dJbmRleCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHJvd0l0ZW0gPSBkYXRhLmdldChyb3dJbmRleCk7XG4gICAgICAgICAgY29uc3QgaXRlbUlkID0gcm93SXRlbS5nZXRJbihncmlkLmlkS2V5UGF0aCk7XG4gICAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSBzZWxlY3RlZEl0ZW1zLmluY2x1ZGVzKGl0ZW1JZCk7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxDaGVja2JveFxuICAgICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRTZWxlY3RDaGVja0JveC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtyb3dJbmRleH1gfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1zZWxlY3QtY2hlY2tib3gtY2VsbCBuby1yb3ctc2VsZWN0XCJcbiAgICAgICAgICAgICAgY2hlY2tlZD17c2VsZWN0ZWR9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVNlbGVjdGlvbkNoZWNrQm94T25DaGFuZ2Uocm93SW5kZXgpfVxuICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIGNlbGxFZGl0OiAoKSA9PiBudWxsLFxuICAgICAgICBjZWxsQ3JlYXRlOiAoKSA9PiBudWxsLFxuICAgICAgICBjZWxsRmlsdGVyOiAoKSA9PiBudWxsLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgdmlzaWJsZUNvbHVtbnMgPSBbXTtcbiAgICB0aGlzLnByb3BzLnZpc2libGVDb2x1bW5zLmZvckVhY2goKHZpc2libGVDb2x1bW5LZXkpID0+IHtcbiAgICAgIHRoaXMucHJvcHMuY29sdW1ucy5mb3JFYWNoKChvcmdDb2wpID0+IHtcbiAgICAgICAgaWYgKFV0aWxzLmdldENvbHVtbktleShvcmdDb2wpID09PSB2aXNpYmxlQ29sdW1uS2V5KSB7XG4gICAgICAgICAgdmlzaWJsZUNvbHVtbnMucHVzaChvcmdDb2wpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICB2aXNpYmxlQ29sdW1ucy5mb3JFYWNoKChjb2wpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlRW1wdHlDaGVja2VyID0gVXRpbHMuZ2V0VmFsdWVFbXB0eUNoZWNrZXIoY29sKTtcbiAgICAgIC8vIENlbGwgdmFsdWUgcmVuZGVyaW5nXG4gICAgICBjb25zdCB2YWx1ZVJlbmRlciA9IChyb3dJbmRleCwgZm9ybWF0KSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbCA9IGRhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWwpKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbC5pc1JlcXVpcmVkID8gPE0gaWQ9XCJHcmlkLlZhbHVlSXNNaXNzaW5nXCIgLz4gOiAnJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZm9ybWF0ID8gZm9ybWF0KHZhbCkgOiB2YWw7XG4gICAgICB9O1xuXG4gICAgICBsZXQgY29sdW1uID0gR3JpZENvbHVtblNlcnZpY2UuYmFzZUNvbHVtbihjb2wpO1xuICAgICAgLy8gQ29sbGVjdCBjb2x1bW4gZnVuY3Rpb25zIGludG8gb25lIE9iamVjdFxuICAgICAgY29uc3QgY29sdW1uRnVuY3Rpb25zID0ge1xuICAgICAgICBlZGl0OiB7XG4gICAgICAgICAgZ2V0SXRlbVZhbHVlOiB0aGlzLmdldEVkaXRJdGVtVmFsdWUsXG4gICAgICAgICAgb25DZWxsVmFsdWVDaGFuZ2U6IHRoaXMub25FZGl0Q2VsbFZhbHVlQ2hhbmdlLFxuICAgICAgICAgIG9uQ2VsbEJsdXI6IHRoaXMub25FZGl0Q2VsbEJsdXIsXG4gICAgICAgICAgb25DZWxsRm9jdXM6IHRoaXMub25DZWxsRm9jdXMsXG4gICAgICAgICAgb25DZWxsS2V5RG93bjogdGhpcy5vbkVkaXRDZWxsS2V5RG93bixcbiAgICAgICAgICBoYW5kbGVDZWxsUmVmOiB0aGlzLmhhbmRsZUVkaXRDZWxsUmVmLFxuICAgICAgICB9LFxuICAgICAgICBjcmVhdGU6IHtcbiAgICAgICAgICBnZXRJdGVtVmFsdWU6IHRoaXMuZ2V0Q3JlYXRlSXRlbVZhbHVlLFxuICAgICAgICAgIG9uQ2VsbFZhbHVlQ2hhbmdlOiB0aGlzLm9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlLFxuICAgICAgICAgIG9uQ2VsbEJsdXI6IHRoaXMub25DcmVhdGVDZWxsQmx1cixcbiAgICAgICAgICBvbkNlbGxGb2N1czogdGhpcy5vbkNlbGxGb2N1cyxcbiAgICAgICAgICBvbkNlbGxLZXlEb3duOiB0aGlzLm9uQ3JlYXRlQ2VsbEtleURvd24sXG4gICAgICAgICAgaGFuZGxlQ2VsbFJlZjogdGhpcy5oYW5kbGVDcmVhdGVDZWxsUmVmLFxuICAgICAgICB9LFxuICAgICAgICBmaWx0ZXI6IHtcbiAgICAgICAgICBnZXRJdGVtVmFsdWU6IHRoaXMuZ2V0RmlsdGVySXRlbVZhbHVlLFxuICAgICAgICAgIGdldEl0ZW1NdWx0aVZhbHVlOiB0aGlzLmdldEZpbHRlckl0ZW1NdWx0aVZhbHVlLFxuICAgICAgICAgIG9uQ2VsbFZhbHVlQ2hhbmdlOiB0aGlzLm9uRmlsdGVyQ2VsbFZhbHVlQ2hhbmdlLFxuICAgICAgICAgIG9uQ2VsbE11bHRpVmFsdWVCbHVyOiB0aGlzLm9uRmlsdGVyQ2VsbE11bHRpVmFsdWVCbHVyLFxuICAgICAgICAgIG9uQ2VsbE11bHRpVmFsdWVDaGFuZ2U6IHRoaXMub25GaWx0ZXJDZWxsTXVsdGlWYWx1ZUNoYW5nZSxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIC8vIGhhbmRsZSBjb2x1bW4uY2VsbCAvIGNvbHVtbi5jZWxsRWRpdCAvIGNvbHVtbi5jZWxsQ3JlYXRlIC8gY29sdW1uLmNlbGxGaWx0ZXJcbiAgICAgIGNvbnN0IGNlbGxQcm9wcyA9IHtcbiAgICAgICAgZ3JpZCxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgZGF0ZUZvcm1hdCxcbiAgICAgICAgdGhvdXNhbmRTZXBhcmF0b3IsXG4gICAgICAgIGRlY2ltYWxTZXBhcmF0b3IsXG4gICAgICAgIHNlbGVjdENvbXBvbmVudE9wdGlvbnMsXG4gICAgICB9OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICBjb2x1bW4gPSBHcmlkQ29sdW1uU2VydmljZS5jb2x1bW5DZWxsKGNvbHVtbiwgY2VsbFByb3BzLCBjb2wsIHZhbHVlUmVuZGVyKTtcblxuICAgICAgLy8gaGFuZGxlIGNvbHVtbkNvbXBvbmVudFR5cGVzXG4gICAgICBjb25zdCBjb21wb25lbnRUeXBlUHJvcHMgPSB7XG4gICAgICAgIC4uLmNlbGxQcm9wcyxcbiAgICAgICAgaW5saW5lRWRpdCxcbiAgICAgICAgZmlsdGVyaW5nLFxuICAgICAgICByZWdpb24sXG4gICAgICAgIGludGwsXG4gICAgICAgIHNlbGVjdENvbXBvbmVudE9wdGlvbnMsXG4gICAgICB9OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICBjb2x1bW4gPSBHcmlkQ29sdW1uU2VydmljZS5jb2x1bW5Db21wb25lbnRUeXBlKFxuICAgICAgICBjb2x1bW4sXG4gICAgICAgIHRhYkluZGV4LFxuICAgICAgICBjb21wb25lbnRUeXBlUHJvcHMsXG4gICAgICAgIGNvbCxcbiAgICAgICAgY29sdW1uRnVuY3Rpb25zLFxuICAgICAgICB0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUsXG4gICAgICApO1xuICAgICAgY29sdW1ucy5wdXNoKGNvbHVtbik7XG4gICAgfSk7XG5cbiAgICBpZiAoaXNDcmVhdGluZykge1xuICAgICAgY29sdW1ucy5wdXNoKHtcbiAgICAgICAgd2lkdGg6IDM3LFxuICAgICAgICBpc1Jlc2l6YWJsZTogZmFsc2UsXG4gICAgICAgIGNvbHVtbktleTogJ3JlbW92ZU5ld0l0ZW0nLFxuICAgICAgICBjZWxsOiAoKSA9PiBudWxsLFxuICAgICAgICBjZWxsRWRpdDogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbENyZWF0ZTogcm93SW5kZXggPT4gKFxuICAgICAgICAgIDxJY29uXG4gICAgICAgICAgICBpZD17YG9jLWRhdGFncmlkLW5ldy1pdGVtLXJlbW92ZS0ke2dyaWQuaWR9LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgIHR5cGU9XCJpbmRpY2F0b3JcIlxuICAgICAgICAgICAgbmFtZT1cImRlbGV0ZVwiXG4gICAgICAgICAgICB3aWR0aD17MzB9XG4gICAgICAgICAgICBoZWlnaHQ9ezMwfVxuICAgICAgICAgICAgc3R5bGU9e3sgcGFkZGluZzogJzdweCcgfX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMucHJvcHMucmVtb3ZlTmV3SXRlbShncmlkLCByb3dJbmRleCl9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSxcbiAgICAgICAgY2VsbEZpbHRlcjogKCkgPT4gbnVsbCxcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gY29sdW1ucztcbiAgfTtcblxuICBpc0NlbGxFZGl0ZWQgPSAocm93SW5kZXgsIGNvbCwgY2VsbFR5cGUpID0+IHtcbiAgICBpZiAoY2VsbFR5cGUgIT09ICdlZGl0Jykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBpZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgcmV0dXJuICEhdGhpcy5wcm9wcy5lZGl0RGF0YS5nZXRJbihbaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgfTtcblxuICBoYW5kbGVBZnRlckFkZEl0ZW0gPSAoKSA9PiB7XG4gICAgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCA9IHRydWU7XG4gIH07XG5cbiAgaGFuZGxlQWZ0ZXJFZGl0UHJlc3MgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5zaXplKSB7XG4gICAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IHRydWU7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY3VycmVudFJvdzogdW5kZWZpbmVkLFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZUFmdGVyVmFsaWRhdGlvbkVycm9yID0gKCkgPT4ge1xuICAgIHRoaXMuZm9jdXNUb0Vycm9yQ2VsbCA9IHRydWU7XG4gIH07XG5cbiAgaGFuZGxlUm93Q2xpY2sgPSAoZSwgcm93SW5kZXgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5yb3dTZWxlY3QgJiYgIXRoaXMucHJvcHMuaXNDcmVhdGluZyAmJiAhdGhpcy5wcm9wcy5pc0VkaXRpbmcpIHtcbiAgICAgIGlmIChlLmN0cmxLZXkgfHwgZS5zaGlmdEtleSkge1xuICAgICAgICBkb2N1bWVudC5nZXRTZWxlY3Rpb24oKS5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICAgIH1cbiAgICAgIC8vIERvbid0IHRyaWdnZXIgc2VsZWN0aW9uIGNoYW5nZSBvbiB3aGVuIHVzZXIgY2xpY2tzIG9uIHNwZWNpYWwgY2VsbHMgbGlrZSBjaGVja2JveC9leHRyYVxuICAgICAgLy8gQ2hlY2sgdGhhdCBjbGlja2VkIG5vZGUncyBwYXJlbnQgb3IgcGFyZW50J3MgcGFyZW50IGRvZXNuJ3QgaGF2ZSBuby1yb3ctc2VsZWN0IGNsYXNzXG4gICAgICBjb25zdCB7IHBhcmVudE5vZGUgfSA9IGUudGFyZ2V0O1xuICAgICAgY29uc3QgcGFyZW50MWNsYXNzID0gcGFyZW50Tm9kZS5jbGFzc05hbWUgJiYgcGFyZW50Tm9kZS5jbGFzc05hbWUuaW5kZXhPZiA/IHBhcmVudE5vZGUuY2xhc3NOYW1lIDogJyc7XG4gICAgICBjb25zdCBwYXJlbnQyY2xhc3MgPSAgICAgICAgcGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZSAmJiBwYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lLmluZGV4T2YgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICA/IHBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWVcbiAgICAgICAgOiAnJztcbiAgICAgIGNvbnN0IHBhcmVudDNjbGFzcyA9IHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZVxuICAgICAgICAmJiBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUuaW5kZXhPZiAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgID8gcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgIDogJyc7XG4gICAgICBjb25zdCBwYXJlbnQ0Y2xhc3MgPSBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZVxuICAgICAgICAmJiBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZS5pbmRleE9mIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgPyBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZVxuICAgICAgICA6ICcnO1xuICAgICAgaWYgKFxuICAgICAgICBwYXJlbnQxY2xhc3MuaW5kZXhPZignbm8tcm93LXNlbGVjdCcpID09PSAtMVxuICAgICAgICAmJiBwYXJlbnQyY2xhc3MuaW5kZXhPZignbm8tcm93LXNlbGVjdCcpID09PSAtMVxuICAgICAgICAmJiBwYXJlbnQzY2xhc3MuaW5kZXhPZignbm8tcm93LXNlbGVjdCcpID09PSAtMVxuICAgICAgICAmJiBwYXJlbnQ0Y2xhc3MuaW5kZXhPZignbm8tcm93LXNlbGVjdCcpID09PSAtMVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMucHJvcHMuaXRlbVNlbGVjdGlvbkNoYW5nZShcbiAgICAgICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgdGhpcy5wcm9wcy5tdWx0aVNlbGVjdCAmJiBlLmN0cmxLZXksXG4gICAgICAgICAgdGhpcy5wcm9wcy5tdWx0aVNlbGVjdCAmJiBlLnNoaWZ0S2V5LFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5vblJvd0NsaWNrKSB7XG4gICAgICB0aGlzLnByb3BzLm9uUm93Q2xpY2soZSwgcm93SW5kZXgsIHRoaXMucHJvcHMuZGF0YS5nZXQocm93SW5kZXgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgaGFuZGxlQ29udGV4dE1lbnUgPSAoZSwgcm93SW5kZXgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5jb250ZXh0TWVudUl0ZW1zKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGl0ZW1TZWxlY3Rpb25DaGFuZ2UsIHNlbGVjdGVkSXRlbXMsIGdyaWQsIGRhdGEsXG4gICAgICB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY29udGV4dE1lbnVPcGVuOiB0cnVlLFxuICAgICAgICBjb250ZXh0TWVudVg6IGUuY2xpZW50WCxcbiAgICAgICAgY29udGV4dE1lbnVZOiBlLmNsaWVudFksXG4gICAgICB9KTtcbiAgICAgIC8vIElmIGNsaWNrZWQgaXRlbSBpcyBub3Qgc2VsZWN0ZWQsIGNoYW5nZSBzZWxlY3Rpb24gdG8gaXRcbiAgICAgIGlmICghc2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhkYXRhLmdldEluKFtyb3dJbmRleCwgLi4uZ3JpZC5pZEtleVBhdGhdKSkpIHtcbiAgICAgICAgaXRlbVNlbGVjdGlvbkNoYW5nZShncmlkLCByb3dJbmRleCk7XG4gICAgICB9XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25Eb2N1bWVudENsaWNrKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgaGFuZGxlQ29udGV4dE1lbnVJdGVtQ2xpY2sgPSAob25DbGljaywgc2VsZWN0ZWRJdGVtcywgc2VsZWN0ZWREYXRhKSA9PiAoKSA9PiB7XG4gICAgb25DbGljayhzZWxlY3RlZEl0ZW1zLCBzZWxlY3RlZERhdGEpO1xuICB9O1xuXG4gIGhhbmRsZVJvd0hlaWdodEdldHRlciA9IHJvd0luZGV4ID0+IHRoaXMucHJvcHMucm93SGVpZ2h0R2V0dGVyKFxuICAgIHRoaXMucHJvcHMuZGF0YS5nZXQocm93SW5kZXgpLFxuICAgIHJvd0luZGV4LFxuICApO1xuXG4gIHJlbmRlckNlbGwgPSBjb2wgPT4gKGNlbGxQcm9wcykgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGlzQ3JlYXRpbmcsIGlzRWRpdGluZywgY3JlYXRlRGF0YSwgc2VsZWN0ZWRDZWxsLCBncmlkLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgcm93SW5kZXgsIC4uLnByb3BzIH0gPSBjZWxsUHJvcHM7XG4gICAgbGV0IGNlbGw7XG4gICAgbGV0IGNlbGxUeXBlID0gJ3ZpZXcnO1xuICAgIGxldCBleHRyYVJvd0NvdW50ID0gMDsgLy8gaG93IG1hbnkgcm93cyB0byBpZ25vcmUgZnJvbSB0b3AsIG5ldyArIGZpbHRlciByb3dzXG4gICAgaWYgKGlzQ3JlYXRpbmcpIGV4dHJhUm93Q291bnQgPSBjcmVhdGVEYXRhLnNpemU7XG4gICAgY29uc3QgZXhpc3RpbmdSb3dzSW5kZXggPSByb3dJbmRleCAtIGV4dHJhUm93Q291bnQ7XG4gICAgaWYgKGlzQ3JlYXRpbmcpIHtcbiAgICAgIGlmIChyb3dJbmRleCA8PSBleHRyYVJvd0NvdW50IC0gMSkge1xuICAgICAgICBpZiAoY29sLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjZWxsID0gY29sLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ3JlYXRlQ2VsbFJlZihyb3dJbmRleCwgY29sKSxcbiAgICAgICAgICAgIHRoaXMub25DcmVhdGVDZWxsS2V5RG93bihyb3dJbmRleCwgY29sKSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGNlbGxUeXBlID0gJ2NyZWF0ZSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2VsbCA9IG51bGw7XG4gICAgICAgICAgY2VsbFR5cGUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjZWxsID0gY29sLmNlbGwoXG4gICAgICAgICAgZXhpc3RpbmdSb3dzSW5kZXgsXG4gICAgICAgICAgdGhpcy5oYW5kbGVDcmVhdGVDZWxsUmVmKGV4aXN0aW5nUm93c0luZGV4LCBjb2wpLFxuICAgICAgICAgIHRoaXMub25DcmVhdGVDZWxsS2V5RG93bihleGlzdGluZ1Jvd3NJbmRleCwgY29sKSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzRWRpdGluZyAmJiBjb2wuY2VsbEVkaXQpIHtcbiAgICAgIGNlbGwgPSBjb2wuY2VsbEVkaXQoXG4gICAgICAgIGV4aXN0aW5nUm93c0luZGV4LFxuICAgICAgICB0aGlzLmhhbmRsZUVkaXRDZWxsUmVmKGV4aXN0aW5nUm93c0luZGV4LCBjb2wpLFxuICAgICAgICB0aGlzLm9uRWRpdENlbGxLZXlEb3duKGV4aXN0aW5nUm93c0luZGV4LCBjb2wpLFxuICAgICAgKTtcbiAgICAgIGNlbGxUeXBlID0gJ2VkaXQnO1xuICAgIH0gZWxzZSB7XG4gICAgICBjZWxsID0gY29sLmNlbGwoXG4gICAgICAgIGV4aXN0aW5nUm93c0luZGV4LFxuICAgICAgICB0aGlzLmhhbmRsZUVkaXRDZWxsUmVmKGV4aXN0aW5nUm93c0luZGV4LCBjb2wpLFxuICAgICAgICB0aGlzLm9uRWRpdENlbGxLZXlEb3duKGV4aXN0aW5nUm93c0luZGV4LCBjb2wpLFxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3QgaXNTcGVjaWFsID0gcHJvcHMuY29sdW1uS2V5ID09PSAnc2VsZWN0aW9uQ2hlY2tib3gnIHx8IHByb3BzLmNvbHVtbktleSA9PT0gJ2V4dHJhQ29sdW1uJztcbiAgICBpZiAoKGNlbGxUeXBlID09PSAndmlldycgfHwgY2VsbFR5cGUgPT09ICdlZGl0JyB8fCBjZWxsVHlwZSA9PT0gJ2NyZWF0ZScpICYmICFpc1NwZWNpYWwpIHtcbiAgICAgIGNvbnN0IGdldFJvd0luZGV4ID0gY2VsbFR5cGUgPT09ICdjcmVhdGUnID8gcm93SW5kZXggOiByb3dJbmRleCAtIGV4dHJhUm93Q291bnQ7XG4gICAgICBjb25zdCBtZXNzYWdlRGF0YSA9IHRoaXMuZ2V0Q2VsbE1lc3NhZ2VzKGdldFJvd0luZGV4LCBjb2wsIGNlbGxUeXBlKTtcbiAgICAgIGNvbnN0IGlzRWRpdGVkID0gdGhpcy5pc0NlbGxFZGl0ZWQoZ2V0Um93SW5kZXgsIGNvbCwgY2VsbFR5cGUpO1xuICAgICAgY29uc3QgY2xhc3NOYW1lID0gc2VsZWN0ZWRDZWxsLmdldCgncm93SW5kZXgnKSA9PT0gcm93SW5kZXhcbiAgICAgICAgJiYgc2VsZWN0ZWRDZWxsLmdldCgnY29sdW1uS2V5JykgPT09IHByb3BzLmNvbHVtbktleVxuICAgICAgICA/ICdvYy1kYXRhZ3JpZC1jZWxsIGlzLXNlbGVjdGVkJ1xuICAgICAgICA6ICdvYy1kYXRhZ3JpZC1jZWxsJztcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxDZWxsXG4gICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICAgIHN0eWxlPXtjb2wuc3R5bGV9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDZWxsU2VsZWN0KGNlbGxUeXBlLCByb3dJbmRleCwgcHJvcHMuY29sdW1uS2V5KX1cbiAgICAgICAgPlxuICAgICAgICAgIDxDZWxsVG9vbHRpcFxuICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkQ2VsbC0ke2dyaWQuaWR9LSR7cHJvcHMuY29sdW1uS2V5fS0ke3Jvd0luZGV4fWB9XG4gICAgICAgICAgICBpc0VkaXRlZD17aXNFZGl0ZWR9XG4gICAgICAgICAgICBpc0Vycm9yPXshIW1lc3NhZ2VEYXRhLmVycm9yTWVzc2FnZX1cbiAgICAgICAgICAgIGlzV2FybmluZz17ISFtZXNzYWdlRGF0YS53YXJuaW5nTWVzc2FnZX1cbiAgICAgICAgICAgIGluZm9NZXNzYWdlPXttZXNzYWdlRGF0YS5pbmZvTWVzc2FnZX1cbiAgICAgICAgICAgIGVycm9yTWVzc2FnZT17bWVzc2FnZURhdGEuZXJyb3JNZXNzYWdlfVxuICAgICAgICAgICAgd2FybmluZ01lc3NhZ2U9e21lc3NhZ2VEYXRhLndhcm5pbmdNZXNzYWdlfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtjZWxsfVxuICAgICAgICAgIDwvQ2VsbFRvb2x0aXA+XG4gICAgICAgIDwvQ2VsbD5cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8Q2VsbCB7Li4ucHJvcHN9IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWNlbGxcIiBzdHlsZT17Y29sLnN0eWxlfT5cbiAgICAgICAge2NlbGx9XG4gICAgICA8L0NlbGw+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJDb2x1bW5zID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGFsbERhdGFTaXplLCBncmlkLCBpc0NyZWF0aW5nLCBpc0J1c3ksIHZpc2libGVDb2x1bW5zLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghYWxsRGF0YVNpemUgJiYgIWlzQnVzeSAmJiAhaXNDcmVhdGluZyAmJiAhZ3JpZC5wYWdpbmF0aW9uKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Q29sdW1uXG4gICAgICAgICAgY29sdW1uS2V5PVwiZGF0YUVtcHR5Q29sdW1uXCJcbiAgICAgICAgICBoZWFkZXI9eyhcbiAgICAgICAgICAgIDxDZWxsIHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgICAgIDxNIGlkPVwiR3JpZC5Ob0l0ZW1zXCIgLz5cbiAgICAgICAgICAgIDwvQ2VsbD5cbil9XG4gICAgICAgICAgd2lkdGg9ezEwfVxuICAgICAgICAgIGlzUmVzaXphYmxlPXtmYWxzZX1cbiAgICAgICAgICBmbGV4R3Jvdz17MX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICAgIGlmICghdmlzaWJsZUNvbHVtbnMuc2l6ZSkge1xuICAgICAgaWYgKGlzQnVzeSkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxDb2x1bW5cbiAgICAgICAgICAgIGNvbHVtbktleT1cImRhdGFFbXB0eUNvbHVtblwiXG4gICAgICAgICAgICBoZWFkZXI9ezxDZWxsPiZuYnNwOzwvQ2VsbD59XG4gICAgICAgICAgICB3aWR0aD17MTB9XG4gICAgICAgICAgICBpc1Jlc2l6YWJsZT17ZmFsc2V9XG4gICAgICAgICAgICBmbGV4R3Jvdz17MX1cbiAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPENvbHVtblxuICAgICAgICAgIGNvbHVtbktleT1cImRhdGFFbXB0eUNvbHVtblwiXG4gICAgICAgICAgaGVhZGVyPXsoXG4gICAgICAgICAgICA8Q2VsbCBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInIH19PlxuICAgICAgICAgICAgICA8TSBpZD1cIkdyaWQuTm9Db2x1bW5zXCIgLz5cbiAgICAgICAgICAgIDwvQ2VsbD5cbil9XG4gICAgICAgICAgd2lkdGg9ezEwfVxuICAgICAgICAgIGlzUmVzaXphYmxlPXtmYWxzZX1cbiAgICAgICAgICBmbGV4R3Jvdz17MX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnN0IGNvbHVtbnMgPSB0aGlzLmdlbmVyYXRlQ29sdW1ucygpO1xuICAgIGlmIChjb2x1bW5zLmxlbmdodCA9PT0gMCkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIGNvbHVtbnMubWFwKGNvbCA9PiAoXG4gICAgICA8Q29sdW1uXG4gICAgICAgIGtleT17Y29sLmNvbHVtbktleX1cbiAgICAgICAgY29sdW1uS2V5PXtjb2wuY29sdW1uS2V5fVxuICAgICAgICBoZWFkZXI9eyhcbiAgICAgICAgICA8SGVhZGVyQ2VsbFxuICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkSGVhZGVyLSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbC5jb2x1bW5LZXl9YH1cbiAgICAgICAgICAgIGdyaWQ9e3RoaXMucHJvcHMuZ3JpZH1cbiAgICAgICAgICAgIGNvbHVtbnM9e3RoaXMucHJvcHMuY29sdW1uc31cbiAgICAgICAgICAgIGNvbHVtbj17Y29sfVxuICAgICAgICAgICAgY3VycmVudFNvcnRDb2x1bW49e3RoaXMucHJvcHMuc29ydENvbHVtbn1cbiAgICAgICAgICAgIGN1cnJlbnRTb3J0T3JkZXI9e3RoaXMucHJvcHMuc29ydE9yZGVyfVxuICAgICAgICAgICAgb25Tb3J0Q2hhbmdlPXt0aGlzLnByb3BzLnNvcnRDaGFuZ2V9XG4gICAgICAgICAgICBpc0J1c3k9e3RoaXMucHJvcHMuaXNCdXN5fVxuICAgICAgICAgICAgZmlsdGVyaW5nPXt0aGlzLnByb3BzLmZpbHRlcmluZyAmJiB0aGlzLnByb3BzLmlzRmlsdGVyaW5nfVxuICAgICAgICAgICAgd2lkdGg9e3RoaXMucHJvcHMuY29sdW1uV2lkdGhzLmdldChjb2wuY29sdW1uS2V5LCBjb2wud2lkdGgpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtjb2wuaGVhZGVyfVxuICAgICAgICAgIDwvSGVhZGVyQ2VsbD5cbil9XG4gICAgICAgIGNlbGw9e3RoaXMucmVuZGVyQ2VsbChjb2wpfVxuICAgICAgICB3aWR0aD17dGhpcy5wcm9wcy5jb2x1bW5XaWR0aHMuZ2V0KGNvbC5jb2x1bW5LZXksIGNvbC53aWR0aCl9XG4gICAgICAgIG1pbldpZHRoPXtjb2wubWluV2lkdGh9XG4gICAgICAgIG1heFdpZHRoPXtjb2wubWF4V2lkdGh9XG4gICAgICAgIGlzUmVzaXphYmxlPXtjb2wuaXNSZXNpemFibGV9XG4gICAgICAgIGZsZXhHcm93PXtjb2wuZmxleEdyb3cgPyBjb2wuZmxleEdyb3cgOiAwfVxuICAgICAgICBmaXhlZD17Y29sLmZpeGVkfVxuICAgICAgICBmaXhlZFJpZ2h0PXtjb2wuZml4ZWRSaWdodH1cbiAgICAgICAgYWxsb3dDZWxsc1JlY3ljbGluZz17Y29sLmFsbG93Q2VsbHNSZWN5Y2xpbmd9XG4gICAgICAvPlxuICAgICkpO1xuICB9O1xuXG4gIHJlbmRlckNvbnRleHRNZW51ID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGNvbnRleHRNZW51SXRlbXMsIGRhdGEsIGdyaWQsIHNlbGVjdGVkSXRlbXMsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBjb250ZXh0TWVudVgsIGNvbnRleHRNZW51WSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBzdHlsZSA9IHtcbiAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICB6SW5kZXg6IDEwMDAwLFxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICB0b3A6IGAke2NvbnRleHRNZW51WX1weGAsXG4gICAgICBsZWZ0OiBgJHtjb250ZXh0TWVudVh9cHhgLFxuICAgIH07XG4gICAgY29uc3Qgc2VsZWN0ZWREYXRhID0gZGF0YS5maWx0ZXIoZCA9PiBzZWxlY3RlZEl0ZW1zLmluY2x1ZGVzKGQuZ2V0SW4oZ3JpZC5pZEtleVBhdGgpKSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDx1bCBjbGFzc05hbWU9XCJkcm9wZG93bi1tZW51IG9jLWRhdGFncmlkLWNvbnRleHQtbWVudSBvcGVuXCIgc3R5bGU9e3N0eWxlfT5cbiAgICAgICAge2NvbnRleHRNZW51SXRlbXNcbiAgICAgICAgICAmJiBjb250ZXh0TWVudUl0ZW1zLm1hcFxuICAgICAgICAgICYmIGNvbnRleHRNZW51SXRlbXMubWFwKChpdGVtLCBpKSA9PiB7XG4gICAgICAgICAgICBsZXQgeyBkaXNhYmxlZCB9ID0gaXRlbTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbS5kaXNhYmxlZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICBkaXNhYmxlZCA9IGl0ZW0uZGlzYWJsZWQoc2VsZWN0ZWRJdGVtcywgc2VsZWN0ZWREYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxNZW51SXRlbVxuICAgICAgICAgICAgICAgIGtleT17aX0gLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAgICAgICAgIGhlYWRlcj17aXRlbS5oZWFkZXJ9XG4gICAgICAgICAgICAgICAgZGl2aWRlcj17aXRlbS5kaXZpZGVyfVxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgICB0aXRsZT17aXRlbS50aXRsZX1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkIHx8ICFpdGVtLm9uQ2xpY2tcbiAgICAgICAgICAgICAgICAgICAgPyBudWxsXG4gICAgICAgICAgICAgICAgICAgIDogdGhpcy5oYW5kbGVDb250ZXh0TWVudUl0ZW1DbGljayhpdGVtLm9uQ2xpY2ssIHNlbGVjdGVkSXRlbXMsIHNlbGVjdGVkRGF0YSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7aXRlbS52YWx1ZX1cbiAgICAgICAgICAgICAgPC9NZW51SXRlbT5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSl9XG4gICAgICA8L3VsPlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGdyaWRDbGFzc05hbWUgPSBjbGFzc05hbWVzKHtcbiAgICAgICdvYy1kYXRhZ3JpZC1jb250YWluZXInOiB0cnVlLFxuICAgICAgJ3dpdGgtYWN0aW9uYmFyJzogdGhpcy5wcm9wcy5pbmxpbmVFZGl0ICYmICF0aGlzLnByb3BzLmRpc2FibGVBY3Rpb25CYXIsXG4gICAgICAnaXMtYnVzeSc6IHRoaXMucHJvcHMuaXNCdXN5LFxuICAgICAgJ2lzLWVkaXRpbmcnOiB0aGlzLnByb3BzLmlzRWRpdGluZyxcbiAgICAgICdpcy1jcmVhdGluZyc6IHRoaXMucHJvcHMuaXNDcmVhdGluZyxcbiAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgfSk7XG5cbiAgICAvLyBjaGVjayBpZiB0aGVyZSBpcyBhIG5ldyByZXF1ZXN0IHRvIGNoYW5nZSBlZGl0IG1vZGUgZm9jdXNcbiAgICB0aGlzLnNldEZvY3VzVG8odGhpcy5wcm9wcy5mb2N1c1R5cGUpO1xuXG4gICAgbGV0IGFjdGlvbkJhciA9IG51bGw7XG4gICAgbGV0IGFjdGlvbkJhclJpZ2h0ID0gbnVsbDtcbiAgICBsZXQgYWN0aW9uQmFyTGVmdCA9IG51bGw7XG4gICAgaWYgKFxuICAgICAgKHRoaXMucHJvcHMuYWN0aW9uQmFyXG4gICAgICAgIHx8IHRoaXMucHJvcHMuaW5saW5lRWRpdFxuICAgICAgICB8fCB0aGlzLnByb3BzLmZpbHRlcmluZ1xuICAgICAgICB8fCB0aGlzLnByb3BzLnJlbW92aW5nKVxuICAgICAgJiYgIXRoaXMucHJvcHMuZGlzYWJsZUFjdGlvbkJhclxuICAgICkge1xuICAgICAgYWN0aW9uQmFyUmlnaHQgPSAoXG4gICAgICAgIDxBY3Rpb25CYXIgcG9zaXRpb249XCJyaWdodFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtYWN0aW9uYmFyLXJpZ2h0XCI+e3RoaXMucHJvcHMuYWN0aW9uQmFyfTwvZGl2PlxuICAgICAgICAgIHt0aGlzLnByb3BzLmZpbHRlcmluZ1xuICAgICAgICAgICAgJiYgdGhpcy5wcm9wcy5kaXNhYmxlRHJvcGRvd25cbiAgICAgICAgICAgICYmICF0aGlzLnByb3BzLmRpc2FibGVGaWx0ZXJpbmdDb250cm9scyAmJiA8RmlsdGVyaW5nQ29udHJvbHMgey4uLnRoaXMucHJvcHN9IC8+fVxuICAgICAgICAgIHt0aGlzLnByb3BzLmlubGluZUVkaXQgJiYgKFxuICAgICAgICAgICAgPElubGluZUVkaXRDb250cm9sc1xuICAgICAgICAgICAgICBhZnRlckFkZEl0ZW09e3RoaXMuaGFuZGxlQWZ0ZXJBZGRJdGVtfVxuICAgICAgICAgICAgICBhZnRlckVkaXRQcmVzcz17dGhpcy5oYW5kbGVBZnRlckVkaXRQcmVzc31cbiAgICAgICAgICAgICAgYWZ0ZXJWYWxpZGF0aW9uRXJyb3I9e3RoaXMuaGFuZGxlQWZ0ZXJWYWxpZGF0aW9uRXJyb3J9XG4gICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuICAgICAgICAgIHsodGhpcy5wcm9wcy5kcm9wZG93bk1lbnVJdGVtc1xuICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5yZW1vdmluZ1xuICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5jb2x1bW5TZXR0aW5nc1xuICAgICAgICAgICAgfHwgKHRoaXMucHJvcHMuZmlsdGVyaW5nICYmICF0aGlzLnByb3BzLmRpc2FibGVEcm9wZG93bikpICYmIChcbiAgICAgICAgICAgIDxEcm9wZG93bkNvbnRyb2xzIHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQWN0aW9uQmFyPlxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuYWN0aW9uQmFyTGVmdCB8fCB0aGlzLnByb3BzLmdyaWRIZWFkZXIpIHtcbiAgICAgIGFjdGlvbkJhckxlZnQgPSAoXG4gICAgICAgIDxBY3Rpb25CYXIgcG9zaXRpb249XCJsZWZ0XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1ncmlkaGVhZGVyXCI+e3RoaXMucHJvcHMuZ3JpZEhlYWRlcn08L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWFjdGlvbmJhci1sZWZ0XCI+e3RoaXMucHJvcHMuYWN0aW9uQmFyTGVmdH08L2Rpdj5cbiAgICAgICAgPC9BY3Rpb25CYXI+XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoYWN0aW9uQmFyTGVmdCB8fCBhY3Rpb25CYXJSaWdodCkge1xuICAgICAgYWN0aW9uQmFyID0gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWFjdGlvbmJhci1jb250YWluZXJcIj5cbiAgICAgICAgICB7YWN0aW9uQmFyTGVmdH1cbiAgICAgICAgICB7YWN0aW9uQmFyUmlnaHR9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gICAgbGV0IHJvd3NDb3VudCA9IHRoaXMucHJvcHMucm93c0NvdW50IHx8IHRoaXMucHJvcHMucm93c0NvdW50ID09PSAwXG4gICAgICA/IHRoaXMucHJvcHMucm93c0NvdW50XG4gICAgICA6IHRoaXMucHJvcHMuZGF0YS5zaXplO1xuICAgIGlmICh0aGlzLnByb3BzLmlzQ3JlYXRpbmcpIHJvd3NDb3VudCArPSB0aGlzLnByb3BzLmNyZWF0ZURhdGEuc2l6ZTtcbiAgICBpZiAoIXRoaXMucHJvcHMudmlzaWJsZUNvbHVtbnMuc2l6ZSkgcm93c0NvdW50ID0gMDtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD17YG9jLWRhdGFncmlkLSR7dGhpcy5wcm9wcy5ncmlkLmlkfWB9XG4gICAgICAgIGNsYXNzTmFtZT17Z3JpZENsYXNzTmFtZX1cbiAgICAgICAgc3R5bGU9e3RoaXMucHJvcHMuY29udGFpbmVyU3R5bGV9XG4gICAgICA+XG4gICAgICAgIHt0aGlzLnByb3BzLmlzQnVzeSAmJiA8U3Bpbm5lciAvPn1cbiAgICAgICAge3RoaXMuc3RhdGUuY29udGV4dE1lbnVPcGVuICYmIHRoaXMucmVuZGVyQ29udGV4dE1lbnUoKX1cbiAgICAgICAge2FjdGlvbkJhcn1cbiAgICAgICAgPFJlc3BvbnNpdmVGaXhlZERhdGFUYWJsZVxuICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgIGlkPXt0aGlzLnByb3BzLmdyaWQuaWR9XG4gICAgICAgICAgcm93c0NvdW50PXtyb3dzQ291bnR9XG4gICAgICAgICAgaGVhZGVySGVpZ2h0PXtcbiAgICAgICAgICAgICh0aGlzLnByb3BzLmZpbHRlcmluZyAmJiB0aGlzLnByb3BzLmlzRmlsdGVyaW5nKVxuICAgICAgICAgICAgICA/IHRoaXMucHJvcHMuaGVhZGVySGVpZ2h0ICsgdGhpcy5wcm9wcy5maWx0ZXJSb3dIZWlnaHRcbiAgICAgICAgICAgICAgOiB0aGlzLnByb3BzLmhlYWRlckhlaWdodFxuICAgICAgICAgIH1cbiAgICAgICAgICByb3dIZWlnaHQ9e3RoaXMucHJvcHMucm93SGVpZ2h0fVxuICAgICAgICAgIG9uQ29sdW1uUmVzaXplRW5kQ2FsbGJhY2s9e3RoaXMub25Db2x1bW5SZXNpemVFbmRDYWxsYmFja31cbiAgICAgICAgICBpc0NvbHVtblJlc2l6aW5nPXtmYWxzZX1cbiAgICAgICAgICBvblJvd0NsaWNrPXt0aGlzLmhhbmRsZVJvd0NsaWNrfVxuICAgICAgICAgIHNjcm9sbFRvQ29sdW1uPXt0aGlzLnByb3BzLnNjcm9sbFRvQ29sdW1uIHx8IHRoaXMuc3RhdGUuY3VycmVudENvbHVtbn1cbiAgICAgICAgICBzY3JvbGxUb3A9e3RoaXMucHJvcHMuc2Nyb2xsVG9wfVxuICAgICAgICAgIHNjcm9sbFRvUm93PXt0aGlzLmdldFNjcm9sbFRvUm93KCl9XG4gICAgICAgICAgb25Sb3dEb3VibGVDbGljaz17dGhpcy5wcm9wcy5vblJvd0RvdWJsZUNsaWNrfVxuICAgICAgICAgIG9uUm93TW91c2VEb3duPXt0aGlzLnByb3BzLm9uTW91c2VEb3dufVxuICAgICAgICAgIG9uUm93TW91c2VFbnRlcj17dGhpcy5wcm9wcy5vblJvd01vdXNlRW50ZXJ9XG4gICAgICAgICAgb25Sb3dNb3VzZUxlYXZlPXt0aGlzLnByb3BzLm9uUm93TW91c2VMZWF2ZX1cbiAgICAgICAgICBvblNjcm9sbFN0YXJ0PXt0aGlzLnByb3BzLm9uU2Nyb2xsU3RhcnR9XG4gICAgICAgICAgb25TY3JvbGxFbmQ9e3RoaXMucHJvcHMub25TY3JvbGxFbmR9XG4gICAgICAgICAgcm93Q2xhc3NOYW1lR2V0dGVyPXt0aGlzLmdldFJvd0NsYXNzTmFtZX1cbiAgICAgICAgICByb3dIZWlnaHRHZXR0ZXI9e3RoaXMucHJvcHMucm93SGVpZ2h0R2V0dGVyICYmIHRoaXMuaGFuZGxlUm93SGVpZ2h0R2V0dGVyfVxuICAgICAgICAgIG9uQ29udGVudEhlaWdodENoYW5nZT17dGhpcy5wcm9wcy5vbkNvbnRlbnRIZWlnaHRDaGFuZ2V9XG4gICAgICAgICAgb25Sb3dDb250ZXh0TWVudT17dGhpcy5oYW5kbGVDb250ZXh0TWVudX1cbiAgICAgICAgPlxuICAgICAgICAgIHt0aGlzLnJlbmRlckNvbHVtbnMoKX1cbiAgICAgICAgPC9SZXNwb25zaXZlRml4ZWREYXRhVGFibGU+XG4gICAgICAgIHt0aGlzLnByb3BzLmlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW4gJiYgKFxuICAgICAgICAgIDxDb2x1bW5TZXR0aW5nc01vZGFsXG4gICAgICAgICAgICBncmlkPXt0aGlzLnByb3BzLmdyaWR9XG4gICAgICAgICAgICBjb2x1bW5zPXt0aGlzLnByb3BzLmNvbHVtbnN9XG4gICAgICAgICAgICB2aXNpYmxlQ29sdW1ucz17dGhpcy5wcm9wcy52aXNpYmxlQ29sdW1uc31cbiAgICAgICAgICAgIGNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbD17dGhpcy5wcm9wcy5jbG9zZUNvbHVtblNldHRpbmdzTW9kYWx9XG4gICAgICAgICAgICBzYXZlQ29sdW1uU2V0dGluZ3M9e3RoaXMucHJvcHMuc2F2ZUNvbHVtblNldHRpbmdzfVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEYXRhR3JpZDtcbiJdfQ==