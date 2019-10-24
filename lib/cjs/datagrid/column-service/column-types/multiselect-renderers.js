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

    return column.virtualized ? _react["default"].createElement(_reactFloatingSelect.FloatingSelectInfinite, fsProps) : _react["default"].createElement(_reactFloatingSelect.FloatingSelectPortal, fsProps);
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2VydmljZS9jb2x1bW4tdHlwZXMvbXVsdGlzZWxlY3QtcmVuZGVyZXJzLmpzeCJdLCJuYW1lcyI6WyJNdWx0aVZhbHVlQ29udGFpbmVyIiwibGFiZWwiLCJvcHRpb25zQ291bnQiLCJwcm9wZXJ0aWVzIiwic2VsZWN0UHJvcHMiLCJ2YWx1ZSIsImZpbmRJbmRleCIsInNlbGVjdFByb3AiLCJkYXRhIiwicmVwbGFjZSIsImxlbmd0aCIsInZhbFJlbmRlciIsImNvbCIsImNvbHVtbiIsInJvd0luZGV4IiwiZ3JpZElkIiwic2VsZWN0T3B0aW9ucyIsInZhbHVlUmVuZGVyIiwidmFsdWVzIiwidmFscyIsIkFycmF5IiwiaXNBcnJheSIsIkxpc3QiLCJpc0xpc3QiLCJzaXplIiwib3B0aW9uIiwiZmluZCIsIm8iLCJnZXQiLCJzZWxlY3RlZFRleHQiLCJ0cmFuc2xhdGlvbnMiLCJpdGVtc1NlbGVjdGVkIiwidmFsdWVUZXh0IiwiaXNNdWx0aXNlbGVjdFRvb2x0aXBEaXNhYmxlZCIsImNvbHVtbktleSIsInRleHRBbGlnbiIsImZpbHRlciIsImluY2x1ZGVzIiwibWFwIiwidiIsImNlbGxGaWx0ZXIiLCJ0YWJJbmRleCIsInNlbGVjdFRyYW5zbGF0aW9ucyIsImVkaXRWYWx1ZVBhcnNlciIsImZ1bmN0aW9ucyIsIm9wdGlvbnMiLCJmaWx0ZXJTZWxlY3RPcHRpb25zTW9kIiwic2xpY2UiLCJnZXRJdGVtTXVsdGlWYWx1ZSIsImZzUHJvcHMiLCJjb21wb25lbnRzIiwic2VsZWN0ZWQiLCJoaWRlU2VsZWN0ZWRPcHRpb25zIiwiaXNTZWFyY2hhYmxlIiwiaXNDbGVhcmFibGUiLCJpc011bHRpIiwibmFtZSIsIm9uQ2hhbmdlIiwib25DZWxsTXVsdGlWYWx1ZUNoYW5nZSIsIm9uQmx1ciIsIm9uQ2VsbE11bHRpVmFsdWVCbHVyIiwidGFiU2VsZWN0c1ZhbHVlIiwiY2xvc2VNZW51T25TZWxlY3QiLCJm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LE1BQTNCLFNBQXFDRixNQUFNLENBQUNxQixTQVRyQztBQVVYdUIsTUFBQUEsUUFBUSxFQUFFYixTQUFTLENBQUNjLHNCQUFWLENBQWlDOUMsR0FBakMsRUFBc0MrQixlQUF0QyxDQVZDO0FBV1hnQixNQUFBQSxNQUFNLEVBQUVmLFNBQVMsQ0FBQ2dCLG9CQUFWLENBQStCaEQsR0FBL0IsQ0FYRztBQVlYaUMsTUFBQUEsT0FBTyxFQUFQQSxPQVpXO0FBYVhnQixNQUFBQSxlQUFlLEVBQUUsS0FiTjtBQWNYcEIsTUFBQUEsUUFBUSxFQUFSQSxRQWRXO0FBZVhwQyxNQUFBQSxLQUFLLEVBQUxBLEtBZlc7QUFnQlh5RCxNQUFBQSxpQkFBaUIsRUFBRTtBQWhCUixPQWlCUnBCLGtCQWpCUSxNQWtCUjlCLEdBQUcsQ0FBQ21ELG9CQWxCSSxDQUFiOztBQW9CQSxXQUFPbEQsTUFBTSxDQUFDbUQsV0FBUCxHQUNILGdDQUFDLDJDQUFELEVBQTRCZixPQUE1QixDQURHLEdBRUgsZ0NBQUMseUNBQUQsRUFBMEJBLE9BQTFCLENBRko7QUFHRDtBQW5HWSxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGZyb21KUywgTGlzdCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgeyBPdmVybGF5VHJpZ2dlciwgVG9vbHRpcCB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgeyBGbG9hdGluZ1NlbGVjdEluZmluaXRlLCBGbG9hdGluZ1NlbGVjdFBvcnRhbCB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWZsb2F0aW5nLXNlbGVjdCc7XG5cbi8vIFRPRE86IGNlbGxDcmVhdGUsIGNlbGxFZGl0IHJlbmRlcmVycyAtPiBtdWx0aXNlbGVjdCBkcm9wZG93biBhcyBjZWxsRmlsdGVyIGhhc1xuXG5jb25zdCBNdWx0aVZhbHVlQ29udGFpbmVyID0gKGxhYmVsLCBvcHRpb25zQ291bnQpID0+IHByb3BlcnRpZXMgPT4gKHByb3BlcnRpZXMuc2VsZWN0UHJvcHMudmFsdWVcbiAgJiYgcHJvcGVydGllcy5zZWxlY3RQcm9wcy52YWx1ZS5maW5kSW5kZXgoXG4gICAgc2VsZWN0UHJvcCA9PiBzZWxlY3RQcm9wLnZhbHVlID09PSBwcm9wZXJ0aWVzLmRhdGEudmFsdWUsXG4gICkgPT09IDAgPyAoXG4gICAgPHNwYW4+e2xhYmVsLnJlcGxhY2UoJzxuPicsIGAoJHtwcm9wZXJ0aWVzLnNlbGVjdFByb3BzLnZhbHVlLmxlbmd0aH0vJHtvcHRpb25zQ291bnR9KWApfTwvc3Bhbj5cbiAgKSA6IG51bGwpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHZhbFJlbmRlcihcbiAgICBjb2wsXG4gICAgY29sdW1uLFxuICAgIHJvd0luZGV4LFxuICAgIGdyaWRJZCxcbiAgICBzZWxlY3RPcHRpb25zID0gW10sXG4gICAgdmFsdWVSZW5kZXIsXG4gICkge1xuICAgIHJldHVybiB2YWx1ZVJlbmRlcihyb3dJbmRleCwgKHZhbHVlcykgPT4ge1xuICAgICAgLy8gbm9ybWFsaXplIHZhbHVlcyBhcyBJbW11dGFibGUgTGlzdFxuICAgICAgbGV0IHZhbHMgPSB2YWx1ZXM7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZXMpKSB7XG4gICAgICAgIHZhbHMgPSBmcm9tSlModmFsdWVzKTtcbiAgICAgIH1cbiAgICAgIGlmICghTGlzdC5pc0xpc3QodmFscykpIHtcbiAgICAgICAgdmFscyA9IGZyb21KUyhbdmFsdWVzXSk7XG4gICAgICB9XG4gICAgICAvLyBObyBpdGVtcyByZXR1cm4gZW1wdHkgc3RyaW5nXG4gICAgICBpZiAoIXZhbHMuc2l6ZSkgcmV0dXJuICcnO1xuICAgICAgLy8gSWYgb25seSBvbmUgaXMgc2VsZWN0ZWQgcmVuZGVyIHZhbHVlIG5vcm1hbGx5XG4gICAgICBpZiAodmFscy5zaXplID09PSAxKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IHNlbGVjdE9wdGlvbnMuZmluZChvID0+IG8udmFsdWUgPT09IHZhbHMuZ2V0KDApKTtcbiAgICAgICAgcmV0dXJuIG9wdGlvbiA/IG9wdGlvbi5sYWJlbCA6IG51bGw7XG4gICAgICB9XG4gICAgICAvLyBNdWx0aXBsZSB2YWx1ZXMgc2VsZWN0ZWQsIHJlbmRlciAnMyBzZWxlY3RlZCdcbiAgICAgIGNvbnN0IHNlbGVjdGVkVGV4dCA9IChjb2wudHJhbnNsYXRpb25zICYmIGNvbC50cmFuc2xhdGlvbnMuaXRlbXNTZWxlY3RlZCkgfHwgJ3NlbGVjdGVkJztcbiAgICAgIGNvbnN0IHZhbHVlVGV4dCA9IChcbiAgICAgICAgPHNwYW4+XG4gICAgICAgICAge2Ake3ZhbHMuc2l6ZX0gJHtzZWxlY3RlZFRleHR9YH1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgKTtcbiAgICAgIC8vIHdpdGhvdXQgdG9vbHRpcFxuICAgICAgaWYgKGNvbC5pc011bHRpc2VsZWN0VG9vbHRpcERpc2FibGVkKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZVRleHQ7XG4gICAgICB9XG4gICAgICAvLyB3aXRoIHRvb2x0aXBcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxPdmVybGF5VHJpZ2dlclxuICAgICAgICAgIHBsYWNlbWVudD1cInRvcFwiXG4gICAgICAgICAgb3ZlcmxheT17KFxuICAgICAgICAgICAgPFRvb2x0aXAgaWQ9e2BvY0RhdGFncmlkTXVsdGlzZWxlY3RUb29sdGlwLSR7Z3JpZElkfS0ke2NvbHVtbi5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YH0+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgdGV4dEFsaWduOiAnbGVmdCcgfX0+XG4gICAgICAgICAgICAgICAge3NlbGVjdE9wdGlvbnMuZmlsdGVyKG8gPT4gdmFscy5pbmNsdWRlcyhvLnZhbHVlKSkubWFwKHYgPT4gKFxuICAgICAgICAgICAgICAgICAgPFJlYWN0LkZyYWdtZW50IGtleT17di52YWx1ZX0+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIHt2LmxhYmVsfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxiciAvPlxuICAgICAgICAgICAgICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L1Rvb2x0aXA+XG4gICAgICAgICAgKX1cbiAgICAgICAgICBkZWxheT17NTAwfVxuICAgICAgICA+XG4gICAgICAgICAge3ZhbHVlVGV4dH1cbiAgICAgICAgPC9PdmVybGF5VHJpZ2dlcj5cbiAgICAgICk7XG4gICAgfSk7XG4gIH0sXG4gIGNlbGxGaWx0ZXIoXG4gICAgY29sLFxuICAgIGNvbHVtbixcbiAgICB0YWJJbmRleCxcbiAgICBncmlkSWQsXG4gICAgc2VsZWN0T3B0aW9ucyxcbiAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgIGZ1bmN0aW9ucyxcbiAgKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IGNvbC5maWx0ZXJTZWxlY3RPcHRpb25zTW9kICYmIHNlbGVjdE9wdGlvbnNcbiAgICAgID8gY29sLmZpbHRlclNlbGVjdE9wdGlvbnNNb2Qoc2VsZWN0T3B0aW9ucy5zbGljZSgpLCBjb2wpXG4gICAgICA6IHNlbGVjdE9wdGlvbnM7XG4gICAgY29uc3QgdmFsdWUgPSBmdW5jdGlvbnMuZ2V0SXRlbU11bHRpVmFsdWUoY29sKTtcblxuICAgIGNvbnN0IGZzUHJvcHMgPSB7XG4gICAgICBjb21wb25lbnRzOiB7XG4gICAgICAgIE11bHRpVmFsdWVDb250YWluZXI6IE11bHRpVmFsdWVDb250YWluZXIoc2VsZWN0VHJhbnNsYXRpb25zLnNlbGVjdGVkLFxuICAgICAgICAgIChvcHRpb25zIHx8IFtdKS5sZW5ndGgpLFxuICAgICAgfSxcbiAgICAgIGhpZGVTZWxlY3RlZE9wdGlvbnM6IGZhbHNlLFxuICAgICAgaXNTZWFyY2hhYmxlOiB0cnVlLFxuICAgICAgaXNDbGVhcmFibGU6IHRydWUsXG4gICAgICBpc011bHRpOiB0cnVlLFxuICAgICAgbmFtZTogYG9jRGF0YWdyaWRGaWx0ZXJJbnB1dC0ke2dyaWRJZH0tJHtjb2x1bW4uY29sdW1uS2V5fWAsXG4gICAgICBvbkNoYW5nZTogZnVuY3Rpb25zLm9uQ2VsbE11bHRpVmFsdWVDaGFuZ2UoY29sLCBlZGl0VmFsdWVQYXJzZXIpLFxuICAgICAgb25CbHVyOiBmdW5jdGlvbnMub25DZWxsTXVsdGlWYWx1ZUJsdXIoY29sKSxcbiAgICAgIG9wdGlvbnMsXG4gICAgICB0YWJTZWxlY3RzVmFsdWU6IGZhbHNlLFxuICAgICAgdGFiSW5kZXgsXG4gICAgICB2YWx1ZSxcbiAgICAgIGNsb3NlTWVudU9uU2VsZWN0OiBmYWxzZSxcbiAgICAgIC4uLnNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgIC4uLmNvbC5maWx0ZXJDb21wb25lbnRQcm9wcyxcbiAgICB9O1xuICAgIHJldHVybiBjb2x1bW4udmlydHVhbGl6ZWRcbiAgICAgID8gPEZsb2F0aW5nU2VsZWN0SW5maW5pdGUgey4uLmZzUHJvcHN9IC8+XG4gICAgICA6IDxGbG9hdGluZ1NlbGVjdFBvcnRhbCB7Li4uZnNQcm9wc30gLz47XG4gIH0sXG59O1xuIl19