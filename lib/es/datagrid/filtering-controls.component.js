function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'react-bootstrap';
import { FormattedMessage as M } from 'react-intl';
import { gridShape } from './datagrid.props';
import './filtering-controls.component.scss';

var FilteringControls =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(FilteringControls, _React$PureComponent);

  function FilteringControls() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "toggleFiltering", function () {
      _this.props.toggleFiltering(_this.props.grid);
    });

    return _this;
  }

  var _proto = FilteringControls.prototype;

  _proto.render = function render() {
    return React.createElement("div", {
      className: "oc-datagrid-filtering-controls"
    }, React.createElement(Checkbox, {
      checked: this.props.isFiltering,
      disabled: this.props.isBusy || this.props.isCreating || this.props.isEditing,
      onChange: this.toggleFiltering,
      inline: true
    }, React.createElement(M, {
      id: "Grid.ShowFilteringRow"
    })));
  };

  return FilteringControls;
}(React.PureComponent);

_defineProperty(FilteringControls, "defaultProps", {
  toggleFiltering: function toggleFiltering() {}
});

export { FilteringControls as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9maWx0ZXJpbmctY29udHJvbHMuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsIkNoZWNrYm94IiwiRm9ybWF0dGVkTWVzc2FnZSIsIk0iLCJncmlkU2hhcGUiLCJGaWx0ZXJpbmdDb250cm9scyIsInByb3BzIiwidG9nZ2xlRmlsdGVyaW5nIiwiZ3JpZCIsInJlbmRlciIsImlzRmlsdGVyaW5nIiwiaXNCdXN5IiwiaXNDcmVhdGluZyIsImlzRWRpdGluZyIsIlB1cmVDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsU0FBU0MsUUFBVCxRQUF5QixpQkFBekI7QUFDQSxTQUFTQyxnQkFBZ0IsSUFBSUMsQ0FBN0IsUUFBc0MsWUFBdEM7QUFDQSxTQUFTQyxTQUFULFFBQTBCLGtCQUExQjtBQUNBLE9BQU8scUNBQVA7O0lBRXFCQyxpQjs7Ozs7Ozs7Ozs7Ozs7c0VBY0QsWUFBTTtBQUN0QixZQUFLQyxLQUFMLENBQVdDLGVBQVgsQ0FBMkIsTUFBS0QsS0FBTCxDQUFXRSxJQUF0QztBQUNELEs7Ozs7Ozs7U0FFREMsTSxHQUFBLGtCQUFTO0FBQ1AsV0FDRTtBQUFLLE1BQUEsU0FBUyxFQUFDO0FBQWYsT0FDRSxvQkFBQyxRQUFEO0FBQ0UsTUFBQSxPQUFPLEVBQUUsS0FBS0gsS0FBTCxDQUFXSSxXQUR0QjtBQUVFLE1BQUEsUUFBUSxFQUFFLEtBQUtKLEtBQUwsQ0FBV0ssTUFBWCxJQUFxQixLQUFLTCxLQUFMLENBQVdNLFVBQWhDLElBQThDLEtBQUtOLEtBQUwsQ0FBV08sU0FGckU7QUFHRSxNQUFBLFFBQVEsRUFBRSxLQUFLTixlQUhqQjtBQUlFLE1BQUEsTUFBTTtBQUpSLE9BTUUsb0JBQUMsQ0FBRDtBQUFHLE1BQUEsRUFBRSxFQUFDO0FBQU4sTUFORixDQURGLENBREY7QUFZRCxHOzs7RUEvQjRDUixLQUFLLENBQUNlLGE7O2dCQUFoQ1QsaUIsa0JBVUc7QUFDcEJFLEVBQUFBLGVBQWUsRUFBRSwyQkFBTSxDQUFFO0FBREwsQzs7U0FWSEYsaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IENoZWNrYm94IH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgYXMgTSB9IGZyb20gJ3JlYWN0LWludGwnO1xuaW1wb3J0IHsgZ3JpZFNoYXBlIH0gZnJvbSAnLi9kYXRhZ3JpZC5wcm9wcyc7XG5pbXBvcnQgJy4vZmlsdGVyaW5nLWNvbnRyb2xzLmNvbXBvbmVudC5zY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmlsdGVyaW5nQ29udHJvbHMgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBncmlkOiBncmlkU2hhcGUuaXNSZXF1aXJlZCxcbiAgICBpc0J1c3k6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgaXNDcmVhdGluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpc0VkaXRpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgaXNGaWx0ZXJpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgdG9nZ2xlRmlsdGVyaW5nOiBQcm9wVHlwZXMuZnVuYyxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIHRvZ2dsZUZpbHRlcmluZzogKCkgPT4ge30sXG4gIH07XG5cbiAgdG9nZ2xlRmlsdGVyaW5nID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMudG9nZ2xlRmlsdGVyaW5nKHRoaXMucHJvcHMuZ3JpZCk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWZpbHRlcmluZy1jb250cm9sc1wiPlxuICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICBjaGVja2VkPXt0aGlzLnByb3BzLmlzRmlsdGVyaW5nfVxuICAgICAgICAgIGRpc2FibGVkPXt0aGlzLnByb3BzLmlzQnVzeSB8fCB0aGlzLnByb3BzLmlzQ3JlYXRpbmcgfHwgdGhpcy5wcm9wcy5pc0VkaXRpbmd9XG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMudG9nZ2xlRmlsdGVyaW5nfVxuICAgICAgICAgIGlubGluZVxuICAgICAgICA+XG4gICAgICAgICAgPE0gaWQ9XCJHcmlkLlNob3dGaWx0ZXJpbmdSb3dcIiAvPlxuICAgICAgICA8L0NoZWNrYm94PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19