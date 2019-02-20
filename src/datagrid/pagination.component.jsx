/* eslint-disable no-plusplus */
import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List, Map } from 'immutable';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ListItems from '@opuscapita/react-list-items';
import { setPaginationPage } from './datagrid.actions';
import { gridShape } from './datagrid.props';

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
      isCreating: state.datagrid.getIn([GRID.id, 'session', 'isCreating'], false),
      isEditing: state.datagrid.getIn([GRID.id, 'session', 'isEditing'], false),
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
      children: PropTypes.node,
      grid: gridShape.isRequired,
      setPaginationPage: PropTypes.func.isRequired,
      filterData: ImmutablePropTypes.map.isRequired,
      paginationPage: PropTypes.number,
      pagination: PropTypes.shape({
        pageSize: PropTypes.number.isRequired,
        totalSize: PropTypes.number.isRequired,
        getData: PropTypes.func.isRequired,
      }),
      sortColumn: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      sortOrder: PropTypes.string,
      isEditing: PropTypes.bool.isRequired,
      isCreating: PropTypes.bool.isRequired,
    };

    static defaultProps = {
      children: null,
      paginationPage: 1,
      pagination: undefined,
      sortColumn: undefined,
      sortOrder: undefined,
    };

    componentDidMount = () => {
      const { pagination } = this.props;
      if (pagination) this.requestData();
    }

    componentDidUpdate = (prevProps) => {
      const {
        filterData,
        pagination,
        paginationPage,
        sortColumn,
        sortOrder,
      } = this.props;
      if (pagination && !filterData.equals(prevProps.filterData) && paginationPage > 1) {
        this.gotoPage(1);
      } else if (pagination && (
        !filterData.equals(prevProps.filterData) ||
        paginationPage !== prevProps.paginationPage ||
        sortColumn !== prevProps.sortColumn ||
        sortOrder !== prevProps.sortOrder)) {
        this.requestData();
      }
    };

    requestData = () => {
      const {
        filterData,
        pagination,
        paginationPage,
        sortColumn,
        sortOrder,
      } = this.props;
      const offset = ((paginationPage) - 1) * pagination.pageSize;
      pagination.getData(offset, pagination.pageSize, filterData, sortColumn, sortOrder);
    }

    gotoPage = (page) => {
      const { grid } = this.props;
      this.props.setPaginationPage(grid, page);
    }

    render = () => {
      const {
        children,
        grid,
        isCreating,
        isEditing,
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
        <WrappedComponent {...this.props} grid={{ ...grid, pagination: true }}>
          {children}
          <Pagination>
            <ListItems
              disabled={isCreating || isEditing}
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
