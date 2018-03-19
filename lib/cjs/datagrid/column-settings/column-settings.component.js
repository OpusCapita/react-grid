'use strict';

exports.__esModule = true;
exports.default = undefined;

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

var ColumnSettings = function (_React$PureComponent) {
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
          translations: {
            allLabel: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Grid.ColumnSettings.All' }),
            availableListLabel: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Grid.ColumnSettings.AvailableColumns' }),
            selectedListLabel: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Grid.ColumnSettings.SelectedColumns' })
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
}(_react2.default.PureComponent);

exports.default = ColumnSettings;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2V0dGluZ3MvY29sdW1uLXNldHRpbmdzLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiQ29sdW1uU2V0dGluZ3MiLCJwcm9wcyIsImhhbmRsZUNhbmNlbENsaWNrIiwiY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsIiwiZ3JpZCIsImhhbmRsZU9rQ2xpY2siLCJoaWRkZW5Db2x1bW5zIiwiZ2V0SGlkZGVuQ29sdW1ucyIsInN0YXRlIiwiYXZhaWxhYmxlQ29sdW1ucyIsInNlbGVjdGVkQ29sdW1ucyIsImNvbHVtbk9yZGVycyIsImdldENvbHVtbk9yZGVycyIsInNhdmVDb2x1bW5TZXR0aW5ncyIsImhhbmRsZVNlbGVjdGlvbkNoYW5nZSIsImRhdGEiLCJzZXRTdGF0ZSIsImFsbFNlbGVjdGVkIiwic2VsZWN0ZWREYXRhIiwidG9KUyIsImdldEF2YWlsYWJsZUNvbHVtbnMiLCJjb2x1bW5zIiwiZ2V0U2VsZWN0ZWRDb2x1bW5zIiwidmlzaWJsZUNvbHVtbnMiLCJsZW5ndGgiLCJyZW5kZXIiLCJpZCIsImFsbExhYmVsIiwiYXZhaWxhYmxlTGlzdExhYmVsIiwic2VsZWN0ZWRMaXN0TGFiZWwiLCJQdXJlQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsYzs7O0FBU25CLDBCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsaURBQ2pCLGdDQUFNQSxLQUFOLENBRGlCOztBQUFBLFVBWW5CQyxpQkFabUIsR0FZQyxZQUFNO0FBQ3hCLFlBQUtELEtBQUwsQ0FBV0Usd0JBQVgsQ0FBb0MsTUFBS0YsS0FBTCxDQUFXRyxJQUEvQztBQUNELEtBZGtCOztBQUFBLFVBZ0JuQkMsYUFoQm1CLEdBZ0JILFlBQU07QUFDcEIsVUFBTUMsZ0JBQWdCLHlCQUNuQkMsZ0JBRG1CLENBQ0YsTUFBS0MsS0FBTCxDQUFXQyxnQkFEVCxFQUMyQixNQUFLRCxLQUFMLENBQVdFLGVBRHRDLENBQXRCO0FBRUEsVUFBTUMsZUFBZSx5QkFBb0JDLGVBQXBCLENBQW9DLE1BQUtKLEtBQUwsQ0FBV0UsZUFBL0MsQ0FBckI7QUFDQSxZQUFLVCxLQUFMLENBQVdZLGtCQUFYLENBQThCLE1BQUtaLEtBQUwsQ0FBV0csSUFBekMsRUFBK0NFLGFBQS9DLEVBQThESyxZQUE5RDtBQUNBLFlBQUtWLEtBQUwsQ0FBV0Usd0JBQVgsQ0FBb0MsTUFBS0YsS0FBTCxDQUFXRyxJQUEvQztBQUNELEtBdEJrQjs7QUFBQSxVQXdCbkJVLHFCQXhCbUIsR0F3QkssVUFBQ0MsSUFBRCxFQUFVO0FBQ2hDLFlBQUtDLFFBQUwsQ0FBYyxFQUFFQyxhQUFhRixLQUFLRSxXQUFwQixFQUFpQ1AsaUJBQWlCSyxLQUFLRyxZQUFMLENBQWtCQyxJQUFsQixFQUFsRCxFQUFkO0FBQ0QsS0ExQmtCOztBQUVqQixRQUFNVixtQkFBbUIseUJBQW9CVyxtQkFBcEIsQ0FBd0NuQixNQUFNb0IsT0FBOUMsQ0FBekI7QUFDQSxRQUFNWCxrQkFBa0IseUJBQ3JCWSxrQkFEcUIsQ0FDRnJCLE1BQU1vQixPQURKLEVBQ2FwQixNQUFNc0IsY0FEbkIsQ0FBeEI7QUFFQSxVQUFLZixLQUFMLEdBQWE7QUFDWEMsd0NBRFc7QUFFWEMsc0NBRlc7QUFHWE8sbUJBQWFSLGlCQUFpQmUsTUFBakIsS0FBNEJkLGdCQUFnQmM7QUFIOUMsS0FBYjtBQUxpQjtBQVVsQjs7MkJBa0JEQyxNLHFCQUFTO0FBQ1AsV0FDRTtBQUFBO0FBQUE7QUFDRSxnQkFBTyxPQURUO0FBRUUseUJBQWdCLG1DQUZsQjtBQUdFLDJCQUFnQixtQ0FIbEI7QUFJRSxrQkFKRjtBQUtFLGdCQUFRLEtBQUt2QjtBQUxmO0FBT0U7QUFBQSw4QkFBTyxNQUFQO0FBQUE7QUFDRTtBQUFBLGdDQUFPLEtBQVA7QUFBQTtBQUFhLHVFQUFHLElBQUcsNEJBQU47QUFBYjtBQURGLE9BUEY7QUFVRTtBQUFBLDhCQUFPLElBQVA7QUFBQTtBQUNFO0FBQ0UsdUJBQWEsS0FBS00sS0FBTCxDQUFXUyxXQUQxQjtBQUVFLHlCQUFlLHFCQUFLLEtBQUtULEtBQUwsQ0FBV0MsZ0JBQWhCLENBRmpCO0FBR0UsNENBQWdDLEtBQUtSLEtBQUwsQ0FBV0csSUFBWCxDQUFnQnNCLEVBSGxEO0FBSUUsb0JBQVUsS0FBS1oscUJBSmpCO0FBS0Usd0JBQWMscUJBQUssS0FBS04sS0FBTCxDQUFXRSxlQUFoQixDQUxoQjtBQU1FLHdCQUFjO0FBQ1ppQixzQkFBVSw2REFBRyxJQUFHLHlCQUFOLEdBREU7QUFFWkMsZ0NBQW9CLDZEQUFHLElBQUcsc0NBQU4sR0FGUjtBQUdaQywrQkFBbUIsNkRBQUcsSUFBRyxxQ0FBTjtBQUhQO0FBTmhCO0FBREYsT0FWRjtBQXdCRTtBQUFBLDhCQUFPLE1BQVA7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUNFLDhDQUFnQyxLQUFLNUIsS0FBTCxDQUFXRyxJQUFYLENBQWdCc0IsRUFBaEQsZUFERjtBQUVFLHFCQUFRLFNBRlY7QUFHRSxxQkFBUyxLQUFLckI7QUFIaEI7QUFLRSx1RUFBRyxJQUFHLFNBQU47QUFMRixTQURGO0FBUUU7QUFBQTtBQUFBO0FBQ0UsOENBQWdDLEtBQUtKLEtBQUwsQ0FBV0csSUFBWCxDQUFnQnNCLEVBQWhELG1CQURGO0FBRUUscUJBQVMsS0FBS3hCO0FBRmhCO0FBSUUsdUVBQUcsSUFBRyxhQUFOO0FBSkY7QUFSRjtBQXhCRixLQURGO0FBMENELEc7OztFQWhGeUMsZ0JBQU00QixhOztrQkFBN0I5QixjIiwiZmlsZSI6ImNvbHVtbi1zZXR0aW5ncy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IExpc3QgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IEltbXV0YWJsZVByb3BUeXBlcyBmcm9tICdyZWFjdC1pbW11dGFibGUtcHJvcHR5cGVzJztcbmltcG9ydCB7IE1vZGFsLCBCdXR0b24gfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IHsgRm9ybWF0dGVkTWVzc2FnZSBhcyBNIH0gZnJvbSAncmVhY3QtaW50bCc7XG5pbXBvcnQgU2VsZWN0T3JkZXJMaXN0IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXNlbGVjdC1vcmRlci1saXN0JztcblxuaW1wb3J0IHsgZ3JpZFNoYXBlIH0gZnJvbSAnLi4vZGF0YWdyaWQucHJvcHMnO1xuaW1wb3J0IENvbHVtblNldHRpbmdzVXRpbHMgZnJvbSAnLi9jb2x1bW4tc2V0dGluZ3MudXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2x1bW5TZXR0aW5ncyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGdyaWQ6IGdyaWRTaGFwZS5pc1JlcXVpcmVkLFxuICAgIGNvbHVtbnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSgpKS5pc1JlcXVpcmVkLFxuICAgIHZpc2libGVDb2x1bW5zOiBJbW11dGFibGVQcm9wVHlwZXMubGlzdC5pc1JlcXVpcmVkLFxuICAgIGNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBzYXZlQ29sdW1uU2V0dGluZ3M6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgY29uc3QgYXZhaWxhYmxlQ29sdW1ucyA9IENvbHVtblNldHRpbmdzVXRpbHMuZ2V0QXZhaWxhYmxlQ29sdW1ucyhwcm9wcy5jb2x1bW5zKTtcbiAgICBjb25zdCBzZWxlY3RlZENvbHVtbnMgPSBDb2x1bW5TZXR0aW5nc1V0aWxzXG4gICAgICAuZ2V0U2VsZWN0ZWRDb2x1bW5zKHByb3BzLmNvbHVtbnMsIHByb3BzLnZpc2libGVDb2x1bW5zKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgYXZhaWxhYmxlQ29sdW1ucyxcbiAgICAgIHNlbGVjdGVkQ29sdW1ucyxcbiAgICAgIGFsbFNlbGVjdGVkOiBhdmFpbGFibGVDb2x1bW5zLmxlbmd0aCA9PT0gc2VsZWN0ZWRDb2x1bW5zLmxlbmd0aCxcbiAgICB9O1xuICB9XG5cbiAgaGFuZGxlQ2FuY2VsQ2xpY2sgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5jbG9zZUNvbHVtblNldHRpbmdzTW9kYWwodGhpcy5wcm9wcy5ncmlkKTtcbiAgfVxuXG4gIGhhbmRsZU9rQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgaGlkZGVuQ29sdW1ucyA9IENvbHVtblNldHRpbmdzVXRpbHNcbiAgICAgIC5nZXRIaWRkZW5Db2x1bW5zKHRoaXMuc3RhdGUuYXZhaWxhYmxlQ29sdW1ucywgdGhpcy5zdGF0ZS5zZWxlY3RlZENvbHVtbnMpO1xuICAgIGNvbnN0IGNvbHVtbk9yZGVycyA9IENvbHVtblNldHRpbmdzVXRpbHMuZ2V0Q29sdW1uT3JkZXJzKHRoaXMuc3RhdGUuc2VsZWN0ZWRDb2x1bW5zKTtcbiAgICB0aGlzLnByb3BzLnNhdmVDb2x1bW5TZXR0aW5ncyh0aGlzLnByb3BzLmdyaWQsIGhpZGRlbkNvbHVtbnMsIGNvbHVtbk9yZGVycyk7XG4gICAgdGhpcy5wcm9wcy5jbG9zZUNvbHVtblNldHRpbmdzTW9kYWwodGhpcy5wcm9wcy5ncmlkKTtcbiAgfVxuXG4gIGhhbmRsZVNlbGVjdGlvbkNoYW5nZSA9IChkYXRhKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGFsbFNlbGVjdGVkOiBkYXRhLmFsbFNlbGVjdGVkLCBzZWxlY3RlZENvbHVtbnM6IGRhdGEuc2VsZWN0ZWREYXRhLnRvSlMoKSB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPE1vZGFsXG4gICAgICAgIGJzU2l6ZT1cImxhcmdlXCJcbiAgICAgICAgZGlhbG9nQ2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtY29sdW1uLXNldHRpbmdzLW1vZGFsXCJcbiAgICAgICAgYXJpYS1sYWJlbGxlZGJ5PVwib2MtZGF0YWdyaWQtY29sdW1uLXNldHRpbmdzLW1vZGFsXCJcbiAgICAgICAgc2hvd1xuICAgICAgICBvbkhpZGU9e3RoaXMuaGFuZGxlQ2FuY2VsQ2xpY2t9XG4gICAgICA+XG4gICAgICAgIDxNb2RhbC5IZWFkZXI+XG4gICAgICAgICAgPE1vZGFsLlRpdGxlPjxNIGlkPVwiR3JpZC5Db2x1bW5TZXR0aW5ncy5IZWFkZXJcIiAvPjwvTW9kYWwuVGl0bGU+XG4gICAgICAgIDwvTW9kYWwuSGVhZGVyPlxuICAgICAgICA8TW9kYWwuQm9keT5cbiAgICAgICAgICA8U2VsZWN0T3JkZXJMaXN0XG4gICAgICAgICAgICBhbGxTZWxlY3RlZD17dGhpcy5zdGF0ZS5hbGxTZWxlY3RlZH1cbiAgICAgICAgICAgIGF2YWlsYWJsZURhdGE9e0xpc3QodGhpcy5zdGF0ZS5hdmFpbGFibGVDb2x1bW5zKX1cbiAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZENvbHVtblNldHRpbmdzLSR7dGhpcy5wcm9wcy5ncmlkLmlkfWB9XG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVTZWxlY3Rpb25DaGFuZ2V9XG4gICAgICAgICAgICBzZWxlY3RlZERhdGE9e0xpc3QodGhpcy5zdGF0ZS5zZWxlY3RlZENvbHVtbnMpfVxuICAgICAgICAgICAgdHJhbnNsYXRpb25zPXt7XG4gICAgICAgICAgICAgIGFsbExhYmVsOiA8TSBpZD1cIkdyaWQuQ29sdW1uU2V0dGluZ3MuQWxsXCIgLz4sXG4gICAgICAgICAgICAgIGF2YWlsYWJsZUxpc3RMYWJlbDogPE0gaWQ9XCJHcmlkLkNvbHVtblNldHRpbmdzLkF2YWlsYWJsZUNvbHVtbnNcIiAvPixcbiAgICAgICAgICAgICAgc2VsZWN0ZWRMaXN0TGFiZWw6IDxNIGlkPVwiR3JpZC5Db2x1bW5TZXR0aW5ncy5TZWxlY3RlZENvbHVtbnNcIiAvPixcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Nb2RhbC5Cb2R5PlxuICAgICAgICA8TW9kYWwuRm9vdGVyPlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZENvbHVtblNldHRpbmdzLSR7dGhpcy5wcm9wcy5ncmlkLmlkfS1vay1idXR0b25gfVxuICAgICAgICAgICAgYnNTdHlsZT1cInByaW1hcnlcIlxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVPa0NsaWNrfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxNIGlkPVwiR3JpZC5Pa1wiIC8+XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkQ29sdW1uU2V0dGluZ3MtJHt0aGlzLnByb3BzLmdyaWQuaWR9LWNhbmNlbC1idXR0b25gfVxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDYW5jZWxDbGlja31cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8TSBpZD1cIkdyaWQuQ2FuY2VsXCIgLz5cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPC9Nb2RhbC5Gb290ZXI+XG4gICAgICA8L01vZGFsPlxuICAgICk7XG4gIH1cbn1cbiJdfQ==