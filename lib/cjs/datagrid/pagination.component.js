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
  var data = _taggedTemplateLiteralLoose(["\n  min-width: 60px;\n"]);

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

    function Pager(props) {
      var _this;

      _this = _React$PureComponent.call(this, props) || this;

      _defineProperty(_assertThisInitialized(_this), "componentDidUpdate", function (prevProps) {
        var _this$props = _this.props,
            filterData = _this$props.filterData,
            pagination = _this$props.pagination,
            page = _this$props.page,
            rowsOnPage = _this$props.rowsOnPage,
            sortColumn = _this$props.sortColumn,
            sortOrder = _this$props.sortOrder;

        if (pagination && !filterData.equals(prevProps.filterData) && page > 1) {
          _this.gotoPage(1);
        } else if (pagination && (!filterData.equals(prevProps.filterData) || page !== prevProps.page || rowsOnPage !== prevProps.rowsOnPage || sortColumn !== prevProps.sortColumn || sortOrder !== prevProps.sortOrder)) {
          _this.requestData();
        }
      });

      _defineProperty(_assertThisInitialized(_this), "getSelectedRowsOnPageOption", function () {
        var _this$props2 = _this.props,
            rowsOnPage = _this$props2.rowsOnPage,
            rowsOnPageOptions = _this$props2.rowsOnPageOptions;
        return rowsOnPageOptions.find(function (option) {
          return option.value === rowsOnPage;
        });
      });

      _defineProperty(_assertThisInitialized(_this), "requestData", function () {
        var _this$props3 = _this.props,
            filterData = _this$props3.filterData,
            pagination = _this$props3.pagination,
            page = _this$props3.page,
            rowsOnPage = _this$props3.rowsOnPage,
            sortColumn = _this$props3.sortColumn,
            sortOrder = _this$props3.sortOrder;
        var offset = (page - 1) * rowsOnPage;
        pagination.getData(offset, rowsOnPage, filterData, sortColumn, sortOrder);
      });

      _defineProperty(_assertThisInitialized(_this), "gotoPage", function (page) {
        var grid = _this.props.grid;

        _this.props.setPage(grid, page);
      });

      _defineProperty(_assertThisInitialized(_this), "handleRowsOnPageChange", function (rowsOnPageOption) {
        var _this$props4 = _this.props,
            grid = _this$props4.grid,
            page = _this$props4.page,
            pagination = _this$props4.pagination;
        var rowsOnPage = rowsOnPageOption.value;

        _this.props.setRowsOnPage(grid, rowsOnPage);

        if (page > Math.ceil(pagination.totalSize / rowsOnPage)) {
          _this.gotoPage(1);
        }
      });

      _defineProperty(_assertThisInitialized(_this), "renderTotalCount", function () {
        var _this$props5 = _this.props,
            intl = _this$props5.intl,
            pagination = _this$props5.pagination;
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
        var _this$props6 = _this.props,
            children = _this$props6.children,
            grid = _this$props6.grid,
            intl = _this$props6.intl,
            isCreating = _this$props6.isCreating,
            isEditing = _this$props6.isEditing,
            page = _this$props6.page,
            pagination = _this$props6.pagination,
            rowsOnPage = _this$props6.rowsOnPage,
            rowsOnPageOptions = _this$props6.rowsOnPageOptions;
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

      var _grid = props.grid,
          _pagination = props.pagination,
          _rowsOnPageOptions = props.rowsOnPageOptions,
          _rowsOnPage = props.rowsOnPage;

      if (_pagination && _rowsOnPageOptions && _rowsOnPageOptions.length > 0) {
        var defaultRowsOnPage = _rowsOnPageOptions.find(function (option) {
          return option.value === _pagination.pageSize;
        }) || _rowsOnPageOptions[0];

        if (defaultRowsOnPage && defaultRowsOnPage.value !== _rowsOnPage) {
          props.setRowsOnPage(_grid, defaultRowsOnPage.value);
        }
      }

      return _this;
    }

    return Pager;
  }(_react["default"].PureComponent), _defineProperty(_class2, "defaultProps", {
    children: null,
    page: 1,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9wYWdpbmF0aW9uLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUk9XU19PTl9QQUdFX09QVElPTlMiLCJsYWJlbCIsInZhbHVlIiwiUGFnaW5hdGlvbiIsInN0eWxlZCIsImRpdiIsIlJvd3NPblBhZ2UiLCJSb3dzT25QYWdlTGFiZWwiLCJzcGFuIiwiUm93c09uUGFnZVNlbGVjdCIsIkZsb2F0aW5nU2VsZWN0UG9ydGFsIiwicGFnaW5hdGlvbkNvbXBvbmVudCIsIldyYXBwZWRDb21wb25lbnQiLCJtYXBTdGF0ZVRvUHJvcHMiLCJzdGF0ZSIsIm93blByb3BzIiwiR1JJRCIsImdyaWQiLCJmaWx0ZXJEYXRhIiwiZGF0YWdyaWQiLCJnZXRJbiIsImlkIiwiaXNDcmVhdGluZyIsImlzRWRpdGluZyIsInBhZ2UiLCJyb3dzT25QYWdlIiwic29ydENvbHVtbiIsImRlZmF1bHRTb3J0Q29sdW1uIiwic29ydE9yZGVyIiwiZGVmYXVsdFNvcnRPcmRlciIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsImRpc3BhdGNoIiwic2V0UGFnZSIsInNldFJvd3NPblBhZ2UiLCJQYWdlciIsImluamVjdEludGwiLCJwcm9wcyIsInByZXZQcm9wcyIsInBhZ2luYXRpb24iLCJlcXVhbHMiLCJnb3RvUGFnZSIsInJlcXVlc3REYXRhIiwicm93c09uUGFnZU9wdGlvbnMiLCJmaW5kIiwib3B0aW9uIiwib2Zmc2V0IiwiZ2V0RGF0YSIsInJvd3NPblBhZ2VPcHRpb24iLCJNYXRoIiwiY2VpbCIsInRvdGFsU2l6ZSIsImludGwiLCJ0b3RhbExpbWl0IiwiZm9ybWF0TWVzc2FnZSIsIm4iLCJjaGlsZHJlbiIsInBhZ2VDb3VudCIsInBhZ2VzIiwiaSIsInB1c2giLCJyZW5kZXJUb3RhbENvdW50IiwiaGFuZGxlUm93c09uUGFnZUNoYW5nZSIsImdldFNlbGVjdGVkUm93c09uUGFnZU9wdGlvbiIsImxlbmd0aCIsImRlZmF1bHRSb3dzT25QYWdlIiwi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LGtCQUFpQixDQUFDQyxJQUFsQixDQUN4QixVQUFBQyxNQUFNO0FBQUEsaUJBQUlBLE1BQU0sQ0FBQzFDLEtBQVAsS0FBaUJvQyxXQUFVLENBQUMyQixRQUFoQztBQUFBLFNBRGtCLEtBRXJCdkIsa0JBQWlCLENBQUMsQ0FBRCxDQUZ0Qjs7QUFHQSxZQUFJc0IsaUJBQWlCLElBQUlBLGlCQUFpQixDQUFDOUQsS0FBbEIsS0FBNEJ1QixXQUFyRCxFQUFpRTtBQUMvRFcsVUFBQUEsS0FBSyxDQUFDSCxhQUFOLENBQW9CaEIsS0FBcEIsRUFBMEIrQyxpQkFBaUIsQ0FBQzlELEtBQTVDO0FBQ0Q7QUFDRjs7QUFaZ0I7QUFhbEI7O0FBbEY2QztBQUFBLElBOEI1QmdFLGtCQUFNQyxhQTlCc0IsNENBMkR4QjtBQUNwQlosSUFBQUEsUUFBUSxFQUFFLElBRFU7QUFFcEIvQixJQUFBQSxJQUFJLEVBQUUsQ0FGYztBQUdwQmMsSUFBQUEsVUFBVSxFQUFFOEIsU0FIUTtBQUlwQjNDLElBQUFBLFVBQVUsRUFBRTJDLFNBSlE7QUFLcEIxQixJQUFBQSxpQkFBaUIsRUFBRTFDLG9CQUxDO0FBTXBCMEIsSUFBQUEsVUFBVSxFQUFFMEMsU0FOUTtBQU9wQnhDLElBQUFBLFNBQVMsRUFBRXdDO0FBUFMsR0EzRHdCO0FBdU1oRCxTQUFPbEMsS0FBUDtBQUNELENBeE1EOztlQTBNZXZCLG1CIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tcGx1c3BsdXMgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IEltbXV0YWJsZVByb3BUeXBlcyBmcm9tICdyZWFjdC1pbW11dGFibGUtcHJvcHR5cGVzJztcbmltcG9ydCB7IGluamVjdEludGwsIGludGxTaGFwZSB9IGZyb20gJ3JlYWN0LWludGwnO1xuaW1wb3J0IHsgTGlzdCwgTWFwIH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7IEZsb2F0aW5nU2VsZWN0UG9ydGFsIH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtZmxvYXRpbmctc2VsZWN0JztcbmltcG9ydCBMaXN0SXRlbXMgZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtbGlzdC1pdGVtcyc7XG5pbXBvcnQgeyBzZXRQYWdlLCBzZXRSb3dzT25QYWdlIH0gZnJvbSAnLi9kYXRhZ3JpZC5hY3Rpb25zJztcbmltcG9ydCB7IGdyaWRTaGFwZSB9IGZyb20gJy4vZGF0YWdyaWQucHJvcHMnO1xuXG5pbXBvcnQgJy4vZGF0YWdyaWQudmFyaWFibGVzLnNjc3MnO1xuXG5jb25zdCBST1dTX09OX1BBR0VfT1BUSU9OUyA9IFtcbiAge1xuICAgIGxhYmVsOiAnMTAnLFxuICAgIHZhbHVlOiAxMCxcbiAgfSxcbiAge1xuICAgIGxhYmVsOiAnMjUnLFxuICAgIHZhbHVlOiAyNSxcbiAgfSxcbiAge1xuICAgIGxhYmVsOiAnNTAnLFxuICAgIHZhbHVlOiA1MCxcbiAgfSxcbiAge1xuICAgIGxhYmVsOiAnNzUnLFxuICAgIHZhbHVlOiA3NSxcbiAgfSxcbiAge1xuICAgIGxhYmVsOiAnMTAwJyxcbiAgICB2YWx1ZTogMTAwLFxuICB9LFxuXTtcblxuY29uc3QgUGFnaW5hdGlvbiA9IHN0eWxlZC5kaXZgXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHBhZGRpbmc6IDFyZW07XG4gIGhlaWdodDogYXV0bztcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICB3aWR0aDogMTAwJTtcbiAgZmxleDogMCAwIGF1dG87XG5gO1xuXG5jb25zdCBSb3dzT25QYWdlID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbmA7XG5cbmNvbnN0IFJvd3NPblBhZ2VMYWJlbCA9IHN0eWxlZC5zcGFuYFxuICBwYWRkaW5nOiAwIDFyZW07XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG5gO1xuXG5jb25zdCBSb3dzT25QYWdlU2VsZWN0ID0gc3R5bGVkKEZsb2F0aW5nU2VsZWN0UG9ydGFsKWBcbiAgbWluLXdpZHRoOiA2MHB4O1xuYDtcblxuY29uc3QgcGFnaW5hdGlvbkNvbXBvbmVudCA9IChXcmFwcGVkQ29tcG9uZW50KSA9PiB7XG4gIGNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSwgb3duUHJvcHMpID0+IHtcbiAgICBjb25zdCBHUklEID0gb3duUHJvcHMuZ3JpZDtcbiAgICByZXR1cm4ge1xuICAgICAgZmlsdGVyRGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdmaWx0ZXJEYXRhJ10sIE1hcCgpKSxcbiAgICAgIGlzQ3JlYXRpbmc6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdpc0NyZWF0aW5nJ10sIGZhbHNlKSxcbiAgICAgIGlzRWRpdGluZzogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2lzRWRpdGluZyddLCBmYWxzZSksXG4gICAgICBwYWdlOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdwYWdlJ10pLFxuICAgICAgcm93c09uUGFnZTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAncm93c09uUGFnZSddKSxcbiAgICAgIHNvcnRDb2x1bW46IHN0YXRlLmRhdGFncmlkLmdldEluKFxuICAgICAgICBbR1JJRC5pZCwgJ2NvbmZpZycsICdzb3J0aW5nRGF0YScsICdzb3J0Q29sdW1uJ10sXG4gICAgICAgIEdSSUQuZGVmYXVsdFNvcnRDb2x1bW4sXG4gICAgICApLFxuICAgICAgc29ydE9yZGVyOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihcbiAgICAgICAgW0dSSUQuaWQsICdjb25maWcnLCAnc29ydGluZ0RhdGEnLCAnc29ydE9yZGVyJ10sXG4gICAgICAgIEdSSUQuZGVmYXVsdFNvcnRPcmRlcixcbiAgICAgICksXG4gICAgfTtcbiAgfTtcblxuICBjb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiAoe1xuICAgIHNldFBhZ2U6IChncmlkLCBwYWdlKSA9PiBkaXNwYXRjaChzZXRQYWdlKGdyaWQsIHBhZ2UpKSxcbiAgICBzZXRSb3dzT25QYWdlOiAoZ3JpZCwgcm93c09uUGFnZSkgPT4gZGlzcGF0Y2goc2V0Um93c09uUGFnZShncmlkLCByb3dzT25QYWdlKSksXG4gIH0pO1xuXG4gIEBpbmplY3RJbnRsXG4gIEBjb25uZWN0KFxuICAgIG1hcFN0YXRlVG9Qcm9wcyxcbiAgICBtYXBEaXNwYXRjaFRvUHJvcHMsXG4gIClcbiAgY2xhc3MgUGFnZXIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgZ3JpZDogZ3JpZFNoYXBlLmlzUmVxdWlyZWQsXG4gICAgICBmaWx0ZXJEYXRhOiBJbW11dGFibGVQcm9wVHlwZXMubWFwLmlzUmVxdWlyZWQsXG4gICAgICBpbnRsOiBpbnRsU2hhcGUuaXNSZXF1aXJlZCxcbiAgICAgIGlzRWRpdGluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgIGlzQ3JlYXRpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgICBzZXRQYWdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgc2V0Um93c09uUGFnZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcbiAgICAgIHBhZ2U6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICBwYWdpbmF0aW9uOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICBnZXREYXRhOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICBwYWdlU2l6ZTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICB0b3RhbFNpemU6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgdG90YWxMaW1pdDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIH0pLFxuICAgICAgcm93c09uUGFnZTogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIHJvd3NPblBhZ2VPcHRpb25zOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICBsYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmVsZW1lbnQsIFByb3BUeXBlcy5zdHJpbmddKS5pc1JlcXVpcmVkLFxuICAgICAgICAgIHZhbHVlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuYm9vbCwgUHJvcFR5cGVzLm51bWJlciwgUHJvcFR5cGVzLnN0cmluZ10pXG4gICAgICAgICAgICAuaXNSZXF1aXJlZCxcbiAgICAgICAgfSksXG4gICAgICApLFxuICAgICAgc29ydENvbHVtbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm51bWJlcl0pLFxuICAgICAgc29ydE9yZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIH07XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgY2hpbGRyZW46IG51bGwsXG4gICAgICBwYWdlOiAxLFxuICAgICAgcGFnaW5hdGlvbjogdW5kZWZpbmVkLFxuICAgICAgcm93c09uUGFnZTogdW5kZWZpbmVkLFxuICAgICAgcm93c09uUGFnZU9wdGlvbnM6IFJPV1NfT05fUEFHRV9PUFRJT05TLFxuICAgICAgc29ydENvbHVtbjogdW5kZWZpbmVkLFxuICAgICAgc29ydE9yZGVyOiB1bmRlZmluZWQsXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICBzdXBlcihwcm9wcyk7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGdyaWQsIHBhZ2luYXRpb24sIHJvd3NPblBhZ2VPcHRpb25zLCByb3dzT25QYWdlLFxuICAgICAgfSA9IHByb3BzO1xuICAgICAgaWYgKHBhZ2luYXRpb24gJiYgcm93c09uUGFnZU9wdGlvbnMgJiYgcm93c09uUGFnZU9wdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBkZWZhdWx0Um93c09uUGFnZSA9IHJvd3NPblBhZ2VPcHRpb25zLmZpbmQoXG4gICAgICAgICAgb3B0aW9uID0+IG9wdGlvbi52YWx1ZSA9PT0gcGFnaW5hdGlvbi5wYWdlU2l6ZSxcbiAgICAgICAgKSB8fCByb3dzT25QYWdlT3B0aW9uc1swXTtcbiAgICAgICAgaWYgKGRlZmF1bHRSb3dzT25QYWdlICYmIGRlZmF1bHRSb3dzT25QYWdlLnZhbHVlICE9PSByb3dzT25QYWdlKSB7XG4gICAgICAgICAgcHJvcHMuc2V0Um93c09uUGFnZShncmlkLCBkZWZhdWx0Um93c09uUGFnZS52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUgPSAocHJldlByb3BzKSA9PiB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGZpbHRlckRhdGEsIHBhZ2luYXRpb24sIHBhZ2UsIHJvd3NPblBhZ2UsIHNvcnRDb2x1bW4sIHNvcnRPcmRlcixcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuICAgICAgaWYgKHBhZ2luYXRpb24gJiYgIWZpbHRlckRhdGEuZXF1YWxzKHByZXZQcm9wcy5maWx0ZXJEYXRhKSAmJiBwYWdlID4gMSkge1xuICAgICAgICB0aGlzLmdvdG9QYWdlKDEpO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgcGFnaW5hdGlvblxuICAgICAgICAmJiAoIWZpbHRlckRhdGEuZXF1YWxzKHByZXZQcm9wcy5maWx0ZXJEYXRhKVxuICAgICAgICAgIHx8IHBhZ2UgIT09IHByZXZQcm9wcy5wYWdlXG4gICAgICAgICAgfHwgcm93c09uUGFnZSAhPT0gcHJldlByb3BzLnJvd3NPblBhZ2VcbiAgICAgICAgICB8fCBzb3J0Q29sdW1uICE9PSBwcmV2UHJvcHMuc29ydENvbHVtblxuICAgICAgICAgIHx8IHNvcnRPcmRlciAhPT0gcHJldlByb3BzLnNvcnRPcmRlcilcbiAgICAgICkge1xuICAgICAgICB0aGlzLnJlcXVlc3REYXRhKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGdldFNlbGVjdGVkUm93c09uUGFnZU9wdGlvbiA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHsgcm93c09uUGFnZSwgcm93c09uUGFnZU9wdGlvbnMgfSA9IHRoaXMucHJvcHM7XG4gICAgICByZXR1cm4gcm93c09uUGFnZU9wdGlvbnMuZmluZChvcHRpb24gPT4gb3B0aW9uLnZhbHVlID09PSByb3dzT25QYWdlKTtcbiAgICB9O1xuXG4gICAgcmVxdWVzdERhdGEgPSAoKSA9PiB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGZpbHRlckRhdGEsIHBhZ2luYXRpb24sIHBhZ2UsIHJvd3NPblBhZ2UsIHNvcnRDb2x1bW4sIHNvcnRPcmRlcixcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3Qgb2Zmc2V0ID0gKHBhZ2UgLSAxKSAqIHJvd3NPblBhZ2U7XG4gICAgICBwYWdpbmF0aW9uLmdldERhdGEob2Zmc2V0LCByb3dzT25QYWdlLCBmaWx0ZXJEYXRhLCBzb3J0Q29sdW1uLCBzb3J0T3JkZXIpO1xuICAgIH07XG5cbiAgICBnb3RvUGFnZSA9IChwYWdlKSA9PiB7XG4gICAgICBjb25zdCB7IGdyaWQgfSA9IHRoaXMucHJvcHM7XG4gICAgICB0aGlzLnByb3BzLnNldFBhZ2UoZ3JpZCwgcGFnZSk7XG4gICAgfTtcblxuICAgIGhhbmRsZVJvd3NPblBhZ2VDaGFuZ2UgPSAocm93c09uUGFnZU9wdGlvbikgPT4ge1xuICAgICAgY29uc3QgeyBncmlkLCBwYWdlLCBwYWdpbmF0aW9uIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3Qgcm93c09uUGFnZSA9IHJvd3NPblBhZ2VPcHRpb24udmFsdWU7XG4gICAgICB0aGlzLnByb3BzLnNldFJvd3NPblBhZ2UoZ3JpZCwgcm93c09uUGFnZSk7XG4gICAgICBpZiAocGFnZSA+IE1hdGguY2VpbChwYWdpbmF0aW9uLnRvdGFsU2l6ZSAvIHJvd3NPblBhZ2UpKSB7XG4gICAgICAgIHRoaXMuZ290b1BhZ2UoMSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJlbmRlclRvdGFsQ291bnQgPSAoKSA9PiB7XG4gICAgICBjb25zdCB7IGludGwsIHBhZ2luYXRpb24gfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCB7IHRvdGFsTGltaXQsIHRvdGFsU2l6ZSB9ID0gcGFnaW5hdGlvbjtcbiAgICAgIGxldCBsYWJlbDtcbiAgICAgIHN3aXRjaCAodG90YWxTaXplKSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICBsYWJlbCA9IGludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5QYWdpbmF0aW9uLlRvdGFsU2luZ3VsYXInIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHRvdGFsTGltaXQ6XG4gICAgICAgICAgbGFiZWwgPSBpbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuUGFnaW5hdGlvbi5Ub3RhbE92ZXInIH0sIHsgbjogdG90YWxTaXplIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGxhYmVsID0gaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLlBhZ2luYXRpb24uVG90YWxQbHVyYWwnIH0sIHsgbjogdG90YWxTaXplIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgcmV0dXJuIDxzcGFuPntsYWJlbH08L3NwYW4+O1xuICAgIH07XG5cbiAgICByZW5kZXIgPSAoKSA9PiB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGNoaWxkcmVuLFxuICAgICAgICBncmlkLFxuICAgICAgICBpbnRsLFxuICAgICAgICBpc0NyZWF0aW5nLFxuICAgICAgICBpc0VkaXRpbmcsXG4gICAgICAgIHBhZ2UsXG4gICAgICAgIHBhZ2luYXRpb24sXG4gICAgICAgIHJvd3NPblBhZ2UsXG4gICAgICAgIHJvd3NPblBhZ2VPcHRpb25zLFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCBwYWdlQ291bnQgPSBwYWdpbmF0aW9uICYmIHBhZ2luYXRpb24udG90YWxTaXplID4gMCAmJiByb3dzT25QYWdlID4gMFxuICAgICAgICA/IE1hdGguY2VpbChwYWdpbmF0aW9uLnRvdGFsU2l6ZSAvIHJvd3NPblBhZ2UpXG4gICAgICAgIDogMTtcbiAgICAgIGNvbnN0IHBhZ2VzID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBwYWdlQ291bnQ7IGkrKykge1xuICAgICAgICBwYWdlcy5wdXNoKGkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHBhZ2luYXRpb24gPyAoXG4gICAgICAgIDxXcmFwcGVkQ29tcG9uZW50IHsuLi50aGlzLnByb3BzfSBncmlkPXt7IC4uLmdyaWQsIHBhZ2luYXRpb246IHRydWUgfX0+XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICAgIDxQYWdpbmF0aW9uIGNsYXNzTmFtZT1cImZvb3RlclwiPlxuICAgICAgICAgICAge3RoaXMucmVuZGVyVG90YWxDb3VudCgpfVxuICAgICAgICAgICAgPExpc3RJdGVtc1xuICAgICAgICAgICAgICBkaXNhYmxlZD17aXNDcmVhdGluZyB8fCBpc0VkaXRpbmd9XG4gICAgICAgICAgICAgIGdvVG9JdGVtPXt0aGlzLmdvdG9QYWdlfVxuICAgICAgICAgICAgICBpZD1cImxpc3RQYWdpbmF0aW9uSXRlbXNcIlxuICAgICAgICAgICAgICBpdGVtSWQ9e3BhZ2V9XG4gICAgICAgICAgICAgIGl0ZW1JZHM9e0xpc3QocGFnZXMpfVxuICAgICAgICAgICAgICB0eXBlYWJsZVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxSb3dzT25QYWdlPlxuICAgICAgICAgICAgICA8Um93c09uUGFnZUxhYmVsPlxuICAgICAgICAgICAgICAgIHtpbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuUGFnaW5hdGlvbi5Sb3dzT25QYWdlJyB9KX1cbiAgICAgICAgICAgICAgPC9Sb3dzT25QYWdlTGFiZWw+XG4gICAgICAgICAgICAgIDxSb3dzT25QYWdlU2VsZWN0XG4gICAgICAgICAgICAgICAgaXNDcmVhcmFibGU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgIGlzRGlzYWJsZWQ9e2lzQ3JlYXRpbmcgfHwgaXNFZGl0aW5nfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVJvd3NPblBhZ2VDaGFuZ2V9XG4gICAgICAgICAgICAgICAgb3B0aW9ucz17cm93c09uUGFnZU9wdGlvbnN9XG4gICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0U2VsZWN0ZWRSb3dzT25QYWdlT3B0aW9uKCl9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L1Jvd3NPblBhZ2U+XG4gICAgICAgICAgPC9QYWdpbmF0aW9uPlxuICAgICAgICA8L1dyYXBwZWRDb21wb25lbnQ+XG4gICAgICApIDogKFxuICAgICAgICA8V3JhcHBlZENvbXBvbmVudCB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICk7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBQYWdlcjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBhZ2luYXRpb25Db21wb25lbnQ7XG4iXX0=