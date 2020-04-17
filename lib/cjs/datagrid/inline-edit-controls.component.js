"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));

var _reactBootstrap = require("react-bootstrap");

var _reactIntl = require("react-intl");

var _cellTooltip = _interopRequireDefault(require("./cell-tooltip.component"));

var _datagrid = require("./datagrid.props");

var _datagrid2 = _interopRequireDefault(require("./datagrid.utils"));

require("./inline-edit-controls.component.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      _this.props.addNewItem(_this.props.grid, _datagrid2["default"].getColumnDefaultValues(_this.props.columns));

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
          _this.props.create(_this.props.grid, _datagrid2["default"].getColumnDefaultValues(_this.props.columns));

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
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "oc-datagrid-inline-edit-controls"
      }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Button, {
        disabled: isBusy || disableActions || disableActionSave,
        onClick: this.handleSaveButtonClick,
        tabIndex: tabIndex + 1,
        id: "oc-datagrid-controls-save-" + grid.id
      }, /*#__PURE__*/_react["default"].createElement(_reactIntl.FormattedMessage, {
        id: "Grid.Save"
      })), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Button, {
        disabled: isBusy || disableActions,
        onClick: this.handleCancelButtonClick,
        tabIndex: tabIndex + 2,
        id: "oc-datagrid-controls-cancel-" + grid.id
      }, /*#__PURE__*/_react["default"].createElement(_reactIntl.FormattedMessage, {
        id: "Grid.Cancel"
      })), isCreating && /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Button, {
        disabled: isBusy || disableActions,
        onClick: this.handleAddButtonClick,
        tabIndex: tabIndex + 3,
        id: "oc-datagrid-controls-add-" + grid.id
      }, /*#__PURE__*/_react["default"].createElement(_reactIntl.FormattedMessage, {
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
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "oc-datagrid-inline-edit-controls"
    }, /*#__PURE__*/_react["default"].createElement(_cellTooltip["default"], _extends({
      id: "oc-datagrid-controls-tooltip-" + grid.id
    }, message), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Button, {
      disabled: isBusy || !hasData,
      onClick: this.handleEditButtonClick,
      id: "oc-datagrid-controls-edit-" + grid.id
    }, /*#__PURE__*/_react["default"].createElement(_reactIntl.FormattedMessage, {
      id: "Grid.Edit"
    })), inlineAdd && /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Button, {
      disabled: isBusy,
      onClick: this.handleCreateButtonClick,
      id: "oc-datagrid-controls-create-" + grid.id
    }, /*#__PURE__*/_react["default"].createElement(_reactIntl.FormattedMessage, {
      id: "Grid.Add"
    }))));
  };

  return InlineEditControls;
}(_react["default"].PureComponent);

exports["default"] = InlineEditControls;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9pbmxpbmUtZWRpdC1jb250cm9scy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIklubGluZUVkaXRDb250cm9scyIsInZhbGlkIiwicHJvcHMiLCJpc0VkaXRpbmciLCJ2YWxpZGF0ZUVkaXRlZFJvd3MiLCJncmlkIiwiY29sdW1ucyIsImlzQ3JlYXRpbmciLCJ2YWxpZGF0ZUNyZWF0ZWRSb3dzIiwic2F2ZSIsIm9uU2F2ZSIsImFmdGVyVmFsaWRhdGlvbkVycm9yIiwiY2FuY2VsIiwib25DYW5jZWwiLCJhZGROZXdJdGVtIiwiVXRpbHMiLCJnZXRDb2x1bW5EZWZhdWx0VmFsdWVzIiwiYWZ0ZXJBZGRJdGVtIiwiZGlzYWJsZUFjdGlvbnMiLCJlZGl0IiwiYWZ0ZXJFZGl0UHJlc3MiLCJvbkVkaXRDbGljayIsIm9uQWRkQ2xpY2siLCJjcmVhdGUiLCJyZW5kZXIiLCJkaXNhYmxlQWN0aW9uc01lc3NhZ2UiLCJkaXNhYmxlQWN0aW9uU2F2ZSIsImlubGluZUFkZCIsImlzQnVzeSIsInRhYkluZGV4IiwiZGF0YSIsImhhbmRsZVNhdmVCdXR0b25DbGljayIsImlkIiwiaGFuZGxlQ2FuY2VsQnV0dG9uQ2xpY2siLCJoYW5kbGVBZGRCdXR0b25DbGljayIsIm1lc3NhZ2UiLCJpbmZvTWVzc2FnZSIsIm1lc3NhZ2VJZCIsInZhbHVlcyIsIm1lc3NhZ2VWYWx1ZXMiLCJoYXNEYXRhIiwic2l6ZSIsImhhbmRsZUVkaXRCdXR0b25DbGljayIsImhhbmRsZUNyZWF0ZUJ1dHRvbkNsaWNrIiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLGtCOzs7Ozs7Ozs7Ozs7NEVBMENLLFlBQU07QUFDNUIsVUFBSUMsS0FBSyxHQUFHLElBQVo7O0FBQ0EsVUFBSSxNQUFLQyxLQUFMLENBQVdDLFNBQWYsRUFBMEI7QUFDeEJGLFFBQUFBLEtBQUssR0FBRyxNQUFLQyxLQUFMLENBQVdFLGtCQUFYLENBQThCLE1BQUtGLEtBQUwsQ0FBV0csSUFBekMsRUFBK0MsTUFBS0gsS0FBTCxDQUFXSSxPQUExRCxDQUFSO0FBQ0Q7O0FBQ0QsVUFBSUwsS0FBSyxJQUFJLE1BQUtDLEtBQUwsQ0FBV0ssVUFBeEIsRUFBb0M7QUFDbENOLFFBQUFBLEtBQUssR0FBRyxNQUFLQyxLQUFMLENBQVdNLG1CQUFYLENBQStCLE1BQUtOLEtBQUwsQ0FBV0csSUFBMUMsRUFBZ0QsTUFBS0gsS0FBTCxDQUFXSSxPQUEzRCxDQUFSO0FBQ0Q7O0FBQ0QsVUFBSUwsS0FBSixFQUFXO0FBQ1QsY0FBS0MsS0FBTCxDQUFXTyxJQUFYLENBQWdCLE1BQUtQLEtBQUwsQ0FBV0csSUFBM0IsRUFBaUMsTUFBS0gsS0FBTCxDQUFXUSxNQUE1QztBQUNELE9BRkQsTUFFTztBQUNMLGNBQUtSLEtBQUwsQ0FBV1Msb0JBQVg7QUFDRDtBQUNGLEs7OzhFQUV5QixZQUFNO0FBQzlCLFlBQUtULEtBQUwsQ0FBV1UsTUFBWCxDQUFrQixNQUFLVixLQUFMLENBQVdHLElBQTdCOztBQUNBLFlBQUtILEtBQUwsQ0FBV1csUUFBWDtBQUNELEs7OzJFQUVzQixZQUFNO0FBQzNCLFlBQUtYLEtBQUwsQ0FBV1ksVUFBWCxDQUFzQixNQUFLWixLQUFMLENBQVdHLElBQWpDLEVBQXVDVSxzQkFBTUMsc0JBQU4sQ0FBNkIsTUFBS2QsS0FBTCxDQUFXSSxPQUF4QyxDQUF2Qzs7QUFDQSxZQUFLSixLQUFMLENBQVdlLFlBQVg7QUFDRCxLOzs0RUFFdUIsWUFBTTtBQUM1QixVQUFJLENBQUMsTUFBS2YsS0FBTCxDQUFXZ0IsY0FBaEIsRUFBZ0M7QUFDOUIsY0FBS2hCLEtBQUwsQ0FBV2lCLElBQVgsQ0FBZ0IsTUFBS2pCLEtBQUwsQ0FBV0csSUFBM0I7O0FBQ0EsY0FBS0gsS0FBTCxDQUFXa0IsY0FBWDs7QUFDQSxZQUFJLE1BQUtsQixLQUFMLENBQVdtQixXQUFmLEVBQTRCO0FBQzFCLGdCQUFLbkIsS0FBTCxDQUFXbUIsV0FBWDtBQUNEO0FBQ0Y7QUFDRixLOzs4RUFFeUIsWUFBTTtBQUM5QixVQUFJLENBQUMsTUFBS25CLEtBQUwsQ0FBV2dCLGNBQWhCLEVBQWdDO0FBQzlCLFlBQUksTUFBS2hCLEtBQUwsQ0FBV29CLFVBQWYsRUFBMkI7QUFDekIsZ0JBQUtwQixLQUFMLENBQVdvQixVQUFYO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsZ0JBQUtwQixLQUFMLENBQVdxQixNQUFYLENBQWtCLE1BQUtyQixLQUFMLENBQVdHLElBQTdCLEVBQW1DVSxzQkFBTUMsc0JBQU4sQ0FBNkIsTUFBS2QsS0FBTCxDQUFXSSxPQUF4QyxDQUFuQzs7QUFDQSxnQkFBS0osS0FBTCxDQUFXZSxZQUFYO0FBQ0Q7QUFDRjtBQUNGLEs7Ozs7Ozs7U0FFRE8sTSxHQUFBLGtCQUFTO0FBQUEsc0JBWUgsS0FBS3RCLEtBWkY7QUFBQSxRQUVMZ0IsY0FGSyxlQUVMQSxjQUZLO0FBQUEsUUFHTE8scUJBSEssZUFHTEEscUJBSEs7QUFBQSxRQUlMQyxpQkFKSyxlQUlMQSxpQkFKSztBQUFBLFFBS0xyQixJQUxLLGVBS0xBLElBTEs7QUFBQSxRQU1Mc0IsU0FOSyxlQU1MQSxTQU5LO0FBQUEsUUFPTEMsTUFQSyxlQU9MQSxNQVBLO0FBQUEsUUFRTHJCLFVBUkssZUFRTEEsVUFSSztBQUFBLFFBU0xKLFNBVEssZUFTTEEsU0FUSztBQUFBLFFBVUwwQixRQVZLLGVBVUxBLFFBVks7QUFBQSxRQVdMQyxJQVhLLGVBV0xBLElBWEs7O0FBYVAsUUFBSXZCLFVBQVUsSUFBSUosU0FBbEIsRUFBNkI7QUFDM0IsMEJBQ0U7QUFBSyxRQUFBLFNBQVMsRUFBQztBQUFmLHNCQUNFLGdDQUFDLHNCQUFEO0FBQ0UsUUFBQSxRQUFRLEVBQUV5QixNQUFNLElBQUlWLGNBQVYsSUFBNEJRLGlCQUR4QztBQUVFLFFBQUEsT0FBTyxFQUFFLEtBQUtLLHFCQUZoQjtBQUdFLFFBQUEsUUFBUSxFQUFFRixRQUFRLEdBQUcsQ0FIdkI7QUFJRSxRQUFBLEVBQUUsaUNBQStCeEIsSUFBSSxDQUFDMkI7QUFKeEMsc0JBTUUsZ0NBQUMsMkJBQUQ7QUFBRyxRQUFBLEVBQUUsRUFBQztBQUFOLFFBTkYsQ0FERixlQVNFLGdDQUFDLHNCQUFEO0FBQ0UsUUFBQSxRQUFRLEVBQUVKLE1BQU0sSUFBSVYsY0FEdEI7QUFFRSxRQUFBLE9BQU8sRUFBRSxLQUFLZSx1QkFGaEI7QUFHRSxRQUFBLFFBQVEsRUFBRUosUUFBUSxHQUFHLENBSHZCO0FBSUUsUUFBQSxFQUFFLG1DQUFpQ3hCLElBQUksQ0FBQzJCO0FBSjFDLHNCQU1FLGdDQUFDLDJCQUFEO0FBQUcsUUFBQSxFQUFFLEVBQUM7QUFBTixRQU5GLENBVEYsRUFpQkd6QixVQUFVLGlCQUNULGdDQUFDLHNCQUFEO0FBQ0UsUUFBQSxRQUFRLEVBQUVxQixNQUFNLElBQUlWLGNBRHRCO0FBRUUsUUFBQSxPQUFPLEVBQUUsS0FBS2dCLG9CQUZoQjtBQUdFLFFBQUEsUUFBUSxFQUFFTCxRQUFRLEdBQUcsQ0FIdkI7QUFJRSxRQUFBLEVBQUUsZ0NBQThCeEIsSUFBSSxDQUFDMkI7QUFKdkMsc0JBTUUsZ0NBQUMsMkJBQUQ7QUFBRyxRQUFBLEVBQUUsRUFBQztBQUFOLFFBTkYsQ0FsQkosQ0FERjtBQThCRDs7QUFDRCxRQUFJRyxPQUFPLEdBQUcsRUFBZDs7QUFDQSxRQUFJakIsY0FBYyxJQUFJTyxxQkFBdEIsRUFBNkM7QUFDM0NVLE1BQUFBLE9BQU8sR0FBRztBQUNSQyxRQUFBQSxXQUFXLEVBQUU7QUFDWEosVUFBQUEsRUFBRSxFQUFFUCxxQkFBcUIsQ0FBQ1ksU0FEZjtBQUVYQyxVQUFBQSxNQUFNLEVBQUViLHFCQUFxQixDQUFDYztBQUZuQjtBQURMLE9BQVY7QUFNRDs7QUFDRCxRQUFNQyxPQUFPLEdBQUdWLElBQUksQ0FBQ1csSUFBTCxJQUFhLENBQTdCO0FBRUEsd0JBQ0U7QUFBSyxNQUFBLFNBQVMsRUFBQztBQUFmLG9CQUNFLGdDQUFDLHVCQUFEO0FBQWEsTUFBQSxFQUFFLG9DQUFrQ3BDLElBQUksQ0FBQzJCO0FBQXRELE9BQWdFRyxPQUFoRSxnQkFDRSxnQ0FBQyxzQkFBRDtBQUNFLE1BQUEsUUFBUSxFQUFFUCxNQUFNLElBQUksQ0FBQ1ksT0FEdkI7QUFFRSxNQUFBLE9BQU8sRUFBRSxLQUFLRSxxQkFGaEI7QUFHRSxNQUFBLEVBQUUsaUNBQStCckMsSUFBSSxDQUFDMkI7QUFIeEMsb0JBS0UsZ0NBQUMsMkJBQUQ7QUFBRyxNQUFBLEVBQUUsRUFBQztBQUFOLE1BTEYsQ0FERixFQVFHTCxTQUFTLGlCQUNSLGdDQUFDLHNCQUFEO0FBQ0UsTUFBQSxRQUFRLEVBQUVDLE1BRFo7QUFFRSxNQUFBLE9BQU8sRUFBRSxLQUFLZSx1QkFGaEI7QUFHRSxNQUFBLEVBQUUsbUNBQWlDdEMsSUFBSSxDQUFDMkI7QUFIMUMsb0JBS0UsZ0NBQUMsMkJBQUQ7QUFBRyxNQUFBLEVBQUUsRUFBQztBQUFOLE1BTEYsQ0FUSixDQURGLENBREY7QUFzQkQsRzs7O0VBdEs2Q1ksa0JBQU1DLGE7Ozs7Z0JBQWpDN0Msa0Isa0JBZ0NHO0FBQ3BCa0IsRUFBQUEsY0FBYyxFQUFFLEtBREk7QUFFcEJPLEVBQUFBLHFCQUFxQixFQUFFO0FBQUVZLElBQUFBLFNBQVMsRUFBRTtBQUFiLEdBRkg7QUFHcEJYLEVBQUFBLGlCQUFpQixFQUFFLEtBSEM7QUFJcEJDLEVBQUFBLFNBQVMsRUFBRSxJQUpTO0FBS3BCTCxFQUFBQSxVQUFVLEVBQUUsSUFMUTtBQU1wQkQsRUFBQUEsV0FBVyxFQUFFLElBTk87QUFPcEJRLEVBQUFBLFFBQVEsRUFBRTtBQVBVLEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9mb3JiaWQtcHJvcC10eXBlcyAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgSW1tdXRhYmxlUHJvcFR5cGVzIGZyb20gJ3JlYWN0LWltbXV0YWJsZS1wcm9wdHlwZXMnO1xuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgYXMgTSB9IGZyb20gJ3JlYWN0LWludGwnO1xuaW1wb3J0IENlbGxUb29sVGlwIGZyb20gJy4vY2VsbC10b29sdGlwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBncmlkU2hhcGUgfSBmcm9tICcuL2RhdGFncmlkLnByb3BzJztcbmltcG9ydCBVdGlscyBmcm9tICcuL2RhdGFncmlkLnV0aWxzJztcbmltcG9ydCAnLi9pbmxpbmUtZWRpdC1jb250cm9scy5jb21wb25lbnQuc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElubGluZUVkaXRDb250cm9scyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGdyaWQ6IGdyaWRTaGFwZS5pc1JlcXVpcmVkLFxuICAgIGFkZE5ld0l0ZW06IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgY3JlYXRlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGVkaXQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgc2F2ZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBjYW5jZWw6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgdmFsaWRhdGVFZGl0ZWRSb3dzOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHZhbGlkYXRlQ3JlYXRlZFJvd3M6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgaXNCdXN5OiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGlzRWRpdGluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpc0NyZWF0aW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIG9uU2F2ZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvbkNhbmNlbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvbkFkZENsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkVkaXRDbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgYWZ0ZXJBZGRJdGVtOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGFmdGVyRWRpdFByZXNzOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGFmdGVyVmFsaWRhdGlvbkVycm9yOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGNvbHVtbnM6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxuICAgIGRpc2FibGVBY3Rpb25zOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkaXNhYmxlQWN0aW9uc01lc3NhZ2U6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBtZXNzYWdlSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBtZXNzYWdlVmFsdWVzOiBQcm9wVHlwZXMuc2hhcGUoe30pLFxuICAgIH0pLFxuICAgIGRpc2FibGVBY3Rpb25TYXZlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBpbmxpbmVBZGQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHRhYkluZGV4OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGRhdGE6IEltbXV0YWJsZVByb3BUeXBlcy5saXN0LmlzUmVxdWlyZWQsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBkaXNhYmxlQWN0aW9uczogZmFsc2UsXG4gICAgZGlzYWJsZUFjdGlvbnNNZXNzYWdlOiB7IG1lc3NhZ2VJZDogJ0dyaWQuRGlzYWJsZUFjdGlvbnNNZXNzYWdlJyB9LFxuICAgIGRpc2FibGVBY3Rpb25TYXZlOiBmYWxzZSxcbiAgICBpbmxpbmVBZGQ6IHRydWUsXG4gICAgb25BZGRDbGljazogbnVsbCxcbiAgICBvbkVkaXRDbGljazogbnVsbCxcbiAgICB0YWJJbmRleDogMSxcbiAgfTtcblxuICBoYW5kbGVTYXZlQnV0dG9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgbGV0IHZhbGlkID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5wcm9wcy5pc0VkaXRpbmcpIHtcbiAgICAgIHZhbGlkID0gdGhpcy5wcm9wcy52YWxpZGF0ZUVkaXRlZFJvd3ModGhpcy5wcm9wcy5ncmlkLCB0aGlzLnByb3BzLmNvbHVtbnMpO1xuICAgIH1cbiAgICBpZiAodmFsaWQgJiYgdGhpcy5wcm9wcy5pc0NyZWF0aW5nKSB7XG4gICAgICB2YWxpZCA9IHRoaXMucHJvcHMudmFsaWRhdGVDcmVhdGVkUm93cyh0aGlzLnByb3BzLmdyaWQsIHRoaXMucHJvcHMuY29sdW1ucyk7XG4gICAgfVxuICAgIGlmICh2YWxpZCkge1xuICAgICAgdGhpcy5wcm9wcy5zYXZlKHRoaXMucHJvcHMuZ3JpZCwgdGhpcy5wcm9wcy5vblNhdmUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByb3BzLmFmdGVyVmFsaWRhdGlvbkVycm9yKCk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZUNhbmNlbEJ1dHRvbkNsaWNrID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMuY2FuY2VsKHRoaXMucHJvcHMuZ3JpZCk7XG4gICAgdGhpcy5wcm9wcy5vbkNhbmNlbCgpO1xuICB9O1xuXG4gIGhhbmRsZUFkZEJ1dHRvbkNsaWNrID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMuYWRkTmV3SXRlbSh0aGlzLnByb3BzLmdyaWQsIFV0aWxzLmdldENvbHVtbkRlZmF1bHRWYWx1ZXModGhpcy5wcm9wcy5jb2x1bW5zKSk7XG4gICAgdGhpcy5wcm9wcy5hZnRlckFkZEl0ZW0oKTtcbiAgfTtcblxuICBoYW5kbGVFZGl0QnV0dG9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmRpc2FibGVBY3Rpb25zKSB7XG4gICAgICB0aGlzLnByb3BzLmVkaXQodGhpcy5wcm9wcy5ncmlkKTtcbiAgICAgIHRoaXMucHJvcHMuYWZ0ZXJFZGl0UHJlc3MoKTtcbiAgICAgIGlmICh0aGlzLnByb3BzLm9uRWRpdENsaWNrKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25FZGl0Q2xpY2soKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlQ3JlYXRlQnV0dG9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmRpc2FibGVBY3Rpb25zKSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5vbkFkZENsaWNrKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25BZGRDbGljaygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wcm9wcy5jcmVhdGUodGhpcy5wcm9wcy5ncmlkLCBVdGlscy5nZXRDb2x1bW5EZWZhdWx0VmFsdWVzKHRoaXMucHJvcHMuY29sdW1ucykpO1xuICAgICAgICB0aGlzLnByb3BzLmFmdGVyQWRkSXRlbSgpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgZGlzYWJsZUFjdGlvbnMsXG4gICAgICBkaXNhYmxlQWN0aW9uc01lc3NhZ2UsXG4gICAgICBkaXNhYmxlQWN0aW9uU2F2ZSxcbiAgICAgIGdyaWQsXG4gICAgICBpbmxpbmVBZGQsXG4gICAgICBpc0J1c3ksXG4gICAgICBpc0NyZWF0aW5nLFxuICAgICAgaXNFZGl0aW5nLFxuICAgICAgdGFiSW5kZXgsXG4gICAgICBkYXRhLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChpc0NyZWF0aW5nIHx8IGlzRWRpdGluZykge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1pbmxpbmUtZWRpdC1jb250cm9sc1wiPlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGRpc2FibGVkPXtpc0J1c3kgfHwgZGlzYWJsZUFjdGlvbnMgfHwgZGlzYWJsZUFjdGlvblNhdmV9XG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZVNhdmVCdXR0b25DbGlja31cbiAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleCArIDF9XG4gICAgICAgICAgICBpZD17YG9jLWRhdGFncmlkLWNvbnRyb2xzLXNhdmUtJHtncmlkLmlkfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPE0gaWQ9XCJHcmlkLlNhdmVcIiAvPlxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGRpc2FibGVkPXtpc0J1c3kgfHwgZGlzYWJsZUFjdGlvbnN9XG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNhbmNlbEJ1dHRvbkNsaWNrfVxuICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4ICsgMn1cbiAgICAgICAgICAgIGlkPXtgb2MtZGF0YWdyaWQtY29udHJvbHMtY2FuY2VsLSR7Z3JpZC5pZH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxNIGlkPVwiR3JpZC5DYW5jZWxcIiAvPlxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIHtpc0NyZWF0aW5nICYmIChcbiAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzQnVzeSB8fCBkaXNhYmxlQWN0aW9uc31cbiAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVBZGRCdXR0b25DbGlja31cbiAgICAgICAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4ICsgM31cbiAgICAgICAgICAgICAgaWQ9e2BvYy1kYXRhZ3JpZC1jb250cm9scy1hZGQtJHtncmlkLmlkfWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxNIGlkPVwiR3JpZC5BZGRcIiAvPlxuICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgICBsZXQgbWVzc2FnZSA9IHt9O1xuICAgIGlmIChkaXNhYmxlQWN0aW9ucyAmJiBkaXNhYmxlQWN0aW9uc01lc3NhZ2UpIHtcbiAgICAgIG1lc3NhZ2UgPSB7XG4gICAgICAgIGluZm9NZXNzYWdlOiB7XG4gICAgICAgICAgaWQ6IGRpc2FibGVBY3Rpb25zTWVzc2FnZS5tZXNzYWdlSWQsXG4gICAgICAgICAgdmFsdWVzOiBkaXNhYmxlQWN0aW9uc01lc3NhZ2UubWVzc2FnZVZhbHVlcyxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0IGhhc0RhdGEgPSBkYXRhLnNpemUgPj0gMTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWlubGluZS1lZGl0LWNvbnRyb2xzXCI+XG4gICAgICAgIDxDZWxsVG9vbFRpcCBpZD17YG9jLWRhdGFncmlkLWNvbnRyb2xzLXRvb2x0aXAtJHtncmlkLmlkfWB9IHsuLi5tZXNzYWdlfT5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBkaXNhYmxlZD17aXNCdXN5IHx8ICFoYXNEYXRhfVxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVFZGl0QnV0dG9uQ2xpY2t9XG4gICAgICAgICAgICBpZD17YG9jLWRhdGFncmlkLWNvbnRyb2xzLWVkaXQtJHtncmlkLmlkfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPE0gaWQ9XCJHcmlkLkVkaXRcIiAvPlxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIHtpbmxpbmVBZGQgJiYgKFxuICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICBkaXNhYmxlZD17aXNCdXN5fVxuICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNyZWF0ZUJ1dHRvbkNsaWNrfVxuICAgICAgICAgICAgICBpZD17YG9jLWRhdGFncmlkLWNvbnRyb2xzLWNyZWF0ZS0ke2dyaWQuaWR9YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPE0gaWQ9XCJHcmlkLkFkZFwiIC8+XG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICApfVxuICAgICAgICA8L0NlbGxUb29sVGlwPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19