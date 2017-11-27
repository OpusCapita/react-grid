import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {
  Modal,
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Button } from 'react-bootstrap';
import { FormattedMessage as M } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import { gridShape } from '../datagrid.props';
import AvailableColumnsList from './available-columns-list.component';
import SelectedColumnsList from './selected-columns-list.component';
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
    const availableColumns =
      ColumnSettingsUtils.getAvailableColumns(props.columns, props.visibleColumns);
    const selectedColumns =
      ColumnSettingsUtils.getSelectedColumns(props.columns, props.visibleColumns);
    this.state = {
      keyword: '',
      availableColumns,
      visibleAvailableColumns: availableColumns,
      selectedColumns,
    };
  }

  handleCancelClick = () => {
    this.props.closeColumnSettingsModal(this.props.grid);
  }

  handleOkClick = () => {
    const hiddenColumns = ColumnSettingsUtils.getHiddenColumns(this.state.availableColumns);
    const columnOrders = ColumnSettingsUtils.getColumnOrders(this.state.selectedColumns);
    this.props.saveColumnSettings(this.props.grid, hiddenColumns, columnOrders);
    this.props.closeColumnSettingsModal(this.props.grid);
  }

  handleKeywordChange = (e) => {
    const keyword = e.target.value;
    const visibleAvailableColumns =
      ColumnSettingsUtils.filterColumns(
        this.state.availableColumns,
        keyword,
      );
    this.setState({ keyword, visibleAvailableColumns });
  }

  handleSortChange = ({ oldIndex, newIndex }) => {
    const selectedColumns =
      ColumnSettingsUtils.changeColumnSort(
        this.state.selectedColumns,
        oldIndex,
        newIndex,
      );
    this.setState({ selectedColumns });
  }

  handleSelectItem = (item) => {
    // add item to right position by it's sort value
    const availableColumns = this.state.availableColumns;
    const visibleAvailableColumns = this.state.visibleAvailableColumns;
    const selectedColumns = [];
    let pushed = false;
    this.state.selectedColumns.forEach((col, i) => {
      if (!pushed && item.sort <= i) {
        selectedColumns.push(item);
        pushed = true;
      }
      selectedColumns.push(col);
    });
    if (!pushed) {
      selectedColumns.push(item);
    }
    availableColumns.forEach((col, i) => {
      if (col.columnKey === item.columnKey) {
        availableColumns[i].isSelected = true;
      }
    });
    visibleAvailableColumns.forEach((col, i) => {
      if (col.columnKey === item.columnKey) {
        visibleAvailableColumns[i].isSelected = true;
      }
    });
    this.setState({ availableColumns, visibleAvailableColumns, selectedColumns });
  }

  handleDeselectItem = (item) => {
    const availableColumns = this.state.availableColumns;
    const visibleAvailableColumns = this.state.visibleAvailableColumns;
    const selectedColumns = this.state.selectedColumns.filter(c => c.columnKey !== item.columnKey);
    availableColumns.forEach((col, i) => {
      if (col.columnKey === item.columnKey) {
        availableColumns[i].isSelected = false;
      }
    });
    visibleAvailableColumns.forEach((col, i) => {
      if (col.columnKey === item.columnKey) {
        visibleAvailableColumns[i].isSelected = false;
      }
    });
    this.setState({ availableColumns, visibleAvailableColumns, selectedColumns });
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
          <Grid fluid>
            <Row>
              <Col xs={6}>
                <FormGroup>
                  <ControlLabel><M id="GridAvailableColumns" /></ControlLabel>
                </FormGroup>
              </Col>
              <Col xs={6}>
                <FormGroup>
                  <ControlLabel><M id="GridSelectedColumns" /></ControlLabel>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <FormGroup className="oc-datagrid-column-settings-keyword-group">
                  <FormControl
                    id={`ocDatagridColumnSettings-${this.props.grid.id}-keyword`}
                    type="text"
                    name="keyword"
                    value={this.state.keyword}
                    onChange={this.handleKeywordChange}
                    className="oc-datagrid-column-settings-keyword-input"
                  />
                  <FontAwesome className="oc-datagrid-column-settings-keyword-icon" name="search" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <FormGroup>
                  <AvailableColumnsList
                    id={`ocDatagridColumnSettings-${this.props.grid.id}-available-columns`}
                    items={this.state.visibleAvailableColumns}
                    onSelectItem={this.handleSelectItem}
                    onDeselectItem={this.handleDeselectItem}
                  />
                </FormGroup>
              </Col>
              <Col xs={6}>
                <FormGroup>
                  <SelectedColumnsList
                    id={`ocDatagridColumnSettings-${this.props.grid.id}-selected-columns`}
                    items={this.state.selectedColumns}
                    onSortChange={this.handleSortChange}
                    onRemoveItem={this.handleDeselectItem}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Grid>
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
