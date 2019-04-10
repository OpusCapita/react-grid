var _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Modal, Button } from 'react-bootstrap';
import { FormattedMessage as M, injectIntl, intlShape } from 'react-intl';
import SelectOrderList from '@opuscapita/react-select-order-list';

import { gridShape } from '../datagrid.props';
import ColumnSettingsUtils from './column-settings.utils';

export default injectIntl(_class = function (_React$PureComponent) {
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
          searchPlaceholder: this.props.intl.formatMessage({ id: 'Common.Search' }),
          translations: {
            allLabel: React.createElement(M, { id: 'Grid.ColumnSettings.All' }),
            availableListLabel: React.createElement(M, { id: 'Grid.ColumnSettings.AvailableColumns' }),
            selectedListLabel: React.createElement(M, { id: 'Grid.ColumnSettings.SelectedColumns' }),
            searchTooltip: React.createElement(M, { id: 'Grid.ColumnSettings.SearchTooltip' })
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
}(React.PureComponent)) || _class;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2V0dGluZ3MvY29sdW1uLXNldHRpbmdzLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJMaXN0IiwiSW1tdXRhYmxlUHJvcFR5cGVzIiwiTW9kYWwiLCJCdXR0b24iLCJGb3JtYXR0ZWRNZXNzYWdlIiwiTSIsImluamVjdEludGwiLCJpbnRsU2hhcGUiLCJTZWxlY3RPcmRlckxpc3QiLCJncmlkU2hhcGUiLCJDb2x1bW5TZXR0aW5nc1V0aWxzIiwicHJvcHMiLCJoYW5kbGVDYW5jZWxDbGljayIsImNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbCIsImdyaWQiLCJoYW5kbGVPa0NsaWNrIiwiaGlkZGVuQ29sdW1ucyIsImdldEhpZGRlbkNvbHVtbnMiLCJzdGF0ZSIsImF2YWlsYWJsZUNvbHVtbnMiLCJzZWxlY3RlZENvbHVtbnMiLCJjb2x1bW5PcmRlcnMiLCJnZXRDb2x1bW5PcmRlcnMiLCJzYXZlQ29sdW1uU2V0dGluZ3MiLCJoYW5kbGVTZWxlY3Rpb25DaGFuZ2UiLCJkYXRhIiwic2V0U3RhdGUiLCJhbGxTZWxlY3RlZCIsInNlbGVjdGVkRGF0YSIsInRvSlMiLCJnZXRBdmFpbGFibGVDb2x1bW5zIiwiY29sdW1ucyIsImdldFNlbGVjdGVkQ29sdW1ucyIsInZpc2libGVDb2x1bW5zIiwibGVuZ3RoIiwicmVuZGVyIiwiaWQiLCJpbnRsIiwiZm9ybWF0TWVzc2FnZSIsImFsbExhYmVsIiwiYXZhaWxhYmxlTGlzdExhYmVsIiwic2VsZWN0ZWRMaXN0TGFiZWwiLCJzZWFyY2hUb29sdGlwIiwiUHVyZUNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLFNBQVNDLElBQVQsUUFBcUIsV0FBckI7QUFDQSxPQUFPQyxrQkFBUCxNQUErQiwyQkFBL0I7QUFD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R0FGUjtBQUdaQywrQkFBbUIsb0JBQUMsQ0FBRCxJQUFHLElBQUcscUNBQU4sR0FIUDtBQUlaQywyQkFBZSxvQkFBQyxDQUFELElBQUcsSUFBRyxtQ0FBTjtBQUpIO0FBUGhCO0FBREYsT0FWRjtBQTBCRTtBQUFDLGFBQUQsQ0FBTyxNQUFQO0FBQUE7QUFDRTtBQUFDLGdCQUFEO0FBQUE7QUFDRSw4Q0FBZ0MsS0FBSy9CLEtBQUwsQ0FBV0csSUFBWCxDQUFnQnNCLEVBQWhELGVBREY7QUFFRSxxQkFBUSxTQUZWO0FBR0UscUJBQVMsS0FBS3JCO0FBSGhCO0FBS0UsOEJBQUMsQ0FBRCxJQUFHLElBQUcsU0FBTjtBQUxGLFNBREY7QUFRRTtBQUFDLGdCQUFEO0FBQUE7QUFDRSw4Q0FBZ0MsS0FBS0osS0FBTCxDQUFXRyxJQUFYLENBQWdCc0IsRUFBaEQsbUJBREY7QUFFRSxxQkFBUyxLQUFLeEI7QUFGaEI7QUFJRSw4QkFBQyxDQUFELElBQUcsSUFBRyxhQUFOO0FBSkY7QUFSRjtBQTFCRixLQURGO0FBNENELEdBckZIOztBQUFBO0FBQUEsRUFFNkJkLE1BQU02QyxhQUZuQyIsImZpbGUiOiJjb2x1bW4tc2V0dGluZ3MuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBMaXN0IH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgeyBNb2RhbCwgQnV0dG9uIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgYXMgTSwgaW5qZWN0SW50bCwgaW50bFNoYXBlIH0gZnJvbSAncmVhY3QtaW50bCc7XG5pbXBvcnQgU2VsZWN0T3JkZXJMaXN0IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXNlbGVjdC1vcmRlci1saXN0JztcblxuaW1wb3J0IHsgZ3JpZFNoYXBlIH0gZnJvbSAnLi4vZGF0YWdyaWQucHJvcHMnO1xuaW1wb3J0IENvbHVtblNldHRpbmdzVXRpbHMgZnJvbSAnLi9jb2x1bW4tc2V0dGluZ3MudXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdFxuQGluamVjdEludGxcbmNsYXNzIENvbHVtblNldHRpbmdzIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgaW50bDogaW50bFNoYXBlLmlzUmVxdWlyZWQsXG4gICAgZ3JpZDogZ3JpZFNoYXBlLmlzUmVxdWlyZWQsXG4gICAgY29sdW1uczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKCkpLmlzUmVxdWlyZWQsXG4gICAgdmlzaWJsZUNvbHVtbnM6IEltbXV0YWJsZVByb3BUeXBlcy5saXN0LmlzUmVxdWlyZWQsXG4gICAgY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHNhdmVDb2x1bW5TZXR0aW5nczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICBjb25zdCBhdmFpbGFibGVDb2x1bW5zID0gQ29sdW1uU2V0dGluZ3NVdGlscy5nZXRBdmFpbGFibGVDb2x1bW5zKHByb3BzLmNvbHVtbnMpO1xuICAgIGNvbnN0IHNlbGVjdGVkQ29sdW1ucyA9IENvbHVtblNldHRpbmdzVXRpbHNcbiAgICAgIC5nZXRTZWxlY3RlZENvbHVtbnMocHJvcHMuY29sdW1ucywgcHJvcHMudmlzaWJsZUNvbHVtbnMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBhdmFpbGFibGVDb2x1bW5zLFxuICAgICAgc2VsZWN0ZWRDb2x1bW5zLFxuICAgICAgYWxsU2VsZWN0ZWQ6IGF2YWlsYWJsZUNvbHVtbnMubGVuZ3RoID09PSBzZWxlY3RlZENvbHVtbnMubGVuZ3RoLFxuICAgIH07XG4gIH1cblxuICBoYW5kbGVDYW5jZWxDbGljayA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLmNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbCh0aGlzLnByb3BzLmdyaWQpO1xuICB9XG5cbiAgaGFuZGxlT2tDbGljayA9ICgpID0+IHtcbiAgICBjb25zdCBoaWRkZW5Db2x1bW5zID0gQ29sdW1uU2V0dGluZ3NVdGlsc1xuICAgICAgLmdldEhpZGRlbkNvbHVtbnModGhpcy5zdGF0ZS5hdmFpbGFibGVDb2x1bW5zLCB0aGlzLnN0YXRlLnNlbGVjdGVkQ29sdW1ucyk7XG4gICAgY29uc3QgY29sdW1uT3JkZXJzID0gQ29sdW1uU2V0dGluZ3NVdGlscy5nZXRDb2x1bW5PcmRlcnModGhpcy5zdGF0ZS5zZWxlY3RlZENvbHVtbnMpO1xuICAgIHRoaXMucHJvcHMuc2F2ZUNvbHVtblNldHRpbmdzKHRoaXMucHJvcHMuZ3JpZCwgaGlkZGVuQ29sdW1ucywgY29sdW1uT3JkZXJzKTtcbiAgICB0aGlzLnByb3BzLmNsb3NlQ29sdW1uU2V0dGluZ3NNb2RhbCh0aGlzLnByb3BzLmdyaWQpO1xuICB9XG5cbiAgaGFuZGxlU2VsZWN0aW9uQ2hhbmdlID0gKGRhdGEpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgYWxsU2VsZWN0ZWQ6IGRhdGEuYWxsU2VsZWN0ZWQsIHNlbGVjdGVkQ29sdW1uczogZGF0YS5zZWxlY3RlZERhdGEudG9KUygpIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8TW9kYWxcbiAgICAgICAgYnNTaXplPVwibGFyZ2VcIlxuICAgICAgICBkaWFsb2dDbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1jb2x1bW4tc2V0dGluZ3MtbW9kYWxcIlxuICAgICAgICBhcmlhLWxhYmVsbGVkYnk9XCJvYy1kYXRhZ3JpZC1jb2x1bW4tc2V0dGluZ3MtbW9kYWxcIlxuICAgICAgICBzaG93XG4gICAgICAgIG9uSGlkZT17dGhpcy5oYW5kbGVDYW5jZWxDbGlja31cbiAgICAgID5cbiAgICAgICAgPE1vZGFsLkhlYWRlcj5cbiAgICAgICAgICA8TW9kYWwuVGl0bGU+PE0gaWQ9XCJHcmlkLkNvbHVtblNldHRpbmdzLkhlYWRlclwiIC8+PC9Nb2RhbC5UaXRsZT5cbiAgICAgICAgPC9Nb2RhbC5IZWFkZXI+XG4gICAgICAgIDxNb2RhbC5Cb2R5PlxuICAgICAgICAgIDxTZWxlY3RPcmRlckxpc3RcbiAgICAgICAgICAgIGFsbFNlbGVjdGVkPXt0aGlzLnN0YXRlLmFsbFNlbGVjdGVkfVxuICAgICAgICAgICAgYXZhaWxhYmxlRGF0YT17TGlzdCh0aGlzLnN0YXRlLmF2YWlsYWJsZUNvbHVtbnMpfVxuICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkQ29sdW1uU2V0dGluZ3MtJHt0aGlzLnByb3BzLmdyaWQuaWR9YH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVNlbGVjdGlvbkNoYW5nZX1cbiAgICAgICAgICAgIHNlbGVjdGVkRGF0YT17TGlzdCh0aGlzLnN0YXRlLnNlbGVjdGVkQ29sdW1ucyl9XG4gICAgICAgICAgICBzZWFyY2hQbGFjZWhvbGRlcj17dGhpcy5wcm9wcy5pbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0NvbW1vbi5TZWFyY2gnIH0pfVxuICAgICAgICAgICAgdHJhbnNsYXRpb25zPXt7XG4gICAgICAgICAgICAgIGFsbExhYmVsOiA8TSBpZD1cIkdyaWQuQ29sdW1uU2V0dGluZ3MuQWxsXCIgLz4sXG4gICAgICAgICAgICAgIGF2YWlsYWJsZUxpc3RMYWJlbDogPE0gaWQ9XCJHcmlkLkNvbHVtblNldHRpbmdzLkF2YWlsYWJsZUNvbHVtbnNcIiAvPixcbiAgICAgICAgICAgICAgc2VsZWN0ZWRMaXN0TGFiZWw6IDxNIGlkPVwiR3JpZC5Db2x1bW5TZXR0aW5ncy5TZWxlY3RlZENvbHVtbnNcIiAvPixcbiAgICAgICAgICAgICAgc2VhcmNoVG9vbHRpcDogPE0gaWQ9XCJHcmlkLkNvbHVtblNldHRpbmdzLlNlYXJjaFRvb2x0aXBcIiAvPixcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Nb2RhbC5Cb2R5PlxuICAgICAgICA8TW9kYWwuRm9vdGVyPlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGlkPXtgb2NEYXRhZ3JpZENvbHVtblNldHRpbmdzLSR7dGhpcy5wcm9wcy5ncmlkLmlkfS1vay1idXR0b25gfVxuICAgICAgICAgICAgYnNTdHlsZT1cInByaW1hcnlcIlxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVPa0NsaWNrfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxNIGlkPVwiR3JpZC5Pa1wiIC8+XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkQ29sdW1uU2V0dGluZ3MtJHt0aGlzLnByb3BzLmdyaWQuaWR9LWNhbmNlbC1idXR0b25gfVxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDYW5jZWxDbGlja31cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8TSBpZD1cIkdyaWQuQ2FuY2VsXCIgLz5cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPC9Nb2RhbC5Gb290ZXI+XG4gICAgICA8L01vZGFsPlxuICAgICk7XG4gIH1cbn1cbiJdfQ==