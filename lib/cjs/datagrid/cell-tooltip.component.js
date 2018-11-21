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
        placement: 'top',
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
        {
          id: id,
          className: wrapperClassName
        },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jZWxsLXRvb2x0aXAuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJEYXRhZ3JpZFRvb2x0aXAiLCJyZW5kZXIiLCJwcm9wcyIsImNoaWxkcmVuIiwiaWQiLCJpc0VkaXRlZCIsImlzRXJyb3IiLCJpc1dhcm5pbmciLCJpbmZvTWVzc2FnZSIsImVycm9yTWVzc2FnZSIsIndhcm5pbmdNZXNzYWdlIiwib3ZlcmxheUF0dHJzIiwib3ZlcmxheSIsImRpc3BsYXkiLCJtZXNzYWdlIiwidG9vbHRpcENsYXNzTmFtZSIsInBsYWNlbWVudCIsInZhbHVlcyIsIndyYXBwZXJDbGFzc05hbWUiLCJlZGl0ZWQiLCJlcnJvciIsIndhcm5pbmciLCJpbmZvIiwiUmVhY3QiLCJDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7O21CQUFBOzs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsZTs7Ozs7Ozs7OzRCQTJDbkJDLE0scUJBQVM7QUFBQSxpQkFVSCxLQUFLQyxLQVZGO0FBQUEsUUFFTEMsUUFGSyxVQUVMQSxRQUZLO0FBQUEsUUFHTEMsRUFISyxVQUdMQSxFQUhLO0FBQUEsUUFJTEMsUUFKSyxVQUlMQSxRQUpLO0FBQUEsUUFLTEMsT0FMSyxVQUtMQSxPQUxLO0FBQUEsUUFNTEMsU0FOSyxVQU1MQSxTQU5LO0FBQUEsUUFPTEMsV0FQSyxVQU9MQSxXQVBLO0FBQUEsUUFRTEMsWUFSSyxVQVFMQSxZQVJLO0FBQUEsUUFTTEMsY0FUSyxVQVNMQSxjQVRLOztBQVdQLFFBQUlDLGVBQWU7QUFDakJDLGVBQVMsOEJBQUMsdUJBQUQsSUFBUyxpQkFBZVIsRUFBeEIsRUFBOEIsT0FBTyxFQUFFUyxTQUFTLE1BQVgsRUFBckM7QUFEUSxLQUFuQjtBQUdBLFFBQU1DLFVBQVVMLGdCQUFnQkMsY0FBaEIsSUFBa0NGLFdBQWxEO0FBQ0EsUUFBSU0sT0FBSixFQUFhO0FBQ1gsVUFBSUMsbUJBQW1CLFNBQXZCO0FBQ0EsVUFBSVQsT0FBSixFQUFhO0FBQ1hTLDJCQUFtQixlQUFuQjtBQUNELE9BRkQsTUFFTyxJQUFJUixTQUFKLEVBQWU7QUFDcEJRLDJCQUFtQixpQkFBbkI7QUFDRDtBQUNESixxQkFBZTtBQUNiSyxtQkFBVyxLQURFO0FBRWJKLGlCQUNFO0FBQUMsaUNBQUQ7QUFBQSxZQUFTLGlCQUFlUixFQUF4QixFQUE4QixTQUFTVyxnQkFBdkM7QUFDSUQsa0JBQVFWLEVBQVIsR0FBYSw4QkFBQywyQkFBRCxJQUFHLElBQUlVLFFBQVFWLEVBQWYsRUFBbUIsUUFBUVUsUUFBUUcsTUFBbkMsR0FBYixHQUE2RDtBQUFBO0FBQUE7QUFBT0g7QUFBUDtBQURqRTtBQUhXLE9BQWY7QUFRRDtBQUNELFFBQU1JLG1CQUFtQiwwQkFBVztBQUNsQyw2QkFBdUIsSUFEVztBQUVsQ0MsY0FBUWQsUUFGMEI7QUFHbENlLGFBQU9kLE9BSDJCO0FBSWxDZSxlQUFTZCxhQUFhLENBQUNELE9BSlc7QUFLbENnQixZQUFNZCxlQUFlLENBQUNGLE9BQWhCLElBQTJCLENBQUNDO0FBTEEsS0FBWCxDQUF6QjtBQU9BLFdBQ0U7QUFBQyxvQ0FBRDtBQUFvQkksa0JBQXBCO0FBQ0U7QUFBQTtBQUFBO0FBQ0UsY0FBSVAsRUFETjtBQUVFLHFCQUFXYztBQUZiO0FBSUlmO0FBSko7QUFERixLQURGO0FBVUQsRzs7O0VBM0YwQ29CLGdCQUFNQyxTLFVBaUMxQ0MsWSxHQUFlO0FBQ3BCdEIsWUFBVSxJQURVO0FBRXBCRSxZQUFVLEtBRlU7QUFHcEJDLFdBQVMsS0FIVztBQUlwQkMsYUFBVyxLQUpTO0FBS3BCQyxlQUFhLElBTE87QUFNcEJDLGdCQUFjLElBTk07QUFPcEJDLGtCQUFnQjtBQVBJLEM7a0JBakNIVixlIiwiZmlsZSI6ImNlbGwtdG9vbHRpcC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9mb3JiaWQtcHJvcC10eXBlcyAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBUb29sdGlwLCBPdmVybGF5VHJpZ2dlciB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlIGFzIE0gfSBmcm9tICdyZWFjdC1pbnRsJztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRhZ3JpZFRvb2x0aXAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGlkOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMubnVtYmVyLFxuICAgIF0pLmlzUmVxdWlyZWQsXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuICAgIGlzRWRpdGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBpc0Vycm9yOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBpc1dhcm5pbmc6IFByb3BUeXBlcy5ib29sLFxuICAgIGluZm9NZXNzYWdlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgdmFsdWVzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgfSksXG4gICAgXSksXG4gICAgZXJyb3JNZXNzYWdlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgdmFsdWVzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgfSksXG4gICAgXSksXG4gICAgd2FybmluZ01lc3NhZ2U6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB2YWx1ZXM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICB9KSxcbiAgICBdKSxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGNoaWxkcmVuOiBudWxsLFxuICAgIGlzRWRpdGVkOiBmYWxzZSxcbiAgICBpc0Vycm9yOiBmYWxzZSxcbiAgICBpc1dhcm5pbmc6IGZhbHNlLFxuICAgIGluZm9NZXNzYWdlOiBudWxsLFxuICAgIGVycm9yTWVzc2FnZTogbnVsbCxcbiAgICB3YXJuaW5nTWVzc2FnZTogbnVsbCxcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgY2hpbGRyZW4sXG4gICAgICBpZCxcbiAgICAgIGlzRWRpdGVkLFxuICAgICAgaXNFcnJvcixcbiAgICAgIGlzV2FybmluZyxcbiAgICAgIGluZm9NZXNzYWdlLFxuICAgICAgZXJyb3JNZXNzYWdlLFxuICAgICAgd2FybmluZ01lc3NhZ2UsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IG92ZXJsYXlBdHRycyA9IHtcbiAgICAgIG92ZXJsYXk6IDxUb29sdGlwIGlkPXtgVG9vbHRpcF8ke2lkfWB9IHN0eWxlPXt7IGRpc3BsYXk6ICdub25lJyB9fSAvPixcbiAgICB9O1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvck1lc3NhZ2UgfHwgd2FybmluZ01lc3NhZ2UgfHwgaW5mb01lc3NhZ2U7XG4gICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgIGxldCB0b29sdGlwQ2xhc3NOYW1lID0gJ3Rvb2x0aXAnO1xuICAgICAgaWYgKGlzRXJyb3IpIHtcbiAgICAgICAgdG9vbHRpcENsYXNzTmFtZSA9ICdlcnJvciB0b29sdGlwJztcbiAgICAgIH0gZWxzZSBpZiAoaXNXYXJuaW5nKSB7XG4gICAgICAgIHRvb2x0aXBDbGFzc05hbWUgPSAnd2FybmluZyB0b29sdGlwJztcbiAgICAgIH1cbiAgICAgIG92ZXJsYXlBdHRycyA9IHtcbiAgICAgICAgcGxhY2VtZW50OiAndG9wJyxcbiAgICAgICAgb3ZlcmxheTogKFxuICAgICAgICAgIDxUb29sdGlwIGlkPXtgVG9vbHRpcF8ke2lkfWB9IGJzQ2xhc3M9e3Rvb2x0aXBDbGFzc05hbWV9PlxuICAgICAgICAgICAgeyBtZXNzYWdlLmlkID8gPE0gaWQ9e21lc3NhZ2UuaWR9IHZhbHVlcz17bWVzc2FnZS52YWx1ZXN9IC8+IDogPHNwYW4+e21lc3NhZ2V9PC9zcGFuPiB9XG4gICAgICAgICAgPC9Ub29sdGlwPlxuICAgICAgICApLFxuICAgICAgfTtcbiAgICB9XG4gICAgY29uc3Qgd3JhcHBlckNsYXNzTmFtZSA9IGNsYXNzTmFtZXMoe1xuICAgICAgJ29jLWRhdGFncmlkLXRvb2x0aXAnOiB0cnVlLFxuICAgICAgZWRpdGVkOiBpc0VkaXRlZCxcbiAgICAgIGVycm9yOiBpc0Vycm9yLFxuICAgICAgd2FybmluZzogaXNXYXJuaW5nICYmICFpc0Vycm9yLFxuICAgICAgaW5mbzogaW5mb01lc3NhZ2UgJiYgIWlzRXJyb3IgJiYgIWlzV2FybmluZyxcbiAgICB9KTtcbiAgICByZXR1cm4gKFxuICAgICAgPE92ZXJsYXlUcmlnZ2VyIHsuLi5vdmVybGF5QXR0cnN9PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgaWQ9e2lkfVxuICAgICAgICAgIGNsYXNzTmFtZT17d3JhcHBlckNsYXNzTmFtZX1cbiAgICAgICAgPlxuICAgICAgICAgIHsgY2hpbGRyZW4gfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvT3ZlcmxheVRyaWdnZXI+XG4gICAgKTtcbiAgfVxufVxuIl19