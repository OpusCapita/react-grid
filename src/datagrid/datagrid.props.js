  /* eslint-disable prefer-template, react/no-unused-prop-types, react/forbid-prop-types, max-len */
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

export const propTypes = {
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

export const defaultProps = {
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
};
