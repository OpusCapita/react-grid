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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9oZWFkZXItY2VsbC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkhlYWRlckNlbGwiLCJvblNvcnRDaGFuZ2UiLCJlIiwidGFyZ2V0IiwiY2xhc3NOYW1lIiwicGFyZW50RWxlbWVudCIsImlzU29ydGFibGUiLCJwcm9wcyIsImNvbHVtbiIsImlzQnVzeSIsInByZXZlbnREZWZhdWx0Iiwib3JkZXIiLCJjdXJyZW50U29ydENvbHVtbiIsImdldENvbHVtbktleSIsImN1cnJlbnRTb3J0T3JkZXIiLCJncmlkIiwiY29sdW1ucyIsImdldEZpbHRlcmluZ0NvbXBvbmVudCIsImZpbHRlcmluZyIsImNlbGxGaWx0ZXIiLCJyZW5kZXIiLCJjaGlsZHJlbiIsImNlbGxDbGFzc05hbWVzIiwiY2xpY2thYmxlIiwiaXNSZXF1aXJlZCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsVTs7Ozs7Ozs7Ozs7O2dLQW1CbkJDLFksR0FBZSxVQUFDQyxDQUFELEVBQU87QUFDcEI7QUFDQSxVQUNFQSxFQUFFQyxNQUFGLENBQVNDLFNBQVQsS0FBdUIsdUNBQXZCLElBQ0FGLEVBQUVDLE1BQUYsQ0FBU0UsYUFBVCxDQUF1QkQsU0FBdkIsS0FBcUMsdUNBRnZDLEVBR0U7QUFDQSxlQUFPLEtBQVA7QUFDRDtBQUNELFVBQUksQ0FBQyxtQkFBTUUsVUFBTixDQUFpQixNQUFLQyxLQUFMLENBQVdDLE1BQTVCLENBQUwsRUFBMEMsT0FBTyxLQUFQO0FBQzFDLFVBQUksTUFBS0QsS0FBTCxDQUFXRSxNQUFmLEVBQXVCLE9BQU8sS0FBUDtBQUN2QlAsUUFBRVEsY0FBRjtBQUNBLFVBQU1DLFFBQ0osTUFBS0osS0FBTCxDQUFXSyxpQkFBWCxLQUFpQyxtQkFBTUMsWUFBTixDQUFtQixNQUFLTixLQUFMLENBQVdDLE1BQTlCLENBQWpDLElBQ0EsTUFBS0QsS0FBTCxDQUFXTyxnQkFBWCxLQUFnQyxLQUZwQixHQUdWLE1BSFUsR0FHRCxLQUhiO0FBSUEsVUFBSSxNQUFLUCxLQUFMLENBQVdOLFlBQWYsRUFBNkI7QUFDM0IsY0FBS00sS0FBTCxDQUFXTixZQUFYLENBQ0UsTUFBS00sS0FBTCxDQUFXUSxJQURiLEVBRUUsTUFBS1IsS0FBTCxDQUFXUyxPQUZiLEVBR0UsTUFBS1QsS0FBTCxDQUFXQyxNQUhiLEVBSUVHLEtBSkY7QUFNRDtBQUNELGFBQU8sSUFBUDtBQUNELEssUUFFRE0scUIsR0FBd0IsVUFBQ0MsU0FBRCxFQUFZVixNQUFaO0FBQUEsYUFDdEJVLFlBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSx3QkFBZjtBQUF5Q1YsZUFBT1csVUFBUDtBQUF6QyxPQURGLEdBQ3dFLElBRmxEO0FBQUEsSzs7O3VCQUt4QkMsTSxxQkFBUztBQUFBLGlCQVlILEtBQUtiLEtBWkY7QUFBQSxRQUVMYyxRQUZLLFVBRUxBLFFBRks7QUFBQSxRQUdMTixJQUhLLFVBR0xBLElBSEs7QUFBQSxRQUlMSCxpQkFKSyxVQUlMQSxpQkFKSztBQUFBLFFBS0xFLGdCQUxLLFVBS0xBLGdCQUxLO0FBQUEsUUFNTEUsT0FOSyxVQU1MQSxPQU5LO0FBQUEsUUFPTFIsTUFQSyxVQU9MQSxNQVBLO0FBQUEsUUFRTFAsWUFSSyxVQVFMQSxZQVJLO0FBQUEsUUFTTFEsTUFUSyxVQVNMQSxNQVRLO0FBQUEsUUFVTFMsU0FWSyxVQVVMQSxTQVZLO0FBQUEsUUFXRlgsS0FYRTs7QUFhUCxRQUFNZSxpQkFBaUIsMEJBQVc7QUFDaEMsaUNBQTJCLElBREs7QUFFaENDLGlCQUFXLENBQUNkLE1BQUQsSUFBVyxtQkFBTUgsVUFBTixDQUFpQixLQUFLQyxLQUFMLENBQVdDLE1BQTVCO0FBRlUsS0FBWCxDQUF2QjtBQUlBLFdBQ0U7QUFBQTtBQUFBLGlCQUFNLFdBQVdjLGNBQWpCLEVBQWlDLFNBQVMsS0FBS3JCLFlBQS9DLElBQWlFTSxLQUFqRTtBQUNHYyxjQURIO0FBRUliLGFBQU9nQixVQUFQLElBQXFCLElBRnpCO0FBSUlaLDRCQUFzQixtQkFBTUMsWUFBTixDQUFtQkwsTUFBbkIsQ0FBdEIsSUFDQU0sZ0JBREEsS0FFQ0EscUJBQXFCLE1BQXJCLEdBQThCLElBQTlCLEdBQXFDLElBRnRDLENBSko7QUFRRyxXQUFLRyxxQkFBTCxDQUEyQkMsU0FBM0IsRUFBc0NWLE1BQXRDO0FBUkgsS0FERjtBQVlELEc7OztFQS9FcUMsZ0JBQU1pQixhLFVBYXJDQyxZLEdBQWU7QUFDcEJMLFlBQVUsRUFEVTtBQUVwQlAsb0JBQWtCLElBRkU7QUFHcEJGLHFCQUFtQjtBQUhDLEM7a0JBYkhaLFUiLCJmaWxlIjoiaGVhZGVyLWNlbGwuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuaW1wb3J0IHsgQ2VsbCB9IGZyb20gJ2ZpeGVkLWRhdGEtdGFibGUtMic7XHJcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xyXG5pbXBvcnQgeyBncmlkU2hhcGUgfSBmcm9tICcuL2RhdGFncmlkLnByb3BzJztcclxuaW1wb3J0IFV0aWxzIGZyb20gJy4vZGF0YWdyaWQudXRpbHMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVhZGVyQ2VsbCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xyXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XHJcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXHJcbiAgICBncmlkOiBncmlkU2hhcGUuaXNSZXF1aXJlZCxcclxuICAgIGNvbHVtbnM6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L2ZvcmJpZC1wcm9wLXR5cGVzXHJcbiAgICBjb2x1bW46IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9mb3JiaWQtcHJvcC10eXBlc1xyXG4gICAgY3VycmVudFNvcnRDb2x1bW46IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBjdXJyZW50U29ydE9yZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgb25Tb3J0Q2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgaXNCdXN5OiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxyXG4gICAgZmlsdGVyaW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxyXG4gIH07XHJcblxyXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBjaGlsZHJlbjogJycsXHJcbiAgICBjdXJyZW50U29ydE9yZGVyOiBudWxsLFxyXG4gICAgY3VycmVudFNvcnRDb2x1bW46IG51bGwsXHJcbiAgfTtcclxuXHJcbiAgb25Tb3J0Q2hhbmdlID0gKGUpID0+IHtcclxuICAgIC8vIENoZWNrIGlmIGNsaWNrIHRhcmdldCBpcyBpbiBhY3R1YWwgaGVhZGVyIHRhYmxlIGNlbGwsIG5vdCB0aGUgZmlsdGVyaW5nIGlucHV0IGNvbXBvbmVudFxyXG4gICAgaWYgKFxyXG4gICAgICBlLnRhcmdldC5jbGFzc05hbWUgIT09ICdwdWJsaWNfZml4ZWREYXRhVGFibGVDZWxsX2NlbGxDb250ZW50JyAmJlxyXG4gICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTmFtZSAhPT0gJ3B1YmxpY19maXhlZERhdGFUYWJsZUNlbGxfY2VsbENvbnRlbnQnXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKCFVdGlscy5pc1NvcnRhYmxlKHRoaXMucHJvcHMuY29sdW1uKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKHRoaXMucHJvcHMuaXNCdXN5KSByZXR1cm4gZmFsc2U7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zdCBvcmRlciA9IChcclxuICAgICAgdGhpcy5wcm9wcy5jdXJyZW50U29ydENvbHVtbiA9PT0gVXRpbHMuZ2V0Q29sdW1uS2V5KHRoaXMucHJvcHMuY29sdW1uKSAmJlxyXG4gICAgICB0aGlzLnByb3BzLmN1cnJlbnRTb3J0T3JkZXIgPT09ICdhc2MnXHJcbiAgICApID8gJ2Rlc2MnIDogJ2FzYyc7XHJcbiAgICBpZiAodGhpcy5wcm9wcy5vblNvcnRDaGFuZ2UpIHtcclxuICAgICAgdGhpcy5wcm9wcy5vblNvcnRDaGFuZ2UoXHJcbiAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxyXG4gICAgICAgIHRoaXMucHJvcHMuY29sdW1ucyxcclxuICAgICAgICB0aGlzLnByb3BzLmNvbHVtbixcclxuICAgICAgICBvcmRlcixcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgZ2V0RmlsdGVyaW5nQ29tcG9uZW50ID0gKGZpbHRlcmluZywgY29sdW1uKSA9PiAoXHJcbiAgICBmaWx0ZXJpbmcgP1xyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLXJvdy1maWx0ZXJcIj57Y29sdW1uLmNlbGxGaWx0ZXIoKX08L2Rpdj4gOiBudWxsXHJcbiAgKVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGNoaWxkcmVuLFxyXG4gICAgICBncmlkLFxyXG4gICAgICBjdXJyZW50U29ydENvbHVtbixcclxuICAgICAgY3VycmVudFNvcnRPcmRlcixcclxuICAgICAgY29sdW1ucyxcclxuICAgICAgY29sdW1uLFxyXG4gICAgICBvblNvcnRDaGFuZ2UsXHJcbiAgICAgIGlzQnVzeSxcclxuICAgICAgZmlsdGVyaW5nLFxyXG4gICAgICAuLi5wcm9wc1xyXG4gICAgfSA9IHRoaXMucHJvcHM7XHJcbiAgICBjb25zdCBjZWxsQ2xhc3NOYW1lcyA9IGNsYXNzTmFtZXMoe1xyXG4gICAgICAnb2MtZGF0YWdyaWQtY2VsbC1oZWFkZXInOiB0cnVlLFxyXG4gICAgICBjbGlja2FibGU6ICFpc0J1c3kgJiYgVXRpbHMuaXNTb3J0YWJsZSh0aGlzLnByb3BzLmNvbHVtbiksXHJcbiAgICB9KTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxDZWxsIGNsYXNzTmFtZT17Y2VsbENsYXNzTmFtZXN9IG9uQ2xpY2s9e3RoaXMub25Tb3J0Q2hhbmdlfSB7Li4ucHJvcHN9PlxyXG4gICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICB7IGNvbHVtbi5pc1JlcXVpcmVkICYmICcgKicgfVxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGN1cnJlbnRTb3J0Q29sdW1uID09PSBVdGlscy5nZXRDb2x1bW5LZXkoY29sdW1uKSAmJlxyXG4gICAgICAgICAgY3VycmVudFNvcnRPcmRlciAmJlxyXG4gICAgICAgICAgKGN1cnJlbnRTb3J0T3JkZXIgPT09ICdkZXNjJyA/ICcg4oaTJyA6ICcg4oaRJylcclxuICAgICAgICB9XHJcbiAgICAgICAge3RoaXMuZ2V0RmlsdGVyaW5nQ29tcG9uZW50KGZpbHRlcmluZywgY29sdW1uKX1cclxuICAgICAgPC9DZWxsPlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl19