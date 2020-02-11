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
        selectComponentOptions = _props$selectComponen2 === void 0 ? Map() : _props$selectComponen2; // Primitive value parser

    var primitiveValParser = editValueParser;

    if (!col.editValueParser && col.componentType === 'float') {
      primitiveValParser = function primitiveValParser(val) {
        if (val && val.replace) {
          return val.replace(new RegExp("[^\\d" + props.decimalSeparator + "+-]", 'g'), '');
        }

        return '';
      };
    }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2VydmljZS9jb2x1bW4tc2VydmljZS5qc3giXSwibmFtZXMiOlsiTWFwIiwiaW52YXJpYW50IiwiVXRpbHMiLCJEYXRlVHlwZSIsIlNlbGVjdFR5cGUiLCJCb29sZWFuVHlwZSIsIkNoZWNrYm94VHlwZSIsIkN1cnJlbmN5VHlwZSIsIlByaW1pdGl2ZVR5cGUiLCJNdWx0aVNlbGVjdFR5cGUiLCJiYXNlQ29sdW1uIiwiY29sIiwiYmFzZUNvbCIsImhlYWRlciIsImNvbHVtbktleSIsImdldENvbHVtbktleSIsIndpZHRoIiwibWluV2lkdGgiLCJtYXhXaWR0aCIsImlzUmVzaXphYmxlIiwiZGlzYWJsZVJlc2l6aW5nIiwiZml4ZWQiLCJmaXhlZFJpZ2h0IiwiYWxsb3dDZWxsc1JlY3ljbGluZyIsImRpc2FibGVTb3J0aW5nIiwiaXNSZXF1aXJlZCIsImNvbXBvbmVudFR5cGUiLCJzdHlsZSIsImdldENlbGxTdHlsZUJ5Q29sIiwidmlydHVhbGl6ZWQiLCJ2YWx1ZUtleVBhdGgiLCJmbGV4R3JvdyIsInZhbHVlVHlwZSIsInNvcnRDb21wYXJhdG9yIiwic29ydFZhbHVlR2V0dGVyIiwidHJhbnNsYXRpb25zIiwiY29sdW1uQ2VsbCIsInByb3BzIiwiYmFzZVZhbHVlUmVuZGVyIiwiY29sdW1uIiwiY2VsbCIsInZhbHVlUmVuZGVyIiwicm93SW5kZXgiLCJkYXRhIiwiZ2V0Iiwic2VsZWN0Q29tcG9uZW50T3B0aW9ucyIsIm51bWJlclZhbFJlbmRlciIsInRob3VzYW5kU2VwYXJhdG9yIiwiZGVjaW1hbFNlcGFyYXRvciIsInZhbFJlbmRlciIsInNlbGVjdE9wdGlvbnMiLCJncmlkIiwiaWQiLCJkYXRlRm9ybWF0IiwiY2VsbEVkaXQiLCJlZGl0VmFsdWVSZW5kZXIiLCJzZXRSZWYiLCJvbktleURvd24iLCJjZWxsQ3JlYXRlIiwiY3JlYXRlVmFsdWVSZW5kZXIiLCJjZWxsRmlsdGVyIiwiZmlsdGVyVmFsdWVSZW5kZXIiLCJjb2x1bW5Db21wb25lbnRUeXBlIiwidGFiSW5kZXgiLCJmdW5jdGlvbnMiLCJnZXREaXNhYmxlZFN0YXRlIiwiZWRpdFZhbHVlUGFyc2VyIiwidmFsIiwiZWRpdEZ1bmN0aW9ucyIsImVkaXQiLCJjcmVhdGVGdW5jdGlvbnMiLCJjcmVhdGUiLCJmaWx0ZXJGdW5jdGlvbnMiLCJmaWx0ZXIiLCJwcmltaXRpdmVWYWxQYXJzZXIiLCJyZXBsYWNlIiwiUmVnRXhwIiwiZm9ybUNvbnRyb2xUeXBlIiwiaW5saW5lRWRpdCIsImZpbHRlcmluZyIsImludGwiLCJzZWxlY3RUcmFuc2xhdGlvbnMiLCJzZWxlY3RDb21wb25lbnRUcmFuc2xhdGlvbnMiLCJwbGFjZWhvbGRlciIsImZvcm1hdE1lc3NhZ2UiLCJub1Jlc3VsdHNUZXh0Iiwic2VsZWN0ZWQiLCJuIiwidmFsdWUiLCJsYWJlbCIsInJlZ2lvbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxTQUFTQSxHQUFULFFBQW9CLFdBQXBCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixXQUF0QjtBQUNBLE9BQU9DLEtBQVAsTUFBa0IsbUJBQWxCO0FBQ0EsU0FDRUMsUUFERixFQUVFQyxVQUZGLEVBR0VDLFdBSEYsRUFJRUMsWUFKRixFQUtFQyxZQUxGLEVBTUVDLGFBTkYsRUFPRUMsZUFQRixRQVFPLDZCQVJQO0FBVUEsZUFBZTtBQUNiQyxFQUFBQSxVQURhLHNCQUNGQyxHQURFLEVBQ0c7QUFDZCxRQUFNQyxPQUFPLEdBQUc7QUFDZEMsTUFBQUEsTUFBTSxFQUFFRixHQUFHLENBQUNFLE1BREU7QUFFZEMsTUFBQUEsU0FBUyxFQUFFWixLQUFLLENBQUNhLFlBQU4sQ0FBbUJKLEdBQW5CLENBRkc7QUFHZEssTUFBQUEsS0FBSyxFQUFFTCxHQUFHLENBQUNLLEtBQUosSUFBYUwsR0FBRyxDQUFDSyxLQUFKLEtBQWMsQ0FBM0IsR0FBK0JMLEdBQUcsQ0FBQ0ssS0FBbkMsR0FBMkMsR0FIcEM7QUFJZEMsTUFBQUEsUUFBUSxFQUFFTixHQUFHLENBQUNN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LENBQUNXLGdCQVhrQyxHQUFoQjtBQUFBLGFBQTFCO0FBYUQ7O0FBQ0QsY0FBSVgsS0FBSyxDQUFDeUMsVUFBTixJQUFvQixDQUFDdkMsTUFBTSxDQUFDbUIsVUFBaEMsRUFBNEM7QUFDMUNuQixZQUFBQSxNQUFNLENBQUNtQixVQUFQLEdBQW9CLFVBQUFoQixRQUFRO0FBQUEscUJBQUluQyxZQUFZLENBQUNtRCxVQUFiLE9BQUFuRCxZQUFZLEdBQzFDSSxHQUQwQyxFQUUxQzRCLE1BRjBDLEVBRzFDd0IsUUFIMEMsRUFJMUNyQixRQUowQyxFQUsxQ0wsS0FBSyxDQUFDYyxJQUFOLENBQVdDLEVBTCtCLFNBTXZDa0IsZUFOdUMsR0FPMUNKLGVBUDBDLEVBUTFDRCxnQkFSMEMsRUFTMUM1QixLQUFLLENBQUNNLElBVG9DLEVBVTFDTixLQUFLLENBQUNVLGlCQVZvQyxFQVcxQ1YsS0FBSyxDQUFDVyxnQkFYb0MsR0FBaEI7QUFBQSxhQUE1QjtBQWFEOztBQUNELGNBQUlYLEtBQUssQ0FBQzBDLFNBQU4sSUFBbUIsQ0FBQ3hDLE1BQU0sQ0FBQ3FCLFVBQS9CLEVBQTJDO0FBQ3pDckIsWUFBQUEsTUFBTSxDQUFDcUIsVUFBUCxHQUFvQjtBQUFBLHFCQUFNcEQsYUFBYSxDQUFDb0QsVUFBZCxPQUFBcEQsYUFBYSxHQUNyQ0csR0FEcUMsRUFFckM0QixNQUZxQyxFQUdyQ3dCLFFBSHFDLEVBSXJDMUIsS0FBSyxDQUFDYyxJQUFOLENBQVdDLEVBSjBCLEVBS3JDc0Isa0JBTHFDLEVBTXJDLE1BTnFDLFNBT2xDRixlQVBrQyxFQUFuQjtBQUFBLGFBQXBCO0FBU0Q7O0FBQ0Q7QUFDRDs7QUFDRDtBQXBWRjs7QUFzVkEsV0FBT2pDLE1BQVA7QUFDRDtBQXJnQlksQ0FBZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hcCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgaW52YXJpYW50IGZyb20gJ2ludmFyaWFudCc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vZGF0YWdyaWQudXRpbHMnO1xuaW1wb3J0IHtcbiAgRGF0ZVR5cGUsXG4gIFNlbGVjdFR5cGUsXG4gIEJvb2xlYW5UeXBlLFxuICBDaGVja2JveFR5cGUsXG4gIEN1cnJlbmN5VHlwZSxcbiAgUHJpbWl0aXZlVHlwZSxcbiAgTXVsdGlTZWxlY3RUeXBlLFxufSBmcm9tICcuL2NvbHVtbi10eXBlcy9jb2x1bW4tdHlwZXMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGJhc2VDb2x1bW4oY29sKSB7XG4gICAgY29uc3QgYmFzZUNvbCA9IHtcbiAgICAgIGhlYWRlcjogY29sLmhlYWRlcixcbiAgICAgIGNvbHVtbktleTogVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCksXG4gICAgICB3aWR0aDogY29sLndpZHRoIHx8IGNvbC53aWR0aCA9PT0gMCA/IGNvbC53aWR0aCA6IDIwMCxcbiAgICAgIG1pbldpZHRoOiBjb2wubWluV2lkdGggfHwgY29sLm1pbldpZHRoID09PSAwID8gY29sLm1pbldpZHRoIDogNDAsXG4gICAgICBtYXhXaWR0aDogY29sLm1heFdpZHRoLFxuICAgICAgaXNSZXNpemFibGU6ICFjb2wuZGlzYWJsZVJlc2l6aW5nLFxuICAgICAgZml4ZWQ6ICEhY29sLmZpeGVkLFxuICAgICAgZml4ZWRSaWdodDogISFjb2wuZml4ZWRSaWdodCxcbiAgICAgIGFsbG93Q2VsbHNSZWN5Y2xpbmc6ICEhY29sLmFsbG93Q2VsbHNSZWN5Y2xpbmcsXG4gICAgICBkaXNhYmxlU29ydGluZzogISFjb2wuZGlzYWJsZVNvcnRpbmcsXG4gICAgICBpc1JlcXVpcmVkOiAhIWNvbC5pc1JlcXVpcmVkLFxuICAgICAgY29tcG9uZW50VHlwZTogY29sLmNvbXBvbmVudFR5cGUsXG4gICAgICBzdHlsZTogVXRpbHMuZ2V0Q2VsbFN0eWxlQnlDb2woY29sKSxcbiAgICAgIHZpcnR1YWxpemVkOiAhIWNvbC52aXJ0dWFsaXplZCxcbiAgICB9O1xuICAgIC8vIHZhbHVlS2V5UGF0aFxuICAgIGlmIChjb2wudmFsdWVLZXlQYXRoKSBiYXNlQ29sLnZhbHVlS2V5UGF0aCA9IGNvbC52YWx1ZUtleVBhdGg7XG4gICAgLy8gZmxleEdyb3dcbiAgICBpZiAoY29sLmZsZXhHcm93KSBiYXNlQ29sLmZsZXhHcm93ID0gY29sLmZsZXhHcm93O1xuICAgIC8vIHZhbHVlVHlwZVxuICAgIGlmIChjb2wudmFsdWVUeXBlKSBiYXNlQ29sLnZhbHVlVHlwZSA9IGNvbC52YWx1ZVR5cGU7XG4gICAgLy8gc29ydENvbXBhcmF0b3JcbiAgICBpZiAoY29sLnNvcnRDb21wYXJhdG9yKSBiYXNlQ29sLnNvcnRDb21wYXJhdG9yID0gY29sLnNvcnRDb21wYXJhdG9yO1xuICAgIC8vIHNvcnRWYWx1ZUdldHRlclxuICAgIGlmIChjb2wuc29ydFZhbHVlR2V0dGVyKSBiYXNlQ29sLnNvcnRWYWx1ZUdldHRlciA9IGNvbC5zb3J0VmFsdWVHZXR0ZXI7XG4gICAgLy8gdHJhbnNsYXRpb25zXG4gICAgaWYgKGNvbC50cmFuc2xhdGlvbnMpIGJhc2VDb2wudHJhbnNsYXRpb25zID0gY29sLnRyYW5zbGF0aW9ucztcbiAgICByZXR1cm4gYmFzZUNvbDtcbiAgfSxcblxuICBjb2x1bW5DZWxsKGJhc2VDb2x1bW4sIHByb3BzLCBjb2wsIGJhc2VWYWx1ZVJlbmRlcikge1xuICAgIGNvbnN0IGNvbHVtbiA9IGJhc2VDb2x1bW47XG4gICAgaWYgKGNvbC5jZWxsKSB7XG4gICAgICBjb2x1bW4uY2VsbCA9IGNvbC5jZWxsO1xuICAgIH0gZWxzZSBpZiAoY29sLnZhbHVlUmVuZGVyKSB7XG4gICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IGNvbC52YWx1ZVJlbmRlcihwcm9wcy5kYXRhLmdldChyb3dJbmRleCksIHJvd0luZGV4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgeyBzZWxlY3RDb21wb25lbnRPcHRpb25zID0gTWFwKCkgfSA9IHByb3BzO1xuICAgICAgc3dpdGNoIChjb2wuY29tcG9uZW50VHlwZSkge1xuICAgICAgICBjYXNlICdudW1iZXInOiAvLyBmYWxsIHRocm91Z2hcbiAgICAgICAgY2FzZSAnZmxvYXQnOiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBQcmltaXRpdmVUeXBlLm51bWJlclZhbFJlbmRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgcHJvcHMudGhvdXNhbmRTZXBhcmF0b3IsXG4gICAgICAgICAgICBwcm9wcy5kZWNpbWFsU2VwYXJhdG9yLFxuICAgICAgICAgICAgYmFzZVZhbHVlUmVuZGVyLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlICdib29sZWFuJzoge1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gQm9vbGVhblR5cGUudmFsUmVuZGVyKGNvbCwgcm93SW5kZXgsIGJhc2VWYWx1ZVJlbmRlcik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlICdjaGVja2JveCc6IHtcbiAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IENoZWNrYm94VHlwZS52YWxSZW5kZXIocm93SW5kZXgsIGJhc2VWYWx1ZVJlbmRlcik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlICdtdWx0aXNlbGVjdCc6IHtcbiAgICAgICAgICBjb25zdCBzZWxlY3RPcHRpb25zID0gY29sLnNlbGVjdENvbXBvbmVudE9wdGlvbnNcbiAgICAgICAgICAgIHx8IHNlbGVjdENvbXBvbmVudE9wdGlvbnMuZ2V0KGNvbHVtbi5jb2x1bW5LZXkpO1xuICAgICAgICAgIGludmFyaWFudChcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBgTm8gc2VsZWN0Q29tcG9uZW50T3B0aW9ucyBwcm92aWRlZCBmb3IgY29sdW1uICcke2NvbHVtbi5jb2x1bW5LZXl9J2AsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IE11bHRpU2VsZWN0VHlwZS52YWxSZW5kZXIoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgYmFzZVZhbHVlUmVuZGVyLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlICdzZWxlY3QnOiB7XG4gICAgICAgICAgY29uc3Qgc2VsZWN0T3B0aW9ucyA9IGNvbC5zZWxlY3RDb21wb25lbnRPcHRpb25zXG4gICAgICAgICAgICB8fCBzZWxlY3RDb21wb25lbnRPcHRpb25zLmdldChjb2x1bW4uY29sdW1uS2V5KTtcbiAgICAgICAgICBpbnZhcmlhbnQoXG4gICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgYE5vIHNlbGVjdENvbXBvbmVudE9wdGlvbnMgcHJvdmlkZWQgZm9yIGNvbHVtbiAnJHtjb2x1bW4uY29sdW1uS2V5fSdgLFxuICAgICAgICAgICk7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBTZWxlY3RUeXBlLnZhbFJlbmRlcihcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIGJhc2VWYWx1ZVJlbmRlcixcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSAnZGF0ZSc6IHtcbiAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IERhdGVUeXBlLnZhbFJlbmRlcihyb3dJbmRleCwgcHJvcHMuZGF0ZUZvcm1hdCwgYmFzZVZhbHVlUmVuZGVyKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICAvLyBjaGFuZ2UgdmFsUmVuZGVycyB0byBqdXN0IHRha2UgcHJvcHMgLS0+IHNhdmVzIHNvbWUgJ2VuZXJneSdcbiAgICAgICAgY2FzZSAnY3VycmVuY3knOiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBDdXJyZW5jeVR5cGUudmFsUmVuZGVyKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgcHJvcHMuZGF0YSxcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgcHJvcHMudGhvdXNhbmRTZXBhcmF0b3IsXG4gICAgICAgICAgICBwcm9wcy5kZWNpbWFsU2VwYXJhdG9yLFxuICAgICAgICAgICAgYmFzZVZhbHVlUmVuZGVyLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBiYXNlVmFsdWVSZW5kZXIocm93SW5kZXgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGNlbGxFZGl0IHJlbmRlclxuICAgIGlmIChjb2wuY2VsbEVkaXQpIHtcbiAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IGNvbC5jZWxsRWRpdDtcbiAgICB9IGVsc2UgaWYgKGNvbC5lZGl0VmFsdWVSZW5kZXIpIHtcbiAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IChyb3dJbmRleCwgc2V0UmVmLCBvbktleURvd24pID0+IGNvbC5lZGl0VmFsdWVSZW5kZXIoXG4gICAgICAgIHByb3BzLmRhdGEuZ2V0KHJvd0luZGV4LCBNYXAoKSksXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICBzZXRSZWYsXG4gICAgICAgIG9uS2V5RG93bixcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gY2VsbENyZWF0ZSByZW5kZXJcbiAgICBpZiAoY29sLmNlbGxDcmVhdGUpIHtcbiAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gY29sLmNlbGxDcmVhdGU7XG4gICAgfSBlbHNlIGlmIChjb2wuY3JlYXRlVmFsdWVSZW5kZXIpIHtcbiAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gKHJvd0luZGV4LCBzZXRSZWYsIG9uS2V5RG93bikgPT4gY29sLmNyZWF0ZVZhbHVlUmVuZGVyKFxuICAgICAgICBwcm9wcy5kYXRhLmdldChyb3dJbmRleCwgTWFwKCkpLFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgc2V0UmVmLFxuICAgICAgICBvbktleURvd24sXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIGNlbGxGaWx0ZXIgcmVuZGVyXG4gICAgaWYgKGNvbC5jZWxsRmlsdGVyKSB7XG4gICAgICBjb2x1bW4uY2VsbEZpbHRlciA9IGNvbC5jZWxsRmlsdGVyO1xuICAgIH0gZWxzZSBpZiAoY29sLmZpbHRlclZhbHVlUmVuZGVyKSB7XG4gICAgICBjb2x1bW4uY2VsbEZpbHRlciA9IHJvd0luZGV4ID0+IGNvbC5maWx0ZXJWYWx1ZVJlbmRlcihwcm9wcy5kYXRhLmdldChyb3dJbmRleCksIHJvd0luZGV4KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbHVtbjtcbiAgfSxcblxuICBjb2x1bW5Db21wb25lbnRUeXBlKGJhc2VDb2x1bW4sIHRhYkluZGV4LCBwcm9wcywgY29sLCBmdW5jdGlvbnMsIGdldERpc2FibGVkU3RhdGUpIHtcbiAgICBpZiAoIWNvbC5jb21wb25lbnRUeXBlKSByZXR1cm4gYmFzZUNvbHVtbjtcbiAgICBjb25zdCBjb2x1bW4gPSBiYXNlQ29sdW1uO1xuICAgIGNvbnN0IGVkaXRWYWx1ZVBhcnNlciA9IGNvbC5lZGl0VmFsdWVQYXJzZXIgPyBjb2wuZWRpdFZhbHVlUGFyc2VyIDogdmFsID0+IHZhbDtcbiAgICAvLyBHcmlkIGludGVybmFsIGZ1bmN0aW9ucyBzZXBhcmF0ZWRcbiAgICBjb25zdCBlZGl0RnVuY3Rpb25zID0geyAuLi5mdW5jdGlvbnMuZWRpdCB9O1xuICAgIGNvbnN0IGNyZWF0ZUZ1bmN0aW9ucyA9IHsgLi4uZnVuY3Rpb25zLmNyZWF0ZSB9O1xuICAgIGNvbnN0IGZpbHRlckZ1bmN0aW9ucyA9IHsgLi4uZnVuY3Rpb25zLmZpbHRlciB9O1xuICAgIGNvbnN0IHsgc2VsZWN0Q29tcG9uZW50T3B0aW9ucyA9IE1hcCgpIH0gPSBwcm9wcztcblxuICAgIC8vIFByaW1pdGl2ZSB2YWx1ZSBwYXJzZXJcbiAgICBsZXQgcHJpbWl0aXZlVmFsUGFyc2VyID0gZWRpdFZhbHVlUGFyc2VyO1xuICAgIGlmICghY29sLmVkaXRWYWx1ZVBhcnNlciAmJiBjb2wuY29tcG9uZW50VHlwZSA9PT0gJ2Zsb2F0Jykge1xuICAgICAgcHJpbWl0aXZlVmFsUGFyc2VyID0gKHZhbCkgPT4ge1xuICAgICAgICBpZiAodmFsICYmIHZhbC5yZXBsYWNlKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbC5yZXBsYWNlKG5ldyBSZWdFeHAoYFteXFxcXGQke3Byb3BzLmRlY2ltYWxTZXBhcmF0b3J9Ky1dYCwgJ2cnKSwgJycpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH07XG4gICAgfVxuXG4gICAgc3dpdGNoIChjb2wuY29tcG9uZW50VHlwZSkge1xuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ3RleHQnOiB7XG4gICAgICAgIGNvbnN0IGZvcm1Db250cm9sVHlwZSA9IGNvbC5jb21wb25lbnRUeXBlID09PSAnZmxvYXQnIHx8IGNvbC5jb21wb25lbnRUeXBlID09PSAnbnVtYmVyJ1xuICAgICAgICAgID8gJ3RleHQnXG4gICAgICAgICAgOiBjb2wuY29tcG9uZW50VHlwZTtcbiAgICAgICAgLy8gYWx3YXlzIHVzZSBjb2wuZWRpdFZhbHVlUGFyc2VyIG92ZXJyaWRlIGlmIGF2YWlsYWJsZVxuXG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiBQcmltaXRpdmVUeXBlLmNlbGxFZGl0KFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBwcmltaXRpdmVWYWxQYXJzZXIsXG4gICAgICAgICAgICBmb3JtQ29udHJvbFR5cGUsXG4gICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiBQcmltaXRpdmVUeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByaW1pdGl2ZVZhbFBhcnNlcixcbiAgICAgICAgICAgIGZvcm1Db250cm9sVHlwZSxcbiAgICAgICAgICAgIC4uLmNyZWF0ZUZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wcy5maWx0ZXJpbmcgJiYgIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiBQcmltaXRpdmVUeXBlLmNlbGxGaWx0ZXIoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBwcmltaXRpdmVWYWxQYXJzZXIsXG4gICAgICAgICAgICBmb3JtQ29udHJvbFR5cGUsXG4gICAgICAgICAgICAuLi5maWx0ZXJGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSAnY2hlY2tib3gnOiB7XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiBDaGVja2JveFR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IENoZWNrYm94VHlwZS5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICAuLi5jcmVhdGVGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuZmlsdGVyaW5nICYmICFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT4gQ2hlY2tib3hUeXBlLmNlbGxGaWx0ZXIoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBwcm9wcy5pbnRsLFxuICAgICAgICAgICAgLi4uZmlsdGVyRnVuY3Rpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ211bHRpc2VsZWN0Jzoge1xuICAgICAgICBjb25zdCBzZWxlY3RPcHRpb25zID0gY29sLnNlbGVjdENvbXBvbmVudE9wdGlvbnNcbiAgICAgICAgICB8fCBzZWxlY3RDb21wb25lbnRPcHRpb25zLmdldChjb2x1bW4uY29sdW1uS2V5KTtcbiAgICAgICAgaW52YXJpYW50KFxuICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgYE5vIHNlbGVjdENvbXBvbmVudE9wdGlvbnMgcHJvdmlkZWQgZm9yIGNvbHVtbiAnJHtjb2x1bW4uY29sdW1uS2V5fSdgLFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBzZWxlY3RUcmFuc2xhdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50VHJhbnNsYXRpb25zIHx8IHtcbiAgICAgICAgICBwbGFjZWhvbGRlcjogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0LlNlbGVjdCcgfSksXG4gICAgICAgICAgbm9SZXN1bHRzVGV4dDogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0Lk5vUmVzdWx0cycgfSksXG4gICAgICAgICAgLy8gVmFyaWFibGUgJ24nIG11c3QgYmUgcHJvdmlkZWQgaW4gdGhpcyBwaGFzZSBpbiBvcmRlciB0byBhdm9pZFxuICAgICAgICAgIC8vIEVycm9yOiBUaGUgaW50bCBzdHJpbmcgY29udGV4dCB2YXJpYWJsZSAnbicgd2FzIG5vdCBwcm92aWRlZCB0byB0aGUgc3RyaW5nIHtufVxuICAgICAgICAgIC8vIHNlbGVjdGVkXG4gICAgICAgICAgLy8gVmFyaWFibGUgbiBpcyByZXBsYWNlZCBsYXRlciwgd2hlbiBpdHMgdmFsdWUgaXMgYXZhaWxhYmxlXG4gICAgICAgICAgc2VsZWN0ZWQ6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5TZWxlY3RlZCcgfSwgeyBuOiAnPG4+JyB9KSxcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gU2VsZWN0VHlwZS5jZWxsRWRpdChcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiBTZWxlY3RUeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5jcmVhdGVGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IE11bHRpU2VsZWN0VHlwZS5jZWxsRmlsdGVyKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmZpbHRlckZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlICdzZWxlY3QnOiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50T3B0aW9uc1xuICAgICAgICAgIHx8IHNlbGVjdENvbXBvbmVudE9wdGlvbnMuZ2V0KGNvbHVtbi5jb2x1bW5LZXkpO1xuICAgICAgICBpbnZhcmlhbnQoXG4gICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICBgTm8gc2VsZWN0Q29tcG9uZW50T3B0aW9ucyBwcm92aWRlZCBmb3IgY29sdW1uICcke2NvbHVtbi5jb2x1bW5LZXl9J2AsXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHNlbGVjdFRyYW5zbGF0aW9ucyA9IGNvbC5zZWxlY3RDb21wb25lbnRUcmFuc2xhdGlvbnMgfHwge1xuICAgICAgICAgIHBsYWNlaG9sZGVyOiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuU2VsZWN0JyB9KSxcbiAgICAgICAgICBub1Jlc3VsdHNUZXh0OiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuTm9SZXN1bHRzJyB9KSxcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gU2VsZWN0VHlwZS5jZWxsRWRpdChcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiBTZWxlY3RUeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5jcmVhdGVGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IFNlbGVjdFR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5maWx0ZXJGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSAnYm9vbGVhbic6IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0T3B0aW9ucyA9IFtcbiAgICAgICAgICB7IHZhbHVlOiB0cnVlLCBsYWJlbDogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLlllcycgfSkgfSxcbiAgICAgICAgICB7IHZhbHVlOiBmYWxzZSwgbGFiZWw6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5ObycgfSkgfSxcbiAgICAgICAgXTtcbiAgICAgICAgY29uc3Qgc2VsZWN0VHJhbnNsYXRpb25zID0gY29sLnNlbGVjdENvbXBvbmVudFRyYW5zbGF0aW9ucyB8fCB7XG4gICAgICAgICAgcGxhY2Vob2xkZXI6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5TZWxlY3QnIH0pLFxuICAgICAgICAgIG5vUmVzdWx0c1RleHQ6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5Ob1Jlc3VsdHMnIH0pLFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiBCb29sZWFuVHlwZS5jZWxsRWRpdChcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiBCb29sZWFuVHlwZS5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uY3JlYXRlRnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5maWx0ZXJpbmcgJiYgIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiBCb29sZWFuVHlwZS5jZWxsRmlsdGVyKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmZpbHRlckZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlICdkYXRlJzoge1xuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gRGF0ZVR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByb3BzLnJlZ2lvbixcbiAgICAgICAgICAgIHByb3BzLmRhdGVGb3JtYXQsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gRGF0ZVR5cGUuY2VsbENyZWF0ZShcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgcHJvcHMucmVnaW9uLFxuICAgICAgICAgICAgcHJvcHMuZGF0ZUZvcm1hdCxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmNyZWF0ZUZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuZmlsdGVyaW5nICYmICFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT4gRGF0ZVR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByb3BzLnJlZ2lvbixcbiAgICAgICAgICAgIHByb3BzLmRhdGVGb3JtYXQsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5maWx0ZXJGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgJ2N1cnJlbmN5Jzoge1xuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiBDdXJyZW5jeVR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICAgcHJvcHMuZGF0YSxcbiAgICAgICAgICAgIHByb3BzLnRob3VzYW5kU2VwYXJhdG9yLFxuICAgICAgICAgICAgcHJvcHMuZGVjaW1hbFNlcGFyYXRvcixcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gQ3VycmVuY3lUeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIC4uLmNyZWF0ZUZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgICBwcm9wcy5kYXRhLFxuICAgICAgICAgICAgcHJvcHMudGhvdXNhbmRTZXBhcmF0b3IsXG4gICAgICAgICAgICBwcm9wcy5kZWNpbWFsU2VwYXJhdG9yLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IFByaW1pdGl2ZVR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByaW1pdGl2ZVZhbFBhcnNlcixcbiAgICAgICAgICAgICd0ZXh0JyxcbiAgICAgICAgICAgIC4uLmZpbHRlckZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICB9XG4gICAgcmV0dXJuIGNvbHVtbjtcbiAgfSxcbn07XG4iXX0=