"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _fixedDataTable = require("fixed-data-table-2");

var _classnames = _interopRequireDefault(require("classnames"));

var _invariant = _interopRequireDefault(require("invariant"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _datagrid = require("./datagrid.props");

var _datagrid2 = _interopRequireDefault(require("./datagrid.utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

var Header = _styledComponents["default"].div(_templateObject(), function (props) {
  return "calc(" + props.width + "px - 17px)";
});

var HeaderLabel = _styledComponents["default"].span(_templateObject2());

var Symbols = _styledComponents["default"].span(_templateObject3(), function (props) {
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
      if (!_datagrid2["default"].isSortable(_this.props.column)) return false;
      if (_this.props.isBusy) return false;
      e.preventDefault();
      var order = _this.props.currentSortColumn === _datagrid2["default"].getColumnKey(_this.props.column) && _this.props.currentSortOrder === 'asc' ? 'desc' : 'asc';

      if (_this.props.onSortChange) {
        _this.props.onSortChange(_this.props.grid, _this.props.columns, _this.props.column, order);
      }

      return true;
    });

    _defineProperty(_assertThisInitialized(_this), "getFilteringComponent", function (filtering, column) {
      if (filtering) {
        (0, _invariant["default"])(column.cellFilter, "No cellFilter for column '" + _datagrid2["default"].getColumnKey(column) + "'");
        return _react["default"].createElement("div", {
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

    var cellClassNames = (0, _classnames["default"])({
      'oc-datagrid-cell-header': true,
      clickable: !isBusy && _datagrid2["default"].isSortable(this.props.column)
    });
    var requiredSymbol = column.isRequired ? '*' : '';
    var isSortedByColumn = currentSortColumn === _datagrid2["default"].getColumnKey(column) && currentSortOrder;
    var sortOrder = currentSortOrder === 'desc' ? ' ↓' : ' ↑';
    var symbols = isSortedByColumn ? "" + requiredSymbol + sortOrder : requiredSymbol;
    return _react["default"].createElement(_fixedDataTable.Cell, _extends({
      className: cellClassNames,
      onClick: this.onSortChange
    }, props), _react["default"].createElement(Header, {
      width: width,
      className: "oc-datagrid-cell-header-text"
    }, _react["default"].createElement(HeaderLabel, {
      width: width
    }, children), _react["default"].createElement(Symbols, null, symbols)), this.getFilteringComponent(filtering, column));
  };

  return HeaderCell;
}(_react["default"].PureComponent);

exports["default"] = HeaderCell;

_defineProperty(HeaderCell, "defaultProps", {
  children: '',
  currentSortOrder: null,
  currentSortColumn: null
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9oZWFkZXItY2VsbC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkhlYWRlciIsInN0eWxlZCIsImRpdiIsInByb3BzIiwid2lkdGgiLCJIZWFkZXJMYWJlbCIsInNwYW4iLCJTeW1ib2xzIiwiY2hpbGRyZW4iLCJpc0NsYXNzTmFtZSIsImVsIiwiY2xhc3NOYW1lIiwic3BsaXQiLCJpbmNsdWRlcyIsIkhlYWRlckNlbGwiLCJlIiwib2siLCJ0YXJnZXQiLCJwYXJlbnRFbGVtZW50IiwiVXRpbHMiLCJpc1NvcnRhYmxlIiwiY29sdW1uIiwiaXNCdXN5IiwicHJldmVudERlZmF1bHQiLCJvcmRlciIsImN1cnJlbnRTb3J0Q29sdW1uIiwiZ2V0Q29sdW1uS2V5IiwiY3VycmVudFNvcnRPcmRlciIsIm9uU29ydENoYW5nZSIsImdyaWQiLCJjb2x1bW5zIiwiZmlsdGVyaW5nIiwiY2VsbEZpbHRlciIsInJlbmRlciIsImNlbGxDbGFzc05hbWVzIiwiY2xpY2thYmxlIiwicmVxdWlyZWRTeW1ib2wiLCJpc1JlcXVpcmVkIiwiaXNTb3J0ZWRCeUNvbHVtbiIsInNvcnRPcmRlciIsInN5bWJvbHMiLCJnZXRGaWx0ZXJpbmdDb21wb25lbnQiLCJSZWFjdCIsIlB1cmVDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxNQUFNLEdBQUdDLDZCQUFPQyxHQUFWLG9CQUVELFVBQUFDLEtBQUs7QUFBQSxtQkFBWUEsS0FBSyxDQUFDQyxLQUFsQjtBQUFBLENBRkosQ0FBWjs7QUFPQSxJQUFNQyxXQUFXLEdBQUdKLDZCQUFPSyxJQUFWLG9CQUFqQjs7QUFPQSxJQUFNQyxPQUFPLEdBQUdOLDZCQUFPSyxJQUFWLHFCQUdJLFVBQUFILEtBQUs7QUFBQSxT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Q0FMSCxDQURGO0FBU0QsRzs7O0VBMUZxQ3FCLGtCQUFNQyxhOzs7O2dCQUF6QjdCLFUsa0JBY0c7QUFDcEJOLEVBQUFBLFFBQVEsRUFBRSxFQURVO0FBRXBCbUIsRUFBQUEsZ0JBQWdCLEVBQUUsSUFGRTtBQUdwQkYsRUFBQUEsaUJBQWlCLEVBQUU7QUFIQyxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBDZWxsIH0gZnJvbSAnZml4ZWQtZGF0YS10YWJsZS0yJztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IGludmFyaWFudCBmcm9tICdpbnZhcmlhbnQnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgeyBncmlkU2hhcGUgfSBmcm9tICcuL2RhdGFncmlkLnByb3BzJztcbmltcG9ydCBVdGlscyBmcm9tICcuL2RhdGFncmlkLnV0aWxzJztcblxuY29uc3QgSGVhZGVyID0gc3R5bGVkLmRpdmBcbiAgLyogTXlzdGljYWwgMTdweCBjb21lcyBmcm9tIDIqOHB4IHBhZGRpbmdzIG9mIHB1YmxpY19maXhlZERhdGFUYWJsZUNlbGxfY2VsbENvbnRlbnQgcGx1cyAxcHggYm9yZGVyIHdpZHRoICovXG4gIHdpZHRoOiAke3Byb3BzID0+IGBjYWxjKCR7cHJvcHMud2lkdGh9cHggLSAxN3B4KWB9O1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgZmxleC13cmFwOiBub3dyYXA7XG5gO1xuXG5jb25zdCBIZWFkZXJMYWJlbCA9IHN0eWxlZC5zcGFuYFxuICBmbGV4OiAwIDEgY29udGVudDtcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG5gO1xuXG5jb25zdCBTeW1ib2xzID0gc3R5bGVkLnNwYW5gXG4gIGZsZXg6IDEgMCBjb250ZW50O1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBtYXJnaW4tbGVmdDogJHtwcm9wcyA9PiAocHJvcHMuY2hpbGRyZW4gPyAnNXB4JyA6ICcwJyl9O1xuYDtcblxuY29uc3QgaXNDbGFzc05hbWUgPSAoZWwsIGNsYXNzTmFtZSkgPT4ge1xuICBpZiAodHlwZW9mIGVsLmNsYXNzTmFtZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZWwuY2xhc3NOYW1lLnNwbGl0KCcgJykuaW5jbHVkZXMoY2xhc3NOYW1lKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZWFkZXJDZWxsIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuICAgIGdyaWQ6IGdyaWRTaGFwZS5pc1JlcXVpcmVkLFxuICAgIGNvbHVtbnM6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L2ZvcmJpZC1wcm9wLXR5cGVzXG4gICAgY29sdW1uOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3QvZm9yYmlkLXByb3AtdHlwZXNcbiAgICBjdXJyZW50U29ydENvbHVtbjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjdXJyZW50U29ydE9yZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9uU29ydENoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBpc0J1c3k6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgZmlsdGVyaW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIHdpZHRoOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIH1cblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGNoaWxkcmVuOiAnJyxcbiAgICBjdXJyZW50U29ydE9yZGVyOiBudWxsLFxuICAgIGN1cnJlbnRTb3J0Q29sdW1uOiBudWxsLFxuICB9XG5cbiAgb25Tb3J0Q2hhbmdlID0gKGUpID0+IHtcbiAgICAvLyBDaGVjayBpZiBjbGljayB0YXJnZXQgaXMgaW4gYWN0dWFsIGhlYWRlciB0YWJsZSBjZWxsLCBub3QgdGhlIGZpbHRlcmluZyBpbnB1dCBjb21wb25lbnRcbiAgICAvLyBGaWx0ZXJpbmcgY29tcG9uZW50IGNhbiBiZSBhbnl0aGluZyBiZWNhdXNlIG9mIGN1c3RvbSByZW5kZXJlcnNcbiAgICBsZXQgb2sgPSBpc0NsYXNzTmFtZShlLnRhcmdldCwgJ3B1YmxpY19maXhlZERhdGFUYWJsZUNlbGxfY2VsbENvbnRlbnQnKTtcbiAgICBpZiAoIW9rKSB7XG4gICAgICBvayA9IGlzQ2xhc3NOYW1lKGUudGFyZ2V0LCAncHVibGljX2ZpeGVkRGF0YVRhYmxlQ2VsbF93cmFwMycpO1xuICAgIH1cbiAgICBpZiAoIW9rKSB7XG4gICAgICBvayA9IGlzQ2xhc3NOYW1lKGUudGFyZ2V0LCAnb2MtZGF0YWdyaWQtY2VsbC1oZWFkZXItdGV4dCcpO1xuICAgIH1cbiAgICBpZiAoIW9rKSB7XG4gICAgICBvayA9IGlzQ2xhc3NOYW1lKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQsICdvYy1kYXRhZ3JpZC1jZWxsLWhlYWRlci10ZXh0Jyk7XG4gICAgfVxuICAgIGlmICghb2spIHtcbiAgICAgIG9rID0gaXNDbGFzc05hbWUoZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LCAnb2MtZGF0YWdyaWQtY2VsbC1oZWFkZXItdGV4dCcpO1xuICAgIH1cbiAgICBpZiAoIW9rKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFVdGlscy5pc1NvcnRhYmxlKHRoaXMucHJvcHMuY29sdW1uKSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICh0aGlzLnByb3BzLmlzQnVzeSkgcmV0dXJuIGZhbHNlO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBvcmRlciA9IHRoaXMucHJvcHMuY3VycmVudFNvcnRDb2x1bW4gPT09IFV0aWxzLmdldENvbHVtbktleSh0aGlzLnByb3BzLmNvbHVtbilcbiAgICAgICYmIHRoaXMucHJvcHMuY3VycmVudFNvcnRPcmRlciA9PT0gJ2FzYydcbiAgICAgID8gJ2Rlc2MnXG4gICAgICA6ICdhc2MnO1xuICAgIGlmICh0aGlzLnByb3BzLm9uU29ydENoYW5nZSkge1xuICAgICAgdGhpcy5wcm9wcy5vblNvcnRDaGFuZ2UodGhpcy5wcm9wcy5ncmlkLCB0aGlzLnByb3BzLmNvbHVtbnMsIHRoaXMucHJvcHMuY29sdW1uLCBvcmRlcik7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZ2V0RmlsdGVyaW5nQ29tcG9uZW50ID0gKGZpbHRlcmluZywgY29sdW1uKSA9PiB7XG4gICAgaWYgKGZpbHRlcmluZykge1xuICAgICAgaW52YXJpYW50KGNvbHVtbi5jZWxsRmlsdGVyLCBgTm8gY2VsbEZpbHRlciBmb3IgY29sdW1uICcke1V0aWxzLmdldENvbHVtbktleShjb2x1bW4pfSdgKTtcbiAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLXJvdy1maWx0ZXJcIj57Y29sdW1uLmNlbGxGaWx0ZXIoKX08L2Rpdj47XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgZ3JpZCxcbiAgICAgIGN1cnJlbnRTb3J0Q29sdW1uLFxuICAgICAgY3VycmVudFNvcnRPcmRlcixcbiAgICAgIGNvbHVtbnMsXG4gICAgICBjb2x1bW4sXG4gICAgICBvblNvcnRDaGFuZ2UsXG4gICAgICBpc0J1c3ksXG4gICAgICBmaWx0ZXJpbmcsXG4gICAgICB3aWR0aCxcbiAgICAgIC4uLnByb3BzXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgY2VsbENsYXNzTmFtZXMgPSBjbGFzc05hbWVzKHtcbiAgICAgICdvYy1kYXRhZ3JpZC1jZWxsLWhlYWRlcic6IHRydWUsXG4gICAgICBjbGlja2FibGU6ICFpc0J1c3kgJiYgVXRpbHMuaXNTb3J0YWJsZSh0aGlzLnByb3BzLmNvbHVtbiksXG4gICAgfSk7XG4gICAgY29uc3QgcmVxdWlyZWRTeW1ib2wgPSBjb2x1bW4uaXNSZXF1aXJlZCA/ICcqJyA6ICcnO1xuICAgIGNvbnN0IGlzU29ydGVkQnlDb2x1bW4gPSBjdXJyZW50U29ydENvbHVtbiA9PT0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbHVtbikgJiYgY3VycmVudFNvcnRPcmRlcjtcbiAgICBjb25zdCBzb3J0T3JkZXIgPSBjdXJyZW50U29ydE9yZGVyID09PSAnZGVzYycgPyAnIOKGkycgOiAnIOKGkSc7XG4gICAgY29uc3Qgc3ltYm9scyA9IGlzU29ydGVkQnlDb2x1bW4gPyBgJHtyZXF1aXJlZFN5bWJvbH0ke3NvcnRPcmRlcn1gIDogcmVxdWlyZWRTeW1ib2w7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENlbGwgY2xhc3NOYW1lPXtjZWxsQ2xhc3NOYW1lc30gb25DbGljaz17dGhpcy5vblNvcnRDaGFuZ2V9IHsuLi5wcm9wc30+XG4gICAgICAgIDxIZWFkZXIgd2lkdGg9e3dpZHRofSBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1jZWxsLWhlYWRlci10ZXh0XCI+XG4gICAgICAgICAgPEhlYWRlckxhYmVsIHdpZHRoPXt3aWR0aH0+e2NoaWxkcmVufTwvSGVhZGVyTGFiZWw+XG4gICAgICAgICAgPFN5bWJvbHM+e3N5bWJvbHN9PC9TeW1ib2xzPlxuICAgICAgICA8L0hlYWRlcj5cbiAgICAgICAge3RoaXMuZ2V0RmlsdGVyaW5nQ29tcG9uZW50KGZpbHRlcmluZywgY29sdW1uKX1cbiAgICAgIDwvQ2VsbD5cbiAgICApO1xuICB9XG59XG4iXX0=