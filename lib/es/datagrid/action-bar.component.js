var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './action-bar.component.scss';

var ActionBar = (_temp = _class = function (_React$PureComponent) {
  _inherits(ActionBar, _React$PureComponent);

  function ActionBar() {
    _classCallCheck(this, ActionBar);

    return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
  }

  ActionBar.prototype.render = function render() {
    var _classNames;

    var className = classNames((_classNames = {
      'oc-datagrid-actionbar': true
    }, _classNames[this.props.position] = !!this.props.position, _classNames));
    return React.createElement(
      'div',
      { className: className },
      this.props.children
    );
  };

  return ActionBar;
}(React.PureComponent), _class.propTypes = {
  children: PropTypes.node,
  position: PropTypes.oneOf(['left', 'right'])
}, _class.defaultProps = {
  children: null,
  position: 'right'
}, _temp);
export { ActionBar as default };