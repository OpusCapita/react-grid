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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiTWFwIiwiTGlzdCIsImNvbm5lY3QiLCJpbmplY3RJbnRsIiwiRm9ybWF0dGVkTWVzc2FnZSIsIk0iLCJDb2x1bW4iLCJDZWxsIiwiTWVudUl0ZW0iLCJjbGFzc05hbWVzIiwiSWNvbiIsIlNwaW5uZXIiLCJDaGVja2JveCIsIlJlc3BvbnNpdmVGaXhlZERhdGFUYWJsZSIsIkhlYWRlckNlbGwiLCJBY3Rpb25CYXIiLCJJbmxpbmVFZGl0Q29udHJvbHMiLCJGaWx0ZXJpbmdDb250cm9scyIsIkRyb3Bkb3duQ29udHJvbHMiLCJkYXRhZ3JpZEFjdGlvbnMiLCJDZWxsVG9vbHRpcCIsIkNvbHVtblNldHRpbmdzTW9kYWwiLCJwcm9wVHlwZXMiLCJkZWZhdWx0UHJvcHMiLCJLRVlfQ09ERVMiLCJwYWdpbmF0aW9uIiwiVXRpbHMiLCJHcmlkQ29sdW1uU2VydmljZSIsIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwib3duUHJvcHMiLCJHUklEIiwiZ3JpZCIsImlzQnVzeSIsImRhdGFncmlkIiwiZ2V0SW4iLCJpZCIsImlzRWRpdGluZyIsImlzQ3JlYXRpbmciLCJpc0ZpbHRlcmluZyIsImlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW4iLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwidmlzaWJsZUNvbHVtbnMiLCJjb2x1bW5XaWR0aHMiLCJzZWxlY3RlZENlbGwiLCJzZWxlY3RlZEl0ZW1zIiwiZGF0YSIsImVkaXREYXRhIiwiY3JlYXRlRGF0YSIsImZpbHRlckRhdGEiLCJjZWxsTWVzc2FnZXMiLCJjcmVhdGVDZWxsTWVzc2FnZXMiLCJhbGxEYXRhU2l6ZSIsInNpemUiLCJsYW5ndWFnZSIsImdldExhbmd1YWdlIiwidXNlciIsInJlZ2lvbiIsImdldFJlZ2lvbiIsImRhdGVGb3JtYXQiLCJnZXREYXRlRm9ybWF0IiwidGhvdXNhbmRTZXBhcmF0b3IiLCJnZXRUaG91c2FuZFNlcGFyYXRvciIsImRlY2ltYWxTZXBhcmF0b3IiLCJnZXREZWNpbWFsU2VwYXJhdG9yIiwiZm9yY2VSZWZyZXNoVGltZXN0YW1wIiwiZ2V0IiwiZm9jdXNUeXBlIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwiRGF0YUdyaWQiLCJwcm9wcyIsImNvbnRleHRNZW51SXRlbXMiLCJzZXRTdGF0ZSIsImNvbnRleHRNZW51T3BlbiIsImRvY3VtZW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIm9uRG9jdW1lbnRDbGljayIsIm5ld0NvbHVtbldpZHRoIiwiY29sdW1uS2V5IiwicmVzaXplQ29sdW1uIiwicm93SW5kZXgiLCJjb2wiLCJlIiwiY3JlYXRlIiwiZW5hYmxlQXJyb3dOYXZpZ2F0aW9uIiwiY2VsbFJlZnMiLCJjcmVhdGVDZWxsUmVmcyIsImFycm93S2V5cyIsIkRPV04iLCJVUCIsIkxFRlQiLCJSSUdIVCIsImNvbHVtbnMiLCJvbkxhc3RDZWxsVGFiUHJlc3MiLCJncmlkQ29sdW1ucyIsImdldENvbHVtbktleUJ5SW5kZXgiLCJpIiwiZ2V0Q29sdW1uS2V5Iiwicm93c1NpemUiLCJjdXJyZW50Q2VsbCIsInByb3h5IiwiaXNDdXJzb3JBdFN0YXJ0IiwidHlwZSIsInNlbGVjdGlvblN0YXJ0IiwiaXNDdXJzb3JBdEVuZCIsInNlbGVjdGlvbkVuZCIsInZhbHVlIiwibGVuZ3RoIiwic2VsZWN0UmVmIiwic2VsZWN0IiwiZ2V0U2VsZWN0UmVmIiwiaW5jbHVkZXMiLCJrZXlDb2RlIiwicHJldmVudERlZmF1bHQiLCJFTlRFUiIsIkVTQyIsImFkZE5ld0l0ZW0iLCJnZXRDb2x1bW5EZWZhdWx0VmFsdWVzIiwiZm9jdXNUb0NyZWF0ZUNlbGwiLCJuZXh0RWxlbWVudCIsIm1lbnVJc09wZW4iLCJtb3ZlQ2VsbEZvY3VzIiwiVEFCIiwiY29sdW1uSW5kIiwiZmluZEluZGV4IiwiYyIsInZhbHVlS2V5UGF0aCIsImpvaW4iLCJkaXNhYmxlZCIsInJvd0luZCIsInNoaWZ0S2V5Iiwib25DZWxsS2V5RG93biIsInZhbHVlUGFyc2VyIiwiZXZlbnRPckRhdGEiLCJyYXdWYWx1ZSIsInRhcmdldCIsInVuZGVmaW5lZCIsImZpbHRlckNlbGxWYWx1ZUNoYW5nZSIsImNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSIsIm9uQ3JlYXRlVmFsdWVDaGFuZ2UiLCJvblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZSIsIm1hdGNoVmFsdWUiLCJvbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSIsIm5ld1ZhbHVlS2V5UGF0aCIsInYiLCJuZXdWYWx1ZSIsInZhbGlkYXRvcnMiLCJjcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZSIsImRhdGFJZCIsImdldERhdGFJZEJ5Um93SW5kZXgiLCJlZGl0Q2VsbFZhbHVlQ2hhbmdlIiwib25FZGl0VmFsdWVDaGFuZ2UiLCJvbkVkaXRDZWxsVmFsdWVDaGFuZ2UiLCJlZGl0Q2VsbFZhbHVlVmFsaWRhdGUiLCJvbkNyZWF0ZUJsdXIiLCJnZXRFZGl0SXRlbVZhbHVlIiwib25FZGl0Qmx1ciIsImNlbGxUeXBlIiwiaW5wdXRUeXBlIiwiY2VsbFNlbGVjdGlvbkNoYW5nZSIsImNlbGxTZWxlY3QiLCJjb21wb25lbnQiLCJpbnB1dFJlZiIsImlkS2V5UGF0aCIsImluZGV4Iiwib3B0aW9ucyIsImVkaXRWYWx1ZSIsIm9yaWdpbmFsVmFsdWUiLCJjb21wb25lbnRUeXBlIiwic2VsZWN0T3B0aW9ucyIsImZpbmQiLCJvYmoiLCJTdHJpbmciLCJyZXBsYWNlIiwidmFsIiwidG9KUyIsIm1vZGUiLCJjb21wb25lbnREaXNhYmxlZCIsImRpc2FibGVFZGl0aW5nIiwiZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2giLCJnZXRDcmVhdGVJdGVtVmFsdWUiLCJtYXRjaFZhbHVlS2V5UGF0aCIsInJvd0NsYXNzTmFtZXMiLCJleHRyYVJvd0NvdW50IiwicHVzaCIsImluZGV4T2YiLCJyb3dDbGFzc05hbWVHZXR0ZXIiLCJyZXR1cm5EYXRhIiwiaW5mb01lc3NhZ2UiLCJlcnJvck1lc3NhZ2UiLCJ3YXJuaW5nTWVzc2FnZSIsInNjcm9sbFRvUm93Iiwic2Nyb2xsTmV3Um93Iiwic2Nyb2xsSW5FZGl0TW9kZSIsImN1cnJlbnRSb3ciLCJnZXRTZWxlY3RlZEl0ZW1JbmRleCIsImZpcnN0IiwiZm9jdXNUbyIsInByZXZGb2N1c1RvIiwiZm9jdXNUb0xhc3RSb3ciLCJyZWYiLCJmb2N1cyIsImdldENvbXBvbmVudERpc2FibGVkU3RhdGUiLCJmb2N1c1RvRWRpdENlbGwiLCJzZWxlY3RlZFJvd0luZGV4IiwiY29sdW1uSW5kZXgiLCJlbGVtZW50VHlwZXMiLCJjdXJyZW50Q29sdW1uIiwic2V0VGltZW91dCIsInNlbGVjdEFsbEl0ZW1zQ2hhbmdlIiwiaXRlbVNlbGVjdGlvbkNoYW5nZSIsImlubGluZUVkaXQiLCJmaWx0ZXJpbmciLCJpbnRsIiwic2VsZWN0Q29tcG9uZW50T3B0aW9ucyIsImV4dHJhQ29sdW1uIiwicm93U2VsZWN0Q2hlY2tib3hDb2x1bW4iLCJzaG93U2VsZWN0QWxsQ2hlY2tib3giLCJ0YWJJbmRleCIsIndpZHRoIiwiaXNSZXNpemFibGUiLCJpc1NvcnRhYmxlIiwiY2VsbCIsInZhbHVlUmVuZGVyIiwiY2VsbEVkaXQiLCJjZWxsQ3JlYXRlIiwiY2VsbEZpbHRlciIsImhlYWRlciIsImhhbmRsZVNlbGVjdEFsbENoZWNrQm94T25DaGFuZ2UiLCJyb3dJdGVtIiwiaXRlbUlkIiwic2VsZWN0ZWQiLCJoYW5kbGVTZWxlY3Rpb25DaGVja0JveE9uQ2hhbmdlIiwiZm9yRWFjaCIsInZpc2libGVDb2x1bW5LZXkiLCJvcmdDb2wiLCJ2YWx1ZUVtcHR5Q2hlY2tlciIsImdldFZhbHVlRW1wdHlDaGVja2VyIiwiZm9ybWF0IiwiaXNSZXF1aXJlZCIsImNvbHVtbiIsImJhc2VDb2x1bW4iLCJjb2x1bW5GdW5jdGlvbnMiLCJlZGl0IiwiZ2V0SXRlbVZhbHVlIiwib25DZWxsVmFsdWVDaGFuZ2UiLCJvbkNlbGxCbHVyIiwib25FZGl0Q2VsbEJsdXIiLCJvbkNlbGxGb2N1cyIsIm9uRWRpdENlbGxLZXlEb3duIiwiaGFuZGxlQ2VsbFJlZiIsImhhbmRsZUVkaXRDZWxsUmVmIiwib25DcmVhdGVDZWxsQmx1ciIsIm9uQ3JlYXRlQ2VsbEtleURvd24iLCJoYW5kbGVDcmVhdGVDZWxsUmVmIiwiZmlsdGVyIiwiZ2V0RmlsdGVySXRlbVZhbHVlIiwib25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UiLCJjZWxsUHJvcHMiLCJjb2x1bW5DZWxsIiwiY29tcG9uZW50VHlwZVByb3BzIiwiY29sdW1uQ29tcG9uZW50VHlwZSIsInBhZGRpbmciLCJyZW1vdmVOZXdJdGVtIiwiZm9jdXNUb0Vycm9yQ2VsbCIsInJvd1NlbGVjdCIsImN0cmxLZXkiLCJnZXRTZWxlY3Rpb24iLCJyZW1vdmVBbGxSYW5nZXMiLCJwYXJlbnROb2RlIiwicGFyZW50MWNsYXNzIiwiY2xhc3NOYW1lIiwicGFyZW50MmNsYXNzIiwicGFyZW50M2NsYXNzIiwicGFyZW50NGNsYXNzIiwibXVsdGlTZWxlY3QiLCJvblJvd0NsaWNrIiwic3RvcFByb3BhZ2F0aW9uIiwiY29udGV4dE1lbnVYIiwiY2xpZW50WCIsImNvbnRleHRNZW51WSIsImNsaWVudFkiLCJhZGRFdmVudExpc3RlbmVyIiwib25DbGljayIsInNlbGVjdGVkRGF0YSIsInJvd0hlaWdodEdldHRlciIsImV4aXN0aW5nUm93c0luZGV4IiwiaXNTcGVjaWFsIiwiZ2V0Um93SW5kZXgiLCJtZXNzYWdlRGF0YSIsImdldENlbGxNZXNzYWdlcyIsImlzRWRpdGVkIiwiaXNDZWxsRWRpdGVkIiwic3R5bGUiLCJoYW5kbGVDZWxsU2VsZWN0IiwidGV4dEFsaWduIiwiZ2VuZXJhdGVDb2x1bW5zIiwibGVuZ2h0IiwibWFwIiwic29ydENoYW5nZSIsInJlbmRlckNlbGwiLCJtaW5XaWR0aCIsIm1heFdpZHRoIiwiZmxleEdyb3ciLCJmaXhlZCIsImZpeGVkUmlnaHQiLCJhbGxvd0NlbGxzUmVjeWNsaW5nIiwiZGlzcGxheSIsInpJbmRleCIsInBvc2l0aW9uIiwidG9wIiwibGVmdCIsImQiLCJpdGVtIiwiZGl2aWRlciIsInRpdGxlIiwiaGFuZGxlQ29udGV4dE1lbnVJdGVtQ2xpY2siLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImludmFsaWRhdGUiLCJyZW5kZXIiLCJncmlkQ2xhc3NOYW1lIiwiZGlzYWJsZUFjdGlvbkJhciIsInNldEZvY3VzVG8iLCJhY3Rpb25CYXIiLCJhY3Rpb25CYXJSaWdodCIsImFjdGlvbkJhckxlZnQiLCJyZW1vdmluZyIsImRpc2FibGVEcm9wZG93biIsImRpc2FibGVGaWx0ZXJpbmdDb250cm9scyIsImhhbmRsZUFmdGVyQWRkSXRlbSIsImhhbmRsZUFmdGVyRWRpdFByZXNzIiwiaGFuZGxlQWZ0ZXJWYWxpZGF0aW9uRXJyb3IiLCJkcm9wZG93bk1lbnVJdGVtcyIsImNvbHVtblNldHRpbmdzIiwiZ3JpZEhlYWRlciIsInJvd3NDb3VudCIsImNvbnRhaW5lclN0eWxlIiwicmVuZGVyQ29udGV4dE1lbnUiLCJoZWFkZXJIZWlnaHQiLCJmaWx0ZXJSb3dIZWlnaHQiLCJyb3dIZWlnaHQiLCJvbkNvbHVtblJlc2l6ZUVuZENhbGxiYWNrIiwiaGFuZGxlUm93Q2xpY2siLCJzY3JvbGxUb0NvbHVtbiIsInNjcm9sbFRvcCIsImdldFNjcm9sbFRvUm93Iiwib25Sb3dEb3VibGVDbGljayIsIm9uTW91c2VEb3duIiwib25Sb3dNb3VzZUVudGVyIiwib25Sb3dNb3VzZUxlYXZlIiwib25TY3JvbGxTdGFydCIsIm9uU2Nyb2xsRW5kIiwiZ2V0Um93Q2xhc3NOYW1lIiwiaGFuZGxlUm93SGVpZ2h0R2V0dGVyIiwib25Db250ZW50SGVpZ2h0Q2hhbmdlIiwiaGFuZGxlQ29udGV4dE1lbnUiLCJyZW5kZXJDb2x1bW5zIiwiY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsIiwic2F2ZUNvbHVtblNldHRpbmdzIiwiY2hpbGRyZW4iLCJQdXJlQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTtBQUNBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxTQUFTQyxHQUFU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RSxLQUFLdFIsS0FBTCxDQUFXdVIsZUFsQjlCO0FBbUJFLE1BQUEsYUFBYSxFQUFFLEtBQUt2UixLQUFMLENBQVd3UixhQW5CNUI7QUFvQkUsTUFBQSxXQUFXLEVBQUUsS0FBS3hSLEtBQUwsQ0FBV3lSLFdBcEIxQjtBQXFCRSxNQUFBLGtCQUFrQixFQUFFLEtBQUtDLGVBckIzQjtBQXNCRSxNQUFBLGVBQWUsRUFBRSxLQUFLMVIsS0FBTCxDQUFXdU4sZUFBWCxJQUE4QixLQUFLb0UscUJBdEJ0RDtBQXVCRSxNQUFBLHFCQUFxQixFQUFFLEtBQUszUixLQUFMLENBQVc0UixxQkF2QnBDO0FBd0JFLE1BQUEsZ0JBQWdCLEVBQUUsS0FBS0M7QUF4QnpCLE9BMEJHLEtBQUtDLGFBQUwsRUExQkgsQ0FSRixFQW9DRyxLQUFLOVIsS0FBTCxDQUFXL0IseUJBQVgsSUFDQyxvQkFBQyxtQkFBRDtBQUNFLE1BQUEsSUFBSSxFQUFFLEtBQUsrQixLQUFMLENBQVd2QyxJQURuQjtBQUVFLE1BQUEsT0FBTyxFQUFFLEtBQUt1QyxLQUFMLENBQVdzQixPQUZ0QjtBQUdFLE1BQUEsY0FBYyxFQUFFLEtBQUt0QixLQUFMLENBQVc1QixjQUg3QjtBQUlFLE1BQUEsd0JBQXdCLEVBQUUsS0FBSzRCLEtBQUwsQ0FBVytSLHdCQUp2QztBQUtFLE1BQUEsa0JBQWtCLEVBQUUsS0FBSy9SLEtBQUwsQ0FBV2dTO0FBTGpDLE1BckNKLEVBNkNHLEtBQUtoUyxLQUFMLENBQVdpUyxRQTdDZCxDQURGO0FBaURELEc7OztFQXJ0Q29CelcsS0FBSyxDQUFDMFcsYSw0Q0FHTGxWLFk7QUFxdEN4QixlQUFlK0MsUUFBZiIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLWxvbmVseS1pZiwgcHJlZmVyLXRlbXBsYXRlLCByZWFjdC9yZXF1aXJlLWRlZmF1bHQtcHJvcHMgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBNYXAsIExpc3QgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IGluamVjdEludGwsIEZvcm1hdHRlZE1lc3NhZ2UgYXMgTSB9IGZyb20gJ3JlYWN0LWludGwnO1xuaW1wb3J0IHsgQ29sdW1uLCBDZWxsIH0gZnJvbSAnZml4ZWQtZGF0YS10YWJsZS0yJztcbmltcG9ydCB7IE1lbnVJdGVtIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHsgSWNvbiB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWljb25zJztcbmltcG9ydCBTcGlubmVyIGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXNwaW5uZXInO1xuaW1wb3J0IENoZWNrYm94IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWNoZWNrYm94JztcbmltcG9ydCAnZml4ZWQtZGF0YS10YWJsZS0yL2Rpc3QvZml4ZWQtZGF0YS10YWJsZS5jc3MnO1xuXG5pbXBvcnQgUmVzcG9uc2l2ZUZpeGVkRGF0YVRhYmxlIGZyb20gJy4vcmVzcG9uc2l2ZS1maXhlZC1kYXRhLXRhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgSGVhZGVyQ2VsbCBmcm9tICcuL2hlYWRlci1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgQWN0aW9uQmFyIGZyb20gJy4vYWN0aW9uLWJhci5jb21wb25lbnQnO1xuaW1wb3J0IElubGluZUVkaXRDb250cm9scyBmcm9tICcuL2lubGluZS1lZGl0LWNvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgRmlsdGVyaW5nQ29udHJvbHMgZnJvbSAnLi9maWx0ZXJpbmctY29udHJvbHMuY29tcG9uZW50JztcbmltcG9ydCBEcm9wZG93bkNvbnRyb2xzIGZyb20gJy4vZHJvcGRvd24tY29udHJvbHMuY29tcG9uZW50JztcbmltcG9ydCAqIGFzIGRhdGFncmlkQWN0aW9ucyBmcm9tICcuL2RhdGFncmlkLmFjdGlvbnMnO1xuaW1wb3J0IENlbGxUb29sdGlwIGZyb20gJy4vY2VsbC10b29sdGlwLmNvbXBvbmVudCc7XG5pbXBvcnQgQ29sdW1uU2V0dGluZ3NNb2RhbCBmcm9tICcuL2NvbHVtbi1zZXR0aW5ncy9jb2x1bW4tc2V0dGluZ3MuY29tcG9uZW50JztcbmltcG9ydCB7IHByb3BUeXBlcywgZGVmYXVsdFByb3BzIH0gZnJvbSAnLi9kYXRhZ3JpZC5wcm9wcyc7XG5pbXBvcnQgeyBLRVlfQ09ERVMgfSBmcm9tICcuL2RhdGFncmlkLmNvbnN0YW50cyc7XG5pbXBvcnQgcGFnaW5hdGlvbiBmcm9tICcuL3BhZ2luYXRpb24uY29tcG9uZW50JztcbmltcG9ydCBVdGlscyBmcm9tICcuL2RhdGFncmlkLnV0aWxzJztcbmltcG9ydCBHcmlkQ29sdW1uU2VydmljZSBmcm9tICcuL2NvbHVtbi1zZXJ2aWNlL2NvbHVtbi1zZXJ2aWNlJztcbmltcG9ydCAnLi9kYXRhZ3JpZC5jb21wb25lbnQuc2Nzcyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSwgb3duUHJvcHMpID0+IHtcbiAgY29uc3QgR1JJRCA9IG93blByb3BzLmdyaWQ7XG4gIHJldHVybiB7XG4gICAgaXNCdXN5OiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnaXNCdXN5J10sIHRydWUpLFxuICAgIGlzRWRpdGluZzogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2lzRWRpdGluZyddLCBmYWxzZSksXG4gICAgaXNDcmVhdGluZzogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2lzQ3JlYXRpbmcnXSwgZmFsc2UpLFxuICAgIGlzRmlsdGVyaW5nOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2lzRmlsdGVyaW5nJ10sIGZhbHNlKSxcbiAgICBpc0NvbHVtblNldHRpbmdzTW9kYWxPcGVuOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihcbiAgICAgIFtHUklELmlkLCAnc2Vzc2lvbicsICdjb2x1bW5TZXR0aW5nc01vZGFsJywgJ29wZW4nXSxcbiAgICAgIGZhbHNlLFxuICAgICksXG4gICAgc29ydENvbHVtbjogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnc29ydGluZ0RhdGEnLCAnc29ydENvbHVtbiddLCBudWxsKSxcbiAgICBzb3J0T3JkZXI6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ3NvcnRpbmdEYXRhJywgJ3NvcnRPcmRlciddLCBudWxsKSxcbiAgICB2aXNpYmxlQ29sdW1uczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAndmlzaWJsZUNvbHVtbnMnXSwgTGlzdCgpKSxcbiAgICBjb2x1bW5XaWR0aHM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ2NvbHVtbldpZHRocyddLCBNYXAoKSksXG4gICAgc2VsZWN0ZWRDZWxsOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3NlbGVjdGVkQ2VsbCddLCBNYXAoKSksXG4gICAgc2VsZWN0ZWRJdGVtczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZWxlY3RlZEl0ZW1zJ10sIExpc3QoKSksXG4gICAgZGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdkYXRhJ10sIExpc3QoKSksXG4gICAgZWRpdERhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnZWRpdERhdGEnXSwgTWFwKCkpLFxuICAgIGNyZWF0ZURhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY3JlYXRlRGF0YSddLCBMaXN0KCkpLFxuICAgIGZpbHRlckRhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnZmlsdGVyRGF0YSddLCBNYXAoKSksXG4gICAgY2VsbE1lc3NhZ2VzOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NlbGxNZXNzYWdlcyddLCBNYXAoKSksXG4gICAgY3JlYXRlQ2VsbE1lc3NhZ2VzOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NyZWF0ZUNlbGxNZXNzYWdlcyddLCBNYXAoKSksXG4gICAgYWxsRGF0YVNpemU6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnYWxsRGF0YSddLCBMaXN0KCkpLnNpemUsXG4gICAgbGFuZ3VhZ2U6IFV0aWxzLmdldExhbmd1YWdlKEdSSUQsIHN0YXRlLnVzZXIpLFxuICAgIHJlZ2lvbjogVXRpbHMuZ2V0UmVnaW9uKEdSSUQsIHN0YXRlLnVzZXIpLFxuICAgIGRhdGVGb3JtYXQ6IFV0aWxzLmdldERhdGVGb3JtYXQoR1JJRCwgc3RhdGUudXNlciksXG4gICAgdGhvdXNhbmRTZXBhcmF0b3I6IFV0aWxzLmdldFRob3VzYW5kU2VwYXJhdG9yKEdSSUQsIHN0YXRlLnVzZXIpLFxuICAgIGRlY2ltYWxTZXBhcmF0b3I6IFV0aWxzLmdldERlY2ltYWxTZXBhcmF0b3IoR1JJRCwgc3RhdGUudXNlciksXG4gICAgZm9yY2VSZWZyZXNoVGltZXN0YW1wOiBzdGF0ZS5kYXRhZ3JpZC5nZXQoJ2ZvcmNlUmVmcmVzaCcsIDApLCAvLyBmb3JjZSByZS1yZW5kZXIgd2hlbiBjaGFuZ2VkXG4gICAgZm9jdXNUeXBlOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnZm9jdXNUeXBlJ10sIE1hcCgpKSxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRhdGFncmlkQWN0aW9ucztcblxuQHBhZ2luYXRpb25cbkBpbmplY3RJbnRsXG5AY29ubmVjdChcbiAgbWFwU3RhdGVUb1Byb3BzLFxuICBtYXBEaXNwYXRjaFRvUHJvcHMsXG4pXG5jbGFzcyBEYXRhR3JpZCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0gcHJvcFR5cGVzO1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGN1cnJlbnRSb3c6IDAsXG4gICAgICBjdXJyZW50Q29sdW1uOiAwLFxuICAgICAgY29udGV4dE1lbnVPcGVuOiBmYWxzZSxcbiAgICAgIGNvbnRleHRNZW51WDogbnVsbCxcbiAgICAgIGNvbnRleHRNZW51WTogbnVsbCxcbiAgICB9O1xuICAgIHRoaXMuY2VsbFJlZnMgPSB7fTtcbiAgICB0aGlzLmNyZWF0ZUNlbGxSZWZzID0ge307XG4gICAgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCA9IGZhbHNlO1xuICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gZmFsc2U7IC8vIFRPRE86IEhhbmRsZSBmb2N1c2luZyB3aGVuIHRydWVcbiAgICB0aGlzLmZvY3VzVG9FcnJvckNlbGwgPSBmYWxzZTsgLy8gVE9ETzogSGFuZGxlIGZvY3VzaW5nIHdoZW4gdHJ1ZVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uRG9jdW1lbnRDbGljayk7XG4gICAgdGhpcy5wcm9wcy5pbnZhbGlkYXRlKHRoaXMucHJvcHMuZ3JpZCk7XG4gIH1cblxuICBvbkRvY3VtZW50Q2xpY2sgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuY29udGV4dE1lbnVJdGVtcykge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGNvbnRleHRNZW51T3BlbjogZmFsc2UsXG4gICAgICB9KTtcbiAgICB9XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uRG9jdW1lbnRDbGljayk7XG4gIH07XG5cbiAgb25Db2x1bW5SZXNpemVFbmRDYWxsYmFjayA9IChuZXdDb2x1bW5XaWR0aCwgY29sdW1uS2V5KSA9PiB7XG4gICAgdGhpcy5wcm9wcy5yZXNpemVDb2x1bW4odGhpcy5wcm9wcy5ncmlkLCBjb2x1bW5LZXksIG5ld0NvbHVtbldpZHRoKTtcbiAgfTtcblxuICAvKipcbiAgICogQHBhcmFtIHJvd0luZGV4IChpbnQpXG4gICAqIEBwYXJhbSBjb2wgKG9iaikuIENvbHVtbiBvYmplY3QuXG4gICAqIEBwYXJhbSBlLiBPcmlnaW5hbCBLZXlEb3duIGV2ZW50XG4gICAqIEBwYXJhbSBjcmVhdGUgKGJvb2wpLiBJcyB0aGUgY2VsbCBjcmVhdGUgY2VsbCBvciBlZGl0IGNlbGw/XG4gICAqL1xuICBvbkNlbGxLZXlEb3duID0gKHJvd0luZGV4LCBjb2wsIGUsIGNyZWF0ZSA9IGZhbHNlKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuZW5hYmxlQXJyb3dOYXZpZ2F0aW9uKSB7XG4gICAgICBjb25zdCBjZWxsUmVmcyA9IGNyZWF0ZSA/IHRoaXMuY3JlYXRlQ2VsbFJlZnMgOiB0aGlzLmNlbGxSZWZzO1xuICAgICAgY29uc3QgYXJyb3dLZXlzID0gW0tFWV9DT0RFUy5ET1dOLCBLRVlfQ09ERVMuVVAsIEtFWV9DT0RFUy5MRUZULCBLRVlfQ09ERVMuUklHSFRdO1xuICAgICAgY29uc3Qge1xuICAgICAgICBjb2x1bW5zLCB2aXNpYmxlQ29sdW1ucywgZ3JpZCwgZGF0YSwgb25MYXN0Q2VsbFRhYlByZXNzLFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCBncmlkQ29sdW1ucyA9IFV0aWxzLnZpc2libGVDb2x1bW5zKGNvbHVtbnMsIHZpc2libGVDb2x1bW5zKTtcbiAgICAgIGNvbnN0IGdldENvbHVtbktleUJ5SW5kZXggPSBpID0+IFV0aWxzLmdldENvbHVtbktleShncmlkQ29sdW1uc1tpXSk7XG4gICAgICBjb25zdCByb3dzU2l6ZSA9IGRhdGEuc2l6ZTtcbiAgICAgIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2wpO1xuICAgICAgbGV0IGN1cnJlbnRDZWxsID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtjb2x1bW5LZXl9XyR7cm93SW5kZXh9YF07XG4gICAgICBsZXQgcHJveHkgPSBudWxsO1xuXG4gICAgICBjb25zdCBpc0N1cnNvckF0U3RhcnQgPSAoKSA9PiB7XG4gICAgICAgIGlmIChjdXJyZW50Q2VsbC50eXBlICE9PSAndGV4dCcpIHJldHVybiB0cnVlO1xuICAgICAgICByZXR1cm4gY3VycmVudENlbGwuc2VsZWN0aW9uU3RhcnQgPT09IDA7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBpc0N1cnNvckF0RW5kID0gKCkgPT4ge1xuICAgICAgICBpZiAoY3VycmVudENlbGwudHlwZSAhPT0gJ3RleHQnKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRDZWxsLnNlbGVjdGlvbkVuZCA9PT0gY3VycmVudENlbGwudmFsdWUubGVuZ3RoO1xuICAgICAgfTtcblxuICAgICAgLy8gSWYgY3VycmVudCBjZWxsIGhvbGRzIGEgcmVhY3QtZmxvYXRpbmctc2VsZWN0IGNvbXBvbmVudFxuICAgICAgaWYgKGN1cnJlbnRDZWxsICYmIChjdXJyZW50Q2VsbC5zZWxlY3RSZWYgfHwgdHlwZW9mIGN1cnJlbnRDZWxsLnNlbGVjdCA9PT0gJ29iamVjdCcpKSB7XG4gICAgICAgIHByb3h5ID0gY3VycmVudENlbGw7XG4gICAgICAgIGN1cnJlbnRDZWxsID0gdGhpcy5nZXRTZWxlY3RSZWYocHJveHkpO1xuICAgICAgfVxuXG4gICAgICAvLyBQcmV2ZW50cyB1cC9kb3duIGFycm93IGZyb20gY2hhbmdpbmcgbnVtYmVyIGZpZWxkIHZhbHVlXG4gICAgICBpZiAoYXJyb3dLZXlzLmluY2x1ZGVzKGUua2V5Q29kZSkgJiYgY3VycmVudENlbGwudHlwZSA9PT0gJ251bWJlcicpIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLkVOVEVSOlxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5FU0M6IHtcbiAgICAgICAgICBpZiAoY3JlYXRlICYmIGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLkVOVEVSKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmFkZE5ld0l0ZW0oZ3JpZCwgVXRpbHMuZ2V0Q29sdW1uRGVmYXVsdFZhbHVlcyhjb2x1bW5zKSk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjdXJyZW50Q2VsbC5zZWxlY3QoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5ET1dOOiB7XG4gICAgICAgICAgbGV0IG5leHRFbGVtZW50ID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtjb2x1bW5LZXl9XyR7cm93SW5kZXggKyAxfWBdO1xuXG4gICAgICAgICAgLy8gUHJldmVudHMgbWVudSBmcm9tIG9wZW5pbmdcbiAgICAgICAgICBpZiAocHJveHkgJiYgcHJveHkuc2VsZWN0UmVmICYmICFwcm94eS5zZWxlY3RSZWYuc3RhdGUubWVudUlzT3Blbikge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKCFuZXh0RWxlbWVudCkgYnJlYWs7XG4gICAgICAgICAgICBuZXh0RWxlbWVudCA9IHRoaXMuZ2V0U2VsZWN0UmVmKG5leHRFbGVtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5tb3ZlQ2VsbEZvY3VzKG5leHRFbGVtZW50LCByb3dJbmRleCArIDEsIC0xKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5VUDoge1xuICAgICAgICAgIGxldCBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4IC0gMX1gXTtcblxuICAgICAgICAgIC8vIFByZXZlbnRzIG1lbnUgZnJvbSBvcGVuaW5nXG4gICAgICAgICAgaWYgKHByb3h5ICYmIHByb3h5LnNlbGVjdFJlZiAmJiAhcHJveHkuc2VsZWN0UmVmLnN0YXRlLm1lbnVJc09wZW4pIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmICghbmV4dEVsZW1lbnQpIGJyZWFrO1xuICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSB0aGlzLmdldFNlbGVjdFJlZihuZXh0RWxlbWVudCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubW92ZUNlbGxGb2N1cyhuZXh0RWxlbWVudCwgcm93SW5kZXggLSAxLCAtMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuVEFCOlxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5SSUdIVDpcbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuTEVGVDoge1xuICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5SSUdIVCAmJiAhaXNDdXJzb3JBdEVuZCgpKSBicmVhaztcbiAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuTEVGVCAmJiAhaXNDdXJzb3JBdFN0YXJ0KCkpIGJyZWFrO1xuXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgbGV0IGNvbHVtbkluZCA9IGdyaWRDb2x1bW5zLmZpbmRJbmRleChjID0+IGMudmFsdWVLZXlQYXRoLmpvaW4oJy8nKSA9PT0gY29sdW1uS2V5KTtcbiAgICAgICAgICBpZiAoY29sdW1uSW5kICE9PSAtMSkge1xuICAgICAgICAgICAgbGV0IGRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCBuZXh0RWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICBsZXQgcm93SW5kID0gcm93SW5kZXg7XG4gICAgICAgICAgICB3aGlsZSAoZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgLy8gTW92aW5nIHRvIHRoZSBsZWZ0XG4gICAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5MRUZUIHx8IChlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5UQUIgJiYgZS5zaGlmdEtleSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29sdW1uSW5kIC0gMSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgLT0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJvd0luZCAtIDEgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kID0gZ3JpZENvbHVtbnMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAgIHJvd0luZCAtPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gTW92aW5nIHRvIHRoZSByaWdodFxuICAgICAgICAgICAgICAgIGlmIChjb2x1bW5JbmQgKyAxIDwgZ3JpZENvbHVtbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgKz0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJvd0luZCArIDEgPCByb3dzU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kID0gMDtcbiAgICAgICAgICAgICAgICAgIHJvd0luZCArPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm93SW5kICsgMSA9PT0gcm93c1NpemUpIHtcbiAgICAgICAgICAgICAgICAgIC8vIElmIHRyeWluZyB0byBzZWxlY3QgYSByb3csIHdoZW4gdGhlcmUgaXMgbm9uZTpcbiAgICAgICAgICAgICAgICAgIGlmIChvbkxhc3RDZWxsVGFiUHJlc3MgJiYgZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuVEFCKSBvbkxhc3RDZWxsVGFiUHJlc3MoZSk7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Z2V0Q29sdW1uS2V5QnlJbmRleChjb2x1bW5JbmQpfV8ke3Jvd0luZH1gXTtcblxuICAgICAgICAgICAgICAvLyBJZiB3ZSBjYW5ub3QgZm9jdXMgb24gdGhlIG5leHQgZWxlbWVudCB3aGlsZSBtb3ZpbmcgdG8gdGhlIHJpZ2h0XG4gICAgICAgICAgICAgIGlmICghbmV4dEVsZW1lbnQgJiYgZS5rZXlDb2RlICE9PSBLRVlfQ09ERVMuTEVGVCkge1xuICAgICAgICAgICAgICAgIC8vIElmIHdlJ3JlIG5vdCB5ZXQgaW4gdGhlIGxhc3QgZm9jdXNhYmxlIGNvbHVtblxuICAgICAgICAgICAgICAgIGlmIChjb2x1bW5JbmQgPD0gZ3JpZENvbHVtbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICB3aGlsZSAoY29sdW1uSW5kIDw9IGdyaWRDb2x1bW5zLmxlbmd0aCAmJiAhbmV4dEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2dldENvbHVtbktleUJ5SW5kZXgoY29sdW1uSW5kKX1fJHtyb3dJbmR9YF07XG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCArPSAxO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHdlIGFyZSBpbiB0aGUgbGFzdCBjb2x1bW4gYW5kIHdlIGRvbid0IGhhdmUgYW4gZWxlbWVudCB0byBmb2N1cyBvbixcbiAgICAgICAgICAgICAgICAgICAgLy8gd2UgbXVzdCBtb3ZlIHRvIHRoZSBuZXh0IHJvdyAoaWYgcG9zc2libGUpXG4gICAgICAgICAgICAgICAgICAgIGlmICghbmV4dEVsZW1lbnQgJiYgY29sdW1uSW5kID09PSBncmlkQ29sdW1ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB0cnlpbmcgdG8gc2VsZWN0IGEgcm93LCB3aGVuIHRoZXJlIGlzIG5vbmU6XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHJvd0luZCArIDEgPT09IHJvd3NTaXplKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob25MYXN0Q2VsbFRhYlByZXNzICYmIGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLlRBQikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkxhc3RDZWxsVGFiUHJlc3MoZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgIHJvd0luZCArPSAxO1xuICAgICAgICAgICAgICAgICAgICAgIG5leHRFbGVtZW50ID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtnZXRDb2x1bW5LZXlCeUluZGV4KGNvbHVtbkluZCl9XyR7cm93SW5kfWBdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIElmIHdlIGNhbm5vdCBmb2N1cyBvbiB0aGUgbmV4dCBlbGVtZW50IHdoaWxlIG1vdmluZyB0byB0aGUgbGVmdFxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFuZXh0RWxlbWVudCAmJiBlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5MRUZUKSB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGNvbHVtbkluZCA+IDAgJiYgIW5leHRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgLT0gMTtcbiAgICAgICAgICAgICAgICAgIG5leHRFbGVtZW50ID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtnZXRDb2x1bW5LZXlCeUluZGV4KGNvbHVtbkluZCl9XyR7cm93SW5kfWBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBpZiBubyBlbGVtZW50IHdhcyBmb3VuZCwgdHJ5IG1vdmluZyB0byBwcmV2aW91cyByb3dcbiAgICAgICAgICAgICAgICAvLyAobmVlZGVkIGluIGNhc2UgZmlyc3QgY29sdW1uIGlzIG5vdCBlZGl0YWJsZSBlLmcuIGFuIEV4dHJhQ29sdW1uKVxuICAgICAgICAgICAgICAgIGlmIChyb3dJbmQgPiAwICYmICFuZXh0RWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kID0gZ3JpZENvbHVtbnMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAgIHJvd0luZCAtPSAxO1xuICAgICAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2dldENvbHVtbktleUJ5SW5kZXgoY29sdW1uSW5kKX1fJHtyb3dJbmR9YF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGRpc2FibGVkID0gbmV4dEVsZW1lbnQgPyBuZXh0RWxlbWVudC5kaXNhYmxlZCA6IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFkaXNhYmxlZCAmJiBuZXh0RWxlbWVudCkge1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIG5leHRFbGVtZW50LnNlbGVjdCA9PT0gJ29iamVjdCcgfHwgbmV4dEVsZW1lbnQuc2VsZWN0UmVmKSB7XG4gICAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSB0aGlzLmdldFNlbGVjdFJlZihuZXh0RWxlbWVudCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy5tb3ZlQ2VsbEZvY3VzKG5leHRFbGVtZW50LCByb3dJbmQsIGNvbHVtbkluZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIG9uRWRpdENlbGxLZXlEb3duID0gKHJvd0luZGV4LCBjb2wpID0+IChlKSA9PiB7XG4gICAgdGhpcy5vbkNlbGxLZXlEb3duKHJvd0luZGV4LCBjb2wsIGUpO1xuICB9O1xuXG4gIG9uQ3JlYXRlQ2VsbEtleURvd24gPSAocm93SW5kZXgsIGNvbCkgPT4gKGUpID0+IHtcbiAgICB0aGlzLm9uQ2VsbEtleURvd24ocm93SW5kZXgsIGNvbCwgZSwgdHJ1ZSk7XG4gIH07XG5cbiAgb25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UgPSAoY29sLCB2YWx1ZVBhcnNlcikgPT4gKGV2ZW50T3JEYXRhKSA9PiB7XG4gICAgbGV0IHJhd1ZhbHVlO1xuICAgIC8vIGV2ZW50T3JEYXRhIGNhbiBiZSBpbnB1dCBvbkNoYW5nZSBldmVudCwgcmVhY3Qtc2VsZWN0IG9uQ2hhbmdlIG9yIHJlYWN0LWRheS1waWNrZXIgb25DaGFuZ2VcbiAgICBpZiAoZXZlbnRPckRhdGEpIHtcbiAgICAgIGlmIChldmVudE9yRGF0YS50YXJnZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnRPckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSB2YWx1ZVBhcnNlcihyYXdWYWx1ZSk7XG4gICAgdGhpcy5wcm9wcy5maWx0ZXJDZWxsVmFsdWVDaGFuZ2UodGhpcy5wcm9wcy5ncmlkLCB0aGlzLnByb3BzLmNvbHVtbnMsIGNvbCwgdmFsdWUpO1xuICB9O1xuXG4gIG9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlID0gKHJvd0luZGV4LCBjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZXZlbnRPckRhdGEpID0+IHtcbiAgICBsZXQgcmF3VmFsdWU7XG4gICAgLy8gZXZlbnRPckRhdGEgY2FuIGJlIGlucHV0IG9uQ2hhbmdlIGV2ZW50LCByZWFjdC1zZWxlY3Qgb25DaGFuZ2Ugb3IgcmVhY3QtZGF5LXBpY2tlciBvbkNoYW5nZVxuICAgIGlmIChldmVudE9yRGF0YSkge1xuICAgICAgaWYgKGV2ZW50T3JEYXRhLnRhcmdldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChldmVudE9yRGF0YS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCB2YWx1ZSA9IHZhbHVlUGFyc2VyKHJhd1ZhbHVlKTtcblxuICAgIHRoaXMucHJvcHMuY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlKHRoaXMucHJvcHMuZ3JpZCwgcm93SW5kZXgsIGNvbC52YWx1ZUtleVBhdGgsIHZhbHVlKTtcbiAgICBpZiAoY29sLm9uQ3JlYXRlVmFsdWVDaGFuZ2UpIHtcbiAgICAgIGNvbC5vbkNyZWF0ZVZhbHVlQ2hhbmdlKHZhbHVlLCBjb2wudmFsdWVLZXlQYXRoLCByb3dJbmRleCk7XG4gICAgfVxuICAgIGlmIChjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUgJiYgdmFsdWUgPT09IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5tYXRjaFZhbHVlKSB7XG4gICAgICAvLyBDYWxsIHNwZWNpYWwgcGFpcmVkIHZhbHVlIGNoYW5nZSBvbiBvdGhlciBjZWxsIGlmIHZhbHVlIG1hdGNoZXNcbiAgICAgIHRoaXMub25DcmVhdGVDZWxsVmFsdWVDaGFuZ2UoXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICB7IHZhbHVlS2V5UGF0aDogY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm5ld1ZhbHVlS2V5UGF0aCB9LFxuICAgICAgICB2ID0+IHYsXG4gICAgICApKGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5uZXdWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjb2wudmFsaWRhdG9ycykge1xuICAgICAgdGhpcy5wcm9wcy5jcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZShcbiAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgY29sLnZhbHVlS2V5UGF0aCxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIGNvbC52YWxpZGF0b3JzLFxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgb25FZGl0Q2VsbFZhbHVlQ2hhbmdlID0gKHJvd0luZGV4LCBjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZXZlbnRPckRhdGEpID0+IHtcbiAgICBjb25zdCBkYXRhSWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgIGxldCByYXdWYWx1ZTtcbiAgICAvLyBldmVudE9yRGF0YSBjYW4gYmUgaW5wdXQgb25DaGFuZ2UgZXZlbnQsIHJlYWN0LXNlbGVjdCBvbkNoYW5nZSBvciByZWFjdC1kYXktcGlja2VyIG9uQ2hhbmdlXG4gICAgaWYgKGV2ZW50T3JEYXRhKSB7XG4gICAgICBpZiAoZXZlbnRPckRhdGEudGFyZ2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YS50YXJnZXQudmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50T3JEYXRhLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YS52YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGE7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlID0gdmFsdWVQYXJzZXIocmF3VmFsdWUpO1xuICAgIHRoaXMucHJvcHMuZWRpdENlbGxWYWx1ZUNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIGRhdGFJZCwgY29sLnZhbHVlS2V5UGF0aCwgdmFsdWUpO1xuICAgIGlmIChjb2wub25FZGl0VmFsdWVDaGFuZ2UpIHtcbiAgICAgIGNvbC5vbkVkaXRWYWx1ZUNoYW5nZSh2YWx1ZSwgY29sLnZhbHVlS2V5UGF0aCwgcm93SW5kZXgsIGRhdGFJZCk7XG4gICAgfVxuICAgIGlmIChjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUgJiYgdmFsdWUgPT09IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5tYXRjaFZhbHVlKSB7XG4gICAgICAvLyBDYWxsIHNwZWNpYWwgcGFpcmVkIHZhbHVlIGNoYW5nZSBvbiBvdGhlciBjZWxsIGlmIHZhbHVlIG1hdGNoZXNcbiAgICAgIHRoaXMub25FZGl0Q2VsbFZhbHVlQ2hhbmdlKFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgeyB2YWx1ZUtleVBhdGg6IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5uZXdWYWx1ZUtleVBhdGggfSxcbiAgICAgICAgdiA9PiB2LFxuICAgICAgKShjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY29sLnZhbGlkYXRvcnMpIHtcbiAgICAgIHRoaXMucHJvcHMuZWRpdENlbGxWYWx1ZVZhbGlkYXRlKFxuICAgICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICAgIGRhdGFJZCxcbiAgICAgICAgY29sLnZhbHVlS2V5UGF0aCxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIGNvbC52YWxpZGF0b3JzLFxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgb25DcmVhdGVDZWxsQmx1ciA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGUpID0+IHtcbiAgICBpZiAoY29sLm9uQ3JlYXRlQmx1cikge1xuICAgICAgbGV0IHZhbHVlID0gZSAmJiBlLnRhcmdldCAmJiBlLnRhcmdldC52YWx1ZSAhPT0gdW5kZWZpbmVkXG4gICAgICAgID8gZS50YXJnZXQudmFsdWVcbiAgICAgICAgOiB0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCk7XG4gICAgICBpZiAodmFsdWVQYXJzZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlUGFyc2VyKHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGNvbC5vbkNyZWF0ZUJsdXIodmFsdWUsIHJvd0luZGV4KTtcbiAgICB9XG4gIH07XG5cbiAgb25FZGl0Q2VsbEJsdXIgPSAocm93SW5kZXgsIGNvbCwgdmFsdWVQYXJzZXIpID0+IChlKSA9PiB7XG4gICAgaWYgKGNvbC5vbkVkaXRCbHVyKSB7XG4gICAgICBsZXQgdmFsdWUgPSBlICYmIGUudGFyZ2V0ICYmIGUudGFyZ2V0LnZhbHVlICE9PSB1bmRlZmluZWRcbiAgICAgICAgPyBlLnRhcmdldC52YWx1ZVxuICAgICAgICA6IHRoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKTtcbiAgICAgIGlmICh2YWx1ZVBhcnNlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWVQYXJzZXIodmFsdWUpO1xuICAgICAgfVxuICAgICAgY29uc3QgZGF0YUlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICAgIGNvbC5vbkVkaXRCbHVyKHZhbHVlLCByb3dJbmRleCwgZGF0YUlkKTtcbiAgICB9XG4gIH07XG5cbiAgb25DZWxsRm9jdXMgPSAoY2VsbFR5cGUsIGlucHV0VHlwZSwgcm93SW5kZXgsIGNvbHVtbktleSkgPT4gKGUpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBjZWxsU2VsZWN0aW9uQ2hhbmdlLCBjZWxsU2VsZWN0LCBncmlkLCBpc0VkaXRpbmcsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKGlzRWRpdGluZykgcmV0dXJuO1xuXG4gICAgaWYgKGlucHV0VHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIGUudGFyZ2V0LnNlbGVjdCgpO1xuICAgIH1cbiAgICBpZiAoY2VsbFR5cGUgPT09ICdlZGl0JyAmJiBjZWxsU2VsZWN0KSB7XG4gICAgICBjZWxsU2VsZWN0aW9uQ2hhbmdlKFxuICAgICAgICBncmlkLFxuICAgICAgICBNYXAoe1xuICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgIGNvbHVtbktleSxcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICBnZXRTZWxlY3RSZWYgPSAoY29tcG9uZW50KSA9PiB7XG4gICAgaWYgKCFjb21wb25lbnQpIHJldHVybiBudWxsO1xuICAgIGlmIChjb21wb25lbnQuc2VsZWN0ICYmIGNvbXBvbmVudC5zZWxlY3QuaW5wdXRSZWYpIHtcbiAgICAgIHJldHVybiBjb21wb25lbnQuc2VsZWN0LmlucHV0UmVmO1xuICAgIH1cbiAgICBpZiAoY29tcG9uZW50LnNlbGVjdCAmJiBjb21wb25lbnQuc2VsZWN0LnNlbGVjdCkge1xuICAgICAgcmV0dXJuIGNvbXBvbmVudC5zZWxlY3Quc2VsZWN0LmlucHV0UmVmO1xuICAgIH1cbiAgICBpZiAoY29tcG9uZW50LnNlbGVjdFJlZiAmJiBjb21wb25lbnQuc2VsZWN0UmVmLnNlbGVjdC5zZWxlY3QpIHtcbiAgICAgIHJldHVybiBjb21wb25lbnQuc2VsZWN0UmVmLnNlbGVjdC5zZWxlY3QuaW5wdXRSZWY7XG4gICAgfVxuICAgIHJldHVybiBjb21wb25lbnQuc2VsZWN0UmVmLnNlbGVjdC5pbnB1dFJlZjtcbiAgfTtcblxuICBnZXREYXRhSWRCeVJvd0luZGV4ID0gcm93SW5kZXggPT4gdGhpcy5wcm9wcy5kYXRhLmdldEluKFtyb3dJbmRleCwgLi4udGhpcy5wcm9wcy5ncmlkLmlkS2V5UGF0aF0pO1xuXG4gIGdldFNlbGVjdGVkSXRlbUluZGV4ID0gKGlkKSA9PiB7XG4gICAgaWYgKCFpZCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMucHJvcHMuZGF0YS5maW5kSW5kZXgodiA9PiB2LmdldEluKHRoaXMucHJvcHMuZ3JpZC5pZEtleVBhdGgpID09PSBpZCk7XG4gICAgcmV0dXJuIGluZGV4ID09PSAtMSA/IHVuZGVmaW5lZCA6IGluZGV4O1xuICB9O1xuXG4gIGdldEVkaXRJdGVtVmFsdWUgPSAocm93SW5kZXgsIGNvbCwgb3B0aW9ucyA9IFtdKSA9PiB7XG4gICAgLy8gR2V0IHRoZSB2YWx1ZSB0byBkaXNwbGF5IGluIGVkaXQgY2VsbFxuICAgIGNvbnN0IGlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICBjb25zdCBlZGl0VmFsdWUgPSB0aGlzLnByb3BzLmVkaXREYXRhLmdldEluKFtpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0sIHVuZGVmaW5lZCk7XG4gICAgbGV0IG9yaWdpbmFsVmFsdWU7XG4gICAgaWYgKGVkaXRWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBvcmlnaW5hbFZhbHVlID0gdGhpcy5wcm9wcy5kYXRhLmdldEluKFtyb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0sICcnKTtcbiAgICB9IGVsc2UgaWYgKGVkaXRWYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBWYWx1ZSBpcyBmb3VuZCBmcm9tIGVkaXREYXRhXG4gICAgICAvLyBGb3JtYXQgYnkgdHlwZVxuICAgICAgc3dpdGNoIChjb2wuY29tcG9uZW50VHlwZSkge1xuICAgICAgICBjYXNlICdtdWx0aXNlbGVjdCc6XG4gICAgICAgIGNhc2UgJ3NlbGVjdCc6XG4gICAgICAgICAgcmV0dXJuIG9wdGlvbnMuc2VsZWN0T3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IGVkaXRWYWx1ZSk7XG4gICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICAgIHJldHVybiBvcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gZWRpdFZhbHVlKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gZWRpdFZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAob3JpZ2luYWxWYWx1ZSA9PT0gbnVsbCB8fCBvcmlnaW5hbFZhbHVlID09PSB1bmRlZmluZWQgfHwgb3JpZ2luYWxWYWx1ZSA9PT0gJycpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgLy8gUmV0dXJuIHZhbHVlIGZyb20gb3JpZ2luYWwgZGF0YSwgYmVjYXVzZSBlZGl0RGF0YSBpcyBub3QgYXZhaWxhYmxlXG4gICAgLy8gRm9ybWF0IGJ5IGNvbXBvbmVudCB0eXBlXG4gICAgc3dpdGNoIChjb2wuY29tcG9uZW50VHlwZSkge1xuICAgICAgY2FzZSAnZmxvYXQnOiB7XG4gICAgICAgIGlmIChTdHJpbmcob3JpZ2luYWxWYWx1ZSkubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHJldHVybiBTdHJpbmcob3JpZ2luYWxWYWx1ZSkucmVwbGFjZSgnLicsIHRoaXMucHJvcHMuZGVjaW1hbFNlcGFyYXRvcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9yaWdpbmFsVmFsdWU7XG4gICAgICB9XG4gICAgICBjYXNlICdtdWx0aXNlbGVjdCc6XG4gICAgICBjYXNlICdzZWxlY3QnOlxuICAgICAgICByZXR1cm4gb3B0aW9ucy5zZWxlY3RPcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gb3JpZ2luYWxWYWx1ZSk7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSBvcmlnaW5hbFZhbHVlKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBvcmlnaW5hbFZhbHVlO1xuICAgIH1cbiAgfTtcblxuICBnZXRDcmVhdGVJdGVtVmFsdWUgPSAocm93SW5kZXgsIGNvbCwgb3B0aW9ucyA9IFtdKSA9PiB7XG4gICAgY29uc3QgdmFsID0gdGhpcy5wcm9wcy5jcmVhdGVEYXRhLmdldEluKFtyb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0sICcnKTtcbiAgICBpZiAodmFsID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGlmIChjb2wuY29tcG9uZW50VHlwZSA9PT0gJ3NlbGVjdCcgfHwgY29sLmNvbXBvbmVudFR5cGUgPT09ICdtdWx0aXNlbGVjdCcpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLnNlbGVjdE9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSB2YWwpO1xuICAgIH1cbiAgICBpZiAoWydib29sZWFuJ10uaW5jbHVkZXMoY29sLmNvbXBvbmVudFR5cGUpKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IHZhbCk7XG4gICAgfVxuICAgIHJldHVybiB2YWw7XG4gIH07XG5cbiAgZ2V0RmlsdGVySXRlbVZhbHVlID0gKGNvbCwgb3B0aW9ucyA9IFtdKSA9PiB7XG4gICAgY29uc3QgdmFsID0gdGhpcy5wcm9wcy5maWx0ZXJEYXRhLmdldChVdGlscy5nZXRDb2x1bW5LZXkoY29sKSwgJycpO1xuICAgIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgaWYgKGNvbC5jb21wb25lbnRUeXBlID09PSAnc2VsZWN0Jykge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuc2VsZWN0T3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IHZhbCk7XG4gICAgfVxuICAgIGlmIChbJ2NoZWNrYm94JywgJ2Jvb2xlYW4nXS5pbmNsdWRlcyhjb2wuY29tcG9uZW50VHlwZSkpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gdmFsKTtcbiAgICB9XG4gICAgaWYgKGNvbC5jb21wb25lbnRUeXBlID09PSAnbXVsdGlzZWxlY3QnKSB7XG4gICAgICAvLyBzZXNzaW9uIHN0b3JhZ2UgY29udGVudCBpcyBjb252ZXJ0ZWQgdG8gaW1tdXRhYmxlIGFuZCBtdWx0aXNlbGVjdFxuICAgICAgLy8gZmlsdGVycyBpcyB0aGVuIGxpc3Qgb3RoZXJ3aXNlIGFycmF5XG4gICAgICByZXR1cm4gdmFsICYmIHZhbC50b0pTID8gdmFsLnRvSlMoKSA6IHZhbCB8fCBbXTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbDtcbiAgfTtcblxuICBnZXRDb21wb25lbnREaXNhYmxlZFN0YXRlID0gKHJvd0luZGV4LCBjb2wsIG1vZGUpID0+IHtcbiAgICBsZXQgY29tcG9uZW50RGlzYWJsZWQgPSAhIWNvbC5kaXNhYmxlRWRpdGluZztcbiAgICAvLyBjaGVjayBpZiBjb21wb25lbnQgaXMgZGlzYWJsZWQgYnkgb3RoZXIgY29sdW1uIGRhdGFcbiAgICBpZiAoIWNvbXBvbmVudERpc2FibGVkICYmIGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaCkge1xuICAgICAgaWYgKG1vZGUgPT09ICdjcmVhdGUnKSB7XG4gICAgICAgIGNvbXBvbmVudERpc2FibGVkID0gdGhpcy5nZXRDcmVhdGVJdGVtVmFsdWUocm93SW5kZXgsIHtcbiAgICAgICAgICB2YWx1ZUtleVBhdGg6IGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaC5tYXRjaFZhbHVlS2V5UGF0aCxcbiAgICAgICAgfSkgPT09IGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaC5tYXRjaFZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29tcG9uZW50RGlzYWJsZWQgPSB0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIHtcbiAgICAgICAgICB2YWx1ZUtleVBhdGg6IGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaC5tYXRjaFZhbHVlS2V5UGF0aCxcbiAgICAgICAgfSkgPT09IGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaC5tYXRjaFZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29tcG9uZW50RGlzYWJsZWQ7XG4gIH07XG5cbiAgZ2V0Um93Q2xhc3NOYW1lID0gKHJvd0luZGV4KSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZ3JpZCwgaXNDcmVhdGluZywgaXNFZGl0aW5nLCBjcmVhdGVEYXRhLCBzZWxlY3RlZEl0ZW1zLCBkYXRhLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHJvd0NsYXNzTmFtZXMgPSBbJ29jLWRhdGFncmlkLXJvdyddO1xuICAgIGxldCBleHRyYVJvd0NvdW50ID0gMDsgLy8gaG93IG1hbnkgcm93cyB0byBpZ25vcmUgZnJvbSB0b3AsIG5ldyArIGZpbHRlciByb3dzXG4gICAgaWYgKGlzQ3JlYXRpbmcpIGV4dHJhUm93Q291bnQgPSBjcmVhdGVEYXRhLnNpemU7XG4gICAgaWYgKGlzQ3JlYXRpbmcpIHtcbiAgICAgIGlmIChyb3dJbmRleCA8PSBleHRyYVJvd0NvdW50IC0gMSkge1xuICAgICAgICByb3dDbGFzc05hbWVzLnB1c2goJ29jLWRhdGFncmlkLXJvdy1uZXcnKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzRWRpdGluZykge1xuICAgICAgcm93Q2xhc3NOYW1lcy5wdXNoKCdvYy1kYXRhZ3JpZC1yb3ctZWRpdCcpO1xuICAgIH1cblxuICAgIC8vIGNoZWNrIGlmIHJvdyBpcyBzZWxlY3RlZFxuICAgIGlmICghaXNDcmVhdGluZyAmJiAhaXNFZGl0aW5nICYmIChzZWxlY3RlZEl0ZW1zICYmIGdyaWQuaWRLZXlQYXRoKSkge1xuICAgICAgaWYgKHNlbGVjdGVkSXRlbXMuaW5kZXhPZihkYXRhLmdldEluKFtyb3dJbmRleCAtIGV4dHJhUm93Q291bnQsIC4uLmdyaWQuaWRLZXlQYXRoXSkpICE9PSAtMSkge1xuICAgICAgICByb3dDbGFzc05hbWVzLnB1c2goJ2lzLXNlbGVjdGVkJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcHMucm93Q2xhc3NOYW1lR2V0dGVyKSB7XG4gICAgICByZXR1cm4gcm93Q2xhc3NOYW1lcy5qb2luKCcgJykgKyAnICcgKyB0aGlzLnByb3BzLnJvd0NsYXNzTmFtZUdldHRlcihyb3dJbmRleCk7XG4gICAgfVxuICAgIHJldHVybiByb3dDbGFzc05hbWVzLmpvaW4oJyAnKTtcbiAgfTtcblxuICBnZXRDZWxsTWVzc2FnZXMgPSAocm93SW5kZXgsIGNvbCwgY2VsbFR5cGUpID0+IHtcbiAgICBjb25zdCByZXR1cm5EYXRhID0ge307XG4gICAgaWYgKCF0aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoIHx8ICFjb2wudmFsdWVLZXlQYXRoKSB7XG4gICAgICByZXR1cm4gcmV0dXJuRGF0YTtcbiAgICB9XG4gICAgbGV0IGluZm9NZXNzYWdlO1xuICAgIGxldCBlcnJvck1lc3NhZ2U7XG4gICAgbGV0IHdhcm5pbmdNZXNzYWdlO1xuICAgIGlmIChjZWxsVHlwZSA9PT0gJ2NyZWF0ZScpIHtcbiAgICAgIGluZm9NZXNzYWdlID0gdGhpcy5wcm9wcy5jcmVhdGVDZWxsTWVzc2FnZXMuZ2V0SW4oWydpbmZvJywgcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgIGVycm9yTWVzc2FnZSA9IHRoaXMucHJvcHMuY3JlYXRlQ2VsbE1lc3NhZ2VzLmdldEluKFsnZXJyb3InLCByb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgd2FybmluZ01lc3NhZ2UgPSB0aGlzLnByb3BzLmNyZWF0ZUNlbGxNZXNzYWdlcy5nZXRJbihbXG4gICAgICAgICd3YXJuaW5nJyxcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIC4uLmNvbC52YWx1ZUtleVBhdGgsXG4gICAgICBdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgICAgaW5mb01lc3NhZ2UgPSB0aGlzLnByb3BzLmNlbGxNZXNzYWdlcy5nZXRJbihbJ2luZm8nLCBpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgZXJyb3JNZXNzYWdlID0gdGhpcy5wcm9wcy5jZWxsTWVzc2FnZXMuZ2V0SW4oWydlcnJvcicsIGlkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgICB3YXJuaW5nTWVzc2FnZSA9IHRoaXMucHJvcHMuY2VsbE1lc3NhZ2VzLmdldEluKFsnd2FybmluZycsIGlkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgfVxuICAgIGlmIChpbmZvTWVzc2FnZSkge1xuICAgICAgcmV0dXJuRGF0YS5pbmZvTWVzc2FnZSA9IGluZm9NZXNzYWdlO1xuICAgIH1cbiAgICBpZiAoZXJyb3JNZXNzYWdlKSB7XG4gICAgICByZXR1cm5EYXRhLmVycm9yTWVzc2FnZSA9IGVycm9yTWVzc2FnZTtcbiAgICB9XG4gICAgaWYgKHdhcm5pbmdNZXNzYWdlKSB7XG4gICAgICByZXR1cm5EYXRhLndhcm5pbmdNZXNzYWdlID0gd2FybmluZ01lc3NhZ2U7XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5EYXRhO1xuICB9O1xuXG4gIGdldFNjcm9sbFRvUm93ID0gKCkgPT4ge1xuICAgIGxldCBzY3JvbGxUb1JvdztcbiAgICBpZiAodGhpcy5wcm9wcy5pc0NyZWF0aW5nICYmICF0aGlzLmZvY3VzVG9DcmVhdGVDZWxsKSByZXR1cm4gc2Nyb2xsVG9Sb3c7XG4gICAgaWYgKHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwpIHtcbiAgICAgIGNvbnN0IHNjcm9sbE5ld1JvdyA9IHRoaXMucHJvcHMuY3JlYXRlRGF0YS5zaXplIC0gMTtcbiAgICAgIGlmIChzY3JvbGxOZXdSb3cgPj0gMCkge1xuICAgICAgICBzY3JvbGxUb1JvdyA9IHNjcm9sbE5ld1JvdztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMucHJvcHMuaXNFZGl0aW5nICYmICF0aGlzLnByb3BzLnNjcm9sbEluRWRpdE1vZGUpIHtcbiAgICAgICAgc2Nyb2xsVG9Sb3cgPSB0aGlzLnN0YXRlLmN1cnJlbnRSb3c7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzY3JvbGxUb1JvdyA9IHRoaXMucHJvcHMuc2Nyb2xsVG9Sb3c7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIH1cbiAgICAgIGlmIChzY3JvbGxUb1JvdyA9PT0gdW5kZWZpbmVkICYmIHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5zaXplID4gMCkge1xuICAgICAgICBzY3JvbGxUb1JvdyA9IHRoaXMuZ2V0U2VsZWN0ZWRJdGVtSW5kZXgodGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLmZpcnN0KCkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc2Nyb2xsVG9Sb3c7XG4gIH07XG5cbiAgc2V0Rm9jdXNUbyA9IChmb2N1c1RvKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuaXNFZGl0aW5nIHx8IHRoaXMucHJvcHMuaXNDcmVhdGluZykge1xuICAgICAgaWYgKGZvY3VzVG8gJiYgZm9jdXNUby5nZXQoJ3R5cGUnKSAmJiBmb2N1c1RvICE9PSB0aGlzLnByZXZGb2N1c1RvKSB7XG4gICAgICAgIHRoaXNbZm9jdXNUby5nZXQoJ3R5cGUnKV0gPSB0cnVlO1xuICAgICAgICB0aGlzLmZvY3VzVG9MYXN0Um93ID0gZm9jdXNUby5nZXQoJ2ZvY3VzVG9MYXN0Um93Jyk7XG4gICAgICAgIHRoaXMucHJldkZvY3VzVG8gPSBmb2N1c1RvO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBoYW5kbGVDZWxsU2VsZWN0ID0gKGNlbGxUeXBlLCByb3dJbmRleCwgY29sdW1uS2V5KSA9PiAoKSA9PiB7XG4gICAgaWYgKGNlbGxUeXBlID09PSAndmlldycgJiYgdGhpcy5wcm9wcy5jZWxsU2VsZWN0KSB7XG4gICAgICB0aGlzLnByb3BzLmNlbGxTZWxlY3Rpb25DaGFuZ2UoXG4gICAgICAgIHRoaXMucHJvcHMuZ3JpZCxcbiAgICAgICAgTWFwKHtcbiAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICBjb2x1bW5LZXksXG4gICAgICAgIH0pLFxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlQ3JlYXRlQ2VsbFJlZiA9IChyb3dJbmRleCwgY29sKSA9PiAocmVmKSA9PiB7XG4gICAgLy8gRm9jdXMgdG8gY3JlYXRlIGNlbGxcbiAgICBjb25zdCBjb2x1bW5LZXkgPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sKTtcbiAgICBjb25zdCBzZWxlY3RSZWYgPSAhcmVmIHx8IHJlZi5mb2N1cyA/IHJlZiA6IHRoaXMuZ2V0U2VsZWN0UmVmKHJlZik7XG4gICAgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5jcmVhdGVEYXRhLnNpemVcbiAgICAgICYmIHRoaXMucHJvcHMuY3JlYXRlRGF0YS5zaXplID09PSByb3dJbmRleCArIDFcbiAgICAgICYmIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGxcbiAgICAgICYmICF0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2NyZWF0ZScpXG4gICAgICAmJiBzZWxlY3RSZWZcbiAgICApIHtcbiAgICAgIHNlbGVjdFJlZi5mb2N1cygpO1xuICAgICAgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZUFycm93TmF2aWdhdGlvbikge1xuICAgICAgdGhpcy5jcmVhdGVDZWxsUmVmc1tgJHt0aGlzLnByb3BzLmdyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4fWBdID0gcmVmO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVFZGl0Q2VsbFJlZiA9IChyb3dJbmRleCwgY29sKSA9PiAocmVmKSA9PiB7XG4gICAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCk7XG4gICAgaWYgKHRoaXMuZm9jdXNUb0VkaXRDZWxsICYmICF0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2VkaXQnKSkge1xuICAgICAgY29uc3Qgc2VsZWN0ZWRSb3dJbmRleCA9IHRoaXMuZm9jdXNUb0xhc3RSb3cgJiYgdGhpcy5wcm9wcy5kYXRhLnNpemUgPiAwXG4gICAgICAgID8gdGhpcy5wcm9wcy5kYXRhLnNpemUgLSAxXG4gICAgICAgIDogdGhpcy5nZXRTZWxlY3RlZEl0ZW1JbmRleCh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuZmlyc3QoKSk7XG5cbiAgICAgIGNvbnN0IHsgc2VsZWN0ZWRDZWxsIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3Qgc2VsZWN0UmVmID0gIXJlZiB8fCByZWYuZm9jdXMgPyByZWYgOiB0aGlzLmdldFNlbGVjdFJlZihyZWYpO1xuICAgICAgaWYgKHNlbGVjdGVkQ2VsbC5zaXplID4gMCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgc2VsZWN0ZWRDZWxsLmdldCgncm93SW5kZXgnKSA9PT0gcm93SW5kZXhcbiAgICAgICAgICAmJiBzZWxlY3RlZENlbGwuZ2V0KCdjb2x1bW5LZXknKSA9PT0gY29sdW1uS2V5XG4gICAgICAgICAgJiYgc2VsZWN0UmVmXG4gICAgICAgICkge1xuICAgICAgICAgIHNlbGVjdFJlZi5mb2N1cygpO1xuICAgICAgICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5mb2N1c1RvTGFzdFJvdyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHNlbGVjdGVkUm93SW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZvY3VzVG9MYXN0Um93ID0gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKHNlbGVjdGVkUm93SW5kZXggPT09IHJvd0luZGV4ICYmIHNlbGVjdFJlZikge1xuICAgICAgICBzZWxlY3RSZWYuZm9jdXMoKTtcbiAgICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mb2N1c1RvTGFzdFJvdyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5lbmFibGVBcnJvd05hdmlnYXRpb24pIHtcbiAgICAgIHRoaXMuY2VsbFJlZnNbYCR7dGhpcy5wcm9wcy5ncmlkLmlkfV8ke2NvbHVtbktleX1fJHtyb3dJbmRleH1gXSA9IHJlZjtcbiAgICB9XG4gIH07XG5cbiAgbW92ZUNlbGxGb2N1cyA9IChuZXh0RWxlbWVudCwgcm93SW5kZXgsIGNvbHVtbkluZGV4KSA9PiB7XG4gICAgY29uc3QgZWxlbWVudFR5cGVzID0gWyd0ZXh0JywgJ2NoZWNrYm94J107XG4gICAgaWYgKG5leHRFbGVtZW50ICYmIGVsZW1lbnRUeXBlcy5pbmNsdWRlcyhuZXh0RWxlbWVudC50eXBlKSkge1xuICAgICAgaWYgKHJvd0luZGV4ICE9PSAtMSB8fCBjb2x1bW5JbmRleCAhPT0gLTEpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgY3VycmVudENvbHVtbjogY29sdW1uSW5kZXgsXG4gICAgICAgICAgY3VycmVudFJvdzogcm93SW5kZXgsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmIChuZXh0RWxlbWVudC50eXBlID09PSAnY2hlY2tib3gnKSBuZXh0RWxlbWVudC5mb2N1cygpO1xuICAgICAgICBpZiAobmV4dEVsZW1lbnQudHlwZSA9PT0gJ3RleHQnKSBuZXh0RWxlbWVudC5zZWxlY3QoKTtcbiAgICAgIH0sIDUwKTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlU2VsZWN0QWxsQ2hlY2tCb3hPbkNoYW5nZSA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLnNlbGVjdEFsbEl0ZW1zQ2hhbmdlKHRoaXMucHJvcHMuZ3JpZCk7XG4gIH07XG5cbiAgaGFuZGxlU2VsZWN0aW9uQ2hlY2tCb3hPbkNoYW5nZSA9IHJvd0luZGV4ID0+ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLml0ZW1TZWxlY3Rpb25DaGFuZ2UodGhpcy5wcm9wcy5ncmlkLCByb3dJbmRleCwgdHJ1ZSwgZmFsc2UpO1xuICB9O1xuXG4gIGdlbmVyYXRlQ29sdW1ucyA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBkYXRhLFxuICAgICAgc2VsZWN0ZWRJdGVtcyxcbiAgICAgIGRhdGVGb3JtYXQsXG4gICAgICB0aG91c2FuZFNlcGFyYXRvcixcbiAgICAgIGRlY2ltYWxTZXBhcmF0b3IsXG4gICAgICBncmlkLFxuICAgICAgaW5saW5lRWRpdCxcbiAgICAgIGZpbHRlcmluZyxcbiAgICAgIHJlZ2lvbixcbiAgICAgIGludGwsXG4gICAgICBzZWxlY3RDb21wb25lbnRPcHRpb25zLFxuICAgICAgaXNDcmVhdGluZyxcbiAgICAgIGV4dHJhQ29sdW1uLFxuICAgICAgcm93U2VsZWN0Q2hlY2tib3hDb2x1bW4sXG4gICAgICBzaG93U2VsZWN0QWxsQ2hlY2tib3gsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBjb2x1bW5zID0gW107XG4gICAgY29uc3QgdGFiSW5kZXggPSBTdHJpbmcodGhpcy5wcm9wcy50YWJJbmRleCk7XG4gICAgaWYgKGV4dHJhQ29sdW1uKSB7XG4gICAgICBjb2x1bW5zLnB1c2goe1xuICAgICAgICB3aWR0aDogZXh0cmFDb2x1bW4ud2lkdGggfHwgNDAsXG4gICAgICAgIGlzUmVzaXphYmxlOiAhIWV4dHJhQ29sdW1uLmlzUmVzaXphYmxlLFxuICAgICAgICBpc1NvcnRhYmxlOiBmYWxzZSxcbiAgICAgICAgY29sdW1uS2V5OiAnZXh0cmFDb2x1bW4nLFxuICAgICAgICBjZWxsOiByb3dJbmRleCA9PiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1leHRyYS1jb2x1bW4tY2VsbCBuby1yb3ctc2VsZWN0XCI+XG4gICAgICAgICAgICB7ZXh0cmFDb2x1bW4udmFsdWVSZW5kZXIoZGF0YS5nZXQocm93SW5kZXgpLCB0YWJJbmRleCl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICksXG4gICAgICAgIGNlbGxFZGl0OiByb3dJbmRleCA9PiAoZXh0cmFDb2x1bW4uY2VsbEVkaXQgPyBleHRyYUNvbHVtbi5jZWxsRWRpdChyb3dJbmRleCkgOiBudWxsKSxcbiAgICAgICAgY2VsbENyZWF0ZTogcm93SW5kZXggPT4gKGV4dHJhQ29sdW1uLmNlbGxDcmVhdGUgPyBleHRyYUNvbHVtbi5jZWxsQ3JlYXRlKHJvd0luZGV4KSA6IG51bGwpLFxuICAgICAgICBjZWxsRmlsdGVyOiByb3dJbmRleCA9PiAoZXh0cmFDb2x1bW4uY2VsbEZpbHRlciA/IGV4dHJhQ29sdW1uLmNlbGxGaWx0ZXIocm93SW5kZXgpIDogbnVsbCksXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocm93U2VsZWN0Q2hlY2tib3hDb2x1bW4pIHtcbiAgICAgIGNvbHVtbnMucHVzaCh7XG4gICAgICAgIHdpZHRoOiA0MCxcbiAgICAgICAgaXNSZXNpemFibGU6IGZhbHNlLFxuICAgICAgICBpc1NvcnRhYmxlOiBmYWxzZSxcbiAgICAgICAgY29sdW1uS2V5OiAnc2VsZWN0aW9uQ2hlY2tib3gnLFxuICAgICAgICBoZWFkZXI6IHNob3dTZWxlY3RBbGxDaGVja2JveCAmJiAoXG4gICAgICAgICAgPENoZWNrYm94XG4gICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRTZWxlY3RBbGxDaGVja0JveC0ke2dyaWQuaWR9YH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLXNlbGVjdC1hbGwtY2hlY2tib3gtY2VsbCBuby1yb3ctc2VsZWN0XCJcbiAgICAgICAgICAgIGNoZWNrZWQ9e2RhdGEuc2l6ZSAhPT0gMCAmJiBkYXRhLnNpemUgPT09IHNlbGVjdGVkSXRlbXMuc2l6ZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVNlbGVjdEFsbENoZWNrQm94T25DaGFuZ2V9XG4gICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSxcbiAgICAgICAgY2VsbDogKHJvd0luZGV4KSA9PiB7XG4gICAgICAgICAgY29uc3Qgcm93SXRlbSA9IGRhdGEuZ2V0KHJvd0luZGV4KTtcbiAgICAgICAgICBjb25zdCBpdGVtSWQgPSByb3dJdGVtLmdldEluKGdyaWQuaWRLZXlQYXRoKTtcbiAgICAgICAgICBjb25zdCBzZWxlY3RlZCA9IHNlbGVjdGVkSXRlbXMuaW5jbHVkZXMoaXRlbUlkKTtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPENoZWNrYm94XG4gICAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZFNlbGVjdENoZWNrQm94LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke3Jvd0luZGV4fWB9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLXNlbGVjdC1jaGVja2JveC1jZWxsIG5vLXJvdy1zZWxlY3RcIlxuICAgICAgICAgICAgICBjaGVja2VkPXtzZWxlY3RlZH1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlU2VsZWN0aW9uQ2hlY2tCb3hPbkNoYW5nZShyb3dJbmRleCl9XG4gICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgY2VsbEVkaXQ6ICgpID0+IG51bGwsXG4gICAgICAgIGNlbGxDcmVhdGU6ICgpID0+IG51bGwsXG4gICAgICAgIGNlbGxGaWx0ZXI6ICgpID0+IG51bGwsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCB2aXNpYmxlQ29sdW1ucyA9IFtdO1xuICAgIHRoaXMucHJvcHMudmlzaWJsZUNvbHVtbnMuZm9yRWFjaCgodmlzaWJsZUNvbHVtbktleSkgPT4ge1xuICAgICAgdGhpcy5wcm9wcy5jb2x1bW5zLmZvckVhY2goKG9yZ0NvbCkgPT4ge1xuICAgICAgICBpZiAoVXRpbHMuZ2V0Q29sdW1uS2V5KG9yZ0NvbCkgPT09IHZpc2libGVDb2x1bW5LZXkpIHtcbiAgICAgICAgICB2aXNpYmxlQ29sdW1ucy5wdXNoKG9yZ0NvbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHZpc2libGVDb2x1bW5zLmZvckVhY2goKGNvbCkgPT4ge1xuICAgICAgY29uc3QgdmFsdWVFbXB0eUNoZWNrZXIgPSBVdGlscy5nZXRWYWx1ZUVtcHR5Q2hlY2tlcihjb2wpO1xuICAgICAgLy8gQ2VsbCB2YWx1ZSByZW5kZXJpbmdcbiAgICAgIGNvbnN0IHZhbHVlUmVuZGVyID0gKHJvd0luZGV4LCBmb3JtYXQpID0+IHtcbiAgICAgICAgY29uc3QgdmFsID0gZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbCkpIHtcbiAgICAgICAgICByZXR1cm4gY29sLmlzUmVxdWlyZWQgPyA8TSBpZD1cIkdyaWQuVmFsdWVJc01pc3NpbmdcIiAvPiA6ICcnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3JtYXQgPyBmb3JtYXQodmFsKSA6IHZhbDtcbiAgICAgIH07XG5cbiAgICAgIGxldCBjb2x1bW4gPSBHcmlkQ29sdW1uU2VydmljZS5iYXNlQ29sdW1uKGNvbCk7XG4gICAgICAvLyBDb2xsZWN0IGNvbHVtbiBmdW5jdGlvbnMgaW50byBvbmUgT2JqZWN0XG4gICAgICBjb25zdCBjb2x1bW5GdW5jdGlvbnMgPSB7XG4gICAgICAgIGVkaXQ6IHtcbiAgICAgICAgICBnZXRJdGVtVmFsdWU6IHRoaXMuZ2V0RWRpdEl0ZW1WYWx1ZSxcbiAgICAgICAgICBvbkNlbGxWYWx1ZUNoYW5nZTogdGhpcy5vbkVkaXRDZWxsVmFsdWVDaGFuZ2UsXG4gICAgICAgICAgb25DZWxsQmx1cjogdGhpcy5vbkVkaXRDZWxsQmx1cixcbiAgICAgICAgICBvbkNlbGxGb2N1czogdGhpcy5vbkNlbGxGb2N1cyxcbiAgICAgICAgICBvbkNlbGxLZXlEb3duOiB0aGlzLm9uRWRpdENlbGxLZXlEb3duLFxuICAgICAgICAgIGhhbmRsZUNlbGxSZWY6IHRoaXMuaGFuZGxlRWRpdENlbGxSZWYsXG4gICAgICAgIH0sXG4gICAgICAgIGNyZWF0ZToge1xuICAgICAgICAgIGdldEl0ZW1WYWx1ZTogdGhpcy5nZXRDcmVhdGVJdGVtVmFsdWUsXG4gICAgICAgICAgb25DZWxsVmFsdWVDaGFuZ2U6IHRoaXMub25DcmVhdGVDZWxsVmFsdWVDaGFuZ2UsXG4gICAgICAgICAgb25DZWxsQmx1cjogdGhpcy5vbkNyZWF0ZUNlbGxCbHVyLFxuICAgICAgICAgIG9uQ2VsbEZvY3VzOiB0aGlzLm9uQ2VsbEZvY3VzLFxuICAgICAgICAgIG9uQ2VsbEtleURvd246IHRoaXMub25DcmVhdGVDZWxsS2V5RG93bixcbiAgICAgICAgICBoYW5kbGVDZWxsUmVmOiB0aGlzLmhhbmRsZUNyZWF0ZUNlbGxSZWYsXG4gICAgICAgIH0sXG4gICAgICAgIGZpbHRlcjoge1xuICAgICAgICAgIGdldEl0ZW1WYWx1ZTogdGhpcy5nZXRGaWx0ZXJJdGVtVmFsdWUsXG4gICAgICAgICAgb25DZWxsVmFsdWVDaGFuZ2U6IHRoaXMub25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UsXG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICAvLyBoYW5kbGUgY29sdW1uLmNlbGwgLyBjb2x1bW4uY2VsbEVkaXQgLyBjb2x1bW4uY2VsbENyZWF0ZSAvIGNvbHVtbi5jZWxsRmlsdGVyXG4gICAgICBjb25zdCBjZWxsUHJvcHMgPSB7XG4gICAgICAgIGdyaWQsXG4gICAgICAgIGRhdGEsXG4gICAgICAgIGRhdGVGb3JtYXQsXG4gICAgICAgIHRob3VzYW5kU2VwYXJhdG9yLFxuICAgICAgICBkZWNpbWFsU2VwYXJhdG9yLFxuICAgICAgICBzZWxlY3RDb21wb25lbnRPcHRpb25zLFxuICAgICAgfTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgY29sdW1uID0gR3JpZENvbHVtblNlcnZpY2UuY29sdW1uQ2VsbChjb2x1bW4sIGNlbGxQcm9wcywgY29sLCB2YWx1ZVJlbmRlcik7XG5cbiAgICAgIC8vIGhhbmRsZSBjb2x1bW5Db21wb25lbnRUeXBlc1xuICAgICAgY29uc3QgY29tcG9uZW50VHlwZVByb3BzID0ge1xuICAgICAgICAuLi5jZWxsUHJvcHMsXG4gICAgICAgIGlubGluZUVkaXQsXG4gICAgICAgIGZpbHRlcmluZyxcbiAgICAgICAgcmVnaW9uLFxuICAgICAgICBpbnRsLFxuICAgICAgICBzZWxlY3RDb21wb25lbnRPcHRpb25zLFxuICAgICAgfTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgY29sdW1uID0gR3JpZENvbHVtblNlcnZpY2UuY29sdW1uQ29tcG9uZW50VHlwZShcbiAgICAgICAgY29sdW1uLFxuICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgY29tcG9uZW50VHlwZVByb3BzLFxuICAgICAgICBjb2wsXG4gICAgICAgIGNvbHVtbkZ1bmN0aW9ucyxcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlLFxuICAgICAgKTtcbiAgICAgIGNvbHVtbnMucHVzaChjb2x1bW4pO1xuICAgIH0pO1xuXG4gICAgaWYgKGlzQ3JlYXRpbmcpIHtcbiAgICAgIGNvbHVtbnMucHVzaCh7XG4gICAgICAgIHdpZHRoOiAzNyxcbiAgICAgICAgaXNSZXNpemFibGU6IGZhbHNlLFxuICAgICAgICBjb2x1bW5LZXk6ICdyZW1vdmVOZXdJdGVtJyxcbiAgICAgICAgY2VsbDogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbEVkaXQ6ICgpID0+IG51bGwsXG4gICAgICAgIGNlbGxDcmVhdGU6IHJvd0luZGV4ID0+IChcbiAgICAgICAgICA8SWNvblxuICAgICAgICAgICAgaWQ9e2BvYy1kYXRhZ3JpZC1uZXctaXRlbS1yZW1vdmUtJHtncmlkLmlkfS0ke3Jvd0luZGV4fWB9XG4gICAgICAgICAgICB0eXBlPVwiaW5kaWNhdG9yXCJcbiAgICAgICAgICAgIG5hbWU9XCJkZWxldGVcIlxuICAgICAgICAgICAgd2lkdGg9ezMwfVxuICAgICAgICAgICAgaGVpZ2h0PXszMH1cbiAgICAgICAgICAgIHN0eWxlPXt7IHBhZGRpbmc6ICc3cHgnIH19XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0aGlzLnByb3BzLnJlbW92ZU5ld0l0ZW0oZ3JpZCwgcm93SW5kZXgpfVxuICAgICAgICAgIC8+XG4gICAgICAgICksXG4gICAgICAgIGNlbGxGaWx0ZXI6ICgpID0+IG51bGwsXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbHVtbnM7XG4gIH07XG5cbiAgaXNDZWxsRWRpdGVkID0gKHJvd0luZGV4LCBjb2wsIGNlbGxUeXBlKSA9PiB7XG4gICAgaWYgKGNlbGxUeXBlICE9PSAnZWRpdCcpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgaWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgIHJldHVybiAhIXRoaXMucHJvcHMuZWRpdERhdGEuZ2V0SW4oW2lkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gIH07XG5cbiAgaGFuZGxlQWZ0ZXJBZGRJdGVtID0gKCkgPT4ge1xuICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgPSB0cnVlO1xuICB9O1xuXG4gIGhhbmRsZUFmdGVyRWRpdFByZXNzID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuc2l6ZSkge1xuICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSB0cnVlO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGN1cnJlbnRSb3c6IHVuZGVmaW5lZCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVBZnRlclZhbGlkYXRpb25FcnJvciA9ICgpID0+IHtcbiAgICB0aGlzLmZvY3VzVG9FcnJvckNlbGwgPSB0cnVlO1xuICB9O1xuXG4gIGhhbmRsZVJvd0NsaWNrID0gKGUsIHJvd0luZGV4KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMucm93U2VsZWN0ICYmICF0aGlzLnByb3BzLmlzQ3JlYXRpbmcgJiYgIXRoaXMucHJvcHMuaXNFZGl0aW5nKSB7XG4gICAgICBpZiAoZS5jdHJsS2V5IHx8IGUuc2hpZnRLZXkpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0U2VsZWN0aW9uKCkucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICB9XG4gICAgICAvLyBEb24ndCB0cmlnZ2VyIHNlbGVjdGlvbiBjaGFuZ2Ugb24gd2hlbiB1c2VyIGNsaWNrcyBvbiBzcGVjaWFsIGNlbGxzIGxpa2UgY2hlY2tib3gvZXh0cmFcbiAgICAgIC8vIENoZWNrIHRoYXQgY2xpY2tlZCBub2RlJ3MgcGFyZW50IG9yIHBhcmVudCdzIHBhcmVudCBkb2Vzbid0IGhhdmUgbm8tcm93LXNlbGVjdCBjbGFzc1xuICAgICAgY29uc3QgeyBwYXJlbnROb2RlIH0gPSBlLnRhcmdldDtcbiAgICAgIGNvbnN0IHBhcmVudDFjbGFzcyA9IHBhcmVudE5vZGUuY2xhc3NOYW1lICYmIHBhcmVudE5vZGUuY2xhc3NOYW1lLmluZGV4T2YgPyBwYXJlbnROb2RlLmNsYXNzTmFtZSA6ICcnO1xuICAgICAgY29uc3QgcGFyZW50MmNsYXNzID0gICAgICAgIHBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUgJiYgcGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZS5pbmRleE9mIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgPyBwYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgIDogJyc7XG4gICAgICBjb25zdCBwYXJlbnQzY2xhc3MgPSBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWVcbiAgICAgICAgJiYgcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lLmluZGV4T2YgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICA/IHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZVxuICAgICAgICA6ICcnO1xuICAgICAgY29uc3QgcGFyZW50NGNsYXNzID0gcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWVcbiAgICAgICAgJiYgcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUuaW5kZXhPZiAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgID8gcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWVcbiAgICAgICAgOiAnJztcbiAgICAgIGlmIChcbiAgICAgICAgcGFyZW50MWNsYXNzLmluZGV4T2YoJ25vLXJvdy1zZWxlY3QnKSA9PT0gLTFcbiAgICAgICAgJiYgcGFyZW50MmNsYXNzLmluZGV4T2YoJ25vLXJvdy1zZWxlY3QnKSA9PT0gLTFcbiAgICAgICAgJiYgcGFyZW50M2NsYXNzLmluZGV4T2YoJ25vLXJvdy1zZWxlY3QnKSA9PT0gLTFcbiAgICAgICAgJiYgcGFyZW50NGNsYXNzLmluZGV4T2YoJ25vLXJvdy1zZWxlY3QnKSA9PT0gLTFcbiAgICAgICkge1xuICAgICAgICB0aGlzLnByb3BzLml0ZW1TZWxlY3Rpb25DaGFuZ2UoXG4gICAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgIHRoaXMucHJvcHMubXVsdGlTZWxlY3QgJiYgZS5jdHJsS2V5LFxuICAgICAgICAgIHRoaXMucHJvcHMubXVsdGlTZWxlY3QgJiYgZS5zaGlmdEtleSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMub25Sb3dDbGljaykge1xuICAgICAgdGhpcy5wcm9wcy5vblJvd0NsaWNrKGUsIHJvd0luZGV4LCB0aGlzLnByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGhhbmRsZUNvbnRleHRNZW51ID0gKGUsIHJvd0luZGV4KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuY29udGV4dE1lbnVJdGVtcykge1xuICAgICAgY29uc3Qge1xuICAgICAgICBpdGVtU2VsZWN0aW9uQ2hhbmdlLCBzZWxlY3RlZEl0ZW1zLCBncmlkLCBkYXRhLFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGNvbnRleHRNZW51T3BlbjogdHJ1ZSxcbiAgICAgICAgY29udGV4dE1lbnVYOiBlLmNsaWVudFgsXG4gICAgICAgIGNvbnRleHRNZW51WTogZS5jbGllbnRZLFxuICAgICAgfSk7XG4gICAgICAvLyBJZiBjbGlja2VkIGl0ZW0gaXMgbm90IHNlbGVjdGVkLCBjaGFuZ2Ugc2VsZWN0aW9uIHRvIGl0XG4gICAgICBpZiAoIXNlbGVjdGVkSXRlbXMuaW5jbHVkZXMoZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmdyaWQuaWRLZXlQYXRoXSkpKSB7XG4gICAgICAgIGl0ZW1TZWxlY3Rpb25DaGFuZ2UoZ3JpZCwgcm93SW5kZXgpO1xuICAgICAgfVxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uRG9jdW1lbnRDbGljayk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGhhbmRsZUNvbnRleHRNZW51SXRlbUNsaWNrID0gKG9uQ2xpY2ssIHNlbGVjdGVkSXRlbXMsIHNlbGVjdGVkRGF0YSkgPT4gKCkgPT4ge1xuICAgIG9uQ2xpY2soc2VsZWN0ZWRJdGVtcywgc2VsZWN0ZWREYXRhKTtcbiAgfTtcblxuICBoYW5kbGVSb3dIZWlnaHRHZXR0ZXIgPSByb3dJbmRleCA9PiB0aGlzLnByb3BzLnJvd0hlaWdodEdldHRlcihcbiAgICB0aGlzLnByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSxcbiAgICByb3dJbmRleCxcbiAgKTtcblxuICByZW5kZXJDZWxsID0gY29sID0+IChjZWxsUHJvcHMpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBpc0NyZWF0aW5nLCBpc0VkaXRpbmcsIGNyZWF0ZURhdGEsIHNlbGVjdGVkQ2VsbCwgZ3JpZCxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHJvd0luZGV4LCAuLi5wcm9wcyB9ID0gY2VsbFByb3BzO1xuICAgIGxldCBjZWxsO1xuICAgIGxldCBjZWxsVHlwZSA9ICd2aWV3JztcbiAgICBsZXQgZXh0cmFSb3dDb3VudCA9IDA7IC8vIGhvdyBtYW55IHJvd3MgdG8gaWdub3JlIGZyb20gdG9wLCBuZXcgKyBmaWx0ZXIgcm93c1xuICAgIGlmIChpc0NyZWF0aW5nKSBleHRyYVJvd0NvdW50ID0gY3JlYXRlRGF0YS5zaXplO1xuICAgIGNvbnN0IGV4aXN0aW5nUm93c0luZGV4ID0gcm93SW5kZXggLSBleHRyYVJvd0NvdW50O1xuICAgIGlmIChpc0NyZWF0aW5nKSB7XG4gICAgICBpZiAocm93SW5kZXggPD0gZXh0cmFSb3dDb3VudCAtIDEpIHtcbiAgICAgICAgaWYgKGNvbC5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY2VsbCA9IGNvbC5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNyZWF0ZUNlbGxSZWYocm93SW5kZXgsIGNvbCksXG4gICAgICAgICAgICB0aGlzLm9uQ3JlYXRlQ2VsbEtleURvd24ocm93SW5kZXgsIGNvbCksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjZWxsVHlwZSA9ICdjcmVhdGUnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNlbGwgPSBudWxsO1xuICAgICAgICAgIGNlbGxUeXBlID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2VsbCA9IGNvbC5jZWxsKFxuICAgICAgICAgIGV4aXN0aW5nUm93c0luZGV4LFxuICAgICAgICAgIHRoaXMuaGFuZGxlQ3JlYXRlQ2VsbFJlZihleGlzdGluZ1Jvd3NJbmRleCwgY29sKSxcbiAgICAgICAgICB0aGlzLm9uQ3JlYXRlQ2VsbEtleURvd24oZXhpc3RpbmdSb3dzSW5kZXgsIGNvbCksXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc0VkaXRpbmcgJiYgY29sLmNlbGxFZGl0KSB7XG4gICAgICBjZWxsID0gY29sLmNlbGxFZGl0KFxuICAgICAgICBleGlzdGluZ1Jvd3NJbmRleCxcbiAgICAgICAgdGhpcy5oYW5kbGVFZGl0Q2VsbFJlZihleGlzdGluZ1Jvd3NJbmRleCwgY29sKSxcbiAgICAgICAgdGhpcy5vbkVkaXRDZWxsS2V5RG93bihleGlzdGluZ1Jvd3NJbmRleCwgY29sKSxcbiAgICAgICk7XG4gICAgICBjZWxsVHlwZSA9ICdlZGl0JztcbiAgICB9IGVsc2Uge1xuICAgICAgY2VsbCA9IGNvbC5jZWxsKFxuICAgICAgICBleGlzdGluZ1Jvd3NJbmRleCxcbiAgICAgICAgdGhpcy5oYW5kbGVFZGl0Q2VsbFJlZihleGlzdGluZ1Jvd3NJbmRleCwgY29sKSxcbiAgICAgICAgdGhpcy5vbkVkaXRDZWxsS2V5RG93bihleGlzdGluZ1Jvd3NJbmRleCwgY29sKSxcbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnN0IGlzU3BlY2lhbCA9IHByb3BzLmNvbHVtbktleSA9PT0gJ3NlbGVjdGlvbkNoZWNrYm94JyB8fCBwcm9wcy5jb2x1bW5LZXkgPT09ICdleHRyYUNvbHVtbic7XG4gICAgaWYgKChjZWxsVHlwZSA9PT0gJ3ZpZXcnIHx8IGNlbGxUeXBlID09PSAnZWRpdCcgfHwgY2VsbFR5cGUgPT09ICdjcmVhdGUnKSAmJiAhaXNTcGVjaWFsKSB7XG4gICAgICBjb25zdCBnZXRSb3dJbmRleCA9IGNlbGxUeXBlID09PSAnY3JlYXRlJyA/IHJvd0luZGV4IDogcm93SW5kZXggLSBleHRyYVJvd0NvdW50O1xuICAgICAgY29uc3QgbWVzc2FnZURhdGEgPSB0aGlzLmdldENlbGxNZXNzYWdlcyhnZXRSb3dJbmRleCwgY29sLCBjZWxsVHlwZSk7XG4gICAgICBjb25zdCBpc0VkaXRlZCA9IHRoaXMuaXNDZWxsRWRpdGVkKGdldFJvd0luZGV4LCBjb2wsIGNlbGxUeXBlKTtcbiAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IHNlbGVjdGVkQ2VsbC5nZXQoJ3Jvd0luZGV4JykgPT09IHJvd0luZGV4XG4gICAgICAgICYmIHNlbGVjdGVkQ2VsbC5nZXQoJ2NvbHVtbktleScpID09PSBwcm9wcy5jb2x1bW5LZXlcbiAgICAgICAgPyAnb2MtZGF0YWdyaWQtY2VsbCBpcy1zZWxlY3RlZCdcbiAgICAgICAgOiAnb2MtZGF0YWdyaWQtY2VsbCc7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Q2VsbFxuICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgICAgICBzdHlsZT17Y29sLnN0eWxlfVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2VsbFNlbGVjdChjZWxsVHlwZSwgcm93SW5kZXgsIHByb3BzLmNvbHVtbktleSl9XG4gICAgICAgID5cbiAgICAgICAgICA8Q2VsbFRvb2x0aXBcbiAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZENlbGwtJHtncmlkLmlkfS0ke3Byb3BzLmNvbHVtbktleX0tJHtyb3dJbmRleH1gfVxuICAgICAgICAgICAgaXNFZGl0ZWQ9e2lzRWRpdGVkfVxuICAgICAgICAgICAgaXNFcnJvcj17ISFtZXNzYWdlRGF0YS5lcnJvck1lc3NhZ2V9XG4gICAgICAgICAgICBpc1dhcm5pbmc9eyEhbWVzc2FnZURhdGEud2FybmluZ01lc3NhZ2V9XG4gICAgICAgICAgICBpbmZvTWVzc2FnZT17bWVzc2FnZURhdGEuaW5mb01lc3NhZ2V9XG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U9e21lc3NhZ2VEYXRhLmVycm9yTWVzc2FnZX1cbiAgICAgICAgICAgIHdhcm5pbmdNZXNzYWdlPXttZXNzYWdlRGF0YS53YXJuaW5nTWVzc2FnZX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7Y2VsbH1cbiAgICAgICAgICA8L0NlbGxUb29sdGlwPlxuICAgICAgICA8L0NlbGw+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPENlbGwgey4uLnByb3BzfSBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1jZWxsXCIgc3R5bGU9e2NvbC5zdHlsZX0+XG4gICAgICAgIHtjZWxsfVxuICAgICAgPC9DZWxsPlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyQ29sdW1ucyA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBhbGxEYXRhU2l6ZSwgZ3JpZCwgaXNDcmVhdGluZywgaXNCdXN5LCB2aXNpYmxlQ29sdW1ucyxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIWFsbERhdGFTaXplICYmICFpc0J1c3kgJiYgIWlzQ3JlYXRpbmcgJiYgIWdyaWQucGFnaW5hdGlvbikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPENvbHVtblxuICAgICAgICAgIGNvbHVtbktleT1cImRhdGFFbXB0eUNvbHVtblwiXG4gICAgICAgICAgaGVhZGVyPXsoXG4gICAgICAgICAgICA8Q2VsbCBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInIH19PlxuICAgICAgICAgICAgICA8TSBpZD1cIkdyaWQuTm9JdGVtc1wiIC8+XG4gICAgICAgICAgICA8L0NlbGw+XG4pfVxuICAgICAgICAgIHdpZHRoPXsxMH1cbiAgICAgICAgICBpc1Jlc2l6YWJsZT17ZmFsc2V9XG4gICAgICAgICAgZmxleEdyb3c9ezF9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoIXZpc2libGVDb2x1bW5zLnNpemUpIHtcbiAgICAgIGlmIChpc0J1c3kpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8Q29sdW1uXG4gICAgICAgICAgICBjb2x1bW5LZXk9XCJkYXRhRW1wdHlDb2x1bW5cIlxuICAgICAgICAgICAgaGVhZGVyPXs8Q2VsbD4mbmJzcDs8L0NlbGw+fVxuICAgICAgICAgICAgd2lkdGg9ezEwfVxuICAgICAgICAgICAgaXNSZXNpemFibGU9e2ZhbHNlfVxuICAgICAgICAgICAgZmxleEdyb3c9ezF9XG4gICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxDb2x1bW5cbiAgICAgICAgICBjb2x1bW5LZXk9XCJkYXRhRW1wdHlDb2x1bW5cIlxuICAgICAgICAgIGhlYWRlcj17KFxuICAgICAgICAgICAgPENlbGwgc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICAgICAgPE0gaWQ9XCJHcmlkLk5vQ29sdW1uc1wiIC8+XG4gICAgICAgICAgICA8L0NlbGw+XG4pfVxuICAgICAgICAgIHdpZHRoPXsxMH1cbiAgICAgICAgICBpc1Jlc2l6YWJsZT17ZmFsc2V9XG4gICAgICAgICAgZmxleEdyb3c9ezF9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCBjb2x1bW5zID0gdGhpcy5nZW5lcmF0ZUNvbHVtbnMoKTtcbiAgICBpZiAoY29sdW1ucy5sZW5naHQgPT09IDApIHJldHVybiBudWxsO1xuICAgIHJldHVybiBjb2x1bW5zLm1hcChjb2wgPT4gKFxuICAgICAgPENvbHVtblxuICAgICAgICBrZXk9e2NvbC5jb2x1bW5LZXl9XG4gICAgICAgIGNvbHVtbktleT17Y29sLmNvbHVtbktleX1cbiAgICAgICAgaGVhZGVyPXsoXG4gICAgICAgICAgPEhlYWRlckNlbGxcbiAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZEhlYWRlci0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2wuY29sdW1uS2V5fWB9XG4gICAgICAgICAgICBncmlkPXt0aGlzLnByb3BzLmdyaWR9XG4gICAgICAgICAgICBjb2x1bW5zPXt0aGlzLnByb3BzLmNvbHVtbnN9XG4gICAgICAgICAgICBjb2x1bW49e2NvbH1cbiAgICAgICAgICAgIGN1cnJlbnRTb3J0Q29sdW1uPXt0aGlzLnByb3BzLnNvcnRDb2x1bW59XG4gICAgICAgICAgICBjdXJyZW50U29ydE9yZGVyPXt0aGlzLnByb3BzLnNvcnRPcmRlcn1cbiAgICAgICAgICAgIG9uU29ydENoYW5nZT17dGhpcy5wcm9wcy5zb3J0Q2hhbmdlfVxuICAgICAgICAgICAgaXNCdXN5PXt0aGlzLnByb3BzLmlzQnVzeX1cbiAgICAgICAgICAgIGZpbHRlcmluZz17dGhpcy5wcm9wcy5pc0ZpbHRlcmluZ31cbiAgICAgICAgICAgIHdpZHRoPXt0aGlzLnByb3BzLmNvbHVtbldpZHRocy5nZXQoY29sLmNvbHVtbktleSwgY29sLndpZHRoKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7Y29sLmhlYWRlcn1cbiAgICAgICAgICA8L0hlYWRlckNlbGw+XG4pfVxuICAgICAgICBjZWxsPXt0aGlzLnJlbmRlckNlbGwoY29sKX1cbiAgICAgICAgd2lkdGg9e3RoaXMucHJvcHMuY29sdW1uV2lkdGhzLmdldChjb2wuY29sdW1uS2V5LCBjb2wud2lkdGgpfVxuICAgICAgICBtaW5XaWR0aD17Y29sLm1pbldpZHRofVxuICAgICAgICBtYXhXaWR0aD17Y29sLm1heFdpZHRofVxuICAgICAgICBpc1Jlc2l6YWJsZT17Y29sLmlzUmVzaXphYmxlfVxuICAgICAgICBmbGV4R3Jvdz17Y29sLmZsZXhHcm93ID8gY29sLmZsZXhHcm93IDogMH1cbiAgICAgICAgZml4ZWQ9e2NvbC5maXhlZH1cbiAgICAgICAgZml4ZWRSaWdodD17Y29sLmZpeGVkUmlnaHR9XG4gICAgICAgIGFsbG93Q2VsbHNSZWN5Y2xpbmc9e2NvbC5hbGxvd0NlbGxzUmVjeWNsaW5nfVxuICAgICAgLz5cbiAgICApKTtcbiAgfTtcblxuICByZW5kZXJDb250ZXh0TWVudSA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBjb250ZXh0TWVudUl0ZW1zLCBkYXRhLCBncmlkLCBzZWxlY3RlZEl0ZW1zLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgY29udGV4dE1lbnVYLCBjb250ZXh0TWVudVkgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3Qgc3R5bGUgPSB7XG4gICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgICAgekluZGV4OiAxMDAwMCxcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgdG9wOiBgJHtjb250ZXh0TWVudVl9cHhgLFxuICAgICAgbGVmdDogYCR7Y29udGV4dE1lbnVYfXB4YCxcbiAgICB9O1xuICAgIGNvbnN0IHNlbGVjdGVkRGF0YSA9IGRhdGEuZmlsdGVyKGQgPT4gc2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhkLmdldEluKGdyaWQuaWRLZXlQYXRoKSkpO1xuICAgIHJldHVybiAoXG4gICAgICA8dWwgY2xhc3NOYW1lPVwiZHJvcGRvd24tbWVudSBvYy1kYXRhZ3JpZC1jb250ZXh0LW1lbnUgb3BlblwiIHN0eWxlPXtzdHlsZX0+XG4gICAgICAgIHtjb250ZXh0TWVudUl0ZW1zXG4gICAgICAgICAgJiYgY29udGV4dE1lbnVJdGVtcy5tYXBcbiAgICAgICAgICAmJiBjb250ZXh0TWVudUl0ZW1zLm1hcCgoaXRlbSwgaSkgPT4ge1xuICAgICAgICAgICAgbGV0IHsgZGlzYWJsZWQgfSA9IGl0ZW07XG4gICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0uZGlzYWJsZWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgZGlzYWJsZWQgPSBpdGVtLmRpc2FibGVkKHNlbGVjdGVkSXRlbXMsIHNlbGVjdGVkRGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8TWVudUl0ZW1cbiAgICAgICAgICAgICAgICBrZXk9e2l9IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgICAgICAgICBoZWFkZXI9e2l0ZW0uaGVhZGVyfVxuICAgICAgICAgICAgICAgIGRpdmlkZXI9e2l0ZW0uZGl2aWRlcn1cbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgdGl0bGU9e2l0ZW0udGl0bGV9XG4gICAgICAgICAgICAgICAgb25DbGljaz17XG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZCB8fCAhaXRlbS5vbkNsaWNrXG4gICAgICAgICAgICAgICAgICAgID8gbnVsbFxuICAgICAgICAgICAgICAgICAgICA6IHRoaXMuaGFuZGxlQ29udGV4dE1lbnVJdGVtQ2xpY2soaXRlbS5vbkNsaWNrLCBzZWxlY3RlZEl0ZW1zLCBzZWxlY3RlZERhdGEpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2l0ZW0udmFsdWV9XG4gICAgICAgICAgICAgIDwvTWVudUl0ZW0+XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pfVxuICAgICAgPC91bD5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBncmlkQ2xhc3NOYW1lID0gY2xhc3NOYW1lcyh7XG4gICAgICAnb2MtZGF0YWdyaWQtY29udGFpbmVyJzogdHJ1ZSxcbiAgICAgICd3aXRoLWFjdGlvbmJhcic6IHRoaXMucHJvcHMuaW5saW5lRWRpdCAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlQWN0aW9uQmFyLFxuICAgICAgJ2lzLWJ1c3knOiB0aGlzLnByb3BzLmlzQnVzeSxcbiAgICAgICdpcy1lZGl0aW5nJzogdGhpcy5wcm9wcy5pc0VkaXRpbmcsXG4gICAgICAnaXMtY3JlYXRpbmcnOiB0aGlzLnByb3BzLmlzQ3JlYXRpbmcsXG4gICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgIH0pO1xuXG4gICAgLy8gY2hlY2sgaWYgdGhlcmUgaXMgYSBuZXcgcmVxdWVzdCB0byBjaGFuZ2UgZWRpdCBtb2RlIGZvY3VzXG4gICAgdGhpcy5zZXRGb2N1c1RvKHRoaXMucHJvcHMuZm9jdXNUeXBlKTtcblxuICAgIGxldCBhY3Rpb25CYXIgPSBudWxsO1xuICAgIGxldCBhY3Rpb25CYXJSaWdodCA9IG51bGw7XG4gICAgbGV0IGFjdGlvbkJhckxlZnQgPSBudWxsO1xuICAgIGlmIChcbiAgICAgICh0aGlzLnByb3BzLmFjdGlvbkJhclxuICAgICAgICB8fCB0aGlzLnByb3BzLmlubGluZUVkaXRcbiAgICAgICAgfHwgdGhpcy5wcm9wcy5maWx0ZXJpbmdcbiAgICAgICAgfHwgdGhpcy5wcm9wcy5yZW1vdmluZylcbiAgICAgICYmICF0aGlzLnByb3BzLmRpc2FibGVBY3Rpb25CYXJcbiAgICApIHtcbiAgICAgIGFjdGlvbkJhclJpZ2h0ID0gKFxuICAgICAgICA8QWN0aW9uQmFyIHBvc2l0aW9uPVwicmlnaHRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWFjdGlvbmJhci1yaWdodFwiPnt0aGlzLnByb3BzLmFjdGlvbkJhcn08L2Rpdj5cbiAgICAgICAgICB7dGhpcy5wcm9wcy5maWx0ZXJpbmdcbiAgICAgICAgICAgICYmIHRoaXMucHJvcHMuZGlzYWJsZURyb3Bkb3duXG4gICAgICAgICAgICAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlRmlsdGVyaW5nQ29udHJvbHMgJiYgPEZpbHRlcmluZ0NvbnRyb2xzIHsuLi50aGlzLnByb3BzfSAvPn1cbiAgICAgICAgICB7dGhpcy5wcm9wcy5pbmxpbmVFZGl0ICYmIChcbiAgICAgICAgICAgIDxJbmxpbmVFZGl0Q29udHJvbHNcbiAgICAgICAgICAgICAgYWZ0ZXJBZGRJdGVtPXt0aGlzLmhhbmRsZUFmdGVyQWRkSXRlbX1cbiAgICAgICAgICAgICAgYWZ0ZXJFZGl0UHJlc3M9e3RoaXMuaGFuZGxlQWZ0ZXJFZGl0UHJlc3N9XG4gICAgICAgICAgICAgIGFmdGVyVmFsaWRhdGlvbkVycm9yPXt0aGlzLmhhbmRsZUFmdGVyVmFsaWRhdGlvbkVycm9yfVxuICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7KHRoaXMucHJvcHMuZHJvcGRvd25NZW51SXRlbXNcbiAgICAgICAgICAgIHx8IHRoaXMucHJvcHMucmVtb3ZpbmdcbiAgICAgICAgICAgIHx8IHRoaXMucHJvcHMuY29sdW1uU2V0dGluZ3NcbiAgICAgICAgICAgIHx8ICh0aGlzLnByb3BzLmZpbHRlcmluZyAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlRHJvcGRvd24pKSAmJiAoXG4gICAgICAgICAgICA8RHJvcGRvd25Db250cm9scyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgICApfVxuICAgICAgICA8L0FjdGlvbkJhcj5cbiAgICAgICk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLmFjdGlvbkJhckxlZnQgfHwgdGhpcy5wcm9wcy5ncmlkSGVhZGVyKSB7XG4gICAgICBhY3Rpb25CYXJMZWZ0ID0gKFxuICAgICAgICA8QWN0aW9uQmFyIHBvc2l0aW9uPVwibGVmdFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtZ3JpZGhlYWRlclwiPnt0aGlzLnByb3BzLmdyaWRIZWFkZXJ9PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1hY3Rpb25iYXItbGVmdFwiPnt0aGlzLnByb3BzLmFjdGlvbkJhckxlZnR9PC9kaXY+XG4gICAgICAgIDwvQWN0aW9uQmFyPlxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGFjdGlvbkJhckxlZnQgfHwgYWN0aW9uQmFyUmlnaHQpIHtcbiAgICAgIGFjdGlvbkJhciA9IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1hY3Rpb25iYXItY29udGFpbmVyXCI+XG4gICAgICAgICAge2FjdGlvbkJhckxlZnR9XG4gICAgICAgICAge2FjdGlvbkJhclJpZ2h0fVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICAgIGxldCByb3dzQ291bnQgPSB0aGlzLnByb3BzLnJvd3NDb3VudCB8fCB0aGlzLnByb3BzLnJvd3NDb3VudCA9PT0gMFxuICAgICAgPyB0aGlzLnByb3BzLnJvd3NDb3VudFxuICAgICAgOiB0aGlzLnByb3BzLmRhdGEuc2l6ZTtcbiAgICBpZiAodGhpcy5wcm9wcy5pc0NyZWF0aW5nKSByb3dzQ291bnQgKz0gdGhpcy5wcm9wcy5jcmVhdGVEYXRhLnNpemU7XG4gICAgaWYgKCF0aGlzLnByb3BzLnZpc2libGVDb2x1bW5zLnNpemUpIHJvd3NDb3VudCA9IDA7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9e2BvYy1kYXRhZ3JpZC0ke3RoaXMucHJvcHMuZ3JpZC5pZH1gfVxuICAgICAgICBjbGFzc05hbWU9e2dyaWRDbGFzc05hbWV9XG4gICAgICAgIHN0eWxlPXt0aGlzLnByb3BzLmNvbnRhaW5lclN0eWxlfVxuICAgICAgPlxuICAgICAgICB7dGhpcy5wcm9wcy5pc0J1c3kgJiYgPFNwaW5uZXIgLz59XG4gICAgICAgIHt0aGlzLnN0YXRlLmNvbnRleHRNZW51T3BlbiAmJiB0aGlzLnJlbmRlckNvbnRleHRNZW51KCl9XG4gICAgICAgIHthY3Rpb25CYXJ9XG4gICAgICAgIDxSZXNwb25zaXZlRml4ZWREYXRhVGFibGVcbiAgICAgICAgICBpZD17dGhpcy5wcm9wcy5ncmlkLmlkfVxuICAgICAgICAgIHJvd3NDb3VudD17cm93c0NvdW50fVxuICAgICAgICAgIGhlYWRlckhlaWdodD17XG4gICAgICAgICAgICB0aGlzLnByb3BzLmlzRmlsdGVyaW5nXG4gICAgICAgICAgICAgID8gdGhpcy5wcm9wcy5oZWFkZXJIZWlnaHQgKyB0aGlzLnByb3BzLmZpbHRlclJvd0hlaWdodFxuICAgICAgICAgICAgICA6IHRoaXMucHJvcHMuaGVhZGVySGVpZ2h0XG4gICAgICAgICAgfVxuICAgICAgICAgIHJvd0hlaWdodD17dGhpcy5wcm9wcy5yb3dIZWlnaHR9XG4gICAgICAgICAgb25Db2x1bW5SZXNpemVFbmRDYWxsYmFjaz17dGhpcy5vbkNvbHVtblJlc2l6ZUVuZENhbGxiYWNrfVxuICAgICAgICAgIGlzQ29sdW1uUmVzaXppbmc9e2ZhbHNlfVxuICAgICAgICAgIG9uUm93Q2xpY2s9e3RoaXMuaGFuZGxlUm93Q2xpY2t9XG4gICAgICAgICAgc2Nyb2xsVG9Db2x1bW49e3RoaXMucHJvcHMuc2Nyb2xsVG9Db2x1bW4gfHwgdGhpcy5zdGF0ZS5jdXJyZW50Q29sdW1ufVxuICAgICAgICAgIHNjcm9sbFRvcD17dGhpcy5wcm9wcy5zY3JvbGxUb3B9XG4gICAgICAgICAgc2Nyb2xsVG9Sb3c9e3RoaXMuZ2V0U2Nyb2xsVG9Sb3coKX1cbiAgICAgICAgICBvblJvd0RvdWJsZUNsaWNrPXt0aGlzLnByb3BzLm9uUm93RG91YmxlQ2xpY2t9XG4gICAgICAgICAgb25Sb3dNb3VzZURvd249e3RoaXMucHJvcHMub25Nb3VzZURvd259XG4gICAgICAgICAgb25Sb3dNb3VzZUVudGVyPXt0aGlzLnByb3BzLm9uUm93TW91c2VFbnRlcn1cbiAgICAgICAgICBvblJvd01vdXNlTGVhdmU9e3RoaXMucHJvcHMub25Sb3dNb3VzZUxlYXZlfVxuICAgICAgICAgIG9uU2Nyb2xsU3RhcnQ9e3RoaXMucHJvcHMub25TY3JvbGxTdGFydH1cbiAgICAgICAgICBvblNjcm9sbEVuZD17dGhpcy5wcm9wcy5vblNjcm9sbEVuZH1cbiAgICAgICAgICByb3dDbGFzc05hbWVHZXR0ZXI9e3RoaXMuZ2V0Um93Q2xhc3NOYW1lfVxuICAgICAgICAgIHJvd0hlaWdodEdldHRlcj17dGhpcy5wcm9wcy5yb3dIZWlnaHRHZXR0ZXIgJiYgdGhpcy5oYW5kbGVSb3dIZWlnaHRHZXR0ZXJ9XG4gICAgICAgICAgb25Db250ZW50SGVpZ2h0Q2hhbmdlPXt0aGlzLnByb3BzLm9uQ29udGVudEhlaWdodENoYW5nZX1cbiAgICAgICAgICBvblJvd0NvbnRleHRNZW51PXt0aGlzLmhhbmRsZUNvbnRleHRNZW51fVxuICAgICAgICA+XG4gICAgICAgICAge3RoaXMucmVuZGVyQ29sdW1ucygpfVxuICAgICAgICA8L1Jlc3BvbnNpdmVGaXhlZERhdGFUYWJsZT5cbiAgICAgICAge3RoaXMucHJvcHMuaXNDb2x1bW5TZXR0aW5nc01vZGFsT3BlbiAmJiAoXG4gICAgICAgICAgPENvbHVtblNldHRpbmdzTW9kYWxcbiAgICAgICAgICAgIGdyaWQ9e3RoaXMucHJvcHMuZ3JpZH1cbiAgICAgICAgICAgIGNvbHVtbnM9e3RoaXMucHJvcHMuY29sdW1uc31cbiAgICAgICAgICAgIHZpc2libGVDb2x1bW5zPXt0aGlzLnByb3BzLnZpc2libGVDb2x1bW5zfVxuICAgICAgICAgICAgY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsPXt0aGlzLnByb3BzLmNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbH1cbiAgICAgICAgICAgIHNhdmVDb2x1bW5TZXR0aW5ncz17dGhpcy5wcm9wcy5zYXZlQ29sdW1uU2V0dGluZ3N9XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERhdGFHcmlkO1xuIl19