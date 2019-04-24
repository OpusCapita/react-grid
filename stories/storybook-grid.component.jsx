import React from 'react';
import PropTypes from 'prop-types';

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

const StorybookGrid = (props) => {
  if (!props.disableDataLoad && !store.getState().datagrid.getIn(['demo', 'data'])) {
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

StorybookGrid.propTypes = {
  disableDataLoad: PropTypes.bool,
};

StorybookGrid.defaultProps = {
  disableDataLoad: false,
};

export default StorybookGrid;
