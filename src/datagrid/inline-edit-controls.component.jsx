/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { FormattedMessage as M } from 'react-intl';
import CellToolTip from './cell-tooltip.component';
import { gridShape } from './datagrid.props';
import './inline-edit-controls.component.scss';

export default class InlineEditControls extends React.PureComponent {
  static propTypes = {
    grid: gridShape.isRequired,
    addNewItem: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    validateEditedRows: PropTypes.func.isRequired,
    validateCreatedRows: PropTypes.func.isRequired,
    isBusy: PropTypes.bool.isRequired,
    isEditing: PropTypes.bool.isRequired,
    isCreating: PropTypes.bool.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onAddClick: PropTypes.func,
    onEditClick: PropTypes.func,
    columns: PropTypes.array.isRequired,
    columnDefaultValues: PropTypes.object.isRequired,
    firstInvalidInput: PropTypes.object,
    disableActions: PropTypes.bool,
    disableActionsMessage: PropTypes.shape({
      messageId: PropTypes.string,
      messageValues: PropTypes.shape({}),
    }),
    disableActionSave: PropTypes.bool,
    inlineAdd: PropTypes.bool,
    tabIndex: PropTypes.number,
  };

  static defaultProps = {
    disableActions: false,
    disableActionsMessage: { messageId: 'GridActionsDisabledOtherGridBusy' },
    disableActionSave: false,
    inlineAdd: true,
    firstInvalidInput: null,
    onAddClick: null,
    onEditClick: null,
    tabIndex: 1,
  };

  handleSaveButtonClick = () => {
    let valid = true;
    if (this.props.isEditing) {
      valid = this.props.validateEditedRows(
        this.props.grid,
        this.props.columns,
      );
    }
    if (valid && this.props.isCreating) {
      valid = this.props.validateCreatedRows(this.props.grid, this.props.columns);
    }
    if (valid) {
      this.props.save(this.props.grid, this.props.onSave);
    } else if (this.props.firstInvalidInput) {
      this.props.firstInvalidInput.focus();
    }
  }

  handleCancelButtonClick = () => {
    this.props.cancel(this.props.grid);
    this.props.onCancel();
  }

  handleAddButtonClick = () => {
    this.props.addNewItem(this.props.grid, this.props.columnDefaultValues);
  }

  handleEditButtonClick = () => {
    if (!this.props.disableActions) {
      this.props.edit(this.props.grid);
      if (this.props.onEditClick) {
        this.props.onEditClick();
      }
    }
  }

  handleCreateButtonClick = () => {
    if (!this.props.disableActions) {
      if (this.props.onAddClick) {
        this.props.onAddClick();
      } else {
        this.props.create(this.props.grid, this.props.columnDefaultValues);
      }
    }
  }

  render() {
    const {
      disableActions,
      disableActionsMessage,
      disableActionSave,
      grid,
      inlineAdd,
      isBusy,
      isCreating,
      isEditing,
      tabIndex,
    } = this.props;
    if (isCreating || isEditing) {
      return (
        <div className="oc-datagrid-inline-edit-controls">
          <Button
            disabled={isBusy || disableActions || disableActionSave}
            onClick={this.handleSaveButtonClick}
            tabIndex={tabIndex + 1}
            id={`oc-datagrid-controls-save-${grid.id}`}
          >
            <M id="Save" />
          </Button>
          <Button
            disabled={isBusy || disableActions}
            onClick={this.handleCancelButtonClick}
            tabIndex={tabIndex + 2}
            id={`oc-datagrid-controls-cancel-${grid.id}`}
          >
            <M id="Cancel" />
          </Button>
          {isCreating &&
            <Button
              disabled={isBusy || disableActions}
              onClick={this.handleAddButtonClick}
              tabIndex={tabIndex + 3}
              id={`oc-datagrid-controls-add-${grid.id}`}
            >
              <M id="Add" />
            </Button>
          }
        </div>
      );
    }
    let message = {};
    if (disableActions && disableActionsMessage) {
      message = {
        messageId: disableActionsMessage.messageId,
        messageValues: disableActionsMessage.messageValues,
      };
    }
    return (
      <div className="oc-datagrid-inline-edit-controls">
        <CellToolTip
          id={`oc-datagrid-controls-tooltip-${grid.id}`}
          {...message}
        >
          <Button
            disabled={isBusy}
            onClick={this.handleEditButtonClick}
            id={`oc-datagrid-controls-edit-${grid.id}`}
          >
            <M id="Edit" />
          </Button>
          {inlineAdd &&
            <Button
              disabled={isBusy}
              onClick={this.handleCreateButtonClick}
              id={`oc-datagrid-controls-create-${grid.id}`}
            >
              <M id="Add" />
            </Button>
          }
        </CellToolTip>
      </div>
    );
  }
}
