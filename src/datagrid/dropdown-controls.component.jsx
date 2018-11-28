/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FaToggleOn from 'react-icons/lib/fa/toggle-on';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { FormattedMessage as M } from 'react-intl';

import { DropdownMenu } from '@opuscapita/react-dropdown';

import { gridShape } from './datagrid.props';

import './dropdown-controls.component.scss';

const TOGGLE_ON_COLOR = '#3AA57B';
const TOGGLE_OFF_COLOR = '#67707C';
const TOGGLE_SIZE = 20;

// ToggleIconComponent
const Toggle = styled(FaToggleOn)`
  color: ${props => props.color};
  margin: ${props => props.margin || 0};
  padding: ${props => props.padding || 0};
  transform: rotate(${props => (props.rotate ? `${props.rotate}deg` : '')});
`;

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
          <Toggle color={TOGGLE_ON_COLOR} size={TOGGLE_SIZE} />
          :
          <Toggle rotate="180" color={TOGGLE_OFF_COLOR} size={TOGGLE_SIZE} />,
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
