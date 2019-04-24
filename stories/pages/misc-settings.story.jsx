import React from 'react';
import { number, boolean, object } from '@storybook/addon-knobs';

// App imports
import StorybookGrid from '../storybook-grid.component';


const GRID = {
  id: 'demo',
  idKeyPath: ['id'],
  defaultSortColumn: 'name',
  defaultSortOrder: 'desc',
  language: 'en',
  dateFormat: 'L',
  decimalSeparator: '.',
  thousandSeparator: ',',
};

const miscSettingsStory = () => {
  const knobs = {
    enableArrowNavigation: boolean('Enable arrow navigation', false),
    rowHeight: number('Row height', 40),
    grid: object('Grid object', GRID),
  };

  return (<StorybookGrid gridHeader="Miscellaneous settings" {...knobs} />);
};

export default miscSettingsStory;
