import React from 'react';
import PropTypes from 'prop-types';
import ReactList from 'react-list';

export default class AvailableColumnsList extends React.PureComponent {
  static propTypes = {
    items: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  renderListItem = (index) => {
    const item = this.props.items[index];
    return (
      <div
        key={item.columnKey}
      >
        <span>
          {item.name}
        </span>
      </div>
    );
  }

  render() {
    return (
      <ReactList
        itemRenderer={this.renderListItem}
        length={this.props.items.length}
        type="uniform"
      />
    );
  }
}
