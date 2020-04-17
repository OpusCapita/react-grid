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
var DataGrid = (_dec = connect(mapStateToProps, mapDispatchToProps), pagination(_class = injectIntl(_class = _dec(_class = (_temp = _class2 = /*#__PURE__*/function (_React$PureComponent) {
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
            return /*#__PURE__*/React.createElement("div", {
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
          header: showSelectAllCheckbox && /*#__PURE__*/React.createElement(Checkbox, {
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
            return /*#__PURE__*/React.createElement(Checkbox, {
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
            return col.isRequired ? /*#__PURE__*/React.createElement(M, {
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
            return /*#__PURE__*/React.createElement(Icon, {
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
          return /*#__PURE__*/React.createElement(Cell, _extends({}, props, {
            className: className,
            style: col.style,
            onClick: _this.handleCellSelect(cellType, rowIndex, props.columnKey)
          }), /*#__PURE__*/React.createElement(CellTooltip, {
            id: "ocDatagridCell-" + grid.id + "-" + props.columnKey + "-" + rowIndex,
            isEdited: isEdited,
            isError: !!messageData.errorMessage,
            isWarning: !!messageData.warningMessage,
            infoMessage: messageData.infoMessage,
            errorMessage: messageData.errorMessage,
            warningMessage: messageData.warningMessage
          }, cell));
        }

        return /*#__PURE__*/React.createElement(Cell, _extends({}, props, {
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
        return /*#__PURE__*/React.createElement(Column, {
          columnKey: "dataEmptyColumn",
          header: /*#__PURE__*/React.createElement(Cell, {
            style: {
              textAlign: 'center'
            }
          }, /*#__PURE__*/React.createElement(M, {
            id: "Grid.NoItems"
          })),
          width: 10,
          isResizable: false,
          flexGrow: 1
        });
      }

      if (!visibleColumns.size) {
        if (isBusy) {
          return /*#__PURE__*/React.createElement(Column, {
            columnKey: "dataEmptyColumn",
            header: /*#__PURE__*/React.createElement(Cell, null, "\xA0"),
            width: 10,
            isResizable: false,
            flexGrow: 1
          });
        }

        return /*#__PURE__*/React.createElement(Column, {
          columnKey: "dataEmptyColumn",
          header: /*#__PURE__*/React.createElement(Cell, {
            style: {
              textAlign: 'center'
            }
          }, /*#__PURE__*/React.createElement(M, {
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
        return /*#__PURE__*/React.createElement(Column, {
          key: col.columnKey,
          columnKey: col.columnKey,
          header: /*#__PURE__*/React.createElement(HeaderCell, {
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
      actionBarRight = /*#__PURE__*/React.createElement(ActionBar, {
        position: "right"
      }, /*#__PURE__*/React.createElement("div", {
        className: "oc-datagrid-actionbar-right"
      }, this.props.actionBar), this.props.filtering && this.props.disableDropdown && !this.props.disableFilteringControls && /*#__PURE__*/React.createElement(FilteringControls, this.props), this.props.inlineEdit && /*#__PURE__*/React.createElement(InlineEditControls, _extends({
        afterAddItem: this.handleAfterAddItem,
        afterEditPress: this.handleAfterEditPress,
        afterValidationError: this.handleAfterValidationError
      }, this.props)), (this.props.dropdownMenuItems || this.props.removing || this.props.columnSettings || this.props.filtering && !this.props.disableDropdown) && /*#__PURE__*/React.createElement(DropdownControls, this.props));
    }

    if (this.props.actionBarLeft || this.props.gridHeader) {
      actionBarLeft = /*#__PURE__*/React.createElement(ActionBar, {
        position: "left"
      }, /*#__PURE__*/React.createElement("div", {
        className: "oc-datagrid-gridheader"
      }, this.props.gridHeader), /*#__PURE__*/React.createElement("div", {
        className: "oc-datagrid-actionbar-left"
      }, this.props.actionBarLeft));
    }

    if (actionBarLeft || actionBarRight) {
      actionBar = /*#__PURE__*/React.createElement("div", {
        className: "oc-datagrid-actionbar-container"
      }, actionBarLeft, actionBarRight);
    }

    var rowsCount = this.props.rowsCount || this.props.rowsCount === 0 ? this.props.rowsCount : this.props.data.size;
    if (this.props.isCreating) rowsCount += this.props.createData.size;
    if (!this.props.visibleColumns.size) rowsCount = 0;
    return /*#__PURE__*/React.createElement("div", {
      id: "oc-datagrid-" + this.props.grid.id,
      className: gridClassName,
      style: this.props.containerStyle
    }, this.props.isBusy && /*#__PURE__*/React.createElement(Spinner, null), this.state.contextMenuOpen && /*#__PURE__*/React.createElement(ContextMenu, {
      x: this.state.contextMenuX,
      y: this.state.contextMenuY,
      isVisible: this.state.contextMenuOpen,
      contextMenuItems: this.props.contextMenuItems,
      data: this.props.data,
      grid: this.props.grid,
      selectedItems: this.props.selectedItems
    }), actionBar, /*#__PURE__*/React.createElement(ResponsiveFixedDataTable, _extends({}, this.props, {
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
    }), this.renderColumns()), this.props.isColumnSettingsModalOpen && /*#__PURE__*/React.createElement(ColumnSettingsModal, {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiTWFwIiwiTGlzdCIsImNvbm5lY3QiLCJpbmplY3RJbnRsIiwiRm9ybWF0dGVkTWVzc2FnZSIsIk0iLCJDb2x1bW4iLCJDZWxsIiwiY2xhc3NOYW1lcyIsIkljb24iLCJTcGlubmVyIiwiQ2hlY2tib3giLCJSZXNwb25zaXZlRml4ZWREYXRhVGFibGUiLCJIZWFkZXJDZWxsIiwiQWN0aW9uQmFyIiwiSW5saW5lRWRpdENvbnRyb2xzIiwiRmlsdGVyaW5nQ29udHJvbHMiLCJEcm9wZG93bkNvbnRyb2xzIiwiZGF0YWdyaWRBY3Rpb25zIiwiQ2VsbFRvb2x0aXAiLCJDb2x1bW5TZXR0aW5nc01vZGFsIiwicHJvcFR5cGVzIiwiZGVmYXVsdFByb3BzIiwiS0VZX0NPREVTIiwicGFnaW5hdGlvbiIsIkNvbnRleHRNZW51IiwiVXRpbHMiLCJHcmlkQ29sdW1uU2VydmljZSIsIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwib3duUHJvcHMiLCJHUklEIiwiZ3JpZCIsImlzQnVzeSIsImRhdGFncmlkIiwiZ2V0SW4iLCJpZCIsImlzRWRpdGluZyIsImlzQ3JlYXRpbmciLCJpc0ZpbHRlcmluZyIsImlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW4iLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwidmlzaWJsZUNvbHVtbnMiLCJjb2x1bW5XaWR0aHMiLCJzZWxlY3RlZENlbGwiLCJzZWxlY3RlZEl0ZW1zIiwiZGF0YSIsImVkaXREYXRhIiwiY3JlYXRlRGF0YSIsImZpbHRlckRhdGEiLCJjZWxsTWVzc2FnZXMiLCJjcmVhdGVDZWxsTWVzc2FnZXMiLCJhbGxEYXRhU2l6ZSIsInNpemUiLCJsYW5ndWFnZSIsImdldExhbmd1YWdlIiwidXNlciIsInJlZ2lvbiIsImdldFJlZ2lvbiIsImRhdGVGb3JtYXQiLCJnZXREYXRlRm9ybWF0IiwidGhvdXNhbmRTZXBhcmF0b3IiLCJnZXRUaG91c2FuZFNlcGFyYXRvciIsImRlY2ltYWxTZXBhcmF0b3IiLCJnZXREZWNpbWFsU2VwYXJhdG9yIiwiZm9yY2VSZWZyZXNoVGltZXN0YW1wIiwiZ2V0IiwiZm9jdXNUeXBlIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwiRGF0YUdyaWQiLCJwcm9wcyIsImNvbnRleHRNZW51SXRlbXMiLCJzZXRTdGF0ZSIsImNvbnRleHRNZW51T3BlbiIsImRvY3VtZW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIm9uRG9jdW1lbnRDbGljayIsIm5ld0NvbHVtbldpZHRoIiwiY29sdW1uS2V5IiwicmVzaXplQ29sdW1uIiwicm93SW5kZXgiLCJjb2wiLCJlIiwiY3JlYXRlIiwiZW5hYmxlQXJyb3dOYXZpZ2F0aW9uIiwiY2VsbFJlZnMiLCJjcmVhdGVDZWxsUmVmcyIsImFycm93S2V5cyIsIkRPV04iLCJVUCIsIkxFRlQiLCJSSUdIVCIsImNvbHVtbnMiLCJvbkxhc3RDZWxsVGFiUHJlc3MiLCJncmlkQ29sdW1ucyIsImdldENvbHVtbktleUJ5SW5kZXgiLCJpIiwiZ2V0Q29sdW1uS2V5Iiwicm93c1NpemUiLCJjdXJyZW50Q2VsbCIsInByb3h5IiwiaXNDdXJzb3JBdFN0YXJ0IiwidHlwZSIsInNlbGVjdGlvblN0YXJ0IiwiaXNDdXJzb3JBdEVuZCIsInNlbGVjdGlvbkVuZCIsInZhbHVlIiwibGVuZ3RoIiwic2VsZWN0UmVmIiwic2VsZWN0IiwiZ2V0U2VsZWN0UmVmIiwiaW5jbHVkZXMiLCJrZXlDb2RlIiwicHJldmVudERlZmF1bHQiLCJFTlRFUiIsIkVTQyIsImFkZE5ld0l0ZW0iLCJnZXRDb2x1bW5EZWZhdWx0VmFsdWVzIiwiZm9jdXNUb0NyZWF0ZUNlbGwiLCJuZXh0RWxlbWVudCIsIm1lbnVJc09wZW4iLCJtb3ZlQ2VsbEZvY3VzIiwiVEFCIiwiY29sdW1uSW5kIiwiZmluZEluZGV4IiwiYyIsInZhbHVlS2V5UGF0aCIsImpvaW4iLCJkaXNhYmxlZCIsInJvd0luZCIsInNoaWZ0S2V5Iiwib25DZWxsS2V5RG93biIsInZhbHVlUGFyc2VyIiwiZXZlbnRPckRhdGEiLCJyYXdWYWx1ZSIsInRhcmdldCIsInVuZGVmaW5lZCIsImZpbHRlckNlbGxWYWx1ZUNoYW5nZSIsInNlbGVjdGVkRmlsdGVycyIsImNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSIsImNvbXBvbmVudFR5cGUiLCJvbkNyZWF0ZVZhbHVlQ2hhbmdlIiwib25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUiLCJtYXRjaFZhbHVlIiwib25DcmVhdGVDZWxsVmFsdWVDaGFuZ2UiLCJuZXdWYWx1ZUtleVBhdGgiLCJ2IiwibmV3VmFsdWUiLCJ2YWxpZGF0b3JzIiwiY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUiLCJlZGl0Q2VsbFZhbHVlQ2hhbmdlIiwiZGF0YUlkIiwiZ2V0RGF0YUlkQnlSb3dJbmRleCIsIm9uRWRpdFZhbHVlQ2hhbmdlIiwib25FZGl0Q2VsbFZhbHVlQ2hhbmdlIiwiZWRpdENlbGxWYWx1ZVZhbGlkYXRlIiwic2VwYXJhdG9yIiwiUmVnRXhwIiwiZ2V0Q3JlYXRlSXRlbVZhbHVlIiwibnVtZXJpY1ZhbHVlIiwiTnVtYmVyIiwicmVwbGFjZSIsImdldFJlZ0V4IiwidmFsdWVPcHRpb25zIiwib25DcmVhdGVCbHVyIiwiZ2V0RWRpdEl0ZW1WYWx1ZSIsIm9uRWRpdEJsdXIiLCJjZWxsVHlwZSIsImlucHV0VHlwZSIsImNlbGxTZWxlY3Rpb25DaGFuZ2UiLCJjZWxsU2VsZWN0IiwiY29tcG9uZW50IiwiaW5wdXRSZWYiLCJpZEtleVBhdGgiLCJpbmRleCIsIm9wdGlvbnMiLCJlZGl0VmFsdWUiLCJvcmlnaW5hbFZhbHVlIiwic2VsZWN0T3B0aW9ucyIsImZpbmQiLCJvYmoiLCJTdHJpbmciLCJ2YWwiLCJ0b0pTIiwibW9kZSIsImNvbXBvbmVudERpc2FibGVkIiwiZGlzYWJsZUVkaXRpbmciLCJkaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaCIsIm1hdGNoVmFsdWVLZXlQYXRoIiwicm93Q2xhc3NOYW1lcyIsImV4dHJhUm93Q291bnQiLCJwdXNoIiwiaW5kZXhPZiIsInJvd0NsYXNzTmFtZUdldHRlciIsInJldHVybkRhdGEiLCJpbmZvTWVzc2FnZSIsImVycm9yTWVzc2FnZSIsIndhcm5pbmdNZXNzYWdlIiwic2Nyb2xsVG9Sb3ciLCJzY3JvbGxOZXdSb3ciLCJzY3JvbGxJbkVkaXRNb2RlIiwiY3VycmVudFJvdyIsImdldFNlbGVjdGVkSXRlbUluZGV4IiwiZmlyc3QiLCJmb2N1c1RvIiwicHJldkZvY3VzVG8iLCJmb2N1c1RvTGFzdFJvdyIsInJlZiIsImZvY3VzIiwiZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZSIsImZvY3VzVG9FZGl0Q2VsbCIsInNlbGVjdGVkUm93SW5kZXgiLCJjb2x1bW5JbmRleCIsImVsZW1lbnRUeXBlcyIsImN1cnJlbnRDb2x1bW4iLCJzZXRUaW1lb3V0Iiwic2VsZWN0QWxsSXRlbXNDaGFuZ2UiLCJpbmxpbmVFZGl0IiwiZmlsdGVyaW5nIiwiaW50bCIsInNlbGVjdENvbXBvbmVudE9wdGlvbnMiLCJleHRyYUNvbHVtbiIsInJvd1NlbGVjdENoZWNrYm94Q29sdW1uIiwic2hvd1NlbGVjdEFsbENoZWNrYm94IiwidGFiSW5kZXgiLCJ3aWR0aCIsImlzUmVzaXphYmxlIiwiaXNTb3J0YWJsZSIsImNlbGwiLCJ2YWx1ZVJlbmRlciIsImNlbGxFZGl0IiwiY2VsbENyZWF0ZSIsImNlbGxGaWx0ZXIiLCJoZWFkZXIiLCJoYW5kbGVTZWxlY3RBbGxDaGVja0JveE9uQ2hhbmdlIiwicm93SXRlbSIsIml0ZW1JZCIsInNlbGVjdGVkIiwiaGFuZGxlU2VsZWN0aW9uQ2hlY2tCb3hPbkNoYW5nZSIsImZvckVhY2giLCJ2aXNpYmxlQ29sdW1uS2V5Iiwib3JnQ29sIiwidmFsdWVFbXB0eUNoZWNrZXIiLCJnZXRWYWx1ZUVtcHR5Q2hlY2tlciIsImZvcm1hdCIsImlzUmVxdWlyZWQiLCJjb2x1bW4iLCJiYXNlQ29sdW1uIiwiY29sdW1uRnVuY3Rpb25zIiwiZWRpdCIsImdldEl0ZW1WYWx1ZSIsIm9uQ2VsbFZhbHVlQ2hhbmdlIiwib25DZWxsQmx1ciIsIm9uRWRpdENlbGxCbHVyIiwib25DZWxsRm9jdXMiLCJvbkVkaXRDZWxsS2V5RG93biIsImhhbmRsZUNlbGxSZWYiLCJoYW5kbGVFZGl0Q2VsbFJlZiIsIm9uQ3JlYXRlQ2VsbEJsdXIiLCJvbkNyZWF0ZUNlbGxLZXlEb3duIiwiaGFuZGxlQ3JlYXRlQ2VsbFJlZiIsImZpbHRlciIsImdldEZpbHRlckl0ZW1WYWx1ZSIsImdldEl0ZW1NdWx0aVZhbHVlIiwiZ2V0RmlsdGVySXRlbU11bHRpVmFsdWUiLCJvbkZpbHRlckNlbGxWYWx1ZUNoYW5nZSIsIm9uQ2VsbE11bHRpVmFsdWVCbHVyIiwib25GaWx0ZXJDZWxsTXVsdGlWYWx1ZUJsdXIiLCJvbkNlbGxNdWx0aVZhbHVlQ2hhbmdlIiwib25GaWx0ZXJDZWxsTXVsdGlWYWx1ZUNoYW5nZSIsImNlbGxQcm9wcyIsImNvbHVtbkNlbGwiLCJjb21wb25lbnRUeXBlUHJvcHMiLCJjb2x1bW5Db21wb25lbnRUeXBlIiwicGFkZGluZyIsInJlbW92ZU5ld0l0ZW0iLCJmb2N1c1RvRXJyb3JDZWxsIiwiY3RybEtleSIsImdldFNlbGVjdGlvbiIsInJlbW92ZUFsbFJhbmdlcyIsInBhcmVudE5vZGUiLCJwYXJlbnQxY2xhc3MiLCJjbGFzc05hbWUiLCJwYXJlbnQyY2xhc3MiLCJwYXJlbnQzY2xhc3MiLCJwYXJlbnQ0Y2xhc3MiLCJyb3dTZWxlY3QiLCJpdGVtU2VsZWN0aW9uQ2hhbmdlIiwibXVsdGlTZWxlY3QiLCJvblJvd0NsaWNrIiwic3RvcFByb3BhZ2F0aW9uIiwiY29udGV4dE1lbnVYIiwiY2xpZW50WCIsImNvbnRleHRNZW51WSIsImNsaWVudFkiLCJhZGRFdmVudExpc3RlbmVyIiwicm93SGVpZ2h0R2V0dGVyIiwiZXhpc3RpbmdSb3dzSW5kZXgiLCJpc1NwZWNpYWwiLCJnZXRSb3dJbmRleCIsIm1lc3NhZ2VEYXRhIiwiZ2V0Q2VsbE1lc3NhZ2VzIiwiaXNFZGl0ZWQiLCJpc0NlbGxFZGl0ZWQiLCJzdHlsZSIsImhhbmRsZUNlbGxTZWxlY3QiLCJ0ZXh0QWxpZ24iLCJnZW5lcmF0ZUNvbHVtbnMiLCJsZW5naHQiLCJtYXAiLCJzb3J0Q2hhbmdlIiwicmVuZGVyQ2VsbCIsIm1pbldpZHRoIiwibWF4V2lkdGgiLCJmbGV4R3JvdyIsImZpeGVkIiwiZml4ZWRSaWdodCIsImFsbG93Q2VsbHNSZWN5Y2xpbmciLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImludmFsaWRhdGUiLCJyZW5kZXIiLCJncmlkQ2xhc3NOYW1lIiwiZGlzYWJsZUFjdGlvbkJhciIsInNldEZvY3VzVG8iLCJhY3Rpb25CYXIiLCJhY3Rpb25CYXJSaWdodCIsImFjdGlvbkJhckxlZnQiLCJyZW1vdmluZyIsImRpc2FibGVEcm9wZG93biIsImRpc2FibGVGaWx0ZXJpbmdDb250cm9scyIsImhhbmRsZUFmdGVyQWRkSXRlbSIsImhhbmRsZUFmdGVyRWRpdFByZXNzIiwiaGFuZGxlQWZ0ZXJWYWxpZGF0aW9uRXJyb3IiLCJkcm9wZG93bk1lbnVJdGVtcyIsImNvbHVtblNldHRpbmdzIiwiZ3JpZEhlYWRlciIsInJvd3NDb3VudCIsImNvbnRhaW5lclN0eWxlIiwiaGVhZGVySGVpZ2h0IiwiZmlsdGVyUm93SGVpZ2h0Iiwicm93SGVpZ2h0Iiwib25Db2x1bW5SZXNpemVFbmRDYWxsYmFjayIsImhhbmRsZVJvd0NsaWNrIiwic2Nyb2xsVG9Db2x1bW4iLCJzY3JvbGxUb3AiLCJnZXRTY3JvbGxUb1JvdyIsIm9uUm93RG91YmxlQ2xpY2siLCJvbk1vdXNlRG93biIsIm9uUm93TW91c2VFbnRlciIsIm9uUm93TW91c2VMZWF2ZSIsIm9uU2Nyb2xsU3RhcnQiLCJvblNjcm9sbEVuZCIsImdldFJvd0NsYXNzTmFtZSIsImhhbmRsZVJvd0hlaWdodEdldHRlciIsIm9uQ29udGVudEhlaWdodENoYW5nZSIsImhhbmRsZUNvbnRleHRNZW51IiwicmVuZGVyQ29sdW1ucyIsImNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbCIsInNhdmVDb2x1bW5TZXR0aW5ncyIs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TUFBQSx3QkFBd0IsRUFBRSxLQUFLNEIsS0FBTCxDQUFXK1Isd0JBSnZDO0FBS0UsTUFBQSxrQkFBa0IsRUFBRSxLQUFLL1IsS0FBTCxDQUFXZ1M7QUFMakMsTUFoREosRUF3REcsS0FBS2hTLEtBQUwsQ0FBV2lTLFFBeERkLENBREY7QUE0REQsRzs7O0VBcDBDb0J6VyxLQUFLLENBQUMwVyxhLDRDQUdMblYsWTtBQW8wQ3hCLGVBQWVnRCxRQUFmIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcHJlZmVyLWRlc3RydWN0dXJpbmcgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLWxvbmVseS1pZiwgcHJlZmVyLXRlbXBsYXRlLCByZWFjdC9yZXF1aXJlLWRlZmF1bHQtcHJvcHMgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBNYXAsIExpc3QgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IGluamVjdEludGwsIEZvcm1hdHRlZE1lc3NhZ2UgYXMgTSB9IGZyb20gJ3JlYWN0LWludGwnO1xuaW1wb3J0IHsgQ29sdW1uLCBDZWxsIH0gZnJvbSAnZml4ZWQtZGF0YS10YWJsZS0yJztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHsgSWNvbiB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWljb25zJztcbmltcG9ydCBTcGlubmVyIGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXNwaW5uZXInO1xuaW1wb3J0IENoZWNrYm94IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWNoZWNrYm94JztcbmltcG9ydCAnZml4ZWQtZGF0YS10YWJsZS0yL2Rpc3QvZml4ZWQtZGF0YS10YWJsZS5jc3MnO1xuXG5pbXBvcnQgUmVzcG9uc2l2ZUZpeGVkRGF0YVRhYmxlIGZyb20gJy4vcmVzcG9uc2l2ZS1maXhlZC1kYXRhLXRhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgSGVhZGVyQ2VsbCBmcm9tICcuL2hlYWRlci1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgQWN0aW9uQmFyIGZyb20gJy4vYWN0aW9uLWJhci5jb21wb25lbnQnO1xuaW1wb3J0IElubGluZUVkaXRDb250cm9scyBmcm9tICcuL2lubGluZS1lZGl0LWNvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgRmlsdGVyaW5nQ29udHJvbHMgZnJvbSAnLi9maWx0ZXJpbmctY29udHJvbHMuY29tcG9uZW50JztcbmltcG9ydCBEcm9wZG93bkNvbnRyb2xzIGZyb20gJy4vZHJvcGRvd24tY29udHJvbHMuY29tcG9uZW50JztcbmltcG9ydCAqIGFzIGRhdGFncmlkQWN0aW9ucyBmcm9tICcuL2RhdGFncmlkLmFjdGlvbnMnO1xuaW1wb3J0IENlbGxUb29sdGlwIGZyb20gJy4vY2VsbC10b29sdGlwLmNvbXBvbmVudCc7XG5pbXBvcnQgQ29sdW1uU2V0dGluZ3NNb2RhbCBmcm9tICcuL2NvbHVtbi1zZXR0aW5ncy9jb2x1bW4tc2V0dGluZ3MuY29tcG9uZW50JztcbmltcG9ydCB7IHByb3BUeXBlcywgZGVmYXVsdFByb3BzIH0gZnJvbSAnLi9kYXRhZ3JpZC5wcm9wcyc7XG5pbXBvcnQgeyBLRVlfQ09ERVMgfSBmcm9tICcuL2RhdGFncmlkLmNvbnN0YW50cyc7XG5pbXBvcnQgcGFnaW5hdGlvbiBmcm9tICcuL3BhZ2luYXRpb24uY29tcG9uZW50JztcbmltcG9ydCBDb250ZXh0TWVudSBmcm9tICcuL2NvbnRleHQtbWVudS5jb21wb25lbnQnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4vZGF0YWdyaWQudXRpbHMnO1xuaW1wb3J0IEdyaWRDb2x1bW5TZXJ2aWNlIGZyb20gJy4vY29sdW1uLXNlcnZpY2UvY29sdW1uLXNlcnZpY2UnO1xuaW1wb3J0ICcuL2RhdGFncmlkLmNvbXBvbmVudC5zY3NzJztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlLCBvd25Qcm9wcykgPT4ge1xuICBjb25zdCBHUklEID0gb3duUHJvcHMuZ3JpZDtcbiAgcmV0dXJuIHtcbiAgICBpc0J1c3k6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdpc0J1c3knXSwgdHJ1ZSksXG4gICAgaXNFZGl0aW5nOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnaXNFZGl0aW5nJ10sIGZhbHNlKSxcbiAgICBpc0NyZWF0aW5nOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnaXNDcmVhdGluZyddLCBmYWxzZSksXG4gICAgaXNGaWx0ZXJpbmc6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnaXNGaWx0ZXJpbmcnXSwgZmFsc2UpLFxuICAgIGlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW46IHN0YXRlLmRhdGFncmlkLmdldEluKFxuICAgICAgW0dSSUQuaWQsICdzZXNzaW9uJywgJ2NvbHVtblNldHRpbmdzTW9kYWwnLCAnb3BlbiddLFxuICAgICAgZmFsc2UsXG4gICAgKSxcbiAgICBzb3J0Q29sdW1uOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdzb3J0aW5nRGF0YScsICdzb3J0Q29sdW1uJ10sIG51bGwpLFxuICAgIHNvcnRPcmRlcjogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnc29ydGluZ0RhdGEnLCAnc29ydE9yZGVyJ10sIG51bGwpLFxuICAgIHZpc2libGVDb2x1bW5zOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICd2aXNpYmxlQ29sdW1ucyddLCBMaXN0KCkpLFxuICAgIGNvbHVtbldpZHRoczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnY29sdW1uV2lkdGhzJ10sIE1hcCgpKSxcbiAgICBzZWxlY3RlZENlbGw6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2VsZWN0ZWRDZWxsJ10sIE1hcCgpKSxcbiAgICBzZWxlY3RlZEl0ZW1zOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3NlbGVjdGVkSXRlbXMnXSwgTGlzdCgpKSxcbiAgICBkYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2RhdGEnXSwgTGlzdCgpKSxcbiAgICBlZGl0RGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdlZGl0RGF0YSddLCBNYXAoKSksXG4gICAgY3JlYXRlRGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjcmVhdGVEYXRhJ10sIExpc3QoKSksXG4gICAgZmlsdGVyRGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdmaWx0ZXJEYXRhJ10sIE1hcCgpKSxcbiAgICBjZWxsTWVzc2FnZXM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY2VsbE1lc3NhZ2VzJ10sIE1hcCgpKSxcbiAgICBjcmVhdGVDZWxsTWVzc2FnZXM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY3JlYXRlQ2VsbE1lc3NhZ2VzJ10sIE1hcCgpKSxcbiAgICBhbGxEYXRhU2l6ZTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdhbGxEYXRhJ10sIExpc3QoKSkuc2l6ZSxcbiAgICBsYW5ndWFnZTogVXRpbHMuZ2V0TGFuZ3VhZ2UoR1JJRCwgc3RhdGUudXNlciksXG4gICAgcmVnaW9uOiBVdGlscy5nZXRSZWdpb24oR1JJRCwgc3RhdGUudXNlciksXG4gICAgZGF0ZUZvcm1hdDogVXRpbHMuZ2V0RGF0ZUZvcm1hdChHUklELCBzdGF0ZS51c2VyKSxcbiAgICB0aG91c2FuZFNlcGFyYXRvcjogVXRpbHMuZ2V0VGhvdXNhbmRTZXBhcmF0b3IoR1JJRCwgc3RhdGUudXNlciksXG4gICAgZGVjaW1hbFNlcGFyYXRvcjogVXRpbHMuZ2V0RGVjaW1hbFNlcGFyYXRvcihHUklELCBzdGF0ZS51c2VyKSxcbiAgICBmb3JjZVJlZnJlc2hUaW1lc3RhbXA6IHN0YXRlLmRhdGFncmlkLmdldCgnZm9yY2VSZWZyZXNoJywgMCksIC8vIGZvcmNlIHJlLXJlbmRlciB3aGVuIGNoYW5nZWRcbiAgICBmb2N1c1R5cGU6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdmb2N1c1R5cGUnXSwgTWFwKCkpLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGF0YWdyaWRBY3Rpb25zO1xuXG5AcGFnaW5hdGlvblxuQGluamVjdEludGxcbkBjb25uZWN0KFxuICBtYXBTdGF0ZVRvUHJvcHMsXG4gIG1hcERpc3BhdGNoVG9Qcm9wcyxcbilcbmNsYXNzIERhdGFHcmlkIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSBwcm9wVHlwZXM7XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY3VycmVudFJvdzogMCxcbiAgICAgIGN1cnJlbnRDb2x1bW46IDAsXG4gICAgICBjb250ZXh0TWVudU9wZW46IGZhbHNlLFxuICAgICAgY29udGV4dE1lbnVYOiAwLFxuICAgICAgY29udGV4dE1lbnVZOiAwLFxuICAgIH07XG4gICAgdGhpcy5jZWxsUmVmcyA9IHt9O1xuICAgIHRoaXMuY3JlYXRlQ2VsbFJlZnMgPSB7fTtcbiAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsID0gZmFsc2U7XG4gICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTsgLy8gVE9ETzogSGFuZGxlIGZvY3VzaW5nIHdoZW4gdHJ1ZVxuICAgIHRoaXMuZm9jdXNUb0Vycm9yQ2VsbCA9IGZhbHNlOyAvLyBUT0RPOiBIYW5kbGUgZm9jdXNpbmcgd2hlbiB0cnVlXG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25Eb2N1bWVudENsaWNrKTtcbiAgICB0aGlzLnByb3BzLmludmFsaWRhdGUodGhpcy5wcm9wcy5ncmlkKTtcbiAgfVxuXG4gIG9uRG9jdW1lbnRDbGljayA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5jb250ZXh0TWVudUl0ZW1zKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY29udGV4dE1lbnVPcGVuOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25Eb2N1bWVudENsaWNrKTtcbiAgfTtcblxuICBvbkNvbHVtblJlc2l6ZUVuZENhbGxiYWNrID0gKG5ld0NvbHVtbldpZHRoLCBjb2x1bW5LZXkpID0+IHtcbiAgICB0aGlzLnByb3BzLnJlc2l6ZUNvbHVtbih0aGlzLnByb3BzLmdyaWQsIGNvbHVtbktleSwgbmV3Q29sdW1uV2lkdGgpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gcm93SW5kZXggKGludClcbiAgICogQHBhcmFtIGNvbCAob2JqKS4gQ29sdW1uIG9iamVjdC5cbiAgICogQHBhcmFtIGUuIE9yaWdpbmFsIEtleURvd24gZXZlbnRcbiAgICogQHBhcmFtIGNyZWF0ZSAoYm9vbCkuIElzIHRoZSBjZWxsIGNyZWF0ZSBjZWxsIG9yIGVkaXQgY2VsbD9cbiAgICovXG4gIG9uQ2VsbEtleURvd24gPSAocm93SW5kZXgsIGNvbCwgZSwgY3JlYXRlID0gZmFsc2UpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5lbmFibGVBcnJvd05hdmlnYXRpb24pIHtcbiAgICAgIGNvbnN0IGNlbGxSZWZzID0gY3JlYXRlID8gdGhpcy5jcmVhdGVDZWxsUmVmcyA6IHRoaXMuY2VsbFJlZnM7XG4gICAgICBjb25zdCBhcnJvd0tleXMgPSBbS0VZX0NPREVTLkRPV04sIEtFWV9DT0RFUy5VUCwgS0VZX0NPREVTLkxFRlQsIEtFWV9DT0RFUy5SSUdIVF07XG4gICAgICBjb25zdCB7XG4gICAgICAgIGNvbHVtbnMsIHZpc2libGVDb2x1bW5zLCBncmlkLCBkYXRhLCBjcmVhdGVEYXRhLCBvbkxhc3RDZWxsVGFiUHJlc3MsXG4gICAgICB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IGdyaWRDb2x1bW5zID0gVXRpbHMudmlzaWJsZUNvbHVtbnMoY29sdW1ucywgdmlzaWJsZUNvbHVtbnMpO1xuICAgICAgY29uc3QgZ2V0Q29sdW1uS2V5QnlJbmRleCA9IGkgPT4gVXRpbHMuZ2V0Q29sdW1uS2V5KGdyaWRDb2x1bW5zW2ldKTtcbiAgICAgIGNvbnN0IHJvd3NTaXplID0gY3JlYXRlID8gY3JlYXRlRGF0YS5zaXplIDogZGF0YS5zaXplO1xuICAgICAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCk7XG4gICAgICBsZXQgY3VycmVudENlbGwgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2NvbHVtbktleX1fJHtyb3dJbmRleH1gXTtcbiAgICAgIGxldCBwcm94eSA9IG51bGw7XG5cbiAgICAgIGNvbnN0IGlzQ3Vyc29yQXRTdGFydCA9ICgpID0+IHtcbiAgICAgICAgaWYgKGN1cnJlbnRDZWxsLnR5cGUgIT09ICd0ZXh0JykgcmV0dXJuIHRydWU7XG4gICAgICAgIHJldHVybiBjdXJyZW50Q2VsbC5zZWxlY3Rpb25TdGFydCA9PT0gMDtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGlzQ3Vyc29yQXRFbmQgPSAoKSA9PiB7XG4gICAgICAgIGlmIChjdXJyZW50Q2VsbC50eXBlICE9PSAndGV4dCcpIHJldHVybiB0cnVlO1xuICAgICAgICByZXR1cm4gY3VycmVudENlbGwuc2VsZWN0aW9uRW5kID09PSBjdXJyZW50Q2VsbC52YWx1ZS5sZW5ndGg7XG4gICAgICB9O1xuXG4gICAgICAvLyBJZiBjdXJyZW50IGNlbGwgaG9sZHMgYSByZWFjdC1mbG9hdGluZy1zZWxlY3QgY29tcG9uZW50XG4gICAgICBpZiAoY3VycmVudENlbGwgJiYgKGN1cnJlbnRDZWxsLnNlbGVjdFJlZiB8fCB0eXBlb2YgY3VycmVudENlbGwuc2VsZWN0ID09PSAnb2JqZWN0JykpIHtcbiAgICAgICAgcHJveHkgPSBjdXJyZW50Q2VsbDtcbiAgICAgICAgY3VycmVudENlbGwgPSB0aGlzLmdldFNlbGVjdFJlZihwcm94eSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFByZXZlbnRzIHVwL2Rvd24gYXJyb3cgZnJvbSBjaGFuZ2luZyBudW1iZXIgZmllbGQgdmFsdWVcbiAgICAgIGlmIChhcnJvd0tleXMuaW5jbHVkZXMoZS5rZXlDb2RlKSAmJiBjdXJyZW50Q2VsbC50eXBlID09PSAnbnVtYmVyJykgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuRU5URVI6XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLkVTQzoge1xuICAgICAgICAgIGlmIChjcmVhdGUgJiYgZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuRU5URVIpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuYWRkTmV3SXRlbShncmlkLCBVdGlscy5nZXRDb2x1bW5EZWZhdWx0VmFsdWVzKGNvbHVtbnMpKTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGN1cnJlbnRDZWxsLnNlbGVjdCgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLkRPV046IHtcbiAgICAgICAgICBsZXQgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2NvbHVtbktleX1fJHtyb3dJbmRleCArIDF9YF07XG5cbiAgICAgICAgICAvLyBQcmV2ZW50cyBtZW51IGZyb20gb3BlbmluZ1xuICAgICAgICAgIGlmIChwcm94eSAmJiBwcm94eS5zZWxlY3RSZWYgJiYgIXByb3h5LnNlbGVjdFJlZi5zdGF0ZS5tZW51SXNPcGVuKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAoIW5leHRFbGVtZW50KSBicmVhaztcbiAgICAgICAgICAgIG5leHRFbGVtZW50ID0gdGhpcy5nZXRTZWxlY3RSZWYobmV4dEVsZW1lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm1vdmVDZWxsRm9jdXMobmV4dEVsZW1lbnQsIHJvd0luZGV4ICsgMSwgLTEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLlVQOiB7XG4gICAgICAgICAgbGV0IG5leHRFbGVtZW50ID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtjb2x1bW5LZXl9XyR7cm93SW5kZXggLSAxfWBdO1xuXG4gICAgICAgICAgLy8gUHJldmVudHMgbWVudSBmcm9tIG9wZW5pbmdcbiAgICAgICAgICBpZiAocHJveHkgJiYgcHJveHkuc2VsZWN0UmVmICYmICFwcm94eS5zZWxlY3RSZWYuc3RhdGUubWVudUlzT3Blbikge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKCFuZXh0RWxlbWVudCkgYnJlYWs7XG4gICAgICAgICAgICBuZXh0RWxlbWVudCA9IHRoaXMuZ2V0U2VsZWN0UmVmKG5leHRFbGVtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5tb3ZlQ2VsbEZvY3VzKG5leHRFbGVtZW50LCByb3dJbmRleCAtIDEsIC0xKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5UQUI6XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLlJJR0hUOlxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5MRUZUOiB7XG4gICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLlJJR0hUICYmICFpc0N1cnNvckF0RW5kKCkpIGJyZWFrO1xuICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5MRUZUICYmICFpc0N1cnNvckF0U3RhcnQoKSkgYnJlYWs7XG5cbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICBsZXQgY29sdW1uSW5kID0gZ3JpZENvbHVtbnMuZmluZEluZGV4KGMgPT4gYy52YWx1ZUtleVBhdGguam9pbignLycpID09PSBjb2x1bW5LZXkpO1xuICAgICAgICAgIGlmIChjb2x1bW5JbmQgIT09IC0xKSB7XG4gICAgICAgICAgICBsZXQgZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgbGV0IG5leHRFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIGxldCByb3dJbmQgPSByb3dJbmRleDtcbiAgICAgICAgICAgIHdoaWxlIChkaXNhYmxlZCAmJiByb3dJbmQgPD0gcm93c1NpemUpIHtcbiAgICAgICAgICAgICAgLy8gTW92aW5nIHRvIHRoZSBsZWZ0XG4gICAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5MRUZUIHx8IChlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5UQUIgJiYgZS5zaGlmdEtleSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29sdW1uSW5kIC0gMSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgLT0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJvd0luZCAtIDEgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kID0gZ3JpZENvbHVtbnMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAgIHJvd0luZCAtPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gTW92aW5nIHRvIHRoZSByaWdodFxuICAgICAgICAgICAgICAgIGlmIChjb2x1bW5JbmQgKyAxIDwgZ3JpZENvbHVtbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgKz0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJvd0luZCArIDEgPCByb3dzU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kID0gMDtcbiAgICAgICAgICAgICAgICAgIHJvd0luZCArPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm93SW5kICsgMSA9PT0gcm93c1NpemUpIHtcbiAgICAgICAgICAgICAgICAgIC8vIElmIHRyeWluZyB0byBzZWxlY3QgYSByb3csIHdoZW4gdGhlcmUgaXMgbm9uZTpcbiAgICAgICAgICAgICAgICAgIGlmIChvbkxhc3RDZWxsVGFiUHJlc3MgJiYgZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuVEFCKSBvbkxhc3RDZWxsVGFiUHJlc3MoZSk7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Z2V0Q29sdW1uS2V5QnlJbmRleChjb2x1bW5JbmQpfV8ke3Jvd0luZH1gXTtcblxuICAgICAgICAgICAgICAvLyBJZiB3ZSBjYW5ub3QgZm9jdXMgb24gdGhlIG5leHQgZWxlbWVudCB3aGlsZSBtb3ZpbmcgdG8gdGhlIHJpZ2h0XG4gICAgICAgICAgICAgIGlmICghbmV4dEVsZW1lbnQgJiYgZS5rZXlDb2RlICE9PSBLRVlfQ09ERVMuTEVGVCkge1xuICAgICAgICAgICAgICAgIC8vIElmIHdlJ3JlIG5vdCB5ZXQgaW4gdGhlIGxhc3QgZm9jdXNhYmxlIGNvbHVtblxuICAgICAgICAgICAgICAgIGlmIChjb2x1bW5JbmQgPD0gZ3JpZENvbHVtbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICB3aGlsZSAoY29sdW1uSW5kIDw9IGdyaWRDb2x1bW5zLmxlbmd0aCAmJiAhbmV4dEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2dldENvbHVtbktleUJ5SW5kZXgoY29sdW1uSW5kKX1fJHtyb3dJbmR9YF07XG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCArPSAxO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHdlIGFyZSBpbiB0aGUgbGFzdCBjb2x1bW4gYW5kIHdlIGRvbid0IGhhdmUgYW4gZWxlbWVudCB0byBmb2N1cyBvbixcbiAgICAgICAgICAgICAgICAgICAgLy8gd2UgbXVzdCBtb3ZlIHRvIHRoZSBuZXh0IHJvdyAoaWYgcG9zc2libGUpXG4gICAgICAgICAgICAgICAgICAgIGlmICghbmV4dEVsZW1lbnQgJiYgY29sdW1uSW5kID09PSBncmlkQ29sdW1ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB0cnlpbmcgdG8gc2VsZWN0IGEgcm93LCB3aGVuIHRoZXJlIGlzIG5vbmU6XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHJvd0luZCArIDEgPT09IHJvd3NTaXplKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob25MYXN0Q2VsbFRhYlByZXNzICYmIGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLlRBQikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkxhc3RDZWxsVGFiUHJlc3MoZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgIHJvd0luZCArPSAxO1xuICAgICAgICAgICAgICAgICAgICAgIG5leHRFbGVtZW50ID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtnZXRDb2x1bW5LZXlCeUluZGV4KGNvbHVtbkluZCl9XyR7cm93SW5kfWBdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIElmIHdlIGNhbm5vdCBmb2N1cyBvbiB0aGUgbmV4dCBlbGVtZW50IHdoaWxlIG1vdmluZyB0byB0aGUgbGVmdFxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFuZXh0RWxlbWVudCAmJiBlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5MRUZUKSB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGNvbHVtbkluZCA+IDAgJiYgIW5leHRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgLT0gMTtcbiAgICAgICAgICAgICAgICAgIG5leHRFbGVtZW50ID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtnZXRDb2x1bW5LZXlCeUluZGV4KGNvbHVtbkluZCl9XyR7cm93SW5kfWBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBpZiBubyBlbGVtZW50IHdhcyBmb3VuZCwgdHJ5IG1vdmluZyB0byBwcmV2aW91cyByb3dcbiAgICAgICAgICAgICAgICAvLyAobmVlZGVkIGluIGNhc2UgZmlyc3QgY29sdW1uIGlzIG5vdCBlZGl0YWJsZSBlLmcuIGFuIEV4dHJhQ29sdW1uKVxuICAgICAgICAgICAgICAgIGlmIChyb3dJbmQgPiAwICYmICFuZXh0RWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kID0gZ3JpZENvbHVtbnMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAgIHJvd0luZCAtPSAxO1xuICAgICAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2dldENvbHVtbktleUJ5SW5kZXgoY29sdW1uSW5kKX1fJHtyb3dJbmR9YF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGRpc2FibGVkID0gbmV4dEVsZW1lbnQgPyBuZXh0RWxlbWVudC5kaXNhYmxlZCA6IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFkaXNhYmxlZCAmJiBuZXh0RWxlbWVudCkge1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIG5leHRFbGVtZW50LnNlbGVjdCA9PT0gJ29iamVjdCcgfHwgbmV4dEVsZW1lbnQuc2VsZWN0UmVmKSB7XG4gICAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSB0aGlzLmdldFNlbGVjdFJlZihuZXh0RWxlbWVudCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy5tb3ZlQ2VsbEZvY3VzKG5leHRFbGVtZW50LCByb3dJbmQsIGNvbHVtbkluZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIG9uRWRpdENlbGxLZXlEb3duID0gKHJvd0luZGV4LCBjb2wpID0+IChlKSA9PiB7XG4gICAgdGhpcy5vbkNlbGxLZXlEb3duKHJvd0luZGV4LCBjb2wsIGUpO1xuICB9O1xuXG4gIG9uQ3JlYXRlQ2VsbEtleURvd24gPSAocm93SW5kZXgsIGNvbCkgPT4gKGUpID0+IHtcbiAgICB0aGlzLm9uQ2VsbEtleURvd24ocm93SW5kZXgsIGNvbCwgZSwgdHJ1ZSk7XG4gIH07XG5cbiAgb25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UgPSAoY29sLCB2YWx1ZVBhcnNlcikgPT4gKGV2ZW50T3JEYXRhKSA9PiB7XG4gICAgbGV0IHJhd1ZhbHVlO1xuICAgIC8vIGV2ZW50T3JEYXRhIGNhbiBiZSBpbnB1dCBvbkNoYW5nZSBldmVudCwgcmVhY3Qtc2VsZWN0IG9uQ2hhbmdlIG9yIHJlYWN0LWRheS1waWNrZXIgb25DaGFuZ2VcbiAgICBpZiAoZXZlbnRPckRhdGEpIHtcbiAgICAgIGlmIChldmVudE9yRGF0YS50YXJnZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnRPckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSB2YWx1ZVBhcnNlcihyYXdWYWx1ZSk7XG4gICAgdGhpcy5wcm9wcy5maWx0ZXJDZWxsVmFsdWVDaGFuZ2UodGhpcy5wcm9wcy5ncmlkLCB0aGlzLnByb3BzLmNvbHVtbnMsIGNvbCwgdmFsdWUpO1xuICB9O1xuXG4gIG9uRmlsdGVyQ2VsbE11bHRpVmFsdWVCbHVyID0gY29sID0+ICgpID0+IHtcbiAgICBjb25zdCBjb2x1bW5LZXkgPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sKTtcbiAgICBjb25zdCB7IGNvbHVtbnMsIGZpbHRlckNlbGxWYWx1ZUNoYW5nZSwgZ3JpZCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzZWxlY3RlZEZpbHRlcnMgPSB0aGlzLnN0YXRlW2NvbHVtbktleV07XG4gICAgaWYgKHNlbGVjdGVkRmlsdGVycykge1xuICAgICAgZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlKGdyaWQsIGNvbHVtbnMsIGNvbCwgc2VsZWN0ZWRGaWx0ZXJzKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBbY29sdW1uS2V5XTogdW5kZWZpbmVkIH0pO1xuICAgIH1cbiAgfTtcblxuICBvbkZpbHRlckNlbGxNdWx0aVZhbHVlQ2hhbmdlID0gKGNvbCwgdmFsdWVQYXJzZXIpID0+IChkYXRhID0gW10pID0+IHtcbiAgICAvLyBkYXRhIGlzIGlucHV0IG9mIHJlYWN0LXNlbGVjdCBvbkNoYW5nZVxuICAgIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2wpO1xuICAgIGNvbnN0IHNlbGVjdGVkRmlsdGVycyA9IHRoaXMuc3RhdGVbY29sdW1uS2V5XTtcbiAgICBpZiAoIXNlbGVjdGVkRmlsdGVycyAmJiBkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgLy8gZW5kcyB1cCBoZXJlIGluIGNhc2Ugb2YgY2xlYXIgYnV0dG9uXG4gICAgICBjb25zdCB7IGNvbHVtbnMsIGZpbHRlckNlbGxWYWx1ZUNoYW5nZSwgZ3JpZCB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGZpbHRlckNlbGxWYWx1ZUNoYW5nZShncmlkLCBjb2x1bW5zLCBjb2wsIGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHZhbHVlUGFyc2VyKGRhdGEpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IFtjb2x1bW5LZXldOiB2YWx1ZSB9KTtcbiAgICB9XG4gIH07XG5cbiAgb25DcmVhdGVDZWxsVmFsdWVDaGFuZ2UgPSAocm93SW5kZXgsIGNvbCwgdmFsdWVQYXJzZXIpID0+IChldmVudE9yRGF0YSkgPT4ge1xuICAgIGNvbnN0IHsgY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlLCBncmlkIH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCByYXdWYWx1ZTtcbiAgICAvLyBldmVudE9yRGF0YSBjYW4gYmUgaW5wdXQgb25DaGFuZ2UgZXZlbnQsIHJlYWN0LXNlbGVjdCBvbkNoYW5nZSBvciByZWFjdC1kYXktcGlja2VyIG9uQ2hhbmdlXG4gICAgaWYgKGV2ZW50T3JEYXRhKSB7XG4gICAgICBpZiAoZXZlbnRPckRhdGEudGFyZ2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YS50YXJnZXQudmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50T3JEYXRhLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YS52YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGE7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlID0gdmFsdWVQYXJzZXIocmF3VmFsdWUpO1xuXG4gICAgY29uc3QgeyBjb21wb25lbnRUeXBlIH0gPSBjb2w7XG4gICAgc3dpdGNoIChjb21wb25lbnRUeXBlKSB7XG4gICAgICBjYXNlICdjdXJyZW5jeSc6XG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAndGV4dCc6IHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGNyZWF0ZUNlbGxWYWx1ZUNoYW5nZShncmlkLCByb3dJbmRleCwgY29sLnZhbHVlS2V5UGF0aCwgdmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNvbC5vbkNyZWF0ZVZhbHVlQ2hhbmdlKSB7XG4gICAgICBjb2wub25DcmVhdGVWYWx1ZUNoYW5nZSh2YWx1ZSwgY29sLnZhbHVlS2V5UGF0aCwgcm93SW5kZXgpO1xuICAgIH1cbiAgICBpZiAoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlICYmIHZhbHVlID09PSBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubWF0Y2hWYWx1ZSkge1xuICAgICAgLy8gQ2FsbCBzcGVjaWFsIHBhaXJlZCB2YWx1ZSBjaGFuZ2Ugb24gb3RoZXIgY2VsbCBpZiB2YWx1ZSBtYXRjaGVzXG4gICAgICB0aGlzLm9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlKFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgeyB2YWx1ZUtleVBhdGg6IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5uZXdWYWx1ZUtleVBhdGggfSxcbiAgICAgICAgdiA9PiB2LFxuICAgICAgKShjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY29sLnZhbGlkYXRvcnMpIHtcbiAgICAgIHRoaXMucHJvcHMuY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUoXG4gICAgICAgIHRoaXMucHJvcHMuZ3JpZCxcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIGNvbC52YWx1ZUtleVBhdGgsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBjb2wudmFsaWRhdG9ycyxcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIG9uRWRpdENlbGxWYWx1ZUNoYW5nZSA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGV2ZW50T3JEYXRhKSA9PiB7XG4gICAgY29uc3QgeyBlZGl0Q2VsbFZhbHVlQ2hhbmdlLCBncmlkIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGRhdGFJZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgbGV0IHJhd1ZhbHVlO1xuICAgIC8vIGV2ZW50T3JEYXRhIGNhbiBiZSBpbnB1dCBvbkNoYW5nZSBldmVudCwgcmVhY3Qtc2VsZWN0IG9uQ2hhbmdlIG9yIHJlYWN0LWRheS1waWNrZXIgb25DaGFuZ2VcbiAgICBpZiAoZXZlbnRPckRhdGEpIHtcbiAgICAgIGlmIChldmVudE9yRGF0YS50YXJnZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnRPckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSB2YWx1ZVBhcnNlcihyYXdWYWx1ZSk7XG4gICAgY29uc3QgeyBjb21wb25lbnRUeXBlIH0gPSBjb2w7XG4gICAgc3dpdGNoIChjb21wb25lbnRUeXBlKSB7XG4gICAgICBjYXNlICdjdXJyZW5jeSc6XG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAndGV4dCc6IHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGVkaXRDZWxsVmFsdWVDaGFuZ2UoZ3JpZCwgZGF0YUlkLCBjb2wudmFsdWVLZXlQYXRoLCB2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY29sLm9uRWRpdFZhbHVlQ2hhbmdlKSB7XG4gICAgICBjb2wub25FZGl0VmFsdWVDaGFuZ2UodmFsdWUsIGNvbC52YWx1ZUtleVBhdGgsIHJvd0luZGV4LCBkYXRhSWQpO1xuICAgIH1cbiAgICBpZiAoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlICYmIHZhbHVlID09PSBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubWF0Y2hWYWx1ZSkge1xuICAgICAgLy8gQ2FsbCBzcGVjaWFsIHBhaXJlZCB2YWx1ZSBjaGFuZ2Ugb24gb3RoZXIgY2VsbCBpZiB2YWx1ZSBtYXRjaGVzXG4gICAgICB0aGlzLm9uRWRpdENlbGxWYWx1ZUNoYW5nZShcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIHsgdmFsdWVLZXlQYXRoOiBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWVLZXlQYXRoIH0sXG4gICAgICAgIHYgPT4gdixcbiAgICAgICkoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm5ld1ZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNvbC52YWxpZGF0b3JzKSB7XG4gICAgICB0aGlzLnByb3BzLmVkaXRDZWxsVmFsdWVWYWxpZGF0ZShcbiAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICBkYXRhSWQsXG4gICAgICAgIGNvbC52YWx1ZUtleVBhdGgsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBjb2wudmFsaWRhdG9ycyxcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIGdldFJlZ0V4ID0gc2VwYXJhdG9yID0+IChzZXBhcmF0b3IgPyBuZXcgUmVnRXhwKGBcXFxcJHtzZXBhcmF0b3J9YCwgJ2cnKSA6IG5ldyBSZWdFeHAoJ1xcXFxzJywgJ2cnKSk7XG5cbiAgb25DcmVhdGVDZWxsQmx1ciA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGV2ZW50T3JEYXRhKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGVjaW1hbFNlcGFyYXRvciwgY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlLCBncmlkLCB0aG91c2FuZFNlcGFyYXRvcixcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IGNvbXBvbmVudFR5cGUgfSA9IGNvbDtcbiAgICBsZXQgdmFsdWU7XG4gICAgLy8gZXZlbnRPckRhdGEgY2FuIGJlIGZvcm1hdHRlZC1pbnB1dCwgcmVhY3Qtc2VsZWN0LCByZWFjdC1jaGVja2JveCBvciByZWFjdC1kYXktcGlja2VyXG4gICAgLy8gb25DaGFuZ2UgZXZlbnRcbiAgICBpZiAoZXZlbnRPckRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGV2ZW50T3JEYXRhICYmIGV2ZW50T3JEYXRhLnRhcmdldCAmJiBldmVudE9yRGF0YS50YXJnZXQudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YWx1ZSA9IGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnRPckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YWx1ZSA9IGV2ZW50T3JEYXRhLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBldmVudE9yRGF0YTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgPSB0aGlzLmdldENyZWF0ZUl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKTtcbiAgICB9XG4gICAgc3dpdGNoIChjb21wb25lbnRUeXBlKSB7XG4gICAgICBjYXNlICdjdXJyZW5jeSc6IHtcbiAgICAgICAgY29uc3QgbnVtZXJpY1ZhbHVlID0gdmFsdWVcbiAgICAgICAgICA/IE51bWJlcih2YWx1ZS5yZXBsYWNlKHRoaXMuZ2V0UmVnRXgoKGNvbC52YWx1ZU9wdGlvbnMgJiYgY29sLnZhbHVlT3B0aW9ucy50aG91c2FuZFNlcGFyYXRvcikgfHwgdGhvdXNhbmRTZXBhcmF0b3IpLCAnJylcbiAgICAgICAgICAgIC5yZXBsYWNlKHRoaXMuZ2V0UmVnRXgoKGNvbC52YWx1ZU9wdGlvbnMgJiYgY29sLnZhbHVlT3B0aW9ucy5kZWNpbWFsU2VwYXJhdG9yKSB8fCBkZWNpbWFsU2VwYXJhdG9yKSwgJy4nKSlcbiAgICAgICAgICA6IHZhbHVlO1xuICAgICAgICBpZiAobnVtZXJpY1ZhbHVlICE9PSB0aGlzLmdldENyZWF0ZUl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKSkge1xuICAgICAgICAgIGNyZWF0ZUNlbGxWYWx1ZUNoYW5nZShncmlkLCByb3dJbmRleCwgY29sLnZhbHVlS2V5UGF0aCwgbnVtZXJpY1ZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICd0ZXh0Jzoge1xuICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMuZ2V0Q3JlYXRlSXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpKSB7XG4gICAgICAgICAgY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlKGdyaWQsIHJvd0luZGV4LCBjb2wudmFsdWVLZXlQYXRoLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjb2wub25DcmVhdGVCbHVyKSB7XG4gICAgICBpZiAodmFsdWVQYXJzZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlUGFyc2VyKHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGNvbC5vbkNyZWF0ZUJsdXIodmFsdWUsIHJvd0luZGV4KTtcbiAgICB9XG4gIH07XG5cbiAgb25FZGl0Q2VsbEJsdXIgPSAocm93SW5kZXgsIGNvbCwgdmFsdWVQYXJzZXIpID0+IChldmVudE9yRGF0YSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGRlY2ltYWxTZXBhcmF0b3IsIGVkaXRDZWxsVmFsdWVDaGFuZ2UsIGdyaWQsIHRob3VzYW5kU2VwYXJhdG9yLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgY29tcG9uZW50VHlwZSB9ID0gY29sO1xuICAgIGNvbnN0IGRhdGFJZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgbGV0IHZhbHVlO1xuICAgIC8vIGV2ZW50T3JEYXRhIGNhbiBiZSBmb3JtYXR0ZWQtaW5wdXQsIHJlYWN0LXNlbGVjdCwgcmVhY3QtY2hlY2tib3ggb3IgcmVhY3QtZGF5LXBpY2tlclxuICAgIC8vIG9uQ2hhbmdlIGV2ZW50XG4gICAgaWYgKGV2ZW50T3JEYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChldmVudE9yRGF0YSAmJiBldmVudE9yRGF0YS50YXJnZXQgJiYgZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsdWUgPSBldmVudE9yRGF0YS50YXJnZXQudmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50T3JEYXRhLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsdWUgPSBldmVudE9yRGF0YS52YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gZXZlbnRPckRhdGE7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlID0gdGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpO1xuICAgIH1cbiAgICBzd2l0Y2ggKGNvbXBvbmVudFR5cGUpIHtcbiAgICAgIGNhc2UgJ2N1cnJlbmN5Jzoge1xuICAgICAgICBjb25zdCBudW1lcmljVmFsdWUgPSB2YWx1ZVxuICAgICAgICAgID8gTnVtYmVyKHZhbHVlLnJlcGxhY2UodGhpcy5nZXRSZWdFeCgoY29sLnZhbHVlT3B0aW9ucyAmJiBjb2wudmFsdWVPcHRpb25zLnRob3VzYW5kU2VwYXJhdG9yKSB8fCB0aG91c2FuZFNlcGFyYXRvciksICcnKVxuICAgICAgICAgICAgLnJlcGxhY2UodGhpcy5nZXRSZWdFeCgoY29sLnZhbHVlT3B0aW9ucyAmJiBjb2wudmFsdWVPcHRpb25zLmRlY2ltYWxTZXBhcmF0b3IpIHx8IGRlY2ltYWxTZXBhcmF0b3IpLCAnLicpKVxuICAgICAgICAgIDogdmFsdWU7XG4gICAgICAgIGlmIChudW1lcmljVmFsdWUgIT09IHRoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKSkge1xuICAgICAgICAgIGVkaXRDZWxsVmFsdWVDaGFuZ2UoZ3JpZCwgZGF0YUlkLCBjb2wudmFsdWVLZXlQYXRoLCBudW1lcmljVmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ3RleHQnOiB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpKSB7XG4gICAgICAgICAgZWRpdENlbGxWYWx1ZUNoYW5nZShncmlkLCBkYXRhSWQsIGNvbC52YWx1ZUtleVBhdGgsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNvbC5vbkVkaXRCbHVyKSB7XG4gICAgICBpZiAodmFsdWVQYXJzZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlUGFyc2VyKHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGNvbC5vbkVkaXRCbHVyKHZhbHVlLCByb3dJbmRleCwgZGF0YUlkKTtcbiAgICB9XG4gIH07XG5cbiAgb25DZWxsRm9jdXMgPSAoY2VsbFR5cGUsIGlucHV0VHlwZSwgcm93SW5kZXgsIGNvbHVtbktleSkgPT4gKGUpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBjZWxsU2VsZWN0aW9uQ2hhbmdlLCBjZWxsU2VsZWN0LCBncmlkLCBpc0VkaXRpbmcsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKGlzRWRpdGluZykgcmV0dXJuO1xuXG4gICAgaWYgKGlucHV0VHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIGUudGFyZ2V0LnNlbGVjdCgpO1xuICAgIH1cbiAgICBpZiAoY2VsbFR5cGUgPT09ICdlZGl0JyAmJiBjZWxsU2VsZWN0KSB7XG4gICAgICBjZWxsU2VsZWN0aW9uQ2hhbmdlKFxuICAgICAgICBncmlkLFxuICAgICAgICBNYXAoe1xuICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgIGNvbHVtbktleSxcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICBnZXRTZWxlY3RSZWYgPSAoY29tcG9uZW50KSA9PiB7XG4gICAgaWYgKCFjb21wb25lbnQpIHJldHVybiBudWxsO1xuICAgIGlmIChjb21wb25lbnQuc2VsZWN0ICYmIGNvbXBvbmVudC5zZWxlY3QuaW5wdXRSZWYpIHtcbiAgICAgIHJldHVybiBjb21wb25lbnQuc2VsZWN0LmlucHV0UmVmO1xuICAgIH1cbiAgICBpZiAoY29tcG9uZW50LnNlbGVjdCAmJiBjb21wb25lbnQuc2VsZWN0LnNlbGVjdCkge1xuICAgICAgcmV0dXJuIGNvbXBvbmVudC5zZWxlY3Quc2VsZWN0LmlucHV0UmVmO1xuICAgIH1cbiAgICBpZiAoY29tcG9uZW50LnNlbGVjdFJlZiAmJiBjb21wb25lbnQuc2VsZWN0UmVmLnNlbGVjdC5zZWxlY3QpIHtcbiAgICAgIHJldHVybiBjb21wb25lbnQuc2VsZWN0UmVmLnNlbGVjdC5zZWxlY3QuaW5wdXRSZWY7XG4gICAgfVxuICAgIHJldHVybiBjb21wb25lbnQuc2VsZWN0UmVmLnNlbGVjdC5pbnB1dFJlZjtcbiAgfTtcblxuICBnZXREYXRhSWRCeVJvd0luZGV4ID0gcm93SW5kZXggPT4gdGhpcy5wcm9wcy5kYXRhLmdldEluKFtyb3dJbmRleCwgLi4udGhpcy5wcm9wcy5ncmlkLmlkS2V5UGF0aF0pO1xuXG4gIGdldFNlbGVjdGVkSXRlbUluZGV4ID0gKGlkKSA9PiB7XG4gICAgaWYgKCFpZCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMucHJvcHMuZGF0YS5maW5kSW5kZXgodiA9PiB2LmdldEluKHRoaXMucHJvcHMuZ3JpZC5pZEtleVBhdGgpID09PSBpZCk7XG4gICAgcmV0dXJuIGluZGV4ID09PSAtMSA/IHVuZGVmaW5lZCA6IGluZGV4O1xuICB9O1xuXG4gIGdldEVkaXRJdGVtVmFsdWUgPSAocm93SW5kZXgsIGNvbCwgb3B0aW9ucyA9IFtdKSA9PiB7XG4gICAgLy8gR2V0IHRoZSB2YWx1ZSB0byBkaXNwbGF5IGluIGVkaXQgY2VsbFxuICAgIGNvbnN0IGlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICBjb25zdCBlZGl0VmFsdWUgPSB0aGlzLnByb3BzLmVkaXREYXRhLmdldEluKFtpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0sIHVuZGVmaW5lZCk7XG4gICAgbGV0IG9yaWdpbmFsVmFsdWU7XG4gICAgaWYgKGVkaXRWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBvcmlnaW5hbFZhbHVlID0gdGhpcy5wcm9wcy5kYXRhLmdldEluKFtyb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0sICcnKTtcbiAgICB9IGVsc2UgaWYgKGVkaXRWYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBWYWx1ZSBpcyBmb3VuZCBmcm9tIGVkaXREYXRhXG4gICAgICAvLyBGb3JtYXQgYnkgdHlwZVxuICAgICAgc3dpdGNoIChjb2wuY29tcG9uZW50VHlwZSkge1xuICAgICAgICBjYXNlICdtdWx0aXNlbGVjdCc6XG4gICAgICAgIGNhc2UgJ3NlbGVjdCc6XG4gICAgICAgICAgcmV0dXJuIG9wdGlvbnMuc2VsZWN0T3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IGVkaXRWYWx1ZSk7XG4gICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICAgIHJldHVybiBvcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gZWRpdFZhbHVlKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gZWRpdFZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAob3JpZ2luYWxWYWx1ZSA9PT0gbnVsbCB8fCBvcmlnaW5hbFZhbHVlID09PSB1bmRlZmluZWQgfHwgb3JpZ2luYWxWYWx1ZSA9PT0gJycpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgLy8gUmV0dXJuIHZhbHVlIGZyb20gb3JpZ2luYWwgZGF0YSwgYmVjYXVzZSBlZGl0RGF0YSBpcyBub3QgYXZhaWxhYmxlXG4gICAgLy8gRm9ybWF0IGJ5IGNvbXBvbmVudCB0eXBlXG4gICAgc3dpdGNoIChjb2wuY29tcG9uZW50VHlwZSkge1xuICAgICAgY2FzZSAnZmxvYXQnOiB7XG4gICAgICAgIGlmIChTdHJpbmcob3JpZ2luYWxWYWx1ZSkubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHJldHVybiBTdHJpbmcob3JpZ2luYWxWYWx1ZSkucmVwbGFjZSgnLicsIHRoaXMucHJvcHMuZGVjaW1hbFNlcGFyYXRvcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9yaWdpbmFsVmFsdWU7XG4gICAgICB9XG4gICAgICBjYXNlICdtdWx0aXNlbGVjdCc6XG4gICAgICBjYXNlICdzZWxlY3QnOlxuICAgICAgICByZXR1cm4gb3B0aW9ucy5zZWxlY3RPcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gb3JpZ2luYWxWYWx1ZSk7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSBvcmlnaW5hbFZhbHVlKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBvcmlnaW5hbFZhbHVlO1xuICAgIH1cbiAgfTtcblxuICBnZXRDcmVhdGVJdGVtVmFsdWUgPSAocm93SW5kZXgsIGNvbCwgb3B0aW9ucyA9IFtdKSA9PiB7XG4gICAgY29uc3QgdmFsID0gdGhpcy5wcm9wcy5jcmVhdGVEYXRhLmdldEluKFtyb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0sICcnKTtcbiAgICBpZiAodmFsID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGlmIChjb2wuY29tcG9uZW50VHlwZSA9PT0gJ3NlbGVjdCcgfHwgY29sLmNvbXBvbmVudFR5cGUgPT09ICdtdWx0aXNlbGVjdCcpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLnNlbGVjdE9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSB2YWwpO1xuICAgIH1cbiAgICBpZiAoWydib29sZWFuJ10uaW5jbHVkZXMoY29sLmNvbXBvbmVudFR5cGUpKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IHZhbCk7XG4gICAgfVxuICAgIHJldHVybiB2YWw7XG4gIH07XG5cbiAgZ2V0RmlsdGVySXRlbVZhbHVlID0gKGNvbCwgb3B0aW9ucyA9IFtdKSA9PiB7XG4gICAgY29uc3QgdmFsID0gdGhpcy5wcm9wcy5maWx0ZXJEYXRhLmdldChVdGlscy5nZXRDb2x1bW5LZXkoY29sKSwgJycpO1xuICAgIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgaWYgKGNvbC5jb21wb25lbnRUeXBlID09PSAnc2VsZWN0Jykge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuc2VsZWN0T3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IHZhbCk7XG4gICAgfVxuICAgIGlmIChbJ2NoZWNrYm94JywgJ2Jvb2xlYW4nXS5pbmNsdWRlcyhjb2wuY29tcG9uZW50VHlwZSkpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gdmFsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsO1xuICB9O1xuXG4gIGdldEZpbHRlckl0ZW1NdWx0aVZhbHVlID0gKGNvbCkgPT4ge1xuICAgIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2wpO1xuICAgIGNvbnN0IHsgZmlsdGVyRGF0YSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBkYXRhID0gdGhpcy5zdGF0ZVtjb2x1bW5LZXldO1xuICAgIGNvbnN0IHZhbCA9IGRhdGEgfHwgZmlsdGVyRGF0YS5nZXQoY29sdW1uS2V5LCAnJyk7XG4gICAgLy8gc2Vzc2lvbiBzdG9yYWdlIGNvbnRlbnQgaXMgY29udmVydGVkIHRvIGltbXV0YWJsZSBhbmQgbXVsdGlzZWxlY3RcbiAgICAvLyBmaWx0ZXJzIGlzIHRoZW4gbGlzdCBvdGhlcndpc2UgYXJyYXlcbiAgICByZXR1cm4gdmFsICYmIHZhbC50b0pTID8gdmFsLnRvSlMoKSA6IHZhbCB8fCBbXTtcbiAgfTtcblxuICBnZXRDb21wb25lbnREaXNhYmxlZFN0YXRlID0gKHJvd0luZGV4LCBjb2wsIG1vZGUpID0+IHtcbiAgICBsZXQgY29tcG9uZW50RGlzYWJsZWQgPSAhIWNvbC5kaXNhYmxlRWRpdGluZztcbiAgICAvLyBjaGVjayBpZiBjb21wb25lbnQgaXMgZGlzYWJsZWQgYnkgb3RoZXIgY29sdW1uIGRhdGFcbiAgICBpZiAoIWNvbXBvbmVudERpc2FibGVkICYmIGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaCkge1xuICAgICAgaWYgKG1vZGUgPT09ICdjcmVhdGUnKSB7XG4gICAgICAgIGNvbXBvbmVudERpc2FibGVkID0gdGhpcy5nZXRDcmVhdGVJdGVtVmFsdWUocm93SW5kZXgsIHtcbiAgICAgICAgICB2YWx1ZUtleVBhdGg6IGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaC5tYXRjaFZhbHVlS2V5UGF0aCxcbiAgICAgICAgfSkgPT09IGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaC5tYXRjaFZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29tcG9uZW50RGlzYWJsZWQgPSB0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIHtcbiAgICAgICAgICB2YWx1ZUtleVBhdGg6IGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaC5tYXRjaFZhbHVlS2V5UGF0aCxcbiAgICAgICAgfSkgPT09IGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaC5tYXRjaFZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29tcG9uZW50RGlzYWJsZWQ7XG4gIH07XG5cbiAgZ2V0Um93Q2xhc3NOYW1lID0gKHJvd0luZGV4KSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZ3JpZCwgaXNDcmVhdGluZywgaXNFZGl0aW5nLCBjcmVhdGVEYXRhLCBzZWxlY3RlZEl0ZW1zLCBkYXRhLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHJvd0NsYXNzTmFtZXMgPSBbJ29jLWRhdGFncmlkLXJvdyddO1xuICAgIGxldCBleHRyYVJvd0NvdW50ID0gMDsgLy8gaG93IG1hbnkgcm93cyB0byBpZ25vcmUgZnJvbSB0b3AsIG5ldyArIGZpbHRlciByb3dzXG4gICAgaWYgKGlzQ3JlYXRpbmcpIGV4dHJhUm93Q291bnQgPSBjcmVhdGVEYXRhLnNpemU7XG4gICAgaWYgKGlzQ3JlYXRpbmcpIHtcbiAgICAgIGlmIChyb3dJbmRleCA8PSBleHRyYVJvd0NvdW50IC0gMSkge1xuICAgICAgICByb3dDbGFzc05hbWVzLnB1c2goJ29jLWRhdGFncmlkLXJvdy1uZXcnKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzRWRpdGluZykge1xuICAgICAgcm93Q2xhc3NOYW1lcy5wdXNoKCdvYy1kYXRhZ3JpZC1yb3ctZWRpdCcpO1xuICAgIH1cblxuICAgIC8vIGNoZWNrIGlmIHJvdyBpcyBzZWxlY3RlZFxuICAgIGlmICghaXNDcmVhdGluZyAmJiAhaXNFZGl0aW5nICYmIChzZWxlY3RlZEl0ZW1zICYmIGdyaWQuaWRLZXlQYXRoKSkge1xuICAgICAgaWYgKHNlbGVjdGVkSXRlbXMuaW5kZXhPZihkYXRhLmdldEluKFtyb3dJbmRleCAtIGV4dHJhUm93Q291bnQsIC4uLmdyaWQuaWRLZXlQYXRoXSkpICE9PSAtMSkge1xuICAgICAgICByb3dDbGFzc05hbWVzLnB1c2goJ2lzLXNlbGVjdGVkJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcHMucm93Q2xhc3NOYW1lR2V0dGVyKSB7XG4gICAgICByZXR1cm4gcm93Q2xhc3NOYW1lcy5qb2luKCcgJykgKyAnICcgKyB0aGlzLnByb3BzLnJvd0NsYXNzTmFtZUdldHRlcihyb3dJbmRleCk7XG4gICAgfVxuICAgIHJldHVybiByb3dDbGFzc05hbWVzLmpvaW4oJyAnKTtcbiAgfTtcblxuICBnZXRDZWxsTWVzc2FnZXMgPSAocm93SW5kZXgsIGNvbCwgY2VsbFR5cGUpID0+IHtcbiAgICBjb25zdCByZXR1cm5EYXRhID0ge307XG4gICAgaWYgKCF0aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoIHx8ICFjb2wudmFsdWVLZXlQYXRoKSB7XG4gICAgICByZXR1cm4gcmV0dXJuRGF0YTtcbiAgICB9XG4gICAgbGV0IGluZm9NZXNzYWdlO1xuICAgIGxldCBlcnJvck1lc3NhZ2U7XG4gICAgbGV0IHdhcm5pbmdNZXNzYWdlO1xuICAgIGlmIChjZWxsVHlwZSA9PT0gJ2NyZWF0ZScpIHtcbiAgICAgIGluZm9NZXNzYWdlID0gdGhpcy5wcm9wcy5jcmVhdGVDZWxsTWVzc2FnZXMuZ2V0SW4oWydpbmZvJywgcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgIGVycm9yTWVzc2FnZSA9IHRoaXMucHJvcHMuY3JlYXRlQ2VsbE1lc3NhZ2VzLmdldEluKFsnZXJyb3InLCByb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgd2FybmluZ01lc3NhZ2UgPSB0aGlzLnByb3BzLmNyZWF0ZUNlbGxNZXNzYWdlcy5nZXRJbihbXG4gICAgICAgICd3YXJuaW5nJyxcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIC4uLmNvbC52YWx1ZUtleVBhdGgsXG4gICAgICBdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgICAgaW5mb01lc3NhZ2UgPSB0aGlzLnByb3BzLmNlbGxNZXNzYWdlcy5nZXRJbihbJ2luZm8nLCBpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgZXJyb3JNZXNzYWdlID0gdGhpcy5wcm9wcy5jZWxsTWVzc2FnZXMuZ2V0SW4oWydlcnJvcicsIGlkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgICB3YXJuaW5nTWVzc2FnZSA9IHRoaXMucHJvcHMuY2VsbE1lc3NhZ2VzLmdldEluKFsnd2FybmluZycsIGlkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgfVxuICAgIGlmIChpbmZvTWVzc2FnZSkge1xuICAgICAgcmV0dXJuRGF0YS5pbmZvTWVzc2FnZSA9IGluZm9NZXNzYWdlO1xuICAgIH1cbiAgICBpZiAoZXJyb3JNZXNzYWdlKSB7XG4gICAgICByZXR1cm5EYXRhLmVycm9yTWVzc2FnZSA9IGVycm9yTWVzc2FnZTtcbiAgICB9XG4gICAgaWYgKHdhcm5pbmdNZXNzYWdlKSB7XG4gICAgICByZXR1cm5EYXRhLndhcm5pbmdNZXNzYWdlID0gd2FybmluZ01lc3NhZ2U7XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5EYXRhO1xuICB9O1xuXG4gIGdldFNjcm9sbFRvUm93ID0gKCkgPT4ge1xuICAgIGxldCBzY3JvbGxUb1JvdztcbiAgICBpZiAodGhpcy5wcm9wcy5pc0NyZWF0aW5nICYmICF0aGlzLmZvY3VzVG9DcmVhdGVDZWxsKSByZXR1cm4gc2Nyb2xsVG9Sb3c7XG4gICAgaWYgKHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwpIHtcbiAgICAgIGNvbnN0IHNjcm9sbE5ld1JvdyA9IHRoaXMucHJvcHMuY3JlYXRlRGF0YS5zaXplIC0gMTtcbiAgICAgIGlmIChzY3JvbGxOZXdSb3cgPj0gMCkge1xuICAgICAgICBzY3JvbGxUb1JvdyA9IHNjcm9sbE5ld1JvdztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMucHJvcHMuaXNFZGl0aW5nICYmICF0aGlzLnByb3BzLnNjcm9sbEluRWRpdE1vZGUpIHtcbiAgICAgICAgc2Nyb2xsVG9Sb3cgPSB0aGlzLnN0YXRlLmN1cnJlbnRSb3c7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzY3JvbGxUb1JvdyA9IHRoaXMucHJvcHMuc2Nyb2xsVG9Sb3c7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIH1cbiAgICAgIGlmIChzY3JvbGxUb1JvdyA9PT0gdW5kZWZpbmVkICYmIHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5zaXplID4gMCkge1xuICAgICAgICBzY3JvbGxUb1JvdyA9IHRoaXMuZ2V0U2VsZWN0ZWRJdGVtSW5kZXgodGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLmZpcnN0KCkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc2Nyb2xsVG9Sb3c7XG4gIH07XG5cbiAgc2V0Rm9jdXNUbyA9IChmb2N1c1RvKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuaXNFZGl0aW5nIHx8IHRoaXMucHJvcHMuaXNDcmVhdGluZykge1xuICAgICAgaWYgKGZvY3VzVG8gJiYgZm9jdXNUby5nZXQoJ3R5cGUnKSAmJiBmb2N1c1RvICE9PSB0aGlzLnByZXZGb2N1c1RvKSB7XG4gICAgICAgIHRoaXNbZm9jdXNUby5nZXQoJ3R5cGUnKV0gPSB0cnVlO1xuICAgICAgICB0aGlzLmZvY3VzVG9MYXN0Um93ID0gZm9jdXNUby5nZXQoJ2ZvY3VzVG9MYXN0Um93Jyk7XG4gICAgICAgIHRoaXMucHJldkZvY3VzVG8gPSBmb2N1c1RvO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBoYW5kbGVDZWxsU2VsZWN0ID0gKGNlbGxUeXBlLCByb3dJbmRleCwgY29sdW1uS2V5KSA9PiAoKSA9PiB7XG4gICAgaWYgKGNlbGxUeXBlID09PSAndmlldycgJiYgdGhpcy5wcm9wcy5jZWxsU2VsZWN0KSB7XG4gICAgICB0aGlzLnByb3BzLmNlbGxTZWxlY3Rpb25DaGFuZ2UoXG4gICAgICAgIHRoaXMucHJvcHMuZ3JpZCxcbiAgICAgICAgTWFwKHtcbiAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICBjb2x1bW5LZXksXG4gICAgICAgIH0pLFxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlQ3JlYXRlQ2VsbFJlZiA9IChyb3dJbmRleCwgY29sKSA9PiAocmVmKSA9PiB7XG4gICAgLy8gRm9jdXMgdG8gY3JlYXRlIGNlbGxcbiAgICBjb25zdCBjb2x1bW5LZXkgPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sKTtcbiAgICBjb25zdCBzZWxlY3RSZWYgPSAhcmVmIHx8IHJlZi5mb2N1cyA/IHJlZiA6IHRoaXMuZ2V0U2VsZWN0UmVmKHJlZik7XG4gICAgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5jcmVhdGVEYXRhLnNpemVcbiAgICAgICYmIHRoaXMucHJvcHMuY3JlYXRlRGF0YS5zaXplID09PSByb3dJbmRleCArIDFcbiAgICAgICYmIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGxcbiAgICAgICYmICF0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2NyZWF0ZScpXG4gICAgICAmJiBzZWxlY3RSZWZcbiAgICApIHtcbiAgICAgIHNlbGVjdFJlZi5mb2N1cygpO1xuICAgICAgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZUFycm93TmF2aWdhdGlvbikge1xuICAgICAgdGhpcy5jcmVhdGVDZWxsUmVmc1tgJHt0aGlzLnByb3BzLmdyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4fWBdID0gcmVmO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVFZGl0Q2VsbFJlZiA9IChyb3dJbmRleCwgY29sKSA9PiAocmVmKSA9PiB7XG4gICAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCk7XG4gICAgaWYgKHRoaXMuZm9jdXNUb0VkaXRDZWxsICYmICF0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2VkaXQnKSkge1xuICAgICAgY29uc3Qgc2VsZWN0ZWRSb3dJbmRleCA9IHRoaXMuZm9jdXNUb0xhc3RSb3cgJiYgdGhpcy5wcm9wcy5kYXRhLnNpemUgPiAwXG4gICAgICAgID8gdGhpcy5wcm9wcy5kYXRhLnNpemUgLSAxXG4gICAgICAgIDogdGhpcy5nZXRTZWxlY3RlZEl0ZW1JbmRleCh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuZmlyc3QoKSk7XG5cbiAgICAgIGNvbnN0IHsgc2VsZWN0ZWRDZWxsIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3Qgc2VsZWN0UmVmID0gIXJlZiB8fCByZWYuZm9jdXMgPyByZWYgOiB0aGlzLmdldFNlbGVjdFJlZihyZWYpO1xuICAgICAgaWYgKHNlbGVjdGVkQ2VsbC5zaXplID4gMCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgc2VsZWN0ZWRDZWxsLmdldCgncm93SW5kZXgnKSA9PT0gcm93SW5kZXhcbiAgICAgICAgICAmJiBzZWxlY3RlZENlbGwuZ2V0KCdjb2x1bW5LZXknKSA9PT0gY29sdW1uS2V5XG4gICAgICAgICAgJiYgc2VsZWN0UmVmXG4gICAgICAgICkge1xuICAgICAgICAgIHNlbGVjdFJlZi5mb2N1cygpO1xuICAgICAgICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5mb2N1c1RvTGFzdFJvdyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHNlbGVjdGVkUm93SW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZvY3VzVG9MYXN0Um93ID0gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKHNlbGVjdGVkUm93SW5kZXggPT09IHJvd0luZGV4ICYmIHNlbGVjdFJlZikge1xuICAgICAgICBzZWxlY3RSZWYuZm9jdXMoKTtcbiAgICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mb2N1c1RvTGFzdFJvdyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5lbmFibGVBcnJvd05hdmlnYXRpb24pIHtcbiAgICAgIHRoaXMuY2VsbFJlZnNbYCR7dGhpcy5wcm9wcy5ncmlkLmlkfV8ke2NvbHVtbktleX1fJHtyb3dJbmRleH1gXSA9IHJlZjtcbiAgICB9XG4gIH07XG5cbiAgbW92ZUNlbGxGb2N1cyA9IChuZXh0RWxlbWVudCwgcm93SW5kZXgsIGNvbHVtbkluZGV4KSA9PiB7XG4gICAgY29uc3QgZWxlbWVudFR5cGVzID0gWyd0ZXh0JywgJ2NoZWNrYm94J107XG4gICAgaWYgKG5leHRFbGVtZW50ICYmIGVsZW1lbnRUeXBlcy5pbmNsdWRlcyhuZXh0RWxlbWVudC50eXBlKSkge1xuICAgICAgaWYgKHJvd0luZGV4ICE9PSAtMSB8fCBjb2x1bW5JbmRleCAhPT0gLTEpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgY3VycmVudENvbHVtbjogY29sdW1uSW5kZXgsXG4gICAgICAgICAgY3VycmVudFJvdzogcm93SW5kZXgsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmIChuZXh0RWxlbWVudC50eXBlID09PSAnY2hlY2tib3gnKSBuZXh0RWxlbWVudC5mb2N1cygpO1xuICAgICAgICBpZiAobmV4dEVsZW1lbnQudHlwZSA9PT0gJ3RleHQnKSBuZXh0RWxlbWVudC5zZWxlY3QoKTtcbiAgICAgIH0sIDUwKTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlU2VsZWN0QWxsQ2hlY2tCb3hPbkNoYW5nZSA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLnNlbGVjdEFsbEl0ZW1zQ2hhbmdlKHRoaXMucHJvcHMuZ3JpZCk7XG4gIH07XG5cbiAgaGFuZGxlU2VsZWN0aW9uQ2hlY2tCb3hPbkNoYW5nZSA9ICgpID0+ICgpID0+IHtcbiAgICAvLyBMb2dpYyBmb3IgdGhpcyBhY3Rpb24gY29udGFpbnMgaW4gaGFuZGxlUm93Q2xpY2sgKGluICdlbHNlJyBibG9jaylcbiAgfTtcblxuICBnZW5lcmF0ZUNvbHVtbnMgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGF0YSxcbiAgICAgIHNlbGVjdGVkSXRlbXMsXG4gICAgICBkYXRlRm9ybWF0LFxuICAgICAgdGhvdXNhbmRTZXBhcmF0b3IsXG4gICAgICBkZWNpbWFsU2VwYXJhdG9yLFxuICAgICAgZ3JpZCxcbiAgICAgIGlubGluZUVkaXQsXG4gICAgICBmaWx0ZXJpbmcsXG4gICAgICByZWdpb24sXG4gICAgICBpbnRsLFxuICAgICAgc2VsZWN0Q29tcG9uZW50T3B0aW9ucyxcbiAgICAgIGlzQ3JlYXRpbmcsXG4gICAgICBleHRyYUNvbHVtbixcbiAgICAgIHJvd1NlbGVjdENoZWNrYm94Q29sdW1uLFxuICAgICAgc2hvd1NlbGVjdEFsbENoZWNrYm94LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgY29sdW1ucyA9IFtdO1xuICAgIGNvbnN0IHRhYkluZGV4ID0gU3RyaW5nKHRoaXMucHJvcHMudGFiSW5kZXgpO1xuICAgIGlmIChleHRyYUNvbHVtbikge1xuICAgICAgY29sdW1ucy5wdXNoKHtcbiAgICAgICAgd2lkdGg6IGV4dHJhQ29sdW1uLndpZHRoIHx8IDQwLFxuICAgICAgICBpc1Jlc2l6YWJsZTogISFleHRyYUNvbHVtbi5pc1Jlc2l6YWJsZSxcbiAgICAgICAgaXNTb3J0YWJsZTogZmFsc2UsXG4gICAgICAgIGNvbHVtbktleTogJ2V4dHJhQ29sdW1uJyxcbiAgICAgICAgY2VsbDogcm93SW5kZXggPT4gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtZXh0cmEtY29sdW1uLWNlbGwgbm8tcm93LXNlbGVjdFwiPlxuICAgICAgICAgICAge2V4dHJhQ29sdW1uLnZhbHVlUmVuZGVyKGRhdGEuZ2V0KHJvd0luZGV4KSwgcm93SW5kZXgpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApLFxuICAgICAgICBjZWxsRWRpdDogcm93SW5kZXggPT4gKGV4dHJhQ29sdW1uLmNlbGxFZGl0ID8gZXh0cmFDb2x1bW4uY2VsbEVkaXQocm93SW5kZXgpIDogbnVsbCksXG4gICAgICAgIGNlbGxDcmVhdGU6IHJvd0luZGV4ID0+IChleHRyYUNvbHVtbi5jZWxsQ3JlYXRlID8gZXh0cmFDb2x1bW4uY2VsbENyZWF0ZShyb3dJbmRleCkgOiBudWxsKSxcbiAgICAgICAgY2VsbEZpbHRlcjogcm93SW5kZXggPT4gKGV4dHJhQ29sdW1uLmNlbGxGaWx0ZXIgPyBleHRyYUNvbHVtbi5jZWxsRmlsdGVyKHJvd0luZGV4KSA6IG51bGwpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHJvd1NlbGVjdENoZWNrYm94Q29sdW1uKSB7XG4gICAgICBjb2x1bW5zLnB1c2goe1xuICAgICAgICB3aWR0aDogNDAsXG4gICAgICAgIGlzUmVzaXphYmxlOiBmYWxzZSxcbiAgICAgICAgaXNTb3J0YWJsZTogZmFsc2UsXG4gICAgICAgIGNvbHVtbktleTogJ3NlbGVjdGlvbkNoZWNrYm94JyxcbiAgICAgICAgaGVhZGVyOiBzaG93U2VsZWN0QWxsQ2hlY2tib3ggJiYgKFxuICAgICAgICAgIDxDaGVja2JveFxuICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkU2VsZWN0QWxsQ2hlY2tCb3gtJHtncmlkLmlkfWB9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1zZWxlY3QtYWxsLWNoZWNrYm94LWNlbGwgbm8tcm93LXNlbGVjdFwiXG4gICAgICAgICAgICBjaGVja2VkPXtkYXRhLnNpemUgIT09IDAgJiYgZGF0YS5zaXplID09PSBzZWxlY3RlZEl0ZW1zLnNpemV9XG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVTZWxlY3RBbGxDaGVja0JveE9uQ2hhbmdlfVxuICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgIC8+XG4gICAgICAgICksXG4gICAgICAgIGNlbGw6IChyb3dJbmRleCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHJvd0l0ZW0gPSBkYXRhLmdldChyb3dJbmRleCk7XG4gICAgICAgICAgY29uc3QgaXRlbUlkID0gcm93SXRlbS5nZXRJbihncmlkLmlkS2V5UGF0aCk7XG4gICAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSBzZWxlY3RlZEl0ZW1zLmluY2x1ZGVzKGl0ZW1JZCk7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxDaGVja2JveFxuICAgICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRTZWxlY3RDaGVja0JveC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtyb3dJbmRleH1gfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1zZWxlY3QtY2hlY2tib3gtY2VsbCBuby1yb3ctc2VsZWN0XCJcbiAgICAgICAgICAgICAgY2hlY2tlZD17c2VsZWN0ZWR9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVNlbGVjdGlvbkNoZWNrQm94T25DaGFuZ2Uocm93SW5kZXgpfVxuICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIGNlbGxFZGl0OiAoKSA9PiBudWxsLFxuICAgICAgICBjZWxsQ3JlYXRlOiAoKSA9PiBudWxsLFxuICAgICAgICBjZWxsRmlsdGVyOiAoKSA9PiBudWxsLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgdmlzaWJsZUNvbHVtbnMgPSBbXTtcbiAgICB0aGlzLnByb3BzLnZpc2libGVDb2x1bW5zLmZvckVhY2goKHZpc2libGVDb2x1bW5LZXkpID0+IHtcbiAgICAgIHRoaXMucHJvcHMuY29sdW1ucy5mb3JFYWNoKChvcmdDb2wpID0+IHtcbiAgICAgICAgaWYgKFV0aWxzLmdldENvbHVtbktleShvcmdDb2wpID09PSB2aXNpYmxlQ29sdW1uS2V5KSB7XG4gICAgICAgICAgdmlzaWJsZUNvbHVtbnMucHVzaChvcmdDb2wpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICB2aXNpYmxlQ29sdW1ucy5mb3JFYWNoKChjb2wpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlRW1wdHlDaGVja2VyID0gVXRpbHMuZ2V0VmFsdWVFbXB0eUNoZWNrZXIoY29sKTtcbiAgICAgIC8vIENlbGwgdmFsdWUgcmVuZGVyaW5nXG4gICAgICBjb25zdCB2YWx1ZVJlbmRlciA9IChyb3dJbmRleCwgZm9ybWF0KSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbCA9IGRhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWwpKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbC5pc1JlcXVpcmVkID8gPE0gaWQ9XCJHcmlkLlZhbHVlSXNNaXNzaW5nXCIgLz4gOiAnJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZm9ybWF0ID8gZm9ybWF0KHZhbCkgOiB2YWw7XG4gICAgICB9O1xuXG4gICAgICBsZXQgY29sdW1uID0gR3JpZENvbHVtblNlcnZpY2UuYmFzZUNvbHVtbihjb2wpO1xuICAgICAgLy8gQ29sbGVjdCBjb2x1bW4gZnVuY3Rpb25zIGludG8gb25lIE9iamVjdFxuICAgICAgY29uc3QgY29sdW1uRnVuY3Rpb25zID0ge1xuICAgICAgICBlZGl0OiB7XG4gICAgICAgICAgZ2V0SXRlbVZhbHVlOiB0aGlzLmdldEVkaXRJdGVtVmFsdWUsXG4gICAgICAgICAgb25DZWxsVmFsdWVDaGFuZ2U6IHRoaXMub25FZGl0Q2VsbFZhbHVlQ2hhbmdlLFxuICAgICAgICAgIG9uQ2VsbEJsdXI6IHRoaXMub25FZGl0Q2VsbEJsdXIsXG4gICAgICAgICAgb25DZWxsRm9jdXM6IHRoaXMub25DZWxsRm9jdXMsXG4gICAgICAgICAgb25DZWxsS2V5RG93bjogdGhpcy5vbkVkaXRDZWxsS2V5RG93bixcbiAgICAgICAgICBoYW5kbGVDZWxsUmVmOiB0aGlzLmhhbmRsZUVkaXRDZWxsUmVmLFxuICAgICAgICB9LFxuICAgICAgICBjcmVhdGU6IHtcbiAgICAgICAgICBnZXRJdGVtVmFsdWU6IHRoaXMuZ2V0Q3JlYXRlSXRlbVZhbHVlLFxuICAgICAgICAgIG9uQ2VsbFZhbHVlQ2hhbmdlOiB0aGlzLm9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlLFxuICAgICAgICAgIG9uQ2VsbEJsdXI6IHRoaXMub25DcmVhdGVDZWxsQmx1cixcbiAgICAgICAgICBvbkNlbGxGb2N1czogdGhpcy5vbkNlbGxGb2N1cyxcbiAgICAgICAgICBvbkNlbGxLZXlEb3duOiB0aGlzLm9uQ3JlYXRlQ2VsbEtleURvd24sXG4gICAgICAgICAgaGFuZGxlQ2VsbFJlZjogdGhpcy5oYW5kbGVDcmVhdGVDZWxsUmVmLFxuICAgICAgICB9LFxuICAgICAgICBmaWx0ZXI6IHtcbiAgICAgICAgICBnZXRJdGVtVmFsdWU6IHRoaXMuZ2V0RmlsdGVySXRlbVZhbHVlLFxuICAgICAgICAgIGdldEl0ZW1NdWx0aVZhbHVlOiB0aGlzLmdldEZpbHRlckl0ZW1NdWx0aVZhbHVlLFxuICAgICAgICAgIG9uQ2VsbFZhbHVlQ2hhbmdlOiB0aGlzLm9uRmlsdGVyQ2VsbFZhbHVlQ2hhbmdlLFxuICAgICAgICAgIG9uQ2VsbE11bHRpVmFsdWVCbHVyOiB0aGlzLm9uRmlsdGVyQ2VsbE11bHRpVmFsdWVCbHVyLFxuICAgICAgICAgIG9uQ2VsbE11bHRpVmFsdWVDaGFuZ2U6IHRoaXMub25GaWx0ZXJDZWxsTXVsdGlWYWx1ZUNoYW5nZSxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIC8vIGhhbmRsZSBjb2x1bW4uY2VsbCAvIGNvbHVtbi5jZWxsRWRpdCAvIGNvbHVtbi5jZWxsQ3JlYXRlIC8gY29sdW1uLmNlbGxGaWx0ZXJcbiAgICAgIGNvbnN0IGNlbGxQcm9wcyA9IHtcbiAgICAgICAgZ3JpZCxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgZGF0ZUZvcm1hdCxcbiAgICAgICAgdGhvdXNhbmRTZXBhcmF0b3IsXG4gICAgICAgIGRlY2ltYWxTZXBhcmF0b3IsXG4gICAgICAgIHNlbGVjdENvbXBvbmVudE9wdGlvbnMsXG4gICAgICB9OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICBjb2x1bW4gPSBHcmlkQ29sdW1uU2VydmljZS5jb2x1bW5DZWxsKGNvbHVtbiwgY2VsbFByb3BzLCBjb2wsIHZhbHVlUmVuZGVyKTtcblxuICAgICAgLy8gaGFuZGxlIGNvbHVtbkNvbXBvbmVudFR5cGVzXG4gICAgICBjb25zdCBjb21wb25lbnRUeXBlUHJvcHMgPSB7XG4gICAgICAgIC4uLmNlbGxQcm9wcyxcbiAgICAgICAgaW5saW5lRWRpdCxcbiAgICAgICAgZmlsdGVyaW5nLFxuICAgICAgICByZWdpb24sXG4gICAgICAgIGludGwsXG4gICAgICAgIHNlbGVjdENvbXBvbmVudE9wdGlvbnMsXG4gICAgICB9OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICBjb2x1bW4gPSBHcmlkQ29sdW1uU2VydmljZS5jb2x1bW5Db21wb25lbnRUeXBlKFxuICAgICAgICBjb2x1bW4sXG4gICAgICAgIHRhYkluZGV4LFxuICAgICAgICBjb21wb25lbnRUeXBlUHJvcHMsXG4gICAgICAgIGNvbCxcbiAgICAgICAgY29sdW1uRnVuY3Rpb25zLFxuICAgICAgICB0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUsXG4gICAgICApO1xuICAgICAgY29sdW1ucy5wdXNoKGNvbHVtbik7XG4gICAgfSk7XG5cbiAgICBpZiAoaXNDcmVhdGluZykge1xuICAgICAgY29sdW1ucy5wdXNoKHtcbiAgICAgICAgd2lkdGg6IDM3LFxuICAgICAgICBpc1Jlc2l6YWJsZTogZmFsc2UsXG4gICAgICAgIGNvbHVtbktleTogJ3JlbW92ZU5ld0l0ZW0nLFxuICAgICAgICBjZWxsOiAoKSA9PiBudWxsLFxuICAgICAgICBjZWxsRWRpdDogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbENyZWF0ZTogcm93SW5kZXggPT4gKFxuICAgICAgICAgIDxJY29uXG4gICAgICAgICAgICBpZD17YG9jLWRhdGFncmlkLW5ldy1pdGVtLXJlbW92ZS0ke2dyaWQuaWR9LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgIHR5cGU9XCJpbmRpY2F0b3JcIlxuICAgICAgICAgICAgbmFtZT1cImRlbGV0ZVwiXG4gICAgICAgICAgICB3aWR0aD17MzB9XG4gICAgICAgICAgICBoZWlnaHQ9ezMwfVxuICAgICAgICAgICAgc3R5bGU9e3sgcGFkZGluZzogJzdweCcgfX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMucHJvcHMucmVtb3ZlTmV3SXRlbShncmlkLCByb3dJbmRleCl9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSxcbiAgICAgICAgY2VsbEZpbHRlcjogKCkgPT4gbnVsbCxcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gY29sdW1ucztcbiAgfTtcblxuICBpc0NlbGxFZGl0ZWQgPSAocm93SW5kZXgsIGNvbCwgY2VsbFR5cGUpID0+IHtcbiAgICBpZiAoY2VsbFR5cGUgIT09ICdlZGl0Jykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBpZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgcmV0dXJuICEhdGhpcy5wcm9wcy5lZGl0RGF0YS5nZXRJbihbaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgfTtcblxuICBoYW5kbGVBZnRlckFkZEl0ZW0gPSAoKSA9PiB7XG4gICAgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCA9IHRydWU7XG4gIH07XG5cbiAgaGFuZGxlQWZ0ZXJFZGl0UHJlc3MgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5zaXplKSB7XG4gICAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IHRydWU7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY3VycmVudFJvdzogdW5kZWZpbmVkLFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZUFmdGVyVmFsaWRhdGlvbkVycm9yID0gKCkgPT4ge1xuICAgIHRoaXMuZm9jdXNUb0Vycm9yQ2VsbCA9IHRydWU7XG4gIH07XG5cbiAgaGFuZGxlUm93Q2xpY2sgPSAoZSwgcm93SW5kZXgpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuaXNDcmVhdGluZyAmJiAhdGhpcy5wcm9wcy5pc0VkaXRpbmcpIHtcbiAgICAgIGNvbnN0IHsgdGFyZ2V0OiB7IHR5cGUgfSB9ID0gZTtcbiAgICAgIGlmICh0eXBlICE9PSAnY2hlY2tib3gnKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICAgIGlmIChlLmN0cmxLZXkgfHwgZS5zaGlmdEtleSkge1xuICAgICAgICBkb2N1bWVudC5nZXRTZWxlY3Rpb24oKS5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICAgIH1cbiAgICAgIC8vIERvbid0IHRyaWdnZXIgc2VsZWN0aW9uIGNoYW5nZSBvbiB3aGVuIHVzZXIgY2xpY2tzIG9uIHNwZWNpYWwgY2VsbHMgbGlrZSBjaGVja2JveC9leHRyYVxuICAgICAgLy8gQ2hlY2sgdGhhdCBjbGlja2VkIG5vZGUncyBwYXJlbnQgb3IgcGFyZW50J3MgcGFyZW50IGRvZXNuJ3QgaGF2ZSBuby1yb3ctc2VsZWN0IGNsYXNzXG4gICAgICBjb25zdCB7IHBhcmVudE5vZGUgfSA9IGUudGFyZ2V0O1xuICAgICAgY29uc3QgcGFyZW50MWNsYXNzID0gcGFyZW50Tm9kZS5jbGFzc05hbWUgJiYgcGFyZW50Tm9kZS5jbGFzc05hbWUuaW5kZXhPZiA/IHBhcmVudE5vZGUuY2xhc3NOYW1lIDogJyc7XG4gICAgICBjb25zdCBwYXJlbnQyY2xhc3MgPSAgICAgICAgcGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZSAmJiBwYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lLmluZGV4T2YgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICA/IHBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWVcbiAgICAgICAgOiAnJztcbiAgICAgIGNvbnN0IHBhcmVudDNjbGFzcyA9IHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZVxuICAgICAgICAmJiBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUuaW5kZXhPZiAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgID8gcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgIDogJyc7XG4gICAgICBjb25zdCBwYXJlbnQ0Y2xhc3MgPSBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZVxuICAgICAgICAmJiBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZS5pbmRleE9mIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgPyBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZVxuICAgICAgICA6ICcnO1xuICAgICAgaWYgKFxuICAgICAgICBwYXJlbnQxY2xhc3MuaW5kZXhPZignbm8tcm93LXNlbGVjdCcpID09PSAtMVxuICAgICAgICAmJiBwYXJlbnQyY2xhc3MuaW5kZXhPZignbm8tcm93LXNlbGVjdCcpID09PSAtMVxuICAgICAgICAmJiBwYXJlbnQzY2xhc3MuaW5kZXhPZignbm8tcm93LXNlbGVjdCcpID09PSAtMVxuICAgICAgICAmJiBwYXJlbnQ0Y2xhc3MuaW5kZXhPZignbm8tcm93LXNlbGVjdCcpID09PSAtMVxuICAgICAgKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnJvd1NlbGVjdCkge1xuICAgICAgICAgIHRoaXMucHJvcHMuaXRlbVNlbGVjdGlvbkNoYW5nZShcbiAgICAgICAgICAgIHRoaXMucHJvcHMuZ3JpZCxcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5tdWx0aVNlbGVjdCAmJiBlLmN0cmxLZXksXG4gICAgICAgICAgICB0aGlzLnByb3BzLm11bHRpU2VsZWN0ICYmIGUuc2hpZnRLZXksXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wcm9wcy5pdGVtU2VsZWN0aW9uQ2hhbmdlKHRoaXMucHJvcHMuZ3JpZCwgcm93SW5kZXgsIHRoaXMucHJvcHMubXVsdGlTZWxlY3QsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMub25Sb3dDbGljaykge1xuICAgICAgdGhpcy5wcm9wcy5vblJvd0NsaWNrKGUsIHJvd0luZGV4LCB0aGlzLnByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGhhbmRsZUNvbnRleHRNZW51ID0gKGUsIHJvd0luZGV4KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuY29udGV4dE1lbnVJdGVtcykge1xuICAgICAgY29uc3Qge1xuICAgICAgICBpdGVtU2VsZWN0aW9uQ2hhbmdlLCBzZWxlY3RlZEl0ZW1zLCBncmlkLCBkYXRhLFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGNvbnRleHRNZW51T3BlbjogdHJ1ZSxcbiAgICAgICAgY29udGV4dE1lbnVYOiBlLmNsaWVudFgsXG4gICAgICAgIGNvbnRleHRNZW51WTogZS5jbGllbnRZLFxuICAgICAgfSk7XG4gICAgICAvLyBJZiBjbGlja2VkIGl0ZW0gaXMgbm90IHNlbGVjdGVkLCBjaGFuZ2Ugc2VsZWN0aW9uIHRvIGl0XG4gICAgICBpZiAoIXNlbGVjdGVkSXRlbXMuaW5jbHVkZXMoZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmdyaWQuaWRLZXlQYXRoXSkpKSB7XG4gICAgICAgIGl0ZW1TZWxlY3Rpb25DaGFuZ2UoZ3JpZCwgcm93SW5kZXgpO1xuICAgICAgfVxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uRG9jdW1lbnRDbGljayk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGhhbmRsZVJvd0hlaWdodEdldHRlciA9IHJvd0luZGV4ID0+IHRoaXMucHJvcHMucm93SGVpZ2h0R2V0dGVyKFxuICAgIHRoaXMucHJvcHMuZGF0YS5nZXQocm93SW5kZXgpLFxuICAgIHJvd0luZGV4LFxuICApO1xuXG4gIHJlbmRlckNlbGwgPSBjb2wgPT4gKGNlbGxQcm9wcykgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGlzQ3JlYXRpbmcsIGlzRWRpdGluZywgY3JlYXRlRGF0YSwgc2VsZWN0ZWRDZWxsLCBncmlkLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgcm93SW5kZXgsIC4uLnByb3BzIH0gPSBjZWxsUHJvcHM7XG4gICAgbGV0IGNlbGw7XG4gICAgbGV0IGNlbGxUeXBlID0gJ3ZpZXcnO1xuICAgIGxldCBleHRyYVJvd0NvdW50ID0gMDsgLy8gaG93IG1hbnkgcm93cyB0byBpZ25vcmUgZnJvbSB0b3AsIG5ldyArIGZpbHRlciByb3dzXG4gICAgaWYgKGlzQ3JlYXRpbmcpIGV4dHJhUm93Q291bnQgPSBjcmVhdGVEYXRhLnNpemU7XG4gICAgY29uc3QgZXhpc3RpbmdSb3dzSW5kZXggPSByb3dJbmRleCAtIGV4dHJhUm93Q291bnQ7XG4gICAgaWYgKGlzQ3JlYXRpbmcpIHtcbiAgICAgIGlmIChyb3dJbmRleCA8PSBleHRyYVJvd0NvdW50IC0gMSkge1xuICAgICAgICBpZiAoY29sLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjZWxsID0gY29sLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ3JlYXRlQ2VsbFJlZihyb3dJbmRleCwgY29sKSxcbiAgICAgICAgICAgIHRoaXMub25DcmVhdGVDZWxsS2V5RG93bihyb3dJbmRleCwgY29sKSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGNlbGxUeXBlID0gJ2NyZWF0ZSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2VsbCA9IG51bGw7XG4gICAgICAgICAgY2VsbFR5cGUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjZWxsID0gY29sLmNlbGwoXG4gICAgICAgICAgZXhpc3RpbmdSb3dzSW5kZXgsXG4gICAgICAgICAgdGhpcy5oYW5kbGVDcmVhdGVDZWxsUmVmKGV4aXN0aW5nUm93c0luZGV4LCBjb2wpLFxuICAgICAgICAgIHRoaXMub25DcmVhdGVDZWxsS2V5RG93bihleGlzdGluZ1Jvd3NJbmRleCwgY29sKSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzRWRpdGluZyAmJiBjb2wuY2VsbEVkaXQpIHtcbiAgICAgIGNlbGwgPSBjb2wuY2VsbEVkaXQoXG4gICAgICAgIGV4aXN0aW5nUm93c0luZGV4LFxuICAgICAgICB0aGlzLmhhbmRsZUVkaXRDZWxsUmVmKGV4aXN0aW5nUm93c0luZGV4LCBjb2wpLFxuICAgICAgICB0aGlzLm9uRWRpdENlbGxLZXlEb3duKGV4aXN0aW5nUm93c0luZGV4LCBjb2wpLFxuICAgICAgKTtcbiAgICAgIGNlbGxUeXBlID0gJ2VkaXQnO1xuICAgIH0gZWxzZSB7XG4gICAgICBjZWxsID0gY29sLmNlbGwoXG4gICAgICAgIGV4aXN0aW5nUm93c0luZGV4LFxuICAgICAgICB0aGlzLmhhbmRsZUVkaXRDZWxsUmVmKGV4aXN0aW5nUm93c0luZGV4LCBjb2wpLFxuICAgICAgICB0aGlzLm9uRWRpdENlbGxLZXlEb3duKGV4aXN0aW5nUm93c0luZGV4LCBjb2wpLFxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3QgaXNTcGVjaWFsID0gcHJvcHMuY29sdW1uS2V5ID09PSAnc2VsZWN0aW9uQ2hlY2tib3gnIHx8IHByb3BzLmNvbHVtbktleSA9PT0gJ2V4dHJhQ29sdW1uJztcbiAgICBpZiAoKGNlbGxUeXBlID09PSAndmlldycgfHwgY2VsbFR5cGUgPT09ICdlZGl0JyB8fCBjZWxsVHlwZSA9PT0gJ2NyZWF0ZScpICYmICFpc1NwZWNpYWwpIHtcbiAgICAgIGNvbnN0IGdldFJvd0luZGV4ID0gY2VsbFR5cGUgPT09ICdjcmVhdGUnID8gcm93SW5kZXggOiByb3dJbmRleCAtIGV4dHJhUm93Q291bnQ7XG4gICAgICBjb25zdCBtZXNzYWdlRGF0YSA9IHRoaXMuZ2V0Q2VsbE1lc3NhZ2VzKGdldFJvd0luZGV4LCBjb2wsIGNlbGxUeXBlKTtcbiAgICAgIGNvbnN0IGlzRWRpdGVkID0gdGhpcy5pc0NlbGxFZGl0ZWQoZ2V0Um93SW5kZXgsIGNvbCwgY2VsbFR5cGUpO1xuICAgICAgY29uc3QgY2xhc3NOYW1lID0gc2VsZWN0ZWRDZWxsLmdldCgncm93SW5kZXgnKSA9PT0gcm93SW5kZXhcbiAgICAgICAgJiYgc2VsZWN0ZWRDZWxsLmdldCgnY29sdW1uS2V5JykgPT09IHByb3BzLmNvbHVtbktleVxuICAgICAgICA/ICdvYy1kYXRhZ3JpZC1jZWxsIGlzLXNlbGVjdGVkJ1xuICAgICAgICA6ICdvYy1kYXRhZ3JpZC1jZWxsJztcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxDZWxsXG4gICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICAgIHN0eWxlPXtjb2wuc3R5bGV9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDZWxsU2VsZWN0KGNlbGxUeXBlLCByb3dJbmRleCwgcHJvcHMuY29sdW1uS2V5KX1cbiAgICAgICAgPlxuICAgICAgICAgIDxDZWxsVG9vbHRpcFxuICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkQ2VsbC0ke2dyaWQuaWR9LSR7cHJvcHMuY29sdW1uS2V5fS0ke3Jvd0luZGV4fWB9XG4gICAgICAgICAgICBpc0VkaXRlZD17aXNFZGl0ZWR9XG4gICAgICAgICAgICBpc0Vycm9yPXshIW1lc3NhZ2VEYXRhLmVycm9yTWVzc2FnZX1cbiAgICAgICAgICAgIGlzV2FybmluZz17ISFtZXNzYWdlRGF0YS53YXJuaW5nTWVzc2FnZX1cbiAgICAgICAgICAgIGluZm9NZXNzYWdlPXttZXNzYWdlRGF0YS5pbmZvTWVzc2FnZX1cbiAgICAgICAgICAgIGVycm9yTWVzc2FnZT17bWVzc2FnZURhdGEuZXJyb3JNZXNzYWdlfVxuICAgICAgICAgICAgd2FybmluZ01lc3NhZ2U9e21lc3NhZ2VEYXRhLndhcm5pbmdNZXNzYWdlfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtjZWxsfVxuICAgICAgICAgIDwvQ2VsbFRvb2x0aXA+XG4gICAgICAgIDwvQ2VsbD5cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8Q2VsbCB7Li4ucHJvcHN9IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWNlbGxcIiBzdHlsZT17Y29sLnN0eWxlfT5cbiAgICAgICAge2NlbGx9XG4gICAgICA8L0NlbGw+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJDb2x1bW5zID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGFsbERhdGFTaXplLCBncmlkLCBpc0NyZWF0aW5nLCBpc0J1c3ksIHZpc2libGVDb2x1bW5zLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghYWxsRGF0YVNpemUgJiYgIWlzQnVzeSAmJiAhaXNDcmVhdGluZyAmJiAhZ3JpZC5wYWdpbmF0aW9uKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Q29sdW1uXG4gICAgICAgICAgY29sdW1uS2V5PVwiZGF0YUVtcHR5Q29sdW1uXCJcbiAgICAgICAgICBoZWFkZXI9eyhcbiAgICAgICAgICAgIDxDZWxsIHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgICAgIDxNIGlkPVwiR3JpZC5Ob0l0ZW1zXCIgLz5cbiAgICAgICAgICAgIDwvQ2VsbD5cbil9XG4gICAgICAgICAgd2lkdGg9ezEwfVxuICAgICAgICAgIGlzUmVzaXphYmxlPXtmYWxzZX1cbiAgICAgICAgICBmbGV4R3Jvdz17MX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICAgIGlmICghdmlzaWJsZUNvbHVtbnMuc2l6ZSkge1xuICAgICAgaWYgKGlzQnVzeSkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxDb2x1bW5cbiAgICAgICAgICAgIGNvbHVtbktleT1cImRhdGFFbXB0eUNvbHVtblwiXG4gICAgICAgICAgICBoZWFkZXI9ezxDZWxsPiZuYnNwOzwvQ2VsbD59XG4gICAgICAgICAgICB3aWR0aD17MTB9XG4gICAgICAgICAgICBpc1Jlc2l6YWJsZT17ZmFsc2V9XG4gICAgICAgICAgICBmbGV4R3Jvdz17MX1cbiAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPENvbHVtblxuICAgICAgICAgIGNvbHVtbktleT1cImRhdGFFbXB0eUNvbHVtblwiXG4gICAgICAgICAgaGVhZGVyPXsoXG4gICAgICAgICAgICA8Q2VsbCBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInIH19PlxuICAgICAgICAgICAgICA8TSBpZD1cIkdyaWQuTm9Db2x1bW5zXCIgLz5cbiAgICAgICAgICAgIDwvQ2VsbD5cbil9XG4gICAgICAgICAgd2lkdGg9ezEwfVxuICAgICAgICAgIGlzUmVzaXphYmxlPXtmYWxzZX1cbiAgICAgICAgICBmbGV4R3Jvdz17MX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnN0IGNvbHVtbnMgPSB0aGlzLmdlbmVyYXRlQ29sdW1ucygpO1xuICAgIGlmIChjb2x1bW5zLmxlbmdodCA9PT0gMCkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIGNvbHVtbnMubWFwKGNvbCA9PiAoXG4gICAgICA8Q29sdW1uXG4gICAgICAgIGtleT17Y29sLmNvbHVtbktleX1cbiAgICAgICAgY29sdW1uS2V5PXtjb2wuY29sdW1uS2V5fVxuICAgICAgICBoZWFkZXI9eyhcbiAgICAgICAgICA8SGVhZGVyQ2VsbFxuICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkSGVhZGVyLSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbC5jb2x1bW5LZXl9YH1cbiAgICAgICAgICAgIGdyaWQ9e3RoaXMucHJvcHMuZ3JpZH1cbiAgICAgICAgICAgIGNvbHVtbnM9e3RoaXMucHJvcHMuY29sdW1uc31cbiAgICAgICAgICAgIGNvbHVtbj17Y29sfVxuICAgICAgICAgICAgY3VycmVudFNvcnRDb2x1bW49e3RoaXMucHJvcHMuc29ydENvbHVtbn1cbiAgICAgICAgICAgIGN1cnJlbnRTb3J0T3JkZXI9e3RoaXMucHJvcHMuc29ydE9yZGVyfVxuICAgICAgICAgICAgb25Tb3J0Q2hhbmdlPXt0aGlzLnByb3BzLnNvcnRDaGFuZ2V9XG4gICAgICAgICAgICBpc0J1c3k9e3RoaXMucHJvcHMuaXNCdXN5fVxuICAgICAgICAgICAgZmlsdGVyaW5nPXt0aGlzLnByb3BzLmZpbHRlcmluZyAmJiB0aGlzLnByb3BzLmlzRmlsdGVyaW5nfVxuICAgICAgICAgICAgd2lkdGg9e3RoaXMucHJvcHMuY29sdW1uV2lkdGhzLmdldChjb2wuY29sdW1uS2V5LCBjb2wud2lkdGgpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtjb2wuaGVhZGVyfVxuICAgICAgICAgIDwvSGVhZGVyQ2VsbD5cbil9XG4gICAgICAgIGNlbGw9e3RoaXMucmVuZGVyQ2VsbChjb2wpfVxuICAgICAgICB3aWR0aD17dGhpcy5wcm9wcy5jb2x1bW5XaWR0aHMuZ2V0KGNvbC5jb2x1bW5LZXksIGNvbC53aWR0aCl9XG4gICAgICAgIG1pbldpZHRoPXtjb2wubWluV2lkdGh9XG4gICAgICAgIG1heFdpZHRoPXtjb2wubWF4V2lkdGh9XG4gICAgICAgIGlzUmVzaXphYmxlPXtjb2wuaXNSZXNpemFibGV9XG4gICAgICAgIGZsZXhHcm93PXtjb2wuZmxleEdyb3cgPyBjb2wuZmxleEdyb3cgOiAwfVxuICAgICAgICBmaXhlZD17Y29sLmZpeGVkfVxuICAgICAgICBmaXhlZFJpZ2h0PXtjb2wuZml4ZWRSaWdodH1cbiAgICAgICAgYWxsb3dDZWxsc1JlY3ljbGluZz17Y29sLmFsbG93Q2VsbHNSZWN5Y2xpbmd9XG4gICAgICAvPlxuICAgICkpO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBncmlkQ2xhc3NOYW1lID0gY2xhc3NOYW1lcyh7XG4gICAgICAnb2MtZGF0YWdyaWQtY29udGFpbmVyJzogdHJ1ZSxcbiAgICAgICd3aXRoLWFjdGlvbmJhcic6IHRoaXMucHJvcHMuaW5saW5lRWRpdCAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlQWN0aW9uQmFyLFxuICAgICAgJ2lzLWJ1c3knOiB0aGlzLnByb3BzLmlzQnVzeSxcbiAgICAgICdpcy1lZGl0aW5nJzogdGhpcy5wcm9wcy5pc0VkaXRpbmcsXG4gICAgICAnaXMtY3JlYXRpbmcnOiB0aGlzLnByb3BzLmlzQ3JlYXRpbmcsXG4gICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgIH0pO1xuXG4gICAgLy8gY2hlY2sgaWYgdGhlcmUgaXMgYSBuZXcgcmVxdWVzdCB0byBjaGFuZ2UgZWRpdCBtb2RlIGZvY3VzXG4gICAgdGhpcy5zZXRGb2N1c1RvKHRoaXMucHJvcHMuZm9jdXNUeXBlKTtcblxuICAgIGxldCBhY3Rpb25CYXIgPSBudWxsO1xuICAgIGxldCBhY3Rpb25CYXJSaWdodCA9IG51bGw7XG4gICAgbGV0IGFjdGlvbkJhckxlZnQgPSBudWxsO1xuICAgIGlmIChcbiAgICAgICh0aGlzLnByb3BzLmFjdGlvbkJhclxuICAgICAgICB8fCB0aGlzLnByb3BzLmlubGluZUVkaXRcbiAgICAgICAgfHwgdGhpcy5wcm9wcy5maWx0ZXJpbmdcbiAgICAgICAgfHwgdGhpcy5wcm9wcy5yZW1vdmluZylcbiAgICAgICYmICF0aGlzLnByb3BzLmRpc2FibGVBY3Rpb25CYXJcbiAgICApIHtcbiAgICAgIGFjdGlvbkJhclJpZ2h0ID0gKFxuICAgICAgICA8QWN0aW9uQmFyIHBvc2l0aW9uPVwicmlnaHRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWFjdGlvbmJhci1yaWdodFwiPnt0aGlzLnByb3BzLmFjdGlvbkJhcn08L2Rpdj5cbiAgICAgICAgICB7dGhpcy5wcm9wcy5maWx0ZXJpbmdcbiAgICAgICAgICAgICYmIHRoaXMucHJvcHMuZGlzYWJsZURyb3Bkb3duXG4gICAgICAgICAgICAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlRmlsdGVyaW5nQ29udHJvbHMgJiYgPEZpbHRlcmluZ0NvbnRyb2xzIHsuLi50aGlzLnByb3BzfSAvPn1cbiAgICAgICAgICB7dGhpcy5wcm9wcy5pbmxpbmVFZGl0ICYmIChcbiAgICAgICAgICAgIDxJbmxpbmVFZGl0Q29udHJvbHNcbiAgICAgICAgICAgICAgYWZ0ZXJBZGRJdGVtPXt0aGlzLmhhbmRsZUFmdGVyQWRkSXRlbX1cbiAgICAgICAgICAgICAgYWZ0ZXJFZGl0UHJlc3M9e3RoaXMuaGFuZGxlQWZ0ZXJFZGl0UHJlc3N9XG4gICAgICAgICAgICAgIGFmdGVyVmFsaWRhdGlvbkVycm9yPXt0aGlzLmhhbmRsZUFmdGVyVmFsaWRhdGlvbkVycm9yfVxuICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7KHRoaXMucHJvcHMuZHJvcGRvd25NZW51SXRlbXNcbiAgICAgICAgICAgIHx8IHRoaXMucHJvcHMucmVtb3ZpbmdcbiAgICAgICAgICAgIHx8IHRoaXMucHJvcHMuY29sdW1uU2V0dGluZ3NcbiAgICAgICAgICAgIHx8ICh0aGlzLnByb3BzLmZpbHRlcmluZyAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlRHJvcGRvd24pKSAmJiAoXG4gICAgICAgICAgICA8RHJvcGRvd25Db250cm9scyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgICApfVxuICAgICAgICA8L0FjdGlvbkJhcj5cbiAgICAgICk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLmFjdGlvbkJhckxlZnQgfHwgdGhpcy5wcm9wcy5ncmlkSGVhZGVyKSB7XG4gICAgICBhY3Rpb25CYXJMZWZ0ID0gKFxuICAgICAgICA8QWN0aW9uQmFyIHBvc2l0aW9uPVwibGVmdFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtZ3JpZGhlYWRlclwiPnt0aGlzLnByb3BzLmdyaWRIZWFkZXJ9PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1hY3Rpb25iYXItbGVmdFwiPnt0aGlzLnByb3BzLmFjdGlvbkJhckxlZnR9PC9kaXY+XG4gICAgICAgIDwvQWN0aW9uQmFyPlxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGFjdGlvbkJhckxlZnQgfHwgYWN0aW9uQmFyUmlnaHQpIHtcbiAgICAgIGFjdGlvbkJhciA9IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1hY3Rpb25iYXItY29udGFpbmVyXCI+XG4gICAgICAgICAge2FjdGlvbkJhckxlZnR9XG4gICAgICAgICAge2FjdGlvbkJhclJpZ2h0fVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICAgIGxldCByb3dzQ291bnQgPSB0aGlzLnByb3BzLnJvd3NDb3VudCB8fCB0aGlzLnByb3BzLnJvd3NDb3VudCA9PT0gMFxuICAgICAgPyB0aGlzLnByb3BzLnJvd3NDb3VudFxuICAgICAgOiB0aGlzLnByb3BzLmRhdGEuc2l6ZTtcbiAgICBpZiAodGhpcy5wcm9wcy5pc0NyZWF0aW5nKSByb3dzQ291bnQgKz0gdGhpcy5wcm9wcy5jcmVhdGVEYXRhLnNpemU7XG4gICAgaWYgKCF0aGlzLnByb3BzLnZpc2libGVDb2x1bW5zLnNpemUpIHJvd3NDb3VudCA9IDA7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9e2BvYy1kYXRhZ3JpZC0ke3RoaXMucHJvcHMuZ3JpZC5pZH1gfVxuICAgICAgICBjbGFzc05hbWU9e2dyaWRDbGFzc05hbWV9XG4gICAgICAgIHN0eWxlPXt0aGlzLnByb3BzLmNvbnRhaW5lclN0eWxlfVxuICAgICAgPlxuICAgICAgICB7dGhpcy5wcm9wcy5pc0J1c3kgJiYgPFNwaW5uZXIgLz59XG4gICAgICAgIHt0aGlzLnN0YXRlLmNvbnRleHRNZW51T3BlbiAmJiAoXG4gICAgICAgICAgPENvbnRleHRNZW51XG4gICAgICAgICAgICB4PXt0aGlzLnN0YXRlLmNvbnRleHRNZW51WH1cbiAgICAgICAgICAgIHk9e3RoaXMuc3RhdGUuY29udGV4dE1lbnVZfVxuICAgICAgICAgICAgaXNWaXNpYmxlPXt0aGlzLnN0YXRlLmNvbnRleHRNZW51T3Blbn1cbiAgICAgICAgICAgIGNvbnRleHRNZW51SXRlbXM9e3RoaXMucHJvcHMuY29udGV4dE1lbnVJdGVtc31cbiAgICAgICAgICAgIGRhdGE9e3RoaXMucHJvcHMuZGF0YX1cbiAgICAgICAgICAgIGdyaWQ9e3RoaXMucHJvcHMuZ3JpZH1cbiAgICAgICAgICAgIHNlbGVjdGVkSXRlbXM9e3RoaXMucHJvcHMuc2VsZWN0ZWRJdGVtc31cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgICB7YWN0aW9uQmFyfVxuICAgICAgICA8UmVzcG9uc2l2ZUZpeGVkRGF0YVRhYmxlXG4gICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgaWQ9e3RoaXMucHJvcHMuZ3JpZC5pZH1cbiAgICAgICAgICByb3dzQ291bnQ9e3Jvd3NDb3VudH1cbiAgICAgICAgICBoZWFkZXJIZWlnaHQ9e1xuICAgICAgICAgICAgKHRoaXMucHJvcHMuZmlsdGVyaW5nICYmIHRoaXMucHJvcHMuaXNGaWx0ZXJpbmcpXG4gICAgICAgICAgICAgID8gdGhpcy5wcm9wcy5oZWFkZXJIZWlnaHQgKyB0aGlzLnByb3BzLmZpbHRlclJvd0hlaWdodFxuICAgICAgICAgICAgICA6IHRoaXMucHJvcHMuaGVhZGVySGVpZ2h0XG4gICAgICAgICAgfVxuICAgICAgICAgIHJvd0hlaWdodD17dGhpcy5wcm9wcy5yb3dIZWlnaHR9XG4gICAgICAgICAgb25Db2x1bW5SZXNpemVFbmRDYWxsYmFjaz17dGhpcy5vbkNvbHVtblJlc2l6ZUVuZENhbGxiYWNrfVxuICAgICAgICAgIGlzQ29sdW1uUmVzaXppbmc9e2ZhbHNlfVxuICAgICAgICAgIG9uUm93Q2xpY2s9e3RoaXMuaGFuZGxlUm93Q2xpY2t9XG4gICAgICAgICAgc2Nyb2xsVG9Db2x1bW49e3RoaXMucHJvcHMuc2Nyb2xsVG9Db2x1bW4gfHwgdGhpcy5zdGF0ZS5jdXJyZW50Q29sdW1ufVxuICAgICAgICAgIHNjcm9sbFRvcD17dGhpcy5wcm9wcy5zY3JvbGxUb3B9XG4gICAgICAgICAgc2Nyb2xsVG9Sb3c9e3RoaXMuZ2V0U2Nyb2xsVG9Sb3coKX1cbiAgICAgICAgICBvblJvd0RvdWJsZUNsaWNrPXt0aGlzLnByb3BzLm9uUm93RG91YmxlQ2xpY2t9XG4gICAgICAgICAgb25Sb3dNb3VzZURvd249e3RoaXMucHJvcHMub25Nb3VzZURvd259XG4gICAgICAgICAgb25Sb3dNb3VzZUVudGVyPXt0aGlzLnByb3BzLm9uUm93TW91c2VFbnRlcn1cbiAgICAgICAgICBvblJvd01vdXNlTGVhdmU9e3RoaXMucHJvcHMub25Sb3dNb3VzZUxlYXZlfVxuICAgICAgICAgIG9uU2Nyb2xsU3RhcnQ9e3RoaXMucHJvcHMub25TY3JvbGxTdGFydH1cbiAgICAgICAgICBvblNjcm9sbEVuZD17dGhpcy5wcm9wcy5vblNjcm9sbEVuZH1cbiAgICAgICAgICByb3dDbGFzc05hbWVHZXR0ZXI9e3RoaXMuZ2V0Um93Q2xhc3NOYW1lfVxuICAgICAgICAgIHJvd0hlaWdodEdldHRlcj17dGhpcy5wcm9wcy5yb3dIZWlnaHRHZXR0ZXIgJiYgdGhpcy5oYW5kbGVSb3dIZWlnaHRHZXR0ZXJ9XG4gICAgICAgICAgb25Db250ZW50SGVpZ2h0Q2hhbmdlPXt0aGlzLnByb3BzLm9uQ29udGVudEhlaWdodENoYW5nZX1cbiAgICAgICAgICBvblJvd0NvbnRleHRNZW51PXt0aGlzLmhhbmRsZUNvbnRleHRNZW51fVxuICAgICAgICA+XG4gICAgICAgICAge3RoaXMucmVuZGVyQ29sdW1ucygpfVxuICAgICAgICA8L1Jlc3BvbnNpdmVGaXhlZERhdGFUYWJsZT5cbiAgICAgICAge3RoaXMucHJvcHMuaXNDb2x1bW5TZXR0aW5nc01vZGFsT3BlbiAmJiAoXG4gICAgICAgICAgPENvbHVtblNldHRpbmdzTW9kYWxcbiAgICAgICAgICAgIGdyaWQ9e3RoaXMucHJvcHMuZ3JpZH1cbiAgICAgICAgICAgIGNvbHVtbnM9e3RoaXMucHJvcHMuY29sdW1uc31cbiAgICAgICAgICAgIHZpc2libGVDb2x1bW5zPXt0aGlzLnByb3BzLnZpc2libGVDb2x1bW5zfVxuICAgICAgICAgICAgY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsPXt0aGlzLnByb3BzLmNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbH1cbiAgICAgICAgICAgIHNhdmVDb2x1bW5TZXR0aW5ncz17dGhpcy5wcm9wcy5zYXZlQ29sdW1uU2V0dGluZ3N9XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERhdGFHcmlkO1xuIl19