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

    var className = (0, _classnames["default"])((_classNames = {
      'oc-datagrid-actionbar': true
    }, _classNames[this.props.position] = !!this.props.position, _classNames));
    return _react["default"].createElement("div", {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9hY3Rpb24tYmFyLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiQWN0aW9uQmFyIiwicmVuZGVyIiwiY2xhc3NOYW1lIiwicHJvcHMiLCJwb3NpdGlvbiIsImNoaWxkcmVuIiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7OztJQUVxQkEsUzs7Ozs7Ozs7Ozs7U0FXbkJDLE0sR0FBQSxrQkFBUztBQUFBOztBQUNQLFFBQU1DLFNBQVMsR0FBRztBQUNoQiwrQkFBeUI7QUFEVCxtQkFFZixLQUFLQyxLQUFMLENBQVdDLFFBRkksSUFFTyxDQUFDLENBQUMsS0FBS0QsS0FBTCxDQUFXQyxRQUZwQixlQUFsQjtBQUlBLFdBQU87QUFBSyxNQUFBLFNBQVMsRUFBRUY7QUFBaEIsT0FBNEIsS0FBS0MsS0FBTCxDQUFXRSxRQUF2QyxDQUFQO0FBQ0QsRzs7O0VBakJvQ0Msa0JBQU1DLGE7Ozs7Z0JBQXhCUCxTLGtCQU1HO0FBQ3BCSyxFQUFBQSxRQUFRLEVBQUUsSUFEVTtBQUVwQkQsRUFBQUEsUUFBUSxFQUFFO0FBRlUsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgJy4vYWN0aW9uLWJhci5jb21wb25lbnQuc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjdGlvbkJhciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcbiAgICBwb3NpdGlvbjogUHJvcFR5cGVzLm9uZU9mKFsnbGVmdCcsICdyaWdodCddKSxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGNoaWxkcmVuOiBudWxsLFxuICAgIHBvc2l0aW9uOiAncmlnaHQnLFxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBjbGFzc05hbWUgPSBjbGFzc05hbWVzKHtcbiAgICAgICdvYy1kYXRhZ3JpZC1hY3Rpb25iYXInOiB0cnVlLFxuICAgICAgW3RoaXMucHJvcHMucG9zaXRpb25dOiAhIXRoaXMucHJvcHMucG9zaXRpb24sXG4gICAgfSk7XG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9Pnt0aGlzLnByb3BzLmNoaWxkcmVufTwvZGl2PjtcbiAgfVxufVxuIl19