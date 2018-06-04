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
}(_react2.default.PureComponent), _class.defaultProps = {
  children: '',
  currentSortOrder: null,
  currentSortColumn: null
}, _temp2);
exports.default = HeaderCell;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9oZWFkZXItY2VsbC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkhlYWRlckNlbGwiLCJvblNvcnRDaGFuZ2UiLCJlIiwidGFyZ2V0IiwiY2xhc3NOYW1lIiwicGFyZW50RWxlbWVudCIsIlV0aWxzIiwiaXNTb3J0YWJsZSIsInByb3BzIiwiY29sdW1uIiwiaXNCdXN5IiwicHJldmVudERlZmF1bHQiLCJvcmRlciIsImN1cnJlbnRTb3J0Q29sdW1uIiwiZ2V0Q29sdW1uS2V5IiwiY3VycmVudFNvcnRPcmRlciIsImdyaWQiLCJjb2x1bW5zIiwiZ2V0RmlsdGVyaW5nQ29tcG9uZW50IiwiZmlsdGVyaW5nIiwiY2VsbEZpbHRlciIsInJlbmRlciIsImNoaWxkcmVuIiwiY2VsbENsYXNzTmFtZXMiLCJjbGlja2FibGUiLCJpc1JlcXVpcmVkIiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLFU7Ozs7Ozs7Ozs7OztnS0FtQm5CQyxZLEdBQWUsVUFBQ0MsQ0FBRCxFQUFPO0FBQ3BCO0FBQ0EsVUFDRUEsRUFBRUMsTUFBRixDQUFTQyxTQUFULEtBQXVCLHVDQUF2QixJQUNBRixFQUFFQyxNQUFGLENBQVNFLGFBQVQsQ0FBdUJELFNBQXZCLEtBQXFDLHVDQUZ2QyxFQUdFO0FBQ0EsZUFBTyxLQUFQO0FBQ0Q7QUFDRCxVQUFJLENBQUNFLG1CQUFNQyxVQUFOLENBQWlCLE1BQUtDLEtBQUwsQ0FBV0MsTUFBNUIsQ0FBTCxFQUEwQyxPQUFPLEtBQVA7QUFDMUMsVUFBSSxNQUFLRCxLQUFMLENBQVdFLE1BQWYsRUFBdUIsT0FBTyxLQUFQO0FBQ3ZCUixRQUFFUyxjQUFGO0FBQ0EsVUFBTUMsUUFDSixNQUFLSixLQUFMLENBQVdLLGlCQUFYLEtBQWlDUCxtQkFBTVEsWUFBTixDQUFtQixNQUFLTixLQUFMLENBQVdDLE1BQTlCLENBQWpDLElBQ0EsTUFBS0QsS0FBTCxDQUFXTyxnQkFBWCxLQUFnQyxLQUZwQixHQUdWLE1BSFUsR0FHRCxLQUhiO0FBSUEsVUFBSSxNQUFLUCxLQUFMLENBQVdQLFlBQWYsRUFBNkI7QUFDM0IsY0FBS08sS0FBTCxDQUFXUCxZQUFYLENBQ0UsTUFBS08sS0FBTCxDQUFXUSxJQURiLEVBRUUsTUFBS1IsS0FBTCxDQUFXUyxPQUZiLEVBR0UsTUFBS1QsS0FBTCxDQUFXQyxNQUhiLEVBSUVHLEtBSkY7QUFNRDtBQUNELGFBQU8sSUFBUDtBQUNELEssUUFFRE0scUIsR0FBd0IsVUFBQ0MsU0FBRCxFQUFZVixNQUFaO0FBQUEsYUFDdEJVLFlBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSx3QkFBZjtBQUF5Q1YsZUFBT1csVUFBUDtBQUF6QyxPQURGLEdBQ3dFLElBRmxEO0FBQUEsSzs7O3VCQUt4QkMsTSxxQkFBUztBQUFBLGlCQVlILEtBQUtiLEtBWkY7QUFBQSxRQUVMYyxRQUZLLFVBRUxBLFFBRks7QUFBQSxRQUdMTixJQUhLLFVBR0xBLElBSEs7QUFBQSxRQUlMSCxpQkFKSyxVQUlMQSxpQkFKSztBQUFBLFFBS0xFLGdCQUxLLFVBS0xBLGdCQUxLO0FBQUEsUUFNTEUsT0FOSyxVQU1MQSxPQU5LO0FBQUEsUUFPTFIsTUFQSyxVQU9MQSxNQVBLO0FBQUEsUUFRTFIsWUFSSyxVQVFMQSxZQVJLO0FBQUEsUUFTTFMsTUFUSyxVQVNMQSxNQVRLO0FBQUEsUUFVTFMsU0FWSyxVQVVMQSxTQVZLO0FBQUEsUUFXRlgsS0FYRTs7QUFhUCxRQUFNZSxpQkFBaUIsMEJBQVc7QUFDaEMsaUNBQTJCLElBREs7QUFFaENDLGlCQUFXLENBQUNkLE1BQUQsSUFBV0osbUJBQU1DLFVBQU4sQ0FBaUIsS0FBS0MsS0FBTCxDQUFXQyxNQUE1QjtBQUZVLEtBQVgsQ0FBdkI7QUFJQSxXQUNFO0FBQUMsMEJBQUQ7QUFBQSxpQkFBTSxXQUFXYyxjQUFqQixFQUFpQyxTQUFTLEtBQUt0QixZQUEvQyxJQUFpRU8sS0FBakU7QUFDR2MsY0FESDtBQUVJYixhQUFPZ0IsVUFBUCxJQUFxQixJQUZ6QjtBQUlJWiw0QkFBc0JQLG1CQUFNUSxZQUFOLENBQW1CTCxNQUFuQixDQUF0QixJQUNBTSxnQkFEQSxLQUVDQSxxQkFBcUIsTUFBckIsR0FBOEIsSUFBOUIsR0FBcUMsSUFGdEMsQ0FKSjtBQVFHLFdBQUtHLHFCQUFMLENBQTJCQyxTQUEzQixFQUFzQ1YsTUFBdEM7QUFSSCxLQURGO0FBWUQsRzs7O0VBL0VxQ2lCLGdCQUFNQyxhLFVBYXJDQyxZLEdBQWU7QUFDcEJOLFlBQVUsRUFEVTtBQUVwQlAsb0JBQWtCLElBRkU7QUFHcEJGLHFCQUFtQjtBQUhDLEM7a0JBYkhiLFUiLCJmaWxlIjoiaGVhZGVyLWNlbGwuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBDZWxsIH0gZnJvbSAnZml4ZWQtZGF0YS10YWJsZS0yJztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHsgZ3JpZFNoYXBlIH0gZnJvbSAnLi9kYXRhZ3JpZC5wcm9wcyc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9kYXRhZ3JpZC51dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlYWRlckNlbGwgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgZ3JpZDogZ3JpZFNoYXBlLmlzUmVxdWlyZWQsXG4gICAgY29sdW1uczogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3QvZm9yYmlkLXByb3AtdHlwZXNcbiAgICBjb2x1bW46IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9mb3JiaWQtcHJvcC10eXBlc1xuICAgIGN1cnJlbnRTb3J0Q29sdW1uOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGN1cnJlbnRTb3J0T3JkZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgb25Tb3J0Q2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGlzQnVzeTogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBmaWx0ZXJpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBjaGlsZHJlbjogJycsXG4gICAgY3VycmVudFNvcnRPcmRlcjogbnVsbCxcbiAgICBjdXJyZW50U29ydENvbHVtbjogbnVsbCxcbiAgfTtcblxuICBvblNvcnRDaGFuZ2UgPSAoZSkgPT4ge1xuICAgIC8vIENoZWNrIGlmIGNsaWNrIHRhcmdldCBpcyBpbiBhY3R1YWwgaGVhZGVyIHRhYmxlIGNlbGwsIG5vdCB0aGUgZmlsdGVyaW5nIGlucHV0IGNvbXBvbmVudFxuICAgIGlmIChcbiAgICAgIGUudGFyZ2V0LmNsYXNzTmFtZSAhPT0gJ3B1YmxpY19maXhlZERhdGFUYWJsZUNlbGxfY2VsbENvbnRlbnQnICYmXG4gICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTmFtZSAhPT0gJ3B1YmxpY19maXhlZERhdGFUYWJsZUNlbGxfY2VsbENvbnRlbnQnXG4gICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghVXRpbHMuaXNTb3J0YWJsZSh0aGlzLnByb3BzLmNvbHVtbikpIHJldHVybiBmYWxzZTtcbiAgICBpZiAodGhpcy5wcm9wcy5pc0J1c3kpIHJldHVybiBmYWxzZTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3Qgb3JkZXIgPSAoXG4gICAgICB0aGlzLnByb3BzLmN1cnJlbnRTb3J0Q29sdW1uID09PSBVdGlscy5nZXRDb2x1bW5LZXkodGhpcy5wcm9wcy5jb2x1bW4pICYmXG4gICAgICB0aGlzLnByb3BzLmN1cnJlbnRTb3J0T3JkZXIgPT09ICdhc2MnXG4gICAgKSA/ICdkZXNjJyA6ICdhc2MnO1xuICAgIGlmICh0aGlzLnByb3BzLm9uU29ydENoYW5nZSkge1xuICAgICAgdGhpcy5wcm9wcy5vblNvcnRDaGFuZ2UoXG4gICAgICAgIHRoaXMucHJvcHMuZ3JpZCxcbiAgICAgICAgdGhpcy5wcm9wcy5jb2x1bW5zLFxuICAgICAgICB0aGlzLnByb3BzLmNvbHVtbixcbiAgICAgICAgb3JkZXIsXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGdldEZpbHRlcmluZ0NvbXBvbmVudCA9IChmaWx0ZXJpbmcsIGNvbHVtbikgPT4gKFxuICAgIGZpbHRlcmluZyA/XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLXJvdy1maWx0ZXJcIj57Y29sdW1uLmNlbGxGaWx0ZXIoKX08L2Rpdj4gOiBudWxsXG4gIClcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgY2hpbGRyZW4sXG4gICAgICBncmlkLFxuICAgICAgY3VycmVudFNvcnRDb2x1bW4sXG4gICAgICBjdXJyZW50U29ydE9yZGVyLFxuICAgICAgY29sdW1ucyxcbiAgICAgIGNvbHVtbixcbiAgICAgIG9uU29ydENoYW5nZSxcbiAgICAgIGlzQnVzeSxcbiAgICAgIGZpbHRlcmluZyxcbiAgICAgIC4uLnByb3BzXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgY2VsbENsYXNzTmFtZXMgPSBjbGFzc05hbWVzKHtcbiAgICAgICdvYy1kYXRhZ3JpZC1jZWxsLWhlYWRlcic6IHRydWUsXG4gICAgICBjbGlja2FibGU6ICFpc0J1c3kgJiYgVXRpbHMuaXNTb3J0YWJsZSh0aGlzLnByb3BzLmNvbHVtbiksXG4gICAgfSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxDZWxsIGNsYXNzTmFtZT17Y2VsbENsYXNzTmFtZXN9IG9uQ2xpY2s9e3RoaXMub25Tb3J0Q2hhbmdlfSB7Li4ucHJvcHN9PlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgIHsgY29sdW1uLmlzUmVxdWlyZWQgJiYgJyAqJyB9XG4gICAgICAgIHtcbiAgICAgICAgICBjdXJyZW50U29ydENvbHVtbiA9PT0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbHVtbikgJiZcbiAgICAgICAgICBjdXJyZW50U29ydE9yZGVyICYmXG4gICAgICAgICAgKGN1cnJlbnRTb3J0T3JkZXIgPT09ICdkZXNjJyA/ICcg4oaTJyA6ICcg4oaRJylcbiAgICAgICAgfVxuICAgICAgICB7dGhpcy5nZXRGaWx0ZXJpbmdDb21wb25lbnQoZmlsdGVyaW5nLCBjb2x1bW4pfVxuICAgICAgPC9DZWxsPlxuICAgICk7XG4gIH1cbn1cbiJdfQ==