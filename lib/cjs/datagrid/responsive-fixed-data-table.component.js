"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));

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
    var _this$props = this.props,
        filterData = _this$props.filterData,
        page = _this$props.page,
        pagination = _this$props.pagination,
        rowsOnPage = _this$props.rowsOnPage,
        sortColumn = _this$props.sortColumn,
        sortOrder = _this$props.sortOrder;
    var prevFilterData = nextProps.filterData,
        prevPage = nextProps.page,
        prevRowsOnPage = nextProps.rowsOnPage,
        nextSortColumn = nextProps.sortColumn,
        nextSortOrder = nextProps.sortOrder;

    if (pagination && (sortColumn !== nextSortColumn || sortOrder !== nextSortOrder || filterData && !filterData.equals(prevFilterData) || page !== prevPage || rowsOnPage !== prevRowsOnPage)) {
      return false;
    }

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
  refreshRate: 250,
  // ms
  filterData: undefined,
  page: undefined,
  pagination: undefined,
  rowsOnPage: undefined,
  sortColumn: undefined,
  sortOrder: undefined
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9yZXNwb25zaXZlLWZpeGVkLWRhdGEtdGFibGUuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJpbml0aWFsUGl4ZWxzIiwiUmVzcG9uc2l2ZUZpeGVkRGF0YVRhYmxlIiwiZ3JpZFdpZHRoIiwiZ3JpZEhlaWdodCIsImlzQ29tcG9uZW50TW91bnRlZCIsIm9mZnNldFdpZHRoIiwib2Zmc2V0SGVpZ2h0Iiwic2V0U3RhdGUiLCJjb21wb25lbnRXaWxsTW91bnQiLCJyZWZyZXNoUmF0ZSIsInByb3BzIiwic2V0RGltZW5zaW9uc09uU3RhdGUiLCJjb21wb25lbnREaWRNb3VudCIsImF0dGFjaFJlc2l6ZUV2ZW50Iiwid2luZG93Iiwic2V0VGltZW91dCIsInNob3VsZENvbXBvbmVudFVwZGF0ZSIsIm5leHRQcm9wcyIsIm5leHRTdGF0ZSIsImZpbHRlckRhdGEiLCJwYWdlIiwicGFnaW5hdGlvbiIsInJvd3NPblBhZ2UiLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwicHJldkZpbHRlckRhdGEiLCJwcmV2UGFnZSIsInByZXZSb3dzT25QYWdlIiwibmV4dFNvcnRDb2x1bW4iLCJuZXh0U29ydE9yZGVyIiwiZXF1YWxzIiwic3RhdGUiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJnZXRTdHlsZSIsImNvbnRhaW5lclN0eWxlIiwid2lkdGgiLCJoZWlnaHQiLCJvdmVyZmxvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJhdHRhY2hFdmVudCIsIm9ucmVzaXplIiwicmVuZGVyIiwiUmVhY3QiLCJDb21wb25lbnQiLCJ1bmRlZmluZWQiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLGFBQWEsR0FBRyxDQUF0Qjs7SUFFcUJDLHdCOzs7Ozs7Ozs7Ozs7Ozs0REF1Qlg7QUFDTkMsTUFBQUEsU0FB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QUVPLElBQUlHLE1BQU0sQ0FBQzBCLFdBQVgsRUFBd0I7QUFDN0IxQixNQUFBQSxNQUFNLENBQUMwQixXQUFQLENBQW1CLFFBQW5CLEVBQTZCLEtBQUs3QixvQkFBbEM7QUFDRCxLQUZNLE1BRUE7QUFDTEcsTUFBQUEsTUFBTSxDQUFDMkIsUUFBUCxHQUFrQixLQUFLOUIsb0JBQXZCO0FBQ0Q7QUFDRixHOztTQUVEK0IsTSxHQUFBLGtCQUFTO0FBQUEsc0JBQzJCLEtBQUtYLEtBRGhDO0FBQUEsUUFDQzdCLFNBREQsZUFDQ0EsU0FERDtBQUFBLFFBQ1lDLFVBRFosZUFDWUEsVUFEWjtBQUdQLFdBQ0U7QUFBSyxNQUFBLFNBQVMsRUFBQyw0QkFBZjtBQUE0QyxNQUFBLEtBQUssRUFBRSxLQUFLK0IsUUFBTDtBQUFuRCxPQUNFLGdDQUFDLHFCQUFELGVBQVcsS0FBS3hCLEtBQWhCO0FBQXVCLE1BQUEsS0FBSyxFQUFFUixTQUE5QjtBQUF5QyxNQUFBLE1BQU0sRUFBRUM7QUFBakQsT0FERixDQURGO0FBS0QsRzs7O0VBNUdtRHdDLGtCQUFNQyxTOzs7O2dCQUF2QzNDLHdCLGtCQVlHO0FBQ3BCa0MsRUFBQUEsY0FBYyxFQUFFLEVBREk7QUFFcEIxQixFQUFBQSxXQUFXLEVBQUUsR0FGTztBQUVGO0FBQ2xCVSxFQUFBQSxVQUFVLEVBQUUwQixTQUhRO0FBSXBCekIsRUFBQUEsSUFBSSxFQUFFeUIsU0FKYztBQUtwQnhCLEVBQUFBLFVBQVUsRUFBRXdCLFNBTFE7QUFNcEJ2QixFQUFBQSxVQUFVLEVBQUV1QixTQU5RO0FBT3BCdEIsRUFBQUEsVUFBVSxFQUFFc0IsU0FQUTtBQVFwQnJCLEVBQUFBLFNBQVMsRUFBRXFCO0FBUlMsQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L2ZvcmJpZC1wcm9wLXR5cGVzLCByZWFjdC9uby1maW5kLWRvbS1ub2RlICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgeyBmaW5kRE9NTm9kZSB9IGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgeyBUYWJsZSB9IGZyb20gJ2ZpeGVkLWRhdGEtdGFibGUtMic7XG5pbXBvcnQgZGVib3VuY2UgZnJvbSAnbG9kYXNoL2RlYm91bmNlJztcbmltcG9ydCBpc0VxdWFsIGZyb20gJ2xvZGFzaC9pc0VxdWFsJztcblxuY29uc3QgaW5pdGlhbFBpeGVscyA9IDE7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc3BvbnNpdmVGaXhlZERhdGFUYWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgY29udGFpbmVyU3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgcmVmcmVzaFJhdGU6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgZmlsdGVyRGF0YTogSW1tdXRhYmxlUHJvcFR5cGVzLm1hcCxcbiAgICBwYWdlOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHBhZ2luYXRpb246IFByb3BUeXBlcy5zaGFwZSh7fSksXG4gICAgcm93c09uUGFnZTogUHJvcFR5cGVzLm51bWJlcixcbiAgICBzb3J0Q29sdW1uOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubnVtYmVyXSksXG4gICAgc29ydE9yZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgY29udGFpbmVyU3R5bGU6IHt9LFxuICAgIHJlZnJlc2hSYXRlOiAyNTAsIC8vIG1zXG4gICAgZmlsdGVyRGF0YTogdW5kZWZpbmVkLFxuICAgIHBhZ2U6IHVuZGVmaW5lZCxcbiAgICBwYWdpbmF0aW9uOiB1bmRlZmluZWQsXG4gICAgcm93c09uUGFnZTogdW5kZWZpbmVkLFxuICAgIHNvcnRDb2x1bW46IHVuZGVmaW5lZCxcbiAgICBzb3J0T3JkZXI6IHVuZGVmaW5lZCxcbiAgfTtcblxuICBzdGF0ZSA9IHtcbiAgICBncmlkV2lkdGg6IGluaXRpYWxQaXhlbHMsXG4gICAgZ3JpZEhlaWdodDogaW5pdGlhbFBpeGVscyxcbiAgfTtcblxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgY29uc3QgeyByZWZyZXNoUmF0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICB0aGlzLnNldERpbWVuc2lvbnNPblN0YXRlID0gZGVib3VuY2UodGhpcy5zZXREaW1lbnNpb25zT25TdGF0ZSwgcmVmcmVzaFJhdGUpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5pc0NvbXBvbmVudE1vdW50ZWQgPSB0cnVlO1xuICAgIHRoaXMuc2V0RGltZW5zaW9uc09uU3RhdGUoKTtcbiAgICB0aGlzLmF0dGFjaFJlc2l6ZUV2ZW50KCk7XG4gICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4gdGhpcy5zZXREaW1lbnNpb25zT25TdGF0ZSgpLCA1MDApO1xuICB9XG5cbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgY29uc3Qge1xuICAgICAgZmlsdGVyRGF0YSxcbiAgICAgIHBhZ2UsXG4gICAgICBwYWdpbmF0aW9uLFxuICAgICAgcm93c09uUGFnZSxcbiAgICAgIHNvcnRDb2x1bW4sXG4gICAgICBzb3J0T3JkZXIsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge1xuICAgICAgZmlsdGVyRGF0YTogcHJldkZpbHRlckRhdGEsXG4gICAgICBwYWdlOiBwcmV2UGFnZSxcbiAgICAgIHJvd3NPblBhZ2U6IHByZXZSb3dzT25QYWdlLFxuICAgICAgc29ydENvbHVtbjogbmV4dFNvcnRDb2x1bW4sXG4gICAgICBzb3J0T3JkZXI6IG5leHRTb3J0T3JkZXIsXG4gICAgfSA9IG5leHRQcm9wcztcbiAgICBpZiAocGFnaW5hdGlvbiAmJiAoc29ydENvbHVtbiAhPT0gbmV4dFNvcnRDb2x1bW5cbiAgICAgIHx8IHNvcnRPcmRlciAhPT0gbmV4dFNvcnRPcmRlclxuICAgICAgfHwgKGZpbHRlckRhdGEgJiYgIWZpbHRlckRhdGEuZXF1YWxzKHByZXZGaWx0ZXJEYXRhKSlcbiAgICAgIHx8IHBhZ2UgIT09IHByZXZQYWdlXG4gICAgICB8fCByb3dzT25QYWdlICE9PSBwcmV2Um93c09uUGFnZSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuICFpc0VxdWFsKHRoaXMucHJvcHMsIG5leHRQcm9wcykgfHwgIWlzRXF1YWwodGhpcy5zdGF0ZSwgbmV4dFN0YXRlKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMuaXNDb21wb25lbnRNb3VudGVkID0gZmFsc2U7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuc2V0RGltZW5zaW9uc09uU3RhdGUpO1xuICB9XG5cbiAgc2V0RGltZW5zaW9uc09uU3RhdGUgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuaXNDb21wb25lbnRNb3VudGVkKSB7XG4gICAgICBjb25zdCB7IG9mZnNldFdpZHRoLCBvZmZzZXRIZWlnaHQgfSA9IGZpbmRET01Ob2RlKHRoaXMpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGdyaWRXaWR0aDogb2Zmc2V0V2lkdGggfHwgaW5pdGlhbFBpeGVscyxcbiAgICAgICAgZ3JpZEhlaWdodDogb2Zmc2V0SGVpZ2h0IHx8IGluaXRpYWxQaXhlbHMsXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgZ2V0U3R5bGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnRoaXMucHJvcHMuY29udGFpbmVyU3R5bGUsXG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgfTtcbiAgfVxuXG4gIGF0dGFjaFJlc2l6ZUV2ZW50KCkge1xuICAgIGlmICh3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuc2V0RGltZW5zaW9uc09uU3RhdGUsIGZhbHNlKTtcbiAgICB9IGVsc2UgaWYgKHdpbmRvdy5hdHRhY2hFdmVudCkge1xuICAgICAgd2luZG93LmF0dGFjaEV2ZW50KCdyZXNpemUnLCB0aGlzLnNldERpbWVuc2lvbnNPblN0YXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93Lm9ucmVzaXplID0gdGhpcy5zZXREaW1lbnNpb25zT25TdGF0ZTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBncmlkV2lkdGgsIGdyaWRIZWlnaHQgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1tYWluLWNvbnRhaW5lclwiIHN0eWxlPXt0aGlzLmdldFN0eWxlKCl9PlxuICAgICAgICA8VGFibGUgey4uLnRoaXMucHJvcHN9IHdpZHRoPXtncmlkV2lkdGh9IGhlaWdodD17Z3JpZEhlaWdodH0gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==