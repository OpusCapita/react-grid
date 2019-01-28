'use strict';

exports.__esModule = true;
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp2; /* eslint-disable react/forbid-prop-types */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _reactBootstrap = require('react-bootstrap');

var _reactIntl = require('react-intl');

var _cellTooltip = require('./cell-tooltip.component');

var _cellTooltip2 = _interopRequireDefault(_cellTooltip);

var _datagrid = require('./datagrid.props');

var _datagrid2 = require('./datagrid.utils');

var _datagrid3 = _interopRequireDefault(_datagrid2);

require('./inline-edit-controls.component.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InlineEditControls = (_temp2 = _class = function (_React$PureComponent) {
  _inherits(InlineEditControls, _React$PureComponent);

  function InlineEditControls() {
    var _temp, _this, _ret;

    _classCallCheck(this, InlineEditControls);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.handleSaveButtonClick = function () {
      var valid = true;
      if (_this.props.isEditing) {
        valid = _this.props.validateEditedRows(_this.props.grid, _this.props.columns);
      }
      if (valid && _this.props.isCreating) {
        valid = _this.props.validateCreatedRows(_this.props.grid, _this.props.columns);
      }
      if (valid) {
        _this.props.save(_this.props.grid, _this.props.onSave);
      } else {
        _this.props.afterValidationError();
      }
    }, _this.handleCancelButtonClick = function () {
      _this.props.cancel(_this.props.grid);
      _this.props.onCancel();
    }, _this.handleAddButtonClick = function () {
      _this.props.addNewItem(_this.props.grid, _datagrid3.default.getColumnDefaultValues(_this.props.columns));
      _this.props.afterAddItem();
    }, _this.handleEditButtonClick = function () {
      if (!_this.props.disableActions) {
        _this.props.edit(_this.props.grid);
        _this.props.afterEditPress();
        if (_this.props.onEditClick) {
          _this.props.onEditClick();
        }
      }
    }, _this.handleCreateButtonClick = function () {
      if (!_this.props.disableActions) {
        if (_this.props.onAddClick) {
          _this.props.onAddClick();
        } else {
          _this.props.create(_this.props.grid, _datagrid3.default.getColumnDefaultValues(_this.props.columns));
          _this.props.afterAddItem();
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  InlineEditControls.prototype.render = function render() {
    var _props = this.props,
        disableActions = _props.disableActions,
        disableActionsMessage = _props.disableActionsMessage,
        disableActionSave = _props.disableActionSave,
        grid = _props.grid,
        inlineAdd = _props.inlineAdd,
        isBusy = _props.isBusy,
        isCreating = _props.isCreating,
        isEditing = _props.isEditing,
        tabIndex = _props.tabIndex,
        data = _props.data;

    if (isCreating || isEditing) {
      return _react2.default.createElement(
        'div',
        { className: 'oc-datagrid-inline-edit-controls' },
        _react2.default.createElement(
          _reactBootstrap.Button,
          {
            disabled: isBusy || disableActions || disableActionSave,
            onClick: this.handleSaveButtonClick,
            tabIndex: tabIndex + 1,
            id: 'oc-datagrid-controls-save-' + grid.id
          },
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Grid.Save' })
        ),
        _react2.default.createElement(
          _reactBootstrap.Button,
          {
            disabled: isBusy || disableActions,
            onClick: this.handleCancelButtonClick,
            tabIndex: tabIndex + 2,
            id: 'oc-datagrid-controls-cancel-' + grid.id
          },
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Grid.Cancel' })
        ),
        isCreating && _react2.default.createElement(
          _reactBootstrap.Button,
          {
            disabled: isBusy || disableActions,
            onClick: this.handleAddButtonClick,
            tabIndex: tabIndex + 3,
            id: 'oc-datagrid-controls-add-' + grid.id
          },
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Grid.Add' })
        )
      );
    }
    var message = {};
    if (disableActions && disableActionsMessage) {
      message = {
        infoMessage: {
          id: disableActionsMessage.messageId,
          values: disableActionsMessage.messageValues
        }
      };
    }
    var hasData = data.size >= 1;

    return _react2.default.createElement(
      'div',
      { className: 'oc-datagrid-inline-edit-controls' },
      _react2.default.createElement(
        _cellTooltip2.default,
        _extends({
          id: 'oc-datagrid-controls-tooltip-' + grid.id
        }, message),
        _react2.default.createElement(
          _reactBootstrap.Button,
          {
            disabled: isBusy || !hasData,
            onClick: this.handleEditButtonClick,
            id: 'oc-datagrid-controls-edit-' + grid.id
          },
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Grid.Edit' })
        ),
        inlineAdd && _react2.default.createElement(
          _reactBootstrap.Button,
          {
            disabled: isBusy,
            onClick: this.handleCreateButtonClick,
            id: 'oc-datagrid-controls-create-' + grid.id
          },
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Grid.Add' })
        )
      )
    );
  };

  return InlineEditControls;
}(_react2.default.PureComponent), _class.defaultProps = {
  disableActions: false,
  disableActionsMessage: { messageId: 'Grid.DisableActionsMessage' },
  disableActionSave: false,
  inlineAdd: true,
  onAddClick: null,
  onEditClick: null,
  tabIndex: 1
}, _temp2);
exports.default = InlineEditControls;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9pbmxpbmUtZWRpdC1jb250cm9scy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIklubGluZUVkaXRDb250cm9scyIsImhhbmRsZVNhdmVCdXR0b25DbGljayIsInZhbGlkIiwicHJvcHMiLCJpc0VkaXRpbmciLCJ2YWxpZGF0ZUVkaXRlZFJvd3MiLCJncmlkIiwiY29sdW1ucyIsImlzQ3JlYXRpbmciLCJ2YWxpZGF0ZUNyZWF0ZWRSb3dzIiwic2F2ZSIsIm9uU2F2ZSIsImFmdGVyVmFsaWRhdGlvbkVycm9yIiwiaGFuZGxlQ2FuY2VsQnV0dG9uQ2xpY2siLCJjYW5jZWwiLCJvbkNhbmNlbCIsImhhbmRsZUFkZEJ1dHRvbkNsaWNrIiwiYWRkTmV3SXRlbSIsIlV0aWxzIiwiZ2V0Q29sdW1uRGVmYXVsdFZhbHVlcyIsImFmdGVyQWRkSXRlbSIsImhhbmRsZUVkaXRCdXR0b25DbGljayIsImRpc2FibGVBY3Rpb25zIiwiZWRpdCIsImFmdGVyRWRpdFByZXNzIiwib25FZGl0Q2xpY2siLCJoYW5kbGVDcmVhdGVCdXR0b25DbGljayIsIm9uQWRkQ2xpY2siLCJjcmVhdGUiLCJyZW5kZXIiLCJkaXNhYmxlQWN0aW9uc01lc3NhZ2UiLCJkaXNhYmxlQWN0aW9uU2F2ZSIsImlubGluZUFkZCIsImlzQnVzeSIsInRhYkluZGV4IiwiZGF0YSIsImlkIiwibWVzc2FnZSIsImluZm9NZXNzYWdlIiwibWVzc2FnZUlkIiwidmFsdWVzIiwibWVzc2FnZVZhbHVlcyIsImhhc0RhdGEiLCJzaXplIiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O29CQUFBOzs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFFcUJBLGtCOzs7Ozs7Ozs7Ozs7Z0tBMENuQkMscUIsR0FBd0IsWUFBTTtBQUM1QixV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aEI7QUFHRSxpREFBbUNwQixLQUFLOEI7QUFIMUM7QUFLRSx3Q0FBQywyQkFBRCxJQUFHLElBQUcsVUFBTjtBQUxGO0FBWko7QUFERixLQURGO0FBeUJELEc7OztFQTVLNkNRLGdCQUFNQyxhLFVBZ0M3Q0MsWSxHQUFlO0FBQ3BCeEIsa0JBQWdCLEtBREk7QUFFcEJRLHlCQUF1QixFQUFFUyxXQUFXLDRCQUFiLEVBRkg7QUFHcEJSLHFCQUFtQixLQUhDO0FBSXBCQyxhQUFXLElBSlM7QUFLcEJMLGNBQVksSUFMUTtBQU1wQkYsZUFBYSxJQU5PO0FBT3BCUyxZQUFVO0FBUFUsQztrQkFoQ0hsQyxrQiIsImZpbGUiOiJpbmxpbmUtZWRpdC1jb250cm9scy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9mb3JiaWQtcHJvcC10eXBlcyAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgSW1tdXRhYmxlUHJvcFR5cGVzIGZyb20gJ3JlYWN0LWltbXV0YWJsZS1wcm9wdHlwZXMnO1xuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgYXMgTSB9IGZyb20gJ3JlYWN0LWludGwnO1xuaW1wb3J0IENlbGxUb29sVGlwIGZyb20gJy4vY2VsbC10b29sdGlwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBncmlkU2hhcGUgfSBmcm9tICcuL2RhdGFncmlkLnByb3BzJztcbmltcG9ydCBVdGlscyBmcm9tICcuL2RhdGFncmlkLnV0aWxzJztcbmltcG9ydCAnLi9pbmxpbmUtZWRpdC1jb250cm9scy5jb21wb25lbnQuc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElubGluZUVkaXRDb250cm9scyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGdyaWQ6IGdyaWRTaGFwZS5pc1JlcXVpcmVkLFxuICAgIGFkZE5ld0l0ZW06IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgY3JlYXRlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGVkaXQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgc2F2ZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBjYW5jZWw6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgdmFsaWRhdGVFZGl0ZWRSb3dzOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHZhbGlkYXRlQ3JlYXRlZFJvd3M6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgaXNCdXN5OiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGlzRWRpdGluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpc0NyZWF0aW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIG9uU2F2ZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvbkNhbmNlbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvbkFkZENsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkVkaXRDbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgYWZ0ZXJBZGRJdGVtOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGFmdGVyRWRpdFByZXNzOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGFmdGVyVmFsaWRhdGlvbkVycm9yOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGNvbHVtbnM6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxuICAgIGRpc2FibGVBY3Rpb25zOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkaXNhYmxlQWN0aW9uc01lc3NhZ2U6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBtZXNzYWdlSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBtZXNzYWdlVmFsdWVzOiBQcm9wVHlwZXMuc2hhcGUoe30pLFxuICAgIH0pLFxuICAgIGRpc2FibGVBY3Rpb25TYXZlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBpbmxpbmVBZGQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHRhYkluZGV4OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGRhdGE6IEltbXV0YWJsZVByb3BUeXBlcy5saXN0LmlzUmVxdWlyZWQsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBkaXNhYmxlQWN0aW9uczogZmFsc2UsXG4gICAgZGlzYWJsZUFjdGlvbnNNZXNzYWdlOiB7IG1lc3NhZ2VJZDogJ0dyaWQuRGlzYWJsZUFjdGlvbnNNZXNzYWdlJyB9LFxuICAgIGRpc2FibGVBY3Rpb25TYXZlOiBmYWxzZSxcbiAgICBpbmxpbmVBZGQ6IHRydWUsXG4gICAgb25BZGRDbGljazogbnVsbCxcbiAgICBvbkVkaXRDbGljazogbnVsbCxcbiAgICB0YWJJbmRleDogMSxcbiAgfTtcblxuICBoYW5kbGVTYXZlQnV0dG9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgbGV0IHZhbGlkID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5wcm9wcy5pc0VkaXRpbmcpIHtcbiAgICAgIHZhbGlkID0gdGhpcy5wcm9wcy52YWxpZGF0ZUVkaXRlZFJvd3MoXG4gICAgICAgIHRoaXMucHJvcHMuZ3JpZCxcbiAgICAgICAgdGhpcy5wcm9wcy5jb2x1bW5zLFxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKHZhbGlkICYmIHRoaXMucHJvcHMuaXNDcmVhdGluZykge1xuICAgICAgdmFsaWQgPSB0aGlzLnByb3BzLnZhbGlkYXRlQ3JlYXRlZFJvd3ModGhpcy5wcm9wcy5ncmlkLCB0aGlzLnByb3BzLmNvbHVtbnMpO1xuICAgIH1cbiAgICBpZiAodmFsaWQpIHtcbiAgICAgIHRoaXMucHJvcHMuc2F2ZSh0aGlzLnByb3BzLmdyaWQsIHRoaXMucHJvcHMub25TYXZlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcm9wcy5hZnRlclZhbGlkYXRpb25FcnJvcigpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUNhbmNlbEJ1dHRvbkNsaWNrID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMuY2FuY2VsKHRoaXMucHJvcHMuZ3JpZCk7XG4gICAgdGhpcy5wcm9wcy5vbkNhbmNlbCgpO1xuICB9XG5cbiAgaGFuZGxlQWRkQnV0dG9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5hZGROZXdJdGVtKHRoaXMucHJvcHMuZ3JpZCwgVXRpbHMuZ2V0Q29sdW1uRGVmYXVsdFZhbHVlcyh0aGlzLnByb3BzLmNvbHVtbnMpKTtcbiAgICB0aGlzLnByb3BzLmFmdGVyQWRkSXRlbSgpO1xuICB9XG5cbiAgaGFuZGxlRWRpdEJ1dHRvbkNsaWNrID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5kaXNhYmxlQWN0aW9ucykge1xuICAgICAgdGhpcy5wcm9wcy5lZGl0KHRoaXMucHJvcHMuZ3JpZCk7XG4gICAgICB0aGlzLnByb3BzLmFmdGVyRWRpdFByZXNzKCk7XG4gICAgICBpZiAodGhpcy5wcm9wcy5vbkVkaXRDbGljaykge1xuICAgICAgICB0aGlzLnByb3BzLm9uRWRpdENsaWNrKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlQ3JlYXRlQnV0dG9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmRpc2FibGVBY3Rpb25zKSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5vbkFkZENsaWNrKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25BZGRDbGljaygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wcm9wcy5jcmVhdGUodGhpcy5wcm9wcy5ncmlkLCBVdGlscy5nZXRDb2x1bW5EZWZhdWx0VmFsdWVzKHRoaXMucHJvcHMuY29sdW1ucykpO1xuICAgICAgICB0aGlzLnByb3BzLmFmdGVyQWRkSXRlbSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBkaXNhYmxlQWN0aW9ucyxcbiAgICAgIGRpc2FibGVBY3Rpb25zTWVzc2FnZSxcbiAgICAgIGRpc2FibGVBY3Rpb25TYXZlLFxuICAgICAgZ3JpZCxcbiAgICAgIGlubGluZUFkZCxcbiAgICAgIGlzQnVzeSxcbiAgICAgIGlzQ3JlYXRpbmcsXG4gICAgICBpc0VkaXRpbmcsXG4gICAgICB0YWJJbmRleCxcbiAgICAgIGRhdGEsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKGlzQ3JlYXRpbmcgfHwgaXNFZGl0aW5nKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWlubGluZS1lZGl0LWNvbnRyb2xzXCI+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgZGlzYWJsZWQ9e2lzQnVzeSB8fCBkaXNhYmxlQWN0aW9ucyB8fCBkaXNhYmxlQWN0aW9uU2F2ZX1cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlU2F2ZUJ1dHRvbkNsaWNrfVxuICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4ICsgMX1cbiAgICAgICAgICAgIGlkPXtgb2MtZGF0YWdyaWQtY29udHJvbHMtc2F2ZS0ke2dyaWQuaWR9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8TSBpZD1cIkdyaWQuU2F2ZVwiIC8+XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgZGlzYWJsZWQ9e2lzQnVzeSB8fCBkaXNhYmxlQWN0aW9uc31cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2FuY2VsQnV0dG9uQ2xpY2t9XG4gICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXggKyAyfVxuICAgICAgICAgICAgaWQ9e2BvYy1kYXRhZ3JpZC1jb250cm9scy1jYW5jZWwtJHtncmlkLmlkfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPE0gaWQ9XCJHcmlkLkNhbmNlbFwiIC8+XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAge2lzQ3JlYXRpbmcgJiZcbiAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzQnVzeSB8fCBkaXNhYmxlQWN0aW9uc31cbiAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVBZGRCdXR0b25DbGlja31cbiAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4ICsgM31cbiAgICAgICAgICAgICAgaWQ9e2BvYy1kYXRhZ3JpZC1jb250cm9scy1hZGQtJHtncmlkLmlkfWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxNIGlkPVwiR3JpZC5BZGRcIiAvPlxuICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICAgIGxldCBtZXNzYWdlID0ge307XG4gICAgaWYgKGRpc2FibGVBY3Rpb25zICYmIGRpc2FibGVBY3Rpb25zTWVzc2FnZSkge1xuICAgICAgbWVzc2FnZSA9IHtcbiAgICAgICAgaW5mb01lc3NhZ2U6IHtcbiAgICAgICAgICBpZDogZGlzYWJsZUFjdGlvbnNNZXNzYWdlLm1lc3NhZ2VJZCxcbiAgICAgICAgICB2YWx1ZXM6IGRpc2FibGVBY3Rpb25zTWVzc2FnZS5tZXNzYWdlVmFsdWVzLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICB9XG4gICAgY29uc3QgaGFzRGF0YSA9IGRhdGEuc2l6ZSA+PSAxO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtaW5saW5lLWVkaXQtY29udHJvbHNcIj5cbiAgICAgICAgPENlbGxUb29sVGlwXG4gICAgICAgICAgaWQ9e2BvYy1kYXRhZ3JpZC1jb250cm9scy10b29sdGlwLSR7Z3JpZC5pZH1gfVxuICAgICAgICAgIHsuLi5tZXNzYWdlfVxuICAgICAgICA+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgZGlzYWJsZWQ9e2lzQnVzeSB8fCAhaGFzRGF0YX1cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlRWRpdEJ1dHRvbkNsaWNrfVxuICAgICAgICAgICAgaWQ9e2BvYy1kYXRhZ3JpZC1jb250cm9scy1lZGl0LSR7Z3JpZC5pZH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxNIGlkPVwiR3JpZC5FZGl0XCIgLz5cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICB7aW5saW5lQWRkICYmXG4gICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgIGRpc2FibGVkPXtpc0J1c3l9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ3JlYXRlQnV0dG9uQ2xpY2t9XG4gICAgICAgICAgICAgIGlkPXtgb2MtZGF0YWdyaWQtY29udHJvbHMtY3JlYXRlLSR7Z3JpZC5pZH1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8TSBpZD1cIkdyaWQuQWRkXCIgLz5cbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIH1cbiAgICAgICAgPC9DZWxsVG9vbFRpcD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==