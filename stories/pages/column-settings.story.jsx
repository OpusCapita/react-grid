import React from 'react';
import { object, text, select, number, boolean } from '@storybook/addon-knobs';

// App imports
import StorybookGrid from '../storybook-grid.component';

const groupIds = {
  viewing: 'Viewing options',
  types: 'Data types',
  editing: 'Editing',
  misc: 'Misc.',
};

const valueKeyPathOpts = {
  name: 'name (text type)',
  price: 'price (currency type)',
  stock: 'stock (number type)',
  modified: 'modified (date type)',
  checked: 'checked (boolean type)',
};

const typeOpts = {
  text: 'text',
  number: 'number',
  boolean: 'boolean',
  date: 'date',
};

const alignmentOptions = {
  left: 'left',
  right: 'right',
  center: 'center',
};

const selectComponentOptions = [
  { value: 'BEL', label: 'Belgium' },
  { value: 'FIN', label: 'Finland' },
];

const extraColumn = {
  header: 'Extra column header',
  valueRender: () => (<span>Printed by valueRender function</span>),
  width: 200,
};

const columnsStory = () => {
  const valueTypes = Object.assign({ currency: 'currency' }, typeOpts);
  const columns = [{
    // Types, etc.
    valueKeyPath: [select('valueKeyPath', valueKeyPathOpts, 'name', groupIds.types)],
    valueType: select('valueType', valueTypes, 'text', groupIds.types),
    componentType: select('componentType', typeOpts, 'text', groupIds.types),

    // Column styles, etc.
    header: text('1st column header', 'Example header', groupIds.viewing),
    width: number('Width', 200, {}, groupIds.viewing),
    minWidth: number('Min width', 50, {}, groupIds.viewing),
    maxWidth: number('Max width', 400, {}, groupIds.viewing),
    align: select('Alignment', alignmentOptions, 'left', groupIds.viewing),
    fixed: boolean('Fixed', false, groupIds.viewing),
    fixedRight: boolean('Fixed right', false, groupIds.viewing),
    disableResizing: boolean('Disable resizing', false, groupIds.viewing),

    // Editing
    disableEditing: boolean('Disable editing', false, groupIds.editing),
    defaultValue: text('Default value (new row)', 'Default value', groupIds.editing),
    isRequired: boolean('Value required', false, groupIds.editing),
    disableSorting: boolean('Disable sorting', false, groupIds.misc),
  }, {
    header: 'Country',
    valueKeyPath: ['country'],
    valueType: 'text',
    componentType: 'select',
    width: 200,
    selectComponentOptions: object('Country column select options', selectComponentOptions),
  }];

  const otherKnobs = {
    extraColumn: object('Extra column', extraColumn, groupIds.misc),
    columnSettings: boolean('Enable column settings popup', false, groupIds.misc),
  };

  return (<StorybookGrid gridHeader="Column settings" columns={columns}{...otherKnobs} />);
};

export default columnsStory;
