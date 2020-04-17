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
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
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
        return /*#__PURE__*/React.createElement("div", {
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
      var isSortedByColumn = currentSortColumn === Utils.getColumnKey(column) && currentSortOrder;
      var sortOrder = currentSortOrder === 'desc' ? ' ↓' : ' ↑';
      var symbols = isSortedByColumn ? "" + requiredSymbol + sortOrder : requiredSymbol;
      return /*#__PURE__*/React.createElement(Header, {
        width: width,
        className: "oc-datagrid-cell-header-text"
      }, /*#__PURE__*/React.createElement(HeaderLabel, {
        width: width
      }, children), /*#__PURE__*/React.createElement(Symbols, null, symbols));
    });

    _defineProperty(_assertThisInitialized(_this), "renderColumnHeader", function () {
      var _this$props2 = _this.props,
          id = _this$props2.grid.id,
          _this$props2$column = _this$props2.column,
          columnKey = _this$props2$column.columnKey,
          translations = _this$props2$column.translations;
      var tooltip = translations ? translations.columnHeaderTooltip : undefined;
      return tooltip ? /*#__PURE__*/React.createElement(OverlayTrigger, {
        placement: "top",
        overlay: /*#__PURE__*/React.createElement(Tooltip, {
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

    var cellClassNames = classNames({
      'oc-datagrid-cell-header': true,
      clickable: !isBusy && Utils.isSortable(column)
    });
    return /*#__PURE__*/React.createElement(Cell, _extends({
      className: cellClassNames,
      onClick: this.onSortChange
    }, props), this.renderColumnHeader(), this.getFilteringComponent(filtering, column));
  };

  return HeaderCell;
}(React.PureComponent);

_defineProperty(HeaderCell, "defaultProps", {
  children: '',
  currentSortOrder: null,
  currentSortColumn: null
});

export { HeaderCell as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9oZWFkZXItY2VsbC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiQ2VsbCIsImNsYXNzTmFtZXMiLCJpbnZhcmlhbnQiLCJzdHlsZWQiLCJPdmVybGF5VHJpZ2dlciIsIlRvb2x0aXAiLCJncmlkU2hhcGUiLCJVdGlscyIsIkhlYWRlciIsImRpdiIsInByb3BzIiwid2lkdGgiLCJIZWFkZXJMYWJlbCIsInNwYW4iLCJTeW1ib2xzIiwiY2hpbGRyZW4iLCJpc0NsYXNzTmFtZSIsImVsIiwiY2xhc3NOYW1lIiwic3BsaXQiLCJpbmNsdWRlcyIsIkhlYWRlckNlbGwiLCJlIiwib2siLCJ0YXJnZXQiLCJwYXJlbnRFbGVtZW50IiwiaXNTb3J0YWJsZSIsImNvbHVtbiIsImlzQnVzeSIsInByZXZlbnREZWZhdWx0Iiwib3JkZXIiLCJjdXJyZW50U29ydENvbHVtbiIsImdldENvbHVtbktleSIsImN1cnJlbnRTb3J0T3JkZXIiLCJvblNvcnRDaGFuZ2UiLCJncmlkIiwiY29sdW1ucyIsImZpbHRlcmluZyIsImNlbGxGaWx0ZXIiLCJyZXF1aXJlZFN5bWJvbCIsImlzUmVxdWlyZWQiLCJpc1NvcnRlZEJ5Q29sdW1uIiwic29ydE9yZGVyIiwic3ltYm9scyIsImlkIiwiY29sdW1uS2V5IiwidHJhbnNsYXRpb25zIiwidG9vbHRpcCIsImNvbHVtbkhlYWRlclRvb2x0aXAiLCJ1bmRlZmluZWQiLCJyZW5kZXJIZWFkZXIiLCJyZW5kZXIiLCJjZWxsQ2xhc3NOYW1lcyIsImNsaWNrYWJsZSIsInJlbmRlckNvbHVtbkhlYWRlciIsImdldEZpbHRlcmluZ0NvbXBvbmVudCIsIlB1cmVDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsU0FBU0MsSUFBVCxRQUFxQixvQkFBckI7QUFDQSxPQUFPQyxVQUFQLE1BQXVCLFlBQXZCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixXQUF0QjtBQUNBLE9BQU9DLE1BQVAsTUFBbUIsbUJBQW5CO0FBQ0EsU0FBU0MsY0FBVCxFQUF5QkMsT0FBekIsUUFBd0MsaUJBQXhDO0FBQ0EsU0FBU0MsU0FBVCxRQUEwQixrQkFBMUI7QUFDQSxPQUFPQyxLQUFQLE1BQWtCLGtCQUFsQjtBQUVBLElBQU1DLE1BQU0sR0FBR0wsTUFBTSxDQUFDTSxHQUFWLG9CQUVELFVBQUFDLEtBQUs7QUFBQSxtQkFBWUEsS0FBSyxDQUFDQyxLQUFsQjtBQUFBLENBRkosQ0FBWjtBQU9BLElBQU1DLFdBQVcsR0FBR1QsTUFBTSxDQUFDVSxJQUFWLG9CQUFqQjtBQU9BLElBQU1DLE9BQU8sR0FBR1gsTUFBTSxDQUFDVSxJQUFWLHFCQUdJLFVBQUFILEtBQUs7QUFBQSxTQUFLQSxLQUFLLENBQUNLLFFBQU4sR0FBaUIsS0FBakIsR0FBeUIsR0FBOUI7QUFBQSxDQUhULENBQWI7O0FBTUEsSUFBTUMsV0FBVyxHQUFHLFNBQWRBLFdBQWMsQ0FBQ0MsRUFBRCxFQUFLQyxTQUFMLEVBQW1CO0FBQ3JDLE1BQUksT0FBT0QsRUFBRSxDQUFDQyxTQUFWLEtBQXdCLFFBQTVCLEVBQXNDO0FBQ3BDLFdBQU9ELEVBQUUsQ0FBQ0MsU0FBSCxDQUFhQyxLQUFiLENBQW1CLEdBQW5CLEVBQXdCQyxRQUF4QixDQUFpQ0YsU0FBakMsQ0FBUDtBQUNEOztBQUNELFNBQU8sS0FBUDtBQUNELENBTEQ7O0lBT3FCRyxVOzs7Ozs7Ozs7Ozs7bUVBb0JKLFVBQUNDLENBQUQsRUFBTztBQUNwQjtBQUNBO0FBQ0EsVUFBSUMsRUFBRSxHQUFHUCxXQUFXLENBQUNNLENBQUMsQ0FBQ0UsTUFBSCxFQUFXLHVDQUFYLENBQXBCOztBQUNBLFVBQUksQ0FBQ0QsRUFBTCxFQUFTO0FBQ1BBLFFBQUFBLEVBQUUsR0FBR1AsV0FBVyxDQUFDTSxDQUFDLENBQUNFLE1BQUgsRUFBVyxpQ0FBWCxDQUFoQjtBQUNEOztBQUNELFVBQUksQ0FBQ0QsRUFBTCxFQUFTO0FBQ1BBLFFBQUFBLEVBQUUsR0FBR1AsV0FBVyxDQUFDTSxDQUFDLENBQUNFLE1BQUgsRUFBVyw4QkFBWCxDQUFoQjtBQUNEOztBQUNELFVBQUksQ0FBQ0QsRUFBTCxFQUFTO0FBQ1BBLFFBQUFBLEVBQUUsR0FBR1AsV0FBVyxDQUFDTSxDQUFDLENBQUNFLE1BQUYsQ0FBU0MsYUFBVixFQUF5Qiw4QkFBekIsQ0FBaEI7QUFDRDs7QUFDRCxVQUFJLENBQUNGLEVBQUwsRUFBUztBQUNQQSxRQUFBQSxFQUFFLEdBQUdQLFdBQVcsQ0FBQ00sQ0FBQyxDQUFDRSxNQUFGLENBQVNDLGFBQVQsQ0FBdUJBLGFBQXhCLEVBQXVDLDhCQUF2QyxDQUFoQjtBQUNEOztBQUNELFVBQUksQ0FBQ0YsRUFBTCxFQUFTLE9BQU8sS0FBUDtBQUNULFVBQUksQ0FBQ2hCLEtBQUssQ0FBQ21CLFVBQU4sQ0FBaUIsTUFBS2hCLEtBQUwsQ0FBV2lCLE1BQTVCLENBQUwsRUFBMEMsT0FBTyxLQUFQO0FBQzFDLFVBQUksTUFBS2pCLEtBQUwsQ0FBV2tCLE1BQWYsRUFBdUIsT0FBTyxLQUFQO0FBQ3ZCTixNQUFBQSxDQUFDLENBQUNPLGNBQUY7QUFDQSxVQUFNQyxLQUFLLEdBQUcsTUFBS3BCLEtBQUwsQ0FBV3FCLGlCQUFYLEtBQWlDeEIsS0FBSyxDQUFDeUIsWUFBTixDQUFtQixNQUFLdEIsS0FBTCxDQUFXaUIsTUFBOUIsQ0FBakMsSUFDVCxNQUFLakIsS0FBTCxDQUFXdUIsZ0JBQVgsS0FBZ0MsS0FEdkIsR0FFVixNQUZVLEdBR1YsS0FISjs7QUFJQSxVQUFJLE1BQUt2QixLQUFMLENBQVd3QixZQUFmLEVBQTZCO0FBQzNCLGNBQUt4QixLQUFMLENBQVd3QixZQUFYLENBQXdCLE1BQUt4QixLQUFMLENBQVd5QixJQUFuQyxFQUF5QyxNQUFLekIsS0FBTCxDQUFXMEIsT0FBcEQsRUFBNkQsTUFBSzFCLEtBQUwsQ0FBV2lCLE1BQXhFLEVBQWdGRyxLQUFoRjtBQUNEOztBQUNELGFBQU8sSUFBUDtBQUNELEs7OzRFQUV1QixVQUFDTyxTQUFELEVBQVlWLE1BQVosRUFBdUI7QUFDN0MsVUFBSVUsU0FBSixFQUFlO0FBQ2JuQyxRQUFBQSxTQUFTLENBQUN5QixNQUFNLENBQUNXLFVBQVIsaUNBQWlEL0IsS0FBSyxDQUFDeUIsWUFBTixDQUFtQkwsTUFBbkIsQ0FBakQsT0FBVDtBQUNBLDRCQUFPO0FBQUssVUFBQSxTQUFTLEVBQUM7QUFBZixXQUF5Q0EsTUFBTSxDQUFDVyxVQUFQLEVBQXpDLENBQVA7QUFDRDs7QUFDRCxhQUFPLElBQVA7QUFDRCxLOzttRUFFYyxZQUFNO0FBQUEsd0JBT2YsTUFBSzVCLEtBUFU7QUFBQSxVQUVqQkssUUFGaUIsZUFFakJBLFFBRmlCO0FBQUEsVUFHakJZLE1BSGlCLGVBR2pCQSxNQUhpQjtBQUFBLFVBSWpCSSxpQkFKaUIsZUFJakJBLGlCQUppQjtBQUFBLFVBS2pCRSxnQkFMaUIsZUFLakJBLGdCQUxpQjtBQUFBLFVBTWpCdEIsS0FOaUIsZUFNakJBLEtBTmlCO0FBUW5CLFVBQU00QixjQUFjLEdBQUdaLE1BQU0sQ0FBQ2EsVUFBUCxHQUFvQixHQUFwQixHQUEwQixFQUFqRDtBQUNBLFVBQU1DLGdCQUFnQixHQUFHVixpQkFBaUIsS0FBS3hCLEtBQUssQ0FBQ3lCLFlBQU4sQ0FBbUJMLE1BQW5CLENBQXRCLElBQW9ETSxnQkFBN0U7QUFDQSxVQUFNUyxTQUFTLEdBQUdULGdCQUFnQixLQUFLLE1BQXJCLEdBQThCLElBQTlCLEdBQXFDLElBQXZEO0FBQ0EsVUFBTVUsT0FBTyxHQUFHRixnQkFBZ0IsUUFBTUYsY0FBTixHQUF1QkcsU0FBdkIsR0FBcUNILGNBQXJFO0FBRUEsMEJBQ0Usb0JBQUMsTUFBRDtBQUFRLFFBQUEsS0FBSyxFQUFFNUIsS0FBZjtBQUFzQixRQUFBLFNBQVMsRUFBQztBQUFoQyxzQkFDRSxvQkFBQyxXQUFEO0FBQWEsUUFBQSxLQUFLLEVBQUVBO0FBQXBCLFNBQTRCSSxRQUE1QixDQURGLGVBRUUsb0JBQUMsT0FBRCxRQUFVNEIsT0FBVixDQUZGLENBREY7QUFNRCxLOzt5RUFFb0IsWUFBTTtBQUFBLHlCQUNxQyxNQUFLakMsS0FEMUM7QUFBQSxVQUNUa0MsRUFEUyxnQkFDakJULElBRGlCLENBQ1RTLEVBRFM7QUFBQSw2Q0FDSGpCLE1BREc7QUFBQSxVQUNPa0IsU0FEUCx1QkFDT0EsU0FEUDtBQUFBLFVBQ2tCQyxZQURsQix1QkFDa0JBLFlBRGxCO0FBRXpCLFVBQU1DLE9BQU8sR0FBR0QsWUFBWSxHQUFHQSxZQUFZLENBQUNFLG1CQUFoQixHQUFzQ0MsU0FBbEU7QUFDQSxhQUFPRixPQUFPLGdCQUVWLG9CQUFDLGNBQUQ7QUFDRSxRQUFBLFNBQVMsRUFBQyxLQURaO0FBRUUsUUFBQSxPQUFPLGVBQ0wsb0JBQUMsT0FBRDtBQUFTLFVBQUEsRUFBRSxxQ0FBbUNILEVBQW5DLFNBQXlDQztBQUFwRCxXQUNHRSxPQURILENBSEo7QUFPRSxRQUFBLEtBQUssRUFBRTtBQVBULFNBU0csTUFBS0csWUFBTCxFQVRILENBRlUsR0FjVixNQUFLQSxZQUFMLEVBZEo7QUFlRCxLOzs7Ozs7O1NBRURDLE0sR0FBQSxrQkFBUztBQUFBLHVCQWFILEtBQUt6QyxLQWJGO0FBQUEsUUFFTEssUUFGSyxnQkFFTEEsUUFGSztBQUFBLFFBR0xvQixJQUhLLGdCQUdMQSxJQUhLO0FBQUEsUUFJTEosaUJBSkssZ0JBSUxBLGlCQUpLO0FBQUEsUUFLTEUsZ0JBTEssZ0JBS0xBLGdCQUxLO0FBQUEsUUFNTEcsT0FOSyxnQkFNTEEsT0FOSztBQUFBLFFBT0xULE1BUEssZ0JBT0xBLE1BUEs7QUFBQSxRQVFMTyxZQVJLLGdCQVFMQSxZQVJLO0FBQUEsUUFTTE4sTUFUSyxnQkFTTEEsTUFUSztBQUFBLFFBVUxTLFNBVkssZ0JBVUxBLFNBVks7QUFBQSxRQVdMMUIsS0FYSyxnQkFXTEEsS0FYSztBQUFBLFFBWUZELEtBWkU7O0FBY1AsUUFBTTBDLGNBQWMsR0FBR25ELFVBQVUsQ0FBQztBQUNoQyxpQ0FBMkIsSUFESztBQUVoQ29ELE1BQUFBLFNBQVMsRUFBRSxDQUFDekIsTUFBRCxJQUFXckIsS0FBSyxDQUFDbUIsVUFBTixDQUFpQkMsTUFBakI7QUFGVSxLQUFELENBQWpDO0FBS0Esd0JBQ0Usb0JBQUMsSUFBRDtBQUFNLE1BQUEsU0FBUyxFQUFFeUIsY0FBakI7QUFBaUMsTUFBQSxPQUFPLEVBQUUsS0FBS2xCO0FBQS9DLE9BQWlFeEIsS0FBakUsR0FDRyxLQUFLNEMsa0JBQUwsRUFESCxFQUVHLEtBQUtDLHFCQUFMLENBQTJCbEIsU0FBM0IsRUFBc0NWLE1BQXRDLENBRkgsQ0FERjtBQU1ELEc7OztFQTVIcUM3QixLQUFLLENBQUMwRCxhOztnQkFBekJuQyxVLGtCQWNHO0FBQ3BCTixFQUFBQSxRQUFRLEVBQUUsRUFEVTtBQUVwQmtCLEVBQUFBLGdCQUFnQixFQUFFLElBRkU7QUFHcEJGLEVBQUFBLGlCQUFpQixFQUFFO0FBSEMsQzs7U0FkSFYsVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgQ2VsbCB9IGZyb20gJ2ZpeGVkLWRhdGEtdGFibGUtMic7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBpbnZhcmlhbnQgZnJvbSAnaW52YXJpYW50JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgT3ZlcmxheVRyaWdnZXIsIFRvb2x0aXAgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IHsgZ3JpZFNoYXBlIH0gZnJvbSAnLi9kYXRhZ3JpZC5wcm9wcyc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9kYXRhZ3JpZC51dGlscyc7XG5cbmNvbnN0IEhlYWRlciA9IHN0eWxlZC5kaXZgXG4gIC8qIE15c3RpY2FsIDE3cHggY29tZXMgZnJvbSAyKjhweCBwYWRkaW5ncyBvZiBwdWJsaWNfZml4ZWREYXRhVGFibGVDZWxsX2NlbGxDb250ZW50IHBsdXMgMXB4IGJvcmRlciB3aWR0aCAqL1xuICB3aWR0aDogJHtwcm9wcyA9PiBgY2FsYygke3Byb3BzLndpZHRofXB4IC0gMTdweClgfTtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGZsZXgtd3JhcDogbm93cmFwO1xuYDtcblxuY29uc3QgSGVhZGVyTGFiZWwgPSBzdHlsZWQuc3BhbmBcbiAgZmxleDogMCAxIGNvbnRlbnQ7XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuYDtcblxuY29uc3QgU3ltYm9scyA9IHN0eWxlZC5zcGFuYFxuICBmbGV4OiAxIDAgY29udGVudDtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgbWFyZ2luLWxlZnQ6ICR7cHJvcHMgPT4gKHByb3BzLmNoaWxkcmVuID8gJzVweCcgOiAnMCcpfTtcbmA7XG5cbmNvbnN0IGlzQ2xhc3NOYW1lID0gKGVsLCBjbGFzc05hbWUpID0+IHtcbiAgaWYgKHR5cGVvZiBlbC5jbGFzc05hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGVsLmNsYXNzTmFtZS5zcGxpdCgnICcpLmluY2x1ZGVzKGNsYXNzTmFtZSk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVhZGVyQ2VsbCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcbiAgICBncmlkOiBncmlkU2hhcGUuaXNSZXF1aXJlZCxcbiAgICBjb2x1bW5zOiBQcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9mb3JiaWQtcHJvcC10eXBlc1xuICAgIGNvbHVtbjogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L2ZvcmJpZC1wcm9wLXR5cGVzXG4gICAgY3VycmVudFNvcnRDb2x1bW46IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY3VycmVudFNvcnRPcmRlcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvblNvcnRDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgaXNCdXN5OiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGZpbHRlcmluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICB3aWR0aDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICB9XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBjaGlsZHJlbjogJycsXG4gICAgY3VycmVudFNvcnRPcmRlcjogbnVsbCxcbiAgICBjdXJyZW50U29ydENvbHVtbjogbnVsbCxcbiAgfVxuXG4gIG9uU29ydENoYW5nZSA9IChlKSA9PiB7XG4gICAgLy8gQ2hlY2sgaWYgY2xpY2sgdGFyZ2V0IGlzIGluIGFjdHVhbCBoZWFkZXIgdGFibGUgY2VsbCwgbm90IHRoZSBmaWx0ZXJpbmcgaW5wdXQgY29tcG9uZW50XG4gICAgLy8gRmlsdGVyaW5nIGNvbXBvbmVudCBjYW4gYmUgYW55dGhpbmcgYmVjYXVzZSBvZiBjdXN0b20gcmVuZGVyZXJzXG4gICAgbGV0IG9rID0gaXNDbGFzc05hbWUoZS50YXJnZXQsICdwdWJsaWNfZml4ZWREYXRhVGFibGVDZWxsX2NlbGxDb250ZW50Jyk7XG4gICAgaWYgKCFvaykge1xuICAgICAgb2sgPSBpc0NsYXNzTmFtZShlLnRhcmdldCwgJ3B1YmxpY19maXhlZERhdGFUYWJsZUNlbGxfd3JhcDMnKTtcbiAgICB9XG4gICAgaWYgKCFvaykge1xuICAgICAgb2sgPSBpc0NsYXNzTmFtZShlLnRhcmdldCwgJ29jLWRhdGFncmlkLWNlbGwtaGVhZGVyLXRleHQnKTtcbiAgICB9XG4gICAgaWYgKCFvaykge1xuICAgICAgb2sgPSBpc0NsYXNzTmFtZShlLnRhcmdldC5wYXJlbnRFbGVtZW50LCAnb2MtZGF0YWdyaWQtY2VsbC1oZWFkZXItdGV4dCcpO1xuICAgIH1cbiAgICBpZiAoIW9rKSB7XG4gICAgICBvayA9IGlzQ2xhc3NOYW1lKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCwgJ29jLWRhdGFncmlkLWNlbGwtaGVhZGVyLXRleHQnKTtcbiAgICB9XG4gICAgaWYgKCFvaykgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghVXRpbHMuaXNTb3J0YWJsZSh0aGlzLnByb3BzLmNvbHVtbikpIHJldHVybiBmYWxzZTtcbiAgICBpZiAodGhpcy5wcm9wcy5pc0J1c3kpIHJldHVybiBmYWxzZTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3Qgb3JkZXIgPSB0aGlzLnByb3BzLmN1cnJlbnRTb3J0Q29sdW1uID09PSBVdGlscy5nZXRDb2x1bW5LZXkodGhpcy5wcm9wcy5jb2x1bW4pXG4gICAgICAmJiB0aGlzLnByb3BzLmN1cnJlbnRTb3J0T3JkZXIgPT09ICdhc2MnXG4gICAgICA/ICdkZXNjJ1xuICAgICAgOiAnYXNjJztcbiAgICBpZiAodGhpcy5wcm9wcy5vblNvcnRDaGFuZ2UpIHtcbiAgICAgIHRoaXMucHJvcHMub25Tb3J0Q2hhbmdlKHRoaXMucHJvcHMuZ3JpZCwgdGhpcy5wcm9wcy5jb2x1bW5zLCB0aGlzLnByb3BzLmNvbHVtbiwgb3JkZXIpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGdldEZpbHRlcmluZ0NvbXBvbmVudCA9IChmaWx0ZXJpbmcsIGNvbHVtbikgPT4ge1xuICAgIGlmIChmaWx0ZXJpbmcpIHtcbiAgICAgIGludmFyaWFudChjb2x1bW4uY2VsbEZpbHRlciwgYE5vIGNlbGxGaWx0ZXIgZm9yIGNvbHVtbiAnJHtVdGlscy5nZXRDb2x1bW5LZXkoY29sdW1uKX0nYCk7XG4gICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1yb3ctZmlsdGVyXCI+e2NvbHVtbi5jZWxsRmlsdGVyKCl9PC9kaXY+O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJlbmRlckhlYWRlciA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBjaGlsZHJlbixcbiAgICAgIGNvbHVtbixcbiAgICAgIGN1cnJlbnRTb3J0Q29sdW1uLFxuICAgICAgY3VycmVudFNvcnRPcmRlcixcbiAgICAgIHdpZHRoLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHJlcXVpcmVkU3ltYm9sID0gY29sdW1uLmlzUmVxdWlyZWQgPyAnKicgOiAnJztcbiAgICBjb25zdCBpc1NvcnRlZEJ5Q29sdW1uID0gY3VycmVudFNvcnRDb2x1bW4gPT09IFV0aWxzLmdldENvbHVtbktleShjb2x1bW4pICYmIGN1cnJlbnRTb3J0T3JkZXI7XG4gICAgY29uc3Qgc29ydE9yZGVyID0gY3VycmVudFNvcnRPcmRlciA9PT0gJ2Rlc2MnID8gJyDihpMnIDogJyDihpEnO1xuICAgIGNvbnN0IHN5bWJvbHMgPSBpc1NvcnRlZEJ5Q29sdW1uID8gYCR7cmVxdWlyZWRTeW1ib2x9JHtzb3J0T3JkZXJ9YCA6IHJlcXVpcmVkU3ltYm9sO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxIZWFkZXIgd2lkdGg9e3dpZHRofSBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1jZWxsLWhlYWRlci10ZXh0XCI+XG4gICAgICAgIDxIZWFkZXJMYWJlbCB3aWR0aD17d2lkdGh9PntjaGlsZHJlbn08L0hlYWRlckxhYmVsPlxuICAgICAgICA8U3ltYm9scz57c3ltYm9sc308L1N5bWJvbHM+XG4gICAgICA8L0hlYWRlcj5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyQ29sdW1uSGVhZGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZ3JpZDogeyBpZCB9LCBjb2x1bW46IHsgY29sdW1uS2V5LCB0cmFuc2xhdGlvbnMgfSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB0b29sdGlwID0gdHJhbnNsYXRpb25zID8gdHJhbnNsYXRpb25zLmNvbHVtbkhlYWRlclRvb2x0aXAgOiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHRvb2x0aXBcbiAgICAgID8gKFxuICAgICAgICA8T3ZlcmxheVRyaWdnZXJcbiAgICAgICAgICBwbGFjZW1lbnQ9XCJ0b3BcIlxuICAgICAgICAgIG92ZXJsYXk9eyhcbiAgICAgICAgICAgIDxUb29sdGlwIGlkPXtgb2NEYXRhZ3JpZENvbHVtbkhlYWRlclRvb2x0aXAtJHtpZH0tJHtjb2x1bW5LZXl9YH0+XG4gICAgICAgICAgICAgIHt0b29sdGlwfVxuICAgICAgICAgICAgPC9Ub29sdGlwPlxuICAgICAgICAgICl9XG4gICAgICAgICAgZGVsYXk9ezUwMH1cbiAgICAgICAgPlxuICAgICAgICAgIHt0aGlzLnJlbmRlckhlYWRlcigpfVxuICAgICAgICA8L092ZXJsYXlUcmlnZ2VyPlxuICAgICAgKVxuICAgICAgOiB0aGlzLnJlbmRlckhlYWRlcigpO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBjaGlsZHJlbixcbiAgICAgIGdyaWQsXG4gICAgICBjdXJyZW50U29ydENvbHVtbixcbiAgICAgIGN1cnJlbnRTb3J0T3JkZXIsXG4gICAgICBjb2x1bW5zLFxuICAgICAgY29sdW1uLFxuICAgICAgb25Tb3J0Q2hhbmdlLFxuICAgICAgaXNCdXN5LFxuICAgICAgZmlsdGVyaW5nLFxuICAgICAgd2lkdGgsXG4gICAgICAuLi5wcm9wc1xuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGNlbGxDbGFzc05hbWVzID0gY2xhc3NOYW1lcyh7XG4gICAgICAnb2MtZGF0YWdyaWQtY2VsbC1oZWFkZXInOiB0cnVlLFxuICAgICAgY2xpY2thYmxlOiAhaXNCdXN5ICYmIFV0aWxzLmlzU29ydGFibGUoY29sdW1uKSxcbiAgICB9KTtcblxuICAgIHJldHVybiAoXG4gICAgICA8Q2VsbCBjbGFzc05hbWU9e2NlbGxDbGFzc05hbWVzfSBvbkNsaWNrPXt0aGlzLm9uU29ydENoYW5nZX0gey4uLnByb3BzfT5cbiAgICAgICAge3RoaXMucmVuZGVyQ29sdW1uSGVhZGVyKCl9XG4gICAgICAgIHt0aGlzLmdldEZpbHRlcmluZ0NvbXBvbmVudChmaWx0ZXJpbmcsIGNvbHVtbil9XG4gICAgICA8L0NlbGw+XG4gICAgKTtcbiAgfVxufVxuIl19