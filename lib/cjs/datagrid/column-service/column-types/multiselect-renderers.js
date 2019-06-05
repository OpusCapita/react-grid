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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2VydmljZS9jb2x1bW4tdHlwZXMvbXVsdGlzZWxlY3QtcmVuZGVyZXJzLmpzeCJdLCJuYW1lcyI6WyJNdWx0aVZhbHVlQ29udGFpbmVyIiwibGFiZWwiLCJvcHRpb25zQ291bnQiLCJwcm9wZXJ0aWVzIiwic2VsZWN0UHJvcHMiLCJ2YWx1ZSIsImZpbmRJbmRleCIsInNlbGVjdFByb3AiLCJkYXRhIiwicmVwbGFjZSIsImxlbmd0aCIsInZhbFJlbmRlciIsImNvbCIsImNvbHVtbiIsInJvd0luZGV4IiwiZ3JpZElkIiwic2VsZWN0T3B0aW9ucyIsInZhbHVlUmVuZGVyIiwidmFsdWVzIiwidmFscyIsIkFycmF5IiwiaXNBcnJheSIsIkxpc3QiLCJpc0xpc3QiLCJzaXplIiwib3B0aW9uIiwiZmluZCIsIm8iLCJnZXQiLCJzZWxlY3RlZFRleHQiLCJ0cmFuc2xhdGlvbnMiLCJpdGVtc1NlbGVjdGVkIiwidmFsdWVUZXh0IiwiaXNNdWx0aXNlbGVjdFRvb2x0aXBEaXNhYmxlZCIsImNvbHVtbktleSIsInRleHRBbGlnbiIsImZpbHRlciIsImluY2x1ZGVzIiwibWFwIiwidiIsImNlbGxGaWx0ZXIiLCJ0YWJJbmRleCIsInNlbGVjdFRyYW5zbGF0aW9ucyIsImVkaXRWYWx1ZVBhcnNlciIsImZ1bmN0aW9ucyIsIm9wdHMiLCJmaWx0ZXJTZWxlY3RPcHRpb25zTW9kIiwic2xpY2UiLCJnZXRJdGVtVmFsdWUiLCJvcHRpb25zIiwic29tZSIsImNoZWNrZWQiLCJPcHRpb24iLCJpbm5lclByb3BzIiwiZnNQcm9wcyIsImZpbHRlckNvbXBvbmVudFByb3BzIiwiY29tcG9uZW50cyIsInNlbGVjdGVkIiwiaGlkZVNlbGVjdGVkT3B0aW9ucyIsImlzU2VhcmNoYWJsZSIsImlzQ2xlYXJhYmxlIiwiaXNNdWx0aSIsIm5hbWUiLCJvbkNoYW5nZSIsIm9uQ2VsbFZhbHVlQ2hhbmdlIiwidGFiU2VsZWN0c1Zh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QUFBLEtBQUssRUFBTEEsS0FqQlc7QUFrQlg2RCxNQUFBQSxpQkFBaUIsRUFBRTtBQWxCUixNQUFiOztBQXFCQSxXQUFPLGdDQUFDLHlDQUFELEVBQTBCWixPQUExQixDQUFQO0FBQ0Q7QUE5R1ksQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBmcm9tSlMsIExpc3QgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IHsgT3ZlcmxheVRyaWdnZXIsIFRvb2x0aXAgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IHsgRmxvYXRpbmdTZWxlY3RQb3J0YWwgfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1mbG9hdGluZy1zZWxlY3QnO1xuaW1wb3J0IENoZWNrYm94IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWNoZWNrYm94JztcblxuLy8gVE9ETzogY2VsbENyZWF0ZSwgY2VsbEVkaXQgcmVuZGVyZXJzIC0+IG11bHRpc2VsZWN0IGRyb3Bkb3duIGFzIGNlbGxGaWx0ZXIgaGFzXG5cbmNvbnN0IE11bHRpVmFsdWVDb250YWluZXIgPSAobGFiZWwsIG9wdGlvbnNDb3VudCkgPT4gcHJvcGVydGllcyA9PiAocHJvcGVydGllcy5zZWxlY3RQcm9wcy52YWx1ZVxuICAmJiBwcm9wZXJ0aWVzLnNlbGVjdFByb3BzLnZhbHVlLmZpbmRJbmRleChcbiAgICBzZWxlY3RQcm9wID0+IHNlbGVjdFByb3AudmFsdWUgPT09IHByb3BlcnRpZXMuZGF0YS52YWx1ZSxcbiAgKSA9PT0gMCA/IChcbiAgICA8c3Bhbj57bGFiZWwucmVwbGFjZSgnPG4+JywgYCgke3Byb3BlcnRpZXMuc2VsZWN0UHJvcHMudmFsdWUubGVuZ3RofS8ke29wdGlvbnNDb3VudH0pYCl9PC9zcGFuPlxuICApIDogbnVsbCk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdmFsUmVuZGVyKFxuICAgIGNvbCxcbiAgICBjb2x1bW4sXG4gICAgcm93SW5kZXgsXG4gICAgZ3JpZElkLFxuICAgIHNlbGVjdE9wdGlvbnMgPSBbXSxcbiAgICB2YWx1ZVJlbmRlcixcbiAgKSB7XG4gICAgcmV0dXJuIHZhbHVlUmVuZGVyKHJvd0luZGV4LCAodmFsdWVzKSA9PiB7XG4gICAgICAvLyBub3JtYWxpemUgdmFsdWVzIGFzIEltbXV0YWJsZSBMaXN0XG4gICAgICBsZXQgdmFscyA9IHZhbHVlcztcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlcykpIHtcbiAgICAgICAgdmFscyA9IGZyb21KUyh2YWx1ZXMpO1xuICAgICAgfVxuICAgICAgaWYgKCFMaXN0LmlzTGlzdCh2YWxzKSkge1xuICAgICAgICB2YWxzID0gZnJvbUpTKFt2YWx1ZXNdKTtcbiAgICAgIH1cbiAgICAgIC8vIE5vIGl0ZW1zIHJldHVybiBlbXB0eSBzdHJpbmdcbiAgICAgIGlmICghdmFscy5zaXplKSByZXR1cm4gJyc7XG4gICAgICAvLyBJZiBvbmx5IG9uZSBpcyBzZWxlY3RlZCByZW5kZXIgdmFsdWUgbm9ybWFsbHlcbiAgICAgIGlmICh2YWxzLnNpemUgPT09IDEpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9uID0gc2VsZWN0T3B0aW9ucy5maW5kKG8gPT4gby52YWx1ZSA9PT0gdmFscy5nZXQoMCkpO1xuICAgICAgICByZXR1cm4gb3B0aW9uID8gb3B0aW9uLmxhYmVsIDogbnVsbDtcbiAgICAgIH1cbiAgICAgIC8vIE11bHRpcGxlIHZhbHVlcyBzZWxlY3RlZCwgcmVuZGVyICczIHNlbGVjdGVkJ1xuICAgICAgY29uc3Qgc2VsZWN0ZWRUZXh0ID0gKGNvbC50cmFuc2xhdGlvbnMgJiYgY29sLnRyYW5zbGF0aW9ucy5pdGVtc1NlbGVjdGVkKSB8fCAnc2VsZWN0ZWQnO1xuICAgICAgY29uc3QgdmFsdWVUZXh0ID0gKFxuICAgICAgICA8c3Bhbj5cbiAgICAgICAgICB7YCR7dmFscy5zaXplfSAke3NlbGVjdGVkVGV4dH1gfVxuICAgICAgICA8L3NwYW4+XG4gICAgICApO1xuICAgICAgLy8gd2l0aG91dCB0b29sdGlwXG4gICAgICBpZiAoY29sLmlzTXVsdGlzZWxlY3RUb29sdGlwRGlzYWJsZWQpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlVGV4dDtcbiAgICAgIH1cbiAgICAgIC8vIHdpdGggdG9vbHRpcFxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPE92ZXJsYXlUcmlnZ2VyXG4gICAgICAgICAgcGxhY2VtZW50PVwidG9wXCJcbiAgICAgICAgICBvdmVybGF5PXsoXG4gICAgICAgICAgICA8VG9vbHRpcCBpZD17YG9jRGF0YWdyaWRNdWx0aXNlbGVjdFRvb2x0aXAtJHtncmlkSWR9LSR7Y29sdW1uLmNvbHVtbktleX0tJHtyb3dJbmRleH1gfT5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyB0ZXh0QWxpZ246ICdsZWZ0JyB9fT5cbiAgICAgICAgICAgICAgICB7c2VsZWN0T3B0aW9ucy5maWx0ZXIobyA9PiB2YWxzLmluY2x1ZGVzKG8udmFsdWUpKS5tYXAodiA9PiAoXG4gICAgICAgICAgICAgICAgICA8UmVhY3QuRnJhZ21lbnQga2V5PXt2LnZhbHVlfT5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAge3YubGFiZWx9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGJyIC8+XG4gICAgICAgICAgICAgICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvVG9vbHRpcD5cbiAgICAgICAgICApfVxuICAgICAgICAgIGRlbGF5PXs1MDB9XG4gICAgICAgID5cbiAgICAgICAgICB7dmFsdWVUZXh0fVxuICAgICAgICA8L092ZXJsYXlUcmlnZ2VyPlxuICAgICAgKTtcbiAgICB9KTtcbiAgfSxcbiAgY2VsbEZpbHRlcihcbiAgICBjb2wsXG4gICAgY29sdW1uLFxuICAgIHRhYkluZGV4LFxuICAgIGdyaWRJZCxcbiAgICBzZWxlY3RPcHRpb25zLFxuICAgIHNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICBlZGl0VmFsdWVQYXJzZXIsXG4gICAgZnVuY3Rpb25zLFxuICApIHtcbiAgICBjb25zdCBvcHRzID0gY29sLmZpbHRlclNlbGVjdE9wdGlvbnNNb2QgJiYgc2VsZWN0T3B0aW9uc1xuICAgICAgPyBjb2wuZmlsdGVyU2VsZWN0T3B0aW9uc01vZChzZWxlY3RPcHRpb25zLnNsaWNlKCksIGNvbClcbiAgICAgIDogc2VsZWN0T3B0aW9ucztcbiAgICBjb25zdCB2YWx1ZSA9IGZ1bmN0aW9ucy5nZXRJdGVtVmFsdWUoY29sLCB7IHNlbGVjdE9wdGlvbnMgfSk7XG4gICAgY29uc3Qgb3B0aW9ucyA9IG9wdHMubWFwKFxuICAgICAgb3B0aW9uID0+ICh2YWx1ZSAmJiB2YWx1ZS5zb21lKG8gPT4gb3B0aW9uLnZhbHVlID09PSBvLnZhbHVlKVxuICAgICAgICA/IHsgLi4ub3B0aW9uLCBjaGVja2VkOiB0cnVlIH1cbiAgICAgICAgOiBvcHRpb24pLFxuICAgICk7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QvcHJvcC10eXBlc1xuICAgIGNvbnN0IE9wdGlvbiA9ICh7IGRhdGE6IHsgY2hlY2tlZCwgbGFiZWwgfSwgaW5uZXJQcm9wcyB9KSA9PiAoXG4gICAgICA8c3BhbiB7Li4uaW5uZXJQcm9wc30+XG4gICAgICAgIDxDaGVja2JveCBvbkNoYW5nZT17KCkgPT4ge319IGxhYmVsPXtsYWJlbH0gY2hlY2tlZD17Y2hlY2tlZH0gLz5cbiAgICAgIDwvc3Bhbj5cbiAgICApO1xuXG4gICAgY29uc3QgZnNQcm9wcyA9IHtcbiAgICAgIC4uLmNvbC5maWx0ZXJDb21wb25lbnRQcm9wcyxcbiAgICAgIC4uLnNlbGVjdFRyYW5zbGF0aW9ucyxcbiAgICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgTXVsdGlWYWx1ZUNvbnRhaW5lcjogTXVsdGlWYWx1ZUNvbnRhaW5lcihzZWxlY3RUcmFuc2xhdGlvbnMuc2VsZWN0ZWQsXG4gICAgICAgICAgKG9wdGlvbnMgfHwgW10pLmxlbmd0aCksXG4gICAgICAgIE9wdGlvbixcbiAgICAgIH0sXG4gICAgICBoaWRlU2VsZWN0ZWRPcHRpb25zOiBmYWxzZSxcbiAgICAgIGlzU2VhcmNoYWJsZTogc2VsZWN0T3B0aW9ucyAmJiBzZWxlY3RPcHRpb25zLmxlbmd0aCA+IDksXG4gICAgICBpc0NsZWFyYWJsZTogdHJ1ZSxcbiAgICAgIGlzTXVsdGk6IHRydWUsXG4gICAgICBuYW1lOiBgb2NEYXRhZ3JpZEZpbHRlcklucHV0LSR7Z3JpZElkfS0ke2NvbHVtbi5jb2x1bW5LZXl9YCxcbiAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbnMub25DZWxsVmFsdWVDaGFuZ2UoY29sLCBlZGl0VmFsdWVQYXJzZXIpLFxuICAgICAgb3B0aW9ucyxcbiAgICAgIHRhYlNlbGVjdHNWYWx1ZTogZmFsc2UsXG4gICAgICB0YWJJbmRleCxcbiAgICAgIHZhbHVlLFxuICAgICAgY2xvc2VNZW51T25TZWxlY3Q6IGZhbHNlLFxuICAgIH07XG5cbiAgICByZXR1cm4gPEZsb2F0aW5nU2VsZWN0UG9ydGFsIHsuLi5mc1Byb3BzfSAvPjtcbiAgfSxcbn07XG4iXX0=