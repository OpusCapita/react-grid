import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import classNames from 'classnames';

export default class ColumnItem extends React.PureComponent {
  static propTypes = {
    item: PropTypes.object.isRequired,
    handleItemClick: PropTypes.func.isRequired,
  }

  render() {
    const { item, handleItemClick } = this.props;
    const iconClassName = classNames({
      'oc-datagrid-available-columns-item-icon': true,
      'is-locked': !!item.isLocked,
    });
    return (
      <div className="oc-datagrid-available-columns-item">
        <FontAwesome
          className={iconClassName}
          name={item.isSelected ? 'check-square' : 'square-o'}
          onClick={item.isLocked ? undefined : handleItemClick}
        />
        <span className="oc-datagrid-available-columns-item-text">
          {item.name}
        </span>
      </div>
    );
  }
}
