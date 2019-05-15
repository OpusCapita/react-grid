"use strict";

exports.__esModule = true;
exports["default"] = void 0;

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
        case 'select':
          {
            var selectOptions = col.selectComponentOptions || props.selectComponentOptions.get(column.columnKey);

            column.cell = function (rowIndex) {
              return _columnTypes.SelectType.valRender(rowIndex, selectOptions, baseValueRender);
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
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2VydmljZS9jb2x1bW4tc2VydmljZS5qc3giXSwibmFtZXMiOlsiYmFzZUNvbHVtbiIsImNvbCIsImJhc2VDb2wiLCJoZWFkZXIiLCJjb2x1bW5LZXkiLCJVdGlscyIsImdldENvbHVtbktleSIsIndpZHRoIiwibWluV2lkdGgiLCJtYXhXaWR0aCIsImlzUmVzaXphYmxlIiwiZGlzYWJsZVJlc2l6aW5nIiwiZml4ZWQiLCJmaXhlZFJpZ2h0IiwiYWxsb3dDZWxsc1JlY3ljbGluZyIsImRpc2FibGVTb3J0aW5nIiwiaXNSZXF1aXJlZCIsImNvbXBvbmVudFR5cGUiLCJzdHlsZSIsImdldENlbGxTdHlsZUJ5Q29sIiwidmFsdWVLZXlQYXRoIiwiZmxleEdyb3ciLCJ2YWx1ZVR5cGUiLCJzb3J0Q29tcGFyYXRvciIsInNvcnRWYWx1ZUdldHRlciIsImNvbHVtbkNlbGwiLCJwcm9wcyIsImJhc2VWYWx1ZVJlbmRlciIsImNvbHVtbiIsImNlbGwiLCJ2YWx1ZVJlbmRlciIsInJvd0luZGV4IiwiZGF0YSIsImdldCIsIlByaW1pdGl2ZVR5cGUiLCJudW1iZXJWYWxSZW5kZXIiLCJ0aG91c2FuZFNlcGFyYXRvciIsImRlY2ltYWxTZXBhcmF0b3IiLCJCb29sZWFuVHlwZSIsInZhbFJlbmRlciIsIkNoZWNrYm94VHlwZSIsInNlbGVjdE9wdGlvbnMiLCJzZWxlY3RDb21wb25lbnRPcHRpb25zIiwiU2VsZWN0VHlwZSIsIkRhdGVUeXBlIiwiZGF0ZUZvcm1hdCIsIkN1cnJlbmN5VHlwZSIsImNlbGxFZGl0IiwiZWRpdFZhbHVlUmVuZGVyIiwic2V0UmVmIiwib25LZXlEb3duIiwiY2VsbENyZWF0ZSIsImNyZWF0ZVZhbHVlUmVuZGVyIiwiY2VsbEZpbHRlciIsImZpbHRlclZhbHVlUmVuZGVyIiwiY29sdW1uQ29tcG9uZW50VHlwZSIsInRhYkluZGV4IiwiZnVuY3Rpb25zIiwiZ2V0RGlzYWJsZWRTdGF0ZSIsImVkaXRWYWx1ZVBhcnNlciIsInZhbCIsImVkaXRGdW5jdGlvbnMiLCJlZGl0IiwiY3JlYXRlRnVuY3Rpb25zIiwiY3JlYXRlIiwiZmlsdGVyRnVuY3Rpb25zIiwiZmlsdGVyIiwiZm9ybUNvbnRyb2xUeXBlIiwicHJpbWl0aXZlVmFsUGFyc2VyIiwicmVwbGFjZSIsIlJlZ0V4cCIsImlubGluZUVkaXQiLCJncmlkIiwiaWQiLCJmaWx0ZXJpbmciLCJpbnRsIiwic2VsZWN0VHJhbnNsYXRpb25zIiwic2VsZWN0Q29tcG9uZW50VHJhbnNsYXRpb25zIiwicGxhY2Vob2xkZXIiLCJmb3JtYXRNZXNzYWdlIiwibm9SZXN1bHRzVGV4dCIsInNlbGVjdGVkIiwibiIsIk11bHRpU2VsZWN0VHlwZSIsInZhbHVlIiwibGFiZWwiLCJyZWdpb24iXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7O0FBQ0E7Ozs7OztlQVVlO0FBQ2JBLEVBQUFBLFVBRGEsc0JBQ0ZDLEdBREUsRUFDRztBQUNkLFFBQU1DLE9BQU8sR0FBRztBQUNkQyxNQUFBQSxNQUFNLEVBQUVGLEdBQUcsQ0FBQ0UsTUFERTtBQUVkQyxNQUFBQSxTQUFTLEVBQUVDLHFCQUFNQyxZQUFOLENBQW1CTCxHQUFuQixDQUZHO0FBR2RNLE1BQUFBLEtBQUssRUFBRU4sR0FBRyxDQUFDTSxLQUFKLElBQWFOLEdBQUcsQ0FBQ00sS0FBSixLQUFjLENBQTNCLEdBQStCTixHQUFHLENBQUNNLEtBQW5DLEdBQTJDLEdBSHBDO0FBSWRDLE1BQUFBLFFBQVEsRUFBRVAsR0FBRyxDQUFDTyxRQUFKLElBQWdCUCxHQUFHLENBQUNPLFFBQUosS0FBaUIsQ0FBakMsR0FBcUNQLEdBQUcsQ0FBQ08sUUFBekMsR0FBb0QsRUFKaEQ7QUFLZEMsTUFBQUEsUUFBUSxFQUFFUixHQUFHLENBQUNRLFFBTEE7QUFNZEMsTUFBQUEsV0FBVyxFQUFFLENBQUNULEdBQUcsQ0FBQ1UsZUFOSjtBQU9kQyxNQUFBQSxLQUFLLEVBQUUsQ0FBQyxDQUFDWCxHQUFHLENBQUNXLEtBUEM7QUFRZEMs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OztBQUVEO0FBclNGOztBQXVTQSxXQUFPckMsTUFBUDtBQUNEO0FBaGJZLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVXRpbHMgZnJvbSAnLi4vZGF0YWdyaWQudXRpbHMnO1xuaW1wb3J0IHtcbiAgRGF0ZVR5cGUsXG4gIFNlbGVjdFR5cGUsXG4gIEJvb2xlYW5UeXBlLFxuICBDaGVja2JveFR5cGUsXG4gIEN1cnJlbmN5VHlwZSxcbiAgUHJpbWl0aXZlVHlwZSxcbiAgTXVsdGlTZWxlY3RUeXBlLFxufSBmcm9tICcuL2NvbHVtbi10eXBlcy9jb2x1bW4tdHlwZXMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGJhc2VDb2x1bW4oY29sKSB7XG4gICAgY29uc3QgYmFzZUNvbCA9IHtcbiAgICAgIGhlYWRlcjogY29sLmhlYWRlcixcbiAgICAgIGNvbHVtbktleTogVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCksXG4gICAgICB3aWR0aDogY29sLndpZHRoIHx8IGNvbC53aWR0aCA9PT0gMCA/IGNvbC53aWR0aCA6IDIwMCxcbiAgICAgIG1pbldpZHRoOiBjb2wubWluV2lkdGggfHwgY29sLm1pbldpZHRoID09PSAwID8gY29sLm1pbldpZHRoIDogNDAsXG4gICAgICBtYXhXaWR0aDogY29sLm1heFdpZHRoLFxuICAgICAgaXNSZXNpemFibGU6ICFjb2wuZGlzYWJsZVJlc2l6aW5nLFxuICAgICAgZml4ZWQ6ICEhY29sLmZpeGVkLFxuICAgICAgZml4ZWRSaWdodDogISFjb2wuZml4ZWRSaWdodCxcbiAgICAgIGFsbG93Q2VsbHNSZWN5Y2xpbmc6ICEhY29sLmFsbG93Q2VsbHNSZWN5Y2xpbmcsXG4gICAgICBkaXNhYmxlU29ydGluZzogISFjb2wuZGlzYWJsZVNvcnRpbmcsXG4gICAgICBpc1JlcXVpcmVkOiAhIWNvbC5pc1JlcXVpcmVkLFxuICAgICAgY29tcG9uZW50VHlwZTogY29sLmNvbXBvbmVudFR5cGUsXG4gICAgICBzdHlsZTogVXRpbHMuZ2V0Q2VsbFN0eWxlQnlDb2woY29sKSxcbiAgICB9O1xuICAgIC8vIHZhbHVlS2V5UGF0aFxuICAgIGlmIChjb2wudmFsdWVLZXlQYXRoKSBiYXNlQ29sLnZhbHVlS2V5UGF0aCA9IGNvbC52YWx1ZUtleVBhdGg7XG4gICAgLy8gZmxleEdyb3dcbiAgICBpZiAoY29sLmZsZXhHcm93KSBiYXNlQ29sLmZsZXhHcm93ID0gY29sLmZsZXhHcm93O1xuICAgIC8vIHZhbHVlVHlwZVxuICAgIGlmIChjb2wudmFsdWVUeXBlKSBiYXNlQ29sLnZhbHVlVHlwZSA9IGNvbC52YWx1ZVR5cGU7XG4gICAgLy8gc29ydENvbXBhcmF0b3JcbiAgICBpZiAoY29sLnNvcnRDb21wYXJhdG9yKSBiYXNlQ29sLnNvcnRDb21wYXJhdG9yID0gY29sLnNvcnRDb21wYXJhdG9yO1xuICAgIC8vIHNvcnRWYWx1ZUdldHRlclxuICAgIGlmIChjb2wuc29ydFZhbHVlR2V0dGVyKSBiYXNlQ29sLnNvcnRWYWx1ZUdldHRlciA9IGNvbC5zb3J0VmFsdWVHZXR0ZXI7XG4gICAgcmV0dXJuIGJhc2VDb2w7XG4gIH0sXG5cbiAgY29sdW1uQ2VsbChiYXNlQ29sdW1uLCBwcm9wcywgY29sLCBiYXNlVmFsdWVSZW5kZXIpIHtcbiAgICBjb25zdCBjb2x1bW4gPSBiYXNlQ29sdW1uO1xuICAgIGlmIChjb2wuY2VsbCkge1xuICAgICAgY29sdW1uLmNlbGwgPSBjb2wuY2VsbDtcbiAgICB9IGVsc2UgaWYgKGNvbC52YWx1ZVJlbmRlcikge1xuICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBjb2wudmFsdWVSZW5kZXIocHJvcHMuZGF0YS5nZXQocm93SW5kZXgpLCByb3dJbmRleCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXRjaCAoY29sLmNvbXBvbmVudFR5cGUpIHtcbiAgICAgICAgY2FzZSAnbnVtYmVyJzogLy8gZmFsbCB0aHJvdWdoXG4gICAgICAgIGNhc2UgJ2Zsb2F0Jzoge1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gUHJpbWl0aXZlVHlwZS5udW1iZXJWYWxSZW5kZXIoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHByb3BzLnRob3VzYW5kU2VwYXJhdG9yLFxuICAgICAgICAgICAgcHJvcHMuZGVjaW1hbFNlcGFyYXRvcixcbiAgICAgICAgICAgIGJhc2VWYWx1ZVJlbmRlcixcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSAnYm9vbGVhbic6IHtcbiAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IEJvb2xlYW5UeXBlLnZhbFJlbmRlcihjb2wsIHJvd0luZGV4LCBiYXNlVmFsdWVSZW5kZXIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSAnY2hlY2tib3gnOiB7XG4gICAgICAgICAgY29sdW1uLmNlbGwgPSByb3dJbmRleCA9PiBDaGVja2JveFR5cGUudmFsUmVuZGVyKHJvd0luZGV4LCBiYXNlVmFsdWVSZW5kZXIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSAnbXVsdGlzZWxlY3QnOlxuICAgICAgICBjYXNlICdzZWxlY3QnOiB7XG4gICAgICAgICAgY29uc3Qgc2VsZWN0T3B0aW9ucyA9IGNvbC5zZWxlY3RDb21wb25lbnRPcHRpb25zXG4gICAgICAgICAgICB8fCBwcm9wcy5zZWxlY3RDb21wb25lbnRPcHRpb25zLmdldChjb2x1bW4uY29sdW1uS2V5KTtcbiAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IFNlbGVjdFR5cGUudmFsUmVuZGVyKFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgYmFzZVZhbHVlUmVuZGVyLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlICdkYXRlJzoge1xuICAgICAgICAgIGNvbHVtbi5jZWxsID0gcm93SW5kZXggPT4gRGF0ZVR5cGUudmFsUmVuZGVyKHJvd0luZGV4LCBwcm9wcy5kYXRlRm9ybWF0LCBiYXNlVmFsdWVSZW5kZXIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNoYW5nZSB2YWxSZW5kZXJzIHRvIGp1c3QgdGFrZSBwcm9wcyAtLT4gc2F2ZXMgc29tZSAnZW5lcmd5J1xuICAgICAgICBjYXNlICdjdXJyZW5jeSc6IHtcbiAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IEN1cnJlbmN5VHlwZS52YWxSZW5kZXIoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBwcm9wcy5kYXRhLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICBwcm9wcy50aG91c2FuZFNlcGFyYXRvcixcbiAgICAgICAgICAgIHByb3BzLmRlY2ltYWxTZXBhcmF0b3IsXG4gICAgICAgICAgICBiYXNlVmFsdWVSZW5kZXIsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICBjb2x1bW4uY2VsbCA9IHJvd0luZGV4ID0+IGJhc2VWYWx1ZVJlbmRlcihyb3dJbmRleCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gY2VsbEVkaXQgcmVuZGVyXG4gICAgaWYgKGNvbC5jZWxsRWRpdCkge1xuICAgICAgY29sdW1uLmNlbGxFZGl0ID0gY29sLmNlbGxFZGl0O1xuICAgIH0gZWxzZSBpZiAoY29sLmVkaXRWYWx1ZVJlbmRlcikge1xuICAgICAgY29sdW1uLmNlbGxFZGl0ID0gKHJvd0luZGV4LCBzZXRSZWYsIG9uS2V5RG93bikgPT4gY29sLmVkaXRWYWx1ZVJlbmRlcihcbiAgICAgICAgcHJvcHMuZGF0YS5nZXQocm93SW5kZXgpLFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgc2V0UmVmLFxuICAgICAgICBvbktleURvd24sXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIGNlbGxDcmVhdGUgcmVuZGVyXG4gICAgaWYgKGNvbC5jZWxsQ3JlYXRlKSB7XG4gICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IGNvbC5jZWxsQ3JlYXRlO1xuICAgIH0gZWxzZSBpZiAoY29sLmNyZWF0ZVZhbHVlUmVuZGVyKSB7XG4gICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IChyb3dJbmRleCwgc2V0UmVmLCBvbktleURvd24pID0+IGNvbC5jcmVhdGVWYWx1ZVJlbmRlcihcbiAgICAgICAgcHJvcHMuZGF0YS5nZXQocm93SW5kZXgpLFxuICAgICAgICByb3dJbmRleCxcbiAgICAgICAgc2V0UmVmLFxuICAgICAgICBvbktleURvd24sXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIGNlbGxGaWx0ZXIgcmVuZGVyXG4gICAgaWYgKGNvbC5jZWxsRmlsdGVyKSB7XG4gICAgICBjb2x1bW4uY2VsbEZpbHRlciA9IGNvbC5jZWxsRmlsdGVyO1xuICAgIH0gZWxzZSBpZiAoY29sLmZpbHRlclZhbHVlUmVuZGVyKSB7XG4gICAgICBjb2x1bW4uY2VsbEZpbHRlciA9IHJvd0luZGV4ID0+IGNvbC5maWx0ZXJWYWx1ZVJlbmRlcihwcm9wcy5kYXRhLmdldChyb3dJbmRleCksIHJvd0luZGV4KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbHVtbjtcbiAgfSxcblxuICBjb2x1bW5Db21wb25lbnRUeXBlKGJhc2VDb2x1bW4sIHRhYkluZGV4LCBwcm9wcywgY29sLCBmdW5jdGlvbnMsIGdldERpc2FibGVkU3RhdGUpIHtcbiAgICBpZiAoIWNvbC5jb21wb25lbnRUeXBlKSByZXR1cm4gYmFzZUNvbHVtbjtcbiAgICBjb25zdCBjb2x1bW4gPSBiYXNlQ29sdW1uO1xuICAgIGNvbnN0IGVkaXRWYWx1ZVBhcnNlciA9IGNvbC5lZGl0VmFsdWVQYXJzZXIgPyBjb2wuZWRpdFZhbHVlUGFyc2VyIDogdmFsID0+IHZhbDtcbiAgICAvLyBHcmlkIGludGVybmFsIGZ1bmN0aW9ucyBzZXBhcmF0ZWRcbiAgICBjb25zdCBlZGl0RnVuY3Rpb25zID0geyAuLi5mdW5jdGlvbnMuZWRpdCB9O1xuICAgIGNvbnN0IGNyZWF0ZUZ1bmN0aW9ucyA9IHsgLi4uZnVuY3Rpb25zLmNyZWF0ZSB9O1xuICAgIGNvbnN0IGZpbHRlckZ1bmN0aW9ucyA9IHsgLi4uZnVuY3Rpb25zLmZpbHRlciB9O1xuICAgIHN3aXRjaCAoY29sLmNvbXBvbmVudFR5cGUpIHtcbiAgICAgIGNhc2UgJ2N1cnJlbmN5JzpcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICd0ZXh0Jzoge1xuICAgICAgICBjb25zdCBmb3JtQ29udHJvbFR5cGUgPSBjb2wuY29tcG9uZW50VHlwZSA9PT0gJ2Zsb2F0JyB8fCBjb2wuY29tcG9uZW50VHlwZSA9PT0gJ251bWJlcidcbiAgICAgICAgICA/ICd0ZXh0J1xuICAgICAgICAgIDogY29sLmNvbXBvbmVudFR5cGU7XG4gICAgICAgIC8vIGFsd2F5cyB1c2UgY29sLmVkaXRWYWx1ZVBhcnNlciBvdmVycmlkZSBpZiBhdmFpbGFibGVcbiAgICAgICAgY29uc3QgcHJpbWl0aXZlVmFsUGFyc2VyID0gIWNvbC5lZGl0VmFsdWVQYXJzZXIgJiYgY29sLmNvbXBvbmVudFR5cGUgPT09ICdmbG9hdCdcbiAgICAgICAgICA/IHZhbCA9PiB2YWwucmVwbGFjZShuZXcgUmVnRXhwKGBbXlxcXFxkJHtwcm9wcy5kZWNpbWFsU2VwYXJhdG9yfSstXWAsICdnJyksICcnKVxuICAgICAgICAgIDogZWRpdFZhbHVlUGFyc2VyO1xuXG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiBQcmltaXRpdmVUeXBlLmNlbGxFZGl0KFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBwcmltaXRpdmVWYWxQYXJzZXIsXG4gICAgICAgICAgICBmb3JtQ29udHJvbFR5cGUsXG4gICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiBQcmltaXRpdmVUeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHByaW1pdGl2ZVZhbFBhcnNlcixcbiAgICAgICAgICAgIGZvcm1Db250cm9sVHlwZSxcbiAgICAgICAgICAgIC4uLmNyZWF0ZUZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wcy5maWx0ZXJpbmcgJiYgIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiBQcmltaXRpdmVUeXBlLmNlbGxGaWx0ZXIoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBwcmltaXRpdmVWYWxQYXJzZXIsXG4gICAgICAgICAgICBmb3JtQ29udHJvbFR5cGUsXG4gICAgICAgICAgICAuLi5maWx0ZXJGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSAnY2hlY2tib3gnOiB7XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiBDaGVja2JveFR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IENoZWNrYm94VHlwZS5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICAuLi5jcmVhdGVGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuZmlsdGVyaW5nICYmICFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT4gQ2hlY2tib3hUeXBlLmNlbGxGaWx0ZXIoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBwcm9wcy5pbnRsLFxuICAgICAgICAgICAgLi4uZmlsdGVyRnVuY3Rpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ211bHRpc2VsZWN0Jzoge1xuICAgICAgICBjb25zdCBzZWxlY3RPcHRpb25zID0gY29sLnNlbGVjdENvbXBvbmVudE9wdGlvbnNcbiAgICAgICAgICB8fCBwcm9wcy5zZWxlY3RDb21wb25lbnRPcHRpb25zLmdldChjb2x1bW4uY29sdW1uS2V5KTtcbiAgICAgICAgY29uc3Qgc2VsZWN0VHJhbnNsYXRpb25zID0gY29sLnNlbGVjdENvbXBvbmVudFRyYW5zbGF0aW9ucyB8fCB7XG4gICAgICAgICAgcGxhY2Vob2xkZXI6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5TZWxlY3QnIH0pLFxuICAgICAgICAgIG5vUmVzdWx0c1RleHQ6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5Ob1Jlc3VsdHMnIH0pLFxuICAgICAgICAgIC8vIFZhcmlhYmxlICduJyBtdXN0IGJlIHByb3ZpZGVkIGluIHRoaXMgcGhhc2UgaW4gb3JkZXIgdG8gYXZvaWRcbiAgICAgICAgICAvLyBFcnJvcjogVGhlIGludGwgc3RyaW5nIGNvbnRleHQgdmFyaWFibGUgJ24nIHdhcyBub3QgcHJvdmlkZWQgdG8gdGhlIHN0cmluZyB7bn1cbiAgICAgICAgICAvLyBzZWxlY3RlZFxuICAgICAgICAgIC8vIFZhcmlhYmxlIG4gaXMgcmVwbGFjZWQgbGF0ZXIsIHdoZW4gaXRzIHZhbHVlIGlzIGF2YWlsYWJsZVxuICAgICAgICAgIHNlbGVjdGVkOiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuRmxvYXRpbmdTZWxlY3QuU2VsZWN0ZWQnIH0sIHsgbjogJzxuPicgfSksXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IFNlbGVjdFR5cGUuY2VsbEVkaXQoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5lZGl0RnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbENyZWF0ZSkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsQ3JlYXRlID0gcm93SW5kZXggPT4gU2VsZWN0VHlwZS5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uY3JlYXRlRnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5maWx0ZXJpbmcgJiYgIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiBNdWx0aVNlbGVjdFR5cGUuY2VsbEZpbHRlcihcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5maWx0ZXJGdW5jdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSAnc2VsZWN0Jzoge1xuICAgICAgICBjb25zdCBzZWxlY3RPcHRpb25zID0gY29sLnNlbGVjdENvbXBvbmVudE9wdGlvbnNcbiAgICAgICAgICB8fCBwcm9wcy5zZWxlY3RDb21wb25lbnRPcHRpb25zLmdldChjb2x1bW4uY29sdW1uS2V5KTtcbiAgICAgICAgY29uc3Qgc2VsZWN0VHJhbnNsYXRpb25zID0gY29sLnNlbGVjdENvbXBvbmVudFRyYW5zbGF0aW9ucyB8fCB7XG4gICAgICAgICAgcGxhY2Vob2xkZXI6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5TZWxlY3QnIH0pLFxuICAgICAgICAgIG5vUmVzdWx0c1RleHQ6IHByb3BzLmludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5GbG9hdGluZ1NlbGVjdC5Ob1Jlc3VsdHMnIH0pLFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiBTZWxlY3RUeXBlLmNlbGxFZGl0KFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uZWRpdEZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IFNlbGVjdFR5cGUuY2VsbENyZWF0ZShcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmNyZWF0ZUZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuZmlsdGVyaW5nICYmICFjb2x1bW4uY2VsbEZpbHRlcikge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRmlsdGVyID0gKCkgPT4gU2VsZWN0VHlwZS5jZWxsRmlsdGVyKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9ucyxcbiAgICAgICAgICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmZpbHRlckZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlICdib29sZWFuJzoge1xuICAgICAgICBjb25zdCBzZWxlY3RPcHRpb25zID0gW1xuICAgICAgICAgIHsgdmFsdWU6IHRydWUsIGxhYmVsOiBwcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuWWVzJyB9KSB9LFxuICAgICAgICAgIHsgdmFsdWU6IGZhbHNlLCBsYWJlbDogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLk5vJyB9KSB9LFxuICAgICAgICBdO1xuICAgICAgICBjb25zdCBzZWxlY3RUcmFuc2xhdGlvbnMgPSBjb2wuc2VsZWN0Q29tcG9uZW50VHJhbnNsYXRpb25zIHx8IHtcbiAgICAgICAgICBwbGFjZWhvbGRlcjogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0LlNlbGVjdCcgfSksXG4gICAgICAgICAgbm9SZXN1bHRzVGV4dDogcHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLkZsb2F0aW5nU2VsZWN0Lk5vUmVzdWx0cycgfSksXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsRWRpdCkge1xuICAgICAgICAgIGNvbHVtbi5jZWxsRWRpdCA9IHJvd0luZGV4ID0+IEJvb2xlYW5UeXBlLmNlbGxFZGl0KFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uZWRpdEZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGdldERpc2FibGVkU3RhdGUsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMuaW5saW5lRWRpdCAmJiAhY29sdW1uLmNlbGxDcmVhdGUpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbENyZWF0ZSA9IHJvd0luZGV4ID0+IEJvb2xlYW5UeXBlLmNlbGxDcmVhdGUoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICAgIHRhYkluZGV4LFxuICAgICAgICAgICAgcHJvcHMuZ3JpZC5pZCxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgICAgICAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAgICAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgICAgICAgICAuLi5jcmVhdGVGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmZpbHRlcmluZyAmJiAhY29sdW1uLmNlbGxGaWx0ZXIpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEZpbHRlciA9ICgpID0+IEJvb2xlYW5UeXBlLmNlbGxGaWx0ZXIoXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBzZWxlY3RPcHRpb25zLFxuICAgICAgICAgICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uZmlsdGVyRnVuY3Rpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ2RhdGUnOiB7XG4gICAgICAgIGlmIChwcm9wcy5pbmxpbmVFZGl0ICYmICFjb2x1bW4uY2VsbEVkaXQpIHtcbiAgICAgICAgICBjb2x1bW4uY2VsbEVkaXQgPSByb3dJbmRleCA9PiBEYXRlVHlwZS5jZWxsRWRpdChcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgcHJvcHMucmVnaW9uLFxuICAgICAgICAgICAgcHJvcHMuZGF0ZUZvcm1hdCxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmVkaXRGdW5jdGlvbnMsXG4gICAgICAgICAgICBnZXREaXNhYmxlZFN0YXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmlubGluZUVkaXQgJiYgIWNvbHVtbi5jZWxsQ3JlYXRlKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxDcmVhdGUgPSByb3dJbmRleCA9PiBEYXRlVHlwZS5jZWxsQ3JlYXRlKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgICB0YWJJbmRleCxcbiAgICAgICAgICAgIHByb3BzLmdyaWQuaWQsXG4gICAgICAgICAgICBwcm9wcy5yZWdpb24sXG4gICAgICAgICAgICBwcm9wcy5kYXRlRm9ybWF0LFxuICAgICAgICAgICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgICAgICAgICAgLi4uY3JlYXRlRnVuY3Rpb25zLFxuICAgICAgICAgICAgZ2V0RGlzYWJsZWRTdGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5maWx0ZXJpbmcgJiYgIWNvbHVtbi5jZWxsRmlsdGVyKSB7XG4gICAgICAgICAgY29sdW1uLmNlbGxGaWx0ZXIgPSAoKSA9PiBEYXRlVHlwZS5jZWxsRmlsdGVyKFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgICAgdGFiSW5kZXgsXG4gICAgICAgICAgICBwcm9wcy5ncmlkLmlkLFxuICAgICAgICAgICAgcHJvcHMucmVnaW9uLFxuICAgICAgICAgICAgcHJvcHMuZGF0ZUZvcm1hdCxcbiAgICAgICAgICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICAgICAgICAgIC4uLmZpbHRlckZ1bmN0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBkZWZhdWx0OlxuICAgIH1cbiAgICByZXR1cm4gY29sdW1uO1xuICB9LFxufTtcbiJdfQ==