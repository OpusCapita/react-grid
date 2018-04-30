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
}(React.PureComponent);

export { ColumnSettings as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2V0dGluZ3MvY29sdW1uLXNldHRpbmdzLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJMaXN0IiwiSW1tdXRhYmxlUHJvcFR5cGVzIiwiTW9kYWwiLCJCdXR0b24iLCJGb3JtYXR0ZWRNZXNzYWdlIiwiTSIsIlNlbGVjdE9yZGVyTGlzdCIsImdyaWRTaGFwZSIsIkNvbHVtblNldHRpbmdzVXRpbHMiLCJDb2x1bW5TZXR0aW5ncyIsInByb3BzIiwiaGFuZGxlQ2FuY2VsQ2xpY2siLCJjbG9zZUNvbHVtblNldHRpbmdzTW9kYWwiLCJncmlkIiwiaGFuZGxlT2tDbGljayIsImhpZGRlbkNvbHVtbnMiLCJnZXRIaWRkZW5Db2x1bW5zIiwic3RhdGUiLCJhdmFpbGFibGVDb2x1bW5zIiwic2VsZWN0ZWRDb2x1bW5zIiwiY29sdW1uT3JkZXJzIiwiZ2V0Q29sdW1uT3JkZXJzIiwic2F2ZUNvbHVtblNldHRpbmdzIiwiaGFuZGxlU2VsZWN0aW9uQ2hhbmdlIiwiZGF0YSIsInNldFN0YXRlIiwiYWxsU2VsZWN0ZWQiLCJzZWxlY3RlZERhdGEiLCJ0b0pTIiwiZ2V0QXZhaWxhYmxlQ29sdW1ucyIsImNvbHVtbnMiLCJnZXRTZWxlY3RlZENvbHVtbnMiLCJ2aXNpYmxlQ29sdW1ucyIsImxlbmd0aCIsInJlbmRlciIsImlkIiwiYWxsTGFiZWwiLCJhdmFpbGFibGVMaXN0TGFiZWwiLCJzZWxlY3RlZExpc3RMYWJlbCIsInNlYXJjaFRvb2x0aXAiLCJQdXJlQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLFNBQVNDLElBQVQsUUFBcUIsV0FBckI7QUFDQSxPQUFPQyxrQkFBUCxNQUErQiwyQkFBL0I7QUFDQSxTQUFTQyxLQUFULEVBQWdCQyxNQUFoQixRQUE4Qixp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O0FBQ0UsOENBQWdDLEtBQUs3QixLQUFMLENBQVdHLElBQVgsQ0FBZ0JzQixFQUFoRCxlQURGO0FBRUUscUJBQVEsU0FGVjtBQUdFLHFCQUFTLEtBQUtyQjtBQUhoQjtBQUtFLDhCQUFDLENBQUQsSUFBRyxJQUFHLFNBQU47QUFMRixTQURGO0FBUUU7QUFBQyxnQkFBRDtBQUFBO0FBQ0UsOENBQWdDLEtBQUtKLEtBQUwsQ0FBV0csSUFBWCxDQUFnQnNCLEVBQWhELG1CQURGO0FBRUUscUJBQVMsS0FBS3hCO0FBRmhCO0FBSUUsOEJBQUMsQ0FBRCxJQUFHLElBQUcsYUFBTjtBQUpGO0FBUkY7QUF6QkYsS0FERjtBQTJDRCxHOzs7RUFqRnlDYixNQUFNMEMsYTs7U0FBN0IvQixjIiwiZmlsZSI6ImNvbHVtbi1zZXR0aW5ncy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xyXG5pbXBvcnQgeyBMaXN0IH0gZnJvbSAnaW1tdXRhYmxlJztcclxuaW1wb3J0IEltbXV0YWJsZVByb3BUeXBlcyBmcm9tICdyZWFjdC1pbW11dGFibGUtcHJvcHR5cGVzJztcclxuaW1wb3J0IHsgTW9kYWwsIEJ1dHRvbiB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XHJcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgYXMgTSB9IGZyb20gJ3JlYWN0LWludGwnO1xyXG5pbXBvcnQgU2VsZWN0T3JkZXJMaXN0IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LXNlbGVjdC1vcmRlci1saXN0JztcclxuXHJcbmltcG9ydCB7IGdyaWRTaGFwZSB9IGZyb20gJy4uL2RhdGFncmlkLnByb3BzJztcclxuaW1wb3J0IENvbHVtblNldHRpbmdzVXRpbHMgZnJvbSAnLi9jb2x1bW4tc2V0dGluZ3MudXRpbHMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sdW1uU2V0dGluZ3MgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcclxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xyXG4gICAgZ3JpZDogZ3JpZFNoYXBlLmlzUmVxdWlyZWQsXHJcbiAgICBjb2x1bW5zOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoKSkuaXNSZXF1aXJlZCxcclxuICAgIHZpc2libGVDb2x1bW5zOiBJbW11dGFibGVQcm9wVHlwZXMubGlzdC5pc1JlcXVpcmVkLFxyXG4gICAgY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgc2F2ZUNvbHVtblNldHRpbmdzOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICBjb25zdCBhdmFpbGFibGVDb2x1bW5zID0gQ29sdW1uU2V0dGluZ3NVdGlscy5nZXRBdmFpbGFibGVDb2x1bW5zKHByb3BzLmNvbHVtbnMpO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRDb2x1bW5zID0gQ29sdW1uU2V0dGluZ3NVdGlsc1xyXG4gICAgICAuZ2V0U2VsZWN0ZWRDb2x1bW5zKHByb3BzLmNvbHVtbnMsIHByb3BzLnZpc2libGVDb2x1bW5zKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIGF2YWlsYWJsZUNvbHVtbnMsXHJcbiAgICAgIHNlbGVjdGVkQ29sdW1ucyxcclxuICAgICAgYWxsU2VsZWN0ZWQ6IGF2YWlsYWJsZUNvbHVtbnMubGVuZ3RoID09PSBzZWxlY3RlZENvbHVtbnMubGVuZ3RoLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGhhbmRsZUNhbmNlbENsaWNrID0gKCkgPT4ge1xyXG4gICAgdGhpcy5wcm9wcy5jbG9zZUNvbHVtblNldHRpbmdzTW9kYWwodGhpcy5wcm9wcy5ncmlkKTtcclxuICB9XHJcblxyXG4gIGhhbmRsZU9rQ2xpY2sgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBoaWRkZW5Db2x1bW5zID0gQ29sdW1uU2V0dGluZ3NVdGlsc1xyXG4gICAgICAuZ2V0SGlkZGVuQ29sdW1ucyh0aGlzLnN0YXRlLmF2YWlsYWJsZUNvbHVtbnMsIHRoaXMuc3RhdGUuc2VsZWN0ZWRDb2x1bW5zKTtcclxuICAgIGNvbnN0IGNvbHVtbk9yZGVycyA9IENvbHVtblNldHRpbmdzVXRpbHMuZ2V0Q29sdW1uT3JkZXJzKHRoaXMuc3RhdGUuc2VsZWN0ZWRDb2x1bW5zKTtcclxuICAgIHRoaXMucHJvcHMuc2F2ZUNvbHVtblNldHRpbmdzKHRoaXMucHJvcHMuZ3JpZCwgaGlkZGVuQ29sdW1ucywgY29sdW1uT3JkZXJzKTtcclxuICAgIHRoaXMucHJvcHMuY2xvc2VDb2x1bW5TZXR0aW5nc01vZGFsKHRoaXMucHJvcHMuZ3JpZCk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVTZWxlY3Rpb25DaGFuZ2UgPSAoZGF0YSkgPT4ge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IGFsbFNlbGVjdGVkOiBkYXRhLmFsbFNlbGVjdGVkLCBzZWxlY3RlZENvbHVtbnM6IGRhdGEuc2VsZWN0ZWREYXRhLnRvSlMoKSB9KTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxNb2RhbFxyXG4gICAgICAgIGJzU2l6ZT1cImxhcmdlXCJcclxuICAgICAgICBkaWFsb2dDbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1jb2x1bW4tc2V0dGluZ3MtbW9kYWxcIlxyXG4gICAgICAgIGFyaWEtbGFiZWxsZWRieT1cIm9jLWRhdGFncmlkLWNvbHVtbi1zZXR0aW5ncy1tb2RhbFwiXHJcbiAgICAgICAgc2hvd1xyXG4gICAgICAgIG9uSGlkZT17dGhpcy5oYW5kbGVDYW5jZWxDbGlja31cclxuICAgICAgPlxyXG4gICAgICAgIDxNb2RhbC5IZWFkZXI+XHJcbiAgICAgICAgICA8TW9kYWwuVGl0bGU+PE0gaWQ9XCJHcmlkLkNvbHVtblNldHRpbmdzLkhlYWRlclwiIC8+PC9Nb2RhbC5UaXRsZT5cclxuICAgICAgICA8L01vZGFsLkhlYWRlcj5cclxuICAgICAgICA8TW9kYWwuQm9keT5cclxuICAgICAgICAgIDxTZWxlY3RPcmRlckxpc3RcclxuICAgICAgICAgICAgYWxsU2VsZWN0ZWQ9e3RoaXMuc3RhdGUuYWxsU2VsZWN0ZWR9XHJcbiAgICAgICAgICAgIGF2YWlsYWJsZURhdGE9e0xpc3QodGhpcy5zdGF0ZS5hdmFpbGFibGVDb2x1bW5zKX1cclxuICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkQ29sdW1uU2V0dGluZ3MtJHt0aGlzLnByb3BzLmdyaWQuaWR9YH1cclxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlU2VsZWN0aW9uQ2hhbmdlfVxyXG4gICAgICAgICAgICBzZWxlY3RlZERhdGE9e0xpc3QodGhpcy5zdGF0ZS5zZWxlY3RlZENvbHVtbnMpfVxyXG4gICAgICAgICAgICB0cmFuc2xhdGlvbnM9e3tcclxuICAgICAgICAgICAgICBhbGxMYWJlbDogPE0gaWQ9XCJHcmlkLkNvbHVtblNldHRpbmdzLkFsbFwiIC8+LFxyXG4gICAgICAgICAgICAgIGF2YWlsYWJsZUxpc3RMYWJlbDogPE0gaWQ9XCJHcmlkLkNvbHVtblNldHRpbmdzLkF2YWlsYWJsZUNvbHVtbnNcIiAvPixcclxuICAgICAgICAgICAgICBzZWxlY3RlZExpc3RMYWJlbDogPE0gaWQ9XCJHcmlkLkNvbHVtblNldHRpbmdzLlNlbGVjdGVkQ29sdW1uc1wiIC8+LFxyXG4gICAgICAgICAgICAgIHNlYXJjaFRvb2x0aXA6IDxNIGlkPVwiR3JpZC5Db2x1bW5TZXR0aW5ncy5TZWFyY2hUb29sdGlwXCIgLz4sXHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvTW9kYWwuQm9keT5cclxuICAgICAgICA8TW9kYWwuRm9vdGVyPlxyXG4gICAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgICBpZD17YG9jRGF0YWdyaWRDb2x1bW5TZXR0aW5ncy0ke3RoaXMucHJvcHMuZ3JpZC5pZH0tb2stYnV0dG9uYH1cclxuICAgICAgICAgICAgYnNTdHlsZT1cInByaW1hcnlcIlxyXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZU9rQ2xpY2t9XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxNIGlkPVwiR3JpZC5Pa1wiIC8+XHJcbiAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgIDxCdXR0b25cclxuICAgICAgICAgICAgaWQ9e2BvY0RhdGFncmlkQ29sdW1uU2V0dGluZ3MtJHt0aGlzLnByb3BzLmdyaWQuaWR9LWNhbmNlbC1idXR0b25gfVxyXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNhbmNlbENsaWNrfVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8TSBpZD1cIkdyaWQuQ2FuY2VsXCIgLz5cclxuICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgIDwvTW9kYWwuRm9vdGVyPlxyXG4gICAgICA8L01vZGFsPlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl19