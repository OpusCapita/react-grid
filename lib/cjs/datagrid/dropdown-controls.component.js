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
          height: 18,
          style: { padding: '4px' }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kcm9wZG93bi1jb250cm9scy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkRyb3Bkb3duQ29udHJvbHMiLCJoYW5kbGVSZW1vdmVDbGljayIsInByb3BzIiwic2VsZWN0ZWRJdGVtcyIsInNpemUiLCJvblJlbW92ZSIsImhhbmRsZVRvZ2dsZUZpbHRlcmluZ0NsaWNrIiwidG9nZ2xlRmlsdGVyaW5nIiwiZ3JpZCIsImhhbmRsZUNvbHVtblNldHRpbmdzQ2xpY2siLCJvcGVuQ29sdW1uU2V0dGluZ3NNb2RhbCIsInJlbmRlciIsImRpc2FibGVkIiwiaXNCdXN5IiwiaXNDcmVhdGluZyIsImlzRWRpdGluZyIsImRpc2FibGVBY3Rpb25zIiwibWVudUl0ZW1zIiwiZmlsdGVyaW5nIiwicHVzaCIsImlkIiwidGl0bGUiLCJpY29uIiwiaXNGaWx0ZXJpbmciLCJwYWRkaW5nIiwidW5kZWZpbmVkIiwib25DbGljayIsImRyb3Bkb3duTWVudUl0ZW1zIiwibGVuZ3RoIiwiY29uY2F0IiwiY29sdW1uU2V0dGluZ3MiLCJyZW1vdmluZyIsImhhcyIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7b0JBQUE7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUdBOzs7Ozs7Ozs7O0lBRXFCQSxnQjs7Ozs7Ozs7Ozs7O2dLQTZCbkJDLGlCLEdBQW9CLFlBQU07QUFDeEIsVUFBSSxNQUFLQyxLQUFMLENBQVdDLGFBQVgsQ0FBeUJDLElBQXpCLEdBQWdDLENBQXBDLEVBQXVDO0FBQ3JDLGNBQUtGLEtBQUwsQ0FBV0csUUFBWDtBQUNEO0FBQ0YsSyxRQUVEQywwQixHQUE2QixZQUFNO0FBQ2pDLFlBQUtKLEtBQUwsQ0FBV0ssZUFBWCxDQUEyQixNQUFLTCxLQUFMLENBQVdNLElBQXRDO0FBQ0QsSyxRQUVEQyx5QixHQUE0QixZQUFNO0FBQ2hDLFlBQUtQLEtBQUwsQ0FBV1EsdUJBQVgsQ0FBbUMsTUFBS1IsS0FBTCxDQUFXTSxJQUE5QztBQUNELEs7Ozs2QkFFREcsTSxxQkFBUztBQUNQLFFBQU1DLFdBQVcsS0FBS1YsS0FBTCxDQUFXVyxNQUFYLElBQ0EsS0FBS1gsS0FBTCxDQUFXWSxVQURYLElBRUEsS0FBS1osS0FBTCxDQUFXYSxTQUZYLElBR0EsS0FBS2IsS0FBTCxDQUFXYyxjQUg1QjtBQUlBLFFBQUlDLFlBQVksRUFBaEI7QUFDQSxRQUFJLEtBQUtmLEtBQUwsQ0FBV2dCLFNBQWYsRUFBMEI7QUFDeEJELGdCQUFVRSxJQUFWLENBQWU7QUFDYkMsWUFBTyxLQUFLbEIsS0FBTCxDQUFXTSxJQUFYLENBQWdCWSxFQUF2Qix5QkFEYTtBQUViQyxlQUFPLDhCQUFDLDJCQUFELElBQUcsSUFBRyx1QkFBTixHQUZNO0FBR2JDLGNBQU0sS0FBS3BCLEtBQUwsQ0FBV3FCLFdBQVgsR0FDSiw4QkFBQyxnQkFBRDtBQUNFLGdCQUFLLFdBRFA7QUFFRSxnQkFBSyxJQUZQO0FBR0UsaUJBQU8sRUFIVDtBQUlFLGtCQUFRLEVBSlY7QUFLRSxpQkFBTyxFQUFFQyxTQUFTLEtBQVg7QUFMVCxVQURJLEdBT0NDLFNBVk07QUFXYkMsaUJBQVMsS0FBS3BCO0FBWEQsT0FBZjtBQWFEO0FBQ0QsUUFBSSxLQUFLSixLQUFMLENBQVd5QixpQkFBWCxJQUFnQyxLQUFLekIsS0FBTCxDQUFXeUIsaUJBQVgsQ0FBNkJDLE1BQWpFLEVBQXlFO0FBQ3ZFWCxrQkFBWUEsVUFBVVksTUFBVixDQUFpQixLQUFLM0IsS0FBTCxDQUFXeUIsaUJBQTVCLENBQVo7QUFDRDtBQUNELFFBQUksS0FBS3pCLEtBQUwsQ0FBVzRCLGNBQWYsRUFBK0I7QUFDN0JiLGdCQUFVRSxJQUFWLENBQWU7QUFDYkMsWUFBTyxLQUFLbEIsS0FBTCxDQUFXTSxJQUFYLENBQWdCWSxFQUF2QiwrQkFEYTtBQUViQyxlQUFPLDhCQUFDLDJCQUFELElBQUcsSUFBRyxxQkFBTixHQUZNO0FBR2JLLGlCQUFTLEtBQUtqQjtBQUhELE9BQWY7QUFLRDtBQUNELFFBQUksS0FBS1AsS0FBTCxDQUFXNkIsUUFBZixFQUF5QjtBQUN2QmQsZ0JBQVVFLElBQVYsQ0FBZTtBQUNiQyxZQUFPLEtBQUtsQixLQUFMLENBQVdNLElBQVgsQ0FBZ0JZLEVBQXZCLHNCQURhO0FBRWJDLGVBQU8sOEJBQUMsMkJBQUQsSUFBRyxJQUFHLGFBQU4sR0FGTTtBQUdiVCxrQkFBVSxDQUFDLEtBQUtWLEtBQUwsQ0FBV0MsYUFBWCxDQUF5QjZCLEdBQXpCLENBQTZCLENBQTdCLENBSEU7QUFJYk4saUJBQVMsS0FBS3pCO0FBSkQsT0FBZjtBQU1EO0FBQ0QsV0FDRSw4QkFBQywyQkFBRDtBQUNFLFVBQUksS0FBS0MsS0FBTCxDQUFXTSxJQUFYLENBQWdCWSxFQUR0QjtBQUVFLGdCQUFVUixRQUZaO0FBR0UsaUJBQVdLO0FBSGIsTUFERjtBQU9ELEc7OztFQXpGMkNnQixnQkFBTUMsYSxVQXFCM0NDLFksR0FBZTtBQUNwQmpCLGFBQVcsS0FEUztBQUVwQmEsWUFBVSxLQUZVO0FBR3BCRCxrQkFBZ0IsS0FISTtBQUlwQkgscUJBQW1CLEVBSkM7QUFLcEJYLGtCQUFnQjtBQUxJLEM7a0JBckJIaEIsZ0IiLCJmaWxlIjoiZHJvcGRvd24tY29udHJvbHMuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3QvZm9yYmlkLXByb3AtdHlwZXMgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IEltbXV0YWJsZVByb3BUeXBlcyBmcm9tICdyZWFjdC1pbW11dGFibGUtcHJvcHR5cGVzJztcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgYXMgTSB9IGZyb20gJ3JlYWN0LWludGwnO1xuaW1wb3J0IHsgSWNvbiB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWljb25zJztcbmltcG9ydCB7IERyb3Bkb3duTWVudSB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWRyb3Bkb3duJztcblxuaW1wb3J0IHsgZ3JpZFNoYXBlIH0gZnJvbSAnLi9kYXRhZ3JpZC5wcm9wcyc7XG5cblxuaW1wb3J0ICcuL2Ryb3Bkb3duLWNvbnRyb2xzLmNvbXBvbmVudC5zY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJvcGRvd25Db250cm9scyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGdyaWQ6IGdyaWRTaGFwZS5pc1JlcXVpcmVkLFxuICAgIC8vIGFjdGlvbnNcbiAgICB0b2dnbGVGaWx0ZXJpbmc6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgb3BlbkNvbHVtblNldHRpbmdzTW9kYWw6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgLy8gZGF0YVxuICAgIHNlbGVjdGVkSXRlbXM6IEltbXV0YWJsZVByb3BUeXBlcy5saXN0LmlzUmVxdWlyZWQsXG4gICAgaXNCdXN5OiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGlzQ3JlYXRpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgaXNFZGl0aW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGlzRmlsdGVyaW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIC8vIGNvbmZpZ1xuICAgIG9uUmVtb3ZlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGZpbHRlcmluZzogUHJvcFR5cGVzLmJvb2wsXG4gICAgcmVtb3Zpbmc6IFByb3BUeXBlcy5ib29sLFxuICAgIGNvbHVtblNldHRpbmdzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkcm9wZG93bk1lbnVJdGVtczogUHJvcFR5cGVzLmFycmF5LFxuICAgIGRpc2FibGVBY3Rpb25zOiBQcm9wVHlwZXMuYm9vbCxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGZpbHRlcmluZzogZmFsc2UsXG4gICAgcmVtb3Zpbmc6IGZhbHNlLFxuICAgIGNvbHVtblNldHRpbmdzOiBmYWxzZSxcbiAgICBkcm9wZG93bk1lbnVJdGVtczogW10sXG4gICAgZGlzYWJsZUFjdGlvbnM6IGZhbHNlLFxuICB9O1xuXG4gIGhhbmRsZVJlbW92ZUNsaWNrID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuc2l6ZSA+IDApIHtcbiAgICAgIHRoaXMucHJvcHMub25SZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVUb2dnbGVGaWx0ZXJpbmdDbGljayA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLnRvZ2dsZUZpbHRlcmluZyh0aGlzLnByb3BzLmdyaWQpO1xuICB9XG5cbiAgaGFuZGxlQ29sdW1uU2V0dGluZ3NDbGljayA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLm9wZW5Db2x1bW5TZXR0aW5nc01vZGFsKHRoaXMucHJvcHMuZ3JpZCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgZGlzYWJsZWQgPSB0aGlzLnByb3BzLmlzQnVzeVxuICAgICAgICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5pc0NyZWF0aW5nXG4gICAgICAgICAgICAgICAgICB8fCB0aGlzLnByb3BzLmlzRWRpdGluZ1xuICAgICAgICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5kaXNhYmxlQWN0aW9ucztcbiAgICBsZXQgbWVudUl0ZW1zID0gW107XG4gICAgaWYgKHRoaXMucHJvcHMuZmlsdGVyaW5nKSB7XG4gICAgICBtZW51SXRlbXMucHVzaCh7XG4gICAgICAgIGlkOiBgJHt0aGlzLnByb3BzLmdyaWQuaWR9LW1lbnUtaXRlbS1maWx0ZXJpbmdgLFxuICAgICAgICB0aXRsZTogPE0gaWQ9XCJHcmlkLlNob3dGaWx0ZXJpbmdSb3dcIiAvPixcbiAgICAgICAgaWNvbjogdGhpcy5wcm9wcy5pc0ZpbHRlcmluZyA/XG4gICAgICAgICAgPEljb25cbiAgICAgICAgICAgIHR5cGU9XCJpbmRpY2F0b3JcIlxuICAgICAgICAgICAgbmFtZT1cIm9rXCJcbiAgICAgICAgICAgIHdpZHRoPXsxOH1cbiAgICAgICAgICAgIGhlaWdodD17MTh9XG4gICAgICAgICAgICBzdHlsZT17eyBwYWRkaW5nOiAnNHB4JyB9fVxuICAgICAgICAgIC8+IDogdW5kZWZpbmVkLFxuICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZVRvZ2dsZUZpbHRlcmluZ0NsaWNrLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLmRyb3Bkb3duTWVudUl0ZW1zICYmIHRoaXMucHJvcHMuZHJvcGRvd25NZW51SXRlbXMubGVuZ3RoKSB7XG4gICAgICBtZW51SXRlbXMgPSBtZW51SXRlbXMuY29uY2F0KHRoaXMucHJvcHMuZHJvcGRvd25NZW51SXRlbXMpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5jb2x1bW5TZXR0aW5ncykge1xuICAgICAgbWVudUl0ZW1zLnB1c2goe1xuICAgICAgICBpZDogYCR7dGhpcy5wcm9wcy5ncmlkLmlkfS1tZW51LWl0ZW0tY29sdW1uLXNldHRpbmdzYCxcbiAgICAgICAgdGl0bGU6IDxNIGlkPVwiR3JpZC5Db2x1bW5TZXR0aW5nc1wiIC8+LFxuICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZUNvbHVtblNldHRpbmdzQ2xpY2ssXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMucmVtb3ZpbmcpIHtcbiAgICAgIG1lbnVJdGVtcy5wdXNoKHtcbiAgICAgICAgaWQ6IGAke3RoaXMucHJvcHMuZ3JpZC5pZH0tbWVudS1pdGVtLWRlbGV0ZWAsXG4gICAgICAgIHRpdGxlOiA8TSBpZD1cIkdyaWQuRGVsZXRlXCIgLz4sXG4gICAgICAgIGRpc2FibGVkOiAhdGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLmhhcygwKSxcbiAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVSZW1vdmVDbGljayxcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPERyb3Bkb3duTWVudVxuICAgICAgICBpZD17dGhpcy5wcm9wcy5ncmlkLmlkfVxuICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgIG1lbnVJdGVtcz17bWVudUl0ZW1zfVxuICAgICAgLz5cbiAgICApO1xuICB9XG59XG4iXX0=