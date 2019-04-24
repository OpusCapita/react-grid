import React from 'react';
import { boolean } from '@storybook/addon-knobs';


// App imports
import StorybookGrid from '../storybook-grid.component';

export const PAGINATION_GRID = {
  id: 'TestPaginationGrid',
  idKeyPath: ['id'],
  defaultSortColumn: 'country',
  defaultSortOrder: 'desc',
  language: 'en',
  dateFormat: 'L',
  decimalSeparator: '.',
  thousandSeparator: ',',
  pagination: true,
};

const paginationStory = () => {
  const knobs = {};

  return (<StorybookGrid gridHeader="Pagination" grid={PAGINATION_GRID} {...knobs} />);
};

export default paginationStory;
