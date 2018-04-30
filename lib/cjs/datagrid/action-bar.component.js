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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9hY3Rpb24tYmFyLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiQWN0aW9uQmFyIiwicmVuZGVyIiwiY2xhc3NOYW1lIiwicHJvcHMiLCJwb3NpdGlvbiIsImNoaWxkcmVuIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0lBRXFCQSxTOzs7Ozs7Ozs7c0JBV25CQyxNLHFCQUFTO0FBQUE7O0FBQ1AsUUFBTUMsWUFBWTtBQUNoQiwrQkFBeUI7QUFEVCxtQkFFZixLQUFLQyxLQUFMLENBQVdDLFFBRkksSUFFTyxDQUFDLENBQUMsS0FBS0QsS0FBTCxDQUFXQyxRQUZwQixlQUFsQjtBQUlBLFdBQ0U7QUFBQTtBQUFBLFFBQUssV0FBV0YsU0FBaEI7QUFDSSxXQUFLQyxLQUFMLENBQVdFO0FBRGYsS0FERjtBQUtELEc7OztFQXJCb0MsZ0JBQU1DLGEsVUFNcENDLFksR0FBZTtBQUNwQkYsWUFBVSxJQURVO0FBRXBCRCxZQUFVO0FBRlUsQztrQkFOSEosUyIsImZpbGUiOiJhY3Rpb24tYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XHJcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xyXG5pbXBvcnQgJy4vYWN0aW9uLWJhci5jb21wb25lbnQuc2Nzcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY3Rpb25CYXIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcclxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xyXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxyXG4gICAgcG9zaXRpb246IFByb3BUeXBlcy5vbmVPZihbJ2xlZnQnLCAncmlnaHQnXSksXHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcclxuICAgIGNoaWxkcmVuOiBudWxsLFxyXG4gICAgcG9zaXRpb246ICdyaWdodCcsXHJcbiAgfTtcclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgY2xhc3NOYW1lID0gY2xhc3NOYW1lcyh7XHJcbiAgICAgICdvYy1kYXRhZ3JpZC1hY3Rpb25iYXInOiB0cnVlLFxyXG4gICAgICBbdGhpcy5wcm9wcy5wb3NpdGlvbl06ICEhdGhpcy5wcm9wcy5wb3NpdGlvbixcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XHJcbiAgICAgICAgeyB0aGlzLnByb3BzLmNoaWxkcmVuIH1cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=