function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { MenuItem } from 'react-bootstrap';
import { gridShape } from './datagrid.props';

var DatagridTooltip = /*#__PURE__*/function (_React$PureComponent) {
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
    return /*#__PURE__*/React.createElement("ul", {
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

      return /*#__PURE__*/React.createElement(MenuItem, {
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
}(React.PureComponent);

_defineProperty(DatagridTooltip, "defaultProps", {
  contextMenuItems: null
});

export { DatagridTooltip as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb250ZXh0LW1lbnUuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsIkltbXV0YWJsZVByb3BUeXBlcyIsIk1lbnVJdGVtIiwiZ3JpZFNoYXBlIiwiRGF0YWdyaWRUb29sdGlwIiwicHJvcHMiLCJ4IiwieSIsInBvc2l0aW9uIiwidG9wIiwibGVmdCIsIm1lbnVSZWYiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiaGVpZ2h0Iiwid2lkdGgiLCJzZXRTdGF0ZSIsIm9uQ2xpY2siLCJzZWxlY3RlZEl0ZW1zIiwic2VsZWN0ZWREYXRhIiwic3RhdGUiLCJjb21wb25lbnREaWRNb3VudCIsInJlZnJlc2hNZW51UG9zaXRpb24iLCJjb21wb25lbnREaWRVcGRhdGUiLCJwcmV2UHJvcHMiLCJpc1Zpc2libGUiLCJyZW5kZXIiLCJjb250ZXh0TWVudUl0ZW1zIiwiZGF0YSIsImdyaWQiLCJzdHlsZSIsImRpc3BsYXkiLCJ6SW5kZXgiLCJmaWx0ZXIiLCJkIiwiaW5jbHVkZXMiLCJnZXRJbiIsImlkS2V5UGF0aCIsImMiLCJtYXAiLCJpdGVtIiwiaSIsImRpc2FibGVkIiwiaGVhZGVyIiwiZGl2aWRlciIsInRpdGxlIiwiaGFuZGxlQ29udGV4dE1lbnVJdGVtQ2xpY2siLCJ2YWx1ZSIsIlB1cmVDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0EsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxPQUFPQyxrQkFBUCxNQUErQiwyQkFBL0I7QUFDQSxTQUFTQyxRQUFULFFBQXlCLGlCQUF6QjtBQUNBLFNBQVNDLFNBQVQsUUFBMEIsa0JBQTFCOztJQUVxQkMsZTs7O0FBZW5CLDJCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQ2pCLDRDQUFNQSxLQUFOOztBQURpQiwwRUE0QkcsWUFBTTtBQUFBLHdCQUNULE1BQUtBLEtBREk7QUFBQSxVQUNsQkMsQ0FEa0IsZUFDbEJBLENBRGtCO0FBQUEsVUFDZkMsQ0FEZSxlQUNmQSxDQURlO0FBRTFCLFVBQU1DLFFBQVEsR0FBRztBQUNmQyxRQUFBQSxHQUFHLEVBQUVGLENBRFU7QUFFZkcsUUFBQUEsSUFBSSxFQUFFSjtBQUZTLE9BQWpCOztBQUlBLFVBQUksTUFBS0ssT0FBVCxFQUFrQjtBQUFBLHNCQUNvQkMsTUFEcEI7QUFBQSxZQUNSQyxVQURRLFdBQ1JBLFVBRFE7QUFBQSxZQUNJQyxXQURKLFdBQ0lBLFdBREo7O0FBRWhCLFlBQU1DLElBQUksR0FBRyxNQUFLSixPQUFMLENBQWFLLHFCQUFiLEVBQWI7O0FBRUEsWUFBSVQsQ0FBQyxHQUFHUSxJQUFJLENBQUNFLE1BQVQsR0FBa0JILFdBQXRCLEVBQW1DO0FBQ2pDTixVQUFBQSxRQUFRLENBQUNDLEdBQVQsSUFBZ0JNLElBQUksQ0FBQ0UsTUFBckI7QUFDRDs7QUFDRCxZQUFJWCxDQUFDLEdBQUdTLElBQUksQ0FBQ0csS0FBVCxHQUFpQkwsVUFBckIsRUFBaUM7QUFDL0JMLFVBQUFBLFFBQVEsQ0FBQ0UsSUFBVCxJQUFpQkssSUFBSSxDQUFDRyxLQUF0QjtBQUNEOztBQUNELFlBQUlWLFFBQVEsQ0FBQ0MsR0FBVCxHQUFlLENBQW5CLEVBQXNCO0FBQ3BCRCxVQUFBQSxRQUFRLENBQUNDLEdBQVQsR0FBZU0sSUFBSSxDQUFDRSxNQUFMLEdBQWNILFdBQWQsR0FBNEIsQ0FBQ0EsV0FBVyxHQUFHQyxJQUFJLENBQUNFLE1BQXBCLElBQThCLENBQTFELEdBQThELENBQTdFO0FBQ0Q7O0FBQ0QsWUFBSVQsUUFBUSxDQUFDRSxJQUFULEdBQWdCLENBQXBCLEVBQXVCO0FBQ3JCRixVQUFBQSxRQUFRLENBQUNFLElBQVQsR0FBZ0JLLElBQUksQ0FBQ0csS0FBTCxHQUFhTCxVQUFiLEdBQTBCLENBQUNBLFVBQVUsR0FBR0UsSUFBSSxDQUFDRyxLQUFuQixJQUE0QixDQUF0RCxHQUEwRCxDQUExRTtBQUNEOztBQUNELGNBQUtDLFFBQUwsQ0FBY1gsUUFBZDtBQUNEO0FBQ0YsS0FwRGtCOztBQUFBLGlGQXNEVSxVQUFDWSxPQUFELEVBQVVDLGFBQVYsRUFBeUJDLFlBQXpCO0FBQUEsYUFBMEMsWUFBTTtBQUMzRUYsUUFBQUEsT0FBTyxDQUFDQyxhQUFELEVBQWdCQyxZQUFoQixDQUFQO0FBQ0QsT0FGNEI7QUFBQSxLQXREVjs7QUFFakIsVUFBS1gsT0FBTCxHQUFlLElBQWY7QUFDQSxVQUFLWSxLQUFMLEdBQWE7QUFDWGQsTUFBQUEsR0FBRyxFQUFFSixLQUFLLENBQUNFLENBREE7QUFFWEcsTUFBQUEsSUFBSSxFQUFFTCxLQUFLLENBQUNDO0FBRkQsS0FBYjtBQUhpQjtBQU9sQjs7OztTQUVEa0IsaUIsR0FBQSw2QkFBb0I7QUFDbEIsU0FBS0MsbUJBQUw7QUFDRCxHOztTQUVEQyxrQixHQUFBLDRCQUFtQkMsU0FBbkIsRUFBOEI7QUFBQSx1QkFLeEIsS0FBS3RCLEtBTG1CO0FBQUEsUUFFMUJ1QixTQUYwQixnQkFFMUJBLFNBRjBCO0FBQUEsUUFHMUJ0QixDQUgwQixnQkFHMUJBLENBSDBCO0FBQUEsUUFJMUJDLENBSjBCLGdCQUkxQkEsQ0FKMEI7O0FBTTVCLFFBQ0dvQixTQUFTLENBQUNDLFNBQVYsS0FBd0JBLFNBQXpCLElBQ0lELFNBQVMsQ0FBQ3JCLENBQVYsS0FBZ0JBLENBRHBCLElBRUlxQixTQUFTLENBQUNwQixDQUFWLEtBQWdCQSxDQUh0QixFQUlFO0FBQ0EsV0FBS2tCLG1CQUFMO0FBQ0Q7QUFDRixHOztTQWdDREksTSxHQUFBLGtCQUFTO0FBQUE7O0FBQUEsdUJBR0gsS0FBS3hCLEtBSEY7QUFBQSxRQUVMeUIsZ0JBRkssZ0JBRUxBLGdCQUZLO0FBQUEsUUFFYUMsSUFGYixnQkFFYUEsSUFGYjtBQUFBLFFBRW1CQyxJQUZuQixnQkFFbUJBLElBRm5CO0FBQUEsUUFFeUJYLGFBRnpCLGdCQUV5QkEsYUFGekI7QUFBQSxzQkFJZSxLQUFLRSxLQUpwQjtBQUFBLFFBSUNkLEdBSkQsZUFJQ0EsR0FKRDtBQUFBLFFBSU1DLElBSk4sZUFJTUEsSUFKTjtBQUtQLFFBQU11QixLQUFLLEdBQUc7QUFDWkMsTUFBQUEsT0FBTyxFQUFFLE9BREc7QUFFWkMsTUFBQUEsTUFBTSxFQUFFLEtBRkk7QUFHWjNCLE1BQUFBLFFBQVEsRUFBRSxVQUhFO0FBSVpDLE1BQUFBLEdBQUcsRUFBS0EsR0FBTCxPQUpTO0FBS1pDLE1BQUFBLElBQUksRUFBS0EsSUFBTDtBQUxRLEtBQWQ7QUFPQSxRQUFNWSxZQUFZLEdBQUdTLElBQUksQ0FBQ0ssTUFBTCxDQUFZLFVBQUFDLENBQUM7QUFBQSxhQUFJaEIsYUFBYSxDQUFDaUIsUUFBZCxDQUF1QkQsQ0FBQyxDQUFDRSxLQUFGLENBQVFQLElBQUksQ0FBQ1EsU0FBYixDQUF2QixDQUFKO0FBQUEsS0FBYixDQUFyQjtBQUNBLHdCQUNFO0FBQ0UsTUFBQSxTQUFTLEVBQUMsNkNBRFo7QUFFRSxNQUFBLEtBQUssRUFBRVAsS0FGVDtBQUdFLE1BQUEsR0FBRyxFQUFFLGFBQUNRLENBQUQsRUFBTztBQUFFLFFBQUEsTUFBSSxDQUFDOUIsT0FBTCxHQUFlOEIsQ0FBZjtBQUFtQjtBQUhuQyxPQUtHWCxnQkFBZ0IsSUFDWkEsZ0JBQWdCLENBQUNZLEdBRHJCLElBRUlaLGdCQUFnQixDQUFDWSxHQUFqQixDQUFxQixVQUFDQyxJQUFELEVBQU9DLENBQVAsRUFBYTtBQUFBLFVBQzdCQyxRQUQ2QixHQUNoQkYsSUFEZ0IsQ0FDN0JFLFFBRDZCOztBQUVuQyxVQUFJLE9BQU9GLElBQUksQ0FBQ0UsUUFBWixLQUF5QixVQUE3QixFQUF5QztBQUN2Q0EsUUFBQUEsUUFBUSxHQUFHRixJQUFJLENBQUNFLFFBQUwsQ0FBY3hCLGFBQWQsRUFBNkJDLFlBQTdCLENBQVg7QUFDRDs7QUFDRCwwQkFDRSxvQkFBQyxRQUFEO0FBQ0UsUUFBQSxHQUFHLEVBQUVzQixDQURQLENBQ1U7QUFEVjtBQUVFLFFBQUEsTUFBTSxFQUFFRCxJQUFJLENBQUNHLE1BRmY7QUFHRSxRQUFBLE9BQU8sRUFBRUgsSUFBSSxDQUFDSSxPQUhoQjtBQUlFLFFBQUEsUUFBUSxFQUFFRixRQUpaO0FBS0UsUUFBQSxLQUFLLEVBQUVGLElBQUksQ0FBQ0ssS0FMZDtBQU1FLFFBQUEsT0FBTyxFQUNMSCxRQUFRLElBQUksQ0FBQ0YsSUFBSSxDQUFDdkIsT0FBbEIsR0FDSSxJQURKLEdBRUksTUFBSSxDQUFDNkIsMEJBQUwsQ0FBZ0NOLElBQUksQ0FBQ3ZCLE9BQXJDLEVBQThDQyxhQUE5QyxFQUE2REMsWUFBN0Q7QUFUUixTQVlHcUIsSUFBSSxDQUFDTyxLQVpSLENBREY7QUFnQkQsS0FyQkUsQ0FQUCxDQURGO0FBZ0NELEc7OztFQXRIMENuRCxLQUFLLENBQUNvRCxhOztnQkFBOUIvQyxlLGtCQVdHO0FBQ3BCMEIsRUFBQUEsZ0JBQWdCLEVBQUU7QUFERSxDOztTQVhIMUIsZSIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L2ZvcmJpZC1wcm9wLXR5cGVzICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgeyBNZW51SXRlbSB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgeyBncmlkU2hhcGUgfSBmcm9tICcuL2RhdGFncmlkLnByb3BzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0YWdyaWRUb29sdGlwIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgZ3JpZDogZ3JpZFNoYXBlLmlzUmVxdWlyZWQsXG4gICAgZGF0YTogSW1tdXRhYmxlUHJvcFR5cGVzLmxpc3QuaXNSZXF1aXJlZCxcbiAgICBzZWxlY3RlZEl0ZW1zOiBJbW11dGFibGVQcm9wVHlwZXMubGlzdC5pc1JlcXVpcmVkLFxuICAgIGNvbnRleHRNZW51SXRlbXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpc1Zpc2libGU6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgeDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIHk6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGNvbnRleHRNZW51SXRlbXM6IG51bGwsXG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLm1lbnVSZWYgPSBudWxsO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB0b3A6IHByb3BzLnksXG4gICAgICBsZWZ0OiBwcm9wcy54LFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnJlZnJlc2hNZW51UG9zaXRpb24oKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICBjb25zdCB7XG4gICAgICBpc1Zpc2libGUsXG4gICAgICB4LFxuICAgICAgeSxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoXG4gICAgICAocHJldlByb3BzLmlzVmlzaWJsZSAhPT0gaXNWaXNpYmxlKVxuICAgICAgfHwgKHByZXZQcm9wcy54ICE9PSB4KVxuICAgICAgfHwgKHByZXZQcm9wcy55ICE9PSB5KVxuICAgICkge1xuICAgICAgdGhpcy5yZWZyZXNoTWVudVBvc2l0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgcmVmcmVzaE1lbnVQb3NpdGlvbiA9ICgpID0+IHtcbiAgICBjb25zdCB7IHgsIHkgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgcG9zaXRpb24gPSB7XG4gICAgICB0b3A6IHksXG4gICAgICBsZWZ0OiB4LFxuICAgIH07XG4gICAgaWYgKHRoaXMubWVudVJlZikge1xuICAgICAgY29uc3QgeyBpbm5lcldpZHRoLCBpbm5lckhlaWdodCB9ID0gd2luZG93O1xuICAgICAgY29uc3QgcmVjdCA9IHRoaXMubWVudVJlZi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgaWYgKHkgKyByZWN0LmhlaWdodCA+IGlubmVySGVpZ2h0KSB7XG4gICAgICAgIHBvc2l0aW9uLnRvcCAtPSByZWN0LmhlaWdodDtcbiAgICAgIH1cbiAgICAgIGlmICh4ICsgcmVjdC53aWR0aCA+IGlubmVyV2lkdGgpIHtcbiAgICAgICAgcG9zaXRpb24ubGVmdCAtPSByZWN0LndpZHRoO1xuICAgICAgfVxuICAgICAgaWYgKHBvc2l0aW9uLnRvcCA8IDApIHtcbiAgICAgICAgcG9zaXRpb24udG9wID0gcmVjdC5oZWlnaHQgPCBpbm5lckhlaWdodCA/IChpbm5lckhlaWdodCAtIHJlY3QuaGVpZ2h0KSAvIDIgOiAwO1xuICAgICAgfVxuICAgICAgaWYgKHBvc2l0aW9uLmxlZnQgPCAwKSB7XG4gICAgICAgIHBvc2l0aW9uLmxlZnQgPSByZWN0LndpZHRoIDwgaW5uZXJXaWR0aCA/IChpbm5lcldpZHRoIC0gcmVjdC53aWR0aCkgLyAyIDogMDtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2V0U3RhdGUocG9zaXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUNvbnRleHRNZW51SXRlbUNsaWNrID0gKG9uQ2xpY2ssIHNlbGVjdGVkSXRlbXMsIHNlbGVjdGVkRGF0YSkgPT4gKCkgPT4ge1xuICAgIG9uQ2xpY2soc2VsZWN0ZWRJdGVtcywgc2VsZWN0ZWREYXRhKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgY29udGV4dE1lbnVJdGVtcywgZGF0YSwgZ3JpZCwgc2VsZWN0ZWRJdGVtcyxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHRvcCwgbGVmdCB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBzdHlsZSA9IHtcbiAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICB6SW5kZXg6IDEwMDAwLFxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICB0b3A6IGAke3RvcH1weGAsXG4gICAgICBsZWZ0OiBgJHtsZWZ0fXB4YCxcbiAgICB9O1xuICAgIGNvbnN0IHNlbGVjdGVkRGF0YSA9IGRhdGEuZmlsdGVyKGQgPT4gc2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhkLmdldEluKGdyaWQuaWRLZXlQYXRoKSkpO1xuICAgIHJldHVybiAoXG4gICAgICA8dWxcbiAgICAgICAgY2xhc3NOYW1lPVwiZHJvcGRvd24tbWVudSBvYy1kYXRhZ3JpZC1jb250ZXh0LW1lbnUgb3BlblwiXG4gICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgcmVmPXsoYykgPT4geyB0aGlzLm1lbnVSZWYgPSBjOyB9fVxuICAgICAgPlxuICAgICAgICB7Y29udGV4dE1lbnVJdGVtc1xuICAgICAgICAgICYmIGNvbnRleHRNZW51SXRlbXMubWFwXG4gICAgICAgICAgJiYgY29udGV4dE1lbnVJdGVtcy5tYXAoKGl0ZW0sIGkpID0+IHtcbiAgICAgICAgICAgIGxldCB7IGRpc2FibGVkIH0gPSBpdGVtO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBpdGVtLmRpc2FibGVkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgIGRpc2FibGVkID0gaXRlbS5kaXNhYmxlZChzZWxlY3RlZEl0ZW1zLCBzZWxlY3RlZERhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPE1lbnVJdGVtXG4gICAgICAgICAgICAgICAga2V5PXtpfSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgICAgICAgICAgaGVhZGVyPXtpdGVtLmhlYWRlcn1cbiAgICAgICAgICAgICAgICBkaXZpZGVyPXtpdGVtLmRpdmlkZXJ9XG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgICAgIHRpdGxlPXtpdGVtLnRpdGxlfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e1xuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQgfHwgIWl0ZW0ub25DbGlja1xuICAgICAgICAgICAgICAgICAgICA/IG51bGxcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLmhhbmRsZUNvbnRleHRNZW51SXRlbUNsaWNrKGl0ZW0ub25DbGljaywgc2VsZWN0ZWRJdGVtcywgc2VsZWN0ZWREYXRhKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtpdGVtLnZhbHVlfVxuICAgICAgICAgICAgICA8L01lbnVJdGVtPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KX1cbiAgICAgIDwvdWw+XG4gICAgKTtcbiAgfVxufVxuIl19