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
  var data = _taggedTemplateLiteralLoose(["\n  padding: 0 1rem;\n"]);

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
      setPage: function setPage(grid, page) {
        return dispatch(_setPage(grid, page));
      },
      setRowsOnPage: function setRowsOnPage(grid, rowsOnPage) {
        return dispatch(_setRowsOnPage(grid, rowsOnPage));
      }
    };
  };

  var Pager = (_dec = connect(mapStateToProps, mapDispatchToProps), injectIntl(_class = _dec(_class = (_temp = _class2 =
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

        return React.createElement("span", null, label);
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

        return pagination ? React.createElement(WrappedComponent, _extends({}, _this.props, {
          grid: _extends({}, grid, {
            pagination: true
          })
        }), children, React.createElement(Pagination, {
          className: "footer"
        }, _this.renderTotalCount(), React.createElement(ListItems, {
          disabled: isCreating || isEditing,
          goToItem: _this.gotoPage,
          id: "listPaginationItems",
          itemId: page,
          itemIds: List(pages),
          typeable: true
        }), React.createElement(RowsOnPage, null, React.createElement(RowsOnPageLabel, null, intl.formatMessage({
          id: 'Grid.Pagination.RowsOnPage'
        })), React.createElement(RowsOnPageSelect, {
          isCrearable: false,
          isDisabled: isCreating || isEditing,
          onChange: _this.handleRowsOnPageChange,
          options: rowsOnPageOptions,
          value: _this.getSelectedRowsOnPageOption()
        })))) : React.createElement(WrappedComponent, _this.props);
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
  }(React.PureComponent), _defineProperty(_class2, "defaultProps", {
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

export default paginationComponent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9wYWdpbmF0aW9uLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJJbW11dGFibGVQcm9wVHlwZXMiLCJpbmplY3RJbnRsIiwiaW50bFNoYXBlIiwiTGlzdCIsIk1hcCIsImNvbm5lY3QiLCJzdHlsZWQiLCJGbG9hdGluZ1NlbGVjdFBvcnRhbCIsIkxpc3RJdGVtcyIsInNldFBhZ2UiLCJzZXRSb3dzT25QYWdlIiwiZ3JpZFNoYXBlIiwiUk9XU19PTl9QQUdFX09QVElPTlMiLCJsYWJlbCIsInZhbHVlIiwiUGFnaW5hdGlvbiIsImRpdiIsIlJvd3NPblBhZ2UiLCJSb3dzT25QYWdlTGFiZWwiLCJzcGFuIiwiUm93c09uUGFnZVNlbGVjdCIsInBhZ2luYXRpb25Db21wb25lbnQiLCJXcmFwcGVkQ29tcG9uZW50IiwibWFwU3RhdGVUb1Byb3BzIiwic3RhdGUiLCJvd25Qcm9wcyIsIkdSSUQiLCJncmlkIiwiZmlsdGVyRGF0YSIsImRhdGFncmlkIiwiZ2V0SW4iLCJpZCIsImlzQ3JlYXRpbmciLCJpc0VkaXRpbmciLCJwYWdlIiwicm93c09uUGFnZSIsInNvcnRDb2x1bW4iLCJkZWZhdWx0U29ydENvbHVtbiIsInNvcnRPcmRlciIsImRlZmF1bHRTb3J0T3JkZXIiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJkaXNwYXRjaCIsIlBhZ2VyIiwicHJvcHMiLCJwcmV2UHJvcHMiLCJwYWdpbmF0aW9uIiwiZXF1YWxzIiwiZ290b1BhZ2UiLCJyZXF1ZXN0RGF0YSIsInJvd3NPblBhZ2VPcHRpb25zIiwiZmluZCIsIm9wdGlvbiIsIm9mZnNldCIsImdldERhdGEiLCJyb3dzT25QYWdlT3B0aW9uIiwiTWF0aCIsImNlaWwiLCJ0b3RhbFNpemUiLCJpbnRsIiwidG90YWxMaW1pdCIsImZvcm1hdE1lc3NhZ2UiLCJuIiwiY2hpbGRyZW4iLCJwYWdlQ291bnQiLCJwYWdlcyIsImkiLCJwdXNoIiwicmVuZGVyVG90YWxDb3VudCIsImhhbmRsZVJvd3NPblBhZ2VDaGFuZ2UiLCJnZXRTZWxlY3RlZFJvd3NPblBhZ2VPcHRpb24iLCJsZW5ndGgiLCJkZWZhdWx0Um93c09uUGFnZSIsInBhZ2VTaXplIiwiUHVyZUNvbXBvbmVudCIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsT0FBT0Msa0JBQVAsTUFBK0IsMkJBQS9CO0FBQ0EsU0FBU0MsVUFBVCxFQUFxQkMsU0FBckIsUUFBc0MsWUFBdEM7QUFDQSxTQUFTQyxJQUFULEVBQWVDLEdBQWYsUUFBMEIsV0FBMUI7QUFDQSxTQUFTQyxPQUFULFFBQXdCLGFBQXhCO0FBQ0EsT0FBT0MsTUFBUCxNQUFtQixtQkFBbkI7QUFDQSxTQUFTQyxvQkFBVCxRQUFxQyxtQ0FBckM7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLDhCQUF0QjtBQUNBLFNBQVNDLE9BQU8sSUFBUEEsUUFBVCxFQUFrQkMsYUFBYSxJQUFiQSxjQUFsQixRQUF1QyxvQkFBdkM7QUFDQSxTQUFTQyxTQUFULFFBQTBCLGtCQUExQjtBQUVBLE9BQU8sMkJBQVA7QUFFQSxJQUFNQyxvQkFBb0IsR0FBRyxDQUMzQjtBQUNFQyxFQUFBQSxLQUFLLEVBQUUsSUFEVDtBQUVFQyxFQUFBQSxLQUFLLEVBQUU7QUFGVCxDQUQyQixFQUszQjtBQUNFRCxFQUFBQSxLQUFLLEVBQUUsSUFEVDtBQUVFQyxFQUFBQSxLQUFLLEVBQUU7QUFGVCxDQUwyQixFQVMzQjtBQUNFRCxFQUFBQSxLQUFLLEVBQUUsSUFEVDtBQUVFQyxFQUFBQSxLQUFLLEVBQUU7QUFGVCxDQVQyQixFQWEzQjtBQUNFRCxFQUFBQSxLQUFLLEVBQUUsSUFEVDtBQUVFQyxFQUFBQSxLQUFLLEVBQUU7QUFGVCxDQWIyQixFQWlCM0I7QUFDRUQsRUFB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RUFBRXVDLFNBSlE7QUFLcEJ6QixJQUFBQSxpQkFBaUIsRUFBRXJDLG9CQUxDO0FBTXBCd0IsSUFBQUEsVUFBVSxFQUFFc0MsU0FOUTtBQU9wQnBDLElBQUFBLFNBQVMsRUFBRW9DO0FBUFMsR0EzRHdCO0FBdU1oRCxTQUFPaEMsS0FBUDtBQUNELENBeE1EOztBQTBNQSxlQUFlckIsbUJBQWYiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgSW1tdXRhYmxlUHJvcFR5cGVzIGZyb20gJ3JlYWN0LWltbXV0YWJsZS1wcm9wdHlwZXMnO1xuaW1wb3J0IHsgaW5qZWN0SW50bCwgaW50bFNoYXBlIH0gZnJvbSAncmVhY3QtaW50bCc7XG5pbXBvcnQgeyBMaXN0LCBNYXAgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgRmxvYXRpbmdTZWxlY3RQb3J0YWwgfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1mbG9hdGluZy1zZWxlY3QnO1xuaW1wb3J0IExpc3RJdGVtcyBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1saXN0LWl0ZW1zJztcbmltcG9ydCB7IHNldFBhZ2UsIHNldFJvd3NPblBhZ2UgfSBmcm9tICcuL2RhdGFncmlkLmFjdGlvbnMnO1xuaW1wb3J0IHsgZ3JpZFNoYXBlIH0gZnJvbSAnLi9kYXRhZ3JpZC5wcm9wcyc7XG5cbmltcG9ydCAnLi9kYXRhZ3JpZC52YXJpYWJsZXMuc2Nzcyc7XG5cbmNvbnN0IFJPV1NfT05fUEFHRV9PUFRJT05TID0gW1xuICB7XG4gICAgbGFiZWw6ICcxMCcsXG4gICAgdmFsdWU6IDEwLFxuICB9LFxuICB7XG4gICAgbGFiZWw6ICcyNScsXG4gICAgdmFsdWU6IDI1LFxuICB9LFxuICB7XG4gICAgbGFiZWw6ICc1MCcsXG4gICAgdmFsdWU6IDUwLFxuICB9LFxuICB7XG4gICAgbGFiZWw6ICc3NScsXG4gICAgdmFsdWU6IDc1LFxuICB9LFxuICB7XG4gICAgbGFiZWw6ICcxMDAnLFxuICAgIHZhbHVlOiAxMDAsXG4gIH0sXG5dO1xuXG5jb25zdCBQYWdpbmF0aW9uID0gc3R5bGVkLmRpdmBcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZGlzcGxheTogZmxleDtcbiAgcGFkZGluZzogMXJlbTtcbiAgaGVpZ2h0OiBhdXRvO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIHdpZHRoOiAxMDAlO1xuICBmbGV4OiAwIDAgYXV0bztcbmA7XG5cbmNvbnN0IFJvd3NPblBhZ2UgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuYDtcblxuY29uc3QgUm93c09uUGFnZUxhYmVsID0gc3R5bGVkLnNwYW5gXG4gIHBhZGRpbmc6IDAgMXJlbTtcbmA7XG5cbmNvbnN0IFJvd3NPblBhZ2VTZWxlY3QgPSBzdHlsZWQoRmxvYXRpbmdTZWxlY3RQb3J0YWwpYFxuICBtaW4td2lkdGg6IDYwcHg7XG5gO1xuXG5jb25zdCBwYWdpbmF0aW9uQ29tcG9uZW50ID0gKFdyYXBwZWRDb21wb25lbnQpID0+IHtcbiAgY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlLCBvd25Qcm9wcykgPT4ge1xuICAgIGNvbnN0IEdSSUQgPSBvd25Qcm9wcy5ncmlkO1xuICAgIHJldHVybiB7XG4gICAgICBmaWx0ZXJEYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2ZpbHRlckRhdGEnXSwgTWFwKCkpLFxuICAgICAgaXNDcmVhdGluZzogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2lzQ3JlYXRpbmcnXSwgZmFsc2UpLFxuICAgICAgaXNFZGl0aW5nOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnaXNFZGl0aW5nJ10sIGZhbHNlKSxcbiAgICAgIHBhZ2U6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ3BhZ2UnXSksXG4gICAgICByb3dzT25QYWdlOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdyb3dzT25QYWdlJ10pLFxuICAgICAgc29ydENvbHVtbjogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oXG4gICAgICAgIFtHUklELmlkLCAnY29uZmlnJywgJ3NvcnRpbmdEYXRhJywgJ3NvcnRDb2x1bW4nXSxcbiAgICAgICAgR1JJRC5kZWZhdWx0U29ydENvbHVtbixcbiAgICAgICksXG4gICAgICBzb3J0T3JkZXI6IHN0YXRlLmRhdGFncmlkLmdldEluKFxuICAgICAgICBbR1JJRC5pZCwgJ2NvbmZpZycsICdzb3J0aW5nRGF0YScsICdzb3J0T3JkZXInXSxcbiAgICAgICAgR1JJRC5kZWZhdWx0U29ydE9yZGVyLFxuICAgICAgKSxcbiAgICB9O1xuICB9O1xuXG4gIGNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+ICh7XG4gICAgc2V0UGFnZTogKGdyaWQsIHBhZ2UpID0+IGRpc3BhdGNoKHNldFBhZ2UoZ3JpZCwgcGFnZSkpLFxuICAgIHNldFJvd3NPblBhZ2U6IChncmlkLCByb3dzT25QYWdlKSA9PiBkaXNwYXRjaChzZXRSb3dzT25QYWdlKGdyaWQsIHJvd3NPblBhZ2UpKSxcbiAgfSk7XG5cbiAgQGluamVjdEludGxcbiAgQGNvbm5lY3QoXG4gICAgbWFwU3RhdGVUb1Byb3BzLFxuICAgIG1hcERpc3BhdGNoVG9Qcm9wcyxcbiAgKVxuICBjbGFzcyBQYWdlciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICBncmlkOiBncmlkU2hhcGUuaXNSZXF1aXJlZCxcbiAgICAgIGZpbHRlckRhdGE6IEltbXV0YWJsZVByb3BUeXBlcy5tYXAuaXNSZXF1aXJlZCxcbiAgICAgIGludGw6IGludGxTaGFwZS5pc1JlcXVpcmVkLFxuICAgICAgaXNFZGl0aW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgaXNDcmVhdGluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgIHNldFBhZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICBzZXRSb3dzT25QYWdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuICAgICAgcGFnZTogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIHBhZ2luYXRpb246IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIGdldERhdGE6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIHBhZ2VTaXplOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgIHRvdGFsU2l6ZTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICB0b3RhbExpbWl0OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgfSksXG4gICAgICByb3dzT25QYWdlOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgcm93c09uUGFnZU9wdGlvbnM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgIGxhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuZWxlbWVudCwgUHJvcFR5cGVzLnN0cmluZ10pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgdmFsdWU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5ib29sLCBQcm9wVHlwZXMubnVtYmVyLCBQcm9wVHlwZXMuc3RyaW5nXSlcbiAgICAgICAgICAgIC5pc1JlcXVpcmVkLFxuICAgICAgICB9KSxcbiAgICAgICksXG4gICAgICBzb3J0Q29sdW1uOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubnVtYmVyXSksXG4gICAgICBzb3J0T3JkZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgfTtcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICBjaGlsZHJlbjogbnVsbCxcbiAgICAgIHBhZ2U6IDEsXG4gICAgICBwYWdpbmF0aW9uOiB1bmRlZmluZWQsXG4gICAgICByb3dzT25QYWdlOiB1bmRlZmluZWQsXG4gICAgICByb3dzT25QYWdlT3B0aW9uczogUk9XU19PTl9QQUdFX09QVElPTlMsXG4gICAgICBzb3J0Q29sdW1uOiB1bmRlZmluZWQsXG4gICAgICBzb3J0T3JkZXI6IHVuZGVmaW5lZCxcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgZ3JpZCwgcGFnaW5hdGlvbiwgcm93c09uUGFnZU9wdGlvbnMsIHJvd3NPblBhZ2UsXG4gICAgICB9ID0gcHJvcHM7XG4gICAgICBpZiAocGFnaW5hdGlvbiAmJiByb3dzT25QYWdlT3B0aW9ucyAmJiByb3dzT25QYWdlT3B0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRSb3dzT25QYWdlID0gcm93c09uUGFnZU9wdGlvbnMuZmluZChcbiAgICAgICAgICBvcHRpb24gPT4gb3B0aW9uLnZhbHVlID09PSBwYWdpbmF0aW9uLnBhZ2VTaXplLFxuICAgICAgICApIHx8IHJvd3NPblBhZ2VPcHRpb25zWzBdO1xuICAgICAgICBpZiAoZGVmYXVsdFJvd3NPblBhZ2UgJiYgZGVmYXVsdFJvd3NPblBhZ2UudmFsdWUgIT09IHJvd3NPblBhZ2UpIHtcbiAgICAgICAgICBwcm9wcy5zZXRSb3dzT25QYWdlKGdyaWQsIGRlZmF1bHRSb3dzT25QYWdlLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSA9IChwcmV2UHJvcHMpID0+IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgZmlsdGVyRGF0YSwgcGFnaW5hdGlvbiwgcGFnZSwgcm93c09uUGFnZSwgc29ydENvbHVtbiwgc29ydE9yZGVyLFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBpZiAocGFnaW5hdGlvbiAmJiAhZmlsdGVyRGF0YS5lcXVhbHMocHJldlByb3BzLmZpbHRlckRhdGEpICYmIHBhZ2UgPiAxKSB7XG4gICAgICAgIHRoaXMuZ290b1BhZ2UoMSk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBwYWdpbmF0aW9uXG4gICAgICAgICYmICghZmlsdGVyRGF0YS5lcXVhbHMocHJldlByb3BzLmZpbHRlckRhdGEpXG4gICAgICAgICAgfHwgcGFnZSAhPT0gcHJldlByb3BzLnBhZ2VcbiAgICAgICAgICB8fCByb3dzT25QYWdlICE9PSBwcmV2UHJvcHMucm93c09uUGFnZVxuICAgICAgICAgIHx8IHNvcnRDb2x1bW4gIT09IHByZXZQcm9wcy5zb3J0Q29sdW1uXG4gICAgICAgICAgfHwgc29ydE9yZGVyICE9PSBwcmV2UHJvcHMuc29ydE9yZGVyKVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMucmVxdWVzdERhdGEoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZ2V0U2VsZWN0ZWRSb3dzT25QYWdlT3B0aW9uID0gKCkgPT4ge1xuICAgICAgY29uc3QgeyByb3dzT25QYWdlLCByb3dzT25QYWdlT3B0aW9ucyB9ID0gdGhpcy5wcm9wcztcbiAgICAgIHJldHVybiByb3dzT25QYWdlT3B0aW9ucy5maW5kKG9wdGlvbiA9PiBvcHRpb24udmFsdWUgPT09IHJvd3NPblBhZ2UpO1xuICAgIH07XG5cbiAgICByZXF1ZXN0RGF0YSA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgZmlsdGVyRGF0YSwgcGFnaW5hdGlvbiwgcGFnZSwgcm93c09uUGFnZSwgc29ydENvbHVtbiwgc29ydE9yZGVyLFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCBvZmZzZXQgPSAocGFnZSAtIDEpICogcm93c09uUGFnZTtcbiAgICAgIHBhZ2luYXRpb24uZ2V0RGF0YShvZmZzZXQsIHJvd3NPblBhZ2UsIGZpbHRlckRhdGEsIHNvcnRDb2x1bW4sIHNvcnRPcmRlcik7XG4gICAgfTtcblxuICAgIGdvdG9QYWdlID0gKHBhZ2UpID0+IHtcbiAgICAgIGNvbnN0IHsgZ3JpZCB9ID0gdGhpcy5wcm9wcztcbiAgICAgIHRoaXMucHJvcHMuc2V0UGFnZShncmlkLCBwYWdlKTtcbiAgICB9O1xuXG4gICAgaGFuZGxlUm93c09uUGFnZUNoYW5nZSA9IChyb3dzT25QYWdlT3B0aW9uKSA9PiB7XG4gICAgICBjb25zdCB7IGdyaWQsIHBhZ2UsIHBhZ2luYXRpb24gfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCByb3dzT25QYWdlID0gcm93c09uUGFnZU9wdGlvbi52YWx1ZTtcbiAgICAgIHRoaXMucHJvcHMuc2V0Um93c09uUGFnZShncmlkLCByb3dzT25QYWdlKTtcbiAgICAgIGlmIChwYWdlID4gTWF0aC5jZWlsKHBhZ2luYXRpb24udG90YWxTaXplIC8gcm93c09uUGFnZSkpIHtcbiAgICAgICAgdGhpcy5nb3RvUGFnZSgxKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmVuZGVyVG90YWxDb3VudCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHsgaW50bCwgcGFnaW5hdGlvbiB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IHsgdG90YWxMaW1pdCwgdG90YWxTaXplIH0gPSBwYWdpbmF0aW9uO1xuICAgICAgbGV0IGxhYmVsO1xuICAgICAgc3dpdGNoICh0b3RhbFNpemUpIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIGxhYmVsID0gaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLlBhZ2luYXRpb24uVG90YWxTaW5ndWxhcicgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgdG90YWxMaW1pdDpcbiAgICAgICAgICBsYWJlbCA9IGludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5QYWdpbmF0aW9uLlRvdGFsT3ZlcicgfSwgeyBuOiB0b3RhbFNpemUgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbGFiZWwgPSBpbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuUGFnaW5hdGlvbi5Ub3RhbFBsdXJhbCcgfSwgeyBuOiB0b3RhbFNpemUgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICByZXR1cm4gPHNwYW4+e2xhYmVsfTwvc3Bhbj47XG4gICAgfTtcblxuICAgIHJlbmRlciA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgY2hpbGRyZW4sXG4gICAgICAgIGdyaWQsXG4gICAgICAgIGludGwsXG4gICAgICAgIGlzQ3JlYXRpbmcsXG4gICAgICAgIGlzRWRpdGluZyxcbiAgICAgICAgcGFnZSxcbiAgICAgICAgcGFnaW5hdGlvbixcbiAgICAgICAgcm93c09uUGFnZSxcbiAgICAgICAgcm93c09uUGFnZU9wdGlvbnMsXG4gICAgICB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IHBhZ2VDb3VudCA9IHBhZ2luYXRpb24gJiYgcGFnaW5hdGlvbi50b3RhbFNpemUgPiAwICYmIHJvd3NPblBhZ2UgPiAwXG4gICAgICAgID8gTWF0aC5jZWlsKHBhZ2luYXRpb24udG90YWxTaXplIC8gcm93c09uUGFnZSlcbiAgICAgICAgOiAxO1xuICAgICAgY29uc3QgcGFnZXMgPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IHBhZ2VDb3VudDsgaSsrKSB7XG4gICAgICAgIHBhZ2VzLnB1c2goaSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcGFnaW5hdGlvbiA/IChcbiAgICAgICAgPFdyYXBwZWRDb21wb25lbnQgey4uLnRoaXMucHJvcHN9IGdyaWQ9e3sgLi4uZ3JpZCwgcGFnaW5hdGlvbjogdHJ1ZSB9fT5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgPFBhZ2luYXRpb24gY2xhc3NOYW1lPVwiZm9vdGVyXCI+XG4gICAgICAgICAgICB7dGhpcy5yZW5kZXJUb3RhbENvdW50KCl9XG4gICAgICAgICAgICA8TGlzdEl0ZW1zXG4gICAgICAgICAgICAgIGRpc2FibGVkPXtpc0NyZWF0aW5nIHx8IGlzRWRpdGluZ31cbiAgICAgICAgICAgICAgZ29Ub0l0ZW09e3RoaXMuZ290b1BhZ2V9XG4gICAgICAgICAgICAgIGlkPVwibGlzdFBhZ2luYXRpb25JdGVtc1wiXG4gICAgICAgICAgICAgIGl0ZW1JZD17cGFnZX1cbiAgICAgICAgICAgICAgaXRlbUlkcz17TGlzdChwYWdlcyl9XG4gICAgICAgICAgICAgIHR5cGVhYmxlXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPFJvd3NPblBhZ2U+XG4gICAgICAgICAgICAgIDxSb3dzT25QYWdlTGFiZWw+XG4gICAgICAgICAgICAgICAge2ludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5QYWdpbmF0aW9uLlJvd3NPblBhZ2UnIH0pfVxuICAgICAgICAgICAgICA8L1Jvd3NPblBhZ2VMYWJlbD5cbiAgICAgICAgICAgICAgPFJvd3NPblBhZ2VTZWxlY3RcbiAgICAgICAgICAgICAgICBpc0NyZWFyYWJsZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgaXNEaXNhYmxlZD17aXNDcmVhdGluZyB8fCBpc0VkaXRpbmd9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlUm93c09uUGFnZUNoYW5nZX1cbiAgICAgICAgICAgICAgICBvcHRpb25zPXtyb3dzT25QYWdlT3B0aW9uc31cbiAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRTZWxlY3RlZFJvd3NPblBhZ2VPcHRpb24oKX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvUm93c09uUGFnZT5cbiAgICAgICAgICA8L1BhZ2luYXRpb24+XG4gICAgICAgIDwvV3JhcHBlZENvbXBvbmVudD5cbiAgICAgICkgOiAoXG4gICAgICAgIDxXcmFwcGVkQ29tcG9uZW50IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgKTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIFBhZ2VyO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcGFnaW5hdGlvbkNvbXBvbmVudDtcbiJdfQ==