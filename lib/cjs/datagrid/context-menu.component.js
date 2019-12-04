"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));

var _reactBootstrap = require("react-bootstrap");

var _datagrid = require("./datagrid.props");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DatagridTooltip =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(DatagridTooltip, _React$PureComponent);

  function DatagridTooltip(props) {
    var _this;

    _this = _React$PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "refreshMenuPosition", function () {
      var _this$props = _this.props,
          x = _this$props.x,
          y = _this$props.y;
      var position = {
        top: y,
        left: x
      };

      if (_this.menuRef) {
        var _window = window,
            innerWidth = _window.innerWidth,
            innerHeight = _window.innerHeight;

        var rect = _this.menuRef.getBoundingClientRect();

        if (y + rect.height > innerHeight) {
          position.top -= rect.height;
        }

        if (x + rect.width > innerWidth) {
          position.left -= rect.width;
        }

        if (position.top < 0) {
          position.top = rect.height < innerHeight ? (innerHeight - rect.height) / 2 : 0;
        }

        if (position.left < 0) {
          position.left = rect.width < innerWidth ? (innerWidth - rect.width) / 2 : 0;
        }

        _this.setState(position);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleContextMenuItemClick", function (onClick, selectedItems, selectedData) {
      return function () {
        onClick(selectedItems, selectedData);
      };
    });

    _this.menuRef = null;
    _this.state = {
      top: props.y,
      left: props.x
    };
    return _this;
  }

  var _proto = DatagridTooltip.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.refreshMenuPosition();
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this$props2 = this.props,
        isVisible = _this$props2.isVisible,
        x = _this$props2.x,
        y = _this$props2.y;

    if (prevProps.isVisible !== isVisible || prevProps.x !== x || prevProps.y !== y) {
      this.refreshMenuPosition();
    }
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props3 = this.props,
        contextMenuItems = _this$props3.contextMenuItems,
        data = _this$props3.data,
        grid = _this$props3.grid,
        selectedItems = _this$props3.selectedItems;
    var _this$state = this.state,
        top = _this$state.top,
        left = _this$state.left;
    var style = {
      display: 'block',
      zIndex: 10000,
      position: 'absolute',
      top: top + "px",
      left: left + "px"
    };
    var selectedData = data.filter(function (d) {
      return selectedItems.includes(d.getIn(grid.idKeyPath));
    });
    return _react["default"].createElement("ul", {
      className: "dropdown-menu oc-datagrid-context-menu open",
      style: style,
      ref: function ref(c) {
        _this2.menuRef = c;
      }
    }, contextMenuItems && contextMenuItems.map && contextMenuItems.map(function (item, i) {
      var disabled = item.disabled;

      if (typeof item.disabled === 'function') {
        disabled = item.disabled(selectedItems, selectedData);
      }

      return _react["default"].createElement(_reactBootstrap.MenuItem, {
        key: i // eslint-disable-line
        ,
        header: item.header,
        divider: item.divider,
        disabled: disabled,
        title: item.title,
        onClick: disabled || !item.onClick ? null : _this2.handleContextMenuItemClick(item.onClick, selectedItems, selectedData)
      }, item.value);
    }));
  };

  return DatagridTooltip;
}(_react["default"].PureComponent);

exports["default"] = DatagridTooltip;

_defineProperty(DatagridTooltip, "defaultProps", {
  contextMenuItems: null
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb250ZXh0LW1lbnUuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJEYXRhZ3JpZFRvb2x0aXAiLCJwcm9wcyIsIngiLCJ5IiwicG9zaXRpb24iLCJ0b3AiLCJsZWZ0IiwibWVudVJlZiIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsInJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJoZWlnaHQiLCJ3aWR0aCIsInNldFN0YXRlIiwib25DbGljayIsInNlbGVjdGVkSXRlbXMiLCJzZWxlY3RlZERhdGEiLCJzdGF0ZSIsImNvbXBvbmVudERpZE1vdW50IiwicmVmcmVzaE1lbnVQb3NpdGlvbiIsImNvbXBvbmVudERpZFVwZGF0ZSIsInByZXZQcm9wcyIsImlzVmlzaWJsZSIsInJlbmRlciIsImNvbnRleHRNZW51SXRlbXMiLCJkYXRhIiwiZ3JpZCIsInN0eWxlIiwiZGlzcGxheSIsInpJbmRleCIsImZpbHRlciIsImQiLCJpbmNsdWRlcyIsImdldEluIiwiaWRLZXlQYXRoIiwiYyIsIm1hcCIsIml0ZW0iLCJpIiwiZGlzYWJsZWQiLCJoZWFkZXIiLCJkaXZpZGVyIiwidGl0bGUiLCJoYW5kbGVDb250ZXh0TWVudUl0ZW1DbGljayIsInZhbHVlIiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0lBRXFCQSxlOzs7OztBQWVuQiwyQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUNqQiw0Q0FBTUEsS0FBTjs7QUFEaUIsMEVBNEJHLFlBQU07QUFBQSx3QkFDVCxNQUFLQSxLQURJO0FBQUEsVUFDbEJDLENBRGtCLGVBQ2xCQSxDQURrQjtBQUFBLFVBQ2ZDLENBRGUsZUFDZkEsQ0FEZTtBQUUxQixVQUFNQyxRQUFRLEdBQUc7QUFDZkMsUUFBQUEsR0FBRyxFQUFFRixDQURVO0FBRWZHLFFBQUFBLElBQUks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TUFBSSxDQUFDNkIsMEJBQUwsQ0FBZ0NOLElBQUksQ0FBQ3ZCLE9BQXJDLEVBQThDQyxhQUE5QyxFQUE2REMsWUFBN0Q7QUFUUixTQVlHcUIsSUFBSSxDQUFDTyxLQVpSLENBREY7QUFnQkQsS0FyQkUsQ0FQUCxDQURGO0FBZ0NELEc7OztFQXRIMENDLGtCQUFNQyxhOzs7O2dCQUE5QmhELGUsa0JBV0c7QUFDcEIwQixFQUFBQSxnQkFBZ0IsRUFBRTtBQURFLEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9mb3JiaWQtcHJvcC10eXBlcyAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgSW1tdXRhYmxlUHJvcFR5cGVzIGZyb20gJ3JlYWN0LWltbXV0YWJsZS1wcm9wdHlwZXMnO1xuaW1wb3J0IHsgTWVudUl0ZW0gfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IHsgZ3JpZFNoYXBlIH0gZnJvbSAnLi9kYXRhZ3JpZC5wcm9wcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGFncmlkVG9vbHRpcCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGdyaWQ6IGdyaWRTaGFwZS5pc1JlcXVpcmVkLFxuICAgIGRhdGE6IEltbXV0YWJsZVByb3BUeXBlcy5saXN0LmlzUmVxdWlyZWQsXG4gICAgc2VsZWN0ZWRJdGVtczogSW1tdXRhYmxlUHJvcFR5cGVzLmxpc3QuaXNSZXF1aXJlZCxcbiAgICBjb250ZXh0TWVudUl0ZW1zOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaXNWaXNpYmxlOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIHg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICB5OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBjb250ZXh0TWVudUl0ZW1zOiBudWxsLFxuICB9XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5tZW51UmVmID0gbnVsbDtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdG9wOiBwcm9wcy55LFxuICAgICAgbGVmdDogcHJvcHMueCxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5yZWZyZXNoTWVudVBvc2l0aW9uKCk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG4gICAgY29uc3Qge1xuICAgICAgaXNWaXNpYmxlLFxuICAgICAgeCxcbiAgICAgIHksXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKFxuICAgICAgKHByZXZQcm9wcy5pc1Zpc2libGUgIT09IGlzVmlzaWJsZSlcbiAgICAgIHx8IChwcmV2UHJvcHMueCAhPT0geClcbiAgICAgIHx8IChwcmV2UHJvcHMueSAhPT0geSlcbiAgICApIHtcbiAgICAgIHRoaXMucmVmcmVzaE1lbnVQb3NpdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIHJlZnJlc2hNZW51UG9zaXRpb24gPSAoKSA9PiB7XG4gICAgY29uc3QgeyB4LCB5IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHBvc2l0aW9uID0ge1xuICAgICAgdG9wOiB5LFxuICAgICAgbGVmdDogeCxcbiAgICB9O1xuICAgIGlmICh0aGlzLm1lbnVSZWYpIHtcbiAgICAgIGNvbnN0IHsgaW5uZXJXaWR0aCwgaW5uZXJIZWlnaHQgfSA9IHdpbmRvdztcbiAgICAgIGNvbnN0IHJlY3QgPSB0aGlzLm1lbnVSZWYuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgIGlmICh5ICsgcmVjdC5oZWlnaHQgPiBpbm5lckhlaWdodCkge1xuICAgICAgICBwb3NpdGlvbi50b3AgLT0gcmVjdC5oZWlnaHQ7XG4gICAgICB9XG4gICAgICBpZiAoeCArIHJlY3Qud2lkdGggPiBpbm5lcldpZHRoKSB7XG4gICAgICAgIHBvc2l0aW9uLmxlZnQgLT0gcmVjdC53aWR0aDtcbiAgICAgIH1cbiAgICAgIGlmIChwb3NpdGlvbi50b3AgPCAwKSB7XG4gICAgICAgIHBvc2l0aW9uLnRvcCA9IHJlY3QuaGVpZ2h0IDwgaW5uZXJIZWlnaHQgPyAoaW5uZXJIZWlnaHQgLSByZWN0LmhlaWdodCkgLyAyIDogMDtcbiAgICAgIH1cbiAgICAgIGlmIChwb3NpdGlvbi5sZWZ0IDwgMCkge1xuICAgICAgICBwb3NpdGlvbi5sZWZ0ID0gcmVjdC53aWR0aCA8IGlubmVyV2lkdGggPyAoaW5uZXJXaWR0aCAtIHJlY3Qud2lkdGgpIC8gMiA6IDA7XG4gICAgICB9XG4gICAgICB0aGlzLnNldFN0YXRlKHBvc2l0aW9uKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVDb250ZXh0TWVudUl0ZW1DbGljayA9IChvbkNsaWNrLCBzZWxlY3RlZEl0ZW1zLCBzZWxlY3RlZERhdGEpID0+ICgpID0+IHtcbiAgICBvbkNsaWNrKHNlbGVjdGVkSXRlbXMsIHNlbGVjdGVkRGF0YSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNvbnRleHRNZW51SXRlbXMsIGRhdGEsIGdyaWQsIHNlbGVjdGVkSXRlbXMsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyB0b3AsIGxlZnQgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3Qgc3R5bGUgPSB7XG4gICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgICAgekluZGV4OiAxMDAwMCxcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgdG9wOiBgJHt0b3B9cHhgLFxuICAgICAgbGVmdDogYCR7bGVmdH1weGAsXG4gICAgfTtcbiAgICBjb25zdCBzZWxlY3RlZERhdGEgPSBkYXRhLmZpbHRlcihkID0+IHNlbGVjdGVkSXRlbXMuaW5jbHVkZXMoZC5nZXRJbihncmlkLmlkS2V5UGF0aCkpKTtcbiAgICByZXR1cm4gKFxuICAgICAgPHVsXG4gICAgICAgIGNsYXNzTmFtZT1cImRyb3Bkb3duLW1lbnUgb2MtZGF0YWdyaWQtY29udGV4dC1tZW51IG9wZW5cIlxuICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgIHJlZj17KGMpID0+IHsgdGhpcy5tZW51UmVmID0gYzsgfX1cbiAgICAgID5cbiAgICAgICAge2NvbnRleHRNZW51SXRlbXNcbiAgICAgICAgICAmJiBjb250ZXh0TWVudUl0ZW1zLm1hcFxuICAgICAgICAgICYmIGNvbnRleHRNZW51SXRlbXMubWFwKChpdGVtLCBpKSA9PiB7XG4gICAgICAgICAgICBsZXQgeyBkaXNhYmxlZCB9ID0gaXRlbTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbS5kaXNhYmxlZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICBkaXNhYmxlZCA9IGl0ZW0uZGlzYWJsZWQoc2VsZWN0ZWRJdGVtcywgc2VsZWN0ZWREYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxNZW51SXRlbVxuICAgICAgICAgICAgICAgIGtleT17aX0gLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAgICAgICAgIGhlYWRlcj17aXRlbS5oZWFkZXJ9XG4gICAgICAgICAgICAgICAgZGl2aWRlcj17aXRlbS5kaXZpZGVyfVxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgICB0aXRsZT17aXRlbS50aXRsZX1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkIHx8ICFpdGVtLm9uQ2xpY2tcbiAgICAgICAgICAgICAgICAgICAgPyBudWxsXG4gICAgICAgICAgICAgICAgICAgIDogdGhpcy5oYW5kbGVDb250ZXh0TWVudUl0ZW1DbGljayhpdGVtLm9uQ2xpY2ssIHNlbGVjdGVkSXRlbXMsIHNlbGVjdGVkRGF0YSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7aXRlbS52YWx1ZX1cbiAgICAgICAgICAgICAgPC9NZW51SXRlbT5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSl9XG4gICAgICA8L3VsPlxuICAgICk7XG4gIH1cbn1cbiJdfQ==