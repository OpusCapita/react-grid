function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { Map } from 'immutable';
import invariant from 'invariant';
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
      style: Utils.getCellStyleByCol(col),
      virtualized: !!col.virtualized
    }; // valueKeyPath

    if (col.valueKeyPath) baseCol.valueKeyPath = col.valueKeyPath; // flexGrow

    if (col.flexGrow) baseCol.flexGrow = col.flexGrow; // valueType

    if (col.valueType) baseCol.valueType = col.valueType; // sortComparator

    if (col.sortComparator) baseCol.sortComparator = col.sortComparator; // sortValueGetter

    if (col.sortValueGetter) baseCol.sortValueGetter = col.sortValueGetter; // translations

    if (col.translations) baseCol.translations = col.translations;
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
          selectComponentOptions = _props$selectComponen === void 0 ? Map() : _props$selectComponen;

      switch (col.componentType) {
        case 'number': // fall through

        case 'float':
          {
            column.cell = function (rowIndex) {
              return PrimitiveType.numberValRender(col, rowIndex, props.thousandSeparator, props.decimalSeparator, baseValueRender);
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

        case 'multiselect':
          {
            var selectOptions = col.selectComponentOptions || selectComponentOptions.get(column.columnKey);
            invariant(selectOptions, "No selectComponentOptions provided for column '" + column.columnKey + "'");

            column.cell = function (rowIndex) {
              return MultiSelectType.valRender(col, column, rowIndex, props.grid.id, selectOptions, baseValueRender);
            };

            break;
          }

        case 'select':
          {
            var _selectOptions = col.selectComponentOptions || selectComponentOptions.get(column.columnKey);

            invariant(_selectOptions, "No selectComponentOptions provided for column '" + column.columnKey + "'");

            column.cell = function (rowIndex) {
              return SelectType.valRender(rowIndex, _selectOptions, baseValueRender);
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
    } // cellEdit render


    if (col.cellEdit) {
      column.cellEdit = col.cellEdit;
    } else if (col.editValueRender) {
      column.cellEdit = function (rowIndex, setRef, onKeyDown) {
        return col.editValueRender(props.data.get(rowIndex, Map()), rowIndex, setRef, onKeyDown);
      };
    } // cellCreate render


    if (col.cellCreate) {
      column.cellCreate = col.cellCreate;
    } else if (col.createValueRender) {
      column.cellCreate = function (rowIndex, setRef, onKeyDown) {
        return col.createValueRender(props.data.get(rowIndex, Map()), rowIndex, setRef, onKeyDown);
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
        selectComponentOptions = _props$selectComponen2 === void 0 ? Map() : _props$selectComponen2;
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
          var selectOptions = col.selectComponentOptions || selectComponentOptions.get(column.columnKey);
          invariant(selectOptions, "No selectComponentOptions provided for column '" + column.columnKey + "'");
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
          var _selectOptions2 = col.selectComponentOptions || selectComponentOptions.get(column.columnKey);

          invariant(_selectOptions2, "No selectComponentOptions provided for column '" + column.columnKey + "'");

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
              return SelectType.cellEdit.apply(SelectType, [col, column, rowIndex, tabIndex, props.grid.id, _selectOptions2, _selectTranslations, editValueParser].concat(editFunctions, [getDisabledState]));
            };
          }

          if (props.inlineEdit && !column.cellCreate) {
            column.cellCreate = function (rowIndex) {
              return SelectType.cellCreate.apply(SelectType, [col, column, rowIndex, tabIndex, props.grid.id, _selectOptions2, _selectTranslations, editValueParser].concat(createFunctions, [getDisabledState]));
            };
          }

          if (props.filtering && !column.cellFilter) {
            column.cellFilter = function () {
              return SelectType.cellFilter.apply(SelectType, [col, column, tabIndex, props.grid.id, _selectOptions2, _selectTranslations, editValueParser].concat(filterFunctions));
            };
          }

          break;
        }

      case 'boolean':
        {
          var _selectOptions3 = [{
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
              return BooleanType.cellEdit.apply(BooleanType, [col, column, rowIndex, tabIndex, props.grid.id, _selectOptions3, _selectTranslations2, editValueParser].concat(editFunctions, [getDisabledState]));
            };
          }

          if (props.inlineEdit && !column.cellCreate) {
            column.cellCreate = function (rowIndex) {
              return BooleanType.cellCreate.apply(BooleanType, [col, column, rowIndex, tabIndex, props.grid.id, _selectOptions3, _selectTranslations2, editValueParser].concat(createFunctions, [getDisabledState]));
            };
          }

          if (props.filtering && !column.cellFilter) {
            column.cellFilter = function () {
              return BooleanType.cellFilter.apply(BooleanType, [col, column, tabIndex, props.grid.id, _selectOptions3, _selectTranslations2, editValueParser].concat(filterFunctions));
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

      case 'currency':
        {
          if (props.inlineEdit && !column.cellCreate) {
            column.cellEdit = function (rowIndex) {
              return CurrencyType.cellEdit.apply(CurrencyType, [col, column, tabIndex, rowIndex, props.grid.id].concat(editFunctions, [editValueParser, getDisabledState, props.data, props.thousandSeparator, props.decimalSeparator]));
            };
          }

          if (props.inlineEdit && !column.cellCreate) {
            column.cellCreate = function (rowIndex) {
              return CurrencyType.cellCreate.apply(CurrencyType, [col, column, tabIndex, rowIndex, props.grid.id].concat(createFunctions, [editValueParser, getDisabledState, props.data, props.thousandSeparator, props.decimalSeparator]));
            };
          }

          if (props.filtering && !column.cellFilter) {
            column.cellFilter = function () {
              return PrimitiveType.cellFilter.apply(PrimitiveType, [col, column, tabIndex, props.grid.id, primitiveValParser, 'text'].concat(filterFunctions));
            };
          }

          break;
        }

      default:
    }

    return column;
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2VydmljZS9jb2x1bW4tc2VydmljZS5qc3giXSwibmFtZXMiOlsiTWFwIiwiaW52YXJpYW50IiwiVXRpbHMiLCJEYXRlVHlwZSIsIlNlbGVjdFR5cGUiLCJCb29sZWFuVHlwZSIsIkNoZWNrYm94VHlwZSIsIkN1cnJlbmN5VHlwZSIsIlByaW1pdGl2ZVR5cGUiLCJNdWx0aVNlbGVjdFR5cGUiLCJiYXNlQ29sdW1uIiwiY29sIiwiYmFzZUNvbCIsImhlYWRlciIsImNvbHVtbktleSIsImdldENvbHVtbktleSIsIndpZHRoIiwibWluV2lkdGgiLCJtYXhXaWR0aCIsImlzUmVzaXphYmxlIiwiZGlzYWJsZVJlc2l6aW5nIiwiZml4ZWQiLCJmaXhlZFJpZ2h0IiwiYWxsb3dDZWxsc1JlY3ljbGluZyIsImRpc2FibGVTb3J0aW5nIiwiaXNSZXF1aXJlZCIsImNvbXBvbmVudFR5cGUiLCJzdHlsZSIsImdldENlbGxTdHlsZUJ5Q29sIiwidmlydHVhbGl6ZWQiLCJ2YWx1ZUtleVBhdGgiLCJmbGV4R3JvdyIsInZhbHVlVHlwZSIsInNvcnRDb21wYXJhdG9yIiwic29ydFZhbHVlR2V0dGVyIiwidHJhbnNsYXRpb25zIiwiY29sdW1uQ2VsbCIsInByb3BzIiwiYmFzZVZhbHVlUmVuZGVyIiwiY29sdW1uIiwiY2VsbCIsInZhbHVlUmVuZGVyIiwicm93SW5kZXgiLCJkYXRhIiwiZ2V0Iiwic2VsZWN0Q29tcG9uZW50T3B0aW9ucyIsIm51bWJlclZhbFJlbmRlciIsInRob3VzYW5kU2VwYXJhdG9yIiwiZGVjaW1hbFNlcGFyYXRvciIsInZhbFJlbmRlciIsInNlbGVjdE9wdGlvbnMiLCJncmlkIiwiaWQiLCJkYXRlRm9ybWF0IiwiY2VsbEVkaXQiLCJlZGl0VmFsdWVSZW5kZXIiLCJzZXRSZWYiLCJvbktleURvd24iLCJjZWxsQ3JlYXRlIiwiY3JlYXRlVmFsdWVSZW5kZXIiLCJjZWxsRmlsdGVyIiwiZmlsdGVyVmFsdWVSZW5kZXIiLCJjb2x1bW5Db21wb25lbnRUeXBlIiwidGFiSW5kZXgiLCJmdW5jdGlvbnMiLCJnZXREaXNhYmxlZFN0YXRlIiwiZWRpdFZhbHVlUGFyc2VyIiwidmFsIiwiZWRpdEZ1bmN0aW9ucyIsImVkaXQiLCJjcmVhdGVGdW5jdGlvbnMiLCJjcmVhdGUiLCJmaWx0ZXJGdW5jdGlvbnMiLCJmaWx0ZXIiLCJwcmltaXRpdmVWYWxQYXJzZXIiLCJyZXBsYWNlIiwiUmVnRXhwIiwiZm9ybUNvbnRyb2xUeXBlIiwiaW5saW5lRWRpdCIsImZpbHRlcmluZyIsImludGwiLCJzZWxlY3RUcmFuc2xhdGlvbnMiLCJzZWxlY3RDb21wb25lbnRUcmFuc2xhdGlvbnMiLCJwbGFjZWhvbGRlciIsImZvcm1hdE1lc3NhZ2UiLCJub1Jlc3VsdHNUZXh0Iiwic2VsZWN0ZWQiLCJuIiwidmFsdWUiLCJsYWJlbCIsInJlZ2lvbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxTQUFTQSxHQUFULFFBQW9CLFdBQXBCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixXQUF0QjtBQUNBLE9BQU9DLEtBQVAsTUFBa0IsbUJBQWxCO0FBQ0EsU0FDRUMsUUFERixFQUVFQyxVQUZGLEVBR0VDLFdBSEYsRUFJRUMsWUFKRixFQUtFQyxZQUxGLEVBTUVDLGFBTkYsRUFPRUMsZUFQRixRQVFPLDZCQVJQO0FBVUEsZUFBZTtBQUNiQyxFQUFBQSxVQURhLHNCQUNGQyxHQURFLEVBQ0c7QUFDZCxRQUFNQyxPQUFPLEdBQUc7QUFDZEMsTUFBQUEsTUFBTSxFQUFFRixHQUFHLENBQUNFLE1BREU7QUFFZEMsTUFBQUEsU0FBUyxFQUFFWixLQUFLLENBQUNhLFlBQU4sQ0FBbUJKLEdBQW5CLENBRkc7QUFHZEssTUFBQUEsS0FBSyxFQUFFTCxHQUFHLENBQUNLLEtBQUosSUFBYUwsR0FBRyxDQUFDSyxLQUFKLEtBQWMsQ0FBM0IsR0FBK0JMLEdBQUcsQ0FBQ0ssS0FBbkMsR0FBMkMsR0FIcEM7QUFJZEMsTUFBQUEsUUFBUSxFQUFFTixHQUFHLENBQUNN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LE1BQU0sQ0FBQ21CLFVBQVAsR0FBb0IsVUFBQWhCLFFBQVE7QUFBQSxxQkFBSW5DLFlBQVksQ0FBQ21ELFVBQWIsT0FBQW5ELFlBQVksR0FDMUNJLEdBRDBDLEVBRTFDNEIsTUFGMEMsRUFHMUN3QixRQUgwQyxFQUkxQ3JCLFFBSjBDLEVBSzFDTCxLQUFLLENBQUNjLElBQU4sQ0FBV0MsRUFMK0IsU0FNdkNrQixlQU51QyxHQU8xQ0osZUFQMEMsRUFRMUNELGdCQVIwQyxFQVMxQzVCLEtBQUssQ0FBQ00sSUFUb0MsRUFVMUNOLEtBQUssQ0FBQ1UsaUJBVm9DLEVBVzFDVixLQUFLLENBQUNXLGdCQVhvQyxHQUFoQjtBQUFBLGFBQTVCO0FBYUQ7O0FBQ0QsY0FBSVgsS0FBSyxDQUFDMEMsU0FBTixJQUFtQixDQUFDeEMsTUFBTSxDQUFDcUIsVUFBL0IsRUFBMkM7QUFDekNyQixZQUFBQSxNQUFNLENBQUNxQixVQUFQLEdBQW9CO0FBQUEscUJBQU1wRCxhQUFhLENBQUNvRCxVQUFkLE9BQUFwRCxhQUFhLEdBQ3JDRyxHQURxQyxFQUVyQzRCLE1BRnFDLEVBR3JDd0IsUUFIcUMsRUFJckMxQixLQUFLLENBQUNjLElBQU4sQ0FBV0MsRUFKMEIsRUFLckNzQixrQkFMcUMsRUFNckMsTUFOcUMsU0FPbENGLGVBUGtDLEVBQW5CO0FBQUEsYUFBcEI7QUFTRDs7QUFDRDtBQUNEOztBQUNEO0FBcFZGOztBQXNWQSxXQUFPakMsTUFBUDtBQUNEO0FBN2ZZLENBQWYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYXAgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IGludmFyaWFudCBmcm9tICdpbnZhcmlhbnQnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4uL2RhdGFncmlkLnV0aWxzJztcbmltcG9ydCB7XG4gIERhdGVUeXBlLFxuICBTZWxlY3RUeXBlLFxuICBCb29sZWFuVHlwZSxcbiAgQ2hlY2tib3hUeXBlLFxuICBDdXJyZW5jeVR5cGUsXG4gIFByaW1pdGl2ZVR5cGUsXG4gIE11bHRpU2VsZWN0VHlwZSxcbn0gZnJvbSAnLi9jb2x1bW4tdHlwZXMvY29sdW1uLXR5cGVzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBiYXNlQ29sdW1uKGNvbCkge1xuICAgIGNvbnN0IGJhc2VDb2wgPSB7XG4gICAgICBoZWFkZXI6IGNvbC5oZWFkZXIsXG4gICAgICBjb2x1bW5LZXk6IFV0aWxzLmdldENvbHVtbktleShjb2wpLFxuICAgICAgd2lkdGg6IGNvbC53aWR0aCB8fCBjb2wud2lkdGggPT09IDAgPyBjb2wud2lkdGggOiAyMDAsXG4gICAgICBtaW5XaWR0aDogY29sLm1pbldpZHRoIHx8IGNvbC5taW5XaWR0aCA9PT0gMCA/IGNvbC5taW5XaWR0aCA6IDQwLFxuICAgICAgbWF4V2lkdGg6IGNvbC5tYXhXaWR0aCxcbiAgICAgIGlzUmVzaXphYmxlOiAhY29sLmRpc2FibGVSZXNpemluZyxcbiAgICAgIGZpeGVkOiAhIWNvbC5maXhlZCxcbiAgICAgIGZpeGVkUmlnaHQ6ICEhY29sLmZpeGVkUmlnaHQsXG4gICAgICBhbGxvd0NlbGxzUmVjeWNsaW5nOiAhIWNvbC5hbGxvd0NlbGxzUmVjeWNsaW5nLFxuICAgICAgZGlzYWJsZVNvcnRpbmc6ICEhY29sLmRpc2FibGVTb3J0aW5nLFxuICAgICAgaXNSZXF1aXJlZDogISFjb2wuaXNSZXF1aXJlZCxcbiAgICAgIGNvbXBvbmVudFR5cGU6IGNvbC5jb21wb25lbnRUeXBlLFxuICAgICAgc3R5bGU6IFV0aWxzLmdldENlbGxTdHlsZUJ5Q29sKGNvbCksXG4gICAgICB2aXJ0dWFsaXplZDogISFjb2wudmlydHVhbGl6ZWQsXG4gICAgfTtcbiAgICAvLyB2YWx1ZUtleVBhdGhcbiAgICBpZiAoY29sLnZhbHVlS2V5UGF0aCkgYmFzZUNvbC52YWx1ZUtleVBhdGggPSBjb2wudmFsdWVLZXlQYXRoO1xuICAgIC8vIGZsZXhHcm93XG4gICAgaWYgKGNvbC5mbGV4R3JvdykgYmFzZUNvbC5mbGV4R3JvdyA9IGNvbC5mbGV4R3JvdztcbiAgICAvLyB2YWx1ZVR5cGVcbiAgICBpZiAoY29sLnZhbHVlVHlwZSkgYmFzZUNvbC52YWx1ZVR5cGUgPSBjb2wudmFsdWVUeXBlO1xuICAgIC8vIHNvcnRDb21wYXJhdG9yXG4gICAgaWYgKGNvbC5zb3J0Q29tcGFyYXRvcikgYmFzZUNvbC5zb3J0Q29tcGFyYXRvciA9IGNvbC5zb3J0Q29tcGFyYXRvcjtcbiAgICAvLyBzb3J0VmFsdWVHZXR0ZXJcbiAgICBpZiAoY29sLnNvcnRWYWx1ZUdldHRlcikgYmFzZUNvbC5zb3J0VmFsdWVHZXR0ZXIgPSBjb2wuc29ydFZhbHVlR2V0dGVyO1xuICAgIC8vIHRyYW5zbGF0aW9uc1xuICAgIGlmIChjb2wudHJhbnNsYXRpb25zKSBiYXNlQ29sLnRyYW5zbGF0aW9ucyA9IGNvbC50cmFuc2xhdGlvbnM7XG4gICAgcmV0dXJuIGJhc2VDb2w7XG4gIH0sXG5cbiAgY29sdW1uQ2VsbChiYXNlQ29sdW1uLCBwcm9wcywgY29sLCBiYXNlVmFsdWVSZW5kZXIpIHtcbiAgICBjb25zdCBjb2x1bW4gPSBiYXNlQ29sdW1uO1xuICAgIGlmIChjb2wuY2VsbCkge1xuICAgICAgY29sdW1uLmNlbGwgPSBjb2wuY2VsbDtcbiAgICB9IGVsc2UgaWYgKGNvbC52YWx1ZVJlbmRlcikge1xuICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBjb2wudmFsdWVSZW5kZXIocHJvcHMuZGF0YS5nZXQocm93SW5kZXgpLCByb3dJbmRleCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHsgc2VsZWN0Q29tcG9uZW50T3B0aW9ucyA9IE1hcCgpIH0gPSBwcm9wcztcbiAgICAgIHN3aXRjaCAoY29sLmNvbXBvbmVudFR5cGUpIHtcbiAgICAgICAgY2FzZSAnbnVtYmVyJzogLy8gZmFsbCB0aHJvdWdoXG4gICAgICAgIGNhc2UgJ2Zsb2F0Jzoge1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gUHJpbWl0aXZlVHlwZS5udW1iZXJWYWxSZW5kZXIoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHByb3BzLnRob3VzYW5kU2VwYXJhdG9yLFxuICAgICAgICAgICAgcHJvcHMuZGVjaW1hbFNlcGFyYXRvcixcbiAgICAgICAgICAgIGJhc2VWYWx1ZVJlbmRlcixcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSAnYm9vbGVhbic6IHtcbiAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IEJvb2xlYW5UeXBlLnZhbFJlbmRlcihjb2wsIHJvd0luZGV4LCBiYXNlVmFsdWVSZW5kZXIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSAnY2hlY2tib3gnOiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBDaGVja2JveFR5cGUudmFsUmVuZGVyKHJvd0luZGV4LCBiYXNlVmFsdWVSZW5kZXIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSAnbXVsdGlzZWxlY3QnOiB7XG4gICAgICAgICAgY29uc3Qgc2VsZWN0T3B0aW9ucyA9IGNvbC5zZWxlY3RDb21wb25lbnRPcHRpb25zXG4gICAgICAgICAgICB8fCBzZWxlY3RDb21wb25lbnRPcHRpb25zLmdldChjb2x1bW4uY29sdW1uS2V5KTtcbiAgICAgICAgICBpbnZhcmlhbnQoXG4gICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgYE5vIHNlbGVjdENvbXBvbmVudE9wdGlvbnMgcHJvdmlkZWQgZm9yIGNvbHVtbiAnJHtjb2x1bW4uY29sdW1uS2V5fSdgLFxuICAgICAgICAgICk7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBNdWx0aVNlbGVjdFR5cGUudmFsUmVuZGVyKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIGJhc2VWYWx1ZVJlbmRlcixcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSAnc2VsZWN0Jzoge1xuICAgICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50T3B0aW9uc1xuICAgICAgICAgICAgfHwgc2VsZWN0Q29tcG9uZW50T3B0aW9ucy5nZXQoY29sdW1uLmNvbHVtbktleSk7XG4gICAgICAgICAgaW52YXJpYW50KFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIGBObyBzZWxlY3RDb21wb25lbnRPcHRpb25zIHByb3ZpZGVkIGZvciBjb2x1bW4gJyR7Y29sdW1uLmNvbHVtbktleX0nYCxcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gU2VsZWN0VHlwZS52YWxSZW5kZXIoXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBiYXNlVmFsdWVSZW5kZXIsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgJ2RhdGUnOiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBEYXRlVHlwZS52YWxSZW5kZXIocm93SW5kZXgsIHByb3BzLmRhdGVGb3JtYXQsIGJhc2VWYWx1ZVJlbmRlcik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY2hhbmdlIHZhbFJlbmRlcnMgdG8ganVzdCB0YWtlIHByb3BzIC0tPiBzYXZlcyBzb21lICdlbmVyZ3knXG4gICAgICAgIGNhc2UgJ2N1cnJlbmN5Jzoge1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gQ3VycmVuY3lUeXBlLnZhbFJlbmRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIHByb3BzLmRhdGEsXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHByb3BzLnRob3VzYW5kU2VwYXJhdG9yLFxuICAgICAgICAgICAgcHJvcHMuZGVjaW1hbFNlcGFyYXRvcixcbiAgICAgICAgICAgIGJhc2VWYWx1ZVJlbmRlcixcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gYmFzZVZhbHVlUmVuZGVyKHJvd0luZGV4KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBjZWxsRWRpdCByZW5kZXJcbiAgICBpZiAoY29sLmNlbGxFZGl0KSB7XG4gICAgICBjb2x1bW4uY2VsbEVkaXQgPSBjb2wuY2VsbEVkaXQ7XG4gICAgfSBlbHNlIGlmIChjb2wuZWRpdFZhbHVlUmVuZGVyKSB7XG4gICAgICBjb2x1bW4uY2VsbEVkaXQgPSAocm93SW5kZXgsIHNldFJlZiwgb25LZXlEb3duKSA9PiBjb2wuZWRpdFZhbHVlUmVuZGVyKFxuICAgICAgICBwcm9wcy5kYXRhLmdldChyb3dJbmRleCwgTWFwKCkpLFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgc2V0UmVmLFxuICAgICAgICBvbktleURvd24sXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIGNlbGxDcmVhdGUgcmVuZGVyXG4gICAgaWYgKGNvbC5jZWxsQ3JlYXRlKSB7XG4gICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IGNvbC5jZWxsQ3JlYXRlO1xuICAgIH0gZWxzZSBpZiAoY29sLmNyZWF0ZVZhbHVlUmVuZGVyKSB7XG4gICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IChyb3dJbmRleCwgc2V0UmVmLCBvbktleURvd24pID0+IGNvbC5jcmVhdGVWYWx1ZVJlbmRlcihcbiAgICAgICAgcHJvcHMuZGF0YS5nZXQocm93SW5kZXgsIE1hcCgpKSxcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIHNldFJlZixcbiAgICAgICAgb25LZXlEb3duLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBjZWxsRmlsdGVyIHJlbmRlclxuICAgIGlmIChjb2wuY2VsbEZpbHRlcikge1xuICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSBjb2wuY2VsbEZpbHRlcjtcbiAgICB9IGVsc2UgaWYgKGNvbC5maWx0ZXJWYWx1ZVJlbmRlcikge1xuICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSByb3dJbmRleCA9PiBjb2wuZmlsdGVyVmFsdWVSZW5kZXIocHJvcHMuZGF0YS5nZXQocm93SW5kZXgpLCByb3dJbmRleCk7XG4gICAgfVxuICAgIHJldHVybiBjb2x1bW47XG4gIH0sXG5cbiAgY29sdW1uQ29tcG9uZW50VHlwZShiYXNlQ29sdW1uLCB0YWJJbmRleCwgcHJvcHMsIGNvbCwgZnVuY3Rpb25zLCBnZXREaXNhYmxlZFN0YXRlKSB7XG4gICAgaWYgKCFjb2wuY29tcG9uZW50VHlwZSkgcmV0dXJuIGJhc2VDb2x1bW47XG4gICAgY29uc3QgY29sdW1uID0gYmFzZUNvbHVtbjtcbiAgICBjb25zdCBlZGl0VmFsdWVQYXJzZXIgPSBjb2wuZWRpdFZhbHVlUGFyc2VyID8gY29sLmVkaXRWYWx1ZVBhcnNlciA6IHZhbCA9PiB2YWw7XG4gICAgLy8gR3JpZCBpbnRlcm5hbCBmdW5jdGlvbnMgc2VwYXJhdGVkXG4gICAgY29uc3QgZWRpdEZ1bmN0aW9ucyA9IHsgLi4uZnVuY3Rpb25zLmVkaXQgfTtcbiAgICBjb25zdCBjcmVhdGVGdW5jdGlvbnMgPSB7IC4uLmZ1bmN0aW9ucy5jcmVhdGUgfTtcbiAgICBjb25zdCBmaWx0ZXJGdW5jdGlvbnMgPSB7IC4uLmZ1bmN0aW9ucy5maWx0ZXIgfTtcbiAgICBjb25zdCB7IHNlbGVjdENvbXBvbmVudE9wdGlvbnMgPSBNYXAoKSB9ID0gcHJvcHM7XG4gICAgY29uc3QgcHJpbWl0aXZlVmFsUGFyc2VyID0gIWNvbC5lZGl0VmFsdWVQYXJzZXIgJiYgY29sLmNvbXBvbmVudFR5cGUgPT09ICdmbG9hdCdcbiAgICAgID8gdmFsID0+IHZhbC5yZXBsYWNlKG5ldyBSZWdFeHAoYFteXFxcXGQke3Byb3BzLmRlY2ltYWxTZXBhcmF0b3J9Ky1dYCwgJ2cnKSwgJycpXG4gICAgICA6IGVkaXRWYWx1ZVBhcnNlcjtcblxuICAgIHN3aXRjaCAoY29sLmNvbXBvbmVudFR5cGUpIHtcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICd0ZXh0Jzoge1xuICAgICAgICBjb25zdCBmb3JtQ29udHJvbFR5cGUgPSBjb2wuY29tcG9uZW50VHlwZSA9PT0gJ2Zsb2F0JyB8fCBjb2wuY29tcG9uZW50VHlwZSA9PT0gJ251bWJlcidcbiAgICAgICAgICA/ICd0ZXh0J1xuICAgICAgICAgIDogY29sLmNvbXBvbmVudFR5cGU7XG4gICAgICAgIC8vIGFsd2F5cyB1c2UgY29sLmVkaXRWYWx1ZVBhcnNlciBvdmVycmlkZSBpZiBhdmFpbGFibGVcblxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gUHJpbWl0aXZlVHlwZS5jZWxsRWRpdChcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgcHJpbWl0aXZlVmFsUGFyc2VyLFxuICAgICAgICAgICAgZm9ybUNvbnRyb2xUeXBlLFxuICAgICAgICAgICAgLi4uZWRpdEZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gUHJpbWl0aXZlVHlwZS5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBwcmltaXRpdmVWYWxQYXJzZXIsXG4gICAgICAgICAgICBmb3JtQ29udHJvbFR5cGUsXG4gICAgICAgICAgICAuLi5jcmVhdGVGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcHMuZmlsdGVyaW5nICYmICFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT4gUHJpbWl0aXZlVHlwZS5jZWxsRmlsdGVyKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgcHJpbWl0aXZlVmFsUGFyc2VyLFxuICAgICAgICAgICAgZm9ybUNvbnRyb2xUeXBlLFxuICAgICAgICAgICAgLi4uZmlsdGVyRnVuY3Rpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ2NoZWNrYm94Jzoge1xuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gQ2hlY2tib3hUeXBlLmNlbGxFZGl0KFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiBDaGVja2JveFR5cGUuY2VsbENyZWF0ZShcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgLi4uY3JlYXRlRnVuY3Rpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IENoZWNrYm94VHlwZS5jZWxsRmlsdGVyKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgcHJvcHMuaW50bCxcbiAgICAgICAgICAgIC4uLmZpbHRlckZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlICdtdWx0aXNlbGVjdCc6IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0T3B0aW9ucyA9IGNvbC5zZWxlY3RDb21wb25lbnRPcHRpb25zXG4gICAgICAgICAgfHwgc2VsZWN0Q29tcG9uZW50T3B0aW9ucy5nZXQoY29sdW1uLmNvbHVtbktleSk7XG4gICAgICAgIGludmFyaWFudChcbiAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgIGBObyBzZWxlY3RDb21wb25lbnRPcHRpb25zIHByb3ZpZGVkIGZvciBjb2x1bW4gJyR7Y29sdW1uLmNvbHVtbktleX0nYCxcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3Qgc2VsZWN0VHJhbnNsYXRpb25zID0gY29sLnNlbGVjdENvbXBvbmVudFRyYW5zbGF0aW9ucyB8fCB7XG4gICAgICAgICAgcGxhY2Vob2xkZXI6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5TZWxlY3QnIH0pLFxuICAgICAgICAgIG5vUmVzdWx0c1RleHQ6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5Ob1Jlc3VsdHMnIH0pLFxuICAgICAgICAgIC8vIFZhcmlhYmxlICduJyBtdXN0IGJlIHByb3ZpZGVkIGluIHRoaXMgcGhhc2UgaW4gb3JkZXIgdG8gYXZvaWRcbiAgICAgICAgICAvLyBFcnJvcjogVGhlIGludGwgc3RyaW5nIGNvbnRleHQgdmFyaWFibGUgJ24nIHdhcyBub3QgcHJvdmlkZWQgdG8gdGhlIHN0cmluZyB7bn1cbiAgICAgICAgICAvLyBzZWxlY3RlZFxuICAgICAgICAgIC8vIFZhcmlhYmxlIG4gaXMgcmVwbGFjZWQgbGF0ZXIsIHdoZW4gaXRzIHZhbHVlIGlzIGF2YWlsYWJsZVxuICAgICAgICAgIHNlbGVjdGVkOiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuU2VsZWN0ZWQnIH0sIHsgbjogJzxuPicgfSksXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IFNlbGVjdFR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gU2VsZWN0VHlwZS5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uY3JlYXRlRnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5maWx0ZXJpbmcgJiYgIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiBNdWx0aVNlbGVjdFR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5maWx0ZXJGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSAnc2VsZWN0Jzoge1xuICAgICAgICBjb25zdCBzZWxlY3RPcHRpb25zID0gY29sLnNlbGVjdENvbXBvbmVudE9wdGlvbnNcbiAgICAgICAgICB8fCBzZWxlY3RDb21wb25lbnRPcHRpb25zLmdldChjb2x1bW4uY29sdW1uS2V5KTtcbiAgICAgICAgaW52YXJpYW50KFxuICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgYE5vIHNlbGVjdENvbXBvbmVudE9wdGlvbnMgcHJvdmlkZWQgZm9yIGNvbHVtbiAnJHtjb2x1bW4uY29sdW1uS2V5fSdgLFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBzZWxlY3RUcmFuc2xhdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50VHJhbnNsYXRpb25zIHx8IHtcbiAgICAgICAgICBwbGFjZWhvbGRlcjogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0LlNlbGVjdCcgfSksXG4gICAgICAgICAgbm9SZXN1bHRzVGV4dDogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0Lk5vUmVzdWx0cycgfSksXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IFNlbGVjdFR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gU2VsZWN0VHlwZS5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uY3JlYXRlRnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5maWx0ZXJpbmcgJiYgIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiBTZWxlY3RUeXBlLmNlbGxGaWx0ZXIoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uZmlsdGVyRnVuY3Rpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBbXG4gICAgICAgICAgeyB2YWx1ZTogdHJ1ZSwgbGFiZWw6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5ZZXMnIH0pIH0sXG4gICAgICAgICAgeyB2YWx1ZTogZmFsc2UsIGxhYmVsOiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuTm8nIH0pIH0sXG4gICAgICAgIF07XG4gICAgICAgIGNvbnN0IHNlbGVjdFRyYW5zbGF0aW9ucyA9IGNvbC5zZWxlY3RDb21wb25lbnRUcmFuc2xhdGlvbnMgfHwge1xuICAgICAgICAgIHBsYWNlaG9sZGVyOiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuU2VsZWN0JyB9KSxcbiAgICAgICAgICBub1Jlc3VsdHNUZXh0OiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuTm9SZXN1bHRzJyB9KSxcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gQm9vbGVhblR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gQm9vbGVhblR5cGUuY2VsbENyZWF0ZShcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmNyZWF0ZUZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuZmlsdGVyaW5nICYmICFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT4gQm9vbGVhblR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5maWx0ZXJGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSAnZGF0ZSc6IHtcbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IERhdGVUeXBlLmNlbGxFZGl0KFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBwcm9wcy5yZWdpb24sXG4gICAgICAgICAgICBwcm9wcy5kYXRlRm9ybWF0LFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uZWRpdEZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IERhdGVUeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByb3BzLnJlZ2lvbixcbiAgICAgICAgICAgIHByb3BzLmRhdGVGb3JtYXQsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5jcmVhdGVGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IERhdGVUeXBlLmNlbGxGaWx0ZXIoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBwcm9wcy5yZWdpb24sXG4gICAgICAgICAgICBwcm9wcy5kYXRlRm9ybWF0LFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uZmlsdGVyRnVuY3Rpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdjdXJyZW5jeSc6IHtcbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gQ3VycmVuY3lUeXBlLmNlbGxFZGl0KFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICAgIHByb3BzLmRhdGEsXG4gICAgICAgICAgICBwcm9wcy50aG91c2FuZFNlcGFyYXRvcixcbiAgICAgICAgICAgIHByb3BzLmRlY2ltYWxTZXBhcmF0b3IsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IEN1cnJlbmN5VHlwZS5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICAuLi5jcmVhdGVGdW5jdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICAgcHJvcHMuZGF0YSxcbiAgICAgICAgICAgIHByb3BzLnRob3VzYW5kU2VwYXJhdG9yLFxuICAgICAgICAgICAgcHJvcHMuZGVjaW1hbFNlcGFyYXRvcixcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5maWx0ZXJpbmcgJiYgIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiBQcmltaXRpdmVUeXBlLmNlbGxGaWx0ZXIoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBwcmltaXRpdmVWYWxQYXJzZXIsXG4gICAgICAgICAgICAndGV4dCcsXG4gICAgICAgICAgICAuLi5maWx0ZXJGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgfVxuICAgIHJldHVybiBjb2x1bW47XG4gIH0sXG59O1xuIl19