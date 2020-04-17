"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immutable = require("immutable");

var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));

var _reactBootstrap = require("react-bootstrap");

var _reactIntl = require("react-intl");

var _reactSelectOrderList = _interopRequireDefault(require("@opuscapita/react-select-order-list"));

var _datagrid = require("../datagrid.props");

var _columnSettings = _interopRequireDefault(require("./column-settings.utils"));

var _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ColumnSettings = (0, _reactIntl.injectIntl)(_class = (_temp = /*#__PURE__*/function (_React$PureComponent) {
  _inheritsLoose(ColumnSettings, _React$PureComponent);

  function ColumnSettings(props) {
    var _this;

    _this = _React$PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "handleCancelClick", function () {
      _this.props.closeColumnSettingsModal(_this.props.grid);
    });

    _defineProperty(_assertThisInitialized(_this), "handleOkClick", function () {
      var hiddenColumns = _columnSettings["default"].getHiddenColumns(_this.state.availableColumns, _this.state.selectedColumns);

      var columnOrders = _columnSettings["default"].getColumnOrders(_this.state.selectedColumns);

      _this.props.saveColumnSettings(_this.props.grid, hiddenColumns, columnOrders);

      _this.props.closeColumnSettingsModal(_this.props.grid);
    });

    _defineProperty(_assertThisInitialized(_this), "handleSelectionChange", function (data) {
      _this.setState({
        allSelected: data.allSelected,
        selectedColumns: data.selectedData.toJS()
      });
    });

    var availableColumns = _columnSettings["default"].getAvailableColumns(props.columns);

    var selectedColumns = _columnSettings["default"].getSelectedColumns(props.columns, props.visibleColumns);

    _this.state = {
      availableColumns: availableColumns,
      selectedColumns: selectedColumns,
      allSelected: availableColumns.length === selectedColumns.length
    };
    return _this;
  }

  var _proto = ColumnSettings.prototype;

  _proto.render = function render() {
    return /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Modal, {
      bsSize: "large",
      dialogClassName: "oc-datagrid-column-settings-modal",
      "aria-labelledby": "oc-datagrid-column-settings-modal",
      show: true,
      onHide: this.handleCancelClick
    }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Modal.Header, null, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Modal.Title, null, /*#__PURE__*/_react["default"].createElement(_reactIntl.FormattedMessage, {
      id: "Grid.ColumnSettings.Header"
    }))), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Modal.Body, null, /*#__PURE__*/_react["default"].createElement(_reactSelectOrderList["default"], {
      allSelected: this.state.allSelected,
      availableData: (0, _immutable.List)(this.state.availableColumns),
      id: "ocDatagridColumnSettings-" + this.props.grid.id,
      onChange: this.handleSelectionChange,
      selectedData: (0, _immutable.List)(this.state.selectedColumns),
      searchPlaceholder: this.props.intl.formatMessage({
        id: 'Common.Search'
      }),
      translations: {
        allLabel: /*#__PURE__*/_react["default"].createElement(_reactIntl.FormattedMessage, {
          id: "Grid.ColumnSettings.All"
        }),
        availableListLabel: /*#__PURE__*/_react["default"].createElement(_reactIntl.FormattedMessage, {
          id: "Grid.ColumnSettings.AvailableColumns"
        }),
        selectedListLabel: /*#__PURE__*/_react["default"].createElement(_reactIntl.FormattedMessage, {
          id: "Grid.ColumnSettings.SelectedColumns"
        }),
        searchTooltip: /*#__PURE__*/_react["default"].createElement(_reactIntl.FormattedMessage, {
          id: "Grid.ColumnSettings.SearchTooltip"
        })
      }
    })), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Modal.Footer, null, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Button, {
      id: "ocDatagridColumnSettings-" + this.props.grid.id + "-ok-button",
      bsStyle: "primary",
      onClick: this.handleOkClick
    }, /*#__PURE__*/_react["default"].createElement(_reactIntl.FormattedMessage, {
      id: "Grid.Ok"
    })), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Button, {
      id: "ocDatagridColumnSettings-" + this.props.grid.id + "-cancel-button",
      onClick: this.handleCancelClick
    }, /*#__PURE__*/_react["default"].createElement(_reactIntl.FormattedMessage, {
      id: "Grid.Cancel"
    }))));
  };

  return ColumnSettings;
}(_react["default"].PureComponent), _temp)) || _class;

exports["default"] = ColumnSettings;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2V0dGluZ3MvY29sdW1uLXNldHRpbmdzLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiQ29sdW1uU2V0dGluZ3MiLCJpbmplY3RJbnRsIiwicHJvcHMiLCJjbG9zZUNvbHVtblNldHRpbmdzTW9kYWwiLCJncmlkIiwiaGlkZGVuQ29sdW1ucyIsIkNvbHVtblNldHRpbmdzVXRpbHMiLCJnZXRIaWRkZW5Db2x1bW5zIiwic3RhdGUiLCJhdmFpbGFibGVDb2x1bW5zIiwic2VsZWN0ZWRDb2x1bW5zIiwiY29sdW1uT3JkZXJzIiwiZ2V0Q29sdW1uT3JkZXJzIiwic2F2ZUNvbHVtblNldHRpbmdzIiwiZGF0YSIsInNldFN0YXRlIiwiYWxsU2VsZWN0ZWQiLCJzZWxlY3RlZERhdGEiLCJ0b0pTIiwiZ2V0QXZhaWxhYmxlQ29sdW1ucyIsImNvbHVtbnMiLCJnZXRTZWxlY3RlZENvbHVtbnMiLCJ2aXNpYmxlQ29sdW1ucyIsImxlbmd0aCIsInJlbmRlciIsImhhbmRsZUNhbmNlbENsaWNrIiwiaWQiLCJoYW5kbGVTZWxlY3Rpb25DaGFuZ2UiLCJpbnRsIiwiZm9ybWF0TWVzc2FnZSIsImFsbExhYmVsIiwiYXZhaWxhYmxlTGlzdExhYmVsIiwic2VsZWN0ZWRMaXN0TGFiZWwiLCJzZWFyY2hUb29sdGlwIiwiaGFuZGxlT2tDbGljayIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBSU1BLGMsT0FETEMscUI7OztBQVdDLDBCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQ2pCLDRDQUFNQSxLQUFOOztBQURpQix3RUFjQyxZQUFNO0FBQ3hCLFlBQUtBLEtBQUwsQ0FBV0Msd0JBQVgsQ0FBb0MsTUFBS0QsS0FBTCxDQUFXRSxJQUEvQztBQUNELEtBaEJrQjs7QUFBQSxv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QixNQURGLENBWkYsZUE0QkUsZ0NBQUMscUJBQUQsQ0FBTyxNQUFQLHFCQUNFLGdDQUFDLHNCQUFEO0FBQ0UsTUFBQSxFQUFFLGdDQUE4QixLQUFLL0IsS0FBTCxDQUFXRSxJQUFYLENBQWdCc0IsRUFBOUMsZUFESjtBQUVFLE1BQUEsT0FBTyxFQUFDLFNBRlY7QUFHRSxNQUFBLE9BQU8sRUFBRSxLQUFLUTtBQUhoQixvQkFLRSxnQ0FBQywyQkFBRDtBQUFHLE1BQUEsRUFBRSxFQUFDO0FBQU4sTUFMRixDQURGLGVBUUUsZ0NBQUMsc0JBQUQ7QUFDRSxNQUFBLEVBQUUsZ0NBQThCLEtBQUtoQyxLQUFMLENBQVdFLElBQVgsQ0FBZ0JzQixFQUE5QyxtQkFESjtBQUVFLE1BQUEsT0FBTyxFQUFFLEtBQUtEO0FBRmhCLG9CQUlFLGdDQUFDLDJCQUFEO0FBQUcsTUFBQSxFQUFFLEVBQUM7QUFBTixNQUpGLENBUkYsQ0E1QkYsQ0FERjtBQThDRCxHOzs7RUF6RjBCVSxrQkFBTUMsYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgTGlzdCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgSW1tdXRhYmxlUHJvcFR5cGVzIGZyb20gJ3JlYWN0LWltbXV0YWJsZS1wcm9wdHlwZXMnO1xuaW1wb3J0IHsgTW9kYWwsIEJ1dHRvbiB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlIGFzIE0sIGluamVjdEludGwsIGludGxTaGFwZSB9IGZyb20gJ3JlYWN0LWludGwnO1xuaW1wb3J0IFNlbGVjdE9yZGVyTGlzdCBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1zZWxlY3Qtb3JkZXItbGlzdCc7XG5cbmltcG9ydCB7IGdyaWRTaGFwZSB9IGZyb20gJy4uL2RhdGFncmlkLnByb3BzJztcbmltcG9ydCBDb2x1bW5TZXR0aW5nc1V0aWxzIGZyb20gJy4vY29sdW1uLXNldHRpbmdzLnV0aWxzJztcblxuZXhwb3J0IGRlZmF1bHRcbkBpbmplY3RJbnRsXG5jbGFzcyBDb2x1bW5TZXR0aW5ncyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGludGw6IGludGxTaGFwZS5pc1JlcXVpcmVkLFxuICAgIGdyaWQ6IGdyaWRTaGFwZS5pc1JlcXVpcmVkLFxuICAgIGNvbHVtbnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSgpKS5pc1JlcXVpcmVkLFxuICAgIHZpc2libGVDb2x1bW5zOiBJbW11dGFibGVQcm9wVHlwZXMubGlzdC5pc1JlcXVpcmVkLFxuICAgIGNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBzYXZlQ29sdW1uU2V0dGluZ3M6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgY29uc3QgYXZhaWxhYmxlQ29sdW1ucyA9IENvbHVtblNldHRpbmdzVXRpbHMuZ2V0QXZhaWxhYmxlQ29sdW1ucyhwcm9wcy5jb2x1bW5zKTtcbiAgICBjb25zdCBzZWxlY3RlZENvbHVtbnMgPSBDb2x1bW5TZXR0aW5nc1V0aWxzLmdldFNlbGVjdGVkQ29sdW1ucyhcbiAgICAgIHByb3BzLmNvbHVtbnMsXG4gICAgICBwcm9wcy52aXNpYmxlQ29sdW1ucyxcbiAgICApO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBhdmFpbGFibGVDb2x1bW5zLFxuICAgICAgc2VsZWN0ZWRDb2x1bW5zLFxuICAgICAgYWxsU2VsZWN0ZWQ6IGF2YWlsYWJsZUNvbHVtbnMubGVuZ3RoID09PSBzZWxlY3RlZENvbHVtbnMubGVuZ3RoLFxuICAgIH07XG4gIH1cblxuICBoYW5kbGVDYW5jZWxDbGljayA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLmNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbCh0aGlzLnByb3BzLmdyaWQpO1xuICB9O1xuXG4gIGhhbmRsZU9rQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgaGlkZGVuQ29sdW1ucyA9IENvbHVtblNldHRpbmdzVXRpbHMuZ2V0SGlkZGVuQ29sdW1ucyhcbiAgICAgIHRoaXMuc3RhdGUuYXZhaWxhYmxlQ29sdW1ucyxcbiAgICAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRDb2x1bW5zLFxuICAgICk7XG4gICAgY29uc3QgY29sdW1uT3JkZXJzID0gQ29sdW1uU2V0dGluZ3NVdGlscy5nZXRDb2x1bW5PcmRlcnModGhpcy5zdGF0ZS5zZWxlY3RlZENvbHVtbnMpO1xuICAgIHRoaXMucHJvcHMuc2F2ZUNvbHVtblNldHRpbmdzKHRoaXMucHJvcHMuZ3JpZCwgaGlkZGVuQ29sdW1ucywgY29sdW1uT3JkZXJzKTtcbiAgICB0aGlzLnByb3BzLmNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbCh0aGlzLnByb3BzLmdyaWQpO1xuICB9O1xuXG4gIGhhbmRsZVNlbGVjdGlvbkNoYW5nZSA9IChkYXRhKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGFsbFNlbGVjdGVkOiBkYXRhLmFsbFNlbGVjdGVkLCBzZWxlY3RlZENvbHVtbnM6IGRhdGEuc2VsZWN0ZWREYXRhLnRvSlMoKSB9KTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxNb2RhbFxuICAgICAgICBic1NpemU9XCJsYXJnZVwiXG4gICAgICAgIGRpYWxvZ0NsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWNvbHVtbi1zZXR0aW5ncy1tb2RhbFwiXG4gICAgICAgIGFyaWEtbGFiZWxsZWRieT1cIm9jLWRhdGFncmlkLWNvbHVtbi1zZXR0aW5ncy1tb2RhbFwiXG4gICAgICAgIHNob3dcbiAgICAgICAgb25IaWRlPXt0aGlzLmhhbmRsZUNhbmNlbENsaWNrfVxuICAgICAgPlxuICAgICAgICA8TW9kYWwuSGVhZGVyPlxuICAgICAgICAgIDxNb2RhbC5UaXRsZT5cbiAgICAgICAgICAgIDxNIGlkPVwiR3JpZC5Db2x1bW5TZXR0aW5ncy5IZWFkZXJcIiAvPlxuICAgICAgICAgIDwvTW9kYWwuVGl0bGU+XG4gICAgICAgIDwvTW9kYWwuSGVhZGVyPlxuICAgICAgICA8TW9kYWwuQm9keT5cbiAgICAgICAgICA8U2VsZWN0T3JkZXJMaXN0XG4gICAgICAgICAgICBhbGxTZWxlY3RlZD17dGhpcy5zdGF0ZS5hbGxTZWxlY3RlZH1cbiAgICAgICAgICAgIGF2YWlsYWJsZURhdGE9e0xpc3QodGhpcy5zdGF0ZS5hdmFpbGFibGVDb2x1bW5zKX1cbiAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZENvbHVtblNldHRpbmdzLSR7dGhpcy5wcm9wcy5ncmlkLmlkfWB9XG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVTZWxlY3Rpb25DaGFuZ2V9XG4gICAgICAgICAgICBzZWxlY3RlZERhdGE9e0xpc3QodGhpcy5zdGF0ZS5zZWxlY3RlZENvbHVtbnMpfVxuICAgICAgICAgICAgc2VhcmNoUGxhY2Vob2xkZXI9e3RoaXMucHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdDb21tb24uU2VhcmNoJyB9KX1cbiAgICAgICAgICAgIHRyYW5zbGF0aW9ucz17e1xuICAgICAgICAgICAgICBhbGxMYWJlbDogPE0gaWQ9XCJHcmlkLkNvbHVtblNldHRpbmdzLkFsbFwiIC8+LFxuICAgICAgICAgICAgICBhdmFpbGFibGVMaXN0TGFiZWw6IDxNIGlkPVwiR3JpZC5Db2x1bW5TZXR0aW5ncy5BdmFpbGFibGVDb2x1bW5zXCIgLz4sXG4gICAgICAgICAgICAgIHNlbGVjdGVkTGlzdExhYmVsOiA8TSBpZD1cIkdyaWQuQ29sdW1uU2V0dGluZ3MuU2VsZWN0ZWRDb2x1bW5zXCIgLz4sXG4gICAgICAgICAgICAgIHNlYXJjaFRvb2x0aXA6IDxNIGlkPVwiR3JpZC5Db2x1bW5TZXR0aW5ncy5TZWFyY2hUb29sdGlwXCIgLz4sXG4gICAgICAgICAgICB9fVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvTW9kYWwuQm9keT5cbiAgICAgICAgPE1vZGFsLkZvb3Rlcj5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRDb2x1bW5TZXR0aW5ncy0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tb2stYnV0dG9uYH1cbiAgICAgICAgICAgIGJzU3R5bGU9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlT2tDbGlja31cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8TSBpZD1cIkdyaWQuT2tcIiAvPlxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZENvbHVtblNldHRpbmdzLSR7dGhpcy5wcm9wcy5ncmlkLmlkfS1jYW5jZWwtYnV0dG9uYH1cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2FuY2VsQ2xpY2t9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPE0gaWQ9XCJHcmlkLkNhbmNlbFwiIC8+XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDwvTW9kYWwuRm9vdGVyPlxuICAgICAgPC9Nb2RhbD5cbiAgICApO1xuICB9XG59XG4iXX0=