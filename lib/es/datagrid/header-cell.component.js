var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp2;

var _templateObject = _taggedTemplateLiteralLoose(['\n  /* Mystical 17px comes from 2*8px paddings of public_fixedDataTableCell_cellContent plus 1px border width */\n  width: ', ';\n  display: inline-flex;\n  flex-wrap: nowrap;\n'], ['\n  /* Mystical 17px comes from 2*8px paddings of public_fixedDataTableCell_cellContent plus 1px border width */\n  width: ', ';\n  display: inline-flex;\n  flex-wrap: nowrap;\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n  flex: 0 1 content;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n'], ['\n  flex: 0 1 content;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n']),
    _templateObject3 = _taggedTemplateLiteralLoose(['\n  flex: 1 0 content;\n  white-space: nowrap;\n  margin-left: ', ';\n'], ['\n  flex: 1 0 content;\n  white-space: nowrap;\n  margin-left: ', ';\n']);

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

import React from 'react';
import PropTypes from 'prop-types';
import { Cell } from 'fixed-data-table-2';
import classNames from 'classnames';
import styled from 'styled-components';
import { gridShape } from './datagrid.props';
import Utils from './datagrid.utils';

var Header = styled.div(_templateObject, function (props) {
  return 'calc(' + props.width + 'px - 17px)';
});

var HeaderLabel = styled.span(_templateObject2);

var Symbols = styled.span(_templateObject3, function (props) {
  return props.children ? '5px' : '0';
});

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
        width = _props.width,
        props = _objectWithoutProperties(_props, ['children', 'grid', 'currentSortColumn', 'currentSortOrder', 'columns', 'column', 'onSortChange', 'isBusy', 'filtering', 'width']);

    var cellClassNames = classNames({
      'oc-datagrid-cell-header': true,
      clickable: !isBusy && Utils.isSortable(this.props.column)
    });
    var requiredSymbol = column.isRequired ? '*' : '';
    var isSortedByColumn = currentSortColumn === Utils.getColumnKey(column) && currentSortOrder;
    var sortOrder = currentSortOrder === 'desc' ? ' ↓' : ' ↑';
    var symbols = isSortedByColumn ? '' + requiredSymbol + sortOrder : requiredSymbol;

    return React.createElement(
      Cell,
      _extends({ className: cellClassNames, onClick: this.onSortChange }, props),
      React.createElement(
        Header,
        { width: width },
        React.createElement(
          HeaderLabel,
          { width: width },
          children
        ),
        React.createElement(
          Symbols,
          null,
          symbols
        )
      ),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9oZWFkZXItY2VsbC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiQ2VsbCIsImNsYXNzTmFtZXMiLCJzdHlsZWQiLCJncmlkU2hhcGUiLCJVdGlscyIsIkhlYWRlciIsImRpdiIsInByb3BzIiwid2lkdGgiLCJIZWFkZXJMYWJlbCIsInNwYW4iLCJTeW1ib2xzIiwiY2hpbGRyZW4iLCJIZWFkZXJDZWxsIiwib25Tb3J0Q2hhbmdlIiwiZSIsInRhcmdldCIsImNsYXNzTmFtZSIsInBhcmVudEVsZW1lbnQiLCJpc1NvcnRhYmxlIiwiY29sdW1uIiwiaXNCdXN5IiwicHJldmVudERlZmF1bHQiLCJvcmRlciIsImN1cnJlbnRTb3J0Q29sdW1uIiwiZ2V0Q29sdW1uS2V5IiwiY3VycmVudFNvcnRPcmRlciIsImdyaWQiLCJjb2x1bW5zIiwiZ2V0RmlsdGVyaW5nQ29tcG9uZW50IiwiZmlsdGVyaW5nIiwiY2VsbEZpbHRlciIsInJlbmRlciIsImNlbGxDbGFzc05hbWVzIiwiY2xpY2thYmxlIiwicmVxdWlyZWRTeW1ib2wiLCJpc1JlcXVpcmVkIiwiaXNTb3J0ZWRCeUNvbHVtbiIsInNvcnRPcmRlciIsInN5bWJvbHMiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLFNBQVNDLElBQVQsUUFBcUIsb0JBQXJCO0FBQ0EsT0FBT0MsVUFBUCxNQUF1QixZQUF2QjtBQUNBLE9BQU9DLE1BQVAsTUFBbUIsbUJBQW5CO0FBQ0EsU0FBU0MsU0FBVCxRQUEwQixrQkFBMUI7QUFDQSxPQUFPQyxLQUFQLE1BQWtCLGtCQUFsQjs7QUFFQSxJQUFNQyxTQUFTSCxPQUFPSSxHQUFoQixrQkFFSztBQUFBLG1CQUFpQkMsTUFBTUMsS0FB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YSxPQUFPQSxLQUFwQjtBQUE0Qkk7QUFBNUIsU0FERjtBQUVFO0FBQUMsaUJBQUQ7QUFBQTtBQUFVMkI7QUFBVjtBQUZGLE9BREY7QUFLRyxXQUFLVixxQkFBTCxDQUEyQkMsU0FBM0IsRUFBc0NWLE1BQXRDO0FBTEgsS0FERjtBQVNELEc7OztFQW5GcUN0QixNQUFNMEMsYSxVQWNyQ0MsWSxHQUFlO0FBQ3BCN0IsWUFBVSxFQURVO0FBRXBCYyxvQkFBa0IsSUFGRTtBQUdwQkYscUJBQW1CO0FBSEMsQztTQWRIWCxVIiwiZmlsZSI6ImhlYWRlci1jZWxsLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgQ2VsbCB9IGZyb20gJ2ZpeGVkLWRhdGEtdGFibGUtMic7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgZ3JpZFNoYXBlIH0gZnJvbSAnLi9kYXRhZ3JpZC5wcm9wcyc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9kYXRhZ3JpZC51dGlscyc7XG5cbmNvbnN0IEhlYWRlciA9IHN0eWxlZC5kaXZgXG4gIC8qIE15c3RpY2FsIDE3cHggY29tZXMgZnJvbSAyKjhweCBwYWRkaW5ncyBvZiBwdWJsaWNfZml4ZWREYXRhVGFibGVDZWxsX2NlbGxDb250ZW50IHBsdXMgMXB4IGJvcmRlciB3aWR0aCAqL1xuICB3aWR0aDogJHtwcm9wcyA9PiBgY2FsYygke3Byb3BzLndpZHRofXB4IC0gMTdweClgfTtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGZsZXgtd3JhcDogbm93cmFwO1xuYDtcblxuY29uc3QgSGVhZGVyTGFiZWwgPSBzdHlsZWQuc3BhbmBcbiAgZmxleDogMCAxIGNvbnRlbnQ7XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuYDtcblxuY29uc3QgU3ltYm9scyA9IHN0eWxlZC5zcGFuYFxuICBmbGV4OiAxIDAgY29udGVudDtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgbWFyZ2luLWxlZnQ6ICR7cHJvcHMgPT4gKHByb3BzLmNoaWxkcmVuID8gJzVweCcgOiAnMCcpfTtcbmA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlYWRlckNlbGwgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgZ3JpZDogZ3JpZFNoYXBlLmlzUmVxdWlyZWQsXG4gICAgY29sdW1uczogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3QvZm9yYmlkLXByb3AtdHlwZXNcbiAgICBjb2x1bW46IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9mb3JiaWQtcHJvcC10eXBlc1xuICAgIGN1cnJlbnRTb3J0Q29sdW1uOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGN1cnJlbnRTb3J0T3JkZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgb25Tb3J0Q2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGlzQnVzeTogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBmaWx0ZXJpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgd2lkdGg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGNoaWxkcmVuOiAnJyxcbiAgICBjdXJyZW50U29ydE9yZGVyOiBudWxsLFxuICAgIGN1cnJlbnRTb3J0Q29sdW1uOiBudWxsLFxuICB9O1xuXG4gIG9uU29ydENoYW5nZSA9IChlKSA9PiB7XG4gICAgLy8gQ2hlY2sgaWYgY2xpY2sgdGFyZ2V0IGlzIGluIGFjdHVhbCBoZWFkZXIgdGFibGUgY2VsbCwgbm90IHRoZSBmaWx0ZXJpbmcgaW5wdXQgY29tcG9uZW50XG4gICAgaWYgKFxuICAgICAgZS50YXJnZXQuY2xhc3NOYW1lICE9PSAncHVibGljX2ZpeGVkRGF0YVRhYmxlQ2VsbF9jZWxsQ29udGVudCcgJiZcbiAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NOYW1lICE9PSAncHVibGljX2ZpeGVkRGF0YVRhYmxlQ2VsbF9jZWxsQ29udGVudCdcbiAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCFVdGlscy5pc1NvcnRhYmxlKHRoaXMucHJvcHMuY29sdW1uKSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICh0aGlzLnByb3BzLmlzQnVzeSkgcmV0dXJuIGZhbHNlO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBvcmRlciA9IChcbiAgICAgIHRoaXMucHJvcHMuY3VycmVudFNvcnRDb2x1bW4gPT09IFV0aWxzLmdldENvbHVtbktleSh0aGlzLnByb3BzLmNvbHVtbikgJiZcbiAgICAgIHRoaXMucHJvcHMuY3VycmVudFNvcnRPcmRlciA9PT0gJ2FzYydcbiAgICApID8gJ2Rlc2MnIDogJ2FzYyc7XG4gICAgaWYgKHRoaXMucHJvcHMub25Tb3J0Q2hhbmdlKSB7XG4gICAgICB0aGlzLnByb3BzLm9uU29ydENoYW5nZShcbiAgICAgICAgdGhpcy5wcm9wcy5ncmlkLFxuICAgICAgICB0aGlzLnByb3BzLmNvbHVtbnMsXG4gICAgICAgIHRoaXMucHJvcHMuY29sdW1uLFxuICAgICAgICBvcmRlcixcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZ2V0RmlsdGVyaW5nQ29tcG9uZW50ID0gKGZpbHRlcmluZywgY29sdW1uKSA9PiAoXG4gICAgZmlsdGVyaW5nID9cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtcm93LWZpbHRlclwiPntjb2x1bW4uY2VsbEZpbHRlcigpfTwvZGl2PiA6IG51bGxcbiAgKVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBjaGlsZHJlbixcbiAgICAgIGdyaWQsXG4gICAgICBjdXJyZW50U29ydENvbHVtbixcbiAgICAgIGN1cnJlbnRTb3J0T3JkZXIsXG4gICAgICBjb2x1bW5zLFxuICAgICAgY29sdW1uLFxuICAgICAgb25Tb3J0Q2hhbmdlLFxuICAgICAgaXNCdXN5LFxuICAgICAgZmlsdGVyaW5nLFxuICAgICAgd2lkdGgsXG4gICAgICAuLi5wcm9wc1xuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGNlbGxDbGFzc05hbWVzID0gY2xhc3NOYW1lcyh7XG4gICAgICAnb2MtZGF0YWdyaWQtY2VsbC1oZWFkZXInOiB0cnVlLFxuICAgICAgY2xpY2thYmxlOiAhaXNCdXN5ICYmIFV0aWxzLmlzU29ydGFibGUodGhpcy5wcm9wcy5jb2x1bW4pLFxuICAgIH0pO1xuICAgIGNvbnN0IHJlcXVpcmVkU3ltYm9sID0gY29sdW1uLmlzUmVxdWlyZWQgPyAnKicgOiAnJztcbiAgICBjb25zdCBpc1NvcnRlZEJ5Q29sdW1uID0gY3VycmVudFNvcnRDb2x1bW4gPT09IFV0aWxzLmdldENvbHVtbktleShjb2x1bW4pICYmIGN1cnJlbnRTb3J0T3JkZXI7XG4gICAgY29uc3Qgc29ydE9yZGVyID0gY3VycmVudFNvcnRPcmRlciA9PT0gJ2Rlc2MnID8gJyDihpMnIDogJyDihpEnO1xuICAgIGNvbnN0IHN5bWJvbHMgPSBpc1NvcnRlZEJ5Q29sdW1uID8gYCR7cmVxdWlyZWRTeW1ib2x9JHtzb3J0T3JkZXJ9YCA6IHJlcXVpcmVkU3ltYm9sO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxDZWxsIGNsYXNzTmFtZT17Y2VsbENsYXNzTmFtZXN9IG9uQ2xpY2s9e3RoaXMub25Tb3J0Q2hhbmdlfSB7Li4ucHJvcHN9PlxuICAgICAgICA8SGVhZGVyIHdpZHRoPXt3aWR0aH0+XG4gICAgICAgICAgPEhlYWRlckxhYmVsIHdpZHRoPXt3aWR0aH0+e2NoaWxkcmVufTwvSGVhZGVyTGFiZWw+XG4gICAgICAgICAgPFN5bWJvbHM+e3N5bWJvbHN9PC9TeW1ib2xzPlxuICAgICAgICA8L0hlYWRlcj5cbiAgICAgICAge3RoaXMuZ2V0RmlsdGVyaW5nQ29tcG9uZW50KGZpbHRlcmluZywgY29sdW1uKX1cbiAgICAgIDwvQ2VsbD5cbiAgICApO1xuICB9XG59XG4iXX0=