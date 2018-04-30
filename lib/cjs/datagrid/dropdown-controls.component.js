'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp2; /* eslint-disable react/forbid-prop-types */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _reactIntl = require('react-intl');

var _reactIcons = require('@opuscapita/react-icons');

var _reactDropdown = require('@opuscapita/react-dropdown');

var _datagrid = require('./datagrid.props');

require('./dropdown-controls.component.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DropdownControls = (_temp2 = _class = function (_React$PureComponent) {
  _inherits(DropdownControls, _React$PureComponent);

  function DropdownControls() {
    var _temp, _this, _ret;

    _classCallCheck(this, DropdownControls);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.handleRemoveClick = function () {
      if (_this.props.selectedItems.has(0)) {
        _this.props.remove(_this.props.grid, _this.props.onRemove);
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
        icon: this.props.isFiltering ? _react2.default.createElement(_reactIcons.Icon, {
          type: 'indicator',
          name: 'ok',
          width: 18,
          height: 18
        }) : undefined,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kcm9wZG93bi1jb250cm9scy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkRyb3Bkb3duQ29udHJvbHMiLCJoYW5kbGVSZW1vdmVDbGljayIsInByb3BzIiwic2VsZWN0ZWRJdGVtcyIsImhhcyIsInJlbW92ZSIsImdyaWQiLCJvblJlbW92ZSIsImhhbmRsZVRvZ2dsZUZpbHRlcmluZ0NsaWNrIiwidG9nZ2xlRmlsdGVyaW5nIiwiaGFuZGxlQ29sdW1uU2V0dGluZ3NDbGljayIsIm9wZW5Db2x1bW5TZXR0aW5nc01vZGFsIiwicmVuZGVyIiwiZGlzYWJsZWQiLCJpc0J1c3kiLCJpc0NyZWF0aW5nIiwiaXNFZGl0aW5nIiwiZGlzYWJsZUFjdGlvbnMiLCJtZW51SXRlbXMiLCJmaWx0ZXJpbmciLCJwdXNoIiwiaWQiLCJ0aXRsZSIsImljb24iLCJpc0ZpbHRlcmluZyIsInVuZGVmaW5lZCIsIm9uQ2xpY2siLCJkcm9wZG93bk1lbnVJdGVtcyIsImxlbmd0aCIsImNvbmNhdCIsImNvbHVtblNldHRpbmdzIiwicmVtb3ZpbmciLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7OztvQkFBQTs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBR0E7Ozs7Ozs7Ozs7SUFFcUJBLGdCOzs7Ozs7Ozs7Ozs7Z0tBOEJuQkMsaUIsR0FBb0IsWUFBTTtBQUN4QixVQUFJLE1BQUtDLEtBQUwsQ0FBV0MsYUFBWCxDQUF5QkMsR0FBekIsQ0FBNkIsQ0FBN0IsQ0FBSixFQUFxQztBQUNuQyxjQUFLRixLQUFMLENBQVdHLE1BQVgsQ0FBa0IsTUFBS0gsS0FBTCxDQUFXSSxJQUE3QixFQUFtQyxNQUFLSixLQUFMLENBQVdLLFFBQTlDO0FBQ0Q7QUFDRixLLFFBRURDLDBCLEdBQTZCLFlBQU07QUFDakMsWUFBS04sS0FBTCxDQUFXTyxlQUFYLENBQTJCLE1BQUtQLEtBQUwsQ0FBV0ksSUFBdEM7QUFDRCxLLFFBRURJLHlCLEdBQTRCLFlBQU07QUFDaEMsWUFBS1IsS0FBTCxDQUFXUyx1QkFBWCxDQUFtQyxNQUFLVCxLQUFMLENBQVdJLElBQTlDO0FBQ0QsSzs7OzZCQUVETSxNLHFCQUFTO0FBQ1AsUUFBTUMsV0FBVyxLQUFLWCxLQUFMLENBQVdZLE1BQVgsSUFDQSxLQUFLWixLQUFMLENBQVdhLFVBRFgsSUFFQSxLQUFLYixLQUFMLENBQVdjLFNBRlgsSUFHQSxLQUFLZCxLQUFMLENBQVdlLGNBSDVCO0FBSUEsUUFBSUMsWUFBWSxFQUFoQjtBQUNBLFFBQUksS0FBS2hCLEtBQUwsQ0FBV2lCLFNBQWYsRUFBMEI7QUFDeEJELGdCQUFVRSxJQUFWLENBQWU7QUFDYkMsWUFBTyxLQUFLbkIsS0FBTCxDQUFXSSxJQUFYLENBQWdCZSxFQUF2Qix5QkFEYTtBQUViQyxlQUFPLDZEQUFHLElBQUcsdUJBQU4sR0FGTTtBQUdiQyxjQUFNLEtBQUtyQixLQUFMLENBQVdzQixXQUFYLEdBQ0o7QUFDRSxnQkFBSyxXQURQO0FBRUUsZ0JBQUssSUFGUDtBQUdFLGlCQUFPLEVBSFQ7QUFJRSxrQkFBUTtBQUpWLFVBREksR0FNQ0MsU0FUTTtBQVViQyxpQkFBUyxLQUFLbEI7QUFWRCxPQUFmO0FBWUQ7QUFDRCxRQUFJLEtBQUtOLEtBQUwsQ0FBV3lCLGlCQUFYLElBQWdDLEtBQUt6QixLQUFMLENBQVd5QixpQkFBWCxDQUE2QkMsTUFBakUsRUFBeUU7QUFDdkVWLGtCQUFZQSxVQUFVVyxNQUFWLENBQWlCLEtBQUszQixLQUFMLENBQVd5QixpQkFBNUIsQ0FBWjtBQUNEO0FBQ0QsUUFBSSxLQUFLekIsS0FBTCxDQUFXNEIsY0FBZixFQUErQjtBQUM3QlosZ0JBQVVFLElBQVYsQ0FBZTtBQUNiQyxZQUFPLEtBQUtuQixLQUFMLENBQVdJLElBQVgsQ0FBZ0JlLEVBQXZCLCtCQURhO0FBRWJDLGVBQU8sNkRBQUcsSUFBRyxxQkFBTixHQUZNO0FBR2JJLGlCQUFTLEtBQUtoQjtBQUhELE9BQWY7QUFLRDtBQUNELFFBQUksS0FBS1IsS0FBTCxDQUFXNkIsUUFBZixFQUF5QjtBQUN2QmIsZ0JBQVVFLElBQVYsQ0FBZTtBQUNiQyxZQUFPLEtBQUtuQixLQUFMLENBQVdJLElBQVgsQ0FBZ0JlLEVBQXZCLHNCQURhO0FBRWJDLGVBQU8sNkRBQUcsSUFBRyxhQUFOLEdBRk07QUFHYlQsa0JBQVUsQ0FBQyxLQUFLWCxLQUFMLENBQVdDLGFBQVgsQ0FBeUJDLEdBQXpCLENBQTZCLENBQTdCLENBSEU7QUFJYnNCLGlCQUFTLEtBQUt6QjtBQUpELE9BQWY7QUFNRDtBQUNELFdBQ0U7QUFDRSxVQUFJLEtBQUtDLEtBQUwsQ0FBV0ksSUFBWCxDQUFnQmUsRUFEdEI7QUFFRSxnQkFBVVIsUUFGWjtBQUdFLGlCQUFXSztBQUhiLE1BREY7QUFPRCxHOzs7RUF6RjJDLGdCQUFNYyxhLFVBc0IzQ0MsWSxHQUFlO0FBQ3BCZCxhQUFXLEtBRFM7QUFFcEJZLFlBQVUsS0FGVTtBQUdwQkQsa0JBQWdCLEtBSEk7QUFJcEJILHFCQUFtQixFQUpDO0FBS3BCVixrQkFBZ0I7QUFMSSxDO2tCQXRCSGpCLGdCIiwiZmlsZSI6ImRyb3Bkb3duLWNvbnRyb2xzLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L2ZvcmJpZC1wcm9wLXR5cGVzICovXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XHJcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XHJcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgYXMgTSB9IGZyb20gJ3JlYWN0LWludGwnO1xyXG5pbXBvcnQgeyBJY29uIH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtaWNvbnMnO1xyXG5pbXBvcnQgeyBEcm9wZG93bk1lbnUgfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1kcm9wZG93bic7XHJcblxyXG5pbXBvcnQgeyBncmlkU2hhcGUgfSBmcm9tICcuL2RhdGFncmlkLnByb3BzJztcclxuXHJcblxyXG5pbXBvcnQgJy4vZHJvcGRvd24tY29udHJvbHMuY29tcG9uZW50LnNjc3MnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJvcGRvd25Db250cm9scyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xyXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XHJcbiAgICBncmlkOiBncmlkU2hhcGUuaXNSZXF1aXJlZCxcclxuICAgIC8vIGFjdGlvbnNcclxuICAgIHJlbW92ZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgIHRvZ2dsZUZpbHRlcmluZzogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgIG9wZW5Db2x1bW5TZXR0aW5nc01vZGFsOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgLy8gZGF0YVxyXG4gICAgc2VsZWN0ZWRJdGVtczogSW1tdXRhYmxlUHJvcFR5cGVzLmxpc3QuaXNSZXF1aXJlZCxcclxuICAgIGlzQnVzeTogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcclxuICAgIGlzQ3JlYXRpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICBpc0VkaXRpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICBpc0ZpbHRlcmluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcclxuICAgIC8vIGNvbmZpZ1xyXG4gICAgb25SZW1vdmU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICBmaWx0ZXJpbmc6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgcmVtb3Zpbmc6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgY29sdW1uU2V0dGluZ3M6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgZHJvcGRvd25NZW51SXRlbXM6IFByb3BUeXBlcy5hcnJheSxcclxuICAgIGRpc2FibGVBY3Rpb25zOiBQcm9wVHlwZXMuYm9vbCxcclxuICB9O1xyXG5cclxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xyXG4gICAgZmlsdGVyaW5nOiBmYWxzZSxcclxuICAgIHJlbW92aW5nOiBmYWxzZSxcclxuICAgIGNvbHVtblNldHRpbmdzOiBmYWxzZSxcclxuICAgIGRyb3Bkb3duTWVudUl0ZW1zOiBbXSxcclxuICAgIGRpc2FibGVBY3Rpb25zOiBmYWxzZSxcclxuICB9O1xyXG5cclxuICBoYW5kbGVSZW1vdmVDbGljayA9ICgpID0+IHtcclxuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuaGFzKDApKSB7XHJcbiAgICAgIHRoaXMucHJvcHMucmVtb3ZlKHRoaXMucHJvcHMuZ3JpZCwgdGhpcy5wcm9wcy5vblJlbW92ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoYW5kbGVUb2dnbGVGaWx0ZXJpbmdDbGljayA9ICgpID0+IHtcclxuICAgIHRoaXMucHJvcHMudG9nZ2xlRmlsdGVyaW5nKHRoaXMucHJvcHMuZ3JpZCk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVDb2x1bW5TZXR0aW5nc0NsaWNrID0gKCkgPT4ge1xyXG4gICAgdGhpcy5wcm9wcy5vcGVuQ29sdW1uU2V0dGluZ3NNb2RhbCh0aGlzLnByb3BzLmdyaWQpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgZGlzYWJsZWQgPSB0aGlzLnByb3BzLmlzQnVzeVxyXG4gICAgICAgICAgICAgICAgICB8fCB0aGlzLnByb3BzLmlzQ3JlYXRpbmdcclxuICAgICAgICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5pc0VkaXRpbmdcclxuICAgICAgICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5kaXNhYmxlQWN0aW9ucztcclxuICAgIGxldCBtZW51SXRlbXMgPSBbXTtcclxuICAgIGlmICh0aGlzLnByb3BzLmZpbHRlcmluZykge1xyXG4gICAgICBtZW51SXRlbXMucHVzaCh7XHJcbiAgICAgICAgaWQ6IGAke3RoaXMucHJvcHMuZ3JpZC5pZH0tbWVudS1pdGVtLWZpbHRlcmluZ2AsXHJcbiAgICAgICAgdGl0bGU6IDxNIGlkPVwiR3JpZC5TaG93RmlsdGVyaW5nUm93XCIgLz4sXHJcbiAgICAgICAgaWNvbjogdGhpcy5wcm9wcy5pc0ZpbHRlcmluZyA/XHJcbiAgICAgICAgICA8SWNvblxyXG4gICAgICAgICAgICB0eXBlPVwiaW5kaWNhdG9yXCJcclxuICAgICAgICAgICAgbmFtZT1cIm9rXCJcclxuICAgICAgICAgICAgd2lkdGg9ezE4fVxyXG4gICAgICAgICAgICBoZWlnaHQ9ezE4fVxyXG4gICAgICAgICAgLz4gOiB1bmRlZmluZWQsXHJcbiAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVUb2dnbGVGaWx0ZXJpbmdDbGljayxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5wcm9wcy5kcm9wZG93bk1lbnVJdGVtcyAmJiB0aGlzLnByb3BzLmRyb3Bkb3duTWVudUl0ZW1zLmxlbmd0aCkge1xyXG4gICAgICBtZW51SXRlbXMgPSBtZW51SXRlbXMuY29uY2F0KHRoaXMucHJvcHMuZHJvcGRvd25NZW51SXRlbXMpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMucHJvcHMuY29sdW1uU2V0dGluZ3MpIHtcclxuICAgICAgbWVudUl0ZW1zLnB1c2goe1xyXG4gICAgICAgIGlkOiBgJHt0aGlzLnByb3BzLmdyaWQuaWR9LW1lbnUtaXRlbS1jb2x1bW4tc2V0dGluZ3NgLFxyXG4gICAgICAgIHRpdGxlOiA8TSBpZD1cIkdyaWQuQ29sdW1uU2V0dGluZ3NcIiAvPixcclxuICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZUNvbHVtblNldHRpbmdzQ2xpY2ssXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMucHJvcHMucmVtb3ZpbmcpIHtcclxuICAgICAgbWVudUl0ZW1zLnB1c2goe1xyXG4gICAgICAgIGlkOiBgJHt0aGlzLnByb3BzLmdyaWQuaWR9LW1lbnUtaXRlbS1kZWxldGVgLFxyXG4gICAgICAgIHRpdGxlOiA8TSBpZD1cIkdyaWQuRGVsZXRlXCIgLz4sXHJcbiAgICAgICAgZGlzYWJsZWQ6ICF0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuaGFzKDApLFxyXG4gICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlUmVtb3ZlQ2xpY2ssXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPERyb3Bkb3duTWVudVxyXG4gICAgICAgIGlkPXt0aGlzLnByb3BzLmdyaWQuaWR9XHJcbiAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICAgIG1lbnVJdGVtcz17bWVudUl0ZW1zfVxyXG4gICAgICAvPlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl19