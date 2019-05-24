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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9wYWdpbmF0aW9uLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUk9XU19PTl9QQUdFX09QVElPTlMiLCJsYWJlbCIsInZhbHVlIiwiUGFnaW5hdGlvbiIsInN0eWxlZCIsImRpdiIsIlJvd3NPblBhZ2UiLCJSb3dzT25QYWdlTGFiZWwiLCJzcGFuIiwiUm93c09uUGFnZVNlbGVjdCIsIkZsb2F0aW5nU2VsZWN0UG9ydGFsIiwicGFnaW5hdGlvbkNvbXBvbmVudCIsIldyYXBwZWRDb21wb25lbnQiLCJtYXBTdGF0ZVRvUHJvcHMiLCJzdGF0ZSIsIm93blByb3BzIiwiR1JJRCIsImdyaWQiLCJmaWx0ZXJEYXRhIiwiZGF0YWdyaWQiLCJnZXRJbiIsImlkIiwiaXNDcmVhdGluZyIsImlzRWRpdGluZyIsInBhZ2UiLCJyb3dzT25QYWdlIiwic29ydENvbHVtbiIsImRlZmF1bHRTb3J0Q29sdW1uIiwic29ydE9yZGVyIiwiZGVmYXVsdFNvcnRPcmRlciIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsImRpc3BhdGNoIiwic2V0UGFnZSIsInNldFJvd3NPblBhZ2UiLCJQYWdlciIsImluamVjdEludGwiLCJwcm9wcyIsInBhZ2luYXRpb24iLCJyb3dzT25QYWdlT3B0aW9ucyIsImxlbmd0aCIsInBhZ2VTaXplIiwic2VsZWN0ZWRSb3dzT25QYWdlIiwiZmluZCIsIm9wdGlvbiIsInJlcXVlc3REYXRhIiwicHJldlByb3BzIiwiZXF1YWxzIiwiZ290b1BhZ2UiLCJvZmZzZXQiLCJnZXREYXRhIiwicm93c09uUGFnZU9wdGlvbiIsIk1hdGgiLCJjZWlsIiwidG90YWxTaXplIiwiaW50bCIsInRvdGFsTGltaXQiLCJmb3JtYXRNZXNzYWdlIiwibiIsImNoaWxkcmVuIiwicGFnZUNvdW50IiwicGFnZXMiLCJpIiwicHVzaCIsInJlbmRlclRvdGFsQ291bnQiLCJoYW5kbGVSb3dzT25QYWdlQ2hhbmdlIiwiZ2V0U2VsZWN0ZWRSb3dzT25Q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QUxYO0FBTUUsVUFBQSxRQUFRO0FBTlYsVUFGRixFQVVFLGdDQUFDLFVBQUQsUUFDRSxnQ0FBQyxlQUFELFFBQ0dOLElBQUksQ0FBQ0UsYUFBTCxDQUFtQjtBQUFFbkMsVUFBQUEsRUFBRSxFQUFFO0FBQU4sU0FBbkIsQ0FESCxDQURGLEVBSUUsZ0NBQUMsZ0JBQUQ7QUFDRSxVQUFBLFdBQVcsRUFBRSxLQURmO0FBRUUsVUFBQSxVQUFVLEVBQUVDLFVBQVUsSUFBSUMsU0FGNUI7QUFHRSxVQUFBLFFBQVEsRUFBRSxNQUFLeUMsc0JBSGpCO0FBSUUsVUFBQSxPQUFPLEVBQUUxQixpQkFKWDtBQUtFLFVBQUEsS0FBSyxFQUFFLE1BQUsyQiwyQkFBTDtBQUxULFVBSkYsQ0FWRixDQUZGLENBRGUsR0E0QmYsZ0NBQUMsZ0JBQUQsRUFBc0IsTUFBSzdCLEtBQTNCLENBNUJGO0FBOEJELE9BcE02Qzs7QUFBQTtBQUFBOztBQUFBO0FBQUEsSUE4QjVCOEIsa0JBQU1DLGFBOUJzQiw0Q0EyRHhCO0FBQ3BCVCxJQUFBQSxRQUFRLEVBQUUsSUFEVTtBQUVwQmxDLElBQUFBLElBQUksRUFBRTRDLFNBRmM7QUFHcEIvQixJQUFBQSxVQUFVLEVBQUUrQixTQUhRO0FBSXBCM0MsSUFBQUEsVUFBVSxFQUFFMkMsU0FKUTtBQUtwQjlCLElBQUFBLGlCQUFpQixFQUFFdEMsb0JBTEM7QUFNcEIwQixJQUFBQSxVQUFVLEVBQUUwQyxTQU5RO0FBT3BCeEMsSUFBQUEsU0FBUyxFQUFFd0M7QUFQUyxHQTNEd0I7QUF1TWhELFNBQU9sQyxLQUFQO0FBQ0QsQ0F4TUQ7O2VBME1ldkIsbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgSW1tdXRhYmxlUHJvcFR5cGVzIGZyb20gJ3JlYWN0LWltbXV0YWJsZS1wcm9wdHlwZXMnO1xuaW1wb3J0IHsgaW5qZWN0SW50bCwgaW50bFNoYXBlIH0gZnJvbSAncmVhY3QtaW50bCc7XG5pbXBvcnQgeyBMaXN0LCBNYXAgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgRmxvYXRpbmdTZWxlY3RQb3J0YWwgfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1mbG9hdGluZy1zZWxlY3QnO1xuaW1wb3J0IExpc3RJdGVtcyBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1saXN0LWl0ZW1zJztcbmltcG9ydCB7IHNldFBhZ2UsIHNldFJvd3NPblBhZ2UgYXMgc2V0Um93c09uUGFnZUFjdGlvbiB9IGZyb20gJy4vZGF0YWdyaWQuYWN0aW9ucyc7XG5pbXBvcnQgeyBncmlkU2hhcGUgfSBmcm9tICcuL2RhdGFncmlkLnByb3BzJztcblxuaW1wb3J0ICcuL2RhdGFncmlkLnZhcmlhYmxlcy5zY3NzJztcblxuY29uc3QgUk9XU19PTl9QQUdFX09QVElPTlMgPSBbXG4gIHtcbiAgICBsYWJlbDogJzEwJyxcbiAgICB2YWx1ZTogMTAsXG4gIH0sXG4gIHtcbiAgICBsYWJlbDogJzI1JyxcbiAgICB2YWx1ZTogMjUsXG4gIH0sXG4gIHtcbiAgICBsYWJlbDogJzUwJyxcbiAgICB2YWx1ZTogNTAsXG4gIH0sXG4gIHtcbiAgICBsYWJlbDogJzc1JyxcbiAgICB2YWx1ZTogNzUsXG4gIH0sXG4gIHtcbiAgICBsYWJlbDogJzEwMCcsXG4gICAgdmFsdWU6IDEwMCxcbiAgfSxcbl07XG5cbmNvbnN0IFBhZ2luYXRpb24gPSBzdHlsZWQuZGl2YFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBkaXNwbGF5OiBmbGV4O1xuICBwYWRkaW5nOiAxcmVtO1xuICBoZWlnaHQ6IGF1dG87XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgd2lkdGg6IDEwMCU7XG4gIGZsZXg6IDAgMCBhdXRvO1xuYDtcblxuY29uc3QgUm93c09uUGFnZSA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5gO1xuXG5jb25zdCBSb3dzT25QYWdlTGFiZWwgPSBzdHlsZWQuc3BhbmBcbiAgcGFkZGluZzogMCAxcmVtO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuYDtcblxuY29uc3QgUm93c09uUGFnZVNlbGVjdCA9IHN0eWxlZChGbG9hdGluZ1NlbGVjdFBvcnRhbClgXG4gIG1pbi13aWR0aDogNzBweDtcbmA7XG5cbmNvbnN0IHBhZ2luYXRpb25Db21wb25lbnQgPSAoV3JhcHBlZENvbXBvbmVudCkgPT4ge1xuICBjb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUsIG93blByb3BzKSA9PiB7XG4gICAgY29uc3QgR1JJRCA9IG93blByb3BzLmdyaWQ7XG4gICAgcmV0dXJuIHtcbiAgICAgIGZpbHRlckRhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnZmlsdGVyRGF0YSddLCBNYXAoKSksXG4gICAgICBpc0NyZWF0aW5nOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnaXNDcmVhdGluZyddLCBmYWxzZSksXG4gICAgICBpc0VkaXRpbmc6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdpc0VkaXRpbmcnXSwgZmFsc2UpLFxuICAgICAgcGFnZTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAncGFnZSddKSxcbiAgICAgIHJvd3NPblBhZ2U6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ3Jvd3NPblBhZ2UnXSksXG4gICAgICBzb3J0Q29sdW1uOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihcbiAgICAgICAgW0dSSUQuaWQsICdjb25maWcnLCAnc29ydGluZ0RhdGEnLCAnc29ydENvbHVtbiddLFxuICAgICAgICBHUklELmRlZmF1bHRTb3J0Q29sdW1uLFxuICAgICAgKSxcbiAgICAgIHNvcnRPcmRlcjogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oXG4gICAgICAgIFtHUklELmlkLCAnY29uZmlnJywgJ3NvcnRpbmdEYXRhJywgJ3NvcnRPcmRlciddLFxuICAgICAgICBHUklELmRlZmF1bHRTb3J0T3JkZXIsXG4gICAgICApLFxuICAgIH07XG4gIH07XG5cbiAgY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4gKHtcbiAgICBzZXRQYWdlOiAoZ3JpZCwgcGFnZSkgPT4gZGlzcGF0Y2goc2V0UGFnZShncmlkLCBwYWdlKSksXG4gICAgc2V0Um93c09uUGFnZTogKGdyaWQsIHJvd3NPblBhZ2UpID0+IGRpc3BhdGNoKHNldFJvd3NPblBhZ2VBY3Rpb24oZ3JpZCwgcm93c09uUGFnZSkpLFxuICB9KTtcblxuICBAaW5qZWN0SW50bFxuICBAY29ubmVjdChcbiAgICBtYXBTdGF0ZVRvUHJvcHMsXG4gICAgbWFwRGlzcGF0Y2hUb1Byb3BzLFxuICApXG4gIGNsYXNzIFBhZ2VyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgIGdyaWQ6IGdyaWRTaGFwZS5pc1JlcXVpcmVkLFxuICAgICAgZmlsdGVyRGF0YTogSW1tdXRhYmxlUHJvcFR5cGVzLm1hcC5pc1JlcXVpcmVkLFxuICAgICAgaW50bDogaW50bFNoYXBlLmlzUmVxdWlyZWQsXG4gICAgICBpc0VkaXRpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgICBpc0NyZWF0aW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgc2V0UGFnZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIHNldFJvd3NPblBhZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgICBwYWdlOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgcGFnaW5hdGlvbjogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgZ2V0RGF0YTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgcGFnZVNpemU6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgdG90YWxTaXplOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgIHRvdGFsTGltaXQ6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICB9KSxcbiAgICAgIHJvd3NPblBhZ2U6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICByb3dzT25QYWdlT3B0aW9uczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgbGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5lbGVtZW50LCBQcm9wVHlwZXMuc3RyaW5nXSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICB2YWx1ZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmJvb2wsIFByb3BUeXBlcy5udW1iZXIsIFByb3BUeXBlcy5zdHJpbmddKVxuICAgICAgICAgICAgLmlzUmVxdWlyZWQsXG4gICAgICAgIH0pLFxuICAgICAgKSxcbiAgICAgIHNvcnRDb2x1bW46IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5udW1iZXJdKSxcbiAgICAgIHNvcnRPcmRlcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB9O1xuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgIGNoaWxkcmVuOiBudWxsLFxuICAgICAgcGFnZTogdW5kZWZpbmVkLFxuICAgICAgcGFnaW5hdGlvbjogdW5kZWZpbmVkLFxuICAgICAgcm93c09uUGFnZTogdW5kZWZpbmVkLFxuICAgICAgcm93c09uUGFnZU9wdGlvbnM6IFJPV1NfT05fUEFHRV9PUFRJT05TLFxuICAgICAgc29ydENvbHVtbjogdW5kZWZpbmVkLFxuICAgICAgc29ydE9yZGVyOiB1bmRlZmluZWQsXG4gICAgfTtcblxuICAgIGNvbXBvbmVudERpZE1vdW50ID0gKCkgPT4ge1xuICAgICAgY29uc3Qge1xuICAgICAgICBncmlkLCBwYWdpbmF0aW9uLCByb3dzT25QYWdlT3B0aW9ucywgcm93c09uUGFnZSwgc2V0Um93c09uUGFnZSxcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuICAgICAgaWYgKHBhZ2luYXRpb24pIHtcbiAgICAgICAgaWYgKCFyb3dzT25QYWdlICYmIHJvd3NPblBhZ2VPcHRpb25zICYmIHJvd3NPblBhZ2VPcHRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBjb25zdCBwYWdlU2l6ZSA9IHJvd3NPblBhZ2UgfHwgcGFnaW5hdGlvbi5wYWdlU2l6ZTtcbiAgICAgICAgICBjb25zdCBzZWxlY3RlZFJvd3NPblBhZ2UgPSByb3dzT25QYWdlT3B0aW9ucy5maW5kKFxuICAgICAgICAgICAgb3B0aW9uID0+IG9wdGlvbi52YWx1ZSA9PT0gcGFnZVNpemUsXG4gICAgICAgICAgKSB8fCByb3dzT25QYWdlT3B0aW9uc1swXTtcbiAgICAgICAgICBzZXRSb3dzT25QYWdlKGdyaWQsIHNlbGVjdGVkUm93c09uUGFnZS52YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB0aGlzLnJlcXVlc3REYXRhKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSA9IChwcmV2UHJvcHMpID0+IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgZmlsdGVyRGF0YSwgcGFnaW5hdGlvbiwgcGFnZSwgcm93c09uUGFnZSwgc29ydENvbHVtbiwgc29ydE9yZGVyLFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBpZiAocGFnaW5hdGlvbikge1xuICAgICAgICBpZiAocGFnZSAhPT0gMSAmJiAocm93c09uUGFnZSAhPT0gcHJldlByb3BzLnJvd3NPblBhZ2VcbiAgICAgICAgICB8fCAhZmlsdGVyRGF0YS5lcXVhbHMocHJldlByb3BzLmZpbHRlckRhdGEpKSkge1xuICAgICAgICAgIHRoaXMuZ290b1BhZ2UoMSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIWZpbHRlckRhdGEuZXF1YWxzKHByZXZQcm9wcy5maWx0ZXJEYXRhKVxuICAgICAgICAgICAgfHwgcGFnZSAhPT0gcHJldlByb3BzLnBhZ2VcbiAgICAgICAgICAgIHx8IHJvd3NPblBhZ2UgIT09IHByZXZQcm9wcy5yb3dzT25QYWdlXG4gICAgICAgICAgICB8fCBzb3J0Q29sdW1uICE9PSBwcmV2UHJvcHMuc29ydENvbHVtblxuICAgICAgICAgICAgfHwgc29ydE9yZGVyICE9PSBwcmV2UHJvcHMuc29ydE9yZGVyKSB7XG4gICAgICAgICAgdGhpcy5yZXF1ZXN0RGF0YSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIGdldFNlbGVjdGVkUm93c09uUGFnZU9wdGlvbiA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHsgcm93c09uUGFnZSwgcm93c09uUGFnZU9wdGlvbnMgfSA9IHRoaXMucHJvcHM7XG4gICAgICByZXR1cm4gcm93c09uUGFnZU9wdGlvbnMuZmluZChvcHRpb24gPT4gb3B0aW9uLnZhbHVlID09PSByb3dzT25QYWdlKTtcbiAgICB9O1xuXG4gICAgcmVxdWVzdERhdGEgPSAoKSA9PiB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGZpbHRlckRhdGEsIHBhZ2luYXRpb24sIHBhZ2UsIHJvd3NPblBhZ2UsIHNvcnRDb2x1bW4sIHNvcnRPcmRlcixcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3Qgb2Zmc2V0ID0gKHBhZ2UgLSAxKSAqIHJvd3NPblBhZ2U7XG4gICAgICBwYWdpbmF0aW9uLmdldERhdGEob2Zmc2V0LCByb3dzT25QYWdlLCBmaWx0ZXJEYXRhLCBzb3J0Q29sdW1uLCBzb3J0T3JkZXIpO1xuICAgIH07XG5cbiAgICBnb3RvUGFnZSA9IChwYWdlKSA9PiB7XG4gICAgICBjb25zdCB7IGdyaWQgfSA9IHRoaXMucHJvcHM7XG4gICAgICB0aGlzLnByb3BzLnNldFBhZ2UoZ3JpZCwgcGFnZSk7XG4gICAgfTtcblxuICAgIGhhbmRsZVJvd3NPblBhZ2VDaGFuZ2UgPSAocm93c09uUGFnZU9wdGlvbikgPT4ge1xuICAgICAgY29uc3QgeyBncmlkLCBwYWdlLCBwYWdpbmF0aW9uIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3Qgcm93c09uUGFnZSA9IHJvd3NPblBhZ2VPcHRpb24udmFsdWU7XG4gICAgICB0aGlzLnByb3BzLnNldFJvd3NPblBhZ2UoZ3JpZCwgcm93c09uUGFnZSk7XG4gICAgICBpZiAocGFnZSA+IE1hdGguY2VpbChwYWdpbmF0aW9uLnRvdGFsU2l6ZSAvIHJvd3NPblBhZ2UpKSB7XG4gICAgICAgIHRoaXMuZ290b1BhZ2UoMSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJlbmRlclRvdGFsQ291bnQgPSAoKSA9PiB7XG4gICAgICBjb25zdCB7IGludGwsIHBhZ2luYXRpb24gfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCB7IHRvdGFsTGltaXQsIHRvdGFsU2l6ZSB9ID0gcGFnaW5hdGlvbjtcbiAgICAgIGxldCBsYWJlbDtcbiAgICAgIHN3aXRjaCAodG90YWxTaXplKSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICBsYWJlbCA9IGludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5QYWdpbmF0aW9uLlRvdGFsU2luZ3VsYXInIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHRvdGFsTGltaXQ6XG4gICAgICAgICAgbGFiZWwgPSBpbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuUGFnaW5hdGlvbi5Ub3RhbE92ZXInIH0sIHsgbjogdG90YWxTaXplIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGxhYmVsID0gaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLlBhZ2luYXRpb24uVG90YWxQbHVyYWwnIH0sIHsgbjogdG90YWxTaXplIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgcmV0dXJuIDxzcGFuPntsYWJlbH08L3NwYW4+O1xuICAgIH07XG5cbiAgICByZW5kZXIgPSAoKSA9PiB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGNoaWxkcmVuLFxuICAgICAgICBncmlkLFxuICAgICAgICBpbnRsLFxuICAgICAgICBpc0NyZWF0aW5nLFxuICAgICAgICBpc0VkaXRpbmcsXG4gICAgICAgIHBhZ2UsXG4gICAgICAgIHBhZ2luYXRpb24sXG4gICAgICAgIHJvd3NPblBhZ2UsXG4gICAgICAgIHJvd3NPblBhZ2VPcHRpb25zLFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCBwYWdlQ291bnQgPSBwYWdpbmF0aW9uICYmIHBhZ2luYXRpb24udG90YWxTaXplID4gMCAmJiByb3dzT25QYWdlID4gMFxuICAgICAgICA/IE1hdGguY2VpbChwYWdpbmF0aW9uLnRvdGFsU2l6ZSAvIHJvd3NPblBhZ2UpXG4gICAgICAgIDogMTtcbiAgICAgIGNvbnN0IHBhZ2VzID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBwYWdlQ291bnQ7IGkrKykge1xuICAgICAgICBwYWdlcy5wdXNoKGkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHBhZ2luYXRpb24gPyAoXG4gICAgICAgIDxXcmFwcGVkQ29tcG9uZW50IHsuLi50aGlzLnByb3BzfSBncmlkPXt7IC4uLmdyaWQsIHBhZ2luYXRpb246IHRydWUgfX0+XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICAgIDxQYWdpbmF0aW9uIGNsYXNzTmFtZT1cImZvb3RlclwiPlxuICAgICAgICAgICAge3RoaXMucmVuZGVyVG90YWxDb3VudCgpfVxuICAgICAgICAgICAgPExpc3RJdGVtc1xuICAgICAgICAgICAgICBkaXNhYmxlZD17aXNDcmVhdGluZyB8fCBpc0VkaXRpbmd9XG4gICAgICAgICAgICAgIGdvVG9JdGVtPXt0aGlzLmdvdG9QYWdlfVxuICAgICAgICAgICAgICBpZD1cImxpc3RQYWdpbmF0aW9uSXRlbXNcIlxuICAgICAgICAgICAgICBpdGVtSWQ9e3BhZ2V9XG4gICAgICAgICAgICAgIGl0ZW1JZHM9e0xpc3QocGFnZXMpfVxuICAgICAgICAgICAgICB0eXBlYWJsZVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxSb3dzT25QYWdlPlxuICAgICAgICAgICAgICA8Um93c09uUGFnZUxhYmVsPlxuICAgICAgICAgICAgICAgIHtpbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuUGFnaW5hdGlvbi5Sb3dzT25QYWdlJyB9KX1cbiAgICAgICAgICAgICAgPC9Sb3dzT25QYWdlTGFiZWw+XG4gICAgICAgICAgICAgIDxSb3dzT25QYWdlU2VsZWN0XG4gICAgICAgICAgICAgICAgaXNDcmVhcmFibGU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgIGlzRGlzYWJsZWQ9e2lzQ3JlYXRpbmcgfHwgaXNFZGl0aW5nfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVJvd3NPblBhZ2VDaGFuZ2V9XG4gICAgICAgICAgICAgICAgb3B0aW9ucz17cm93c09uUGFnZU9wdGlvbnN9XG4gICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0U2VsZWN0ZWRSb3dzT25QYWdlT3B0aW9uKCl9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L1Jvd3NPblBhZ2U+XG4gICAgICAgICAgPC9QYWdpbmF0aW9uPlxuICAgICAgICA8L1dyYXBwZWRDb21wb25lbnQ+XG4gICAgICApIDogKFxuICAgICAgICA8V3JhcHBlZENvbXBvbmVudCB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICk7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBQYWdlcjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBhZ2luYXRpb25Db21wb25lbnQ7XG4iXX0=