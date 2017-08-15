/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import Immutable from 'immutable';
import datagridReducer from '../../src/datagrid/datagrid.reducer';
import { TYPES } from '../../src/datagrid/datagrid.actions';

describe('Datagrid reducers', () => {
  it('sets data', () => {
    const GRID_ID = 'TestGrid';
    const data = [
      { name: 'John', age: 99 },
      { name: 'Mary', age: 11 },
    ];
    const expectedState = Immutable.fromJS(data);
    const action = {
      type: TYPES.PLATFORM_DATAGRID_SET_DATA,
      id: GRID_ID,
      data,
    };
    const newState = datagridReducer(undefined, action);

    expect(newState.getIn([GRID_ID, 'data'])).to.eql(expectedState);
    expect(newState.getIn([GRID_ID, 'allData'])).to.eql(expectedState);
  });

  it('sets busy state', () => {
    const GRID_ID = 'TestGrid';
    const action = {
      type: TYPES.PLATFORM_DATAGRID_BUSY,
      id: GRID_ID,
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([GRID_ID, 'session', 'isBusy'])).to.be.true;
  });

  it('sets ready state', () => {
    const GRID_ID = 'TestGrid';
    const action = {
      type: TYPES.PLATFORM_DATAGRID_READY,
      id: GRID_ID,
    };
    const newState = datagridReducer(undefined, action);
    expect(newState.getIn([GRID_ID, 'session', 'isBusy'])).to.be.false;
  });

  it('sets sorted data', () => {
    const GRID_ID = 'TestGrid';
    const data = Immutable.fromJS([
      { name: 'Mary', age: 11 },
      { name: 'John', age: 99 },
    ]);
    const action = {
      type: TYPES.PLATFORM_DATAGRID_SORT_COLUMN,
      id: GRID_ID,
      data,
      allData: data,
      column: 'name',
      order: 'desc',
    };
    const newState = datagridReducer(undefined, action);

    expect(newState.getIn([GRID_ID, 'data'])).to.eql(data);
    expect(newState.getIn([GRID_ID, 'allData'])).to.eql(data);
    expect(newState.getIn([GRID_ID, 'user', 'sortColumn'])).to.eql('name');
    expect(newState.getIn([GRID_ID, 'user', 'sortOrder'])).to.eql('desc');
  });


  it('invalidates data', () => {
    const GRID_ID = 'TestGrid';
    const action = {
      type: TYPES.PLATFORM_DATAGRID_INVALIDATE,
      id: GRID_ID,
    };
    const newState = datagridReducer(undefined, action);

    expect(newState.getIn([GRID_ID, 'data'])).to.be.an('undefined');
    expect(newState.getIn([GRID_ID, 'allData'])).to.be.an('undefined');
  });
});
