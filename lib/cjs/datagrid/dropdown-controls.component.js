'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp2;

var _templateObject = _taggedTemplateLiteralLoose(['\n  color: ', ';\n  margin: ', ';\n  padding: ', ';\n  transform: rotate(', ');\n'], ['\n  color: ', ';\n  margin: ', ';\n  padding: ', ';\n  transform: rotate(', ');\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _toggleOn = require('react-icons/lib/fa/toggle-on');

var _toggleOn2 = _interopRequireDefault(_toggleOn);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _reactIntl = require('react-intl');

var _reactDropdown = require('@opuscapita/react-dropdown');

var _datagrid = require('./datagrid.props');

require('./dropdown-controls.component.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; } /* eslint-disable react/forbid-prop-types */


var TOGGLE_ON_COLOR = '#3AA57B';
var TOGGLE_OFF_COLOR = '#67707C';
var TOGGLE_SIZE = 20;

// ToggleIconComponent
var Toggle = (0, _styledComponents2.default)(_toggleOn2.default)(_templateObject, function (props) {
  return props.color;
}, function (props) {
  return props.margin || 0;
}, function (props) {
  return props.padding || 0;
}, function (props) {
  return props.rotate ? props.rotate + 'deg' : '';
});

var DropdownControls = (_temp2 = _class = function (_React$PureComponent) {
  _inherits(DropdownControls, _React$PureComponent);

  function DropdownControls() {
    var _temp, _this, _ret;

    _classCallCheck(this, DropdownControls);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.handleRemoveClick = function () {
      if (_this.props.selectedItems.size > 0) {
        _this.props.onRemove();
      }
    }, _this.handleToggleFilteringClick = function () {
      _this.props.toggleFiltering(_this.props.grid);
    }, _this.handleColumnSettingsClick = function () {
      _this.props.openColumnSettingsModal(_this.props.grid);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  DropdownControls.prototype.render = function render() {
    var disabled = this.props.isBusy || this.props.isCreating || this.props.isEditing || this.props.disableActions;
    var menuItems = [];
    if (this.props.filtering) {
      menuItems.push({
        id: this.props.grid.id + '-menu-item-filtering',
        title: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Grid.ShowFilteringRow' }),
        icon: this.props.isFiltering ? _react2.default.createElement(Toggle, { color: TOGGLE_ON_COLOR, size: TOGGLE_SIZE }) : _react2.default.createElement(Toggle, { rotate: '180', color: TOGGLE_OFF_COLOR, size: TOGGLE_SIZE }),
        onClick: this.handleToggleFilteringClick
      });
    }
    if (this.props.dropdownMenuItems && this.props.dropdownMenuItems.length) {
      menuItems = menuItems.concat(this.props.dropdownMenuItems);
    }
    if (this.props.columnSettings) {
      menuItems.push({
        id: this.props.grid.id + '-menu-item-column-settings',
        title: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Grid.ColumnSettings' }),
        onClick: this.handleColumnSettingsClick
      });
    }
    if (this.props.removing) {
      menuItems.push({
        id: this.props.grid.id + '-menu-item-delete',
        title: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Grid.Delete' }),
        disabled: !this.props.selectedItems.has(0),
        onClick: this.handleRemoveClick
      });
    }
    return _react2.default.createElement(_reactDropdown.DropdownMenu, {
      id: this.props.grid.id,
      disabled: disabled,
      menuItems: menuItems
    });
  };

  return DropdownControls;
}(_react2.default.PureComponent), _class.defaultProps = {
  filtering: false,
  removing: false,
  columnSettings: false,
  dropdownMenuItems: [],
  disableActions: false
}, _temp2);
exports.default = DropdownControls;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kcm9wZG93bi1jb250cm9scy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlRPR0dMRV9PTl9DT0xPUiIsIlRPR0dMRV9PRkZfQ09MT1IiLCJUT0dHTEVfU0laRSIsIlRvZ2dsZSIsIkZhVG9nZ2xlT24iLCJwcm9wcyIsImNvbG9yIiwibWFyZ2luIiwicGFkZGluZyIsInJvdGF0ZSIsIkRyb3Bkb3duQ29udHJvbHMiLCJoYW5kbGVSZW1vdmVDbGljayIsInNlbGVjdGVkSXRlbXMiLCJzaXplIiwib25SZW1vdmUiLCJoYW5kbGVUb2dnbGVGaWx0ZXJpbmdDbGljayIsInRvZ2dsZUZpbHRlcmluZyIsImdyaWQiLCJoYW5kbGVDb2x1bW5TZXR0aW5nc0NsaWNrIiwib3BlbkNvbHVtblNldHRpbmdzTW9kYWwiLCJyZW5kZXIiLCJkaXNhYmxlZCIsImlzQnVzeSIsImlzQ3JlYXRpbmciLCJpc0VkaXRpbmciLCJkaXNhYmxlQWN0aW9ucyIsIm1lbnVJdGVtcyIsImZpbHRlcmluZyIsInB1c2giLCJpZCIsInRpdGxlIiwiaWNvbiIsImlzRmlsdGVyaW5nIiwib25DbGljayIsImRyb3Bkb3duTWVudUl0ZW1zIiwibGVuZ3RoIiwiY29uY2F0IiwiY29sdW1uU2V0dGluZ3MiLCJyZW1vdmluZyIsImhhcyIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUVBOztBQUVBOztBQUVBOzs7Ozs7Ozs7OzBGQVpBOzs7QUFjQSxJQUFNQSxrQkFBa0IsU0FBeEI7QUFDQSxJQUFNQyxtQkFBbUIsU0FBekI7QUFDQSxJQUFNQyxjQUFjLEVBQXBCOztBQUVBO0FBQ0EsSUFBTUMsU0FBUyxnQ0FBT0Msa0JBQVAsQ0FBVCxrQkFDSztBQUFBLFNBQVNDLE1BQU1DLEtBQWY7QUFBQSxDQURMLEVBRU07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RlU7QUFHcEJELGtCQUFnQixLQUhJO0FBSXBCSCxxQkFBbUIsRUFKQztBQUtwQlQsa0JBQWdCO0FBTEksQztrQkFyQkhmLGdCIiwiZmlsZSI6ImRyb3Bkb3duLWNvbnRyb2xzLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L2ZvcmJpZC1wcm9wLXR5cGVzICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IEZhVG9nZ2xlT24gZnJvbSAncmVhY3QtaWNvbnMvbGliL2ZhL3RvZ2dsZS1vbic7XG5pbXBvcnQgSW1tdXRhYmxlUHJvcFR5cGVzIGZyb20gJ3JlYWN0LWltbXV0YWJsZS1wcm9wdHlwZXMnO1xuaW1wb3J0IHsgRm9ybWF0dGVkTWVzc2FnZSBhcyBNIH0gZnJvbSAncmVhY3QtaW50bCc7XG5cbmltcG9ydCB7IERyb3Bkb3duTWVudSB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWRyb3Bkb3duJztcblxuaW1wb3J0IHsgZ3JpZFNoYXBlIH0gZnJvbSAnLi9kYXRhZ3JpZC5wcm9wcyc7XG5cbmltcG9ydCAnLi9kcm9wZG93bi1jb250cm9scy5jb21wb25lbnQuc2Nzcyc7XG5cbmNvbnN0IFRPR0dMRV9PTl9DT0xPUiA9ICcjM0FBNTdCJztcbmNvbnN0IFRPR0dMRV9PRkZfQ09MT1IgPSAnIzY3NzA3Qyc7XG5jb25zdCBUT0dHTEVfU0laRSA9IDIwO1xuXG4vLyBUb2dnbGVJY29uQ29tcG9uZW50XG5jb25zdCBUb2dnbGUgPSBzdHlsZWQoRmFUb2dnbGVPbilgXG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLmNvbG9yfTtcbiAgbWFyZ2luOiAke3Byb3BzID0+IHByb3BzLm1hcmdpbiB8fCAwfTtcbiAgcGFkZGluZzogJHtwcm9wcyA9PiBwcm9wcy5wYWRkaW5nIHx8IDB9O1xuICB0cmFuc2Zvcm06IHJvdGF0ZSgke3Byb3BzID0+IChwcm9wcy5yb3RhdGUgPyBgJHtwcm9wcy5yb3RhdGV9ZGVnYCA6ICcnKX0pO1xuYDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJvcGRvd25Db250cm9scyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGdyaWQ6IGdyaWRTaGFwZS5pc1JlcXVpcmVkLFxuICAgIC8vIGFjdGlvbnNcbiAgICB0b2dnbGVGaWx0ZXJpbmc6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgb3BlbkNvbHVtblNldHRpbmdzTW9kYWw6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgLy8gZGF0YVxuICAgIHNlbGVjdGVkSXRlbXM6IEltbXV0YWJsZVByb3BUeXBlcy5saXN0LmlzUmVxdWlyZWQsXG4gICAgaXNCdXN5OiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGlzQ3JlYXRpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgaXNFZGl0aW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGlzRmlsdGVyaW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIC8vIGNvbmZpZ1xuICAgIG9uUmVtb3ZlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGZpbHRlcmluZzogUHJvcFR5cGVzLmJvb2wsXG4gICAgcmVtb3Zpbmc6IFByb3BUeXBlcy5ib29sLFxuICAgIGNvbHVtblNldHRpbmdzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkcm9wZG93bk1lbnVJdGVtczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGRpc2FibGVBY3Rpb25zOiBQcm9wVHlwZXMuYm9vbCxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGZpbHRlcmluZzogZmFsc2UsXG4gICAgcmVtb3Zpbmc6IGZhbHNlLFxuICAgIGNvbHVtblNldHRpbmdzOiBmYWxzZSxcbiAgICBkcm9wZG93bk1lbnVJdGVtczogW10sXG4gICAgZGlzYWJsZUFjdGlvbnM6IGZhbHNlLFxuICB9O1xuXG4gIGhhbmRsZVJlbW92ZUNsaWNrID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuc2l6ZSA+IDApIHtcbiAgICAgIHRoaXMucHJvcHMub25SZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVUb2dnbGVGaWx0ZXJpbmdDbGljayA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLnRvZ2dsZUZpbHRlcmluZyh0aGlzLnByb3BzLmdyaWQpO1xuICB9XG5cbiAgaGFuZGxlQ29sdW1uU2V0dGluZ3NDbGljayA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLm9wZW5Db2x1bW5TZXR0aW5nc01vZGFsKHRoaXMucHJvcHMuZ3JpZCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgZGlzYWJsZWQgPSB0aGlzLnByb3BzLmlzQnVzeVxuICAgICAgICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5pc0NyZWF0aW5nXG4gICAgICAgICAgICAgICAgICB8fCB0aGlzLnByb3BzLmlzRWRpdGluZ1xuICAgICAgICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5kaXNhYmxlQWN0aW9ucztcbiAgICBsZXQgbWVudUl0ZW1zID0gW107XG4gICAgaWYgKHRoaXMucHJvcHMuZmlsdGVyaW5nKSB7XG4gICAgICBtZW51SXRlbXMucHVzaCh7XG4gICAgICAgIGlkOiBgJHt0aGlzLnByb3BzLmdyaWQuaWR9LW1lbnUtaXRlbS1maWx0ZXJpbmdgLFxuICAgICAgICB0aXRsZTogPE0gaWQ9XCJHcmlkLlNob3dGaWx0ZXJpbmdSb3dcIiAvPixcbiAgICAgICAgaWNvbjogdGhpcy5wcm9wcy5pc0ZpbHRlcmluZyA/XG4gICAgICAgICAgPFRvZ2dsZSBjb2xvcj17VE9HR0xFX09OX0NPTE9SfSBzaXplPXtUT0dHTEVfU0laRX0gLz5cbiAgICAgICAgICA6XG4gICAgICAgICAgPFRvZ2dsZSByb3RhdGU9XCIxODBcIiBjb2xvcj17VE9HR0xFX09GRl9DT0xPUn0gc2l6ZT17VE9HR0xFX1NJWkV9IC8+LFxuICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZVRvZ2dsZUZpbHRlcmluZ0NsaWNrLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLmRyb3Bkb3duTWVudUl0ZW1zICYmIHRoaXMucHJvcHMuZHJvcGRvd25NZW51SXRlbXMubGVuZ3RoKSB7XG4gICAgICBtZW51SXRlbXMgPSBtZW51SXRlbXMuY29uY2F0KHRoaXMucHJvcHMuZHJvcGRvd25NZW51SXRlbXMpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5jb2x1bW5TZXR0aW5ncykge1xuICAgICAgbWVudUl0ZW1zLnB1c2goe1xuICAgICAgICBpZDogYCR7dGhpcy5wcm9wcy5ncmlkLmlkfS1tZW51LWl0ZW0tY29sdW1uLXNldHRpbmdzYCxcbiAgICAgICAgdGl0bGU6IDxNIGlkPVwiR3JpZC5Db2x1bW5TZXR0aW5nc1wiIC8+LFxuICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZUNvbHVtblNldHRpbmdzQ2xpY2ssXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMucmVtb3ZpbmcpIHtcbiAgICAgIG1lbnVJdGVtcy5wdXNoKHtcbiAgICAgICAgaWQ6IGAke3RoaXMucHJvcHMuZ3JpZC5pZH0tbWVudS1pdGVtLWRlbGV0ZWAsXG4gICAgICAgIHRpdGxlOiA8TSBpZD1cIkdyaWQuRGVsZXRlXCIgLz4sXG4gICAgICAgIGRpc2FibGVkOiAhdGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLmhhcygwKSxcbiAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVSZW1vdmVDbGljayxcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPERyb3Bkb3duTWVudVxuICAgICAgICBpZD17dGhpcy5wcm9wcy5ncmlkLmlkfVxuICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgIG1lbnVJdGVtcz17bWVudUl0ZW1zfVxuICAgICAgLz5cbiAgICApO1xuICB9XG59XG4iXX0=