import React from 'react';
import { object } from '@storybook/addon-knobs';

// App imports
import StorybookGrid from '../storybook-grid.component';

const contextMenuStory = () => {
  const contextMenuItems = object('Context menu items', [{
    id: '1',
    value: 'First item',
    title: 'This is the first',
    disabled: false,
  }, {
    id: '2',
    value: 'Header item',
    title: 'This is a header',
    disabled: false,
    header: true,
  }, {
    id: '3',
    value: 'Second item',
    title: 'This is the second',
    disabled: false,
  }, {
    id: '4',
    divider: true,
  }, {
    id: '5',
    value: 'Third item',
    title: 'This is the third',
    disabled: true,
  }]);

  return (<StorybookGrid gridHeader="Context menu" contextMenuItems={contextMenuItems} />);
};

export default contextMenuStory;
