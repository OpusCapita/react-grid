var _class, _temp2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'react-bootstrap';
import { FormattedMessage as M } from 'react-intl';
import { gridShape } from './datagrid.props';
import './filtering-controls.component.scss';

var FilteringControls = (_temp2 = _class = function (_React$PureComponent) {
  _inherits(FilteringControls, _React$PureComponent);

  function FilteringControls() {
    var _temp, _this, _ret;

    _classCallCheck(this, FilteringControls);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.toggleFiltering = function () {
      _this.props.toggleFiltering(_this.props.grid);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  FilteringControls.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: 'oc-datagrid-filtering-controls' },
      React.createElement(
        Checkbox,
        {
          checked: this.props.isFiltering,
          disabled: this.props.isBusy || this.props.isCreating || this.props.isEditing,
          onChange: this.toggleFiltering,
          inline: true
        },
        React.createElement(M, { id: 'Grid.ShowFilteringRow' })
      )
    );
  };

  return FilteringControls;
}(React.PureComponent), _class.propTypes = {
  grid: gridShape.isRequired,
  isBusy: PropTypes.bool.isRequired,
  isCreating: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  isFiltering: PropTypes.bool.isRequired,
  toggleFiltering: PropTypes.func
}, _class.defaultProps = {
  toggleFiltering: function toggleFiltering() {}
}, _temp2);
export { FilteringControls as default };