import React from 'react';
import { boolean } from '@storybook/addon-knobs';

// App imports
import StorybookGrid from '../storybook-grid.component';

const selectingStory = () => {
  const knobs = {
    multiSelect: boolean('Multi select', false),
    showSelectAllCheckbox: boolean('Show select all checkbox', false),
    cellSelect: boolean('Enable cell selection', false),
    rowSelect: boolean('Enable row selecting', false),
    rowSelectCheckboxColumn: boolean('Enable selecting via checkbox column', false),
  };

  return (<StorybookGrid gridHeader="Selections" {...knobs} />);
};

export default selectingStory;
