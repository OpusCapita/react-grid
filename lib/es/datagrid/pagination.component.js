var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteralLoose(['\n  align-items: center;\n  display: flex;\n  padding: 1rem;\n  height: auto;\n  justify-content: space-between;\n  width: 100%;\n  flex: 0 0 auto;\n'], ['\n  align-items: center;\n  display: flex;\n  padding: 1rem;\n  height: auto;\n  justify-content: space-between;\n  width: 100%;\n  flex: 0 0 auto;\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n  display: flex;\n  align-items: center;\n'], ['\n  display: flex;\n  align-items: center;\n']),
    _templateObject3 = _taggedTemplateLiteralLoose(['\n  padding: 0 1rem;\n'], ['\n  padding: 0 1rem;\n']),
    _templateObject4 = _taggedTemplateLiteralLoose(['\n  min-width: 60px;\n'], ['\n  min-width: 60px;\n']);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

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
import { setPage as _setPage, setRowsOnPage as _setRowsOnPage } from './datagrid.actions';
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

var Pagination = styled.div(_templateObject);

var RowsOnPage = styled.div(_templateObject2);

var RowsOnPageLabel = styled.span(_templateObject3);

var RowsOnPageSelect = styled(FloatingSelectPortal)(_templateObject4);

var paginationComponent = function paginationComponent(WrappedComponent) {
  var _dec, _class, _class2, _temp, _initialiseProps;

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
      setPage: function setPage(grid, page) {
        return dispatch(_setPage(grid, page));
      },
      setRowsOnPage: function setRowsOnPage(grid, rowsOnPage) {
        return dispatch(_setRowsOnPage(grid, rowsOnPage));
      }
    };
  };

  var Pager = (_dec = connect(mapStateToProps, mapDispatchToProps), injectIntl(_class = _dec(_class = (_temp = _class2 = function (_React$PureComponent) {
    _inherits(Pager, _React$PureComponent);

    function Pager(props) {
      _classCallCheck(this, Pager);

      var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

      _initialiseProps.call(_this);

      var grid = props.grid,
          pagination = props.pagination,
          rowsOnPageOptions = props.rowsOnPageOptions,
          rowsOnPage = props.rowsOnPage;

      if (pagination && rowsOnPageOptions && rowsOnPageOptions.length > 0) {
        var defaultRowsOnPage = rowsOnPageOptions.find(function (option) {
          return option.value === pagination.pageSize;
        }) || rowsOnPageOptions[0];
        if (defaultRowsOnPage && defaultRowsOnPage.value !== rowsOnPage) {
          props.setRowsOnPage(grid, defaultRowsOnPage.value);
        }
      }
      return _this;
    }

    return Pager;
  }(React.PureComponent), _class2.defaultProps = {
    children: null,
    page: 1,
    pagination: undefined,
    rowsOnPage: undefined,
    rowsOnPageOptions: ROWS_ON_PAGE_OPTIONS,
    sortColumn: undefined,
    sortOrder: undefined
  }, _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.componentDidUpdate = function (prevProps) {
      var _props = _this2.props,
          filterData = _props.filterData,
          pagination = _props.pagination,
          page = _props.page,
          rowsOnPage = _props.rowsOnPage,
          sortColumn = _props.sortColumn,
          sortOrder = _props.sortOrder;

      if (pagination && !filterData.equals(prevProps.filterData) && page > 1) {
        _this2.gotoPage(1);
      } else if (pagination && (!filterData.equals(prevProps.filterData) || page !== prevProps.page || rowsOnPage !== prevProps.rowsOnPage || sortColumn !== prevProps.sortColumn || sortOrder !== prevProps.sortOrder)) {
        _this2.requestData();
      }
    };

    this.getSelectedRowsOnPageOption = function () {
      var _props2 = _this2.props,
          rowsOnPage = _props2.rowsOnPage,
          rowsOnPageOptions = _props2.rowsOnPageOptions;

      return rowsOnPageOptions.find(function (option) {
        return option.value === rowsOnPage;
      });
    };

    this.requestData = function () {
      var _props3 = _this2.props,
          filterData = _props3.filterData,
          pagination = _props3.pagination,
          page = _props3.page,
          rowsOnPage = _props3.rowsOnPage,
          sortColumn = _props3.sortColumn,
          sortOrder = _props3.sortOrder;

      var offset = (page - 1) * rowsOnPage;
      pagination.getData(offset, rowsOnPage, filterData, sortColumn, sortOrder);
    };

    this.gotoPage = function (page) {
      var grid = _this2.props.grid;

      _this2.props.setPage(grid, page);
    };

    this.handleRowsOnPageChange = function (rowsOnPageOption) {
      var _props4 = _this2.props,
          grid = _props4.grid,
          page = _props4.page,
          pagination = _props4.pagination;

      var rowsOnPage = rowsOnPageOption.value;
      _this2.props.setRowsOnPage(grid, rowsOnPage);
      if (page > Math.ceil(pagination.totalSize / rowsOnPage)) {
        _this2.gotoPage(1);
      }
    };

    this.renderTotalCount = function () {
      var _props5 = _this2.props,
          intl = _props5.intl,
          pagination = _props5.pagination;
      var totalLimit = pagination.totalLimit,
          totalSize = pagination.totalSize;

      var label = void 0;
      switch (totalSize) {
        case 1:
          label = intl.formatMessage({ id: 'Grid.Pagination.TotalSingular' });
          break;
        case totalLimit:
          label = intl.formatMessage({ id: 'Grid.Pagination.TotalOver' }, { n: totalSize });
          break;
        default:
          label = intl.formatMessage({ id: 'Grid.Pagination.TotalPlural' }, { n: totalSize });
          break;
      }
      return React.createElement(
        'span',
        null,
        label
      );
    };

    this.render = function () {
      var _props6 = _this2.props,
          children = _props6.children,
          grid = _props6.grid,
          intl = _props6.intl,
          isCreating = _props6.isCreating,
          isEditing = _props6.isEditing,
          page = _props6.page,
          pagination = _props6.pagination,
          rowsOnPage = _props6.rowsOnPage,
          rowsOnPageOptions = _props6.rowsOnPageOptions;

      var pageCount = pagination && pagination.totalSize > 0 && rowsOnPage > 0 ? Math.ceil(pagination.totalSize / rowsOnPage) : 1;
      var pages = [];
      for (var i = 1; i <= pageCount; i++) {
        pages.push(i);
      }
      return pagination ? React.createElement(
        WrappedComponent,
        _extends({}, _this2.props, { grid: _extends({}, grid, { pagination: true }) }),
        children,
        React.createElement(
          Pagination,
          { className: 'footer' },
          _this2.renderTotalCount(),
          React.createElement(ListItems, {
            disabled: isCreating || isEditing,
            goToItem: _this2.gotoPage,
            id: 'listPaginationItems',
            itemId: page,
            itemIds: List(pages),
            typeable: true
          }),
          React.createElement(
            RowsOnPage,
            null,
            React.createElement(
              RowsOnPageLabel,
              null,
              intl.formatMessage({ id: 'Grid.Pagination.RowsOnPage' })
            ),
            React.createElement(RowsOnPageSelect, {
              isCrearable: false,
              isDisabled: isCreating || isEditing,
              onChange: _this2.handleRowsOnPageChange,
              options: rowsOnPageOptions,
              value: _this2.getSelectedRowsOnPageOption()
            })
          )
        )
      ) : React.createElement(WrappedComponent, _this2.props);
    };
  }, _temp)) || _class) || _class);


  return Pager;
};

export default paginationComponent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9wYWdpbmF0aW9uLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJJbW11dGFibGVQcm9wVHlwZXMiLCJpbmplY3RJbnRsIiwiaW50bFNoYXBlIiwiTGlzdCIsIk1hcCIsImNvbm5lY3QiLCJzdHlsZWQiLCJGbG9hdGluZ1NlbGVjdFBvcnRhbCIsIkxpc3RJdGVtcyIsInNldFBhZ2UiLCJzZXRSb3dzT25QYWdlIiwiZ3JpZFNoYXBlIiwiUk9XU19PTl9QQUdFX09QVElPTlMiLCJsYWJlbCIsInZhbHVlIiwiUGFnaW5hdGlvbiIsImRpdiIsIlJvd3NPblBhZ2UiLCJSb3dzT25QYWdlTGFiZWwiLCJzcGFuIiwiUm93c09uUGFnZVNlbGVjdCIsInBhZ2luYXRpb25Db21wb25lbnQiLCJXcmFwcGVkQ29tcG9uZW50IiwibWFwU3RhdGVUb1Byb3BzIiwic3RhdGUiLCJvd25Qcm9wcyIsIkdSSUQiLCJncmlkIiwiZmlsdGVyRGF0YSIsImRhdGFncmlkIiwiZ2V0SW4iLCJpZCIsImlzQ3JlYXRpbmciLCJpc0VkaXRpbmciLCJwYWdlIiwicm93c09uUGFnZSIsInNvcnRDb2x1bW4iLCJkZWZhdWx0U29ydENvbHVtbiIsInNvcnRPcmRlciIsImRlZmF1bHRTb3J0T3JkZXIiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJkaXNwYXRjaCIsIlBhZ2VyIiwicHJvcHMiLCJwYWdpbmF0aW9uIiwicm93c09uUGFnZU9wdGlvbnMiLCJsZW5ndGgiLCJkZWZhdWx0Um93c09uUGFnZSIsImZpbmQiLCJvcHRpb24iLCJwYWdlU2l6ZSIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJjaGlsZHJlbiIsInVuZGVmaW5lZCIsImNvbXBvbmVudERpZFVwZGF0ZSIsInByZXZQcm9wcyIsImVxdWFscyIsImdvdG9QYWdlIiwicmVxdWVzdERhdGEiLCJnZXRTZWxlY3RlZFJvd3NPblBhZ2VPcHRpb24iLCJvZmZzZXQiLCJnZXREYXRhIiwiaGFuZGxlUm93c09uUGFnZUNoYW5nZSIsInJvd3NPblBhZ2VPcHRpb24iLCJNYXRoIiwiY2VpbCIsInRvdGFsU2l6ZSIsInJlbmRlclRvdGFsQ291bnQiLCJpbnRsIiwidG90YWxMaW1pdCIsImZvcm1hdE1lc3NhZ2UiLCJuIiwicmVuZGVyIiwicGFnZUNvdW50IiwicGFnZXMiLCJpIiwicHVzaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLE9BQU9DLGtCQUFQLE1BQStCLDJCQUEvQjtBQUNBLFNBQVNDLFVBQVQsRUFBcUJDLFNBQXJCLFFBQXNDLFlBQXRDO0FBQ0EsU0FBU0MsSUFBVCxFQUFlQyxHQUFmLFFBQTBCLFdBQTFCO0FBQ0EsU0FBU0MsT0FBVCxRQUF3QixhQUF4QjtBQUNBLE9BQU9DLE1BQVAsTUFBbUIsbUJBQW5CO0FBQ0EsU0FBU0Msb0JBQVQsUUFBcUMsbUNBQXJDO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQiw4QkFBdEI7QUFDQSxTQUFTQyxtQkFBVCxFQUFrQkMsK0JBQWxCLFFBQXVDLG9CQUF2QztBQUNBLFNBQVNDLFNBQVQsUUFBMEIsa0JBQTFCOztBQUVBLE9BQU8sMkJBQVA7O0FBRUEsSUFBTUMsdUJBQXVCLENBQzNCO0FBQ0VDLFNBQU8sSUFEVDtBQUVFQyxTQUFPO0FBRlQsQ0FEMkIsRUFLM0I7QUFDRUQsU0FBTyxJQURUO0FBRUVDLFNBQU87QUFGVCxDQUwyQixFQVMzQjtBQUNFRCxTQUFPLElBRFQ7QUFFRUMsU0FBTztBQUZULENBVDJCLEVBYTNCO0FBQ0VELFNBQU8sSUFEVDtBQUVFQyxTQUFPO0FBRlQsQ0FiMkIsRUFpQjNCO0FBQ0VELFNBQU8sS0FEVDtBQUVFQyxTQUFPO0FBRlQsQ0FqQjJCLENBQTdCOztBQXVCQSxJQUFNQyxhQUFhVCxPQUFPVSxHQUFwQixpQkFBTjs7QUFVQSxJQUFNQyxhQUFhWCxPQUFPVSxHQUFw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RjtBQUlFLGdDQUFDLGdCQUFEO0FBQ0UsMkJBQWEsS0FEZjtBQUVFLDBCQUFZQyxjQUFjQyxTQUY1QjtBQUdFLHdCQUFVLE9BQUs4QixzQkFIakI7QUFJRSx1QkFBU2xCLGlCQUpYO0FBS0UscUJBQU8sT0FBS2UsMkJBQUw7QUFMVDtBQUpGO0FBVkY7QUFGRixPQURNLEdBMkJKLG9CQUFDLGdCQUFELEVBQXNCLE9BQUtqQixLQUEzQixDQTNCSjtBQTZCRCxLQXBNNkM7QUFBQTs7O0FBdU1oRCxTQUFPRCxLQUFQO0FBQ0QsQ0F4TUQ7O0FBME1BLGVBQWVyQixtQkFBZiIsImZpbGUiOiJwYWdpbmF0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLXBsdXNwbHVzICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgeyBpbmplY3RJbnRsLCBpbnRsU2hhcGUgfSBmcm9tICdyZWFjdC1pbnRsJztcbmltcG9ydCB7IExpc3QsIE1hcCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgeyBGbG9hdGluZ1NlbGVjdFBvcnRhbCB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWZsb2F0aW5nLXNlbGVjdCc7XG5pbXBvcnQgTGlzdEl0ZW1zIGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWxpc3QtaXRlbXMnO1xuaW1wb3J0IHsgc2V0UGFnZSwgc2V0Um93c09uUGFnZSB9IGZyb20gJy4vZGF0YWdyaWQuYWN0aW9ucyc7XG5pbXBvcnQgeyBncmlkU2hhcGUgfSBmcm9tICcuL2RhdGFncmlkLnByb3BzJztcblxuaW1wb3J0ICcuL2RhdGFncmlkLnZhcmlhYmxlcy5zY3NzJztcblxuY29uc3QgUk9XU19PTl9QQUdFX09QVElPTlMgPSBbXG4gIHtcbiAgICBsYWJlbDogJzEwJyxcbiAgICB2YWx1ZTogMTAsXG4gIH0sXG4gIHtcbiAgICBsYWJlbDogJzI1JyxcbiAgICB2YWx1ZTogMjUsXG4gIH0sXG4gIHtcbiAgICBsYWJlbDogJzUwJyxcbiAgICB2YWx1ZTogNTAsXG4gIH0sXG4gIHtcbiAgICBsYWJlbDogJzc1JyxcbiAgICB2YWx1ZTogNzUsXG4gIH0sXG4gIHtcbiAgICBsYWJlbDogJzEwMCcsXG4gICAgdmFsdWU6IDEwMCxcbiAgfSxcbl07XG5cbmNvbnN0IFBhZ2luYXRpb24gPSBzdHlsZWQuZGl2YFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBkaXNwbGF5OiBmbGV4O1xuICBwYWRkaW5nOiAxcmVtO1xuICBoZWlnaHQ6IGF1dG87XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgd2lkdGg6IDEwMCU7XG4gIGZsZXg6IDAgMCBhdXRvO1xuYDtcblxuY29uc3QgUm93c09uUGFnZSA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5gO1xuXG5jb25zdCBSb3dzT25QYWdlTGFiZWwgPSBzdHlsZWQuc3BhbmBcbiAgcGFkZGluZzogMCAxcmVtO1xuYDtcblxuY29uc3QgUm93c09uUGFnZVNlbGVjdCA9IHN0eWxlZChGbG9hdGluZ1NlbGVjdFBvcnRhbClgXG4gIG1pbi13aWR0aDogNjBweDtcbmA7XG5cbmNvbnN0IHBhZ2luYXRpb25Db21wb25lbnQgPSAoV3JhcHBlZENvbXBvbmVudCkgPT4ge1xuICBjb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUsIG93blByb3BzKSA9PiB7XG4gICAgY29uc3QgR1JJRCA9IG93blByb3BzLmdyaWQ7XG4gICAgcmV0dXJuIHtcbiAgICAgIGZpbHRlckRhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnZmlsdGVyRGF0YSddLCBNYXAoKSksXG4gICAgICBpc0NyZWF0aW5nOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnaXNDcmVhdGluZyddLCBmYWxzZSksXG4gICAgICBpc0VkaXRpbmc6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdpc0VkaXRpbmcnXSwgZmFsc2UpLFxuICAgICAgcGFnZTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAncGFnZSddKSxcbiAgICAgIHJvd3NPblBhZ2U6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ3Jvd3NPblBhZ2UnXSksXG4gICAgICBzb3J0Q29sdW1uOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdzb3J0aW5nRGF0YScsICdzb3J0Q29sdW1uJ10sIEdSSUQuZGVmYXVsdFNvcnRDb2x1bW4pLFxuICAgICAgc29ydE9yZGVyOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdzb3J0aW5nRGF0YScsICdzb3J0T3JkZXInXSwgR1JJRC5kZWZhdWx0U29ydE9yZGVyKSxcbiAgICB9O1xuICB9O1xuXG4gIGNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+ICh7XG4gICAgc2V0UGFnZTogKGdyaWQsIHBhZ2UpID0+IGRpc3BhdGNoKHNldFBhZ2UoZ3JpZCwgcGFnZSkpLFxuICAgIHNldFJvd3NPblBhZ2U6IChncmlkLCByb3dzT25QYWdlKSA9PiBkaXNwYXRjaChzZXRSb3dzT25QYWdlKGdyaWQsIHJvd3NPblBhZ2UpKSxcbiAgfSk7XG5cbiAgQGluamVjdEludGxcbiAgQGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpXG4gIGNsYXNzIFBhZ2VyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgIGdyaWQ6IGdyaWRTaGFwZS5pc1JlcXVpcmVkLFxuICAgICAgZmlsdGVyRGF0YTogSW1tdXRhYmxlUHJvcFR5cGVzLm1hcC5pc1JlcXVpcmVkLFxuICAgICAgaW50bDogaW50bFNoYXBlLmlzUmVxdWlyZWQsXG4gICAgICBpc0VkaXRpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgICBpc0NyZWF0aW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgc2V0UGFnZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIHNldFJvd3NPblBhZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgICBwYWdlOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgcGFnaW5hdGlvbjogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgZ2V0RGF0YTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgcGFnZVNpemU6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgdG90YWxTaXplOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgIHRvdGFsTGltaXQ6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICB9KSxcbiAgICAgIHJvd3NPblBhZ2U6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICByb3dzT25QYWdlT3B0aW9uczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgbGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5lbGVtZW50LCBQcm9wVHlwZXMuc3RyaW5nXSkuaXNSZXF1aXJlZCxcbiAgICAgICAgdmFsdWU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5ib29sLCBQcm9wVHlwZXMubnVtYmVyLCBQcm9wVHlwZXMuc3RyaW5nXSkuaXNSZXF1aXJlZCxcbiAgICAgIH0pKSxcbiAgICAgIHNvcnRDb2x1bW46IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgXSksXG4gICAgICBzb3J0T3JkZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgfTtcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICBjaGlsZHJlbjogbnVsbCxcbiAgICAgIHBhZ2U6IDEsXG4gICAgICBwYWdpbmF0aW9uOiB1bmRlZmluZWQsXG4gICAgICByb3dzT25QYWdlOiB1bmRlZmluZWQsXG4gICAgICByb3dzT25QYWdlT3B0aW9uczogUk9XU19PTl9QQUdFX09QVElPTlMsXG4gICAgICBzb3J0Q29sdW1uOiB1bmRlZmluZWQsXG4gICAgICBzb3J0T3JkZXI6IHVuZGVmaW5lZCxcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgZ3JpZCxcbiAgICAgICAgcGFnaW5hdGlvbixcbiAgICAgICAgcm93c09uUGFnZU9wdGlvbnMsXG4gICAgICAgIHJvd3NPblBhZ2UsXG4gICAgICB9ID0gcHJvcHM7XG4gICAgICBpZiAocGFnaW5hdGlvbiAmJiByb3dzT25QYWdlT3B0aW9ucyAmJiByb3dzT25QYWdlT3B0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRSb3dzT25QYWdlID1cbiAgICAgICAgICByb3dzT25QYWdlT3B0aW9ucy5maW5kKG9wdGlvbiA9PiBvcHRpb24udmFsdWUgPT09IHBhZ2luYXRpb24ucGFnZVNpemUpXG4gICAgICAgICAgfHwgcm93c09uUGFnZU9wdGlvbnNbMF07XG4gICAgICAgIGlmIChkZWZhdWx0Um93c09uUGFnZSAmJiBkZWZhdWx0Um93c09uUGFnZS52YWx1ZSAhPT0gcm93c09uUGFnZSkge1xuICAgICAgICAgIHByb3BzLnNldFJvd3NPblBhZ2UoZ3JpZCwgZGVmYXVsdFJvd3NPblBhZ2UudmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlID0gKHByZXZQcm9wcykgPT4ge1xuICAgICAgY29uc3Qge1xuICAgICAgICBmaWx0ZXJEYXRhLFxuICAgICAgICBwYWdpbmF0aW9uLFxuICAgICAgICBwYWdlLFxuICAgICAgICByb3dzT25QYWdlLFxuICAgICAgICBzb3J0Q29sdW1uLFxuICAgICAgICBzb3J0T3JkZXIsXG4gICAgICB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGlmIChwYWdpbmF0aW9uICYmICFmaWx0ZXJEYXRhLmVxdWFscyhwcmV2UHJvcHMuZmlsdGVyRGF0YSkgJiYgcGFnZSA+IDEpIHtcbiAgICAgICAgdGhpcy5nb3RvUGFnZSgxKTtcbiAgICAgIH0gZWxzZSBpZiAocGFnaW5hdGlvbiAmJiAoXG4gICAgICAgICFmaWx0ZXJEYXRhLmVxdWFscyhwcmV2UHJvcHMuZmlsdGVyRGF0YSkgfHxcbiAgICAgICAgcGFnZSAhPT0gcHJldlByb3BzLnBhZ2UgfHxcbiAgICAgICAgcm93c09uUGFnZSAhPT0gcHJldlByb3BzLnJvd3NPblBhZ2UgfHxcbiAgICAgICAgc29ydENvbHVtbiAhPT0gcHJldlByb3BzLnNvcnRDb2x1bW4gfHxcbiAgICAgICAgc29ydE9yZGVyICE9PSBwcmV2UHJvcHMuc29ydE9yZGVyKSkge1xuICAgICAgICB0aGlzLnJlcXVlc3REYXRhKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGdldFNlbGVjdGVkUm93c09uUGFnZU9wdGlvbiA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHsgcm93c09uUGFnZSwgcm93c09uUGFnZU9wdGlvbnMgfSA9IHRoaXMucHJvcHM7XG4gICAgICByZXR1cm4gcm93c09uUGFnZU9wdGlvbnMuZmluZChvcHRpb24gPT4gb3B0aW9uLnZhbHVlID09PSByb3dzT25QYWdlKTtcbiAgICB9XG5cbiAgICByZXF1ZXN0RGF0YSA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgZmlsdGVyRGF0YSxcbiAgICAgICAgcGFnaW5hdGlvbixcbiAgICAgICAgcGFnZSxcbiAgICAgICAgcm93c09uUGFnZSxcbiAgICAgICAgc29ydENvbHVtbixcbiAgICAgICAgc29ydE9yZGVyLFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCBvZmZzZXQgPSAoKHBhZ2UpIC0gMSkgKiByb3dzT25QYWdlO1xuICAgICAgcGFnaW5hdGlvbi5nZXREYXRhKG9mZnNldCwgcm93c09uUGFnZSwgZmlsdGVyRGF0YSwgc29ydENvbHVtbiwgc29ydE9yZGVyKTtcbiAgICB9XG5cbiAgICBnb3RvUGFnZSA9IChwYWdlKSA9PiB7XG4gICAgICBjb25zdCB7IGdyaWQgfSA9IHRoaXMucHJvcHM7XG4gICAgICB0aGlzLnByb3BzLnNldFBhZ2UoZ3JpZCwgcGFnZSk7XG4gICAgfVxuXG4gICAgaGFuZGxlUm93c09uUGFnZUNoYW5nZSA9IChyb3dzT25QYWdlT3B0aW9uKSA9PiB7XG4gICAgICBjb25zdCB7IGdyaWQsIHBhZ2UsIHBhZ2luYXRpb24gfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCByb3dzT25QYWdlID0gcm93c09uUGFnZU9wdGlvbi52YWx1ZTtcbiAgICAgIHRoaXMucHJvcHMuc2V0Um93c09uUGFnZShncmlkLCByb3dzT25QYWdlKTtcbiAgICAgIGlmIChwYWdlID4gTWF0aC5jZWlsKHBhZ2luYXRpb24udG90YWxTaXplIC8gcm93c09uUGFnZSkpIHtcbiAgICAgICAgdGhpcy5nb3RvUGFnZSgxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJUb3RhbENvdW50ID0gKCkgPT4ge1xuICAgICAgY29uc3QgeyBpbnRsLCBwYWdpbmF0aW9uIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3QgeyB0b3RhbExpbWl0LCB0b3RhbFNpemUgfSA9IHBhZ2luYXRpb247XG4gICAgICBsZXQgbGFiZWw7XG4gICAgICBzd2l0Y2ggKHRvdGFsU2l6ZSkge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgbGFiZWwgPSBpbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuUGFnaW5hdGlvbi5Ub3RhbFNpbmd1bGFyJyB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB0b3RhbExpbWl0OlxuICAgICAgICAgIGxhYmVsID0gaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLlBhZ2luYXRpb24uVG90YWxPdmVyJyB9LCB7IG46IHRvdGFsU2l6ZSB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBsYWJlbCA9IGludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5QYWdpbmF0aW9uLlRvdGFsUGx1cmFsJyB9LCB7IG46IHRvdGFsU2l6ZSB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHJldHVybiA8c3Bhbj57bGFiZWx9PC9zcGFuPjtcbiAgICB9XG5cbiAgICByZW5kZXIgPSAoKSA9PiB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGNoaWxkcmVuLFxuICAgICAgICBncmlkLFxuICAgICAgICBpbnRsLFxuICAgICAgICBpc0NyZWF0aW5nLFxuICAgICAgICBpc0VkaXRpbmcsXG4gICAgICAgIHBhZ2UsXG4gICAgICAgIHBhZ2luYXRpb24sXG4gICAgICAgIHJvd3NPblBhZ2UsXG4gICAgICAgIHJvd3NPblBhZ2VPcHRpb25zLFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCBwYWdlQ291bnQgPSBwYWdpbmF0aW9uICYmIHBhZ2luYXRpb24udG90YWxTaXplID4gMCAmJiByb3dzT25QYWdlID4gMFxuICAgICAgICA/IE1hdGguY2VpbChwYWdpbmF0aW9uLnRvdGFsU2l6ZSAvIHJvd3NPblBhZ2UpIDogMTtcbiAgICAgIGNvbnN0IHBhZ2VzID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBwYWdlQ291bnQ7IGkrKykge1xuICAgICAgICBwYWdlcy5wdXNoKGkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIChwYWdpbmF0aW9uID9cbiAgICAgICAgPFdyYXBwZWRDb21wb25lbnQgey4uLnRoaXMucHJvcHN9IGdyaWQ9e3sgLi4uZ3JpZCwgcGFnaW5hdGlvbjogdHJ1ZSB9fT5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgPFBhZ2luYXRpb24gY2xhc3NOYW1lPVwiZm9vdGVyXCI+XG4gICAgICAgICAgICB7dGhpcy5yZW5kZXJUb3RhbENvdW50KCl9XG4gICAgICAgICAgICA8TGlzdEl0ZW1zXG4gICAgICAgICAgICAgIGRpc2FibGVkPXtpc0NyZWF0aW5nIHx8IGlzRWRpdGluZ31cbiAgICAgICAgICAgICAgZ29Ub0l0ZW09e3RoaXMuZ290b1BhZ2V9XG4gICAgICAgICAgICAgIGlkPVwibGlzdFBhZ2luYXRpb25JdGVtc1wiXG4gICAgICAgICAgICAgIGl0ZW1JZD17cGFnZX1cbiAgICAgICAgICAgICAgaXRlbUlkcz17TGlzdChwYWdlcyl9XG4gICAgICAgICAgICAgIHR5cGVhYmxlXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPFJvd3NPblBhZ2U+XG4gICAgICAgICAgICAgIDxSb3dzT25QYWdlTGFiZWw+XG4gICAgICAgICAgICAgICAge2ludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5QYWdpbmF0aW9uLlJvd3NPblBhZ2UnIH0pfVxuICAgICAgICAgICAgICA8L1Jvd3NPblBhZ2VMYWJlbD5cbiAgICAgICAgICAgICAgPFJvd3NPblBhZ2VTZWxlY3RcbiAgICAgICAgICAgICAgICBpc0NyZWFyYWJsZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgaXNEaXNhYmxlZD17aXNDcmVhdGluZyB8fCBpc0VkaXRpbmd9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlUm93c09uUGFnZUNoYW5nZX1cbiAgICAgICAgICAgICAgICBvcHRpb25zPXtyb3dzT25QYWdlT3B0aW9uc31cbiAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRTZWxlY3RlZFJvd3NPblBhZ2VPcHRpb24oKX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvUm93c09uUGFnZT5cbiAgICAgICAgICA8L1BhZ2luYXRpb24+XG4gICAgICAgIDwvV3JhcHBlZENvbXBvbmVudD5cbiAgICAgICAgOiA8V3JhcHBlZENvbXBvbmVudCB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIFBhZ2VyO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcGFnaW5hdGlvbkNvbXBvbmVudDtcbiJdfQ==