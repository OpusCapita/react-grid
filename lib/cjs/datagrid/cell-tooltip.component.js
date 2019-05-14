"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactBootstrap = require("react-bootstrap");

var _reactIntl = require("react-intl");

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DatagridTooltip =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(DatagridTooltip, _React$Component);

  function DatagridTooltip() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = DatagridTooltip.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        id = _this$props.id,
        isEdited = _this$props.isEdited,
        isError = _this$props.isError,
        isWarning = _this$props.isWarning,
        infoMessage = _this$props.infoMessage,
        errorMessage = _this$props.errorMessage,
        warningMessage = _this$props.warningMessage;
    var overlayAttrs = {
      overlay: _react["default"].createElement(_reactBootstrap.Tooltip, {
        id: "Tooltip_" + id,
        style: {
          display: 'none'
        }
      })
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
        placement: 'top',
        overlay: _react["default"].createElement(_reactBootstrap.Tooltip, {
          id: "Tooltip_" + id,
          bsClass: tooltipClassName
        }, message.id ? _react["default"].createElement(_reactIntl.FormattedMessage, {
          id: message.id,
          values: message.values
        }) : _react["default"].createElement("span", null, message))
      };
    }

    var wrapperClassName = (0, _classnames["default"])({
      'oc-datagrid-tooltip': true,
      edited: isEdited,
      error: isError,
      warning: isWarning && !isError,
      info: infoMessage && !isError && !isWarning
    });
    return _react["default"].createElement(_reactBootstrap.OverlayTrigger, overlayAttrs, _react["default"].createElement("div", {
      id: id,
      className: wrapperClassName
    }, children));
  };

  return DatagridTooltip;
}(_react["default"].Component);

exports["default"] = DatagridTooltip;

_defineProperty(DatagridTooltip, "defaultProps", {
  children: null,
  isEdited: false,
  isError: false,
  isWarning: false,
  infoMessage: null,
  errorMessage: null,
  warningMessage: null
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jZWxsLXRvb2x0aXAuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJEYXRhZ3JpZFRvb2x0aXAiLCJyZW5kZXIiLCJwcm9wcyIsImNoaWxkcmVuIiwiaWQiLCJpc0VkaXRlZCIsImlzRXJyb3IiLCJpc1dhcm5pbmciLCJpbmZvTWVzc2FnZSIsImVycm9yTWVzc2FnZSIsIndhcm5pbmdNZXNzYWdlIiwib3ZlcmxheUF0dHJzIiwib3ZlcmxheSIsImRpc3BsYXkiLCJtZXNzYWdlIiwidG9vbHRpcENsYXNzTmFtZSIsInBsYWNlbWVudCIsInZhbHVlcyIsIndyYXBwZXJDbGFzc05hbWUiLCJlZGl0ZWQiLCJlcnJvciIsIndhcm5pbmciLCJpbmZvIiwiUmVhY3QiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0lBRXFCQSxlOzs7Ozs7Ozs7OztTQXdDbkJDLE0sR0FBQSxrQkFBUztBQUFBLHNCQVVILEtBQUtDLEtBVkY7QUFBQSxRQUVMQyxRQUZLLGVBRUxBLFFBRks7QUFBQSxRQUdMQyxFQUhLLGVBR0xBLEVBSEs7QUFBQSxRQUlMQyxRQUpLLGVBSUxBLFFBSks7QUFBQSxRQUtMQyxPQUxLLGVBS0xBLE9BTEs7QUFBQSxRQU1MQyxTQU5LLGVBTUxBLFNBTks7QUFBQSxRQU9MQyxXQVBLLGVBT0xBLFdBUEs7QUFBQSxRQVFMQyxZQVJLLGVBUUxBLFlBUks7QUFBQSxRQVNMQyxjQVRLLGVBU0xBLGNBVEs7QUFXUCxRQUFJQyxZQUFZLEdBQUc7QUFDakJDLE1BQUFBLE9BQU8sRUFBRSxnQ0FBQyx1QkFBRDtBQUFTLFFBQUEsRUFBRSxlQUFhUixFQUF4QjtBQUE4QixRQUFBLEtBQUssRUFBRTtBQUFFUyxVQUFBQSxPQUFPLEVBQUU7QUFBWDtBQUFyQztBQURRLEtBQW5CO0FBR0EsUUFBTUMsT0FBTyxHQUFHTCxZQUFZLElBQUlDLGNBQWhCLElBQWtDRixXQUFsRDs7QUFDQSxRQUFJTSxPQUFKLEVBQWE7QUFDWCxVQUFJQyxnQkFBZ0IsR0FBRyxTQUF2Qjs7QUFDQSxVQUFJVCxPQUFKLEVBQWE7QUFDWFMsUUFBQUEsZ0JBQWdCLEdBQUcsZUFBbkI7QUFDRCxPQUZELE1BRU8sSUFBSVIsU0FBSixFQUFlO0FBQ3BCUSxRQUFBQSxnQkFBZ0IsR0FBRyxpQkFBbkI7QUFDRDs7QUFDREosTUFBQUEsWUFBWSxHQUFHO0FBQ2JLLFFBQUFBLFNBQVMsRUFBRSxLQURFO0FBRWJKLFFBQUFBLE9BQU8sRUFDTCxnQ0FBQyx1QkFBRDtBQUFTLFVBQUEsRUFBRSxlQUFhUixFQUF4QjtBQUE4QixVQUFBLE9BQU8sRUFBRVc7QUFBdkMsV0FDR0QsT0FBTyxDQUFDVixFQUFSLEdBQWEsZ0NBQUMsMkJBQUQ7QUFBRyxVQUFBLEVBQUUsRUFBRVUsT0FBTyxDQUFDVixFQUFmO0FBQW1CLFVBQUEsTUFBTSxFQUFFVSxPQUFPLENBQUNHO0FBQW5DLFVBQWIsR0FBNkQsOENBQU9ILE9BQVAsQ0FEaEU7QUFIVyxPQUFmO0FBUUQ7O0FBQ0QsUUFBTUksZ0JBQWdCLEdBQUcsNEJBQVc7QUFDbEMsNkJBQXVCLElBRFc7QUFFbENDLE1BQUFBLE1BQU0sRUFBRWQsUUFGMEI7QUFHbENlLE1BQUFBLEtBQUssRUFBRWQsT0FIMkI7QUFJbENlLE1BQUFBLE9BQU8sRUFBRWQsU0FBUyxJQUFJLENBQUNELE9BSlc7QUFLbENnQixNQUFBQSxJQUFJLEVBQUVkLFdBQVcsSUFBSSxDQUFDRixPQUFoQixJQUEyQixDQUFDQztBQUxBLEtBQVgsQ0FBekI7QUFPQSxXQUNFLGdDQUFDLDhCQUFELEVBQW9CSSxZQUFwQixFQUNFO0FBQUssTUFBQSxFQUFFLEVBQUVQLEVBQVQ7QUFBYSxNQUFBLFNBQVMsRUFBRWM7QUFBeEIsT0FDR2YsUUFESCxDQURGLENBREY7QUFPRCxHOzs7RUFyRjBDb0Isa0JBQU1DLFM7Ozs7Z0JBQTlCeEIsZSxrQkE4Qkc7QUFDcEJHLEVBQUFBLFFBQVEsRUFBRSxJQURVO0FBRXBCRSxFQUFBQSxRQUFRLEVBQUUsS0FGVTtBQUdwQkMsRUFBQUEsT0FBTyxFQUFFLEtBSFc7QUFJcEJDLEVBQUFBLFNBQVMsRUFBRSxLQUpTO0FBS3BCQyxFQUFBQSxXQUFXLEVBQUUsSUFMTztBQU1wQkMsRUFBQUEsWUFBWSxFQUFFLElBTk07QUFPcEJDLEVBQUFBLGNBQWMsRUFBRTtBQVBJLEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9mb3JiaWQtcHJvcC10eXBlcyAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBUb29sdGlwLCBPdmVybGF5VHJpZ2dlciB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlIGFzIE0gfSBmcm9tICdyZWFjdC1pbnRsJztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRhZ3JpZFRvb2x0aXAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGlkOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubnVtYmVyXSkuaXNSZXF1aXJlZCxcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgaXNFZGl0ZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGlzRXJyb3I6IFByb3BUeXBlcy5ib29sLFxuICAgIGlzV2FybmluZzogUHJvcFR5cGVzLmJvb2wsXG4gICAgaW5mb01lc3NhZ2U6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB2YWx1ZXM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICB9KSxcbiAgICBdKSxcbiAgICBlcnJvck1lc3NhZ2U6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB2YWx1ZXM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICB9KSxcbiAgICBdKSxcbiAgICB3YXJuaW5nTWVzc2FnZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIHZhbHVlczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgIH0pLFxuICAgIF0pLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgY2hpbGRyZW46IG51bGwsXG4gICAgaXNFZGl0ZWQ6IGZhbHNlLFxuICAgIGlzRXJyb3I6IGZhbHNlLFxuICAgIGlzV2FybmluZzogZmFsc2UsXG4gICAgaW5mb01lc3NhZ2U6IG51bGwsXG4gICAgZXJyb3JNZXNzYWdlOiBudWxsLFxuICAgIHdhcm5pbmdNZXNzYWdlOiBudWxsLFxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBjaGlsZHJlbixcbiAgICAgIGlkLFxuICAgICAgaXNFZGl0ZWQsXG4gICAgICBpc0Vycm9yLFxuICAgICAgaXNXYXJuaW5nLFxuICAgICAgaW5mb01lc3NhZ2UsXG4gICAgICBlcnJvck1lc3NhZ2UsXG4gICAgICB3YXJuaW5nTWVzc2FnZSxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgb3ZlcmxheUF0dHJzID0ge1xuICAgICAgb3ZlcmxheTogPFRvb2x0aXAgaWQ9e2BUb29sdGlwXyR7aWR9YH0gc3R5bGU9e3sgZGlzcGxheTogJ25vbmUnIH19IC8+LFxuICAgIH07XG4gICAgY29uc3QgbWVzc2FnZSA9IGVycm9yTWVzc2FnZSB8fCB3YXJuaW5nTWVzc2FnZSB8fCBpbmZvTWVzc2FnZTtcbiAgICBpZiAobWVzc2FnZSkge1xuICAgICAgbGV0IHRvb2x0aXBDbGFzc05hbWUgPSAndG9vbHRpcCc7XG4gICAgICBpZiAoaXNFcnJvcikge1xuICAgICAgICB0b29sdGlwQ2xhc3NOYW1lID0gJ2Vycm9yIHRvb2x0aXAnO1xuICAgICAgfSBlbHNlIGlmIChpc1dhcm5pbmcpIHtcbiAgICAgICAgdG9vbHRpcENsYXNzTmFtZSA9ICd3YXJuaW5nIHRvb2x0aXAnO1xuICAgICAgfVxuICAgICAgb3ZlcmxheUF0dHJzID0ge1xuICAgICAgICBwbGFjZW1lbnQ6ICd0b3AnLFxuICAgICAgICBvdmVybGF5OiAoXG4gICAgICAgICAgPFRvb2x0aXAgaWQ9e2BUb29sdGlwXyR7aWR9YH0gYnNDbGFzcz17dG9vbHRpcENsYXNzTmFtZX0+XG4gICAgICAgICAgICB7bWVzc2FnZS5pZCA/IDxNIGlkPXttZXNzYWdlLmlkfSB2YWx1ZXM9e21lc3NhZ2UudmFsdWVzfSAvPiA6IDxzcGFuPnttZXNzYWdlfTwvc3Bhbj59XG4gICAgICAgICAgPC9Ub29sdGlwPlxuICAgICAgICApLFxuICAgICAgfTtcbiAgICB9XG4gICAgY29uc3Qgd3JhcHBlckNsYXNzTmFtZSA9IGNsYXNzTmFtZXMoe1xuICAgICAgJ29jLWRhdGFncmlkLXRvb2x0aXAnOiB0cnVlLFxuICAgICAgZWRpdGVkOiBpc0VkaXRlZCxcbiAgICAgIGVycm9yOiBpc0Vycm9yLFxuICAgICAgd2FybmluZzogaXNXYXJuaW5nICYmICFpc0Vycm9yLFxuICAgICAgaW5mbzogaW5mb01lc3NhZ2UgJiYgIWlzRXJyb3IgJiYgIWlzV2FybmluZyxcbiAgICB9KTtcbiAgICByZXR1cm4gKFxuICAgICAgPE92ZXJsYXlUcmlnZ2VyIHsuLi5vdmVybGF5QXR0cnN9PlxuICAgICAgICA8ZGl2IGlkPXtpZH0gY2xhc3NOYW1lPXt3cmFwcGVyQ2xhc3NOYW1lfT5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9PdmVybGF5VHJpZ2dlcj5cbiAgICApO1xuICB9XG59XG4iXX0=