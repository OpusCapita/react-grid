"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _immutable = require("immutable");

var _reactBootstrap = require("react-bootstrap");

var _reactFloatingSelect = require("@opuscapita/react-floating-select");

var _reactCheckbox = _interopRequireDefault(require("@opuscapita/react-checkbox"));

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
    var opts = col.filterSelectOptionsMod && selectOptions ? col.filterSelectOptionsMod(selectOptions.slice(), col) : selectOptions;
    var value = functions.getItemMultiValue(col);
    var options = opts.map(function (option) {
      return value && value.some(function (o) {
        return option.value === o.value;
      }) ? _extends({}, option, {
        checked: true
      }) : option;
    }); // eslint-disable-next-line react/prop-types

    var Option = function Option(_ref) {
      var _ref$data = _ref.data,
          checked = _ref$data.checked,
          label = _ref$data.label,
          innerProps = _ref.innerProps;
      return _react["default"].createElement("span", innerProps, _react["default"].createElement(_reactCheckbox["default"], {
        onChange: function onChange() {},
        label: label,
        checked: checked
      }));
    };

    var fsProps = _extends({}, col.filterComponentProps, selectTranslations, {
      components: {
        MultiValueContainer: MultiValueContainer(selectTranslations.selected, (options || []).length),
        Option: Option
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

    return _react["default"].createElement(_reactFloatingSelect.FloatingSelectPortal, fsProps);
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2VydmljZS9jb2x1bW4tdHlwZXMvbXVsdGlzZWxlY3QtcmVuZGVyZXJzLmpzeCJdLCJuYW1lcyI6WyJNdWx0aVZhbHVlQ29udGFpbmVyIiwibGFiZWwiLCJvcHRpb25zQ291bnQiLCJwcm9wZXJ0aWVzIiwic2VsZWN0UHJvcHMiLCJ2YWx1ZSIsImZpbmRJbmRleCIsInNlbGVjdFByb3AiLCJkYXRhIiwicmVwbGFjZSIsImxlbmd0aCIsInZhbFJlbmRlciIsImNvbCIsImNvbHVtbiIsInJvd0luZGV4IiwiZ3JpZElkIiwic2VsZWN0T3B0aW9ucyIsInZhbHVlUmVuZGVyIiwidmFsdWVzIiwidmFscyIsIkFycmF5IiwiaXNBcnJheSIsIkxpc3QiLCJpc0xpc3QiLCJzaXplIiwib3B0aW9uIiwiZmluZCIsIm8iLCJnZXQiLCJzZWxlY3RlZFRleHQiLCJ0cmFuc2xhdGlvbnMiLCJpdGVtc1NlbGVjdGVkIiwidmFsdWVUZXh0IiwiaXNNdWx0aXNlbGVjdFRvb2x0aXBEaXNhYmxlZCIsImNvbHVtbktleSIsInRleHRBbGlnbiIsImZpbHRlciIsImluY2x1ZGVzIiwibWFwIiwidiIsImNlbGxGaWx0ZXIiLCJ0YWJJbmRleCIsInNlbGVjdFRyYW5zbGF0aW9ucyIsImVkaXRWYWx1ZVBhcnNlciIsImZ1bmN0aW9ucyIsIm9wdHMiLCJmaWx0ZXJTZWxlY3RPcHRpb25zTW9kIiwic2xpY2UiLCJnZXRJdGVtTXVsdGlWYWx1ZSIsIm9wdGlvbnMiLCJzb21lIiwiY2hlY2tlZCIsIk9wdGlvbiIsImlubmVyUHJvcHMiLCJmc1Byb3BzIiwiZmlsdGVyQ29tcG9uZW50UHJvcHMiLCJjb21wb25lbnRzIiwic2VsZWN0ZWQiLCJoaWRlU2VsZWN0ZWRPcHRpb25zIiwiaXNTZWFyY2hhYmxlIiwiaXNDbGVhcmFibGUiLCJpc011bHRpIiwibmFtZSIsIm9uQ2hhbmdlIiwib25DZWxsTXVsdGlWYWx1ZUNoYW5nZSIsIm9uQmx1ciIsIm9uQ2VsbE11bHRpVmFsdWVCbHVyIiwidGFiU2VsZWN0c1ZhbHVlIiwiY2xvc2VNZW51T25TZWxlY3QiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBO0FBRUEsSUFBTUEsbUJBQW1CLEdBQUcsU0FBdEJBLG1CQUFzQixDQUFDQyxLQUFELEVBQVFDLFlBQVI7QUFBQSxTQUF5QixVQUFBQyxVQUFVO0FBQUEsV0FBS0EsVUFBVSxDQUFDQyxXQUFYLENBQXVCQyxLQUF2QixJQUMvREYsVUFBVSxDQUFDQyxXQUFYLENBQXVCQyxLQUF2QixDQUE2QkMsU0FBN0IsQ0FDRCxVQUFBQyxVQUFVO0FBQUEsYUFBSUEsVUFBVSxDQUFDRixLQUFYLEtBQXFCRixVQUFVLENBQUNLLElBQVgsQ0FBZ0JILEtBQXpDO0FBQUEsS0FEVCxNQUVHLENBSDRELEdBSWhFLDhDQUFPSixLQUFLLENBQUNRLE9BQU4sQ0FBYyxLQUFkLFFBQXlCTixVQUFVLENBQUNDLFdBQVgsQ0FBdUJDLEtBQXZCLENBQTZCSyxNQUF0RCxTQUFnRVIsWUFBaEUsT0FBUCxDQUpnRSxHQUs5RCxJQUx5RDtBQUFBLEdBQW5DO0FBQUEsQ0FBNUI7O2VBT2U7QUFDYlMsRUFBQUEsU0FEYSxxQkFFWEMsR0FGVyxFQUdYQyxNQUhXLEVBSVhDLFFBSlcsRUFLWEMsTUFMVyxFQU1YQyxhQU5XLEVBT1hDLFdBUFcsRUFRWDtBQUFBLFFBRkFELGFBRUE7QUFGQUEsTUFBQUEsYUFFQSxHQUZnQixFQUVoQjtBQUFBOztBQUNBLFdBQU9DLFdBQVcsQ0FBQ0gsUUFBRCxFQUFXLFVBQUNJLE1BQUQsRUFBWTtBQUN2QztBQUNBLFVBQUlDLElBQUksR0FBR0QsTUFBWDs7QUFDQSxVQUFJRSxLQUFLLENBQUNDLE9BQU4sQ0FBY0gsTUFBZCxDQUFKLEVBQTJCO0FBQ3pCQyxRQUFBQSxJQUFJLEdBQUcsdUJBQU9ELE1BQVAsQ0FBUDtBQUNEOztBQUNELFVBQUksQ0FBQ0ksZ0JBQUtDLE1BQUwsQ0FBWUosSUFB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QlhrQixNQUFBQSxlQUFlLEVBQUUsS0FoQk47QUFpQlgxQixNQUFBQSxRQUFRLEVBQVJBLFFBakJXO0FBa0JYcEMsTUFBQUEsS0FBSyxFQUFMQSxLQWxCVztBQW1CWCtELE1BQUFBLGlCQUFpQixFQUFFO0FBbkJSLE1BQWI7O0FBc0JBLFdBQU8sZ0NBQUMseUNBQUQsRUFBMEJkLE9BQTFCLENBQVA7QUFDRDtBQS9HWSxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGZyb21KUywgTGlzdCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgeyBPdmVybGF5VHJpZ2dlciwgVG9vbHRpcCB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgeyBGbG9hdGluZ1NlbGVjdFBvcnRhbCB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWZsb2F0aW5nLXNlbGVjdCc7XG5pbXBvcnQgQ2hlY2tib3ggZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtY2hlY2tib3gnO1xuXG4vLyBUT0RPOiBjZWxsQ3JlYXRlLCBjZWxsRWRpdCByZW5kZXJlcnMgLT4gbXVsdGlzZWxlY3QgZHJvcGRvd24gYXMgY2VsbEZpbHRlciBoYXNcblxuY29uc3QgTXVsdGlWYWx1ZUNvbnRhaW5lciA9IChsYWJlbCwgb3B0aW9uc0NvdW50KSA9PiBwcm9wZXJ0aWVzID0+IChwcm9wZXJ0aWVzLnNlbGVjdFByb3BzLnZhbHVlXG4gICYmIHByb3BlcnRpZXMuc2VsZWN0UHJvcHMudmFsdWUuZmluZEluZGV4KFxuICAgIHNlbGVjdFByb3AgPT4gc2VsZWN0UHJvcC52YWx1ZSA9PT0gcHJvcGVydGllcy5kYXRhLnZhbHVlLFxuICApID09PSAwID8gKFxuICAgIDxzcGFuPntsYWJlbC5yZXBsYWNlKCc8bj4nLCBgKCR7cHJvcGVydGllcy5zZWxlY3RQcm9wcy52YWx1ZS5sZW5ndGh9LyR7b3B0aW9uc0NvdW50fSlgKX08L3NwYW4+XG4gICkgOiBudWxsKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB2YWxSZW5kZXIoXG4gICAgY29sLFxuICAgIGNvbHVtbixcbiAgICByb3dJbmRleCxcbiAgICBncmlkSWQsXG4gICAgc2VsZWN0T3B0aW9ucyA9IFtdLFxuICAgIHZhbHVlUmVuZGVyLFxuICApIHtcbiAgICByZXR1cm4gdmFsdWVSZW5kZXIocm93SW5kZXgsICh2YWx1ZXMpID0+IHtcbiAgICAgIC8vIG5vcm1hbGl6ZSB2YWx1ZXMgYXMgSW1tdXRhYmxlIExpc3RcbiAgICAgIGxldCB2YWxzID0gdmFsdWVzO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWVzKSkge1xuICAgICAgICB2YWxzID0gZnJvbUpTKHZhbHVlcyk7XG4gICAgICB9XG4gICAgICBpZiAoIUxpc3QuaXNMaXN0KHZhbHMpKSB7XG4gICAgICAgIHZhbHMgPSBmcm9tSlMoW3ZhbHVlc10pO1xuICAgICAgfVxuICAgICAgLy8gTm8gaXRlbXMgcmV0dXJuIGVtcHR5IHN0cmluZ1xuICAgICAgaWYgKCF2YWxzLnNpemUpIHJldHVybiAnJztcbiAgICAgIC8vIElmIG9ubHkgb25lIGlzIHNlbGVjdGVkIHJlbmRlciB2YWx1ZSBub3JtYWxseVxuICAgICAgaWYgKHZhbHMuc2l6ZSA9PT0gMSkge1xuICAgICAgICBjb25zdCBvcHRpb24gPSBzZWxlY3RPcHRpb25zLmZpbmQobyA9PiBvLnZhbHVlID09PSB2YWxzLmdldCgwKSk7XG4gICAgICAgIHJldHVybiBvcHRpb24gPyBvcHRpb24ubGFiZWwgOiBudWxsO1xuICAgICAgfVxuICAgICAgLy8gTXVsdGlwbGUgdmFsdWVzIHNlbGVjdGVkLCByZW5kZXIgJzMgc2VsZWN0ZWQnXG4gICAgICBjb25zdCBzZWxlY3RlZFRleHQgPSAoY29sLnRyYW5zbGF0aW9ucyAmJiBjb2wudHJhbnNsYXRpb25zLml0ZW1zU2VsZWN0ZWQpIHx8ICdzZWxlY3RlZCc7XG4gICAgICBjb25zdCB2YWx1ZVRleHQgPSAoXG4gICAgICAgIDxzcGFuPlxuICAgICAgICAgIHtgJHt2YWxzLnNpemV9ICR7c2VsZWN0ZWRUZXh0fWB9XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICk7XG4gICAgICAvLyB3aXRob3V0IHRvb2x0aXBcbiAgICAgIGlmIChjb2wuaXNNdWx0aXNlbGVjdFRvb2x0aXBEaXNhYmxlZCkge1xuICAgICAgICByZXR1cm4gdmFsdWVUZXh0O1xuICAgICAgfVxuICAgICAgLy8gd2l0aCB0b29sdGlwXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8T3ZlcmxheVRyaWdnZXJcbiAgICAgICAgICBwbGFjZW1lbnQ9XCJ0b3BcIlxuICAgICAgICAgIG92ZXJsYXk9eyhcbiAgICAgICAgICAgIDxUb29sdGlwIGlkPXtgb2NEYXRhZ3JpZE11bHRpc2VsZWN0VG9vbHRpcC0ke2dyaWRJZH0tJHtjb2x1bW4uY29sdW1uS2V5fS0ke3Jvd0luZGV4fWB9PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHRleHRBbGlnbjogJ2xlZnQnIH19PlxuICAgICAgICAgICAgICAgIHtzZWxlY3RPcHRpb25zLmZpbHRlcihvID0+IHZhbHMuaW5jbHVkZXMoby52YWx1ZSkpLm1hcCh2ID0+IChcbiAgICAgICAgICAgICAgICAgIDxSZWFjdC5GcmFnbWVudCBrZXk9e3YudmFsdWV9PlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICB7di5sYWJlbH1cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8YnIgLz5cbiAgICAgICAgICAgICAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9Ub29sdGlwPlxuICAgICAgICAgICl9XG4gICAgICAgICAgZGVsYXk9ezUwMH1cbiAgICAgICAgPlxuICAgICAgICAgIHt2YWx1ZVRleHR9XG4gICAgICAgIDwvT3ZlcmxheVRyaWdnZXI+XG4gICAgICApO1xuICAgIH0pO1xuICB9LFxuICBjZWxsRmlsdGVyKFxuICAgIGNvbCxcbiAgICBjb2x1bW4sXG4gICAgdGFiSW5kZXgsXG4gICAgZ3JpZElkLFxuICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICBmdW5jdGlvbnMsXG4gICkge1xuICAgIGNvbnN0IG9wdHMgPSBjb2wuZmlsdGVyU2VsZWN0T3B0aW9uc01vZCAmJiBzZWxlY3RPcHRpb25zXG4gICAgICA/IGNvbC5maWx0ZXJTZWxlY3RPcHRpb25zTW9kKHNlbGVjdE9wdGlvbnMuc2xpY2UoKSwgY29sKVxuICAgICAgOiBzZWxlY3RPcHRpb25zO1xuICAgIGNvbnN0IHZhbHVlID0gZnVuY3Rpb25zLmdldEl0ZW1NdWx0aVZhbHVlKGNvbCk7XG4gICAgY29uc3Qgb3B0aW9ucyA9IG9wdHMubWFwKFxuICAgICAgb3B0aW9uID0+ICh2YWx1ZSAmJiB2YWx1ZS5zb21lKG8gPT4gb3B0aW9uLnZhbHVlID09PSBvLnZhbHVlKVxuICAgICAgICA/IHsgLi4ub3B0aW9uLCBjaGVja2VkOiB0cnVlIH1cbiAgICAgICAgOiBvcHRpb24pLFxuICAgICk7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QvcHJvcC10eXBlc1xuICAgIGNvbnN0IE9wdGlvbiA9ICh7IGRhdGE6IHsgY2hlY2tlZCwgbGFiZWwgfSwgaW5uZXJQcm9wcyB9KSA9PiAoXG4gICAgICA8c3BhbiB7Li4uaW5uZXJQcm9wc30+XG4gICAgICAgIDxDaGVja2JveCBvbkNoYW5nZT17KCkgPT4ge319IGxhYmVsPXtsYWJlbH0gY2hlY2tlZD17Y2hlY2tlZH0gLz5cbiAgICAgIDwvc3Bhbj5cbiAgICApO1xuXG4gICAgY29uc3QgZnNQcm9wcyA9IHtcbiAgICAgIC4uLmNvbC5maWx0ZXJDb21wb25lbnRQcm9wcyxcbiAgICAgIC4uLnNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgTXVsdGlWYWx1ZUNvbnRhaW5lcjogTXVsdGlWYWx1ZUNvbnRhaW5lcihzZWxlY3RUcmFuc2xhdGlvbnMuc2VsZWN0ZWQsXG4gICAgICAgICAgKG9wdGlvbnMgfHwgW10pLmxlbmd0aCksXG4gICAgICAgIE9wdGlvbixcbiAgICAgIH0sXG4gICAgICBoaWRlU2VsZWN0ZWRPcHRpb25zOiBmYWxzZSxcbiAgICAgIGlzU2VhcmNoYWJsZTogc2VsZWN0T3B0aW9ucyAmJiBzZWxlY3RPcHRpb25zLmxlbmd0aCA+IDksXG4gICAgICBpc0NsZWFyYWJsZTogdHJ1ZSxcbiAgICAgIGlzTXVsdGk6IHRydWUsXG4gICAgICBuYW1lOiBgb2NEYXRhZ3JpZEZpbHRlcklucHV0LSR7Z3JpZElkfS0ke2NvbHVtbi5jb2x1bW5LZXl9YCxcbiAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbnMub25DZWxsTXVsdGlWYWx1ZUNoYW5nZShjb2wsIGVkaXRWYWx1ZVBhcnNlciksXG4gICAgICBvbkJsdXI6IGZ1bmN0aW9ucy5vbkNlbGxNdWx0aVZhbHVlQmx1cihjb2wpLFxuICAgICAgb3B0aW9ucyxcbiAgICAgIHRhYlNlbGVjdHNWYWx1ZTogZmFsc2UsXG4gICAgICB0YWJJbmRleCxcbiAgICAgIHZhbHVlLFxuICAgICAgY2xvc2VNZW51T25TZWxlY3Q6IGZhbHNlLFxuICAgIH07XG5cbiAgICByZXR1cm4gPEZsb2F0aW5nU2VsZWN0UG9ydGFsIHsuLi5mc1Byb3BzfSAvPjtcbiAgfSxcbn07XG4iXX0=