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
import { arrayMove } from 'react-sortable-hoc';
import { FormattedMessage as M } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import { gridShape } from '../datagrid.props';
import Utils from '../datagrid.utils';
import AvailableColumnsList from './available-columns-list.component';
import SelectedColumnsList from './selected-columns-list.component';
import './column-settings.component.scss';

const getInitialColumnData = (columns, columnConfig) => {
  const availableColumns = [];
  let selectedColumns = []; // eslint-disable-line prefer-const
  columns.forEach((col) => {
    const columnKey = Utils.getColumnKey(col);
    const name = col.header;
    const isLocked = col.isLocked;
    const colConfig = columnConfig.get(columnKey);
    const isSelected = colConfig ? !colConfig.get('isHidden') : true;
    availableColumns.push({
      columnKey,
      name,
      isLocked,
      isSelected,
    });
    if (isSelected) {
      selectedColumns.push({
        columnKey,
        name: col.header,
        isLocked: col.isLocked,
        sort: colConfig.get('order', 0),
      });
    }
  });
  selectedColumns.sort((a, b) =>
    // eslint-disable-next-line no-nested-ternary
    (a.sort === b.sort ? 0 : (a.sort < b.sort ? -1 : 1)),
  );
  return {
    availableColumns,
    selectedColumns,
  };
};

export default class ColumnSettings extends React.PureComponent {
  static propTypes = {
    grid: gridShape.isRequired,
    columns: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    columnConfig: ImmutablePropTypes.map.isRequired,
    closeColumnSettingsModal: PropTypes.func.isRequired,
    saveColumnSettings: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const cols = getInitialColumnData(props.columns, props.columnConfig);
    this.state = {
      keyword: '',
      availableColumns: cols.availableColumns,
      selectedColumns: cols.selectedColumns,
    };
  }

  handleCancelClick = () => {
    this.props.closeColumnSettingsModal(this.props.grid);
  }

  handleOkClick = () => {
    this.props.saveColumnSettings(this.props.grid);
    this.props.closeColumnSettingsModal(this.props.grid);
  }

  handleKeywordChange = (e) => {
    const value = e.target.value;
    console.log('Keyword change', value);
  }

  handleSortChange = ({ oldIndex, newIndex }) => {
    let changeOverLockedItems = false;
    if (oldIndex + 1 < newIndex) {
      for (let i = oldIndex; i < newIndex; i += 1) {
        if (this.state.selectedColumns[i] && this.state.selectedColumns[i].isLocked) {
          changeOverLockedItems = true;
        }
      }
    }
    if (oldIndex > newIndex + 1) {
      for (let i = oldIndex; i > newIndex; i -= 1) {
        if (this.state.selectedColumns[i] && this.state.selectedColumns[i].isLocked) {
          changeOverLockedItems = true;
        }
      }
    }
    let selectedColumns = [];
    if (changeOverLockedItems) {
      // Swap items if sorting is done over locked item to keep it in place
      let i = this.state.selectedColumns.length;
      while (i > 0) {
        i -= 1;
        selectedColumns[i] = this.state.selectedColumns[i];
      }
      selectedColumns[oldIndex] = this.state.selectedColumns[newIndex];
      selectedColumns[newIndex] = this.state.selectedColumns[oldIndex];
    } else {
      // Normal sorting move all other items up/down
      selectedColumns = arrayMove(this.state.selectedColumns, oldIndex, newIndex);
    }
    this.setState({ selectedColumns });
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
          <Modal.Title><M id="SelectColumns" /></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Grid fluid>
            <Row>
              <Col xs={6}>
                <FormGroup>
                  <ControlLabel><M id="AvailableColumns" /></ControlLabel>
                </FormGroup>
              </Col>
              <Col xs={6}>
                <FormGroup>
                  <ControlLabel><M id="SelectedColumns" /></ControlLabel>
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
                    items={this.state.availableColumns}
                  />
                </FormGroup>
              </Col>
              <Col xs={6}>
                <FormGroup>
                  <SelectedColumnsList
                    id={`ocDatagridColumnSettings-${this.props.grid.id}-selected-columns`}
                    items={this.state.selectedColumns}
                    onSortChange={this.handleSortChange}
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
            <M id="OK" />
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
