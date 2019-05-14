function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable react/forbid-prop-types, react/no-find-dom-node */
import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { Table } from 'fixed-data-table-2';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
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
    return React.createElement("div", {
      className: "oc-datagrid-main-container",
      style: this.getStyle()
    }, React.createElement(Table, _extends({}, this.props, {
      width: gridWidth,
      height: gridHeight
    })));
  };

  return ResponsiveFixedDataTable;
}(React.Component);

_defineProperty(ResponsiveFixedDataTable, "defaultProps", {
  containerStyle: {},
  refreshRate: 250 // ms

});

export { ResponsiveFixedDataTable as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9yZXNwb25zaXZlLWZpeGVkLWRhdGEtdGFibGUuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsImZpbmRET01Ob2RlIiwiVGFibGUiLCJkZWJvdW5jZSIsImlzRXF1YWwiLCJpbml0aWFsUGl4ZWxzIiwiUmVzcG9uc2l2ZUZpeGVkRGF0YVRhYmxlIiwiZ3JpZFdpZHRoIiwiZ3JpZEhlaWdodCIsImlzQ29tcG9uZW50TW91bnRlZCIsIm9mZnNldFdpZHRoIiwib2Zmc2V0SGVpZ2h0Iiwic2V0U3RhdGUiLCJjb21wb25lbnRXaWxsTW91bnQiLCJyZWZyZXNoUmF0ZSIsInByb3BzIiwic2V0RGltZW5zaW9uc09uU3RhdGUiLCJjb21wb25lbnREaWRNb3VudCIsImF0dGFjaFJlc2l6ZUV2ZW50Iiwid2luZG93Iiwic2V0VGltZW91dCIsInNob3VsZENvbXBvbmVudFVwZGF0ZSIsIm5leHRQcm9wcyIsIm5leHRTdGF0ZSIsInN0YXRlIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZ2V0U3R5bGUiLCJjb250YWluZXJTdHlsZSIsIndpZHRoIiwiaGVpZ2h0Iiwib3ZlcmZsb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiYXR0YWNoRXZlbnQiLCJvbnJlc2l6ZSIsInJlbmRlciIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsU0FBU0MsV0FBVCxRQUE0QixXQUE1QjtBQUNBLFNBQVNDLEtBQVQsUUFBc0Isb0JBQXRCO0FBQ0EsT0FBT0MsUUFBUCxNQUFxQixpQkFBckI7QUFDQSxPQUFPQyxPQUFQLE1BQW9CLGdCQUFwQjtBQUVBLElBQU1DLGFBQWEsR0FBRyxDQUF0Qjs7SUFFcUJDLHdCOzs7Ozs7Ozs7Ozs7Ozs0REFXWDtBQUNO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aXNhYmxlIHJlYWN0L2ZvcmJpZC1wcm9wLXR5cGVzLCByZWFjdC9uby1maW5kLWRvbS1ub2RlICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IGZpbmRET01Ob2RlIH0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB7IFRhYmxlIH0gZnJvbSAnZml4ZWQtZGF0YS10YWJsZS0yJztcbmltcG9ydCBkZWJvdW5jZSBmcm9tICdsb2Rhc2gvZGVib3VuY2UnO1xuaW1wb3J0IGlzRXF1YWwgZnJvbSAnbG9kYXNoL2lzRXF1YWwnO1xuXG5jb25zdCBpbml0aWFsUGl4ZWxzID0gMTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzcG9uc2l2ZUZpeGVkRGF0YVRhYmxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjb250YWluZXJTdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcbiAgICByZWZyZXNoUmF0ZTogUHJvcFR5cGVzLm51bWJlcixcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGNvbnRhaW5lclN0eWxlOiB7fSxcbiAgICByZWZyZXNoUmF0ZTogMjUwLCAvLyBtc1xuICB9O1xuXG4gIHN0YXRlID0ge1xuICAgIGdyaWRXaWR0aDogaW5pdGlhbFBpeGVscyxcbiAgICBncmlkSGVpZ2h0OiBpbml0aWFsUGl4ZWxzLFxuICB9O1xuXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICBjb25zdCB7IHJlZnJlc2hSYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIHRoaXMuc2V0RGltZW5zaW9uc09uU3RhdGUgPSBkZWJvdW5jZSh0aGlzLnNldERpbWVuc2lvbnNPblN0YXRlLCByZWZyZXNoUmF0ZSk7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLmlzQ29tcG9uZW50TW91bnRlZCA9IHRydWU7XG4gICAgdGhpcy5zZXREaW1lbnNpb25zT25TdGF0ZSgpO1xuICAgIHRoaXMuYXR0YWNoUmVzaXplRXZlbnQoKTtcbiAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB0aGlzLnNldERpbWVuc2lvbnNPblN0YXRlKCksIDUwMCk7XG4gIH1cblxuICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICByZXR1cm4gIWlzRXF1YWwodGhpcy5wcm9wcywgbmV4dFByb3BzKSB8fCAhaXNFcXVhbCh0aGlzLnN0YXRlLCBuZXh0U3RhdGUpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy5pc0NvbXBvbmVudE1vdW50ZWQgPSBmYWxzZTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5zZXREaW1lbnNpb25zT25TdGF0ZSk7XG4gIH1cblxuICBzZXREaW1lbnNpb25zT25TdGF0ZSA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5pc0NvbXBvbmVudE1vdW50ZWQpIHtcbiAgICAgIGNvbnN0IHsgb2Zmc2V0V2lkdGgsIG9mZnNldEhlaWdodCB9ID0gZmluZERPTU5vZGUodGhpcyk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgZ3JpZFdpZHRoOiBvZmZzZXRXaWR0aCB8fCBpbml0aWFsUGl4ZWxzLFxuICAgICAgICBncmlkSGVpZ2h0OiBvZmZzZXRIZWlnaHQgfHwgaW5pdGlhbFBpeGVscyxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBnZXRTdHlsZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4udGhpcy5wcm9wcy5jb250YWluZXJTdHlsZSxcbiAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICB9O1xuICB9XG5cbiAgYXR0YWNoUmVzaXplRXZlbnQoKSB7XG4gICAgaWYgKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5zZXREaW1lbnNpb25zT25TdGF0ZSwgZmFsc2UpO1xuICAgIH0gZWxzZSBpZiAod2luZG93LmF0dGFjaEV2ZW50KSB7XG4gICAgICB3aW5kb3cuYXR0YWNoRXZlbnQoJ3Jlc2l6ZScsIHRoaXMuc2V0RGltZW5zaW9uc09uU3RhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3cub25yZXNpemUgPSB0aGlzLnNldERpbWVuc2lvbnNPblN0YXRlO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGdyaWRXaWR0aCwgZ3JpZEhlaWdodCB9ID0gdGhpcy5zdGF0ZTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLW1haW4tY29udGFpbmVyXCIgc3R5bGU9e3RoaXMuZ2V0U3R5bGUoKX0+XG4gICAgICAgIDxUYWJsZSB7Li4udGhpcy5wcm9wc30gd2lkdGg9e2dyaWRXaWR0aH0gaGVpZ2h0PXtncmlkSGVpZ2h0fSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19