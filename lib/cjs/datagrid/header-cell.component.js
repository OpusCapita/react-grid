"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _fixedDataTable = require("fixed-data-table-2");

var _classnames = _interopRequireDefault(require("classnames"));

var _invariant = _interopRequireDefault(require("invariant"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactBootstrap = require("react-bootstrap");

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

var HeaderCell = /*#__PURE__*/function (_React$PureComponent) {
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
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "oc-datagrid-row-filter"
        }, column.cellFilter());
      }

      return null;
    });

    _defineProperty(_assertThisInitialized(_this), "renderHeader", function () {
      var _this$props = _this.props,
          children = _this$props.children,
          column = _this$props.column,
          currentSortColumn = _this$props.currentSortColumn,
          currentSortOrder = _this$props.currentSortOrder,
          width = _this$props.width;
      var requiredSymbol = column.isRequired ? '*' : '';
      var isSortedByColumn = currentSortColumn === _datagrid2["default"].getColumnKey(column) && currentSortOrder;
      var sortOrder = currentSortOrder === 'desc' ? ' ↓' : ' ↑';
      var symbols = isSortedByColumn ? "" + requiredSymbol + sortOrder : requiredSymbol;
      return /*#__PURE__*/_react["default"].createElement(Header, {
        width: width,
        className: "oc-datagrid-cell-header-text"
      }, /*#__PURE__*/_react["default"].createElement(HeaderLabel, {
        width: width
      }, children), /*#__PURE__*/_react["default"].createElement(Symbols, null, symbols));
    });

    _defineProperty(_assertThisInitialized(_this), "renderColumnHeader", function () {
      var _this$props2 = _this.props,
          id = _this$props2.grid.id,
          _this$props2$column = _this$props2.column,
          columnKey = _this$props2$column.columnKey,
          translations = _this$props2$column.translations;
      var tooltip = translations ? translations.columnHeaderTooltip : undefined;
      return tooltip ? /*#__PURE__*/_react["default"].createElement(_reactBootstrap.OverlayTrigger, {
        placement: "top",
        overlay: /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Tooltip, {
          id: "ocDatagridColumnHeaderTooltip-" + id + "-" + columnKey
        }, tooltip),
        delay: 500
      }, _this.renderHeader()) : _this.renderHeader();
    });

    return _this;
  }

  var _proto = HeaderCell.prototype;

  _proto.render = function render() {
    var _this$props3 = this.props,
        children = _this$props3.children,
        grid = _this$props3.grid,
        currentSortColumn = _this$props3.currentSortColumn,
        currentSortOrder = _this$props3.currentSortOrder,
        columns = _this$props3.columns,
        column = _this$props3.column,
        onSortChange = _this$props3.onSortChange,
        isBusy = _this$props3.isBusy,
        filtering = _this$props3.filtering,
        width = _this$props3.width,
        props = _objectWithoutPropertiesLoose(_this$props3, ["children", "grid", "currentSortColumn", "currentSortOrder", "columns", "column", "onSortChange", "isBusy", "filtering", "width"]);

    var cellClassNames = (0, _classnames["default"])({
      'oc-datagrid-cell-header': true,
      clickable: !isBusy && _datagrid2["default"].isSortable(column)
    });
    return /*#__PURE__*/_react["default"].createElement(_fixedDataTable.Cell, _extends({
      className: cellClassNames,
      onClick: this.onSortChange
    }, props), this.renderColumnHeader(), this.getFilteringComponent(filtering, column));
  };

  return HeaderCell;
}(_react["default"].PureComponent);

exports["default"] = HeaderCell;

_defineProperty(HeaderCell, "defaultProps", {
  children: '',
  currentSortOrder: null,
  currentSortColumn: null
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9oZWFkZXItY2VsbC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkhlYWRlciIsInN0eWxlZCIsImRpdiIsInByb3BzIiwid2lkdGgiLCJIZWFkZXJMYWJlbCIsInNwYW4iLCJTeW1ib2xzIiwiY2hpbGRyZW4iLCJpc0NsYXNzTmFtZSIsImVsIiwiY2xhc3NOYW1lIiwic3BsaXQiLCJpbmNsdWRlcyIsIkhlYWRlckNlbGwiLCJlIiwib2siLCJ0YXJnZXQiLCJwYXJlbnRFbGVtZW50IiwiVXRpbHMiLCJpc1NvcnRhYmxlIiwiY29sdW1uIiwiaXNCdXN5IiwicHJldmVudERlZmF1bHQiLCJvcmRlciIsImN1cnJlbnRTb3J0Q29sdW1uIiwiZ2V0Q29sdW1uS2V5IiwiY3VycmVudFNvcnRPcmRlciIsIm9uU29ydENoYW5nZSIsImdyaWQiLCJjb2x1bW5zIiwiZmlsdGVyaW5nIiwiY2VsbEZpbHRlciIsInJlcXVpcmVkU3ltYm9sIiwiaXNSZXF1aXJlZCIsImlzU29ydGVkQnlDb2x1bW4iLCJzb3J0T3JkZXIiLCJzeW1ib2xzIiwiaWQiLCJjb2x1bW5LZXkiLCJ0cmFuc2xhdGlvbnMiLCJ0b29sdGlwIiwiY29sdW1uSGVhZGVyVG9vbHRpcCIsInVuZGVmaW5lZCIsInJlbmRlckhlYWRlciIsInJlbmRlciIsImNlbGxDbGFzc05hbWVzIiwiY2xpY2thYmxlIiwicmVuZGVyQ29sdW1uSGVhZGVyIiwiZ2V0RmlsdGVyaW5nQ29tcG9uZW50IiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsTUFBTSxHQUFHQyw2QkFBT0MsR0FBVixvQkFFRCxVQUFBQyxLQUFLO0FBQUEsbUJBQVlBLEtBQUssQ0FBQ0MsS0FB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QkFBZ0IsRUFBRSxJQUZFO0FBR3BCRixFQUFBQSxpQkFBaUIsRUFBRTtBQUhDLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IENlbGwgfSBmcm9tICdmaXhlZC1kYXRhLXRhYmxlLTInO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgaW52YXJpYW50IGZyb20gJ2ludmFyaWFudCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7IE92ZXJsYXlUcmlnZ2VyLCBUb29sdGlwIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCB7IGdyaWRTaGFwZSB9IGZyb20gJy4vZGF0YWdyaWQucHJvcHMnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4vZGF0YWdyaWQudXRpbHMnO1xuXG5jb25zdCBIZWFkZXIgPSBzdHlsZWQuZGl2YFxuICAvKiBNeXN0aWNhbCAxN3B4IGNvbWVzIGZyb20gMio4cHggcGFkZGluZ3Mgb2YgcHVibGljX2ZpeGVkRGF0YVRhYmxlQ2VsbF9jZWxsQ29udGVudCBwbHVzIDFweCBib3JkZXIgd2lkdGggKi9cbiAgd2lkdGg6ICR7cHJvcHMgPT4gYGNhbGMoJHtwcm9wcy53aWR0aH1weCAtIDE3cHgpYH07XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBmbGV4LXdyYXA6IG5vd3JhcDtcbmA7XG5cbmNvbnN0IEhlYWRlckxhYmVsID0gc3R5bGVkLnNwYW5gXG4gIGZsZXg6IDAgMSBjb250ZW50O1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbmA7XG5cbmNvbnN0IFN5bWJvbHMgPSBzdHlsZWQuc3BhbmBcbiAgZmxleDogMSAwIGNvbnRlbnQ7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIG1hcmdpbi1sZWZ0OiAke3Byb3BzID0+IChwcm9wcy5jaGlsZHJlbiA/ICc1cHgnIDogJzAnKX07XG5gO1xuXG5jb25zdCBpc0NsYXNzTmFtZSA9IChlbCwgY2xhc3NOYW1lKSA9PiB7XG4gIGlmICh0eXBlb2YgZWwuY2xhc3NOYW1lID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBlbC5jbGFzc05hbWUuc3BsaXQoJyAnKS5pbmNsdWRlcyhjbGFzc05hbWUpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlYWRlckNlbGwgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgZ3JpZDogZ3JpZFNoYXBlLmlzUmVxdWlyZWQsXG4gICAgY29sdW1uczogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3QvZm9yYmlkLXByb3AtdHlwZXNcbiAgICBjb2x1bW46IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9mb3JiaWQtcHJvcC10eXBlc1xuICAgIGN1cnJlbnRTb3J0Q29sdW1uOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGN1cnJlbnRTb3J0T3JkZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgb25Tb3J0Q2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGlzQnVzeTogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBmaWx0ZXJpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgd2lkdGg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgfVxuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgY2hpbGRyZW46ICcnLFxuICAgIGN1cnJlbnRTb3J0T3JkZXI6IG51bGwsXG4gICAgY3VycmVudFNvcnRDb2x1bW46IG51bGwsXG4gIH1cblxuICBvblNvcnRDaGFuZ2UgPSAoZSkgPT4ge1xuICAgIC8vIENoZWNrIGlmIGNsaWNrIHRhcmdldCBpcyBpbiBhY3R1YWwgaGVhZGVyIHRhYmxlIGNlbGwsIG5vdCB0aGUgZmlsdGVyaW5nIGlucHV0IGNvbXBvbmVudFxuICAgIC8vIEZpbHRlcmluZyBjb21wb25lbnQgY2FuIGJlIGFueXRoaW5nIGJlY2F1c2Ugb2YgY3VzdG9tIHJlbmRlcmVyc1xuICAgIGxldCBvayA9IGlzQ2xhc3NOYW1lKGUudGFyZ2V0LCAncHVibGljX2ZpeGVkRGF0YVRhYmxlQ2VsbF9jZWxsQ29udGVudCcpO1xuICAgIGlmICghb2spIHtcbiAgICAgIG9rID0gaXNDbGFzc05hbWUoZS50YXJnZXQsICdwdWJsaWNfZml4ZWREYXRhVGFibGVDZWxsX3dyYXAzJyk7XG4gICAgfVxuICAgIGlmICghb2spIHtcbiAgICAgIG9rID0gaXNDbGFzc05hbWUoZS50YXJnZXQsICdvYy1kYXRhZ3JpZC1jZWxsLWhlYWRlci10ZXh0Jyk7XG4gICAgfVxuICAgIGlmICghb2spIHtcbiAgICAgIG9rID0gaXNDbGFzc05hbWUoZS50YXJnZXQucGFyZW50RWxlbWVudCwgJ29jLWRhdGFncmlkLWNlbGwtaGVhZGVyLXRleHQnKTtcbiAgICB9XG4gICAgaWYgKCFvaykge1xuICAgICAgb2sgPSBpc0NsYXNzTmFtZShlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQsICdvYy1kYXRhZ3JpZC1jZWxsLWhlYWRlci10ZXh0Jyk7XG4gICAgfVxuICAgIGlmICghb2spIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIVV0aWxzLmlzU29ydGFibGUodGhpcy5wcm9wcy5jb2x1bW4pKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKHRoaXMucHJvcHMuaXNCdXN5KSByZXR1cm4gZmFsc2U7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IG9yZGVyID0gdGhpcy5wcm9wcy5jdXJyZW50U29ydENvbHVtbiA9PT0gVXRpbHMuZ2V0Q29sdW1uS2V5KHRoaXMucHJvcHMuY29sdW1uKVxuICAgICAgJiYgdGhpcy5wcm9wcy5jdXJyZW50U29ydE9yZGVyID09PSAnYXNjJ1xuICAgICAgPyAnZGVzYydcbiAgICAgIDogJ2FzYyc7XG4gICAgaWYgKHRoaXMucHJvcHMub25Tb3J0Q2hhbmdlKSB7XG4gICAgICB0aGlzLnByb3BzLm9uU29ydENoYW5nZSh0aGlzLnByb3BzLmdyaWQsIHRoaXMucHJvcHMuY29sdW1ucywgdGhpcy5wcm9wcy5jb2x1bW4sIG9yZGVyKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBnZXRGaWx0ZXJpbmdDb21wb25lbnQgPSAoZmlsdGVyaW5nLCBjb2x1bW4pID0+IHtcbiAgICBpZiAoZmlsdGVyaW5nKSB7XG4gICAgICBpbnZhcmlhbnQoY29sdW1uLmNlbGxGaWx0ZXIsIGBObyBjZWxsRmlsdGVyIGZvciBjb2x1bW4gJyR7VXRpbHMuZ2V0Q29sdW1uS2V5KGNvbHVtbil9J2ApO1xuICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtcm93LWZpbHRlclwiPntjb2x1bW4uY2VsbEZpbHRlcigpfTwvZGl2PjtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZW5kZXJIZWFkZXIgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgY2hpbGRyZW4sXG4gICAgICBjb2x1bW4sXG4gICAgICBjdXJyZW50U29ydENvbHVtbixcbiAgICAgIGN1cnJlbnRTb3J0T3JkZXIsXG4gICAgICB3aWR0aCxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCByZXF1aXJlZFN5bWJvbCA9IGNvbHVtbi5pc1JlcXVpcmVkID8gJyonIDogJyc7XG4gICAgY29uc3QgaXNTb3J0ZWRCeUNvbHVtbiA9IGN1cnJlbnRTb3J0Q29sdW1uID09PSBVdGlscy5nZXRDb2x1bW5LZXkoY29sdW1uKSAmJiBjdXJyZW50U29ydE9yZGVyO1xuICAgIGNvbnN0IHNvcnRPcmRlciA9IGN1cnJlbnRTb3J0T3JkZXIgPT09ICdkZXNjJyA/ICcg4oaTJyA6ICcg4oaRJztcbiAgICBjb25zdCBzeW1ib2xzID0gaXNTb3J0ZWRCeUNvbHVtbiA/IGAke3JlcXVpcmVkU3ltYm9sfSR7c29ydE9yZGVyfWAgOiByZXF1aXJlZFN5bWJvbDtcblxuICAgIHJldHVybiAoXG4gICAgICA8SGVhZGVyIHdpZHRoPXt3aWR0aH0gY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtY2VsbC1oZWFkZXItdGV4dFwiPlxuICAgICAgICA8SGVhZGVyTGFiZWwgd2lkdGg9e3dpZHRofT57Y2hpbGRyZW59PC9IZWFkZXJMYWJlbD5cbiAgICAgICAgPFN5bWJvbHM+e3N5bWJvbHN9PC9TeW1ib2xzPlxuICAgICAgPC9IZWFkZXI+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlckNvbHVtbkhlYWRlciA9ICgpID0+IHtcbiAgICBjb25zdCB7IGdyaWQ6IHsgaWQgfSwgY29sdW1uOiB7IGNvbHVtbktleSwgdHJhbnNsYXRpb25zIH0gfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgdG9vbHRpcCA9IHRyYW5zbGF0aW9ucyA/IHRyYW5zbGF0aW9ucy5jb2x1bW5IZWFkZXJUb29sdGlwIDogdW5kZWZpbmVkO1xuICAgIHJldHVybiB0b29sdGlwXG4gICAgICA/IChcbiAgICAgICAgPE92ZXJsYXlUcmlnZ2VyXG4gICAgICAgICAgcGxhY2VtZW50PVwidG9wXCJcbiAgICAgICAgICBvdmVybGF5PXsoXG4gICAgICAgICAgICA8VG9vbHRpcCBpZD17YG9jRGF0YWdyaWRDb2x1bW5IZWFkZXJUb29sdGlwLSR7aWR9LSR7Y29sdW1uS2V5fWB9PlxuICAgICAgICAgICAgICB7dG9vbHRpcH1cbiAgICAgICAgICAgIDwvVG9vbHRpcD5cbiAgICAgICAgICApfVxuICAgICAgICAgIGRlbGF5PXs1MDB9XG4gICAgICAgID5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJIZWFkZXIoKX1cbiAgICAgICAgPC9PdmVybGF5VHJpZ2dlcj5cbiAgICAgIClcbiAgICAgIDogdGhpcy5yZW5kZXJIZWFkZXIoKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgY2hpbGRyZW4sXG4gICAgICBncmlkLFxuICAgICAgY3VycmVudFNvcnRDb2x1bW4sXG4gICAgICBjdXJyZW50U29ydE9yZGVyLFxuICAgICAgY29sdW1ucyxcbiAgICAgIGNvbHVtbixcbiAgICAgIG9uU29ydENoYW5nZSxcbiAgICAgIGlzQnVzeSxcbiAgICAgIGZpbHRlcmluZyxcbiAgICAgIHdpZHRoLFxuICAgICAgLi4ucHJvcHNcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBjZWxsQ2xhc3NOYW1lcyA9IGNsYXNzTmFtZXMoe1xuICAgICAgJ29jLWRhdGFncmlkLWNlbGwtaGVhZGVyJzogdHJ1ZSxcbiAgICAgIGNsaWNrYWJsZTogIWlzQnVzeSAmJiBVdGlscy5pc1NvcnRhYmxlKGNvbHVtbiksXG4gICAgfSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENlbGwgY2xhc3NOYW1lPXtjZWxsQ2xhc3NOYW1lc30gb25DbGljaz17dGhpcy5vblNvcnRDaGFuZ2V9IHsuLi5wcm9wc30+XG4gICAgICAgIHt0aGlzLnJlbmRlckNvbHVtbkhlYWRlcigpfVxuICAgICAgICB7dGhpcy5nZXRGaWx0ZXJpbmdDb21wb25lbnQoZmlsdGVyaW5nLCBjb2x1bW4pfVxuICAgICAgPC9DZWxsPlxuICAgICk7XG4gIH1cbn1cbiJdfQ==