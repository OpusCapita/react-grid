"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactBootstrap = require("react-bootstrap");

var _reactIntl = require("react-intl");

var _datagrid = require("./datagrid.props");

require("./filtering-controls.component.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FilteringControls =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(FilteringControls, _React$PureComponent);

  function FilteringControls() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "toggleFiltering", function () {
      _this.props.toggleFiltering(_this.props.grid);
    });

    return _this;
  }

  var _proto = FilteringControls.prototype;

  _proto.render = function render() {
    return _react["default"].createElement("div", {
      className: "oc-datagrid-filtering-controls"
    }, _react["default"].createElement(_reactBootstrap.Checkbox, {
      checked: this.props.isFiltering,
      disabled: this.props.isBusy || this.props.isCreating || this.props.isEditing,
      onChange: this.toggleFiltering,
      inline: true
    }, _react["default"].createElement(_reactIntl.FormattedMessage, {
      id: "Grid.ShowFilteringRow"
    })));
  };

  return FilteringControls;
}(_react["default"].PureComponent);

exports["default"] = FilteringControls;

_defineProperty(FilteringControls, "defaultProps", {
  toggleFiltering: function toggleFiltering() {}
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9maWx0ZXJpbmctY29udHJvbHMuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJGaWx0ZXJpbmdDb250cm9scyIsInByb3BzIiwidG9nZ2xlRmlsdGVyaW5nIiwiZ3JpZCIsInJlbmRlciIsImlzRmlsdGVyaW5nIiwiaXNCdXN5IiwiaXNDcmVhdGluZyIsImlzRWRpdGluZyIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztJQUVxQkEsaUI7Ozs7Ozs7Ozs7Ozs7O3NFQWNELFlBQU07QUFDdEIsWUFBS0MsS0FBTCxDQUFXQyxlQUFYLENBQTJCLE1BQUtELEtBQUwsQ0FBV0UsSUFBdEM7QUFDRCxLOzs7Ozs7O1NBRURDLE0sR0FBQSxrQkFBUztBQUNQLFdBQ0U7QUFBSyxNQUFBLFNBQVMsRUFBQztBQUFmLE9BQ0UsZ0NBQUMsd0JBQUQ7QUFDRSxNQUFBLE9BQU8sRUFBRSxLQUFLSCxLQUFMLENBQVdJLFdBRHRCO0FBRUUsTUFBQSxRQUFRLEVBQUUsS0FBS0osS0FBTCxDQUFXSyxNQUFYLElBQXFCLEtBQUtMLEtBQUwsQ0FBV00sVUFBaEMsSUFBOEMsS0FBS04sS0FBTCxDQUFXTyxTQUZyRTtBQUdFLE1BQUEsUUFBUSxFQUFFLEtBQUtOLGVBSGpCO0FBSUUsTUFBQSxNQUFNO0FBSlIsT0FNRSxnQ0FBQywyQkFBRDtBQUFHLE1BQUEsRUFBRSxFQUFDO0FBQU4sTUFORixDQURGLENBREY7QUFZRCxHOzs7RUEvQjRDTyxrQkFBTUMsYTs7OztnQkFBaENWLGlCLGtCQVVHO0FBQ3BCRSxFQUFBQSxlQUFlLEVBQUUsMkJBQU0sQ0FBRTtBQURMLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IENoZWNrYm94IH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgYXMgTSB9IGZyb20gJ3JlYWN0LWludGwnO1xuaW1wb3J0IHsgZ3JpZFNoYXBlIH0gZnJvbSAnLi9kYXRhZ3JpZC5wcm9wcyc7XG5pbXBvcnQgJy4vZmlsdGVyaW5nLWNvbnRyb2xzLmNvbXBvbmVudC5zY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmlsdGVyaW5nQ29udHJvbHMgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBncmlkOiBncmlkU2hhcGUuaXNSZXF1aXJlZCxcbiAgICBpc0J1c3k6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgaXNDcmVhdGluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpc0VkaXRpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgaXNGaWx0ZXJpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgdG9nZ2xlRmlsdGVyaW5nOiBQcm9wVHlwZXMuZnVuYyxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIHRvZ2dsZUZpbHRlcmluZzogKCkgPT4ge30sXG4gIH07XG5cbiAgdG9nZ2xlRmlsdGVyaW5nID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMudG9nZ2xlRmlsdGVyaW5nKHRoaXMucHJvcHMuZ3JpZCk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWZpbHRlcmluZy1jb250cm9sc1wiPlxuICAgICAgICA8Q2hlY2tib3hcbiAgICAgICAgICBjaGVja2VkPXt0aGlzLnByb3BzLmlzRmlsdGVyaW5nfVxuICAgICAgICAgIGRpc2FibGVkPXt0aGlzLnByb3BzLmlzQnVzeSB8fCB0aGlzLnByb3BzLmlzQ3JlYXRpbmcgfHwgdGhpcy5wcm9wcy5pc0VkaXRpbmd9XG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMudG9nZ2xlRmlsdGVyaW5nfVxuICAgICAgICAgIGlubGluZVxuICAgICAgICA+XG4gICAgICAgICAgPE0gaWQ9XCJHcmlkLlNob3dGaWx0ZXJpbmdSb3dcIiAvPlxuICAgICAgICA8L0NoZWNrYm94PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19