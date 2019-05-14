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
    });

    _defineProperty(_assertThisInitialized(_this), "getFilteringComponent", function (filtering, column) {
      return filtering ? React.createElement("div", {
        className: "oc-datagrid-row-filter"
      }, column.cellFilter()) : null;
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
      width: width
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9oZWFkZXItY2VsbC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiQ2VsbCIsImNsYXNzTmFtZXMiLCJzdHlsZWQiLCJncmlkU2hhcGUiLCJVdGlscyIsIkhlYWRlciIsImRpdiIsInByb3BzIiwid2lkdGgiLCJIZWFkZXJMYWJlbCIsInNwYW4iLCJTeW1ib2xzIiwiY2hpbGRyZW4iLCJIZWFkZXJDZWxsIiwiZSIsInRhcmdldCIsImNsYXNzTmFtZSIsInBhcmVudEVsZW1lbnQiLCJpc1NvcnRhYmxlIiwiY29sdW1uIiwiaXNCdXN5IiwicHJldmVudERlZmF1bHQiLCJvcmRlciIsImN1cnJlbnRTb3J0Q29sdW1uIiwiZ2V0Q29sdW1uS2V5IiwiY3VycmVudFNvcnRPcmRlciIsIm9uU29ydENoYW5nZSIsImdyaWQiLCJjb2x1bW5zIiwiZmlsdGVyaW5nIiwiY2VsbEZpbHRlciIsInJlbmRlciIsImNlbGxDbGFzc05hbWVzIiwiY2xpY2thYmxlIiwicmVxdWlyZWRTeW1ib2wiLCJpc1JlcXVpcmVkIiwiaXNTb3J0ZWRCeUNvbHVtbiIsInNvcnRPcmRlciIsInN5bWJvbHMiLCJnZXRGaWx0ZXJpbmdDb21wb25lbnQiLCJQdXJlQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLFNBQVNDLElBQVQsUUFBcUIsb0JBQXJCO0FBQ0EsT0FBT0MsVUFBUCxNQUF1QixZQUF2QjtBQUNBLE9BQU9DLE1BQVAsTUFBbUIsbUJBQW5CO0FBQ0EsU0FBU0MsU0FBVCxRQUEwQixrQkFBMUI7QUFDQSxPQUFPQyxLQUFQLE1BQWtCLGtCQUFsQjtBQUVBLElBQU1DLE1BQU0sR0FBR0gsTUFBTSxDQUFDSSxHQUFWLG9CQUVELFVBQUFD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QUFnQixRQUFNRixjQUFOLEdBQXVCRyxTQUF2QixHQUFxQ0gsY0FBckU7QUFFQSxXQUNFLG9CQUFDLElBQUQ7QUFBTSxNQUFBLFNBQVMsRUFBRUYsY0FBakI7QUFBaUMsTUFBQSxPQUFPLEVBQUUsS0FBS047QUFBL0MsT0FBaUVuQixLQUFqRSxHQUNFLG9CQUFDLE1BQUQ7QUFBUSxNQUFBLEtBQUssRUFBRUM7QUFBZixPQUNFLG9CQUFDLFdBQUQ7QUFBYSxNQUFBLEtBQUssRUFBRUE7QUFBcEIsT0FBNEJJLFFBQTVCLENBREYsRUFFRSxvQkFBQyxPQUFELFFBQVUwQixPQUFWLENBRkYsQ0FERixFQUtHLEtBQUtDLHFCQUFMLENBQTJCVixTQUEzQixFQUFzQ1YsTUFBdEMsQ0FMSCxDQURGO0FBU0QsRzs7O0VBN0VxQ3JCLEtBQUssQ0FBQzBDLGE7O2dCQUF6QjNCLFUsa0JBY0c7QUFDcEJELEVBQUFBLFFBQVEsRUFBRSxFQURVO0FBRXBCYSxFQUFBQSxnQkFBZ0IsRUFBRSxJQUZFO0FBR3BCRixFQUFBQSxpQkFBaUIsRUFBRTtBQUhDLEM7O1NBZEhWLFUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IENlbGwgfSBmcm9tICdmaXhlZC1kYXRhLXRhYmxlLTInO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7IGdyaWRTaGFwZSB9IGZyb20gJy4vZGF0YWdyaWQucHJvcHMnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4vZGF0YWdyaWQudXRpbHMnO1xuXG5jb25zdCBIZWFkZXIgPSBzdHlsZWQuZGl2YFxuICAvKiBNeXN0aWNhbCAxN3B4IGNvbWVzIGZyb20gMio4cHggcGFkZGluZ3Mgb2YgcHVibGljX2ZpeGVkRGF0YVRhYmxlQ2VsbF9jZWxsQ29udGVudCBwbHVzIDFweCBib3JkZXIgd2lkdGggKi9cbiAgd2lkdGg6ICR7cHJvcHMgPT4gYGNhbGMoJHtwcm9wcy53aWR0aH1weCAtIDE3cHgpYH07XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBmbGV4LXdyYXA6IG5vd3JhcDtcbmA7XG5cbmNvbnN0IEhlYWRlckxhYmVsID0gc3R5bGVkLnNwYW5gXG4gIGZsZXg6IDAgMSBjb250ZW50O1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbmA7XG5cbmNvbnN0IFN5bWJvbHMgPSBzdHlsZWQuc3BhbmBcbiAgZmxleDogMSAwIGNvbnRlbnQ7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIG1hcmdpbi1sZWZ0OiAke3Byb3BzID0+IChwcm9wcy5jaGlsZHJlbiA/ICc1cHgnIDogJzAnKX07XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZWFkZXJDZWxsIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuICAgIGdyaWQ6IGdyaWRTaGFwZS5pc1JlcXVpcmVkLFxuICAgIGNvbHVtbnM6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L2ZvcmJpZC1wcm9wLXR5cGVzXG4gICAgY29sdW1uOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3QvZm9yYmlkLXByb3AtdHlwZXNcbiAgICBjdXJyZW50U29ydENvbHVtbjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjdXJyZW50U29ydE9yZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9uU29ydENoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBpc0J1c3k6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgZmlsdGVyaW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIHdpZHRoOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBjaGlsZHJlbjogJycsXG4gICAgY3VycmVudFNvcnRPcmRlcjogbnVsbCxcbiAgICBjdXJyZW50U29ydENvbHVtbjogbnVsbCxcbiAgfTtcblxuICBvblNvcnRDaGFuZ2UgPSAoZSkgPT4ge1xuICAgIC8vIENoZWNrIGlmIGNsaWNrIHRhcmdldCBpcyBpbiBhY3R1YWwgaGVhZGVyIHRhYmxlIGNlbGwsIG5vdCB0aGUgZmlsdGVyaW5nIGlucHV0IGNvbXBvbmVudFxuICAgIGlmIChcbiAgICAgIGUudGFyZ2V0LmNsYXNzTmFtZSAhPT0gJ3B1YmxpY19maXhlZERhdGFUYWJsZUNlbGxfY2VsbENvbnRlbnQnXG4gICAgICAmJiBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTmFtZSAhPT0gJ3B1YmxpY19maXhlZERhdGFUYWJsZUNlbGxfY2VsbENvbnRlbnQnXG4gICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghVXRpbHMuaXNTb3J0YWJsZSh0aGlzLnByb3BzLmNvbHVtbikpIHJldHVybiBmYWxzZTtcbiAgICBpZiAodGhpcy5wcm9wcy5pc0J1c3kpIHJldHVybiBmYWxzZTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3Qgb3JkZXIgPSB0aGlzLnByb3BzLmN1cnJlbnRTb3J0Q29sdW1uID09PSBVdGlscy5nZXRDb2x1bW5LZXkodGhpcy5wcm9wcy5jb2x1bW4pXG4gICAgICAmJiB0aGlzLnByb3BzLmN1cnJlbnRTb3J0T3JkZXIgPT09ICdhc2MnXG4gICAgICA/ICdkZXNjJ1xuICAgICAgOiAnYXNjJztcbiAgICBpZiAodGhpcy5wcm9wcy5vblNvcnRDaGFuZ2UpIHtcbiAgICAgIHRoaXMucHJvcHMub25Tb3J0Q2hhbmdlKHRoaXMucHJvcHMuZ3JpZCwgdGhpcy5wcm9wcy5jb2x1bW5zLCB0aGlzLnByb3BzLmNvbHVtbiwgb3JkZXIpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBnZXRGaWx0ZXJpbmdDb21wb25lbnQgPSAoZmlsdGVyaW5nLCBjb2x1bW4pID0+IChcbiAgICBmaWx0ZXJpbmcgPyA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLXJvdy1maWx0ZXJcIj57Y29sdW1uLmNlbGxGaWx0ZXIoKX08L2Rpdj4gOiBudWxsXG4gICk7XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgZ3JpZCxcbiAgICAgIGN1cnJlbnRTb3J0Q29sdW1uLFxuICAgICAgY3VycmVudFNvcnRPcmRlcixcbiAgICAgIGNvbHVtbnMsXG4gICAgICBjb2x1bW4sXG4gICAgICBvblNvcnRDaGFuZ2UsXG4gICAgICBpc0J1c3ksXG4gICAgICBmaWx0ZXJpbmcsXG4gICAgICB3aWR0aCxcbiAgICAgIC4uLnByb3BzXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgY2VsbENsYXNzTmFtZXMgPSBjbGFzc05hbWVzKHtcbiAgICAgICdvYy1kYXRhZ3JpZC1jZWxsLWhlYWRlcic6IHRydWUsXG4gICAgICBjbGlja2FibGU6ICFpc0J1c3kgJiYgVXRpbHMuaXNTb3J0YWJsZSh0aGlzLnByb3BzLmNvbHVtbiksXG4gICAgfSk7XG4gICAgY29uc3QgcmVxdWlyZWRTeW1ib2wgPSBjb2x1bW4uaXNSZXF1aXJlZCA/ICcqJyA6ICcnO1xuICAgIGNvbnN0IGlzU29ydGVkQnlDb2x1bW4gPSBjdXJyZW50U29ydENvbHVtbiA9PT0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbHVtbikgJiYgY3VycmVudFNvcnRPcmRlcjtcbiAgICBjb25zdCBzb3J0T3JkZXIgPSBjdXJyZW50U29ydE9yZGVyID09PSAnZGVzYycgPyAnIOKGkycgOiAnIOKGkSc7XG4gICAgY29uc3Qgc3ltYm9scyA9IGlzU29ydGVkQnlDb2x1bW4gPyBgJHtyZXF1aXJlZFN5bWJvbH0ke3NvcnRPcmRlcn1gIDogcmVxdWlyZWRTeW1ib2w7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENlbGwgY2xhc3NOYW1lPXtjZWxsQ2xhc3NOYW1lc30gb25DbGljaz17dGhpcy5vblNvcnRDaGFuZ2V9IHsuLi5wcm9wc30+XG4gICAgICAgIDxIZWFkZXIgd2lkdGg9e3dpZHRofT5cbiAgICAgICAgICA8SGVhZGVyTGFiZWwgd2lkdGg9e3dpZHRofT57Y2hpbGRyZW59PC9IZWFkZXJMYWJlbD5cbiAgICAgICAgICA8U3ltYm9scz57c3ltYm9sc308L1N5bWJvbHM+XG4gICAgICAgIDwvSGVhZGVyPlxuICAgICAgICB7dGhpcy5nZXRGaWx0ZXJpbmdDb21wb25lbnQoZmlsdGVyaW5nLCBjb2x1bW4pfVxuICAgICAgPC9DZWxsPlxuICAgICk7XG4gIH1cbn1cbiJdfQ==