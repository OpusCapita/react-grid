"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));

var _reactIntl = require("react-intl");

var _immutable = require("immutable");

var _reactRedux = require("react-redux");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactFloatingSelect = require("@opuscapita/react-floating-select");

var _reactListItems = _interopRequireDefault(require("@opuscapita/react-list-items"));

var _datagrid = require("./datagrid.actions");

var _datagrid2 = require("./datagrid.props");

require("./datagrid.variables.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject4() {
  var data = _taggedTemplateLiteralLoose(["\n  min-width: 70px;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteralLoose(["\n  padding: 0 1rem;\n  white-space: nowrap;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteralLoose(["\n  display: flex;\n  align-items: center;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n  align-items: center;\n  display: flex;\n  padding: 1rem;\n  height: auto;\n  justify-content: space-between;\n  width: 100%;\n  flex: 0 0 auto;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteralLoose(strings, raw) { if (!raw) { raw = strings.slice(0); } strings.raw = raw; return strings; }

var ROWS_ON_PAGE_OPTIONS = [{
  label: '10',
  value: 10
}, {
  label: '25',
  value: 25
}, {
  label: '50',
  value: 50
}, {
  label: '75',
  value: 75
}, {
  label: '100',
  value: 100
}];

var Pagination = _styledComponents["default"].div(_templateObject());

var RowsOnPage = _styledComponents["default"].div(_templateObject2());

var RowsOnPageLabel = _styledComponents["default"].span(_templateObject3());

var RowsOnPageSelect = (0, _styledComponents["default"])(_reactFloatingSelect.FloatingSelectPortal)(_templateObject4());

var paginationComponent = function paginationComponent(WrappedComponent) {
  var _dec, _class, _class2, _temp;

  var mapStateToProps = function mapStateToProps(state, ownProps) {
    var GRID = ownProps.grid;
    return {
      filterData: state.datagrid.getIn([GRID.id, 'config', 'filteringData', 'filterData'], (0, _immutable.Map)()),
      isCreating: state.datagrid.getIn([GRID.id, 'session', 'isCreating'], false),
      isEditing: state.datagrid.getIn([GRID.id, 'session', 'isEditing'], false),
      page: state.datagrid.getIn([GRID.id, 'config', 'page']),
      rowsOnPage: state.datagrid.getIn([GRID.id, 'config', 'rowsOnPage']),
      sortColumn: state.datagrid.getIn([GRID.id, 'config', 'sortingData', 'sortColumn'], GRID.defaultSortColumn),
      sortOrder: state.datagrid.getIn([GRID.id, 'config', 'sortingData', 'sortOrder'], GRID.defaultSortOrder)
    };
  };

  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      setBusy: function setBusy(grid) {
        return dispatch((0, _datagrid.setBusy)(grid));
      },
      setPage: function setPage(grid, page) {
        return dispatch((0, _datagrid.setPage)(grid, page));
      },
      setRowsOnPage: function setRowsOnPage(grid, rowsOnPage) {
        return dispatch((0, _datagrid.setRowsOnPage)(grid, rowsOnPage));
      }
    };
  };

  var Pager = (_dec = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _reactIntl.injectIntl)(_class = _dec(_class = (_temp = _class2 = /*#__PURE__*/function (_React$PureComponent) {
    _inheritsLoose(Pager, _React$PureComponent);

    function Pager() {
      var _this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;

      _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
        var _this$props = _this.props,
            grid = _this$props.grid,
            pagination = _this$props.pagination,
            rowsOnPageOptions = _this$props.rowsOnPageOptions,
            rowsOnPage = _this$props.rowsOnPage,
            setRowsOnPage = _this$props.setRowsOnPage;

        if (pagination) {
          if (!rowsOnPage && rowsOnPageOptions && rowsOnPageOptions.length > 0) {
            var pageSize = rowsOnPage || pagination.pageSize;
            var selectedRowsOnPage = rowsOnPageOptions.find(function (option) {
              return option.value === pageSize;
            }) || rowsOnPageOptions[0];
            setRowsOnPage(grid, selectedRowsOnPage.value);
          } else _this.requestData();
        }
      });

      _defineProperty(_assertThisInitialized(_this), "componentDidUpdate", function (prevProps) {
        var _this$props2 = _this.props,
            filterData = _this$props2.filterData,
            pagination = _this$props2.pagination,
            page = _this$props2.page,
            rowsOnPage = _this$props2.rowsOnPage,
            sortColumn = _this$props2.sortColumn,
            sortOrder = _this$props2.sortOrder;

        if (pagination) {
          if (page !== 1 && (rowsOnPage !== prevProps.rowsOnPage || !filterData.equals(prevProps.filterData))) {
            _this.gotoPage(1);
          } else if (!filterData.equals(prevProps.filterData) || page !== prevProps.page || rowsOnPage !== prevProps.rowsOnPage || sortColumn !== prevProps.sortColumn || sortOrder !== prevProps.sortOrder) {
            _this.requestData();
          }
        }
      });

      _defineProperty(_assertThisInitialized(_this), "getSelectedRowsOnPageOption", function () {
        var _this$props3 = _this.props,
            rowsOnPage = _this$props3.rowsOnPage,
            rowsOnPageOptions = _this$props3.rowsOnPageOptions;
        return rowsOnPageOptions.find(function (option) {
          return option.value === rowsOnPage;
        });
      });

      _defineProperty(_assertThisInitialized(_this), "requestData", function () {
        var _this$props4 = _this.props,
            filterData = _this$props4.filterData,
            grid = _this$props4.grid,
            pagination = _this$props4.pagination,
            page = _this$props4.page,
            setBusy = _this$props4.setBusy,
            rowsOnPage = _this$props4.rowsOnPage,
            sortColumn = _this$props4.sortColumn,
            sortOrder = _this$props4.sortOrder;
        var offset = (page - 1) * rowsOnPage;
        setBusy(grid);
        pagination.getData(offset, rowsOnPage, filterData, sortColumn, sortOrder);
      });

      _defineProperty(_assertThisInitialized(_this), "gotoPage", function (page) {
        var grid = _this.props.grid;

        _this.props.setPage(grid, page);
      });

      _defineProperty(_assertThisInitialized(_this), "handleRowsOnPageChange", function (rowsOnPageOption) {
        var _this$props5 = _this.props,
            grid = _this$props5.grid,
            page = _this$props5.page,
            pagination = _this$props5.pagination;
        var rowsOnPage = rowsOnPageOption.value;

        _this.props.setRowsOnPage(grid, rowsOnPage);

        if (page > Math.ceil(pagination.totalSize / rowsOnPage)) {
          _this.gotoPage(1);
        }
      });

      _defineProperty(_assertThisInitialized(_this), "renderTotalCount", function () {
        var _this$props6 = _this.props,
            intl = _this$props6.intl,
            pagination = _this$props6.pagination;
        var totalLimit = pagination.totalLimit,
            totalSize = pagination.totalSize;
        var label;

        switch (totalSize) {
          case 1:
            label = intl.formatMessage({
              id: 'Grid.Pagination.TotalSingular'
            });
            break;

          case totalLimit:
            label = intl.formatMessage({
              id: 'Grid.Pagination.TotalOver'
            }, {
              n: totalSize
            });
            break;

          default:
            label = intl.formatMessage({
              id: 'Grid.Pagination.TotalPlural'
            }, {
              n: totalSize
            });
            break;
        }

        return /*#__PURE__*/_react["default"].createElement("span", null, label);
      });

      _defineProperty(_assertThisInitialized(_this), "render", function () {
        var _this$props7 = _this.props,
            children = _this$props7.children,
            grid = _this$props7.grid,
            intl = _this$props7.intl,
            isCreating = _this$props7.isCreating,
            isEditing = _this$props7.isEditing,
            page = _this$props7.page,
            pagination = _this$props7.pagination,
            rowsOnPage = _this$props7.rowsOnPage,
            rowsOnPageOptions = _this$props7.rowsOnPageOptions;
        var pageCount = pagination && pagination.totalSize > 0 && rowsOnPage > 0 ? Math.ceil(pagination.totalSize / rowsOnPage) : 1;
        var pages = [];

        for (var i = 1; i <= pageCount; i++) {
          pages.push(i);
        }

        return pagination ? /*#__PURE__*/_react["default"].createElement(WrappedComponent, _extends({}, _this.props, {
          grid: _extends({}, grid, {
            pagination: true
          })
        }), children, /*#__PURE__*/_react["default"].createElement(Pagination, {
          className: "footer"
        }, _this.renderTotalCount(), /*#__PURE__*/_react["default"].createElement(_reactListItems["default"], {
          disabled: isCreating || isEditing,
          goToItem: _this.gotoPage,
          id: grid.id + "-list-pagination-items",
          itemId: page,
          itemIds: (0, _immutable.List)(pages),
          typeable: true
        }), /*#__PURE__*/_react["default"].createElement(RowsOnPage, null, /*#__PURE__*/_react["default"].createElement(RowsOnPageLabel, null, intl.formatMessage({
          id: 'Grid.Pagination.RowsOnPage'
        })), /*#__PURE__*/_react["default"].createElement(RowsOnPageSelect, {
          id: grid.id + "-rows-on-page-select",
          isCrearable: false,
          isDisabled: isCreating || isEditing,
          onChange: _this.handleRowsOnPageChange,
          options: rowsOnPageOptions,
          value: _this.getSelectedRowsOnPageOption()
        })))) : /*#__PURE__*/_react["default"].createElement(WrappedComponent, _this.props);
      });

      return _this;
    }

    return Pager;
  }(_react["default"].PureComponent), _defineProperty(_class2, "defaultProps", {
    children: null,
    page: undefined,
    pagination: undefined,
    rowsOnPage: undefined,
    rowsOnPageOptions: ROWS_ON_PAGE_OPTIONS,
    sortColumn: undefined,
    sortOrder: undefined
  }), _temp)) || _class) || _class);
  return Pager;
};

var _default = paginationComponent;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9wYWdpbmF0aW9uLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUk9XU19PTl9QQUdFX09QVElPTlMiLCJsYWJlbCIsInZhbHVlIiwiUGFnaW5hdGlvbiIsInN0eWxlZCIsImRpdiIsIlJvd3NPblBhZ2UiLCJSb3dzT25QYWdlTGFiZWwiLCJzcGFuIiwiUm93c09uUGFnZVNlbGVjdCIsIkZsb2F0aW5nU2VsZWN0UG9ydGFsIiwicGFnaW5hdGlvbkNvbXBvbmVudCIsIldyYXBwZWRDb21wb25lbnQiLCJtYXBTdGF0ZVRvUHJvcHMiLCJzdGF0ZSIsIm93blByb3BzIiwiR1JJRCIsImdyaWQiLCJmaWx0ZXJEYXRhIiwiZGF0YWdyaWQiLCJnZXRJbiIsImlkIiwiaXNDcmVhdGluZyIsImlzRWRpdGluZyIsInBhZ2UiLCJyb3dzT25QYWdlIiwic29ydENvbHVtbiIsImRlZmF1bHRTb3J0Q29sdW1uIiwic29ydE9yZGVyIiwiZGVmYXVsdFNvcnRPcmRlciIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsImRpc3BhdGNoIiwic2V0QnVzeSIsInNldFBhZ2UiLCJzZXRSb3dzT25QYWdlIiwiUGFnZXIiLCJpbmplY3RJbnRsIiwicHJvcHMiLCJwYWdpbmF0aW9uIiwicm93c09uUGFnZU9wdGlvbnMiLCJsZW5ndGgiLCJwYWdlU2l6ZSIsInNlbGVjdGVkUm93c09uUGFnZSIsImZpbmQiLCJvcHRpb24iLCJyZXF1ZXN0RGF0YSIsInByZXZQcm9wcyIsImVxdWFscyIsImdvdG9QYWdlIiwib2Zmc2V0IiwiZ2V0RGF0YSIsInJvd3NPblBhZ2VPcHRpb24iLCJNYXRoIiwiY2VpbCIsInRvdGFsU2l6ZSIsImludGwiLCJ0b3RhbExpbWl0IiwiZm9ybWF0TWVzc2FnZSIsIm4iLCJjaGlsZHJlbiIsInBhZ2VDb3VudCIsInBhZ2VzIiwiaSIsInB1c2giLCJyZW5kZXJUb3RhbENvdW50IiwiaGFuZGxlUm93c09uUGFnZUNoYW5nZSIsImdldFNlbGVj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UyxFQUFFeUM7QUFQUyxHQTdEd0I7QUEyTWhELFNBQU9sQyxLQUFQO0FBQ0QsQ0E1TUQ7O2VBOE1leEIsbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgSW1tdXRhYmxlUHJvcFR5cGVzIGZyb20gJ3JlYWN0LWltbXV0YWJsZS1wcm9wdHlwZXMnO1xuaW1wb3J0IHsgaW5qZWN0SW50bCwgaW50bFNoYXBlIH0gZnJvbSAncmVhY3QtaW50bCc7XG5pbXBvcnQgeyBMaXN0LCBNYXAgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgRmxvYXRpbmdTZWxlY3RQb3J0YWwgfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1mbG9hdGluZy1zZWxlY3QnO1xuaW1wb3J0IExpc3RJdGVtcyBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1saXN0LWl0ZW1zJztcbmltcG9ydCB7IHNldEJ1c3kgYXMgc2V0QnVzeUFjdGlvbiwgc2V0UGFnZSwgc2V0Um93c09uUGFnZSBhcyBzZXRSb3dzT25QYWdlQWN0aW9uIH0gZnJvbSAnLi9kYXRhZ3JpZC5hY3Rpb25zJztcbmltcG9ydCB7IGdyaWRTaGFwZSB9IGZyb20gJy4vZGF0YWdyaWQucHJvcHMnO1xuXG5pbXBvcnQgJy4vZGF0YWdyaWQudmFyaWFibGVzLnNjc3MnO1xuXG5jb25zdCBST1dTX09OX1BBR0VfT1BUSU9OUyA9IFtcbiAge1xuICAgIGxhYmVsOiAnMTAnLFxuICAgIHZhbHVlOiAxMCxcbiAgfSxcbiAge1xuICAgIGxhYmVsOiAnMjUnLFxuICAgIHZhbHVlOiAyNSxcbiAgfSxcbiAge1xuICAgIGxhYmVsOiAnNTAnLFxuICAgIHZhbHVlOiA1MCxcbiAgfSxcbiAge1xuICAgIGxhYmVsOiAnNzUnLFxuICAgIHZhbHVlOiA3NSxcbiAgfSxcbiAge1xuICAgIGxhYmVsOiAnMTAwJyxcbiAgICB2YWx1ZTogMTAwLFxuICB9LFxuXTtcblxuY29uc3QgUGFnaW5hdGlvbiA9IHN0eWxlZC5kaXZgXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHBhZGRpbmc6IDFyZW07XG4gIGhlaWdodDogYXV0bztcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICB3aWR0aDogMTAwJTtcbiAgZmxleDogMCAwIGF1dG87XG5gO1xuXG5jb25zdCBSb3dzT25QYWdlID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbmA7XG5cbmNvbnN0IFJvd3NPblBhZ2VMYWJlbCA9IHN0eWxlZC5zcGFuYFxuICBwYWRkaW5nOiAwIDFyZW07XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG5gO1xuXG5jb25zdCBSb3dzT25QYWdlU2VsZWN0ID0gc3R5bGVkKEZsb2F0aW5nU2VsZWN0UG9ydGFsKWBcbiAgbWluLXdpZHRoOiA3MHB4O1xuYDtcblxuY29uc3QgcGFnaW5hdGlvbkNvbXBvbmVudCA9IChXcmFwcGVkQ29tcG9uZW50KSA9PiB7XG4gIGNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSwgb3duUHJvcHMpID0+IHtcbiAgICBjb25zdCBHUklEID0gb3duUHJvcHMuZ3JpZDtcbiAgICByZXR1cm4ge1xuICAgICAgZmlsdGVyRGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdmaWx0ZXJEYXRhJ10sIE1hcCgpKSxcbiAgICAgIGlzQ3JlYXRpbmc6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdpc0NyZWF0aW5nJ10sIGZhbHNlKSxcbiAgICAgIGlzRWRpdGluZzogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2lzRWRpdGluZyddLCBmYWxzZSksXG4gICAgICBwYWdlOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdwYWdlJ10pLFxuICAgICAgcm93c09uUGFnZTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAncm93c09uUGFnZSddKSxcbiAgICAgIHNvcnRDb2x1bW46IHN0YXRlLmRhdGFncmlkLmdldEluKFxuICAgICAgICBbR1JJRC5pZCwgJ2NvbmZpZycsICdzb3J0aW5nRGF0YScsICdzb3J0Q29sdW1uJ10sXG4gICAgICAgIEdSSUQuZGVmYXVsdFNvcnRDb2x1bW4sXG4gICAgICApLFxuICAgICAgc29ydE9yZGVyOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihcbiAgICAgICAgW0dSSUQuaWQsICdjb25maWcnLCAnc29ydGluZ0RhdGEnLCAnc29ydE9yZGVyJ10sXG4gICAgICAgIEdSSUQuZGVmYXVsdFNvcnRPcmRlcixcbiAgICAgICksXG4gICAgfTtcbiAgfTtcblxuICBjb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiAoe1xuICAgIHNldEJ1c3k6IGdyaWQgPT4gZGlzcGF0Y2goc2V0QnVzeUFjdGlvbihncmlkKSksXG4gICAgc2V0UGFnZTogKGdyaWQsIHBhZ2UpID0+IGRpc3BhdGNoKHNldFBhZ2UoZ3JpZCwgcGFnZSkpLFxuICAgIHNldFJvd3NPblBhZ2U6IChncmlkLCByb3dzT25QYWdlKSA9PiBkaXNwYXRjaChzZXRSb3dzT25QYWdlQWN0aW9uKGdyaWQsIHJvd3NPblBhZ2UpKSxcbiAgfSk7XG5cbiAgQGluamVjdEludGxcbiAgQGNvbm5lY3QoXG4gICAgbWFwU3RhdGVUb1Byb3BzLFxuICAgIG1hcERpc3BhdGNoVG9Qcm9wcyxcbiAgKVxuICBjbGFzcyBQYWdlciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICBncmlkOiBncmlkU2hhcGUuaXNSZXF1aXJlZCxcbiAgICAgIGZpbHRlckRhdGE6IEltbXV0YWJsZVByb3BUeXBlcy5tYXAuaXNSZXF1aXJlZCxcbiAgICAgIGludGw6IGludGxTaGFwZS5pc1JlcXVpcmVkLFxuICAgICAgaXNFZGl0aW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgaXNDcmVhdGluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgIHNldEJ1c3k6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICBzZXRQYWdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgc2V0Um93c09uUGFnZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcbiAgICAgIHBhZ2U6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICBwYWdpbmF0aW9uOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICBnZXREYXRhOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICBwYWdlU2l6ZTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICB0b3RhbFNpemU6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgdG90YWxMaW1pdDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIH0pLFxuICAgICAgcm93c09uUGFnZTogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIHJvd3NPblBhZ2VPcHRpb25zOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICBsYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmVsZW1lbnQsIFByb3BUeXBlcy5zdHJpbmddKS5pc1JlcXVpcmVkLFxuICAgICAgICAgIHZhbHVlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuYm9vbCwgUHJvcFR5cGVzLm51bWJlciwgUHJvcFR5cGVzLnN0cmluZ10pXG4gICAgICAgICAgICAuaXNSZXF1aXJlZCxcbiAgICAgICAgfSksXG4gICAgICApLFxuICAgICAgc29ydENvbHVtbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm51bWJlcl0pLFxuICAgICAgc29ydE9yZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIH07XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgY2hpbGRyZW46IG51bGwsXG4gICAgICBwYWdlOiB1bmRlZmluZWQsXG4gICAgICBwYWdpbmF0aW9uOiB1bmRlZmluZWQsXG4gICAgICByb3dzT25QYWdlOiB1bmRlZmluZWQsXG4gICAgICByb3dzT25QYWdlT3B0aW9uczogUk9XU19PTl9QQUdFX09QVElPTlMsXG4gICAgICBzb3J0Q29sdW1uOiB1bmRlZmluZWQsXG4gICAgICBzb3J0T3JkZXI6IHVuZGVmaW5lZCxcbiAgICB9O1xuXG4gICAgY29tcG9uZW50RGlkTW91bnQgPSAoKSA9PiB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGdyaWQsIHBhZ2luYXRpb24sIHJvd3NPblBhZ2VPcHRpb25zLCByb3dzT25QYWdlLCBzZXRSb3dzT25QYWdlLFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBpZiAocGFnaW5hdGlvbikge1xuICAgICAgICBpZiAoIXJvd3NPblBhZ2UgJiYgcm93c09uUGFnZU9wdGlvbnMgJiYgcm93c09uUGFnZU9wdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGNvbnN0IHBhZ2VTaXplID0gcm93c09uUGFnZSB8fCBwYWdpbmF0aW9uLnBhZ2VTaXplO1xuICAgICAgICAgIGNvbnN0IHNlbGVjdGVkUm93c09uUGFnZSA9IHJvd3NPblBhZ2VPcHRpb25zLmZpbmQoXG4gICAgICAgICAgICBvcHRpb24gPT4gb3B0aW9uLnZhbHVlID09PSBwYWdlU2l6ZSxcbiAgICAgICAgICApIHx8IHJvd3NPblBhZ2VPcHRpb25zWzBdO1xuICAgICAgICAgIHNldFJvd3NPblBhZ2UoZ3JpZCwgc2VsZWN0ZWRSb3dzT25QYWdlLnZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHRoaXMucmVxdWVzdERhdGEoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlID0gKHByZXZQcm9wcykgPT4ge1xuICAgICAgY29uc3Qge1xuICAgICAgICBmaWx0ZXJEYXRhLCBwYWdpbmF0aW9uLCBwYWdlLCByb3dzT25QYWdlLCBzb3J0Q29sdW1uLCBzb3J0T3JkZXIsXG4gICAgICB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGlmIChwYWdpbmF0aW9uKSB7XG4gICAgICAgIGlmIChwYWdlICE9PSAxICYmIChyb3dzT25QYWdlICE9PSBwcmV2UHJvcHMucm93c09uUGFnZVxuICAgICAgICAgIHx8ICFmaWx0ZXJEYXRhLmVxdWFscyhwcmV2UHJvcHMuZmlsdGVyRGF0YSkpKSB7XG4gICAgICAgICAgdGhpcy5nb3RvUGFnZSgxKTtcbiAgICAgICAgfSBlbHNlIGlmICghZmlsdGVyRGF0YS5lcXVhbHMocHJldlByb3BzLmZpbHRlckRhdGEpXG4gICAgICAgICAgICB8fCBwYWdlICE9PSBwcmV2UHJvcHMucGFnZVxuICAgICAgICAgICAgfHwgcm93c09uUGFnZSAhPT0gcHJldlByb3BzLnJvd3NPblBhZ2VcbiAgICAgICAgICAgIHx8IHNvcnRDb2x1bW4gIT09IHByZXZQcm9wcy5zb3J0Q29sdW1uXG4gICAgICAgICAgICB8fCBzb3J0T3JkZXIgIT09IHByZXZQcm9wcy5zb3J0T3JkZXIpIHtcbiAgICAgICAgICB0aGlzLnJlcXVlc3REYXRhKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZ2V0U2VsZWN0ZWRSb3dzT25QYWdlT3B0aW9uID0gKCkgPT4ge1xuICAgICAgY29uc3QgeyByb3dzT25QYWdlLCByb3dzT25QYWdlT3B0aW9ucyB9ID0gdGhpcy5wcm9wcztcbiAgICAgIHJldHVybiByb3dzT25QYWdlT3B0aW9ucy5maW5kKG9wdGlvbiA9PiBvcHRpb24udmFsdWUgPT09IHJvd3NPblBhZ2UpO1xuICAgIH07XG5cbiAgICByZXF1ZXN0RGF0YSA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgZmlsdGVyRGF0YSwgZ3JpZCwgcGFnaW5hdGlvbiwgcGFnZSwgc2V0QnVzeSwgcm93c09uUGFnZSwgc29ydENvbHVtbiwgc29ydE9yZGVyLFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCBvZmZzZXQgPSAocGFnZSAtIDEpICogcm93c09uUGFnZTtcbiAgICAgIHNldEJ1c3koZ3JpZCk7XG4gICAgICBwYWdpbmF0aW9uLmdldERhdGEob2Zmc2V0LCByb3dzT25QYWdlLCBmaWx0ZXJEYXRhLCBzb3J0Q29sdW1uLCBzb3J0T3JkZXIpO1xuICAgIH07XG5cbiAgICBnb3RvUGFnZSA9IChwYWdlKSA9PiB7XG4gICAgICBjb25zdCB7IGdyaWQgfSA9IHRoaXMucHJvcHM7XG4gICAgICB0aGlzLnByb3BzLnNldFBhZ2UoZ3JpZCwgcGFnZSk7XG4gICAgfTtcblxuICAgIGhhbmRsZVJvd3NPblBhZ2VDaGFuZ2UgPSAocm93c09uUGFnZU9wdGlvbikgPT4ge1xuICAgICAgY29uc3QgeyBncmlkLCBwYWdlLCBwYWdpbmF0aW9uIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3Qgcm93c09uUGFnZSA9IHJvd3NPblBhZ2VPcHRpb24udmFsdWU7XG4gICAgICB0aGlzLnByb3BzLnNldFJvd3NPblBhZ2UoZ3JpZCwgcm93c09uUGFnZSk7XG4gICAgICBpZiAocGFnZSA+IE1hdGguY2VpbChwYWdpbmF0aW9uLnRvdGFsU2l6ZSAvIHJvd3NPblBhZ2UpKSB7XG4gICAgICAgIHRoaXMuZ290b1BhZ2UoMSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJlbmRlclRvdGFsQ291bnQgPSAoKSA9PiB7XG4gICAgICBjb25zdCB7IGludGwsIHBhZ2luYXRpb24gfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCB7IHRvdGFsTGltaXQsIHRvdGFsU2l6ZSB9ID0gcGFnaW5hdGlvbjtcbiAgICAgIGxldCBsYWJlbDtcbiAgICAgIHN3aXRjaCAodG90YWxTaXplKSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICBsYWJlbCA9IGludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5QYWdpbmF0aW9uLlRvdGFsU2luZ3VsYXInIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHRvdGFsTGltaXQ6XG4gICAgICAgICAgbGFiZWwgPSBpbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuUGFnaW5hdGlvbi5Ub3RhbE92ZXInIH0sIHsgbjogdG90YWxTaXplIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGxhYmVsID0gaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLlBhZ2luYXRpb24uVG90YWxQbHVyYWwnIH0sIHsgbjogdG90YWxTaXplIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgcmV0dXJuIDxzcGFuPntsYWJlbH08L3NwYW4+O1xuICAgIH07XG5cbiAgICByZW5kZXIgPSAoKSA9PiB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGNoaWxkcmVuLFxuICAgICAgICBncmlkLFxuICAgICAgICBpbnRsLFxuICAgICAgICBpc0NyZWF0aW5nLFxuICAgICAgICBpc0VkaXRpbmcsXG4gICAgICAgIHBhZ2UsXG4gICAgICAgIHBhZ2luYXRpb24sXG4gICAgICAgIHJvd3NPblBhZ2UsXG4gICAgICAgIHJvd3NPblBhZ2VPcHRpb25zLFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCBwYWdlQ291bnQgPSBwYWdpbmF0aW9uICYmIHBhZ2luYXRpb24udG90YWxTaXplID4gMCAmJiByb3dzT25QYWdlID4gMFxuICAgICAgICA/IE1hdGguY2VpbChwYWdpbmF0aW9uLnRvdGFsU2l6ZSAvIHJvd3NPblBhZ2UpXG4gICAgICAgIDogMTtcbiAgICAgIGNvbnN0IHBhZ2VzID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBwYWdlQ291bnQ7IGkrKykge1xuICAgICAgICBwYWdlcy5wdXNoKGkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHBhZ2luYXRpb24gPyAoXG4gICAgICAgIDxXcmFwcGVkQ29tcG9uZW50IHsuLi50aGlzLnByb3BzfSBncmlkPXt7IC4uLmdyaWQsIHBhZ2luYXRpb246IHRydWUgfX0+XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICAgIDxQYWdpbmF0aW9uIGNsYXNzTmFtZT1cImZvb3RlclwiPlxuICAgICAgICAgICAge3RoaXMucmVuZGVyVG90YWxDb3VudCgpfVxuICAgICAgICAgICAgPExpc3RJdGVtc1xuICAgICAgICAgICAgICBkaXNhYmxlZD17aXNDcmVhdGluZyB8fCBpc0VkaXRpbmd9XG4gICAgICAgICAgICAgIGdvVG9JdGVtPXt0aGlzLmdvdG9QYWdlfVxuICAgICAgICAgICAgICBpZD17YCR7Z3JpZC5pZH0tbGlzdC1wYWdpbmF0aW9uLWl0ZW1zYH1cbiAgICAgICAgICAgICAgaXRlbUlkPXtwYWdlfVxuICAgICAgICAgICAgICBpdGVtSWRzPXtMaXN0KHBhZ2VzKX1cbiAgICAgICAgICAgICAgdHlwZWFibGVcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8Um93c09uUGFnZT5cbiAgICAgICAgICAgICAgPFJvd3NPblBhZ2VMYWJlbD5cbiAgICAgICAgICAgICAgICB7aW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLlBhZ2luYXRpb24uUm93c09uUGFnZScgfSl9XG4gICAgICAgICAgICAgIDwvUm93c09uUGFnZUxhYmVsPlxuICAgICAgICAgICAgICA8Um93c09uUGFnZVNlbGVjdFxuICAgICAgICAgICAgICAgIGlkPXtgJHtncmlkLmlkfS1yb3dzLW9uLXBhZ2Utc2VsZWN0YH1cbiAgICAgICAgICAgICAgICBpc0NyZWFyYWJsZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgaXNEaXNhYmxlZD17aXNDcmVhdGluZyB8fCBpc0VkaXRpbmd9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlUm93c09uUGFnZUNoYW5nZX1cbiAgICAgICAgICAgICAgICBvcHRpb25zPXtyb3dzT25QYWdlT3B0aW9uc31cbiAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRTZWxlY3RlZFJvd3NPblBhZ2VPcHRpb24oKX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvUm93c09uUGFnZT5cbiAgICAgICAgICA8L1BhZ2luYXRpb24+XG4gICAgICAgIDwvV3JhcHBlZENvbXBvbmVudD5cbiAgICAgICkgOiAoXG4gICAgICAgIDxXcmFwcGVkQ29tcG9uZW50IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgKTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIFBhZ2VyO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcGFnaW5hdGlvbkNvbXBvbmVudDtcbiJdfQ==