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
    var value = functions.getItemMultiValue(col); // eslint-disable-next-line react/prop-types

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

    var options = opts.map(function (option) {
      return _extends({}, option, {
        checked: value && value.some(function (o) {
          return option.value === o.value;
        })
      });
    });

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

    return column.virtualized ? _react["default"].createElement(_reactFloatingSelect.FloatingSelectInfinite, fsProps) : _react["default"].createElement(_reactFloatingSelect.FloatingSelectPortal, fsProps);
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2VydmljZS9jb2x1bW4tdHlwZXMvbXVsdGlzZWxlY3QtcmVuZGVyZXJzLmpzeCJdLCJuYW1lcyI6WyJNdWx0aVZhbHVlQ29udGFpbmVyIiwibGFiZWwiLCJvcHRpb25zQ291bnQiLCJwcm9wZXJ0aWVzIiwic2VsZWN0UHJvcHMiLCJ2YWx1ZSIsImZpbmRJbmRleCIsInNlbGVjdFByb3AiLCJkYXRhIiwicmVwbGFjZSIsImxlbmd0aCIsInZhbFJlbmRlciIsImNvbCIsImNvbHVtbiIsInJvd0luZGV4IiwiZ3JpZElkIiwic2VsZWN0T3B0aW9ucyIsInZhbHVlUmVuZGVyIiwidmFsdWVzIiwidmFscyIsIkFycmF5IiwiaXNBcnJheSIsIkxpc3QiLCJpc0xpc3QiLCJzaXplIiwib3B0aW9uIiwiZmluZCIsIm8iLCJnZXQiLCJzZWxlY3RlZFRleHQiLCJ0cmFuc2xhdGlvbnMiLCJpdGVtc1NlbGVjdGVkIiwidmFsdWVUZXh0IiwiaXNNdWx0aXNlbGVjdFRvb2x0aXBEaXNhYmxlZCIsImNvbHVtbktleSIsInRleHRBbGlnbiIsImZpbHRlciIsImluY2x1ZGVzIiwibWFwIiwidiIsImNlbGxGaWx0ZXIiLCJ0YWJJbmRleCIsInNlbGVjdFRyYW5zbGF0aW9ucyIsImVkaXRWYWx1ZVBhcnNlciIsImZ1bmN0aW9ucyIsIm9wdHMiLCJmaWx0ZXJTZWxlY3RPcHRpb25zTW9kIiwic2xpY2UiLCJnZXRJdGVtTXVsdGlWYWx1ZSIsIk9wdGlvbiIsImNoZWNrZWQiLCJpbm5lclByb3BzIiwib3B0aW9ucyIsInNvbWUiLCJmc1Byb3BzIiwiZmlsdGVyQ29tcG9uZW50UHJvcHMiLCJjb21wb25lbnRzIiwic2VsZWN0ZWQiLCJoaWRlU2VsZWN0ZWRPcHRpb25zIiwiaXNTZWFyY2hhYmxlIiwiaXNDbGVhcmFibGUiLCJpc011bHRpIiwibmFtZSIsIm9uQ2hhbmdlIiwib25DZWxsTXVsdGlWYWx1ZUNoYW5nZSIsIm9uQmx1ciIsIm9uQ2VsbE11bHRpVmFsdWVCbHVyIiwidGFiU2VsZWN0c1ZhbHVlIiwiY2xvc2VNZW51T25TZWxlY3QiLCJ2aXJ0dWFsaXplZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUE7QUFFQSxJQUFNQSxtQkFBbUIsR0FBRyxTQUF0QkEsbUJBQXNCLENBQUNDLEtBQUQsRUFBUUMsWUFBUjtBQUFBLFNBQXlCLFVBQUFDLFVBQVU7QUFBQSxXQUFLQSxVQUFVLENBQUNDLFdBQVgsQ0FBdUJDLEtBQXZCLElBQy9ERixVQUFVLENBQUNDLFdBQVgsQ0FBdUJDLEtBQXZCLENBQTZCQyxTQUE3QixDQUNELFVBQUFDLFVBQVU7QUFBQSxhQUFJQSxVQUFVLENBQUNGLEtBQVgsS0FBcUJGLFVBQVUsQ0FBQ0ssSUFBWCxDQUFnQkgsS0FBekM7QUFBQSxLQURULE1BRUcsQ0FINEQsR0FJaEUsOENBQU9KLEtBQUssQ0FBQ1EsT0FBTixDQUFjLEtBQWQsUUFBeUJOLFVBQVUsQ0FBQ0MsV0FBWCxDQUF1QkMsS0FBdkIsQ0FBNkJLLE1BQXRELFNBQWdFUixZQUFoRSxPQUFQLENBSmdFLEdBSzlELElBTHlEO0FBQUEsR0FBbkM7QUFBQSxDQUE1Qjs7ZUFPZTtBQUNiUyxFQUFBQSxTQURhLHFCQUVYQyxHQUZXLEVBR1hDLE1BSFcsRUFJWEMsUUFKVyxFQUtYQyxNQUxXLEVBTVhDLGFBTlcsRUFPWEMsV0FQVyxFQVFYO0FBQUEsUUFGQUQsYUFFQTtBQUZBQSxNQUFBQSxhQUVBLEdBRmdCLEVBRWhCO0FBQUE7O0FBQ0EsV0FBT0MsV0FBVyxDQUFDSCxRQUFELEVBQVcsVUFBQ0ksTUFBRCxFQUFZO0FBQ3ZDO0FBQ0EsVUFBSUMsSUFBSSxHQUFHRCxNQUFYOztBQUNBLFVBQUlFLEtBQUssQ0FBQ0MsT0FBTixDQUFjSCxNQUFkLENBQUosRUFBMkI7QUFDekJDLFFBQUFBLElBQUksR0FBRyx1QkFBT0QsTUFBUCxDQUFQO0FBQ0Q7O0FBQ0QsVUFBSSxDQUFDSSxnQkFBS0Ms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QUFBQSxlQUFlLEVBQUUsS0FoQk47QUFpQlgxQixNQUFBQSxRQUFRLEVBQVJBLFFBakJXO0FBa0JYcEMsTUFBQUEsS0FBSyxFQUFMQSxLQWxCVztBQW1CWCtELE1BQUFBLGlCQUFpQixFQUFFO0FBbkJSLE1BQWI7O0FBcUJBLFdBQU92RCxNQUFNLENBQUN3RCxXQUFQLEdBQ0gsZ0NBQUMsMkNBQUQsRUFBNEJmLE9BQTVCLENBREcsR0FFSCxnQ0FBQyx5Q0FBRCxFQUEwQkEsT0FBMUIsQ0FGSjtBQUdEO0FBN0dZLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZnJvbUpTLCBMaXN0IH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCB7IE92ZXJsYXlUcmlnZ2VyLCBUb29sdGlwIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCB7IEZsb2F0aW5nU2VsZWN0SW5maW5pdGUsIEZsb2F0aW5nU2VsZWN0UG9ydGFsIH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtZmxvYXRpbmctc2VsZWN0JztcbmltcG9ydCBDaGVja2JveCBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1jaGVja2JveCc7XG5cbi8vIFRPRE86IGNlbGxDcmVhdGUsIGNlbGxFZGl0IHJlbmRlcmVycyAtPiBtdWx0aXNlbGVjdCBkcm9wZG93biBhcyBjZWxsRmlsdGVyIGhhc1xuXG5jb25zdCBNdWx0aVZhbHVlQ29udGFpbmVyID0gKGxhYmVsLCBvcHRpb25zQ291bnQpID0+IHByb3BlcnRpZXMgPT4gKHByb3BlcnRpZXMuc2VsZWN0UHJvcHMudmFsdWVcbiAgJiYgcHJvcGVydGllcy5zZWxlY3RQcm9wcy52YWx1ZS5maW5kSW5kZXgoXG4gICAgc2VsZWN0UHJvcCA9PiBzZWxlY3RQcm9wLnZhbHVlID09PSBwcm9wZXJ0aWVzLmRhdGEudmFsdWUsXG4gICkgPT09IDAgPyAoXG4gICAgPHNwYW4+e2xhYmVsLnJlcGxhY2UoJzxuPicsIGAoJHtwcm9wZXJ0aWVzLnNlbGVjdFByb3BzLnZhbHVlLmxlbmd0aH0vJHtvcHRpb25zQ291bnR9KWApfTwvc3Bhbj5cbiAgKSA6IG51bGwpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHZhbFJlbmRlcihcbiAgICBjb2wsXG4gICAgY29sdW1uLFxuICAgIHJvd0luZGV4LFxuICAgIGdyaWRJZCxcbiAgICBzZWxlY3RPcHRpb25zID0gW10sXG4gICAgdmFsdWVSZW5kZXIsXG4gICkge1xuICAgIHJldHVybiB2YWx1ZVJlbmRlcihyb3dJbmRleCwgKHZhbHVlcykgPT4ge1xuICAgICAgLy8gbm9ybWFsaXplIHZhbHVlcyBhcyBJbW11dGFibGUgTGlzdFxuICAgICAgbGV0IHZhbHMgPSB2YWx1ZXM7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZXMpKSB7XG4gICAgICAgIHZhbHMgPSBmcm9tSlModmFsdWVzKTtcbiAgICAgIH1cbiAgICAgIGlmICghTGlzdC5pc0xpc3QodmFscykpIHtcbiAgICAgICAgdmFscyA9IGZyb21KUyhbdmFsdWVzXSk7XG4gICAgICB9XG4gICAgICAvLyBObyBpdGVtcyByZXR1cm4gZW1wdHkgc3RyaW5nXG4gICAgICBpZiAoIXZhbHMuc2l6ZSkgcmV0dXJuICcnO1xuICAgICAgLy8gSWYgb25seSBvbmUgaXMgc2VsZWN0ZWQgcmVuZGVyIHZhbHVlIG5vcm1hbGx5XG4gICAgICBpZiAodmFscy5zaXplID09PSAxKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IHNlbGVjdE9wdGlvbnMuZmluZChvID0+IG8udmFsdWUgPT09IHZhbHMuZ2V0KDApKTtcbiAgICAgICAgcmV0dXJuIG9wdGlvbiA/IG9wdGlvbi5sYWJlbCA6IG51bGw7XG4gICAgICB9XG4gICAgICAvLyBNdWx0aXBsZSB2YWx1ZXMgc2VsZWN0ZWQsIHJlbmRlciAnMyBzZWxlY3RlZCdcbiAgICAgIGNvbnN0IHNlbGVjdGVkVGV4dCA9IChjb2wudHJhbnNsYXRpb25zICYmIGNvbC50cmFuc2xhdGlvbnMuaXRlbXNTZWxlY3RlZCkgfHwgJ3NlbGVjdGVkJztcbiAgICAgIGNvbnN0IHZhbHVlVGV4dCA9IChcbiAgICAgICAgPHNwYW4+XG4gICAgICAgICAge2Ake3ZhbHMuc2l6ZX0gJHtzZWxlY3RlZFRleHR9YH1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgKTtcbiAgICAgIC8vIHdpdGhvdXQgdG9vbHRpcFxuICAgICAgaWYgKGNvbC5pc011bHRpc2VsZWN0VG9vbHRpcERpc2FibGVkKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZVRleHQ7XG4gICAgICB9XG4gICAgICAvLyB3aXRoIHRvb2x0aXBcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxPdmVybGF5VHJpZ2dlclxuICAgICAgICAgIHBsYWNlbWVudD1cInRvcFwiXG4gICAgICAgICAgb3ZlcmxheT17KFxuICAgICAgICAgICAgPFRvb2x0aXAgaWQ9e2BvY0RhdGFncmlkTXVsdGlzZWxlY3RUb29sdGlwLSR7Z3JpZElkfS0ke2NvbHVtbi5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YH0+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgdGV4dEFsaWduOiAnbGVmdCcgfX0+XG4gICAgICAgICAgICAgICAge3NlbGVjdE9wdGlvbnMuZmlsdGVyKG8gPT4gdmFscy5pbmNsdWRlcyhvLnZhbHVlKSkubWFwKHYgPT4gKFxuICAgICAgICAgICAgICAgICAgPFJlYWN0LkZyYWdtZW50IGtleT17di52YWx1ZX0+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIHt2LmxhYmVsfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxiciAvPlxuICAgICAgICAgICAgICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L1Rvb2x0aXA+XG4gICAgICAgICAgKX1cbiAgICAgICAgICBkZWxheT17NTAwfVxuICAgICAgICA+XG4gICAgICAgICAge3ZhbHVlVGV4dH1cbiAgICAgICAgPC9PdmVybGF5VHJpZ2dlcj5cbiAgICAgICk7XG4gICAgfSk7XG4gIH0sXG4gIGNlbGxGaWx0ZXIoXG4gICAgY29sLFxuICAgIGNvbHVtbixcbiAgICB0YWJJbmRleCxcbiAgICBncmlkSWQsXG4gICAgc2VsZWN0T3B0aW9ucyxcbiAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgIGZ1bmN0aW9ucyxcbiAgKSB7XG4gICAgY29uc3Qgb3B0cyA9IGNvbC5maWx0ZXJTZWxlY3RPcHRpb25zTW9kICYmIHNlbGVjdE9wdGlvbnNcbiAgICAgID8gY29sLmZpbHRlclNlbGVjdE9wdGlvbnNNb2Qoc2VsZWN0T3B0aW9ucy5zbGljZSgpLCBjb2wpXG4gICAgICA6IHNlbGVjdE9wdGlvbnM7XG4gICAgY29uc3QgdmFsdWUgPSBmdW5jdGlvbnMuZ2V0SXRlbU11bHRpVmFsdWUoY29sKTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QvcHJvcC10eXBlc1xuICAgIGNvbnN0IE9wdGlvbiA9ICh7IGRhdGE6IHsgY2hlY2tlZCwgbGFiZWwgfSwgaW5uZXJQcm9wcyB9KSA9PiAoXG4gICAgICA8c3BhbiB7Li4uaW5uZXJQcm9wc30+XG4gICAgICAgIDxDaGVja2JveCBvbkNoYW5nZT17KCkgPT4ge319IGxhYmVsPXtsYWJlbH0gY2hlY2tlZD17Y2hlY2tlZH0gLz5cbiAgICAgIDwvc3Bhbj5cbiAgICApO1xuICAgIGNvbnN0IG9wdGlvbnMgPSBvcHRzLm1hcChcbiAgICAgIG9wdGlvbiA9PiAoeyAuLi5vcHRpb24sIGNoZWNrZWQ6ICh2YWx1ZSAmJiB2YWx1ZS5zb21lKG8gPT4gb3B0aW9uLnZhbHVlID09PSBvLnZhbHVlKSkgfSksXG4gICAgKTtcblxuICAgIGNvbnN0IGZzUHJvcHMgPSB7XG4gICAgICAuLi5jb2wuZmlsdGVyQ29tcG9uZW50UHJvcHMsXG4gICAgICAuLi5zZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICBjb21wb25lbnRzOiB7XG4gICAgICAgIE11bHRpVmFsdWVDb250YWluZXI6IE11bHRpVmFsdWVDb250YWluZXIoc2VsZWN0VHJhbnNsYXRpb25zLnNlbGVjdGVkLFxuICAgICAgICAgIChvcHRpb25zIHx8IFtdKS5sZW5ndGgpLFxuICAgICAgICBPcHRpb24sXG4gICAgICB9LFxuICAgICAgaGlkZVNlbGVjdGVkT3B0aW9uczogZmFsc2UsXG4gICAgICBpc1NlYXJjaGFibGU6IHNlbGVjdE9wdGlvbnMgJiYgc2VsZWN0T3B0aW9ucy5sZW5ndGggPiA5LFxuICAgICAgaXNDbGVhcmFibGU6IHRydWUsXG4gICAgICBpc011bHRpOiB0cnVlLFxuICAgICAgbmFtZTogYG9jRGF0YWdyaWRGaWx0ZXJJbnB1dC0ke2dyaWRJZH0tJHtjb2x1bW4uY29sdW1uS2V5fWAsXG4gICAgICBvbkNoYW5nZTogZnVuY3Rpb25zLm9uQ2VsbE11bHRpVmFsdWVDaGFuZ2UoY29sLCBlZGl0VmFsdWVQYXJzZXIpLFxuICAgICAgb25CbHVyOiBmdW5jdGlvbnMub25DZWxsTXVsdGlWYWx1ZUJsdXIoY29sKSxcbiAgICAgIG9wdGlvbnMsXG4gICAgICB0YWJTZWxlY3RzVmFsdWU6IGZhbHNlLFxuICAgICAgdGFiSW5kZXgsXG4gICAgICB2YWx1ZSxcbiAgICAgIGNsb3NlTWVudU9uU2VsZWN0OiBmYWxzZSxcbiAgICB9O1xuICAgIHJldHVybiBjb2x1bW4udmlydHVhbGl6ZWRcbiAgICAgID8gPEZsb2F0aW5nU2VsZWN0SW5maW5pdGUgey4uLmZzUHJvcHN9IC8+XG4gICAgICA6IDxGbG9hdGluZ1NlbGVjdFBvcnRhbCB7Li4uZnNQcm9wc30gLz47XG4gIH0sXG59O1xuIl19