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
}(_react2.default.PureComponent);

exports.default = ColumnSettings;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2V0dGluZ3MvY29sdW1uLXNldHRpbmdzLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiQ29sdW1uU2V0dGluZ3MiLCJwcm9wcyIsImhhbmRsZUNhbmNlbENsaWNrIiwiY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsIiwiZ3JpZCIsImhhbmRsZU9rQ2xpY2siLCJoaWRkZW5Db2x1bW5zIiwiZ2V0SGlkZGVuQ29sdW1ucyIsInN0YXRlIiwiYXZhaWxhYmxlQ29sdW1ucyIsInNlbGVjdGVkQ29sdW1ucyIsImNvbHVtbk9yZGVycyIsImdldENvbHVtbk9yZGVycyIsInNhdmVDb2x1bW5TZXR0aW5ncyIsImhhbmRsZVNlbGVjdGlvbkNoYW5nZSIsImRhdGEiLCJzZXRTdGF0ZSIsImFsbFNlbGVjdGVkIiwic2VsZWN0ZWREYXRhIiwidG9KUyIsImdldEF2YWlsYWJsZUNvbHVtbnMiLCJjb2x1bW5zIiwiZ2V0U2VsZWN0ZWRDb2x1bW5zIiwidmlzaWJsZUNvbHVtbnMiLCJsZW5ndGgiLCJyZW5kZXIiLCJpZCIsImFsbExhYmVsIiwiYXZhaWxhYmxlTGlzdExhYmVsIiwic2VsZWN0ZWRMaXN0TGFiZWwiLCJzZWFyY2hUb29sdGlwIiwiUHVyZUNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLGM7OztBQVNuQiwwQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQixnQ0FBTUEsS0FBTixDQURpQjs7QUFBQSxVQVluQkMsaUJBWm1CLEdBWUMsWUFBTTtBQUN4QixZQUFLRCxLQUFMLENBQVdFLHdCQUFYLENBQW9DLE1BQUtGLEtBQUwsQ0FBV0csSUFBL0M7QUFDRCxLQWRrQjs7QUFBQSxVQWdCbkJDLGFBaEJtQixHQWdCSCxZQUFNO0FBQ3BCLFVBQU1DLGdCQUFnQix5QkFDbkJDLGdCQURtQixDQUNGLE1BQUtDLEtBQUwsQ0FBV0MsZ0JBRFQsRUFDMkIsTUFBS0QsS0FBTCxDQUFXRSxlQUR0QyxDQUF0QjtBQUVBLFVBQU1DLGVBQWUseUJBQW9CQyxlQUFwQixDQUFvQyxNQUFLSixLQUFMLENBQVdFLGVBQS9DLENBQXJCO0FBQ0EsWUFBS1QsS0FBTCxDQUFXWSxrQkFBWCxDQUE4QixNQUFLWixLQUFMLENBQVdHLElBQXpDLEVBQStDRSxhQUEvQyxFQUE4REssWUFBOUQ7QUFDQSxZQUFLVixLQUFMLENBQVdFLHdCQUFYLENBQW9DLE1BQUtGLEtBQUwsQ0FBV0csSUFBL0M7QUFDRCxLQXRCa0I7O0FBQUEsVUF3Qm5CVSxxQkF4Qm1CLEdBd0JLLFVBQUNDLElBQUQsRUFBVTtBQUNoQyxZQUFLQyxRQUFMLENBQWMsRUFBRUMsYUFBYUYsS0FBS0UsV0FBcEIsRUFBaUNQLGlCQUFpQkssS0FBS0csWUFBTCxDQUFrQkMsSUFBbEIsRUFBbEQsRUFBZDtBQUNELEtBMUJrQjs7QUFFakIsUUFBTVYsbUJBQW1CLHlCQUFvQlcsbUJBQXBCLENBQXdDbkIsTUFBTW9CLE9BQTlDLENBQXpCO0FBQ0EsUUFBTVgsa0JBQWtCLHlCQUNyQlksa0JBRHFCLENBQ0ZyQixNQUFNb0IsT0FESixFQUNhcEIsTUFBTXNCLGNBRG5CLENBQXhCO0FBRUEsVUFBS2YsS0FBTCxHQUFhO0FBQ1hDLHdDQURXO0FBRVhDLHNDQUZXO0FBR1hPLG1CQUFhUixpQkFBaUJlLE1BQWpCLEtBQTRCZCxnQkFBZ0JjO0FBSDlDLEtBQWI7QUFMaUI7QUFVbEI7OzJCQWtCREMsTSxxQkFBUztBQUNQLFdBQ0U7QUFBQTtBQUFBO0FBQ0UsZ0JBQU8sT0FEVDtBQUVFLHlCQUFnQixtQ0FGbEI7QUFHRSwyQkFBZ0IsbUNBSGxCO0FBSUUsa0JBSkY7QUFLRSxnQkFBUSxLQUFLdkI7QUFMZjtBQU9FO0FBQUEsOEJBQU8sTUFBUDtBQUFBO0FBQ0U7QUFBQSxnQ0FBTyxLQUFQO0FBQUE7QUFBYSx1RUFBRyxJQUFHLDRCQUFOO0FBQWI7QUFERixPQVBGO0FBVUU7QUFBQSw4QkFBTyxJQUFQO0FBQUE7QUFDRTtBQUNFLHVCQUFhLEtBQUtNLEtBQUwsQ0FBV1MsV0FEMUI7QUFFRSx5QkFBZSxxQkFBSyxLQUFLVCxLQUFMLENBQVdDLGdCQUFoQixDQUZqQjtBQUdFLDRDQUFnQyxLQUFLUixLQUFMLENBQVdHLElBQVgsQ0FBZ0JzQixFQUhsRDtBQUlFLG9CQUFVLEtBQUtaLHFCQUpqQjtBQUtFLHdCQUFjLHFCQUFLLEtBQUtOLEtBQUwsQ0FBV0UsZUFBaEIsQ0FMaEI7QUFNRSx3QkFBYztBQUNaaUIsc0JBQVUsNkRBQUcsSUFBRyx5QkFBTixHQURFO0FBRVpDLGdDQUFvQiw2REFBRyxJQUFHLHNDQUFOLEdBRlI7QUFHWkMsK0JBQW1CLDZEQUFHLElBQUcscUNBQU4sR0FIUDtBQUlaQywyQkFBZSw2REFBRyxJQUFHLG1DQUFOO0FBSkg7QUFOaEI7QUFERixPQVZGO0FBeUJFO0FBQUEsOEJBQU8sTUFBUDtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FBQ0UsOENBQWdDLEtBQUs3QixLQUFMLENBQVdHLElBQVgsQ0FBZ0JzQixFQUFoRCxlQURGO0FBRUUscUJBQVEsU0FGVjtBQUdFLHFCQUFTLEtBQUtyQjtBQUhoQjtBQUtFLHVFQUFHLElBQUcsU0FBTjtBQUxGLFNBREY7QUFRRTtBQUFBO0FBQUE7QUFDRSw4Q0FBZ0MsS0FBS0osS0FBTCxDQUFXRyxJQUFYLENBQWdCc0IsRUFBaEQsbUJBREY7QUFFRSxxQkFBUyxLQUFLeEI7QUFGaEI7QUFJRSx1RUFBRyxJQUFHLGFBQU47QUFKRjtBQVJGO0FBekJGLEtBREY7QUEyQ0QsRzs7O0VBakZ5QyxnQkFBTTZCLGE7O2tCQUE3Qi9CLGMiLCJmaWxlIjoiY29sdW1uLXNldHRpbmdzLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XHJcbmltcG9ydCB7IExpc3QgfSBmcm9tICdpbW11dGFibGUnO1xyXG5pbXBvcnQgSW1tdXRhYmxlUHJvcFR5cGVzIGZyb20gJ3JlYWN0LWltbXV0YWJsZS1wcm9wdHlwZXMnO1xyXG5pbXBvcnQgeyBNb2RhbCwgQnV0dG9uIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcclxuaW1wb3J0IHsgRm9ybWF0dGVkTWVzc2FnZSBhcyBNIH0gZnJvbSAncmVhY3QtaW50bCc7XHJcbmltcG9ydCBTZWxlY3RPcmRlckxpc3QgZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3Qtc2VsZWN0LW9yZGVyLWxpc3QnO1xyXG5cclxuaW1wb3J0IHsgZ3JpZFNoYXBlIH0gZnJvbSAnLi4vZGF0YWdyaWQucHJvcHMnO1xyXG5pbXBvcnQgQ29sdW1uU2V0dGluZ3NVdGlscyBmcm9tICcuL2NvbHVtbi1zZXR0aW5ncy51dGlscyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2x1bW5TZXR0aW5ncyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xyXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XHJcbiAgICBncmlkOiBncmlkU2hhcGUuaXNSZXF1aXJlZCxcclxuICAgIGNvbHVtbnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSgpKS5pc1JlcXVpcmVkLFxyXG4gICAgdmlzaWJsZUNvbHVtbnM6IEltbXV0YWJsZVByb3BUeXBlcy5saXN0LmlzUmVxdWlyZWQsXHJcbiAgICBjbG9zZUNvbHVtblNldHRpbmdzTW9kYWw6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICBzYXZlQ29sdW1uU2V0dGluZ3M6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgfTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIGNvbnN0IGF2YWlsYWJsZUNvbHVtbnMgPSBDb2x1bW5TZXR0aW5nc1V0aWxzLmdldEF2YWlsYWJsZUNvbHVtbnMocHJvcHMuY29sdW1ucyk7XHJcbiAgICBjb25zdCBzZWxlY3RlZENvbHVtbnMgPSBDb2x1bW5TZXR0aW5nc1V0aWxzXHJcbiAgICAgIC5nZXRTZWxlY3RlZENvbHVtbnMocHJvcHMuY29sdW1ucywgcHJvcHMudmlzaWJsZUNvbHVtbnMpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgYXZhaWxhYmxlQ29sdW1ucyxcclxuICAgICAgc2VsZWN0ZWRDb2x1bW5zLFxyXG4gICAgICBhbGxTZWxlY3RlZDogYXZhaWxhYmxlQ29sdW1ucy5sZW5ndGggPT09IHNlbGVjdGVkQ29sdW1ucy5sZW5ndGgsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlQ2FuY2VsQ2xpY2sgPSAoKSA9PiB7XHJcbiAgICB0aGlzLnByb3BzLmNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbCh0aGlzLnByb3BzLmdyaWQpO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlT2tDbGljayA9ICgpID0+IHtcclxuICAgIGNvbnN0IGhpZGRlbkNvbHVtbnMgPSBDb2x1bW5TZXR0aW5nc1V0aWxzXHJcbiAgICAgIC5nZXRIaWRkZW5Db2x1bW5zKHRoaXMuc3RhdGUuYXZhaWxhYmxlQ29sdW1ucywgdGhpcy5zdGF0ZS5zZWxlY3RlZENvbHVtbnMpO1xyXG4gICAgY29uc3QgY29sdW1uT3JkZXJzID0gQ29sdW1uU2V0dGluZ3NVdGlscy5nZXRDb2x1bW5PcmRlcnModGhpcy5zdGF0ZS5zZWxlY3RlZENvbHVtbnMpO1xyXG4gICAgdGhpcy5wcm9wcy5zYXZlQ29sdW1uU2V0dGluZ3ModGhpcy5wcm9wcy5ncmlkLCBoaWRkZW5Db2x1bW5zLCBjb2x1bW5PcmRlcnMpO1xyXG4gICAgdGhpcy5wcm9wcy5jbG9zZUNvbHVtblNldHRpbmdzTW9kYWwodGhpcy5wcm9wcy5ncmlkKTtcclxuICB9XHJcblxyXG4gIGhhbmRsZVNlbGVjdGlvbkNoYW5nZSA9IChkYXRhKSA9PiB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHsgYWxsU2VsZWN0ZWQ6IGRhdGEuYWxsU2VsZWN0ZWQsIHNlbGVjdGVkQ29sdW1uczogZGF0YS5zZWxlY3RlZERhdGEudG9KUygpIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPE1vZGFsXHJcbiAgICAgICAgYnNTaXplPVwibGFyZ2VcIlxyXG4gICAgICAgIGRpYWxvZ0NsYXNzTmFtZT1cIm9jLWRhdGFncmlkLWNvbHVtbi1zZXR0aW5ncy1tb2RhbFwiXHJcbiAgICAgICAgYXJpYS1sYWJlbGxlZGJ5PVwib2MtZGF0YWdyaWQtY29sdW1uLXNldHRpbmdzLW1vZGFsXCJcclxuICAgICAgICBzaG93XHJcbiAgICAgICAgb25IaWRlPXt0aGlzLmhhbmRsZUNhbmNlbENsaWNrfVxyXG4gICAgICA+XHJcbiAgICAgICAgPE1vZGFsLkhlYWRlcj5cclxuICAgICAgICAgIDxNb2RhbC5UaXRsZT48TSBpZD1cIkdyaWQuQ29sdW1uU2V0dGluZ3MuSGVhZGVyXCIgLz48L01vZGFsLlRpdGxlPlxyXG4gICAgICAgIDwvTW9kYWwuSGVhZGVyPlxyXG4gICAgICAgIDxNb2RhbC5Cb2R5PlxyXG4gICAgICAgICAgPFNlbGVjdE9yZGVyTGlzdFxyXG4gICAgICAgICAgICBhbGxTZWxlY3RlZD17dGhpcy5zdGF0ZS5hbGxTZWxlY3RlZH1cclxuICAgICAgICAgICAgYXZhaWxhYmxlRGF0YT17TGlzdCh0aGlzLnN0YXRlLmF2YWlsYWJsZUNvbHVtbnMpfVxyXG4gICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRDb2x1bW5TZXR0aW5ncy0ke3RoaXMucHJvcHMuZ3JpZC5pZH1gfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVTZWxlY3Rpb25DaGFuZ2V9XHJcbiAgICAgICAgICAgIHNlbGVjdGVkRGF0YT17TGlzdCh0aGlzLnN0YXRlLnNlbGVjdGVkQ29sdW1ucyl9XHJcbiAgICAgICAgICAgIHRyYW5zbGF0aW9ucz17e1xyXG4gICAgICAgICAgICAgIGFsbExhYmVsOiA8TSBpZD1cIkdyaWQuQ29sdW1uU2V0dGluZ3MuQWxsXCIgLz4sXHJcbiAgICAgICAgICAgICAgYXZhaWxhYmxlTGlzdExhYmVsOiA8TSBpZD1cIkdyaWQuQ29sdW1uU2V0dGluZ3MuQXZhaWxhYmxlQ29sdW1uc1wiIC8+LFxyXG4gICAgICAgICAgICAgIHNlbGVjdGVkTGlzdExhYmVsOiA8TSBpZD1cIkdyaWQuQ29sdW1uU2V0dGluZ3MuU2VsZWN0ZWRDb2x1bW5zXCIgLz4sXHJcbiAgICAgICAgICAgICAgc2VhcmNoVG9vbHRpcDogPE0gaWQ9XCJHcmlkLkNvbHVtblNldHRpbmdzLlNlYXJjaFRvb2x0aXBcIiAvPixcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9Nb2RhbC5Cb2R5PlxyXG4gICAgICAgIDxNb2RhbC5Gb290ZXI+XHJcbiAgICAgICAgICA8QnV0dG9uXHJcbiAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZENvbHVtblNldHRpbmdzLSR7dGhpcy5wcm9wcy5ncmlkLmlkfS1vay1idXR0b25gfVxyXG4gICAgICAgICAgICBic1N0eWxlPVwicHJpbWFyeVwiXHJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlT2tDbGlja31cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPE0gaWQ9XCJHcmlkLk9rXCIgLz5cclxuICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRDb2x1bW5TZXR0aW5ncy0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tY2FuY2VsLWJ1dHRvbmB9XHJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2FuY2VsQ2xpY2t9XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxNIGlkPVwiR3JpZC5DYW5jZWxcIiAvPlxyXG4gICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgPC9Nb2RhbC5Gb290ZXI+XHJcbiAgICAgIDwvTW9kYWw+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=