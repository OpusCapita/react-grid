var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
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
        tabIndex = _props.tabIndex;

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
        messageId: disableActionsMessage.messageId,
        messageValues: disableActionsMessage.messageValues
      };
    }
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
            disabled: isBusy,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9pbmxpbmUtZWRpdC1jb250cm9scy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiQnV0dG9uIiwiRm9ybWF0dGVkTWVzc2FnZSIsIk0iLCJDZWxsVG9vbFRpcCIsImdyaWRTaGFwZSIsIlV0aWxzIiwiSW5saW5lRWRpdENvbnRyb2xzIiwiaGFuZGxlU2F2ZUJ1dHRvbkNsaWNrIiwidmFsaWQiLCJwcm9wcyIsImlzRWRpdGluZyIsInZhbGlkYXRlRWRpdGVkUm93cyIsImdyaWQiLCJjb2x1bW5zIiwiaXNDcmVhdGluZyIsInZhbGlkYXRlQ3JlYXRlZFJvd3MiLCJzYXZlIiwib25TYXZlIiwiYWZ0ZXJWYWxpZGF0aW9uRXJyb3IiLCJoYW5kbGVDYW5jZWxCdXR0b25DbGljayIsImNhbmNlbCIsIm9uQ2FuY2VsIiwiaGFuZGxlQWRkQnV0dG9uQ2xpY2siLCJhZGROZXdJdGVtIiwiZ2V0Q29sdW1uRGVmYXVsdFZhbHVlcyIsImFmdGVyQWRkSXRlbSIsImhhbmRsZUVkaXRCdXR0b25DbGljayIsImRpc2FibGVBY3Rpb25zIiwiZWRpdCIsImFmdGVyRWRpdFByZXNzIiwib25FZGl0Q2xpY2siLCJoYW5kbGVDcmVhdGVCdXR0b25DbGljayIsIm9uQWRkQ2xpY2siLCJjcmVhdGUiLCJyZW5kZXIiLCJkaXNhYmxlQWN0aW9uc01lc3NhZ2UiLCJkaXNhYmxlQWN0aW9uU2F2ZSIsImlubGluZUFkZCIsImlzQnVzeSIsInRhYkluZGV4IiwiaWQiLCJtZXNzYWdlIiwibWVzc2FnZUlkIiwibWVzc2FnZVZhbHVlcyIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUNBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsU0FBU0MsTUFBVCxRQUF1QixpQkFBdkI7QUFDQSxTQUFTQyxvQkFBb0JDLENBQTdCLFFBQXNDLFlBQXRDO0FBQ0EsT0FBT0MsV0FBUCxNQUF3QiwwQkFBeEI7QUFDQSxTQUFTQyxTQUFULFFBQTBCLGtCQUExQjtBQUNBLE9BQU9DLEtBQVAsTUFBa0Isa0JBQWxCO0FBQ0EsT0FBTyx1Q0FBUDs7SUFFcUJDLGtCOzs7Ozs7Ozs7Ozs7Z0tBeUNuQkMscUIsR0FBd0IsWUFBTTtBQUM1QixVQUFJQyxRQUFRLElBQVo7QUFDQSxVQUFJLE1BQUtDLEtBQUwsQ0FBV0MsU0FBZixFQUEwQjtBQUN4QkYsZ0JBQVEsTUFBS0MsS0FBTCxDQUFXRSxrQkFBWCxDQUNOLE1BQUtGLEtBQUwsQ0FBV0csSUFETCxFQUVOLE1BQUtILEtBQUwsQ0FBV0ksT0FGTCxDQUFSO0FBSUQ7QUFDRCxVQUFJTCxTQUFTLE1BQUtDLEtBQUwsQ0FBV0ssVUFBeEIsRUFBb0M7QUFDbENOLGdCQUFRLE1BQUtDLEtBQUwsQ0FBV00sbUJBQVgsQ0FBK0IsTUFBS04sS0FBTCxDQUFXRyxJQUExQyxFQUFnRCxNQUFLSCxLQUFMLENBQVdJLE9BQTNELENBQVI7QUFDRDtBQUNELFVBQUlMLEtBQUosRUFBVztBQUNULGNBQUtDLEtBQUwsQ0FBV08sSUFBWCxDQUFnQixNQUFLUCxLQUFMLENBQVdHLElBQTNCLEVBQWlDLE1BQUtILEtBQUwsQ0FBV1EsTUFBNUM7QUFDRCxPQUZELE1BRU87QUFDTCxjQUFLUixLQUFMLENBQVdTLG9CQUFYO0FBQ0Q7QUFDRixLLFFBRURDLHVCLEdBQTBCLFlBQU07QUFDOUIsWUFBS1YsS0FBTCxDQUFXVyxNQUFYLENBQWtCLE1BQUtYLEtBQUwsQ0FBV0csSUFBN0I7QUFDQSxZQUFLSCxLQUFMLENBQVdZLFFBQVg7QUFDRCxLLFFBRURDLG9CLEdBQXVCLFlBQU07QUFDM0IsWUFBS2IsS0FBTCxDQUFXYyxVQUFYLENBQXNCLE1BQUtkLEtBQUwsQ0FBV0csSUFBakMsRUFBdUNQLE1BQU1tQixzQkFBTixDQUE2QixNQUFLZixLQUFMLENBQVdJLE9BQXhDLENBQXZDO0FBQ0EsWUFBS0osS0FBTCxDQUFXZ0IsWUFBWDtBQUNELEssUUFFREMscUIsR0FBd0IsWUFBTTtBQUM1QixVQUFJLENBQUMsTUFBS2pCLEtBQUwsQ0FBV2tCLGNBQWhCLEVBQWdDO0FBQzlCLGNBQUtsQixLQUFMLENBQVdtQixJQUFYLENBQWdCLE1BQUtuQixLQUFMLENBQVdHLElBQTNCO0FBQ0EsY0FBS0gsS0FBTCxDQUFXb0IsY0FBWDtBQUNBLFlBQUksTUFBS3BCLEtBQUwsQ0FBV3FCLFdBQWYsRUFBNEI7QUFDMUIsZ0JBQUtyQixLQUFMLENBQVdxQixXQUFYO0FBQ0Q7QUFDRjtBQUNGLEssUUFFREMsdUIsR0FBMEIsWUFBTTtBQUM5QixVQUFJLENBQUMsTUFBS3RCLEtBQUwsQ0FBV2tCLGNBQWhCLEVBQWdDO0FBQzlCLFlBQUksTUFBS2xCLEtBQUwsQ0FBV3VCLFVBQWYsRUFBMkI7QUFDekIsZ0JBQUt2QixLQUFMLENBQVd1QixVQUFYO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsZ0JBQUt2QixLQUFMLENBQVd3QixNQUFYLENBQWtCLE1BQUt4QixLQUFMLENBQVdHLElBQTdCLEVBQW1DUCxNQUFNbUIsc0JBQU4sQ0FBNkIsTUFBS2YsS0FBTCxDQUFXSSxPQUF4QyxDQUFuQztBQUNBLGdCQUFLSixLQUFMLENBQVdnQixZQUFYO0FBQ0Q7QUFDRjtBQUNGLEs7OzsrQkFFRFMsTSxxQkFBUztBQUFBLGlCQVdILEtBQUt6QixLQVhGO0FBQUEsUUFFTGtCLGNBRkssVUFFTEEsY0FGSztBQUFBLFFBR0xRLHFCQUhLLFVBR0xBLHFCQUhLO0FBQUEsUUFJTEMsaUJBSkssVUFJTEEsaUJBSks7QUFBQSxRQUtMeEIsSUFMSyxVQUtMQSxJQUxLO0FBQUEsUUFNTHlCLFNBTkssVUFNTEEsU0FOSztBQUFBLFFBT0xDLE1BUEssVUFPTEEsTUFQSztBQUFBLFFBUUx4QixVQVJLLFVBUUxBLFVBUks7QUFBQSxRQVNMSixTQVRLLFVBU0xBLFNBVEs7QUFBQSxRQVVMNkIsUUFWSyxVQVVMQSxRQVZLOztBQVlQLFFBQUl6QixjQUFjSixTQUFsQixFQUE2QjtBQUMzQixhQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsa0NBQWY7QUFDRTtBQUFDLGdCQUFEO0FBQUE7QUFDRSxzQkFBVTRCLFVBQVVYLGNBQVYsSUFBNEJTLGlCQUR4QztBQUVFLHFCQUFTLEtBQUs3QixxQkFGaEI7QUFHRSxzQkFBVWdDLFdBQVcsQ0FIdkI7QUFJRSwrQ0FBaUMzQixLQUFLNEI7QUFKeEM7QUFNRSw4QkFBQyxDQUFELElBQUcsSUFBRyxXQUFOO0FBTkYsU0FERjtBQVNFO0FBQUMsZ0JBQUQ7QUFBQTtBQUNFLHNCQUFVRixVQUFVWCxjQUR0QjtBQUVFLHFCQUFTLEtBQUtSLHVCQUZoQjtBQUdFLHNCQUFVb0IsV0FBVyxDQUh2QjtBQUlFLGlEQUFtQzNCLEtBQUs0QjtBQUoxQztBQU1FLDhCQUFDLENBQUQsSUFBRyxJQUFHLGFBQU47QUFORixTQVRGO0FBaUJHMUIsc0JBQ0M7QUFBQyxnQkFBRDtBQUFBO0FBQ0Usc0JBQVV3QixVQUFVWCxjQUR0QjtBQUVFLHFCQUFTLEtBQUtMLG9CQUZoQjtBQUdFLHNCQUFVaUIsV0FBVyxDQUh2QjtBQUlFLDhDQUFnQzNCLEtBQUs0QjtBQUp2QztBQU1FLDhCQUFDLENBQUQsSUFBRyxJQUFHLFVBQU47QUFORjtBQWxCSixPQURGO0FBOEJEO0FBQ0QsUUFBSUMsVUFBVSxFQUFkO0FBQ0EsUUFBSWQsa0JBQWtCUSxxQkFBdEIsRUFBNkM7QUFDM0NNLGdCQUFVO0FBQ1JDLG1CQUFXUCxzQkFBc0JPLFNBRHpCO0FBRVJDLHVCQUFlUixzQkFBc0JRO0FBRjdCLE9BQVY7QUFJRDtBQUNELFdBQ0U7QUFBQTtBQUFBLFFBQUssV0FBVSxrQ0FBZjtBQUNFO0FBQUMsbUJBQUQ7QUFBQTtBQUNFLGdEQUFvQy9CLEtBQUs0QjtBQUQzQyxXQUVNQyxPQUZOO0FBSUU7QUFBQyxnQkFBRDtBQUFBO0FBQ0Usc0JBQVVILE1BRFo7QUFFRSxxQkFBUyxLQUFLWixxQkFGaEI7QUFHRSwrQ0FBaUNkLEtBQUs0QjtBQUh4QztBQUtFLDhCQUFDLENBQUQsSUFBRyxJQUFHLFdBQU47QUFMRixTQUpGO0FBV0dILHFCQUNDO0FBQUMsZ0JBQUQ7QUFBQTtBQUNFLHNCQUFVQyxNQURaO0FBRUUscUJBQVMsS0FBS1AsdUJBRmhCO0FBR0UsaURBQW1DbkIsS0FBSzRCO0FBSDFDO0FBS0UsOEJBQUMsQ0FBRCxJQUFHLElBQUcsVUFBTjtBQUxGO0FBWko7QUFERixLQURGO0FBeUJELEc7OztFQXRLNkMxQyxNQUFNOEMsYSxVQStCN0NDLFksR0FBZTtBQUNwQmxCLGtCQUFnQixLQURJO0FBRXBCUSx5QkFBdUIsRUFBRU8sV0FBVyw0QkFBYixFQUZIO0FBR3BCTixxQkFBbUIsS0FIQztBQUlwQkMsYUFBVyxJQUpTO0FBS3BCTCxjQUFZLElBTFE7QUFNcEJGLGVBQWEsSUFOTztBQU9wQlMsWUFBVTtBQVBVLEM7U0EvQkhqQyxrQiIsImZpbGUiOiJpbmxpbmUtZWRpdC1jb250cm9scy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9mb3JiaWQtcHJvcC10eXBlcyAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IHsgRm9ybWF0dGVkTWVzc2FnZSBhcyBNIH0gZnJvbSAncmVhY3QtaW50bCc7XG5pbXBvcnQgQ2VsbFRvb2xUaXAgZnJvbSAnLi9jZWxsLXRvb2x0aXAuY29tcG9uZW50JztcbmltcG9ydCB7IGdyaWRTaGFwZSB9IGZyb20gJy4vZGF0YWdyaWQucHJvcHMnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4vZGF0YWdyaWQudXRpbHMnO1xuaW1wb3J0ICcuL2lubGluZS1lZGl0LWNvbnRyb2xzLmNvbXBvbmVudC5zY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5saW5lRWRpdENvbnRyb2xzIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgZ3JpZDogZ3JpZFNoYXBlLmlzUmVxdWlyZWQsXG4gICAgYWRkTmV3SXRlbTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBjcmVhdGU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgZWRpdDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBzYXZlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGNhbmNlbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICB2YWxpZGF0ZUVkaXRlZFJvd3M6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgdmFsaWRhdGVDcmVhdGVkUm93czogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBpc0J1c3k6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgaXNFZGl0aW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGlzQ3JlYXRpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgb25TYXZlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uQ2FuY2VsOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uQWRkQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uRWRpdENsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBhZnRlckFkZEl0ZW06IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgYWZ0ZXJFZGl0UHJlc3M6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgYWZ0ZXJWYWxpZGF0aW9uRXJyb3I6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgY29sdW1uczogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXG4gICAgZGlzYWJsZUFjdGlvbnM6IFByb3BUeXBlcy5ib29sLFxuICAgIGRpc2FibGVBY3Rpb25zTWVzc2FnZTogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIG1lc3NhZ2VJZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIG1lc3NhZ2VWYWx1ZXM6IFByb3BUeXBlcy5zaGFwZSh7fSksXG4gICAgfSksXG4gICAgZGlzYWJsZUFjdGlvblNhdmU6IFByb3BUeXBlcy5ib29sLFxuICAgIGlubGluZUFkZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgdGFiSW5kZXg6IFByb3BUeXBlcy5udW1iZXIsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBkaXNhYmxlQWN0aW9uczogZmFsc2UsXG4gICAgZGlzYWJsZUFjdGlvbnNNZXNzYWdlOiB7IG1lc3NhZ2VJZDogJ0dyaWQuRGlzYWJsZUFjdGlvbnNNZXNzYWdlJyB9LFxuICAgIGRpc2FibGVBY3Rpb25TYXZlOiBmYWxzZSxcbiAgICBpbmxpbmVBZGQ6IHRydWUsXG4gICAgb25BZGRDbGljazogbnVsbCxcbiAgICBvbkVkaXRDbGljazogbnVsbCxcbiAgICB0YWJJbmRleDogMSxcbiAgfTtcblxuICBoYW5kbGVTYXZlQnV0dG9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgbGV0IHZhbGlkID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5wcm9wcy5pc0VkaXRpbmcpIHtcbiAgICAgIHZhbGlkID0gdGhpcy5wcm9wcy52YWxpZGF0ZUVkaXRlZFJvd3MoXG4gICAgICAgIHRoaXMucHJvcHMuZ3JpZCxcbiAgICAgICAgdGhpcy5wcm9wcy5jb2x1bW5zLFxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKHZhbGlkICYmIHRoaXMucHJvcHMuaXNDcmVhdGluZykge1xuICAgICAgdmFsaWQgPSB0aGlzLnByb3BzLnZhbGlkYXRlQ3JlYXRlZFJvd3ModGhpcy5wcm9wcy5ncmlkLCB0aGlzLnByb3BzLmNvbHVtbnMpO1xuICAgIH1cbiAgICBpZiAodmFsaWQpIHtcbiAgICAgIHRoaXMucHJvcHMuc2F2ZSh0aGlzLnByb3BzLmdyaWQsIHRoaXMucHJvcHMub25TYXZlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcm9wcy5hZnRlclZhbGlkYXRpb25FcnJvcigpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUNhbmNlbEJ1dHRvbkNsaWNrID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMuY2FuY2VsKHRoaXMucHJvcHMuZ3JpZCk7XG4gICAgdGhpcy5wcm9wcy5vbkNhbmNlbCgpO1xuICB9XG5cbiAgaGFuZGxlQWRkQnV0dG9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5hZGROZXdJdGVtKHRoaXMucHJvcHMuZ3JpZCwgVXRpbHMuZ2V0Q29sdW1uRGVmYXVsdFZhbHVlcyh0aGlzLnByb3BzLmNvbHVtbnMpKTtcbiAgICB0aGlzLnByb3BzLmFmdGVyQWRkSXRlbSgpO1xuICB9XG5cbiAgaGFuZGxlRWRpdEJ1dHRvbkNsaWNrID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5kaXNhYmxlQWN0aW9ucykge1xuICAgICAgdGhpcy5wcm9wcy5lZGl0KHRoaXMucHJvcHMuZ3JpZCk7XG4gICAgICB0aGlzLnByb3BzLmFmdGVyRWRpdFByZXNzKCk7XG4gICAgICBpZiAodGhpcy5wcm9wcy5vbkVkaXRDbGljaykge1xuICAgICAgICB0aGlzLnByb3BzLm9uRWRpdENsaWNrKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlQ3JlYXRlQnV0dG9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmRpc2FibGVBY3Rpb25zKSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5vbkFkZENsaWNrKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25BZGRDbGljaygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wcm9wcy5jcmVhdGUodGhpcy5wcm9wcy5ncmlkLCBVdGlscy5nZXRDb2x1bW5EZWZhdWx0VmFsdWVzKHRoaXMucHJvcHMuY29sdW1ucykpO1xuICAgICAgICB0aGlzLnByb3BzLmFmdGVyQWRkSXRlbSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBkaXNhYmxlQWN0aW9ucyxcbiAgICAgIGRpc2FibGVBY3Rpb25zTWVzc2FnZSxcbiAgICAgIGRpc2FibGVBY3Rpb25TYXZlLFxuICAgICAgZ3JpZCxcbiAgICAgIGlubGluZUFkZCxcbiAgICAgIGlzQnVzeSxcbiAgICAgIGlzQ3JlYXRpbmcsXG4gICAgICBpc0VkaXRpbmcsXG4gICAgICB0YWJJbmRleCxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoaXNDcmVhdGluZyB8fCBpc0VkaXRpbmcpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtaW5saW5lLWVkaXQtY29udHJvbHNcIj5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBkaXNhYmxlZD17aXNCdXN5IHx8IGRpc2FibGVBY3Rpb25zIHx8IGRpc2FibGVBY3Rpb25TYXZlfVxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVTYXZlQnV0dG9uQ2xpY2t9XG4gICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXggKyAxfVxuICAgICAgICAgICAgaWQ9e2BvYy1kYXRhZ3JpZC1jb250cm9scy1zYXZlLSR7Z3JpZC5pZH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxNIGlkPVwiR3JpZC5TYXZlXCIgLz5cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBkaXNhYmxlZD17aXNCdXN5IHx8IGRpc2FibGVBY3Rpb25zfVxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDYW5jZWxCdXR0b25DbGlja31cbiAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleCArIDJ9XG4gICAgICAgICAgICBpZD17YG9jLWRhdGFncmlkLWNvbnRyb2xzLWNhbmNlbC0ke2dyaWQuaWR9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8TSBpZD1cIkdyaWQuQ2FuY2VsXCIgLz5cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICB7aXNDcmVhdGluZyAmJlxuICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICBkaXNhYmxlZD17aXNCdXN5IHx8IGRpc2FibGVBY3Rpb25zfVxuICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUFkZEJ1dHRvbkNsaWNrfVxuICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXggKyAzfVxuICAgICAgICAgICAgICBpZD17YG9jLWRhdGFncmlkLWNvbnRyb2xzLWFkZC0ke2dyaWQuaWR9YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPE0gaWQ9XCJHcmlkLkFkZFwiIC8+XG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gICAgbGV0IG1lc3NhZ2UgPSB7fTtcbiAgICBpZiAoZGlzYWJsZUFjdGlvbnMgJiYgZGlzYWJsZUFjdGlvbnNNZXNzYWdlKSB7XG4gICAgICBtZXNzYWdlID0ge1xuICAgICAgICBtZXNzYWdlSWQ6IGRpc2FibGVBY3Rpb25zTWVzc2FnZS5tZXNzYWdlSWQsXG4gICAgICAgIG1lc3NhZ2VWYWx1ZXM6IGRpc2FibGVBY3Rpb25zTWVzc2FnZS5tZXNzYWdlVmFsdWVzLFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtaW5saW5lLWVkaXQtY29udHJvbHNcIj5cbiAgICAgICAgPENlbGxUb29sVGlwXG4gICAgICAgICAgaWQ9e2BvYy1kYXRhZ3JpZC1jb250cm9scy10b29sdGlwLSR7Z3JpZC5pZH1gfVxuICAgICAgICAgIHsuLi5tZXNzYWdlfVxuICAgICAgICA+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgZGlzYWJsZWQ9e2lzQnVzeX1cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlRWRpdEJ1dHRvbkNsaWNrfVxuICAgICAgICAgICAgaWQ9e2BvYy1kYXRhZ3JpZC1jb250cm9scy1lZGl0LSR7Z3JpZC5pZH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxNIGlkPVwiR3JpZC5FZGl0XCIgLz5cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICB7aW5saW5lQWRkICYmXG4gICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgIGRpc2FibGVkPXtpc0J1c3l9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ3JlYXRlQnV0dG9uQ2xpY2t9XG4gICAgICAgICAgICAgIGlkPXtgb2MtZGF0YWdyaWQtY29udHJvbHMtY3JlYXRlLSR7Z3JpZC5pZH1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8TSBpZD1cIkdyaWQuQWRkXCIgLz5cbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIH1cbiAgICAgICAgPC9DZWxsVG9vbFRpcD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==