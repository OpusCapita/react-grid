"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _fixedDataTable = require("fixed-data-table-2");

var _classnames = _interopRequireDefault(require("classnames"));

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
      return filtering ? _react["default"].createElement("div", {
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
      width: width
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9oZWFkZXItY2VsbC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkhlYWRlciIsInN0eWxlZCIsImRpdiIsInByb3BzIiwid2lkdGgiLCJIZWFkZXJMYWJlbCIsInNwYW4iLCJTeW1ib2xzIiwiY2hpbGRyZW4iLCJIZWFkZXJDZWxsIiwiZSIsInRhcmdldCIsImNsYXNzTmFtZSIsInBhcmVudEVsZW1lbnQiLCJVdGlscyIsImlzU29ydGFibGUiLCJjb2x1bW4iLCJpc0J1c3kiLCJwcmV2ZW50RGVmYXVsdCIsIm9yZGVyIiwiY3VycmVudFNvcnRDb2x1bW4iLCJnZXRDb2x1bW5LZXkiLCJjdXJyZW50U29ydE9yZGVyIiwib25Tb3J0Q2hhbmdlIiwiZ3JpZCIsImNvbHVtbnMiLCJmaWx0ZXJpbmciLCJjZWxsRmlsdGVyIiwicmVuZGVyIiwiY2VsbENsYXNzTmFtZXMiLCJjbGlja2FibGUiLCJyZXF1aXJlZFN5bWJvbCIsImlzUmVxdWlyZWQiLCJpc1NvcnRlZEJ5Q29sdW1uIiwic29ydE9yZGVyIiwic3ltYm9scyIsImdldEZpbHRlcmluZ0NvbXBvbmVudCIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLE1BQU0sR0FBR0MsNkJBQU9DLEdBQVYsb0JBRUQsVUFBQUMsS0FBSztBQUFBLG1CQUFZQSxLQUFLLENBQUNDLEtBQWxCO0FBQUEsQ0FGSixDQUFaOztBQU9BLElBQU1DLFdBQVcsR0FBR0osNkJBQU9LLElBQVYsb0JBQWpCOztBQU9BLElBQU1DLE9BQU8sR0FBR04sNkJBQU9LLElBQVYscUJBR0ksVUFBQUgsS0FBSztBQUFBLFNBQUtBLEtBQUssQ0FBQ0ssUUFBTixHQUFpQixLQUFqQixHQUF5QixHQUE5QjtBQUFB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QUE1QixDQURGLEVBRUUsZ0NBQUMsT0FBRCxRQUFVMkIsT0FBVixDQUZGLENBREYsRUFLRyxLQUFLQyxxQkFBTCxDQUEyQlYsU0FBM0IsRUFBc0NWLE1BQXRDLENBTEgsQ0FERjtBQVNELEc7OztFQTdFcUNxQixrQkFBTUMsYTs7OztnQkFBekI3QixVLGtCQWNHO0FBQ3BCRCxFQUFBQSxRQUFRLEVBQUUsRUFEVTtBQUVwQmMsRUFBQUEsZ0JBQWdCLEVBQUUsSUFGRTtBQUdwQkYsRUFBQUEsaUJBQWlCLEVBQUU7QUFIQyxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBDZWxsIH0gZnJvbSAnZml4ZWQtZGF0YS10YWJsZS0yJztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgeyBncmlkU2hhcGUgfSBmcm9tICcuL2RhdGFncmlkLnByb3BzJztcbmltcG9ydCBVdGlscyBmcm9tICcuL2RhdGFncmlkLnV0aWxzJztcblxuY29uc3QgSGVhZGVyID0gc3R5bGVkLmRpdmBcbiAgLyogTXlzdGljYWwgMTdweCBjb21lcyBmcm9tIDIqOHB4IHBhZGRpbmdzIG9mIHB1YmxpY19maXhlZERhdGFUYWJsZUNlbGxfY2VsbENvbnRlbnQgcGx1cyAxcHggYm9yZGVyIHdpZHRoICovXG4gIHdpZHRoOiAke3Byb3BzID0+IGBjYWxjKCR7cHJvcHMud2lkdGh9cHggLSAxN3B4KWB9O1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgZmxleC13cmFwOiBub3dyYXA7XG5gO1xuXG5jb25zdCBIZWFkZXJMYWJlbCA9IHN0eWxlZC5zcGFuYFxuICBmbGV4OiAwIDEgY29udGVudDtcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG5gO1xuXG5jb25zdCBTeW1ib2xzID0gc3R5bGVkLnNwYW5gXG4gIGZsZXg6IDEgMCBjb250ZW50O1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBtYXJnaW4tbGVmdDogJHtwcm9wcyA9PiAocHJvcHMuY2hpbGRyZW4gPyAnNXB4JyA6ICcwJyl9O1xuYDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVhZGVyQ2VsbCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcbiAgICBncmlkOiBncmlkU2hhcGUuaXNSZXF1aXJlZCxcbiAgICBjb2x1bW5zOiBQcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9mb3JiaWQtcHJvcC10eXBlc1xuICAgIGNvbHVtbjogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L2ZvcmJpZC1wcm9wLXR5cGVzXG4gICAgY3VycmVudFNvcnRDb2x1bW46IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY3VycmVudFNvcnRPcmRlcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvblNvcnRDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgaXNCdXN5OiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGZpbHRlcmluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICB3aWR0aDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgY2hpbGRyZW46ICcnLFxuICAgIGN1cnJlbnRTb3J0T3JkZXI6IG51bGwsXG4gICAgY3VycmVudFNvcnRDb2x1bW46IG51bGwsXG4gIH07XG5cbiAgb25Tb3J0Q2hhbmdlID0gKGUpID0+IHtcbiAgICAvLyBDaGVjayBpZiBjbGljayB0YXJnZXQgaXMgaW4gYWN0dWFsIGhlYWRlciB0YWJsZSBjZWxsLCBub3QgdGhlIGZpbHRlcmluZyBpbnB1dCBjb21wb25lbnRcbiAgICBpZiAoXG4gICAgICBlLnRhcmdldC5jbGFzc05hbWUgIT09ICdwdWJsaWNfZml4ZWREYXRhVGFibGVDZWxsX2NlbGxDb250ZW50J1xuICAgICAgJiYgZS50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc05hbWUgIT09ICdwdWJsaWNfZml4ZWREYXRhVGFibGVDZWxsX2NlbGxDb250ZW50J1xuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIVV0aWxzLmlzU29ydGFibGUodGhpcy5wcm9wcy5jb2x1bW4pKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKHRoaXMucHJvcHMuaXNCdXN5KSByZXR1cm4gZmFsc2U7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IG9yZGVyID0gdGhpcy5wcm9wcy5jdXJyZW50U29ydENvbHVtbiA9PT0gVXRpbHMuZ2V0Q29sdW1uS2V5KHRoaXMucHJvcHMuY29sdW1uKVxuICAgICAgJiYgdGhpcy5wcm9wcy5jdXJyZW50U29ydE9yZGVyID09PSAnYXNjJ1xuICAgICAgPyAnZGVzYydcbiAgICAgIDogJ2FzYyc7XG4gICAgaWYgKHRoaXMucHJvcHMub25Tb3J0Q2hhbmdlKSB7XG4gICAgICB0aGlzLnByb3BzLm9uU29ydENoYW5nZSh0aGlzLnByb3BzLmdyaWQsIHRoaXMucHJvcHMuY29sdW1ucywgdGhpcy5wcm9wcy5jb2x1bW4sIG9yZGVyKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgZ2V0RmlsdGVyaW5nQ29tcG9uZW50ID0gKGZpbHRlcmluZywgY29sdW1uKSA9PiAoXG4gICAgZmlsdGVyaW5nID8gPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1yb3ctZmlsdGVyXCI+e2NvbHVtbi5jZWxsRmlsdGVyKCl9PC9kaXY+IDogbnVsbFxuICApO1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBjaGlsZHJlbixcbiAgICAgIGdyaWQsXG4gICAgICBjdXJyZW50U29ydENvbHVtbixcbiAgICAgIGN1cnJlbnRTb3J0T3JkZXIsXG4gICAgICBjb2x1bW5zLFxuICAgICAgY29sdW1uLFxuICAgICAgb25Tb3J0Q2hhbmdlLFxuICAgICAgaXNCdXN5LFxuICAgICAgZmlsdGVyaW5nLFxuICAgICAgd2lkdGgsXG4gICAgICAuLi5wcm9wc1xuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGNlbGxDbGFzc05hbWVzID0gY2xhc3NOYW1lcyh7XG4gICAgICAnb2MtZGF0YWdyaWQtY2VsbC1oZWFkZXInOiB0cnVlLFxuICAgICAgY2xpY2thYmxlOiAhaXNCdXN5ICYmIFV0aWxzLmlzU29ydGFibGUodGhpcy5wcm9wcy5jb2x1bW4pLFxuICAgIH0pO1xuICAgIGNvbnN0IHJlcXVpcmVkU3ltYm9sID0gY29sdW1uLmlzUmVxdWlyZWQgPyAnKicgOiAnJztcbiAgICBjb25zdCBpc1NvcnRlZEJ5Q29sdW1uID0gY3VycmVudFNvcnRDb2x1bW4gPT09IFV0aWxzLmdldENvbHVtbktleShjb2x1bW4pICYmIGN1cnJlbnRTb3J0T3JkZXI7XG4gICAgY29uc3Qgc29ydE9yZGVyID0gY3VycmVudFNvcnRPcmRlciA9PT0gJ2Rlc2MnID8gJyDihpMnIDogJyDihpEnO1xuICAgIGNvbnN0IHN5bWJvbHMgPSBpc1NvcnRlZEJ5Q29sdW1uID8gYCR7cmVxdWlyZWRTeW1ib2x9JHtzb3J0T3JkZXJ9YCA6IHJlcXVpcmVkU3ltYm9sO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxDZWxsIGNsYXNzTmFtZT17Y2VsbENsYXNzTmFtZXN9IG9uQ2xpY2s9e3RoaXMub25Tb3J0Q2hhbmdlfSB7Li4ucHJvcHN9PlxuICAgICAgICA8SGVhZGVyIHdpZHRoPXt3aWR0aH0+XG4gICAgICAgICAgPEhlYWRlckxhYmVsIHdpZHRoPXt3aWR0aH0+e2NoaWxkcmVufTwvSGVhZGVyTGFiZWw+XG4gICAgICAgICAgPFN5bWJvbHM+e3N5bWJvbHN9PC9TeW1ib2xzPlxuICAgICAgICA8L0hlYWRlcj5cbiAgICAgICAge3RoaXMuZ2V0RmlsdGVyaW5nQ29tcG9uZW50KGZpbHRlcmluZywgY29sdW1uKX1cbiAgICAgIDwvQ2VsbD5cbiAgICApO1xuICB9XG59XG4iXX0=