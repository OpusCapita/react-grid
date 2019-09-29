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

    var fsProps = _extends({
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
    }, selectTranslations, {}, col.filterComponentProps);

    return column.virtualized ? _react["default"].createElement(_reactFloatingSelect.FloatingSelectInfinite, fsProps) : _react["default"].createElement(_reactFloatingSelect.FloatingSelectPortal, fsProps);
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2VydmljZS9jb2x1bW4tdHlwZXMvbXVsdGlzZWxlY3QtcmVuZGVyZXJzLmpzeCJdLCJuYW1lcyI6WyJNdWx0aVZhbHVlQ29udGFpbmVyIiwibGFiZWwiLCJvcHRpb25zQ291bnQiLCJwcm9wZXJ0aWVzIiwic2VsZWN0UHJvcHMiLCJ2YWx1ZSIsImZpbmRJbmRleCIsInNlbGVjdFByb3AiLCJkYXRhIiwicmVwbGFjZSIsImxlbmd0aCIsInZhbFJlbmRlciIsImNvbCIsImNvbHVtbiIsInJvd0luZGV4IiwiZ3JpZElkIiwic2VsZWN0T3B0aW9ucyIsInZhbHVlUmVuZGVyIiwidmFsdWVzIiwidmFscyIsIkFycmF5IiwiaXNBcnJheSIsIkxpc3QiLCJpc0xpc3QiLCJzaXplIiwib3B0aW9uIiwiZmluZCIsIm8iLCJnZXQiLCJzZWxlY3RlZFRleHQiLCJ0cmFuc2xhdGlvbnMiLCJpdGVtc1NlbGVjdGVkIiwidmFsdWVUZXh0IiwiaXNNdWx0aXNlbGVjdFRvb2x0aXBEaXNhYmxlZCIsImNvbHVtbktleSIsInRleHRBbGlnbiIsImZpbHRlciIsImluY2x1ZGVzIiwibWFwIiwidiIsImNlbGxGaWx0ZXIiLCJ0YWJJbmRleCIsInNlbGVjdFRyYW5zbGF0aW9ucyIsImVkaXRWYWx1ZVBhcnNlciIsImZ1bmN0aW9ucyIsIm9wdGlvbnMiLCJmaWx0ZXJTZWxlY3RPcHRpb25zTW9kIiwic2xpY2UiLCJnZXRJdGVtTXVsdGlWYWx1ZSIsImZzUHJvcHMiLCJjb21wb25lbnRzIiwic2VsZWN0ZWQiLCJoaWRlU2VsZWN0ZWRPcHRpb25zIiwiaXNTZWFyY2hhYmxlIiwiaXNDbGVhcmFibGUiLCJpc011bHRpIiwibmFtZSIsIm9uQ2hhbmdlIiwib25DZWxsTXVsdGlWYWx1ZUNoYW5nZSIsIm9uQmx1ciIsIm9uQ2VsbE11bHRpVmFsdWVCbHVyIiwidGFiU2VsZWN0c1ZhbHVlIiwiY2xvc2VNZW51T25TZWxlY3QiLCJm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TyxFQUFFLElBUkU7QUFTWEMsTUFBQUEsSUFBSSw2QkFBMkJ6QyxNQUEzQixTQUFxQ0YsTUFBTSxDQUFDcUIsU0FUckM7QUFVWHVCLE1BQUFBLFFBQVEsRUFBRWIsU0FBUyxDQUFDYyxzQkFBVixDQUFpQzlDLEdBQWpDLEVBQXNDK0IsZUFBdEMsQ0FWQztBQVdYZ0IsTUFBQUEsTUFBTSxFQUFFZixTQUFTLENBQUNnQixvQkFBVixDQUErQmhELEdBQS9CLENBWEc7QUFZWGlDLE1BQUFBLE9BQU8sRUFBUEEsT0FaVztBQWFYZ0IsTUFBQUEsZUFBZSxFQUFFLEtBYk47QUFjWHBCLE1BQUFBLFFBQVEsRUFBUkEsUUFkVztBQWVYcEMsTUFBQUEsS0FBSyxFQUFMQSxLQWZXO0FBZ0JYeUQsTUFBQUEsaUJBQWlCLEVBQUU7QUFoQlIsT0FpQlJwQixrQkFqQlEsTUFrQlI5QixHQUFHLENBQUNtRCxvQkFsQkksQ0FBYjs7QUFvQkEsV0FBT2xELE1BQU0sQ0FBQ21ELFdBQVAsR0FDSCxnQ0FBQywyQ0FBRCxFQUE0QmYsT0FBNUIsQ0FERyxHQUVILGdDQUFDLHlDQUFELEVBQTBCQSxPQUExQixDQUZKO0FBR0Q7QUFuR1ksQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBmcm9tSlMsIExpc3QgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IHsgT3ZlcmxheVRyaWdnZXIsIFRvb2x0aXAgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IHsgRmxvYXRpbmdTZWxlY3RJbmZpbml0ZSwgRmxvYXRpbmdTZWxlY3RQb3J0YWwgfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1mbG9hdGluZy1zZWxlY3QnO1xuXG4vLyBUT0RPOiBjZWxsQ3JlYXRlLCBjZWxsRWRpdCByZW5kZXJlcnMgLT4gbXVsdGlzZWxlY3QgZHJvcGRvd24gYXMgY2VsbEZpbHRlciBoYXNcblxuY29uc3QgTXVsdGlWYWx1ZUNvbnRhaW5lciA9IChsYWJlbCwgb3B0aW9uc0NvdW50KSA9PiBwcm9wZXJ0aWVzID0+IChwcm9wZXJ0aWVzLnNlbGVjdFByb3BzLnZhbHVlXG4gICYmIHByb3BlcnRpZXMuc2VsZWN0UHJvcHMudmFsdWUuZmluZEluZGV4KFxuICAgIHNlbGVjdFByb3AgPT4gc2VsZWN0UHJvcC52YWx1ZSA9PT0gcHJvcGVydGllcy5kYXRhLnZhbHVlLFxuICApID09PSAwID8gKFxuICAgIDxzcGFuPntsYWJlbC5yZXBsYWNlKCc8bj4nLCBgKCR7cHJvcGVydGllcy5zZWxlY3RQcm9wcy52YWx1ZS5sZW5ndGh9LyR7b3B0aW9uc0NvdW50fSlgKX08L3NwYW4+XG4gICkgOiBudWxsKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB2YWxSZW5kZXIoXG4gICAgY29sLFxuICAgIGNvbHVtbixcbiAgICByb3dJbmRleCxcbiAgICBncmlkSWQsXG4gICAgc2VsZWN0T3B0aW9ucyA9IFtdLFxuICAgIHZhbHVlUmVuZGVyLFxuICApIHtcbiAgICByZXR1cm4gdmFsdWVSZW5kZXIocm93SW5kZXgsICh2YWx1ZXMpID0+IHtcbiAgICAgIC8vIG5vcm1hbGl6ZSB2YWx1ZXMgYXMgSW1tdXRhYmxlIExpc3RcbiAgICAgIGxldCB2YWxzID0gdmFsdWVzO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWVzKSkge1xuICAgICAgICB2YWxzID0gZnJvbUpTKHZhbHVlcyk7XG4gICAgICB9XG4gICAgICBpZiAoIUxpc3QuaXNMaXN0KHZhbHMpKSB7XG4gICAgICAgIHZhbHMgPSBmcm9tSlMoW3ZhbHVlc10pO1xuICAgICAgfVxuICAgICAgLy8gTm8gaXRlbXMgcmV0dXJuIGVtcHR5IHN0cmluZ1xuICAgICAgaWYgKCF2YWxzLnNpemUpIHJldHVybiAnJztcbiAgICAgIC8vIElmIG9ubHkgb25lIGlzIHNlbGVjdGVkIHJlbmRlciB2YWx1ZSBub3JtYWxseVxuICAgICAgaWYgKHZhbHMuc2l6ZSA9PT0gMSkge1xuICAgICAgICBjb25zdCBvcHRpb24gPSBzZWxlY3RPcHRpb25zLmZpbmQobyA9PiBvLnZhbHVlID09PSB2YWxzLmdldCgwKSk7XG4gICAgICAgIHJldHVybiBvcHRpb24gPyBvcHRpb24ubGFiZWwgOiBudWxsO1xuICAgICAgfVxuICAgICAgLy8gTXVsdGlwbGUgdmFsdWVzIHNlbGVjdGVkLCByZW5kZXIgJzMgc2VsZWN0ZWQnXG4gICAgICBjb25zdCBzZWxlY3RlZFRleHQgPSAoY29sLnRyYW5zbGF0aW9ucyAmJiBjb2wudHJhbnNsYXRpb25zLml0ZW1zU2VsZWN0ZWQpIHx8ICdzZWxlY3RlZCc7XG4gICAgICBjb25zdCB2YWx1ZVRleHQgPSAoXG4gICAgICAgIDxzcGFuPlxuICAgICAgICAgIHtgJHt2YWxzLnNpemV9ICR7c2VsZWN0ZWRUZXh0fWB9XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICk7XG4gICAgICAvLyB3aXRob3V0IHRvb2x0aXBcbiAgICAgIGlmIChjb2wuaXNNdWx0aXNlbGVjdFRvb2x0aXBEaXNhYmxlZCkge1xuICAgICAgICByZXR1cm4gdmFsdWVUZXh0O1xuICAgICAgfVxuICAgICAgLy8gd2l0aCB0b29sdGlwXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8T3ZlcmxheVRyaWdnZXJcbiAgICAgICAgICBwbGFjZW1lbnQ9XCJ0b3BcIlxuICAgICAgICAgIG92ZXJsYXk9eyhcbiAgICAgICAgICAgIDxUb29sdGlwIGlkPXtgb2NEYXRhZ3JpZE11bHRpc2VsZWN0VG9vbHRpcC0ke2dyaWRJZH0tJHtjb2x1bW4uY29sdW1uS2V5fS0ke3Jvd0luZGV4fWB9PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHRleHRBbGlnbjogJ2xlZnQnIH19PlxuICAgICAgICAgICAgICAgIHtzZWxlY3RPcHRpb25zLmZpbHRlcihvID0+IHZhbHMuaW5jbHVkZXMoby52YWx1ZSkpLm1hcCh2ID0+IChcbiAgICAgICAgICAgICAgICAgIDxSZWFjdC5GcmFnbWVudCBrZXk9e3YudmFsdWV9PlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICB7di5sYWJlbH1cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8YnIgLz5cbiAgICAgICAgICAgICAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9Ub29sdGlwPlxuICAgICAgICAgICl9XG4gICAgICAgICAgZGVsYXk9ezUwMH1cbiAgICAgICAgPlxuICAgICAgICAgIHt2YWx1ZVRleHR9XG4gICAgICAgIDwvT3ZlcmxheVRyaWdnZXI+XG4gICAgICApO1xuICAgIH0pO1xuICB9LFxuICBjZWxsRmlsdGVyKFxuICAgIGNvbCxcbiAgICBjb2x1bW4sXG4gICAgdGFiSW5kZXgsXG4gICAgZ3JpZElkLFxuICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICBmdW5jdGlvbnMsXG4gICkge1xuICAgIGNvbnN0IG9wdGlvbnMgPSBjb2wuZmlsdGVyU2VsZWN0T3B0aW9uc01vZCAmJiBzZWxlY3RPcHRpb25zXG4gICAgICA/IGNvbC5maWx0ZXJTZWxlY3RPcHRpb25zTW9kKHNlbGVjdE9wdGlvbnMuc2xpY2UoKSwgY29sKVxuICAgICAgOiBzZWxlY3RPcHRpb25zO1xuICAgIGNvbnN0IHZhbHVlID0gZnVuY3Rpb25zLmdldEl0ZW1NdWx0aVZhbHVlKGNvbCk7XG5cbiAgICBjb25zdCBmc1Byb3BzID0ge1xuICAgICAgY29tcG9uZW50czoge1xuICAgICAgICBNdWx0aVZhbHVlQ29udGFpbmVyOiBNdWx0aVZhbHVlQ29udGFpbmVyKHNlbGVjdFRyYW5zbGF0aW9ucy5zZWxlY3RlZCxcbiAgICAgICAgICAob3B0aW9ucyB8fCBbXSkubGVuZ3RoKSxcbiAgICAgIH0sXG4gICAgICBoaWRlU2VsZWN0ZWRPcHRpb25zOiBmYWxzZSxcbiAgICAgIGlzU2VhcmNoYWJsZTogc2VsZWN0T3B0aW9ucyAmJiBzZWxlY3RPcHRpb25zLmxlbmd0aCA+IDksXG4gICAgICBpc0NsZWFyYWJsZTogdHJ1ZSxcbiAgICAgIGlzTXVsdGk6IHRydWUsXG4gICAgICBuYW1lOiBgb2NEYXRhZ3JpZEZpbHRlcklucHV0LSR7Z3JpZElkfS0ke2NvbHVtbi5jb2x1bW5LZXl9YCxcbiAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbnMub25DZWxsTXVsdGlWYWx1ZUNoYW5nZShjb2wsIGVkaXRWYWx1ZVBhcnNlciksXG4gICAgICBvbkJsdXI6IGZ1bmN0aW9ucy5vbkNlbGxNdWx0aVZhbHVlQmx1cihjb2wpLFxuICAgICAgb3B0aW9ucyxcbiAgICAgIHRhYlNlbGVjdHNWYWx1ZTogZmFsc2UsXG4gICAgICB0YWJJbmRleCxcbiAgICAgIHZhbHVlLFxuICAgICAgY2xvc2VNZW51T25TZWxlY3Q6IGZhbHNlLFxuICAgICAgLi4uc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgLi4uY29sLmZpbHRlckNvbXBvbmVudFByb3BzLFxuICAgIH07XG4gICAgcmV0dXJuIGNvbHVtbi52aXJ0dWFsaXplZFxuICAgICAgPyA8RmxvYXRpbmdTZWxlY3RJbmZpbml0ZSB7Li4uZnNQcm9wc30gLz5cbiAgICAgIDogPEZsb2F0aW5nU2VsZWN0UG9ydGFsIHsuLi5mc1Byb3BzfSAvPjtcbiAgfSxcbn07XG4iXX0=