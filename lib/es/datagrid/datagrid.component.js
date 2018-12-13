var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _class, _class2, _temp, _initialiseProps;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
    forceRefreshTimestamp: state.datagrid.get('forceRefresh', 0), // force re-render when changed
    focusType: state.datagrid.getIn([GRID.id, 'session', 'focusType'], Map())
  };
};

var mapDispatchToProps = datagridActions;

var DataGrid = (_dec = connect(mapStateToProps, mapDispatchToProps), pagination(_class = injectIntl(_class = _dec(_class = (_temp = _class2 = function (_React$PureComponent) {
  _inherits(DataGrid, _React$PureComponent);

  function DataGrid(props) {
    _classCallCheck(this, DataGrid);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _initialiseProps.call(_this);

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

  DataGrid.prototype.componentWillUnmount = function componentWillUnmount() {
    document.removeEventListener('click', this.onDocumentClick);
    this.props.invalidate(this.props.grid);
  };

  /**
   * @param rowIndex (int)
   * @param col (obj). Column object.
   * @param e. Original KeyDown event
   * @param create (bool). Is the cell create cell or edit cell?
   */


  DataGrid.prototype.render = function render() {
    var _classNames;

    var gridClassName = classNames((_classNames = {
      'oc-datagrid-container': true,
      'with-actionbar': this.props.inlineEdit && !this.props.disableActionBar,
      'is-busy': this.props.isBusy,
      'is-editing': this.props.isEditing,
      'is-creating': this.props.isCreating
    }, _classNames[this.props.className] = !!this.props.className, _classNames));

    // check if there is a new request to change edit mode focus
    this.setFocusTo(this.props.focusType);

    var actionBar = null;
    var actionBarRight = null;
    var actionBarLeft = null;
    if ((this.props.actionBar || this.props.inlineEdit || this.props.filtering || this.props.removing) && !this.props.disableActionBar) {
      actionBarRight = React.createElement(
        ActionBar,
        { position: 'right' },
        React.createElement(
          'div',
          { className: 'oc-datagrid-actionbar-right' },
          this.props.actionBar
        ),
        this.props.filtering && this.props.disableDropdown && !this.props.disableFilteringControls && React.createElement(FilteringControls, this.props),
        this.props.inlineEdit && React.createElement(InlineEditControls, _extends({
          afterAddItem: this.handleAfterAddItem,
          afterEditPress: this.handleAfterEditPress,
          afterValidationError: this.handleAfterValidationError
        }, this.props)),
        (this.props.dropdownMenuItems || this.props.removing || this.props.columnSettings || this.props.filtering && !this.props.disableDropdown) && React.createElement(DropdownControls, this.props)
      );
    }
    if (this.props.actionBarLeft || this.props.gridHeader) {
      actionBarLeft = React.createElement(
        ActionBar,
        { position: 'left' },
        React.createElement(
          'div',
          { className: 'oc-datagrid-gridheader' },
          this.props.gridHeader
        ),
        React.createElement(
          'div',
          { className: 'oc-datagrid-actionbar-left' },
          this.props.actionBarLeft
        )
      );
    }
    if (actionBarLeft || actionBarRight) {
      actionBar = React.createElement(
        'div',
        { className: 'oc-datagrid-actionbar-container' },
        actionBarLeft,
        actionBarRight
      );
    }
    var rowsCount = this.props.rowsCount || this.props.rowsCount === 0 ? this.props.rowsCount : this.props.data.size;
    if (this.props.isCreating) rowsCount += this.props.createData.size;
    if (!this.props.visibleColumns.size) rowsCount = 0;
    return React.createElement(
      'div',
      {
        id: 'oc-datagrid-' + this.props.grid.id,
        className: gridClassName,
        style: this.props.containerStyle
      },
      this.props.isBusy && React.createElement(Spinner, null),
      this.state.contextMenuOpen && this.renderContextMenu(),
      actionBar,
      React.createElement(
        ResponsiveFixedDataTable,
        {
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
        },
        this.renderColumns()
      ),
      this.props.isColumnSettingsModalOpen && React.createElement(ColumnSettingsModal, {
        grid: this.props.grid,
        columns: this.props.columns,
        visibleColumns: this.props.visibleColumns,
        closeColumnSettingsModal: this.props.closeColumnSettingsModal,
        saveColumnSettings: this.props.saveColumnSettings
      }),
      this.props.children
    );
  };

  return DataGrid;
}(React.PureComponent), _class2.defaultProps = defaultProps, _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.onDocumentClick = function () {
    if (_this2.props.contextMenuItems) {
      _this2.setState({
        contextMenuOpen: false
      });
    }
    document.removeEventListener('click', _this2.onDocumentClick);
  };

  this.onColumnResizeEndCallback = function (newColumnWidth, columnKey) {
    _this2.props.resizeColumn(_this2.props.grid, columnKey, newColumnWidth);
  };

  this.onCellKeyDown = function (rowIndex, col, e) {
    var create = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    if (_this2.props.enableArrowNavigation) {
      var cellRefs = create ? _this2.createCellRefs : _this2.cellRefs;
      var arrowKeys = [KEY_CODES.DOWN, KEY_CODES.UP, KEY_CODES.LEFT, KEY_CODES.RIGHT];
      var _props = _this2.props,
          columns = _props.columns,
          visibleColumns = _props.visibleColumns,
          grid = _props.grid,
          data = _props.data,
          onLastCellTabPress = _props.onLastCellTabPress;

      var gridColumns = Utils.visibleColumns(columns, visibleColumns);
      var getColumnKeyByIndex = function getColumnKeyByIndex(i) {
        return Utils.getColumnKey(gridColumns[i]);
      };
      var rowsSize = data.size;
      var columnKey = Utils.getColumnKey(col);
      var currentCell = cellRefs[grid.id + '_' + columnKey + '_' + rowIndex];
      var proxy = null;

      var isCursorAtStart = function isCursorAtStart() {
        if (currentCell.type !== 'text') return true;
        return currentCell.selectionStart === 0;
      };

      var isCursorAtEnd = function isCursorAtEnd() {
        if (currentCell.type !== 'text') return true;
        return currentCell.selectionEnd === currentCell.value.length;
      };

      // If current cell holds a react-floating-select component
      if (currentCell && currentCell.selectRef) {
        proxy = currentCell;
        currentCell = currentCell.selectRef.select.inputRef;
      }

      // Prevents up/down arrow from changing number field value
      if (arrowKeys.includes(e.keyCode) && currentCell.type === 'number') e.preventDefault();

      switch (e.keyCode) {
        case KEY_CODES.ENTER:
        case KEY_CODES.ESC:
          {
            if (create && e.keyCode === KEY_CODES.ENTER) {
              _this2.props.addNewItem(grid, Utils.getColumnDefaultValues(columns));
              _this2.focusToCreateCell = true;
              break;
            }
            currentCell.select();
            break;
          }
        case KEY_CODES.DOWN:
          {
            var nextElement = cellRefs[grid.id + '_' + columnKey + '_' + (rowIndex + 1)];

            // Prevents menu from opening
            if (proxy && proxy.selectRef && !proxy.selectRef.state.menuIsOpen) {
              e.preventDefault();
              if (!nextElement) break;
              nextElement = nextElement.selectRef.select.inputRef;
            }
            _this2.moveCellFocus(nextElement, rowIndex + 1, -1);
            break;
          }
        case KEY_CODES.UP:
          {
            var _nextElement = cellRefs[grid.id + '_' + columnKey + '_' + (rowIndex - 1)];

            // Prevents menu from opening
            if (proxy && proxy.selectRef && !proxy.selectRef.state.menuIsOpen) {
              e.preventDefault();
              if (!_nextElement) break;
              _nextElement = _nextElement.selectRef.select.inputRef;
            }
            _this2.moveCellFocus(_nextElement, rowIndex - 1, -1);
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

                _nextElement2 = cellRefs[grid.id + '_' + getColumnKeyByIndex(columnInd) + '_' + rowInd];

                // If we cannot focus on the next element while moving to the right
                if (!_nextElement2 && e.keyCode !== KEY_CODES.LEFT) {
                  // If we're not yet in the last focusable column
                  if (columnInd <= gridColumns.length) {
                    while (columnInd <= gridColumns.length && !_nextElement2) {
                      _nextElement2 = cellRefs[grid.id + '_' + getColumnKeyByIndex(columnInd) + '_' + rowInd];
                      columnInd += 1;

                      // If we are in the last column and we don't have an element to focus on,
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
                        _nextElement2 = cellRefs[grid.id + '_' + getColumnKeyByIndex(columnInd) + '_' + rowInd];
                      }
                    }
                  }
                  // If we cannot focus on the next element while moving to the left
                } else if (!_nextElement2 && e.keyCode === KEY_CODES.LEFT) {
                  while (columnInd > 0 && !_nextElement2) {
                    columnInd -= 1;
                    _nextElement2 = cellRefs[grid.id + '_' + getColumnKeyByIndex(columnInd) + '_' + rowInd];
                  }
                }
                disabled = _nextElement2 ? _nextElement2.disabled : false;
              }
              if (!disabled && _nextElement2) {
                if (_nextElement2.selectRef) _nextElement2 = _nextElement2.selectRef.select.inputRef;
                _this2.moveCellFocus(_nextElement2, rowInd, columnInd);
              }
            }
            break;
          }
        default:
          break;
      }
    }
  };

  this.onEditCellKeyDown = function (rowIndex, col) {
    return function (e) {
      _this2.onCellKeyDown(rowIndex, col, e);
    };
  };

  this.onCreateCellKeyDown = function (rowIndex, col) {
    return function (e) {
      _this2.onCellKeyDown(rowIndex, col, e, true);
    };
  };

  this.onFilterCellValueChange = function (col, valueParser) {
    return function (eventOrData) {
      var rawValue = void 0;
      // eventOrData can be input onChange event, react-select onChange or react-day-picker onChange
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
      _this2.props.filterCellValueChange(_this2.props.grid, _this2.props.columns, col, value);
    };
  };

  this.onCreateCellValueChange = function (rowIndex, col, valueParser) {
    return function (eventOrData) {
      var rawValue = void 0;
      // eventOrData can be input onChange event, react-select onChange or react-day-picker onChange
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
      _this2.props.createCellValueChange(_this2.props.grid, rowIndex, col.valueKeyPath, value);
      if (col.onCreateValueChange) {
        col.onCreateValueChange(value, col.valueKeyPath, rowIndex);
      }
      if (col.onValueMatchChangeValue && value === col.onValueMatchChangeValue.matchValue) {
        // Call special paired value change on other cell if value matches
        _this2.onCreateCellValueChange(rowIndex, { valueKeyPath: col.onValueMatchChangeValue.newValueKeyPath }, function (v) {
          return v;
        })(col.onValueMatchChangeValue.newValue);
      }
      if (col.validators) {
        _this2.props.createCellValueValidate(_this2.props.grid, rowIndex, col.valueKeyPath, value, col.validators);
      }
    };
  };

  this.onEditCellValueChange = function (rowIndex, col, valueParser) {
    return function (eventOrData) {
      var dataId = _this2.getDataIdByRowIndex(rowIndex);
      var rawValue = void 0;
      // eventOrData can be input onChange event, react-select onChange or react-day-picker onChange
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
      _this2.props.editCellValueChange(_this2.props.grid, dataId, col.valueKeyPath, value);
      if (col.onEditValueChange) {
        col.onEditValueChange(value, col.valueKeyPath, rowIndex, dataId);
      }
      if (col.onValueMatchChangeValue && value === col.onValueMatchChangeValue.matchValue) {
        // Call special paired value change on other cell if value matches
        _this2.onEditCellValueChange(rowIndex, { valueKeyPath: col.onValueMatchChangeValue.newValueKeyPath }, function (v) {
          return v;
        })(col.onValueMatchChangeValue.newValue);
      }
      if (col.validators) {
        _this2.props.editCellValueValidate(_this2.props.grid, dataId, col.valueKeyPath, value, col.validators);
      }
    };
  };

  this.onCreateCellBlur = function (rowIndex, col, valueParser) {
    return function (e) {
      if (col.onCreateBlur) {
        var value = e && e.target && e.target.value !== undefined ? e.target.value : _this2.getEditItemValue(rowIndex, col);
        if (valueParser !== undefined) {
          value = valueParser(value);
        }
        col.onCreateBlur(value, rowIndex);
      }
    };
  };

  this.onEditCellBlur = function (rowIndex, col, valueParser) {
    return function (e) {
      if (col.onEditBlur) {
        var value = e && e.target && e.target.value !== undefined ? e.target.value : _this2.getEditItemValue(rowIndex, col);
        if (valueParser !== undefined) {
          value = valueParser(value);
        }
        var dataId = _this2.getDataIdByRowIndex(rowIndex);
        col.onEditBlur(value, rowIndex, dataId);
      }
    };
  };

  this.onCellFocus = function (cellType, inputType, rowIndex, columnKey) {
    return function (e) {
      var _props2 = _this2.props,
          cellSelectionChange = _props2.cellSelectionChange,
          cellSelect = _props2.cellSelect,
          grid = _props2.grid,
          isEditing = _props2.isEditing;

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
  };

  this.getDataIdByRowIndex = function (rowIndex) {
    return _this2.props.data.getIn([rowIndex].concat(_this2.props.grid.idKeyPath));
  };

  this.getSelectedItemIndex = function (id) {
    if (!id) return undefined;
    var index = _this2.props.data.findIndex(function (v) {
      return v.getIn(_this2.props.grid.idKeyPath) === id;
    });
    return index === -1 ? undefined : index;
  };

  this.getEditItemValue = function (rowIndex, col) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    // Get the value to display in edit cell
    var id = _this2.getDataIdByRowIndex(rowIndex);
    var editValue = _this2.props.editData.getIn([id].concat(col.valueKeyPath), undefined);
    var originalValue = void 0;
    if (editValue === undefined) {
      originalValue = _this2.props.data.getIn([rowIndex].concat(col.valueKeyPath), '');
    } else if (editValue === null) {
      return '';
    } else {
      // Value is found from editData
      // Format by component type
      switch (col.componentType) {
        case 'select':
          return col.selectComponentOptions.find(function (obj) {
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
    }
    // Return value from original data, because editData is not available
    // Format by component type
    switch (col.componentType) {
      case 'float':
        {
          if (String(originalValue).length > 0) {
            return String(originalValue).replace('.', _this2.props.decimalSeparator);
          }
          return originalValue;
        }
      case 'select':
        return col.selectComponentOptions.find(function (obj) {
          return obj.value === originalValue;
        });
      case 'boolean':
        return options.find(function (obj) {
          return obj.value === originalValue;
        });
      default:
        return originalValue;
    }
  };

  this.getCreateItemValue = function (rowIndex, col) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    var val = _this2.props.createData.getIn([rowIndex].concat(col.valueKeyPath), '');
    if (val === null) {
      return '';
    } else if (col.componentType === 'select') {
      return col.selectComponentOptions.find(function (obj) {
        return obj.value === val;
      });
    } else if (['boolean'].includes(col.componentType)) {
      return options.find(function (obj) {
        return obj.value === val;
      });
    }
    return val;
  };

  this.getFilterItemValue = function (col) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    var val = _this2.props.filterData.get(Utils.getColumnKey(col), '');
    if (val === null) {
      return '';
    } else if (col.componentType === 'select') {
      return col.selectComponentOptions.find(function (obj) {
        return obj.value === val;
      });
    } else if (['checkbox', 'boolean'].includes(col.componentType)) {
      return options.find(function (obj) {
        return obj.value === val;
      });
    }
    return val;
  };

  this.getComponentDisabledState = function (rowIndex, col, mode) {
    var componentDisabled = !!col.disableEditing;
    // check if component is disabled by other column data
    if (!componentDisabled && col.disableEditingOnValueMatch) {
      if (mode === 'create') {
        componentDisabled = _this2.getCreateItemValue(rowIndex, { valueKeyPath: col.disableEditingOnValueMatch.matchValueKeyPath }) === col.disableEditingOnValueMatch.matchValue;
      } else {
        componentDisabled = _this2.getEditItemValue(rowIndex, { valueKeyPath: col.disableEditingOnValueMatch.matchValueKeyPath }) === col.disableEditingOnValueMatch.matchValue;
      }
    }
    return componentDisabled;
  };

  this.getRowClassName = function (rowIndex) {
    var _props3 = _this2.props,
        grid = _props3.grid,
        isCreating = _props3.isCreating,
        isEditing = _props3.isEditing,
        createData = _props3.createData,
        selectedItems = _props3.selectedItems,
        data = _props3.data;

    var rowClassNames = ['oc-datagrid-row'];
    var extraRowCount = 0; // how many rows to ignore from top, new + filter rows
    if (isCreating) extraRowCount = createData.size;
    if (isCreating) {
      if (rowIndex <= extraRowCount - 1) {
        rowClassNames.push('oc-datagrid-row-new');
      }
    } else if (isEditing) {
      rowClassNames.push('oc-datagrid-row-edit');
    }

    // check if row is selected
    if (!isCreating && !isEditing && selectedItems && grid.idKeyPath) {
      if (selectedItems.indexOf(data.getIn([rowIndex - extraRowCount].concat(grid.idKeyPath))) !== -1) {
        rowClassNames.push('is-selected');
      }
    }

    if (_this2.props.rowClassNameGetter) {
      return rowClassNames.join(' ') + ' ' + _this2.props.rowClassNameGetter(rowIndex);
    }
    return rowClassNames.join(' ');
  };

  this.getCellMessages = function (rowIndex, col, cellType) {
    var returnData = {};
    if (!_this2.props.grid.idKeyPath || !col.valueKeyPath) {
      return returnData;
    }
    var infoMessage = void 0;
    var errorMessage = void 0;
    var warningMessage = void 0;
    if (cellType === 'create') {
      infoMessage = _this2.props.createCellMessages.getIn(['info', rowIndex].concat(col.valueKeyPath));
      errorMessage = _this2.props.createCellMessages.getIn(['error', rowIndex].concat(col.valueKeyPath));
      warningMessage = _this2.props.createCellMessages.getIn(['warning', rowIndex].concat(col.valueKeyPath));
    } else {
      var id = _this2.getDataIdByRowIndex(rowIndex);
      infoMessage = _this2.props.cellMessages.getIn(['info', id].concat(col.valueKeyPath));
      errorMessage = _this2.props.cellMessages.getIn(['error', id].concat(col.valueKeyPath));
      warningMessage = _this2.props.cellMessages.getIn(['warning', id].concat(col.valueKeyPath));
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
  };

  this.getScrollToRow = function () {
    var scrollToRow = void 0;
    if (_this2.props.isCreating && !_this2.focusToCreateCell) return scrollToRow;
    if (_this2.focusToCreateCell) {
      var scrollNewRow = _this2.props.createData.size - 1;
      if (scrollNewRow >= 0) {
        scrollToRow = scrollNewRow;
      }
    } else {
      if (_this2.props.isEditing) {
        scrollToRow = _this2.state.currentRow;
      } else {
        scrollToRow = _this2.props.scrollToRow; // eslint-disable-line
      }
      if (scrollToRow === undefined && _this2.props.selectedItems.size > 0) {
        scrollToRow = _this2.getSelectedItemIndex(_this2.props.selectedItems.first());
      }
    }
    return scrollToRow;
  };

  this.setFocusTo = function (focusTo) {
    if (_this2.props.isEditing || _this2.props.isCreating) {
      if (focusTo && focusTo.get('type') && focusTo !== _this2.prevFocusTo) {
        _this2[focusTo.get('type')] = true;
        _this2.focusToLastRow = focusTo.get('focusToLastRow');
        _this2.prevFocusTo = focusTo;
      }
    }
  };

  this.handleCellSelect = function (cellType, rowIndex, columnKey) {
    return function () {
      if (cellType === 'view' && _this2.props.cellSelect) {
        _this2.props.cellSelectionChange(_this2.props.grid, Map({
          rowIndex: rowIndex,
          columnKey: columnKey
        }));
      }
    };
  };

  this.handleCreateCellRef = function (rowIndex, col) {
    return function (ref) {
      // Focus to create cell
      var columnKey = Utils.getColumnKey(col);
      if (_this2.props.createData.size && _this2.props.createData.size === rowIndex + 1 && _this2.focusToCreateCell && !_this2.getComponentDisabledState(rowIndex, col, 'create')) {
        ref.focus();
        _this2.focusToCreateCell = false;
      }

      if (_this2.props.enableArrowNavigation) {
        _this2.createCellRefs[_this2.props.grid.id + '_' + columnKey + '_' + rowIndex] = ref;
      }
    };
  };

  this.handleEditCellRef = function (rowIndex, col) {
    return function (ref) {
      var columnKey = Utils.getColumnKey(col);
      if (_this2.focusToEditCell && !_this2.getComponentDisabledState(rowIndex, col, 'edit')) {
        var selectedRowIndex = _this2.focusToLastRow && _this2.props.data.size > 0 ? _this2.props.data.size - 1 : _this2.getSelectedItemIndex(_this2.props.selectedItems.first());

        var selectedCell = _this2.props.selectedCell;

        if (selectedCell.size > 0) {
          if (selectedCell.get('rowIndex') === rowIndex && selectedCell.get('columnKey') === columnKey) {
            ref.focus();
            _this2.focusToEditCell = false;
            _this2.focusToLastRow = false;
          }
        } else if (selectedRowIndex === undefined) {
          _this2.focusToEditCell = false;
          _this2.focusToLastRow = false;
        } else if (selectedRowIndex === rowIndex) {
          ref.focus();
          _this2.focusToEditCell = false;
          _this2.focusToLastRow = false;
        }
      }
      if (_this2.props.enableArrowNavigation) {
        _this2.cellRefs[_this2.props.grid.id + '_' + columnKey + '_' + rowIndex] = ref;
      }
    };
  };

  this.moveCellFocus = function (nextElement, rowIndex, columnIndex) {
    var elementTypes = ['text', 'checkbox'];
    if (nextElement && elementTypes.includes(nextElement.type)) {
      if (rowIndex !== -1 || columnIndex !== -1) {
        _this2.setState({
          currentColumn: columnIndex,
          currentRow: rowIndex
        });
      }
      setTimeout(function () {
        if (nextElement.type === 'checkbox') nextElement.focus();
        if (nextElement.type === 'text') nextElement.select();
      }, 50);
    }
  };

  this.handleSelectionCheckBoxOnChange = function (rowIndex) {
    return function () {
      _this2.props.itemSelectionChange(_this2.props.grid, rowIndex, true, false);
    };
  };

  this.generateColumns = function () {
    var extraColumn = _this2.props.extraColumn;

    var columns = [];
    var tabIndex = String(_this2.props.tabIndex);
    if (extraColumn) {
      columns.push({
        width: extraColumn.width || 40,
        isResizable: !!extraColumn.isResizable,
        isSortable: false,
        columnKey: 'extraColumn',
        cell: function cell(rowIndex) {
          return React.createElement(
            'div',
            { className: 'oc-datagrid-extra-column-cell no-row-select' },
            extraColumn.valueRender(_this2.props.data.get(rowIndex), tabIndex)
          );
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

    if (_this2.props.rowSelectCheckboxColumn) {
      columns.push({
        width: 40,
        isResizable: false,
        isSortable: false,
        columnKey: 'selectionCheckbox',
        cell: function cell(rowIndex) {
          var rowItem = _this2.props.data.get(rowIndex);
          var itemId = rowItem.getIn(_this2.props.grid.idKeyPath);
          var selected = _this2.props.selectedItems.includes(itemId);
          return React.createElement(Checkbox, {
            id: 'ocDatagridSelectCheckBox-' + _this2.props.grid.id + '-' + rowIndex,
            className: 'oc-datagrid-select-checkbox-cell no-row-select',
            checked: selected,
            onChange: _this2.handleSelectionCheckBoxOnChange(rowIndex),
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
    _this2.props.visibleColumns.forEach(function (visibleColumnKey) {
      _this2.props.columns.forEach(function (orgCol) {
        if (Utils.getColumnKey(orgCol) === visibleColumnKey) {
          visibleColumns.push(orgCol);
        }
      });
    });
    visibleColumns.forEach(function (col) {
      var _props4 = _this2.props,
          data = _props4.data,
          dateFormat = _props4.dateFormat,
          thousandSeparator = _props4.thousandSeparator,
          decimalSeparator = _props4.decimalSeparator,
          grid = _props4.grid,
          inlineEdit = _props4.inlineEdit,
          filtering = _props4.filtering,
          region = _props4.region,
          intl = _props4.intl,
          selectComponentOptions = _props4.selectComponentOptions;


      var valueEmptyChecker = Utils.getValueEmptyChecker(col);
      // Cell value rendering
      var valueRender = function valueRender(rowIndex, format) {
        var val = data.getIn([rowIndex].concat(col.valueKeyPath));
        if (valueEmptyChecker(val)) {
          return col.isRequired ? React.createElement(M, { id: 'Grid.ValueIsMissing' }) : '';
        }
        return format ? format(val) : val;
      };

      var column = GridColumnService.baseColumn(col);
      // Collect column functions into one Object
      var columnFunctions = {
        edit: {
          getItemValue: _this2.getEditItemValue,
          onCellValueChange: _this2.onEditCellValueChange,
          onCellBlur: _this2.onEditCellBlur,
          onCellFocus: _this2.onCellFocus,
          onCellKeyDown: _this2.onEditCellKeyDown,
          handleCellRef: _this2.handleEditCellRef
        },
        create: {
          getItemValue: _this2.getCreateItemValue,
          onCellValueChange: _this2.onCreateCellValueChange,
          onCellBlur: _this2.onCreateCellBlur,
          onCellFocus: _this2.onCellFocus,
          onCellKeyDown: _this2.onCreateCellKeyDown,
          handleCellRef: _this2.handleCreateCellRef
        },
        filter: {
          getItemValue: _this2.getFilterItemValue,
          onCellValueChange: _this2.onFilterCellValueChange
        }
      };

      // handle column.cell / column.cellEdit / column.cellCreate / column.cellFilter
      var cellProps = {
        data: data,
        dateFormat: dateFormat,
        thousandSeparator: thousandSeparator,
        decimalSeparator: decimalSeparator
      }; // eslint-disable-line
      column = GridColumnService.columnCell(column, cellProps, col, valueRender);

      // handle columnComponentTypes
      var componentTypeProps = _extends({}, cellProps, {
        grid: grid,
        inlineEdit: inlineEdit,
        filtering: filtering,
        region: region,
        intl: intl,
        selectComponentOptions: selectComponentOptions
      }); // eslint-disable-line
      column = GridColumnService.columnComponentType(column, tabIndex, componentTypeProps, col, columnFunctions, _this2.getComponentDisabledState);

      columns.push(column);
    });

    if (_this2.props.isCreating) {
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
            id: 'oc-datagrid-new-item-remove-' + _this2.props.grid.id + '-' + rowIndex,
            type: 'indicator',
            name: 'delete',
            width: 30,
            height: 30,
            style: { padding: '7px' },
            onClick: function onClick() {
              return _this2.props.removeNewItem(_this2.props.grid, rowIndex);
            }
          });
        },
        cellFilter: function cellFilter() {
          return null;
        }
      });
    }
    return columns;
  };

  this.isCellEdited = function (rowIndex, col, cellType) {
    if (cellType !== 'edit') {
      return false;
    }
    var id = _this2.getDataIdByRowIndex(rowIndex);
    return !!_this2.props.editData.getIn([id].concat(col.valueKeyPath));
  };

  this.handleAfterAddItem = function () {
    _this2.focusToCreateCell = true;
  };

  this.handleAfterEditPress = function () {
    if (_this2.props.selectedItems.size) {
      _this2.focusToEditCell = true;
      _this2.setState({
        currentRow: undefined
      });
    }
  };

  this.handleAfterValidationError = function () {
    _this2.focusToErrorCell = true;
  };

  this.handleRowClick = function (e, rowIndex) {
    if (_this2.props.rowSelect && !_this2.props.isCreating && !_this2.props.isEditing) {
      if (e.ctrlKey || e.shiftKey) {
        document.getSelection().removeAllRanges();
      }
      // Don't trigger selection change on when user clicks on special cells like checkbox/extra
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
        _this2.props.itemSelectionChange(_this2.props.grid, rowIndex, _this2.props.multiSelect && e.ctrlKey, _this2.props.multiSelect && e.shiftKey);
      }
    }
    if (_this2.props.onRowClick) {
      _this2.props.onRowClick(e, rowIndex, _this2.props.data.get(rowIndex));
    }
    return true;
  };

  this.handleContextMenu = function (e, rowIndex) {
    if (_this2.props.contextMenuItems) {
      var _props5 = _this2.props,
          itemSelectionChange = _props5.itemSelectionChange,
          selectedItems = _props5.selectedItems,
          grid = _props5.grid,
          data = _props5.data;

      e.preventDefault();
      e.stopPropagation();
      _this2.setState({
        contextMenuOpen: true,
        contextMenuX: e.clientX,
        contextMenuY: e.clientY
      });
      // If clicked item is not selected, change selection to it
      if (!selectedItems.includes(data.getIn([rowIndex].concat(grid.idKeyPath)))) {
        itemSelectionChange(grid, rowIndex);
      }
      document.addEventListener('click', _this2.onDocumentClick);
      return false;
    }
    return true;
  };

  this.handleContextMenuItemClick = function (onClick, selectedItems, selectedData) {
    return function () {
      onClick(selectedItems, selectedData);
    };
  };

  this.handleRowHeightGetter = function (rowIndex) {
    return _this2.props.rowHeightGetter(_this2.props.data.get(rowIndex), rowIndex);
  };

  this.renderCell = function (col) {
    return function (cellProps) {
      var _props6 = _this2.props,
          isCreating = _props6.isCreating,
          isEditing = _props6.isEditing,
          createData = _props6.createData,
          selectedCell = _props6.selectedCell,
          grid = _props6.grid;

      var rowIndex = cellProps.rowIndex,
          props = _objectWithoutProperties(cellProps, ['rowIndex']);

      var cell = void 0;
      var cellType = 'view';
      var extraRowCount = 0; // how many rows to ignore from top, new + filter rows
      if (isCreating) extraRowCount = createData.size;
      if (isCreating) {
        if (rowIndex <= extraRowCount - 1) {
          if (col.cellCreate) {
            cell = col.cellCreate(rowIndex);
            cellType = 'create';
          } else {
            cell = null;
            cellType = null;
          }
        } else {
          cell = col.cell(rowIndex - extraRowCount);
        }
      } else if (isEditing && col.cellEdit) {
        cell = col.cellEdit(rowIndex - extraRowCount);
        cellType = 'edit';
      } else {
        cell = col.cell(rowIndex - extraRowCount);
      }
      var isSpecial = props.columnKey === 'selectionCheckbox' || props.columnKey === 'extraColumn';
      if ((cellType === 'view' || cellType === 'edit' || cellType === 'create') && !isSpecial) {
        var getRowIndex = cellType === 'create' ? rowIndex : rowIndex - extraRowCount;
        var messageData = _this2.getCellMessages(getRowIndex, col, cellType);
        var isEdited = _this2.isCellEdited(getRowIndex, col, cellType);
        var className = selectedCell.get('rowIndex') === rowIndex && selectedCell.get('columnKey') === props.columnKey ? 'oc-datagrid-cell is-selected' : 'oc-datagrid-cell';
        return React.createElement(
          Cell,
          _extends({}, props, {
            className: className,
            style: col.style,
            onClick: _this2.handleCellSelect(cellType, rowIndex, props.columnKey)
          }),
          React.createElement(
            CellTooltip,
            {
              id: 'ocDatagridCell-' + grid.id + '-' + props.columnKey + '-' + rowIndex,
              isEdited: isEdited,
              isError: !!messageData.errorMessage,
              isWarning: !!messageData.warningMessage,
              infoMessage: messageData.infoMessage,
              errorMessage: messageData.errorMessage,
              warningMessage: messageData.warningMessage
            },
            cell
          )
        );
      }
      return React.createElement(
        Cell,
        _extends({}, props, { className: 'oc-datagrid-cell', style: col.style }),
        cell
      );
    };
  };

  this.renderColumns = function () {
    if (!_this2.props.allDataSize && !_this2.props.isBusy && !_this2.props.isCreating) {
      return React.createElement(Column, {
        columnKey: 'dataEmptyColumn',
        header: React.createElement(
          Cell,
          { style: { textAlign: 'center' } },
          React.createElement(M, { id: 'Grid.NoItems' })
        ),
        width: 10,
        isResizable: false,
        flexGrow: 1
      });
    }
    if (!_this2.props.visibleColumns.size) {
      if (_this2.props.isBusy) {
        return React.createElement(Column, {
          columnKey: 'dataEmptyColumn',
          header: React.createElement(
            Cell,
            null,
            '\xA0'
          ),
          width: 10,
          isResizable: false,
          flexGrow: 1
        });
      }
      return React.createElement(Column, {
        columnKey: 'dataEmptyColumn',
        header: React.createElement(
          Cell,
          { style: { textAlign: 'center' } },
          React.createElement(M, { id: 'Grid.NoColumns' })
        ),
        width: 10,
        isResizable: false,
        flexGrow: 1
      });
    }
    var columns = _this2.generateColumns();
    if (columns.lenght === 0) return null;
    return columns.map(function (col) {
      return React.createElement(Column, {
        key: col.columnKey,
        columnKey: col.columnKey,
        header: React.createElement(
          HeaderCell,
          {
            id: 'ocDatagridHeader-' + _this2.props.grid.id + '-' + col.columnKey,
            grid: _this2.props.grid,
            columns: _this2.props.columns,
            column: col,
            currentSortColumn: _this2.props.sortColumn,
            currentSortOrder: _this2.props.sortOrder,
            onSortChange: _this2.props.sortChange,
            isBusy: _this2.props.isBusy,
            filtering: _this2.props.isFiltering
          },
          col.header
        ),
        cell: _this2.renderCell(col),
        width: _this2.props.columnWidths.get(col.columnKey, col.width),
        minWidth: col.minWidth,
        maxWidth: col.maxWidth,
        isResizable: col.isResizable,
        flexGrow: col.flexGrow ? col.flexGrow : 0,
        fixed: col.fixed,
        allowCellsRecycling: col.allowCellsRecycling
      });
    });
  };

  this.renderContextMenu = function () {
    var _props7 = _this2.props,
        contextMenuItems = _props7.contextMenuItems,
        data = _props7.data,
        grid = _props7.grid,
        selectedItems = _props7.selectedItems;
    var _state = _this2.state,
        contextMenuX = _state.contextMenuX,
        contextMenuY = _state.contextMenuY;

    var style = {
      display: 'block',
      zIndex: 10000,
      position: 'absolute',
      top: contextMenuY + 'px',
      left: contextMenuX + 'px'
    };
    var selectedData = data.filter(function (d) {
      return selectedItems.includes(d.getIn(grid.idKeyPath));
    });
    return React.createElement(
      'ul',
      { className: 'dropdown-menu oc-datagrid-context-menu open', style: style },
      contextMenuItems && contextMenuItems.map && contextMenuItems.map(function (item, i) {
        var disabled = item.disabled;

        if (typeof item.disabled === 'function') {
          disabled = item.disabled(selectedItems, selectedData);
        }
        return React.createElement(
          MenuItem,
          {
            key: i // eslint-disable-line
            , header: item.header,
            divider: item.divider,
            disabled: disabled,
            title: item.title,
            onClick: disabled || !item.onClick ? null : _this2.handleContextMenuItemClick(item.onClick, selectedItems, selectedData)
          },
          item.value
        );
      })
    );
  };
}, _temp)) || _class) || _class) || _class);


export default DataGrid;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiTWFwIiwiTGlzdCIsImNvbm5lY3QiLCJpbmplY3RJbnRsIiwiRm9ybWF0dGVkTWVzc2FnZSIsIk0iLCJDb2x1bW4iLCJDZWxsIiwiTWVudUl0ZW0iLCJjbGFzc05hbWVzIiwiSWNvbiIsIlNwaW5uZXIiLCJDaGVja2JveCIsIlJlc3BvbnNpdmVGaXhlZERhdGFUYWJsZSIsIkhlYWRlckNlbGwiLCJBY3Rpb25CYXIiLCJJbmxpbmVFZGl0Q29udHJvbHMiLCJGaWx0ZXJpbmdDb250cm9scyIsIkRyb3Bkb3duQ29udHJvbHMiLCJkYXRhZ3JpZEFjdGlvbnMiLCJDZWxsVG9vbHRpcCIsIkNvbHVtblNldHRpbmdzTW9kYWwiLCJwcm9wVHlwZXMiLCJkZWZhdWx0UHJvcHMiLCJLRVlfQ09ERVMiLCJwYWdpbmF0aW9uIiwiVXRpbHMiLCJHcmlkQ29sdW1uU2VydmljZSIsIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwib3duUHJvcHMiLCJHUklEIiwiZ3JpZCIsImlzQnVzeSIsImRhdGFncmlkIiwiZ2V0SW4iLCJpZCIsImlzRWRpdGluZyIsImlzQ3JlYXRpbmciLCJpc0ZpbHRlcmluZyIsImlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW4iLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwidmlzaWJsZUNvbHVtbnMiLCJjb2x1bW5XaWR0aHMiLCJzZWxlY3RlZENlbGwiLCJzZWxlY3RlZEl0ZW1zIiwiZGF0YSIsImVkaXREYXRhIiwiY3JlYXRlRGF0YSIsImZpbHRlckRhdGEiLCJjZWxsTWVzc2FnZXMiLCJjcmVhdGVDZWxsTWVzc2FnZXMiLCJhbGxEYXRhU2l6ZSIsInNpemUiLCJsYW5ndWFnZSIsImdldExhbmd1YWdlIiwidXNlciIsInJlZ2lvbiIsImdldFJlZ2lvbiIsImRhdGVGb3JtYXQiLCJnZXREYXRlRm9ybWF0IiwidGhvdXNhbmRTZXBhcmF0b3IiLCJnZXRUaG91c2FuZFNlcGFyYXRvciIsImRlY2ltYWxTZXBhcmF0b3IiLCJnZXREZWNpbWFsU2VwYXJhdG9yIiwiZm9yY2VSZWZyZXNoVGltZXN0YW1wIiwiZ2V0IiwiZm9jdXNUeXBlIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwiRGF0YUdyaWQiLCJwcm9wcyIsImN1cnJlbnRSb3ciLCJjdXJyZW50Q29sdW1uIiwiY29udGV4dE1lbnVPcGVuIiwiY29udGV4dE1lbnVYIiwiY29udGV4dE1lbnVZIiwiY2VsbFJlZnMiLCJjcmVhdGVDZWxsUmVmcyIsImZvY3VzVG9DcmVhdGVDZWxsIiwiZm9jdXNUb0VkaXRDZWxsIiwiZm9jdXNUb0Vycm9yQ2VsbCIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwiZG9jdW1lbnQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwib25Eb2N1bWVudENsaWNrIiwiaW52YWxpZGF0ZSIsInJlbmRlciIsImdyaWRDbGFzc05hbWUiLCJpbmxpbmVFZGl0IiwiZGlzYWJsZUFjdGlvbkJhciIsImNsYXNzTmFtZSIsInNldEZvY3VzVG8iLCJhY3Rpb25CYXIiLCJhY3Rpb25CYXJSaWdodCIsImFjdGlvbkJhckxlZnQiLCJmaWx0ZXJpbmciLCJyZW1vdmluZyIsImRpc2FibGVEcm9wZG93biIsImRpc2FibGVGaWx0ZXJpbmdDb250cm9scyIsImhhbmRsZUFmdGVyQWRkSXRlbSIsImhhbmRsZUFmdGVyRWRpdFByZXNzIiwiaGFuZGxlQWZ0ZXJWYWxpZGF0aW9uRXJyb3IiLCJkcm9wZG93bk1lbnVJdGVtcyIsImNvbHVtblNldHRpbmdzIiwiZ3JpZEhlYWRlciIsInJvd3NDb3VudCIsImNvbnRhaW5lclN0eWxlIiwicmVuZGVyQ29udGV4dE1lbnUiLCJoZWFkZXJIZWlnaHQiLCJmaWx0ZXJSb3dIZWlnaHQiLCJyb3dIZWlnaHQiLCJvbkNvbHVtblJlc2l6ZUVuZENhbGxiYWNrIiwiaGFuZGxlUm93Q2xpY2siLCJzY3JvbGxUb0NvbHVtbiIsInNjcm9sbFRvcCIsImdldFNjcm9sbFRvUm93Iiwib25Sb3dEb3VibGVDbGljayIsIm9uTW91c2VEb3duIiwib25Sb3dNb3VzZUVudGVyIiwib25Sb3dNb3VzZUxlYXZlIiwib25TY3JvbGxTdGFydCIsIm9uU2Nyb2xsRW5kIiwiZ2V0Um93Q2xhc3NOYW1lIiwicm93SGVpZ2h0R2V0dGVyIiwiaGFuZGxlUm93SGVpZ2h0R2V0dGVyIiwib25Db250ZW50SGVpZ2h0Q2hhbmdlIiwiaGFuZGxlQ29udGV4dE1lbnUiLCJyZW5kZXJDb2x1bW5zIiwiY29sdW1ucyIsImNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbCIsInNhdmVDb2x1bW5TZXR0aW5ncyIsImNoaWxkcmVuIiwiUHVyZUNvbXBvbmVudCIsImNvbnRleHRNZW51SXRlbXMiLCJzZXRTdGF0ZSIsIm5ld0NvbHVtbldpZHRoIiwiY29sdW1uS2V5IiwicmVzaXplQ29sdW1uIiwib25DZWxsS2V5RG93biIsInJvd0luZGV4IiwiY29sIiwiZSIsImNyZWF0ZSIsImVuYWJsZUFycm93TmF2aWdhdGlvbiIsImFycm93S2V5cyIsIkRPV04iLCJVUCIsIkxFRlQiLCJSSUdIVCIsIm9uTGFzdENlbGxUYWJQcmVzcyIsImdyaWRDb2x1bW5zIiwiZ2V0Q29sdW1uS2V5QnlJbmRleCIsImdldENvbHVtbktleSIsImkiLCJyb3dzU2l6ZSIsImN1cnJlbnRDZWxsIiwicHJveHkiLCJpc0N1cnNvckF0U3RhcnQiLCJ0eXBlIiwic2VsZWN0aW9uU3RhcnQiLCJpc0N1cnNvckF0RW5kIiwic2VsZWN0aW9uRW5kIiwidmFsdWUiLCJsZW5ndGgiLCJzZWxlY3RSZWYiLCJzZWxlY3QiLCJpbnB1dFJlZiIsImluY2x1ZGVzIiwia2V5Q29kZSIsInByZXZlbnREZWZhdWx0IiwiRU5URVIiLCJFU0MiLCJhZGROZXdJdGVtIiwiZ2V0Q29sdW1uRGVmYXVsdFZhbHVlcyIsIm5leHRFbGVtZW50IiwibWVudUlzT3BlbiIsIm1vdmVDZWxsRm9jdXMiLCJUQUIiLCJjb2x1bW5JbmQiLCJmaW5kSW5kZXgiLCJjIiwidmFsdWVLZXlQYXRoIiwiam9pbiIsImRpc2FibGVkIiwicm93SW5kIiwic2hpZnRLZXkiLCJvbkVkaXRDZWxsS2V5RG93biIsIm9uQ3JlYXRlQ2VsbEtleURvd24iLCJvbkZpbHRlckNlbGxWYWx1ZUNoYW5nZSIsInZhbHVlUGFyc2VyIiwiZXZlbnRPckRhdGEiLCJyYXdWYWx1ZSIsInRhcmdldCIsInVuZGVmaW5lZCIsImZpbHRlckNlbGxWYWx1ZUNoYW5nZSIsIm9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlIiwiY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlIiwib25DcmVhdGVWYWx1ZUNoYW5nZSIsIm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlIiwibWF0Y2hWYWx1ZSIsIm5ld1ZhbHVlS2V5UGF0aCIsInYiLCJuZXdWYWx1ZSIsInZhbGlkYXRvcnMiLCJjcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZSIsIm9uRWRpdENlbGxWYWx1ZUNoYW5nZSIsImRhdGFJZCIsImdldERhdGFJZEJ5Um93SW5kZXgiLCJlZGl0Q2VsbFZhbHVlQ2hhbmdlIiwib25FZGl0VmFsdWVDaGFuZ2UiLCJlZGl0Q2VsbFZhbHVlVmFsaWRhdGUiLCJvbkNyZWF0ZUNlbGxCbHVyIiwib25DcmVhdGVCbHVyIiwiZ2V0RWRpdEl0ZW1WYWx1ZSIsIm9uRWRpdENlbGxCbHVyIiwib25FZGl0Qmx1ciIsIm9uQ2VsbEZvY3VzIiwiY2VsbFR5cGUiLCJpbnB1dFR5cGUiLCJjZWxsU2VsZWN0aW9uQ2hhbmdlIiwiY2VsbFNlbGVjdCIsImlkS2V5UGF0aCIsImdldFNlbGVjdGVkSXRlbUluZGV4IiwiaW5kZXgiLCJvcHRpb25zIiwiZWRpdFZhbHVlIiwib3JpZ2luYWxWYWx1ZSIsImNvbXBvbmVudFR5cGUiLCJzZWxlY3RDb21wb25lbnRPcHRpb25zIiwiZmluZCIsIm9iaiIsIlN0cmluZyIsInJlcGxhY2UiLCJnZXRDcmVhdGVJdGVtVmFsdWUiLCJ2YWwiLCJnZXRGaWx0ZXJJdGVtVmFsdWUiLCJnZXRDb21wb25lbnREaXNhYmxlZFN0YXRlIiwibW9kZSIsImNvbXBvbmVudERpc2FibGVkIiwiZGlzYWJsZUVkaXRpbmciLCJkaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaCIsIm1hdGNoVmFsdWVLZXlQYXRoIiwicm93Q2xhc3NOYW1lcyIsImV4dHJhUm93Q291bnQiLCJwdXNoIiwiaW5kZXhPZiIsInJvd0NsYXNzTmFtZUdldHRlciIsImdldENlbGxNZXNzYWdlcyIsInJldHVybkRhdGEiLCJpbmZvTWVzc2FnZSIsImVycm9yTWVzc2FnZSIsIndhcm5pbmdNZXNzYWdlIiwic2Nyb2xsVG9Sb3ciLCJzY3JvbGxOZXdSb3ciLCJmaXJzdCIsImZvY3VzVG8iLCJwcmV2Rm9jdXNUbyIsImZvY3VzVG9MYXN0Um93IiwiaGFuZGxlQ2VsbFNlbGVjdCIsImhhbmRsZUNyZWF0ZUNlbGxSZWYiLCJyZWYiLCJmb2N1cyIsImhhbmRsZUVkaXRDZWxsUmVmIiwic2VsZWN0ZWRSb3dJbmRleCIsImNvbHVtbkluZGV4IiwiZWxlbWVudFR5cGVzIiwic2V0VGltZW91dCIsImhhbmRsZVNlbGVjdGlvbkNoZWNrQm94T25DaGFuZ2UiLCJpdGVtU2VsZWN0aW9uQ2hhbmdlIiwiZ2VuZXJhdGVDb2x1bW5zIiwiZXh0cmFDb2x1bW4iLCJ0YWJJbmRleCIsIndpZHRoIiwiaXNSZXNpemFibGUiLCJpc1NvcnRhYmxlIiwiY2VsbCIsInZhbHVlUmVuZGVyIiwiY2VsbEVkaXQiLCJjZWxsQ3JlYXRlIiwiY2VsbEZpbHRlciIsInJvd1NlbGVjdENoZWNrYm94Q29sdW1uIiwicm93SXRlbSIsIml0ZW1JZCIsInNlbGVjdGVkIiwiZm9yRWFjaCIsInZpc2libGVDb2x1bW5LZXkiLCJvcmdDb2wiLCJpbnRsIiwidmFsdWVFbXB0eUNoZWNrZXIiLCJnZXRWYWx1ZUVtcHR5Q2hlY2tlciIsImZvcm1hdCIsImlzUmVxdWlyZWQiLCJjb2x1bW4iLCJiYXNlQ29sdW1uIiwiY29sdW1uRnVuY3Rpb25zIiwiZWRpdCIsImdldEl0ZW1WYWx1ZSIsIm9uQ2VsbFZhbHVlQ2hhbmdlIiwib25DZWxsQmx1ciIsImhhbmRsZUNlbGxSZWYiLCJmaWx0ZXIiLCJjZWxsUHJvcHMiLCJjb2x1bW5DZWxsIiwiY29tcG9uZW50VHlwZVByb3BzIiwiY29sdW1uQ29tcG9uZW50VHlwZSIsInBhZGRpbmciLCJyZW1vdmVOZXdJdGVtIiwiaXNDZWxsRWRpdGVkIiwicm93U2VsZWN0IiwiY3RybEtleSIsImdldFNlbGVjdGlvbiIsInJlbW92ZUFsbFJhbmdlcyIsInBhcmVudE5vZGUiLCJwYXJlbnQxY2xhc3MiLCJwYXJlbnQyY2xhc3MiLCJwYXJlbnQzY2xhc3MiLCJwYXJlbnQ0Y2xhc3MiLCJtdWx0aVNlbGVjdCIsIm9uUm93Q2xpY2siLCJzdG9wUHJvcGFnYXRpb24iLCJjbGllbnRYIiwiY2xpZW50WSIsImFkZEV2ZW50TGlzdGVuZXIiLCJoYW5kbGVDb250ZXh0TWVudUl0ZW1DbGljayIsIm9uQ2xpY2siLCJzZWxlY3RlZERhdGEiLCJyZW5kZXJDZWxsIiwiaXNTcGVjaWFsIiwiZ2V0Um93SW5kZXgiLCJtZXNzYWdlRGF0YSIsImlzRWRpdGVkIiwic3R5bGUiLCJ0ZXh0QWxpZ24iLCJsZW5naHQiLCJtYXAiLCJzb3J0Q2hhbmdlIiwiaGVhZGVyIiwibWluV2lkdGgiLCJtYXhXaWR0aCIsImZsZXhHcm93IiwiZml4ZWQiLCJhbGxvd0NlbGxzUmVjeWNsaW5nIiwiZGlzcGxheSIsInpJbmRleCIsInBvc2l0aW9uIiwidG9wIiwibGVmdCIsImQiLCJpdGVtIiwiZGl2aWRlciIsInRpdGxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTtBQUNBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxTQUFTQyxHQUFULEVBQWNDLElBQWQsUUFBMEIsV0FBMUI7QUFDQSxTQUFTQyxPQUFULFFBQXdCLGFBQXhCO0FBQ0EsU0FDRUMsVUFERixFQUVFQyxvQkFBb0JDLENBRnRCLFFBR08sWUFIUDtBQUlBLFNBQVNDLE1BQVQsRUFBaUJDLElBQWpCLFFBQTZCLG9CQUE3QjtBQUNBLFNBQVNDLFFBQVQsUUFBeUIsaUJBQXpCO0FBQ0EsT0FBT0MsVUFBUCxNQUF1QixZQUF2QjtBQUNBLFNBQVNDLElBQVQsUUFBcUIseUJBQXJCO0FBQ0EsT0FBT0MsT0FBUCxNQUFvQiwyQkFBcEI7QUFDQSxPQUFPQyxRQUFQLE1BQXFCLDRCQUFyQjtBQUNBLE9BQU8sOENBQVA7O0FBRUEsT0FBT0Msd0JBQVAsTUFBcUMseUNBQXJDO0FBQ0EsT0FBT0MsVUFBUCxNQUF1Qix5QkFBdkI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLHdCQUF0QjtBQUNBLE9BQU9DLGtCQUFQLE1BQStCLGtDQUEvQjtBQUNBLE9BQU9DLGlCQUFQLE1BQThCLGdDQUE5QjtBQUNBLE9BQU9DLGdCQUFQLE1BQTZCLCtCQUE3QjtBQUNBLE9BQU8sS0FBS0MsZUFBWixNQUFpQyxvQkFBakM7QUFDQSxPQUFPQyxXQUFQLE1BQXdCLDBCQUF4QjtBQUNBLE9BQU9DLG1CQUFQLE1BQWdDLDZDQUFoQztBQUNBLFNBQVNDLFNBQVQsRUFBb0JDLFlBQXBCLFFBQXdDLGtCQUF4QztBQUNBLFNBQVNDLFNBQVQsUUFBMEIsc0JBQTFCO0FBQ0EsT0FBT0MsVUFBUCxNQUF1Qix3QkFBdkI7QUFDQSxPQUFPQyxLQUFQLE1BQWtCLGtCQUFsQjtBQUNBLE9BQU9DLGlCQUFQLE1BQThCLGlDQUE5QjtBQUNBLE9BQU8sMkJBQVA7O0FBRUEsSUFBTUMsa0JBQWtCLFNBQWxCQSxlQUFrQixDQUFDQyxLQUFELEVBQVFDLFFBQVIsRUFBcUI7QUFDM0MsTUFBTUMsT0FBT0QsU0FBU0UsSUFBdEI7QUFDQSxTQUFPO0FBQ0xDLFlBQVFKLE1BQU1LLFFBQU4sQ0FBZUMsS0FBZixDQUFxQixDQUFDSixLQUFLSyxFQUFOLEVBQVUsU0FBVixFQUFxQixRQUFyQixDQUFyQixFQUFxRCxJQUFyRCxDQURIO0FBRUxDLGVBQVdSLE1BQU1LLFFBQU4sQ0FBZUMsS0FBZixDQUFxQixDQUFDSixLQUFLSyxFQUFOLEVBQVUsU0FBVixFQUFxQixXQUFyQixDQUFyQixFQUF3RCxLQUF4RCxDQUZOO0FBR0xFLGdCQUFZVCxNQUFNSyxRQUFOLENBQWVDLEtBQWYsQ0FBcUIsQ0FBQ0osS0FBS0ssRUFBTixFQUFVLFNBQVYsRUFBcUIsWUFBckIsQ0FBckIsRUFBeUQsS0FBekQsQ0FIUDtBQUlMRyxpQkFDRVYsTUFBTUssUUFBTixDQUFlQyxLQUFmLENBQXFCLENBQUNKLEtBQUtLLEVBQU4sRUFBVSxRQUFWLEVBQW9CLGVBQXBCLEVBQXFDLGFBQXJDLENBQXJCLEVBQTBFLEtBQTFFLENBTEc7QUFNTEksK0JBQ0VYLE1BQU1LLFFBQU4sQ0FBZUMsS0FBZixDQUFxQixDQUFDSixLQUFLSyxFQUFOLEVBQVUsU0FBVixFQUFxQixxQkFBckIsRUFBNEMsTUFBNUMsQ0FBckIsRUFBMEUsS0FBMUUsQ0FQRztBQVFMSyxnQkFBWVosTUFBTUssUUFBTixDQUFlQyxLQUFmLENBQXFCLENBQUNKLEtBQUtLLEVBQU4sRUFBVSxRQUFWLEVBQW9CLGFBQXBCLEVBQW1DLFlBQW5DLENBQXJCLEVBQXVFLElBQXZFLENBUlA7QUFTTE0sZUFBV2IsTUFBTUssUUFBTixDQUFlQyxLQUFmLENBQXFCLENBQUNKLEtBQUtLLEVBQU4sRUFBVSxRQUFWLEVBQW9CLGFBQXBCLEVBQW1DLFdBQW5DLENBQXJCLEVBQXNFLElBQXRFLENBVE47QUFVTE8sb0JBQWdCZCxNQUFNSyxRQUFOLENBQWVDLEtBQWYsQ0FBcUIsQ0FBQ0osS0FBS0ssRUFBTixFQUFVLFFBQVYsRUFBb0IsZ0JBQXBCLENBQXJCLEVBQTREbkMsTUFBNUQsQ0FWWDtBQVdMMkMsa0JBQWNmLE1BQU1LLFFBQU4sQ0FBZUMsS0FBZixDQUFxQixDQUFDSixLQUFLSyxFQUFOLEVBQVUsUUFBVixFQUFvQixjQUFwQixDQUFyQixFQUEwRHBDLEtBQTFELENBWFQ7QUFZTDZDLGtCQUFjaEIsTUFBTUssUUFBTixDQUFlQyxLQUFmLENBQXFCLENBQUNKLEtBQUtLLEVBQU4sRUFBVSxjQUFWLENBQXJCLEVBQWdEcEMsS0FBaEQsQ0FaVDtBQWFMOEMsbUJBQWVqQixNQUFNSyxRQUFOLENBQWVDLEtBQWYsQ0FBcUIsQ0FBQ0osS0FBS0ssRUFBTixFQUFVLGVBQVYsQ0FBckIsRUFBaURuQyxNQUFqRCxDQWJWO0FBY0w4QyxVQUFNbEIsTUFBTUssUUFBTixDQUFlQyxLQUFmLENBQXFCLENBQUNKLEtBQUtLLEVBQU4sRUFBVSxNQUFWLENBQXJCLEVBQXdDbkMsTUFBeEMsQ0FkRDtBQWVMK0MsY0FBVW5CLE1BQU1LLFFBQU4sQ0FBZUMsS0FBZixDQUFxQixDQUFDSixLQUFLSyxFQUFOLEVBQVUsVUFBVixDQUFyQixFQUE0Q3BDLEtBQTVDLENBZkw7QUFnQkxpRCxnQkFBWXBCLE1BQU1LLFFBQU4sQ0FBZUMsS0FBZixDQUFxQixDQUFDSixLQUFLSyxFQUFOLEVBQVUsWUFBVixDQUFyQixFQUE4Q25DLE1BQTlDLENBaEJQO0FBaUJMaUQsZ0JBQVlyQixNQUFNSyxRQUFOLENBQWVDLEtBQWYsQ0FBcUIsQ0FBQ0osS0FBS0ssRUFBTixFQUFVLFFBQVYsRUFBb0IsZUFBcEIsRUFBcUMsWUFBckMsQ0FBckIsRUFBeUVwQyxLQUF6RSxDQWpCUDtBQWtCTG1ELGtCQUFjdEIsTUFBTUssUUFBTixDQUFlQyxLQUFmLENBQXFCLENBQUNKLEtBQUtLLEVBQU4sRUFBVSxjQUFWLENBQXJCLEVBQWdEcEMsS0FBaEQsQ0FsQlQ7QUFtQkxvRCx3QkFBb0J2QixNQUFNSyxRQUFOLENBQWVDLEtBQWYsQ0FBcUIsQ0FBQ0osS0FBS0ssRUFBTixFQUFVLG9CQUFWLENBQXJCLEVBQXNEcEMsS0FBdEQsQ0FuQmY7QUFvQkxxRCxpQkFBYXhCLE1BQU1LLFFBQU4sQ0FBZUMsS0FBZixDQUFxQixDQUFDSixLQUFLSyxFQUFOLEVBQVUsU0FBVixDQUFyQixFQUEyQ25DLE1BQTNDLEVBQW1EcUQsSUFwQjNEO0FBcUJMQyxjQUFVN0IsTUFBTThCLFdBQU4sQ0FBa0J6QixJQUFsQixFQUF3QkYsTUFBTTRCLElBQTlCLENBckJMO0FBc0JMQyxZQUFRaEMsTUFBTWlDLFNBQU4sQ0FBZ0I1QixJQUFoQixFQUFzQkYsTUFBTTRCLElBQTVCLENBdEJIO0FBdUJMRyxnQkFBWWxDLE1BQU1tQyxhQUFOLENBQW9COUIsSUFBcEIsRUFBMEJGLE1BQU00QixJQUFoQyxDQXZCUDtBQXdCTEssdUJBQW1CcEMsTUFBTXFDLG9CQUFOLENBQTJCaEMsSUFBM0IsRUFBaUNGLE1BQU00QixJQUF2QyxDQXhCZDtBQXlCTE8sc0JBQWtCdEMsTUFBTXVDLG1CQUFOLENBQTBCbEMsSUFBMUIsRUFBZ0NGLE1BQU00QixJQUF0QyxDQXpCYjtBQTBCTFMsMkJBQXVCckMsTUFBTUssUUFBTixDQUFlaUMsR0FBZixDQUFtQixjQUFuQixFQUFtQyxDQUFuQyxDQTFCbEIsRUEwQnlEO0FBQzlEQyxlQUFXdkMsTUFBTUssUUFBTixDQUFlQyxLQUFmLENBQXFCLENBQUNKLEtBQUtLLEVBQU4sRUFBVSxTQUFWLEVBQXFCLFdBQXJCLENBQXJCLEVBQXdEcEMsS0FBeEQ7QUEzQk4sR0FBUDtBQTZCRCxDQS9CRDs7QUFpQ0EsSUFBTXFFLHFCQUFxQmxELGVBQTNCOztJQUtNbUQsUSxXQURMcEUsUUFBUTBCLGVBQVIsRUFBeUJ5QyxrQkFBekIsQyxFQUZBNUMsVSxVQUNBdEIsVTs7O0FBTUMsb0JBQVlvRSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsaURBQ2pCLGdDQUFNQSxLQUFOLENBRGlCOztBQUFBOztBQUVqQixVQUFLMUMsS0FBTCxHQUFhO0FBQ1gyQyxrQkFBWSxDQUREO0FBRVhDLHFCQUFlLENBRko7QUFHWEMsdUJBQWlCLEtBSE47QUFJWEMsb0JBQWMsSUFKSDtBQUtYQyxvQkFBYztBQUxILEtBQWI7QUFPQSxVQUFLQyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0EsVUFBS0MsY0FBTCxHQUFzQixFQUF0QjtBQUNBLFVBQUtDLGlCQUFMLEdBQXlCLEtBQXpCO0FBQ0EsVUFBS0MsZUFBTCxHQUF1QixLQUF2QixDQVppQixDQVlhO0FBQzlCLFVBQUtDLGdCQUFMLEdBQXdCLEtBQXhCLENBYmlCLENBYWM7QUFiZDtBQWNsQjs7cUJBRURDLG9CLG1DQUF1QjtBQUNyQkMsYUFBU0MsbUJBQVQsQ0FBNkIsT0FBN0IsRUFBc0MsS0FBS0MsZUFBM0M7QUFDQSxTQUFLZCxLQUFMLENBQVdlLFVBQVgsQ0FBc0IsS0FBS2YsS0FBTCxDQUFXdkMsSUFBakM7QUFDRCxHOztBQWdCRDs7Ozs7Ozs7cUJBOCtCQXVELE0scUJBQVM7QUFBQTs7QUFDUCxRQUFNQyxnQkFBZ0IvRTtBQUNwQiwrQkFBeUIsSUFETDtBQUVwQix3QkFBa0IsS0FBSzhELEtBQUwsQ0FBV2tCLFVBQVgsSUFBeUIsQ0FBQyxLQUFLbEIsS0FBTCxDQUFXbUIsZ0JBRm5DO0FBR3BCLGlCQUFXLEtBQUtuQixLQUFMLENBQVd0QyxNQUhGO0FBSXBCLG9CQUFjLEtBQUtzQyxLQUFMLENBQVdsQyxTQUpMO0FBS3BCLHFCQUFlLEtBQUtrQyxLQUFMLENBQVdqQztBQUxOLG1CQU1uQixLQUFLaUMsS0FBTCxDQUFXb0IsU0FOUSxJQU1JLENBQUMsQ0FBQyxLQUFLcEIsS0FBTCxDQUFXb0IsU0FOakIsZUFBdEI7O0FBU0E7QUFDQSxTQUFLQyxVQUFMLENBQWdCLEtBQUtyQixLQUFMLENBQVdILFNBQTNCOztBQUVBLFFBQUl5QixZQUFZLElBQWhCO0FBQ0EsUUFBSUMsaUJBQWlCLElBQXJCO0FBQ0EsUUFBSUMsZ0JBQWdCLElBQXBCO0FBQ0EsUUFDRSxDQUFDLEtBQUt4QixLQUFMLENBQVdzQixTQUFYLElBQ0MsS0FBS3RCLEtBQUwsQ0FBV2tCLFVBRFosSUFFQyxLQUFLbEIsS0FBTCxDQUFXeUIsU0FGWixJQUdDLEtBQUt6QixLQUFMLENBQVcwQixRQUhiLEtBSUEsQ0FBQyxLQUFLMUIsS0FBTCxDQUFXbUIsZ0JBTGQsRUFNRTtBQUNBSSx1QkFDRTtBQUFDLGlCQUFEO0FBQUEsVUFBVyxVQUFTLE9BQXBCO0FBQ0U7QUFBQTtBQUFBLFlBQUssV0FBVSw2QkFBZjtBQUE4QyxlQUFLdkIsS0FBTCxDQUFXc0I7QUFBekQsU0FERjtBQUVJLGFBQUt0QixLQUFMLENBQVd5QixTQUFYLElBQXdCLEtBQUt6QixLQUFMLENBQVcyQixlQUFuQyxJQUNBLENBQUMsS0FBSzNCLEtBQUwsQ0FBVzRCLHdCQURiLElBQzBDLG9CQUFDLGlCQUFELEVBQXVCLEtBQUs1QixLQUE1QixDQUg3QztBQUtHLGFBQUtBLEtBQUwsQ0FBV2tCLFVBQVgsSUFDRCxvQkFBQyxrQkFBRDtBQUNFLHdCQUFjLEtBQUtXLGtCQURyQjtBQUVFLDBCQUFnQixLQUFLQyxvQkFGdkI7QUFHRSxnQ0FBc0IsS0FBS0M7QUFIN0IsV0FJTSxLQUFLL0IsS0FKWCxFQU5GO0FBYUcsU0FBQyxLQUFLQSxLQUFMLENBQVdnQyxpQkFBWCxJQUNBLEtBQUtoQyxLQUFMLENBQVcwQixRQURYLElBRUEsS0FBSzFCLEtBQUwsQ0FBV2lDLGNBRlgsSUFHQyxLQUFLakMsS0FBTCxDQUFXeUIsU0FBWCxJQUNDLENBQUMsS0FBS3pCLEtBQUwsQ0FBVzJCLGVBSmYsS0FJb0Msb0JBQUMsZ0JBQUQsRUFBc0IsS0FBSzNCLEtBQTNCO0FBakJ2QyxPQURGO0FBc0JEO0FBQ0QsUUFBSSxLQUFLQSxLQUFMLENBQVd3QixhQUFYLElBQTRCLEtBQUt4QixLQUFMLENBQVdrQyxVQUEzQyxFQUF1RDtBQUNyRFYsc0JBQ0U7QUFBQyxpQkFBRDtBQUFBLFVBQVcsVUFBUyxNQUFwQjtBQUNFO0FBQUE7QUFBQSxZQUFLLFdBQVUsd0JBQWY7QUFBeUMsZUFBS3hCLEtBQUwsQ0FBV2tDO0FBQXBELFNBREY7QUFFRTtBQUFBO0FBQUEsWUFBSyxXQUFVLDRCQUFmO0FBQTZDLGVBQUtsQyxLQUFMLENBQVd3QjtBQUF4RDtBQUZGLE9BREY7QUFNRDtBQUNELFFBQUlBLGlCQUFpQkQsY0FBckIsRUFBcUM7QUFDbkNELGtCQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsaUNBQWY7QUFDR0UscUJBREg7QUFFR0Q7QUFGSCxPQURGO0FBTUQ7QUFDRCxRQUFJWSxZQUNELEtBQUtuQyxLQUFMLENBQVdtQyxTQUFYLElBQXdCLEtBQUtuQyxLQUFMLENBQVdtQyxTQUFYLEtBQXlCLENBQWxELEdBQ0UsS0FBS25DLEtBQUwsQ0FBV21DLFNBRGIsR0FFRSxLQUFLbkMsS0FBTCxDQUFXeEIsSUFBWCxDQUFnQk8sSUFIcEI7QUFJQSxRQUFJLEtBQUtpQixLQUFMLENBQVdqQyxVQUFmLEVBQTJCb0UsYUFBYSxLQUFLbkMsS0FBTCxDQUFXdEIsVUFBWCxDQUFzQkssSUFBbkM7QUFDM0IsUUFBSSxDQUFDLEtBQUtpQixLQUFMLENBQVc1QixjQUFYLENBQTBCVyxJQUEvQixFQUFxQ29ELFlBQVksQ0FBWjtBQUNyQyxXQUNFO0FBQUE7QUFBQTtBQUNFLDZCQUFtQixLQUFLbkMsS0FBTCxDQUFXdkMsSUFBWCxDQUFnQkksRUFEckM7QUFFRSxtQkFBV29ELGFBRmI7QUFHRSxlQUFPLEtBQUtqQixLQUFMLENBQVdvQztBQUhwQjtBQUtHLFdBQUtwQyxLQUFMLENBQVd0QyxNQUFYLElBQXFCLG9CQUFDLE9BQUQsT0FMeEI7QUFNRyxXQUFLSixLQUFMLENBQVc2QyxlQUFYLElBQThCLEtBQUtrQyxpQkFBTCxFQU5qQztBQU9HZixlQVBIO0FBUUU7QUFBQyxnQ0FBRDtBQUFBO0FBQ0UsY0FBSSxLQUFLdEIsS0FBTCxDQUFXdkMsSUFBWCxDQUFnQkksRUFEdEI7QUFFRSxxQkFBV3NFLFNBRmI7QUFHRSx3QkFBYyxLQUFLbkMsS0FBTCxDQUFXaEMsV0FBWCxHQUNaLEtBQUtnQyxLQUFMLENBQVdzQyxZQUFYLEdBQTBCLEtBQUt0QyxLQUFMLENBQVd1QyxlQUR6QixHQUVWLEtBQUt2QyxLQUFMLENBQVdzQyxZQUxqQjtBQU1FLHFCQUFXLEtBQUt0QyxLQUFMLENBQVd3QyxTQU54QjtBQU9FLHFDQUEyQixLQUFLQyx5QkFQbEM7QUFRRSw0QkFBa0IsS0FScEI7QUFTRSxzQkFBWSxLQUFLQyxjQVRuQjtBQVVFLDBCQUFnQixLQUFLMUMsS0FBTCxDQUFXMkMsY0FBWCxJQUE2QixLQUFLckYsS0FBTCxDQUFXNEMsYUFWMUQ7QUFXRSxxQkFBVyxLQUFLRixLQUFMLENBQVc0QyxTQVh4QjtBQVlFLHVCQUFhLEtBQUtDLGNBQUwsRUFaZjtBQWFFLDRCQUFrQixLQUFLN0MsS0FBTCxDQUFXOEMsZ0JBYi9CO0FBY0UsMEJBQWdCLEtBQUs5QyxLQUFMLENBQVcrQyxXQWQ3QjtBQWVFLDJCQUFpQixLQUFLL0MsS0FBTCxDQUFXZ0QsZUFmOUI7QUFnQkUsMkJBQWlCLEtBQUtoRCxLQUFMLENBQVdpRCxlQWhCOUI7QUFpQkUseUJBQWUsS0FBS2pELEtBQUwsQ0FBV2tELGFBakI1QjtBQWtCRSx1QkFBYSxLQUFLbEQsS0FBTCxDQUFXbUQsV0FsQjFCO0FBbUJFLDhCQUFvQixLQUFLQyxlQW5CM0I7QUFvQkUsMkJBQWlCLEtBQUtwRCxLQUFMLENBQVdxRCxlQUFYLElBQThCLEtBQUtDLHFCQXBCdEQ7QUFxQkUsaUNBQXVCLEtBQUt0RCxLQUFMLENBQVd1RCxxQkFyQnBDO0FBc0JFLDRCQUFrQixLQUFLQztBQXRCekI7QUF3QkcsYUFBS0MsYUFBTDtBQXhCSCxPQVJGO0FBa0NHLFdBQUt6RCxLQUFMLENBQVcvQix5QkFBWCxJQUNELG9CQUFDLG1CQUFEO0FBQ0UsY0FBTSxLQUFLK0IsS0FBTCxDQUFXdkMsSUFEbkI7QUFFRSxpQkFBUyxLQUFLdUMsS0FBTCxDQUFXMEQsT0FGdEI7QUFHRSx3QkFBZ0IsS0FBSzFELEtBQUwsQ0FBVzVCLGNBSDdCO0FBSUUsa0NBQTBCLEtBQUs0QixLQUFMLENBQVcyRCx3QkFKdkM7QUFLRSw0QkFBb0IsS0FBSzNELEtBQUwsQ0FBVzREO0FBTGpDLFFBbkNGO0FBMkNHLFdBQUs1RCxLQUFMLENBQVc2RDtBQTNDZCxLQURGO0FBK0NELEc7OztFQXhvQ29CckksTUFBTXNJLGEsV0FFcEI5RyxZLEdBQWVBLFk7OztPQXVCdEI4RCxlLEdBQWtCLFlBQU07QUFDdEIsUUFBSSxPQUFLZCxLQUFMLENBQVcrRCxnQkFBZixFQUFpQztBQUMvQixhQUFLQyxRQUFMLENBQWM7QUFDWjdELHlCQUFpQjtBQURMLE9BQWQ7QUFHRDtBQUNEUyxhQUFTQyxtQkFBVCxDQUE2QixPQUE3QixFQUFzQyxPQUFLQyxlQUEzQztBQUNELEc7O09BRUQyQix5QixHQUE0QixVQUFDd0IsY0FBRCxFQUFpQkMsU0FBakIsRUFBK0I7QUFDekQsV0FBS2xFLEtBQUwsQ0FBV21FLFlBQVgsQ0FBd0IsT0FBS25FLEtBQUwsQ0FBV3ZDLElBQW5DLEVBQXlDeUcsU0FBekMsRUFBb0RELGNBQXBEO0FBQ0QsRzs7T0FTREcsYSxHQUFnQixVQUFDQyxRQUFELEVBQVdDLEdBQVgsRUFBZ0JDLENBQWhCLEVBQXNDO0FBQUEsUUFBbkJDLE1BQW1CLHVFQUFWLEtBQVU7O0FBQ3BELFFBQUksT0FBS3hFLEtBQUwsQ0FBV3lFLHFCQUFmLEVBQXNDO0FBQ3BDLFVBQU1uRSxXQUFXa0UsU0FBUyxPQUFLakUsY0FBZCxHQUErQixPQUFLRCxRQUFyRDtBQUNBLFVBQU1vRSxZQUFZLENBQUN6SCxVQUFVMEgsSUFBWCxFQUFpQjFILFVBQVUySCxFQUEzQixFQUErQjNILFVBQVU0SCxJQUF6QyxFQUErQzVILFVBQVU2SCxLQUF6RCxDQUFsQjtBQUZvQyxtQkFLaEMsT0FBSzlFLEtBTDJCO0FBQUEsVUFJbEMwRCxPQUprQyxVQUlsQ0EsT0FKa0M7QUFBQSxVQUl6QnRGLGNBSnlCLFVBSXpCQSxjQUp5QjtBQUFBLFVBSVRYLElBSlMsVUFJVEEsSUFKUztBQUFBLFVBSUhlLElBSkcsVUFJSEEsSUFKRztBQUFBLFVBSUd1RyxrQkFKSCxVQUlHQSxrQkFKSDs7QUFNcEMsVUFBTUMsY0FBYzdILE1BQU1pQixjQUFOLENBQXFCc0YsT0FBckIsRUFBOEJ0RixjQUE5QixDQUFwQjtBQUNBLFVBQU02RyxzQkFBc0IsU0FBdEJBLG1CQUFzQjtBQUFBLGVBQUs5SCxNQUFNK0gsWUFBTixDQUFtQkYsWUFBWUcsQ0FBWixDQUFuQixDQUFMO0FBQUEsT0FBNUI7QUFDQSxVQUFNQyxXQUFXNUcsS0FBS08sSUFBdEI7QUFDQSxVQUFNbUYsWUFBWS9HLE1BQU0rSCxZQUFOLENBQW1CWixHQUFuQixDQUFsQjtBQUNBLFVBQUllLGNBQWMvRSxTQUFZN0MsS0FBS0ksRUFBakIsU0FBdUJxRyxTQUF2QixTQUFvQ0csUUFBcEMsQ0FBbEI7QUFDQSxVQUFJaUIsUUFBUSxJQUFaOztBQUVBLFVBQU1DLGtCQUFrQixTQUFsQkEsZUFBa0IsR0FBTTtBQUM1QixZQUFJRixZQUFZRyxJQUFaLEtBQXFCLE1BQXpCLEVBQWlDLE9BQU8sSUFBUDtBQUNqQyxlQUFPSCxZQUFZSSxjQUFaLEtBQStCLENBQXRDO0FBQ0QsT0FIRDs7QUFLQSxVQUFNQyxnQkFBZ0IsU0FBaEJBLGFBQWdCLEdBQU07QUFDMUIsWUFBSUwsWUFBWUcsSUFBWixLQUFxQixNQUF6QixFQUFpQyxPQUFPLElBQVA7QUFDakMsZUFBT0gsWUFBWU0sWUFBWixLQUE2Qk4sWUFBWU8sS0FBWixDQUFrQkMsTUFBdEQ7QUFDRCxPQUhEOztBQUtBO0FBQ0EsVUFBSVIsZUFBZUEsWUFBWVMsU0FBL0IsRUFBMEM7QUFDeENSLGdCQUFRRCxXQUFSO0FBQ0FBLHNCQUFjQSxZQUFZUyxTQUFaLENBQXNCQyxNQUF0QixDQUE2QkMsUUFBM0M7QUFDRDs7QUFFRDtBQUNBLFVBQUl0QixVQUFVdUIsUUFBVixDQUFtQjFCLEVBQUUyQixPQUFyQixLQUFpQ2IsWUFBWUcsSUFBWixLQUFxQixRQUExRCxFQUFvRWpCLEVBQUU0QixjQUFGOztBQUVwRSxjQUFRNUIsRUFBRTJCLE9BQVY7QUFDRSxhQUFLakosVUFBVW1KLEtBQWY7QUFDQSxhQUFLbkosVUFBVW9KLEdBQWY7QUFBb0I7QUFDbEIsZ0JBQUk3QixVQUFVRCxFQUFFMkIsT0FBRixLQUFjakosVUFBVW1KLEtBQXRDLEVBQTZDO0FBQzNDLHFCQUFLcEcsS0FBTCxDQUFXc0csVUFBWCxDQUFzQjdJLElBQXRCLEVBQTRCTixNQUFNb0osc0JBQU4sQ0FBNkI3QyxPQUE3QixDQUE1QjtBQUNBLHFCQUFLbEQsaUJBQUwsR0FBeUIsSUFBekI7QUFDQTtBQUNEO0FBQ0Q2RSx3QkFBWVUsTUFBWjtBQUNBO0FBQ0Q7QUFDRCxhQUFLOUksVUFBVTBILElBQWY7QUFBcUI7QUFDbkIsZ0JBQUk2QixjQUFjbEcsU0FBWTdDLEtBQUtJLEVBQWpCLFNBQXVCcUcsU0FBdkIsVUFBb0NHLFdBQVcsQ0FBL0MsRUFBbEI7O0FBRUE7QUFDQSxnQkFBSWlCLFNBQVNBLE1BQU1RLFNBQWYsSUFBNEIsQ0FBQ1IsTUFBTVEsU0FBTixDQUFnQnhJLEtBQWhCLENBQXNCbUosVUFBdkQsRUFBbUU7QUFDakVsQyxnQkFBRTRCLGNBQUY7QUFDQSxrQkFBSSxDQUFDSyxXQUFMLEVBQWtCO0FBQ2xCQSw0QkFBY0EsWUFBWVYsU0FBWixDQUFzQkMsTUFBdEIsQ0FBNkJDLFFBQTNDO0FBQ0Q7QUFDRCxtQkFBS1UsYUFBTCxDQUFtQkYsV0FBbkIsRUFBZ0NuQyxXQUFXLENBQTNDLEVBQThDLENBQUMsQ0FBL0M7QUFDQTtBQUNEO0FBQ0QsYUFBS3BILFVBQVUySCxFQUFmO0FBQW1CO0FBQ2pCLGdCQUFJNEIsZUFBY2xHLFNBQVk3QyxLQUFLSSxFQUFqQixTQUF1QnFHLFNBQXZCLFVBQW9DRyxXQUFXLENBQS9DLEVBQWxCOztBQUVBO0FBQ0EsZ0JBQUlpQixTQUFTQSxNQUFNUSxTQUFmLElBQTRCLENBQUNSLE1BQU1RLFNBQU4sQ0FBZ0J4SSxLQUFoQixDQUFzQm1KLFVBQXZELEVBQW1FO0FBQ2pFbEMsZ0JBQUU0QixjQUFGO0FBQ0Esa0JBQUksQ0FBQ0ssWUFBTCxFQUFrQjtBQUNsQkEsNkJBQWNBLGFBQVlWLFNBQVosQ0FBc0JDLE1BQXRCLENBQTZCQyxRQUEzQztBQUNEO0FBQ0QsbUJBQUtVLGFBQUwsQ0FBbUJGLFlBQW5CLEVBQWdDbkMsV0FBVyxDQUEzQyxFQUE4QyxDQUFDLENBQS9DO0FBQ0E7QUFDRDtBQUNELGFBQUtwSCxVQUFVMEosR0FBZjtBQUNBLGFBQUsxSixVQUFVNkgsS0FBZjtBQUNBLGFBQUs3SCxVQUFVNEgsSUFBZjtBQUFxQjtBQUNuQixnQkFBSU4sRUFBRTJCLE9BQUYsS0FBY2pKLFVBQVU2SCxLQUF4QixJQUFpQyxDQUFDWSxlQUF0QyxFQUF1RDtBQUN2RCxnQkFBSW5CLEVBQUUyQixPQUFGLEtBQWNqSixVQUFVNEgsSUFBeEIsSUFBZ0MsQ0FBQ1UsaUJBQXJDLEVBQXdEOztBQUV4RGhCLGNBQUU0QixjQUFGOztBQUVBLGdCQUFJUyxZQUFZNUIsWUFBWTZCLFNBQVosQ0FBc0I7QUFBQSxxQkFBS0MsRUFBRUMsWUFBRixDQUFlQyxJQUFmLENBQW9CLEdBQXBCLE1BQTZCOUMsU0FBbEM7QUFBQSxhQUF0QixDQUFoQjtBQUNBLGdCQUFJMEMsY0FBYyxDQUFDLENBQW5CLEVBQXNCO0FBQ3BCLGtCQUFJSyxXQUFXLElBQWY7QUFDQSxrQkFBSVQsZ0JBQWMsSUFBbEI7QUFDQSxrQkFBSVUsU0FBUzdDLFFBQWI7QUFDQSxxQkFBTzRDLFFBQVAsRUFBaUI7QUFDZjtBQUNBLG9CQUFJMUMsRUFBRTJCLE9BQUYsS0FBY2pKLFVBQVU0SCxJQUF4QixJQUFpQ04sRUFBRTJCLE9BQUYsS0FBY2pKLFVBQVUwSixHQUF4QixJQUErQnBDLEVBQUU0QyxRQUF0RSxFQUFpRjtBQUMvRSxzQkFBSVAsWUFBWSxDQUFaLElBQWlCLENBQXJCLEVBQXdCO0FBQ3RCQSxpQ0FBYSxDQUFiO0FBQ0QsbUJBRkQsTUFFTyxJQUFJTSxTQUFTLENBQVQsSUFBYyxDQUFsQixFQUFxQjtBQUMxQk4sZ0NBQVk1QixZQUFZYSxNQUFaLEdBQXFCLENBQWpDO0FBQ0FxQiw4QkFBVSxDQUFWO0FBQ0QsbUJBSE0sTUFHQTtBQUNMO0FBQ0Q7QUFDRixpQkFURCxNQVNPO0FBQ0w7QUFDQSxzQkFBSU4sWUFBWSxDQUFaLEdBQWdCNUIsWUFBWWEsTUFBaEMsRUFBd0M7QUFDdENlLGlDQUFhLENBQWI7QUFDRCxtQkFGRCxNQUVPLElBQUlNLFNBQVMsQ0FBVCxHQUFhOUIsUUFBakIsRUFBMkI7QUFDaEN3QixnQ0FBWSxDQUFaO0FBQ0FNLDhCQUFVLENBQVY7QUFDRCxtQkFITSxNQUdBLElBQUlBLFNBQVMsQ0FBVCxLQUFlOUIsUUFBbkIsRUFBNkI7QUFDbEM7QUFDQSx3QkFBSUwsc0JBQXNCUixFQUFFMkIsT0FBRixLQUFjakosVUFBVTBKLEdBQWxELEVBQXVENUIsbUJBQW1CUixDQUFuQjtBQUN2RDtBQUNEO0FBQ0Y7O0FBRURpQyxnQ0FBY2xHLFNBQVk3QyxLQUFLSSxFQUFqQixTQUF1Qm9ILG9CQUFvQjJCLFNBQXBCLENBQXZCLFNBQXlETSxNQUF6RCxDQUFkOztBQUVBO0FBQ0Esb0JBQUksQ0FBQ1YsYUFBRCxJQUFnQmpDLEVBQUUyQixPQUFGLEtBQWNqSixVQUFVNEgsSUFBNUMsRUFBa0Q7QUFDaEQ7QUFDQSxzQkFBSStCLGFBQWE1QixZQUFZYSxNQUE3QixFQUFxQztBQUNuQywyQkFBT2UsYUFBYTVCLFlBQVlhLE1BQXpCLElBQW1DLENBQUNXLGFBQTNDLEVBQXdEO0FBQ3REQSxzQ0FBY2xHLFNBQVk3QyxLQUFLSSxFQUFqQixTQUF1Qm9ILG9CQUFvQjJCLFNBQXBCLENBQXZCLFNBQXlETSxNQUF6RCxDQUFkO0FBQ0FOLG1DQUFhLENBQWI7O0FBRUE7QUFDQTtBQUNBLDBCQUFJLENBQUNKLGFBQUQsSUFBZ0JJLGNBQWM1QixZQUFZYSxNQUE5QyxFQUFzRDtBQUNwRDtBQUNBLDRCQUFJcUIsU0FBUyxDQUFULEtBQWU5QixRQUFuQixFQUE2QjtBQUMzQiw4QkFBSUwsc0JBQXNCUixFQUFFMkIsT0FBRixLQUFjakosVUFBVTBKLEdBQWxELEVBQXVEO0FBQ3JENUIsK0NBQW1CUixDQUFuQjtBQUNEO0FBQ0Q7QUFDRDs7QUFFRHFDLG9DQUFZLENBQVo7QUFDQU0sa0NBQVUsQ0FBVjtBQUNBVix3Q0FBY2xHLFNBQVk3QyxLQUFLSSxFQUFqQixTQUF1Qm9ILG9CQUFvQjJCLFNBQXBCLENBQXZCLFNBQXlETSxNQUF6RCxDQUFkO0FBQ0Q7QUFDRjtBQUNGO0FBQ0Q7QUFDRCxpQkF6QkQsTUF5Qk8sSUFBSSxDQUFDVixhQUFELElBQWdCakMsRUFBRTJCLE9BQUYsS0FBY2pKLFVBQVU0SCxJQUE1QyxFQUFrRDtBQUN2RCx5QkFBTytCLFlBQVksQ0FBWixJQUFpQixDQUFDSixhQUF6QixFQUFzQztBQUNwQ0ksaUNBQWEsQ0FBYjtBQUNBSixvQ0FBY2xHLFNBQVk3QyxLQUFLSSxFQUFqQixTQUF1Qm9ILG9CQUFvQjJCLFNBQXBCLENBQXZCLFNBQXlETSxNQUF6RCxDQUFkO0FBQ0Q7QUFDRjtBQUNERCwyQkFBV1QsZ0JBQWNBLGNBQVlTLFFBQTFCLEdBQXFDLEtBQWhEO0FBQ0Q7QUFDRCxrQkFBSSxDQUFDQSxRQUFELElBQWFULGFBQWpCLEVBQThCO0FBQzVCLG9CQUFJQSxjQUFZVixTQUFoQixFQUEyQlUsZ0JBQWNBLGNBQVlWLFNBQVosQ0FBc0JDLE1BQXRCLENBQTZCQyxRQUEzQztBQUMzQix1QkFBS1UsYUFBTCxDQUFtQkYsYUFBbkIsRUFBZ0NVLE1BQWhDLEVBQXdDTixTQUF4QztBQUNEO0FBQ0Y7QUFDRDtBQUNEO0FBQ0Q7QUFDRTtBQXJISjtBQXVIRDtBQUNGLEc7O09BRURRLGlCLEdBQW9CLFVBQUMvQyxRQUFELEVBQVdDLEdBQVg7QUFBQSxXQUFtQixVQUFDQyxDQUFELEVBQU87QUFDNUMsYUFBS0gsYUFBTCxDQUFtQkMsUUFBbkIsRUFBNkJDLEdBQTdCLEVBQWtDQyxDQUFsQztBQUNELEtBRm1CO0FBQUEsRzs7T0FJcEI4QyxtQixHQUFzQixVQUFDaEQsUUFBRCxFQUFXQyxHQUFYO0FBQUEsV0FBbUIsVUFBQ0MsQ0FBRCxFQUFPO0FBQzlDLGFBQUtILGFBQUwsQ0FBbUJDLFFBQW5CLEVBQTZCQyxHQUE3QixFQUFrQ0MsQ0FBbEMsRUFBcUMsSUFBckM7QUFDRCxLQUZxQjtBQUFBLEc7O09BSXRCK0MsdUIsR0FBMEIsVUFBQ2hELEdBQUQsRUFBTWlELFdBQU47QUFBQSxXQUFzQixVQUFDQyxXQUFELEVBQWlCO0FBQy9ELFVBQUlDLGlCQUFKO0FBQ0E7QUFDQSxVQUFJRCxXQUFKLEVBQWlCO0FBQ2YsWUFBSUEsWUFBWUUsTUFBWixLQUF1QkMsU0FBM0IsRUFBc0M7QUFDcENGLHFCQUFXRCxZQUFZRSxNQUFaLENBQW1COUIsS0FBOUI7QUFDRCxTQUZELE1BRU8sSUFBSTRCLFlBQVk1QixLQUFaLEtBQXNCK0IsU0FBMUIsRUFBcUM7QUFDMUNGLHFCQUFXRCxZQUFZNUIsS0FBdkI7QUFDRCxTQUZNLE1BRUE7QUFDTDZCLHFCQUFXRCxXQUFYO0FBQ0Q7QUFDRjtBQUNELFVBQU01QixRQUFRMkIsWUFBWUUsUUFBWixDQUFkO0FBQ0EsYUFBS3pILEtBQUwsQ0FBVzRILHFCQUFYLENBQ0UsT0FBSzVILEtBQUwsQ0FBV3ZDLElBRGIsRUFFRSxPQUFLdUMsS0FBTCxDQUFXMEQsT0FGYixFQUdFWSxHQUhGLEVBSUVzQixLQUpGO0FBTUQsS0FuQnlCO0FBQUEsRzs7T0FxQjFCaUMsdUIsR0FBMEIsVUFBQ3hELFFBQUQsRUFBV0MsR0FBWCxFQUFnQmlELFdBQWhCO0FBQUEsV0FBZ0MsVUFBQ0MsV0FBRCxFQUFpQjtBQUN6RSxVQUFJQyxpQkFBSjtBQUNBO0FBQ0EsVUFBSUQsV0FBSixFQUFpQjtBQUNmLFlBQUlBLFlBQVlFLE1BQVosS0FBdUJDLFNBQTNCLEVBQXNDO0FBQ3BDRixxQkFBV0QsWUFBWUUsTUFBWixDQUFtQjlCLEtBQTlCO0FBQ0QsU0FGRCxNQUVPLElBQUk0QixZQUFZNUIsS0FBWixLQUFzQitCLFNBQTFCLEVBQXFDO0FBQzFDRixxQkFBV0QsWUFBWTVCLEtBQXZCO0FBQ0QsU0FGTSxNQUVBO0FBQ0w2QixxQkFBV0QsV0FBWDtBQUNEO0FBQ0Y7QUFDRCxVQUFNNUIsUUFBUTJCLFlBQVlFLFFBQVosQ0FBZDtBQUNBLGFBQUt6SCxLQUFMLENBQVc4SCxxQkFBWCxDQUFpQyxPQUFLOUgsS0FBTCxDQUFXdkMsSUFBNUMsRUFBa0Q0RyxRQUFsRCxFQUE0REMsSUFBSXlDLFlBQWhFLEVBQThFbkIsS0FBOUU7QUFDQSxVQUFJdEIsSUFBSXlELG1CQUFSLEVBQTZCO0FBQzNCekQsWUFBSXlELG1CQUFKLENBQXdCbkMsS0FBeEIsRUFBK0J0QixJQUFJeUMsWUFBbkMsRUFBaUQxQyxRQUFqRDtBQUNEO0FBQ0QsVUFBSUMsSUFBSTBELHVCQUFKLElBQStCcEMsVUFBVXRCLElBQUkwRCx1QkFBSixDQUE0QkMsVUFBekUsRUFBcUY7QUFDbkY7QUFDQSxlQUFLSix1QkFBTCxDQUNFeEQsUUFERixFQUVFLEVBQUUwQyxjQUFjekMsSUFBSTBELHVCQUFKLENBQTRCRSxlQUE1QyxFQUZGLEVBR0U7QUFBQSxpQkFBS0MsQ0FBTDtBQUFBLFNBSEYsRUFJRTdELElBQUkwRCx1QkFBSixDQUE0QkksUUFKOUI7QUFLRDtBQUNELFVBQUk5RCxJQUFJK0QsVUFBUixFQUFvQjtBQUNsQixlQUFLckksS0FBTCxDQUFXc0ksdUJBQVgsQ0FDRSxPQUFLdEksS0FBTCxDQUFXdkMsSUFEYixFQUVFNEcsUUFGRixFQUdFQyxJQUFJeUMsWUFITixFQUlFbkIsS0FKRixFQUtFdEIsSUFBSStELFVBTE47QUFPRDtBQUNGLEtBbEN5QjtBQUFBLEc7O09Bb0MxQkUscUIsR0FBd0IsVUFBQ2xFLFFBQUQsRUFBV0MsR0FBWCxFQUFnQmlELFdBQWhCO0FBQUEsV0FBZ0MsVUFBQ0MsV0FBRCxFQUFpQjtBQUN2RSxVQUFNZ0IsU0FBUyxPQUFLQyxtQkFBTCxDQUF5QnBFLFFBQXpCLENBQWY7QUFDQSxVQUFJb0QsaUJBQUo7QUFDQTtBQUNBLFVBQUlELFdBQUosRUFBaUI7QUFDZixZQUFJQSxZQUFZRSxNQUFaLEtBQXVCQyxTQUEzQixFQUFzQztBQUNwQ0YscUJBQVdELFlBQVlFLE1BQVosQ0FBbUI5QixLQUE5QjtBQUNELFNBRkQsTUFFTyxJQUFJNEIsWUFBWTVCLEtBQVosS0FBc0IrQixTQUExQixFQUFxQztBQUMxQ0YscUJBQVdELFlBQVk1QixLQUF2QjtBQUNELFNBRk0sTUFFQTtBQUNMNkIscUJBQVdELFdBQVg7QUFDRDtBQUNGO0FBQ0QsVUFBTTVCLFFBQVEyQixZQUFZRSxRQUFaLENBQWQ7QUFDQSxhQUFLekgsS0FBTCxDQUFXMEksbUJBQVgsQ0FBK0IsT0FBSzFJLEtBQUwsQ0FBV3ZDLElBQTFDLEVBQWdEK0ssTUFBaEQsRUFBd0RsRSxJQUFJeUMsWUFBNUQsRUFBMEVuQixLQUExRTtBQUNBLFVBQUl0QixJQUFJcUUsaUJBQVIsRUFBMkI7QUFDekJyRSxZQUFJcUUsaUJBQUosQ0FBc0IvQyxLQUF0QixFQUE2QnRCLElBQUl5QyxZQUFqQyxFQUErQzFDLFFBQS9DLEVBQXlEbUUsTUFBekQ7QUFDRDtBQUNELFVBQUlsRSxJQUFJMEQsdUJBQUosSUFBK0JwQyxVQUFVdEIsSUFBSTBELHVCQUFKLENBQTRCQyxVQUF6RSxFQUFxRjtBQUNuRjtBQUNBLGVBQUtNLHFCQUFMLENBQ0VsRSxRQURGLEVBRUUsRUFBRTBDLGNBQWN6QyxJQUFJMEQsdUJBQUosQ0FBNEJFLGVBQTVDLEVBRkYsRUFHRTtBQUFBLGlCQUFLQyxDQUFMO0FBQUEsU0FIRixFQUlFN0QsSUFBSTBELHVCQUFKLENBQTRCSSxRQUo5QjtBQUtEO0FBQ0QsVUFBSTlELElBQUkrRCxVQUFSLEVBQW9CO0FBQ2xCLGVBQUtySSxLQUFMLENBQVc0SSxxQkFBWCxDQUNFLE9BQUs1SSxLQUFMLENBQVd2QyxJQURiLEVBRUUrSyxNQUZGLEVBR0VsRSxJQUFJeUMsWUFITixFQUlFbkIsS0FKRixFQUtFdEIsSUFBSStELFVBTE47QUFPRDtBQUNGLEtBbkN1QjtBQUFBLEc7O09BcUN4QlEsZ0IsR0FBbUIsVUFBQ3hFLFFBQUQsRUFBV0MsR0FBWCxFQUFnQmlELFdBQWhCO0FBQUEsV0FBZ0MsVUFBQ2hELENBQUQsRUFBTztBQUN4RCxVQUFJRCxJQUFJd0UsWUFBUixFQUFzQjtBQUNwQixZQUFJbEQsUUFBU3JCLEtBQUtBLEVBQUVtRCxNQUFQLElBQWlCbkQsRUFBRW1ELE1BQUYsQ0FBUzlCLEtBQVQsS0FBbUIrQixTQUFyQyxHQUNWcEQsRUFBRW1ELE1BQUYsQ0FBUzlCLEtBREMsR0FFVixPQUFLbUQsZ0JBQUwsQ0FBc0IxRSxRQUF0QixFQUFnQ0MsR0FBaEMsQ0FGRjtBQUdBLFlBQUlpRCxnQkFBZ0JJLFNBQXBCLEVBQStCO0FBQzdCL0Isa0JBQVEyQixZQUFZM0IsS0FBWixDQUFSO0FBQ0Q7QUFDRHRCLFlBQUl3RSxZQUFKLENBQWlCbEQsS0FBakIsRUFBd0J2QixRQUF4QjtBQUNEO0FBQ0YsS0FWa0I7QUFBQSxHOztPQVluQjJFLGMsR0FBaUIsVUFBQzNFLFFBQUQsRUFBV0MsR0FBWCxFQUFnQmlELFdBQWhCO0FBQUEsV0FBZ0MsVUFBQ2hELENBQUQsRUFBTztBQUN0RCxVQUFJRCxJQUFJMkUsVUFBUixFQUFvQjtBQUNsQixZQUFJckQsUUFBU3JCLEtBQUtBLEVBQUVtRCxNQUFQLElBQWlCbkQsRUFBRW1ELE1BQUYsQ0FBUzlCLEtBQVQsS0FBbUIrQixTQUFyQyxHQUNWcEQsRUFBRW1ELE1BQUYsQ0FBUzlCLEtBREMsR0FFVixPQUFLbUQsZ0JBQUwsQ0FBc0IxRSxRQUF0QixFQUFnQ0MsR0FBaEMsQ0FGRjtBQUdBLFlBQUlpRCxnQkFBZ0JJLFNBQXBCLEVBQStCO0FBQzdCL0Isa0JBQVEyQixZQUFZM0IsS0FBWixDQUFSO0FBQ0Q7QUFDRCxZQUFNNEMsU0FBUyxPQUFLQyxtQkFBTCxDQUF5QnBFLFFBQXpCLENBQWY7QUFDQUMsWUFBSTJFLFVBQUosQ0FBZXJELEtBQWYsRUFBc0J2QixRQUF0QixFQUFnQ21FLE1BQWhDO0FBQ0Q7QUFDRixLQVhnQjtBQUFBLEc7O09BYWpCVSxXLEdBQWMsVUFBQ0MsUUFBRCxFQUFXQyxTQUFYLEVBQXNCL0UsUUFBdEIsRUFBZ0NILFNBQWhDO0FBQUEsV0FBOEMsVUFBQ0ssQ0FBRCxFQUFPO0FBQUEsb0JBRzdELE9BQUt2RSxLQUh3RDtBQUFBLFVBRS9EcUosbUJBRitELFdBRS9EQSxtQkFGK0Q7QUFBQSxVQUUxQ0MsVUFGMEMsV0FFMUNBLFVBRjBDO0FBQUEsVUFFOUI3TCxJQUY4QixXQUU5QkEsSUFGOEI7QUFBQSxVQUV4QkssU0FGd0IsV0FFeEJBLFNBRndCOztBQUlqRSxVQUFJQSxTQUFKLEVBQWU7O0FBRWYsVUFBSXNMLGNBQWMsUUFBbEIsRUFBNEI7QUFDMUI3RSxVQUFFbUQsTUFBRixDQUFTM0IsTUFBVDtBQUNEO0FBQ0QsVUFBSW9ELGFBQWEsTUFBYixJQUF1QkcsVUFBM0IsRUFBdUM7QUFDckNELDRCQUFvQjVMLElBQXBCLEVBQTBCaEMsSUFBSTtBQUM1QjRJLDRCQUQ0QjtBQUU1Qkg7QUFGNEIsU0FBSixDQUExQjtBQUlEO0FBQ0YsS0FmYTtBQUFBLEc7O09BaUJkdUUsbUIsR0FBc0I7QUFBQSxXQUNwQixPQUFLekksS0FBTCxDQUFXeEIsSUFBWCxDQUFnQlosS0FBaEIsRUFBdUJ5RyxRQUF2QixTQUFvQyxPQUFLckUsS0FBTCxDQUFXdkMsSUFBWCxDQUFnQjhMLFNBQXBELEVBRG9CO0FBQUEsRzs7T0FHdEJDLG9CLEdBQXVCLFVBQUMzTCxFQUFELEVBQVE7QUFDN0IsUUFBSSxDQUFDQSxFQUFMLEVBQVMsT0FBTzhKLFNBQVA7QUFDVCxRQUFNOEIsUUFBUSxPQUFLekosS0FBTCxDQUFXeEIsSUFBWCxDQUFnQnFJLFNBQWhCLENBQTBCO0FBQUEsYUFBS3NCLEVBQUV2SyxLQUFGLENBQVEsT0FBS29DLEtBQUwsQ0FBV3ZDLElBQVgsQ0FBZ0I4TCxTQUF4QixNQUF1QzFMLEVBQTVDO0FBQUEsS0FBMUIsQ0FBZDtBQUNBLFdBQU80TCxVQUFVLENBQUMsQ0FBWCxHQUFlOUIsU0FBZixHQUEyQjhCLEtBQWxDO0FBQ0QsRzs7T0FFRFYsZ0IsR0FBbUIsVUFBQzFFLFFBQUQsRUFBV0MsR0FBWCxFQUFpQztBQUFBLFFBQWpCb0YsT0FBaUIsdUVBQVAsRUFBTzs7QUFDbEQ7QUFDQSxRQUFNN0wsS0FBSyxPQUFLNEssbUJBQUwsQ0FBeUJwRSxRQUF6QixDQUFYO0FBQ0EsUUFBTXNGLFlBQVksT0FBSzNKLEtBQUwsQ0FBV3ZCLFFBQVgsQ0FBb0JiLEtBQXBCLEVBQTJCQyxFQUEzQixTQUFrQ3lHLElBQUl5QyxZQUF0QyxHQUFxRFksU0FBckQsQ0FBbEI7QUFDQSxRQUFJaUMsc0JBQUo7QUFDQSxRQUFJRCxjQUFjaEMsU0FBbEIsRUFBNkI7QUFDM0JpQyxzQkFBZ0IsT0FBSzVKLEtBQUwsQ0FBV3hCLElBQVgsQ0FBZ0JaLEtBQWhCLEVBQXVCeUcsUUFBdkIsU0FBb0NDLElBQUl5QyxZQUF4QyxHQUF1RCxFQUF2RCxDQUFoQjtBQUNELEtBRkQsTUFFTyxJQUFJNEMsY0FBYyxJQUFsQixFQUF3QjtBQUM3QixhQUFPLEVBQVA7QUFDRCxLQUZNLE1BRUE7QUFDTDtBQUNBO0FBQ0EsY0FBUXJGLElBQUl1RixhQUFaO0FBQ0UsYUFBSyxRQUFMO0FBQ0UsaUJBQU92RixJQUFJd0Ysc0JBQUosQ0FBMkJDLElBQTNCLENBQWdDO0FBQUEsbUJBQU9DLElBQUlwRSxLQUFKLEtBQWMrRCxTQUFyQjtBQUFBLFdBQWhDLENBQVA7QUFDRixhQUFLLFNBQUw7QUFDRSxpQkFBT0QsUUFBUUssSUFBUixDQUFhO0FBQUEsbUJBQU9DLElBQUlwRSxLQUFKLEtBQWMrRCxTQUFyQjtBQUFBLFdBQWIsQ0FBUDtBQUNGO0FBQ0UsaUJBQU9BLFNBQVA7QUFOSjtBQVFEO0FBQ0QsUUFBSUMsa0JBQWtCLElBQWxCLElBQTBCQSxrQkFBa0JqQyxTQUE1QyxJQUF5RGlDLGtCQUFrQixFQUEvRSxFQUFtRjtBQUNqRixhQUFPLEVBQVA7QUFDRDtBQUNEO0FBQ0E7QUFDQSxZQUFRdEYsSUFBSXVGLGFBQVo7QUFDRSxXQUFLLE9BQUw7QUFBYztBQUNaLGNBQUlJLE9BQU9MLGFBQVAsRUFBc0IvRCxNQUF0QixHQUErQixDQUFuQyxFQUFzQztBQUNwQyxtQkFBT29FLE9BQU9MLGFBQVAsRUFDSk0sT0FESSxDQUNJLEdBREosRUFDUyxPQUFLbEssS0FBTCxDQUFXUCxnQkFEcEIsQ0FBUDtBQUVEO0FBQ0QsaUJBQU9tSyxhQUFQO0FBQ0Q7QUFDRCxXQUFLLFFBQUw7QUFDRSxlQUFPdEYsSUFBSXdGLHNCQUFKLENBQTJCQyxJQUEzQixDQUFnQztBQUFBLGlCQUFPQyxJQUFJcEUsS0FBSixLQUFjZ0UsYUFBckI7QUFBQSxTQUFoQyxDQUFQO0FBQ0YsV0FBSyxTQUFMO0FBQ0UsZUFBT0YsUUFBUUssSUFBUixDQUFhO0FBQUEsaUJBQU9DLElBQUlwRSxLQUFKLEtBQWNnRSxhQUFyQjtBQUFBLFNBQWIsQ0FBUDtBQUNGO0FBQ0UsZUFBT0EsYUFBUDtBQWJKO0FBZUQsRzs7T0FFRE8sa0IsR0FBcUIsVUFBQzlGLFFBQUQsRUFBV0MsR0FBWCxFQUFpQztBQUFBLFFBQWpCb0YsT0FBaUIsdUVBQVAsRUFBTzs7QUFDcEQsUUFBTVUsTUFBTSxPQUFLcEssS0FBTCxDQUFXdEIsVUFBWCxDQUFzQmQsS0FBdEIsRUFBNkJ5RyxRQUE3QixTQUEwQ0MsSUFBSXlDLFlBQTlDLEdBQTZELEVBQTdELENBQVo7QUFDQSxRQUFJcUQsUUFBUSxJQUFaLEVBQWtCO0FBQ2hCLGFBQU8sRUFBUDtBQUNELEtBRkQsTUFFTyxJQUFJOUYsSUFBSXVGLGFBQUosS0FBc0IsUUFBMUIsRUFBb0M7QUFDekMsYUFBT3ZGLElBQUl3RixzQkFBSixDQUEyQkMsSUFBM0IsQ0FBZ0M7QUFBQSxlQUFPQyxJQUFJcEUsS0FBSixLQUFjd0UsR0FBckI7QUFBQSxPQUFoQyxDQUFQO0FBQ0QsS0FGTSxNQUVBLElBQUksQ0FBQyxTQUFELEVBQVluRSxRQUFaLENBQXFCM0IsSUFBSXVGLGFBQXpCLENBQUosRUFBNkM7QUFDbEQsYUFBT0gsUUFBUUssSUFBUixDQUFhO0FBQUEsZUFBT0MsSUFBSXBFLEtBQUosS0FBY3dFLEdBQXJCO0FBQUEsT0FBYixDQUFQO0FBQ0Q7QUFDRCxXQUFPQSxHQUFQO0FBQ0QsRzs7T0FFREMsa0IsR0FBcUIsVUFBQy9GLEdBQUQsRUFBdUI7QUFBQSxRQUFqQm9GLE9BQWlCLHVFQUFQLEVBQU87O0FBQzFDLFFBQU1VLE1BQU0sT0FBS3BLLEtBQUwsQ0FBV3JCLFVBQVgsQ0FBc0JpQixHQUF0QixDQUEwQnpDLE1BQU0rSCxZQUFOLENBQW1CWixHQUFuQixDQUExQixFQUFtRCxFQUFuRCxDQUFaO0FBQ0EsUUFBSThGLFFBQVEsSUFBWixFQUFrQjtBQUNoQixhQUFPLEVBQVA7QUFDRCxLQUZELE1BRU8sSUFBSTlGLElBQUl1RixhQUFKLEtBQXNCLFFBQTFCLEVBQW9DO0FBQ3pDLGFBQU92RixJQUFJd0Ysc0JBQUosQ0FBMkJDLElBQTNCLENBQWdDO0FBQUEsZUFBT0MsSUFBSXBFLEtBQUosS0FBY3dFLEdBQXJCO0FBQUEsT0FBaEMsQ0FBUDtBQUNELEtBRk0sTUFFQSxJQUFJLENBQUMsVUFBRCxFQUFhLFNBQWIsRUFBd0JuRSxRQUF4QixDQUFpQzNCLElBQUl1RixhQUFyQyxDQUFKLEVBQXlEO0FBQzlELGFBQU9ILFFBQVFLLElBQVIsQ0FBYTtBQUFBLGVBQU9DLElBQUlwRSxLQUFKLEtBQWN3RSxHQUFyQjtBQUFBLE9BQWIsQ0FBUDtBQUNEO0FBQ0QsV0FBT0EsR0FBUDtBQUNELEc7O09BRURFLHlCLEdBQTRCLFVBQUNqRyxRQUFELEVBQVdDLEdBQVgsRUFBZ0JpRyxJQUFoQixFQUF5QjtBQUNuRCxRQUFJQyxvQkFBb0IsQ0FBQyxDQUFDbEcsSUFBSW1HLGNBQTlCO0FBQ0E7QUFDQSxRQUFJLENBQUNELGlCQUFELElBQXNCbEcsSUFBSW9HLDBCQUE5QixFQUEwRDtBQUN4RCxVQUFJSCxTQUFTLFFBQWIsRUFBdUI7QUFDckJDLDRCQUFvQixPQUFLTCxrQkFBTCxDQUNsQjlGLFFBRGtCLEVBRWxCLEVBQUUwQyxjQUFjekMsSUFBSW9HLDBCQUFKLENBQStCQyxpQkFBL0MsRUFGa0IsTUFHZHJHLElBQUlvRywwQkFBSixDQUErQnpDLFVBSHJDO0FBSUQsT0FMRCxNQUtPO0FBQ0x1Qyw0QkFBb0IsT0FBS3pCLGdCQUFMLENBQ2xCMUUsUUFEa0IsRUFFbEIsRUFBRTBDLGNBQWN6QyxJQUFJb0csMEJBQUosQ0FBK0JDLGlCQUEvQyxFQUZrQixNQUdkckcsSUFBSW9HLDBCQUFKLENBQStCekMsVUFIckM7QUFJRDtBQUNGO0FBQ0QsV0FBT3VDLGlCQUFQO0FBQ0QsRzs7T0FFRHBILGUsR0FBa0IsVUFBQ2lCLFFBQUQsRUFBYztBQUFBLGtCQVExQixPQUFLckUsS0FScUI7QUFBQSxRQUU1QnZDLElBRjRCLFdBRTVCQSxJQUY0QjtBQUFBLFFBRzVCTSxVQUg0QixXQUc1QkEsVUFINEI7QUFBQSxRQUk1QkQsU0FKNEIsV0FJNUJBLFNBSjRCO0FBQUEsUUFLNUJZLFVBTDRCLFdBSzVCQSxVQUw0QjtBQUFBLFFBTTVCSCxhQU40QixXQU01QkEsYUFONEI7QUFBQSxRQU81QkMsSUFQNEIsV0FPNUJBLElBUDRCOztBQVM5QixRQUFNb00sZ0JBQWdCLENBQUMsaUJBQUQsQ0FBdEI7QUFDQSxRQUFJQyxnQkFBZ0IsQ0FBcEIsQ0FWOEIsQ0FVUDtBQUN2QixRQUFJOU0sVUFBSixFQUFnQjhNLGdCQUFnQm5NLFdBQVdLLElBQTNCO0FBQ2hCLFFBQUloQixVQUFKLEVBQWdCO0FBQ2QsVUFBSXNHLFlBQWF3RyxnQkFBZ0IsQ0FBakMsRUFBcUM7QUFDbkNELHNCQUFjRSxJQUFkLENBQW1CLHFCQUFuQjtBQUNEO0FBQ0YsS0FKRCxNQUlPLElBQUloTixTQUFKLEVBQWU7QUFDcEI4TSxvQkFBY0UsSUFBZCxDQUFtQixzQkFBbkI7QUFDRDs7QUFHRDtBQUNBLFFBQUssQ0FBQy9NLFVBQUQsSUFBZSxDQUFDRCxTQUFqQixJQUNEUyxpQkFBaUJkLEtBQUs4TCxTQUR6QixFQUNxQztBQUNuQyxVQUNFaEwsY0FBY3dNLE9BQWQsQ0FBc0J2TSxLQUFLWixLQUFMLEVBQVl5RyxXQUFXd0csYUFBdkIsU0FBeUNwTixLQUFLOEwsU0FBOUMsRUFBdEIsTUFBcUYsQ0FBQyxDQUR4RixFQUVFO0FBQ0FxQixzQkFBY0UsSUFBZCxDQUFtQixhQUFuQjtBQUNEO0FBQ0Y7O0FBRUQsUUFBSSxPQUFLOUssS0FBTCxDQUFXZ0wsa0JBQWYsRUFBbUM7QUFDakMsYUFBT0osY0FBYzVELElBQWQsQ0FBbUIsR0FBbkIsSUFBMEIsR0FBMUIsR0FBZ0MsT0FBS2hILEtBQUwsQ0FBV2dMLGtCQUFYLENBQThCM0csUUFBOUIsQ0FBdkM7QUFDRDtBQUNELFdBQU91RyxjQUFjNUQsSUFBZCxDQUFtQixHQUFuQixDQUFQO0FBQ0QsRzs7T0FFRGlFLGUsR0FBa0IsVUFBQzVHLFFBQUQsRUFBV0MsR0FBWCxFQUFnQjZFLFFBQWhCLEVBQTZCO0FBQzdDLFFBQU0rQixhQUFhLEVBQW5CO0FBQ0EsUUFBSSxDQUFDLE9BQUtsTCxLQUFMLENBQVd2QyxJQUFYLENBQWdCOEwsU0FBakIsSUFBOEIsQ0FBQ2pGLElBQUl5QyxZQUF2QyxFQUFxRDtBQUNuRCxhQUFPbUUsVUFBUDtBQUNEO0FBQ0QsUUFBSUMsb0JBQUo7QUFDQSxRQUFJQyxxQkFBSjtBQUNBLFFBQUlDLHVCQUFKO0FBQ0EsUUFBSWxDLGFBQWEsUUFBakIsRUFBMkI7QUFDekJnQyxvQkFBYyxPQUFLbkwsS0FBTCxDQUFXbkIsa0JBQVgsQ0FBOEJqQixLQUE5QixFQUFxQyxNQUFyQyxFQUE2Q3lHLFFBQTdDLFNBQTBEQyxJQUFJeUMsWUFBOUQsRUFBZDtBQUNBcUUscUJBQWUsT0FBS3BMLEtBQUwsQ0FBV25CLGtCQUFYLENBQThCakIsS0FBOUIsRUFBcUMsT0FBckMsRUFBOEN5RyxRQUE5QyxTQUEyREMsSUFBSXlDLFlBQS9ELEVBQWY7QUFDQXNFLHVCQUFpQixPQUFLckwsS0FBTCxDQUFXbkIsa0JBQVgsQ0FBOEJqQixLQUE5QixFQUFxQyxTQUFyQyxFQUFnRHlHLFFBQWhELFNBQTZEQyxJQUFJeUMsWUFBakUsRUFBakI7QUFDRCxLQUpELE1BSU87QUFDTCxVQUFNbEosS0FBSyxPQUFLNEssbUJBQUwsQ0FBeUJwRSxRQUF6QixDQUFYO0FBQ0E4RyxvQkFBYyxPQUFLbkwsS0FBTCxDQUFXcEIsWUFBWCxDQUF3QmhCLEtBQXhCLEVBQStCLE1BQS9CLEVBQXVDQyxFQUF2QyxTQUE4Q3lHLElBQUl5QyxZQUFsRCxFQUFkO0FBQ0FxRSxxQkFBZSxPQUFLcEwsS0FBTCxDQUFXcEIsWUFBWCxDQUF3QmhCLEtBQXhCLEVBQStCLE9BQS9CLEVBQXdDQyxFQUF4QyxTQUErQ3lHLElBQUl5QyxZQUFuRCxFQUFmO0FBQ0FzRSx1QkFBaUIsT0FBS3JMLEtBQUwsQ0FBV3BCLFlBQVgsQ0FBd0JoQixLQUF4QixFQUErQixTQUEvQixFQUEwQ0MsRUFBMUMsU0FBaUR5RyxJQUFJeUMsWUFBckQsRUFBakI7QUFDRDtBQUNELFFBQUlvRSxXQUFKLEVBQWlCO0FBQ2ZELGlCQUFXQyxXQUFYLEdBQXlCQSxXQUF6QjtBQUNEO0FBQ0QsUUFBSUMsWUFBSixFQUFrQjtBQUNoQkYsaUJBQVdFLFlBQVgsR0FBMEJBLFlBQTFCO0FBQ0Q7QUFDRCxRQUFJQyxjQUFKLEVBQW9CO0FBQ2xCSCxpQkFBV0csY0FBWCxHQUE0QkEsY0FBNUI7QUFDRDtBQUNELFdBQU9ILFVBQVA7QUFDRCxHOztPQUVEckksYyxHQUFpQixZQUFNO0FBQ3JCLFFBQUl5SSxvQkFBSjtBQUNBLFFBQUksT0FBS3RMLEtBQUwsQ0FBV2pDLFVBQVgsSUFBeUIsQ0FBQyxPQUFLeUMsaUJBQW5DLEVBQXNELE9BQU84SyxXQUFQO0FBQ3RELFFBQUksT0FBSzlLLGlCQUFULEVBQTRCO0FBQzFCLFVBQU0rSyxlQUFlLE9BQUt2TCxLQUFMLENBQVd0QixVQUFYLENBQXNCSyxJQUF0QixHQUE2QixDQUFsRDtBQUNBLFVBQUl3TSxnQkFBZ0IsQ0FBcEIsRUFBdUI7QUFDckJELHNCQUFjQyxZQUFkO0FBQ0Q7QUFDRixLQUxELE1BS087QUFDTCxVQUFJLE9BQUt2TCxLQUFMLENBQVdsQyxTQUFmLEVBQTBCO0FBQ3hCd04sc0JBQWMsT0FBS2hPLEtBQUwsQ0FBVzJDLFVBQXpCO0FBQ0QsT0FGRCxNQUVPO0FBQ0xxTCxzQkFBYyxPQUFLdEwsS0FBTCxDQUFXc0wsV0FBekIsQ0FESyxDQUNpQztBQUN2QztBQUNELFVBQUlBLGdCQUFnQjNELFNBQWhCLElBQTZCLE9BQUszSCxLQUFMLENBQVd6QixhQUFYLENBQXlCUSxJQUF6QixHQUFnQyxDQUFqRSxFQUFvRTtBQUNsRXVNLHNCQUFjLE9BQUs5QixvQkFBTCxDQUEwQixPQUFLeEosS0FBTCxDQUFXekIsYUFBWCxDQUF5QmlOLEtBQXpCLEVBQTFCLENBQWQ7QUFDRDtBQUNGO0FBQ0QsV0FBT0YsV0FBUDtBQUNELEc7O09BRURqSyxVLEdBQWEsVUFBQ29LLE9BQUQsRUFBYTtBQUN4QixRQUFJLE9BQUt6TCxLQUFMLENBQVdsQyxTQUFYLElBQXdCLE9BQUtrQyxLQUFMLENBQVdqQyxVQUF2QyxFQUFtRDtBQUNqRCxVQUFJME4sV0FBV0EsUUFBUTdMLEdBQVIsQ0FBWSxNQUFaLENBQVgsSUFBa0M2TCxZQUFZLE9BQUtDLFdBQXZELEVBQW9FO0FBQ2xFLGVBQUtELFFBQVE3TCxHQUFSLENBQVksTUFBWixDQUFMLElBQTRCLElBQTVCO0FBQ0EsZUFBSytMLGNBQUwsR0FBc0JGLFFBQVE3TCxHQUFSLENBQVksZ0JBQVosQ0FBdEI7QUFDQSxlQUFLOEwsV0FBTCxHQUFtQkQsT0FBbkI7QUFDRDtBQUNGO0FBQ0YsRzs7T0FFREcsZ0IsR0FBbUIsVUFBQ3pDLFFBQUQsRUFBVzlFLFFBQVgsRUFBcUJILFNBQXJCO0FBQUEsV0FBbUMsWUFBTTtBQUMxRCxVQUFJaUYsYUFBYSxNQUFiLElBQXVCLE9BQUtuSixLQUFMLENBQVdzSixVQUF0QyxFQUFrRDtBQUNoRCxlQUFLdEosS0FBTCxDQUFXcUosbUJBQVgsQ0FBK0IsT0FBS3JKLEtBQUwsQ0FBV3ZDLElBQTFDLEVBQWdEaEMsSUFBSTtBQUNsRDRJLDRCQURrRDtBQUVsREg7QUFGa0QsU0FBSixDQUFoRDtBQUlEO0FBQ0YsS0FQa0I7QUFBQSxHOztPQVNuQjJILG1CLEdBQXNCLFVBQUN4SCxRQUFELEVBQVdDLEdBQVg7QUFBQSxXQUFtQixVQUFDd0gsR0FBRCxFQUFTO0FBQ2hEO0FBQ0EsVUFBTTVILFlBQVkvRyxNQUFNK0gsWUFBTixDQUFtQlosR0FBbkIsQ0FBbEI7QUFDQSxVQUNFLE9BQUt0RSxLQUFMLENBQVd0QixVQUFYLENBQXNCSyxJQUF0QixJQUNBLE9BQUtpQixLQUFMLENBQVd0QixVQUFYLENBQXNCSyxJQUF0QixLQUErQnNGLFdBQVcsQ0FEMUMsSUFFQSxPQUFLN0QsaUJBRkwsSUFHQSxDQUFDLE9BQUs4Six5QkFBTCxDQUErQmpHLFFBQS9CLEVBQXlDQyxHQUF6QyxFQUE4QyxRQUE5QyxDQUpILEVBS0U7QUFDQXdILFlBQUlDLEtBQUo7QUFDQSxlQUFLdkwsaUJBQUwsR0FBeUIsS0FBekI7QUFDRDs7QUFFRCxVQUFJLE9BQUtSLEtBQUwsQ0FBV3lFLHFCQUFmLEVBQXNDO0FBQ3BDLGVBQUtsRSxjQUFMLENBQXVCLE9BQUtQLEtBQUwsQ0FBV3ZDLElBQVgsQ0FBZ0JJLEVBQXZDLFNBQTZDcUcsU0FBN0MsU0FBMERHLFFBQTFELElBQXdFeUgsR0FBeEU7QUFDRDtBQUNGLEtBaEJxQjtBQUFBLEc7O09Ba0J0QkUsaUIsR0FBb0IsVUFBQzNILFFBQUQsRUFBV0MsR0FBWDtBQUFBLFdBQW1CLFVBQUN3SCxHQUFELEVBQVM7QUFDOUMsVUFBTTVILFlBQVkvRyxNQUFNK0gsWUFBTixDQUFtQlosR0FBbkIsQ0FBbEI7QUFDQSxVQUFJLE9BQUs3RCxlQUFMLElBQXdCLENBQUMsT0FBSzZKLHlCQUFMLENBQStCakcsUUFBL0IsRUFBeUNDLEdBQXpDLEVBQThDLE1BQTlDLENBQTdCLEVBQW9GO0FBQ2xGLFlBQU0ySCxtQkFBbUIsT0FBS04sY0FBTCxJQUF1QixPQUFLM0wsS0FBTCxDQUFXeEIsSUFBWCxDQUFnQk8sSUFBaEIsR0FBdUIsQ0FBOUMsR0FDdkIsT0FBS2lCLEtBQUwsQ0FBV3hCLElBQVgsQ0FBZ0JPLElBQWhCLEdBQXVCLENBREEsR0FDSSxPQUFLeUssb0JBQUwsQ0FBMEIsT0FBS3hKLEtBQUwsQ0FBV3pCLGFBQVgsQ0FBeUJpTixLQUF6QixFQUExQixDQUQ3Qjs7QUFEa0YsWUFJMUVsTixZQUowRSxHQUl6RCxPQUFLMEIsS0FKb0QsQ0FJMUUxQixZQUowRTs7QUFLbEYsWUFBSUEsYUFBYVMsSUFBYixHQUFvQixDQUF4QixFQUEyQjtBQUN6QixjQUFJVCxhQUFhc0IsR0FBYixDQUFpQixVQUFqQixNQUFpQ3lFLFFBQWpDLElBQTZDL0YsYUFBYXNCLEdBQWIsQ0FBaUIsV0FBakIsTUFBa0NzRSxTQUFuRixFQUE4RjtBQUM1RjRILGdCQUFJQyxLQUFKO0FBQ0EsbUJBQUt0TCxlQUFMLEdBQXVCLEtBQXZCO0FBQ0EsbUJBQUtrTCxjQUFMLEdBQXNCLEtBQXRCO0FBQ0Q7QUFDRixTQU5ELE1BTU8sSUFBSU0scUJBQXFCdEUsU0FBekIsRUFBb0M7QUFDekMsaUJBQUtsSCxlQUFMLEdBQXVCLEtBQXZCO0FBQ0EsaUJBQUtrTCxjQUFMLEdBQXNCLEtBQXRCO0FBQ0QsU0FITSxNQUdBLElBQUlNLHFCQUFxQjVILFFBQXpCLEVBQW1DO0FBQ3hDeUgsY0FBSUMsS0FBSjtBQUNBLGlCQUFLdEwsZUFBTCxHQUF1QixLQUF2QjtBQUNBLGlCQUFLa0wsY0FBTCxHQUFzQixLQUF0QjtBQUNEO0FBQ0Y7QUFDRCxVQUFJLE9BQUszTCxLQUFMLENBQVd5RSxxQkFBZixFQUFzQztBQUNwQyxlQUFLbkUsUUFBTCxDQUFpQixPQUFLTixLQUFMLENBQVd2QyxJQUFYLENBQWdCSSxFQUFqQyxTQUF1Q3FHLFNBQXZDLFNBQW9ERyxRQUFwRCxJQUFrRXlILEdBQWxFO0FBQ0Q7QUFDRixLQXpCbUI7QUFBQSxHOztPQTJCcEJwRixhLEdBQWdCLFVBQUNGLFdBQUQsRUFBY25DLFFBQWQsRUFBd0I2SCxXQUF4QixFQUF3QztBQUN0RCxRQUFNQyxlQUFlLENBQUMsTUFBRCxFQUFTLFVBQVQsQ0FBckI7QUFDQSxRQUFJM0YsZUFBZTJGLGFBQWFsRyxRQUFiLENBQXNCTyxZQUFZaEIsSUFBbEMsQ0FBbkIsRUFBNEQ7QUFDMUQsVUFBSW5CLGFBQWEsQ0FBQyxDQUFkLElBQW1CNkgsZ0JBQWdCLENBQUMsQ0FBeEMsRUFBMkM7QUFDekMsZUFBS2xJLFFBQUwsQ0FBYztBQUNaOUQseUJBQWVnTSxXQURIO0FBRVpqTSxzQkFBWW9FO0FBRkEsU0FBZDtBQUlEO0FBQ0QrSCxpQkFBVyxZQUFNO0FBQ2YsWUFBSTVGLFlBQVloQixJQUFaLEtBQXFCLFVBQXpCLEVBQXFDZ0IsWUFBWXVGLEtBQVo7QUFDckMsWUFBSXZGLFlBQVloQixJQUFaLEtBQXFCLE1BQXpCLEVBQWlDZ0IsWUFBWVQsTUFBWjtBQUNsQyxPQUhELEVBR0csRUFISDtBQUlEO0FBQ0YsRzs7T0FFRHNHLCtCLEdBQWtDO0FBQUEsV0FBWSxZQUFNO0FBQ2xELGFBQUtyTSxLQUFMLENBQVdzTSxtQkFBWCxDQUErQixPQUFLdE0sS0FBTCxDQUFXdkMsSUFBMUMsRUFBZ0Q0RyxRQUFoRCxFQUEwRCxJQUExRCxFQUFnRSxLQUFoRTtBQUNELEtBRmlDO0FBQUEsRzs7T0FJbENrSSxlLEdBQWtCLFlBQU07QUFBQSxRQUNkQyxXQURjLEdBQ0UsT0FBS3hNLEtBRFAsQ0FDZHdNLFdBRGM7O0FBRXRCLFFBQU05SSxVQUFVLEVBQWhCO0FBQ0EsUUFBTStJLFdBQVd4QyxPQUFPLE9BQUtqSyxLQUFMLENBQVd5TSxRQUFsQixDQUFqQjtBQUNBLFFBQUlELFdBQUosRUFBaUI7QUFDZjlJLGNBQVFvSCxJQUFSLENBQWE7QUFDWDRCLGVBQU9GLFlBQVlFLEtBQVosSUFBcUIsRUFEakI7QUFFWEMscUJBQWEsQ0FBQyxDQUFDSCxZQUFZRyxXQUZoQjtBQUdYQyxvQkFBWSxLQUhEO0FBSVgxSSxtQkFBVyxhQUpBO0FBS1gySSxjQUFNO0FBQUEsaUJBQ0o7QUFBQTtBQUFBLGNBQUssV0FBVSw2Q0FBZjtBQUNHTCx3QkFBWU0sV0FBWixDQUF3QixPQUFLOU0sS0FBTCxDQUFXeEIsSUFBWCxDQUFnQm9CLEdBQWhCLENBQW9CeUUsUUFBcEIsQ0FBeEIsRUFBdURvSSxRQUF2RDtBQURILFdBREk7QUFBQSxTQUxLO0FBVVhNLGtCQUFVO0FBQUEsaUJBQWFQLFlBQVlPLFFBQVosR0FBdUJQLFlBQVlPLFFBQVosQ0FBcUIxSSxRQUFyQixDQUF2QixHQUF3RCxJQUFyRTtBQUFBLFNBVkM7QUFXWDJJLG9CQUFZO0FBQUEsaUJBQWFSLFlBQVlRLFVBQVosR0FBeUJSLFlBQVlRLFVBQVosQ0FBdUIzSSxRQUF2QixDQUF6QixHQUE0RCxJQUF6RTtBQUFBLFNBWEQ7QUFZWDRJLG9CQUFZO0FBQUEsaUJBQWFULFlBQVlTLFVBQVosR0FBeUJULFlBQVlTLFVBQVosQ0FBdUI1SSxRQUF2QixDQUF6QixHQUE0RCxJQUF6RTtBQUFBO0FBWkQsT0FBYjtBQWNEOztBQUVELFFBQUksT0FBS3JFLEtBQUwsQ0FBV2tOLHVCQUFmLEVBQXdDO0FBQ3RDeEosY0FBUW9ILElBQVIsQ0FBYTtBQUNYNEIsZUFBTyxFQURJO0FBRVhDLHFCQUFhLEtBRkY7QUFHWEMsb0JBQVksS0FIRDtBQUlYMUksbUJBQVcsbUJBSkE7QUFLWDJJLGNBQU0sY0FBQ3hJLFFBQUQsRUFBYztBQUNsQixjQUFNOEksVUFBVSxPQUFLbk4sS0FBTCxDQUFXeEIsSUFBWCxDQUFnQm9CLEdBQWhCLENBQW9CeUUsUUFBcEIsQ0FBaEI7QUFDQSxjQUFNK0ksU0FBU0QsUUFBUXZQLEtBQVIsQ0FBYyxPQUFLb0MsS0FBTCxDQUFXdkMsSUFBWCxDQUFnQjhMLFNBQTlCLENBQWY7QUFDQSxjQUFNOEQsV0FBVyxPQUFLck4sS0FBTCxDQUFXekIsYUFBWCxDQUF5QjBILFFBQXpCLENBQWtDbUgsTUFBbEMsQ0FBakI7QUFDQSxpQkFDRSxvQkFBQyxRQUFEO0FBQ0UsOENBQWdDLE9BQUtwTixLQUFMLENBQVd2QyxJQUFYLENBQWdCSSxFQUFoRCxTQUFzRHdHLFFBRHhEO0FBRUUsdUJBQVUsZ0RBRlo7QUFHRSxxQkFBU2dKLFFBSFg7QUFJRSxzQkFBVSxPQUFLaEIsK0JBQUwsQ0FBcUNoSSxRQUFyQyxDQUpaO0FBS0Usc0JBQVVvSTtBQUxaLFlBREY7QUFTRCxTQWxCVTtBQW1CWE0sa0JBQVU7QUFBQSxpQkFBTSxJQUFOO0FBQUEsU0FuQkM7QUFvQlhDLG9CQUFZO0FBQUEsaUJBQU0sSUFBTjtBQUFBLFNBcEJEO0FBcUJYQyxvQkFBWTtBQUFBLGlCQUFNLElBQU47QUFBQTtBQXJCRCxPQUFiO0FBdUJEOztBQUVELFFBQU03TyxpQkFBaUIsRUFBdkI7QUFDQSxXQUFLNEIsS0FBTCxDQUFXNUIsY0FBWCxDQUEwQmtQLE9BQTFCLENBQWtDLFVBQUNDLGdCQUFELEVBQXNCO0FBQ3RELGFBQUt2TixLQUFMLENBQVcwRCxPQUFYLENBQW1CNEosT0FBbkIsQ0FBMkIsVUFBQ0UsTUFBRCxFQUFZO0FBQ3JDLFlBQUlyUSxNQUFNK0gsWUFBTixDQUFtQnNJLE1BQW5CLE1BQStCRCxnQkFBbkMsRUFBcUQ7QUFDbkRuUCx5QkFBZTBNLElBQWYsQ0FBb0IwQyxNQUFwQjtBQUNEO0FBQ0YsT0FKRDtBQUtELEtBTkQ7QUFPQXBQLG1CQUFla1AsT0FBZixDQUF1QixVQUFDaEosR0FBRCxFQUFTO0FBQUEsb0JBWTFCLE9BQUt0RSxLQVpxQjtBQUFBLFVBRTVCeEIsSUFGNEIsV0FFNUJBLElBRjRCO0FBQUEsVUFHNUJhLFVBSDRCLFdBRzVCQSxVQUg0QjtBQUFBLFVBSTVCRSxpQkFKNEIsV0FJNUJBLGlCQUo0QjtBQUFBLFVBSzVCRSxnQkFMNEIsV0FLNUJBLGdCQUw0QjtBQUFBLFVBTTVCaEMsSUFONEIsV0FNNUJBLElBTjRCO0FBQUEsVUFPNUJ5RCxVQVA0QixXQU81QkEsVUFQNEI7QUFBQSxVQVE1Qk8sU0FSNEIsV0FRNUJBLFNBUjRCO0FBQUEsVUFTNUJ0QyxNQVQ0QixXQVM1QkEsTUFUNEI7QUFBQSxVQVU1QnNPLElBVjRCLFdBVTVCQSxJQVY0QjtBQUFBLFVBVzVCM0Qsc0JBWDRCLFdBVzVCQSxzQkFYNEI7OztBQWM5QixVQUFNNEQsb0JBQW9CdlEsTUFBTXdRLG9CQUFOLENBQTJCckosR0FBM0IsQ0FBMUI7QUFDQTtBQUNBLFVBQU13SSxjQUFjLFNBQWRBLFdBQWMsQ0FBQ3pJLFFBQUQsRUFBV3VKLE1BQVgsRUFBc0I7QUFDeEMsWUFBTXhELE1BQU01TCxLQUFLWixLQUFMLEVBQVl5RyxRQUFaLFNBQXlCQyxJQUFJeUMsWUFBN0IsRUFBWjtBQUNBLFlBQUkyRyxrQkFBa0J0RCxHQUFsQixDQUFKLEVBQTRCO0FBQzFCLGlCQUFPOUYsSUFBSXVKLFVBQUosR0FBaUIsb0JBQUMsQ0FBRCxJQUFHLElBQUcscUJBQU4sR0FBakIsR0FBa0QsRUFBekQ7QUFDRDtBQUNELGVBQU9ELFNBQVNBLE9BQU94RCxHQUFQLENBQVQsR0FBdUJBLEdBQTlCO0FBQ0QsT0FORDs7QUFRQSxVQUFJMEQsU0FBUzFRLGtCQUFrQjJRLFVBQWxCLENBQTZCekosR0FBN0IsQ0FBYjtBQUNBO0FBQ0EsVUFBTTBKLGtCQUFrQjtBQUN0QkMsY0FBTTtBQUNKQyx3QkFBYyxPQUFLbkYsZ0JBRGY7QUFFSm9GLDZCQUFtQixPQUFLNUYscUJBRnBCO0FBR0o2RixzQkFBWSxPQUFLcEYsY0FIYjtBQUlKRSx1QkFBYSxPQUFLQSxXQUpkO0FBS0o5RSx5QkFBZSxPQUFLZ0QsaUJBTGhCO0FBTUppSCx5QkFBZSxPQUFLckM7QUFOaEIsU0FEZ0I7QUFTdEJ4SCxnQkFBUTtBQUNOMEosd0JBQWMsT0FBSy9ELGtCQURiO0FBRU5nRSw2QkFBbUIsT0FBS3RHLHVCQUZsQjtBQUdOdUcsc0JBQVksT0FBS3ZGLGdCQUhYO0FBSU5LLHVCQUFhLE9BQUtBLFdBSlo7QUFLTjlFLHlCQUFlLE9BQUtpRCxtQkFMZDtBQU1OZ0gseUJBQWUsT0FBS3hDO0FBTmQsU0FUYztBQWlCdEJ5QyxnQkFBUTtBQUNOSix3QkFBYyxPQUFLN0Qsa0JBRGI7QUFFTjhELDZCQUFtQixPQUFLN0c7QUFGbEI7QUFqQmMsT0FBeEI7O0FBdUJBO0FBQ0EsVUFBTWlILFlBQVk7QUFDaEIvUCxrQkFEZ0I7QUFFaEJhLDhCQUZnQjtBQUdoQkUsNENBSGdCO0FBSWhCRTtBQUpnQixPQUFsQixDQWxEOEIsQ0F1RDNCO0FBQ0hxTyxlQUFTMVEsa0JBQWtCb1IsVUFBbEIsQ0FBNkJWLE1BQTdCLEVBQXFDUyxTQUFyQyxFQUFnRGpLLEdBQWhELEVBQXFEd0ksV0FBckQsQ0FBVDs7QUFFQTtBQUNBLFVBQU0yQixrQ0FDREYsU0FEQztBQUVKOVEsa0JBRkk7QUFHSnlELDhCQUhJO0FBSUpPLDRCQUpJO0FBS0p0QyxzQkFMSTtBQU1Kc08sa0JBTkk7QUFPSjNEO0FBUEksUUFBTixDQTNEOEIsQ0FtRTNCO0FBQ0hnRSxlQUFTMVEsa0JBQWtCc1IsbUJBQWxCLENBQ1BaLE1BRE8sRUFFUHJCLFFBRk8sRUFHUGdDLGtCQUhPLEVBSVBuSyxHQUpPLEVBS1AwSixlQUxPLEVBTVAsT0FBSzFELHlCQU5FLENBQVQ7O0FBU0E1RyxjQUFRb0gsSUFBUixDQUFhZ0QsTUFBYjtBQUNELEtBOUVEOztBQWdGQSxRQUFJLE9BQUs5TixLQUFMLENBQVdqQyxVQUFmLEVBQTJCO0FBQ3pCMkYsY0FBUW9ILElBQVIsQ0FBYTtBQUNYNEIsZUFBTyxFQURJO0FBRVhDLHFCQUFhLEtBRkY7QUFHWHpJLG1CQUFXLGVBSEE7QUFJWDJJLGNBQU07QUFBQSxpQkFBTSxJQUFOO0FBQUEsU0FKSztBQUtYRSxrQkFBVTtBQUFBLGlCQUFNLElBQU47QUFBQSxTQUxDO0FBTVhDLG9CQUFZO0FBQUEsaUJBQ1Ysb0JBQUMsSUFBRDtBQUNFLGlEQUFtQyxPQUFLaE4sS0FBTCxDQUFXdkMsSUFBWCxDQUFnQkksRUFBbkQsU0FBeUR3RyxRQUQzRDtBQUVFLGtCQUFLLFdBRlA7QUFHRSxrQkFBSyxRQUhQO0FBSUUsbUJBQU8sRUFKVDtBQUtFLG9CQUFRLEVBTFY7QUFNRSxtQkFBTyxFQUFFc0ssU0FBUyxLQUFYLEVBTlQ7QUFPRSxxQkFBUztBQUFBLHFCQUFNLE9BQUszTyxLQUFMLENBQVc0TyxhQUFYLENBQXlCLE9BQUs1TyxLQUFMLENBQVd2QyxJQUFwQyxFQUEwQzRHLFFBQTFDLENBQU47QUFBQTtBQVBYLFlBRFU7QUFBQSxTQU5EO0FBaUJYNEksb0JBQVk7QUFBQSxpQkFBTSxJQUFOO0FBQUE7QUFqQkQsT0FBYjtBQW1CRDtBQUNELFdBQU92SixPQUFQO0FBQ0QsRzs7T0FFRG1MLFksR0FBZSxVQUFDeEssUUFBRCxFQUFXQyxHQUFYLEVBQWdCNkUsUUFBaEIsRUFBNkI7QUFDMUMsUUFBSUEsYUFBYSxNQUFqQixFQUF5QjtBQUN2QixhQUFPLEtBQVA7QUFDRDtBQUNELFFBQU10TCxLQUFLLE9BQUs0SyxtQkFBTCxDQUF5QnBFLFFBQXpCLENBQVg7QUFDQSxXQUFPLENBQUMsQ0FBQyxPQUFLckUsS0FBTCxDQUFXdkIsUUFBWCxDQUFvQmIsS0FBcEIsRUFBMkJDLEVBQTNCLFNBQWtDeUcsSUFBSXlDLFlBQXRDLEVBQVQ7QUFDRCxHOztPQUVEbEYsa0IsR0FBcUIsWUFBTTtBQUN6QixXQUFLckIsaUJBQUwsR0FBeUIsSUFBekI7QUFDRCxHOztPQUVEc0Isb0IsR0FBdUIsWUFBTTtBQUMzQixRQUFJLE9BQUs5QixLQUFMLENBQVd6QixhQUFYLENBQXlCUSxJQUE3QixFQUFtQztBQUNqQyxhQUFLMEIsZUFBTCxHQUF1QixJQUF2QjtBQUNBLGFBQUt1RCxRQUFMLENBQWM7QUFDWi9ELG9CQUFZMEg7QUFEQSxPQUFkO0FBR0Q7QUFDRixHOztPQUVENUYsMEIsR0FBNkIsWUFBTTtBQUNqQyxXQUFLckIsZ0JBQUwsR0FBd0IsSUFBeEI7QUFDRCxHOztPQUVEZ0MsYyxHQUFpQixVQUFDNkIsQ0FBRCxFQUFJRixRQUFKLEVBQWlCO0FBQ2hDLFFBQUksT0FBS3JFLEtBQUwsQ0FBVzhPLFNBQVgsSUFBd0IsQ0FBQyxPQUFLOU8sS0FBTCxDQUFXakMsVUFBcEMsSUFBa0QsQ0FBQyxPQUFLaUMsS0FBTCxDQUFXbEMsU0FBbEUsRUFBNkU7QUFDM0UsVUFBSXlHLEVBQUV3SyxPQUFGLElBQWF4SyxFQUFFNEMsUUFBbkIsRUFBNkI7QUFDM0J2RyxpQkFBU29PLFlBQVQsR0FDR0MsZUFESDtBQUVEO0FBQ0Q7QUFDQTtBQU4yRSxVQU9uRUMsVUFQbUUsR0FPcEQzSyxFQUFFbUQsTUFQa0QsQ0FPbkV3SCxVQVBtRTs7QUFRM0UsVUFBTUMsZUFBZUQsV0FBVzlOLFNBQVgsSUFBd0I4TixXQUFXOU4sU0FBWCxDQUFxQjJKLE9BQTdDLEdBQ2pCbUUsV0FBVzlOLFNBRE0sR0FFakIsRUFGSjtBQUdBLFVBQU1nTyxlQUFlRixXQUFXQSxVQUFYLENBQXNCOU4sU0FBdEIsSUFBbUM4TixXQUFXQSxVQUFYLENBQXNCOU4sU0FBdEIsQ0FBZ0MySixPQUFuRSxDQUEyRTtBQUEzRSxRQUNqQm1FLFdBQVdBLFVBQVgsQ0FBc0I5TixTQURMLEdBRWpCLEVBRko7QUFHQSxVQUFNaU8sZUFBZUgsV0FBV0EsVUFBWCxDQUFzQkEsVUFBdEIsQ0FBaUM5TixTQUFqQyxJQUE4QzhOLFdBQVdBLFVBQVgsQ0FBc0JBLFVBQXRCLENBQWlDOU4sU0FBakMsQ0FBMkMySixPQUF6RixDQUFpRztBQUFqRyxRQUNqQm1FLFdBQVdBLFVBQVgsQ0FBc0JBLFVBQXRCLENBQWlDOU4sU0FEaEIsR0FFakIsRUFGSjtBQUdBLFVBQU1rTyxlQUFlSixXQUFXQSxVQUFYLENBQXNCQSxVQUF0QixDQUFpQ0EsVUFBakMsQ0FBNEM5TixTQUE1QyxJQUF5RDhOLFdBQVdBLFVBQVgsQ0FBc0JBLFVBQXRCLENBQWlDQSxVQUFqQyxDQUE0QzlOLFNBQTVDLENBQXNEMkosT0FBL0csQ0FBdUg7QUFBdkgsUUFDakJtRSxXQUFXQSxVQUFYLENBQXNCQSxVQUF0QixDQUFpQ0EsVUFBakMsQ0FBNEM5TixTQUQzQixHQUVqQixFQUZKO0FBR0EsVUFDRStOLGFBQWFwRSxPQUFiLENBQXFCLGVBQXJCLE1BQTBDLENBQUMsQ0FBM0MsSUFDQXFFLGFBQWFyRSxPQUFiLENBQXFCLGVBQXJCLE1BQTBDLENBQUMsQ0FEM0MsSUFFQXNFLGFBQWF0RSxPQUFiLENBQXFCLGVBQXJCLE1BQTBDLENBQUMsQ0FGM0MsSUFHQXVFLGFBQWF2RSxPQUFiLENBQXFCLGVBQXJCLE1BQTBDLENBQUMsQ0FKN0MsRUFLRTtBQUNBLGVBQUsvSyxLQUFMLENBQVdzTSxtQkFBWCxDQUNFLE9BQUt0TSxLQUFMLENBQVd2QyxJQURiLEVBRUU0RyxRQUZGLEVBR0UsT0FBS3JFLEtBQUwsQ0FBV3VQLFdBQVgsSUFBMEJoTCxFQUFFd0ssT0FIOUIsRUFJRSxPQUFLL08sS0FBTCxDQUFXdVAsV0FBWCxJQUEwQmhMLEVBQUU0QyxRQUo5QjtBQU1EO0FBQ0Y7QUFDRCxRQUFJLE9BQUtuSCxLQUFMLENBQVd3UCxVQUFmLEVBQTJCO0FBQ3pCLGFBQUt4UCxLQUFMLENBQVd3UCxVQUFYLENBQXNCakwsQ0FBdEIsRUFBeUJGLFFBQXpCLEVBQW1DLE9BQUtyRSxLQUFMLENBQVd4QixJQUFYLENBQWdCb0IsR0FBaEIsQ0FBb0J5RSxRQUFwQixDQUFuQztBQUNEO0FBQ0QsV0FBTyxJQUFQO0FBQ0QsRzs7T0FFRGIsaUIsR0FBb0IsVUFBQ2UsQ0FBRCxFQUFJRixRQUFKLEVBQWlCO0FBQ25DLFFBQUksT0FBS3JFLEtBQUwsQ0FBVytELGdCQUFmLEVBQWlDO0FBQUEsb0JBTTNCLE9BQUsvRCxLQU5zQjtBQUFBLFVBRTdCc00sbUJBRjZCLFdBRTdCQSxtQkFGNkI7QUFBQSxVQUc3Qi9OLGFBSDZCLFdBRzdCQSxhQUg2QjtBQUFBLFVBSTdCZCxJQUo2QixXQUk3QkEsSUFKNkI7QUFBQSxVQUs3QmUsSUFMNkIsV0FLN0JBLElBTDZCOztBQU8vQitGLFFBQUU0QixjQUFGO0FBQ0E1QixRQUFFa0wsZUFBRjtBQUNBLGFBQUt6TCxRQUFMLENBQWM7QUFDWjdELHlCQUFpQixJQURMO0FBRVpDLHNCQUFjbUUsRUFBRW1MLE9BRko7QUFHWnJQLHNCQUFja0UsRUFBRW9MO0FBSEosT0FBZDtBQUtBO0FBQ0EsVUFBSSxDQUFDcFIsY0FBYzBILFFBQWQsQ0FBdUJ6SCxLQUFLWixLQUFMLEVBQVl5RyxRQUFaLFNBQXlCNUcsS0FBSzhMLFNBQTlCLEVBQXZCLENBQUwsRUFBd0U7QUFDdEUrQyw0QkFBb0I3TyxJQUFwQixFQUEwQjRHLFFBQTFCO0FBQ0Q7QUFDRHpELGVBQVNnUCxnQkFBVCxDQUEwQixPQUExQixFQUFtQyxPQUFLOU8sZUFBeEM7QUFDQSxhQUFPLEtBQVA7QUFDRDtBQUNELFdBQU8sSUFBUDtBQUNELEc7O09BRUQrTywwQixHQUE2QixVQUFDQyxPQUFELEVBQVV2UixhQUFWLEVBQXlCd1IsWUFBekI7QUFBQSxXQUEwQyxZQUFNO0FBQzNFRCxjQUFRdlIsYUFBUixFQUF1QndSLFlBQXZCO0FBQ0QsS0FGNEI7QUFBQSxHOztPQUk3QnpNLHFCLEdBQXdCO0FBQUEsV0FDdEIsT0FBS3RELEtBQUwsQ0FBV3FELGVBQVgsQ0FBMkIsT0FBS3JELEtBQUwsQ0FBV3hCLElBQVgsQ0FBZ0JvQixHQUFoQixDQUFvQnlFLFFBQXBCLENBQTNCLEVBQTBEQSxRQUExRCxDQURzQjtBQUFBLEc7O09BR3hCMkwsVSxHQUFhO0FBQUEsV0FBTyxVQUFDekIsU0FBRCxFQUFlO0FBQUEsb0JBTzdCLE9BQUt2TyxLQVB3QjtBQUFBLFVBRS9CakMsVUFGK0IsV0FFL0JBLFVBRitCO0FBQUEsVUFHL0JELFNBSCtCLFdBRy9CQSxTQUgrQjtBQUFBLFVBSS9CWSxVQUorQixXQUkvQkEsVUFKK0I7QUFBQSxVQUsvQkosWUFMK0IsV0FLL0JBLFlBTCtCO0FBQUEsVUFNL0JiLElBTitCLFdBTS9CQSxJQU4rQjs7QUFBQSxVQVF6QjRHLFFBUnlCLEdBUUZrSyxTQVJFLENBUXpCbEssUUFSeUI7QUFBQSxVQVFackUsS0FSWSw0QkFRRnVPLFNBUkU7O0FBU2pDLFVBQUkxQixhQUFKO0FBQ0EsVUFBSTFELFdBQVcsTUFBZjtBQUNBLFVBQUkwQixnQkFBZ0IsQ0FBcEIsQ0FYaUMsQ0FXVjtBQUN2QixVQUFJOU0sVUFBSixFQUFnQjhNLGdCQUFnQm5NLFdBQVdLLElBQTNCO0FBQ2hCLFVBQUloQixVQUFKLEVBQWdCO0FBQ2QsWUFBSXNHLFlBQWF3RyxnQkFBZ0IsQ0FBakMsRUFBcUM7QUFDbkMsY0FBSXZHLElBQUkwSSxVQUFSLEVBQW9CO0FBQ2xCSCxtQkFBT3ZJLElBQUkwSSxVQUFKLENBQWUzSSxRQUFmLENBQVA7QUFDQThFLHVCQUFXLFFBQVg7QUFDRCxXQUhELE1BR087QUFDTDBELG1CQUFPLElBQVA7QUFDQTFELHVCQUFXLElBQVg7QUFDRDtBQUNGLFNBUkQsTUFRTztBQUNMMEQsaUJBQU92SSxJQUFJdUksSUFBSixDQUFTeEksV0FBV3dHLGFBQXBCLENBQVA7QUFDRDtBQUNGLE9BWkQsTUFZTyxJQUFJL00sYUFBYXdHLElBQUl5SSxRQUFyQixFQUErQjtBQUNwQ0YsZUFBT3ZJLElBQUl5SSxRQUFKLENBQWExSSxXQUFXd0csYUFBeEIsQ0FBUDtBQUNBMUIsbUJBQVcsTUFBWDtBQUNELE9BSE0sTUFHQTtBQUNMMEQsZUFBT3ZJLElBQUl1SSxJQUFKLENBQVN4SSxXQUFXd0csYUFBcEIsQ0FBUDtBQUNEO0FBQ0QsVUFBTW9GLFlBQVlqUSxNQUFNa0UsU0FBTixLQUFvQixtQkFBcEIsSUFBMkNsRSxNQUFNa0UsU0FBTixLQUFvQixhQUFqRjtBQUNBLFVBQUksQ0FBQ2lGLGFBQWEsTUFBYixJQUF1QkEsYUFBYSxNQUFwQyxJQUE4Q0EsYUFBYSxRQUE1RCxLQUF5RSxDQUFDOEcsU0FBOUUsRUFBeUY7QUFDdkYsWUFBTUMsY0FBZS9HLGFBQWEsUUFBZCxHQUEwQjlFLFFBQTFCLEdBQXNDQSxXQUFXd0csYUFBckU7QUFDQSxZQUFNc0YsY0FBYyxPQUFLbEYsZUFBTCxDQUFxQmlGLFdBQXJCLEVBQWtDNUwsR0FBbEMsRUFBdUM2RSxRQUF2QyxDQUFwQjtBQUNBLFlBQU1pSCxXQUFXLE9BQUt2QixZQUFMLENBQWtCcUIsV0FBbEIsRUFBK0I1TCxHQUEvQixFQUFvQzZFLFFBQXBDLENBQWpCO0FBQ0EsWUFBTS9ILFlBQWE5QyxhQUFhc0IsR0FBYixDQUFpQixVQUFqQixNQUFpQ3lFLFFBQWpDLElBQTZDL0YsYUFBYXNCLEdBQWIsQ0FBaUIsV0FBakIsTUFBa0NJLE1BQU1rRSxTQUF0RixHQUNoQiw4QkFEZ0IsR0FDaUIsa0JBRG5DO0FBRUEsZUFDRTtBQUFDLGNBQUQ7QUFBQSx1QkFDTWxFLEtBRE47QUFFRSx1QkFBV29CLFNBRmI7QUFHRSxtQkFBT2tELElBQUkrTCxLQUhiO0FBSUUscUJBQVMsT0FBS3pFLGdCQUFMLENBQXNCekMsUUFBdEIsRUFBZ0M5RSxRQUFoQyxFQUEwQ3JFLE1BQU1rRSxTQUFoRDtBQUpYO0FBTUU7QUFBQyx1QkFBRDtBQUFBO0FBQ0Usc0NBQXNCekcsS0FBS0ksRUFBM0IsU0FBaUNtQyxNQUFNa0UsU0FBdkMsU0FBb0RHLFFBRHREO0FBRUUsd0JBQVUrTCxRQUZaO0FBR0UsdUJBQVMsQ0FBQyxDQUFDRCxZQUFZL0UsWUFIekI7QUFJRSx5QkFBVyxDQUFDLENBQUMrRSxZQUFZOUUsY0FKM0I7QUFLRSwyQkFBYThFLFlBQVloRixXQUwzQjtBQU1FLDRCQUFjZ0YsWUFBWS9FLFlBTjVCO0FBT0UsOEJBQWdCK0UsWUFBWTlFO0FBUDlCO0FBU0d3QjtBQVRIO0FBTkYsU0FERjtBQW9CRDtBQUNELGFBQ0U7QUFBQyxZQUFEO0FBQUEscUJBQVU3TSxLQUFWLElBQWlCLFdBQVUsa0JBQTNCLEVBQThDLE9BQU9zRSxJQUFJK0wsS0FBekQ7QUFBaUV4RDtBQUFqRSxPQURGO0FBR0QsS0E5RFk7QUFBQSxHOztPQWdFYnBKLGEsR0FBZ0IsWUFBTTtBQUNwQixRQUFJLENBQUMsT0FBS3pELEtBQUwsQ0FBV2xCLFdBQVosSUFBMkIsQ0FBQyxPQUFLa0IsS0FBTCxDQUFXdEMsTUFBdkMsSUFBaUQsQ0FBQyxPQUFLc0MsS0FBTCxDQUFXakMsVUFBakUsRUFBNkU7QUFDM0UsYUFDRSxvQkFBQyxNQUFEO0FBQ0UsbUJBQVUsaUJBRFo7QUFFRSxnQkFBUTtBQUFDLGNBQUQ7QUFBQSxZQUFNLE9BQU8sRUFBRXVTLFdBQVcsUUFBYixFQUFiO0FBQXNDLDhCQUFDLENBQUQsSUFBRyxJQUFHLGNBQU47QUFBdEMsU0FGVjtBQUdFLGVBQU8sRUFIVDtBQUlFLHFCQUFhLEtBSmY7QUFLRSxrQkFBVTtBQUxaLFFBREY7QUFTRDtBQUNELFFBQUksQ0FBQyxPQUFLdFEsS0FBTCxDQUFXNUIsY0FBWCxDQUEwQlcsSUFBL0IsRUFBcUM7QUFDbkMsVUFBSSxPQUFLaUIsS0FBTCxDQUFXdEMsTUFBZixFQUF1QjtBQUNyQixlQUNFLG9CQUFDLE1BQUQ7QUFDRSxxQkFBVSxpQkFEWjtBQUVFLGtCQUFRO0FBQUMsZ0JBQUQ7QUFBQTtBQUFBO0FBQUEsV0FGVjtBQUdFLGlCQUFPLEVBSFQ7QUFJRSx1QkFBYSxLQUpmO0FBS0Usb0JBQVU7QUFMWixVQURGO0FBU0Q7QUFDRCxhQUNFLG9CQUFDLE1BQUQ7QUFDRSxtQkFBVSxpQkFEWjtBQUVFLGdCQUFRO0FBQUMsY0FBRDtBQUFBLFlBQU0sT0FBTyxFQUFFNFMsV0FBVyxRQUFiLEVBQWI7QUFBc0MsOEJBQUMsQ0FBRCxJQUFHLElBQUcsZ0JBQU47QUFBdEMsU0FGVjtBQUdFLGVBQU8sRUFIVDtBQUlFLHFCQUFhLEtBSmY7QUFLRSxrQkFBVTtBQUxaLFFBREY7QUFTRDtBQUNELFFBQU01TSxVQUFVLE9BQUs2SSxlQUFMLEVBQWhCO0FBQ0EsUUFBSTdJLFFBQVE2TSxNQUFSLEtBQW1CLENBQXZCLEVBQTBCLE9BQU8sSUFBUDtBQUMxQixXQUFPN00sUUFBUThNLEdBQVIsQ0FBWTtBQUFBLGFBQ2pCLG9CQUFDLE1BQUQ7QUFDRSxhQUFLbE0sSUFBSUosU0FEWDtBQUVFLG1CQUFXSSxJQUFJSixTQUZqQjtBQUdFLGdCQUNFO0FBQUMsb0JBQUQ7QUFBQTtBQUNFLHNDQUF3QixPQUFLbEUsS0FBTCxDQUFXdkMsSUFBWCxDQUFnQkksRUFBeEMsU0FBOEN5RyxJQUFJSixTQURwRDtBQUVFLGtCQUFNLE9BQUtsRSxLQUFMLENBQVd2QyxJQUZuQjtBQUdFLHFCQUFTLE9BQUt1QyxLQUFMLENBQVcwRCxPQUh0QjtBQUlFLG9CQUFRWSxHQUpWO0FBS0UsK0JBQW1CLE9BQUt0RSxLQUFMLENBQVc5QixVQUxoQztBQU1FLDhCQUFrQixPQUFLOEIsS0FBTCxDQUFXN0IsU0FOL0I7QUFPRSwwQkFBYyxPQUFLNkIsS0FBTCxDQUFXeVEsVUFQM0I7QUFRRSxvQkFBUSxPQUFLelEsS0FBTCxDQUFXdEMsTUFSckI7QUFTRSx1QkFBVyxPQUFLc0MsS0FBTCxDQUFXaEM7QUFUeEI7QUFXR3NHLGNBQUlvTTtBQVhQLFNBSko7QUFrQkUsY0FBTSxPQUFLVixVQUFMLENBQWdCMUwsR0FBaEIsQ0FsQlI7QUFtQkUsZUFBTyxPQUFLdEUsS0FBTCxDQUFXM0IsWUFBWCxDQUF3QnVCLEdBQXhCLENBQTRCMEUsSUFBSUosU0FBaEMsRUFBMkNJLElBQUlvSSxLQUEvQyxDQW5CVDtBQW9CRSxrQkFBVXBJLElBQUlxTSxRQXBCaEI7QUFxQkUsa0JBQVVyTSxJQUFJc00sUUFyQmhCO0FBc0JFLHFCQUFhdE0sSUFBSXFJLFdBdEJuQjtBQXVCRSxrQkFBVXJJLElBQUl1TSxRQUFKLEdBQWV2TSxJQUFJdU0sUUFBbkIsR0FBOEIsQ0F2QjFDO0FBd0JFLGVBQU92TSxJQUFJd00sS0F4QmI7QUF5QkUsNkJBQXFCeE0sSUFBSXlNO0FBekIzQixRQURpQjtBQUFBLEtBQVosQ0FBUDtBQTRCRCxHOztPQUVEMU8saUIsR0FBb0IsWUFBTTtBQUFBLGtCQU1wQixPQUFLckMsS0FOZTtBQUFBLFFBRXRCK0QsZ0JBRnNCLFdBRXRCQSxnQkFGc0I7QUFBQSxRQUd0QnZGLElBSHNCLFdBR3RCQSxJQUhzQjtBQUFBLFFBSXRCZixJQUpzQixXQUl0QkEsSUFKc0I7QUFBQSxRQUt0QmMsYUFMc0IsV0FLdEJBLGFBTHNCO0FBQUEsaUJBVXBCLE9BQUtqQixLQVZlO0FBQUEsUUFRdEI4QyxZQVJzQixVQVF0QkEsWUFSc0I7QUFBQSxRQVN0QkMsWUFUc0IsVUFTdEJBLFlBVHNCOztBQVd4QixRQUFNZ1EsUUFBUTtBQUNaVyxlQUFTLE9BREc7QUFFWkMsY0FBUSxLQUZJO0FBR1pDLGdCQUFVLFVBSEU7QUFJWkMsV0FBUTlRLFlBQVIsT0FKWTtBQUtaK1EsWUFBU2hSLFlBQVQ7QUFMWSxLQUFkO0FBT0EsUUFBTTJQLGVBQWV2UixLQUFLOFAsTUFBTCxDQUFZO0FBQUEsYUFBSy9QLGNBQWMwSCxRQUFkLENBQXVCb0wsRUFBRXpULEtBQUYsQ0FBUUgsS0FBSzhMLFNBQWIsQ0FBdkIsQ0FBTDtBQUFBLEtBQVosQ0FBckI7QUFDQSxXQUNFO0FBQUE7QUFBQSxRQUFJLFdBQVUsNkNBQWQsRUFBNEQsT0FBTzhHLEtBQW5FO0FBQ0d0TSwwQkFBb0JBLGlCQUFpQnlNLEdBQXJDLElBQTRDek0saUJBQWlCeU0sR0FBakIsQ0FBcUIsVUFBQ2MsSUFBRCxFQUFPbk0sQ0FBUCxFQUFhO0FBQUEsWUFDdkU4QixRQUR1RSxHQUMxRHFLLElBRDBELENBQ3ZFckssUUFEdUU7O0FBRTdFLFlBQUksT0FBT3FLLEtBQUtySyxRQUFaLEtBQXlCLFVBQTdCLEVBQXlDO0FBQ3ZDQSxxQkFBV3FLLEtBQUtySyxRQUFMLENBQWMxSSxhQUFkLEVBQTZCd1IsWUFBN0IsQ0FBWDtBQUNEO0FBQ0QsZUFDRTtBQUFDLGtCQUFEO0FBQUE7QUFDRSxpQkFBSzVLLENBRFAsQ0FDVTtBQURWLGNBRUUsUUFBUW1NLEtBQUtaLE1BRmY7QUFHRSxxQkFBU1ksS0FBS0MsT0FIaEI7QUFJRSxzQkFBVXRLLFFBSlo7QUFLRSxtQkFBT3FLLEtBQUtFLEtBTGQ7QUFNRSxxQkFBVXZLLFlBQVksQ0FBQ3FLLEtBQUt4QixPQUFuQixHQUE4QixJQUE5QixHQUFxQyxPQUFLRCwwQkFBTCxDQUM1Q3lCLEtBQUt4QixPQUR1QyxFQUU1Q3ZSLGFBRjRDLEVBRzVDd1IsWUFINEM7QUFOaEQ7QUFZR3VCLGVBQUsxTDtBQVpSLFNBREY7QUFnQkQsT0FyQjRDO0FBRC9DLEtBREY7QUEwQkQsRzs7OztBQXdISCxlQUFlN0YsUUFBZiIsImZpbGUiOiJkYXRhZ3JpZC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1sb25lbHktaWYsIHByZWZlci10ZW1wbGF0ZSwgcmVhY3QvcmVxdWlyZS1kZWZhdWx0LXByb3BzICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTWFwLCBMaXN0IH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge1xuICBpbmplY3RJbnRsLFxuICBGb3JtYXR0ZWRNZXNzYWdlIGFzIE0sXG59IGZyb20gJ3JlYWN0LWludGwnO1xuaW1wb3J0IHsgQ29sdW1uLCBDZWxsIH0gZnJvbSAnZml4ZWQtZGF0YS10YWJsZS0yJztcbmltcG9ydCB7IE1lbnVJdGVtIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHsgSWNvbiB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWljb25zJztcbmltcG9ydCBTcGlubmVyIGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXNwaW5uZXInO1xuaW1wb3J0IENoZWNrYm94IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWNoZWNrYm94JztcbmltcG9ydCAnZml4ZWQtZGF0YS10YWJsZS0yL2Rpc3QvZml4ZWQtZGF0YS10YWJsZS5jc3MnO1xuXG5pbXBvcnQgUmVzcG9uc2l2ZUZpeGVkRGF0YVRhYmxlIGZyb20gJy4vcmVzcG9uc2l2ZS1maXhlZC1kYXRhLXRhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgSGVhZGVyQ2VsbCBmcm9tICcuL2hlYWRlci1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgQWN0aW9uQmFyIGZyb20gJy4vYWN0aW9uLWJhci5jb21wb25lbnQnO1xuaW1wb3J0IElubGluZUVkaXRDb250cm9scyBmcm9tICcuL2lubGluZS1lZGl0LWNvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgRmlsdGVyaW5nQ29udHJvbHMgZnJvbSAnLi9maWx0ZXJpbmctY29udHJvbHMuY29tcG9uZW50JztcbmltcG9ydCBEcm9wZG93bkNvbnRyb2xzIGZyb20gJy4vZHJvcGRvd24tY29udHJvbHMuY29tcG9uZW50JztcbmltcG9ydCAqIGFzIGRhdGFncmlkQWN0aW9ucyBmcm9tICcuL2RhdGFncmlkLmFjdGlvbnMnO1xuaW1wb3J0IENlbGxUb29sdGlwIGZyb20gJy4vY2VsbC10b29sdGlwLmNvbXBvbmVudCc7XG5pbXBvcnQgQ29sdW1uU2V0dGluZ3NNb2RhbCBmcm9tICcuL2NvbHVtbi1zZXR0aW5ncy9jb2x1bW4tc2V0dGluZ3MuY29tcG9uZW50JztcbmltcG9ydCB7IHByb3BUeXBlcywgZGVmYXVsdFByb3BzIH0gZnJvbSAnLi9kYXRhZ3JpZC5wcm9wcyc7XG5pbXBvcnQgeyBLRVlfQ09ERVMgfSBmcm9tICcuL2RhdGFncmlkLmNvbnN0YW50cyc7XG5pbXBvcnQgcGFnaW5hdGlvbiBmcm9tICcuL3BhZ2luYXRpb24uY29tcG9uZW50JztcbmltcG9ydCBVdGlscyBmcm9tICcuL2RhdGFncmlkLnV0aWxzJztcbmltcG9ydCBHcmlkQ29sdW1uU2VydmljZSBmcm9tICcuL2NvbHVtbi1zZXJ2aWNlL2NvbHVtbi1zZXJ2aWNlJztcbmltcG9ydCAnLi9kYXRhZ3JpZC5jb21wb25lbnQuc2Nzcyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSwgb3duUHJvcHMpID0+IHtcbiAgY29uc3QgR1JJRCA9IG93blByb3BzLmdyaWQ7XG4gIHJldHVybiB7XG4gICAgaXNCdXN5OiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnaXNCdXN5J10sIHRydWUpLFxuICAgIGlzRWRpdGluZzogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2lzRWRpdGluZyddLCBmYWxzZSksXG4gICAgaXNDcmVhdGluZzogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2lzQ3JlYXRpbmcnXSwgZmFsc2UpLFxuICAgIGlzRmlsdGVyaW5nOlxuICAgICAgc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdpc0ZpbHRlcmluZyddLCBmYWxzZSksXG4gICAgaXNDb2x1bW5TZXR0aW5nc01vZGFsT3BlbjpcbiAgICAgIHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdjb2x1bW5TZXR0aW5nc01vZGFsJywgJ29wZW4nXSwgZmFsc2UpLFxuICAgIHNvcnRDb2x1bW46IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ3NvcnRpbmdEYXRhJywgJ3NvcnRDb2x1bW4nXSwgbnVsbCksXG4gICAgc29ydE9yZGVyOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdzb3J0aW5nRGF0YScsICdzb3J0T3JkZXInXSwgbnVsbCksXG4gICAgdmlzaWJsZUNvbHVtbnM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ3Zpc2libGVDb2x1bW5zJ10sIExpc3QoKSksXG4gICAgY29sdW1uV2lkdGhzOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdjb2x1bW5XaWR0aHMnXSwgTWFwKCkpLFxuICAgIHNlbGVjdGVkQ2VsbDogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZWxlY3RlZENlbGwnXSwgTWFwKCkpLFxuICAgIHNlbGVjdGVkSXRlbXM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2VsZWN0ZWRJdGVtcyddLCBMaXN0KCkpLFxuICAgIGRhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnZGF0YSddLCBMaXN0KCkpLFxuICAgIGVkaXREYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2VkaXREYXRhJ10sIE1hcCgpKSxcbiAgICBjcmVhdGVEYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NyZWF0ZURhdGEnXSwgTGlzdCgpKSxcbiAgICBmaWx0ZXJEYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2ZpbHRlckRhdGEnXSwgTWFwKCkpLFxuICAgIGNlbGxNZXNzYWdlczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjZWxsTWVzc2FnZXMnXSwgTWFwKCkpLFxuICAgIGNyZWF0ZUNlbGxNZXNzYWdlczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjcmVhdGVDZWxsTWVzc2FnZXMnXSwgTWFwKCkpLFxuICAgIGFsbERhdGFTaXplOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2FsbERhdGEnXSwgTGlzdCgpKS5zaXplLFxuICAgIGxhbmd1YWdlOiBVdGlscy5nZXRMYW5ndWFnZShHUklELCBzdGF0ZS51c2VyKSxcbiAgICByZWdpb246IFV0aWxzLmdldFJlZ2lvbihHUklELCBzdGF0ZS51c2VyKSxcbiAgICBkYXRlRm9ybWF0OiBVdGlscy5nZXREYXRlRm9ybWF0KEdSSUQsIHN0YXRlLnVzZXIpLFxuICAgIHRob3VzYW5kU2VwYXJhdG9yOiBVdGlscy5nZXRUaG91c2FuZFNlcGFyYXRvcihHUklELCBzdGF0ZS51c2VyKSxcbiAgICBkZWNpbWFsU2VwYXJhdG9yOiBVdGlscy5nZXREZWNpbWFsU2VwYXJhdG9yKEdSSUQsIHN0YXRlLnVzZXIpLFxuICAgIGZvcmNlUmVmcmVzaFRpbWVzdGFtcDogc3RhdGUuZGF0YWdyaWQuZ2V0KCdmb3JjZVJlZnJlc2gnLCAwKSwgLy8gZm9yY2UgcmUtcmVuZGVyIHdoZW4gY2hhbmdlZFxuICAgIGZvY3VzVHlwZTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2ZvY3VzVHlwZSddLCBNYXAoKSksXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkYXRhZ3JpZEFjdGlvbnM7XG5cbkBwYWdpbmF0aW9uXG5AaW5qZWN0SW50bFxuQGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpXG5jbGFzcyBEYXRhR3JpZCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0gcHJvcFR5cGVzO1xuICBzdGF0aWMgZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjdXJyZW50Um93OiAwLFxuICAgICAgY3VycmVudENvbHVtbjogMCxcbiAgICAgIGNvbnRleHRNZW51T3BlbjogZmFsc2UsXG4gICAgICBjb250ZXh0TWVudVg6IG51bGwsXG4gICAgICBjb250ZXh0TWVudVk6IG51bGwsXG4gICAgfTtcbiAgICB0aGlzLmNlbGxSZWZzID0ge307XG4gICAgdGhpcy5jcmVhdGVDZWxsUmVmcyA9IHt9O1xuICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgPSBmYWxzZTtcbiAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IGZhbHNlOyAvLyBUT0RPOiBIYW5kbGUgZm9jdXNpbmcgd2hlbiB0cnVlXG4gICAgdGhpcy5mb2N1c1RvRXJyb3JDZWxsID0gZmFsc2U7IC8vIFRPRE86IEhhbmRsZSBmb2N1c2luZyB3aGVuIHRydWVcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkRvY3VtZW50Q2xpY2spO1xuICAgIHRoaXMucHJvcHMuaW52YWxpZGF0ZSh0aGlzLnByb3BzLmdyaWQpO1xuICB9XG5cbiAgb25Eb2N1bWVudENsaWNrID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmNvbnRleHRNZW51SXRlbXMpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjb250ZXh0TWVudU9wZW46IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkRvY3VtZW50Q2xpY2spO1xuICB9O1xuXG4gIG9uQ29sdW1uUmVzaXplRW5kQ2FsbGJhY2sgPSAobmV3Q29sdW1uV2lkdGgsIGNvbHVtbktleSkgPT4ge1xuICAgIHRoaXMucHJvcHMucmVzaXplQ29sdW1uKHRoaXMucHJvcHMuZ3JpZCwgY29sdW1uS2V5LCBuZXdDb2x1bW5XaWR0aCk7XG4gIH07XG5cblxuICAvKipcbiAgICogQHBhcmFtIHJvd0luZGV4IChpbnQpXG4gICAqIEBwYXJhbSBjb2wgKG9iaikuIENvbHVtbiBvYmplY3QuXG4gICAqIEBwYXJhbSBlLiBPcmlnaW5hbCBLZXlEb3duIGV2ZW50XG4gICAqIEBwYXJhbSBjcmVhdGUgKGJvb2wpLiBJcyB0aGUgY2VsbCBjcmVhdGUgY2VsbCBvciBlZGl0IGNlbGw/XG4gICAqL1xuICBvbkNlbGxLZXlEb3duID0gKHJvd0luZGV4LCBjb2wsIGUsIGNyZWF0ZSA9IGZhbHNlKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuZW5hYmxlQXJyb3dOYXZpZ2F0aW9uKSB7XG4gICAgICBjb25zdCBjZWxsUmVmcyA9IGNyZWF0ZSA/IHRoaXMuY3JlYXRlQ2VsbFJlZnMgOiB0aGlzLmNlbGxSZWZzO1xuICAgICAgY29uc3QgYXJyb3dLZXlzID0gW0tFWV9DT0RFUy5ET1dOLCBLRVlfQ09ERVMuVVAsIEtFWV9DT0RFUy5MRUZULCBLRVlfQ09ERVMuUklHSFRdO1xuICAgICAgY29uc3Qge1xuICAgICAgICBjb2x1bW5zLCB2aXNpYmxlQ29sdW1ucywgZ3JpZCwgZGF0YSwgb25MYXN0Q2VsbFRhYlByZXNzLFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCBncmlkQ29sdW1ucyA9IFV0aWxzLnZpc2libGVDb2x1bW5zKGNvbHVtbnMsIHZpc2libGVDb2x1bW5zKTtcbiAgICAgIGNvbnN0IGdldENvbHVtbktleUJ5SW5kZXggPSBpID0+IFV0aWxzLmdldENvbHVtbktleShncmlkQ29sdW1uc1tpXSk7XG4gICAgICBjb25zdCByb3dzU2l6ZSA9IGRhdGEuc2l6ZTtcbiAgICAgIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2wpO1xuICAgICAgbGV0IGN1cnJlbnRDZWxsID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtjb2x1bW5LZXl9XyR7cm93SW5kZXh9YF07XG4gICAgICBsZXQgcHJveHkgPSBudWxsO1xuXG4gICAgICBjb25zdCBpc0N1cnNvckF0U3RhcnQgPSAoKSA9PiB7XG4gICAgICAgIGlmIChjdXJyZW50Q2VsbC50eXBlICE9PSAndGV4dCcpIHJldHVybiB0cnVlO1xuICAgICAgICByZXR1cm4gY3VycmVudENlbGwuc2VsZWN0aW9uU3RhcnQgPT09IDA7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBpc0N1cnNvckF0RW5kID0gKCkgPT4ge1xuICAgICAgICBpZiAoY3VycmVudENlbGwudHlwZSAhPT0gJ3RleHQnKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRDZWxsLnNlbGVjdGlvbkVuZCA9PT0gY3VycmVudENlbGwudmFsdWUubGVuZ3RoO1xuICAgICAgfTtcblxuICAgICAgLy8gSWYgY3VycmVudCBjZWxsIGhvbGRzIGEgcmVhY3QtZmxvYXRpbmctc2VsZWN0IGNvbXBvbmVudFxuICAgICAgaWYgKGN1cnJlbnRDZWxsICYmIGN1cnJlbnRDZWxsLnNlbGVjdFJlZikge1xuICAgICAgICBwcm94eSA9IGN1cnJlbnRDZWxsO1xuICAgICAgICBjdXJyZW50Q2VsbCA9IGN1cnJlbnRDZWxsLnNlbGVjdFJlZi5zZWxlY3QuaW5wdXRSZWY7XG4gICAgICB9XG5cbiAgICAgIC8vIFByZXZlbnRzIHVwL2Rvd24gYXJyb3cgZnJvbSBjaGFuZ2luZyBudW1iZXIgZmllbGQgdmFsdWVcbiAgICAgIGlmIChhcnJvd0tleXMuaW5jbHVkZXMoZS5rZXlDb2RlKSAmJiBjdXJyZW50Q2VsbC50eXBlID09PSAnbnVtYmVyJykgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuICAgICAgICBjYXNlIEtFWV9DT0RFUy5FTlRFUjpcbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuRVNDOiB7XG4gICAgICAgICAgaWYgKGNyZWF0ZSAmJiBlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5FTlRFUikge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5hZGROZXdJdGVtKGdyaWQsIFV0aWxzLmdldENvbHVtbkRlZmF1bHRWYWx1ZXMoY29sdW1ucykpO1xuICAgICAgICAgICAgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgY3VycmVudENlbGwuc2VsZWN0KCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuRE9XTjoge1xuICAgICAgICAgIGxldCBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4ICsgMX1gXTtcblxuICAgICAgICAgIC8vIFByZXZlbnRzIG1lbnUgZnJvbSBvcGVuaW5nXG4gICAgICAgICAgaWYgKHByb3h5ICYmIHByb3h5LnNlbGVjdFJlZiAmJiAhcHJveHkuc2VsZWN0UmVmLnN0YXRlLm1lbnVJc09wZW4pIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmICghbmV4dEVsZW1lbnQpIGJyZWFrO1xuICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSBuZXh0RWxlbWVudC5zZWxlY3RSZWYuc2VsZWN0LmlucHV0UmVmO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm1vdmVDZWxsRm9jdXMobmV4dEVsZW1lbnQsIHJvd0luZGV4ICsgMSwgLTEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLlVQOiB7XG4gICAgICAgICAgbGV0IG5leHRFbGVtZW50ID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtjb2x1bW5LZXl9XyR7cm93SW5kZXggLSAxfWBdO1xuXG4gICAgICAgICAgLy8gUHJldmVudHMgbWVudSBmcm9tIG9wZW5pbmdcbiAgICAgICAgICBpZiAocHJveHkgJiYgcHJveHkuc2VsZWN0UmVmICYmICFwcm94eS5zZWxlY3RSZWYuc3RhdGUubWVudUlzT3Blbikge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKCFuZXh0RWxlbWVudCkgYnJlYWs7XG4gICAgICAgICAgICBuZXh0RWxlbWVudCA9IG5leHRFbGVtZW50LnNlbGVjdFJlZi5zZWxlY3QuaW5wdXRSZWY7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubW92ZUNlbGxGb2N1cyhuZXh0RWxlbWVudCwgcm93SW5kZXggLSAxLCAtMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuVEFCOlxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5SSUdIVDpcbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuTEVGVDoge1xuICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5SSUdIVCAmJiAhaXNDdXJzb3JBdEVuZCgpKSBicmVhaztcbiAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuTEVGVCAmJiAhaXNDdXJzb3JBdFN0YXJ0KCkpIGJyZWFrO1xuXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgbGV0IGNvbHVtbkluZCA9IGdyaWRDb2x1bW5zLmZpbmRJbmRleChjID0+IGMudmFsdWVLZXlQYXRoLmpvaW4oJy8nKSA9PT0gY29sdW1uS2V5KTtcbiAgICAgICAgICBpZiAoY29sdW1uSW5kICE9PSAtMSkge1xuICAgICAgICAgICAgbGV0IGRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCBuZXh0RWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICBsZXQgcm93SW5kID0gcm93SW5kZXg7XG4gICAgICAgICAgICB3aGlsZSAoZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgLy8gTW92aW5nIHRvIHRoZSBsZWZ0XG4gICAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5MRUZUIHx8IChlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5UQUIgJiYgZS5zaGlmdEtleSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29sdW1uSW5kIC0gMSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgLT0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJvd0luZCAtIDEgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kID0gZ3JpZENvbHVtbnMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAgIHJvd0luZCAtPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gTW92aW5nIHRvIHRoZSByaWdodFxuICAgICAgICAgICAgICAgIGlmIChjb2x1bW5JbmQgKyAxIDwgZ3JpZENvbHVtbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgKz0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJvd0luZCArIDEgPCByb3dzU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kID0gMDtcbiAgICAgICAgICAgICAgICAgIHJvd0luZCArPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm93SW5kICsgMSA9PT0gcm93c1NpemUpIHtcbiAgICAgICAgICAgICAgICAgIC8vIElmIHRyeWluZyB0byBzZWxlY3QgYSByb3csIHdoZW4gdGhlcmUgaXMgbm9uZTpcbiAgICAgICAgICAgICAgICAgIGlmIChvbkxhc3RDZWxsVGFiUHJlc3MgJiYgZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuVEFCKSBvbkxhc3RDZWxsVGFiUHJlc3MoZSk7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Z2V0Q29sdW1uS2V5QnlJbmRleChjb2x1bW5JbmQpfV8ke3Jvd0luZH1gXTtcblxuICAgICAgICAgICAgICAvLyBJZiB3ZSBjYW5ub3QgZm9jdXMgb24gdGhlIG5leHQgZWxlbWVudCB3aGlsZSBtb3ZpbmcgdG8gdGhlIHJpZ2h0XG4gICAgICAgICAgICAgIGlmICghbmV4dEVsZW1lbnQgJiYgZS5rZXlDb2RlICE9PSBLRVlfQ09ERVMuTEVGVCkge1xuICAgICAgICAgICAgICAgIC8vIElmIHdlJ3JlIG5vdCB5ZXQgaW4gdGhlIGxhc3QgZm9jdXNhYmxlIGNvbHVtblxuICAgICAgICAgICAgICAgIGlmIChjb2x1bW5JbmQgPD0gZ3JpZENvbHVtbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICB3aGlsZSAoY29sdW1uSW5kIDw9IGdyaWRDb2x1bW5zLmxlbmd0aCAmJiAhbmV4dEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2dldENvbHVtbktleUJ5SW5kZXgoY29sdW1uSW5kKX1fJHtyb3dJbmR9YF07XG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCArPSAxO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHdlIGFyZSBpbiB0aGUgbGFzdCBjb2x1bW4gYW5kIHdlIGRvbid0IGhhdmUgYW4gZWxlbWVudCB0byBmb2N1cyBvbixcbiAgICAgICAgICAgICAgICAgICAgLy8gd2UgbXVzdCBtb3ZlIHRvIHRoZSBuZXh0IHJvdyAoaWYgcG9zc2libGUpXG4gICAgICAgICAgICAgICAgICAgIGlmICghbmV4dEVsZW1lbnQgJiYgY29sdW1uSW5kID09PSBncmlkQ29sdW1ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB0cnlpbmcgdG8gc2VsZWN0IGEgcm93LCB3aGVuIHRoZXJlIGlzIG5vbmU6XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHJvd0luZCArIDEgPT09IHJvd3NTaXplKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob25MYXN0Q2VsbFRhYlByZXNzICYmIGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLlRBQikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkxhc3RDZWxsVGFiUHJlc3MoZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgIHJvd0luZCArPSAxO1xuICAgICAgICAgICAgICAgICAgICAgIG5leHRFbGVtZW50ID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtnZXRDb2x1bW5LZXlCeUluZGV4KGNvbHVtbkluZCl9XyR7cm93SW5kfWBdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIElmIHdlIGNhbm5vdCBmb2N1cyBvbiB0aGUgbmV4dCBlbGVtZW50IHdoaWxlIG1vdmluZyB0byB0aGUgbGVmdFxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFuZXh0RWxlbWVudCAmJiBlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5MRUZUKSB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGNvbHVtbkluZCA+IDAgJiYgIW5leHRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgLT0gMTtcbiAgICAgICAgICAgICAgICAgIG5leHRFbGVtZW50ID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtnZXRDb2x1bW5LZXlCeUluZGV4KGNvbHVtbkluZCl9XyR7cm93SW5kfWBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBkaXNhYmxlZCA9IG5leHRFbGVtZW50ID8gbmV4dEVsZW1lbnQuZGlzYWJsZWQgOiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZGlzYWJsZWQgJiYgbmV4dEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgaWYgKG5leHRFbGVtZW50LnNlbGVjdFJlZikgbmV4dEVsZW1lbnQgPSBuZXh0RWxlbWVudC5zZWxlY3RSZWYuc2VsZWN0LmlucHV0UmVmO1xuICAgICAgICAgICAgICB0aGlzLm1vdmVDZWxsRm9jdXMobmV4dEVsZW1lbnQsIHJvd0luZCwgY29sdW1uSW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgb25FZGl0Q2VsbEtleURvd24gPSAocm93SW5kZXgsIGNvbCkgPT4gKGUpID0+IHtcbiAgICB0aGlzLm9uQ2VsbEtleURvd24ocm93SW5kZXgsIGNvbCwgZSk7XG4gIH07XG5cbiAgb25DcmVhdGVDZWxsS2V5RG93biA9IChyb3dJbmRleCwgY29sKSA9PiAoZSkgPT4ge1xuICAgIHRoaXMub25DZWxsS2V5RG93bihyb3dJbmRleCwgY29sLCBlLCB0cnVlKTtcbiAgfTtcblxuICBvbkZpbHRlckNlbGxWYWx1ZUNoYW5nZSA9IChjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZXZlbnRPckRhdGEpID0+IHtcbiAgICBsZXQgcmF3VmFsdWU7XG4gICAgLy8gZXZlbnRPckRhdGEgY2FuIGJlIGlucHV0IG9uQ2hhbmdlIGV2ZW50LCByZWFjdC1zZWxlY3Qgb25DaGFuZ2Ugb3IgcmVhY3QtZGF5LXBpY2tlciBvbkNoYW5nZVxuICAgIGlmIChldmVudE9yRGF0YSkge1xuICAgICAgaWYgKGV2ZW50T3JEYXRhLnRhcmdldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChldmVudE9yRGF0YS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCB2YWx1ZSA9IHZhbHVlUGFyc2VyKHJhd1ZhbHVlKTtcbiAgICB0aGlzLnByb3BzLmZpbHRlckNlbGxWYWx1ZUNoYW5nZShcbiAgICAgIHRoaXMucHJvcHMuZ3JpZCxcbiAgICAgIHRoaXMucHJvcHMuY29sdW1ucyxcbiAgICAgIGNvbCxcbiAgICAgIHZhbHVlLFxuICAgICk7XG4gIH07XG5cbiAgb25DcmVhdGVDZWxsVmFsdWVDaGFuZ2UgPSAocm93SW5kZXgsIGNvbCwgdmFsdWVQYXJzZXIpID0+IChldmVudE9yRGF0YSkgPT4ge1xuICAgIGxldCByYXdWYWx1ZTtcbiAgICAvLyBldmVudE9yRGF0YSBjYW4gYmUgaW5wdXQgb25DaGFuZ2UgZXZlbnQsIHJlYWN0LXNlbGVjdCBvbkNoYW5nZSBvciByZWFjdC1kYXktcGlja2VyIG9uQ2hhbmdlXG4gICAgaWYgKGV2ZW50T3JEYXRhKSB7XG4gICAgICBpZiAoZXZlbnRPckRhdGEudGFyZ2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YS50YXJnZXQudmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50T3JEYXRhLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YS52YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGE7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlID0gdmFsdWVQYXJzZXIocmF3VmFsdWUpO1xuICAgIHRoaXMucHJvcHMuY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlKHRoaXMucHJvcHMuZ3JpZCwgcm93SW5kZXgsIGNvbC52YWx1ZUtleVBhdGgsIHZhbHVlKTtcbiAgICBpZiAoY29sLm9uQ3JlYXRlVmFsdWVDaGFuZ2UpIHtcbiAgICAgIGNvbC5vbkNyZWF0ZVZhbHVlQ2hhbmdlKHZhbHVlLCBjb2wudmFsdWVLZXlQYXRoLCByb3dJbmRleCk7XG4gICAgfVxuICAgIGlmIChjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUgJiYgdmFsdWUgPT09IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5tYXRjaFZhbHVlKSB7XG4gICAgICAvLyBDYWxsIHNwZWNpYWwgcGFpcmVkIHZhbHVlIGNoYW5nZSBvbiBvdGhlciBjZWxsIGlmIHZhbHVlIG1hdGNoZXNcbiAgICAgIHRoaXMub25DcmVhdGVDZWxsVmFsdWVDaGFuZ2UoXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICB7IHZhbHVlS2V5UGF0aDogY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm5ld1ZhbHVlS2V5UGF0aCB9LFxuICAgICAgICB2ID0+IHYsXG4gICAgICApKGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5uZXdWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjb2wudmFsaWRhdG9ycykge1xuICAgICAgdGhpcy5wcm9wcy5jcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZShcbiAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgY29sLnZhbHVlS2V5UGF0aCxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIGNvbC52YWxpZGF0b3JzLFxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgb25FZGl0Q2VsbFZhbHVlQ2hhbmdlID0gKHJvd0luZGV4LCBjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZXZlbnRPckRhdGEpID0+IHtcbiAgICBjb25zdCBkYXRhSWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgIGxldCByYXdWYWx1ZTtcbiAgICAvLyBldmVudE9yRGF0YSBjYW4gYmUgaW5wdXQgb25DaGFuZ2UgZXZlbnQsIHJlYWN0LXNlbGVjdCBvbkNoYW5nZSBvciByZWFjdC1kYXktcGlja2VyIG9uQ2hhbmdlXG4gICAgaWYgKGV2ZW50T3JEYXRhKSB7XG4gICAgICBpZiAoZXZlbnRPckRhdGEudGFyZ2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YS50YXJnZXQudmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50T3JEYXRhLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YS52YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGE7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlID0gdmFsdWVQYXJzZXIocmF3VmFsdWUpO1xuICAgIHRoaXMucHJvcHMuZWRpdENlbGxWYWx1ZUNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIGRhdGFJZCwgY29sLnZhbHVlS2V5UGF0aCwgdmFsdWUpO1xuICAgIGlmIChjb2wub25FZGl0VmFsdWVDaGFuZ2UpIHtcbiAgICAgIGNvbC5vbkVkaXRWYWx1ZUNoYW5nZSh2YWx1ZSwgY29sLnZhbHVlS2V5UGF0aCwgcm93SW5kZXgsIGRhdGFJZCk7XG4gICAgfVxuICAgIGlmIChjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUgJiYgdmFsdWUgPT09IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5tYXRjaFZhbHVlKSB7XG4gICAgICAvLyBDYWxsIHNwZWNpYWwgcGFpcmVkIHZhbHVlIGNoYW5nZSBvbiBvdGhlciBjZWxsIGlmIHZhbHVlIG1hdGNoZXNcbiAgICAgIHRoaXMub25FZGl0Q2VsbFZhbHVlQ2hhbmdlKFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgeyB2YWx1ZUtleVBhdGg6IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5uZXdWYWx1ZUtleVBhdGggfSxcbiAgICAgICAgdiA9PiB2LFxuICAgICAgKShjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY29sLnZhbGlkYXRvcnMpIHtcbiAgICAgIHRoaXMucHJvcHMuZWRpdENlbGxWYWx1ZVZhbGlkYXRlKFxuICAgICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICAgIGRhdGFJZCxcbiAgICAgICAgY29sLnZhbHVlS2V5UGF0aCxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIGNvbC52YWxpZGF0b3JzLFxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgb25DcmVhdGVDZWxsQmx1ciA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGUpID0+IHtcbiAgICBpZiAoY29sLm9uQ3JlYXRlQmx1cikge1xuICAgICAgbGV0IHZhbHVlID0gKGUgJiYgZS50YXJnZXQgJiYgZS50YXJnZXQudmFsdWUgIT09IHVuZGVmaW5lZCkgP1xuICAgICAgICBlLnRhcmdldC52YWx1ZSA6XG4gICAgICAgIHRoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShyb3dJbmRleCwgY29sKTtcbiAgICAgIGlmICh2YWx1ZVBhcnNlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWVQYXJzZXIodmFsdWUpO1xuICAgICAgfVxuICAgICAgY29sLm9uQ3JlYXRlQmx1cih2YWx1ZSwgcm93SW5kZXgpO1xuICAgIH1cbiAgfTtcblxuICBvbkVkaXRDZWxsQmx1ciA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGUpID0+IHtcbiAgICBpZiAoY29sLm9uRWRpdEJsdXIpIHtcbiAgICAgIGxldCB2YWx1ZSA9IChlICYmIGUudGFyZ2V0ICYmIGUudGFyZ2V0LnZhbHVlICE9PSB1bmRlZmluZWQpID9cbiAgICAgICAgZS50YXJnZXQudmFsdWUgOlxuICAgICAgICB0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCk7XG4gICAgICBpZiAodmFsdWVQYXJzZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlUGFyc2VyKHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGRhdGFJZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgICBjb2wub25FZGl0Qmx1cih2YWx1ZSwgcm93SW5kZXgsIGRhdGFJZCk7XG4gICAgfVxuICB9O1xuXG4gIG9uQ2VsbEZvY3VzID0gKGNlbGxUeXBlLCBpbnB1dFR5cGUsIHJvd0luZGV4LCBjb2x1bW5LZXkpID0+IChlKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgY2VsbFNlbGVjdGlvbkNoYW5nZSwgY2VsbFNlbGVjdCwgZ3JpZCwgaXNFZGl0aW5nLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChpc0VkaXRpbmcpIHJldHVybjtcblxuICAgIGlmIChpbnB1dFR5cGUgPT09ICdudW1iZXInKSB7XG4gICAgICBlLnRhcmdldC5zZWxlY3QoKTtcbiAgICB9XG4gICAgaWYgKGNlbGxUeXBlID09PSAnZWRpdCcgJiYgY2VsbFNlbGVjdCkge1xuICAgICAgY2VsbFNlbGVjdGlvbkNoYW5nZShncmlkLCBNYXAoe1xuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgY29sdW1uS2V5LFxuICAgICAgfSkpO1xuICAgIH1cbiAgfTtcblxuICBnZXREYXRhSWRCeVJvd0luZGV4ID0gcm93SW5kZXggPT5cbiAgICB0aGlzLnByb3BzLmRhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi50aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoXSk7XG5cbiAgZ2V0U2VsZWN0ZWRJdGVtSW5kZXggPSAoaWQpID0+IHtcbiAgICBpZiAoIWlkKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5wcm9wcy5kYXRhLmZpbmRJbmRleCh2ID0+IHYuZ2V0SW4odGhpcy5wcm9wcy5ncmlkLmlkS2V5UGF0aCkgPT09IGlkKTtcbiAgICByZXR1cm4gaW5kZXggPT09IC0xID8gdW5kZWZpbmVkIDogaW5kZXg7XG4gIH07XG5cbiAgZ2V0RWRpdEl0ZW1WYWx1ZSA9IChyb3dJbmRleCwgY29sLCBvcHRpb25zID0gW10pID0+IHtcbiAgICAvLyBHZXQgdGhlIHZhbHVlIHRvIGRpc3BsYXkgaW4gZWRpdCBjZWxsXG4gICAgY29uc3QgaWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgIGNvbnN0IGVkaXRWYWx1ZSA9IHRoaXMucHJvcHMuZWRpdERhdGEuZ2V0SW4oW2lkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSwgdW5kZWZpbmVkKTtcbiAgICBsZXQgb3JpZ2luYWxWYWx1ZTtcbiAgICBpZiAoZWRpdFZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG9yaWdpbmFsVmFsdWUgPSB0aGlzLnByb3BzLmRhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSwgJycpO1xuICAgIH0gZWxzZSBpZiAoZWRpdFZhbHVlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFZhbHVlIGlzIGZvdW5kIGZyb20gZWRpdERhdGFcbiAgICAgIC8vIEZvcm1hdCBieSBjb21wb25lbnQgdHlwZVxuICAgICAgc3dpdGNoIChjb2wuY29tcG9uZW50VHlwZSkge1xuICAgICAgICBjYXNlICdzZWxlY3QnOlxuICAgICAgICAgIHJldHVybiBjb2wuc2VsZWN0Q29tcG9uZW50T3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IGVkaXRWYWx1ZSk7XG4gICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICAgIHJldHVybiBvcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gZWRpdFZhbHVlKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gZWRpdFZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAob3JpZ2luYWxWYWx1ZSA9PT0gbnVsbCB8fCBvcmlnaW5hbFZhbHVlID09PSB1bmRlZmluZWQgfHwgb3JpZ2luYWxWYWx1ZSA9PT0gJycpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgLy8gUmV0dXJuIHZhbHVlIGZyb20gb3JpZ2luYWwgZGF0YSwgYmVjYXVzZSBlZGl0RGF0YSBpcyBub3QgYXZhaWxhYmxlXG4gICAgLy8gRm9ybWF0IGJ5IGNvbXBvbmVudCB0eXBlXG4gICAgc3dpdGNoIChjb2wuY29tcG9uZW50VHlwZSkge1xuICAgICAgY2FzZSAnZmxvYXQnOiB7XG4gICAgICAgIGlmIChTdHJpbmcob3JpZ2luYWxWYWx1ZSkubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHJldHVybiBTdHJpbmcob3JpZ2luYWxWYWx1ZSlcbiAgICAgICAgICAgIC5yZXBsYWNlKCcuJywgdGhpcy5wcm9wcy5kZWNpbWFsU2VwYXJhdG9yKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3JpZ2luYWxWYWx1ZTtcbiAgICAgIH1cbiAgICAgIGNhc2UgJ3NlbGVjdCc6XG4gICAgICAgIHJldHVybiBjb2wuc2VsZWN0Q29tcG9uZW50T3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IG9yaWdpbmFsVmFsdWUpO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIHJldHVybiBvcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gb3JpZ2luYWxWYWx1ZSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gb3JpZ2luYWxWYWx1ZTtcbiAgICB9XG4gIH07XG5cbiAgZ2V0Q3JlYXRlSXRlbVZhbHVlID0gKHJvd0luZGV4LCBjb2wsIG9wdGlvbnMgPSBbXSkgPT4ge1xuICAgIGNvbnN0IHZhbCA9IHRoaXMucHJvcHMuY3JlYXRlRGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdLCAnJyk7XG4gICAgaWYgKHZhbCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH0gZWxzZSBpZiAoY29sLmNvbXBvbmVudFR5cGUgPT09ICdzZWxlY3QnKSB7XG4gICAgICByZXR1cm4gY29sLnNlbGVjdENvbXBvbmVudE9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSB2YWwpO1xuICAgIH0gZWxzZSBpZiAoWydib29sZWFuJ10uaW5jbHVkZXMoY29sLmNvbXBvbmVudFR5cGUpKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IHZhbCk7XG4gICAgfVxuICAgIHJldHVybiB2YWw7XG4gIH07XG5cbiAgZ2V0RmlsdGVySXRlbVZhbHVlID0gKGNvbCwgb3B0aW9ucyA9IFtdKSA9PiB7XG4gICAgY29uc3QgdmFsID0gdGhpcy5wcm9wcy5maWx0ZXJEYXRhLmdldChVdGlscy5nZXRDb2x1bW5LZXkoY29sKSwgJycpO1xuICAgIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9IGVsc2UgaWYgKGNvbC5jb21wb25lbnRUeXBlID09PSAnc2VsZWN0Jykge1xuICAgICAgcmV0dXJuIGNvbC5zZWxlY3RDb21wb25lbnRPcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gdmFsKTtcbiAgICB9IGVsc2UgaWYgKFsnY2hlY2tib3gnLCAnYm9vbGVhbiddLmluY2x1ZGVzKGNvbC5jb21wb25lbnRUeXBlKSkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSB2YWwpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsO1xuICB9O1xuXG4gIGdldENvbXBvbmVudERpc2FibGVkU3RhdGUgPSAocm93SW5kZXgsIGNvbCwgbW9kZSkgPT4ge1xuICAgIGxldCBjb21wb25lbnREaXNhYmxlZCA9ICEhY29sLmRpc2FibGVFZGl0aW5nO1xuICAgIC8vIGNoZWNrIGlmIGNvbXBvbmVudCBpcyBkaXNhYmxlZCBieSBvdGhlciBjb2x1bW4gZGF0YVxuICAgIGlmICghY29tcG9uZW50RGlzYWJsZWQgJiYgY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoKSB7XG4gICAgICBpZiAobW9kZSA9PT0gJ2NyZWF0ZScpIHtcbiAgICAgICAgY29tcG9uZW50RGlzYWJsZWQgPSB0aGlzLmdldENyZWF0ZUl0ZW1WYWx1ZShcbiAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICB7IHZhbHVlS2V5UGF0aDogY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWVLZXlQYXRoIH0sXG4gICAgICAgICkgPT09IGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaC5tYXRjaFZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29tcG9uZW50RGlzYWJsZWQgPSB0aGlzLmdldEVkaXRJdGVtVmFsdWUoXG4gICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgeyB2YWx1ZUtleVBhdGg6IGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaC5tYXRjaFZhbHVlS2V5UGF0aCB9LFxuICAgICAgICApID09PSBjb2wuZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2gubWF0Y2hWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvbXBvbmVudERpc2FibGVkO1xuICB9O1xuXG4gIGdldFJvd0NsYXNzTmFtZSA9IChyb3dJbmRleCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGdyaWQsXG4gICAgICBpc0NyZWF0aW5nLFxuICAgICAgaXNFZGl0aW5nLFxuICAgICAgY3JlYXRlRGF0YSxcbiAgICAgIHNlbGVjdGVkSXRlbXMsXG4gICAgICBkYXRhLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHJvd0NsYXNzTmFtZXMgPSBbJ29jLWRhdGFncmlkLXJvdyddO1xuICAgIGxldCBleHRyYVJvd0NvdW50ID0gMDsgLy8gaG93IG1hbnkgcm93cyB0byBpZ25vcmUgZnJvbSB0b3AsIG5ldyArIGZpbHRlciByb3dzXG4gICAgaWYgKGlzQ3JlYXRpbmcpIGV4dHJhUm93Q291bnQgPSBjcmVhdGVEYXRhLnNpemU7XG4gICAgaWYgKGlzQ3JlYXRpbmcpIHtcbiAgICAgIGlmIChyb3dJbmRleCA8PSAoZXh0cmFSb3dDb3VudCAtIDEpKSB7XG4gICAgICAgIHJvd0NsYXNzTmFtZXMucHVzaCgnb2MtZGF0YWdyaWQtcm93LW5ldycpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNFZGl0aW5nKSB7XG4gICAgICByb3dDbGFzc05hbWVzLnB1c2goJ29jLWRhdGFncmlkLXJvdy1lZGl0Jyk7XG4gICAgfVxuXG5cbiAgICAvLyBjaGVjayBpZiByb3cgaXMgc2VsZWN0ZWRcbiAgICBpZiAoKCFpc0NyZWF0aW5nICYmICFpc0VkaXRpbmcpICYmXG4gICAgICAoc2VsZWN0ZWRJdGVtcyAmJiBncmlkLmlkS2V5UGF0aCkpIHtcbiAgICAgIGlmIChcbiAgICAgICAgc2VsZWN0ZWRJdGVtcy5pbmRleE9mKGRhdGEuZ2V0SW4oW3Jvd0luZGV4IC0gZXh0cmFSb3dDb3VudCwgLi4uZ3JpZC5pZEtleVBhdGhdKSkgIT09IC0xXG4gICAgICApIHtcbiAgICAgICAgcm93Q2xhc3NOYW1lcy5wdXNoKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLnJvd0NsYXNzTmFtZUdldHRlcikge1xuICAgICAgcmV0dXJuIHJvd0NsYXNzTmFtZXMuam9pbignICcpICsgJyAnICsgdGhpcy5wcm9wcy5yb3dDbGFzc05hbWVHZXR0ZXIocm93SW5kZXgpO1xuICAgIH1cbiAgICByZXR1cm4gcm93Q2xhc3NOYW1lcy5qb2luKCcgJyk7XG4gIH07XG5cbiAgZ2V0Q2VsbE1lc3NhZ2VzID0gKHJvd0luZGV4LCBjb2wsIGNlbGxUeXBlKSA9PiB7XG4gICAgY29uc3QgcmV0dXJuRGF0YSA9IHt9O1xuICAgIGlmICghdGhpcy5wcm9wcy5ncmlkLmlkS2V5UGF0aCB8fCAhY29sLnZhbHVlS2V5UGF0aCkge1xuICAgICAgcmV0dXJuIHJldHVybkRhdGE7XG4gICAgfVxuICAgIGxldCBpbmZvTWVzc2FnZTtcbiAgICBsZXQgZXJyb3JNZXNzYWdlO1xuICAgIGxldCB3YXJuaW5nTWVzc2FnZTtcbiAgICBpZiAoY2VsbFR5cGUgPT09ICdjcmVhdGUnKSB7XG4gICAgICBpbmZvTWVzc2FnZSA9IHRoaXMucHJvcHMuY3JlYXRlQ2VsbE1lc3NhZ2VzLmdldEluKFsnaW5mbycsIHJvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgICBlcnJvck1lc3NhZ2UgPSB0aGlzLnByb3BzLmNyZWF0ZUNlbGxNZXNzYWdlcy5nZXRJbihbJ2Vycm9yJywgcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgIHdhcm5pbmdNZXNzYWdlID0gdGhpcy5wcm9wcy5jcmVhdGVDZWxsTWVzc2FnZXMuZ2V0SW4oWyd3YXJuaW5nJywgcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgICAgaW5mb01lc3NhZ2UgPSB0aGlzLnByb3BzLmNlbGxNZXNzYWdlcy5nZXRJbihbJ2luZm8nLCBpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgZXJyb3JNZXNzYWdlID0gdGhpcy5wcm9wcy5jZWxsTWVzc2FnZXMuZ2V0SW4oWydlcnJvcicsIGlkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgICB3YXJuaW5nTWVzc2FnZSA9IHRoaXMucHJvcHMuY2VsbE1lc3NhZ2VzLmdldEluKFsnd2FybmluZycsIGlkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgfVxuICAgIGlmIChpbmZvTWVzc2FnZSkge1xuICAgICAgcmV0dXJuRGF0YS5pbmZvTWVzc2FnZSA9IGluZm9NZXNzYWdlO1xuICAgIH1cbiAgICBpZiAoZXJyb3JNZXNzYWdlKSB7XG4gICAgICByZXR1cm5EYXRhLmVycm9yTWVzc2FnZSA9IGVycm9yTWVzc2FnZTtcbiAgICB9XG4gICAgaWYgKHdhcm5pbmdNZXNzYWdlKSB7XG4gICAgICByZXR1cm5EYXRhLndhcm5pbmdNZXNzYWdlID0gd2FybmluZ01lc3NhZ2U7XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5EYXRhO1xuICB9O1xuXG4gIGdldFNjcm9sbFRvUm93ID0gKCkgPT4ge1xuICAgIGxldCBzY3JvbGxUb1JvdztcbiAgICBpZiAodGhpcy5wcm9wcy5pc0NyZWF0aW5nICYmICF0aGlzLmZvY3VzVG9DcmVhdGVDZWxsKSByZXR1cm4gc2Nyb2xsVG9Sb3c7XG4gICAgaWYgKHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwpIHtcbiAgICAgIGNvbnN0IHNjcm9sbE5ld1JvdyA9IHRoaXMucHJvcHMuY3JlYXRlRGF0YS5zaXplIC0gMTtcbiAgICAgIGlmIChzY3JvbGxOZXdSb3cgPj0gMCkge1xuICAgICAgICBzY3JvbGxUb1JvdyA9IHNjcm9sbE5ld1JvdztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMucHJvcHMuaXNFZGl0aW5nKSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gdGhpcy5zdGF0ZS5jdXJyZW50Um93O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2Nyb2xsVG9Sb3cgPSB0aGlzLnByb3BzLnNjcm9sbFRvUm93OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICB9XG4gICAgICBpZiAoc2Nyb2xsVG9Sb3cgPT09IHVuZGVmaW5lZCAmJiB0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuc2l6ZSA+IDApIHtcbiAgICAgICAgc2Nyb2xsVG9Sb3cgPSB0aGlzLmdldFNlbGVjdGVkSXRlbUluZGV4KHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5maXJzdCgpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNjcm9sbFRvUm93O1xuICB9O1xuXG4gIHNldEZvY3VzVG8gPSAoZm9jdXNUbykgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmlzRWRpdGluZyB8fCB0aGlzLnByb3BzLmlzQ3JlYXRpbmcpIHtcbiAgICAgIGlmIChmb2N1c1RvICYmIGZvY3VzVG8uZ2V0KCd0eXBlJykgJiYgZm9jdXNUbyAhPT0gdGhpcy5wcmV2Rm9jdXNUbykge1xuICAgICAgICB0aGlzW2ZvY3VzVG8uZ2V0KCd0eXBlJyldID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5mb2N1c1RvTGFzdFJvdyA9IGZvY3VzVG8uZ2V0KCdmb2N1c1RvTGFzdFJvdycpO1xuICAgICAgICB0aGlzLnByZXZGb2N1c1RvID0gZm9jdXNUbztcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlQ2VsbFNlbGVjdCA9IChjZWxsVHlwZSwgcm93SW5kZXgsIGNvbHVtbktleSkgPT4gKCkgPT4ge1xuICAgIGlmIChjZWxsVHlwZSA9PT0gJ3ZpZXcnICYmIHRoaXMucHJvcHMuY2VsbFNlbGVjdCkge1xuICAgICAgdGhpcy5wcm9wcy5jZWxsU2VsZWN0aW9uQ2hhbmdlKHRoaXMucHJvcHMuZ3JpZCwgTWFwKHtcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIGNvbHVtbktleSxcbiAgICAgIH0pKTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlQ3JlYXRlQ2VsbFJlZiA9IChyb3dJbmRleCwgY29sKSA9PiAocmVmKSA9PiB7XG4gICAgLy8gRm9jdXMgdG8gY3JlYXRlIGNlbGxcbiAgICBjb25zdCBjb2x1bW5LZXkgPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sKTtcbiAgICBpZiAoXG4gICAgICB0aGlzLnByb3BzLmNyZWF0ZURhdGEuc2l6ZSAmJlxuICAgICAgdGhpcy5wcm9wcy5jcmVhdGVEYXRhLnNpemUgPT09IHJvd0luZGV4ICsgMSAmJlxuICAgICAgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCAmJlxuICAgICAgIXRoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnY3JlYXRlJylcbiAgICApIHtcbiAgICAgIHJlZi5mb2N1cygpO1xuICAgICAgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZUFycm93TmF2aWdhdGlvbikge1xuICAgICAgdGhpcy5jcmVhdGVDZWxsUmVmc1tgJHt0aGlzLnByb3BzLmdyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4fWBdID0gcmVmO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVFZGl0Q2VsbFJlZiA9IChyb3dJbmRleCwgY29sKSA9PiAocmVmKSA9PiB7XG4gICAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCk7XG4gICAgaWYgKHRoaXMuZm9jdXNUb0VkaXRDZWxsICYmICF0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2VkaXQnKSkge1xuICAgICAgY29uc3Qgc2VsZWN0ZWRSb3dJbmRleCA9IHRoaXMuZm9jdXNUb0xhc3RSb3cgJiYgdGhpcy5wcm9wcy5kYXRhLnNpemUgPiAwID9cbiAgICAgICAgdGhpcy5wcm9wcy5kYXRhLnNpemUgLSAxIDogdGhpcy5nZXRTZWxlY3RlZEl0ZW1JbmRleCh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuZmlyc3QoKSk7XG5cbiAgICAgIGNvbnN0IHsgc2VsZWN0ZWRDZWxsIH0gPSB0aGlzLnByb3BzO1xuICAgICAgaWYgKHNlbGVjdGVkQ2VsbC5zaXplID4gMCkge1xuICAgICAgICBpZiAoc2VsZWN0ZWRDZWxsLmdldCgncm93SW5kZXgnKSA9PT0gcm93SW5kZXggJiYgc2VsZWN0ZWRDZWxsLmdldCgnY29sdW1uS2V5JykgPT09IGNvbHVtbktleSkge1xuICAgICAgICAgIHJlZi5mb2N1cygpO1xuICAgICAgICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5mb2N1c1RvTGFzdFJvdyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHNlbGVjdGVkUm93SW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZvY3VzVG9MYXN0Um93ID0gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKHNlbGVjdGVkUm93SW5kZXggPT09IHJvd0luZGV4KSB7XG4gICAgICAgIHJlZi5mb2N1cygpO1xuICAgICAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZvY3VzVG9MYXN0Um93ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZUFycm93TmF2aWdhdGlvbikge1xuICAgICAgdGhpcy5jZWxsUmVmc1tgJHt0aGlzLnByb3BzLmdyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4fWBdID0gcmVmO1xuICAgIH1cbiAgfTtcblxuICBtb3ZlQ2VsbEZvY3VzID0gKG5leHRFbGVtZW50LCByb3dJbmRleCwgY29sdW1uSW5kZXgpID0+IHtcbiAgICBjb25zdCBlbGVtZW50VHlwZXMgPSBbJ3RleHQnLCAnY2hlY2tib3gnXTtcbiAgICBpZiAobmV4dEVsZW1lbnQgJiYgZWxlbWVudFR5cGVzLmluY2x1ZGVzKG5leHRFbGVtZW50LnR5cGUpKSB7XG4gICAgICBpZiAocm93SW5kZXggIT09IC0xIHx8IGNvbHVtbkluZGV4ICE9PSAtMSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBjdXJyZW50Q29sdW1uOiBjb2x1bW5JbmRleCxcbiAgICAgICAgICBjdXJyZW50Um93OiByb3dJbmRleCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKG5leHRFbGVtZW50LnR5cGUgPT09ICdjaGVja2JveCcpIG5leHRFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIGlmIChuZXh0RWxlbWVudC50eXBlID09PSAndGV4dCcpIG5leHRFbGVtZW50LnNlbGVjdCgpO1xuICAgICAgfSwgNTApO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVTZWxlY3Rpb25DaGVja0JveE9uQ2hhbmdlID0gcm93SW5kZXggPT4gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMuaXRlbVNlbGVjdGlvbkNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIHJvd0luZGV4LCB0cnVlLCBmYWxzZSk7XG4gIH07XG5cbiAgZ2VuZXJhdGVDb2x1bW5zID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZXh0cmFDb2x1bW4gfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgY29sdW1ucyA9IFtdO1xuICAgIGNvbnN0IHRhYkluZGV4ID0gU3RyaW5nKHRoaXMucHJvcHMudGFiSW5kZXgpO1xuICAgIGlmIChleHRyYUNvbHVtbikge1xuICAgICAgY29sdW1ucy5wdXNoKHtcbiAgICAgICAgd2lkdGg6IGV4dHJhQ29sdW1uLndpZHRoIHx8IDQwLFxuICAgICAgICBpc1Jlc2l6YWJsZTogISFleHRyYUNvbHVtbi5pc1Jlc2l6YWJsZSxcbiAgICAgICAgaXNTb3J0YWJsZTogZmFsc2UsXG4gICAgICAgIGNvbHVtbktleTogJ2V4dHJhQ29sdW1uJyxcbiAgICAgICAgY2VsbDogcm93SW5kZXggPT4gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtZXh0cmEtY29sdW1uLWNlbGwgbm8tcm93LXNlbGVjdFwiPlxuICAgICAgICAgICAge2V4dHJhQ29sdW1uLnZhbHVlUmVuZGVyKHRoaXMucHJvcHMuZGF0YS5nZXQocm93SW5kZXgpLCB0YWJJbmRleCl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICksXG4gICAgICAgIGNlbGxFZGl0OiByb3dJbmRleCA9PiAoZXh0cmFDb2x1bW4uY2VsbEVkaXQgPyBleHRyYUNvbHVtbi5jZWxsRWRpdChyb3dJbmRleCkgOiBudWxsKSxcbiAgICAgICAgY2VsbENyZWF0ZTogcm93SW5kZXggPT4gKGV4dHJhQ29sdW1uLmNlbGxDcmVhdGUgPyBleHRyYUNvbHVtbi5jZWxsQ3JlYXRlKHJvd0luZGV4KSA6IG51bGwpLFxuICAgICAgICBjZWxsRmlsdGVyOiByb3dJbmRleCA9PiAoZXh0cmFDb2x1bW4uY2VsbEZpbHRlciA/IGV4dHJhQ29sdW1uLmNlbGxGaWx0ZXIocm93SW5kZXgpIDogbnVsbCksXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wcm9wcy5yb3dTZWxlY3RDaGVja2JveENvbHVtbikge1xuICAgICAgY29sdW1ucy5wdXNoKHtcbiAgICAgICAgd2lkdGg6IDQwLFxuICAgICAgICBpc1Jlc2l6YWJsZTogZmFsc2UsXG4gICAgICAgIGlzU29ydGFibGU6IGZhbHNlLFxuICAgICAgICBjb2x1bW5LZXk6ICdzZWxlY3Rpb25DaGVja2JveCcsXG4gICAgICAgIGNlbGw6IChyb3dJbmRleCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHJvd0l0ZW0gPSB0aGlzLnByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KTtcbiAgICAgICAgICBjb25zdCBpdGVtSWQgPSByb3dJdGVtLmdldEluKHRoaXMucHJvcHMuZ3JpZC5pZEtleVBhdGgpO1xuICAgICAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLmluY2x1ZGVzKGl0ZW1JZCk7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxDaGVja2JveFxuICAgICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRTZWxlY3RDaGVja0JveC0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtyb3dJbmRleH1gfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1zZWxlY3QtY2hlY2tib3gtY2VsbCBuby1yb3ctc2VsZWN0XCJcbiAgICAgICAgICAgICAgY2hlY2tlZD17c2VsZWN0ZWR9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVNlbGVjdGlvbkNoZWNrQm94T25DaGFuZ2Uocm93SW5kZXgpfVxuICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIGNlbGxFZGl0OiAoKSA9PiBudWxsLFxuICAgICAgICBjZWxsQ3JlYXRlOiAoKSA9PiBudWxsLFxuICAgICAgICBjZWxsRmlsdGVyOiAoKSA9PiBudWxsLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgdmlzaWJsZUNvbHVtbnMgPSBbXTtcbiAgICB0aGlzLnByb3BzLnZpc2libGVDb2x1bW5zLmZvckVhY2goKHZpc2libGVDb2x1bW5LZXkpID0+IHtcbiAgICAgIHRoaXMucHJvcHMuY29sdW1ucy5mb3JFYWNoKChvcmdDb2wpID0+IHtcbiAgICAgICAgaWYgKFV0aWxzLmdldENvbHVtbktleShvcmdDb2wpID09PSB2aXNpYmxlQ29sdW1uS2V5KSB7XG4gICAgICAgICAgdmlzaWJsZUNvbHVtbnMucHVzaChvcmdDb2wpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICB2aXNpYmxlQ29sdW1ucy5mb3JFYWNoKChjb2wpID0+IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgZGF0YSxcbiAgICAgICAgZGF0ZUZvcm1hdCxcbiAgICAgICAgdGhvdXNhbmRTZXBhcmF0b3IsXG4gICAgICAgIGRlY2ltYWxTZXBhcmF0b3IsXG4gICAgICAgIGdyaWQsXG4gICAgICAgIGlubGluZUVkaXQsXG4gICAgICAgIGZpbHRlcmluZyxcbiAgICAgICAgcmVnaW9uLFxuICAgICAgICBpbnRsLFxuICAgICAgICBzZWxlY3RDb21wb25lbnRPcHRpb25zLFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgIGNvbnN0IHZhbHVlRW1wdHlDaGVja2VyID0gVXRpbHMuZ2V0VmFsdWVFbXB0eUNoZWNrZXIoY29sKTtcbiAgICAgIC8vIENlbGwgdmFsdWUgcmVuZGVyaW5nXG4gICAgICBjb25zdCB2YWx1ZVJlbmRlciA9IChyb3dJbmRleCwgZm9ybWF0KSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbCA9IGRhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgICAgIGlmICh2YWx1ZUVtcHR5Q2hlY2tlcih2YWwpKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbC5pc1JlcXVpcmVkID8gPE0gaWQ9XCJHcmlkLlZhbHVlSXNNaXNzaW5nXCIgLz4gOiAnJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZm9ybWF0ID8gZm9ybWF0KHZhbCkgOiB2YWw7XG4gICAgICB9O1xuXG4gICAgICBsZXQgY29sdW1uID0gR3JpZENvbHVtblNlcnZpY2UuYmFzZUNvbHVtbihjb2wpO1xuICAgICAgLy8gQ29sbGVjdCBjb2x1bW4gZnVuY3Rpb25zIGludG8gb25lIE9iamVjdFxuICAgICAgY29uc3QgY29sdW1uRnVuY3Rpb25zID0ge1xuICAgICAgICBlZGl0OiB7XG4gICAgICAgICAgZ2V0SXRlbVZhbHVlOiB0aGlzLmdldEVkaXRJdGVtVmFsdWUsXG4gICAgICAgICAgb25DZWxsVmFsdWVDaGFuZ2U6IHRoaXMub25FZGl0Q2VsbFZhbHVlQ2hhbmdlLFxuICAgICAgICAgIG9uQ2VsbEJsdXI6IHRoaXMub25FZGl0Q2VsbEJsdXIsXG4gICAgICAgICAgb25DZWxsRm9jdXM6IHRoaXMub25DZWxsRm9jdXMsXG4gICAgICAgICAgb25DZWxsS2V5RG93bjogdGhpcy5vbkVkaXRDZWxsS2V5RG93bixcbiAgICAgICAgICBoYW5kbGVDZWxsUmVmOiB0aGlzLmhhbmRsZUVkaXRDZWxsUmVmLFxuICAgICAgICB9LFxuICAgICAgICBjcmVhdGU6IHtcbiAgICAgICAgICBnZXRJdGVtVmFsdWU6IHRoaXMuZ2V0Q3JlYXRlSXRlbVZhbHVlLFxuICAgICAgICAgIG9uQ2VsbFZhbHVlQ2hhbmdlOiB0aGlzLm9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlLFxuICAgICAgICAgIG9uQ2VsbEJsdXI6IHRoaXMub25DcmVhdGVDZWxsQmx1cixcbiAgICAgICAgICBvbkNlbGxGb2N1czogdGhpcy5vbkNlbGxGb2N1cyxcbiAgICAgICAgICBvbkNlbGxLZXlEb3duOiB0aGlzLm9uQ3JlYXRlQ2VsbEtleURvd24sXG4gICAgICAgICAgaGFuZGxlQ2VsbFJlZjogdGhpcy5oYW5kbGVDcmVhdGVDZWxsUmVmLFxuICAgICAgICB9LFxuICAgICAgICBmaWx0ZXI6IHtcbiAgICAgICAgICBnZXRJdGVtVmFsdWU6IHRoaXMuZ2V0RmlsdGVySXRlbVZhbHVlLFxuICAgICAgICAgIG9uQ2VsbFZhbHVlQ2hhbmdlOiB0aGlzLm9uRmlsdGVyQ2VsbFZhbHVlQ2hhbmdlLFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgLy8gaGFuZGxlIGNvbHVtbi5jZWxsIC8gY29sdW1uLmNlbGxFZGl0IC8gY29sdW1uLmNlbGxDcmVhdGUgLyBjb2x1bW4uY2VsbEZpbHRlclxuICAgICAgY29uc3QgY2VsbFByb3BzID0ge1xuICAgICAgICBkYXRhLFxuICAgICAgICBkYXRlRm9ybWF0LFxuICAgICAgICB0aG91c2FuZFNlcGFyYXRvcixcbiAgICAgICAgZGVjaW1hbFNlcGFyYXRvcixcbiAgICAgIH07IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIGNvbHVtbiA9IEdyaWRDb2x1bW5TZXJ2aWNlLmNvbHVtbkNlbGwoY29sdW1uLCBjZWxsUHJvcHMsIGNvbCwgdmFsdWVSZW5kZXIpO1xuXG4gICAgICAvLyBoYW5kbGUgY29sdW1uQ29tcG9uZW50VHlwZXNcbiAgICAgIGNvbnN0IGNvbXBvbmVudFR5cGVQcm9wcyA9IHtcbiAgICAgICAgLi4uY2VsbFByb3BzLFxuICAgICAgICBncmlkLFxuICAgICAgICBpbmxpbmVFZGl0LFxuICAgICAgICBmaWx0ZXJpbmcsXG4gICAgICAgIHJlZ2lvbixcbiAgICAgICAgaW50bCxcbiAgICAgICAgc2VsZWN0Q29tcG9uZW50T3B0aW9ucyxcbiAgICAgIH07IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIGNvbHVtbiA9IEdyaWRDb2x1bW5TZXJ2aWNlLmNvbHVtbkNvbXBvbmVudFR5cGUoXG4gICAgICAgIGNvbHVtbixcbiAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgIGNvbXBvbmVudFR5cGVQcm9wcyxcbiAgICAgICAgY29sLFxuICAgICAgICBjb2x1bW5GdW5jdGlvbnMsXG4gICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZSxcbiAgICAgICk7XG5cbiAgICAgIGNvbHVtbnMucHVzaChjb2x1bW4pO1xuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuaXNDcmVhdGluZykge1xuICAgICAgY29sdW1ucy5wdXNoKHtcbiAgICAgICAgd2lkdGg6IDM3LFxuICAgICAgICBpc1Jlc2l6YWJsZTogZmFsc2UsXG4gICAgICAgIGNvbHVtbktleTogJ3JlbW92ZU5ld0l0ZW0nLFxuICAgICAgICBjZWxsOiAoKSA9PiBudWxsLFxuICAgICAgICBjZWxsRWRpdDogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbENyZWF0ZTogcm93SW5kZXggPT4gKFxuICAgICAgICAgIDxJY29uXG4gICAgICAgICAgICBpZD17YG9jLWRhdGFncmlkLW5ldy1pdGVtLXJlbW92ZS0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtyb3dJbmRleH1gfVxuICAgICAgICAgICAgdHlwZT1cImluZGljYXRvclwiXG4gICAgICAgICAgICBuYW1lPVwiZGVsZXRlXCJcbiAgICAgICAgICAgIHdpZHRoPXszMH1cbiAgICAgICAgICAgIGhlaWdodD17MzB9XG4gICAgICAgICAgICBzdHlsZT17eyBwYWRkaW5nOiAnN3B4JyB9fVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdGhpcy5wcm9wcy5yZW1vdmVOZXdJdGVtKHRoaXMucHJvcHMuZ3JpZCwgcm93SW5kZXgpfVxuICAgICAgICAgIC8+XG4gICAgICAgICksXG4gICAgICAgIGNlbGxGaWx0ZXI6ICgpID0+IG51bGwsXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbHVtbnM7XG4gIH07XG5cbiAgaXNDZWxsRWRpdGVkID0gKHJvd0luZGV4LCBjb2wsIGNlbGxUeXBlKSA9PiB7XG4gICAgaWYgKGNlbGxUeXBlICE9PSAnZWRpdCcpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgaWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgIHJldHVybiAhIXRoaXMucHJvcHMuZWRpdERhdGEuZ2V0SW4oW2lkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gIH07XG5cbiAgaGFuZGxlQWZ0ZXJBZGRJdGVtID0gKCkgPT4ge1xuICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgPSB0cnVlO1xuICB9O1xuXG4gIGhhbmRsZUFmdGVyRWRpdFByZXNzID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuc2l6ZSkge1xuICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSB0cnVlO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGN1cnJlbnRSb3c6IHVuZGVmaW5lZCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVBZnRlclZhbGlkYXRpb25FcnJvciA9ICgpID0+IHtcbiAgICB0aGlzLmZvY3VzVG9FcnJvckNlbGwgPSB0cnVlO1xuICB9O1xuXG4gIGhhbmRsZVJvd0NsaWNrID0gKGUsIHJvd0luZGV4KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMucm93U2VsZWN0ICYmICF0aGlzLnByb3BzLmlzQ3JlYXRpbmcgJiYgIXRoaXMucHJvcHMuaXNFZGl0aW5nKSB7XG4gICAgICBpZiAoZS5jdHJsS2V5IHx8IGUuc2hpZnRLZXkpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0U2VsZWN0aW9uKClcbiAgICAgICAgICAucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICB9XG4gICAgICAvLyBEb24ndCB0cmlnZ2VyIHNlbGVjdGlvbiBjaGFuZ2Ugb24gd2hlbiB1c2VyIGNsaWNrcyBvbiBzcGVjaWFsIGNlbGxzIGxpa2UgY2hlY2tib3gvZXh0cmFcbiAgICAgIC8vIENoZWNrIHRoYXQgY2xpY2tlZCBub2RlJ3MgcGFyZW50IG9yIHBhcmVudCdzIHBhcmVudCBkb2Vzbid0IGhhdmUgbm8tcm93LXNlbGVjdCBjbGFzc1xuICAgICAgY29uc3QgeyBwYXJlbnROb2RlIH0gPSBlLnRhcmdldDtcbiAgICAgIGNvbnN0IHBhcmVudDFjbGFzcyA9IHBhcmVudE5vZGUuY2xhc3NOYW1lICYmIHBhcmVudE5vZGUuY2xhc3NOYW1lLmluZGV4T2ZcbiAgICAgICAgPyBwYXJlbnROb2RlLmNsYXNzTmFtZVxuICAgICAgICA6ICcnO1xuICAgICAgY29uc3QgcGFyZW50MmNsYXNzID0gcGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZSAmJiBwYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lLmluZGV4T2YgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICA/IHBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWVcbiAgICAgICAgOiAnJztcbiAgICAgIGNvbnN0IHBhcmVudDNjbGFzcyA9IHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZSAmJiBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUuaW5kZXhPZiAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgID8gcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgIDogJyc7XG4gICAgICBjb25zdCBwYXJlbnQ0Y2xhc3MgPSBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZSAmJiBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZS5pbmRleE9mIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgPyBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZVxuICAgICAgICA6ICcnO1xuICAgICAgaWYgKFxuICAgICAgICBwYXJlbnQxY2xhc3MuaW5kZXhPZignbm8tcm93LXNlbGVjdCcpID09PSAtMSAmJlxuICAgICAgICBwYXJlbnQyY2xhc3MuaW5kZXhPZignbm8tcm93LXNlbGVjdCcpID09PSAtMSAmJlxuICAgICAgICBwYXJlbnQzY2xhc3MuaW5kZXhPZignbm8tcm93LXNlbGVjdCcpID09PSAtMSAmJlxuICAgICAgICBwYXJlbnQ0Y2xhc3MuaW5kZXhPZignbm8tcm93LXNlbGVjdCcpID09PSAtMVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMucHJvcHMuaXRlbVNlbGVjdGlvbkNoYW5nZShcbiAgICAgICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgdGhpcy5wcm9wcy5tdWx0aVNlbGVjdCAmJiBlLmN0cmxLZXksXG4gICAgICAgICAgdGhpcy5wcm9wcy5tdWx0aVNlbGVjdCAmJiBlLnNoaWZ0S2V5LFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5vblJvd0NsaWNrKSB7XG4gICAgICB0aGlzLnByb3BzLm9uUm93Q2xpY2soZSwgcm93SW5kZXgsIHRoaXMucHJvcHMuZGF0YS5nZXQocm93SW5kZXgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgaGFuZGxlQ29udGV4dE1lbnUgPSAoZSwgcm93SW5kZXgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5jb250ZXh0TWVudUl0ZW1zKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGl0ZW1TZWxlY3Rpb25DaGFuZ2UsXG4gICAgICAgIHNlbGVjdGVkSXRlbXMsXG4gICAgICAgIGdyaWQsXG4gICAgICAgIGRhdGEsXG4gICAgICB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY29udGV4dE1lbnVPcGVuOiB0cnVlLFxuICAgICAgICBjb250ZXh0TWVudVg6IGUuY2xpZW50WCxcbiAgICAgICAgY29udGV4dE1lbnVZOiBlLmNsaWVudFksXG4gICAgICB9KTtcbiAgICAgIC8vIElmIGNsaWNrZWQgaXRlbSBpcyBub3Qgc2VsZWN0ZWQsIGNoYW5nZSBzZWxlY3Rpb24gdG8gaXRcbiAgICAgIGlmICghc2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhkYXRhLmdldEluKFtyb3dJbmRleCwgLi4uZ3JpZC5pZEtleVBhdGhdKSkpIHtcbiAgICAgICAgaXRlbVNlbGVjdGlvbkNoYW5nZShncmlkLCByb3dJbmRleCk7XG4gICAgICB9XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25Eb2N1bWVudENsaWNrKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgaGFuZGxlQ29udGV4dE1lbnVJdGVtQ2xpY2sgPSAob25DbGljaywgc2VsZWN0ZWRJdGVtcywgc2VsZWN0ZWREYXRhKSA9PiAoKSA9PiB7XG4gICAgb25DbGljayhzZWxlY3RlZEl0ZW1zLCBzZWxlY3RlZERhdGEpO1xuICB9O1xuXG4gIGhhbmRsZVJvd0hlaWdodEdldHRlciA9IHJvd0luZGV4ID0+XG4gICAgdGhpcy5wcm9wcy5yb3dIZWlnaHRHZXR0ZXIodGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCksIHJvd0luZGV4KTtcblxuICByZW5kZXJDZWxsID0gY29sID0+IChjZWxsUHJvcHMpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBpc0NyZWF0aW5nLFxuICAgICAgaXNFZGl0aW5nLFxuICAgICAgY3JlYXRlRGF0YSxcbiAgICAgIHNlbGVjdGVkQ2VsbCxcbiAgICAgIGdyaWQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyByb3dJbmRleCwgLi4ucHJvcHMgfSA9IGNlbGxQcm9wcztcbiAgICBsZXQgY2VsbDtcbiAgICBsZXQgY2VsbFR5cGUgPSAndmlldyc7XG4gICAgbGV0IGV4dHJhUm93Q291bnQgPSAwOyAvLyBob3cgbWFueSByb3dzIHRvIGlnbm9yZSBmcm9tIHRvcCwgbmV3ICsgZmlsdGVyIHJvd3NcbiAgICBpZiAoaXNDcmVhdGluZykgZXh0cmFSb3dDb3VudCA9IGNyZWF0ZURhdGEuc2l6ZTtcbiAgICBpZiAoaXNDcmVhdGluZykge1xuICAgICAgaWYgKHJvd0luZGV4IDw9IChleHRyYVJvd0NvdW50IC0gMSkpIHtcbiAgICAgICAgaWYgKGNvbC5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY2VsbCA9IGNvbC5jZWxsQ3JlYXRlKHJvd0luZGV4KTtcbiAgICAgICAgICBjZWxsVHlwZSA9ICdjcmVhdGUnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNlbGwgPSBudWxsO1xuICAgICAgICAgIGNlbGxUeXBlID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2VsbCA9IGNvbC5jZWxsKHJvd0luZGV4IC0gZXh0cmFSb3dDb3VudCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc0VkaXRpbmcgJiYgY29sLmNlbGxFZGl0KSB7XG4gICAgICBjZWxsID0gY29sLmNlbGxFZGl0KHJvd0luZGV4IC0gZXh0cmFSb3dDb3VudCk7XG4gICAgICBjZWxsVHlwZSA9ICdlZGl0JztcbiAgICB9IGVsc2Uge1xuICAgICAgY2VsbCA9IGNvbC5jZWxsKHJvd0luZGV4IC0gZXh0cmFSb3dDb3VudCk7XG4gICAgfVxuICAgIGNvbnN0IGlzU3BlY2lhbCA9IHByb3BzLmNvbHVtbktleSA9PT0gJ3NlbGVjdGlvbkNoZWNrYm94JyB8fCBwcm9wcy5jb2x1bW5LZXkgPT09ICdleHRyYUNvbHVtbic7XG4gICAgaWYgKChjZWxsVHlwZSA9PT0gJ3ZpZXcnIHx8IGNlbGxUeXBlID09PSAnZWRpdCcgfHwgY2VsbFR5cGUgPT09ICdjcmVhdGUnKSAmJiAhaXNTcGVjaWFsKSB7XG4gICAgICBjb25zdCBnZXRSb3dJbmRleCA9IChjZWxsVHlwZSA9PT0gJ2NyZWF0ZScpID8gcm93SW5kZXggOiAocm93SW5kZXggLSBleHRyYVJvd0NvdW50KTtcbiAgICAgIGNvbnN0IG1lc3NhZ2VEYXRhID0gdGhpcy5nZXRDZWxsTWVzc2FnZXMoZ2V0Um93SW5kZXgsIGNvbCwgY2VsbFR5cGUpO1xuICAgICAgY29uc3QgaXNFZGl0ZWQgPSB0aGlzLmlzQ2VsbEVkaXRlZChnZXRSb3dJbmRleCwgY29sLCBjZWxsVHlwZSk7XG4gICAgICBjb25zdCBjbGFzc05hbWUgPSAoc2VsZWN0ZWRDZWxsLmdldCgncm93SW5kZXgnKSA9PT0gcm93SW5kZXggJiYgc2VsZWN0ZWRDZWxsLmdldCgnY29sdW1uS2V5JykgPT09IHByb3BzLmNvbHVtbktleSkgP1xuICAgICAgICAnb2MtZGF0YWdyaWQtY2VsbCBpcy1zZWxlY3RlZCcgOiAnb2MtZGF0YWdyaWQtY2VsbCc7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Q2VsbFxuICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgICAgICBzdHlsZT17Y29sLnN0eWxlfVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2VsbFNlbGVjdChjZWxsVHlwZSwgcm93SW5kZXgsIHByb3BzLmNvbHVtbktleSl9XG4gICAgICAgID5cbiAgICAgICAgICA8Q2VsbFRvb2x0aXBcbiAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZENlbGwtJHtncmlkLmlkfS0ke3Byb3BzLmNvbHVtbktleX0tJHtyb3dJbmRleH1gfVxuICAgICAgICAgICAgaXNFZGl0ZWQ9e2lzRWRpdGVkfVxuICAgICAgICAgICAgaXNFcnJvcj17ISFtZXNzYWdlRGF0YS5lcnJvck1lc3NhZ2V9XG4gICAgICAgICAgICBpc1dhcm5pbmc9eyEhbWVzc2FnZURhdGEud2FybmluZ01lc3NhZ2V9XG4gICAgICAgICAgICBpbmZvTWVzc2FnZT17bWVzc2FnZURhdGEuaW5mb01lc3NhZ2V9XG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U9e21lc3NhZ2VEYXRhLmVycm9yTWVzc2FnZX1cbiAgICAgICAgICAgIHdhcm5pbmdNZXNzYWdlPXttZXNzYWdlRGF0YS53YXJuaW5nTWVzc2FnZX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7Y2VsbH1cbiAgICAgICAgICA8L0NlbGxUb29sdGlwPlxuICAgICAgICA8L0NlbGw+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPENlbGwgey4uLnByb3BzfSBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1jZWxsXCIgc3R5bGU9e2NvbC5zdHlsZX0+e2NlbGx9PC9DZWxsPlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyQ29sdW1ucyA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuYWxsRGF0YVNpemUgJiYgIXRoaXMucHJvcHMuaXNCdXN5ICYmICF0aGlzLnByb3BzLmlzQ3JlYXRpbmcpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxDb2x1bW5cbiAgICAgICAgICBjb2x1bW5LZXk9XCJkYXRhRW1wdHlDb2x1bW5cIlxuICAgICAgICAgIGhlYWRlcj17PENlbGwgc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJyB9fT48TSBpZD1cIkdyaWQuTm9JdGVtc1wiIC8+PC9DZWxsPn1cbiAgICAgICAgICB3aWR0aD17MTB9XG4gICAgICAgICAgaXNSZXNpemFibGU9e2ZhbHNlfVxuICAgICAgICAgIGZsZXhHcm93PXsxfVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLnByb3BzLnZpc2libGVDb2x1bW5zLnNpemUpIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLmlzQnVzeSkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxDb2x1bW5cbiAgICAgICAgICAgIGNvbHVtbktleT1cImRhdGFFbXB0eUNvbHVtblwiXG4gICAgICAgICAgICBoZWFkZXI9ezxDZWxsPiZuYnNwOzwvQ2VsbD59XG4gICAgICAgICAgICB3aWR0aD17MTB9XG4gICAgICAgICAgICBpc1Jlc2l6YWJsZT17ZmFsc2V9XG4gICAgICAgICAgICBmbGV4R3Jvdz17MX1cbiAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPENvbHVtblxuICAgICAgICAgIGNvbHVtbktleT1cImRhdGFFbXB0eUNvbHVtblwiXG4gICAgICAgICAgaGVhZGVyPXs8Q2VsbCBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInIH19PjxNIGlkPVwiR3JpZC5Ob0NvbHVtbnNcIiAvPjwvQ2VsbD59XG4gICAgICAgICAgd2lkdGg9ezEwfVxuICAgICAgICAgIGlzUmVzaXphYmxlPXtmYWxzZX1cbiAgICAgICAgICBmbGV4R3Jvdz17MX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnN0IGNvbHVtbnMgPSB0aGlzLmdlbmVyYXRlQ29sdW1ucygpO1xuICAgIGlmIChjb2x1bW5zLmxlbmdodCA9PT0gMCkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIGNvbHVtbnMubWFwKGNvbCA9PiAoXG4gICAgICA8Q29sdW1uXG4gICAgICAgIGtleT17Y29sLmNvbHVtbktleX1cbiAgICAgICAgY29sdW1uS2V5PXtjb2wuY29sdW1uS2V5fVxuICAgICAgICBoZWFkZXI9e1xuICAgICAgICAgIDxIZWFkZXJDZWxsXG4gICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRIZWFkZXItJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sLmNvbHVtbktleX1gfVxuICAgICAgICAgICAgZ3JpZD17dGhpcy5wcm9wcy5ncmlkfVxuICAgICAgICAgICAgY29sdW1ucz17dGhpcy5wcm9wcy5jb2x1bW5zfVxuICAgICAgICAgICAgY29sdW1uPXtjb2x9XG4gICAgICAgICAgICBjdXJyZW50U29ydENvbHVtbj17dGhpcy5wcm9wcy5zb3J0Q29sdW1ufVxuICAgICAgICAgICAgY3VycmVudFNvcnRPcmRlcj17dGhpcy5wcm9wcy5zb3J0T3JkZXJ9XG4gICAgICAgICAgICBvblNvcnRDaGFuZ2U9e3RoaXMucHJvcHMuc29ydENoYW5nZX1cbiAgICAgICAgICAgIGlzQnVzeT17dGhpcy5wcm9wcy5pc0J1c3l9XG4gICAgICAgICAgICBmaWx0ZXJpbmc9e3RoaXMucHJvcHMuaXNGaWx0ZXJpbmd9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2NvbC5oZWFkZXJ9XG4gICAgICAgICAgPC9IZWFkZXJDZWxsPlxuICAgICAgICB9XG4gICAgICAgIGNlbGw9e3RoaXMucmVuZGVyQ2VsbChjb2wpfVxuICAgICAgICB3aWR0aD17dGhpcy5wcm9wcy5jb2x1bW5XaWR0aHMuZ2V0KGNvbC5jb2x1bW5LZXksIGNvbC53aWR0aCl9XG4gICAgICAgIG1pbldpZHRoPXtjb2wubWluV2lkdGh9XG4gICAgICAgIG1heFdpZHRoPXtjb2wubWF4V2lkdGh9XG4gICAgICAgIGlzUmVzaXphYmxlPXtjb2wuaXNSZXNpemFibGV9XG4gICAgICAgIGZsZXhHcm93PXtjb2wuZmxleEdyb3cgPyBjb2wuZmxleEdyb3cgOiAwfVxuICAgICAgICBmaXhlZD17Y29sLmZpeGVkfVxuICAgICAgICBhbGxvd0NlbGxzUmVjeWNsaW5nPXtjb2wuYWxsb3dDZWxsc1JlY3ljbGluZ31cbiAgICAgIC8+KSk7XG4gIH07XG5cbiAgcmVuZGVyQ29udGV4dE1lbnUgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgY29udGV4dE1lbnVJdGVtcyxcbiAgICAgIGRhdGEsXG4gICAgICBncmlkLFxuICAgICAgc2VsZWN0ZWRJdGVtcyxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7XG4gICAgICBjb250ZXh0TWVudVgsXG4gICAgICBjb250ZXh0TWVudVksXG4gICAgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3Qgc3R5bGUgPSB7XG4gICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgICAgekluZGV4OiAxMDAwMCxcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgdG9wOiBgJHtjb250ZXh0TWVudVl9cHhgLFxuICAgICAgbGVmdDogYCR7Y29udGV4dE1lbnVYfXB4YCxcbiAgICB9O1xuICAgIGNvbnN0IHNlbGVjdGVkRGF0YSA9IGRhdGEuZmlsdGVyKGQgPT4gc2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhkLmdldEluKGdyaWQuaWRLZXlQYXRoKSkpO1xuICAgIHJldHVybiAoXG4gICAgICA8dWwgY2xhc3NOYW1lPVwiZHJvcGRvd24tbWVudSBvYy1kYXRhZ3JpZC1jb250ZXh0LW1lbnUgb3BlblwiIHN0eWxlPXtzdHlsZX0+XG4gICAgICAgIHtjb250ZXh0TWVudUl0ZW1zICYmIGNvbnRleHRNZW51SXRlbXMubWFwICYmIGNvbnRleHRNZW51SXRlbXMubWFwKChpdGVtLCBpKSA9PiB7XG4gICAgICAgICAgbGV0IHsgZGlzYWJsZWQgfSA9IGl0ZW07XG4gICAgICAgICAgaWYgKHR5cGVvZiBpdGVtLmRpc2FibGVkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBkaXNhYmxlZCA9IGl0ZW0uZGlzYWJsZWQoc2VsZWN0ZWRJdGVtcywgc2VsZWN0ZWREYXRhKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxNZW51SXRlbVxuICAgICAgICAgICAgICBrZXk9e2l9IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgICAgICAgaGVhZGVyPXtpdGVtLmhlYWRlcn1cbiAgICAgICAgICAgICAgZGl2aWRlcj17aXRlbS5kaXZpZGVyfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAgIHRpdGxlPXtpdGVtLnRpdGxlfVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoZGlzYWJsZWQgfHwgIWl0ZW0ub25DbGljaykgPyBudWxsIDogdGhpcy5oYW5kbGVDb250ZXh0TWVudUl0ZW1DbGljayhcbiAgICAgICAgICAgICAgICBpdGVtLm9uQ2xpY2ssXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRJdGVtcyxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZERhdGEsXG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtpdGVtLnZhbHVlfVxuICAgICAgICAgICAgPC9NZW51SXRlbT5cbiAgICAgICAgICApO1xuICAgICAgICB9KX1cbiAgICAgIDwvdWw+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgZ3JpZENsYXNzTmFtZSA9IGNsYXNzTmFtZXMoe1xuICAgICAgJ29jLWRhdGFncmlkLWNvbnRhaW5lcic6IHRydWUsXG4gICAgICAnd2l0aC1hY3Rpb25iYXInOiB0aGlzLnByb3BzLmlubGluZUVkaXQgJiYgIXRoaXMucHJvcHMuZGlzYWJsZUFjdGlvbkJhcixcbiAgICAgICdpcy1idXN5JzogdGhpcy5wcm9wcy5pc0J1c3ksXG4gICAgICAnaXMtZWRpdGluZyc6IHRoaXMucHJvcHMuaXNFZGl0aW5nLFxuICAgICAgJ2lzLWNyZWF0aW5nJzogdGhpcy5wcm9wcy5pc0NyZWF0aW5nLFxuICAgICAgW3RoaXMucHJvcHMuY2xhc3NOYW1lXTogISF0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICB9KTtcblxuICAgIC8vIGNoZWNrIGlmIHRoZXJlIGlzIGEgbmV3IHJlcXVlc3QgdG8gY2hhbmdlIGVkaXQgbW9kZSBmb2N1c1xuICAgIHRoaXMuc2V0Rm9jdXNUbyh0aGlzLnByb3BzLmZvY3VzVHlwZSk7XG5cbiAgICBsZXQgYWN0aW9uQmFyID0gbnVsbDtcbiAgICBsZXQgYWN0aW9uQmFyUmlnaHQgPSBudWxsO1xuICAgIGxldCBhY3Rpb25CYXJMZWZ0ID0gbnVsbDtcbiAgICBpZiAoXG4gICAgICAodGhpcy5wcm9wcy5hY3Rpb25CYXIgfHxcbiAgICAgICAgdGhpcy5wcm9wcy5pbmxpbmVFZGl0IHx8XG4gICAgICAgIHRoaXMucHJvcHMuZmlsdGVyaW5nIHx8XG4gICAgICAgIHRoaXMucHJvcHMucmVtb3ZpbmcpICYmXG4gICAgICAhdGhpcy5wcm9wcy5kaXNhYmxlQWN0aW9uQmFyXG4gICAgKSB7XG4gICAgICBhY3Rpb25CYXJSaWdodCA9IChcbiAgICAgICAgPEFjdGlvbkJhciBwb3NpdGlvbj1cInJpZ2h0XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1hY3Rpb25iYXItcmlnaHRcIj57dGhpcy5wcm9wcy5hY3Rpb25CYXJ9PC9kaXY+XG4gICAgICAgICAgeyh0aGlzLnByb3BzLmZpbHRlcmluZyAmJiB0aGlzLnByb3BzLmRpc2FibGVEcm9wZG93biAmJlxuICAgICAgICAgICAgIXRoaXMucHJvcHMuZGlzYWJsZUZpbHRlcmluZ0NvbnRyb2xzKSAmJiA8RmlsdGVyaW5nQ29udHJvbHMgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICAgfVxuICAgICAgICAgIHt0aGlzLnByb3BzLmlubGluZUVkaXQgJiZcbiAgICAgICAgICA8SW5saW5lRWRpdENvbnRyb2xzXG4gICAgICAgICAgICBhZnRlckFkZEl0ZW09e3RoaXMuaGFuZGxlQWZ0ZXJBZGRJdGVtfVxuICAgICAgICAgICAgYWZ0ZXJFZGl0UHJlc3M9e3RoaXMuaGFuZGxlQWZ0ZXJFZGl0UHJlc3N9XG4gICAgICAgICAgICBhZnRlclZhbGlkYXRpb25FcnJvcj17dGhpcy5oYW5kbGVBZnRlclZhbGlkYXRpb25FcnJvcn1cbiAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgfVxuICAgICAgICAgIHsodGhpcy5wcm9wcy5kcm9wZG93bk1lbnVJdGVtcyB8fFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5yZW1vdmluZyB8fFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5jb2x1bW5TZXR0aW5ncyB8fFxuICAgICAgICAgICAgKHRoaXMucHJvcHMuZmlsdGVyaW5nICYmXG4gICAgICAgICAgICAgICF0aGlzLnByb3BzLmRpc2FibGVEcm9wZG93bikpICYmIDxEcm9wZG93bkNvbnRyb2xzIHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICAgIH1cbiAgICAgICAgPC9BY3Rpb25CYXI+XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5hY3Rpb25CYXJMZWZ0IHx8IHRoaXMucHJvcHMuZ3JpZEhlYWRlcikge1xuICAgICAgYWN0aW9uQmFyTGVmdCA9IChcbiAgICAgICAgPEFjdGlvbkJhciBwb3NpdGlvbj1cImxlZnRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWdyaWRoZWFkZXJcIj57dGhpcy5wcm9wcy5ncmlkSGVhZGVyfTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtYWN0aW9uYmFyLWxlZnRcIj57dGhpcy5wcm9wcy5hY3Rpb25CYXJMZWZ0fTwvZGl2PlxuICAgICAgICA8L0FjdGlvbkJhcj5cbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChhY3Rpb25CYXJMZWZ0IHx8IGFjdGlvbkJhclJpZ2h0KSB7XG4gICAgICBhY3Rpb25CYXIgPSAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtYWN0aW9uYmFyLWNvbnRhaW5lclwiPlxuICAgICAgICAgIHthY3Rpb25CYXJMZWZ0fVxuICAgICAgICAgIHthY3Rpb25CYXJSaWdodH1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgICBsZXQgcm93c0NvdW50ID1cbiAgICAgICh0aGlzLnByb3BzLnJvd3NDb3VudCB8fCB0aGlzLnByb3BzLnJvd3NDb3VudCA9PT0gMCkgP1xuICAgICAgICB0aGlzLnByb3BzLnJvd3NDb3VudCA6XG4gICAgICAgIHRoaXMucHJvcHMuZGF0YS5zaXplO1xuICAgIGlmICh0aGlzLnByb3BzLmlzQ3JlYXRpbmcpIHJvd3NDb3VudCArPSB0aGlzLnByb3BzLmNyZWF0ZURhdGEuc2l6ZTtcbiAgICBpZiAoIXRoaXMucHJvcHMudmlzaWJsZUNvbHVtbnMuc2l6ZSkgcm93c0NvdW50ID0gMDtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD17YG9jLWRhdGFncmlkLSR7dGhpcy5wcm9wcy5ncmlkLmlkfWB9XG4gICAgICAgIGNsYXNzTmFtZT17Z3JpZENsYXNzTmFtZX1cbiAgICAgICAgc3R5bGU9e3RoaXMucHJvcHMuY29udGFpbmVyU3R5bGV9XG4gICAgICA+XG4gICAgICAgIHt0aGlzLnByb3BzLmlzQnVzeSAmJiA8U3Bpbm5lciAvPn1cbiAgICAgICAge3RoaXMuc3RhdGUuY29udGV4dE1lbnVPcGVuICYmIHRoaXMucmVuZGVyQ29udGV4dE1lbnUoKX1cbiAgICAgICAge2FjdGlvbkJhcn1cbiAgICAgICAgPFJlc3BvbnNpdmVGaXhlZERhdGFUYWJsZVxuICAgICAgICAgIGlkPXt0aGlzLnByb3BzLmdyaWQuaWR9XG4gICAgICAgICAgcm93c0NvdW50PXtyb3dzQ291bnR9XG4gICAgICAgICAgaGVhZGVySGVpZ2h0PXt0aGlzLnByb3BzLmlzRmlsdGVyaW5nID9cbiAgICAgICAgICAgIHRoaXMucHJvcHMuaGVhZGVySGVpZ2h0ICsgdGhpcy5wcm9wcy5maWx0ZXJSb3dIZWlnaHRcbiAgICAgICAgICAgIDogdGhpcy5wcm9wcy5oZWFkZXJIZWlnaHR9XG4gICAgICAgICAgcm93SGVpZ2h0PXt0aGlzLnByb3BzLnJvd0hlaWdodH1cbiAgICAgICAgICBvbkNvbHVtblJlc2l6ZUVuZENhbGxiYWNrPXt0aGlzLm9uQ29sdW1uUmVzaXplRW5kQ2FsbGJhY2t9XG4gICAgICAgICAgaXNDb2x1bW5SZXNpemluZz17ZmFsc2V9XG4gICAgICAgICAgb25Sb3dDbGljaz17dGhpcy5oYW5kbGVSb3dDbGlja31cbiAgICAgICAgICBzY3JvbGxUb0NvbHVtbj17dGhpcy5wcm9wcy5zY3JvbGxUb0NvbHVtbiB8fCB0aGlzLnN0YXRlLmN1cnJlbnRDb2x1bW59XG4gICAgICAgICAgc2Nyb2xsVG9wPXt0aGlzLnByb3BzLnNjcm9sbFRvcH1cbiAgICAgICAgICBzY3JvbGxUb1Jvdz17dGhpcy5nZXRTY3JvbGxUb1JvdygpfVxuICAgICAgICAgIG9uUm93RG91YmxlQ2xpY2s9e3RoaXMucHJvcHMub25Sb3dEb3VibGVDbGlja31cbiAgICAgICAgICBvblJvd01vdXNlRG93bj17dGhpcy5wcm9wcy5vbk1vdXNlRG93bn1cbiAgICAgICAgICBvblJvd01vdXNlRW50ZXI9e3RoaXMucHJvcHMub25Sb3dNb3VzZUVudGVyfVxuICAgICAgICAgIG9uUm93TW91c2VMZWF2ZT17dGhpcy5wcm9wcy5vblJvd01vdXNlTGVhdmV9XG4gICAgICAgICAgb25TY3JvbGxTdGFydD17dGhpcy5wcm9wcy5vblNjcm9sbFN0YXJ0fVxuICAgICAgICAgIG9uU2Nyb2xsRW5kPXt0aGlzLnByb3BzLm9uU2Nyb2xsRW5kfVxuICAgICAgICAgIHJvd0NsYXNzTmFtZUdldHRlcj17dGhpcy5nZXRSb3dDbGFzc05hbWV9XG4gICAgICAgICAgcm93SGVpZ2h0R2V0dGVyPXt0aGlzLnByb3BzLnJvd0hlaWdodEdldHRlciAmJiB0aGlzLmhhbmRsZVJvd0hlaWdodEdldHRlcn1cbiAgICAgICAgICBvbkNvbnRlbnRIZWlnaHRDaGFuZ2U9e3RoaXMucHJvcHMub25Db250ZW50SGVpZ2h0Q2hhbmdlfVxuICAgICAgICAgIG9uUm93Q29udGV4dE1lbnU9e3RoaXMuaGFuZGxlQ29udGV4dE1lbnV9XG4gICAgICAgID5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJDb2x1bW5zKCl9XG4gICAgICAgIDwvUmVzcG9uc2l2ZUZpeGVkRGF0YVRhYmxlPlxuICAgICAgICB7dGhpcy5wcm9wcy5pc0NvbHVtblNldHRpbmdzTW9kYWxPcGVuICYmXG4gICAgICAgIDxDb2x1bW5TZXR0aW5nc01vZGFsXG4gICAgICAgICAgZ3JpZD17dGhpcy5wcm9wcy5ncmlkfVxuICAgICAgICAgIGNvbHVtbnM9e3RoaXMucHJvcHMuY29sdW1uc31cbiAgICAgICAgICB2aXNpYmxlQ29sdW1ucz17dGhpcy5wcm9wcy52aXNpYmxlQ29sdW1uc31cbiAgICAgICAgICBjbG9zZUNvbHVtblNldHRpbmdzTW9kYWw9e3RoaXMucHJvcHMuY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsfVxuICAgICAgICAgIHNhdmVDb2x1bW5TZXR0aW5ncz17dGhpcy5wcm9wcy5zYXZlQ29sdW1uU2V0dGluZ3N9XG4gICAgICAgIC8+XG4gICAgICAgIH1cbiAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERhdGFHcmlkO1xuIl19