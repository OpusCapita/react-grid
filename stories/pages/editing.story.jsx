import React from 'react';
import { boolean } from '@storybook/addon-knobs';

// App imports
import StorybookGrid from '../storybook-grid.component';

const editingStory = () => {
  const knobs = {
    inlineEdit: boolean('Enable inline editing', true),
    inlineAdd: boolean('Enable inline adding', true),
    removing: boolean('Enable removing', false),
    isCreatableSelect: boolean('Possibility to create new select component items', false),
  };

  return (<StorybookGrid gridHeader="Editing"{...knobs} />);
};

export default editingStory;
