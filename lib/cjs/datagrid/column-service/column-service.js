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
      style: _datagrid["default"].getCellStyleByCol(col)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2VydmljZS9jb2x1bW4tc2VydmljZS5qc3giXSwibmFtZXMiOlsiYmFzZUNvbHVtbiIsImNvbCIsImJhc2VDb2wiLCJoZWFkZXIiLCJjb2x1bW5LZXkiLCJVdGlscyIsImdldENvbHVtbktleSIsIndpZHRoIiwibWluV2lkdGgiLCJtYXhXaWR0aCIsImlzUmVzaXphYmxlIiwiZGlzYWJsZVJlc2l6aW5nIiwiZml4ZWQiLCJmaXhlZFJpZ2h0IiwiYWxsb3dDZWxsc1JlY3ljbGluZyIsImRpc2FibGVTb3J0aW5nIiwiaXNSZXF1aXJlZCIsImNvbXBvbmVudFR5cGUiLCJzdHlsZSIsImdldENlbGxTdHlsZUJ5Q29sIiwidmFsdWVLZXlQYXRoIiwiZmxleEdyb3ciLCJ2YWx1ZVR5cGUiLCJzb3J0Q29tcGFyYXRvciIsInNvcnRWYWx1ZUdldHRlciIsImNvbHVtbkNlbGwiLCJwcm9wcyIsImJhc2VWYWx1ZVJlbmRlciIsImNvbHVtbiIsImNlbGwiLCJ2YWx1ZVJlbmRlciIsInJvd0luZGV4IiwiZGF0YSIsImdldCIsInNlbGVjdENvbXBvbmVudE9wdGlvbnMiLCJQcmltaXRpdmVUeXBlIiwibnVtYmVyVmFsUmVuZGVyIiwidGhvdXNhbmRTZXBhcmF0b3IiLCJkZWNpbWFsU2VwYXJhdG9yIiwiQm9vbGVhblR5cGUiLCJ2YWxSZW5kZXIiLCJDaGVja2JveFR5cGUiLCJzZWxlY3RPcHRpb25zIiwiTXVsdGlTZWxlY3RUeXBlIiwiZ3JpZCIsImlkIiwiU2VsZWN0VHlwZSIsIkRhdGVUeXBlIiwiZGF0ZUZvcm1hdCIsIkN1cnJlbmN5VHlwZSIsImNlbGxFZGl0IiwiZWRpdFZhbHVlUmVuZGVyIiwic2V0UmVmIiwib25LZXlEb3duIiwiY2VsbENyZWF0ZSIsImNyZWF0ZVZhbHVlUmVuZGVyIiwiY2VsbEZpbHRlciIsImZpbHRlclZhbHVlUmVuZGVyIiwiY29sdW1uQ29tcG9uZW50VHlwZSIsInRhYkluZGV4IiwiZnVuY3Rpb25zIiwiZ2V0RGlzYWJsZWRTdGF0ZSIsImVkaXRWYWx1ZVBhcnNlciIsInZhbCIsImVkaXRGdW5jdGlvbnMiLCJlZGl0IiwiY3JlYXRlRnVuY3Rpb25zIiwiY3JlYXRlIiwiZmlsdGVyRnVuY3Rpb25zIiwiZmlsdGVyIiwicHJpbWl0aXZlVmFsUGFyc2VyIiwicmVwbGFjZSIsIlJlZ0V4cCIsImZvcm1Db250cm9sVHlwZSIsImlubGluZUVkaXQiLCJmaWx0ZXJpbmciLCJpbnRsIiwic2VsZWN0VHJhbnNsYXRpb25zIiwic2VsZWN0Q29tcG9uZW50VHJhbnNsYXRpb25zIiwicGxhY2Vob2xkZXIiLCJmb3JtYXRNZXNzYWdlIiwibm9SZXN1bHRzVGV4dCIsInNlbGVjdGVkIiwibiIsInZhbHVlIiwibGFiZWwiLCJyZWdpb24iXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7OztlQVVlO0FBQ2JBLEVBQUFBLFVBRGEsc0JBQ0ZDLEdBREUsRUFDRztBQUNkLFFBQU1DLE9BQU8sR0FBRztBQUNkQyxNQUFBQSxNQUFNLEVBQUVGLEdBQUcsQ0FBQ0UsTUFERTtBQUVkQyxNQUFBQSxTQUFTLEVBQUVDLHFCQUFNQyxZQUFOLENBQW1CTCxHQUFuQixDQUZHO0FBR2RNLE1BQUFBLEtBQUssRUFBRU4sR0FBRyxDQUFDTSxLQUFKLElBQWFOLEdBQUcsQ0FBQ00sS0FBSixLQUFjLENBQTNCLEdBQStCTixHQUFHLENBQUNNLEtBQW5DLEdBQTJDLEdBSHBDO0FBSWRDLE1BQUFBLFFBQVEsRUFBRVAsR0FBRyxDQUFDTyxRQUFKLElBQWdCUCxHQUFHLENBQUNPLFFBQUosS0FBaUIsQ0FBakMsR0FBcUNQLEdBQUcsQ0FBQ08sUUFBekMsR0FBb0QsRUFKaEQ7QUFLZEMsTUFBQUEsUUFBUSxFQUFFUixHQUFHLENBQUNRLFFBTEE7QUFNZEMsTUFBQUEsV0FBVyxFQUFFLENBQUNULEdBQUcsQ0FBQ1UsZUFOSjtBQU9kQyxNQUFBQSxLQUFLLEVBQUUsQ0FBQyxDQUFDWCxHQUFHLENBQUNX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NEIsRUFTNUJuQyxLQUFLLENBQUNNLElBVHNCLEVBVTVCTixLQUFLLENBQUNXLGlCQVZzQixFQVc1QlgsS0FBSyxDQUFDWSxnQkFYc0IsR0FBSjtBQUFBLGFBQTFCO0FBYUQ7O0FBQ0QsY0FBSVosS0FBSyxDQUFDZ0QsVUFBTixJQUFvQixDQUFDOUMsTUFBTSxDQUFDMEIsVUFBaEMsRUFBNEM7QUFDMUMxQixZQUFBQSxNQUFNLENBQUMwQixVQUFQLEdBQW9CLFVBQUF2QixRQUFRO0FBQUEscUJBQUlrQiwwQkFBYUssVUFBYixtQ0FDOUJyRCxHQUQ4QixFQUU5QjJCLE1BRjhCLEVBRzlCK0IsUUFIOEIsRUFJOUI1QixRQUo4QixFQUs5QkwsS0FBSyxDQUFDa0IsSUFBTixDQUFXQyxFQUxtQixTQU0zQnFCLGVBTjJCLEdBTzlCSixlQVA4QixFQVE5QkQsZ0JBUjhCLEVBUzlCbkMsS0FBSyxDQUFDTSxJQVR3QixFQVU5Qk4sS0FBSyxDQUFDVyxpQkFWd0IsRUFXOUJYLEtBQUssQ0FBQ1ksZ0JBWHdCLEdBQUo7QUFBQSxhQUE1QjtBQWFEOztBQUNELGNBQUlaLEtBQUssQ0FBQ2lELFNBQU4sSUFBbUIsQ0FBQy9DLE1BQU0sQ0FBQzRCLFVBQS9CLEVBQTJDO0FBQ3pDNUIsWUFBQUEsTUFBTSxDQUFDNEIsVUFBUCxHQUFvQjtBQUFBLHFCQUFNckIsMkJBQWNxQixVQUFkLG9DQUN4QnZELEdBRHdCLEVBRXhCMkIsTUFGd0IsRUFHeEIrQixRQUh3QixFQUl4QmpDLEtBQUssQ0FBQ2tCLElBQU4sQ0FBV0MsRUFKYSxFQUt4QnlCLGtCQUx3QixFQU14QixNQU53QixTQU9yQkYsZUFQcUIsRUFBTjtBQUFBLGFBQXBCO0FBU0Q7O0FBQ0Q7QUFDRDs7QUFDRDtBQXBWRjs7QUFzVkEsV0FBT3hDLE1BQVA7QUFDRDtBQTFmWSxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWFwIH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCBpbnZhcmlhbnQgZnJvbSAnaW52YXJpYW50JztcbmltcG9ydCBVdGlscyBmcm9tICcuLi9kYXRhZ3JpZC51dGlscyc7XG5pbXBvcnQge1xuICBEYXRlVHlwZSxcbiAgU2VsZWN0VHlwZSxcbiAgQm9vbGVhblR5cGUsXG4gIENoZWNrYm94VHlwZSxcbiAgQ3VycmVuY3lUeXBlLFxuICBQcmltaXRpdmVUeXBlLFxuICBNdWx0aVNlbGVjdFR5cGUsXG59IGZyb20gJy4vY29sdW1uLXR5cGVzL2NvbHVtbi10eXBlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYmFzZUNvbHVtbihjb2wpIHtcbiAgICBjb25zdCBiYXNlQ29sID0ge1xuICAgICAgaGVhZGVyOiBjb2wuaGVhZGVyLFxuICAgICAgY29sdW1uS2V5OiBVdGlscy5nZXRDb2x1bW5LZXkoY29sKSxcbiAgICAgIHdpZHRoOiBjb2wud2lkdGggfHwgY29sLndpZHRoID09PSAwID8gY29sLndpZHRoIDogMjAwLFxuICAgICAgbWluV2lkdGg6IGNvbC5taW5XaWR0aCB8fCBjb2wubWluV2lkdGggPT09IDAgPyBjb2wubWluV2lkdGggOiA0MCxcbiAgICAgIG1heFdpZHRoOiBjb2wubWF4V2lkdGgsXG4gICAgICBpc1Jlc2l6YWJsZTogIWNvbC5kaXNhYmxlUmVzaXppbmcsXG4gICAgICBmaXhlZDogISFjb2wuZml4ZWQsXG4gICAgICBmaXhlZFJpZ2h0OiAhIWNvbC5maXhlZFJpZ2h0LFxuICAgICAgYWxsb3dDZWxsc1JlY3ljbGluZzogISFjb2wuYWxsb3dDZWxsc1JlY3ljbGluZyxcbiAgICAgIGRpc2FibGVTb3J0aW5nOiAhIWNvbC5kaXNhYmxlU29ydGluZyxcbiAgICAgIGlzUmVxdWlyZWQ6ICEhY29sLmlzUmVxdWlyZWQsXG4gICAgICBjb21wb25lbnRUeXBlOiBjb2wuY29tcG9uZW50VHlwZSxcbiAgICAgIHN0eWxlOiBVdGlscy5nZXRDZWxsU3R5bGVCeUNvbChjb2wpLFxuICAgIH07XG4gICAgLy8gdmFsdWVLZXlQYXRoXG4gICAgaWYgKGNvbC52YWx1ZUtleVBhdGgpIGJhc2VDb2wudmFsdWVLZXlQYXRoID0gY29sLnZhbHVlS2V5UGF0aDtcbiAgICAvLyBmbGV4R3Jvd1xuICAgIGlmIChjb2wuZmxleEdyb3cpIGJhc2VDb2wuZmxleEdyb3cgPSBjb2wuZmxleEdyb3c7XG4gICAgLy8gdmFsdWVUeXBlXG4gICAgaWYgKGNvbC52YWx1ZVR5cGUpIGJhc2VDb2wudmFsdWVUeXBlID0gY29sLnZhbHVlVHlwZTtcbiAgICAvLyBzb3J0Q29tcGFyYXRvclxuICAgIGlmIChjb2wuc29ydENvbXBhcmF0b3IpIGJhc2VDb2wuc29ydENvbXBhcmF0b3IgPSBjb2wuc29ydENvbXBhcmF0b3I7XG4gICAgLy8gc29ydFZhbHVlR2V0dGVyXG4gICAgaWYgKGNvbC5zb3J0VmFsdWVHZXR0ZXIpIGJhc2VDb2wuc29ydFZhbHVlR2V0dGVyID0gY29sLnNvcnRWYWx1ZUdldHRlcjtcbiAgICByZXR1cm4gYmFzZUNvbDtcbiAgfSxcblxuICBjb2x1bW5DZWxsKGJhc2VDb2x1bW4sIHByb3BzLCBjb2wsIGJhc2VWYWx1ZVJlbmRlcikge1xuICAgIGNvbnN0IGNvbHVtbiA9IGJhc2VDb2x1bW47XG4gICAgaWYgKGNvbC5jZWxsKSB7XG4gICAgICBjb2x1bW4uY2VsbCA9IGNvbC5jZWxsO1xuICAgIH0gZWxzZSBpZiAoY29sLnZhbHVlUmVuZGVyKSB7XG4gICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IGNvbC52YWx1ZVJlbmRlcihwcm9wcy5kYXRhLmdldChyb3dJbmRleCksIHJvd0luZGV4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgeyBzZWxlY3RDb21wb25lbnRPcHRpb25zID0gTWFwKCkgfSA9IHByb3BzO1xuICAgICAgc3dpdGNoIChjb2wuY29tcG9uZW50VHlwZSkge1xuICAgICAgICBjYXNlICdudW1iZXInOiAvLyBmYWxsIHRocm91Z2hcbiAgICAgICAgY2FzZSAnZmxvYXQnOiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBQcmltaXRpdmVUeXBlLm51bWJlclZhbFJlbmRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgcHJvcHMudGhvdXNhbmRTZXBhcmF0b3IsXG4gICAgICAgICAgICBwcm9wcy5kZWNpbWFsU2VwYXJhdG9yLFxuICAgICAgICAgICAgYmFzZVZhbHVlUmVuZGVyLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlICdib29sZWFuJzoge1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gQm9vbGVhblR5cGUudmFsUmVuZGVyKGNvbCwgcm93SW5kZXgsIGJhc2VWYWx1ZVJlbmRlcik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlICdjaGVja2JveCc6IHtcbiAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IENoZWNrYm94VHlwZS52YWxSZW5kZXIocm93SW5kZXgsIGJhc2VWYWx1ZVJlbmRlcik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlICdtdWx0aXNlbGVjdCc6IHtcbiAgICAgICAgICBjb25zdCBzZWxlY3RPcHRpb25zID0gY29sLnNlbGVjdENvbXBvbmVudE9wdGlvbnNcbiAgICAgICAgICAgIHx8IHNlbGVjdENvbXBvbmVudE9wdGlvbnMuZ2V0KGNvbHVtbi5jb2x1bW5LZXkpO1xuICAgICAgICAgIGludmFyaWFudChcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBgTm8gc2VsZWN0Q29tcG9uZW50T3B0aW9ucyBwcm92aWRlZCBmb3IgY29sdW1uICcke2NvbHVtbi5jb2x1bW5LZXl9J2AsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IE11bHRpU2VsZWN0VHlwZS52YWxSZW5kZXIoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgYmFzZVZhbHVlUmVuZGVyLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlICdzZWxlY3QnOiB7XG4gICAgICAgICAgY29uc3Qgc2VsZWN0T3B0aW9ucyA9IGNvbC5zZWxlY3RDb21wb25lbnRPcHRpb25zXG4gICAgICAgICAgICB8fCBzZWxlY3RDb21wb25lbnRPcHRpb25zLmdldChjb2x1bW4uY29sdW1uS2V5KTtcbiAgICAgICAgICBpbnZhcmlhbnQoXG4gICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgYE5vIHNlbGVjdENvbXBvbmVudE9wdGlvbnMgcHJvdmlkZWQgZm9yIGNvbHVtbiAnJHtjb2x1bW4uY29sdW1uS2V5fSdgLFxuICAgICAgICAgICk7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBTZWxlY3RUeXBlLnZhbFJlbmRlcihcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIGJhc2VWYWx1ZVJlbmRlcixcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSAnZGF0ZSc6IHtcbiAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IERhdGVUeXBlLnZhbFJlbmRlcihyb3dJbmRleCwgcHJvcHMuZGF0ZUZvcm1hdCwgYmFzZVZhbHVlUmVuZGVyKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICAvLyBjaGFuZ2UgdmFsUmVuZGVycyB0byBqdXN0IHRha2UgcHJvcHMgLS0+IHNhdmVzIHNvbWUgJ2VuZXJneSdcbiAgICAgICAgY2FzZSAnY3VycmVuY3knOiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBDdXJyZW5jeVR5cGUudmFsUmVuZGVyKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgcHJvcHMuZGF0YSxcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgcHJvcHMudGhvdXNhbmRTZXBhcmF0b3IsXG4gICAgICAgICAgICBwcm9wcy5kZWNpbWFsU2VwYXJhdG9yLFxuICAgICAgICAgICAgYmFzZVZhbHVlUmVuZGVyLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBiYXNlVmFsdWVSZW5kZXIocm93SW5kZXgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGNlbGxFZGl0IHJlbmRlclxuICAgIGlmIChjb2wuY2VsbEVkaXQpIHtcbiAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IGNvbC5jZWxsRWRpdDtcbiAgICB9IGVsc2UgaWYgKGNvbC5lZGl0VmFsdWVSZW5kZXIpIHtcbiAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IChyb3dJbmRleCwgc2V0UmVmLCBvbktleURvd24pID0+IGNvbC5lZGl0VmFsdWVSZW5kZXIoXG4gICAgICAgIHByb3BzLmRhdGEuZ2V0KHJvd0luZGV4LCBNYXAoKSksXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgICBzZXRSZWYsXG4gICAgICAgIG9uS2V5RG93bixcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gY2VsbENyZWF0ZSByZW5kZXJcbiAgICBpZiAoY29sLmNlbGxDcmVhdGUpIHtcbiAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gY29sLmNlbGxDcmVhdGU7XG4gICAgfSBlbHNlIGlmIChjb2wuY3JlYXRlVmFsdWVSZW5kZXIpIHtcbiAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gKHJvd0luZGV4LCBzZXRSZWYsIG9uS2V5RG93bikgPT4gY29sLmNyZWF0ZVZhbHVlUmVuZGVyKFxuICAgICAgICBwcm9wcy5kYXRhLmdldChyb3dJbmRleCwgTWFwKCkpLFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgc2V0UmVmLFxuICAgICAgICBvbktleURvd24sXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIGNlbGxGaWx0ZXIgcmVuZGVyXG4gICAgaWYgKGNvbC5jZWxsRmlsdGVyKSB7XG4gICAgICBjb2x1bW4uY2VsbEZpbHRlciA9IGNvbC5jZWxsRmlsdGVyO1xuICAgIH0gZWxzZSBpZiAoY29sLmZpbHRlclZhbHVlUmVuZGVyKSB7XG4gICAgICBjb2x1bW4uY2VsbEZpbHRlciA9IHJvd0luZGV4ID0+IGNvbC5maWx0ZXJWYWx1ZVJlbmRlcihwcm9wcy5kYXRhLmdldChyb3dJbmRleCksIHJvd0luZGV4KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbHVtbjtcbiAgfSxcblxuICBjb2x1bW5Db21wb25lbnRUeXBlKGJhc2VDb2x1bW4sIHRhYkluZGV4LCBwcm9wcywgY29sLCBmdW5jdGlvbnMsIGdldERpc2FibGVkU3RhdGUpIHtcbiAgICBpZiAoIWNvbC5jb21wb25lbnRUeXBlKSByZXR1cm4gYmFzZUNvbHVtbjtcbiAgICBjb25zdCBjb2x1bW4gPSBiYXNlQ29sdW1uO1xuICAgIGNvbnN0IGVkaXRWYWx1ZVBhcnNlciA9IGNvbC5lZGl0VmFsdWVQYXJzZXIgPyBjb2wuZWRpdFZhbHVlUGFyc2VyIDogdmFsID0+IHZhbDtcbiAgICAvLyBHcmlkIGludGVybmFsIGZ1bmN0aW9ucyBzZXBhcmF0ZWRcbiAgICBjb25zdCBlZGl0RnVuY3Rpb25zID0geyAuLi5mdW5jdGlvbnMuZWRpdCB9O1xuICAgIGNvbnN0IGNyZWF0ZUZ1bmN0aW9ucyA9IHsgLi4uZnVuY3Rpb25zLmNyZWF0ZSB9O1xuICAgIGNvbnN0IGZpbHRlckZ1bmN0aW9ucyA9IHsgLi4uZnVuY3Rpb25zLmZpbHRlciB9O1xuICAgIGNvbnN0IHsgc2VsZWN0Q29tcG9uZW50T3B0aW9ucyA9IE1hcCgpIH0gPSBwcm9wcztcbiAgICBjb25zdCBwcmltaXRpdmVWYWxQYXJzZXIgPSAhY29sLmVkaXRWYWx1ZVBhcnNlciAmJiBjb2wuY29tcG9uZW50VHlwZSA9PT0gJ2Zsb2F0J1xuICAgICAgPyB2YWwgPT4gdmFsLnJlcGxhY2UobmV3IFJlZ0V4cChgW15cXFxcZCR7cHJvcHMuZGVjaW1hbFNlcGFyYXRvcn0rLV1gLCAnZycpLCAnJylcbiAgICAgIDogZWRpdFZhbHVlUGFyc2VyO1xuXG4gICAgc3dpdGNoIChjb2wuY29tcG9uZW50VHlwZSkge1xuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ3RleHQnOiB7XG4gICAgICAgIGNvbnN0IGZvcm1Db250cm9sVHlwZSA9IGNvbC5jb21wb25lbnRUeXBlID09PSAnZmxvYXQnIHx8IGNvbC5jb21wb25lbnRUeXBlID09PSAnbnVtYmVyJ1xuICAgICAgICAgID8gJ3RleHQnXG4gICAgICAgICAgOiBjb2wuY29tcG9uZW50VHlwZTtcbiAgICAgICAgLy8gYWx3YXlzIHVzZSBjb2wuZWRpdFZhbHVlUGFyc2VyIG92ZXJyaWRlIGlmIGF2YWlsYWJsZVxuXG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiBQcmltaXRpdmVUeXBlLmNlbGxFZGl0KFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBwcmltaXRpdmVWYWxQYXJzZXIsXG4gICAgICAgICAgICBmb3JtQ29udHJvbFR5cGUsXG4gICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiBQcmltaXRpdmVUeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByaW1pdGl2ZVZhbFBhcnNlcixcbiAgICAgICAgICAgIGZvcm1Db250cm9sVHlwZSxcbiAgICAgICAgICAgIC4uLmNyZWF0ZUZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wcy5maWx0ZXJpbmcgJiYgIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiBQcmltaXRpdmVUeXBlLmNlbGxGaWx0ZXIoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBwcmltaXRpdmVWYWxQYXJzZXIsXG4gICAgICAgICAgICBmb3JtQ29udHJvbFR5cGUsXG4gICAgICAgICAgICAuLi5maWx0ZXJGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSAnY2hlY2tib3gnOiB7XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiBDaGVja2JveFR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IENoZWNrYm94VHlwZS5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICAuLi5jcmVhdGVGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuZmlsdGVyaW5nICYmICFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT4gQ2hlY2tib3hUeXBlLmNlbGxGaWx0ZXIoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBwcm9wcy5pbnRsLFxuICAgICAgICAgICAgLi4uZmlsdGVyRnVuY3Rpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ211bHRpc2VsZWN0Jzoge1xuICAgICAgICBjb25zdCBzZWxlY3RPcHRpb25zID0gY29sLnNlbGVjdENvbXBvbmVudE9wdGlvbnNcbiAgICAgICAgICB8fCBzZWxlY3RDb21wb25lbnRPcHRpb25zLmdldChjb2x1bW4uY29sdW1uS2V5KTtcbiAgICAgICAgaW52YXJpYW50KFxuICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgYE5vIHNlbGVjdENvbXBvbmVudE9wdGlvbnMgcHJvdmlkZWQgZm9yIGNvbHVtbiAnJHtjb2x1bW4uY29sdW1uS2V5fSdgLFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBzZWxlY3RUcmFuc2xhdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50VHJhbnNsYXRpb25zIHx8IHtcbiAgICAgICAgICBwbGFjZWhvbGRlcjogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0LlNlbGVjdCcgfSksXG4gICAgICAgICAgbm9SZXN1bHRzVGV4dDogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0Lk5vUmVzdWx0cycgfSksXG4gICAgICAgICAgLy8gVmFyaWFibGUgJ24nIG11c3QgYmUgcHJvdmlkZWQgaW4gdGhpcyBwaGFzZSBpbiBvcmRlciB0byBhdm9pZFxuICAgICAgICAgIC8vIEVycm9yOiBUaGUgaW50bCBzdHJpbmcgY29udGV4dCB2YXJpYWJsZSAnbicgd2FzIG5vdCBwcm92aWRlZCB0byB0aGUgc3RyaW5nIHtufVxuICAgICAgICAgIC8vIHNlbGVjdGVkXG4gICAgICAgICAgLy8gVmFyaWFibGUgbiBpcyByZXBsYWNlZCBsYXRlciwgd2hlbiBpdHMgdmFsdWUgaXMgYXZhaWxhYmxlXG4gICAgICAgICAgc2VsZWN0ZWQ6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5TZWxlY3RlZCcgfSwgeyBuOiAnPG4+JyB9KSxcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gU2VsZWN0VHlwZS5jZWxsRWRpdChcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiBTZWxlY3RUeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5jcmVhdGVGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IE11bHRpU2VsZWN0VHlwZS5jZWxsRmlsdGVyKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmZpbHRlckZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlICdzZWxlY3QnOiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50T3B0aW9uc1xuICAgICAgICAgIHx8IHNlbGVjdENvbXBvbmVudE9wdGlvbnMuZ2V0KGNvbHVtbi5jb2x1bW5LZXkpO1xuICAgICAgICBpbnZhcmlhbnQoXG4gICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICBgTm8gc2VsZWN0Q29tcG9uZW50T3B0aW9ucyBwcm92aWRlZCBmb3IgY29sdW1uICcke2NvbHVtbi5jb2x1bW5LZXl9J2AsXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHNlbGVjdFRyYW5zbGF0aW9ucyA9IGNvbC5zZWxlY3RDb21wb25lbnRUcmFuc2xhdGlvbnMgfHwge1xuICAgICAgICAgIHBsYWNlaG9sZGVyOiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuU2VsZWN0JyB9KSxcbiAgICAgICAgICBub1Jlc3VsdHNUZXh0OiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuTm9SZXN1bHRzJyB9KSxcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gU2VsZWN0VHlwZS5jZWxsRWRpdChcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiBTZWxlY3RUeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5jcmVhdGVGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IFNlbGVjdFR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5maWx0ZXJGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSAnYm9vbGVhbic6IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0T3B0aW9ucyA9IFtcbiAgICAgICAgICB7IHZhbHVlOiB0cnVlLCBsYWJlbDogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLlllcycgfSkgfSxcbiAgICAgICAgICB7IHZhbHVlOiBmYWxzZSwgbGFiZWw6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5ObycgfSkgfSxcbiAgICAgICAgXTtcbiAgICAgICAgY29uc3Qgc2VsZWN0VHJhbnNsYXRpb25zID0gY29sLnNlbGVjdENvbXBvbmVudFRyYW5zbGF0aW9ucyB8fCB7XG4gICAgICAgICAgcGxhY2Vob2xkZXI6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5TZWxlY3QnIH0pLFxuICAgICAgICAgIG5vUmVzdWx0c1RleHQ6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5Ob1Jlc3VsdHMnIH0pLFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiBCb29sZWFuVHlwZS5jZWxsRWRpdChcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiBCb29sZWFuVHlwZS5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uY3JlYXRlRnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5maWx0ZXJpbmcgJiYgIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiBCb29sZWFuVHlwZS5jZWxsRmlsdGVyKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmZpbHRlckZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlICdkYXRlJzoge1xuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxFZGl0KSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxFZGl0ID0gcm93SW5kZXggPT4gRGF0ZVR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByb3BzLnJlZ2lvbixcbiAgICAgICAgICAgIHByb3BzLmRhdGVGb3JtYXQsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gRGF0ZVR5cGUuY2VsbENyZWF0ZShcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgcHJvcHMucmVnaW9uLFxuICAgICAgICAgICAgcHJvcHMuZGF0ZUZvcm1hdCxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmNyZWF0ZUZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuZmlsdGVyaW5nICYmICFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT4gRGF0ZVR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByb3BzLnJlZ2lvbixcbiAgICAgICAgICAgIHByb3BzLmRhdGVGb3JtYXQsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5maWx0ZXJGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgJ2N1cnJlbmN5Jzoge1xuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiBDdXJyZW5jeVR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICAgcHJvcHMuZGF0YSxcbiAgICAgICAgICAgIHByb3BzLnRob3VzYW5kU2VwYXJhdG9yLFxuICAgICAgICAgICAgcHJvcHMuZGVjaW1hbFNlcGFyYXRvcixcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gQ3VycmVuY3lUeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIC4uLmNyZWF0ZUZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgICBwcm9wcy5kYXRhLFxuICAgICAgICAgICAgcHJvcHMudGhvdXNhbmRTZXBhcmF0b3IsXG4gICAgICAgICAgICBwcm9wcy5kZWNpbWFsU2VwYXJhdG9yLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IFByaW1pdGl2ZVR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByaW1pdGl2ZVZhbFBhcnNlcixcbiAgICAgICAgICAgICd0ZXh0JyxcbiAgICAgICAgICAgIC4uLmZpbHRlckZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICB9XG4gICAgcmV0dXJuIGNvbHVtbjtcbiAgfSxcbn07XG4iXX0=