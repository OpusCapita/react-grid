function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './action-bar.component.scss';

var ActionBar = /*#__PURE__*/function (_React$PureComponent) {
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
    return /*#__PURE__*/React.createElement("div", {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9hY3Rpb24tYmFyLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJjbGFzc05hbWVzIiwiQWN0aW9uQmFyIiwicmVuZGVyIiwiY2xhc3NOYW1lIiwicHJvcHMiLCJwb3NpdGlvbiIsImNoaWxkcmVuIiwiUHVyZUNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsT0FBT0MsVUFBUCxNQUF1QixZQUF2QjtBQUNBLE9BQU8sNkJBQVA7O0lBRXFCQyxTOzs7Ozs7Ozs7U0FXbkJDLE0sR0FBQSxrQkFBUztBQUFBOztBQUNQLFFBQU1DLFNBQVMsR0FBR0gsVUFBVTtBQUMxQiwrQkFBeUI7QUFEQyxtQkFFekIsS0FBS0ksS0FBTCxDQUFXQyxRQUZjLElBRUgsQ0FBQyxDQUFDLEtBQUtELEtBQUwsQ0FBV0MsUUFGVixlQUE1QjtBQUlBLHdCQUFPO0FBQUssTUFBQSxTQUFTLEVBQUVGO0FBQWhCLE9BQTRCLEtBQUtDLEtBQUwsQ0FBV0UsUUFBdkMsQ0FBUDtBQUNELEc7OztFQWpCb0NSLEtBQUssQ0FBQ1MsYTs7Z0JBQXhCTixTLGtCQU1HO0FBQ3BCSyxFQUFBQSxRQUFRLEVBQUUsSUFEVTtBQUVwQkQsRUFBQUEsUUFBUSxFQUFFO0FBRlUsQzs7U0FOSEosUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgJy4vYWN0aW9uLWJhci5jb21wb25lbnQuc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjdGlvbkJhciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcbiAgICBwb3NpdGlvbjogUHJvcFR5cGVzLm9uZU9mKFsnbGVmdCcsICdyaWdodCddKSxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGNoaWxkcmVuOiBudWxsLFxuICAgIHBvc2l0aW9uOiAncmlnaHQnLFxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBjbGFzc05hbWUgPSBjbGFzc05hbWVzKHtcbiAgICAgICdvYy1kYXRhZ3JpZC1hY3Rpb25iYXInOiB0cnVlLFxuICAgICAgW3RoaXMucHJvcHMucG9zaXRpb25dOiAhIXRoaXMucHJvcHMucG9zaXRpb24sXG4gICAgfSk7XG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9Pnt0aGlzLnByb3BzLmNoaWxkcmVufTwvZGl2PjtcbiAgfVxufVxuIl19