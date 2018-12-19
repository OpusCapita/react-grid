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

      var getSelectRef = function getSelectRef(component) {
        if (!component) return null;
        if (component.selectRef.select.select) return component.selectRef.select.select.inputRef;
        return component.selectRef.select.inputRef;
      };

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
        currentCell = getSelectRef(proxy);
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
              nextElement = getSelectRef(nextElement);
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
              _nextElement = getSelectRef(_nextElement);
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
                if (_nextElement2.selectRef) _nextElement2 = getSelectRef(_nextElement2);
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
  };

  this.getCreateItemValue = function (rowIndex, col) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    var val = _this2.props.createData.getIn([rowIndex].concat(col.valueKeyPath), '');
    if (val === null) {
      return '';
    } else if (col.componentType === 'select') {
      return options.selectOptions.find(function (obj) {
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
      return options.selectOptions.find(function (obj) {
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

  this.handleSelectAllCheckBoxOnChange = function () {
    _this2.props.selectAllItemsChange(_this2.props.grid);
  };

  this.handleSelectionCheckBoxOnChange = function (rowIndex) {
    return function () {
      _this2.props.itemSelectionChange(_this2.props.grid, rowIndex, true, false);
    };
  };

  this.generateColumns = function () {
    var _props4 = _this2.props,
        data = _props4.data,
        selectedItems = _props4.selectedItems,
        dateFormat = _props4.dateFormat,
        thousandSeparator = _props4.thousandSeparator,
        decimalSeparator = _props4.decimalSeparator,
        grid = _props4.grid,
        inlineEdit = _props4.inlineEdit,
        filtering = _props4.filtering,
        region = _props4.region,
        intl = _props4.intl,
        selectComponentOptions = _props4.selectComponentOptions,
        isCreating = _props4.isCreating,
        extraColumn = _props4.extraColumn,
        rowSelectCheckboxColumn = _props4.rowSelectCheckboxColumn,
        showSelectAllCheckbox = _props4.showSelectAllCheckbox;


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
            extraColumn.valueRender(data.get(rowIndex), tabIndex)
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

    if (rowSelectCheckboxColumn) {
      columns.push({
        width: 40,
        isResizable: false,
        isSortable: false,
        columnKey: 'selectionCheckbox',
        header: showSelectAllCheckbox && React.createElement(Checkbox, {
          id: 'ocDatagridSelectAllCheckBox-' + grid.id,
          className: 'oc-datagrid-select-all-checkbox-cell no-row-select',
          checked: data.size !== 0 && data.size === selectedItems.size,
          onChange: _this2.handleSelectAllCheckBoxOnChange,
          tabIndex: tabIndex
        }),
        cell: function cell(rowIndex) {
          var rowItem = data.get(rowIndex);
          var itemId = rowItem.getIn(grid.idKeyPath);
          var selected = selectedItems.includes(itemId);
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
            id: 'oc-datagrid-new-item-remove-' + grid.id + '-' + rowIndex,
            type: 'indicator',
            name: 'delete',
            width: 30,
            height: 30,
            style: { padding: '7px' },
            onClick: function onClick() {
              return _this2.props.removeNewItem(grid, rowIndex);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiTWFwIiwiTGlzdCIsImNvbm5lY3QiLCJpbmplY3RJbnRsIiwiRm9ybWF0dGVkTWVzc2FnZSIsIk0iLCJDb2x1bW4iLCJDZWxsIiwiTWVudUl0ZW0iLCJjbGFzc05hbWVzIiwiSWNvbiIsIlNwaW5uZXIiLCJDaGVja2JveCIsIlJlc3BvbnNpdmVGaXhlZERhdGFUYWJsZSIsIkhlYWRlckNlbGwiLCJBY3Rpb25CYXIiLCJJbmxpbmVFZGl0Q29udHJvbHMiLCJGaWx0ZXJpbmdDb250cm9scyIsIkRyb3Bkb3duQ29udHJvbHMiLCJkYXRhZ3JpZEFjdGlvbnMiLCJDZWxsVG9vbHRpcCIsIkNvbHVtblNldHRpbmdzTW9kYWwiLCJwcm9wVHlwZXMiLCJkZWZhdWx0UHJvcHMiLCJLRVlfQ09ERVMiLCJwYWdpbmF0aW9uIiwiVXRpbHMiLCJHcmlkQ29sdW1uU2VydmljZSIsIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwib3duUHJvcHMiLCJHUklEIiwiZ3JpZCIsImlzQnVzeSIsImRhdGFncmlkIiwiZ2V0SW4iLCJpZCIsImlzRWRpdGluZyIsImlzQ3JlYXRpbmciLCJpc0ZpbHRlcmluZyIsImlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW4iLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwidmlzaWJsZUNvbHVtbnMiLCJjb2x1bW5XaWR0aHMiLCJzZWxlY3RlZENlbGwiLCJzZWxlY3RlZEl0ZW1zIiwiZGF0YSIsImVkaXREYXRhIiwiY3JlYXRlRGF0YSIsImZpbHRlckRhdGEiLCJjZWxsTWVzc2FnZXMiLCJjcmVhdGVDZWxsTWVzc2FnZXMiLCJhbGxEYXRhU2l6ZSIsInNpemUiLCJsYW5ndWFnZSIsImdldExhbmd1YWdlIiwidXNlciIsInJlZ2lvbiIsImdldFJlZ2lvbiIsImRhdGVGb3JtYXQiLCJnZXREYXRlRm9ybWF0IiwidGhvdXNhbmRTZXBhcmF0b3IiLCJnZXRUaG91c2FuZFNlcGFyYXRvciIsImRlY2ltYWxTZXBhcmF0b3IiLCJnZXREZWNpbWFsU2VwYXJhdG9yIiwiZm9yY2VSZWZyZXNoVGltZXN0YW1wIiwiZ2V0IiwiZm9jdXNUeXBlIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwiRGF0YUdyaWQiLCJwcm9wcyIsImN1cnJlbnRSb3ciLCJjdXJyZW50Q29sdW1uIiwiY29udGV4dE1lbnVPcGVuIiwiY29udGV4dE1lbnVYIiwiY29udGV4dE1lbnVZIiwiY2VsbFJlZnMiLCJjcmVhdGVDZWxsUmVmcyIsImZvY3VzVG9DcmVhdGVDZWxsIiwiZm9jdXNUb0VkaXRDZWxsIiwiZm9jdXNUb0Vycm9yQ2VsbCIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwiZG9jdW1lbnQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwib25Eb2N1bWVudENsaWNrIiwiaW52YWxpZGF0ZSIsInJlbmRlciIsImdyaWRDbGFzc05hbWUiLCJpbmxpbmVFZGl0IiwiZGlzYWJsZUFjdGlvbkJhciIsImNsYXNzTmFtZSIsInNldEZvY3VzVG8iLCJhY3Rpb25CYXIiLCJhY3Rpb25CYXJSaWdodCIsImFjdGlvbkJhckxlZnQiLCJmaWx0ZXJpbmciLCJyZW1vdmluZyIsImRpc2FibGVEcm9wZG93biIsImRpc2FibGVGaWx0ZXJpbmdDb250cm9scyIsImhhbmRsZUFmdGVyQWRkSXRlbSIsImhhbmRsZUFmdGVyRWRpdFByZXNzIiwiaGFuZGxlQWZ0ZXJWYWxpZGF0aW9uRXJyb3IiLCJkcm9wZG93bk1lbnVJdGVtcyIsImNvbHVtblNldHRpbmdzIiwiZ3JpZEhlYWRlciIsInJvd3NDb3VudCIsImNvbnRhaW5lclN0eWxlIiwicmVuZGVyQ29udGV4dE1lbnUiLCJoZWFkZXJIZWlnaHQiLCJmaWx0ZXJSb3dIZWlnaHQiLCJyb3dIZWlnaHQiLCJvbkNvbHVtblJlc2l6ZUVuZENhbGxiYWNrIiwiaGFuZGxlUm93Q2xpY2siLCJzY3JvbGxUb0NvbHVtbiIsInNjcm9sbFRvcCIsImdldFNjcm9sbFRvUm93Iiwib25Sb3dEb3VibGVDbGljayIsIm9uTW91c2VEb3duIiwib25Sb3dNb3VzZUVudGVyIiwib25Sb3dNb3VzZUxlYXZlIiwib25TY3JvbGxTdGFydCIsIm9uU2Nyb2xsRW5kIiwiZ2V0Um93Q2xhc3NOYW1lIiwicm93SGVpZ2h0R2V0dGVyIiwiaGFuZGxlUm93SGVpZ2h0R2V0dGVyIiwib25Db250ZW50SGVpZ2h0Q2hhbmdlIiwiaGFuZGxlQ29udGV4dE1lbnUiLCJyZW5kZXJDb2x1bW5zIiwiY29sdW1ucyIsImNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbCIsInNhdmVDb2x1bW5TZXR0aW5ncyIsImNoaWxkcmVuIiwiUHVyZUNvbXBvbmVudCIsImNvbnRleHRNZW51SXRlbXMiLCJzZXRTdGF0ZSIsIm5ld0NvbHVtbldpZHRoIiwiY29sdW1uS2V5IiwicmVzaXplQ29sdW1uIiwib25DZWxsS2V5RG93biIsInJvd0luZGV4IiwiY29sIiwiZSIsImNyZWF0ZSIsImVuYWJsZUFycm93TmF2aWdhdGlvbiIsImFycm93S2V5cyIsIkRPV04iLCJVUCIsIkxFRlQiLCJSSUdIVCIsIm9uTGFzdENlbGxUYWJQcmVzcyIsImdyaWRDb2x1bW5zIiwiZ2V0Q29sdW1uS2V5QnlJbmRleCIsImdldENvbHVtbktleSIsImkiLCJyb3dzU2l6ZSIsImN1cnJlbnRDZWxsIiwicHJveHkiLCJnZXRTZWxlY3RSZWYiLCJjb21wb25lbnQiLCJzZWxlY3RSZWYiLCJzZWxlY3QiLCJpbnB1dFJlZiIsImlzQ3Vyc29yQXRTdGFydCIsInR5cGUiLCJzZWxlY3Rpb25TdGFydCIsImlzQ3Vyc29yQXRFbmQiLCJzZWxlY3Rpb25FbmQiLCJ2YWx1ZSIsImxlbmd0aCIsImluY2x1ZGVzIiwia2V5Q29kZSIsInByZXZlbnREZWZhdWx0IiwiRU5URVIiLCJFU0MiLCJhZGROZXdJdGVtIiwiZ2V0Q29sdW1uRGVmYXVsdFZhbHVlcyIsIm5leHRFbGVtZW50IiwibWVudUlzT3BlbiIsIm1vdmVDZWxsRm9jdXMiLCJUQUIiLCJjb2x1bW5JbmQiLCJmaW5kSW5kZXgiLCJjIiwidmFsdWVLZXlQYXRoIiwiam9pbiIsImRpc2FibGVkIiwicm93SW5kIiwic2hpZnRLZXkiLCJvbkVkaXRDZWxsS2V5RG93biIsIm9uQ3JlYXRlQ2VsbEtleURvd24iLCJvbkZpbHRlckNlbGxWYWx1ZUNoYW5nZSIsInZhbHVlUGFyc2VyIiwiZXZlbnRPckRhdGEiLCJyYXdWYWx1ZSIsInRhcmdldCIsInVuZGVmaW5lZCIsImZpbHRlckNlbGxWYWx1ZUNoYW5nZSIsIm9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlIiwiY3JlYXRlQ2VsbFZhbHVlQ2hhbmdlIiwib25DcmVhdGVWYWx1ZUNoYW5nZSIsIm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlIiwibWF0Y2hWYWx1ZSIsIm5ld1ZhbHVlS2V5UGF0aCIsInYiLCJuZXdWYWx1ZSIsInZhbGlkYXRvcnMiLCJjcmVhdGVDZWxsVmFsdWVWYWxpZGF0ZSIsIm9uRWRpdENlbGxWYWx1ZUNoYW5nZSIsImRhdGFJZCIsImdldERhdGFJZEJ5Um93SW5kZXgiLCJlZGl0Q2VsbFZhbHVlQ2hhbmdlIiwib25FZGl0VmFsdWVDaGFuZ2UiLCJlZGl0Q2VsbFZhbHVlVmFsaWRhdGUiLCJvbkNyZWF0ZUNlbGxCbHVyIiwib25DcmVhdGVCbHVyIiwiZ2V0RWRpdEl0ZW1WYWx1ZSIsIm9uRWRpdENlbGxCbHVyIiwib25FZGl0Qmx1ciIsIm9uQ2VsbEZvY3VzIiwiY2VsbFR5cGUiLCJpbnB1dFR5cGUiLCJjZWxsU2VsZWN0aW9uQ2hhbmdlIiwiY2VsbFNlbGVjdCIsImlkS2V5UGF0aCIsImdldFNlbGVjdGVkSXRlbUluZGV4IiwiaW5kZXgiLCJvcHRpb25zIiwiZWRpdFZhbHVlIiwib3JpZ2luYWxWYWx1ZSIsImNvbXBvbmVudFR5cGUiLCJzZWxlY3RPcHRpb25zIiwiZmluZCIsIm9iaiIsIlN0cmluZyIsInJlcGxhY2UiLCJnZXRDcmVhdGVJdGVtVmFsdWUiLCJ2YWwiLCJnZXRGaWx0ZXJJdGVtVmFsdWUiLCJnZXRDb21wb25lbnREaXNhYmxlZFN0YXRlIiwibW9kZSIsImNvbXBvbmVudERpc2FibGVkIiwiZGlzYWJsZUVkaXRpbmciLCJkaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaCIsIm1hdGNoVmFsdWVLZXlQYXRoIiwicm93Q2xhc3NOYW1lcyIsImV4dHJhUm93Q291bnQiLCJwdXNoIiwiaW5kZXhPZiIsInJvd0NsYXNzTmFtZUdldHRlciIsImdldENlbGxNZXNzYWdlcyIsInJldHVybkRhdGEiLCJpbmZvTWVzc2FnZSIsImVycm9yTWVzc2FnZSIsIndhcm5pbmdNZXNzYWdlIiwic2Nyb2xsVG9Sb3ciLCJzY3JvbGxOZXdSb3ciLCJmaXJzdCIsImZvY3VzVG8iLCJwcmV2Rm9jdXNUbyIsImZvY3VzVG9MYXN0Um93IiwiaGFuZGxlQ2VsbFNlbGVjdCIsImhhbmRsZUNyZWF0ZUNlbGxSZWYiLCJyZWYiLCJmb2N1cyIsImhhbmRsZUVkaXRDZWxsUmVmIiwic2VsZWN0ZWRSb3dJbmRleCIsImNvbHVtbkluZGV4IiwiZWxlbWVudFR5cGVzIiwic2V0VGltZW91dCIsImhhbmRsZVNlbGVjdEFsbENoZWNrQm94T25DaGFuZ2UiLCJzZWxlY3RBbGxJdGVtc0NoYW5nZSIsImhhbmRsZVNlbGVjdGlvbkNoZWNrQm94T25DaGFuZ2UiLCJpdGVtU2VsZWN0aW9uQ2hhbmdlIiwiZ2VuZXJhdGVDb2x1bW5zIiwiaW50bCIsInNlbGVjdENvbXBvbmVudE9wdGlvbnMiLCJleHRyYUNvbHVtbiIsInJvd1NlbGVjdENoZWNrYm94Q29sdW1uIiwic2hvd1NlbGVjdEFsbENoZWNrYm94IiwidGFiSW5kZXgiLCJ3aWR0aCIsImlzUmVzaXphYmxlIiwiaXNTb3J0YWJsZSIsImNlbGwiLCJ2YWx1ZVJlbmRlciIsImNlbGxFZGl0IiwiY2VsbENyZWF0ZSIsImNlbGxGaWx0ZXIiLCJoZWFkZXIiLCJyb3dJdGVtIiwiaXRlbUlkIiwic2VsZWN0ZWQiLCJmb3JFYWNoIiwidmlzaWJsZUNvbHVtbktleSIsIm9yZ0NvbCIsInZhbHVlRW1wdHlDaGVja2VyIiwiZ2V0VmFsdWVFbXB0eUNoZWNrZXIiLCJmb3JtYXQiLCJpc1JlcXVpcmVkIiwiY29sdW1uIiwiYmFzZUNvbHVtbiIsImNvbHVtbkZ1bmN0aW9ucyIsImVkaXQiLCJnZXRJdGVtVmFsdWUiLCJvbkNlbGxWYWx1ZUNoYW5nZSIsIm9uQ2VsbEJsdXIiLCJoYW5kbGVDZWxsUmVmIiwiZmlsdGVyIiwiY2VsbFByb3BzIiwiY29sdW1uQ2VsbCIsImNvbXBvbmVudFR5cGVQcm9wcyIsImNvbHVtbkNvbXBvbmVudFR5cGUiLCJwYWRkaW5nIiwicmVtb3ZlTmV3SXRlbSIsImlzQ2VsbEVkaXRlZCIsInJvd1NlbGVjdCIsImN0cmxLZXkiLCJnZXRTZWxlY3Rpb24iLCJyZW1vdmVBbGxSYW5nZXMiLCJwYXJlbnROb2RlIiwicGFyZW50MWNsYXNzIiwicGFyZW50MmNsYXNzIiwicGFyZW50M2NsYXNzIiwicGFyZW50NGNsYXNzIiwibXVsdGlTZWxlY3QiLCJvblJvd0NsaWNrIiwic3RvcFByb3BhZ2F0aW9uIiwiY2xpZW50WCIsImNsaWVudFkiLCJhZGRFdmVudExpc3RlbmVyIiwiaGFuZGxlQ29udGV4dE1lbnVJdGVtQ2xpY2siLCJvbkNsaWNrIiwic2VsZWN0ZWREYXRhIiwicmVuZGVyQ2VsbCIsImlzU3BlY2lhbCIsImdldFJvd0luZGV4IiwibWVzc2FnZURhdGEiLCJpc0VkaXRlZCIsInN0eWxlIiwidGV4dEFsaWduIiwibGVuZ2h0IiwibWFwIiwic29ydENoYW5nZSIsIm1pbldpZHRoIiwibWF4V2lkdGgiLCJmbGV4R3JvdyIsImZpeGVkIiwiYWxsb3dDZWxsc1JlY3ljbGluZyIsImRpc3BsYXkiLCJ6SW5kZXgiLCJwb3NpdGlvbiIsInRvcCIsImxlZnQiLCJkIiwiaXRlbSIsImRpdmlkZXIiLCJ0aXRsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsU0FBU0MsR0FBVCxFQUFjQyxJQUFkLFFBQTBCLFdBQTFCO0FBQ0EsU0FBU0MsT0FBVCxRQUF3QixhQUF4QjtBQUNBLFNB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LEdBQWpCLENBQXFCLFVBQUNhLElBQUQsRUFBT3pNLENBQVAsRUFBYTtBQUFBLFlBQ3ZFZ0MsUUFEdUUsR0FDMUR5SyxJQUQwRCxDQUN2RXpLLFFBRHVFOztBQUU3RSxZQUFJLE9BQU95SyxLQUFLekssUUFBWixLQUF5QixVQUE3QixFQUF5QztBQUN2Q0EscUJBQVd5SyxLQUFLekssUUFBTCxDQUFjNUksYUFBZCxFQUE2QitSLFlBQTdCLENBQVg7QUFDRDtBQUNELGVBQ0U7QUFBQyxrQkFBRDtBQUFBO0FBQ0UsaUJBQUtuTCxDQURQLENBQ1U7QUFEVixjQUVFLFFBQVF5TSxLQUFLbEUsTUFGZjtBQUdFLHFCQUFTa0UsS0FBS0MsT0FIaEI7QUFJRSxzQkFBVTFLLFFBSlo7QUFLRSxtQkFBT3lLLEtBQUtFLEtBTGQ7QUFNRSxxQkFBVTNLLFlBQVksQ0FBQ3lLLEtBQUt2QixPQUFuQixHQUE4QixJQUE5QixHQUFxQyxPQUFLRCwwQkFBTCxDQUM1Q3dCLEtBQUt2QixPQUR1QyxFQUU1QzlSLGFBRjRDLEVBRzVDK1IsWUFINEM7QUFOaEQ7QUFZR3NCLGVBQUszTDtBQVpSLFNBREY7QUFnQkQsT0FyQjRDO0FBRC9DLEtBREY7QUEwQkQsRzs7OztBQXdISCxlQUFlbEcsUUFBZiIsImZpbGUiOiJkYXRhZ3JpZC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1sb25lbHktaWYsIHByZWZlci10ZW1wbGF0ZSwgcmVhY3QvcmVxdWlyZS1kZWZhdWx0LXByb3BzICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTWFwLCBMaXN0IH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge1xuICBpbmplY3RJbnRsLFxuICBGb3JtYXR0ZWRNZXNzYWdlIGFzIE0sXG59IGZyb20gJ3JlYWN0LWludGwnO1xuaW1wb3J0IHsgQ29sdW1uLCBDZWxsIH0gZnJvbSAnZml4ZWQtZGF0YS10YWJsZS0yJztcbmltcG9ydCB7IE1lbnVJdGVtIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHsgSWNvbiB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWljb25zJztcbmltcG9ydCBTcGlubmVyIGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXNwaW5uZXInO1xuaW1wb3J0IENoZWNrYm94IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWNoZWNrYm94JztcbmltcG9ydCAnZml4ZWQtZGF0YS10YWJsZS0yL2Rpc3QvZml4ZWQtZGF0YS10YWJsZS5jc3MnO1xuXG5pbXBvcnQgUmVzcG9uc2l2ZUZpeGVkRGF0YVRhYmxlIGZyb20gJy4vcmVzcG9uc2l2ZS1maXhlZC1kYXRhLXRhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgSGVhZGVyQ2VsbCBmcm9tICcuL2hlYWRlci1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgQWN0aW9uQmFyIGZyb20gJy4vYWN0aW9uLWJhci5jb21wb25lbnQnO1xuaW1wb3J0IElubGluZUVkaXRDb250cm9scyBmcm9tICcuL2lubGluZS1lZGl0LWNvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgRmlsdGVyaW5nQ29udHJvbHMgZnJvbSAnLi9maWx0ZXJpbmctY29udHJvbHMuY29tcG9uZW50JztcbmltcG9ydCBEcm9wZG93bkNvbnRyb2xzIGZyb20gJy4vZHJvcGRvd24tY29udHJvbHMuY29tcG9uZW50JztcbmltcG9ydCAqIGFzIGRhdGFncmlkQWN0aW9ucyBmcm9tICcuL2RhdGFncmlkLmFjdGlvbnMnO1xuaW1wb3J0IENlbGxUb29sdGlwIGZyb20gJy4vY2VsbC10b29sdGlwLmNvbXBvbmVudCc7XG5pbXBvcnQgQ29sdW1uU2V0dGluZ3NNb2RhbCBmcm9tICcuL2NvbHVtbi1zZXR0aW5ncy9jb2x1bW4tc2V0dGluZ3MuY29tcG9uZW50JztcbmltcG9ydCB7IHByb3BUeXBlcywgZGVmYXVsdFByb3BzIH0gZnJvbSAnLi9kYXRhZ3JpZC5wcm9wcyc7XG5pbXBvcnQgeyBLRVlfQ09ERVMgfSBmcm9tICcuL2RhdGFncmlkLmNvbnN0YW50cyc7XG5pbXBvcnQgcGFnaW5hdGlvbiBmcm9tICcuL3BhZ2luYXRpb24uY29tcG9uZW50JztcbmltcG9ydCBVdGlscyBmcm9tICcuL2RhdGFncmlkLnV0aWxzJztcbmltcG9ydCBHcmlkQ29sdW1uU2VydmljZSBmcm9tICcuL2NvbHVtbi1zZXJ2aWNlL2NvbHVtbi1zZXJ2aWNlJztcbmltcG9ydCAnLi9kYXRhZ3JpZC5jb21wb25lbnQuc2Nzcyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSwgb3duUHJvcHMpID0+IHtcbiAgY29uc3QgR1JJRCA9IG93blByb3BzLmdyaWQ7XG4gIHJldHVybiB7XG4gICAgaXNCdXN5OiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnaXNCdXN5J10sIHRydWUpLFxuICAgIGlzRWRpdGluZzogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2lzRWRpdGluZyddLCBmYWxzZSksXG4gICAgaXNDcmVhdGluZzogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2lzQ3JlYXRpbmcnXSwgZmFsc2UpLFxuICAgIGlzRmlsdGVyaW5nOlxuICAgICAgc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdpc0ZpbHRlcmluZyddLCBmYWxzZSksXG4gICAgaXNDb2x1bW5TZXR0aW5nc01vZGFsT3BlbjpcbiAgICAgIHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdjb2x1bW5TZXR0aW5nc01vZGFsJywgJ29wZW4nXSwgZmFsc2UpLFxuICAgIHNvcnRDb2x1bW46IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ3NvcnRpbmdEYXRhJywgJ3NvcnRDb2x1bW4nXSwgbnVsbCksXG4gICAgc29ydE9yZGVyOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdzb3J0aW5nRGF0YScsICdzb3J0T3JkZXInXSwgbnVsbCksXG4gICAgdmlzaWJsZUNvbHVtbnM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ3Zpc2libGVDb2x1bW5zJ10sIExpc3QoKSksXG4gICAgY29sdW1uV2lkdGhzOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdjb2x1bW5XaWR0aHMnXSwgTWFwKCkpLFxuICAgIHNlbGVjdGVkQ2VsbDogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZWxlY3RlZENlbGwnXSwgTWFwKCkpLFxuICAgIHNlbGVjdGVkSXRlbXM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2VsZWN0ZWRJdGVtcyddLCBMaXN0KCkpLFxuICAgIGRhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnZGF0YSddLCBMaXN0KCkpLFxuICAgIGVkaXREYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2VkaXREYXRhJ10sIE1hcCgpKSxcbiAgICBjcmVhdGVEYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NyZWF0ZURhdGEnXSwgTGlzdCgpKSxcbiAgICBmaWx0ZXJEYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2ZpbHRlckRhdGEnXSwgTWFwKCkpLFxuICAgIGNlbGxNZXNzYWdlczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjZWxsTWVzc2FnZXMnXSwgTWFwKCkpLFxuICAgIGNyZWF0ZUNlbGxNZXNzYWdlczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjcmVhdGVDZWxsTWVzc2FnZXMnXSwgTWFwKCkpLFxuICAgIGFsbERhdGFTaXplOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2FsbERhdGEnXSwgTGlzdCgpKS5zaXplLFxuICAgIGxhbmd1YWdlOiBVdGlscy5nZXRMYW5ndWFnZShHUklELCBzdGF0ZS51c2VyKSxcbiAgICByZWdpb246IFV0aWxzLmdldFJlZ2lvbihHUklELCBzdGF0ZS51c2VyKSxcbiAgICBkYXRlRm9ybWF0OiBVdGlscy5nZXREYXRlRm9ybWF0KEdSSUQsIHN0YXRlLnVzZXIpLFxuICAgIHRob3VzYW5kU2VwYXJhdG9yOiBVdGlscy5nZXRUaG91c2FuZFNlcGFyYXRvcihHUklELCBzdGF0ZS51c2VyKSxcbiAgICBkZWNpbWFsU2VwYXJhdG9yOiBVdGlscy5nZXREZWNpbWFsU2VwYXJhdG9yKEdSSUQsIHN0YXRlLnVzZXIpLFxuICAgIGZvcmNlUmVmcmVzaFRpbWVzdGFtcDogc3RhdGUuZGF0YWdyaWQuZ2V0KCdmb3JjZVJlZnJlc2gnLCAwKSwgLy8gZm9yY2UgcmUtcmVuZGVyIHdoZW4gY2hhbmdlZFxuICAgIGZvY3VzVHlwZTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2ZvY3VzVHlwZSddLCBNYXAoKSksXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkYXRhZ3JpZEFjdGlvbnM7XG5cbkBwYWdpbmF0aW9uXG5AaW5qZWN0SW50bFxuQGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpXG5jbGFzcyBEYXRhR3JpZCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0gcHJvcFR5cGVzO1xuICBzdGF0aWMgZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjdXJyZW50Um93OiAwLFxuICAgICAgY3VycmVudENvbHVtbjogMCxcbiAgICAgIGNvbnRleHRNZW51T3BlbjogZmFsc2UsXG4gICAgICBjb250ZXh0TWVudVg6IG51bGwsXG4gICAgICBjb250ZXh0TWVudVk6IG51bGwsXG4gICAgfTtcbiAgICB0aGlzLmNlbGxSZWZzID0ge307XG4gICAgdGhpcy5jcmVhdGVDZWxsUmVmcyA9IHt9O1xuICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgPSBmYWxzZTtcbiAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IGZhbHNlOyAvLyBUT0RPOiBIYW5kbGUgZm9jdXNpbmcgd2hlbiB0cnVlXG4gICAgdGhpcy5mb2N1c1RvRXJyb3JDZWxsID0gZmFsc2U7IC8vIFRPRE86IEhhbmRsZSBmb2N1c2luZyB3aGVuIHRydWVcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkRvY3VtZW50Q2xpY2spO1xuICAgIHRoaXMucHJvcHMuaW52YWxpZGF0ZSh0aGlzLnByb3BzLmdyaWQpO1xuICB9XG5cbiAgb25Eb2N1bWVudENsaWNrID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmNvbnRleHRNZW51SXRlbXMpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjb250ZXh0TWVudU9wZW46IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkRvY3VtZW50Q2xpY2spO1xuICB9O1xuXG4gIG9uQ29sdW1uUmVzaXplRW5kQ2FsbGJhY2sgPSAobmV3Q29sdW1uV2lkdGgsIGNvbHVtbktleSkgPT4ge1xuICAgIHRoaXMucHJvcHMucmVzaXplQ29sdW1uKHRoaXMucHJvcHMuZ3JpZCwgY29sdW1uS2V5LCBuZXdDb2x1bW5XaWR0aCk7XG4gIH07XG5cblxuICAvKipcbiAgICogQHBhcmFtIHJvd0luZGV4IChpbnQpXG4gICAqIEBwYXJhbSBjb2wgKG9iaikuIENvbHVtbiBvYmplY3QuXG4gICAqIEBwYXJhbSBlLiBPcmlnaW5hbCBLZXlEb3duIGV2ZW50XG4gICAqIEBwYXJhbSBjcmVhdGUgKGJvb2wpLiBJcyB0aGUgY2VsbCBjcmVhdGUgY2VsbCBvciBlZGl0IGNlbGw/XG4gICAqL1xuICBvbkNlbGxLZXlEb3duID0gKHJvd0luZGV4LCBjb2wsIGUsIGNyZWF0ZSA9IGZhbHNlKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuZW5hYmxlQXJyb3dOYXZpZ2F0aW9uKSB7XG4gICAgICBjb25zdCBjZWxsUmVmcyA9IGNyZWF0ZSA/IHRoaXMuY3JlYXRlQ2VsbFJlZnMgOiB0aGlzLmNlbGxSZWZzO1xuICAgICAgY29uc3QgYXJyb3dLZXlzID0gW0tFWV9DT0RFUy5ET1dOLCBLRVlfQ09ERVMuVVAsIEtFWV9DT0RFUy5MRUZULCBLRVlfQ09ERVMuUklHSFRdO1xuICAgICAgY29uc3Qge1xuICAgICAgICBjb2x1bW5zLCB2aXNpYmxlQ29sdW1ucywgZ3JpZCwgZGF0YSwgb25MYXN0Q2VsbFRhYlByZXNzLFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCBncmlkQ29sdW1ucyA9IFV0aWxzLnZpc2libGVDb2x1bW5zKGNvbHVtbnMsIHZpc2libGVDb2x1bW5zKTtcbiAgICAgIGNvbnN0IGdldENvbHVtbktleUJ5SW5kZXggPSBpID0+IFV0aWxzLmdldENvbHVtbktleShncmlkQ29sdW1uc1tpXSk7XG4gICAgICBjb25zdCByb3dzU2l6ZSA9IGRhdGEuc2l6ZTtcbiAgICAgIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2wpO1xuICAgICAgbGV0IGN1cnJlbnRDZWxsID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtjb2x1bW5LZXl9XyR7cm93SW5kZXh9YF07XG4gICAgICBsZXQgcHJveHkgPSBudWxsO1xuXG4gICAgICBjb25zdCBnZXRTZWxlY3RSZWYgPSAoY29tcG9uZW50KSA9PiB7XG4gICAgICAgIGlmICghY29tcG9uZW50KSByZXR1cm4gbnVsbDtcbiAgICAgICAgaWYgKGNvbXBvbmVudC5zZWxlY3RSZWYuc2VsZWN0LnNlbGVjdCkgcmV0dXJuIGNvbXBvbmVudC5zZWxlY3RSZWYuc2VsZWN0LnNlbGVjdC5pbnB1dFJlZjtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudC5zZWxlY3RSZWYuc2VsZWN0LmlucHV0UmVmO1xuICAgICAgfTtcblxuICAgICAgY29uc3QgaXNDdXJzb3JBdFN0YXJ0ID0gKCkgPT4ge1xuICAgICAgICBpZiAoY3VycmVudENlbGwudHlwZSAhPT0gJ3RleHQnKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRDZWxsLnNlbGVjdGlvblN0YXJ0ID09PSAwO1xuICAgICAgfTtcblxuICAgICAgY29uc3QgaXNDdXJzb3JBdEVuZCA9ICgpID0+IHtcbiAgICAgICAgaWYgKGN1cnJlbnRDZWxsLnR5cGUgIT09ICd0ZXh0JykgcmV0dXJuIHRydWU7XG4gICAgICAgIHJldHVybiBjdXJyZW50Q2VsbC5zZWxlY3Rpb25FbmQgPT09IGN1cnJlbnRDZWxsLnZhbHVlLmxlbmd0aDtcbiAgICAgIH07XG5cbiAgICAgIC8vIElmIGN1cnJlbnQgY2VsbCBob2xkcyBhIHJlYWN0LWZsb2F0aW5nLXNlbGVjdCBjb21wb25lbnRcbiAgICAgIGlmIChjdXJyZW50Q2VsbCAmJiBjdXJyZW50Q2VsbC5zZWxlY3RSZWYpIHtcbiAgICAgICAgcHJveHkgPSBjdXJyZW50Q2VsbDtcbiAgICAgICAgY3VycmVudENlbGwgPSBnZXRTZWxlY3RSZWYocHJveHkpO1xuICAgICAgfVxuXG4gICAgICAvLyBQcmV2ZW50cyB1cC9kb3duIGFycm93IGZyb20gY2hhbmdpbmcgbnVtYmVyIGZpZWxkIHZhbHVlXG4gICAgICBpZiAoYXJyb3dLZXlzLmluY2x1ZGVzKGUua2V5Q29kZSkgJiYgY3VycmVudENlbGwudHlwZSA9PT0gJ251bWJlcicpIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuRU5URVI6XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLkVTQzoge1xuICAgICAgICAgIGlmIChjcmVhdGUgJiYgZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuRU5URVIpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuYWRkTmV3SXRlbShncmlkLCBVdGlscy5nZXRDb2x1bW5EZWZhdWx0VmFsdWVzKGNvbHVtbnMpKTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGN1cnJlbnRDZWxsLnNlbGVjdCgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLkRPV046IHtcbiAgICAgICAgICBsZXQgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2NvbHVtbktleX1fJHtyb3dJbmRleCArIDF9YF07XG5cbiAgICAgICAgICAvLyBQcmV2ZW50cyBtZW51IGZyb20gb3BlbmluZ1xuICAgICAgICAgIGlmIChwcm94eSAmJiBwcm94eS5zZWxlY3RSZWYgJiYgIXByb3h5LnNlbGVjdFJlZi5zdGF0ZS5tZW51SXNPcGVuKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAoIW5leHRFbGVtZW50KSBicmVhaztcbiAgICAgICAgICAgIG5leHRFbGVtZW50ID0gZ2V0U2VsZWN0UmVmKG5leHRFbGVtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5tb3ZlQ2VsbEZvY3VzKG5leHRFbGVtZW50LCByb3dJbmRleCArIDEsIC0xKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5VUDoge1xuICAgICAgICAgIGxldCBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4IC0gMX1gXTtcblxuICAgICAgICAgIC8vIFByZXZlbnRzIG1lbnUgZnJvbSBvcGVuaW5nXG4gICAgICAgICAgaWYgKHByb3h5ICYmIHByb3h5LnNlbGVjdFJlZiAmJiAhcHJveHkuc2VsZWN0UmVmLnN0YXRlLm1lbnVJc09wZW4pIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmICghbmV4dEVsZW1lbnQpIGJyZWFrO1xuICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSBnZXRTZWxlY3RSZWYobmV4dEVsZW1lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm1vdmVDZWxsRm9jdXMobmV4dEVsZW1lbnQsIHJvd0luZGV4IC0gMSwgLTEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLlRBQjpcbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuUklHSFQ6XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLkxFRlQ6IHtcbiAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuUklHSFQgJiYgIWlzQ3Vyc29yQXRFbmQoKSkgYnJlYWs7XG4gICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLkxFRlQgJiYgIWlzQ3Vyc29yQXRTdGFydCgpKSBicmVhaztcblxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgIGxldCBjb2x1bW5JbmQgPSBncmlkQ29sdW1ucy5maW5kSW5kZXgoYyA9PiBjLnZhbHVlS2V5UGF0aC5qb2luKCcvJykgPT09IGNvbHVtbktleSk7XG4gICAgICAgICAgaWYgKGNvbHVtbkluZCAhPT0gLTEpIHtcbiAgICAgICAgICAgIGxldCBkaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICBsZXQgbmV4dEVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgbGV0IHJvd0luZCA9IHJvd0luZGV4O1xuICAgICAgICAgICAgd2hpbGUgKGRpc2FibGVkKSB7XG4gICAgICAgICAgICAgIC8vIE1vdmluZyB0byB0aGUgbGVmdFxuICAgICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuTEVGVCB8fCAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuVEFCICYmIGUuc2hpZnRLZXkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbHVtbkluZCAtIDEgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kIC09IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyb3dJbmQgLSAxID49IDApIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCA9IGdyaWRDb2x1bW5zLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgICByb3dJbmQgLT0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE1vdmluZyB0byB0aGUgcmlnaHRcbiAgICAgICAgICAgICAgICBpZiAoY29sdW1uSW5kICsgMSA8IGdyaWRDb2x1bW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kICs9IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyb3dJbmQgKyAxIDwgcm93c1NpemUpIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCA9IDA7XG4gICAgICAgICAgICAgICAgICByb3dJbmQgKz0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJvd0luZCArIDEgPT09IHJvd3NTaXplKSB7XG4gICAgICAgICAgICAgICAgICAvLyBJZiB0cnlpbmcgdG8gc2VsZWN0IGEgcm93LCB3aGVuIHRoZXJlIGlzIG5vbmU6XG4gICAgICAgICAgICAgICAgICBpZiAob25MYXN0Q2VsbFRhYlByZXNzICYmIGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLlRBQikgb25MYXN0Q2VsbFRhYlByZXNzKGUpO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2dldENvbHVtbktleUJ5SW5kZXgoY29sdW1uSW5kKX1fJHtyb3dJbmR9YF07XG5cbiAgICAgICAgICAgICAgLy8gSWYgd2UgY2Fubm90IGZvY3VzIG9uIHRoZSBuZXh0IGVsZW1lbnQgd2hpbGUgbW92aW5nIHRvIHRoZSByaWdodFxuICAgICAgICAgICAgICBpZiAoIW5leHRFbGVtZW50ICYmIGUua2V5Q29kZSAhPT0gS0VZX0NPREVTLkxFRlQpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSdyZSBub3QgeWV0IGluIHRoZSBsYXN0IGZvY3VzYWJsZSBjb2x1bW5cbiAgICAgICAgICAgICAgICBpZiAoY29sdW1uSW5kIDw9IGdyaWRDb2x1bW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgd2hpbGUgKGNvbHVtbkluZCA8PSBncmlkQ29sdW1ucy5sZW5ndGggJiYgIW5leHRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHRFbGVtZW50ID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtnZXRDb2x1bW5LZXlCeUluZGV4KGNvbHVtbkluZCl9XyR7cm93SW5kfWBdO1xuICAgICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgKz0gMTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBJZiB3ZSBhcmUgaW4gdGhlIGxhc3QgY29sdW1uIGFuZCB3ZSBkb24ndCBoYXZlIGFuIGVsZW1lbnQgdG8gZm9jdXMgb24sXG4gICAgICAgICAgICAgICAgICAgIC8vIHdlIG11c3QgbW92ZSB0byB0aGUgbmV4dCByb3cgKGlmIHBvc3NpYmxlKVxuICAgICAgICAgICAgICAgICAgICBpZiAoIW5leHRFbGVtZW50ICYmIGNvbHVtbkluZCA9PT0gZ3JpZENvbHVtbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gSWYgdHJ5aW5nIHRvIHNlbGVjdCBhIHJvdywgd2hlbiB0aGVyZSBpcyBub25lOlxuICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3dJbmQgKyAxID09PSByb3dzU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9uTGFzdENlbGxUYWJQcmVzcyAmJiBlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5UQUIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25MYXN0Q2VsbFRhYlByZXNzKGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgY29sdW1uSW5kID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICByb3dJbmQgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgICBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Z2V0Q29sdW1uS2V5QnlJbmRleChjb2x1bW5JbmQpfV8ke3Jvd0luZH1gXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSBjYW5ub3QgZm9jdXMgb24gdGhlIG5leHQgZWxlbWVudCB3aGlsZSBtb3ZpbmcgdG8gdGhlIGxlZnRcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICghbmV4dEVsZW1lbnQgJiYgZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuTEVGVCkge1xuICAgICAgICAgICAgICAgIHdoaWxlIChjb2x1bW5JbmQgPiAwICYmICFuZXh0RWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kIC09IDE7XG4gICAgICAgICAgICAgICAgICBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Z2V0Q29sdW1uS2V5QnlJbmRleChjb2x1bW5JbmQpfV8ke3Jvd0luZH1gXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZGlzYWJsZWQgPSBuZXh0RWxlbWVudCA/IG5leHRFbGVtZW50LmRpc2FibGVkIDogZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWRpc2FibGVkICYmIG5leHRFbGVtZW50KSB7XG4gICAgICAgICAgICAgIGlmIChuZXh0RWxlbWVudC5zZWxlY3RSZWYpIG5leHRFbGVtZW50ID0gZ2V0U2VsZWN0UmVmKG5leHRFbGVtZW50KTtcbiAgICAgICAgICAgICAgdGhpcy5tb3ZlQ2VsbEZvY3VzKG5leHRFbGVtZW50LCByb3dJbmQsIGNvbHVtbkluZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIG9uRWRpdENlbGxLZXlEb3duID0gKHJvd0luZGV4LCBjb2wpID0+IChlKSA9PiB7XG4gICAgdGhpcy5vbkNlbGxLZXlEb3duKHJvd0luZGV4LCBjb2wsIGUpO1xuICB9O1xuXG4gIG9uQ3JlYXRlQ2VsbEtleURvd24gPSAocm93SW5kZXgsIGNvbCkgPT4gKGUpID0+IHtcbiAgICB0aGlzLm9uQ2VsbEtleURvd24ocm93SW5kZXgsIGNvbCwgZSwgdHJ1ZSk7XG4gIH07XG5cbiAgb25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UgPSAoY29sLCB2YWx1ZVBhcnNlcikgPT4gKGV2ZW50T3JEYXRhKSA9PiB7XG4gICAgbGV0IHJhd1ZhbHVlO1xuICAgIC8vIGV2ZW50T3JEYXRhIGNhbiBiZSBpbnB1dCBvbkNoYW5nZSBldmVudCwgcmVhY3Qtc2VsZWN0IG9uQ2hhbmdlIG9yIHJlYWN0LWRheS1waWNrZXIgb25DaGFuZ2VcbiAgICBpZiAoZXZlbnRPckRhdGEpIHtcbiAgICAgIGlmIChldmVudE9yRGF0YS50YXJnZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnRPckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSB2YWx1ZVBhcnNlcihyYXdWYWx1ZSk7XG4gICAgdGhpcy5wcm9wcy5maWx0ZXJDZWxsVmFsdWVDaGFuZ2UoXG4gICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICB0aGlzLnByb3BzLmNvbHVtbnMsXG4gICAgICBjb2wsXG4gICAgICB2YWx1ZSxcbiAgICApO1xuICB9O1xuXG4gIG9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlID0gKHJvd0luZGV4LCBjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZXZlbnRPckRhdGEpID0+IHtcbiAgICBsZXQgcmF3VmFsdWU7XG4gICAgLy8gZXZlbnRPckRhdGEgY2FuIGJlIGlucHV0IG9uQ2hhbmdlIGV2ZW50LCByZWFjdC1zZWxlY3Qgb25DaGFuZ2Ugb3IgcmVhY3QtZGF5LXBpY2tlciBvbkNoYW5nZVxuICAgIGlmIChldmVudE9yRGF0YSkge1xuICAgICAgaWYgKGV2ZW50T3JEYXRhLnRhcmdldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChldmVudE9yRGF0YS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCB2YWx1ZSA9IHZhbHVlUGFyc2VyKHJhd1ZhbHVlKTtcbiAgICB0aGlzLnByb3BzLmNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIHJvd0luZGV4LCBjb2wudmFsdWVLZXlQYXRoLCB2YWx1ZSk7XG4gICAgaWYgKGNvbC5vbkNyZWF0ZVZhbHVlQ2hhbmdlKSB7XG4gICAgICBjb2wub25DcmVhdGVWYWx1ZUNoYW5nZSh2YWx1ZSwgY29sLnZhbHVlS2V5UGF0aCwgcm93SW5kZXgpO1xuICAgIH1cbiAgICBpZiAoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlICYmIHZhbHVlID09PSBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubWF0Y2hWYWx1ZSkge1xuICAgICAgLy8gQ2FsbCBzcGVjaWFsIHBhaXJlZCB2YWx1ZSBjaGFuZ2Ugb24gb3RoZXIgY2VsbCBpZiB2YWx1ZSBtYXRjaGVzXG4gICAgICB0aGlzLm9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlKFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgeyB2YWx1ZUtleVBhdGg6IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5uZXdWYWx1ZUtleVBhdGggfSxcbiAgICAgICAgdiA9PiB2LFxuICAgICAgKShjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY29sLnZhbGlkYXRvcnMpIHtcbiAgICAgIHRoaXMucHJvcHMuY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUoXG4gICAgICAgIHRoaXMucHJvcHMuZ3JpZCxcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIGNvbC52YWx1ZUtleVBhdGgsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBjb2wudmFsaWRhdG9ycyxcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIG9uRWRpdENlbGxWYWx1ZUNoYW5nZSA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGV2ZW50T3JEYXRhKSA9PiB7XG4gICAgY29uc3QgZGF0YUlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICBsZXQgcmF3VmFsdWU7XG4gICAgLy8gZXZlbnRPckRhdGEgY2FuIGJlIGlucHV0IG9uQ2hhbmdlIGV2ZW50LCByZWFjdC1zZWxlY3Qgb25DaGFuZ2Ugb3IgcmVhY3QtZGF5LXBpY2tlciBvbkNoYW5nZVxuICAgIGlmIChldmVudE9yRGF0YSkge1xuICAgICAgaWYgKGV2ZW50T3JEYXRhLnRhcmdldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChldmVudE9yRGF0YS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCB2YWx1ZSA9IHZhbHVlUGFyc2VyKHJhd1ZhbHVlKTtcbiAgICB0aGlzLnByb3BzLmVkaXRDZWxsVmFsdWVDaGFuZ2UodGhpcy5wcm9wcy5ncmlkLCBkYXRhSWQsIGNvbC52YWx1ZUtleVBhdGgsIHZhbHVlKTtcbiAgICBpZiAoY29sLm9uRWRpdFZhbHVlQ2hhbmdlKSB7XG4gICAgICBjb2wub25FZGl0VmFsdWVDaGFuZ2UodmFsdWUsIGNvbC52YWx1ZUtleVBhdGgsIHJvd0luZGV4LCBkYXRhSWQpO1xuICAgIH1cbiAgICBpZiAoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlICYmIHZhbHVlID09PSBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubWF0Y2hWYWx1ZSkge1xuICAgICAgLy8gQ2FsbCBzcGVjaWFsIHBhaXJlZCB2YWx1ZSBjaGFuZ2Ugb24gb3RoZXIgY2VsbCBpZiB2YWx1ZSBtYXRjaGVzXG4gICAgICB0aGlzLm9uRWRpdENlbGxWYWx1ZUNoYW5nZShcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIHsgdmFsdWVLZXlQYXRoOiBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWVLZXlQYXRoIH0sXG4gICAgICAgIHYgPT4gdixcbiAgICAgICkoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm5ld1ZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNvbC52YWxpZGF0b3JzKSB7XG4gICAgICB0aGlzLnByb3BzLmVkaXRDZWxsVmFsdWVWYWxpZGF0ZShcbiAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICBkYXRhSWQsXG4gICAgICAgIGNvbC52YWx1ZUtleVBhdGgsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBjb2wudmFsaWRhdG9ycyxcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIG9uQ3JlYXRlQ2VsbEJsdXIgPSAocm93SW5kZXgsIGNvbCwgdmFsdWVQYXJzZXIpID0+IChlKSA9PiB7XG4gICAgaWYgKGNvbC5vbkNyZWF0ZUJsdXIpIHtcbiAgICAgIGxldCB2YWx1ZSA9IChlICYmIGUudGFyZ2V0ICYmIGUudGFyZ2V0LnZhbHVlICE9PSB1bmRlZmluZWQpID9cbiAgICAgICAgZS50YXJnZXQudmFsdWUgOlxuICAgICAgICB0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCk7XG4gICAgICBpZiAodmFsdWVQYXJzZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlUGFyc2VyKHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGNvbC5vbkNyZWF0ZUJsdXIodmFsdWUsIHJvd0luZGV4KTtcbiAgICB9XG4gIH07XG5cbiAgb25FZGl0Q2VsbEJsdXIgPSAocm93SW5kZXgsIGNvbCwgdmFsdWVQYXJzZXIpID0+IChlKSA9PiB7XG4gICAgaWYgKGNvbC5vbkVkaXRCbHVyKSB7XG4gICAgICBsZXQgdmFsdWUgPSAoZSAmJiBlLnRhcmdldCAmJiBlLnRhcmdldC52YWx1ZSAhPT0gdW5kZWZpbmVkKSA/XG4gICAgICAgIGUudGFyZ2V0LnZhbHVlIDpcbiAgICAgICAgdGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpO1xuICAgICAgaWYgKHZhbHVlUGFyc2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZVBhcnNlcih2YWx1ZSk7XG4gICAgICB9XG4gICAgICBjb25zdCBkYXRhSWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgICAgY29sLm9uRWRpdEJsdXIodmFsdWUsIHJvd0luZGV4LCBkYXRhSWQpO1xuICAgIH1cbiAgfTtcblxuICBvbkNlbGxGb2N1cyA9IChjZWxsVHlwZSwgaW5wdXRUeXBlLCByb3dJbmRleCwgY29sdW1uS2V5KSA9PiAoZSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGNlbGxTZWxlY3Rpb25DaGFuZ2UsIGNlbGxTZWxlY3QsIGdyaWQsIGlzRWRpdGluZyxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoaXNFZGl0aW5nKSByZXR1cm47XG5cbiAgICBpZiAoaW5wdXRUeXBlID09PSAnbnVtYmVyJykge1xuICAgICAgZS50YXJnZXQuc2VsZWN0KCk7XG4gICAgfVxuICAgIGlmIChjZWxsVHlwZSA9PT0gJ2VkaXQnICYmIGNlbGxTZWxlY3QpIHtcbiAgICAgIGNlbGxTZWxlY3Rpb25DaGFuZ2UoZ3JpZCwgTWFwKHtcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIGNvbHVtbktleSxcbiAgICAgIH0pKTtcbiAgICB9XG4gIH07XG5cbiAgZ2V0RGF0YUlkQnlSb3dJbmRleCA9IHJvd0luZGV4ID0+XG4gICAgdGhpcy5wcm9wcy5kYXRhLmdldEluKFtyb3dJbmRleCwgLi4udGhpcy5wcm9wcy5ncmlkLmlkS2V5UGF0aF0pO1xuXG4gIGdldFNlbGVjdGVkSXRlbUluZGV4ID0gKGlkKSA9PiB7XG4gICAgaWYgKCFpZCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMucHJvcHMuZGF0YS5maW5kSW5kZXgodiA9PiB2LmdldEluKHRoaXMucHJvcHMuZ3JpZC5pZEtleVBhdGgpID09PSBpZCk7XG4gICAgcmV0dXJuIGluZGV4ID09PSAtMSA/IHVuZGVmaW5lZCA6IGluZGV4O1xuICB9O1xuXG4gIGdldEVkaXRJdGVtVmFsdWUgPSAocm93SW5kZXgsIGNvbCwgb3B0aW9ucyA9IFtdKSA9PiB7XG4gICAgLy8gR2V0IHRoZSB2YWx1ZSB0byBkaXNwbGF5IGluIGVkaXQgY2VsbFxuICAgIGNvbnN0IGlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICBjb25zdCBlZGl0VmFsdWUgPSB0aGlzLnByb3BzLmVkaXREYXRhLmdldEluKFtpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0sIHVuZGVmaW5lZCk7XG4gICAgbGV0IG9yaWdpbmFsVmFsdWU7XG4gICAgaWYgKGVkaXRWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBvcmlnaW5hbFZhbHVlID0gdGhpcy5wcm9wcy5kYXRhLmdldEluKFtyb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0sICcnKTtcbiAgICB9IGVsc2UgaWYgKGVkaXRWYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBWYWx1ZSBpcyBmb3VuZCBmcm9tIGVkaXREYXRhXG4gICAgICAvLyBGb3JtYXQgYnkgY29tcG9uZW50IHR5cGVcbiAgICAgIHN3aXRjaCAoY29sLmNvbXBvbmVudFR5cGUpIHtcbiAgICAgICAgY2FzZSAnc2VsZWN0JzpcbiAgICAgICAgICByZXR1cm4gb3B0aW9ucy5zZWxlY3RPcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gZWRpdFZhbHVlKTtcbiAgICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgICAgcmV0dXJuIG9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSBlZGl0VmFsdWUpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiBlZGl0VmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvcmlnaW5hbFZhbHVlID09PSBudWxsIHx8IG9yaWdpbmFsVmFsdWUgPT09IHVuZGVmaW5lZCB8fCBvcmlnaW5hbFZhbHVlID09PSAnJykge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICAvLyBSZXR1cm4gdmFsdWUgZnJvbSBvcmlnaW5hbCBkYXRhLCBiZWNhdXNlIGVkaXREYXRhIGlzIG5vdCBhdmFpbGFibGVcbiAgICAvLyBGb3JtYXQgYnkgY29tcG9uZW50IHR5cGVcbiAgICBzd2l0Y2ggKGNvbC5jb21wb25lbnRUeXBlKSB7XG4gICAgICBjYXNlICdmbG9hdCc6IHtcbiAgICAgICAgaWYgKFN0cmluZyhvcmlnaW5hbFZhbHVlKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgcmV0dXJuIFN0cmluZyhvcmlnaW5hbFZhbHVlKVxuICAgICAgICAgICAgLnJlcGxhY2UoJy4nLCB0aGlzLnByb3BzLmRlY2ltYWxTZXBhcmF0b3IpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvcmlnaW5hbFZhbHVlO1xuICAgICAgfVxuICAgICAgY2FzZSAnc2VsZWN0JzpcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuc2VsZWN0T3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IG9yaWdpbmFsVmFsdWUpO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIHJldHVybiBvcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gb3JpZ2luYWxWYWx1ZSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gb3JpZ2luYWxWYWx1ZTtcbiAgICB9XG4gIH07XG5cbiAgZ2V0Q3JlYXRlSXRlbVZhbHVlID0gKHJvd0luZGV4LCBjb2wsIG9wdGlvbnMgPSBbXSkgPT4ge1xuICAgIGNvbnN0IHZhbCA9IHRoaXMucHJvcHMuY3JlYXRlRGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdLCAnJyk7XG4gICAgaWYgKHZhbCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH0gZWxzZSBpZiAoY29sLmNvbXBvbmVudFR5cGUgPT09ICdzZWxlY3QnKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5zZWxlY3RPcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gdmFsKTtcbiAgICB9IGVsc2UgaWYgKFsnYm9vbGVhbiddLmluY2x1ZGVzKGNvbC5jb21wb25lbnRUeXBlKSkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSB2YWwpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsO1xuICB9O1xuXG4gIGdldEZpbHRlckl0ZW1WYWx1ZSA9IChjb2wsIG9wdGlvbnMgPSBbXSkgPT4ge1xuICAgIGNvbnN0IHZhbCA9IHRoaXMucHJvcHMuZmlsdGVyRGF0YS5nZXQoVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCksICcnKTtcbiAgICBpZiAodmFsID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSBlbHNlIGlmIChjb2wuY29tcG9uZW50VHlwZSA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLnNlbGVjdE9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSB2YWwpO1xuICAgIH0gZWxzZSBpZiAoWydjaGVja2JveCcsICdib29sZWFuJ10uaW5jbHVkZXMoY29sLmNvbXBvbmVudFR5cGUpKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IHZhbCk7XG4gICAgfVxuICAgIHJldHVybiB2YWw7XG4gIH07XG5cbiAgZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZSA9IChyb3dJbmRleCwgY29sLCBtb2RlKSA9PiB7XG4gICAgbGV0IGNvbXBvbmVudERpc2FibGVkID0gISFjb2wuZGlzYWJsZUVkaXRpbmc7XG4gICAgLy8gY2hlY2sgaWYgY29tcG9uZW50IGlzIGRpc2FibGVkIGJ5IG90aGVyIGNvbHVtbiBkYXRhXG4gICAgaWYgKCFjb21wb25lbnREaXNhYmxlZCAmJiBjb2wuZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2gpIHtcbiAgICAgIGlmIChtb2RlID09PSAnY3JlYXRlJykge1xuICAgICAgICBjb21wb25lbnREaXNhYmxlZCA9IHRoaXMuZ2V0Q3JlYXRlSXRlbVZhbHVlKFxuICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgIHsgdmFsdWVLZXlQYXRoOiBjb2wuZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2gubWF0Y2hWYWx1ZUtleVBhdGggfSxcbiAgICAgICAgKSA9PT0gY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb21wb25lbnREaXNhYmxlZCA9IHRoaXMuZ2V0RWRpdEl0ZW1WYWx1ZShcbiAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICB7IHZhbHVlS2V5UGF0aDogY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWVLZXlQYXRoIH0sXG4gICAgICAgICkgPT09IGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaC5tYXRjaFZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29tcG9uZW50RGlzYWJsZWQ7XG4gIH07XG5cbiAgZ2V0Um93Q2xhc3NOYW1lID0gKHJvd0luZGV4KSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZ3JpZCxcbiAgICAgIGlzQ3JlYXRpbmcsXG4gICAgICBpc0VkaXRpbmcsXG4gICAgICBjcmVhdGVEYXRhLFxuICAgICAgc2VsZWN0ZWRJdGVtcyxcbiAgICAgIGRhdGEsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgcm93Q2xhc3NOYW1lcyA9IFsnb2MtZGF0YWdyaWQtcm93J107XG4gICAgbGV0IGV4dHJhUm93Q291bnQgPSAwOyAvLyBob3cgbWFueSByb3dzIHRvIGlnbm9yZSBmcm9tIHRvcCwgbmV3ICsgZmlsdGVyIHJvd3NcbiAgICBpZiAoaXNDcmVhdGluZykgZXh0cmFSb3dDb3VudCA9IGNyZWF0ZURhdGEuc2l6ZTtcbiAgICBpZiAoaXNDcmVhdGluZykge1xuICAgICAgaWYgKHJvd0luZGV4IDw9IChleHRyYVJvd0NvdW50IC0gMSkpIHtcbiAgICAgICAgcm93Q2xhc3NOYW1lcy5wdXNoKCdvYy1kYXRhZ3JpZC1yb3ctbmV3Jyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc0VkaXRpbmcpIHtcbiAgICAgIHJvd0NsYXNzTmFtZXMucHVzaCgnb2MtZGF0YWdyaWQtcm93LWVkaXQnKTtcbiAgICB9XG5cblxuICAgIC8vIGNoZWNrIGlmIHJvdyBpcyBzZWxlY3RlZFxuICAgIGlmICgoIWlzQ3JlYXRpbmcgJiYgIWlzRWRpdGluZykgJiZcbiAgICAgIChzZWxlY3RlZEl0ZW1zICYmIGdyaWQuaWRLZXlQYXRoKSkge1xuICAgICAgaWYgKFxuICAgICAgICBzZWxlY3RlZEl0ZW1zLmluZGV4T2YoZGF0YS5nZXRJbihbcm93SW5kZXggLSBleHRyYVJvd0NvdW50LCAuLi5ncmlkLmlkS2V5UGF0aF0pKSAhPT0gLTFcbiAgICAgICkge1xuICAgICAgICByb3dDbGFzc05hbWVzLnB1c2goJ2lzLXNlbGVjdGVkJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcHMucm93Q2xhc3NOYW1lR2V0dGVyKSB7XG4gICAgICByZXR1cm4gcm93Q2xhc3NOYW1lcy5qb2luKCcgJykgKyAnICcgKyB0aGlzLnByb3BzLnJvd0NsYXNzTmFtZUdldHRlcihyb3dJbmRleCk7XG4gICAgfVxuICAgIHJldHVybiByb3dDbGFzc05hbWVzLmpvaW4oJyAnKTtcbiAgfTtcblxuICBnZXRDZWxsTWVzc2FnZXMgPSAocm93SW5kZXgsIGNvbCwgY2VsbFR5cGUpID0+IHtcbiAgICBjb25zdCByZXR1cm5EYXRhID0ge307XG4gICAgaWYgKCF0aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoIHx8ICFjb2wudmFsdWVLZXlQYXRoKSB7XG4gICAgICByZXR1cm4gcmV0dXJuRGF0YTtcbiAgICB9XG4gICAgbGV0IGluZm9NZXNzYWdlO1xuICAgIGxldCBlcnJvck1lc3NhZ2U7XG4gICAgbGV0IHdhcm5pbmdNZXNzYWdlO1xuICAgIGlmIChjZWxsVHlwZSA9PT0gJ2NyZWF0ZScpIHtcbiAgICAgIGluZm9NZXNzYWdlID0gdGhpcy5wcm9wcy5jcmVhdGVDZWxsTWVzc2FnZXMuZ2V0SW4oWydpbmZvJywgcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgIGVycm9yTWVzc2FnZSA9IHRoaXMucHJvcHMuY3JlYXRlQ2VsbE1lc3NhZ2VzLmdldEluKFsnZXJyb3InLCByb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgd2FybmluZ01lc3NhZ2UgPSB0aGlzLnByb3BzLmNyZWF0ZUNlbGxNZXNzYWdlcy5nZXRJbihbJ3dhcm5pbmcnLCByb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgICBpbmZvTWVzc2FnZSA9IHRoaXMucHJvcHMuY2VsbE1lc3NhZ2VzLmdldEluKFsnaW5mbycsIGlkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgICBlcnJvck1lc3NhZ2UgPSB0aGlzLnByb3BzLmNlbGxNZXNzYWdlcy5nZXRJbihbJ2Vycm9yJywgaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgIHdhcm5pbmdNZXNzYWdlID0gdGhpcy5wcm9wcy5jZWxsTWVzc2FnZXMuZ2V0SW4oWyd3YXJuaW5nJywgaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICB9XG4gICAgaWYgKGluZm9NZXNzYWdlKSB7XG4gICAgICByZXR1cm5EYXRhLmluZm9NZXNzYWdlID0gaW5mb01lc3NhZ2U7XG4gICAgfVxuICAgIGlmIChlcnJvck1lc3NhZ2UpIHtcbiAgICAgIHJldHVybkRhdGEuZXJyb3JNZXNzYWdlID0gZXJyb3JNZXNzYWdlO1xuICAgIH1cbiAgICBpZiAod2FybmluZ01lc3NhZ2UpIHtcbiAgICAgIHJldHVybkRhdGEud2FybmluZ01lc3NhZ2UgPSB3YXJuaW5nTWVzc2FnZTtcbiAgICB9XG4gICAgcmV0dXJuIHJldHVybkRhdGE7XG4gIH07XG5cbiAgZ2V0U2Nyb2xsVG9Sb3cgPSAoKSA9PiB7XG4gICAgbGV0IHNjcm9sbFRvUm93O1xuICAgIGlmICh0aGlzLnByb3BzLmlzQ3JlYXRpbmcgJiYgIXRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwpIHJldHVybiBzY3JvbGxUb1JvdztcbiAgICBpZiAodGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCkge1xuICAgICAgY29uc3Qgc2Nyb2xsTmV3Um93ID0gdGhpcy5wcm9wcy5jcmVhdGVEYXRhLnNpemUgLSAxO1xuICAgICAgaWYgKHNjcm9sbE5ld1JvdyA+PSAwKSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gc2Nyb2xsTmV3Um93O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5pc0VkaXRpbmcpIHtcbiAgICAgICAgc2Nyb2xsVG9Sb3cgPSB0aGlzLnN0YXRlLmN1cnJlbnRSb3c7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzY3JvbGxUb1JvdyA9IHRoaXMucHJvcHMuc2Nyb2xsVG9Sb3c7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIH1cbiAgICAgIGlmIChzY3JvbGxUb1JvdyA9PT0gdW5kZWZpbmVkICYmIHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5zaXplID4gMCkge1xuICAgICAgICBzY3JvbGxUb1JvdyA9IHRoaXMuZ2V0U2VsZWN0ZWRJdGVtSW5kZXgodGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLmZpcnN0KCkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc2Nyb2xsVG9Sb3c7XG4gIH07XG5cbiAgc2V0Rm9jdXNUbyA9IChmb2N1c1RvKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuaXNFZGl0aW5nIHx8IHRoaXMucHJvcHMuaXNDcmVhdGluZykge1xuICAgICAgaWYgKGZvY3VzVG8gJiYgZm9jdXNUby5nZXQoJ3R5cGUnKSAmJiBmb2N1c1RvICE9PSB0aGlzLnByZXZGb2N1c1RvKSB7XG4gICAgICAgIHRoaXNbZm9jdXNUby5nZXQoJ3R5cGUnKV0gPSB0cnVlO1xuICAgICAgICB0aGlzLmZvY3VzVG9MYXN0Um93ID0gZm9jdXNUby5nZXQoJ2ZvY3VzVG9MYXN0Um93Jyk7XG4gICAgICAgIHRoaXMucHJldkZvY3VzVG8gPSBmb2N1c1RvO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBoYW5kbGVDZWxsU2VsZWN0ID0gKGNlbGxUeXBlLCByb3dJbmRleCwgY29sdW1uS2V5KSA9PiAoKSA9PiB7XG4gICAgaWYgKGNlbGxUeXBlID09PSAndmlldycgJiYgdGhpcy5wcm9wcy5jZWxsU2VsZWN0KSB7XG4gICAgICB0aGlzLnByb3BzLmNlbGxTZWxlY3Rpb25DaGFuZ2UodGhpcy5wcm9wcy5ncmlkLCBNYXAoe1xuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgY29sdW1uS2V5LFxuICAgICAgfSkpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVDcmVhdGVDZWxsUmVmID0gKHJvd0luZGV4LCBjb2wpID0+IChyZWYpID0+IHtcbiAgICAvLyBGb2N1cyB0byBjcmVhdGUgY2VsbFxuICAgIGNvbnN0IGNvbHVtbktleSA9IFV0aWxzLmdldENvbHVtbktleShjb2wpO1xuICAgIGlmIChcbiAgICAgIHRoaXMucHJvcHMuY3JlYXRlRGF0YS5zaXplICYmXG4gICAgICB0aGlzLnByb3BzLmNyZWF0ZURhdGEuc2l6ZSA9PT0gcm93SW5kZXggKyAxICYmXG4gICAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsICYmXG4gICAgICAhdGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlKHJvd0luZGV4LCBjb2wsICdjcmVhdGUnKVxuICAgICkge1xuICAgICAgcmVmLmZvY3VzKCk7XG4gICAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcHMuZW5hYmxlQXJyb3dOYXZpZ2F0aW9uKSB7XG4gICAgICB0aGlzLmNyZWF0ZUNlbGxSZWZzW2Ake3RoaXMucHJvcHMuZ3JpZC5pZH1fJHtjb2x1bW5LZXl9XyR7cm93SW5kZXh9YF0gPSByZWY7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZUVkaXRDZWxsUmVmID0gKHJvd0luZGV4LCBjb2wpID0+IChyZWYpID0+IHtcbiAgICBjb25zdCBjb2x1bW5LZXkgPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sKTtcbiAgICBpZiAodGhpcy5mb2N1c1RvRWRpdENlbGwgJiYgIXRoaXMuZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZShyb3dJbmRleCwgY29sLCAnZWRpdCcpKSB7XG4gICAgICBjb25zdCBzZWxlY3RlZFJvd0luZGV4ID0gdGhpcy5mb2N1c1RvTGFzdFJvdyAmJiB0aGlzLnByb3BzLmRhdGEuc2l6ZSA+IDAgP1xuICAgICAgICB0aGlzLnByb3BzLmRhdGEuc2l6ZSAtIDEgOiB0aGlzLmdldFNlbGVjdGVkSXRlbUluZGV4KHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5maXJzdCgpKTtcblxuICAgICAgY29uc3QgeyBzZWxlY3RlZENlbGwgfSA9IHRoaXMucHJvcHM7XG4gICAgICBpZiAoc2VsZWN0ZWRDZWxsLnNpemUgPiAwKSB7XG4gICAgICAgIGlmIChzZWxlY3RlZENlbGwuZ2V0KCdyb3dJbmRleCcpID09PSByb3dJbmRleCAmJiBzZWxlY3RlZENlbGwuZ2V0KCdjb2x1bW5LZXknKSA9PT0gY29sdW1uS2V5KSB7XG4gICAgICAgICAgcmVmLmZvY3VzKCk7XG4gICAgICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmZvY3VzVG9MYXN0Um93ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWRSb3dJbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZm9jdXNUb0xhc3RSb3cgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWRSb3dJbmRleCA9PT0gcm93SW5kZXgpIHtcbiAgICAgICAgcmVmLmZvY3VzKCk7XG4gICAgICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZm9jdXNUb0xhc3RSb3cgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuZW5hYmxlQXJyb3dOYXZpZ2F0aW9uKSB7XG4gICAgICB0aGlzLmNlbGxSZWZzW2Ake3RoaXMucHJvcHMuZ3JpZC5pZH1fJHtjb2x1bW5LZXl9XyR7cm93SW5kZXh9YF0gPSByZWY7XG4gICAgfVxuICB9O1xuXG4gIG1vdmVDZWxsRm9jdXMgPSAobmV4dEVsZW1lbnQsIHJvd0luZGV4LCBjb2x1bW5JbmRleCkgPT4ge1xuICAgIGNvbnN0IGVsZW1lbnRUeXBlcyA9IFsndGV4dCcsICdjaGVja2JveCddO1xuICAgIGlmIChuZXh0RWxlbWVudCAmJiBlbGVtZW50VHlwZXMuaW5jbHVkZXMobmV4dEVsZW1lbnQudHlwZSkpIHtcbiAgICAgIGlmIChyb3dJbmRleCAhPT0gLTEgfHwgY29sdW1uSW5kZXggIT09IC0xKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIGN1cnJlbnRDb2x1bW46IGNvbHVtbkluZGV4LFxuICAgICAgICAgIGN1cnJlbnRSb3c6IHJvd0luZGV4LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAobmV4dEVsZW1lbnQudHlwZSA9PT0gJ2NoZWNrYm94JykgbmV4dEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgaWYgKG5leHRFbGVtZW50LnR5cGUgPT09ICd0ZXh0JykgbmV4dEVsZW1lbnQuc2VsZWN0KCk7XG4gICAgICB9LCA1MCk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZVNlbGVjdEFsbENoZWNrQm94T25DaGFuZ2UgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5zZWxlY3RBbGxJdGVtc0NoYW5nZSh0aGlzLnByb3BzLmdyaWQpO1xuICB9O1xuXG4gIGhhbmRsZVNlbGVjdGlvbkNoZWNrQm94T25DaGFuZ2UgPSByb3dJbmRleCA9PiAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5pdGVtU2VsZWN0aW9uQ2hhbmdlKHRoaXMucHJvcHMuZ3JpZCwgcm93SW5kZXgsIHRydWUsIGZhbHNlKTtcbiAgfTtcblxuICBnZW5lcmF0ZUNvbHVtbnMgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGF0YSxcbiAgICAgIHNlbGVjdGVkSXRlbXMsXG4gICAgICBkYXRlRm9ybWF0LFxuICAgICAgdGhvdXNhbmRTZXBhcmF0b3IsXG4gICAgICBkZWNpbWFsU2VwYXJhdG9yLFxuICAgICAgZ3JpZCxcbiAgICAgIGlubGluZUVkaXQsXG4gICAgICBmaWx0ZXJpbmcsXG4gICAgICByZWdpb24sXG4gICAgICBpbnRsLFxuICAgICAgc2VsZWN0Q29tcG9uZW50T3B0aW9ucyxcbiAgICAgIGlzQ3JlYXRpbmcsXG4gICAgICBleHRyYUNvbHVtbixcbiAgICAgIHJvd1NlbGVjdENoZWNrYm94Q29sdW1uLFxuICAgICAgc2hvd1NlbGVjdEFsbENoZWNrYm94LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgY29sdW1ucyA9IFtdO1xuICAgIGNvbnN0IHRhYkluZGV4ID0gU3RyaW5nKHRoaXMucHJvcHMudGFiSW5kZXgpO1xuICAgIGlmIChleHRyYUNvbHVtbikge1xuICAgICAgY29sdW1ucy5wdXNoKHtcbiAgICAgICAgd2lkdGg6IGV4dHJhQ29sdW1uLndpZHRoIHx8IDQwLFxuICAgICAgICBpc1Jlc2l6YWJsZTogISFleHRyYUNvbHVtbi5pc1Jlc2l6YWJsZSxcbiAgICAgICAgaXNTb3J0YWJsZTogZmFsc2UsXG4gICAgICAgIGNvbHVtbktleTogJ2V4dHJhQ29sdW1uJyxcbiAgICAgICAgY2VsbDogcm93SW5kZXggPT4gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtZXh0cmEtY29sdW1uLWNlbGwgbm8tcm93LXNlbGVjdFwiPlxuICAgICAgICAgICAge2V4dHJhQ29sdW1uLnZhbHVlUmVuZGVyKGRhdGEuZ2V0KHJvd0luZGV4KSwgdGFiSW5kZXgpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApLFxuICAgICAgICBjZWxsRWRpdDogcm93SW5kZXggPT4gKGV4dHJhQ29sdW1uLmNlbGxFZGl0ID8gZXh0cmFDb2x1bW4uY2VsbEVkaXQocm93SW5kZXgpIDogbnVsbCksXG4gICAgICAgIGNlbGxDcmVhdGU6IHJvd0luZGV4ID0+IChleHRyYUNvbHVtbi5jZWxsQ3JlYXRlID8gZXh0cmFDb2x1bW4uY2VsbENyZWF0ZShyb3dJbmRleCkgOiBudWxsKSxcbiAgICAgICAgY2VsbEZpbHRlcjogcm93SW5kZXggPT4gKGV4dHJhQ29sdW1uLmNlbGxGaWx0ZXIgPyBleHRyYUNvbHVtbi5jZWxsRmlsdGVyKHJvd0luZGV4KSA6IG51bGwpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHJvd1NlbGVjdENoZWNrYm94Q29sdW1uKSB7XG4gICAgICBjb2x1bW5zLnB1c2goe1xuICAgICAgICB3aWR0aDogNDAsXG4gICAgICAgIGlzUmVzaXphYmxlOiBmYWxzZSxcbiAgICAgICAgaXNTb3J0YWJsZTogZmFsc2UsXG4gICAgICAgIGNvbHVtbktleTogJ3NlbGVjdGlvbkNoZWNrYm94JyxcbiAgICAgICAgaGVhZGVyOiAoXG4gICAgICAgICAgc2hvd1NlbGVjdEFsbENoZWNrYm94ICYmXG4gICAgICAgICAgPENoZWNrYm94XG4gICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRTZWxlY3RBbGxDaGVja0JveC0ke2dyaWQuaWR9YH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLXNlbGVjdC1hbGwtY2hlY2tib3gtY2VsbCBuby1yb3ctc2VsZWN0XCJcbiAgICAgICAgICAgIGNoZWNrZWQ9e2RhdGEuc2l6ZSAhPT0gMCAmJiBkYXRhLnNpemUgPT09IHNlbGVjdGVkSXRlbXMuc2l6ZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVNlbGVjdEFsbENoZWNrQm94T25DaGFuZ2V9XG4gICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSxcbiAgICAgICAgY2VsbDogKHJvd0luZGV4KSA9PiB7XG4gICAgICAgICAgY29uc3Qgcm93SXRlbSA9IGRhdGEuZ2V0KHJvd0luZGV4KTtcbiAgICAgICAgICBjb25zdCBpdGVtSWQgPSByb3dJdGVtLmdldEluKGdyaWQuaWRLZXlQYXRoKTtcbiAgICAgICAgICBjb25zdCBzZWxlY3RlZCA9IHNlbGVjdGVkSXRlbXMuaW5jbHVkZXMoaXRlbUlkKTtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPENoZWNrYm94XG4gICAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZFNlbGVjdENoZWNrQm94LSR7dGhpcy5wcm9wcy5ncmlkLmlkfS0ke3Jvd0luZGV4fWB9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLXNlbGVjdC1jaGVja2JveC1jZWxsIG5vLXJvdy1zZWxlY3RcIlxuICAgICAgICAgICAgICBjaGVja2VkPXtzZWxlY3RlZH1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlU2VsZWN0aW9uQ2hlY2tCb3hPbkNoYW5nZShyb3dJbmRleCl9XG4gICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgY2VsbEVkaXQ6ICgpID0+IG51bGwsXG4gICAgICAgIGNlbGxDcmVhdGU6ICgpID0+IG51bGwsXG4gICAgICAgIGNlbGxGaWx0ZXI6ICgpID0+IG51bGwsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCB2aXNpYmxlQ29sdW1ucyA9IFtdO1xuICAgIHRoaXMucHJvcHMudmlzaWJsZUNvbHVtbnMuZm9yRWFjaCgodmlzaWJsZUNvbHVtbktleSkgPT4ge1xuICAgICAgdGhpcy5wcm9wcy5jb2x1bW5zLmZvckVhY2goKG9yZ0NvbCkgPT4ge1xuICAgICAgICBpZiAoVXRpbHMuZ2V0Q29sdW1uS2V5KG9yZ0NvbCkgPT09IHZpc2libGVDb2x1bW5LZXkpIHtcbiAgICAgICAgICB2aXNpYmxlQ29sdW1ucy5wdXNoKG9yZ0NvbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHZpc2libGVDb2x1bW5zLmZvckVhY2goKGNvbCkgPT4ge1xuICAgICAgY29uc3QgdmFsdWVFbXB0eUNoZWNrZXIgPSBVdGlscy5nZXRWYWx1ZUVtcHR5Q2hlY2tlcihjb2wpO1xuICAgICAgLy8gQ2VsbCB2YWx1ZSByZW5kZXJpbmdcbiAgICAgIGNvbnN0IHZhbHVlUmVuZGVyID0gKHJvd0luZGV4LCBmb3JtYXQpID0+IHtcbiAgICAgICAgY29uc3QgdmFsID0gZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgICAgaWYgKHZhbHVlRW1wdHlDaGVja2VyKHZhbCkpIHtcbiAgICAgICAgICByZXR1cm4gY29sLmlzUmVxdWlyZWQgPyA8TSBpZD1cIkdyaWQuVmFsdWVJc01pc3NpbmdcIiAvPiA6ICcnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3JtYXQgPyBmb3JtYXQodmFsKSA6IHZhbDtcbiAgICAgIH07XG5cbiAgICAgIGxldCBjb2x1bW4gPSBHcmlkQ29sdW1uU2VydmljZS5iYXNlQ29sdW1uKGNvbCk7XG4gICAgICAvLyBDb2xsZWN0IGNvbHVtbiBmdW5jdGlvbnMgaW50byBvbmUgT2JqZWN0XG4gICAgICBjb25zdCBjb2x1bW5GdW5jdGlvbnMgPSB7XG4gICAgICAgIGVkaXQ6IHtcbiAgICAgICAgICBnZXRJdGVtVmFsdWU6IHRoaXMuZ2V0RWRpdEl0ZW1WYWx1ZSxcbiAgICAgICAgICBvbkNlbGxWYWx1ZUNoYW5nZTogdGhpcy5vbkVkaXRDZWxsVmFsdWVDaGFuZ2UsXG4gICAgICAgICAgb25DZWxsQmx1cjogdGhpcy5vbkVkaXRDZWxsQmx1cixcbiAgICAgICAgICBvbkNlbGxGb2N1czogdGhpcy5vbkNlbGxGb2N1cyxcbiAgICAgICAgICBvbkNlbGxLZXlEb3duOiB0aGlzLm9uRWRpdENlbGxLZXlEb3duLFxuICAgICAgICAgIGhhbmRsZUNlbGxSZWY6IHRoaXMuaGFuZGxlRWRpdENlbGxSZWYsXG4gICAgICAgIH0sXG4gICAgICAgIGNyZWF0ZToge1xuICAgICAgICAgIGdldEl0ZW1WYWx1ZTogdGhpcy5nZXRDcmVhdGVJdGVtVmFsdWUsXG4gICAgICAgICAgb25DZWxsVmFsdWVDaGFuZ2U6IHRoaXMub25DcmVhdGVDZWxsVmFsdWVDaGFuZ2UsXG4gICAgICAgICAgb25DZWxsQmx1cjogdGhpcy5vbkNyZWF0ZUNlbGxCbHVyLFxuICAgICAgICAgIG9uQ2VsbEZvY3VzOiB0aGlzLm9uQ2VsbEZvY3VzLFxuICAgICAgICAgIG9uQ2VsbEtleURvd246IHRoaXMub25DcmVhdGVDZWxsS2V5RG93bixcbiAgICAgICAgICBoYW5kbGVDZWxsUmVmOiB0aGlzLmhhbmRsZUNyZWF0ZUNlbGxSZWYsXG4gICAgICAgIH0sXG4gICAgICAgIGZpbHRlcjoge1xuICAgICAgICAgIGdldEl0ZW1WYWx1ZTogdGhpcy5nZXRGaWx0ZXJJdGVtVmFsdWUsXG4gICAgICAgICAgb25DZWxsVmFsdWVDaGFuZ2U6IHRoaXMub25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UsXG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICAvLyBoYW5kbGUgY29sdW1uLmNlbGwgLyBjb2x1bW4uY2VsbEVkaXQgLyBjb2x1bW4uY2VsbENyZWF0ZSAvIGNvbHVtbi5jZWxsRmlsdGVyXG4gICAgICBjb25zdCBjZWxsUHJvcHMgPSB7XG4gICAgICAgIGRhdGEsXG4gICAgICAgIGRhdGVGb3JtYXQsXG4gICAgICAgIHRob3VzYW5kU2VwYXJhdG9yLFxuICAgICAgICBkZWNpbWFsU2VwYXJhdG9yLFxuICAgICAgfTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgY29sdW1uID0gR3JpZENvbHVtblNlcnZpY2UuY29sdW1uQ2VsbChjb2x1bW4sIGNlbGxQcm9wcywgY29sLCB2YWx1ZVJlbmRlcik7XG5cbiAgICAgIC8vIGhhbmRsZSBjb2x1bW5Db21wb25lbnRUeXBlc1xuICAgICAgY29uc3QgY29tcG9uZW50VHlwZVByb3BzID0ge1xuICAgICAgICAuLi5jZWxsUHJvcHMsXG4gICAgICAgIGdyaWQsXG4gICAgICAgIGlubGluZUVkaXQsXG4gICAgICAgIGZpbHRlcmluZyxcbiAgICAgICAgcmVnaW9uLFxuICAgICAgICBpbnRsLFxuICAgICAgICBzZWxlY3RDb21wb25lbnRPcHRpb25zLFxuICAgICAgfTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgY29sdW1uID0gR3JpZENvbHVtblNlcnZpY2UuY29sdW1uQ29tcG9uZW50VHlwZShcbiAgICAgICAgY29sdW1uLFxuICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgY29tcG9uZW50VHlwZVByb3BzLFxuICAgICAgICBjb2wsXG4gICAgICAgIGNvbHVtbkZ1bmN0aW9ucyxcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnREaXNhYmxlZFN0YXRlLFxuICAgICAgKTtcblxuICAgICAgY29sdW1ucy5wdXNoKGNvbHVtbik7XG4gICAgfSk7XG5cbiAgICBpZiAoaXNDcmVhdGluZykge1xuICAgICAgY29sdW1ucy5wdXNoKHtcbiAgICAgICAgd2lkdGg6IDM3LFxuICAgICAgICBpc1Jlc2l6YWJsZTogZmFsc2UsXG4gICAgICAgIGNvbHVtbktleTogJ3JlbW92ZU5ld0l0ZW0nLFxuICAgICAgICBjZWxsOiAoKSA9PiBudWxsLFxuICAgICAgICBjZWxsRWRpdDogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbENyZWF0ZTogcm93SW5kZXggPT4gKFxuICAgICAgICAgIDxJY29uXG4gICAgICAgICAgICBpZD17YG9jLWRhdGFncmlkLW5ldy1pdGVtLXJlbW92ZS0ke2dyaWQuaWR9LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgIHR5cGU9XCJpbmRpY2F0b3JcIlxuICAgICAgICAgICAgbmFtZT1cImRlbGV0ZVwiXG4gICAgICAgICAgICB3aWR0aD17MzB9XG4gICAgICAgICAgICBoZWlnaHQ9ezMwfVxuICAgICAgICAgICAgc3R5bGU9e3sgcGFkZGluZzogJzdweCcgfX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMucHJvcHMucmVtb3ZlTmV3SXRlbShncmlkLCByb3dJbmRleCl9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSxcbiAgICAgICAgY2VsbEZpbHRlcjogKCkgPT4gbnVsbCxcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gY29sdW1ucztcbiAgfTtcblxuICBpc0NlbGxFZGl0ZWQgPSAocm93SW5kZXgsIGNvbCwgY2VsbFR5cGUpID0+IHtcbiAgICBpZiAoY2VsbFR5cGUgIT09ICdlZGl0Jykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBpZCA9IHRoaXMuZ2V0RGF0YUlkQnlSb3dJbmRleChyb3dJbmRleCk7XG4gICAgcmV0dXJuICEhdGhpcy5wcm9wcy5lZGl0RGF0YS5nZXRJbihbaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgfTtcblxuICBoYW5kbGVBZnRlckFkZEl0ZW0gPSAoKSA9PiB7XG4gICAgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCA9IHRydWU7XG4gIH07XG5cbiAgaGFuZGxlQWZ0ZXJFZGl0UHJlc3MgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5zaXplKSB7XG4gICAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IHRydWU7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY3VycmVudFJvdzogdW5kZWZpbmVkLFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZUFmdGVyVmFsaWRhdGlvbkVycm9yID0gKCkgPT4ge1xuICAgIHRoaXMuZm9jdXNUb0Vycm9yQ2VsbCA9IHRydWU7XG4gIH07XG5cbiAgaGFuZGxlUm93Q2xpY2sgPSAoZSwgcm93SW5kZXgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5yb3dTZWxlY3QgJiYgIXRoaXMucHJvcHMuaXNDcmVhdGluZyAmJiAhdGhpcy5wcm9wcy5pc0VkaXRpbmcpIHtcbiAgICAgIGlmIChlLmN0cmxLZXkgfHwgZS5zaGlmdEtleSkge1xuICAgICAgICBkb2N1bWVudC5nZXRTZWxlY3Rpb24oKVxuICAgICAgICAgIC5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICAgIH1cbiAgICAgIC8vIERvbid0IHRyaWdnZXIgc2VsZWN0aW9uIGNoYW5nZSBvbiB3aGVuIHVzZXIgY2xpY2tzIG9uIHNwZWNpYWwgY2VsbHMgbGlrZSBjaGVja2JveC9leHRyYVxuICAgICAgLy8gQ2hlY2sgdGhhdCBjbGlja2VkIG5vZGUncyBwYXJlbnQgb3IgcGFyZW50J3MgcGFyZW50IGRvZXNuJ3QgaGF2ZSBuby1yb3ctc2VsZWN0IGNsYXNzXG4gICAgICBjb25zdCB7IHBhcmVudE5vZGUgfSA9IGUudGFyZ2V0O1xuICAgICAgY29uc3QgcGFyZW50MWNsYXNzID0gcGFyZW50Tm9kZS5jbGFzc05hbWUgJiYgcGFyZW50Tm9kZS5jbGFzc05hbWUuaW5kZXhPZlxuICAgICAgICA/IHBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgIDogJyc7XG4gICAgICBjb25zdCBwYXJlbnQyY2xhc3MgPSBwYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lICYmIHBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUuaW5kZXhPZiAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgID8gcGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZVxuICAgICAgICA6ICcnO1xuICAgICAgY29uc3QgcGFyZW50M2NsYXNzID0gcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lICYmIHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZS5pbmRleE9mIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgPyBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWVcbiAgICAgICAgOiAnJztcbiAgICAgIGNvbnN0IHBhcmVudDRjbGFzcyA9IHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lICYmIHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lLmluZGV4T2YgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICA/IHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgIDogJyc7XG4gICAgICBpZiAoXG4gICAgICAgIHBhcmVudDFjbGFzcy5pbmRleE9mKCduby1yb3ctc2VsZWN0JykgPT09IC0xICYmXG4gICAgICAgIHBhcmVudDJjbGFzcy5pbmRleE9mKCduby1yb3ctc2VsZWN0JykgPT09IC0xICYmXG4gICAgICAgIHBhcmVudDNjbGFzcy5pbmRleE9mKCduby1yb3ctc2VsZWN0JykgPT09IC0xICYmXG4gICAgICAgIHBhcmVudDRjbGFzcy5pbmRleE9mKCduby1yb3ctc2VsZWN0JykgPT09IC0xXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5wcm9wcy5pdGVtU2VsZWN0aW9uQ2hhbmdlKFxuICAgICAgICAgIHRoaXMucHJvcHMuZ3JpZCxcbiAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICB0aGlzLnByb3BzLm11bHRpU2VsZWN0ICYmIGUuY3RybEtleSxcbiAgICAgICAgICB0aGlzLnByb3BzLm11bHRpU2VsZWN0ICYmIGUuc2hpZnRLZXksXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLm9uUm93Q2xpY2spIHtcbiAgICAgIHRoaXMucHJvcHMub25Sb3dDbGljayhlLCByb3dJbmRleCwgdGhpcy5wcm9wcy5kYXRhLmdldChyb3dJbmRleCkpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBoYW5kbGVDb250ZXh0TWVudSA9IChlLCByb3dJbmRleCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmNvbnRleHRNZW51SXRlbXMpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgaXRlbVNlbGVjdGlvbkNoYW5nZSxcbiAgICAgICAgc2VsZWN0ZWRJdGVtcyxcbiAgICAgICAgZ3JpZCxcbiAgICAgICAgZGF0YSxcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjb250ZXh0TWVudU9wZW46IHRydWUsXG4gICAgICAgIGNvbnRleHRNZW51WDogZS5jbGllbnRYLFxuICAgICAgICBjb250ZXh0TWVudVk6IGUuY2xpZW50WSxcbiAgICAgIH0pO1xuICAgICAgLy8gSWYgY2xpY2tlZCBpdGVtIGlzIG5vdCBzZWxlY3RlZCwgY2hhbmdlIHNlbGVjdGlvbiB0byBpdFxuICAgICAgaWYgKCFzZWxlY3RlZEl0ZW1zLmluY2x1ZGVzKGRhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi5ncmlkLmlkS2V5UGF0aF0pKSkge1xuICAgICAgICBpdGVtU2VsZWN0aW9uQ2hhbmdlKGdyaWQsIHJvd0luZGV4KTtcbiAgICAgIH1cbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkRvY3VtZW50Q2xpY2spO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBoYW5kbGVDb250ZXh0TWVudUl0ZW1DbGljayA9IChvbkNsaWNrLCBzZWxlY3RlZEl0ZW1zLCBzZWxlY3RlZERhdGEpID0+ICgpID0+IHtcbiAgICBvbkNsaWNrKHNlbGVjdGVkSXRlbXMsIHNlbGVjdGVkRGF0YSk7XG4gIH07XG5cbiAgaGFuZGxlUm93SGVpZ2h0R2V0dGVyID0gcm93SW5kZXggPT5cbiAgICB0aGlzLnByb3BzLnJvd0hlaWdodEdldHRlcih0aGlzLnByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSwgcm93SW5kZXgpO1xuXG4gIHJlbmRlckNlbGwgPSBjb2wgPT4gKGNlbGxQcm9wcykgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGlzQ3JlYXRpbmcsXG4gICAgICBpc0VkaXRpbmcsXG4gICAgICBjcmVhdGVEYXRhLFxuICAgICAgc2VsZWN0ZWRDZWxsLFxuICAgICAgZ3JpZCxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHJvd0luZGV4LCAuLi5wcm9wcyB9ID0gY2VsbFByb3BzO1xuICAgIGxldCBjZWxsO1xuICAgIGxldCBjZWxsVHlwZSA9ICd2aWV3JztcbiAgICBsZXQgZXh0cmFSb3dDb3VudCA9IDA7IC8vIGhvdyBtYW55IHJvd3MgdG8gaWdub3JlIGZyb20gdG9wLCBuZXcgKyBmaWx0ZXIgcm93c1xuICAgIGlmIChpc0NyZWF0aW5nKSBleHRyYVJvd0NvdW50ID0gY3JlYXRlRGF0YS5zaXplO1xuICAgIGlmIChpc0NyZWF0aW5nKSB7XG4gICAgICBpZiAocm93SW5kZXggPD0gKGV4dHJhUm93Q291bnQgLSAxKSkge1xuICAgICAgICBpZiAoY29sLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjZWxsID0gY29sLmNlbGxDcmVhdGUocm93SW5kZXgpO1xuICAgICAgICAgIGNlbGxUeXBlID0gJ2NyZWF0ZSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2VsbCA9IG51bGw7XG4gICAgICAgICAgY2VsbFR5cGUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjZWxsID0gY29sLmNlbGwocm93SW5kZXggLSBleHRyYVJvd0NvdW50KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzRWRpdGluZyAmJiBjb2wuY2VsbEVkaXQpIHtcbiAgICAgIGNlbGwgPSBjb2wuY2VsbEVkaXQocm93SW5kZXggLSBleHRyYVJvd0NvdW50KTtcbiAgICAgIGNlbGxUeXBlID0gJ2VkaXQnO1xuICAgIH0gZWxzZSB7XG4gICAgICBjZWxsID0gY29sLmNlbGwocm93SW5kZXggLSBleHRyYVJvd0NvdW50KTtcbiAgICB9XG4gICAgY29uc3QgaXNTcGVjaWFsID0gcHJvcHMuY29sdW1uS2V5ID09PSAnc2VsZWN0aW9uQ2hlY2tib3gnIHx8IHByb3BzLmNvbHVtbktleSA9PT0gJ2V4dHJhQ29sdW1uJztcbiAgICBpZiAoKGNlbGxUeXBlID09PSAndmlldycgfHwgY2VsbFR5cGUgPT09ICdlZGl0JyB8fCBjZWxsVHlwZSA9PT0gJ2NyZWF0ZScpICYmICFpc1NwZWNpYWwpIHtcbiAgICAgIGNvbnN0IGdldFJvd0luZGV4ID0gKGNlbGxUeXBlID09PSAnY3JlYXRlJykgPyByb3dJbmRleCA6IChyb3dJbmRleCAtIGV4dHJhUm93Q291bnQpO1xuICAgICAgY29uc3QgbWVzc2FnZURhdGEgPSB0aGlzLmdldENlbGxNZXNzYWdlcyhnZXRSb3dJbmRleCwgY29sLCBjZWxsVHlwZSk7XG4gICAgICBjb25zdCBpc0VkaXRlZCA9IHRoaXMuaXNDZWxsRWRpdGVkKGdldFJvd0luZGV4LCBjb2wsIGNlbGxUeXBlKTtcbiAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IChzZWxlY3RlZENlbGwuZ2V0KCdyb3dJbmRleCcpID09PSByb3dJbmRleCAmJiBzZWxlY3RlZENlbGwuZ2V0KCdjb2x1bW5LZXknKSA9PT0gcHJvcHMuY29sdW1uS2V5KSA/XG4gICAgICAgICdvYy1kYXRhZ3JpZC1jZWxsIGlzLXNlbGVjdGVkJyA6ICdvYy1kYXRhZ3JpZC1jZWxsJztcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxDZWxsXG4gICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICAgIHN0eWxlPXtjb2wuc3R5bGV9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDZWxsU2VsZWN0KGNlbGxUeXBlLCByb3dJbmRleCwgcHJvcHMuY29sdW1uS2V5KX1cbiAgICAgICAgPlxuICAgICAgICAgIDxDZWxsVG9vbHRpcFxuICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkQ2VsbC0ke2dyaWQuaWR9LSR7cHJvcHMuY29sdW1uS2V5fS0ke3Jvd0luZGV4fWB9XG4gICAgICAgICAgICBpc0VkaXRlZD17aXNFZGl0ZWR9XG4gICAgICAgICAgICBpc0Vycm9yPXshIW1lc3NhZ2VEYXRhLmVycm9yTWVzc2FnZX1cbiAgICAgICAgICAgIGlzV2FybmluZz17ISFtZXNzYWdlRGF0YS53YXJuaW5nTWVzc2FnZX1cbiAgICAgICAgICAgIGluZm9NZXNzYWdlPXttZXNzYWdlRGF0YS5pbmZvTWVzc2FnZX1cbiAgICAgICAgICAgIGVycm9yTWVzc2FnZT17bWVzc2FnZURhdGEuZXJyb3JNZXNzYWdlfVxuICAgICAgICAgICAgd2FybmluZ01lc3NhZ2U9e21lc3NhZ2VEYXRhLndhcm5pbmdNZXNzYWdlfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtjZWxsfVxuICAgICAgICAgIDwvQ2VsbFRvb2x0aXA+XG4gICAgICAgIDwvQ2VsbD5cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8Q2VsbCB7Li4ucHJvcHN9IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWNlbGxcIiBzdHlsZT17Y29sLnN0eWxlfT57Y2VsbH08L0NlbGw+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJDb2x1bW5zID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5hbGxEYXRhU2l6ZSAmJiAhdGhpcy5wcm9wcy5pc0J1c3kgJiYgIXRoaXMucHJvcHMuaXNDcmVhdGluZykge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPENvbHVtblxuICAgICAgICAgIGNvbHVtbktleT1cImRhdGFFbXB0eUNvbHVtblwiXG4gICAgICAgICAgaGVhZGVyPXs8Q2VsbCBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInIH19PjxNIGlkPVwiR3JpZC5Ob0l0ZW1zXCIgLz48L0NlbGw+fVxuICAgICAgICAgIHdpZHRoPXsxMH1cbiAgICAgICAgICBpc1Jlc2l6YWJsZT17ZmFsc2V9XG4gICAgICAgICAgZmxleEdyb3c9ezF9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoIXRoaXMucHJvcHMudmlzaWJsZUNvbHVtbnMuc2l6ZSkge1xuICAgICAgaWYgKHRoaXMucHJvcHMuaXNCdXN5KSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPENvbHVtblxuICAgICAgICAgICAgY29sdW1uS2V5PVwiZGF0YUVtcHR5Q29sdW1uXCJcbiAgICAgICAgICAgIGhlYWRlcj17PENlbGw+Jm5ic3A7PC9DZWxsPn1cbiAgICAgICAgICAgIHdpZHRoPXsxMH1cbiAgICAgICAgICAgIGlzUmVzaXphYmxlPXtmYWxzZX1cbiAgICAgICAgICAgIGZsZXhHcm93PXsxfVxuICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Q29sdW1uXG4gICAgICAgICAgY29sdW1uS2V5PVwiZGF0YUVtcHR5Q29sdW1uXCJcbiAgICAgICAgICBoZWFkZXI9ezxDZWxsIHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicgfX0+PE0gaWQ9XCJHcmlkLk5vQ29sdW1uc1wiIC8+PC9DZWxsPn1cbiAgICAgICAgICB3aWR0aD17MTB9XG4gICAgICAgICAgaXNSZXNpemFibGU9e2ZhbHNlfVxuICAgICAgICAgIGZsZXhHcm93PXsxfVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3QgY29sdW1ucyA9IHRoaXMuZ2VuZXJhdGVDb2x1bW5zKCk7XG4gICAgaWYgKGNvbHVtbnMubGVuZ2h0ID09PSAwKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gY29sdW1ucy5tYXAoY29sID0+IChcbiAgICAgIDxDb2x1bW5cbiAgICAgICAga2V5PXtjb2wuY29sdW1uS2V5fVxuICAgICAgICBjb2x1bW5LZXk9e2NvbC5jb2x1bW5LZXl9XG4gICAgICAgIGhlYWRlcj17XG4gICAgICAgICAgPEhlYWRlckNlbGxcbiAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZEhlYWRlci0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tJHtjb2wuY29sdW1uS2V5fWB9XG4gICAgICAgICAgICBncmlkPXt0aGlzLnByb3BzLmdyaWR9XG4gICAgICAgICAgICBjb2x1bW5zPXt0aGlzLnByb3BzLmNvbHVtbnN9XG4gICAgICAgICAgICBjb2x1bW49e2NvbH1cbiAgICAgICAgICAgIGN1cnJlbnRTb3J0Q29sdW1uPXt0aGlzLnByb3BzLnNvcnRDb2x1bW59XG4gICAgICAgICAgICBjdXJyZW50U29ydE9yZGVyPXt0aGlzLnByb3BzLnNvcnRPcmRlcn1cbiAgICAgICAgICAgIG9uU29ydENoYW5nZT17dGhpcy5wcm9wcy5zb3J0Q2hhbmdlfVxuICAgICAgICAgICAgaXNCdXN5PXt0aGlzLnByb3BzLmlzQnVzeX1cbiAgICAgICAgICAgIGZpbHRlcmluZz17dGhpcy5wcm9wcy5pc0ZpbHRlcmluZ31cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7Y29sLmhlYWRlcn1cbiAgICAgICAgICA8L0hlYWRlckNlbGw+XG4gICAgICAgIH1cbiAgICAgICAgY2VsbD17dGhpcy5yZW5kZXJDZWxsKGNvbCl9XG4gICAgICAgIHdpZHRoPXt0aGlzLnByb3BzLmNvbHVtbldpZHRocy5nZXQoY29sLmNvbHVtbktleSwgY29sLndpZHRoKX1cbiAgICAgICAgbWluV2lkdGg9e2NvbC5taW5XaWR0aH1cbiAgICAgICAgbWF4V2lkdGg9e2NvbC5tYXhXaWR0aH1cbiAgICAgICAgaXNSZXNpemFibGU9e2NvbC5pc1Jlc2l6YWJsZX1cbiAgICAgICAgZmxleEdyb3c9e2NvbC5mbGV4R3JvdyA/IGNvbC5mbGV4R3JvdyA6IDB9XG4gICAgICAgIGZpeGVkPXtjb2wuZml4ZWR9XG4gICAgICAgIGFsbG93Q2VsbHNSZWN5Y2xpbmc9e2NvbC5hbGxvd0NlbGxzUmVjeWNsaW5nfVxuICAgICAgLz4pKTtcbiAgfTtcblxuICByZW5kZXJDb250ZXh0TWVudSA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBjb250ZXh0TWVudUl0ZW1zLFxuICAgICAgZGF0YSxcbiAgICAgIGdyaWQsXG4gICAgICBzZWxlY3RlZEl0ZW1zLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHtcbiAgICAgIGNvbnRleHRNZW51WCxcbiAgICAgIGNvbnRleHRNZW51WSxcbiAgICB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBzdHlsZSA9IHtcbiAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICB6SW5kZXg6IDEwMDAwLFxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICB0b3A6IGAke2NvbnRleHRNZW51WX1weGAsXG4gICAgICBsZWZ0OiBgJHtjb250ZXh0TWVudVh9cHhgLFxuICAgIH07XG4gICAgY29uc3Qgc2VsZWN0ZWREYXRhID0gZGF0YS5maWx0ZXIoZCA9PiBzZWxlY3RlZEl0ZW1zLmluY2x1ZGVzKGQuZ2V0SW4oZ3JpZC5pZEtleVBhdGgpKSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDx1bCBjbGFzc05hbWU9XCJkcm9wZG93bi1tZW51IG9jLWRhdGFncmlkLWNvbnRleHQtbWVudSBvcGVuXCIgc3R5bGU9e3N0eWxlfT5cbiAgICAgICAge2NvbnRleHRNZW51SXRlbXMgJiYgY29udGV4dE1lbnVJdGVtcy5tYXAgJiYgY29udGV4dE1lbnVJdGVtcy5tYXAoKGl0ZW0sIGkpID0+IHtcbiAgICAgICAgICBsZXQgeyBkaXNhYmxlZCB9ID0gaXRlbTtcbiAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0uZGlzYWJsZWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGRpc2FibGVkID0gaXRlbS5kaXNhYmxlZChzZWxlY3RlZEl0ZW1zLCBzZWxlY3RlZERhdGEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPE1lbnVJdGVtXG4gICAgICAgICAgICAgIGtleT17aX0gLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAgICAgICBoZWFkZXI9e2l0ZW0uaGVhZGVyfVxuICAgICAgICAgICAgICBkaXZpZGVyPXtpdGVtLmRpdmlkZXJ9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgdGl0bGU9e2l0ZW0udGl0bGV9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9eyhkaXNhYmxlZCB8fCAhaXRlbS5vbkNsaWNrKSA/IG51bGwgOiB0aGlzLmhhbmRsZUNvbnRleHRNZW51SXRlbUNsaWNrKFxuICAgICAgICAgICAgICAgIGl0ZW0ub25DbGljayxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEl0ZW1zLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkRGF0YSxcbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2l0ZW0udmFsdWV9XG4gICAgICAgICAgICA8L01lbnVJdGVtPlxuICAgICAgICAgICk7XG4gICAgICAgIH0pfVxuICAgICAgPC91bD5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBncmlkQ2xhc3NOYW1lID0gY2xhc3NOYW1lcyh7XG4gICAgICAnb2MtZGF0YWdyaWQtY29udGFpbmVyJzogdHJ1ZSxcbiAgICAgICd3aXRoLWFjdGlvbmJhcic6IHRoaXMucHJvcHMuaW5saW5lRWRpdCAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlQWN0aW9uQmFyLFxuICAgICAgJ2lzLWJ1c3knOiB0aGlzLnByb3BzLmlzQnVzeSxcbiAgICAgICdpcy1lZGl0aW5nJzogdGhpcy5wcm9wcy5pc0VkaXRpbmcsXG4gICAgICAnaXMtY3JlYXRpbmcnOiB0aGlzLnByb3BzLmlzQ3JlYXRpbmcsXG4gICAgICBbdGhpcy5wcm9wcy5jbGFzc05hbWVdOiAhIXRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgIH0pO1xuXG4gICAgLy8gY2hlY2sgaWYgdGhlcmUgaXMgYSBuZXcgcmVxdWVzdCB0byBjaGFuZ2UgZWRpdCBtb2RlIGZvY3VzXG4gICAgdGhpcy5zZXRGb2N1c1RvKHRoaXMucHJvcHMuZm9jdXNUeXBlKTtcblxuICAgIGxldCBhY3Rpb25CYXIgPSBudWxsO1xuICAgIGxldCBhY3Rpb25CYXJSaWdodCA9IG51bGw7XG4gICAgbGV0IGFjdGlvbkJhckxlZnQgPSBudWxsO1xuICAgIGlmIChcbiAgICAgICh0aGlzLnByb3BzLmFjdGlvbkJhciB8fFxuICAgICAgICB0aGlzLnByb3BzLmlubGluZUVkaXQgfHxcbiAgICAgICAgdGhpcy5wcm9wcy5maWx0ZXJpbmcgfHxcbiAgICAgICAgdGhpcy5wcm9wcy5yZW1vdmluZykgJiZcbiAgICAgICF0aGlzLnByb3BzLmRpc2FibGVBY3Rpb25CYXJcbiAgICApIHtcbiAgICAgIGFjdGlvbkJhclJpZ2h0ID0gKFxuICAgICAgICA8QWN0aW9uQmFyIHBvc2l0aW9uPVwicmlnaHRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWFjdGlvbmJhci1yaWdodFwiPnt0aGlzLnByb3BzLmFjdGlvbkJhcn08L2Rpdj5cbiAgICAgICAgICB7KHRoaXMucHJvcHMuZmlsdGVyaW5nICYmIHRoaXMucHJvcHMuZGlzYWJsZURyb3Bkb3duICYmXG4gICAgICAgICAgICAhdGhpcy5wcm9wcy5kaXNhYmxlRmlsdGVyaW5nQ29udHJvbHMpICYmIDxGaWx0ZXJpbmdDb250cm9scyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgICB9XG4gICAgICAgICAge3RoaXMucHJvcHMuaW5saW5lRWRpdCAmJlxuICAgICAgICAgIDxJbmxpbmVFZGl0Q29udHJvbHNcbiAgICAgICAgICAgIGFmdGVyQWRkSXRlbT17dGhpcy5oYW5kbGVBZnRlckFkZEl0ZW19XG4gICAgICAgICAgICBhZnRlckVkaXRQcmVzcz17dGhpcy5oYW5kbGVBZnRlckVkaXRQcmVzc31cbiAgICAgICAgICAgIGFmdGVyVmFsaWRhdGlvbkVycm9yPXt0aGlzLmhhbmRsZUFmdGVyVmFsaWRhdGlvbkVycm9yfVxuICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgLz5cbiAgICAgICAgICB9XG4gICAgICAgICAgeyh0aGlzLnByb3BzLmRyb3Bkb3duTWVudUl0ZW1zIHx8XG4gICAgICAgICAgICB0aGlzLnByb3BzLnJlbW92aW5nIHx8XG4gICAgICAgICAgICB0aGlzLnByb3BzLmNvbHVtblNldHRpbmdzIHx8XG4gICAgICAgICAgICAodGhpcy5wcm9wcy5maWx0ZXJpbmcgJiZcbiAgICAgICAgICAgICAgIXRoaXMucHJvcHMuZGlzYWJsZURyb3Bkb3duKSkgJiYgPERyb3Bkb3duQ29udHJvbHMgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICAgfVxuICAgICAgICA8L0FjdGlvbkJhcj5cbiAgICAgICk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLmFjdGlvbkJhckxlZnQgfHwgdGhpcy5wcm9wcy5ncmlkSGVhZGVyKSB7XG4gICAgICBhY3Rpb25CYXJMZWZ0ID0gKFxuICAgICAgICA8QWN0aW9uQmFyIHBvc2l0aW9uPVwibGVmdFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtZ3JpZGhlYWRlclwiPnt0aGlzLnByb3BzLmdyaWRIZWFkZXJ9PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1hY3Rpb25iYXItbGVmdFwiPnt0aGlzLnByb3BzLmFjdGlvbkJhckxlZnR9PC9kaXY+XG4gICAgICAgIDwvQWN0aW9uQmFyPlxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGFjdGlvbkJhckxlZnQgfHwgYWN0aW9uQmFyUmlnaHQpIHtcbiAgICAgIGFjdGlvbkJhciA9IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1hY3Rpb25iYXItY29udGFpbmVyXCI+XG4gICAgICAgICAge2FjdGlvbkJhckxlZnR9XG4gICAgICAgICAge2FjdGlvbkJhclJpZ2h0fVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICAgIGxldCByb3dzQ291bnQgPVxuICAgICAgKHRoaXMucHJvcHMucm93c0NvdW50IHx8IHRoaXMucHJvcHMucm93c0NvdW50ID09PSAwKSA/XG4gICAgICAgIHRoaXMucHJvcHMucm93c0NvdW50IDpcbiAgICAgICAgdGhpcy5wcm9wcy5kYXRhLnNpemU7XG4gICAgaWYgKHRoaXMucHJvcHMuaXNDcmVhdGluZykgcm93c0NvdW50ICs9IHRoaXMucHJvcHMuY3JlYXRlRGF0YS5zaXplO1xuICAgIGlmICghdGhpcy5wcm9wcy52aXNpYmxlQ29sdW1ucy5zaXplKSByb3dzQ291bnQgPSAwO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPXtgb2MtZGF0YWdyaWQtJHt0aGlzLnByb3BzLmdyaWQuaWR9YH1cbiAgICAgICAgY2xhc3NOYW1lPXtncmlkQ2xhc3NOYW1lfVxuICAgICAgICBzdHlsZT17dGhpcy5wcm9wcy5jb250YWluZXJTdHlsZX1cbiAgICAgID5cbiAgICAgICAge3RoaXMucHJvcHMuaXNCdXN5ICYmIDxTcGlubmVyIC8+fVxuICAgICAgICB7dGhpcy5zdGF0ZS5jb250ZXh0TWVudU9wZW4gJiYgdGhpcy5yZW5kZXJDb250ZXh0TWVudSgpfVxuICAgICAgICB7YWN0aW9uQmFyfVxuICAgICAgICA8UmVzcG9uc2l2ZUZpeGVkRGF0YVRhYmxlXG4gICAgICAgICAgaWQ9e3RoaXMucHJvcHMuZ3JpZC5pZH1cbiAgICAgICAgICByb3dzQ291bnQ9e3Jvd3NDb3VudH1cbiAgICAgICAgICBoZWFkZXJIZWlnaHQ9e3RoaXMucHJvcHMuaXNGaWx0ZXJpbmcgP1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5oZWFkZXJIZWlnaHQgKyB0aGlzLnByb3BzLmZpbHRlclJvd0hlaWdodFxuICAgICAgICAgICAgOiB0aGlzLnByb3BzLmhlYWRlckhlaWdodH1cbiAgICAgICAgICByb3dIZWlnaHQ9e3RoaXMucHJvcHMucm93SGVpZ2h0fVxuICAgICAgICAgIG9uQ29sdW1uUmVzaXplRW5kQ2FsbGJhY2s9e3RoaXMub25Db2x1bW5SZXNpemVFbmRDYWxsYmFja31cbiAgICAgICAgICBpc0NvbHVtblJlc2l6aW5nPXtmYWxzZX1cbiAgICAgICAgICBvblJvd0NsaWNrPXt0aGlzLmhhbmRsZVJvd0NsaWNrfVxuICAgICAgICAgIHNjcm9sbFRvQ29sdW1uPXt0aGlzLnByb3BzLnNjcm9sbFRvQ29sdW1uIHx8IHRoaXMuc3RhdGUuY3VycmVudENvbHVtbn1cbiAgICAgICAgICBzY3JvbGxUb3A9e3RoaXMucHJvcHMuc2Nyb2xsVG9wfVxuICAgICAgICAgIHNjcm9sbFRvUm93PXt0aGlzLmdldFNjcm9sbFRvUm93KCl9XG4gICAgICAgICAgb25Sb3dEb3VibGVDbGljaz17dGhpcy5wcm9wcy5vblJvd0RvdWJsZUNsaWNrfVxuICAgICAgICAgIG9uUm93TW91c2VEb3duPXt0aGlzLnByb3BzLm9uTW91c2VEb3dufVxuICAgICAgICAgIG9uUm93TW91c2VFbnRlcj17dGhpcy5wcm9wcy5vblJvd01vdXNlRW50ZXJ9XG4gICAgICAgICAgb25Sb3dNb3VzZUxlYXZlPXt0aGlzLnByb3BzLm9uUm93TW91c2VMZWF2ZX1cbiAgICAgICAgICBvblNjcm9sbFN0YXJ0PXt0aGlzLnByb3BzLm9uU2Nyb2xsU3RhcnR9XG4gICAgICAgICAgb25TY3JvbGxFbmQ9e3RoaXMucHJvcHMub25TY3JvbGxFbmR9XG4gICAgICAgICAgcm93Q2xhc3NOYW1lR2V0dGVyPXt0aGlzLmdldFJvd0NsYXNzTmFtZX1cbiAgICAgICAgICByb3dIZWlnaHRHZXR0ZXI9e3RoaXMucHJvcHMucm93SGVpZ2h0R2V0dGVyICYmIHRoaXMuaGFuZGxlUm93SGVpZ2h0R2V0dGVyfVxuICAgICAgICAgIG9uQ29udGVudEhlaWdodENoYW5nZT17dGhpcy5wcm9wcy5vbkNvbnRlbnRIZWlnaHRDaGFuZ2V9XG4gICAgICAgICAgb25Sb3dDb250ZXh0TWVudT17dGhpcy5oYW5kbGVDb250ZXh0TWVudX1cbiAgICAgICAgPlxuICAgICAgICAgIHt0aGlzLnJlbmRlckNvbHVtbnMoKX1cbiAgICAgICAgPC9SZXNwb25zaXZlRml4ZWREYXRhVGFibGU+XG4gICAgICAgIHt0aGlzLnByb3BzLmlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW4gJiZcbiAgICAgICAgPENvbHVtblNldHRpbmdzTW9kYWxcbiAgICAgICAgICBncmlkPXt0aGlzLnByb3BzLmdyaWR9XG4gICAgICAgICAgY29sdW1ucz17dGhpcy5wcm9wcy5jb2x1bW5zfVxuICAgICAgICAgIHZpc2libGVDb2x1bW5zPXt0aGlzLnByb3BzLnZpc2libGVDb2x1bW5zfVxuICAgICAgICAgIGNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbD17dGhpcy5wcm9wcy5jbG9zZUNvbHVtblNldHRpbmdzTW9kYWx9XG4gICAgICAgICAgc2F2ZUNvbHVtblNldHRpbmdzPXt0aGlzLnByb3BzLnNhdmVDb2x1bW5TZXR0aW5nc31cbiAgICAgICAgLz5cbiAgICAgICAgfVxuICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRGF0YUdyaWQ7XG4iXX0=