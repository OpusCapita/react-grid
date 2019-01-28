var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
      _this.props.addNewItem(_this.props.grid, Utils.getColumnDefaultValues(_this.props.columns));
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
          _this.props.create(_this.props.grid, Utils.getColumnDefaultValues(_this.props.columns));
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
      return React.createElement(
        'div',
        { className: 'oc-datagrid-inline-edit-controls' },
        React.createElement(
          Button,
          {
            disabled: isBusy || disableActions || disableActionSave,
            onClick: this.handleSaveButtonClick,
            tabIndex: tabIndex + 1,
            id: 'oc-datagrid-controls-save-' + grid.id
          },
          React.createElement(M, { id: 'Grid.Save' })
        ),
        React.createElement(
          Button,
          {
            disabled: isBusy || disableActions,
            onClick: this.handleCancelButtonClick,
            tabIndex: tabIndex + 2,
            id: 'oc-datagrid-controls-cancel-' + grid.id
          },
          React.createElement(M, { id: 'Grid.Cancel' })
        ),
        isCreating && React.createElement(
          Button,
          {
            disabled: isBusy || disableActions,
            onClick: this.handleAddButtonClick,
            tabIndex: tabIndex + 3,
            id: 'oc-datagrid-controls-add-' + grid.id
          },
          React.createElement(M, { id: 'Grid.Add' })
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

    return React.createElement(
      'div',
      { className: 'oc-datagrid-inline-edit-controls' },
      React.createElement(
        CellToolTip,
        _extends({
          id: 'oc-datagrid-controls-tooltip-' + grid.id
        }, message),
        React.createElement(
          Button,
          {
            disabled: isBusy || !hasData,
            onClick: this.handleEditButtonClick,
            id: 'oc-datagrid-controls-edit-' + grid.id
          },
          React.createElement(M, { id: 'Grid.Edit' })
        ),
        inlineAdd && React.createElement(
          Button,
          {
            disabled: isBusy,
            onClick: this.handleCreateButtonClick,
            id: 'oc-datagrid-controls-create-' + grid.id
          },
          React.createElement(M, { id: 'Grid.Add' })
        )
      )
    );
  };

  return InlineEditControls;
}(React.PureComponent), _class.defaultProps = {
  disableActions: false,
  disableActionsMessage: { messageId: 'Grid.DisableActionsMessage' },
  disableActionSave: false,
  inlineAdd: true,
  onAddClick: null,
  onEditClick: null,
  tabIndex: 1
}, _temp2);
export { InlineEditControls as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9pbmxpbmUtZWRpdC1jb250cm9scy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiSW1tdXRhYmxlUHJvcFR5cGVzIiwiQnV0dG9uIiwiRm9ybWF0dGVkTWVzc2FnZSIsIk0iLCJDZWxsVG9vbFRpcCIsImdyaWRTaGFwZSIsIlV0aWxzIiwiSW5saW5lRWRpdENvbnRyb2xzIiwiaGFuZGxlU2F2ZUJ1dHRvbkNsaWNrIiwidmFsaWQiLCJwcm9wcyIsImlzRWRpdGluZyIsInZhbGlkYXRlRWRpdGVkUm93cyIsImdyaWQiLCJjb2x1bW5zIiwiaXNDcmVhdGluZyIsInZhbGlkYXRlQ3JlYXRlZFJvd3MiLCJzYXZlIiwib25TYXZlIiwiYWZ0ZXJWYWxpZGF0aW9uRXJyb3IiLCJoYW5kbGVDYW5jZWxCdXR0b25DbGljayIsImNhbmNlbCIsIm9uQ2FuY2VsIiwiaGFuZGxlQWRkQnV0dG9uQ2xpY2siLCJhZGROZXdJdGVtIiwiZ2V0Q29sdW1uRGVmYXVsdFZhbHVlcyIsImFmdGVyQWRkSXRlbSIsImhhbmRsZUVkaXRCdXR0b25DbGljayIsImRpc2FibGVBY3Rpb25zIiwiZWRpdCIsImFmdGVyRWRpdFByZXNzIiwib25FZGl0Q2xpY2siLCJoYW5kbGVDcmVhdGVCdXR0b25DbGljayIsIm9uQWRkQ2xpY2siLCJjcmVhdGUiLCJyZW5kZXIiLCJkaXNhYmxlQWN0aW9uc01lc3NhZ2UiLCJkaXNhYmxlQWN0aW9uU2F2ZSIsImlubGluZUFkZCIsImlzQnVzeSIsInRhYkluZGV4IiwiZGF0YSIsImlkIiwibWVzc2FnZSIsImluZm9NZXNzYWdlIiwibWVzc2FnZUlkIiwidmFsdWVzIiwibWVzc2FnZVZhbHVlcyIsImhhc0RhdGEiLCJzaXplIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQ0EsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNB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ZjtBQUNFO0FBQUMsbUJBQUQ7QUFBQTtBQUNFLGdEQUFvQ3BDLEtBQUs2QjtBQUQzQyxXQUVNQyxPQUZOO0FBSUU7QUFBQyxnQkFBRDtBQUFBO0FBQ0Usc0JBQVVKLFVBQVUsQ0FBQ1MsT0FEdkI7QUFFRSxxQkFBUyxLQUFLckIscUJBRmhCO0FBR0UsK0NBQWlDZCxLQUFLNkI7QUFIeEM7QUFLRSw4QkFBQyxDQUFELElBQUcsSUFBRyxXQUFOO0FBTEYsU0FKRjtBQVdHSixxQkFDQztBQUFDLGdCQUFEO0FBQUE7QUFDRSxzQkFBVUMsTUFEWjtBQUVFLHFCQUFTLEtBQUtQLHVCQUZoQjtBQUdFLGlEQUFtQ25CLEtBQUs2QjtBQUgxQztBQUtFLDhCQUFDLENBQUQsSUFBRyxJQUFHLFVBQU47QUFMRjtBQVpKO0FBREYsS0FERjtBQXlCRCxHOzs7RUE1SzZDNUMsTUFBTW9ELGEsVUFnQzdDQyxZLEdBQWU7QUFDcEJ2QixrQkFBZ0IsS0FESTtBQUVwQlEseUJBQXVCLEVBQUVTLFdBQVcsNEJBQWIsRUFGSDtBQUdwQlIscUJBQW1CLEtBSEM7QUFJcEJDLGFBQVcsSUFKUztBQUtwQkwsY0FBWSxJQUxRO0FBTXBCRixlQUFhLElBTk87QUFPcEJTLFlBQVU7QUFQVSxDO1NBaENIakMsa0IiLCJmaWxlIjoiaW5saW5lLWVkaXQtY29udHJvbHMuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3QvZm9yYmlkLXByb3AtdHlwZXMgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IEltbXV0YWJsZVByb3BUeXBlcyBmcm9tICdyZWFjdC1pbW11dGFibGUtcHJvcHR5cGVzJztcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlIGFzIE0gfSBmcm9tICdyZWFjdC1pbnRsJztcbmltcG9ydCBDZWxsVG9vbFRpcCBmcm9tICcuL2NlbGwtdG9vbHRpcC5jb21wb25lbnQnO1xuaW1wb3J0IHsgZ3JpZFNoYXBlIH0gZnJvbSAnLi9kYXRhZ3JpZC5wcm9wcyc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9kYXRhZ3JpZC51dGlscyc7XG5pbXBvcnQgJy4vaW5saW5lLWVkaXQtY29udHJvbHMuY29tcG9uZW50LnNjc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmxpbmVFZGl0Q29udHJvbHMgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBncmlkOiBncmlkU2hhcGUuaXNSZXF1aXJlZCxcbiAgICBhZGROZXdJdGVtOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGNyZWF0ZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBlZGl0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHNhdmU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgY2FuY2VsOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHZhbGlkYXRlRWRpdGVkUm93czogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICB2YWxpZGF0ZUNyZWF0ZWRSb3dzOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGlzQnVzeTogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpc0VkaXRpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgaXNDcmVhdGluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBvblNhdmU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgb25DYW5jZWw6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgb25BZGRDbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25FZGl0Q2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIGFmdGVyQWRkSXRlbTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBhZnRlckVkaXRQcmVzczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBhZnRlclZhbGlkYXRpb25FcnJvcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBjb2x1bW5zOiBQcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCxcbiAgICBkaXNhYmxlQWN0aW9uczogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGlzYWJsZUFjdGlvbnNNZXNzYWdlOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgbWVzc2FnZUlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgbWVzc2FnZVZhbHVlczogUHJvcFR5cGVzLnNoYXBlKHt9KSxcbiAgICB9KSxcbiAgICBkaXNhYmxlQWN0aW9uU2F2ZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgaW5saW5lQWRkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB0YWJJbmRleDogUHJvcFR5cGVzLm51bWJlcixcbiAgICBkYXRhOiBJbW11dGFibGVQcm9wVHlwZXMubGlzdC5pc1JlcXVpcmVkLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgZGlzYWJsZUFjdGlvbnM6IGZhbHNlLFxuICAgIGRpc2FibGVBY3Rpb25zTWVzc2FnZTogeyBtZXNzYWdlSWQ6ICdHcmlkLkRpc2FibGVBY3Rpb25zTWVzc2FnZScgfSxcbiAgICBkaXNhYmxlQWN0aW9uU2F2ZTogZmFsc2UsXG4gICAgaW5saW5lQWRkOiB0cnVlLFxuICAgIG9uQWRkQ2xpY2s6IG51bGwsXG4gICAgb25FZGl0Q2xpY2s6IG51bGwsXG4gICAgdGFiSW5kZXg6IDEsXG4gIH07XG5cbiAgaGFuZGxlU2F2ZUJ1dHRvbkNsaWNrID0gKCkgPT4ge1xuICAgIGxldCB2YWxpZCA9IHRydWU7XG4gICAgaWYgKHRoaXMucHJvcHMuaXNFZGl0aW5nKSB7XG4gICAgICB2YWxpZCA9IHRoaXMucHJvcHMudmFsaWRhdGVFZGl0ZWRSb3dzKFxuICAgICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICAgIHRoaXMucHJvcHMuY29sdW1ucyxcbiAgICAgICk7XG4gICAgfVxuICAgIGlmICh2YWxpZCAmJiB0aGlzLnByb3BzLmlzQ3JlYXRpbmcpIHtcbiAgICAgIHZhbGlkID0gdGhpcy5wcm9wcy52YWxpZGF0ZUNyZWF0ZWRSb3dzKHRoaXMucHJvcHMuZ3JpZCwgdGhpcy5wcm9wcy5jb2x1bW5zKTtcbiAgICB9XG4gICAgaWYgKHZhbGlkKSB7XG4gICAgICB0aGlzLnByb3BzLnNhdmUodGhpcy5wcm9wcy5ncmlkLCB0aGlzLnByb3BzLm9uU2F2ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHJvcHMuYWZ0ZXJWYWxpZGF0aW9uRXJyb3IoKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVDYW5jZWxCdXR0b25DbGljayA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLmNhbmNlbCh0aGlzLnByb3BzLmdyaWQpO1xuICAgIHRoaXMucHJvcHMub25DYW5jZWwoKTtcbiAgfVxuXG4gIGhhbmRsZUFkZEJ1dHRvbkNsaWNrID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMuYWRkTmV3SXRlbSh0aGlzLnByb3BzLmdyaWQsIFV0aWxzLmdldENvbHVtbkRlZmF1bHRWYWx1ZXModGhpcy5wcm9wcy5jb2x1bW5zKSk7XG4gICAgdGhpcy5wcm9wcy5hZnRlckFkZEl0ZW0oKTtcbiAgfVxuXG4gIGhhbmRsZUVkaXRCdXR0b25DbGljayA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuZGlzYWJsZUFjdGlvbnMpIHtcbiAgICAgIHRoaXMucHJvcHMuZWRpdCh0aGlzLnByb3BzLmdyaWQpO1xuICAgICAgdGhpcy5wcm9wcy5hZnRlckVkaXRQcmVzcygpO1xuICAgICAgaWYgKHRoaXMucHJvcHMub25FZGl0Q2xpY2spIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkVkaXRDbGljaygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUNyZWF0ZUJ1dHRvbkNsaWNrID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5kaXNhYmxlQWN0aW9ucykge1xuICAgICAgaWYgKHRoaXMucHJvcHMub25BZGRDbGljaykge1xuICAgICAgICB0aGlzLnByb3BzLm9uQWRkQ2xpY2soKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucHJvcHMuY3JlYXRlKHRoaXMucHJvcHMuZ3JpZCwgVXRpbHMuZ2V0Q29sdW1uRGVmYXVsdFZhbHVlcyh0aGlzLnByb3BzLmNvbHVtbnMpKTtcbiAgICAgICAgdGhpcy5wcm9wcy5hZnRlckFkZEl0ZW0oKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgZGlzYWJsZUFjdGlvbnMsXG4gICAgICBkaXNhYmxlQWN0aW9uc01lc3NhZ2UsXG4gICAgICBkaXNhYmxlQWN0aW9uU2F2ZSxcbiAgICAgIGdyaWQsXG4gICAgICBpbmxpbmVBZGQsXG4gICAgICBpc0J1c3ksXG4gICAgICBpc0NyZWF0aW5nLFxuICAgICAgaXNFZGl0aW5nLFxuICAgICAgdGFiSW5kZXgsXG4gICAgICBkYXRhLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChpc0NyZWF0aW5nIHx8IGlzRWRpdGluZykge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1pbmxpbmUtZWRpdC1jb250cm9sc1wiPlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGRpc2FibGVkPXtpc0J1c3kgfHwgZGlzYWJsZUFjdGlvbnMgfHwgZGlzYWJsZUFjdGlvblNhdmV9XG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZVNhdmVCdXR0b25DbGlja31cbiAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleCArIDF9XG4gICAgICAgICAgICBpZD17YG9jLWRhdGFncmlkLWNvbnRyb2xzLXNhdmUtJHtncmlkLmlkfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPE0gaWQ9XCJHcmlkLlNhdmVcIiAvPlxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGRpc2FibGVkPXtpc0J1c3kgfHwgZGlzYWJsZUFjdGlvbnN9XG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNhbmNlbEJ1dHRvbkNsaWNrfVxuICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4ICsgMn1cbiAgICAgICAgICAgIGlkPXtgb2MtZGF0YWdyaWQtY29udHJvbHMtY2FuY2VsLSR7Z3JpZC5pZH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxNIGlkPVwiR3JpZC5DYW5jZWxcIiAvPlxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIHtpc0NyZWF0aW5nICYmXG4gICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgIGRpc2FibGVkPXtpc0J1c3kgfHwgZGlzYWJsZUFjdGlvbnN9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQWRkQnV0dG9uQ2xpY2t9XG4gICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleCArIDN9XG4gICAgICAgICAgICAgIGlkPXtgb2MtZGF0YWdyaWQtY29udHJvbHMtYWRkLSR7Z3JpZC5pZH1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8TSBpZD1cIkdyaWQuQWRkXCIgLz5cbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgICBsZXQgbWVzc2FnZSA9IHt9O1xuICAgIGlmIChkaXNhYmxlQWN0aW9ucyAmJiBkaXNhYmxlQWN0aW9uc01lc3NhZ2UpIHtcbiAgICAgIG1lc3NhZ2UgPSB7XG4gICAgICAgIGluZm9NZXNzYWdlOiB7XG4gICAgICAgICAgaWQ6IGRpc2FibGVBY3Rpb25zTWVzc2FnZS5tZXNzYWdlSWQsXG4gICAgICAgICAgdmFsdWVzOiBkaXNhYmxlQWN0aW9uc01lc3NhZ2UubWVzc2FnZVZhbHVlcyxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0IGhhc0RhdGEgPSBkYXRhLnNpemUgPj0gMTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWlubGluZS1lZGl0LWNvbnRyb2xzXCI+XG4gICAgICAgIDxDZWxsVG9vbFRpcFxuICAgICAgICAgIGlkPXtgb2MtZGF0YWdyaWQtY29udHJvbHMtdG9vbHRpcC0ke2dyaWQuaWR9YH1cbiAgICAgICAgICB7Li4ubWVzc2FnZX1cbiAgICAgICAgPlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGRpc2FibGVkPXtpc0J1c3kgfHwgIWhhc0RhdGF9XG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUVkaXRCdXR0b25DbGlja31cbiAgICAgICAgICAgIGlkPXtgb2MtZGF0YWdyaWQtY29udHJvbHMtZWRpdC0ke2dyaWQuaWR9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8TSBpZD1cIkdyaWQuRWRpdFwiIC8+XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAge2lubGluZUFkZCAmJlxuICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICBkaXNhYmxlZD17aXNCdXN5fVxuICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNyZWF0ZUJ1dHRvbkNsaWNrfVxuICAgICAgICAgICAgICBpZD17YG9jLWRhdGFncmlkLWNvbnRyb2xzLWNyZWF0ZS0ke2dyaWQuaWR9YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPE0gaWQ9XCJHcmlkLkFkZFwiIC8+XG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICB9XG4gICAgICAgIDwvQ2VsbFRvb2xUaXA+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=