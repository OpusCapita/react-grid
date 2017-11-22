import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import classNames from 'classnames';

export default class ColumnItem extends React.PureComponent {
  static propTypes = {
    isLocked: PropTypes.bool,
    isSelected: PropTypes.bool,
    name: PropTypes.string,
    handleItemClick: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isLocked: false,
    isSelected: true,
    name: '',
  }

  render() {
    const { isLocked, isSelected, name, handleItemClick } = this.props;
    const iconClassName = classNames({
      'oc-datagrid-available-columns-item-icon': true,
      'is-locked': !!isLocked,
    });
    return (
      <div className="oc-datagrid-available-columns-item">
        <FontAwesome
          className={iconClassName}
          name={isSelected ? 'check-square' : 'square-o'}
          onClick={isLocked ? undefined : handleItemClick}
        />
        <span className="oc-datagrid-available-columns-item-text">
          {name}
        </span>
      </div>
    );
  }
}
