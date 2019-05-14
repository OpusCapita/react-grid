function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FormattedMessage as M } from 'react-intl';
import classNames from 'classnames';

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
      overlay: React.createElement(Tooltip, {
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
        overlay: React.createElement(Tooltip, {
          id: "Tooltip_" + id,
          bsClass: tooltipClassName
        }, message.id ? React.createElement(M, {
          id: message.id,
          values: message.values
        }) : React.createElement("span", null, message))
      };
    }

    var wrapperClassName = classNames({
      'oc-datagrid-tooltip': true,
      edited: isEdited,
      error: isError,
      warning: isWarning && !isError,
      info: infoMessage && !isError && !isWarning
    });
    return React.createElement(OverlayTrigger, overlayAttrs, React.createElement("div", {
      id: id,
      className: wrapperClassName
    }, children));
  };

  return DatagridTooltip;
}(React.Component);

_defineProperty(DatagridTooltip, "defaultProps", {
  children: null,
  isEdited: false,
  isError: false,
  isWarning: false,
  infoMessage: null,
  errorMessage: null,
  warningMessage: null
});

export { DatagridTooltip as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jZWxsLXRvb2x0aXAuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsIlRvb2x0aXAiLCJPdmVybGF5VHJpZ2dlciIsIkZvcm1hdHRlZE1lc3NhZ2UiLCJNIiwiY2xhc3NOYW1lcyIsIkRhdGFncmlkVG9vbHRpcCIsInJlbmRlciIsInByb3BzIiwiY2hpbGRyZW4iLCJpZCIsImlzRWRpdGVkIiwiaXNFcnJvciIsImlzV2FybmluZyIsImluZm9NZXNzYWdlIiwiZXJyb3JNZXNzYWdlIiwid2FybmluZ01lc3NhZ2UiLCJvdmVybGF5QXR0cnMiLCJvdmVybGF5IiwiZGlzcGxheSIsIm1lc3NhZ2UiLCJ0b29sdGlwQ2xhc3NOYW1lIiwicGxhY2VtZW50IiwidmFsdWVzIiwid3JhcHBlckNsYXNzTmFtZSIsImVkaXRlZCIsImVycm9yIiwid2FybmluZyIsImluZm8iLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsU0FBU0MsT0FBVCxFQUFrQkMsY0FBbEIsUUFBd0MsaUJBQXhDO0FBQ0EsU0FBU0MsZ0JBQWdCLElBQUlDLENBQTdCLFFBQXNDLFlBQXRDO0FBQ0EsT0FBT0MsVUFBUCxNQUF1QixZQUF2Qjs7SUFFcUJDLGU7Ozs7Ozs7Ozs7O1NBd0NuQkMsTSxHQUFBLGtCQUFTO0FBQUEsc0JBVUgsS0FBS0MsS0FWRjtBQUFBLFFBRUxDLFFBRkssZUFFTEEsUUFGSztBQUFBLFFBR0xDLEVBSEssZUFHTEEsRUFISztBQUFBLFFBSUxDLFFBSkssZUFJTEEsUUFKSztBQUFBLFFBS0xDLE9BTEssZUFLTEEsT0FMSztBQUFBLFFBTUxDLFNBTkssZUFNTEEsU0FOSztBQUFBLFFBT0xDLFdBUEssZUFPTEEsV0FQSztBQUFBLFFBUUxDLFlBUkssZUFRTEEsWUFSSztBQUFBLFFBU0xDLGNBVEssZUFTTEEsY0FUSztBQVdQLFFBQUlDLFlBQVksR0FBRztBQUNqQkMsTUFBQUEsT0FBTyxFQUFFLG9CQUFDLE9BQUQ7QUFBUyxRQUFBLEVBQUUsZUFBYVIsRUFBeEI7QUFBOEIsUUFBQSxLQUFLLEVBQUU7QUFBRVMsVUFBQUEsT0FBTyxFQUFFO0FBQVg7QUFBckM7QUFEUSxLQUFuQjtBQUdBLFFBQU1DLE9BQU8sR0FBR0wsWUFBWSxJQUFJQyxjQUFoQixJQUFrQ0YsV0FBbEQ7O0FBQ0EsUUFBSU0sT0FBSixFQUFhO0FBQ1gsVUFBSUMsZ0JBQWdCLEdBQUcsU0FBdkI7O0FBQ0EsVUFBSVQsT0FBSixFQUFhO0FBQ1hTLFFBQUFBLGdCQUFnQixHQUFHLGVBQW5CO0FBQ0QsT0FGRCxNQUVPLElBQUlSLFNBQUosRUFBZTtBQUNwQlEsUUFBQUEsZ0JBQWdCLEdBQUcsaUJBQW5CO0FBQ0Q7O0FBQ0RKLE1BQUFBLFlBQVksR0FBRztBQUNiSyxRQUFBQSxTQUFTLEVBQUUsS0FERTtBQUViSixRQUFBQSxPQUFPLEVBQ0wsb0JBQUMsT0FBRDtBQUFTLFVBQUEsRUFBRSxlQUFhUixFQUF4QjtBQUE4QixVQUFBLE9BQU8sRUFBRVc7QUFBdkMsV0FDR0QsT0FBTyxDQUFDVixFQUFSLEdBQWEsb0JBQUMsQ0FBRDtBQUFHLFVBQUEsRUFBRSxFQUFFVSxPQUFPLENBQUNWLEVBQWY7QUFBbUIsVUFBQSxNQUFNLEVBQUVVLE9BQU8sQ0FBQ0c7QUFBbkMsVUFBYixHQUE2RCxrQ0FBT0gsT0FBUCxDQURoRTtBQUhXLE9BQWY7QUFRRDs7QUFDRCxRQUFNSSxnQkFBZ0IsR0FBR25CLFVBQVUsQ0FBQztBQUNsQyw2QkFBdUIsSUFEVztBQUVsQ29CLE1BQUFBLE1BQU0sRUFBRWQsUUFGMEI7QUFHbENlLE1BQUFBLEtBQUssRUFBRWQsT0FIMkI7QUFJbENlLE1BQUFBLE9BQU8sRUFBRWQsU0FBUyxJQUFJLENBQUNELE9BSlc7QUFLbENnQixNQUFBQSxJQUFJLEVBQUVkLFdBQVcsSUFBSSxDQUFDRixPQUFoQixJQUEyQixDQUFDQztBQUxBLEtBQUQsQ0FBbkM7QUFPQSxXQUNFLG9CQUFDLGNBQUQsRUFBb0JJLFlBQXBCLEVBQ0U7QUFBSyxNQUFBLEVBQUUsRUFBRVAsRUFBVDtBQUFhLE1BQUEsU0FBUyxFQUFFYztBQUF4QixPQUNHZixRQURILENBREYsQ0FERjtBQU9ELEc7OztFQXJGMENWLEtBQUssQ0FBQzhCLFM7O2dCQUE5QnZCLGUsa0JBOEJHO0FBQ3BCRyxFQUFBQSxRQUFRLEVBQUUsSUFEVTtBQUVwQkUsRUFBQUEsUUFBUSxFQUFFLEtBRlU7QUFHcEJDLEVBQUFBLE9BQU8sRUFBRSxLQUhXO0FBSXBCQyxFQUFBQSxTQUFTLEVBQUUsS0FKUztBQUtwQkMsRUFBQUEsV0FBVyxFQUFFLElBTE87QUFNcEJDLEVBQUFBLFlBQVksRUFBRSxJQU5NO0FBT3BCQyxFQUFBQSxjQUFjLEVBQUU7QUFQSSxDOztTQTlCSFYsZSIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L2ZvcmJpZC1wcm9wLXR5cGVzICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IFRvb2x0aXAsIE92ZXJsYXlUcmlnZ2VyIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgYXMgTSB9IGZyb20gJ3JlYWN0LWludGwnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGFncmlkVG9vbHRpcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgaWQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5udW1iZXJdKS5pc1JlcXVpcmVkLFxuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcbiAgICBpc0VkaXRlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgaXNFcnJvcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgaXNXYXJuaW5nOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBpbmZvTWVzc2FnZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIHZhbHVlczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgIH0pLFxuICAgIF0pLFxuICAgIGVycm9yTWVzc2FnZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIHZhbHVlczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgIH0pLFxuICAgIF0pLFxuICAgIHdhcm5pbmdNZXNzYWdlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgdmFsdWVzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgfSksXG4gICAgXSksXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBjaGlsZHJlbjogbnVsbCxcbiAgICBpc0VkaXRlZDogZmFsc2UsXG4gICAgaXNFcnJvcjogZmFsc2UsXG4gICAgaXNXYXJuaW5nOiBmYWxzZSxcbiAgICBpbmZvTWVzc2FnZTogbnVsbCxcbiAgICBlcnJvck1lc3NhZ2U6IG51bGwsXG4gICAgd2FybmluZ01lc3NhZ2U6IG51bGwsXG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgaWQsXG4gICAgICBpc0VkaXRlZCxcbiAgICAgIGlzRXJyb3IsXG4gICAgICBpc1dhcm5pbmcsXG4gICAgICBpbmZvTWVzc2FnZSxcbiAgICAgIGVycm9yTWVzc2FnZSxcbiAgICAgIHdhcm5pbmdNZXNzYWdlLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBvdmVybGF5QXR0cnMgPSB7XG4gICAgICBvdmVybGF5OiA8VG9vbHRpcCBpZD17YFRvb2x0aXBfJHtpZH1gfSBzdHlsZT17eyBkaXNwbGF5OiAnbm9uZScgfX0gLz4sXG4gICAgfTtcbiAgICBjb25zdCBtZXNzYWdlID0gZXJyb3JNZXNzYWdlIHx8IHdhcm5pbmdNZXNzYWdlIHx8IGluZm9NZXNzYWdlO1xuICAgIGlmIChtZXNzYWdlKSB7XG4gICAgICBsZXQgdG9vbHRpcENsYXNzTmFtZSA9ICd0b29sdGlwJztcbiAgICAgIGlmIChpc0Vycm9yKSB7XG4gICAgICAgIHRvb2x0aXBDbGFzc05hbWUgPSAnZXJyb3IgdG9vbHRpcCc7XG4gICAgICB9IGVsc2UgaWYgKGlzV2FybmluZykge1xuICAgICAgICB0b29sdGlwQ2xhc3NOYW1lID0gJ3dhcm5pbmcgdG9vbHRpcCc7XG4gICAgICB9XG4gICAgICBvdmVybGF5QXR0cnMgPSB7XG4gICAgICAgIHBsYWNlbWVudDogJ3RvcCcsXG4gICAgICAgIG92ZXJsYXk6IChcbiAgICAgICAgICA8VG9vbHRpcCBpZD17YFRvb2x0aXBfJHtpZH1gfSBic0NsYXNzPXt0b29sdGlwQ2xhc3NOYW1lfT5cbiAgICAgICAgICAgIHttZXNzYWdlLmlkID8gPE0gaWQ9e21lc3NhZ2UuaWR9IHZhbHVlcz17bWVzc2FnZS52YWx1ZXN9IC8+IDogPHNwYW4+e21lc3NhZ2V9PC9zcGFuPn1cbiAgICAgICAgICA8L1Rvb2x0aXA+XG4gICAgICAgICksXG4gICAgICB9O1xuICAgIH1cbiAgICBjb25zdCB3cmFwcGVyQ2xhc3NOYW1lID0gY2xhc3NOYW1lcyh7XG4gICAgICAnb2MtZGF0YWdyaWQtdG9vbHRpcCc6IHRydWUsXG4gICAgICBlZGl0ZWQ6IGlzRWRpdGVkLFxuICAgICAgZXJyb3I6IGlzRXJyb3IsXG4gICAgICB3YXJuaW5nOiBpc1dhcm5pbmcgJiYgIWlzRXJyb3IsXG4gICAgICBpbmZvOiBpbmZvTWVzc2FnZSAmJiAhaXNFcnJvciAmJiAhaXNXYXJuaW5nLFxuICAgIH0pO1xuICAgIHJldHVybiAoXG4gICAgICA8T3ZlcmxheVRyaWdnZXIgey4uLm92ZXJsYXlBdHRyc30+XG4gICAgICAgIDxkaXYgaWQ9e2lkfSBjbGFzc05hbWU9e3dyYXBwZXJDbGFzc05hbWV9PlxuICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L092ZXJsYXlUcmlnZ2VyPlxuICAgICk7XG4gIH1cbn1cbiJdfQ==