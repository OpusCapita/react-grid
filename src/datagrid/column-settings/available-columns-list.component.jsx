import React from 'react';
import PropTypes from 'prop-types';
import ScrollBar from '@opuscapita/react-perfect-scrollbar';
import ColumnItem from './available-columns-item.component';

export default class AvailableColumnsList extends React.PureComponent {
  static propTypes = {
    items: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  handleItemClick = item => (e) => {
    console.log('ITEM CLICK', item);
  }

  render() {
    return (
      <div className="oc-datagrid-available-columns-list">
        <ScrollBar>
          {this.props.items.map(item => (
            <ColumnItem
              key={item.columnKey}
              item={item}
              handleItemClick={this.handleItemClick(item)}
            />
          ))}
        </ScrollBar>
      </div>
    );
  }
}
