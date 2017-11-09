import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, Map } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Button } from 'react-bootstrap';
import Perf from 'react-addons-perf';
import { Datagrid, DatagridActions } from '../../../src/index';
import { GRID, columns, data } from './datagrid.constants';
import './datagrid.component.scss';

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
  allData: state.datagrid.getIn([GRID.id, 'allData'], List()),
  createData: state.datagrid.getIn([GRID.id, 'createData'], List()),
  editData: state.datagrid.getIn([GRID.id, 'editData'], Map()),
  selectedItems: state.datagrid.getIn([GRID.id, 'selectedItems'], List()),
  isEditing: state.datagrid.getIn([GRID.id, 'session', 'isEditing'], false),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class DatagridView extends React.Component {
  static propTypes = {
    // State props
    allData: ImmutablePropTypes.list.isRequired,
    createData: ImmutablePropTypes.list.isRequired,
    editData: ImmutablePropTypes.map.isRequired,
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
    this.props.setData(GRID, columns, data);
  }

  handleWarnClick = () => {
    this.props.cellShowMessage(GRID, 'warning', 3, ['float'], 'Warning');
  }

  handleStartClick = () => {
    Perf.start();
  }

  handleStopClick = () => {
    Perf.stop();
    Perf.printWasted(Perf.getLastMeasurements());
  }

  handleOnSave = () => {
    const { createData, editData, allData } = this.props;
    let newData = [];
    if (createData.size) {
      // Creating mode
      newData = createData.toJS();
    } else if (editData.size) {
      // Editing mode
      editData.forEach((editItem, editId) => {
        const foundItem = allData.find(i => i.getIn(GRID.idKeyPath) === editId);
        if (foundItem) {
          newData.push(foundItem.merge(editItem));
        }
      });
    }
    // Make an api call here with newData
    const errors = false;
    if (!errors) {
      // Take new items from backend
      const savedItems = newData;
      this.props.saveSuccess(GRID, columns, savedItems);
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
    const disableActionSave = (this.props.isEditing && this.props.editData.size === 0);
    const actionBar = (
      <div>
        <Button
          onClick={this.handleWarnClick}
        >
          Show Warning
        </Button>
        <Button
          onClick={this.handleStartClick}
        >
          Start Perf
        </Button>
        <Button
          onClick={this.handleStopClick}
        >
          Stop Perf
        </Button>
      </div>
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
          actionBarLeft={actionBar}
          filtering
          columnSettings
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
