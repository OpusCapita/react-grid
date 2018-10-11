'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBootstrap = require('react-bootstrap');

var _reactIntl = require('react-intl');

var _datagrid = require('./datagrid.props');

require('./filtering-controls.component.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FilteringControls = (_temp2 = _class = function (_React$PureComponent) {
  _inherits(FilteringControls, _React$PureComponent);

  function FilteringControls() {
    var _temp, _this, _ret;

    _classCallCheck(this, FilteringControls);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.toggleFiltering = function () {
      _this.props.toggleFiltering(_this.props.grid);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  FilteringControls.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      { className: 'oc-datagrid-filtering-controls' },
      _react2.default.createElement(
        _reactBootstrap.Checkbox,
        {
          checked: this.props.isFiltering,
          disabled: this.props.isBusy || this.props.isCreating || this.props.isEditing,
          onChange: this.toggleFiltering,
          inline: true
        },
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Grid.ShowFilteringRow' })
      )
    );
  };

  return FilteringControls;
}(_react2.default.PureComponent), _class.defaultProps = {
  toggleFiltering: function toggleFiltering() {}
}, _temp2);
exports.default = FilteringControls;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9maWx0ZXJpbmctY29udHJvbHMuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJGaWx0ZXJpbmdDb250cm9scyIsInRvZ2dsZUZpbHRlcmluZyIsInByb3BzIiwiZ3JpZCIsInJlbmRlciIsImlzRmlsdGVyaW5nIiwiaXNCdXN5IiwiaXNDcmVhdGluZyIsImlzRWRpdGluZyIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztJQUVxQkEsaUI7Ozs7Ozs7Ozs7OztnS0FjbkJDLGUsR0FBa0IsWUFBTTtBQUN0QixZQUFLQyxLQUFMLENBQVdELGVBQVgsQ0FBMkIsTUFBS0MsS0FBTCxDQUFXQyxJQUF0QztBQUNELEs7Ozs4QkFFREMsTSxxQkFBUztBQUNQLFdBQ0U7QUFBQTtBQUFBLFFBQUssV0FBVSxnQ0FBZjtBQUNFO0FBQUMsZ0NBQUQ7QUFBQTtBQUNFLG1CQUFTLEtBQUtGLEtBQUwsQ0FBV0csV0FEdEI7QUFFRSxvQkFBVSxLQUFLSCxLQUFMLENBQVdJLE1BQVgsSUFBcUIsS0FBS0osS0FBTCxDQUFXSyxVQUFoQyxJQUE4QyxLQUFLTCxLQUFMLENBQVdNLFNBRnJFO0FBR0Usb0JBQVUsS0FBS1AsZUFIakI7QUFJRTtBQUpGO0FBTUUsc0NBQUMsMkJBQUQsSUFBRyxJQUFHLHVCQUFOO0FBTkY7QUFERixLQURGO0FBWUQsRzs7O0VBL0I0Q1EsZ0JBQU1DLGEsVUFVNUNDLFksR0FBZTtBQUNwQlYsbUJBQWlCLDJCQUFNLENBQUU7QUFETCxDO2tCQVZIRCxpQiIsImZpbGUiOiJmaWx0ZXJpbmctY29udHJvbHMuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBDaGVja2JveCB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlIGFzIE0gfSBmcm9tICdyZWFjdC1pbnRsJztcbmltcG9ydCB7IGdyaWRTaGFwZSB9IGZyb20gJy4vZGF0YWdyaWQucHJvcHMnO1xuaW1wb3J0ICcuL2ZpbHRlcmluZy1jb250cm9scy5jb21wb25lbnQuc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpbHRlcmluZ0NvbnRyb2xzIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgZ3JpZDogZ3JpZFNoYXBlLmlzUmVxdWlyZWQsXG4gICAgaXNCdXN5OiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGlzQ3JlYXRpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgaXNFZGl0aW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGlzRmlsdGVyaW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIHRvZ2dsZUZpbHRlcmluZzogUHJvcFR5cGVzLmZ1bmMsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICB0b2dnbGVGaWx0ZXJpbmc6ICgpID0+IHt9LFxuICB9O1xuXG4gIHRvZ2dsZUZpbHRlcmluZyA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLnRvZ2dsZUZpbHRlcmluZyh0aGlzLnByb3BzLmdyaWQpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWZpbHRlcmluZy1jb250cm9sc1wiPlxuICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICBjaGVja2VkPXt0aGlzLnByb3BzLmlzRmlsdGVyaW5nfVxuICAgICAgICAgIGRpc2FibGVkPXt0aGlzLnByb3BzLmlzQnVzeSB8fCB0aGlzLnByb3BzLmlzQ3JlYXRpbmcgfHwgdGhpcy5wcm9wcy5pc0VkaXRpbmd9XG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMudG9nZ2xlRmlsdGVyaW5nfVxuICAgICAgICAgIGlubGluZVxuICAgICAgICA+XG4gICAgICAgICAgPE0gaWQ9XCJHcmlkLlNob3dGaWx0ZXJpbmdSb3dcIiAvPlxuICAgICAgICA8L0NoZWNrYm94PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19