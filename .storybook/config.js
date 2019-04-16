import {
  configure,
  addDecorator
} from '@storybook/react';
import {
  setOptions
} from '@storybook/addon-options';
import { withKnobs } from '@storybook/addon-knobs';

setOptions({
  name: "OpusCapita React Grid Storybook",
  addonPanelInRight: true,
  hiearchySeparator: /\//,
  hiearchyRootSeparator: /\|/,
});

// AddDecorator
addDecorator(withKnobs);

function loadStories() {
  require('../stories/index.story.jsx');
}

configure(loadStories, module);
