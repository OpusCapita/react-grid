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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9yZXNwb25zaXZlLWZpeGVkLWRhdGEtdGFibGUuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJpbml0aWFsUGl4ZWxzIiwiUmVzcG9uc2l2ZUZpeGVkRGF0YVRhYmxlIiwic3RhdGUiLCJncmlkV2lkdGgiLCJncmlkSGVpZ2h0Iiwic2V0RGltZW5zaW9uc09uU3RhdGUiLCJpc0NvbXBvbmVudE1vdW50ZWQiLCJvZmZzZXRXaWR0aCIsIm9mZnNldEhlaWdodCIsInNldFN0YXRlIiwiY29tcG9uZW50V2lsbE1vdW50IiwicmVmcmVzaFJhdGUiLCJwcm9wcyIsImNvbXBvbmVudERpZE1vdW50IiwiYXR0YWNoUmVzaXplRXZlbnQiLCJ3aW5kb3ciLCJzZXRUaW1lb3V0Iiwic2hvdWxkQ29tcG9uZW50VXBkYXRlIiwibmV4dFByb3BzIiwibmV4dFN0YXRlIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZ2V0U3R5bGUiLCJjb250YWluZXJTdHlsZSIsIndpZHRoIiwiaGVpZ2h0Iiwib3ZlcmZsb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiYXR0YWNoRXZlbnQiLCJvbnJlc2l6ZSIsInJlbmRlciIsIkNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztvQkFBQTs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLGdCQUFnQixDQUF0Qjs7SUFFcUJDLHdCOzs7Ozs7Ozs7Ozs7d0pBV25CQyxLLEdBQVE7QUFDTkMsaUJBQVdILGFBREw7QUFFTkksa0JBQVlKO0FBRk4sSyxRQTBCUkssb0IsR0FBdUIsWUFBTTtBQUMzQixVQUFJLE1BQUtDLGtCQUFULEVBQTZCO0FBQUEsMkJBQ1csaUNBRFg7QUFBQSxZQUNuQkMsV0FEbUIsZ0JBQ25CQSxXQURtQjtBQUFBLFlBQ05DLFlBRE0sZ0JBQ05BLFlBRE07O0FBRTNCLGNBQUtDLFFBQUwsQ0FBYztBQUNaTixxQkFBV0ksZUFBZVAsYUFEZDtBQUVaSSxzQkFBWUksZ0JBQWdCUjtBQUZoQixTQUFkO0FBSUQ7QUFDRixLOzs7cUNBN0JEVSxrQixpQ0FBcUI7QUFBQSxRQUNYQyxXQURXLEdBQ0ssS0FBS0MsS0FEVixDQUNYRCxXQURXOztBQUVuQixTQUFLTixvQkFBTCxHQUE0Qix3QkFBUyxLQUFLQSxvQkFBZCxFQUFvQ00sV0FBcEMsQ0FBNUI7QUFDRCxHOztxQ0FFREUsaUIsZ0NBQW9CO0FBQUE7O0FBQ2xCLFNBQUtQLGtCQUFMLEdBQTBCLElBQTFCO0FBQ0EsU0FBS0Qsb0JBQUw7QUFDQSxTQUFLUyxpQkFBTDtBQUNBQyxXQUFPQyxVQUFQLENBQWtCO0FBQUEsYUFBTSxPQUFLWCxvQkFBTCxFQUFOO0FBQUEsS0FBbEIsRUFBcUQsR0FBckQ7QUFDRCxHOztxQ0FFRFkscUIsa0NBQXNCQyxTLEVBQVdDLFMsRUFBVztBQUMxQyxXQUFPLENBQUMsdUJBQVEsS0FBS1AsS0FBYixFQUFvQk0sU0FBcEIsQ0FBRCxJQUFtQyxDQUFDLHVCQUFRLEtBQUtoQixLQUFiLEVBQW9CaUIsU0FBcEIsQ0FBM0M7QUFDRCxHOztxQ0FFREMsb0IsbUNBQXVCO0FBQ3JCLFNBQUtkLGtCQUFMLEdBQTBCLEtBQTFCO0FBQ0FTLFdBQU9NLG1CQUFQLENBQTJCLFFBQTNCLEVBQXFDLEtBQUtoQixvQkFBMUM7QUFDRCxHOztxQ0FZRGlCLFEsdUJBQVc7QUFDVCx3QkFDSyxLQUFLVixLQUFMLENBQVdXLGNBRGhCO0FBRUVDLGFBQU8sTUFGVDtBQUdFQyxjQUFRLE1BSFY7QUFJRUMsZ0JBQVU7QUFKWjtBQU1ELEc7O3FDQUVEWixpQixnQ0FBb0I7QUFDbEIsUUFBSUMsT0FBT1ksZ0JBQVgsRUFBNkI7QUFDM0JaLGFBQU9ZLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDLEtBQUt0QixvQkFBdkMsRUFBNkQsS0FBN0Q7QUFDRCxLQUZELE1BRU8sSUFBSVUsT0FBT2EsV0FBWCxFQUF3QjtBQUM3QmIsYUFBT2EsV0FBUCxDQUFtQixRQUFuQixFQUE2QixLQUFLdkIsb0JBQWxDO0FBQ0QsS0FGTSxNQUVBO0FBQ0xVLGFBQU9jLFFBQVAsR0FBa0IsS0FBS3hCLG9CQUF2QjtBQUNEO0FBQ0YsRzs7cUNBRUR5QixNLHFCQUFTO0FBQUEsaUJBQzJCLEtBQUs1QixLQURoQztBQUFBLFFBQ0NDLFNBREQsVUFDQ0EsU0FERDtBQUFBLFFBQ1lDLFVBRFosVUFDWUEsVUFEWjs7O0FBR1AsV0FDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLDRCQUFmLEVBQTRDLE9BQU8sS0FBS2tCLFFBQUwsRUFBbkQ7QUFDRSx3RUFBVyxLQUFLVixLQUFoQixJQUF1QixPQUFPVCxTQUE5QixFQUF5QyxRQUFRQyxVQUFqRDtBQURGLEtBREY7QUFLRCxHOzs7RUExRW1ELGdCQUFNMkIsUyxVQU1uREMsWSxHQUFlO0FBQ3BCVCxrQkFBZ0IsRUFESTtBQUVwQlosZUFBYSxHQUZPLENBRUY7QUFGRSxDO2tCQU5IVix3QiIsImZpbGUiOiJyZXNwb25zaXZlLWZpeGVkLWRhdGEtdGFibGUuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3QvZm9yYmlkLXByb3AtdHlwZXMsIHJlYWN0L25vLWZpbmQtZG9tLW5vZGUgKi9cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuaW1wb3J0IHsgZmluZERPTU5vZGUgfSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgeyBUYWJsZSB9IGZyb20gJ2ZpeGVkLWRhdGEtdGFibGUtMic7XHJcbmltcG9ydCBkZWJvdW5jZSBmcm9tICdsb2Rhc2gvZGVib3VuY2UnO1xyXG5pbXBvcnQgaXNFcXVhbCBmcm9tICdsb2Rhc2gvaXNFcXVhbCc7XHJcblxyXG5jb25zdCBpbml0aWFsUGl4ZWxzID0gMTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc3BvbnNpdmVGaXhlZERhdGFUYWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcclxuICAgIGNvbnRhaW5lclN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxyXG4gICAgcmVmcmVzaFJhdGU6IFByb3BUeXBlcy5udW1iZXIsXHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcclxuICAgIGNvbnRhaW5lclN0eWxlOiB7fSxcclxuICAgIHJlZnJlc2hSYXRlOiAyNTAsIC8vIG1zXHJcbiAgfTtcclxuXHJcbiAgc3RhdGUgPSB7XHJcbiAgICBncmlkV2lkdGg6IGluaXRpYWxQaXhlbHMsXHJcbiAgICBncmlkSGVpZ2h0OiBpbml0aWFsUGl4ZWxzLFxyXG4gIH07XHJcblxyXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgIGNvbnN0IHsgcmVmcmVzaFJhdGUgfSA9IHRoaXMucHJvcHM7XHJcbiAgICB0aGlzLnNldERpbWVuc2lvbnNPblN0YXRlID0gZGVib3VuY2UodGhpcy5zZXREaW1lbnNpb25zT25TdGF0ZSwgcmVmcmVzaFJhdGUpO1xyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICB0aGlzLmlzQ29tcG9uZW50TW91bnRlZCA9IHRydWU7XHJcbiAgICB0aGlzLnNldERpbWVuc2lvbnNPblN0YXRlKCk7XHJcbiAgICB0aGlzLmF0dGFjaFJlc2l6ZUV2ZW50KCk7XHJcbiAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB0aGlzLnNldERpbWVuc2lvbnNPblN0YXRlKCksIDUwMCk7XHJcbiAgfVxyXG5cclxuICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcclxuICAgIHJldHVybiAhaXNFcXVhbCh0aGlzLnByb3BzLCBuZXh0UHJvcHMpIHx8ICFpc0VxdWFsKHRoaXMuc3RhdGUsIG5leHRTdGF0ZSk7XHJcbiAgfVxyXG5cclxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgIHRoaXMuaXNDb21wb25lbnRNb3VudGVkID0gZmFsc2U7XHJcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5zZXREaW1lbnNpb25zT25TdGF0ZSk7XHJcbiAgfVxyXG5cclxuICBzZXREaW1lbnNpb25zT25TdGF0ZSA9ICgpID0+IHtcclxuICAgIGlmICh0aGlzLmlzQ29tcG9uZW50TW91bnRlZCkge1xyXG4gICAgICBjb25zdCB7IG9mZnNldFdpZHRoLCBvZmZzZXRIZWlnaHQgfSA9IGZpbmRET01Ob2RlKHRoaXMpO1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICBncmlkV2lkdGg6IG9mZnNldFdpZHRoIHx8IGluaXRpYWxQaXhlbHMsXHJcbiAgICAgICAgZ3JpZEhlaWdodDogb2Zmc2V0SGVpZ2h0IHx8IGluaXRpYWxQaXhlbHMsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0U3R5bGUoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAuLi50aGlzLnByb3BzLmNvbnRhaW5lclN0eWxlLFxyXG4gICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICBoZWlnaHQ6ICcxMDAlJyxcclxuICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGF0dGFjaFJlc2l6ZUV2ZW50KCkge1xyXG4gICAgaWYgKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKSB7XHJcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnNldERpbWVuc2lvbnNPblN0YXRlLCBmYWxzZSk7XHJcbiAgICB9IGVsc2UgaWYgKHdpbmRvdy5hdHRhY2hFdmVudCkge1xyXG4gICAgICB3aW5kb3cuYXR0YWNoRXZlbnQoJ3Jlc2l6ZScsIHRoaXMuc2V0RGltZW5zaW9uc09uU3RhdGUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgd2luZG93Lm9ucmVzaXplID0gdGhpcy5zZXREaW1lbnNpb25zT25TdGF0ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHsgZ3JpZFdpZHRoLCBncmlkSGVpZ2h0IH0gPSB0aGlzLnN0YXRlO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtbWFpbi1jb250YWluZXJcIiBzdHlsZT17dGhpcy5nZXRTdHlsZSgpfT5cclxuICAgICAgICA8VGFibGUgey4uLnRoaXMucHJvcHN9IHdpZHRoPXtncmlkV2lkdGh9IGhlaWdodD17Z3JpZEhlaWdodH0gLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=