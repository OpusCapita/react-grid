import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map } from 'immutable';
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
import { gridShape } from '../datagrid.props';
import Utils from '../datagrid.utils';
import AvailableColumnsList from './available-columns-list.component';
import SelectedColumnsList from './selected-columns-list.component';

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
        sort: colConfig.get('sort', 0),
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
    this.setState({
      selectedColumns: arrayMove(this.state.selectedColumns, oldIndex, newIndex),
    });
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
          <Grid>
            <Row>
              <Col xs={6}>
                <FormGroup controlId={`ocDatagridColumnSettings-${this.props.grid.id}-keyword-input`}>
                  <ControlLabel><M id="AvailableColumns" /></ControlLabel>
                  <FormControl
                    type="input"
                    value={this.state.keyword}
                    onChange={this.handleKeywordChange}
                  />
                  <AvailableColumnsList
                    items={this.state.availableColumns}
                  />
                </FormGroup>
              </Col>
              <Col xs={6}>
                <FormGroup controlId="selected-columns">
                  <ControlLabel><M id="SelectedColumns" /></ControlLabel>
                  <SelectedColumnsList
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
