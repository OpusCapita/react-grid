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
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'GridSelectColumns' })
        )
      ),
      _react2.default.createElement(
        _reactBootstrap.Modal.Body,
        null,
        _react2.default.createElement(_reactSelectOrderList2.default, {
          allLabel: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'GridSelectedAllColumns' }),
          allSelected: this.state.allSelected,
          availableData: (0, _immutable.List)(this.state.availableColumns),
          availableListLabel: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'GridAvailableColumns' }),
          id: 'ocDatagridColumnSettings-' + this.props.grid.id,
          onChange: this.handleSelectionChange,
          selectedData: (0, _immutable.List)(this.state.selectedColumns),
          selectedListLabel: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'GridSelectedColumns' })
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
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Ok' })
        ),
        _react2.default.createElement(
          _reactBootstrap.Button,
          {
            id: 'ocDatagridColumnSettings-' + this.props.grid.id + '-cancel-button',
            onClick: this.handleCancelClick
          },
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Cancel' })
        )
      )
    );
  };

  return ColumnSettings;
}(_react2.default.PureComponent);

exports.default = ColumnSettings;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2V0dGluZ3MvY29sdW1uLXNldHRpbmdzLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiQ29sdW1uU2V0dGluZ3MiLCJwcm9wcyIsImhhbmRsZUNhbmNlbENsaWNrIiwiY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsIiwiZ3JpZCIsImhhbmRsZU9rQ2xpY2siLCJoaWRkZW5Db2x1bW5zIiwiZ2V0SGlkZGVuQ29sdW1ucyIsInN0YXRlIiwiYXZhaWxhYmxlQ29sdW1ucyIsInNlbGVjdGVkQ29sdW1ucyIsImNvbHVtbk9yZGVycyIsImdldENvbHVtbk9yZGVycyIsInNhdmVDb2x1bW5TZXR0aW5ncyIsImhhbmRsZVNlbGVjdGlvbkNoYW5nZSIsImRhdGEiLCJzZXRTdGF0ZSIsImFsbFNlbGVjdGVkIiwic2VsZWN0ZWREYXRhIiwidG9KUyIsImdldEF2YWlsYWJsZUNvbHVtbnMiLCJjb2x1bW5zIiwiZ2V0U2VsZWN0ZWRDb2x1bW5zIiwidmlzaWJsZUNvbHVtbnMiLCJsZW5ndGgiLCJyZW5kZXIiLCJpZCIsIlB1cmVDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxjOzs7QUFTbkIsMEJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpREFDakIsZ0NBQU1BLEtBQU4sQ0FEaUI7O0FBQUEsVUFZbkJDLGlCQVptQixHQVlDLFlBQU07QUFDeEIsWUFBS0QsS0FBTCxDQUFXRSx3QkFBWCxDQUFvQyxNQUFLRixLQUFMLENBQVdHLElBQS9DO0FBQ0QsS0Fka0I7O0FBQUEsVUFnQm5CQyxhQWhCbUIsR0FnQkgsWUFBTTtBQUNwQixVQUFNQyxnQkFBZ0IseUJBQ25CQyxnQkFEbUIsQ0FDRixNQUFLQyxLQUFMLENBQVdDLGdCQURULEVBQzJCLE1BQUtELEtBQUwsQ0FBV0UsZUFEdEMsQ0FBdEI7QUFFQSxVQUFNQyxlQUFlLHlCQUFvQkMsZUFBcEIsQ0FBb0MsTUFBS0osS0FBTCxDQUFXRSxlQUEvQyxDQUFyQjtBQUNBLFlBQUtULEtBQUwsQ0FBV1ksa0JBQVgsQ0FBOEIsTUFBS1osS0FBTCxDQUFXRyxJQUF6QyxFQUErQ0UsYUFBL0MsRUFBOERLLFlBQTlEO0FBQ0EsWUFBS1YsS0FBTCxDQUFXRSx3QkFBWCxDQUFvQyxNQUFLRixLQUFMLENBQVdHLElBQS9DO0FBQ0QsS0F0QmtCOztBQUFBLFVBd0JuQlUscUJBeEJtQixHQXdCSyxVQUFDQyxJQUFELEVBQVU7QUFDaEMsWUFBS0MsUUFBTCxDQUFjLEVBQUVDLGFBQWFGLEtBQUtFLFdBQXBCLEVBQWlDUCxpQkFBaUJLLEtBQUtHLFlBQUwsQ0FBa0JDLElBQWxCLEVBQWxELEVBQWQ7QUFDRCxLQTFCa0I7O0FBRWpCLFFBQU1WLG1CQUFtQix5QkFBb0JXLG1CQUFwQixDQUF3Q25CLE1BQU1vQixPQUE5QyxDQUF6QjtBQUNBLFFBQU1YLGtCQUFrQix5QkFDckJZLGtCQURxQixDQUNGckIsTUFBTW9CLE9BREosRUFDYXBCLE1BQU1zQixjQURuQixDQUF4QjtBQUVBLFVBQUtmLEtBQUwsR0FBYTtBQUNYQyx3Q0FEVztBQUVYQyxzQ0FGVztBQUdYTyxtQkFBYVIsaUJBQWlCZSxNQUFqQixLQUE0QmQsZ0JBQWdCYztBQUg5QyxLQUFiO0FBTGlCO0FBVWxCOzsyQkFrQkRDLE0scUJBQVM7QUFDUCxXQUNFO0FBQUE7QUFBQTtBQUNFLGdCQUFPLE9BRFQ7QUFFRSx5QkFBZ0IsbUNBRmxCO0FBR0UsMkJBQWdCLG1DQUhsQjtBQUlFLGtCQUpGO0FBS0UsZ0JBQVEsS0FBS3ZCO0FBTGY7QUFPRTtBQUFBLDhCQUFPLE1BQVA7QUFBQTtBQUNFO0FBQUEsZ0NBQU8sS0FBUDtBQUFBO0FBQWEsdUVBQUcsSUFBRyxtQkFBTjtBQUFiO0FBREYsT0FQRjtBQVVFO0FBQUEsOEJBQU8sSUFBUDtBQUFBO0FBQ0U7QUFDRSxvQkFBVSw2REFBRyxJQUFHLHdCQUFOLEdBRFo7QUFFRSx1QkFBYSxLQUFLTSxLQUFMLENBQVdTLFdBRjFCO0FBR0UseUJBQWUscUJBQUssS0FBS1QsS0FBTCxDQUFXQyxnQkFBaEIsQ0FIakI7QUFJRSw4QkFBb0IsNkRBQUcsSUFBRyxzQkFBTixHQUp0QjtBQUtFLDRDQUFnQyxLQUFLUixLQUFMLENBQVdHLElBQVgsQ0FBZ0JzQixFQUxsRDtBQU1FLG9CQUFVLEtBQUtaLHFCQU5qQjtBQU9FLHdCQUFjLHFCQUFLLEtBQUtOLEtBQUwsQ0FBV0UsZUFBaEIsQ0FQaEI7QUFRRSw2QkFBbUIsNkRBQUcsSUFBRyxxQkFBTjtBQVJyQjtBQURGLE9BVkY7QUFzQkU7QUFBQSw4QkFBTyxNQUFQO0FBQUE7QUFDRTtBQUFBO0FBQUE7QUFDRSw4Q0FBZ0MsS0FBS1QsS0FBTCxDQUFXRyxJQUFYLENBQWdCc0IsRUFBaEQsZUFERjtBQUVFLHFCQUFRLFNBRlY7QUFHRSxxQkFBUyxLQUFLckI7QUFIaEI7QUFLRSx1RUFBRyxJQUFHLElBQU47QUFMRixTQURGO0FBUUU7QUFBQTtBQUFBO0FBQ0UsOENBQWdDLEtBQUtKLEtBQUwsQ0FBV0csSUFBWCxDQUFnQnNCLEVBQWhELG1CQURGO0FBRUUscUJBQVMsS0FBS3hCO0FBRmhCO0FBSUUsdUVBQUcsSUFBRyxRQUFOO0FBSkY7QUFSRjtBQXRCRixLQURGO0FBd0NELEc7OztFQTlFeUMsZ0JBQU15QixhOztrQkFBN0IzQixjIiwiZmlsZSI6ImNvbHVtbi1zZXR0aW5ncy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IExpc3QgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IEltbXV0YWJsZVByb3BUeXBlcyBmcm9tICdyZWFjdC1pbW11dGFibGUtcHJvcHR5cGVzJztcbmltcG9ydCB7IE1vZGFsLCBCdXR0b24gfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IHsgRm9ybWF0dGVkTWVzc2FnZSBhcyBNIH0gZnJvbSAncmVhY3QtaW50bCc7XG5pbXBvcnQgU2VsZWN0T3JkZXJMaXN0IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXNlbGVjdC1vcmRlci1saXN0JztcblxuaW1wb3J0IHsgZ3JpZFNoYXBlIH0gZnJvbSAnLi4vZGF0YWdyaWQucHJvcHMnO1xuaW1wb3J0IENvbHVtblNldHRpbmdzVXRpbHMgZnJvbSAnLi9jb2x1bW4tc2V0dGluZ3MudXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2x1bW5TZXR0aW5ncyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGdyaWQ6IGdyaWRTaGFwZS5pc1JlcXVpcmVkLFxuICAgIGNvbHVtbnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSgpKS5pc1JlcXVpcmVkLFxuICAgIHZpc2libGVDb2x1bW5zOiBJbW11dGFibGVQcm9wVHlwZXMubGlzdC5pc1JlcXVpcmVkLFxuICAgIGNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBzYXZlQ29sdW1uU2V0dGluZ3M6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgY29uc3QgYXZhaWxhYmxlQ29sdW1ucyA9IENvbHVtblNldHRpbmdzVXRpbHMuZ2V0QXZhaWxhYmxlQ29sdW1ucyhwcm9wcy5jb2x1bW5zKTtcbiAgICBjb25zdCBzZWxlY3RlZENvbHVtbnMgPSBDb2x1bW5TZXR0aW5nc1V0aWxzXG4gICAgICAuZ2V0U2VsZWN0ZWRDb2x1bW5zKHByb3BzLmNvbHVtbnMsIHByb3BzLnZpc2libGVDb2x1bW5zKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgYXZhaWxhYmxlQ29sdW1ucyxcbiAgICAgIHNlbGVjdGVkQ29sdW1ucyxcbiAgICAgIGFsbFNlbGVjdGVkOiBhdmFpbGFibGVDb2x1bW5zLmxlbmd0aCA9PT0gc2VsZWN0ZWRDb2x1bW5zLmxlbmd0aCxcbiAgICB9O1xuICB9XG5cbiAgaGFuZGxlQ2FuY2VsQ2xpY2sgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5jbG9zZUNvbHVtblNldHRpbmdzTW9kYWwodGhpcy5wcm9wcy5ncmlkKTtcbiAgfVxuXG4gIGhhbmRsZU9rQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgaGlkZGVuQ29sdW1ucyA9IENvbHVtblNldHRpbmdzVXRpbHNcbiAgICAgIC5nZXRIaWRkZW5Db2x1bW5zKHRoaXMuc3RhdGUuYXZhaWxhYmxlQ29sdW1ucywgdGhpcy5zdGF0ZS5zZWxlY3RlZENvbHVtbnMpO1xuICAgIGNvbnN0IGNvbHVtbk9yZGVycyA9IENvbHVtblNldHRpbmdzVXRpbHMuZ2V0Q29sdW1uT3JkZXJzKHRoaXMuc3RhdGUuc2VsZWN0ZWRDb2x1bW5zKTtcbiAgICB0aGlzLnByb3BzLnNhdmVDb2x1bW5TZXR0aW5ncyh0aGlzLnByb3BzLmdyaWQsIGhpZGRlbkNvbHVtbnMsIGNvbHVtbk9yZGVycyk7XG4gICAgdGhpcy5wcm9wcy5jbG9zZUNvbHVtblNldHRpbmdzTW9kYWwodGhpcy5wcm9wcy5ncmlkKTtcbiAgfVxuXG4gIGhhbmRsZVNlbGVjdGlvbkNoYW5nZSA9IChkYXRhKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGFsbFNlbGVjdGVkOiBkYXRhLmFsbFNlbGVjdGVkLCBzZWxlY3RlZENvbHVtbnM6IGRhdGEuc2VsZWN0ZWREYXRhLnRvSlMoKSB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPE1vZGFsXG4gICAgICAgIGJzU2l6ZT1cImxhcmdlXCJcbiAgICAgICAgZGlhbG9nQ2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtY29sdW1uLXNldHRpbmdzLW1vZGFsXCJcbiAgICAgICAgYXJpYS1sYWJlbGxlZGJ5PVwib2MtZGF0YWdyaWQtY29sdW1uLXNldHRpbmdzLW1vZGFsXCJcbiAgICAgICAgc2hvd1xuICAgICAgICBvbkhpZGU9e3RoaXMuaGFuZGxlQ2FuY2VsQ2xpY2t9XG4gICAgICA+XG4gICAgICAgIDxNb2RhbC5IZWFkZXI+XG4gICAgICAgICAgPE1vZGFsLlRpdGxlPjxNIGlkPVwiR3JpZFNlbGVjdENvbHVtbnNcIiAvPjwvTW9kYWwuVGl0bGU+XG4gICAgICAgIDwvTW9kYWwuSGVhZGVyPlxuICAgICAgICA8TW9kYWwuQm9keT5cbiAgICAgICAgICA8U2VsZWN0T3JkZXJMaXN0XG4gICAgICAgICAgICBhbGxMYWJlbD17PE0gaWQ9XCJHcmlkU2VsZWN0ZWRBbGxDb2x1bW5zXCIgLz59XG4gICAgICAgICAgICBhbGxTZWxlY3RlZD17dGhpcy5zdGF0ZS5hbGxTZWxlY3RlZH1cbiAgICAgICAgICAgIGF2YWlsYWJsZURhdGE9e0xpc3QodGhpcy5zdGF0ZS5hdmFpbGFibGVDb2x1bW5zKX1cbiAgICAgICAgICAgIGF2YWlsYWJsZUxpc3RMYWJlbD17PE0gaWQ9XCJHcmlkQXZhaWxhYmxlQ29sdW1uc1wiIC8+fVxuICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkQ29sdW1uU2V0dGluZ3MtJHt0aGlzLnByb3BzLmdyaWQuaWR9YH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVNlbGVjdGlvbkNoYW5nZX1cbiAgICAgICAgICAgIHNlbGVjdGVkRGF0YT17TGlzdCh0aGlzLnN0YXRlLnNlbGVjdGVkQ29sdW1ucyl9XG4gICAgICAgICAgICBzZWxlY3RlZExpc3RMYWJlbD17PE0gaWQ9XCJHcmlkU2VsZWN0ZWRDb2x1bW5zXCIgLz59XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Nb2RhbC5Cb2R5PlxuICAgICAgICA8TW9kYWwuRm9vdGVyPlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZENvbHVtblNldHRpbmdzLSR7dGhpcy5wcm9wcy5ncmlkLmlkfS1vay1idXR0b25gfVxuICAgICAgICAgICAgYnNTdHlsZT1cInByaW1hcnlcIlxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVPa0NsaWNrfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxNIGlkPVwiT2tcIiAvPlxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZENvbHVtblNldHRpbmdzLSR7dGhpcy5wcm9wcy5ncmlkLmlkfS1jYW5jZWwtYnV0dG9uYH1cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2FuY2VsQ2xpY2t9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPE0gaWQ9XCJDYW5jZWxcIiAvPlxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8L01vZGFsLkZvb3Rlcj5cbiAgICAgIDwvTW9kYWw+XG4gICAgKTtcbiAgfVxufVxuIl19