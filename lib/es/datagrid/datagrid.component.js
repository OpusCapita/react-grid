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
        currentCell = _this2.getSelectRef(proxy);
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
              nextElement = _this2.getSelectRef(nextElement);
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
              _nextElement = _this2.getSelectRef(_nextElement);
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
                  // if no element was found, try moving to previous row
                  // (needed in case first column is not editable e.g. an ExtraColumn)
                  if (rowInd > 0 && !_nextElement2) {
                    columnInd = gridColumns.length - 1;
                    rowInd -= 1;
                    _nextElement2 = cellRefs[grid.id + '_' + getColumnKeyByIndex(columnInd) + '_' + rowInd];
                  }
                }
                disabled = _nextElement2 ? _nextElement2.disabled : false;
              }
              if (!disabled && _nextElement2) {
                if (_nextElement2.selectRef) _nextElement2 = _this2.getSelectRef(_nextElement2);
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

  this.getSelectRef = function (component) {
    if (!component) return null;
    if (component.selectRef.select.select) return component.selectRef.select.select.inputRef;
    return component.selectRef.select.inputRef;
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
  };

  this.getCreateItemValue = function (rowIndex, col) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    var val = _this2.props.createData.getIn([rowIndex].concat(col.valueKeyPath), '');
    if (val === null) {
      return '';
    } else if (col.componentType === 'select' || col.componentType === 'multiselect') {
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
    } else if (col.componentType === 'multiselect') {
      // session storage content is converted to immutable and multiselect
      // filters is then list otherwise array
      return val && val.toJS ? val.toJS() : val || undefined;
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
      if (_this2.props.isEditing && !_this2.props.scrollInEditMode) {
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
      var selectRef = !ref || ref.focus ? ref : _this2.getSelectRef(ref);
      if (_this2.props.createData.size && _this2.props.createData.size === rowIndex + 1 && _this2.focusToCreateCell && !_this2.getComponentDisabledState(rowIndex, col, 'create') && selectRef) {
        selectRef.focus();
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

        var selectRef = !ref || ref.focus ? ref : _this2.getSelectRef(ref);
        if (selectedCell.size > 0) {
          if (selectedCell.get('rowIndex') === rowIndex && selectedCell.get('columnKey') === columnKey && selectRef) {
            selectRef.focus();
            _this2.focusToEditCell = false;
            _this2.focusToLastRow = false;
          }
        } else if (selectedRowIndex === undefined) {
          _this2.focusToEditCell = false;
          _this2.focusToLastRow = false;
        } else if (selectedRowIndex === rowIndex && selectRef) {
          selectRef.focus();
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
    var _props7 = _this2.props,
        allDataSize = _props7.allDataSize,
        grid = _props7.grid,
        isCreating = _props7.isCreating,
        isBusy = _props7.isBusy,
        visibleColumns = _props7.visibleColumns;

    if (!allDataSize && !isBusy && !isCreating && !grid.pagination) {
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
    if (!visibleColumns.size) {
      if (isBusy) {
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
        fixedRight: col.fixedRight,
        allowCellsRecycling: col.allowCellsRecycling
      });
    });
  };

  this.renderContextMenu = function () {
    var _props8 = _this2.props,
        contextMenuItems = _props8.contextMenuItems,
        data = _props8.data,
        grid = _props8.grid,
        selectedItems = _props8.selectedItems;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiTWFwIiwiTGlzdCIsImNvbm5lY3QiLCJpbmplY3RJbnRsIiwiRm9ybWF0dGVkTWVzc2FnZSIsIk0iLCJDb2x1bW4iLCJDZWxsIiwiTWVudUl0ZW0iLCJjbGFzc05hbWVzIiwiSWNvbiIsIlNwaW5uZXIiLCJDaGVja2JveCIsIlJlc3BvbnNpdmVGaXhlZERhdGFUYWJsZSIsIkhlYWRlckNlbGwiLCJBY3Rpb25CYXIiLCJJbmxpbmVFZGl0Q29udHJvbHMiLCJGaWx0ZXJpbmdDb250cm9scyIsIkRyb3Bkb3duQ29udHJvbHMiLCJkYXRhZ3JpZEFjdGlvbnMiLCJDZWxsVG9vbHRpcCIsIkNvbHVtblNldHRpbmdzTW9kYWwiLCJwcm9wVHlwZXMiLCJkZWZhdWx0UHJvcHMiLCJLRVlfQ09ERVMiLCJwYWdpbmF0aW9uIiwiVXRpbHMiLCJHcmlkQ29sdW1uU2VydmljZSIsIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwib3duUHJvcHMiLCJHUklEIiwiZ3JpZCIsImlzQnVzeSIsImRhdGFncmlkIiwiZ2V0SW4iLCJpZCIsImlzRWRpdGluZyIsImlzQ3JlYXRpbmciLCJpc0ZpbHRlcmluZyIsImlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW4iLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwidmlzaWJsZUNvbHVtbnMiLCJjb2x1bW5XaWR0aHMiLCJzZWxlY3RlZENlbGwiLCJzZWxlY3RlZEl0ZW1zIiwiZGF0YSIsImVkaXREYXRhIiwiY3JlYXRlRGF0YSIsImZpbHRlckRhdGEiLCJjZWxsTWVzc2FnZXMiLCJjcmVhdGVDZWxsTWVzc2FnZXMiLCJhbGxEYXRhU2l6ZSIsInNpemUiLCJsYW5ndWFnZSIsImdldExhbmd1YWdlIiwidXNlciIsInJlZ2lvbiIsImdldFJlZ2lvbiIsImRhdGVGb3JtYXQiLCJnZXREYXRlRm9ybWF0IiwidGhvdXNhbmRTZXBhcmF0b3IiLCJnZXRUaG91c2FuZFNlcGFyYXRvciIsImRlY2ltYWxTZXBhcmF0b3IiLCJnZXREZWNpbWFsU2VwYXJhdG9yIiwiZm9yY2VSZWZyZXNoVGltZXN0YW1wIiwiZ2V0IiwiZm9jdXNUeXBlIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwiRGF0YUdyaWQiLCJwcm9wcyIsImN1cnJlbnRSb3ciLCJjdXJyZW50Q29sdW1uIiwiY29udGV4dE1lbnVPcGVuIiwiY29udGV4dE1lbnVYIiwiY29udGV4dE1lbnVZIiwiY2VsbFJlZnMiLCJjcmVhdGVDZWxsUmVmcyIsImZvY3VzVG9DcmVhdGVDZWxsIiwiZm9jdXNUb0VkaXRDZWxsIiwiZm9jdXNUb0Vycm9yQ2VsbCIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwiZG9jdW1lbnQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwib25Eb2N1bWVudENsaWNrIiwiaW52YWxpZGF0ZSIsInJlbmRlciIsImdyaWRDbGFzc05hbWUiLCJpbmxpbmVFZGl0IiwiZGlzYWJsZUFjdGlvbkJhciIsImNsYXNzTmFtZSIsInNldEZvY3VzVG8iLCJhY3Rpb25CYXIiLCJhY3Rpb25CYXJSaWdodCIsImFjdGlvbkJhckxlZnQiLCJmaWx0ZXJpbmciLCJyZW1vdmluZyIsImRpc2FibGVEcm9wZG93biIsImRpc2FibGVGaWx0ZXJpbmdDb250cm9scyIsImhhbmRsZUFmdGVyQWRkSXRlbSIsImhhbmRsZUFmdGVyRWRpdFByZXNzIiwiaGFuZGxlQWZ0ZXJWYWxpZGF0aW9uRXJyb3IiLCJkcm9wZG93bk1lbnVJdGVtcyIsImNvbHVtblNldHRpbmdzIiwiZ3JpZEhlYWRlciIsInJvd3NDb3VudCIsImNvbnRhaW5lclN0eWxlIiwicmVuZGVyQ29udGV4dE1lbnUiLCJoZWFkZXJIZWlnaHQiLCJmaWx0ZXJSb3dIZWlnaHQiLCJyb3dIZWlnaHQiLCJvbkNvbHVtblJlc2l6ZUVuZENhbGxiYWNrIiwiaGFuZGxlUm93Q2xpY2siLCJzY3JvbGxUb0NvbHVtbiIsInNjcm9sbFRvcCIsImdldFNjcm9sbFRvUm93Iiwib25Sb3dEb3VibGVDbGljayIsIm9uTW91c2VEb3duIiwib25Sb3dNb3VzZUVudGVyIiwib25Sb3dNb3VzZUxlYXZlIiwib25TY3JvbGxTdGFydCIsIm9uU2Nyb2xsRW5kIiwiZ2V0Um93Q2xhc3NOYW1lIiwicm93SGVpZ2h0R2V0dGVyIiwiaGFuZGxlUm93SGVpZ2h0R2V0dGVyIiwib25Db250ZW50SGVpZ2h0Q2hhbmdlIiwiaGFuZGxlQ29udGV4dE1lbnUiLCJyZW5kZXJDb2x1bW5zIiwiY29sdW1ucyIsImNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbCIsInNhdmVDb2x1bW5TZXR0aW5ncyIsImNoaWxkcmVuIiwiUHVyZUNvbXBvbmVudCIsImNvbnRleHRNZW51SXRlbXMiLCJzZXRTdGF0ZSIsIm5ld0NvbHVtbldpZHRoIiwiY29sdW1uS2V5IiwicmVzaXplQ29sdW1uIiwib25DZWxsS2V5RG93biIsInJvd0luZGV4IiwiY29sIiwiZSIsImNyZWF0ZSIsImVuYWJsZUFycm93TmF2aWdhdGlvbiIsImFycm93S2V5cyIsIkRPV04iLCJVUCIsIkxFRlQiLCJSSUdIVCIsIm9uTGFzdENlbGxUYWJQcmVzcyIsImdyaWRDb2x1bW5zIiwiZ2V0Q29sdW1uS2V5QnlJbmRleCIsImdldENvbHVtbktleSIsImkiLCJyb3dzU2l6ZSIsImN1cnJlbnRDZWxsIiwicHJveHkiLCJpc0N1cnNvckF0U3RhcnQiLCJ0eXBlIiwic2VsZWN0aW9uU3RhcnQiLCJpc0N1cnNvckF0RW5kIiwic2VsZWN0aW9uRW5kIiwidmFsdWUiLCJsZW5ndGgiLCJzZWxlY3RSZWYiLCJnZXRTZWxlY3RSZWYiLCJpbmNsdWRlcyIsImtleUNvZGUiLCJwcmV2ZW50RGVmYXVsdCIsIkVOVEVSIiwiRVNDIiwiYWRkTmV3SXRlbSIsImdldENvbHVtbkRlZmF1bHRWYWx1ZXMiLCJzZWxlY3QiLCJuZXh0RWxlbWVudCIsIm1lbnVJc09wZW4iLCJtb3ZlQ2VsbEZvY3VzIiwiVEFCIiwiY29sdW1uSW5kIiwiZmluZEluZGV4IiwiYyIsInZhbHVlS2V5UGF0aCIsImpvaW4iLCJkaXNhYmxlZCIsInJvd0luZCIsInNoaWZ0S2V5Iiwib25FZGl0Q2VsbEtleURvd24iLCJvbkNyZWF0ZUNlbGxLZXlEb3duIiwib25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UiLCJ2YWx1ZVBhcnNlciIsImV2ZW50T3JEYXRhIiwicmF3VmFsdWUiLCJ0YXJnZXQiLCJ1bmRlZmluZWQiLCJmaWx0ZXJDZWxsVmFsdWVDaGFuZ2UiLCJvbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSIsImNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSIsIm9uQ3JlYXRlVmFsdWVDaGFuZ2UiLCJvblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZSIsIm1hdGNoVmFsdWUiLCJuZXdWYWx1ZUtleVBhdGgiLCJ2IiwibmV3VmFsdWUiLCJ2YWxpZGF0b3JzIiwiY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUiLCJvbkVkaXRDZWxsVmFsdWVDaGFuZ2UiLCJkYXRhSWQiLCJnZXREYXRhSWRCeVJvd0luZGV4IiwiZWRpdENlbGxWYWx1ZUNoYW5nZSIsIm9uRWRpdFZhbHVlQ2hhbmdlIiwiZWRpdENlbGxWYWx1ZVZhbGlkYXRlIiwib25DcmVhdGVDZWxsQmx1ciIsIm9uQ3JlYXRlQmx1ciIsImdldEVkaXRJdGVtVmFsdWUiLCJvbkVkaXRDZWxsQmx1ciIsIm9uRWRpdEJsdXIiLCJvbkNlbGxGb2N1cyIsImNlbGxUeXBlIiwiaW5wdXRUeXBlIiwiY2VsbFNlbGVjdGlvbkNoYW5nZSIsImNlbGxTZWxlY3QiLCJjb21wb25lbnQiLCJpbnB1dFJlZiIsImlkS2V5UGF0aCIsImdldFNlbGVjdGVkSXRlbUluZGV4IiwiaW5kZXgiLCJvcHRpb25zIiwiZWRpdFZhbHVlIiwib3JpZ2luYWxWYWx1ZSIsImNvbXBvbmVudFR5cGUiLCJzZWxlY3RPcHRpb25zIiwiZmluZCIsIm9iaiIsIlN0cmluZyIsInJlcGxhY2UiLCJnZXRDcmVhdGVJdGVtVmFsdWUiLCJ2YWwiLCJnZXRGaWx0ZXJJdGVtVmFsdWUiLCJ0b0pTIiwiZ2V0Q29tcG9uZW50RGlzYWJsZWRTdGF0ZSIsIm1vZGUiLCJjb21wb25lbnREaXNhYmxlZCIsImRpc2FibGVFZGl0aW5nIiwiZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2giLCJtYXRjaFZhbHVlS2V5UGF0aCIsInJvd0NsYXNzTmFtZXMiLCJleHRyYVJvd0NvdW50IiwicHVzaCIsImluZGV4T2YiLCJyb3dDbGFzc05hbWVHZXR0ZXIiLCJnZXRDZWxsTWVzc2FnZXMiLCJyZXR1cm5EYXRhIiwiaW5mb01lc3NhZ2UiLCJlcnJvck1lc3NhZ2UiLCJ3YXJuaW5nTWVzc2FnZSIsInNjcm9sbFRvUm93Iiwic2Nyb2xsTmV3Um93Iiwic2Nyb2xsSW5FZGl0TW9kZSIsImZpcnN0IiwiZm9jdXNUbyIsInByZXZGb2N1c1RvIiwiZm9jdXNUb0xhc3RSb3ciLCJoYW5kbGVDZWxsU2VsZWN0IiwiaGFuZGxlQ3JlYXRlQ2VsbFJlZiIsInJlZiIsImZvY3VzIiwiaGFuZGxlRWRpdENlbGxSZWYiLCJzZWxlY3RlZFJvd0luZGV4IiwiY29sdW1uSW5kZXgiLCJlbGVtZW50VHlwZXMiLCJzZXRUaW1lb3V0IiwiaGFuZGxlU2VsZWN0QWxsQ2hlY2tCb3hPbkNoYW5nZSIsInNlbGVjdEFsbEl0ZW1zQ2hhbmdlIiwiaGFuZGxlU2VsZWN0aW9uQ2hlY2tCb3hPbkNoYW5nZSIsIml0ZW1TZWxlY3Rpb25DaGFuZ2UiLCJnZW5lcmF0ZUNvbHVtbnMiLCJpbnRsIiwic2VsZWN0Q29tcG9uZW50T3B0aW9ucyIsImV4dHJhQ29sdW1uIiwicm93U2VsZWN0Q2hlY2tib3hDb2x1bW4iLCJzaG93U2VsZWN0QWxsQ2hlY2tib3giLCJ0YWJJbmRleCIsIndpZHRoIiwiaXNSZXNpemFibGUiLCJpc1NvcnRhYmxlIiwiY2VsbCIsInZhbHVlUmVuZGVyIiwiY2VsbEVkaXQiLCJjZWxsQ3JlYXRlIiwiY2VsbEZpbHRlciIsImhlYWRlciIsInJvd0l0ZW0iLCJpdGVtSWQiLCJzZWxlY3RlZCIsImZvckVhY2giLCJ2aXNpYmxlQ29sdW1uS2V5Iiwib3JnQ29sIiwidmFsdWVFbXB0eUNoZWNrZXIiLCJnZXRWYWx1ZUVtcHR5Q2hlY2tlciIsImZvcm1hdCIsImlzUmVxdWlyZWQiLCJjb2x1bW4iLCJiYXNlQ29sdW1uIiwiY29sdW1uRnVuY3Rpb25zIiwiZWRpdCIsImdldEl0ZW1WYWx1ZSIsIm9uQ2VsbFZhbHVlQ2hhbmdlIiwib25DZWxsQmx1ciIsImhhbmRsZUNlbGxSZWYiLCJmaWx0ZXIiLCJjZWxsUHJvcHMiLCJjb2x1bW5DZWxsIiwiY29tcG9uZW50VHlwZVByb3BzIiwiY29sdW1uQ29tcG9uZW50VHlwZSIsInBhZGRpbmciLCJyZW1vdmVOZXdJdGVtIiwiaXNDZWxsRWRpdGVkIiwicm93U2VsZWN0IiwiY3RybEtleSIsImdldFNlbGVjdGlvbiIsInJlbW92ZUFsbFJhbmdlcyIsInBhcmVudE5vZGUiLCJwYXJlbnQxY2xhc3MiLCJwYXJlbnQyY2xhc3MiLCJwYXJlbnQzY2xhc3MiLCJwYXJlbnQ0Y2xhc3MiLCJtdWx0aVNlbGVjdCIsIm9uUm93Q2xpY2siLCJzdG9wUHJvcGFnYXRpb24iLCJjbGllbnRYIiwiY2xpZW50WSIsImFkZEV2ZW50TGlzdGVuZXIiLCJoYW5kbGVDb250ZXh0TWVudUl0ZW1DbGljayIsIm9uQ2xpY2siLCJzZWxlY3RlZERhdGEiLCJyZW5kZXJDZWxsIiwiaXNTcGVjaWFsIiwiZ2V0Um93SW5kZXgiLCJtZXNzYWdlRGF0YSIsImlzRWRpdGVkIiwic3R5bGUiLCJ0ZXh0QWxpZ24iLCJsZW5naHQiLCJtYXAiLCJzb3J0Q2hhbmdlIiwibWluV2lkdGgiLCJtYXhXaWR0aCIsImZsZXhHcm93IiwiZml4ZWQiLCJmaXhlZFJpZ2h0IiwiYWxsb3dDZWxsc1JlY3ljbGluZyIsImRpc3BsYXkiLCJ6SW5kZXgiLCJwb3NpdGlvbiIsInRvcCIsImxlZnQiLCJkIiwiaXRlbSIsImRpdmlkZXIiLCJ0aXRsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsU0FBU0MsR0FBVCxFQUFjQyxJQUFkLFFBQTBCLFdB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QUFQLEVBQWE7QUFBQSxZQUN2RThCLFFBRHVFLEdBQzFEOEssSUFEMEQsQ0FDdkU5SyxRQUR1RTs7QUFFN0UsWUFBSSxPQUFPOEssS0FBSzlLLFFBQVosS0FBeUIsVUFBN0IsRUFBeUM7QUFDdkNBLHFCQUFXOEssS0FBSzlLLFFBQUwsQ0FBYzFJLGFBQWQsRUFBNkJpUyxZQUE3QixDQUFYO0FBQ0Q7QUFDRCxlQUNFO0FBQUMsa0JBQUQ7QUFBQTtBQUNFLGlCQUFLckwsQ0FEUCxDQUNVO0FBRFYsY0FFRSxRQUFRNE0sS0FBS25FLE1BRmY7QUFHRSxxQkFBU21FLEtBQUtDLE9BSGhCO0FBSUUsc0JBQVUvSyxRQUpaO0FBS0UsbUJBQU84SyxLQUFLRSxLQUxkO0FBTUUscUJBQVVoTCxZQUFZLENBQUM4SyxLQUFLeEIsT0FBbkIsR0FBOEIsSUFBOUIsR0FBcUMsT0FBS0QsMEJBQUwsQ0FDNUN5QixLQUFLeEIsT0FEdUMsRUFFNUNoUyxhQUY0QyxFQUc1Q2lTLFlBSDRDO0FBTmhEO0FBWUd1QixlQUFLbk07QUFaUixTQURGO0FBZ0JELE9BckI0QztBQUQvQyxLQURGO0FBMEJELEc7Ozs7QUF3SEgsZUFBZTdGLFFBQWYiLCJmaWxlIjoiZGF0YWdyaWQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tbG9uZWx5LWlmLCBwcmVmZXItdGVtcGxhdGUsIHJlYWN0L3JlcXVpcmUtZGVmYXVsdC1wcm9wcyAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IE1hcCwgTGlzdCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHtcbiAgaW5qZWN0SW50bCxcbiAgRm9ybWF0dGVkTWVzc2FnZSBhcyBNLFxufSBmcm9tICdyZWFjdC1pbnRsJztcbmltcG9ydCB7IENvbHVtbiwgQ2VsbCB9IGZyb20gJ2ZpeGVkLWRhdGEtdGFibGUtMic7XG5pbXBvcnQgeyBNZW51SXRlbSB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IEljb24gfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1pY29ucyc7XG5pbXBvcnQgU3Bpbm5lciBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1zcGlubmVyJztcbmltcG9ydCBDaGVja2JveCBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1jaGVja2JveCc7XG5pbXBvcnQgJ2ZpeGVkLWRhdGEtdGFibGUtMi9kaXN0L2ZpeGVkLWRhdGEtdGFibGUuY3NzJztcblxuaW1wb3J0IFJlc3BvbnNpdmVGaXhlZERhdGFUYWJsZSBmcm9tICcuL3Jlc3BvbnNpdmUtZml4ZWQtZGF0YS10YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IEhlYWRlckNlbGwgZnJvbSAnLi9oZWFkZXItY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IEFjdGlvbkJhciBmcm9tICcuL2FjdGlvbi1iYXIuY29tcG9uZW50JztcbmltcG9ydCBJbmxpbmVFZGl0Q29udHJvbHMgZnJvbSAnLi9pbmxpbmUtZWRpdC1jb250cm9scy5jb21wb25lbnQnO1xuaW1wb3J0IEZpbHRlcmluZ0NvbnRyb2xzIGZyb20gJy4vZmlsdGVyaW5nLWNvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgRHJvcGRvd25Db250cm9scyBmcm9tICcuL2Ryb3Bkb3duLWNvbnRyb2xzLmNvbXBvbmVudCc7XG5pbXBvcnQgKiBhcyBkYXRhZ3JpZEFjdGlvbnMgZnJvbSAnLi9kYXRhZ3JpZC5hY3Rpb25zJztcbmltcG9ydCBDZWxsVG9vbHRpcCBmcm9tICcuL2NlbGwtdG9vbHRpcC5jb21wb25lbnQnO1xuaW1wb3J0IENvbHVtblNldHRpbmdzTW9kYWwgZnJvbSAnLi9jb2x1bW4tc2V0dGluZ3MvY29sdW1uLXNldHRpbmdzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBwcm9wVHlwZXMsIGRlZmF1bHRQcm9wcyB9IGZyb20gJy4vZGF0YWdyaWQucHJvcHMnO1xuaW1wb3J0IHsgS0VZX0NPREVTIH0gZnJvbSAnLi9kYXRhZ3JpZC5jb25zdGFudHMnO1xuaW1wb3J0IHBhZ2luYXRpb24gZnJvbSAnLi9wYWdpbmF0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9kYXRhZ3JpZC51dGlscyc7XG5pbXBvcnQgR3JpZENvbHVtblNlcnZpY2UgZnJvbSAnLi9jb2x1bW4tc2VydmljZS9jb2x1bW4tc2VydmljZSc7XG5pbXBvcnQgJy4vZGF0YWdyaWQuY29tcG9uZW50LnNjc3MnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUsIG93blByb3BzKSA9PiB7XG4gIGNvbnN0IEdSSUQgPSBvd25Qcm9wcy5ncmlkO1xuICByZXR1cm4ge1xuICAgIGlzQnVzeTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2lzQnVzeSddLCB0cnVlKSxcbiAgICBpc0VkaXRpbmc6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdpc0VkaXRpbmcnXSwgZmFsc2UpLFxuICAgIGlzQ3JlYXRpbmc6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdpc0NyZWF0aW5nJ10sIGZhbHNlKSxcbiAgICBpc0ZpbHRlcmluZzpcbiAgICAgIHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnaXNGaWx0ZXJpbmcnXSwgZmFsc2UpLFxuICAgIGlzQ29sdW1uU2V0dGluZ3NNb2RhbE9wZW46XG4gICAgICBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnY29sdW1uU2V0dGluZ3NNb2RhbCcsICdvcGVuJ10sIGZhbHNlKSxcbiAgICBzb3J0Q29sdW1uOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdzb3J0aW5nRGF0YScsICdzb3J0Q29sdW1uJ10sIG51bGwpLFxuICAgIHNvcnRPcmRlcjogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnc29ydGluZ0RhdGEnLCAnc29ydE9yZGVyJ10sIG51bGwpLFxuICAgIHZpc2libGVDb2x1bW5zOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICd2aXNpYmxlQ29sdW1ucyddLCBMaXN0KCkpLFxuICAgIGNvbHVtbldpZHRoczogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnY29sdW1uV2lkdGhzJ10sIE1hcCgpKSxcbiAgICBzZWxlY3RlZENlbGw6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2VsZWN0ZWRDZWxsJ10sIE1hcCgpKSxcbiAgICBzZWxlY3RlZEl0ZW1zOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3NlbGVjdGVkSXRlbXMnXSwgTGlzdCgpKSxcbiAgICBkYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2RhdGEnXSwgTGlzdCgpKSxcbiAgICBlZGl0RGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdlZGl0RGF0YSddLCBNYXAoKSksXG4gICAgY3JlYXRlRGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjcmVhdGVEYXRhJ10sIExpc3QoKSksXG4gICAgZmlsdGVyRGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdmaWx0ZXJEYXRhJ10sIE1hcCgpKSxcbiAgICBjZWxsTWVzc2FnZXM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY2VsbE1lc3NhZ2VzJ10sIE1hcCgpKSxcbiAgICBjcmVhdGVDZWxsTWVzc2FnZXM6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY3JlYXRlQ2VsbE1lc3NhZ2VzJ10sIE1hcCgpKSxcbiAgICBhbGxEYXRhU2l6ZTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdhbGxEYXRhJ10sIExpc3QoKSkuc2l6ZSxcbiAgICBsYW5ndWFnZTogVXRpbHMuZ2V0TGFuZ3VhZ2UoR1JJRCwgc3RhdGUudXNlciksXG4gICAgcmVnaW9uOiBVdGlscy5nZXRSZWdpb24oR1JJRCwgc3RhdGUudXNlciksXG4gICAgZGF0ZUZvcm1hdDogVXRpbHMuZ2V0RGF0ZUZvcm1hdChHUklELCBzdGF0ZS51c2VyKSxcbiAgICB0aG91c2FuZFNlcGFyYXRvcjogVXRpbHMuZ2V0VGhvdXNhbmRTZXBhcmF0b3IoR1JJRCwgc3RhdGUudXNlciksXG4gICAgZGVjaW1hbFNlcGFyYXRvcjogVXRpbHMuZ2V0RGVjaW1hbFNlcGFyYXRvcihHUklELCBzdGF0ZS51c2VyKSxcbiAgICBmb3JjZVJlZnJlc2hUaW1lc3RhbXA6IHN0YXRlLmRhdGFncmlkLmdldCgnZm9yY2VSZWZyZXNoJywgMCksIC8vIGZvcmNlIHJlLXJlbmRlciB3aGVuIGNoYW5nZWRcbiAgICBmb2N1c1R5cGU6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdmb2N1c1R5cGUnXSwgTWFwKCkpLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGF0YWdyaWRBY3Rpb25zO1xuXG5AcGFnaW5hdGlvblxuQGluamVjdEludGxcbkBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKVxuY2xhc3MgRGF0YUdyaWQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHByb3BUeXBlcztcbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY3VycmVudFJvdzogMCxcbiAgICAgIGN1cnJlbnRDb2x1bW46IDAsXG4gICAgICBjb250ZXh0TWVudU9wZW46IGZhbHNlLFxuICAgICAgY29udGV4dE1lbnVYOiBudWxsLFxuICAgICAgY29udGV4dE1lbnVZOiBudWxsLFxuICAgIH07XG4gICAgdGhpcy5jZWxsUmVmcyA9IHt9O1xuICAgIHRoaXMuY3JlYXRlQ2VsbFJlZnMgPSB7fTtcbiAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsID0gZmFsc2U7XG4gICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTsgLy8gVE9ETzogSGFuZGxlIGZvY3VzaW5nIHdoZW4gdHJ1ZVxuICAgIHRoaXMuZm9jdXNUb0Vycm9yQ2VsbCA9IGZhbHNlOyAvLyBUT0RPOiBIYW5kbGUgZm9jdXNpbmcgd2hlbiB0cnVlXG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25Eb2N1bWVudENsaWNrKTtcbiAgICB0aGlzLnByb3BzLmludmFsaWRhdGUodGhpcy5wcm9wcy5ncmlkKTtcbiAgfVxuXG4gIG9uRG9jdW1lbnRDbGljayA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5jb250ZXh0TWVudUl0ZW1zKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY29udGV4dE1lbnVPcGVuOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25Eb2N1bWVudENsaWNrKTtcbiAgfTtcblxuICBvbkNvbHVtblJlc2l6ZUVuZENhbGxiYWNrID0gKG5ld0NvbHVtbldpZHRoLCBjb2x1bW5LZXkpID0+IHtcbiAgICB0aGlzLnByb3BzLnJlc2l6ZUNvbHVtbih0aGlzLnByb3BzLmdyaWQsIGNvbHVtbktleSwgbmV3Q29sdW1uV2lkdGgpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gcm93SW5kZXggKGludClcbiAgICogQHBhcmFtIGNvbCAob2JqKS4gQ29sdW1uIG9iamVjdC5cbiAgICogQHBhcmFtIGUuIE9yaWdpbmFsIEtleURvd24gZXZlbnRcbiAgICogQHBhcmFtIGNyZWF0ZSAoYm9vbCkuIElzIHRoZSBjZWxsIGNyZWF0ZSBjZWxsIG9yIGVkaXQgY2VsbD9cbiAgICovXG4gIG9uQ2VsbEtleURvd24gPSAocm93SW5kZXgsIGNvbCwgZSwgY3JlYXRlID0gZmFsc2UpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5lbmFibGVBcnJvd05hdmlnYXRpb24pIHtcbiAgICAgIGNvbnN0IGNlbGxSZWZzID0gY3JlYXRlID8gdGhpcy5jcmVhdGVDZWxsUmVmcyA6IHRoaXMuY2VsbFJlZnM7XG4gICAgICBjb25zdCBhcnJvd0tleXMgPSBbS0VZX0NPREVTLkRPV04sIEtFWV9DT0RFUy5VUCwgS0VZX0NPREVTLkxFRlQsIEtFWV9DT0RFUy5SSUdIVF07XG4gICAgICBjb25zdCB7XG4gICAgICAgIGNvbHVtbnMsIHZpc2libGVDb2x1bW5zLCBncmlkLCBkYXRhLCBvbkxhc3RDZWxsVGFiUHJlc3MsXG4gICAgICB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IGdyaWRDb2x1bW5zID0gVXRpbHMudmlzaWJsZUNvbHVtbnMoY29sdW1ucywgdmlzaWJsZUNvbHVtbnMpO1xuICAgICAgY29uc3QgZ2V0Q29sdW1uS2V5QnlJbmRleCA9IGkgPT4gVXRpbHMuZ2V0Q29sdW1uS2V5KGdyaWRDb2x1bW5zW2ldKTtcbiAgICAgIGNvbnN0IHJvd3NTaXplID0gZGF0YS5zaXplO1xuICAgICAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCk7XG4gICAgICBsZXQgY3VycmVudENlbGwgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2NvbHVtbktleX1fJHtyb3dJbmRleH1gXTtcbiAgICAgIGxldCBwcm94eSA9IG51bGw7XG5cbiAgICAgIGNvbnN0IGlzQ3Vyc29yQXRTdGFydCA9ICgpID0+IHtcbiAgICAgICAgaWYgKGN1cnJlbnRDZWxsLnR5cGUgIT09ICd0ZXh0JykgcmV0dXJuIHRydWU7XG4gICAgICAgIHJldHVybiBjdXJyZW50Q2VsbC5zZWxlY3Rpb25TdGFydCA9PT0gMDtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGlzQ3Vyc29yQXRFbmQgPSAoKSA9PiB7XG4gICAgICAgIGlmIChjdXJyZW50Q2VsbC50eXBlICE9PSAndGV4dCcpIHJldHVybiB0cnVlO1xuICAgICAgICByZXR1cm4gY3VycmVudENlbGwuc2VsZWN0aW9uRW5kID09PSBjdXJyZW50Q2VsbC52YWx1ZS5sZW5ndGg7XG4gICAgICB9O1xuXG4gICAgICAvLyBJZiBjdXJyZW50IGNlbGwgaG9sZHMgYSByZWFjdC1mbG9hdGluZy1zZWxlY3QgY29tcG9uZW50XG4gICAgICBpZiAoY3VycmVudENlbGwgJiYgY3VycmVudENlbGwuc2VsZWN0UmVmKSB7XG4gICAgICAgIHByb3h5ID0gY3VycmVudENlbGw7XG4gICAgICAgIGN1cnJlbnRDZWxsID0gdGhpcy5nZXRTZWxlY3RSZWYocHJveHkpO1xuICAgICAgfVxuXG4gICAgICAvLyBQcmV2ZW50cyB1cC9kb3duIGFycm93IGZyb20gY2hhbmdpbmcgbnVtYmVyIGZpZWxkIHZhbHVlXG4gICAgICBpZiAoYXJyb3dLZXlzLmluY2x1ZGVzKGUua2V5Q29kZSkgJiYgY3VycmVudENlbGwudHlwZSA9PT0gJ251bWJlcicpIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgS0VZX0NPREVTLkVOVEVSOlxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5FU0M6IHtcbiAgICAgICAgICBpZiAoY3JlYXRlICYmIGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLkVOVEVSKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmFkZE5ld0l0ZW0oZ3JpZCwgVXRpbHMuZ2V0Q29sdW1uRGVmYXVsdFZhbHVlcyhjb2x1bW5zKSk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjdXJyZW50Q2VsbC5zZWxlY3QoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5ET1dOOiB7XG4gICAgICAgICAgbGV0IG5leHRFbGVtZW50ID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtjb2x1bW5LZXl9XyR7cm93SW5kZXggKyAxfWBdO1xuXG4gICAgICAgICAgLy8gUHJldmVudHMgbWVudSBmcm9tIG9wZW5pbmdcbiAgICAgICAgICBpZiAocHJveHkgJiYgcHJveHkuc2VsZWN0UmVmICYmICFwcm94eS5zZWxlY3RSZWYuc3RhdGUubWVudUlzT3Blbikge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKCFuZXh0RWxlbWVudCkgYnJlYWs7XG4gICAgICAgICAgICBuZXh0RWxlbWVudCA9IHRoaXMuZ2V0U2VsZWN0UmVmKG5leHRFbGVtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5tb3ZlQ2VsbEZvY3VzKG5leHRFbGVtZW50LCByb3dJbmRleCArIDEsIC0xKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5VUDoge1xuICAgICAgICAgIGxldCBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4IC0gMX1gXTtcblxuICAgICAgICAgIC8vIFByZXZlbnRzIG1lbnUgZnJvbSBvcGVuaW5nXG4gICAgICAgICAgaWYgKHByb3h5ICYmIHByb3h5LnNlbGVjdFJlZiAmJiAhcHJveHkuc2VsZWN0UmVmLnN0YXRlLm1lbnVJc09wZW4pIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmICghbmV4dEVsZW1lbnQpIGJyZWFrO1xuICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSB0aGlzLmdldFNlbGVjdFJlZihuZXh0RWxlbWVudCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubW92ZUNlbGxGb2N1cyhuZXh0RWxlbWVudCwgcm93SW5kZXggLSAxLCAtMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuVEFCOlxuICAgICAgICBjYXNlIEtFWV9DT0RFUy5SSUdIVDpcbiAgICAgICAgY2FzZSBLRVlfQ09ERVMuTEVGVDoge1xuICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5SSUdIVCAmJiAhaXNDdXJzb3JBdEVuZCgpKSBicmVhaztcbiAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuTEVGVCAmJiAhaXNDdXJzb3JBdFN0YXJ0KCkpIGJyZWFrO1xuXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgbGV0IGNvbHVtbkluZCA9IGdyaWRDb2x1bW5zLmZpbmRJbmRleChjID0+IGMudmFsdWVLZXlQYXRoLmpvaW4oJy8nKSA9PT0gY29sdW1uS2V5KTtcbiAgICAgICAgICBpZiAoY29sdW1uSW5kICE9PSAtMSkge1xuICAgICAgICAgICAgbGV0IGRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCBuZXh0RWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICBsZXQgcm93SW5kID0gcm93SW5kZXg7XG4gICAgICAgICAgICB3aGlsZSAoZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgLy8gTW92aW5nIHRvIHRoZSBsZWZ0XG4gICAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5MRUZUIHx8IChlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5UQUIgJiYgZS5zaGlmdEtleSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29sdW1uSW5kIC0gMSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgLT0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJvd0luZCAtIDEgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kID0gZ3JpZENvbHVtbnMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAgIHJvd0luZCAtPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gTW92aW5nIHRvIHRoZSByaWdodFxuICAgICAgICAgICAgICAgIGlmIChjb2x1bW5JbmQgKyAxIDwgZ3JpZENvbHVtbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgKz0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJvd0luZCArIDEgPCByb3dzU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kID0gMDtcbiAgICAgICAgICAgICAgICAgIHJvd0luZCArPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm93SW5kICsgMSA9PT0gcm93c1NpemUpIHtcbiAgICAgICAgICAgICAgICAgIC8vIElmIHRyeWluZyB0byBzZWxlY3QgYSByb3csIHdoZW4gdGhlcmUgaXMgbm9uZTpcbiAgICAgICAgICAgICAgICAgIGlmIChvbkxhc3RDZWxsVGFiUHJlc3MgJiYgZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuVEFCKSBvbkxhc3RDZWxsVGFiUHJlc3MoZSk7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBuZXh0RWxlbWVudCA9IGNlbGxSZWZzW2Ake2dyaWQuaWR9XyR7Z2V0Q29sdW1uS2V5QnlJbmRleChjb2x1bW5JbmQpfV8ke3Jvd0luZH1gXTtcblxuICAgICAgICAgICAgICAvLyBJZiB3ZSBjYW5ub3QgZm9jdXMgb24gdGhlIG5leHQgZWxlbWVudCB3aGlsZSBtb3ZpbmcgdG8gdGhlIHJpZ2h0XG4gICAgICAgICAgICAgIGlmICghbmV4dEVsZW1lbnQgJiYgZS5rZXlDb2RlICE9PSBLRVlfQ09ERVMuTEVGVCkge1xuICAgICAgICAgICAgICAgIC8vIElmIHdlJ3JlIG5vdCB5ZXQgaW4gdGhlIGxhc3QgZm9jdXNhYmxlIGNvbHVtblxuICAgICAgICAgICAgICAgIGlmIChjb2x1bW5JbmQgPD0gZ3JpZENvbHVtbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICB3aGlsZSAoY29sdW1uSW5kIDw9IGdyaWRDb2x1bW5zLmxlbmd0aCAmJiAhbmV4dEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2dldENvbHVtbktleUJ5SW5kZXgoY29sdW1uSW5kKX1fJHtyb3dJbmR9YF07XG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbkluZCArPSAxO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHdlIGFyZSBpbiB0aGUgbGFzdCBjb2x1bW4gYW5kIHdlIGRvbid0IGhhdmUgYW4gZWxlbWVudCB0byBmb2N1cyBvbixcbiAgICAgICAgICAgICAgICAgICAgLy8gd2UgbXVzdCBtb3ZlIHRvIHRoZSBuZXh0IHJvdyAoaWYgcG9zc2libGUpXG4gICAgICAgICAgICAgICAgICAgIGlmICghbmV4dEVsZW1lbnQgJiYgY29sdW1uSW5kID09PSBncmlkQ29sdW1ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB0cnlpbmcgdG8gc2VsZWN0IGEgcm93LCB3aGVuIHRoZXJlIGlzIG5vbmU6XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHJvd0luZCArIDEgPT09IHJvd3NTaXplKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob25MYXN0Q2VsbFRhYlByZXNzICYmIGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLlRBQikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkxhc3RDZWxsVGFiUHJlc3MoZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgIHJvd0luZCArPSAxO1xuICAgICAgICAgICAgICAgICAgICAgIG5leHRFbGVtZW50ID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtnZXRDb2x1bW5LZXlCeUluZGV4KGNvbHVtbkluZCl9XyR7cm93SW5kfWBdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIElmIHdlIGNhbm5vdCBmb2N1cyBvbiB0aGUgbmV4dCBlbGVtZW50IHdoaWxlIG1vdmluZyB0byB0aGUgbGVmdFxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFuZXh0RWxlbWVudCAmJiBlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5MRUZUKSB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGNvbHVtbkluZCA+IDAgJiYgIW5leHRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5JbmQgLT0gMTtcbiAgICAgICAgICAgICAgICAgIG5leHRFbGVtZW50ID0gY2VsbFJlZnNbYCR7Z3JpZC5pZH1fJHtnZXRDb2x1bW5LZXlCeUluZGV4KGNvbHVtbkluZCl9XyR7cm93SW5kfWBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBpZiBubyBlbGVtZW50IHdhcyBmb3VuZCwgdHJ5IG1vdmluZyB0byBwcmV2aW91cyByb3dcbiAgICAgICAgICAgICAgICAvLyAobmVlZGVkIGluIGNhc2UgZmlyc3QgY29sdW1uIGlzIG5vdCBlZGl0YWJsZSBlLmcuIGFuIEV4dHJhQ29sdW1uKVxuICAgICAgICAgICAgICAgIGlmIChyb3dJbmQgPiAwICYmICFuZXh0RWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uSW5kID0gZ3JpZENvbHVtbnMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAgIHJvd0luZCAtPSAxO1xuICAgICAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSBjZWxsUmVmc1tgJHtncmlkLmlkfV8ke2dldENvbHVtbktleUJ5SW5kZXgoY29sdW1uSW5kKX1fJHtyb3dJbmR9YF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGRpc2FibGVkID0gbmV4dEVsZW1lbnQgPyBuZXh0RWxlbWVudC5kaXNhYmxlZCA6IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFkaXNhYmxlZCAmJiBuZXh0RWxlbWVudCkge1xuICAgICAgICAgICAgICBpZiAobmV4dEVsZW1lbnQuc2VsZWN0UmVmKSBuZXh0RWxlbWVudCA9IHRoaXMuZ2V0U2VsZWN0UmVmKG5leHRFbGVtZW50KTtcbiAgICAgICAgICAgICAgdGhpcy5tb3ZlQ2VsbEZvY3VzKG5leHRFbGVtZW50LCByb3dJbmQsIGNvbHVtbkluZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIG9uRWRpdENlbGxLZXlEb3duID0gKHJvd0luZGV4LCBjb2wpID0+IChlKSA9PiB7XG4gICAgdGhpcy5vbkNlbGxLZXlEb3duKHJvd0luZGV4LCBjb2wsIGUpO1xuICB9O1xuXG4gIG9uQ3JlYXRlQ2VsbEtleURvd24gPSAocm93SW5kZXgsIGNvbCkgPT4gKGUpID0+IHtcbiAgICB0aGlzLm9uQ2VsbEtleURvd24ocm93SW5kZXgsIGNvbCwgZSwgdHJ1ZSk7XG4gIH07XG5cbiAgb25GaWx0ZXJDZWxsVmFsdWVDaGFuZ2UgPSAoY29sLCB2YWx1ZVBhcnNlcikgPT4gKGV2ZW50T3JEYXRhKSA9PiB7XG4gICAgbGV0IHJhd1ZhbHVlO1xuICAgIC8vIGV2ZW50T3JEYXRhIGNhbiBiZSBpbnB1dCBvbkNoYW5nZSBldmVudCwgcmVhY3Qtc2VsZWN0IG9uQ2hhbmdlIG9yIHJlYWN0LWRheS1waWNrZXIgb25DaGFuZ2VcbiAgICBpZiAoZXZlbnRPckRhdGEpIHtcbiAgICAgIGlmIChldmVudE9yRGF0YS50YXJnZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnRhcmdldC52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnRPckRhdGEudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmF3VmFsdWUgPSBldmVudE9yRGF0YTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSB2YWx1ZVBhcnNlcihyYXdWYWx1ZSk7XG4gICAgdGhpcy5wcm9wcy5maWx0ZXJDZWxsVmFsdWVDaGFuZ2UoXG4gICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICB0aGlzLnByb3BzLmNvbHVtbnMsXG4gICAgICBjb2wsXG4gICAgICB2YWx1ZSxcbiAgICApO1xuICB9O1xuXG4gIG9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlID0gKHJvd0luZGV4LCBjb2wsIHZhbHVlUGFyc2VyKSA9PiAoZXZlbnRPckRhdGEpID0+IHtcbiAgICBsZXQgcmF3VmFsdWU7XG4gICAgLy8gZXZlbnRPckRhdGEgY2FuIGJlIGlucHV0IG9uQ2hhbmdlIGV2ZW50LCByZWFjdC1zZWxlY3Qgb25DaGFuZ2Ugb3IgcmVhY3QtZGF5LXBpY2tlciBvbkNoYW5nZVxuICAgIGlmIChldmVudE9yRGF0YSkge1xuICAgICAgaWYgKGV2ZW50T3JEYXRhLnRhcmdldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChldmVudE9yRGF0YS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCB2YWx1ZSA9IHZhbHVlUGFyc2VyKHJhd1ZhbHVlKTtcbiAgICB0aGlzLnByb3BzLmNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSh0aGlzLnByb3BzLmdyaWQsIHJvd0luZGV4LCBjb2wudmFsdWVLZXlQYXRoLCB2YWx1ZSk7XG4gICAgaWYgKGNvbC5vbkNyZWF0ZVZhbHVlQ2hhbmdlKSB7XG4gICAgICBjb2wub25DcmVhdGVWYWx1ZUNoYW5nZSh2YWx1ZSwgY29sLnZhbHVlS2V5UGF0aCwgcm93SW5kZXgpO1xuICAgIH1cbiAgICBpZiAoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlICYmIHZhbHVlID09PSBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubWF0Y2hWYWx1ZSkge1xuICAgICAgLy8gQ2FsbCBzcGVjaWFsIHBhaXJlZCB2YWx1ZSBjaGFuZ2Ugb24gb3RoZXIgY2VsbCBpZiB2YWx1ZSBtYXRjaGVzXG4gICAgICB0aGlzLm9uQ3JlYXRlQ2VsbFZhbHVlQ2hhbmdlKFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgeyB2YWx1ZUtleVBhdGg6IGNvbC5vblZhbHVlTWF0Y2hDaGFuZ2VWYWx1ZS5uZXdWYWx1ZUtleVBhdGggfSxcbiAgICAgICAgdiA9PiB2LFxuICAgICAgKShjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY29sLnZhbGlkYXRvcnMpIHtcbiAgICAgIHRoaXMucHJvcHMuY3JlYXRlQ2VsbFZhbHVlVmFsaWRhdGUoXG4gICAgICAgIHRoaXMucHJvcHMuZ3JpZCxcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIGNvbC52YWx1ZUtleVBhdGgsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBjb2wudmFsaWRhdG9ycyxcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIG9uRWRpdENlbGxWYWx1ZUNoYW5nZSA9IChyb3dJbmRleCwgY29sLCB2YWx1ZVBhcnNlcikgPT4gKGV2ZW50T3JEYXRhKSA9PiB7XG4gICAgY29uc3QgZGF0YUlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICBsZXQgcmF3VmFsdWU7XG4gICAgLy8gZXZlbnRPckRhdGEgY2FuIGJlIGlucHV0IG9uQ2hhbmdlIGV2ZW50LCByZWFjdC1zZWxlY3Qgb25DaGFuZ2Ugb3IgcmVhY3QtZGF5LXBpY2tlciBvbkNoYW5nZVxuICAgIGlmIChldmVudE9yRGF0YSkge1xuICAgICAgaWYgKGV2ZW50T3JEYXRhLnRhcmdldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudGFyZ2V0LnZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChldmVudE9yRGF0YS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJhd1ZhbHVlID0gZXZlbnRPckRhdGEudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByYXdWYWx1ZSA9IGV2ZW50T3JEYXRhO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCB2YWx1ZSA9IHZhbHVlUGFyc2VyKHJhd1ZhbHVlKTtcbiAgICB0aGlzLnByb3BzLmVkaXRDZWxsVmFsdWVDaGFuZ2UodGhpcy5wcm9wcy5ncmlkLCBkYXRhSWQsIGNvbC52YWx1ZUtleVBhdGgsIHZhbHVlKTtcbiAgICBpZiAoY29sLm9uRWRpdFZhbHVlQ2hhbmdlKSB7XG4gICAgICBjb2wub25FZGl0VmFsdWVDaGFuZ2UodmFsdWUsIGNvbC52YWx1ZUtleVBhdGgsIHJvd0luZGV4LCBkYXRhSWQpO1xuICAgIH1cbiAgICBpZiAoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlICYmIHZhbHVlID09PSBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubWF0Y2hWYWx1ZSkge1xuICAgICAgLy8gQ2FsbCBzcGVjaWFsIHBhaXJlZCB2YWx1ZSBjaGFuZ2Ugb24gb3RoZXIgY2VsbCBpZiB2YWx1ZSBtYXRjaGVzXG4gICAgICB0aGlzLm9uRWRpdENlbGxWYWx1ZUNoYW5nZShcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIHsgdmFsdWVLZXlQYXRoOiBjb2wub25WYWx1ZU1hdGNoQ2hhbmdlVmFsdWUubmV3VmFsdWVLZXlQYXRoIH0sXG4gICAgICAgIHYgPT4gdixcbiAgICAgICkoY29sLm9uVmFsdWVNYXRjaENoYW5nZVZhbHVlLm5ld1ZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNvbC52YWxpZGF0b3JzKSB7XG4gICAgICB0aGlzLnByb3BzLmVkaXRDZWxsVmFsdWVWYWxpZGF0ZShcbiAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICBkYXRhSWQsXG4gICAgICAgIGNvbC52YWx1ZUtleVBhdGgsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBjb2wudmFsaWRhdG9ycyxcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIG9uQ3JlYXRlQ2VsbEJsdXIgPSAocm93SW5kZXgsIGNvbCwgdmFsdWVQYXJzZXIpID0+IChlKSA9PiB7XG4gICAgaWYgKGNvbC5vbkNyZWF0ZUJsdXIpIHtcbiAgICAgIGxldCB2YWx1ZSA9IChlICYmIGUudGFyZ2V0ICYmIGUudGFyZ2V0LnZhbHVlICE9PSB1bmRlZmluZWQpID9cbiAgICAgICAgZS50YXJnZXQudmFsdWUgOlxuICAgICAgICB0aGlzLmdldEVkaXRJdGVtVmFsdWUocm93SW5kZXgsIGNvbCk7XG4gICAgICBpZiAodmFsdWVQYXJzZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlUGFyc2VyKHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGNvbC5vbkNyZWF0ZUJsdXIodmFsdWUsIHJvd0luZGV4KTtcbiAgICB9XG4gIH07XG5cbiAgb25FZGl0Q2VsbEJsdXIgPSAocm93SW5kZXgsIGNvbCwgdmFsdWVQYXJzZXIpID0+IChlKSA9PiB7XG4gICAgaWYgKGNvbC5vbkVkaXRCbHVyKSB7XG4gICAgICBsZXQgdmFsdWUgPSAoZSAmJiBlLnRhcmdldCAmJiBlLnRhcmdldC52YWx1ZSAhPT0gdW5kZWZpbmVkKSA/XG4gICAgICAgIGUudGFyZ2V0LnZhbHVlIDpcbiAgICAgICAgdGhpcy5nZXRFZGl0SXRlbVZhbHVlKHJvd0luZGV4LCBjb2wpO1xuICAgICAgaWYgKHZhbHVlUGFyc2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZVBhcnNlcih2YWx1ZSk7XG4gICAgICB9XG4gICAgICBjb25zdCBkYXRhSWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgICAgY29sLm9uRWRpdEJsdXIodmFsdWUsIHJvd0luZGV4LCBkYXRhSWQpO1xuICAgIH1cbiAgfTtcblxuICBvbkNlbGxGb2N1cyA9IChjZWxsVHlwZSwgaW5wdXRUeXBlLCByb3dJbmRleCwgY29sdW1uS2V5KSA9PiAoZSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGNlbGxTZWxlY3Rpb25DaGFuZ2UsIGNlbGxTZWxlY3QsIGdyaWQsIGlzRWRpdGluZyxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoaXNFZGl0aW5nKSByZXR1cm47XG5cbiAgICBpZiAoaW5wdXRUeXBlID09PSAnbnVtYmVyJykge1xuICAgICAgZS50YXJnZXQuc2VsZWN0KCk7XG4gICAgfVxuICAgIGlmIChjZWxsVHlwZSA9PT0gJ2VkaXQnICYmIGNlbGxTZWxlY3QpIHtcbiAgICAgIGNlbGxTZWxlY3Rpb25DaGFuZ2UoZ3JpZCwgTWFwKHtcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIGNvbHVtbktleSxcbiAgICAgIH0pKTtcbiAgICB9XG4gIH07XG5cbiAgZ2V0U2VsZWN0UmVmID0gKGNvbXBvbmVudCkgPT4ge1xuICAgIGlmICghY29tcG9uZW50KSByZXR1cm4gbnVsbDtcbiAgICBpZiAoY29tcG9uZW50LnNlbGVjdFJlZi5zZWxlY3Quc2VsZWN0KSByZXR1cm4gY29tcG9uZW50LnNlbGVjdFJlZi5zZWxlY3Quc2VsZWN0LmlucHV0UmVmO1xuICAgIHJldHVybiBjb21wb25lbnQuc2VsZWN0UmVmLnNlbGVjdC5pbnB1dFJlZjtcbiAgfTtcblxuICBnZXREYXRhSWRCeVJvd0luZGV4ID0gcm93SW5kZXggPT5cbiAgICB0aGlzLnByb3BzLmRhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi50aGlzLnByb3BzLmdyaWQuaWRLZXlQYXRoXSk7XG5cbiAgZ2V0U2VsZWN0ZWRJdGVtSW5kZXggPSAoaWQpID0+IHtcbiAgICBpZiAoIWlkKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5wcm9wcy5kYXRhLmZpbmRJbmRleCh2ID0+IHYuZ2V0SW4odGhpcy5wcm9wcy5ncmlkLmlkS2V5UGF0aCkgPT09IGlkKTtcbiAgICByZXR1cm4gaW5kZXggPT09IC0xID8gdW5kZWZpbmVkIDogaW5kZXg7XG4gIH07XG5cbiAgZ2V0RWRpdEl0ZW1WYWx1ZSA9IChyb3dJbmRleCwgY29sLCBvcHRpb25zID0gW10pID0+IHtcbiAgICAvLyBHZXQgdGhlIHZhbHVlIHRvIGRpc3BsYXkgaW4gZWRpdCBjZWxsXG4gICAgY29uc3QgaWQgPSB0aGlzLmdldERhdGFJZEJ5Um93SW5kZXgocm93SW5kZXgpO1xuICAgIGNvbnN0IGVkaXRWYWx1ZSA9IHRoaXMucHJvcHMuZWRpdERhdGEuZ2V0SW4oW2lkLCAuLi5jb2wudmFsdWVLZXlQYXRoXSwgdW5kZWZpbmVkKTtcbiAgICBsZXQgb3JpZ2luYWxWYWx1ZTtcbiAgICBpZiAoZWRpdFZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG9yaWdpbmFsVmFsdWUgPSB0aGlzLnByb3BzLmRhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSwgJycpO1xuICAgIH0gZWxzZSBpZiAoZWRpdFZhbHVlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFZhbHVlIGlzIGZvdW5kIGZyb20gZWRpdERhdGFcbiAgICAgIC8vIEZvcm1hdCBieSBjb21wb25lbnQgdHlwZVxuICAgICAgc3dpdGNoIChjb2wuY29tcG9uZW50VHlwZSkge1xuICAgICAgICBjYXNlICdtdWx0aXNlbGVjdCc6XG4gICAgICAgIGNhc2UgJ3NlbGVjdCc6XG4gICAgICAgICAgcmV0dXJuIG9wdGlvbnMuc2VsZWN0T3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IGVkaXRWYWx1ZSk7XG4gICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICAgIHJldHVybiBvcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gZWRpdFZhbHVlKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gZWRpdFZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAob3JpZ2luYWxWYWx1ZSA9PT0gbnVsbCB8fCBvcmlnaW5hbFZhbHVlID09PSB1bmRlZmluZWQgfHwgb3JpZ2luYWxWYWx1ZSA9PT0gJycpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgLy8gUmV0dXJuIHZhbHVlIGZyb20gb3JpZ2luYWwgZGF0YSwgYmVjYXVzZSBlZGl0RGF0YSBpcyBub3QgYXZhaWxhYmxlXG4gICAgLy8gRm9ybWF0IGJ5IGNvbXBvbmVudCB0eXBlXG4gICAgc3dpdGNoIChjb2wuY29tcG9uZW50VHlwZSkge1xuICAgICAgY2FzZSAnZmxvYXQnOiB7XG4gICAgICAgIGlmIChTdHJpbmcob3JpZ2luYWxWYWx1ZSkubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHJldHVybiBTdHJpbmcob3JpZ2luYWxWYWx1ZSlcbiAgICAgICAgICAgIC5yZXBsYWNlKCcuJywgdGhpcy5wcm9wcy5kZWNpbWFsU2VwYXJhdG9yKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3JpZ2luYWxWYWx1ZTtcbiAgICAgIH1cbiAgICAgIGNhc2UgJ211bHRpc2VsZWN0JzpcbiAgICAgIGNhc2UgJ3NlbGVjdCc6XG4gICAgICAgIHJldHVybiBvcHRpb25zLnNlbGVjdE9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSBvcmlnaW5hbFZhbHVlKTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICByZXR1cm4gb3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IG9yaWdpbmFsVmFsdWUpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIG9yaWdpbmFsVmFsdWU7XG4gICAgfVxuICB9O1xuXG4gIGdldENyZWF0ZUl0ZW1WYWx1ZSA9IChyb3dJbmRleCwgY29sLCBvcHRpb25zID0gW10pID0+IHtcbiAgICBjb25zdCB2YWwgPSB0aGlzLnByb3BzLmNyZWF0ZURhdGEuZ2V0SW4oW3Jvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSwgJycpO1xuICAgIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9IGVsc2UgaWYgKGNvbC5jb21wb25lbnRUeXBlID09PSAnc2VsZWN0JyB8fCBjb2wuY29tcG9uZW50VHlwZSA9PT0gJ211bHRpc2VsZWN0Jykge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuc2VsZWN0T3B0aW9ucy5maW5kKG9iaiA9PiBvYmoudmFsdWUgPT09IHZhbCk7XG4gICAgfSBlbHNlIGlmIChbJ2Jvb2xlYW4nXS5pbmNsdWRlcyhjb2wuY29tcG9uZW50VHlwZSkpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gdmFsKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbDtcbiAgfTtcblxuICBnZXRGaWx0ZXJJdGVtVmFsdWUgPSAoY29sLCBvcHRpb25zID0gW10pID0+IHtcbiAgICBjb25zdCB2YWwgPSB0aGlzLnByb3BzLmZpbHRlckRhdGEuZ2V0KFV0aWxzLmdldENvbHVtbktleShjb2wpLCAnJyk7XG4gICAgaWYgKHZhbCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH0gZWxzZSBpZiAoY29sLmNvbXBvbmVudFR5cGUgPT09ICdzZWxlY3QnKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5zZWxlY3RPcHRpb25zLmZpbmQob2JqID0+IG9iai52YWx1ZSA9PT0gdmFsKTtcbiAgICB9IGVsc2UgaWYgKFsnY2hlY2tib3gnLCAnYm9vbGVhbiddLmluY2x1ZGVzKGNvbC5jb21wb25lbnRUeXBlKSkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuZmluZChvYmogPT4gb2JqLnZhbHVlID09PSB2YWwpO1xuICAgIH0gZWxzZSBpZiAoY29sLmNvbXBvbmVudFR5cGUgPT09ICdtdWx0aXNlbGVjdCcpIHtcbiAgICAgIC8vIHNlc3Npb24gc3RvcmFnZSBjb250ZW50IGlzIGNvbnZlcnRlZCB0byBpbW11dGFibGUgYW5kIG11bHRpc2VsZWN0XG4gICAgICAvLyBmaWx0ZXJzIGlzIHRoZW4gbGlzdCBvdGhlcndpc2UgYXJyYXlcbiAgICAgIHJldHVybiB2YWwgJiYgdmFsLnRvSlMgPyB2YWwudG9KUygpIDogdmFsIHx8IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIHZhbDtcbiAgfTtcblxuICBnZXRDb21wb25lbnREaXNhYmxlZFN0YXRlID0gKHJvd0luZGV4LCBjb2wsIG1vZGUpID0+IHtcbiAgICBsZXQgY29tcG9uZW50RGlzYWJsZWQgPSAhIWNvbC5kaXNhYmxlRWRpdGluZztcbiAgICAvLyBjaGVjayBpZiBjb21wb25lbnQgaXMgZGlzYWJsZWQgYnkgb3RoZXIgY29sdW1uIGRhdGFcbiAgICBpZiAoIWNvbXBvbmVudERpc2FibGVkICYmIGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaCkge1xuICAgICAgaWYgKG1vZGUgPT09ICdjcmVhdGUnKSB7XG4gICAgICAgIGNvbXBvbmVudERpc2FibGVkID0gdGhpcy5nZXRDcmVhdGVJdGVtVmFsdWUoXG4gICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgeyB2YWx1ZUtleVBhdGg6IGNvbC5kaXNhYmxlRWRpdGluZ09uVmFsdWVNYXRjaC5tYXRjaFZhbHVlS2V5UGF0aCB9LFxuICAgICAgICApID09PSBjb2wuZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2gubWF0Y2hWYWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbXBvbmVudERpc2FibGVkID0gdGhpcy5nZXRFZGl0SXRlbVZhbHVlKFxuICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgIHsgdmFsdWVLZXlQYXRoOiBjb2wuZGlzYWJsZUVkaXRpbmdPblZhbHVlTWF0Y2gubWF0Y2hWYWx1ZUtleVBhdGggfSxcbiAgICAgICAgKSA9PT0gY29sLmRpc2FibGVFZGl0aW5nT25WYWx1ZU1hdGNoLm1hdGNoVmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb21wb25lbnREaXNhYmxlZDtcbiAgfTtcblxuICBnZXRSb3dDbGFzc05hbWUgPSAocm93SW5kZXgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBncmlkLFxuICAgICAgaXNDcmVhdGluZyxcbiAgICAgIGlzRWRpdGluZyxcbiAgICAgIGNyZWF0ZURhdGEsXG4gICAgICBzZWxlY3RlZEl0ZW1zLFxuICAgICAgZGF0YSxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCByb3dDbGFzc05hbWVzID0gWydvYy1kYXRhZ3JpZC1yb3cnXTtcbiAgICBsZXQgZXh0cmFSb3dDb3VudCA9IDA7IC8vIGhvdyBtYW55IHJvd3MgdG8gaWdub3JlIGZyb20gdG9wLCBuZXcgKyBmaWx0ZXIgcm93c1xuICAgIGlmIChpc0NyZWF0aW5nKSBleHRyYVJvd0NvdW50ID0gY3JlYXRlRGF0YS5zaXplO1xuICAgIGlmIChpc0NyZWF0aW5nKSB7XG4gICAgICBpZiAocm93SW5kZXggPD0gKGV4dHJhUm93Q291bnQgLSAxKSkge1xuICAgICAgICByb3dDbGFzc05hbWVzLnB1c2goJ29jLWRhdGFncmlkLXJvdy1uZXcnKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzRWRpdGluZykge1xuICAgICAgcm93Q2xhc3NOYW1lcy5wdXNoKCdvYy1kYXRhZ3JpZC1yb3ctZWRpdCcpO1xuICAgIH1cblxuXG4gICAgLy8gY2hlY2sgaWYgcm93IGlzIHNlbGVjdGVkXG4gICAgaWYgKCghaXNDcmVhdGluZyAmJiAhaXNFZGl0aW5nKSAmJlxuICAgICAgKHNlbGVjdGVkSXRlbXMgJiYgZ3JpZC5pZEtleVBhdGgpKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHNlbGVjdGVkSXRlbXMuaW5kZXhPZihkYXRhLmdldEluKFtyb3dJbmRleCAtIGV4dHJhUm93Q291bnQsIC4uLmdyaWQuaWRLZXlQYXRoXSkpICE9PSAtMVxuICAgICAgKSB7XG4gICAgICAgIHJvd0NsYXNzTmFtZXMucHVzaCgnaXMtc2VsZWN0ZWQnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5wcm9wcy5yb3dDbGFzc05hbWVHZXR0ZXIpIHtcbiAgICAgIHJldHVybiByb3dDbGFzc05hbWVzLmpvaW4oJyAnKSArICcgJyArIHRoaXMucHJvcHMucm93Q2xhc3NOYW1lR2V0dGVyKHJvd0luZGV4KTtcbiAgICB9XG4gICAgcmV0dXJuIHJvd0NsYXNzTmFtZXMuam9pbignICcpO1xuICB9O1xuXG4gIGdldENlbGxNZXNzYWdlcyA9IChyb3dJbmRleCwgY29sLCBjZWxsVHlwZSkgPT4ge1xuICAgIGNvbnN0IHJldHVybkRhdGEgPSB7fTtcbiAgICBpZiAoIXRoaXMucHJvcHMuZ3JpZC5pZEtleVBhdGggfHwgIWNvbC52YWx1ZUtleVBhdGgpIHtcbiAgICAgIHJldHVybiByZXR1cm5EYXRhO1xuICAgIH1cbiAgICBsZXQgaW5mb01lc3NhZ2U7XG4gICAgbGV0IGVycm9yTWVzc2FnZTtcbiAgICBsZXQgd2FybmluZ01lc3NhZ2U7XG4gICAgaWYgKGNlbGxUeXBlID09PSAnY3JlYXRlJykge1xuICAgICAgaW5mb01lc3NhZ2UgPSB0aGlzLnByb3BzLmNyZWF0ZUNlbGxNZXNzYWdlcy5nZXRJbihbJ2luZm8nLCByb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgZXJyb3JNZXNzYWdlID0gdGhpcy5wcm9wcy5jcmVhdGVDZWxsTWVzc2FnZXMuZ2V0SW4oWydlcnJvcicsIHJvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgICB3YXJuaW5nTWVzc2FnZSA9IHRoaXMucHJvcHMuY3JlYXRlQ2VsbE1lc3NhZ2VzLmdldEluKFsnd2FybmluZycsIHJvd0luZGV4LCAuLi5jb2wudmFsdWVLZXlQYXRoXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICAgIGluZm9NZXNzYWdlID0gdGhpcy5wcm9wcy5jZWxsTWVzc2FnZXMuZ2V0SW4oWydpbmZvJywgaWQsIC4uLmNvbC52YWx1ZUtleVBhdGhdKTtcbiAgICAgIGVycm9yTWVzc2FnZSA9IHRoaXMucHJvcHMuY2VsbE1lc3NhZ2VzLmdldEluKFsnZXJyb3InLCBpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgd2FybmluZ01lc3NhZ2UgPSB0aGlzLnByb3BzLmNlbGxNZXNzYWdlcy5nZXRJbihbJ3dhcm5pbmcnLCBpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgIH1cbiAgICBpZiAoaW5mb01lc3NhZ2UpIHtcbiAgICAgIHJldHVybkRhdGEuaW5mb01lc3NhZ2UgPSBpbmZvTWVzc2FnZTtcbiAgICB9XG4gICAgaWYgKGVycm9yTWVzc2FnZSkge1xuICAgICAgcmV0dXJuRGF0YS5lcnJvck1lc3NhZ2UgPSBlcnJvck1lc3NhZ2U7XG4gICAgfVxuICAgIGlmICh3YXJuaW5nTWVzc2FnZSkge1xuICAgICAgcmV0dXJuRGF0YS53YXJuaW5nTWVzc2FnZSA9IHdhcm5pbmdNZXNzYWdlO1xuICAgIH1cbiAgICByZXR1cm4gcmV0dXJuRGF0YTtcbiAgfTtcblxuICBnZXRTY3JvbGxUb1JvdyA9ICgpID0+IHtcbiAgICBsZXQgc2Nyb2xsVG9Sb3c7XG4gICAgaWYgKHRoaXMucHJvcHMuaXNDcmVhdGluZyAmJiAhdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCkgcmV0dXJuIHNjcm9sbFRvUm93O1xuICAgIGlmICh0aGlzLmZvY3VzVG9DcmVhdGVDZWxsKSB7XG4gICAgICBjb25zdCBzY3JvbGxOZXdSb3cgPSB0aGlzLnByb3BzLmNyZWF0ZURhdGEuc2l6ZSAtIDE7XG4gICAgICBpZiAoc2Nyb2xsTmV3Um93ID49IDApIHtcbiAgICAgICAgc2Nyb2xsVG9Sb3cgPSBzY3JvbGxOZXdSb3c7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLmlzRWRpdGluZyAmJiAhdGhpcy5wcm9wcy5zY3JvbGxJbkVkaXRNb2RlKSB7XG4gICAgICAgIHNjcm9sbFRvUm93ID0gdGhpcy5zdGF0ZS5jdXJyZW50Um93O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2Nyb2xsVG9Sb3cgPSB0aGlzLnByb3BzLnNjcm9sbFRvUm93OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICB9XG4gICAgICBpZiAoc2Nyb2xsVG9Sb3cgPT09IHVuZGVmaW5lZCAmJiB0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuc2l6ZSA+IDApIHtcbiAgICAgICAgc2Nyb2xsVG9Sb3cgPSB0aGlzLmdldFNlbGVjdGVkSXRlbUluZGV4KHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5maXJzdCgpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNjcm9sbFRvUm93O1xuICB9O1xuXG4gIHNldEZvY3VzVG8gPSAoZm9jdXNUbykgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmlzRWRpdGluZyB8fCB0aGlzLnByb3BzLmlzQ3JlYXRpbmcpIHtcbiAgICAgIGlmIChmb2N1c1RvICYmIGZvY3VzVG8uZ2V0KCd0eXBlJykgJiYgZm9jdXNUbyAhPT0gdGhpcy5wcmV2Rm9jdXNUbykge1xuICAgICAgICB0aGlzW2ZvY3VzVG8uZ2V0KCd0eXBlJyldID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5mb2N1c1RvTGFzdFJvdyA9IGZvY3VzVG8uZ2V0KCdmb2N1c1RvTGFzdFJvdycpO1xuICAgICAgICB0aGlzLnByZXZGb2N1c1RvID0gZm9jdXNUbztcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlQ2VsbFNlbGVjdCA9IChjZWxsVHlwZSwgcm93SW5kZXgsIGNvbHVtbktleSkgPT4gKCkgPT4ge1xuICAgIGlmIChjZWxsVHlwZSA9PT0gJ3ZpZXcnICYmIHRoaXMucHJvcHMuY2VsbFNlbGVjdCkge1xuICAgICAgdGhpcy5wcm9wcy5jZWxsU2VsZWN0aW9uQ2hhbmdlKHRoaXMucHJvcHMuZ3JpZCwgTWFwKHtcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIGNvbHVtbktleSxcbiAgICAgIH0pKTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlQ3JlYXRlQ2VsbFJlZiA9IChyb3dJbmRleCwgY29sKSA9PiAocmVmKSA9PiB7XG4gICAgLy8gRm9jdXMgdG8gY3JlYXRlIGNlbGxcbiAgICBjb25zdCBjb2x1bW5LZXkgPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sKTtcbiAgICBjb25zdCBzZWxlY3RSZWYgPSAhcmVmIHx8IHJlZi5mb2N1cyA/IHJlZiA6IHRoaXMuZ2V0U2VsZWN0UmVmKHJlZik7XG4gICAgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5jcmVhdGVEYXRhLnNpemUgJiZcbiAgICAgIHRoaXMucHJvcHMuY3JlYXRlRGF0YS5zaXplID09PSByb3dJbmRleCArIDEgJiZcbiAgICAgIHRoaXMuZm9jdXNUb0NyZWF0ZUNlbGwgJiZcbiAgICAgICF0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2NyZWF0ZScpICYmXG4gICAgICBzZWxlY3RSZWZcbiAgICApIHtcbiAgICAgIHNlbGVjdFJlZi5mb2N1cygpO1xuICAgICAgdGhpcy5mb2N1c1RvQ3JlYXRlQ2VsbCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZUFycm93TmF2aWdhdGlvbikge1xuICAgICAgdGhpcy5jcmVhdGVDZWxsUmVmc1tgJHt0aGlzLnByb3BzLmdyaWQuaWR9XyR7Y29sdW1uS2V5fV8ke3Jvd0luZGV4fWBdID0gcmVmO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVFZGl0Q2VsbFJlZiA9IChyb3dJbmRleCwgY29sKSA9PiAocmVmKSA9PiB7XG4gICAgY29uc3QgY29sdW1uS2V5ID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCk7XG4gICAgaWYgKHRoaXMuZm9jdXNUb0VkaXRDZWxsICYmICF0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUocm93SW5kZXgsIGNvbCwgJ2VkaXQnKSkge1xuICAgICAgY29uc3Qgc2VsZWN0ZWRSb3dJbmRleCA9IHRoaXMuZm9jdXNUb0xhc3RSb3cgJiYgdGhpcy5wcm9wcy5kYXRhLnNpemUgPiAwID9cbiAgICAgICAgdGhpcy5wcm9wcy5kYXRhLnNpemUgLSAxIDogdGhpcy5nZXRTZWxlY3RlZEl0ZW1JbmRleCh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuZmlyc3QoKSk7XG5cbiAgICAgIGNvbnN0IHsgc2VsZWN0ZWRDZWxsIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3Qgc2VsZWN0UmVmID0gIXJlZiB8fCByZWYuZm9jdXMgPyByZWYgOiB0aGlzLmdldFNlbGVjdFJlZihyZWYpO1xuICAgICAgaWYgKHNlbGVjdGVkQ2VsbC5zaXplID4gMCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgc2VsZWN0ZWRDZWxsLmdldCgncm93SW5kZXgnKSA9PT0gcm93SW5kZXggJiZcbiAgICAgICAgICBzZWxlY3RlZENlbGwuZ2V0KCdjb2x1bW5LZXknKSA9PT0gY29sdW1uS2V5ICYmXG4gICAgICAgICAgc2VsZWN0UmVmXG4gICAgICAgICkge1xuICAgICAgICAgIHNlbGVjdFJlZi5mb2N1cygpO1xuICAgICAgICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5mb2N1c1RvTGFzdFJvdyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHNlbGVjdGVkUm93SW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmZvY3VzVG9FZGl0Q2VsbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZvY3VzVG9MYXN0Um93ID0gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKHNlbGVjdGVkUm93SW5kZXggPT09IHJvd0luZGV4ICYmIHNlbGVjdFJlZikge1xuICAgICAgICBzZWxlY3RSZWYuZm9jdXMoKTtcbiAgICAgICAgdGhpcy5mb2N1c1RvRWRpdENlbGwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mb2N1c1RvTGFzdFJvdyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5lbmFibGVBcnJvd05hdmlnYXRpb24pIHtcbiAgICAgIHRoaXMuY2VsbFJlZnNbYCR7dGhpcy5wcm9wcy5ncmlkLmlkfV8ke2NvbHVtbktleX1fJHtyb3dJbmRleH1gXSA9IHJlZjtcbiAgICB9XG4gIH07XG5cbiAgbW92ZUNlbGxGb2N1cyA9IChuZXh0RWxlbWVudCwgcm93SW5kZXgsIGNvbHVtbkluZGV4KSA9PiB7XG4gICAgY29uc3QgZWxlbWVudFR5cGVzID0gWyd0ZXh0JywgJ2NoZWNrYm94J107XG4gICAgaWYgKG5leHRFbGVtZW50ICYmIGVsZW1lbnRUeXBlcy5pbmNsdWRlcyhuZXh0RWxlbWVudC50eXBlKSkge1xuICAgICAgaWYgKHJvd0luZGV4ICE9PSAtMSB8fCBjb2x1bW5JbmRleCAhPT0gLTEpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgY3VycmVudENvbHVtbjogY29sdW1uSW5kZXgsXG4gICAgICAgICAgY3VycmVudFJvdzogcm93SW5kZXgsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmIChuZXh0RWxlbWVudC50eXBlID09PSAnY2hlY2tib3gnKSBuZXh0RWxlbWVudC5mb2N1cygpO1xuICAgICAgICBpZiAobmV4dEVsZW1lbnQudHlwZSA9PT0gJ3RleHQnKSBuZXh0RWxlbWVudC5zZWxlY3QoKTtcbiAgICAgIH0sIDUwKTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlU2VsZWN0QWxsQ2hlY2tCb3hPbkNoYW5nZSA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLnNlbGVjdEFsbEl0ZW1zQ2hhbmdlKHRoaXMucHJvcHMuZ3JpZCk7XG4gIH07XG5cbiAgaGFuZGxlU2VsZWN0aW9uQ2hlY2tCb3hPbkNoYW5nZSA9IHJvd0luZGV4ID0+ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLml0ZW1TZWxlY3Rpb25DaGFuZ2UodGhpcy5wcm9wcy5ncmlkLCByb3dJbmRleCwgdHJ1ZSwgZmFsc2UpO1xuICB9O1xuXG4gIGdlbmVyYXRlQ29sdW1ucyA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBkYXRhLFxuICAgICAgc2VsZWN0ZWRJdGVtcyxcbiAgICAgIGRhdGVGb3JtYXQsXG4gICAgICB0aG91c2FuZFNlcGFyYXRvcixcbiAgICAgIGRlY2ltYWxTZXBhcmF0b3IsXG4gICAgICBncmlkLFxuICAgICAgaW5saW5lRWRpdCxcbiAgICAgIGZpbHRlcmluZyxcbiAgICAgIHJlZ2lvbixcbiAgICAgIGludGwsXG4gICAgICBzZWxlY3RDb21wb25lbnRPcHRpb25zLFxuICAgICAgaXNDcmVhdGluZyxcbiAgICAgIGV4dHJhQ29sdW1uLFxuICAgICAgcm93U2VsZWN0Q2hlY2tib3hDb2x1bW4sXG4gICAgICBzaG93U2VsZWN0QWxsQ2hlY2tib3gsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBjb2x1bW5zID0gW107XG4gICAgY29uc3QgdGFiSW5kZXggPSBTdHJpbmcodGhpcy5wcm9wcy50YWJJbmRleCk7XG4gICAgaWYgKGV4dHJhQ29sdW1uKSB7XG4gICAgICBjb2x1bW5zLnB1c2goe1xuICAgICAgICB3aWR0aDogZXh0cmFDb2x1bW4ud2lkdGggfHwgNDAsXG4gICAgICAgIGlzUmVzaXphYmxlOiAhIWV4dHJhQ29sdW1uLmlzUmVzaXphYmxlLFxuICAgICAgICBpc1NvcnRhYmxlOiBmYWxzZSxcbiAgICAgICAgY29sdW1uS2V5OiAnZXh0cmFDb2x1bW4nLFxuICAgICAgICBjZWxsOiByb3dJbmRleCA9PiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1leHRyYS1jb2x1bW4tY2VsbCBuby1yb3ctc2VsZWN0XCI+XG4gICAgICAgICAgICB7ZXh0cmFDb2x1bW4udmFsdWVSZW5kZXIoZGF0YS5nZXQocm93SW5kZXgpLCB0YWJJbmRleCl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICksXG4gICAgICAgIGNlbGxFZGl0OiByb3dJbmRleCA9PiAoZXh0cmFDb2x1bW4uY2VsbEVkaXQgPyBleHRyYUNvbHVtbi5jZWxsRWRpdChyb3dJbmRleCkgOiBudWxsKSxcbiAgICAgICAgY2VsbENyZWF0ZTogcm93SW5kZXggPT4gKGV4dHJhQ29sdW1uLmNlbGxDcmVhdGUgPyBleHRyYUNvbHVtbi5jZWxsQ3JlYXRlKHJvd0luZGV4KSA6IG51bGwpLFxuICAgICAgICBjZWxsRmlsdGVyOiByb3dJbmRleCA9PiAoZXh0cmFDb2x1bW4uY2VsbEZpbHRlciA/IGV4dHJhQ29sdW1uLmNlbGxGaWx0ZXIocm93SW5kZXgpIDogbnVsbCksXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocm93U2VsZWN0Q2hlY2tib3hDb2x1bW4pIHtcbiAgICAgIGNvbHVtbnMucHVzaCh7XG4gICAgICAgIHdpZHRoOiA0MCxcbiAgICAgICAgaXNSZXNpemFibGU6IGZhbHNlLFxuICAgICAgICBpc1NvcnRhYmxlOiBmYWxzZSxcbiAgICAgICAgY29sdW1uS2V5OiAnc2VsZWN0aW9uQ2hlY2tib3gnLFxuICAgICAgICBoZWFkZXI6IChcbiAgICAgICAgICBzaG93U2VsZWN0QWxsQ2hlY2tib3ggJiZcbiAgICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZFNlbGVjdEFsbENoZWNrQm94LSR7Z3JpZC5pZH1gfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtc2VsZWN0LWFsbC1jaGVja2JveC1jZWxsIG5vLXJvdy1zZWxlY3RcIlxuICAgICAgICAgICAgY2hlY2tlZD17ZGF0YS5zaXplICE9PSAwICYmIGRhdGEuc2l6ZSA9PT0gc2VsZWN0ZWRJdGVtcy5zaXplfVxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlU2VsZWN0QWxsQ2hlY2tCb3hPbkNoYW5nZX1cbiAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAvPlxuICAgICAgICApLFxuICAgICAgICBjZWxsOiAocm93SW5kZXgpID0+IHtcbiAgICAgICAgICBjb25zdCByb3dJdGVtID0gZGF0YS5nZXQocm93SW5kZXgpO1xuICAgICAgICAgIGNvbnN0IGl0ZW1JZCA9IHJvd0l0ZW0uZ2V0SW4oZ3JpZC5pZEtleVBhdGgpO1xuICAgICAgICAgIGNvbnN0IHNlbGVjdGVkID0gc2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhpdGVtSWQpO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkU2VsZWN0Q2hlY2tCb3gtJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtc2VsZWN0LWNoZWNrYm94LWNlbGwgbm8tcm93LXNlbGVjdFwiXG4gICAgICAgICAgICAgIGNoZWNrZWQ9e3NlbGVjdGVkfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVTZWxlY3Rpb25DaGVja0JveE9uQ2hhbmdlKHJvd0luZGV4KX1cbiAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICBjZWxsRWRpdDogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbENyZWF0ZTogKCkgPT4gbnVsbCxcbiAgICAgICAgY2VsbEZpbHRlcjogKCkgPT4gbnVsbCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHZpc2libGVDb2x1bW5zID0gW107XG4gICAgdGhpcy5wcm9wcy52aXNpYmxlQ29sdW1ucy5mb3JFYWNoKCh2aXNpYmxlQ29sdW1uS2V5KSA9PiB7XG4gICAgICB0aGlzLnByb3BzLmNvbHVtbnMuZm9yRWFjaCgob3JnQ29sKSA9PiB7XG4gICAgICAgIGlmIChVdGlscy5nZXRDb2x1bW5LZXkob3JnQ29sKSA9PT0gdmlzaWJsZUNvbHVtbktleSkge1xuICAgICAgICAgIHZpc2libGVDb2x1bW5zLnB1c2gob3JnQ29sKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgdmlzaWJsZUNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZUVtcHR5Q2hlY2tlciA9IFV0aWxzLmdldFZhbHVlRW1wdHlDaGVja2VyKGNvbCk7XG4gICAgICAvLyBDZWxsIHZhbHVlIHJlbmRlcmluZ1xuICAgICAgY29uc3QgdmFsdWVSZW5kZXIgPSAocm93SW5kZXgsIGZvcm1hdCkgPT4ge1xuICAgICAgICBjb25zdCB2YWwgPSBkYXRhLmdldEluKFtyb3dJbmRleCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICAgICAgICBpZiAodmFsdWVFbXB0eUNoZWNrZXIodmFsKSkge1xuICAgICAgICAgIHJldHVybiBjb2wuaXNSZXF1aXJlZCA/IDxNIGlkPVwiR3JpZC5WYWx1ZUlzTWlzc2luZ1wiIC8+IDogJyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvcm1hdCA/IGZvcm1hdCh2YWwpIDogdmFsO1xuICAgICAgfTtcblxuICAgICAgbGV0IGNvbHVtbiA9IEdyaWRDb2x1bW5TZXJ2aWNlLmJhc2VDb2x1bW4oY29sKTtcbiAgICAgIC8vIENvbGxlY3QgY29sdW1uIGZ1bmN0aW9ucyBpbnRvIG9uZSBPYmplY3RcbiAgICAgIGNvbnN0IGNvbHVtbkZ1bmN0aW9ucyA9IHtcbiAgICAgICAgZWRpdDoge1xuICAgICAgICAgIGdldEl0ZW1WYWx1ZTogdGhpcy5nZXRFZGl0SXRlbVZhbHVlLFxuICAgICAgICAgIG9uQ2VsbFZhbHVlQ2hhbmdlOiB0aGlzLm9uRWRpdENlbGxWYWx1ZUNoYW5nZSxcbiAgICAgICAgICBvbkNlbGxCbHVyOiB0aGlzLm9uRWRpdENlbGxCbHVyLFxuICAgICAgICAgIG9uQ2VsbEZvY3VzOiB0aGlzLm9uQ2VsbEZvY3VzLFxuICAgICAgICAgIG9uQ2VsbEtleURvd246IHRoaXMub25FZGl0Q2VsbEtleURvd24sXG4gICAgICAgICAgaGFuZGxlQ2VsbFJlZjogdGhpcy5oYW5kbGVFZGl0Q2VsbFJlZixcbiAgICAgICAgfSxcbiAgICAgICAgY3JlYXRlOiB7XG4gICAgICAgICAgZ2V0SXRlbVZhbHVlOiB0aGlzLmdldENyZWF0ZUl0ZW1WYWx1ZSxcbiAgICAgICAgICBvbkNlbGxWYWx1ZUNoYW5nZTogdGhpcy5vbkNyZWF0ZUNlbGxWYWx1ZUNoYW5nZSxcbiAgICAgICAgICBvbkNlbGxCbHVyOiB0aGlzLm9uQ3JlYXRlQ2VsbEJsdXIsXG4gICAgICAgICAgb25DZWxsRm9jdXM6IHRoaXMub25DZWxsRm9jdXMsXG4gICAgICAgICAgb25DZWxsS2V5RG93bjogdGhpcy5vbkNyZWF0ZUNlbGxLZXlEb3duLFxuICAgICAgICAgIGhhbmRsZUNlbGxSZWY6IHRoaXMuaGFuZGxlQ3JlYXRlQ2VsbFJlZixcbiAgICAgICAgfSxcbiAgICAgICAgZmlsdGVyOiB7XG4gICAgICAgICAgZ2V0SXRlbVZhbHVlOiB0aGlzLmdldEZpbHRlckl0ZW1WYWx1ZSxcbiAgICAgICAgICBvbkNlbGxWYWx1ZUNoYW5nZTogdGhpcy5vbkZpbHRlckNlbGxWYWx1ZUNoYW5nZSxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIC8vIGhhbmRsZSBjb2x1bW4uY2VsbCAvIGNvbHVtbi5jZWxsRWRpdCAvIGNvbHVtbi5jZWxsQ3JlYXRlIC8gY29sdW1uLmNlbGxGaWx0ZXJcbiAgICAgIGNvbnN0IGNlbGxQcm9wcyA9IHtcbiAgICAgICAgZGF0YSxcbiAgICAgICAgZGF0ZUZvcm1hdCxcbiAgICAgICAgdGhvdXNhbmRTZXBhcmF0b3IsXG4gICAgICAgIGRlY2ltYWxTZXBhcmF0b3IsXG4gICAgICB9OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICBjb2x1bW4gPSBHcmlkQ29sdW1uU2VydmljZS5jb2x1bW5DZWxsKGNvbHVtbiwgY2VsbFByb3BzLCBjb2wsIHZhbHVlUmVuZGVyKTtcblxuICAgICAgLy8gaGFuZGxlIGNvbHVtbkNvbXBvbmVudFR5cGVzXG4gICAgICBjb25zdCBjb21wb25lbnRUeXBlUHJvcHMgPSB7XG4gICAgICAgIC4uLmNlbGxQcm9wcyxcbiAgICAgICAgZ3JpZCxcbiAgICAgICAgaW5saW5lRWRpdCxcbiAgICAgICAgZmlsdGVyaW5nLFxuICAgICAgICByZWdpb24sXG4gICAgICAgIGludGwsXG4gICAgICAgIHNlbGVjdENvbXBvbmVudE9wdGlvbnMsXG4gICAgICB9OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICBjb2x1bW4gPSBHcmlkQ29sdW1uU2VydmljZS5jb2x1bW5Db21wb25lbnRUeXBlKFxuICAgICAgICBjb2x1bW4sXG4gICAgICAgIHRhYkluZGV4LFxuICAgICAgICBjb21wb25lbnRUeXBlUHJvcHMsXG4gICAgICAgIGNvbCxcbiAgICAgICAgY29sdW1uRnVuY3Rpb25zLFxuICAgICAgICB0aGlzLmdldENvbXBvbmVudERpc2FibGVkU3RhdGUsXG4gICAgICApO1xuXG4gICAgICBjb2x1bW5zLnB1c2goY29sdW1uKTtcbiAgICB9KTtcblxuICAgIGlmIChpc0NyZWF0aW5nKSB7XG4gICAgICBjb2x1bW5zLnB1c2goe1xuICAgICAgICB3aWR0aDogMzcsXG4gICAgICAgIGlzUmVzaXphYmxlOiBmYWxzZSxcbiAgICAgICAgY29sdW1uS2V5OiAncmVtb3ZlTmV3SXRlbScsXG4gICAgICAgIGNlbGw6ICgpID0+IG51bGwsXG4gICAgICAgIGNlbGxFZGl0OiAoKSA9PiBudWxsLFxuICAgICAgICBjZWxsQ3JlYXRlOiByb3dJbmRleCA9PiAoXG4gICAgICAgICAgPEljb25cbiAgICAgICAgICAgIGlkPXtgb2MtZGF0YWdyaWQtbmV3LWl0ZW0tcmVtb3ZlLSR7Z3JpZC5pZH0tJHtyb3dJbmRleH1gfVxuICAgICAgICAgICAgdHlwZT1cImluZGljYXRvclwiXG4gICAgICAgICAgICBuYW1lPVwiZGVsZXRlXCJcbiAgICAgICAgICAgIHdpZHRoPXszMH1cbiAgICAgICAgICAgIGhlaWdodD17MzB9XG4gICAgICAgICAgICBzdHlsZT17eyBwYWRkaW5nOiAnN3B4JyB9fVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdGhpcy5wcm9wcy5yZW1vdmVOZXdJdGVtKGdyaWQsIHJvd0luZGV4KX1cbiAgICAgICAgICAvPlxuICAgICAgICApLFxuICAgICAgICBjZWxsRmlsdGVyOiAoKSA9PiBudWxsLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBjb2x1bW5zO1xuICB9O1xuXG4gIGlzQ2VsbEVkaXRlZCA9IChyb3dJbmRleCwgY29sLCBjZWxsVHlwZSkgPT4ge1xuICAgIGlmIChjZWxsVHlwZSAhPT0gJ2VkaXQnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGlkID0gdGhpcy5nZXREYXRhSWRCeVJvd0luZGV4KHJvd0luZGV4KTtcbiAgICByZXR1cm4gISF0aGlzLnByb3BzLmVkaXREYXRhLmdldEluKFtpZCwgLi4uY29sLnZhbHVlS2V5UGF0aF0pO1xuICB9O1xuXG4gIGhhbmRsZUFmdGVyQWRkSXRlbSA9ICgpID0+IHtcbiAgICB0aGlzLmZvY3VzVG9DcmVhdGVDZWxsID0gdHJ1ZTtcbiAgfTtcblxuICBoYW5kbGVBZnRlckVkaXRQcmVzcyA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLnNpemUpIHtcbiAgICAgIHRoaXMuZm9jdXNUb0VkaXRDZWxsID0gdHJ1ZTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjdXJyZW50Um93OiB1bmRlZmluZWQsXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlQWZ0ZXJWYWxpZGF0aW9uRXJyb3IgPSAoKSA9PiB7XG4gICAgdGhpcy5mb2N1c1RvRXJyb3JDZWxsID0gdHJ1ZTtcbiAgfTtcblxuICBoYW5kbGVSb3dDbGljayA9IChlLCByb3dJbmRleCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnJvd1NlbGVjdCAmJiAhdGhpcy5wcm9wcy5pc0NyZWF0aW5nICYmICF0aGlzLnByb3BzLmlzRWRpdGluZykge1xuICAgICAgaWYgKGUuY3RybEtleSB8fCBlLnNoaWZ0S2V5KSB7XG4gICAgICAgIGRvY3VtZW50LmdldFNlbGVjdGlvbigpXG4gICAgICAgICAgLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgfVxuICAgICAgLy8gRG9uJ3QgdHJpZ2dlciBzZWxlY3Rpb24gY2hhbmdlIG9uIHdoZW4gdXNlciBjbGlja3Mgb24gc3BlY2lhbCBjZWxscyBsaWtlIGNoZWNrYm94L2V4dHJhXG4gICAgICAvLyBDaGVjayB0aGF0IGNsaWNrZWQgbm9kZSdzIHBhcmVudCBvciBwYXJlbnQncyBwYXJlbnQgZG9lc24ndCBoYXZlIG5vLXJvdy1zZWxlY3QgY2xhc3NcbiAgICAgIGNvbnN0IHsgcGFyZW50Tm9kZSB9ID0gZS50YXJnZXQ7XG4gICAgICBjb25zdCBwYXJlbnQxY2xhc3MgPSBwYXJlbnROb2RlLmNsYXNzTmFtZSAmJiBwYXJlbnROb2RlLmNsYXNzTmFtZS5pbmRleE9mXG4gICAgICAgID8gcGFyZW50Tm9kZS5jbGFzc05hbWVcbiAgICAgICAgOiAnJztcbiAgICAgIGNvbnN0IHBhcmVudDJjbGFzcyA9IHBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUgJiYgcGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZS5pbmRleE9mIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgPyBwYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lXG4gICAgICAgIDogJyc7XG4gICAgICBjb25zdCBwYXJlbnQzY2xhc3MgPSBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUgJiYgcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NOYW1lLmluZGV4T2YgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICA/IHBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTmFtZVxuICAgICAgICA6ICcnO1xuICAgICAgY29uc3QgcGFyZW50NGNsYXNzID0gcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUgJiYgcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWUuaW5kZXhPZiAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgID8gcGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc05hbWVcbiAgICAgICAgOiAnJztcbiAgICAgIGlmIChcbiAgICAgICAgcGFyZW50MWNsYXNzLmluZGV4T2YoJ25vLXJvdy1zZWxlY3QnKSA9PT0gLTEgJiZcbiAgICAgICAgcGFyZW50MmNsYXNzLmluZGV4T2YoJ25vLXJvdy1zZWxlY3QnKSA9PT0gLTEgJiZcbiAgICAgICAgcGFyZW50M2NsYXNzLmluZGV4T2YoJ25vLXJvdy1zZWxlY3QnKSA9PT0gLTEgJiZcbiAgICAgICAgcGFyZW50NGNsYXNzLmluZGV4T2YoJ25vLXJvdy1zZWxlY3QnKSA9PT0gLTFcbiAgICAgICkge1xuICAgICAgICB0aGlzLnByb3BzLml0ZW1TZWxlY3Rpb25DaGFuZ2UoXG4gICAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgIHRoaXMucHJvcHMubXVsdGlTZWxlY3QgJiYgZS5jdHJsS2V5LFxuICAgICAgICAgIHRoaXMucHJvcHMubXVsdGlTZWxlY3QgJiYgZS5zaGlmdEtleSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMub25Sb3dDbGljaykge1xuICAgICAgdGhpcy5wcm9wcy5vblJvd0NsaWNrKGUsIHJvd0luZGV4LCB0aGlzLnByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGhhbmRsZUNvbnRleHRNZW51ID0gKGUsIHJvd0luZGV4KSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuY29udGV4dE1lbnVJdGVtcykge1xuICAgICAgY29uc3Qge1xuICAgICAgICBpdGVtU2VsZWN0aW9uQ2hhbmdlLFxuICAgICAgICBzZWxlY3RlZEl0ZW1zLFxuICAgICAgICBncmlkLFxuICAgICAgICBkYXRhLFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGNvbnRleHRNZW51T3BlbjogdHJ1ZSxcbiAgICAgICAgY29udGV4dE1lbnVYOiBlLmNsaWVudFgsXG4gICAgICAgIGNvbnRleHRNZW51WTogZS5jbGllbnRZLFxuICAgICAgfSk7XG4gICAgICAvLyBJZiBjbGlja2VkIGl0ZW0gaXMgbm90IHNlbGVjdGVkLCBjaGFuZ2Ugc2VsZWN0aW9uIHRvIGl0XG4gICAgICBpZiAoIXNlbGVjdGVkSXRlbXMuaW5jbHVkZXMoZGF0YS5nZXRJbihbcm93SW5kZXgsIC4uLmdyaWQuaWRLZXlQYXRoXSkpKSB7XG4gICAgICAgIGl0ZW1TZWxlY3Rpb25DaGFuZ2UoZ3JpZCwgcm93SW5kZXgpO1xuICAgICAgfVxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uRG9jdW1lbnRDbGljayk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGhhbmRsZUNvbnRleHRNZW51SXRlbUNsaWNrID0gKG9uQ2xpY2ssIHNlbGVjdGVkSXRlbXMsIHNlbGVjdGVkRGF0YSkgPT4gKCkgPT4ge1xuICAgIG9uQ2xpY2soc2VsZWN0ZWRJdGVtcywgc2VsZWN0ZWREYXRhKTtcbiAgfTtcblxuICBoYW5kbGVSb3dIZWlnaHRHZXR0ZXIgPSByb3dJbmRleCA9PlxuICAgIHRoaXMucHJvcHMucm93SGVpZ2h0R2V0dGVyKHRoaXMucHJvcHMuZGF0YS5nZXQocm93SW5kZXgpLCByb3dJbmRleCk7XG5cbiAgcmVuZGVyQ2VsbCA9IGNvbCA9PiAoY2VsbFByb3BzKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgaXNDcmVhdGluZyxcbiAgICAgIGlzRWRpdGluZyxcbiAgICAgIGNyZWF0ZURhdGEsXG4gICAgICBzZWxlY3RlZENlbGwsXG4gICAgICBncmlkLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgcm93SW5kZXgsIC4uLnByb3BzIH0gPSBjZWxsUHJvcHM7XG4gICAgbGV0IGNlbGw7XG4gICAgbGV0IGNlbGxUeXBlID0gJ3ZpZXcnO1xuICAgIGxldCBleHRyYVJvd0NvdW50ID0gMDsgLy8gaG93IG1hbnkgcm93cyB0byBpZ25vcmUgZnJvbSB0b3AsIG5ldyArIGZpbHRlciByb3dzXG4gICAgaWYgKGlzQ3JlYXRpbmcpIGV4dHJhUm93Q291bnQgPSBjcmVhdGVEYXRhLnNpemU7XG4gICAgaWYgKGlzQ3JlYXRpbmcpIHtcbiAgICAgIGlmIChyb3dJbmRleCA8PSAoZXh0cmFSb3dDb3VudCAtIDEpKSB7XG4gICAgICAgIGlmIChjb2wuY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNlbGwgPSBjb2wuY2VsbENyZWF0ZShyb3dJbmRleCk7XG4gICAgICAgICAgY2VsbFR5cGUgPSAnY3JlYXRlJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjZWxsID0gbnVsbDtcbiAgICAgICAgICBjZWxsVHlwZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNlbGwgPSBjb2wuY2VsbChyb3dJbmRleCAtIGV4dHJhUm93Q291bnQpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNFZGl0aW5nICYmIGNvbC5jZWxsRWRpdCkge1xuICAgICAgY2VsbCA9IGNvbC5jZWxsRWRpdChyb3dJbmRleCAtIGV4dHJhUm93Q291bnQpO1xuICAgICAgY2VsbFR5cGUgPSAnZWRpdCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNlbGwgPSBjb2wuY2VsbChyb3dJbmRleCAtIGV4dHJhUm93Q291bnQpO1xuICAgIH1cbiAgICBjb25zdCBpc1NwZWNpYWwgPSBwcm9wcy5jb2x1bW5LZXkgPT09ICdzZWxlY3Rpb25DaGVja2JveCcgfHwgcHJvcHMuY29sdW1uS2V5ID09PSAnZXh0cmFDb2x1bW4nO1xuICAgIGlmICgoY2VsbFR5cGUgPT09ICd2aWV3JyB8fCBjZWxsVHlwZSA9PT0gJ2VkaXQnIHx8IGNlbGxUeXBlID09PSAnY3JlYXRlJykgJiYgIWlzU3BlY2lhbCkge1xuICAgICAgY29uc3QgZ2V0Um93SW5kZXggPSAoY2VsbFR5cGUgPT09ICdjcmVhdGUnKSA/IHJvd0luZGV4IDogKHJvd0luZGV4IC0gZXh0cmFSb3dDb3VudCk7XG4gICAgICBjb25zdCBtZXNzYWdlRGF0YSA9IHRoaXMuZ2V0Q2VsbE1lc3NhZ2VzKGdldFJvd0luZGV4LCBjb2wsIGNlbGxUeXBlKTtcbiAgICAgIGNvbnN0IGlzRWRpdGVkID0gdGhpcy5pc0NlbGxFZGl0ZWQoZ2V0Um93SW5kZXgsIGNvbCwgY2VsbFR5cGUpO1xuICAgICAgY29uc3QgY2xhc3NOYW1lID0gKHNlbGVjdGVkQ2VsbC5nZXQoJ3Jvd0luZGV4JykgPT09IHJvd0luZGV4ICYmIHNlbGVjdGVkQ2VsbC5nZXQoJ2NvbHVtbktleScpID09PSBwcm9wcy5jb2x1bW5LZXkpID9cbiAgICAgICAgJ29jLWRhdGFncmlkLWNlbGwgaXMtc2VsZWN0ZWQnIDogJ29jLWRhdGFncmlkLWNlbGwnO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPENlbGxcbiAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG4gICAgICAgICAgc3R5bGU9e2NvbC5zdHlsZX1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNlbGxTZWxlY3QoY2VsbFR5cGUsIHJvd0luZGV4LCBwcm9wcy5jb2x1bW5LZXkpfVxuICAgICAgICA+XG4gICAgICAgICAgPENlbGxUb29sdGlwXG4gICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRDZWxsLSR7Z3JpZC5pZH0tJHtwcm9wcy5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgIGlzRWRpdGVkPXtpc0VkaXRlZH1cbiAgICAgICAgICAgIGlzRXJyb3I9eyEhbWVzc2FnZURhdGEuZXJyb3JNZXNzYWdlfVxuICAgICAgICAgICAgaXNXYXJuaW5nPXshIW1lc3NhZ2VEYXRhLndhcm5pbmdNZXNzYWdlfVxuICAgICAgICAgICAgaW5mb01lc3NhZ2U9e21lc3NhZ2VEYXRhLmluZm9NZXNzYWdlfVxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlPXttZXNzYWdlRGF0YS5lcnJvck1lc3NhZ2V9XG4gICAgICAgICAgICB3YXJuaW5nTWVzc2FnZT17bWVzc2FnZURhdGEud2FybmluZ01lc3NhZ2V9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2NlbGx9XG4gICAgICAgICAgPC9DZWxsVG9vbHRpcD5cbiAgICAgICAgPC9DZWxsPlxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxDZWxsIHsuLi5wcm9wc30gY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtY2VsbFwiIHN0eWxlPXtjb2wuc3R5bGV9PntjZWxsfTwvQ2VsbD5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlckNvbHVtbnMgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgYWxsRGF0YVNpemUsXG4gICAgICBncmlkLFxuICAgICAgaXNDcmVhdGluZyxcbiAgICAgIGlzQnVzeSxcbiAgICAgIHZpc2libGVDb2x1bW5zLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghYWxsRGF0YVNpemUgJiYgIWlzQnVzeSAmJiAhaXNDcmVhdGluZyAmJiAhZ3JpZC5wYWdpbmF0aW9uKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Q29sdW1uXG4gICAgICAgICAgY29sdW1uS2V5PVwiZGF0YUVtcHR5Q29sdW1uXCJcbiAgICAgICAgICBoZWFkZXI9ezxDZWxsIHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicgfX0+PE0gaWQ9XCJHcmlkLk5vSXRlbXNcIiAvPjwvQ2VsbD59XG4gICAgICAgICAgd2lkdGg9ezEwfVxuICAgICAgICAgIGlzUmVzaXphYmxlPXtmYWxzZX1cbiAgICAgICAgICBmbGV4R3Jvdz17MX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICAgIGlmICghdmlzaWJsZUNvbHVtbnMuc2l6ZSkge1xuICAgICAgaWYgKGlzQnVzeSkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxDb2x1bW5cbiAgICAgICAgICAgIGNvbHVtbktleT1cImRhdGFFbXB0eUNvbHVtblwiXG4gICAgICAgICAgICBoZWFkZXI9ezxDZWxsPiZuYnNwOzwvQ2VsbD59XG4gICAgICAgICAgICB3aWR0aD17MTB9XG4gICAgICAgICAgICBpc1Jlc2l6YWJsZT17ZmFsc2V9XG4gICAgICAgICAgICBmbGV4R3Jvdz17MX1cbiAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPENvbHVtblxuICAgICAgICAgIGNvbHVtbktleT1cImRhdGFFbXB0eUNvbHVtblwiXG4gICAgICAgICAgaGVhZGVyPXs8Q2VsbCBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInIH19PjxNIGlkPVwiR3JpZC5Ob0NvbHVtbnNcIiAvPjwvQ2VsbD59XG4gICAgICAgICAgd2lkdGg9ezEwfVxuICAgICAgICAgIGlzUmVzaXphYmxlPXtmYWxzZX1cbiAgICAgICAgICBmbGV4R3Jvdz17MX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnN0IGNvbHVtbnMgPSB0aGlzLmdlbmVyYXRlQ29sdW1ucygpO1xuICAgIGlmIChjb2x1bW5zLmxlbmdodCA9PT0gMCkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIGNvbHVtbnMubWFwKGNvbCA9PiAoXG4gICAgICA8Q29sdW1uXG4gICAgICAgIGtleT17Y29sLmNvbHVtbktleX1cbiAgICAgICAgY29sdW1uS2V5PXtjb2wuY29sdW1uS2V5fVxuICAgICAgICBoZWFkZXI9e1xuICAgICAgICAgIDxIZWFkZXJDZWxsXG4gICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRIZWFkZXItJHt0aGlzLnByb3BzLmdyaWQuaWR9LSR7Y29sLmNvbHVtbktleX1gfVxuICAgICAgICAgICAgZ3JpZD17dGhpcy5wcm9wcy5ncmlkfVxuICAgICAgICAgICAgY29sdW1ucz17dGhpcy5wcm9wcy5jb2x1bW5zfVxuICAgICAgICAgICAgY29sdW1uPXtjb2x9XG4gICAgICAgICAgICBjdXJyZW50U29ydENvbHVtbj17dGhpcy5wcm9wcy5zb3J0Q29sdW1ufVxuICAgICAgICAgICAgY3VycmVudFNvcnRPcmRlcj17dGhpcy5wcm9wcy5zb3J0T3JkZXJ9XG4gICAgICAgICAgICBvblNvcnRDaGFuZ2U9e3RoaXMucHJvcHMuc29ydENoYW5nZX1cbiAgICAgICAgICAgIGlzQnVzeT17dGhpcy5wcm9wcy5pc0J1c3l9XG4gICAgICAgICAgICBmaWx0ZXJpbmc9e3RoaXMucHJvcHMuaXNGaWx0ZXJpbmd9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2NvbC5oZWFkZXJ9XG4gICAgICAgICAgPC9IZWFkZXJDZWxsPlxuICAgICAgICB9XG4gICAgICAgIGNlbGw9e3RoaXMucmVuZGVyQ2VsbChjb2wpfVxuICAgICAgICB3aWR0aD17dGhpcy5wcm9wcy5jb2x1bW5XaWR0aHMuZ2V0KGNvbC5jb2x1bW5LZXksIGNvbC53aWR0aCl9XG4gICAgICAgIG1pbldpZHRoPXtjb2wubWluV2lkdGh9XG4gICAgICAgIG1heFdpZHRoPXtjb2wubWF4V2lkdGh9XG4gICAgICAgIGlzUmVzaXphYmxlPXtjb2wuaXNSZXNpemFibGV9XG4gICAgICAgIGZsZXhHcm93PXtjb2wuZmxleEdyb3cgPyBjb2wuZmxleEdyb3cgOiAwfVxuICAgICAgICBmaXhlZD17Y29sLmZpeGVkfVxuICAgICAgICBmaXhlZFJpZ2h0PXtjb2wuZml4ZWRSaWdodH1cbiAgICAgICAgYWxsb3dDZWxsc1JlY3ljbGluZz17Y29sLmFsbG93Q2VsbHNSZWN5Y2xpbmd9XG4gICAgICAvPikpO1xuICB9O1xuXG4gIHJlbmRlckNvbnRleHRNZW51ID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGNvbnRleHRNZW51SXRlbXMsXG4gICAgICBkYXRhLFxuICAgICAgZ3JpZCxcbiAgICAgIHNlbGVjdGVkSXRlbXMsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge1xuICAgICAgY29udGV4dE1lbnVYLFxuICAgICAgY29udGV4dE1lbnVZLFxuICAgIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHN0eWxlID0ge1xuICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgIHpJbmRleDogMTAwMDAsXG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIHRvcDogYCR7Y29udGV4dE1lbnVZfXB4YCxcbiAgICAgIGxlZnQ6IGAke2NvbnRleHRNZW51WH1weGAsXG4gICAgfTtcbiAgICBjb25zdCBzZWxlY3RlZERhdGEgPSBkYXRhLmZpbHRlcihkID0+IHNlbGVjdGVkSXRlbXMuaW5jbHVkZXMoZC5nZXRJbihncmlkLmlkS2V5UGF0aCkpKTtcbiAgICByZXR1cm4gKFxuICAgICAgPHVsIGNsYXNzTmFtZT1cImRyb3Bkb3duLW1lbnUgb2MtZGF0YWdyaWQtY29udGV4dC1tZW51IG9wZW5cIiBzdHlsZT17c3R5bGV9PlxuICAgICAgICB7Y29udGV4dE1lbnVJdGVtcyAmJiBjb250ZXh0TWVudUl0ZW1zLm1hcCAmJiBjb250ZXh0TWVudUl0ZW1zLm1hcCgoaXRlbSwgaSkgPT4ge1xuICAgICAgICAgIGxldCB7IGRpc2FibGVkIH0gPSBpdGVtO1xuICAgICAgICAgIGlmICh0eXBlb2YgaXRlbS5kaXNhYmxlZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZGlzYWJsZWQgPSBpdGVtLmRpc2FibGVkKHNlbGVjdGVkSXRlbXMsIHNlbGVjdGVkRGF0YSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8TWVudUl0ZW1cbiAgICAgICAgICAgICAga2V5PXtpfSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgICAgICAgIGhlYWRlcj17aXRlbS5oZWFkZXJ9XG4gICAgICAgICAgICAgIGRpdmlkZXI9e2l0ZW0uZGl2aWRlcn1cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgICB0aXRsZT17aXRlbS50aXRsZX1cbiAgICAgICAgICAgICAgb25DbGljaz17KGRpc2FibGVkIHx8ICFpdGVtLm9uQ2xpY2spID8gbnVsbCA6IHRoaXMuaGFuZGxlQ29udGV4dE1lbnVJdGVtQ2xpY2soXG4gICAgICAgICAgICAgICAgaXRlbS5vbkNsaWNrLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkSXRlbXMsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWREYXRhLFxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7aXRlbS52YWx1ZX1cbiAgICAgICAgICAgIDwvTWVudUl0ZW0+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSl9XG4gICAgICA8L3VsPlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGdyaWRDbGFzc05hbWUgPSBjbGFzc05hbWVzKHtcbiAgICAgICdvYy1kYXRhZ3JpZC1jb250YWluZXInOiB0cnVlLFxuICAgICAgJ3dpdGgtYWN0aW9uYmFyJzogdGhpcy5wcm9wcy5pbmxpbmVFZGl0ICYmICF0aGlzLnByb3BzLmRpc2FibGVBY3Rpb25CYXIsXG4gICAgICAnaXMtYnVzeSc6IHRoaXMucHJvcHMuaXNCdXN5LFxuICAgICAgJ2lzLWVkaXRpbmcnOiB0aGlzLnByb3BzLmlzRWRpdGluZyxcbiAgICAgICdpcy1jcmVhdGluZyc6IHRoaXMucHJvcHMuaXNDcmVhdGluZyxcbiAgICAgIFt0aGlzLnByb3BzLmNsYXNzTmFtZV06ICEhdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgfSk7XG5cbiAgICAvLyBjaGVjayBpZiB0aGVyZSBpcyBhIG5ldyByZXF1ZXN0IHRvIGNoYW5nZSBlZGl0IG1vZGUgZm9jdXNcbiAgICB0aGlzLnNldEZvY3VzVG8odGhpcy5wcm9wcy5mb2N1c1R5cGUpO1xuXG4gICAgbGV0IGFjdGlvbkJhciA9IG51bGw7XG4gICAgbGV0IGFjdGlvbkJhclJpZ2h0ID0gbnVsbDtcbiAgICBsZXQgYWN0aW9uQmFyTGVmdCA9IG51bGw7XG4gICAgaWYgKFxuICAgICAgKHRoaXMucHJvcHMuYWN0aW9uQmFyIHx8XG4gICAgICAgIHRoaXMucHJvcHMuaW5saW5lRWRpdCB8fFxuICAgICAgICB0aGlzLnByb3BzLmZpbHRlcmluZyB8fFxuICAgICAgICB0aGlzLnByb3BzLnJlbW92aW5nKSAmJlxuICAgICAgIXRoaXMucHJvcHMuZGlzYWJsZUFjdGlvbkJhclxuICAgICkge1xuICAgICAgYWN0aW9uQmFyUmlnaHQgPSAoXG4gICAgICAgIDxBY3Rpb25CYXIgcG9zaXRpb249XCJyaWdodFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtYWN0aW9uYmFyLXJpZ2h0XCI+e3RoaXMucHJvcHMuYWN0aW9uQmFyfTwvZGl2PlxuICAgICAgICAgIHsodGhpcy5wcm9wcy5maWx0ZXJpbmcgJiYgdGhpcy5wcm9wcy5kaXNhYmxlRHJvcGRvd24gJiZcbiAgICAgICAgICAgICF0aGlzLnByb3BzLmRpc2FibGVGaWx0ZXJpbmdDb250cm9scykgJiYgPEZpbHRlcmluZ0NvbnRyb2xzIHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICAgIH1cbiAgICAgICAgICB7dGhpcy5wcm9wcy5pbmxpbmVFZGl0ICYmXG4gICAgICAgICAgPElubGluZUVkaXRDb250cm9sc1xuICAgICAgICAgICAgYWZ0ZXJBZGRJdGVtPXt0aGlzLmhhbmRsZUFmdGVyQWRkSXRlbX1cbiAgICAgICAgICAgIGFmdGVyRWRpdFByZXNzPXt0aGlzLmhhbmRsZUFmdGVyRWRpdFByZXNzfVxuICAgICAgICAgICAgYWZ0ZXJWYWxpZGF0aW9uRXJyb3I9e3RoaXMuaGFuZGxlQWZ0ZXJWYWxpZGF0aW9uRXJyb3J9XG4gICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAvPlxuICAgICAgICAgIH1cbiAgICAgICAgICB7KHRoaXMucHJvcHMuZHJvcGRvd25NZW51SXRlbXMgfHxcbiAgICAgICAgICAgIHRoaXMucHJvcHMucmVtb3ZpbmcgfHxcbiAgICAgICAgICAgIHRoaXMucHJvcHMuY29sdW1uU2V0dGluZ3MgfHxcbiAgICAgICAgICAgICh0aGlzLnByb3BzLmZpbHRlcmluZyAmJlxuICAgICAgICAgICAgICAhdGhpcy5wcm9wcy5kaXNhYmxlRHJvcGRvd24pKSAmJiA8RHJvcGRvd25Db250cm9scyB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgICB9XG4gICAgICAgIDwvQWN0aW9uQmFyPlxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuYWN0aW9uQmFyTGVmdCB8fCB0aGlzLnByb3BzLmdyaWRIZWFkZXIpIHtcbiAgICAgIGFjdGlvbkJhckxlZnQgPSAoXG4gICAgICAgIDxBY3Rpb25CYXIgcG9zaXRpb249XCJsZWZ0XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1ncmlkaGVhZGVyXCI+e3RoaXMucHJvcHMuZ3JpZEhlYWRlcn08L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWFjdGlvbmJhci1sZWZ0XCI+e3RoaXMucHJvcHMuYWN0aW9uQmFyTGVmdH08L2Rpdj5cbiAgICAgICAgPC9BY3Rpb25CYXI+XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoYWN0aW9uQmFyTGVmdCB8fCBhY3Rpb25CYXJSaWdodCkge1xuICAgICAgYWN0aW9uQmFyID0gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWFjdGlvbmJhci1jb250YWluZXJcIj5cbiAgICAgICAgICB7YWN0aW9uQmFyTGVmdH1cbiAgICAgICAgICB7YWN0aW9uQmFyUmlnaHR9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gICAgbGV0IHJvd3NDb3VudCA9XG4gICAgICAodGhpcy5wcm9wcy5yb3dzQ291bnQgfHwgdGhpcy5wcm9wcy5yb3dzQ291bnQgPT09IDApID9cbiAgICAgICAgdGhpcy5wcm9wcy5yb3dzQ291bnQgOlxuICAgICAgICB0aGlzLnByb3BzLmRhdGEuc2l6ZTtcbiAgICBpZiAodGhpcy5wcm9wcy5pc0NyZWF0aW5nKSByb3dzQ291bnQgKz0gdGhpcy5wcm9wcy5jcmVhdGVEYXRhLnNpemU7XG4gICAgaWYgKCF0aGlzLnByb3BzLnZpc2libGVDb2x1bW5zLnNpemUpIHJvd3NDb3VudCA9IDA7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9e2BvYy1kYXRhZ3JpZC0ke3RoaXMucHJvcHMuZ3JpZC5pZH1gfVxuICAgICAgICBjbGFzc05hbWU9e2dyaWRDbGFzc05hbWV9XG4gICAgICAgIHN0eWxlPXt0aGlzLnByb3BzLmNvbnRhaW5lclN0eWxlfVxuICAgICAgPlxuICAgICAgICB7dGhpcy5wcm9wcy5pc0J1c3kgJiYgPFNwaW5uZXIgLz59XG4gICAgICAgIHt0aGlzLnN0YXRlLmNvbnRleHRNZW51T3BlbiAmJiB0aGlzLnJlbmRlckNvbnRleHRNZW51KCl9XG4gICAgICAgIHthY3Rpb25CYXJ9XG4gICAgICAgIDxSZXNwb25zaXZlRml4ZWREYXRhVGFibGVcbiAgICAgICAgICBpZD17dGhpcy5wcm9wcy5ncmlkLmlkfVxuICAgICAgICAgIHJvd3NDb3VudD17cm93c0NvdW50fVxuICAgICAgICAgIGhlYWRlckhlaWdodD17dGhpcy5wcm9wcy5pc0ZpbHRlcmluZyA/XG4gICAgICAgICAgICB0aGlzLnByb3BzLmhlYWRlckhlaWdodCArIHRoaXMucHJvcHMuZmlsdGVyUm93SGVpZ2h0XG4gICAgICAgICAgICA6IHRoaXMucHJvcHMuaGVhZGVySGVpZ2h0fVxuICAgICAgICAgIHJvd0hlaWdodD17dGhpcy5wcm9wcy5yb3dIZWlnaHR9XG4gICAgICAgICAgb25Db2x1bW5SZXNpemVFbmRDYWxsYmFjaz17dGhpcy5vbkNvbHVtblJlc2l6ZUVuZENhbGxiYWNrfVxuICAgICAgICAgIGlzQ29sdW1uUmVzaXppbmc9e2ZhbHNlfVxuICAgICAgICAgIG9uUm93Q2xpY2s9e3RoaXMuaGFuZGxlUm93Q2xpY2t9XG4gICAgICAgICAgc2Nyb2xsVG9Db2x1bW49e3RoaXMucHJvcHMuc2Nyb2xsVG9Db2x1bW4gfHwgdGhpcy5zdGF0ZS5jdXJyZW50Q29sdW1ufVxuICAgICAgICAgIHNjcm9sbFRvcD17dGhpcy5wcm9wcy5zY3JvbGxUb3B9XG4gICAgICAgICAgc2Nyb2xsVG9Sb3c9e3RoaXMuZ2V0U2Nyb2xsVG9Sb3coKX1cbiAgICAgICAgICBvblJvd0RvdWJsZUNsaWNrPXt0aGlzLnByb3BzLm9uUm93RG91YmxlQ2xpY2t9XG4gICAgICAgICAgb25Sb3dNb3VzZURvd249e3RoaXMucHJvcHMub25Nb3VzZURvd259XG4gICAgICAgICAgb25Sb3dNb3VzZUVudGVyPXt0aGlzLnByb3BzLm9uUm93TW91c2VFbnRlcn1cbiAgICAgICAgICBvblJvd01vdXNlTGVhdmU9e3RoaXMucHJvcHMub25Sb3dNb3VzZUxlYXZlfVxuICAgICAgICAgIG9uU2Nyb2xsU3RhcnQ9e3RoaXMucHJvcHMub25TY3JvbGxTdGFydH1cbiAgICAgICAgICBvblNjcm9sbEVuZD17dGhpcy5wcm9wcy5vblNjcm9sbEVuZH1cbiAgICAgICAgICByb3dDbGFzc05hbWVHZXR0ZXI9e3RoaXMuZ2V0Um93Q2xhc3NOYW1lfVxuICAgICAgICAgIHJvd0hlaWdodEdldHRlcj17dGhpcy5wcm9wcy5yb3dIZWlnaHRHZXR0ZXIgJiYgdGhpcy5oYW5kbGVSb3dIZWlnaHRHZXR0ZXJ9XG4gICAgICAgICAgb25Db250ZW50SGVpZ2h0Q2hhbmdlPXt0aGlzLnByb3BzLm9uQ29udGVudEhlaWdodENoYW5nZX1cbiAgICAgICAgICBvblJvd0NvbnRleHRNZW51PXt0aGlzLmhhbmRsZUNvbnRleHRNZW51fVxuICAgICAgICA+XG4gICAgICAgICAge3RoaXMucmVuZGVyQ29sdW1ucygpfVxuICAgICAgICA8L1Jlc3BvbnNpdmVGaXhlZERhdGFUYWJsZT5cbiAgICAgICAge3RoaXMucHJvcHMuaXNDb2x1bW5TZXR0aW5nc01vZGFsT3BlbiAmJlxuICAgICAgICA8Q29sdW1uU2V0dGluZ3NNb2RhbFxuICAgICAgICAgIGdyaWQ9e3RoaXMucHJvcHMuZ3JpZH1cbiAgICAgICAgICBjb2x1bW5zPXt0aGlzLnByb3BzLmNvbHVtbnN9XG4gICAgICAgICAgdmlzaWJsZUNvbHVtbnM9e3RoaXMucHJvcHMudmlzaWJsZUNvbHVtbnN9XG4gICAgICAgICAgY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsPXt0aGlzLnByb3BzLmNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbH1cbiAgICAgICAgICBzYXZlQ29sdW1uU2V0dGluZ3M9e3RoaXMucHJvcHMuc2F2ZUNvbHVtblNldHRpbmdzfVxuICAgICAgICAvPlxuICAgICAgICB9XG4gICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEYXRhR3JpZDtcbiJdfQ==