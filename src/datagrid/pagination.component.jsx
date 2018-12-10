/* eslint-disable no-plusplus */
import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ListItems from '@opuscapita/react-list-items';
import { setPaginationPage } from './datagrid.actions';

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
      paginationPage: state.datagrid.getIn([GRID.id, 'pagination', 'page']),
    };
  };

  const mapDispatchToProps = dispatch => ({
    setPaginationPage: (grid, page) => dispatch(setPaginationPage(grid, page)),
  });

  class Pager extends React.PureComponent {
    static propTypes = {
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

    gotoPage = (page) => {
      const { grid, pagination } = this.props;
      this.props.setPaginationPage(grid, page);
      const offset = (page - 1) * pagination.pageSize;
      pagination.getData(offset, pagination.pageSize);
    }

    render = () => {
      const {
        children,
        paginationPage,
        pagination,
      } = this.props;
      const pageCount = pagination
        ? Math.ceil(pagination.totalSize / pagination.pageSize) : 1;
      const pages = [];
      for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
      }
      return (
        <WrappedComponent {...this.props}>
          {children}
          {pagination &&
          <Pagination>
            <ListItems
              goToItem={this.gotoPage}
              id="listPaginationItems"
              itemId={paginationPage}
              itemIds={List(pages)}
            />
          </Pagination>}
        </WrappedComponent>
      );
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(Pager);
};

export default paginationComponent;
