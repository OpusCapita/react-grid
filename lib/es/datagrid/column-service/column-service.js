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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2VydmljZS9jb2x1bW4tc2VydmljZS5qc3giXSwibmFtZXMiOlsiVXRpbHMiLCJEYXRlVHlwZSIsIlNlbGVjdFR5cGUiLCJCb29sZWFuVHlwZSIsIkNoZWNrYm94VHlwZSIsIkN1cnJlbmN5VHlwZSIsIlByaW1pdGl2ZVR5cGUiLCJNdWx0aVNlbGVjdFR5cGUiLCJiYXNlQ29sdW1uIiwiY29sIiwiYmFzZUNvbCIsImhlYWRlciIsImNvbHVtbktleSIsImdldENvbHVtbktleSIsIndpZHRoIiwibWluV2lkdGgiLCJtYXhXaWR0aCIsImlzUmVzaXphYmxlIiwiZGlzYWJsZVJlc2l6aW5nIiwiZml4ZWQiLCJmaXhlZFJpZ2h0IiwiYWxsb3dDZWxsc1JlY3ljbGluZyIsImRpc2FibGVTb3J0aW5nIiwiaXNSZXF1aXJlZCIsImNvbXBvbmVudFR5cGUiLCJzdHlsZSIsImdldENlbGxTdHlsZUJ5Q29sIiwidmFsdWVLZXlQYXRoIiwiZmxleEdyb3ciLCJ2YWx1ZVR5cGUiLCJzb3J0Q29tcGFyYXRvciIsInNvcnRWYWx1ZUdldHRlciIsImNvbHVtbkNlbGwiLCJwcm9wcyIsImJhc2VWYWx1ZVJlbmRlciIsImNvbHVtbiIsImNlbGwiLCJ2YWx1ZVJlbmRlciIsInJvd0luZGV4IiwiZGF0YSIsImdldCIsIm51bWJlclZhbFJlbmRlciIsInZhbFJlbmRlciIsImRhdGVGb3JtYXQiLCJ0aG91c2FuZFNlcGFyYXRvciIsImRlY2ltYWxTZXBhcmF0b3IiLCJjZWxsRWRpdCIsImVkaXRWYWx1ZVJlbmRlciIsInNldFJlZiIsIm9uS2V5RG93biIsImNlbGxDcmVhdGUiLCJjcmVhdGVWYWx1ZVJlbmRlciIsImNlbGxGaWx0ZXIiLCJmaWx0ZXJWYWx1ZVJlbmRlciIsImNvbHVtbkNvbXBvbmVudFR5cGUiLCJ0YWJJbmRleCIsImZ1bmN0aW9ucyIsImdldERpc2FibGVkU3RhdGUiLCJlZGl0VmFsdWVQYXJzZXIiLCJ2YWwiLCJlZGl0RnVuY3Rpb25zIiwiZWRpdCIsImNyZWF0ZUZ1bmN0aW9ucyIsImNyZWF0ZSIsImZpbHRlckZ1bmN0aW9ucyIsImZpbHRlciIsImZvcm1Db250cm9sVHlwZSIsInByaW1pdGl2ZVZhbFBhcnNlciIsInJlcGxhY2UiLCJSZWdFeHAiLCJpbmxpbmVFZGl0IiwiZ3JpZCIsImlkIiwiZmlsdGVyaW5nIiwiaW50bCIsInNlbGVjdE9wdGlvbnMiLCJzZWxlY3RDb21wb25lbnRPcHRpb25zIiwic2VsZWN0VHJhbnNsYXRpb25zIiwic2VsZWN0Q29tcG9uZW50VHJhbnNsYXRpb25zIiwicGxhY2Vob2xkZXIiLCJmb3JtYXRNZXNzYWdlIiwibm9SZXN1bHRzVGV4dCIsInNlbGVjdGVkIiwibiIsInZhbHVlIiwibGFiZWwiLCJyZWdpb24iXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixtQkFBbEI7QUFDQSxTQUNFQyxRQURGLEVBRUVDLFVBRkYsRUFHRUMsV0FIRixFQUlFQyxZQUpGLEVBS0VDLFlBTEYsRUFNRUMsYUFORixFQU9FQyxlQVBGLFFBUU8sNkJBUlA7QUFVQSxlQUFlO0FBQ2JDLEVBQUFBLFVBRGEsc0JBQ0ZDLEdBREUsRUFDRztBQUNkLFFBQU1DLE9BQU8sR0FBRztBQUNkQyxNQUFBQSxNQUFNLEVBQUVGLEdBQUcsQ0FBQ0UsTUFERTtBQUVkQyxNQUFBQSxTQUFTLEVBQUVaLEtBQUssQ0FBQ2EsWUFBTixDQUFtQkosR0FBbkIsQ0FGRztBQUdkSyxNQUFBQSxLQUFLLEVBQUVMLEdBQUcsQ0FBQ0ssS0FBSixJQUFhTCxHQUFHLENBQUNLLEtBQUosS0FBYyxDQUEzQixHQUErQkwsR0FBRyxDQUFDSyxLQUFuQyxHQUEyQyxHQUhwQztBQUlkQyxNQUFBQSxRQUFRLEVBQUVOLEdBQUcsQ0FBQ00sUUFBSixJQUFnQk4sR0FBRyxDQUFDTSxRQUFKLEtBQWlCLENBQWpDLEdBQXFDTixHQUFHLENBQUNNLFFBQXpDLEdBQW9ELEVBSmhEO0FBS2RDLE1BQUFBLFFBQVEsRUFBRVAsR0FBRyxDQUFDTyxRQUxBO0FBTWRDLE1BQUFBLFdBQVcsRUFBRSxDQUFDUixHQUFHLENBQUNTLGVBTko7QUFPZEMsTUFBQUEsS0FBSyxFQUFFLENBQUMsQ0FBQ1YsR0FBRyxDQUFDVSxLQVBDO0FBUWRDLE1BQUFBLFVBQVUsRUFBRSxDQUFDLENBQUNYLEdBQUcsQ0FBQ1csVUFSSjtBQVNkQyxNQUFBQSxtQkFBbUIsRUFBRSxDQUFDLENBQUNaLEdBQUcsQ0FBQ1ksbUJBVGI7QUFVZEMsTUFBQUEsY0FBYyxFQUFFLENBQUMsQ0FBQ2IsR0FBRyxDQUFDYSxjQVZSO0FBV2RDLE1BQUFBLFVBQVUsRUFBRSxDQUFDLENBQUNkLEdBQUcsQ0FBQ2MsVUFYSjtBQVlkQyxNQUFBQSxhQUFhLEVBQUVmLEdBQUcsQ0FBQ2UsYUFaTDtBQWFkQyxNQUFBQSxLQUFLLEVBQUV6QixLQUFLLENBQUMwQixpQkFBTixDQUF3QmpCLEdBQXhCO0FBYk8sS0FBaEIsQ0FEYyxDQWdCZDs7QUFDQSxRQUFJQSxHQUFHLENBQUNrQixZQUFSLEVBQXNCakIsT0FBTyxDQUFDaUIsWUFBUixHQUF1QmxCLEdBQUcsQ0FBQ2tCLFlBQTNCLENBakJSLENBa0JkOztBQUNBLFFBQUlsQixHQUFHLENBQUNtQixRQUFSLEVBQWtCbEIsT0FBTyxDQUFDa0IsUUFBUixHQUFtQm5CLEdBQUcsQ0FBQ21CLFFBQXZCLENBbkJKLENBb0JkOztBQUNBLFFBQUluQixHQUFHLENBQUNvQixTQUFSLEVBQW1CbkIsT0FBTyxDQUFDbUIsU0FBUixHQUFvQnBCLEdBQUcsQ0FBQ29CLFNBQXhCLENBckJMLENBc0JkOztBQUNBLFFBQUlwQixHQUFHLENBQUNxQixjQUFSLEVBQXdCcEIsT0FBTyxDQUFDb0IsY0FBUixHQUF5QnJCLEdBQUcsQ0FBQ3FCLGNBQTdCLENBdkJWLENBd0JkOztBQUNBLFFBQUlyQixHQUFHLENBQUNzQixlQUFSLEVBQXlCckIsT0FBTyxDQUFDcUIsZUFBUixHQUEwQnRCLEdBQUcsQ0FBQ3NCLGVBQTlCO0FBQ3pCLFdBQU9yQixPQUFQO0FBQ0QsR0E1Qlk7QUE4QmJzQixFQUFBQSxVQTlCYSxzQkE4QkZ4QixVQTlCRSxFQThCVXlCLEtBOUJWLEVBOEJpQnhCLEdBOUJqQixFQThCc0J5QixlQTlCdEIsRUE4QnVDO0FBQ2xELFFBQU1DLE1BQU0sR0FBRzNCLFVBQWY7O0FBQ0EsUUFBSUMsR0FBRyxDQUFDMkIsSUFBUixFQUFjO0FBQ1pELE1BQUFBLE1BQU0sQ0FBQ0MsSUFBUCxHQUFjM0IsR0FBRyxDQUFDMkIsSUFBbEI7QUFDRCxLQUZELE1BRU8sSUFBSTNCLEdBQUcsQ0FBQzRCLFdBQVIsRUFBcUI7QUFDMUJGLE1BQUFBLE1BQU0sQ0FBQ0MsSUFBUCxHQUFjLFVBQUFFLFFBQVE7QUFBQSxlQUFJN0IsR0FBRyxDQUFDNEIsV0FBSixDQUFnQkosS0FBSyxDQUFDTSxJQUFOLENBQVdDLEdBQVgsQ0FBZUYsUUFBZixDQUFoQixFQUEwQ0EsUUFBMUMsQ0FBSjtBQUFBLE9BQXRCO0FBQ0QsS0FGTSxNQUVBO0FBQ0wsY0FBUTdCLEdBQUcsQ0FBQ29CLFNBQVo7QUFDRSxhQUFLLFFBQUwsQ0FERixDQUNpQjs7QUFDZixhQUFLLE9BQUw7QUFBYztBQUNaTSxZQUFBQSxNQUFNLENBQUNDLElBQVAsR0FBYyxVQUFBRSxRQUFRO0FBQUEscUJBQUloQyxhQUFhLENBQUNtQyxlQUFkLENBQThCaEMsR0FBOUIsRUFBbUM2QixRQUFuQyxFQUE2Q0osZUFBN0MsQ0FBSjtBQUFBLGFBQXRCOztBQUNBO0FBQ0Q7O0FBRUQsYUFBSyxTQUFMO0FBQWdCO0FBQ2RDLFlBQUFBLE1BQU0sQ0FBQ0MsSUFBUCxHQUFjLFVBQUFFLFFBQVE7QUFBQSxxQkFBSW5DLFdBQVcsQ0FBQ3VDLFNBQVosQ0FBc0JqQyxHQUF0QixFQUEyQjZCLFFBQTNCLEVBQXFDSixlQUFyQyxDQUFKO0FBQUEsYUFBdEI7O0FBQ0E7QUFDRDs7QUFFRCxhQUFLLFVBQUw7QUFBaUI7QUFDZkMsWUFBQUEsTUFBTSxDQUFDQyxJQUFQLEdBQWMsVUFBQUUsUUFBUTtBQUFBLHFCQUFJbEMsWUFBWSxDQUFDc0MsU0FBYixDQUF1QkosUUFBdkIsRUFBaUNKLGVBQWpDLENBQUo7QUFBQSxhQUF0Qjs7QUFDQTtBQUNEOztBQUVELGFBQUssTUFBTDtBQUFhO0FBQ1hDLFlBQUFBLE1BQU0sQ0FBQ0MsSUFBUCxHQUFjLFVBQUFFLFFBQVE7QUFBQSxxQkFBSXJDLFFBQVEsQ0FBQ3lDLFNBQVQsQ0FBbUJKLFFBQW5CLEVBQTZCTCxLQUFLLENBQUNVLFVBQW5DLEVBQStDVCxlQUEvQyxDQUFKO0FBQUEsYUFBdEI7O0FBQ0E7QUFDRDtBQUNEOztBQUNBLGFBQUssVUFBTDtBQUFpQjtBQUNmQyxZQUFBQSxNQUFNLENBQUNDLElBQVAsR0FBYyxVQUFBRSxRQUFRO0FBQUEscUJBQUlqQyxZQUFZLENBQUNxQyxTQUFiLENBQ3hCakMsR0FEd0IsRUFFeEJ3QixLQUFLLENBQUNNLElBRmtCLEVBR3hCRCxRQUh3QixFQUl4QkwsS0FBSyxDQUFDVyxpQkFKa0IsRUFLeEJYLEtBQUssQ0FBQ1ksZ0JBTGtCLEVBTXhCWCxlQU53QixDQUFKO0FBQUEsYUFBdEI7O0FBUUE7QUFDRDs7QUFFRDtBQUFTO0FBQ1BDLFlBQUFBLE1BQU0sQ0FBQ0MsSUFBUCxHQUFjLFVBQUFFLFFBQVE7QUFBQSxxQkFBSUosZUFBZSxDQUFDSSxRQUFELENBQW5CO0FBQUEsYUFBdEI7O0FBQ0E7QUFDRDtBQXJDSDtBQXVDRCxLQTlDaUQsQ0ErQ2xEOzs7QUFDQSxRQUFJN0IsR0FBRyxDQUFDcUMsUUFBUixFQUFrQjtBQUNoQlgsTUFBQUEsTUFBTSxDQUFDVyxRQUFQLEdBQWtCckMsR0FBRyxDQUFDcUMsUUFBdEI7QUFDRCxLQUZELE1BRU8sSUFBSXJDLEdBQUcsQ0FBQ3NDLGVBQVIsRUFBeUI7QUFDOUJaLE1BQUFBLE1BQU0sQ0FBQ1csUUFBUCxHQUFrQixVQUFDUixRQUFELEVBQVdVLE1BQVgsRUFBbUJDLFNBQW5CO0FBQUEsZUFBaUN4QyxHQUFHLENBQUNzQyxlQUFKLENBQ2pEZCxLQUFLLENBQUNNLElBQU4sQ0FBV0MsR0FBWCxDQUFlRixRQUFmLENBRGlELEVBRWpEQSxRQUZpRCxFQUdqRFUsTUFIaUQsRUFJakRDLFNBSmlELENBQWpDO0FBQUEsT0FBbEI7QUFNRCxLQXpEaUQsQ0EyRGxEOzs7QUFDQSxRQUFJeEMsR0FBRyxDQUFDeUMsVUFBUixFQUFvQjtBQUNsQmYsTUFBQUEsTUFBTSxDQUFDZSxVQUFQLEdBQW9CekMsR0FBRyxDQUFDeUMsVUFBeEI7QUFDRCxLQUZELE1BRU8sSUFBSXpDLEdBQUcsQ0FBQzBDLGlCQUFSLEVBQTJCO0FBQ2hDaEIsTUFBQUEsTUFBTSxDQUFDZSxVQUFQLEdBQW9CLFVBQUNaLFFBQUQsRUFBV1UsTUFBWCxFQUFtQkMsU0FBbkI7QUFBQSxlQUFpQ3hDLEdBQUcsQ0FBQzBDLGlCQUFKLENBQ25EbEIsS0FBSyxDQUFDTSxJQUFOLENBQVdDLEdBQVgsQ0FBZUYsUUFBZixDQURtRCxFQUVuREEsUUFGbUQsRUFHbkRVLE1BSG1ELEVBSW5EQyxTQUptRCxDQUFqQztBQUFBLE9BQXBCO0FBTUQsS0FyRWlELENBdUVsRDs7O0FBQ0EsUUFBSXhDLEdBQUcsQ0FBQzJDLFVBQVIsRUFBb0I7QUFDbEJqQixNQUFBQSxNQUFNLENBQUNpQixVQUFQLEdBQW9CM0MsR0FBRyxDQUFDMkMsVUFBeEI7QUFDRCxLQUZELE1BRU8sSUFBSTNDLEdBQUcsQ0FBQzRDLGlCQUFSLEVBQTJCO0FBQ2hDbEIsTUFBQUEsTUFBTSxDQUFDaUIsVUFBUCxHQUFvQixVQUFBZCxRQUFRO0FBQUEsZUFBSTdCLEdBQUcsQ0FBQzRDLGlCQUFKLENBQXNCcEIsS0FBSyxDQUFDTSxJQUFOLENBQVdDLEdBQVgsQ0FBZUYsUUFBZixDQUF0QixFQUFnREEsUUFBaEQsQ0FBSjtBQUFBLE9BQTVCO0FBQ0Q7O0FBQ0QsV0FBT0gsTUFBUDtBQUNELEdBNUdZO0FBOEdibUIsRUFBQUEsbUJBOUdhLCtCQThHTzlDLFVBOUdQLEVBOEdtQitDLFFBOUduQixFQThHNkJ0QixLQTlHN0IsRUE4R29DeEIsR0E5R3BDLEVBOEd5QytDLFNBOUd6QyxFQThHb0RDLGdCQTlHcEQsRUE4R3NFO0FBQ2pGLFFBQUksQ0FBQ2hELEdBQUcsQ0FBQ2UsYUFBVCxFQUF3QixPQUFPaEIsVUFBUDtBQUN4QixRQUFNMkIsTUFBTSxHQUFHM0IsVUFBZjtBQUNBLFFBQU1rRCxlQUFlLEdBQUdqRCxHQUFHLENBQUNpRCxlQUFKLEdBQXNCakQsR0FBRyxDQUFDaUQsZUFBMUIsR0FBNEMsVUFBQUMsR0FBRztBQUFBLGFBQUlBLEdBQUo7QUFBQSxLQUF2RSxDQUhpRixDQUlqRjs7QUFDQSxRQUFNQyxhQUFhLGdCQUFRSixTQUFTLENBQUNLLElBQWxCLENBQW5COztBQUNBLFFBQU1DLGVBQWUsZ0JBQVFOLFNBQVMsQ0FBQ08sTUFBbEIsQ0FBckI7O0FBQ0EsUUFBTUMsZUFBZSxnQkFBUVIsU0FBUyxDQUFDUyxNQUFsQixDQUFyQjs7QUFDQSxZQUFReEQsR0FBRyxDQUFDZSxhQUFaO0FBQ0UsV0FBSyxPQUFMO0FBQ0EsV0FBSyxRQUFMO0FBQ0EsV0FBSyxNQUFMO0FBQWE7QUFDWCxjQUFNMEMsZUFBZSxHQUFHekQsR0FBRyxDQUFDZSxhQUFKLEtBQXNCLE9BQXRCLElBQWlDZixHQUFHLENBQUNlLGFBQUosS0FBc0IsUUFBdkQsR0FDcEIsTUFEb0IsR0FFcEJmLEdBQUcsQ0FBQ2UsYUFGUixDQURXLENBSVg7O0FBQ0EsY0FBTTJDLGtCQUFrQixHQUFHLENBQUMxRCxHQUFHLENBQUNpRCxlQUFMLElBQXdCakQsR0FBRyxDQUFDZSxhQUFKLEtBQXNCLE9BQTlDLEdBQ3ZCLFVBQUFtQyxHQUFHO0FBQUEsbUJBQUlBLEdBQUcsQ0FBQ1MsT0FBSixDQUFZLElBQUlDLE1BQUosV0FBbUJwQyxLQUFLLENBQUNZLGdCQUF6QixVQUFnRCxHQUFoRCxDQUFaLEVBQWtFLEVBQWxFLENBQUo7QUFBQSxXQURvQixHQUV2QmEsZUFGSjs7QUFJQSxjQUFJekIsS0FBSyxDQUFDcUMsVUFBTixJQUFvQixDQUFDbkMsTUFBTSxDQUFDVyxRQUFoQyxFQUEwQztBQUN4Q1gsWUFBQUEsTUFBTSxDQUFDVyxRQUFQLEdBQWtCLFVBQUFSLFFBQVE7QUFBQSxxQkFBSWhDLGFBQWEsQ0FBQ3dDLFFBQWQsT0FBQXhDLGFBQWEsR0FDekNHLEdBRHlDLEVBRXpDMEIsTUFGeUMsRUFHekNHLFFBSHlDLEVBSXpDaUIsUUFKeUMsRUFLekN0QixLQUFLLENBQUNzQyxJQUFOLENBQVdDLEVBTDhCLEVBTXpDTCxrQkFOeUMsRUFPekNELGVBUHlDLFNBUXRDTixhQVJzQyxHQVN6Q0gsZ0JBVHlDLEdBQWpCO0FBQUEsYUFBMUI7QUFXRDs7QUFFRCxjQUFJeEIsS0FBSyxDQUFDcUMsVUFBTixJQUFvQixDQUFDbkMsTUFBTSxDQUFDZSxVQUFoQyxFQUE0QztBQUMxQ2YsWUFBQUEsTUFBTSxDQUFDZSxVQUFQLEdBQW9CLFVBQUFaLFFBQVE7QUFBQSxxQkFBSWhDLGFBQWEsQ0FBQzRDLFVBQWQsT0FBQTVDLGFBQWEsR0FDM0NHLEdBRDJDLEVBRTNDMEIsTUFGMkMsRUFHM0NHLFFBSDJDLEVBSTNDaUIsUUFKMkMsRUFLM0N0QixLQUFLLENBQUNzQyxJQUFOLENBQVdDLEVBTGdDLEVBTTNDTCxrQkFOMkMsRUFPM0NELGVBUDJDLFNBUXhDSixlQVJ3QyxHQVMzQ0wsZ0JBVDJDLEdBQWpCO0FBQUEsYUFBNUI7QUFXRDs7QUFFRCxjQUFJeEIsS0FBSyxDQUFDd0MsU0FBTixJQUFtQixDQUFDdEMsTUFBTSxDQUFDaUIsVUFBL0IsRUFBMkM7QUFDekNqQixZQUFBQSxNQUFNLENBQUNpQixVQUFQLEdBQW9CO0FBQUEscUJBQU05QyxhQUFhLENBQUM4QyxVQUFkLE9BQUE5QyxhQUFhLEdBQ3JDRyxHQURxQyxFQUVyQzBCLE1BRnFDLEVBR3JDb0IsUUFIcUMsRUFJckN0QixLQUFLLENBQUNzQyxJQUFOLENBQVdDLEVBSjBCLEVBS3JDTCxrQkFMcUMsRUFNckNELGVBTnFDLFNBT2xDRixlQVBrQyxFQUFuQjtBQUFBLGFBQXBCO0FBU0Q7O0FBQ0Q7QUFDRDs7QUFFRCxXQUFLLFVBQUw7QUFBaUI7QUFDZixjQUFJL0IsS0FBSyxDQUFDcUMsVUFBTixJQUFvQixDQUFDbkMsTUFBTSxDQUFDVyxRQUFoQyxFQUEwQztBQUN4Q1gsWUFBQUEsTUFBTSxDQUFDVyxRQUFQLEdBQWtCLFVBQUFSLFFBQVE7QUFBQSxxQkFBSWxDLFlBQVksQ0FBQzBDLFFBQWIsT0FBQTFDLFlBQVksR0FDeENLLEdBRHdDLEVBRXhDMEIsTUFGd0MsRUFHeENHLFFBSHdDLEVBSXhDaUIsUUFKd0MsRUFLeEN0QixLQUFLLENBQUNzQyxJQUFOLENBQVdDLEVBTDZCLFNBTXJDWixhQU5xQyxFQUFoQjtBQUFBLGFBQTFCO0FBUUQ7O0FBQ0QsY0FBSTNCLEtBQUssQ0FBQ3FDLFVBQU4sSUFBb0IsQ0FBQ25DLE1BQU0sQ0FBQ2UsVUFBaEMsRUFBNEM7QUFDMUNmLFlBQUFBLE1BQU0sQ0FBQ2UsVUFBUCxHQUFvQixVQUFBWixRQUFRO0FBQUEscUJBQUlsQyxZQUFZLENBQUM4QyxVQUFiLE9BQUE5QyxZQUFZLEdBQzFDSyxHQUQwQyxFQUUxQzBCLE1BRjBDLEVBRzFDRyxRQUgwQyxFQUkxQ2lCLFFBSjBDLEVBSzFDdEIsS0FBSyxDQUFDc0MsSUFBTixDQUFXQyxFQUwrQixTQU12Q1YsZUFOdUMsRUFBaEI7QUFBQSxhQUE1QjtBQVFEOztBQUNELGNBQUk3QixLQUFLLENBQUN3QyxTQUFOLElBQW1CLENBQUN0QyxNQUFNLENBQUNpQixVQUEvQixFQUEyQztBQUN6Q2pCLFlBQUFBLE1BQU0sQ0FBQ2lCLFVBQVAsR0FBb0I7QUFBQSxxQkFBTWhELFlBQVksQ0FBQ2dELFVBQWIsT0FBQWhELFlBQVksR0FDcENLLEdBRG9DLEVBRXBDMEIsTUFGb0MsRUFHcENvQixRQUhvQyxFQUlwQ3RCLEtBQUssQ0FBQ3NDLElBQU4sQ0FBV0MsRUFKeUIsRUFLcEN2QyxLQUFLLENBQUN5QyxJQUw4QixTQU1qQ1YsZUFOaUMsRUFBbEI7QUFBQSxhQUFwQjtBQVFEOztBQUNEO0FBQ0Q7O0FBRUQsV0FBSyxhQUFMO0FBQW9CO0FBQ2xCLGNBQU1XLGFBQWEsR0FBR2xFLEdBQUcsQ0FBQ21FLHNCQUFKLElBQ2pCM0MsS0FBSyxDQUFDMkMsc0JBQU4sQ0FBNkJwQyxHQUE3QixDQUFpQ0wsTUFBTSxDQUFDdkIsU0FBeEMsQ0FETDtBQUVBLGNBQU1pRSxrQkFBa0IsR0FBR3BFLEdBQUcsQ0FBQ3FFLDJCQUFKLElBQW1DO0FBQzVEQyxZQUFBQSxXQUFXLEVBQUU5QyxLQUFLLENBQUN5QyxJQUFOLENBQVdNLGFBQVgsQ0FBeUI7QUFBRVIsY0FBQUEsRUFBRSxFQUFFO0FBQU4sYUFBekIsQ0FEK0M7QUFFNURTLFlBQUFBLGFBQWEsRUFBRWhELEtBQUssQ0FBQ3lDLElBQU4sQ0FBV00sYUFBWCxDQUF5QjtBQUFFUixjQUFBQSxFQUFFLEVBQUU7QUFBTixhQUF6QixDQUY2QztBQUc1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBVSxZQUFBQSxRQUFRLEVBQUVqRCxLQUFLLENBQUN5QyxJQUFOLENBQVdNLGFBQVgsQ0FBeUI7QUFBRVIsY0FBQUEsRUFBRSxFQUFFO0FBQU4sYUFBekIsRUFBaUU7QUFBRVcsY0FBQUEsQ0FBQyxFQUFFO0FBQUwsYUFBakU7QUFQa0QsV0FBOUQ7O0FBVUEsY0FBSWxELEtBQUssQ0FBQ3FDLFVBQU4sSUFBb0IsQ0FBQ25DLE1BQU0sQ0FBQ1csUUFBaEMsRUFBMEM7QUFDeENYLFlBQUFBLE1BQU0sQ0FBQ1csUUFBUCxHQUFrQixVQUFBUixRQUFRO0FBQUEscUJBQUlwQyxVQUFVLENBQUM0QyxRQUFYLE9BQUE1QyxVQUFVLEdBQ3RDTyxHQURzQyxFQUV0QzBCLE1BRnNDLEVBR3RDRyxRQUhzQyxFQUl0Q2lCLFFBSnNDLEVBS3RDdEIsS0FBSyxDQUFDc0MsSUFBTixDQUFXQyxFQUwyQixFQU10Q0csYUFOc0MsRUFPdENFLGtCQVBzQyxFQVF0Q25CLGVBUnNDLFNBU25DRSxhQVRtQyxHQVV0Q0gsZ0JBVnNDLEdBQWQ7QUFBQSxhQUExQjtBQVlEOztBQUNELGNBQUl4QixLQUFLLENBQUNxQyxVQUFOLElBQW9CLENBQUNuQyxNQUFNLENBQUNlLFVBQWhDLEVBQTRDO0FBQzFDZixZQUFBQSxNQUFNLENBQUNlLFVBQVAsR0FBb0IsVUFBQVosUUFBUTtBQUFBLHFCQUFJcEMsVUFBVSxDQUFDZ0QsVUFBWCxPQUFBaEQsVUFBVSxHQUN4Q08sR0FEd0MsRUFFeEMwQixNQUZ3QyxFQUd4Q0csUUFId0MsRUFJeENpQixRQUp3QyxFQUt4Q3RCLEtBQUssQ0FBQ3NDLElBQU4sQ0FBV0MsRUFMNkIsRUFNeENHLGFBTndDLEVBT3hDRSxrQkFQd0MsRUFReENuQixlQVJ3QyxTQVNyQ0ksZUFUcUMsR0FVeENMLGdCQVZ3QyxHQUFkO0FBQUEsYUFBNUI7QUFZRDs7QUFDRCxjQUFJeEIsS0FBSyxDQUFDd0MsU0FBTixJQUFtQixDQUFDdEMsTUFBTSxDQUFDaUIsVUFBL0IsRUFBMkM7QUFDekNqQixZQUFBQSxNQUFNLENBQUNpQixVQUFQLEdBQW9CO0FBQUEscUJBQU03QyxlQUFlLENBQUM2QyxVQUFoQixPQUFBN0MsZUFBZSxHQUN2Q0UsR0FEdUMsRUFFdkMwQixNQUZ1QyxFQUd2Q29CLFFBSHVDLEVBSXZDdEIsS0FBSyxDQUFDc0MsSUFBTixDQUFXQyxFQUo0QixFQUt2Q0csYUFMdUMsRUFNdkNFLGtCQU51QyxFQU92Q25CLGVBUHVDLFNBUXBDTSxlQVJvQyxFQUFyQjtBQUFBLGFBQXBCO0FBVUQ7O0FBQ0Q7QUFDRDs7QUFFRCxXQUFLLFFBQUw7QUFBZTtBQUNiLGNBQU1XLGNBQWEsR0FBR2xFLEdBQUcsQ0FBQ21FLHNCQUFKLElBQ2pCM0MsS0FBSyxDQUFDMkMsc0JBQU4sQ0FBNkJwQyxHQUE3QixDQUFpQ0wsTUFBTSxDQUFDdkIsU0FBeEMsQ0FETDs7QUFFQSxjQUFNaUUsbUJBQWtCLEdBQUdwRSxHQUFHLENBQUNxRSwyQkFBSixJQUFtQztBQUM1REMsWUFBQUEsV0FBVyxFQUFFOUMsS0FBSyxDQUFDeUMsSUFBTixDQUFXTSxhQUFYLENBQXlCO0FBQUVSLGNBQUFBLEVBQUUsRUFBRTtBQUFOLGFBQXpCLENBRCtDO0FBRTVEUyxZQUFBQSxhQUFhLEVBQUVoRCxLQUFLLENBQUN5QyxJQUFOLENBQVdNLGFBQVgsQ0FBeUI7QUFBRVIsY0FBQUEsRUFBRSxFQUFFO0FBQU4sYUFBekI7QUFGNkMsV0FBOUQ7O0FBS0EsY0FBSXZDLEtBQUssQ0FBQ3FDLFVBQU4sSUFBb0IsQ0FBQ25DLE1BQU0sQ0FBQ1csUUFBaEMsRUFBMEM7QUFDeENYLFlBQUFBLE1BQU0sQ0FBQ1csUUFBUCxHQUFrQixVQUFBUixRQUFRO0FBQUEscUJBQUlwQyxVQUFVLENBQUM0QyxRQUFYLE9BQUE1QyxVQUFVLEdBQ3RDTyxHQURzQyxFQUV0QzBCLE1BRnNDLEVBR3RDRyxRQUhzQyxFQUl0Q2lCLFFBSnNDLEVBS3RDdEIsS0FBSyxDQUFDc0MsSUFBTixDQUFXQyxFQUwyQixFQU10Q0csY0FOc0MsRUFPdENFLG1CQVBzQyxFQVF0Q25CLGVBUnNDLFNBU25DRSxhQVRtQyxHQVV0Q0gsZ0JBVnNDLEdBQWQ7QUFBQSxhQUExQjtBQVlEOztBQUNELGNBQUl4QixLQUFLLENBQUNxQyxVQUFOLElBQW9CLENBQUNuQyxNQUFNLENBQUNlLFVBQWhDLEVBQTRDO0FBQzFDZixZQUFBQSxNQUFNLENBQUNlLFVBQVAsR0FBb0IsVUFBQVosUUFBUTtBQUFBLHFCQUFJcEMsVUFBVSxDQUFDZ0QsVUFBWCxPQUFBaEQsVUFBVSxHQUN4Q08sR0FEd0MsRUFFeEMwQixNQUZ3QyxFQUd4Q0csUUFId0MsRUFJeENpQixRQUp3QyxFQUt4Q3RCLEtBQUssQ0FBQ3NDLElBQU4sQ0FBV0MsRUFMNkIsRUFNeENHLGNBTndDLEVBT3hDRSxtQkFQd0MsRUFReENuQixlQVJ3QyxTQVNyQ0ksZUFUcUMsR0FVeENMLGdCQVZ3QyxHQUFkO0FBQUEsYUFBNUI7QUFZRDs7QUFDRCxjQUFJeEIsS0FBSyxDQUFDd0MsU0FBTixJQUFtQixDQUFDdEMsTUFBTSxDQUFDaUIsVUFBL0IsRUFBMkM7QUFDekNqQixZQUFBQSxNQUFNLENBQUNpQixVQUFQLEdBQW9CO0FBQUEscUJBQU1sRCxVQUFVLENBQUNrRCxVQUFYLE9BQUFsRCxVQUFVLEdBQ2xDTyxHQURrQyxFQUVsQzBCLE1BRmtDLEVBR2xDb0IsUUFIa0MsRUFJbEN0QixLQUFLLENBQUNzQyxJQUFOLENBQVdDLEVBSnVCLEVBS2xDRyxjQUxrQyxFQU1sQ0UsbUJBTmtDLEVBT2xDbkIsZUFQa0MsU0FRL0JNLGVBUitCLEVBQWhCO0FBQUEsYUFBcEI7QUFVRDs7QUFDRDtBQUNEOztBQUVELFdBQUssU0FBTDtBQUFnQjtBQUNkLGNBQU1XLGVBQWEsR0FBRyxDQUNwQjtBQUFFUyxZQUFBQSxLQUFLLEVBQUUsSUFBVDtBQUFlQyxZQUFBQSxLQUFLLEVBQUVwRCxLQUFLLENBQUN5QyxJQUFOLENBQVdNLGFBQVgsQ0FBeUI7QUFBRVIsY0FBQUEsRUFBRSxFQUFFO0FBQU4sYUFBekI7QUFBdEIsV0FEb0IsRUFFcEI7QUFBRVksWUFBQUEsS0FBSyxFQUFFLEtBQVQ7QUFBZ0JDLFlBQUFBLEtBQUssRUFBRXBELEtBQUssQ0FBQ3lDLElBQU4sQ0FBV00sYUFBWCxDQUF5QjtBQUFFUixjQUFBQSxFQUFFLEVBQUU7QUFBTixhQUF6QjtBQUF2QixXQUZvQixDQUF0Qjs7QUFJQSxjQUFNSyxvQkFBa0IsR0FBR3BFLEdBQUcsQ0FBQ3FFLDJCQUFKLElBQW1DO0FBQzVEQyxZQUFBQSxXQUFXLEVBQUU5QyxLQUFLLENBQUN5QyxJQUFOLENBQVdNLGFBQVgsQ0FBeUI7QUFBRVIsY0FBQUEsRUFBRSxFQUFFO0FBQU4sYUFBekIsQ0FEK0M7QUFFNURTLFlBQUFBLGFBQWEsRUFBRWhELEtBQUssQ0FBQ3lDLElBQU4sQ0FBV00sYUFBWCxDQUF5QjtBQUFFUixjQUFBQSxFQUFFLEVBQUU7QUFBTixhQUF6QjtBQUY2QyxXQUE5RDs7QUFLQSxjQUFJdkMsS0FBSyxDQUFDcUMsVUFBTixJQUFvQixDQUFDbkMsTUFBTSxDQUFDVyxRQUFoQyxFQUEwQztBQUN4Q1gsWUFBQUEsTUFBTSxDQUFDVyxRQUFQLEdBQWtCLFVBQUFSLFFBQVE7QUFBQSxxQkFBSW5DLFdBQVcsQ0FBQzJDLFFBQVosT0FBQTNDLFdBQVcsR0FDdkNNLEdBRHVDLEVBRXZDMEIsTUFGdUMsRUFHdkNHLFFBSHVDLEVBSXZDaUIsUUFKdUMsRUFLdkN0QixLQUFLLENBQUNzQyxJQUFOLENBQVdDLEVBTDRCLEVBTXZDRyxlQU51QyxFQU92Q0Usb0JBUHVDLEVBUXZDbkIsZUFSdUMsU0FTcENFLGFBVG9DLEdBVXZDSCxnQkFWdUMsR0FBZjtBQUFBLGFBQTFCO0FBWUQ7O0FBQ0QsY0FBSXhCLEtBQUssQ0FBQ3FDLFVBQU4sSUFBb0IsQ0FBQ25DLE1BQU0sQ0FBQ2UsVUFBaEMsRUFBNEM7QUFDMUNmLFlBQUFBLE1BQU0sQ0FBQ2UsVUFBUCxHQUFvQixVQUFBWixRQUFRO0FBQUEscUJBQUluQyxXQUFXLENBQUMrQyxVQUFaLE9BQUEvQyxXQUFXLEdBQ3pDTSxHQUR5QyxFQUV6QzBCLE1BRnlDLEVBR3pDRyxRQUh5QyxFQUl6Q2lCLFFBSnlDLEVBS3pDdEIsS0FBSyxDQUFDc0MsSUFBTixDQUFXQyxFQUw4QixFQU16Q0csZUFOeUMsRUFPekNFLG9CQVB5QyxFQVF6Q25CLGVBUnlDLFNBU3RDSSxlQVRzQyxHQVV6Q0wsZ0JBVnlDLEdBQWY7QUFBQSxhQUE1QjtBQVlEOztBQUNELGNBQUl4QixLQUFLLENBQUN3QyxTQUFOLElBQW1CLENBQUN0QyxNQUFNLENBQUNpQixVQUEvQixFQUEyQztBQUN6Q2pCLFlBQUFBLE1BQU0sQ0FBQ2lCLFVBQVAsR0FBb0I7QUFBQSxxQkFBTWpELFdBQVcsQ0FBQ2lELFVBQVosT0FBQWpELFdBQVcsR0FDbkNNLEdBRG1DLEVBRW5DMEIsTUFGbUMsRUFHbkNvQixRQUhtQyxFQUluQ3RCLEtBQUssQ0FBQ3NDLElBQU4sQ0FBV0MsRUFKd0IsRUFLbkNHLGVBTG1DLEVBTW5DRSxvQkFObUMsRUFPbkNuQixlQVBtQyxTQVFoQ00sZUFSZ0MsRUFBakI7QUFBQSxhQUFwQjtBQVVEOztBQUNEO0FBQ0Q7O0FBRUQsV0FBSyxNQUFMO0FBQWE7QUFDWCxjQUFJL0IsS0FBSyxDQUFDcUMsVUFBTixJQUFvQixDQUFDbkMsTUFBTSxDQUFDVyxRQUFoQyxFQUEwQztBQUN4Q1gsWUFBQUEsTUFBTSxDQUFDVyxRQUFQLEdBQWtCLFVBQUFSLFFBQVE7QUFBQSxxQkFBSXJDLFFBQVEsQ0FBQzZDLFFBQVQsT0FBQTdDLFFBQVEsR0FDcENRLEdBRG9DLEVBRXBDMEIsTUFGb0MsRUFHcENHLFFBSG9DLEVBSXBDaUIsUUFKb0MsRUFLcEN0QixLQUFLLENBQUNzQyxJQUFOLENBQVdDLEVBTHlCLEVBTXBDdkMsS0FBSyxDQUFDcUQsTUFOOEIsRUFPcENyRCxLQUFLLENBQUNVLFVBUDhCLEVBUXBDZSxlQVJvQyxTQVNqQ0UsYUFUaUMsR0FVcENILGdCQVZvQyxHQUFaO0FBQUEsYUFBMUI7QUFZRDs7QUFDRCxjQUFJeEIsS0FBSyxDQUFDcUMsVUFBTixJQUFvQixDQUFDbkMsTUFBTSxDQUFDZSxVQUFoQyxFQUE0QztBQUMxQ2YsWUFBQUEsTUFBTSxDQUFDZSxVQUFQLEdBQW9CLFVBQUFaLFFBQVE7QUFBQSxxQkFBSXJDLFFBQVEsQ0FBQ2lELFVBQVQsT0FBQWpELFFBQVEsR0FDdENRLEdBRHNDLEVBRXRDMEIsTUFGc0MsRUFHdENHLFFBSHNDLEVBSXRDaUIsUUFKc0MsRUFLdEN0QixLQUFLLENBQUNzQyxJQUFOLENBQVdDLEVBTDJCLEVBTXRDdkMsS0FBSyxDQUFDcUQsTUFOZ0MsRUFPdENyRCxLQUFLLENBQUNVLFVBUGdDLEVBUXRDZSxlQVJzQyxTQVNuQ0ksZUFUbUMsR0FVdENMLGdCQVZzQyxHQUFaO0FBQUEsYUFBNUI7QUFZRDs7QUFDRCxjQUFJeEIsS0FBSyxDQUFDd0MsU0FBTixJQUFtQixDQUFDdEMsTUFBTSxDQUFDaUIsVUFBL0IsRUFBMkM7QUFDekNqQixZQUFBQSxNQUFNLENBQUNpQixVQUFQLEdBQW9CO0FBQUEscUJBQU1uRCxRQUFRLENBQUNtRCxVQUFULE9BQUFuRCxRQUFRLEdBQ2hDUSxHQURnQyxFQUVoQzBCLE1BRmdDLEVBR2hDb0IsUUFIZ0MsRUFJaEN0QixLQUFLLENBQUNzQyxJQUFOLENBQVdDLEVBSnFCLEVBS2hDdkMsS0FBSyxDQUFDcUQsTUFMMEIsRUFNaENyRCxLQUFLLENBQUNVLFVBTjBCLEVBT2hDZSxlQVBnQyxTQVE3Qk0sZUFSNkIsRUFBZDtBQUFBLGFBQXBCO0FBVUQ7O0FBQ0Q7QUFDRDs7QUFFRDtBQXBTRjs7QUFzU0EsV0FBTzdCLE1BQVA7QUFDRDtBQTdaWSxDQUFmIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFV0aWxzIGZyb20gJy4uL2RhdGFncmlkLnV0aWxzJztcbmltcG9ydCB7XG4gIERhdGVUeXBlLFxuICBTZWxlY3RUeXBlLFxuICBCb29sZWFuVHlwZSxcbiAgQ2hlY2tib3hUeXBlLFxuICBDdXJyZW5jeVR5cGUsXG4gIFByaW1pdGl2ZVR5cGUsXG4gIE11bHRpU2VsZWN0VHlwZSxcbn0gZnJvbSAnLi9jb2x1bW4tdHlwZXMvY29sdW1uLXR5cGVzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBiYXNlQ29sdW1uKGNvbCkge1xuICAgIGNvbnN0IGJhc2VDb2wgPSB7XG4gICAgICBoZWFkZXI6IGNvbC5oZWFkZXIsXG4gICAgICBjb2x1bW5LZXk6IFV0aWxzLmdldENvbHVtbktleShjb2wpLFxuICAgICAgd2lkdGg6IGNvbC53aWR0aCB8fCBjb2wud2lkdGggPT09IDAgPyBjb2wud2lkdGggOiAyMDAsXG4gICAgICBtaW5XaWR0aDogY29sLm1pbldpZHRoIHx8IGNvbC5taW5XaWR0aCA9PT0gMCA/IGNvbC5taW5XaWR0aCA6IDQwLFxuICAgICAgbWF4V2lkdGg6IGNvbC5tYXhXaWR0aCxcbiAgICAgIGlzUmVzaXphYmxlOiAhY29sLmRpc2FibGVSZXNpemluZyxcbiAgICAgIGZpeGVkOiAhIWNvbC5maXhlZCxcbiAgICAgIGZpeGVkUmlnaHQ6ICEhY29sLmZpeGVkUmlnaHQsXG4gICAgICBhbGxvd0NlbGxzUmVjeWNsaW5nOiAhIWNvbC5hbGxvd0NlbGxzUmVjeWNsaW5nLFxuICAgICAgZGlzYWJsZVNvcnRpbmc6ICEhY29sLmRpc2FibGVTb3J0aW5nLFxuICAgICAgaXNSZXF1aXJlZDogISFjb2wuaXNSZXF1aXJlZCxcbiAgICAgIGNvbXBvbmVudFR5cGU6IGNvbC5jb21wb25lbnRUeXBlLFxuICAgICAgc3R5bGU6IFV0aWxzLmdldENlbGxTdHlsZUJ5Q29sKGNvbCksXG4gICAgfTtcbiAgICAvLyB2YWx1ZUtleVBhdGhcbiAgICBpZiAoY29sLnZhbHVlS2V5UGF0aCkgYmFzZUNvbC52YWx1ZUtleVBhdGggPSBjb2wudmFsdWVLZXlQYXRoO1xuICAgIC8vIGZsZXhHcm93XG4gICAgaWYgKGNvbC5mbGV4R3JvdykgYmFzZUNvbC5mbGV4R3JvdyA9IGNvbC5mbGV4R3JvdztcbiAgICAvLyB2YWx1ZVR5cGVcbiAgICBpZiAoY29sLnZhbHVlVHlwZSkgYmFzZUNvbC52YWx1ZVR5cGUgPSBjb2wudmFsdWVUeXBlO1xuICAgIC8vIHNvcnRDb21wYXJhdG9yXG4gICAgaWYgKGNvbC5zb3J0Q29tcGFyYXRvcikgYmFzZUNvbC5zb3J0Q29tcGFyYXRvciA9IGNvbC5zb3J0Q29tcGFyYXRvcjtcbiAgICAvLyBzb3J0VmFsdWVHZXR0ZXJcbiAgICBpZiAoY29sLnNvcnRWYWx1ZUdldHRlcikgYmFzZUNvbC5zb3J0VmFsdWVHZXR0ZXIgPSBjb2wuc29ydFZhbHVlR2V0dGVyO1xuICAgIHJldHVybiBiYXNlQ29sO1xuICB9LFxuXG4gIGNvbHVtbkNlbGwoYmFzZUNvbHVtbiwgcHJvcHMsIGNvbCwgYmFzZVZhbHVlUmVuZGVyKSB7XG4gICAgY29uc3QgY29sdW1uID0gYmFzZUNvbHVtbjtcbiAgICBpZiAoY29sLmNlbGwpIHtcbiAgICAgIGNvbHVtbi5jZWxsID0gY29sLmNlbGw7XG4gICAgfSBlbHNlIGlmIChjb2wudmFsdWVSZW5kZXIpIHtcbiAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gY29sLnZhbHVlUmVuZGVyKHByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSwgcm93SW5kZXgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzd2l0Y2ggKGNvbC52YWx1ZVR5cGUpIHtcbiAgICAgICAgY2FzZSAnbnVtYmVyJzogLy8gZmFsbCB0aHJvdWdoXG4gICAgICAgIGNhc2UgJ2Zsb2F0Jzoge1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gUHJpbWl0aXZlVHlwZS5udW1iZXJWYWxSZW5kZXIoY29sLCByb3dJbmRleCwgYmFzZVZhbHVlUmVuZGVyKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgJ2Jvb2xlYW4nOiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBCb29sZWFuVHlwZS52YWxSZW5kZXIoY29sLCByb3dJbmRleCwgYmFzZVZhbHVlUmVuZGVyKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgJ2NoZWNrYm94Jzoge1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gQ2hlY2tib3hUeXBlLnZhbFJlbmRlcihyb3dJbmRleCwgYmFzZVZhbHVlUmVuZGVyKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgJ2RhdGUnOiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBEYXRlVHlwZS52YWxSZW5kZXIocm93SW5kZXgsIHByb3BzLmRhdGVGb3JtYXQsIGJhc2VWYWx1ZVJlbmRlcik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY2hhbmdlIHZhbFJlbmRlcnMgdG8ganVzdCB0YWtlIHByb3BzIC0tPiBzYXZlcyBzb21lICdlbmVyZ3knXG4gICAgICAgIGNhc2UgJ2N1cnJlbmN5Jzoge1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gQ3VycmVuY3lUeXBlLnZhbFJlbmRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIHByb3BzLmRhdGEsXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHByb3BzLnRob3VzYW5kU2VwYXJhdG9yLFxuICAgICAgICAgICAgcHJvcHMuZGVjaW1hbFNlcGFyYXRvcixcbiAgICAgICAgICAgIGJhc2VWYWx1ZVJlbmRlcixcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gYmFzZVZhbHVlUmVuZGVyKHJvd0luZGV4KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBjZWxsRWRpdCByZW5kZXJcbiAgICBpZiAoY29sLmNlbGxFZGl0KSB7XG4gICAgICBjb2x1bW4uY2VsbEVkaXQgPSBjb2wuY2VsbEVkaXQ7XG4gICAgfSBlbHNlIGlmIChjb2wuZWRpdFZhbHVlUmVuZGVyKSB7XG4gICAgICBjb2x1bW4uY2VsbEVkaXQgPSAocm93SW5kZXgsIHNldFJlZiwgb25LZXlEb3duKSA9PiBjb2wuZWRpdFZhbHVlUmVuZGVyKFxuICAgICAgICBwcm9wcy5kYXRhLmdldChyb3dJbmRleCksXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICBzZXRSZWYsXG4gICAgICAgIG9uS2V5RG93bixcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gY2VsbENyZWF0ZSByZW5kZXJcbiAgICBpZiAoY29sLmNlbGxDcmVhdGUpIHtcbiAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gY29sLmNlbGxDcmVhdGU7XG4gICAgfSBlbHNlIGlmIChjb2wuY3JlYXRlVmFsdWVSZW5kZXIpIHtcbiAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gKHJvd0luZGV4LCBzZXRSZWYsIG9uS2V5RG93bikgPT4gY29sLmNyZWF0ZVZhbHVlUmVuZGVyKFxuICAgICAgICBwcm9wcy5kYXRhLmdldChyb3dJbmRleCksXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICBzZXRSZWYsXG4gICAgICAgIG9uS2V5RG93bixcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gY2VsbEZpbHRlciByZW5kZXJcbiAgICBpZiAoY29sLmNlbGxGaWx0ZXIpIHtcbiAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gY29sLmNlbGxGaWx0ZXI7XG4gICAgfSBlbHNlIGlmIChjb2wuZmlsdGVyVmFsdWVSZW5kZXIpIHtcbiAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gcm93SW5kZXggPT4gY29sLmZpbHRlclZhbHVlUmVuZGVyKHByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSwgcm93SW5kZXgpO1xuICAgIH1cbiAgICByZXR1cm4gY29sdW1uO1xuICB9LFxuXG4gIGNvbHVtbkNvbXBvbmVudFR5cGUoYmFzZUNvbHVtbiwgdGFiSW5kZXgsIHByb3BzLCBjb2wsIGZ1bmN0aW9ucywgZ2V0RGlzYWJsZWRTdGF0ZSkge1xuICAgIGlmICghY29sLmNvbXBvbmVudFR5cGUpIHJldHVybiBiYXNlQ29sdW1uO1xuICAgIGNvbnN0IGNvbHVtbiA9IGJhc2VDb2x1bW47XG4gICAgY29uc3QgZWRpdFZhbHVlUGFyc2VyID0gY29sLmVkaXRWYWx1ZVBhcnNlciA/IGNvbC5lZGl0VmFsdWVQYXJzZXIgOiB2YWwgPT4gdmFsO1xuICAgIC8vIEdyaWQgaW50ZXJuYWwgZnVuY3Rpb25zIHNlcGFyYXRlZFxuICAgIGNvbnN0IGVkaXRGdW5jdGlvbnMgPSB7IC4uLmZ1bmN0aW9ucy5lZGl0IH07XG4gICAgY29uc3QgY3JlYXRlRnVuY3Rpb25zID0geyAuLi5mdW5jdGlvbnMuY3JlYXRlIH07XG4gICAgY29uc3QgZmlsdGVyRnVuY3Rpb25zID0geyAuLi5mdW5jdGlvbnMuZmlsdGVyIH07XG4gICAgc3dpdGNoIChjb2wuY29tcG9uZW50VHlwZSkge1xuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ3RleHQnOiB7XG4gICAgICAgIGNvbnN0IGZvcm1Db250cm9sVHlwZSA9IGNvbC5jb21wb25lbnRUeXBlID09PSAnZmxvYXQnIHx8IGNvbC5jb21wb25lbnRUeXBlID09PSAnbnVtYmVyJ1xuICAgICAgICAgID8gJ3RleHQnXG4gICAgICAgICAgOiBjb2wuY29tcG9uZW50VHlwZTtcbiAgICAgICAgLy8gYWx3YXlzIHVzZSBjb2wuZWRpdFZhbHVlUGFyc2VyIG92ZXJyaWRlIGlmIGF2YWlsYWJsZVxuICAgICAgICBjb25zdCBwcmltaXRpdmVWYWxQYXJzZXIgPSAhY29sLmVkaXRWYWx1ZVBhcnNlciAmJiBjb2wuY29tcG9uZW50VHlwZSA9PT0gJ2Zsb2F0J1xuICAgICAgICAgID8gdmFsID0+IHZhbC5yZXBsYWNlKG5ldyBSZWdFeHAoYFteXFxcXGQke3Byb3BzLmRlY2ltYWxTZXBhcmF0b3J9Ky1dYCwgJ2cnKSwgJycpXG4gICAgICAgICAgOiBlZGl0VmFsdWVQYXJzZXI7XG5cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IFByaW1pdGl2ZVR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByaW1pdGl2ZVZhbFBhcnNlcixcbiAgICAgICAgICAgIGZvcm1Db250cm9sVHlwZSxcbiAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IFByaW1pdGl2ZVR5cGUuY2VsbENyZWF0ZShcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgcHJpbWl0aXZlVmFsUGFyc2VyLFxuICAgICAgICAgICAgZm9ybUNvbnRyb2xUeXBlLFxuICAgICAgICAgICAgLi4uY3JlYXRlRnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IFByaW1pdGl2ZVR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByaW1pdGl2ZVZhbFBhcnNlcixcbiAgICAgICAgICAgIGZvcm1Db250cm9sVHlwZSxcbiAgICAgICAgICAgIC4uLmZpbHRlckZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlICdjaGVja2JveCc6IHtcbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IENoZWNrYm94VHlwZS5jZWxsRWRpdChcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgLi4uZWRpdEZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gQ2hlY2tib3hUeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIC4uLmNyZWF0ZUZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5maWx0ZXJpbmcgJiYgIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiBDaGVja2JveFR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByb3BzLmludGwsXG4gICAgICAgICAgICAuLi5maWx0ZXJGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSAnbXVsdGlzZWxlY3QnOiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50T3B0aW9uc1xuICAgICAgICAgIHx8IHByb3BzLnNlbGVjdENvbXBvbmVudE9wdGlvbnMuZ2V0KGNvbHVtbi5jb2x1bW5LZXkpO1xuICAgICAgICBjb25zdCBzZWxlY3RUcmFuc2xhdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50VHJhbnNsYXRpb25zIHx8IHtcbiAgICAgICAgICBwbGFjZWhvbGRlcjogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0LlNlbGVjdCcgfSksXG4gICAgICAgICAgbm9SZXN1bHRzVGV4dDogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0Lk5vUmVzdWx0cycgfSksXG4gICAgICAgICAgLy8gVmFyaWFibGUgJ24nIG11c3QgYmUgcHJvdmlkZWQgaW4gdGhpcyBwaGFzZSBpbiBvcmRlciB0byBhdm9pZFxuICAgICAgICAgIC8vIEVycm9yOiBUaGUgaW50bCBzdHJpbmcgY29udGV4dCB2YXJpYWJsZSAnbicgd2FzIG5vdCBwcm92aWRlZCB0byB0aGUgc3RyaW5nIHtufVxuICAgICAgICAgIC8vIHNlbGVjdGVkXG4gICAgICAgICAgLy8gVmFyaWFibGUgbiBpcyByZXBsYWNlZCBsYXRlciwgd2hlbiBpdHMgdmFsdWUgaXMgYXZhaWxhYmxlXG4gICAgICAgICAgc2VsZWN0ZWQ6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5TZWxlY3RlZCcgfSwgeyBuOiAnPG4+JyB9KSxcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gU2VsZWN0VHlwZS5jZWxsRWRpdChcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiBTZWxlY3RUeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5jcmVhdGVGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IE11bHRpU2VsZWN0VHlwZS5jZWxsRmlsdGVyKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmZpbHRlckZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlICdzZWxlY3QnOiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50T3B0aW9uc1xuICAgICAgICAgIHx8IHByb3BzLnNlbGVjdENvbXBvbmVudE9wdGlvbnMuZ2V0KGNvbHVtbi5jb2x1bW5LZXkpO1xuICAgICAgICBjb25zdCBzZWxlY3RUcmFuc2xhdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50VHJhbnNsYXRpb25zIHx8IHtcbiAgICAgICAgICBwbGFjZWhvbGRlcjogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0LlNlbGVjdCcgfSksXG4gICAgICAgICAgbm9SZXN1bHRzVGV4dDogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0Lk5vUmVzdWx0cycgfSksXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IFNlbGVjdFR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gU2VsZWN0VHlwZS5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uY3JlYXRlRnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5maWx0ZXJpbmcgJiYgIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiBTZWxlY3RUeXBlLmNlbGxGaWx0ZXIoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uZmlsdGVyRnVuY3Rpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBbXG4gICAgICAgICAgeyB2YWx1ZTogdHJ1ZSwgbGFiZWw6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5ZZXMnIH0pIH0sXG4gICAgICAgICAgeyB2YWx1ZTogZmFsc2UsIGxhYmVsOiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuTm8nIH0pIH0sXG4gICAgICAgIF07XG4gICAgICAgIGNvbnN0IHNlbGVjdFRyYW5zbGF0aW9ucyA9IGNvbC5zZWxlY3RDb21wb25lbnRUcmFuc2xhdGlvbnMgfHwge1xuICAgICAgICAgIHBsYWNlaG9sZGVyOiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuU2VsZWN0JyB9KSxcbiAgICAgICAgICBub1Jlc3VsdHNUZXh0OiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuTm9SZXN1bHRzJyB9KSxcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gQm9vbGVhblR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gQm9vbGVhblR5cGUuY2VsbENyZWF0ZShcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmNyZWF0ZUZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuZmlsdGVyaW5nICYmICFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT4gQm9vbGVhblR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5maWx0ZXJGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSAnZGF0ZSc6IHtcbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IERhdGVUeXBlLmNlbGxFZGl0KFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBwcm9wcy5yZWdpb24sXG4gICAgICAgICAgICBwcm9wcy5kYXRlRm9ybWF0LFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uZWRpdEZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IERhdGVUeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByb3BzLnJlZ2lvbixcbiAgICAgICAgICAgIHByb3BzLmRhdGVGb3JtYXQsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5jcmVhdGVGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IERhdGVUeXBlLmNlbGxGaWx0ZXIoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBwcm9wcy5yZWdpb24sXG4gICAgICAgICAgICBwcm9wcy5kYXRlRm9ybWF0LFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uZmlsdGVyRnVuY3Rpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgfVxuICAgIHJldHVybiBjb2x1bW47XG4gIH0sXG59O1xuIl19