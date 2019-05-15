# Migrate guide between major versions

## Version 8
* Cell values are rendered based on componentType instead of valueType. Make sure you have correct componentType set.
* componentType select and multiselect values are now rendered automativally from selectOptions. You don't need custom valueRender anymore in basic cases.

### currency type
Switch valueType and componentType of currency type:
```javascript
OLD:

{
  valueType: 'currency',
  componentType: 'float',
}
```

```javascript
NEW:

{
  valueType: 'float',
  componentType: 'currency',
}
```

## Version 7
React 15 is no longer supported

## Version 2

### Make new `grid` config object
1. Make `GRID` object that contains `id` and `idKeyPath` attributes.
2. Pass it to `Datagrid` component as `grid` prop instead of `id` and `idKeyPath` props.

note: If your grid uses `columnKey` prop, you can remove it and use grid object's `idKeyPath` instead.

```javascript
OLD:

<Datagrid
  columnKey={['id']}
  id="myGrid"
  columns={columns}
/>
```

```javascript
NEW:

const GRID = {
  id: 'myGrid',
  idKeyPath: ['id'],
};

<Datagrid
  grid={GRID}
  columns={columns}
/>
```

### Update action calls
1. Update action parameters, the first parameter is always new `GRID` object.
2. Some actions needs `columns` array as parameter as well.
3. `id` and `idKeyPath` parameters are removed.
2. Check the parameters from [DatagridActions](./src/datagrid/datagrid.actions.js).

```javascript
OLD:
this.props.setData('myGrid', data);
```

```javascript
NEW:
this.props.setData(GRID, columns, data);
```
