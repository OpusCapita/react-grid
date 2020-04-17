"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

require("./action-bar.component.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ActionBar = /*#__PURE__*/function (_React$PureComponent) {
  _inheritsLoose(ActionBar, _React$PureComponent);

  function ActionBar() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = ActionBar.prototype;

  _proto.render = function render() {
    var _classNames;

    var className = (0, _classnames["default"])((_classNames = {
      'oc-datagrid-actionbar': true
    }, _classNames[this.props.position] = !!this.props.position, _classNames));
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: className
    }, this.props.children);
  };

  return ActionBar;
}(_react["default"].PureComponent);

exports["default"] = ActionBar;

_defineProperty(ActionBar, "defaultProps", {
  children: null,
  position: 'right'
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9hY3Rpb24tYmFyLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiQWN0aW9uQmFyIiwicmVuZGVyIiwiY2xhc3NOYW1lIiwicHJvcHMiLCJwb3NpdGlvbiIsImNoaWxkcmVuIiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7OztJQUVxQkEsUzs7Ozs7Ozs7O1NBV25CQyxNLEdBQUEsa0JBQVM7QUFBQTs7QUFDUCxRQUFNQyxTQUFTLEdBQUc7QUFDaEIsK0JBQXlCO0FBRFQsbUJBRWYsS0FBS0MsS0FBTCxDQUFXQyxRQUZJLElBRU8sQ0FBQyxDQUFDLEtBQUtELEtBQUwsQ0FBV0MsUUFGcEIsZUFBbEI7QUFJQSx3QkFBTztBQUFLLE1BQUEsU0FBUyxFQUFFRjtBQUFoQixPQUE0QixLQUFLQyxLQUFMLENBQVdFLFFBQXZDLENBQVA7QUFDRCxHOzs7RUFqQm9DQyxrQkFBTUMsYTs7OztnQkFBeEJQLFMsa0JBTUc7QUFDcEJLLEVBQUFBLFFBQVEsRUFBRSxJQURVO0FBRXBCRCxFQUFBQSxRQUFRLEVBQUU7QUFGVSxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCAnLi9hY3Rpb24tYmFyLmNvbXBvbmVudC5zY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWN0aW9uQmFyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuICAgIHBvc2l0aW9uOiBQcm9wVHlwZXMub25lT2YoWydsZWZ0JywgJ3JpZ2h0J10pLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgY2hpbGRyZW46IG51bGwsXG4gICAgcG9zaXRpb246ICdyaWdodCcsXG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGNsYXNzTmFtZSA9IGNsYXNzTmFtZXMoe1xuICAgICAgJ29jLWRhdGFncmlkLWFjdGlvbmJhcic6IHRydWUsXG4gICAgICBbdGhpcy5wcm9wcy5wb3NpdGlvbl06ICEhdGhpcy5wcm9wcy5wb3NpdGlvbixcbiAgICB9KTtcbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZX0+e3RoaXMucHJvcHMuY2hpbGRyZW59PC9kaXY+O1xuICB9XG59XG4iXX0=