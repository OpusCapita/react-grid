import { storiesOf } from '@storybook/react';
// Application
import './scss/app.component.scss';

// Other stories
import columnSettings from './pages/column-settings.story';
import headerSettings from './pages/header-settings.story';
import selecting from './pages/selecting.story';
import editing from './pages/editing.story';
import miscSettings from './pages/misc-settings.story';
import pagination from './pages/pagination.story';
import contextMenu from './pages/context-menu.story';

export default storiesOf('@opuscapita/react-grid', module)
  .add('Column settings', columnSettings)
  .add('Selecting rows', selecting)
  .add('Editing rows', editing)
  .add('Header settings', headerSettings)
  .add('Pagination', pagination)
  .add('Context menu', contextMenu)
  .add('Misc. settings', miscSettings);

