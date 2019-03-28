'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactFloatingSelect = require('@opuscapita/react-floating-select');

var _reactCheckbox = require('@opuscapita/react-checkbox');

var _reactCheckbox2 = _interopRequireDefault(_reactCheckbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MultiValueContainer = function MultiValueContainer(label) {
  return function (properties) {
    return properties.selectProps.value && properties.selectProps.value.findIndex(function (selectProp) {
      return selectProp.value === properties.data.value;
    }) === 0 ? _react2.default.createElement(
      'span',
      null,
      label.replace('<n>', properties.selectProps.value.length)
    ) : null;
  };
};

exports.default = {
  cellFilter: function cellFilter(col, column, tabIndex, gridId, selectOptions, selectTranslations, editValueParser, functions) {
    var opts = col.filterSelectOptionsMod && selectOptions ? col.filterSelectOptionsMod(selectOptions.slice(), col) : selectOptions;
    var value = functions.getItemValue(col, { selectOptions: selectOptions });
    var options = opts.map(function (option) {
      return value && value.some(function (o) {
        return option.value === o.value;
      }) ? _extends({}, option, { checked: true }) : option;
    });

    // eslint-disable-next-line react/prop-types
    var Option = function Option(_ref) {
      var _ref$data = _ref.data,
          checked = _ref$data.checked,
          label = _ref$data.label,
          innerProps = _ref.innerProps;
      return _react2.default.createElement(
        'span',
        innerProps,
        _react2.default.createElement(_reactCheckbox2.default, { onChange: function onChange() {}, label: label, checked: checked })
      );
    };

    var fsProps = _extends({}, col.filterComponentProps, selectTranslations, {
      components: { MultiValueContainer: MultiValueContainer(selectTranslations.selected), Option: Option },
      hideSelectedOptions: false,
      isSearchable: selectOptions && selectOptions.length > 9,
      isClearable: true,
      isMulti: true,
      name: 'ocDatagridFilterInput-' + gridId + '-' + column.columnKey,
      onChange: functions.onCellValueChange(col, editValueParser),
      options: options,
      tabSelectsValue: false,
      tabIndex: tabIndex,
      value: value,
      closeMenuOnSelect: false
    });

    return _react2.default.createElement(_reactFloatingSelect.FloatingSelectPortal, fsProps);
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2VydmljZS9jb2x1bW4tdHlwZXMvbXVsdGlzZWxlY3QtcmVuZGVyZXJzLmpzeCJdLCJuYW1lcyI6WyJNdWx0aVZhbHVlQ29udGFpbmVyIiwicHJvcGVydGllcyIsInNlbGVjdFByb3BzIiwidmFsdWUiLCJmaW5kSW5kZXgiLCJzZWxlY3RQcm9wIiwiZGF0YSIsImxhYmVsIiwicmVwbGFjZSIsImxlbmd0aCIsImNlbGxGaWx0ZXIiLCJjb2wiLCJjb2x1bW4iLCJ0YWJJbmRleCIsImdyaWRJZCIsInNlbGVjdE9wdGlvbnMiLCJzZWxlY3RUcmFuc2xhdGlvbnMiLCJlZGl0VmFsdWVQYXJzZXIiLCJmdW5jdGlvbnMiLCJvcHRzIiwiZmlsdGVyU2VsZWN0T3B0aW9uc01vZCIsInNsaWNlIiwiZ2V0SXRlbVZhbHVlIiwib3B0aW9ucyIsIm1hcCIsInNvbWUiLCJvcHRpb24iLCJvIiwiY2hlY2tlZCIsIk9wdGlvbiIsImlubmVyUHJvcHMiLCJmc1Byb3BzIiwiZmlsdGVyQ29tcG9uZW50UHJvcHMiLCJjb21wb25lbnRzIiwic2VsZWN0ZWQiLCJoaWRlU2VsZWN0ZWRPcHRpb25zIiwiaXNTZWFyY2hhYmxlIiwiaXNDbGVhcmFibGUiLCJpc011bHRpIiwibmFtZSIsImNvbHVtbktleSIsIm9uQ2hhbmdlIiwib25DZWxsVmFsdWVDaGFuZ2UiLCJ0YWJTZWxlY3RzVmFsdWUiLCJjbG9zZU1lbnVPblNlbGVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsc0JBQXNCLFNBQXRCQSxtQkFBc0I7QUFBQSxTQUFTO0FBQUEsV0FDbkNDLFdBQVdDLFdBQVgsQ0FBdUJDLEtBQXZCLElBQ0dGLFdBQVdDLFdBQVgsQ0FBdUJDLEtBQXZCLENBQTZCQyxTQUE3QixDQUF1QztBQUFBLGFBQ3hDQyxXQUFXRixLQUFYLEtBQXFCRixXQUFXSyxJQUFYLENBQWdCSCxLQURHO0FBQUEsS0FBdkMsTUFDK0MsQ0FGbEQsR0FHSTtBQUFBO0FBQUE7QUFBT0ksWUFBTUMsT0FBTixDQUFjLEtBQWQsRUFBcUJQLFdBQVdDLFdBQVgsQ0FBdUJDLEtBQXZCLENBQTZCTSxNQUFsRDtBQUFQLEtBSEosR0FJSSxJQUwrQjtBQUFBLEdBQVQ7QUFBQSxDQUE1Qjs7a0JBUWU7QUFDYkMsWUFEYSxzQkFFWEMsR0FGVyxFQUdYQyxNQUhXLEVBSVhDLFFBSlcsRUFLWEMsTUFMVyxFQU1YQyxhQU5XLEVBT1hDLGtCQVBXLEVBUVhDLGVBUlcsRUFTWEMsU0FUVyxFQVVYO0FBQ0EsUUFBTUMsT0FBT1IsSUFBSVMsc0JBQUosSUFBOEJMLGFBQTlCLEdBQ1hKLElBQUlTLHNCQUFKLENBQTJCTCxjQUFjTSxLQUFkLEVBQTNCLEVBQWtEVixHQUFsRCxDQURXLEdBRVhJLGFBRkY7QUFHQSxRQUFNWixRQUFRZSxVQUFVSSxZQUFWLENBQXVCWCxHQUF2QixFQUE0QixFQUFFSSw0QkFBRixFQUE1QixDQUFkO0FBQ0EsUUFBTVEsVUFBVUosS0FBS0ssR0FBTCxDQUFTO0FBQUEsYUFDdkJyQixTQUFTQSxNQUFNc0IsSUFBTixDQUFXO0FBQUEsZUFBS0MsT0FBT3ZCLEtBQVAsS0FBaUJ3QixFQUFFeEIsS0FBeEI7QUFBQSxPQUFYLENBQVQsZ0JBQ1N1QixNQURULElBQ2lCRSxTQUFTLElBRDFCLE1BRUlGLE1BSG1CO0FBQUEsS0FBVCxDQUFoQjs7QUFNQTtBQUNBLFFBQU1HLFNBQVMsU0FBVEEsTUFBUztBQUFBLDJCQUFHdkIsSUFBSDtBQUFBLFVBQVdzQixPQUFYLGFBQVdBLE9BQVg7QUFBQSxVQUFvQnJCLEtBQXBCLGFBQW9CQSxLQUFwQjtBQUFBLFVBQTZCdUIsVUFBN0IsUUFBNkJBLFVBQTdCO0FBQUEsYUFDYjtBQUFBO0FBQVVBLGtCQUFWO0FBQ0Usc0NBQUMsdUJBQUQsSUFBVSxVQUFVLG9CQUFNLENBQUUsQ0FBNUIsRUFBOEIsT0FBT3ZCLEtBQXJDLEVBQTRDLFNBQVNxQixPQUFyRDtBQURGLE9BRGE7QUFBQSxLQUFmOztBQU1BLFFBQU1HLHVCQUNEcEIsSUFBSXFCLG9CQURILEVBRURoQixrQkFGQztBQUdKaUIsa0JBQVksRUFBRWpDLHFCQUFxQkEsb0JBQW9CZ0IsbUJBQW1Ca0IsUUFBdkMsQ0FBdkIsRUFBeUVMLGNBQXpFLEVBSFI7QUFJSk0sMkJBQXFCLEtBSmpCO0FBS0pDLG9CQUFjckIsaUJBQWtCQSxjQUFjTixNQUFkLEdBQXVCLENBTG5EO0FBTUo0QixtQkFBYSxJQU5UO0FBT0pDLGVBQVMsSUFQTDtBQVFKQyx1Q0FBK0J6QixNQUEvQixTQUF5Q0YsT0FBTzRCLFNBUjVDO0FBU0pDLGdCQUFVdkIsVUFBVXdCLGlCQUFWLENBQTRCL0IsR0FBNUIsRUFBaUNNLGVBQWpDLENBVE47QUFVSk0sc0JBVkk7QUFXSm9CLHVCQUFpQixLQVhiO0FBWUo5Qix3QkFaSTtBQWFKVixrQkFiSTtBQWNKeUMseUJBQW1CO0FBZGYsTUFBTjs7QUFpQkEsV0FBTyw4QkFBQyx5Q0FBRCxFQUEwQmIsT0FBMUIsQ0FBUDtBQUNEO0FBOUNZLEMiLCJmaWxlIjoibXVsdGlzZWxlY3QtcmVuZGVyZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEZsb2F0aW5nU2VsZWN0UG9ydGFsIH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtZmxvYXRpbmctc2VsZWN0JztcbmltcG9ydCBDaGVja2JveCBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1jaGVja2JveCc7XG5cbmNvbnN0IE11bHRpVmFsdWVDb250YWluZXIgPSBsYWJlbCA9PiBwcm9wZXJ0aWVzID0+IChcbiAgcHJvcGVydGllcy5zZWxlY3RQcm9wcy52YWx1ZVxuICAmJiBwcm9wZXJ0aWVzLnNlbGVjdFByb3BzLnZhbHVlLmZpbmRJbmRleChzZWxlY3RQcm9wID0+XG4gICAgc2VsZWN0UHJvcC52YWx1ZSA9PT0gcHJvcGVydGllcy5kYXRhLnZhbHVlKSA9PT0gMFxuICAgID8gPHNwYW4+e2xhYmVsLnJlcGxhY2UoJzxuPicsIHByb3BlcnRpZXMuc2VsZWN0UHJvcHMudmFsdWUubGVuZ3RoKX08L3NwYW4+XG4gICAgOiBudWxsXG4pO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNlbGxGaWx0ZXIoXG4gICAgY29sLFxuICAgIGNvbHVtbixcbiAgICB0YWJJbmRleCxcbiAgICBncmlkSWQsXG4gICAgc2VsZWN0T3B0aW9ucyxcbiAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgIGZ1bmN0aW9ucyxcbiAgKSB7XG4gICAgY29uc3Qgb3B0cyA9IGNvbC5maWx0ZXJTZWxlY3RPcHRpb25zTW9kICYmIHNlbGVjdE9wdGlvbnMgP1xuICAgICAgY29sLmZpbHRlclNlbGVjdE9wdGlvbnNNb2Qoc2VsZWN0T3B0aW9ucy5zbGljZSgpLCBjb2wpIDpcbiAgICAgIHNlbGVjdE9wdGlvbnM7XG4gICAgY29uc3QgdmFsdWUgPSBmdW5jdGlvbnMuZ2V0SXRlbVZhbHVlKGNvbCwgeyBzZWxlY3RPcHRpb25zIH0pO1xuICAgIGNvbnN0IG9wdGlvbnMgPSBvcHRzLm1hcChvcHRpb24gPT4gKFxuICAgICAgdmFsdWUgJiYgdmFsdWUuc29tZShvID0+IG9wdGlvbi52YWx1ZSA9PT0gby52YWx1ZSlcbiAgICAgICAgPyB7IC4uLm9wdGlvbiwgY2hlY2tlZDogdHJ1ZSB9XG4gICAgICAgIDogb3B0aW9uXG4gICAgKSk7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QvcHJvcC10eXBlc1xuICAgIGNvbnN0IE9wdGlvbiA9ICh7IGRhdGE6IHsgY2hlY2tlZCwgbGFiZWwgfSwgaW5uZXJQcm9wcyB9KSA9PiAoXG4gICAgICA8c3BhbiB7Li4uaW5uZXJQcm9wc30+XG4gICAgICAgIDxDaGVja2JveCBvbkNoYW5nZT17KCkgPT4ge319IGxhYmVsPXtsYWJlbH0gY2hlY2tlZD17Y2hlY2tlZH0gLz5cbiAgICAgIDwvc3Bhbj5cbiAgICApO1xuXG4gICAgY29uc3QgZnNQcm9wcyA9IHtcbiAgICAgIC4uLmNvbC5maWx0ZXJDb21wb25lbnRQcm9wcyxcbiAgICAgIC4uLnNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgIGNvbXBvbmVudHM6IHsgTXVsdGlWYWx1ZUNvbnRhaW5lcjogTXVsdGlWYWx1ZUNvbnRhaW5lcihzZWxlY3RUcmFuc2xhdGlvbnMuc2VsZWN0ZWQpLCBPcHRpb24gfSxcbiAgICAgIGhpZGVTZWxlY3RlZE9wdGlvbnM6IGZhbHNlLFxuICAgICAgaXNTZWFyY2hhYmxlOiBzZWxlY3RPcHRpb25zICYmIChzZWxlY3RPcHRpb25zLmxlbmd0aCA+IDkpLFxuICAgICAgaXNDbGVhcmFibGU6IHRydWUsXG4gICAgICBpc011bHRpOiB0cnVlLFxuICAgICAgbmFtZTogYG9jRGF0YWdyaWRGaWx0ZXJJbnB1dC0ke2dyaWRJZH0tJHtjb2x1bW4uY29sdW1uS2V5fWAsXG4gICAgICBvbkNoYW5nZTogZnVuY3Rpb25zLm9uQ2VsbFZhbHVlQ2hhbmdlKGNvbCwgZWRpdFZhbHVlUGFyc2VyKSxcbiAgICAgIG9wdGlvbnMsXG4gICAgICB0YWJTZWxlY3RzVmFsdWU6IGZhbHNlLFxuICAgICAgdGFiSW5kZXgsXG4gICAgICB2YWx1ZSxcbiAgICAgIGNsb3NlTWVudU9uU2VsZWN0OiBmYWxzZSxcbiAgICB9O1xuXG4gICAgcmV0dXJuIDxGbG9hdGluZ1NlbGVjdFBvcnRhbCB7Li4uZnNQcm9wc30gLz47XG4gIH0sXG59O1xuIl19