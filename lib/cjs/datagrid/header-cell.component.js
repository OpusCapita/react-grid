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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9oZWFkZXItY2VsbC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkhlYWRlciIsInN0eWxlZCIsImRpdiIsInByb3BzIiwid2lkdGgiLCJIZWFkZXJMYWJlbCIsInNwYW4iLCJTeW1ib2xzIiwiY2hpbGRyZW4iLCJIZWFkZXJDZWxsIiwiZSIsIm9rIiwidGFyZ2V0IiwiY2xhc3NOYW1lIiwic3BsaXQiLCJwYXJlbnRFbGVtZW50IiwiVXRpbHMiLCJpc1NvcnRhYmxlIiwiY29sdW1uIiwiaXNCdXN5IiwicHJldmVudERlZmF1bHQiLCJvcmRlciIsImN1cnJlbnRTb3J0Q29sdW1uIiwiZ2V0Q29sdW1uS2V5IiwiY3VycmVudFNvcnRPcmRlciIsIm9uU29ydENoYW5nZSIsImdyaWQiLCJjb2x1bW5zIiwiZmlsdGVyaW5nIiwiY2VsbEZpbHRlciIsInJlbmRlciIsImNlbGxDbGFzc05hbWVzIiwiY2xpY2thYmxlIiwicmVxdWlyZWRTeW1ib2wiLCJpc1JlcXVpcmVkIiwiaXNTb3J0ZWRCeUNvbHVtbiIsInNvcnRPcmRlciIsInN5bWJvbHMiLCJnZXRGaWx0ZXJpbmdDb21wb25lbnQiLCJSZWFjdCIsIlB1cmVDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxNQUFNLEdBQUdDLDZCQUFPQyxHQUFWLG9CQUVELFVBQUFDLEtBQUs7QUFBQSxtQkFBWUEsS0FBSyxDQUFDQyxLQUFsQjtBQUFBLENBRkosQ0FBWjs7QUFPQSxJQUFNQyxXQUFXLEdBQUdKLDZCQUFPSyxJQUFWLG9CQUFqQjs7QUFPQSxJQUFNQyxPQUFPLEdBQUdOLDZCQUFPSyxJQUFWLHFCQUdJLFVBQUFILEtBQUs7QUFBQSxTQUFLQSxLQUFLLENBQUNLLFFBQU4sR0FBaUIsS0FB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QUFELElBQVdILHNCQUFNQyxVQUFOLENBQWlCLEtBQUtkLEtBQUwsQ0FBV2UsTUFBNUI7QUFGVSxLQUFYLENBQXZCO0FBSUEsUUFBTWUsY0FBYyxHQUFHZixNQUFNLENBQUNnQixVQUFQLEdBQW9CLEdBQXBCLEdBQTBCLEVBQWpEO0FBQ0EsUUFBTUMsZ0JBQWdCLEdBQUdiLGlCQUFpQixLQUFLTixzQkFBTU8sWUFBTixDQUFtQkwsTUFBbkIsQ0FBdEIsSUFBb0RNLGdCQUE3RTtBQUNBLFFBQU1ZLFNBQVMsR0FBR1osZ0JBQWdCLEtBQUssTUFBckIsR0FBOEIsSUFBOUIsR0FBcUMsSUFBdkQ7QUFDQSxRQUFNYSxPQUFPLEdBQUdGLGdCQUFnQixRQUFNRixjQUFOLEdBQXVCRyxTQUF2QixHQUFxQ0gsY0FBckU7QUFFQSxXQUNFLGdDQUFDLG9CQUFEO0FBQU0sTUFBQSxTQUFTLEVBQUVGLGNBQWpCO0FBQWlDLE1BQUEsT0FBTyxFQUFFLEtBQUtOO0FBQS9DLE9BQWlFdEIsS0FBakUsR0FDRSxnQ0FBQyxNQUFEO0FBQVEsTUFBQSxLQUFLLEVBQUVDLEtBQWY7QUFBc0IsTUFBQSxTQUFTLEVBQUM7QUFBaEMsT0FDRSxnQ0FBQyxXQUFEO0FBQWEsTUFBQSxLQUFLLEVBQUVBO0FBQXBCLE9BQTRCSSxRQUE1QixDQURGLEVBRUUsZ0NBQUMsT0FBRCxRQUFVNkIsT0FBVixDQUZGLENBREYsRUFLRyxLQUFLQyxxQkFBTCxDQUEyQlYsU0FBM0IsRUFBc0NWLE1BQXRDLENBTEgsQ0FERjtBQVNELEc7OztFQTdGcUNxQixrQkFBTUMsYTs7OztnQkFBekIvQixVLGtCQWNHO0FBQ3BCRCxFQUFBQSxRQUFRLEVBQUUsRUFEVTtBQUVwQmdCLEVBQUFBLGdCQUFnQixFQUFFLElBRkU7QUFHcEJGLEVBQUFBLGlCQUFpQixFQUFFO0FBSEMsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgQ2VsbCB9IGZyb20gJ2ZpeGVkLWRhdGEtdGFibGUtMic7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBpbnZhcmlhbnQgZnJvbSAnaW52YXJpYW50JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgZ3JpZFNoYXBlIH0gZnJvbSAnLi9kYXRhZ3JpZC5wcm9wcyc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9kYXRhZ3JpZC51dGlscyc7XG5cbmNvbnN0IEhlYWRlciA9IHN0eWxlZC5kaXZgXG4gIC8qIE15c3RpY2FsIDE3cHggY29tZXMgZnJvbSAyKjhweCBwYWRkaW5ncyBvZiBwdWJsaWNfZml4ZWREYXRhVGFibGVDZWxsX2NlbGxDb250ZW50IHBsdXMgMXB4IGJvcmRlciB3aWR0aCAqL1xuICB3aWR0aDogJHtwcm9wcyA9PiBgY2FsYygke3Byb3BzLndpZHRofXB4IC0gMTdweClgfTtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGZsZXgtd3JhcDogbm93cmFwO1xuYDtcblxuY29uc3QgSGVhZGVyTGFiZWwgPSBzdHlsZWQuc3BhbmBcbiAgZmxleDogMCAxIGNvbnRlbnQ7XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuYDtcblxuY29uc3QgU3ltYm9scyA9IHN0eWxlZC5zcGFuYFxuICBmbGV4OiAxIDAgY29udGVudDtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgbWFyZ2luLWxlZnQ6ICR7cHJvcHMgPT4gKHByb3BzLmNoaWxkcmVuID8gJzVweCcgOiAnMCcpfTtcbmA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlYWRlckNlbGwgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgZ3JpZDogZ3JpZFNoYXBlLmlzUmVxdWlyZWQsXG4gICAgY29sdW1uczogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3QvZm9yYmlkLXByb3AtdHlwZXNcbiAgICBjb2x1bW46IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9mb3JiaWQtcHJvcC10eXBlc1xuICAgIGN1cnJlbnRTb3J0Q29sdW1uOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGN1cnJlbnRTb3J0T3JkZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgb25Tb3J0Q2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGlzQnVzeTogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBmaWx0ZXJpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgd2lkdGg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgfVxuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgY2hpbGRyZW46ICcnLFxuICAgIGN1cnJlbnRTb3J0T3JkZXI6IG51bGwsXG4gICAgY3VycmVudFNvcnRDb2x1bW46IG51bGwsXG4gIH1cblxuICBvblNvcnRDaGFuZ2UgPSAoZSkgPT4ge1xuICAgIC8vIENoZWNrIGlmIGNsaWNrIHRhcmdldCBpcyBpbiBhY3R1YWwgaGVhZGVyIHRhYmxlIGNlbGwsIG5vdCB0aGUgZmlsdGVyaW5nIGlucHV0IGNvbXBvbmVudFxuICAgIC8vIEZpbHRlcmluZyBjb21wb25lbnQgY2FuIGJlIGFueXRoaW5nIGJlY2F1c2Ugb2YgY3VzdG9tIHJlbmRlcmVyc1xuICAgIGxldCBvayA9IGZhbHNlO1xuICAgIGlmICh0eXBlb2YgZS50YXJnZXQuY2xhc3NOYW1lICE9PSAnc3RyaW5nJykgcmV0dXJuIGZhbHNlO1xuICAgIC8vIG1hdGNoIGNlbGxDb250ZW50IGFyZWEgb3IgaGVhZGVyIHRleHRcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09PSAncHVibGljX2ZpeGVkRGF0YVRhYmxlQ2VsbF9jZWxsQ29udGVudCdcbiAgICAgIHx8IGUudGFyZ2V0LmNsYXNzTmFtZS5zcGxpdCgnICcpWzBdID09PSAnb2MtZGF0YWdyaWQtY2VsbC1oZWFkZXItdGV4dCdcbiAgICApIHtcbiAgICAgIG9rID0gdHJ1ZTtcbiAgICB9XG4gICAgLy8gbWF0Y2ggaGVhZGVyLXRleHQgY2hpbGRyZW5cbiAgICBpZiAoXG4gICAgICAhb2tcbiAgICAgICYmIHR5cGVvZiBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTmFtZSA9PT0gJ3N0cmluZydcbiAgICAgICYmIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NOYW1lLnNwbGl0KCcgJylbMF0gPT09ICdvYy1kYXRhZ3JpZC1jZWxsLWhlYWRlci10ZXh0J1xuICAgICkge1xuICAgICAgb2sgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoIW9rKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFVdGlscy5pc1NvcnRhYmxlKHRoaXMucHJvcHMuY29sdW1uKSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICh0aGlzLnByb3BzLmlzQnVzeSkgcmV0dXJuIGZhbHNlO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBvcmRlciA9IHRoaXMucHJvcHMuY3VycmVudFNvcnRDb2x1bW4gPT09IFV0aWxzLmdldENvbHVtbktleSh0aGlzLnByb3BzLmNvbHVtbilcbiAgICAgICYmIHRoaXMucHJvcHMuY3VycmVudFNvcnRPcmRlciA9PT0gJ2FzYydcbiAgICAgID8gJ2Rlc2MnXG4gICAgICA6ICdhc2MnO1xuICAgIGlmICh0aGlzLnByb3BzLm9uU29ydENoYW5nZSkge1xuICAgICAgdGhpcy5wcm9wcy5vblNvcnRDaGFuZ2UodGhpcy5wcm9wcy5ncmlkLCB0aGlzLnByb3BzLmNvbHVtbnMsIHRoaXMucHJvcHMuY29sdW1uLCBvcmRlcik7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZ2V0RmlsdGVyaW5nQ29tcG9uZW50ID0gKGZpbHRlcmluZywgY29sdW1uKSA9PiB7XG4gICAgaWYgKGZpbHRlcmluZykge1xuICAgICAgaW52YXJpYW50KGNvbHVtbi5jZWxsRmlsdGVyLCBgTm8gY2VsbEZpbHRlciBmb3IgY29sdW1uICcke1V0aWxzLmdldENvbHVtbktleShjb2x1bW4pfSdgKTtcbiAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cIm9jLWRhdGFncmlkLXJvdy1maWx0ZXJcIj57Y29sdW1uLmNlbGxGaWx0ZXIoKX08L2Rpdj47XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgZ3JpZCxcbiAgICAgIGN1cnJlbnRTb3J0Q29sdW1uLFxuICAgICAgY3VycmVudFNvcnRPcmRlcixcbiAgICAgIGNvbHVtbnMsXG4gICAgICBjb2x1bW4sXG4gICAgICBvblNvcnRDaGFuZ2UsXG4gICAgICBpc0J1c3ksXG4gICAgICBmaWx0ZXJpbmcsXG4gICAgICB3aWR0aCxcbiAgICAgIC4uLnByb3BzXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgY2VsbENsYXNzTmFtZXMgPSBjbGFzc05hbWVzKHtcbiAgICAgICdvYy1kYXRhZ3JpZC1jZWxsLWhlYWRlcic6IHRydWUsXG4gICAgICBjbGlja2FibGU6ICFpc0J1c3kgJiYgVXRpbHMuaXNTb3J0YWJsZSh0aGlzLnByb3BzLmNvbHVtbiksXG4gICAgfSk7XG4gICAgY29uc3QgcmVxdWlyZWRTeW1ib2wgPSBjb2x1bW4uaXNSZXF1aXJlZCA/ICcqJyA6ICcnO1xuICAgIGNvbnN0IGlzU29ydGVkQnlDb2x1bW4gPSBjdXJyZW50U29ydENvbHVtbiA9PT0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbHVtbikgJiYgY3VycmVudFNvcnRPcmRlcjtcbiAgICBjb25zdCBzb3J0T3JkZXIgPSBjdXJyZW50U29ydE9yZGVyID09PSAnZGVzYycgPyAnIOKGkycgOiAnIOKGkSc7XG4gICAgY29uc3Qgc3ltYm9scyA9IGlzU29ydGVkQnlDb2x1bW4gPyBgJHtyZXF1aXJlZFN5bWJvbH0ke3NvcnRPcmRlcn1gIDogcmVxdWlyZWRTeW1ib2w7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENlbGwgY2xhc3NOYW1lPXtjZWxsQ2xhc3NOYW1lc30gb25DbGljaz17dGhpcy5vblNvcnRDaGFuZ2V9IHsuLi5wcm9wc30+XG4gICAgICAgIDxIZWFkZXIgd2lkdGg9e3dpZHRofSBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1jZWxsLWhlYWRlci10ZXh0XCI+XG4gICAgICAgICAgPEhlYWRlckxhYmVsIHdpZHRoPXt3aWR0aH0+e2NoaWxkcmVufTwvSGVhZGVyTGFiZWw+XG4gICAgICAgICAgPFN5bWJvbHM+e3N5bWJvbHN9PC9TeW1ib2xzPlxuICAgICAgICA8L0hlYWRlcj5cbiAgICAgICAge3RoaXMuZ2V0RmlsdGVyaW5nQ29tcG9uZW50KGZpbHRlcmluZywgY29sdW1uKX1cbiAgICAgIDwvQ2VsbD5cbiAgICApO1xuICB9XG59XG4iXX0=