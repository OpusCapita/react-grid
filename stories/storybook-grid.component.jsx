import React from 'react';

// App imports
import Grid from '../src/datagrid/datagrid.component';
import { columns, getData } from './storybook-utils';
import { setData } from '../src/datagrid/datagrid.actions';
import ProviderHOC, { store } from './provider';

const { dispatch } = store;

export const GRID = {
  id: 'demo',
  idKeyPath: ['id'],
  defaultShowFilteringRow: true,
};
dispatch(setData(GRID, columns, getData(100)));

const StorybookGrid = (props) => {
  if (!store.getState().datagrid.getIn(['demo', 'data'])) {
    dispatch(setData(GRID, columns, getData(100)));
  }

  return (
    <ProviderHOC>
      <Grid
        grid={GRID}
        columns={columns}
        inlineEdit
        filtering
        {...props}
      />
    </ProviderHOC>
  );
};

export default StorybookGrid;
