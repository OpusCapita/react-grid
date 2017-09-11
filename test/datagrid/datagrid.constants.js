export const GRID = {
  id: 'TestGrid',
  idKeyPath: ['id'],
};

export const selectOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
  { value: '5', label: 'Option 5' },
];

export const columns = [
  {
    header: 'Text',
    valueKeyPath: ['text'],
    valueType: 'text',
    componentType: 'text',
  },
  {
    header: 'Number',
    valueKeyPath: ['number'],
    valueType: 'number',
    componentType: 'number',
  },
  {
    header: 'Float',
    valueKeyPath: ['float'],
    valueType: 'float',
    componentType: 'float',
  },
  {
    header: 'Boolean',
    valueKeyPath: ['boolean'],
    valueType: 'boolean',
    componentType: 'boolean',
  },
  {
    header: 'Date',
    valueKeyPath: ['date'],
    valueType: 'date',
    componentType: 'date',
  },
  {
    header: 'Select',
    valueKeyPath: ['select'],
    valueType: 'text',
    componentType: 'select',
    selectComponentOptions: selectOptions,
  },
];

export const data = [
  {
    id: 1,
    text: 'Text 1',
    number: 1,
    float: 1.1,
    boolean: true,
    date: '2011-04-20T00:00:00Z',
    select: '1',
  },
  {
    id: 2,
    text: 'Text 2',
    number: 2,
    float: 2.2,
    boolean: false,
    date: '2012-04-20T00:00:00Z',
    select: '2',
  },
];
