/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { FormattedMessage as M } from 'react-intl';
import { Icon } from '@opuscapita/react-icons';
import { DropdownMenu } from '@opuscapita/react-dropdown';

import { gridShape } from './datagrid.props';


import './dropdown-controls.component.scss';

export default class DropdownControls extends React.PureComponent {
  static propTypes = {
    grid: gridShape.isRequired,
    // actions
    toggleFiltering: PropTypes.func.isRequired,
    openColumnSettingsModal: PropTypes.func.isRequired,
    // data
    selectedItems: ImmutablePropTypes.list.isRequired,
    isBusy: PropTypes.bool.isRequired,
    isCreating: PropTypes.bool.isRequired,
    isEditing: PropTypes.bool.isRequired,
    isFiltering: PropTypes.bool.isRequired,
    // config
    onRemove: PropTypes.func.isRequired,
    filtering: PropTypes.bool,
    removing: PropTypes.bool,
    columnSettings: PropTypes.bool,
    dropdownMenuItems: PropTypes.array,
    disableActions: PropTypes.bool,
  };

  static defaultProps = {
    filtering: false,
    removing: false,
    columnSettings: false,
    dropdownMenuItems: [],
    disableActions: false,
  };

  handleRemoveClick = () => {
    if (this.props.selectedItems.size > 0) {
      this.props.onRemove();
    }
  }

  handleToggleFilteringClick = () => {
    this.props.toggleFiltering(this.props.grid);
  }

  handleColumnSettingsClick = () => {
    this.props.openColumnSettingsModal(this.props.grid);
  }

  render() {
    const disabled = this.props.isBusy
                  || this.props.isCreating
                  || this.props.isEditing
                  || this.props.disableActions;
    let menuItems = [];
    if (this.props.filtering) {
      menuItems.push({
        id: `${this.props.grid.id}-menu-item-filtering`,
        title: <M id="Grid.ShowFilteringRow" />,
        icon: this.props.isFiltering ?
          <Icon
            type="indicator"
            name="ok"
            width={18}
            height={18}
            style={{ padding: '4px' }}
          /> : undefined,
        onClick: this.handleToggleFilteringClick,
      });
    }
    if (this.props.dropdownMenuItems && this.props.dropdownMenuItems.length) {
      menuItems = menuItems.concat(this.props.dropdownMenuItems);
    }
    if (this.props.columnSettings) {
      menuItems.push({
        id: `${this.props.grid.id}-menu-item-column-settings`,
        title: <M id="Grid.ColumnSettings" />,
        onClick: this.handleColumnSettingsClick,
      });
    }
    if (this.props.removing) {
      menuItems.push({
        id: `${this.props.grid.id}-menu-item-delete`,
        title: <M id="Grid.Delete" />,
        disabled: !this.props.selectedItems.has(0),
        onClick: this.handleRemoveClick,
      });
    }
    return (
      <DropdownMenu
        id={this.props.grid.id}
        disabled={disabled}
        menuItems={menuItems}
      />
    );
  }
}
