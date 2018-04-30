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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9yZXNwb25zaXZlLWZpeGVkLWRhdGEtdGFibGUuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJpbml0aWFsUGl4ZWxzIiwiUmVzcG9uc2l2ZUZpeGVkRGF0YVRhYmxlIiwic3RhdGUiLCJncmlkV2lkdGgiLCJncmlkSGVpZ2h0Iiwic2V0RGltZW5zaW9uc09uU3RhdGUiLCJpc0NvbXBvbmVudE1vdW50ZWQiLCJvZmZzZXRXaWR0aCIsIm9mZnNldEhlaWdodCIsInNldFN0YXRlIiwiY29tcG9uZW50V2lsbE1vdW50IiwicmVmcmVzaFJhdGUiLCJwcm9wcyIsImNvbXBvbmVudERpZE1vdW50IiwiYXR0YWNoUmVzaXplRXZlbnQiLCJ3aW5kb3ciLCJzZXRUaW1lb3V0Iiwic2hvdWxkQ29tcG9uZW50VXBkYXRlIiwibmV4dFByb3BzIiwibmV4dFN0YXRlIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZ2V0U3R5bGUiLCJjb250YWluZXJTdHlsZSIsIndpZHRoIiwiaGVpZ2h0Iiwib3ZlcmZsb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiYXR0YWNoRXZlbnQiLCJvbnJlc2l6ZSIsInJlbmRlciIsIkNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztvQkFBQTs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLGdCQUFnQixDQUF0Qjs7SUFFcUJDLHdCOzs7Ozs7Ozs7Ozs7d0pBV25CQyxLLEdBQVE7QUFDTkMsaUJBQVdILGFBREw7QUFFTkksa0JBQVlKO0FBRk4sSyxRQTBCUkssb0IsR0FBdUIsWUFBTTtBQUMzQixVQUFJLE1BQUtDLGtCQUFULEVBQTZCO0FBQUEsMkJBQ1csaUNBRFg7QUFBQSxZQUNuQkMsV0FEbUIsZ0JBQ25CQSxXQURtQjtBQUFBLFlBQ05DLFlBRE0sZ0JBQ05BLFlBRE07O0FBRTNCLGNBQUtDLFFBQUwsQ0FBYztBQUNaTixxQkFBV0ksZUFBZVAsYUFEZDtBQUVaSSxzQkFBWUksZ0JBQWdCUjtBQUZoQixTQUFkO0FBSUQ7QUFDRixLOzs7cUNBN0JEVSxrQixpQ0FBcUI7QUFBQSxRQUNYQyxXQURXLEdBQ0ssS0FBS0MsS0FEVixDQUNYRCxXQURXOztBQUVuQixTQUFLTixvQkFBTCxHQUE0Qix3QkFBUyxLQUFLQSxvQkFBZCxFQUFvQ00sV0FBcEMsQ0FBNUI7QUFDRCxHOztxQ0FFREUsaUIsZ0NBQW9CO0FBQUE7O0FBQ2xCLFNBQUtQLGtCQUFMLEdBQTBCLElBQTFCO0FBQ0EsU0FBS0Qsb0JBQUw7QUFDQSxTQUFLUyxpQkFBTDtBQUNBQyxXQUFPQyxVQUFQLENBQWtCO0FBQUEsYUFBTSxPQUFLWCxvQkFBTCxFQUFOO0FBQUEsS0FBbEIsRUFBcUQsR0FBckQ7QUFDRCxHOztxQ0FFRFkscUIsa0NBQXNCQyxTLEVBQVdDLFMsRUFBVztBQUMxQyxXQUFPLENBQUMsdUJBQVEsS0FBS1AsS0FBYixFQUFvQk0sU0FBcEIsQ0FBRCxJQUFtQyxDQUFDLHVCQUFRLEtBQUtoQixLQUFiLEVBQW9CaUIsU0FBcEIsQ0FBM0M7QUFDRCxHOztxQ0FFREMsb0IsbUNBQXVCO0FBQ3JCLFNBQUtkLGtCQUFMLEdBQTBCLEtBQTFCO0FBQ0FTLFdBQU9NLG1CQUFQLENBQTJCLFFBQTNCLEVBQXFDLEtBQUtoQixvQkFBMUM7QUFDRCxHOztxQ0FZRGlCLFEsdUJBQVc7QUFDVCx3QkFDSyxLQUFLVixLQUFMLENBQVdXLGNBRGhCO0FBRUVDLGFBQU8sTUFGVDtBQUdFQyxjQUFRLE1BSFY7QUFJRUMsZ0JBQVU7QUFKWjtBQU1ELEc7O3FDQUVEWixpQixnQ0FBb0I7QUFDbEIsUUFBSUMsT0FBT1ksZ0JBQVgsRUFBNkI7QUFDM0JaLGFBQU9ZLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDLEtBQUt0QixvQkFBdkMsRUFBNkQsS0FBN0Q7QUFDRCxLQUZELE1BRU8sSUFBSVUsT0FBT2EsV0FBWCxFQUF3QjtBQUM3QmIsYUFBT2EsV0FBUCxDQUFtQixRQUFuQixFQUE2QixLQUFLdkIsb0JBQWxDO0FBQ0QsS0FGTSxNQUVBO0FBQ0xVLGFBQU9jLFFBQVAsR0FBa0IsS0FBS3hCLG9CQUF2QjtBQUNEO0FBQ0YsRzs7cUNBRUR5QixNLHFCQUFTO0FBQUEsaUJBQzJCLEtBQUs1QixLQURoQztBQUFBLFFBQ0NDLFNBREQsVUFDQ0EsU0FERDtBQUFBLFFBQ1lDLFVBRFosVUFDWUEsVUFEWjs7O0FBR1AsV0FDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLDRCQUFmLEVBQTRDLE9BQU8sS0FBS2tCLFFBQUwsRUFBbkQ7QUFDRSx3RUFBVyxLQUFLVixLQUFoQixJQUF1QixPQUFPVCxTQUE5QixFQUF5QyxRQUFRQyxVQUFqRDtBQURGLEtBREY7QUFLRCxHOzs7RUExRW1ELGdCQUFNMkIsUyxVQU1uREMsWSxHQUFlO0FBQ3BCVCxrQkFBZ0IsRUFESTtBQUVwQlosZUFBYSxHQUZPLENBRUY7QUFGRSxDO2tCQU5IVix3QiIsImZpbGUiOiJyZXNwb25zaXZlLWZpeGVkLWRhdGEtdGFibGUuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3QvZm9yYmlkLXByb3AtdHlwZXMsIHJlYWN0L25vLWZpbmQtZG9tLW5vZGUgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgZmluZERPTU5vZGUgfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHsgVGFibGUgfSBmcm9tICdmaXhlZC1kYXRhLXRhYmxlLTInO1xuaW1wb3J0IGRlYm91bmNlIGZyb20gJ2xvZGFzaC9kZWJvdW5jZSc7XG5pbXBvcnQgaXNFcXVhbCBmcm9tICdsb2Rhc2gvaXNFcXVhbCc7XG5cbmNvbnN0IGluaXRpYWxQaXhlbHMgPSAxO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXNwb25zaXZlRml4ZWREYXRhVGFibGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGNvbnRhaW5lclN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIHJlZnJlc2hSYXRlOiBQcm9wVHlwZXMubnVtYmVyLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgY29udGFpbmVyU3R5bGU6IHt9LFxuICAgIHJlZnJlc2hSYXRlOiAyNTAsIC8vIG1zXG4gIH07XG5cbiAgc3RhdGUgPSB7XG4gICAgZ3JpZFdpZHRoOiBpbml0aWFsUGl4ZWxzLFxuICAgIGdyaWRIZWlnaHQ6IGluaXRpYWxQaXhlbHMsXG4gIH07XG5cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIGNvbnN0IHsgcmVmcmVzaFJhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgdGhpcy5zZXREaW1lbnNpb25zT25TdGF0ZSA9IGRlYm91bmNlKHRoaXMuc2V0RGltZW5zaW9uc09uU3RhdGUsIHJlZnJlc2hSYXRlKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuaXNDb21wb25lbnRNb3VudGVkID0gdHJ1ZTtcbiAgICB0aGlzLnNldERpbWVuc2lvbnNPblN0YXRlKCk7XG4gICAgdGhpcy5hdHRhY2hSZXNpemVFdmVudCgpO1xuICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHRoaXMuc2V0RGltZW5zaW9uc09uU3RhdGUoKSwgNTAwKTtcbiAgfVxuXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgIHJldHVybiAhaXNFcXVhbCh0aGlzLnByb3BzLCBuZXh0UHJvcHMpIHx8ICFpc0VxdWFsKHRoaXMuc3RhdGUsIG5leHRTdGF0ZSk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLmlzQ29tcG9uZW50TW91bnRlZCA9IGZhbHNlO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnNldERpbWVuc2lvbnNPblN0YXRlKTtcbiAgfVxuXG4gIHNldERpbWVuc2lvbnNPblN0YXRlID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLmlzQ29tcG9uZW50TW91bnRlZCkge1xuICAgICAgY29uc3QgeyBvZmZzZXRXaWR0aCwgb2Zmc2V0SGVpZ2h0IH0gPSBmaW5kRE9NTm9kZSh0aGlzKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBncmlkV2lkdGg6IG9mZnNldFdpZHRoIHx8IGluaXRpYWxQaXhlbHMsXG4gICAgICAgIGdyaWRIZWlnaHQ6IG9mZnNldEhlaWdodCB8fCBpbml0aWFsUGl4ZWxzLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0U3R5bGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnRoaXMucHJvcHMuY29udGFpbmVyU3R5bGUsXG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgfTtcbiAgfVxuXG4gIGF0dGFjaFJlc2l6ZUV2ZW50KCkge1xuICAgIGlmICh3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuc2V0RGltZW5zaW9uc09uU3RhdGUsIGZhbHNlKTtcbiAgICB9IGVsc2UgaWYgKHdpbmRvdy5hdHRhY2hFdmVudCkge1xuICAgICAgd2luZG93LmF0dGFjaEV2ZW50KCdyZXNpemUnLCB0aGlzLnNldERpbWVuc2lvbnNPblN0YXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93Lm9ucmVzaXplID0gdGhpcy5zZXREaW1lbnNpb25zT25TdGF0ZTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBncmlkV2lkdGgsIGdyaWRIZWlnaHQgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1tYWluLWNvbnRhaW5lclwiIHN0eWxlPXt0aGlzLmdldFN0eWxlKCl9PlxuICAgICAgICA8VGFibGUgey4uLnRoaXMucHJvcHN9IHdpZHRoPXtncmlkV2lkdGh9IGhlaWdodD17Z3JpZEhlaWdodH0gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==