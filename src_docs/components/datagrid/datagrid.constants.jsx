import React from 'react';
import faker from 'faker';
import moment from 'moment';
import { countries } from 'country-data';
import Color from './color.component';
import * as VALIDATE from './datagrid.validators';

export const REGIONS = {
  'en-GB': 'English (GB)',
  'fi-FI': 'Finnish (FI)',
};

export const GRID = {
  id: 'TestGrid',
  idKeyPath: ['id'],
  defaultSortColumn: 'name',
  defaultSortOrder: 'desc',
  language: 'en',
  dateFormat: 'L',
  decimalSeparator: '.',
  thousandSeparator: ',',
};

export const PAGINATION_GRID = {
  id: 'TestPaginationGrid',
  idKeyPath: ['id'],
  defaultSortColumn: 'country',
  defaultSortOrder: 'desc',
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

export const currencyOptions = countries.all
  .filter(country => country.alpha3 && country.currencies && country.currencies.length >= 1)
  .map(country => ({ value: country.alpha3, label: country.currencies[0] }));

export const columns = [
  {
    header: 'Name',
    valueKeyPath: ['name'],
    valueType: 'text',
    componentType: 'text',
    isRequired: true,
    isLocked: true,
    validators: [
      { unique: true },
      { validate: VALIDATE.isRequired },
    ],
  },
  {
    header: 'Price',
    valueKeyPath: ['price'],
    valueType: 'currency',
    componentType: 'float',
    isRequired: true,
    width: 80,
    validators: [
      { validate: VALIDATE.isRequired },
    ],
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
    valueRender: (data) => {
      const country = countryOptions.find(v => v.value === data.get('country'));
      return country ? country.label : null;
    },
  },
  {
    header: 'Currency',
    valueKeyPath: ['currency'],
    valueType: 'text',
    componentType: 'select',
    selectComponentOptions: currencyOptions,
    valueRender: (data) => {
      const currency = currencyOptions.find(v => v.value === data.get('country'));
      return currency ? currency.label : null;
    },
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
    valueType: 'checkbox',
    componentType: 'checkbox',
    align: 'center',
    width: 100,
  },
  {
    header: 'Modified',
    valueKeyPath: ['modified'],
    valueType: 'date',
    componentType: 'date',
    width: 120,
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

  const randomCountry = () => {
    const code2 = faker.address.countryCode();
    return countries[code2].alpha3.toUpperCase();
  };

  for (let i = 1; i <= count; i += 1) {
    data.push({
      id: i,
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      amount: faker.finance.amount(),
      stock: faker.random.number(),
      country: randomCountry(),
      isUsed: faker.random.boolean(),
      isChecked: faker.random.boolean(),
      color: faker.internet.color(),
      modified: randomDate(),
    });
  }

  return data;
};
