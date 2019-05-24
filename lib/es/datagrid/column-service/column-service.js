function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { Map } from 'immutable';
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
        case 'select':
          {
            var selectOptions = col.selectComponentOptions || selectComponentOptions.get(column.columnKey);

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
          var _selectOptions = col.selectComponentOptions || selectComponentOptions.get(column.columnKey);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2VydmljZS9jb2x1bW4tc2VydmljZS5qc3giXSwibmFtZXMiOlsiTWFwIiwiVXRpbHMiLCJEYXRlVHlwZSIsIlNlbGVjdFR5cGUiLCJCb29sZWFuVHlwZSIsIkNoZWNrYm94VHlwZSIsIkN1cnJlbmN5VHlwZSIsIlByaW1pdGl2ZVR5cGUiLCJNdWx0aVNlbGVjdFR5cGUiLCJiYXNlQ29sdW1uIiwiY29sIiwiYmFzZUNvbCIsImhlYWRlciIsImNvbHVtbktleSIsImdldENvbHVtbktleSIsIndpZHRoIiwibWluV2lkdGgiLCJtYXhXaWR0aCIsImlzUmVzaXphYmxlIiwiZGlzYWJsZVJlc2l6aW5nIiwiZml4ZWQiLCJmaXhlZFJpZ2h0IiwiYWxsb3dDZWxsc1JlY3ljbGluZyIsImRpc2FibGVTb3J0aW5nIiwiaXNSZXF1aXJlZCIsImNvbXBvbmVudFR5cGUiLCJzdHlsZSIsImdldENlbGxTdHlsZUJ5Q29sIiwidmFsdWVLZXlQYXRoIiwiZmxleEdyb3ciLCJ2YWx1ZVR5cGUiLCJzb3J0Q29tcGFyYXRvciIsInNvcnRWYWx1ZUdldHRlciIsImNvbHVtbkNlbGwiLCJwcm9wcyIsImJhc2VWYWx1ZVJlbmRlciIsImNvbHVtbiIsImNlbGwiLCJ2YWx1ZVJlbmRlciIsInJvd0luZGV4IiwiZGF0YSIsImdldCIsInNlbGVjdENvbXBvbmVudE9wdGlvbnMiLCJudW1iZXJWYWxSZW5kZXIiLCJ0aG91c2FuZFNlcGFyYXRvciIsImRlY2ltYWxTZXBhcmF0b3IiLCJ2YWxSZW5kZXIiLCJzZWxlY3RPcHRpb25zIiwiZGF0ZUZvcm1hdCIsImNlbGxFZGl0IiwiZWRpdFZhbHVlUmVuZGVyIiwic2V0UmVmIiwib25LZXlEb3duIiwiY2VsbENyZWF0ZSIsImNyZWF0ZVZhbHVlUmVuZGVyIiwiY2VsbEZpbHRlciIsImZpbHRlclZhbHVlUmVuZGVyIiwiY29sdW1uQ29tcG9uZW50VHlwZSIsInRhYkluZGV4IiwiZnVuY3Rpb25zIiwiZ2V0RGlzYWJsZWRTdGF0ZSIsImVkaXRWYWx1ZVBhcnNlciIsInZhbCIsImVkaXRGdW5jdGlvbnMiLCJlZGl0IiwiY3JlYXRlRnVuY3Rpb25zIiwiY3JlYXRlIiwiZmlsdGVyRnVuY3Rpb25zIiwiZmlsdGVyIiwicHJpbWl0aXZlVmFsUGFyc2VyIiwicmVwbGFjZSIsIlJlZ0V4cCIsImZvcm1Db250cm9sVHlwZSIsImlubGluZUVkaXQiLCJncmlkIiwiaWQiLCJmaWx0ZXJpbmciLCJpbnRsIiwic2VsZWN0VHJhbnNsYXRpb25zIiwic2VsZWN0Q29tcG9uZW50VHJhbnNsYXRpb25zIiwicGxhY2Vob2xkZXIiLCJmb3JtYXRNZXNzYWdlIiwibm9SZXN1bHRzVGV4dCIsInNlbGVjdGVkIiwibiIsInZhbHVlIiwibGFiZWwiLCJyZWdpb24iXSwibWFwcGluZ3MiOiI7O0FBQUEsU0FBU0EsR0FBVCxRQUFvQixXQUFwQjtBQUNBLE9BQU9DLEtBQVAsTUFBa0IsbUJBQWxCO0FBQ0EsU0FDRUMsUUFERixFQUVFQyxVQUZGLEVBR0VDLFdBSEYsRUFJRUMsWUFKRixFQUtFQyxZQUxGLEVBTUVDLGFBTkYsRUFPRUMsZUFQRixRQVFPLDZCQVJQO0FBVUEsZUFBZTtBQUNiQyxFQUFBQSxVQURhLHNCQUNGQyxHQURFLEVBQ0c7QUFDZCxRQUFNQyxPQUFPLEdBQUc7QUFDZEMsTUFBQUEsTUFBTSxFQUFFRixHQUFHLENBQUNFLE1BREU7QUFFZEMsTUFBQUEsU0FBUyxFQUFFWixLQUFLLENBQUNhLFlBQU4sQ0FBbUJKLEdBQW5CLENBRkc7QUFHZEssTUFBQUEsS0FBSyxFQUFFTCxHQUFHLENBQUNLLEtBQUosSUFBYUwsR0FBRyxDQUFDSyxLQUFKLEtBQWMsQ0FBM0IsR0FBK0JMLEdBQUcsQ0FBQ0ssS0FBbkMsR0FBMkMsR0FIcEM7QUFJZEMsTUFBQUEsUUFBUSxFQUFFTixHQUFHLENBQUNNLFFBQUosSUFBZ0JOLEdBQUcsQ0FBQ00sUUFBSixLQUFpQixDQUFqQyxHQUFxQ04sR0FBRyxDQUFDTSxRQUF6QyxHQUFvRCxFQUpoRDtBQUtkQyxNQUFBQSxRQUFRLEVBQUVQLEdBQUcsQ0FBQ08sUUFMQTtBQU1kQyxNQUFBQSxXQUFXLEVBQUUsQ0FBQ1IsR0FBRyxDQUFDUyxlQU5KO0FBT2RDLE1BQUFBLEtBQUssRUFBRSxDQUFDLENBQUNWLEdBQUcsQ0FBQ1UsS0FQQztBQVFkQyxNQUFBQSxVQUFVLEVBQUUsQ0FBQyxDQUFDWCxHQUFHLENBQUNXLFVBUko7QUFTZEMsTUFBQUEsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDWixHQUFHLENBQUNZLG1CQVRiO0FBVWRDLE1BQUFBLGNBQWMsRUFBRSxDQUFDLENBQUNiLEdBQUcsQ0FBQ2EsY0FWUjtBQVdkQyxNQUFBQSxVQUFVLEVBQUUsQ0FBQyxDQUFDZCxHQUFHLENBQUNjLFVBWEo7QUFZZEMsTUFBQUEsYUFBYSxFQUFFZixHQUFHLENBQUNlLGFBWkw7QUFhZEMsTUFBQUEsS0FBSyxFQUFFekIsS0FBSyxDQUFDMEIsaUJBQU4sQ0FBd0JqQixHQUF4QjtBQWJPLEtBQWhCLENBRGMsQ0FnQmQ7O0FBQ0EsUUFBSUEsR0FBRyxDQUFDa0IsWUFBUixFQUFzQmpCLE9BQU8sQ0FBQ2lCLFlBQVIsR0FBdUJsQixHQUFHLENBQUNrQixZQUEzQixDQWpCUixDQWtCZDs7QUFDQSxRQUFJbEIsR0FBRyxDQUFDbUIsUUFBUixFQUFrQmxCLE9BQU8sQ0FBQ2tCLFFBQVIsR0FBbUJuQixHQUFHLENBQUNtQixRQUF2QixDQW5CSixDQW9CZDs7QUFDQSxRQUFJbkIsR0FBRyxDQUFDb0IsU0FBUixFQUFtQm5CLE9BQU8sQ0FBQ21CLFNBQVIsR0FBb0JwQixHQUFHLENBQUNvQixTQUF4QixDQXJCTCxDQXNCZDs7QUFDQSxRQUFJcEIsR0FBRyxDQUFDcUIsY0FBUixFQUF3QnBCLE9BQU8sQ0FBQ29CLGNBQVIsR0FBeUJyQixHQUFHLENBQUNxQixjQUE3QixDQXZCVixDQXdCZDs7QUFDQSxRQUFJckIsR0FBRyxDQUFDc0IsZUFBUixFQUF5QnJCLE9BQU8sQ0FBQ3FCLGVBQVIsR0FBMEJ0QixHQUFHLENBQUNzQixlQUE5QjtBQUN6QixXQUFPckIsT0FBUDtBQUNELEdBNUJZO0FBOEJic0IsRUFBQUEsVUE5QmEsc0JBOEJGeEIsVUE5QkUsRUE4QlV5QixLQTlCVixFQThCaUJ4QixHQTlCakIsRUE4QnNCeUIsZUE5QnRCLEVBOEJ1QztBQUNsRCxRQUFNQyxNQUFNLEdBQUczQixVQUFmOztBQUNBLFFBQUlDLEdBQUcsQ0FBQzJCLElBQVIsRUFBYztBQUNaRCxNQUFBQSxNQUFNLENBQUNDLElBQVAsR0FBYzNCLEdBQUcsQ0FBQzJCLElBQWxCO0FBQ0QsS0FGRCxNQUVPLElBQUkzQixHQUFHLENBQUM0QixXQUFSLEVBQXFCO0FBQzFCRixNQUFBQSxNQUFNLENBQUNDLElBQVAsR0FBYyxVQUFBRSxRQUFRO0FBQUEsZUFBSTdCLEdBQUcsQ0FBQzRCLFdBQUosQ0FBZ0JKLEtBQUssQ0FBQ00sSUFBTixDQUFXQyxHQUFYLENBQWVGLFFBQWYsQ0FBaEIsRUFBMENBLFFBQTFDLENBQUo7QUFBQSxPQUF0QjtBQUNELEtBRk0sTUFFQTtBQUFBLGtDQUNzQ0wsS0FEdEMsQ0FDR1Esc0JBREg7QUFBQSxVQUNHQSxzQkFESCxzQ0FDNEIxQyxHQUFHLEVBRC9COztBQUVMLGNBQVFVLEdBQUcsQ0FBQ2UsYUFBWjtBQUNFLGFBQUssUUFBTCxDQURGLENBQ2lCOztBQUNmLGFBQUssT0FBTDtBQUFjO0FBQ1pXLFlBQUFBLE1BQU0sQ0FBQ0MsSUFBUCxHQUFjLFVBQUFFLFFBQVE7QUFBQSxxQkFBSWhDLGFBQWEsQ0FBQ29DLGVBQWQsQ0FDeEJqQyxHQUR3QixFQUV4QjZCLFFBRndCLEVBR3hCTCxLQUFLLENBQUNVLGlCQUhrQixFQUl4QlYsS0FBSyxDQUFDVyxnQkFKa0IsRUFLeEJWLGVBTHdCLENBQUo7QUFBQSxhQUF0Qjs7QUFPQTtBQUNEOztBQUVELGFBQUssU0FBTDtBQUFnQjtBQUNkQyxZQUFBQSxNQUFNLENBQUNDLElBQVAsR0FBYyxVQUFBRSxRQUFRO0FBQUEscUJBQUluQyxXQUFXLENBQUMwQyxTQUFaLENBQXNCcEMsR0FBdEIsRUFBMkI2QixRQUEzQixFQUFxQ0osZUFBckMsQ0FBSjtBQUFBLGFBQXRCOztBQUNBO0FBQ0Q7O0FBRUQsYUFBSyxVQUFMO0FBQWlCO0FBQ2ZDLFlBQUFBLE1BQU0sQ0FBQ0MsSUFBUCxHQUFjLFVBQUFFLFFBQVE7QUFBQSxxQkFBSWxDLFlBQVksQ0FBQ3lDLFNBQWIsQ0FBdUJQLFFBQXZCLEVBQWlDSixlQUFqQyxDQUFKO0FBQUEsYUFBdEI7O0FBQ0E7QUFDRDs7QUFFRCxhQUFLLGFBQUw7QUFDQSxhQUFLLFFBQUw7QUFBZTtBQUNiLGdCQUFNWSxhQUFhLEdBQUdyQyxHQUFHLENBQUNnQyxzQkFBSixJQUNqQkEsc0JBQXNCLENBQUNELEdBQXZCLENBQTJCTCxNQUFNLENBQUN2QixTQUFsQyxDQURMOztBQUVBdUIsWUFBQUEsTUFBTSxDQUFDQyxJQUFQLEdBQWMsVUFBQUUsUUFBUTtBQUFBLHFCQUFJcEMsVUFBVSxDQUFDMkMsU0FBWCxDQUN4QlAsUUFEd0IsRUFFeEJRLGFBRndCLEVBR3hCWixlQUh3QixDQUFKO0FBQUEsYUFBdEI7O0FBS0E7QUFDRDs7QUFFRCxhQUFLLE1BQUw7QUFBYTtBQUNYQyxZQUFBQSxNQUFNLENBQUNDLElBQVAsR0FBYyxVQUFBRSxRQUFRO0FBQUEscUJBQUlyQyxRQUFRLENBQUM0QyxTQUFULENBQW1CUCxRQUFuQixFQUE2QkwsS0FBSyxDQUFDYyxVQUFuQyxFQUErQ2IsZUFBL0MsQ0FBSjtBQUFBLGFBQXRCOztBQUNBO0FBQ0Q7QUFDRDs7QUFDQSxhQUFLLFVBQUw7QUFBaUI7QUFDZkMsWUFBQUEsTUFBTSxDQUFDQyxJQUFQLEdBQWMsVUFBQUUsUUFBUTtBQUFBLHFCQUFJakMsWUFBWSxDQUFDd0MsU0FBYixDQUN4QnBDLEdBRHdCLEVBRXhCd0IsS0FBSyxDQUFDTSxJQUZrQixFQUd4QkQsUUFId0IsRUFJeEJMLEtBQUssQ0FBQ1UsaUJBSmtCLEVBS3hCVixLQUFLLENBQUNXLGdCQUxrQixFQU14QlYsZUFOd0IsQ0FBSjtBQUFBLGFBQXRCOztBQVFBO0FBQ0Q7O0FBRUQ7QUFBUztBQUNQQyxZQUFBQSxNQUFNLENBQUNDLElBQVAsR0FBYyxVQUFBRSxRQUFRO0FBQUEscUJBQUlKLGVBQWUsQ0FBQ0ksUUFBRCxDQUFuQjtBQUFBLGFBQXRCOztBQUNBO0FBQ0Q7QUF2REg7QUF5REQsS0FqRWlELENBa0VsRDs7O0FBQ0EsUUFBSTdCLEdBQUcsQ0FBQ3VDLFFBQVIsRUFBa0I7QUFDaEJiLE1BQUFBLE1BQU0sQ0FBQ2EsUUFBUCxHQUFrQnZDLEdBQUcsQ0FBQ3VDLFFBQXRCO0FBQ0QsS0FGRCxNQUVPLElBQUl2QyxHQUFHLENBQUN3QyxlQUFSLEVBQXlCO0FBQzlCZCxNQUFBQSxNQUFNLENBQUNhLFFBQVAsR0FBa0IsVUFBQ1YsUUFBRCxFQUFXWSxNQUFYLEVBQW1CQyxTQUFuQjtBQUFBLGVBQWlDMUMsR0FBRyxDQUFDd0MsZUFBSixDQUNqRGhCLEtBQUssQ0FBQ00sSUFBTixDQUFXQyxHQUFYLENBQWVGLFFBQWYsQ0FEaUQsRUFFakRBLFFBRmlELEVBR2pEWSxNQUhpRCxFQUlqREMsU0FKaUQsQ0FBakM7QUFBQSxPQUFsQjtBQU1ELEtBNUVpRCxDQThFbEQ7OztBQUNBLFFBQUkxQyxHQUFHLENBQUMyQyxVQUFSLEVBQW9CO0FBQ2xCakIsTUFBQUEsTUFBTSxDQUFDaUIsVUFBUCxHQUFvQjNDLEdBQUcsQ0FBQzJDLFVBQXhCO0FBQ0QsS0FGRCxNQUVPLElBQUkzQyxHQUFHLENBQUM0QyxpQkFBUixFQUEyQjtBQUNoQ2xCLE1BQUFBLE1BQU0sQ0FBQ2lCLFVBQVAsR0FBb0IsVUFBQ2QsUUFBRCxFQUFXWSxNQUFYLEVBQW1CQyxTQUFuQjtBQUFBLGVBQWlDMUMsR0FBRyxDQUFDNEMsaUJBQUosQ0FDbkRwQixLQUFLLENBQUNNLElBQU4sQ0FBV0MsR0FBWCxDQUFlRixRQUFmLENBRG1ELEVBRW5EQSxRQUZtRCxFQUduRFksTUFIbUQsRUFJbkRDLFNBSm1ELENBQWpDO0FBQUEsT0FBcEI7QUFNRCxLQXhGaUQsQ0EwRmxEOzs7QUFDQSxRQUFJMUMsR0FBRyxDQUFDNkMsVUFBUixFQUFvQjtBQUNsQm5CLE1BQUFBLE1BQU0sQ0FBQ21CLFVBQVAsR0FBb0I3QyxHQUFHLENBQUM2QyxVQUF4QjtBQUNELEtBRkQsTUFFTyxJQUFJN0MsR0FBRyxDQUFDOEMsaUJBQVIsRUFBMkI7QUFDaENwQixNQUFBQSxNQUFNLENBQUNtQixVQUFQLEdBQW9CLFVBQUFoQixRQUFRO0FBQUEsZUFBSTdCLEdBQUcsQ0FBQzhDLGlCQUFKLENBQXNCdEIsS0FBSyxDQUFDTSxJQUFOLENBQVdDLEdBQVgsQ0FBZUYsUUFBZixDQUF0QixFQUFnREEsUUFBaEQsQ0FBSjtBQUFBLE9BQTVCO0FBQ0Q7O0FBQ0QsV0FBT0gsTUFBUDtBQUNELEdBL0hZO0FBaUlicUIsRUFBQUEsbUJBaklhLCtCQWlJT2hELFVBaklQLEVBaUltQmlELFFBakluQixFQWlJNkJ4QixLQWpJN0IsRUFpSW9DeEIsR0FqSXBDLEVBaUl5Q2lELFNBakl6QyxFQWlJb0RDLGdCQWpJcEQsRUFpSXNFO0FBQ2pGLFFBQUksQ0FBQ2xELEdBQUcsQ0FBQ2UsYUFBVCxFQUF3QixPQUFPaEIsVUFBUDtBQUN4QixRQUFNMkIsTUFBTSxHQUFHM0IsVUFBZjtBQUNBLFFBQU1vRCxlQUFlLEdBQUduRCxHQUFHLENBQUNtRCxlQUFKLEdBQXNCbkQsR0FBRyxDQUFDbUQsZUFBMUIsR0FBNEMsVUFBQUMsR0FBRztBQUFBLGFBQUlBLEdBQUo7QUFBQSxLQUF2RSxDQUhpRixDQUlqRjs7QUFDQSxRQUFNQyxhQUFhLGdCQUFRSixTQUFTLENBQUNLLElBQWxCLENBQW5COztBQUNBLFFBQU1DLGVBQWUsZ0JBQVFOLFNBQVMsQ0FBQ08sTUFBbEIsQ0FBckI7O0FBQ0EsUUFBTUMsZUFBZSxnQkFBUVIsU0FBUyxDQUFDUyxNQUFsQixDQUFyQjs7QUFQaUYsaUNBUXRDbEMsS0FSc0MsQ0FRekVRLHNCQVJ5RTtBQUFBLFFBUXpFQSxzQkFSeUUsdUNBUWhEMUMsR0FBRyxFQVI2QztBQVNqRixRQUFNcUUsa0JBQWtCLEdBQUcsQ0FBQzNELEdBQUcsQ0FBQ21ELGVBQUwsSUFBd0JuRCxHQUFHLENBQUNlLGFBQUosS0FBc0IsT0FBOUMsR0FDdkIsVUFBQXFDLEdBQUc7QUFBQSxhQUFJQSxHQUFHLENBQUNRLE9BQUosQ0FBWSxJQUFJQyxNQUFKLFdBQW1CckMsS0FBSyxDQUFDVyxnQkFBekIsVUFBZ0QsR0FBaEQsQ0FBWixFQUFrRSxFQUFsRSxDQUFKO0FBQUEsS0FEb0IsR0FFdkJnQixlQUZKOztBQUlBLFlBQVFuRCxHQUFHLENBQUNlLGFBQVo7QUFDRSxXQUFLLE9BQUw7QUFDQSxXQUFLLFFBQUw7QUFDQSxXQUFLLE1BQUw7QUFBYTtBQUNYLGNBQU0rQyxlQUFlLEdBQUc5RCxHQUFHLENBQUNlLGFBQUosS0FBc0IsT0FBdEIsSUFBaUNmLEdBQUcsQ0FBQ2UsYUFBSixLQUFzQixRQUF2RCxHQUNwQixNQURvQixHQUVwQmYsR0FBRyxDQUFDZSxhQUZSLENBRFcsQ0FJWDs7QUFFQSxjQUFJUyxLQUFLLENBQUN1QyxVQUFOLElBQW9CLENBQUNyQyxNQUFNLENBQUNhLFFBQWhDLEVBQTBDO0FBQ3hDYixZQUFBQSxNQUFNLENBQUNhLFFBQVAsR0FBa0IsVUFBQVYsUUFBUTtBQUFBLHFCQUFJaEMsYUFBYSxDQUFDMEMsUUFBZCxPQUFBMUMsYUFBYSxHQUN6Q0csR0FEeUMsRUFFekMwQixNQUZ5QyxFQUd6Q0csUUFIeUMsRUFJekNtQixRQUp5QyxFQUt6Q3hCLEtBQUssQ0FBQ3dDLElBQU4sQ0FBV0MsRUFMOEIsRUFNekNOLGtCQU55QyxFQU96Q0csZUFQeUMsU0FRdENULGFBUnNDLEdBU3pDSCxnQkFUeUMsR0FBakI7QUFBQSxhQUExQjtBQVdEOztBQUVELGNBQUkxQixLQUFLLENBQUN1QyxVQUFOLElBQW9CLENBQUNyQyxNQUFNLENBQUNpQixVQUFoQyxFQUE0QztBQUMxQ2pCLFlBQUFBLE1BQU0sQ0FBQ2lCLFVBQVAsR0FBb0IsVUFBQWQsUUFBUTtBQUFBLHFCQUFJaEMsYUFBYSxDQUFDOEMsVUFBZCxPQUFBOUMsYUFBYSxHQUMzQ0csR0FEMkMsRUFFM0MwQixNQUYyQyxFQUczQ0csUUFIMkMsRUFJM0NtQixRQUoyQyxFQUszQ3hCLEtBQUssQ0FBQ3dDLElBQU4sQ0FBV0MsRUFMZ0MsRUFNM0NOLGtCQU4yQyxFQU8zQ0csZUFQMkMsU0FReENQLGVBUndDLEdBUzNDTCxnQkFUMkMsR0FBakI7QUFBQSxhQUE1QjtBQVdEOztBQUVELGNBQUkxQixLQUFLLENBQUMwQyxTQUFOLElBQW1CLENBQUN4QyxNQUFNLENBQUNtQixVQUEvQixFQUEyQztBQUN6Q25CLFlBQUFBLE1BQU0sQ0FBQ21CLFVBQVAsR0FBb0I7QUFBQSxxQkFBTWhELGFBQWEsQ0FBQ2dELFVBQWQsT0FBQWhELGFBQWEsR0FDckNHLEdBRHFDLEVBRXJDMEIsTUFGcUMsRUFHckNzQixRQUhxQyxFQUlyQ3hCLEtBQUssQ0FBQ3dDLElBQU4sQ0FBV0MsRUFKMEIsRUFLckNOLGtCQUxxQyxFQU1yQ0csZUFOcUMsU0FPbENMLGVBUGtDLEVBQW5CO0FBQUEsYUFBcEI7QUFTRDs7QUFDRDtBQUNEOztBQUVELFdBQUssVUFBTDtBQUFpQjtBQUNmLGNBQUlqQyxLQUFLLENBQUN1QyxVQUFOLElBQW9CLENBQUNyQyxNQUFNLENBQUNhLFFBQWhDLEVBQTBDO0FBQ3hDYixZQUFBQSxNQUFNLENBQUNhLFFBQVAsR0FBa0IsVUFBQVYsUUFBUTtBQUFBLHFCQUFJbEMsWUFBWSxDQUFDNEMsUUFBYixPQUFBNUMsWUFBWSxHQUN4Q0ssR0FEd0MsRUFFeEMwQixNQUZ3QyxFQUd4Q0csUUFId0MsRUFJeENtQixRQUp3QyxFQUt4Q3hCLEtBQUssQ0FBQ3dDLElBQU4sQ0FBV0MsRUFMNkIsU0FNckNaLGFBTnFDLEVBQWhCO0FBQUEsYUFBMUI7QUFRRDs7QUFDRCxjQUFJN0IsS0FBSyxDQUFDdUMsVUFBTixJQUFvQixDQUFDckMsTUFBTSxDQUFDaUIsVUFBaEMsRUFBNEM7QUFDMUNqQixZQUFBQSxNQUFNLENBQUNpQixVQUFQLEdBQW9CLFVBQUFkLFFBQVE7QUFBQSxxQkFBSWxDLFlBQVksQ0FBQ2dELFVBQWIsT0FBQWhELFlBQVksR0FDMUNLLEdBRDBDLEVBRTFDMEIsTUFGMEMsRUFHMUNHLFFBSDBDLEVBSTFDbUIsUUFKMEMsRUFLMUN4QixLQUFLLENBQUN3QyxJQUFOLENBQVdDLEVBTCtCLFNBTXZDVixlQU51QyxFQUFoQjtBQUFBLGFBQTVCO0FBUUQ7O0FBQ0QsY0FBSS9CLEtBQUssQ0FBQzBDLFNBQU4sSUFBbUIsQ0FBQ3hDLE1BQU0sQ0FBQ21CLFVBQS9CLEVBQTJDO0FBQ3pDbkIsWUFBQUEsTUFBTSxDQUFDbUIsVUFBUCxHQUFvQjtBQUFBLHFCQUFNbEQsWUFBWSxDQUFDa0QsVUFBYixPQUFBbEQsWUFBWSxHQUNwQ0ssR0FEb0MsRUFFcEMwQixNQUZvQyxFQUdwQ3NCLFFBSG9DLEVBSXBDeEIsS0FBSyxDQUFDd0MsSUFBTixDQUFXQyxFQUp5QixFQUtwQ3pDLEtBQUssQ0FBQzJDLElBTDhCLFNBTWpDVixlQU5pQyxFQUFsQjtBQUFBLGFBQXBCO0FBUUQ7O0FBQ0Q7QUFDRDs7QUFFRCxXQUFLLGFBQUw7QUFBb0I7QUFDbEIsY0FBTXBCLGFBQWEsR0FBR3JDLEdBQUcsQ0FBQ2dDLHNCQUFKLElBQ2pCQSxzQkFBc0IsQ0FBQ0QsR0FBdkIsQ0FBMkJMLE1BQU0sQ0FBQ3ZCLFNBQWxDLENBREw7QUFFQSxjQUFNaUUsa0JBQWtCLEdBQUdwRSxHQUFHLENBQUNxRSwyQkFBSixJQUFtQztBQUM1REMsWUFBQUEsV0FBVyxFQUFFOUMsS0FBSyxDQUFDMkMsSUFBTixDQUFXSSxhQUFYLENBQXlCO0FBQUVOLGNBQUFBLEVBQUUsRUFBRTtBQUFOLGFBQXpCLENBRCtDO0FBRTVETyxZQUFBQSxhQUFhLEVBQUVoRCxLQUFLLENBQUMyQyxJQUFOLENBQVdJLGFBQVgsQ0FBeUI7QUFBRU4sY0FBQUEsRUFBRSxFQUFFO0FBQU4sYUFBekIsQ0FGNkM7QUFHNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQVEsWUFBQUEsUUFBUSxFQUFFakQsS0FBSyxDQUFDMkMsSUFBTixDQUFXSSxhQUFYLENBQXlCO0FBQUVOLGNBQUFBLEVBQUUsRUFBRTtBQUFOLGFBQXpCLEVBQWlFO0FBQUVTLGNBQUFBLENBQUMsRUFBRTtBQUFMLGFBQWpFO0FBUGtELFdBQTlEOztBQVVBLGNBQUlsRCxLQUFLLENBQUN1QyxVQUFOLElBQW9CLENBQUNyQyxNQUFNLENBQUNhLFFBQWhDLEVBQTBDO0FBQ3hDYixZQUFBQSxNQUFNLENBQUNhLFFBQVAsR0FBa0IsVUFBQVYsUUFBUTtBQUFBLHFCQUFJcEMsVUFBVSxDQUFDOEMsUUFBWCxPQUFBOUMsVUFBVSxHQUN0Q08sR0FEc0MsRUFFdEMwQixNQUZzQyxFQUd0Q0csUUFIc0MsRUFJdENtQixRQUpzQyxFQUt0Q3hCLEtBQUssQ0FBQ3dDLElBQU4sQ0FBV0MsRUFMMkIsRUFNdEM1QixhQU5zQyxFQU90QytCLGtCQVBzQyxFQVF0Q2pCLGVBUnNDLFNBU25DRSxhQVRtQyxHQVV0Q0gsZ0JBVnNDLEdBQWQ7QUFBQSxhQUExQjtBQVlEOztBQUNELGNBQUkxQixLQUFLLENBQUN1QyxVQUFOLElBQW9CLENBQUNyQyxNQUFNLENBQUNpQixVQUFoQyxFQUE0QztBQUMxQ2pCLFlBQUFBLE1BQU0sQ0FBQ2lCLFVBQVAsR0FBb0IsVUFBQWQsUUFBUTtBQUFBLHFCQUFJcEMsVUFBVSxDQUFDa0QsVUFBWCxPQUFBbEQsVUFBVSxHQUN4Q08sR0FEd0MsRUFFeEMwQixNQUZ3QyxFQUd4Q0csUUFId0MsRUFJeENtQixRQUp3QyxFQUt4Q3hCLEtBQUssQ0FBQ3dDLElBQU4sQ0FBV0MsRUFMNkIsRUFNeEM1QixhQU53QyxFQU94QytCLGtCQVB3QyxFQVF4Q2pCLGVBUndDLFNBU3JDSSxlQVRxQyxHQVV4Q0wsZ0JBVndDLEdBQWQ7QUFBQSxhQUE1QjtBQVlEOztBQUNELGNBQUkxQixLQUFLLENBQUMwQyxTQUFOLElBQW1CLENBQUN4QyxNQUFNLENBQUNtQixVQUEvQixFQUEyQztBQUN6Q25CLFlBQUFBLE1BQU0sQ0FBQ21CLFVBQVAsR0FBb0I7QUFBQSxxQkFBTS9DLGVBQWUsQ0FBQytDLFVBQWhCLE9BQUEvQyxlQUFlLEdBQ3ZDRSxHQUR1QyxFQUV2QzBCLE1BRnVDLEVBR3ZDc0IsUUFIdUMsRUFJdkN4QixLQUFLLENBQUN3QyxJQUFOLENBQVdDLEVBSjRCLEVBS3ZDNUIsYUFMdUMsRUFNdkMrQixrQkFOdUMsRUFPdkNqQixlQVB1QyxTQVFwQ00sZUFSb0MsRUFBckI7QUFBQSxhQUFwQjtBQVVEOztBQUNEO0FBQ0Q7O0FBRUQsV0FBSyxRQUFMO0FBQWU7QUFDYixjQUFNcEIsY0FBYSxHQUFHckMsR0FBRyxDQUFDZ0Msc0JBQUosSUFDakJBLHNCQUFzQixDQUFDRCxHQUF2QixDQUEyQkwsTUFBTSxDQUFDdkIsU0FBbEMsQ0FETDs7QUFFQSxjQUFNaUUsbUJBQWtCLEdBQUdwRSxHQUFHLENBQUNxRSwyQkFBSixJQUFtQztBQUM1REMsWUFBQUEsV0FBVyxFQUFFOUMsS0FBSyxDQUFDMkMsSUFBTixDQUFXSSxhQUFYLENBQXlCO0FBQUVOLGNBQUFBLEVBQUUsRUFBRTtBQUFOLGFBQXpCLENBRCtDO0FBRTVETyxZQUFBQSxhQUFhLEVBQUVoRCxLQUFLLENBQUMyQyxJQUFOLENBQVdJLGFBQVgsQ0FBeUI7QUFBRU4sY0FBQUEsRUFBRSxFQUFFO0FBQU4sYUFBekI7QUFGNkMsV0FBOUQ7O0FBS0EsY0FBSXpDLEtBQUssQ0FBQ3VDLFVBQU4sSUFBb0IsQ0FBQ3JDLE1BQU0sQ0FBQ2EsUUFBaEMsRUFBMEM7QUFDeENiLFlBQUFBLE1BQU0sQ0FBQ2EsUUFBUCxHQUFrQixVQUFBVixRQUFRO0FBQUEscUJBQUlwQyxVQUFVLENBQUM4QyxRQUFYLE9BQUE5QyxVQUFVLEdBQ3RDTyxHQURzQyxFQUV0QzBCLE1BRnNDLEVBR3RDRyxRQUhzQyxFQUl0Q21CLFFBSnNDLEVBS3RDeEIsS0FBSyxDQUFDd0MsSUFBTixDQUFXQyxFQUwyQixFQU10QzVCLGNBTnNDLEVBT3RDK0IsbUJBUHNDLEVBUXRDakIsZUFSc0MsU0FTbkNFLGFBVG1DLEdBVXRDSCxnQkFWc0MsR0FBZDtBQUFBLGFBQTFCO0FBWUQ7O0FBQ0QsY0FBSTFCLEtBQUssQ0FBQ3VDLFVBQU4sSUFBb0IsQ0FBQ3JDLE1BQU0sQ0FBQ2lCLFVBQWhDLEVBQTRDO0FBQzFDakIsWUFBQUEsTUFBTSxDQUFDaUIsVUFBUCxHQUFvQixVQUFBZCxRQUFRO0FBQUEscUJBQUlwQyxVQUFVLENBQUNrRCxVQUFYLE9BQUFsRCxVQUFVLEdBQ3hDTyxHQUR3QyxFQUV4QzBCLE1BRndDLEVBR3hDRyxRQUh3QyxFQUl4Q21CLFFBSndDLEVBS3hDeEIsS0FBSyxDQUFDd0MsSUFBTixDQUFXQyxFQUw2QixFQU14QzVCLGNBTndDLEVBT3hDK0IsbUJBUHdDLEVBUXhDakIsZUFSd0MsU0FTckNJLGVBVHFDLEdBVXhDTCxnQkFWd0MsR0FBZDtBQUFBLGFBQTVCO0FBWUQ7O0FBQ0QsY0FBSTFCLEtBQUssQ0FBQzBDLFNBQU4sSUFBbUIsQ0FBQ3hDLE1BQU0sQ0FBQ21CLFVBQS9CLEVBQTJDO0FBQ3pDbkIsWUFBQUEsTUFBTSxDQUFDbUIsVUFBUCxHQUFvQjtBQUFBLHFCQUFNcEQsVUFBVSxDQUFDb0QsVUFBWCxPQUFBcEQsVUFBVSxHQUNsQ08sR0FEa0MsRUFFbEMwQixNQUZrQyxFQUdsQ3NCLFFBSGtDLEVBSWxDeEIsS0FBSyxDQUFDd0MsSUFBTixDQUFXQyxFQUp1QixFQUtsQzVCLGNBTGtDLEVBTWxDK0IsbUJBTmtDLEVBT2xDakIsZUFQa0MsU0FRL0JNLGVBUitCLEVBQWhCO0FBQUEsYUFBcEI7QUFVRDs7QUFDRDtBQUNEOztBQUVELFdBQUssU0FBTDtBQUFnQjtBQUNkLGNBQU1wQixlQUFhLEdBQUcsQ0FDcEI7QUFBRXNDLFlBQUFBLEtBQUssRUFBRSxJQUFUO0FBQWVDLFlBQUFBLEtBQUssRUFBRXBELEtBQUssQ0FBQzJDLElBQU4sQ0FBV0ksYUFBWCxDQUF5QjtBQUFFTixjQUFBQSxFQUFFLEVBQUU7QUFBTixhQUF6QjtBQUF0QixXQURvQixFQUVwQjtBQUFFVSxZQUFBQSxLQUFLLEVBQUUsS0FBVDtBQUFnQkMsWUFBQUEsS0FBSyxFQUFFcEQsS0FBSyxDQUFDMkMsSUFBTixDQUFXSSxhQUFYLENBQXlCO0FBQUVOLGNBQUFBLEVBQUUsRUFBRTtBQUFOLGFBQXpCO0FBQXZCLFdBRm9CLENBQXRCOztBQUlBLGNBQU1HLG9CQUFrQixHQUFHcEUsR0FBRyxDQUFDcUUsMkJBQUosSUFBbUM7QUFDNURDLFlBQUFBLFdBQVcsRUFBRTlDLEtBQUssQ0FBQzJDLElBQU4sQ0FBV0ksYUFBWCxDQUF5QjtBQUFFTixjQUFBQSxFQUFFLEVBQUU7QUFBTixhQUF6QixDQUQrQztBQUU1RE8sWUFBQUEsYUFBYSxFQUFFaEQsS0FBSyxDQUFDMkMsSUFBTixDQUFXSSxhQUFYLENBQXlCO0FBQUVOLGNBQUFBLEVBQUUsRUFBRTtBQUFOLGFBQXpCO0FBRjZDLFdBQTlEOztBQUtBLGNBQUl6QyxLQUFLLENBQUN1QyxVQUFOLElBQW9CLENBQUNyQyxNQUFNLENBQUNhLFFBQWhDLEVBQTBDO0FBQ3hDYixZQUFBQSxNQUFNLENBQUNhLFFBQVAsR0FBa0IsVUFBQVYsUUFBUTtBQUFBLHFCQUFJbkMsV0FBVyxDQUFDNkMsUUFBWixPQUFBN0MsV0FBVyxHQUN2Q00sR0FEdUMsRUFFdkMwQixNQUZ1QyxFQUd2Q0csUUFIdUMsRUFJdkNtQixRQUp1QyxFQUt2Q3hCLEtBQUssQ0FBQ3dDLElBQU4sQ0FBV0MsRUFMNEIsRUFNdkM1QixlQU51QyxFQU92QytCLG9CQVB1QyxFQVF2Q2pCLGVBUnVDLFNBU3BDRSxhQVRvQyxHQVV2Q0gsZ0JBVnVDLEdBQWY7QUFBQSxhQUExQjtBQVlEOztBQUNELGNBQUkxQixLQUFLLENBQUN1QyxVQUFOLElBQW9CLENBQUNyQyxNQUFNLENBQUNpQixVQUFoQyxFQUE0QztBQUMxQ2pCLFlBQUFBLE1BQU0sQ0FBQ2lCLFVBQVAsR0FBb0IsVUFBQWQsUUFBUTtBQUFBLHFCQUFJbkMsV0FBVyxDQUFDaUQsVUFBWixPQUFBakQsV0FBVyxHQUN6Q00sR0FEeUMsRUFFekMwQixNQUZ5QyxFQUd6Q0csUUFIeUMsRUFJekNtQixRQUp5QyxFQUt6Q3hCLEtBQUssQ0FBQ3dDLElBQU4sQ0FBV0MsRUFMOEIsRUFNekM1QixlQU55QyxFQU96QytCLG9CQVB5QyxFQVF6Q2pCLGVBUnlDLFNBU3RDSSxlQVRzQyxHQVV6Q0wsZ0JBVnlDLEdBQWY7QUFBQSxhQUE1QjtBQVlEOztBQUNELGNBQUkxQixLQUFLLENBQUMwQyxTQUFOLElBQW1CLENBQUN4QyxNQUFNLENBQUNtQixVQUEvQixFQUEyQztBQUN6Q25CLFlBQUFBLE1BQU0sQ0FBQ21CLFVBQVAsR0FBb0I7QUFBQSxxQkFBTW5ELFdBQVcsQ0FBQ21ELFVBQVosT0FBQW5ELFdBQVcsR0FDbkNNLEdBRG1DLEVBRW5DMEIsTUFGbUMsRUFHbkNzQixRQUhtQyxFQUluQ3hCLEtBQUssQ0FBQ3dDLElBQU4sQ0FBV0MsRUFKd0IsRUFLbkM1QixlQUxtQyxFQU1uQytCLG9CQU5tQyxFQU9uQ2pCLGVBUG1DLFNBUWhDTSxlQVJnQyxFQUFqQjtBQUFBLGFBQXBCO0FBVUQ7O0FBQ0Q7QUFDRDs7QUFFRCxXQUFLLE1BQUw7QUFBYTtBQUNYLGNBQUlqQyxLQUFLLENBQUN1QyxVQUFOLElBQW9CLENBQUNyQyxNQUFNLENBQUNhLFFBQWhDLEVBQTBDO0FBQ3hDYixZQUFBQSxNQUFNLENBQUNhLFFBQVAsR0FBa0IsVUFBQVYsUUFBUTtBQUFBLHFCQUFJckMsUUFBUSxDQUFDK0MsUUFBVCxPQUFBL0MsUUFBUSxHQUNwQ1EsR0FEb0MsRUFFcEMwQixNQUZvQyxFQUdwQ0csUUFIb0MsRUFJcENtQixRQUpvQyxFQUtwQ3hCLEtBQUssQ0FBQ3dDLElBQU4sQ0FBV0MsRUFMeUIsRUFNcEN6QyxLQUFLLENBQUNxRCxNQU44QixFQU9wQ3JELEtBQUssQ0FBQ2MsVUFQOEIsRUFRcENhLGVBUm9DLFNBU2pDRSxhQVRpQyxHQVVwQ0gsZ0JBVm9DLEdBQVo7QUFBQSxhQUExQjtBQVlEOztBQUNELGNBQUkxQixLQUFLLENBQUN1QyxVQUFOLElBQW9CLENBQUNyQyxNQUFNLENBQUNpQixVQUFoQyxFQUE0QztBQUMxQ2pCLFlBQUFBLE1BQU0sQ0FBQ2lCLFVBQVAsR0FBb0IsVUFBQWQsUUFBUTtBQUFBLHFCQUFJckMsUUFBUSxDQUFDbUQsVUFBVCxPQUFBbkQsUUFBUSxHQUN0Q1EsR0FEc0MsRUFFdEMwQixNQUZzQyxFQUd0Q0csUUFIc0MsRUFJdENtQixRQUpzQyxFQUt0Q3hCLEtBQUssQ0FBQ3dDLElBQU4sQ0FBV0MsRUFMMkIsRUFNdEN6QyxLQUFLLENBQUNxRCxNQU5nQyxFQU90Q3JELEtBQUssQ0FBQ2MsVUFQZ0MsRUFRdENhLGVBUnNDLFNBU25DSSxlQVRtQyxHQVV0Q0wsZ0JBVnNDLEdBQVo7QUFBQSxhQUE1QjtBQVlEOztBQUNELGNBQUkxQixLQUFLLENBQUMwQyxTQUFOLElBQW1CLENBQUN4QyxNQUFNLENBQUNtQixVQUEvQixFQUEyQztBQUN6Q25CLFlBQUFBLE1BQU0sQ0FBQ21CLFVBQVAsR0FBb0I7QUFBQSxxQkFBTXJELFFBQVEsQ0FBQ3FELFVBQVQsT0FBQXJELFFBQVEsR0FDaENRLEdBRGdDLEVBRWhDMEIsTUFGZ0MsRUFHaENzQixRQUhnQyxFQUloQ3hCLEtBQUssQ0FBQ3dDLElBQU4sQ0FBV0MsRUFKcUIsRUFLaEN6QyxLQUFLLENBQUNxRCxNQUwwQixFQU1oQ3JELEtBQUssQ0FBQ2MsVUFOMEIsRUFPaENhLGVBUGdDLFNBUTdCTSxlQVI2QixFQUFkO0FBQUEsYUFBcEI7QUFVRDs7QUFDRDtBQUNEOztBQUNELFdBQUssVUFBTDtBQUFpQjtBQUNmLGNBQUlqQyxLQUFLLENBQUN1QyxVQUFOLElBQW9CLENBQUNyQyxNQUFNLENBQUNpQixVQUFoQyxFQUE0QztBQUMxQ2pCLFlBQUFBLE1BQU0sQ0FBQ2EsUUFBUCxHQUFrQixVQUFBVixRQUFRO0FBQUEscUJBQUlqQyxZQUFZLENBQUMyQyxRQUFiLE9BQUEzQyxZQUFZLEdBQ3hDSSxHQUR3QyxFQUV4QzBCLE1BRndDLEVBR3hDc0IsUUFId0MsRUFJeENuQixRQUp3QyxFQUt4Q0wsS0FBSyxDQUFDd0MsSUFBTixDQUFXQyxFQUw2QixTQU1yQ1osYUFOcUMsR0FPeENGLGVBUHdDLEVBUXhDRCxnQkFSd0MsRUFTeEMxQixLQUFLLENBQUNNLElBVGtDLEVBVXhDTixLQUFLLENBQUNVLGlCQVZrQyxFQVd4Q1YsS0FBSyxDQUFDVyxnQkFYa0MsR0FBaEI7QUFBQSxhQUExQjtBQWFEOztBQUNELGNBQUlYLEtBQUssQ0FBQ3VDLFVBQU4sSUFBb0IsQ0FBQ3JDLE1BQU0sQ0FBQ2lCLFVBQWhDLEVBQTRDO0FBQzFDakIsWUFBQUEsTUFBTSxDQUFDaUIsVUFBUCxHQUFvQixVQUFBZCxRQUFRO0FBQUEscUJBQUlqQyxZQUFZLENBQUMrQyxVQUFiLE9BQUEvQyxZQUFZLEdBQzFDSSxHQUQwQyxFQUUxQzBCLE1BRjBDLEVBRzFDc0IsUUFIMEMsRUFJMUNuQixRQUowQyxFQUsxQ0wsS0FBSyxDQUFDd0MsSUFBTixDQUFXQyxFQUwrQixTQU12Q1YsZUFOdUMsR0FPMUNKLGVBUDBDLEVBUTFDRCxnQkFSMEMsRUFTMUMxQixLQUFLLENBQUNNLElBVG9DLEVBVTFDTixLQUFLLENBQUNVLGlCQVZvQyxFQVcxQ1YsS0FBSyxDQUFDVyxnQkFYb0MsR0FBaEI7QUFBQSxhQUE1QjtBQWFEOztBQUNELGNBQUlYLEtBQUssQ0FBQzBDLFNBQU4sSUFBbUIsQ0FBQ3hDLE1BQU0sQ0FBQ21CLFVBQS9CLEVBQTJDO0FBQ3pDbkIsWUFBQUEsTUFBTSxDQUFDbUIsVUFBUCxHQUFvQjtBQUFBLHFCQUFNaEQsYUFBYSxDQUFDZ0QsVUFBZCxPQUFBaEQsYUFBYSxHQUNyQ0csR0FEcUMsRUFFckMwQixNQUZxQyxFQUdyQ3NCLFFBSHFDLEVBSXJDeEIsS0FBSyxDQUFDd0MsSUFBTixDQUFXQyxFQUowQixFQUtyQ04sa0JBTHFDLEVBTXJDLE1BTnFDLFNBT2xDRixlQVBrQyxFQUFuQjtBQUFBLGFBQXBCO0FBU0Q7O0FBQ0Q7QUFDRDs7QUFDRDtBQTVVRjs7QUE4VUEsV0FBTy9CLE1BQVA7QUFDRDtBQTdkWSxDQUFmIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWFwIH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCBVdGlscyBmcm9tICcuLi9kYXRhZ3JpZC51dGlscyc7XG5pbXBvcnQge1xuICBEYXRlVHlwZSxcbiAgU2VsZWN0VHlwZSxcbiAgQm9vbGVhblR5cGUsXG4gIENoZWNrYm94VHlwZSxcbiAgQ3VycmVuY3lUeXBlLFxuICBQcmltaXRpdmVUeXBlLFxuICBNdWx0aVNlbGVjdFR5cGUsXG59IGZyb20gJy4vY29sdW1uLXR5cGVzL2NvbHVtbi10eXBlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYmFzZUNvbHVtbihjb2wpIHtcbiAgICBjb25zdCBiYXNlQ29sID0ge1xuICAgICAgaGVhZGVyOiBjb2wuaGVhZGVyLFxuICAgICAgY29sdW1uS2V5OiBVdGlscy5nZXRDb2x1bW5LZXkoY29sKSxcbiAgICAgIHdpZHRoOiBjb2wud2lkdGggfHwgY29sLndpZHRoID09PSAwID8gY29sLndpZHRoIDogMjAwLFxuICAgICAgbWluV2lkdGg6IGNvbC5taW5XaWR0aCB8fCBjb2wubWluV2lkdGggPT09IDAgPyBjb2wubWluV2lkdGggOiA0MCxcbiAgICAgIG1heFdpZHRoOiBjb2wubWF4V2lkdGgsXG4gICAgICBpc1Jlc2l6YWJsZTogIWNvbC5kaXNhYmxlUmVzaXppbmcsXG4gICAgICBmaXhlZDogISFjb2wuZml4ZWQsXG4gICAgICBmaXhlZFJpZ2h0OiAhIWNvbC5maXhlZFJpZ2h0LFxuICAgICAgYWxsb3dDZWxsc1JlY3ljbGluZzogISFjb2wuYWxsb3dDZWxsc1JlY3ljbGluZyxcbiAgICAgIGRpc2FibGVTb3J0aW5nOiAhIWNvbC5kaXNhYmxlU29ydGluZyxcbiAgICAgIGlzUmVxdWlyZWQ6ICEhY29sLmlzUmVxdWlyZWQsXG4gICAgICBjb21wb25lbnRUeXBlOiBjb2wuY29tcG9uZW50VHlwZSxcbiAgICAgIHN0eWxlOiBVdGlscy5nZXRDZWxsU3R5bGVCeUNvbChjb2wpLFxuICAgIH07XG4gICAgLy8gdmFsdWVLZXlQYXRoXG4gICAgaWYgKGNvbC52YWx1ZUtleVBhdGgpIGJhc2VDb2wudmFsdWVLZXlQYXRoID0gY29sLnZhbHVlS2V5UGF0aDtcbiAgICAvLyBmbGV4R3Jvd1xuICAgIGlmIChjb2wuZmxleEdyb3cpIGJhc2VDb2wuZmxleEdyb3cgPSBjb2wuZmxleEdyb3c7XG4gICAgLy8gdmFsdWVUeXBlXG4gICAgaWYgKGNvbC52YWx1ZVR5cGUpIGJhc2VDb2wudmFsdWVUeXBlID0gY29sLnZhbHVlVHlwZTtcbiAgICAvLyBzb3J0Q29tcGFyYXRvclxuICAgIGlmIChjb2wuc29ydENvbXBhcmF0b3IpIGJhc2VDb2wuc29ydENvbXBhcmF0b3IgPSBjb2wuc29ydENvbXBhcmF0b3I7XG4gICAgLy8gc29ydFZhbHVlR2V0dGVyXG4gICAgaWYgKGNvbC5zb3J0VmFsdWVHZXR0ZXIpIGJhc2VDb2wuc29ydFZhbHVlR2V0dGVyID0gY29sLnNvcnRWYWx1ZUdldHRlcjtcbiAgICByZXR1cm4gYmFzZUNvbDtcbiAgfSxcblxuICBjb2x1bW5DZWxsKGJhc2VDb2x1bW4sIHByb3BzLCBjb2wsIGJhc2VWYWx1ZVJlbmRlcikge1xuICAgIGNvbnN0IGNvbHVtbiA9IGJhc2VDb2x1bW47XG4gICAgaWYgKGNvbC5jZWxsKSB7XG4gICAgICBjb2x1bW4uY2VsbCA9IGNvbC5jZWxsO1xuICAgIH0gZWxzZSBpZiAoY29sLnZhbHVlUmVuZGVyKSB7XG4gICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IGNvbC52YWx1ZVJlbmRlcihwcm9wcy5kYXRhLmdldChyb3dJbmRleCksIHJvd0luZGV4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgeyBzZWxlY3RDb21wb25lbnRPcHRpb25zID0gTWFwKCkgfSA9IHByb3BzO1xuICAgICAgc3dpdGNoIChjb2wuY29tcG9uZW50VHlwZSkge1xuICAgICAgICBjYXNlICdudW1iZXInOiAvLyBmYWxsIHRocm91Z2hcbiAgICAgICAgY2FzZSAnZmxvYXQnOiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBQcmltaXRpdmVUeXBlLm51bWJlclZhbFJlbmRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgcHJvcHMudGhvdXNhbmRTZXBhcmF0b3IsXG4gICAgICAgICAgICBwcm9wcy5kZWNpbWFsU2VwYXJhdG9yLFxuICAgICAgICAgICAgYmFzZVZhbHVlUmVuZGVyLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlICdib29sZWFuJzoge1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gQm9vbGVhblR5cGUudmFsUmVuZGVyKGNvbCwgcm93SW5kZXgsIGJhc2VWYWx1ZVJlbmRlcik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlICdjaGVja2JveCc6IHtcbiAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IENoZWNrYm94VHlwZS52YWxSZW5kZXIocm93SW5kZXgsIGJhc2VWYWx1ZVJlbmRlcik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlICdtdWx0aXNlbGVjdCc6XG4gICAgICAgIGNhc2UgJ3NlbGVjdCc6IHtcbiAgICAgICAgICBjb25zdCBzZWxlY3RPcHRpb25zID0gY29sLnNlbGVjdENvbXBvbmVudE9wdGlvbnNcbiAgICAgICAgICAgIHx8IHNlbGVjdENvbXBvbmVudE9wdGlvbnMuZ2V0KGNvbHVtbi5jb2x1bW5LZXkpO1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gU2VsZWN0VHlwZS52YWxSZW5kZXIoXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBiYXNlVmFsdWVSZW5kZXIsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgJ2RhdGUnOiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBEYXRlVHlwZS52YWxSZW5kZXIocm93SW5kZXgsIHByb3BzLmRhdGVGb3JtYXQsIGJhc2VWYWx1ZVJlbmRlcik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY2hhbmdlIHZhbFJlbmRlcnMgdG8ganVzdCB0YWtlIHByb3BzIC0tPiBzYXZlcyBzb21lICdlbmVyZ3knXG4gICAgICAgIGNhc2UgJ2N1cnJlbmN5Jzoge1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gQ3VycmVuY3lUeXBlLnZhbFJlbmRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIHByb3BzLmRhdGEsXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHByb3BzLnRob3VzYW5kU2VwYXJhdG9yLFxuICAgICAgICAgICAgcHJvcHMuZGVjaW1hbFNlcGFyYXRvcixcbiAgICAgICAgICAgIGJhc2VWYWx1ZVJlbmRlcixcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gYmFzZVZhbHVlUmVuZGVyKHJvd0luZGV4KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBjZWxsRWRpdCByZW5kZXJcbiAgICBpZiAoY29sLmNlbGxFZGl0KSB7XG4gICAgICBjb2x1bW4uY2VsbEVkaXQgPSBjb2wuY2VsbEVkaXQ7XG4gICAgfSBlbHNlIGlmIChjb2wuZWRpdFZhbHVlUmVuZGVyKSB7XG4gICAgICBjb2x1bW4uY2VsbEVkaXQgPSAocm93SW5kZXgsIHNldFJlZiwgb25LZXlEb3duKSA9PiBjb2wuZWRpdFZhbHVlUmVuZGVyKFxuICAgICAgICBwcm9wcy5kYXRhLmdldChyb3dJbmRleCksXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICBzZXRSZWYsXG4gICAgICAgIG9uS2V5RG93bixcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gY2VsbENyZWF0ZSByZW5kZXJcbiAgICBpZiAoY29sLmNlbGxDcmVhdGUpIHtcbiAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gY29sLmNlbGxDcmVhdGU7XG4gICAgfSBlbHNlIGlmIChjb2wuY3JlYXRlVmFsdWVSZW5kZXIpIHtcbiAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gKHJvd0luZGV4LCBzZXRSZWYsIG9uS2V5RG93bikgPT4gY29sLmNyZWF0ZVZhbHVlUmVuZGVyKFxuICAgICAgICBwcm9wcy5kYXRhLmdldChyb3dJbmRleCksXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICBzZXRSZWYsXG4gICAgICAgIG9uS2V5RG93bixcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gY2VsbEZpbHRlciByZW5kZXJcbiAgICBpZiAoY29sLmNlbGxGaWx0ZXIpIHtcbiAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gY29sLmNlbGxGaWx0ZXI7XG4gICAgfSBlbHNlIGlmIChjb2wuZmlsdGVyVmFsdWVSZW5kZXIpIHtcbiAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gcm93SW5kZXggPT4gY29sLmZpbHRlclZhbHVlUmVuZGVyKHByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSwgcm93SW5kZXgpO1xuICAgIH1cbiAgICByZXR1cm4gY29sdW1uO1xuICB9LFxuXG4gIGNvbHVtbkNvbXBvbmVudFR5cGUoYmFzZUNvbHVtbiwgdGFiSW5kZXgsIHByb3BzLCBjb2wsIGZ1bmN0aW9ucywgZ2V0RGlzYWJsZWRTdGF0ZSkge1xuICAgIGlmICghY29sLmNvbXBvbmVudFR5cGUpIHJldHVybiBiYXNlQ29sdW1uO1xuICAgIGNvbnN0IGNvbHVtbiA9IGJhc2VDb2x1bW47XG4gICAgY29uc3QgZWRpdFZhbHVlUGFyc2VyID0gY29sLmVkaXRWYWx1ZVBhcnNlciA/IGNvbC5lZGl0VmFsdWVQYXJzZXIgOiB2YWwgPT4gdmFsO1xuICAgIC8vIEdyaWQgaW50ZXJuYWwgZnVuY3Rpb25zIHNlcGFyYXRlZFxuICAgIGNvbnN0IGVkaXRGdW5jdGlvbnMgPSB7IC4uLmZ1bmN0aW9ucy5lZGl0IH07XG4gICAgY29uc3QgY3JlYXRlRnVuY3Rpb25zID0geyAuLi5mdW5jdGlvbnMuY3JlYXRlIH07XG4gICAgY29uc3QgZmlsdGVyRnVuY3Rpb25zID0geyAuLi5mdW5jdGlvbnMuZmlsdGVyIH07XG4gICAgY29uc3QgeyBzZWxlY3RDb21wb25lbnRPcHRpb25zID0gTWFwKCkgfSA9IHByb3BzO1xuICAgIGNvbnN0IHByaW1pdGl2ZVZhbFBhcnNlciA9ICFjb2wuZWRpdFZhbHVlUGFyc2VyICYmIGNvbC5jb21wb25lbnRUeXBlID09PSAnZmxvYXQnXG4gICAgICA/IHZhbCA9PiB2YWwucmVwbGFjZShuZXcgUmVnRXhwKGBbXlxcXFxkJHtwcm9wcy5kZWNpbWFsU2VwYXJhdG9yfSstXWAsICdnJyksICcnKVxuICAgICAgOiBlZGl0VmFsdWVQYXJzZXI7XG5cbiAgICBzd2l0Y2ggKGNvbC5jb21wb25lbnRUeXBlKSB7XG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAndGV4dCc6IHtcbiAgICAgICAgY29uc3QgZm9ybUNvbnRyb2xUeXBlID0gY29sLmNvbXBvbmVudFR5cGUgPT09ICdmbG9hdCcgfHwgY29sLmNvbXBvbmVudFR5cGUgPT09ICdudW1iZXInXG4gICAgICAgICAgPyAndGV4dCdcbiAgICAgICAgICA6IGNvbC5jb21wb25lbnRUeXBlO1xuICAgICAgICAvLyBhbHdheXMgdXNlIGNvbC5lZGl0VmFsdWVQYXJzZXIgb3ZlcnJpZGUgaWYgYXZhaWxhYmxlXG5cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IFByaW1pdGl2ZVR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByaW1pdGl2ZVZhbFBhcnNlcixcbiAgICAgICAgICAgIGZvcm1Db250cm9sVHlwZSxcbiAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IFByaW1pdGl2ZVR5cGUuY2VsbENyZWF0ZShcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgcHJpbWl0aXZlVmFsUGFyc2VyLFxuICAgICAgICAgICAgZm9ybUNvbnRyb2xUeXBlLFxuICAgICAgICAgICAgLi4uY3JlYXRlRnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IFByaW1pdGl2ZVR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByaW1pdGl2ZVZhbFBhcnNlcixcbiAgICAgICAgICAgIGZvcm1Db250cm9sVHlwZSxcbiAgICAgICAgICAgIC4uLmZpbHRlckZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlICdjaGVja2JveCc6IHtcbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IENoZWNrYm94VHlwZS5jZWxsRWRpdChcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgLi4uZWRpdEZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gQ2hlY2tib3hUeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIC4uLmNyZWF0ZUZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5maWx0ZXJpbmcgJiYgIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiBDaGVja2JveFR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByb3BzLmludGwsXG4gICAgICAgICAgICAuLi5maWx0ZXJGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSAnbXVsdGlzZWxlY3QnOiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50T3B0aW9uc1xuICAgICAgICAgIHx8IHNlbGVjdENvbXBvbmVudE9wdGlvbnMuZ2V0KGNvbHVtbi5jb2x1bW5LZXkpO1xuICAgICAgICBjb25zdCBzZWxlY3RUcmFuc2xhdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50VHJhbnNsYXRpb25zIHx8IHtcbiAgICAgICAgICBwbGFjZWhvbGRlcjogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0LlNlbGVjdCcgfSksXG4gICAgICAgICAgbm9SZXN1bHRzVGV4dDogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0Lk5vUmVzdWx0cycgfSksXG4gICAgICAgICAgLy8gVmFyaWFibGUgJ24nIG11c3QgYmUgcHJvdmlkZWQgaW4gdGhpcyBwaGFzZSBpbiBvcmRlciB0byBhdm9pZFxuICAgICAgICAgIC8vIEVycm9yOiBUaGUgaW50bCBzdHJpbmcgY29udGV4dCB2YXJpYWJsZSAnbicgd2FzIG5vdCBwcm92aWRlZCB0byB0aGUgc3RyaW5nIHtufVxuICAgICAgICAgIC8vIHNlbGVjdGVkXG4gICAgICAgICAgLy8gVmFyaWFibGUgbiBpcyByZXBsYWNlZCBsYXRlciwgd2hlbiBpdHMgdmFsdWUgaXMgYXZhaWxhYmxlXG4gICAgICAgICAgc2VsZWN0ZWQ6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5TZWxlY3RlZCcgfSwgeyBuOiAnPG4+JyB9KSxcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gU2VsZWN0VHlwZS5jZWxsRWRpdChcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiBTZWxlY3RUeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5jcmVhdGVGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IE11bHRpU2VsZWN0VHlwZS5jZWxsRmlsdGVyKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmZpbHRlckZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlICdzZWxlY3QnOiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50T3B0aW9uc1xuICAgICAgICAgIHx8IHNlbGVjdENvbXBvbmVudE9wdGlvbnMuZ2V0KGNvbHVtbi5jb2x1bW5LZXkpO1xuICAgICAgICBjb25zdCBzZWxlY3RUcmFuc2xhdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50VHJhbnNsYXRpb25zIHx8IHtcbiAgICAgICAgICBwbGFjZWhvbGRlcjogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0LlNlbGVjdCcgfSksXG4gICAgICAgICAgbm9SZXN1bHRzVGV4dDogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0Lk5vUmVzdWx0cycgfSksXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IFNlbGVjdFR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gU2VsZWN0VHlwZS5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uY3JlYXRlRnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5maWx0ZXJpbmcgJiYgIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiBTZWxlY3RUeXBlLmNlbGxGaWx0ZXIoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uZmlsdGVyRnVuY3Rpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBbXG4gICAgICAgICAgeyB2YWx1ZTogdHJ1ZSwgbGFiZWw6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5ZZXMnIH0pIH0sXG4gICAgICAgICAgeyB2YWx1ZTogZmFsc2UsIGxhYmVsOiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuTm8nIH0pIH0sXG4gICAgICAgIF07XG4gICAgICAgIGNvbnN0IHNlbGVjdFRyYW5zbGF0aW9ucyA9IGNvbC5zZWxlY3RDb21wb25lbnRUcmFuc2xhdGlvbnMgfHwge1xuICAgICAgICAgIHBsYWNlaG9sZGVyOiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuU2VsZWN0JyB9KSxcbiAgICAgICAgICBub1Jlc3VsdHNUZXh0OiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuTm9SZXN1bHRzJyB9KSxcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gQm9vbGVhblR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gQm9vbGVhblR5cGUuY2VsbENyZWF0ZShcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmNyZWF0ZUZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuZmlsdGVyaW5nICYmICFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT4gQm9vbGVhblR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5maWx0ZXJGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSAnZGF0ZSc6IHtcbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IERhdGVUeXBlLmNlbGxFZGl0KFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBwcm9wcy5yZWdpb24sXG4gICAgICAgICAgICBwcm9wcy5kYXRlRm9ybWF0LFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uZWRpdEZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IERhdGVUeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByb3BzLnJlZ2lvbixcbiAgICAgICAgICAgIHByb3BzLmRhdGVGb3JtYXQsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5jcmVhdGVGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IERhdGVUeXBlLmNlbGxGaWx0ZXIoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBwcm9wcy5yZWdpb24sXG4gICAgICAgICAgICBwcm9wcy5kYXRlRm9ybWF0LFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uZmlsdGVyRnVuY3Rpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdjdXJyZW5jeSc6IHtcbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gQ3VycmVuY3lUeXBlLmNlbGxFZGl0KFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICAgIHByb3BzLmRhdGEsXG4gICAgICAgICAgICBwcm9wcy50aG91c2FuZFNlcGFyYXRvcixcbiAgICAgICAgICAgIHByb3BzLmRlY2ltYWxTZXBhcmF0b3IsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IEN1cnJlbmN5VHlwZS5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICAuLi5jcmVhdGVGdW5jdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICAgcHJvcHMuZGF0YSxcbiAgICAgICAgICAgIHByb3BzLnRob3VzYW5kU2VwYXJhdG9yLFxuICAgICAgICAgICAgcHJvcHMuZGVjaW1hbFNlcGFyYXRvcixcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5maWx0ZXJpbmcgJiYgIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiBQcmltaXRpdmVUeXBlLmNlbGxGaWx0ZXIoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBwcmltaXRpdmVWYWxQYXJzZXIsXG4gICAgICAgICAgICAndGV4dCcsXG4gICAgICAgICAgICAuLi5maWx0ZXJGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgfVxuICAgIHJldHVybiBjb2x1bW47XG4gIH0sXG59O1xuIl19