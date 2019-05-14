function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Button } from 'react-bootstrap';
import { FormattedMessage as M } from 'react-intl';
import CellToolTip from './cell-tooltip.component';
import { gridShape } from './datagrid.props';
import Utils from './datagrid.utils';
import './inline-edit-controls.component.scss';

var InlineEditControls =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(InlineEditControls, _React$PureComponent);

  function InlineEditControls() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "handleSaveButtonClick", function () {
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
    });

    _defineProperty(_assertThisInitialized(_this), "handleCancelButtonClick", function () {
      _this.props.cancel(_this.props.grid);

      _this.props.onCancel();
    });

    _defineProperty(_assertThisInitialized(_this), "handleAddButtonClick", function () {
      _this.props.addNewItem(_this.props.grid, Utils.getColumnDefaultValues(_this.props.columns));

      _this.props.afterAddItem();
    });

    _defineProperty(_assertThisInitialized(_this), "handleEditButtonClick", function () {
      if (!_this.props.disableActions) {
        _this.props.edit(_this.props.grid);

        _this.props.afterEditPress();

        if (_this.props.onEditClick) {
          _this.props.onEditClick();
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleCreateButtonClick", function () {
      if (!_this.props.disableActions) {
        if (_this.props.onAddClick) {
          _this.props.onAddClick();
        } else {
          _this.props.create(_this.props.grid, Utils.getColumnDefaultValues(_this.props.columns));

          _this.props.afterAddItem();
        }
      }
    });

    return _this;
  }

  var _proto = InlineEditControls.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        disableActions = _this$props.disableActions,
        disableActionsMessage = _this$props.disableActionsMessage,
        disableActionSave = _this$props.disableActionSave,
        grid = _this$props.grid,
        inlineAdd = _this$props.inlineAdd,
        isBusy = _this$props.isBusy,
        isCreating = _this$props.isCreating,
        isEditing = _this$props.isEditing,
        tabIndex = _this$props.tabIndex,
        data = _this$props.data;

    if (isCreating || isEditing) {
      return React.createElement("div", {
        className: "oc-datagrid-inline-edit-controls"
      }, React.createElement(Button, {
        disabled: isBusy || disableActions || disableActionSave,
        onClick: this.handleSaveButtonClick,
        tabIndex: tabIndex + 1,
        id: "oc-datagrid-controls-save-" + grid.id
      }, React.createElement(M, {
        id: "Grid.Save"
      })), React.createElement(Button, {
        disabled: isBusy || disableActions,
        onClick: this.handleCancelButtonClick,
        tabIndex: tabIndex + 2,
        id: "oc-datagrid-controls-cancel-" + grid.id
      }, React.createElement(M, {
        id: "Grid.Cancel"
      })), isCreating && React.createElement(Button, {
        disabled: isBusy || disableActions,
        onClick: this.handleAddButtonClick,
        tabIndex: tabIndex + 3,
        id: "oc-datagrid-controls-add-" + grid.id
      }, React.createElement(M, {
        id: "Grid.Add"
      })));
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
    return React.createElement("div", {
      className: "oc-datagrid-inline-edit-controls"
    }, React.createElement(CellToolTip, _extends({
      id: "oc-datagrid-controls-tooltip-" + grid.id
    }, message), React.createElement(Button, {
      disabled: isBusy || !hasData,
      onClick: this.handleEditButtonClick,
      id: "oc-datagrid-controls-edit-" + grid.id
    }, React.createElement(M, {
      id: "Grid.Edit"
    })), inlineAdd && React.createElement(Button, {
      disabled: isBusy,
      onClick: this.handleCreateButtonClick,
      id: "oc-datagrid-controls-create-" + grid.id
    }, React.createElement(M, {
      id: "Grid.Add"
    }))));
  };

  return InlineEditControls;
}(React.PureComponent);

_defineProperty(InlineEditControls, "defaultProps", {
  disableActions: false,
  disableActionsMessage: {
    messageId: 'Grid.DisableActionsMessage'
  },
  disableActionSave: false,
  inlineAdd: true,
  onAddClick: null,
  onEditClick: null,
  tabIndex: 1
});

export { InlineEditControls as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9pbmxpbmUtZWRpdC1jb250cm9scy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiSW1tdXRhYmxlUHJvcFR5cGVzIiwiQnV0dG9uIiwiRm9ybWF0dGVkTWVzc2FnZSIsIk0iLCJDZWxsVG9vbFRpcCIsImdyaWRTaGFwZSIsIlV0aWxzIiwiSW5saW5lRWRpdENvbnRyb2xzIiwidmFsaWQiLCJwcm9wcyIsImlzRWRpdGluZyIsInZhbGlkYXRlRWRpdGVkUm93cyIsImdyaWQiLCJjb2x1bW5zIiwiaXNDcmVhdGluZyIsInZhbGlkYXRlQ3JlYXRlZFJvd3MiLCJzYXZlIiwib25TYXZlIiwiYWZ0ZXJWYWxpZGF0aW9uRXJyb3IiLCJjYW5jZWwiLCJvbkNhbmNlbCIsImFkZE5ld0l0ZW0iLCJnZXRDb2x1bW5EZWZhdWx0VmFsdWVzIiwiYWZ0ZXJBZGRJdGVtIiwiZGlzYWJsZUFjdGlvbnMiLCJlZGl0IiwiYWZ0ZXJFZGl0UHJlc3MiLCJvbkVkaXRDbGljayIsIm9uQWRkQ2xpY2siLCJjcmVhdGUiLCJyZW5kZXIiLCJkaXNhYmxlQWN0aW9uc01lc3NhZ2UiLCJkaXNhYmxlQWN0aW9uU2F2ZSIsImlubGluZUFkZCIsImlzQnVzeSIsInRhYkluZGV4IiwiZGF0YSIsImhhbmRsZVNhdmVCdXR0b25DbGljayIsImlkIiwiaGFuZGxlQ2FuY2VsQnV0dG9uQ2xpY2siLCJoYW5kbGVBZGRCdXR0b25DbGljayIsIm1lc3NhZ2UiLCJpbmZvTWVzc2FnZSIsIm1lc3NhZ2VJZCIsInZhbHVlcyIsIm1lc3NhZ2VWYWx1ZXMiLCJoYXNEYXRhIiwic2l6ZSIsImhhbmRsZUVkaXRCdXR0b25DbGljayIsImhhbmRsZUNyZWF0ZUJ1dHRvbkNsaWNrIiwiUHVyZUNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNC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LEVBQUFBLFVBQVUsRUFBRSxJQUxRO0FBTXBCRCxFQUFBQSxXQUFXLEVBQUUsSUFOTztBQU9wQlEsRUFBQUEsUUFBUSxFQUFFO0FBUFUsQzs7U0FoQ0g1QixrQiIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L2ZvcmJpZC1wcm9wLXR5cGVzICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IHsgRm9ybWF0dGVkTWVzc2FnZSBhcyBNIH0gZnJvbSAncmVhY3QtaW50bCc7XG5pbXBvcnQgQ2VsbFRvb2xUaXAgZnJvbSAnLi9jZWxsLXRvb2x0aXAuY29tcG9uZW50JztcbmltcG9ydCB7IGdyaWRTaGFwZSB9IGZyb20gJy4vZGF0YWdyaWQucHJvcHMnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4vZGF0YWdyaWQudXRpbHMnO1xuaW1wb3J0ICcuL2lubGluZS1lZGl0LWNvbnRyb2xzLmNvbXBvbmVudC5zY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5saW5lRWRpdENvbnRyb2xzIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgZ3JpZDogZ3JpZFNoYXBlLmlzUmVxdWlyZWQsXG4gICAgYWRkTmV3SXRlbTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBjcmVhdGU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgZWRpdDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBzYXZlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGNhbmNlbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICB2YWxpZGF0ZUVkaXRlZFJvd3M6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgdmFsaWRhdGVDcmVhdGVkUm93czogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBpc0J1c3k6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgaXNFZGl0aW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGlzQ3JlYXRpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgb25TYXZlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uQ2FuY2VsOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uQWRkQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uRWRpdENsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBhZnRlckFkZEl0ZW06IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgYWZ0ZXJFZGl0UHJlc3M6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgYWZ0ZXJWYWxpZGF0aW9uRXJyb3I6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgY29sdW1uczogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXG4gICAgZGlzYWJsZUFjdGlvbnM6IFByb3BUeXBlcy5ib29sLFxuICAgIGRpc2FibGVBY3Rpb25zTWVzc2FnZTogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIG1lc3NhZ2VJZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIG1lc3NhZ2VWYWx1ZXM6IFByb3BUeXBlcy5zaGFwZSh7fSksXG4gICAgfSksXG4gICAgZGlzYWJsZUFjdGlvblNhdmU6IFByb3BUeXBlcy5ib29sLFxuICAgIGlubGluZUFkZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgdGFiSW5kZXg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgZGF0YTogSW1tdXRhYmxlUHJvcFR5cGVzLmxpc3QuaXNSZXF1aXJlZCxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGRpc2FibGVBY3Rpb25zOiBmYWxzZSxcbiAgICBkaXNhYmxlQWN0aW9uc01lc3NhZ2U6IHsgbWVzc2FnZUlkOiAnR3JpZC5EaXNhYmxlQWN0aW9uc01lc3NhZ2UnIH0sXG4gICAgZGlzYWJsZUFjdGlvblNhdmU6IGZhbHNlLFxuICAgIGlubGluZUFkZDogdHJ1ZSxcbiAgICBvbkFkZENsaWNrOiBudWxsLFxuICAgIG9uRWRpdENsaWNrOiBudWxsLFxuICAgIHRhYkluZGV4OiAxLFxuICB9O1xuXG4gIGhhbmRsZVNhdmVCdXR0b25DbGljayA9ICgpID0+IHtcbiAgICBsZXQgdmFsaWQgPSB0cnVlO1xuICAgIGlmICh0aGlzLnByb3BzLmlzRWRpdGluZykge1xuICAgICAgdmFsaWQgPSB0aGlzLnByb3BzLnZhbGlkYXRlRWRpdGVkUm93cyh0aGlzLnByb3BzLmdyaWQsIHRoaXMucHJvcHMuY29sdW1ucyk7XG4gICAgfVxuICAgIGlmICh2YWxpZCAmJiB0aGlzLnByb3BzLmlzQ3JlYXRpbmcpIHtcbiAgICAgIHZhbGlkID0gdGhpcy5wcm9wcy52YWxpZGF0ZUNyZWF0ZWRSb3dzKHRoaXMucHJvcHMuZ3JpZCwgdGhpcy5wcm9wcy5jb2x1bW5zKTtcbiAgICB9XG4gICAgaWYgKHZhbGlkKSB7XG4gICAgICB0aGlzLnByb3BzLnNhdmUodGhpcy5wcm9wcy5ncmlkLCB0aGlzLnByb3BzLm9uU2F2ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHJvcHMuYWZ0ZXJWYWxpZGF0aW9uRXJyb3IoKTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlQ2FuY2VsQnV0dG9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5jYW5jZWwodGhpcy5wcm9wcy5ncmlkKTtcbiAgICB0aGlzLnByb3BzLm9uQ2FuY2VsKCk7XG4gIH07XG5cbiAgaGFuZGxlQWRkQnV0dG9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5hZGROZXdJdGVtKHRoaXMucHJvcHMuZ3JpZCwgVXRpbHMuZ2V0Q29sdW1uRGVmYXVsdFZhbHVlcyh0aGlzLnByb3BzLmNvbHVtbnMpKTtcbiAgICB0aGlzLnByb3BzLmFmdGVyQWRkSXRlbSgpO1xuICB9O1xuXG4gIGhhbmRsZUVkaXRCdXR0b25DbGljayA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuZGlzYWJsZUFjdGlvbnMpIHtcbiAgICAgIHRoaXMucHJvcHMuZWRpdCh0aGlzLnByb3BzLmdyaWQpO1xuICAgICAgdGhpcy5wcm9wcy5hZnRlckVkaXRQcmVzcygpO1xuICAgICAgaWYgKHRoaXMucHJvcHMub25FZGl0Q2xpY2spIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkVkaXRDbGljaygpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBoYW5kbGVDcmVhdGVCdXR0b25DbGljayA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuZGlzYWJsZUFjdGlvbnMpIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLm9uQWRkQ2xpY2spIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkFkZENsaWNrKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnByb3BzLmNyZWF0ZSh0aGlzLnByb3BzLmdyaWQsIFV0aWxzLmdldENvbHVtbkRlZmF1bHRWYWx1ZXModGhpcy5wcm9wcy5jb2x1bW5zKSk7XG4gICAgICAgIHRoaXMucHJvcHMuYWZ0ZXJBZGRJdGVtKCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBkaXNhYmxlQWN0aW9ucyxcbiAgICAgIGRpc2FibGVBY3Rpb25zTWVzc2FnZSxcbiAgICAgIGRpc2FibGVBY3Rpb25TYXZlLFxuICAgICAgZ3JpZCxcbiAgICAgIGlubGluZUFkZCxcbiAgICAgIGlzQnVzeSxcbiAgICAgIGlzQ3JlYXRpbmcsXG4gICAgICBpc0VkaXRpbmcsXG4gICAgICB0YWJJbmRleCxcbiAgICAgIGRhdGEsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKGlzQ3JlYXRpbmcgfHwgaXNFZGl0aW5nKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWlubGluZS1lZGl0LWNvbnRyb2xzXCI+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgZGlzYWJsZWQ9e2lzQnVzeSB8fCBkaXNhYmxlQWN0aW9ucyB8fCBkaXNhYmxlQWN0aW9uU2F2ZX1cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlU2F2ZUJ1dHRvbkNsaWNrfVxuICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4ICsgMX1cbiAgICAgICAgICAgIGlkPXtgb2MtZGF0YWdyaWQtY29udHJvbHMtc2F2ZS0ke2dyaWQuaWR9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8TSBpZD1cIkdyaWQuU2F2ZVwiIC8+XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgZGlzYWJsZWQ9e2lzQnVzeSB8fCBkaXNhYmxlQWN0aW9uc31cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2FuY2VsQnV0dG9uQ2xpY2t9XG4gICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXggKyAyfVxuICAgICAgICAgICAgaWQ9e2BvYy1kYXRhZ3JpZC1jb250cm9scy1jYW5jZWwtJHtncmlkLmlkfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPE0gaWQ9XCJHcmlkLkNhbmNlbFwiIC8+XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAge2lzQ3JlYXRpbmcgJiYgKFxuICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICBkaXNhYmxlZD17aXNCdXN5IHx8IGRpc2FibGVBY3Rpb25zfVxuICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUFkZEJ1dHRvbkNsaWNrfVxuICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXggKyAzfVxuICAgICAgICAgICAgICBpZD17YG9jLWRhdGFncmlkLWNvbnRyb2xzLWFkZC0ke2dyaWQuaWR9YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPE0gaWQ9XCJHcmlkLkFkZFwiIC8+XG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICAgIGxldCBtZXNzYWdlID0ge307XG4gICAgaWYgKGRpc2FibGVBY3Rpb25zICYmIGRpc2FibGVBY3Rpb25zTWVzc2FnZSkge1xuICAgICAgbWVzc2FnZSA9IHtcbiAgICAgICAgaW5mb01lc3NhZ2U6IHtcbiAgICAgICAgICBpZDogZGlzYWJsZUFjdGlvbnNNZXNzYWdlLm1lc3NhZ2VJZCxcbiAgICAgICAgICB2YWx1ZXM6IGRpc2FibGVBY3Rpb25zTWVzc2FnZS5tZXNzYWdlVmFsdWVzLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICB9XG4gICAgY29uc3QgaGFzRGF0YSA9IGRhdGEuc2l6ZSA+PSAxO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtaW5saW5lLWVkaXQtY29udHJvbHNcIj5cbiAgICAgICAgPENlbGxUb29sVGlwIGlkPXtgb2MtZGF0YWdyaWQtY29udHJvbHMtdG9vbHRpcC0ke2dyaWQuaWR9YH0gey4uLm1lc3NhZ2V9PlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGRpc2FibGVkPXtpc0J1c3kgfHwgIWhhc0RhdGF9XG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUVkaXRCdXR0b25DbGlja31cbiAgICAgICAgICAgIGlkPXtgb2MtZGF0YWdyaWQtY29udHJvbHMtZWRpdC0ke2dyaWQuaWR9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8TSBpZD1cIkdyaWQuRWRpdFwiIC8+XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAge2lubGluZUFkZCAmJiAoXG4gICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgIGRpc2FibGVkPXtpc0J1c3l9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ3JlYXRlQnV0dG9uQ2xpY2t9XG4gICAgICAgICAgICAgIGlkPXtgb2MtZGF0YWdyaWQtY29udHJvbHMtY3JlYXRlLSR7Z3JpZC5pZH1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8TSBpZD1cIkdyaWQuQWRkXCIgLz5cbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQ2VsbFRvb2xUaXA+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=