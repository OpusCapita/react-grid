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

var InlineEditControls = /*#__PURE__*/function (_React$PureComponent) {
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
      return /*#__PURE__*/React.createElement("div", {
        className: "oc-datagrid-inline-edit-controls"
      }, /*#__PURE__*/React.createElement(Button, {
        disabled: isBusy || disableActions || disableActionSave,
        onClick: this.handleSaveButtonClick,
        tabIndex: tabIndex + 1,
        id: "oc-datagrid-controls-save-" + grid.id
      }, /*#__PURE__*/React.createElement(M, {
        id: "Grid.Save"
      })), /*#__PURE__*/React.createElement(Button, {
        disabled: isBusy || disableActions,
        onClick: this.handleCancelButtonClick,
        tabIndex: tabIndex + 2,
        id: "oc-datagrid-controls-cancel-" + grid.id
      }, /*#__PURE__*/React.createElement(M, {
        id: "Grid.Cancel"
      })), isCreating && /*#__PURE__*/React.createElement(Button, {
        disabled: isBusy || disableActions,
        onClick: this.handleAddButtonClick,
        tabIndex: tabIndex + 3,
        id: "oc-datagrid-controls-add-" + grid.id
      }, /*#__PURE__*/React.createElement(M, {
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
    return /*#__PURE__*/React.createElement("div", {
      className: "oc-datagrid-inline-edit-controls"
    }, /*#__PURE__*/React.createElement(CellToolTip, _extends({
      id: "oc-datagrid-controls-tooltip-" + grid.id
    }, message), /*#__PURE__*/React.createElement(Button, {
      disabled: isBusy || !hasData,
      onClick: this.handleEditButtonClick,
      id: "oc-datagrid-controls-edit-" + grid.id
    }, /*#__PURE__*/React.createElement(M, {
      id: "Grid.Edit"
    })), inlineAdd && /*#__PURE__*/React.createElement(Button, {
      disabled: isBusy,
      onClick: this.handleCreateButtonClick,
      id: "oc-datagrid-controls-create-" + grid.id
    }, /*#__PURE__*/React.createElement(M, {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9pbmxpbmUtZWRpdC1jb250cm9scy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiSW1tdXRhYmxlUHJvcFR5cGVzIiwiQnV0dG9uIiwiRm9ybWF0dGVkTWVzc2FnZSIsIk0iLCJDZWxsVG9vbFRpcCIsImdyaWRTaGFwZSIsIlV0aWxzIiwiSW5saW5lRWRpdENvbnRyb2xzIiwidmFsaWQiLCJwcm9wcyIsImlzRWRpdGluZyIsInZhbGlkYXRlRWRpdGVkUm93cyIsImdyaWQiLCJjb2x1bW5zIiwiaXNDcmVhdGluZyIsInZhbGlkYXRlQ3JlYXRlZFJvd3MiLCJzYXZlIiwib25TYXZlIiwiYWZ0ZXJWYWxpZGF0aW9uRXJyb3IiLCJjYW5jZWwiLCJvbkNhbmNlbCIsImFkZE5ld0l0ZW0iLCJnZXRDb2x1bW5EZWZhdWx0VmFsdWVzIiwiYWZ0ZXJBZGRJdGVtIiwiZGlzYWJsZUFjdGlvbnMiLCJlZGl0IiwiYWZ0ZXJFZGl0UHJlc3MiLCJvbkVkaXRDbGljayIsIm9uQWRkQ2xpY2siLCJjcmVhdGUiLCJyZW5kZXIiLCJkaXNhYmxlQWN0aW9uc01lc3NhZ2UiLCJkaXNhYmxlQWN0aW9uU2F2ZSIsImlubGluZUFkZCIsImlzQnVzeSIsInRhYkluZGV4IiwiZGF0YSIsImhhbmRsZVNhdmVCdXR0b25DbGljayIsImlkIiwiaGFuZGxlQ2FuY2VsQnV0dG9uQ2xpY2siLCJoYW5kbGVBZGRCdXR0b25DbGljayIsIm1lc3NhZ2UiLCJpbmZvTWVzc2FnZSIsIm1lc3NhZ2VJZCIsInZhbHVlcyIsIm1lc3NhZ2VWYWx1ZXMiLCJoYXNEYXRhIiwic2l6ZSIsImhhbmRsZUVkaXRCdXR0b25DbGljayIsImhhbmRsZUNyZWF0ZUJ1dHRvbkNsaWNrIiwiUHVyZUNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNC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QUpTO0FBS3BCTCxFQUFBQSxVQUFVLEVBQUUsSUFMUTtBQU1wQkQsRUFBQUEsV0FBVyxFQUFFLElBTk87QUFPcEJRLEVBQUFBLFFBQVEsRUFBRTtBQVBVLEM7O1NBaENINUIsa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9mb3JiaWQtcHJvcC10eXBlcyAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgSW1tdXRhYmxlUHJvcFR5cGVzIGZyb20gJ3JlYWN0LWltbXV0YWJsZS1wcm9wdHlwZXMnO1xuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgYXMgTSB9IGZyb20gJ3JlYWN0LWludGwnO1xuaW1wb3J0IENlbGxUb29sVGlwIGZyb20gJy4vY2VsbC10b29sdGlwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBncmlkU2hhcGUgfSBmcm9tICcuL2RhdGFncmlkLnByb3BzJztcbmltcG9ydCBVdGlscyBmcm9tICcuL2RhdGFncmlkLnV0aWxzJztcbmltcG9ydCAnLi9pbmxpbmUtZWRpdC1jb250cm9scy5jb21wb25lbnQuc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElubGluZUVkaXRDb250cm9scyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGdyaWQ6IGdyaWRTaGFwZS5pc1JlcXVpcmVkLFxuICAgIGFkZE5ld0l0ZW06IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgY3JlYXRlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGVkaXQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgc2F2ZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBjYW5jZWw6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgdmFsaWRhdGVFZGl0ZWRSb3dzOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHZhbGlkYXRlQ3JlYXRlZFJvd3M6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgaXNCdXN5OiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGlzRWRpdGluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpc0NyZWF0aW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIG9uU2F2ZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvbkNhbmNlbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvbkFkZENsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkVkaXRDbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgYWZ0ZXJBZGRJdGVtOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGFmdGVyRWRpdFByZXNzOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGFmdGVyVmFsaWRhdGlvbkVycm9yOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGNvbHVtbnM6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxuICAgIGRpc2FibGVBY3Rpb25zOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkaXNhYmxlQWN0aW9uc01lc3NhZ2U6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBtZXNzYWdlSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBtZXNzYWdlVmFsdWVzOiBQcm9wVHlwZXMuc2hhcGUoe30pLFxuICAgIH0pLFxuICAgIGRpc2FibGVBY3Rpb25TYXZlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBpbmxpbmVBZGQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHRhYkluZGV4OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGRhdGE6IEltbXV0YWJsZVByb3BUeXBlcy5saXN0LmlzUmVxdWlyZWQsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBkaXNhYmxlQWN0aW9uczogZmFsc2UsXG4gICAgZGlzYWJsZUFjdGlvbnNNZXNzYWdlOiB7IG1lc3NhZ2VJZDogJ0dyaWQuRGlzYWJsZUFjdGlvbnNNZXNzYWdlJyB9LFxuICAgIGRpc2FibGVBY3Rpb25TYXZlOiBmYWxzZSxcbiAgICBpbmxpbmVBZGQ6IHRydWUsXG4gICAgb25BZGRDbGljazogbnVsbCxcbiAgICBvbkVkaXRDbGljazogbnVsbCxcbiAgICB0YWJJbmRleDogMSxcbiAgfTtcblxuICBoYW5kbGVTYXZlQnV0dG9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgbGV0IHZhbGlkID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5wcm9wcy5pc0VkaXRpbmcpIHtcbiAgICAgIHZhbGlkID0gdGhpcy5wcm9wcy52YWxpZGF0ZUVkaXRlZFJvd3ModGhpcy5wcm9wcy5ncmlkLCB0aGlzLnByb3BzLmNvbHVtbnMpO1xuICAgIH1cbiAgICBpZiAodmFsaWQgJiYgdGhpcy5wcm9wcy5pc0NyZWF0aW5nKSB7XG4gICAgICB2YWxpZCA9IHRoaXMucHJvcHMudmFsaWRhdGVDcmVhdGVkUm93cyh0aGlzLnByb3BzLmdyaWQsIHRoaXMucHJvcHMuY29sdW1ucyk7XG4gICAgfVxuICAgIGlmICh2YWxpZCkge1xuICAgICAgdGhpcy5wcm9wcy5zYXZlKHRoaXMucHJvcHMuZ3JpZCwgdGhpcy5wcm9wcy5vblNhdmUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByb3BzLmFmdGVyVmFsaWRhdGlvbkVycm9yKCk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZUNhbmNlbEJ1dHRvbkNsaWNrID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMuY2FuY2VsKHRoaXMucHJvcHMuZ3JpZCk7XG4gICAgdGhpcy5wcm9wcy5vbkNhbmNlbCgpO1xuICB9O1xuXG4gIGhhbmRsZUFkZEJ1dHRvbkNsaWNrID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMuYWRkTmV3SXRlbSh0aGlzLnByb3BzLmdyaWQsIFV0aWxzLmdldENvbHVtbkRlZmF1bHRWYWx1ZXModGhpcy5wcm9wcy5jb2x1bW5zKSk7XG4gICAgdGhpcy5wcm9wcy5hZnRlckFkZEl0ZW0oKTtcbiAgfTtcblxuICBoYW5kbGVFZGl0QnV0dG9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmRpc2FibGVBY3Rpb25zKSB7XG4gICAgICB0aGlzLnByb3BzLmVkaXQodGhpcy5wcm9wcy5ncmlkKTtcbiAgICAgIHRoaXMucHJvcHMuYWZ0ZXJFZGl0UHJlc3MoKTtcbiAgICAgIGlmICh0aGlzLnByb3BzLm9uRWRpdENsaWNrKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25FZGl0Q2xpY2soKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlQ3JlYXRlQnV0dG9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmRpc2FibGVBY3Rpb25zKSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5vbkFkZENsaWNrKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25BZGRDbGljaygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wcm9wcy5jcmVhdGUodGhpcy5wcm9wcy5ncmlkLCBVdGlscy5nZXRDb2x1bW5EZWZhdWx0VmFsdWVzKHRoaXMucHJvcHMuY29sdW1ucykpO1xuICAgICAgICB0aGlzLnByb3BzLmFmdGVyQWRkSXRlbSgpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgZGlzYWJsZUFjdGlvbnMsXG4gICAgICBkaXNhYmxlQWN0aW9uc01lc3NhZ2UsXG4gICAgICBkaXNhYmxlQWN0aW9uU2F2ZSxcbiAgICAgIGdyaWQsXG4gICAgICBpbmxpbmVBZGQsXG4gICAgICBpc0J1c3ksXG4gICAgICBpc0NyZWF0aW5nLFxuICAgICAgaXNFZGl0aW5nLFxuICAgICAgdGFiSW5kZXgsXG4gICAgICBkYXRhLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChpc0NyZWF0aW5nIHx8IGlzRWRpdGluZykge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1pbmxpbmUtZWRpdC1jb250cm9sc1wiPlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGRpc2FibGVkPXtpc0J1c3kgfHwgZGlzYWJsZUFjdGlvbnMgfHwgZGlzYWJsZUFjdGlvblNhdmV9XG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZVNhdmVCdXR0b25DbGlja31cbiAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleCArIDF9XG4gICAgICAgICAgICBpZD17YG9jLWRhdGFncmlkLWNvbnRyb2xzLXNhdmUtJHtncmlkLmlkfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPE0gaWQ9XCJHcmlkLlNhdmVcIiAvPlxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGRpc2FibGVkPXtpc0J1c3kgfHwgZGlzYWJsZUFjdGlvbnN9XG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNhbmNlbEJ1dHRvbkNsaWNrfVxuICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4ICsgMn1cbiAgICAgICAgICAgIGlkPXtgb2MtZGF0YWdyaWQtY29udHJvbHMtY2FuY2VsLSR7Z3JpZC5pZH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxNIGlkPVwiR3JpZC5DYW5jZWxcIiAvPlxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIHtpc0NyZWF0aW5nICYmIChcbiAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzQnVzeSB8fCBkaXNhYmxlQWN0aW9uc31cbiAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVBZGRCdXR0b25DbGlja31cbiAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4ICsgM31cbiAgICAgICAgICAgICAgaWQ9e2BvYy1kYXRhZ3JpZC1jb250cm9scy1hZGQtJHtncmlkLmlkfWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxNIGlkPVwiR3JpZC5BZGRcIiAvPlxuICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgICBsZXQgbWVzc2FnZSA9IHt9O1xuICAgIGlmIChkaXNhYmxlQWN0aW9ucyAmJiBkaXNhYmxlQWN0aW9uc01lc3NhZ2UpIHtcbiAgICAgIG1lc3NhZ2UgPSB7XG4gICAgICAgIGluZm9NZXNzYWdlOiB7XG4gICAgICAgICAgaWQ6IGRpc2FibGVBY3Rpb25zTWVzc2FnZS5tZXNzYWdlSWQsXG4gICAgICAgICAgdmFsdWVzOiBkaXNhYmxlQWN0aW9uc01lc3NhZ2UubWVzc2FnZVZhbHVlcyxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0IGhhc0RhdGEgPSBkYXRhLnNpemUgPj0gMTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWlubGluZS1lZGl0LWNvbnRyb2xzXCI+XG4gICAgICAgIDxDZWxsVG9vbFRpcCBpZD17YG9jLWRhdGFncmlkLWNvbnRyb2xzLXRvb2x0aXAtJHtncmlkLmlkfWB9IHsuLi5tZXNzYWdlfT5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBkaXNhYmxlZD17aXNCdXN5IHx8ICFoYXNEYXRhfVxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVFZGl0QnV0dG9uQ2xpY2t9XG4gICAgICAgICAgICBpZD17YG9jLWRhdGFncmlkLWNvbnRyb2xzLWVkaXQtJHtncmlkLmlkfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPE0gaWQ9XCJHcmlkLkVkaXRcIiAvPlxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIHtpbmxpbmVBZGQgJiYgKFxuICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICBkaXNhYmxlZD17aXNCdXN5fVxuICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNyZWF0ZUJ1dHRvbkNsaWNrfVxuICAgICAgICAgICAgICBpZD17YG9jLWRhdGFncmlkLWNvbnRyb2xzLWNyZWF0ZS0ke2dyaWQuaWR9YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPE0gaWQ9XCJHcmlkLkFkZFwiIC8+XG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICApfVxuICAgICAgICA8L0NlbGxUb29sVGlwPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19