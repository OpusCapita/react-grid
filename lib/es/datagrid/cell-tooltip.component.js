var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FormattedMessage as M } from 'react-intl';
import classNames from 'classnames';

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
      overlay: React.createElement(Tooltip, { id: 'Tooltip_' + id, style: { display: 'none' } })
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
        overlay: React.createElement(
          Tooltip,
          { id: 'Tooltip_' + id, bsClass: tooltipClassName },
          message.id ? React.createElement(M, { id: message.id, values: message.values }) : React.createElement(
            'span',
            null,
            message
          )
        )
      };
    }
    var wrapperClassName = classNames({
      'oc-datagrid-tooltip': true,
      edited: isEdited,
      error: isError,
      warning: isWarning && !isError,
      info: infoMessage && !isError && !isWarning
    });
    return React.createElement(
      OverlayTrigger,
      overlayAttrs,
      React.createElement(
        'div',
        { className: wrapperClassName },
        children
      )
    );
  };

  return DatagridTooltip;
}(React.Component), _class.defaultProps = {
  children: null,
  isEdited: false,
  isError: false,
  isWarning: false,
  infoMessage: null,
  errorMessage: null,
  warningMessage: null
}, _temp);
export { DatagridTooltip as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jZWxsLXRvb2x0aXAuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsIlRvb2x0aXAiLCJPdmVybGF5VHJpZ2dlciIsIkZvcm1hdHRlZE1lc3NhZ2UiLCJNIiwiY2xhc3NOYW1lcyIsIkRhdGFncmlkVG9vbHRpcCIsInJlbmRlciIsInByb3BzIiwiY2hpbGRyZW4iLCJpZCIsImlzRWRpdGVkIiwiaXNFcnJvciIsImlzV2FybmluZyIsImluZm9NZXNzYWdlIiwiZXJyb3JNZXNzYWdlIiwid2FybmluZ01lc3NhZ2UiLCJvdmVybGF5QXR0cnMiLCJvdmVybGF5IiwiZGlzcGxheSIsIm1lc3NhZ2UiLCJ0b29sdGlwQ2xhc3NOYW1lIiwicGxhY2VtZW50IiwidmFsdWVzIiwid3JhcHBlckNsYXNzTmFtZSIsImVkaXRlZCIsImVycm9yIiwid2FybmluZyIsImluZm8iLCJDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLFNBQVNDLE9BQVQsRUFBa0JDLGNBQWxCLFFBQXdDLGlCQUF4QztBQUNBLFNBQVNDLG9CQUFvQkMsQ0FBN0IsUUFBc0MsWUFBdEM7QUFDQSxPQUFPQyxVQUFQLE1BQXVCLFlBQXZCOztJQUVxQkMsZTs7Ozs7Ozs7OzRCQTJDbkJDLE0scUJBQVM7QUFBQSxpQkFVSCxLQUFLQyxLQVZGO0FBQUEsUUFFTEMsUUFGSyxVQUVMQSxRQUZLO0FBQUEsUUFHTEMsRUFISyxVQUdMQSxFQUhLO0FBQUEsUUFJTEMsUUFKSyxVQUlMQSxRQUpLO0FBQUEsUUFLTEMsT0FMSyxVQUtMQSxPQUxLO0FBQUEsUUFNTEMsU0FOSyxVQU1MQSxTQU5LO0FBQUEsUUFPTEMsV0FQSyxVQU9MQSxXQVBLO0FBQUEsUUFRTEMsWUFSSyxVQVFMQSxZQVJLO0FBQUEsUUFTTEMsY0FUSyxVQVNMQSxjQVRLOztBQVdQLFFBQUlDLGVBQWU7QUFDakJDLGVBQVMsb0JBQUMsT0FBRCxJQUFTLGlCQUFlUixFQUF4QixFQUE4QixPQUFPLEVBQUVTLFNBQVMsTUFBWCxFQUFyQztBQURRLEtBQW5CO0FBR0EsUUFBTUMsVUFBVUwsZ0JBQWdCQyxjQUFoQixJQUFrQ0YsV0FBbEQ7QUFDQSxRQUFJTSxPQUFKLEVBQWE7QUFDWCxVQUFJQyxtQkFBbUIsU0FBdkI7QUFDQSxVQUFJVCxPQUFKLEVBQWE7QUFDWFMsMkJBQW1CLGVBQW5CO0FBQ0QsT0FGRCxNQUVPLElBQUlSLFNBQUosRUFBZTtBQUNwQlEsMkJBQW1CLGlCQUFuQjtBQUNEO0FBQ0RKLHFCQUFlO0FBQ2JLLG1CQUFXLFFBREU7QUFFYkosaUJBQ0U7QUFBQyxpQkFBRDtBQUFBLFlBQVMsaUJBQWVSLEVBQXhCLEVBQThCLFNBQVNXLGdCQUF2QztBQUNJRCxrQkFBUVYsRUFBUixHQUFhLG9CQUFDLENBQUQsSUFBRyxJQUFJVSxRQUFRVixFQUFmLEVBQW1CLFFBQVFVLFFBQVFHLE1BQW5DLEdBQWIsR0FBNkQ7QUFBQTtBQUFBO0FBQU9IO0FBQVA7QUFEakU7QUFIVyxPQUFmO0FBUUQ7QUFDRCxRQUFNSSxtQkFBbUJuQixXQUFXO0FBQ2xDLDZCQUF1QixJQURXO0FBRWxDb0IsY0FBUWQsUUFGMEI7QUFHbENlLGFBQU9kLE9BSDJCO0FBSWxDZSxlQUFTZCxhQUFhLENBQUNELE9BSlc7QUFLbENnQixZQUFNZCxlQUFlLENBQUNGLE9BQWhCLElBQTJCLENBQUNDO0FBTEEsS0FBWCxDQUF6QjtBQU9BLFdBQ0U7QUFBQyxvQkFBRDtBQUFvQkksa0JBQXBCO0FBQ0U7QUFBQTtBQUFBLFVBQUssV0FBV08sZ0JBQWhCO0FBQ0lmO0FBREo7QUFERixLQURGO0FBT0QsRzs7O0VBeEYwQ1YsTUFBTThCLFMsVUFpQzFDQyxZLEdBQWU7QUFDcEJyQixZQUFVLElBRFU7QUFFcEJFLFlBQVUsS0FGVTtBQUdwQkMsV0FBUyxLQUhXO0FBSXBCQyxhQUFXLEtBSlM7QUFLcEJDLGVBQWEsSUFMTztBQU1wQkMsZ0JBQWMsSUFOTTtBQU9wQkMsa0JBQWdCO0FBUEksQztTQWpDSFYsZSIsImZpbGUiOiJjZWxsLXRvb2x0aXAuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3QvZm9yYmlkLXByb3AtdHlwZXMgKi9cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuaW1wb3J0IHsgVG9vbHRpcCwgT3ZlcmxheVRyaWdnZXIgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlIGFzIE0gfSBmcm9tICdyZWFjdC1pbnRsJztcclxuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRhZ3JpZFRvb2x0aXAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XHJcbiAgICBpZDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgIFByb3BUeXBlcy5udW1iZXIsXHJcbiAgICBdKS5pc1JlcXVpcmVkLFxyXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxyXG4gICAgaXNFZGl0ZWQ6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgaXNFcnJvcjogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBpc1dhcm5pbmc6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgaW5mb01lc3NhZ2U6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoe1xyXG4gICAgICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIHZhbHVlczogUHJvcFR5cGVzLm9iamVjdCxcclxuICAgICAgfSksXHJcbiAgICBdKSxcclxuICAgIGVycm9yTWVzc2FnZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7XHJcbiAgICAgICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgdmFsdWVzOiBQcm9wVHlwZXMub2JqZWN0LFxyXG4gICAgICB9KSxcclxuICAgIF0pLFxyXG4gICAgd2FybmluZ01lc3NhZ2U6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoe1xyXG4gICAgICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIHZhbHVlczogUHJvcFR5cGVzLm9iamVjdCxcclxuICAgICAgfSksXHJcbiAgICBdKSxcclxuICB9O1xyXG5cclxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xyXG4gICAgY2hpbGRyZW46IG51bGwsXHJcbiAgICBpc0VkaXRlZDogZmFsc2UsXHJcbiAgICBpc0Vycm9yOiBmYWxzZSxcclxuICAgIGlzV2FybmluZzogZmFsc2UsXHJcbiAgICBpbmZvTWVzc2FnZTogbnVsbCxcclxuICAgIGVycm9yTWVzc2FnZTogbnVsbCxcclxuICAgIHdhcm5pbmdNZXNzYWdlOiBudWxsLFxyXG4gIH07XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgY2hpbGRyZW4sXHJcbiAgICAgIGlkLFxyXG4gICAgICBpc0VkaXRlZCxcclxuICAgICAgaXNFcnJvcixcclxuICAgICAgaXNXYXJuaW5nLFxyXG4gICAgICBpbmZvTWVzc2FnZSxcclxuICAgICAgZXJyb3JNZXNzYWdlLFxyXG4gICAgICB3YXJuaW5nTWVzc2FnZSxcclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgbGV0IG92ZXJsYXlBdHRycyA9IHtcclxuICAgICAgb3ZlcmxheTogPFRvb2x0aXAgaWQ9e2BUb29sdGlwXyR7aWR9YH0gc3R5bGU9e3sgZGlzcGxheTogJ25vbmUnIH19IC8+LFxyXG4gICAgfTtcclxuICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvck1lc3NhZ2UgfHwgd2FybmluZ01lc3NhZ2UgfHwgaW5mb01lc3NhZ2U7XHJcbiAgICBpZiAobWVzc2FnZSkge1xyXG4gICAgICBsZXQgdG9vbHRpcENsYXNzTmFtZSA9ICd0b29sdGlwJztcclxuICAgICAgaWYgKGlzRXJyb3IpIHtcclxuICAgICAgICB0b29sdGlwQ2xhc3NOYW1lID0gJ2Vycm9yIHRvb2x0aXAnO1xyXG4gICAgICB9IGVsc2UgaWYgKGlzV2FybmluZykge1xyXG4gICAgICAgIHRvb2x0aXBDbGFzc05hbWUgPSAnd2FybmluZyB0b29sdGlwJztcclxuICAgICAgfVxyXG4gICAgICBvdmVybGF5QXR0cnMgPSB7XHJcbiAgICAgICAgcGxhY2VtZW50OiAnYm90dG9tJyxcclxuICAgICAgICBvdmVybGF5OiAoXHJcbiAgICAgICAgICA8VG9vbHRpcCBpZD17YFRvb2x0aXBfJHtpZH1gfSBic0NsYXNzPXt0b29sdGlwQ2xhc3NOYW1lfT5cclxuICAgICAgICAgICAgeyBtZXNzYWdlLmlkID8gPE0gaWQ9e21lc3NhZ2UuaWR9IHZhbHVlcz17bWVzc2FnZS52YWx1ZXN9IC8+IDogPHNwYW4+e21lc3NhZ2V9PC9zcGFuPiB9XHJcbiAgICAgICAgICA8L1Rvb2x0aXA+XHJcbiAgICAgICAgKSxcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIGNvbnN0IHdyYXBwZXJDbGFzc05hbWUgPSBjbGFzc05hbWVzKHtcclxuICAgICAgJ29jLWRhdGFncmlkLXRvb2x0aXAnOiB0cnVlLFxyXG4gICAgICBlZGl0ZWQ6IGlzRWRpdGVkLFxyXG4gICAgICBlcnJvcjogaXNFcnJvcixcclxuICAgICAgd2FybmluZzogaXNXYXJuaW5nICYmICFpc0Vycm9yLFxyXG4gICAgICBpbmZvOiBpbmZvTWVzc2FnZSAmJiAhaXNFcnJvciAmJiAhaXNXYXJuaW5nLFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8T3ZlcmxheVRyaWdnZXIgey4uLm92ZXJsYXlBdHRyc30+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3dyYXBwZXJDbGFzc05hbWV9PlxyXG4gICAgICAgICAgeyBjaGlsZHJlbiB9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvT3ZlcmxheVRyaWdnZXI+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=