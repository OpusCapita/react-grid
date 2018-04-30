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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2V0dGluZ3MvY29sdW1uLXNldHRpbmdzLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiQ29sdW1uU2V0dGluZ3MiLCJwcm9wcyIsImhhbmRsZUNhbmNlbENsaWNrIiwiY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsIiwiZ3JpZCIsImhhbmRsZU9rQ2xpY2siLCJoaWRkZW5Db2x1bW5zIiwiZ2V0SGlkZGVuQ29sdW1ucyIsInN0YXRlIiwiYXZhaWxhYmxlQ29sdW1ucyIsInNlbGVjdGVkQ29sdW1ucyIsImNvbHVtbk9yZGVycyIsImdldENvbHVtbk9yZGVycyIsInNhdmVDb2x1bW5TZXR0aW5ncyIsImhhbmRsZVNlbGVjdGlvbkNoYW5nZSIsImRhdGEiLCJzZXRTdGF0ZSIsImFsbFNlbGVjdGVkIiwic2VsZWN0ZWREYXRhIiwidG9KUyIsImdldEF2YWlsYWJsZUNvbHVtbnMiLCJjb2x1bW5zIiwiZ2V0U2VsZWN0ZWRDb2x1bW5zIiwidmlzaWJsZUNvbHVtbnMiLCJsZW5ndGgiLCJyZW5kZXIiLCJpZCIsImFsbExhYmVsIiwiYXZhaWxhYmxlTGlzdExhYmVsIiwic2VsZWN0ZWRMaXN0TGFiZWwiLCJzZWFyY2hUb29sdGlwIiwiUHVyZUNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLGM7OztBQVNuQiwwQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQixnQ0FBTUEsS0FBTixDQURpQjs7QUFBQSxVQVluQkMsaUJBWm1CLEdBWUMsWUFBTTtBQUN4QixZQUFLRCxLQUFMLENBQVdFLHdCQUFYLENBQW9DLE1BQUtGLEtBQUwsQ0FBV0csSUFBL0M7QUFDRCxLQWRrQjs7QUFBQSxVQWdCbkJDLGFBaEJtQixHQWdCSCxZQUFNO0FBQ3BCLFVBQU1DLGdCQUFnQix5QkFDbkJDLGdCQURtQixDQUNGLE1BQUtDLEtBQUwsQ0FBV0MsZ0JBRFQsRUFDMkIsTUFBS0QsS0FBTCxDQUFXRSxlQUR0QyxDQUF0QjtBQUVBLFVBQU1DLGVBQWUseUJBQW9CQyxlQUFwQixDQUFvQyxNQUFLSixLQUFMLENBQVdFLGVBQS9DLENBQXJCO0FBQ0EsWUFBS1QsS0FBTCxDQUFXWSxrQkFBWCxDQUE4QixNQUFLWixLQUFMLENBQVdHLElBQXpDLEVBQStDRSxhQUEvQyxFQUE4REssWUFBOUQ7QUFDQSxZQUFLVixLQUFMLENBQVdFLHdCQUFYLENBQW9DLE1BQUtGLEtBQUwsQ0FBV0csSUFBL0M7QUFDRCxLQXRCa0I7O0FBQUEsVUF3Qm5CVSxxQkF4Qm1CLEdBd0JLLFVBQUNDLElBQUQsRUFBVTtBQUNoQyxZQUFLQyxRQUFMLENBQWMsRUFBRUMsYUFBYUYsS0FBS0UsV0FBcEIsRUFBaUNQLGlCQUFpQkssS0FBS0csWUFBTCxDQUFrQkMsSUFBbEIsRUFBbEQsRUFBZDtBQUNELEtBMUJrQjs7QUFFakIsUUFBTVYsbUJBQW1CLHlCQUFvQlcsbUJBQXBCLENBQXdDbkIsTUFBTW9CLE9BQTlDLENBQXpCO0FBQ0EsUUFBTVgsa0JBQWtCLHlCQUNyQlksa0JBRHFCLENBQ0ZyQixNQUFNb0IsT0FESixFQUNhcEIsTUFBTXNCLGNBRG5CLENBQXhCO0FBRUEsVUFBS2YsS0FBTCxHQUFhO0FBQ1hDLHdDQURXO0FBRVhDLHNDQUZXO0FBR1hPLG1CQUFhUixpQkFBaUJlLE1BQWpCLEtBQTRCZCxnQkFBZ0JjO0FBSDlDLEtBQWI7QUFMaUI7QUFVbEI7OzJCQWtCREMsTSxxQkFBUztBQUNQLFdBQ0U7QUFBQTtBQUFBO0FBQ0UsZ0JBQU8sT0FEVDtBQUVFLHlCQUFnQixtQ0FGbEI7QUFHRSwyQkFBZ0IsbUNBSGxCO0FBSUUsa0JBSkY7QUFLRSxnQkFBUSxLQUFLdkI7QUFMZjtBQU9FO0FBQUEsOEJBQU8sTUFBUDtBQUFBO0FBQ0U7QUFBQSxnQ0FBTyxLQUFQO0FBQUE7QUFBYSx1RUFBRyxJQUFHLDRCQUFOO0FBQWI7QUFERixPQVBGO0FBVUU7QUFBQSw4QkFBTyxJQUFQO0FBQUE7QUFDRTtBQUNFLHVCQUFhLEtBQUtNLEtBQUwsQ0FBV1MsV0FEMUI7QUFFRSx5QkFBZSxxQkFBSyxLQUFLVCxLQUFMLENBQVdDLGdCQUFoQixDQUZqQjtBQUdFLDRDQUFnQyxLQUFLUixLQUFMLENBQVdHLElBQVgsQ0FBZ0JzQixFQUhsRDtBQUlFLG9CQUFVLEtBQUtaLHFCQUpqQjtBQUtFLHdCQUFjLHFCQUFLLEtBQUtOLEtBQUwsQ0FBV0UsZUFBaEIsQ0FMaEI7QUFNRSx3QkFBYztBQUNaaUIsc0JBQVUsNkRBQUcsSUFBRyx5QkFBTixHQURFO0FBRVpDLGdDQUFvQiw2REFBRyxJQUFHLHNDQUFOLEdBRlI7QUFHWkMsK0JBQW1CLDZEQUFHLElBQUcscUNBQU4sR0FIUDtBQUlaQywyQkFBZSw2REFBRyxJQUFHLG1DQUFOO0FBSkg7QUFOaEI7QUFERixPQVZGO0FBeUJFO0FBQUEsOEJBQU8sTUFBUDtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FBQ0UsOENBQWdDLEtBQUs3QixLQUFMLENBQVdHLElBQVgsQ0FBZ0JzQixFQUFoRCxlQURGO0FBRUUscUJBQVEsU0FGVjtBQUdFLHFCQUFTLEtBQUtyQjtBQUhoQjtBQUtFLHVFQUFHLElBQUcsU0FBTjtBQUxGLFNBREY7QUFRRTtBQUFBO0FBQUE7QUFDRSw4Q0FBZ0MsS0FBS0osS0FBTCxDQUFXRyxJQUFYLENBQWdCc0IsRUFBaEQsbUJBREY7QUFFRSxxQkFBUyxLQUFLeEI7QUFGaEI7QUFJRSx1RUFBRyxJQUFHLGFBQU47QUFKRjtBQVJGO0FBekJGLEtBREY7QUEyQ0QsRzs7O0VBakZ5QyxnQkFBTTZCLGE7O2tCQUE3Qi9CLGMiLCJmaWxlIjoiY29sdW1uLXNldHRpbmdzLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgTGlzdCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgSW1tdXRhYmxlUHJvcFR5cGVzIGZyb20gJ3JlYWN0LWltbXV0YWJsZS1wcm9wdHlwZXMnO1xuaW1wb3J0IHsgTW9kYWwsIEJ1dHRvbiB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlIGFzIE0gfSBmcm9tICdyZWFjdC1pbnRsJztcbmltcG9ydCBTZWxlY3RPcmRlckxpc3QgZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3Qtc2VsZWN0LW9yZGVyLWxpc3QnO1xuXG5pbXBvcnQgeyBncmlkU2hhcGUgfSBmcm9tICcuLi9kYXRhZ3JpZC5wcm9wcyc7XG5pbXBvcnQgQ29sdW1uU2V0dGluZ3NVdGlscyBmcm9tICcuL2NvbHVtbi1zZXR0aW5ncy51dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbHVtblNldHRpbmdzIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgZ3JpZDogZ3JpZFNoYXBlLmlzUmVxdWlyZWQsXG4gICAgY29sdW1uczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKCkpLmlzUmVxdWlyZWQsXG4gICAgdmlzaWJsZUNvbHVtbnM6IEltbXV0YWJsZVByb3BUeXBlcy5saXN0LmlzUmVxdWlyZWQsXG4gICAgY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHNhdmVDb2x1bW5TZXR0aW5nczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICBjb25zdCBhdmFpbGFibGVDb2x1bW5zID0gQ29sdW1uU2V0dGluZ3NVdGlscy5nZXRBdmFpbGFibGVDb2x1bW5zKHByb3BzLmNvbHVtbnMpO1xuICAgIGNvbnN0IHNlbGVjdGVkQ29sdW1ucyA9IENvbHVtblNldHRpbmdzVXRpbHNcbiAgICAgIC5nZXRTZWxlY3RlZENvbHVtbnMocHJvcHMuY29sdW1ucywgcHJvcHMudmlzaWJsZUNvbHVtbnMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBhdmFpbGFibGVDb2x1bW5zLFxuICAgICAgc2VsZWN0ZWRDb2x1bW5zLFxuICAgICAgYWxsU2VsZWN0ZWQ6IGF2YWlsYWJsZUNvbHVtbnMubGVuZ3RoID09PSBzZWxlY3RlZENvbHVtbnMubGVuZ3RoLFxuICAgIH07XG4gIH1cblxuICBoYW5kbGVDYW5jZWxDbGljayA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLmNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbCh0aGlzLnByb3BzLmdyaWQpO1xuICB9XG5cbiAgaGFuZGxlT2tDbGljayA9ICgpID0+IHtcbiAgICBjb25zdCBoaWRkZW5Db2x1bW5zID0gQ29sdW1uU2V0dGluZ3NVdGlsc1xuICAgICAgLmdldEhpZGRlbkNvbHVtbnModGhpcy5zdGF0ZS5hdmFpbGFibGVDb2x1bW5zLCB0aGlzLnN0YXRlLnNlbGVjdGVkQ29sdW1ucyk7XG4gICAgY29uc3QgY29sdW1uT3JkZXJzID0gQ29sdW1uU2V0dGluZ3NVdGlscy5nZXRDb2x1bW5PcmRlcnModGhpcy5zdGF0ZS5zZWxlY3RlZENvbHVtbnMpO1xuICAgIHRoaXMucHJvcHMuc2F2ZUNvbHVtblNldHRpbmdzKHRoaXMucHJvcHMuZ3JpZCwgaGlkZGVuQ29sdW1ucywgY29sdW1uT3JkZXJzKTtcbiAgICB0aGlzLnByb3BzLmNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbCh0aGlzLnByb3BzLmdyaWQpO1xuICB9XG5cbiAgaGFuZGxlU2VsZWN0aW9uQ2hhbmdlID0gKGRhdGEpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgYWxsU2VsZWN0ZWQ6IGRhdGEuYWxsU2VsZWN0ZWQsIHNlbGVjdGVkQ29sdW1uczogZGF0YS5zZWxlY3RlZERhdGEudG9KUygpIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8TW9kYWxcbiAgICAgICAgYnNTaXplPVwibGFyZ2VcIlxuICAgICAgICBkaWFsb2dDbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1jb2x1bW4tc2V0dGluZ3MtbW9kYWxcIlxuICAgICAgICBhcmlhLWxhYmVsbGVkYnk9XCJvYy1kYXRhZ3JpZC1jb2x1bW4tc2V0dGluZ3MtbW9kYWxcIlxuICAgICAgICBzaG93XG4gICAgICAgIG9uSGlkZT17dGhpcy5oYW5kbGVDYW5jZWxDbGlja31cbiAgICAgID5cbiAgICAgICAgPE1vZGFsLkhlYWRlcj5cbiAgICAgICAgICA8TW9kYWwuVGl0bGU+PE0gaWQ9XCJHcmlkLkNvbHVtblNldHRpbmdzLkhlYWRlclwiIC8+PC9Nb2RhbC5UaXRsZT5cbiAgICAgICAgPC9Nb2RhbC5IZWFkZXI+XG4gICAgICAgIDxNb2RhbC5Cb2R5PlxuICAgICAgICAgIDxTZWxlY3RPcmRlckxpc3RcbiAgICAgICAgICAgIGFsbFNlbGVjdGVkPXt0aGlzLnN0YXRlLmFsbFNlbGVjdGVkfVxuICAgICAgICAgICAgYXZhaWxhYmxlRGF0YT17TGlzdCh0aGlzLnN0YXRlLmF2YWlsYWJsZUNvbHVtbnMpfVxuICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkQ29sdW1uU2V0dGluZ3MtJHt0aGlzLnByb3BzLmdyaWQuaWR9YH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVNlbGVjdGlvbkNoYW5nZX1cbiAgICAgICAgICAgIHNlbGVjdGVkRGF0YT17TGlzdCh0aGlzLnN0YXRlLnNlbGVjdGVkQ29sdW1ucyl9XG4gICAgICAgICAgICB0cmFuc2xhdGlvbnM9e3tcbiAgICAgICAgICAgICAgYWxsTGFiZWw6IDxNIGlkPVwiR3JpZC5Db2x1bW5TZXR0aW5ncy5BbGxcIiAvPixcbiAgICAgICAgICAgICAgYXZhaWxhYmxlTGlzdExhYmVsOiA8TSBpZD1cIkdyaWQuQ29sdW1uU2V0dGluZ3MuQXZhaWxhYmxlQ29sdW1uc1wiIC8+LFxuICAgICAgICAgICAgICBzZWxlY3RlZExpc3RMYWJlbDogPE0gaWQ9XCJHcmlkLkNvbHVtblNldHRpbmdzLlNlbGVjdGVkQ29sdW1uc1wiIC8+LFxuICAgICAgICAgICAgICBzZWFyY2hUb29sdGlwOiA8TSBpZD1cIkdyaWQuQ29sdW1uU2V0dGluZ3MuU2VhcmNoVG9vbHRpcFwiIC8+LFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L01vZGFsLkJvZHk+XG4gICAgICAgIDxNb2RhbC5Gb290ZXI+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkQ29sdW1uU2V0dGluZ3MtJHt0aGlzLnByb3BzLmdyaWQuaWR9LW9rLWJ1dHRvbmB9XG4gICAgICAgICAgICBic1N0eWxlPVwicHJpbWFyeVwiXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZU9rQ2xpY2t9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPE0gaWQ9XCJHcmlkLk9rXCIgLz5cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRDb2x1bW5TZXR0aW5ncy0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tY2FuY2VsLWJ1dHRvbmB9XG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNhbmNlbENsaWNrfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxNIGlkPVwiR3JpZC5DYW5jZWxcIiAvPlxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8L01vZGFsLkZvb3Rlcj5cbiAgICAgIDwvTW9kYWw+XG4gICAgKTtcbiAgfVxufVxuIl19