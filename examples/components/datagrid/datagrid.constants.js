import * as VALIDATE from './datagrid.validators';

export const GRID = {
  id: 'TestGrid',
  idKeyPath: ['id'],
};

export const selectOptions = [
  { value: 'Option 1', label: 'Option 1' },
  { value: 'Option 2', label: 'Option 2' },
  { value: 'Option 3', label: 'Option 3' },
  { value: 'Option 4', label: 'Option 4' },
  { value: 'Option 5', label: 'Option 5' },
];

export const columns = [
  {
    header: 'Text',
    valueKeyPath: ['text'],
    valueType: 'text',
    componentType: 'text',
    isRequired: true,
    width: 200,
    validators: [
      { unique: true },
      { validate: VALIDATE.isRequired },
    ],
  },
  {
    header: 'Text2',
    valueKeyPath: ['text2'],
    valueType: 'text',
    componentType: 'text',
    isRequired: true,
    width: 200,
    validators: [
      { unique: true },
      { validate: VALIDATE.isRequired },
    ],
  },
  {
    header: 'Number',
    valueKeyPath: ['number'],
    valueType: 'number',
    componentType: 'number',
    isRequired: true,
    width: 80,
    defaultValue: 123,
    validators: [
      { validate: VALIDATE.isRequired },
    ],
  },
  {
    header: 'Float',
    valueKeyPath: ['float'],
    valueType: 'float',
    isRequired: true,
    componentType: 'float',
    width: 100,
    validators: [
      { validate: VALIDATE.isRequired },
    ],
  },
  {
    header: 'Boolean',
    valueKeyPath: ['boolean'],
    valueType: 'boolean',
    componentType: 'boolean',
    width: 100,
  },
  {
    header: 'Date',
    valueKeyPath: ['date'],
    valueType: 'date',
    componentType: 'date',
    isRequired: true,
    width: 100,
    validators: [
      { validate: VALIDATE.isRequired },
    ],
  },
  {
    header: 'Select',
    valueKeyPath: ['select'],
    valueType: 'text',
    componentType: 'select',
    selectComponentOptions: selectOptions,
    width: 200,
  },
];

export const data = [
  {
    id: 1,
    text: 'Text 1',
    text2: 'Text 1',
    number: 1,
    float: 5.5,
    boolean: true,
    date: '2011-04-20T00:00:00Z',
    select: 'Option 1',
  },
  {
    id: 2,
    text: 'Text 2',
    text2: 'Text 1',
    number: 2,
    float: 4.4,
    boolean: false,
    date: '2012-04-20T00:00:00Z',
    select: 'Option 2',
  },
  {
    id: 3,
    text: 'Text 3',
    text2: 'Text 1',
    number: 3,
    float: 3.3,
    boolean: false,
    date: '2013-04-20T00:00:00Z',
    select: 'Option 3',
  },
  {
    id: 4,
    text: 'Text 4',
    text2: 'Text 1',
    number: 4,
    float: 2.2,
    boolean: false,
    date: '2014-04-20T00:00:00Z',
    select: 'Option 4',
  },
  {
    id: 5,
    text: 'Text 5',
    text2: 'Text 1',
    number: 5,
    float: 1.1,
    boolean: false,
    date: '2015-04-20T00:00:00Z',
    select: 'Option 5',
  },
  {
    id: 6,
    text: undefined,
    text2: undefined,
    number: undefined,
    float: undefined,
    boolean: undefined,
    date: undefined,
    select: undefined,
  },
];
