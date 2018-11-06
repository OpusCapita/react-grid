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
        placement: 'top',
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
        {
          id: id,
          className: wrapperClassName
        },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jZWxsLXRvb2x0aXAuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsIlRvb2x0aXAiLCJPdmVybGF5VHJpZ2dlciIsIkZvcm1hdHRlZE1lc3NhZ2UiLCJNIiwiY2xhc3NOYW1lcyIsIkRhdGFncmlkVG9vbHRpcCIsInJlbmRlciIsInByb3BzIiwiY2hpbGRyZW4iLCJpZCIsImlzRWRpdGVkIiwiaXNFcnJvciIsImlzV2FybmluZyIsImluZm9NZXNzYWdlIiwiZXJyb3JNZXNzYWdlIiwid2FybmluZ01lc3NhZ2UiLCJvdmVybGF5QXR0cnMiLCJvdmVybGF5IiwiZGlzcGxheSIsIm1lc3NhZ2UiLCJ0b29sdGlwQ2xhc3NOYW1lIiwicGxhY2VtZW50IiwidmFsdWVzIiwid3JhcHBlckNsYXNzTmFtZSIsImVkaXRlZCIsImVycm9yIiwid2FybmluZyIsImluZm8iLCJDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLFNBQVNDLE9BQVQsRUFBa0JDLGNBQWxCLFFBQXdDLGlCQUF4QztBQUNBLFNBQVNDLG9CQUFvQkMsQ0FBN0IsUUFBc0MsWUFBdEM7QUFDQSxPQUFPQyxVQUFQLE1BQXVCLFlBQXZCOztJQUVxQkMsZTs7Ozs7Ozs7OzRCQTJDbkJDLE0scUJBQVM7QUFBQSxpQkFVSCxLQUFLQyxLQVZGO0FBQUEsUUFFTEMsUUFGSyxVQUVMQSxRQUZLO0FBQUEsUUFHTEMsRUFISyxVQUdMQSxFQUhLO0FBQUEsUUFJTEMsUUFKSyxVQUlMQSxRQUpLO0FBQUEsUUFLTEMsT0FMSyxVQUtMQSxPQUxLO0FBQUEsUUFNTEMsU0FOSyxVQU1MQSxTQU5LO0FBQUEsUUFPTEMsV0FQSyxVQU9MQSxXQVBLO0FBQUEsUUFRTEMsWUFSSyxVQVFMQSxZQVJLO0FBQUEsUUFTTEMsY0FUSyxVQVNMQSxjQVRLOztBQVdQLFFBQUlDLGVBQWU7QUFDakJDLGVBQVMsb0JBQUMsT0FBRCxJQUFTLGlCQUFlUixFQUF4QixFQUE4QixPQUFPLEVBQUVTLFNBQVMsTUFBWCxFQUFyQztBQURRLEtBQW5CO0FBR0EsUUFBTUMsVUFBVUwsZ0JBQWdCQyxjQUFoQixJQUFrQ0YsV0FBbEQ7QUFDQSxRQUFJTSxPQUFKLEVBQWE7QUFDWCxVQUFJQyxtQkFBbUIsU0FBdkI7QUFDQSxVQUFJVCxPQUFKLEVBQWE7QUFDWFMsMkJBQW1CLGVBQW5CO0FBQ0QsT0FGRCxNQUVPLElBQUlSLFNBQUosRUFBZTtBQUNwQlEsMkJBQW1CLGlCQUFuQjtBQUNEO0FBQ0RKLHFCQUFlO0FBQ2JLLG1CQUFXLEtBREU7QUFFYkosaUJBQ0U7QUFBQyxpQkFBRDtBQUFBLFlBQVMsaUJBQWVSLEVBQXhCLEVBQThCLFNBQVNXLGdCQUF2QztBQUNJRCxrQkFBUVYsRUFBUixHQUFhLG9CQUFDLENBQUQsSUFBRyxJQUFJVSxRQUFRVixFQUFmLEVBQW1CLFFBQVFVLFFBQVFHLE1BQW5DLEdBQWIsR0FBNkQ7QUFBQTtBQUFBO0FBQU9IO0FBQVA7QUFEakU7QUFIVyxPQUFmO0FBUUQ7QUFDRCxRQUFNSSxtQkFBbUJuQixXQUFXO0FBQ2xDLDZCQUF1QixJQURXO0FBRWxDb0IsY0FBUWQsUUFGMEI7QUFHbENlLGFBQU9kLE9BSDJCO0FBSWxDZSxlQUFTZCxhQUFhLENBQUNELE9BSlc7QUFLbENnQixZQUFNZCxlQUFlLENBQUNGLE9BQWhCLElBQTJCLENBQUNDO0FBTEEsS0FBWCxDQUF6QjtBQU9BLFdBQ0U7QUFBQyxvQkFBRDtBQUFvQkksa0JBQXBCO0FBQ0U7QUFBQTtBQUFBO0FBQ0UsY0FBSVAsRUFETjtBQUVFLHFCQUFXYztBQUZiO0FBSUlmO0FBSko7QUFERixLQURGO0FBVUQsRzs7O0VBM0YwQ1YsTUFBTThCLFMsVUFpQzFDQyxZLEdBQWU7QUFDcEJyQixZQUFVLElBRFU7QUFFcEJFLFlBQVUsS0FGVTtBQUdwQkMsV0FBUyxLQUhXO0FBSXBCQyxhQUFXLEtBSlM7QUFLcEJDLGVBQWEsSUFMTztBQU1wQkMsZ0JBQWMsSUFOTTtBQU9wQkMsa0JBQWdCO0FBUEksQztTQWpDSFYsZSIsImZpbGUiOiJjZWxsLXRvb2x0aXAuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3QvZm9yYmlkLXByb3AtdHlwZXMgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgVG9vbHRpcCwgT3ZlcmxheVRyaWdnZXIgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IHsgRm9ybWF0dGVkTWVzc2FnZSBhcyBNIH0gZnJvbSAncmVhY3QtaW50bCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0YWdyaWRUb29sdGlwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBpZDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLm51bWJlcixcbiAgICBdKS5pc1JlcXVpcmVkLFxuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcbiAgICBpc0VkaXRlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgaXNFcnJvcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgaXNXYXJuaW5nOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBpbmZvTWVzc2FnZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIHZhbHVlczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgIH0pLFxuICAgIF0pLFxuICAgIGVycm9yTWVzc2FnZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIHZhbHVlczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgIH0pLFxuICAgIF0pLFxuICAgIHdhcm5pbmdNZXNzYWdlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgdmFsdWVzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgfSksXG4gICAgXSksXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBjaGlsZHJlbjogbnVsbCxcbiAgICBpc0VkaXRlZDogZmFsc2UsXG4gICAgaXNFcnJvcjogZmFsc2UsXG4gICAgaXNXYXJuaW5nOiBmYWxzZSxcbiAgICBpbmZvTWVzc2FnZTogbnVsbCxcbiAgICBlcnJvck1lc3NhZ2U6IG51bGwsXG4gICAgd2FybmluZ01lc3NhZ2U6IG51bGwsXG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgaWQsXG4gICAgICBpc0VkaXRlZCxcbiAgICAgIGlzRXJyb3IsXG4gICAgICBpc1dhcm5pbmcsXG4gICAgICBpbmZvTWVzc2FnZSxcbiAgICAgIGVycm9yTWVzc2FnZSxcbiAgICAgIHdhcm5pbmdNZXNzYWdlLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBvdmVybGF5QXR0cnMgPSB7XG4gICAgICBvdmVybGF5OiA8VG9vbHRpcCBpZD17YFRvb2x0aXBfJHtpZH1gfSBzdHlsZT17eyBkaXNwbGF5OiAnbm9uZScgfX0gLz4sXG4gICAgfTtcbiAgICBjb25zdCBtZXNzYWdlID0gZXJyb3JNZXNzYWdlIHx8IHdhcm5pbmdNZXNzYWdlIHx8IGluZm9NZXNzYWdlO1xuICAgIGlmIChtZXNzYWdlKSB7XG4gICAgICBsZXQgdG9vbHRpcENsYXNzTmFtZSA9ICd0b29sdGlwJztcbiAgICAgIGlmIChpc0Vycm9yKSB7XG4gICAgICAgIHRvb2x0aXBDbGFzc05hbWUgPSAnZXJyb3IgdG9vbHRpcCc7XG4gICAgICB9IGVsc2UgaWYgKGlzV2FybmluZykge1xuICAgICAgICB0b29sdGlwQ2xhc3NOYW1lID0gJ3dhcm5pbmcgdG9vbHRpcCc7XG4gICAgICB9XG4gICAgICBvdmVybGF5QXR0cnMgPSB7XG4gICAgICAgIHBsYWNlbWVudDogJ3RvcCcsXG4gICAgICAgIG92ZXJsYXk6IChcbiAgICAgICAgICA8VG9vbHRpcCBpZD17YFRvb2x0aXBfJHtpZH1gfSBic0NsYXNzPXt0b29sdGlwQ2xhc3NOYW1lfT5cbiAgICAgICAgICAgIHsgbWVzc2FnZS5pZCA/IDxNIGlkPXttZXNzYWdlLmlkfSB2YWx1ZXM9e21lc3NhZ2UudmFsdWVzfSAvPiA6IDxzcGFuPnttZXNzYWdlfTwvc3Bhbj4gfVxuICAgICAgICAgIDwvVG9vbHRpcD5cbiAgICAgICAgKSxcbiAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0IHdyYXBwZXJDbGFzc05hbWUgPSBjbGFzc05hbWVzKHtcbiAgICAgICdvYy1kYXRhZ3JpZC10b29sdGlwJzogdHJ1ZSxcbiAgICAgIGVkaXRlZDogaXNFZGl0ZWQsXG4gICAgICBlcnJvcjogaXNFcnJvcixcbiAgICAgIHdhcm5pbmc6IGlzV2FybmluZyAmJiAhaXNFcnJvcixcbiAgICAgIGluZm86IGluZm9NZXNzYWdlICYmICFpc0Vycm9yICYmICFpc1dhcm5pbmcsXG4gICAgfSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxPdmVybGF5VHJpZ2dlciB7Li4ub3ZlcmxheUF0dHJzfT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGlkPXtpZH1cbiAgICAgICAgICBjbGFzc05hbWU9e3dyYXBwZXJDbGFzc05hbWV9XG4gICAgICAgID5cbiAgICAgICAgICB7IGNoaWxkcmVuIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L092ZXJsYXlUcmlnZ2VyPlxuICAgICk7XG4gIH1cbn1cbiJdfQ==