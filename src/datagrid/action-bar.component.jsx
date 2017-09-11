import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './action-bar.component.scss';

export default class ActionBar extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    position: PropTypes.oneOf(['left', 'right']),
  };

  static defaultProps = {
    children: null,
    position: 'right',
  };

  render() {
    const className = classNames({
      'oc-datagrid-actionbar': true,
      [this.props.position]: !!this.props.position,
    });
    return (
      <div className={className}>
        { this.props.children }
      </div>
    );
  }
}
