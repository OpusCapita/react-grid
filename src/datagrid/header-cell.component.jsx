import React from 'react';
import PropTypes from 'prop-types';
import { Cell } from 'fixed-data-table-2';
import classNames from 'classnames';
import { gridShape } from './datagrid.props';
import Utils from './datagrid.utils';

export default class HeaderCell extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    grid: gridShape.isRequired,
    columns: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    column: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    currentSortColumn: PropTypes.string,
    currentSortOrder: PropTypes.string,
    onSortChange: PropTypes.func.isRequired,
    isBusy: PropTypes.bool.isRequired,
    filtering: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    children: '',
    currentSortOrder: null,
    currentSortColumn: null,
  };

  onSortChange = (e) => {
    // Check if click target is in actual header table cell, not the filtering input component
    if (
      e.target.className !== 'public_fixedDataTableCell_cellContent' &&
      e.target.parentElement.className !== 'public_fixedDataTableCell_cellContent'
    ) {
      return false;
    }
    if (!Utils.isSortable(this.props.column)) return false;
    if (this.props.isBusy) return false;
    e.preventDefault();
    const order = (
      this.props.currentSortColumn === Utils.getColumnKey(this.props.column) &&
      this.props.currentSortOrder === 'asc'
    ) ? 'desc' : 'asc';
    if (this.props.onSortChange) {
      this.props.onSortChange(
        this.props.grid,
        this.props.columns,
        this.props.column,
        order,
      );
    }
    return true;
  }

  getFilteringComponent = (filtering, column) => (
    filtering ?
      <div className="oc-datagrid-row-filter">{column.cellFilter()}</div> : null
  )

  render() {
    const {
      children,
      grid,
      currentSortColumn,
      currentSortOrder,
      columns,
      column,
      onSortChange,
      isBusy,
      filtering,
      ...props
    } = this.props;
    const cellClassNames = classNames({
      'oc-datagrid-cell-header': true,
      clickable: !isBusy && Utils.isSortable(this.props.column),
    });
    return (
      <Cell className={cellClassNames} onClick={this.onSortChange} {...props}>
        {children}
        { column.isRequired && ' *' }
        {
          currentSortColumn === Utils.getColumnKey(column) &&
          currentSortOrder &&
          (currentSortOrder === 'desc' ? ' ↓' : ' ↑')
        }
        {this.getFilteringComponent(filtering, column)}
      </Cell>
    );
  }
}
