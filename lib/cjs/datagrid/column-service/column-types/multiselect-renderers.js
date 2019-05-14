"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactFloatingSelect = require("@opuscapita/react-floating-select");

var _reactCheckbox = _interopRequireDefault(require("@opuscapita/react-checkbox"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var MultiValueContainer = function MultiValueContainer(label) {
  return function (properties) {
    return properties.selectProps.value && properties.selectProps.value.findIndex(function (selectProp) {
      return selectProp.value === properties.data.value;
    }) === 0 ? _react["default"].createElement("span", null, label.replace('<n>', properties.selectProps.value.length)) : null;
  };
};

var _default = {
  cellFilter: function cellFilter(col, column, tabIndex, gridId, selectOptions, selectTranslations, editValueParser, functions) {
    var opts = col.filterSelectOptionsMod && selectOptions ? col.filterSelectOptionsMod(selectOptions.slice(), col) : selectOptions;
    var value = functions.getItemValue(col, {
      selectOptions: selectOptions
    });
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
        MultiValueContainer: MultiValueContainer(selectTranslations.selected),
        Option: Option
      },
      hideSelectedOptions: false,
      isSearchable: selectOptions && selectOptions.length > 9,
      isClearable: true,
      isMulti: true,
      name: "ocDatagridFilterInput-" + gridId + "-" + column.columnKey,
      onChange: functions.onCellValueChange(col, editValueParser),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2VydmljZS9jb2x1bW4tdHlwZXMvbXVsdGlzZWxlY3QtcmVuZGVyZXJzLmpzeCJdLCJuYW1lcyI6WyJNdWx0aVZhbHVlQ29udGFpbmVyIiwibGFiZWwiLCJwcm9wZXJ0aWVzIiwic2VsZWN0UHJvcHMiLCJ2YWx1ZSIsImZpbmRJbmRleCIsInNlbGVjdFByb3AiLCJkYXRhIiwicmVwbGFjZSIsImxlbmd0aCIsImNlbGxGaWx0ZXIiLCJjb2wiLCJjb2x1bW4iLCJ0YWJJbmRleCIsImdyaWRJZCIsInNlbGVjdE9wdGlvbnMiLCJzZWxlY3RUcmFuc2xhdGlvbnMiLCJlZGl0VmFsdWVQYXJzZXIiLCJmdW5jdGlvbnMiLCJvcHRzIiwiZmlsdGVyU2VsZWN0T3B0aW9uc01vZCIsInNsaWNlIiwiZ2V0SXRlbVZhbHVlIiwib3B0aW9ucyIsIm1hcCIsIm9wdGlvbiIsInNvbWUiLCJvIiwiY2hlY2tlZCIsIk9wdGlvbiIsImlubmVyUHJvcHMiLCJmc1Byb3BzIiwiZmlsdGVyQ29tcG9uZW50UHJvcHMiLCJjb21wb25lbnRzIiwic2VsZWN0ZWQiLCJoaWRlU2VsZWN0ZWRPcHRpb25zIiwiaXNTZWFyY2hhYmxlIiwiaXNDbGVhcmFibGUiLCJpc011bHRpIiwibmFtZSIsImNvbHVtbktleSIsIm9uQ2hhbmdlIiwib25DZWxsVmFsdWVDaGFuZ2UiLCJ0YWJTZWxlY3RzVmFsdWUiLCJjbG9zZU1lbnVPblNlbGVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsbUJBQW1CLEdBQUcsU0FBdEJBLG1CQUFzQixDQUFBQyxLQUFLO0FBQUEsU0FBSSxVQUFBQyxVQUFVO0FBQUEsV0FBS0EsVUFBVSxDQUFDQyxXQUFYLENBQXVCQyxLQUF2QixJQUMvQ0YsVUFBVSxDQUFDQyxXQUFYLENBQXVCQyxLQUF2QixDQUE2QkMsU0FBN0IsQ0FDRCxVQUFBQyxVQUFVO0FBQUEsYUFB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dCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBGbG9hdGluZ1NlbGVjdFBvcnRhbCB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWZsb2F0aW5nLXNlbGVjdCc7XG5pbXBvcnQgQ2hlY2tib3ggZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtY2hlY2tib3gnO1xuXG5jb25zdCBNdWx0aVZhbHVlQ29udGFpbmVyID0gbGFiZWwgPT4gcHJvcGVydGllcyA9PiAocHJvcGVydGllcy5zZWxlY3RQcm9wcy52YWx1ZVxuICAmJiBwcm9wZXJ0aWVzLnNlbGVjdFByb3BzLnZhbHVlLmZpbmRJbmRleChcbiAgICBzZWxlY3RQcm9wID0+IHNlbGVjdFByb3AudmFsdWUgPT09IHByb3BlcnRpZXMuZGF0YS52YWx1ZSxcbiAgKSA9PT0gMCA/IChcbiAgICA8c3Bhbj57bGFiZWwucmVwbGFjZSgnPG4+JywgcHJvcGVydGllcy5zZWxlY3RQcm9wcy52YWx1ZS5sZW5ndGgpfTwvc3Bhbj5cbiAgKSA6IG51bGwpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNlbGxGaWx0ZXIoXG4gICAgY29sLFxuICAgIGNvbHVtbixcbiAgICB0YWJJbmRleCxcbiAgICBncmlkSWQsXG4gICAgc2VsZWN0T3B0aW9ucyxcbiAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgIGZ1bmN0aW9ucyxcbiAgKSB7XG4gICAgY29uc3Qgb3B0cyA9IGNvbC5maWx0ZXJTZWxlY3RPcHRpb25zTW9kICYmIHNlbGVjdE9wdGlvbnNcbiAgICAgID8gY29sLmZpbHRlclNlbGVjdE9wdGlvbnNNb2Qoc2VsZWN0T3B0aW9ucy5zbGljZSgpLCBjb2wpXG4gICAgICA6IHNlbGVjdE9wdGlvbnM7XG4gICAgY29uc3QgdmFsdWUgPSBmdW5jdGlvbnMuZ2V0SXRlbVZhbHVlKGNvbCwgeyBzZWxlY3RPcHRpb25zIH0pO1xuICAgIGNvbnN0IG9wdGlvbnMgPSBvcHRzLm1hcChcbiAgICAgIG9wdGlvbiA9PiAodmFsdWUgJiYgdmFsdWUuc29tZShvID0+IG9wdGlvbi52YWx1ZSA9PT0gby52YWx1ZSlcbiAgICAgICAgPyB7IC4uLm9wdGlvbiwgY2hlY2tlZDogdHJ1ZSB9XG4gICAgICAgIDogb3B0aW9uKSxcbiAgICApO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0L3Byb3AtdHlwZXNcbiAgICBjb25zdCBPcHRpb24gPSAoeyBkYXRhOiB7IGNoZWNrZWQsIGxhYmVsIH0sIGlubmVyUHJvcHMgfSkgPT4gKFxuICAgICAgPHNwYW4gey4uLmlubmVyUHJvcHN9PlxuICAgICAgICA8Q2hlY2tib3ggb25DaGFuZ2U9eygpID0+IHt9fSBsYWJlbD17bGFiZWx9IGNoZWNrZWQ9e2NoZWNrZWR9IC8+XG4gICAgICA8L3NwYW4+XG4gICAgKTtcblxuICAgIGNvbnN0IGZzUHJvcHMgPSB7XG4gICAgICAuLi5jb2wuZmlsdGVyQ29tcG9uZW50UHJvcHMsXG4gICAgICAuLi5zZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgICBjb21wb25lbnRzOiB7IE11bHRpVmFsdWVDb250YWluZXI6IE11bHRpVmFsdWVDb250YWluZXIoc2VsZWN0VHJhbnNsYXRpb25zLnNlbGVjdGVkKSwgT3B0aW9uIH0sXG4gICAgICBoaWRlU2VsZWN0ZWRPcHRpb25zOiBmYWxzZSxcbiAgICAgIGlzU2VhcmNoYWJsZTogc2VsZWN0T3B0aW9ucyAmJiBzZWxlY3RPcHRpb25zLmxlbmd0aCA+IDksXG4gICAgICBpc0NsZWFyYWJsZTogdHJ1ZSxcbiAgICAgIGlzTXVsdGk6IHRydWUsXG4gICAgICBuYW1lOiBgb2NEYXRhZ3JpZEZpbHRlcklucHV0LSR7Z3JpZElkfS0ke2NvbHVtbi5jb2x1bW5LZXl9YCxcbiAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbnMub25DZWxsVmFsdWVDaGFuZ2UoY29sLCBlZGl0VmFsdWVQYXJzZXIpLFxuICAgICAgb3B0aW9ucyxcbiAgICAgIHRhYlNlbGVjdHNWYWx1ZTogZmFsc2UsXG4gICAgICB0YWJJbmRleCxcbiAgICAgIHZhbHVlLFxuICAgICAgY2xvc2VNZW51T25TZWxlY3Q6IGZhbHNlLFxuICAgIH07XG5cbiAgICByZXR1cm4gPEZsb2F0aW5nU2VsZWN0UG9ydGFsIHsuLi5mc1Byb3BzfSAvPjtcbiAgfSxcbn07XG4iXX0=