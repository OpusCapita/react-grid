var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import Utils from '../datagrid.utils';
import { DateType, SelectType, BooleanType, CheckboxType, CurrencyType, PrimitiveType, MultiSelectType } from './column-types/column-types';

export default {
  baseColumn: function baseColumn(col) {
    var baseCol = {
      header: col.header,
      columnKey: Utils.getColumnKey(col),
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
      style: Utils.getCellStyleByCol(col)
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
              return PrimitiveType.numberValRender(col, rowIndex, baseValueRender);
            };
            break;
          }

        case 'boolean':
          {
            column.cell = function (rowIndex) {
              return BooleanType.valRender(col, rowIndex, baseValueRender);
            };
            break;
          }

        case 'checkbox':
          {
            column.cell = function (rowIndex) {
              return CheckboxType.valRender(rowIndex, baseValueRender);
            };
            break;
          }

        case 'date':
          {
            column.cell = function (rowIndex) {
              return DateType.valRender(rowIndex, props.dateFormat, baseValueRender);
            };
            break;
          }
        // change valRenders to just take props --> saves some 'energy'
        case 'currency':
          {
            column.cell = function (rowIndex) {
              return CurrencyType.valRender(col, props.data, rowIndex, props.thousandSeparator, props.decimalSeparator, baseValueRender);
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
      column.cellEdit = function (rowIndex, setRef, onKeyDown) {
        return col.editValueRender(props.data.get(rowIndex), rowIndex, setRef, onKeyDown);
      };
    }

    // cellCreate render
    if (col.cellCreate) {
      column.cellCreate = col.cellCreate;
    } else if (col.createValueRender) {
      column.cellCreate = function (rowIndex, setRef, onKeyDown) {
        return col.createValueRender(props.data.get(rowIndex), rowIndex, setRef, onKeyDown);
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
    var editValueParser = col.editValueParser ? col.editValueParser : function (val) {
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
          // always use col.editValueParser override if available
          var primitiveValParser = !col.editValueParser && col.componentType === 'float' ? function (val) {
            return val.replace(new RegExp('[^\\d' + props.decimalSeparator + '+-]', 'g'), '');
          } : editValueParser;

          if (props.inlineEdit && !column.cellEdit) {
            column.cellEdit = function (rowIndex) {
              return PrimitiveType.cellEdit.apply(PrimitiveType, [col, column, rowIndex, tabIndex, props.grid.id, primitiveValParser, formControlType].concat(editFunctions, [getDisabledState]));
            };
          }

          if (props.inlineEdit && !column.cellCreate) {
            column.cellCreate = function (rowIndex) {
              return PrimitiveType.cellCreate.apply(PrimitiveType, [col, column, rowIndex, tabIndex, props.grid.id, primitiveValParser, formControlType].concat(createFunctions, [getDisabledState]));
            };
          }

          if (props.filtering && !column.cellFilter) {
            column.cellFilter = function () {
              return PrimitiveType.cellFilter.apply(PrimitiveType, [col, column, tabIndex, props.grid.id, primitiveValParser, formControlType].concat(filterFunctions));
            };
          }
          break;
        }

      case 'checkbox':
        {
          if (props.inlineEdit && !column.cellEdit) {
            column.cellEdit = function (rowIndex) {
              return CheckboxType.cellEdit.apply(CheckboxType, [col, column, rowIndex, tabIndex, props.grid.id].concat(editFunctions));
            };
          }
          if (props.inlineEdit && !column.cellCreate) {
            column.cellCreate = function (rowIndex) {
              return CheckboxType.cellCreate.apply(CheckboxType, [col, column, rowIndex, tabIndex, props.grid.id].concat(createFunctions));
            };
          }
          if (props.filtering && !column.cellFilter) {
            column.cellFilter = function () {
              return CheckboxType.cellFilter.apply(CheckboxType, [col, column, tabIndex, props.grid.id, props.intl].concat(filterFunctions));
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
            // Variable 'n' must be provided in this phase in order to avoid
            // Error: The intl string context variable 'n' was not provided to the string {n}
            // selected
            // Variable n is replaced later, when its value is available
            selected: props.intl.formatMessage({ id: 'Grid.FloatingSelect.Selected' }, { n: '<n>' })
          };

          if (props.inlineEdit && !column.cellEdit) {
            column.cellEdit = function (rowIndex) {
              return SelectType.cellEdit.apply(SelectType, [col, column, rowIndex, tabIndex, props.grid.id, selectOptions, selectTranslations, editValueParser].concat(editFunctions, [getDisabledState]));
            };
          }
          if (props.inlineEdit && !column.cellCreate) {
            column.cellCreate = function (rowIndex) {
              return SelectType.cellCreate.apply(SelectType, [col, column, rowIndex, tabIndex, props.grid.id, selectOptions, selectTranslations, editValueParser].concat(createFunctions, [getDisabledState]));
            };
          }
          if (props.filtering && !column.cellFilter) {
            column.cellFilter = function () {
              return MultiSelectType.cellFilter.apply(MultiSelectType, [col, column, tabIndex, props.grid.id, selectOptions, selectTranslations, editValueParser].concat(filterFunctions));
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
              return SelectType.cellEdit.apply(SelectType, [col, column, rowIndex, tabIndex, props.grid.id, _selectOptions, _selectTranslations, editValueParser].concat(editFunctions, [getDisabledState]));
            };
          }
          if (props.inlineEdit && !column.cellCreate) {
            column.cellCreate = function (rowIndex) {
              return SelectType.cellCreate.apply(SelectType, [col, column, rowIndex, tabIndex, props.grid.id, _selectOptions, _selectTranslations, editValueParser].concat(createFunctions, [getDisabledState]));
            };
          }
          if (props.filtering && !column.cellFilter) {
            column.cellFilter = function () {
              return SelectType.cellFilter.apply(SelectType, [col, column, tabIndex, props.grid.id, _selectOptions, _selectTranslations, editValueParser].concat(filterFunctions));
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
              return BooleanType.cellEdit.apply(BooleanType, [col, column, rowIndex, tabIndex, props.grid.id, _selectOptions2, _selectTranslations2, editValueParser].concat(editFunctions, [getDisabledState]));
            };
          }
          if (props.inlineEdit && !column.cellCreate) {
            column.cellCreate = function (rowIndex) {
              return BooleanType.cellCreate.apply(BooleanType, [col, column, rowIndex, tabIndex, props.grid.id, _selectOptions2, _selectTranslations2, editValueParser].concat(createFunctions, [getDisabledState]));
            };
          }
          if (props.filtering && !column.cellFilter) {
            column.cellFilter = function () {
              return BooleanType.cellFilter.apply(BooleanType, [col, column, tabIndex, props.grid.id, _selectOptions2, _selectTranslations2, editValueParser].concat(filterFunctions));
            };
          }
          break;
        }

      case 'date':
        {
          if (props.inlineEdit && !column.cellEdit) {
            column.cellEdit = function (rowIndex) {
              return DateType.cellEdit.apply(DateType, [col, column, rowIndex, tabIndex, props.grid.id, props.region, props.dateFormat, editValueParser].concat(editFunctions, [getDisabledState]));
            };
          }
          if (props.inlineEdit && !column.cellCreate) {
            column.cellCreate = function (rowIndex) {
              return DateType.cellCreate.apply(DateType, [col, column, rowIndex, tabIndex, props.grid.id, props.region, props.dateFormat, editValueParser].concat(createFunctions, [getDisabledState]));
            };
          }
          if (props.filtering && !column.cellFilter) {
            column.cellFilter = function () {
              return DateType.cellFilter.apply(DateType, [col, column, tabIndex, props.grid.id, props.region, props.dateFormat, editValueParser].concat(filterFunctions));
            };
          }
          break;
        }

      default:
    }
    return column;
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2VydmljZS9jb2x1bW4tc2VydmljZS5qc3giXSwibmFtZXMiOlsiVXRpbHMiLCJEYXRlVHlwZSIsIlNlbGVjdFR5cGUiLCJCb29sZWFuVHlwZSIsIkNoZWNrYm94VHlwZSIsIkN1cnJlbmN5VHlwZSIsIlByaW1pdGl2ZVR5cGUiLCJNdWx0aVNlbGVjdFR5cGUiLCJiYXNlQ29sdW1uIiwiY29sIiwiYmFzZUNvbCIsImhlYWRlciIsImNvbHVtbktleSIsImdldENvbHVtbktleSIsIndpZHRoIiwibWluV2lkdGgiLCJtYXhXaWR0aCIsImlzUmVzaXphYmxlIiwiZGlzYWJsZVJlc2l6aW5nIiwiZml4ZWQiLCJmaXhlZFJpZ2h0IiwiYWxsb3dDZWxsc1JlY3ljbGluZyIsImRpc2FibGVTb3J0aW5nIiwiaXNSZXF1aXJlZCIsImNvbXBvbmVudFR5cGUiLCJzdHlsZSIsImdldENlbGxTdHlsZUJ5Q29sIiwidmFsdWVLZXlQYXRoIiwiZmxleEdyb3ciLCJ2YWx1ZVR5cGUiLCJzb3J0Q29tcGFyYXRvciIsInNvcnRWYWx1ZUdldHRlciIsImNvbHVtbkNlbGwiLCJwcm9wcyIsImJhc2VWYWx1ZVJlbmRlciIsImNvbHVtbiIsImNlbGwiLCJ2YWx1ZVJlbmRlciIsImRhdGEiLCJnZXQiLCJyb3dJbmRleCIsIm51bWJlclZhbFJlbmRlciIsInZhbFJlbmRlciIsImRhdGVGb3JtYXQiLCJ0aG91c2FuZFNlcGFyYXRvciIsImRlY2ltYWxTZXBhcmF0b3IiLCJjZWxsRWRpdCIsImVkaXRWYWx1ZVJlbmRlciIsInNldFJlZiIsIm9uS2V5RG93biIsImNlbGxDcmVhdGUiLCJjcmVhdGVWYWx1ZVJlbmRlciIsImNlbGxGaWx0ZXIiLCJmaWx0ZXJWYWx1ZVJlbmRlciIsImNvbHVtbkNvbXBvbmVudFR5cGUiLCJ0YWJJbmRleCIsImZ1bmN0aW9ucyIsImdldERpc2FibGVkU3RhdGUiLCJlZGl0VmFsdWVQYXJzZXIiLCJ2YWwiLCJlZGl0RnVuY3Rpb25zIiwiZWRpdCIsImNyZWF0ZUZ1bmN0aW9ucyIsImNyZWF0ZSIsImZpbHRlckZ1bmN0aW9ucyIsImZpbHRlciIsImZvcm1Db250cm9sVHlwZSIsInByaW1pdGl2ZVZhbFBhcnNlciIsInJlcGxhY2UiLCJSZWdFeHAiLCJpbmxpbmVFZGl0IiwiZ3JpZCIsImlkIiwiZmlsdGVyaW5nIiwiaW50bCIsInNlbGVjdE9wdGlvbnMiLCJzZWxlY3RDb21wb25lbnRPcHRpb25zIiwic2VsZWN0VHJhbnNsYXRpb25zIiwic2VsZWN0Q29tcG9uZW50VHJhbnNsYXRpb25zIiwicGxhY2Vob2xkZXIiLCJmb3JtYXRNZXNzYWdlIiwibm9SZXN1bHRzVGV4dCIsInNlbGVjdGVkIiwibiIsInZhbHVlIiwibGFiZWwiLCJyZWdpb24iXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixtQkFBbEI7QUFDQSxTQUNFQyxRQURGLEVBRUVDLFVBRkYsRUFHRUMsV0FIRixFQUlFQyxZQUpGLEVBS0VDLFlBTEYsRUFNRUMsYUFORixFQU9FQyxlQVBGLFFBUU8sNkJBUlA7O0FBVUEsZUFBZTtBQUNiQyxZQURhLHNCQUNGQyxHQURFLEVBQ0c7QUFDZCxRQUFNQyxVQUFVO0FBQ2RDLGNBQVFGLElBQUlFLE1BREU7QUFFZEMsaUJBQVdaLE1BQU1hLFlBQU4sQ0FBbUJKLEdBQW5CLENBRkc7QUFHZEssYUFBUUwsSUFBSUssS0FBSixJQUFhTCxJQUFJSyxLQUFKLEtBQWMsQ0FBM0IsR0FBK0JMLElBQUlLLEtBQW5DLEdBQTJDLEdBSHJDO0FBSWRDLGdCQUFXTixJQUFJTSxRQUFKLElBQWdCTixJQUFJTSxRQUFKLEtBQWlCLENBQWpDLEdBQXFDTixJQUFJTSxRQUF6QyxHQUFvRCxFQUpqRDtBQUtkQyxnQkFBVVAsSUFBSU8sUUFMQTtBQU1kQyxtQkFBYSxDQUFDUixJQUFJUyxlQU5KO0FBT2RDLGFBQU8sQ0FBQyxDQUFDVixJQUFJVSxLQVBDO0FBUWRDLGtCQUFZLENBQUMsQ0FBQ1gsSUFBSVcsVUFS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UTlCZSxlQVI4QixTQVMzQkksZUFUMkIsR0FVOUJMLGdCQVY4QixHQUFaO0FBQUEsYUFBcEI7QUFZRDtBQUNELGNBQUl4QixNQUFNd0MsU0FBTixJQUFtQixDQUFDdEMsT0FBT2lCLFVBQS9CLEVBQTJDO0FBQ3pDakIsbUJBQU9pQixVQUFQLEdBQW9CO0FBQUEscUJBQ2xCbkQsU0FBU21ELFVBQVQsa0JBQ0UzQyxHQURGLEVBRUUwQixNQUZGLEVBR0VvQixRQUhGLEVBSUV0QixNQUFNc0MsSUFBTixDQUFXQyxFQUpiLEVBS0V2QyxNQUFNcUQsTUFMUixFQU1FckQsTUFBTVUsVUFOUixFQU9FZSxlQVBGLFNBUUtNLGVBUkwsRUFEa0I7QUFBQSxhQUFwQjtBQVdEO0FBQ0Q7QUFDRDs7QUFFRDtBQS9TRjtBQWlUQSxXQUFPN0IsTUFBUDtBQUNEO0FBamFZLENBQWYiLCJmaWxlIjoiY29sdW1uLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVXRpbHMgZnJvbSAnLi4vZGF0YWdyaWQudXRpbHMnO1xuaW1wb3J0IHtcbiAgRGF0ZVR5cGUsXG4gIFNlbGVjdFR5cGUsXG4gIEJvb2xlYW5UeXBlLFxuICBDaGVja2JveFR5cGUsXG4gIEN1cnJlbmN5VHlwZSxcbiAgUHJpbWl0aXZlVHlwZSxcbiAgTXVsdGlTZWxlY3RUeXBlLFxufSBmcm9tICcuL2NvbHVtbi10eXBlcy9jb2x1bW4tdHlwZXMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGJhc2VDb2x1bW4oY29sKSB7XG4gICAgY29uc3QgYmFzZUNvbCA9IHtcbiAgICAgIGhlYWRlcjogY29sLmhlYWRlcixcbiAgICAgIGNvbHVtbktleTogVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCksXG4gICAgICB3aWR0aDogKGNvbC53aWR0aCB8fCBjb2wud2lkdGggPT09IDAgPyBjb2wud2lkdGggOiAyMDApLFxuICAgICAgbWluV2lkdGg6IChjb2wubWluV2lkdGggfHwgY29sLm1pbldpZHRoID09PSAwID8gY29sLm1pbldpZHRoIDogNDApLFxuICAgICAgbWF4V2lkdGg6IGNvbC5tYXhXaWR0aCxcbiAgICAgIGlzUmVzaXphYmxlOiAhY29sLmRpc2FibGVSZXNpemluZyxcbiAgICAgIGZpeGVkOiAhIWNvbC5maXhlZCxcbiAgICAgIGZpeGVkUmlnaHQ6ICEhY29sLmZpeGVkUmlnaHQsXG4gICAgICBhbGxvd0NlbGxzUmVjeWNsaW5nOiAhIWNvbC5hbGxvd0NlbGxzUmVjeWNsaW5nLFxuICAgICAgZGlzYWJsZVNvcnRpbmc6ICEhY29sLmRpc2FibGVTb3J0aW5nLFxuICAgICAgaXNSZXF1aXJlZDogISFjb2wuaXNSZXF1aXJlZCxcbiAgICAgIGNvbXBvbmVudFR5cGU6IGNvbC5jb21wb25lbnRUeXBlLFxuICAgICAgc3R5bGU6IFV0aWxzLmdldENlbGxTdHlsZUJ5Q29sKGNvbCksXG4gICAgfTtcbiAgICAvLyB2YWx1ZUtleVBhdGhcbiAgICBpZiAoY29sLnZhbHVlS2V5UGF0aCkgYmFzZUNvbC52YWx1ZUtleVBhdGggPSBjb2wudmFsdWVLZXlQYXRoO1xuICAgIC8vIGZsZXhHcm93XG4gICAgaWYgKGNvbC5mbGV4R3JvdykgYmFzZUNvbC5mbGV4R3JvdyA9IGNvbC5mbGV4R3JvdztcbiAgICAvLyB2YWx1ZVR5cGVcbiAgICBpZiAoY29sLnZhbHVlVHlwZSkgYmFzZUNvbC52YWx1ZVR5cGUgPSBjb2wudmFsdWVUeXBlO1xuICAgIC8vIHNvcnRDb21wYXJhdG9yXG4gICAgaWYgKGNvbC5zb3J0Q29tcGFyYXRvcikgYmFzZUNvbC5zb3J0Q29tcGFyYXRvciA9IGNvbC5zb3J0Q29tcGFyYXRvcjtcbiAgICAvLyBzb3J0VmFsdWVHZXR0ZXJcbiAgICBpZiAoY29sLnNvcnRWYWx1ZUdldHRlcikgYmFzZUNvbC5zb3J0VmFsdWVHZXR0ZXIgPSBjb2wuc29ydFZhbHVlR2V0dGVyO1xuICAgIHJldHVybiBiYXNlQ29sO1xuICB9LFxuXG4gIGNvbHVtbkNlbGwoYmFzZUNvbHVtbiwgcHJvcHMsIGNvbCwgYmFzZVZhbHVlUmVuZGVyKSB7XG4gICAgY29uc3QgY29sdW1uID0gYmFzZUNvbHVtbjtcbiAgICBpZiAoY29sLmNlbGwpIHtcbiAgICAgIGNvbHVtbi5jZWxsID0gY29sLmNlbGw7XG4gICAgfSBlbHNlIGlmIChjb2wudmFsdWVSZW5kZXIpIHtcbiAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gY29sLnZhbHVlUmVuZGVyKHByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSwgcm93SW5kZXgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzd2l0Y2ggKGNvbC52YWx1ZVR5cGUpIHtcbiAgICAgICAgY2FzZSAnbnVtYmVyJzogLy8gZmFsbCB0aHJvdWdoXG4gICAgICAgIGNhc2UgJ2Zsb2F0Jzoge1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gUHJpbWl0aXZlVHlwZS5udW1iZXJWYWxSZW5kZXIoY29sLCByb3dJbmRleCwgYmFzZVZhbHVlUmVuZGVyKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgJ2Jvb2xlYW4nOiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBCb29sZWFuVHlwZS52YWxSZW5kZXIoY29sLCByb3dJbmRleCwgYmFzZVZhbHVlUmVuZGVyKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgJ2NoZWNrYm94Jzoge1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gQ2hlY2tib3hUeXBlLnZhbFJlbmRlcihyb3dJbmRleCwgYmFzZVZhbHVlUmVuZGVyKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgJ2RhdGUnOiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBEYXRlVHlwZS52YWxSZW5kZXIocm93SW5kZXgsIHByb3BzLmRhdGVGb3JtYXQsIGJhc2VWYWx1ZVJlbmRlcik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY2hhbmdlIHZhbFJlbmRlcnMgdG8ganVzdCB0YWtlIHByb3BzIC0tPiBzYXZlcyBzb21lICdlbmVyZ3knXG4gICAgICAgIGNhc2UgJ2N1cnJlbmN5Jzoge1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gQ3VycmVuY3lUeXBlLnZhbFJlbmRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIHByb3BzLmRhdGEsXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHByb3BzLnRob3VzYW5kU2VwYXJhdG9yLFxuICAgICAgICAgICAgcHJvcHMuZGVjaW1hbFNlcGFyYXRvcixcbiAgICAgICAgICAgIGJhc2VWYWx1ZVJlbmRlcixcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gYmFzZVZhbHVlUmVuZGVyKHJvd0luZGV4KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBjZWxsRWRpdCByZW5kZXJcbiAgICBpZiAoY29sLmNlbGxFZGl0KSB7XG4gICAgICBjb2x1bW4uY2VsbEVkaXQgPSBjb2wuY2VsbEVkaXQ7XG4gICAgfSBlbHNlIGlmIChjb2wuZWRpdFZhbHVlUmVuZGVyKSB7XG4gICAgICBjb2x1bW4uY2VsbEVkaXQgPSAocm93SW5kZXgsIHNldFJlZiwgb25LZXlEb3duKSA9PlxuICAgICAgICBjb2wuZWRpdFZhbHVlUmVuZGVyKHByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSwgcm93SW5kZXgsIHNldFJlZiwgb25LZXlEb3duKTtcbiAgICB9XG5cbiAgICAvLyBjZWxsQ3JlYXRlIHJlbmRlclxuICAgIGlmIChjb2wuY2VsbENyZWF0ZSkge1xuICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSBjb2wuY2VsbENyZWF0ZTtcbiAgICB9IGVsc2UgaWYgKGNvbC5jcmVhdGVWYWx1ZVJlbmRlcikge1xuICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSAocm93SW5kZXgsIHNldFJlZiwgb25LZXlEb3duKSA9PlxuICAgICAgICBjb2wuY3JlYXRlVmFsdWVSZW5kZXIocHJvcHMuZGF0YS5nZXQocm93SW5kZXgpLCByb3dJbmRleCwgc2V0UmVmLCBvbktleURvd24pO1xuICAgIH1cblxuICAgIC8vIGNlbGxGaWx0ZXIgcmVuZGVyXG4gICAgaWYgKGNvbC5jZWxsRmlsdGVyKSB7XG4gICAgICBjb2x1bW4uY2VsbEZpbHRlciA9IGNvbC5jZWxsRmlsdGVyO1xuICAgIH0gZWxzZSBpZiAoY29sLmZpbHRlclZhbHVlUmVuZGVyKSB7XG4gICAgICBjb2x1bW4uY2VsbEZpbHRlciA9IHJvd0luZGV4ID0+XG4gICAgICAgIGNvbC5maWx0ZXJWYWx1ZVJlbmRlcihwcm9wcy5kYXRhLmdldChyb3dJbmRleCksIHJvd0luZGV4KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbHVtbjtcbiAgfSxcblxuICBjb2x1bW5Db21wb25lbnRUeXBlKGJhc2VDb2x1bW4sIHRhYkluZGV4LCBwcm9wcywgY29sLCBmdW5jdGlvbnMsIGdldERpc2FibGVkU3RhdGUpIHtcbiAgICBpZiAoIWNvbC5jb21wb25lbnRUeXBlKSByZXR1cm4gYmFzZUNvbHVtbjtcbiAgICBjb25zdCBjb2x1bW4gPSBiYXNlQ29sdW1uO1xuICAgIGxldCBlZGl0VmFsdWVQYXJzZXIgPSBjb2wuZWRpdFZhbHVlUGFyc2VyID8gY29sLmVkaXRWYWx1ZVBhcnNlciA6IHZhbCA9PiB2YWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAvLyBHcmlkIGludGVybmFsIGZ1bmN0aW9ucyBzZXBhcmF0ZWRcbiAgICBjb25zdCBlZGl0RnVuY3Rpb25zID0geyAuLi5mdW5jdGlvbnMuZWRpdCB9O1xuICAgIGNvbnN0IGNyZWF0ZUZ1bmN0aW9ucyA9IHsgLi4uZnVuY3Rpb25zLmNyZWF0ZSB9O1xuICAgIGNvbnN0IGZpbHRlckZ1bmN0aW9ucyA9IHsgLi4uZnVuY3Rpb25zLmZpbHRlciB9O1xuICAgIHN3aXRjaCAoY29sLmNvbXBvbmVudFR5cGUpIHtcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICd0ZXh0Jzoge1xuICAgICAgICBjb25zdCBmb3JtQ29udHJvbFR5cGUgPSBjb2wuY29tcG9uZW50VHlwZSA9PT0gJ2Zsb2F0JyB8fCBjb2wuY29tcG9uZW50VHlwZSA9PT0gJ251bWJlcicgPyAndGV4dCcgOiBjb2wuY29tcG9uZW50VHlwZTtcbiAgICAgICAgLy8gYWx3YXlzIHVzZSBjb2wuZWRpdFZhbHVlUGFyc2VyIG92ZXJyaWRlIGlmIGF2YWlsYWJsZVxuICAgICAgICBjb25zdCBwcmltaXRpdmVWYWxQYXJzZXIgPSAhY29sLmVkaXRWYWx1ZVBhcnNlciAmJiBjb2wuY29tcG9uZW50VHlwZSA9PT0gJ2Zsb2F0JyA/XG4gICAgICAgICAgKHZhbCA9PiB2YWwucmVwbGFjZShuZXcgUmVnRXhwKGBbXlxcXFxkJHtwcm9wcy5kZWNpbWFsU2VwYXJhdG9yfSstXWAsICdnJyksICcnKSkgOiBlZGl0VmFsdWVQYXJzZXI7XG5cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+XG4gICAgICAgICAgICBQcmltaXRpdmVUeXBlLmNlbGxFZGl0KFxuICAgICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgICBwcmltaXRpdmVWYWxQYXJzZXIsXG4gICAgICAgICAgICAgIGZvcm1Db250cm9sVHlwZSxcbiAgICAgICAgICAgICAgLi4uZWRpdEZ1bmN0aW9ucyxcbiAgICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IFByaW1pdGl2ZVR5cGUuY2VsbENyZWF0ZShcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgcHJpbWl0aXZlVmFsUGFyc2VyLFxuICAgICAgICAgICAgZm9ybUNvbnRyb2xUeXBlLFxuICAgICAgICAgICAgLi4uY3JlYXRlRnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IFByaW1pdGl2ZVR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByaW1pdGl2ZVZhbFBhcnNlcixcbiAgICAgICAgICAgIGZvcm1Db250cm9sVHlwZSxcbiAgICAgICAgICAgIC4uLmZpbHRlckZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlICdjaGVja2JveCc6IHtcbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IENoZWNrYm94VHlwZS5jZWxsRWRpdChcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgLi4uZWRpdEZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gQ2hlY2tib3hUeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIC4uLmNyZWF0ZUZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5maWx0ZXJpbmcgJiYgIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PlxuICAgICAgICAgICAgQ2hlY2tib3hUeXBlLmNlbGxGaWx0ZXIoXG4gICAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgICAgcHJvcHMuaW50bCxcbiAgICAgICAgICAgICAgLi4uZmlsdGVyRnVuY3Rpb25zLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSAnbXVsdGlzZWxlY3QnOiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50T3B0aW9ucyB8fFxuICAgICAgICAgIHByb3BzLnNlbGVjdENvbXBvbmVudE9wdGlvbnMuZ2V0KGNvbHVtbi5jb2x1bW5LZXkpO1xuICAgICAgICBjb25zdCBzZWxlY3RUcmFuc2xhdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50VHJhbnNsYXRpb25zIHx8XG4gICAgICAgICAge1xuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5TZWxlY3QnIH0pLFxuICAgICAgICAgICAgbm9SZXN1bHRzVGV4dDogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0Lk5vUmVzdWx0cycgfSksXG4gICAgICAgICAgICAvLyBWYXJpYWJsZSAnbicgbXVzdCBiZSBwcm92aWRlZCBpbiB0aGlzIHBoYXNlIGluIG9yZGVyIHRvIGF2b2lkXG4gICAgICAgICAgICAvLyBFcnJvcjogVGhlIGludGwgc3RyaW5nIGNvbnRleHQgdmFyaWFibGUgJ24nIHdhcyBub3QgcHJvdmlkZWQgdG8gdGhlIHN0cmluZyB7bn1cbiAgICAgICAgICAgIC8vIHNlbGVjdGVkXG4gICAgICAgICAgICAvLyBWYXJpYWJsZSBuIGlzIHJlcGxhY2VkIGxhdGVyLCB3aGVuIGl0cyB2YWx1ZSBpcyBhdmFpbGFibGVcbiAgICAgICAgICAgIHNlbGVjdGVkOiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuU2VsZWN0ZWQnIH0sIHsgbjogJzxuPicgfSksXG4gICAgICAgICAgfTtcblxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT5cbiAgICAgICAgICAgIFNlbGVjdFR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+XG4gICAgICAgICAgICBTZWxlY3RUeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgICAuLi5jcmVhdGVGdW5jdGlvbnMsXG4gICAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5maWx0ZXJpbmcgJiYgIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PlxuICAgICAgICAgICAgTXVsdGlTZWxlY3RUeXBlLmNlbGxGaWx0ZXIoXG4gICAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAgIC4uLmZpbHRlckZ1bmN0aW9ucyxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ3NlbGVjdCc6IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0T3B0aW9ucyA9IGNvbC5zZWxlY3RDb21wb25lbnRPcHRpb25zIHx8XG4gICAgICAgICAgcHJvcHMuc2VsZWN0Q29tcG9uZW50T3B0aW9ucy5nZXQoY29sdW1uLmNvbHVtbktleSk7XG4gICAgICAgIGNvbnN0IHNlbGVjdFRyYW5zbGF0aW9ucyA9IGNvbC5zZWxlY3RDb21wb25lbnRUcmFuc2xhdGlvbnMgfHxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0LlNlbGVjdCcgfSksXG4gICAgICAgICAgICBub1Jlc3VsdHNUZXh0OiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuTm9SZXN1bHRzJyB9KSxcbiAgICAgICAgICB9O1xuXG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PlxuICAgICAgICAgICAgU2VsZWN0VHlwZS5jZWxsRWRpdChcbiAgICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT5cbiAgICAgICAgICAgIFNlbGVjdFR5cGUuY2VsbENyZWF0ZShcbiAgICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAgIC4uLmNyZWF0ZUZ1bmN0aW9ucyxcbiAgICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+XG4gICAgICAgICAgICBTZWxlY3RUeXBlLmNlbGxGaWx0ZXIoXG4gICAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAgIC4uLmZpbHRlckZ1bmN0aW9ucyxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBbXG4gICAgICAgICAgeyB2YWx1ZTogdHJ1ZSwgbGFiZWw6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5ZZXMnIH0pIH0sXG4gICAgICAgICAgeyB2YWx1ZTogZmFsc2UsIGxhYmVsOiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuTm8nIH0pIH0sXG4gICAgICAgIF07XG4gICAgICAgIGNvbnN0IHNlbGVjdFRyYW5zbGF0aW9ucyA9IGNvbC5zZWxlY3RDb21wb25lbnRUcmFuc2xhdGlvbnMgfHwge1xuICAgICAgICAgIHBsYWNlaG9sZGVyOiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuU2VsZWN0JyB9KSxcbiAgICAgICAgICBub1Jlc3VsdHNUZXh0OiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuTm9SZXN1bHRzJyB9KSxcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT5cbiAgICAgICAgICAgIEJvb2xlYW5UeXBlLmNlbGxFZGl0KFxuICAgICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgICAgLi4uZWRpdEZ1bmN0aW9ucyxcbiAgICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PlxuICAgICAgICAgICAgQm9vbGVhblR5cGUuY2VsbENyZWF0ZShcbiAgICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAgIC4uLmNyZWF0ZUZ1bmN0aW9ucyxcbiAgICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+XG4gICAgICAgICAgICBCb29sZWFuVHlwZS5jZWxsRmlsdGVyKFxuICAgICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgICAuLi5maWx0ZXJGdW5jdGlvbnMsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlICdkYXRlJzoge1xuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gRGF0ZVR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByb3BzLnJlZ2lvbixcbiAgICAgICAgICAgIHByb3BzLmRhdGVGb3JtYXQsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gRGF0ZVR5cGUuY2VsbENyZWF0ZShcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgcHJvcHMucmVnaW9uLFxuICAgICAgICAgICAgcHJvcHMuZGF0ZUZvcm1hdCxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmNyZWF0ZUZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuZmlsdGVyaW5nICYmICFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT5cbiAgICAgICAgICAgIERhdGVUeXBlLmNlbGxGaWx0ZXIoXG4gICAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgICAgcHJvcHMucmVnaW9uLFxuICAgICAgICAgICAgICBwcm9wcy5kYXRlRm9ybWF0LFxuICAgICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAgIC4uLmZpbHRlckZ1bmN0aW9ucyxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgfVxuICAgIHJldHVybiBjb2x1bW47XG4gIH0sXG59O1xuIl19