'use strict';

exports.__esModule = true;
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp2; /* eslint-disable react/forbid-prop-types, react/no-find-dom-node */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _fixedDataTable = require('fixed-data-table-2');

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
        var _findDOMNode = (0, _reactDom.findDOMNode)(_this),
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

    this.setDimensionsOnState = (0, _debounce2.default)(this.setDimensionsOnState, refreshRate);
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
    return !(0, _isEqual2.default)(this.props, nextProps) || !(0, _isEqual2.default)(this.state, nextState);
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


    return _react2.default.createElement(
      'div',
      { className: 'oc-datagrid-main-container', style: this.getStyle() },
      _react2.default.createElement(_fixedDataTable.Table, _extends({}, this.props, { width: gridWidth, height: gridHeight }))
    );
  };

  return ResponsiveFixedDataTable;
}(_react2.default.Component), _class.defaultProps = {
  containerStyle: {},
  refreshRate: 250 // ms
}, _temp2);
exports.default = ResponsiveFixedDataTable;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9yZXNwb25zaXZlLWZpeGVkLWRhdGEtdGFibGUuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJpbml0aWFsUGl4ZWxzIiwiUmVzcG9uc2l2ZUZpeGVkRGF0YVRhYmxlIiwic3RhdGUiLCJncmlkV2lkdGgiLCJncmlkSGVpZ2h0Iiwic2V0RGltZW5zaW9uc09uU3RhdGUiLCJpc0NvbXBvbmVudE1vdW50ZWQiLCJvZmZzZXRXaWR0aCIsIm9mZnNldEhlaWdodCIsInNldFN0YXRlIiwiY29tcG9uZW50V2lsbE1vdW50IiwicmVmcmVzaFJhdGUiLCJwcm9wcyIsImNvbXBvbmVudERpZE1vdW50IiwiYXR0YWNoUmVzaXplRXZlbnQiLCJ3aW5kb3ciLCJzZXRUaW1lb3V0Iiwic2hvdWxkQ29tcG9uZW50VXBkYXRlIiwibmV4dFByb3BzIiwibmV4dFN0YXRlIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZ2V0U3R5bGUiLCJjb250YWluZXJTdHlsZSIsIndpZHRoIiwiaGVpZ2h0Iiwib3ZlcmZsb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiYXR0YWNoRXZlbnQiLCJvbnJlc2l6ZSIsInJlbmRlciIsIlJlYWN0IiwiQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O29CQUFBOzs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsZ0JBQWdCLENBQXRCOztJQUVxQkMsd0I7Ozs7Ozs7Ozs7Ozt3SkFXbkJDLEssR0FBUTtBQUNOQyxpQkFBV0gsYUFETDtBQUVOSSxrQkFBWUo7QUFGTixLLFFBMEJSSyxvQixHQUF1QixZQUFNO0FBQzNCLFVBQUksTUFBS0Msa0JBQVQsRUFBNkI7QUFBQSwyQkFDVyxpQ0FEWDtBQUFBLFlBQ25CQyxXQURtQixnQkFDbkJBLFdBRG1CO0FBQUEsWUFDTkMsWUFETSxnQkFDTkEsWUFETTs7QUFFM0IsY0FBS0MsUUFBTCxDQUFjO0FBQ1pOLHFCQUFXSSxlQUFlUCxhQURkO0FBRVpJLHNCQUFZSSxnQkFBZ0JSO0FBRmhCLFNBQWQ7QUFJRDtBQUNGLEs7OztxQ0E3QkRVLGtCLGlDQUFxQjtBQUFBLFFBQ1hDLFdBRFcsR0FDSyxLQUFLQyxLQURWLENBQ1hELFdBRFc7O0FBRW5CLFNBQUtOLG9CQUFMLEdBQTRCLHdCQUFTLEtBQUtBLG9CQUFkLEVBQW9DTSxXQUFwQyxDQUE1QjtBQUNELEc7O3FDQUVERSxpQixnQ0FBb0I7QUFBQTs7QUFDbEIsU0FBS1Asa0JBQUwsR0FBMEIsSUFBMUI7QUFDQSxTQUFLRCxvQkFBTDtBQUNBLFNBQUtTLGlCQUFMO0FBQ0FDLFdBQU9DLFVBQVAsQ0FBa0I7QUFBQSxhQUFNLE9BQUtYLG9CQUFMLEVBQU47QUFBQSxLQUFsQixFQUFxRCxHQUFyRDtBQUNELEc7O3FDQUVEWSxxQixrQ0FBc0JDLFMsRUFBV0MsUyxFQUFXO0FBQzFDLFdBQU8sQ0FBQyx1QkFBUSxLQUFLUCxLQUFiLEVBQW9CTSxTQUFwQixDQUFELElBQW1DLENBQUMsdUJBQVEsS0FBS2hCLEtBQWIsRUFBb0JpQixTQUFwQixDQUEzQztBQUNELEc7O3FDQUVEQyxvQixtQ0FBdUI7QUFDckIsU0FBS2Qsa0JBQUwsR0FBMEIsS0FBMUI7QUFDQVMsV0FBT00sbUJBQVAsQ0FBMkIsUUFBM0IsRUFBcUMsS0FBS2hCLG9CQUExQztBQUNELEc7O3FDQVlEaUIsUSx1QkFBVztBQUNULHdCQUNLLEtBQUtWLEtBQUwsQ0FBV1csY0FEaEI7QUFFRUMsYUFBTyxNQUZUO0FBR0VDLGNBQVEsTUFIVjtBQUlFQyxnQkFBVTtBQUpaO0FBTUQsRzs7cUNBRURaLGlCLGdDQUFvQjtBQUNsQixRQUFJQyxPQUFPWSxnQkFBWCxFQUE2QjtBQUMzQlosYUFBT1ksZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsS0FBS3RCLG9CQUF2QyxFQUE2RCxLQUE3RDtBQUNELEtBRkQsTUFFTyxJQUFJVSxPQUFPYSxXQUFYLEVBQXdCO0FBQzdCYixhQUFPYSxXQUFQLENBQW1CLFFBQW5CLEVBQTZCLEtBQUt2QixvQkFBbEM7QUFDRCxLQUZNLE1BRUE7QUFDTFUsYUFBT2MsUUFBUCxHQUFrQixLQUFLeEIsb0JBQXZCO0FBQ0Q7QUFDRixHOztxQ0FFRHlCLE0scUJBQVM7QUFBQSxpQkFDMkIsS0FBSzVCLEtBRGhDO0FBQUEsUUFDQ0MsU0FERCxVQUNDQSxTQUREO0FBQUEsUUFDWUMsVUFEWixVQUNZQSxVQURaOzs7QUFHUCxXQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsNEJBQWYsRUFBNEMsT0FBTyxLQUFLa0IsUUFBTCxFQUFuRDtBQUNFLG9DQUFDLHFCQUFELGVBQVcsS0FBS1YsS0FBaEIsSUFBdUIsT0FBT1QsU0FBOUIsRUFBeUMsUUFBUUMsVUFBakQ7QUFERixLQURGO0FBS0QsRzs7O0VBMUVtRDJCLGdCQUFNQyxTLFVBTW5EQyxZLEdBQWU7QUFDcEJWLGtCQUFnQixFQURJO0FBRXBCWixlQUFhLEdBRk8sQ0FFRjtBQUZFLEM7a0JBTkhWLHdCIiwiZmlsZSI6InJlc3BvbnNpdmUtZml4ZWQtZGF0YS10YWJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9mb3JiaWQtcHJvcC10eXBlcywgcmVhY3Qvbm8tZmluZC1kb20tbm9kZSAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBmaW5kRE9NTm9kZSB9IGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgeyBUYWJsZSB9IGZyb20gJ2ZpeGVkLWRhdGEtdGFibGUtMic7XG5pbXBvcnQgZGVib3VuY2UgZnJvbSAnbG9kYXNoL2RlYm91bmNlJztcbmltcG9ydCBpc0VxdWFsIGZyb20gJ2xvZGFzaC9pc0VxdWFsJztcblxuY29uc3QgaW5pdGlhbFBpeGVscyA9IDE7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc3BvbnNpdmVGaXhlZERhdGFUYWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgY29udGFpbmVyU3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgcmVmcmVzaFJhdGU6IFByb3BUeXBlcy5udW1iZXIsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBjb250YWluZXJTdHlsZToge30sXG4gICAgcmVmcmVzaFJhdGU6IDI1MCwgLy8gbXNcbiAgfTtcblxuICBzdGF0ZSA9IHtcbiAgICBncmlkV2lkdGg6IGluaXRpYWxQaXhlbHMsXG4gICAgZ3JpZEhlaWdodDogaW5pdGlhbFBpeGVscyxcbiAgfTtcblxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgY29uc3QgeyByZWZyZXNoUmF0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICB0aGlzLnNldERpbWVuc2lvbnNPblN0YXRlID0gZGVib3VuY2UodGhpcy5zZXREaW1lbnNpb25zT25TdGF0ZSwgcmVmcmVzaFJhdGUpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5pc0NvbXBvbmVudE1vdW50ZWQgPSB0cnVlO1xuICAgIHRoaXMuc2V0RGltZW5zaW9uc09uU3RhdGUoKTtcbiAgICB0aGlzLmF0dGFjaFJlc2l6ZUV2ZW50KCk7XG4gICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4gdGhpcy5zZXREaW1lbnNpb25zT25TdGF0ZSgpLCA1MDApO1xuICB9XG5cbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgcmV0dXJuICFpc0VxdWFsKHRoaXMucHJvcHMsIG5leHRQcm9wcykgfHwgIWlzRXF1YWwodGhpcy5zdGF0ZSwgbmV4dFN0YXRlKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMuaXNDb21wb25lbnRNb3VudGVkID0gZmFsc2U7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuc2V0RGltZW5zaW9uc09uU3RhdGUpO1xuICB9XG5cbiAgc2V0RGltZW5zaW9uc09uU3RhdGUgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuaXNDb21wb25lbnRNb3VudGVkKSB7XG4gICAgICBjb25zdCB7IG9mZnNldFdpZHRoLCBvZmZzZXRIZWlnaHQgfSA9IGZpbmRET01Ob2RlKHRoaXMpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGdyaWRXaWR0aDogb2Zmc2V0V2lkdGggfHwgaW5pdGlhbFBpeGVscyxcbiAgICAgICAgZ3JpZEhlaWdodDogb2Zmc2V0SGVpZ2h0IHx8IGluaXRpYWxQaXhlbHMsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBnZXRTdHlsZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4udGhpcy5wcm9wcy5jb250YWluZXJTdHlsZSxcbiAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICB9O1xuICB9XG5cbiAgYXR0YWNoUmVzaXplRXZlbnQoKSB7XG4gICAgaWYgKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5zZXREaW1lbnNpb25zT25TdGF0ZSwgZmFsc2UpO1xuICAgIH0gZWxzZSBpZiAod2luZG93LmF0dGFjaEV2ZW50KSB7XG4gICAgICB3aW5kb3cuYXR0YWNoRXZlbnQoJ3Jlc2l6ZScsIHRoaXMuc2V0RGltZW5zaW9uc09uU3RhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3cub25yZXNpemUgPSB0aGlzLnNldERpbWVuc2lvbnNPblN0YXRlO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGdyaWRXaWR0aCwgZ3JpZEhlaWdodCB9ID0gdGhpcy5zdGF0ZTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLW1haW4tY29udGFpbmVyXCIgc3R5bGU9e3RoaXMuZ2V0U3R5bGUoKX0+XG4gICAgICAgIDxUYWJsZSB7Li4udGhpcy5wcm9wc30gd2lkdGg9e2dyaWRXaWR0aH0gaGVpZ2h0PXtncmlkSGVpZ2h0fSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19