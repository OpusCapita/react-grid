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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9pbmxpbmUtZWRpdC1jb250cm9scy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIklubGluZUVkaXRDb250cm9scyIsImhhbmRsZVNhdmVCdXR0b25DbGljayIsInZhbGlkIiwicHJvcHMiLCJpc0VkaXRpbmciLCJ2YWxpZGF0ZUVkaXRlZFJvd3MiLCJncmlkIiwiY29sdW1ucyIsImlzQ3JlYXRpbmciLCJ2YWxpZGF0ZUNyZWF0ZWRSb3dzIiwic2F2ZSIsIm9uU2F2ZSIsImFmdGVyVmFsaWRhdGlvbkVycm9yIiwiaGFuZGxlQ2FuY2VsQnV0dG9uQ2xpY2siLCJjYW5jZWwiLCJvbkNhbmNlbCIsImhhbmRsZUFkZEJ1dHRvbkNsaWNrIiwiYWRkTmV3SXRlbSIsImdldENvbHVtbkRlZmF1bHRWYWx1ZXMiLCJhZnRlckFkZEl0ZW0iLCJoYW5kbGVFZGl0QnV0dG9uQ2xpY2siLCJkaXNhYmxlQWN0aW9ucyIsImVkaXQiLCJhZnRlckVkaXRQcmVzcyIsIm9uRWRpdENsaWNrIiwiaGFuZGxlQ3JlYXRlQnV0dG9uQ2xpY2siLCJvbkFkZENsaWNrIiwiY3JlYXRlIiwicmVuZGVyIiwiZGlzYWJsZUFjdGlvbnNNZXNzYWdlIiwiZGlzYWJsZUFjdGlvblNhdmUiLCJpbmxpbmVBZGQiLCJpc0J1c3kiLCJ0YWJJbmRleCIsImlkIiwibWVzc2FnZSIsImluZm9NZXNzYWdlIiwibWVzc2FnZUlkIiwidmFsdWVzIiwibWVzc2FnZVZhbHVlcyIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7b0JBQUE7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFFcUJBLGtCOzs7Ozs7Ozs7Ozs7Z0tBeUNuQkMscUIsR0FBd0IsWUFBTTtBQUM1QixVQUFJQyxRQUFRLElBQVo7QUFDQSxVQUFJLE1BQUtDLEtBQUwsQ0FBV0MsU0FBZixF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QUFZLElBTFE7QUFNcEJGLGVBQWEsSUFOTztBQU9wQlMsWUFBVTtBQVBVLEM7a0JBL0JIakMsa0IiLCJmaWxlIjoiaW5saW5lLWVkaXQtY29udHJvbHMuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3QvZm9yYmlkLXByb3AtdHlwZXMgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgYXMgTSB9IGZyb20gJ3JlYWN0LWludGwnO1xuaW1wb3J0IENlbGxUb29sVGlwIGZyb20gJy4vY2VsbC10b29sdGlwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBncmlkU2hhcGUgfSBmcm9tICcuL2RhdGFncmlkLnByb3BzJztcbmltcG9ydCBVdGlscyBmcm9tICcuL2RhdGFncmlkLnV0aWxzJztcbmltcG9ydCAnLi9pbmxpbmUtZWRpdC1jb250cm9scy5jb21wb25lbnQuc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElubGluZUVkaXRDb250cm9scyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGdyaWQ6IGdyaWRTaGFwZS5pc1JlcXVpcmVkLFxuICAgIGFkZE5ld0l0ZW06IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgY3JlYXRlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGVkaXQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgc2F2ZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBjYW5jZWw6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgdmFsaWRhdGVFZGl0ZWRSb3dzOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHZhbGlkYXRlQ3JlYXRlZFJvd3M6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgaXNCdXN5OiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGlzRWRpdGluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpc0NyZWF0aW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIG9uU2F2ZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvbkNhbmNlbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvbkFkZENsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkVkaXRDbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgYWZ0ZXJBZGRJdGVtOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGFmdGVyRWRpdFByZXNzOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGFmdGVyVmFsaWRhdGlvbkVycm9yOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGNvbHVtbnM6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxuICAgIGRpc2FibGVBY3Rpb25zOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkaXNhYmxlQWN0aW9uc01lc3NhZ2U6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBtZXNzYWdlSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBtZXNzYWdlVmFsdWVzOiBQcm9wVHlwZXMuc2hhcGUoe30pLFxuICAgIH0pLFxuICAgIGRpc2FibGVBY3Rpb25TYXZlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBpbmxpbmVBZGQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHRhYkluZGV4OiBQcm9wVHlwZXMubnVtYmVyLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgZGlzYWJsZUFjdGlvbnM6IGZhbHNlLFxuICAgIGRpc2FibGVBY3Rpb25zTWVzc2FnZTogeyBtZXNzYWdlSWQ6ICdHcmlkLkRpc2FibGVBY3Rpb25zTWVzc2FnZScgfSxcbiAgICBkaXNhYmxlQWN0aW9uU2F2ZTogZmFsc2UsXG4gICAgaW5saW5lQWRkOiB0cnVlLFxuICAgIG9uQWRkQ2xpY2s6IG51bGwsXG4gICAgb25FZGl0Q2xpY2s6IG51bGwsXG4gICAgdGFiSW5kZXg6IDEsXG4gIH07XG5cbiAgaGFuZGxlU2F2ZUJ1dHRvbkNsaWNrID0gKCkgPT4ge1xuICAgIGxldCB2YWxpZCA9IHRydWU7XG4gICAgaWYgKHRoaXMucHJvcHMuaXNFZGl0aW5nKSB7XG4gICAgICB2YWxpZCA9IHRoaXMucHJvcHMudmFsaWRhdGVFZGl0ZWRSb3dzKFxuICAgICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICAgIHRoaXMucHJvcHMuY29sdW1ucyxcbiAgICAgICk7XG4gICAgfVxuICAgIGlmICh2YWxpZCAmJiB0aGlzLnByb3BzLmlzQ3JlYXRpbmcpIHtcbiAgICAgIHZhbGlkID0gdGhpcy5wcm9wcy52YWxpZGF0ZUNyZWF0ZWRSb3dzKHRoaXMucHJvcHMuZ3JpZCwgdGhpcy5wcm9wcy5jb2x1bW5zKTtcbiAgICB9XG4gICAgaWYgKHZhbGlkKSB7XG4gICAgICB0aGlzLnByb3BzLnNhdmUodGhpcy5wcm9wcy5ncmlkLCB0aGlzLnByb3BzLm9uU2F2ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHJvcHMuYWZ0ZXJWYWxpZGF0aW9uRXJyb3IoKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVDYW5jZWxCdXR0b25DbGljayA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLmNhbmNlbCh0aGlzLnByb3BzLmdyaWQpO1xuICAgIHRoaXMucHJvcHMub25DYW5jZWwoKTtcbiAgfVxuXG4gIGhhbmRsZUFkZEJ1dHRvbkNsaWNrID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMuYWRkTmV3SXRlbSh0aGlzLnByb3BzLmdyaWQsIFV0aWxzLmdldENvbHVtbkRlZmF1bHRWYWx1ZXModGhpcy5wcm9wcy5jb2x1bW5zKSk7XG4gICAgdGhpcy5wcm9wcy5hZnRlckFkZEl0ZW0oKTtcbiAgfVxuXG4gIGhhbmRsZUVkaXRCdXR0b25DbGljayA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuZGlzYWJsZUFjdGlvbnMpIHtcbiAgICAgIHRoaXMucHJvcHMuZWRpdCh0aGlzLnByb3BzLmdyaWQpO1xuICAgICAgdGhpcy5wcm9wcy5hZnRlckVkaXRQcmVzcygpO1xuICAgICAgaWYgKHRoaXMucHJvcHMub25FZGl0Q2xpY2spIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkVkaXRDbGljaygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUNyZWF0ZUJ1dHRvbkNsaWNrID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5kaXNhYmxlQWN0aW9ucykge1xuICAgICAgaWYgKHRoaXMucHJvcHMub25BZGRDbGljaykge1xuICAgICAgICB0aGlzLnByb3BzLm9uQWRkQ2xpY2soKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucHJvcHMuY3JlYXRlKHRoaXMucHJvcHMuZ3JpZCwgVXRpbHMuZ2V0Q29sdW1uRGVmYXVsdFZhbHVlcyh0aGlzLnByb3BzLmNvbHVtbnMpKTtcbiAgICAgICAgdGhpcy5wcm9wcy5hZnRlckFkZEl0ZW0oKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgZGlzYWJsZUFjdGlvbnMsXG4gICAgICBkaXNhYmxlQWN0aW9uc01lc3NhZ2UsXG4gICAgICBkaXNhYmxlQWN0aW9uU2F2ZSxcbiAgICAgIGdyaWQsXG4gICAgICBpbmxpbmVBZGQsXG4gICAgICBpc0J1c3ksXG4gICAgICBpc0NyZWF0aW5nLFxuICAgICAgaXNFZGl0aW5nLFxuICAgICAgdGFiSW5kZXgsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKGlzQ3JlYXRpbmcgfHwgaXNFZGl0aW5nKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWlubGluZS1lZGl0LWNvbnRyb2xzXCI+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgZGlzYWJsZWQ9e2lzQnVzeSB8fCBkaXNhYmxlQWN0aW9ucyB8fCBkaXNhYmxlQWN0aW9uU2F2ZX1cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlU2F2ZUJ1dHRvbkNsaWNrfVxuICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4ICsgMX1cbiAgICAgICAgICAgIGlkPXtgb2MtZGF0YWdyaWQtY29udHJvbHMtc2F2ZS0ke2dyaWQuaWR9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8TSBpZD1cIkdyaWQuU2F2ZVwiIC8+XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgZGlzYWJsZWQ9e2lzQnVzeSB8fCBkaXNhYmxlQWN0aW9uc31cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2FuY2VsQnV0dG9uQ2xpY2t9XG4gICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXggKyAyfVxuICAgICAgICAgICAgaWQ9e2BvYy1kYXRhZ3JpZC1jb250cm9scy1jYW5jZWwtJHtncmlkLmlkfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPE0gaWQ9XCJHcmlkLkNhbmNlbFwiIC8+XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAge2lzQ3JlYXRpbmcgJiZcbiAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzQnVzeSB8fCBkaXNhYmxlQWN0aW9uc31cbiAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVBZGRCdXR0b25DbGlja31cbiAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4ICsgM31cbiAgICAgICAgICAgICAgaWQ9e2BvYy1kYXRhZ3JpZC1jb250cm9scy1hZGQtJHtncmlkLmlkfWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxNIGlkPVwiR3JpZC5BZGRcIiAvPlxuICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICAgIGxldCBtZXNzYWdlID0ge307XG4gICAgaWYgKGRpc2FibGVBY3Rpb25zICYmIGRpc2FibGVBY3Rpb25zTWVzc2FnZSkge1xuICAgICAgbWVzc2FnZSA9IHtcbiAgICAgICAgaW5mb01lc3NhZ2U6IHtcbiAgICAgICAgICBpZDogZGlzYWJsZUFjdGlvbnNNZXNzYWdlLm1lc3NhZ2VJZCxcbiAgICAgICAgICB2YWx1ZXM6IGRpc2FibGVBY3Rpb25zTWVzc2FnZS5tZXNzYWdlVmFsdWVzLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtaW5saW5lLWVkaXQtY29udHJvbHNcIj5cbiAgICAgICAgPENlbGxUb29sVGlwXG4gICAgICAgICAgaWQ9e2BvYy1kYXRhZ3JpZC1jb250cm9scy10b29sdGlwLSR7Z3JpZC5pZH1gfVxuICAgICAgICAgIHsuLi5tZXNzYWdlfVxuICAgICAgICA+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgZGlzYWJsZWQ9e2lzQnVzeX1cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlRWRpdEJ1dHRvbkNsaWNrfVxuICAgICAgICAgICAgaWQ9e2BvYy1kYXRhZ3JpZC1jb250cm9scy1lZGl0LSR7Z3JpZC5pZH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxNIGlkPVwiR3JpZC5FZGl0XCIgLz5cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICB7aW5saW5lQWRkICYmXG4gICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgIGRpc2FibGVkPXtpc0J1c3l9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ3JlYXRlQnV0dG9uQ2xpY2t9XG4gICAgICAgICAgICAgIGlkPXtgb2MtZGF0YWdyaWQtY29udHJvbHMtY3JlYXRlLSR7Z3JpZC5pZH1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8TSBpZD1cIkdyaWQuQWRkXCIgLz5cbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIH1cbiAgICAgICAgPC9DZWxsVG9vbFRpcD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==