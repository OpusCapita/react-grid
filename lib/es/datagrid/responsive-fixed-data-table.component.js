var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable react/forbid-prop-types, react/no-find-dom-node */
import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { Table } from 'fixed-data-table-2';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';

var initialPixels = 1;

var ResponsiveFixedDataTable = (_temp2 = _class = function (_React$Component) {
  _inherits(ResponsiveFixedDataTable, _React$Component);

  function ResponsiveFixedDataTable() {
    var _temp, _this, _ret;

    _classCallCheck(this, ResponsiveFixedDataTable);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      gridWidth: initialPixels,
      gridHeight: initialPixels
    }, _this.setDimensionsOnState = function () {
      if (_this.isComponentMounted) {
        var _findDOMNode = findDOMNode(_this),
            offsetWidth = _findDOMNode.offsetWidth,
            offsetHeight = _findDOMNode.offsetHeight;

        _this.setState({
          gridWidth: offsetWidth || initialPixels,
          gridHeight: offsetHeight || initialPixels
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  ResponsiveFixedDataTable.prototype.componentWillMount = function componentWillMount() {
    var refreshRate = this.props.refreshRate;

    this.setDimensionsOnState = debounce(this.setDimensionsOnState, refreshRate);
  };

  ResponsiveFixedDataTable.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    this.isComponentMounted = true;
    this.setDimensionsOnState();
    this.attachResizeEvent();
    window.setTimeout(function () {
      return _this2.setDimensionsOnState();
    }, 500);
  };

  ResponsiveFixedDataTable.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState);
  };

  ResponsiveFixedDataTable.prototype.componentWillUnmount = function componentWillUnmount() {
    this.isComponentMounted = false;
    window.removeEventListener('resize', this.setDimensionsOnState);
  };

  ResponsiveFixedDataTable.prototype.getStyle = function getStyle() {
    return _extends({}, this.props.containerStyle, {
      width: '100%',
      height: '100%',
      overflow: 'hidden'
    });
  };

  ResponsiveFixedDataTable.prototype.attachResizeEvent = function attachResizeEvent() {
    if (window.addEventListener) {
      window.addEventListener('resize', this.setDimensionsOnState, false);
    } else if (window.attachEvent) {
      window.attachEvent('resize', this.setDimensionsOnState);
    } else {
      window.onresize = this.setDimensionsOnState;
    }
  };

  ResponsiveFixedDataTable.prototype.render = function render() {
    var _state = this.state,
        gridWidth = _state.gridWidth,
        gridHeight = _state.gridHeight;


    return React.createElement(
      'div',
      { className: 'oc-datagrid-main-container', style: this.getStyle() },
      React.createElement(Table, _extends({}, this.props, { width: gridWidth, height: gridHeight }))
    );
  };

  return ResponsiveFixedDataTable;
}(React.Component), _class.defaultProps = {
  containerStyle: {},
  refreshRate: 250 // ms
}, _temp2);
export { ResponsiveFixedDataTable as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9yZXNwb25zaXZlLWZpeGVkLWRhdGEtdGFibGUuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsImZpbmRET01Ob2RlIiwiVGFibGUiLCJkZWJvdW5jZSIsImlzRXF1YWwiLCJpbml0aWFsUGl4ZWxzIiwiUmVzcG9uc2l2ZUZpeGVkRGF0YVRhYmxlIiwic3RhdGUiLCJncmlkV2lkdGgiLCJncmlkSGVpZ2h0Iiwic2V0RGltZW5zaW9uc09uU3RhdGUiLCJpc0NvbXBvbmVudE1vdW50ZWQiLCJvZmZzZXRXaWR0aCIsIm9mZnNldEhlaWdodCIsInNldFN0YXRlIiwiY29tcG9uZW50V2lsbE1vdW50IiwicmVmcmVzaFJhdGUiLCJwcm9wcyIsImNvbXBvbmVudERpZE1vdW50IiwiYXR0YWNoUmVzaXplRXZlbnQiLCJ3aW5kb3ciLCJzZXRUaW1lb3V0Iiwic2hvdWxkQ29tcG9uZW50VXBkYXRlIiwibmV4dFByb3BzIiwibmV4dFN0YXRlIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZ2V0U3R5bGUiLCJjb250YWluZXJTdHlsZSIsIndpZHRoIiwiaGVpZ2h0Iiwib3ZlcmZsb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiYXR0YWNoRXZlbnQiLCJvbnJlc2l6ZSIsInJlbmRlciIsIkNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQ0EsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxTQUFTQyxXQUFULFFBQTRCLFdBQTVCO0FBQ0EsU0FBU0MsS0FBVCxRQUFzQixvQkFBdEI7QUFDQSxPQUFPQyxRQUFQLE1BQXFCLGlCQUFyQjtBQUNBLE9BQU9DLE9BQVAsTUFBb0IsZ0JBQXBCOztBQUVBLElBQU1DLGdCQUFnQixDQUF0Qjs7SUFFcUJDLHdCOzs7Ozs7Ozs7Ozs7d0pBV25CQyxLLEdBQVE7QUFDTkMsaUJBQVdILGFBREw7QUFFTkksa0JBQVlKO0FBRk4sSyxRQTBCUkssb0IsR0FBdUIsWUFBTTtBQUMzQixVQUFJLE1BQUtDLGtCQUFULEVBQTZCO0FBQUEsMkJBQ1dWLGtCQURYO0FBQUEsWUFDbkJXLFdBRG1CLGdCQUNuQkEsV0FEbUI7QUFBQSxZQUNOQyxZQURNLGdCQUNOQSxZQURNOztBQUUzQixjQUFLQyxRQUFMLENBQWM7QUFDWk4scUJBQVdJLGVBQWVQLGFBRGQ7QUFFWkksc0JBQVlJLGdCQUFnQlI7QUFGaEIsU0FBZDtBQUlEO0FBQ0YsSzs7O3FDQTdCRFUsa0IsaUNBQXFCO0FBQUEsUUFDWEMsV0FEVyxHQUNLLEtBQUtDLEtBRFYsQ0FDWEQsV0FEVzs7QUFFbkIsU0FBS04sb0JBQUwsR0FBNEJQLFNBQVMsS0FBS08sb0JBQWQsRUFBb0NNLFdBQXBDLENBQTVCO0FBQ0QsRzs7cUNBRURFLGlCLGdDQUFvQjtBQUFBOztBQUNsQixTQUFLUCxrQkFBTCxHQUEwQixJQUExQjtBQUNBLFNBQUtELG9CQUFMO0FBQ0EsU0FBS1MsaUJBQUw7QUFDQUMsV0FBT0MsVUFBUCxDQUFrQjtBQUFBLGFBQU0sT0FBS1gsb0JBQUwsRUFBTjtBQUFBLEtBQWxCLEVBQXFELEdBQXJEO0FBQ0QsRzs7cUNBRURZLHFCLGtDQUFzQkMsUyxFQUFXQyxTLEVBQVc7QUFDMUMsV0FBTyxDQUFDcEIsUUFBUSxLQUFLYSxLQUFiLEVBQW9CTSxTQUFwQixDQUFELElBQW1DLENBQUNuQixRQUFRLEtBQUtHLEtBQWIsRUFBb0JpQixTQUFwQixDQUEzQztBQUNELEc7O3FDQUVEQyxvQixtQ0FBdUI7QUFDckIsU0FBS2Qsa0JBQUwsR0FBMEIsS0FBMUI7QUFDQVMsV0FBT00sbUJBQVAsQ0FBMkIsUUFBM0IsRUFBcUMsS0FBS2hCLG9CQUExQztBQUNELEc7O3FDQVlEaUIsUSx1QkFBVztBQUNULHdCQUNLLEtBQUtWLEtBQUwsQ0FBV1csY0FEaEI7QUFFRUMsYUFBTyxNQUZUO0FBR0VDLGNBQVEsTUFIVjtBQUlFQyxnQkFBVTtBQUpaO0FBTUQsRzs7cUNBRURaLGlCLGdDQUFvQjtBQUNsQixRQUFJQyxPQUFPWSxnQkFBWCxFQUE2QjtBQUMzQlosYUFBT1ksZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsS0FBS3RCLG9CQUF2QyxFQUE2RCxLQUE3RDtBQUNELEtBRkQsTUFFTyxJQUFJVSxPQUFPYSxXQUFYLEVBQXdCO0FBQzdCYixhQUFPYSxXQUFQLENBQW1CLFFBQW5CLEVBQTZCLEtBQUt2QixvQkFBbEM7QUFDRCxLQUZNLE1BRUE7QUFDTFUsYUFBT2MsUUFBUCxHQUFrQixLQUFLeEIsb0JBQXZCO0FBQ0Q7QUFDRixHOztxQ0FFRHlCLE0scUJBQVM7QUFBQSxpQkFDMkIsS0FBSzVCLEtBRGhDO0FBQUEsUUFDQ0MsU0FERCxVQUNDQSxTQUREO0FBQUEsUUFDWUMsVUFEWixVQUNZQSxVQURaOzs7QUFHUCxXQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsNEJBQWYsRUFBNEMsT0FBTyxLQUFLa0IsUUFBTCxFQUFuRDtBQUNFLDBCQUFDLEtBQUQsZUFBVyxLQUFLVixLQUFoQixJQUF1QixPQUFPVCxTQUE5QixFQUF5QyxRQUFRQyxVQUFqRDtBQURGLEtBREY7QUFLRCxHOzs7RUExRW1EVixNQUFNcUMsUyxVQU1uREMsWSxHQUFlO0FBQ3BCVCxrQkFBZ0IsRUFESTtBQUVwQlosZUFBYSxHQUZPLENBRUY7QUFGRSxDO1NBTkhWLHdCIiwiZmlsZSI6InJlc3BvbnNpdmUtZml4ZWQtZGF0YS10YWJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9mb3JiaWQtcHJvcC10eXBlcywgcmVhY3Qvbm8tZmluZC1kb20tbm9kZSAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBmaW5kRE9NTm9kZSB9IGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgeyBUYWJsZSB9IGZyb20gJ2ZpeGVkLWRhdGEtdGFibGUtMic7XG5pbXBvcnQgZGVib3VuY2UgZnJvbSAnbG9kYXNoL2RlYm91bmNlJztcbmltcG9ydCBpc0VxdWFsIGZyb20gJ2xvZGFzaC9pc0VxdWFsJztcblxuY29uc3QgaW5pdGlhbFBpeGVscyA9IDE7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc3BvbnNpdmVGaXhlZERhdGFUYWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgY29udGFpbmVyU3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgcmVmcmVzaFJhdGU6IFByb3BUeXBlcy5udW1iZXIsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBjb250YWluZXJTdHlsZToge30sXG4gICAgcmVmcmVzaFJhdGU6IDI1MCwgLy8gbXNcbiAgfTtcblxuICBzdGF0ZSA9IHtcbiAgICBncmlkV2lkdGg6IGluaXRpYWxQaXhlbHMsXG4gICAgZ3JpZEhlaWdodDogaW5pdGlhbFBpeGVscyxcbiAgfTtcblxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgY29uc3QgeyByZWZyZXNoUmF0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICB0aGlzLnNldERpbWVuc2lvbnNPblN0YXRlID0gZGVib3VuY2UodGhpcy5zZXREaW1lbnNpb25zT25TdGF0ZSwgcmVmcmVzaFJhdGUpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5pc0NvbXBvbmVudE1vdW50ZWQgPSB0cnVlO1xuICAgIHRoaXMuc2V0RGltZW5zaW9uc09uU3RhdGUoKTtcbiAgICB0aGlzLmF0dGFjaFJlc2l6ZUV2ZW50KCk7XG4gICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4gdGhpcy5zZXREaW1lbnNpb25zT25TdGF0ZSgpLCA1MDApO1xuICB9XG5cbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgcmV0dXJuICFpc0VxdWFsKHRoaXMucHJvcHMsIG5leHRQcm9wcykgfHwgIWlzRXF1YWwodGhpcy5zdGF0ZSwgbmV4dFN0YXRlKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMuaXNDb21wb25lbnRNb3VudGVkID0gZmFsc2U7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuc2V0RGltZW5zaW9uc09uU3RhdGUpO1xuICB9XG5cbiAgc2V0RGltZW5zaW9uc09uU3RhdGUgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuaXNDb21wb25lbnRNb3VudGVkKSB7XG4gICAgICBjb25zdCB7IG9mZnNldFdpZHRoLCBvZmZzZXRIZWlnaHQgfSA9IGZpbmRET01Ob2RlKHRoaXMpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGdyaWRXaWR0aDogb2Zmc2V0V2lkdGggfHwgaW5pdGlhbFBpeGVscyxcbiAgICAgICAgZ3JpZEhlaWdodDogb2Zmc2V0SGVpZ2h0IHx8IGluaXRpYWxQaXhlbHMsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBnZXRTdHlsZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4udGhpcy5wcm9wcy5jb250YWluZXJTdHlsZSxcbiAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICB9O1xuICB9XG5cbiAgYXR0YWNoUmVzaXplRXZlbnQoKSB7XG4gICAgaWYgKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5zZXREaW1lbnNpb25zT25TdGF0ZSwgZmFsc2UpO1xuICAgIH0gZWxzZSBpZiAod2luZG93LmF0dGFjaEV2ZW50KSB7XG4gICAgICB3aW5kb3cuYXR0YWNoRXZlbnQoJ3Jlc2l6ZScsIHRoaXMuc2V0RGltZW5zaW9uc09uU3RhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3cub25yZXNpemUgPSB0aGlzLnNldERpbWVuc2lvbnNPblN0YXRlO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGdyaWRXaWR0aCwgZ3JpZEhlaWdodCB9ID0gdGhpcy5zdGF0ZTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLW1haW4tY29udGFpbmVyXCIgc3R5bGU9e3RoaXMuZ2V0U3R5bGUoKX0+XG4gICAgICAgIDxUYWJsZSB7Li4udGhpcy5wcm9wc30gd2lkdGg9e2dyaWRXaWR0aH0gaGVpZ2h0PXtncmlkSGVpZ2h0fSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19