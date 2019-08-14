"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _immutable = require("immutable");

var _reactBootstrap = require("react-bootstrap");

var _reactFloatingSelect = require("@opuscapita/react-floating-select");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// TODO: cellCreate, cellEdit renderers -> multiselect dropdown as cellFilter has
var MultiValueContainer = function MultiValueContainer(label, optionsCount) {
  return function (properties) {
    return properties.selectProps.value && properties.selectProps.value.findIndex(function (selectProp) {
      return selectProp.value === properties.data.value;
    }) === 0 ? _react["default"].createElement("span", null, label.replace('<n>', "(" + properties.selectProps.value.length + "/" + optionsCount + ")")) : null;
  };
};

var _default = {
  valRender: function valRender(col, column, rowIndex, gridId, selectOptions, valueRender) {
    if (selectOptions === void 0) {
      selectOptions = [];
    }

    return valueRender(rowIndex, function (values) {
      // normalize values as Immutable List
      var vals = values;

      if (Array.isArray(values)) {
        vals = (0, _immutable.fromJS)(values);
      }

      if (!_immutable.List.isList(vals)) {
        vals = (0, _immutable.fromJS)([values]);
      } // No items return empty string


      if (!vals.size) return ''; // If only one is selected render value normally

      if (vals.size === 1) {
        var option = selectOptions.find(function (o) {
          return o.value === vals.get(0);
        });
        return option ? option.label : null;
      } // Multiple values selected, render '3 selected'


      var selectedText = col.translations && col.translations.itemsSelected || 'selected';

      var valueText = _react["default"].createElement("span", null, vals.size + " " + selectedText); // without tooltip


      if (col.isMultiselectTooltipDisabled) {
        return valueText;
      } // with tooltip


      return _react["default"].createElement(_reactBootstrap.OverlayTrigger, {
        placement: "top",
        overlay: _react["default"].createElement(_reactBootstrap.Tooltip, {
          id: "ocDatagridMultiselectTooltip-" + gridId + "-" + column.columnKey + "-" + rowIndex
        }, _react["default"].createElement("div", {
          style: {
            textAlign: 'left'
          }
        }, selectOptions.filter(function (o) {
          return vals.includes(o.value);
        }).map(function (v) {
          return _react["default"].createElement(_react["default"].Fragment, {
            key: v.value
          }, _react["default"].createElement("span", null, v.label), _react["default"].createElement("br", null));
        }))),
        delay: 500
      }, valueText);
    });
  },
  cellFilter: function cellFilter(col, column, tabIndex, gridId, selectOptions, selectTranslations, editValueParser, functions) {
    var options = col.filterSelectOptionsMod && selectOptions ? col.filterSelectOptionsMod(selectOptions.slice(), col) : selectOptions;
    var value = functions.getItemMultiValue(col);

    var fsProps = _extends({}, col.filterComponentProps, selectTranslations, {
      components: {
        MultiValueContainer: MultiValueContainer(selectTranslations.selected, (options || []).length)
      },
      hideSelectedOptions: false,
      isSearchable: selectOptions && selectOptions.length > 9,
      isClearable: true,
      isMulti: true,
      name: "ocDatagridFilterInput-" + gridId + "-" + column.columnKey,
      onChange: functions.onCellMultiValueChange(col, editValueParser),
      onBlur: functions.onCellMultiValueBlur(col),
      options: options,
      tabSelectsValue: false,
      tabIndex: tabIndex,
      value: value,
      closeMenuOnSelect: false
    });

    return column.virtualized ? _react["default"].createElement(_reactFloatingSelect.FloatingSelectInfinite, fsProps) : _react["default"].createElement(_reactFloatingSelect.FloatingSelectPortal, fsProps);
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2VydmljZS9jb2x1bW4tdHlwZXMvbXVsdGlzZWxlY3QtcmVuZGVyZXJzLmpzeCJdLCJuYW1lcyI6WyJNdWx0aVZhbHVlQ29udGFpbmVyIiwibGFiZWwiLCJvcHRpb25zQ291bnQiLCJwcm9wZXJ0aWVzIiwic2VsZWN0UHJvcHMiLCJ2YWx1ZSIsImZpbmRJbmRleCIsInNlbGVjdFByb3AiLCJkYXRhIiwicmVwbGFjZSIsImxlbmd0aCIsInZhbFJlbmRlciIsImNvbCIsImNvbHVtbiIsInJvd0luZGV4IiwiZ3JpZElkIiwic2VsZWN0T3B0aW9ucyIsInZhbHVlUmVuZGVyIiwidmFsdWVzIiwidmFscyIsIkFycmF5IiwiaXNBcnJheSIsIkxpc3QiLCJpc0xpc3QiLCJzaXplIiwib3B0aW9uIiwiZmluZCIsIm8iLCJnZXQiLCJzZWxlY3RlZFRleHQiLCJ0cmFuc2xhdGlvbnMiLCJpdGVtc1NlbGVjdGVkIiwidmFsdWVUZXh0IiwiaXNNdWx0aXNlbGVjdFRvb2x0aXBEaXNhYmxlZCIsImNvbHVtbktleSIsInRleHRBbGlnbiIsImZpbHRlciIsImluY2x1ZGVzIiwibWFwIiwidiIsImNlbGxGaWx0ZXIiLCJ0YWJJbmRleCIsInNlbGVjdFRyYW5zbGF0aW9ucyIsImVkaXRWYWx1ZVBhcnNlciIsImZ1bmN0aW9ucyIsIm9wdGlvbnMiLCJmaWx0ZXJTZWxlY3RPcHRpb25zTW9kIiwic2xpY2UiLCJnZXRJdGVtTXVsdGlWYWx1ZSIsImZzUHJvcHMiLCJmaWx0ZXJDb21wb25lbnRQcm9wcyIsImNvbXBvbmVudHMiLCJzZWxlY3RlZCIsImhpZGVTZWxlY3RlZE9wdGlvbnMiLCJpc1NlYXJjaGFibGUiLCJpc0NsZWFyYWJsZSIsImlzTXVsdGkiLCJuYW1lIiwib25DaGFuZ2UiLCJvbkNlbGxNdWx0aVZhbHVlQ2hhbmdlIiwib25CbHVyIiwib25DZWxsTXVsdGlWYWx1ZUJsdXIiLCJ0YWJTZWxlY3RzVmFsdWUi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QyxNQUFBQSxXQUFXLEVBQUUsSUFURjtBQVVYQyxNQUFBQSxPQUFPLEVBQUUsSUFWRTtBQVdYQyxNQUFBQSxJQUFJLDZCQUEyQjFDLE1BQTNCLFNBQXFDRixNQUFNLENBQUNxQixTQVhyQztBQVlYd0IsTUFBQUEsUUFBUSxFQUFFZCxTQUFTLENBQUNlLHNCQUFWLENBQWlDL0MsR0FBakMsRUFBc0MrQixlQUF0QyxDQVpDO0FBYVhpQixNQUFBQSxNQUFNLEVBQUVoQixTQUFTLENBQUNpQixvQkFBVixDQUErQmpELEdBQS9CLENBYkc7QUFjWGlDLE1BQUFBLE9BQU8sRUFBUEEsT0FkVztBQWVYaUIsTUFBQUEsZUFBZSxFQUFFLEtBZk47QUFnQlhyQixNQUFBQSxRQUFRLEVBQVJBLFFBaEJXO0FBaUJYcEMsTUFBQUEsS0FBSyxFQUFMQSxLQWpCVztBQWtCWDBELE1BQUFBLGlCQUFpQixFQUFFO0FBbEJSLE1BQWI7O0FBb0JBLFdBQU9sRCxNQUFNLENBQUNtRCxXQUFQLEdBQ0gsZ0NBQUMsMkNBQUQsRUFBNEJmLE9BQTVCLENBREcsR0FFSCxnQ0FBQyx5Q0FBRCxFQUEwQkEsT0FBMUIsQ0FGSjtBQUdEO0FBbkdZLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZnJvbUpTLCBMaXN0IH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCB7IE92ZXJsYXlUcmlnZ2VyLCBUb29sdGlwIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCB7IEZsb2F0aW5nU2VsZWN0SW5maW5pdGUsIEZsb2F0aW5nU2VsZWN0UG9ydGFsIH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtZmxvYXRpbmctc2VsZWN0JztcblxuLy8gVE9ETzogY2VsbENyZWF0ZSwgY2VsbEVkaXQgcmVuZGVyZXJzIC0+IG11bHRpc2VsZWN0IGRyb3Bkb3duIGFzIGNlbGxGaWx0ZXIgaGFzXG5cbmNvbnN0IE11bHRpVmFsdWVDb250YWluZXIgPSAobGFiZWwsIG9wdGlvbnNDb3VudCkgPT4gcHJvcGVydGllcyA9PiAocHJvcGVydGllcy5zZWxlY3RQcm9wcy52YWx1ZVxuICAmJiBwcm9wZXJ0aWVzLnNlbGVjdFByb3BzLnZhbHVlLmZpbmRJbmRleChcbiAgICBzZWxlY3RQcm9wID0+IHNlbGVjdFByb3AudmFsdWUgPT09IHByb3BlcnRpZXMuZGF0YS52YWx1ZSxcbiAgKSA9PT0gMCA/IChcbiAgICA8c3Bhbj57bGFiZWwucmVwbGFjZSgnPG4+JywgYCgke3Byb3BlcnRpZXMuc2VsZWN0UHJvcHMudmFsdWUubGVuZ3RofS8ke29wdGlvbnNDb3VudH0pYCl9PC9zcGFuPlxuICApIDogbnVsbCk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdmFsUmVuZGVyKFxuICAgIGNvbCxcbiAgICBjb2x1bW4sXG4gICAgcm93SW5kZXgsXG4gICAgZ3JpZElkLFxuICAgIHNlbGVjdE9wdGlvbnMgPSBbXSxcbiAgICB2YWx1ZVJlbmRlcixcbiAgKSB7XG4gICAgcmV0dXJuIHZhbHVlUmVuZGVyKHJvd0luZGV4LCAodmFsdWVzKSA9PiB7XG4gICAgICAvLyBub3JtYWxpemUgdmFsdWVzIGFzIEltbXV0YWJsZSBMaXN0XG4gICAgICBsZXQgdmFscyA9IHZhbHVlcztcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlcykpIHtcbiAgICAgICAgdmFscyA9IGZyb21KUyh2YWx1ZXMpO1xuICAgICAgfVxuICAgICAgaWYgKCFMaXN0LmlzTGlzdCh2YWxzKSkge1xuICAgICAgICB2YWxzID0gZnJvbUpTKFt2YWx1ZXNdKTtcbiAgICAgIH1cbiAgICAgIC8vIE5vIGl0ZW1zIHJldHVybiBlbXB0eSBzdHJpbmdcbiAgICAgIGlmICghdmFscy5zaXplKSByZXR1cm4gJyc7XG4gICAgICAvLyBJZiBvbmx5IG9uZSBpcyBzZWxlY3RlZCByZW5kZXIgdmFsdWUgbm9ybWFsbHlcbiAgICAgIGlmICh2YWxzLnNpemUgPT09IDEpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9uID0gc2VsZWN0T3B0aW9ucy5maW5kKG8gPT4gby52YWx1ZSA9PT0gdmFscy5nZXQoMCkpO1xuICAgICAgICByZXR1cm4gb3B0aW9uID8gb3B0aW9uLmxhYmVsIDogbnVsbDtcbiAgICAgIH1cbiAgICAgIC8vIE11bHRpcGxlIHZhbHVlcyBzZWxlY3RlZCwgcmVuZGVyICczIHNlbGVjdGVkJ1xuICAgICAgY29uc3Qgc2VsZWN0ZWRUZXh0ID0gKGNvbC50cmFuc2xhdGlvbnMgJiYgY29sLnRyYW5zbGF0aW9ucy5pdGVtc1NlbGVjdGVkKSB8fCAnc2VsZWN0ZWQnO1xuICAgICAgY29uc3QgdmFsdWVUZXh0ID0gKFxuICAgICAgICA8c3Bhbj5cbiAgICAgICAgICB7YCR7dmFscy5zaXplfSAke3NlbGVjdGVkVGV4dH1gfVxuICAgICAgICA8L3NwYW4+XG4gICAgICApO1xuICAgICAgLy8gd2l0aG91dCB0b29sdGlwXG4gICAgICBpZiAoY29sLmlzTXVsdGlzZWxlY3RUb29sdGlwRGlzYWJsZWQpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlVGV4dDtcbiAgICAgIH1cbiAgICAgIC8vIHdpdGggdG9vbHRpcFxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPE92ZXJsYXlUcmlnZ2VyXG4gICAgICAgICAgcGxhY2VtZW50PVwidG9wXCJcbiAgICAgICAgICBvdmVybGF5PXsoXG4gICAgICAgICAgICA8VG9vbHRpcCBpZD17YG9jRGF0YWdyaWRNdWx0aXNlbGVjdFRvb2x0aXAtJHtncmlkSWR9LSR7Y29sdW1uLmNvbHVtbktleX0tJHtyb3dJbmRleH1gfT5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyB0ZXh0QWxpZ246ICdsZWZ0JyB9fT5cbiAgICAgICAgICAgICAgICB7c2VsZWN0T3B0aW9ucy5maWx0ZXIobyA9PiB2YWxzLmluY2x1ZGVzKG8udmFsdWUpKS5tYXAodiA9PiAoXG4gICAgICAgICAgICAgICAgICA8UmVhY3QuRnJhZ21lbnQga2V5PXt2LnZhbHVlfT5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAge3YubGFiZWx9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGJyIC8+XG4gICAgICAgICAgICAgICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvVG9vbHRpcD5cbiAgICAgICAgICApfVxuICAgICAgICAgIGRlbGF5PXs1MDB9XG4gICAgICAgID5cbiAgICAgICAgICB7dmFsdWVUZXh0fVxuICAgICAgICA8L092ZXJsYXlUcmlnZ2VyPlxuICAgICAgKTtcbiAgICB9KTtcbiAgfSxcbiAgY2VsbEZpbHRlcihcbiAgICBjb2wsXG4gICAgY29sdW1uLFxuICAgIHRhYkluZGV4LFxuICAgIGdyaWRJZCxcbiAgICBzZWxlY3RPcHRpb25zLFxuICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgZnVuY3Rpb25zLFxuICApIHtcbiAgICBjb25zdCBvcHRpb25zID0gY29sLmZpbHRlclNlbGVjdE9wdGlvbnNNb2QgJiYgc2VsZWN0T3B0aW9uc1xuICAgICAgPyBjb2wuZmlsdGVyU2VsZWN0T3B0aW9uc01vZChzZWxlY3RPcHRpb25zLnNsaWNlKCksIGNvbClcbiAgICAgIDogc2VsZWN0T3B0aW9ucztcbiAgICBjb25zdCB2YWx1ZSA9IGZ1bmN0aW9ucy5nZXRJdGVtTXVsdGlWYWx1ZShjb2wpO1xuXG4gICAgY29uc3QgZnNQcm9wcyA9IHtcbiAgICAgIC4uLmNvbC5maWx0ZXJDb21wb25lbnRQcm9wcyxcbiAgICAgIC4uLnNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgTXVsdGlWYWx1ZUNvbnRhaW5lcjogTXVsdGlWYWx1ZUNvbnRhaW5lcihzZWxlY3RUcmFuc2xhdGlvbnMuc2VsZWN0ZWQsXG4gICAgICAgICAgKG9wdGlvbnMgfHwgW10pLmxlbmd0aCksXG4gICAgICB9LFxuICAgICAgaGlkZVNlbGVjdGVkT3B0aW9uczogZmFsc2UsXG4gICAgICBpc1NlYXJjaGFibGU6IHNlbGVjdE9wdGlvbnMgJiYgc2VsZWN0T3B0aW9ucy5sZW5ndGggPiA5LFxuICAgICAgaXNDbGVhcmFibGU6IHRydWUsXG4gICAgICBpc011bHRpOiB0cnVlLFxuICAgICAgbmFtZTogYG9jRGF0YWdyaWRGaWx0ZXJJbnB1dC0ke2dyaWRJZH0tJHtjb2x1bW4uY29sdW1uS2V5fWAsXG4gICAgICBvbkNoYW5nZTogZnVuY3Rpb25zLm9uQ2VsbE11bHRpVmFsdWVDaGFuZ2UoY29sLCBlZGl0VmFsdWVQYXJzZXIpLFxuICAgICAgb25CbHVyOiBmdW5jdGlvbnMub25DZWxsTXVsdGlWYWx1ZUJsdXIoY29sKSxcbiAgICAgIG9wdGlvbnMsXG4gICAgICB0YWJTZWxlY3RzVmFsdWU6IGZhbHNlLFxuICAgICAgdGFiSW5kZXgsXG4gICAgICB2YWx1ZSxcbiAgICAgIGNsb3NlTWVudU9uU2VsZWN0OiBmYWxzZSxcbiAgICB9O1xuICAgIHJldHVybiBjb2x1bW4udmlydHVhbGl6ZWRcbiAgICAgID8gPEZsb2F0aW5nU2VsZWN0SW5maW5pdGUgey4uLmZzUHJvcHN9IC8+XG4gICAgICA6IDxGbG9hdGluZ1NlbGVjdFBvcnRhbCB7Li4uZnNQcm9wc30gLz47XG4gIH0sXG59O1xuIl19