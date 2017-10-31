# Changelog

* In general follow (https://docs.npmjs.com/getting-started/semantic-versioning) versioning.

## <next>
* Add 'cellSelect' prop and 'cellSelectionChange' action to enable cell selection

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
