'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _datagrid = require('../datagrid.utils');

var _datagrid2 = _interopRequireDefault(_datagrid);

var _columnTypes = require('./column-types/column-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  baseColumn: function baseColumn(col) {
    var baseCol = {
      header: col.header,
      columnKey: _datagrid2.default.getColumnKey(col),
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
      style: _datagrid2.default.getCellStyleByCol(col)
    };
    // valueKeyPath
    if (col.valueKeyPath) baseCol.valueKeyPath = col.valueKeyPath;
    // flexGrow
    if (col.flexGrow) baseCol.flexGrow = col.flexGrow;
    // valueType
    if (col.valueType) baseCol.valueType = col.valueType;
    // sortComparator
    if (col.sortComparator) baseCol.sortComparator = col.sortComparator;
    // sortValueGetter
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
    }
    // cellEdit render
    if (col.cellEdit) {
      column.cellEdit = col.cellEdit;
    } else if (col.editValueRender) {
      column.cellEdit = function (rowIndex) {
        return col.editValueRender(props.data.get(rowIndex), rowIndex);
      };
    }

    // cellCreate render
    if (col.cellCreate) {
      column.cellCreate = col.cellCreate;
    } else if (col.createValueRender) {
      column.cellCreate = function (rowIndex) {
        return col.createValueRender(props.data.get(rowIndex), rowIndex);
      };
    }

    // cellFilter render
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
    var editValueParser = function editValueParser(val) {
      return val;
    }; // eslint-disable-line
    // Grid internal functions separated
    var editFunctions = _extends({}, functions.edit);
    var createFunctions = _extends({}, functions.create);
    var filterFunctions = _extends({}, functions.filter);
    switch (col.componentType) {
      case 'float':
      case 'number':
      case 'text':
        {
          var formControlType = col.componentType === 'float' || col.componentType === 'number' ? 'text' : col.componentType;
          var primitiveValParser = col.componentType === 'float' ? function (val) {
            return val.replace(new RegExp('[^\\d' + props.decimalSeparator + '+-]', 'g'), '');
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
            placeholder: props.intl.formatMessage({ id: 'Grid.FloatingSelect.Select' }),
            noResultsText: props.intl.formatMessage({ id: 'Grid.FloatingSelect.NoResults' }),
            selected: props.intl.formatMessage({ id: 'Grid.FloatingSelect.Selected' })
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
            placeholder: props.intl.formatMessage({ id: 'Grid.FloatingSelect.Select' }),
            noResultsText: props.intl.formatMessage({ id: 'Grid.FloatingSelect.NoResults' })
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
          var _selectOptions2 = [{ value: true, label: props.intl.formatMessage({ id: 'Grid.Yes' }) }, { value: false, label: props.intl.formatMessage({ id: 'Grid.No' }) }];
          var _selectTranslations2 = col.selectComponentTranslations || {
            placeholder: props.intl.formatMessage({ id: 'Grid.FloatingSelect.Select' }),
            noResultsText: props.intl.formatMessage({ id: 'Grid.FloatingSelect.NoResults' })
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2VydmljZS9jb2x1bW4tc2VydmljZS5qc3giXSwibmFtZXMiOlsiYmFzZUNvbHVtbiIsImNvbCIsImJhc2VDb2wiLCJoZWFkZXIiLCJjb2x1bW5LZXkiLCJVdGlscyIsImdldENvbHVtbktleSIsIndpZHRoIiwibWluV2lkdGgiLCJtYXhXaWR0aCIsImlzUmVzaXphYmxlIiwiZGlzYWJsZVJlc2l6aW5nIiwiZml4ZWQiLCJmaXhlZFJpZ2h0IiwiYWxsb3dDZWxsc1JlY3ljbGluZyIsImRpc2FibGVTb3J0aW5nIiwiaXNSZXF1aXJlZCIsImNvbXBvbmVudFR5cGUiLCJzdHlsZSIsImdldENlbGxTdHlsZUJ5Q29sIiwidmFsdWVLZXlQYXRoIiwiZmxleEdyb3ciLCJ2YWx1ZVR5cGUiLCJzb3J0Q29tcGFyYXRvciIsInNvcnRWYWx1ZUdldHRlciIsImNvbHVtbkNlbGwiLCJwcm9wcyIsImJhc2VWYWx1ZVJlbmRlciIsImNvbHVtbiIsImNlbGwiLCJ2YWx1ZVJlbmRlciIsImRhdGEiLCJnZXQiLCJyb3dJbmRleCIsIlByaW1pdGl2ZVR5cGUiLCJudW1iZXJWYWxSZW5kZXIiLCJCb29sZWFuVHlwZSIsInZhbFJlbmRlciIsIkNoZWNrYm94VHlwZSIsIkRhdGVUeXBlIiwiZGF0ZUZvcm1hdCIsIkN1cnJlbmN5VHlwZSIsInRob3VzYW5kU2VwYXJhdG9yIiwiZGVjaW1hbFNlcGFyYXRvciIsImNlbGxFZGl0IiwiZWRpdFZhbHVlUmVuZGVyIiwiY2VsbENyZWF0ZSIsImNyZWF0ZVZhbHVlUmVuZGVyIiwiY2VsbEZpbHRlciIsImZpbHRlclZhbHVlUmVuZGVyIiwiY29sdW1uQ29tcG9uZW50VHlwZSIsInRhYkluZGV4IiwiZnVuY3Rpb25zIiwiZ2V0RGlzYWJsZWRTdGF0ZSIsImVkaXRWYWx1ZVBhcnNlciIsInZhbCIsImVkaXRGdW5jdGlvbnMiLCJlZGl0IiwiY3JlYXRlRnVuY3Rpb25zIiwiY3JlYXRlIiwiZmlsdGVyRnVuY3Rpb25zIiwiZmlsdGVyIiwiZm9ybUNvbnRyb2xUeXBlIiwicHJpbWl0aXZlVmFsUGFyc2VyIiwicmVwbGFjZSIsIlJlZ0V4cCIsImlubGluZUVkaXQiLCJncmlkIiwiaWQiLCJmaWx0ZXJpbmciLCJpbnRsIiwic2VsZWN0T3B0aW9ucyIsInNlbGVjdENvbXBvbmVudE9wdGlvbnMiLCJzZWxlY3RUcmFuc2xhdGlvbnMiLCJzZWxlY3RDb21wb25lbnRUcmFuc2xhdGlvbnMiLCJwbGFjZWhvbGRlciIsImZvcm1hdE1lc3NhZ2UiLCJub1Jlc3VsdHNUZXh0Iiwic2VsZWN0ZWQiLCJTZWxlY3RUeXBlIiwiTXVsdGlTZWxlY3RUeXBlIiwidmFsdWUiLCJsYWJlbCIsInJlZ2lvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztrQkFVZTtBQUNiQSxZQURhLHNCQUNGQyxHQURFLEVBQ0c7QUFDZCxRQUFNQyxVQUFVO0FBQ2RDLGNBQVFGLElBQUlFLE1BREU7QUFFZEMsaUJBQVdDLG1CQUFNQyxZQUFOLENBQW1CTCxHQUFuQixDQUZHO0FBR2RNLGFBQVFOLElBQUlNLEtBQUosSUFBYU4sSUFBSU0sS0FBSixLQUFjLENBQTNCLEdBQStCTixJQUFJTSxLQUFuQyxHQUEyQyxHQUhyQztBQUlkQyxnQkFBV1AsSUFBSU8sUUFBSixJQUFnQlAsSUFBSU8sUUFBSixLQUFpQixDQUFqQyxHQUFxQ1AsSUFBSU8sUUFBekMsR0FBb0QsRUFKakQ7QUFLZEMsZ0JBQVVSLElBQUlRLFFBTEE7QUFNZEMsbUJBQWEsQ0FBQ1QsSUFBSVUsZUFOSjtBQU9kQyxhQUFPLENBQUMsQ0FBQ1gsSUFBSVcsS0FQQztBQVFkQyxrQkFBWSxDQUFDLENBQUNaLElBQUlZLFVBUko7QUFTZEMsMkJBQXFCLENBQUMsQ0FBQ2IsSUFBSWEsbUJBVGI7QUFVZEMsc0JBQWdCLENBQUMsQ0FBQ2QsSUFBSWMsY0FWUjtBQVdkQyxrQkFBWSxDQUFDLENBQUNmLElBQUllLFVBWEo7QUFZZEMscUJBQWVoQixJQUFJZ0IsYUFa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QUFwQjtBQVdEO0FBQ0Q7QUFDRDs7QUFFRDtBQTFTRjtBQTRTQSxXQUFPaEMsTUFBUDtBQUNEO0FBelpZLEMiLCJmaWxlIjoiY29sdW1uLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVXRpbHMgZnJvbSAnLi4vZGF0YWdyaWQudXRpbHMnO1xuaW1wb3J0IHtcbiAgRGF0ZVR5cGUsXG4gIFNlbGVjdFR5cGUsXG4gIEJvb2xlYW5UeXBlLFxuICBDaGVja2JveFR5cGUsXG4gIEN1cnJlbmN5VHlwZSxcbiAgUHJpbWl0aXZlVHlwZSxcbiAgTXVsdGlTZWxlY3RUeXBlLFxufSBmcm9tICcuL2NvbHVtbi10eXBlcy9jb2x1bW4tdHlwZXMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGJhc2VDb2x1bW4oY29sKSB7XG4gICAgY29uc3QgYmFzZUNvbCA9IHtcbiAgICAgIGhlYWRlcjogY29sLmhlYWRlcixcbiAgICAgIGNvbHVtbktleTogVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCksXG4gICAgICB3aWR0aDogKGNvbC53aWR0aCB8fCBjb2wud2lkdGggPT09IDAgPyBjb2wud2lkdGggOiAyMDApLFxuICAgICAgbWluV2lkdGg6IChjb2wubWluV2lkdGggfHwgY29sLm1pbldpZHRoID09PSAwID8gY29sLm1pbldpZHRoIDogNDApLFxuICAgICAgbWF4V2lkdGg6IGNvbC5tYXhXaWR0aCxcbiAgICAgIGlzUmVzaXphYmxlOiAhY29sLmRpc2FibGVSZXNpemluZyxcbiAgICAgIGZpeGVkOiAhIWNvbC5maXhlZCxcbiAgICAgIGZpeGVkUmlnaHQ6ICEhY29sLmZpeGVkUmlnaHQsXG4gICAgICBhbGxvd0NlbGxzUmVjeWNsaW5nOiAhIWNvbC5hbGxvd0NlbGxzUmVjeWNsaW5nLFxuICAgICAgZGlzYWJsZVNvcnRpbmc6ICEhY29sLmRpc2FibGVTb3J0aW5nLFxuICAgICAgaXNSZXF1aXJlZDogISFjb2wuaXNSZXF1aXJlZCxcbiAgICAgIGNvbXBvbmVudFR5cGU6IGNvbC5jb21wb25lbnRUeXBlLFxuICAgICAgc3R5bGU6IFV0aWxzLmdldENlbGxTdHlsZUJ5Q29sKGNvbCksXG4gICAgfTtcbiAgICAvLyB2YWx1ZUtleVBhdGhcbiAgICBpZiAoY29sLnZhbHVlS2V5UGF0aCkgYmFzZUNvbC52YWx1ZUtleVBhdGggPSBjb2wudmFsdWVLZXlQYXRoO1xuICAgIC8vIGZsZXhHcm93XG4gICAgaWYgKGNvbC5mbGV4R3JvdykgYmFzZUNvbC5mbGV4R3JvdyA9IGNvbC5mbGV4R3JvdztcbiAgICAvLyB2YWx1ZVR5cGVcbiAgICBpZiAoY29sLnZhbHVlVHlwZSkgYmFzZUNvbC52YWx1ZVR5cGUgPSBjb2wudmFsdWVUeXBlO1xuICAgIC8vIHNvcnRDb21wYXJhdG9yXG4gICAgaWYgKGNvbC5zb3J0Q29tcGFyYXRvcikgYmFzZUNvbC5zb3J0Q29tcGFyYXRvciA9IGNvbC5zb3J0Q29tcGFyYXRvcjtcbiAgICAvLyBzb3J0VmFsdWVHZXR0ZXJcbiAgICBpZiAoY29sLnNvcnRWYWx1ZUdldHRlcikgYmFzZUNvbC5zb3J0VmFsdWVHZXR0ZXIgPSBjb2wuc29ydFZhbHVlR2V0dGVyO1xuICAgIHJldHVybiBiYXNlQ29sO1xuICB9LFxuXG4gIGNvbHVtbkNlbGwoYmFzZUNvbHVtbiwgcHJvcHMsIGNvbCwgYmFzZVZhbHVlUmVuZGVyKSB7XG4gICAgY29uc3QgY29sdW1uID0gYmFzZUNvbHVtbjtcbiAgICBpZiAoY29sLmNlbGwpIHtcbiAgICAgIGNvbHVtbi5jZWxsID0gY29sLmNlbGw7XG4gICAgfSBlbHNlIGlmIChjb2wudmFsdWVSZW5kZXIpIHtcbiAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gY29sLnZhbHVlUmVuZGVyKHByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSwgcm93SW5kZXgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzd2l0Y2ggKGNvbC52YWx1ZVR5cGUpIHtcbiAgICAgICAgY2FzZSAnbnVtYmVyJzogLy8gZmFsbCB0aHJvdWdoXG4gICAgICAgIGNhc2UgJ2Zsb2F0Jzoge1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gUHJpbWl0aXZlVHlwZS5udW1iZXJWYWxSZW5kZXIoY29sLCByb3dJbmRleCwgYmFzZVZhbHVlUmVuZGVyKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgJ2Jvb2xlYW4nOiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBCb29sZWFuVHlwZS52YWxSZW5kZXIoY29sLCByb3dJbmRleCwgYmFzZVZhbHVlUmVuZGVyKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgJ2NoZWNrYm94Jzoge1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gQ2hlY2tib3hUeXBlLnZhbFJlbmRlcihyb3dJbmRleCwgYmFzZVZhbHVlUmVuZGVyKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgJ2RhdGUnOiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBEYXRlVHlwZS52YWxSZW5kZXIocm93SW5kZXgsIHByb3BzLmRhdGVGb3JtYXQsIGJhc2VWYWx1ZVJlbmRlcik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY2hhbmdlIHZhbFJlbmRlcnMgdG8ganVzdCB0YWtlIHByb3BzIC0tPiBzYXZlcyBzb21lICdlbmVyZ3knXG4gICAgICAgIGNhc2UgJ2N1cnJlbmN5Jzoge1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gQ3VycmVuY3lUeXBlLnZhbFJlbmRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIHByb3BzLmRhdGEsXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHByb3BzLnRob3VzYW5kU2VwYXJhdG9yLFxuICAgICAgICAgICAgcHJvcHMuZGVjaW1hbFNlcGFyYXRvcixcbiAgICAgICAgICAgIGJhc2VWYWx1ZVJlbmRlcixcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gYmFzZVZhbHVlUmVuZGVyKHJvd0luZGV4KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBjZWxsRWRpdCByZW5kZXJcbiAgICBpZiAoY29sLmNlbGxFZGl0KSB7XG4gICAgICBjb2x1bW4uY2VsbEVkaXQgPSBjb2wuY2VsbEVkaXQ7XG4gICAgfSBlbHNlIGlmIChjb2wuZWRpdFZhbHVlUmVuZGVyKSB7XG4gICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiBjb2wuZWRpdFZhbHVlUmVuZGVyKHByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSwgcm93SW5kZXgpO1xuICAgIH1cblxuICAgIC8vIGNlbGxDcmVhdGUgcmVuZGVyXG4gICAgaWYgKGNvbC5jZWxsQ3JlYXRlKSB7XG4gICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IGNvbC5jZWxsQ3JlYXRlO1xuICAgIH0gZWxzZSBpZiAoY29sLmNyZWF0ZVZhbHVlUmVuZGVyKSB7XG4gICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IGNvbC5jcmVhdGVWYWx1ZVJlbmRlcihwcm9wcy5kYXRhLmdldChyb3dJbmRleCksIHJvd0luZGV4KTtcbiAgICB9XG5cbiAgICAvLyBjZWxsRmlsdGVyIHJlbmRlclxuICAgIGlmIChjb2wuY2VsbEZpbHRlcikge1xuICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSBjb2wuY2VsbEZpbHRlcjtcbiAgICB9IGVsc2UgaWYgKGNvbC5maWx0ZXJWYWx1ZVJlbmRlcikge1xuICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSByb3dJbmRleCA9PiBjb2wuZmlsdGVyVmFsdWVSZW5kZXIocHJvcHMuZGF0YS5nZXQocm93SW5kZXgpLCByb3dJbmRleCk7XG4gICAgfVxuICAgIHJldHVybiBjb2x1bW47XG4gIH0sXG5cbiAgY29sdW1uQ29tcG9uZW50VHlwZShiYXNlQ29sdW1uLCB0YWJJbmRleCwgcHJvcHMsIGNvbCwgZnVuY3Rpb25zLCBnZXREaXNhYmxlZFN0YXRlKSB7XG4gICAgaWYgKCFjb2wuY29tcG9uZW50VHlwZSkgcmV0dXJuIGJhc2VDb2x1bW47XG4gICAgY29uc3QgY29sdW1uID0gYmFzZUNvbHVtbjtcbiAgICBsZXQgZWRpdFZhbHVlUGFyc2VyID0gdmFsID0+IHZhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIC8vIEdyaWQgaW50ZXJuYWwgZnVuY3Rpb25zIHNlcGFyYXRlZFxuICAgIGNvbnN0IGVkaXRGdW5jdGlvbnMgPSB7IC4uLmZ1bmN0aW9ucy5lZGl0IH07XG4gICAgY29uc3QgY3JlYXRlRnVuY3Rpb25zID0geyAuLi5mdW5jdGlvbnMuY3JlYXRlIH07XG4gICAgY29uc3QgZmlsdGVyRnVuY3Rpb25zID0geyAuLi5mdW5jdGlvbnMuZmlsdGVyIH07XG4gICAgc3dpdGNoIChjb2wuY29tcG9uZW50VHlwZSkge1xuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ3RleHQnOiB7XG4gICAgICAgIGNvbnN0IGZvcm1Db250cm9sVHlwZSA9IGNvbC5jb21wb25lbnRUeXBlID09PSAnZmxvYXQnIHx8IGNvbC5jb21wb25lbnRUeXBlID09PSAnbnVtYmVyJyA/ICd0ZXh0JyA6IGNvbC5jb21wb25lbnRUeXBlO1xuICAgICAgICBjb25zdCBwcmltaXRpdmVWYWxQYXJzZXIgPSBjb2wuY29tcG9uZW50VHlwZSA9PT0gJ2Zsb2F0JyA/XG4gICAgICAgICAgKHZhbCA9PiB2YWwucmVwbGFjZShuZXcgUmVnRXhwKGBbXlxcXFxkJHtwcm9wcy5kZWNpbWFsU2VwYXJhdG9yfSstXWAsICdnJyksICcnKSkgOiBlZGl0VmFsdWVQYXJzZXI7XG5cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+XG4gICAgICAgICAgICBQcmltaXRpdmVUeXBlLmNlbGxFZGl0KFxuICAgICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgICBwcmltaXRpdmVWYWxQYXJzZXIsXG4gICAgICAgICAgICAgIGZvcm1Db250cm9sVHlwZSxcbiAgICAgICAgICAgICAgLi4uZWRpdEZ1bmN0aW9ucyxcbiAgICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IFByaW1pdGl2ZVR5cGUuY2VsbENyZWF0ZShcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgcHJpbWl0aXZlVmFsUGFyc2VyLFxuICAgICAgICAgICAgZm9ybUNvbnRyb2xUeXBlLFxuICAgICAgICAgICAgLi4uY3JlYXRlRnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IFByaW1pdGl2ZVR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByaW1pdGl2ZVZhbFBhcnNlcixcbiAgICAgICAgICAgIGZvcm1Db250cm9sVHlwZSxcbiAgICAgICAgICAgIC4uLmZpbHRlckZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlICdjaGVja2JveCc6IHtcbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IENoZWNrYm94VHlwZS5jZWxsRWRpdChcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgLi4uZWRpdEZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gQ2hlY2tib3hUeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIC4uLmNyZWF0ZUZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5maWx0ZXJpbmcgJiYgIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PlxuICAgICAgICAgICAgQ2hlY2tib3hUeXBlLmNlbGxGaWx0ZXIoXG4gICAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgICAgcHJvcHMuaW50bCxcbiAgICAgICAgICAgICAgLi4uZmlsdGVyRnVuY3Rpb25zLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSAnbXVsdGlzZWxlY3QnOiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50T3B0aW9ucyB8fFxuICAgICAgICAgIHByb3BzLnNlbGVjdENvbXBvbmVudE9wdGlvbnMuZ2V0KGNvbHVtbi5jb2x1bW5LZXkpO1xuICAgICAgICBjb25zdCBzZWxlY3RUcmFuc2xhdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50VHJhbnNsYXRpb25zIHx8XG4gICAgICAgICAge1xuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5TZWxlY3QnIH0pLFxuICAgICAgICAgICAgbm9SZXN1bHRzVGV4dDogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0Lk5vUmVzdWx0cycgfSksXG4gICAgICAgICAgICBzZWxlY3RlZDogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0LlNlbGVjdGVkJyB9KSxcbiAgICAgICAgICB9O1xuXG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PlxuICAgICAgICAgICAgU2VsZWN0VHlwZS5jZWxsRWRpdChcbiAgICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT5cbiAgICAgICAgICAgIFNlbGVjdFR5cGUuY2VsbENyZWF0ZShcbiAgICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAgIC4uLmNyZWF0ZUZ1bmN0aW9ucyxcbiAgICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+XG4gICAgICAgICAgICBNdWx0aVNlbGVjdFR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgICAgLi4uZmlsdGVyRnVuY3Rpb25zLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSAnc2VsZWN0Jzoge1xuICAgICAgICBjb25zdCBzZWxlY3RPcHRpb25zID0gY29sLnNlbGVjdENvbXBvbmVudE9wdGlvbnMgfHxcbiAgICAgICAgICBwcm9wcy5zZWxlY3RDb21wb25lbnRPcHRpb25zLmdldChjb2x1bW4uY29sdW1uS2V5KTtcbiAgICAgICAgY29uc3Qgc2VsZWN0VHJhbnNsYXRpb25zID0gY29sLnNlbGVjdENvbXBvbmVudFRyYW5zbGF0aW9ucyB8fFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuU2VsZWN0JyB9KSxcbiAgICAgICAgICAgIG5vUmVzdWx0c1RleHQ6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5Ob1Jlc3VsdHMnIH0pLFxuICAgICAgICAgIH07XG5cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+XG4gICAgICAgICAgICBTZWxlY3RUeXBlLmNlbGxFZGl0KFxuICAgICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgICAgLi4uZWRpdEZ1bmN0aW9ucyxcbiAgICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PlxuICAgICAgICAgICAgU2VsZWN0VHlwZS5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgICAgLi4uY3JlYXRlRnVuY3Rpb25zLFxuICAgICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuZmlsdGVyaW5nICYmICFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT5cbiAgICAgICAgICAgIFNlbGVjdFR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgICAgLi4uZmlsdGVyRnVuY3Rpb25zLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSAnYm9vbGVhbic6IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0T3B0aW9ucyA9IFtcbiAgICAgICAgICB7IHZhbHVlOiB0cnVlLCBsYWJlbDogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLlllcycgfSkgfSxcbiAgICAgICAgICB7IHZhbHVlOiBmYWxzZSwgbGFiZWw6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5ObycgfSkgfSxcbiAgICAgICAgXTtcbiAgICAgICAgY29uc3Qgc2VsZWN0VHJhbnNsYXRpb25zID0gY29sLnNlbGVjdENvbXBvbmVudFRyYW5zbGF0aW9ucyB8fCB7XG4gICAgICAgICAgcGxhY2Vob2xkZXI6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5TZWxlY3QnIH0pLFxuICAgICAgICAgIG5vUmVzdWx0c1RleHQ6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5Ob1Jlc3VsdHMnIH0pLFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PlxuICAgICAgICAgICAgQm9vbGVhblR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+XG4gICAgICAgICAgICBCb29sZWFuVHlwZS5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgICAgLi4uY3JlYXRlRnVuY3Rpb25zLFxuICAgICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuZmlsdGVyaW5nICYmICFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT5cbiAgICAgICAgICAgIEJvb2xlYW5UeXBlLmNlbGxGaWx0ZXIoXG4gICAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAgIC4uLmZpbHRlckZ1bmN0aW9ucyxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ2RhdGUnOiB7XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiBEYXRlVHlwZS5jZWxsRWRpdChcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgcHJvcHMucmVnaW9uLFxuICAgICAgICAgICAgcHJvcHMuZGF0ZUZvcm1hdCxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiBEYXRlVHlwZS5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBwcm9wcy5yZWdpb24sXG4gICAgICAgICAgICBwcm9wcy5kYXRlRm9ybWF0LFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uY3JlYXRlRnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5maWx0ZXJpbmcgJiYgIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PlxuICAgICAgICAgICAgRGF0ZVR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgICBwcm9wcy5yZWdpb24sXG4gICAgICAgICAgICAgIHByb3BzLmRhdGVGb3JtYXQsXG4gICAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgICAgLi4uZmlsdGVyRnVuY3Rpb25zLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgZGVmYXVsdDpcbiAgICB9XG4gICAgcmV0dXJuIGNvbHVtbjtcbiAgfSxcbn07XG4iXX0=