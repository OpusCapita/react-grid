import React from 'react';
import { object, text, number, boolean } from '@storybook/addon-knobs';

// App imports
import StorybookGrid from '../storybook-grid.component';

const ActionBar = () => (<div className="custom-action-bar">Here is a custom action bar component</div>);
const dropdownMenuItems = [{ title: '#1' }, { title: '#2' }];

const headerSettingsStory = () => {
  const showActionBar = boolean('Show action bar', false);
  const showActionBarLeft = boolean('Show action bar on left', false);

  const knobs = {
    gridHeader: text('Grid header', 'Default title'),
    actionBar: showActionBar ? <ActionBar /> : null,
    actionBarLeft: showActionBarLeft ? <ActionBar /> : null,
    disableActions: boolean('Disable action bar actions', false),
    disableActionBar: boolean('Disable action bar rendering', false),
    disableActionSave: boolean('Disable save action button', false),
    headerHeight: number('Header height', 40),
    dropdownMenuItems: object('Dropdown menu items', dropdownMenuItems),
    disableDropdown: boolean('Disable dropdown menu', false),
    disableFilteringControls: boolean('Disable filtering controls', false),
    filtering: boolean('Enable filtering', true),
  };

  return (<StorybookGrid gridHeader="Header settings"{...knobs} />);
};

export default headerSettingsStory;
