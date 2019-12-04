function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { MenuItem } from 'react-bootstrap';
import { gridShape } from './datagrid.props';

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
    return React.createElement("ul", {
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

      return React.createElement(MenuItem, {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb250ZXh0LW1lbnUuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsIkltbXV0YWJsZVByb3BUeXBlcyIsIk1lbnVJdGVtIiwiZ3JpZFNoYXBlIiwiRGF0YWdyaWRUb29sdGlwIiwicHJvcHMiLCJ4IiwieSIsInBvc2l0aW9uIiwidG9wIiwibGVmdCIsIm1lbnVSZWYiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiaGVpZ2h0Iiwid2lkdGgiLCJzZXRTdGF0ZSIsIm9uQ2xpY2siLCJzZWxlY3RlZEl0ZW1zIiwic2VsZWN0ZWREYXRhIiwic3RhdGUiLCJjb21wb25lbnREaWRNb3VudCIsInJlZnJlc2hNZW51UG9zaXRpb24iLCJjb21wb25lbnREaWRVcGRhdGUiLCJwcmV2UHJvcHMiLCJpc1Zpc2libGUiLCJyZW5kZXIiLCJjb250ZXh0TWVudUl0ZW1zIiwiZGF0YSIsImdyaWQiLCJzdHlsZSIsImRpc3BsYXkiLCJ6SW5kZXgiLCJmaWx0ZXIiLCJkIiwiaW5jbHVkZXMiLCJnZXRJbiIsImlkS2V5UGF0aCIsImMiLCJtYXAiLCJpdGVtIiwiaSIsImRpc2FibGVkIiwiaGVhZGVyIiwiZGl2aWRlciIsInRpdGxlIiwiaGFuZGxlQ29udGV4dE1lbnVJdGVtQ2xpY2siLCJ2YWx1ZSIsIlB1cmVDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0EsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxPQUFPQyxrQkFBUCxNQUErQiwyQkFBL0I7QUFDQSxTQUFTQyxRQUFULFFBQXlCLGlCQUF6QjtBQUNBLFNBQVNDLFNBQVQsUUFBMEIsa0JBQTFCOztJQUVxQkMsZTs7Ozs7QUFlbkIsMkJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFDakIsNENBQU1BLEtB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RSxRQUFBLE9BQU8sRUFBRUgsSUFBSSxDQUFDSSxPQUhoQjtBQUlFLFFBQUEsUUFBUSxFQUFFRixRQUpaO0FBS0UsUUFBQSxLQUFLLEVBQUVGLElBQUksQ0FBQ0ssS0FMZDtBQU1FLFFBQUEsT0FBTyxFQUNMSCxRQUFRLElBQUksQ0FBQ0YsSUFBSSxDQUFDdkIsT0FBbEIsR0FDSSxJQURKLEdBRUksTUFBSSxDQUFDNkIsMEJBQUwsQ0FBZ0NOLElBQUksQ0FBQ3ZCLE9BQXJDLEVBQThDQyxhQUE5QyxFQUE2REMsWUFBN0Q7QUFUUixTQVlHcUIsSUFBSSxDQUFDTyxLQVpSLENBREY7QUFnQkQsS0FyQkUsQ0FQUCxDQURGO0FBZ0NELEc7OztFQXRIMENuRCxLQUFLLENBQUNvRCxhOztnQkFBOUIvQyxlLGtCQVdHO0FBQ3BCMEIsRUFBQUEsZ0JBQWdCLEVBQUU7QUFERSxDOztTQVhIMUIsZSIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L2ZvcmJpZC1wcm9wLXR5cGVzICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgeyBNZW51SXRlbSB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgeyBncmlkU2hhcGUgfSBmcm9tICcuL2RhdGFncmlkLnByb3BzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0YWdyaWRUb29sdGlwIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgZ3JpZDogZ3JpZFNoYXBlLmlzUmVxdWlyZWQsXG4gICAgZGF0YTogSW1tdXRhYmxlUHJvcFR5cGVzLmxpc3QuaXNSZXF1aXJlZCxcbiAgICBzZWxlY3RlZEl0ZW1zOiBJbW11dGFibGVQcm9wVHlwZXMubGlzdC5pc1JlcXVpcmVkLFxuICAgIGNvbnRleHRNZW51SXRlbXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBpc1Zpc2libGU6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgeDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIHk6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGNvbnRleHRNZW51SXRlbXM6IG51bGwsXG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLm1lbnVSZWYgPSBudWxsO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB0b3A6IHByb3BzLnksXG4gICAgICBsZWZ0OiBwcm9wcy54LFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnJlZnJlc2hNZW51UG9zaXRpb24oKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICBjb25zdCB7XG4gICAgICBpc1Zpc2libGUsXG4gICAgICB4LFxuICAgICAgeSxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoXG4gICAgICAocHJldlByb3BzLmlzVmlzaWJsZSAhPT0gaXNWaXNpYmxlKVxuICAgICAgfHwgKHByZXZQcm9wcy54ICE9PSB4KVxuICAgICAgfHwgKHByZXZQcm9wcy55ICE9PSB5KVxuICAgICkge1xuICAgICAgdGhpcy5yZWZyZXNoTWVudVBvc2l0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgcmVmcmVzaE1lbnVQb3NpdGlvbiA9ICgpID0+IHtcbiAgICBjb25zdCB7IHgsIHkgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgcG9zaXRpb24gPSB7XG4gICAgICB0b3A6IHksXG4gICAgICBsZWZ0OiB4LFxuICAgIH07XG4gICAgaWYgKHRoaXMubWVudVJlZikge1xuICAgICAgY29uc3QgeyBpbm5lcldpZHRoLCBpbm5lckhlaWdodCB9ID0gd2luZG93O1xuICAgICAgY29uc3QgcmVjdCA9IHRoaXMubWVudVJlZi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgaWYgKHkgKyByZWN0LmhlaWdodCA+IGlubmVySGVpZ2h0KSB7XG4gICAgICAgIHBvc2l0aW9uLnRvcCAtPSByZWN0LmhlaWdodDtcbiAgICAgIH1cbiAgICAgIGlmICh4ICsgcmVjdC53aWR0aCA+IGlubmVyV2lkdGgpIHtcbiAgICAgICAgcG9zaXRpb24ubGVmdCAtPSByZWN0LndpZHRoO1xuICAgICAgfVxuICAgICAgaWYgKHBvc2l0aW9uLnRvcCA8IDApIHtcbiAgICAgICAgcG9zaXRpb24udG9wID0gcmVjdC5oZWlnaHQgPCBpbm5lckhlaWdodCA/IChpbm5lckhlaWdodCAtIHJlY3QuaGVpZ2h0KSAvIDIgOiAwO1xuICAgICAgfVxuICAgICAgaWYgKHBvc2l0aW9uLmxlZnQgPCAwKSB7XG4gICAgICAgIHBvc2l0aW9uLmxlZnQgPSByZWN0LndpZHRoIDwgaW5uZXJXaWR0aCA/IChpbm5lcldpZHRoIC0gcmVjdC53aWR0aCkgLyAyIDogMDtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2V0U3RhdGUocG9zaXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUNvbnRleHRNZW51SXRlbUNsaWNrID0gKG9uQ2xpY2ssIHNlbGVjdGVkSXRlbXMsIHNlbGVjdGVkRGF0YSkgPT4gKCkgPT4ge1xuICAgIG9uQ2xpY2soc2VsZWN0ZWRJdGVtcywgc2VsZWN0ZWREYXRhKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgY29udGV4dE1lbnVJdGVtcywgZGF0YSwgZ3JpZCwgc2VsZWN0ZWRJdGVtcyxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHRvcCwgbGVmdCB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBzdHlsZSA9IHtcbiAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICB6SW5kZXg6IDEwMDAwLFxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICB0b3A6IGAke3RvcH1weGAsXG4gICAgICBsZWZ0OiBgJHtsZWZ0fXB4YCxcbiAgICB9O1xuICAgIGNvbnN0IHNlbGVjdGVkRGF0YSA9IGRhdGEuZmlsdGVyKGQgPT4gc2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhkLmdldEluKGdyaWQuaWRLZXlQYXRoKSkpO1xuICAgIHJldHVybiAoXG4gICAgICA8dWxcbiAgICAgICAgY2xhc3NOYW1lPVwiZHJvcGRvd24tbWVudSBvYy1kYXRhZ3JpZC1jb250ZXh0LW1lbnUgb3BlblwiXG4gICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgcmVmPXsoYykgPT4geyB0aGlzLm1lbnVSZWYgPSBjOyB9fVxuICAgICAgPlxuICAgICAgICB7Y29udGV4dE1lbnVJdGVtc1xuICAgICAgICAgICYmIGNvbnRleHRNZW51SXRlbXMubWFwXG4gICAgICAgICAgJiYgY29udGV4dE1lbnVJdGVtcy5tYXAoKGl0ZW0sIGkpID0+IHtcbiAgICAgICAgICAgIGxldCB7IGRpc2FibGVkIH0gPSBpdGVtO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBpdGVtLmRpc2FibGVkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgIGRpc2FibGVkID0gaXRlbS5kaXNhYmxlZChzZWxlY3RlZEl0ZW1zLCBzZWxlY3RlZERhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPE1lbnVJdGVtXG4gICAgICAgICAgICAgICAga2V5PXtpfSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgICAgICAgICAgaGVhZGVyPXtpdGVtLmhlYWRlcn1cbiAgICAgICAgICAgICAgICBkaXZpZGVyPXtpdGVtLmRpdmlkZXJ9XG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgICAgIHRpdGxlPXtpdGVtLnRpdGxlfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e1xuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQgfHwgIWl0ZW0ub25DbGlja1xuICAgICAgICAgICAgICAgICAgICA/IG51bGxcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLmhhbmRsZUNvbnRleHRNZW51SXRlbUNsaWNrKGl0ZW0ub25DbGljaywgc2VsZWN0ZWRJdGVtcywgc2VsZWN0ZWREYXRhKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtpdGVtLnZhbHVlfVxuICAgICAgICAgICAgICA8L01lbnVJdGVtPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KX1cbiAgICAgIDwvdWw+XG4gICAgKTtcbiAgfVxufVxuIl19