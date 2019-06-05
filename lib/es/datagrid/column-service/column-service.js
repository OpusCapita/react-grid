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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2VydmljZS9jb2x1bW4tc2VydmljZS5qc3giXSwibmFtZXMiOlsiTWFwIiwiaW52YXJpYW50IiwiVXRpbHMiLCJEYXRlVHlwZSIsIlNlbGVjdFR5cGUiLCJCb29sZWFuVHlwZSIsIkNoZWNrYm94VHlwZSIsIkN1cnJlbmN5VHlwZSIsIlByaW1pdGl2ZVR5cGUiLCJNdWx0aVNlbGVjdFR5cGUiLCJiYXNlQ29sdW1uIiwiY29sIiwiYmFzZUNvbCIsImhlYWRlciIsImNvbHVtbktleSIsImdldENvbHVtbktleSIsIndpZHRoIiwibWluV2lkdGgiLCJtYXhXaWR0aCIsImlzUmVzaXphYmxlIiwiZGlzYWJsZVJlc2l6aW5nIiwiZml4ZWQiLCJmaXhlZFJpZ2h0IiwiYWxsb3dDZWxsc1JlY3ljbGluZyIsImRpc2FibGVTb3J0aW5nIiwiaXNSZXF1aXJlZCIsImNvbXBvbmVudFR5cGUiLCJzdHlsZSIsImdldENlbGxTdHlsZUJ5Q29sIiwidmFsdWVLZXlQYXRoIiwiZmxleEdyb3ciLCJ2YWx1ZVR5cGUiLCJzb3J0Q29tcGFyYXRvciIsInNvcnRWYWx1ZUdldHRlciIsImNvbHVtbkNlbGwiLCJwcm9wcyIsImJhc2VWYWx1ZVJlbmRlciIsImNvbHVtbiIsImNlbGwiLCJ2YWx1ZVJlbmRlciIsInJvd0luZGV4IiwiZGF0YSIsImdldCIsInNlbGVjdENvbXBvbmVudE9wdGlvbnMiLCJudW1iZXJWYWxSZW5kZXIiLCJ0aG91c2FuZFNlcGFyYXRvciIsImRlY2ltYWxTZXBhcmF0b3IiLCJ2YWxSZW5kZXIiLCJzZWxlY3RPcHRpb25zIiwiZ3JpZCIsImlkIiwiZGF0ZUZvcm1hdCIsImNlbGxFZGl0IiwiZWRpdFZhbHVlUmVuZGVyIiwic2V0UmVmIiwib25LZXlEb3duIiwiY2VsbENyZWF0ZSIsImNyZWF0ZVZhbHVlUmVuZGVyIiwiY2VsbEZpbHRlciIsImZpbHRlclZhbHVlUmVuZGVyIiwiY29sdW1uQ29tcG9uZW50VHlwZSIsInRhYkluZGV4IiwiZnVuY3Rpb25zIiwiZ2V0RGlzYWJsZWRTdGF0ZSIsImVkaXRWYWx1ZVBhcnNlciIsInZhbCIsImVkaXRGdW5jdGlvbnMiLCJlZGl0IiwiY3JlYXRlRnVuY3Rpb25zIiwiY3JlYXRlIiwiZmlsdGVyRnVuY3Rpb25zIiwiZmlsdGVyIiwicHJpbWl0aXZlVmFsUGFyc2VyIiwicmVwbGFjZSIsIlJlZ0V4cCIsImZvcm1Db250cm9sVHlwZSIsImlubGluZUVkaXQiLCJmaWx0ZXJpbmciLCJpbnRsIiwic2VsZWN0VHJhbnNsYXRpb25zIiwic2VsZWN0Q29tcG9uZW50VHJhbnNsYXRpb25zIiwicGxhY2Vob2xkZXIiLCJmb3JtYXRNZXNzYWdlIiwibm9SZXN1bHRzVGV4dCIsInNlbGVjdGVkIiwibiIsInZhbHVlIiwibGFiZWwiLCJyZWdpb24iXSwibWFwcGluZ3MiOiI7O0FBQUEsU0FBU0EsR0FBVCxRQUFvQixXQUFwQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsV0FBdEI7QUFDQSxPQUFPQyxLQUFQLE1BQWtCLG1CQUFsQjtBQUNBLFNBQ0VDLFFBREYsRUFFRUMsVUFGRixFQUdFQyxXQUhGLEVBSUVDLFlBSkYsRUFLRUMsWUFMRixFQU1FQyxhQU5GLEVBT0VDLGVBUEYsUUFRTyw2QkFSUDtBQVVBLGVBQWU7QUFDYkMsRUFBQUEsVUFEYSxzQkFDRkMsR0FERSxFQUNHO0FBQ2QsUUFBTUMsT0FBTyxHQUFHO0FBQ2RDLE1BQUFBLE1BQU0sRUFBRUYsR0FBRyxDQUFDRSxNQURFO0FBRWRDLE1BQUFBLFNBQVMsRUFBRVosS0FBSyxDQUFDYSxZQUFOLENBQW1CSixHQUFuQixDQUZHO0FBR2RLLE1BQUFBLEtBQUssRUFBRUwsR0FBRyxDQUFDSyxLQUFKLElBQWFMLEdBQUcsQ0FBQ0ssS0FBSixLQUFjLENBQTNCLEdBQStCTCxHQUFHLENBQUNLLEtBQW5DLEdBQTJDLEdBSHBDO0FBSWRDLE1BQUFBLFFBQVEsRUFBRU4sR0FBRyxDQUFDTSxRQUFKLElBQWdCTixHQUFHLENBQUNNLFFBQUos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LGVBTnVDLEdBTzFDSixlQVAwQyxFQVExQ0QsZ0JBUjBDLEVBUzFDNUIsS0FBSyxDQUFDTSxJQVRvQyxFQVUxQ04sS0FBSyxDQUFDVSxpQkFWb0MsRUFXMUNWLEtBQUssQ0FBQ1csZ0JBWG9DLEdBQWhCO0FBQUEsYUFBNUI7QUFhRDs7QUFDRCxjQUFJWCxLQUFLLENBQUMwQyxTQUFOLElBQW1CLENBQUN4QyxNQUFNLENBQUNxQixVQUEvQixFQUEyQztBQUN6Q3JCLFlBQUFBLE1BQU0sQ0FBQ3FCLFVBQVAsR0FBb0I7QUFBQSxxQkFBTWxELGFBQWEsQ0FBQ2tELFVBQWQsT0FBQWxELGFBQWEsR0FDckNHLEdBRHFDLEVBRXJDMEIsTUFGcUMsRUFHckN3QixRQUhxQyxFQUlyQzFCLEtBQUssQ0FBQ2MsSUFBTixDQUFXQyxFQUowQixFQUtyQ3NCLGtCQUxxQyxFQU1yQyxNQU5xQyxTQU9sQ0YsZUFQa0MsRUFBbkI7QUFBQSxhQUFwQjtBQVNEOztBQUNEO0FBQ0Q7O0FBQ0Q7QUFwVkY7O0FBc1ZBLFdBQU9qQyxNQUFQO0FBQ0Q7QUExZlksQ0FBZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hcCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgaW52YXJpYW50IGZyb20gJ2ludmFyaWFudCc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vZGF0YWdyaWQudXRpbHMnO1xuaW1wb3J0IHtcbiAgRGF0ZVR5cGUsXG4gIFNlbGVjdFR5cGUsXG4gIEJvb2xlYW5UeXBlLFxuICBDaGVja2JveFR5cGUsXG4gIEN1cnJlbmN5VHlwZSxcbiAgUHJpbWl0aXZlVHlwZSxcbiAgTXVsdGlTZWxlY3RUeXBlLFxufSBmcm9tICcuL2NvbHVtbi10eXBlcy9jb2x1bW4tdHlwZXMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGJhc2VDb2x1bW4oY29sKSB7XG4gICAgY29uc3QgYmFzZUNvbCA9IHtcbiAgICAgIGhlYWRlcjogY29sLmhlYWRlcixcbiAgICAgIGNvbHVtbktleTogVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCksXG4gICAgICB3aWR0aDogY29sLndpZHRoIHx8IGNvbC53aWR0aCA9PT0gMCA/IGNvbC53aWR0aCA6IDIwMCxcbiAgICAgIG1pbldpZHRoOiBjb2wubWluV2lkdGggfHwgY29sLm1pbldpZHRoID09PSAwID8gY29sLm1pbldpZHRoIDogNDAsXG4gICAgICBtYXhXaWR0aDogY29sLm1heFdpZHRoLFxuICAgICAgaXNSZXNpemFibGU6ICFjb2wuZGlzYWJsZVJlc2l6aW5nLFxuICAgICAgZml4ZWQ6ICEhY29sLmZpeGVkLFxuICAgICAgZml4ZWRSaWdodDogISFjb2wuZml4ZWRSaWdodCxcbiAgICAgIGFsbG93Q2VsbHNSZWN5Y2xpbmc6ICEhY29sLmFsbG93Q2VsbHNSZWN5Y2xpbmcsXG4gICAgICBkaXNhYmxlU29ydGluZzogISFjb2wuZGlzYWJsZVNvcnRpbmcsXG4gICAgICBpc1JlcXVpcmVkOiAhIWNvbC5pc1JlcXVpcmVkLFxuICAgICAgY29tcG9uZW50VHlwZTogY29sLmNvbXBvbmVudFR5cGUsXG4gICAgICBzdHlsZTogVXRpbHMuZ2V0Q2VsbFN0eWxlQnlDb2woY29sKSxcbiAgICB9O1xuICAgIC8vIHZhbHVlS2V5UGF0aFxuICAgIGlmIChjb2wudmFsdWVLZXlQYXRoKSBiYXNlQ29sLnZhbHVlS2V5UGF0aCA9IGNvbC52YWx1ZUtleVBhdGg7XG4gICAgLy8gZmxleEdyb3dcbiAgICBpZiAoY29sLmZsZXhHcm93KSBiYXNlQ29sLmZsZXhHcm93ID0gY29sLmZsZXhHcm93O1xuICAgIC8vIHZhbHVlVHlwZVxuICAgIGlmIChjb2wudmFsdWVUeXBlKSBiYXNlQ29sLnZhbHVlVHlwZSA9IGNvbC52YWx1ZVR5cGU7XG4gICAgLy8gc29ydENvbXBhcmF0b3JcbiAgICBpZiAoY29sLnNvcnRDb21wYXJhdG9yKSBiYXNlQ29sLnNvcnRDb21wYXJhdG9yID0gY29sLnNvcnRDb21wYXJhdG9yO1xuICAgIC8vIHNvcnRWYWx1ZUdldHRlclxuICAgIGlmIChjb2wuc29ydFZhbHVlR2V0dGVyKSBiYXNlQ29sLnNvcnRWYWx1ZUdldHRlciA9IGNvbC5zb3J0VmFsdWVHZXR0ZXI7XG4gICAgcmV0dXJuIGJhc2VDb2w7XG4gIH0sXG5cbiAgY29sdW1uQ2VsbChiYXNlQ29sdW1uLCBwcm9wcywgY29sLCBiYXNlVmFsdWVSZW5kZXIpIHtcbiAgICBjb25zdCBjb2x1bW4gPSBiYXNlQ29sdW1uO1xuICAgIGlmIChjb2wuY2VsbCkge1xuICAgICAgY29sdW1uLmNlbGwgPSBjb2wuY2VsbDtcbiAgICB9IGVsc2UgaWYgKGNvbC52YWx1ZVJlbmRlcikge1xuICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBjb2wudmFsdWVSZW5kZXIocHJvcHMuZGF0YS5nZXQocm93SW5kZXgpLCByb3dJbmRleCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHsgc2VsZWN0Q29tcG9uZW50T3B0aW9ucyA9IE1hcCgpIH0gPSBwcm9wcztcbiAgICAgIHN3aXRjaCAoY29sLmNvbXBvbmVudFR5cGUpIHtcbiAgICAgICAgY2FzZSAnbnVtYmVyJzogLy8gZmFsbCB0aHJvdWdoXG4gICAgICAgIGNhc2UgJ2Zsb2F0Jzoge1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gUHJpbWl0aXZlVHlwZS5udW1iZXJWYWxSZW5kZXIoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHByb3BzLnRob3VzYW5kU2VwYXJhdG9yLFxuICAgICAgICAgICAgcHJvcHMuZGVjaW1hbFNlcGFyYXRvcixcbiAgICAgICAgICAgIGJhc2VWYWx1ZVJlbmRlcixcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSAnYm9vbGVhbic6IHtcbiAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IEJvb2xlYW5UeXBlLnZhbFJlbmRlcihjb2wsIHJvd0luZGV4LCBiYXNlVmFsdWVSZW5kZXIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSAnY2hlY2tib3gnOiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBDaGVja2JveFR5cGUudmFsUmVuZGVyKHJvd0luZGV4LCBiYXNlVmFsdWVSZW5kZXIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSAnbXVsdGlzZWxlY3QnOiB7XG4gICAgICAgICAgY29uc3Qgc2VsZWN0T3B0aW9ucyA9IGNvbC5zZWxlY3RDb21wb25lbnRPcHRpb25zXG4gICAgICAgICAgICB8fCBzZWxlY3RDb21wb25lbnRPcHRpb25zLmdldChjb2x1bW4uY29sdW1uS2V5KTtcbiAgICAgICAgICBpbnZhcmlhbnQoXG4gICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgYE5vIHNlbGVjdENvbXBvbmVudE9wdGlvbnMgcHJvdmlkZWQgZm9yIGNvbHVtbiAnJHtjb2x1bW4uY29sdW1uS2V5fSdgLFxuICAgICAgICAgICk7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBNdWx0aVNlbGVjdFR5cGUudmFsUmVuZGVyKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIGJhc2VWYWx1ZVJlbmRlcixcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSAnc2VsZWN0Jzoge1xuICAgICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50T3B0aW9uc1xuICAgICAgICAgICAgfHwgc2VsZWN0Q29tcG9uZW50T3B0aW9ucy5nZXQoY29sdW1uLmNvbHVtbktleSk7XG4gICAgICAgICAgaW52YXJpYW50KFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIGBObyBzZWxlY3RDb21wb25lbnRPcHRpb25zIHByb3ZpZGVkIGZvciBjb2x1bW4gJyR7Y29sdW1uLmNvbHVtbktleX0nYCxcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gU2VsZWN0VHlwZS52YWxSZW5kZXIoXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBiYXNlVmFsdWVSZW5kZXIsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgJ2RhdGUnOiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBEYXRlVHlwZS52YWxSZW5kZXIocm93SW5kZXgsIHByb3BzLmRhdGVGb3JtYXQsIGJhc2VWYWx1ZVJlbmRlcik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY2hhbmdlIHZhbFJlbmRlcnMgdG8ganVzdCB0YWtlIHByb3BzIC0tPiBzYXZlcyBzb21lICdlbmVyZ3knXG4gICAgICAgIGNhc2UgJ2N1cnJlbmN5Jzoge1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gQ3VycmVuY3lUeXBlLnZhbFJlbmRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIHByb3BzLmRhdGEsXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHByb3BzLnRob3VzYW5kU2VwYXJhdG9yLFxuICAgICAgICAgICAgcHJvcHMuZGVjaW1hbFNlcGFyYXRvcixcbiAgICAgICAgICAgIGJhc2VWYWx1ZVJlbmRlcixcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gYmFzZVZhbHVlUmVuZGVyKHJvd0luZGV4KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBjZWxsRWRpdCByZW5kZXJcbiAgICBpZiAoY29sLmNlbGxFZGl0KSB7XG4gICAgICBjb2x1bW4uY2VsbEVkaXQgPSBjb2wuY2VsbEVkaXQ7XG4gICAgfSBlbHNlIGlmIChjb2wuZWRpdFZhbHVlUmVuZGVyKSB7XG4gICAgICBjb2x1bW4uY2VsbEVkaXQgPSAocm93SW5kZXgsIHNldFJlZiwgb25LZXlEb3duKSA9PiBjb2wuZWRpdFZhbHVlUmVuZGVyKFxuICAgICAgICBwcm9wcy5kYXRhLmdldChyb3dJbmRleCwgTWFwKCkpLFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgc2V0UmVmLFxuICAgICAgICBvbktleURvd24sXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIGNlbGxDcmVhdGUgcmVuZGVyXG4gICAgaWYgKGNvbC5jZWxsQ3JlYXRlKSB7XG4gICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IGNvbC5jZWxsQ3JlYXRlO1xuICAgIH0gZWxzZSBpZiAoY29sLmNyZWF0ZVZhbHVlUmVuZGVyKSB7XG4gICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IChyb3dJbmRleCwgc2V0UmVmLCBvbktleURvd24pID0+IGNvbC5jcmVhdGVWYWx1ZVJlbmRlcihcbiAgICAgICAgcHJvcHMuZGF0YS5nZXQocm93SW5kZXgsIE1hcCgpKSxcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIHNldFJlZixcbiAgICAgICAgb25LZXlEb3duLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBjZWxsRmlsdGVyIHJlbmRlclxuICAgIGlmIChjb2wuY2VsbEZpbHRlcikge1xuICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSBjb2wuY2VsbEZpbHRlcjtcbiAgICB9IGVsc2UgaWYgKGNvbC5maWx0ZXJWYWx1ZVJlbmRlcikge1xuICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSByb3dJbmRleCA9PiBjb2wuZmlsdGVyVmFsdWVSZW5kZXIocHJvcHMuZGF0YS5nZXQocm93SW5kZXgpLCByb3dJbmRleCk7XG4gICAgfVxuICAgIHJldHVybiBjb2x1bW47XG4gIH0sXG5cbiAgY29sdW1uQ29tcG9uZW50VHlwZShiYXNlQ29sdW1uLCB0YWJJbmRleCwgcHJvcHMsIGNvbCwgZnVuY3Rpb25zLCBnZXREaXNhYmxlZFN0YXRlKSB7XG4gICAgaWYgKCFjb2wuY29tcG9uZW50VHlwZSkgcmV0dXJuIGJhc2VDb2x1bW47XG4gICAgY29uc3QgY29sdW1uID0gYmFzZUNvbHVtbjtcbiAgICBjb25zdCBlZGl0VmFsdWVQYXJzZXIgPSBjb2wuZWRpdFZhbHVlUGFyc2VyID8gY29sLmVkaXRWYWx1ZVBhcnNlciA6IHZhbCA9PiB2YWw7XG4gICAgLy8gR3JpZCBpbnRlcm5hbCBmdW5jdGlvbnMgc2VwYXJhdGVkXG4gICAgY29uc3QgZWRpdEZ1bmN0aW9ucyA9IHsgLi4uZnVuY3Rpb25zLmVkaXQgfTtcbiAgICBjb25zdCBjcmVhdGVGdW5jdGlvbnMgPSB7IC4uLmZ1bmN0aW9ucy5jcmVhdGUgfTtcbiAgICBjb25zdCBmaWx0ZXJGdW5jdGlvbnMgPSB7IC4uLmZ1bmN0aW9ucy5maWx0ZXIgfTtcbiAgICBjb25zdCB7IHNlbGVjdENvbXBvbmVudE9wdGlvbnMgPSBNYXAoKSB9ID0gcHJvcHM7XG4gICAgY29uc3QgcHJpbWl0aXZlVmFsUGFyc2VyID0gIWNvbC5lZGl0VmFsdWVQYXJzZXIgJiYgY29sLmNvbXBvbmVudFR5cGUgPT09ICdmbG9hdCdcbiAgICAgID8gdmFsID0+IHZhbC5yZXBsYWNlKG5ldyBSZWdFeHAoYFteXFxcXGQke3Byb3BzLmRlY2ltYWxTZXBhcmF0b3J9Ky1dYCwgJ2cnKSwgJycpXG4gICAgICA6IGVkaXRWYWx1ZVBhcnNlcjtcblxuICAgIHN3aXRjaCAoY29sLmNvbXBvbmVudFR5cGUpIHtcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICd0ZXh0Jzoge1xuICAgICAgICBjb25zdCBmb3JtQ29udHJvbFR5cGUgPSBjb2wuY29tcG9uZW50VHlwZSA9PT0gJ2Zsb2F0JyB8fCBjb2wuY29tcG9uZW50VHlwZSA9PT0gJ251bWJlcidcbiAgICAgICAgICA/ICd0ZXh0J1xuICAgICAgICAgIDogY29sLmNvbXBvbmVudFR5cGU7XG4gICAgICAgIC8vIGFsd2F5cyB1c2UgY29sLmVkaXRWYWx1ZVBhcnNlciBvdmVycmlkZSBpZiBhdmFpbGFibGVcblxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gUHJpbWl0aXZlVHlwZS5jZWxsRWRpdChcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgcHJpbWl0aXZlVmFsUGFyc2VyLFxuICAgICAgICAgICAgZm9ybUNvbnRyb2xUeXBlLFxuICAgICAgICAgICAgLi4uZWRpdEZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gUHJpbWl0aXZlVHlwZS5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBwcmltaXRpdmVWYWxQYXJzZXIsXG4gICAgICAgICAgICBmb3JtQ29udHJvbFR5cGUsXG4gICAgICAgICAgICAuLi5jcmVhdGVGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcHMuZmlsdGVyaW5nICYmICFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT4gUHJpbWl0aXZlVHlwZS5jZWxsRmlsdGVyKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgcHJpbWl0aXZlVmFsUGFyc2VyLFxuICAgICAgICAgICAgZm9ybUNvbnRyb2xUeXBlLFxuICAgICAgICAgICAgLi4uZmlsdGVyRnVuY3Rpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ2NoZWNrYm94Jzoge1xuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gQ2hlY2tib3hUeXBlLmNlbGxFZGl0KFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiBDaGVja2JveFR5cGUuY2VsbENyZWF0ZShcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgLi4uY3JlYXRlRnVuY3Rpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IENoZWNrYm94VHlwZS5jZWxsRmlsdGVyKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgcHJvcHMuaW50bCxcbiAgICAgICAgICAgIC4uLmZpbHRlckZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlICdtdWx0aXNlbGVjdCc6IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0T3B0aW9ucyA9IGNvbC5zZWxlY3RDb21wb25lbnRPcHRpb25zXG4gICAgICAgICAgfHwgc2VsZWN0Q29tcG9uZW50T3B0aW9ucy5nZXQoY29sdW1uLmNvbHVtbktleSk7XG4gICAgICAgIGludmFyaWFudChcbiAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgIGBObyBzZWxlY3RDb21wb25lbnRPcHRpb25zIHByb3ZpZGVkIGZvciBjb2x1bW4gJyR7Y29sdW1uLmNvbHVtbktleX0nYCxcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3Qgc2VsZWN0VHJhbnNsYXRpb25zID0gY29sLnNlbGVjdENvbXBvbmVudFRyYW5zbGF0aW9ucyB8fCB7XG4gICAgICAgICAgcGxhY2Vob2xkZXI6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5TZWxlY3QnIH0pLFxuICAgICAgICAgIG5vUmVzdWx0c1RleHQ6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5Ob1Jlc3VsdHMnIH0pLFxuICAgICAgICAgIC8vIFZhcmlhYmxlICduJyBtdXN0IGJlIHByb3ZpZGVkIGluIHRoaXMgcGhhc2UgaW4gb3JkZXIgdG8gYXZvaWRcbiAgICAgICAgICAvLyBFcnJvcjogVGhlIGludGwgc3RyaW5nIGNvbnRleHQgdmFyaWFibGUgJ24nIHdhcyBub3QgcHJvdmlkZWQgdG8gdGhlIHN0cmluZyB7bn1cbiAgICAgICAgICAvLyBzZWxlY3RlZFxuICAgICAgICAgIC8vIFZhcmlhYmxlIG4gaXMgcmVwbGFjZWQgbGF0ZXIsIHdoZW4gaXRzIHZhbHVlIGlzIGF2YWlsYWJsZVxuICAgICAgICAgIHNlbGVjdGVkOiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuU2VsZWN0ZWQnIH0sIHsgbjogJzxuPicgfSksXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IFNlbGVjdFR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gU2VsZWN0VHlwZS5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uY3JlYXRlRnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5maWx0ZXJpbmcgJiYgIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiBNdWx0aVNlbGVjdFR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5maWx0ZXJGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSAnc2VsZWN0Jzoge1xuICAgICAgICBjb25zdCBzZWxlY3RPcHRpb25zID0gY29sLnNlbGVjdENvbXBvbmVudE9wdGlvbnNcbiAgICAgICAgICB8fCBzZWxlY3RDb21wb25lbnRPcHRpb25zLmdldChjb2x1bW4uY29sdW1uS2V5KTtcbiAgICAgICAgaW52YXJpYW50KFxuICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgYE5vIHNlbGVjdENvbXBvbmVudE9wdGlvbnMgcHJvdmlkZWQgZm9yIGNvbHVtbiAnJHtjb2x1bW4uY29sdW1uS2V5fSdgLFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBzZWxlY3RUcmFuc2xhdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50VHJhbnNsYXRpb25zIHx8IHtcbiAgICAgICAgICBwbGFjZWhvbGRlcjogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0LlNlbGVjdCcgfSksXG4gICAgICAgICAgbm9SZXN1bHRzVGV4dDogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0Lk5vUmVzdWx0cycgfSksXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IFNlbGVjdFR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gU2VsZWN0VHlwZS5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uY3JlYXRlRnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5maWx0ZXJpbmcgJiYgIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiBTZWxlY3RUeXBlLmNlbGxGaWx0ZXIoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uZmlsdGVyRnVuY3Rpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBbXG4gICAgICAgICAgeyB2YWx1ZTogdHJ1ZSwgbGFiZWw6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5ZZXMnIH0pIH0sXG4gICAgICAgICAgeyB2YWx1ZTogZmFsc2UsIGxhYmVsOiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuTm8nIH0pIH0sXG4gICAgICAgIF07XG4gICAgICAgIGNvbnN0IHNlbGVjdFRyYW5zbGF0aW9ucyA9IGNvbC5zZWxlY3RDb21wb25lbnRUcmFuc2xhdGlvbnMgfHwge1xuICAgICAgICAgIHBsYWNlaG9sZGVyOiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuU2VsZWN0JyB9KSxcbiAgICAgICAgICBub1Jlc3VsdHNUZXh0OiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuTm9SZXN1bHRzJyB9KSxcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gQm9vbGVhblR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gQm9vbGVhblR5cGUuY2VsbENyZWF0ZShcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmNyZWF0ZUZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuZmlsdGVyaW5nICYmICFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT4gQm9vbGVhblR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5maWx0ZXJGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSAnZGF0ZSc6IHtcbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IERhdGVUeXBlLmNlbGxFZGl0KFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBwcm9wcy5yZWdpb24sXG4gICAgICAgICAgICBwcm9wcy5kYXRlRm9ybWF0LFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uZWRpdEZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IERhdGVUeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByb3BzLnJlZ2lvbixcbiAgICAgICAgICAgIHByb3BzLmRhdGVGb3JtYXQsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5jcmVhdGVGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IERhdGVUeXBlLmNlbGxGaWx0ZXIoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBwcm9wcy5yZWdpb24sXG4gICAgICAgICAgICBwcm9wcy5kYXRlRm9ybWF0LFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uZmlsdGVyRnVuY3Rpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdjdXJyZW5jeSc6IHtcbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gQ3VycmVuY3lUeXBlLmNlbGxFZGl0KFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICAgIHByb3BzLmRhdGEsXG4gICAgICAgICAgICBwcm9wcy50aG91c2FuZFNlcGFyYXRvcixcbiAgICAgICAgICAgIHByb3BzLmRlY2ltYWxTZXBhcmF0b3IsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IEN1cnJlbmN5VHlwZS5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICAuLi5jcmVhdGVGdW5jdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICAgcHJvcHMuZGF0YSxcbiAgICAgICAgICAgIHByb3BzLnRob3VzYW5kU2VwYXJhdG9yLFxuICAgICAgICAgICAgcHJvcHMuZGVjaW1hbFNlcGFyYXRvcixcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5maWx0ZXJpbmcgJiYgIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiBQcmltaXRpdmVUeXBlLmNlbGxGaWx0ZXIoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBwcmltaXRpdmVWYWxQYXJzZXIsXG4gICAgICAgICAgICAndGV4dCcsXG4gICAgICAgICAgICAuLi5maWx0ZXJGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgfVxuICAgIHJldHVybiBjb2x1bW47XG4gIH0sXG59O1xuIl19