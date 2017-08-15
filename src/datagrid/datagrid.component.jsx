/* eslint-disable no-lonely-if, no-nested-ternary, prefer-template, react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map, List } from 'immutable';
import { connect } from 'react-redux';
import { injectIntl,
         FormattedMessage as M,
         FormattedDate as D,
         FormattedNumber as N } from 'react-intl';
import { Column, Cell } from 'fixed-data-table-2';
import { Checkbox, FormControl } from 'react-bootstrap';
import classNames from 'classnames';
import isNaN from 'lodash/isNaN';
import moment from 'moment';
import 'fixed-data-table-2/dist/fixed-data-table.css';

import ResponsiveFixedDataTable from './responsive-fixed-data-table.component';
import SortHeaderCell from './sort-header-cell.component';
import ActionBar from './action-bar.component';
import InlineEditControls from './inline-edit-controls.component';
import FilteringControls from './filtering-controls.component';
import DropdownControls from './dropdown-controls.component';
import * as datagridActions from './datagrid.actions';
import FloatingSelect from './floating-select/floating-select.component';
import DateInput from './date-picker/date-picker.component';
import CellTooltip from './cell-tooltip.component';
import './datagrid.component.scss';

import { Spinner } from '../spinner';
import KEY_CODES from '../constants/key-codes.constant';

const mapStateToProps = (state, ownProps) => {
  const locale = {};
  if (ownProps.locale) {
    locale.userLanguage = ownProps.locale.language || 'en';
    locale.dateFormat = ownProps.locale.dateFormat || 'L';
    locale.thousandSeparator = ownProps.locale.thousandSeparator || '';
    locale.decimalSeparator = ownProps.locale.decimalSeparator || '';
  } else if (state.user) {
    locale.userLanguage = state.user.getIn(['user', 'language'], 'en');
    locale.dateFormat = state.user.getIn(['localeFormat', 'dateFormat'], 'L');
    locale.thousandSeparator = state.user.getIn(['localeFormat', 'thousandSeparator'], '');
    locale.decimalSeparator = state.user.getIn(['localeFormat', 'decimalSeparator'], '');
  }
  return {
    isBusy: state.datagrid.getIn([ownProps.id, 'session', 'isBusy'], true),
    isEditing: state.datagrid.getIn([ownProps.id, 'session', 'isEditing'], false),
    isCreating: state.datagrid.getIn([ownProps.id, 'session', 'isCreating'], false),
    isFiltering: state.datagrid.getIn([ownProps.id, 'session', 'isFiltering'], false),
    sortColumn: state.datagrid.getIn([ownProps.id, 'user', 'sortColumn'], null),
    sortOrder: state.datagrid.getIn([ownProps.id, 'user', 'sortOrder'], 'asc'),
    columnWidths: state.datagrid.getIn([ownProps.id, 'user', 'columnWidths'], Map()),
    selectedItems: state.datagrid.getIn([ownProps.id, 'selectedItems'], List()),
    data: state.datagrid.getIn([ownProps.id, 'data'], List()),
    editData: state.datagrid.getIn([ownProps.id, 'editData'], Map()),
    createData: state.datagrid.getIn([ownProps.id, 'createData'], List()),
    filterData: state.datagrid.getIn([ownProps.id, 'filterData'], Map()),
    cellMessages: state.datagrid.getIn([ownProps.id, 'cellMessages'], Map()),
    createCellMessages: state.datagrid.getIn([ownProps.id, 'createCellMessages'], Map()),
    allDataSize: state.datagrid.getIn([ownProps.id, 'allData'], List()).size,
    userLanguage: locale.userLanguage || 'en',
    dateFormat: locale.dateFormat || 'L',
    thousandSeparator: locale.thousandSeparator || '',
    decimalSeparator: locale.decimalSeparator || '',
  };
};

const mapDispatchToProps = datagridActions;

/**
 * DataGrid component.
 * @class DataGrid
 * @extends React.PureComponent
 * @memberof Platform.Components
 */

/* eslint-disable max-len */

/**
 * @memberof Platform.Components.DataGrid
 * @prop {Object} propTypes - The props passed to this component
 * @prop {string} propTypes.id - Unique identifier for the data grid

 * @prop {array} propTypes.columns - Column object array
 * @prop {element} propTypes.columns.header - Column header content
 * @prop {string|number} propTypes.columns.columnKey - Column identifier key (Use if no valueKeyPath)
 * @prop {string} propTypes.columns.valueKeyPath - Column content value key path
 * @prop {string} propTypes.columns.valueType - Value type [text/number/float/boolean/date]
 * @prop {string} propTypes.columns.componentType - Input component type [text/number/float/select/boolean/date]
 * @prop {string} propTypes.columns.valueRender - Override value render, rowData as parameter
 * @prop {string} propTypes.columns.editValueRender - Override value render in editing mode
 * @prop {string} propTypes.columns.createValueRender - Override value render in creating mode
 * @prop {string} propTypes.columns.filterValueRender - Override value render in filtering mode
 * @prop {function} propTypes.columns.cell - Override cell content renderer, rowIndex as parameter
 * @prop {function} propTypes.columns.cellEdit - Override content renderer in editing mode
 * @prop {function} propTypes.columns.cellCreate - Override cell content renderer in creating mode
 * @prop {function} propTypes.columns.cellFilter - Override cell content renderer in filtering mode
 * @prop {object} propTypes.columns.renderComponentProps - Additional props for the render component
 * @prop {object} propTypes.columns.editComponentProps - Additional props for the edit component
 * @prop {object} propTypes.columns.createComponentProps - Additional props for the create component
 * @prop {object} propTypes.columns.filterComponentProps - Additional props for the filter component
 * @prop {number} propTypes.columns.width - The pixel width of the column
 * @prop {number} propTypes.columns.align - The horizontal alignment of the column
 * @prop {boolean} propTypes.columns.fixed - Column is fixed
 * @prop {boolean} propTypes.columns.allowCellsRecycling - Recycle cells that are outside viewport horizontally, better horizontal scrolling performance.
 * @prop {boolean} propTypes.columns.disableResizing - Disable column resizing this column
 * @prop {boolean} propTypes.columns.disableSorting - Disable column sorting this column
 * @prop {boolean} propTypes.columns.disableEditing - Disable inline editing this column
 * @prop {number} propTypes.columns.flexGrow - The grow factor relative to other columns
 * @prop {function} propTypes.columns.sortValueGetter - Getter function for the sort data
 * @prop {function} propTypes.columns.sortComparator - Comparator function for the sort data
 * @prop {string|number} propTypes.columns.defaultValue - Default value for the item when creating new item
 * @prop {object} propTypes.columns.onValueMatchChangeValue - Change other column value if own value matches
 * @prop {object} propTypes.columns.onValueMatchChangeValue.matchValue - When this columns data match to this
 * @prop {object} propTypes.columns.onValueMatchChangeValue.newValueKeyPath - Change value at this keyPath
 * @prop {object} propTypes.columns.onValueMatchChangeValue.newValue - The new value to be inserted
 * @prop {object} propTypes.columns.disableEditingOnValueMatch - Disable input element of this column when value at keyPath matches
 * @prop {object} propTypes.columns.disableEditingOnValueMatch.matchValueKeyPath - Keypath of the value to be matched
 * @prop {object} propTypes.columns.disableEditingOnValueMatch.matchValue - The value to be matched
 * @prop {function} propTypes.columns.onEditValueChange - Called on edit value change, called with (value, valueKeyPath, rowIndex, dataId)
 * @prop {function} propTypes.columns.onCreateValueChange - Called on create value change, called with (value, valueKeyPath, rowIndex)
 * @prop {function} propTypes.columns.onCreateBlur - Called on create cell input blur, called with (value, rowIndex)
 * @prop {function} propTypes.columns.onEditBlur - Called on edit cell input blur, called with (value, rowIndex, dataId)

 * @prop {number} propTypes.rowsCount - Override rows count otherwise calculated from data
 * @prop {array} propTypes.idKeyPath - Key path to ID data
 * @prop {element} propTypes.gridHeader - Grid header displayed on top of grid
 * @prop {element} propTypes.actionBar - Action bar element displayed at top right
 * @prop {element} propTypes.actionBarLeft - Action bar element displayed at top left
 * @prop {boolean} propTypes.disableDropdown - Don't use dropdown menu in the action bar
 * @prop {boolean} propTypes.disableFilteringControls - Don't display the filtering controls (only used if disableDropdown is true). Default is false.
 * @prop {array} propTypes.dropdownMenuItems - Additional dropdown menu items
 * @prop {boolean} propTypes.inlineEdit - Enable inline editing
 * @prop {boolean} propTypes.inlineAdd - Enable inline adding (defaults to true if inlineEdit is enabled)
 * @prop {boolean} propTypes.filtering - Enable column filtering
 * @prop {boolean} propTypes.removing - Enable item removing
 * @prop {boolean} propTypes.rowSelect - Enable row selecting
 * @prop {boolean} propTypes.rowSelectCheckboxColumn - Enable additional checkbox column for row selecting
 * @prop {boolean} propTypes.multiSelect - Enable multi selecting on row selecting
 * @prop {Immutable.Map} propTypes.selectComponentOptions - Options data for the react-select components
 * @prop {boolean} propTypes.disableActions - Disable action bar actions, eg. when other grid busy
 * @prop {object} propTypes.disableActionsMessage - Message about the reason of disabled action bar actions
 * @prop {boolean} propTypes.disableActionBar - Disable action bar rendering
 * @prop {boolean} propTypes.disableActionSave - Disable Save action of action bar
 * @prop {boolean} propTypes.enableArrowNavigation - Enable navigation by arrow keys in the editing mode (only for text and number inputs)
 * @prop {function} propTypes.onSave - Callback that is called when save button is clicked
 * @prop {function} propTypes.onRemove - Callback that is called when delete is clicked
 * @prop {function} propTypes.onCancel - Callback that is called when cancel is clicked
 * @prop {function} propTypes.onAddClick - Callback that is called when add is clicked
 * @prop {function} propTypes.onEditClick - Callback that is called when edit is clicked
 * @prop {number} propTypes.tabIndex - tabIndex start value, needed when multiple grids on same page

 * @prop {number} propTypes.headerHeight - Pixel height of the header row
 * @prop {number} propTypes.rowHeight - Pixel height of rows
 * @prop {Object} propTypes.containerStyle - Additional styles to be set on the container div
 * @prop {number} propTypes.scrollToColumn - Index of column to scroll to
 * @prop {number} propTypes.scrollTop - Value of vertical scroll
 * @prop {number} propTypes.scrollToRow - Index of row to scroll to
 * @prop {function} propTypes.onRowClick - Callback that is called when a row is clicked
 * @prop {function} propTypes.onRowDoubleClick - Callback that is called when a row is double clicked
 * @prop {function} propTypes.onRowMouseDown - Callback that is called when a mouse-down event happens on a row
 * @prop {function} propTypes.onRowMouseEnter - Callback that is called when a mouse-enter event happens on a row
 * @prop {function} propTypes.onRowMouseLeave - Callback that is called when a mouse-leave event happens on a row
 * @prop {function} propTypes.onScrollStart - Callback that is called when scrolling starts with current horizontal and vertical scroll values
 * @prop {function} propTypes.onScrollEnd - Callback that is called when scrolling ends or stops with new horizontal and vertical scroll values
 * @prop {function} propTypes.rowClassNameGetter - To get any additional CSS classes that should be added to a row, rowClassNameGetter(index) is called
 * @prop {function} propTypes.rowHeightGetter - If specified, rowHeightGetter(index) is called for each row and the returned value overrides rowHeight for particular row
 * @prop {function} propTypes.onContentHeightChange - Callback that is called when rowHeightGetter returns a different height for a row than the rowHeight prop. This is necessary because initially table estimates heights of some parts of the content
 */

@injectIntl
@connect(mapStateToProps, mapDispatchToProps)
export default class DataGrid extends React.PureComponent {

  /* eslint-disable prefer-template, react/no-unused-prop-types, react/forbid-prop-types */

  static propTypes = {
    children: PropTypes.node,
    // App props
    intl: PropTypes.object.isRequired,
    // Action props
    addNewItem: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    sort: PropTypes.func.isRequired,
    resizeColumn: PropTypes.func.isRequired,
    invalidate: PropTypes.func.isRequired,
    itemSelectionChange: PropTypes.func.isRequired,
    toggleFiltering: PropTypes.func.isRequired,
    editCellValueChange: PropTypes.func.isRequired,
    createCellValueChange: PropTypes.func.isRequired,
    filterCellValueChange: PropTypes.func.isRequired,
    editCellValueValidate: PropTypes.func.isRequired,
    createCellValueValidate: PropTypes.func.isRequired,
    validateEditedRows: PropTypes.func.isRequired,
    validateCreatedRows: PropTypes.func.isRequired,
    // State props
    isBusy: PropTypes.bool.isRequired,
    isEditing: PropTypes.bool.isRequired,
    isCreating: PropTypes.bool.isRequired,
    isFiltering: PropTypes.bool.isRequired,
    sortColumn: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    sortOrder: PropTypes.string,
    columnWidths: ImmutablePropTypes.mapOf(PropTypes.number.isRequired),
    selectedItems: ImmutablePropTypes.list.isRequired,
    data: ImmutablePropTypes.list.isRequired,
    editData: ImmutablePropTypes.map.isRequired,
    createData: ImmutablePropTypes.list.isRequired,
    filterData: ImmutablePropTypes.map.isRequired,
    cellMessages: ImmutablePropTypes.map.isRequired,
    createCellMessages: ImmutablePropTypes.map.isRequired,
    userLanguage: PropTypes.string.isRequired,
    thousandSeparator: PropTypes.string.isRequired,
    decimalSeparator: PropTypes.string.isRequired,
    allDataSize: PropTypes.number.isRequired,
    // Required component properties
    id: PropTypes.string.isRequired,
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        header: PropTypes.node,
        columnKey: PropTypes.string,              // Use valueKeyPath if possible, this is calculated from there
        valueKeyPath: PropTypes.array,            // key path for the cell data value, required if no columnKey is given
        valueType: PropTypes.string,              // data value type [text/number/float/boolean/date]
        componentType: PropTypes.string,          // edit component type [text/number/float/select/boolean/date]
        valueRender: PropTypes.func,              // custom renderer for the value, data as parameter
        editValueRender: PropTypes.func,          // custom renderer for the edit value, data as parameter
        createValueRender: PropTypes.func,        // custom renderer for the create value, data as parameter
        filterValueRender: PropTypes.func,        // custom renderer for the filter value, data as parameter
        cell: PropTypes.func,                     // override cell renderer, rowIndex as parameter
        cellEdit: PropTypes.func,                 // override cellEdit renderer, rowIndex as parameter
        cellCreate: PropTypes.func,               // override cellCreate renderer, rowIndex as parameter
        cellFilter: PropTypes.func,               // override cellFilter renderer, rowIndex as parameter
        renderComponentProps: PropTypes.object,   // additional props to the render component
        editComponentProps: PropTypes.object,     // additional props to the edit component
        createComponentProps: PropTypes.object,   // additional props to the create component
        filterComponentProps: PropTypes.object,   // additional props to the filter component
        width: PropTypes.number,
        align: PropTypes.string,                  // vertical cell alignment, defaults to 'left'
        fixed: PropTypes.bool,                    // is column fixed
        allowCellsRecycling: PropTypes.bool,      // allow cells to be recycled for better horizontal scrolling perf
        disableResizing: PropTypes.bool,          // disable column resizing
        disableEditing: PropTypes.bool,           // disable input component (make read-only) when editing/creating
        disableSorting: PropTypes.bool,           // disable filtering on this column
        disableEditingOnValueMatch: PropTypes.shape({ // disable editing/creating input when other columns value match
          matchValueKeyPath: PropTypes.array,
          matchValue: PropTypes.any,
        }),
        onValueMatchChangeValue: PropTypes.shape({ // Change other column value when data matches
          matchValue: PropTypes.any,
          newValueKeyPath: PropTypes.array,
          newValue: PropTypes.any,
        }),
        flexGrow: PropTypes.number,
        sortValueGetter: PropTypes.func,          // override sort value getter, defaults to getIn(valueKeyPath)
        sortComparator: PropTypes.func,           // override sort comparator function, default sorts by valueType
        defaultValue: PropTypes.any,              // default value for the column when creating new item
        onEditValueChange: PropTypes.func,        // callback with (value, valueKeyPath, rowIndex, dataId)
        onCreateValueChange: PropTypes.func,      // callbac with (value, valueKeyPath, rowIndex)
        onCreateBlur: PropTypes.func,             // callback with (value, rowIndex)
        onEditBlur: PropTypes.func,               // callback with (value, rowIndex, dataId)
      }).isRequired,
    ).isRequired,
    // Optional component properties
    rowsCount: PropTypes.number,
    idKeyPath: PropTypes.arrayOf(PropTypes.string), // keyPath to id data
    gridHeader: PropTypes.node,
    actionBar: PropTypes.node,
    actionBarLeft: PropTypes.node,
    disableDropdown: PropTypes.bool,              // Don't use dropdown menu in the action bar
    disableFilteringControls: PropTypes.bool,     // Don't display the filtering controls (only valid if disableDropdown is true)
    dropdownMenuItems: PropTypes.array,
    inlineEdit: PropTypes.bool,
    inlineAdd: PropTypes.bool,
    filtering: PropTypes.bool,
    removing: PropTypes.bool,
    rowSelect: PropTypes.bool,
    rowSelectCheckboxColumn: PropTypes.bool,
    multiSelect: PropTypes.bool,
    selectComponentOptions: ImmutablePropTypes.mapOf( // Options data for the react-select components
      PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]).isRequired,
        label: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      })),
    ),
    disableActions: PropTypes.bool,               // Disable actions in the action bar
    disableActionsMessage: PropTypes.shape({
      messageId: PropTypes.string,
      messageValues: PropTypes.shape({}),
    }),
    disableActionBar: PropTypes.bool,
    disableActionSave: PropTypes.bool,
    enableArrowNavigation: PropTypes.bool,
    onSave: PropTypes.func,
    onRemove: PropTypes.func,
    onCancel: PropTypes.func,
    onAddClick: PropTypes.func,
    onEditClick: PropTypes.func,
    tabIndex: PropTypes.number,                   // tabIndex value for inputs in cells
    // Fixed data table built-in features
    headerHeight: PropTypes.number,
    rowHeight: PropTypes.number,
    containerStyle: PropTypes.object,
    scrollToColumn: PropTypes.number,
    scrollTop: PropTypes.number,
    scrollToRow: PropTypes.number,
    onRowClick: PropTypes.func,
    onRowDoubleClick: PropTypes.func,
    onRowMouseDown: PropTypes.func,
    onRowMouseEnter: PropTypes.func,
    onRowMouseLeave: PropTypes.func,
    onScrollStart: PropTypes.func,
    onScrollEnd: PropTypes.func,
    rowClassNameGetter: PropTypes.func,
    rowHeightGetter: PropTypes.func,
    onContentHeightChange: PropTypes.func,
  };

  /* eslint-enable max-len, prefer-template, react/no-unused-prop-types, react/forbid-prop-types */

  static defaultProps = {
    children: undefined,
    containerStyle: {},
    disableActionSave: false,
    enableArrowNavigation: false,
    headerHeight: 40,
    rowHeight: 40,
    onSave: () => {},
    onRemove: () => {},
    onCancel: () => {},
    tabIndex: 1,
    disableFilteringControls: false,
  }

  constructor(props) {
    super(props);
    this.state = { currentRow: 0, currentColumn: 0 };
  }

  componentWillMount() {
    this.columnFilterFunctions = {};
    this.columnDefaultValues = {};        // Used when creating new items
    this.cellRefs = {};
  }

  componentWillUnmount() {
    this.props.invalidate(this.props.id);
  }

  onColumnResizeEndCallback = (newColumnWidth, columnKey) => {
    this.props.resizeColumn(this.props.id, columnKey, newColumnWidth);
  }

  onCreateCellKeyDown = (e) => {
    if (e.keyCode === KEY_CODES.ENTER) {
      this.props.addNewItem(this.props.id, this.columnDefaultValues);
    }
  }

  onEditCellKeyDown = (keyCode, columnKey, rowIndex) => {
    if (this.props.enableArrowNavigation) {
      const columns = this.props.columns;
      switch (keyCode) {
        case KEY_CODES.DOWN: {
          const nextElement = this.cellRefs[`${this.props.id}_${columnKey}_${rowIndex + 1}`];
          this.moveCellFocus(nextElement, rowIndex + 1, -1);
          break;
        }
        case KEY_CODES.UP: {
          const nextElement = this.cellRefs[`${this.props.id}_${columnKey}_${rowIndex - 1}`];
          this.moveCellFocus(nextElement, rowIndex - 1, -1);
          break;
        }
        case KEY_CODES.RIGHT: {
          const columnIndex = columns.findIndex(c => c.valueKeyPath.join('_') === columnKey);
          if (columnIndex !== -1 && columnIndex + 1 < columns.length) {
            const nextColumnKey = columns[columnIndex + 1].valueKeyPath.join('_');
            const nextElement = this.cellRefs[`${this.props.id}_${nextColumnKey}_${rowIndex}`];
            this.moveCellFocus(nextElement, -1, columnIndex + 1);
          }
          break;
        }
        case KEY_CODES.LEFT: {
          const columnIndex = columns.findIndex(c => c.valueKeyPath.join('_') === columnKey);
          if (columnIndex - 1 >= 0) {
            const nextColumnKey = columns[columnIndex - 1].valueKeyPath.join('_');
            const nextElement = this.cellRefs[`${this.props.id}_${nextColumnKey}_${rowIndex}`];
            this.moveCellFocus(nextElement, -1, columnIndex - 1);
          }
          break;
        }
        default:
          break;
      }
    }
  }

  onFilterCellValueChange = (valueKeyPath, value) => {
    this.props.filterCellValueChange(
      this.props.id,
      valueKeyPath,
      value,
      this.columnFilterFunctions,
    );
  }

  onCreateCellValueChange = (rowIndex, col, value) => {
    this.props.createCellValueChange(this.props.id, rowIndex, col.valueKeyPath, value);
    if (col.onCreateValueChange) {
      col.onCreateValueChange(value, col.valueKeyPath, rowIndex);
    }
    if (col.onValueMatchChangeValue && value === col.onValueMatchChangeValue.matchValue) {
      this.onCreateCellValueChange(
        rowIndex,
        { valueKeyPath: col.onValueMatchChangeValue.newValueKeyPath },
        col.onValueMatchChangeValue.newValue,
      );
    }
    if (col.validators) {
      this.props.createCellValueValidate(
        this.props.id,
        rowIndex,
        col.valueKeyPath,
        value,
        col.validators,
      );
    }
  }

  onEditCellValueChange = (rowIndex, col, value) => {
    const dataId = this.getDataIdByRowIndex(rowIndex);
    this.props.editCellValueChange(this.props.id, dataId, col.valueKeyPath, value);
    if (col.onEditValueChange) {
      col.onEditValueChange(value, col.valueKeyPath, rowIndex, dataId);
    }
    if (col.onValueMatchChangeValue && value === col.onValueMatchChangeValue.matchValue) {
      this.onEditCellValueChange(
        rowIndex,
        { valueKeyPath: col.onValueMatchChangeValue.newValueKeyPath },
        col.onValueMatchChangeValue.newValue,
      );
    }
    if (col.validators) {
      this.props.editCellValueValidate(
        this.props.id,
        dataId,
        col.valueKeyPath,
        value,
        col.validators,
        this.props.idKeyPath,
      );
    }
  }

  onCreateCellBlur = (rowIndex, col, value) => {
    if (col.onCreateBlur) {
      col.onCreateBlur(value, rowIndex);
    }
  }

  onEditCellBlur = (rowIndex, col, value) => {
    if (col.onEditBlur) {
      const dataId = this.getDataIdByRowIndex(rowIndex);
      col.onEditBlur(value, rowIndex, dataId);
    }
  }

  onCellFocus = (e) => {
    e.target.select();
  }

  getDataIdByRowIndex = rowIndex =>
    this.props.data.getIn([rowIndex, ...this.props.idKeyPath]);

  getSelectedItemIndex = (id) => {
    if (!id) return undefined;
    const index = this.props.data.findIndex(v => v.getIn(this.props.idKeyPath) === id);
    return index === -1 ? undefined : index;
  }

  getEditItemValue = (rowIndex, col) => {
    // Get the value to display in edit cell
    const id = this.getDataIdByRowIndex(rowIndex);
    const editValue = this.props.editData.getIn([id, ...col.valueKeyPath], undefined);
    let originalValue;
    if (editValue === undefined) {
      originalValue = this.props.data.getIn([rowIndex, ...col.valueKeyPath], '');
    } else if (editValue === null) {
      return '';
    } else {
      return editValue;
    }
    if (originalValue === null || originalValue === undefined || originalValue === '') {
      return '';
    }
    // Special formatting by component type
    if (col.componentType === 'date') {
      return this.props.intl.formatDate(originalValue, { timeZone: 'UTC' });
    } else if (
      col.componentType === 'float' &&
      String(originalValue).length > 0
    ) {
      return String(originalValue).replace('.', this.props.decimalSeparator);
    }
    return originalValue;
  }

  getCreateItemValue = (rowIndex, col) => {
    const val = this.props.createData.getIn([rowIndex, ...col.valueKeyPath], '');
    if (val === null) {
      return '';
    }
    return val;
  }

  getFilterItemValue = (valueKeyPath) => {
    const val = this.props.filterData.get(valueKeyPath.join('/'), '');
    if (val === null) {
      return '';
    }
    return val;
  }

  getComponentDisabledState = (rowIndex, col, mode) => {
    let componentDisabled = !!col.disableEditing;
    // check if component is disabled by other column data
    if (!componentDisabled && col.disableEditingOnValueMatch) {
      if (mode === 'create') {
        componentDisabled = this.getCreateItemValue(
            rowIndex,
            { valueKeyPath: col.disableEditingOnValueMatch.matchValueKeyPath },
          ) === col.disableEditingOnValueMatch.matchValue;
      } else {
        componentDisabled = this.getEditItemValue(
            rowIndex,
            { valueKeyPath: col.disableEditingOnValueMatch.matchValueKeyPath },
          ) === col.disableEditingOnValueMatch.matchValue;
      }
    }
    return componentDisabled;
  }

  getRowClassName = (rowIndex) => {
    const {
      isCreating,
      isEditing,
      isFiltering,
      createData,
      selectedItems,
      idKeyPath,
      data,
    } = this.props;
    const rowClassNames = ['oc-datagrid-row'];
    let extraRowCount = 0; // how many rows to ignore from top, new + filter rows
    if (isCreating) extraRowCount = createData.size;
    if (isFiltering) extraRowCount += 1;
    if (isFiltering && rowIndex === 0) {
      rowClassNames.push('oc-datagrid-row-filter');
    } else {
      if (isCreating) {
        if (rowIndex <= (extraRowCount - 1)) {
          rowClassNames.push('oc-datagrid-row-new');
        }
      } else if (isEditing) {
        rowClassNames.push('oc-datagrid-row-edit');
      }
    }

    // check if row is selected
    if ((!isCreating && !isEditing) &&
        (selectedItems && idKeyPath) &&
        (!isFiltering || rowIndex > 0)) {
      if (selectedItems.indexOf(data.getIn([rowIndex - extraRowCount, ...idKeyPath])) !== -1) {
        rowClassNames.push('is-selected');
      }
    }

    if (this.props.rowClassNameGetter) {
      return rowClassNames.join(' ') + ' ' + this.props.rowClassNameGetter(rowIndex);
    }
    return rowClassNames.join(' ');
  }

  getCellMessages = (rowIndex, col, cellType) => {
    const returnData = {};
    if (!this.props.idKeyPath || !col.valueKeyPath) {
      return returnData;
    }
    let errorMessage;
    let warningMessage;
    if (cellType === 'create') {
      errorMessage = this.props.createCellMessages.getIn(['error', rowIndex, ...col.valueKeyPath]);
      warningMessage = this.props.createCellMessages.getIn(['warning', rowIndex, ...col.valueKeyPath]);
    } else {
      const id = this.getDataIdByRowIndex(rowIndex);
      errorMessage = this.props.cellMessages.getIn(['error', id, ...col.valueKeyPath]);
      warningMessage = this.props.cellMessages.getIn(['warning', id, ...col.valueKeyPath]);
    }
    if (errorMessage) {
      returnData.errorMessageId = errorMessage.id || null;
      returnData.errorMessageValues = errorMessage.values || {};
    }
    if (warningMessage) {
      returnData.warningMessageId = warningMessage.id || null;
      returnData.warningMessageValues = warningMessage.values || {};
    }
    return returnData;
  }

  moveCellFocus = (nextElement, rowIndex, columnIndex) => {
    if (nextElement && nextElement.type === 'text') {
      if (rowIndex !== -1) {
        this.setState({ currentRow: rowIndex });
      }
      if (columnIndex !== -1) {
        this.setState({ currentColumn: columnIndex + 1 });
      }
      setTimeout(() => nextElement.select(), 50);
    }
  }

  generateColumns = () => {
    delete this.refFirstInvalidInput;
    const columns = [];
    const tabIndex = String(this.props.tabIndex);
    if (this.props.rowSelectCheckboxColumn) {
      columns.push({
        width: 40,
        isResizable: false,
        columnKey: 'selectionCheckbox',
        cell: (rowIndex) => {
          const rowItem = this.props.data.get(rowIndex);
          const itemId = rowItem.getIn(this.props.idKeyPath);
          const selected = this.props.selectedItems.includes(itemId);
          return (
            <Checkbox
              className="oc-row-select-checkbox"
              checked={selected}
              onClick={() => {
                this.props.itemSelectionChange(
                  this.props.id, rowIndex, this.props.idKeyPath, true, false);
              }}
              tabIndex={tabIndex}
            />
          );
        },
        cellEdit: () => null,
        cellCreate: () => null,
        cellFilter: () => null,
      });
    }


    this.props.columns.forEach((col) => {
      const column = {
        header: col.header,
        columnKey: col.columnKey || col.valueKeyPath.join('_'),
        width: col.width,
        isResizable: !col.disableResizing,
        fixed: !!col.fixed,
        allowCellsRecycling: !!col.allowCellsRecycling,
      };
      const columnFilterFunction = {
        valueEmptyChecker: val => val === '' || val === null || val === undefined,
        filterMatcher: (val, filterVal) => (new RegExp(filterVal, 'i')).test(val),
      };
      if (col.componentType === 'select') {
        columnFilterFunction.filterMatcher = (val, filterVal) => val === filterVal;
      }
      if (col.defaultValue !== undefined) {
        this.columnDefaultValues[column.columnKey] = col.defaultValue;
      }
      if (col.align) {
        column.align = col.align;
      }
      if (col.valueKeyPath) {
        column.valueKeyPath = col.valueKeyPath;
      }
      if (col.flexGrow) {
        column.flexGrow = col.flexGrow;
      }
      // Cell value rendering
      if (col.cell) {
        column.cell = col.cell;
      } else if (col.valueRender) {
        column.cell = rowIndex => col.valueRender(this.props.data.get(rowIndex));
      } else {
        switch (col.valueType) {
          case 'number':
            column.cell = (rowIndex) => {
              const val = this.props.data.getIn([rowIndex, ...col.valueKeyPath]);
              if (val === null) {
                return '';
              }
              return <N value={val} {...col.renderComponentProps} />;
            };
            break;
          case 'float':
            column.cell = (rowIndex) => {
              const val = this.props.data.getIn([rowIndex, ...col.valueKeyPath]);
              if (val === null) {
                return '';
              }
              return <N value={val} {...col.renderComponentProps} />;
            };
            break;
          case 'date':
            column.cell = (rowIndex) => {
              const val = this.props.data.getIn([rowIndex, ...col.valueKeyPath]);
              if (val === null) {
                return '';
              }
              return <D value={val} {...col.renderComponentProps} />;
            };
            break;
          case 'boolean':
            column.cell = (rowIndex) => {
              const val = this.props.data.getIn([rowIndex, ...col.valueKeyPath]);
              if (val === null) {
                return '';
              }
              return <M id={val ? 'Yes' : 'No'} {...col.renderComponentProps} />;
            };
            break;
          default:
            column.cell = rowIndex => this.props.data.getIn([rowIndex, ...col.valueKeyPath]);
        }
      }
      // Cell edit/create/filter component rendering
      if (col.cellEdit) {
        column.cellEdit = col.cellEdit;
      } else if (col.editValueRender) {
        column.cellEdit = rowIndex => col.editValueRender(this.props.data.get(rowIndex));
      }
      if (col.cellCreate) {
        column.cellCreate = col.cellCreate;
      } else if (col.createValueRender) {
        column.cellCreate = rowIndex => col.createValueRender(this.props.data.get(rowIndex));
      }
      if (col.cellFilter) {
        column.cellFilter = col.cellFilter;
      } else if (col.filterValueRender) {
        column.cellFilter = rowIndex => col.filterValueRender(this.props.data.get(rowIndex));
      }
      if (col.componentType) {
        let editValueParser = val => val;
        switch (col.componentType) {
          case 'text':
            // TODO REFACTOR TO FUNCTION
            if (this.props.inlineEdit) {
              if (!column.cellEdit) {
                column.cellEdit = rowIndex => (
                  <FormControl
                    type="text"
                    value={this.getEditItemValue(rowIndex, col)}
                    onChange={e => this.onEditCellValueChange(
                      rowIndex,
                      col,
                      editValueParser(e.target.value))
                    }
                    onBlur={e => this.onEditCellBlur(
                      rowIndex,
                      col,
                      e.target.value,
                    )}
                    onKeyDown={e => this.onEditCellKeyDown(
                      e.keyCode,
                      column.columnKey,
                      rowIndex,
                    )}
                    inputRef={(input) => {
                      if (this.props.enableArrowNavigation) {
                        this.cellRefs[`${this.props.id}_${column.columnKey}_${rowIndex}`] = input;
                      }
                    }}
                    id={`ocDatagridEditInput-${this.props.id}-${column.columnKey}-${rowIndex}`}
                    {...col.editComponentProps}
                    disabled={this.getComponentDisabledState(rowIndex, col, 'edit')}
                    tabIndex={tabIndex}
                  />
                );
              }
              if (!column.cellCreate) {
                column.cellCreate = rowIndex => (
                  <FormControl
                    type="text"
                    value={this.getCreateItemValue(rowIndex, col)}
                    onChange={e => this.onCreateCellValueChange(
                      rowIndex,
                      col,
                      editValueParser(e.target.value),
                    )}
                    onBlur={e => this.onCreateCellBlur(
                      rowIndex,
                      col,
                      e.target.value,
                    )}
                    onKeyDown={this.onCreateCellKeyDown}
                    id={`ocDatagridCreateInput-${this.props.id}-${column.columnKey}-${rowIndex}`}
                    {...col.createComponentProps}
                    disabled={this.getComponentDisabledState(rowIndex, col, 'create')}
                    tabIndex={tabIndex}
                  />
                );
              }
            }
            if (this.props.filtering) {
              if (!column.cellFilter) {
                column.cellFilter = () => (
                  <FormControl
                    type="text"
                    value={this.getFilterItemValue(col.valueKeyPath)}
                    onChange={e => this.onFilterCellValueChange(
                      col.valueKeyPath,
                      editValueParser(e.target.value),
                    )}
                    id={`ocDatagridFilterInput-${this.props.id}-${column.columnKey}`}
                    {...col.filterComponentProps}
                    tabIndex={tabIndex}
                  />
                );
              }
            }
            break;
          case 'number':
            columnFilterFunction.valueEmptyChecker = (
              val => val === '' ||
              isNaN(val) ||
              val === null ||
              val === undefined
            );
            columnFilterFunction.filterMatcher = (val, filterVal) =>
                parseInt(val, 10) === parseInt(filterVal, 10);
            if (this.props.inlineEdit) {
              if (!column.cellEdit) {
                column.cellEdit = rowIndex => (
                  <FormControl
                    type="number"
                    value={this.getEditItemValue(rowIndex, col)}
                    onChange={e => this.onEditCellValueChange(
                      rowIndex,
                      col,
                      e.target.value,
                    )}
                    onBlur={e => this.onEditCellBlur(
                      rowIndex,
                      col,
                      e.target.value,
                    )}
                    onFocus={this.onCellFocus}
                    onKeyDown={e => this.onEditCellKeyDown(
                      e.keyCode,
                      column.columnKey,
                      rowIndex,
                    )}
                    inputRef={(input) => {
                      if (this.props.enableArrowNavigation) {
                        this.cellRefs[`${this.props.id}_${column.columnKey}_${rowIndex}`] = input;
                      }
                    }}
                    id={`ocDatagridEditInput-${this.props.id}-${column.columnKey}-${rowIndex}`}
                    {...col.editComponentProps}
                    disabled={this.getComponentDisabledState(rowIndex, col, 'edit')}
                    tabIndex={tabIndex}
                  />
                );
              }
              if (!column.cellCreate) {
                column.cellCreate = rowIndex => (
                  <FormControl
                    type="number"
                    value={this.getCreateItemValue(rowIndex, col)}
                    onChange={e => this.onCreateCellValueChange(
                      rowIndex,
                      col,
                      e.target.value,
                    )}
                    onBlur={e => this.onCreateCellBlur(
                      rowIndex,
                      col,
                      e.target.value,
                    )}
                    onFocus={this.onCellFocus}
                    onKeyDown={this.onCreateCellKeyDown}
                    id={`ocDatagridCreateInput-${this.props.id}-${column.columnKey}-${rowIndex}`}
                    {...col.createComponentProps}
                    disabled={this.getComponentDisabledState(rowIndex, col, 'create')}
                    tabIndex={tabIndex}
                  />
                );
              }
            }
            if (this.props.filtering) {
              if (!column.cellFilter) {
                column.cellFilter = () => (
                  <FormControl
                    type="number"
                    value={this.getFilterItemValue(col.valueKeyPath)}
                    onChange={e => this.onFilterCellValueChange(
                      col.valueKeyPath,
                      e.target.value,
                    )}
                    id={`ocDatagridFilterInput-${this.props.id}-${column.columnKey}`}
                    {...col.filterComponentProps}
                    tabIndex={tabIndex}
                  />
                );
              }
            }
            break;
          case 'float':
            editValueParser = val =>
              val.replace(new RegExp(`[^\\d${this.props.decimalSeparator}+-]`, 'g'), '');
            columnFilterFunction.valueEmptyChecker = val => (
              val === '' ||
              isNaN(val) ||
              val === null ||
              val === undefined
            );
            columnFilterFunction.filterMatcher = (val, filterVal) => {
              let parsedFilterVal = filterVal;
              if (this.props.decimalSeparator && this.props.decimalSeparator !== '.') {
                parsedFilterVal = parsedFilterVal.replace(this.props.decimalSeparator, '.');
              }
              return parseFloat(parsedFilterVal) === val;
            };
            if (this.props.inlineEdit) {
              if (!column.cellEdit) {
                column.cellEdit = rowIndex => (
                  <FormControl
                    type="text"
                    value={this.getEditItemValue(rowIndex, col)}
                    onChange={e => this.onEditCellValueChange(
                      rowIndex,
                      col,
                      editValueParser(e.target.value),
                    )}
                    onBlur={e => this.onEditCellBlur(
                      rowIndex,
                      col,
                      editValueParser(e.target.value),
                    )}
                    onKeyDown={e => this.onEditCellKeyDown(
                      e.keyCode,
                      column.columnKey,
                      rowIndex,
                    )}
                    inputRef={(input) => {
                      if (this.props.enableArrowNavigation) {
                        this.cellRefs[`${this.props.id}_${column.columnKey}_${rowIndex}`] = input;
                      }
                    }}
                    id={`ocDatagridEditInput-${this.props.id}-${column.columnKey}-${rowIndex}`}
                    {...col.editComponentProps}
                    disabled={this.getComponentDisabledState(rowIndex, col, 'edit')}
                    tabIndex={tabIndex}
                  />
                );
              }
              if (!column.cellCreate) {
                column.cellCreate = rowIndex => (
                  <FormControl
                    type="text"
                    value={this.getCreateItemValue(rowIndex, col)}
                    onChange={e => this.onCreateCellValueChange(
                      rowIndex,
                      col,
                      editValueParser(e.target.value),
                    )}
                    onBlur={e => this.onCreateCellBlur(
                      rowIndex,
                      col,
                      editValueParser(e.target.value),
                    )}
                    onKeyDown={this.onCreateCellKeyDown}
                    id={`ocDatagridCreateInput-${this.props.id}-${column.columnKey}-${rowIndex}`}
                    {...col.createComponentProps}
                    disabled={this.getComponentDisabledState(rowIndex, col, 'create')}
                    tabIndex={tabIndex}
                  />
                );
              }
            }
            if (this.props.filtering) {
              if (!column.cellFilter) {
                column.cellFilter = () => (
                  <FormControl
                    type="text"
                    value={this.getFilterItemValue(col.valueKeyPath)}
                    onChange={e => this.onFilterCellValueChange(
                      col.valueKeyPath,
                      editValueParser(e.target.value),
                    )}
                    id={`ocDatagridFilterInput-${this.props.id}-${column.columnKey}`}
                    {...col.filterComponentProps}
                    tabIndex={tabIndex}
                  />
                );
              }
            }
            break;
          case 'select': {
            if (this.props.inlineEdit) {
              if (!column.cellEdit) {
                const selectOptions = this.props.selectComponentOptions.get(column.columnKey);
                column.cellEdit = rowIndex => (
                  <FloatingSelect
                    name={col.valueKeyPath.join() + '-edit-' + rowIndex}
                    options={col.editSelectOptionsMod && selectOptions ?
                             col.editSelectOptionsMod(selectOptions.slice(), rowIndex, col) :
                             selectOptions}
                    value={this.getEditItemValue(rowIndex, col)}
                    onChange={selectedData => this.onEditCellValueChange(
                      rowIndex,
                      col,
                      selectedData && editValueParser(selectedData.value),
                    )}
                    onBlur={() => this.onEditCellBlur(
                      rowIndex,
                      col,
                      this.getEditItemValue(rowIndex, col),
                    )}
                    searchable={selectOptions && (selectOptions.length > 9)}
                    clearable={false}
                    backspaceRemoves={false}
                    inputProps={{
                      id: `ocDatagridEditInput-${this.props.id}-${column.columnKey}-${rowIndex}`,
                    }}
                    {...col.editComponentProps}
                    disabled={this.getComponentDisabledState(rowIndex, col, 'edit')}
                    tabIndex={tabIndex}
                  />
                );
              }
              if (!column.cellCreate) {
                const selectOptions = this.props.selectComponentOptions.get(column.columnKey);
                column.cellCreate = rowIndex => (
                  <FloatingSelect
                    name={col.valueKeyPath.join() + '-create-' + rowIndex}
                    options={col.createSelectOptionsMod && selectOptions ?
                             col.createSelectOptionsMod(selectOptions.slice(), rowIndex, col) :
                             selectOptions}
                    value={this.getCreateItemValue(rowIndex, col)}
                    onChange={selectedData => this.onCreateCellValueChange(
                      rowIndex,
                      col,
                      selectedData && editValueParser(selectedData.value),
                    )}
                    onBlur={() => this.onCreateCellBlur(
                      rowIndex,
                      col,
                      this.getEditItemValue(rowIndex, col),
                    )}
                    searchable={selectOptions && (selectOptions.length > 9)}
                    clearable={false}
                    backspaceRemoves={false}
                    inputProps={{
                      id: `ocDatagridCreateInput-${this.props.id}-${column.columnKey}-${rowIndex}`,
                    }}
                    {...col.createComponentProps}
                    disabled={this.getComponentDisabledState(rowIndex, col, 'create')}
                    tabIndex={tabIndex}
                  />
                );
              }
            }
            if (this.props.filtering) {
              if (!column.cellFilter) {
                const selectOptions = this.props.selectComponentOptions.get(column.columnKey);
                column.cellFilter = () => (
                  <FloatingSelect
                    name={col.valueKeyPath.join() + '-filter'}
                    options={col.filterSelectOptionsMod && selectOptions ?
                             col.filterSelectOptionsMod(selectOptions.slice(), col) :
                             selectOptions}
                    value={this.getFilterItemValue(col.valueKeyPath)}
                    onChange={selectedData => this.onFilterCellValueChange(
                      col.valueKeyPath,
                      selectedData && editValueParser(selectedData.value),
                    )}
                    searchable={selectOptions && (selectOptions.length > 9)}
                    clearable
                    inputProps={{
                      id: `ocDatagridFilterInput-${this.props.id}-${column.columnKey}`,
                    }}
                    {...col.filterComponentProps}
                    tabIndex={tabIndex}
                  />
                );
              }
            }
            break;
          }
          case 'date': {
            columnFilterFunction.filterMatcher = (val, filterVal) =>
              moment(filterVal, 'L').isSame(val, 'day');
            if (this.props.inlineEdit) {
              if (!column.cellEdit) {
                column.cellEdit = rowIndex => (
                  <DateInput
                    value={this.getEditItemValue(rowIndex, col)}
                    onChange={data => this.onEditCellValueChange(
                      rowIndex,
                      col,
                      editValueParser(data),
                    )}
                    language={this.props.userLanguage}
                    inputProps={{
                      tabIndex,
                      id: `ocDatagridEditInput-${this.props.id}-${column.columnKey}-${rowIndex}`,
                      onKeyDown: e => this.onEditCellKeyDown(
                        e.keyCode,
                        column.columnKey,
                        rowIndex,
                      ),
                      inputRef: (input) => {
                        if (this.props.enableArrowNavigation) {
                          this.cellRefs[`${this.props.id}_${column.columnKey}_${rowIndex}`] = input;
                        }
                      },
                    }}
                    {...col.editComponentProps}
                    disabled={this.getComponentDisabledState(rowIndex, col, 'edit')}
                  />
                );
              }
              if (!column.cellCreate) {
                column.cellCreate = rowIndex => (
                  <DateInput
                    value={this.getCreateItemValue(rowIndex, col)}
                    onChange={data => this.onCreateCellValueChange(
                      rowIndex,
                      col,
                      editValueParser(data),
                    )}
                    onKeyDown={this.onCreateCellKeyDown}
                    language={this.props.userLanguage}
                    inputProps={{
                      tabIndex,
                      id: `ocDatagridCreateInput-${this.props.id}-${column.columnKey}-${rowIndex}`,
                    }}
                    {...col.createComponentProps}
                    disabled={this.getComponentDisabledState(rowIndex, col, 'create')}
                  />
                );
              }
            }
            if (this.props.filtering) {
              if (!column.cellFilter) {
                column.cellFilter = () => (
                  <DateInput
                    value={this.getFilterItemValue(col.valueKeyPath)}
                    onChange={data => this.onFilterCellValueChange(
                      col.valueKeyPath,
                      editValueParser(data),
                    )}
                    language={this.props.userLanguage}
                    inputProps={{
                      tabIndex,
                      id: `ocDatagridFilterInput-${this.props.id}-${column.columnKey}`,
                    }}
                    {...col.filterComponentProps}
                  />
                );
              }
            }
            break;
          }
          case 'boolean': {
            const selectOptions = [
              { value: true, label: this.props.intl.formatMessage({ id: 'Yes' }) },
              { value: false, label: this.props.intl.formatMessage({ id: 'No' }) },
            ];
            columnFilterFunction.filterMatcher = (val, filterVal) => val === filterVal;
            if (this.props.inlineEdit) {
              if (!column.cellEdit) {
                column.cellEdit = rowIndex => (
                  <FloatingSelect
                    name={col.valueKeyPath.join() + '-edit-' + rowIndex}
                    options={selectOptions}
                    value={this.getEditItemValue(rowIndex, col)}
                    onChange={selectedData => this.onEditCellValueChange(
                      rowIndex,
                      col,
                      selectedData && editValueParser(selectedData.value),
                    )}
                    onBlur={() => this.onEditCellBlur(
                      rowIndex,
                      col,
                      this.getEditItemValue(rowIndex, col),
                    )}
                    searchable={false}
                    clearable={false}
                    backspaceRemoves={false}
                    inputProps={{
                      id: `ocDatagridEditInput-${this.props.id}-${column.columnKey}-${rowIndex}`,
                    }}
                    {...col.editComponentProps}
                    disabled={this.getComponentDisabledState(rowIndex, col, 'edit')}
                    tabIndex={tabIndex}
                  />
                );
              }
              if (!column.cellCreate) {
                column.cellCreate = rowIndex => (
                  <FloatingSelect
                    name={col.valueKeyPath.join() + '-create-' + rowIndex}
                    options={selectOptions}
                    value={this.getCreateItemValue(rowIndex, col)}
                    onChange={selectedData => this.onCreateCellValueChange(
                      rowIndex,
                      col,
                      selectedData && editValueParser(selectedData.value),
                    )}
                    onBlur={() => this.onCreateCellBlur(
                      rowIndex,
                      col,
                      this.getEditItemValue(rowIndex, col),
                    )}
                    searchable={false}
                    clearable={false}
                    backspaceRemoves={false}
                    inputProps={{
                      id: `ocDatagridCreateInput-${this.props.id}-${column.columnKey}-${rowIndex}`,
                    }}
                    {...col.createComponentProps}
                    disabled={this.getComponentDisabledState(rowIndex, col, 'create')}
                    tabIndex={tabIndex}
                  />
                );
              }
            }
            if (this.props.filtering) {
              if (!column.cellFilter) {
                column.cellFilter = () => (
                  <FloatingSelect
                    name={col.valueKeyPath.join() + '-filter'}
                    options={selectOptions}
                    value={this.getFilterItemValue(col.valueKeyPath)}
                    onChange={selectedData => this.onFilterCellValueChange(
                      col.valueKeyPath,
                      selectedData && editValueParser(selectedData.value),
                    )}
                    searchable={false}
                    clearable
                    inputProps={{
                      id: `ocDatagridFilterInput-${this.props.id}-${column.columnKey}`,
                    }}
                    {...col.filterComponentProps}
                    tabIndex={tabIndex}
                  />
                );
              }
            }
            break;
          }
          default:
        }
      }
      // Column sorting functions
      if (col.valueType && (col.sortValueGetter || col.valueKeyPath) && !col.disableSorting) {
        column.isSortable = true;
        if (col.sortComparator) {
          column.sortComparator = col.sortComparator;
        } else {
          switch (col.valueType) {
            case 'text':
              column.sortComparator = (a, b) => (a && a.localeCompare ? a.localeCompare(b) : 1);
              break;
            case 'number':
              column.sortComparator = (a, b) => (a === b ? 0 : (a < b ? -1 : 1));
              break;
            case 'float':
              column.sortComparator = (a, b) => (a === b ? 0 : (a < b ? -1 : 1));
              break;
            case 'boolean':
              column.sortComparator = (a, b) => (a === b ? 0 : (a ? -1 : 1));
              break;
            case 'date':
              column.sortComparator = (a, b) => new Date(b) - new Date(a);
              break;
            default:
              column.sortComparator = (a, b) => (a && a.localeCompare ? a.localeCompare(b) : 1);
          }
        }
        if (col.sortValueGetter) {
          column.sortValueGetter = col.sortValueGetter;
        } else {
          column.sortValueGetter = data => data.getIn(col.valueKeyPath);
        }
      }
      columns.push(column);
      if (col.valueKeyPath) {
        this.columnFilterFunctions[col.valueKeyPath.join('/')] = columnFilterFunction;
      }
    });
    return columns;
  }

  isCellEdited = (rowIndex, col, cellType) => {
    if (cellType !== 'edit') {
      return false;
    }
    const id = this.getDataIdByRowIndex(rowIndex);
    if (this.props.editData.getIn([id, ...col.valueKeyPath])) {
      return true;
    }
    return false;
  }

  // checker for selectionCheckbox
  isSelectionCheckbox(cellProps) {
    const expectedColumnKey = 'selectionCheckbox';
    return (this.props.rowSelectCheckboxColumn && cellProps.columnKey === expectedColumnKey);
  }

  renderCell(col, cellProps) {
    const { isCreating, isEditing, isFiltering, createData } = this.props;
    const { rowIndex, ...props } = cellProps;
    const style = {};
    const isCheckbox = this.isSelectionCheckbox(cellProps);
    let cell;
    let cellType = 'view';
    let extraRowCount = 0; // how many rows to ignore from top, new + filter rows
    if (isCreating) extraRowCount = createData.size;
    if (isFiltering) extraRowCount += 1;
    if (col.align && col.align === 'right') style.textAlign = 'right';
    if (col.align && col.align === 'center') style.textAlign = 'center';
    if (isFiltering && rowIndex === 0) {
      cell = col.cellFilter();
      cellType = 'filter';
    } else {
      if (isCreating) {
        if (rowIndex <= (extraRowCount - 1)) {
          if (col.cellCreate) {
            const realIndex = isFiltering ? rowIndex - 1 : rowIndex;
            cell = col.cellCreate(realIndex);
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
    }

    if ((cellType === 'view' || cellType === 'edit' || cellType === 'create') && !isCheckbox) {
      const getRowIndex = (cellType === 'create') ? rowIndex : (rowIndex - extraRowCount);
      const messageData = this.getCellMessages(getRowIndex, col, cellType);
      const isEdited = this.isCellEdited(getRowIndex, col, cellType);
      return (
        <Cell {...props} className="oc-datagrid-cell" style={style}>
          <CellTooltip
            id={cellType + col.columnKey + (rowIndex - extraRowCount)}
            isEdited={isEdited}
            isError={!!messageData.errorMessageId}
            isWarning={!!messageData.warningMessageId}
            errorMessageId={messageData.errorMessageId}
            errorMessageValues={messageData.errorMessageValues}
            warningMessageId={messageData.warningMessageId}
            warningMessageValues={messageData.warningMessageValues}
          >
            { cell }
          </CellTooltip>
        </Cell>
      );
    }
    return (
      <Cell {...props} className="oc-datagrid-cell" style={style}>{ cell }</Cell>
    );
  }

  renderColumns = () => {
    const columns = this.generateColumns();
    return columns.map(col => (
      <Column
        key={col.columnKey}
        columnKey={col.columnKey}
        header={col.isSortable ?
          <SortHeaderCell
            gridId={this.props.id}
            columnKey={col.columnKey}
            sortOrder={col.columnKey === this.props.sortColumn ? this.props.sortOrder : ''}
            onSortChange={this.props.sort}
            sortValueGetter={col.sortValueGetter}
            sortComparator={col.sortComparator}
          >
            {col.header}
          </SortHeaderCell> :
          <Cell className="oc-datagrid-cell-header">{col.header}</Cell>
        }
        cell={cellProps => (this.renderCell(col, cellProps))}
        width={this.props.columnWidths.get(col.columnKey, col.width)}
        isResizable={col.isResizable}
        flexGrow={col.flexGrow ? col.flexGrow : 0}
        fixed={col.fixed}
        allowCellsRecycling={col.allowCellsRecycling}
      />
    ));
  }

  render() {
    const gridClassName = classNames({
      'oc-datagrid-container': true,
      'with-actionbar': this.props.inlineEdit && !this.props.disableActionBar,
      'is-busy': this.props.isBusy,
      'is-editing': this.props.isEditing,
      'is-creating': this.props.isCreating,
      'is-filtering': this.props.isFiltering,
    });
    let actionBar = null;
    let actionBarRight = null;
    let actionBarLeft = null;
    if (
      (this.props.actionBar ||
      this.props.inlineEdit ||
      this.props.filtering ||
      this.props.removing) &&
      !this.props.disableActionBar
    ) {
      actionBarRight = (
        <ActionBar position="right">
          <div className="oc-datagrid-actionbar-right">{ this.props.actionBar }</div>
          { (this.props.filtering && this.props.disableDropdown
            && !this.props.disableFilteringControls) &&
            <FilteringControls {...this.props} />
          }
          { this.props.inlineEdit &&
            <InlineEditControls
              columnDefaultValues={this.columnDefaultValues}
              firstInvalidInput={this.refFirstInvalidInput}
              {...this.props}
            />
          }
          { (this.props.dropdownMenuItems ||
             this.props.removing ||
             (this.props.filtering && !this.props.disableDropdown)) &&
             <DropdownControls {...this.props} />
          }
        </ActionBar>
      );
    }
    if (this.props.actionBarLeft || this.props.gridHeader) {
      actionBarLeft = (
        <ActionBar position="left">
          <div className="oc-datagrid-gridheader">{ this.props.gridHeader }</div>
          <div className="oc-datagrid-actionbar-left">{ this.props.actionBarLeft }</div>
        </ActionBar>
      );
    }
    if (actionBarLeft || actionBarRight) {
      actionBar = (
        <div className="oc-datagrid-actionbar-container">
          { actionBarLeft }
          { actionBarRight }
        </div>
      );
    }
    let rowsCount = (this.props.rowsCount || this.props.rowsCount === 0) ?
                    this.props.rowsCount :
                    this.props.data.size;
    if (this.props.isCreating) rowsCount += this.props.createData.size;
    if (this.props.isFiltering) rowsCount += 1;
    let scrollToRow = this.props.scrollToRow || this.state.currentRow;
    if (!scrollToRow && this.props.selectedItems.size > 0) {
      scrollToRow = this.getSelectedItemIndex(this.props.selectedItems.first());
    }
    return (
      <div className={gridClassName} style={this.props.containerStyle}>
        { this.props.isBusy && <Spinner /> }
        { actionBar }
        <ResponsiveFixedDataTable
          id={this.props.id}
          rowsCount={rowsCount}
          headerHeight={this.props.headerHeight}
          rowHeight={this.props.rowHeight}
          onColumnResizeEndCallback={this.onColumnResizeEndCallback}
          isColumnResizing={false}
          onRowClick={(e, rowIndex) => {
            let realRowIndex = rowIndex;
            if (this.props.isFiltering) {
              if (rowIndex === 0) {
                return false;
              }
              realRowIndex -= 1;
            }
            if (this.props.rowSelect && !this.props.isCreating && !this.props.isEditing) {
              if (e.ctrlKey || e.shiftKey) {
                document.getSelection().removeAllRanges();
              }

              // don't trigger selection change if it's checkbox column that is clicked.
              if (e.target.type !== 'checkbox') {
                this.props.itemSelectionChange(
                  this.props.id,
                  realRowIndex,
                  this.props.idKeyPath,
                  this.props.multiSelect && e.ctrlKey,
                  this.props.multiSelect && e.shiftKey,
                );
              }
            }
            if (this.props.onRowClick) {
              this.props.onRowClick(e, realRowIndex, this.props.data.get(realRowIndex));
            }
            return true;
          }}
          scrollToColumn={this.props.scrollToColumn || this.state.currentColumn}
          scrollTop={this.props.scrollTop}
          scrollToRow={scrollToRow}
          onRowDoubleClick={this.props.onRowDoubleClick}
          onRowMouseDown={this.props.onRowMouseDown}
          onRowMouseEnter={this.props.onRowMouseEnter}
          onRowMouseLeave={this.props.onRowMouseLeave}
          onScrollStart={this.props.onScrollStart}
          onScrollEnd={this.props.onScrollEnd}
          rowClassNameGetter={this.getRowClassName}
          rowHeightGetter={this.props.rowHeightGetter}
          onContentHeightChange={this.props.onContentHeightChange}
        >
          {
            (!this.props.allDataSize && !this.props.isBusy && !this.props.isCreating) ?
              <Column
                columnKey="dataEmptyColumn"
                header={<Cell style={{ textAlign: 'center' }}><M id="GridNoItems" /></Cell>}
                width={10}
                isResizable={false}
                flexGrow={1}
              /> :
              this.renderColumns()
          }
        </ResponsiveFixedDataTable>
        { this.props.children }
      </div>
    );
  }

}
