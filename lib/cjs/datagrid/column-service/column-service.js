"use strict";

exports.__esModule = true;
exports["default"] = void 0;

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
      switch (col.valueType) {
        case 'number': // fall through

        case 'float':
          {
            column.cell = function (rowIndex) {
              return _columnTypes.PrimitiveType.numberValRender(col, rowIndex, baseValueRender);
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

    switch (col.componentType) {
      case 'float':
      case 'number':
      case 'text':
        {
          var formControlType = col.componentType === 'float' || col.componentType === 'number' ? 'text' : col.componentType; // always use col.editValueParser override if available

          var primitiveValParser = !col.editValueParser && col.componentType === 'float' ? function (val) {
            return val.replace(new RegExp("[^\\d" + props.decimalSeparator + "+-]", 'g'), '');
          } : editValueParser;

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
          var selectOptions = col.selectComponentOptions || props.selectComponentOptions.get(column.columnKey);
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
          var _selectOptions = col.selectComponentOptions || props.selectComponentOptions.get(column.columnKey);

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

      default:
    }

    return column;
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2VydmljZS9jb2x1bW4tc2VydmljZS5qc3giXSwibmFtZXMiOlsiYmFzZUNvbHVtbiIsImNvbCIsImJhc2VDb2wiLCJoZWFkZXIiLCJjb2x1bW5LZXkiLCJVdGlscyIsImdldENvbHVtbktleSIsIndpZHRoIiwibWluV2lkdGgiLCJtYXhXaWR0aCIsImlzUmVzaXphYmxlIiwiZGlzYWJsZVJlc2l6aW5nIiwiZml4ZWQiLCJmaXhlZFJpZ2h0IiwiYWxsb3dDZWxsc1JlY3ljbGluZyIsImRpc2FibGVTb3J0aW5nIiwiaXNSZXF1aXJlZCIsImNvbXBvbmVudFR5cGUiLCJzdHlsZSIsImdldENlbGxTdHlsZUJ5Q29sIiwidmFsdWVLZXlQYXRoIiwiZmxleEdyb3ciLCJ2YWx1ZVR5cGUiLCJzb3J0Q29tcGFyYXRvciIsInNvcnRWYWx1ZUdldHRlciIsImNvbHVtbkNlbGwiLCJwcm9wcyIsImJhc2VWYWx1ZVJlbmRlciIsImNvbHVtbiIsImNlbGwiLCJ2YWx1ZVJlbmRlciIsInJvd0luZGV4IiwiZGF0YSIsImdldCIsIlByaW1pdGl2ZVR5cGUiLCJudW1iZXJWYWxSZW5kZXIiLCJCb29sZWFuVHlwZSIsInZhbFJlbmRlciIsIkNoZWNrYm94VHlwZSIsIkRhdGVUeXBlIiwiZGF0ZUZvcm1hdCIsIkN1cnJlbmN5VHlwZSIsInRob3VzYW5kU2VwYXJhdG9yIiwiZGVjaW1hbFNlcGFyYXRvciIsImNlbGxFZGl0IiwiZWRpdFZhbHVlUmVuZGVyIiwic2V0UmVmIiwib25LZXlEb3duIiwiY2VsbENyZWF0ZSIsImNyZWF0ZVZhbHVlUmVuZGVyIiwiY2VsbEZpbHRlciIsImZpbHRlclZhbHVlUmVuZGVyIiwiY29sdW1uQ29tcG9uZW50VHlwZSIsInRhYkluZGV4IiwiZnVuY3Rpb25zIiwiZ2V0RGlzYWJsZWRTdGF0ZSIsImVkaXRWYWx1ZVBhcnNlciIsInZhbCIsImVkaXRGdW5jdGlvbnMiLCJlZGl0IiwiY3JlYXRlRnVuY3Rpb25zIiwiY3JlYXRlIiwiZmlsdGVyRnVuY3Rpb25zIiwiZmlsdGVyIiwiZm9ybUNvbnRyb2xUeXBlIiwicHJpbWl0aXZlVmFsUGFyc2VyIiwicmVwbGFjZSIsIlJlZ0V4cCIsImlubGluZUVkaXQiLCJncmlkIiwiaWQiLCJmaWx0ZXJpbmciLCJpbnRsIiwic2VsZWN0T3B0aW9ucyIsInNlbGVjdENvbXBvbmVudE9wdGlvbnMiLCJzZWxlY3RUcmFuc2xhdGlvbnMiLCJzZWxlY3RDb21wb25lbnRUcmFuc2xhdGlvbnMiLCJwbGFjZWhvbGRlciIsImZvcm1hdE1lc3NhZ2UiLCJub1Jlc3VsdHNUZXh0Iiwic2VsZWN0ZWQiLCJuIiwiU2VsZWN0VHlwZSIsIk11bHRpU2VsZWN0VHlwZSIsInZhbHVlIiwibGFiZWwiLCJyZWdpb24iXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7O0FBQ0E7Ozs7OztlQVVlO0FBQ2JBLEVBQUFBLFVBRGEsc0JBQ0ZDLEdBREUsRUFDRztBQUNkLFFBQU1DLE9BQU8sR0FBRztBQUNkQyxNQUFBQSxNQUFNLEVBQUVGLEdBQUcsQ0FBQ0UsTUFERTtBQUVkQyxNQUFBQSxTQUFTLEVBQUVDLHFCQUFNQyxZQUFOLENBQW1CTCxHQUFuQixDQUZHO0FBR2RNLE1BQUFBLEtBQUssRUFBRU4sR0FBRyxDQUFDTSxLQUFKLElBQWFOLEdBQUcsQ0FBQ00sS0FBSixLQUFjLENBQTNCLEdBQStCTixHQUFHLENBQUNNLEtBQW5DLEdBQTJDLEdBSHBDO0FBSWRDLE1BQUFBLFFBQVEsRUFBRVAsR0FBRyxDQUFDTyxRQUFKLElBQWdCUCxHQUFHLENBQUNPLFFBQUosS0FBaUIsQ0FBakMsR0FBcUNQLEdBQUcsQ0FBQ08sUUFBekMsR0FBb0QsRUFKaEQ7QUFLZEMsTUFBQUEsUUFBUSxFQUFFUixHQUFHLENBQUNRLFFBTEE7QUFNZEMsTUFBQUEsV0FBVyxFQUFFLENBQUNULEdBQUcsQ0FBQ1UsZUFOSjtBQU9kQyxNQUFBQSxLQUFLLEVBQUUsQ0FBQyxDQUFDWCxHQUFHLENBQUNXLEtBUEM7QUFRZEMs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QUFTUyxVQUFULCtCQUM5Qi9DLEdBRDhCLEVBRTlCMkIsTUFGOEIsRUFHOUJHLFFBSDhCLEVBSTlCc0IsUUFKOEIsRUFLOUIzQixLQUFLLENBQUMyQyxJQUFOLENBQVdDLEVBTG1CLEVBTTlCNUMsS0FBSyxDQUFDNEQsTUFOd0IsRUFPOUI1RCxLQUFLLENBQUNjLFVBUHdCLEVBUTlCZ0IsZUFSOEIsU0FTM0JJLGVBVDJCLEdBVTlCTCxnQkFWOEIsR0FBSjtBQUFBLGFBQTVCO0FBWUQ7O0FBQ0QsY0FBSTdCLEtBQUssQ0FBQzZDLFNBQU4sSUFBbUIsQ0FBQzNDLE1BQU0sQ0FBQ3NCLFVBQS9CLEVBQTJDO0FBQ3pDdEIsWUFBQUEsTUFBTSxDQUFDc0IsVUFBUCxHQUFvQjtBQUFBLHFCQUFNWCxzQkFBU1csVUFBVCwrQkFDeEJqRCxHQUR3QixFQUV4QjJCLE1BRndCLEVBR3hCeUIsUUFId0IsRUFJeEIzQixLQUFLLENBQUMyQyxJQUFOLENBQVdDLEVBSmEsRUFLeEI1QyxLQUFLLENBQUM0RCxNQUxrQixFQU14QjVELEtBQUssQ0FBQ2MsVUFOa0IsRUFPeEJnQixlQVB3QixTQVFyQk0sZUFScUIsRUFBTjtBQUFBLGFBQXBCO0FBVUQ7O0FBQ0Q7QUFDRDs7QUFFRDtBQXBTRjs7QUFzU0EsV0FBT2xDLE1BQVA7QUFDRDtBQTdaWSxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFV0aWxzIGZyb20gJy4uL2RhdGFncmlkLnV0aWxzJztcbmltcG9ydCB7XG4gIERhdGVUeXBlLFxuICBTZWxlY3RUeXBlLFxuICBCb29sZWFuVHlwZSxcbiAgQ2hlY2tib3hUeXBlLFxuICBDdXJyZW5jeVR5cGUsXG4gIFByaW1pdGl2ZVR5cGUsXG4gIE11bHRpU2VsZWN0VHlwZSxcbn0gZnJvbSAnLi9jb2x1bW4tdHlwZXMvY29sdW1uLXR5cGVzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBiYXNlQ29sdW1uKGNvbCkge1xuICAgIGNvbnN0IGJhc2VDb2wgPSB7XG4gICAgICBoZWFkZXI6IGNvbC5oZWFkZXIsXG4gICAgICBjb2x1bW5LZXk6IFV0aWxzLmdldENvbHVtbktleShjb2wpLFxuICAgICAgd2lkdGg6IGNvbC53aWR0aCB8fCBjb2wud2lkdGggPT09IDAgPyBjb2wud2lkdGggOiAyMDAsXG4gICAgICBtaW5XaWR0aDogY29sLm1pbldpZHRoIHx8IGNvbC5taW5XaWR0aCA9PT0gMCA/IGNvbC5taW5XaWR0aCA6IDQwLFxuICAgICAgbWF4V2lkdGg6IGNvbC5tYXhXaWR0aCxcbiAgICAgIGlzUmVzaXphYmxlOiAhY29sLmRpc2FibGVSZXNpemluZyxcbiAgICAgIGZpeGVkOiAhIWNvbC5maXhlZCxcbiAgICAgIGZpeGVkUmlnaHQ6ICEhY29sLmZpeGVkUmlnaHQsXG4gICAgICBhbGxvd0NlbGxzUmVjeWNsaW5nOiAhIWNvbC5hbGxvd0NlbGxzUmVjeWNsaW5nLFxuICAgICAgZGlzYWJsZVNvcnRpbmc6ICEhY29sLmRpc2FibGVTb3J0aW5nLFxuICAgICAgaXNSZXF1aXJlZDogISFjb2wuaXNSZXF1aXJlZCxcbiAgICAgIGNvbXBvbmVudFR5cGU6IGNvbC5jb21wb25lbnRUeXBlLFxuICAgICAgc3R5bGU6IFV0aWxzLmdldENlbGxTdHlsZUJ5Q29sKGNvbCksXG4gICAgfTtcbiAgICAvLyB2YWx1ZUtleVBhdGhcbiAgICBpZiAoY29sLnZhbHVlS2V5UGF0aCkgYmFzZUNvbC52YWx1ZUtleVBhdGggPSBjb2wudmFsdWVLZXlQYXRoO1xuICAgIC8vIGZsZXhHcm93XG4gICAgaWYgKGNvbC5mbGV4R3JvdykgYmFzZUNvbC5mbGV4R3JvdyA9IGNvbC5mbGV4R3JvdztcbiAgICAvLyB2YWx1ZVR5cGVcbiAgICBpZiAoY29sLnZhbHVlVHlwZSkgYmFzZUNvbC52YWx1ZVR5cGUgPSBjb2wudmFsdWVUeXBlO1xuICAgIC8vIHNvcnRDb21wYXJhdG9yXG4gICAgaWYgKGNvbC5zb3J0Q29tcGFyYXRvcikgYmFzZUNvbC5zb3J0Q29tcGFyYXRvciA9IGNvbC5zb3J0Q29tcGFyYXRvcjtcbiAgICAvLyBzb3J0VmFsdWVHZXR0ZXJcbiAgICBpZiAoY29sLnNvcnRWYWx1ZUdldHRlcikgYmFzZUNvbC5zb3J0VmFsdWVHZXR0ZXIgPSBjb2wuc29ydFZhbHVlR2V0dGVyO1xuICAgIHJldHVybiBiYXNlQ29sO1xuICB9LFxuXG4gIGNvbHVtbkNlbGwoYmFzZUNvbHVtbiwgcHJvcHMsIGNvbCwgYmFzZVZhbHVlUmVuZGVyKSB7XG4gICAgY29uc3QgY29sdW1uID0gYmFzZUNvbHVtbjtcbiAgICBpZiAoY29sLmNlbGwpIHtcbiAgICAgIGNvbHVtbi5jZWxsID0gY29sLmNlbGw7XG4gICAgfSBlbHNlIGlmIChjb2wudmFsdWVSZW5kZXIpIHtcbiAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gY29sLnZhbHVlUmVuZGVyKHByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSwgcm93SW5kZXgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzd2l0Y2ggKGNvbC52YWx1ZVR5cGUpIHtcbiAgICAgICAgY2FzZSAnbnVtYmVyJzogLy8gZmFsbCB0aHJvdWdoXG4gICAgICAgIGNhc2UgJ2Zsb2F0Jzoge1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gUHJpbWl0aXZlVHlwZS5udW1iZXJWYWxSZW5kZXIoY29sLCByb3dJbmRleCwgYmFzZVZhbHVlUmVuZGVyKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgJ2Jvb2xlYW4nOiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBCb29sZWFuVHlwZS52YWxSZW5kZXIoY29sLCByb3dJbmRleCwgYmFzZVZhbHVlUmVuZGVyKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgJ2NoZWNrYm94Jzoge1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gQ2hlY2tib3hUeXBlLnZhbFJlbmRlcihyb3dJbmRleCwgYmFzZVZhbHVlUmVuZGVyKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgJ2RhdGUnOiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBEYXRlVHlwZS52YWxSZW5kZXIocm93SW5kZXgsIHByb3BzLmRhdGVGb3JtYXQsIGJhc2VWYWx1ZVJlbmRlcik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY2hhbmdlIHZhbFJlbmRlcnMgdG8ganVzdCB0YWtlIHByb3BzIC0tPiBzYXZlcyBzb21lICdlbmVyZ3knXG4gICAgICAgIGNhc2UgJ2N1cnJlbmN5Jzoge1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gQ3VycmVuY3lUeXBlLnZhbFJlbmRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIHByb3BzLmRhdGEsXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHByb3BzLnRob3VzYW5kU2VwYXJhdG9yLFxuICAgICAgICAgICAgcHJvcHMuZGVjaW1hbFNlcGFyYXRvcixcbiAgICAgICAgICAgIGJhc2VWYWx1ZVJlbmRlcixcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gYmFzZVZhbHVlUmVuZGVyKHJvd0luZGV4KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBjZWxsRWRpdCByZW5kZXJcbiAgICBpZiAoY29sLmNlbGxFZGl0KSB7XG4gICAgICBjb2x1bW4uY2VsbEVkaXQgPSBjb2wuY2VsbEVkaXQ7XG4gICAgfSBlbHNlIGlmIChjb2wuZWRpdFZhbHVlUmVuZGVyKSB7XG4gICAgICBjb2x1bW4uY2VsbEVkaXQgPSAocm93SW5kZXgsIHNldFJlZiwgb25LZXlEb3duKSA9PiBjb2wuZWRpdFZhbHVlUmVuZGVyKFxuICAgICAgICBwcm9wcy5kYXRhLmdldChyb3dJbmRleCksXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICBzZXRSZWYsXG4gICAgICAgIG9uS2V5RG93bixcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gY2VsbENyZWF0ZSByZW5kZXJcbiAgICBpZiAoY29sLmNlbGxDcmVhdGUpIHtcbiAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gY29sLmNlbGxDcmVhdGU7XG4gICAgfSBlbHNlIGlmIChjb2wuY3JlYXRlVmFsdWVSZW5kZXIpIHtcbiAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gKHJvd0luZGV4LCBzZXRSZWYsIG9uS2V5RG93bikgPT4gY29sLmNyZWF0ZVZhbHVlUmVuZGVyKFxuICAgICAgICBwcm9wcy5kYXRhLmdldChyb3dJbmRleCksXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICBzZXRSZWYsXG4gICAgICAgIG9uS2V5RG93bixcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gY2VsbEZpbHRlciByZW5kZXJcbiAgICBpZiAoY29sLmNlbGxGaWx0ZXIpIHtcbiAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gY29sLmNlbGxGaWx0ZXI7XG4gICAgfSBlbHNlIGlmIChjb2wuZmlsdGVyVmFsdWVSZW5kZXIpIHtcbiAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gcm93SW5kZXggPT4gY29sLmZpbHRlclZhbHVlUmVuZGVyKHByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSwgcm93SW5kZXgpO1xuICAgIH1cbiAgICByZXR1cm4gY29sdW1uO1xuICB9LFxuXG4gIGNvbHVtbkNvbXBvbmVudFR5cGUoYmFzZUNvbHVtbiwgdGFiSW5kZXgsIHByb3BzLCBjb2wsIGZ1bmN0aW9ucywgZ2V0RGlzYWJsZWRTdGF0ZSkge1xuICAgIGlmICghY29sLmNvbXBvbmVudFR5cGUpIHJldHVybiBiYXNlQ29sdW1uO1xuICAgIGNvbnN0IGNvbHVtbiA9IGJhc2VDb2x1bW47XG4gICAgY29uc3QgZWRpdFZhbHVlUGFyc2VyID0gY29sLmVkaXRWYWx1ZVBhcnNlciA/IGNvbC5lZGl0VmFsdWVQYXJzZXIgOiB2YWwgPT4gdmFsO1xuICAgIC8vIEdyaWQgaW50ZXJuYWwgZnVuY3Rpb25zIHNlcGFyYXRlZFxuICAgIGNvbnN0IGVkaXRGdW5jdGlvbnMgPSB7IC4uLmZ1bmN0aW9ucy5lZGl0IH07XG4gICAgY29uc3QgY3JlYXRlRnVuY3Rpb25zID0geyAuLi5mdW5jdGlvbnMuY3JlYXRlIH07XG4gICAgY29uc3QgZmlsdGVyRnVuY3Rpb25zID0geyAuLi5mdW5jdGlvbnMuZmlsdGVyIH07XG4gICAgc3dpdGNoIChjb2wuY29tcG9uZW50VHlwZSkge1xuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ3RleHQnOiB7XG4gICAgICAgIGNvbnN0IGZvcm1Db250cm9sVHlwZSA9IGNvbC5jb21wb25lbnRUeXBlID09PSAnZmxvYXQnIHx8IGNvbC5jb21wb25lbnRUeXBlID09PSAnbnVtYmVyJ1xuICAgICAgICAgID8gJ3RleHQnXG4gICAgICAgICAgOiBjb2wuY29tcG9uZW50VHlwZTtcbiAgICAgICAgLy8gYWx3YXlzIHVzZSBjb2wuZWRpdFZhbHVlUGFyc2VyIG92ZXJyaWRlIGlmIGF2YWlsYWJsZVxuICAgICAgICBjb25zdCBwcmltaXRpdmVWYWxQYXJzZXIgPSAhY29sLmVkaXRWYWx1ZVBhcnNlciAmJiBjb2wuY29tcG9uZW50VHlwZSA9PT0gJ2Zsb2F0J1xuICAgICAgICAgID8gdmFsID0+IHZhbC5yZXBsYWNlKG5ldyBSZWdFeHAoYFteXFxcXGQke3Byb3BzLmRlY2ltYWxTZXBhcmF0b3J9Ky1dYCwgJ2cnKSwgJycpXG4gICAgICAgICAgOiBlZGl0VmFsdWVQYXJzZXI7XG5cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IFByaW1pdGl2ZVR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByaW1pdGl2ZVZhbFBhcnNlcixcbiAgICAgICAgICAgIGZvcm1Db250cm9sVHlwZSxcbiAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IFByaW1pdGl2ZVR5cGUuY2VsbENyZWF0ZShcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgcHJpbWl0aXZlVmFsUGFyc2VyLFxuICAgICAgICAgICAgZm9ybUNvbnRyb2xUeXBlLFxuICAgICAgICAgICAgLi4uY3JlYXRlRnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IFByaW1pdGl2ZVR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByaW1pdGl2ZVZhbFBhcnNlcixcbiAgICAgICAgICAgIGZvcm1Db250cm9sVHlwZSxcbiAgICAgICAgICAgIC4uLmZpbHRlckZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlICdjaGVja2JveCc6IHtcbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IENoZWNrYm94VHlwZS5jZWxsRWRpdChcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgLi4uZWRpdEZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gQ2hlY2tib3hUeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIC4uLmNyZWF0ZUZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5maWx0ZXJpbmcgJiYgIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiBDaGVja2JveFR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByb3BzLmludGwsXG4gICAgICAgICAgICAuLi5maWx0ZXJGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSAnbXVsdGlzZWxlY3QnOiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50T3B0aW9uc1xuICAgICAgICAgIHx8IHByb3BzLnNlbGVjdENvbXBvbmVudE9wdGlvbnMuZ2V0KGNvbHVtbi5jb2x1bW5LZXkpO1xuICAgICAgICBjb25zdCBzZWxlY3RUcmFuc2xhdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50VHJhbnNsYXRpb25zIHx8IHtcbiAgICAgICAgICBwbGFjZWhvbGRlcjogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0LlNlbGVjdCcgfSksXG4gICAgICAgICAgbm9SZXN1bHRzVGV4dDogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0Lk5vUmVzdWx0cycgfSksXG4gICAgICAgICAgLy8gVmFyaWFibGUgJ24nIG11c3QgYmUgcHJvdmlkZWQgaW4gdGhpcyBwaGFzZSBpbiBvcmRlciB0byBhdm9pZFxuICAgICAgICAgIC8vIEVycm9yOiBUaGUgaW50bCBzdHJpbmcgY29udGV4dCB2YXJpYWJsZSAnbicgd2FzIG5vdCBwcm92aWRlZCB0byB0aGUgc3RyaW5nIHtufVxuICAgICAgICAgIC8vIHNlbGVjdGVkXG4gICAgICAgICAgLy8gVmFyaWFibGUgbiBpcyByZXBsYWNlZCBsYXRlciwgd2hlbiBpdHMgdmFsdWUgaXMgYXZhaWxhYmxlXG4gICAgICAgICAgc2VsZWN0ZWQ6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5TZWxlY3RlZCcgfSwgeyBuOiAnPG4+JyB9KSxcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gU2VsZWN0VHlwZS5jZWxsRWRpdChcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiBTZWxlY3RUeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5jcmVhdGVGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IE11bHRpU2VsZWN0VHlwZS5jZWxsRmlsdGVyKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmZpbHRlckZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlICdzZWxlY3QnOiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50T3B0aW9uc1xuICAgICAgICAgIHx8IHByb3BzLnNlbGVjdENvbXBvbmVudE9wdGlvbnMuZ2V0KGNvbHVtbi5jb2x1bW5LZXkpO1xuICAgICAgICBjb25zdCBzZWxlY3RUcmFuc2xhdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50VHJhbnNsYXRpb25zIHx8IHtcbiAgICAgICAgICBwbGFjZWhvbGRlcjogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0LlNlbGVjdCcgfSksXG4gICAgICAgICAgbm9SZXN1bHRzVGV4dDogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0Lk5vUmVzdWx0cycgfSksXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IFNlbGVjdFR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gU2VsZWN0VHlwZS5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uY3JlYXRlRnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5maWx0ZXJpbmcgJiYgIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiBTZWxlY3RUeXBlLmNlbGxGaWx0ZXIoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uZmlsdGVyRnVuY3Rpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBbXG4gICAgICAgICAgeyB2YWx1ZTogdHJ1ZSwgbGFiZWw6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5ZZXMnIH0pIH0sXG4gICAgICAgICAgeyB2YWx1ZTogZmFsc2UsIGxhYmVsOiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuTm8nIH0pIH0sXG4gICAgICAgIF07XG4gICAgICAgIGNvbnN0IHNlbGVjdFRyYW5zbGF0aW9ucyA9IGNvbC5zZWxlY3RDb21wb25lbnRUcmFuc2xhdGlvbnMgfHwge1xuICAgICAgICAgIHBsYWNlaG9sZGVyOiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuU2VsZWN0JyB9KSxcbiAgICAgICAgICBub1Jlc3VsdHNUZXh0OiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuTm9SZXN1bHRzJyB9KSxcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gQm9vbGVhblR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gQm9vbGVhblR5cGUuY2VsbENyZWF0ZShcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmNyZWF0ZUZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuZmlsdGVyaW5nICYmICFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT4gQm9vbGVhblR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5maWx0ZXJGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSAnZGF0ZSc6IHtcbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IERhdGVUeXBlLmNlbGxFZGl0KFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBwcm9wcy5yZWdpb24sXG4gICAgICAgICAgICBwcm9wcy5kYXRlRm9ybWF0LFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uZWRpdEZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IERhdGVUeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByb3BzLnJlZ2lvbixcbiAgICAgICAgICAgIHByb3BzLmRhdGVGb3JtYXQsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5jcmVhdGVGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IERhdGVUeXBlLmNlbGxGaWx0ZXIoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBwcm9wcy5yZWdpb24sXG4gICAgICAgICAgICBwcm9wcy5kYXRlRm9ybWF0LFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uZmlsdGVyRnVuY3Rpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgfVxuICAgIHJldHVybiBjb2x1bW47XG4gIH0sXG59O1xuIl19