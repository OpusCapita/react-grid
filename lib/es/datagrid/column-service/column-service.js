var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import Utils from '../datagrid.utils';
import { DateType, SelectType, BooleanType, CheckboxType, CurrencyType, PrimitiveType } from './column-types/column-types';

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

      case 'select':
        {
          var selectOptions = col.selectComponentOptions || props.selectComponentOptions.get(column.columnKey);
          var selectTranslations = col.selectComponentTranslations || {
            placeholder: props.intl.formatMessage({ id: 'Grid.FloatingSelect.Select' }),
            noResultsText: props.intl.formatMessage({ id: 'Grid.FloatingSelect.NoResults' })
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
              return SelectType.cellFilter.apply(SelectType, [col, column, tabIndex, props.grid.id, selectOptions, selectTranslations, editValueParser].concat(filterFunctions));
            };
          }
          break;
        }

      case 'boolean':
        {
          var _selectOptions = [{ value: true, label: props.intl.formatMessage({ id: 'Grid.Yes' }) }, { value: false, label: props.intl.formatMessage({ id: 'Grid.No' }) }];
          var _selectTranslations = col.selectComponentTranslations || {
            placeholder: props.intl.formatMessage({ id: 'Grid.FloatingSelect.Select' }),
            noResultsText: props.intl.formatMessage({ id: 'Grid.FloatingSelect.NoResults' })
          };

          if (props.inlineEdit && !column.cellEdit) {
            column.cellEdit = function (rowIndex) {
              return BooleanType.cellEdit.apply(BooleanType, [col, column, rowIndex, tabIndex, props.grid.id, _selectOptions, _selectTranslations, editValueParser].concat(editFunctions, [getDisabledState]));
            };
          }
          if (props.inlineEdit && !column.cellCreate) {
            column.cellCreate = function (rowIndex) {
              return BooleanType.cellCreate.apply(BooleanType, [col, column, rowIndex, tabIndex, props.grid.id, _selectOptions, _selectTranslations, editValueParser].concat(createFunctions, [getDisabledState]));
            };
          }
          if (props.filtering && !column.cellFilter) {
            column.cellFilter = function () {
              return BooleanType.cellFilter.apply(BooleanType, [col, column, tabIndex, props.grid.id, _selectOptions, _selectTranslations, editValueParser].concat(filterFunctions));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2VydmljZS9jb2x1bW4tc2VydmljZS5qc3giXSwibmFtZXMiOlsiVXRpbHMiLCJEYXRlVHlwZSIsIlNlbGVjdFR5cGUiLCJCb29sZWFuVHlwZSIsIkNoZWNrYm94VHlwZSIsIkN1cnJlbmN5VHlwZSIsIlByaW1pdGl2ZVR5cGUiLCJiYXNlQ29sdW1uIiwiY29sIiwiYmFzZUNvbCIsImhlYWRlciIsImNvbHVtbktleSIsImdldENvbHVtbktleSIsIndpZHRoIiwibWluV2lkdGgiLCJtYXhXaWR0aCIsImlzUmVzaXphYmxlIiwiZGlzYWJsZVJlc2l6aW5nIiwiZml4ZWQiLCJhbGxvd0NlbGxzUmVjeWNsaW5nIiwiZGlzYWJsZVNvcnRpbmciLCJpc1JlcXVpcmVkIiwiY29tcG9uZW50VHlwZSIsInN0eWxlIiwiZ2V0Q2VsbFN0eWxlQnlDb2wiLCJ2YWx1ZUtleVBhdGgiLCJmbGV4R3JvdyIsInZhbHVlVHlwZSIsInNvcnRDb21wYXJhdG9yIiwic29ydFZhbHVlR2V0dGVyIiwiY29sdW1uQ2VsbCIsInByb3BzIiwiYmFzZVZhbHVlUmVuZGVyIiwiY29sdW1uIiwiY2VsbCIsInZhbHVlUmVuZGVyIiwiZGF0YSIsImdldCIsInJvd0luZGV4IiwibnVtYmVyVmFsUmVuZGVyIiwidmFsUmVuZGVyIiwiZGF0ZUZvcm1hdCIsInRob3VzYW5kU2VwYXJhdG9yIiwiZGVjaW1hbFNlcGFyYXRvciIsImNlbGxFZGl0IiwiZWRpdFZhbHVlUmVuZGVyIiwiY2VsbENyZWF0ZSIsImNyZWF0ZVZhbHVlUmVuZGVyIiwiY2VsbEZpbHRlciIsImZpbHRlclZhbHVlUmVuZGVyIiwiY29sdW1uQ29tcG9uZW50VHlwZSIsInRhYkluZGV4IiwiZnVuY3Rpb25zIiwiZ2V0RGlzYWJsZWRTdGF0ZSIsImVkaXRWYWx1ZVBhcnNlciIsInZhbCIsImVkaXRGdW5jdGlvbnMiLCJlZGl0IiwiY3JlYXRlRnVuY3Rpb25zIiwiY3JlYXRlIiwiZmlsdGVyRnVuY3Rpb25zIiwiZmlsdGVyIiwiZm9ybUNvbnRyb2xUeXBlIiwicHJpbWl0aXZlVmFsUGFyc2VyIiwicmVwbGFjZSIsIlJlZ0V4cCIsImlubGluZUVkaXQiLCJncmlkIiwiaWQiLCJmaWx0ZXJpbmciLCJpbnRsIiwic2VsZWN0T3B0aW9ucyIsInNlbGVjdENvbXBvbmVudE9wdGlvbnMiLCJzZWxlY3RUcmFuc2xhdGlvbnMiLCJzZWxlY3RDb21wb25lbnRUcmFuc2xhdGlvbnMiLCJwbGFjZWhvbGRlciIsImZvcm1hdE1lc3NhZ2UiLCJub1Jlc3VsdHNUZXh0IiwidmFsdWUiLCJsYWJlbCIsInJlZ2lvbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPQSxLQUFQLE1BQWtCLG1CQUFsQjtBQUNBLFNBQ0VDLFFBREYsRUFFRUMsVUFGRixFQUdFQyxXQUhGLEVBSUVDLFlBSkYsRUFLRUMsWUFMRixFQU1FQyxhQU5GLFFBT08sNkJBUFA7O0FBU0EsZUFBZTtBQUNiQyxZQURhLHNCQUNGQyxHQURFLEVBQ0c7QUFDZCxRQUFNQyxVQUFVO0FBQ2RDLGNBQVFGLElBQUlFLE1BREU7QUFFZEMsaUJBQVdYLE1BQU1ZLFlBQU4sQ0FBbUJKLEdBQW5CLENBRkc7QUFHZEssYUFBUUwsSUFBSUssS0FBSixJQUFhTCxJQUFJSyxLQUFKLEtBQWMsQ0FBM0IsR0FBK0JMLElBQUlLLEtBQW5DLEdBQTJDLEdBSHJDO0FBSWRDLGdCQUFXTixJQUFJTSxRQUFKLElBQWdCTixJQUFJTSxRQUFKLEtBQWlCLENBQWpDLEdBQXFDTixJQUFJTSxRQUF6QyxHQUFvRCxFQUpqRDtBQUtkQyxnQkFBVVAsSUFBSU8sUUFMQTtBQU1kQyxtQkFBYSxDQUFDUixJQUFJUyxlQU5KO0FBT2RDLGFBQU8sQ0FBQyxDQUFDVixJQUFJVSxLQVBDO0FBUWRDLDJCQUFxQixDQUFDLENBQUNYLElBQUlXLG1CQVJiO0FBU2RDLHNCQUFnQixDQUFDLENBQUNaLElBQUlZLGNBVFI7QUFVZEMsa0JBQVksQ0FBQyxDQUFDYixJQUFJYSxVQVZKO0FBV2RD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QkUsYUFUeUIsR0FVNUJILGdCQVY0QixHQUFaO0FBQUEsYUFBbEI7QUFZRDtBQUNELGNBQUl0QixNQUFNbUMsVUFBTixJQUFvQixDQUFDakMsT0FBT2EsVUFBaEMsRUFBNEM7QUFDMUNiLG1CQUFPYSxVQUFQLEdBQW9CO0FBQUEscUJBQVk3QyxTQUFTNkMsVUFBVCxrQkFDOUJ0QyxHQUQ4QixFQUU5QnlCLE1BRjhCLEVBRzlCSyxRQUg4QixFQUk5QmEsUUFKOEIsRUFLOUJwQixNQUFNb0MsSUFBTixDQUFXQyxFQUxtQixFQU05QnJDLE1BQU1pRCxNQU53QixFQU85QmpELE1BQU1VLFVBUHdCLEVBUTlCYSxlQVI4QixTQVMzQkksZUFUMkIsR0FVOUJMLGdCQVY4QixHQUFaO0FBQUEsYUFBcEI7QUFZRDtBQUNELGNBQUl0QixNQUFNc0MsU0FBTixJQUFtQixDQUFDcEMsT0FBT2UsVUFBL0IsRUFBMkM7QUFDekNmLG1CQUFPZSxVQUFQLEdBQW9CO0FBQUEscUJBQ2xCL0MsU0FBUytDLFVBQVQsa0JBQ0V4QyxHQURGLEVBRUV5QixNQUZGLEVBR0VrQixRQUhGLEVBSUVwQixNQUFNb0MsSUFBTixDQUFXQyxFQUpiLEVBS0VyQyxNQUFNaUQsTUFMUixFQU1FakQsTUFBTVUsVUFOUixFQU9FYSxlQVBGLFNBUUtNLGVBUkwsRUFEa0I7QUFBQSxhQUFwQjtBQVdEO0FBQ0Q7QUFDRDs7QUFFRDtBQWxQRjtBQW9QQSxXQUFPM0IsTUFBUDtBQUNEO0FBaFdZLENBQWYiLCJmaWxlIjoiY29sdW1uLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVXRpbHMgZnJvbSAnLi4vZGF0YWdyaWQudXRpbHMnO1xuaW1wb3J0IHtcbiAgRGF0ZVR5cGUsXG4gIFNlbGVjdFR5cGUsXG4gIEJvb2xlYW5UeXBlLFxuICBDaGVja2JveFR5cGUsXG4gIEN1cnJlbmN5VHlwZSxcbiAgUHJpbWl0aXZlVHlwZSxcbn0gZnJvbSAnLi9jb2x1bW4tdHlwZXMvY29sdW1uLXR5cGVzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBiYXNlQ29sdW1uKGNvbCkge1xuICAgIGNvbnN0IGJhc2VDb2wgPSB7XG4gICAgICBoZWFkZXI6IGNvbC5oZWFkZXIsXG4gICAgICBjb2x1bW5LZXk6IFV0aWxzLmdldENvbHVtbktleShjb2wpLFxuICAgICAgd2lkdGg6IChjb2wud2lkdGggfHwgY29sLndpZHRoID09PSAwID8gY29sLndpZHRoIDogMjAwKSxcbiAgICAgIG1pbldpZHRoOiAoY29sLm1pbldpZHRoIHx8IGNvbC5taW5XaWR0aCA9PT0gMCA/IGNvbC5taW5XaWR0aCA6IDQwKSxcbiAgICAgIG1heFdpZHRoOiBjb2wubWF4V2lkdGgsXG4gICAgICBpc1Jlc2l6YWJsZTogIWNvbC5kaXNhYmxlUmVzaXppbmcsXG4gICAgICBmaXhlZDogISFjb2wuZml4ZWQsXG4gICAgICBhbGxvd0NlbGxzUmVjeWNsaW5nOiAhIWNvbC5hbGxvd0NlbGxzUmVjeWNsaW5nLFxuICAgICAgZGlzYWJsZVNvcnRpbmc6ICEhY29sLmRpc2FibGVTb3J0aW5nLFxuICAgICAgaXNSZXF1aXJlZDogISFjb2wuaXNSZXF1aXJlZCxcbiAgICAgIGNvbXBvbmVudFR5cGU6IGNvbC5jb21wb25lbnRUeXBlLFxuICAgICAgc3R5bGU6IFV0aWxzLmdldENlbGxTdHlsZUJ5Q29sKGNvbCksXG4gICAgfTtcbiAgICAvLyB2YWx1ZUtleVBhdGhcbiAgICBpZiAoY29sLnZhbHVlS2V5UGF0aCkgYmFzZUNvbC52YWx1ZUtleVBhdGggPSBjb2wudmFsdWVLZXlQYXRoO1xuICAgIC8vIGZsZXhHcm93XG4gICAgaWYgKGNvbC5mbGV4R3JvdykgYmFzZUNvbC5mbGV4R3JvdyA9IGNvbC5mbGV4R3JvdztcbiAgICAvLyB2YWx1ZVR5cGVcbiAgICBpZiAoY29sLnZhbHVlVHlwZSkgYmFzZUNvbC52YWx1ZVR5cGUgPSBjb2wudmFsdWVUeXBlO1xuICAgIC8vIHNvcnRDb21wYXJhdG9yXG4gICAgaWYgKGNvbC5zb3J0Q29tcGFyYXRvcikgYmFzZUNvbC5zb3J0Q29tcGFyYXRvciA9IGNvbC5zb3J0Q29tcGFyYXRvcjtcbiAgICAvLyBzb3J0VmFsdWVHZXR0ZXJcbiAgICBpZiAoY29sLnNvcnRWYWx1ZUdldHRlcikgYmFzZUNvbC5zb3J0VmFsdWVHZXR0ZXIgPSBjb2wuc29ydFZhbHVlR2V0dGVyO1xuICAgIHJldHVybiBiYXNlQ29sO1xuICB9LFxuXG4gIGNvbHVtbkNlbGwoYmFzZUNvbHVtbiwgcHJvcHMsIGNvbCwgYmFzZVZhbHVlUmVuZGVyKSB7XG4gICAgY29uc3QgY29sdW1uID0gYmFzZUNvbHVtbjtcbiAgICBpZiAoY29sLmNlbGwpIHtcbiAgICAgIGNvbHVtbi5jZWxsID0gY29sLmNlbGw7XG4gICAgfSBlbHNlIGlmIChjb2wudmFsdWVSZW5kZXIpIHtcbiAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gY29sLnZhbHVlUmVuZGVyKHByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSwgcm93SW5kZXgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzd2l0Y2ggKGNvbC52YWx1ZVR5cGUpIHtcbiAgICAgICAgY2FzZSAnbnVtYmVyJzogLy8gZmFsbCB0aHJvdWdoXG4gICAgICAgIGNhc2UgJ2Zsb2F0Jzoge1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gUHJpbWl0aXZlVHlwZS5udW1iZXJWYWxSZW5kZXIoY29sLCByb3dJbmRleCwgYmFzZVZhbHVlUmVuZGVyKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgJ2Jvb2xlYW4nOiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBCb29sZWFuVHlwZS52YWxSZW5kZXIoY29sLCByb3dJbmRleCwgYmFzZVZhbHVlUmVuZGVyKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgJ2NoZWNrYm94Jzoge1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gQ2hlY2tib3hUeXBlLnZhbFJlbmRlcihyb3dJbmRleCwgYmFzZVZhbHVlUmVuZGVyKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgJ2RhdGUnOiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBEYXRlVHlwZS52YWxSZW5kZXIocm93SW5kZXgsIHByb3BzLmRhdGVGb3JtYXQsIGJhc2VWYWx1ZVJlbmRlcik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY2hhbmdlIHZhbFJlbmRlcnMgdG8ganVzdCB0YWtlIHByb3BzIC0tPiBzYXZlcyBzb21lICdlbmVyZ3knXG4gICAgICAgIGNhc2UgJ2N1cnJlbmN5Jzoge1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gQ3VycmVuY3lUeXBlLnZhbFJlbmRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIHByb3BzLmRhdGEsXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHByb3BzLnRob3VzYW5kU2VwYXJhdG9yLFxuICAgICAgICAgICAgcHJvcHMuZGVjaW1hbFNlcGFyYXRvcixcbiAgICAgICAgICAgIGJhc2VWYWx1ZVJlbmRlcixcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gYmFzZVZhbHVlUmVuZGVyKHJvd0luZGV4KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBjZWxsRWRpdCByZW5kZXJcbiAgICBpZiAoY29sLmNlbGxFZGl0KSB7XG4gICAgICBjb2x1bW4uY2VsbEVkaXQgPSBjb2wuY2VsbEVkaXQ7XG4gICAgfSBlbHNlIGlmIChjb2wuZWRpdFZhbHVlUmVuZGVyKSB7XG4gICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiBjb2wuZWRpdFZhbHVlUmVuZGVyKHByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSwgcm93SW5kZXgpO1xuICAgIH1cblxuICAgIC8vIGNlbGxDcmVhdGUgcmVuZGVyXG4gICAgaWYgKGNvbC5jZWxsQ3JlYXRlKSB7XG4gICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IGNvbC5jZWxsQ3JlYXRlO1xuICAgIH0gZWxzZSBpZiAoY29sLmNyZWF0ZVZhbHVlUmVuZGVyKSB7XG4gICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IGNvbC5jcmVhdGVWYWx1ZVJlbmRlcihwcm9wcy5kYXRhLmdldChyb3dJbmRleCksIHJvd0luZGV4KTtcbiAgICB9XG5cbiAgICAvLyBjZWxsRmlsdGVyIHJlbmRlclxuICAgIGlmIChjb2wuY2VsbEZpbHRlcikge1xuICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSBjb2wuY2VsbEZpbHRlcjtcbiAgICB9IGVsc2UgaWYgKGNvbC5maWx0ZXJWYWx1ZVJlbmRlcikge1xuICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSByb3dJbmRleCA9PiBjb2wuZmlsdGVyVmFsdWVSZW5kZXIocHJvcHMuZGF0YS5nZXQocm93SW5kZXgpLCByb3dJbmRleCk7XG4gICAgfVxuICAgIHJldHVybiBjb2x1bW47XG4gIH0sXG5cbiAgY29sdW1uQ29tcG9uZW50VHlwZShiYXNlQ29sdW1uLCB0YWJJbmRleCwgcHJvcHMsIGNvbCwgZnVuY3Rpb25zLCBnZXREaXNhYmxlZFN0YXRlKSB7XG4gICAgaWYgKCFjb2wuY29tcG9uZW50VHlwZSkgcmV0dXJuIGJhc2VDb2x1bW47XG4gICAgY29uc3QgY29sdW1uID0gYmFzZUNvbHVtbjtcbiAgICBsZXQgZWRpdFZhbHVlUGFyc2VyID0gdmFsID0+IHZhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIC8vIEdyaWQgaW50ZXJuYWwgZnVuY3Rpb25zIHNlcGFyYXRlZFxuICAgIGNvbnN0IGVkaXRGdW5jdGlvbnMgPSB7IC4uLmZ1bmN0aW9ucy5lZGl0IH07XG4gICAgY29uc3QgY3JlYXRlRnVuY3Rpb25zID0geyAuLi5mdW5jdGlvbnMuY3JlYXRlIH07XG4gICAgY29uc3QgZmlsdGVyRnVuY3Rpb25zID0geyAuLi5mdW5jdGlvbnMuZmlsdGVyIH07XG4gICAgc3dpdGNoIChjb2wuY29tcG9uZW50VHlwZSkge1xuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ3RleHQnOiB7XG4gICAgICAgIGNvbnN0IGZvcm1Db250cm9sVHlwZSA9IGNvbC5jb21wb25lbnRUeXBlID09PSAnZmxvYXQnIHx8IGNvbC5jb21wb25lbnRUeXBlID09PSAnbnVtYmVyJyA/ICd0ZXh0JyA6IGNvbC5jb21wb25lbnRUeXBlO1xuICAgICAgICBjb25zdCBwcmltaXRpdmVWYWxQYXJzZXIgPSBjb2wuY29tcG9uZW50VHlwZSA9PT0gJ2Zsb2F0JyA/XG4gICAgICAgICAgKHZhbCA9PiB2YWwucmVwbGFjZShuZXcgUmVnRXhwKGBbXlxcXFxkJHtwcm9wcy5kZWNpbWFsU2VwYXJhdG9yfSstXWAsICdnJyksICcnKSkgOiBlZGl0VmFsdWVQYXJzZXI7XG5cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+XG4gICAgICAgICAgICBQcmltaXRpdmVUeXBlLmNlbGxFZGl0KFxuICAgICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgICBwcmltaXRpdmVWYWxQYXJzZXIsXG4gICAgICAgICAgICAgIGZvcm1Db250cm9sVHlwZSxcbiAgICAgICAgICAgICAgLi4uZWRpdEZ1bmN0aW9ucyxcbiAgICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IFByaW1pdGl2ZVR5cGUuY2VsbENyZWF0ZShcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgcHJpbWl0aXZlVmFsUGFyc2VyLFxuICAgICAgICAgICAgZm9ybUNvbnRyb2xUeXBlLFxuICAgICAgICAgICAgLi4uY3JlYXRlRnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IFByaW1pdGl2ZVR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByaW1pdGl2ZVZhbFBhcnNlcixcbiAgICAgICAgICAgIGZvcm1Db250cm9sVHlwZSxcbiAgICAgICAgICAgIC4uLmZpbHRlckZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlICdjaGVja2JveCc6IHtcbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IENoZWNrYm94VHlwZS5jZWxsRWRpdChcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgLi4uZWRpdEZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gQ2hlY2tib3hUeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIC4uLmNyZWF0ZUZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5maWx0ZXJpbmcgJiYgIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PlxuICAgICAgICAgICAgQ2hlY2tib3hUeXBlLmNlbGxGaWx0ZXIoXG4gICAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgICAgcHJvcHMuaW50bCxcbiAgICAgICAgICAgICAgLi4uZmlsdGVyRnVuY3Rpb25zLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSAnc2VsZWN0Jzoge1xuICAgICAgICBjb25zdCBzZWxlY3RPcHRpb25zID0gY29sLnNlbGVjdENvbXBvbmVudE9wdGlvbnMgfHxcbiAgICAgICAgICBwcm9wcy5zZWxlY3RDb21wb25lbnRPcHRpb25zLmdldChjb2x1bW4uY29sdW1uS2V5KTtcbiAgICAgICAgY29uc3Qgc2VsZWN0VHJhbnNsYXRpb25zID0gY29sLnNlbGVjdENvbXBvbmVudFRyYW5zbGF0aW9ucyB8fFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuU2VsZWN0JyB9KSxcbiAgICAgICAgICAgIG5vUmVzdWx0c1RleHQ6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5Ob1Jlc3VsdHMnIH0pLFxuICAgICAgICAgIH07XG5cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+XG4gICAgICAgICAgICBTZWxlY3RUeXBlLmNlbGxFZGl0KFxuICAgICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgICAgLi4uZWRpdEZ1bmN0aW9ucyxcbiAgICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PlxuICAgICAgICAgICAgU2VsZWN0VHlwZS5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgICAgLi4uY3JlYXRlRnVuY3Rpb25zLFxuICAgICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuZmlsdGVyaW5nICYmICFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT5cbiAgICAgICAgICAgIFNlbGVjdFR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgICAgLi4uZmlsdGVyRnVuY3Rpb25zLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSAnYm9vbGVhbic6IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0T3B0aW9ucyA9IFtcbiAgICAgICAgICB7IHZhbHVlOiB0cnVlLCBsYWJlbDogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLlllcycgfSkgfSxcbiAgICAgICAgICB7IHZhbHVlOiBmYWxzZSwgbGFiZWw6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5ObycgfSkgfSxcbiAgICAgICAgXTtcbiAgICAgICAgY29uc3Qgc2VsZWN0VHJhbnNsYXRpb25zID0gY29sLnNlbGVjdENvbXBvbmVudFRyYW5zbGF0aW9ucyB8fCB7XG4gICAgICAgICAgcGxhY2Vob2xkZXI6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5TZWxlY3QnIH0pLFxuICAgICAgICAgIG5vUmVzdWx0c1RleHQ6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5Ob1Jlc3VsdHMnIH0pLFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PlxuICAgICAgICAgICAgQm9vbGVhblR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+XG4gICAgICAgICAgICBCb29sZWFuVHlwZS5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgICAgLi4uY3JlYXRlRnVuY3Rpb25zLFxuICAgICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuZmlsdGVyaW5nICYmICFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT5cbiAgICAgICAgICAgIEJvb2xlYW5UeXBlLmNlbGxGaWx0ZXIoXG4gICAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAgIC4uLmZpbHRlckZ1bmN0aW9ucyxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ2RhdGUnOiB7XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiBEYXRlVHlwZS5jZWxsRWRpdChcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgcHJvcHMucmVnaW9uLFxuICAgICAgICAgICAgcHJvcHMuZGF0ZUZvcm1hdCxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiBEYXRlVHlwZS5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBwcm9wcy5yZWdpb24sXG4gICAgICAgICAgICBwcm9wcy5kYXRlRm9ybWF0LFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uY3JlYXRlRnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5maWx0ZXJpbmcgJiYgIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PlxuICAgICAgICAgICAgRGF0ZVR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgICBwcm9wcy5yZWdpb24sXG4gICAgICAgICAgICAgIHByb3BzLmRhdGVGb3JtYXQsXG4gICAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgICAgLi4uZmlsdGVyRnVuY3Rpb25zLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgZGVmYXVsdDpcbiAgICB9XG4gICAgcmV0dXJuIGNvbHVtbjtcbiAgfSxcbn07XG4iXX0=