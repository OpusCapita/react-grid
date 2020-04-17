"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _fa = require("react-icons/fa");

var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));

var _reactIntl = require("react-intl");

var _reactDropdown = require("@opuscapita/react-dropdown");

var _datagrid = require("./datagrid.props");

require("./dropdown-controls.component.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n  color: ", ";\n  margin: ", ";\n  padding: ", ";\n  transform: rotate(", ");\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteralLoose(strings, raw) { if (!raw) { raw = strings.slice(0); } strings.raw = raw; return strings; }

var TOGGLE_ON_COLOR = '#3AA57B';
var TOGGLE_OFF_COLOR = '#67707C';
var TOGGLE_SIZE = 20; // ToggleIconComponent

var Toggle = (0, _styledComponents["default"])(_fa.FaToggleOn)(_templateObject(), function (props) {
  return props.color;
}, function (props) {
  return props.margin || 0;
}, function (props) {
  return props.padding || 0;
}, function (props) {
  return props.rotate ? props.rotate + "deg" : '';
});

var DropdownControls = /*#__PURE__*/function (_React$PureComponent) {
  _inheritsLoose(DropdownControls, _React$PureComponent);

  function DropdownControls() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "handleRemoveClick", function () {
      if (_this.props.selectedItems.size > 0) {
        _this.props.onRemove();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleToggleFilteringClick", function () {
      _this.props.toggleFiltering(_this.props.grid);
    });

    _defineProperty(_assertThisInitialized(_this), "handleColumnSettingsClick", function () {
      _this.props.openColumnSettingsModal(_this.props.grid);
    });

    return _this;
  }

  var _proto = DropdownControls.prototype;

  _proto.render = function render() {
    var disabled = this.props.isBusy || this.props.isCreating || this.props.isEditing || this.props.disableActions;
    var menuItems = [];

    if (this.props.filtering) {
      menuItems.push({
        id: this.props.grid.id + "-menu-item-filtering",
        title: /*#__PURE__*/_react["default"].createElement(_reactIntl.FormattedMessage, {
          id: "Grid.ShowFilteringRow"
        }),
        icon: this.props.isFiltering ? /*#__PURE__*/_react["default"].createElement(Toggle, {
          color: TOGGLE_ON_COLOR,
          size: TOGGLE_SIZE
        }) : /*#__PURE__*/_react["default"].createElement(Toggle, {
          rotate: "180",
          color: TOGGLE_OFF_COLOR,
          size: TOGGLE_SIZE
        }),
        onClick: this.handleToggleFilteringClick
      });
    }

    if (this.props.dropdownMenuItems && this.props.dropdownMenuItems.length) {
      menuItems = menuItems.concat(this.props.dropdownMenuItems);
    }

    if (this.props.columnSettings) {
      menuItems.push({
        id: this.props.grid.id + "-menu-item-column-settings",
        title: /*#__PURE__*/_react["default"].createElement(_reactIntl.FormattedMessage, {
          id: "Grid.ColumnSettings"
        }),
        onClick: this.handleColumnSettingsClick
      });
    }

    if (this.props.removing) {
      menuItems.push({
        id: this.props.grid.id + "-menu-item-delete",
        title: /*#__PURE__*/_react["default"].createElement(_reactIntl.FormattedMessage, {
          id: "Grid.Delete"
        }),
        disabled: !this.props.selectedItems.has(0),
        onClick: this.handleRemoveClick
      });
    }

    return /*#__PURE__*/_react["default"].createElement(_reactDropdown.DropdownMenu, {
      id: this.props.grid.id,
      disabled: disabled,
      menuItems: menuItems
    });
  };

  return DropdownControls;
}(_react["default"].PureComponent);

exports["default"] = DropdownControls;

_defineProperty(DropdownControls, "defaultProps", {
  filtering: false,
  removing: false,
  columnSettings: false,
  dropdownMenuItems: [],
  disableActions: false
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kcm9wZG93bi1jb250cm9scy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlRPR0dMRV9PTl9DT0xPUiIsIlRPR0dMRV9PRkZfQ09MT1IiLCJUT0dHTEVfU0laRSIsIlRvZ2dsZSIsIkZhVG9nZ2xlT24iLCJwcm9wcyIsImNvbG9yIiwibWFyZ2luIiwicGFkZGluZyIsInJvdGF0ZSIsIkRyb3Bkb3duQ29udHJvbHMiLCJzZWxlY3RlZEl0ZW1zIiwic2l6ZSIsIm9uUmVtb3ZlIiwidG9nZ2xlRmlsdGVyaW5nIiwiZ3JpZCIsIm9wZW5Db2x1bW5TZXR0aW5nc01vZGFsIiwicmVuZGVyIiwiZGlzYWJsZWQiLCJpc0J1c3kiLCJpc0NyZWF0aW5nIiwiaXNFZGl0aW5nIiwiZGlzYWJsZUFjdGlvbnMiLCJtZW51SXRlbXMiLCJmaWx0ZXJpbmciLCJwdXNoIiwiaWQiLCJ0aXRsZSIsImljb24iLCJpc0ZpbHRlcmluZyIsIm9uQ2xpY2siLCJoYW5kbGVUb2dnbGVGaWx0ZXJpbmdDbGljayIsImRyb3Bkb3duTWVudUl0ZW1zIiwibGVuZ3RoIiwiY29uY2F0IiwiY29sdW1uU2V0dGluZ3MiLCJoYW5kbGVDb2x1bW5TZXR0aW5nc0NsaWNrIiwicmVtb3ZpbmciLCJoYXMiLCJoYW5kbGVSZW1vdmVDbGljayIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLGVBQWUsR0FBRyxTQUF4QjtBQUNBLElBQU1DLGdCQUFnQixHQUFHLFNBQXpCO0FBQ0EsSUFBTUMsV0FBVyxHQUFHLEVBQXBCLEMsQ0FFQTs7QUFDQSxJQUFNQyxNQUFNLEdBQUcsa0NBQU9DLGNBQVAsQ0FBSCxvQkFDRCxVQUFBQyxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFWO0FBQUEs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QUFBQSxRQUFRLEVBQUUsQ0FBQyxLQUFLYixLQUFMLENBQVdNLGFBQVgsQ0FBeUIyQixHQUF6QixDQUE2QixDQUE3QixDQUhFO0FBSWJSLFFBQUFBLE9BQU8sRUFBRSxLQUFLUztBQUpELE9BQWY7QUFNRDs7QUFDRCx3QkFBTyxnQ0FBQywyQkFBRDtBQUFjLE1BQUEsRUFBRSxFQUFFLEtBQUtsQyxLQUFMLENBQVdVLElBQVgsQ0FBZ0JXLEVBQWxDO0FBQXNDLE1BQUEsUUFBUSxFQUFFUixRQUFoRDtBQUEwRCxNQUFBLFNBQVMsRUFBRUs7QUFBckUsTUFBUDtBQUNELEc7OztFQWhGMkNpQixrQkFBTUMsYTs7OztnQkFBL0IvQixnQixrQkFxQkc7QUFDcEJjLEVBQUFBLFNBQVMsRUFBRSxLQURTO0FBRXBCYSxFQUFBQSxRQUFRLEVBQUUsS0FGVTtBQUdwQkYsRUFBQUEsY0FBYyxFQUFFLEtBSEk7QUFJcEJILEVBQUFBLGlCQUFpQixFQUFFLEVBSkM7QUFLcEJWLEVBQUFBLGNBQWMsRUFBRTtBQUxJLEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9mb3JiaWQtcHJvcC10eXBlcyAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7IEZhVG9nZ2xlT24gfSBmcm9tICdyZWFjdC1pY29ucy9mYSc7XG5pbXBvcnQgSW1tdXRhYmxlUHJvcFR5cGVzIGZyb20gJ3JlYWN0LWltbXV0YWJsZS1wcm9wdHlwZXMnO1xuaW1wb3J0IHsgRm9ybWF0dGVkTWVzc2FnZSBhcyBNIH0gZnJvbSAncmVhY3QtaW50bCc7XG5cbmltcG9ydCB7IERyb3Bkb3duTWVudSB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWRyb3Bkb3duJztcblxuaW1wb3J0IHsgZ3JpZFNoYXBlIH0gZnJvbSAnLi9kYXRhZ3JpZC5wcm9wcyc7XG5cbmltcG9ydCAnLi9kcm9wZG93bi1jb250cm9scy5jb21wb25lbnQuc2Nzcyc7XG5cbmNvbnN0IFRPR0dMRV9PTl9DT0xPUiA9ICcjM0FBNTdCJztcbmNvbnN0IFRPR0dMRV9PRkZfQ09MT1IgPSAnIzY3NzA3Qyc7XG5jb25zdCBUT0dHTEVfU0laRSA9IDIwO1xuXG4vLyBUb2dnbGVJY29uQ29tcG9uZW50XG5jb25zdCBUb2dnbGUgPSBzdHlsZWQoRmFUb2dnbGVPbilgXG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLmNvbG9yfTtcbiAgbWFyZ2luOiAke3Byb3BzID0+IHByb3BzLm1hcmdpbiB8fCAwfTtcbiAgcGFkZGluZzogJHtwcm9wcyA9PiBwcm9wcy5wYWRkaW5nIHx8IDB9O1xuICB0cmFuc2Zvcm06IHJvdGF0ZSgke3Byb3BzID0+IChwcm9wcy5yb3RhdGUgPyBgJHtwcm9wcy5yb3RhdGV9ZGVnYCA6ICcnKX0pO1xuYDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJvcGRvd25Db250cm9scyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGdyaWQ6IGdyaWRTaGFwZS5pc1JlcXVpcmVkLFxuICAgIC8vIGFjdGlvbnNcbiAgICB0b2dnbGVGaWx0ZXJpbmc6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgb3BlbkNvbHVtblNldHRpbmdzTW9kYWw6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgLy8gZGF0YVxuICAgIHNlbGVjdGVkSXRlbXM6IEltbXV0YWJsZVByb3BUeXBlcy5saXN0LmlzUmVxdWlyZWQsXG4gICAgaXNCdXN5OiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGlzQ3JlYXRpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgaXNFZGl0aW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGlzRmlsdGVyaW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIC8vIGNvbmZpZ1xuICAgIG9uUmVtb3ZlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGZpbHRlcmluZzogUHJvcFR5cGVzLmJvb2wsXG4gICAgcmVtb3Zpbmc6IFByb3BUeXBlcy5ib29sLFxuICAgIGNvbHVtblNldHRpbmdzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkcm9wZG93bk1lbnVJdGVtczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGRpc2FibGVBY3Rpb25zOiBQcm9wVHlwZXMuYm9vbCxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGZpbHRlcmluZzogZmFsc2UsXG4gICAgcmVtb3Zpbmc6IGZhbHNlLFxuICAgIGNvbHVtblNldHRpbmdzOiBmYWxzZSxcbiAgICBkcm9wZG93bk1lbnVJdGVtczogW10sXG4gICAgZGlzYWJsZUFjdGlvbnM6IGZhbHNlLFxuICB9O1xuXG4gIGhhbmRsZVJlbW92ZUNsaWNrID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuc2l6ZSA+IDApIHtcbiAgICAgIHRoaXMucHJvcHMub25SZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlVG9nZ2xlRmlsdGVyaW5nQ2xpY2sgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy50b2dnbGVGaWx0ZXJpbmcodGhpcy5wcm9wcy5ncmlkKTtcbiAgfTtcblxuICBoYW5kbGVDb2x1bW5TZXR0aW5nc0NsaWNrID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMub3BlbkNvbHVtblNldHRpbmdzTW9kYWwodGhpcy5wcm9wcy5ncmlkKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgZGlzYWJsZWQgPSB0aGlzLnByb3BzLmlzQnVzeVxuICAgICAgfHwgdGhpcy5wcm9wcy5pc0NyZWF0aW5nXG4gICAgICB8fCB0aGlzLnByb3BzLmlzRWRpdGluZ1xuICAgICAgfHwgdGhpcy5wcm9wcy5kaXNhYmxlQWN0aW9ucztcbiAgICBsZXQgbWVudUl0ZW1zID0gW107XG4gICAgaWYgKHRoaXMucHJvcHMuZmlsdGVyaW5nKSB7XG4gICAgICBtZW51SXRlbXMucHVzaCh7XG4gICAgICAgIGlkOiBgJHt0aGlzLnByb3BzLmdyaWQuaWR9LW1lbnUtaXRlbS1maWx0ZXJpbmdgLFxuICAgICAgICB0aXRsZTogPE0gaWQ9XCJHcmlkLlNob3dGaWx0ZXJpbmdSb3dcIiAvPixcbiAgICAgICAgaWNvbjogdGhpcy5wcm9wcy5pc0ZpbHRlcmluZyA/IChcbiAgICAgICAgICA8VG9nZ2xlIGNvbG9yPXtUT0dHTEVfT05fQ09MT1J9IHNpemU9e1RPR0dMRV9TSVpFfSAvPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxUb2dnbGUgcm90YXRlPVwiMTgwXCIgY29sb3I9e1RPR0dMRV9PRkZfQ09MT1J9IHNpemU9e1RPR0dMRV9TSVpFfSAvPlxuICAgICAgICApLFxuICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZVRvZ2dsZUZpbHRlcmluZ0NsaWNrLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLmRyb3Bkb3duTWVudUl0ZW1zICYmIHRoaXMucHJvcHMuZHJvcGRvd25NZW51SXRlbXMubGVuZ3RoKSB7XG4gICAgICBtZW51SXRlbXMgPSBtZW51SXRlbXMuY29uY2F0KHRoaXMucHJvcHMuZHJvcGRvd25NZW51SXRlbXMpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5jb2x1bW5TZXR0aW5ncykge1xuICAgICAgbWVudUl0ZW1zLnB1c2goe1xuICAgICAgICBpZDogYCR7dGhpcy5wcm9wcy5ncmlkLmlkfS1tZW51LWl0ZW0tY29sdW1uLXNldHRpbmdzYCxcbiAgICAgICAgdGl0bGU6IDxNIGlkPVwiR3JpZC5Db2x1bW5TZXR0aW5nc1wiIC8+LFxuICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZUNvbHVtblNldHRpbmdzQ2xpY2ssXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMucmVtb3ZpbmcpIHtcbiAgICAgIG1lbnVJdGVtcy5wdXNoKHtcbiAgICAgICAgaWQ6IGAke3RoaXMucHJvcHMuZ3JpZC5pZH0tbWVudS1pdGVtLWRlbGV0ZWAsXG4gICAgICAgIHRpdGxlOiA8TSBpZD1cIkdyaWQuRGVsZXRlXCIgLz4sXG4gICAgICAgIGRpc2FibGVkOiAhdGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLmhhcygwKSxcbiAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVSZW1vdmVDbGljayxcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gPERyb3Bkb3duTWVudSBpZD17dGhpcy5wcm9wcy5ncmlkLmlkfSBkaXNhYmxlZD17ZGlzYWJsZWR9IG1lbnVJdGVtcz17bWVudUl0ZW1zfSAvPjtcbiAgfVxufVxuIl19