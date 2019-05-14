"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDom = require("react-dom");

var _fixedDataTable = require("fixed-data-table-2");

var _debounce = _interopRequireDefault(require("lodash/debounce"));

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialPixels = 1;

var ResponsiveFixedDataTable =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ResponsiveFixedDataTable, _React$Component);

  function ResponsiveFixedDataTable() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      gridWidth: initialPixels,
      gridHeight: initialPixels
    });

    _defineProperty(_assertThisInitialized(_this), "setDimensionsOnState", function () {
      if (_this.isComponentMounted) {
        var _findDOMNode = (0, _reactDom.findDOMNode)(_assertThisInitialized(_this)),
            offsetWidth = _findDOMNode.offsetWidth,
            offsetHeight = _findDOMNode.offsetHeight;

        _this.setState({
          gridWidth: offsetWidth || initialPixels,
          gridHeight: offsetHeight || initialPixels
        });
      }
    });

    return _this;
  }

  var _proto = ResponsiveFixedDataTable.prototype;

  _proto.componentWillMount = function componentWillMount() {
    var refreshRate = this.props.refreshRate;
    this.setDimensionsOnState = (0, _debounce["default"])(this.setDimensionsOnState, refreshRate);
  };

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    this.isComponentMounted = true;
    this.setDimensionsOnState();
    this.attachResizeEvent();
    window.setTimeout(function () {
      return _this2.setDimensionsOnState();
    }, 500);
  };

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    return !(0, _isEqual["default"])(this.props, nextProps) || !(0, _isEqual["default"])(this.state, nextState);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.isComponentMounted = false;
    window.removeEventListener('resize', this.setDimensionsOnState);
  };

  _proto.getStyle = function getStyle() {
    return _extends({}, this.props.containerStyle, {
      width: '100%',
      height: '100%',
      overflow: 'hidden'
    });
  };

  _proto.attachResizeEvent = function attachResizeEvent() {
    if (window.addEventListener) {
      window.addEventListener('resize', this.setDimensionsOnState, false);
    } else if (window.attachEvent) {
      window.attachEvent('resize', this.setDimensionsOnState);
    } else {
      window.onresize = this.setDimensionsOnState;
    }
  };

  _proto.render = function render() {
    var _this$state = this.state,
        gridWidth = _this$state.gridWidth,
        gridHeight = _this$state.gridHeight;
    return _react["default"].createElement("div", {
      className: "oc-datagrid-main-container",
      style: this.getStyle()
    }, _react["default"].createElement(_fixedDataTable.Table, _extends({}, this.props, {
      width: gridWidth,
      height: gridHeight
    })));
  };

  return ResponsiveFixedDataTable;
}(_react["default"].Component);

exports["default"] = ResponsiveFixedDataTable;

_defineProperty(ResponsiveFixedDataTable, "defaultProps", {
  containerStyle: {},
  refreshRate: 250 // ms

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9yZXNwb25zaXZlLWZpeGVkLWRhdGEtdGFibGUuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJpbml0aWFsUGl4ZWxzIiwiUmVzcG9uc2l2ZUZpeGVkRGF0YVRhYmxlIiwiZ3JpZFdpZHRoIiwiZ3JpZEhlaWdodCIsImlzQ29tcG9uZW50TW91bnRlZCIsIm9mZnNldFdpZHRoIiwib2Zmc2V0SGVpZ2h0Iiwic2V0U3RhdGUiLCJjb21wb25lbnRXaWxsTW91bnQiLCJyZWZyZXNoUmF0ZSIsInByb3BzIiwic2V0RGltZW5zaW9uc09uU3RhdGUiLCJjb21wb25lbnREaWRNb3VudCIsImF0dGFjaFJlc2l6ZUV2ZW50Iiwid2luZG93Iiwic2V0VGltZW91dCIsInNob3VsZENvbXBvbmVudFVwZGF0ZSIsIm5leHRQcm9wcyIsIm5leHRTdGF0ZSIsInN0YXRlIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZ2V0U3R5bGUiLCJjb250YWluZXJTdHlsZSIsIndpZHRoIiwiaGVpZ2h0Iiwib3ZlcmZsb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiYXR0YWNoRXZlbnQiLCJvbnJlc2l6ZSIsInJlbmRlciIsIlJlYWN0IiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxhQUFhLEdBQUcsQ0FBdEI7O0lBRXFCQyx3Qjs7Ozs7Ozs7Ozs7Ozs7NERBV1g7QUFDTkMsTUFBQUEsU0FBUyxFQUFFRixhQURMO0FBRU5HLE1BQUFBLFVBQVUsRUFBRUg7QUFGTixLOzsyRUEwQmUsWUFBTTtBQUMzQixVQUFJLE1BQUtJLGtCQUFULEVBQTZCO0FBQUEsMkJBQ1cseURBRFg7QUFBQSxZQUNuQkMsV0FEbUIsZ0JBQ25CQSxXQURtQjtBQUFBLFlBQ05DLFlBRE0sZ0JBQ05BLFlBRE07O0FBRTNCLGNBQUtDLFFBQUwsQ0FBYztBQUNaTCxVQUFBQSxTQUFTLEVBQUVHLFdBQVcsSUFBSUwsYUFEZDtBQUVaRyxVQUFBQSxVQUFVLEVBQUVHLFlBQVksSUFBSU47QUFGaEIsU0FBZDtBQUlEO0FBQ0YsSzs7Ozs7OztTQTdCRFEsa0IsR0FBQSw4QkFBcUI7QUFBQSxRQUNYQyxXQURXLEdBQ0ssS0FBS0MsS0FEVixDQUNYRCxXQURXO0FBRW5CLFNBQUtFLG9CQUFMLEdBQTRCLDBCQUFTLEtBQUtBLG9CQUFkLEVBQW9DRixXQUFwQyxDQUE1QjtBQUNELEc7O1NBRURHLGlCLEdBQUEsNkJBQW9CO0FBQUE7O0FBQ2xCLFNBQUtSLGtCQUFMLEdBQTBCLElBQTFCO0FBQ0EsU0FBS08sb0JBQUw7QUFDQSxTQUFLRSxpQkFBTDtBQUNBQyxJQUFBQSxNQUFNLENBQUNDLFVBQVAsQ0FBa0I7QUFBQSxhQUFNLE1BQUksQ0FBQ0osb0JBQUwsRUFBTjtBQUFBLEtBQWxCLEVBQXFELEdBQXJEO0FBQ0QsRzs7U0FFREsscUIsR0FBQSwrQkFBc0JDLFNBQXRCLEVBQWlDQyxTQUFqQyxFQUE0QztBQUMxQyxXQUFPLENBQUMseUJBQVEsS0FBS1IsS0FBYixFQUFvQk8sU0FBcEIsQ0FBRCxJQUFtQyxDQUFDLHlCQUFRLEtBQUtFLEtBQWIsRUFBb0JELFNBQXBCLENBQTNDO0FBQ0QsRzs7U0FFREUsb0IsR0FBQSxnQ0FBdUI7QUFDckIsU0FBS2hCLGtCQUFMLEdBQTBCLEtBQTFCO0FBQ0FVLElBQUFBLE1BQU0sQ0FBQ08sbUJBQVAsQ0FBMkIsUUFBM0IsRUFBcUMsS0FBS1Ysb0JBQTFDO0FBQ0QsRzs7U0FZRFcsUSxHQUFBLG9CQUFXO0FBQ1Qsd0JBQ0ssS0FBS1osS0FBTCxDQUFXYSxjQURoQjtBQUVFQyxNQUFBQSxLQUFLLEVBQUUsTUFGVDtBQUdFQyxNQUFBQSxNQUFNLEVBQUUsTUFIVjtBQUlFQyxNQUFBQSxRQUFRLEVBQUU7QUFKWjtBQU1ELEc7O1NBRURiLGlCLEdBQUEsNkJBQW9CO0FBQ2xCLFFBQUlDLE1BQU0sQ0FBQ2EsZ0JBQVgsRUFBNkI7QUFDM0JiLE1BQUFBLE1BQU0sQ0FBQ2EsZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsS0FBS2hCLG9CQUF2QyxFQUE2RCxLQUE3RDtBQUNELEtBRkQsTUFFTyxJQUFJRyxNQUFNLENBQUNjLFdBQVgsRUFBd0I7QUFDN0JkLE1BQUFBLE1BQU0sQ0FBQ2MsV0FBUCxDQUFtQixRQUFuQixFQUE2QixLQUFLakIsb0JBQWxDO0FBQ0QsS0FGTSxNQUVBO0FBQ0xHLE1BQUFBLE1BQU0sQ0FBQ2UsUUFBUCxHQUFrQixLQUFLbEIsb0JBQXZCO0FBQ0Q7QUFDRixHOztTQUVEbUIsTSxHQUFBLGtCQUFTO0FBQUEsc0JBQzJCLEtBQUtYLEtBRGhDO0FBQUEsUUFDQ2pCLFNBREQsZUFDQ0EsU0FERDtBQUFBLFFBQ1lDLFVBRFosZUFDWUEsVUFEWjtBQUdQLFdBQ0U7QUFBSyxNQUFBLFNBQVMsRUFBQyw0QkFBZjtBQUE0QyxNQUFBLEtBQUssRUFBRSxLQUFLbUIsUUFBTDtBQUFuRCxPQUNFLGdDQUFDLHFCQUFELGVBQVcsS0FBS1osS0FBaEI7QUFBdUIsTUFBQSxLQUFLLEVBQUVSLFNBQTlCO0FBQXlDLE1BQUEsTUFBTSxFQUFFQztBQUFqRCxPQURGLENBREY7QUFLRCxHOzs7RUExRW1ENEIsa0JBQU1DLFM7Ozs7Z0JBQXZDL0Isd0Isa0JBTUc7QUFDcEJzQixFQUFBQSxjQUFjLEVBQUUsRUFESTtBQUVwQmQsRUFBQUEsV0FBVyxFQUFFLEdBRk8sQ0FFRjs7QUFGRSxDIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3QvZm9yYmlkLXByb3AtdHlwZXMsIHJlYWN0L25vLWZpbmQtZG9tLW5vZGUgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgZmluZERPTU5vZGUgfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHsgVGFibGUgfSBmcm9tICdmaXhlZC1kYXRhLXRhYmxlLTInO1xuaW1wb3J0IGRlYm91bmNlIGZyb20gJ2xvZGFzaC9kZWJvdW5jZSc7XG5pbXBvcnQgaXNFcXVhbCBmcm9tICdsb2Rhc2gvaXNFcXVhbCc7XG5cbmNvbnN0IGluaXRpYWxQaXhlbHMgPSAxO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXNwb25zaXZlRml4ZWREYXRhVGFibGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGNvbnRhaW5lclN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIHJlZnJlc2hSYXRlOiBQcm9wVHlwZXMubnVtYmVyLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgY29udGFpbmVyU3R5bGU6IHt9LFxuICAgIHJlZnJlc2hSYXRlOiAyNTAsIC8vIG1zXG4gIH07XG5cbiAgc3RhdGUgPSB7XG4gICAgZ3JpZFdpZHRoOiBpbml0aWFsUGl4ZWxzLFxuICAgIGdyaWRIZWlnaHQ6IGluaXRpYWxQaXhlbHMsXG4gIH07XG5cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIGNvbnN0IHsgcmVmcmVzaFJhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgdGhpcy5zZXREaW1lbnNpb25zT25TdGF0ZSA9IGRlYm91bmNlKHRoaXMuc2V0RGltZW5zaW9uc09uU3RhdGUsIHJlZnJlc2hSYXRlKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuaXNDb21wb25lbnRNb3VudGVkID0gdHJ1ZTtcbiAgICB0aGlzLnNldERpbWVuc2lvbnNPblN0YXRlKCk7XG4gICAgdGhpcy5hdHRhY2hSZXNpemVFdmVudCgpO1xuICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHRoaXMuc2V0RGltZW5zaW9uc09uU3RhdGUoKSwgNTAwKTtcbiAgfVxuXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgIHJldHVybiAhaXNFcXVhbCh0aGlzLnByb3BzLCBuZXh0UHJvcHMpIHx8ICFpc0VxdWFsKHRoaXMuc3RhdGUsIG5leHRTdGF0ZSk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLmlzQ29tcG9uZW50TW91bnRlZCA9IGZhbHNlO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnNldERpbWVuc2lvbnNPblN0YXRlKTtcbiAgfVxuXG4gIHNldERpbWVuc2lvbnNPblN0YXRlID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLmlzQ29tcG9uZW50TW91bnRlZCkge1xuICAgICAgY29uc3QgeyBvZmZzZXRXaWR0aCwgb2Zmc2V0SGVpZ2h0IH0gPSBmaW5kRE9NTm9kZSh0aGlzKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBncmlkV2lkdGg6IG9mZnNldFdpZHRoIHx8IGluaXRpYWxQaXhlbHMsXG4gICAgICAgIGdyaWRIZWlnaHQ6IG9mZnNldEhlaWdodCB8fCBpbml0aWFsUGl4ZWxzLFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGdldFN0eWxlKCkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi50aGlzLnByb3BzLmNvbnRhaW5lclN0eWxlLFxuICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgIH07XG4gIH1cblxuICBhdHRhY2hSZXNpemVFdmVudCgpIHtcbiAgICBpZiAod2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnNldERpbWVuc2lvbnNPblN0YXRlLCBmYWxzZSk7XG4gICAgfSBlbHNlIGlmICh3aW5kb3cuYXR0YWNoRXZlbnQpIHtcbiAgICAgIHdpbmRvdy5hdHRhY2hFdmVudCgncmVzaXplJywgdGhpcy5zZXREaW1lbnNpb25zT25TdGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5vbnJlc2l6ZSA9IHRoaXMuc2V0RGltZW5zaW9uc09uU3RhdGU7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgZ3JpZFdpZHRoLCBncmlkSGVpZ2h0IH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtbWFpbi1jb250YWluZXJcIiBzdHlsZT17dGhpcy5nZXRTdHlsZSgpfT5cbiAgICAgICAgPFRhYmxlIHsuLi50aGlzLnByb3BzfSB3aWR0aD17Z3JpZFdpZHRofSBoZWlnaHQ9e2dyaWRIZWlnaHR9IC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=