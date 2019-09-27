# Changelog
* In general follow (https://docs.npmjs.com/getting-started/semantic-versioning) versioning.

## <next>

## 8.4.0

* options min size limit removed from select renderers

## 8.3.6
* Updated `@opuscapita/react-list-items` package

## 8.3.5
* Fixed busy state of paginated grid

## 8.3.4
* Prevent paginated grid rendering after data is requested and response is not yet received

## 8.3.3
* Fixed immutable convertion of filterData: nested array type of property is converted to immutable list

## 8.3.2
* Allow select component translation overrides
* Upgrade packages

## 8.3.1
* Removed multiselect filter option checkbox

## 8.3.0
* Added `virtualized` option for multiselect column

## 8.2.4
* Changed multiselect filtering logic so that filtering is done on blur instead on change

## 8.2.3
* Added multiplier support for currency amount values

## 8.2.2
* Fix dynamic filtering prop change

## 8.2.1
* Added optional tooltip for column header
* Updated @opuscapita/react-select-order-list

## 8.2.0
* Added multiselect cell renderer
* Added `translations` and `isMultiselectTooltipDisabled` props for columns
* Fix: custom renderer rowData undefined when grid is empty, use empty immutable map instead.
* Upgrade packages, including latest `fixed-data-table-2` v0.8.26, fixes scrolling issues

## 8.1.1
* Pagination: enhanced Rows on page and current page state handling

## 8.1.0
* Fixed multiselect & select selectComponentOptions initialization
* Fixed Rows on page rendering
* Fixed sorting busy spinner rendering in case of pagination
* Added edit/create field renderers for currency component type

## 8.0.2
* Count of selectable items added to multiselect label
* Upgraded @opuscapita/react-floating-select version

## 8.0.1
* Fix header cell sort click, check deeper into child tree

## 8.0.0
* Major: Cell value is now rendered based on componentType, not valueType. See (MIGRATEGUIDE.md)
* Minor: componentType select and multiselect values are now rendered automatically from selectOptions, no need for custom valueRender
* Patch: Number and float componentTypes are now rendered with @opuscapita/format-utils instead of Intl formatted number for better compability
* Patch: Number filters broken with negative numbers
* Patch: Header sort click not detected correctly

## 7.7.1
* Upgraded `fixed-data-table-2` to v0.8.23, fixes scrolling issues
* Upgraded all pacakges along with Webpack 4 and Babel 8

## 7.7.0
* Add key navigation support for normal and wrapped select components

## 7.6.1
* added translated string for ColumnSettings 'Search'-placeholder

## 7.6.0
* editValueParser override added to column props

## 7.5.0
* Fix: multiselect filter unselect
* Fix: spelling mistake disableRememberFilteData -> disableRememberFilterData

## 7.4.2
* Support external refs in key navigation
* Column header is truncated if it does not fit in one line
* Added checkboxes for multiselect filter options
* Fix: when filterData is set & applied, filterData is saved also to local storage
* Fix: Headers of unfilterable columns are vertically aligned with headers of filterable column when filtering row is shown
* Fix: Error: The intl string context variable 'n' was not provided to the string '{n} selected

## 7.4.1
* fix to scrollToRow in edit mode

## 7.4.0
* Added multi-select filter
* Added pagination footer and changed requesting/sorting/filtering of paginated data
* Fixed currency&float filtering
* Fix to keyboard navigation

## 7.3.14
* Fixed filtering data in paginated grid

## 7.3.13
* Fixed linting issue

## 7.3.12
* Fixed pagination page being overridden from session store after calling setPaginationPage

## 7.3.11
* Upgrade `@opuscapita/react-datetime` and other components

## 7.3.10
* More specific actionbar button style selector to avoid style bugs

## 7.3.9
* Replace forked version of `fixed-data-table-2` with new release that has CSP fixes

## 7.3.8
* Ugrade `@opuscapita/react-floating-select` and `@opuscapita/react-responsive-navbar`

## 7.3.7
* Ugrade `@opuscapita/react-floating-select`

## 7.3.6
* Ugrade `@opuscapita/react-datetime` to get rid of base64 CSP errors

## 7.3.5
* Remove patch-package patch
* Use forked `fixed-data-table-2` to remove base64 images

## 7.3.4
* Replace base64 shadow with CSS gradient background
* Add missing `fixedRight` column prop

## 7.3.3
* Fixed cell focusing when moving to create/edit mode

## 7.3.2
* fix to visibleColumns function valueKeyPath handling

## 7.3.1
* Fixed datepicker rendering, overlap grid column header

## 7.3.0
* fix to selectComponentOptions handling
* Fixed an issue where filtering would break if search query started with Regex special character
* Select all checkbox in the Grid header

## 7.2.0
* Newly created rows are now selected automatically
* `isCreatableSelect` column prop for creatable select boxes

## 7.1.0
* Disable Edit-button when grid has no data
* Enhanced keyboard navigation
* Added pagination support

## 7.0.1
* Toggle On/Off icon in Grid menu Filtering row

## 7.0.0
* Major refactor of column types
* Upgrade all packages that can be upgraded
* Cleanup demo with better mock data

## 6.3.0
* params added to validateWithRowData validator

## 6.2.2
* Change header background color, add border around the grid
* Add ID to all cells in view mode, add ID in header cell

## 6.2.1
* library rebuild (wrong @opuscapita/react-checkbox version used in previous build)

## 6.2.0
* checkbox valueType and componentType added for boolean values

## 6.1.1
* Force re-render of react component on forceRefresh action

## 6.1.0
* setFocusTo -action added. This action can be used to set the focus to either last editedRow, createdRow or to validation error

## 6.0.0
* Changed `filterMatcher` parameters: it will now receive rowData and a filterValue. This is a breaking change.

## 5.7.2
* Added rowData as first parameter to rowHeightGetter function

## 5.7.1
* Added rowIndex as second parameter to valueRender functions

## 5.7.0
* Fixed issue #60: First day of the week is Su always
* Added className prop

## 5.6.6
* fix to arrow key navigation

## 5.6.5
* ExtendData action modified to allow data prepend to existing grid

## 5.6.4
* RemoveItem action modified to remove error,info and warning cell messages

## 5.6.3
* RemoveItem action changed to use row ID instead of index

## 5.6.2
* Fix context menu callback parameters to more usable form
* Fix right clicking on non-selected item changes selection when context menu is enabled
* Change tooltip position from bottom to top

## 5.6.1
* Allow also function as context menu item disabled prop
* Fix row selection change when clicking on select check box
* Fix row selection change when clicking extra column

## 5.6.0
* Added `contextMenuItems` prop that displays context menu when clicking row with right mouse button
* Added `extraColumn` prop that displays a special column as first column
* Changed row select checkbox to use `@opuscapita/react-select` component

## 5.5.0
* Added `currency` value type

## 5.4.2
* Correction to removeItem action (edited items removed correctly)

## 5.4.1
* Added setAndApplyFilters action creator

## 5.3.1
* merge conflict fix

## 5.3.0
* removeItem action added
* forceRefresh action added

## 5.2.2
* extendData action added

## 5.2.1
* Added option selectComponentTranslations to customize react-selects default placeholder and noResultsTexts. By default uses the Grids translations.
* Updated `@opuscapita/react-datetime` to version 2.2.3.

## 5.1.8
* Upgraded `@opuscapita/react-select-order-list` to the latest version.

## 5.1.7
* Don't set grid to busy state when delete is clicked from dropdown menu.
* Upgraded packages that needs no changes.

## 5.1.6
* Upgraded `@opuscapita/react-select-order-list` and `@opuscapita/react-dropdown` to the latest versions.

## 5.1.5
* Upgraded `@opuscapita/react-select-order-list` to the latest version.

## 5.1.4
* Fixed :before color-corner shown only for grid cells, not for action bar items

## 5.1.3
* Fixed a bug: renamed passed CellTooltip prop messageId->infoMessage

## 5.1.2
* Fixed a bug: when clearSelectedItems action called, it doesn't change saved selected items in a session storage

## 5.1.1
* Add translation for search tooltip
* Change empty value sorting so that it gets sorted too

## 5.1.0
* Package upgrades:
  * @opuscapita/react-dropdown@2.1.0
  * @opuscapita/react-select-order-list@3.1.2
  * fixed-data-table-2@0.8.11
* Fix: Center grid header vertically to container

## 5.0.0
* Refactor translation keys. All keys are now prefixed with "Grid."
* Update HMR to use latest react-hot-loader format

## 4.0.0
* Update to new component build template with separate es, cjs and umd builds.

## 3.4.0
* Use new @opuscapita/react-datetime component as date input
* Update @opuscapita/react-select-order-list
* Update @opuscapita/react-perfect-scrollbar
* Improved date handling, fixes input, sorting and filtering bugs
* Added ids to dropdown menu items
* Remove close cross from Column settings modal

## 3.3.2
* Change id to the classname the main div of `responsive-fixed-data-table` component

## 3.3.1
* Add id to the main div of `responsive-fixed-data-table` component

## 3.3.0
* New `info` cell message type and action for setting multiple messages
* Update column settings component to utilize `react-select-order-list`

## 3.2.0
* Add checkbox to select all columns in column settings

## 3.1.0
* New `isHidden` property for column, which indicates the default visibility.
* Add a possibility to use custom config storage instead of the local storage.
* Add `defaultShowFilteringRow` to `grid` props, allows filtering row to be shown as default

## 3.0.1
* Add a checked column to the end of the selected columns list in column settings

## 3.0.0
* Update to react-15.6.2

## 2.6.1
* Update npm package for react-perfect-scrollbar

## 2.6.0
* Add `columnSettings` prop, that enables column order and visibility settings dialog
* Add `defaultSortColumn` and `defaultSortOrder` to `grid` props that enables column default sorting

## 2.5.0
* Update npm package for react-floating-select
* Enable cell selection in the edit mode

## 2.4.0
* Add `cellSelect` prop and `cellSelectionChange` action to enable cell selection in the view mode
* Fix bug: Scroll to row when there's selected rows
* Fix bug: Column width 0 defaults to 200
* Performance refactor: Remove arrow functions from event handlers in the render

## 2.3.2
* Fix development and production builds

## 2.3.1
* Fix release build warnings

## 2.3.0
* Add 'setEditData' action to import data from external sources
* Move filtering row to header

## 2.2.1
* Fix default align to left if component type is select, even if data type is number

## 2.2.0
* Align numbers and dates to right by default
* Focus to new cell when adding new item
* Don't allow sorting when grid is busy
* Add scrollbar to dropdown menu
* Add minWidth and maxWidth props to columns
* Add default minWidth to prevent column to disappear
* Fix bug: Default values are not applied to new items if grid is empty

## 2.1.3
* Include both development and production builds

## 2.1.2
* Change to development build to avoid warnings
* Fix checkbox warning

## 2.1.1
* Add 500ms delay to loading spinner
* Upgrade packages to get rid of warnings in console

## 2.1.0
* Display asterisk at the header of required column
* Add possibility to remove new rows with trash icon
* Auto-remove new rows that are empty
* Fix translation for 'Show filtering row'

## 2.0.5
* Fix bug: Sometimes filter is applied although the filter string is hidden
* Fixed null/undefined value handling in columns. Added 'isRequired' property to column.

## 2.0.4
* Fix select row checkbox that was not working
* Update npm packages
* Upgrade to enzyme 3.0

## 2.0.3
* Fix Tab and arrow keys navigation of `Datagrid` after mouse down event
* Minify library

## 2.0.2
* Leave selectedItems and config to state when grid is invalidated

## 2.0.1
* Fix Tab and arrow keys navigation of `Datagrid` after dependencies update

## 2.0.0
* Remember sorting, filtering, selected items and column widths
* Refactor action parameters and component props to suit new configuration needs
* Move styles to examples folder

## 1.0.4 - 1.0.10
* Re-organizing dependencies

## 1.0.3
* Add ID attribute to the datagrid html
* Fix datagrid tooltip position

## 1.0.2
* Extracted to own repository from oc-common-ui
