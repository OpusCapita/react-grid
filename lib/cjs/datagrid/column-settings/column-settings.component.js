'use strict';

exports.__esModule = true;

var _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _immutable = require('immutable');

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _reactBootstrap = require('react-bootstrap');

var _reactIntl = require('react-intl');

var _reactSelectOrderList = require('@opuscapita/react-select-order-list');

var _reactSelectOrderList2 = _interopRequireDefault(_reactSelectOrderList);

var _datagrid = require('../datagrid.props');

var _columnSettings = require('./column-settings.utils');

var _columnSettings2 = _interopRequireDefault(_columnSettings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = (0, _reactIntl.injectIntl)(_class = function (_React$PureComponent) {
  _inherits(ColumnSettings, _React$PureComponent);

  function ColumnSettings(props) {
    _classCallCheck(this, ColumnSettings);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _this.handleCancelClick = function () {
      _this.props.closeColumnSettingsModal(_this.props.grid);
    };

    _this.handleOkClick = function () {
      var hiddenColumns = _columnSettings2.default.getHiddenColumns(_this.state.availableColumns, _this.state.selectedColumns);
      var columnOrders = _columnSettings2.default.getColumnOrders(_this.state.selectedColumns);
      _this.props.saveColumnSettings(_this.props.grid, hiddenColumns, columnOrders);
      _this.props.closeColumnSettingsModal(_this.props.grid);
    };

    _this.handleSelectionChange = function (data) {
      _this.setState({ allSelected: data.allSelected, selectedColumns: data.selectedData.toJS() });
    };

    var availableColumns = _columnSettings2.default.getAvailableColumns(props.columns);
    var selectedColumns = _columnSettings2.default.getSelectedColumns(props.columns, props.visibleColumns);
    _this.state = {
      availableColumns: availableColumns,
      selectedColumns: selectedColumns,
      allSelected: availableColumns.length === selectedColumns.length
    };
    return _this;
  }

  ColumnSettings.prototype.render = function render() {
    return _react2.default.createElement(
      _reactBootstrap.Modal,
      {
        bsSize: 'large',
        dialogClassName: 'oc-datagrid-column-settings-modal',
        'aria-labelledby': 'oc-datagrid-column-settings-modal',
        show: true,
        onHide: this.handleCancelClick
      },
      _react2.default.createElement(
        _reactBootstrap.Modal.Header,
        null,
        _react2.default.createElement(
          _reactBootstrap.Modal.Title,
          null,
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Grid.ColumnSettings.Header' })
        )
      ),
      _react2.default.createElement(
        _reactBootstrap.Modal.Body,
        null,
        _react2.default.createElement(_reactSelectOrderList2.default, {
          allSelected: this.state.allSelected,
          availableData: (0, _immutable.List)(this.state.availableColumns),
          id: 'ocDatagridColumnSettings-' + this.props.grid.id,
          onChange: this.handleSelectionChange,
          selectedData: (0, _immutable.List)(this.state.selectedColumns),
          searchPlaceholder: this.props.intl.formatMessage({ id: 'Common.Search' }),
          translations: {
            allLabel: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Grid.ColumnSettings.All' }),
            availableListLabel: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Grid.ColumnSettings.AvailableColumns' }),
            selectedListLabel: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Grid.ColumnSettings.SelectedColumns' }),
            searchTooltip: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Grid.ColumnSettings.SearchTooltip' })
          }
        })
      ),
      _react2.default.createElement(
        _reactBootstrap.Modal.Footer,
        null,
        _react2.default.createElement(
          _reactBootstrap.Button,
          {
            id: 'ocDatagridColumnSettings-' + this.props.grid.id + '-ok-button',
            bsStyle: 'primary',
            onClick: this.handleOkClick
          },
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Grid.Ok' })
        ),
        _react2.default.createElement(
          _reactBootstrap.Button,
          {
            id: 'ocDatagridColumnSettings-' + this.props.grid.id + '-cancel-button',
            onClick: this.handleCancelClick
          },
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Grid.Cancel' })
        )
      )
    );
  };

  return ColumnSettings;
}(_react2.default.PureComponent)) || _class;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2V0dGluZ3MvY29sdW1uLXNldHRpbmdzLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiaW5qZWN0SW50bCIsInByb3BzIiwiaGFuZGxlQ2FuY2VsQ2xpY2siLCJjbG9zZUNvbHVtblNldHRpbmdzTW9kYWwiLCJncmlkIiwiaGFuZGxlT2tDbGljayIsImhpZGRlbkNvbHVtbnMiLCJDb2x1bW5TZXR0aW5nc1V0aWxzIiwiZ2V0SGlkZGVuQ29sdW1ucyIsInN0YXRlIiwiYXZhaWxhYmxlQ29sdW1ucyIsInNlbGVjdGVkQ29sdW1ucyIsImNvbHVtbk9yZGVycyIsImdldENvbHVtbk9yZGVycyIsInNhdmVDb2x1bW5TZXR0aW5ncyIsImhhbmRsZVNlbGVjdGlvbkNoYW5nZSIsImRhdGEiLCJzZXRTdGF0ZSIsImFsbFNlbGVjdGVkIiwic2VsZWN0ZWREYXRhIiwidG9KUyIsImdldEF2YWlsYWJsZUNvbHVtbnMiLCJjb2x1bW5zIiwiZ2V0U2VsZWN0ZWRDb2x1bW5zIiwidmlzaWJsZUNvbHVtbnMiLCJsZW5ndGgiLCJyZW5kZXIiLCJpZCIsImludGwiLCJmb3JtYXRNZXNzYWdlIiwiYWxsTGFiZWwiLCJhdmFpbGFibGVMaXN0TGFiZWwiLCJzZWxlY3RlZExpc3RMYWJlbCIsInNlYXJjaFRvb2x0aXAiLCJSZWFjdCIsIlB1cmVDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7OztzQkFHQ0EscUI7OztBQVdDLDBCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsaURBQ2pCLGdDQUFNQSxLQUFOLENBRGlCOztBQUFBLFVBWW5CQyxpQkFabUIsR0FZQyxZQUFNO0FBQ3hCLFlBQUtELEtBQUwsQ0FBV0Usd0JBQVgsQ0FBb0MsTUFBS0YsS0FBTCxDQUFXRyxJQUEvQztBQUNELEtBZGtC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RSxxQkFBUyxLQUFLekI7QUFGaEI7QUFJRSx3Q0FBQywyQkFBRCxJQUFHLElBQUcsYUFBTjtBQUpGO0FBUkY7QUExQkYsS0FERjtBQTRDRCxHOzs7RUFuRjBCZ0MsZ0JBQU1DLGEiLCJmaWxlIjoiY29sdW1uLXNldHRpbmdzLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgTGlzdCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgSW1tdXRhYmxlUHJvcFR5cGVzIGZyb20gJ3JlYWN0LWltbXV0YWJsZS1wcm9wdHlwZXMnO1xuaW1wb3J0IHsgTW9kYWwsIEJ1dHRvbiB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlIGFzIE0sIGluamVjdEludGwsIGludGxTaGFwZSB9IGZyb20gJ3JlYWN0LWludGwnO1xuaW1wb3J0IFNlbGVjdE9yZGVyTGlzdCBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1zZWxlY3Qtb3JkZXItbGlzdCc7XG5cbmltcG9ydCB7IGdyaWRTaGFwZSB9IGZyb20gJy4uL2RhdGFncmlkLnByb3BzJztcbmltcG9ydCBDb2x1bW5TZXR0aW5nc1V0aWxzIGZyb20gJy4vY29sdW1uLXNldHRpbmdzLnV0aWxzJztcblxuZXhwb3J0IGRlZmF1bHRcbkBpbmplY3RJbnRsXG5jbGFzcyBDb2x1bW5TZXR0aW5ncyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGludGw6IGludGxTaGFwZS5pc1JlcXVpcmVkLFxuICAgIGdyaWQ6IGdyaWRTaGFwZS5pc1JlcXVpcmVkLFxuICAgIGNvbHVtbnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSgpKS5pc1JlcXVpcmVkLFxuICAgIHZpc2libGVDb2x1bW5zOiBJbW11dGFibGVQcm9wVHlwZXMubGlzdC5pc1JlcXVpcmVkLFxuICAgIGNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBzYXZlQ29sdW1uU2V0dGluZ3M6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgY29uc3QgYXZhaWxhYmxlQ29sdW1ucyA9IENvbHVtblNldHRpbmdzVXRpbHMuZ2V0QXZhaWxhYmxlQ29sdW1ucyhwcm9wcy5jb2x1bW5zKTtcbiAgICBjb25zdCBzZWxlY3RlZENvbHVtbnMgPSBDb2x1bW5TZXR0aW5nc1V0aWxzXG4gICAgICAuZ2V0U2VsZWN0ZWRDb2x1bW5zKHByb3BzLmNvbHVtbnMsIHByb3BzLnZpc2libGVDb2x1bW5zKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgYXZhaWxhYmxlQ29sdW1ucyxcbiAgICAgIHNlbGVjdGVkQ29sdW1ucyxcbiAgICAgIGFsbFNlbGVjdGVkOiBhdmFpbGFibGVDb2x1bW5zLmxlbmd0aCA9PT0gc2VsZWN0ZWRDb2x1bW5zLmxlbmd0aCxcbiAgICB9O1xuICB9XG5cbiAgaGFuZGxlQ2FuY2VsQ2xpY2sgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5jbG9zZUNvbHVtblNldHRpbmdzTW9kYWwodGhpcy5wcm9wcy5ncmlkKTtcbiAgfVxuXG4gIGhhbmRsZU9rQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgaGlkZGVuQ29sdW1ucyA9IENvbHVtblNldHRpbmdzVXRpbHNcbiAgICAgIC5nZXRIaWRkZW5Db2x1bW5zKHRoaXMuc3RhdGUuYXZhaWxhYmxlQ29sdW1ucywgdGhpcy5zdGF0ZS5zZWxlY3RlZENvbHVtbnMpO1xuICAgIGNvbnN0IGNvbHVtbk9yZGVycyA9IENvbHVtblNldHRpbmdzVXRpbHMuZ2V0Q29sdW1uT3JkZXJzKHRoaXMuc3RhdGUuc2VsZWN0ZWRDb2x1bW5zKTtcbiAgICB0aGlzLnByb3BzLnNhdmVDb2x1bW5TZXR0aW5ncyh0aGlzLnByb3BzLmdyaWQsIGhpZGRlbkNvbHVtbnMsIGNvbHVtbk9yZGVycyk7XG4gICAgdGhpcy5wcm9wcy5jbG9zZUNvbHVtblNldHRpbmdzTW9kYWwodGhpcy5wcm9wcy5ncmlkKTtcbiAgfVxuXG4gIGhhbmRsZVNlbGVjdGlvbkNoYW5nZSA9IChkYXRhKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGFsbFNlbGVjdGVkOiBkYXRhLmFsbFNlbGVjdGVkLCBzZWxlY3RlZENvbHVtbnM6IGRhdGEuc2VsZWN0ZWREYXRhLnRvSlMoKSB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPE1vZGFsXG4gICAgICAgIGJzU2l6ZT1cImxhcmdlXCJcbiAgICAgICAgZGlhbG9nQ2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtY29sdW1uLXNldHRpbmdzLW1vZGFsXCJcbiAgICAgICAgYXJpYS1sYWJlbGxlZGJ5PVwib2MtZGF0YWdyaWQtY29sdW1uLXNldHRpbmdzLW1vZGFsXCJcbiAgICAgICAgc2hvd1xuICAgICAgICBvbkhpZGU9e3RoaXMuaGFuZGxlQ2FuY2VsQ2xpY2t9XG4gICAgICA+XG4gICAgICAgIDxNb2RhbC5IZWFkZXI+XG4gICAgICAgICAgPE1vZGFsLlRpdGxlPjxNIGlkPVwiR3JpZC5Db2x1bW5TZXR0aW5ncy5IZWFkZXJcIiAvPjwvTW9kYWwuVGl0bGU+XG4gICAgICAgIDwvTW9kYWwuSGVhZGVyPlxuICAgICAgICA8TW9kYWwuQm9keT5cbiAgICAgICAgICA8U2VsZWN0T3JkZXJMaXN0XG4gICAgICAgICAgICBhbGxTZWxlY3RlZD17dGhpcy5zdGF0ZS5hbGxTZWxlY3RlZH1cbiAgICAgICAgICAgIGF2YWlsYWJsZURhdGE9e0xpc3QodGhpcy5zdGF0ZS5hdmFpbGFibGVDb2x1bW5zKX1cbiAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZENvbHVtblNldHRpbmdzLSR7dGhpcy5wcm9wcy5ncmlkLmlkfWB9XG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVTZWxlY3Rpb25DaGFuZ2V9XG4gICAgICAgICAgICBzZWxlY3RlZERhdGE9e0xpc3QodGhpcy5zdGF0ZS5zZWxlY3RlZENvbHVtbnMpfVxuICAgICAgICAgICAgc2VhcmNoUGxhY2Vob2xkZXI9e3RoaXMucHJvcHMuaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdDb21tb24uU2VhcmNoJyB9KX1cbiAgICAgICAgICAgIHRyYW5zbGF0aW9ucz17e1xuICAgICAgICAgICAgICBhbGxMYWJlbDogPE0gaWQ9XCJHcmlkLkNvbHVtblNldHRpbmdzLkFsbFwiIC8+LFxuICAgICAgICAgICAgICBhdmFpbGFibGVMaXN0TGFiZWw6IDxNIGlkPVwiR3JpZC5Db2x1bW5TZXR0aW5ncy5BdmFpbGFibGVDb2x1bW5zXCIgLz4sXG4gICAgICAgICAgICAgIHNlbGVjdGVkTGlzdExhYmVsOiA8TSBpZD1cIkdyaWQuQ29sdW1uU2V0dGluZ3MuU2VsZWN0ZWRDb2x1bW5zXCIgLz4sXG4gICAgICAgICAgICAgIHNlYXJjaFRvb2x0aXA6IDxNIGlkPVwiR3JpZC5Db2x1bW5TZXR0aW5ncy5TZWFyY2hUb29sdGlwXCIgLz4sXG4gICAgICAgICAgICB9fVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvTW9kYWwuQm9keT5cbiAgICAgICAgPE1vZGFsLkZvb3Rlcj5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRDb2x1bW5TZXR0aW5ncy0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tb2stYnV0dG9uYH1cbiAgICAgICAgICAgIGJzU3R5bGU9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlT2tDbGlja31cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8TSBpZD1cIkdyaWQuT2tcIiAvPlxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZENvbHVtblNldHRpbmdzLSR7dGhpcy5wcm9wcy5ncmlkLmlkfS1jYW5jZWwtYnV0dG9uYH1cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2FuY2VsQ2xpY2t9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPE0gaWQ9XCJHcmlkLkNhbmNlbFwiIC8+XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDwvTW9kYWwuRm9vdGVyPlxuICAgICAgPC9Nb2RhbD5cbiAgICApO1xuICB9XG59XG4iXX0=