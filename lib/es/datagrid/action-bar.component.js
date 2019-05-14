function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './action-bar.component.scss';

var ActionBar =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(ActionBar, _React$PureComponent);

  function ActionBar() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = ActionBar.prototype;

  _proto.render = function render() {
    var _classNames;

    var className = classNames((_classNames = {
      'oc-datagrid-actionbar': true
    }, _classNames[this.props.position] = !!this.props.position, _classNames));
    return React.createElement("div", {
      className: className
    }, this.props.children);
  };

  return ActionBar;
}(React.PureComponent);

_defineProperty(ActionBar, "defaultProps", {
  children: null,
  position: 'right'
});

export { ActionBar as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9hY3Rpb24tYmFyLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJjbGFzc05hbWVzIiwiQWN0aW9uQmFyIiwicmVuZGVyIiwiY2xhc3NOYW1lIiwicHJvcHMiLCJwb3NpdGlvbiIsImNoaWxkcmVuIiwiUHVyZUNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsT0FBT0MsVUFBUCxNQUF1QixZQUF2QjtBQUNBLE9BQU8sNkJBQVA7O0lBRXFCQyxTOzs7Ozs7Ozs7OztTQVduQkMsTSxHQUFBLGtCQUFTO0FBQUE7O0FBQ1AsUUFBTUMsU0FBUyxHQUFHSCxVQUFVO0FBQzFCLCtCQUF5QjtBQURDLG1CQUV6QixLQUFLSSxLQUFMLENBQVdDLFFBRmMsSUFFSCxDQUFDLENBQUMsS0FBS0QsS0FBTCxDQUFXQyxRQUZWLGVBQTVCO0FBSUEsV0FBTztBQUFLLE1BQUEsU0FBUyxFQUFFRjtBQUFoQixPQUE0QixLQUFLQyxLQUFMLENBQVdFLFFBQXZDLENBQVA7QUFDRCxHOzs7RUFqQm9DUixLQUFLLENBQUNTLGE7O2dCQUF4Qk4sUyxrQkFNRztBQUNwQkssRUFBQUEsUUFBUSxFQUFFLElBRFU7QUFFcEJELEVBQUFBLFFBQVEsRUFBRTtBQUZVLEM7O1NBTkhKLFMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0ICcuL2FjdGlvbi1iYXIuY29tcG9uZW50LnNjc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY3Rpb25CYXIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgcG9zaXRpb246IFByb3BUeXBlcy5vbmVPZihbJ2xlZnQnLCAncmlnaHQnXSksXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBjaGlsZHJlbjogbnVsbCxcbiAgICBwb3NpdGlvbjogJ3JpZ2h0JyxcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgY2xhc3NOYW1lID0gY2xhc3NOYW1lcyh7XG4gICAgICAnb2MtZGF0YWdyaWQtYWN0aW9uYmFyJzogdHJ1ZSxcbiAgICAgIFt0aGlzLnByb3BzLnBvc2l0aW9uXTogISF0aGlzLnByb3BzLnBvc2l0aW9uLFxuICAgIH0pO1xuICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lfT57dGhpcy5wcm9wcy5jaGlsZHJlbn08L2Rpdj47XG4gIH1cbn1cbiJdfQ==