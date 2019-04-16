import React from 'react';
import { storiesOf } from '@storybook/react';
import { object, text } from '@storybook/addon-knobs';
import { Store, StateDecorator } from '@sambego/storybook-state';

// Application
import './scss/app.component.scss';
import Grid from '../src/datagrid/datagrid.component';
import { setData } from '../src/datagrid/datagrid.actions';
import { columns, getData } from './story-constants';
import ProviderHOC, { store } from './provider';

/* eslint-disable no-underscore-dangle */
const state = new Store({});
const { dispatch } = store;
const GRID = {
  id: 'demo',
  idKeyPath: ['id'],
};


storiesOf('@opuscapita/react-grid', module)
  .addDecorator(StateDecorator(state))
  .add('Grid', () => (state) => {
    const knobs = {};
    dispatch(setData(GRID, columns, getData(100)));


    return (
      <ProviderHOC>
        <Grid
          grid={GRID}
          columns={columns}
        />
      </ProviderHOC>
    );
  });

