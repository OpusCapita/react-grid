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
}(React.PureComponent), _class.defaultProps = {
  children: '',
  currentSortOrder: null,
  currentSortColumn: null
}, _temp2);
export { HeaderCell as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9oZWFkZXItY2VsbC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiQ2VsbCIsImNsYXNzTmFtZXMiLCJncmlkU2hhcGUiLCJVdGlscyIsIkhlYWRlckNlbGwiLCJvblNvcnRDaGFuZ2UiLCJlIiwidGFyZ2V0IiwiY2xhc3NOYW1lIiwicGFyZW50RWxlbWVudCIsImlzU29ydGFibGUiLCJwcm9wcyIsImNvbHVtbiIsImlzQnVzeSIsInByZXZlbnREZWZhdWx0Iiwib3JkZXIiLCJjdXJyZW50U29ydENvbHVtbiIsImdldENvbHVtbktleSIsImN1cnJlbnRTb3J0T3JkZXIiLCJncmlkIiwiY29sdW1ucyIsImdldEZpbHRlcmluZ0NvbXBvbmVudCIsImZpbHRlcmluZyIsImNlbGxGaWx0ZXIiLCJyZW5kZXIiLCJjaGlsZHJlbiIsImNlbGxDbGFzc05hbWVzIiwiY2xpY2thYmxlIiwiaXNSZXF1aXJlZCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsU0FBU0MsSUFBVCxRQUFxQixvQkFBckI7QUFDQSxPQUFPQyxVQUFQLE1BQXVCLFlBQXZCO0FBQ0EsU0FBU0MsU0FBVCxRQUEwQixrQkFBMUI7QUFDQSxPQUFPQyxLQUFQLE1BQWtCLGtCQUFsQjs7SUFFcUJDLFU7Ozs7Ozs7Ozs7OztnS0FtQm5CQyxZLEdBQWUsVUFBQ0MsQ0FBRCxFQUFPO0FBQ3BCO0FBQ0EsVUFDRUEsRUFBRUMsTUFBRixDQUFTQyxTQUFULEtBQXVCLHVDQUF2QixJQUNBRixFQUFFQyxNQUFGLENBQVNFLGFBQVQsQ0FBdUJELFNBQXZCLEtBQXFDLHVDQUZ2QyxFQUdFO0FBQ0EsZUFBTyxLQUFQO0FBQ0Q7QUFDRCxVQUFJLENBQUNMLE1BQU1PLFVBQU4sQ0FBaUIsTUFBS0MsS0FBTCxDQUFXQyxNQUE1QixDQUFMLEVBQTBDLE9BQU8sS0FBUDtBQUMxQyxVQUFJLE1BQUtELEtBQUwsQ0FBV0UsTUFBZixFQUF1QixPQUFPLEtBQVA7QUFDdkJQLFFBQUVRLGNBQUY7QUFDQSxVQUFNQyxRQUNKLE1BQUtKLEtBQUwsQ0FBV0ssaUJBQVgsS0FBaUNiLE1BQU1jLFlBQU4sQ0FBbUIsTUFBS04sS0FBTCxDQUFXQyxNQUE5QixDQUFqQyxJQUNBLE1BQUtELEtBQUwsQ0FBV08sZ0JBQVgsS0FBZ0MsS0FGcEIsR0FHVixNQUhVLEdBR0QsS0FIYjtBQUlBLFVBQUksTUFBS1AsS0FBTCxDQUFXTixZQUFmLEVBQTZCO0FBQzNCLGNBQUtNLEtBQUwsQ0FBV04sWUFBWCxDQUNFLE1BQUtNLEtBQUwsQ0FBV1EsSUFEYixFQUVFLE1BQUtSLEtBQUwsQ0FBV1MsT0FGYixFQUdFLE1BQUtULEtBQUwsQ0FBV0MsTUFIYixFQUlFRyxLQUpGO0FBTUQ7QUFDRCxhQUFPLElBQVA7QUFDRCxLLFFBRURNLHFCLEdBQXdCLFVBQUNDLFNBQUQsRUFBWVYsTUFBWjtBQUFBLGFBQ3RCVSxZQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsd0JBQWY7QUFBeUNWLGVBQU9XLFVBQVA7QUFBekMsT0FERixHQUN3RSxJQUZsRDtBQUFBLEs7Ozt1QkFLeEJDLE0scUJBQVM7QUFBQSxpQkFZSCxLQUFLYixLQVpGO0FBQUEsUUFFTGMsUUFGSyxVQUVMQSxRQUZLO0FBQUEsUUFHTE4sSUFISyxVQUdMQSxJQUhLO0FBQUEsUUFJTEgsaUJBSkssVUFJTEEsaUJBSks7QUFBQSxRQUtMRSxnQkFMSyxVQUtMQSxnQkFMSztBQUFBLFFBTUxFLE9BTkssVUFNTEEsT0FOSztBQUFBLFFBT0xSLE1BUEssVUFPTEEsTUFQSztBQUFBLFFBUUxQLFlBUkssVUFRTEEsWUFSSztBQUFBLFFBU0xRLE1BVEssVUFTTEEsTUFUSztBQUFBLFFBVUxTLFNBVkssVUFVTEEsU0FWSztBQUFBLFFBV0ZYLEtBWEU7O0FBYVAsUUFBTWUsaUJBQWlCekIsV0FBVztBQUNoQyxpQ0FBMkIsSUFESztBQUVoQzBCLGlCQUFXLENBQUNkLE1BQUQsSUFBV1YsTUFBTU8sVUFBTixDQUFpQixLQUFLQyxLQUFMLENBQVdDLE1BQTVCO0FBRlUsS0FBWCxDQUF2QjtBQUlBLFdBQ0U7QUFBQyxVQUFEO0FBQUEsaUJBQU0sV0FBV2MsY0FBakIsRUFBaUMsU0FBUyxLQUFLckIsWUFBL0MsSUFBaUVNLEtBQWpFO0FBQ0djLGNBREg7QUFFSWIsYUFBT2dCLFVBQVAsSUFBcUIsSUFGekI7QUFJSVosNEJBQXNCYixNQUFNYyxZQUFOLENBQW1CTCxNQUFuQixDQUF0QixJQUNBTSxnQkFEQSxLQUVDQSxxQkFBcUIsTUFBckIsR0FBOEIsSUFBOUIsR0FBcUMsSUFGdEMsQ0FKSjtBQVFHLFdBQUtHLHFCQUFMLENBQTJCQyxTQUEzQixFQUFzQ1YsTUFBdEM7QUFSSCxLQURGO0FBWUQsRzs7O0VBL0VxQ2QsTUFBTStCLGEsVUFhckNDLFksR0FBZTtBQUNwQkwsWUFBVSxFQURVO0FBRXBCUCxvQkFBa0IsSUFGRTtBQUdwQkYscUJBQW1CO0FBSEMsQztTQWJIWixVIiwiZmlsZSI6ImhlYWRlci1jZWxsLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgQ2VsbCB9IGZyb20gJ2ZpeGVkLWRhdGEtdGFibGUtMic7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IGdyaWRTaGFwZSB9IGZyb20gJy4vZGF0YWdyaWQucHJvcHMnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4vZGF0YWdyaWQudXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZWFkZXJDZWxsIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuICAgIGdyaWQ6IGdyaWRTaGFwZS5pc1JlcXVpcmVkLFxuICAgIGNvbHVtbnM6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L2ZvcmJpZC1wcm9wLXR5cGVzXG4gICAgY29sdW1uOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3QvZm9yYmlkLXByb3AtdHlwZXNcbiAgICBjdXJyZW50U29ydENvbHVtbjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjdXJyZW50U29ydE9yZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9uU29ydENoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBpc0J1c3k6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgZmlsdGVyaW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgY2hpbGRyZW46ICcnLFxuICAgIGN1cnJlbnRTb3J0T3JkZXI6IG51bGwsXG4gICAgY3VycmVudFNvcnRDb2x1bW46IG51bGwsXG4gIH07XG5cbiAgb25Tb3J0Q2hhbmdlID0gKGUpID0+IHtcbiAgICAvLyBDaGVjayBpZiBjbGljayB0YXJnZXQgaXMgaW4gYWN0dWFsIGhlYWRlciB0YWJsZSBjZWxsLCBub3QgdGhlIGZpbHRlcmluZyBpbnB1dCBjb21wb25lbnRcbiAgICBpZiAoXG4gICAgICBlLnRhcmdldC5jbGFzc05hbWUgIT09ICdwdWJsaWNfZml4ZWREYXRhVGFibGVDZWxsX2NlbGxDb250ZW50JyAmJlxuICAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc05hbWUgIT09ICdwdWJsaWNfZml4ZWREYXRhVGFibGVDZWxsX2NlbGxDb250ZW50J1xuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIVV0aWxzLmlzU29ydGFibGUodGhpcy5wcm9wcy5jb2x1bW4pKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKHRoaXMucHJvcHMuaXNCdXN5KSByZXR1cm4gZmFsc2U7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IG9yZGVyID0gKFxuICAgICAgdGhpcy5wcm9wcy5jdXJyZW50U29ydENvbHVtbiA9PT0gVXRpbHMuZ2V0Q29sdW1uS2V5KHRoaXMucHJvcHMuY29sdW1uKSAmJlxuICAgICAgdGhpcy5wcm9wcy5jdXJyZW50U29ydE9yZGVyID09PSAnYXNjJ1xuICAgICkgPyAnZGVzYycgOiAnYXNjJztcbiAgICBpZiAodGhpcy5wcm9wcy5vblNvcnRDaGFuZ2UpIHtcbiAgICAgIHRoaXMucHJvcHMub25Tb3J0Q2hhbmdlKFxuICAgICAgICB0aGlzLnByb3BzLmdyaWQsXG4gICAgICAgIHRoaXMucHJvcHMuY29sdW1ucyxcbiAgICAgICAgdGhpcy5wcm9wcy5jb2x1bW4sXG4gICAgICAgIG9yZGVyLFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBnZXRGaWx0ZXJpbmdDb21wb25lbnQgPSAoZmlsdGVyaW5nLCBjb2x1bW4pID0+IChcbiAgICBmaWx0ZXJpbmcgP1xuICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1yb3ctZmlsdGVyXCI+e2NvbHVtbi5jZWxsRmlsdGVyKCl9PC9kaXY+IDogbnVsbFxuICApXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgZ3JpZCxcbiAgICAgIGN1cnJlbnRTb3J0Q29sdW1uLFxuICAgICAgY3VycmVudFNvcnRPcmRlcixcbiAgICAgIGNvbHVtbnMsXG4gICAgICBjb2x1bW4sXG4gICAgICBvblNvcnRDaGFuZ2UsXG4gICAgICBpc0J1c3ksXG4gICAgICBmaWx0ZXJpbmcsXG4gICAgICAuLi5wcm9wc1xuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGNlbGxDbGFzc05hbWVzID0gY2xhc3NOYW1lcyh7XG4gICAgICAnb2MtZGF0YWdyaWQtY2VsbC1oZWFkZXInOiB0cnVlLFxuICAgICAgY2xpY2thYmxlOiAhaXNCdXN5ICYmIFV0aWxzLmlzU29ydGFibGUodGhpcy5wcm9wcy5jb2x1bW4pLFxuICAgIH0pO1xuICAgIHJldHVybiAoXG4gICAgICA8Q2VsbCBjbGFzc05hbWU9e2NlbGxDbGFzc05hbWVzfSBvbkNsaWNrPXt0aGlzLm9uU29ydENoYW5nZX0gey4uLnByb3BzfT5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgICB7IGNvbHVtbi5pc1JlcXVpcmVkICYmICcgKicgfVxuICAgICAgICB7XG4gICAgICAgICAgY3VycmVudFNvcnRDb2x1bW4gPT09IFV0aWxzLmdldENvbHVtbktleShjb2x1bW4pICYmXG4gICAgICAgICAgY3VycmVudFNvcnRPcmRlciAmJlxuICAgICAgICAgIChjdXJyZW50U29ydE9yZGVyID09PSAnZGVzYycgPyAnIOKGkycgOiAnIOKGkScpXG4gICAgICAgIH1cbiAgICAgICAge3RoaXMuZ2V0RmlsdGVyaW5nQ29tcG9uZW50KGZpbHRlcmluZywgY29sdW1uKX1cbiAgICAgIDwvQ2VsbD5cbiAgICApO1xuICB9XG59XG4iXX0=