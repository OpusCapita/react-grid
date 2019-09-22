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

/* eslint-disable no-plusplus */
import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { injectIntl, intlShape } from 'react-intl';
import { List, Map } from 'immutable';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FloatingSelectPortal } from '@opuscapita/react-floating-select';
import ListItems from '@opuscapita/react-list-items';
import { setBusy as setBusyAction, setPage as _setPage, setRowsOnPage as setRowsOnPageAction } from './datagrid.actions';
import { gridShape } from './datagrid.props';
import './datagrid.variables.scss';
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
var Pagination = styled.div(_templateObject());
var RowsOnPage = styled.div(_templateObject2());
var RowsOnPageLabel = styled.span(_templateObject3());
var RowsOnPageSelect = styled(FloatingSelectPortal)(_templateObject4());

var paginationComponent = function paginationComponent(WrappedComponent) {
  var _dec, _class, _class2, _temp;

  var mapStateToProps = function mapStateToProps(state, ownProps) {
    var GRID = ownProps.grid;
    return {
      filterData: state.datagrid.getIn([GRID.id, 'config', 'filteringData', 'filterData'], Map()),
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
        return dispatch(setBusyAction(grid));
      },
      setPage: function setPage(grid, page) {
        return dispatch(_setPage(grid, page));
      },
      setRowsOnPage: function setRowsOnPage(grid, rowsOnPage) {
        return dispatch(setRowsOnPageAction(grid, rowsOnPage));
      }
    };
  };

  var Pager = (_dec = connect(mapStateToProps, mapDispatchToProps), injectIntl(_class = _dec(_class = (_temp = _class2 =
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

        return React.createElement("span", null, label);
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

        return pagination ? React.createElement(WrappedComponent, _extends({}, _this.props, {
          grid: _extends({}, grid, {
            pagination: true
          })
        }), children, React.createElement(Pagination, {
          className: "footer"
        }, _this.renderTotalCount(), React.createElement(ListItems, {
          disabled: isCreating || isEditing,
          goToItem: _this.gotoPage,
          id: grid.id + "-list-pagination-items",
          itemId: page,
          itemIds: List(pages),
          typeable: true
        }), React.createElement(RowsOnPage, null, React.createElement(RowsOnPageLabel, null, intl.formatMessage({
          id: 'Grid.Pagination.RowsOnPage'
        })), React.createElement(RowsOnPageSelect, {
          id: grid.id + "-rows-on-page-select",
          isCrearable: false,
          isDisabled: isCreating || isEditing,
          onChange: _this.handleRowsOnPageChange,
          options: rowsOnPageOptions,
          value: _this.getSelectedRowsOnPageOption()
        })))) : React.createElement(WrappedComponent, _this.props);
      });

      return _this;
    }

    return Pager;
  }(React.PureComponent), _defineProperty(_class2, "defaultProps", {
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

export default paginationComponent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9wYWdpbmF0aW9uLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJJbW11dGFibGVQcm9wVHlwZXMiLCJpbmplY3RJbnRsIiwiaW50bFNoYXBlIiwiTGlzdCIsIk1hcCIsImNvbm5lY3QiLCJzdHlsZWQiLCJGbG9hdGluZ1NlbGVjdFBvcnRhbCIsIkxpc3RJdGVtcyIsInNldEJ1c3kiLCJzZXRCdXN5QWN0aW9uIiwic2V0UGFnZSIsInNldFJvd3NPblBhZ2UiLCJzZXRSb3dzT25QYWdlQWN0aW9uIiwiZ3JpZFNoYXBlIiwiUk9XU19PTl9QQUdFX09QVElPTlMiLCJsYWJlbCIsInZhbHVlIiwiUGFnaW5hdGlvbiIsImRpdiIsIlJvd3NPblBhZ2UiLCJSb3dzT25QYWdlTGFiZWwiLCJzcGFuIiwiUm93c09uUGFnZVNlbGVjdCIsInBhZ2luYXRpb25Db21wb25lbnQiLCJXcmFwcGVkQ29tcG9uZW50IiwibWFwU3RhdGVUb1Byb3BzIiwic3RhdGUiLCJvd25Qcm9wcyIsIkdSSUQiLCJncmlkIiwiZmlsdGVyRGF0YSIsImRhdGFncmlkIiwiZ2V0SW4iLCJpZCIsImlzQ3JlYXRpbmciLCJpc0VkaXRpbmciLCJwYWdlIiwicm93c09uUGFnZSIsInNvcnRDb2x1bW4iLCJkZWZhdWx0U29ydENvbHVtbiIsInNvcnRPcmRlciIsImRlZmF1bHRTb3J0T3JkZXIiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJkaXNwYXRjaCIsIlBhZ2VyIiwicHJvcHMiLCJwYWdpbmF0aW9uIiwicm93c09uUGFnZU9wdGlvbnMiLCJsZW5ndGgiLCJwYWdlU2l6ZSIsInNlbGVjdGVkUm93c09uUGFnZSIsImZpbmQiLCJvcHRpb24iLCJyZXF1ZXN0RGF0YSIsInByZXZQcm9wcyIsImVxdWFscyIsImdvdG9QYWdlIiwib2Zmc2V0IiwiZ2V0RGF0YSIsInJvd3NPblBhZ2VPcHRpb24iLCJNYXRoIiwiY2VpbCIsInRvdGFsU2l6ZSIsImludGwiLCJ0b3RhbExpbWl0IiwiZm9ybWF0TWVzc2FnZSIsIm4iLCJjaGlsZHJlbiIsInBhZ2VDb3VudCIsInBhZ2VzIiwiaSIsInB1c2giLCJyZW5kZXJUb3RhbENvdW50IiwiaGFuZGxlUm93c09uUGFnZUNoYW5nZSIsImdldFNlbGVjdGVkUm93c09uUGFnZU9wdGlvbiIsIlB1cmVDb21wb25lbnQiLCJ1bmRlZmluZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLE9BQU9DLGtCQUFQLE1BQStCLDJCQUEvQjtBQUNBLFNBQVNDLFVBQVQsRUFBcUJDLFNBQXJCLFFBQXNDLFlBQXRDO0FBQ0EsU0FBU0MsSUFBVCxFQUFlQyxHQUFmLFFBQTBCLFdBQTFCO0FBQ0EsU0FBU0MsT0FBVCxRQUF3QixhQUF4QjtBQUNBLE9BQU9DLE1BQVAsTUFBbUIsbUJBQW5CO0FBQ0EsU0FBU0Msb0JBQVQsUUFBcUMsbUNBQXJDO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQiw4QkFBdEI7QUFDQSxTQUFTQyxPQUFPLElBQUlDLGFBQXBCLEVBQW1DQyxPQUFPLElBQVBBLFFBQW5DLEVBQTRDQyxhQUFhLElBQUlDLG1CQUE3RCxRQUF3RixvQkFBeEY7QUFDQSxTQUFTQyxTQUFULFFBQTBCLGtCQUExQjtBQUVBLE9BQU8sMkJBQVA7QUFFQSxJQUFNQyxvQkFBb0IsR0FBRyxDQUMzQjtBQUNFQyxFQUFBQSxLQUFLLEVBQUUsSUFEVDtBQUVFQyxFQUFBQSxLQUFLLEVBQUU7QUFGVCxDQUQyQixFQUszQjtBQUNFRCxFQUFBQSxLQUFLLEVBQUUsSUFEVDtBQUVFQyxFQUFBQSxLQUFLLEVBQUU7QUFGVCxDQUwyQixFQVMzQjtBQUNFRCxFQUFBQSxLQUFLLEVBQUUsSUFEVDtBQUVFQyxFQUFBQSxLQUFLLEVBQUU7QUFGVCxDQVQyQixFQWEzQjtB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RDtBQUNFLFVBQUEsRUFBRSxFQUFLSixJQUFJLENBQUNJLEVBQVYseUJBREo7QUFFRSxVQUFBLFdBQVcsRUFBRSxLQUZmO0FBR0UsVUFBQSxVQUFVLEVBQUVDLFVBQVUsSUFBSUMsU0FINUI7QUFJRSxVQUFBLFFBQVEsRUFBRSxNQUFLc0Msc0JBSmpCO0FBS0UsVUFBQSxPQUFPLEVBQUUxQixpQkFMWDtBQU1FLFVBQUEsS0FBSyxFQUFFLE1BQUsyQiwyQkFBTDtBQU5ULFVBSkYsQ0FWRixDQUZGLENBRGUsR0E2QmYsb0JBQUMsZ0JBQUQsRUFBc0IsTUFBSzdCLEtBQTNCLENBN0JGO0FBK0JELE9BeE02Qzs7QUFBQTtBQUFBOztBQUFBO0FBQUEsSUErQjVCaEQsS0FBSyxDQUFDOEUsYUEvQnNCLDRDQTZEeEI7QUFDcEJSLElBQUFBLFFBQVEsRUFBRSxJQURVO0FBRXBCL0IsSUFBQUEsSUFBSSxFQUFFd0MsU0FGYztBQUdwQjlCLElBQUFBLFVBQVUsRUFBRThCLFNBSFE7QUFJcEJ2QyxJQUFBQSxVQUFVLEVBQUV1QyxTQUpRO0FBS3BCN0IsSUFBQUEsaUJBQWlCLEVBQUVqQyxvQkFMQztBQU1wQndCLElBQUFBLFVBQVUsRUFBRXNDLFNBTlE7QUFPcEJwQyxJQUFBQSxTQUFTLEVBQUVvQztBQVBTLEdBN0R3QjtBQTJNaEQsU0FBT2hDLEtBQVA7QUFDRCxDQTVNRDs7QUE4TUEsZUFBZXJCLG1CQUFmIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tcGx1c3BsdXMgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IEltbXV0YWJsZVByb3BUeXBlcyBmcm9tICdyZWFjdC1pbW11dGFibGUtcHJvcHR5cGVzJztcbmltcG9ydCB7IGluamVjdEludGwsIGludGxTaGFwZSB9IGZyb20gJ3JlYWN0LWludGwnO1xuaW1wb3J0IHsgTGlzdCwgTWFwIH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7IEZsb2F0aW5nU2VsZWN0UG9ydGFsIH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtZmxvYXRpbmctc2VsZWN0JztcbmltcG9ydCBMaXN0SXRlbXMgZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtbGlzdC1pdGVtcyc7XG5pbXBvcnQgeyBzZXRCdXN5IGFzIHNldEJ1c3lBY3Rpb24sIHNldFBhZ2UsIHNldFJvd3NPblBhZ2UgYXMgc2V0Um93c09uUGFnZUFjdGlvbiB9IGZyb20gJy4vZGF0YWdyaWQuYWN0aW9ucyc7XG5pbXBvcnQgeyBncmlkU2hhcGUgfSBmcm9tICcuL2RhdGFncmlkLnByb3BzJztcblxuaW1wb3J0ICcuL2RhdGFncmlkLnZhcmlhYmxlcy5zY3NzJztcblxuY29uc3QgUk9XU19PTl9QQUdFX09QVElPTlMgPSBbXG4gIHtcbiAgICBsYWJlbDogJzEwJyxcbiAgICB2YWx1ZTogMTAsXG4gIH0sXG4gIHtcbiAgICBsYWJlbDogJzI1JyxcbiAgICB2YWx1ZTogMjUsXG4gIH0sXG4gIHtcbiAgICBsYWJlbDogJzUwJyxcbiAgICB2YWx1ZTogNTAsXG4gIH0sXG4gIHtcbiAgICBsYWJlbDogJzc1JyxcbiAgICB2YWx1ZTogNzUsXG4gIH0sXG4gIHtcbiAgICBsYWJlbDogJzEwMCcsXG4gICAgdmFsdWU6IDEwMCxcbiAgfSxcbl07XG5cbmNvbnN0IFBhZ2luYXRpb24gPSBzdHlsZWQuZGl2YFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBkaXNwbGF5OiBmbGV4O1xuICBwYWRkaW5nOiAxcmVtO1xuICBoZWlnaHQ6IGF1dG87XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgd2lkdGg6IDEwMCU7XG4gIGZsZXg6IDAgMCBhdXRvO1xuYDtcblxuY29uc3QgUm93c09uUGFnZSA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5gO1xuXG5jb25zdCBSb3dzT25QYWdlTGFiZWwgPSBzdHlsZWQuc3BhbmBcbiAgcGFkZGluZzogMCAxcmVtO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuYDtcblxuY29uc3QgUm93c09uUGFnZVNlbGVjdCA9IHN0eWxlZChGbG9hdGluZ1NlbGVjdFBvcnRhbClgXG4gIG1pbi13aWR0aDogNzBweDtcbmA7XG5cbmNvbnN0IHBhZ2luYXRpb25Db21wb25lbnQgPSAoV3JhcHBlZENvbXBvbmVudCkgPT4ge1xuICBjb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUsIG93blByb3BzKSA9PiB7XG4gICAgY29uc3QgR1JJRCA9IG93blByb3BzLmdyaWQ7XG4gICAgcmV0dXJuIHtcbiAgICAgIGZpbHRlckRhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnZmlsdGVyRGF0YSddLCBNYXAoKSksXG4gICAgICBpc0NyZWF0aW5nOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnaXNDcmVhdGluZyddLCBmYWxzZSksXG4gICAgICBpc0VkaXRpbmc6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdpc0VkaXRpbmcnXSwgZmFsc2UpLFxuICAgICAgcGFnZTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAncGFnZSddKSxcbiAgICAgIHJvd3NPblBhZ2U6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ3Jvd3NPblBhZ2UnXSksXG4gICAgICBzb3J0Q29sdW1uOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihcbiAgICAgICAgW0dSSUQuaWQsICdjb25maWcnLCAnc29ydGluZ0RhdGEnLCAnc29ydENvbHVtbiddLFxuICAgICAgICBHUklELmRlZmF1bHRTb3J0Q29sdW1uLFxuICAgICAgKSxcbiAgICAgIHNvcnRPcmRlcjogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oXG4gICAgICAgIFtHUklELmlkLCAnY29uZmlnJywgJ3NvcnRpbmdEYXRhJywgJ3NvcnRPcmRlciddLFxuICAgICAgICBHUklELmRlZmF1bHRTb3J0T3JkZXIsXG4gICAgICApLFxuICAgIH07XG4gIH07XG5cbiAgY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4gKHtcbiAgICBzZXRCdXN5OiBncmlkID0+IGRpc3BhdGNoKHNldEJ1c3lBY3Rpb24oZ3JpZCkpLFxuICAgIHNldFBhZ2U6IChncmlkLCBwYWdlKSA9PiBkaXNwYXRjaChzZXRQYWdlKGdyaWQsIHBhZ2UpKSxcbiAgICBzZXRSb3dzT25QYWdlOiAoZ3JpZCwgcm93c09uUGFnZSkgPT4gZGlzcGF0Y2goc2V0Um93c09uUGFnZUFjdGlvbihncmlkLCByb3dzT25QYWdlKSksXG4gIH0pO1xuXG4gIEBpbmplY3RJbnRsXG4gIEBjb25uZWN0KFxuICAgIG1hcFN0YXRlVG9Qcm9wcyxcbiAgICBtYXBEaXNwYXRjaFRvUHJvcHMsXG4gIClcbiAgY2xhc3MgUGFnZXIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgZ3JpZDogZ3JpZFNoYXBlLmlzUmVxdWlyZWQsXG4gICAgICBmaWx0ZXJEYXRhOiBJbW11dGFibGVQcm9wVHlwZXMubWFwLmlzUmVxdWlyZWQsXG4gICAgICBpbnRsOiBpbnRsU2hhcGUuaXNSZXF1aXJlZCxcbiAgICAgIGlzRWRpdGluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgIGlzQ3JlYXRpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgICBzZXRCdXN5OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgc2V0UGFnZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIHNldFJvd3NPblBhZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgICBwYWdlOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgcGFnaW5hdGlvbjogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgZ2V0RGF0YTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgcGFnZVNpemU6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgdG90YWxTaXplOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgIHRvdGFsTGltaXQ6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICB9KSxcbiAgICAgIHJvd3NPblBhZ2U6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICByb3dzT25QYWdlT3B0aW9uczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgbGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5lbGVtZW50LCBQcm9wVHlwZXMuc3RyaW5nXSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICB2YWx1ZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmJvb2wsIFByb3BUeXBlcy5udW1iZXIsIFByb3BUeXBlcy5zdHJpbmddKVxuICAgICAgICAgICAgLmlzUmVxdWlyZWQsXG4gICAgICAgIH0pLFxuICAgICAgKSxcbiAgICAgIHNvcnRDb2x1bW46IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5udW1iZXJdKSxcbiAgICAgIHNvcnRPcmRlcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB9O1xuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgIGNoaWxkcmVuOiBudWxsLFxuICAgICAgcGFnZTogdW5kZWZpbmVkLFxuICAgICAgcGFnaW5hdGlvbjogdW5kZWZpbmVkLFxuICAgICAgcm93c09uUGFnZTogdW5kZWZpbmVkLFxuICAgICAgcm93c09uUGFnZU9wdGlvbnM6IFJPV1NfT05fUEFHRV9PUFRJT05TLFxuICAgICAgc29ydENvbHVtbjogdW5kZWZpbmVkLFxuICAgICAgc29ydE9yZGVyOiB1bmRlZmluZWQsXG4gICAgfTtcblxuICAgIGNvbXBvbmVudERpZE1vdW50ID0gKCkgPT4ge1xuICAgICAgY29uc3Qge1xuICAgICAgICBncmlkLCBwYWdpbmF0aW9uLCByb3dzT25QYWdlT3B0aW9ucywgcm93c09uUGFnZSwgc2V0Um93c09uUGFnZSxcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuICAgICAgaWYgKHBhZ2luYXRpb24pIHtcbiAgICAgICAgaWYgKCFyb3dzT25QYWdlICYmIHJvd3NPblBhZ2VPcHRpb25zICYmIHJvd3NPblBhZ2VPcHRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBjb25zdCBwYWdlU2l6ZSA9IHJvd3NPblBhZ2UgfHwgcGFnaW5hdGlvbi5wYWdlU2l6ZTtcbiAgICAgICAgICBjb25zdCBzZWxlY3RlZFJvd3NPblBhZ2UgPSByb3dzT25QYWdlT3B0aW9ucy5maW5kKFxuICAgICAgICAgICAgb3B0aW9uID0+IG9wdGlvbi52YWx1ZSA9PT0gcGFnZVNpemUsXG4gICAgICAgICAgKSB8fCByb3dzT25QYWdlT3B0aW9uc1swXTtcbiAgICAgICAgICBzZXRSb3dzT25QYWdlKGdyaWQsIHNlbGVjdGVkUm93c09uUGFnZS52YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB0aGlzLnJlcXVlc3REYXRhKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSA9IChwcmV2UHJvcHMpID0+IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgZmlsdGVyRGF0YSwgcGFnaW5hdGlvbiwgcGFnZSwgcm93c09uUGFnZSwgc29ydENvbHVtbiwgc29ydE9yZGVyLFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBpZiAocGFnaW5hdGlvbikge1xuICAgICAgICBpZiAocGFnZSAhPT0gMSAmJiAocm93c09uUGFnZSAhPT0gcHJldlByb3BzLnJvd3NPblBhZ2VcbiAgICAgICAgICB8fCAhZmlsdGVyRGF0YS5lcXVhbHMocHJldlByb3BzLmZpbHRlckRhdGEpKSkge1xuICAgICAgICAgIHRoaXMuZ290b1BhZ2UoMSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIWZpbHRlckRhdGEuZXF1YWxzKHByZXZQcm9wcy5maWx0ZXJEYXRhKVxuICAgICAgICAgICAgfHwgcGFnZSAhPT0gcHJldlByb3BzLnBhZ2VcbiAgICAgICAgICAgIHx8IHJvd3NPblBhZ2UgIT09IHByZXZQcm9wcy5yb3dzT25QYWdlXG4gICAgICAgICAgICB8fCBzb3J0Q29sdW1uICE9PSBwcmV2UHJvcHMuc29ydENvbHVtblxuICAgICAgICAgICAgfHwgc29ydE9yZGVyICE9PSBwcmV2UHJvcHMuc29ydE9yZGVyKSB7XG4gICAgICAgICAgdGhpcy5yZXF1ZXN0RGF0YSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIGdldFNlbGVjdGVkUm93c09uUGFnZU9wdGlvbiA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHsgcm93c09uUGFnZSwgcm93c09uUGFnZU9wdGlvbnMgfSA9IHRoaXMucHJvcHM7XG4gICAgICByZXR1cm4gcm93c09uUGFnZU9wdGlvbnMuZmluZChvcHRpb24gPT4gb3B0aW9uLnZhbHVlID09PSByb3dzT25QYWdlKTtcbiAgICB9O1xuXG4gICAgcmVxdWVzdERhdGEgPSAoKSA9PiB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGZpbHRlckRhdGEsIGdyaWQsIHBhZ2luYXRpb24sIHBhZ2UsIHNldEJ1c3ksIHJvd3NPblBhZ2UsIHNvcnRDb2x1bW4sIHNvcnRPcmRlcixcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3Qgb2Zmc2V0ID0gKHBhZ2UgLSAxKSAqIHJvd3NPblBhZ2U7XG4gICAgICBzZXRCdXN5KGdyaWQpO1xuICAgICAgcGFnaW5hdGlvbi5nZXREYXRhKG9mZnNldCwgcm93c09uUGFnZSwgZmlsdGVyRGF0YSwgc29ydENvbHVtbiwgc29ydE9yZGVyKTtcbiAgICB9O1xuXG4gICAgZ290b1BhZ2UgPSAocGFnZSkgPT4ge1xuICAgICAgY29uc3QgeyBncmlkIH0gPSB0aGlzLnByb3BzO1xuICAgICAgdGhpcy5wcm9wcy5zZXRQYWdlKGdyaWQsIHBhZ2UpO1xuICAgIH07XG5cbiAgICBoYW5kbGVSb3dzT25QYWdlQ2hhbmdlID0gKHJvd3NPblBhZ2VPcHRpb24pID0+IHtcbiAgICAgIGNvbnN0IHsgZ3JpZCwgcGFnZSwgcGFnaW5hdGlvbiB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IHJvd3NPblBhZ2UgPSByb3dzT25QYWdlT3B0aW9uLnZhbHVlO1xuICAgICAgdGhpcy5wcm9wcy5zZXRSb3dzT25QYWdlKGdyaWQsIHJvd3NPblBhZ2UpO1xuICAgICAgaWYgKHBhZ2UgPiBNYXRoLmNlaWwocGFnaW5hdGlvbi50b3RhbFNpemUgLyByb3dzT25QYWdlKSkge1xuICAgICAgICB0aGlzLmdvdG9QYWdlKDEpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZW5kZXJUb3RhbENvdW50ID0gKCkgPT4ge1xuICAgICAgY29uc3QgeyBpbnRsLCBwYWdpbmF0aW9uIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3QgeyB0b3RhbExpbWl0LCB0b3RhbFNpemUgfSA9IHBhZ2luYXRpb247XG4gICAgICBsZXQgbGFiZWw7XG4gICAgICBzd2l0Y2ggKHRvdGFsU2l6ZSkge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgbGFiZWwgPSBpbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuUGFnaW5hdGlvbi5Ub3RhbFNpbmd1bGFyJyB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB0b3RhbExpbWl0OlxuICAgICAgICAgIGxhYmVsID0gaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLlBhZ2luYXRpb24uVG90YWxPdmVyJyB9LCB7IG46IHRvdGFsU2l6ZSB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBsYWJlbCA9IGludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5QYWdpbmF0aW9uLlRvdGFsUGx1cmFsJyB9LCB7IG46IHRvdGFsU2l6ZSB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHJldHVybiA8c3Bhbj57bGFiZWx9PC9zcGFuPjtcbiAgICB9O1xuXG4gICAgcmVuZGVyID0gKCkgPT4ge1xuICAgICAgY29uc3Qge1xuICAgICAgICBjaGlsZHJlbixcbiAgICAgICAgZ3JpZCxcbiAgICAgICAgaW50bCxcbiAgICAgICAgaXNDcmVhdGluZyxcbiAgICAgICAgaXNFZGl0aW5nLFxuICAgICAgICBwYWdlLFxuICAgICAgICBwYWdpbmF0aW9uLFxuICAgICAgICByb3dzT25QYWdlLFxuICAgICAgICByb3dzT25QYWdlT3B0aW9ucyxcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3QgcGFnZUNvdW50ID0gcGFnaW5hdGlvbiAmJiBwYWdpbmF0aW9uLnRvdGFsU2l6ZSA+IDAgJiYgcm93c09uUGFnZSA+IDBcbiAgICAgICAgPyBNYXRoLmNlaWwocGFnaW5hdGlvbi50b3RhbFNpemUgLyByb3dzT25QYWdlKVxuICAgICAgICA6IDE7XG4gICAgICBjb25zdCBwYWdlcyA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gcGFnZUNvdW50OyBpKyspIHtcbiAgICAgICAgcGFnZXMucHVzaChpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwYWdpbmF0aW9uID8gKFxuICAgICAgICA8V3JhcHBlZENvbXBvbmVudCB7Li4udGhpcy5wcm9wc30gZ3JpZD17eyAuLi5ncmlkLCBwYWdpbmF0aW9uOiB0cnVlIH19PlxuICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgICA8UGFnaW5hdGlvbiBjbGFzc05hbWU9XCJmb290ZXJcIj5cbiAgICAgICAgICAgIHt0aGlzLnJlbmRlclRvdGFsQ291bnQoKX1cbiAgICAgICAgICAgIDxMaXN0SXRlbXNcbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzQ3JlYXRpbmcgfHwgaXNFZGl0aW5nfVxuICAgICAgICAgICAgICBnb1RvSXRlbT17dGhpcy5nb3RvUGFnZX1cbiAgICAgICAgICAgICAgaWQ9e2Ake2dyaWQuaWR9LWxpc3QtcGFnaW5hdGlvbi1pdGVtc2B9XG4gICAgICAgICAgICAgIGl0ZW1JZD17cGFnZX1cbiAgICAgICAgICAgICAgaXRlbUlkcz17TGlzdChwYWdlcyl9XG4gICAgICAgICAgICAgIHR5cGVhYmxlXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPFJvd3NPblBhZ2U+XG4gICAgICAgICAgICAgIDxSb3dzT25QYWdlTGFiZWw+XG4gICAgICAgICAgICAgICAge2ludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5QYWdpbmF0aW9uLlJvd3NPblBhZ2UnIH0pfVxuICAgICAgICAgICAgICA8L1Jvd3NPblBhZ2VMYWJlbD5cbiAgICAgICAgICAgICAgPFJvd3NPblBhZ2VTZWxlY3RcbiAgICAgICAgICAgICAgICBpZD17YCR7Z3JpZC5pZH0tcm93cy1vbi1wYWdlLXNlbGVjdGB9XG4gICAgICAgICAgICAgICAgaXNDcmVhcmFibGU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgIGlzRGlzYWJsZWQ9e2lzQ3JlYXRpbmcgfHwgaXNFZGl0aW5nfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVJvd3NPblBhZ2VDaGFuZ2V9XG4gICAgICAgICAgICAgICAgb3B0aW9ucz17cm93c09uUGFnZU9wdGlvbnN9XG4gICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0U2VsZWN0ZWRSb3dzT25QYWdlT3B0aW9uKCl9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L1Jvd3NPblBhZ2U+XG4gICAgICAgICAgPC9QYWdpbmF0aW9uPlxuICAgICAgICA8L1dyYXBwZWRDb21wb25lbnQ+XG4gICAgICApIDogKFxuICAgICAgICA8V3JhcHBlZENvbXBvbmVudCB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICk7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBQYWdlcjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBhZ2luYXRpb25Db21wb25lbnQ7XG4iXX0=