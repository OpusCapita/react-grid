function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject3() {
  var data = _taggedTemplateLiteralLoose(["\n  flex: 1 0 content;\n  white-space: nowrap;\n  margin-left: ", ";\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteralLoose(["\n  flex: 0 1 content;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n  /* Mystical 17px comes from 2*8px paddings of public_fixedDataTableCell_cellContent plus 1px border width */\n  width: ", ";\n  display: inline-flex;\n  flex-wrap: nowrap;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteralLoose(strings, raw) { if (!raw) { raw = strings.slice(0); } strings.raw = raw; return strings; }

import React from 'react';
import PropTypes from 'prop-types';
import { Cell } from 'fixed-data-table-2';
import classNames from 'classnames';
import invariant from 'invariant';
import styled from 'styled-components';
import { gridShape } from './datagrid.props';
import Utils from './datagrid.utils';
var Header = styled.div(_templateObject(), function (props) {
  return "calc(" + props.width + "px - 17px)";
});
var HeaderLabel = styled.span(_templateObject2());
var Symbols = styled.span(_templateObject3(), function (props) {
  return props.children ? '5px' : '0';
});

var isClassName = function isClassName(el, className) {
  if (typeof el.className === 'string') {
    return el.className.split(' ').includes(className);
  }

  return false;
};

var HeaderCell =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(HeaderCell, _React$PureComponent);

  function HeaderCell() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "onSortChange", function (e) {
      // Check if click target is in actual header table cell, not the filtering input component
      // Filtering component can be anything because of custom renderers
      var ok = isClassName(e.target, 'public_fixedDataTableCell_cellContent');

      if (!ok) {
        ok = isClassName(e.target, 'public_fixedDataTableCell_wrap3');
      }

      if (!ok) {
        ok = isClassName(e.target, 'oc-datagrid-cell-header-text');
      }

      if (!ok) {
        ok = isClassName(e.target.parentElement, 'oc-datagrid-cell-header-text');
      }

      if (!ok) {
        ok = isClassName(e.target.parentElement.parentElement, 'oc-datagrid-cell-header-text');
      }

      if (!ok) return false;
      if (!Utils.isSortable(_this.props.column)) return false;
      if (_this.props.isBusy) return false;
      e.preventDefault();
      var order = _this.props.currentSortColumn === Utils.getColumnKey(_this.props.column) && _this.props.currentSortOrder === 'asc' ? 'desc' : 'asc';

      if (_this.props.onSortChange) {
        _this.props.onSortChange(_this.props.grid, _this.props.columns, _this.props.column, order);
      }

      return true;
    });

    _defineProperty(_assertThisInitialized(_this), "getFilteringComponent", function (filtering, column) {
      if (filtering) {
        invariant(column.cellFilter, "No cellFilter for column '" + Utils.getColumnKey(column) + "'");
        return React.createElement("div", {
          className: "oc-datagrid-row-filter"
        }, column.cellFilter());
      }

      return null;
    });

    return _this;
  }

  var _proto = HeaderCell.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        grid = _this$props.grid,
        currentSortColumn = _this$props.currentSortColumn,
        currentSortOrder = _this$props.currentSortOrder,
        columns = _this$props.columns,
        column = _this$props.column,
        onSortChange = _this$props.onSortChange,
        isBusy = _this$props.isBusy,
        filtering = _this$props.filtering,
        width = _this$props.width,
        props = _objectWithoutPropertiesLoose(_this$props, ["children", "grid", "currentSortColumn", "currentSortOrder", "columns", "column", "onSortChange", "isBusy", "filtering", "width"]);

    var cellClassNames = classNames({
      'oc-datagrid-cell-header': true,
      clickable: !isBusy && Utils.isSortable(this.props.column)
    });
    var requiredSymbol = column.isRequired ? '*' : '';
    var isSortedByColumn = currentSortColumn === Utils.getColumnKey(column) && currentSortOrder;
    var sortOrder = currentSortOrder === 'desc' ? ' ↓' : ' ↑';
    var symbols = isSortedByColumn ? "" + requiredSymbol + sortOrder : requiredSymbol;
    return React.createElement(Cell, _extends({
      className: cellClassNames,
      onClick: this.onSortChange
    }, props), React.createElement(Header, {
      width: width,
      className: "oc-datagrid-cell-header-text"
    }, React.createElement(HeaderLabel, {
      width: width
    }, children), React.createElement(Symbols, null, symbols)), this.getFilteringComponent(filtering, column));
  };

  return HeaderCell;
}(React.PureComponent);

_defineProperty(HeaderCell, "defaultProps", {
  children: '',
  currentSortOrder: null,
  currentSortColumn: null
});

export { HeaderCell as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9oZWFkZXItY2VsbC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiQ2VsbCIsImNsYXNzTmFtZXMiLCJpbnZhcmlhbnQiLCJzdHlsZWQiLCJncmlkU2hhcGUiLCJVdGlscyIsIkhlYWRlciIsImRpdiIsInByb3BzIiwid2lkdGgiLCJIZWFkZXJMYWJlbCIsInNwYW4iLCJTeW1ib2xzIiwiY2hpbGRyZW4iLCJpc0NsYXNzTmFtZSIsImVsIiwiY2xhc3NOYW1lIiwic3BsaXQiLCJpbmNsdWRlcyIsIkhlYWRlckNlbGwiLCJlIiwib2siLCJ0YXJnZXQiLCJwYXJlbnRFbGVtZW50IiwiaXNTb3J0YWJsZSIsImNvbHVtbiIsImlzQnVzeSIsInByZXZlbnREZWZhdWx0Iiwib3JkZXIiLCJjdXJyZW50U29ydENvbHVtbiIsImdldENvbHVtbktleSIsImN1cnJlbnRTb3J0T3JkZXIiLCJvblNvcnRDaGFuZ2UiLCJncmlkIiwiY29sdW1ucyIsImZpbHRlcmluZyIsImNlbGxGaWx0ZXIiLCJyZW5kZXIiLCJjZWxsQ2xhc3NOYW1lcyIsImNsaWNrYWJsZSIsInJlcXVpcmVkU3ltYm9sIiwiaXNSZXF1aXJlZCIsImlzU29ydGVkQnlDb2x1bW4iLCJzb3J0T3JkZXIiLCJzeW1ib2xzIiwiZ2V0RmlsdGVyaW5nQ29tcG9uZW50IiwiUHVyZUNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxTQUFTQyxJQUFULFFBQXFCLG9CQUFyQjtBQUNBLE9BQU9DLFVBQVAsTUFBdUIsWUFBdkI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFdBQXRCO0FBQ0EsT0FBT0MsTUFBUCxNQUFtQixtQkFBbkI7QUFDQSxTQUFTQyxTQUFULFFBQTBCLGtC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QyxJQUFEO0FBQU0sTUFBQSxTQUFTLEVBQUVGLGNBQWpCO0FBQWlDLE1BQUEsT0FBTyxFQUFFLEtBQUtOO0FBQS9DLE9BQWlFeEIsS0FBakUsR0FDRSxvQkFBQyxNQUFEO0FBQVEsTUFBQSxLQUFLLEVBQUVDLEtBQWY7QUFBc0IsTUFBQSxTQUFTLEVBQUM7QUFBaEMsT0FDRSxvQkFBQyxXQUFEO0FBQWEsTUFBQSxLQUFLLEVBQUVBO0FBQXBCLE9BQTRCSSxRQUE1QixDQURGLEVBRUUsb0JBQUMsT0FBRCxRQUFVK0IsT0FBVixDQUZGLENBREYsRUFLRyxLQUFLQyxxQkFBTCxDQUEyQlYsU0FBM0IsRUFBc0NWLE1BQXRDLENBTEgsQ0FERjtBQVNELEc7OztFQTFGcUMzQixLQUFLLENBQUNnRCxhOztnQkFBekIzQixVLGtCQWNHO0FBQ3BCTixFQUFBQSxRQUFRLEVBQUUsRUFEVTtBQUVwQmtCLEVBQUFBLGdCQUFnQixFQUFFLElBRkU7QUFHcEJGLEVBQUFBLGlCQUFpQixFQUFFO0FBSEMsQzs7U0FkSFYsVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgQ2VsbCB9IGZyb20gJ2ZpeGVkLWRhdGEtdGFibGUtMic7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBpbnZhcmlhbnQgZnJvbSAnaW52YXJpYW50JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgZ3JpZFNoYXBlIH0gZnJvbSAnLi9kYXRhZ3JpZC5wcm9wcyc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9kYXRhZ3JpZC51dGlscyc7XG5cbmNvbnN0IEhlYWRlciA9IHN0eWxlZC5kaXZgXG4gIC8qIE15c3RpY2FsIDE3cHggY29tZXMgZnJvbSAyKjhweCBwYWRkaW5ncyBvZiBwdWJsaWNfZml4ZWREYXRhVGFibGVDZWxsX2NlbGxDb250ZW50IHBsdXMgMXB4IGJvcmRlciB3aWR0aCAqL1xuICB3aWR0aDogJHtwcm9wcyA9PiBgY2FsYygke3Byb3BzLndpZHRofXB4IC0gMTdweClgfTtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGZsZXgtd3JhcDogbm93cmFwO1xuYDtcblxuY29uc3QgSGVhZGVyTGFiZWwgPSBzdHlsZWQuc3BhbmBcbiAgZmxleDogMCAxIGNvbnRlbnQ7XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuYDtcblxuY29uc3QgU3ltYm9scyA9IHN0eWxlZC5zcGFuYFxuICBmbGV4OiAxIDAgY29udGVudDtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgbWFyZ2luLWxlZnQ6ICR7cHJvcHMgPT4gKHByb3BzLmNoaWxkcmVuID8gJzVweCcgOiAnMCcpfTtcbmA7XG5cbmNvbnN0IGlzQ2xhc3NOYW1lID0gKGVsLCBjbGFzc05hbWUpID0+IHtcbiAgaWYgKHR5cGVvZiBlbC5jbGFzc05hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGVsLmNsYXNzTmFtZS5zcGxpdCgnICcpLmluY2x1ZGVzKGNsYXNzTmFtZSk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVhZGVyQ2VsbCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcbiAgICBncmlkOiBncmlkU2hhcGUuaXNSZXF1aXJlZCxcbiAgICBjb2x1bW5zOiBQcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9mb3JiaWQtcHJvcC10eXBlc1xuICAgIGNvbHVtbjogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L2ZvcmJpZC1wcm9wLXR5cGVzXG4gICAgY3VycmVudFNvcnRDb2x1bW46IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY3VycmVudFNvcnRPcmRlcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvblNvcnRDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgaXNCdXN5OiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGZpbHRlcmluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICB3aWR0aDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICB9XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBjaGlsZHJlbjogJycsXG4gICAgY3VycmVudFNvcnRPcmRlcjogbnVsbCxcbiAgICBjdXJyZW50U29ydENvbHVtbjogbnVsbCxcbiAgfVxuXG4gIG9uU29ydENoYW5nZSA9IChlKSA9PiB7XG4gICAgLy8gQ2hlY2sgaWYgY2xpY2sgdGFyZ2V0IGlzIGluIGFjdHVhbCBoZWFkZXIgdGFibGUgY2VsbCwgbm90IHRoZSBmaWx0ZXJpbmcgaW5wdXQgY29tcG9uZW50XG4gICAgLy8gRmlsdGVyaW5nIGNvbXBvbmVudCBjYW4gYmUgYW55dGhpbmcgYmVjYXVzZSBvZiBjdXN0b20gcmVuZGVyZXJzXG4gICAgbGV0IG9rID0gaXNDbGFzc05hbWUoZS50YXJnZXQsICdwdWJsaWNfZml4ZWREYXRhVGFibGVDZWxsX2NlbGxDb250ZW50Jyk7XG4gICAgaWYgKCFvaykge1xuICAgICAgb2sgPSBpc0NsYXNzTmFtZShlLnRhcmdldCwgJ3B1YmxpY19maXhlZERhdGFUYWJsZUNlbGxfd3JhcDMnKTtcbiAgICB9XG4gICAgaWYgKCFvaykge1xuICAgICAgb2sgPSBpc0NsYXNzTmFtZShlLnRhcmdldCwgJ29jLWRhdGFncmlkLWNlbGwtaGVhZGVyLXRleHQnKTtcbiAgICB9XG4gICAgaWYgKCFvaykge1xuICAgICAgb2sgPSBpc0NsYXNzTmFtZShlLnRhcmdldC5wYXJlbnRFbGVtZW50LCAnb2MtZGF0YWdyaWQtY2VsbC1oZWFkZXItdGV4dCcpO1xuICAgIH1cbiAgICBpZiAoIW9rKSB7XG4gICAgICBvayA9IGlzQ2xhc3NOYW1lKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCwgJ29jLWRhdGFncmlkLWNlbGwtaGVhZGVyLXRleHQnKTtcbiAgICB9XG4gICAgaWYgKCFvaykgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghVXRpbHMuaXNTb3J0YWJsZSh0aGlzLnByb3BzLmNvbHVtbikpIHJldHVybiBmYWxzZTtcbiAgICBpZiAodGhpcy5wcm9wcy5pc0J1c3kpIHJldHVybiBmYWxzZTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3Qgb3JkZXIgPSB0aGlzLnByb3BzLmN1cnJlbnRTb3J0Q29sdW1uID09PSBVdGlscy5nZXRDb2x1bW5LZXkodGhpcy5wcm9wcy5jb2x1bW4pXG4gICAgICAmJiB0aGlzLnByb3BzLmN1cnJlbnRTb3J0T3JkZXIgPT09ICdhc2MnXG4gICAgICA/ICdkZXNjJ1xuICAgICAgOiAnYXNjJztcbiAgICBpZiAodGhpcy5wcm9wcy5vblNvcnRDaGFuZ2UpIHtcbiAgICAgIHRoaXMucHJvcHMub25Tb3J0Q2hhbmdlKHRoaXMucHJvcHMuZ3JpZCwgdGhpcy5wcm9wcy5jb2x1bW5zLCB0aGlzLnByb3BzLmNvbHVtbiwgb3JkZXIpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGdldEZpbHRlcmluZ0NvbXBvbmVudCA9IChmaWx0ZXJpbmcsIGNvbHVtbikgPT4ge1xuICAgIGlmIChmaWx0ZXJpbmcpIHtcbiAgICAgIGludmFyaWFudChjb2x1bW4uY2VsbEZpbHRlciwgYE5vIGNlbGxGaWx0ZXIgZm9yIGNvbHVtbiAnJHtVdGlscy5nZXRDb2x1bW5LZXkoY29sdW1uKX0nYCk7XG4gICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1yb3ctZmlsdGVyXCI+e2NvbHVtbi5jZWxsRmlsdGVyKCl9PC9kaXY+O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBjaGlsZHJlbixcbiAgICAgIGdyaWQsXG4gICAgICBjdXJyZW50U29ydENvbHVtbixcbiAgICAgIGN1cnJlbnRTb3J0T3JkZXIsXG4gICAgICBjb2x1bW5zLFxuICAgICAgY29sdW1uLFxuICAgICAgb25Tb3J0Q2hhbmdlLFxuICAgICAgaXNCdXN5LFxuICAgICAgZmlsdGVyaW5nLFxuICAgICAgd2lkdGgsXG4gICAgICAuLi5wcm9wc1xuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGNlbGxDbGFzc05hbWVzID0gY2xhc3NOYW1lcyh7XG4gICAgICAnb2MtZGF0YWdyaWQtY2VsbC1oZWFkZXInOiB0cnVlLFxuICAgICAgY2xpY2thYmxlOiAhaXNCdXN5ICYmIFV0aWxzLmlzU29ydGFibGUodGhpcy5wcm9wcy5jb2x1bW4pLFxuICAgIH0pO1xuICAgIGNvbnN0IHJlcXVpcmVkU3ltYm9sID0gY29sdW1uLmlzUmVxdWlyZWQgPyAnKicgOiAnJztcbiAgICBjb25zdCBpc1NvcnRlZEJ5Q29sdW1uID0gY3VycmVudFNvcnRDb2x1bW4gPT09IFV0aWxzLmdldENvbHVtbktleShjb2x1bW4pICYmIGN1cnJlbnRTb3J0T3JkZXI7XG4gICAgY29uc3Qgc29ydE9yZGVyID0gY3VycmVudFNvcnRPcmRlciA9PT0gJ2Rlc2MnID8gJyDihpMnIDogJyDihpEnO1xuICAgIGNvbnN0IHN5bWJvbHMgPSBpc1NvcnRlZEJ5Q29sdW1uID8gYCR7cmVxdWlyZWRTeW1ib2x9JHtzb3J0T3JkZXJ9YCA6IHJlcXVpcmVkU3ltYm9sO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxDZWxsIGNsYXNzTmFtZT17Y2VsbENsYXNzTmFtZXN9IG9uQ2xpY2s9e3RoaXMub25Tb3J0Q2hhbmdlfSB7Li4ucHJvcHN9PlxuICAgICAgICA8SGVhZGVyIHdpZHRoPXt3aWR0aH0gY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtY2VsbC1oZWFkZXItdGV4dFwiPlxuICAgICAgICAgIDxIZWFkZXJMYWJlbCB3aWR0aD17d2lkdGh9PntjaGlsZHJlbn08L0hlYWRlckxhYmVsPlxuICAgICAgICAgIDxTeW1ib2xzPntzeW1ib2xzfTwvU3ltYm9scz5cbiAgICAgICAgPC9IZWFkZXI+XG4gICAgICAgIHt0aGlzLmdldEZpbHRlcmluZ0NvbXBvbmVudChmaWx0ZXJpbmcsIGNvbHVtbil9XG4gICAgICA8L0NlbGw+XG4gICAgKTtcbiAgfVxufVxuIl19