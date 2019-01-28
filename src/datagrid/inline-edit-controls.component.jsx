/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Button } from 'react-bootstrap';
import { FormattedMessage as M } from 'react-intl';
import CellToolTip from './cell-tooltip.component';
import { gridShape } from './datagrid.props';
import Utils from './datagrid.utils';
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
    afterAddItem: PropTypes.func.isRequired,
    afterEditPress: PropTypes.func.isRequired,
    afterValidationError: PropTypes.func.isRequired,
    columns: PropTypes.array.isRequired,
    disableActions: PropTypes.bool,
    disableActionsMessage: PropTypes.shape({
      messageId: PropTypes.string,
      messageValues: PropTypes.shape({}),
    }),
    disableActionSave: PropTypes.bool,
    inlineAdd: PropTypes.bool,
    tabIndex: PropTypes.number,
    data: ImmutablePropTypes.list.isRequired,
  };

  static defaultProps = {
    disableActions: false,
    disableActionsMessage: { messageId: 'Grid.DisableActionsMessage' },
    disableActionSave: false,
    inlineAdd: true,
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
    } else {
      this.props.afterValidationError();
    }
  }

  handleCancelButtonClick = () => {
    this.props.cancel(this.props.grid);
    this.props.onCancel();
  }

  handleAddButtonClick = () => {
    this.props.addNewItem(this.props.grid, Utils.getColumnDefaultValues(this.props.columns));
    this.props.afterAddItem();
  }

  handleEditButtonClick = () => {
    if (!this.props.disableActions) {
      this.props.edit(this.props.grid);
      this.props.afterEditPress();
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
        this.props.create(this.props.grid, Utils.getColumnDefaultValues(this.props.columns));
        this.props.afterAddItem();
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
      data,
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
            <M id="Grid.Save" />
          </Button>
          <Button
            disabled={isBusy || disableActions}
            onClick={this.handleCancelButtonClick}
            tabIndex={tabIndex + 2}
            id={`oc-datagrid-controls-cancel-${grid.id}`}
          >
            <M id="Grid.Cancel" />
          </Button>
          {isCreating &&
            <Button
              disabled={isBusy || disableActions}
              onClick={this.handleAddButtonClick}
              tabIndex={tabIndex + 3}
              id={`oc-datagrid-controls-add-${grid.id}`}
            >
              <M id="Grid.Add" />
            </Button>
          }
        </div>
      );
    }
    let message = {};
    if (disableActions && disableActionsMessage) {
      message = {
        infoMessage: {
          id: disableActionsMessage.messageId,
          values: disableActionsMessage.messageValues,
        },
      };
    }
    const hasData = data.size >= 1;

    return (
      <div className="oc-datagrid-inline-edit-controls">
        <CellToolTip
          id={`oc-datagrid-controls-tooltip-${grid.id}`}
          {...message}
        >
          <Button
            disabled={isBusy || !hasData}
            onClick={this.handleEditButtonClick}
            id={`oc-datagrid-controls-edit-${grid.id}`}
          >
            <M id="Grid.Edit" />
          </Button>
          {inlineAdd &&
            <Button
              disabled={isBusy}
              onClick={this.handleCreateButtonClick}
              id={`oc-datagrid-controls-create-${grid.id}`}
            >
              <M id="Grid.Add" />
            </Button>
          }
        </CellToolTip>
      </div>
    );
  }
}
