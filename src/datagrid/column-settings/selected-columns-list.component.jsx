import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@opuscapita/react-icons';
import ScrollBar from '@opuscapita/react-perfect-scrollbar';
import {
  SortableContainer,
  SortableElement } from 'react-sortable-hoc';

const SortableItem = SortableElement(({ value, handleItemRemove }) => (
  <div
    key={value.columnKey}
    className={`oc-datagrid-selected-columns-item${value.isLocked ? ' locked' : ''}`}
  >
    <span className="oc-datagrid-selected-columns-item-text">
      {value.name}
    </span>
    {!value.isLocked && <Icon
      type="indicator"
      name="draggingArrows"
      className="oc-datagrid-selected-columns-dragging-icon"
      width={20}
      height={20}
    />}
    {value.isLocked && <Icon
      type="indicator"
      name="locked"
      className="oc-datagrid-selected-columns-locked-icon"
      width={30}
      height={30}
    />}
    {!value.isLocked && <Icon
      type="indicator"
      name="remove"
      className="oc-datagrid-selected-columns-remove-icon"
      width={16}
      height={16}
      onClick={handleItemRemove}
    />}
  </div>
));

const SortableList = SortableContainer(({ items, handleItemRemove }) => (
  <div className="oc-datagrid-selected-columns-list">
    <ScrollBar>
      {items.map((value, index) => (
        <SortableItem
          key={value.columnKey}
          index={index}
          value={value}
          disabled={value.isLocked}
          handleItemRemove={handleItemRemove(value)}
        />
      ))}
    </ScrollBar>
  </div>
));

export default class SelectedColumnsList extends React.PureComponent {
  static propTypes = {
    items: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    onSortChange: PropTypes.func.isRequired,
    onRemoveItem: PropTypes.func.isRequired,
  };

  handleItemRemove = value => () => {
    this.props.onRemoveItem(value);
  }

  shouldCancelStart = (e) => {
    if (e.target.className.baseVal && e.target.className.baseVal.indexOf('oc-icon-remove') !== -1) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <SortableList
        items={this.props.items}
        onSortEnd={this.props.onSortChange}
        handleItemRemove={this.handleItemRemove}
        shouldCancelStart={this.shouldCancelStart}
      />
    );
  }
}
