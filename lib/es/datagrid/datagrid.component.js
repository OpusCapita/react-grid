var _dec, _class, _class2, _temp;

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
        // Format by component type
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
            return React.createElement("div", {
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
            onCellValueChange: _this.onFilterCellValueChange
          }
        }; // handle column.cell / column.cellEdit / column.cellCreate / column.cellFilter

        var cellProps = {
          data: data,
          dateFormat: dateFormat,
          thousandSeparator: thousandSeparator,
          decimalSeparator: decimalSeparator,
          selectComponentOptions: selectComponentOptions
        }; // eslint-disable-line

        column = GridColumnService.columnCell(column, cellProps, col, valueRender); // handle columnComponentTypes

        var componentTypeProps = _extends({}, cellProps, {
          grid: grid,
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
      var _this$props7 = _this.props,
          allDataSize = _this$props7.allDataSize,
          grid = _this$props7.grid,
          isCreating = _this$props7.isCreating,
          isBusy = _this$props7.isBusy,
          visibleColumns = _this$props7.visibleColumns;

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
    }, this.props.isBusy && React.createElement(Spinner, null), this.state.contextMenuOpen && this.renderContextMenu(), actionBar, React.createElement(ResponsiveFixedDataTable, {
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
    }, this.renderColumns()), this.props.isColumnSettingsModalOpen && React.createElement(ColumnSettingsModal, {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiTWFwIiwiTGlzdCIsImNvbm5lY3QiLCJpbmplY3RJbnRsIiwiRm9ybWF0dGVkTWVzc2FnZSIsIk0iLCJDb2x1bW4iLCJDZWxsIiwiTWVudUl0ZW0iLCJjbGFzc05hbWVzIiwiSWNvbiIsIlNwaW5uZXIiLCJDaGVja2JveCIsIlJlc3BvbnNpdmVGaXhlZERhdGFUYWJsZSIsIkhlYWRlckNlbGwiLCJBY3Rpb25CYXIiLCJJbmxpbmVFZGl0Q29udHJvbHMiLCJGaWx0ZXJpbmdDb250cm9scyIsIkRyb3Bkb3duQ29udHJvbHMiLCJkYXRhZ3JpZEFjdGlvbnMiLCJDZWxsVG9vbHRpcCIsIkNvbHVtblNldHRpbmdzTW9kYWwiLCJwcm9wVHlwZXMiLCJkZWZhdWx0UHJvcHMiLCJLRVlfQ09ERVMiLCJwYWdpbmF0aW9uIiwiVXRpbHMiLCJHcmlkQ29sdW1uU2VydmljZSIsIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwib3duUHJvcHMiLCJHUklEIiwiZ3JpZCIsImlzQnVzeSIsImRhdGFncmlkIiwiZ2V0SW4iLCJpZCIsImlzRWRpdGluZyIsImlzQ3JlYXRpbmciLCJpc0ZpbHRlcmluZyIsImlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW4iLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwidmlzaWJsZUNvbHVtbnMiLCJjb2x1bW5XaWR0aHMiLCJzZWxlY3RlZENlbGwiLCJzZWxlY3RlZEl0ZW1zIiwiZGF0YSIsImVkaXREYXRhIiwiY3JlYXRlRGF0YSIsImZpbHRlckRhdGEiLCJjZWxsTWVzc2FnZXMiLCJjcmVhdGVDZWxsTWVzc2FnZXMiLCJhbGxEYXRhU2l6ZSIsInNpemUiLCJsYW5ndWFnZSIsImdldExhbmd1YWdlIiwidXNlciIsInJlZ2lvbiIsImdldFJlZ2lvbiIsImRhdGVGb3JtYXQiLCJnZXREYXRlRm9ybWF0IiwidGhvdXNhbmRTZXBhcmF0b3IiLCJnZXRUaG91c2FuZFNlcGFyYXRvciIsImRlY2ltYWxTZXBhcmF0b3IiLCJnZXREZWNpbWFsU2VwYXJhdG9yIiwiZm9yY2VSZWZyZXNoVGltZXN0YW1wIiwiZ2V0IiwiZm9jdXNUeXBlIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwiRGF0YUdyaWQiLCJwcm9wcyIsImNvbnRleHRNZW51SXRlbXMiLCJzZXRTdGF0ZSIsImNvbnRleHRNZW51T3BlbiIsImRvY3VtZW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIm9uRG9jdW1lbnRDbGljayIsIm5ld0NvbHVtbldpZHRoIiwiY29sdW1uS2V5IiwicmVzaXplQ29sdW1uIiwicm93SW5kZXgiLCJjb2wiLCJlIiwiY3JlYXRlIiwiZW5hYmxlQXJyb3dOYXZpZ2F0aW9uIiwiY2VsbFJlZnMiLCJjcmVhdGVDZWxsUmVmcyIsImFycm93S2V5cyIsIkRPV04iLCJVUCIsIkxFRlQiLCJSSUdIVCIsImNvbHVtbnMiLCJvbkxhc3RDZWxsVGFiUHJlc3MiLCJncmlkQ29sdW1ucyIsImdldENvbHVtbktleUJ5SW5kZXgiLCJpIiwiZ2V0Q29sdW1uS2V5Iiwicm93c1NpemUiLCJjdXJyZW50Q2VsbCIsInByb3h5IiwiaXNDdXJzb3JBdFN0YXJ0IiwidHlwZSIsInNlbGVjdGlvblN0YXJ0IiwiaXNDdXJzb3JBdEVuZCIsInNlbGVjdGlvbkVuZCIsInZhbHVlIiwibGVuZ3RoIiwic2VsZWN0UmVmIiwic2VsZWN0IiwiZ2V0U2VsZWN0UmVmIiwiaW5jbHVkZXMiLCJrZXlDb2RlIiwicHJldmVudERlZmF1bHQiLCJFTlRFUiIsIkVTQyIsImFkZE5ld0l0ZW0iLCJnZXRDb2x1bW5EZWZhdWx0VmFsdWVzIiwiZm9jdXNUb0NyZWF0ZUNlbGwiLCJuZXh0RWxlbWVudCIsIm1lbnVJc09wZW4iLCJtb3ZlQ2VsbEZvY3VzIiwiVEFCIiwiY29sdW1uSW5kIiwiZmluZEluZGV4IiwiYyIsInZhbHVlS2V5UGF0aCIsImpvaW4iLCJkaXNhYmxlZCIsInJvd0luZCIsInNoaWZ0S2V5Iiwib25DZWxsS2V5RG93biIsInZhbHVlUGFyc2VyIiwiZXZlbnRPckRhdGEiLCJyYXdWYWx1ZSIsInRhcmdldCIsInVuZGVmaW5lZCIsImZpbHRlckNlbGxWYWx1ZUNoYW5nZSIsImNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSIsIm9uQ3JlYXRlVmFsdWVDaGFuZ2UiLCJvblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZSIsIm1hdGNoVmFsdWUiLCJvbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSIsIm5ld1ZhbHVlS2V5UGF0aCIsInYiLCJuZXdWYWx1ZSIsInZhbGlkYXRvcnMiLCJjcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZSIsImRhdGFJZCIsImdldERhdGFJZEJ5Um93SW5kZXgiLCJlZGl0Q2VsbFZhbHVlQ2hhbmdlIiwib25FZGl0VmFsdWVDaGFuZ2UiLCJvbkVkaXRDZWxsVmFsdWVDaGFuZ2UiLCJlZGl0Q2VsbFZhbHVlVmFsaWRhdGUiLCJvbkNyZWF0ZUJsdXIiLCJnZXRFZGl0SXRlbVZhbHVlIiwib25FZGl0Qmx1ciIsImNlbGxUeXBlIiwiaW5wdXRUeXBlIiwiY2VsbFNlbGVjdGlvbkNoYW5nZSIsImNlbGxTZWxlY3QiLCJjb21wb25lbnQiLCJpbnB1dFJlZiIsImlkS2V5UGF0aCIsImluZGV4Iiwib3B0aW9ucyIsImVkaXRWYWx1ZSIsIm9yaWdpbmFsVmFsdWUiLCJjb21wb25lbnRUeXBlIiwic2VsZWN0T3B0aW9ucyIsImZpbmQiLCJvYmoiLCJTdHJpbmciLCJyZXBsYWNlIiwidmFsIiwidG9KUyIsIm1vZGUiLCJjb21wb25lbnREaXNhYmxlZCIsImRpc2FibGVFZGl0aW5nIiwiZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2giLCJnZXRDcmVhdGVJdGVtVmFsdWUiLCJtYXRjaFZhbHVlS2V5UGF0aCIsInJvd0NsYXNzTmFtZXMiLCJleHRyYVJvd0NvdW50IiwicHVzaCIsImluZGV4T2YiLCJyb3dDbGFzc05hbWVHZXR0ZXIiLCJyZXR1cm5EYXRhIiwiaW5mb01lc3NhZ2UiLCJlcnJvck1lc3NhZ2UiLCJ3YXJuaW5nTWVzc2FnZSIsInNjcm9sbFRvUm93Iiwic2Nyb2xsTmV3Um93Iiwic2Nyb2xsSW5FZGl0TW9kZSIsImN1cnJlbnRSb3ciLCJnZXRTZWxlY3RlZEl0ZW1JbmRleCIsImZpcnN0IiwiZm9jdXNUbyIsInByZXZGb2N1c1RvIiwiZm9jdXNUb0xhc3RSb3ciLCJyZWYiLCJmb2N1cyIsImdldENvbXBvbmVudERpc2FibGVkU3RhdGUiLCJmb2N1c1RvRWRpdENlbGwiLCJzZWxlY3RlZFJvd0luZGV4IiwiY29sdW1uSW5kZXgiLCJlbGVtZW50VHlwZXMiLCJjdXJyZW50Q29sdW1uIiwic2V0VGltZW91dCIsInNlbGVjdEFsbEl0ZW1zQ2hhbmdlIiwiaXRlbVNlbGVjdGlvbkNoYW5nZSIsImlubGluZUVkaXQiLCJmaWx0ZXJpbmciLCJpbnRsIiwic2VsZWN0Q29tcG9uZW50T3B0aW9ucyIsImV4dHJhQ29sdW1uIiwicm93U2VsZWN0Q2hlY2tib3hDb2x1bW4iLCJzaG93U2VsZWN0QWxsQ2hlY2tib3giLCJ0YWJJbmRleCIsIndpZHRoIiwiaXNSZXNpemFibGUiLCJpc1NvcnRhYmxlIiwiY2VsbCIsInZhbHVlUmVuZGVyIiwiY2VsbEVkaXQiLCJjZWxsQ3JlYXRlIiwiY2VsbEZpbHRlciIsImhlYWRlciIsImhhbmRsZVNlbGVjdEFsbENoZWNrQm94T25DaGFuZ2UiLCJyb3dJdGVtIiwiaXRlbUlkIiwic2VsZWN0ZWQiLCJoYW5kbGVTZWxlY3Rpb25DaGVja0JveE9uQ2hhbmdlIiwiZm9yRWFjaCIsInZpc2libGVDb2x1bW5LZXkiLCJvcmdDb2wiLCJ2YWx1ZUVtcHR5Q2hlY2tlciIsImdldFZhbHVlRW1wdHlDaGVja2VyIiwiZm9ybWF0IiwiaXNSZXF1aXJlZCIsImNvbHVtbiIsImJhc2VDb2x1bW4iLCJjb2x1bW5GdW5jdGlvbnMiLCJlZGl0IiwiZ2V0SXRlbVZhbHVlIiwib25DZWxsVmFsdWVDaGFuZ2UiLCJvbkNlbGxCbHVyIiwib25FZGl0Q2VsbEJsdXIiLCJvbkNlbGxGb2N1cyIsIm9uRWRpdENlbGxLZXlEb3duIiwiaGFuZGxlQ2VsbFJlZiIsImhhbmRsZUVkaXRDZWxsUmVmIiwib25DcmVhdGVDZWxsQmx1ciIsIm9uQ3JlYXRlQ2VsbEtleURvd24iLCJoYW5kbGVDcmVhdGVDZWxsUmVmIiwiZmlsdGVyIiwiZ2V0RmlsdGVySXRlbVZhbHVlIiwib25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UiLCJjZWxsUHJvcHMiLCJjb2x1bW5DZWxsIiwiY29tcG9uZW50VHlwZVByb3BzIiwiY29sdW1uQ29tcG9uZW50VHlwZSIsInBhZGRpbmciLCJyZW1vdmVOZXdJdGVtIiwiZm9jdXNUb0Vycm9yQ2VsbCIsInJvd1NlbGVjdCIsImN0cmxLZXkiLCJnZXRTZWxlY3Rpb24iLCJyZW1vdmVBbGxSYW5nZXMiLCJwYXJlbnROb2RlIiwicGFyZW50MWNsYXNzIiwiY2xhc3NOYW1lIiwicGFyZW50MmNsYXNzIiwicGFyZW50M2NsYXNzIiwicGFyZW50NGNsYXNzIiwibXVsdGlTZWxlY3QiLCJvblJvd0NsaWNrIiwic3RvcFByb3BhZ2F0aW9uIiwiY29udGV4dE1lbnVYIiwiY2xpZW50WCIsImNvbnRleHRNZW51WSIsImNsaWVudFkiLCJhZGRFdmVudExpc3RlbmVyIiwib25DbGljayIsInNlbGVjdGVkRGF0YSIsInJvd0hlaWdodEdldHRlciIsImV4aXN0aW5nUm93c0luZGV4IiwiaXNTcGVjaWFsIiwiZ2V0Um93SW5kZXgiLCJtZXNzYWdlRGF0YSIsImdldENlbGxNZXNzYWdlcyIsImlzRWRpdGVkIiwiaXNDZWxsRWRpdGVkIiwic3R5bGUiLCJoYW5kbGVDZWxsU2VsZWN0IiwidGV4dEFsaWduIiwiZ2VuZXJhdGVDb2x1bW5zIiwibGVuZ2h0IiwibWFwIiwic29ydENoYW5nZSIsInJlbmRlckNlbGwiLCJtaW5XaWR0aCIsIm1heFdpZHRoIiwiZmxleEdyb3ciLCJmaXhlZCIsImZpeGVkUmlnaHQiLCJhbGxvd0NlbGxzUmVjeWNsaW5nIiwiZGlzcGxheSIsInpJbmRleCIsInBvc2l0aW9uIiwidG9wIiwibGVmdCIsImQiLCJpdGVtIiwiZGl2aWRlciIsInRpdGxlIiwiaGFuZGxlQ29udGV4dE1lbnVJdGVtQ2xpY2siLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImludmFsaWRhdGUiLCJyZW5kZXIiLCJncmlkQ2xhc3NOYW1lIiwiZGlzYWJsZUFjdGlvbkJhciIsInNldEZvY3VzVG8iLCJhY3Rpb25CYXIiLCJhY3Rpb25CYXJSaWdodCIsImFjdGlvbkJhckxlZnQiLCJyZW1vdmluZyIsImRpc2FibGVEcm9wZG93biIsImRpc2FibGVGaWx0ZXJpbmdDb250cm9scyIsImhhbmRsZUFmdGVyQWRkSXRlbSIsImhhbmRsZUFmdGVyRWRpdFByZXNzIiwiaGFuZGxlQWZ0ZXJWYWxpZGF0aW9uRXJyb3IiLCJkcm9wZG93bk1lbnVJdGVtcyIsImNvbHVtblNldHRpbmdzIiwiZ3JpZEhlYWRlciIsInJvd3NDb3VudCIsImNvbnRhaW5lclN0eWxlIiwicmVuZGVyQ29udGV4dE1lbnUiLCJoZWFkZXJIZWlnaHQiLCJmaWx0ZXJSb3dIZWlnaHQiLCJyb3dIZWlnaHQiLCJvbkNvbHVtblJlc2l6ZUVuZENhbGxiYWNrIiwiaGFuZGxlUm93Q2xpY2siLCJzY3JvbGxUb0NvbHVtbiIsInNjcm9sbFRvcCIsImdldFNjcm9sbFRvUm93Iiwib25Sb3dEb3VibGVDbGljayIsIm9uTW91c2VEb3duIiwib25Sb3dNb3VzZUVudGVyIiwib25Sb3dNb3VzZUxlYXZlIiwib25TY3JvbGxTdGFydCIsIm9uU2Nyb2xsRW5kIiwiZ2V0Um93Q2xhc3NOYW1lIiwiaGFuZGxlUm93SGVpZ2h0R2V0dGVyIiwib25Db250ZW50SGVpZ2h0Q2hhbmdlIiwiaGFuZGxlQ29udGV4dE1lbnUiLCJyZW5kZXJDb2x1bW5zIiwiY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsIiwic2F2ZUNvbHVtblNldHRpbmdzIiwiY2hpbGRyZW4iLCJQdXJlQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTtBQUNBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxTQUFTQyxHQUFU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QUUsS0FBS3RSLEtBQUwsQ0FBV3VSLGVBbEI5QjtBQW1CRSxNQUFBLGFBQWEsRUFBRSxLQUFLdlIsS0FBTCxDQUFXd1IsYUFuQjVCO0FBb0JFLE1BQUEsV0FBVyxFQUFFLEtBQUt4UixLQUFMLENBQVd5UixXQXBCMUI7QUFxQkUsTUFBQSxrQkFBa0IsRUFBRSxLQUFLQyxlQXJCM0I7QUFzQkUsTUFBQSxlQUFlLEVBQUUsS0FBSzFSLEtBQUwsQ0FBV3VOLGVBQVgsSUFBOEIsS0FBS29FLHFCQXRCdEQ7QUF1QkUsTUFBQSxxQkFBcUIsRUFBRSxLQUFLM1IsS0FBTCxDQUFXNFIscUJBdkJwQztBQXdCRSxNQUFBLGdCQUFnQixFQUFFLEtBQUtDO0FBeEJ6QixPQTBCRyxLQUFLQyxhQUFMLEVBMUJILENBUkYsRUFvQ0csS0FBSzlSLEtBQUwsQ0FBVy9CLHlCQUFYLElBQ0Msb0JBQUMsbUJBQUQ7QUFDRSxNQUFBLElBQUksRUFBRSxLQUFLK0IsS0FBTCxDQUFXdkMsSUFEbkI7QUFFRSxNQUFBLE9BQU8sRUFBRSxLQUFLdUMsS0FBTCxDQUFXc0IsT0FGdEI7QUFHRSxNQUFBLGNBQWMsRUFBRSxLQUFLdEIsS0FBTCxDQUFXNUIsY0FIN0I7QUFJRSxNQUFBLHdCQUF3QixFQUFFLEtBQUs0QixLQUFMLENBQVcrUix3QkFKdkM7QUFLRSxNQUFBLGtCQUFrQixFQUFFLEtBQUsvUixLQUFMLENBQVdnUztBQUxqQyxNQXJDSixFQTZDRyxLQUFLaFMsS0FBTCxDQUFXaVMsUUE3Q2QsQ0FERjtBQWlERCxHOzs7RUFydENvQnpXLEtBQUssQ0FBQzBXLGEsNENBR0xsVixZO0FBcXRDeEIsZUFBZStDLFFBQWYiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1sb25lbHktaWYsIHByZWZlci10ZW1wbGF0ZSwgcmVhY3QvcmVxdWlyZS1kZWZhdWx0LXByb3BzICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTWFwLCBMaXN0IH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBpbmplY3RJbnRsLCBGb3JtYXR0ZWRNZXNzYWdlIGFzIE0gfSBmcm9tICdyZWFjdC1pbnRsJztcbmltcG9ydCB7IENvbHVtbiwgQ2VsbCB9IGZyb20gJ2ZpeGVkLWRhdGEtdGFibGUtMic7XG5pbXBvcnQgeyBNZW51SXRlbSB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IEljb24gfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1pY29ucyc7XG5pbXBvcnQgU3Bpbm5lciBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1zcGlubmVyJztcbmltcG9ydCBDaGVja2JveCBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1jaGVja2JveCc7XG5pbXBvcnQgJ2ZpeGVkLWRhdGEtdGFibGUtMi9kaXN0L2ZpeGVkLWRhdGEtdGFibGUuY3NzJztcblxuaW1wb3J0IFJlc3BvbnNpdmVGaXhlZERhdGFUYWJsZSBmcm9tICcuL3Jlc3BvbnNpdmUtZml4ZWQtZGF0YS10YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IEhlYWRlckNlbGwgZnJvbSAnLi9oZWFkZXItY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IEFjdGlvbkJhciBmcm9tICcuL2FjdGlvbi1iYXIuY29tcG9uZW50JztcbmltcG9ydCBJbmxpbmVFZGl0Q29udHJvbHMgZnJvbSAnLi9pbmxpbmUtZWRpdC1jb250cm9scy5jb21wb25lbnQnO1xuaW1wb3J0IEZpbHRlcmluZ0NvbnRyb2xzIGZyb20gJy4vZmlsdGVyaW5nLWNvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgRHJvcGRvd25Db250cm9scyBmcm9tICcuL2Ryb3Bkb3duLWNvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgKiBhcyBkYXRhZ3JpZEFjdGlvbnMgZnJvbSAnLi9kYXRhZ3JpZC5hY3Rpb25zJztcbmltcG9ydCBDZWxsVG9vbHRpcCBmcm9tICcuL2NlbGwtdG9vbHRpcC5jb21wb25lbnQnO1xuaW1wb3J0IENvbHVtblNldHRpbmdzTW9kYWwgZnJvbSAnLi9jb2x1bW4tc2V0dGluZ3MvY29sdW1uLXNldHRpbmdzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBwcm9wVHlwZXMsIGRlZmF1bHRQcm9wcyB9IGZyb20gJy4vZGF0YWdyaWQucHJvcHMnO1xuaW1wb3J0IHsgS0VZX0NPREVTIH0gZnJvbSAnLi9kYXRhZ3JpZC5jb25zdGFudHMnO1xuaW1wb3J0IHBhZ2luYXRpb24gZnJvbSAnLi9wYWdpbmF0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9kYXRhZ3JpZC51dGlscyc7XG5pbXBvcnQgR3JpZENvbHVtblNlcnZpY2UgZnJvbSAnLi9jb2x1bW4tc2VydmljZS9jb2x1bW4tc2VydmljZSc7XG5pbXBvcnQgJy4vZGF0YWdyaWQuY29tcG9uZW50LnNjc3MnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUsIG93blByb3BzKSA9PiB7XG4gIGNvbnN0IEdSSUQgPSBvd25Qcm9wcy5ncmlkO1xuICByZXR1cm4ge1xuICAgIGlzQnVzeTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2lzQnVzeSddLCB0cnVlKSxcbiAgICBpc0VkaXRpbmc6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdpc0VkaXRpbmcnXSwgZmFsc2UpLFxuICAgIGlzQ3JlYXRpbmc6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdpc0NyZWF0aW5nJ10sIGZhbHNlKSxcbiAgICBpc0ZpbHRlcmluZzogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdpc0ZpbHRlcmluZyddLCBmYWxzZSksXG4gICAgaXNDb2x1bW5TZXR0aW5nc01vZGFsT3Blbjogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oXG4gICAgICBbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnY29sdW1uU2V0dGluZ3NNb2RhbCcsICdvcGVuJ10sXG4gICAgICBmYWxzZSxcbiAgICApLFxuICAgIHNvcnRDb2x1bW46IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ3NvcnRpbmdEYXRhJywgJ3NvcnRDb2x1bW4nXSwgbnVsbCksXG4gICAgc29ydE9yZGVyOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdzb3J0aW5nRGF0YScsICdzb3J0T3JkZXInXSwgbnVsbCksXG4gICAgdmlzaWJsZUNvbHVtbnM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ3Zpc2libGVDb2x1bW5zJ10sIExpc3QoKSksXG4gICAgY29sdW1uV2lkdGhzOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdjb2x1bW5XaWR0aHMnXSwgTWFwKCkpLFxuICAgIHNlbGVjdGVkQ2VsbDogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZWxlY3RlZENlbGwnXSwgTWFwKCkpLFxuICAgIHNlbGVjdGVkSXRlbXM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2VsZWN0ZWRJdGVtcyddLCBMaXN0KCkpLFxuICAgIGRhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnZGF0YSddLCBMaXN0KCkpLFxuICAgIGVkaXREYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2VkaXREYXRhJ10sIE1hcCgpKSxcbiAgICBjcmVhdGVEYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NyZWF0ZURhdGEnXSwgTGlzdCgpKSxcbiAgICBmaWx0ZXJEYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2ZpbHRlckRhdGEnXSwgTWFwKCkpLFxuICAgIGNlbGxNZXNzYWdlczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjZWxsTWVzc2FnZXMnXSwgTWFwKCkpLFxuICAgIGNyZWF0ZUNlbGxNZXNzYWdlczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjcmVhdGVDZWxsTWVzc2FnZXMnXSwgTWFwKCkpLFxuICAgIGFsbERhdGFTaXplOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2FsbERhdGEnXSwgTGlzdCgpKS5zaXplLFxuICAgIGxhbmd1YWdlOiBVdGlscy5nZXRMYW5ndWFnZShHUklELCBzdGF0ZS51c2VyKSxcbiAgICByZWdpb246IFV0aWxzLmdldFJlZ2lvbihHUklELCBzdGF0ZS51c2VyKSxcbiAgICBkYXRlRm9ybWF0OiBVdGlscy5nZXREYXRlRm9ybWF0KEdSSUQsIHN0YXRlLnVzZXIpLFxuICAgIHRob3VzYW5kU2VwYXJhdG9yOiBVdGlscy5nZXRUaG91c2FuZFNlcGFyYXRvcihHUklELCBzdGF0ZS51c2VyKSxcbiAgICBkZWNpbWFsU2VwYXJhdG9yOiBVdGlscy5nZXREZWNpbWFsU2VwYXJhdG9yKEdSSUQsIHN0YXRlLnVzZXIpLFxuICAgIGZvcmNlUmVmcmVzaFRpbWVzdGFtcDogc3RhdGUuZGF0YWdyaWQuZ2V0KCdmb3JjZVJlZnJlc2gnLCAwKSwgLy8gZm9yY2UgcmUtcmVuZGVyIHdoZW4gY2hhbmdlZFxuICAgIGZvY3VzVHlwZTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2ZvY3VzVHlwZSddLCBNYXAoKSksXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkYXRhZ3JpZEFjdGlvbnM7XG5cbkBwYWdpbmF0aW9uXG5AaW5qZWN0SW50bFxuQGNvbm5lY3QoXG4gIG1hcFN0YXRlVG9Qcm9wcyxcbiAgbWFwRGlzcGF0Y2hUb1Byb3BzLFxuKVxuY2xhc3MgRGF0YUdyaWQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHByb3BUeXBlcztcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjdXJyZW50Um93OiAwLFxuICAgICAgY3VycmVudENvbHVtbjogMCxcbiAgICAgIGNvbnRleHRNZW51T3BlbjogZmFsc2UsXG4gICAgICBjb250ZXh0TWVudVg6IG51bGwsXG4gICAgICBjb250ZXh0TWVudVk6IG51bGwsXG4gICAgfTtcbiAgICB0aGlzLmNlbGxSZWZzID0ge307XG4gICAgdGhpcy5jcmVhdGVDZWxsUmVmcyA9IHt9O1xuICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgPSBmYWxzZTtcbiAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IGZhbHNlOyAvLyBUT0RPOiBIYW5kbGUgZm9jdXNpbmcgd2hlbiB0cnVlXG4gICAgdGhpcy5mb2N1c1RvRXJyb3JDZWxsID0gZmFsc2U7IC8vIFRPRE86IEhhbmRsZSBmb2N1c2luZyB3aGVuIHRydWVcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkRvY3VtZW50Q2xpY2spO1xuICAgIHRoaXMucHJvcHMuaW52YWxpZGF0ZSh0aGlzLnByb3BzLmdyaWQpO1xuICB9XG5cbiAgb25Eb2N1bWVudENsaWNrID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmNvbnRleHRNZW51SXRlbXMpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjb250ZXh0TWVudU9wZW46IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkRvY3VtZW50Q2xpY2spO1xuICB9O1xuXG4gIG9uQ29sdW1uUmVzaXplRW5kQ2FsbGJhY2sgPSAobmV3Q29sdW1uV2lkdGgsIGNvbHVtbktleSkgPT4ge1xuICAgIHRoaXMucHJvcHMucmVzaXplQ29sdW1uKHRoaXMucHJvcHMuZ3JpZCwgY29sdW1uS2V5LCBuZXdDb2x1bW5XaWR0aCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEBwYXJhbSByb3dJbmRleCAoaW50KVxuICAgKiBAcGFyYW0gY29sIChvYmopLiBDb2x1bW4gb2JqZWN0LlxuICAgKiBAcGFyYW0gZS4gT3JpZ2luYWwgS2V5RG93biBldmVudFxuICAgKiBAcGFyYW0gY3JlYXRlIChib29sKS4gSXMgdGhlIGNlbGwgY3JlYXRlIGNlbGwgb3IgZWRpdCBjZWxsP1xuICAgKi9cbiAgb25DZWxsS2V5RG93biA9IChyb3dJbmRleCwgY29sLCBlLCBjcmVhdGUgPSBmYWxzZSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZUFycm93TmF2aWdhdGlvbikge1xuICAgICAgY29uc3QgY2VsbFJlZnMgPSBjcmVhdGUgPyB0aGlzLmNyZWF0ZUNlbGxSZWZzIDogdGhpcy5jZWxsUmVmcztcbiAgICAgIGNvbnN0IGFycm93S2V5cyA9IFtLRVlfQ09ERVMuRE9XTiwgS0VZX0NPREVTLlVQLCBLRVlfQ09ERVMuTEVGVCwgS0VZX0NPREVTLlJJR0hUXTtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgY29sdW1ucywgdmlzaWJsZUNvbHVtbnMsIGdyaWQsIGRhdGEsIG9uTGFzdENlbGxUYWJQcmVzcyxcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3QgZ3JpZENvbHVtbnMgPSBVdGlscy52aXNpYmxlQ29sdW1ucyhjb2x1bW5zLCB2aXNpYmxlQ29sdW1ucyk7XG4gICAgICBjb25zdCBnZXRDb2x1bW5LZXlCeUluZGV4ID0gaSA9PiBVdGlscy5nZXRDb2x1bW5LZXkoZ3JpZENvbHVtbnNbaV0pO1xuICAgICAgY29uc3Qgcm93c1NpemUgPSBkYXRhLnNpemU7XG4gICAgICBjb25zdCBjb2x1bW5LZXkgPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sKTtcbiAgICAgIGxldCBjdXJyZW50Q2VsbCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4fWBdO1xuICAgICAgbGV0IHByb3h5ID0gbnVsbDtcblxuICAgICAgY29uc3QgaXNDdXJzb3JBdFN0YXJ0ID0gKCkgPT4ge1xuICAgICAgICBpZiAoY3VycmVudENlbGwudHlwZSAhPT0gJ3RleHQnKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRDZWxsLnNlbGVjdGlvblN0YXJ0ID09PSAwO1xuICAgICAgfTtcblxuICAgICAgY29uc3QgaXNDdXJzb3JBdEVuZCA9ICgpID0+IHtcbiAgICAgICAgaWYgKGN1cnJlbnRDZWxsLnR5cGUgIT09ICd0ZXh0JykgcmV0dXJuIHRydWU7XG4gICAgICAgIHJldHVybiBjdXJyZW50Q2VsbC5zZWxlY3Rpb25FbmQgPT09IGN1cnJlbnRDZWxsLnZhbHVlLmxlbmd0aDtcbiAgICAgIH07XG5cbiAgICAgIC8vIElmIGN1cnJlbnQgY2VsbCBob2xkcyBhIHJlYWN0LWZsb2F0aW5nLXNlbGVjdCBjb21wb25lbnRcbiAgICAgIGlmIChjdXJyZW50Q2VsbCAmJiAoY3VycmVudENlbGwuc2VsZWN0UmVmIHx8IHR5cGVvZiBjdXJyZW50Q2VsbC5zZWxlY3QgPT09ICdvYmplY3QnKSkge1xuICAgICAgICBwcm94eSA9IGN1cnJlbnRDZWxsO1xuICAgICAgICBjdXJyZW50Q2VsbCA9IHRoaXMuZ2V0U2VsZWN0UmVmKHByb3h5KTtcbiAgICAgIH1cblxuICAgICAgLy8gUHJldmVudHMgdXAvZG93biBhcnJvdyBmcm9tIGNoYW5naW5nIG51bWJlciBmaWVsZCB2YWx1ZVxuICAgICAgaWYgKGFycm93S2V5cy5pbmNsdWRlcyhlLmtleUNvZGUpICYmIGN1cnJlbnRDZWxsLnR5cGUgPT09ICdudW1iZXInKSBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuICAgICAgICBjYXNlIEtFWV9DT0RFUy5FTlRFUjpcbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuRVNDOiB7XG4gICAgICAgICAgaWYgKGNyZWF0ZSAmJiBlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5FTlRFUikge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5hZGROZXdJdGVtKGdyaWQsIFV0aWxzLmdldENvbHVtbkRlZmF1bHRWYWx1ZXMoY29sdW1ucykpO1xuICAgICAgICAgICAgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgY3VycmVudENlbGwuc2VsZWN0KCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuRE9XTjoge1xuICAgICAgICAgIGxldCBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4ICsgMX1gXTtcblxuICAgICAgICAgIC8vIFByZXZlbnRzIG1lbnUgZnJvbSBvcGVuaW5nXG4gICAgICAgICAgaWYgKHByb3h5ICYmIHByb3h5LnNlbGVjdFJlZiAmJiAhcHJveHkuc2VsZWN0UmVmLnN0YXRlLm1lbnVJc09wZW4pIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmICghbmV4dEVsZW1lbnQpIGJyZWFrO1xuICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSB0aGlzLmdldFNlbGVjdFJlZihuZXh0RWxlbWVudCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubW92ZUNlbGxGb2N1cyhuZXh0RWxlbWVudCwgcm93SW5kZXggKyAxLCAtMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuVVA6IHtcbiAgICAgICAgICBsZXQgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2NvbHVtbktleX1fJHtyb3dJbmRleCAtIDF9YF07XG5cbiAgICAgICAgICAvLyBQcmV2ZW50cyBtZW51IGZyb20gb3BlbmluZ1xuICAgICAgICAgIGlmIChwcm94eSAmJiBwcm94eS5zZWxlY3RSZWYgJiYgIXByb3h5LnNlbGVjdFJlZi5zdGF0ZS5tZW51SXNPcGVuKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAoIW5leHRFbGVtZW50KSBicmVhaztcbiAgICAgICAgICAgIG5leHRFbGVtZW50ID0gdGhpcy5nZXRTZWxlY3RSZWYobmV4dEVsZW1lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm1vdmVDZWxsRm9jdXMobmV4dEVsZW1lbnQsIHJvd0luZGV4IC0gMSwgLTEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLlRBQjpcbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuUklHSFQ6XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLkxFRlQ6IHtcbiAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuUklHSFQgJiYgIWlzQ3Vyc29yQXRFbmQoKSkgYnJlYWs7XG4gICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLkxFRlQgJiYgIWlzQ3Vyc29yQXRTdGFydCgpKSBicmVhaztcblxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgIGxldCBjb2x1bW5JbmQgPSBncmlkQ29sdW1ucy5maW5kSW5kZXgoYyA9PiBjLnZhbHVlS2V5UGF0aC5qb2luKCcvJykgPT09IGNvbHVtbktleSk7XG4gICAgICAgICAgaWYgKGNvbHVtbkluZCAhPT0gLTEpIHtcbiAgICAgICAgICAgIGxldCBkaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICBsZXQgbmV4dEVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgbGV0IHJvd0luZCA9IHJvd0luZGV4O1xuICAgICAgICAgICAgd2hpbGUgKGRpc2FibGVkKSB7XG4gICAgICAgICAgICAgIC8vIE1vdmluZyB0byB0aGUgbGVmdFxuICAgICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuTEVGVCB8fCAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuVEFCICYmIGUuc2hpZnRLZXkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbHVtbkluZCAtIDEgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kIC09IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyb3dJbmQgLSAxID49IDApIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCA9IGdyaWRDb2x1bW5zLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgICByb3dJbmQgLT0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE1vdmluZyB0byB0aGUgcmlnaHRcbiAgICAgICAgICAgICAgICBpZiAoY29sdW1uSW5kICsgMSA8IGdyaWRDb2x1bW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kICs9IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyb3dJbmQgKyAxIDwgcm93c1NpemUpIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCA9IDA7XG4gICAgICAgICAgICAgICAgICByb3dJbmQgKz0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJvd0luZCArIDEgPT09IHJvd3NTaXplKSB7XG4gICAgICAgICAgICAgICAgICAvLyBJZiB0cnlpbmcgdG8gc2VsZWN0IGEgcm93LCB3aGVuIHRoZXJlIGlzIG5vbmU6XG4gICAgICAgICAgICAgICAgICBpZiAob25MYXN0Q2VsbFRhYlByZXNzICYmIGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLlRBQikgb25MYXN0Q2VsbFRhYlByZXNzKGUpO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2dldENvbHVtbktleUJ5SW5kZXgoY29sdW1uSW5kKX1fJHtyb3dJbmR9YF07XG5cbiAgICAgICAgICAgICAgLy8gSWYgd2UgY2Fubm90IGZvY3VzIG9uIHRoZSBuZXh0IGVsZW1lbnQgd2hpbGUgbW92aW5nIHRvIHRoZSByaWdodFxuICAgICAgICAgICAgICBpZiAoIW5leHRFbGVtZW50ICYmIGUua2V5Q29kZSAhPT0gS0VZX0NPREVTLkxFRlQpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSdyZSBub3QgeWV0IGluIHRoZSBsYXN0IGZvY3VzYWJsZSBjb2x1bW5cbiAgICAgICAgICAgICAgICBpZiAoY29sdW1uSW5kIDw9IGdyaWRDb2x1bW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgd2hpbGUgKGNvbHVtbkluZCA8PSBncmlkQ29sdW1ucy5sZW5ndGggJiYgIW5leHRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHRFbGVtZW50ID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtnZXRDb2x1bW5LZXlCeUluZGV4KGNvbHVtbkluZCl9XyR7cm93SW5kfWBdO1xuICAgICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgKz0gMTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBJZiB3ZSBhcmUgaW4gdGhlIGxhc3QgY29sdW1uIGFuZCB3ZSBkb24ndCBoYXZlIGFuIGVsZW1lbnQgdG8gZm9jdXMgb24sXG4gICAgICAgICAgICAgICAgICAgIC8vIHdlIG11c3QgbW92ZSB0byB0aGUgbmV4dCByb3cgKGlmIHBvc3NpYmxlKVxuICAgICAgICAgICAgICAgICAgICBpZiAoIW5leHRFbGVtZW50ICYmIGNvbHVtbkluZCA9PT0gZ3JpZENvbHVtbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gSWYgdHJ5aW5nIHRvIHNlbGVjdCBhIHJvdywgd2hlbiB0aGVyZSBpcyBub25lOlxuICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3dJbmQgKyAxID09PSByb3dzU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9uTGFzdENlbGxUYWJQcmVzcyAmJiBlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5UQUIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25MYXN0Q2VsbFRhYlByZXNzKGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgY29sdW1uSW5kID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICByb3dJbmQgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgICBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Z2V0Q29sdW1uS2V5QnlJbmRleChjb2x1bW5JbmQpfV8ke3Jvd0luZH1gXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSBjYW5ub3QgZm9jdXMgb24gdGhlIG5leHQgZWxlbWVudCB3aGlsZSBtb3ZpbmcgdG8gdGhlIGxlZnRcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICghbmV4dEVsZW1lbnQgJiYgZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuTEVGVCkge1xuICAgICAgICAgICAgICAgIHdoaWxlIChjb2x1bW5JbmQgPiAwICYmICFuZXh0RWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kIC09IDE7XG4gICAgICAgICAgICAgICAgICBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Z2V0Q29sdW1uS2V5QnlJbmRleChjb2x1bW5JbmQpfV8ke3Jvd0luZH1gXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gaWYgbm8gZWxlbWVudCB3YXMgZm91bmQsIHRyeSBtb3ZpbmcgdG8gcHJldmlvdXMgcm93XG4gICAgICAgICAgICAgICAgLy8gKG5lZWRlZCBpbiBjYXNlIGZpcnN0IGNvbHVtbiBpcyBub3QgZWRpdGFibGUgZS5nLiBhbiBFeHRyYUNvbHVtbilcbiAgICAgICAgICAgICAgICBpZiAocm93SW5kID4gMCAmJiAhbmV4dEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCA9IGdyaWRDb2x1bW5zLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgICByb3dJbmQgLT0gMTtcbiAgICAgICAgICAgICAgICAgIG5leHRFbGVtZW50ID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtnZXRDb2x1bW5LZXlCeUluZGV4KGNvbHVtbkluZCl9XyR7cm93SW5kfWBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBkaXNhYmxlZCA9IG5leHRFbGVtZW50ID8gbmV4dEVsZW1lbnQuZGlzYWJsZWQgOiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZGlzYWJsZWQgJiYgbmV4dEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXh0RWxlbWVudC5zZWxlY3QgPT09ICdvYmplY3QnIHx8IG5leHRFbGVtZW50LnNlbGVjdFJlZikge1xuICAgICAgICAgICAgICAgIG5leHRFbGVtZW50ID0gdGhpcy5nZXRTZWxlY3RSZWYobmV4dEVsZW1lbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMubW92ZUNlbGxGb2N1cyhuZXh0RWxlbWVudCwgcm93SW5kLCBjb2x1bW5JbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBvbkVkaXRDZWxsS2V5RG93biA9IChyb3dJbmRleCwgY29sKSA9PiAoZSkgPT4ge1xuICAgIHRoaXMub25DZWxsS2V5RG93bihyb3dJbmRleCwgY29sLCBlKTtcbiAgfTtcblxuICBvbkNyZWF0ZUNlbGxLZXlEb3duID0gKHJvd0luZGV4LCBjb2wpID0+IChlKSA9PiB7XG4gICAgdGhpcy5vbkNlbGxLZXlEb3duKHJvd0luZGV4LCBjb2wsIGUsIHRydWUpO1xuICB9O1xuXG4gIG9uRmlsdGVyQ2VsbFZhbHVlQ2hhbmdlID0gKGNvbCwgdmFsdWVQYXJzZXIpID0+IChldmVudE9yRGF0YSkgPT4ge1xuICAgIGxldCByYXdWYWx1ZTtcbiAgICAvLyBldmVudE9yRGF0YSBjYW4gYmUgaW5wdXQgb25DaGFuZ2UgZXZlbnQsIHJlYWN0LXNlbGVjdCBvbkNoYW5nZSBvciByZWFjdC1kYXktcGlja2VyIG9uQ2hhbmdlXG4gICAgaWYgKGV2ZW50T3JEYXRhKSB7XG4gICAgICBpZiAoZXZlbnRPckRhdGEudGFyZ2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YS50YXJnZXQudmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50T3JEYXRhLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YS52YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGE7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlID0gdmFsdWVQYXJzZXIocmF3VmFsdWUpO1xuICAgIHRoaXMucHJvcHMuZmlsdGVyQ2VsbFZhbHVlQ2hhbmdlKHRoaXMucHJvcHMuZ3JpZCwgdGhpcy5wcm9wcy5jb2x1bW5zLCBjb2wsIHZhbHVlKTtcbiAgfTtcblxuICBvbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGV2ZW50T3JEYXRhKSA9PiB7XG4gICAgbGV0IHJhd1ZhbHVlO1xuICAgIC8vIGV2ZW50T3JEYXRhIGNhbiBiZSBpbnB1dCBvbkNoYW5nZSBldmVudCwgcmVhY3Qtc2VsZWN0IG9uQ2hhbmdlIG9yIHJlYWN0LWRheS1waWNrZXIgb25DaGFuZ2VcbiAgICBpZiAoZXZlbnRPckRhdGEpIHtcbiAgICAgIGlmIChldmVudE9yRGF0YS50YXJnZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnRPckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSB2YWx1ZVBhcnNlcihyYXdWYWx1ZSk7XG5cbiAgICB0aGlzLnByb3BzLmNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIHJvd0luZGV4LCBjb2wudmFsdWVLZXlQYXRoLCB2YWx1ZSk7XG4gICAgaWYgKGNvbC5vbkNyZWF0ZVZhbHVlQ2hhbmdlKSB7XG4gICAgICBjb2wub25DcmVhdGVWYWx1ZUNoYW5nZSh2YWx1ZSwgY29sLnZhbHVlS2V5UGF0aCwgcm93SW5kZXgpO1xuICAgIH1cbiAgICBpZiAoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlICYmIHZhbHVlID09PSBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubWF0Y2hWYWx1ZSkge1xuICAgICAgLy8gQ2FsbCBzcGVjaWFsIHBhaXJlZCB2YWx1ZSBjaGFuZ2Ugb24gb3RoZXIgY2VsbCBpZiB2YWx1ZSBtYXRjaGVzXG4gICAgICB0aGlzLm9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlKFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgeyB2YWx1ZUtleVBhdGg6IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5uZXdWYWx1ZUtleVBhdGggfSxcbiAgICAgICAgdiA9PiB2LFxuICAgICAgKShjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY29sLnZhbGlkYXRvcnMpIHtcbiAgICAgIHRoaXMucHJvcHMuY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUoXG4gICAgICAgIHRoaXMucHJvcHMuZ3JpZCxcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIGNvbC52YWx1ZUtleVBhdGgsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBjb2wudmFsaWRhdG9ycyxcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIG9uRWRpdENlbGxWYWx1ZUNoYW5nZSA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGV2ZW50T3JEYXRhKSA9PiB7XG4gICAgY29uc3QgZGF0YUlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICBsZXQgcmF3VmFsdWU7XG4gICAgLy8gZXZlbnRPckRhdGEgY2FuIGJlIGlucHV0IG9uQ2hhbmdlIGV2ZW50LCByZWFjdC1zZWxlY3Qgb25DaGFuZ2Ugb3IgcmVhY3QtZGF5LXBpY2tlciBvbkNoYW5nZVxuICAgIGlmIChldmVudE9yRGF0YSkge1xuICAgICAgaWYgKGV2ZW50T3JEYXRhLnRhcmdldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChldmVudE9yRGF0YS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCB2YWx1ZSA9IHZhbHVlUGFyc2VyKHJhd1ZhbHVlKTtcbiAgICB0aGlzLnByb3BzLmVkaXRDZWxsVmFsdWVDaGFuZ2UodGhpcy5wcm9wcy5ncmlkLCBkYXRhSWQsIGNvbC52YWx1ZUtleVBhdGgsIHZhbHVlKTtcbiAgICBpZiAoY29sLm9uRWRpdFZhbHVlQ2hhbmdlKSB7XG4gICAgICBjb2wub25FZGl0VmFsdWVDaGFuZ2UodmFsdWUsIGNvbC52YWx1ZUtleVBhdGgsIHJvd0luZGV4LCBkYXRhSWQpO1xuICAgIH1cbiAgICBpZiAoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlICYmIHZhbHVlID09PSBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubWF0Y2hWYWx1ZSkge1xuICAgICAgLy8gQ2FsbCBzcGVjaWFsIHBhaXJlZCB2YWx1ZSBjaGFuZ2Ugb24gb3RoZXIgY2VsbCBpZiB2YWx1ZSBtYXRjaGVzXG4gICAgICB0aGlzLm9uRWRpdENlbGxWYWx1ZUNoYW5nZShcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIHsgdmFsdWVLZXlQYXRoOiBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWVLZXlQYXRoIH0sXG4gICAgICAgIHYgPT4gdixcbiAgICAgICkoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm5ld1ZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNvbC52YWxpZGF0b3JzKSB7XG4gICAgICB0aGlzLnByb3BzLmVkaXRDZWxsVmFsdWVWYWxpZGF0ZShcbiAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICBkYXRhSWQsXG4gICAgICAgIGNvbC52YWx1ZUtleVBhdGgsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBjb2wudmFsaWRhdG9ycyxcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIG9uQ3JlYXRlQ2VsbEJsdXIgPSAocm93SW5kZXgsIGNvbCwgdmFsdWVQYXJzZXIpID0+IChlKSA9PiB7XG4gICAgaWYgKGNvbC5vbkNyZWF0ZUJsdXIpIHtcbiAgICAgIGxldCB2YWx1ZSA9IGUgJiYgZS50YXJnZXQgJiYgZS50YXJnZXQudmFsdWUgIT09IHVuZGVmaW5lZFxuICAgICAgICA/IGUudGFyZ2V0LnZhbHVlXG4gICAgICAgIDogdGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpO1xuICAgICAgaWYgKHZhbHVlUGFyc2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZVBhcnNlcih2YWx1ZSk7XG4gICAgICB9XG4gICAgICBjb2wub25DcmVhdGVCbHVyKHZhbHVlLCByb3dJbmRleCk7XG4gICAgfVxuICB9O1xuXG4gIG9uRWRpdENlbGxCbHVyID0gKHJvd0luZGV4LCBjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZSkgPT4ge1xuICAgIGlmIChjb2wub25FZGl0Qmx1cikge1xuICAgICAgbGV0IHZhbHVlID0gZSAmJiBlLnRhcmdldCAmJiBlLnRhcmdldC52YWx1ZSAhPT0gdW5kZWZpbmVkXG4gICAgICAgID8gZS50YXJnZXQudmFsdWVcbiAgICAgICAgOiB0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCk7XG4gICAgICBpZiAodmFsdWVQYXJzZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlUGFyc2VyKHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGRhdGFJZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgICBjb2wub25FZGl0Qmx1cih2YWx1ZSwgcm93SW5kZXgsIGRhdGFJZCk7XG4gICAgfVxuICB9O1xuXG4gIG9uQ2VsbEZvY3VzID0gKGNlbGxUeXBlLCBpbnB1dFR5cGUsIHJvd0luZGV4LCBjb2x1bW5LZXkpID0+IChlKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgY2VsbFNlbGVjdGlvbkNoYW5nZSwgY2VsbFNlbGVjdCwgZ3JpZCwgaXNFZGl0aW5nLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChpc0VkaXRpbmcpIHJldHVybjtcblxuICAgIGlmIChpbnB1dFR5cGUgPT09ICdudW1iZXInKSB7XG4gICAgICBlLnRhcmdldC5zZWxlY3QoKTtcbiAgICB9XG4gICAgaWYgKGNlbGxUeXBlID09PSAnZWRpdCcgJiYgY2VsbFNlbGVjdCkge1xuICAgICAgY2VsbFNlbGVjdGlvbkNoYW5nZShcbiAgICAgICAgZ3JpZCxcbiAgICAgICAgTWFwKHtcbiAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICBjb2x1bW5LZXksXG4gICAgICAgIH0pLFxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgZ2V0U2VsZWN0UmVmID0gKGNvbXBvbmVudCkgPT4ge1xuICAgIGlmICghY29tcG9uZW50KSByZXR1cm4gbnVsbDtcbiAgICBpZiAoY29tcG9uZW50LnNlbGVjdCAmJiBjb21wb25lbnQuc2VsZWN0LmlucHV0UmVmKSB7XG4gICAgICByZXR1cm4gY29tcG9uZW50LnNlbGVjdC5pbnB1dFJlZjtcbiAgICB9XG4gICAgaWYgKGNvbXBvbmVudC5zZWxlY3QgJiYgY29tcG9uZW50LnNlbGVjdC5zZWxlY3QpIHtcbiAgICAgIHJldHVybiBjb21wb25lbnQuc2VsZWN0LnNlbGVjdC5pbnB1dFJlZjtcbiAgICB9XG4gICAgaWYgKGNvbXBvbmVudC5zZWxlY3RSZWYgJiYgY29tcG9uZW50LnNlbGVjdFJlZi5zZWxlY3Quc2VsZWN0KSB7XG4gICAgICByZXR1cm4gY29tcG9uZW50LnNlbGVjdFJlZi5zZWxlY3Quc2VsZWN0LmlucHV0UmVmO1xuICAgIH1cbiAgICByZXR1cm4gY29tcG9uZW50LnNlbGVjdFJlZi5zZWxlY3QuaW5wdXRSZWY7XG4gIH07XG5cbiAgZ2V0RGF0YUlkQnlSb3dJbmRleCA9IHJvd0luZGV4ID0+IHRoaXMucHJvcHMuZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLnRoaXMucHJvcHMuZ3JpZC5pZEtleVBhdGhdKTtcblxuICBnZXRTZWxlY3RlZEl0ZW1JbmRleCA9IChpZCkgPT4ge1xuICAgIGlmICghaWQpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnByb3BzLmRhdGEuZmluZEluZGV4KHYgPT4gdi5nZXRJbih0aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoKSA9PT0gaWQpO1xuICAgIHJldHVybiBpbmRleCA9PT0gLTEgPyB1bmRlZmluZWQgOiBpbmRleDtcbiAgfTtcblxuICBnZXRFZGl0SXRlbVZhbHVlID0gKHJvd0luZGV4LCBjb2wsIG9wdGlvbnMgPSBbXSkgPT4ge1xuICAgIC8vIEdldCB0aGUgdmFsdWUgdG8gZGlzcGxheSBpbiBlZGl0IGNlbGxcbiAgICBjb25zdCBpZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgY29uc3QgZWRpdFZhbHVlID0gdGhpcy5wcm9wcy5lZGl0RGF0YS5nZXRJbihbaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdLCB1bmRlZmluZWQpO1xuICAgIGxldCBvcmlnaW5hbFZhbHVlO1xuICAgIGlmIChlZGl0VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgb3JpZ2luYWxWYWx1ZSA9IHRoaXMucHJvcHMuZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdLCAnJyk7XG4gICAgfSBlbHNlIGlmIChlZGl0VmFsdWUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVmFsdWUgaXMgZm91bmQgZnJvbSBlZGl0RGF0YVxuICAgICAgLy8gRm9ybWF0IGJ5IGNvbXBvbmVudCB0eXBlXG4gICAgICBzd2l0Y2ggKGNvbC5jb21wb25lbnRUeXBlKSB7XG4gICAgICAgIGNhc2UgJ211bHRpc2VsZWN0JzpcbiAgICAgICAgY2FzZSAnc2VsZWN0JzpcbiAgICAgICAgICByZXR1cm4gb3B0aW9ucy5zZWxlY3RPcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gZWRpdFZhbHVlKTtcbiAgICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgICAgcmV0dXJuIG9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSBlZGl0VmFsdWUpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiBlZGl0VmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvcmlnaW5hbFZhbHVlID09PSBudWxsIHx8IG9yaWdpbmFsVmFsdWUgPT09IHVuZGVmaW5lZCB8fCBvcmlnaW5hbFZhbHVlID09PSAnJykge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICAvLyBSZXR1cm4gdmFsdWUgZnJvbSBvcmlnaW5hbCBkYXRhLCBiZWNhdXNlIGVkaXREYXRhIGlzIG5vdCBhdmFpbGFibGVcbiAgICAvLyBGb3JtYXQgYnkgY29tcG9uZW50IHR5cGVcbiAgICBzd2l0Y2ggKGNvbC5jb21wb25lbnRUeXBlKSB7XG4gICAgICBjYXNlICdmbG9hdCc6IHtcbiAgICAgICAgaWYgKFN0cmluZyhvcmlnaW5hbFZhbHVlKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgcmV0dXJuIFN0cmluZyhvcmlnaW5hbFZhbHVlKS5yZXBsYWNlKCcuJywgdGhpcy5wcm9wcy5kZWNpbWFsU2VwYXJhdG9yKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3JpZ2luYWxWYWx1ZTtcbiAgICAgIH1cbiAgICAgIGNhc2UgJ211bHRpc2VsZWN0JzpcbiAgICAgIGNhc2UgJ3NlbGVjdCc6XG4gICAgICAgIHJldHVybiBvcHRpb25zLnNlbGVjdE9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSBvcmlnaW5hbFZhbHVlKTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICByZXR1cm4gb3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IG9yaWdpbmFsVmFsdWUpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIG9yaWdpbmFsVmFsdWU7XG4gICAgfVxuICB9O1xuXG4gIGdldENyZWF0ZUl0ZW1WYWx1ZSA9IChyb3dJbmRleCwgY29sLCBvcHRpb25zID0gW10pID0+IHtcbiAgICBjb25zdCB2YWwgPSB0aGlzLnByb3BzLmNyZWF0ZURhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSwgJycpO1xuICAgIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgaWYgKGNvbC5jb21wb25lbnRUeXBlID09PSAnc2VsZWN0JyB8fCBjb2wuY29tcG9uZW50VHlwZSA9PT0gJ211bHRpc2VsZWN0Jykge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuc2VsZWN0T3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IHZhbCk7XG4gICAgfVxuICAgIGlmIChbJ2Jvb2xlYW4nXS5pbmNsdWRlcyhjb2wuY29tcG9uZW50VHlwZSkpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gdmFsKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbDtcbiAgfTtcblxuICBnZXRGaWx0ZXJJdGVtVmFsdWUgPSAoY29sLCBvcHRpb25zID0gW10pID0+IHtcbiAgICBjb25zdCB2YWwgPSB0aGlzLnByb3BzLmZpbHRlckRhdGEuZ2V0KFV0aWxzLmdldENvbHVtbktleShjb2wpLCAnJyk7XG4gICAgaWYgKHZhbCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBpZiAoY29sLmNvbXBvbmVudFR5cGUgPT09ICdzZWxlY3QnKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5zZWxlY3RPcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gdmFsKTtcbiAgICB9XG4gICAgaWYgKFsnY2hlY2tib3gnLCAnYm9vbGVhbiddLmluY2x1ZGVzKGNvbC5jb21wb25lbnRUeXBlKSkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSB2YWwpO1xuICAgIH1cbiAgICBpZiAoY29sLmNvbXBvbmVudFR5cGUgPT09ICdtdWx0aXNlbGVjdCcpIHtcbiAgICAgIC8vIHNlc3Npb24gc3RvcmFnZSBjb250ZW50IGlzIGNvbnZlcnRlZCB0byBpbW11dGFibGUgYW5kIG11bHRpc2VsZWN0XG4gICAgICAvLyBmaWx0ZXJzIGlzIHRoZW4gbGlzdCBvdGhlcndpc2UgYXJyYXlcbiAgICAgIHJldHVybiB2YWwgJiYgdmFsLnRvSlMgPyB2YWwudG9KUygpIDogdmFsIHx8IFtdO1xuICAgIH1cbiAgICByZXR1cm4gdmFsO1xuICB9O1xuXG4gIGdldENvbXBvbmVudERpc2FibGVkU3RhdGUgPSAocm93SW5kZXgsIGNvbCwgbW9kZSkgPT4ge1xuICAgIGxldCBjb21wb25lbnREaXNhYmxlZCA9ICEhY29sLmRpc2FibGVFZGl0aW5nO1xuICAgIC8vIGNoZWNrIGlmIGNvbXBvbmVudCBpcyBkaXNhYmxlZCBieSBvdGhlciBjb2x1bW4gZGF0YVxuICAgIGlmICghY29tcG9uZW50RGlzYWJsZWQgJiYgY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoKSB7XG4gICAgICBpZiAobW9kZSA9PT0gJ2NyZWF0ZScpIHtcbiAgICAgICAgY29tcG9uZW50RGlzYWJsZWQgPSB0aGlzLmdldENyZWF0ZUl0ZW1WYWx1ZShyb3dJbmRleCwge1xuICAgICAgICAgIHZhbHVlS2V5UGF0aDogY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWVLZXlQYXRoLFxuICAgICAgICB9KSA9PT0gY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb21wb25lbnREaXNhYmxlZCA9IHRoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwge1xuICAgICAgICAgIHZhbHVlS2V5UGF0aDogY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWVLZXlQYXRoLFxuICAgICAgICB9KSA9PT0gY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb21wb25lbnREaXNhYmxlZDtcbiAgfTtcblxuICBnZXRSb3dDbGFzc05hbWUgPSAocm93SW5kZXgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBncmlkLCBpc0NyZWF0aW5nLCBpc0VkaXRpbmcsIGNyZWF0ZURhdGEsIHNlbGVjdGVkSXRlbXMsIGRhdGEsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgcm93Q2xhc3NOYW1lcyA9IFsnb2MtZGF0YWdyaWQtcm93J107XG4gICAgbGV0IGV4dHJhUm93Q291bnQgPSAwOyAvLyBob3cgbWFueSByb3dzIHRvIGlnbm9yZSBmcm9tIHRvcCwgbmV3ICsgZmlsdGVyIHJvd3NcbiAgICBpZiAoaXNDcmVhdGluZykgZXh0cmFSb3dDb3VudCA9IGNyZWF0ZURhdGEuc2l6ZTtcbiAgICBpZiAoaXNDcmVhdGluZykge1xuICAgICAgaWYgKHJvd0luZGV4IDw9IGV4dHJhUm93Q291bnQgLSAxKSB7XG4gICAgICAgIHJvd0NsYXNzTmFtZXMucHVzaCgnb2MtZGF0YWdyaWQtcm93LW5ldycpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNFZGl0aW5nKSB7XG4gICAgICByb3dDbGFzc05hbWVzLnB1c2goJ29jLWRhdGFncmlkLXJvdy1lZGl0Jyk7XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgaWYgcm93IGlzIHNlbGVjdGVkXG4gICAgaWYgKCFpc0NyZWF0aW5nICYmICFpc0VkaXRpbmcgJiYgKHNlbGVjdGVkSXRlbXMgJiYgZ3JpZC5pZEtleVBhdGgpKSB7XG4gICAgICBpZiAoc2VsZWN0ZWRJdGVtcy5pbmRleE9mKGRhdGEuZ2V0SW4oW3Jvd0luZGV4IC0gZXh0cmFSb3dDb3VudCwgLi4uZ3JpZC5pZEtleVBhdGhdKSkgIT09IC0xKSB7XG4gICAgICAgIHJvd0NsYXNzTmFtZXMucHVzaCgnaXMtc2VsZWN0ZWQnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5wcm9wcy5yb3dDbGFzc05hbWVHZXR0ZXIpIHtcbiAgICAgIHJldHVybiByb3dDbGFzc05hbWVzLmpvaW4oJyAnKSArICcgJyArIHRoaXMucHJvcHMucm93Q2xhc3NOYW1lR2V0dGVyKHJvd0luZGV4KTtcbiAgICB9XG4gICAgcmV0dXJuIHJvd0NsYXNzTmFtZXMuam9pbignICcpO1xuICB9O1xuXG4gIGdldENlbGxNZXNzYWdlcyA9IChyb3dJbmRleCwgY29sLCBjZWxsVHlwZSkgPT4ge1xuICAgIGNvbnN0IHJldHVybkRhdGEgPSB7fTtcbiAgICBpZiAoIXRoaXMucHJvcHMuZ3JpZC5pZEtleVBhdGggfHwgIWNvbC52YWx1ZUtleVBhdGgpIHtcbiAgICAgIHJldHVybiByZXR1cm5EYXRhO1xuICAgIH1cbiAgICBsZXQgaW5mb01lc3NhZ2U7XG4gICAgbGV0IGVycm9yTWVzc2FnZTtcbiAgICBsZXQgd2FybmluZ01lc3NhZ2U7XG4gICAgaWYgKGNlbGxUeXBlID09PSAnY3JlYXRlJykge1xuICAgICAgaW5mb01lc3NhZ2UgPSB0aGlzLnByb3BzLmNyZWF0ZUNlbGxNZXNzYWdlcy5nZXRJbihbJ2luZm8nLCByb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgZXJyb3JNZXNzYWdlID0gdGhpcy5wcm9wcy5jcmVhdGVDZWxsTWVzc2FnZXMuZ2V0SW4oWydlcnJvcicsIHJvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgICB3YXJuaW5nTWVzc2FnZSA9IHRoaXMucHJvcHMuY3JlYXRlQ2VsbE1lc3NhZ2VzLmdldEluKFtcbiAgICAgICAgJ3dhcm5pbmcnLFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgLi4uY29sLnZhbHVlS2V5UGF0aCxcbiAgICAgIF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgICBpbmZvTWVzc2FnZSA9IHRoaXMucHJvcHMuY2VsbE1lc3NhZ2VzLmdldEluKFsnaW5mbycsIGlkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgICBlcnJvck1lc3NhZ2UgPSB0aGlzLnByb3BzLmNlbGxNZXNzYWdlcy5nZXRJbihbJ2Vycm9yJywgaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgIHdhcm5pbmdNZXNzYWdlID0gdGhpcy5wcm9wcy5jZWxsTWVzc2FnZXMuZ2V0SW4oWyd3YXJuaW5nJywgaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICB9XG4gICAgaWYgKGluZm9NZXNzYWdlKSB7XG4gICAgICByZXR1cm5EYXRhLmluZm9NZXNzYWdlID0gaW5mb01lc3NhZ2U7XG4gICAgfVxuICAgIGlmIChlcnJvck1lc3NhZ2UpIHtcbiAgICAgIHJldHVybkRhdGEuZXJyb3JNZXNzYWdlID0gZXJyb3JNZXNzYWdlO1xuICAgIH1cbiAgICBpZiAod2FybmluZ01lc3NhZ2UpIHtcbiAgICAgIHJldHVybkRhdGEud2FybmluZ01lc3NhZ2UgPSB3YXJuaW5nTWVzc2FnZTtcbiAgICB9XG4gICAgcmV0dXJuIHJldHVybkRhdGE7XG4gIH07XG5cbiAgZ2V0U2Nyb2xsVG9Sb3cgPSAoKSA9PiB7XG4gICAgbGV0IHNjcm9sbFRvUm93O1xuICAgIGlmICh0aGlzLnByb3BzLmlzQ3JlYXRpbmcgJiYgIXRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwpIHJldHVybiBzY3JvbGxUb1JvdztcbiAgICBpZiAodGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCkge1xuICAgICAgY29uc3Qgc2Nyb2xsTmV3Um93ID0gdGhpcy5wcm9wcy5jcmVhdGVEYXRhLnNpemUgLSAxO1xuICAgICAgaWYgKHNjcm9sbE5ld1JvdyA+PSAwKSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gc2Nyb2xsTmV3Um93O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5pc0VkaXRpbmcgJiYgIXRoaXMucHJvcHMuc2Nyb2xsSW5FZGl0TW9kZSkge1xuICAgICAgICBzY3JvbGxUb1JvdyA9IHRoaXMuc3RhdGUuY3VycmVudFJvdztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gdGhpcy5wcm9wcy5zY3JvbGxUb1JvdzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgfVxuICAgICAgaWYgKHNjcm9sbFRvUm93ID09PSB1bmRlZmluZWQgJiYgdGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLnNpemUgPiAwKSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gdGhpcy5nZXRTZWxlY3RlZEl0ZW1JbmRleCh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuZmlyc3QoKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzY3JvbGxUb1JvdztcbiAgfTtcblxuICBzZXRGb2N1c1RvID0gKGZvY3VzVG8pID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5pc0VkaXRpbmcgfHwgdGhpcy5wcm9wcy5pc0NyZWF0aW5nKSB7XG4gICAgICBpZiAoZm9jdXNUbyAmJiBmb2N1c1RvLmdldCgndHlwZScpICYmIGZvY3VzVG8gIT09IHRoaXMucHJldkZvY3VzVG8pIHtcbiAgICAgICAgdGhpc1tmb2N1c1RvLmdldCgndHlwZScpXSA9IHRydWU7XG4gICAgICAgIHRoaXMuZm9jdXNUb0xhc3RSb3cgPSBmb2N1c1RvLmdldCgnZm9jdXNUb0xhc3RSb3cnKTtcbiAgICAgICAgdGhpcy5wcmV2Rm9jdXNUbyA9IGZvY3VzVG87XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZUNlbGxTZWxlY3QgPSAoY2VsbFR5cGUsIHJvd0luZGV4LCBjb2x1bW5LZXkpID0+ICgpID0+IHtcbiAgICBpZiAoY2VsbFR5cGUgPT09ICd2aWV3JyAmJiB0aGlzLnByb3BzLmNlbGxTZWxlY3QpIHtcbiAgICAgIHRoaXMucHJvcHMuY2VsbFNlbGVjdGlvbkNoYW5nZShcbiAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICBNYXAoe1xuICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgIGNvbHVtbktleSxcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVDcmVhdGVDZWxsUmVmID0gKHJvd0luZGV4LCBjb2wpID0+IChyZWYpID0+IHtcbiAgICAvLyBGb2N1cyB0byBjcmVhdGUgY2VsbFxuICAgIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2wpO1xuICAgIGNvbnN0IHNlbGVjdFJlZiA9ICFyZWYgfHwgcmVmLmZvY3VzID8gcmVmIDogdGhpcy5nZXRTZWxlY3RSZWYocmVmKTtcbiAgICBpZiAoXG4gICAgICB0aGlzLnByb3BzLmNyZWF0ZURhdGEuc2l6ZVxuICAgICAgJiYgdGhpcy5wcm9wcy5jcmVhdGVEYXRhLnNpemUgPT09IHJvd0luZGV4ICsgMVxuICAgICAgJiYgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbFxuICAgICAgJiYgIXRoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnY3JlYXRlJylcbiAgICAgICYmIHNlbGVjdFJlZlxuICAgICkge1xuICAgICAgc2VsZWN0UmVmLmZvY3VzKCk7XG4gICAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcHMuZW5hYmxlQXJyb3dOYXZpZ2F0aW9uKSB7XG4gICAgICB0aGlzLmNyZWF0ZUNlbGxSZWZzW2Ake3RoaXMucHJvcHMuZ3JpZC5pZH1fJHtjb2x1bW5LZXl9XyR7cm93SW5kZXh9YF0gPSByZWY7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZUVkaXRDZWxsUmVmID0gKHJvd0luZGV4LCBjb2wpID0+IChyZWYpID0+IHtcbiAgICBjb25zdCBjb2x1bW5LZXkgPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sKTtcbiAgICBpZiAodGhpcy5mb2N1c1RvRWRpdENlbGwgJiYgIXRoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnZWRpdCcpKSB7XG4gICAgICBjb25zdCBzZWxlY3RlZFJvd0luZGV4ID0gdGhpcy5mb2N1c1RvTGFzdFJvdyAmJiB0aGlzLnByb3BzLmRhdGEuc2l6ZSA+IDBcbiAgICAgICAgPyB0aGlzLnByb3BzLmRhdGEuc2l6ZSAtIDFcbiAgICAgICAgOiB0aGlzLmdldFNlbGVjdGVkSXRlbUluZGV4KHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5maXJzdCgpKTtcblxuICAgICAgY29uc3QgeyBzZWxlY3RlZENlbGwgfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCBzZWxlY3RSZWYgPSAhcmVmIHx8IHJlZi5mb2N1cyA/IHJlZiA6IHRoaXMuZ2V0U2VsZWN0UmVmKHJlZik7XG4gICAgICBpZiAoc2VsZWN0ZWRDZWxsLnNpemUgPiAwKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBzZWxlY3RlZENlbGwuZ2V0KCdyb3dJbmRleCcpID09PSByb3dJbmRleFxuICAgICAgICAgICYmIHNlbGVjdGVkQ2VsbC5nZXQoJ2NvbHVtbktleScpID09PSBjb2x1bW5LZXlcbiAgICAgICAgICAmJiBzZWxlY3RSZWZcbiAgICAgICAgKSB7XG4gICAgICAgICAgc2VsZWN0UmVmLmZvY3VzKCk7XG4gICAgICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmZvY3VzVG9MYXN0Um93ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWRSb3dJbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZm9jdXNUb0xhc3RSb3cgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWRSb3dJbmRleCA9PT0gcm93SW5kZXggJiYgc2VsZWN0UmVmKSB7XG4gICAgICAgIHNlbGVjdFJlZi5mb2N1cygpO1xuICAgICAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZvY3VzVG9MYXN0Um93ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZUFycm93TmF2aWdhdGlvbikge1xuICAgICAgdGhpcy5jZWxsUmVmc1tgJHt0aGlzLnByb3BzLmdyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4fWBdID0gcmVmO1xuICAgIH1cbiAgfTtcblxuICBtb3ZlQ2VsbEZvY3VzID0gKG5leHRFbGVtZW50LCByb3dJbmRleCwgY29sdW1uSW5kZXgpID0+IHtcbiAgICBjb25zdCBlbGVtZW50VHlwZXMgPSBbJ3RleHQnLCAnY2hlY2tib3gnXTtcbiAgICBpZiAobmV4dEVsZW1lbnQgJiYgZWxlbWVudFR5cGVzLmluY2x1ZGVzKG5leHRFbGVtZW50LnR5cGUpKSB7XG4gICAgICBpZiAocm93SW5kZXggIT09IC0xIHx8IGNvbHVtbkluZGV4ICE9PSAtMSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBjdXJyZW50Q29sdW1uOiBjb2x1bW5JbmRleCxcbiAgICAgICAgICBjdXJyZW50Um93OiByb3dJbmRleCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKG5leHRFbGVtZW50LnR5cGUgPT09ICdjaGVja2JveCcpIG5leHRFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIGlmIChuZXh0RWxlbWVudC50eXBlID09PSAndGV4dCcpIG5leHRFbGVtZW50LnNlbGVjdCgpO1xuICAgICAgfSwgNTApO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVTZWxlY3RBbGxDaGVja0JveE9uQ2hhbmdlID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMuc2VsZWN0QWxsSXRlbXNDaGFuZ2UodGhpcy5wcm9wcy5ncmlkKTtcbiAgfTtcblxuICBoYW5kbGVTZWxlY3Rpb25DaGVja0JveE9uQ2hhbmdlID0gcm93SW5kZXggPT4gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMuaXRlbVNlbGVjdGlvbkNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIHJvd0luZGV4LCB0cnVlLCBmYWxzZSk7XG4gIH07XG5cbiAgZ2VuZXJhdGVDb2x1bW5zID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGRhdGEsXG4gICAgICBzZWxlY3RlZEl0ZW1zLFxuICAgICAgZGF0ZUZvcm1hdCxcbiAgICAgIHRob3VzYW5kU2VwYXJhdG9yLFxuICAgICAgZGVjaW1hbFNlcGFyYXRvcixcbiAgICAgIGdyaWQsXG4gICAgICBpbmxpbmVFZGl0LFxuICAgICAgZmlsdGVyaW5nLFxuICAgICAgcmVnaW9uLFxuICAgICAgaW50bCxcbiAgICAgIHNlbGVjdENvbXBvbmVudE9wdGlvbnMsXG4gICAgICBpc0NyZWF0aW5nLFxuICAgICAgZXh0cmFDb2x1bW4sXG4gICAgICByb3dTZWxlY3RDaGVja2JveENvbHVtbixcbiAgICAgIHNob3dTZWxlY3RBbGxDaGVja2JveCxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IGNvbHVtbnMgPSBbXTtcbiAgICBjb25zdCB0YWJJbmRleCA9IFN0cmluZyh0aGlzLnByb3BzLnRhYkluZGV4KTtcbiAgICBpZiAoZXh0cmFDb2x1bW4pIHtcbiAgICAgIGNvbHVtbnMucHVzaCh7XG4gICAgICAgIHdpZHRoOiBleHRyYUNvbHVtbi53aWR0aCB8fCA0MCxcbiAgICAgICAgaXNSZXNpemFibGU6ICEhZXh0cmFDb2x1bW4uaXNSZXNpemFibGUsXG4gICAgICAgIGlzU29ydGFibGU6IGZhbHNlLFxuICAgICAgICBjb2x1bW5LZXk6ICdleHRyYUNvbHVtbicsXG4gICAgICAgIGNlbGw6IHJvd0luZGV4ID0+IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWV4dHJhLWNvbHVtbi1jZWxsIG5vLXJvdy1zZWxlY3RcIj5cbiAgICAgICAgICAgIHtleHRyYUNvbHVtbi52YWx1ZVJlbmRlcihkYXRhLmdldChyb3dJbmRleCksIHRhYkluZGV4KX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSxcbiAgICAgICAgY2VsbEVkaXQ6IHJvd0luZGV4ID0+IChleHRyYUNvbHVtbi5jZWxsRWRpdCA/IGV4dHJhQ29sdW1uLmNlbGxFZGl0KHJvd0luZGV4KSA6IG51bGwpLFxuICAgICAgICBjZWxsQ3JlYXRlOiByb3dJbmRleCA9PiAoZXh0cmFDb2x1bW4uY2VsbENyZWF0ZSA/IGV4dHJhQ29sdW1uLmNlbGxDcmVhdGUocm93SW5kZXgpIDogbnVsbCksXG4gICAgICAgIGNlbGxGaWx0ZXI6IHJvd0luZGV4ID0+IChleHRyYUNvbHVtbi5jZWxsRmlsdGVyID8gZXh0cmFDb2x1bW4uY2VsbEZpbHRlcihyb3dJbmRleCkgOiBudWxsKSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChyb3dTZWxlY3RDaGVja2JveENvbHVtbikge1xuICAgICAgY29sdW1ucy5wdXNoKHtcbiAgICAgICAgd2lkdGg6IDQwLFxuICAgICAgICBpc1Jlc2l6YWJsZTogZmFsc2UsXG4gICAgICAgIGlzU29ydGFibGU6IGZhbHNlLFxuICAgICAgICBjb2x1bW5LZXk6ICdzZWxlY3Rpb25DaGVja2JveCcsXG4gICAgICAgIGhlYWRlcjogc2hvd1NlbGVjdEFsbENoZWNrYm94ICYmIChcbiAgICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZFNlbGVjdEFsbENoZWNrQm94LSR7Z3JpZC5pZH1gfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtc2VsZWN0LWFsbC1jaGVja2JveC1jZWxsIG5vLXJvdy1zZWxlY3RcIlxuICAgICAgICAgICAgY2hlY2tlZD17ZGF0YS5zaXplICE9PSAwICYmIGRhdGEuc2l6ZSA9PT0gc2VsZWN0ZWRJdGVtcy5zaXplfVxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlU2VsZWN0QWxsQ2hlY2tCb3hPbkNoYW5nZX1cbiAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAvPlxuICAgICAgICApLFxuICAgICAgICBjZWxsOiAocm93SW5kZXgpID0+IHtcbiAgICAgICAgICBjb25zdCByb3dJdGVtID0gZGF0YS5nZXQocm93SW5kZXgpO1xuICAgICAgICAgIGNvbnN0IGl0ZW1JZCA9IHJvd0l0ZW0uZ2V0SW4oZ3JpZC5pZEtleVBhdGgpO1xuICAgICAgICAgIGNvbnN0IHNlbGVjdGVkID0gc2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhpdGVtSWQpO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkU2VsZWN0Q2hlY2tCb3gtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtc2VsZWN0LWNoZWNrYm94LWNlbGwgbm8tcm93LXNlbGVjdFwiXG4gICAgICAgICAgICAgIGNoZWNrZWQ9e3NlbGVjdGVkfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVTZWxlY3Rpb25DaGVja0JveE9uQ2hhbmdlKHJvd0luZGV4KX1cbiAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICBjZWxsRWRpdDogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbENyZWF0ZTogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbEZpbHRlcjogKCkgPT4gbnVsbCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHZpc2libGVDb2x1bW5zID0gW107XG4gICAgdGhpcy5wcm9wcy52aXNpYmxlQ29sdW1ucy5mb3JFYWNoKCh2aXNpYmxlQ29sdW1uS2V5KSA9PiB7XG4gICAgICB0aGlzLnByb3BzLmNvbHVtbnMuZm9yRWFjaCgob3JnQ29sKSA9PiB7XG4gICAgICAgIGlmIChVdGlscy5nZXRDb2x1bW5LZXkob3JnQ29sKSA9PT0gdmlzaWJsZUNvbHVtbktleSkge1xuICAgICAgICAgIHZpc2libGVDb2x1bW5zLnB1c2gob3JnQ29sKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgdmlzaWJsZUNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZUVtcHR5Q2hlY2tlciA9IFV0aWxzLmdldFZhbHVlRW1wdHlDaGVja2VyKGNvbCk7XG4gICAgICAvLyBDZWxsIHZhbHVlIHJlbmRlcmluZ1xuICAgICAgY29uc3QgdmFsdWVSZW5kZXIgPSAocm93SW5kZXgsIGZvcm1hdCkgPT4ge1xuICAgICAgICBjb25zdCB2YWwgPSBkYXRhLmdldEluKFtyb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsKSkge1xuICAgICAgICAgIHJldHVybiBjb2wuaXNSZXF1aXJlZCA/IDxNIGlkPVwiR3JpZC5WYWx1ZUlzTWlzc2luZ1wiIC8+IDogJyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvcm1hdCA/IGZvcm1hdCh2YWwpIDogdmFsO1xuICAgICAgfTtcblxuICAgICAgbGV0IGNvbHVtbiA9IEdyaWRDb2x1bW5TZXJ2aWNlLmJhc2VDb2x1bW4oY29sKTtcbiAgICAgIC8vIENvbGxlY3QgY29sdW1uIGZ1bmN0aW9ucyBpbnRvIG9uZSBPYmplY3RcbiAgICAgIGNvbnN0IGNvbHVtbkZ1bmN0aW9ucyA9IHtcbiAgICAgICAgZWRpdDoge1xuICAgICAgICAgIGdldEl0ZW1WYWx1ZTogdGhpcy5nZXRFZGl0SXRlbVZhbHVlLFxuICAgICAgICAgIG9uQ2VsbFZhbHVlQ2hhbmdlOiB0aGlzLm9uRWRpdENlbGxWYWx1ZUNoYW5nZSxcbiAgICAgICAgICBvbkNlbGxCbHVyOiB0aGlzLm9uRWRpdENlbGxCbHVyLFxuICAgICAgICAgIG9uQ2VsbEZvY3VzOiB0aGlzLm9uQ2VsbEZvY3VzLFxuICAgICAgICAgIG9uQ2VsbEtleURvd246IHRoaXMub25FZGl0Q2VsbEtleURvd24sXG4gICAgICAgICAgaGFuZGxlQ2VsbFJlZjogdGhpcy5oYW5kbGVFZGl0Q2VsbFJlZixcbiAgICAgICAgfSxcbiAgICAgICAgY3JlYXRlOiB7XG4gICAgICAgICAgZ2V0SXRlbVZhbHVlOiB0aGlzLmdldENyZWF0ZUl0ZW1WYWx1ZSxcbiAgICAgICAgICBvbkNlbGxWYWx1ZUNoYW5nZTogdGhpcy5vbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSxcbiAgICAgICAgICBvbkNlbGxCbHVyOiB0aGlzLm9uQ3JlYXRlQ2VsbEJsdXIsXG4gICAgICAgICAgb25DZWxsRm9jdXM6IHRoaXMub25DZWxsRm9jdXMsXG4gICAgICAgICAgb25DZWxsS2V5RG93bjogdGhpcy5vbkNyZWF0ZUNlbGxLZXlEb3duLFxuICAgICAgICAgIGhhbmRsZUNlbGxSZWY6IHRoaXMuaGFuZGxlQ3JlYXRlQ2VsbFJlZixcbiAgICAgICAgfSxcbiAgICAgICAgZmlsdGVyOiB7XG4gICAgICAgICAgZ2V0SXRlbVZhbHVlOiB0aGlzLmdldEZpbHRlckl0ZW1WYWx1ZSxcbiAgICAgICAgICBvbkNlbGxWYWx1ZUNoYW5nZTogdGhpcy5vbkZpbHRlckNlbGxWYWx1ZUNoYW5nZSxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIC8vIGhhbmRsZSBjb2x1bW4uY2VsbCAvIGNvbHVtbi5jZWxsRWRpdCAvIGNvbHVtbi5jZWxsQ3JlYXRlIC8gY29sdW1uLmNlbGxGaWx0ZXJcbiAgICAgIGNvbnN0IGNlbGxQcm9wcyA9IHtcbiAgICAgICAgZGF0YSxcbiAgICAgICAgZGF0ZUZvcm1hdCxcbiAgICAgICAgdGhvdXNhbmRTZXBhcmF0b3IsXG4gICAgICAgIGRlY2ltYWxTZXBhcmF0b3IsXG4gICAgICAgIHNlbGVjdENvbXBvbmVudE9wdGlvbnMsXG4gICAgICB9OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICBjb2x1bW4gPSBHcmlkQ29sdW1uU2VydmljZS5jb2x1bW5DZWxsKGNvbHVtbiwgY2VsbFByb3BzLCBjb2wsIHZhbHVlUmVuZGVyKTtcblxuICAgICAgLy8gaGFuZGxlIGNvbHVtbkNvbXBvbmVudFR5cGVzXG4gICAgICBjb25zdCBjb21wb25lbnRUeXBlUHJvcHMgPSB7XG4gICAgICAgIC4uLmNlbGxQcm9wcyxcbiAgICAgICAgZ3JpZCxcbiAgICAgICAgaW5saW5lRWRpdCxcbiAgICAgICAgZmlsdGVyaW5nLFxuICAgICAgICByZWdpb24sXG4gICAgICAgIGludGwsXG4gICAgICAgIHNlbGVjdENvbXBvbmVudE9wdGlvbnMsXG4gICAgICB9OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICBjb2x1bW4gPSBHcmlkQ29sdW1uU2VydmljZS5jb2x1bW5Db21wb25lbnRUeXBlKFxuICAgICAgICBjb2x1bW4sXG4gICAgICAgIHRhYkluZGV4LFxuICAgICAgICBjb21wb25lbnRUeXBlUHJvcHMsXG4gICAgICAgIGNvbCxcbiAgICAgICAgY29sdW1uRnVuY3Rpb25zLFxuICAgICAgICB0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUsXG4gICAgICApO1xuICAgICAgY29sdW1ucy5wdXNoKGNvbHVtbik7XG4gICAgfSk7XG5cbiAgICBpZiAoaXNDcmVhdGluZykge1xuICAgICAgY29sdW1ucy5wdXNoKHtcbiAgICAgICAgd2lkdGg6IDM3LFxuICAgICAgICBpc1Jlc2l6YWJsZTogZmFsc2UsXG4gICAgICAgIGNvbHVtbktleTogJ3JlbW92ZU5ld0l0ZW0nLFxuICAgICAgICBjZWxsOiAoKSA9PiBudWxsLFxuICAgICAgICBjZWxsRWRpdDogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbENyZWF0ZTogcm93SW5kZXggPT4gKFxuICAgICAgICAgIDxJY29uXG4gICAgICAgICAgICBpZD17YG9jLWRhdGFncmlkLW5ldy1pdGVtLXJlbW92ZS0ke2dyaWQuaWR9LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgIHR5cGU9XCJpbmRpY2F0b3JcIlxuICAgICAgICAgICAgbmFtZT1cImRlbGV0ZVwiXG4gICAgICAgICAgICB3aWR0aD17MzB9XG4gICAgICAgICAgICBoZWlnaHQ9ezMwfVxuICAgICAgICAgICAgc3R5bGU9e3sgcGFkZGluZzogJzdweCcgfX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMucHJvcHMucmVtb3ZlTmV3SXRlbShncmlkLCByb3dJbmRleCl9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSxcbiAgICAgICAgY2VsbEZpbHRlcjogKCkgPT4gbnVsbCxcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gY29sdW1ucztcbiAgfTtcblxuICBpc0NlbGxFZGl0ZWQgPSAocm93SW5kZXgsIGNvbCwgY2VsbFR5cGUpID0+IHtcbiAgICBpZiAoY2VsbFR5cGUgIT09ICdlZGl0Jykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBpZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgcmV0dXJuICEhdGhpcy5wcm9wcy5lZGl0RGF0YS5nZXRJbihbaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgfTtcblxuICBoYW5kbGVBZnRlckFkZEl0ZW0gPSAoKSA9PiB7XG4gICAgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCA9IHRydWU7XG4gIH07XG5cbiAgaGFuZGxlQWZ0ZXJFZGl0UHJlc3MgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5zaXplKSB7XG4gICAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IHRydWU7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY3VycmVudFJvdzogdW5kZWZpbmVkLFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZUFmdGVyVmFsaWRhdGlvbkVycm9yID0gKCkgPT4ge1xuICAgIHRoaXMuZm9jdXNUb0Vycm9yQ2VsbCA9IHRydWU7XG4gIH07XG5cbiAgaGFuZGxlUm93Q2xpY2sgPSAoZSwgcm93SW5kZXgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5yb3dTZWxlY3QgJiYgIXRoaXMucHJvcHMuaXNDcmVhdGluZyAmJiAhdGhpcy5wcm9wcy5pc0VkaXRpbmcpIHtcbiAgICAgIGlmIChlLmN0cmxLZXkgfHwgZS5zaGlmdEtleSkge1xuICAgICAgICBkb2N1bWVudC5nZXRTZWxlY3Rpb24oKS5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICAgIH1cbiAgICAgIC8vIERvbid0IHRyaWdnZXIgc2VsZWN0aW9uIGNoYW5nZSBvbiB3aGVuIHVzZXIgY2xpY2tzIG9uIHNwZWNpYWwgY2VsbHMgbGlrZSBjaGVja2JveC9leHRyYVxuICAgICAgLy8gQ2hlY2sgdGhhdCBjbGlja2VkIG5vZGUncyBwYXJlbnQgb3IgcGFyZW50J3MgcGFyZW50IGRvZXNuJ3QgaGF2ZSBuby1yb3ctc2VsZWN0IGNsYXNzXG4gICAgICBjb25zdCB7IHBhcmVudE5vZGUgfSA9IGUudGFyZ2V0O1xuICAgICAgY29uc3QgcGFyZW50MWNsYXNzID0gcGFyZW50Tm9kZS5jbGFzc05hbWUgJiYgcGFyZW50Tm9kZS5jbGFzc05hbWUuaW5kZXhPZiA/IHBhcmVudE5vZGUuY2xhc3NOYW1lIDogJyc7XG4gICAgICBjb25zdCBwYXJlbnQyY2xhc3MgPSAgICAgICAgcGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZSAmJiBwYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lLmluZGV4T2YgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICA/IHBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWVcbiAgICAgICAgOiAnJztcbiAgICAgIGNvbnN0IHBhcmVudDNjbGFzcyA9IHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZVxuICAgICAgICAmJiBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUuaW5kZXhPZiAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgID8gcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgIDogJyc7XG4gICAgICBjb25zdCBwYXJlbnQ0Y2xhc3MgPSBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZVxuICAgICAgICAmJiBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZS5pbmRleE9mIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgPyBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZVxuICAgICAgICA6ICcnO1xuICAgICAgaWYgKFxuICAgICAgICBwYXJlbnQxY2xhc3MuaW5kZXhPZignbm8tcm93LXNlbGVjdCcpID09PSAtMVxuICAgICAgICAmJiBwYXJlbnQyY2xhc3MuaW5kZXhPZignbm8tcm93LXNlbGVjdCcpID09PSAtMVxuICAgICAgICAmJiBwYXJlbnQzY2xhc3MuaW5kZXhPZignbm8tcm93LXNlbGVjdCcpID09PSAtMVxuICAgICAgICAmJiBwYXJlbnQ0Y2xhc3MuaW5kZXhPZignbm8tcm93LXNlbGVjdCcpID09PSAtMVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMucHJvcHMuaXRlbVNlbGVjdGlvbkNoYW5nZShcbiAgICAgICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgdGhpcy5wcm9wcy5tdWx0aVNlbGVjdCAmJiBlLmN0cmxLZXksXG4gICAgICAgICAgdGhpcy5wcm9wcy5tdWx0aVNlbGVjdCAmJiBlLnNoaWZ0S2V5LFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5vblJvd0NsaWNrKSB7XG4gICAgICB0aGlzLnByb3BzLm9uUm93Q2xpY2soZSwgcm93SW5kZXgsIHRoaXMucHJvcHMuZGF0YS5nZXQocm93SW5kZXgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgaGFuZGxlQ29udGV4dE1lbnUgPSAoZSwgcm93SW5kZXgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5jb250ZXh0TWVudUl0ZW1zKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGl0ZW1TZWxlY3Rpb25DaGFuZ2UsIHNlbGVjdGVkSXRlbXMsIGdyaWQsIGRhdGEsXG4gICAgICB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY29udGV4dE1lbnVPcGVuOiB0cnVlLFxuICAgICAgICBjb250ZXh0TWVudVg6IGUuY2xpZW50WCxcbiAgICAgICAgY29udGV4dE1lbnVZOiBlLmNsaWVudFksXG4gICAgICB9KTtcbiAgICAgIC8vIElmIGNsaWNrZWQgaXRlbSBpcyBub3Qgc2VsZWN0ZWQsIGNoYW5nZSBzZWxlY3Rpb24gdG8gaXRcbiAgICAgIGlmICghc2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhkYXRhLmdldEluKFtyb3dJbmRleCwgLi4uZ3JpZC5pZEtleVBhdGhdKSkpIHtcbiAgICAgICAgaXRlbVNlbGVjdGlvbkNoYW5nZShncmlkLCByb3dJbmRleCk7XG4gICAgICB9XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25Eb2N1bWVudENsaWNrKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgaGFuZGxlQ29udGV4dE1lbnVJdGVtQ2xpY2sgPSAob25DbGljaywgc2VsZWN0ZWRJdGVtcywgc2VsZWN0ZWREYXRhKSA9PiAoKSA9PiB7XG4gICAgb25DbGljayhzZWxlY3RlZEl0ZW1zLCBzZWxlY3RlZERhdGEpO1xuICB9O1xuXG4gIGhhbmRsZVJvd0hlaWdodEdldHRlciA9IHJvd0luZGV4ID0+IHRoaXMucHJvcHMucm93SGVpZ2h0R2V0dGVyKFxuICAgIHRoaXMucHJvcHMuZGF0YS5nZXQocm93SW5kZXgpLFxuICAgIHJvd0luZGV4LFxuICApO1xuXG4gIHJlbmRlckNlbGwgPSBjb2wgPT4gKGNlbGxQcm9wcykgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGlzQ3JlYXRpbmcsIGlzRWRpdGluZywgY3JlYXRlRGF0YSwgc2VsZWN0ZWRDZWxsLCBncmlkLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgcm93SW5kZXgsIC4uLnByb3BzIH0gPSBjZWxsUHJvcHM7XG4gICAgbGV0IGNlbGw7XG4gICAgbGV0IGNlbGxUeXBlID0gJ3ZpZXcnO1xuICAgIGxldCBleHRyYVJvd0NvdW50ID0gMDsgLy8gaG93IG1hbnkgcm93cyB0byBpZ25vcmUgZnJvbSB0b3AsIG5ldyArIGZpbHRlciByb3dzXG4gICAgaWYgKGlzQ3JlYXRpbmcpIGV4dHJhUm93Q291bnQgPSBjcmVhdGVEYXRhLnNpemU7XG4gICAgY29uc3QgZXhpc3RpbmdSb3dzSW5kZXggPSByb3dJbmRleCAtIGV4dHJhUm93Q291bnQ7XG4gICAgaWYgKGlzQ3JlYXRpbmcpIHtcbiAgICAgIGlmIChyb3dJbmRleCA8PSBleHRyYVJvd0NvdW50IC0gMSkge1xuICAgICAgICBpZiAoY29sLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjZWxsID0gY29sLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ3JlYXRlQ2VsbFJlZihyb3dJbmRleCwgY29sKSxcbiAgICAgICAgICAgIHRoaXMub25DcmVhdGVDZWxsS2V5RG93bihyb3dJbmRleCwgY29sKSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGNlbGxUeXBlID0gJ2NyZWF0ZSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2VsbCA9IG51bGw7XG4gICAgICAgICAgY2VsbFR5cGUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjZWxsID0gY29sLmNlbGwoXG4gICAgICAgICAgZXhpc3RpbmdSb3dzSW5kZXgsXG4gICAgICAgICAgdGhpcy5oYW5kbGVDcmVhdGVDZWxsUmVmKGV4aXN0aW5nUm93c0luZGV4LCBjb2wpLFxuICAgICAgICAgIHRoaXMub25DcmVhdGVDZWxsS2V5RG93bihleGlzdGluZ1Jvd3NJbmRleCwgY29sKSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzRWRpdGluZyAmJiBjb2wuY2VsbEVkaXQpIHtcbiAgICAgIGNlbGwgPSBjb2wuY2VsbEVkaXQoXG4gICAgICAgIGV4aXN0aW5nUm93c0luZGV4LFxuICAgICAgICB0aGlzLmhhbmRsZUVkaXRDZWxsUmVmKGV4aXN0aW5nUm93c0luZGV4LCBjb2wpLFxuICAgICAgICB0aGlzLm9uRWRpdENlbGxLZXlEb3duKGV4aXN0aW5nUm93c0luZGV4LCBjb2wpLFxuICAgICAgKTtcbiAgICAgIGNlbGxUeXBlID0gJ2VkaXQnO1xuICAgIH0gZWxzZSB7XG4gICAgICBjZWxsID0gY29sLmNlbGwoXG4gICAgICAgIGV4aXN0aW5nUm93c0luZGV4LFxuICAgICAgICB0aGlzLmhhbmRsZUVkaXRDZWxsUmVmKGV4aXN0aW5nUm93c0luZGV4LCBjb2wpLFxuICAgICAgICB0aGlzLm9uRWRpdENlbGxLZXlEb3duKGV4aXN0aW5nUm93c0luZGV4LCBjb2wpLFxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3QgaXNTcGVjaWFsID0gcHJvcHMuY29sdW1uS2V5ID09PSAnc2VsZWN0aW9uQ2hlY2tib3gnIHx8IHByb3BzLmNvbHVtbktleSA9PT0gJ2V4dHJhQ29sdW1uJztcbiAgICBpZiAoKGNlbGxUeXBlID09PSAndmlldycgfHwgY2VsbFR5cGUgPT09ICdlZGl0JyB8fCBjZWxsVHlwZSA9PT0gJ2NyZWF0ZScpICYmICFpc1NwZWNpYWwpIHtcbiAgICAgIGNvbnN0IGdldFJvd0luZGV4ID0gY2VsbFR5cGUgPT09ICdjcmVhdGUnID8gcm93SW5kZXggOiByb3dJbmRleCAtIGV4dHJhUm93Q291bnQ7XG4gICAgICBjb25zdCBtZXNzYWdlRGF0YSA9IHRoaXMuZ2V0Q2VsbE1lc3NhZ2VzKGdldFJvd0luZGV4LCBjb2wsIGNlbGxUeXBlKTtcbiAgICAgIGNvbnN0IGlzRWRpdGVkID0gdGhpcy5pc0NlbGxFZGl0ZWQoZ2V0Um93SW5kZXgsIGNvbCwgY2VsbFR5cGUpO1xuICAgICAgY29uc3QgY2xhc3NOYW1lID0gc2VsZWN0ZWRDZWxsLmdldCgncm93SW5kZXgnKSA9PT0gcm93SW5kZXhcbiAgICAgICAgJiYgc2VsZWN0ZWRDZWxsLmdldCgnY29sdW1uS2V5JykgPT09IHByb3BzLmNvbHVtbktleVxuICAgICAgICA/ICdvYy1kYXRhZ3JpZC1jZWxsIGlzLXNlbGVjdGVkJ1xuICAgICAgICA6ICdvYy1kYXRhZ3JpZC1jZWxsJztcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxDZWxsXG4gICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICAgIHN0eWxlPXtjb2wuc3R5bGV9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDZWxsU2VsZWN0KGNlbGxUeXBlLCByb3dJbmRleCwgcHJvcHMuY29sdW1uS2V5KX1cbiAgICAgICAgPlxuICAgICAgICAgIDxDZWxsVG9vbHRpcFxuICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkQ2VsbC0ke2dyaWQuaWR9LSR7cHJvcHMuY29sdW1uS2V5fS0ke3Jvd0luZGV4fWB9XG4gICAgICAgICAgICBpc0VkaXRlZD17aXNFZGl0ZWR9XG4gICAgICAgICAgICBpc0Vycm9yPXshIW1lc3NhZ2VEYXRhLmVycm9yTWVzc2FnZX1cbiAgICAgICAgICAgIGlzV2FybmluZz17ISFtZXNzYWdlRGF0YS53YXJuaW5nTWVzc2FnZX1cbiAgICAgICAgICAgIGluZm9NZXNzYWdlPXttZXNzYWdlRGF0YS5pbmZvTWVzc2FnZX1cbiAgICAgICAgICAgIGVycm9yTWVzc2FnZT17bWVzc2FnZURhdGEuZXJyb3JNZXNzYWdlfVxuICAgICAgICAgICAgd2FybmluZ01lc3NhZ2U9e21lc3NhZ2VEYXRhLndhcm5pbmdNZXNzYWdlfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtjZWxsfVxuICAgICAgICAgIDwvQ2VsbFRvb2x0aXA+XG4gICAgICAgIDwvQ2VsbD5cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8Q2VsbCB7Li4ucHJvcHN9IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWNlbGxcIiBzdHlsZT17Y29sLnN0eWxlfT5cbiAgICAgICAge2NlbGx9XG4gICAgICA8L0NlbGw+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJDb2x1bW5zID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGFsbERhdGFTaXplLCBncmlkLCBpc0NyZWF0aW5nLCBpc0J1c3ksIHZpc2libGVDb2x1bW5zLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghYWxsRGF0YVNpemUgJiYgIWlzQnVzeSAmJiAhaXNDcmVhdGluZyAmJiAhZ3JpZC5wYWdpbmF0aW9uKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Q29sdW1uXG4gICAgICAgICAgY29sdW1uS2V5PVwiZGF0YUVtcHR5Q29sdW1uXCJcbiAgICAgICAgICBoZWFkZXI9eyhcbiAgICAgICAgICAgIDxDZWxsIHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgICAgIDxNIGlkPVwiR3JpZC5Ob0l0ZW1zXCIgLz5cbiAgICAgICAgICAgIDwvQ2VsbD5cbil9XG4gICAgICAgICAgd2lkdGg9ezEwfVxuICAgICAgICAgIGlzUmVzaXphYmxlPXtmYWxzZX1cbiAgICAgICAgICBmbGV4R3Jvdz17MX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICAgIGlmICghdmlzaWJsZUNvbHVtbnMuc2l6ZSkge1xuICAgICAgaWYgKGlzQnVzeSkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxDb2x1bW5cbiAgICAgICAgICAgIGNvbHVtbktleT1cImRhdGFFbXB0eUNvbHVtblwiXG4gICAgICAgICAgICBoZWFkZXI9ezxDZWxsPiZuYnNwOzwvQ2VsbD59XG4gICAgICAgICAgICB3aWR0aD17MTB9XG4gICAgICAgICAgICBpc1Jlc2l6YWJsZT17ZmFsc2V9XG4gICAgICAgICAgICBmbGV4R3Jvdz17MX1cbiAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPENvbHVtblxuICAgICAgICAgIGNvbHVtbktleT1cImRhdGFFbXB0eUNvbHVtblwiXG4gICAgICAgICAgaGVhZGVyPXsoXG4gICAgICAgICAgICA8Q2VsbCBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInIH19PlxuICAgICAgICAgICAgICA8TSBpZD1cIkdyaWQuTm9Db2x1bW5zXCIgLz5cbiAgICAgICAgICAgIDwvQ2VsbD5cbil9XG4gICAgICAgICAgd2lkdGg9ezEwfVxuICAgICAgICAgIGlzUmVzaXphYmxlPXtmYWxzZX1cbiAgICAgICAgICBmbGV4R3Jvdz17MX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnN0IGNvbHVtbnMgPSB0aGlzLmdlbmVyYXRlQ29sdW1ucygpO1xuICAgIGlmIChjb2x1bW5zLmxlbmdodCA9PT0gMCkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIGNvbHVtbnMubWFwKGNvbCA9PiAoXG4gICAgICA8Q29sdW1uXG4gICAgICAgIGtleT17Y29sLmNvbHVtbktleX1cbiAgICAgICAgY29sdW1uS2V5PXtjb2wuY29sdW1uS2V5fVxuICAgICAgICBoZWFkZXI9eyhcbiAgICAgICAgICA8SGVhZGVyQ2VsbFxuICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkSGVhZGVyLSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke2NvbC5jb2x1bW5LZXl9YH1cbiAgICAgICAgICAgIGdyaWQ9e3RoaXMucHJvcHMuZ3JpZH1cbiAgICAgICAgICAgIGNvbHVtbnM9e3RoaXMucHJvcHMuY29sdW1uc31cbiAgICAgICAgICAgIGNvbHVtbj17Y29sfVxuICAgICAgICAgICAgY3VycmVudFNvcnRDb2x1bW49e3RoaXMucHJvcHMuc29ydENvbHVtbn1cbiAgICAgICAgICAgIGN1cnJlbnRTb3J0T3JkZXI9e3RoaXMucHJvcHMuc29ydE9yZGVyfVxuICAgICAgICAgICAgb25Tb3J0Q2hhbmdlPXt0aGlzLnByb3BzLnNvcnRDaGFuZ2V9XG4gICAgICAgICAgICBpc0J1c3k9e3RoaXMucHJvcHMuaXNCdXN5fVxuICAgICAgICAgICAgZmlsdGVyaW5nPXt0aGlzLnByb3BzLmlzRmlsdGVyaW5nfVxuICAgICAgICAgICAgd2lkdGg9e3RoaXMucHJvcHMuY29sdW1uV2lkdGhzLmdldChjb2wuY29sdW1uS2V5LCBjb2wud2lkdGgpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtjb2wuaGVhZGVyfVxuICAgICAgICAgIDwvSGVhZGVyQ2VsbD5cbil9XG4gICAgICAgIGNlbGw9e3RoaXMucmVuZGVyQ2VsbChjb2wpfVxuICAgICAgICB3aWR0aD17dGhpcy5wcm9wcy5jb2x1bW5XaWR0aHMuZ2V0KGNvbC5jb2x1bW5LZXksIGNvbC53aWR0aCl9XG4gICAgICAgIG1pbldpZHRoPXtjb2wubWluV2lkdGh9XG4gICAgICAgIG1heFdpZHRoPXtjb2wubWF4V2lkdGh9XG4gICAgICAgIGlzUmVzaXphYmxlPXtjb2wuaXNSZXNpemFibGV9XG4gICAgICAgIGZsZXhHcm93PXtjb2wuZmxleEdyb3cgPyBjb2wuZmxleEdyb3cgOiAwfVxuICAgICAgICBmaXhlZD17Y29sLmZpeGVkfVxuICAgICAgICBmaXhlZFJpZ2h0PXtjb2wuZml4ZWRSaWdodH1cbiAgICAgICAgYWxsb3dDZWxsc1JlY3ljbGluZz17Y29sLmFsbG93Q2VsbHNSZWN5Y2xpbmd9XG4gICAgICAvPlxuICAgICkpO1xuICB9O1xuXG4gIHJlbmRlckNvbnRleHRNZW51ID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGNvbnRleHRNZW51SXRlbXMsIGRhdGEsIGdyaWQsIHNlbGVjdGVkSXRlbXMsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBjb250ZXh0TWVudVgsIGNvbnRleHRNZW51WSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBzdHlsZSA9IHtcbiAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICB6SW5kZXg6IDEwMDAwLFxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICB0b3A6IGAke2NvbnRleHRNZW51WX1weGAsXG4gICAgICBsZWZ0OiBgJHtjb250ZXh0TWVudVh9cHhgLFxuICAgIH07XG4gICAgY29uc3Qgc2VsZWN0ZWREYXRhID0gZGF0YS5maWx0ZXIoZCA9PiBzZWxlY3RlZEl0ZW1zLmluY2x1ZGVzKGQuZ2V0SW4oZ3JpZC5pZEtleVBhdGgpKSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDx1bCBjbGFzc05hbWU9XCJkcm9wZG93bi1tZW51IG9jLWRhdGFncmlkLWNvbnRleHQtbWVudSBvcGVuXCIgc3R5bGU9e3N0eWxlfT5cbiAgICAgICAge2NvbnRleHRNZW51SXRlbXNcbiAgICAgICAgICAmJiBjb250ZXh0TWVudUl0ZW1zLm1hcFxuICAgICAgICAgICYmIGNvbnRleHRNZW51SXRlbXMubWFwKChpdGVtLCBpKSA9PiB7XG4gICAgICAgICAgICBsZXQgeyBkaXNhYmxlZCB9ID0gaXRlbTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbS5kaXNhYmxlZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICBkaXNhYmxlZCA9IGl0ZW0uZGlzYWJsZWQoc2VsZWN0ZWRJdGVtcywgc2VsZWN0ZWREYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxNZW51SXRlbVxuICAgICAgICAgICAgICAgIGtleT17aX0gLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAgICAgICAgIGhlYWRlcj17aXRlbS5oZWFkZXJ9XG4gICAgICAgICAgICAgICAgZGl2aWRlcj17aXRlbS5kaXZpZGVyfVxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgICB0aXRsZT17aXRlbS50aXRsZX1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkIHx8ICFpdGVtLm9uQ2xpY2tcbiAgICAgICAgICAgICAgICAgICAgPyBudWxsXG4gICAgICAgICAgICAgICAgICAgIDogdGhpcy5oYW5kbGVDb250ZXh0TWVudUl0ZW1DbGljayhpdGVtLm9uQ2xpY2ssIHNlbGVjdGVkSXRlbXMsIHNlbGVjdGVkRGF0YSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7aXRlbS52YWx1ZX1cbiAgICAgICAgICAgICAgPC9NZW51SXRlbT5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSl9XG4gICAgICA8L3VsPlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGdyaWRDbGFzc05hbWUgPSBjbGFzc05hbWVzKHtcbiAgICAgICdvYy1kYXRhZ3JpZC1jb250YWluZXInOiB0cnVlLFxuICAgICAgJ3dpdGgtYWN0aW9uYmFyJzogdGhpcy5wcm9wcy5pbmxpbmVFZGl0ICYmICF0aGlzLnByb3BzLmRpc2FibGVBY3Rpb25CYXIsXG4gICAgICAnaXMtYnVzeSc6IHRoaXMucHJvcHMuaXNCdXN5LFxuICAgICAgJ2lzLWVkaXRpbmcnOiB0aGlzLnByb3BzLmlzRWRpdGluZyxcbiAgICAgICdpcy1jcmVhdGluZyc6IHRoaXMucHJvcHMuaXNDcmVhdGluZyxcbiAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgfSk7XG5cbiAgICAvLyBjaGVjayBpZiB0aGVyZSBpcyBhIG5ldyByZXF1ZXN0IHRvIGNoYW5nZSBlZGl0IG1vZGUgZm9jdXNcbiAgICB0aGlzLnNldEZvY3VzVG8odGhpcy5wcm9wcy5mb2N1c1R5cGUpO1xuXG4gICAgbGV0IGFjdGlvbkJhciA9IG51bGw7XG4gICAgbGV0IGFjdGlvbkJhclJpZ2h0ID0gbnVsbDtcbiAgICBsZXQgYWN0aW9uQmFyTGVmdCA9IG51bGw7XG4gICAgaWYgKFxuICAgICAgKHRoaXMucHJvcHMuYWN0aW9uQmFyXG4gICAgICAgIHx8IHRoaXMucHJvcHMuaW5saW5lRWRpdFxuICAgICAgICB8fCB0aGlzLnByb3BzLmZpbHRlcmluZ1xuICAgICAgICB8fCB0aGlzLnByb3BzLnJlbW92aW5nKVxuICAgICAgJiYgIXRoaXMucHJvcHMuZGlzYWJsZUFjdGlvbkJhclxuICAgICkge1xuICAgICAgYWN0aW9uQmFyUmlnaHQgPSAoXG4gICAgICAgIDxBY3Rpb25CYXIgcG9zaXRpb249XCJyaWdodFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtYWN0aW9uYmFyLXJpZ2h0XCI+e3RoaXMucHJvcHMuYWN0aW9uQmFyfTwvZGl2PlxuICAgICAgICAgIHt0aGlzLnByb3BzLmZpbHRlcmluZ1xuICAgICAgICAgICAgJiYgdGhpcy5wcm9wcy5kaXNhYmxlRHJvcGRvd25cbiAgICAgICAgICAgICYmICF0aGlzLnByb3BzLmRpc2FibGVGaWx0ZXJpbmdDb250cm9scyAmJiA8RmlsdGVyaW5nQ29udHJvbHMgey4uLnRoaXMucHJvcHN9IC8+fVxuICAgICAgICAgIHt0aGlzLnByb3BzLmlubGluZUVkaXQgJiYgKFxuICAgICAgICAgICAgPElubGluZUVkaXRDb250cm9sc1xuICAgICAgICAgICAgICBhZnRlckFkZEl0ZW09e3RoaXMuaGFuZGxlQWZ0ZXJBZGRJdGVtfVxuICAgICAgICAgICAgICBhZnRlckVkaXRQcmVzcz17dGhpcy5oYW5kbGVBZnRlckVkaXRQcmVzc31cbiAgICAgICAgICAgICAgYWZ0ZXJWYWxpZGF0aW9uRXJyb3I9e3RoaXMuaGFuZGxlQWZ0ZXJWYWxpZGF0aW9uRXJyb3J9XG4gICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuICAgICAgICAgIHsodGhpcy5wcm9wcy5kcm9wZG93bk1lbnVJdGVtc1xuICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5yZW1vdmluZ1xuICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5jb2x1bW5TZXR0aW5nc1xuICAgICAgICAgICAgfHwgKHRoaXMucHJvcHMuZmlsdGVyaW5nICYmICF0aGlzLnByb3BzLmRpc2FibGVEcm9wZG93bikpICYmIChcbiAgICAgICAgICAgIDxEcm9wZG93bkNvbnRyb2xzIHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQWN0aW9uQmFyPlxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuYWN0aW9uQmFyTGVmdCB8fCB0aGlzLnByb3BzLmdyaWRIZWFkZXIpIHtcbiAgICAgIGFjdGlvbkJhckxlZnQgPSAoXG4gICAgICAgIDxBY3Rpb25CYXIgcG9zaXRpb249XCJsZWZ0XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1ncmlkaGVhZGVyXCI+e3RoaXMucHJvcHMuZ3JpZEhlYWRlcn08L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWFjdGlvbmJhci1sZWZ0XCI+e3RoaXMucHJvcHMuYWN0aW9uQmFyTGVmdH08L2Rpdj5cbiAgICAgICAgPC9BY3Rpb25CYXI+XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoYWN0aW9uQmFyTGVmdCB8fCBhY3Rpb25CYXJSaWdodCkge1xuICAgICAgYWN0aW9uQmFyID0gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWFjdGlvbmJhci1jb250YWluZXJcIj5cbiAgICAgICAgICB7YWN0aW9uQmFyTGVmdH1cbiAgICAgICAgICB7YWN0aW9uQmFyUmlnaHR9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gICAgbGV0IHJvd3NDb3VudCA9IHRoaXMucHJvcHMucm93c0NvdW50IHx8IHRoaXMucHJvcHMucm93c0NvdW50ID09PSAwXG4gICAgICA/IHRoaXMucHJvcHMucm93c0NvdW50XG4gICAgICA6IHRoaXMucHJvcHMuZGF0YS5zaXplO1xuICAgIGlmICh0aGlzLnByb3BzLmlzQ3JlYXRpbmcpIHJvd3NDb3VudCArPSB0aGlzLnByb3BzLmNyZWF0ZURhdGEuc2l6ZTtcbiAgICBpZiAoIXRoaXMucHJvcHMudmlzaWJsZUNvbHVtbnMuc2l6ZSkgcm93c0NvdW50ID0gMDtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD17YG9jLWRhdGFncmlkLSR7dGhpcy5wcm9wcy5ncmlkLmlkfWB9XG4gICAgICAgIGNsYXNzTmFtZT17Z3JpZENsYXNzTmFtZX1cbiAgICAgICAgc3R5bGU9e3RoaXMucHJvcHMuY29udGFpbmVyU3R5bGV9XG4gICAgICA+XG4gICAgICAgIHt0aGlzLnByb3BzLmlzQnVzeSAmJiA8U3Bpbm5lciAvPn1cbiAgICAgICAge3RoaXMuc3RhdGUuY29udGV4dE1lbnVPcGVuICYmIHRoaXMucmVuZGVyQ29udGV4dE1lbnUoKX1cbiAgICAgICAge2FjdGlvbkJhcn1cbiAgICAgICAgPFJlc3BvbnNpdmVGaXhlZERhdGFUYWJsZVxuICAgICAgICAgIGlkPXt0aGlzLnByb3BzLmdyaWQuaWR9XG4gICAgICAgICAgcm93c0NvdW50PXtyb3dzQ291bnR9XG4gICAgICAgICAgaGVhZGVySGVpZ2h0PXtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaXNGaWx0ZXJpbmdcbiAgICAgICAgICAgICAgPyB0aGlzLnByb3BzLmhlYWRlckhlaWdodCArIHRoaXMucHJvcHMuZmlsdGVyUm93SGVpZ2h0XG4gICAgICAgICAgICAgIDogdGhpcy5wcm9wcy5oZWFkZXJIZWlnaHRcbiAgICAgICAgICB9XG4gICAgICAgICAgcm93SGVpZ2h0PXt0aGlzLnByb3BzLnJvd0hlaWdodH1cbiAgICAgICAgICBvbkNvbHVtblJlc2l6ZUVuZENhbGxiYWNrPXt0aGlzLm9uQ29sdW1uUmVzaXplRW5kQ2FsbGJhY2t9XG4gICAgICAgICAgaXNDb2x1bW5SZXNpemluZz17ZmFsc2V9XG4gICAgICAgICAgb25Sb3dDbGljaz17dGhpcy5oYW5kbGVSb3dDbGlja31cbiAgICAgICAgICBzY3JvbGxUb0NvbHVtbj17dGhpcy5wcm9wcy5zY3JvbGxUb0NvbHVtbiB8fCB0aGlzLnN0YXRlLmN1cnJlbnRDb2x1bW59XG4gICAgICAgICAgc2Nyb2xsVG9wPXt0aGlzLnByb3BzLnNjcm9sbFRvcH1cbiAgICAgICAgICBzY3JvbGxUb1Jvdz17dGhpcy5nZXRTY3JvbGxUb1JvdygpfVxuICAgICAgICAgIG9uUm93RG91YmxlQ2xpY2s9e3RoaXMucHJvcHMub25Sb3dEb3VibGVDbGlja31cbiAgICAgICAgICBvblJvd01vdXNlRG93bj17dGhpcy5wcm9wcy5vbk1vdXNlRG93bn1cbiAgICAgICAgICBvblJvd01vdXNlRW50ZXI9e3RoaXMucHJvcHMub25Sb3dNb3VzZUVudGVyfVxuICAgICAgICAgIG9uUm93TW91c2VMZWF2ZT17dGhpcy5wcm9wcy5vblJvd01vdXNlTGVhdmV9XG4gICAgICAgICAgb25TY3JvbGxTdGFydD17dGhpcy5wcm9wcy5vblNjcm9sbFN0YXJ0fVxuICAgICAgICAgIG9uU2Nyb2xsRW5kPXt0aGlzLnByb3BzLm9uU2Nyb2xsRW5kfVxuICAgICAgICAgIHJvd0NsYXNzTmFtZUdldHRlcj17dGhpcy5nZXRSb3dDbGFzc05hbWV9XG4gICAgICAgICAgcm93SGVpZ2h0R2V0dGVyPXt0aGlzLnByb3BzLnJvd0hlaWdodEdldHRlciAmJiB0aGlzLmhhbmRsZVJvd0hlaWdodEdldHRlcn1cbiAgICAgICAgICBvbkNvbnRlbnRIZWlnaHRDaGFuZ2U9e3RoaXMucHJvcHMub25Db250ZW50SGVpZ2h0Q2hhbmdlfVxuICAgICAgICAgIG9uUm93Q29udGV4dE1lbnU9e3RoaXMuaGFuZGxlQ29udGV4dE1lbnV9XG4gICAgICAgID5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJDb2x1bW5zKCl9XG4gICAgICAgIDwvUmVzcG9uc2l2ZUZpeGVkRGF0YVRhYmxlPlxuICAgICAgICB7dGhpcy5wcm9wcy5pc0NvbHVtblNldHRpbmdzTW9kYWxPcGVuICYmIChcbiAgICAgICAgICA8Q29sdW1uU2V0dGluZ3NNb2RhbFxuICAgICAgICAgICAgZ3JpZD17dGhpcy5wcm9wcy5ncmlkfVxuICAgICAgICAgICAgY29sdW1ucz17dGhpcy5wcm9wcy5jb2x1bW5zfVxuICAgICAgICAgICAgdmlzaWJsZUNvbHVtbnM9e3RoaXMucHJvcHMudmlzaWJsZUNvbHVtbnN9XG4gICAgICAgICAgICBjbG9zZUNvbHVtblNldHRpbmdzTW9kYWw9e3RoaXMucHJvcHMuY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsfVxuICAgICAgICAgICAgc2F2ZUNvbHVtblNldHRpbmdzPXt0aGlzLnByb3BzLnNhdmVDb2x1bW5TZXR0aW5nc31cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRGF0YUdyaWQ7XG4iXX0=