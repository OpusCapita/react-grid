import React from 'react';
import { number, boolean } from '@storybook/addon-knobs';

// App imports
import StorybookGrid from '../storybook-grid.component';

const miscSettingsStory = () => {
  const knobs = {
    enableArrowNavigation: boolean('Enable arrow navigation', false),
    rowHeight: number('Row height', 40),
  };

  return (<StorybookGrid gridHeader="Miscellaneous settings" {...knobs} />);
};

export default miscSettingsStory;
