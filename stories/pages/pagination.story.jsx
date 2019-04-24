import React from 'react';
import { number } from '@storybook/addon-knobs';

// App imports
import StorybookGrid, { GRID } from '../storybook-grid.component';
import { setData } from '../../src/datagrid/datagrid.actions';
import { columns, getData } from '../storybook-utils';
import { store } from '../provider';

const { dispatch } = store;
const totalSize = 100;
const grid = Object.assign(GRID, { pagination: true });
const baseData = getData(totalSize);

// TODO: handle filters, etc.
const getPaginatedData =
  (offset, count, filters, sortColumn, sortOrder) => { // eslint-disable-line no-unused-vars
    const paginatedData = baseData.slice(offset, offset + count);
    const paginationGrid = Object.assign(grid, { pagination: true });
    dispatch(setData(paginationGrid, columns, paginatedData));
  };

const paginationStory = () => {
  const paginationObj = {
    pageSize: number('Page size', 10),
    totalLimit: number('Limit for total amount of rows', totalSize),
    totalSize,
    getData: getPaginatedData,
  };

  if (!store.getState().datagrid.getIn(['demo', 'data'])) {
    getPaginatedData(0, 10);
  }

  return (
    <StorybookGrid
      disableDataLoad
      gridHeader="Pagination"
      grid={grid}
      pagination={paginationObj}
    />
  );
};

export default paginationStory;
