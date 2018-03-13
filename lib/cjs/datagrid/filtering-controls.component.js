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
        _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'GridShowFilteringRow' })
      )
    );
  };

  return FilteringControls;
}(_react2.default.PureComponent), _class.defaultProps = {
  toggleFiltering: function toggleFiltering() {}
}, _temp2);
exports.default = FilteringControls;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9maWx0ZXJpbmctY29udHJvbHMuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJGaWx0ZXJpbmdDb250cm9scyIsInRvZ2dsZUZpbHRlcmluZyIsInByb3BzIiwiZ3JpZCIsInJlbmRlciIsImlzRmlsdGVyaW5nIiwiaXNCdXN5IiwiaXNDcmVhdGluZyIsImlzRWRpdGluZyIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7SUFFcUJBLGlCOzs7Ozs7Ozs7Ozs7Z0tBY25CQyxlLEdBQWtCLFlBQU07QUFDdEIsWUFBS0MsS0FBTCxDQUFXRCxlQUFYLENBQTJCLE1BQUtDLEtBQUwsQ0FBV0MsSUFBdEM7QUFDRCxLOzs7OEJBRURDLE0scUJBQVM7QUFDUCxXQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsZ0NBQWY7QUFDRTtBQUFBO0FBQUE7QUFDRSxtQkFBUyxLQUFLRixLQUFMLENBQVdHLFdBRHRCO0FBRUUsb0JBQVUsS0FBS0gsS0FBTCxDQUFXSSxNQUFYLElBQXFCLEtBQUtKLEtBQUwsQ0FBV0ssVUFBaEMsSUFBOEMsS0FBS0wsS0FBTCxDQUFXTSxTQUZyRTtBQUdFLG9CQUFVLEtBQUtQLGVBSGpCO0FBSUU7QUFKRjtBQU1FLHFFQUFHLElBQUcsc0JBQU47QUFORjtBQURGLEtBREY7QUFZRCxHOzs7RUEvQjRDLGdCQUFNUSxhLFVBVTVDQyxZLEdBQWU7QUFDcEJULG1CQUFpQiwyQkFBTSxDQUFFO0FBREwsQztrQkFWSEQsaUIiLCJmaWxlIjoiZmlsdGVyaW5nLWNvbnRyb2xzLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgQ2hlY2tib3ggfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IHsgRm9ybWF0dGVkTWVzc2FnZSBhcyBNIH0gZnJvbSAncmVhY3QtaW50bCc7XG5pbXBvcnQgeyBncmlkU2hhcGUgfSBmcm9tICcuL2RhdGFncmlkLnByb3BzJztcbmltcG9ydCAnLi9maWx0ZXJpbmctY29udHJvbHMuY29tcG9uZW50LnNjc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaWx0ZXJpbmdDb250cm9scyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGdyaWQ6IGdyaWRTaGFwZS5pc1JlcXVpcmVkLFxuICAgIGlzQnVzeTogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpc0NyZWF0aW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGlzRWRpdGluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpc0ZpbHRlcmluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICB0b2dnbGVGaWx0ZXJpbmc6IFByb3BUeXBlcy5mdW5jLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgdG9nZ2xlRmlsdGVyaW5nOiAoKSA9PiB7fSxcbiAgfTtcblxuICB0b2dnbGVGaWx0ZXJpbmcgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy50b2dnbGVGaWx0ZXJpbmcodGhpcy5wcm9wcy5ncmlkKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1maWx0ZXJpbmctY29udHJvbHNcIj5cbiAgICAgICAgPENoZWNrYm94XG4gICAgICAgICAgY2hlY2tlZD17dGhpcy5wcm9wcy5pc0ZpbHRlcmluZ31cbiAgICAgICAgICBkaXNhYmxlZD17dGhpcy5wcm9wcy5pc0J1c3kgfHwgdGhpcy5wcm9wcy5pc0NyZWF0aW5nIHx8IHRoaXMucHJvcHMuaXNFZGl0aW5nfVxuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLnRvZ2dsZUZpbHRlcmluZ31cbiAgICAgICAgICBpbmxpbmVcbiAgICAgICAgPlxuICAgICAgICAgIDxNIGlkPVwiR3JpZFNob3dGaWx0ZXJpbmdSb3dcIiAvPlxuICAgICAgICA8L0NoZWNrYm94PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19