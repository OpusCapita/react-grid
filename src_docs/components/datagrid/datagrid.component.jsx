/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, Map } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { DropdownButton, Form, Button, MenuItem } from 'react-bootstrap';
import uuid from 'uuid';
// app
import { Datagrid, DatagridActions } from '../../../src/index';
import { getLocaleFormatData } from '../../services/internationalization.service';
import { GRID, columns, getData, REGIONS } from './datagrid.constants';
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

export default
@connect(mapStateToProps, mapDispatchToProps)
class DatagridView extends React.Component {
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

    const region = 'en-GB';
    const { dateFormat, thousandSeparator, decimalSeparator } = getLocaleFormatData(region);
    const gridSettings = {
      ...GRID,
      dateFormat,
      decimalSeparator,
      thousandSeparator,
    };

    this.state = {
      gridSettings,
      region,
    };
  }

  componentWillMount() {
    this.props.setData(GRID, columns, getData(100));
  }

  getRegionComponent = () => {
    const { region } = this.state;
    const title = `Region: ${REGIONS[region] || ''}`;
    return (
      <DropdownButton
        id="region-selector"
        title={title}
      >
        {Object.keys(REGIONS).map(key => (
          <MenuItem
            eventKey={key}
            key={key}
            active={key === region}
            onSelect={this.handleRegionSelect}
          >
            {REGIONS[key]}
          </MenuItem>
        ))}
      </DropdownButton>
    );
  }

  handleRegionSelect = (eventKey) => {
    const { dateFormat, thousandSeparator, decimalSeparator } = getLocaleFormatData(eventKey);
    const gridSettings = {
      ...GRID,
      region: eventKey,
      dateFormat,
      decimalSeparator,
      thousandSeparator,
    };
    this.setState({
      gridSettings,
      region: eventKey,
    });
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

  handleOnSave = () => {
    const { createData, editData, allData } = this.props;
    let newData = [];
    if (createData.size) {
      // Creating mode
      newData = createData.toJS();
      newData = newData.map(item => Object.assign(item, { id: uuid() }));
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

  handleContextClick = (selectedIds, selectedData) => {
    console.log('Context menu clicked');
    console.log(`ID's ${selectedIds.join(', ')}`);
    console.table(selectedData.toSJ());
  }

  render() {
    const disableActionSave = (this.props.isEditing && this.props.editData.size === 0);
    const actionBar = (
      <Form inline style={{ marginLeft: '20px' }}>
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
        { this.getRegionComponent() }
      </Form>
    );
    return (
      <Datagrid
        id="test-grid"
        className="test-grid"
        grid={this.state.gridSettings}
        gridHeader="Example Grid"
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
        enableArrowNavigation
        onSave={this.handleOnSave}
        onRemove={this.handleOnRemove}
        contextMenuItems={[
          {
            value: 'Selected items are used',
            onClick: this.handleContextClick,
            disabled: (selectedIds, selectedData) =>
              selectedData.count(d => d.get('isUsed', false) === true) !== selectedData.size,
          },
          {
            value: 'View more details...',
            onClick: this.handleContextClick,
          },
        ]}
      />
    );
  }
}
