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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jZWxsLXRvb2x0aXAuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJEYXRhZ3JpZFRvb2x0aXAiLCJyZW5kZXIiLCJwcm9wcyIsImNoaWxkcmVuIiwiaWQiLCJpc0VkaXRlZCIsImlzRXJyb3IiLCJpc1dhcm5pbmciLCJpbmZvTWVzc2FnZSIsImVycm9yTWVzc2FnZSIsIndhcm5pbmdNZXNzYWdlIiwib3ZlcmxheUF0dHJzIiwib3ZlcmxheSIsImRpc3BsYXkiLCJtZXNzYWdlIiwidG9vbHRpcENsYXNzTmFtZSIsInBsYWNlbWVudCIsInZhbHVlcyIsIndyYXBwZXJDbGFzc05hbWUiLCJlZGl0ZWQiLCJlcnJvciIsIndhcm5pbmciLCJpbmZvIiwiQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7OzttQkFBQTs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLGU7Ozs7Ozs7Ozs0QkEyQ25CQyxNLHFCQUFTO0FBQUEsaUJBVUgsS0FBS0MsS0FWRjtBQUFBLFFBRUxDLFFBRkssVUFFTEEsUUFGSztBQUFBLFFBR0xDLEVBSEssVUFHTEEsRUFISztBQUFBLFFBSUxDLFFBSkssVUFJTEEsUUFKSztBQUFBLFFBS0xDLE9BTEssVUFLTEEsT0FMSztBQUFBLFFBTUxDLFNBTkssVUFNTEEsU0FOSztBQUFBLFFBT0xDLFdBUEssVUFPTEEsV0FQSztBQUFBLFFBUUxDLFlBUkssVUFRTEEsWUFSSztBQUFBLFFBU0xDLGNBVEssVUFTTEEsY0FUSzs7QUFXUCxRQUFJQyxlQUFlO0FBQ2pCQyxlQUFTLHlEQUFTLGlCQUFlUixFQUF4QixFQUE4QixPQUFPLEVBQUVTLFNBQVMsTUFBWCxFQUFyQztBQURRLEtBQW5CO0FBR0EsUUFBTUMsVUFBVUwsZ0JBQWdCQyxjQUFoQixJQUFrQ0YsV0FBbEQ7QUFDQSxRQUFJTSxPQUFKLEVBQWE7QUFDWCxVQUFJQyxtQkFBbUIsU0FBdkI7QUFDQSxVQUFJVCxPQUFKLEVBQWE7QUFDWFMsMkJBQW1CLGVBQW5CO0FBQ0QsT0FGRCxNQUVPLElBQUlSLFNBQUosRUFBZTtBQUNwQlEsMkJBQW1CLGlCQUFuQjtBQUNEO0FBQ0RKLHFCQUFlO0FBQ2JLLG1CQUFXLFFBREU7QUFFYkosaUJBQ0U7QUFBQTtBQUFBLFlBQVMsaUJBQWVSLEVBQXhCLEVBQThCLFNBQVNXLGdCQUF2QztBQUNJRCxrQkFBUVYsRUFBUixHQUFhLDZEQUFHLElBQUlVLFFBQVFWLEVBQWYsRUFBbUIsUUFBUVUsUUFBUUcsTUFBbkMsR0FBYixHQUE2RDtBQUFBO0FBQUE7QUFBT0g7QUFBUDtBQURqRTtBQUhXLE9BQWY7QUFRRDtBQUNELFFBQU1JLG1CQUFtQiwwQkFBVztBQUNsQyw2QkFBdUIsSUFEVztBQUVsQ0MsY0FBUWQsUUFGMEI7QUFHbENlLGFBQU9kLE9BSDJCO0FBSWxDZSxlQUFTZCxhQUFhLENBQUNELE9BSlc7QUFLbENnQixZQUFNZCxlQUFlLENBQUNGLE9BQWhCLElBQTJCLENBQUNDO0FBTEEsS0FBWCxDQUF6QjtBQU9BLFdBQ0U7QUFBQTtBQUFvQkksa0JBQXBCO0FBQ0U7QUFBQTtBQUFBLFVBQUssV0FBV08sZ0JBQWhCO0FBQ0lmO0FBREo7QUFERixLQURGO0FBT0QsRzs7O0VBeEYwQyxnQkFBTW9CLFMsVUFpQzFDQyxZLEdBQWU7QUFDcEJyQixZQUFVLElBRFU7QUFFcEJFLFlBQVUsS0FGVTtBQUdwQkMsV0FBUyxLQUhXO0FBSXBCQyxhQUFXLEtBSlM7QUFLcEJDLGVBQWEsSUFMTztBQU1wQkMsZ0JBQWMsSUFOTTtBQU9wQkMsa0JBQWdCO0FBUEksQztrQkFqQ0hWLGUiLCJmaWxlIjoiY2VsbC10b29sdGlwLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L2ZvcmJpZC1wcm9wLXR5cGVzICovXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XHJcbmltcG9ydCB7IFRvb2x0aXAsIE92ZXJsYXlUcmlnZ2VyIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcclxuaW1wb3J0IHsgRm9ybWF0dGVkTWVzc2FnZSBhcyBNIH0gZnJvbSAncmVhY3QtaW50bCc7XHJcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0YWdyaWRUb29sdGlwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xyXG4gICAgaWQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICBQcm9wVHlwZXMubnVtYmVyLFxyXG4gICAgXSkuaXNSZXF1aXJlZCxcclxuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcclxuICAgIGlzRWRpdGVkOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIGlzRXJyb3I6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgaXNXYXJuaW5nOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIGluZm9NZXNzYWdlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcclxuICAgICAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICB2YWx1ZXM6IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgICAgIH0pLFxyXG4gICAgXSksXHJcbiAgICBlcnJvck1lc3NhZ2U6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoe1xyXG4gICAgICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIHZhbHVlczogUHJvcFR5cGVzLm9iamVjdCxcclxuICAgICAgfSksXHJcbiAgICBdKSxcclxuICAgIHdhcm5pbmdNZXNzYWdlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcclxuICAgICAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICB2YWx1ZXM6IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgICAgIH0pLFxyXG4gICAgXSksXHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcclxuICAgIGNoaWxkcmVuOiBudWxsLFxyXG4gICAgaXNFZGl0ZWQ6IGZhbHNlLFxyXG4gICAgaXNFcnJvcjogZmFsc2UsXHJcbiAgICBpc1dhcm5pbmc6IGZhbHNlLFxyXG4gICAgaW5mb01lc3NhZ2U6IG51bGwsXHJcbiAgICBlcnJvck1lc3NhZ2U6IG51bGwsXHJcbiAgICB3YXJuaW5nTWVzc2FnZTogbnVsbCxcclxuICB9O1xyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGNoaWxkcmVuLFxyXG4gICAgICBpZCxcclxuICAgICAgaXNFZGl0ZWQsXHJcbiAgICAgIGlzRXJyb3IsXHJcbiAgICAgIGlzV2FybmluZyxcclxuICAgICAgaW5mb01lc3NhZ2UsXHJcbiAgICAgIGVycm9yTWVzc2FnZSxcclxuICAgICAgd2FybmluZ01lc3NhZ2UsXHJcbiAgICB9ID0gdGhpcy5wcm9wcztcclxuICAgIGxldCBvdmVybGF5QXR0cnMgPSB7XHJcbiAgICAgIG92ZXJsYXk6IDxUb29sdGlwIGlkPXtgVG9vbHRpcF8ke2lkfWB9IHN0eWxlPXt7IGRpc3BsYXk6ICdub25lJyB9fSAvPixcclxuICAgIH07XHJcbiAgICBjb25zdCBtZXNzYWdlID0gZXJyb3JNZXNzYWdlIHx8IHdhcm5pbmdNZXNzYWdlIHx8IGluZm9NZXNzYWdlO1xyXG4gICAgaWYgKG1lc3NhZ2UpIHtcclxuICAgICAgbGV0IHRvb2x0aXBDbGFzc05hbWUgPSAndG9vbHRpcCc7XHJcbiAgICAgIGlmIChpc0Vycm9yKSB7XHJcbiAgICAgICAgdG9vbHRpcENsYXNzTmFtZSA9ICdlcnJvciB0b29sdGlwJztcclxuICAgICAgfSBlbHNlIGlmIChpc1dhcm5pbmcpIHtcclxuICAgICAgICB0b29sdGlwQ2xhc3NOYW1lID0gJ3dhcm5pbmcgdG9vbHRpcCc7XHJcbiAgICAgIH1cclxuICAgICAgb3ZlcmxheUF0dHJzID0ge1xyXG4gICAgICAgIHBsYWNlbWVudDogJ2JvdHRvbScsXHJcbiAgICAgICAgb3ZlcmxheTogKFxyXG4gICAgICAgICAgPFRvb2x0aXAgaWQ9e2BUb29sdGlwXyR7aWR9YH0gYnNDbGFzcz17dG9vbHRpcENsYXNzTmFtZX0+XHJcbiAgICAgICAgICAgIHsgbWVzc2FnZS5pZCA/IDxNIGlkPXttZXNzYWdlLmlkfSB2YWx1ZXM9e21lc3NhZ2UudmFsdWVzfSAvPiA6IDxzcGFuPnttZXNzYWdlfTwvc3Bhbj4gfVxyXG4gICAgICAgICAgPC9Ub29sdGlwPlxyXG4gICAgICAgICksXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICBjb25zdCB3cmFwcGVyQ2xhc3NOYW1lID0gY2xhc3NOYW1lcyh7XHJcbiAgICAgICdvYy1kYXRhZ3JpZC10b29sdGlwJzogdHJ1ZSxcclxuICAgICAgZWRpdGVkOiBpc0VkaXRlZCxcclxuICAgICAgZXJyb3I6IGlzRXJyb3IsXHJcbiAgICAgIHdhcm5pbmc6IGlzV2FybmluZyAmJiAhaXNFcnJvcixcclxuICAgICAgaW5mbzogaW5mb01lc3NhZ2UgJiYgIWlzRXJyb3IgJiYgIWlzV2FybmluZyxcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPE92ZXJsYXlUcmlnZ2VyIHsuLi5vdmVybGF5QXR0cnN9PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXt3cmFwcGVyQ2xhc3NOYW1lfT5cclxuICAgICAgICAgIHsgY2hpbGRyZW4gfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L092ZXJsYXlUcmlnZ2VyPlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl19