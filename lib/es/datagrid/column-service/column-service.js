function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
        case 'select':
          {
            var selectOptions = col.selectComponentOptions || props.selectComponentOptions.get(column.columnKey);

            column.cell = function (rowIndex) {
              return SelectType.valRender(rowIndex, selectOptions, baseValueRender);
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
        return col.editValueRender(props.data.get(rowIndex), rowIndex, setRef, onKeyDown);
      };
    } // cellCreate render


    if (col.cellCreate) {
      column.cellCreate = col.cellCreate;
    } else if (col.createValueRender) {
      column.cellCreate = function (rowIndex, setRef, onKeyDown) {
        return col.createValueRender(props.data.get(rowIndex), rowIndex, setRef, onKeyDown);
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

    switch (col.componentType) {
      case 'currency':
      case 'float':
      case 'number':
      case 'text':
        {
          var formControlType = col.componentType === 'float' || col.componentType === 'number' ? 'text' : col.componentType; // always use col.editValueParser override if available

          var primitiveValParser = !col.editValueParser && col.componentType === 'float' ? function (val) {
            return val.replace(new RegExp("[^\\d" + props.decimalSeparator + "+-]", 'g'), '');
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
          var _selectOptions = col.selectComponentOptions || props.selectComponentOptions.get(column.columnKey);

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
          var _selectOptions2 = [{
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2VydmljZS9jb2x1bW4tc2VydmljZS5qc3giXSwibmFtZXMiOlsiVXRpbHMiLCJEYXRlVHlwZSIsIlNlbGVjdFR5cGUiLCJCb29sZWFuVHlwZSIsIkNoZWNrYm94VHlwZSIsIkN1cnJlbmN5VHlwZSIsIlByaW1pdGl2ZVR5cGUiLCJNdWx0aVNlbGVjdFR5cGUiLCJiYXNlQ29sdW1uIiwiY29sIiwiYmFzZUNvbCIsImhlYWRlciIsImNvbHVtbktleSIsImdldENvbHVtbktleSIsIndpZHRoIiwibWluV2lkdGgiLCJtYXhXaWR0aCIsImlzUmVzaXphYmxlIiwiZGlzYWJsZVJlc2l6aW5nIiwiZml4ZWQiLCJmaXhlZFJpZ2h0IiwiYWxsb3dDZWxsc1JlY3ljbGluZyIsImRpc2FibGVTb3J0aW5nIiwiaXNSZXF1aXJlZCIsImNvbXBvbmVudFR5cGUiLCJzdHlsZSIsImdldENlbGxTdHlsZUJ5Q29sIiwidmFsdWVLZXlQYXRoIiwiZmxleEdyb3ciLCJ2YWx1ZVR5cGUiLCJzb3J0Q29tcGFyYXRvciIsInNvcnRWYWx1ZUdldHRlciIsImNvbHVtbkNlbGwiLCJwcm9wcyIsImJhc2VWYWx1ZVJlbmRlciIsImNvbHVtbiIsImNlbGwiLCJ2YWx1ZVJlbmRlciIsInJvd0luZGV4IiwiZGF0YSIsImdldCIsIm51bWJlclZhbFJlbmRlciIsInRob3VzYW5kU2VwYXJhdG9yIiwiZGVjaW1hbFNlcGFyYXRvciIsInZhbFJlbmRlciIsInNlbGVjdE9wdGlvbnMiLCJzZWxlY3RDb21wb25lbnRPcHRpb25zIiwiZGF0ZUZvcm1hdCIsImNlbGxFZGl0IiwiZWRpdFZhbHVlUmVuZGVyIiwic2V0UmVmIiwib25LZXlEb3duIiwiY2VsbENyZWF0ZSIsImNyZWF0ZVZhbHVlUmVuZGVyIiwiY2VsbEZpbHRlciIsImZpbHRlclZhbHVlUmVuZGVyIiwiY29sdW1uQ29tcG9uZW50VHlwZSIsInRhYkluZGV4IiwiZnVuY3Rpb25zIiwiZ2V0RGlzYWJsZWRTdGF0ZSIsImVkaXRWYWx1ZVBhcnNlciIsInZhbCIsImVkaXRGdW5jdGlvbnMiLCJlZGl0IiwiY3JlYXRlRnVuY3Rpb25zIiwiY3JlYXRlIiwiZmlsdGVyRnVuY3Rpb25zIiwiZmlsdGVyIiwiZm9ybUNvbnRyb2xUeXBlIiwicHJpbWl0aXZlVmFsUGFyc2VyIiwicmVwbGFjZSIsIlJlZ0V4cCIsImlubGluZUVkaXQiLCJncmlkIiwiaWQiLCJmaWx0ZXJpbmciLCJpbnRsIiwic2VsZWN0VHJhbnNsYXRpb25zIiwic2VsZWN0Q29tcG9uZW50VHJhbnNsYXRpb25zIiwicGxhY2Vob2xkZXIiLCJmb3JtYXRNZXNzYWdlIiwibm9SZXN1bHRzVGV4dCIsInNlbGVjdGVkIiwibiIsInZhbHVlIiwibGFiZWwiLCJyZWdpb24iXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixtQkFBbEI7QUFDQSxTQUNFQyxRQURGLEVBRUVDLFVBRkYsRUFHRUMsV0FIRixFQUlFQyxZQUpGLEVBS0VDLFlBTEYsRUFNRUMsYUFORixFQU9FQyxlQVBGLFFBUU8sNkJBUlA7QUFVQSxlQUFlO0FBQ2JDLEVBQUFBLFVBRGEsc0JBQ0ZDLEdBREUsRUFDRztBQUNkLFFBQU1DLE9BQU8sR0FBRztBQUNkQyxNQUFBQSxNQUFNLEVBQUVGLEdBQUcsQ0FBQ0UsTUFERTtBQUVkQyxNQUFBQSxTQUFTLEVBQUVaLEtBQUssQ0FBQ2EsWUFBTixDQUFtQkosR0FBbkIsQ0FGRztBQUdkSyxNQUFBQSxLQUFLLEVBQUVMLEdBQUcsQ0FBQ0ssS0FBSixJQUFhTCxHQUFHLENBQUNLLEtBQUosS0FBYyxDQUEzQixHQUErQkwsR0FBRyxDQUFDSyxLQUFuQyxHQUEyQyxHQUhwQztBQUlkQyxNQUFBQSxRQUFRLEVBQUVOLEdBQUcsQ0FBQ00sUUFBSixJQUFnQk4sR0FBRyxDQUFDTSxRQUFKLEtBQWlCLENBQWpDLEdBQXFDTixHQUFHLENBQUNNLFFBQXpDLEdBQW9ELEVBSmhEO0FBS2RDLE1BQUFBLFFBQVEsRUFBRVAsR0FB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Q2EsZUFSc0MsU0FTbkNJLGVBVG1DLEdBVXRDTCxnQkFWc0MsR0FBWjtBQUFBLGFBQTVCO0FBWUQ7O0FBQ0QsY0FBSTFCLEtBQUssQ0FBQzBDLFNBQU4sSUFBbUIsQ0FBQ3hDLE1BQU0sQ0FBQ21CLFVBQS9CLEVBQTJDO0FBQ3pDbkIsWUFBQUEsTUFBTSxDQUFDbUIsVUFBUCxHQUFvQjtBQUFBLHFCQUFNckQsUUFBUSxDQUFDcUQsVUFBVCxPQUFBckQsUUFBUSxHQUNoQ1EsR0FEZ0MsRUFFaEMwQixNQUZnQyxFQUdoQ3NCLFFBSGdDLEVBSWhDeEIsS0FBSyxDQUFDd0MsSUFBTixDQUFXQyxFQUpxQixFQUtoQ3pDLEtBQUssQ0FBQ3FELE1BTDBCLEVBTWhDckQsS0FBSyxDQUFDYyxVQU4wQixFQU9oQ2EsZUFQZ0MsU0FRN0JNLGVBUjZCLEVBQWQ7QUFBQSxhQUFwQjtBQVVEOztBQUNEO0FBQ0Q7O0FBRUQ7QUFyU0Y7O0FBdVNBLFdBQU8vQixNQUFQO0FBQ0Q7QUFoYlksQ0FBZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBVdGlscyBmcm9tICcuLi9kYXRhZ3JpZC51dGlscyc7XG5pbXBvcnQge1xuICBEYXRlVHlwZSxcbiAgU2VsZWN0VHlwZSxcbiAgQm9vbGVhblR5cGUsXG4gIENoZWNrYm94VHlwZSxcbiAgQ3VycmVuY3lUeXBlLFxuICBQcmltaXRpdmVUeXBlLFxuICBNdWx0aVNlbGVjdFR5cGUsXG59IGZyb20gJy4vY29sdW1uLXR5cGVzL2NvbHVtbi10eXBlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYmFzZUNvbHVtbihjb2wpIHtcbiAgICBjb25zdCBiYXNlQ29sID0ge1xuICAgICAgaGVhZGVyOiBjb2wuaGVhZGVyLFxuICAgICAgY29sdW1uS2V5OiBVdGlscy5nZXRDb2x1bW5LZXkoY29sKSxcbiAgICAgIHdpZHRoOiBjb2wud2lkdGggfHwgY29sLndpZHRoID09PSAwID8gY29sLndpZHRoIDogMjAwLFxuICAgICAgbWluV2lkdGg6IGNvbC5taW5XaWR0aCB8fCBjb2wubWluV2lkdGggPT09IDAgPyBjb2wubWluV2lkdGggOiA0MCxcbiAgICAgIG1heFdpZHRoOiBjb2wubWF4V2lkdGgsXG4gICAgICBpc1Jlc2l6YWJsZTogIWNvbC5kaXNhYmxlUmVzaXppbmcsXG4gICAgICBmaXhlZDogISFjb2wuZml4ZWQsXG4gICAgICBmaXhlZFJpZ2h0OiAhIWNvbC5maXhlZFJpZ2h0LFxuICAgICAgYWxsb3dDZWxsc1JlY3ljbGluZzogISFjb2wuYWxsb3dDZWxsc1JlY3ljbGluZyxcbiAgICAgIGRpc2FibGVTb3J0aW5nOiAhIWNvbC5kaXNhYmxlU29ydGluZyxcbiAgICAgIGlzUmVxdWlyZWQ6ICEhY29sLmlzUmVxdWlyZWQsXG4gICAgICBjb21wb25lbnRUeXBlOiBjb2wuY29tcG9uZW50VHlwZSxcbiAgICAgIHN0eWxlOiBVdGlscy5nZXRDZWxsU3R5bGVCeUNvbChjb2wpLFxuICAgIH07XG4gICAgLy8gdmFsdWVLZXlQYXRoXG4gICAgaWYgKGNvbC52YWx1ZUtleVBhdGgpIGJhc2VDb2wudmFsdWVLZXlQYXRoID0gY29sLnZhbHVlS2V5UGF0aDtcbiAgICAvLyBmbGV4R3Jvd1xuICAgIGlmIChjb2wuZmxleEdyb3cpIGJhc2VDb2wuZmxleEdyb3cgPSBjb2wuZmxleEdyb3c7XG4gICAgLy8gdmFsdWVUeXBlXG4gICAgaWYgKGNvbC52YWx1ZVR5cGUpIGJhc2VDb2wudmFsdWVUeXBlID0gY29sLnZhbHVlVHlwZTtcbiAgICAvLyBzb3J0Q29tcGFyYXRvclxuICAgIGlmIChjb2wuc29ydENvbXBhcmF0b3IpIGJhc2VDb2wuc29ydENvbXBhcmF0b3IgPSBjb2wuc29ydENvbXBhcmF0b3I7XG4gICAgLy8gc29ydFZhbHVlR2V0dGVyXG4gICAgaWYgKGNvbC5zb3J0VmFsdWVHZXR0ZXIpIGJhc2VDb2wuc29ydFZhbHVlR2V0dGVyID0gY29sLnNvcnRWYWx1ZUdldHRlcjtcbiAgICByZXR1cm4gYmFzZUNvbDtcbiAgfSxcblxuICBjb2x1bW5DZWxsKGJhc2VDb2x1bW4sIHByb3BzLCBjb2wsIGJhc2VWYWx1ZVJlbmRlcikge1xuICAgIGNvbnN0IGNvbHVtbiA9IGJhc2VDb2x1bW47XG4gICAgaWYgKGNvbC5jZWxsKSB7XG4gICAgICBjb2x1bW4uY2VsbCA9IGNvbC5jZWxsO1xuICAgIH0gZWxzZSBpZiAoY29sLnZhbHVlUmVuZGVyKSB7XG4gICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IGNvbC52YWx1ZVJlbmRlcihwcm9wcy5kYXRhLmdldChyb3dJbmRleCksIHJvd0luZGV4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3dpdGNoIChjb2wuY29tcG9uZW50VHlwZSkge1xuICAgICAgICBjYXNlICdudW1iZXInOiAvLyBmYWxsIHRocm91Z2hcbiAgICAgICAgY2FzZSAnZmxvYXQnOiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBQcmltaXRpdmVUeXBlLm51bWJlclZhbFJlbmRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgcHJvcHMudGhvdXNhbmRTZXBhcmF0b3IsXG4gICAgICAgICAgICBwcm9wcy5kZWNpbWFsU2VwYXJhdG9yLFxuICAgICAgICAgICAgYmFzZVZhbHVlUmVuZGVyLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlICdib29sZWFuJzoge1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gQm9vbGVhblR5cGUudmFsUmVuZGVyKGNvbCwgcm93SW5kZXgsIGJhc2VWYWx1ZVJlbmRlcik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlICdjaGVja2JveCc6IHtcbiAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IENoZWNrYm94VHlwZS52YWxSZW5kZXIocm93SW5kZXgsIGJhc2VWYWx1ZVJlbmRlcik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlICdtdWx0aXNlbGVjdCc6XG4gICAgICAgIGNhc2UgJ3NlbGVjdCc6IHtcbiAgICAgICAgICBjb25zdCBzZWxlY3RPcHRpb25zID0gY29sLnNlbGVjdENvbXBvbmVudE9wdGlvbnNcbiAgICAgICAgICAgIHx8IHByb3BzLnNlbGVjdENvbXBvbmVudE9wdGlvbnMuZ2V0KGNvbHVtbi5jb2x1bW5LZXkpO1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gU2VsZWN0VHlwZS52YWxSZW5kZXIoXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBiYXNlVmFsdWVSZW5kZXIsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgJ2RhdGUnOiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBEYXRlVHlwZS52YWxSZW5kZXIocm93SW5kZXgsIHByb3BzLmRhdGVGb3JtYXQsIGJhc2VWYWx1ZVJlbmRlcik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY2hhbmdlIHZhbFJlbmRlcnMgdG8ganVzdCB0YWtlIHByb3BzIC0tPiBzYXZlcyBzb21lICdlbmVyZ3knXG4gICAgICAgIGNhc2UgJ2N1cnJlbmN5Jzoge1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gQ3VycmVuY3lUeXBlLnZhbFJlbmRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIHByb3BzLmRhdGEsXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHByb3BzLnRob3VzYW5kU2VwYXJhdG9yLFxuICAgICAgICAgICAgcHJvcHMuZGVjaW1hbFNlcGFyYXRvcixcbiAgICAgICAgICAgIGJhc2VWYWx1ZVJlbmRlcixcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gYmFzZVZhbHVlUmVuZGVyKHJvd0luZGV4KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBjZWxsRWRpdCByZW5kZXJcbiAgICBpZiAoY29sLmNlbGxFZGl0KSB7XG4gICAgICBjb2x1bW4uY2VsbEVkaXQgPSBjb2wuY2VsbEVkaXQ7XG4gICAgfSBlbHNlIGlmIChjb2wuZWRpdFZhbHVlUmVuZGVyKSB7XG4gICAgICBjb2x1bW4uY2VsbEVkaXQgPSAocm93SW5kZXgsIHNldFJlZiwgb25LZXlEb3duKSA9PiBjb2wuZWRpdFZhbHVlUmVuZGVyKFxuICAgICAgICBwcm9wcy5kYXRhLmdldChyb3dJbmRleCksXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICBzZXRSZWYsXG4gICAgICAgIG9uS2V5RG93bixcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gY2VsbENyZWF0ZSByZW5kZXJcbiAgICBpZiAoY29sLmNlbGxDcmVhdGUpIHtcbiAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gY29sLmNlbGxDcmVhdGU7XG4gICAgfSBlbHNlIGlmIChjb2wuY3JlYXRlVmFsdWVSZW5kZXIpIHtcbiAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gKHJvd0luZGV4LCBzZXRSZWYsIG9uS2V5RG93bikgPT4gY29sLmNyZWF0ZVZhbHVlUmVuZGVyKFxuICAgICAgICBwcm9wcy5kYXRhLmdldChyb3dJbmRleCksXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICBzZXRSZWYsXG4gICAgICAgIG9uS2V5RG93bixcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gY2VsbEZpbHRlciByZW5kZXJcbiAgICBpZiAoY29sLmNlbGxGaWx0ZXIpIHtcbiAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gY29sLmNlbGxGaWx0ZXI7XG4gICAgfSBlbHNlIGlmIChjb2wuZmlsdGVyVmFsdWVSZW5kZXIpIHtcbiAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gcm93SW5kZXggPT4gY29sLmZpbHRlclZhbHVlUmVuZGVyKHByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSwgcm93SW5kZXgpO1xuICAgIH1cbiAgICByZXR1cm4gY29sdW1uO1xuICB9LFxuXG4gIGNvbHVtbkNvbXBvbmVudFR5cGUoYmFzZUNvbHVtbiwgdGFiSW5kZXgsIHByb3BzLCBjb2wsIGZ1bmN0aW9ucywgZ2V0RGlzYWJsZWRTdGF0ZSkge1xuICAgIGlmICghY29sLmNvbXBvbmVudFR5cGUpIHJldHVybiBiYXNlQ29sdW1uO1xuICAgIGNvbnN0IGNvbHVtbiA9IGJhc2VDb2x1bW47XG4gICAgY29uc3QgZWRpdFZhbHVlUGFyc2VyID0gY29sLmVkaXRWYWx1ZVBhcnNlciA/IGNvbC5lZGl0VmFsdWVQYXJzZXIgOiB2YWwgPT4gdmFsO1xuICAgIC8vIEdyaWQgaW50ZXJuYWwgZnVuY3Rpb25zIHNlcGFyYXRlZFxuICAgIGNvbnN0IGVkaXRGdW5jdGlvbnMgPSB7IC4uLmZ1bmN0aW9ucy5lZGl0IH07XG4gICAgY29uc3QgY3JlYXRlRnVuY3Rpb25zID0geyAuLi5mdW5jdGlvbnMuY3JlYXRlIH07XG4gICAgY29uc3QgZmlsdGVyRnVuY3Rpb25zID0geyAuLi5mdW5jdGlvbnMuZmlsdGVyIH07XG4gICAgc3dpdGNoIChjb2wuY29tcG9uZW50VHlwZSkge1xuICAgICAgY2FzZSAnY3VycmVuY3knOlxuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ3RleHQnOiB7XG4gICAgICAgIGNvbnN0IGZvcm1Db250cm9sVHlwZSA9IGNvbC5jb21wb25lbnRUeXBlID09PSAnZmxvYXQnIHx8IGNvbC5jb21wb25lbnRUeXBlID09PSAnbnVtYmVyJ1xuICAgICAgICAgID8gJ3RleHQnXG4gICAgICAgICAgOiBjb2wuY29tcG9uZW50VHlwZTtcbiAgICAgICAgLy8gYWx3YXlzIHVzZSBjb2wuZWRpdFZhbHVlUGFyc2VyIG92ZXJyaWRlIGlmIGF2YWlsYWJsZVxuICAgICAgICBjb25zdCBwcmltaXRpdmVWYWxQYXJzZXIgPSAhY29sLmVkaXRWYWx1ZVBhcnNlciAmJiBjb2wuY29tcG9uZW50VHlwZSA9PT0gJ2Zsb2F0J1xuICAgICAgICAgID8gdmFsID0+IHZhbC5yZXBsYWNlKG5ldyBSZWdFeHAoYFteXFxcXGQke3Byb3BzLmRlY2ltYWxTZXBhcmF0b3J9Ky1dYCwgJ2cnKSwgJycpXG4gICAgICAgICAgOiBlZGl0VmFsdWVQYXJzZXI7XG5cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IFByaW1pdGl2ZVR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByaW1pdGl2ZVZhbFBhcnNlcixcbiAgICAgICAgICAgIGZvcm1Db250cm9sVHlwZSxcbiAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IFByaW1pdGl2ZVR5cGUuY2VsbENyZWF0ZShcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgcHJpbWl0aXZlVmFsUGFyc2VyLFxuICAgICAgICAgICAgZm9ybUNvbnRyb2xUeXBlLFxuICAgICAgICAgICAgLi4uY3JlYXRlRnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IFByaW1pdGl2ZVR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByaW1pdGl2ZVZhbFBhcnNlcixcbiAgICAgICAgICAgIGZvcm1Db250cm9sVHlwZSxcbiAgICAgICAgICAgIC4uLmZpbHRlckZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlICdjaGVja2JveCc6IHtcbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IENoZWNrYm94VHlwZS5jZWxsRWRpdChcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgLi4uZWRpdEZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gQ2hlY2tib3hUeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIC4uLmNyZWF0ZUZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5maWx0ZXJpbmcgJiYgIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiBDaGVja2JveFR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByb3BzLmludGwsXG4gICAgICAgICAgICAuLi5maWx0ZXJGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSAnbXVsdGlzZWxlY3QnOiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50T3B0aW9uc1xuICAgICAgICAgIHx8IHByb3BzLnNlbGVjdENvbXBvbmVudE9wdGlvbnMuZ2V0KGNvbHVtbi5jb2x1bW5LZXkpO1xuICAgICAgICBjb25zdCBzZWxlY3RUcmFuc2xhdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50VHJhbnNsYXRpb25zIHx8IHtcbiAgICAgICAgICBwbGFjZWhvbGRlcjogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0LlNlbGVjdCcgfSksXG4gICAgICAgICAgbm9SZXN1bHRzVGV4dDogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0Lk5vUmVzdWx0cycgfSksXG4gICAgICAgICAgLy8gVmFyaWFibGUgJ24nIG11c3QgYmUgcHJvdmlkZWQgaW4gdGhpcyBwaGFzZSBpbiBvcmRlciB0byBhdm9pZFxuICAgICAgICAgIC8vIEVycm9yOiBUaGUgaW50bCBzdHJpbmcgY29udGV4dCB2YXJpYWJsZSAnbicgd2FzIG5vdCBwcm92aWRlZCB0byB0aGUgc3RyaW5nIHtufVxuICAgICAgICAgIC8vIHNlbGVjdGVkXG4gICAgICAgICAgLy8gVmFyaWFibGUgbiBpcyByZXBsYWNlZCBsYXRlciwgd2hlbiBpdHMgdmFsdWUgaXMgYXZhaWxhYmxlXG4gICAgICAgICAgc2VsZWN0ZWQ6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5TZWxlY3RlZCcgfSwgeyBuOiAnPG4+JyB9KSxcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gU2VsZWN0VHlwZS5jZWxsRWRpdChcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiBTZWxlY3RUeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5jcmVhdGVGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IE11bHRpU2VsZWN0VHlwZS5jZWxsRmlsdGVyKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmZpbHRlckZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlICdzZWxlY3QnOiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50T3B0aW9uc1xuICAgICAgICAgIHx8IHByb3BzLnNlbGVjdENvbXBvbmVudE9wdGlvbnMuZ2V0KGNvbHVtbi5jb2x1bW5LZXkpO1xuICAgICAgICBjb25zdCBzZWxlY3RUcmFuc2xhdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50VHJhbnNsYXRpb25zIHx8IHtcbiAgICAgICAgICBwbGFjZWhvbGRlcjogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0LlNlbGVjdCcgfSksXG4gICAgICAgICAgbm9SZXN1bHRzVGV4dDogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0Lk5vUmVzdWx0cycgfSksXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IFNlbGVjdFR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gU2VsZWN0VHlwZS5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uY3JlYXRlRnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5maWx0ZXJpbmcgJiYgIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiBTZWxlY3RUeXBlLmNlbGxGaWx0ZXIoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uZmlsdGVyRnVuY3Rpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBbXG4gICAgICAgICAgeyB2YWx1ZTogdHJ1ZSwgbGFiZWw6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5ZZXMnIH0pIH0sXG4gICAgICAgICAgeyB2YWx1ZTogZmFsc2UsIGxhYmVsOiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuTm8nIH0pIH0sXG4gICAgICAgIF07XG4gICAgICAgIGNvbnN0IHNlbGVjdFRyYW5zbGF0aW9ucyA9IGNvbC5zZWxlY3RDb21wb25lbnRUcmFuc2xhdGlvbnMgfHwge1xuICAgICAgICAgIHBsYWNlaG9sZGVyOiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuU2VsZWN0JyB9KSxcbiAgICAgICAgICBub1Jlc3VsdHNUZXh0OiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuTm9SZXN1bHRzJyB9KSxcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gQm9vbGVhblR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gQm9vbGVhblR5cGUuY2VsbENyZWF0ZShcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmNyZWF0ZUZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuZmlsdGVyaW5nICYmICFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT4gQm9vbGVhblR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5maWx0ZXJGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSAnZGF0ZSc6IHtcbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IERhdGVUeXBlLmNlbGxFZGl0KFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBwcm9wcy5yZWdpb24sXG4gICAgICAgICAgICBwcm9wcy5kYXRlRm9ybWF0LFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uZWRpdEZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IERhdGVUeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByb3BzLnJlZ2lvbixcbiAgICAgICAgICAgIHByb3BzLmRhdGVGb3JtYXQsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5jcmVhdGVGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IERhdGVUeXBlLmNlbGxGaWx0ZXIoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBwcm9wcy5yZWdpb24sXG4gICAgICAgICAgICBwcm9wcy5kYXRlRm9ybWF0LFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uZmlsdGVyRnVuY3Rpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgfVxuICAgIHJldHVybiBjb2x1bW47XG4gIH0sXG59O1xuIl19