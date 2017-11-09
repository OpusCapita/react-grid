import React from 'react';
import PropTypes from 'prop-types';
import {
  SortableContainer,
  SortableElement,
  SortableHandle } from 'react-sortable-hoc';

const DragHandle = SortableHandle(() => <span>::</span>);

const SortableItem = SortableElement(({ value }) => (
  <li>
    {value.name}
    {value.isLocked && <i className="fa fa-lock" />}
    {!value.isLocked && <i className="fa fa-trash" />}
    {!value.isLocked && <DragHandle />}
  </li>
));

const SortableList = SortableContainer(({ items }) => (
  <ul>
    {items.map((value, index) => (
      <SortableItem key={value.columnKey} index={index} value={value} />
    ))}
  </ul>
));

export default class SelectedColumnsList extends React.PureComponent {
  static propTypes = {
    items: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    onSortChange: PropTypes.func.isRequired,
  };

  render() {
    return (
      <SortableList
        items={this.props.items}
        onSortEnd={this.props.onSortChange}
        useDragHandle
      />
    );
  }
}
