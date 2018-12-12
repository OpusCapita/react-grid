/* eslint-disable no-plusplus */
import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List, Map } from 'immutable';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ListItems from '@opuscapita/react-list-items';
import { setPaginationPage } from './datagrid.actions';
import Utils from './datagrid.utils';

const Pagination = styled.div`
  display: flex;
  height: 40px;
  justify-content: center;
  width: 100%;
  background-color: white;
`;

const paginationComponent = (WrappedComponent) => {
  const mapStateToProps = (state, ownProps) => {
    const GRID = ownProps.grid;
    return {
      paginationPage: state.datagrid.getIn([GRID.id, 'config', 'pagination', 'page']),
      filterData: state.datagrid.getIn([GRID.id, 'config', 'filteringData', 'filterData'], Map()),
      sortColumn: state.datagrid.getIn([GRID.id, 'config', 'sortingData', 'sortColumn'], null),
      sortOrder: state.datagrid.getIn([GRID.id, 'config', 'sortingData', 'sortOrder'], null),
    };
  };

  const mapDispatchToProps = dispatch => ({
    setPaginationPage: (grid, page) => dispatch(setPaginationPage(grid, page)),
  });

  @connect(mapStateToProps, mapDispatchToProps)
  class Pager extends React.PureComponent {
    static propTypes = {
      filterData: ImmutablePropTypes.map.isRequired,
      paginationPage: PropTypes.number,
      pagination: PropTypes.shape({
        pageSize: PropTypes.number.isRequired,
        totalSize: PropTypes.number.isRequired,
        getData: PropTypes.func.isRequired,
      }),
    };

    static defaultProps = {
      paginationPage: 1,
      pagination: undefined,
    };

    getData = (datagrid) => {
      const { pagination } = this.props;
      const paginationPage = datagrid.getIn(['config', 'pagination', 'page']);
      const filterData = datagrid.getIn(['config', 'filteringData', 'filterData'], Map());
      const sortColumn = datagrid.getIn(['config', 'sortingData', 'sortColumn'], null);
      const sortOrder = datagrid.getIn(['config', 'sortingData', 'sortOrder'], null);
      const offset = ((paginationPage) - 1) * pagination.pageSize;
      pagination.getData(offset, pagination.pageSize, filterData, sortColumn, sortOrder);
    }

    gotoPage = (page) => {
      const { grid } = this.props;
      this.props.setPaginationPage(grid, page);
      const {
        filterData,
        pagination,
        sortColumn,
        sortOrder,
      } = this.props;
      const offset = ((page) - 1) * pagination.pageSize;
      pagination.getData(offset, pagination.pageSize, filterData, sortColumn, sortOrder);
      Utils.savePaginationPage(grid, { page });
    }

    render = () => {
      const {
        children,
        grid,
        paginationPage,
        pagination,
      } = this.props;
      const pageCount = pagination
        ? Math.ceil(pagination.totalSize / pagination.pageSize) : 1;
      const pages = [];
      for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
      }
      return (pagination ?
        <WrappedComponent {...this.props} grid={{ ...grid, getData: this.getData }}>
          {children}
          <Pagination>
            <ListItems
              goToItem={this.gotoPage}
              id="listPaginationItems"
              itemId={paginationPage}
              itemIds={List(pages)}
            />
          </Pagination>
        </WrappedComponent>
        : <WrappedComponent {...this.props} />
      );
    }
  }

  return Pager;
};

export default paginationComponent;
