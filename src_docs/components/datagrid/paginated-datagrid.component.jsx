/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, Map, fromJS } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { DropdownButton, Form, Button, MenuItem } from 'react-bootstrap';
import { Datagrid, DatagridActions } from '../../../src/index';
import Utils from '../../../src/datagrid/datagrid.utils';
import { getLocaleFormatData } from '../../services/internationalization.service';
import { PAGINATION_GRID as GRID, columns, getData, REGIONS } from './datagrid.constants';
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
    // pagination
    pageSize: PropTypes.number,
    totalSize: PropTypes.number,
  };

  static defaultProps = {
    pageSize: 50,
    totalSize: 100,
  }

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
      totalSize: 100,
    };
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

  filter = (filterData, data) => {
    const filteredData = fromJS(data).filter((row) => {
      let hits = 0;
      filterData.forEach((filterValue, filterColumn) => {
        columns.forEach((column) => {
          if (Utils.getColumnKey(column) === filterColumn) {
            const value = row.getIn(column.valueKeyPath);
            if (value || value === 0 || value === false) {
              const filterMatcher = Utils.getFilterMatcher(column, GRID.dateFormat);
              if (filterMatcher(row, filterValue)) {
                hits += 1;
              }
            }
          }
        });
      });
      return hits === filterData.size;
    }).toJS();
    return filteredData;
  }

  sort = (sortColumn, sortOrder, data) => {
    let column;
    columns.forEach((col) => {
      if (Utils.getColumnKey(col) === sortColumn) {
        column = col;
      }
    });
    if (!column) return false;
    const comparator = Utils.getSortComparator(column);
    const valueGetter = Utils.getSortValueGetter(column);
    const valueEmptyChecker = Utils.getValueEmptyChecker(column);
    return fromJS(data).sort((a, b) => {
      const valA = valueGetter(a);
      const valB = valueGetter(b);
      if (sortOrder === 'asc') {
        if (valueEmptyChecker(valA)) return -1;
        if (valueEmptyChecker(valB)) return 1;
        return comparator(valA, valB);
      }
      if (valueEmptyChecker(valA)) return 1;
      if (valueEmptyChecker(valB)) return -1;
      return comparator(valB, valA);
    }).toJS();
  }

  requestData = (offset, count, filters, sortColumn, sortOrder) => {
    const { totalSize } = this.props;
    let data = getData(totalSize);
    if (filters && !filters.isEmpty()) {
      data = this.filter(filters, data);
    }
    if (sortColumn) {
      data = this.sort(sortColumn, sortOrder, data);
    }
    this.setState({ totalSize: data.length });
    console.log(`offset ${offset} count ${count} filters ${JSON.stringify(filters)} sortColumn ${sortColumn} sortOder ${sortOrder}`);
    const paginatedData = data.slice(offset, offset + count);
    this.props.setData(GRID, columns, paginatedData);
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
    const { pageSize } = this.props;
    const { totalSize } = this.state;
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
        pagination={{
          pageSize,
          totalSize,
          getData: this.requestData,
        }}
      />
    );
  }
}
