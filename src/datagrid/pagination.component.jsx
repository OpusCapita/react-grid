/* eslint-disable no-plusplus */
import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { injectIntl, intlShape } from 'react-intl';
import { List, Map } from 'immutable';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FloatingSelectPortal } from '@opuscapita/react-floating-select';
import ListItems from '@opuscapita/react-list-items';
import { setPage, setRowsOnPage } from './datagrid.actions';
import { gridShape } from './datagrid.props';

import './datagrid.variables.scss';

const ROWS_ON_PAGE_OPTIONS = [
  {
    label: '10',
    value: 10,
  },
  {
    label: '25',
    value: 25,
  },
  {
    label: '50',
    value: 50,
  },
  {
    label: '75',
    value: 75,
  },
  {
    label: '100',
    value: 100,
  },
];

const Pagination = styled.div`
  align-items: center;
  display: flex;
  padding: 1rem;
  height: auto;
  justify-content: space-between;
  width: 100%;
  flex: 0 0 auto;
`;

const RowsOnPage = styled.div`
  display: flex;
  align-items: center;
`;

const RowsOnPageLabel = styled.span`
  padding: 0 1rem;
`;

const RowsOnPageSelect = styled(FloatingSelectPortal)`
  min-width: 60px;
`;

const paginationComponent = (WrappedComponent) => {
  const mapStateToProps = (state, ownProps) => {
    const GRID = ownProps.grid;
    return {
      filterData: state.datagrid.getIn([GRID.id, 'config', 'filteringData', 'filterData'], Map()),
      isCreating: state.datagrid.getIn([GRID.id, 'session', 'isCreating'], false),
      isEditing: state.datagrid.getIn([GRID.id, 'session', 'isEditing'], false),
      page: state.datagrid.getIn([GRID.id, 'config', 'page']),
      rowsOnPage: state.datagrid.getIn([GRID.id, 'config', 'rowsOnPage']),
      sortColumn: state.datagrid.getIn([GRID.id, 'config', 'sortingData', 'sortColumn'], GRID.defaultSortColumn),
      sortOrder: state.datagrid.getIn([GRID.id, 'config', 'sortingData', 'sortOrder'], GRID.defaultSortOrder),
    };
  };

  const mapDispatchToProps = dispatch => ({
    setPage: (grid, page) => dispatch(setPage(grid, page)),
    setRowsOnPage: (grid, rowsOnPage) => dispatch(setRowsOnPage(grid, rowsOnPage)),
  });

  @injectIntl
  @connect(mapStateToProps, mapDispatchToProps)
  class Pager extends React.PureComponent {
    static propTypes = {
      grid: gridShape.isRequired,
      filterData: ImmutablePropTypes.map.isRequired,
      intl: intlShape.isRequired,
      isEditing: PropTypes.bool.isRequired,
      isCreating: PropTypes.bool.isRequired,
      setPage: PropTypes.func.isRequired,
      setRowsOnPage: PropTypes.func.isRequired,
      children: PropTypes.node,
      page: PropTypes.number,
      pagination: PropTypes.shape({
        getData: PropTypes.func.isRequired,
        pageSize: PropTypes.number.isRequired,
        totalSize: PropTypes.number.isRequired,
        totalLimit: PropTypes.number,
      }),
      rowsOnPage: PropTypes.number,
      rowsOnPageOptions: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
        value: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]).isRequired,
      })),
      sortColumn: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      sortOrder: PropTypes.string,
    };

    static defaultProps = {
      children: null,
      page: 1,
      pagination: undefined,
      rowsOnPage: undefined,
      rowsOnPageOptions: ROWS_ON_PAGE_OPTIONS,
      sortColumn: undefined,
      sortOrder: undefined,
    };

    constructor(props) {
      super(props);
      const {
        grid,
        pagination,
        rowsOnPageOptions,
        rowsOnPage,
      } = props;
      if (pagination && rowsOnPageOptions && rowsOnPageOptions.length > 0) {
        const defaultRowsOnPage =
          rowsOnPageOptions.find(option => option.value === pagination.pageSize)
          || rowsOnPageOptions[0];
        if (defaultRowsOnPage && defaultRowsOnPage.value !== rowsOnPage) {
          props.setRowsOnPage(grid, defaultRowsOnPage.value);
        }
      }
    }

    componentDidUpdate = (prevProps) => {
      const {
        filterData,
        pagination,
        page,
        rowsOnPage,
        sortColumn,
        sortOrder,
      } = this.props;
      if (pagination && !filterData.equals(prevProps.filterData) && page > 1) {
        this.gotoPage(1);
      } else if (pagination && (
        !filterData.equals(prevProps.filterData) ||
        page !== prevProps.page ||
        rowsOnPage !== prevProps.rowsOnPage ||
        sortColumn !== prevProps.sortColumn ||
        sortOrder !== prevProps.sortOrder)) {
        this.requestData();
      }
    };

    getSelectedRowsOnPageOption = () => {
      const { rowsOnPage, rowsOnPageOptions } = this.props;
      return rowsOnPageOptions.find(option => option.value === rowsOnPage);
    }

    requestData = () => {
      const {
        filterData,
        pagination,
        page,
        rowsOnPage,
        sortColumn,
        sortOrder,
      } = this.props;
      const offset = ((page) - 1) * rowsOnPage;
      pagination.getData(offset, rowsOnPage, filterData, sortColumn, sortOrder);
    }

    gotoPage = (page) => {
      const { grid } = this.props;
      this.props.setPage(grid, page);
    }

    handleRowsOnPageChange = (rowsOnPageOption) => {
      const { grid, page, pagination } = this.props;
      const rowsOnPage = rowsOnPageOption.value;
      this.props.setRowsOnPage(grid, rowsOnPage);
      if (page > Math.ceil(pagination.totalSize / rowsOnPage)) {
        this.gotoPage(1);
      }
    }

    renderTotalCount = () => {
      const { intl, pagination } = this.props;
      const { totalLimit, totalSize } = pagination;
      let label;
      switch (totalSize) {
        case 1:
          label = intl.formatMessage({ id: 'Grid.Pagination.TotalSingular' });
          break;
        case totalLimit:
          label = intl.formatMessage({ id: 'Grid.Pagination.TotalOver' }, { n: totalSize });
          break;
        default:
          label = intl.formatMessage({ id: 'Grid.Pagination.TotalPlural' }, { n: totalSize });
          break;
      }
      return <span>{label}</span>;
    }

    render = () => {
      const {
        children,
        grid,
        intl,
        isCreating,
        isEditing,
        page,
        pagination,
        rowsOnPage,
        rowsOnPageOptions,
      } = this.props;
      const pageCount = pagination && pagination.totalSize > 0 && rowsOnPage > 0
        ? Math.ceil(pagination.totalSize / rowsOnPage) : 1;
      const pages = [];
      for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
      }
      return (pagination ?
        <WrappedComponent {...this.props} grid={{ ...grid, pagination: true }}>
          {children}
          <Pagination className="footer">
            {this.renderTotalCount()}
            <ListItems
              disabled={isCreating || isEditing}
              goToItem={this.gotoPage}
              id="listPaginationItems"
              itemId={page}
              itemIds={List(pages)}
              typeable
            />
            <RowsOnPage>
              <RowsOnPageLabel>
                {intl.formatMessage({ id: 'Grid.Pagination.RowsOnPage' })}
              </RowsOnPageLabel>
              <RowsOnPageSelect
                isCrearable={false}
                isDisabled={isCreating || isEditing}
                onChange={this.handleRowsOnPageChange}
                options={rowsOnPageOptions}
                value={this.getSelectedRowsOnPageOption()}
              />
            </RowsOnPage>
          </Pagination>
        </WrappedComponent>
        : <WrappedComponent {...this.props} />
      );
    }
  }

  return Pager;
};

export default paginationComponent;
