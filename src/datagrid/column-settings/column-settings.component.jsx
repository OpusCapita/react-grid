import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Modal, Button } from 'react-bootstrap';
import { FormattedMessage as M } from 'react-intl';
import SelectOrderList from '@opuscapita/react-select-order-list';

import { gridShape } from '../datagrid.props';
import ColumnSettingsUtils from './column-settings.utils';

export default class ColumnSettings extends React.PureComponent {
  static propTypes = {
    grid: gridShape.isRequired,
    columns: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    visibleColumns: ImmutablePropTypes.list.isRequired,
    closeColumnSettingsModal: PropTypes.func.isRequired,
    saveColumnSettings: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const availableColumns = ColumnSettingsUtils.getAvailableColumns(props.columns);
    const selectedColumns = ColumnSettingsUtils
      .getSelectedColumns(props.columns, props.visibleColumns);
    this.state = {
      availableColumns,
      selectedColumns,
      allSelected: availableColumns.length === selectedColumns.length,
    };
  }

  handleCancelClick = () => {
    this.props.closeColumnSettingsModal(this.props.grid);
  }

  handleOkClick = () => {
    const hiddenColumns = ColumnSettingsUtils
      .getHiddenColumns(this.state.availableColumns, this.state.selectedColumns);
    const columnOrders = ColumnSettingsUtils.getColumnOrders(this.state.selectedColumns);
    this.props.saveColumnSettings(this.props.grid, hiddenColumns, columnOrders);
    this.props.closeColumnSettingsModal(this.props.grid);
  }

  handleSelectionChange = (data) => {
    this.setState({ allSelected: data.allSelected, selectedColumns: data.selectedData.toJS() });
  }

  render() {
    return (
      <Modal
        bsSize="large"
        dialogClassName="oc-datagrid-column-settings-modal"
        aria-labelledby="oc-datagrid-column-settings-modal"
        show
        onHide={this.handleCancelClick}
      >
        <Modal.Header>
          <Modal.Title><M id="Grid.ColumnSettings.Header" /></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SelectOrderList
            allSelected={this.state.allSelected}
            availableData={List(this.state.availableColumns)}
            id={`ocDatagridColumnSettings-${this.props.grid.id}`}
            onChange={this.handleSelectionChange}
            selectedData={List(this.state.selectedColumns)}
            translations={{
              allLabel: <M id="Grid.ColumnSettings.All" />,
              availableListLabel: <M id="Grid.ColumnSettings.AvailableColumns" />,
              selectedListLabel: <M id="Grid.ColumnSettings.SelectedColumns" />,
              searchTooltip: <M id="Grid.ColumnSettings.SearchTooltip" />,
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            id={`ocDatagridColumnSettings-${this.props.grid.id}-ok-button`}
            bsStyle="primary"
            onClick={this.handleOkClick}
          >
            <M id="Grid.Ok" />
          </Button>
          <Button
            id={`ocDatagridColumnSettings-${this.props.grid.id}-cancel-button`}
            onClick={this.handleCancelClick}
          >
            <M id="Grid.Cancel" />
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
