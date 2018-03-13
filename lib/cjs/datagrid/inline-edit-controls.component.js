'use strict';

exports.__esModule = true;
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp2; /* eslint-disable react/forbid-prop-types */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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
        tabIndex = _props.tabIndex;

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
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Save' })
        ),
        _react2.default.createElement(
          _reactBootstrap.Button,
          {
            disabled: isBusy || disableActions,
            onClick: this.handleCancelButtonClick,
            tabIndex: tabIndex + 2,
            id: 'oc-datagrid-controls-cancel-' + grid.id
          },
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Cancel' })
        ),
        isCreating && _react2.default.createElement(
          _reactBootstrap.Button,
          {
            disabled: isBusy || disableActions,
            onClick: this.handleAddButtonClick,
            tabIndex: tabIndex + 3,
            id: 'oc-datagrid-controls-add-' + grid.id
          },
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Add' })
        )
      );
    }
    var message = {};
    if (disableActions && disableActionsMessage) {
      message = {
        messageId: disableActionsMessage.messageId,
        messageValues: disableActionsMessage.messageValues
      };
    }
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
            disabled: isBusy,
            onClick: this.handleEditButtonClick,
            id: 'oc-datagrid-controls-edit-' + grid.id
          },
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Edit' })
        ),
        inlineAdd && _react2.default.createElement(
          _reactBootstrap.Button,
          {
            disabled: isBusy,
            onClick: this.handleCreateButtonClick,
            id: 'oc-datagrid-controls-create-' + grid.id
          },
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Add' })
        )
      )
    );
  };

  return InlineEditControls;
}(_react2.default.PureComponent), _class.defaultProps = {
  disableActions: false,
  disableActionsMessage: { messageId: 'GridActionsDisabledOtherGridBusy' },
  disableActionSave: false,
  inlineAdd: true,
  onAddClick: null,
  onEditClick: null,
  tabIndex: 1
}, _temp2);
exports.default = InlineEditControls;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9pbmxpbmUtZWRpdC1jb250cm9scy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIklubGluZUVkaXRDb250cm9scyIsImhhbmRsZVNhdmVCdXR0b25DbGljayIsInZhbGlkIiwicHJvcHMiLCJpc0VkaXRpbmciLCJ2YWxpZGF0ZUVkaXRlZFJvd3MiLCJncmlkIiwiY29sdW1ucyIsImlzQ3JlYXRpbmciLCJ2YWxpZGF0ZUNyZWF0ZWRSb3dzIiwic2F2ZSIsIm9uU2F2ZSIsImFmdGVyVmFsaWRhdGlvbkVycm9yIiwiaGFuZGxlQ2FuY2VsQnV0dG9uQ2xpY2siLCJjYW5jZWwiLCJvbkNhbmNlbCIsImhhbmRsZUFkZEJ1dHRvbkNsaWNrIiwiYWRkTmV3SXRlbSIsImdldENvbHVtbkRlZmF1bHRWYWx1ZXMiLCJhZnRlckFkZEl0ZW0iLCJoYW5kbGVFZGl0QnV0dG9uQ2xpY2siLCJkaXNhYmxlQWN0aW9ucyIsImVkaXQiLCJhZnRlckVkaXRQcmVzcyIsIm9uRWRpdENsaWNrIiwiaGFuZGxlQ3JlYXRlQnV0dG9uQ2xpY2siLCJvbkFkZENsaWNrIiwiY3JlYXRlIiwicmVuZGVyIiwiZGlzYWJsZUFjdGlvbnNNZXNzYWdlIiwiZGlzYWJsZUFjdGlvblNhdmUiLCJpbmxpbmVBZGQiLCJpc0J1c3kiLCJ0YWJJbmRleCIsImlkIiwibWVzc2FnZSIsIm1lc3NhZ2VJZCIsIm1lc3NhZ2VWYWx1ZXMiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O29CQUFBOzs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0lBRXFCQSxrQjs7Ozs7Ozs7Ozs7O2dLQXlDbkJDLHFCLEdBQXdCLFlBQU07QUFDNUIsVUFBSUMsUUFBUSxJQUFaO0FBQ0EsVUFBSSxNQUFLQyxLQUFMLENBQVdDLFNBQWYsRUFBMEI7QUFDeEJGLGdCQUFRLE1BQUtD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QUFQVSxDO2tCQS9CSGpDLGtCIiwiZmlsZSI6ImlubGluZS1lZGl0LWNvbnRyb2xzLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L2ZvcmJpZC1wcm9wLXR5cGVzICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlIGFzIE0gfSBmcm9tICdyZWFjdC1pbnRsJztcbmltcG9ydCBDZWxsVG9vbFRpcCBmcm9tICcuL2NlbGwtdG9vbHRpcC5jb21wb25lbnQnO1xuaW1wb3J0IHsgZ3JpZFNoYXBlIH0gZnJvbSAnLi9kYXRhZ3JpZC5wcm9wcyc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9kYXRhZ3JpZC51dGlscyc7XG5pbXBvcnQgJy4vaW5saW5lLWVkaXQtY29udHJvbHMuY29tcG9uZW50LnNjc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmxpbmVFZGl0Q29udHJvbHMgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBncmlkOiBncmlkU2hhcGUuaXNSZXF1aXJlZCxcbiAgICBhZGROZXdJdGVtOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGNyZWF0ZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBlZGl0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHNhdmU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgY2FuY2VsOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHZhbGlkYXRlRWRpdGVkUm93czogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICB2YWxpZGF0ZUNyZWF0ZWRSb3dzOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGlzQnVzeTogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpc0VkaXRpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgaXNDcmVhdGluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBvblNhdmU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgb25DYW5jZWw6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgb25BZGRDbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25FZGl0Q2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIGFmdGVyQWRkSXRlbTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBhZnRlckVkaXRQcmVzczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBhZnRlclZhbGlkYXRpb25FcnJvcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBjb2x1bW5zOiBQcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCxcbiAgICBkaXNhYmxlQWN0aW9uczogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGlzYWJsZUFjdGlvbnNNZXNzYWdlOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgbWVzc2FnZUlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgbWVzc2FnZVZhbHVlczogUHJvcFR5cGVzLnNoYXBlKHt9KSxcbiAgICB9KSxcbiAgICBkaXNhYmxlQWN0aW9uU2F2ZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgaW5saW5lQWRkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB0YWJJbmRleDogUHJvcFR5cGVzLm51bWJlcixcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGRpc2FibGVBY3Rpb25zOiBmYWxzZSxcbiAgICBkaXNhYmxlQWN0aW9uc01lc3NhZ2U6IHsgbWVzc2FnZUlkOiAnR3JpZEFjdGlvbnNEaXNhYmxlZE90aGVyR3JpZEJ1c3knIH0sXG4gICAgZGlzYWJsZUFjdGlvblNhdmU6IGZhbHNlLFxuICAgIGlubGluZUFkZDogdHJ1ZSxcbiAgICBvbkFkZENsaWNrOiBudWxsLFxuICAgIG9uRWRpdENsaWNrOiBudWxsLFxuICAgIHRhYkluZGV4OiAxLFxuICB9O1xuXG4gIGhhbmRsZVNhdmVCdXR0b25DbGljayA9ICgpID0+IHtcbiAgICBsZXQgdmFsaWQgPSB0cnVlO1xuICAgIGlmICh0aGlzLnByb3BzLmlzRWRpdGluZykge1xuICAgICAgdmFsaWQgPSB0aGlzLnByb3BzLnZhbGlkYXRlRWRpdGVkUm93cyhcbiAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICB0aGlzLnByb3BzLmNvbHVtbnMsXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAodmFsaWQgJiYgdGhpcy5wcm9wcy5pc0NyZWF0aW5nKSB7XG4gICAgICB2YWxpZCA9IHRoaXMucHJvcHMudmFsaWRhdGVDcmVhdGVkUm93cyh0aGlzLnByb3BzLmdyaWQsIHRoaXMucHJvcHMuY29sdW1ucyk7XG4gICAgfVxuICAgIGlmICh2YWxpZCkge1xuICAgICAgdGhpcy5wcm9wcy5zYXZlKHRoaXMucHJvcHMuZ3JpZCwgdGhpcy5wcm9wcy5vblNhdmUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByb3BzLmFmdGVyVmFsaWRhdGlvbkVycm9yKCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlQ2FuY2VsQnV0dG9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5jYW5jZWwodGhpcy5wcm9wcy5ncmlkKTtcbiAgICB0aGlzLnByb3BzLm9uQ2FuY2VsKCk7XG4gIH1cblxuICBoYW5kbGVBZGRCdXR0b25DbGljayA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLmFkZE5ld0l0ZW0odGhpcy5wcm9wcy5ncmlkLCBVdGlscy5nZXRDb2x1bW5EZWZhdWx0VmFsdWVzKHRoaXMucHJvcHMuY29sdW1ucykpO1xuICAgIHRoaXMucHJvcHMuYWZ0ZXJBZGRJdGVtKCk7XG4gIH1cblxuICBoYW5kbGVFZGl0QnV0dG9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmRpc2FibGVBY3Rpb25zKSB7XG4gICAgICB0aGlzLnByb3BzLmVkaXQodGhpcy5wcm9wcy5ncmlkKTtcbiAgICAgIHRoaXMucHJvcHMuYWZ0ZXJFZGl0UHJlc3MoKTtcbiAgICAgIGlmICh0aGlzLnByb3BzLm9uRWRpdENsaWNrKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25FZGl0Q2xpY2soKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYW5kbGVDcmVhdGVCdXR0b25DbGljayA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuZGlzYWJsZUFjdGlvbnMpIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLm9uQWRkQ2xpY2spIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkFkZENsaWNrKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnByb3BzLmNyZWF0ZSh0aGlzLnByb3BzLmdyaWQsIFV0aWxzLmdldENvbHVtbkRlZmF1bHRWYWx1ZXModGhpcy5wcm9wcy5jb2x1bW5zKSk7XG4gICAgICAgIHRoaXMucHJvcHMuYWZ0ZXJBZGRJdGVtKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGRpc2FibGVBY3Rpb25zLFxuICAgICAgZGlzYWJsZUFjdGlvbnNNZXNzYWdlLFxuICAgICAgZGlzYWJsZUFjdGlvblNhdmUsXG4gICAgICBncmlkLFxuICAgICAgaW5saW5lQWRkLFxuICAgICAgaXNCdXN5LFxuICAgICAgaXNDcmVhdGluZyxcbiAgICAgIGlzRWRpdGluZyxcbiAgICAgIHRhYkluZGV4LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChpc0NyZWF0aW5nIHx8IGlzRWRpdGluZykge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1pbmxpbmUtZWRpdC1jb250cm9sc1wiPlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGRpc2FibGVkPXtpc0J1c3kgfHwgZGlzYWJsZUFjdGlvbnMgfHwgZGlzYWJsZUFjdGlvblNhdmV9XG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZVNhdmVCdXR0b25DbGlja31cbiAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleCArIDF9XG4gICAgICAgICAgICBpZD17YG9jLWRhdGFncmlkLWNvbnRyb2xzLXNhdmUtJHtncmlkLmlkfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPE0gaWQ9XCJTYXZlXCIgLz5cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBkaXNhYmxlZD17aXNCdXN5IHx8IGRpc2FibGVBY3Rpb25zfVxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDYW5jZWxCdXR0b25DbGlja31cbiAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleCArIDJ9XG4gICAgICAgICAgICBpZD17YG9jLWRhdGFncmlkLWNvbnRyb2xzLWNhbmNlbC0ke2dyaWQuaWR9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8TSBpZD1cIkNhbmNlbFwiIC8+XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAge2lzQ3JlYXRpbmcgJiZcbiAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzQnVzeSB8fCBkaXNhYmxlQWN0aW9uc31cbiAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVBZGRCdXR0b25DbGlja31cbiAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4ICsgM31cbiAgICAgICAgICAgICAgaWQ9e2BvYy1kYXRhZ3JpZC1jb250cm9scy1hZGQtJHtncmlkLmlkfWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxNIGlkPVwiQWRkXCIgLz5cbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgICBsZXQgbWVzc2FnZSA9IHt9O1xuICAgIGlmIChkaXNhYmxlQWN0aW9ucyAmJiBkaXNhYmxlQWN0aW9uc01lc3NhZ2UpIHtcbiAgICAgIG1lc3NhZ2UgPSB7XG4gICAgICAgIG1lc3NhZ2VJZDogZGlzYWJsZUFjdGlvbnNNZXNzYWdlLm1lc3NhZ2VJZCxcbiAgICAgICAgbWVzc2FnZVZhbHVlczogZGlzYWJsZUFjdGlvbnNNZXNzYWdlLm1lc3NhZ2VWYWx1ZXMsXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1pbmxpbmUtZWRpdC1jb250cm9sc1wiPlxuICAgICAgICA8Q2VsbFRvb2xUaXBcbiAgICAgICAgICBpZD17YG9jLWRhdGFncmlkLWNvbnRyb2xzLXRvb2x0aXAtJHtncmlkLmlkfWB9XG4gICAgICAgICAgey4uLm1lc3NhZ2V9XG4gICAgICAgID5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBkaXNhYmxlZD17aXNCdXN5fVxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVFZGl0QnV0dG9uQ2xpY2t9XG4gICAgICAgICAgICBpZD17YG9jLWRhdGFncmlkLWNvbnRyb2xzLWVkaXQtJHtncmlkLmlkfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPE0gaWQ9XCJFZGl0XCIgLz5cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICB7aW5saW5lQWRkICYmXG4gICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgIGRpc2FibGVkPXtpc0J1c3l9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ3JlYXRlQnV0dG9uQ2xpY2t9XG4gICAgICAgICAgICAgIGlkPXtgb2MtZGF0YWdyaWQtY29udHJvbHMtY3JlYXRlLSR7Z3JpZC5pZH1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8TSBpZD1cIkFkZFwiIC8+XG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICB9XG4gICAgICAgIDwvQ2VsbFRvb2xUaXA+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=