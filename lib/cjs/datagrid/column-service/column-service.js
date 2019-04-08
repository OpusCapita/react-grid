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
            // Variable 'n' must be provided in this phase in order to avoid
            // Error: The intl string context variable 'n' was not provided to the string {n}
            // selected
            // Variable n is replaced later, when its value is available
            selected: props.intl.formatMessage({ id: 'Grid.FloatingSelect.Selected' }, { n: '<n>' })
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2VydmljZS9jb2x1bW4tc2VydmljZS5qc3giXSwibmFtZXMiOlsiYmFzZUNvbHVtbiIsImNvbCIsImJhc2VDb2wiLCJoZWFkZXIiLCJjb2x1bW5LZXkiLCJVdGlscyIsImdldENvbHVtbktleSIsIndpZHRoIiwibWluV2lkdGgiLCJtYXhXaWR0aCIsImlzUmVzaXphYmxlIiwiZGlzYWJsZVJlc2l6aW5nIiwiZml4ZWQiLCJmaXhlZFJpZ2h0IiwiYWxsb3dDZWxsc1JlY3ljbGluZyIsImRpc2FibGVTb3J0aW5nIiwiaXNSZXF1aXJlZCIsImNvbXBvbmVudFR5cGUiLCJzdHlsZSIsImdldENlbGxTdHlsZUJ5Q29sIiwidmFsdWVLZXlQYXRoIiwiZmxleEdyb3ciLCJ2YWx1ZVR5cGUiLCJzb3J0Q29tcGFyYXRvciIsInNvcnRWYWx1ZUdldHRlciIsImNvbHVtbkNlbGwiLCJwcm9wcyIsImJhc2VWYWx1ZVJlbmRlciIsImNvbHVtbiIsImNlbGwiLCJ2YWx1ZVJlbmRlciIsImRhdGEiLCJnZXQiLCJyb3dJbmRleCIsIlByaW1pdGl2ZVR5cGUiLCJudW1iZXJWYWxSZW5kZXIiLCJCb29sZWFuVHlwZSIsInZhbFJlbmRlciIsIkNoZWNrYm94VHlwZSIsIkRhdGVUeXBlIiwiZGF0ZUZvcm1hdCIsIkN1cnJlbmN5VHlwZSIsInRob3VzYW5kU2VwYXJhdG9yIiwiZGVjaW1hbFNlcGFyYXRvciIsImNlbGxFZGl0IiwiZWRpdFZhbHVlUmVuZGVyIiwic2V0UmVmIiwib25LZXlEb3duIiwiY2VsbENyZWF0ZSIsImNyZWF0ZVZhbHVlUmVuZGVyIiwiY2VsbEZpbHRlciIsImZpbHRlclZhbHVlUmVuZGVyIiwiY29sdW1uQ29tcG9uZW50VHlwZSIsInRhYkluZGV4IiwiZnVuY3Rpb25zIiwiZ2V0RGlzYWJsZWRTdGF0ZSIsImVkaXRWYWx1ZVBhcnNlciIsInZhbCIsImVkaXRGdW5jdGlvbnMiLCJlZGl0IiwiY3JlYXRlRnVuY3Rpb25zIiwiY3JlYXRlIiwiZmlsdGVyRnVuY3Rpb25zIiwiZmlsdGVyIiwiZm9ybUNvbnRyb2xUeXBlIiwicHJpbWl0aXZlVmFsUGFyc2VyIiwicmVwbGFjZSIsIlJlZ0V4cCIsImlubGluZUVkaXQiLCJncmlkIiwiaWQiLCJmaWx0ZXJpbmciLCJpbnRsIiwic2VsZWN0T3B0aW9ucyIsInNlbGVjdENvbXBvbmVudE9wdGlvbnMiLCJzZWxlY3RUcmFuc2xhdGlvbnMiLCJzZWxlY3RDb21wb25lbnRUcmFuc2xhdGlvbnMiLCJwbGFjZWhvbGRlciIsImZvcm1hdE1lc3NhZ2UiLCJub1Jlc3VsdHNUZXh0Iiwic2VsZWN0ZWQiLCJuIiwiU2VsZWN0VHlwZSIsIk11bHRpU2VsZWN0VHlwZSIsInZhbHVlIiwibGFiZWwiLCJyZWdpb24iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7a0JBVWU7QUFDYkEsWUFEYSxzQkFDRkMsR0FERSxFQUNHO0FBQ2QsUUFBTUMsVUFBVTtBQUNkQyxjQUFRRixJQUFJRSxNQURFO0FBRWRDLGlCQUFXQyxtQkFBTUMsWUFBTixDQUFtQkwsR0FBbkIsQ0FGRztBQUdkTSxhQUFRTixJQUFJTSxLQUFKLElBQWFOLElBQUlNLEtBQUosS0FBYyxDQUEzQixHQUErQk4sSUFBSU0sS0FBbkMsR0FBMkMsR0FIckM7QUFJZEMsZ0JBQVdQLElBQUlPLFFBQUosSUFBZ0JQLElBQUlPLFFBQUosS0FBaUIsQ0FBakMsR0FBcUNQLElBQUlPLFFBQXpDLEdBQW9ELEVBSmpEO0FBS2RDLGdCQUFVUixJQUFJUSxRQUxBO0FBTWRDLG1CQUFhLENBQUNULElBQUlVLGVBTko7QUFPZEMsYUFBTyxDQUFDLENBQUNYLElBQUlXLEtBUEM7QUFRZEMsa0JBQVksQ0FBQyxDQUFDWixJQUFJWSxVQVJKO0FBU2RDLDJCQUFxQixDQUFDLENBQUNiLElBQUlhLG1CQVRiO0FBVWRDLHNCQUFnQixDQUFDLENBQUNkLElBQUljLGNBVlI7QUFXZEMsa0JBQVksQ0FBQyxDQUFDZixJQUFJZSxVQVhK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QUFBQSxhQUFwQjtBQVlEO0FBQ0QsY0FBSTdCLE1BQU02QyxTQUFOLElBQW1CLENBQUMzQyxPQUFPc0IsVUFBL0IsRUFBMkM7QUFDekN0QixtQkFBT3NCLFVBQVAsR0FBb0I7QUFBQSxxQkFDbEJYLHNCQUFTVyxVQUFULCtCQUNFakQsR0FERixFQUVFMkIsTUFGRixFQUdFeUIsUUFIRixFQUlFM0IsTUFBTTJDLElBQU4sQ0FBV0MsRUFKYixFQUtFNUMsTUFBTTRELE1BTFIsRUFNRTVELE1BQU1jLFVBTlIsRUFPRWdCLGVBUEYsU0FRS00sZUFSTCxFQURrQjtBQUFBLGFBQXBCO0FBV0Q7QUFDRDtBQUNEOztBQUVEO0FBL1NGO0FBaVRBLFdBQU9sQyxNQUFQO0FBQ0Q7QUFqYVksQyIsImZpbGUiOiJjb2x1bW4tc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBVdGlscyBmcm9tICcuLi9kYXRhZ3JpZC51dGlscyc7XG5pbXBvcnQge1xuICBEYXRlVHlwZSxcbiAgU2VsZWN0VHlwZSxcbiAgQm9vbGVhblR5cGUsXG4gIENoZWNrYm94VHlwZSxcbiAgQ3VycmVuY3lUeXBlLFxuICBQcmltaXRpdmVUeXBlLFxuICBNdWx0aVNlbGVjdFR5cGUsXG59IGZyb20gJy4vY29sdW1uLXR5cGVzL2NvbHVtbi10eXBlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYmFzZUNvbHVtbihjb2wpIHtcbiAgICBjb25zdCBiYXNlQ29sID0ge1xuICAgICAgaGVhZGVyOiBjb2wuaGVhZGVyLFxuICAgICAgY29sdW1uS2V5OiBVdGlscy5nZXRDb2x1bW5LZXkoY29sKSxcbiAgICAgIHdpZHRoOiAoY29sLndpZHRoIHx8IGNvbC53aWR0aCA9PT0gMCA/IGNvbC53aWR0aCA6IDIwMCksXG4gICAgICBtaW5XaWR0aDogKGNvbC5taW5XaWR0aCB8fCBjb2wubWluV2lkdGggPT09IDAgPyBjb2wubWluV2lkdGggOiA0MCksXG4gICAgICBtYXhXaWR0aDogY29sLm1heFdpZHRoLFxuICAgICAgaXNSZXNpemFibGU6ICFjb2wuZGlzYWJsZVJlc2l6aW5nLFxuICAgICAgZml4ZWQ6ICEhY29sLmZpeGVkLFxuICAgICAgZml4ZWRSaWdodDogISFjb2wuZml4ZWRSaWdodCxcbiAgICAgIGFsbG93Q2VsbHNSZWN5Y2xpbmc6ICEhY29sLmFsbG93Q2VsbHNSZWN5Y2xpbmcsXG4gICAgICBkaXNhYmxlU29ydGluZzogISFjb2wuZGlzYWJsZVNvcnRpbmcsXG4gICAgICBpc1JlcXVpcmVkOiAhIWNvbC5pc1JlcXVpcmVkLFxuICAgICAgY29tcG9uZW50VHlwZTogY29sLmNvbXBvbmVudFR5cGUsXG4gICAgICBzdHlsZTogVXRpbHMuZ2V0Q2VsbFN0eWxlQnlDb2woY29sKSxcbiAgICB9O1xuICAgIC8vIHZhbHVlS2V5UGF0aFxuICAgIGlmIChjb2wudmFsdWVLZXlQYXRoKSBiYXNlQ29sLnZhbHVlS2V5UGF0aCA9IGNvbC52YWx1ZUtleVBhdGg7XG4gICAgLy8gZmxleEdyb3dcbiAgICBpZiAoY29sLmZsZXhHcm93KSBiYXNlQ29sLmZsZXhHcm93ID0gY29sLmZsZXhHcm93O1xuICAgIC8vIHZhbHVlVHlwZVxuICAgIGlmIChjb2wudmFsdWVUeXBlKSBiYXNlQ29sLnZhbHVlVHlwZSA9IGNvbC52YWx1ZVR5cGU7XG4gICAgLy8gc29ydENvbXBhcmF0b3JcbiAgICBpZiAoY29sLnNvcnRDb21wYXJhdG9yKSBiYXNlQ29sLnNvcnRDb21wYXJhdG9yID0gY29sLnNvcnRDb21wYXJhdG9yO1xuICAgIC8vIHNvcnRWYWx1ZUdldHRlclxuICAgIGlmIChjb2wuc29ydFZhbHVlR2V0dGVyKSBiYXNlQ29sLnNvcnRWYWx1ZUdldHRlciA9IGNvbC5zb3J0VmFsdWVHZXR0ZXI7XG4gICAgcmV0dXJuIGJhc2VDb2w7XG4gIH0sXG5cbiAgY29sdW1uQ2VsbChiYXNlQ29sdW1uLCBwcm9wcywgY29sLCBiYXNlVmFsdWVSZW5kZXIpIHtcbiAgICBjb25zdCBjb2x1bW4gPSBiYXNlQ29sdW1uO1xuICAgIGlmIChjb2wuY2VsbCkge1xuICAgICAgY29sdW1uLmNlbGwgPSBjb2wuY2VsbDtcbiAgICB9IGVsc2UgaWYgKGNvbC52YWx1ZVJlbmRlcikge1xuICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBjb2wudmFsdWVSZW5kZXIocHJvcHMuZGF0YS5nZXQocm93SW5kZXgpLCByb3dJbmRleCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXRjaCAoY29sLnZhbHVlVHlwZSkge1xuICAgICAgICBjYXNlICdudW1iZXInOiAvLyBmYWxsIHRocm91Z2hcbiAgICAgICAgY2FzZSAnZmxvYXQnOiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBQcmltaXRpdmVUeXBlLm51bWJlclZhbFJlbmRlcihjb2wsIHJvd0luZGV4LCBiYXNlVmFsdWVSZW5kZXIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSAnYm9vbGVhbic6IHtcbiAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IEJvb2xlYW5UeXBlLnZhbFJlbmRlcihjb2wsIHJvd0luZGV4LCBiYXNlVmFsdWVSZW5kZXIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSAnY2hlY2tib3gnOiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBDaGVja2JveFR5cGUudmFsUmVuZGVyKHJvd0luZGV4LCBiYXNlVmFsdWVSZW5kZXIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSAnZGF0ZSc6IHtcbiAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IERhdGVUeXBlLnZhbFJlbmRlcihyb3dJbmRleCwgcHJvcHMuZGF0ZUZvcm1hdCwgYmFzZVZhbHVlUmVuZGVyKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICAvLyBjaGFuZ2UgdmFsUmVuZGVycyB0byBqdXN0IHRha2UgcHJvcHMgLS0+IHNhdmVzIHNvbWUgJ2VuZXJneSdcbiAgICAgICAgY2FzZSAnY3VycmVuY3knOiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBDdXJyZW5jeVR5cGUudmFsUmVuZGVyKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgcHJvcHMuZGF0YSxcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgcHJvcHMudGhvdXNhbmRTZXBhcmF0b3IsXG4gICAgICAgICAgICBwcm9wcy5kZWNpbWFsU2VwYXJhdG9yLFxuICAgICAgICAgICAgYmFzZVZhbHVlUmVuZGVyLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBiYXNlVmFsdWVSZW5kZXIocm93SW5kZXgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGNlbGxFZGl0IHJlbmRlclxuICAgIGlmIChjb2wuY2VsbEVkaXQpIHtcbiAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IGNvbC5jZWxsRWRpdDtcbiAgICB9IGVsc2UgaWYgKGNvbC5lZGl0VmFsdWVSZW5kZXIpIHtcbiAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IChyb3dJbmRleCwgc2V0UmVmLCBvbktleURvd24pID0+XG4gICAgICAgIGNvbC5lZGl0VmFsdWVSZW5kZXIocHJvcHMuZGF0YS5nZXQocm93SW5kZXgpLCByb3dJbmRleCwgc2V0UmVmLCBvbktleURvd24pO1xuICAgIH1cblxuICAgIC8vIGNlbGxDcmVhdGUgcmVuZGVyXG4gICAgaWYgKGNvbC5jZWxsQ3JlYXRlKSB7XG4gICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IGNvbC5jZWxsQ3JlYXRlO1xuICAgIH0gZWxzZSBpZiAoY29sLmNyZWF0ZVZhbHVlUmVuZGVyKSB7XG4gICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IChyb3dJbmRleCwgc2V0UmVmLCBvbktleURvd24pID0+XG4gICAgICAgIGNvbC5jcmVhdGVWYWx1ZVJlbmRlcihwcm9wcy5kYXRhLmdldChyb3dJbmRleCksIHJvd0luZGV4LCBzZXRSZWYsIG9uS2V5RG93bik7XG4gICAgfVxuXG4gICAgLy8gY2VsbEZpbHRlciByZW5kZXJcbiAgICBpZiAoY29sLmNlbGxGaWx0ZXIpIHtcbiAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gY29sLmNlbGxGaWx0ZXI7XG4gICAgfSBlbHNlIGlmIChjb2wuZmlsdGVyVmFsdWVSZW5kZXIpIHtcbiAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gcm93SW5kZXggPT5cbiAgICAgICAgY29sLmZpbHRlclZhbHVlUmVuZGVyKHByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSwgcm93SW5kZXgpO1xuICAgIH1cbiAgICByZXR1cm4gY29sdW1uO1xuICB9LFxuXG4gIGNvbHVtbkNvbXBvbmVudFR5cGUoYmFzZUNvbHVtbiwgdGFiSW5kZXgsIHByb3BzLCBjb2wsIGZ1bmN0aW9ucywgZ2V0RGlzYWJsZWRTdGF0ZSkge1xuICAgIGlmICghY29sLmNvbXBvbmVudFR5cGUpIHJldHVybiBiYXNlQ29sdW1uO1xuICAgIGNvbnN0IGNvbHVtbiA9IGJhc2VDb2x1bW47XG4gICAgbGV0IGVkaXRWYWx1ZVBhcnNlciA9IGNvbC5lZGl0VmFsdWVQYXJzZXIgPyBjb2wuZWRpdFZhbHVlUGFyc2VyIDogdmFsID0+IHZhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIC8vIEdyaWQgaW50ZXJuYWwgZnVuY3Rpb25zIHNlcGFyYXRlZFxuICAgIGNvbnN0IGVkaXRGdW5jdGlvbnMgPSB7IC4uLmZ1bmN0aW9ucy5lZGl0IH07XG4gICAgY29uc3QgY3JlYXRlRnVuY3Rpb25zID0geyAuLi5mdW5jdGlvbnMuY3JlYXRlIH07XG4gICAgY29uc3QgZmlsdGVyRnVuY3Rpb25zID0geyAuLi5mdW5jdGlvbnMuZmlsdGVyIH07XG4gICAgc3dpdGNoIChjb2wuY29tcG9uZW50VHlwZSkge1xuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ3RleHQnOiB7XG4gICAgICAgIGNvbnN0IGZvcm1Db250cm9sVHlwZSA9IGNvbC5jb21wb25lbnRUeXBlID09PSAnZmxvYXQnIHx8IGNvbC5jb21wb25lbnRUeXBlID09PSAnbnVtYmVyJyA/ICd0ZXh0JyA6IGNvbC5jb21wb25lbnRUeXBlO1xuICAgICAgICAvLyBhbHdheXMgdXNlIGNvbC5lZGl0VmFsdWVQYXJzZXIgb3ZlcnJpZGUgaWYgYXZhaWxhYmxlXG4gICAgICAgIGNvbnN0IHByaW1pdGl2ZVZhbFBhcnNlciA9ICFjb2wuZWRpdFZhbHVlUGFyc2VyICYmIGNvbC5jb21wb25lbnRUeXBlID09PSAnZmxvYXQnID9cbiAgICAgICAgICAodmFsID0+IHZhbC5yZXBsYWNlKG5ldyBSZWdFeHAoYFteXFxcXGQke3Byb3BzLmRlY2ltYWxTZXBhcmF0b3J9Ky1dYCwgJ2cnKSwgJycpKSA6IGVkaXRWYWx1ZVBhcnNlcjtcblxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT5cbiAgICAgICAgICAgIFByaW1pdGl2ZVR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICAgIHByaW1pdGl2ZVZhbFBhcnNlcixcbiAgICAgICAgICAgICAgZm9ybUNvbnRyb2xUeXBlLFxuICAgICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gUHJpbWl0aXZlVHlwZS5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBwcmltaXRpdmVWYWxQYXJzZXIsXG4gICAgICAgICAgICBmb3JtQ29udHJvbFR5cGUsXG4gICAgICAgICAgICAuLi5jcmVhdGVGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcHMuZmlsdGVyaW5nICYmICFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT4gUHJpbWl0aXZlVHlwZS5jZWxsRmlsdGVyKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgcHJpbWl0aXZlVmFsUGFyc2VyLFxuICAgICAgICAgICAgZm9ybUNvbnRyb2xUeXBlLFxuICAgICAgICAgICAgLi4uZmlsdGVyRnVuY3Rpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ2NoZWNrYm94Jzoge1xuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gQ2hlY2tib3hUeXBlLmNlbGxFZGl0KFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiBDaGVja2JveFR5cGUuY2VsbENyZWF0ZShcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgLi4uY3JlYXRlRnVuY3Rpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+XG4gICAgICAgICAgICBDaGVja2JveFR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgICBwcm9wcy5pbnRsLFxuICAgICAgICAgICAgICAuLi5maWx0ZXJGdW5jdGlvbnMsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlICdtdWx0aXNlbGVjdCc6IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0T3B0aW9ucyA9IGNvbC5zZWxlY3RDb21wb25lbnRPcHRpb25zIHx8XG4gICAgICAgICAgcHJvcHMuc2VsZWN0Q29tcG9uZW50T3B0aW9ucy5nZXQoY29sdW1uLmNvbHVtbktleSk7XG4gICAgICAgIGNvbnN0IHNlbGVjdFRyYW5zbGF0aW9ucyA9IGNvbC5zZWxlY3RDb21wb25lbnRUcmFuc2xhdGlvbnMgfHxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0LlNlbGVjdCcgfSksXG4gICAgICAgICAgICBub1Jlc3VsdHNUZXh0OiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuTm9SZXN1bHRzJyB9KSxcbiAgICAgICAgICAgIC8vIFZhcmlhYmxlICduJyBtdXN0IGJlIHByb3ZpZGVkIGluIHRoaXMgcGhhc2UgaW4gb3JkZXIgdG8gYXZvaWRcbiAgICAgICAgICAgIC8vIEVycm9yOiBUaGUgaW50bCBzdHJpbmcgY29udGV4dCB2YXJpYWJsZSAnbicgd2FzIG5vdCBwcm92aWRlZCB0byB0aGUgc3RyaW5nIHtufVxuICAgICAgICAgICAgLy8gc2VsZWN0ZWRcbiAgICAgICAgICAgIC8vIFZhcmlhYmxlIG4gaXMgcmVwbGFjZWQgbGF0ZXIsIHdoZW4gaXRzIHZhbHVlIGlzIGF2YWlsYWJsZVxuICAgICAgICAgICAgc2VsZWN0ZWQ6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5TZWxlY3RlZCcgfSwgeyBuOiAnPG4+JyB9KSxcbiAgICAgICAgICB9O1xuXG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PlxuICAgICAgICAgICAgU2VsZWN0VHlwZS5jZWxsRWRpdChcbiAgICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT5cbiAgICAgICAgICAgIFNlbGVjdFR5cGUuY2VsbENyZWF0ZShcbiAgICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAgIC4uLmNyZWF0ZUZ1bmN0aW9ucyxcbiAgICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+XG4gICAgICAgICAgICBNdWx0aVNlbGVjdFR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgICAgLi4uZmlsdGVyRnVuY3Rpb25zLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSAnc2VsZWN0Jzoge1xuICAgICAgICBjb25zdCBzZWxlY3RPcHRpb25zID0gY29sLnNlbGVjdENvbXBvbmVudE9wdGlvbnMgfHxcbiAgICAgICAgICBwcm9wcy5zZWxlY3RDb21wb25lbnRPcHRpb25zLmdldChjb2x1bW4uY29sdW1uS2V5KTtcbiAgICAgICAgY29uc3Qgc2VsZWN0VHJhbnNsYXRpb25zID0gY29sLnNlbGVjdENvbXBvbmVudFRyYW5zbGF0aW9ucyB8fFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuU2VsZWN0JyB9KSxcbiAgICAgICAgICAgIG5vUmVzdWx0c1RleHQ6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5Ob1Jlc3VsdHMnIH0pLFxuICAgICAgICAgIH07XG5cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+XG4gICAgICAgICAgICBTZWxlY3RUeXBlLmNlbGxFZGl0KFxuICAgICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgICAgLi4uZWRpdEZ1bmN0aW9ucyxcbiAgICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PlxuICAgICAgICAgICAgU2VsZWN0VHlwZS5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgICAgLi4uY3JlYXRlRnVuY3Rpb25zLFxuICAgICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuZmlsdGVyaW5nICYmICFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT5cbiAgICAgICAgICAgIFNlbGVjdFR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgICAgLi4uZmlsdGVyRnVuY3Rpb25zLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSAnYm9vbGVhbic6IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0T3B0aW9ucyA9IFtcbiAgICAgICAgICB7IHZhbHVlOiB0cnVlLCBsYWJlbDogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLlllcycgfSkgfSxcbiAgICAgICAgICB7IHZhbHVlOiBmYWxzZSwgbGFiZWw6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5ObycgfSkgfSxcbiAgICAgICAgXTtcbiAgICAgICAgY29uc3Qgc2VsZWN0VHJhbnNsYXRpb25zID0gY29sLnNlbGVjdENvbXBvbmVudFRyYW5zbGF0aW9ucyB8fCB7XG4gICAgICAgICAgcGxhY2Vob2xkZXI6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5TZWxlY3QnIH0pLFxuICAgICAgICAgIG5vUmVzdWx0c1RleHQ6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5Ob1Jlc3VsdHMnIH0pLFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PlxuICAgICAgICAgICAgQm9vbGVhblR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+XG4gICAgICAgICAgICBCb29sZWFuVHlwZS5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgICAgLi4uY3JlYXRlRnVuY3Rpb25zLFxuICAgICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuZmlsdGVyaW5nICYmICFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT5cbiAgICAgICAgICAgIEJvb2xlYW5UeXBlLmNlbGxGaWx0ZXIoXG4gICAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAgIC4uLmZpbHRlckZ1bmN0aW9ucyxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ2RhdGUnOiB7XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiBEYXRlVHlwZS5jZWxsRWRpdChcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgcHJvcHMucmVnaW9uLFxuICAgICAgICAgICAgcHJvcHMuZGF0ZUZvcm1hdCxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiBEYXRlVHlwZS5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBwcm9wcy5yZWdpb24sXG4gICAgICAgICAgICBwcm9wcy5kYXRlRm9ybWF0LFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uY3JlYXRlRnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5maWx0ZXJpbmcgJiYgIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PlxuICAgICAgICAgICAgRGF0ZVR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgICBwcm9wcy5yZWdpb24sXG4gICAgICAgICAgICAgIHByb3BzLmRhdGVGb3JtYXQsXG4gICAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgICAgLi4uZmlsdGVyRnVuY3Rpb25zLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgZGVmYXVsdDpcbiAgICB9XG4gICAgcmV0dXJuIGNvbHVtbjtcbiAgfSxcbn07XG4iXX0=