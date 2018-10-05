var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp2;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { Cell } from 'fixed-data-table-2';
import classNames from 'classnames';
import { gridShape } from './datagrid.props';
import Utils from './datagrid.utils';

var HeaderCell = (_temp2 = _class = function (_React$PureComponent) {
  _inherits(HeaderCell, _React$PureComponent);

  function HeaderCell() {
    var _temp, _this, _ret;

    _classCallCheck(this, HeaderCell);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.onSortChange = function (e) {
      // Check if click target is in actual header table cell, not the filtering input component
      if (e.target.className !== 'public_fixedDataTableCell_cellContent' && e.target.parentElement.className !== 'public_fixedDataTableCell_cellContent') {
        return false;
      }
      if (!Utils.isSortable(_this.props.column)) return false;
      if (_this.props.isBusy) return false;
      e.preventDefault();
      var order = _this.props.currentSortColumn === Utils.getColumnKey(_this.props.column) && _this.props.currentSortOrder === 'asc' ? 'desc' : 'asc';
      if (_this.props.onSortChange) {
        _this.props.onSortChange(_this.props.grid, _this.props.columns, _this.props.column, order);
      }
      return true;
    }, _this.getFilteringComponent = function (filtering, column) {
      return filtering ? React.createElement(
        'div',
        { className: 'oc-datagrid-row-filter' },
        column.cellFilter()
      ) : null;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  HeaderCell.prototype.render = function render() {
    var _props = this.props,
        children = _props.children,
        grid = _props.grid,
        currentSortColumn = _props.currentSortColumn,
        currentSortOrder = _props.currentSortOrder,
        columns = _props.columns,
        column = _props.column,
        onSortChange = _props.onSortChange,
        isBusy = _props.isBusy,
        filtering = _props.filtering,
        props = _objectWithoutProperties(_props, ['children', 'grid', 'currentSortColumn', 'currentSortOrder', 'columns', 'column', 'onSortChange', 'isBusy', 'filtering']);

    var cellClassNames = classNames({
      'oc-datagrid-cell-header': true,
      clickable: !isBusy && Utils.isSortable(this.props.column)
    });
    return React.createElement(
      Cell,
      _extends({ className: cellClassNames, onClick: this.onSortChange }, props),
      children,
      column.isRequired && ' *',
      currentSortColumn === Utils.getColumnKey(column) && currentSortOrder && (currentSortOrder === 'desc' ? ' ↓' : ' ↑'),
      this.getFilteringComponent(filtering, column)
    );
  };

  return HeaderCell;
}(React.PureComponent), _class.propTypes = {
  children: PropTypes.node,
  grid: gridShape.isRequired,
  columns: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  column: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  currentSortColumn: PropTypes.string,
  currentSortOrder: PropTypes.string,
  onSortChange: PropTypes.func.isRequired,
  isBusy: PropTypes.bool.isRequired,
  filtering: PropTypes.bool.isRequired
}, _class.defaultProps = {
  children: '',
  currentSortOrder: null,
  currentSortColumn: null
}, _temp2);
export { HeaderCell as default };