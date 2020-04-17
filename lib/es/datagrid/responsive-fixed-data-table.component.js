function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable react/forbid-prop-types, react/no-find-dom-node */
import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { findDOMNode } from 'react-dom';
import { Table } from 'fixed-data-table-2';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
var initialPixels = 1;

var ResponsiveFixedDataTable = /*#__PURE__*/function (_React$Component) {
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
        var _findDOMNode = findDOMNode(_assertThisInitialized(_this)),
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
    this.setDimensionsOnState = debounce(this.setDimensionsOnState, refreshRate);
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

    return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState);
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
    return /*#__PURE__*/React.createElement("div", {
      className: "oc-datagrid-main-container",
      style: this.getStyle()
    }, /*#__PURE__*/React.createElement(Table, _extends({}, this.props, {
      width: gridWidth,
      height: gridHeight
    })));
  };

  return ResponsiveFixedDataTable;
}(React.Component);

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

export { ResponsiveFixedDataTable as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9yZXNwb25zaXZlLWZpeGVkLWRhdGEtdGFibGUuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsIkltbXV0YWJsZVByb3BUeXBlcyIsImZpbmRET01Ob2RlIiwiVGFibGUiLCJkZWJvdW5jZSIsImlzRXF1YWwiLCJpbml0aWFsUGl4ZWxzIiwiUmVzcG9uc2l2ZUZpeGVkRGF0YVRhYmxlIiwiZ3JpZFdpZHRoIiwiZ3JpZEhlaWdodCIsImlzQ29tcG9uZW50TW91bnRlZCIsIm9mZnNldFdpZHRoIiwib2Zmc2V0SGVpZ2h0Iiwic2V0U3RhdGUiLCJjb21wb25lbnRXaWxsTW91bnQiLCJyZWZyZXNoUmF0ZSIsInByb3BzIiwic2V0RGltZW5zaW9uc09uU3RhdGUiLCJjb21wb25lbnREaWRNb3VudCIsImF0dGFjaFJlc2l6ZUV2ZW50Iiwid2luZG93Iiwic2V0VGltZW91dCIsInNob3VsZENvbXBvbmVudFVwZGF0ZSIsIm5leHRQcm9wcyIsIm5leHRTdGF0ZSIsImZpbHRlckRhdGEiLCJwYWdlIiwicGFnaW5hdGlvbiIsInJvd3NPblBhZ2UiLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwicHJldkZpbHRlckRhdGEiLCJwcmV2UGFnZSIsInByZXZSb3dzT25QYWdlIiwibmV4dFNvcnRDb2x1bW4iLCJuZXh0U29ydE9yZGVyIiwiZXF1YWxzIiwic3RhdGUiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJnZXRTdHlsZSIsImNvbnRhaW5lclN0eWxlIiwid2lkdGgiLCJoZWlnaHQiLCJvdmVyZmxvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJhdHRhY2hFdmVudCIsIm9ucmVzaXplIiwicmVuZGVyIiwiQ29tcG9uZW50IiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0EsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNB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U0FMUTtBQU1wQnRCLEVBQUFBLFVBQVUsRUFBRXNCLFNBTlE7QUFPcEJyQixFQUFBQSxVQUFVLEVBQUVxQixTQVBRO0FBUXBCcEIsRUFBQUEsU0FBUyxFQUFFb0I7QUFSUyxDOztTQVpIM0Msd0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9mb3JiaWQtcHJvcC10eXBlcywgcmVhY3Qvbm8tZmluZC1kb20tbm9kZSAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgSW1tdXRhYmxlUHJvcFR5cGVzIGZyb20gJ3JlYWN0LWltbXV0YWJsZS1wcm9wdHlwZXMnO1xuaW1wb3J0IHsgZmluZERPTU5vZGUgfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHsgVGFibGUgfSBmcm9tICdmaXhlZC1kYXRhLXRhYmxlLTInO1xuaW1wb3J0IGRlYm91bmNlIGZyb20gJ2xvZGFzaC9kZWJvdW5jZSc7XG5pbXBvcnQgaXNFcXVhbCBmcm9tICdsb2Rhc2gvaXNFcXVhbCc7XG5cbmNvbnN0IGluaXRpYWxQaXhlbHMgPSAxO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXNwb25zaXZlRml4ZWREYXRhVGFibGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGNvbnRhaW5lclN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIHJlZnJlc2hSYXRlOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGZpbHRlckRhdGE6IEltbXV0YWJsZVByb3BUeXBlcy5tYXAsXG4gICAgcGFnZTogUHJvcFR5cGVzLm51bWJlcixcbiAgICBwYWdpbmF0aW9uOiBQcm9wVHlwZXMuc2hhcGUoe30pLFxuICAgIHJvd3NPblBhZ2U6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgc29ydENvbHVtbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm51bWJlcl0pLFxuICAgIHNvcnRPcmRlcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGNvbnRhaW5lclN0eWxlOiB7fSxcbiAgICByZWZyZXNoUmF0ZTogMjUwLCAvLyBtc1xuICAgIGZpbHRlckRhdGE6IHVuZGVmaW5lZCxcbiAgICBwYWdlOiB1bmRlZmluZWQsXG4gICAgcGFnaW5hdGlvbjogdW5kZWZpbmVkLFxuICAgIHJvd3NPblBhZ2U6IHVuZGVmaW5lZCxcbiAgICBzb3J0Q29sdW1uOiB1bmRlZmluZWQsXG4gICAgc29ydE9yZGVyOiB1bmRlZmluZWQsXG4gIH07XG5cbiAgc3RhdGUgPSB7XG4gICAgZ3JpZFdpZHRoOiBpbml0aWFsUGl4ZWxzLFxuICAgIGdyaWRIZWlnaHQ6IGluaXRpYWxQaXhlbHMsXG4gIH07XG5cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIGNvbnN0IHsgcmVmcmVzaFJhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgdGhpcy5zZXREaW1lbnNpb25zT25TdGF0ZSA9IGRlYm91bmNlKHRoaXMuc2V0RGltZW5zaW9uc09uU3RhdGUsIHJlZnJlc2hSYXRlKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuaXNDb21wb25lbnRNb3VudGVkID0gdHJ1ZTtcbiAgICB0aGlzLnNldERpbWVuc2lvbnNPblN0YXRlKCk7XG4gICAgdGhpcy5hdHRhY2hSZXNpemVFdmVudCgpO1xuICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHRoaXMuc2V0RGltZW5zaW9uc09uU3RhdGUoKSwgNTAwKTtcbiAgfVxuXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgIGNvbnN0IHtcbiAgICAgIGZpbHRlckRhdGEsXG4gICAgICBwYWdlLFxuICAgICAgcGFnaW5hdGlvbixcbiAgICAgIHJvd3NPblBhZ2UsXG4gICAgICBzb3J0Q29sdW1uLFxuICAgICAgc29ydE9yZGVyLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHtcbiAgICAgIGZpbHRlckRhdGE6IHByZXZGaWx0ZXJEYXRhLFxuICAgICAgcGFnZTogcHJldlBhZ2UsXG4gICAgICByb3dzT25QYWdlOiBwcmV2Um93c09uUGFnZSxcbiAgICAgIHNvcnRDb2x1bW46IG5leHRTb3J0Q29sdW1uLFxuICAgICAgc29ydE9yZGVyOiBuZXh0U29ydE9yZGVyLFxuICAgIH0gPSBuZXh0UHJvcHM7XG4gICAgaWYgKHBhZ2luYXRpb24gJiYgKHNvcnRDb2x1bW4gIT09IG5leHRTb3J0Q29sdW1uXG4gICAgICB8fCBzb3J0T3JkZXIgIT09IG5leHRTb3J0T3JkZXJcbiAgICAgIHx8IChmaWx0ZXJEYXRhICYmICFmaWx0ZXJEYXRhLmVxdWFscyhwcmV2RmlsdGVyRGF0YSkpXG4gICAgICB8fCBwYWdlICE9PSBwcmV2UGFnZVxuICAgICAgfHwgcm93c09uUGFnZSAhPT0gcHJldlJvd3NPblBhZ2UpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiAhaXNFcXVhbCh0aGlzLnByb3BzLCBuZXh0UHJvcHMpIHx8ICFpc0VxdWFsKHRoaXMuc3RhdGUsIG5leHRTdGF0ZSk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLmlzQ29tcG9uZW50TW91bnRlZCA9IGZhbHNlO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnNldERpbWVuc2lvbnNPblN0YXRlKTtcbiAgfVxuXG4gIHNldERpbWVuc2lvbnNPblN0YXRlID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLmlzQ29tcG9uZW50TW91bnRlZCkge1xuICAgICAgY29uc3QgeyBvZmZzZXRXaWR0aCwgb2Zmc2V0SGVpZ2h0IH0gPSBmaW5kRE9NTm9kZSh0aGlzKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBncmlkV2lkdGg6IG9mZnNldFdpZHRoIHx8IGluaXRpYWxQaXhlbHMsXG4gICAgICAgIGdyaWRIZWlnaHQ6IG9mZnNldEhlaWdodCB8fCBpbml0aWFsUGl4ZWxzLFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGdldFN0eWxlKCkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi50aGlzLnByb3BzLmNvbnRhaW5lclN0eWxlLFxuICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgIH07XG4gIH1cblxuICBhdHRhY2hSZXNpemVFdmVudCgpIHtcbiAgICBpZiAod2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnNldERpbWVuc2lvbnNPblN0YXRlLCBmYWxzZSk7XG4gICAgfSBlbHNlIGlmICh3aW5kb3cuYXR0YWNoRXZlbnQpIHtcbiAgICAgIHdpbmRvdy5hdHRhY2hFdmVudCgncmVzaXplJywgdGhpcy5zZXREaW1lbnNpb25zT25TdGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5vbnJlc2l6ZSA9IHRoaXMuc2V0RGltZW5zaW9uc09uU3RhdGU7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgZ3JpZFdpZHRoLCBncmlkSGVpZ2h0IH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtbWFpbi1jb250YWluZXJcIiBzdHlsZT17dGhpcy5nZXRTdHlsZSgpfT5cbiAgICAgICAgPFRhYmxlIHsuLi50aGlzLnByb3BzfSB3aWR0aD17Z3JpZFdpZHRofSBoZWlnaHQ9e2dyaWRIZWlnaHR9IC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=