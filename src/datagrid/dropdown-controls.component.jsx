/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { FormattedMessage as M } from 'react-intl';
import { Icon } from '@opuscapita/react-icons';

import { gridShape } from './datagrid.props';
import { DropdownMenu } from '../dropdown-menu';

import './dropdown-controls.component.scss';

export default class DropdownControls extends React.PureComponent {
  static propTypes = {
    grid: gridShape.isRequired,
    // actions
    remove: PropTypes.func.isRequired,
    toggleFiltering: PropTypes.func.isRequired,
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
    dropdownMenuItems: PropTypes.array,
    disableActions: PropTypes.bool,
  };

  static defaultProps = {
    filtering: false,
    removing: false,
    dropdownMenuItems: [],
    disableActions: false,
  };

  onRemove = () => {
    if (this.props.selectedItems.has(0)) {
      this.props.remove(this.props.grid, this.props.onRemove);
    }
  }

  toggleFiltering = () => {
    this.props.toggleFiltering(this.props.grid);
  }

  render() {
    const disabled = this.props.isBusy
                  || this.props.isCreating
                  || this.props.isEditing
                  || this.props.disableActions;
    let menuItems = [];
    if (this.props.filtering) {
      menuItems.push({
        title: 'Show filtering row',
        icon: this.props.isFiltering ?
          <Icon
            type="indicator"
            name="ok"
            width={18}
            height={18}
          /> : undefined,
        onClick: this.toggleFiltering,
      });
    }
    if (this.props.dropdownMenuItems && this.props.dropdownMenuItems.length) {
      menuItems = menuItems.concat(this.props.dropdownMenuItems);
    }
    if (this.props.removing) {
      menuItems.push({
        title: <M id="Delete" />,
        disabled: !this.props.selectedItems.has(0),
        onClick: this.onRemove,
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
