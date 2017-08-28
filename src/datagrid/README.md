Back to [Grid](../../README.md)

# Datagrid

### Description

Contains **Datagrid** component that can be used to present data in table. Datagrid supports inline edit, action bar and lot more. Component is highly customizable to meet different use cases.

Underneath it uses Facebook's [fixed-data-table](https://github.com/facebook/fixed-data-table) react component, which is designed to handle large amounts amounts of data without sacraficing performance.

### Dependencies

- classnames, fixed-data-table-2, immutable, lodash, moment, react-bootstrap, react-day-picker, react-immutable-proptypes, react-intl, react-tether, redux, tether

### API

#### Datagrid

| Prop name                | Type             | Default                                  | Description                              |
| ------------------------ | ---------------- | ---------------------------------------- | ---------------------------------------- |
| id                       | string           | required                                 | ID of the datagrid                       |
| columns                  | array            | required                                 | Array of column configuration objects    |
| rowsCount                | number           |                                          | Override rows count otherwise calculated from data |
| idKeyPath                | array of strings |                                          | Key path to unique ID value in the grid data, used in many features like row selecting and inline editing |
| gridHeader               | node             |                                          | Grid header displayed on top of grid     |
| actionBar                | node             |                                          | Action bar element displayed at top right |
| actionBarLeft            | node             |                                          | Action bar element displayed at top left |
| disableDropdown          | boolean          | false                                    | Don't use dropdown menu in the action bar |
| disableFilteringControls | boolean          | false                                    | Don't display the filtering controls (only used if disableDropdown is true) |
| dropdownMenuItems        | array            |                                          | Additional dropdown menu items           |
| inlineEdit               | boolean          | false                                    | Enable inline editing                    |
| inlineAdd                | boolean          | true                                     | Enable inline adding (defaults to true if inlineEdit is enabled) |
| filtering                | boolean          | false                                    | Enable column filtering                  |
| removing                 | boolean          | false                                    | Enable item removing                     |
| rowSelect                | boolean          | false                                    | Enable row selecting                     |
| rowSelectCheckboxColumn  | boolean          | false                                    | Enable additional checkbox column for row selecting |
| multiSelect              | boolean          | false                                    | Enable multi selecting on row selecting  |
| selectComponentOptions   | Immutable.Map    |                                          | Options data for the react-select components |
| disableActions           | boolean          | false                                    | Disable action bar actions, eg. when other grid busy |
| disableActionsMessage    | object           | { messageId: 'GridActionsDisabledOtherGridBusy' } | Message about the reason of disabled action bar actions |
| disableActionBar         | boolean          | false                                    | Disable action bar rendering             |
| disableActionSave        | boolean          | false                                    | Disable Save action button               |
| enableArrowNavigation    | boolean          | false                                    | Enable navigation with arrow keys in editing mode |
| onSave                   | function         |                                          | Callback that is called when save button is clicked |
| onRemove                 | function         |                                          | Callback that is called when delete is clicked |
| onCancel                 | function         |                                          | Callback that is called when cancel is clicked |
| onAddClick               | function         |                                          | Callback that is called when add is clicked |
| onEditClick              | function         |                                          | Callback that is called when edit is clicked |
| tabIndex                 | number           | 1                                        | tabIndex start value, needed when multiple grids on same page |
| headerHeight             | number           | 40                                       | Pixel height of the header row           |
| rowHeight                | number           | 40                                       | Pixel height of rows                     |
| containerStyle           | object           |                                          | Additional styles to be set on the container div |
| scrollToColumn           | number           |                                          | Index of column to scroll to             |
| scrollTop                | number           |                                          | Value of vertical scroll                 |
| scrollToRow              | number           |                                          | Index of row to scroll to                |
| onRowClick               | function         |                                          | Callback that is called when a row is clicked |
| onRowDoubleClick         | function         |                                          | Callback that is called when a row is double clicked |
| onRowMouseDown           | function         |                                          | Callback that is called when a mouse-down event happens on a row |
| onRowMouseEnter          | function         |                                          | Callback that is called when a mouse-enter event happens on a row |
| onRowMouseLeave          | function         |                                          | Callback that is called when a mouse-leave event happens on a row |
| onScrollStart            | function         |                                          | Callback that is called when scrolling starts with current horizontal and vertical scroll values |
| onScrollEnd              | function         |                                          | Callback that is called when scrolling ends or stops with new horizontal and vertical scroll values |
| rowClassNameGetter       | function         |                                          | To get any additional CSS classes that should be added to a row, rowClassNameGetter(index) is called |
| rowHeightGetter          | function         |                                          | If specified, rowHeightGetter(index) is called for each row and the returned value overrides rowHeight for particular row |
| onContentHeightChange    | function         |                                          | Callback that is called when rowHeightGetter returns a different height for a row than the rowHeight prop. This is necessary because initially table estimates heights of some parts of the content |

#### Datagrid - column prop attributes

| Name                       | Type           | Default | Description                              |
| -------------------------- | -------------- | ------- | ---------------------------------------- |
| header                     | node           |         | Column header content                    |
| columnKey                  | string         |         | Column identifier key (required if no valueKeyPath, otherwise autogenerated) |
| valueKeyPath               | string         |         | Column content value key path            |
| valueType                  | string         |         | Value type [text/number/float/boolean/date] |
| componentType              | string         |         | Input component type [text/number/float/select/boolean/date] |
| valueRender                | string         |         | Override value render, rowData as parameter |
| editValueRender            | string         |         | Override value render in editing mode    |
| createValueRender          | string         |         | Override value render in creating mode   |
| filterValueRender          | string         |         | Override value render in filtering mode  |
| cell                       | function       |         | Override cell content renderer, rowIndex as parameter |
| cellEdit                   | function       |         | Override content renderer in editing mode |
| cellCreate                 | function       |         | Override cell content renderer in creating mode |
| cellFilter                 | function       |         | Override cell content renderer in filtering mode |
| renderComponentProps       | object         |         | Additional props for the render component |
| editComponentProps         | object         |         | Additional props for the edit component  |
| createComponentProps       | object         |         | Additional props for the create component |
| filterComponentProps       | object         |         | Additional props for the filter component |
| width                      | number         |         | The pixel width of the column            |
| align                      | number         |         | The horizontal alignment of the column   |
| fixed                      | boolean        |         | Column is fixed                          |
| allowCellsRecycling        | boolean        |         | Recycle cells that are outside viewport horizontally, better horizontal scrolling performance. |
| disableResizing            | boolean        |         | Disable column resizing this column      |
| disableSorting             | boolean        |         | Disable column sorting this column       |
| disableEditing             | boolean        |         | Disable inline editing this column       |
| flexGrow                   | number         |         | The grow factor relative to other columns |
| sortValueGetter            | function       |         | Getter function for the sort data        |
| sortComparator             | function       |         | Comparator function for the sort data    |
| defaultValue               | string, number |         | Default value for the item when creating new item |
| onValueMatchChangeValue    | object         |         | Change other column value if own value matches |
| disableEditingOnValueMatch | object         |         | Disable input element of this column when value at keyPath matches |
| onEditValueChange          | function       |         | Called on edit value change, called with (value, valueKeyPath, rowIndex, dataId) |
| onCreateValueChange        | function       |         | Called on create value change, called with (value, valueKeyPath, rowIndex) |
| onCreateBlur               | function       |         | Called on create cell input blur, called with (value, rowIndex) |
| onEditBlur                 | function       |         | Called on edit cell input blur, called with (value, rowIndex, dataId) |
| selectComponentOptions     | array          |         | Options data fot the react-select component |
#### Datagrid - onValueMatchChangeValue prop attributes
| Name            | Type             | Default | Description                          |
| --------------- | ---------------- | ------- | ------------------------------------ |
| matchValue      | any              |         | When this columns data match to this |
| newValueKeyPath | array of strings |         | Change value at this keyPath         |
| newValue        | any              |         | The new value to be inserted         |

#### Datagrid - disableEditingOnValueMatch prop attributes

| Name              | Type             | Default | Description                        |
| ----------------- | ---------------- | ------- | ---------------------------------- |
| matchValueKeyPath | array of strings |         | Keypath of the value to be matched |
| matchValue        | any              |         | The value to be matched            |

### Code example

```jsx
import React from 'react';
import { Datagrid } from '@opuscapita/react-grid';

export default class DatagridView extends React.Component {
  render() {
    const columns = [
      {
        header: 'Account Name',
        valueKeyPath: ['name'],
        valueType: 'text',
        width: 200,
      },
      {
        header: 'Account number',
        valueKeyPath: ['accountNumber'],
        valueType: 'text',
        width: 200,
      },
    ];
    return (
      <Datagrid
        id="accounts"
        columns={columns}
    );
  }
}
```
