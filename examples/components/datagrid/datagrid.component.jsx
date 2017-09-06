import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, Map } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Button } from 'react-bootstrap';
import { Datagrid, DatagridActions } from '../../../src/index';
import columns from './datagrid.columns';
import { bankAccountData } from './data';
import './datagrid.component.scss';

// Grid props that are needed also by action calls
const GRID = {
  id: 'accounts-grid-example',
  idKeyPath: ['accountId'],
};

// Needed grid actions are mapped here
// There's more in /src/datagrid/datagrid.actions.js
const mapDispatchToProps = {
  cellShowMessage: DatagridActions.cellShowMessage,
  setData: DatagridActions.setData,
  saveSuccess: DatagridActions.saveSuccess,
  removeSuccess: DatagridActions.removeSuccess,
  saveFail: DatagridActions.saveFail,
  removeFail: DatagridActions.removeFail,
};

// Grid state data can be mapped from redux store here
const mapStateToProps = state => ({
  dataEdited: state.datagrid.getIn([GRID.id, 'editData'], Map()),
  selectedItems: state.datagrid.getIn([GRID.id, 'selectedItems'], List()),
  isEditing: state.datagrid.getIn([GRID.id, 'session', 'isEditing'], false),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class DatagridView extends React.Component {
  static propTypes = {
    // State props
    dataEdited: ImmutablePropTypes.map.isRequired,
    selectedItems: ImmutablePropTypes.list.isRequired,
    isEditing: PropTypes.bool.isRequired,
    // Action props
    cellShowMessage: PropTypes.func.isRequired,
    setData: PropTypes.func.isRequired,
    saveSuccess: PropTypes.func.isRequired,
    removeSuccess: PropTypes.func.isRequired,
    saveFail: PropTypes.func.isRequired,
    removeFail: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.setData(GRID, columns, bankAccountData);
  }

  handleWarnClick = () => {
    this.props.cellShowMessage(GRID, 'warning', 1, ['name'], 'WarningExample');
  }

  handleOnSave = () => {
    const errors = false;
    if (!errors) {
      const savedItems = []; // saved items as array from backend here
      this.props.saveSuccess(GRID, savedItems);
    } else {
      this.props.saveFail(GRID);
    }
  }

  handleOnRemove = () => {
    const removedItems = this.props.selectedItems.toJS();
    const errors = false;
    if (!errors) {
      this.props.removeSuccess(GRID, removedItems);
    } else {
      this.props.removeFail(GRID);
    }
  }

  render() {
    const disableActionSave = (this.props.isEditing && this.props.dataEdited.size === 0);
    const actionBar = (
      <Button
        onClick={this.handleWarnClick}
      >
        Warn
      </Button>
    );
    return (
      <div className="oc-content oc-flex-column">
        <div>
          <h1>Datagrid</h1>
        </div>
        <Datagrid
          grid={GRID}
          columns={columns}
          disableActionSave={disableActionSave}
          actionBar={actionBar}
          enableArrowNavigation
          filtering
          inlineEdit
          removing
          multiSelect
          rowSelect
          rowSelectCheckboxColumn
          onSave={this.handleOnSave}
          onRemove={this.handleOnRemove}
          locale={{
            language: 'en',
            dateFormat: 'MM/DD/YYYY',
            decimalSeparator: '.',
            thousandSeparator: '',
          }}
        />
      </div>
    );
  }
}
