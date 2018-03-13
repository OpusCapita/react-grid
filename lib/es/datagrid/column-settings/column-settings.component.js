function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Modal, Button } from 'react-bootstrap';
import { FormattedMessage as M } from 'react-intl';
import SelectOrderList from '@opuscapita/react-select-order-list';

import { gridShape } from '../datagrid.props';
import ColumnSettingsUtils from './column-settings.utils';

var ColumnSettings = function (_React$PureComponent) {
  _inherits(ColumnSettings, _React$PureComponent);

  function ColumnSettings(props) {
    _classCallCheck(this, ColumnSettings);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _this.handleCancelClick = function () {
      _this.props.closeColumnSettingsModal(_this.props.grid);
    };

    _this.handleOkClick = function () {
      var hiddenColumns = ColumnSettingsUtils.getHiddenColumns(_this.state.availableColumns, _this.state.selectedColumns);
      var columnOrders = ColumnSettingsUtils.getColumnOrders(_this.state.selectedColumns);
      _this.props.saveColumnSettings(_this.props.grid, hiddenColumns, columnOrders);
      _this.props.closeColumnSettingsModal(_this.props.grid);
    };

    _this.handleSelectionChange = function (data) {
      _this.setState({ allSelected: data.allSelected, selectedColumns: data.selectedData.toJS() });
    };

    var availableColumns = ColumnSettingsUtils.getAvailableColumns(props.columns);
    var selectedColumns = ColumnSettingsUtils.getSelectedColumns(props.columns, props.visibleColumns);
    _this.state = {
      availableColumns: availableColumns,
      selectedColumns: selectedColumns,
      allSelected: availableColumns.length === selectedColumns.length
    };
    return _this;
  }

  ColumnSettings.prototype.render = function render() {
    return React.createElement(
      Modal,
      {
        bsSize: 'large',
        dialogClassName: 'oc-datagrid-column-settings-modal',
        'aria-labelledby': 'oc-datagrid-column-settings-modal',
        show: true,
        onHide: this.handleCancelClick
      },
      React.createElement(
        Modal.Header,
        null,
        React.createElement(
          Modal.Title,
          null,
          React.createElement(M, { id: 'GridSelectColumns' })
        )
      ),
      React.createElement(
        Modal.Body,
        null,
        React.createElement(SelectOrderList, {
          allLabel: React.createElement(M, { id: 'GridSelectedAllColumns' }),
          allSelected: this.state.allSelected,
          availableData: List(this.state.availableColumns),
          availableListLabel: React.createElement(M, { id: 'GridAvailableColumns' }),
          id: 'ocDatagridColumnSettings-' + this.props.grid.id,
          onChange: this.handleSelectionChange,
          selectedData: List(this.state.selectedColumns),
          selectedListLabel: React.createElement(M, { id: 'GridSelectedColumns' })
        })
      ),
      React.createElement(
        Modal.Footer,
        null,
        React.createElement(
          Button,
          {
            id: 'ocDatagridColumnSettings-' + this.props.grid.id + '-ok-button',
            bsStyle: 'primary',
            onClick: this.handleOkClick
          },
          React.createElement(M, { id: 'Ok' })
        ),
        React.createElement(
          Button,
          {
            id: 'ocDatagridColumnSettings-' + this.props.grid.id + '-cancel-button',
            onClick: this.handleCancelClick
          },
          React.createElement(M, { id: 'Cancel' })
        )
      )
    );
  };

  return ColumnSettings;
}(React.PureComponent);

export { ColumnSettings as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2V0dGluZ3MvY29sdW1uLXNldHRpbmdzLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJMaXN0IiwiSW1tdXRhYmxlUHJvcFR5cGVzIiwiTW9kYWwiLCJCdXR0b24iLCJGb3JtYXR0ZWRNZXNzYWdlIiwiTSIsIlNlbGVjdE9yZGVyTGlzdCIsImdyaWRTaGFwZSIsIkNvbHVtblNldHRpbmdzVXRpbHMiLCJDb2x1bW5TZXR0aW5ncyIsInByb3BzIiwiaGFuZGxlQ2FuY2VsQ2xpY2siLCJjbG9zZUNvbHVtblNldHRpbmdzTW9kYWwiLCJncmlkIiwiaGFuZGxlT2tDbGljayIsImhpZGRlbkNvbHVtbnMiLCJnZXRIaWRkZW5Db2x1bW5zIiwic3RhdGUiLCJhdmFpbGFibGVDb2x1bW5zIiwic2VsZWN0ZWRDb2x1bW5zIiwiY29sdW1uT3JkZXJzIiwiZ2V0Q29sdW1uT3JkZXJzIiwic2F2ZUNvbHVtblNldHRpbmdzIiwiaGFuZGxlU2VsZWN0aW9uQ2hhbmdlIiwiZGF0YSIsInNldFN0YXRlIiwiYWxsU2VsZWN0ZWQiLCJzZWxlY3RlZERhdGEiLCJ0b0pTIiwiZ2V0QXZhaWxhYmxlQ29sdW1ucyIsImNvbHVtbnMiLCJnZXRTZWxlY3RlZENvbHVtbnMiLCJ2aXNpYmxlQ29sdW1ucyIsImxlbmd0aCIsInJlbmRlciIsImlkIiwiUHVyZUNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxTQUFTQyxJQUFULFFBQXFCLFdBQXJCO0FBQ0EsT0FBT0Msa0JBQVAsTUFBK0IsMkJBQS9CO0FBQ0EsU0FBU0MsS0FBVCxFQUFnQkMsTUFBaEIsUUFBOEIsaUJBQTlCO0FBQ0EsU0FBU0Msb0JBQW9CQyxDQUE3QixRQUFzQyxZQUF0QztBQUNBLE9BQU9DLGVBQVAsTUFBNEIscUNB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QURGO0FBUUU7QUFBQyxnQkFBRDtBQUFBO0FBQ0UsOENBQWdDLEtBQUtKLEtBQUwsQ0FBV0csSUFBWCxDQUFnQnNCLEVBQWhELG1CQURGO0FBRUUscUJBQVMsS0FBS3hCO0FBRmhCO0FBSUUsOEJBQUMsQ0FBRCxJQUFHLElBQUcsUUFBTjtBQUpGO0FBUkY7QUF0QkYsS0FERjtBQXdDRCxHOzs7RUE5RXlDYixNQUFNc0MsYTs7U0FBN0IzQixjIiwiZmlsZSI6ImNvbHVtbi1zZXR0aW5ncy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IExpc3QgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IEltbXV0YWJsZVByb3BUeXBlcyBmcm9tICdyZWFjdC1pbW11dGFibGUtcHJvcHR5cGVzJztcbmltcG9ydCB7IE1vZGFsLCBCdXR0b24gfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IHsgRm9ybWF0dGVkTWVzc2FnZSBhcyBNIH0gZnJvbSAncmVhY3QtaW50bCc7XG5pbXBvcnQgU2VsZWN0T3JkZXJMaXN0IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXNlbGVjdC1vcmRlci1saXN0JztcblxuaW1wb3J0IHsgZ3JpZFNoYXBlIH0gZnJvbSAnLi4vZGF0YWdyaWQucHJvcHMnO1xuaW1wb3J0IENvbHVtblNldHRpbmdzVXRpbHMgZnJvbSAnLi9jb2x1bW4tc2V0dGluZ3MudXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2x1bW5TZXR0aW5ncyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGdyaWQ6IGdyaWRTaGFwZS5pc1JlcXVpcmVkLFxuICAgIGNvbHVtbnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSgpKS5pc1JlcXVpcmVkLFxuICAgIHZpc2libGVDb2x1bW5zOiBJbW11dGFibGVQcm9wVHlwZXMubGlzdC5pc1JlcXVpcmVkLFxuICAgIGNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBzYXZlQ29sdW1uU2V0dGluZ3M6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgY29uc3QgYXZhaWxhYmxlQ29sdW1ucyA9IENvbHVtblNldHRpbmdzVXRpbHMuZ2V0QXZhaWxhYmxlQ29sdW1ucyhwcm9wcy5jb2x1bW5zKTtcbiAgICBjb25zdCBzZWxlY3RlZENvbHVtbnMgPSBDb2x1bW5TZXR0aW5nc1V0aWxzXG4gICAgICAuZ2V0U2VsZWN0ZWRDb2x1bW5zKHByb3BzLmNvbHVtbnMsIHByb3BzLnZpc2libGVDb2x1bW5zKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgYXZhaWxhYmxlQ29sdW1ucyxcbiAgICAgIHNlbGVjdGVkQ29sdW1ucyxcbiAgICAgIGFsbFNlbGVjdGVkOiBhdmFpbGFibGVDb2x1bW5zLmxlbmd0aCA9PT0gc2VsZWN0ZWRDb2x1bW5zLmxlbmd0aCxcbiAgICB9O1xuICB9XG5cbiAgaGFuZGxlQ2FuY2VsQ2xpY2sgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5jbG9zZUNvbHVtblNldHRpbmdzTW9kYWwodGhpcy5wcm9wcy5ncmlkKTtcbiAgfVxuXG4gIGhhbmRsZU9rQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgaGlkZGVuQ29sdW1ucyA9IENvbHVtblNldHRpbmdzVXRpbHNcbiAgICAgIC5nZXRIaWRkZW5Db2x1bW5zKHRoaXMuc3RhdGUuYXZhaWxhYmxlQ29sdW1ucywgdGhpcy5zdGF0ZS5zZWxlY3RlZENvbHVtbnMpO1xuICAgIGNvbnN0IGNvbHVtbk9yZGVycyA9IENvbHVtblNldHRpbmdzVXRpbHMuZ2V0Q29sdW1uT3JkZXJzKHRoaXMuc3RhdGUuc2VsZWN0ZWRDb2x1bW5zKTtcbiAgICB0aGlzLnByb3BzLnNhdmVDb2x1bW5TZXR0aW5ncyh0aGlzLnByb3BzLmdyaWQsIGhpZGRlbkNvbHVtbnMsIGNvbHVtbk9yZGVycyk7XG4gICAgdGhpcy5wcm9wcy5jbG9zZUNvbHVtblNldHRpbmdzTW9kYWwodGhpcy5wcm9wcy5ncmlkKTtcbiAgfVxuXG4gIGhhbmRsZVNlbGVjdGlvbkNoYW5nZSA9IChkYXRhKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGFsbFNlbGVjdGVkOiBkYXRhLmFsbFNlbGVjdGVkLCBzZWxlY3RlZENvbHVtbnM6IGRhdGEuc2VsZWN0ZWREYXRhLnRvSlMoKSB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPE1vZGFsXG4gICAgICAgIGJzU2l6ZT1cImxhcmdlXCJcbiAgICAgICAgZGlhbG9nQ2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtY29sdW1uLXNldHRpbmdzLW1vZGFsXCJcbiAgICAgICAgYXJpYS1sYWJlbGxlZGJ5PVwib2MtZGF0YWdyaWQtY29sdW1uLXNldHRpbmdzLW1vZGFsXCJcbiAgICAgICAgc2hvd1xuICAgICAgICBvbkhpZGU9e3RoaXMuaGFuZGxlQ2FuY2VsQ2xpY2t9XG4gICAgICA+XG4gICAgICAgIDxNb2RhbC5IZWFkZXI+XG4gICAgICAgICAgPE1vZGFsLlRpdGxlPjxNIGlkPVwiR3JpZFNlbGVjdENvbHVtbnNcIiAvPjwvTW9kYWwuVGl0bGU+XG4gICAgICAgIDwvTW9kYWwuSGVhZGVyPlxuICAgICAgICA8TW9kYWwuQm9keT5cbiAgICAgICAgICA8U2VsZWN0T3JkZXJMaXN0XG4gICAgICAgICAgICBhbGxMYWJlbD17PE0gaWQ9XCJHcmlkU2VsZWN0ZWRBbGxDb2x1bW5zXCIgLz59XG4gICAgICAgICAgICBhbGxTZWxlY3RlZD17dGhpcy5zdGF0ZS5hbGxTZWxlY3RlZH1cbiAgICAgICAgICAgIGF2YWlsYWJsZURhdGE9e0xpc3QodGhpcy5zdGF0ZS5hdmFpbGFibGVDb2x1bW5zKX1cbiAgICAgICAgICAgIGF2YWlsYWJsZUxpc3RMYWJlbD17PE0gaWQ9XCJHcmlkQXZhaWxhYmxlQ29sdW1uc1wiIC8+fVxuICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkQ29sdW1uU2V0dGluZ3MtJHt0aGlzLnByb3BzLmdyaWQuaWR9YH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVNlbGVjdGlvbkNoYW5nZX1cbiAgICAgICAgICAgIHNlbGVjdGVkRGF0YT17TGlzdCh0aGlzLnN0YXRlLnNlbGVjdGVkQ29sdW1ucyl9XG4gICAgICAgICAgICBzZWxlY3RlZExpc3RMYWJlbD17PE0gaWQ9XCJHcmlkU2VsZWN0ZWRDb2x1bW5zXCIgLz59XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Nb2RhbC5Cb2R5PlxuICAgICAgICA8TW9kYWwuRm9vdGVyPlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZENvbHVtblNldHRpbmdzLSR7dGhpcy5wcm9wcy5ncmlkLmlkfS1vay1idXR0b25gfVxuICAgICAgICAgICAgYnNTdHlsZT1cInByaW1hcnlcIlxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVPa0NsaWNrfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxNIGlkPVwiT2tcIiAvPlxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZENvbHVtblNldHRpbmdzLSR7dGhpcy5wcm9wcy5ncmlkLmlkfS1jYW5jZWwtYnV0dG9uYH1cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2FuY2VsQ2xpY2t9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPE0gaWQ9XCJDYW5jZWxcIiAvPlxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8L01vZGFsLkZvb3Rlcj5cbiAgICAgIDwvTW9kYWw+XG4gICAgKTtcbiAgfVxufVxuIl19