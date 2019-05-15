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
      var ok = false;
      if (typeof e.target.className !== 'string') return false; // match cellContent area or header text

      if (e.target.className === 'public_fixedDataTableCell_cellContent' || e.target.className.split(' ')[0] === 'oc-datagrid-cell-header-text') {
        ok = true;
      } // match header-text children


      if (!ok && typeof e.target.parentElement.className === 'string' && e.target.parentElement.className.split(' ')[0] === 'oc-datagrid-cell-header-text') {
        ok = true;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9oZWFkZXItY2VsbC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiQ2VsbCIsImNsYXNzTmFtZXMiLCJpbnZhcmlhbnQiLCJzdHlsZWQiLCJncmlkU2hhcGUiLCJVdGlscyIsIkhlYWRlciIsImRpdiIsInByb3BzIiwid2lkdGgiLCJIZWFkZXJMYWJlbCIsInNwYW4iLCJTeW1ib2xzIiwiY2hpbGRyZW4iLCJIZWFkZXJDZWxsIiwiZSIsIm9rIiwidGFyZ2V0IiwiY2xhc3NOYW1lIiwic3BsaXQiLCJwYXJlbnRFbGVtZW50IiwiaXNTb3J0YWJsZSIsImNvbHVtbiIsImlzQnVzeSIsInByZXZlbnREZWZhdWx0Iiwib3JkZXIiLCJjdXJyZW50U29ydENvbHVtbiIsImdldENvbHVtbktleSIsImN1cnJlbnRTb3J0T3JkZXIiLCJvblNvcnRDaGFuZ2UiLCJncmlkIiwiY29sdW1ucyIsImZpbHRlcmluZyIsImNlbGxGaWx0ZXIiLCJyZW5kZXIiLCJjZWxsQ2xhc3NOYW1lcyIsImNsaWNrYWJsZSIsInJlcXVpcmVkU3ltYm9sIiwiaXNSZXF1aXJlZCIsImlzU29ydGVkQnlDb2x1bW4iLCJzb3J0T3JkZXIiLCJzeW1ib2xzIiwiZ2V0RmlsdGVyaW5nQ29tcG9uZW50IiwiUHVyZUNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxTQUFTQyxJQUFULFFBQXFCLG9CQUFyQjtBQUNBLE9BQU9DLFVBQVAsTUFBdUIsWUFBdkI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFdBQXRCO0FBQ0EsT0FBT0MsTUFBUCxNQUFtQixtQkFBbkI7QUFDQSxTQUFTQyxTQUFULFFBQTBCLGtCQUExQjtBQUNBLE9BQU9DLEtBQVAsTUFBa0Isa0JB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LEtBQUtDLHFCQUFMLENBQTJCVixTQUEzQixFQUFzQ1YsTUFBdEMsQ0FMSCxDQURGO0FBU0QsRzs7O0VBN0ZxQ3hCLEtBQUssQ0FBQzZDLGE7O2dCQUF6QjdCLFUsa0JBY0c7QUFDcEJELEVBQUFBLFFBQVEsRUFBRSxFQURVO0FBRXBCZSxFQUFBQSxnQkFBZ0IsRUFBRSxJQUZFO0FBR3BCRixFQUFBQSxpQkFBaUIsRUFBRTtBQUhDLEM7O1NBZEhaLFUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IENlbGwgfSBmcm9tICdmaXhlZC1kYXRhLXRhYmxlLTInO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgaW52YXJpYW50IGZyb20gJ2ludmFyaWFudCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7IGdyaWRTaGFwZSB9IGZyb20gJy4vZGF0YWdyaWQucHJvcHMnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4vZGF0YWdyaWQudXRpbHMnO1xuXG5jb25zdCBIZWFkZXIgPSBzdHlsZWQuZGl2YFxuICAvKiBNeXN0aWNhbCAxN3B4IGNvbWVzIGZyb20gMio4cHggcGFkZGluZ3Mgb2YgcHVibGljX2ZpeGVkRGF0YVRhYmxlQ2VsbF9jZWxsQ29udGVudCBwbHVzIDFweCBib3JkZXIgd2lkdGggKi9cbiAgd2lkdGg6ICR7cHJvcHMgPT4gYGNhbGMoJHtwcm9wcy53aWR0aH1weCAtIDE3cHgpYH07XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBmbGV4LXdyYXA6IG5vd3JhcDtcbmA7XG5cbmNvbnN0IEhlYWRlckxhYmVsID0gc3R5bGVkLnNwYW5gXG4gIGZsZXg6IDAgMSBjb250ZW50O1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbmA7XG5cbmNvbnN0IFN5bWJvbHMgPSBzdHlsZWQuc3BhbmBcbiAgZmxleDogMSAwIGNvbnRlbnQ7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIG1hcmdpbi1sZWZ0OiAke3Byb3BzID0+IChwcm9wcy5jaGlsZHJlbiA/ICc1cHgnIDogJzAnKX07XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZWFkZXJDZWxsIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuICAgIGdyaWQ6IGdyaWRTaGFwZS5pc1JlcXVpcmVkLFxuICAgIGNvbHVtbnM6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L2ZvcmJpZC1wcm9wLXR5cGVzXG4gICAgY29sdW1uOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3QvZm9yYmlkLXByb3AtdHlwZXNcbiAgICBjdXJyZW50U29ydENvbHVtbjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjdXJyZW50U29ydE9yZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9uU29ydENoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBpc0J1c3k6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgZmlsdGVyaW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIHdpZHRoOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIH1cblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGNoaWxkcmVuOiAnJyxcbiAgICBjdXJyZW50U29ydE9yZGVyOiBudWxsLFxuICAgIGN1cnJlbnRTb3J0Q29sdW1uOiBudWxsLFxuICB9XG5cbiAgb25Tb3J0Q2hhbmdlID0gKGUpID0+IHtcbiAgICAvLyBDaGVjayBpZiBjbGljayB0YXJnZXQgaXMgaW4gYWN0dWFsIGhlYWRlciB0YWJsZSBjZWxsLCBub3QgdGhlIGZpbHRlcmluZyBpbnB1dCBjb21wb25lbnRcbiAgICAvLyBGaWx0ZXJpbmcgY29tcG9uZW50IGNhbiBiZSBhbnl0aGluZyBiZWNhdXNlIG9mIGN1c3RvbSByZW5kZXJlcnNcbiAgICBsZXQgb2sgPSBmYWxzZTtcbiAgICBpZiAodHlwZW9mIGUudGFyZ2V0LmNsYXNzTmFtZSAhPT0gJ3N0cmluZycpIHJldHVybiBmYWxzZTtcbiAgICAvLyBtYXRjaCBjZWxsQ29udGVudCBhcmVhIG9yIGhlYWRlciB0ZXh0XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ3B1YmxpY19maXhlZERhdGFUYWJsZUNlbGxfY2VsbENvbnRlbnQnXG4gICAgICB8fCBlLnRhcmdldC5jbGFzc05hbWUuc3BsaXQoJyAnKVswXSA9PT0gJ29jLWRhdGFncmlkLWNlbGwtaGVhZGVyLXRleHQnXG4gICAgKSB7XG4gICAgICBvayA9IHRydWU7XG4gICAgfVxuICAgIC8vIG1hdGNoIGhlYWRlci10ZXh0IGNoaWxkcmVuXG4gICAgaWYgKFxuICAgICAgIW9rXG4gICAgICAmJiB0eXBlb2YgZS50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc05hbWUgPT09ICdzdHJpbmcnXG4gICAgICAmJiBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTmFtZS5zcGxpdCgnICcpWzBdID09PSAnb2MtZGF0YWdyaWQtY2VsbC1oZWFkZXItdGV4dCdcbiAgICApIHtcbiAgICAgIG9rID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKCFvaykgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghVXRpbHMuaXNTb3J0YWJsZSh0aGlzLnByb3BzLmNvbHVtbikpIHJldHVybiBmYWxzZTtcbiAgICBpZiAodGhpcy5wcm9wcy5pc0J1c3kpIHJldHVybiBmYWxzZTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3Qgb3JkZXIgPSB0aGlzLnByb3BzLmN1cnJlbnRTb3J0Q29sdW1uID09PSBVdGlscy5nZXRDb2x1bW5LZXkodGhpcy5wcm9wcy5jb2x1bW4pXG4gICAgICAmJiB0aGlzLnByb3BzLmN1cnJlbnRTb3J0T3JkZXIgPT09ICdhc2MnXG4gICAgICA/ICdkZXNjJ1xuICAgICAgOiAnYXNjJztcbiAgICBpZiAodGhpcy5wcm9wcy5vblNvcnRDaGFuZ2UpIHtcbiAgICAgIHRoaXMucHJvcHMub25Tb3J0Q2hhbmdlKHRoaXMucHJvcHMuZ3JpZCwgdGhpcy5wcm9wcy5jb2x1bW5zLCB0aGlzLnByb3BzLmNvbHVtbiwgb3JkZXIpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGdldEZpbHRlcmluZ0NvbXBvbmVudCA9IChmaWx0ZXJpbmcsIGNvbHVtbikgPT4ge1xuICAgIGlmIChmaWx0ZXJpbmcpIHtcbiAgICAgIGludmFyaWFudChjb2x1bW4uY2VsbEZpbHRlciwgYE5vIGNlbGxGaWx0ZXIgZm9yIGNvbHVtbiAnJHtVdGlscy5nZXRDb2x1bW5LZXkoY29sdW1uKX0nYCk7XG4gICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1yb3ctZmlsdGVyXCI+e2NvbHVtbi5jZWxsRmlsdGVyKCl9PC9kaXY+O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBjaGlsZHJlbixcbiAgICAgIGdyaWQsXG4gICAgICBjdXJyZW50U29ydENvbHVtbixcbiAgICAgIGN1cnJlbnRTb3J0T3JkZXIsXG4gICAgICBjb2x1bW5zLFxuICAgICAgY29sdW1uLFxuICAgICAgb25Tb3J0Q2hhbmdlLFxuICAgICAgaXNCdXN5LFxuICAgICAgZmlsdGVyaW5nLFxuICAgICAgd2lkdGgsXG4gICAgICAuLi5wcm9wc1xuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGNlbGxDbGFzc05hbWVzID0gY2xhc3NOYW1lcyh7XG4gICAgICAnb2MtZGF0YWdyaWQtY2VsbC1oZWFkZXInOiB0cnVlLFxuICAgICAgY2xpY2thYmxlOiAhaXNCdXN5ICYmIFV0aWxzLmlzU29ydGFibGUodGhpcy5wcm9wcy5jb2x1bW4pLFxuICAgIH0pO1xuICAgIGNvbnN0IHJlcXVpcmVkU3ltYm9sID0gY29sdW1uLmlzUmVxdWlyZWQgPyAnKicgOiAnJztcbiAgICBjb25zdCBpc1NvcnRlZEJ5Q29sdW1uID0gY3VycmVudFNvcnRDb2x1bW4gPT09IFV0aWxzLmdldENvbHVtbktleShjb2x1bW4pICYmIGN1cnJlbnRTb3J0T3JkZXI7XG4gICAgY29uc3Qgc29ydE9yZGVyID0gY3VycmVudFNvcnRPcmRlciA9PT0gJ2Rlc2MnID8gJyDihpMnIDogJyDihpEnO1xuICAgIGNvbnN0IHN5bWJvbHMgPSBpc1NvcnRlZEJ5Q29sdW1uID8gYCR7cmVxdWlyZWRTeW1ib2x9JHtzb3J0T3JkZXJ9YCA6IHJlcXVpcmVkU3ltYm9sO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxDZWxsIGNsYXNzTmFtZT17Y2VsbENsYXNzTmFtZXN9IG9uQ2xpY2s9e3RoaXMub25Tb3J0Q2hhbmdlfSB7Li4ucHJvcHN9PlxuICAgICAgICA8SGVhZGVyIHdpZHRoPXt3aWR0aH0gY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtY2VsbC1oZWFkZXItdGV4dFwiPlxuICAgICAgICAgIDxIZWFkZXJMYWJlbCB3aWR0aD17d2lkdGh9PntjaGlsZHJlbn08L0hlYWRlckxhYmVsPlxuICAgICAgICAgIDxTeW1ib2xzPntzeW1ib2xzfTwvU3ltYm9scz5cbiAgICAgICAgPC9IZWFkZXI+XG4gICAgICAgIHt0aGlzLmdldEZpbHRlcmluZ0NvbXBvbmVudChmaWx0ZXJpbmcsIGNvbHVtbil9XG4gICAgICA8L0NlbGw+XG4gICAgKTtcbiAgfVxufVxuIl19