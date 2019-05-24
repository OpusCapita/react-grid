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
      setPage: function setPage(grid, page) {
        return dispatch((0, _datagrid.setPage)(grid, page));
      },
      setRowsOnPage: function setRowsOnPage(grid, rowsOnPage) {
        return dispatch((0, _datagrid.setRowsOnPage)(grid, rowsOnPage));
      }
    };
  };

  var Pager = (_dec = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _reactIntl.injectIntl)(_class = _dec(_class = (_temp = _class2 =
  /*#__PURE__*/
  function (_React$PureComponent) {
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
            pagination = _this$props4.pagination,
            page = _this$props4.page,
            rowsOnPage = _this$props4.rowsOnPage,
            sortColumn = _this$props4.sortColumn,
            sortOrder = _this$props4.sortOrder;
        var offset = (page - 1) * rowsOnPage;
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

        return _react["default"].createElement("span", null, label);
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

        return pagination ? _react["default"].createElement(WrappedComponent, _extends({}, _this.props, {
          grid: _extends({}, grid, {
            pagination: true
          })
        }), children, _react["default"].createElement(Pagination, {
          className: "footer"
        }, _this.renderTotalCount(), _react["default"].createElement(_reactListItems["default"], {
          disabled: isCreating || isEditing,
          goToItem: _this.gotoPage,
          id: "listPaginationItems",
          itemId: page,
          itemIds: (0, _immutable.List)(pages),
          typeable: true
        }), _react["default"].createElement(RowsOnPage, null, _react["default"].createElement(RowsOnPageLabel, null, intl.formatMessage({
          id: 'Grid.Pagination.RowsOnPage'
        })), _react["default"].createElement(RowsOnPageSelect, {
          isCrearable: false,
          isDisabled: isCreating || isEditing,
          onChange: _this.handleRowsOnPageChange,
          options: rowsOnPageOptions,
          value: _this.getSelectedRowsOnPageOption()
        })))) : _react["default"].createElement(WrappedComponent, _this.props);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9wYWdpbmF0aW9uLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUk9XU19PTl9QQUdFX09QVElPTlMiLCJsYWJlbCIsInZhbHVlIiwiUGFnaW5hdGlvbiIsInN0eWxlZCIsImRpdiIsIlJvd3NPblBhZ2UiLCJSb3dzT25QYWdlTGFiZWwiLCJzcGFuIiwiUm93c09uUGFnZVNlbGVjdCIsIkZsb2F0aW5nU2VsZWN0UG9ydGFsIiwicGFnaW5hdGlvbkNvbXBvbmVudCIsIldyYXBwZWRDb21wb25lbnQiLCJtYXBTdGF0ZVRvUHJvcHMiLCJzdGF0ZSIsIm93blByb3BzIiwiR1JJRCIsImdyaWQiLCJmaWx0ZXJEYXRhIiwiZGF0YWdyaWQiLCJnZXRJbiIsImlkIiwiaXNDcmVhdGluZyIsImlzRWRpdGluZyIsInBhZ2UiLCJyb3dzT25QYWdlIiwic29ydENvbHVtbiIsImRlZmF1bHRTb3J0Q29sdW1uIiwic29ydE9yZGVyIiwiZGVmYXVsdFNvcnRPcmRlciIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsImRpc3BhdGNoIiwic2V0UGFnZSIsInNldFJvd3NPblBhZ2UiLCJQYWdlciIsImluamVjdEludGwiLCJwcm9wcyIsInBhZ2luYXRpb24iLCJyb3dzT25QYWdlT3B0aW9ucyIsImxlbmd0aCIsInBhZ2VTaXplIiwic2VsZWN0ZWRSb3dzT25QYWdlIiwiZmluZCIsIm9wdGlvbiIsInJlcXVlc3REYXRhIiwicHJldlByb3BzIiwiZXF1YWxzIiwiZ290b1BhZ2UiLCJvZmZzZXQiLCJnZXREYXRhIiwicm93c09uUGFnZU9wdGlvbiIsIk1hdGgiLCJjZWlsIiwidG90YWxTaXplIiwiaW50bCIsInRvdGFsTGltaXQiLCJmb3JtYXRNZXNzYWdlIiwibiIsImNoaWxkcmVuIiwicGFnZUNvdW50IiwicGFnZXMiLCJpIiwicHVzaCIsInJlbmRlclRvdGFsQ291bnQiLCJoYW5kbGVSb3dzT25QYWdlQ2hhbmdlIiwiZ2V0U2VsZWN0ZWRSb3dzT25Q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LENBTFg7QUFNRSxVQUFBLFFBQVE7QUFOVixVQUZGLEVBVUUsZ0NBQUMsVUFBRCxRQUNFLGdDQUFDLGVBQUQsUUFDR04sSUFBSSxDQUFDRSxhQUFMLENBQW1CO0FBQUVuQyxVQUFBQSxFQUFFLEVBQUU7QUFBTixTQUFuQixDQURILENBREYsRUFJRSxnQ0FBQyxnQkFBRDtBQUNFLFVBQUEsV0FBVyxFQUFFLEtBRGY7QUFFRSxVQUFBLFVBQVUsRUFBRUMsVUFBVSxJQUFJQyxTQUY1QjtBQUdFLFVBQUEsUUFBUSxFQUFFLE1BQUt5QyxzQkFIakI7QUFJRSxVQUFBLE9BQU8sRUFBRTFCLGlCQUpYO0FBS0UsVUFBQSxLQUFLLEVBQUUsTUFBSzJCLDJCQUFMO0FBTFQsVUFKRixDQVZGLENBRkYsQ0FEZSxHQTRCZixnQ0FBQyxnQkFBRCxFQUFzQixNQUFLN0IsS0FBM0IsQ0E1QkY7QUE4QkQsT0FuTTZDOztBQUFBO0FBQUE7O0FBQUE7QUFBQSxJQThCNUI4QixrQkFBTUMsYUE5QnNCLDRDQTJEeEI7QUFDcEJULElBQUFBLFFBQVEsRUFBRSxJQURVO0FBRXBCbEMsSUFBQUEsSUFBSSxFQUFFNEMsU0FGYztBQUdwQi9CLElBQUFBLFVBQVUsRUFBRStCLFNBSFE7QUFJcEIzQyxJQUFBQSxVQUFVLEVBQUUyQyxTQUpRO0FBS3BCOUIsSUFBQUEsaUJBQWlCLEVBQUV0QyxvQkFMQztBQU1wQjBCLElBQUFBLFVBQVUsRUFBRTBDLFNBTlE7QUFPcEJ4QyxJQUFBQSxTQUFTLEVBQUV3QztBQVBTLEdBM0R3QjtBQXNNaEQsU0FBT2xDLEtBQVA7QUFDRCxDQXZNRDs7ZUF5TWV2QixtQiIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLXBsdXNwbHVzICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgeyBpbmplY3RJbnRsLCBpbnRsU2hhcGUgfSBmcm9tICdyZWFjdC1pbnRsJztcbmltcG9ydCB7IExpc3QsIE1hcCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgeyBGbG9hdGluZ1NlbGVjdFBvcnRhbCB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWZsb2F0aW5nLXNlbGVjdCc7XG5pbXBvcnQgTGlzdEl0ZW1zIGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWxpc3QtaXRlbXMnO1xuaW1wb3J0IHsgc2V0UGFnZSwgc2V0Um93c09uUGFnZSBhcyBzZXRSb3dzT25QYWdlQWN0aW9uIH0gZnJvbSAnLi9kYXRhZ3JpZC5hY3Rpb25zJztcbmltcG9ydCB7IGdyaWRTaGFwZSB9IGZyb20gJy4vZGF0YWdyaWQucHJvcHMnO1xuXG5pbXBvcnQgJy4vZGF0YWdyaWQudmFyaWFibGVzLnNjc3MnO1xuXG5jb25zdCBST1dTX09OX1BBR0VfT1BUSU9OUyA9IFtcbiAge1xuICAgIGxhYmVsOiAnMTAnLFxuICAgIHZhbHVlOiAxMCxcbiAgfSxcbiAge1xuICAgIGxhYmVsOiAnMjUnLFxuICAgIHZhbHVlOiAyNSxcbiAgfSxcbiAge1xuICAgIGxhYmVsOiAnNTAnLFxuICAgIHZhbHVlOiA1MCxcbiAgfSxcbiAge1xuICAgIGxhYmVsOiAnNzUnLFxuICAgIHZhbHVlOiA3NSxcbiAgfSxcbiAge1xuICAgIGxhYmVsOiAnMTAwJyxcbiAgICB2YWx1ZTogMTAwLFxuICB9LFxuXTtcblxuY29uc3QgUGFnaW5hdGlvbiA9IHN0eWxlZC5kaXZgXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHBhZGRpbmc6IDFyZW07XG4gIGhlaWdodDogYXV0bztcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICB3aWR0aDogMTAwJTtcbiAgZmxleDogMCAwIGF1dG87XG5gO1xuXG5jb25zdCBSb3dzT25QYWdlID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbmA7XG5cbmNvbnN0IFJvd3NPblBhZ2VMYWJlbCA9IHN0eWxlZC5zcGFuYFxuICBwYWRkaW5nOiAwIDFyZW07XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG5gO1xuXG5jb25zdCBSb3dzT25QYWdlU2VsZWN0ID0gc3R5bGVkKEZsb2F0aW5nU2VsZWN0UG9ydGFsKWBcbiAgbWluLXdpZHRoOiA3MHB4O1xuYDtcblxuY29uc3QgcGFnaW5hdGlvbkNvbXBvbmVudCA9IChXcmFwcGVkQ29tcG9uZW50KSA9PiB7XG4gIGNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSwgb3duUHJvcHMpID0+IHtcbiAgICBjb25zdCBHUklEID0gb3duUHJvcHMuZ3JpZDtcbiAgICByZXR1cm4ge1xuICAgICAgZmlsdGVyRGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdmaWx0ZXJEYXRhJ10sIE1hcCgpKSxcbiAgICAgIGlzQ3JlYXRpbmc6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdpc0NyZWF0aW5nJ10sIGZhbHNlKSxcbiAgICAgIGlzRWRpdGluZzogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2lzRWRpdGluZyddLCBmYWxzZSksXG4gICAgICBwYWdlOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdwYWdlJ10pLFxuICAgICAgcm93c09uUGFnZTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAncm93c09uUGFnZSddKSxcbiAgICAgIHNvcnRDb2x1bW46IHN0YXRlLmRhdGFncmlkLmdldEluKFxuICAgICAgICBbR1JJRC5pZCwgJ2NvbmZpZycsICdzb3J0aW5nRGF0YScsICdzb3J0Q29sdW1uJ10sXG4gICAgICAgIEdSSUQuZGVmYXVsdFNvcnRDb2x1bW4sXG4gICAgICApLFxuICAgICAgc29ydE9yZGVyOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihcbiAgICAgICAgW0dSSUQuaWQsICdjb25maWcnLCAnc29ydGluZ0RhdGEnLCAnc29ydE9yZGVyJ10sXG4gICAgICAgIEdSSUQuZGVmYXVsdFNvcnRPcmRlcixcbiAgICAgICksXG4gICAgfTtcbiAgfTtcblxuICBjb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiAoe1xuICAgIHNldFBhZ2U6IChncmlkLCBwYWdlKSA9PiBkaXNwYXRjaChzZXRQYWdlKGdyaWQsIHBhZ2UpKSxcbiAgICBzZXRSb3dzT25QYWdlOiAoZ3JpZCwgcm93c09uUGFnZSkgPT4gZGlzcGF0Y2goc2V0Um93c09uUGFnZUFjdGlvbihncmlkLCByb3dzT25QYWdlKSksXG4gIH0pO1xuXG4gIEBpbmplY3RJbnRsXG4gIEBjb25uZWN0KFxuICAgIG1hcFN0YXRlVG9Qcm9wcyxcbiAgICBtYXBEaXNwYXRjaFRvUHJvcHMsXG4gIClcbiAgY2xhc3MgUGFnZXIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgZ3JpZDogZ3JpZFNoYXBlLmlzUmVxdWlyZWQsXG4gICAgICBmaWx0ZXJEYXRhOiBJbW11dGFibGVQcm9wVHlwZXMubWFwLmlzUmVxdWlyZWQsXG4gICAgICBpbnRsOiBpbnRsU2hhcGUuaXNSZXF1aXJlZCxcbiAgICAgIGlzRWRpdGluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgIGlzQ3JlYXRpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgICBzZXRQYWdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgc2V0Um93c09uUGFnZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcbiAgICAgIHBhZ2U6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICBwYWdpbmF0aW9uOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICBnZXREYXRhOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICBwYWdlU2l6ZTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICB0b3RhbFNpemU6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgdG90YWxMaW1pdDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIH0pLFxuICAgICAgcm93c09uUGFnZTogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIHJvd3NPblBhZ2VPcHRpb25zOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICBsYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmVsZW1lbnQsIFByb3BUeXBlcy5zdHJpbmddKS5pc1JlcXVpcmVkLFxuICAgICAgICAgIHZhbHVlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuYm9vbCwgUHJvcFR5cGVzLm51bWJlciwgUHJvcFR5cGVzLnN0cmluZ10pXG4gICAgICAgICAgICAuaXNSZXF1aXJlZCxcbiAgICAgICAgfSksXG4gICAgICApLFxuICAgICAgc29ydENvbHVtbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm51bWJlcl0pLFxuICAgICAgc29ydE9yZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIH07XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgY2hpbGRyZW46IG51bGwsXG4gICAgICBwYWdlOiB1bmRlZmluZWQsXG4gICAgICBwYWdpbmF0aW9uOiB1bmRlZmluZWQsXG4gICAgICByb3dzT25QYWdlOiB1bmRlZmluZWQsXG4gICAgICByb3dzT25QYWdlT3B0aW9uczogUk9XU19PTl9QQUdFX09QVElPTlMsXG4gICAgICBzb3J0Q29sdW1uOiB1bmRlZmluZWQsXG4gICAgICBzb3J0T3JkZXI6IHVuZGVmaW5lZCxcbiAgICB9O1xuXG4gICAgY29tcG9uZW50RGlkTW91bnQgPSAoKSA9PiB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGdyaWQsIHBhZ2luYXRpb24sIHJvd3NPblBhZ2VPcHRpb25zLCByb3dzT25QYWdlLCBzZXRSb3dzT25QYWdlLFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBpZiAocGFnaW5hdGlvbikge1xuICAgICAgICBpZiAoIXJvd3NPblBhZ2UgJiYgcm93c09uUGFnZU9wdGlvbnMgJiYgcm93c09uUGFnZU9wdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGNvbnN0IHBhZ2VTaXplID0gcm93c09uUGFnZSB8fCBwYWdpbmF0aW9uLnBhZ2VTaXplO1xuICAgICAgICAgIGNvbnN0IHNlbGVjdGVkUm93c09uUGFnZSA9IHJvd3NPblBhZ2VPcHRpb25zLmZpbmQoXG4gICAgICAgICAgICBvcHRpb24gPT4gb3B0aW9uLnZhbHVlID09PSBwYWdlU2l6ZSxcbiAgICAgICAgICApIHx8IHJvd3NPblBhZ2VPcHRpb25zWzBdO1xuICAgICAgICAgIHNldFJvd3NPblBhZ2UoZ3JpZCwgc2VsZWN0ZWRSb3dzT25QYWdlLnZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHRoaXMucmVxdWVzdERhdGEoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlID0gKHByZXZQcm9wcykgPT4ge1xuICAgICAgY29uc3Qge1xuICAgICAgICBmaWx0ZXJEYXRhLCBwYWdpbmF0aW9uLCBwYWdlLCByb3dzT25QYWdlLCBzb3J0Q29sdW1uLCBzb3J0T3JkZXIsXG4gICAgICB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGlmIChwYWdpbmF0aW9uKSB7XG4gICAgICAgIGlmIChwYWdlICE9PSAxICYmIChyb3dzT25QYWdlICE9PSBwcmV2UHJvcHMucm93c09uUGFnZSB8fCAhZmlsdGVyRGF0YS5lcXVhbHMocHJldlByb3BzLmZpbHRlckRhdGEpKSkge1xuICAgICAgICAgIHRoaXMuZ290b1BhZ2UoMSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIWZpbHRlckRhdGEuZXF1YWxzKHByZXZQcm9wcy5maWx0ZXJEYXRhKVxuICAgICAgICAgICAgfHwgcGFnZSAhPT0gcHJldlByb3BzLnBhZ2VcbiAgICAgICAgICAgIHx8IHJvd3NPblBhZ2UgIT09IHByZXZQcm9wcy5yb3dzT25QYWdlXG4gICAgICAgICAgICB8fCBzb3J0Q29sdW1uICE9PSBwcmV2UHJvcHMuc29ydENvbHVtblxuICAgICAgICAgICAgfHwgc29ydE9yZGVyICE9PSBwcmV2UHJvcHMuc29ydE9yZGVyKSB7XG4gICAgICAgICAgdGhpcy5yZXF1ZXN0RGF0YSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIGdldFNlbGVjdGVkUm93c09uUGFnZU9wdGlvbiA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHsgcm93c09uUGFnZSwgcm93c09uUGFnZU9wdGlvbnMgfSA9IHRoaXMucHJvcHM7XG4gICAgICByZXR1cm4gcm93c09uUGFnZU9wdGlvbnMuZmluZChvcHRpb24gPT4gb3B0aW9uLnZhbHVlID09PSByb3dzT25QYWdlKTtcbiAgICB9O1xuXG4gICAgcmVxdWVzdERhdGEgPSAoKSA9PiB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGZpbHRlckRhdGEsIHBhZ2luYXRpb24sIHBhZ2UsIHJvd3NPblBhZ2UsIHNvcnRDb2x1bW4sIHNvcnRPcmRlcixcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3Qgb2Zmc2V0ID0gKHBhZ2UgLSAxKSAqIHJvd3NPblBhZ2U7XG4gICAgICBwYWdpbmF0aW9uLmdldERhdGEob2Zmc2V0LCByb3dzT25QYWdlLCBmaWx0ZXJEYXRhLCBzb3J0Q29sdW1uLCBzb3J0T3JkZXIpO1xuICAgIH07XG5cbiAgICBnb3RvUGFnZSA9IChwYWdlKSA9PiB7XG4gICAgICBjb25zdCB7IGdyaWQgfSA9IHRoaXMucHJvcHM7XG4gICAgICB0aGlzLnByb3BzLnNldFBhZ2UoZ3JpZCwgcGFnZSk7XG4gICAgfTtcblxuICAgIGhhbmRsZVJvd3NPblBhZ2VDaGFuZ2UgPSAocm93c09uUGFnZU9wdGlvbikgPT4ge1xuICAgICAgY29uc3QgeyBncmlkLCBwYWdlLCBwYWdpbmF0aW9uIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3Qgcm93c09uUGFnZSA9IHJvd3NPblBhZ2VPcHRpb24udmFsdWU7XG4gICAgICB0aGlzLnByb3BzLnNldFJvd3NPblBhZ2UoZ3JpZCwgcm93c09uUGFnZSk7XG4gICAgICBpZiAocGFnZSA+IE1hdGguY2VpbChwYWdpbmF0aW9uLnRvdGFsU2l6ZSAvIHJvd3NPblBhZ2UpKSB7XG4gICAgICAgIHRoaXMuZ290b1BhZ2UoMSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJlbmRlclRvdGFsQ291bnQgPSAoKSA9PiB7XG4gICAgICBjb25zdCB7IGludGwsIHBhZ2luYXRpb24gfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCB7IHRvdGFsTGltaXQsIHRvdGFsU2l6ZSB9ID0gcGFnaW5hdGlvbjtcbiAgICAgIGxldCBsYWJlbDtcbiAgICAgIHN3aXRjaCAodG90YWxTaXplKSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICBsYWJlbCA9IGludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5QYWdpbmF0aW9uLlRvdGFsU2luZ3VsYXInIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHRvdGFsTGltaXQ6XG4gICAgICAgICAgbGFiZWwgPSBpbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuUGFnaW5hdGlvbi5Ub3RhbE92ZXInIH0sIHsgbjogdG90YWxTaXplIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGxhYmVsID0gaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLlBhZ2luYXRpb24uVG90YWxQbHVyYWwnIH0sIHsgbjogdG90YWxTaXplIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgcmV0dXJuIDxzcGFuPntsYWJlbH08L3NwYW4+O1xuICAgIH07XG5cbiAgICByZW5kZXIgPSAoKSA9PiB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGNoaWxkcmVuLFxuICAgICAgICBncmlkLFxuICAgICAgICBpbnRsLFxuICAgICAgICBpc0NyZWF0aW5nLFxuICAgICAgICBpc0VkaXRpbmcsXG4gICAgICAgIHBhZ2UsXG4gICAgICAgIHBhZ2luYXRpb24sXG4gICAgICAgIHJvd3NPblBhZ2UsXG4gICAgICAgIHJvd3NPblBhZ2VPcHRpb25zLFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCBwYWdlQ291bnQgPSBwYWdpbmF0aW9uICYmIHBhZ2luYXRpb24udG90YWxTaXplID4gMCAmJiByb3dzT25QYWdlID4gMFxuICAgICAgICA/IE1hdGguY2VpbChwYWdpbmF0aW9uLnRvdGFsU2l6ZSAvIHJvd3NPblBhZ2UpXG4gICAgICAgIDogMTtcbiAgICAgIGNvbnN0IHBhZ2VzID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBwYWdlQ291bnQ7IGkrKykge1xuICAgICAgICBwYWdlcy5wdXNoKGkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHBhZ2luYXRpb24gPyAoXG4gICAgICAgIDxXcmFwcGVkQ29tcG9uZW50IHsuLi50aGlzLnByb3BzfSBncmlkPXt7IC4uLmdyaWQsIHBhZ2luYXRpb246IHRydWUgfX0+XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICAgIDxQYWdpbmF0aW9uIGNsYXNzTmFtZT1cImZvb3RlclwiPlxuICAgICAgICAgICAge3RoaXMucmVuZGVyVG90YWxDb3VudCgpfVxuICAgICAgICAgICAgPExpc3RJdGVtc1xuICAgICAgICAgICAgICBkaXNhYmxlZD17aXNDcmVhdGluZyB8fCBpc0VkaXRpbmd9XG4gICAgICAgICAgICAgIGdvVG9JdGVtPXt0aGlzLmdvdG9QYWdlfVxuICAgICAgICAgICAgICBpZD1cImxpc3RQYWdpbmF0aW9uSXRlbXNcIlxuICAgICAgICAgICAgICBpdGVtSWQ9e3BhZ2V9XG4gICAgICAgICAgICAgIGl0ZW1JZHM9e0xpc3QocGFnZXMpfVxuICAgICAgICAgICAgICB0eXBlYWJsZVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxSb3dzT25QYWdlPlxuICAgICAgICAgICAgICA8Um93c09uUGFnZUxhYmVsPlxuICAgICAgICAgICAgICAgIHtpbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuUGFnaW5hdGlvbi5Sb3dzT25QYWdlJyB9KX1cbiAgICAgICAgICAgICAgPC9Sb3dzT25QYWdlTGFiZWw+XG4gICAgICAgICAgICAgIDxSb3dzT25QYWdlU2VsZWN0XG4gICAgICAgICAgICAgICAgaXNDcmVhcmFibGU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgIGlzRGlzYWJsZWQ9e2lzQ3JlYXRpbmcgfHwgaXNFZGl0aW5nfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVJvd3NPblBhZ2VDaGFuZ2V9XG4gICAgICAgICAgICAgICAgb3B0aW9ucz17cm93c09uUGFnZU9wdGlvbnN9XG4gICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0U2VsZWN0ZWRSb3dzT25QYWdlT3B0aW9uKCl9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L1Jvd3NPblBhZ2U+XG4gICAgICAgICAgPC9QYWdpbmF0aW9uPlxuICAgICAgICA8L1dyYXBwZWRDb21wb25lbnQ+XG4gICAgICApIDogKFxuICAgICAgICA8V3JhcHBlZENvbXBvbmVudCB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICk7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBQYWdlcjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBhZ2luYXRpb25Db21wb25lbnQ7XG4iXX0=