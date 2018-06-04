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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kcm9wZG93bi1jb250cm9scy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkRyb3Bkb3duQ29udHJvbHMiLCJoYW5kbGVSZW1vdmVDbGljayIsInByb3BzIiwic2VsZWN0ZWRJdGVtcyIsInNpemUiLCJvblJlbW92ZSIsImhhbmRsZVRvZ2dsZUZpbHRlcmluZ0NsaWNrIiwidG9nZ2xlRmlsdGVyaW5nIiwiZ3JpZCIsImhhbmRsZUNvbHVtblNldHRpbmdzQ2xpY2siLCJvcGVuQ29sdW1uU2V0dGluZ3NNb2RhbCIsInJlbmRlciIsImRpc2FibGVkIiwiaXNCdXN5IiwiaXNDcmVhdGluZyIsImlzRWRpdGluZyIsImRpc2FibGVBY3Rpb25zIiwibWVudUl0ZW1zIiwiZmlsdGVyaW5nIiwicHVzaCIsImlkIiwidGl0bGUiLCJpY29uIiwiaXNGaWx0ZXJpbmciLCJ1bmRlZmluZWQiLCJvbkNsaWNrIiwiZHJvcGRvd25NZW51SXRlbXMiLCJsZW5ndGgiLCJjb25jYXQiLCJjb2x1bW5TZXR0aW5ncyIsInJlbW92aW5nIiwiaGFzIiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7OztvQkFBQTs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBR0E7Ozs7Ozs7Ozs7SUFFcUJBLGdCOzs7Ozs7Ozs7Ozs7Z0tBNkJuQkMsaUIsR0FBb0IsWUFBTTtBQUN4QixVQUFJLE1BQUtDLEtBQUwsQ0FBV0MsYUFBWCxDQUF5QkMsSUFBekIsR0FBZ0MsQ0FBcEMsRUFBdUM7QUFDckMsY0FBS0YsS0FBTCxDQUFXRyxRQUFYO0FBQ0Q7QUFDRixLLFFBRURDLDBCLEdBQTZCLFlBQU07QUFDakMsWUFBS0osS0FBTCxDQUFXSyxlQUFYLENBQTJCLE1BQUtMLEtBQUwsQ0FBV00sSUFBdEM7QUFDRCxLLFFBRURDLHlCLEdBQTRCLFlBQU07QUFDaEMsWUFBS1AsS0FBTCxDQUFXUSx1QkFBWCxDQUFtQyxNQUFLUixLQUFMLENBQVdNLElBQTlDO0FBQ0QsSzs7OzZCQUVERyxNLHFCQUFTO0FBQ1AsUUFBTUMsV0FBVyxLQUFLVixLQUFMLENBQVdXLE1BQVgsSUFDQSxLQUFLWCxLQUFMLENBQVdZLFVBRFgsSUFFQSxLQUFLWixLQUFMLENBQVdhLFNBRlgsSUFHQSxLQUFLYixLQUFMLENBQVdjLGNBSDVCO0FBSUEsUUFBSUMsWUFBWSxFQUFoQjtBQUNBLFFBQUksS0FBS2YsS0FBTCxDQUFXZ0IsU0FBZixFQUEwQjtBQUN4QkQsZ0JBQVVFLElBQVYsQ0FBZTtBQUNiQyxZQUFPLEtBQUtsQixLQUFMLENBQVdNLElBQVgsQ0FBZ0JZLEVBQXZCLHlCQURhO0FBRWJDLGVBQU8sOEJBQUMsMkJBQUQsSUFBRyxJQUFHLHVCQUFOLEdBRk07QUFHYkMsY0FBTSxLQUFLcEIsS0FBTCxDQUFXcUIsV0FBWCxHQUNKLDhCQUFDLGdCQUFEO0FBQ0UsZ0JBQUssV0FEUDtBQUVFLGdCQUFLLElBRlA7QUFHRSxpQkFBTyxFQUhUO0FBSUUsa0JBQVE7QUFKVixVQURJLEdBTUNDLFNBVE07QUFVYkMsaUJBQVMsS0FBS25CO0FBVkQsT0FBZjtBQVlEO0FBQ0QsUUFBSSxLQUFLSixLQUFMLENBQVd3QixpQkFBWCxJQUFnQyxLQUFLeEIsS0FBTCxDQUFXd0IsaUJBQVgsQ0FBNkJDLE1BQWpFLEVBQXlFO0FBQ3ZFVixrQkFBWUEsVUFBVVcsTUFBVixDQUFpQixLQUFLMUIsS0FBTCxDQUFXd0IsaUJBQTVCLENBQVo7QUFDRDtBQUNELFFBQUksS0FBS3hCLEtBQUwsQ0FBVzJCLGNBQWYsRUFBK0I7QUFDN0JaLGdCQUFVRSxJQUFWLENBQWU7QUFDYkMsWUFBTyxLQUFLbEIsS0FBTCxDQUFXTSxJQUFYLENBQWdCWSxFQUF2QiwrQkFEYTtBQUViQyxlQUFPLDhCQUFDLDJCQUFELElBQUcsSUFBRyxxQkFBTixHQUZNO0FBR2JJLGlCQUFTLEtBQUtoQjtBQUhELE9BQWY7QUFLRDtBQUNELFFBQUksS0FBS1AsS0FBTCxDQUFXNEIsUUFBZixFQUF5QjtBQUN2QmIsZ0JBQVVFLElBQVYsQ0FBZTtBQUNiQyxZQUFPLEtBQUtsQixLQUFMLENBQVdNLElBQVgsQ0FBZ0JZLEVBQXZCLHNCQURhO0FBRWJDLGVBQU8sOEJBQUMsMkJBQUQsSUFBRyxJQUFHLGFBQU4sR0FGTTtBQUdiVCxrQkFBVSxDQUFDLEtBQUtWLEtBQUwsQ0FBV0MsYUFBWCxDQUF5QjRCLEdBQXpCLENBQTZCLENBQTdCLENBSEU7QUFJYk4saUJBQVMsS0FBS3hCO0FBSkQsT0FBZjtBQU1EO0FBQ0QsV0FDRSw4QkFBQywyQkFBRDtBQUNFLFVBQUksS0FBS0MsS0FBTCxDQUFXTSxJQUFYLENBQWdCWSxFQUR0QjtBQUVFLGdCQUFVUixRQUZaO0FBR0UsaUJBQVdLO0FBSGIsTUFERjtBQU9ELEc7OztFQXhGMkNlLGdCQUFNQyxhLFVBcUIzQ0MsWSxHQUFlO0FBQ3BCaEIsYUFBVyxLQURTO0FBRXBCWSxZQUFVLEtBRlU7QUFHcEJELGtCQUFnQixLQUhJO0FBSXBCSCxxQkFBbUIsRUFKQztBQUtwQlYsa0JBQWdCO0FBTEksQztrQkFyQkhoQixnQiIsImZpbGUiOiJkcm9wZG93bi1jb250cm9scy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9mb3JiaWQtcHJvcC10eXBlcyAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgSW1tdXRhYmxlUHJvcFR5cGVzIGZyb20gJ3JlYWN0LWltbXV0YWJsZS1wcm9wdHlwZXMnO1xuaW1wb3J0IHsgRm9ybWF0dGVkTWVzc2FnZSBhcyBNIH0gZnJvbSAncmVhY3QtaW50bCc7XG5pbXBvcnQgeyBJY29uIH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtaWNvbnMnO1xuaW1wb3J0IHsgRHJvcGRvd25NZW51IH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtZHJvcGRvd24nO1xuXG5pbXBvcnQgeyBncmlkU2hhcGUgfSBmcm9tICcuL2RhdGFncmlkLnByb3BzJztcblxuXG5pbXBvcnQgJy4vZHJvcGRvd24tY29udHJvbHMuY29tcG9uZW50LnNjc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEcm9wZG93bkNvbnRyb2xzIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgZ3JpZDogZ3JpZFNoYXBlLmlzUmVxdWlyZWQsXG4gICAgLy8gYWN0aW9uc1xuICAgIHRvZ2dsZUZpbHRlcmluZzogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvcGVuQ29sdW1uU2V0dGluZ3NNb2RhbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAvLyBkYXRhXG4gICAgc2VsZWN0ZWRJdGVtczogSW1tdXRhYmxlUHJvcFR5cGVzLmxpc3QuaXNSZXF1aXJlZCxcbiAgICBpc0J1c3k6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgaXNDcmVhdGluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpc0VkaXRpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgaXNGaWx0ZXJpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgLy8gY29uZmlnXG4gICAgb25SZW1vdmU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgZmlsdGVyaW5nOiBQcm9wVHlwZXMuYm9vbCxcbiAgICByZW1vdmluZzogUHJvcFR5cGVzLmJvb2wsXG4gICAgY29sdW1uU2V0dGluZ3M6IFByb3BUeXBlcy5ib29sLFxuICAgIGRyb3Bkb3duTWVudUl0ZW1zOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgZGlzYWJsZUFjdGlvbnM6IFByb3BUeXBlcy5ib29sLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgZmlsdGVyaW5nOiBmYWxzZSxcbiAgICByZW1vdmluZzogZmFsc2UsXG4gICAgY29sdW1uU2V0dGluZ3M6IGZhbHNlLFxuICAgIGRyb3Bkb3duTWVudUl0ZW1zOiBbXSxcbiAgICBkaXNhYmxlQWN0aW9uczogZmFsc2UsXG4gIH07XG5cbiAgaGFuZGxlUmVtb3ZlQ2xpY2sgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5zaXplID4gMCkge1xuICAgICAgdGhpcy5wcm9wcy5vblJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVRvZ2dsZUZpbHRlcmluZ0NsaWNrID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMudG9nZ2xlRmlsdGVyaW5nKHRoaXMucHJvcHMuZ3JpZCk7XG4gIH1cblxuICBoYW5kbGVDb2x1bW5TZXR0aW5nc0NsaWNrID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMub3BlbkNvbHVtblNldHRpbmdzTW9kYWwodGhpcy5wcm9wcy5ncmlkKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBkaXNhYmxlZCA9IHRoaXMucHJvcHMuaXNCdXN5XG4gICAgICAgICAgICAgICAgICB8fCB0aGlzLnByb3BzLmlzQ3JlYXRpbmdcbiAgICAgICAgICAgICAgICAgIHx8IHRoaXMucHJvcHMuaXNFZGl0aW5nXG4gICAgICAgICAgICAgICAgICB8fCB0aGlzLnByb3BzLmRpc2FibGVBY3Rpb25zO1xuICAgIGxldCBtZW51SXRlbXMgPSBbXTtcbiAgICBpZiAodGhpcy5wcm9wcy5maWx0ZXJpbmcpIHtcbiAgICAgIG1lbnVJdGVtcy5wdXNoKHtcbiAgICAgICAgaWQ6IGAke3RoaXMucHJvcHMuZ3JpZC5pZH0tbWVudS1pdGVtLWZpbHRlcmluZ2AsXG4gICAgICAgIHRpdGxlOiA8TSBpZD1cIkdyaWQuU2hvd0ZpbHRlcmluZ1Jvd1wiIC8+LFxuICAgICAgICBpY29uOiB0aGlzLnByb3BzLmlzRmlsdGVyaW5nID9cbiAgICAgICAgICA8SWNvblxuICAgICAgICAgICAgdHlwZT1cImluZGljYXRvclwiXG4gICAgICAgICAgICBuYW1lPVwib2tcIlxuICAgICAgICAgICAgd2lkdGg9ezE4fVxuICAgICAgICAgICAgaGVpZ2h0PXsxOH1cbiAgICAgICAgICAvPiA6IHVuZGVmaW5lZCxcbiAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVUb2dnbGVGaWx0ZXJpbmdDbGljayxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5kcm9wZG93bk1lbnVJdGVtcyAmJiB0aGlzLnByb3BzLmRyb3Bkb3duTWVudUl0ZW1zLmxlbmd0aCkge1xuICAgICAgbWVudUl0ZW1zID0gbWVudUl0ZW1zLmNvbmNhdCh0aGlzLnByb3BzLmRyb3Bkb3duTWVudUl0ZW1zKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuY29sdW1uU2V0dGluZ3MpIHtcbiAgICAgIG1lbnVJdGVtcy5wdXNoKHtcbiAgICAgICAgaWQ6IGAke3RoaXMucHJvcHMuZ3JpZC5pZH0tbWVudS1pdGVtLWNvbHVtbi1zZXR0aW5nc2AsXG4gICAgICAgIHRpdGxlOiA8TSBpZD1cIkdyaWQuQ29sdW1uU2V0dGluZ3NcIiAvPixcbiAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVDb2x1bW5TZXR0aW5nc0NsaWNrLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLnJlbW92aW5nKSB7XG4gICAgICBtZW51SXRlbXMucHVzaCh7XG4gICAgICAgIGlkOiBgJHt0aGlzLnByb3BzLmdyaWQuaWR9LW1lbnUtaXRlbS1kZWxldGVgLFxuICAgICAgICB0aXRsZTogPE0gaWQ9XCJHcmlkLkRlbGV0ZVwiIC8+LFxuICAgICAgICBkaXNhYmxlZDogIXRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5oYXMoMCksXG4gICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlUmVtb3ZlQ2xpY2ssXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxEcm9wZG93bk1lbnVcbiAgICAgICAgaWQ9e3RoaXMucHJvcHMuZ3JpZC5pZH1cbiAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICBtZW51SXRlbXM9e21lbnVJdGVtc31cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxufVxuIl19