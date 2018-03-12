import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, Map } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Form, FormGroup, Button, Radio } from 'react-bootstrap';
import Perf from 'react-addons-perf';
import { Datagrid, DatagridActions } from '../../../src/index';
import { GRID, columns, data } from './datagrid.constants';
import './datagrid.component.scss';

// Needed grid actions are mapped here
// There's more in /src/datagrid/datagrid.actions.js
const mapDispatchToProps = {
  cellShowMessage: DatagridActions.cellShowMessage,
  cellShowMessages: DatagridActions.cellShowMessages,
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
    cellShowMessages: PropTypes.func.isRequired,
    setData: PropTypes.func.isRequired,
    saveSuccess: PropTypes.func.isRequired,
    removeSuccess: PropTypes.func.isRequired,
    saveFail: PropTypes.func.isRequired,
    removeFail: PropTypes.func.isRequired,
  };

  constructor() {
    super();

    this.state = {
      gridSettings: GRID,
    };
  }

  componentWillMount() {
    this.props.setData(GRID, columns, data);
  }

  handleWarnClick = () => {
    this.props.cellShowMessage(GRID, 'warning', 3, ['float'], 'Warning');
  }

  handleInfoClick = () => {
    const messages = Map()
      .setIn(['info', 1], Map({ text: 'Text message 1', date: 'Date message 1' }))
      .setIn(['info', 3], Map({ text: 'Text message 3' }));
    this.props.cellShowMessages(GRID, messages);
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

  useLocalStorage = () => {
    this.setState({ gridSettings: GRID });
    this.props.setData(GRID, columns, data);
  }

  useCustomStorage = () => {
    const gridSettings = {
      ...GRID,
      configStorage: {
        load: () => ({
          hiddenColumns: ['text3', 'text4'],
          columnOrder: ['select', 'text', 'text2', 'number', 'float', 'boolean', 'date'],
          columnWidths: { text3: 200, text4: 300 },
        }),
        save: (conf) => {
          console.log(`Save config: ${JSON.stringify(conf)}`); // eslint-disable-line
        },
      },
    };
    this.setState({ gridSettings });
    this.props.setData(gridSettings, columns, data);
  }

  render() {
    const disableActionSave = (this.props.isEditing && this.props.editData.size === 0);
    const actionBar = (
      <Form inline>
        <Button
          onClick={this.handleWarnClick}
        >
          Show Warning
        </Button>
        <Button
          onClick={this.handleInfoClick}
        >
          Show Info
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
        </Button>{' '}
        <FormGroup>
          <Radio
            name="configStorage"
            onChange={this.useLocalStorage}
            defaultChecked
            inline
          >
            Local storage
          </Radio>
          <Radio
            name="configStorage"
            onChange={this.useCustomStorage}
            inline
          >
            Custom storage
          </Radio>
        </FormGroup>
      </Form>
    );
    return (
      <div className="oc-content oc-flex-column">
        <div>
          <h1>Datagrid</h1>
        </div>
        <Datagrid
          grid={this.state.gridSettings}
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
        />
      </div>
    );
  }
}
