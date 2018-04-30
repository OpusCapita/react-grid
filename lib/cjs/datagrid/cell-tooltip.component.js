'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp; /* eslint-disable react/forbid-prop-types */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBootstrap = require('react-bootstrap');

var _reactIntl = require('react-intl');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DatagridTooltip = (_temp = _class = function (_React$Component) {
  _inherits(DatagridTooltip, _React$Component);

  function DatagridTooltip() {
    _classCallCheck(this, DatagridTooltip);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  DatagridTooltip.prototype.render = function render() {
    var _props = this.props,
        children = _props.children,
        id = _props.id,
        isEdited = _props.isEdited,
        isError = _props.isError,
        isWarning = _props.isWarning,
        infoMessage = _props.infoMessage,
        errorMessage = _props.errorMessage,
        warningMessage = _props.warningMessage;

    var overlayAttrs = {
      overlay: _react2.default.createElement(_reactBootstrap.Tooltip, { id: 'Tooltip_' + id, style: { display: 'none' } })
    };
    var message = errorMessage || warningMessage || infoMessage;
    if (message) {
      var tooltipClassName = 'tooltip';
      if (isError) {
        tooltipClassName = 'error tooltip';
      } else if (isWarning) {
        tooltipClassName = 'warning tooltip';
      }
      overlayAttrs = {
        placement: 'bottom',
        overlay: _react2.default.createElement(
          _reactBootstrap.Tooltip,
          { id: 'Tooltip_' + id, bsClass: tooltipClassName },
          message.id ? _react2.default.createElement(_reactIntl.FormattedMessage, { id: message.id, values: message.values }) : _react2.default.createElement(
            'span',
            null,
            message
          )
        )
      };
    }
    var wrapperClassName = (0, _classnames2.default)({
      'oc-datagrid-tooltip': true,
      edited: isEdited,
      error: isError,
      warning: isWarning && !isError,
      info: infoMessage && !isError && !isWarning
    });
    return _react2.default.createElement(
      _reactBootstrap.OverlayTrigger,
      overlayAttrs,
      _react2.default.createElement(
        'div',
        { className: wrapperClassName },
        children
      )
    );
  };

  return DatagridTooltip;
}(_react2.default.Component), _class.defaultProps = {
  children: null,
  isEdited: false,
  isError: false,
  isWarning: false,
  infoMessage: null,
  errorMessage: null,
  warningMessage: null
}, _temp);
exports.default = DatagridTooltip;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jZWxsLXRvb2x0aXAuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJEYXRhZ3JpZFRvb2x0aXAiLCJyZW5kZXIiLCJwcm9wcyIsImNoaWxkcmVuIiwiaWQiLCJpc0VkaXRlZCIsImlzRXJyb3IiLCJpc1dhcm5pbmciLCJpbmZvTWVzc2FnZSIsImVycm9yTWVzc2FnZSIsIndhcm5pbmdNZXNzYWdlIiwib3ZlcmxheUF0dHJzIiwib3ZlcmxheSIsImRpc3BsYXkiLCJtZXNzYWdlIiwidG9vbHRpcENsYXNzTmFtZSIsInBsYWNlbWVudCIsInZhbHVlcyIsIndyYXBwZXJDbGFzc05hbWUiLCJlZGl0ZWQiLCJlcnJvciIsIndhcm5pbmciLCJpbmZvIiwiQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7OzttQkFBQTs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLGU7Ozs7Ozs7Ozs0QkEyQ25CQyxNLHFCQUFTO0FBQUEsaUJBVUgsS0FBS0MsS0FWRjtBQUFBLFFBRUxDLFFBRkssVUFFTEEsUUFGSztBQUFBLFFBR0xDLEVBSEssVUFHTEEsRUFISztBQUFBLFFBSUxDLFFBSkssVUFJTEEsUUFKSztBQUFBLFFBS0xDLE9BTEssVUFLTEEsT0FMSztBQUFBLFFBTUxDLFNBTkssVUFNTEEsU0FOSztBQUFBLFFBT0xDLFdBUEssVUFPTEEsV0FQSztBQUFBLFFBUUxDLFlBUkssVUFRTEEsWUFSSztBQUFBLFFBU0xDLGNBVEssVUFTTEEsY0FUSzs7QUFXUCxRQUFJQyxlQUFlO0FBQ2pCQyxlQUFTLHlEQUFTLGlCQUFlUixFQUF4QixFQUE4QixPQUFPLEVBQUVTLFNBQVMsTUFBWCxFQUFyQztBQURRLEtBQW5CO0FBR0EsUUFBTUMsVUFBVUwsZ0JBQWdCQyxjQUFoQixJQUFrQ0YsV0FBbEQ7QUFDQSxRQUFJTSxPQUFKLEVBQWE7QUFDWCxVQUFJQyxtQkFBbUIsU0FBdkI7QUFDQSxVQUFJVCxPQUFKLEVBQWE7QUFDWFMsMkJBQW1CLGVBQW5CO0FBQ0QsT0FGRCxNQUVPLElBQUlSLFNBQUosRUFBZTtBQUNwQlEsMkJBQW1CLGlCQUFuQjtBQUNEO0FBQ0RKLHFCQUFlO0FBQ2JLLG1CQUFXLFFBREU7QUFFYkosaUJBQ0U7QUFBQTtBQUFBLFlBQVMsaUJBQWVSLEVBQXhCLEVBQThCLFNBQVNXLGdCQUF2QztBQUNJRCxrQkFBUVYsRUFBUixHQUFhLDZEQUFHLElBQUlVLFFBQVFWLEVBQWYsRUFBbUIsUUFBUVUsUUFBUUcsTUFBbkMsR0FBYixHQUE2RDtBQUFBO0FBQUE7QUFBT0g7QUFBUDtBQURqRTtBQUhXLE9BQWY7QUFRRDtBQUNELFFBQU1JLG1CQUFtQiwwQkFBVztBQUNsQyw2QkFBdUIsSUFEVztBQUVsQ0MsY0FBUWQsUUFGMEI7QUFHbENlLGFBQU9kLE9BSDJCO0FBSWxDZSxlQUFTZCxhQUFhLENBQUNELE9BSlc7QUFLbENnQixZQUFNZCxlQUFlLENBQUNGLE9BQWhCLElBQTJCLENBQUNDO0FBTEEsS0FBWCxDQUF6QjtBQU9BLFdBQ0U7QUFBQTtBQUFvQkksa0JBQXBCO0FBQ0U7QUFBQTtBQUFBLFVBQUssV0FBV08sZ0JBQWhCO0FBQ0lmO0FBREo7QUFERixLQURGO0FBT0QsRzs7O0VBeEYwQyxnQkFBTW9CLFMsVUFpQzFDQyxZLEdBQWU7QUFDcEJyQixZQUFVLElBRFU7QUFFcEJFLFlBQVUsS0FGVTtBQUdwQkMsV0FBUyxLQUhXO0FBSXBCQyxhQUFXLEtBSlM7QUFLcEJDLGVBQWEsSUFMTztBQU1wQkMsZ0JBQWMsSUFOTTtBQU9wQkMsa0JBQWdCO0FBUEksQztrQkFqQ0hWLGUiLCJmaWxlIjoiY2VsbC10b29sdGlwLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L2ZvcmJpZC1wcm9wLXR5cGVzICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IFRvb2x0aXAsIE92ZXJsYXlUcmlnZ2VyIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgYXMgTSB9IGZyb20gJ3JlYWN0LWludGwnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGFncmlkVG9vbHRpcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgaWQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5udW1iZXIsXG4gICAgXSkuaXNSZXF1aXJlZCxcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgaXNFZGl0ZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGlzRXJyb3I6IFByb3BUeXBlcy5ib29sLFxuICAgIGlzV2FybmluZzogUHJvcFR5cGVzLmJvb2wsXG4gICAgaW5mb01lc3NhZ2U6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB2YWx1ZXM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICB9KSxcbiAgICBdKSxcbiAgICBlcnJvck1lc3NhZ2U6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB2YWx1ZXM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICB9KSxcbiAgICBdKSxcbiAgICB3YXJuaW5nTWVzc2FnZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIHZhbHVlczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgIH0pLFxuICAgIF0pLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgY2hpbGRyZW46IG51bGwsXG4gICAgaXNFZGl0ZWQ6IGZhbHNlLFxuICAgIGlzRXJyb3I6IGZhbHNlLFxuICAgIGlzV2FybmluZzogZmFsc2UsXG4gICAgaW5mb01lc3NhZ2U6IG51bGwsXG4gICAgZXJyb3JNZXNzYWdlOiBudWxsLFxuICAgIHdhcm5pbmdNZXNzYWdlOiBudWxsLFxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBjaGlsZHJlbixcbiAgICAgIGlkLFxuICAgICAgaXNFZGl0ZWQsXG4gICAgICBpc0Vycm9yLFxuICAgICAgaXNXYXJuaW5nLFxuICAgICAgaW5mb01lc3NhZ2UsXG4gICAgICBlcnJvck1lc3NhZ2UsXG4gICAgICB3YXJuaW5nTWVzc2FnZSxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgb3ZlcmxheUF0dHJzID0ge1xuICAgICAgb3ZlcmxheTogPFRvb2x0aXAgaWQ9e2BUb29sdGlwXyR7aWR9YH0gc3R5bGU9e3sgZGlzcGxheTogJ25vbmUnIH19IC8+LFxuICAgIH07XG4gICAgY29uc3QgbWVzc2FnZSA9IGVycm9yTWVzc2FnZSB8fCB3YXJuaW5nTWVzc2FnZSB8fCBpbmZvTWVzc2FnZTtcbiAgICBpZiAobWVzc2FnZSkge1xuICAgICAgbGV0IHRvb2x0aXBDbGFzc05hbWUgPSAndG9vbHRpcCc7XG4gICAgICBpZiAoaXNFcnJvcikge1xuICAgICAgICB0b29sdGlwQ2xhc3NOYW1lID0gJ2Vycm9yIHRvb2x0aXAnO1xuICAgICAgfSBlbHNlIGlmIChpc1dhcm5pbmcpIHtcbiAgICAgICAgdG9vbHRpcENsYXNzTmFtZSA9ICd3YXJuaW5nIHRvb2x0aXAnO1xuICAgICAgfVxuICAgICAgb3ZlcmxheUF0dHJzID0ge1xuICAgICAgICBwbGFjZW1lbnQ6ICdib3R0b20nLFxuICAgICAgICBvdmVybGF5OiAoXG4gICAgICAgICAgPFRvb2x0aXAgaWQ9e2BUb29sdGlwXyR7aWR9YH0gYnNDbGFzcz17dG9vbHRpcENsYXNzTmFtZX0+XG4gICAgICAgICAgICB7IG1lc3NhZ2UuaWQgPyA8TSBpZD17bWVzc2FnZS5pZH0gdmFsdWVzPXttZXNzYWdlLnZhbHVlc30gLz4gOiA8c3Bhbj57bWVzc2FnZX08L3NwYW4+IH1cbiAgICAgICAgICA8L1Rvb2x0aXA+XG4gICAgICAgICksXG4gICAgICB9O1xuICAgIH1cbiAgICBjb25zdCB3cmFwcGVyQ2xhc3NOYW1lID0gY2xhc3NOYW1lcyh7XG4gICAgICAnb2MtZGF0YWdyaWQtdG9vbHRpcCc6IHRydWUsXG4gICAgICBlZGl0ZWQ6IGlzRWRpdGVkLFxuICAgICAgZXJyb3I6IGlzRXJyb3IsXG4gICAgICB3YXJuaW5nOiBpc1dhcm5pbmcgJiYgIWlzRXJyb3IsXG4gICAgICBpbmZvOiBpbmZvTWVzc2FnZSAmJiAhaXNFcnJvciAmJiAhaXNXYXJuaW5nLFxuICAgIH0pO1xuICAgIHJldHVybiAoXG4gICAgICA8T3ZlcmxheVRyaWdnZXIgey4uLm92ZXJsYXlBdHRyc30+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXt3cmFwcGVyQ2xhc3NOYW1lfT5cbiAgICAgICAgICB7IGNoaWxkcmVuIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L092ZXJsYXlUcmlnZ2VyPlxuICAgICk7XG4gIH1cbn1cbiJdfQ==