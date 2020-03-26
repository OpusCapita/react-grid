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
            createData = _this$props.createData,
            onLastCellTabPress = _this$props.onLastCellTabPress;
        var gridColumns = Utils.visibleColumns(columns, visibleColumns);

        var getColumnKeyByIndex = function getColumnKeyByIndex(i) {
          return Utils.getColumnKey(gridColumns[i]);
        };

        var rowsSize = create ? createData.size : data.size;
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

                while (disabled && rowInd <= rowsSize) {
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
          value = _this.getCreateItemValue(rowIndex, col);
        }

        switch (componentType) {
          case 'currency':
            {
              var numericValue = value ? Number(value.replace(_this.getRegEx(col.valueOptions && col.valueOptions.thousandSeparator || thousandSeparator), '').replace(_this.getRegEx(col.valueOptions && col.valueOptions.decimalSeparator || decimalSeparator), '.')) : value;

              if (numericValue !== _this.getCreateItemValue(rowIndex, col)) {
                createCellValueChange(grid, rowIndex, col.valueKeyPath, numericValue);
              }

              break;
            }

          case 'float':
          case 'number':
          case 'text':
            {
              if (value !== _this.getCreateItemValue(rowIndex, col)) {
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
        var type = e.target.type;

        if (type !== 'checkbox') {
          e.preventDefault();
        }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiTWFwIiwiTGlzdCIsImNvbm5lY3QiLCJpbmplY3RJbnRsIiwiRm9ybWF0dGVkTWVzc2FnZSIsIk0iLCJDb2x1bW4iLCJDZWxsIiwiY2xhc3NOYW1lcyIsIkljb24iLCJTcGlubmVyIiwiQ2hlY2tib3giLCJSZXNwb25zaXZlRml4ZWREYXRhVGFibGUiLCJIZWFkZXJDZWxsIiwiQWN0aW9uQmFyIiwiSW5saW5lRWRpdENvbnRyb2xzIiwiRmlsdGVyaW5nQ29udHJvbHMiLCJEcm9wZG93bkNvbnRyb2xzIiwiZGF0YWdyaWRBY3Rpb25zIiwiQ2VsbFRvb2x0aXAiLCJDb2x1bW5TZXR0aW5nc01vZGFsIiwicHJvcFR5cGVzIiwiZGVmYXVsdFByb3BzIiwiS0VZX0NPREVTIiwicGFnaW5hdGlvbiIsIkNvbnRleHRNZW51IiwiVXRpbHMiLCJHcmlkQ29sdW1uU2VydmljZSIsIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwib3duUHJvcHMiLCJHUklEIiwiZ3JpZCIsImlzQnVzeSIsImRhdGFncmlkIiwiZ2V0SW4iLCJpZCIsImlzRWRpdGluZyIsImlzQ3JlYXRpbmciLCJpc0ZpbHRlcmluZyIsImlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW4iLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwidmlzaWJsZUNvbHVtbnMiLCJjb2x1bW5XaWR0aHMiLCJzZWxlY3RlZENlbGwiLCJzZWxlY3RlZEl0ZW1zIiwiZGF0YSIsImVkaXREYXRhIiwiY3JlYXRlRGF0YSIsImZpbHRlckRhdGEiLCJjZWxsTWVzc2FnZXMiLCJjcmVhdGVDZWxsTWVzc2FnZXMiLCJhbGxEYXRhU2l6ZSIsInNpemUiLCJsYW5ndWFnZSIsImdldExhbmd1YWdlIiwidXNlciIsInJlZ2lvbiIsImdldFJlZ2lvbiIsImRhdGVGb3JtYXQiLCJnZXREYXRlRm9ybWF0IiwidGhvdXNhbmRTZXBhcmF0b3IiLCJnZXRUaG91c2FuZFNlcGFyYXRvciIsImRlY2ltYWxTZXBhcmF0b3IiLCJnZXREZWNpbWFsU2VwYXJhdG9yIiwiZm9yY2VSZWZyZXNoVGltZXN0YW1wIiwiZ2V0IiwiZm9jdXNUeXBlIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwiRGF0YUdyaWQiLCJwcm9wcyIsImNvbnRleHRNZW51SXRlbXMiLCJzZXRTdGF0ZSIsImNvbnRleHRNZW51T3BlbiIsImRvY3VtZW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIm9uRG9jdW1lbnRDbGljayIsIm5ld0NvbHVtbldpZHRoIiwiY29sdW1uS2V5IiwicmVzaXplQ29sdW1uIiwicm93SW5kZXgiLCJjb2wiLCJlIiwiY3JlYXRlIiwiZW5hYmxlQXJyb3dOYXZpZ2F0aW9uIiwiY2VsbFJlZnMiLCJjcmVhdGVDZWxsUmVmcyIsImFycm93S2V5cyIsIkRPV04iLCJVUCIsIkxFRlQiLCJSSUdIVCIsImNvbHVtbnMiLCJvbkxhc3RDZWxsVGFiUHJlc3MiLCJncmlkQ29sdW1ucyIsImdldENvbHVtbktleUJ5SW5kZXgiLCJpIiwiZ2V0Q29sdW1uS2V5Iiwicm93c1NpemUiLCJjdXJyZW50Q2VsbCIsInByb3h5IiwiaXNDdXJzb3JBdFN0YXJ0IiwidHlwZSIsInNlbGVjdGlvblN0YXJ0IiwiaXNDdXJzb3JBdEVuZCIsInNlbGVjdGlvbkVuZCIsInZhbHVlIiwibGVuZ3RoIiwic2VsZWN0UmVmIiwic2VsZWN0IiwiZ2V0U2VsZWN0UmVmIiwiaW5jbHVkZXMiLCJrZXlDb2RlIiwicHJldmVudERlZmF1bHQiLCJFTlRFUiIsIkVTQyIsImFkZE5ld0l0ZW0iLCJnZXRDb2x1bW5EZWZhdWx0VmFsdWVzIiwiZm9jdXNUb0NyZWF0ZUNlbGwiLCJuZXh0RWxlbWVudCIsIm1lbnVJc09wZW4iLCJtb3ZlQ2VsbEZvY3VzIiwiVEFCIiwiY29sdW1uSW5kIiwiZmluZEluZGV4IiwiYyIsInZhbHVlS2V5UGF0aCIsImpvaW4iLCJkaXNhYmxlZCIsInJvd0luZCIsInNoaWZ0S2V5Iiwib25DZWxsS2V5RG93biIsInZhbHVlUGFyc2VyIiwiZXZlbnRPckRhdGEiLCJyYXdWYWx1ZSIsInRhcmdldCIsInVuZGVmaW5lZCIsImZpbHRlckNlbGxWYWx1ZUNoYW5nZSIsInNlbGVjdGVkRmlsdGVycyIsImNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSIsImNvbXBvbmVudFR5cGUiLCJvbkNyZWF0ZVZhbHVlQ2hhbmdlIiwib25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUiLCJtYXRjaFZhbHVlIiwib25DcmVhdGVDZWxsVmFsdWVDaGFuZ2UiLCJuZXdWYWx1ZUtleVBhdGgiLCJ2IiwibmV3VmFsdWUiLCJ2YWxpZGF0b3JzIiwiY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUiLCJlZGl0Q2VsbFZhbHVlQ2hhbmdlIiwiZGF0YUlkIiwiZ2V0RGF0YUlkQnlSb3dJbmRleCIsIm9uRWRpdFZhbHVlQ2hhbmdlIiwib25FZGl0Q2VsbFZhbHVlQ2hhbmdlIiwiZWRpdENlbGxWYWx1ZVZhbGlkYXRlIiwic2VwYXJhdG9yIiwiUmVnRXhwIiwiZ2V0Q3JlYXRlSXRlbVZhbHVlIiwibnVtZXJpY1ZhbHVlIiwiTnVtYmVyIiwicmVwbGFjZSIsImdldFJlZ0V4IiwidmFsdWVPcHRpb25zIiwib25DcmVhdGVCbHVyIiwiZ2V0RWRpdEl0ZW1WYWx1ZSIsIm9uRWRpdEJsdXIiLCJjZWxsVHlwZSIsImlucHV0VHlwZSIsImNlbGxTZWxlY3Rpb25DaGFuZ2UiLCJjZWxsU2VsZWN0IiwiY29tcG9uZW50IiwiaW5wdXRSZWYiLCJpZEtleVBhdGgiLCJpbmRleCIsIm9wdGlvbnMiLCJlZGl0VmFsdWUiLCJvcmlnaW5hbFZhbHVlIiwic2VsZWN0T3B0aW9ucyIsImZpbmQiLCJvYmoiLCJTdHJpbmciLCJ2YWwiLCJ0b0pTIiwibW9kZSIsImNvbXBvbmVudERpc2FibGVkIiwiZGlzYWJsZUVkaXRpbmciLCJkaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaCIsIm1hdGNoVmFsdWVLZXlQYXRoIiwicm93Q2xhc3NOYW1lcyIsImV4dHJhUm93Q291bnQiLCJwdXNoIiwiaW5kZXhPZiIsInJvd0NsYXNzTmFtZUdldHRlciIsInJldHVybkRhdGEiLCJpbmZvTWVzc2FnZSIsImVycm9yTWVzc2FnZSIsIndhcm5pbmdNZXNzYWdlIiwic2Nyb2xsVG9Sb3ciLCJzY3JvbGxOZXdSb3ciLCJzY3JvbGxJbkVkaXRNb2RlIiwiY3VycmVudFJvdyIsImdldFNlbGVjdGVkSXRlbUluZGV4IiwiZmlyc3QiLCJmb2N1c1RvIiwicHJldkZvY3VzVG8iLCJmb2N1c1RvTGFzdFJvdyIsInJlZiIsImZvY3VzIiwiZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZSIsImZvY3VzVG9FZGl0Q2VsbCIsInNlbGVjdGVkUm93SW5kZXgiLCJjb2x1bW5JbmRleCIsImVsZW1lbnRUeXBlcyIsImN1cnJlbnRDb2x1bW4iLCJzZXRUaW1lb3V0Iiwic2VsZWN0QWxsSXRlbXNDaGFuZ2UiLCJpbmxpbmVFZGl0IiwiZmlsdGVyaW5nIiwiaW50bCIsInNlbGVjdENvbXBvbmVudE9wdGlvbnMiLCJleHRyYUNvbHVtbiIsInJvd1NlbGVjdENoZWNrYm94Q29sdW1uIiwic2hvd1NlbGVjdEFsbENoZWNrYm94IiwidGFiSW5kZXgiLCJ3aWR0aCIsImlzUmVzaXphYmxlIiwiaXNTb3J0YWJsZSIsImNlbGwiLCJ2YWx1ZVJlbmRlciIsImNlbGxFZGl0IiwiY2VsbENyZWF0ZSIsImNlbGxGaWx0ZXIiLCJoZWFkZXIiLCJoYW5kbGVTZWxlY3RBbGxDaGVja0JveE9uQ2hhbmdlIiwicm93SXRlbSIsIml0ZW1JZCIsInNlbGVjdGVkIiwiaGFuZGxlU2VsZWN0aW9uQ2hlY2tCb3hPbkNoYW5nZSIsImZvckVhY2giLCJ2aXNpYmxlQ29sdW1uS2V5Iiwib3JnQ29sIiwidmFsdWVFbXB0eUNoZWNrZXIiLCJnZXRWYWx1ZUVtcHR5Q2hlY2tlciIsImZvcm1hdCIsImlzUmVxdWlyZWQiLCJjb2x1bW4iLCJiYXNlQ29sdW1uIiwiY29sdW1uRnVuY3Rpb25zIiwiZWRpdCIsImdldEl0ZW1WYWx1ZSIsIm9uQ2VsbFZhbHVlQ2hhbmdlIiwib25DZWxsQmx1ciIsIm9uRWRpdENlbGxCbHVyIiwib25DZWxsRm9jdXMiLCJvbkVkaXRDZWxsS2V5RG93biIsImhhbmRsZUNlbGxSZWYiLCJoYW5kbGVFZGl0Q2VsbFJlZiIsIm9uQ3JlYXRlQ2VsbEJsdXIiLCJvbkNyZWF0ZUNlbGxLZXlEb3duIiwiaGFuZGxlQ3JlYXRlQ2VsbFJlZiIsImZpbHRlciIsImdldEZpbHRlckl0ZW1WYWx1ZSIsImdldEl0ZW1NdWx0aVZhbHVlIiwiZ2V0RmlsdGVySXRlbU11bHRpVmFsdWUiLCJvbkZpbHRlckNlbGxWYWx1ZUNoYW5nZSIsIm9uQ2VsbE11bHRpVmFsdWVCbHVyIiwib25GaWx0ZXJDZWxsTXVsdGlWYWx1ZUJsdXIiLCJvbkNlbGxNdWx0aVZhbHVlQ2hhbmdlIiwib25GaWx0ZXJDZWxsTXVsdGlWYWx1ZUNoYW5nZSIsImNlbGxQcm9wcyIsImNvbHVtbkNlbGwiLCJjb21wb25lbnRUeXBlUHJvcHMiLCJjb2x1bW5Db21wb25lbnRUeXBlIiwicGFkZGluZyIsInJlbW92ZU5ld0l0ZW0iLCJmb2N1c1RvRXJyb3JDZWxsIiwiY3RybEtleSIsImdldFNlbGVjdGlvbiIsInJlbW92ZUFsbFJhbmdlcyIsInBhcmVudE5vZGUiLCJwYXJlbnQxY2xhc3MiLCJjbGFzc05hbWUiLCJwYXJlbnQyY2xhc3MiLCJwYXJlbnQzY2xhc3MiLCJwYXJlbnQ0Y2xhc3MiLCJyb3dTZWxlY3QiLCJpdGVtU2VsZWN0aW9uQ2hhbmdlIiwibXVsdGlTZWxlY3QiLCJvblJvd0NsaWNrIiwic3RvcFByb3BhZ2F0aW9uIiwiY29udGV4dE1lbnVYIiwiY2xpZW50WCIsImNvbnRleHRNZW51WSIsImNsaWVudFkiLCJhZGRFdmVudExpc3RlbmVyIiwicm93SGVpZ2h0R2V0dGVyIiwiZXhpc3RpbmdSb3dzSW5kZXgiLCJpc1NwZWNpYWwiLCJnZXRSb3dJbmRleCIsIm1lc3NhZ2VEYXRhIiwiZ2V0Q2VsbE1lc3NhZ2VzIiwiaXNFZGl0ZWQiLCJpc0NlbGxFZGl0ZWQiLCJzdHlsZSIsImhhbmRsZUNlbGxTZWxlY3QiLCJ0ZXh0QWxpZ24iLCJnZW5lcmF0ZUNvbHVtbnMiLCJsZW5naHQiLCJtYXAiLCJzb3J0Q2hhbmdlIiwicmVuZGVyQ2VsbCIsIm1pbldpZHRoIiwibWF4V2lkdGgiLCJmbGV4R3JvdyIsImZpeGVkIiwiZml4ZWRSaWdodCIsImFsbG93Q2VsbHNSZWN5Y2xpbmciLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImludmFsaWRhdGUiLCJyZW5kZXIiLCJncmlkQ2xhc3NOYW1lIiwiZGlzYWJsZUFjdGlvbkJhciIsInNldEZvY3VzVG8iLCJhY3Rpb25CYXIiLCJhY3Rpb25CYXJSaWdodCIsImFjdGlvbkJhckxlZnQiLCJyZW1vdmluZyIsImRpc2FibGVEcm9wZG93biIsImRpc2FibGVGaWx0ZXJpbmdDb250cm9scyIsImhhbmRsZUFmdGVyQWRkSXRlbSIsImhhbmRsZUFmdGVyRWRpdFByZXNzIiwiaGFuZGxlQWZ0ZXJWYWxpZGF0aW9uRXJyb3IiLCJkcm9wZG93bk1lbnVJdGVtcyIsImNvbHVtblNldHRpbmdzIiwiZ3JpZEhlYWRlciIsInJvd3NDb3VudCIsImNvbnRhaW5lclN0eWxlIiwiaGVhZGVySGVpZ2h0IiwiZmlsdGVyUm93SGVpZ2h0Iiwicm93SGVpZ2h0Iiwib25Db2x1bW5SZXNpemVFbmRDYWxsYmFjayIsImhhbmRsZVJvd0NsaWNrIiwic2Nyb2xsVG9Db2x1bW4iLCJzY3JvbGxUb3AiLCJnZXRTY3JvbGxUb1JvdyIsIm9uUm93RG91YmxlQ2xpY2siLCJvbk1vdXNlRG93biIsIm9uUm93TW91c2VFbnRlciIsIm9uUm93TW91c2VMZWF2ZSIsIm9uU2Nyb2xsU3RhcnQiLCJvblNjcm9sbEVuZCIsImdldFJvd0NsYXNzTmFtZSIsImhhbmRsZVJvd0hlaWdodEdldHRlciIsIm9uQ29udGVudEhlaWdodENoYW5nZSIsImhhbmRsZUNvbnRleHRNZW51IiwicmVuZGVyQ29sdW1ucyIsImNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbCIsInNhdmVDb2x1bW5TZXR0aW5ncyIs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QUs0QixLQUFMLENBQVcrUix3QkFKdkM7QUFLRSxNQUFBLGtCQUFrQixFQUFFLEtBQUsvUixLQUFMLENBQVdnUztBQUxqQyxNQWhESixFQXdERyxLQUFLaFMsS0FBTCxDQUFXaVMsUUF4RGQsQ0FERjtBQTRERCxHOzs7RUFwMENvQnpXLEtBQUssQ0FBQzBXLGEsNENBR0xuVixZO0FBbzBDeEIsZUFBZWdELFFBQWYiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBwcmVmZXItZGVzdHJ1Y3R1cmluZyAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tbG9uZWx5LWlmLCBwcmVmZXItdGVtcGxhdGUsIHJlYWN0L3JlcXVpcmUtZGVmYXVsdC1wcm9wcyAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IE1hcCwgTGlzdCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgaW5qZWN0SW50bCwgRm9ybWF0dGVkTWVzc2FnZSBhcyBNIH0gZnJvbSAncmVhY3QtaW50bCc7XG5pbXBvcnQgeyBDb2x1bW4sIENlbGwgfSBmcm9tICdmaXhlZC1kYXRhLXRhYmxlLTInO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyBJY29uIH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtaWNvbnMnO1xuaW1wb3J0IFNwaW5uZXIgZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3Qtc3Bpbm5lcic7XG5pbXBvcnQgQ2hlY2tib3ggZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtY2hlY2tib3gnO1xuaW1wb3J0ICdmaXhlZC1kYXRhLXRhYmxlLTIvZGlzdC9maXhlZC1kYXRhLXRhYmxlLmNzcyc7XG5cbmltcG9ydCBSZXNwb25zaXZlRml4ZWREYXRhVGFibGUgZnJvbSAnLi9yZXNwb25zaXZlLWZpeGVkLWRhdGEtdGFibGUuY29tcG9uZW50JztcbmltcG9ydCBIZWFkZXJDZWxsIGZyb20gJy4vaGVhZGVyLWNlbGwuY29tcG9uZW50JztcbmltcG9ydCBBY3Rpb25CYXIgZnJvbSAnLi9hY3Rpb24tYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgSW5saW5lRWRpdENvbnRyb2xzIGZyb20gJy4vaW5saW5lLWVkaXQtY29udHJvbHMuY29tcG9uZW50JztcbmltcG9ydCBGaWx0ZXJpbmdDb250cm9scyBmcm9tICcuL2ZpbHRlcmluZy1jb250cm9scy5jb21wb25lbnQnO1xuaW1wb3J0IERyb3Bkb3duQ29udHJvbHMgZnJvbSAnLi9kcm9wZG93bi1jb250cm9scy5jb21wb25lbnQnO1xuaW1wb3J0ICogYXMgZGF0YWdyaWRBY3Rpb25zIGZyb20gJy4vZGF0YWdyaWQuYWN0aW9ucyc7XG5pbXBvcnQgQ2VsbFRvb2x0aXAgZnJvbSAnLi9jZWxsLXRvb2x0aXAuY29tcG9uZW50JztcbmltcG9ydCBDb2x1bW5TZXR0aW5nc01vZGFsIGZyb20gJy4vY29sdW1uLXNldHRpbmdzL2NvbHVtbi1zZXR0aW5ncy5jb21wb25lbnQnO1xuaW1wb3J0IHsgcHJvcFR5cGVzLCBkZWZhdWx0UHJvcHMgfSBmcm9tICcuL2RhdGFncmlkLnByb3BzJztcbmltcG9ydCB7IEtFWV9DT0RFUyB9IGZyb20gJy4vZGF0YWdyaWQuY29uc3RhbnRzJztcbmltcG9ydCBwYWdpbmF0aW9uIGZyb20gJy4vcGFnaW5hdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IENvbnRleHRNZW51IGZyb20gJy4vY29udGV4dC1tZW51LmNvbXBvbmVudCc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9kYXRhZ3JpZC51dGlscyc7XG5pbXBvcnQgR3JpZENvbHVtblNlcnZpY2UgZnJvbSAnLi9jb2x1bW4tc2VydmljZS9jb2x1bW4tc2VydmljZSc7XG5pbXBvcnQgJy4vZGF0YWdyaWQuY29tcG9uZW50LnNjc3MnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUsIG93blByb3BzKSA9PiB7XG4gIGNvbnN0IEdSSUQgPSBvd25Qcm9wcy5ncmlkO1xuICByZXR1cm4ge1xuICAgIGlzQnVzeTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2lzQnVzeSddLCB0cnVlKSxcbiAgICBpc0VkaXRpbmc6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdpc0VkaXRpbmcnXSwgZmFsc2UpLFxuICAgIGlzQ3JlYXRpbmc6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdpc0NyZWF0aW5nJ10sIGZhbHNlKSxcbiAgICBpc0ZpbHRlcmluZzogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdpc0ZpbHRlcmluZyddLCBmYWxzZSksXG4gICAgaXNDb2x1bW5TZXR0aW5nc01vZGFsT3Blbjogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oXG4gICAgICBbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnY29sdW1uU2V0dGluZ3NNb2RhbCcsICdvcGVuJ10sXG4gICAgICBmYWxzZSxcbiAgICApLFxuICAgIHNvcnRDb2x1bW46IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ3NvcnRpbmdEYXRhJywgJ3NvcnRDb2x1bW4nXSwgbnVsbCksXG4gICAgc29ydE9yZGVyOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdzb3J0aW5nRGF0YScsICdzb3J0T3JkZXInXSwgbnVsbCksXG4gICAgdmlzaWJsZUNvbHVtbnM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ3Zpc2libGVDb2x1bW5zJ10sIExpc3QoKSksXG4gICAgY29sdW1uV2lkdGhzOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdjb2x1bW5XaWR0aHMnXSwgTWFwKCkpLFxuICAgIHNlbGVjdGVkQ2VsbDogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZWxlY3RlZENlbGwnXSwgTWFwKCkpLFxuICAgIHNlbGVjdGVkSXRlbXM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2VsZWN0ZWRJdGVtcyddLCBMaXN0KCkpLFxuICAgIGRhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnZGF0YSddLCBMaXN0KCkpLFxuICAgIGVkaXREYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2VkaXREYXRhJ10sIE1hcCgpKSxcbiAgICBjcmVhdGVEYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NyZWF0ZURhdGEnXSwgTGlzdCgpKSxcbiAgICBmaWx0ZXJEYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2ZpbHRlckRhdGEnXSwgTWFwKCkpLFxuICAgIGNlbGxNZXNzYWdlczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjZWxsTWVzc2FnZXMnXSwgTWFwKCkpLFxuICAgIGNyZWF0ZUNlbGxNZXNzYWdlczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjcmVhdGVDZWxsTWVzc2FnZXMnXSwgTWFwKCkpLFxuICAgIGFsbERhdGFTaXplOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2FsbERhdGEnXSwgTGlzdCgpKS5zaXplLFxuICAgIGxhbmd1YWdlOiBVdGlscy5nZXRMYW5ndWFnZShHUklELCBzdGF0ZS51c2VyKSxcbiAgICByZWdpb246IFV0aWxzLmdldFJlZ2lvbihHUklELCBzdGF0ZS51c2VyKSxcbiAgICBkYXRlRm9ybWF0OiBVdGlscy5nZXREYXRlRm9ybWF0KEdSSUQsIHN0YXRlLnVzZXIpLFxuICAgIHRob3VzYW5kU2VwYXJhdG9yOiBVdGlscy5nZXRUaG91c2FuZFNlcGFyYXRvcihHUklELCBzdGF0ZS51c2VyKSxcbiAgICBkZWNpbWFsU2VwYXJhdG9yOiBVdGlscy5nZXREZWNpbWFsU2VwYXJhdG9yKEdSSUQsIHN0YXRlLnVzZXIpLFxuICAgIGZvcmNlUmVmcmVzaFRpbWVzdGFtcDogc3RhdGUuZGF0YWdyaWQuZ2V0KCdmb3JjZVJlZnJlc2gnLCAwKSwgLy8gZm9yY2UgcmUtcmVuZGVyIHdoZW4gY2hhbmdlZFxuICAgIGZvY3VzVHlwZTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2ZvY3VzVHlwZSddLCBNYXAoKSksXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkYXRhZ3JpZEFjdGlvbnM7XG5cbkBwYWdpbmF0aW9uXG5AaW5qZWN0SW50bFxuQGNvbm5lY3QoXG4gIG1hcFN0YXRlVG9Qcm9wcyxcbiAgbWFwRGlzcGF0Y2hUb1Byb3BzLFxuKVxuY2xhc3MgRGF0YUdyaWQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHByb3BUeXBlcztcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjdXJyZW50Um93OiAwLFxuICAgICAgY3VycmVudENvbHVtbjogMCxcbiAgICAgIGNvbnRleHRNZW51T3BlbjogZmFsc2UsXG4gICAgICBjb250ZXh0TWVudVg6IDAsXG4gICAgICBjb250ZXh0TWVudVk6IDAsXG4gICAgfTtcbiAgICB0aGlzLmNlbGxSZWZzID0ge307XG4gICAgdGhpcy5jcmVhdGVDZWxsUmVmcyA9IHt9O1xuICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgPSBmYWxzZTtcbiAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IGZhbHNlOyAvLyBUT0RPOiBIYW5kbGUgZm9jdXNpbmcgd2hlbiB0cnVlXG4gICAgdGhpcy5mb2N1c1RvRXJyb3JDZWxsID0gZmFsc2U7IC8vIFRPRE86IEhhbmRsZSBmb2N1c2luZyB3aGVuIHRydWVcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkRvY3VtZW50Q2xpY2spO1xuICAgIHRoaXMucHJvcHMuaW52YWxpZGF0ZSh0aGlzLnByb3BzLmdyaWQpO1xuICB9XG5cbiAgb25Eb2N1bWVudENsaWNrID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmNvbnRleHRNZW51SXRlbXMpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjb250ZXh0TWVudU9wZW46IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkRvY3VtZW50Q2xpY2spO1xuICB9O1xuXG4gIG9uQ29sdW1uUmVzaXplRW5kQ2FsbGJhY2sgPSAobmV3Q29sdW1uV2lkdGgsIGNvbHVtbktleSkgPT4ge1xuICAgIHRoaXMucHJvcHMucmVzaXplQ29sdW1uKHRoaXMucHJvcHMuZ3JpZCwgY29sdW1uS2V5LCBuZXdDb2x1bW5XaWR0aCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEBwYXJhbSByb3dJbmRleCAoaW50KVxuICAgKiBAcGFyYW0gY29sIChvYmopLiBDb2x1bW4gb2JqZWN0LlxuICAgKiBAcGFyYW0gZS4gT3JpZ2luYWwgS2V5RG93biBldmVudFxuICAgKiBAcGFyYW0gY3JlYXRlIChib29sKS4gSXMgdGhlIGNlbGwgY3JlYXRlIGNlbGwgb3IgZWRpdCBjZWxsP1xuICAgKi9cbiAgb25DZWxsS2V5RG93biA9IChyb3dJbmRleCwgY29sLCBlLCBjcmVhdGUgPSBmYWxzZSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZUFycm93TmF2aWdhdGlvbikge1xuICAgICAgY29uc3QgY2VsbFJlZnMgPSBjcmVhdGUgPyB0aGlzLmNyZWF0ZUNlbGxSZWZzIDogdGhpcy5jZWxsUmVmcztcbiAgICAgIGNvbnN0IGFycm93S2V5cyA9IFtLRVlfQ09ERVMuRE9XTiwgS0VZX0NPREVTLlVQLCBLRVlfQ09ERVMuTEVGVCwgS0VZX0NPREVTLlJJR0hUXTtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgY29sdW1ucywgdmlzaWJsZUNvbHVtbnMsIGdyaWQsIGRhdGEsIGNyZWF0ZURhdGEsIG9uTGFzdENlbGxUYWJQcmVzcyxcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3QgZ3JpZENvbHVtbnMgPSBVdGlscy52aXNpYmxlQ29sdW1ucyhjb2x1bW5zLCB2aXNpYmxlQ29sdW1ucyk7XG4gICAgICBjb25zdCBnZXRDb2x1bW5LZXlCeUluZGV4ID0gaSA9PiBVdGlscy5nZXRDb2x1bW5LZXkoZ3JpZENvbHVtbnNbaV0pO1xuICAgICAgY29uc3Qgcm93c1NpemUgPSBjcmVhdGUgPyBjcmVhdGVEYXRhLnNpemUgOiBkYXRhLnNpemU7XG4gICAgICBjb25zdCBjb2x1bW5LZXkgPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sKTtcbiAgICAgIGxldCBjdXJyZW50Q2VsbCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4fWBdO1xuICAgICAgbGV0IHByb3h5ID0gbnVsbDtcblxuICAgICAgY29uc3QgaXNDdXJzb3JBdFN0YXJ0ID0gKCkgPT4ge1xuICAgICAgICBpZiAoY3VycmVudENlbGwudHlwZSAhPT0gJ3RleHQnKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRDZWxsLnNlbGVjdGlvblN0YXJ0ID09PSAwO1xuICAgICAgfTtcblxuICAgICAgY29uc3QgaXNDdXJzb3JBdEVuZCA9ICgpID0+IHtcbiAgICAgICAgaWYgKGN1cnJlbnRDZWxsLnR5cGUgIT09ICd0ZXh0JykgcmV0dXJuIHRydWU7XG4gICAgICAgIHJldHVybiBjdXJyZW50Q2VsbC5zZWxlY3Rpb25FbmQgPT09IGN1cnJlbnRDZWxsLnZhbHVlLmxlbmd0aDtcbiAgICAgIH07XG5cbiAgICAgIC8vIElmIGN1cnJlbnQgY2VsbCBob2xkcyBhIHJlYWN0LWZsb2F0aW5nLXNlbGVjdCBjb21wb25lbnRcbiAgICAgIGlmIChjdXJyZW50Q2VsbCAmJiAoY3VycmVudENlbGwuc2VsZWN0UmVmIHx8IHR5cGVvZiBjdXJyZW50Q2VsbC5zZWxlY3QgPT09ICdvYmplY3QnKSkge1xuICAgICAgICBwcm94eSA9IGN1cnJlbnRDZWxsO1xuICAgICAgICBjdXJyZW50Q2VsbCA9IHRoaXMuZ2V0U2VsZWN0UmVmKHByb3h5KTtcbiAgICAgIH1cblxuICAgICAgLy8gUHJldmVudHMgdXAvZG93biBhcnJvdyBmcm9tIGNoYW5naW5nIG51bWJlciBmaWVsZCB2YWx1ZVxuICAgICAgaWYgKGFycm93S2V5cy5pbmNsdWRlcyhlLmtleUNvZGUpICYmIGN1cnJlbnRDZWxsLnR5cGUgPT09ICdudW1iZXInKSBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuICAgICAgICBjYXNlIEtFWV9DT0RFUy5FTlRFUjpcbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuRVNDOiB7XG4gICAgICAgICAgaWYgKGNyZWF0ZSAmJiBlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5FTlRFUikge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5hZGROZXdJdGVtKGdyaWQsIFV0aWxzLmdldENvbHVtbkRlZmF1bHRWYWx1ZXMoY29sdW1ucykpO1xuICAgICAgICAgICAgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgY3VycmVudENlbGwuc2VsZWN0KCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuRE9XTjoge1xuICAgICAgICAgIGxldCBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4ICsgMX1gXTtcblxuICAgICAgICAgIC8vIFByZXZlbnRzIG1lbnUgZnJvbSBvcGVuaW5nXG4gICAgICAgICAgaWYgKHByb3h5ICYmIHByb3h5LnNlbGVjdFJlZiAmJiAhcHJveHkuc2VsZWN0UmVmLnN0YXRlLm1lbnVJc09wZW4pIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmICghbmV4dEVsZW1lbnQpIGJyZWFrO1xuICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSB0aGlzLmdldFNlbGVjdFJlZihuZXh0RWxlbWVudCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubW92ZUNlbGxGb2N1cyhuZXh0RWxlbWVudCwgcm93SW5kZXggKyAxLCAtMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuVVA6IHtcbiAgICAgICAgICBsZXQgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2NvbHVtbktleX1fJHtyb3dJbmRleCAtIDF9YF07XG5cbiAgICAgICAgICAvLyBQcmV2ZW50cyBtZW51IGZyb20gb3BlbmluZ1xuICAgICAgICAgIGlmIChwcm94eSAmJiBwcm94eS5zZWxlY3RSZWYgJiYgIXByb3h5LnNlbGVjdFJlZi5zdGF0ZS5tZW51SXNPcGVuKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAoIW5leHRFbGVtZW50KSBicmVhaztcbiAgICAgICAgICAgIG5leHRFbGVtZW50ID0gdGhpcy5nZXRTZWxlY3RSZWYobmV4dEVsZW1lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm1vdmVDZWxsRm9jdXMobmV4dEVsZW1lbnQsIHJvd0luZGV4IC0gMSwgLTEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLlRBQjpcbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuUklHSFQ6XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLkxFRlQ6IHtcbiAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuUklHSFQgJiYgIWlzQ3Vyc29yQXRFbmQoKSkgYnJlYWs7XG4gICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLkxFRlQgJiYgIWlzQ3Vyc29yQXRTdGFydCgpKSBicmVhaztcblxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgIGxldCBjb2x1bW5JbmQgPSBncmlkQ29sdW1ucy5maW5kSW5kZXgoYyA9PiBjLnZhbHVlS2V5UGF0aC5qb2luKCcvJykgPT09IGNvbHVtbktleSk7XG4gICAgICAgICAgaWYgKGNvbHVtbkluZCAhPT0gLTEpIHtcbiAgICAgICAgICAgIGxldCBkaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICBsZXQgbmV4dEVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgbGV0IHJvd0luZCA9IHJvd0luZGV4O1xuICAgICAgICAgICAgd2hpbGUgKGRpc2FibGVkICYmIHJvd0luZCA8PSByb3dzU2l6ZSkge1xuICAgICAgICAgICAgICAvLyBNb3ZpbmcgdG8gdGhlIGxlZnRcbiAgICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLkxFRlQgfHwgKGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLlRBQiAmJiBlLnNoaWZ0S2V5KSkge1xuICAgICAgICAgICAgICAgIGlmIChjb2x1bW5JbmQgLSAxID49IDApIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCAtPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm93SW5kIC0gMSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgPSBncmlkQ29sdW1ucy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgICAgcm93SW5kIC09IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBNb3ZpbmcgdG8gdGhlIHJpZ2h0XG4gICAgICAgICAgICAgICAgaWYgKGNvbHVtbkluZCArIDEgPCBncmlkQ29sdW1ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCArPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm93SW5kICsgMSA8IHJvd3NTaXplKSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgPSAwO1xuICAgICAgICAgICAgICAgICAgcm93SW5kICs9IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyb3dJbmQgKyAxID09PSByb3dzU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgLy8gSWYgdHJ5aW5nIHRvIHNlbGVjdCBhIHJvdywgd2hlbiB0aGVyZSBpcyBub25lOlxuICAgICAgICAgICAgICAgICAgaWYgKG9uTGFzdENlbGxUYWJQcmVzcyAmJiBlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5UQUIpIG9uTGFzdENlbGxUYWJQcmVzcyhlKTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIG5leHRFbGVtZW50ID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtnZXRDb2x1bW5LZXlCeUluZGV4KGNvbHVtbkluZCl9XyR7cm93SW5kfWBdO1xuXG4gICAgICAgICAgICAgIC8vIElmIHdlIGNhbm5vdCBmb2N1cyBvbiB0aGUgbmV4dCBlbGVtZW50IHdoaWxlIG1vdmluZyB0byB0aGUgcmlnaHRcbiAgICAgICAgICAgICAgaWYgKCFuZXh0RWxlbWVudCAmJiBlLmtleUNvZGUgIT09IEtFWV9DT0RFUy5MRUZUKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgd2UncmUgbm90IHlldCBpbiB0aGUgbGFzdCBmb2N1c2FibGUgY29sdW1uXG4gICAgICAgICAgICAgICAgaWYgKGNvbHVtbkluZCA8PSBncmlkQ29sdW1ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgIHdoaWxlIChjb2x1bW5JbmQgPD0gZ3JpZENvbHVtbnMubGVuZ3RoICYmICFuZXh0RWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Z2V0Q29sdW1uS2V5QnlJbmRleChjb2x1bW5JbmQpfV8ke3Jvd0luZH1gXTtcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uSW5kICs9IDE7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UgYXJlIGluIHRoZSBsYXN0IGNvbHVtbiBhbmQgd2UgZG9uJ3QgaGF2ZSBhbiBlbGVtZW50IHRvIGZvY3VzIG9uLFxuICAgICAgICAgICAgICAgICAgICAvLyB3ZSBtdXN0IG1vdmUgdG8gdGhlIG5leHQgcm93IChpZiBwb3NzaWJsZSlcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFuZXh0RWxlbWVudCAmJiBjb2x1bW5JbmQgPT09IGdyaWRDb2x1bW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHRyeWluZyB0byBzZWxlY3QgYSByb3csIHdoZW4gdGhlcmUgaXMgbm9uZTpcbiAgICAgICAgICAgICAgICAgICAgICBpZiAocm93SW5kICsgMSA9PT0gcm93c1NpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbkxhc3RDZWxsVGFiUHJlc3MgJiYgZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuVEFCKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uTGFzdENlbGxUYWJQcmVzcyhlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgcm93SW5kICs9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2dldENvbHVtbktleUJ5SW5kZXgoY29sdW1uSW5kKX1fJHtyb3dJbmR9YF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgY2Fubm90IGZvY3VzIG9uIHRoZSBuZXh0IGVsZW1lbnQgd2hpbGUgbW92aW5nIHRvIHRoZSBsZWZ0XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoIW5leHRFbGVtZW50ICYmIGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLkxFRlQpIHtcbiAgICAgICAgICAgICAgICB3aGlsZSAoY29sdW1uSW5kID4gMCAmJiAhbmV4dEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCAtPSAxO1xuICAgICAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2dldENvbHVtbktleUJ5SW5kZXgoY29sdW1uSW5kKX1fJHtyb3dJbmR9YF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGlmIG5vIGVsZW1lbnQgd2FzIGZvdW5kLCB0cnkgbW92aW5nIHRvIHByZXZpb3VzIHJvd1xuICAgICAgICAgICAgICAgIC8vIChuZWVkZWQgaW4gY2FzZSBmaXJzdCBjb2x1bW4gaXMgbm90IGVkaXRhYmxlIGUuZy4gYW4gRXh0cmFDb2x1bW4pXG4gICAgICAgICAgICAgICAgaWYgKHJvd0luZCA+IDAgJiYgIW5leHRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgPSBncmlkQ29sdW1ucy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgICAgcm93SW5kIC09IDE7XG4gICAgICAgICAgICAgICAgICBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Z2V0Q29sdW1uS2V5QnlJbmRleChjb2x1bW5JbmQpfV8ke3Jvd0luZH1gXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZGlzYWJsZWQgPSBuZXh0RWxlbWVudCA/IG5leHRFbGVtZW50LmRpc2FibGVkIDogZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWRpc2FibGVkICYmIG5leHRFbGVtZW50KSB7XG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgbmV4dEVsZW1lbnQuc2VsZWN0ID09PSAnb2JqZWN0JyB8fCBuZXh0RWxlbWVudC5zZWxlY3RSZWYpIHtcbiAgICAgICAgICAgICAgICBuZXh0RWxlbWVudCA9IHRoaXMuZ2V0U2VsZWN0UmVmKG5leHRFbGVtZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGlzLm1vdmVDZWxsRm9jdXMobmV4dEVsZW1lbnQsIHJvd0luZCwgY29sdW1uSW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgb25FZGl0Q2VsbEtleURvd24gPSAocm93SW5kZXgsIGNvbCkgPT4gKGUpID0+IHtcbiAgICB0aGlzLm9uQ2VsbEtleURvd24ocm93SW5kZXgsIGNvbCwgZSk7XG4gIH07XG5cbiAgb25DcmVhdGVDZWxsS2V5RG93biA9IChyb3dJbmRleCwgY29sKSA9PiAoZSkgPT4ge1xuICAgIHRoaXMub25DZWxsS2V5RG93bihyb3dJbmRleCwgY29sLCBlLCB0cnVlKTtcbiAgfTtcblxuICBvbkZpbHRlckNlbGxWYWx1ZUNoYW5nZSA9IChjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZXZlbnRPckRhdGEpID0+IHtcbiAgICBsZXQgcmF3VmFsdWU7XG4gICAgLy8gZXZlbnRPckRhdGEgY2FuIGJlIGlucHV0IG9uQ2hhbmdlIGV2ZW50LCByZWFjdC1zZWxlY3Qgb25DaGFuZ2Ugb3IgcmVhY3QtZGF5LXBpY2tlciBvbkNoYW5nZVxuICAgIGlmIChldmVudE9yRGF0YSkge1xuICAgICAgaWYgKGV2ZW50T3JEYXRhLnRhcmdldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChldmVudE9yRGF0YS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCB2YWx1ZSA9IHZhbHVlUGFyc2VyKHJhd1ZhbHVlKTtcbiAgICB0aGlzLnByb3BzLmZpbHRlckNlbGxWYWx1ZUNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIHRoaXMucHJvcHMuY29sdW1ucywgY29sLCB2YWx1ZSk7XG4gIH07XG5cbiAgb25GaWx0ZXJDZWxsTXVsdGlWYWx1ZUJsdXIgPSBjb2wgPT4gKCkgPT4ge1xuICAgIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2wpO1xuICAgIGNvbnN0IHsgY29sdW1ucywgZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlLCBncmlkIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNlbGVjdGVkRmlsdGVycyA9IHRoaXMuc3RhdGVbY29sdW1uS2V5XTtcbiAgICBpZiAoc2VsZWN0ZWRGaWx0ZXJzKSB7XG4gICAgICBmaWx0ZXJDZWxsVmFsdWVDaGFuZ2UoZ3JpZCwgY29sdW1ucywgY29sLCBzZWxlY3RlZEZpbHRlcnMpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IFtjb2x1bW5LZXldOiB1bmRlZmluZWQgfSk7XG4gICAgfVxuICB9O1xuXG4gIG9uRmlsdGVyQ2VsbE11bHRpVmFsdWVDaGFuZ2UgPSAoY29sLCB2YWx1ZVBhcnNlcikgPT4gKGRhdGEgPSBbXSkgPT4ge1xuICAgIC8vIGRhdGEgaXMgaW5wdXQgb2YgcmVhY3Qtc2VsZWN0IG9uQ2hhbmdlXG4gICAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCk7XG4gICAgY29uc3Qgc2VsZWN0ZWRGaWx0ZXJzID0gdGhpcy5zdGF0ZVtjb2x1bW5LZXldO1xuICAgIGlmICghc2VsZWN0ZWRGaWx0ZXJzICYmIGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAvLyBlbmRzIHVwIGhlcmUgaW4gY2FzZSBvZiBjbGVhciBidXR0b25cbiAgICAgIGNvbnN0IHsgY29sdW1ucywgZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlLCBncmlkIH0gPSB0aGlzLnByb3BzO1xuICAgICAgZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlKGdyaWQsIGNvbHVtbnMsIGNvbCwgZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdmFsdWVQYXJzZXIoZGF0YSk7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgW2NvbHVtbktleV06IHZhbHVlIH0pO1xuICAgIH1cbiAgfTtcblxuICBvbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGV2ZW50T3JEYXRhKSA9PiB7XG4gICAgY29uc3QgeyBjcmVhdGVDZWxsVmFsdWVDaGFuZ2UsIGdyaWQgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IHJhd1ZhbHVlO1xuICAgIC8vIGV2ZW50T3JEYXRhIGNhbiBiZSBpbnB1dCBvbkNoYW5nZSBldmVudCwgcmVhY3Qtc2VsZWN0IG9uQ2hhbmdlIG9yIHJlYWN0LWRheS1waWNrZXIgb25DaGFuZ2VcbiAgICBpZiAoZXZlbnRPckRhdGEpIHtcbiAgICAgIGlmIChldmVudE9yRGF0YS50YXJnZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnRPckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSB2YWx1ZVBhcnNlcihyYXdWYWx1ZSk7XG5cbiAgICBjb25zdCB7IGNvbXBvbmVudFR5cGUgfSA9IGNvbDtcbiAgICBzd2l0Y2ggKGNvbXBvbmVudFR5cGUpIHtcbiAgICAgIGNhc2UgJ2N1cnJlbmN5JzpcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICd0ZXh0Jzoge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlKGdyaWQsIHJvd0luZGV4LCBjb2wudmFsdWVLZXlQYXRoLCB2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY29sLm9uQ3JlYXRlVmFsdWVDaGFuZ2UpIHtcbiAgICAgIGNvbC5vbkNyZWF0ZVZhbHVlQ2hhbmdlKHZhbHVlLCBjb2wudmFsdWVLZXlQYXRoLCByb3dJbmRleCk7XG4gICAgfVxuICAgIGlmIChjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUgJiYgdmFsdWUgPT09IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5tYXRjaFZhbHVlKSB7XG4gICAgICAvLyBDYWxsIHNwZWNpYWwgcGFpcmVkIHZhbHVlIGNoYW5nZSBvbiBvdGhlciBjZWxsIGlmIHZhbHVlIG1hdGNoZXNcbiAgICAgIHRoaXMub25DcmVhdGVDZWxsVmFsdWVDaGFuZ2UoXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICB7IHZhbHVlS2V5UGF0aDogY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm5ld1ZhbHVlS2V5UGF0aCB9LFxuICAgICAgICB2ID0+IHYsXG4gICAgICApKGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5uZXdWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjb2wudmFsaWRhdG9ycykge1xuICAgICAgdGhpcy5wcm9wcy5jcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZShcbiAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgY29sLnZhbHVlS2V5UGF0aCxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIGNvbC52YWxpZGF0b3JzLFxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgb25FZGl0Q2VsbFZhbHVlQ2hhbmdlID0gKHJvd0luZGV4LCBjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZXZlbnRPckRhdGEpID0+IHtcbiAgICBjb25zdCB7IGVkaXRDZWxsVmFsdWVDaGFuZ2UsIGdyaWQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgZGF0YUlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICBsZXQgcmF3VmFsdWU7XG4gICAgLy8gZXZlbnRPckRhdGEgY2FuIGJlIGlucHV0IG9uQ2hhbmdlIGV2ZW50LCByZWFjdC1zZWxlY3Qgb25DaGFuZ2Ugb3IgcmVhY3QtZGF5LXBpY2tlciBvbkNoYW5nZVxuICAgIGlmIChldmVudE9yRGF0YSkge1xuICAgICAgaWYgKGV2ZW50T3JEYXRhLnRhcmdldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChldmVudE9yRGF0YS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCB2YWx1ZSA9IHZhbHVlUGFyc2VyKHJhd1ZhbHVlKTtcbiAgICBjb25zdCB7IGNvbXBvbmVudFR5cGUgfSA9IGNvbDtcbiAgICBzd2l0Y2ggKGNvbXBvbmVudFR5cGUpIHtcbiAgICAgIGNhc2UgJ2N1cnJlbmN5JzpcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICd0ZXh0Jzoge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgZWRpdENlbGxWYWx1ZUNoYW5nZShncmlkLCBkYXRhSWQsIGNvbC52YWx1ZUtleVBhdGgsIHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChjb2wub25FZGl0VmFsdWVDaGFuZ2UpIHtcbiAgICAgIGNvbC5vbkVkaXRWYWx1ZUNoYW5nZSh2YWx1ZSwgY29sLnZhbHVlS2V5UGF0aCwgcm93SW5kZXgsIGRhdGFJZCk7XG4gICAgfVxuICAgIGlmIChjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUgJiYgdmFsdWUgPT09IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5tYXRjaFZhbHVlKSB7XG4gICAgICAvLyBDYWxsIHNwZWNpYWwgcGFpcmVkIHZhbHVlIGNoYW5nZSBvbiBvdGhlciBjZWxsIGlmIHZhbHVlIG1hdGNoZXNcbiAgICAgIHRoaXMub25FZGl0Q2VsbFZhbHVlQ2hhbmdlKFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgeyB2YWx1ZUtleVBhdGg6IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5uZXdWYWx1ZUtleVBhdGggfSxcbiAgICAgICAgdiA9PiB2LFxuICAgICAgKShjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY29sLnZhbGlkYXRvcnMpIHtcbiAgICAgIHRoaXMucHJvcHMuZWRpdENlbGxWYWx1ZVZhbGlkYXRlKFxuICAgICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICAgIGRhdGFJZCxcbiAgICAgICAgY29sLnZhbHVlS2V5UGF0aCxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIGNvbC52YWxpZGF0b3JzLFxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgZ2V0UmVnRXggPSBzZXBhcmF0b3IgPT4gKHNlcGFyYXRvciA/IG5ldyBSZWdFeHAoYFxcXFwke3NlcGFyYXRvcn1gLCAnZycpIDogbmV3IFJlZ0V4cCgnXFxcXHMnLCAnZycpKTtcblxuICBvbkNyZWF0ZUNlbGxCbHVyID0gKHJvd0luZGV4LCBjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZXZlbnRPckRhdGEpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBkZWNpbWFsU2VwYXJhdG9yLCBjcmVhdGVDZWxsVmFsdWVDaGFuZ2UsIGdyaWQsIHRob3VzYW5kU2VwYXJhdG9yLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgY29tcG9uZW50VHlwZSB9ID0gY29sO1xuICAgIGxldCB2YWx1ZTtcbiAgICAvLyBldmVudE9yRGF0YSBjYW4gYmUgZm9ybWF0dGVkLWlucHV0LCByZWFjdC1zZWxlY3QsIHJlYWN0LWNoZWNrYm94IG9yIHJlYWN0LWRheS1waWNrZXJcbiAgICAvLyBvbkNoYW5nZSBldmVudFxuICAgIGlmIChldmVudE9yRGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoZXZlbnRPckRhdGEgJiYgZXZlbnRPckRhdGEudGFyZ2V0ICYmIGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlID0gZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChldmVudE9yRGF0YS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlID0gZXZlbnRPckRhdGEudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IGV2ZW50T3JEYXRhO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSA9IHRoaXMuZ2V0Q3JlYXRlSXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpO1xuICAgIH1cbiAgICBzd2l0Y2ggKGNvbXBvbmVudFR5cGUpIHtcbiAgICAgIGNhc2UgJ2N1cnJlbmN5Jzoge1xuICAgICAgICBjb25zdCBudW1lcmljVmFsdWUgPSB2YWx1ZVxuICAgICAgICAgID8gTnVtYmVyKHZhbHVlLnJlcGxhY2UodGhpcy5nZXRSZWdFeCgoY29sLnZhbHVlT3B0aW9ucyAmJiBjb2wudmFsdWVPcHRpb25zLnRob3VzYW5kU2VwYXJhdG9yKSB8fCB0aG91c2FuZFNlcGFyYXRvciksICcnKVxuICAgICAgICAgICAgLnJlcGxhY2UodGhpcy5nZXRSZWdFeCgoY29sLnZhbHVlT3B0aW9ucyAmJiBjb2wudmFsdWVPcHRpb25zLmRlY2ltYWxTZXBhcmF0b3IpIHx8IGRlY2ltYWxTZXBhcmF0b3IpLCAnLicpKVxuICAgICAgICAgIDogdmFsdWU7XG4gICAgICAgIGlmIChudW1lcmljVmFsdWUgIT09IHRoaXMuZ2V0Q3JlYXRlSXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpKSB7XG4gICAgICAgICAgY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlKGdyaWQsIHJvd0luZGV4LCBjb2wudmFsdWVLZXlQYXRoLCBudW1lcmljVmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ3RleHQnOiB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5nZXRDcmVhdGVJdGVtVmFsdWUocm93SW5kZXgsIGNvbCkpIHtcbiAgICAgICAgICBjcmVhdGVDZWxsVmFsdWVDaGFuZ2UoZ3JpZCwgcm93SW5kZXgsIGNvbC52YWx1ZUtleVBhdGgsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNvbC5vbkNyZWF0ZUJsdXIpIHtcbiAgICAgIGlmICh2YWx1ZVBhcnNlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWVQYXJzZXIodmFsdWUpO1xuICAgICAgfVxuICAgICAgY29sLm9uQ3JlYXRlQmx1cih2YWx1ZSwgcm93SW5kZXgpO1xuICAgIH1cbiAgfTtcblxuICBvbkVkaXRDZWxsQmx1ciA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGV2ZW50T3JEYXRhKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGVjaW1hbFNlcGFyYXRvciwgZWRpdENlbGxWYWx1ZUNoYW5nZSwgZ3JpZCwgdGhvdXNhbmRTZXBhcmF0b3IsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBjb21wb25lbnRUeXBlIH0gPSBjb2w7XG4gICAgY29uc3QgZGF0YUlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICBsZXQgdmFsdWU7XG4gICAgLy8gZXZlbnRPckRhdGEgY2FuIGJlIGZvcm1hdHRlZC1pbnB1dCwgcmVhY3Qtc2VsZWN0LCByZWFjdC1jaGVja2JveCBvciByZWFjdC1kYXktcGlja2VyXG4gICAgLy8gb25DaGFuZ2UgZXZlbnRcbiAgICBpZiAoZXZlbnRPckRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGV2ZW50T3JEYXRhICYmIGV2ZW50T3JEYXRhLnRhcmdldCAmJiBldmVudE9yRGF0YS50YXJnZXQudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YWx1ZSA9IGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnRPckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YWx1ZSA9IGV2ZW50T3JEYXRhLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBldmVudE9yRGF0YTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgPSB0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCk7XG4gICAgfVxuICAgIHN3aXRjaCAoY29tcG9uZW50VHlwZSkge1xuICAgICAgY2FzZSAnY3VycmVuY3knOiB7XG4gICAgICAgIGNvbnN0IG51bWVyaWNWYWx1ZSA9IHZhbHVlXG4gICAgICAgICAgPyBOdW1iZXIodmFsdWUucmVwbGFjZSh0aGlzLmdldFJlZ0V4KChjb2wudmFsdWVPcHRpb25zICYmIGNvbC52YWx1ZU9wdGlvbnMudGhvdXNhbmRTZXBhcmF0b3IpIHx8IHRob3VzYW5kU2VwYXJhdG9yKSwgJycpXG4gICAgICAgICAgICAucmVwbGFjZSh0aGlzLmdldFJlZ0V4KChjb2wudmFsdWVPcHRpb25zICYmIGNvbC52YWx1ZU9wdGlvbnMuZGVjaW1hbFNlcGFyYXRvcikgfHwgZGVjaW1hbFNlcGFyYXRvciksICcuJykpXG4gICAgICAgICAgOiB2YWx1ZTtcbiAgICAgICAgaWYgKG51bWVyaWNWYWx1ZSAhPT0gdGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpKSB7XG4gICAgICAgICAgZWRpdENlbGxWYWx1ZUNoYW5nZShncmlkLCBkYXRhSWQsIGNvbC52YWx1ZUtleVBhdGgsIG51bWVyaWNWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAndGV4dCc6IHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCkpIHtcbiAgICAgICAgICBlZGl0Q2VsbFZhbHVlQ2hhbmdlKGdyaWQsIGRhdGFJZCwgY29sLnZhbHVlS2V5UGF0aCwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29sLm9uRWRpdEJsdXIpIHtcbiAgICAgIGlmICh2YWx1ZVBhcnNlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWVQYXJzZXIodmFsdWUpO1xuICAgICAgfVxuICAgICAgY29sLm9uRWRpdEJsdXIodmFsdWUsIHJvd0luZGV4LCBkYXRhSWQpO1xuICAgIH1cbiAgfTtcblxuICBvbkNlbGxGb2N1cyA9IChjZWxsVHlwZSwgaW5wdXRUeXBlLCByb3dJbmRleCwgY29sdW1uS2V5KSA9PiAoZSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGNlbGxTZWxlY3Rpb25DaGFuZ2UsIGNlbGxTZWxlY3QsIGdyaWQsIGlzRWRpdGluZyxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoaXNFZGl0aW5nKSByZXR1cm47XG5cbiAgICBpZiAoaW5wdXRUeXBlID09PSAnbnVtYmVyJykge1xuICAgICAgZS50YXJnZXQuc2VsZWN0KCk7XG4gICAgfVxuICAgIGlmIChjZWxsVHlwZSA9PT0gJ2VkaXQnICYmIGNlbGxTZWxlY3QpIHtcbiAgICAgIGNlbGxTZWxlY3Rpb25DaGFuZ2UoXG4gICAgICAgIGdyaWQsXG4gICAgICAgIE1hcCh7XG4gICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgY29sdW1uS2V5LFxuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIGdldFNlbGVjdFJlZiA9IChjb21wb25lbnQpID0+IHtcbiAgICBpZiAoIWNvbXBvbmVudCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKGNvbXBvbmVudC5zZWxlY3QgJiYgY29tcG9uZW50LnNlbGVjdC5pbnB1dFJlZikge1xuICAgICAgcmV0dXJuIGNvbXBvbmVudC5zZWxlY3QuaW5wdXRSZWY7XG4gICAgfVxuICAgIGlmIChjb21wb25lbnQuc2VsZWN0ICYmIGNvbXBvbmVudC5zZWxlY3Quc2VsZWN0KSB7XG4gICAgICByZXR1cm4gY29tcG9uZW50LnNlbGVjdC5zZWxlY3QuaW5wdXRSZWY7XG4gICAgfVxuICAgIGlmIChjb21wb25lbnQuc2VsZWN0UmVmICYmIGNvbXBvbmVudC5zZWxlY3RSZWYuc2VsZWN0LnNlbGVjdCkge1xuICAgICAgcmV0dXJuIGNvbXBvbmVudC5zZWxlY3RSZWYuc2VsZWN0LnNlbGVjdC5pbnB1dFJlZjtcbiAgICB9XG4gICAgcmV0dXJuIGNvbXBvbmVudC5zZWxlY3RSZWYuc2VsZWN0LmlucHV0UmVmO1xuICB9O1xuXG4gIGdldERhdGFJZEJ5Um93SW5kZXggPSByb3dJbmRleCA9PiB0aGlzLnByb3BzLmRhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi50aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoXSk7XG5cbiAgZ2V0U2VsZWN0ZWRJdGVtSW5kZXggPSAoaWQpID0+IHtcbiAgICBpZiAoIWlkKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5wcm9wcy5kYXRhLmZpbmRJbmRleCh2ID0+IHYuZ2V0SW4odGhpcy5wcm9wcy5ncmlkLmlkS2V5UGF0aCkgPT09IGlkKTtcbiAgICByZXR1cm4gaW5kZXggPT09IC0xID8gdW5kZWZpbmVkIDogaW5kZXg7XG4gIH07XG5cbiAgZ2V0RWRpdEl0ZW1WYWx1ZSA9IChyb3dJbmRleCwgY29sLCBvcHRpb25zID0gW10pID0+IHtcbiAgICAvLyBHZXQgdGhlIHZhbHVlIHRvIGRpc3BsYXkgaW4gZWRpdCBjZWxsXG4gICAgY29uc3QgaWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgIGNvbnN0IGVkaXRWYWx1ZSA9IHRoaXMucHJvcHMuZWRpdERhdGEuZ2V0SW4oW2lkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSwgdW5kZWZpbmVkKTtcbiAgICBsZXQgb3JpZ2luYWxWYWx1ZTtcbiAgICBpZiAoZWRpdFZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG9yaWdpbmFsVmFsdWUgPSB0aGlzLnByb3BzLmRhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSwgJycpO1xuICAgIH0gZWxzZSBpZiAoZWRpdFZhbHVlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFZhbHVlIGlzIGZvdW5kIGZyb20gZWRpdERhdGFcbiAgICAgIC8vIEZvcm1hdCBieSB0eXBlXG4gICAgICBzd2l0Y2ggKGNvbC5jb21wb25lbnRUeXBlKSB7XG4gICAgICAgIGNhc2UgJ211bHRpc2VsZWN0JzpcbiAgICAgICAgY2FzZSAnc2VsZWN0JzpcbiAgICAgICAgICByZXR1cm4gb3B0aW9ucy5zZWxlY3RPcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gZWRpdFZhbHVlKTtcbiAgICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgICAgcmV0dXJuIG9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSBlZGl0VmFsdWUpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiBlZGl0VmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvcmlnaW5hbFZhbHVlID09PSBudWxsIHx8IG9yaWdpbmFsVmFsdWUgPT09IHVuZGVmaW5lZCB8fCBvcmlnaW5hbFZhbHVlID09PSAnJykge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICAvLyBSZXR1cm4gdmFsdWUgZnJvbSBvcmlnaW5hbCBkYXRhLCBiZWNhdXNlIGVkaXREYXRhIGlzIG5vdCBhdmFpbGFibGVcbiAgICAvLyBGb3JtYXQgYnkgY29tcG9uZW50IHR5cGVcbiAgICBzd2l0Y2ggKGNvbC5jb21wb25lbnRUeXBlKSB7XG4gICAgICBjYXNlICdmbG9hdCc6IHtcbiAgICAgICAgaWYgKFN0cmluZyhvcmlnaW5hbFZhbHVlKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgcmV0dXJuIFN0cmluZyhvcmlnaW5hbFZhbHVlKS5yZXBsYWNlKCcuJywgdGhpcy5wcm9wcy5kZWNpbWFsU2VwYXJhdG9yKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3JpZ2luYWxWYWx1ZTtcbiAgICAgIH1cbiAgICAgIGNhc2UgJ211bHRpc2VsZWN0JzpcbiAgICAgIGNhc2UgJ3NlbGVjdCc6XG4gICAgICAgIHJldHVybiBvcHRpb25zLnNlbGVjdE9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSBvcmlnaW5hbFZhbHVlKTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICByZXR1cm4gb3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IG9yaWdpbmFsVmFsdWUpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIG9yaWdpbmFsVmFsdWU7XG4gICAgfVxuICB9O1xuXG4gIGdldENyZWF0ZUl0ZW1WYWx1ZSA9IChyb3dJbmRleCwgY29sLCBvcHRpb25zID0gW10pID0+IHtcbiAgICBjb25zdCB2YWwgPSB0aGlzLnByb3BzLmNyZWF0ZURhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSwgJycpO1xuICAgIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgaWYgKGNvbC5jb21wb25lbnRUeXBlID09PSAnc2VsZWN0JyB8fCBjb2wuY29tcG9uZW50VHlwZSA9PT0gJ211bHRpc2VsZWN0Jykge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuc2VsZWN0T3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IHZhbCk7XG4gICAgfVxuICAgIGlmIChbJ2Jvb2xlYW4nXS5pbmNsdWRlcyhjb2wuY29tcG9uZW50VHlwZSkpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gdmFsKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbDtcbiAgfTtcblxuICBnZXRGaWx0ZXJJdGVtVmFsdWUgPSAoY29sLCBvcHRpb25zID0gW10pID0+IHtcbiAgICBjb25zdCB2YWwgPSB0aGlzLnByb3BzLmZpbHRlckRhdGEuZ2V0KFV0aWxzLmdldENvbHVtbktleShjb2wpLCAnJyk7XG4gICAgaWYgKHZhbCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBpZiAoY29sLmNvbXBvbmVudFR5cGUgPT09ICdzZWxlY3QnKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5zZWxlY3RPcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gdmFsKTtcbiAgICB9XG4gICAgaWYgKFsnY2hlY2tib3gnLCAnYm9vbGVhbiddLmluY2x1ZGVzKGNvbC5jb21wb25lbnRUeXBlKSkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSB2YWwpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWw7XG4gIH07XG5cbiAgZ2V0RmlsdGVySXRlbU11bHRpVmFsdWUgPSAoY29sKSA9PiB7XG4gICAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCk7XG4gICAgY29uc3QgeyBmaWx0ZXJEYXRhIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGRhdGEgPSB0aGlzLnN0YXRlW2NvbHVtbktleV07XG4gICAgY29uc3QgdmFsID0gZGF0YSB8fCBmaWx0ZXJEYXRhLmdldChjb2x1bW5LZXksICcnKTtcbiAgICAvLyBzZXNzaW9uIHN0b3JhZ2UgY29udGVudCBpcyBjb252ZXJ0ZWQgdG8gaW1tdXRhYmxlIGFuZCBtdWx0aXNlbGVjdFxuICAgIC8vIGZpbHRlcnMgaXMgdGhlbiBsaXN0IG90aGVyd2lzZSBhcnJheVxuICAgIHJldHVybiB2YWwgJiYgdmFsLnRvSlMgPyB2YWwudG9KUygpIDogdmFsIHx8IFtdO1xuICB9O1xuXG4gIGdldENvbXBvbmVudERpc2FibGVkU3RhdGUgPSAocm93SW5kZXgsIGNvbCwgbW9kZSkgPT4ge1xuICAgIGxldCBjb21wb25lbnREaXNhYmxlZCA9ICEhY29sLmRpc2FibGVFZGl0aW5nO1xuICAgIC8vIGNoZWNrIGlmIGNvbXBvbmVudCBpcyBkaXNhYmxlZCBieSBvdGhlciBjb2x1bW4gZGF0YVxuICAgIGlmICghY29tcG9uZW50RGlzYWJsZWQgJiYgY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoKSB7XG4gICAgICBpZiAobW9kZSA9PT0gJ2NyZWF0ZScpIHtcbiAgICAgICAgY29tcG9uZW50RGlzYWJsZWQgPSB0aGlzLmdldENyZWF0ZUl0ZW1WYWx1ZShyb3dJbmRleCwge1xuICAgICAgICAgIHZhbHVlS2V5UGF0aDogY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWVLZXlQYXRoLFxuICAgICAgICB9KSA9PT0gY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb21wb25lbnREaXNhYmxlZCA9IHRoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwge1xuICAgICAgICAgIHZhbHVlS2V5UGF0aDogY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWVLZXlQYXRoLFxuICAgICAgICB9KSA9PT0gY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb21wb25lbnREaXNhYmxlZDtcbiAgfTtcblxuICBnZXRSb3dDbGFzc05hbWUgPSAocm93SW5kZXgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBncmlkLCBpc0NyZWF0aW5nLCBpc0VkaXRpbmcsIGNyZWF0ZURhdGEsIHNlbGVjdGVkSXRlbXMsIGRhdGEsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgcm93Q2xhc3NOYW1lcyA9IFsnb2MtZGF0YWdyaWQtcm93J107XG4gICAgbGV0IGV4dHJhUm93Q291bnQgPSAwOyAvLyBob3cgbWFueSByb3dzIHRvIGlnbm9yZSBmcm9tIHRvcCwgbmV3ICsgZmlsdGVyIHJvd3NcbiAgICBpZiAoaXNDcmVhdGluZykgZXh0cmFSb3dDb3VudCA9IGNyZWF0ZURhdGEuc2l6ZTtcbiAgICBpZiAoaXNDcmVhdGluZykge1xuICAgICAgaWYgKHJvd0luZGV4IDw9IGV4dHJhUm93Q291bnQgLSAxKSB7XG4gICAgICAgIHJvd0NsYXNzTmFtZXMucHVzaCgnb2MtZGF0YWdyaWQtcm93LW5ldycpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNFZGl0aW5nKSB7XG4gICAgICByb3dDbGFzc05hbWVzLnB1c2goJ29jLWRhdGFncmlkLXJvdy1lZGl0Jyk7XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgaWYgcm93IGlzIHNlbGVjdGVkXG4gICAgaWYgKCFpc0NyZWF0aW5nICYmICFpc0VkaXRpbmcgJiYgKHNlbGVjdGVkSXRlbXMgJiYgZ3JpZC5pZEtleVBhdGgpKSB7XG4gICAgICBpZiAoc2VsZWN0ZWRJdGVtcy5pbmRleE9mKGRhdGEuZ2V0SW4oW3Jvd0luZGV4IC0gZXh0cmFSb3dDb3VudCwgLi4uZ3JpZC5pZEtleVBhdGhdKSkgIT09IC0xKSB7XG4gICAgICAgIHJvd0NsYXNzTmFtZXMucHVzaCgnaXMtc2VsZWN0ZWQnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5wcm9wcy5yb3dDbGFzc05hbWVHZXR0ZXIpIHtcbiAgICAgIHJldHVybiByb3dDbGFzc05hbWVzLmpvaW4oJyAnKSArICcgJyArIHRoaXMucHJvcHMucm93Q2xhc3NOYW1lR2V0dGVyKHJvd0luZGV4KTtcbiAgICB9XG4gICAgcmV0dXJuIHJvd0NsYXNzTmFtZXMuam9pbignICcpO1xuICB9O1xuXG4gIGdldENlbGxNZXNzYWdlcyA9IChyb3dJbmRleCwgY29sLCBjZWxsVHlwZSkgPT4ge1xuICAgIGNvbnN0IHJldHVybkRhdGEgPSB7fTtcbiAgICBpZiAoIXRoaXMucHJvcHMuZ3JpZC5pZEtleVBhdGggfHwgIWNvbC52YWx1ZUtleVBhdGgpIHtcbiAgICAgIHJldHVybiByZXR1cm5EYXRhO1xuICAgIH1cbiAgICBsZXQgaW5mb01lc3NhZ2U7XG4gICAgbGV0IGVycm9yTWVzc2FnZTtcbiAgICBsZXQgd2FybmluZ01lc3NhZ2U7XG4gICAgaWYgKGNlbGxUeXBlID09PSAnY3JlYXRlJykge1xuICAgICAgaW5mb01lc3NhZ2UgPSB0aGlzLnByb3BzLmNyZWF0ZUNlbGxNZXNzYWdlcy5nZXRJbihbJ2luZm8nLCByb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgZXJyb3JNZXNzYWdlID0gdGhpcy5wcm9wcy5jcmVhdGVDZWxsTWVzc2FnZXMuZ2V0SW4oWydlcnJvcicsIHJvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgICB3YXJuaW5nTWVzc2FnZSA9IHRoaXMucHJvcHMuY3JlYXRlQ2VsbE1lc3NhZ2VzLmdldEluKFtcbiAgICAgICAgJ3dhcm5pbmcnLFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgLi4uY29sLnZhbHVlS2V5UGF0aCxcbiAgICAgIF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgICBpbmZvTWVzc2FnZSA9IHRoaXMucHJvcHMuY2VsbE1lc3NhZ2VzLmdldEluKFsnaW5mbycsIGlkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgICBlcnJvck1lc3NhZ2UgPSB0aGlzLnByb3BzLmNlbGxNZXNzYWdlcy5nZXRJbihbJ2Vycm9yJywgaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgIHdhcm5pbmdNZXNzYWdlID0gdGhpcy5wcm9wcy5jZWxsTWVzc2FnZXMuZ2V0SW4oWyd3YXJuaW5nJywgaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICB9XG4gICAgaWYgKGluZm9NZXNzYWdlKSB7XG4gICAgICByZXR1cm5EYXRhLmluZm9NZXNzYWdlID0gaW5mb01lc3NhZ2U7XG4gICAgfVxuICAgIGlmIChlcnJvck1lc3NhZ2UpIHtcbiAgICAgIHJldHVybkRhdGEuZXJyb3JNZXNzYWdlID0gZXJyb3JNZXNzYWdlO1xuICAgIH1cbiAgICBpZiAod2FybmluZ01lc3NhZ2UpIHtcbiAgICAgIHJldHVybkRhdGEud2FybmluZ01lc3NhZ2UgPSB3YXJuaW5nTWVzc2FnZTtcbiAgICB9XG4gICAgcmV0dXJuIHJldHVybkRhdGE7XG4gIH07XG5cbiAgZ2V0U2Nyb2xsVG9Sb3cgPSAoKSA9PiB7XG4gICAgbGV0IHNjcm9sbFRvUm93O1xuICAgIGlmICh0aGlzLnByb3BzLmlzQ3JlYXRpbmcgJiYgIXRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwpIHJldHVybiBzY3JvbGxUb1JvdztcbiAgICBpZiAodGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCkge1xuICAgICAgY29uc3Qgc2Nyb2xsTmV3Um93ID0gdGhpcy5wcm9wcy5jcmVhdGVEYXRhLnNpemUgLSAxO1xuICAgICAgaWYgKHNjcm9sbE5ld1JvdyA+PSAwKSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gc2Nyb2xsTmV3Um93O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5pc0VkaXRpbmcgJiYgIXRoaXMucHJvcHMuc2Nyb2xsSW5FZGl0TW9kZSkge1xuICAgICAgICBzY3JvbGxUb1JvdyA9IHRoaXMuc3RhdGUuY3VycmVudFJvdztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gdGhpcy5wcm9wcy5zY3JvbGxUb1JvdzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgfVxuICAgICAgaWYgKHNjcm9sbFRvUm93ID09PSB1bmRlZmluZWQgJiYgdGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLnNpemUgPiAwKSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gdGhpcy5nZXRTZWxlY3RlZEl0ZW1JbmRleCh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuZmlyc3QoKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzY3JvbGxUb1JvdztcbiAgfTtcblxuICBzZXRGb2N1c1RvID0gKGZvY3VzVG8pID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5pc0VkaXRpbmcgfHwgdGhpcy5wcm9wcy5pc0NyZWF0aW5nKSB7XG4gICAgICBpZiAoZm9jdXNUbyAmJiBmb2N1c1RvLmdldCgndHlwZScpICYmIGZvY3VzVG8gIT09IHRoaXMucHJldkZvY3VzVG8pIHtcbiAgICAgICAgdGhpc1tmb2N1c1RvLmdldCgndHlwZScpXSA9IHRydWU7XG4gICAgICAgIHRoaXMuZm9jdXNUb0xhc3RSb3cgPSBmb2N1c1RvLmdldCgnZm9jdXNUb0xhc3RSb3cnKTtcbiAgICAgICAgdGhpcy5wcmV2Rm9jdXNUbyA9IGZvY3VzVG87XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZUNlbGxTZWxlY3QgPSAoY2VsbFR5cGUsIHJvd0luZGV4LCBjb2x1bW5LZXkpID0+ICgpID0+IHtcbiAgICBpZiAoY2VsbFR5cGUgPT09ICd2aWV3JyAmJiB0aGlzLnByb3BzLmNlbGxTZWxlY3QpIHtcbiAgICAgIHRoaXMucHJvcHMuY2VsbFNlbGVjdGlvbkNoYW5nZShcbiAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICBNYXAoe1xuICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgIGNvbHVtbktleSxcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVDcmVhdGVDZWxsUmVmID0gKHJvd0luZGV4LCBjb2wpID0+IChyZWYpID0+IHtcbiAgICAvLyBGb2N1cyB0byBjcmVhdGUgY2VsbFxuICAgIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2wpO1xuICAgIGNvbnN0IHNlbGVjdFJlZiA9ICFyZWYgfHwgcmVmLmZvY3VzID8gcmVmIDogdGhpcy5nZXRTZWxlY3RSZWYocmVmKTtcbiAgICBpZiAoXG4gICAgICB0aGlzLnByb3BzLmNyZWF0ZURhdGEuc2l6ZVxuICAgICAgJiYgdGhpcy5wcm9wcy5jcmVhdGVEYXRhLnNpemUgPT09IHJvd0luZGV4ICsgMVxuICAgICAgJiYgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbFxuICAgICAgJiYgIXRoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnY3JlYXRlJylcbiAgICAgICYmIHNlbGVjdFJlZlxuICAgICkge1xuICAgICAgc2VsZWN0UmVmLmZvY3VzKCk7XG4gICAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcHMuZW5hYmxlQXJyb3dOYXZpZ2F0aW9uKSB7XG4gICAgICB0aGlzLmNyZWF0ZUNlbGxSZWZzW2Ake3RoaXMucHJvcHMuZ3JpZC5pZH1fJHtjb2x1bW5LZXl9XyR7cm93SW5kZXh9YF0gPSByZWY7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZUVkaXRDZWxsUmVmID0gKHJvd0luZGV4LCBjb2wpID0+IChyZWYpID0+IHtcbiAgICBjb25zdCBjb2x1bW5LZXkgPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sKTtcbiAgICBpZiAodGhpcy5mb2N1c1RvRWRpdENlbGwgJiYgIXRoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnZWRpdCcpKSB7XG4gICAgICBjb25zdCBzZWxlY3RlZFJvd0luZGV4ID0gdGhpcy5mb2N1c1RvTGFzdFJvdyAmJiB0aGlzLnByb3BzLmRhdGEuc2l6ZSA+IDBcbiAgICAgICAgPyB0aGlzLnByb3BzLmRhdGEuc2l6ZSAtIDFcbiAgICAgICAgOiB0aGlzLmdldFNlbGVjdGVkSXRlbUluZGV4KHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5maXJzdCgpKTtcblxuICAgICAgY29uc3QgeyBzZWxlY3RlZENlbGwgfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCBzZWxlY3RSZWYgPSAhcmVmIHx8IHJlZi5mb2N1cyA/IHJlZiA6IHRoaXMuZ2V0U2VsZWN0UmVmKHJlZik7XG4gICAgICBpZiAoc2VsZWN0ZWRDZWxsLnNpemUgPiAwKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBzZWxlY3RlZENlbGwuZ2V0KCdyb3dJbmRleCcpID09PSByb3dJbmRleFxuICAgICAgICAgICYmIHNlbGVjdGVkQ2VsbC5nZXQoJ2NvbHVtbktleScpID09PSBjb2x1bW5LZXlcbiAgICAgICAgICAmJiBzZWxlY3RSZWZcbiAgICAgICAgKSB7XG4gICAgICAgICAgc2VsZWN0UmVmLmZvY3VzKCk7XG4gICAgICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmZvY3VzVG9MYXN0Um93ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWRSb3dJbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZm9jdXNUb0xhc3RSb3cgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWRSb3dJbmRleCA9PT0gcm93SW5kZXggJiYgc2VsZWN0UmVmKSB7XG4gICAgICAgIHNlbGVjdFJlZi5mb2N1cygpO1xuICAgICAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZvY3VzVG9MYXN0Um93ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZUFycm93TmF2aWdhdGlvbikge1xuICAgICAgdGhpcy5jZWxsUmVmc1tgJHt0aGlzLnByb3BzLmdyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4fWBdID0gcmVmO1xuICAgIH1cbiAgfTtcblxuICBtb3ZlQ2VsbEZvY3VzID0gKG5leHRFbGVtZW50LCByb3dJbmRleCwgY29sdW1uSW5kZXgpID0+IHtcbiAgICBjb25zdCBlbGVtZW50VHlwZXMgPSBbJ3RleHQnLCAnY2hlY2tib3gnXTtcbiAgICBpZiAobmV4dEVsZW1lbnQgJiYgZWxlbWVudFR5cGVzLmluY2x1ZGVzKG5leHRFbGVtZW50LnR5cGUpKSB7XG4gICAgICBpZiAocm93SW5kZXggIT09IC0xIHx8IGNvbHVtbkluZGV4ICE9PSAtMSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBjdXJyZW50Q29sdW1uOiBjb2x1bW5JbmRleCxcbiAgICAgICAgICBjdXJyZW50Um93OiByb3dJbmRleCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKG5leHRFbGVtZW50LnR5cGUgPT09ICdjaGVja2JveCcpIG5leHRFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIGlmIChuZXh0RWxlbWVudC50eXBlID09PSAndGV4dCcpIG5leHRFbGVtZW50LnNlbGVjdCgpO1xuICAgICAgfSwgNTApO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVTZWxlY3RBbGxDaGVja0JveE9uQ2hhbmdlID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMuc2VsZWN0QWxsSXRlbXNDaGFuZ2UodGhpcy5wcm9wcy5ncmlkKTtcbiAgfTtcblxuICBoYW5kbGVTZWxlY3Rpb25DaGVja0JveE9uQ2hhbmdlID0gKCkgPT4gKCkgPT4ge1xuICAgIC8vIExvZ2ljIGZvciB0aGlzIGFjdGlvbiBjb250YWlucyBpbiBoYW5kbGVSb3dDbGljayAoaW4gJ2Vsc2UnIGJsb2NrKVxuICB9O1xuXG4gIGdlbmVyYXRlQ29sdW1ucyA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBkYXRhLFxuICAgICAgc2VsZWN0ZWRJdGVtcyxcbiAgICAgIGRhdGVGb3JtYXQsXG4gICAgICB0aG91c2FuZFNlcGFyYXRvcixcbiAgICAgIGRlY2ltYWxTZXBhcmF0b3IsXG4gICAgICBncmlkLFxuICAgICAgaW5saW5lRWRpdCxcbiAgICAgIGZpbHRlcmluZyxcbiAgICAgIHJlZ2lvbixcbiAgICAgIGludGwsXG4gICAgICBzZWxlY3RDb21wb25lbnRPcHRpb25zLFxuICAgICAgaXNDcmVhdGluZyxcbiAgICAgIGV4dHJhQ29sdW1uLFxuICAgICAgcm93U2VsZWN0Q2hlY2tib3hDb2x1bW4sXG4gICAgICBzaG93U2VsZWN0QWxsQ2hlY2tib3gsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBjb2x1bW5zID0gW107XG4gICAgY29uc3QgdGFiSW5kZXggPSBTdHJpbmcodGhpcy5wcm9wcy50YWJJbmRleCk7XG4gICAgaWYgKGV4dHJhQ29sdW1uKSB7XG4gICAgICBjb2x1bW5zLnB1c2goe1xuICAgICAgICB3aWR0aDogZXh0cmFDb2x1bW4ud2lkdGggfHwgNDAsXG4gICAgICAgIGlzUmVzaXphYmxlOiAhIWV4dHJhQ29sdW1uLmlzUmVzaXphYmxlLFxuICAgICAgICBpc1NvcnRhYmxlOiBmYWxzZSxcbiAgICAgICAgY29sdW1uS2V5OiAnZXh0cmFDb2x1bW4nLFxuICAgICAgICBjZWxsOiByb3dJbmRleCA9PiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1leHRyYS1jb2x1bW4tY2VsbCBuby1yb3ctc2VsZWN0XCI+XG4gICAgICAgICAgICB7ZXh0cmFDb2x1bW4udmFsdWVSZW5kZXIoZGF0YS5nZXQocm93SW5kZXgpLCByb3dJbmRleCl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICksXG4gICAgICAgIGNlbGxFZGl0OiByb3dJbmRleCA9PiAoZXh0cmFDb2x1bW4uY2VsbEVkaXQgPyBleHRyYUNvbHVtbi5jZWxsRWRpdChyb3dJbmRleCkgOiBudWxsKSxcbiAgICAgICAgY2VsbENyZWF0ZTogcm93SW5kZXggPT4gKGV4dHJhQ29sdW1uLmNlbGxDcmVhdGUgPyBleHRyYUNvbHVtbi5jZWxsQ3JlYXRlKHJvd0luZGV4KSA6IG51bGwpLFxuICAgICAgICBjZWxsRmlsdGVyOiByb3dJbmRleCA9PiAoZXh0cmFDb2x1bW4uY2VsbEZpbHRlciA/IGV4dHJhQ29sdW1uLmNlbGxGaWx0ZXIocm93SW5kZXgpIDogbnVsbCksXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocm93U2VsZWN0Q2hlY2tib3hDb2x1bW4pIHtcbiAgICAgIGNvbHVtbnMucHVzaCh7XG4gICAgICAgIHdpZHRoOiA0MCxcbiAgICAgICAgaXNSZXNpemFibGU6IGZhbHNlLFxuICAgICAgICBpc1NvcnRhYmxlOiBmYWxzZSxcbiAgICAgICAgY29sdW1uS2V5OiAnc2VsZWN0aW9uQ2hlY2tib3gnLFxuICAgICAgICBoZWFkZXI6IHNob3dTZWxlY3RBbGxDaGVja2JveCAmJiAoXG4gICAgICAgICAgPENoZWNrYm94XG4gICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRTZWxlY3RBbGxDaGVja0JveC0ke2dyaWQuaWR9YH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLXNlbGVjdC1hbGwtY2hlY2tib3gtY2VsbCBuby1yb3ctc2VsZWN0XCJcbiAgICAgICAgICAgIGNoZWNrZWQ9e2RhdGEuc2l6ZSAhPT0gMCAmJiBkYXRhLnNpemUgPT09IHNlbGVjdGVkSXRlbXMuc2l6ZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVNlbGVjdEFsbENoZWNrQm94T25DaGFuZ2V9XG4gICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSxcbiAgICAgICAgY2VsbDogKHJvd0luZGV4KSA9PiB7XG4gICAgICAgICAgY29uc3Qgcm93SXRlbSA9IGRhdGEuZ2V0KHJvd0luZGV4KTtcbiAgICAgICAgICBjb25zdCBpdGVtSWQgPSByb3dJdGVtLmdldEluKGdyaWQuaWRLZXlQYXRoKTtcbiAgICAgICAgICBjb25zdCBzZWxlY3RlZCA9IHNlbGVjdGVkSXRlbXMuaW5jbHVkZXMoaXRlbUlkKTtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPENoZWNrYm94XG4gICAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZFNlbGVjdENoZWNrQm94LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke3Jvd0luZGV4fWB9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLXNlbGVjdC1jaGVja2JveC1jZWxsIG5vLXJvdy1zZWxlY3RcIlxuICAgICAgICAgICAgICBjaGVja2VkPXtzZWxlY3RlZH1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlU2VsZWN0aW9uQ2hlY2tCb3hPbkNoYW5nZShyb3dJbmRleCl9XG4gICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgY2VsbEVkaXQ6ICgpID0+IG51bGwsXG4gICAgICAgIGNlbGxDcmVhdGU6ICgpID0+IG51bGwsXG4gICAgICAgIGNlbGxGaWx0ZXI6ICgpID0+IG51bGwsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCB2aXNpYmxlQ29sdW1ucyA9IFtdO1xuICAgIHRoaXMucHJvcHMudmlzaWJsZUNvbHVtbnMuZm9yRWFjaCgodmlzaWJsZUNvbHVtbktleSkgPT4ge1xuICAgICAgdGhpcy5wcm9wcy5jb2x1bW5zLmZvckVhY2goKG9yZ0NvbCkgPT4ge1xuICAgICAgICBpZiAoVXRpbHMuZ2V0Q29sdW1uS2V5KG9yZ0NvbCkgPT09IHZpc2libGVDb2x1bW5LZXkpIHtcbiAgICAgICAgICB2aXNpYmxlQ29sdW1ucy5wdXNoKG9yZ0NvbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHZpc2libGVDb2x1bW5zLmZvckVhY2goKGNvbCkgPT4ge1xuICAgICAgY29uc3QgdmFsdWVFbXB0eUNoZWNrZXIgPSBVdGlscy5nZXRWYWx1ZUVtcHR5Q2hlY2tlcihjb2wpO1xuICAgICAgLy8gQ2VsbCB2YWx1ZSByZW5kZXJpbmdcbiAgICAgIGNvbnN0IHZhbHVlUmVuZGVyID0gKHJvd0luZGV4LCBmb3JtYXQpID0+IHtcbiAgICAgICAgY29uc3QgdmFsID0gZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbCkpIHtcbiAgICAgICAgICByZXR1cm4gY29sLmlzUmVxdWlyZWQgPyA8TSBpZD1cIkdyaWQuVmFsdWVJc01pc3NpbmdcIiAvPiA6ICcnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3JtYXQgPyBmb3JtYXQodmFsKSA6IHZhbDtcbiAgICAgIH07XG5cbiAgICAgIGxldCBjb2x1bW4gPSBHcmlkQ29sdW1uU2VydmljZS5iYXNlQ29sdW1uKGNvbCk7XG4gICAgICAvLyBDb2xsZWN0IGNvbHVtbiBmdW5jdGlvbnMgaW50byBvbmUgT2JqZWN0XG4gICAgICBjb25zdCBjb2x1bW5GdW5jdGlvbnMgPSB7XG4gICAgICAgIGVkaXQ6IHtcbiAgICAgICAgICBnZXRJdGVtVmFsdWU6IHRoaXMuZ2V0RWRpdEl0ZW1WYWx1ZSxcbiAgICAgICAgICBvbkNlbGxWYWx1ZUNoYW5nZTogdGhpcy5vbkVkaXRDZWxsVmFsdWVDaGFuZ2UsXG4gICAgICAgICAgb25DZWxsQmx1cjogdGhpcy5vbkVkaXRDZWxsQmx1cixcbiAgICAgICAgICBvbkNlbGxGb2N1czogdGhpcy5vbkNlbGxGb2N1cyxcbiAgICAgICAgICBvbkNlbGxLZXlEb3duOiB0aGlzLm9uRWRpdENlbGxLZXlEb3duLFxuICAgICAgICAgIGhhbmRsZUNlbGxSZWY6IHRoaXMuaGFuZGxlRWRpdENlbGxSZWYsXG4gICAgICAgIH0sXG4gICAgICAgIGNyZWF0ZToge1xuICAgICAgICAgIGdldEl0ZW1WYWx1ZTogdGhpcy5nZXRDcmVhdGVJdGVtVmFsdWUsXG4gICAgICAgICAgb25DZWxsVmFsdWVDaGFuZ2U6IHRoaXMub25DcmVhdGVDZWxsVmFsdWVDaGFuZ2UsXG4gICAgICAgICAgb25DZWxsQmx1cjogdGhpcy5vbkNyZWF0ZUNlbGxCbHVyLFxuICAgICAgICAgIG9uQ2VsbEZvY3VzOiB0aGlzLm9uQ2VsbEZvY3VzLFxuICAgICAgICAgIG9uQ2VsbEtleURvd246IHRoaXMub25DcmVhdGVDZWxsS2V5RG93bixcbiAgICAgICAgICBoYW5kbGVDZWxsUmVmOiB0aGlzLmhhbmRsZUNyZWF0ZUNlbGxSZWYsXG4gICAgICAgIH0sXG4gICAgICAgIGZpbHRlcjoge1xuICAgICAgICAgIGdldEl0ZW1WYWx1ZTogdGhpcy5nZXRGaWx0ZXJJdGVtVmFsdWUsXG4gICAgICAgICAgZ2V0SXRlbU11bHRpVmFsdWU6IHRoaXMuZ2V0RmlsdGVySXRlbU11bHRpVmFsdWUsXG4gICAgICAgICAgb25DZWxsVmFsdWVDaGFuZ2U6IHRoaXMub25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UsXG4gICAgICAgICAgb25DZWxsTXVsdGlWYWx1ZUJsdXI6IHRoaXMub25GaWx0ZXJDZWxsTXVsdGlWYWx1ZUJsdXIsXG4gICAgICAgICAgb25DZWxsTXVsdGlWYWx1ZUNoYW5nZTogdGhpcy5vbkZpbHRlckNlbGxNdWx0aVZhbHVlQ2hhbmdlLFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgLy8gaGFuZGxlIGNvbHVtbi5jZWxsIC8gY29sdW1uLmNlbGxFZGl0IC8gY29sdW1uLmNlbGxDcmVhdGUgLyBjb2x1bW4uY2VsbEZpbHRlclxuICAgICAgY29uc3QgY2VsbFByb3BzID0ge1xuICAgICAgICBncmlkLFxuICAgICAgICBkYXRhLFxuICAgICAgICBkYXRlRm9ybWF0LFxuICAgICAgICB0aG91c2FuZFNlcGFyYXRvcixcbiAgICAgICAgZGVjaW1hbFNlcGFyYXRvcixcbiAgICAgICAgc2VsZWN0Q29tcG9uZW50T3B0aW9ucyxcbiAgICAgIH07IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIGNvbHVtbiA9IEdyaWRDb2x1bW5TZXJ2aWNlLmNvbHVtbkNlbGwoY29sdW1uLCBjZWxsUHJvcHMsIGNvbCwgdmFsdWVSZW5kZXIpO1xuXG4gICAgICAvLyBoYW5kbGUgY29sdW1uQ29tcG9uZW50VHlwZXNcbiAgICAgIGNvbnN0IGNvbXBvbmVudFR5cGVQcm9wcyA9IHtcbiAgICAgICAgLi4uY2VsbFByb3BzLFxuICAgICAgICBpbmxpbmVFZGl0LFxuICAgICAgICBmaWx0ZXJpbmcsXG4gICAgICAgIHJlZ2lvbixcbiAgICAgICAgaW50bCxcbiAgICAgICAgc2VsZWN0Q29tcG9uZW50T3B0aW9ucyxcbiAgICAgIH07IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIGNvbHVtbiA9IEdyaWRDb2x1bW5TZXJ2aWNlLmNvbHVtbkNvbXBvbmVudFR5cGUoXG4gICAgICAgIGNvbHVtbixcbiAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgIGNvbXBvbmVudFR5cGVQcm9wcyxcbiAgICAgICAgY29sLFxuICAgICAgICBjb2x1bW5GdW5jdGlvbnMsXG4gICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZSxcbiAgICAgICk7XG4gICAgICBjb2x1bW5zLnB1c2goY29sdW1uKTtcbiAgICB9KTtcblxuICAgIGlmIChpc0NyZWF0aW5nKSB7XG4gICAgICBjb2x1bW5zLnB1c2goe1xuICAgICAgICB3aWR0aDogMzcsXG4gICAgICAgIGlzUmVzaXphYmxlOiBmYWxzZSxcbiAgICAgICAgY29sdW1uS2V5OiAncmVtb3ZlTmV3SXRlbScsXG4gICAgICAgIGNlbGw6ICgpID0+IG51bGwsXG4gICAgICAgIGNlbGxFZGl0OiAoKSA9PiBudWxsLFxuICAgICAgICBjZWxsQ3JlYXRlOiByb3dJbmRleCA9PiAoXG4gICAgICAgICAgPEljb25cbiAgICAgICAgICAgIGlkPXtgb2MtZGF0YWdyaWQtbmV3LWl0ZW0tcmVtb3ZlLSR7Z3JpZC5pZH0tJHtyb3dJbmRleH1gfVxuICAgICAgICAgICAgdHlwZT1cImluZGljYXRvclwiXG4gICAgICAgICAgICBuYW1lPVwiZGVsZXRlXCJcbiAgICAgICAgICAgIHdpZHRoPXszMH1cbiAgICAgICAgICAgIGhlaWdodD17MzB9XG4gICAgICAgICAgICBzdHlsZT17eyBwYWRkaW5nOiAnN3B4JyB9fVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdGhpcy5wcm9wcy5yZW1vdmVOZXdJdGVtKGdyaWQsIHJvd0luZGV4KX1cbiAgICAgICAgICAvPlxuICAgICAgICApLFxuICAgICAgICBjZWxsRmlsdGVyOiAoKSA9PiBudWxsLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBjb2x1bW5zO1xuICB9O1xuXG4gIGlzQ2VsbEVkaXRlZCA9IChyb3dJbmRleCwgY29sLCBjZWxsVHlwZSkgPT4ge1xuICAgIGlmIChjZWxsVHlwZSAhPT0gJ2VkaXQnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICByZXR1cm4gISF0aGlzLnByb3BzLmVkaXREYXRhLmdldEluKFtpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICB9O1xuXG4gIGhhbmRsZUFmdGVyQWRkSXRlbSA9ICgpID0+IHtcbiAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsID0gdHJ1ZTtcbiAgfTtcblxuICBoYW5kbGVBZnRlckVkaXRQcmVzcyA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLnNpemUpIHtcbiAgICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gdHJ1ZTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjdXJyZW50Um93OiB1bmRlZmluZWQsXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlQWZ0ZXJWYWxpZGF0aW9uRXJyb3IgPSAoKSA9PiB7XG4gICAgdGhpcy5mb2N1c1RvRXJyb3JDZWxsID0gdHJ1ZTtcbiAgfTtcblxuICBoYW5kbGVSb3dDbGljayA9IChlLCByb3dJbmRleCkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5pc0NyZWF0aW5nICYmICF0aGlzLnByb3BzLmlzRWRpdGluZykge1xuICAgICAgY29uc3QgeyB0YXJnZXQ6IHsgdHlwZSB9IH0gPSBlO1xuICAgICAgaWYgKHR5cGUgIT09ICdjaGVja2JveCcpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgICAgaWYgKGUuY3RybEtleSB8fCBlLnNoaWZ0S2V5KSB7XG4gICAgICAgIGRvY3VtZW50LmdldFNlbGVjdGlvbigpLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgfVxuICAgICAgLy8gRG9uJ3QgdHJpZ2dlciBzZWxlY3Rpb24gY2hhbmdlIG9uIHdoZW4gdXNlciBjbGlja3Mgb24gc3BlY2lhbCBjZWxscyBsaWtlIGNoZWNrYm94L2V4dHJhXG4gICAgICAvLyBDaGVjayB0aGF0IGNsaWNrZWQgbm9kZSdzIHBhcmVudCBvciBwYXJlbnQncyBwYXJlbnQgZG9lc24ndCBoYXZlIG5vLXJvdy1zZWxlY3QgY2xhc3NcbiAgICAgIGNvbnN0IHsgcGFyZW50Tm9kZSB9ID0gZS50YXJnZXQ7XG4gICAgICBjb25zdCBwYXJlbnQxY2xhc3MgPSBwYXJlbnROb2RlLmNsYXNzTmFtZSAmJiBwYXJlbnROb2RlLmNsYXNzTmFtZS5pbmRleE9mID8gcGFyZW50Tm9kZS5jbGFzc05hbWUgOiAnJztcbiAgICAgIGNvbnN0IHBhcmVudDJjbGFzcyA9ICAgICAgICBwYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lICYmIHBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUuaW5kZXhPZiAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgID8gcGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZVxuICAgICAgICA6ICcnO1xuICAgICAgY29uc3QgcGFyZW50M2NsYXNzID0gcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgICYmIHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZS5pbmRleE9mIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgPyBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWVcbiAgICAgICAgOiAnJztcbiAgICAgIGNvbnN0IHBhcmVudDRjbGFzcyA9IHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgICYmIHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lLmluZGV4T2YgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICA/IHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgIDogJyc7XG4gICAgICBpZiAoXG4gICAgICAgIHBhcmVudDFjbGFzcy5pbmRleE9mKCduby1yb3ctc2VsZWN0JykgPT09IC0xXG4gICAgICAgICYmIHBhcmVudDJjbGFzcy5pbmRleE9mKCduby1yb3ctc2VsZWN0JykgPT09IC0xXG4gICAgICAgICYmIHBhcmVudDNjbGFzcy5pbmRleE9mKCduby1yb3ctc2VsZWN0JykgPT09IC0xXG4gICAgICAgICYmIHBhcmVudDRjbGFzcy5pbmRleE9mKCduby1yb3ctc2VsZWN0JykgPT09IC0xXG4gICAgICApIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucm93U2VsZWN0KSB7XG4gICAgICAgICAgdGhpcy5wcm9wcy5pdGVtU2VsZWN0aW9uQ2hhbmdlKFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0aGlzLnByb3BzLm11bHRpU2VsZWN0ICYmIGUuY3RybEtleSxcbiAgICAgICAgICAgIHRoaXMucHJvcHMubXVsdGlTZWxlY3QgJiYgZS5zaGlmdEtleSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnByb3BzLml0ZW1TZWxlY3Rpb25DaGFuZ2UodGhpcy5wcm9wcy5ncmlkLCByb3dJbmRleCwgdGhpcy5wcm9wcy5tdWx0aVNlbGVjdCwgZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5vblJvd0NsaWNrKSB7XG4gICAgICB0aGlzLnByb3BzLm9uUm93Q2xpY2soZSwgcm93SW5kZXgsIHRoaXMucHJvcHMuZGF0YS5nZXQocm93SW5kZXgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgaGFuZGxlQ29udGV4dE1lbnUgPSAoZSwgcm93SW5kZXgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5jb250ZXh0TWVudUl0ZW1zKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGl0ZW1TZWxlY3Rpb25DaGFuZ2UsIHNlbGVjdGVkSXRlbXMsIGdyaWQsIGRhdGEsXG4gICAgICB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY29udGV4dE1lbnVPcGVuOiB0cnVlLFxuICAgICAgICBjb250ZXh0TWVudVg6IGUuY2xpZW50WCxcbiAgICAgICAgY29udGV4dE1lbnVZOiBlLmNsaWVudFksXG4gICAgICB9KTtcbiAgICAgIC8vIElmIGNsaWNrZWQgaXRlbSBpcyBub3Qgc2VsZWN0ZWQsIGNoYW5nZSBzZWxlY3Rpb24gdG8gaXRcbiAgICAgIGlmICghc2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhkYXRhLmdldEluKFtyb3dJbmRleCwgLi4uZ3JpZC5pZEtleVBhdGhdKSkpIHtcbiAgICAgICAgaXRlbVNlbGVjdGlvbkNoYW5nZShncmlkLCByb3dJbmRleCk7XG4gICAgICB9XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25Eb2N1bWVudENsaWNrKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgaGFuZGxlUm93SGVpZ2h0R2V0dGVyID0gcm93SW5kZXggPT4gdGhpcy5wcm9wcy5yb3dIZWlnaHRHZXR0ZXIoXG4gICAgdGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCksXG4gICAgcm93SW5kZXgsXG4gICk7XG5cbiAgcmVuZGVyQ2VsbCA9IGNvbCA9PiAoY2VsbFByb3BzKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgaXNDcmVhdGluZywgaXNFZGl0aW5nLCBjcmVhdGVEYXRhLCBzZWxlY3RlZENlbGwsIGdyaWQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyByb3dJbmRleCwgLi4ucHJvcHMgfSA9IGNlbGxQcm9wcztcbiAgICBsZXQgY2VsbDtcbiAgICBsZXQgY2VsbFR5cGUgPSAndmlldyc7XG4gICAgbGV0IGV4dHJhUm93Q291bnQgPSAwOyAvLyBob3cgbWFueSByb3dzIHRvIGlnbm9yZSBmcm9tIHRvcCwgbmV3ICsgZmlsdGVyIHJvd3NcbiAgICBpZiAoaXNDcmVhdGluZykgZXh0cmFSb3dDb3VudCA9IGNyZWF0ZURhdGEuc2l6ZTtcbiAgICBjb25zdCBleGlzdGluZ1Jvd3NJbmRleCA9IHJvd0luZGV4IC0gZXh0cmFSb3dDb3VudDtcbiAgICBpZiAoaXNDcmVhdGluZykge1xuICAgICAgaWYgKHJvd0luZGV4IDw9IGV4dHJhUm93Q291bnQgLSAxKSB7XG4gICAgICAgIGlmIChjb2wuY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNlbGwgPSBjb2wuY2VsbENyZWF0ZShcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGhpcy5oYW5kbGVDcmVhdGVDZWxsUmVmKHJvd0luZGV4LCBjb2wpLFxuICAgICAgICAgICAgdGhpcy5vbkNyZWF0ZUNlbGxLZXlEb3duKHJvd0luZGV4LCBjb2wpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgY2VsbFR5cGUgPSAnY3JlYXRlJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjZWxsID0gbnVsbDtcbiAgICAgICAgICBjZWxsVHlwZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNlbGwgPSBjb2wuY2VsbChcbiAgICAgICAgICBleGlzdGluZ1Jvd3NJbmRleCxcbiAgICAgICAgICB0aGlzLmhhbmRsZUNyZWF0ZUNlbGxSZWYoZXhpc3RpbmdSb3dzSW5kZXgsIGNvbCksXG4gICAgICAgICAgdGhpcy5vbkNyZWF0ZUNlbGxLZXlEb3duKGV4aXN0aW5nUm93c0luZGV4LCBjb2wpLFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNFZGl0aW5nICYmIGNvbC5jZWxsRWRpdCkge1xuICAgICAgY2VsbCA9IGNvbC5jZWxsRWRpdChcbiAgICAgICAgZXhpc3RpbmdSb3dzSW5kZXgsXG4gICAgICAgIHRoaXMuaGFuZGxlRWRpdENlbGxSZWYoZXhpc3RpbmdSb3dzSW5kZXgsIGNvbCksXG4gICAgICAgIHRoaXMub25FZGl0Q2VsbEtleURvd24oZXhpc3RpbmdSb3dzSW5kZXgsIGNvbCksXG4gICAgICApO1xuICAgICAgY2VsbFR5cGUgPSAnZWRpdCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNlbGwgPSBjb2wuY2VsbChcbiAgICAgICAgZXhpc3RpbmdSb3dzSW5kZXgsXG4gICAgICAgIHRoaXMuaGFuZGxlRWRpdENlbGxSZWYoZXhpc3RpbmdSb3dzSW5kZXgsIGNvbCksXG4gICAgICAgIHRoaXMub25FZGl0Q2VsbEtleURvd24oZXhpc3RpbmdSb3dzSW5kZXgsIGNvbCksXG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCBpc1NwZWNpYWwgPSBwcm9wcy5jb2x1bW5LZXkgPT09ICdzZWxlY3Rpb25DaGVja2JveCcgfHwgcHJvcHMuY29sdW1uS2V5ID09PSAnZXh0cmFDb2x1bW4nO1xuICAgIGlmICgoY2VsbFR5cGUgPT09ICd2aWV3JyB8fCBjZWxsVHlwZSA9PT0gJ2VkaXQnIHx8IGNlbGxUeXBlID09PSAnY3JlYXRlJykgJiYgIWlzU3BlY2lhbCkge1xuICAgICAgY29uc3QgZ2V0Um93SW5kZXggPSBjZWxsVHlwZSA9PT0gJ2NyZWF0ZScgPyByb3dJbmRleCA6IHJvd0luZGV4IC0gZXh0cmFSb3dDb3VudDtcbiAgICAgIGNvbnN0IG1lc3NhZ2VEYXRhID0gdGhpcy5nZXRDZWxsTWVzc2FnZXMoZ2V0Um93SW5kZXgsIGNvbCwgY2VsbFR5cGUpO1xuICAgICAgY29uc3QgaXNFZGl0ZWQgPSB0aGlzLmlzQ2VsbEVkaXRlZChnZXRSb3dJbmRleCwgY29sLCBjZWxsVHlwZSk7XG4gICAgICBjb25zdCBjbGFzc05hbWUgPSBzZWxlY3RlZENlbGwuZ2V0KCdyb3dJbmRleCcpID09PSByb3dJbmRleFxuICAgICAgICAmJiBzZWxlY3RlZENlbGwuZ2V0KCdjb2x1bW5LZXknKSA9PT0gcHJvcHMuY29sdW1uS2V5XG4gICAgICAgID8gJ29jLWRhdGFncmlkLWNlbGwgaXMtc2VsZWN0ZWQnXG4gICAgICAgIDogJ29jLWRhdGFncmlkLWNlbGwnO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPENlbGxcbiAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG4gICAgICAgICAgc3R5bGU9e2NvbC5zdHlsZX1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNlbGxTZWxlY3QoY2VsbFR5cGUsIHJvd0luZGV4LCBwcm9wcy5jb2x1bW5LZXkpfVxuICAgICAgICA+XG4gICAgICAgICAgPENlbGxUb29sdGlwXG4gICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRDZWxsLSR7Z3JpZC5pZH0tJHtwcm9wcy5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgIGlzRWRpdGVkPXtpc0VkaXRlZH1cbiAgICAgICAgICAgIGlzRXJyb3I9eyEhbWVzc2FnZURhdGEuZXJyb3JNZXNzYWdlfVxuICAgICAgICAgICAgaXNXYXJuaW5nPXshIW1lc3NhZ2VEYXRhLndhcm5pbmdNZXNzYWdlfVxuICAgICAgICAgICAgaW5mb01lc3NhZ2U9e21lc3NhZ2VEYXRhLmluZm9NZXNzYWdlfVxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlPXttZXNzYWdlRGF0YS5lcnJvck1lc3NhZ2V9XG4gICAgICAgICAgICB3YXJuaW5nTWVzc2FnZT17bWVzc2FnZURhdGEud2FybmluZ01lc3NhZ2V9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2NlbGx9XG4gICAgICAgICAgPC9DZWxsVG9vbHRpcD5cbiAgICAgICAgPC9DZWxsPlxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxDZWxsIHsuLi5wcm9wc30gY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtY2VsbFwiIHN0eWxlPXtjb2wuc3R5bGV9PlxuICAgICAgICB7Y2VsbH1cbiAgICAgIDwvQ2VsbD5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlckNvbHVtbnMgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgYWxsRGF0YVNpemUsIGdyaWQsIGlzQ3JlYXRpbmcsIGlzQnVzeSwgdmlzaWJsZUNvbHVtbnMsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFhbGxEYXRhU2l6ZSAmJiAhaXNCdXN5ICYmICFpc0NyZWF0aW5nICYmICFncmlkLnBhZ2luYXRpb24pIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxDb2x1bW5cbiAgICAgICAgICBjb2x1bW5LZXk9XCJkYXRhRW1wdHlDb2x1bW5cIlxuICAgICAgICAgIGhlYWRlcj17KFxuICAgICAgICAgICAgPENlbGwgc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICAgICAgPE0gaWQ9XCJHcmlkLk5vSXRlbXNcIiAvPlxuICAgICAgICAgICAgPC9DZWxsPlxuKX1cbiAgICAgICAgICB3aWR0aD17MTB9XG4gICAgICAgICAgaXNSZXNpemFibGU9e2ZhbHNlfVxuICAgICAgICAgIGZsZXhHcm93PXsxfVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKCF2aXNpYmxlQ29sdW1ucy5zaXplKSB7XG4gICAgICBpZiAoaXNCdXN5KSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPENvbHVtblxuICAgICAgICAgICAgY29sdW1uS2V5PVwiZGF0YUVtcHR5Q29sdW1uXCJcbiAgICAgICAgICAgIGhlYWRlcj17PENlbGw+Jm5ic3A7PC9DZWxsPn1cbiAgICAgICAgICAgIHdpZHRoPXsxMH1cbiAgICAgICAgICAgIGlzUmVzaXphYmxlPXtmYWxzZX1cbiAgICAgICAgICAgIGZsZXhHcm93PXsxfVxuICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Q29sdW1uXG4gICAgICAgICAgY29sdW1uS2V5PVwiZGF0YUVtcHR5Q29sdW1uXCJcbiAgICAgICAgICBoZWFkZXI9eyhcbiAgICAgICAgICAgIDxDZWxsIHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgICAgIDxNIGlkPVwiR3JpZC5Ob0NvbHVtbnNcIiAvPlxuICAgICAgICAgICAgPC9DZWxsPlxuKX1cbiAgICAgICAgICB3aWR0aD17MTB9XG4gICAgICAgICAgaXNSZXNpemFibGU9e2ZhbHNlfVxuICAgICAgICAgIGZsZXhHcm93PXsxfVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3QgY29sdW1ucyA9IHRoaXMuZ2VuZXJhdGVDb2x1bW5zKCk7XG4gICAgaWYgKGNvbHVtbnMubGVuZ2h0ID09PSAwKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gY29sdW1ucy5tYXAoY29sID0+IChcbiAgICAgIDxDb2x1bW5cbiAgICAgICAga2V5PXtjb2wuY29sdW1uS2V5fVxuICAgICAgICBjb2x1bW5LZXk9e2NvbC5jb2x1bW5LZXl9XG4gICAgICAgIGhlYWRlcj17KFxuICAgICAgICAgIDxIZWFkZXJDZWxsXG4gICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRIZWFkZXItJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sLmNvbHVtbktleX1gfVxuICAgICAgICAgICAgZ3JpZD17dGhpcy5wcm9wcy5ncmlkfVxuICAgICAgICAgICAgY29sdW1ucz17dGhpcy5wcm9wcy5jb2x1bW5zfVxuICAgICAgICAgICAgY29sdW1uPXtjb2x9XG4gICAgICAgICAgICBjdXJyZW50U29ydENvbHVtbj17dGhpcy5wcm9wcy5zb3J0Q29sdW1ufVxuICAgICAgICAgICAgY3VycmVudFNvcnRPcmRlcj17dGhpcy5wcm9wcy5zb3J0T3JkZXJ9XG4gICAgICAgICAgICBvblNvcnRDaGFuZ2U9e3RoaXMucHJvcHMuc29ydENoYW5nZX1cbiAgICAgICAgICAgIGlzQnVzeT17dGhpcy5wcm9wcy5pc0J1c3l9XG4gICAgICAgICAgICBmaWx0ZXJpbmc9e3RoaXMucHJvcHMuZmlsdGVyaW5nICYmIHRoaXMucHJvcHMuaXNGaWx0ZXJpbmd9XG4gICAgICAgICAgICB3aWR0aD17dGhpcy5wcm9wcy5jb2x1bW5XaWR0aHMuZ2V0KGNvbC5jb2x1bW5LZXksIGNvbC53aWR0aCl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2NvbC5oZWFkZXJ9XG4gICAgICAgICAgPC9IZWFkZXJDZWxsPlxuKX1cbiAgICAgICAgY2VsbD17dGhpcy5yZW5kZXJDZWxsKGNvbCl9XG4gICAgICAgIHdpZHRoPXt0aGlzLnByb3BzLmNvbHVtbldpZHRocy5nZXQoY29sLmNvbHVtbktleSwgY29sLndpZHRoKX1cbiAgICAgICAgbWluV2lkdGg9e2NvbC5taW5XaWR0aH1cbiAgICAgICAgbWF4V2lkdGg9e2NvbC5tYXhXaWR0aH1cbiAgICAgICAgaXNSZXNpemFibGU9e2NvbC5pc1Jlc2l6YWJsZX1cbiAgICAgICAgZmxleEdyb3c9e2NvbC5mbGV4R3JvdyA/IGNvbC5mbGV4R3JvdyA6IDB9XG4gICAgICAgIGZpeGVkPXtjb2wuZml4ZWR9XG4gICAgICAgIGZpeGVkUmlnaHQ9e2NvbC5maXhlZFJpZ2h0fVxuICAgICAgICBhbGxvd0NlbGxzUmVjeWNsaW5nPXtjb2wuYWxsb3dDZWxsc1JlY3ljbGluZ31cbiAgICAgIC8+XG4gICAgKSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGdyaWRDbGFzc05hbWUgPSBjbGFzc05hbWVzKHtcbiAgICAgICdvYy1kYXRhZ3JpZC1jb250YWluZXInOiB0cnVlLFxuICAgICAgJ3dpdGgtYWN0aW9uYmFyJzogdGhpcy5wcm9wcy5pbmxpbmVFZGl0ICYmICF0aGlzLnByb3BzLmRpc2FibGVBY3Rpb25CYXIsXG4gICAgICAnaXMtYnVzeSc6IHRoaXMucHJvcHMuaXNCdXN5LFxuICAgICAgJ2lzLWVkaXRpbmcnOiB0aGlzLnByb3BzLmlzRWRpdGluZyxcbiAgICAgICdpcy1jcmVhdGluZyc6IHRoaXMucHJvcHMuaXNDcmVhdGluZyxcbiAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgfSk7XG5cbiAgICAvLyBjaGVjayBpZiB0aGVyZSBpcyBhIG5ldyByZXF1ZXN0IHRvIGNoYW5nZSBlZGl0IG1vZGUgZm9jdXNcbiAgICB0aGlzLnNldEZvY3VzVG8odGhpcy5wcm9wcy5mb2N1c1R5cGUpO1xuXG4gICAgbGV0IGFjdGlvbkJhciA9IG51bGw7XG4gICAgbGV0IGFjdGlvbkJhclJpZ2h0ID0gbnVsbDtcbiAgICBsZXQgYWN0aW9uQmFyTGVmdCA9IG51bGw7XG4gICAgaWYgKFxuICAgICAgKHRoaXMucHJvcHMuYWN0aW9uQmFyXG4gICAgICAgIHx8IHRoaXMucHJvcHMuaW5saW5lRWRpdFxuICAgICAgICB8fCB0aGlzLnByb3BzLmZpbHRlcmluZ1xuICAgICAgICB8fCB0aGlzLnByb3BzLnJlbW92aW5nKVxuICAgICAgJiYgIXRoaXMucHJvcHMuZGlzYWJsZUFjdGlvbkJhclxuICAgICkge1xuICAgICAgYWN0aW9uQmFyUmlnaHQgPSAoXG4gICAgICAgIDxBY3Rpb25CYXIgcG9zaXRpb249XCJyaWdodFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtYWN0aW9uYmFyLXJpZ2h0XCI+e3RoaXMucHJvcHMuYWN0aW9uQmFyfTwvZGl2PlxuICAgICAgICAgIHt0aGlzLnByb3BzLmZpbHRlcmluZ1xuICAgICAgICAgICAgJiYgdGhpcy5wcm9wcy5kaXNhYmxlRHJvcGRvd25cbiAgICAgICAgICAgICYmICF0aGlzLnByb3BzLmRpc2FibGVGaWx0ZXJpbmdDb250cm9scyAmJiA8RmlsdGVyaW5nQ29udHJvbHMgey4uLnRoaXMucHJvcHN9IC8+fVxuICAgICAgICAgIHt0aGlzLnByb3BzLmlubGluZUVkaXQgJiYgKFxuICAgICAgICAgICAgPElubGluZUVkaXRDb250cm9sc1xuICAgICAgICAgICAgICBhZnRlckFkZEl0ZW09e3RoaXMuaGFuZGxlQWZ0ZXJBZGRJdGVtfVxuICAgICAgICAgICAgICBhZnRlckVkaXRQcmVzcz17dGhpcy5oYW5kbGVBZnRlckVkaXRQcmVzc31cbiAgICAgICAgICAgICAgYWZ0ZXJWYWxpZGF0aW9uRXJyb3I9e3RoaXMuaGFuZGxlQWZ0ZXJWYWxpZGF0aW9uRXJyb3J9XG4gICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuICAgICAgICAgIHsodGhpcy5wcm9wcy5kcm9wZG93bk1lbnVJdGVtc1xuICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5yZW1vdmluZ1xuICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5jb2x1bW5TZXR0aW5nc1xuICAgICAgICAgICAgfHwgKHRoaXMucHJvcHMuZmlsdGVyaW5nICYmICF0aGlzLnByb3BzLmRpc2FibGVEcm9wZG93bikpICYmIChcbiAgICAgICAgICAgIDxEcm9wZG93bkNvbnRyb2xzIHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQWN0aW9uQmFyPlxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuYWN0aW9uQmFyTGVmdCB8fCB0aGlzLnByb3BzLmdyaWRIZWFkZXIpIHtcbiAgICAgIGFjdGlvbkJhckxlZnQgPSAoXG4gICAgICAgIDxBY3Rpb25CYXIgcG9zaXRpb249XCJsZWZ0XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1ncmlkaGVhZGVyXCI+e3RoaXMucHJvcHMuZ3JpZEhlYWRlcn08L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWFjdGlvbmJhci1sZWZ0XCI+e3RoaXMucHJvcHMuYWN0aW9uQmFyTGVmdH08L2Rpdj5cbiAgICAgICAgPC9BY3Rpb25CYXI+XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoYWN0aW9uQmFyTGVmdCB8fCBhY3Rpb25CYXJSaWdodCkge1xuICAgICAgYWN0aW9uQmFyID0gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWFjdGlvbmJhci1jb250YWluZXJcIj5cbiAgICAgICAgICB7YWN0aW9uQmFyTGVmdH1cbiAgICAgICAgICB7YWN0aW9uQmFyUmlnaHR9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gICAgbGV0IHJvd3NDb3VudCA9IHRoaXMucHJvcHMucm93c0NvdW50IHx8IHRoaXMucHJvcHMucm93c0NvdW50ID09PSAwXG4gICAgICA/IHRoaXMucHJvcHMucm93c0NvdW50XG4gICAgICA6IHRoaXMucHJvcHMuZGF0YS5zaXplO1xuICAgIGlmICh0aGlzLnByb3BzLmlzQ3JlYXRpbmcpIHJvd3NDb3VudCArPSB0aGlzLnByb3BzLmNyZWF0ZURhdGEuc2l6ZTtcbiAgICBpZiAoIXRoaXMucHJvcHMudmlzaWJsZUNvbHVtbnMuc2l6ZSkgcm93c0NvdW50ID0gMDtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD17YG9jLWRhdGFncmlkLSR7dGhpcy5wcm9wcy5ncmlkLmlkfWB9XG4gICAgICAgIGNsYXNzTmFtZT17Z3JpZENsYXNzTmFtZX1cbiAgICAgICAgc3R5bGU9e3RoaXMucHJvcHMuY29udGFpbmVyU3R5bGV9XG4gICAgICA+XG4gICAgICAgIHt0aGlzLnByb3BzLmlzQnVzeSAmJiA8U3Bpbm5lciAvPn1cbiAgICAgICAge3RoaXMuc3RhdGUuY29udGV4dE1lbnVPcGVuICYmIChcbiAgICAgICAgICA8Q29udGV4dE1lbnVcbiAgICAgICAgICAgIHg9e3RoaXMuc3RhdGUuY29udGV4dE1lbnVYfVxuICAgICAgICAgICAgeT17dGhpcy5zdGF0ZS5jb250ZXh0TWVudVl9XG4gICAgICAgICAgICBpc1Zpc2libGU9e3RoaXMuc3RhdGUuY29udGV4dE1lbnVPcGVufVxuICAgICAgICAgICAgY29udGV4dE1lbnVJdGVtcz17dGhpcy5wcm9wcy5jb250ZXh0TWVudUl0ZW1zfVxuICAgICAgICAgICAgZGF0YT17dGhpcy5wcm9wcy5kYXRhfVxuICAgICAgICAgICAgZ3JpZD17dGhpcy5wcm9wcy5ncmlkfVxuICAgICAgICAgICAgc2VsZWN0ZWRJdGVtcz17dGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zfVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICAgIHthY3Rpb25CYXJ9XG4gICAgICAgIDxSZXNwb25zaXZlRml4ZWREYXRhVGFibGVcbiAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICBpZD17dGhpcy5wcm9wcy5ncmlkLmlkfVxuICAgICAgICAgIHJvd3NDb3VudD17cm93c0NvdW50fVxuICAgICAgICAgIGhlYWRlckhlaWdodD17XG4gICAgICAgICAgICAodGhpcy5wcm9wcy5maWx0ZXJpbmcgJiYgdGhpcy5wcm9wcy5pc0ZpbHRlcmluZylcbiAgICAgICAgICAgICAgPyB0aGlzLnByb3BzLmhlYWRlckhlaWdodCArIHRoaXMucHJvcHMuZmlsdGVyUm93SGVpZ2h0XG4gICAgICAgICAgICAgIDogdGhpcy5wcm9wcy5oZWFkZXJIZWlnaHRcbiAgICAgICAgICB9XG4gICAgICAgICAgcm93SGVpZ2h0PXt0aGlzLnByb3BzLnJvd0hlaWdodH1cbiAgICAgICAgICBvbkNvbHVtblJlc2l6ZUVuZENhbGxiYWNrPXt0aGlzLm9uQ29sdW1uUmVzaXplRW5kQ2FsbGJhY2t9XG4gICAgICAgICAgaXNDb2x1bW5SZXNpemluZz17ZmFsc2V9XG4gICAgICAgICAgb25Sb3dDbGljaz17dGhpcy5oYW5kbGVSb3dDbGlja31cbiAgICAgICAgICBzY3JvbGxUb0NvbHVtbj17dGhpcy5wcm9wcy5zY3JvbGxUb0NvbHVtbiB8fCB0aGlzLnN0YXRlLmN1cnJlbnRDb2x1bW59XG4gICAgICAgICAgc2Nyb2xsVG9wPXt0aGlzLnByb3BzLnNjcm9sbFRvcH1cbiAgICAgICAgICBzY3JvbGxUb1Jvdz17dGhpcy5nZXRTY3JvbGxUb1JvdygpfVxuICAgICAgICAgIG9uUm93RG91YmxlQ2xpY2s9e3RoaXMucHJvcHMub25Sb3dEb3VibGVDbGlja31cbiAgICAgICAgICBvblJvd01vdXNlRG93bj17dGhpcy5wcm9wcy5vbk1vdXNlRG93bn1cbiAgICAgICAgICBvblJvd01vdXNlRW50ZXI9e3RoaXMucHJvcHMub25Sb3dNb3VzZUVudGVyfVxuICAgICAgICAgIG9uUm93TW91c2VMZWF2ZT17dGhpcy5wcm9wcy5vblJvd01vdXNlTGVhdmV9XG4gICAgICAgICAgb25TY3JvbGxTdGFydD17dGhpcy5wcm9wcy5vblNjcm9sbFN0YXJ0fVxuICAgICAgICAgIG9uU2Nyb2xsRW5kPXt0aGlzLnByb3BzLm9uU2Nyb2xsRW5kfVxuICAgICAgICAgIHJvd0NsYXNzTmFtZUdldHRlcj17dGhpcy5nZXRSb3dDbGFzc05hbWV9XG4gICAgICAgICAgcm93SGVpZ2h0R2V0dGVyPXt0aGlzLnByb3BzLnJvd0hlaWdodEdldHRlciAmJiB0aGlzLmhhbmRsZVJvd0hlaWdodEdldHRlcn1cbiAgICAgICAgICBvbkNvbnRlbnRIZWlnaHRDaGFuZ2U9e3RoaXMucHJvcHMub25Db250ZW50SGVpZ2h0Q2hhbmdlfVxuICAgICAgICAgIG9uUm93Q29udGV4dE1lbnU9e3RoaXMuaGFuZGxlQ29udGV4dE1lbnV9XG4gICAgICAgID5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJDb2x1bW5zKCl9XG4gICAgICAgIDwvUmVzcG9uc2l2ZUZpeGVkRGF0YVRhYmxlPlxuICAgICAgICB7dGhpcy5wcm9wcy5pc0NvbHVtblNldHRpbmdzTW9kYWxPcGVuICYmIChcbiAgICAgICAgICA8Q29sdW1uU2V0dGluZ3NNb2RhbFxuICAgICAgICAgICAgZ3JpZD17dGhpcy5wcm9wcy5ncmlkfVxuICAgICAgICAgICAgY29sdW1ucz17dGhpcy5wcm9wcy5jb2x1bW5zfVxuICAgICAgICAgICAgdmlzaWJsZUNvbHVtbnM9e3RoaXMucHJvcHMudmlzaWJsZUNvbHVtbnN9XG4gICAgICAgICAgICBjbG9zZUNvbHVtblNldHRpbmdzTW9kYWw9e3RoaXMucHJvcHMuY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsfVxuICAgICAgICAgICAgc2F2ZUNvbHVtblNldHRpbmdzPXt0aGlzLnByb3BzLnNhdmVDb2x1bW5TZXR0aW5nc31cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRGF0YUdyaWQ7XG4iXX0=