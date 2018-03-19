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
          React.createElement(M, { id: 'Grid.ColumnSettings.Header' })
        )
      ),
      React.createElement(
        Modal.Body,
        null,
        React.createElement(SelectOrderList, {
          allSelected: this.state.allSelected,
          availableData: List(this.state.availableColumns),
          id: 'ocDatagridColumnSettings-' + this.props.grid.id,
          onChange: this.handleSelectionChange,
          selectedData: List(this.state.selectedColumns),
          translations: {
            allLabel: React.createElement(M, { id: 'Grid.ColumnSettings.All' }),
            availableListLabel: React.createElement(M, { id: 'Grid.ColumnSettings.AvailableColumns' }),
            selectedListLabel: React.createElement(M, { id: 'Grid.ColumnSettings.SelectedColumns' })
          }
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
          React.createElement(M, { id: 'Grid.Ok' })
        ),
        React.createElement(
          Button,
          {
            id: 'ocDatagridColumnSettings-' + this.props.grid.id + '-cancel-button',
            onClick: this.handleCancelClick
          },
          React.createElement(M, { id: 'Grid.Cancel' })
        )
      )
    );
  };

  return ColumnSettings;
}(React.PureComponent);

export { ColumnSettings as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2V0dGluZ3MvY29sdW1uLXNldHRpbmdzLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJMaXN0IiwiSW1tdXRhYmxlUHJvcFR5cGVzIiwiTW9kYWwiLCJCdXR0b24iLCJGb3JtYXR0ZWRNZXNzYWdlIiwiTSIsIlNlbGVjdE9yZGVyTGlzdCIsImdyaWRTaGFwZSIsIkNvbHVtblNldHRpbmdzVXRpbHMiLCJDb2x1bW5TZXR0aW5ncyIsInByb3BzIiwiaGFuZGxlQ2FuY2VsQ2xpY2siLCJjbG9zZUNvbHVtblNldHRpbmdzTW9kYWwiLCJncmlkIiwiaGFuZGxlT2tDbGljayIsImhpZGRlbkNvbHVtbnMiLCJnZXRIaWRkZW5Db2x1bW5zIiwic3RhdGUiLCJhdmFpbGFibGVDb2x1bW5zIiwic2VsZWN0ZWRDb2x1bW5zIiwiY29sdW1uT3JkZXJzIiwiZ2V0Q29sdW1uT3JkZXJzIiwic2F2ZUNvbHVtblNldHRpbmdzIiwiaGFuZGxlU2VsZWN0aW9uQ2hhbmdlIiwiZGF0YSIsInNldFN0YXRlIiwiYWxsU2VsZWN0ZWQiLCJzZWxlY3RlZERhdGEiLCJ0b0pTIiwiZ2V0QXZhaWxhYmxlQ29sdW1ucyIsImNvbHVtbnMiLCJnZXRTZWxlY3RlZENvbHVtbnMiLCJ2aXNpYmxlQ29sdW1ucyIsImxlbmd0aCIsInJlbmRlciIsImlkIiwiYWxsTGFiZWwiLCJhdmFpbGFibGVMaXN0TGFiZWwiLCJzZWxlY3RlZExpc3RMYWJlbCIsIlB1cmVDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsU0FBU0MsSUFBVCxRQUFxQixXQUFyQjtBQUNBLE9BQU9DLGtCQUFQLE1BQStCLDJCQUEvQjtBQUNBLFNBQVNDLEtBQVQsRUFBZ0JDLE1BQWhCLFFBQThCLGlCQUE5QjtBQUNBLFNBQVND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cUJBQVEsU0FGVjtBQUdFLHFCQUFTLEtBQUtyQjtBQUhoQjtBQUtFLDhCQUFDLENBQUQsSUFBRyxJQUFHLFNBQU47QUFMRixTQURGO0FBUUU7QUFBQyxnQkFBRDtBQUFBO0FBQ0UsOENBQWdDLEtBQUtKLEtBQUwsQ0FBV0csSUFBWCxDQUFnQnNCLEVBQWhELG1CQURGO0FBRUUscUJBQVMsS0FBS3hCO0FBRmhCO0FBSUUsOEJBQUMsQ0FBRCxJQUFHLElBQUcsYUFBTjtBQUpGO0FBUkY7QUF4QkYsS0FERjtBQTBDRCxHOzs7RUFoRnlDYixNQUFNeUMsYTs7U0FBN0I5QixjIiwiZmlsZSI6ImNvbHVtbi1zZXR0aW5ncy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IExpc3QgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IEltbXV0YWJsZVByb3BUeXBlcyBmcm9tICdyZWFjdC1pbW11dGFibGUtcHJvcHR5cGVzJztcbmltcG9ydCB7IE1vZGFsLCBCdXR0b24gfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IHsgRm9ybWF0dGVkTWVzc2FnZSBhcyBNIH0gZnJvbSAncmVhY3QtaW50bCc7XG5pbXBvcnQgU2VsZWN0T3JkZXJMaXN0IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXNlbGVjdC1vcmRlci1saXN0JztcblxuaW1wb3J0IHsgZ3JpZFNoYXBlIH0gZnJvbSAnLi4vZGF0YWdyaWQucHJvcHMnO1xuaW1wb3J0IENvbHVtblNldHRpbmdzVXRpbHMgZnJvbSAnLi9jb2x1bW4tc2V0dGluZ3MudXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2x1bW5TZXR0aW5ncyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGdyaWQ6IGdyaWRTaGFwZS5pc1JlcXVpcmVkLFxuICAgIGNvbHVtbnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSgpKS5pc1JlcXVpcmVkLFxuICAgIHZpc2libGVDb2x1bW5zOiBJbW11dGFibGVQcm9wVHlwZXMubGlzdC5pc1JlcXVpcmVkLFxuICAgIGNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBzYXZlQ29sdW1uU2V0dGluZ3M6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgY29uc3QgYXZhaWxhYmxlQ29sdW1ucyA9IENvbHVtblNldHRpbmdzVXRpbHMuZ2V0QXZhaWxhYmxlQ29sdW1ucyhwcm9wcy5jb2x1bW5zKTtcbiAgICBjb25zdCBzZWxlY3RlZENvbHVtbnMgPSBDb2x1bW5TZXR0aW5nc1V0aWxzXG4gICAgICAuZ2V0U2VsZWN0ZWRDb2x1bW5zKHByb3BzLmNvbHVtbnMsIHByb3BzLnZpc2libGVDb2x1bW5zKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgYXZhaWxhYmxlQ29sdW1ucyxcbiAgICAgIHNlbGVjdGVkQ29sdW1ucyxcbiAgICAgIGFsbFNlbGVjdGVkOiBhdmFpbGFibGVDb2x1bW5zLmxlbmd0aCA9PT0gc2VsZWN0ZWRDb2x1bW5zLmxlbmd0aCxcbiAgICB9O1xuICB9XG5cbiAgaGFuZGxlQ2FuY2VsQ2xpY2sgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5jbG9zZUNvbHVtblNldHRpbmdzTW9kYWwodGhpcy5wcm9wcy5ncmlkKTtcbiAgfVxuXG4gIGhhbmRsZU9rQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgaGlkZGVuQ29sdW1ucyA9IENvbHVtblNldHRpbmdzVXRpbHNcbiAgICAgIC5nZXRIaWRkZW5Db2x1bW5zKHRoaXMuc3RhdGUuYXZhaWxhYmxlQ29sdW1ucywgdGhpcy5zdGF0ZS5zZWxlY3RlZENvbHVtbnMpO1xuICAgIGNvbnN0IGNvbHVtbk9yZGVycyA9IENvbHVtblNldHRpbmdzVXRpbHMuZ2V0Q29sdW1uT3JkZXJzKHRoaXMuc3RhdGUuc2VsZWN0ZWRDb2x1bW5zKTtcbiAgICB0aGlzLnByb3BzLnNhdmVDb2x1bW5TZXR0aW5ncyh0aGlzLnByb3BzLmdyaWQsIGhpZGRlbkNvbHVtbnMsIGNvbHVtbk9yZGVycyk7XG4gICAgdGhpcy5wcm9wcy5jbG9zZUNvbHVtblNldHRpbmdzTW9kYWwodGhpcy5wcm9wcy5ncmlkKTtcbiAgfVxuXG4gIGhhbmRsZVNlbGVjdGlvbkNoYW5nZSA9IChkYXRhKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGFsbFNlbGVjdGVkOiBkYXRhLmFsbFNlbGVjdGVkLCBzZWxlY3RlZENvbHVtbnM6IGRhdGEuc2VsZWN0ZWREYXRhLnRvSlMoKSB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPE1vZGFsXG4gICAgICAgIGJzU2l6ZT1cImxhcmdlXCJcbiAgICAgICAgZGlhbG9nQ2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtY29sdW1uLXNldHRpbmdzLW1vZGFsXCJcbiAgICAgICAgYXJpYS1sYWJlbGxlZGJ5PVwib2MtZGF0YWdyaWQtY29sdW1uLXNldHRpbmdzLW1vZGFsXCJcbiAgICAgICAgc2hvd1xuICAgICAgICBvbkhpZGU9e3RoaXMuaGFuZGxlQ2FuY2VsQ2xpY2t9XG4gICAgICA+XG4gICAgICAgIDxNb2RhbC5IZWFkZXI+XG4gICAgICAgICAgPE1vZGFsLlRpdGxlPjxNIGlkPVwiR3JpZC5Db2x1bW5TZXR0aW5ncy5IZWFkZXJcIiAvPjwvTW9kYWwuVGl0bGU+XG4gICAgICAgIDwvTW9kYWwuSGVhZGVyPlxuICAgICAgICA8TW9kYWwuQm9keT5cbiAgICAgICAgICA8U2VsZWN0T3JkZXJMaXN0XG4gICAgICAgICAgICBhbGxTZWxlY3RlZD17dGhpcy5zdGF0ZS5hbGxTZWxlY3RlZH1cbiAgICAgICAgICAgIGF2YWlsYWJsZURhdGE9e0xpc3QodGhpcy5zdGF0ZS5hdmFpbGFibGVDb2x1bW5zKX1cbiAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZENvbHVtblNldHRpbmdzLSR7dGhpcy5wcm9wcy5ncmlkLmlkfWB9XG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVTZWxlY3Rpb25DaGFuZ2V9XG4gICAgICAgICAgICBzZWxlY3RlZERhdGE9e0xpc3QodGhpcy5zdGF0ZS5zZWxlY3RlZENvbHVtbnMpfVxuICAgICAgICAgICAgdHJhbnNsYXRpb25zPXt7XG4gICAgICAgICAgICAgIGFsbExhYmVsOiA8TSBpZD1cIkdyaWQuQ29sdW1uU2V0dGluZ3MuQWxsXCIgLz4sXG4gICAgICAgICAgICAgIGF2YWlsYWJsZUxpc3RMYWJlbDogPE0gaWQ9XCJHcmlkLkNvbHVtblNldHRpbmdzLkF2YWlsYWJsZUNvbHVtbnNcIiAvPixcbiAgICAgICAgICAgICAgc2VsZWN0ZWRMaXN0TGFiZWw6IDxNIGlkPVwiR3JpZC5Db2x1bW5TZXR0aW5ncy5TZWxlY3RlZENvbHVtbnNcIiAvPixcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Nb2RhbC5Cb2R5PlxuICAgICAgICA8TW9kYWwuRm9vdGVyPlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZENvbHVtblNldHRpbmdzLSR7dGhpcy5wcm9wcy5ncmlkLmlkfS1vay1idXR0b25gfVxuICAgICAgICAgICAgYnNTdHlsZT1cInByaW1hcnlcIlxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVPa0NsaWNrfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxNIGlkPVwiR3JpZC5Pa1wiIC8+XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkQ29sdW1uU2V0dGluZ3MtJHt0aGlzLnByb3BzLmdyaWQuaWR9LWNhbmNlbC1idXR0b25gfVxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDYW5jZWxDbGlja31cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8TSBpZD1cIkdyaWQuQ2FuY2VsXCIgLz5cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPC9Nb2RhbC5Gb290ZXI+XG4gICAgICA8L01vZGFsPlxuICAgICk7XG4gIH1cbn1cbiJdfQ==