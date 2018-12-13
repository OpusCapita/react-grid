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

      case 'select':
        {
          var selectOptions = col.selectComponentOptions || props.selectComponentOptions.get(column.columnKey);
          var selectTranslations = col.selectComponentTranslations || {
            placeholder: props.intl.formatMessage({ id: 'Grid.FloatingSelect.Select' }),
            noResultsText: props.intl.formatMessage({ id: 'Grid.FloatingSelect.NoResults' })
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
              return _columnTypes.SelectType.cellFilter.apply(_columnTypes.SelectType, [col, column, tabIndex, props.grid.id, selectOptions, selectTranslations, editValueParser].concat(filterFunctions));
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
              return _columnTypes.BooleanType.cellEdit.apply(_columnTypes.BooleanType, [col, column, rowIndex, tabIndex, props.grid.id, _selectOptions, _selectTranslations, editValueParser].concat(editFunctions, [getDisabledState]));
            };
          }
          if (props.inlineEdit && !column.cellCreate) {
            column.cellCreate = function (rowIndex) {
              return _columnTypes.BooleanType.cellCreate.apply(_columnTypes.BooleanType, [col, column, rowIndex, tabIndex, props.grid.id, _selectOptions, _selectTranslations, editValueParser].concat(createFunctions, [getDisabledState]));
            };
          }
          if (props.filtering && !column.cellFilter) {
            column.cellFilter = function () {
              return _columnTypes.BooleanType.cellFilter.apply(_columnTypes.BooleanType, [col, column, tabIndex, props.grid.id, _selectOptions, _selectTranslations, editValueParser].concat(filterFunctions));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2VydmljZS9jb2x1bW4tc2VydmljZS5qc3giXSwibmFtZXMiOlsiYmFzZUNvbHVtbiIsImNvbCIsImJhc2VDb2wiLCJoZWFkZXIiLCJjb2x1bW5LZXkiLCJVdGlscyIsImdldENvbHVtbktleSIsIndpZHRoIiwibWluV2lkdGgiLCJtYXhXaWR0aCIsImlzUmVzaXphYmxlIiwiZGlzYWJsZVJlc2l6aW5nIiwiZml4ZWQiLCJhbGxvd0NlbGxzUmVjeWNsaW5nIiwiZGlzYWJsZVNvcnRpbmciLCJpc1JlcXVpcmVkIiwiY29tcG9uZW50VHlwZSIsInN0eWxlIiwiZ2V0Q2VsbFN0eWxlQnlDb2wiLCJ2YWx1ZUtleVBhdGgiLCJmbGV4R3JvdyIsInZhbHVlVHlwZSIsInNvcnRDb21wYXJhdG9yIiwic29ydFZhbHVlR2V0dGVyIiwiY29sdW1uQ2VsbCIsInByb3BzIiwiYmFzZVZhbHVlUmVuZGVyIiwiY29sdW1uIiwiY2VsbCIsInZhbHVlUmVuZGVyIiwiZGF0YSIsImdldCIsInJvd0luZGV4IiwiUHJpbWl0aXZlVHlwZSIsIm51bWJlclZhbFJlbmRlciIsIkJvb2xlYW5UeXBlIiwidmFsUmVuZGVyIiwiQ2hlY2tib3hUeXBlIiwiRGF0ZVR5cGUiLCJkYXRlRm9ybWF0IiwiQ3VycmVuY3lUeXBlIiwidGhvdXNhbmRTZXBhcmF0b3IiLCJkZWNpbWFsU2VwYXJhdG9yIiwiY2VsbEVkaXQiLCJlZGl0VmFsdWVSZW5kZXIiLCJjZWxsQ3JlYXRlIiwiY3JlYXRlVmFsdWVSZW5kZXIiLCJjZWxsRmlsdGVyIiwiZmlsdGVyVmFsdWVSZW5kZXIiLCJjb2x1bW5Db21wb25lbnRUeXBlIiwidGFiSW5kZXgiLCJmdW5jdGlvbnMiLCJnZXREaXNhYmxlZFN0YXRlIiwiZWRpdFZhbHVlUGFyc2VyIiwidmFsIiwiZWRpdEZ1bmN0aW9ucyIsImVkaXQiLCJjcmVhdGVGdW5jdGlvbnMiLCJjcmVhdGUiLCJmaWx0ZXJGdW5jdGlvbnMiLCJmaWx0ZXIiLCJmb3JtQ29udHJvbFR5cGUiLCJwcmltaXRpdmVWYWxQYXJzZXIiLCJyZXBsYWNlIiwiUmVnRXhwIiwiaW5saW5lRWRpdCIsImdyaWQiLCJpZCIsImZpbHRlcmluZyIsImludGwiLCJzZWxlY3RPcHRpb25zIiwic2VsZWN0Q29tcG9uZW50T3B0aW9ucyIsInNlbGVjdFRyYW5zbGF0aW9ucyIsInNlbGVjdENvbXBvbmVudFRyYW5zbGF0aW9ucyIsInBsYWNlaG9sZGVyIiwiZm9ybWF0TWVzc2FnZSIsIm5vUmVzdWx0c1RleHQiLCJTZWxlY3RUeXBlIiwidmFsdWUiLCJsYWJlbCIsInJlZ2lvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztrQkFTZTtBQUNiQSxZQURhLHNCQUNGQyxHQURFLEVBQ0c7QUFDZCxRQUFNQyxVQUFVO0FBQ2RDLGNBQVFGLElBQUlFLE1BREU7QUFFZEMsaUJBQVdDLG1CQUFNQyxZQUFOLENBQW1CTCxHQUFuQixDQUZHO0FBR2RNLGFBQVFOLElBQUlNLEtBQUosSUFBYU4sSUFBSU0sS0FBSixLQUFjLENBQTNCLEdBQStCTixJQUFJTSxLQUFuQyxHQUEyQyxHQUhyQztBQUlkQyxnQkFBV1AsSUFBSU8sUUFBSixJQUFnQlAsSUFBSU8sUUFBSixLQUFpQixDQUFqQyxHQUFxQ1AsSUFBSU8sUUFBekMsR0FBb0QsRUFKakQ7QUFLZEMsZ0JBQVVSLElBQUlRLFFBTEE7QUFNZEMsbUJBQWEsQ0FBQ1QsSUFBSVUsZUFOSjtBQU9kQyxhQUFPLENBQUMsQ0FBQ1gsSUFBSVcsS0FQQztBQVFkQywyQkFBcUIsQ0FBQyxDQUFDWixJQUFJWSxtQkFSYjtBQVNkQyxzQkFBZ0IsQ0FBQyxDQUFDYixJQUFJYSxjQVRSO0FBVWRDLGtCQUFZLENBQUMsQ0FBQ2QsSUFBSWMsVUFWSjtBQVdkQyxxQkFBZWYsSUFBSWUsYUFYTDtBQVlkQyxhQUFPWixtQkFBTWEsaUJBQU4sQ0FBd0JqQixHQUF4QjtBQVpPLEtBQWhCO0FBY0E7QUFDQSxRQUFJQSxJQUFJa0IsWUFB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RDtBQUNELGNBQUkzQixNQUFNd0MsVUFBTixJQUFvQixDQUFDdEMsT0FBT2tCLFVBQWhDLEVBQTRDO0FBQzFDbEIsbUJBQU9rQixVQUFQLEdBQW9CO0FBQUEscUJBQVlQLHNCQUFTTyxVQUFULCtCQUM5QjVDLEdBRDhCLEVBRTlCMEIsTUFGOEIsRUFHOUJLLFFBSDhCLEVBSTlCa0IsUUFKOEIsRUFLOUJ6QixNQUFNeUMsSUFBTixDQUFXQyxFQUxtQixFQU05QjFDLE1BQU11RCxNQU53QixFQU85QnZELE1BQU1jLFVBUHdCLEVBUTlCYyxlQVI4QixTQVMzQkksZUFUMkIsR0FVOUJMLGdCQVY4QixHQUFaO0FBQUEsYUFBcEI7QUFZRDtBQUNELGNBQUkzQixNQUFNMkMsU0FBTixJQUFtQixDQUFDekMsT0FBT29CLFVBQS9CLEVBQTJDO0FBQ3pDcEIsbUJBQU9vQixVQUFQLEdBQW9CO0FBQUEscUJBQ2xCVCxzQkFBU1MsVUFBVCwrQkFDRTlDLEdBREYsRUFFRTBCLE1BRkYsRUFHRXVCLFFBSEYsRUFJRXpCLE1BQU15QyxJQUFOLENBQVdDLEVBSmIsRUFLRTFDLE1BQU11RCxNQUxSLEVBTUV2RCxNQUFNYyxVQU5SLEVBT0VjLGVBUEYsU0FRS00sZUFSTCxFQURrQjtBQUFBLGFBQXBCO0FBV0Q7QUFDRDtBQUNEOztBQUVEO0FBbFBGO0FBb1BBLFdBQU9oQyxNQUFQO0FBQ0Q7QUFoV1ksQyIsImZpbGUiOiJjb2x1bW4tc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBVdGlscyBmcm9tICcuLi9kYXRhZ3JpZC51dGlscyc7XG5pbXBvcnQge1xuICBEYXRlVHlwZSxcbiAgU2VsZWN0VHlwZSxcbiAgQm9vbGVhblR5cGUsXG4gIENoZWNrYm94VHlwZSxcbiAgQ3VycmVuY3lUeXBlLFxuICBQcmltaXRpdmVUeXBlLFxufSBmcm9tICcuL2NvbHVtbi10eXBlcy9jb2x1bW4tdHlwZXMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGJhc2VDb2x1bW4oY29sKSB7XG4gICAgY29uc3QgYmFzZUNvbCA9IHtcbiAgICAgIGhlYWRlcjogY29sLmhlYWRlcixcbiAgICAgIGNvbHVtbktleTogVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCksXG4gICAgICB3aWR0aDogKGNvbC53aWR0aCB8fCBjb2wud2lkdGggPT09IDAgPyBjb2wud2lkdGggOiAyMDApLFxuICAgICAgbWluV2lkdGg6IChjb2wubWluV2lkdGggfHwgY29sLm1pbldpZHRoID09PSAwID8gY29sLm1pbldpZHRoIDogNDApLFxuICAgICAgbWF4V2lkdGg6IGNvbC5tYXhXaWR0aCxcbiAgICAgIGlzUmVzaXphYmxlOiAhY29sLmRpc2FibGVSZXNpemluZyxcbiAgICAgIGZpeGVkOiAhIWNvbC5maXhlZCxcbiAgICAgIGFsbG93Q2VsbHNSZWN5Y2xpbmc6ICEhY29sLmFsbG93Q2VsbHNSZWN5Y2xpbmcsXG4gICAgICBkaXNhYmxlU29ydGluZzogISFjb2wuZGlzYWJsZVNvcnRpbmcsXG4gICAgICBpc1JlcXVpcmVkOiAhIWNvbC5pc1JlcXVpcmVkLFxuICAgICAgY29tcG9uZW50VHlwZTogY29sLmNvbXBvbmVudFR5cGUsXG4gICAgICBzdHlsZTogVXRpbHMuZ2V0Q2VsbFN0eWxlQnlDb2woY29sKSxcbiAgICB9O1xuICAgIC8vIHZhbHVlS2V5UGF0aFxuICAgIGlmIChjb2wudmFsdWVLZXlQYXRoKSBiYXNlQ29sLnZhbHVlS2V5UGF0aCA9IGNvbC52YWx1ZUtleVBhdGg7XG4gICAgLy8gZmxleEdyb3dcbiAgICBpZiAoY29sLmZsZXhHcm93KSBiYXNlQ29sLmZsZXhHcm93ID0gY29sLmZsZXhHcm93O1xuICAgIC8vIHZhbHVlVHlwZVxuICAgIGlmIChjb2wudmFsdWVUeXBlKSBiYXNlQ29sLnZhbHVlVHlwZSA9IGNvbC52YWx1ZVR5cGU7XG4gICAgLy8gc29ydENvbXBhcmF0b3JcbiAgICBpZiAoY29sLnNvcnRDb21wYXJhdG9yKSBiYXNlQ29sLnNvcnRDb21wYXJhdG9yID0gY29sLnNvcnRDb21wYXJhdG9yO1xuICAgIC8vIHNvcnRWYWx1ZUdldHRlclxuICAgIGlmIChjb2wuc29ydFZhbHVlR2V0dGVyKSBiYXNlQ29sLnNvcnRWYWx1ZUdldHRlciA9IGNvbC5zb3J0VmFsdWVHZXR0ZXI7XG4gICAgcmV0dXJuIGJhc2VDb2w7XG4gIH0sXG5cbiAgY29sdW1uQ2VsbChiYXNlQ29sdW1uLCBwcm9wcywgY29sLCBiYXNlVmFsdWVSZW5kZXIpIHtcbiAgICBjb25zdCBjb2x1bW4gPSBiYXNlQ29sdW1uO1xuICAgIGlmIChjb2wuY2VsbCkge1xuICAgICAgY29sdW1uLmNlbGwgPSBjb2wuY2VsbDtcbiAgICB9IGVsc2UgaWYgKGNvbC52YWx1ZVJlbmRlcikge1xuICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBjb2wudmFsdWVSZW5kZXIocHJvcHMuZGF0YS5nZXQocm93SW5kZXgpLCByb3dJbmRleCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXRjaCAoY29sLnZhbHVlVHlwZSkge1xuICAgICAgICBjYXNlICdudW1iZXInOiAvLyBmYWxsIHRocm91Z2hcbiAgICAgICAgY2FzZSAnZmxvYXQnOiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBQcmltaXRpdmVUeXBlLm51bWJlclZhbFJlbmRlcihjb2wsIHJvd0luZGV4LCBiYXNlVmFsdWVSZW5kZXIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSAnYm9vbGVhbic6IHtcbiAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IEJvb2xlYW5UeXBlLnZhbFJlbmRlcihjb2wsIHJvd0luZGV4LCBiYXNlVmFsdWVSZW5kZXIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSAnY2hlY2tib3gnOiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBDaGVja2JveFR5cGUudmFsUmVuZGVyKHJvd0luZGV4LCBiYXNlVmFsdWVSZW5kZXIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSAnZGF0ZSc6IHtcbiAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IERhdGVUeXBlLnZhbFJlbmRlcihyb3dJbmRleCwgcHJvcHMuZGF0ZUZvcm1hdCwgYmFzZVZhbHVlUmVuZGVyKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICAvLyBjaGFuZ2UgdmFsUmVuZGVycyB0byBqdXN0IHRha2UgcHJvcHMgLS0+IHNhdmVzIHNvbWUgJ2VuZXJneSdcbiAgICAgICAgY2FzZSAnY3VycmVuY3knOiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBDdXJyZW5jeVR5cGUudmFsUmVuZGVyKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgcHJvcHMuZGF0YSxcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgcHJvcHMudGhvdXNhbmRTZXBhcmF0b3IsXG4gICAgICAgICAgICBwcm9wcy5kZWNpbWFsU2VwYXJhdG9yLFxuICAgICAgICAgICAgYmFzZVZhbHVlUmVuZGVyLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBiYXNlVmFsdWVSZW5kZXIocm93SW5kZXgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGNlbGxFZGl0IHJlbmRlclxuICAgIGlmIChjb2wuY2VsbEVkaXQpIHtcbiAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IGNvbC5jZWxsRWRpdDtcbiAgICB9IGVsc2UgaWYgKGNvbC5lZGl0VmFsdWVSZW5kZXIpIHtcbiAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IGNvbC5lZGl0VmFsdWVSZW5kZXIocHJvcHMuZGF0YS5nZXQocm93SW5kZXgpLCByb3dJbmRleCk7XG4gICAgfVxuXG4gICAgLy8gY2VsbENyZWF0ZSByZW5kZXJcbiAgICBpZiAoY29sLmNlbGxDcmVhdGUpIHtcbiAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gY29sLmNlbGxDcmVhdGU7XG4gICAgfSBlbHNlIGlmIChjb2wuY3JlYXRlVmFsdWVSZW5kZXIpIHtcbiAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gY29sLmNyZWF0ZVZhbHVlUmVuZGVyKHByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSwgcm93SW5kZXgpO1xuICAgIH1cblxuICAgIC8vIGNlbGxGaWx0ZXIgcmVuZGVyXG4gICAgaWYgKGNvbC5jZWxsRmlsdGVyKSB7XG4gICAgICBjb2x1bW4uY2VsbEZpbHRlciA9IGNvbC5jZWxsRmlsdGVyO1xuICAgIH0gZWxzZSBpZiAoY29sLmZpbHRlclZhbHVlUmVuZGVyKSB7XG4gICAgICBjb2x1bW4uY2VsbEZpbHRlciA9IHJvd0luZGV4ID0+IGNvbC5maWx0ZXJWYWx1ZVJlbmRlcihwcm9wcy5kYXRhLmdldChyb3dJbmRleCksIHJvd0luZGV4KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbHVtbjtcbiAgfSxcblxuICBjb2x1bW5Db21wb25lbnRUeXBlKGJhc2VDb2x1bW4sIHRhYkluZGV4LCBwcm9wcywgY29sLCBmdW5jdGlvbnMsIGdldERpc2FibGVkU3RhdGUpIHtcbiAgICBpZiAoIWNvbC5jb21wb25lbnRUeXBlKSByZXR1cm4gYmFzZUNvbHVtbjtcbiAgICBjb25zdCBjb2x1bW4gPSBiYXNlQ29sdW1uO1xuICAgIGxldCBlZGl0VmFsdWVQYXJzZXIgPSB2YWwgPT4gdmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgLy8gR3JpZCBpbnRlcm5hbCBmdW5jdGlvbnMgc2VwYXJhdGVkXG4gICAgY29uc3QgZWRpdEZ1bmN0aW9ucyA9IHsgLi4uZnVuY3Rpb25zLmVkaXQgfTtcbiAgICBjb25zdCBjcmVhdGVGdW5jdGlvbnMgPSB7IC4uLmZ1bmN0aW9ucy5jcmVhdGUgfTtcbiAgICBjb25zdCBmaWx0ZXJGdW5jdGlvbnMgPSB7IC4uLmZ1bmN0aW9ucy5maWx0ZXIgfTtcbiAgICBzd2l0Y2ggKGNvbC5jb21wb25lbnRUeXBlKSB7XG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAndGV4dCc6IHtcbiAgICAgICAgY29uc3QgZm9ybUNvbnRyb2xUeXBlID0gY29sLmNvbXBvbmVudFR5cGUgPT09ICdmbG9hdCcgfHwgY29sLmNvbXBvbmVudFR5cGUgPT09ICdudW1iZXInID8gJ3RleHQnIDogY29sLmNvbXBvbmVudFR5cGU7XG4gICAgICAgIGNvbnN0IHByaW1pdGl2ZVZhbFBhcnNlciA9IGNvbC5jb21wb25lbnRUeXBlID09PSAnZmxvYXQnID9cbiAgICAgICAgICAodmFsID0+IHZhbC5yZXBsYWNlKG5ldyBSZWdFeHAoYFteXFxcXGQke3Byb3BzLmRlY2ltYWxTZXBhcmF0b3J9Ky1dYCwgJ2cnKSwgJycpKSA6IGVkaXRWYWx1ZVBhcnNlcjtcblxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT5cbiAgICAgICAgICAgIFByaW1pdGl2ZVR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICAgIHByaW1pdGl2ZVZhbFBhcnNlcixcbiAgICAgICAgICAgICAgZm9ybUNvbnRyb2xUeXBlLFxuICAgICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gUHJpbWl0aXZlVHlwZS5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBwcmltaXRpdmVWYWxQYXJzZXIsXG4gICAgICAgICAgICBmb3JtQ29udHJvbFR5cGUsXG4gICAgICAgICAgICAuLi5jcmVhdGVGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcHMuZmlsdGVyaW5nICYmICFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT4gUHJpbWl0aXZlVHlwZS5jZWxsRmlsdGVyKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgcHJpbWl0aXZlVmFsUGFyc2VyLFxuICAgICAgICAgICAgZm9ybUNvbnRyb2xUeXBlLFxuICAgICAgICAgICAgLi4uZmlsdGVyRnVuY3Rpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ2NoZWNrYm94Jzoge1xuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gQ2hlY2tib3hUeXBlLmNlbGxFZGl0KFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiBDaGVja2JveFR5cGUuY2VsbENyZWF0ZShcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgLi4uY3JlYXRlRnVuY3Rpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+XG4gICAgICAgICAgICBDaGVja2JveFR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgICBwcm9wcy5pbnRsLFxuICAgICAgICAgICAgICAuLi5maWx0ZXJGdW5jdGlvbnMsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlICdzZWxlY3QnOiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50T3B0aW9ucyB8fFxuICAgICAgICAgIHByb3BzLnNlbGVjdENvbXBvbmVudE9wdGlvbnMuZ2V0KGNvbHVtbi5jb2x1bW5LZXkpO1xuICAgICAgICBjb25zdCBzZWxlY3RUcmFuc2xhdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50VHJhbnNsYXRpb25zIHx8XG4gICAgICAgICAge1xuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5TZWxlY3QnIH0pLFxuICAgICAgICAgICAgbm9SZXN1bHRzVGV4dDogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0Lk5vUmVzdWx0cycgfSksXG4gICAgICAgICAgfTtcblxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT5cbiAgICAgICAgICAgIFNlbGVjdFR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+XG4gICAgICAgICAgICBTZWxlY3RUeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgICAuLi5jcmVhdGVGdW5jdGlvbnMsXG4gICAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5maWx0ZXJpbmcgJiYgIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PlxuICAgICAgICAgICAgU2VsZWN0VHlwZS5jZWxsRmlsdGVyKFxuICAgICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgICAuLi5maWx0ZXJGdW5jdGlvbnMsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlICdib29sZWFuJzoge1xuICAgICAgICBjb25zdCBzZWxlY3RPcHRpb25zID0gW1xuICAgICAgICAgIHsgdmFsdWU6IHRydWUsIGxhYmVsOiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuWWVzJyB9KSB9LFxuICAgICAgICAgIHsgdmFsdWU6IGZhbHNlLCBsYWJlbDogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLk5vJyB9KSB9LFxuICAgICAgICBdO1xuICAgICAgICBjb25zdCBzZWxlY3RUcmFuc2xhdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50VHJhbnNsYXRpb25zIHx8IHtcbiAgICAgICAgICBwbGFjZWhvbGRlcjogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0LlNlbGVjdCcgfSksXG4gICAgICAgICAgbm9SZXN1bHRzVGV4dDogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0Lk5vUmVzdWx0cycgfSksXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+XG4gICAgICAgICAgICBCb29sZWFuVHlwZS5jZWxsRWRpdChcbiAgICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT5cbiAgICAgICAgICAgIEJvb2xlYW5UeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgICAuLi5jcmVhdGVGdW5jdGlvbnMsXG4gICAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5maWx0ZXJpbmcgJiYgIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PlxuICAgICAgICAgICAgQm9vbGVhblR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgICAgLi4uZmlsdGVyRnVuY3Rpb25zLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSAnZGF0ZSc6IHtcbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IERhdGVUeXBlLmNlbGxFZGl0KFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBwcm9wcy5yZWdpb24sXG4gICAgICAgICAgICBwcm9wcy5kYXRlRm9ybWF0LFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uZWRpdEZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IERhdGVUeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByb3BzLnJlZ2lvbixcbiAgICAgICAgICAgIHByb3BzLmRhdGVGb3JtYXQsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5jcmVhdGVGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+XG4gICAgICAgICAgICBEYXRlVHlwZS5jZWxsRmlsdGVyKFxuICAgICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICAgIHByb3BzLnJlZ2lvbixcbiAgICAgICAgICAgICAgcHJvcHMuZGF0ZUZvcm1hdCxcbiAgICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgICAuLi5maWx0ZXJGdW5jdGlvbnMsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBkZWZhdWx0OlxuICAgIH1cbiAgICByZXR1cm4gY29sdW1uO1xuICB9LFxufTtcbiJdfQ==