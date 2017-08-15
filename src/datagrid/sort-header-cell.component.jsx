import React from 'react';
import PropTypes from 'prop-types';
import { Cell } from 'fixed-data-table-2';

export default class SortHeaderCell extends React.PureComponent {

  static propTypes = {
    children: PropTypes.node.isRequired,
    gridId: PropTypes.string.isRequired,
    columnKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    sortOrder: PropTypes.string.isRequired,
    onSortChange: PropTypes.func.isRequired,
    sortValueGetter: PropTypes.func.isRequired,
    sortComparator: PropTypes.func.isRequired,
  }

  onSortChange = (e) => {
    e.preventDefault();
    if (this.props.onSortChange) {
      this.props.onSortChange(
        this.props.gridId,
        this.props.columnKey,
        this.props.sortValueGetter,
        this.props.sortComparator,
      );
    }
  }

  render() {
    /* eslint-disable no-unused-vars */
    const { sortOrder,
          children,
          gridId,
          onSortChange,
          sortValueGetter,
          sortComparator,
          ...props } = this.props;
    return (
      <Cell className="oc-datagrid-cell-header clickable" onClick={this.onSortChange} {...props}>
        {children} {sortOrder && (sortOrder === 'desc' ? '↓' : '↑')}
      </Cell>
    );
  }

}
