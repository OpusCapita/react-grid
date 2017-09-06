import { currencyOptions } from './data';

export default [
  {
    header: 'Account Name',
    valueKeyPath: ['name'],
    valueType: 'text',
    componentType: 'text',
    validators: [
      { unique: true },
    ],
    width: 200,
  },
  {
    header: 'Account number',
    valueKeyPath: ['accountNumber'],
    valueType: 'text',
    componentType: 'text',
    width: 200,
  },
  {
    header: 'Currency',
    valueKeyPath: ['currency'],
    valueType: 'text',
    componentType: 'select',
    selectComponentOptions: currencyOptions,
    width: 200,
  },
  {
    header: 'Company Name',
    valueKeyPath: ['companyName'],
    valueType: 'text',
    componentType: 'text',
    width: 200,
  },
  {
    header: 'Interest rate',
    valueKeyPath: ['interestRate'],
    valueType: 'float',
    componentType: 'float',
    width: 200,
  },
  {
    header: 'Last checked',
    valueKeyPath: ['lastChecked'],
    valueType: 'date',
    componentType: 'date',
    width: 200,
  },
];
