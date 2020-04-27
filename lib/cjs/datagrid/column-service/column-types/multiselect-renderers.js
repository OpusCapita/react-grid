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
    }) === 0 ? /*#__PURE__*/_react["default"].createElement("span", null, label.replace('<n>', "(" + properties.selectProps.value.length + "/" + optionsCount + ")")) : null;
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

      var valueText = /*#__PURE__*/_react["default"].createElement("span", null, vals.size, ' ', selectedText); // without tooltip


      if (col.isMultiselectTooltipDisabled) {
        return valueText;
      } // with tooltip


      return /*#__PURE__*/_react["default"].createElement(_reactBootstrap.OverlayTrigger, {
        placement: "top",
        overlay: /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Tooltip, {
          id: "ocDatagridMultiselectTooltip-" + gridId + "-" + column.columnKey + "-" + rowIndex
        }, /*#__PURE__*/_react["default"].createElement("div", {
          style: {
            textAlign: 'left'
          }
        }, selectOptions.filter(function (o) {
          return vals.includes(o.value);
        }).map(function (v) {
          return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, {
            key: v.value
          }, /*#__PURE__*/_react["default"].createElement("span", null, v.label), /*#__PURE__*/_react["default"].createElement("br", null));
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
      isSearchable: true,
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

    return column.virtualized ? /*#__PURE__*/_react["default"].createElement(_reactFloatingSelect.FloatingSelectInfinite, fsProps) : /*#__PURE__*/_react["default"].createElement(_reactFloatingSelect.FloatingSelectPortal, fsProps);
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2VydmljZS9jb2x1bW4tdHlwZXMvbXVsdGlzZWxlY3QtcmVuZGVyZXJzLmpzeCJdLCJuYW1lcyI6WyJNdWx0aVZhbHVlQ29udGFpbmVyIiwibGFiZWwiLCJvcHRpb25zQ291bnQiLCJwcm9wZXJ0aWVzIiwic2VsZWN0UHJvcHMiLCJ2YWx1ZSIsImZpbmRJbmRleCIsInNlbGVjdFByb3AiLCJkYXRhIiwicmVwbGFjZSIsImxlbmd0aCIsInZhbFJlbmRlciIsImNvbCIsImNvbHVtbiIsInJvd0luZGV4IiwiZ3JpZElkIiwic2VsZWN0T3B0aW9ucyIsInZhbHVlUmVuZGVyIiwidmFsdWVzIiwidmFscyIsIkFycmF5IiwiaXNBcnJheSIsIkxpc3QiLCJpc0xpc3QiLCJzaXplIiwib3B0aW9uIiwiZmluZCIsIm8iLCJnZXQiLCJzZWxlY3RlZFRleHQiLCJ0cmFuc2xhdGlvbnMiLCJpdGVtc1NlbGVjdGVkIiwidmFsdWVUZXh0IiwiaXNNdWx0aXNlbGVjdFRvb2x0aXBEaXNhYmxlZCIsImNvbHVtbktleSIsInRleHRBbGlnbiIsImZpbHRlciIsImluY2x1ZGVzIiwibWFwIiwidiIsImNlbGxGaWx0ZXIiLCJ0YWJJbmRleCIsInNlbGVjdFRyYW5zbGF0aW9ucyIsImVkaXRWYWx1ZVBhcnNlciIsImZ1bmN0aW9ucyIsIm9wdGlvbnMiLCJmaWx0ZXJTZWxlY3RPcHRpb25zTW9kIiwic2xpY2UiLCJnZXRJdGVtTXVsdGlWYWx1ZSIsImZzUHJvcHMiLCJjb21wb25lbnRzIiwic2VsZWN0ZWQiLCJoaWRlU2VsZWN0ZWRPcHRpb25zIiwiaXNTZWFyY2hhYmxlIiwiaXNDbGVhcmFibGUiLCJpc011bHRpIiwibmFtZSIsIm9uQ2hhbmdlIiwib25DZWxsTXVsdGlWYWx1ZUNoYW5nZSIsIm9uQmx1ciIsIm9uQ2VsbE11bHRpVmFsdWVCbHVyIiwidGFiU2VsZWN0c1ZhbHVlIiwiY2xvc2VNZW51T25TZWxlY3QiLCJm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SUFBSSw2QkFBMkJ6QyxNQUEzQixTQUFxQ0YsTUFBTSxDQUFDcUIsU0FUckM7QUFVWHVCLE1BQUFBLFFBQVEsRUFBRWIsU0FBUyxDQUFDYyxzQkFBVixDQUFpQzlDLEdBQWpDLEVBQXNDK0IsZUFBdEMsQ0FWQztBQVdYZ0IsTUFBQUEsTUFBTSxFQUFFZixTQUFTLENBQUNnQixvQkFBVixDQUErQmhELEdBQS9CLENBWEc7QUFZWGlDLE1BQUFBLE9BQU8sRUFBUEEsT0FaVztBQWFYZ0IsTUFBQUEsZUFBZSxFQUFFLEtBYk47QUFjWHBCLE1BQUFBLFFBQVEsRUFBUkEsUUFkVztBQWVYcEMsTUFBQUEsS0FBSyxFQUFMQSxLQWZXO0FBZ0JYeUQsTUFBQUEsaUJBQWlCLEVBQUU7QUFoQlIsT0FpQlJwQixrQkFqQlEsTUFrQlI5QixHQUFHLENBQUNtRCxvQkFsQkksQ0FBYjs7QUFvQkEsV0FBT2xELE1BQU0sQ0FBQ21ELFdBQVAsZ0JBQ0gsZ0NBQUMsMkNBQUQsRUFBNEJmLE9BQTVCLENBREcsZ0JBRUgsZ0NBQUMseUNBQUQsRUFBMEJBLE9BQTFCLENBRko7QUFHRDtBQXJHWSxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGZyb21KUywgTGlzdCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgeyBPdmVybGF5VHJpZ2dlciwgVG9vbHRpcCB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgeyBGbG9hdGluZ1NlbGVjdEluZmluaXRlLCBGbG9hdGluZ1NlbGVjdFBvcnRhbCB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWZsb2F0aW5nLXNlbGVjdCc7XG5cbi8vIFRPRE86IGNlbGxDcmVhdGUsIGNlbGxFZGl0IHJlbmRlcmVycyAtPiBtdWx0aXNlbGVjdCBkcm9wZG93biBhcyBjZWxsRmlsdGVyIGhhc1xuXG5jb25zdCBNdWx0aVZhbHVlQ29udGFpbmVyID0gKGxhYmVsLCBvcHRpb25zQ291bnQpID0+IHByb3BlcnRpZXMgPT4gKHByb3BlcnRpZXMuc2VsZWN0UHJvcHMudmFsdWVcbiAgJiYgcHJvcGVydGllcy5zZWxlY3RQcm9wcy52YWx1ZS5maW5kSW5kZXgoXG4gICAgc2VsZWN0UHJvcCA9PiBzZWxlY3RQcm9wLnZhbHVlID09PSBwcm9wZXJ0aWVzLmRhdGEudmFsdWUsXG4gICkgPT09IDAgPyAoXG4gICAgPHNwYW4+e2xhYmVsLnJlcGxhY2UoJzxuPicsIGAoJHtwcm9wZXJ0aWVzLnNlbGVjdFByb3BzLnZhbHVlLmxlbmd0aH0vJHtvcHRpb25zQ291bnR9KWApfTwvc3Bhbj5cbiAgKSA6IG51bGwpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHZhbFJlbmRlcihcbiAgICBjb2wsXG4gICAgY29sdW1uLFxuICAgIHJvd0luZGV4LFxuICAgIGdyaWRJZCxcbiAgICBzZWxlY3RPcHRpb25zID0gW10sXG4gICAgdmFsdWVSZW5kZXIsXG4gICkge1xuICAgIHJldHVybiB2YWx1ZVJlbmRlcihyb3dJbmRleCwgKHZhbHVlcykgPT4ge1xuICAgICAgLy8gbm9ybWFsaXplIHZhbHVlcyBhcyBJbW11dGFibGUgTGlzdFxuICAgICAgbGV0IHZhbHMgPSB2YWx1ZXM7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZXMpKSB7XG4gICAgICAgIHZhbHMgPSBmcm9tSlModmFsdWVzKTtcbiAgICAgIH1cbiAgICAgIGlmICghTGlzdC5pc0xpc3QodmFscykpIHtcbiAgICAgICAgdmFscyA9IGZyb21KUyhbdmFsdWVzXSk7XG4gICAgICB9XG4gICAgICAvLyBObyBpdGVtcyByZXR1cm4gZW1wdHkgc3RyaW5nXG4gICAgICBpZiAoIXZhbHMuc2l6ZSkgcmV0dXJuICcnO1xuICAgICAgLy8gSWYgb25seSBvbmUgaXMgc2VsZWN0ZWQgcmVuZGVyIHZhbHVlIG5vcm1hbGx5XG4gICAgICBpZiAodmFscy5zaXplID09PSAxKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IHNlbGVjdE9wdGlvbnMuZmluZChvID0+IG8udmFsdWUgPT09IHZhbHMuZ2V0KDApKTtcbiAgICAgICAgcmV0dXJuIG9wdGlvbiA/IG9wdGlvbi5sYWJlbCA6IG51bGw7XG4gICAgICB9XG4gICAgICAvLyBNdWx0aXBsZSB2YWx1ZXMgc2VsZWN0ZWQsIHJlbmRlciAnMyBzZWxlY3RlZCdcbiAgICAgIGNvbnN0IHNlbGVjdGVkVGV4dCA9IChjb2wudHJhbnNsYXRpb25zICYmIGNvbC50cmFuc2xhdGlvbnMuaXRlbXNTZWxlY3RlZCkgfHwgJ3NlbGVjdGVkJztcbiAgICAgIGNvbnN0IHZhbHVlVGV4dCA9IChcbiAgICAgICAgPHNwYW4+XG4gICAgICAgICAge3ZhbHMuc2l6ZX1cbiAgICAgICAgICB7JyAnfVxuICAgICAgICAgIHtzZWxlY3RlZFRleHR9XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICk7XG4gICAgICAvLyB3aXRob3V0IHRvb2x0aXBcbiAgICAgIGlmIChjb2wuaXNNdWx0aXNlbGVjdFRvb2x0aXBEaXNhYmxlZCkge1xuICAgICAgICByZXR1cm4gdmFsdWVUZXh0O1xuICAgICAgfVxuICAgICAgLy8gd2l0aCB0b29sdGlwXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8T3ZlcmxheVRyaWdnZXJcbiAgICAgICAgICBwbGFjZW1lbnQ9XCJ0b3BcIlxuICAgICAgICAgIG92ZXJsYXk9eyhcbiAgICAgICAgICAgIDxUb29sdGlwIGlkPXtgb2NEYXRhZ3JpZE11bHRpc2VsZWN0VG9vbHRpcC0ke2dyaWRJZH0tJHtjb2x1bW4uY29sdW1uS2V5fS0ke3Jvd0luZGV4fWB9PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHRleHRBbGlnbjogJ2xlZnQnIH19PlxuICAgICAgICAgICAgICAgIHtzZWxlY3RPcHRpb25zLmZpbHRlcihvID0+IHZhbHMuaW5jbHVkZXMoby52YWx1ZSkpLm1hcCh2ID0+IChcbiAgICAgICAgICAgICAgICAgIDxSZWFjdC5GcmFnbWVudCBrZXk9e3YudmFsdWV9PlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICB7di5sYWJlbH1cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8YnIgLz5cbiAgICAgICAgICAgICAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9Ub29sdGlwPlxuICAgICAgICAgICl9XG4gICAgICAgICAgZGVsYXk9ezUwMH1cbiAgICAgICAgPlxuICAgICAgICAgIHt2YWx1ZVRleHR9XG4gICAgICAgIDwvT3ZlcmxheVRyaWdnZXI+XG4gICAgICApO1xuICAgIH0pO1xuICB9LFxuICBjZWxsRmlsdGVyKFxuICAgIGNvbCxcbiAgICBjb2x1bW4sXG4gICAgdGFiSW5kZXgsXG4gICAgZ3JpZElkLFxuICAgIHNlbGVjdE9wdGlvbnMsXG4gICAgc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgIGVkaXRWYWx1ZVBhcnNlcixcbiAgICBmdW5jdGlvbnMsXG4gICkge1xuICAgIGNvbnN0IG9wdGlvbnMgPSBjb2wuZmlsdGVyU2VsZWN0T3B0aW9uc01vZCAmJiBzZWxlY3RPcHRpb25zXG4gICAgICA/IGNvbC5maWx0ZXJTZWxlY3RPcHRpb25zTW9kKHNlbGVjdE9wdGlvbnMuc2xpY2UoKSwgY29sKVxuICAgICAgOiBzZWxlY3RPcHRpb25zO1xuICAgIGNvbnN0IHZhbHVlID0gZnVuY3Rpb25zLmdldEl0ZW1NdWx0aVZhbHVlKGNvbCk7XG5cbiAgICBjb25zdCBmc1Byb3BzID0ge1xuICAgICAgY29tcG9uZW50czoge1xuICAgICAgICBNdWx0aVZhbHVlQ29udGFpbmVyOiBNdWx0aVZhbHVlQ29udGFpbmVyKHNlbGVjdFRyYW5zbGF0aW9ucy5zZWxlY3RlZCxcbiAgICAgICAgICAob3B0aW9ucyB8fCBbXSkubGVuZ3RoKSxcbiAgICAgIH0sXG4gICAgICBoaWRlU2VsZWN0ZWRPcHRpb25zOiBmYWxzZSxcbiAgICAgIGlzU2VhcmNoYWJsZTogdHJ1ZSxcbiAgICAgIGlzQ2xlYXJhYmxlOiB0cnVlLFxuICAgICAgaXNNdWx0aTogdHJ1ZSxcbiAgICAgIG5hbWU6IGBvY0RhdGFncmlkRmlsdGVySW5wdXQtJHtncmlkSWR9LSR7Y29sdW1uLmNvbHVtbktleX1gLFxuICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9ucy5vbkNlbGxNdWx0aVZhbHVlQ2hhbmdlKGNvbCwgZWRpdFZhbHVlUGFyc2VyKSxcbiAgICAgIG9uQmx1cjogZnVuY3Rpb25zLm9uQ2VsbE11bHRpVmFsdWVCbHVyKGNvbCksXG4gICAgICBvcHRpb25zLFxuICAgICAgdGFiU2VsZWN0c1ZhbHVlOiBmYWxzZSxcbiAgICAgIHRhYkluZGV4LFxuICAgICAgdmFsdWUsXG4gICAgICBjbG9zZU1lbnVPblNlbGVjdDogZmFsc2UsXG4gICAgICAuLi5zZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICAuLi5jb2wuZmlsdGVyQ29tcG9uZW50UHJvcHMsXG4gICAgfTtcbiAgICByZXR1cm4gY29sdW1uLnZpcnR1YWxpemVkXG4gICAgICA/IDxGbG9hdGluZ1NlbGVjdEluZmluaXRlIHsuLi5mc1Byb3BzfSAvPlxuICAgICAgOiA8RmxvYXRpbmdTZWxlY3RQb3J0YWwgey4uLmZzUHJvcHN9IC8+O1xuICB9LFxufTtcbiJdfQ==