import React from 'react';
import PropTypes from 'prop-types';
import { Cell } from 'fixed-data-table-2';
import classNames from 'classnames';
import invariant from 'invariant';
import styled from 'styled-components';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { gridShape } from './datagrid.props';
import Utils from './datagrid.utils';

const Header = styled.div`
  /* Mystical 17px comes from 2*8px paddings of public_fixedDataTableCell_cellContent plus 1px border width */
  width: ${props => `calc(${props.width}px - 17px)`};
  display: inline-flex;
  flex-wrap: nowrap;
`;

const HeaderLabel = styled.span`
  flex: 0 1 content;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const Symbols = styled.span`
  flex: 1 0 content;
  white-space: nowrap;
  margin-left: ${props => (props.children ? '5px' : '0')};
`;

const isClassName = (el, className) => {
  if (typeof el.className === 'string') {
    return el.className.split(' ').includes(className);
  }
  return false;
};

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
    width: PropTypes.number.isRequired,
  }

  static defaultProps = {
    children: '',
    currentSortOrder: null,
    currentSortColumn: null,
  }

  onSortChange = (e) => {
    // Check if click target is in actual header table cell, not the filtering input component
    // Filtering component can be anything because of custom renderers
    let ok = isClassName(e.target, 'public_fixedDataTableCell_cellContent');
    if (!ok) {
      ok = isClassName(e.target, 'public_fixedDataTableCell_wrap3');
    }
    if (!ok) {
      ok = isClassName(e.target, 'oc-datagrid-cell-header-text');
    }
    if (!ok) {
      ok = isClassName(e.target.parentElement, 'oc-datagrid-cell-header-text');
    }
    if (!ok) {
      ok = isClassName(e.target.parentElement.parentElement, 'oc-datagrid-cell-header-text');
    }
    if (!ok) return false;
    if (!Utils.isSortable(this.props.column)) return false;
    if (this.props.isBusy) return false;
    e.preventDefault();
    const order = this.props.currentSortColumn === Utils.getColumnKey(this.props.column)
      && this.props.currentSortOrder === 'asc'
      ? 'desc'
      : 'asc';
    if (this.props.onSortChange) {
      this.props.onSortChange(this.props.grid, this.props.columns, this.props.column, order);
    }
    return true;
  }

  getFilteringComponent = (filtering, column) => {
    if (filtering) {
      invariant(column.cellFilter, `No cellFilter for column '${Utils.getColumnKey(column)}'`);
      return <div className="oc-datagrid-row-filter">{column.cellFilter()}</div>;
    }
    return null;
  }

  renderHeader = () => {
    const { children, column, currentSortColumn, currentSortOrder, width } = this.props;
    const requiredSymbol = column.isRequired ? '*' : '';
    const isSortedByColumn = currentSortColumn === Utils.getColumnKey(column) && currentSortOrder;
    const sortOrder = currentSortOrder === 'desc' ? ' ↓' : ' ↑';
    const symbols = isSortedByColumn ? `${requiredSymbol}${sortOrder}` : requiredSymbol;

    return (
      <Header width={width} className="oc-datagrid-cell-header-text">
        <HeaderLabel width={width}>{children}</HeaderLabel>
        <Symbols>{symbols}</Symbols>
      </Header>
    );
  }

  renderColumnHeader = () => {
    const { grid: { id }, column: { columnKey, translations }, } = this.props;
    const tooltip = translations ? translations.columnHeaderTooltip : undefined;
    return (
      tooltip
      ? <OverlayTrigger
          placement="top"
          overlay={(
            <Tooltip id={`ocDatagridColumnHeaderTooltip-${id}-${columnKey}`}>
              {tooltip}
            </Tooltip>
          )}
          delay={500}
        >
          {this.renderHeader()}
        </OverlayTrigger>
      : this.renderHeader()
    );
  };

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
      width,
      ...props
    } = this.props;
    const cellClassNames = classNames({
      'oc-datagrid-cell-header': true,
      clickable: !isBusy && Utils.isSortable(column),
    });

    return (
      <Cell className={cellClassNames} onClick={this.onSortChange} {...props}>
        {this.renderColumnHeader()}
        {this.getFilteringComponent(filtering, column)}
      </Cell>
    );
  }
}
