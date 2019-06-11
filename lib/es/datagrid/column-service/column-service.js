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
      style: Utils.getCellStyleByCol(col)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2VydmljZS9jb2x1bW4tc2VydmljZS5qc3giXSwibmFtZXMiOlsiTWFwIiwiaW52YXJpYW50IiwiVXRpbHMiLCJEYXRlVHlwZSIsIlNlbGVjdFR5cGUiLCJCb29sZWFuVHlwZSIsIkNoZWNrYm94VHlwZSIsIkN1cnJlbmN5VHlwZSIsIlByaW1pdGl2ZVR5cGUiLCJNdWx0aVNlbGVjdFR5cGUiLCJiYXNlQ29sdW1uIiwiY29sIiwiYmFzZUNvbCIsImhlYWRlciIsImNvbHVtbktleSIsImdldENvbHVtbktleSIsIndpZHRoIiwibWluV2lkdGgiLCJtYXhXaWR0aCIsImlzUmVzaXphYmxlIiwiZGlzYWJsZVJlc2l6aW5nIiwiZml4ZWQiLCJmaXhlZFJpZ2h0IiwiYWxsb3dDZWxsc1JlY3ljbGluZyIsImRpc2FibGVTb3J0aW5nIiwiaXNSZXF1aXJlZCIsImNvbXBvbmVudFR5cGUiLCJzdHlsZSIsImdldENlbGxTdHlsZUJ5Q29sIiwidmFsdWVLZXlQYXRoIiwiZmxleEdyb3ciLCJ2YWx1ZVR5cGUiLCJzb3J0Q29tcGFyYXRvciIsInNvcnRWYWx1ZUdldHRlciIsInRyYW5zbGF0aW9ucyIsImNvbHVtbkNlbGwiLCJwcm9wcyIsImJhc2VWYWx1ZVJlbmRlciIsImNvbHVtbiIsImNlbGwiLCJ2YWx1ZVJlbmRlciIsInJvd0luZGV4IiwiZGF0YSIsImdldCIsInNlbGVjdENvbXBvbmVudE9wdGlvbnMiLCJudW1iZXJWYWxSZW5kZXIiLCJ0aG91c2FuZFNlcGFyYXRvciIsImRlY2ltYWxTZXBhcmF0b3IiLCJ2YWxSZW5kZXIiLCJzZWxlY3RPcHRpb25zIiwiZ3JpZCIsImlkIiwiZGF0ZUZvcm1hdCIsImNlbGxFZGl0IiwiZWRpdFZhbHVlUmVuZGVyIiwic2V0UmVmIiwib25LZXlEb3duIiwiY2VsbENyZWF0ZSIsImNyZWF0ZVZhbHVlUmVuZGVyIiwiY2VsbEZpbHRlciIsImZpbHRlclZhbHVlUmVuZGVyIiwiY29sdW1uQ29tcG9uZW50VHlwZSIsInRhYkluZGV4IiwiZnVuY3Rpb25zIiwiZ2V0RGlzYWJsZWRTdGF0ZSIsImVkaXRWYWx1ZVBhcnNlciIsInZhbCIsImVkaXRGdW5jdGlvbnMiLCJlZGl0IiwiY3JlYXRlRnVuY3Rpb25zIiwiY3JlYXRlIiwiZmlsdGVyRnVuY3Rpb25zIiwiZmlsdGVyIiwicHJpbWl0aXZlVmFsUGFyc2VyIiwicmVwbGFjZSIsIlJlZ0V4cCIsImZvcm1Db250cm9sVHlwZSIsImlubGluZUVkaXQiLCJmaWx0ZXJpbmciLCJpbnRsIiwic2VsZWN0VHJhbnNsYXRpb25zIiwic2VsZWN0Q29tcG9uZW50VHJhbnNsYXRpb25zIiwicGxhY2Vob2xkZXIiLCJmb3JtYXRNZXNzYWdlIiwibm9SZXN1bHRzVGV4dCIsInNlbGVjdGVkIiwibiIsInZhbHVlIiwibGFiZWwiLCJyZWdpb24iXSwibWFwcGluZ3MiOiI7O0FBQUEsU0FBU0EsR0FBVCxRQUFvQixXQUFwQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsV0FBdEI7QUFDQSxPQUFPQyxLQUFQLE1BQWtCLG1CQUFsQjtBQUNBLFNBQ0VDLFFBREYsRUFFRUMsVUFGRixFQUdFQyxXQUhGLEVBSUVDLFlBSkYsRUFLRUMsWUFMRixFQU1FQyxhQU5GLEVBT0VDLGVBUEYsUUFRTyw2QkFSUDtBQVVBLGVBQWU7QUFDYkMsRUFBQUEsVUFEYSxzQkFDRkMsR0FERSxFQUNHO0FBQ2QsUUFBTUMsT0FBTyxHQUFHO0FBQ2RDLE1BQUFBLE1BQU0sRUFBRUYsR0FBRyxDQUFDRSxNQURFO0FBRWRDLE1BQUFBLFNBQVMsRUFBRVosS0FBSyxDQUFDYSxZQUFOLENBQW1CSixHQUFuQixDQUZHO0FBR2RLLE1BQUFBLEtBQUssRUFBRUwsR0FBRyxDQUFDSyxLQUFKLElBQWFMLEdBQUcsQ0FBQ0ssS0FBSixLQUFjLENBQTNCLEdBQStCTCxHQUFHLENBQUNLLEtBQW5DLEdBQTJDLEdBSHBDO0FBSWRDLE1BQUFBLFFBQVEsRUFBRU4sR0FBRyxDQUFDTSxRQUFKLElBQWdCTixH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QUFBbEQsWUFBWSxHQUMxQ0ksR0FEMEMsRUFFMUMyQixNQUYwQyxFQUcxQ3dCLFFBSDBDLEVBSTFDckIsUUFKMEMsRUFLMUNMLEtBQUssQ0FBQ2MsSUFBTixDQUFXQyxFQUwrQixTQU12Q2tCLGVBTnVDLEdBTzFDSixlQVAwQyxFQVExQ0QsZ0JBUjBDLEVBUzFDNUIsS0FBSyxDQUFDTSxJQVRvQyxFQVUxQ04sS0FBSyxDQUFDVSxpQkFWb0MsRUFXMUNWLEtBQUssQ0FBQ1csZ0JBWG9DLEdBQWhCO0FBQUEsYUFBNUI7QUFhRDs7QUFDRCxjQUFJWCxLQUFLLENBQUMwQyxTQUFOLElBQW1CLENBQUN4QyxNQUFNLENBQUNxQixVQUEvQixFQUEyQztBQUN6Q3JCLFlBQUFBLE1BQU0sQ0FBQ3FCLFVBQVAsR0FBb0I7QUFBQSxxQkFBTW5ELGFBQWEsQ0FBQ21ELFVBQWQsT0FBQW5ELGFBQWEsR0FDckNHLEdBRHFDLEVBRXJDMkIsTUFGcUMsRUFHckN3QixRQUhxQyxFQUlyQzFCLEtBQUssQ0FBQ2MsSUFBTixDQUFXQyxFQUowQixFQUtyQ3NCLGtCQUxxQyxFQU1yQyxNQU5xQyxTQU9sQ0YsZUFQa0MsRUFBbkI7QUFBQSxhQUFwQjtBQVNEOztBQUNEO0FBQ0Q7O0FBQ0Q7QUFwVkY7O0FBc1ZBLFdBQU9qQyxNQUFQO0FBQ0Q7QUE1ZlksQ0FBZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hcCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgaW52YXJpYW50IGZyb20gJ2ludmFyaWFudCc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vZGF0YWdyaWQudXRpbHMnO1xuaW1wb3J0IHtcbiAgRGF0ZVR5cGUsXG4gIFNlbGVjdFR5cGUsXG4gIEJvb2xlYW5UeXBlLFxuICBDaGVja2JveFR5cGUsXG4gIEN1cnJlbmN5VHlwZSxcbiAgUHJpbWl0aXZlVHlwZSxcbiAgTXVsdGlTZWxlY3RUeXBlLFxufSBmcm9tICcuL2NvbHVtbi10eXBlcy9jb2x1bW4tdHlwZXMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGJhc2VDb2x1bW4oY29sKSB7XG4gICAgY29uc3QgYmFzZUNvbCA9IHtcbiAgICAgIGhlYWRlcjogY29sLmhlYWRlcixcbiAgICAgIGNvbHVtbktleTogVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCksXG4gICAgICB3aWR0aDogY29sLndpZHRoIHx8IGNvbC53aWR0aCA9PT0gMCA/IGNvbC53aWR0aCA6IDIwMCxcbiAgICAgIG1pbldpZHRoOiBjb2wubWluV2lkdGggfHwgY29sLm1pbldpZHRoID09PSAwID8gY29sLm1pbldpZHRoIDogNDAsXG4gICAgICBtYXhXaWR0aDogY29sLm1heFdpZHRoLFxuICAgICAgaXNSZXNpemFibGU6ICFjb2wuZGlzYWJsZVJlc2l6aW5nLFxuICAgICAgZml4ZWQ6ICEhY29sLmZpeGVkLFxuICAgICAgZml4ZWRSaWdodDogISFjb2wuZml4ZWRSaWdodCxcbiAgICAgIGFsbG93Q2VsbHNSZWN5Y2xpbmc6ICEhY29sLmFsbG93Q2VsbHNSZWN5Y2xpbmcsXG4gICAgICBkaXNhYmxlU29ydGluZzogISFjb2wuZGlzYWJsZVNvcnRpbmcsXG4gICAgICBpc1JlcXVpcmVkOiAhIWNvbC5pc1JlcXVpcmVkLFxuICAgICAgY29tcG9uZW50VHlwZTogY29sLmNvbXBvbmVudFR5cGUsXG4gICAgICBzdHlsZTogVXRpbHMuZ2V0Q2VsbFN0eWxlQnlDb2woY29sKSxcbiAgICB9O1xuICAgIC8vIHZhbHVlS2V5UGF0aFxuICAgIGlmIChjb2wudmFsdWVLZXlQYXRoKSBiYXNlQ29sLnZhbHVlS2V5UGF0aCA9IGNvbC52YWx1ZUtleVBhdGg7XG4gICAgLy8gZmxleEdyb3dcbiAgICBpZiAoY29sLmZsZXhHcm93KSBiYXNlQ29sLmZsZXhHcm93ID0gY29sLmZsZXhHcm93O1xuICAgIC8vIHZhbHVlVHlwZVxuICAgIGlmIChjb2wudmFsdWVUeXBlKSBiYXNlQ29sLnZhbHVlVHlwZSA9IGNvbC52YWx1ZVR5cGU7XG4gICAgLy8gc29ydENvbXBhcmF0b3JcbiAgICBpZiAoY29sLnNvcnRDb21wYXJhdG9yKSBiYXNlQ29sLnNvcnRDb21wYXJhdG9yID0gY29sLnNvcnRDb21wYXJhdG9yO1xuICAgIC8vIHNvcnRWYWx1ZUdldHRlclxuICAgIGlmIChjb2wuc29ydFZhbHVlR2V0dGVyKSBiYXNlQ29sLnNvcnRWYWx1ZUdldHRlciA9IGNvbC5zb3J0VmFsdWVHZXR0ZXI7XG4gICAgLy8gdHJhbnNsYXRpb25zXG4gICAgaWYgKGNvbC50cmFuc2xhdGlvbnMpIGJhc2VDb2wudHJhbnNsYXRpb25zID0gY29sLnRyYW5zbGF0aW9ucztcbiAgICByZXR1cm4gYmFzZUNvbDtcbiAgfSxcblxuICBjb2x1bW5DZWxsKGJhc2VDb2x1bW4sIHByb3BzLCBjb2wsIGJhc2VWYWx1ZVJlbmRlcikge1xuICAgIGNvbnN0IGNvbHVtbiA9IGJhc2VDb2x1bW47XG4gICAgaWYgKGNvbC5jZWxsKSB7XG4gICAgICBjb2x1bW4uY2VsbCA9IGNvbC5jZWxsO1xuICAgIH0gZWxzZSBpZiAoY29sLnZhbHVlUmVuZGVyKSB7XG4gICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IGNvbC52YWx1ZVJlbmRlcihwcm9wcy5kYXRhLmdldChyb3dJbmRleCksIHJvd0luZGV4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgeyBzZWxlY3RDb21wb25lbnRPcHRpb25zID0gTWFwKCkgfSA9IHByb3BzO1xuICAgICAgc3dpdGNoIChjb2wuY29tcG9uZW50VHlwZSkge1xuICAgICAgICBjYXNlICdudW1iZXInOiAvLyBmYWxsIHRocm91Z2hcbiAgICAgICAgY2FzZSAnZmxvYXQnOiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBQcmltaXRpdmVUeXBlLm51bWJlclZhbFJlbmRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgcHJvcHMudGhvdXNhbmRTZXBhcmF0b3IsXG4gICAgICAgICAgICBwcm9wcy5kZWNpbWFsU2VwYXJhdG9yLFxuICAgICAgICAgICAgYmFzZVZhbHVlUmVuZGVyLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlICdib29sZWFuJzoge1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gQm9vbGVhblR5cGUudmFsUmVuZGVyKGNvbCwgcm93SW5kZXgsIGJhc2VWYWx1ZVJlbmRlcik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlICdjaGVja2JveCc6IHtcbiAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IENoZWNrYm94VHlwZS52YWxSZW5kZXIocm93SW5kZXgsIGJhc2VWYWx1ZVJlbmRlcik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlICdtdWx0aXNlbGVjdCc6IHtcbiAgICAgICAgICBjb25zdCBzZWxlY3RPcHRpb25zID0gY29sLnNlbGVjdENvbXBvbmVudE9wdGlvbnNcbiAgICAgICAgICAgIHx8IHNlbGVjdENvbXBvbmVudE9wdGlvbnMuZ2V0KGNvbHVtbi5jb2x1bW5LZXkpO1xuICAgICAgICAgIGludmFyaWFudChcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBgTm8gc2VsZWN0Q29tcG9uZW50T3B0aW9ucyBwcm92aWRlZCBmb3IgY29sdW1uICcke2NvbHVtbi5jb2x1bW5LZXl9J2AsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IE11bHRpU2VsZWN0VHlwZS52YWxSZW5kZXIoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgYmFzZVZhbHVlUmVuZGVyLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlICdzZWxlY3QnOiB7XG4gICAgICAgICAgY29uc3Qgc2VsZWN0T3B0aW9ucyA9IGNvbC5zZWxlY3RDb21wb25lbnRPcHRpb25zXG4gICAgICAgICAgICB8fCBzZWxlY3RDb21wb25lbnRPcHRpb25zLmdldChjb2x1bW4uY29sdW1uS2V5KTtcbiAgICAgICAgICBpbnZhcmlhbnQoXG4gICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgYE5vIHNlbGVjdENvbXBvbmVudE9wdGlvbnMgcHJvdmlkZWQgZm9yIGNvbHVtbiAnJHtjb2x1bW4uY29sdW1uS2V5fSdgLFxuICAgICAgICAgICk7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBTZWxlY3RUeXBlLnZhbFJlbmRlcihcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIGJhc2VWYWx1ZVJlbmRlcixcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSAnZGF0ZSc6IHtcbiAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IERhdGVUeXBlLnZhbFJlbmRlcihyb3dJbmRleCwgcHJvcHMuZGF0ZUZvcm1hdCwgYmFzZVZhbHVlUmVuZGVyKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICAvLyBjaGFuZ2UgdmFsUmVuZGVycyB0byBqdXN0IHRha2UgcHJvcHMgLS0+IHNhdmVzIHNvbWUgJ2VuZXJneSdcbiAgICAgICAgY2FzZSAnY3VycmVuY3knOiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBDdXJyZW5jeVR5cGUudmFsUmVuZGVyKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgcHJvcHMuZGF0YSxcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgcHJvcHMudGhvdXNhbmRTZXBhcmF0b3IsXG4gICAgICAgICAgICBwcm9wcy5kZWNpbWFsU2VwYXJhdG9yLFxuICAgICAgICAgICAgYmFzZVZhbHVlUmVuZGVyLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBiYXNlVmFsdWVSZW5kZXIocm93SW5kZXgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGNlbGxFZGl0IHJlbmRlclxuICAgIGlmIChjb2wuY2VsbEVkaXQpIHtcbiAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IGNvbC5jZWxsRWRpdDtcbiAgICB9IGVsc2UgaWYgKGNvbC5lZGl0VmFsdWVSZW5kZXIpIHtcbiAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IChyb3dJbmRleCwgc2V0UmVmLCBvbktleURvd24pID0+IGNvbC5lZGl0VmFsdWVSZW5kZXIoXG4gICAgICAgIHByb3BzLmRhdGEuZ2V0KHJvd0luZGV4LCBNYXAoKSksXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICBzZXRSZWYsXG4gICAgICAgIG9uS2V5RG93bixcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gY2VsbENyZWF0ZSByZW5kZXJcbiAgICBpZiAoY29sLmNlbGxDcmVhdGUpIHtcbiAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gY29sLmNlbGxDcmVhdGU7XG4gICAgfSBlbHNlIGlmIChjb2wuY3JlYXRlVmFsdWVSZW5kZXIpIHtcbiAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gKHJvd0luZGV4LCBzZXRSZWYsIG9uS2V5RG93bikgPT4gY29sLmNyZWF0ZVZhbHVlUmVuZGVyKFxuICAgICAgICBwcm9wcy5kYXRhLmdldChyb3dJbmRleCwgTWFwKCkpLFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgc2V0UmVmLFxuICAgICAgICBvbktleURvd24sXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIGNlbGxGaWx0ZXIgcmVuZGVyXG4gICAgaWYgKGNvbC5jZWxsRmlsdGVyKSB7XG4gICAgICBjb2x1bW4uY2VsbEZpbHRlciA9IGNvbC5jZWxsRmlsdGVyO1xuICAgIH0gZWxzZSBpZiAoY29sLmZpbHRlclZhbHVlUmVuZGVyKSB7XG4gICAgICBjb2x1bW4uY2VsbEZpbHRlciA9IHJvd0luZGV4ID0+IGNvbC5maWx0ZXJWYWx1ZVJlbmRlcihwcm9wcy5kYXRhLmdldChyb3dJbmRleCksIHJvd0luZGV4KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbHVtbjtcbiAgfSxcblxuICBjb2x1bW5Db21wb25lbnRUeXBlKGJhc2VDb2x1bW4sIHRhYkluZGV4LCBwcm9wcywgY29sLCBmdW5jdGlvbnMsIGdldERpc2FibGVkU3RhdGUpIHtcbiAgICBpZiAoIWNvbC5jb21wb25lbnRUeXBlKSByZXR1cm4gYmFzZUNvbHVtbjtcbiAgICBjb25zdCBjb2x1bW4gPSBiYXNlQ29sdW1uO1xuICAgIGNvbnN0IGVkaXRWYWx1ZVBhcnNlciA9IGNvbC5lZGl0VmFsdWVQYXJzZXIgPyBjb2wuZWRpdFZhbHVlUGFyc2VyIDogdmFsID0+IHZhbDtcbiAgICAvLyBHcmlkIGludGVybmFsIGZ1bmN0aW9ucyBzZXBhcmF0ZWRcbiAgICBjb25zdCBlZGl0RnVuY3Rpb25zID0geyAuLi5mdW5jdGlvbnMuZWRpdCB9O1xuICAgIGNvbnN0IGNyZWF0ZUZ1bmN0aW9ucyA9IHsgLi4uZnVuY3Rpb25zLmNyZWF0ZSB9O1xuICAgIGNvbnN0IGZpbHRlckZ1bmN0aW9ucyA9IHsgLi4uZnVuY3Rpb25zLmZpbHRlciB9O1xuICAgIGNvbnN0IHsgc2VsZWN0Q29tcG9uZW50T3B0aW9ucyA9IE1hcCgpIH0gPSBwcm9wcztcbiAgICBjb25zdCBwcmltaXRpdmVWYWxQYXJzZXIgPSAhY29sLmVkaXRWYWx1ZVBhcnNlciAmJiBjb2wuY29tcG9uZW50VHlwZSA9PT0gJ2Zsb2F0J1xuICAgICAgPyB2YWwgPT4gdmFsLnJlcGxhY2UobmV3IFJlZ0V4cChgW15cXFxcZCR7cHJvcHMuZGVjaW1hbFNlcGFyYXRvcn0rLV1gLCAnZycpLCAnJylcbiAgICAgIDogZWRpdFZhbHVlUGFyc2VyO1xuXG4gICAgc3dpdGNoIChjb2wuY29tcG9uZW50VHlwZSkge1xuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ3RleHQnOiB7XG4gICAgICAgIGNvbnN0IGZvcm1Db250cm9sVHlwZSA9IGNvbC5jb21wb25lbnRUeXBlID09PSAnZmxvYXQnIHx8IGNvbC5jb21wb25lbnRUeXBlID09PSAnbnVtYmVyJ1xuICAgICAgICAgID8gJ3RleHQnXG4gICAgICAgICAgOiBjb2wuY29tcG9uZW50VHlwZTtcbiAgICAgICAgLy8gYWx3YXlzIHVzZSBjb2wuZWRpdFZhbHVlUGFyc2VyIG92ZXJyaWRlIGlmIGF2YWlsYWJsZVxuXG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiBQcmltaXRpdmVUeXBlLmNlbGxFZGl0KFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBwcmltaXRpdmVWYWxQYXJzZXIsXG4gICAgICAgICAgICBmb3JtQ29udHJvbFR5cGUsXG4gICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiBQcmltaXRpdmVUeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByaW1pdGl2ZVZhbFBhcnNlcixcbiAgICAgICAgICAgIGZvcm1Db250cm9sVHlwZSxcbiAgICAgICAgICAgIC4uLmNyZWF0ZUZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wcy5maWx0ZXJpbmcgJiYgIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiBQcmltaXRpdmVUeXBlLmNlbGxGaWx0ZXIoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBwcmltaXRpdmVWYWxQYXJzZXIsXG4gICAgICAgICAgICBmb3JtQ29udHJvbFR5cGUsXG4gICAgICAgICAgICAuLi5maWx0ZXJGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSAnY2hlY2tib3gnOiB7XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiBDaGVja2JveFR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IENoZWNrYm94VHlwZS5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICAuLi5jcmVhdGVGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuZmlsdGVyaW5nICYmICFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT4gQ2hlY2tib3hUeXBlLmNlbGxGaWx0ZXIoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBwcm9wcy5pbnRsLFxuICAgICAgICAgICAgLi4uZmlsdGVyRnVuY3Rpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ211bHRpc2VsZWN0Jzoge1xuICAgICAgICBjb25zdCBzZWxlY3RPcHRpb25zID0gY29sLnNlbGVjdENvbXBvbmVudE9wdGlvbnNcbiAgICAgICAgICB8fCBzZWxlY3RDb21wb25lbnRPcHRpb25zLmdldChjb2x1bW4uY29sdW1uS2V5KTtcbiAgICAgICAgaW52YXJpYW50KFxuICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgYE5vIHNlbGVjdENvbXBvbmVudE9wdGlvbnMgcHJvdmlkZWQgZm9yIGNvbHVtbiAnJHtjb2x1bW4uY29sdW1uS2V5fSdgLFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBzZWxlY3RUcmFuc2xhdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50VHJhbnNsYXRpb25zIHx8IHtcbiAgICAgICAgICBwbGFjZWhvbGRlcjogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0LlNlbGVjdCcgfSksXG4gICAgICAgICAgbm9SZXN1bHRzVGV4dDogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0Lk5vUmVzdWx0cycgfSksXG4gICAgICAgICAgLy8gVmFyaWFibGUgJ24nIG11c3QgYmUgcHJvdmlkZWQgaW4gdGhpcyBwaGFzZSBpbiBvcmRlciB0byBhdm9pZFxuICAgICAgICAgIC8vIEVycm9yOiBUaGUgaW50bCBzdHJpbmcgY29udGV4dCB2YXJpYWJsZSAnbicgd2FzIG5vdCBwcm92aWRlZCB0byB0aGUgc3RyaW5nIHtufVxuICAgICAgICAgIC8vIHNlbGVjdGVkXG4gICAgICAgICAgLy8gVmFyaWFibGUgbiBpcyByZXBsYWNlZCBsYXRlciwgd2hlbiBpdHMgdmFsdWUgaXMgYXZhaWxhYmxlXG4gICAgICAgICAgc2VsZWN0ZWQ6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5TZWxlY3RlZCcgfSwgeyBuOiAnPG4+JyB9KSxcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gU2VsZWN0VHlwZS5jZWxsRWRpdChcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiBTZWxlY3RUeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5jcmVhdGVGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IE11bHRpU2VsZWN0VHlwZS5jZWxsRmlsdGVyKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmZpbHRlckZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlICdzZWxlY3QnOiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50T3B0aW9uc1xuICAgICAgICAgIHx8IHNlbGVjdENvbXBvbmVudE9wdGlvbnMuZ2V0KGNvbHVtbi5jb2x1bW5LZXkpO1xuICAgICAgICBpbnZhcmlhbnQoXG4gICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICBgTm8gc2VsZWN0Q29tcG9uZW50T3B0aW9ucyBwcm92aWRlZCBmb3IgY29sdW1uICcke2NvbHVtbi5jb2x1bW5LZXl9J2AsXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHNlbGVjdFRyYW5zbGF0aW9ucyA9IGNvbC5zZWxlY3RDb21wb25lbnRUcmFuc2xhdGlvbnMgfHwge1xuICAgICAgICAgIHBsYWNlaG9sZGVyOiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuU2VsZWN0JyB9KSxcbiAgICAgICAgICBub1Jlc3VsdHNUZXh0OiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuTm9SZXN1bHRzJyB9KSxcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gU2VsZWN0VHlwZS5jZWxsRWRpdChcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiBTZWxlY3RUeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5jcmVhdGVGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IFNlbGVjdFR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5maWx0ZXJGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSAnYm9vbGVhbic6IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0T3B0aW9ucyA9IFtcbiAgICAgICAgICB7IHZhbHVlOiB0cnVlLCBsYWJlbDogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLlllcycgfSkgfSxcbiAgICAgICAgICB7IHZhbHVlOiBmYWxzZSwgbGFiZWw6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5ObycgfSkgfSxcbiAgICAgICAgXTtcbiAgICAgICAgY29uc3Qgc2VsZWN0VHJhbnNsYXRpb25zID0gY29sLnNlbGVjdENvbXBvbmVudFRyYW5zbGF0aW9ucyB8fCB7XG4gICAgICAgICAgcGxhY2Vob2xkZXI6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5TZWxlY3QnIH0pLFxuICAgICAgICAgIG5vUmVzdWx0c1RleHQ6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5Ob1Jlc3VsdHMnIH0pLFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiBCb29sZWFuVHlwZS5jZWxsRWRpdChcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiBCb29sZWFuVHlwZS5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uY3JlYXRlRnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5maWx0ZXJpbmcgJiYgIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiBCb29sZWFuVHlwZS5jZWxsRmlsdGVyKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmZpbHRlckZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlICdkYXRlJzoge1xuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gRGF0ZVR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByb3BzLnJlZ2lvbixcbiAgICAgICAgICAgIHByb3BzLmRhdGVGb3JtYXQsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gRGF0ZVR5cGUuY2VsbENyZWF0ZShcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgcHJvcHMucmVnaW9uLFxuICAgICAgICAgICAgcHJvcHMuZGF0ZUZvcm1hdCxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmNyZWF0ZUZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuZmlsdGVyaW5nICYmICFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT4gRGF0ZVR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByb3BzLnJlZ2lvbixcbiAgICAgICAgICAgIHByb3BzLmRhdGVGb3JtYXQsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5maWx0ZXJGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgJ2N1cnJlbmN5Jzoge1xuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiBDdXJyZW5jeVR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICAgcHJvcHMuZGF0YSxcbiAgICAgICAgICAgIHByb3BzLnRob3VzYW5kU2VwYXJhdG9yLFxuICAgICAgICAgICAgcHJvcHMuZGVjaW1hbFNlcGFyYXRvcixcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gQ3VycmVuY3lUeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIC4uLmNyZWF0ZUZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgICBwcm9wcy5kYXRhLFxuICAgICAgICAgICAgcHJvcHMudGhvdXNhbmRTZXBhcmF0b3IsXG4gICAgICAgICAgICBwcm9wcy5kZWNpbWFsU2VwYXJhdG9yLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IFByaW1pdGl2ZVR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByaW1pdGl2ZVZhbFBhcnNlcixcbiAgICAgICAgICAgICd0ZXh0JyxcbiAgICAgICAgICAgIC4uLmZpbHRlckZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICB9XG4gICAgcmV0dXJuIGNvbHVtbjtcbiAgfSxcbn07XG4iXX0=