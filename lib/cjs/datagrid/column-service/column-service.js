"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _immutable = require("immutable");

var _invariant = _interopRequireDefault(require("invariant"));

var _datagrid = _interopRequireDefault(require("../datagrid.utils"));

var _columnTypes = require("./column-types/column-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var _default = {
  baseColumn: function baseColumn(col) {
    var baseCol = {
      header: col.header,
      columnKey: _datagrid["default"].getColumnKey(col),
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
      style: _datagrid["default"].getCellStyleByCol(col),
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
          selectComponentOptions = _props$selectComponen === void 0 ? (0, _immutable.Map)() : _props$selectComponen;

      switch (col.componentType) {
        case 'number': // fall through

        case 'float':
          {
            column.cell = function (rowIndex) {
              return _columnTypes.PrimitiveType.numberValRender(col, rowIndex, props.thousandSeparator, props.decimalSeparator, baseValueRender);
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

        case 'multiselect':
          {
            var selectOptions = col.selectComponentOptions || selectComponentOptions.get(column.columnKey);
            (0, _invariant["default"])(selectOptions, "No selectComponentOptions provided for column '" + column.columnKey + "'");

            column.cell = function (rowIndex) {
              return _columnTypes.MultiSelectType.valRender(col, column, rowIndex, props.grid.id, selectOptions, baseValueRender);
            };

            break;
          }

        case 'select':
          {
            var _selectOptions = col.selectComponentOptions || selectComponentOptions.get(column.columnKey);

            (0, _invariant["default"])(_selectOptions, "No selectComponentOptions provided for column '" + column.columnKey + "'");

            column.cell = function (rowIndex) {
              return _columnTypes.SelectType.valRender(rowIndex, _selectOptions, baseValueRender);
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
    } // cellEdit render


    if (col.cellEdit) {
      column.cellEdit = col.cellEdit;
    } else if (col.editValueRender) {
      column.cellEdit = function (rowIndex, setRef, onKeyDown) {
        return col.editValueRender(props.data.get(rowIndex, (0, _immutable.Map)()), rowIndex, setRef, onKeyDown);
      };
    } // cellCreate render


    if (col.cellCreate) {
      column.cellCreate = col.cellCreate;
    } else if (col.createValueRender) {
      column.cellCreate = function (rowIndex, setRef, onKeyDown) {
        return col.createValueRender(props.data.get(rowIndex, (0, _immutable.Map)()), rowIndex, setRef, onKeyDown);
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
        selectComponentOptions = _props$selectComponen2 === void 0 ? (0, _immutable.Map)() : _props$selectComponen2; // Primitive value parser

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
          var selectOptions = col.selectComponentOptions || selectComponentOptions.get(column.columnKey);
          (0, _invariant["default"])(selectOptions, "No selectComponentOptions provided for column '" + column.columnKey + "'");
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
          var _selectOptions2 = col.selectComponentOptions || selectComponentOptions.get(column.columnKey);

          (0, _invariant["default"])(_selectOptions2, "No selectComponentOptions provided for column '" + column.columnKey + "'");

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
              return _columnTypes.SelectType.cellEdit.apply(_columnTypes.SelectType, [col, column, rowIndex, tabIndex, props.grid.id, _selectOptions2, _selectTranslations, editValueParser].concat(editFunctions, [getDisabledState]));
            };
          }

          if (props.inlineEdit && !column.cellCreate) {
            column.cellCreate = function (rowIndex) {
              return _columnTypes.SelectType.cellCreate.apply(_columnTypes.SelectType, [col, column, rowIndex, tabIndex, props.grid.id, _selectOptions2, _selectTranslations, editValueParser].concat(createFunctions, [getDisabledState]));
            };
          }

          if (props.filtering && !column.cellFilter) {
            column.cellFilter = function () {
              return _columnTypes.SelectType.cellFilter.apply(_columnTypes.SelectType, [col, column, tabIndex, props.grid.id, _selectOptions2, _selectTranslations, editValueParser].concat(filterFunctions));
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
              return _columnTypes.BooleanType.cellEdit.apply(_columnTypes.BooleanType, [col, column, rowIndex, tabIndex, props.grid.id, _selectOptions3, _selectTranslations2, editValueParser].concat(editFunctions, [getDisabledState]));
            };
          }

          if (props.inlineEdit && !column.cellCreate) {
            column.cellCreate = function (rowIndex) {
              return _columnTypes.BooleanType.cellCreate.apply(_columnTypes.BooleanType, [col, column, rowIndex, tabIndex, props.grid.id, _selectOptions3, _selectTranslations2, editValueParser].concat(createFunctions, [getDisabledState]));
            };
          }

          if (props.filtering && !column.cellFilter) {
            column.cellFilter = function () {
              return _columnTypes.BooleanType.cellFilter.apply(_columnTypes.BooleanType, [col, column, tabIndex, props.grid.id, _selectOptions3, _selectTranslations2, editValueParser].concat(filterFunctions));
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

      case 'currency':
        {
          if (props.inlineEdit && !column.cellCreate) {
            column.cellEdit = function (rowIndex) {
              return _columnTypes.CurrencyType.cellEdit.apply(_columnTypes.CurrencyType, [col, column, tabIndex, rowIndex, props.grid.id].concat(editFunctions, [editValueParser, getDisabledState, props.data, props.thousandSeparator, props.decimalSeparator]));
            };
          }

          if (props.inlineEdit && !column.cellCreate) {
            column.cellCreate = function (rowIndex) {
              return _columnTypes.CurrencyType.cellCreate.apply(_columnTypes.CurrencyType, [col, column, tabIndex, rowIndex, props.grid.id].concat(createFunctions, [editValueParser, getDisabledState, props.data, props.thousandSeparator, props.decimalSeparator]));
            };
          }

          if (props.filtering && !column.cellFilter) {
            column.cellFilter = function () {
              return _columnTypes.PrimitiveType.cellFilter.apply(_columnTypes.PrimitiveType, [col, column, tabIndex, props.grid.id, primitiveValParser, 'text'].concat(filterFunctions));
            };
          }

          break;
        }

      default:
    }

    return column;
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2VydmljZS9jb2x1bW4tc2VydmljZS5qc3giXSwibmFtZXMiOlsiYmFzZUNvbHVtbiIsImNvbCIsImJhc2VDb2wiLCJoZWFkZXIiLCJjb2x1bW5LZXkiLCJVdGlscyIsImdldENvbHVtbktleSIsIndpZHRoIiwibWluV2lkdGgiLCJtYXhXaWR0aCIsImlzUmVzaXphYmxlIiwiZGlzYWJsZVJlc2l6aW5nIiwiZml4ZWQiLCJmaXhlZFJpZ2h0IiwiYWxsb3dDZWxsc1JlY3ljbGluZyIsImRpc2FibGVTb3J0aW5nIiwiaXNSZXF1aXJlZCIsImNvbXBvbmVudFR5cGUiLCJzdHlsZSIsImdldENlbGxTdHlsZUJ5Q29sIiwidmlydHVhbGl6ZWQiLCJ2YWx1ZUtleVBhdGgiLCJmbGV4R3JvdyIsInZhbHVlVHlwZSIsInNvcnRDb21wYXJhdG9yIiwic29ydFZhbHVlR2V0dGVyIiwidHJhbnNsYXRpb25zIiwiY29sdW1uQ2VsbCIsInByb3BzIiwiYmFzZVZhbHVlUmVuZGVyIiwiY29sdW1uIiwiY2VsbCIsInZhbHVlUmVuZGVyIiwicm93SW5kZXgiLCJkYXRhIiwiZ2V0Iiwic2VsZWN0Q29tcG9uZW50T3B0aW9ucyIsIlByaW1pdGl2ZVR5cGUiLCJudW1iZXJWYWxSZW5kZXIiLCJ0aG91c2FuZFNlcGFyYXRvciIsImRlY2ltYWxTZXBhcmF0b3IiLCJCb29sZWFuVHlwZSIsInZhbFJlbmRlciIsIkNoZWNrYm94VHlwZSIsInNlbGVjdE9wdGlvbnMiLCJNdWx0aVNlbGVjdFR5cGUiLCJncmlkIiwiaWQiLCJTZWxlY3RUeXBlIiwiRGF0ZVR5cGUiLCJkYXRlRm9ybWF0IiwiQ3VycmVuY3lUeXBlIiwiY2VsbEVkaXQiLCJlZGl0VmFsdWVSZW5kZXIiLCJzZXRSZWYiLCJvbktleURvd24iLCJjZWxsQ3JlYXRlIiwiY3JlYXRlVmFsdWVSZW5kZXIiLCJjZWxsRmlsdGVyIiwiZmlsdGVyVmFsdWVSZW5kZXIiLCJjb2x1bW5Db21wb25lbnRUeXBlIiwidGFiSW5kZXgiLCJmdW5jdGlvbnMiLCJnZXREaXNhYmxlZFN0YXRlIiwiZWRpdFZhbHVlUGFyc2VyIiwidmFsIiwiZWRpdEZ1bmN0aW9ucyIsImVkaXQiLCJjcmVhdGVGdW5jdGlvbnMiLCJjcmVhdGUiLCJmaWx0ZXJGdW5jdGlvbnMiLCJmaWx0ZXIiLCJwcmltaXRpdmVWYWxQYXJzZXIiLCJyZXBsYWNlIiwiUmVnRXhwIiwiZm9ybUNvbnRyb2xUeXBlIiwiaW5saW5lRWRpdCIsImZpbHRlcmluZyIsImludGwiLCJzZWxlY3RUcmFuc2xhdGlvbnMiLCJzZWxlY3RDb21wb25lbnRUcmFuc2xhdGlvbnMiLCJwbGFjZWhvbGRlciIsImZvcm1hdE1lc3NhZ2UiLCJub1Jlc3VsdHNUZXh0Iiwic2VsZWN0ZWQiLCJuIiwidmFsdWUiLCJsYWJlbCIsInJlZ2lvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7O2VBVWU7QUFDYkEsRUFBQUEsVUFEYSxzQkFDRkMsR0FERSxFQUNHO0FBQ2QsUUFBTUMsT0FBTyxHQUFHO0FBQ2RDLE1BQUFBLE1BQU0sRUFBRUYsR0FBRyxDQUFDRSxNQURFO0FBRWRDLE1BQUFBLFNBQVMsRUFBRUMscUJBQU1DLFlBQU4sQ0FBbUJMLEdBQW5CLENBRkc7QUFHZE0sTUFBQUEsS0FBSyxFQUFFTixHQUFHLENBQUNNLEtBQUosSUFBYU4sR0FBRyxDQUFDTSxLQUFKLEtBQWMsQ0FBM0IsR0FBK0JOLEdBQUcsQ0FBQ00sS0FBbkMsR0FBMkMsR0FIcEM7QUFJZEMsTUFBQUEsUUFBUSxFQUFFUCxHQUFHLENBQUNPLFFBQUosSUFBZ0JQLEdBQUcsQ0FBQ08sUUFBSixLQUFpQixDQUFqQyxHQUFxQ1AsR0FBRyxDQUFDTyxRQUF6QyxHQUFvRCxFQUpoRDtBQUtkQyxNQUFBQSxRQUFRLEVBQUVSLEdBQUcsQ0FBQ1EsUUFMQTtBQU1kQyxNQUFBQSxXQUFXLEVBQUUsQ0FBQ1QsR0FBRyxDQUFDVSxlQU5KO0FBT2RDLE1BQUFBLEtB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d0IsRUFFeEI2QixNQUZ3QixFQUd4QitCLFFBSHdCLEVBSXhCakMsS0FBSyxDQUFDa0IsSUFBTixDQUFXQyxFQUphLEVBS3hCeUIsa0JBTHdCLEVBTXhCLE1BTndCLFNBT3JCRixlQVBxQixFQUFOO0FBQUEsYUFBcEI7QUFTRDs7QUFDRDtBQUNEOztBQUNEO0FBcFZGOztBQXNWQSxXQUFPeEMsTUFBUDtBQUNEO0FBcmdCWSxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWFwIH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCBpbnZhcmlhbnQgZnJvbSAnaW52YXJpYW50JztcbmltcG9ydCBVdGlscyBmcm9tICcuLi9kYXRhZ3JpZC51dGlscyc7XG5pbXBvcnQge1xuICBEYXRlVHlwZSxcbiAgU2VsZWN0VHlwZSxcbiAgQm9vbGVhblR5cGUsXG4gIENoZWNrYm94VHlwZSxcbiAgQ3VycmVuY3lUeXBlLFxuICBQcmltaXRpdmVUeXBlLFxuICBNdWx0aVNlbGVjdFR5cGUsXG59IGZyb20gJy4vY29sdW1uLXR5cGVzL2NvbHVtbi10eXBlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYmFzZUNvbHVtbihjb2wpIHtcbiAgICBjb25zdCBiYXNlQ29sID0ge1xuICAgICAgaGVhZGVyOiBjb2wuaGVhZGVyLFxuICAgICAgY29sdW1uS2V5OiBVdGlscy5nZXRDb2x1bW5LZXkoY29sKSxcbiAgICAgIHdpZHRoOiBjb2wud2lkdGggfHwgY29sLndpZHRoID09PSAwID8gY29sLndpZHRoIDogMjAwLFxuICAgICAgbWluV2lkdGg6IGNvbC5taW5XaWR0aCB8fCBjb2wubWluV2lkdGggPT09IDAgPyBjb2wubWluV2lkdGggOiA0MCxcbiAgICAgIG1heFdpZHRoOiBjb2wubWF4V2lkdGgsXG4gICAgICBpc1Jlc2l6YWJsZTogIWNvbC5kaXNhYmxlUmVzaXppbmcsXG4gICAgICBmaXhlZDogISFjb2wuZml4ZWQsXG4gICAgICBmaXhlZFJpZ2h0OiAhIWNvbC5maXhlZFJpZ2h0LFxuICAgICAgYWxsb3dDZWxsc1JlY3ljbGluZzogISFjb2wuYWxsb3dDZWxsc1JlY3ljbGluZyxcbiAgICAgIGRpc2FibGVTb3J0aW5nOiAhIWNvbC5kaXNhYmxlU29ydGluZyxcbiAgICAgIGlzUmVxdWlyZWQ6ICEhY29sLmlzUmVxdWlyZWQsXG4gICAgICBjb21wb25lbnRUeXBlOiBjb2wuY29tcG9uZW50VHlwZSxcbiAgICAgIHN0eWxlOiBVdGlscy5nZXRDZWxsU3R5bGVCeUNvbChjb2wpLFxuICAgICAgdmlydHVhbGl6ZWQ6ICEhY29sLnZpcnR1YWxpemVkLFxuICAgIH07XG4gICAgLy8gdmFsdWVLZXlQYXRoXG4gICAgaWYgKGNvbC52YWx1ZUtleVBhdGgpIGJhc2VDb2wudmFsdWVLZXlQYXRoID0gY29sLnZhbHVlS2V5UGF0aDtcbiAgICAvLyBmbGV4R3Jvd1xuICAgIGlmIChjb2wuZmxleEdyb3cpIGJhc2VDb2wuZmxleEdyb3cgPSBjb2wuZmxleEdyb3c7XG4gICAgLy8gdmFsdWVUeXBlXG4gICAgaWYgKGNvbC52YWx1ZVR5cGUpIGJhc2VDb2wudmFsdWVUeXBlID0gY29sLnZhbHVlVHlwZTtcbiAgICAvLyBzb3J0Q29tcGFyYXRvclxuICAgIGlmIChjb2wuc29ydENvbXBhcmF0b3IpIGJhc2VDb2wuc29ydENvbXBhcmF0b3IgPSBjb2wuc29ydENvbXBhcmF0b3I7XG4gICAgLy8gc29ydFZhbHVlR2V0dGVyXG4gICAgaWYgKGNvbC5zb3J0VmFsdWVHZXR0ZXIpIGJhc2VDb2wuc29ydFZhbHVlR2V0dGVyID0gY29sLnNvcnRWYWx1ZUdldHRlcjtcbiAgICAvLyB0cmFuc2xhdGlvbnNcbiAgICBpZiAoY29sLnRyYW5zbGF0aW9ucykgYmFzZUNvbC50cmFuc2xhdGlvbnMgPSBjb2wudHJhbnNsYXRpb25zO1xuICAgIHJldHVybiBiYXNlQ29sO1xuICB9LFxuXG4gIGNvbHVtbkNlbGwoYmFzZUNvbHVtbiwgcHJvcHMsIGNvbCwgYmFzZVZhbHVlUmVuZGVyKSB7XG4gICAgY29uc3QgY29sdW1uID0gYmFzZUNvbHVtbjtcbiAgICBpZiAoY29sLmNlbGwpIHtcbiAgICAgIGNvbHVtbi5jZWxsID0gY29sLmNlbGw7XG4gICAgfSBlbHNlIGlmIChjb2wudmFsdWVSZW5kZXIpIHtcbiAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gY29sLnZhbHVlUmVuZGVyKHByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSwgcm93SW5kZXgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB7IHNlbGVjdENvbXBvbmVudE9wdGlvbnMgPSBNYXAoKSB9ID0gcHJvcHM7XG4gICAgICBzd2l0Y2ggKGNvbC5jb21wb25lbnRUeXBlKSB7XG4gICAgICAgIGNhc2UgJ251bWJlcic6IC8vIGZhbGwgdGhyb3VnaFxuICAgICAgICBjYXNlICdmbG9hdCc6IHtcbiAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IFByaW1pdGl2ZVR5cGUubnVtYmVyVmFsUmVuZGVyKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICBwcm9wcy50aG91c2FuZFNlcGFyYXRvcixcbiAgICAgICAgICAgIHByb3BzLmRlY2ltYWxTZXBhcmF0b3IsXG4gICAgICAgICAgICBiYXNlVmFsdWVSZW5kZXIsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgJ2Jvb2xlYW4nOiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBCb29sZWFuVHlwZS52YWxSZW5kZXIoY29sLCByb3dJbmRleCwgYmFzZVZhbHVlUmVuZGVyKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgJ2NoZWNrYm94Jzoge1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gQ2hlY2tib3hUeXBlLnZhbFJlbmRlcihyb3dJbmRleCwgYmFzZVZhbHVlUmVuZGVyKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgJ211bHRpc2VsZWN0Jzoge1xuICAgICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50T3B0aW9uc1xuICAgICAgICAgICAgfHwgc2VsZWN0Q29tcG9uZW50T3B0aW9ucy5nZXQoY29sdW1uLmNvbHVtbktleSk7XG4gICAgICAgICAgaW52YXJpYW50KFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIGBObyBzZWxlY3RDb21wb25lbnRPcHRpb25zIHByb3ZpZGVkIGZvciBjb2x1bW4gJyR7Y29sdW1uLmNvbHVtbktleX0nYCxcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gTXVsdGlTZWxlY3RUeXBlLnZhbFJlbmRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBiYXNlVmFsdWVSZW5kZXIsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgJ3NlbGVjdCc6IHtcbiAgICAgICAgICBjb25zdCBzZWxlY3RPcHRpb25zID0gY29sLnNlbGVjdENvbXBvbmVudE9wdGlvbnNcbiAgICAgICAgICAgIHx8IHNlbGVjdENvbXBvbmVudE9wdGlvbnMuZ2V0KGNvbHVtbi5jb2x1bW5LZXkpO1xuICAgICAgICAgIGludmFyaWFudChcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBgTm8gc2VsZWN0Q29tcG9uZW50T3B0aW9ucyBwcm92aWRlZCBmb3IgY29sdW1uICcke2NvbHVtbi5jb2x1bW5LZXl9J2AsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IFNlbGVjdFR5cGUudmFsUmVuZGVyKFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgYmFzZVZhbHVlUmVuZGVyLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlICdkYXRlJzoge1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gRGF0ZVR5cGUudmFsUmVuZGVyKHJvd0luZGV4LCBwcm9wcy5kYXRlRm9ybWF0LCBiYXNlVmFsdWVSZW5kZXIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNoYW5nZSB2YWxSZW5kZXJzIHRvIGp1c3QgdGFrZSBwcm9wcyAtLT4gc2F2ZXMgc29tZSAnZW5lcmd5J1xuICAgICAgICBjYXNlICdjdXJyZW5jeSc6IHtcbiAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IEN1cnJlbmN5VHlwZS52YWxSZW5kZXIoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBwcm9wcy5kYXRhLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICBwcm9wcy50aG91c2FuZFNlcGFyYXRvcixcbiAgICAgICAgICAgIHByb3BzLmRlY2ltYWxTZXBhcmF0b3IsXG4gICAgICAgICAgICBiYXNlVmFsdWVSZW5kZXIsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IGJhc2VWYWx1ZVJlbmRlcihyb3dJbmRleCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gY2VsbEVkaXQgcmVuZGVyXG4gICAgaWYgKGNvbC5jZWxsRWRpdCkge1xuICAgICAgY29sdW1uLmNlbGxFZGl0ID0gY29sLmNlbGxFZGl0O1xuICAgIH0gZWxzZSBpZiAoY29sLmVkaXRWYWx1ZVJlbmRlcikge1xuICAgICAgY29sdW1uLmNlbGxFZGl0ID0gKHJvd0luZGV4LCBzZXRSZWYsIG9uS2V5RG93bikgPT4gY29sLmVkaXRWYWx1ZVJlbmRlcihcbiAgICAgICAgcHJvcHMuZGF0YS5nZXQocm93SW5kZXgsIE1hcCgpKSxcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICAgIHNldFJlZixcbiAgICAgICAgb25LZXlEb3duLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBjZWxsQ3JlYXRlIHJlbmRlclxuICAgIGlmIChjb2wuY2VsbENyZWF0ZSkge1xuICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSBjb2wuY2VsbENyZWF0ZTtcbiAgICB9IGVsc2UgaWYgKGNvbC5jcmVhdGVWYWx1ZVJlbmRlcikge1xuICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSAocm93SW5kZXgsIHNldFJlZiwgb25LZXlEb3duKSA9PiBjb2wuY3JlYXRlVmFsdWVSZW5kZXIoXG4gICAgICAgIHByb3BzLmRhdGEuZ2V0KHJvd0luZGV4LCBNYXAoKSksXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICBzZXRSZWYsXG4gICAgICAgIG9uS2V5RG93bixcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gY2VsbEZpbHRlciByZW5kZXJcbiAgICBpZiAoY29sLmNlbGxGaWx0ZXIpIHtcbiAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gY29sLmNlbGxGaWx0ZXI7XG4gICAgfSBlbHNlIGlmIChjb2wuZmlsdGVyVmFsdWVSZW5kZXIpIHtcbiAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gcm93SW5kZXggPT4gY29sLmZpbHRlclZhbHVlUmVuZGVyKHByb3BzLmRhdGEuZ2V0KHJvd0luZGV4KSwgcm93SW5kZXgpO1xuICAgIH1cbiAgICByZXR1cm4gY29sdW1uO1xuICB9LFxuXG4gIGNvbHVtbkNvbXBvbmVudFR5cGUoYmFzZUNvbHVtbiwgdGFiSW5kZXgsIHByb3BzLCBjb2wsIGZ1bmN0aW9ucywgZ2V0RGlzYWJsZWRTdGF0ZSkge1xuICAgIGlmICghY29sLmNvbXBvbmVudFR5cGUpIHJldHVybiBiYXNlQ29sdW1uO1xuICAgIGNvbnN0IGNvbHVtbiA9IGJhc2VDb2x1bW47XG4gICAgY29uc3QgZWRpdFZhbHVlUGFyc2VyID0gY29sLmVkaXRWYWx1ZVBhcnNlciA/IGNvbC5lZGl0VmFsdWVQYXJzZXIgOiB2YWwgPT4gdmFsO1xuICAgIC8vIEdyaWQgaW50ZXJuYWwgZnVuY3Rpb25zIHNlcGFyYXRlZFxuICAgIGNvbnN0IGVkaXRGdW5jdGlvbnMgPSB7IC4uLmZ1bmN0aW9ucy5lZGl0IH07XG4gICAgY29uc3QgY3JlYXRlRnVuY3Rpb25zID0geyAuLi5mdW5jdGlvbnMuY3JlYXRlIH07XG4gICAgY29uc3QgZmlsdGVyRnVuY3Rpb25zID0geyAuLi5mdW5jdGlvbnMuZmlsdGVyIH07XG4gICAgY29uc3QgeyBzZWxlY3RDb21wb25lbnRPcHRpb25zID0gTWFwKCkgfSA9IHByb3BzO1xuXG4gICAgLy8gUHJpbWl0aXZlIHZhbHVlIHBhcnNlclxuICAgIGxldCBwcmltaXRpdmVWYWxQYXJzZXIgPSBlZGl0VmFsdWVQYXJzZXI7XG4gICAgaWYgKCFjb2wuZWRpdFZhbHVlUGFyc2VyICYmIGNvbC5jb21wb25lbnRUeXBlID09PSAnZmxvYXQnKSB7XG4gICAgICBwcmltaXRpdmVWYWxQYXJzZXIgPSAodmFsKSA9PiB7XG4gICAgICAgIGlmICh2YWwgJiYgdmFsLnJlcGxhY2UpIHtcbiAgICAgICAgICByZXR1cm4gdmFsLnJlcGxhY2UobmV3IFJlZ0V4cChgW15cXFxcZCR7cHJvcHMuZGVjaW1hbFNlcGFyYXRvcn0rLV1gLCAnZycpLCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGNvbC5jb21wb25lbnRUeXBlKSB7XG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAndGV4dCc6IHtcbiAgICAgICAgY29uc3QgZm9ybUNvbnRyb2xUeXBlID0gY29sLmNvbXBvbmVudFR5cGUgPT09ICdmbG9hdCcgfHwgY29sLmNvbXBvbmVudFR5cGUgPT09ICdudW1iZXInXG4gICAgICAgICAgPyAndGV4dCdcbiAgICAgICAgICA6IGNvbC5jb21wb25lbnRUeXBlO1xuICAgICAgICAvLyBhbHdheXMgdXNlIGNvbC5lZGl0VmFsdWVQYXJzZXIgb3ZlcnJpZGUgaWYgYXZhaWxhYmxlXG5cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IFByaW1pdGl2ZVR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByaW1pdGl2ZVZhbFBhcnNlcixcbiAgICAgICAgICAgIGZvcm1Db250cm9sVHlwZSxcbiAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IFByaW1pdGl2ZVR5cGUuY2VsbENyZWF0ZShcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgcHJpbWl0aXZlVmFsUGFyc2VyLFxuICAgICAgICAgICAgZm9ybUNvbnRyb2xUeXBlLFxuICAgICAgICAgICAgLi4uY3JlYXRlRnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IFByaW1pdGl2ZVR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByaW1pdGl2ZVZhbFBhcnNlcixcbiAgICAgICAgICAgIGZvcm1Db250cm9sVHlwZSxcbiAgICAgICAgICAgIC4uLmZpbHRlckZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlICdjaGVja2JveCc6IHtcbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IENoZWNrYm94VHlwZS5jZWxsRWRpdChcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgLi4uZWRpdEZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gQ2hlY2tib3hUeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIC4uLmNyZWF0ZUZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5maWx0ZXJpbmcgJiYgIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiBDaGVja2JveFR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByb3BzLmludGwsXG4gICAgICAgICAgICAuLi5maWx0ZXJGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSAnbXVsdGlzZWxlY3QnOiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50T3B0aW9uc1xuICAgICAgICAgIHx8IHNlbGVjdENvbXBvbmVudE9wdGlvbnMuZ2V0KGNvbHVtbi5jb2x1bW5LZXkpO1xuICAgICAgICBpbnZhcmlhbnQoXG4gICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICBgTm8gc2VsZWN0Q29tcG9uZW50T3B0aW9ucyBwcm92aWRlZCBmb3IgY29sdW1uICcke2NvbHVtbi5jb2x1bW5LZXl9J2AsXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHNlbGVjdFRyYW5zbGF0aW9ucyA9IGNvbC5zZWxlY3RDb21wb25lbnRUcmFuc2xhdGlvbnMgfHwge1xuICAgICAgICAgIHBsYWNlaG9sZGVyOiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuU2VsZWN0JyB9KSxcbiAgICAgICAgICBub1Jlc3VsdHNUZXh0OiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuTm9SZXN1bHRzJyB9KSxcbiAgICAgICAgICAvLyBWYXJpYWJsZSAnbicgbXVzdCBiZSBwcm92aWRlZCBpbiB0aGlzIHBoYXNlIGluIG9yZGVyIHRvIGF2b2lkXG4gICAgICAgICAgLy8gRXJyb3I6IFRoZSBpbnRsIHN0cmluZyBjb250ZXh0IHZhcmlhYmxlICduJyB3YXMgbm90IHByb3ZpZGVkIHRvIHRoZSBzdHJpbmcge259XG4gICAgICAgICAgLy8gc2VsZWN0ZWRcbiAgICAgICAgICAvLyBWYXJpYWJsZSBuIGlzIHJlcGxhY2VkIGxhdGVyLCB3aGVuIGl0cyB2YWx1ZSBpcyBhdmFpbGFibGVcbiAgICAgICAgICBzZWxlY3RlZDogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0LlNlbGVjdGVkJyB9LCB7IG46ICc8bj4nIH0pLFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiBTZWxlY3RUeXBlLmNlbGxFZGl0KFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uZWRpdEZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IFNlbGVjdFR5cGUuY2VsbENyZWF0ZShcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmNyZWF0ZUZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuZmlsdGVyaW5nICYmICFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT4gTXVsdGlTZWxlY3RUeXBlLmNlbGxGaWx0ZXIoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uZmlsdGVyRnVuY3Rpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ3NlbGVjdCc6IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0T3B0aW9ucyA9IGNvbC5zZWxlY3RDb21wb25lbnRPcHRpb25zXG4gICAgICAgICAgfHwgc2VsZWN0Q29tcG9uZW50T3B0aW9ucy5nZXQoY29sdW1uLmNvbHVtbktleSk7XG4gICAgICAgIGludmFyaWFudChcbiAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgIGBObyBzZWxlY3RDb21wb25lbnRPcHRpb25zIHByb3ZpZGVkIGZvciBjb2x1bW4gJyR7Y29sdW1uLmNvbHVtbktleX0nYCxcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3Qgc2VsZWN0VHJhbnNsYXRpb25zID0gY29sLnNlbGVjdENvbXBvbmVudFRyYW5zbGF0aW9ucyB8fCB7XG4gICAgICAgICAgcGxhY2Vob2xkZXI6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5TZWxlY3QnIH0pLFxuICAgICAgICAgIG5vUmVzdWx0c1RleHQ6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5Ob1Jlc3VsdHMnIH0pLFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiBTZWxlY3RUeXBlLmNlbGxFZGl0KFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uZWRpdEZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IFNlbGVjdFR5cGUuY2VsbENyZWF0ZShcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmNyZWF0ZUZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuZmlsdGVyaW5nICYmICFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT4gU2VsZWN0VHlwZS5jZWxsRmlsdGVyKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmZpbHRlckZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlICdib29sZWFuJzoge1xuICAgICAgICBjb25zdCBzZWxlY3RPcHRpb25zID0gW1xuICAgICAgICAgIHsgdmFsdWU6IHRydWUsIGxhYmVsOiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuWWVzJyB9KSB9LFxuICAgICAgICAgIHsgdmFsdWU6IGZhbHNlLCBsYWJlbDogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLk5vJyB9KSB9LFxuICAgICAgICBdO1xuICAgICAgICBjb25zdCBzZWxlY3RUcmFuc2xhdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50VHJhbnNsYXRpb25zIHx8IHtcbiAgICAgICAgICBwbGFjZWhvbGRlcjogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0LlNlbGVjdCcgfSksXG4gICAgICAgICAgbm9SZXN1bHRzVGV4dDogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0Lk5vUmVzdWx0cycgfSksXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IEJvb2xlYW5UeXBlLmNlbGxFZGl0KFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uZWRpdEZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IEJvb2xlYW5UeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5jcmVhdGVGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IEJvb2xlYW5UeXBlLmNlbGxGaWx0ZXIoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uZmlsdGVyRnVuY3Rpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ2RhdGUnOiB7XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiBEYXRlVHlwZS5jZWxsRWRpdChcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgcHJvcHMucmVnaW9uLFxuICAgICAgICAgICAgcHJvcHMuZGF0ZUZvcm1hdCxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiBEYXRlVHlwZS5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBwcm9wcy5yZWdpb24sXG4gICAgICAgICAgICBwcm9wcy5kYXRlRm9ybWF0LFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uY3JlYXRlRnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5maWx0ZXJpbmcgJiYgIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiBEYXRlVHlwZS5jZWxsRmlsdGVyKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgcHJvcHMucmVnaW9uLFxuICAgICAgICAgICAgcHJvcHMuZGF0ZUZvcm1hdCxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmZpbHRlckZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAnY3VycmVuY3knOiB7XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IEN1cnJlbmN5VHlwZS5jZWxsRWRpdChcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgLi4uZWRpdEZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgICBwcm9wcy5kYXRhLFxuICAgICAgICAgICAgcHJvcHMudGhvdXNhbmRTZXBhcmF0b3IsXG4gICAgICAgICAgICBwcm9wcy5kZWNpbWFsU2VwYXJhdG9yLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiBDdXJyZW5jeVR5cGUuY2VsbENyZWF0ZShcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgLi4uY3JlYXRlRnVuY3Rpb25zLFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICAgIHByb3BzLmRhdGEsXG4gICAgICAgICAgICBwcm9wcy50aG91c2FuZFNlcGFyYXRvcixcbiAgICAgICAgICAgIHByb3BzLmRlY2ltYWxTZXBhcmF0b3IsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuZmlsdGVyaW5nICYmICFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT4gUHJpbWl0aXZlVHlwZS5jZWxsRmlsdGVyKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgcHJpbWl0aXZlVmFsUGFyc2VyLFxuICAgICAgICAgICAgJ3RleHQnLFxuICAgICAgICAgICAgLi4uZmlsdGVyRnVuY3Rpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OlxuICAgIH1cbiAgICByZXR1cm4gY29sdW1uO1xuICB9LFxufTtcbiJdfQ==