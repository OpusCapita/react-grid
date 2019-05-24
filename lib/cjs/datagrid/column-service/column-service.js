"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _immutable = require("immutable");

var _datagrid = _interopRequireDefault(require("../datagrid.utils"));

var _columnTypes = require("./column-types/column-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var _default = {
  baseColumn: function baseColumn(col) {
    var baseCol = {
      header: col.header,
      columnKey: _datagrid["default"].getColumnKey(col),
      width: col.width || col.width === 0 ? col.width : 200,
      minWidth: col.minWidth || col.minWidth === 0 ? col.minWidth : 40,
      maxWidth: col.maxWidth,
      isResizable: !col.disableResizing,
      fixed: !!col.fixed,
      fixedRight: !!col.fixedRight,
      allowCellsRecycling: !!col.allowCellsRecycling,
      disableSorting: !!col.disableSorting,
      isRequired: !!col.isRequired,
      componentType: col.componentType,
      style: _datagrid["default"].getCellStyleByCol(col)
    }; // valueKeyPath

    if (col.valueKeyPath) baseCol.valueKeyPath = col.valueKeyPath; // flexGrow

    if (col.flexGrow) baseCol.flexGrow = col.flexGrow; // valueType

    if (col.valueType) baseCol.valueType = col.valueType; // sortComparator

    if (col.sortComparator) baseCol.sortComparator = col.sortComparator; // sortValueGetter

    if (col.sortValueGetter) baseCol.sortValueGetter = col.sortValueGetter;
    return baseCol;
  },
  columnCell: function columnCell(baseColumn, props, col, baseValueRender) {
    var column = baseColumn;

    if (col.cell) {
      column.cell = col.cell;
    } else if (col.valueRender) {
      column.cell = function (rowIndex) {
        return col.valueRender(props.data.get(rowIndex), rowIndex);
      };
    } else {
      var _props$selectComponen = props.selectComponentOptions,
          selectComponentOptions = _props$selectComponen === void 0 ? (0, _immutable.Map)() : _props$selectComponen;

      switch (col.componentType) {
        case 'number': // fall through

        case 'float':
          {
            column.cell = function (rowIndex) {
              return _columnTypes.PrimitiveType.numberValRender(col, rowIndex, props.thousandSeparator, props.decimalSeparator, baseValueRender);
            };

            break;
          }

        case 'boolean':
          {
            column.cell = function (rowIndex) {
              return _columnTypes.BooleanType.valRender(col, rowIndex, baseValueRender);
            };

            break;
          }

        case 'checkbox':
          {
            column.cell = function (rowIndex) {
              return _columnTypes.CheckboxType.valRender(rowIndex, baseValueRender);
            };

            break;
          }

        case 'multiselect':
        case 'select':
          {
            var selectOptions = col.selectComponentOptions || selectComponentOptions.get(column.columnKey);

            column.cell = function (rowIndex) {
              return _columnTypes.SelectType.valRender(rowIndex, selectOptions, baseValueRender);
            };

            break;
          }

        case 'date':
          {
            column.cell = function (rowIndex) {
              return _columnTypes.DateType.valRender(rowIndex, props.dateFormat, baseValueRender);
            };

            break;
          }
        // change valRenders to just take props --> saves some 'energy'

        case 'currency':
          {
            column.cell = function (rowIndex) {
              return _columnTypes.CurrencyType.valRender(col, props.data, rowIndex, props.thousandSeparator, props.decimalSeparator, baseValueRender);
            };

            break;
          }

        default:
          {
            column.cell = function (rowIndex) {
              return baseValueRender(rowIndex);
            };

            break;
          }
      }
    } // cellEdit render


    if (col.cellEdit) {
      column.cellEdit = col.cellEdit;
    } else if (col.editValueRender) {
      column.cellEdit = function (rowIndex, setRef, onKeyDown) {
        return col.editValueRender(props.data.get(rowIndex), rowIndex, setRef, onKeyDown);
      };
    } // cellCreate render


    if (col.cellCreate) {
      column.cellCreate = col.cellCreate;
    } else if (col.createValueRender) {
      column.cellCreate = function (rowIndex, setRef, onKeyDown) {
        return col.createValueRender(props.data.get(rowIndex), rowIndex, setRef, onKeyDown);
      };
    } // cellFilter render


    if (col.cellFilter) {
      column.cellFilter = col.cellFilter;
    } else if (col.filterValueRender) {
      column.cellFilter = function (rowIndex) {
        return col.filterValueRender(props.data.get(rowIndex), rowIndex);
      };
    }

    return column;
  },
  columnComponentType: function columnComponentType(baseColumn, tabIndex, props, col, functions, getDisabledState) {
    if (!col.componentType) return baseColumn;
    var column = baseColumn;
    var editValueParser = col.editValueParser ? col.editValueParser : function (val) {
      return val;
    }; // Grid internal functions separated

    var editFunctions = _extends({}, functions.edit);

    var createFunctions = _extends({}, functions.create);

    var filterFunctions = _extends({}, functions.filter);

    var _props$selectComponen2 = props.selectComponentOptions,
        selectComponentOptions = _props$selectComponen2 === void 0 ? (0, _immutable.Map)() : _props$selectComponen2;
    var primitiveValParser = !col.editValueParser && col.componentType === 'float' ? function (val) {
      return val.replace(new RegExp("[^\\d" + props.decimalSeparator + "+-]", 'g'), '');
    } : editValueParser;

    switch (col.componentType) {
      case 'float':
      case 'number':
      case 'text':
        {
          var formControlType = col.componentType === 'float' || col.componentType === 'number' ? 'text' : col.componentType; // always use col.editValueParser override if available

          if (props.inlineEdit && !column.cellEdit) {
            column.cellEdit = function (rowIndex) {
              return _columnTypes.PrimitiveType.cellEdit.apply(_columnTypes.PrimitiveType, [col, column, rowIndex, tabIndex, props.grid.id, primitiveValParser, formControlType].concat(editFunctions, [getDisabledState]));
            };
          }

          if (props.inlineEdit && !column.cellCreate) {
            column.cellCreate = function (rowIndex) {
              return _columnTypes.PrimitiveType.cellCreate.apply(_columnTypes.PrimitiveType, [col, column, rowIndex, tabIndex, props.grid.id, primitiveValParser, formControlType].concat(createFunctions, [getDisabledState]));
            };
          }

          if (props.filtering && !column.cellFilter) {
            column.cellFilter = function () {
              return _columnTypes.PrimitiveType.cellFilter.apply(_columnTypes.PrimitiveType, [col, column, tabIndex, props.grid.id, primitiveValParser, formControlType].concat(filterFunctions));
            };
          }

          break;
        }

      case 'checkbox':
        {
          if (props.inlineEdit && !column.cellEdit) {
            column.cellEdit = function (rowIndex) {
              return _columnTypes.CheckboxType.cellEdit.apply(_columnTypes.CheckboxType, [col, column, rowIndex, tabIndex, props.grid.id].concat(editFunctions));
            };
          }

          if (props.inlineEdit && !column.cellCreate) {
            column.cellCreate = function (rowIndex) {
              return _columnTypes.CheckboxType.cellCreate.apply(_columnTypes.CheckboxType, [col, column, rowIndex, tabIndex, props.grid.id].concat(createFunctions));
            };
          }

          if (props.filtering && !column.cellFilter) {
            column.cellFilter = function () {
              return _columnTypes.CheckboxType.cellFilter.apply(_columnTypes.CheckboxType, [col, column, tabIndex, props.grid.id, props.intl].concat(filterFunctions));
            };
          }

          break;
        }

      case 'multiselect':
        {
          var selectOptions = col.selectComponentOptions || selectComponentOptions.get(column.columnKey);
          var selectTranslations = col.selectComponentTranslations || {
            placeholder: props.intl.formatMessage({
              id: 'Grid.FloatingSelect.Select'
            }),
            noResultsText: props.intl.formatMessage({
              id: 'Grid.FloatingSelect.NoResults'
            }),
            // Variable 'n' must be provided in this phase in order to avoid
            // Error: The intl string context variable 'n' was not provided to the string {n}
            // selected
            // Variable n is replaced later, when its value is available
            selected: props.intl.formatMessage({
              id: 'Grid.FloatingSelect.Selected'
            }, {
              n: '<n>'
            })
          };

          if (props.inlineEdit && !column.cellEdit) {
            column.cellEdit = function (rowIndex) {
              return _columnTypes.SelectType.cellEdit.apply(_columnTypes.SelectType, [col, column, rowIndex, tabIndex, props.grid.id, selectOptions, selectTranslations, editValueParser].concat(editFunctions, [getDisabledState]));
            };
          }

          if (props.inlineEdit && !column.cellCreate) {
            column.cellCreate = function (rowIndex) {
              return _columnTypes.SelectType.cellCreate.apply(_columnTypes.SelectType, [col, column, rowIndex, tabIndex, props.grid.id, selectOptions, selectTranslations, editValueParser].concat(createFunctions, [getDisabledState]));
            };
          }

          if (props.filtering && !column.cellFilter) {
            column.cellFilter = function () {
              return _columnTypes.MultiSelectType.cellFilter.apply(_columnTypes.MultiSelectType, [col, column, tabIndex, props.grid.id, selectOptions, selectTranslations, editValueParser].concat(filterFunctions));
            };
          }

          break;
        }

      case 'select':
        {
          var _selectOptions = col.selectComponentOptions || selectComponentOptions.get(column.columnKey);

          var _selectTranslations = col.selectComponentTranslations || {
            placeholder: props.intl.formatMessage({
              id: 'Grid.FloatingSelect.Select'
            }),
            noResultsText: props.intl.formatMessage({
              id: 'Grid.FloatingSelect.NoResults'
            })
          };

          if (props.inlineEdit && !column.cellEdit) {
            column.cellEdit = function (rowIndex) {
              return _columnTypes.SelectType.cellEdit.apply(_columnTypes.SelectType, [col, column, rowIndex, tabIndex, props.grid.id, _selectOptions, _selectTranslations, editValueParser].concat(editFunctions, [getDisabledState]));
            };
          }

          if (props.inlineEdit && !column.cellCreate) {
            column.cellCreate = function (rowIndex) {
              return _columnTypes.SelectType.cellCreate.apply(_columnTypes.SelectType, [col, column, rowIndex, tabIndex, props.grid.id, _selectOptions, _selectTranslations, editValueParser].concat(createFunctions, [getDisabledState]));
            };
          }

          if (props.filtering && !column.cellFilter) {
            column.cellFilter = function () {
              return _columnTypes.SelectType.cellFilter.apply(_columnTypes.SelectType, [col, column, tabIndex, props.grid.id, _selectOptions, _selectTranslations, editValueParser].concat(filterFunctions));
            };
          }

          break;
        }

      case 'boolean':
        {
          var _selectOptions2 = [{
            value: true,
            label: props.intl.formatMessage({
              id: 'Grid.Yes'
            })
          }, {
            value: false,
            label: props.intl.formatMessage({
              id: 'Grid.No'
            })
          }];

          var _selectTranslations2 = col.selectComponentTranslations || {
            placeholder: props.intl.formatMessage({
              id: 'Grid.FloatingSelect.Select'
            }),
            noResultsText: props.intl.formatMessage({
              id: 'Grid.FloatingSelect.NoResults'
            })
          };

          if (props.inlineEdit && !column.cellEdit) {
            column.cellEdit = function (rowIndex) {
              return _columnTypes.BooleanType.cellEdit.apply(_columnTypes.BooleanType, [col, column, rowIndex, tabIndex, props.grid.id, _selectOptions2, _selectTranslations2, editValueParser].concat(editFunctions, [getDisabledState]));
            };
          }

          if (props.inlineEdit && !column.cellCreate) {
            column.cellCreate = function (rowIndex) {
              return _columnTypes.BooleanType.cellCreate.apply(_columnTypes.BooleanType, [col, column, rowIndex, tabIndex, props.grid.id, _selectOptions2, _selectTranslations2, editValueParser].concat(createFunctions, [getDisabledState]));
            };
          }

          if (props.filtering && !column.cellFilter) {
            column.cellFilter = function () {
              return _columnTypes.BooleanType.cellFilter.apply(_columnTypes.BooleanType, [col, column, tabIndex, props.grid.id, _selectOptions2, _selectTranslations2, editValueParser].concat(filterFunctions));
            };
          }

          break;
        }

      case 'date':
        {
          if (props.inlineEdit && !column.cellEdit) {
            column.cellEdit = function (rowIndex) {
              return _columnTypes.DateType.cellEdit.apply(_columnTypes.DateType, [col, column, rowIndex, tabIndex, props.grid.id, props.region, props.dateFormat, editValueParser].concat(editFunctions, [getDisabledState]));
            };
          }

          if (props.inlineEdit && !column.cellCreate) {
            column.cellCreate = function (rowIndex) {
              return _columnTypes.DateType.cellCreate.apply(_columnTypes.DateType, [col, column, rowIndex, tabIndex, props.grid.id, props.region, props.dateFormat, editValueParser].concat(createFunctions, [getDisabledState]));
            };
          }

          if (props.filtering && !column.cellFilter) {
            column.cellFilter = function () {
              return _columnTypes.DateType.cellFilter.apply(_columnTypes.DateType, [col, column, tabIndex, props.grid.id, props.region, props.dateFormat, editValueParser].concat(filterFunctions));
            };
          }

          break;
        }

      case 'currency':
        {
          if (props.inlineEdit && !column.cellCreate) {
            column.cellEdit = function (rowIndex) {
              return _columnTypes.CurrencyType.cellEdit.apply(_columnTypes.CurrencyType, [col, column, tabIndex, rowIndex, props.grid.id].concat(editFunctions, [editValueParser, getDisabledState, props.data, props.thousandSeparator, props.decimalSeparator]));
            };
          }

          if (props.inlineEdit && !column.cellCreate) {
            column.cellCreate = function (rowIndex) {
              return _columnTypes.CurrencyType.cellCreate.apply(_columnTypes.CurrencyType, [col, column, tabIndex, rowIndex, props.grid.id].concat(createFunctions, [editValueParser, getDisabledState, props.data, props.thousandSeparator, props.decimalSeparator]));
            };
          }

          if (props.filtering && !column.cellFilter) {
            column.cellFilter = function () {
              return _columnTypes.PrimitiveType.cellFilter.apply(_columnTypes.PrimitiveType, [col, column, tabIndex, props.grid.id, primitiveValParser, 'text'].concat(filterFunctions));
            };
          }

          break;
        }

      default:
    }

    return column;
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2VydmljZS9jb2x1bW4tc2VydmljZS5qc3giXSwibmFtZXMiOlsiYmFzZUNvbHVtbiIsImNvbCIsImJhc2VDb2wiLCJoZWFkZXIiLCJjb2x1bW5LZXkiLCJVdGlscyIsImdldENvbHVtbktleSIsIndpZHRoIiwibWluV2lkdGgiLCJtYXhXaWR0aCIsImlzUmVzaXphYmxlIiwiZGlzYWJsZVJlc2l6aW5nIiwiZml4ZWQiLCJmaXhlZFJpZ2h0IiwiYWxsb3dDZWxsc1JlY3ljbGluZyIsImRpc2FibGVTb3J0aW5nIiwiaXNSZXF1aXJlZCIsImNvbXBvbmVudFR5cGUiLCJzdHlsZSIsImdldENlbGxTdHlsZUJ5Q29sIiwidmFsdWVLZXlQYXRoIiwiZmxleEdyb3ciLCJ2YWx1ZVR5cGUiLCJzb3J0Q29tcGFyYXRvciIsInNvcnRWYWx1ZUdldHRlciIsImNvbHVtbkNlbGwiLCJwcm9wcyIsImJhc2VWYWx1ZVJlbmRlciIsImNvbHVtbiIsImNlbGwiLCJ2YWx1ZVJlbmRlciIsInJvd0luZGV4IiwiZGF0YSIsImdldCIsInNlbGVjdENvbXBvbmVudE9wdGlvbnMiLCJQcmltaXRpdmVUeXBlIiwibnVtYmVyVmFsUmVuZGVyIiwidGhvdXNhbmRTZXBhcmF0b3IiLCJkZWNpbWFsU2VwYXJhdG9yIiwiQm9vbGVhblR5cGUiLCJ2YWxSZW5kZXIiLCJDaGVja2JveFR5cGUiLCJzZWxlY3RPcHRpb25zIiwiU2VsZWN0VHlwZSIsIkRhdGVUeXBlIiwiZGF0ZUZvcm1hdCIsIkN1cnJlbmN5VHlwZSIsImNlbGxFZGl0IiwiZWRpdFZhbHVlUmVuZGVyIiwic2V0UmVmIiwib25LZXlEb3duIiwiY2VsbENyZWF0ZSIsImNyZWF0ZVZhbHVlUmVuZGVyIiwiY2VsbEZpbHRlciIsImZpbHRlclZhbHVlUmVuZGVyIiwiY29sdW1uQ29tcG9uZW50VHlwZSIsInRhYkluZGV4IiwiZnVuY3Rpb25zIiwiZ2V0RGlzYWJsZWRTdGF0ZSIsImVkaXRWYWx1ZVBhcnNlciIsInZhbCIsImVkaXRGdW5jdGlvbnMiLCJlZGl0IiwiY3JlYXRlRnVuY3Rpb25zIiwiY3JlYXRlIiwiZmlsdGVyRnVuY3Rpb25zIiwiZmlsdGVyIiwicHJpbWl0aXZlVmFsUGFyc2VyIiwicmVwbGFjZSIsIlJlZ0V4cCIsImZvcm1Db250cm9sVHlwZSIsImlubGluZUVkaXQiLCJncmlkIiwiaWQiLCJmaWx0ZXJpbmciLCJpbnRsIiwic2VsZWN0VHJhbnNsYXRpb25zIiwic2VsZWN0Q29tcG9uZW50VHJhbnNsYXRpb25zIiwicGxhY2Vob2xkZXIiLCJmb3JtYXRNZXNzYWdlIiwibm9SZXN1bHRzVGV4dCIsInNlbGVjdGVkIiwibiIsIk11bHRpU2VsZWN0VHlwZSIsInZhbHVlIiwibGFiZWwiLCJyZWdpb24iXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7OztlQVVlO0FBQ2JBLEVBQUFBLFVBRGEsc0JBQ0ZDLEdBREUsRUFDRztBQUNkLFFBQU1DLE9BQU8sR0FBRztBQUNkQyxNQUFBQSxNQUFNLEVBQUVGLEdBQUcsQ0FBQ0UsTUFERTtBQUVkQyxNQUFBQSxTQUFTLEVBQUVDLHFCQUFNQyxZQUFOLENBQW1CTCxHQUFuQixDQUZHO0FBR2RNLE1BQUFBLEtBQUssRUFBRU4sR0FBRyxDQUFDTSxLQUFKLElBQWFOLEdBQUcsQ0FBQ00sS0FBSixLQUFjLENBQTNCLEdBQStCTixHQUFHLENBQUNNLEtBQW5DLEdBQTJDLEdBSHBDO0FBSWRDLE1BQUFBLFFBQVEsRUFBRVAsR0FBRyxDQUFDTyxRQUFKLElBQWdCUCxHQUFHLENBQUNPLFFBQUosS0FBaUIsQ0FBakMsR0FBcUNQLEdBQUcsQ0FBQ08sUUFBekMsR0FBb0QsRUFKaEQ7QUFLZEMsTUFBQUEsUUFBUSxFQUFFUixHQUFHLENBQUNRLFFBTEE7QUFNZEMsTUFBQUEsV0FBVyxFQUFFLENBQUNULEdBQUcsQ0FBQ1UsZUFOSjtBQU9kQyxNQUFBQSxLQUFLLEVBQUUsQ0FBQyxDQUFDWCxHQUFHLENBQUNXLEtBUEM7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LEVBQTJDO0FBQ3pDekIsWUFBQUEsTUFBTSxDQUFDeUIsVUFBUCxHQUFvQjtBQUFBLHFCQUFNbEIsMkJBQWNrQixVQUFkLG9DQUN4QnBELEdBRHdCLEVBRXhCMkIsTUFGd0IsRUFHeEI0QixRQUh3QixFQUl4QjlCLEtBQUssQ0FBQzhDLElBQU4sQ0FBV0MsRUFKYSxFQUt4Qk4sa0JBTHdCLEVBTXhCLE1BTndCLFNBT3JCRixlQVBxQixFQUFOO0FBQUEsYUFBcEI7QUFTRDs7QUFDRDtBQUNEOztBQUNEO0FBNVVGOztBQThVQSxXQUFPckMsTUFBUDtBQUNEO0FBN2RZLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYXAgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4uL2RhdGFncmlkLnV0aWxzJztcbmltcG9ydCB7XG4gIERhdGVUeXBlLFxuICBTZWxlY3RUeXBlLFxuICBCb29sZWFuVHlwZSxcbiAgQ2hlY2tib3hUeXBlLFxuICBDdXJyZW5jeVR5cGUsXG4gIFByaW1pdGl2ZVR5cGUsXG4gIE11bHRpU2VsZWN0VHlwZSxcbn0gZnJvbSAnLi9jb2x1bW4tdHlwZXMvY29sdW1uLXR5cGVzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBiYXNlQ29sdW1uKGNvbCkge1xuICAgIGNvbnN0IGJhc2VDb2wgPSB7XG4gICAgICBoZWFkZXI6IGNvbC5oZWFkZXIsXG4gICAgICBjb2x1bW5LZXk6IFV0aWxzLmdldENvbHVtbktleShjb2wpLFxuICAgICAgd2lkdGg6IGNvbC53aWR0aCB8fCBjb2wud2lkdGggPT09IDAgPyBjb2wud2lkdGggOiAyMDAsXG4gICAgICBtaW5XaWR0aDogY29sLm1pbldpZHRoIHx8IGNvbC5taW5XaWR0aCA9PT0gMCA/IGNvbC5taW5XaWR0aCA6IDQwLFxuICAgICAgbWF4V2lkdGg6IGNvbC5tYXhXaWR0aCxcbiAgICAgIGlzUmVzaXphYmxlOiAhY29sLmRpc2FibGVSZXNpemluZyxcbiAgICAgIGZpeGVkOiAhIWNvbC5maXhlZCxcbiAgICAgIGZpeGVkUmlnaHQ6ICEhY29sLmZpeGVkUmlnaHQsXG4gICAgICBhbGxvd0NlbGxzUmVjeWNsaW5nOiAhIWNvbC5hbGxvd0NlbGxzUmVjeWNsaW5nLFxuICAgICAgZGlzYWJsZVNvcnRpbmc6ICEhY29sLmRpc2FibGVTb3J0aW5nLFxuICAgICAgaXNSZXF1aXJlZDogISFjb2wuaXNSZXF1aXJlZCxcbiAgICAgIGNvbXBvbmVudFR5cGU6IGNvbC5jb21wb25lbnRUeXBlLFxuICAgICAgc3R5bGU6IFV0aWxzLmdldENlbGxTdHlsZUJ5Q29sKGNvbCksXG4gICAgfTtcbiAgICAvLyB2YWx1ZUtleVBhdGhcbiAgICBpZiAoY29sLnZhbHVlS2V5UGF0aCkgYmFzZUNvbC52YWx1ZUtleVBhdGggPSBjb2wudmFsdWVLZXlQYXRoO1xuICAgIC8vIGZsZXhHcm93XG4gICAgaWYgKGNvbC5mbGV4R3JvdykgYmFzZUNvbC5mbGV4R3JvdyA9IGNvbC5mbGV4R3JvdztcbiAgICAvLyB2YWx1ZVR5cGVcbiAgICBpZiAoY29sLnZhbHVlVHlwZSkgYmFzZUNvbC52YWx1ZVR5cGUgPSBjb2wudmFsdWVUeXBlO1xuICAgIC8vIHNvcnRDb21wYXJhdG9yXG4gICAgaWYgKGNvbC5zb3J0Q29tcGFyYXRvcikgYmFzZUNvbC5zb3J0Q29tcGFyYXRvciA9IGNvbC5zb3J0Q29tcGFyYXRvcjtcbiAgICAvLyBzb3J0VmFsdWVHZXR0ZXJcbiAgICBpZiAoY29sLnNvcnRWYWx1ZUdldHRlcikgYmFzZUNvbC5zb3J0VmFsdWVHZXR0ZXIgPSBjb2wuc29ydFZhbHVlR2V0dGVyO1xuICAgIHJldHVybiBiYXNlQ29sO1xuICB9LFxuXG4gIGNvbHVtbkNlbGwoYmFzZUNvbHVtbiwgcHJvcHMsIGNvbCwgYmFzZVZhbHVlUmVuZGVyKSB7XG4gICAgY29uc3QgY29sdW1uID0gYmFzZUNvbHVtbjtcbiAgICBpZiAoY29sLmNlbGwpIHtcbiAgICAgIGNvbHVtbi5jZWxsID0gY29sLmNlbGw7XG4gICAgfSBlbHNlIGlmIChjb2wudmFsdWVSZW5kZXIpIHtcbiAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gY29sLnZhbHVlUmVuZGVyKHByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSwgcm93SW5kZXgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB7IHNlbGVjdENvbXBvbmVudE9wdGlvbnMgPSBNYXAoKSB9ID0gcHJvcHM7XG4gICAgICBzd2l0Y2ggKGNvbC5jb21wb25lbnRUeXBlKSB7XG4gICAgICAgIGNhc2UgJ251bWJlcic6IC8vIGZhbGwgdGhyb3VnaFxuICAgICAgICBjYXNlICdmbG9hdCc6IHtcbiAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IFByaW1pdGl2ZVR5cGUubnVtYmVyVmFsUmVuZGVyKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICBwcm9wcy50aG91c2FuZFNlcGFyYXRvcixcbiAgICAgICAgICAgIHByb3BzLmRlY2ltYWxTZXBhcmF0b3IsXG4gICAgICAgICAgICBiYXNlVmFsdWVSZW5kZXIsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgJ2Jvb2xlYW4nOiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBCb29sZWFuVHlwZS52YWxSZW5kZXIoY29sLCByb3dJbmRleCwgYmFzZVZhbHVlUmVuZGVyKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgJ2NoZWNrYm94Jzoge1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gQ2hlY2tib3hUeXBlLnZhbFJlbmRlcihyb3dJbmRleCwgYmFzZVZhbHVlUmVuZGVyKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgJ211bHRpc2VsZWN0JzpcbiAgICAgICAgY2FzZSAnc2VsZWN0Jzoge1xuICAgICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50T3B0aW9uc1xuICAgICAgICAgICAgfHwgc2VsZWN0Q29tcG9uZW50T3B0aW9ucy5nZXQoY29sdW1uLmNvbHVtbktleSk7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBTZWxlY3RUeXBlLnZhbFJlbmRlcihcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIGJhc2VWYWx1ZVJlbmRlcixcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSAnZGF0ZSc6IHtcbiAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IERhdGVUeXBlLnZhbFJlbmRlcihyb3dJbmRleCwgcHJvcHMuZGF0ZUZvcm1hdCwgYmFzZVZhbHVlUmVuZGVyKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICAvLyBjaGFuZ2UgdmFsUmVuZGVycyB0byBqdXN0IHRha2UgcHJvcHMgLS0+IHNhdmVzIHNvbWUgJ2VuZXJneSdcbiAgICAgICAgY2FzZSAnY3VycmVuY3knOiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBDdXJyZW5jeVR5cGUudmFsUmVuZGVyKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgcHJvcHMuZGF0YSxcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgcHJvcHMudGhvdXNhbmRTZXBhcmF0b3IsXG4gICAgICAgICAgICBwcm9wcy5kZWNpbWFsU2VwYXJhdG9yLFxuICAgICAgICAgICAgYmFzZVZhbHVlUmVuZGVyLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBiYXNlVmFsdWVSZW5kZXIocm93SW5kZXgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGNlbGxFZGl0IHJlbmRlclxuICAgIGlmIChjb2wuY2VsbEVkaXQpIHtcbiAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IGNvbC5jZWxsRWRpdDtcbiAgICB9IGVsc2UgaWYgKGNvbC5lZGl0VmFsdWVSZW5kZXIpIHtcbiAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IChyb3dJbmRleCwgc2V0UmVmLCBvbktleURvd24pID0+IGNvbC5lZGl0VmFsdWVSZW5kZXIoXG4gICAgICAgIHByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSxcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIHNldFJlZixcbiAgICAgICAgb25LZXlEb3duLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBjZWxsQ3JlYXRlIHJlbmRlclxuICAgIGlmIChjb2wuY2VsbENyZWF0ZSkge1xuICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSBjb2wuY2VsbENyZWF0ZTtcbiAgICB9IGVsc2UgaWYgKGNvbC5jcmVhdGVWYWx1ZVJlbmRlcikge1xuICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSAocm93SW5kZXgsIHNldFJlZiwgb25LZXlEb3duKSA9PiBjb2wuY3JlYXRlVmFsdWVSZW5kZXIoXG4gICAgICAgIHByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSxcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIHNldFJlZixcbiAgICAgICAgb25LZXlEb3duLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBjZWxsRmlsdGVyIHJlbmRlclxuICAgIGlmIChjb2wuY2VsbEZpbHRlcikge1xuICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSBjb2wuY2VsbEZpbHRlcjtcbiAgICB9IGVsc2UgaWYgKGNvbC5maWx0ZXJWYWx1ZVJlbmRlcikge1xuICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSByb3dJbmRleCA9PiBjb2wuZmlsdGVyVmFsdWVSZW5kZXIocHJvcHMuZGF0YS5nZXQocm93SW5kZXgpLCByb3dJbmRleCk7XG4gICAgfVxuICAgIHJldHVybiBjb2x1bW47XG4gIH0sXG5cbiAgY29sdW1uQ29tcG9uZW50VHlwZShiYXNlQ29sdW1uLCB0YWJJbmRleCwgcHJvcHMsIGNvbCwgZnVuY3Rpb25zLCBnZXREaXNhYmxlZFN0YXRlKSB7XG4gICAgaWYgKCFjb2wuY29tcG9uZW50VHlwZSkgcmV0dXJuIGJhc2VDb2x1bW47XG4gICAgY29uc3QgY29sdW1uID0gYmFzZUNvbHVtbjtcbiAgICBjb25zdCBlZGl0VmFsdWVQYXJzZXIgPSBjb2wuZWRpdFZhbHVlUGFyc2VyID8gY29sLmVkaXRWYWx1ZVBhcnNlciA6IHZhbCA9PiB2YWw7XG4gICAgLy8gR3JpZCBpbnRlcm5hbCBmdW5jdGlvbnMgc2VwYXJhdGVkXG4gICAgY29uc3QgZWRpdEZ1bmN0aW9ucyA9IHsgLi4uZnVuY3Rpb25zLmVkaXQgfTtcbiAgICBjb25zdCBjcmVhdGVGdW5jdGlvbnMgPSB7IC4uLmZ1bmN0aW9ucy5jcmVhdGUgfTtcbiAgICBjb25zdCBmaWx0ZXJGdW5jdGlvbnMgPSB7IC4uLmZ1bmN0aW9ucy5maWx0ZXIgfTtcbiAgICBjb25zdCB7IHNlbGVjdENvbXBvbmVudE9wdGlvbnMgPSBNYXAoKSB9ID0gcHJvcHM7XG4gICAgY29uc3QgcHJpbWl0aXZlVmFsUGFyc2VyID0gIWNvbC5lZGl0VmFsdWVQYXJzZXIgJiYgY29sLmNvbXBvbmVudFR5cGUgPT09ICdmbG9hdCdcbiAgICAgID8gdmFsID0+IHZhbC5yZXBsYWNlKG5ldyBSZWdFeHAoYFteXFxcXGQke3Byb3BzLmRlY2ltYWxTZXBhcmF0b3J9Ky1dYCwgJ2cnKSwgJycpXG4gICAgICA6IGVkaXRWYWx1ZVBhcnNlcjtcblxuICAgIHN3aXRjaCAoY29sLmNvbXBvbmVudFR5cGUpIHtcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICd0ZXh0Jzoge1xuICAgICAgICBjb25zdCBmb3JtQ29udHJvbFR5cGUgPSBjb2wuY29tcG9uZW50VHlwZSA9PT0gJ2Zsb2F0JyB8fCBjb2wuY29tcG9uZW50VHlwZSA9PT0gJ251bWJlcidcbiAgICAgICAgICA/ICd0ZXh0J1xuICAgICAgICAgIDogY29sLmNvbXBvbmVudFR5cGU7XG4gICAgICAgIC8vIGFsd2F5cyB1c2UgY29sLmVkaXRWYWx1ZVBhcnNlciBvdmVycmlkZSBpZiBhdmFpbGFibGVcblxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gUHJpbWl0aXZlVHlwZS5jZWxsRWRpdChcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgcHJpbWl0aXZlVmFsUGFyc2VyLFxuICAgICAgICAgICAgZm9ybUNvbnRyb2xUeXBlLFxuICAgICAgICAgICAgLi4uZWRpdEZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gUHJpbWl0aXZlVHlwZS5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBwcmltaXRpdmVWYWxQYXJzZXIsXG4gICAgICAgICAgICBmb3JtQ29udHJvbFR5cGUsXG4gICAgICAgICAgICAuLi5jcmVhdGVGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcHMuZmlsdGVyaW5nICYmICFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT4gUHJpbWl0aXZlVHlwZS5jZWxsRmlsdGVyKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgcHJpbWl0aXZlVmFsUGFyc2VyLFxuICAgICAgICAgICAgZm9ybUNvbnRyb2xUeXBlLFxuICAgICAgICAgICAgLi4uZmlsdGVyRnVuY3Rpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ2NoZWNrYm94Jzoge1xuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gQ2hlY2tib3hUeXBlLmNlbGxFZGl0KFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiBDaGVja2JveFR5cGUuY2VsbENyZWF0ZShcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgLi4uY3JlYXRlRnVuY3Rpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IENoZWNrYm94VHlwZS5jZWxsRmlsdGVyKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgcHJvcHMuaW50bCxcbiAgICAgICAgICAgIC4uLmZpbHRlckZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlICdtdWx0aXNlbGVjdCc6IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0T3B0aW9ucyA9IGNvbC5zZWxlY3RDb21wb25lbnRPcHRpb25zXG4gICAgICAgICAgfHwgc2VsZWN0Q29tcG9uZW50T3B0aW9ucy5nZXQoY29sdW1uLmNvbHVtbktleSk7XG4gICAgICAgIGNvbnN0IHNlbGVjdFRyYW5zbGF0aW9ucyA9IGNvbC5zZWxlY3RDb21wb25lbnRUcmFuc2xhdGlvbnMgfHwge1xuICAgICAgICAgIHBsYWNlaG9sZGVyOiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuU2VsZWN0JyB9KSxcbiAgICAgICAgICBub1Jlc3VsdHNUZXh0OiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuTm9SZXN1bHRzJyB9KSxcbiAgICAgICAgICAvLyBWYXJpYWJsZSAnbicgbXVzdCBiZSBwcm92aWRlZCBpbiB0aGlzIHBoYXNlIGluIG9yZGVyIHRvIGF2b2lkXG4gICAgICAgICAgLy8gRXJyb3I6IFRoZSBpbnRsIHN0cmluZyBjb250ZXh0IHZhcmlhYmxlICduJyB3YXMgbm90IHByb3ZpZGVkIHRvIHRoZSBzdHJpbmcge259XG4gICAgICAgICAgLy8gc2VsZWN0ZWRcbiAgICAgICAgICAvLyBWYXJpYWJsZSBuIGlzIHJlcGxhY2VkIGxhdGVyLCB3aGVuIGl0cyB2YWx1ZSBpcyBhdmFpbGFibGVcbiAgICAgICAgICBzZWxlY3RlZDogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0LlNlbGVjdGVkJyB9LCB7IG46ICc8bj4nIH0pLFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiBTZWxlY3RUeXBlLmNlbGxFZGl0KFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uZWRpdEZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IFNlbGVjdFR5cGUuY2VsbENyZWF0ZShcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmNyZWF0ZUZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuZmlsdGVyaW5nICYmICFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT4gTXVsdGlTZWxlY3RUeXBlLmNlbGxGaWx0ZXIoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uZmlsdGVyRnVuY3Rpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ3NlbGVjdCc6IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0T3B0aW9ucyA9IGNvbC5zZWxlY3RDb21wb25lbnRPcHRpb25zXG4gICAgICAgICAgfHwgc2VsZWN0Q29tcG9uZW50T3B0aW9ucy5nZXQoY29sdW1uLmNvbHVtbktleSk7XG4gICAgICAgIGNvbnN0IHNlbGVjdFRyYW5zbGF0aW9ucyA9IGNvbC5zZWxlY3RDb21wb25lbnRUcmFuc2xhdGlvbnMgfHwge1xuICAgICAgICAgIHBsYWNlaG9sZGVyOiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuU2VsZWN0JyB9KSxcbiAgICAgICAgICBub1Jlc3VsdHNUZXh0OiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuTm9SZXN1bHRzJyB9KSxcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gU2VsZWN0VHlwZS5jZWxsRWRpdChcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiBTZWxlY3RUeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5jcmVhdGVGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IFNlbGVjdFR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5maWx0ZXJGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSAnYm9vbGVhbic6IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0T3B0aW9ucyA9IFtcbiAgICAgICAgICB7IHZhbHVlOiB0cnVlLCBsYWJlbDogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLlllcycgfSkgfSxcbiAgICAgICAgICB7IHZhbHVlOiBmYWxzZSwgbGFiZWw6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5ObycgfSkgfSxcbiAgICAgICAgXTtcbiAgICAgICAgY29uc3Qgc2VsZWN0VHJhbnNsYXRpb25zID0gY29sLnNlbGVjdENvbXBvbmVudFRyYW5zbGF0aW9ucyB8fCB7XG4gICAgICAgICAgcGxhY2Vob2xkZXI6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5TZWxlY3QnIH0pLFxuICAgICAgICAgIG5vUmVzdWx0c1RleHQ6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5Ob1Jlc3VsdHMnIH0pLFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiBCb29sZWFuVHlwZS5jZWxsRWRpdChcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiBCb29sZWFuVHlwZS5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uY3JlYXRlRnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5maWx0ZXJpbmcgJiYgIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiBCb29sZWFuVHlwZS5jZWxsRmlsdGVyKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmZpbHRlckZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlICdkYXRlJzoge1xuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gRGF0ZVR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByb3BzLnJlZ2lvbixcbiAgICAgICAgICAgIHByb3BzLmRhdGVGb3JtYXQsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gRGF0ZVR5cGUuY2VsbENyZWF0ZShcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgcHJvcHMucmVnaW9uLFxuICAgICAgICAgICAgcHJvcHMuZGF0ZUZvcm1hdCxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmNyZWF0ZUZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuZmlsdGVyaW5nICYmICFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT4gRGF0ZVR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByb3BzLnJlZ2lvbixcbiAgICAgICAgICAgIHByb3BzLmRhdGVGb3JtYXQsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5maWx0ZXJGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgJ2N1cnJlbmN5Jzoge1xuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiBDdXJyZW5jeVR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICAgcHJvcHMuZGF0YSxcbiAgICAgICAgICAgIHByb3BzLnRob3VzYW5kU2VwYXJhdG9yLFxuICAgICAgICAgICAgcHJvcHMuZGVjaW1hbFNlcGFyYXRvcixcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gQ3VycmVuY3lUeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIC4uLmNyZWF0ZUZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgICBwcm9wcy5kYXRhLFxuICAgICAgICAgICAgcHJvcHMudGhvdXNhbmRTZXBhcmF0b3IsXG4gICAgICAgICAgICBwcm9wcy5kZWNpbWFsU2VwYXJhdG9yLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IFByaW1pdGl2ZVR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByaW1pdGl2ZVZhbFBhcnNlcixcbiAgICAgICAgICAgICd0ZXh0JyxcbiAgICAgICAgICAgIC4uLmZpbHRlckZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICB9XG4gICAgcmV0dXJuIGNvbHVtbjtcbiAgfSxcbn07XG4iXX0=