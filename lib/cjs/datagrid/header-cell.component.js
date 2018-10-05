'use strict';

exports.__esModule = true;
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _fixedDataTable = require('fixed-data-table-2');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _datagrid = require('./datagrid.props');

var _datagrid2 = require('./datagrid.utils');

var _datagrid3 = _interopRequireDefault(_datagrid2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
      if (!_datagrid3.default.isSortable(_this.props.column)) return false;
      if (_this.props.isBusy) return false;
      e.preventDefault();
      var order = _this.props.currentSortColumn === _datagrid3.default.getColumnKey(_this.props.column) && _this.props.currentSortOrder === 'asc' ? 'desc' : 'asc';
      if (_this.props.onSortChange) {
        _this.props.onSortChange(_this.props.grid, _this.props.columns, _this.props.column, order);
      }
      return true;
    }, _this.getFilteringComponent = function (filtering, column) {
      return filtering ? _react2.default.createElement(
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

    var cellClassNames = (0, _classnames2.default)({
      'oc-datagrid-cell-header': true,
      clickable: !isBusy && _datagrid3.default.isSortable(this.props.column)
    });
    return _react2.default.createElement(
      _fixedDataTable.Cell,
      _extends({ className: cellClassNames, onClick: this.onSortChange }, props),
      children,
      column.isRequired && ' *',
      currentSortColumn === _datagrid3.default.getColumnKey(column) && currentSortOrder && (currentSortOrder === 'desc' ? ' ↓' : ' ↑'),
      this.getFilteringComponent(filtering, column)
    );
  };

  return HeaderCell;
}(_react2.default.PureComponent), _class.propTypes = {
  children: _propTypes2.default.node,
  grid: _datagrid.gridShape.isRequired,
  columns: _propTypes2.default.array.isRequired, // eslint-disable-line react/forbid-prop-types
  column: _propTypes2.default.object.isRequired, // eslint-disable-line react/forbid-prop-types
  currentSortColumn: _propTypes2.default.string,
  currentSortOrder: _propTypes2.default.string,
  onSortChange: _propTypes2.default.func.isRequired,
  isBusy: _propTypes2.default.bool.isRequired,
  filtering: _propTypes2.default.bool.isRequired
}, _class.defaultProps = {
  children: '',
  currentSortOrder: null,
  currentSortColumn: null
}, _temp2);
exports.default = HeaderCell;