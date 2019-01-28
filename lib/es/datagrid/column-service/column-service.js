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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2VydmljZS9jb2x1bW4tc2VydmljZS5qc3giXSwibmFtZXMiOlsiVXRpbHMiLCJEYXRlVHlwZSIsIlNlbGVjdFR5cGUiLCJCb29sZWFuVHlwZSIsIkNoZWNrYm94VHlwZSIsIkN1cnJlbmN5VHlwZSIsIlByaW1pdGl2ZVR5cGUiLCJiYXNlQ29sdW1uIiwiY29sIiwiYmFzZUNvbCIsImhlYWRlciIsImNvbHVtbktleSIsImdldENvbHVtbktleSIsIndpZHRoIiwibWluV2lkdGgiLCJtYXhXaWR0aCIsImlzUmVzaXphYmxlIiwiZGlzYWJsZVJlc2l6aW5nIiwiZml4ZWQiLCJmaXhlZFJpZ2h0IiwiYWxsb3dDZWxsc1JlY3ljbGluZyIsImRpc2FibGVTb3J0aW5nIiwiaXNSZXF1aXJlZCIsImNvbXBvbmVudFR5cGUiLCJzdHlsZSIsImdldENlbGxTdHlsZUJ5Q29sIiwidmFsdWVLZXlQYXRoIiwiZmxleEdyb3ciLCJ2YWx1ZVR5cGUiLCJzb3J0Q29tcGFyYXRvciIsInNvcnRWYWx1ZUdldHRlciIsImNvbHVtbkNlbGwiLCJwcm9wcyIsImJhc2VWYWx1ZVJlbmRlciIsImNvbHVtbiIsImNlbGwiLCJ2YWx1ZVJlbmRlciIsImRhdGEiLCJnZXQiLCJyb3dJbmRleCIsIm51bWJlclZhbFJlbmRlciIsInZhbFJlbmRlciIsImRhdGVGb3JtYXQiLCJ0aG91c2FuZFNlcGFyYXRvciIsImRlY2ltYWxTZXBhcmF0b3IiLCJjZWxsRWRpdCIsImVkaXRWYWx1ZVJlbmRlciIsImNlbGxDcmVhdGUiLCJjcmVhdGVWYWx1ZVJlbmRlciIsImNlbGxGaWx0ZXIiLCJmaWx0ZXJWYWx1ZVJlbmRlciIsImNvbHVtbkNvbXBvbmVudFR5cGUiLCJ0YWJJbmRleCIsImZ1bmN0aW9ucyIsImdldERpc2FibGVkU3RhdGUiLCJlZGl0VmFsdWVQYXJzZXIiLCJ2YWwiLCJlZGl0RnVuY3Rpb25zIiwiZWRpdCIsImNyZWF0ZUZ1bmN0aW9ucyIsImNyZWF0ZSIsImZpbHRlckZ1bmN0aW9ucyIsImZpbHRlciIsImZvcm1Db250cm9sVHlwZSIsInByaW1pdGl2ZVZhbFBhcnNlciIsInJlcGxhY2UiLCJSZWdFeHAiLCJpbmxpbmVFZGl0IiwiZ3JpZCIsImlkIiwiZmlsdGVyaW5nIiwiaW50bCIsInNlbGVjdE9wdGlvbnMiLCJzZWxlY3RDb21wb25lbnRPcHRpb25zIiwic2VsZWN0VHJhbnNsYXRpb25zIiwic2VsZWN0Q29tcG9uZW50VHJhbnNsYXRpb25zIiwicGxhY2Vob2xkZXIiLCJmb3JtYXRNZXNzYWdlIiwibm9SZXN1bHRzVGV4dCIsInZhbHVlIiwibGFiZWwiLCJyZWdpb24iXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixtQkFBbEI7QUFDQSxTQUNFQyxRQURGLEVBRUVDLFVBRkYsRUFHRUMsV0FIRixFQUlFQyxZQUpGLEVBS0VDLFlBTEYsRUFNRUMsYUFORixRQU9PLDZCQVBQOztBQVNBLGVBQWU7QUFDYkMsWUFEYSxzQkFDRkMsR0FERSxFQUNHO0FBQ2QsUUFBTUMsVUFBVTtBQUNkQyxjQUFRRixJQUFJRSxNQURFO0FBRWRDLGlCQUFXWCxNQUFNWSxZQUFOLENBQW1CSixHQUFuQixDQUZHO0FBR2RLLGFBQVFMLElBQUlLLEtBQUosSUFBYUwsSUFBSUssS0FBSixLQUFjLENBQTNCLEdBQStCTCxJQUFJSyxLQUFuQyxHQUEyQyxHQUhyQztBQUlkQyxnQkFBV04sSUFBSU0sUUFBSixJQUFnQk4sSUFBSU0sUUFBSixLQUFpQixDQUFqQyxHQUFxQ04sSUFBSU0sUUFBekMsR0FBb0QsRUFKakQ7QUFLZEMsZ0JBQVVQLElBQUlPLFFBTEE7QUFNZEMsbUJBQWEsQ0FBQ1IsSUFBSVMsZUFOSjtBQU9kQyxhQUFPLENBQUMsQ0FBQ1YsSUFBSVUsS0FQQztBQVFkQyxrQkFBWSxDQUFDLENBQUNYLElBQUlXLFVBUko7QUFTZEMsMkJBQXFCLENBQUMsQ0FBQ1osSUFBSVksbUJBVGI7QUFVZEMsc0JBQWdCLENBQUMsQ0FBQ2IsSUFB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QU1pRCxNQU5zQixFQU81QmpELE1BQU1VLFVBUHNCLEVBUTVCYSxlQVI0QixTQVN6QkUsYUFUeUIsR0FVNUJILGdCQVY0QixHQUFaO0FBQUEsYUFBbEI7QUFZRDtBQUNELGNBQUl0QixNQUFNbUMsVUFBTixJQUFvQixDQUFDakMsT0FBT2EsVUFBaEMsRUFBNEM7QUFDMUNiLG1CQUFPYSxVQUFQLEdBQW9CO0FBQUEscUJBQVk5QyxTQUFTOEMsVUFBVCxrQkFDOUJ2QyxHQUQ4QixFQUU5QjBCLE1BRjhCLEVBRzlCSyxRQUg4QixFQUk5QmEsUUFKOEIsRUFLOUJwQixNQUFNb0MsSUFBTixDQUFXQyxFQUxtQixFQU05QnJDLE1BQU1pRCxNQU53QixFQU85QmpELE1BQU1VLFVBUHdCLEVBUTlCYSxlQVI4QixTQVMzQkksZUFUMkIsR0FVOUJMLGdCQVY4QixHQUFaO0FBQUEsYUFBcEI7QUFZRDtBQUNELGNBQUl0QixNQUFNc0MsU0FBTixJQUFtQixDQUFDcEMsT0FBT2UsVUFBL0IsRUFBMkM7QUFDekNmLG1CQUFPZSxVQUFQLEdBQW9CO0FBQUEscUJBQ2xCaEQsU0FBU2dELFVBQVQsa0JBQ0V6QyxHQURGLEVBRUUwQixNQUZGLEVBR0VrQixRQUhGLEVBSUVwQixNQUFNb0MsSUFBTixDQUFXQyxFQUpiLEVBS0VyQyxNQUFNaUQsTUFMUixFQU1FakQsTUFBTVUsVUFOUixFQU9FYSxlQVBGLFNBUUtNLGVBUkwsRUFEa0I7QUFBQSxhQUFwQjtBQVdEO0FBQ0Q7QUFDRDs7QUFFRDtBQWxQRjtBQW9QQSxXQUFPM0IsTUFBUDtBQUNEO0FBaldZLENBQWYiLCJmaWxlIjoiY29sdW1uLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVXRpbHMgZnJvbSAnLi4vZGF0YWdyaWQudXRpbHMnO1xuaW1wb3J0IHtcbiAgRGF0ZVR5cGUsXG4gIFNlbGVjdFR5cGUsXG4gIEJvb2xlYW5UeXBlLFxuICBDaGVja2JveFR5cGUsXG4gIEN1cnJlbmN5VHlwZSxcbiAgUHJpbWl0aXZlVHlwZSxcbn0gZnJvbSAnLi9jb2x1bW4tdHlwZXMvY29sdW1uLXR5cGVzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBiYXNlQ29sdW1uKGNvbCkge1xuICAgIGNvbnN0IGJhc2VDb2wgPSB7XG4gICAgICBoZWFkZXI6IGNvbC5oZWFkZXIsXG4gICAgICBjb2x1bW5LZXk6IFV0aWxzLmdldENvbHVtbktleShjb2wpLFxuICAgICAgd2lkdGg6IChjb2wud2lkdGggfHwgY29sLndpZHRoID09PSAwID8gY29sLndpZHRoIDogMjAwKSxcbiAgICAgIG1pbldpZHRoOiAoY29sLm1pbldpZHRoIHx8IGNvbC5taW5XaWR0aCA9PT0gMCA/IGNvbC5taW5XaWR0aCA6IDQwKSxcbiAgICAgIG1heFdpZHRoOiBjb2wubWF4V2lkdGgsXG4gICAgICBpc1Jlc2l6YWJsZTogIWNvbC5kaXNhYmxlUmVzaXppbmcsXG4gICAgICBmaXhlZDogISFjb2wuZml4ZWQsXG4gICAgICBmaXhlZFJpZ2h0OiAhIWNvbC5maXhlZFJpZ2h0LFxuICAgICAgYWxsb3dDZWxsc1JlY3ljbGluZzogISFjb2wuYWxsb3dDZWxsc1JlY3ljbGluZyxcbiAgICAgIGRpc2FibGVTb3J0aW5nOiAhIWNvbC5kaXNhYmxlU29ydGluZyxcbiAgICAgIGlzUmVxdWlyZWQ6ICEhY29sLmlzUmVxdWlyZWQsXG4gICAgICBjb21wb25lbnRUeXBlOiBjb2wuY29tcG9uZW50VHlwZSxcbiAgICAgIHN0eWxlOiBVdGlscy5nZXRDZWxsU3R5bGVCeUNvbChjb2wpLFxuICAgIH07XG4gICAgLy8gdmFsdWVLZXlQYXRoXG4gICAgaWYgKGNvbC52YWx1ZUtleVBhdGgpIGJhc2VDb2wudmFsdWVLZXlQYXRoID0gY29sLnZhbHVlS2V5UGF0aDtcbiAgICAvLyBmbGV4R3Jvd1xuICAgIGlmIChjb2wuZmxleEdyb3cpIGJhc2VDb2wuZmxleEdyb3cgPSBjb2wuZmxleEdyb3c7XG4gICAgLy8gdmFsdWVUeXBlXG4gICAgaWYgKGNvbC52YWx1ZVR5cGUpIGJhc2VDb2wudmFsdWVUeXBlID0gY29sLnZhbHVlVHlwZTtcbiAgICAvLyBzb3J0Q29tcGFyYXRvclxuICAgIGlmIChjb2wuc29ydENvbXBhcmF0b3IpIGJhc2VDb2wuc29ydENvbXBhcmF0b3IgPSBjb2wuc29ydENvbXBhcmF0b3I7XG4gICAgLy8gc29ydFZhbHVlR2V0dGVyXG4gICAgaWYgKGNvbC5zb3J0VmFsdWVHZXR0ZXIpIGJhc2VDb2wuc29ydFZhbHVlR2V0dGVyID0gY29sLnNvcnRWYWx1ZUdldHRlcjtcbiAgICByZXR1cm4gYmFzZUNvbDtcbiAgfSxcblxuICBjb2x1bW5DZWxsKGJhc2VDb2x1bW4sIHByb3BzLCBjb2wsIGJhc2VWYWx1ZVJlbmRlcikge1xuICAgIGNvbnN0IGNvbHVtbiA9IGJhc2VDb2x1bW47XG4gICAgaWYgKGNvbC5jZWxsKSB7XG4gICAgICBjb2x1bW4uY2VsbCA9IGNvbC5jZWxsO1xuICAgIH0gZWxzZSBpZiAoY29sLnZhbHVlUmVuZGVyKSB7XG4gICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IGNvbC52YWx1ZVJlbmRlcihwcm9wcy5kYXRhLmdldChyb3dJbmRleCksIHJvd0luZGV4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3dpdGNoIChjb2wudmFsdWVUeXBlKSB7XG4gICAgICAgIGNhc2UgJ251bWJlcic6IC8vIGZhbGwgdGhyb3VnaFxuICAgICAgICBjYXNlICdmbG9hdCc6IHtcbiAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IFByaW1pdGl2ZVR5cGUubnVtYmVyVmFsUmVuZGVyKGNvbCwgcm93SW5kZXgsIGJhc2VWYWx1ZVJlbmRlcik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlICdib29sZWFuJzoge1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gQm9vbGVhblR5cGUudmFsUmVuZGVyKGNvbCwgcm93SW5kZXgsIGJhc2VWYWx1ZVJlbmRlcik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlICdjaGVja2JveCc6IHtcbiAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IENoZWNrYm94VHlwZS52YWxSZW5kZXIocm93SW5kZXgsIGJhc2VWYWx1ZVJlbmRlcik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlICdkYXRlJzoge1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gRGF0ZVR5cGUudmFsUmVuZGVyKHJvd0luZGV4LCBwcm9wcy5kYXRlRm9ybWF0LCBiYXNlVmFsdWVSZW5kZXIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNoYW5nZSB2YWxSZW5kZXJzIHRvIGp1c3QgdGFrZSBwcm9wcyAtLT4gc2F2ZXMgc29tZSAnZW5lcmd5J1xuICAgICAgICBjYXNlICdjdXJyZW5jeSc6IHtcbiAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IEN1cnJlbmN5VHlwZS52YWxSZW5kZXIoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBwcm9wcy5kYXRhLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICBwcm9wcy50aG91c2FuZFNlcGFyYXRvcixcbiAgICAgICAgICAgIHByb3BzLmRlY2ltYWxTZXBhcmF0b3IsXG4gICAgICAgICAgICBiYXNlVmFsdWVSZW5kZXIsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IGJhc2VWYWx1ZVJlbmRlcihyb3dJbmRleCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gY2VsbEVkaXQgcmVuZGVyXG4gICAgaWYgKGNvbC5jZWxsRWRpdCkge1xuICAgICAgY29sdW1uLmNlbGxFZGl0ID0gY29sLmNlbGxFZGl0O1xuICAgIH0gZWxzZSBpZiAoY29sLmVkaXRWYWx1ZVJlbmRlcikge1xuICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gY29sLmVkaXRWYWx1ZVJlbmRlcihwcm9wcy5kYXRhLmdldChyb3dJbmRleCksIHJvd0luZGV4KTtcbiAgICB9XG5cbiAgICAvLyBjZWxsQ3JlYXRlIHJlbmRlclxuICAgIGlmIChjb2wuY2VsbENyZWF0ZSkge1xuICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSBjb2wuY2VsbENyZWF0ZTtcbiAgICB9IGVsc2UgaWYgKGNvbC5jcmVhdGVWYWx1ZVJlbmRlcikge1xuICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiBjb2wuY3JlYXRlVmFsdWVSZW5kZXIocHJvcHMuZGF0YS5nZXQocm93SW5kZXgpLCByb3dJbmRleCk7XG4gICAgfVxuXG4gICAgLy8gY2VsbEZpbHRlciByZW5kZXJcbiAgICBpZiAoY29sLmNlbGxGaWx0ZXIpIHtcbiAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gY29sLmNlbGxGaWx0ZXI7XG4gICAgfSBlbHNlIGlmIChjb2wuZmlsdGVyVmFsdWVSZW5kZXIpIHtcbiAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gcm93SW5kZXggPT4gY29sLmZpbHRlclZhbHVlUmVuZGVyKHByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSwgcm93SW5kZXgpO1xuICAgIH1cbiAgICByZXR1cm4gY29sdW1uO1xuICB9LFxuXG4gIGNvbHVtbkNvbXBvbmVudFR5cGUoYmFzZUNvbHVtbiwgdGFiSW5kZXgsIHByb3BzLCBjb2wsIGZ1bmN0aW9ucywgZ2V0RGlzYWJsZWRTdGF0ZSkge1xuICAgIGlmICghY29sLmNvbXBvbmVudFR5cGUpIHJldHVybiBiYXNlQ29sdW1uO1xuICAgIGNvbnN0IGNvbHVtbiA9IGJhc2VDb2x1bW47XG4gICAgbGV0IGVkaXRWYWx1ZVBhcnNlciA9IHZhbCA9PiB2YWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAvLyBHcmlkIGludGVybmFsIGZ1bmN0aW9ucyBzZXBhcmF0ZWRcbiAgICBjb25zdCBlZGl0RnVuY3Rpb25zID0geyAuLi5mdW5jdGlvbnMuZWRpdCB9O1xuICAgIGNvbnN0IGNyZWF0ZUZ1bmN0aW9ucyA9IHsgLi4uZnVuY3Rpb25zLmNyZWF0ZSB9O1xuICAgIGNvbnN0IGZpbHRlckZ1bmN0aW9ucyA9IHsgLi4uZnVuY3Rpb25zLmZpbHRlciB9O1xuICAgIHN3aXRjaCAoY29sLmNvbXBvbmVudFR5cGUpIHtcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICd0ZXh0Jzoge1xuICAgICAgICBjb25zdCBmb3JtQ29udHJvbFR5cGUgPSBjb2wuY29tcG9uZW50VHlwZSA9PT0gJ2Zsb2F0JyB8fCBjb2wuY29tcG9uZW50VHlwZSA9PT0gJ251bWJlcicgPyAndGV4dCcgOiBjb2wuY29tcG9uZW50VHlwZTtcbiAgICAgICAgY29uc3QgcHJpbWl0aXZlVmFsUGFyc2VyID0gY29sLmNvbXBvbmVudFR5cGUgPT09ICdmbG9hdCcgP1xuICAgICAgICAgICh2YWwgPT4gdmFsLnJlcGxhY2UobmV3IFJlZ0V4cChgW15cXFxcZCR7cHJvcHMuZGVjaW1hbFNlcGFyYXRvcn0rLV1gLCAnZycpLCAnJykpIDogZWRpdFZhbHVlUGFyc2VyO1xuXG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PlxuICAgICAgICAgICAgUHJpbWl0aXZlVHlwZS5jZWxsRWRpdChcbiAgICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgICAgcHJpbWl0aXZlVmFsUGFyc2VyLFxuICAgICAgICAgICAgICBmb3JtQ29udHJvbFR5cGUsXG4gICAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiBQcmltaXRpdmVUeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByaW1pdGl2ZVZhbFBhcnNlcixcbiAgICAgICAgICAgIGZvcm1Db250cm9sVHlwZSxcbiAgICAgICAgICAgIC4uLmNyZWF0ZUZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wcy5maWx0ZXJpbmcgJiYgIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiBQcmltaXRpdmVUeXBlLmNlbGxGaWx0ZXIoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBwcmltaXRpdmVWYWxQYXJzZXIsXG4gICAgICAgICAgICBmb3JtQ29udHJvbFR5cGUsXG4gICAgICAgICAgICAuLi5maWx0ZXJGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSAnY2hlY2tib3gnOiB7XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiBDaGVja2JveFR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IENoZWNrYm94VHlwZS5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICAuLi5jcmVhdGVGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuZmlsdGVyaW5nICYmICFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT5cbiAgICAgICAgICAgIENoZWNrYm94VHlwZS5jZWxsRmlsdGVyKFxuICAgICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICAgIHByb3BzLmludGwsXG4gICAgICAgICAgICAgIC4uLmZpbHRlckZ1bmN0aW9ucyxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ3NlbGVjdCc6IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0T3B0aW9ucyA9IGNvbC5zZWxlY3RDb21wb25lbnRPcHRpb25zIHx8XG4gICAgICAgICAgcHJvcHMuc2VsZWN0Q29tcG9uZW50T3B0aW9ucy5nZXQoY29sdW1uLmNvbHVtbktleSk7XG4gICAgICAgIGNvbnN0IHNlbGVjdFRyYW5zbGF0aW9ucyA9IGNvbC5zZWxlY3RDb21wb25lbnRUcmFuc2xhdGlvbnMgfHxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0LlNlbGVjdCcgfSksXG4gICAgICAgICAgICBub1Jlc3VsdHNUZXh0OiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuTm9SZXN1bHRzJyB9KSxcbiAgICAgICAgICB9O1xuXG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PlxuICAgICAgICAgICAgU2VsZWN0VHlwZS5jZWxsRWRpdChcbiAgICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT5cbiAgICAgICAgICAgIFNlbGVjdFR5cGUuY2VsbENyZWF0ZShcbiAgICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAgIC4uLmNyZWF0ZUZ1bmN0aW9ucyxcbiAgICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+XG4gICAgICAgICAgICBTZWxlY3RUeXBlLmNlbGxGaWx0ZXIoXG4gICAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAgIC4uLmZpbHRlckZ1bmN0aW9ucyxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBbXG4gICAgICAgICAgeyB2YWx1ZTogdHJ1ZSwgbGFiZWw6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5ZZXMnIH0pIH0sXG4gICAgICAgICAgeyB2YWx1ZTogZmFsc2UsIGxhYmVsOiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuTm8nIH0pIH0sXG4gICAgICAgIF07XG4gICAgICAgIGNvbnN0IHNlbGVjdFRyYW5zbGF0aW9ucyA9IGNvbC5zZWxlY3RDb21wb25lbnRUcmFuc2xhdGlvbnMgfHwge1xuICAgICAgICAgIHBsYWNlaG9sZGVyOiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuU2VsZWN0JyB9KSxcbiAgICAgICAgICBub1Jlc3VsdHNUZXh0OiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuTm9SZXN1bHRzJyB9KSxcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT5cbiAgICAgICAgICAgIEJvb2xlYW5UeXBlLmNlbGxFZGl0KFxuICAgICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgICAgLi4uZWRpdEZ1bmN0aW9ucyxcbiAgICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PlxuICAgICAgICAgICAgQm9vbGVhblR5cGUuY2VsbENyZWF0ZShcbiAgICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAgIC4uLmNyZWF0ZUZ1bmN0aW9ucyxcbiAgICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+XG4gICAgICAgICAgICBCb29sZWFuVHlwZS5jZWxsRmlsdGVyKFxuICAgICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgICAuLi5maWx0ZXJGdW5jdGlvbnMsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlICdkYXRlJzoge1xuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gRGF0ZVR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByb3BzLnJlZ2lvbixcbiAgICAgICAgICAgIHByb3BzLmRhdGVGb3JtYXQsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gRGF0ZVR5cGUuY2VsbENyZWF0ZShcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgcHJvcHMucmVnaW9uLFxuICAgICAgICAgICAgcHJvcHMuZGF0ZUZvcm1hdCxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmNyZWF0ZUZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuZmlsdGVyaW5nICYmICFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT5cbiAgICAgICAgICAgIERhdGVUeXBlLmNlbGxGaWx0ZXIoXG4gICAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgICAgcHJvcHMucmVnaW9uLFxuICAgICAgICAgICAgICBwcm9wcy5kYXRlRm9ybWF0LFxuICAgICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAgIC4uLmZpbHRlckZ1bmN0aW9ucyxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgfVxuICAgIHJldHVybiBjb2x1bW47XG4gIH0sXG59O1xuIl19