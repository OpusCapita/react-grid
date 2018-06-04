'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./action-bar.component.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ActionBar = (_temp = _class = function (_React$PureComponent) {
  _inherits(ActionBar, _React$PureComponent);

  function ActionBar() {
    _classCallCheck(this, ActionBar);

    return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
  }

  ActionBar.prototype.render = function render() {
    var _classNames;

    var className = (0, _classnames2.default)((_classNames = {
      'oc-datagrid-actionbar': true
    }, _classNames[this.props.position] = !!this.props.position, _classNames));
    return _react2.default.createElement(
      'div',
      { className: className },
      this.props.children
    );
  };

  return ActionBar;
}(_react2.default.PureComponent), _class.defaultProps = {
  children: null,
  position: 'right'
}, _temp);
exports.default = ActionBar;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9hY3Rpb24tYmFyLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiQWN0aW9uQmFyIiwicmVuZGVyIiwiY2xhc3NOYW1lIiwicHJvcHMiLCJwb3NpdGlvbiIsImNoaWxkcmVuIiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFFcUJBLFM7Ozs7Ozs7OztzQkFXbkJDLE0scUJBQVM7QUFBQTs7QUFDUCxRQUFNQyxZQUFZO0FBQ2hCLCtCQUF5QjtBQURULG1CQUVmLEtBQUtDLEtBQUwsQ0FBV0MsUUFGSSxJQUVPLENBQUMsQ0FBQyxLQUFLRCxLQUFMLENBQVdDLFFBRnBCLGVBQWxCO0FBSUEsV0FDRTtBQUFBO0FBQUEsUUFBSyxXQUFXRixTQUFoQjtBQUNJLFdBQUtDLEtBQUwsQ0FBV0U7QUFEZixLQURGO0FBS0QsRzs7O0VBckJvQ0MsZ0JBQU1DLGEsVUFNcENDLFksR0FBZTtBQUNwQkgsWUFBVSxJQURVO0FBRXBCRCxZQUFVO0FBRlUsQztrQkFOSEosUyIsImZpbGUiOiJhY3Rpb24tYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgJy4vYWN0aW9uLWJhci5jb21wb25lbnQuc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjdGlvbkJhciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcbiAgICBwb3NpdGlvbjogUHJvcFR5cGVzLm9uZU9mKFsnbGVmdCcsICdyaWdodCddKSxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGNoaWxkcmVuOiBudWxsLFxuICAgIHBvc2l0aW9uOiAncmlnaHQnLFxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBjbGFzc05hbWUgPSBjbGFzc05hbWVzKHtcbiAgICAgICdvYy1kYXRhZ3JpZC1hY3Rpb25iYXInOiB0cnVlLFxuICAgICAgW3RoaXMucHJvcHMucG9zaXRpb25dOiAhIXRoaXMucHJvcHMucG9zaXRpb24sXG4gICAgfSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9PlxuICAgICAgICB7IHRoaXMucHJvcHMuY2hpbGRyZW4gfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19