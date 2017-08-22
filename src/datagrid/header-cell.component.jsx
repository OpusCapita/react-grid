import React from 'react';
import PropTypes from 'prop-types';
import { Cell } from 'fixed-data-table-2';
import classNames from 'classnames';
import Utils from './datagrid.utils';

export default class HeaderCell extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    gridId: PropTypes.string.isRequired,
    column: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    currentSortColumn: PropTypes.string,
    currentSortOrder: PropTypes.string,
    onSortChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    currentSortOrder: '',
    currentSortColumn: '',
  };

  onSortChange = (e) => {
    e.preventDefault();
    const order = (
      this.props.currentSortColumn === Utils.getColumnKey(this.props.column) &&
      this.props.currentSortOrder === 'asc'
    ) ? 'desc' : 'asc';
    if (this.props.onSortChange) {
      this.props.onSortChange(
        this.props.gridId,
        this.props.column,
        order,
      );
    }
  }

  render() {
    const cellClassNames = classNames({
      'oc-datagrid-cell-header': true,
      clickable: Utils.isSortable(this.props.column),
    });
    return (
      <Cell className={cellClassNames} onClick={this.onSortChange}>
        {this.props.children}
        {
          this.props.currentSortColumn === Utils.getColumnKey(this.props.column) &&
          this.props.currentSortOrder &&
          (this.props.currentSortOrder === 'desc' ? ' ↓' : ' ↑')
        }
      </Cell>
    );
  }
}
