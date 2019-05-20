"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactFloatingSelect = require("@opuscapita/react-floating-select");

var _reactCheckbox = _interopRequireDefault(require("@opuscapita/react-checkbox"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var MultiValueContainer = function MultiValueContainer(label, optionsCount) {
  return function (properties) {
    return properties.selectProps.value && properties.selectProps.value.findIndex(function (selectProp) {
      return selectProp.value === properties.data.value;
    }) === 0 ? _react["default"].createElement("span", null, label.replace('<n>', "(" + properties.selectProps.value.length + "/" + optionsCount + ")")) : null;
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
        MultiValueContainer: MultiValueContainer(selectTranslations.selected, (options || []).length),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2VydmljZS9jb2x1bW4tdHlwZXMvbXVsdGlzZWxlY3QtcmVuZGVyZXJzLmpzeCJdLCJuYW1lcyI6WyJNdWx0aVZhbHVlQ29udGFpbmVyIiwibGFiZWwiLCJvcHRpb25zQ291bnQiLCJwcm9wZXJ0aWVzIiwic2VsZWN0UHJvcHMiLCJ2YWx1ZSIsImZpbmRJbmRleCIsInNlbGVjdFByb3AiLCJkYXRhIiwicmVwbGFjZSIsImxlbmd0aCIsImNlbGxGaWx0ZXIiLCJjb2wiLCJjb2x1bW4iLCJ0YWJJbmRleCIsImdyaWRJZCIsInNlbGVjdE9wdGlvbnMiLCJzZWxlY3RUcmFuc2xhdGlvbnMiLCJlZGl0VmFsdWVQYXJzZXIiLCJmdW5jdGlvbnMiLCJvcHRzIiwiZmlsdGVyU2VsZWN0T3B0aW9uc01vZCIsInNsaWNlIiwiZ2V0SXRlbVZhbHVlIiwib3B0aW9ucyIsIm1hcCIsIm9wdGlvbiIsInNvbWUiLCJvIiwiY2hlY2tlZCIsIk9wdGlvbiIsImlubmVyUHJvcHMiLCJmc1Byb3BzIiwiZmlsdGVyQ29tcG9uZW50UHJvcHMiLCJjb21wb25lbnRzIiwic2VsZWN0ZWQiLCJoaWRlU2VsZWN0ZWRPcHRpb25zIiwiaXNTZWFyY2hhYmxlIiwiaXNDbGVhcmFibGUiLCJpc011bHRpIiwibmFtZSIsImNvbHVtbktleSIsIm9uQ2hhbmdlIiwib25DZWxsVmFsdWVDaGFuZ2UiLCJ0YWJTZWxlY3RzVmFsdWUiLCJjbG9zZU1lbnVPblNlbGVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsbUJBQW1CLEdBQUcsU0FBdEJBLG1CQUFzQixDQUFDQyxLQUFELEVBQVFDLFlBQVI7QUFBQSxTQUF5QixVQUFBQyxVQUFVO0FBQUEsV0FBS0EsVUFBVSxDQUFDQyxXQUFYLENBQXVCQyxLQUF2QixJQUMvREYsVUFBVSxDQUFDQyxXQUFYLENBQXVCQyxLQUF2QixDQUE2QkMsU0FB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O0FBcUJBLFdBQU8sZ0NBQUMseUNBQUQsRUFBMEJiLE9BQTFCLENBQVA7QUFDRDtBQWxEWSxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEZsb2F0aW5nU2VsZWN0UG9ydGFsIH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtZmxvYXRpbmctc2VsZWN0JztcbmltcG9ydCBDaGVja2JveCBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1jaGVja2JveCc7XG5cbmNvbnN0IE11bHRpVmFsdWVDb250YWluZXIgPSAobGFiZWwsIG9wdGlvbnNDb3VudCkgPT4gcHJvcGVydGllcyA9PiAocHJvcGVydGllcy5zZWxlY3RQcm9wcy52YWx1ZVxuICAmJiBwcm9wZXJ0aWVzLnNlbGVjdFByb3BzLnZhbHVlLmZpbmRJbmRleChcbiAgICBzZWxlY3RQcm9wID0+IHNlbGVjdFByb3AudmFsdWUgPT09IHByb3BlcnRpZXMuZGF0YS52YWx1ZSxcbiAgKSA9PT0gMCA/IChcbiAgICA8c3Bhbj57bGFiZWwucmVwbGFjZSgnPG4+JywgYCgke3Byb3BlcnRpZXMuc2VsZWN0UHJvcHMudmFsdWUubGVuZ3RofS8ke29wdGlvbnNDb3VudH0pYCl9PC9zcGFuPlxuICApIDogbnVsbCk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY2VsbEZpbHRlcihcbiAgICBjb2wsXG4gICAgY29sdW1uLFxuICAgIHRhYkluZGV4LFxuICAgIGdyaWRJZCxcbiAgICBzZWxlY3RPcHRpb25zLFxuICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgZnVuY3Rpb25zLFxuICApIHtcbiAgICBjb25zdCBvcHRzID0gY29sLmZpbHRlclNlbGVjdE9wdGlvbnNNb2QgJiYgc2VsZWN0T3B0aW9uc1xuICAgICAgPyBjb2wuZmlsdGVyU2VsZWN0T3B0aW9uc01vZChzZWxlY3RPcHRpb25zLnNsaWNlKCksIGNvbClcbiAgICAgIDogc2VsZWN0T3B0aW9ucztcbiAgICBjb25zdCB2YWx1ZSA9IGZ1bmN0aW9ucy5nZXRJdGVtVmFsdWUoY29sLCB7IHNlbGVjdE9wdGlvbnMgfSk7XG4gICAgY29uc3Qgb3B0aW9ucyA9IG9wdHMubWFwKFxuICAgICAgb3B0aW9uID0+ICh2YWx1ZSAmJiB2YWx1ZS5zb21lKG8gPT4gb3B0aW9uLnZhbHVlID09PSBvLnZhbHVlKVxuICAgICAgICA/IHsgLi4ub3B0aW9uLCBjaGVja2VkOiB0cnVlIH1cbiAgICAgICAgOiBvcHRpb24pLFxuICAgICk7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QvcHJvcC10eXBlc1xuICAgIGNvbnN0IE9wdGlvbiA9ICh7IGRhdGE6IHsgY2hlY2tlZCwgbGFiZWwgfSwgaW5uZXJQcm9wcyB9KSA9PiAoXG4gICAgICA8c3BhbiB7Li4uaW5uZXJQcm9wc30+XG4gICAgICAgIDxDaGVja2JveCBvbkNoYW5nZT17KCkgPT4ge319IGxhYmVsPXtsYWJlbH0gY2hlY2tlZD17Y2hlY2tlZH0gLz5cbiAgICAgIDwvc3Bhbj5cbiAgICApO1xuXG4gICAgY29uc3QgZnNQcm9wcyA9IHtcbiAgICAgIC4uLmNvbC5maWx0ZXJDb21wb25lbnRQcm9wcyxcbiAgICAgIC4uLnNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgTXVsdGlWYWx1ZUNvbnRhaW5lcjogTXVsdGlWYWx1ZUNvbnRhaW5lcihzZWxlY3RUcmFuc2xhdGlvbnMuc2VsZWN0ZWQsXG4gICAgICAgICAgKG9wdGlvbnMgfHwgW10pLmxlbmd0aCksXG4gICAgICAgIE9wdGlvbixcbiAgICAgIH0sXG4gICAgICBoaWRlU2VsZWN0ZWRPcHRpb25zOiBmYWxzZSxcbiAgICAgIGlzU2VhcmNoYWJsZTogc2VsZWN0T3B0aW9ucyAmJiBzZWxlY3RPcHRpb25zLmxlbmd0aCA+IDksXG4gICAgICBpc0NsZWFyYWJsZTogdHJ1ZSxcbiAgICAgIGlzTXVsdGk6IHRydWUsXG4gICAgICBuYW1lOiBgb2NEYXRhZ3JpZEZpbHRlcklucHV0LSR7Z3JpZElkfS0ke2NvbHVtbi5jb2x1bW5LZXl9YCxcbiAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbnMub25DZWxsVmFsdWVDaGFuZ2UoY29sLCBlZGl0VmFsdWVQYXJzZXIpLFxuICAgICAgb3B0aW9ucyxcbiAgICAgIHRhYlNlbGVjdHNWYWx1ZTogZmFsc2UsXG4gICAgICB0YWJJbmRleCxcbiAgICAgIHZhbHVlLFxuICAgICAgY2xvc2VNZW51T25TZWxlY3Q6IGZhbHNlLFxuICAgIH07XG5cbiAgICByZXR1cm4gPEZsb2F0aW5nU2VsZWN0UG9ydGFsIHsuLi5mc1Byb3BzfSAvPjtcbiAgfSxcbn07XG4iXX0=