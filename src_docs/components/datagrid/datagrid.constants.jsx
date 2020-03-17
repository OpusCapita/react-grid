import React from 'react';
import faker from 'faker';
import moment from 'moment';
import { countries, currencies } from 'country-data';

import Color from './color.component';
import * as VALIDATE from './datagrid.validators';
import CustomInputComponent from './custom.component';

export const REGIONS = {
  'en-GB': 'English (GB)',
  'en-US': 'English (US)',
  'fi-FI': 'Finnish (FI)',
  'sv-SV': 'Swedish (SV)',
  'es-ES': 'Spanish (ES)',
  'de-DE': 'German (DE)',
};

export const GRID = {
  id: 'TestGrid',
  idKeyPath: ['id'],
  language: 'en',
  dateFormat: 'L',
  decimalSeparator: '.',
  thousandSeparator: ',',
};

export const PAGINATION_GRID = {
  id: 'TestPaginationGrid',
  idKeyPath: ['id'],
  language: 'en',
  dateFormat: 'L',
  decimalSeparator: '.',
  thousandSeparator: ',',
  pagination: true,
};

export const selectTranslations = {
  placeholder: 'Select...',
  noResultsText: 'No hits found',
};

export const countryOptions = countries.all
  .filter(country => country.alpha3)
  .map(country => ({ value: country.alpha3, label: country.name }));

export const currencyOptions = currencies.all
  .filter(currency => !!currency.code)
  .map(currency => ({ value: currency.code, label: currency.code }));

export const columns = [
  {
    header: 'Name',
    valueKeyPath: ['name'],
    valueType: 'text',
    componentType: 'text',
    isRequired: true,
    isLocked: true,
    validators: [{ unique: true }, { validate: VALIDATE.isRequired }],
  },
  {
    header: 'Price',
    valueKeyPath: ['price'],
    valueType: 'float',
    componentType: 'currency',
    isRequired: true,
    width: 80,
    validators: [{ validate: VALIDATE.isRequired }],
    editComponentProps: {
      selectValueOnClick: true,
    },
  },
  {
    header: 'Stock',
    valueKeyPath: ['stock'],
    valueType: 'number',
    componentType: 'number',
    width: 100,
  },
  {
    header: 'Country',
    valueKeyPath: ['country'],
    valueType: 'text',
    componentType: 'multiselect',
    selectComponentOptions: countryOptions,
    translations: {
      itemsSelected: 'countries',
    },
    virtualized: true,
  },
  {
    header: 'Currency',
    valueKeyPath: ['currency'],
    valueType: 'text',
    componentType: 'select',
    selectComponentOptions: currencyOptions,
  },
  {
    header: 'Used',
    valueKeyPath: ['isUsed'],
    valueType: 'boolean',
    componentType: 'boolean',
    width: 100,
  },
  {
    header: 'Checked',
    valueKeyPath: ['isChecked'],
    valueType: 'boolean',
    componentType: 'checkbox',
    align: 'center',
    width: 150,
  },
  {
    header: 'Modified',
    valueKeyPath: ['modified'],
    valueType: 'date',
    componentType: 'date',
    width: 120,
  },
  {
    header: 'Custom component',
    valueKeyPath: ['custom'],
    valueType: 'text',
    componentType: 'text',
    width: 100,
    valueRender: rowData => rowData.get('custom'),
    editValueRender: (rowData, rowIndex, setRef, onKeyDown) => (
      <CustomInputComponent setRef={setRef} onKeyDown={onKeyDown} value={rowData.get('custom')} />
    ),
    createValueRender: (rowData, rowIndex, setRef, onKeyDown) => (
      <CustomInputComponent setRef={setRef} onKeyDown={onKeyDown} value={rowData.get('custom')} />
    ),
    translations: {
      columnHeaderTooltip: 'Custom component',
    },
  },
  {
    header: 'Color',
    valueKeyPath: ['color'],
    valueRender: data => <Color value={data.get('color')} />,
    editValueRender: data => <Color value={data.get('color')} />,
    createValueRender: () => null,
    filterValueRender: () => null,
  },
];

// DATA GENERATOR
export const getData = (count) => {
  const data = [];

  const randomDate = () => {
    const date = faker.date.past();
    return moment(date).format('YYYY-MM-DD[T]HH:mm:ss[Z]');
  };

  const randomCountry = () => countries.all[Math.floor(Math.random() * countries.all.length)];

  for (let i = 1; i <= count; i += 1) {
    const country = randomCountry();
    data.push({
      id: i,
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      amount: faker.finance.amount(),
      stock: faker.random.number(),
      country: country.alpha3,
      currency: country.currencies[0] ? country.currencies[0] : 'EUR',
      isUsed: faker.random.boolean(),
      isChecked: faker.random.boolean(),
      color: faker.internet.color(),
      modified: randomDate(),
      custom: faker.lorem.word(),
    });
  }

  return data;
};
