var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './action-bar.component.scss';

var ActionBar = (_temp = _class = function (_React$PureComponent) {
  _inherits(ActionBar, _React$PureComponent);

  function ActionBar() {
    _classCallCheck(this, ActionBar);

    return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
  }

  ActionBar.prototype.render = function render() {
    var _classNames;

    var className = classNames((_classNames = {
      'oc-datagrid-actionbar': true
    }, _classNames[this.props.position] = !!this.props.position, _classNames));
    return React.createElement(
      'div',
      { className: className },
      this.props.children
    );
  };

  return ActionBar;
}(React.PureComponent), _class.defaultProps = {
  children: null,
  position: 'right'
}, _temp);
export { ActionBar as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9hY3Rpb24tYmFyLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJjbGFzc05hbWVzIiwiQWN0aW9uQmFyIiwicmVuZGVyIiwiY2xhc3NOYW1lIiwicHJvcHMiLCJwb3NpdGlvbiIsImNoaWxkcmVuIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLE9BQU9DLFVBQVAsTUFBdUIsWUFBdkI7QUFDQSxPQUFPLDZCQUFQOztJQUVxQkMsUzs7Ozs7Ozs7O3NCQVduQkMsTSxxQkFBUztBQUFBOztBQUNQLFFBQU1DLFlBQVlIO0FBQ2hCLCtCQUF5QjtBQURULG1CQUVmLEtBQUtJLEtBQUwsQ0FBV0MsUUFGSSxJQUVPLENBQUMsQ0FBQyxLQUFLRCxLQUFMLENBQVdDLFFBRnBCLGVBQWxCO0FBSUEsV0FDRTtBQUFBO0FBQUEsUUFBSyxXQUFXRixTQUFoQjtBQUNJLFdBQUtDLEtBQUwsQ0FBV0U7QUFEZixLQURGO0FBS0QsRzs7O0VBckJvQ1IsTUFBTVMsYSxVQU1wQ0MsWSxHQUFlO0FBQ3BCRixZQUFVLElBRFU7QUFFcEJELFlBQVU7QUFGVSxDO1NBTkhKLFMiLCJmaWxlIjoiYWN0aW9uLWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xyXG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcclxuaW1wb3J0ICcuL2FjdGlvbi1iYXIuY29tcG9uZW50LnNjc3MnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWN0aW9uQmFyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XHJcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcclxuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcclxuICAgIHBvc2l0aW9uOiBQcm9wVHlwZXMub25lT2YoWydsZWZ0JywgJ3JpZ2h0J10pLFxyXG4gIH07XHJcblxyXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBjaGlsZHJlbjogbnVsbCxcclxuICAgIHBvc2l0aW9uOiAncmlnaHQnLFxyXG4gIH07XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IGNsYXNzTmFtZSA9IGNsYXNzTmFtZXMoe1xyXG4gICAgICAnb2MtZGF0YWdyaWQtYWN0aW9uYmFyJzogdHJ1ZSxcclxuICAgICAgW3RoaXMucHJvcHMucG9zaXRpb25dOiAhIXRoaXMucHJvcHMucG9zaXRpb24sXHJcbiAgICB9KTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9PlxyXG4gICAgICAgIHsgdGhpcy5wcm9wcy5jaGlsZHJlbiB9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl19