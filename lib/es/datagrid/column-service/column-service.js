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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2VydmljZS9jb2x1bW4tc2VydmljZS5qc3giXSwibmFtZXMiOlsiVXRpbHMiLCJEYXRlVHlwZSIsIlNlbGVjdFR5cGUiLCJCb29sZWFuVHlwZSIsIkNoZWNrYm94VHlwZSIsIkN1cnJlbmN5VHlwZSIsIlByaW1pdGl2ZVR5cGUiLCJNdWx0aVNlbGVjdFR5cGUiLCJiYXNlQ29sdW1uIiwiY29sIiwiYmFzZUNvbCIsImhlYWRlciIsImNvbHVtbktleSIsImdldENvbHVtbktleSIsIndpZHRoIiwibWluV2lkdGgiLCJtYXhXaWR0aCIsImlzUmVzaXphYmxlIiwiZGlzYWJsZVJlc2l6aW5nIiwiZml4ZWQiLCJmaXhlZFJpZ2h0IiwiYWxsb3dDZWxsc1JlY3ljbGluZyIsImRpc2FibGVTb3J0aW5nIiwiaXNSZXF1aXJlZCIsImNvbXBvbmVudFR5cGUiLCJzdHlsZSIsImdldENlbGxTdHlsZUJ5Q29sIiwidmFsdWVLZXlQYXRoIiwiZmxleEdyb3ciLCJ2YWx1ZVR5cGUiLCJzb3J0Q29tcGFyYXRvciIsInNvcnRWYWx1ZUdldHRlciIsImNvbHVtbkNlbGwiLCJwcm9wcyIsImJhc2VWYWx1ZVJlbmRlciIsImNvbHVtbiIsImNlbGwiLCJ2YWx1ZVJlbmRlciIsImRhdGEiLCJnZXQiLCJyb3dJbmRleCIsIm51bWJlclZhbFJlbmRlciIsInZhbFJlbmRlciIsImRhdGVGb3JtYXQiLCJ0aG91c2FuZFNlcGFyYXRvciIsImRlY2ltYWxTZXBhcmF0b3IiLCJjZWxsRWRpdCIsImVkaXRWYWx1ZVJlbmRlciIsImNlbGxDcmVhdGUiLCJjcmVhdGVWYWx1ZVJlbmRlciIsImNlbGxGaWx0ZXIiLCJmaWx0ZXJWYWx1ZVJlbmRlciIsImNvbHVtbkNvbXBvbmVudFR5cGUiLCJ0YWJJbmRleCIsImZ1bmN0aW9ucyIsImdldERpc2FibGVkU3RhdGUiLCJlZGl0VmFsdWVQYXJzZXIiLCJ2YWwiLCJlZGl0RnVuY3Rpb25zIiwiZWRpdCIsImNyZWF0ZUZ1bmN0aW9ucyIsImNyZWF0ZSIsImZpbHRlckZ1bmN0aW9ucyIsImZpbHRlciIsImZvcm1Db250cm9sVHlwZSIsInByaW1pdGl2ZVZhbFBhcnNlciIsInJlcGxhY2UiLCJSZWdFeHAiLCJpbmxpbmVFZGl0IiwiZ3JpZCIsImlkIiwiZmlsdGVyaW5nIiwiaW50bCIsInNlbGVjdE9wdGlvbnMiLCJzZWxlY3RDb21wb25lbnRPcHRpb25zIiwic2VsZWN0VHJhbnNsYXRpb25zIiwic2VsZWN0Q29tcG9uZW50VHJhbnNsYXRpb25zIiwicGxhY2Vob2xkZXIiLCJmb3JtYXRNZXNzYWdlIiwibm9SZXN1bHRzVGV4dCIsInNlbGVjdGVkIiwidmFsdWUiLCJsYWJlbCIsInJlZ2lvbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPQSxLQUFQLE1BQWtCLG1CQUFsQjtBQUNBLFNBQ0VDLFFBREYsRUFFRUMsVUFGRixFQUdFQyxXQUhGLEVBSUVDLFlBSkYsRUFLRUMsWUFMRixFQU1FQyxhQU5GLEVBT0VDLGVBUEYsUUFRTyw2QkFSUDs7QUFVQSxlQUFlO0FBQ2JDLFlBRGEsc0JBQ0ZDLEdBREUsRUFDRztBQUNkLFFBQU1DLFVBQVU7QUFDZEMsY0FBUUYsSUFBSUUsTUFERTtBQUVkQyxpQkFBV1osTUFBTWEsWUFBTixDQUFtQkosR0FBbkIsQ0FGRztBQUdkSyxhQUFRTCxJQUFJSyxLQUFKLElBQWFMLElBQUlLLEtBQUosS0FBYyxDQUEzQixHQUErQkwsSUFBSUssS0FBbkMsR0FBMkMsR0FIckM7QUFJZEMsZ0JBQVdOLElBQUlNLFFBQUosSUFBZ0JOLElBQUlNLFFBQUosS0FBaUIsQ0FBakMsR0FBcUNOLElBQUlNLFFBQXpDLEdBQW9ELEVBSmpEO0FBS2RDLGdCQUFVUCxJQUFJTyxRQUxBO0FBTWRDLG1CQUFhLENBQUNSLElBQUlTLGVBTko7QUFPZEMsYUFBTyxDQUFDLENBQUNWLElBQUlVLEtBUEM7QUFRZEMsa0JBQVksQ0FBQyxDQUFDWCxJQUFJVyxVQVJKO0FBU2RDLDJCQUFxQixDQUFDLENBQUNa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UEYsU0FRS00sZUFSTCxFQURrQjtBQUFBLGFBQXBCO0FBV0Q7QUFDRDtBQUNEOztBQUVEO0FBMVNGO0FBNFNBLFdBQU8zQixNQUFQO0FBQ0Q7QUF6WlksQ0FBZiIsImZpbGUiOiJjb2x1bW4tc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBVdGlscyBmcm9tICcuLi9kYXRhZ3JpZC51dGlscyc7XG5pbXBvcnQge1xuICBEYXRlVHlwZSxcbiAgU2VsZWN0VHlwZSxcbiAgQm9vbGVhblR5cGUsXG4gIENoZWNrYm94VHlwZSxcbiAgQ3VycmVuY3lUeXBlLFxuICBQcmltaXRpdmVUeXBlLFxuICBNdWx0aVNlbGVjdFR5cGUsXG59IGZyb20gJy4vY29sdW1uLXR5cGVzL2NvbHVtbi10eXBlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYmFzZUNvbHVtbihjb2wpIHtcbiAgICBjb25zdCBiYXNlQ29sID0ge1xuICAgICAgaGVhZGVyOiBjb2wuaGVhZGVyLFxuICAgICAgY29sdW1uS2V5OiBVdGlscy5nZXRDb2x1bW5LZXkoY29sKSxcbiAgICAgIHdpZHRoOiAoY29sLndpZHRoIHx8IGNvbC53aWR0aCA9PT0gMCA/IGNvbC53aWR0aCA6IDIwMCksXG4gICAgICBtaW5XaWR0aDogKGNvbC5taW5XaWR0aCB8fCBjb2wubWluV2lkdGggPT09IDAgPyBjb2wubWluV2lkdGggOiA0MCksXG4gICAgICBtYXhXaWR0aDogY29sLm1heFdpZHRoLFxuICAgICAgaXNSZXNpemFibGU6ICFjb2wuZGlzYWJsZVJlc2l6aW5nLFxuICAgICAgZml4ZWQ6ICEhY29sLmZpeGVkLFxuICAgICAgZml4ZWRSaWdodDogISFjb2wuZml4ZWRSaWdodCxcbiAgICAgIGFsbG93Q2VsbHNSZWN5Y2xpbmc6ICEhY29sLmFsbG93Q2VsbHNSZWN5Y2xpbmcsXG4gICAgICBkaXNhYmxlU29ydGluZzogISFjb2wuZGlzYWJsZVNvcnRpbmcsXG4gICAgICBpc1JlcXVpcmVkOiAhIWNvbC5pc1JlcXVpcmVkLFxuICAgICAgY29tcG9uZW50VHlwZTogY29sLmNvbXBvbmVudFR5cGUsXG4gICAgICBzdHlsZTogVXRpbHMuZ2V0Q2VsbFN0eWxlQnlDb2woY29sKSxcbiAgICB9O1xuICAgIC8vIHZhbHVlS2V5UGF0aFxuICAgIGlmIChjb2wudmFsdWVLZXlQYXRoKSBiYXNlQ29sLnZhbHVlS2V5UGF0aCA9IGNvbC52YWx1ZUtleVBhdGg7XG4gICAgLy8gZmxleEdyb3dcbiAgICBpZiAoY29sLmZsZXhHcm93KSBiYXNlQ29sLmZsZXhHcm93ID0gY29sLmZsZXhHcm93O1xuICAgIC8vIHZhbHVlVHlwZVxuICAgIGlmIChjb2wudmFsdWVUeXBlKSBiYXNlQ29sLnZhbHVlVHlwZSA9IGNvbC52YWx1ZVR5cGU7XG4gICAgLy8gc29ydENvbXBhcmF0b3JcbiAgICBpZiAoY29sLnNvcnRDb21wYXJhdG9yKSBiYXNlQ29sLnNvcnRDb21wYXJhdG9yID0gY29sLnNvcnRDb21wYXJhdG9yO1xuICAgIC8vIHNvcnRWYWx1ZUdldHRlclxuICAgIGlmIChjb2wuc29ydFZhbHVlR2V0dGVyKSBiYXNlQ29sLnNvcnRWYWx1ZUdldHRlciA9IGNvbC5zb3J0VmFsdWVHZXR0ZXI7XG4gICAgcmV0dXJuIGJhc2VDb2w7XG4gIH0sXG5cbiAgY29sdW1uQ2VsbChiYXNlQ29sdW1uLCBwcm9wcywgY29sLCBiYXNlVmFsdWVSZW5kZXIpIHtcbiAgICBjb25zdCBjb2x1bW4gPSBiYXNlQ29sdW1uO1xuICAgIGlmIChjb2wuY2VsbCkge1xuICAgICAgY29sdW1uLmNlbGwgPSBjb2wuY2VsbDtcbiAgICB9IGVsc2UgaWYgKGNvbC52YWx1ZVJlbmRlcikge1xuICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBjb2wudmFsdWVSZW5kZXIocHJvcHMuZGF0YS5nZXQocm93SW5kZXgpLCByb3dJbmRleCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXRjaCAoY29sLnZhbHVlVHlwZSkge1xuICAgICAgICBjYXNlICdudW1iZXInOiAvLyBmYWxsIHRocm91Z2hcbiAgICAgICAgY2FzZSAnZmxvYXQnOiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBQcmltaXRpdmVUeXBlLm51bWJlclZhbFJlbmRlcihjb2wsIHJvd0luZGV4LCBiYXNlVmFsdWVSZW5kZXIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSAnYm9vbGVhbic6IHtcbiAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IEJvb2xlYW5UeXBlLnZhbFJlbmRlcihjb2wsIHJvd0luZGV4LCBiYXNlVmFsdWVSZW5kZXIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSAnY2hlY2tib3gnOiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBDaGVja2JveFR5cGUudmFsUmVuZGVyKHJvd0luZGV4LCBiYXNlVmFsdWVSZW5kZXIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSAnZGF0ZSc6IHtcbiAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IERhdGVUeXBlLnZhbFJlbmRlcihyb3dJbmRleCwgcHJvcHMuZGF0ZUZvcm1hdCwgYmFzZVZhbHVlUmVuZGVyKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICAvLyBjaGFuZ2UgdmFsUmVuZGVycyB0byBqdXN0IHRha2UgcHJvcHMgLS0+IHNhdmVzIHNvbWUgJ2VuZXJneSdcbiAgICAgICAgY2FzZSAnY3VycmVuY3knOiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBDdXJyZW5jeVR5cGUudmFsUmVuZGVyKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgcHJvcHMuZGF0YSxcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgcHJvcHMudGhvdXNhbmRTZXBhcmF0b3IsXG4gICAgICAgICAgICBwcm9wcy5kZWNpbWFsU2VwYXJhdG9yLFxuICAgICAgICAgICAgYmFzZVZhbHVlUmVuZGVyLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBiYXNlVmFsdWVSZW5kZXIocm93SW5kZXgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGNlbGxFZGl0IHJlbmRlclxuICAgIGlmIChjb2wuY2VsbEVkaXQpIHtcbiAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IGNvbC5jZWxsRWRpdDtcbiAgICB9IGVsc2UgaWYgKGNvbC5lZGl0VmFsdWVSZW5kZXIpIHtcbiAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IGNvbC5lZGl0VmFsdWVSZW5kZXIocHJvcHMuZGF0YS5nZXQocm93SW5kZXgpLCByb3dJbmRleCk7XG4gICAgfVxuXG4gICAgLy8gY2VsbENyZWF0ZSByZW5kZXJcbiAgICBpZiAoY29sLmNlbGxDcmVhdGUpIHtcbiAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gY29sLmNlbGxDcmVhdGU7XG4gICAgfSBlbHNlIGlmIChjb2wuY3JlYXRlVmFsdWVSZW5kZXIpIHtcbiAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gY29sLmNyZWF0ZVZhbHVlUmVuZGVyKHByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSwgcm93SW5kZXgpO1xuICAgIH1cblxuICAgIC8vIGNlbGxGaWx0ZXIgcmVuZGVyXG4gICAgaWYgKGNvbC5jZWxsRmlsdGVyKSB7XG4gICAgICBjb2x1bW4uY2VsbEZpbHRlciA9IGNvbC5jZWxsRmlsdGVyO1xuICAgIH0gZWxzZSBpZiAoY29sLmZpbHRlclZhbHVlUmVuZGVyKSB7XG4gICAgICBjb2x1bW4uY2VsbEZpbHRlciA9IHJvd0luZGV4ID0+IGNvbC5maWx0ZXJWYWx1ZVJlbmRlcihwcm9wcy5kYXRhLmdldChyb3dJbmRleCksIHJvd0luZGV4KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbHVtbjtcbiAgfSxcblxuICBjb2x1bW5Db21wb25lbnRUeXBlKGJhc2VDb2x1bW4sIHRhYkluZGV4LCBwcm9wcywgY29sLCBmdW5jdGlvbnMsIGdldERpc2FibGVkU3RhdGUpIHtcbiAgICBpZiAoIWNvbC5jb21wb25lbnRUeXBlKSByZXR1cm4gYmFzZUNvbHVtbjtcbiAgICBjb25zdCBjb2x1bW4gPSBiYXNlQ29sdW1uO1xuICAgIGxldCBlZGl0VmFsdWVQYXJzZXIgPSB2YWwgPT4gdmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgLy8gR3JpZCBpbnRlcm5hbCBmdW5jdGlvbnMgc2VwYXJhdGVkXG4gICAgY29uc3QgZWRpdEZ1bmN0aW9ucyA9IHsgLi4uZnVuY3Rpb25zLmVkaXQgfTtcbiAgICBjb25zdCBjcmVhdGVGdW5jdGlvbnMgPSB7IC4uLmZ1bmN0aW9ucy5jcmVhdGUgfTtcbiAgICBjb25zdCBmaWx0ZXJGdW5jdGlvbnMgPSB7IC4uLmZ1bmN0aW9ucy5maWx0ZXIgfTtcbiAgICBzd2l0Y2ggKGNvbC5jb21wb25lbnRUeXBlKSB7XG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAndGV4dCc6IHtcbiAgICAgICAgY29uc3QgZm9ybUNvbnRyb2xUeXBlID0gY29sLmNvbXBvbmVudFR5cGUgPT09ICdmbG9hdCcgfHwgY29sLmNvbXBvbmVudFR5cGUgPT09ICdudW1iZXInID8gJ3RleHQnIDogY29sLmNvbXBvbmVudFR5cGU7XG4gICAgICAgIGNvbnN0IHByaW1pdGl2ZVZhbFBhcnNlciA9IGNvbC5jb21wb25lbnRUeXBlID09PSAnZmxvYXQnID9cbiAgICAgICAgICAodmFsID0+IHZhbC5yZXBsYWNlKG5ldyBSZWdFeHAoYFteXFxcXGQke3Byb3BzLmRlY2ltYWxTZXBhcmF0b3J9Ky1dYCwgJ2cnKSwgJycpKSA6IGVkaXRWYWx1ZVBhcnNlcjtcblxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT5cbiAgICAgICAgICAgIFByaW1pdGl2ZVR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICAgIHByaW1pdGl2ZVZhbFBhcnNlcixcbiAgICAgICAgICAgICAgZm9ybUNvbnRyb2xUeXBlLFxuICAgICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gUHJpbWl0aXZlVHlwZS5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBwcmltaXRpdmVWYWxQYXJzZXIsXG4gICAgICAgICAgICBmb3JtQ29udHJvbFR5cGUsXG4gICAgICAgICAgICAuLi5jcmVhdGVGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcHMuZmlsdGVyaW5nICYmICFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT4gUHJpbWl0aXZlVHlwZS5jZWxsRmlsdGVyKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgcHJpbWl0aXZlVmFsUGFyc2VyLFxuICAgICAgICAgICAgZm9ybUNvbnRyb2xUeXBlLFxuICAgICAgICAgICAgLi4uZmlsdGVyRnVuY3Rpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ2NoZWNrYm94Jzoge1xuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gQ2hlY2tib3hUeXBlLmNlbGxFZGl0KFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiBDaGVja2JveFR5cGUuY2VsbENyZWF0ZShcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgLi4uY3JlYXRlRnVuY3Rpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+XG4gICAgICAgICAgICBDaGVja2JveFR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgICBwcm9wcy5pbnRsLFxuICAgICAgICAgICAgICAuLi5maWx0ZXJGdW5jdGlvbnMsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlICdtdWx0aXNlbGVjdCc6IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0T3B0aW9ucyA9IGNvbC5zZWxlY3RDb21wb25lbnRPcHRpb25zIHx8XG4gICAgICAgICAgcHJvcHMuc2VsZWN0Q29tcG9uZW50T3B0aW9ucy5nZXQoY29sdW1uLmNvbHVtbktleSk7XG4gICAgICAgIGNvbnN0IHNlbGVjdFRyYW5zbGF0aW9ucyA9IGNvbC5zZWxlY3RDb21wb25lbnRUcmFuc2xhdGlvbnMgfHxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0LlNlbGVjdCcgfSksXG4gICAgICAgICAgICBub1Jlc3VsdHNUZXh0OiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuTm9SZXN1bHRzJyB9KSxcbiAgICAgICAgICAgIHNlbGVjdGVkOiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuU2VsZWN0ZWQnIH0pLFxuICAgICAgICAgIH07XG5cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+XG4gICAgICAgICAgICBTZWxlY3RUeXBlLmNlbGxFZGl0KFxuICAgICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgICAgLi4uZWRpdEZ1bmN0aW9ucyxcbiAgICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PlxuICAgICAgICAgICAgU2VsZWN0VHlwZS5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgICAgLi4uY3JlYXRlRnVuY3Rpb25zLFxuICAgICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuZmlsdGVyaW5nICYmICFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT5cbiAgICAgICAgICAgIE11bHRpU2VsZWN0VHlwZS5jZWxsRmlsdGVyKFxuICAgICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgICAuLi5maWx0ZXJGdW5jdGlvbnMsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlICdzZWxlY3QnOiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50T3B0aW9ucyB8fFxuICAgICAgICAgIHByb3BzLnNlbGVjdENvbXBvbmVudE9wdGlvbnMuZ2V0KGNvbHVtbi5jb2x1bW5LZXkpO1xuICAgICAgICBjb25zdCBzZWxlY3RUcmFuc2xhdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50VHJhbnNsYXRpb25zIHx8XG4gICAgICAgICAge1xuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5TZWxlY3QnIH0pLFxuICAgICAgICAgICAgbm9SZXN1bHRzVGV4dDogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0Lk5vUmVzdWx0cycgfSksXG4gICAgICAgICAgfTtcblxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT5cbiAgICAgICAgICAgIFNlbGVjdFR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+XG4gICAgICAgICAgICBTZWxlY3RUeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgICAuLi5jcmVhdGVGdW5jdGlvbnMsXG4gICAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5maWx0ZXJpbmcgJiYgIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PlxuICAgICAgICAgICAgU2VsZWN0VHlwZS5jZWxsRmlsdGVyKFxuICAgICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgICAuLi5maWx0ZXJGdW5jdGlvbnMsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlICdib29sZWFuJzoge1xuICAgICAgICBjb25zdCBzZWxlY3RPcHRpb25zID0gW1xuICAgICAgICAgIHsgdmFsdWU6IHRydWUsIGxhYmVsOiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuWWVzJyB9KSB9LFxuICAgICAgICAgIHsgdmFsdWU6IGZhbHNlLCBsYWJlbDogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLk5vJyB9KSB9LFxuICAgICAgICBdO1xuICAgICAgICBjb25zdCBzZWxlY3RUcmFuc2xhdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50VHJhbnNsYXRpb25zIHx8IHtcbiAgICAgICAgICBwbGFjZWhvbGRlcjogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0LlNlbGVjdCcgfSksXG4gICAgICAgICAgbm9SZXN1bHRzVGV4dDogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0Lk5vUmVzdWx0cycgfSksXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+XG4gICAgICAgICAgICBCb29sZWFuVHlwZS5jZWxsRWRpdChcbiAgICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT5cbiAgICAgICAgICAgIEJvb2xlYW5UeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgICAuLi5jcmVhdGVGdW5jdGlvbnMsXG4gICAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5maWx0ZXJpbmcgJiYgIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PlxuICAgICAgICAgICAgQm9vbGVhblR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgICAgLi4uZmlsdGVyRnVuY3Rpb25zLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSAnZGF0ZSc6IHtcbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IERhdGVUeXBlLmNlbGxFZGl0KFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBwcm9wcy5yZWdpb24sXG4gICAgICAgICAgICBwcm9wcy5kYXRlRm9ybWF0LFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uZWRpdEZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IERhdGVUeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByb3BzLnJlZ2lvbixcbiAgICAgICAgICAgIHByb3BzLmRhdGVGb3JtYXQsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5jcmVhdGVGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+XG4gICAgICAgICAgICBEYXRlVHlwZS5jZWxsRmlsdGVyKFxuICAgICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICAgIHByb3BzLnJlZ2lvbixcbiAgICAgICAgICAgICAgcHJvcHMuZGF0ZUZvcm1hdCxcbiAgICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgICAuLi5maWx0ZXJGdW5jdGlvbnMsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBkZWZhdWx0OlxuICAgIH1cbiAgICByZXR1cm4gY29sdW1uO1xuICB9LFxufTtcbiJdfQ==