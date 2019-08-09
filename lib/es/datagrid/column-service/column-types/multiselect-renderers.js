function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { fromJS, List } from 'immutable';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FloatingSelectPortal } from '@opuscapita/react-floating-select';
import Checkbox from '@opuscapita/react-checkbox'; // TODO: cellCreate, cellEdit renderers -> multiselect dropdown as cellFilter has

var MultiValueContainer = function MultiValueContainer(label, optionsCount) {
  return function (properties) {
    return properties.selectProps.value && properties.selectProps.value.findIndex(function (selectProp) {
      return selectProp.value === properties.data.value;
    }) === 0 ? React.createElement("span", null, label.replace('<n>', "(" + properties.selectProps.value.length + "/" + optionsCount + ")")) : null;
  };
};

export default {
  valRender: function valRender(col, column, rowIndex, gridId, selectOptions, valueRender) {
    if (selectOptions === void 0) {
      selectOptions = [];
    }

    return valueRender(rowIndex, function (values) {
      // normalize values as Immutable List
      var vals = values;

      if (Array.isArray(values)) {
        vals = fromJS(values);
      }

      if (!List.isList(vals)) {
        vals = fromJS([values]);
      } // No items return empty string


      if (!vals.size) return ''; // If only one is selected render value normally

      if (vals.size === 1) {
        var option = selectOptions.find(function (o) {
          return o.value === vals.get(0);
        });
        return option ? option.label : null;
      } // Multiple values selected, render '3 selected'


      var selectedText = col.translations && col.translations.itemsSelected || 'selected';
      var valueText = React.createElement("span", null, vals.size + " " + selectedText); // without tooltip

      if (col.isMultiselectTooltipDisabled) {
        return valueText;
      } // with tooltip


      return React.createElement(OverlayTrigger, {
        placement: "top",
        overlay: React.createElement(Tooltip, {
          id: "ocDatagridMultiselectTooltip-" + gridId + "-" + column.columnKey + "-" + rowIndex
        }, React.createElement("div", {
          style: {
            textAlign: 'left'
          }
        }, selectOptions.filter(function (o) {
          return vals.includes(o.value);
        }).map(function (v) {
          return React.createElement(React.Fragment, {
            key: v.value
          }, React.createElement("span", null, v.label), React.createElement("br", null));
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
      return React.createElement("span", innerProps, React.createElement(Checkbox, {
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

    return React.createElement(FloatingSelectPortal, fsProps);
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2VydmljZS9jb2x1bW4tdHlwZXMvbXVsdGlzZWxlY3QtcmVuZGVyZXJzLmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsImZyb21KUyIsIkxpc3QiLCJPdmVybGF5VHJpZ2dlciIsIlRvb2x0aXAiLCJGbG9hdGluZ1NlbGVjdFBvcnRhbCIsIkNoZWNrYm94IiwiTXVsdGlWYWx1ZUNvbnRhaW5lciIsImxhYmVsIiwib3B0aW9uc0NvdW50IiwicHJvcGVydGllcyIsInNlbGVjdFByb3BzIiwidmFsdWUiLCJmaW5kSW5kZXgiLCJzZWxlY3RQcm9wIiwiZGF0YSIsInJlcGxhY2UiLCJsZW5ndGgiLCJ2YWxSZW5kZXIiLCJjb2wiLCJjb2x1bW4iLCJyb3dJbmRleCIsImdyaWRJZCIsInNlbGVjdE9wdGlvbnMiLCJ2YWx1ZVJlbmRlciIsInZhbHVlcyIsInZhbHMiLCJBcnJheSIsImlzQXJyYXkiLCJpc0xpc3QiLCJzaXplIiwib3B0aW9uIiwiZmluZCIsIm8iLCJnZXQiLCJzZWxlY3RlZFRleHQiLCJ0cmFuc2xhdGlvbnMiLCJpdGVtc1NlbGVjdGVkIiwidmFsdWVUZXh0IiwiaXNNdWx0aXNlbGVjdFRvb2x0aXBEaXNhYmxlZCIsImNvbHVtbktleSIsInRleHRBbGlnbiIsImZpbHRlciIsImluY2x1ZGVzIiwibWFwIiwidiIsImNlbGxGaWx0ZXIiLCJ0YWJJbmRleCIsInNlbGVjdFRyYW5zbGF0aW9ucyIsImVkaXRWYWx1ZVBhcnNlciIsImZ1bmN0aW9ucyIsIm9wdHMiLCJmaWx0ZXJTZWxlY3RPcHRpb25zTW9kIiwic2xpY2UiLCJnZXRJdGVtTXVsdGlWYWx1ZSIsIm9wdGlvbnMiLCJzb21lIiwiY2hlY2tlZCIsIk9wdGlvbiIsImlubmVyUHJvcHMiLCJmc1Byb3BzIiwiZmlsdGVyQ29tcG9uZW50UHJvcHMiLCJjb21wb25lbnRzIiwic2VsZWN0ZWQiLCJoaWRlU2VsZWN0ZWRPcHRpb25zIiwiaXNTZWFyY2hhYmxlIiwiaXNDbGVhcmFibGUiLCJpc011bHRpIiwibmFtZSIsIm9uQ2hhbmdlIiwib25DZWxsTXVsdGlWYWx1ZUNoYW5nZSIsIm9uQmx1ciIsIm9uQ2VsbE11bHRpVmFsdWVCbHVyIiwidGFiU2VsZWN0c1ZhbHVlIiwiY2xvc2VNZW51T25TZWxlY3QiXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLFNBQVNDLE1BQVQsRUFBaUJDLElBQWpCLFFBQTZCLFdBQTdCO0FBQ0EsU0FBU0MsY0FBVCxFQUF5QkMsT0FBekIsUUFBd0MsaUJBQXhDO0FBQ0EsU0FBU0Msb0JBQVQsUUFBcUMsbUNBQXJDO0FBQ0EsT0FBT0MsUUFBUCxNQUFxQiw0QkFBckIsQyxDQUVBOztBQUVBLElBQU1DLG1CQUFtQixHQUFHLFNBQXRCQSxtQkFBc0IsQ0FBQ0MsS0FBRCxFQUFRQyxZQUFSO0FBQUEsU0FBeUIsVUFBQUMsVUFBVTtBQUFBLFdBQUtBLFVBQVUsQ0FBQ0MsV0FBWCxDQUF1QkMsS0FBdkIsSUFDL0RGLFVBQVUsQ0FBQ0MsV0FBWCxDQUF1QkMsS0FBdkIsQ0FBNkJDLFNBQTdCLENBQ0QsVUFBQUMsVUFBVTtBQUFBLGFBQUlBLFVBQVUsQ0FBQ0YsS0FBWCxLQUFxQkYsVUFBVSxDQUFDSyxJQUFYLENBQWdCSCxLQUF6QztBQUFBLEtBRFQsTUFFRyxDQUg0RCxHQUloRSxrQ0FBT0osS0FBSyxDQUFDUSxPQUFOLENBQWMsS0FBZCxRQUF5Qk4sVUFBVSxDQUFDQyxXQUFYLENBQXVCQyxLQUF2QixDQUE2QkssTUFBdEQsU0FBZ0VSLFlBQWhFLE9BQVAsQ0FKZ0UsR0FLOUQsSUFMeUQ7QUFBQSxHQUFuQztBQUFBLENBQTVCOztBQU9BLGVBQWU7QUFDYlMsRUFBQUEsU0FEYSxxQkFFWEMsR0FGVyxFQUdYQyxNQUhXLEVBSVhDLFFBSlcsRUFLWEMsTUFMVyxFQU1YQyxhQU5XLEVBT1hDLFdBUFcsRUFRWDtBQUFBLFFBRkFELGFBRUE7QUFGQUEsTUFBQUEsYUFFQSxHQUZnQixFQUVoQjtB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LElBWEU7QUFZWEMsTUFBQUEsSUFBSSw2QkFBMkI5QyxNQUEzQixTQUFxQ0YsTUFBTSxDQUFDb0IsU0FackM7QUFhWDZCLE1BQUFBLFFBQVEsRUFBRW5CLFNBQVMsQ0FBQ29CLHNCQUFWLENBQWlDbkQsR0FBakMsRUFBc0M4QixlQUF0QyxDQWJDO0FBY1hzQixNQUFBQSxNQUFNLEVBQUVyQixTQUFTLENBQUNzQixvQkFBVixDQUErQnJELEdBQS9CLENBZEc7QUFlWG9DLE1BQUFBLE9BQU8sRUFBUEEsT0FmVztBQWdCWGtCLE1BQUFBLGVBQWUsRUFBRSxLQWhCTjtBQWlCWDFCLE1BQUFBLFFBQVEsRUFBUkEsUUFqQlc7QUFrQlhuQyxNQUFBQSxLQUFLLEVBQUxBLEtBbEJXO0FBbUJYOEQsTUFBQUEsaUJBQWlCLEVBQUU7QUFuQlIsTUFBYjs7QUFzQkEsV0FBTyxvQkFBQyxvQkFBRCxFQUEwQmQsT0FBMUIsQ0FBUDtBQUNEO0FBL0dZLENBQWYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZnJvbUpTLCBMaXN0IH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCB7IE92ZXJsYXlUcmlnZ2VyLCBUb29sdGlwIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCB7IEZsb2F0aW5nU2VsZWN0UG9ydGFsIH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtZmxvYXRpbmctc2VsZWN0JztcbmltcG9ydCBDaGVja2JveCBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1jaGVja2JveCc7XG5cbi8vIFRPRE86IGNlbGxDcmVhdGUsIGNlbGxFZGl0IHJlbmRlcmVycyAtPiBtdWx0aXNlbGVjdCBkcm9wZG93biBhcyBjZWxsRmlsdGVyIGhhc1xuXG5jb25zdCBNdWx0aVZhbHVlQ29udGFpbmVyID0gKGxhYmVsLCBvcHRpb25zQ291bnQpID0+IHByb3BlcnRpZXMgPT4gKHByb3BlcnRpZXMuc2VsZWN0UHJvcHMudmFsdWVcbiAgJiYgcHJvcGVydGllcy5zZWxlY3RQcm9wcy52YWx1ZS5maW5kSW5kZXgoXG4gICAgc2VsZWN0UHJvcCA9PiBzZWxlY3RQcm9wLnZhbHVlID09PSBwcm9wZXJ0aWVzLmRhdGEudmFsdWUsXG4gICkgPT09IDAgPyAoXG4gICAgPHNwYW4+e2xhYmVsLnJlcGxhY2UoJzxuPicsIGAoJHtwcm9wZXJ0aWVzLnNlbGVjdFByb3BzLnZhbHVlLmxlbmd0aH0vJHtvcHRpb25zQ291bnR9KWApfTwvc3Bhbj5cbiAgKSA6IG51bGwpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHZhbFJlbmRlcihcbiAgICBjb2wsXG4gICAgY29sdW1uLFxuICAgIHJvd0luZGV4LFxuICAgIGdyaWRJZCxcbiAgICBzZWxlY3RPcHRpb25zID0gW10sXG4gICAgdmFsdWVSZW5kZXIsXG4gICkge1xuICAgIHJldHVybiB2YWx1ZVJlbmRlcihyb3dJbmRleCwgKHZhbHVlcykgPT4ge1xuICAgICAgLy8gbm9ybWFsaXplIHZhbHVlcyBhcyBJbW11dGFibGUgTGlzdFxuICAgICAgbGV0IHZhbHMgPSB2YWx1ZXM7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZXMpKSB7XG4gICAgICAgIHZhbHMgPSBmcm9tSlModmFsdWVzKTtcbiAgICAgIH1cbiAgICAgIGlmICghTGlzdC5pc0xpc3QodmFscykpIHtcbiAgICAgICAgdmFscyA9IGZyb21KUyhbdmFsdWVzXSk7XG4gICAgICB9XG4gICAgICAvLyBObyBpdGVtcyByZXR1cm4gZW1wdHkgc3RyaW5nXG4gICAgICBpZiAoIXZhbHMuc2l6ZSkgcmV0dXJuICcnO1xuICAgICAgLy8gSWYgb25seSBvbmUgaXMgc2VsZWN0ZWQgcmVuZGVyIHZhbHVlIG5vcm1hbGx5XG4gICAgICBpZiAodmFscy5zaXplID09PSAxKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IHNlbGVjdE9wdGlvbnMuZmluZChvID0+IG8udmFsdWUgPT09IHZhbHMuZ2V0KDApKTtcbiAgICAgICAgcmV0dXJuIG9wdGlvbiA/IG9wdGlvbi5sYWJlbCA6IG51bGw7XG4gICAgICB9XG4gICAgICAvLyBNdWx0aXBsZSB2YWx1ZXMgc2VsZWN0ZWQsIHJlbmRlciAnMyBzZWxlY3RlZCdcbiAgICAgIGNvbnN0IHNlbGVjdGVkVGV4dCA9IChjb2wudHJhbnNsYXRpb25zICYmIGNvbC50cmFuc2xhdGlvbnMuaXRlbXNTZWxlY3RlZCkgfHwgJ3NlbGVjdGVkJztcbiAgICAgIGNvbnN0IHZhbHVlVGV4dCA9IChcbiAgICAgICAgPHNwYW4+XG4gICAgICAgICAge2Ake3ZhbHMuc2l6ZX0gJHtzZWxlY3RlZFRleHR9YH1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgKTtcbiAgICAgIC8vIHdpdGhvdXQgdG9vbHRpcFxuICAgICAgaWYgKGNvbC5pc011bHRpc2VsZWN0VG9vbHRpcERpc2FibGVkKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZVRleHQ7XG4gICAgICB9XG4gICAgICAvLyB3aXRoIHRvb2x0aXBcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxPdmVybGF5VHJpZ2dlclxuICAgICAgICAgIHBsYWNlbWVudD1cInRvcFwiXG4gICAgICAgICAgb3ZlcmxheT17KFxuICAgICAgICAgICAgPFRvb2x0aXAgaWQ9e2BvY0RhdGFncmlkTXVsdGlzZWxlY3RUb29sdGlwLSR7Z3JpZElkfS0ke2NvbHVtbi5jb2x1bW5LZXl9LSR7cm93SW5kZXh9YH0+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgdGV4dEFsaWduOiAnbGVmdCcgfX0+XG4gICAgICAgICAgICAgICAge3NlbGVjdE9wdGlvbnMuZmlsdGVyKG8gPT4gdmFscy5pbmNsdWRlcyhvLnZhbHVlKSkubWFwKHYgPT4gKFxuICAgICAgICAgICAgICAgICAgPFJlYWN0LkZyYWdtZW50IGtleT17di52YWx1ZX0+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIHt2LmxhYmVsfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxiciAvPlxuICAgICAgICAgICAgICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L1Rvb2x0aXA+XG4gICAgICAgICAgKX1cbiAgICAgICAgICBkZWxheT17NTAwfVxuICAgICAgICA+XG4gICAgICAgICAge3ZhbHVlVGV4dH1cbiAgICAgICAgPC9PdmVybGF5VHJpZ2dlcj5cbiAgICAgICk7XG4gICAgfSk7XG4gIH0sXG4gIGNlbGxGaWx0ZXIoXG4gICAgY29sLFxuICAgIGNvbHVtbixcbiAgICB0YWJJbmRleCxcbiAgICBncmlkSWQsXG4gICAgc2VsZWN0T3B0aW9ucyxcbiAgICBzZWxlY3RUcmFuc2xhdGlvbnMsXG4gICAgZWRpdFZhbHVlUGFyc2VyLFxuICAgIGZ1bmN0aW9ucyxcbiAgKSB7XG4gICAgY29uc3Qgb3B0cyA9IGNvbC5maWx0ZXJTZWxlY3RPcHRpb25zTW9kICYmIHNlbGVjdE9wdGlvbnNcbiAgICAgID8gY29sLmZpbHRlclNlbGVjdE9wdGlvbnNNb2Qoc2VsZWN0T3B0aW9ucy5zbGljZSgpLCBjb2wpXG4gICAgICA6IHNlbGVjdE9wdGlvbnM7XG4gICAgY29uc3QgdmFsdWUgPSBmdW5jdGlvbnMuZ2V0SXRlbU11bHRpVmFsdWUoY29sKTtcbiAgICBjb25zdCBvcHRpb25zID0gb3B0cy5tYXAoXG4gICAgICBvcHRpb24gPT4gKHZhbHVlICYmIHZhbHVlLnNvbWUobyA9PiBvcHRpb24udmFsdWUgPT09IG8udmFsdWUpXG4gICAgICAgID8geyAuLi5vcHRpb24sIGNoZWNrZWQ6IHRydWUgfVxuICAgICAgICA6IG9wdGlvbiksXG4gICAgKTtcblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC9wcm9wLXR5cGVzXG4gICAgY29uc3QgT3B0aW9uID0gKHsgZGF0YTogeyBjaGVja2VkLCBsYWJlbCB9LCBpbm5lclByb3BzIH0pID0+IChcbiAgICAgIDxzcGFuIHsuLi5pbm5lclByb3BzfT5cbiAgICAgICAgPENoZWNrYm94IG9uQ2hhbmdlPXsoKSA9PiB7fX0gbGFiZWw9e2xhYmVsfSBjaGVja2VkPXtjaGVja2VkfSAvPlxuICAgICAgPC9zcGFuPlxuICAgICk7XG5cbiAgICBjb25zdCBmc1Byb3BzID0ge1xuICAgICAgLi4uY29sLmZpbHRlckNvbXBvbmVudFByb3BzLFxuICAgICAgLi4uc2VsZWN0VHJhbnNsYXRpb25zLFxuICAgICAgY29tcG9uZW50czoge1xuICAgICAgICBNdWx0aVZhbHVlQ29udGFpbmVyOiBNdWx0aVZhbHVlQ29udGFpbmVyKHNlbGVjdFRyYW5zbGF0aW9ucy5zZWxlY3RlZCxcbiAgICAgICAgICAob3B0aW9ucyB8fCBbXSkubGVuZ3RoKSxcbiAgICAgICAgT3B0aW9uLFxuICAgICAgfSxcbiAgICAgIGhpZGVTZWxlY3RlZE9wdGlvbnM6IGZhbHNlLFxuICAgICAgaXNTZWFyY2hhYmxlOiBzZWxlY3RPcHRpb25zICYmIHNlbGVjdE9wdGlvbnMubGVuZ3RoID4gOSxcbiAgICAgIGlzQ2xlYXJhYmxlOiB0cnVlLFxuICAgICAgaXNNdWx0aTogdHJ1ZSxcbiAgICAgIG5hbWU6IGBvY0RhdGFncmlkRmlsdGVySW5wdXQtJHtncmlkSWR9LSR7Y29sdW1uLmNvbHVtbktleX1gLFxuICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9ucy5vbkNlbGxNdWx0aVZhbHVlQ2hhbmdlKGNvbCwgZWRpdFZhbHVlUGFyc2VyKSxcbiAgICAgIG9uQmx1cjogZnVuY3Rpb25zLm9uQ2VsbE11bHRpVmFsdWVCbHVyKGNvbCksXG4gICAgICBvcHRpb25zLFxuICAgICAgdGFiU2VsZWN0c1ZhbHVlOiBmYWxzZSxcbiAgICAgIHRhYkluZGV4LFxuICAgICAgdmFsdWUsXG4gICAgICBjbG9zZU1lbnVPblNlbGVjdDogZmFsc2UsXG4gICAgfTtcblxuICAgIHJldHVybiA8RmxvYXRpbmdTZWxlY3RQb3J0YWwgey4uLmZzUHJvcHN9IC8+O1xuICB9LFxufTtcbiJdfQ==