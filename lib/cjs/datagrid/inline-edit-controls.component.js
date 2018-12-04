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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9pbmxpbmUtZWRpdC1jb250cm9scy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIklubGluZUVkaXRDb250cm9scyIsImhhbmRsZVNhdmVCdXR0b25DbGljayIsInZhbGlkIiwicHJvcHMiLCJpc0VkaXRpbmciLCJ2YWxpZGF0ZUVkaXRlZFJvd3MiLCJncmlkIiwiY29sdW1ucyIsImlzQ3JlYXRpbmciLCJ2YWxpZGF0ZUNyZWF0ZWRSb3dzIiwic2F2ZSIsIm9uU2F2ZSIsImFmdGVyVmFsaWRhdGlvbkVycm9yIiwiaGFuZGxlQ2FuY2VsQnV0dG9uQ2xpY2siLCJjYW5jZWwiLCJvbkNhbmNlbCIsImhhbmRsZUFkZEJ1dHRvbkNsaWNrIiwiYWRkTmV3SXRlbSIsIlV0aWxzIiwiZ2V0Q29sdW1uRGVmYXVsdFZhbHVlcyIsImFmdGVyQWRkSXRlbSIsImhhbmRsZUVkaXRCdXR0b25DbGljayIsImRpc2FibGVBY3Rpb25zIiwiZWRpdCIsImFmdGVyRWRpdFByZXNzIiwib25FZGl0Q2xpY2siLCJoYW5kbGVDcmVhdGVCdXR0b25DbGljayIsIm9uQWRkQ2xpY2siLCJjcmVhdGUiLCJyZW5kZXIiLCJkaXNhYmxlQWN0aW9uc01lc3NhZ2UiLCJkaXNhYmxlQWN0aW9uU2F2ZSIsImlubGluZUFkZCIsImlzQnVzeSIsInRhYkluZGV4IiwiZGF0YSIsImlkIiwibWVzc2FnZSIsImluZm9NZXNzYWdlIiwibWVzc2FnZUlkIiwidmFsdWVzIiwibWVzc2FnZVZhbHVlcyIsImhhc0RhdGEiLCJzaXplIiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O29CQUFBOzs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0lBRXFCQSxrQjs7Ozs7Ozs7Ozs7O2dLQXlDbkJDLHFCLEdBQXdCLFlBQU07QUFDNUIsVUFBSUMsUUFB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aURBQW1DcEIsS0FBSzhCO0FBSDFDO0FBS0Usd0NBQUMsMkJBQUQsSUFBRyxJQUFHLFVBQU47QUFMRjtBQVpKO0FBREYsS0FERjtBQXlCRCxHOzs7RUEzSzZDUSxnQkFBTUMsYSxVQStCN0NDLFksR0FBZTtBQUNwQnhCLGtCQUFnQixLQURJO0FBRXBCUSx5QkFBdUIsRUFBRVMsV0FBVyw0QkFBYixFQUZIO0FBR3BCUixxQkFBbUIsS0FIQztBQUlwQkMsYUFBVyxJQUpTO0FBS3BCTCxjQUFZLElBTFE7QUFNcEJGLGVBQWEsSUFOTztBQU9wQlMsWUFBVTtBQVBVLEM7a0JBL0JIbEMsa0IiLCJmaWxlIjoiaW5saW5lLWVkaXQtY29udHJvbHMuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3QvZm9yYmlkLXByb3AtdHlwZXMgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgYXMgTSB9IGZyb20gJ3JlYWN0LWludGwnO1xuaW1wb3J0IENlbGxUb29sVGlwIGZyb20gJy4vY2VsbC10b29sdGlwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBncmlkU2hhcGUgfSBmcm9tICcuL2RhdGFncmlkLnByb3BzJztcbmltcG9ydCBVdGlscyBmcm9tICcuL2RhdGFncmlkLnV0aWxzJztcbmltcG9ydCAnLi9pbmxpbmUtZWRpdC1jb250cm9scy5jb21wb25lbnQuc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElubGluZUVkaXRDb250cm9scyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGdyaWQ6IGdyaWRTaGFwZS5pc1JlcXVpcmVkLFxuICAgIGFkZE5ld0l0ZW06IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgY3JlYXRlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGVkaXQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgc2F2ZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBjYW5jZWw6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgdmFsaWRhdGVFZGl0ZWRSb3dzOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHZhbGlkYXRlQ3JlYXRlZFJvd3M6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgaXNCdXN5OiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGlzRWRpdGluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpc0NyZWF0aW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIG9uU2F2ZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvbkNhbmNlbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvbkFkZENsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkVkaXRDbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgYWZ0ZXJBZGRJdGVtOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGFmdGVyRWRpdFByZXNzOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGFmdGVyVmFsaWRhdGlvbkVycm9yOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGNvbHVtbnM6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxuICAgIGRpc2FibGVBY3Rpb25zOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkaXNhYmxlQWN0aW9uc01lc3NhZ2U6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBtZXNzYWdlSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBtZXNzYWdlVmFsdWVzOiBQcm9wVHlwZXMuc2hhcGUoe30pLFxuICAgIH0pLFxuICAgIGRpc2FibGVBY3Rpb25TYXZlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBpbmxpbmVBZGQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHRhYkluZGV4OiBQcm9wVHlwZXMubnVtYmVyLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgZGlzYWJsZUFjdGlvbnM6IGZhbHNlLFxuICAgIGRpc2FibGVBY3Rpb25zTWVzc2FnZTogeyBtZXNzYWdlSWQ6ICdHcmlkLkRpc2FibGVBY3Rpb25zTWVzc2FnZScgfSxcbiAgICBkaXNhYmxlQWN0aW9uU2F2ZTogZmFsc2UsXG4gICAgaW5saW5lQWRkOiB0cnVlLFxuICAgIG9uQWRkQ2xpY2s6IG51bGwsXG4gICAgb25FZGl0Q2xpY2s6IG51bGwsXG4gICAgdGFiSW5kZXg6IDEsXG4gIH07XG5cbiAgaGFuZGxlU2F2ZUJ1dHRvbkNsaWNrID0gKCkgPT4ge1xuICAgIGxldCB2YWxpZCA9IHRydWU7XG4gICAgaWYgKHRoaXMucHJvcHMuaXNFZGl0aW5nKSB7XG4gICAgICB2YWxpZCA9IHRoaXMucHJvcHMudmFsaWRhdGVFZGl0ZWRSb3dzKFxuICAgICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICAgIHRoaXMucHJvcHMuY29sdW1ucyxcbiAgICAgICk7XG4gICAgfVxuICAgIGlmICh2YWxpZCAmJiB0aGlzLnByb3BzLmlzQ3JlYXRpbmcpIHtcbiAgICAgIHZhbGlkID0gdGhpcy5wcm9wcy52YWxpZGF0ZUNyZWF0ZWRSb3dzKHRoaXMucHJvcHMuZ3JpZCwgdGhpcy5wcm9wcy5jb2x1bW5zKTtcbiAgICB9XG4gICAgaWYgKHZhbGlkKSB7XG4gICAgICB0aGlzLnByb3BzLnNhdmUodGhpcy5wcm9wcy5ncmlkLCB0aGlzLnByb3BzLm9uU2F2ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHJvcHMuYWZ0ZXJWYWxpZGF0aW9uRXJyb3IoKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVDYW5jZWxCdXR0b25DbGljayA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLmNhbmNlbCh0aGlzLnByb3BzLmdyaWQpO1xuICAgIHRoaXMucHJvcHMub25DYW5jZWwoKTtcbiAgfVxuXG4gIGhhbmRsZUFkZEJ1dHRvbkNsaWNrID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMuYWRkTmV3SXRlbSh0aGlzLnByb3BzLmdyaWQsIFV0aWxzLmdldENvbHVtbkRlZmF1bHRWYWx1ZXModGhpcy5wcm9wcy5jb2x1bW5zKSk7XG4gICAgdGhpcy5wcm9wcy5hZnRlckFkZEl0ZW0oKTtcbiAgfVxuXG4gIGhhbmRsZUVkaXRCdXR0b25DbGljayA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuZGlzYWJsZUFjdGlvbnMpIHtcbiAgICAgIHRoaXMucHJvcHMuZWRpdCh0aGlzLnByb3BzLmdyaWQpO1xuICAgICAgdGhpcy5wcm9wcy5hZnRlckVkaXRQcmVzcygpO1xuICAgICAgaWYgKHRoaXMucHJvcHMub25FZGl0Q2xpY2spIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkVkaXRDbGljaygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUNyZWF0ZUJ1dHRvbkNsaWNrID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5kaXNhYmxlQWN0aW9ucykge1xuICAgICAgaWYgKHRoaXMucHJvcHMub25BZGRDbGljaykge1xuICAgICAgICB0aGlzLnByb3BzLm9uQWRkQ2xpY2soKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucHJvcHMuY3JlYXRlKHRoaXMucHJvcHMuZ3JpZCwgVXRpbHMuZ2V0Q29sdW1uRGVmYXVsdFZhbHVlcyh0aGlzLnByb3BzLmNvbHVtbnMpKTtcbiAgICAgICAgdGhpcy5wcm9wcy5hZnRlckFkZEl0ZW0oKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgZGlzYWJsZUFjdGlvbnMsXG4gICAgICBkaXNhYmxlQWN0aW9uc01lc3NhZ2UsXG4gICAgICBkaXNhYmxlQWN0aW9uU2F2ZSxcbiAgICAgIGdyaWQsXG4gICAgICBpbmxpbmVBZGQsXG4gICAgICBpc0J1c3ksXG4gICAgICBpc0NyZWF0aW5nLFxuICAgICAgaXNFZGl0aW5nLFxuICAgICAgdGFiSW5kZXgsXG4gICAgICBkYXRhLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChpc0NyZWF0aW5nIHx8IGlzRWRpdGluZykge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1pbmxpbmUtZWRpdC1jb250cm9sc1wiPlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGRpc2FibGVkPXtpc0J1c3kgfHwgZGlzYWJsZUFjdGlvbnMgfHwgZGlzYWJsZUFjdGlvblNhdmV9XG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZVNhdmVCdXR0b25DbGlja31cbiAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleCArIDF9XG4gICAgICAgICAgICBpZD17YG9jLWRhdGFncmlkLWNvbnRyb2xzLXNhdmUtJHtncmlkLmlkfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPE0gaWQ9XCJHcmlkLlNhdmVcIiAvPlxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGRpc2FibGVkPXtpc0J1c3kgfHwgZGlzYWJsZUFjdGlvbnN9XG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNhbmNlbEJ1dHRvbkNsaWNrfVxuICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4ICsgMn1cbiAgICAgICAgICAgIGlkPXtgb2MtZGF0YWdyaWQtY29udHJvbHMtY2FuY2VsLSR7Z3JpZC5pZH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxNIGlkPVwiR3JpZC5DYW5jZWxcIiAvPlxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIHtpc0NyZWF0aW5nICYmXG4gICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgIGRpc2FibGVkPXtpc0J1c3kgfHwgZGlzYWJsZUFjdGlvbnN9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQWRkQnV0dG9uQ2xpY2t9XG4gICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleCArIDN9XG4gICAgICAgICAgICAgIGlkPXtgb2MtZGF0YWdyaWQtY29udHJvbHMtYWRkLSR7Z3JpZC5pZH1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8TSBpZD1cIkdyaWQuQWRkXCIgLz5cbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgICBsZXQgbWVzc2FnZSA9IHt9O1xuICAgIGlmIChkaXNhYmxlQWN0aW9ucyAmJiBkaXNhYmxlQWN0aW9uc01lc3NhZ2UpIHtcbiAgICAgIG1lc3NhZ2UgPSB7XG4gICAgICAgIGluZm9NZXNzYWdlOiB7XG4gICAgICAgICAgaWQ6IGRpc2FibGVBY3Rpb25zTWVzc2FnZS5tZXNzYWdlSWQsXG4gICAgICAgICAgdmFsdWVzOiBkaXNhYmxlQWN0aW9uc01lc3NhZ2UubWVzc2FnZVZhbHVlcyxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0IGhhc0RhdGEgPSBkYXRhLnNpemUgPj0gMTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWlubGluZS1lZGl0LWNvbnRyb2xzXCI+XG4gICAgICAgIDxDZWxsVG9vbFRpcFxuICAgICAgICAgIGlkPXtgb2MtZGF0YWdyaWQtY29udHJvbHMtdG9vbHRpcC0ke2dyaWQuaWR9YH1cbiAgICAgICAgICB7Li4ubWVzc2FnZX1cbiAgICAgICAgPlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGRpc2FibGVkPXtpc0J1c3kgfHwgIWhhc0RhdGF9XG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUVkaXRCdXR0b25DbGlja31cbiAgICAgICAgICAgIGlkPXtgb2MtZGF0YWdyaWQtY29udHJvbHMtZWRpdC0ke2dyaWQuaWR9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8TSBpZD1cIkdyaWQuRWRpdFwiIC8+XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAge2lubGluZUFkZCAmJlxuICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICBkaXNhYmxlZD17aXNCdXN5fVxuICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNyZWF0ZUJ1dHRvbkNsaWNrfVxuICAgICAgICAgICAgICBpZD17YG9jLWRhdGFncmlkLWNvbnRyb2xzLWNyZWF0ZS0ke2dyaWQuaWR9YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPE0gaWQ9XCJHcmlkLkFkZFwiIC8+XG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICB9XG4gICAgICAgIDwvQ2VsbFRvb2xUaXA+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=