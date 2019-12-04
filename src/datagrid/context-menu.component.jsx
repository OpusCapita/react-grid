/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { MenuItem } from 'react-bootstrap';
import { gridShape } from './datagrid.props';

export default class DatagridTooltip extends React.PureComponent {
  static propTypes = {
    grid: gridShape.isRequired,
    data: ImmutablePropTypes.list.isRequired,
    selectedItems: ImmutablePropTypes.list.isRequired,
    contextMenuItems: PropTypes.array,
    isVisible: PropTypes.bool.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  };

  static defaultProps = {
    contextMenuItems: null,
  }

  constructor(props) {
    super(props);
    this.menuRef = null;
    this.state = {
      top: props.y,
      left: props.x,
    };
  }

  componentDidMount() {
    this.refreshMenuPosition();
  }

  componentDidUpdate(prevProps) {
    const {
      isVisible,
      x,
      y,
    } = this.props;
    if (
      (prevProps.isVisible !== isVisible)
      || (prevProps.x !== x)
      || (prevProps.y !== y)
    ) {
      this.refreshMenuPosition();
    }
  }

  refreshMenuPosition = () => {
    const { x, y } = this.props;
    const position = {
      top: y,
      left: x,
    };
    if (this.menuRef) {
      const { innerWidth, innerHeight } = window;
      const rect = this.menuRef.getBoundingClientRect();

      if (y + rect.height > innerHeight) {
        position.top -= rect.height;
      }
      if (x + rect.width > innerWidth) {
        position.left -= rect.width;
      }
      if (position.top < 0) {
        position.top = rect.height < innerHeight ? (innerHeight - rect.height) / 2 : 0;
      }
      if (position.left < 0) {
        position.left = rect.width < innerWidth ? (innerWidth - rect.width) / 2 : 0;
      }
      this.setState(position);
    }
  }

  handleContextMenuItemClick = (onClick, selectedItems, selectedData) => () => {
    onClick(selectedItems, selectedData);
  };

  menuRef = (c) => {
    this.menu = c;
  }

  render() {
    const {
      contextMenuItems, data, grid, selectedItems,
    } = this.props;
    const { top, left } = this.state;
    const style = {
      display: 'block',
      zIndex: 10000,
      position: 'absolute',
      top: `${top}px`,
      left: `${left}px`,
    };
    const selectedData = data.filter(d => selectedItems.includes(d.getIn(grid.idKeyPath)));
    return (
      <ul
        className="dropdown-menu oc-datagrid-context-menu open"
        style={style}
        ref={(c) => { this.menuRef = c; }}
      >
        {contextMenuItems
          && contextMenuItems.map
          && contextMenuItems.map((item, i) => {
            let { disabled } = item;
            if (typeof item.disabled === 'function') {
              disabled = item.disabled(selectedItems, selectedData);
            }
            return (
              <MenuItem
                key={i} // eslint-disable-line
                header={item.header}
                divider={item.divider}
                disabled={disabled}
                title={item.title}
                onClick={
                  disabled || !item.onClick
                    ? null
                    : this.handleContextMenuItemClick(item.onClick, selectedItems, selectedData)
                }
              >
                {item.value}
              </MenuItem>
            );
          })}
      </ul>
    );
  }
}
