import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List } from 'immutable';
import {
  Modal,
  Button } from 'react-bootstrap';
import { FormattedMessage as M } from 'react-intl';
import SelectOrderList from '@opuscapita/react-select-order-list';
import { gridShape } from '../datagrid.props';
import ColumnSettingsUtils from './column-settings.utils';
import './column-settings.component.scss';

export default class ColumnSettings extends React.PureComponent {
  static propTypes = {
    grid: gridShape.isRequired,
    columns: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    visibleColumns: ImmutablePropTypes.list.isRequired,
    closeColumnSettingsModal: PropTypes.func.isRequired,
    saveColumnSettings: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const availableData =
      ColumnSettingsUtils.getAvailableColumns(List(props.columns), props.visibleColumns);
    const selectedData =
      ColumnSettingsUtils.getSelectedColumns(availableData, props.visibleColumns);
    this.state = {
      availableData,
      selectedData,
      allSelected: false,
    };
  }

  handleCancelClick = () => {
    this.props.closeColumnSettingsModal(this.props.grid);
  }

  handleOkClick = () => {
    const columnOrders =
      ColumnSettingsUtils.getColumnOrders(this.state.selectedData);
    const hiddenColumns =
      ColumnSettingsUtils.getHiddenColumns(this.state.availableData, columnOrders);
    this.props.saveColumnSettings(this.props.grid, hiddenColumns, columnOrders);
    this.props.closeColumnSettingsModal(this.props.grid);
  }

  dataChange = (e) => {
    this.setState(e);
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
        <Modal.Header closeButton>
          <Modal.Title><M id="GridSelectColumns" /></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="oc-select-order-list">
            <SelectOrderList
              availableData={this.state.availableData}
              selectedData={this.state.selectedData}
              dataSelectionId="selectedData"
              allSelectionId="allSelected"
              availableListLabel={<M id="GridAvailableColumns" />}
              selectedListLabel={<M id="GridSelectedColumns" />}
              allLabel={<M id="GridColumnsAll" />}
              onChange={this.dataChange}
              allSelected={this.state.allSelected}
              searchPlaceholder=""
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            id={`ocDatagridColumnSettings-${this.props.grid.id}-ok-button`}
            bsStyle="primary"
            onClick={this.handleOkClick}
          >
            <M id="Ok" />
          </Button>
          <Button
            id={`ocDatagridColumnSettings-${this.props.grid.id}-cancel-button`}
            onClick={this.handleCancelClick}
          >
            <M id="Cancel" />
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
