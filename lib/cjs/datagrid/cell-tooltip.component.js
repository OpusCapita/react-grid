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

var DatagridTooltip = /*#__PURE__*/function (_React$Component) {
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
      overlay: /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Tooltip, {
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
        overlay: /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Tooltip, {
          id: "Tooltip_" + id,
          bsClass: tooltipClassName
        }, message.id ? /*#__PURE__*/_react["default"].createElement(_reactIntl.FormattedMessage, {
          id: message.id,
          values: message.values
        }) : /*#__PURE__*/_react["default"].createElement("span", null, message))
      };
    }

    var wrapperClassName = (0, _classnames["default"])({
      'oc-datagrid-tooltip': true,
      edited: isEdited,
      error: isError,
      warning: isWarning && !isError,
      info: infoMessage && !isError && !isWarning
    });
    return /*#__PURE__*/_react["default"].createElement(_reactBootstrap.OverlayTrigger, overlayAttrs, /*#__PURE__*/_react["default"].createElement("div", {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jZWxsLXRvb2x0aXAuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJEYXRhZ3JpZFRvb2x0aXAiLCJyZW5kZXIiLCJwcm9wcyIsImNoaWxkcmVuIiwiaWQiLCJpc0VkaXRlZCIsImlzRXJyb3IiLCJpc1dhcm5pbmciLCJpbmZvTWVzc2FnZSIsImVycm9yTWVzc2FnZSIsIndhcm5pbmdNZXNzYWdlIiwib3ZlcmxheUF0dHJzIiwib3ZlcmxheSIsImRpc3BsYXkiLCJtZXNzYWdlIiwidG9vbHRpcENsYXNzTmFtZSIsInBsYWNlbWVudCIsInZhbHVlcyIsIndyYXBwZXJDbGFzc05hbWUiLCJlZGl0ZWQiLCJlcnJvciIsIndhcm5pbmciLCJpbmZvIiwiUmVhY3QiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0lBRXFCQSxlOzs7Ozs7Ozs7U0F3Q25CQyxNLEdBQUEsa0JBQVM7QUFBQSxzQkFVSCxLQUFLQyxLQVZGO0FBQUEsUUFFTEMsUUFGSyxlQUVMQSxRQUZLO0FBQUEsUUFHTEMsRUFISyxlQUdMQSxFQUhLO0FBQUEsUUFJTEMsUUFKSyxlQUlMQSxRQUpLO0FBQUEsUUFLTEMsT0FMSyxlQUtMQSxPQUxLO0FBQUEsUUFNTEMsU0FOSyxlQU1MQSxTQU5LO0FBQUEsUUFPTEMsV0FQSyxlQU9MQSxXQVBLO0FBQUEsUUFRTEMsWUFSSyxlQVFMQSxZQVJLO0FBQUEsUUFTTEMsY0FUSyxlQVNMQSxjQVRLO0FBV1AsUUFBSUMsWUFBWSxHQUFHO0FBQ2pCQyxNQUFBQSxPQUFPLGVBQUUsZ0NBQUMsdUJBQUQ7QUFBUyxRQUFBLEVBQUUsZUFBYVIsRUFBeEI7QUFBOEIsUUFBQSxLQUFLLEVBQUU7QUFBRVMsVUFBQUEsT0FBTyxFQUFFO0FBQVg7QUFBckM7QUFEUSxLQUFuQjtBQUdBLFFBQU1DLE9BQU8sR0FBR0wsWUFBWSxJQUFJQyxjQUFoQixJQUFrQ0YsV0FBbEQ7O0FBQ0EsUUFBSU0sT0FBSixFQUFhO0FBQ1gsVUFBSUMsZ0JBQWdCLEdBQUcsU0FBdkI7O0FBQ0EsVUFBSVQsT0FBSixFQUFhO0FBQ1hTLFFBQUFBLGdCQUFnQixHQUFHLGVBQW5CO0FBQ0QsT0FGRCxNQUVPLElBQUlSLFNBQUosRUFBZTtBQUNwQlEsUUFBQUEsZ0JBQWdCLEdBQUcsaUJBQW5CO0FBQ0Q7O0FBQ0RKLE1BQUFBLFlBQVksR0FBRztBQUNiSyxRQUFBQSxTQUFTLEVBQUUsS0FERTtBQUViSixRQUFBQSxPQUFPLGVBQ0wsZ0NBQUMsdUJBQUQ7QUFBUyxVQUFBLEVBQUUsZUFBYVIsRUFBeEI7QUFBOEIsVUFBQSxPQUFPLEVBQUVXO0FBQXZDLFdBQ0dELE9BQU8sQ0FBQ1YsRUFBUixnQkFBYSxnQ0FBQywyQkFBRDtBQUFHLFVBQUEsRUFBRSxFQUFFVSxPQUFPLENBQUNWLEVBQWY7QUFBbUIsVUFBQSxNQUFNLEVBQUVVLE9BQU8sQ0FBQ0c7QUFBbkMsVUFBYixnQkFBNkQsOENBQU9ILE9BQVAsQ0FEaEU7QUFIVyxPQUFmO0FBUUQ7O0FBQ0QsUUFBTUksZ0JBQWdCLEdBQUcsNEJBQVc7QUFDbEMsNkJBQXVCLElBRFc7QUFFbENDLE1BQUFBLE1BQU0sRUFBRWQsUUFGMEI7QUFHbENlLE1BQUFBLEtBQUssRUFBRWQsT0FIMkI7QUFJbENlLE1BQUFBLE9BQU8sRUFBRWQsU0FBUyxJQUFJLENBQUNELE9BSlc7QUFLbENnQixNQUFBQSxJQUFJLEVBQUVkLFdBQVcsSUFBSSxDQUFDRixPQUFoQixJQUEyQixDQUFDQztBQUxBLEtBQVgsQ0FBekI7QUFPQSx3QkFDRSxnQ0FBQyw4QkFBRCxFQUFvQkksWUFBcEIsZUFDRTtBQUFLLE1BQUEsRUFBRSxFQUFFUCxFQUFUO0FBQWEsTUFBQSxTQUFTLEVBQUVjO0FBQXhCLE9BQ0dmLFFBREgsQ0FERixDQURGO0FBT0QsRzs7O0VBckYwQ29CLGtCQUFNQyxTOzs7O2dCQUE5QnhCLGUsa0JBOEJHO0FBQ3BCRyxFQUFBQSxRQUFRLEVBQUUsSUFEVTtBQUVwQkUsRUFBQUEsUUFBUSxFQUFFLEtBRlU7QUFHcEJDLEVBQUFBLE9BQU8sRUFBRSxLQUhXO0FBSXBCQyxFQUFBQSxTQUFTLEVBQUUsS0FKUztBQUtwQkMsRUFBQUEsV0FBVyxFQUFFLElBTE87QUFNcEJDLEVBQUFBLFlBQVksRUFBRSxJQU5NO0FBT3BCQyxFQUFBQSxjQUFjLEVBQUU7QUFQSSxDIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3QvZm9yYmlkLXByb3AtdHlwZXMgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgVG9vbHRpcCwgT3ZlcmxheVRyaWdnZXIgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IHsgRm9ybWF0dGVkTWVzc2FnZSBhcyBNIH0gZnJvbSAncmVhY3QtaW50bCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0YWdyaWRUb29sdGlwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBpZDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm51bWJlcl0pLmlzUmVxdWlyZWQsXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuICAgIGlzRWRpdGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBpc0Vycm9yOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBpc1dhcm5pbmc6IFByb3BUeXBlcy5ib29sLFxuICAgIGluZm9NZXNzYWdlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgdmFsdWVzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgfSksXG4gICAgXSksXG4gICAgZXJyb3JNZXNzYWdlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgdmFsdWVzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgfSksXG4gICAgXSksXG4gICAgd2FybmluZ01lc3NhZ2U6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB2YWx1ZXM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICB9KSxcbiAgICBdKSxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGNoaWxkcmVuOiBudWxsLFxuICAgIGlzRWRpdGVkOiBmYWxzZSxcbiAgICBpc0Vycm9yOiBmYWxzZSxcbiAgICBpc1dhcm5pbmc6IGZhbHNlLFxuICAgIGluZm9NZXNzYWdlOiBudWxsLFxuICAgIGVycm9yTWVzc2FnZTogbnVsbCxcbiAgICB3YXJuaW5nTWVzc2FnZTogbnVsbCxcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgY2hpbGRyZW4sXG4gICAgICBpZCxcbiAgICAgIGlzRWRpdGVkLFxuICAgICAgaXNFcnJvcixcbiAgICAgIGlzV2FybmluZyxcbiAgICAgIGluZm9NZXNzYWdlLFxuICAgICAgZXJyb3JNZXNzYWdlLFxuICAgICAgd2FybmluZ01lc3NhZ2UsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IG92ZXJsYXlBdHRycyA9IHtcbiAgICAgIG92ZXJsYXk6IDxUb29sdGlwIGlkPXtgVG9vbHRpcF8ke2lkfWB9IHN0eWxlPXt7IGRpc3BsYXk6ICdub25lJyB9fSAvPixcbiAgICB9O1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvck1lc3NhZ2UgfHwgd2FybmluZ01lc3NhZ2UgfHwgaW5mb01lc3NhZ2U7XG4gICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgIGxldCB0b29sdGlwQ2xhc3NOYW1lID0gJ3Rvb2x0aXAnO1xuICAgICAgaWYgKGlzRXJyb3IpIHtcbiAgICAgICAgdG9vbHRpcENsYXNzTmFtZSA9ICdlcnJvciB0b29sdGlwJztcbiAgICAgIH0gZWxzZSBpZiAoaXNXYXJuaW5nKSB7XG4gICAgICAgIHRvb2x0aXBDbGFzc05hbWUgPSAnd2FybmluZyB0b29sdGlwJztcbiAgICAgIH1cbiAgICAgIG92ZXJsYXlBdHRycyA9IHtcbiAgICAgICAgcGxhY2VtZW50OiAndG9wJyxcbiAgICAgICAgb3ZlcmxheTogKFxuICAgICAgICAgIDxUb29sdGlwIGlkPXtgVG9vbHRpcF8ke2lkfWB9IGJzQ2xhc3M9e3Rvb2x0aXBDbGFzc05hbWV9PlxuICAgICAgICAgICAge21lc3NhZ2UuaWQgPyA8TSBpZD17bWVzc2FnZS5pZH0gdmFsdWVzPXttZXNzYWdlLnZhbHVlc30gLz4gOiA8c3Bhbj57bWVzc2FnZX08L3NwYW4+fVxuICAgICAgICAgIDwvVG9vbHRpcD5cbiAgICAgICAgKSxcbiAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0IHdyYXBwZXJDbGFzc05hbWUgPSBjbGFzc05hbWVzKHtcbiAgICAgICdvYy1kYXRhZ3JpZC10b29sdGlwJzogdHJ1ZSxcbiAgICAgIGVkaXRlZDogaXNFZGl0ZWQsXG4gICAgICBlcnJvcjogaXNFcnJvcixcbiAgICAgIHdhcm5pbmc6IGlzV2FybmluZyAmJiAhaXNFcnJvcixcbiAgICAgIGluZm86IGluZm9NZXNzYWdlICYmICFpc0Vycm9yICYmICFpc1dhcm5pbmcsXG4gICAgfSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxPdmVybGF5VHJpZ2dlciB7Li4ub3ZlcmxheUF0dHJzfT5cbiAgICAgICAgPGRpdiBpZD17aWR9IGNsYXNzTmFtZT17d3JhcHBlckNsYXNzTmFtZX0+XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvT3ZlcmxheVRyaWdnZXI+XG4gICAgKTtcbiAgfVxufVxuIl19