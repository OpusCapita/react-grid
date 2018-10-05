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
        { className: wrapperClassName },
        children
      )
    );
  };

  return DatagridTooltip;
}(_react2.default.Component), _class.propTypes = {
  id: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]).isRequired,
  children: _propTypes2.default.node,
  isEdited: _propTypes2.default.bool,
  isError: _propTypes2.default.bool,
  isWarning: _propTypes2.default.bool,
  infoMessage: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
    id: _propTypes2.default.string,
    values: _propTypes2.default.object
  })]),
  errorMessage: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
    id: _propTypes2.default.string,
    values: _propTypes2.default.object
  })]),
  warningMessage: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
    id: _propTypes2.default.string,
    values: _propTypes2.default.object
  })])
}, _class.defaultProps = {
  children: null,
  isEdited: false,
  isError: false,
  isWarning: false,
  infoMessage: null,
  errorMessage: null,
  warningMessage: null
}, _temp);
exports.default = DatagridTooltip;