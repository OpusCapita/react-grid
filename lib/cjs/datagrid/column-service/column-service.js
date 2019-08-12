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
        selectComponentOptions = _props$selectComponen2 === void 0 ? (0, _immutable.Map)() : _props$selectComponen2;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2VydmljZS9jb2x1bW4tc2VydmljZS5qc3giXSwibmFtZXMiOlsiYmFzZUNvbHVtbiIsImNvbCIsImJhc2VDb2wiLCJoZWFkZXIiLCJjb2x1bW5LZXkiLCJVdGlscyIsImdldENvbHVtbktleSIsIndpZHRoIiwibWluV2lkdGgiLCJtYXhXaWR0aCIsImlzUmVzaXphYmxlIiwiZGlzYWJsZVJlc2l6aW5nIiwiZml4ZWQiLCJmaXhlZFJpZ2h0IiwiYWxsb3dDZWxsc1JlY3ljbGluZyIsImRpc2FibGVTb3J0aW5nIiwiaXNSZXF1aXJlZCIsImNvbXBvbmVudFR5cGUiLCJzdHlsZSIsImdldENlbGxTdHlsZUJ5Q29sIiwidmlydHVhbGl6ZWQiLCJ2YWx1ZUtleVBhdGgiLCJmbGV4R3JvdyIsInZhbHVlVHlwZSIsInNvcnRDb21wYXJhdG9yIiwic29ydFZhbHVlR2V0dGVyIiwidHJhbnNsYXRpb25zIiwiY29sdW1uQ2VsbCIsInByb3BzIiwiYmFzZVZhbHVlUmVuZGVyIiwiY29sdW1uIiwiY2VsbCIsInZhbHVlUmVuZGVyIiwicm93SW5kZXgiLCJkYXRhIiwiZ2V0Iiwic2VsZWN0Q29tcG9uZW50T3B0aW9ucyIsIlByaW1pdGl2ZVR5cGUiLCJudW1iZXJWYWxSZW5kZXIiLCJ0aG91c2FuZFNlcGFyYXRvciIsImRlY2ltYWxTZXBhcmF0b3IiLCJCb29sZWFuVHlwZSIsInZhbFJlbmRlciIsIkNoZWNrYm94VHlwZSIsInNlbGVjdE9wdGlvbnMiLCJNdWx0aVNlbGVjdFR5cGUiLCJncmlkIiwiaWQiLCJTZWxlY3RUeXBlIiwiRGF0ZVR5cGUiLCJkYXRlRm9ybWF0IiwiQ3VycmVuY3lUeXBlIiwiY2VsbEVkaXQiLCJlZGl0VmFsdWVSZW5kZXIiLCJzZXRSZWYiLCJvbktleURvd24iLCJjZWxsQ3JlYXRlIiwiY3JlYXRlVmFsdWVSZW5kZXIiLCJjZWxsRmlsdGVyIiwiZmlsdGVyVmFsdWVSZW5kZXIiLCJjb2x1bW5Db21wb25lbnRUeXBlIiwidGFiSW5kZXgiLCJmdW5jdGlvbnMiLCJnZXREaXNhYmxlZFN0YXRlIiwiZWRpdFZhbHVlUGFyc2VyIiwidmFsIiwiZWRpdEZ1bmN0aW9ucyIsImVkaXQiLCJjcmVhdGVGdW5jdGlvbnMiLCJjcmVhdGUiLCJmaWx0ZXJGdW5jdGlvbnMiLCJmaWx0ZXIiLCJwcmltaXRpdmVWYWxQYXJzZXIiLCJyZXBsYWNlIiwiUmVnRXhwIiwiZm9ybUNvbnRyb2xUeXBlIiwiaW5saW5lRWRpdCIsImZpbHRlcmluZyIsImludGwiLCJzZWxlY3RUcmFuc2xhdGlvbnMiLCJzZWxlY3RDb21wb25lbnRUcmFuc2xhdGlvbnMiLCJwbGFjZWhvbGRlciIsImZvcm1hdE1lc3NhZ2UiLCJub1Jlc3VsdHNUZXh0Iiwic2VsZWN0ZWQiLCJuIiwidmFsdWUiLCJsYWJlbCIsInJlZ2lvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7O2VBVWU7QUFDYkEsRUFBQUEsVUFEYSxzQkFDRkMsR0FERSxFQUNHO0FBQ2QsUUFBTUMsT0FBTyxHQUFHO0FBQ2RDLE1BQUFBLE1BQU0sRUFBRUYsR0FBRyxDQUFDRSxNQURFO0FBRWRDLE1BQUFBLFNBQVMsRUFBRUMscUJBQU1DLFlBQU4sQ0FBbUJMLEdBQW5CLENBRkc7QUFHZE0sTUFBQUEsS0FBSyxFQUFFTixHQUFHLENBQUNNLEtBQUosSUFBYU4sR0FBRyxDQUFDTSxLQUFKLEtBQWMsQ0FBM0IsR0FBK0JOLEdBQUcsQ0FBQ00sS0FBbkMsR0FBMkMsR0FIcEM7QUFJZEMsTUFBQUEsUUFBUSxFQUFFUCxHQUFHLENBQUNPLFFBQUosSUFBZ0JQLEdBQUcsQ0FBQ08sUUFBSixLQUFpQixDQUFqQyxHQUFxQ1AsR0FBRyxDQUFDTyxRQUF6QyxHQUFvRCxFQUpoRDtBQUtkQyxNQUFBQSxRQUFRLEVBQUVSLEdBQUcsQ0FBQ1EsUUFMQTtBQU1kQyxNQUFBQSxXQUFXLEVBQUUsQ0FBQ1QsR0FBRyxDQUFDVSxlQU5KO0FBT2RDLE1BQUFBLEtB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QSxhQUFwQjtBQVNEOztBQUNEO0FBQ0Q7O0FBQ0Q7QUFwVkY7O0FBc1ZBLFdBQU94QyxNQUFQO0FBQ0Q7QUE3ZlksQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hcCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgaW52YXJpYW50IGZyb20gJ2ludmFyaWFudCc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vZGF0YWdyaWQudXRpbHMnO1xuaW1wb3J0IHtcbiAgRGF0ZVR5cGUsXG4gIFNlbGVjdFR5cGUsXG4gIEJvb2xlYW5UeXBlLFxuICBDaGVja2JveFR5cGUsXG4gIEN1cnJlbmN5VHlwZSxcbiAgUHJpbWl0aXZlVHlwZSxcbiAgTXVsdGlTZWxlY3RUeXBlLFxufSBmcm9tICcuL2NvbHVtbi10eXBlcy9jb2x1bW4tdHlwZXMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGJhc2VDb2x1bW4oY29sKSB7XG4gICAgY29uc3QgYmFzZUNvbCA9IHtcbiAgICAgIGhlYWRlcjogY29sLmhlYWRlcixcbiAgICAgIGNvbHVtbktleTogVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCksXG4gICAgICB3aWR0aDogY29sLndpZHRoIHx8IGNvbC53aWR0aCA9PT0gMCA/IGNvbC53aWR0aCA6IDIwMCxcbiAgICAgIG1pbldpZHRoOiBjb2wubWluV2lkdGggfHwgY29sLm1pbldpZHRoID09PSAwID8gY29sLm1pbldpZHRoIDogNDAsXG4gICAgICBtYXhXaWR0aDogY29sLm1heFdpZHRoLFxuICAgICAgaXNSZXNpemFibGU6ICFjb2wuZGlzYWJsZVJlc2l6aW5nLFxuICAgICAgZml4ZWQ6ICEhY29sLmZpeGVkLFxuICAgICAgZml4ZWRSaWdodDogISFjb2wuZml4ZWRSaWdodCxcbiAgICAgIGFsbG93Q2VsbHNSZWN5Y2xpbmc6ICEhY29sLmFsbG93Q2VsbHNSZWN5Y2xpbmcsXG4gICAgICBkaXNhYmxlU29ydGluZzogISFjb2wuZGlzYWJsZVNvcnRpbmcsXG4gICAgICBpc1JlcXVpcmVkOiAhIWNvbC5pc1JlcXVpcmVkLFxuICAgICAgY29tcG9uZW50VHlwZTogY29sLmNvbXBvbmVudFR5cGUsXG4gICAgICBzdHlsZTogVXRpbHMuZ2V0Q2VsbFN0eWxlQnlDb2woY29sKSxcbiAgICAgIHZpcnR1YWxpemVkOiAhIWNvbC52aXJ0dWFsaXplZCxcbiAgICB9O1xuICAgIC8vIHZhbHVlS2V5UGF0aFxuICAgIGlmIChjb2wudmFsdWVLZXlQYXRoKSBiYXNlQ29sLnZhbHVlS2V5UGF0aCA9IGNvbC52YWx1ZUtleVBhdGg7XG4gICAgLy8gZmxleEdyb3dcbiAgICBpZiAoY29sLmZsZXhHcm93KSBiYXNlQ29sLmZsZXhHcm93ID0gY29sLmZsZXhHcm93O1xuICAgIC8vIHZhbHVlVHlwZVxuICAgIGlmIChjb2wudmFsdWVUeXBlKSBiYXNlQ29sLnZhbHVlVHlwZSA9IGNvbC52YWx1ZVR5cGU7XG4gICAgLy8gc29ydENvbXBhcmF0b3JcbiAgICBpZiAoY29sLnNvcnRDb21wYXJhdG9yKSBiYXNlQ29sLnNvcnRDb21wYXJhdG9yID0gY29sLnNvcnRDb21wYXJhdG9yO1xuICAgIC8vIHNvcnRWYWx1ZUdldHRlclxuICAgIGlmIChjb2wuc29ydFZhbHVlR2V0dGVyKSBiYXNlQ29sLnNvcnRWYWx1ZUdldHRlciA9IGNvbC5zb3J0VmFsdWVHZXR0ZXI7XG4gICAgLy8gdHJhbnNsYXRpb25zXG4gICAgaWYgKGNvbC50cmFuc2xhdGlvbnMpIGJhc2VDb2wudHJhbnNsYXRpb25zID0gY29sLnRyYW5zbGF0aW9ucztcbiAgICByZXR1cm4gYmFzZUNvbDtcbiAgfSxcblxuICBjb2x1bW5DZWxsKGJhc2VDb2x1bW4sIHByb3BzLCBjb2wsIGJhc2VWYWx1ZVJlbmRlcikge1xuICAgIGNvbnN0IGNvbHVtbiA9IGJhc2VDb2x1bW47XG4gICAgaWYgKGNvbC5jZWxsKSB7XG4gICAgICBjb2x1bW4uY2VsbCA9IGNvbC5jZWxsO1xuICAgIH0gZWxzZSBpZiAoY29sLnZhbHVlUmVuZGVyKSB7XG4gICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IGNvbC52YWx1ZVJlbmRlcihwcm9wcy5kYXRhLmdldChyb3dJbmRleCksIHJvd0luZGV4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgeyBzZWxlY3RDb21wb25lbnRPcHRpb25zID0gTWFwKCkgfSA9IHByb3BzO1xuICAgICAgc3dpdGNoIChjb2wuY29tcG9uZW50VHlwZSkge1xuICAgICAgICBjYXNlICdudW1iZXInOiAvLyBmYWxsIHRocm91Z2hcbiAgICAgICAgY2FzZSAnZmxvYXQnOiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBQcmltaXRpdmVUeXBlLm51bWJlclZhbFJlbmRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgcHJvcHMudGhvdXNhbmRTZXBhcmF0b3IsXG4gICAgICAgICAgICBwcm9wcy5kZWNpbWFsU2VwYXJhdG9yLFxuICAgICAgICAgICAgYmFzZVZhbHVlUmVuZGVyLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlICdib29sZWFuJzoge1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gQm9vbGVhblR5cGUudmFsUmVuZGVyKGNvbCwgcm93SW5kZXgsIGJhc2VWYWx1ZVJlbmRlcik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlICdjaGVja2JveCc6IHtcbiAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IENoZWNrYm94VHlwZS52YWxSZW5kZXIocm93SW5kZXgsIGJhc2VWYWx1ZVJlbmRlcik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlICdtdWx0aXNlbGVjdCc6IHtcbiAgICAgICAgICBjb25zdCBzZWxlY3RPcHRpb25zID0gY29sLnNlbGVjdENvbXBvbmVudE9wdGlvbnNcbiAgICAgICAgICAgIHx8IHNlbGVjdENvbXBvbmVudE9wdGlvbnMuZ2V0KGNvbHVtbi5jb2x1bW5LZXkpO1xuICAgICAgICAgIGludmFyaWFudChcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBgTm8gc2VsZWN0Q29tcG9uZW50T3B0aW9ucyBwcm92aWRlZCBmb3IgY29sdW1uICcke2NvbHVtbi5jb2x1bW5LZXl9J2AsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IE11bHRpU2VsZWN0VHlwZS52YWxSZW5kZXIoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgYmFzZVZhbHVlUmVuZGVyLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlICdzZWxlY3QnOiB7XG4gICAgICAgICAgY29uc3Qgc2VsZWN0T3B0aW9ucyA9IGNvbC5zZWxlY3RDb21wb25lbnRPcHRpb25zXG4gICAgICAgICAgICB8fCBzZWxlY3RDb21wb25lbnRPcHRpb25zLmdldChjb2x1bW4uY29sdW1uS2V5KTtcbiAgICAgICAgICBpbnZhcmlhbnQoXG4gICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgYE5vIHNlbGVjdENvbXBvbmVudE9wdGlvbnMgcHJvdmlkZWQgZm9yIGNvbHVtbiAnJHtjb2x1bW4uY29sdW1uS2V5fSdgLFxuICAgICAgICAgICk7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBTZWxlY3RUeXBlLnZhbFJlbmRlcihcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIGJhc2VWYWx1ZVJlbmRlcixcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSAnZGF0ZSc6IHtcbiAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IERhdGVUeXBlLnZhbFJlbmRlcihyb3dJbmRleCwgcHJvcHMuZGF0ZUZvcm1hdCwgYmFzZVZhbHVlUmVuZGVyKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICAvLyBjaGFuZ2UgdmFsUmVuZGVycyB0byBqdXN0IHRha2UgcHJvcHMgLS0+IHNhdmVzIHNvbWUgJ2VuZXJneSdcbiAgICAgICAgY2FzZSAnY3VycmVuY3knOiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBDdXJyZW5jeVR5cGUudmFsUmVuZGVyKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgcHJvcHMuZGF0YSxcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgcHJvcHMudGhvdXNhbmRTZXBhcmF0b3IsXG4gICAgICAgICAgICBwcm9wcy5kZWNpbWFsU2VwYXJhdG9yLFxuICAgICAgICAgICAgYmFzZVZhbHVlUmVuZGVyLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBiYXNlVmFsdWVSZW5kZXIocm93SW5kZXgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGNlbGxFZGl0IHJlbmRlclxuICAgIGlmIChjb2wuY2VsbEVkaXQpIHtcbiAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IGNvbC5jZWxsRWRpdDtcbiAgICB9IGVsc2UgaWYgKGNvbC5lZGl0VmFsdWVSZW5kZXIpIHtcbiAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IChyb3dJbmRleCwgc2V0UmVmLCBvbktleURvd24pID0+IGNvbC5lZGl0VmFsdWVSZW5kZXIoXG4gICAgICAgIHByb3BzLmRhdGEuZ2V0KHJvd0luZGV4LCBNYXAoKSksXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICBzZXRSZWYsXG4gICAgICAgIG9uS2V5RG93bixcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gY2VsbENyZWF0ZSByZW5kZXJcbiAgICBpZiAoY29sLmNlbGxDcmVhdGUpIHtcbiAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gY29sLmNlbGxDcmVhdGU7XG4gICAgfSBlbHNlIGlmIChjb2wuY3JlYXRlVmFsdWVSZW5kZXIpIHtcbiAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gKHJvd0luZGV4LCBzZXRSZWYsIG9uS2V5RG93bikgPT4gY29sLmNyZWF0ZVZhbHVlUmVuZGVyKFxuICAgICAgICBwcm9wcy5kYXRhLmdldChyb3dJbmRleCwgTWFwKCkpLFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgc2V0UmVmLFxuICAgICAgICBvbktleURvd24sXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIGNlbGxGaWx0ZXIgcmVuZGVyXG4gICAgaWYgKGNvbC5jZWxsRmlsdGVyKSB7XG4gICAgICBjb2x1bW4uY2VsbEZpbHRlciA9IGNvbC5jZWxsRmlsdGVyO1xuICAgIH0gZWxzZSBpZiAoY29sLmZpbHRlclZhbHVlUmVuZGVyKSB7XG4gICAgICBjb2x1bW4uY2VsbEZpbHRlciA9IHJvd0luZGV4ID0+IGNvbC5maWx0ZXJWYWx1ZVJlbmRlcihwcm9wcy5kYXRhLmdldChyb3dJbmRleCksIHJvd0luZGV4KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbHVtbjtcbiAgfSxcblxuICBjb2x1bW5Db21wb25lbnRUeXBlKGJhc2VDb2x1bW4sIHRhYkluZGV4LCBwcm9wcywgY29sLCBmdW5jdGlvbnMsIGdldERpc2FibGVkU3RhdGUpIHtcbiAgICBpZiAoIWNvbC5jb21wb25lbnRUeXBlKSByZXR1cm4gYmFzZUNvbHVtbjtcbiAgICBjb25zdCBjb2x1bW4gPSBiYXNlQ29sdW1uO1xuICAgIGNvbnN0IGVkaXRWYWx1ZVBhcnNlciA9IGNvbC5lZGl0VmFsdWVQYXJzZXIgPyBjb2wuZWRpdFZhbHVlUGFyc2VyIDogdmFsID0+IHZhbDtcbiAgICAvLyBHcmlkIGludGVybmFsIGZ1bmN0aW9ucyBzZXBhcmF0ZWRcbiAgICBjb25zdCBlZGl0RnVuY3Rpb25zID0geyAuLi5mdW5jdGlvbnMuZWRpdCB9O1xuICAgIGNvbnN0IGNyZWF0ZUZ1bmN0aW9ucyA9IHsgLi4uZnVuY3Rpb25zLmNyZWF0ZSB9O1xuICAgIGNvbnN0IGZpbHRlckZ1bmN0aW9ucyA9IHsgLi4uZnVuY3Rpb25zLmZpbHRlciB9O1xuICAgIGNvbnN0IHsgc2VsZWN0Q29tcG9uZW50T3B0aW9ucyA9IE1hcCgpIH0gPSBwcm9wcztcbiAgICBjb25zdCBwcmltaXRpdmVWYWxQYXJzZXIgPSAhY29sLmVkaXRWYWx1ZVBhcnNlciAmJiBjb2wuY29tcG9uZW50VHlwZSA9PT0gJ2Zsb2F0J1xuICAgICAgPyB2YWwgPT4gdmFsLnJlcGxhY2UobmV3IFJlZ0V4cChgW15cXFxcZCR7cHJvcHMuZGVjaW1hbFNlcGFyYXRvcn0rLV1gLCAnZycpLCAnJylcbiAgICAgIDogZWRpdFZhbHVlUGFyc2VyO1xuXG4gICAgc3dpdGNoIChjb2wuY29tcG9uZW50VHlwZSkge1xuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ3RleHQnOiB7XG4gICAgICAgIGNvbnN0IGZvcm1Db250cm9sVHlwZSA9IGNvbC5jb21wb25lbnRUeXBlID09PSAnZmxvYXQnIHx8IGNvbC5jb21wb25lbnRUeXBlID09PSAnbnVtYmVyJ1xuICAgICAgICAgID8gJ3RleHQnXG4gICAgICAgICAgOiBjb2wuY29tcG9uZW50VHlwZTtcbiAgICAgICAgLy8gYWx3YXlzIHVzZSBjb2wuZWRpdFZhbHVlUGFyc2VyIG92ZXJyaWRlIGlmIGF2YWlsYWJsZVxuXG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiBQcmltaXRpdmVUeXBlLmNlbGxFZGl0KFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBwcmltaXRpdmVWYWxQYXJzZXIsXG4gICAgICAgICAgICBmb3JtQ29udHJvbFR5cGUsXG4gICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiBQcmltaXRpdmVUeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByaW1pdGl2ZVZhbFBhcnNlcixcbiAgICAgICAgICAgIGZvcm1Db250cm9sVHlwZSxcbiAgICAgICAgICAgIC4uLmNyZWF0ZUZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wcy5maWx0ZXJpbmcgJiYgIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiBQcmltaXRpdmVUeXBlLmNlbGxGaWx0ZXIoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBwcmltaXRpdmVWYWxQYXJzZXIsXG4gICAgICAgICAgICBmb3JtQ29udHJvbFR5cGUsXG4gICAgICAgICAgICAuLi5maWx0ZXJGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSAnY2hlY2tib3gnOiB7XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiBDaGVja2JveFR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IENoZWNrYm94VHlwZS5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICAuLi5jcmVhdGVGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuZmlsdGVyaW5nICYmICFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT4gQ2hlY2tib3hUeXBlLmNlbGxGaWx0ZXIoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBwcm9wcy5pbnRsLFxuICAgICAgICAgICAgLi4uZmlsdGVyRnVuY3Rpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ211bHRpc2VsZWN0Jzoge1xuICAgICAgICBjb25zdCBzZWxlY3RPcHRpb25zID0gY29sLnNlbGVjdENvbXBvbmVudE9wdGlvbnNcbiAgICAgICAgICB8fCBzZWxlY3RDb21wb25lbnRPcHRpb25zLmdldChjb2x1bW4uY29sdW1uS2V5KTtcbiAgICAgICAgaW52YXJpYW50KFxuICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgYE5vIHNlbGVjdENvbXBvbmVudE9wdGlvbnMgcHJvdmlkZWQgZm9yIGNvbHVtbiAnJHtjb2x1bW4uY29sdW1uS2V5fSdgLFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBzZWxlY3RUcmFuc2xhdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50VHJhbnNsYXRpb25zIHx8IHtcbiAgICAgICAgICBwbGFjZWhvbGRlcjogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0LlNlbGVjdCcgfSksXG4gICAgICAgICAgbm9SZXN1bHRzVGV4dDogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0Lk5vUmVzdWx0cycgfSksXG4gICAgICAgICAgLy8gVmFyaWFibGUgJ24nIG11c3QgYmUgcHJvdmlkZWQgaW4gdGhpcyBwaGFzZSBpbiBvcmRlciB0byBhdm9pZFxuICAgICAgICAgIC8vIEVycm9yOiBUaGUgaW50bCBzdHJpbmcgY29udGV4dCB2YXJpYWJsZSAnbicgd2FzIG5vdCBwcm92aWRlZCB0byB0aGUgc3RyaW5nIHtufVxuICAgICAgICAgIC8vIHNlbGVjdGVkXG4gICAgICAgICAgLy8gVmFyaWFibGUgbiBpcyByZXBsYWNlZCBsYXRlciwgd2hlbiBpdHMgdmFsdWUgaXMgYXZhaWxhYmxlXG4gICAgICAgICAgc2VsZWN0ZWQ6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5TZWxlY3RlZCcgfSwgeyBuOiAnPG4+JyB9KSxcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gU2VsZWN0VHlwZS5jZWxsRWRpdChcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiBTZWxlY3RUeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5jcmVhdGVGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IE11bHRpU2VsZWN0VHlwZS5jZWxsRmlsdGVyKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmZpbHRlckZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlICdzZWxlY3QnOiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50T3B0aW9uc1xuICAgICAgICAgIHx8IHNlbGVjdENvbXBvbmVudE9wdGlvbnMuZ2V0KGNvbHVtbi5jb2x1bW5LZXkpO1xuICAgICAgICBpbnZhcmlhbnQoXG4gICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICBgTm8gc2VsZWN0Q29tcG9uZW50T3B0aW9ucyBwcm92aWRlZCBmb3IgY29sdW1uICcke2NvbHVtbi5jb2x1bW5LZXl9J2AsXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHNlbGVjdFRyYW5zbGF0aW9ucyA9IGNvbC5zZWxlY3RDb21wb25lbnRUcmFuc2xhdGlvbnMgfHwge1xuICAgICAgICAgIHBsYWNlaG9sZGVyOiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuU2VsZWN0JyB9KSxcbiAgICAgICAgICBub1Jlc3VsdHNUZXh0OiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuTm9SZXN1bHRzJyB9KSxcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gU2VsZWN0VHlwZS5jZWxsRWRpdChcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiBTZWxlY3RUeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5jcmVhdGVGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IFNlbGVjdFR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5maWx0ZXJGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSAnYm9vbGVhbic6IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0T3B0aW9ucyA9IFtcbiAgICAgICAgICB7IHZhbHVlOiB0cnVlLCBsYWJlbDogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLlllcycgfSkgfSxcbiAgICAgICAgICB7IHZhbHVlOiBmYWxzZSwgbGFiZWw6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5ObycgfSkgfSxcbiAgICAgICAgXTtcbiAgICAgICAgY29uc3Qgc2VsZWN0VHJhbnNsYXRpb25zID0gY29sLnNlbGVjdENvbXBvbmVudFRyYW5zbGF0aW9ucyB8fCB7XG4gICAgICAgICAgcGxhY2Vob2xkZXI6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5TZWxlY3QnIH0pLFxuICAgICAgICAgIG5vUmVzdWx0c1RleHQ6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5Ob1Jlc3VsdHMnIH0pLFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiBCb29sZWFuVHlwZS5jZWxsRWRpdChcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiBCb29sZWFuVHlwZS5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uY3JlYXRlRnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5maWx0ZXJpbmcgJiYgIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiBCb29sZWFuVHlwZS5jZWxsRmlsdGVyKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmZpbHRlckZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlICdkYXRlJzoge1xuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gRGF0ZVR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByb3BzLnJlZ2lvbixcbiAgICAgICAgICAgIHByb3BzLmRhdGVGb3JtYXQsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gRGF0ZVR5cGUuY2VsbENyZWF0ZShcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgcHJvcHMucmVnaW9uLFxuICAgICAgICAgICAgcHJvcHMuZGF0ZUZvcm1hdCxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmNyZWF0ZUZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuZmlsdGVyaW5nICYmICFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT4gRGF0ZVR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByb3BzLnJlZ2lvbixcbiAgICAgICAgICAgIHByb3BzLmRhdGVGb3JtYXQsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5maWx0ZXJGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgJ2N1cnJlbmN5Jzoge1xuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiBDdXJyZW5jeVR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICAgcHJvcHMuZGF0YSxcbiAgICAgICAgICAgIHByb3BzLnRob3VzYW5kU2VwYXJhdG9yLFxuICAgICAgICAgICAgcHJvcHMuZGVjaW1hbFNlcGFyYXRvcixcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gQ3VycmVuY3lUeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIC4uLmNyZWF0ZUZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgICBwcm9wcy5kYXRhLFxuICAgICAgICAgICAgcHJvcHMudGhvdXNhbmRTZXBhcmF0b3IsXG4gICAgICAgICAgICBwcm9wcy5kZWNpbWFsU2VwYXJhdG9yLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IFByaW1pdGl2ZVR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByaW1pdGl2ZVZhbFBhcnNlcixcbiAgICAgICAgICAgICd0ZXh0JyxcbiAgICAgICAgICAgIC4uLmZpbHRlckZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICB9XG4gICAgcmV0dXJuIGNvbHVtbjtcbiAgfSxcbn07XG4iXX0=