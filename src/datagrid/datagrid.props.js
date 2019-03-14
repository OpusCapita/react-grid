/* eslint-disable react/no-unused-prop-types, react/forbid-prop-types, max-len */
/* eslint-disable no-multi-spaces, object-curly-newline */
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

const { bool, number, string, func, object, node, array, shape, any, oneOfType, arrayOf } = PropTypes;
const { list, map, mapOf } = ImmutablePropTypes;

export const configStorageShape = shape({
  load: func.isRequired,
  save: func.isRequired,
});

// Grid object holds data that also actions uses
export const gridShape = shape({
  id: string.isRequired,
  idKeyPath: arrayOf(string).isRequired, // keyPath to id data
  defaultShowFilteringRow: bool,         // is filtering row shown as default
  defaultSortColumn: string,             // columnKey of column that is sorted by default
  defaultSortOrder: string,              // default sort order [asc/desc]
  disableRememberColumnWidths: bool,
  disableRememberSortData: bool,
  disableRememberIsFiltering: bool,
  disableRememberFilteData: bool,
  disableRememberSelectedItems: bool,
  language: string,
  region: string,
  dateFormat: string,
  thousandSeparator: string,
  decimalSeparator: string,
  configStorage: configStorageShape,
  pagination: bool,
});

export const columnShape = shape({
  header: node,
  columnKey: string,              // Use valueKeyPath if possible, this is calculated from there
  valueKeyPath: array,            // key path for the cell data value, required if no columnKey is given
  valueType: string,              // data value type [text/number/float/boolean/date]
  valueOptions: shape({           // options for the value type
    currencyKeyPath: array,       // key path to currency code (only for currency data type)
    decimals: number,             // number of decimals override
    thousandSeparator: string,    // thousand separator override
    decimalSeparator: string,     // decimal separator override
  }),
  componentType: string,          // edit component type [text/number/float/select/multiselect/boolean/date]
  valueRender: func,              // custom renderer for the value, data as parameter
  editValueRender: func,          // custom renderer for the edit value, data as parameter
  createValueRender: func,        // custom renderer for the create value, data as parameter
  filterValueRender: func,        // custom renderer for the filter value, data as parameter
  cell: func,                     // override cell renderer, rowIndex as parameter
  cellEdit: func,                 // override cellEdit renderer, rowIndex as parameter
  cellCreate: func,               // override cellCreate renderer, rowIndex as parameter
  cellFilter: func,               // override cellFilter renderer, rowIndex as parameter
  renderComponentProps: object,   // additional props to the render component
  editComponentProps: object,     // additional props to the edit component
  createComponentProps: object,   // additional props to the create component
  filterComponentProps: object,   // additional props to the filter component
  width: number,
  minWidth: number,
  maxWidth: number,
  align: string,                  // vertical cell alignment, defaults to 'left'
  fixed: bool,                    // is column fixed
  fixedRight: bool,               // is column fixed to right
  allowCellsRecycling: bool,      // allow cells to be recycled for better horizontal scrolling perf
  disableResizing: bool,          // disable column resizing
  disableEditing: bool,           // disable input component (make read-only) when editing/creating
  disableSorting: bool,           // disable filtering on this column
  disableEditingOnValueMatch: shape({ // disable editing/creating input when other columns value match
    matchValueKeyPath: array,
    matchValue: any,
  }),
  onValueMatchChangeValue: shape({ // Change other column value when data matches
    matchValue: any,
    newValueKeyPath: array,
    newValue: any,
  }),
  flexGrow: number,
  valueEmptyChecker: func,        // override function that checks if value is considered as empty
  sortValueGetter: func,          // override sort value getter, defaults to getIn(valueKeyPath)
  sortComparator: func,           // override sort comparator function, default sorts by valueType
  filterMatcher: func,            // override filter matcher function, that defined when filter matches data
  defaultValue: any,              // default value for the column when creating new item
  isRequired: bool,               // is column value required
  isHidden: bool,                 // is column hidden by default
  onEditValueChange: func,        // callback with (value, valueKeyPath, rowIndex, dataId)
  onCreateValueChange: func,      // callbac with (value, valueKeyPath, rowIndex)
  onCreateBlur: func,             // callback with (value, rowIndex)
  onEditBlur: func,               // callback with (value, rowIndex, dataId)
  selectComponentOptions: arrayOf(shape({
    value: oneOfType([number, string, bool]).isRequired,
    label: oneOfType([number, string]).isRequired,
  })),
  selectComponentTranslations: shape({ // customize select components placeholder, multi-select label and noResults texts.
    placeholder: string,
    noResultsText: string,
    selected: string,
  }),
  isCreatableSelect: bool,
});

export const propTypes = {
  children: node,
  // App props
  intl: object.isRequired,
  // Action props
  addNewItem: func.isRequired,
  removeNewItem: func.isRequired,
  create: func.isRequired,
  edit: func.isRequired,
  remove: func.isRequired,
  save: func.isRequired,
  cancel: func.isRequired,
  sortChange: func.isRequired,
  resizeColumn: func.isRequired,
  invalidate: func.isRequired,
  cellSelectionChange: func.isRequired,
  itemSelectionChange: func.isRequired,
  toggleFiltering: func.isRequired,
  editCellValueChange: func.isRequired,
  createCellValueChange: func.isRequired,
  filterCellValueChange: func.isRequired,
  editCellValueValidate: func.isRequired,
  createCellValueValidate: func.isRequired,
  validateEditedRows: func.isRequired,
  validateCreatedRows: func.isRequired,
  // State props
  isBusy: bool.isRequired,
  isEditing: bool.isRequired,
  isCreating: bool.isRequired,
  isFiltering: bool.isRequired,
  sortColumn: oneOfType([
    string,
    number,
  ]),
  sortOrder: string,
  visibleColumns: list.isRequired,
  columnWidths: map.isRequired,
  selectedCell: map.isRequired,
  selectedItems: list.isRequired,
  data: list.isRequired,
  editData: map.isRequired,
  createData: list.isRequired,
  filterData: map.isRequired,
  cellMessages: map.isRequired,
  createCellMessages: map.isRequired,
  language: string.isRequired,
  region: string.isRequired,
  thousandSeparator: string.isRequired,
  decimalSeparator: string.isRequired,
  allDataSize: number.isRequired,
  // Required component properties
  grid: gridShape.isRequired,
  columns: arrayOf(columnShape.isRequired).isRequired,
  // Optional component properties
  rowsCount: number,
  gridHeader: node,
  actionBar: node,
  actionBarLeft: node,
  cellSelect: bool,
  disableDropdown: bool,              // Don't use dropdown menu in the action bar
  disableFilteringControls: bool,     // Don't display the filtering controls (only valid if disableDropdown is true)
  dropdownMenuItems: arrayOf(shape({
    id: string,
    title: node,
    icon: node,
    onClick: func,
    disabled: oneOfType([bool, func]),
  })),
  inlineEdit: bool,
  inlineAdd: bool,
  filtering: bool,
  removing: bool,
  columnSettings: bool,
  rowSelect: bool,
  rowSelectCheckboxColumn: bool,
  multiSelect: bool,
  selectComponentOptions: mapOf(arrayOf(shape({  // Options data for the react-select components
    value: oneOfType([number, string, bool]).isRequired,
    label: oneOfType([number, string]).isRequired,
  }))),
  selectComponentTranslations: shape({  // Options for react-select text translations
    placeholder: string.isRequired,
    noResultsText: string.isRequired,
    selected: string.isRequired,
  }),
  disableActions: bool,               // Disable actions in the action bar
  disableActionsMessage: shape({
    messageId: string,
    messageValues: shape({}),
  }),
  disableActionBar: bool,
  disableActionSave: bool,
  enableArrowNavigation: bool,
  onSave: func,
  onRemove: func,
  onCancel: func,
  onAddClick: func,
  onEditClick: func,
  onLastCellTabPress: func,
  tabIndex: number,                   // tabIndex value for inputs in cells
  extraColumn: shape({                // Extra fixed column that can't be re-ordered or hidden
    width: string,
    valueRender: func,
    cellEdit: func,
    cellCreate: func,
    cellFilter: func,
    isResizable: bool,
  }),
  contextMenuItems: arrayOf(shape({   // Context menu items to display when row is right-clicked
    value: node,
    onClick: func,
    title: string,
    header: bool,
    disabled: oneOfType([bool, func]),
    divider: bool,
  })),
  // Fixed data table built-in features
  headerHeight: number,
  filterRowHeight: number,
  rowHeight: number,
  containerStyle: object,
  scrollToColumn: number,
  scrollTop: number,
  scrollToRow: number,
  scrollInEditMode: bool,
  showSelectAllCheckbox: bool,
  onRowClick: func,
  onRowDoubleClick: func,
  onRowMouseDown: func,
  onRowMouseEnter: func,
  onRowMouseLeave: func,
  onScrollStart: func,
  onScrollEnd: func,
  rowClassNameGetter: func,
  rowHeightGetter: func,
  onContentHeightChange: func,
  className: string,
  focusType: map.isRequired,
  pagination: shape({
    pageSize: number.isRequired,
    totalSize: number.isRequired,
    getData: func.isRequired,
  }),
};

/* eslint-enable max-len, prefer-template, react/no-unused-prop-types, react/forbid-prop-types */

export const defaultProps = {
  cellSelect: false,
  columnSettings: false,
  children: undefined,
  containerStyle: {},
  disableActionSave: false,
  enableArrowNavigation: false,
  headerHeight: 40,
  filterRowHeight: 40,
  rowHeight: 40,
  onSave: () => {},
  onRemove: () => {},
  onCancel: () => {},
  showSelectAllCheckbox: true,
  tabIndex: 1,
  disableFilteringControls: false,
  className: '',
  scrollInEditMode: false,
};
