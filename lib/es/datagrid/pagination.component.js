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
import { setPage as _setPage, setRowsOnPage as setRowsOnPageAction } from './datagrid.actions';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9wYWdpbmF0aW9uLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJJbW11dGFibGVQcm9wVHlwZXMiLCJpbmplY3RJbnRsIiwiaW50bFNoYXBlIiwiTGlzdCIsIk1hcCIsImNvbm5lY3QiLCJzdHlsZWQiLCJGbG9hdGluZ1NlbGVjdFBvcnRhbCIsIkxpc3RJdGVtcyIsInNldFBhZ2UiLCJzZXRSb3dzT25QYWdlIiwic2V0Um93c09uUGFnZUFjdGlvbiIsImdyaWRTaGFwZSIsIlJPV1NfT05fUEFHRV9PUFRJT05TIiwibGFiZWwiLCJ2YWx1ZSIsIlBhZ2luYXRpb24iLCJkaXYiLCJSb3dzT25QYWdlIiwiUm93c09uUGFnZUxhYmVsIiwic3BhbiIsIlJvd3NPblBhZ2VTZWxlY3QiLCJwYWdpbmF0aW9uQ29tcG9uZW50IiwiV3JhcHBlZENvbXBvbmVudCIsIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwib3duUHJvcHMiLCJHUklEIiwiZ3JpZCIsImZpbHRlckRhdGEiLCJkYXRhZ3JpZCIsImdldEluIiwiaWQiLCJpc0NyZWF0aW5nIiwiaXNFZGl0aW5nIiwicGFnZSIsInJvd3NPblBhZ2UiLCJzb3J0Q29sdW1uIiwiZGVmYXVsdFNvcnRDb2x1bW4iLCJzb3J0T3JkZXIiLCJkZWZhdWx0U29ydE9yZGVyIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwiZGlzcGF0Y2giLCJQYWdlciIsInByb3BzIiwicGFnaW5hdGlvbiIsInJvd3NPblBhZ2VPcHRpb25zIiwibGVuZ3RoIiwicGFnZVNpemUiLCJzZWxlY3RlZFJvd3NPblBhZ2UiLCJmaW5kIiwib3B0aW9uIiwicmVxdWVzdERhdGEiLCJwcmV2UHJvcHMiLCJlcXVhbHMiLCJnb3RvUGFnZSIsIm9mZnNldCIsImdldERhdGEiLCJyb3dzT25QYWdlT3B0aW9uIiwiTWF0aCIsImNlaWwiLCJ0b3RhbFNpemUiLCJpbnRsIiwidG90YWxMaW1pdCIsImZvcm1hdE1lc3NhZ2UiLCJuIiwiY2hpbGRyZW4iLCJwYWdlQ291bnQiLCJwYWdlcyIsImkiLCJwdXNoIiwicmVuZGVyVG90YWxDb3VudCIsImhhbmRsZVJvd3NPblBhZ2VDaGFuZ2UiLCJnZXRTZWxlY3RlZFJvd3NPblBhZ2VPcHRpb24iLCJQdXJlQ29tcG9uZW50IiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0EsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxPQUFPQyxrQkFBUCxNQUErQiwyQkFBL0I7QUFDQSxTQUFTQyxVQUFULEVBQXFCQyxTQUFyQixRQUFzQyxZQUF0QztBQUNBLFNBQVNDLElBQVQsRUFBZUMsR0FBZixRQUEwQixXQUExQjtBQUNBLFNBQVNDLE9BQVQsUUFBd0IsYUFBeEI7QUFDQSxPQUFPQyxNQUFQLE1BQW1CLG1CQUFuQjtBQUNBLFNBQVNDLG9CQUFULFFBQXFDLG1DQUFyQztBQUNBLE9BQU9DLFNBQVAsTUFBc0IsOEJBQXRCO0FBQ0EsU0FBU0MsT0FBTyxJQUFQQSxRQUFULEVBQWtCQyxhQUFhLElBQUlDLG1CQUFuQyxRQUE4RCxvQkFBOUQ7QUFDQSxTQUFTQyxTQUFULFFBQTBCLGtCQUExQjtBQUVBLE9BQU8sMkJBQVA7QUFFQSxJQUFNQyxvQkFBb0IsR0FBRyxDQUMzQjtBQUNFQyxFQUFBQSxLQUFLLEVBQUUsSUFEVDtBQUVFQyxFQUFBQSxLQUFLLEVBQUU7QUFGVCxDQUQyQixFQUszQjtBQUNFRCxFQUFBQSxLQUFLLEVBQUUsSUFEVDtBQUVFQyxFQUFBQSxLQUFLLEVBQUU7QUFGVCxDQUwyQixFQVMzQjtBQUNFRCxFQUFBQSxLQUFLLEVBQUUsSUFEVDtBQUVFQyxFQUFBQSxLQUFLLEVBQUU7QUFGVCxDQVQyQixFQWEzQjtBQUNFRCxFQUFBQSxLQUFLLEVBQUUsSUFEVDtBQUVFQyxFQUFBQSxLQUFLLEVBQUU7QUFG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OUMsS0FBSyxDQUFDNEUsYUE5QnNCLDRDQTJEeEI7QUFDcEJSLElBQUFBLFFBQVEsRUFBRSxJQURVO0FBRXBCL0IsSUFBQUEsSUFBSSxFQUFFd0MsU0FGYztBQUdwQjlCLElBQUFBLFVBQVUsRUFBRThCLFNBSFE7QUFJcEJ2QyxJQUFBQSxVQUFVLEVBQUV1QyxTQUpRO0FBS3BCN0IsSUFBQUEsaUJBQWlCLEVBQUVqQyxvQkFMQztBQU1wQndCLElBQUFBLFVBQVUsRUFBRXNDLFNBTlE7QUFPcEJwQyxJQUFBQSxTQUFTLEVBQUVvQztBQVBTLEdBM0R3QjtBQXNNaEQsU0FBT2hDLEtBQVA7QUFDRCxDQXZNRDs7QUF5TUEsZUFBZXJCLG1CQUFmIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tcGx1c3BsdXMgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IEltbXV0YWJsZVByb3BUeXBlcyBmcm9tICdyZWFjdC1pbW11dGFibGUtcHJvcHR5cGVzJztcbmltcG9ydCB7IGluamVjdEludGwsIGludGxTaGFwZSB9IGZyb20gJ3JlYWN0LWludGwnO1xuaW1wb3J0IHsgTGlzdCwgTWFwIH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7IEZsb2F0aW5nU2VsZWN0UG9ydGFsIH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtZmxvYXRpbmctc2VsZWN0JztcbmltcG9ydCBMaXN0SXRlbXMgZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtbGlzdC1pdGVtcyc7XG5pbXBvcnQgeyBzZXRQYWdlLCBzZXRSb3dzT25QYWdlIGFzIHNldFJvd3NPblBhZ2VBY3Rpb24gfSBmcm9tICcuL2RhdGFncmlkLmFjdGlvbnMnO1xuaW1wb3J0IHsgZ3JpZFNoYXBlIH0gZnJvbSAnLi9kYXRhZ3JpZC5wcm9wcyc7XG5cbmltcG9ydCAnLi9kYXRhZ3JpZC52YXJpYWJsZXMuc2Nzcyc7XG5cbmNvbnN0IFJPV1NfT05fUEFHRV9PUFRJT05TID0gW1xuICB7XG4gICAgbGFiZWw6ICcxMCcsXG4gICAgdmFsdWU6IDEwLFxuICB9LFxuICB7XG4gICAgbGFiZWw6ICcyNScsXG4gICAgdmFsdWU6IDI1LFxuICB9LFxuICB7XG4gICAgbGFiZWw6ICc1MCcsXG4gICAgdmFsdWU6IDUwLFxuICB9LFxuICB7XG4gICAgbGFiZWw6ICc3NScsXG4gICAgdmFsdWU6IDc1LFxuICB9LFxuICB7XG4gICAgbGFiZWw6ICcxMDAnLFxuICAgIHZhbHVlOiAxMDAsXG4gIH0sXG5dO1xuXG5jb25zdCBQYWdpbmF0aW9uID0gc3R5bGVkLmRpdmBcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZGlzcGxheTogZmxleDtcbiAgcGFkZGluZzogMXJlbTtcbiAgaGVpZ2h0OiBhdXRvO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIHdpZHRoOiAxMDAlO1xuICBmbGV4OiAwIDAgYXV0bztcbmA7XG5cbmNvbnN0IFJvd3NPblBhZ2UgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuYDtcblxuY29uc3QgUm93c09uUGFnZUxhYmVsID0gc3R5bGVkLnNwYW5gXG4gIHBhZGRpbmc6IDAgMXJlbTtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbmA7XG5cbmNvbnN0IFJvd3NPblBhZ2VTZWxlY3QgPSBzdHlsZWQoRmxvYXRpbmdTZWxlY3RQb3J0YWwpYFxuICBtaW4td2lkdGg6IDcwcHg7XG5gO1xuXG5jb25zdCBwYWdpbmF0aW9uQ29tcG9uZW50ID0gKFdyYXBwZWRDb21wb25lbnQpID0+IHtcbiAgY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlLCBvd25Qcm9wcykgPT4ge1xuICAgIGNvbnN0IEdSSUQgPSBvd25Qcm9wcy5ncmlkO1xuICAgIHJldHVybiB7XG4gICAgICBmaWx0ZXJEYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2ZpbHRlckRhdGEnXSwgTWFwKCkpLFxuICAgICAgaXNDcmVhdGluZzogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2lzQ3JlYXRpbmcnXSwgZmFsc2UpLFxuICAgICAgaXNFZGl0aW5nOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnaXNFZGl0aW5nJ10sIGZhbHNlKSxcbiAgICAgIHBhZ2U6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ3BhZ2UnXSksXG4gICAgICByb3dzT25QYWdlOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdyb3dzT25QYWdlJ10pLFxuICAgICAgc29ydENvbHVtbjogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oXG4gICAgICAgIFtHUklELmlkLCAnY29uZmlnJywgJ3NvcnRpbmdEYXRhJywgJ3NvcnRDb2x1bW4nXSxcbiAgICAgICAgR1JJRC5kZWZhdWx0U29ydENvbHVtbixcbiAgICAgICksXG4gICAgICBzb3J0T3JkZXI6IHN0YXRlLmRhdGFncmlkLmdldEluKFxuICAgICAgICBbR1JJRC5pZCwgJ2NvbmZpZycsICdzb3J0aW5nRGF0YScsICdzb3J0T3JkZXInXSxcbiAgICAgICAgR1JJRC5kZWZhdWx0U29ydE9yZGVyLFxuICAgICAgKSxcbiAgICB9O1xuICB9O1xuXG4gIGNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+ICh7XG4gICAgc2V0UGFnZTogKGdyaWQsIHBhZ2UpID0+IGRpc3BhdGNoKHNldFBhZ2UoZ3JpZCwgcGFnZSkpLFxuICAgIHNldFJvd3NPblBhZ2U6IChncmlkLCByb3dzT25QYWdlKSA9PiBkaXNwYXRjaChzZXRSb3dzT25QYWdlQWN0aW9uKGdyaWQsIHJvd3NPblBhZ2UpKSxcbiAgfSk7XG5cbiAgQGluamVjdEludGxcbiAgQGNvbm5lY3QoXG4gICAgbWFwU3RhdGVUb1Byb3BzLFxuICAgIG1hcERpc3BhdGNoVG9Qcm9wcyxcbiAgKVxuICBjbGFzcyBQYWdlciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICBncmlkOiBncmlkU2hhcGUuaXNSZXF1aXJlZCxcbiAgICAgIGZpbHRlckRhdGE6IEltbXV0YWJsZVByb3BUeXBlcy5tYXAuaXNSZXF1aXJlZCxcbiAgICAgIGludGw6IGludGxTaGFwZS5pc1JlcXVpcmVkLFxuICAgICAgaXNFZGl0aW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgaXNDcmVhdGluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgIHNldFBhZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICBzZXRSb3dzT25QYWdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuICAgICAgcGFnZTogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIHBhZ2luYXRpb246IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIGdldERhdGE6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIHBhZ2VTaXplOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgIHRvdGFsU2l6ZTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICB0b3RhbExpbWl0OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgfSksXG4gICAgICByb3dzT25QYWdlOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgcm93c09uUGFnZU9wdGlvbnM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgIGxhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuZWxlbWVudCwgUHJvcFR5cGVzLnN0cmluZ10pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgdmFsdWU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5ib29sLCBQcm9wVHlwZXMubnVtYmVyLCBQcm9wVHlwZXMuc3RyaW5nXSlcbiAgICAgICAgICAgIC5pc1JlcXVpcmVkLFxuICAgICAgICB9KSxcbiAgICAgICksXG4gICAgICBzb3J0Q29sdW1uOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubnVtYmVyXSksXG4gICAgICBzb3J0T3JkZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgfTtcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICBjaGlsZHJlbjogbnVsbCxcbiAgICAgIHBhZ2U6IHVuZGVmaW5lZCxcbiAgICAgIHBhZ2luYXRpb246IHVuZGVmaW5lZCxcbiAgICAgIHJvd3NPblBhZ2U6IHVuZGVmaW5lZCxcbiAgICAgIHJvd3NPblBhZ2VPcHRpb25zOiBST1dTX09OX1BBR0VfT1BUSU9OUyxcbiAgICAgIHNvcnRDb2x1bW46IHVuZGVmaW5lZCxcbiAgICAgIHNvcnRPcmRlcjogdW5kZWZpbmVkLFxuICAgIH07XG5cbiAgICBjb21wb25lbnREaWRNb3VudCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgZ3JpZCwgcGFnaW5hdGlvbiwgcm93c09uUGFnZU9wdGlvbnMsIHJvd3NPblBhZ2UsIHNldFJvd3NPblBhZ2UsXG4gICAgICB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGlmIChwYWdpbmF0aW9uKSB7XG4gICAgICAgIGlmICghcm93c09uUGFnZSAmJiByb3dzT25QYWdlT3B0aW9ucyAmJiByb3dzT25QYWdlT3B0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgY29uc3QgcGFnZVNpemUgPSByb3dzT25QYWdlIHx8IHBhZ2luYXRpb24ucGFnZVNpemU7XG4gICAgICAgICAgY29uc3Qgc2VsZWN0ZWRSb3dzT25QYWdlID0gcm93c09uUGFnZU9wdGlvbnMuZmluZChcbiAgICAgICAgICAgIG9wdGlvbiA9PiBvcHRpb24udmFsdWUgPT09IHBhZ2VTaXplLFxuICAgICAgICAgICkgfHwgcm93c09uUGFnZU9wdGlvbnNbMF07XG4gICAgICAgICAgc2V0Um93c09uUGFnZShncmlkLCBzZWxlY3RlZFJvd3NPblBhZ2UudmFsdWUpO1xuICAgICAgICB9IGVsc2UgdGhpcy5yZXF1ZXN0RGF0YSgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUgPSAocHJldlByb3BzKSA9PiB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGZpbHRlckRhdGEsIHBhZ2luYXRpb24sIHBhZ2UsIHJvd3NPblBhZ2UsIHNvcnRDb2x1bW4sIHNvcnRPcmRlcixcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuICAgICAgaWYgKHBhZ2luYXRpb24pIHtcbiAgICAgICAgaWYgKHBhZ2UgIT09IDEgJiYgKHJvd3NPblBhZ2UgIT09IHByZXZQcm9wcy5yb3dzT25QYWdlIHx8ICFmaWx0ZXJEYXRhLmVxdWFscyhwcmV2UHJvcHMuZmlsdGVyRGF0YSkpKSB7XG4gICAgICAgICAgdGhpcy5nb3RvUGFnZSgxKTtcbiAgICAgICAgfSBlbHNlIGlmICghZmlsdGVyRGF0YS5lcXVhbHMocHJldlByb3BzLmZpbHRlckRhdGEpXG4gICAgICAgICAgICB8fCBwYWdlICE9PSBwcmV2UHJvcHMucGFnZVxuICAgICAgICAgICAgfHwgcm93c09uUGFnZSAhPT0gcHJldlByb3BzLnJvd3NPblBhZ2VcbiAgICAgICAgICAgIHx8IHNvcnRDb2x1bW4gIT09IHByZXZQcm9wcy5zb3J0Q29sdW1uXG4gICAgICAgICAgICB8fCBzb3J0T3JkZXIgIT09IHByZXZQcm9wcy5zb3J0T3JkZXIpIHtcbiAgICAgICAgICB0aGlzLnJlcXVlc3REYXRhKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZ2V0U2VsZWN0ZWRSb3dzT25QYWdlT3B0aW9uID0gKCkgPT4ge1xuICAgICAgY29uc3QgeyByb3dzT25QYWdlLCByb3dzT25QYWdlT3B0aW9ucyB9ID0gdGhpcy5wcm9wcztcbiAgICAgIHJldHVybiByb3dzT25QYWdlT3B0aW9ucy5maW5kKG9wdGlvbiA9PiBvcHRpb24udmFsdWUgPT09IHJvd3NPblBhZ2UpO1xuICAgIH07XG5cbiAgICByZXF1ZXN0RGF0YSA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgZmlsdGVyRGF0YSwgcGFnaW5hdGlvbiwgcGFnZSwgcm93c09uUGFnZSwgc29ydENvbHVtbiwgc29ydE9yZGVyLFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCBvZmZzZXQgPSAocGFnZSAtIDEpICogcm93c09uUGFnZTtcbiAgICAgIHBhZ2luYXRpb24uZ2V0RGF0YShvZmZzZXQsIHJvd3NPblBhZ2UsIGZpbHRlckRhdGEsIHNvcnRDb2x1bW4sIHNvcnRPcmRlcik7XG4gICAgfTtcblxuICAgIGdvdG9QYWdlID0gKHBhZ2UpID0+IHtcbiAgICAgIGNvbnN0IHsgZ3JpZCB9ID0gdGhpcy5wcm9wcztcbiAgICAgIHRoaXMucHJvcHMuc2V0UGFnZShncmlkLCBwYWdlKTtcbiAgICB9O1xuXG4gICAgaGFuZGxlUm93c09uUGFnZUNoYW5nZSA9IChyb3dzT25QYWdlT3B0aW9uKSA9PiB7XG4gICAgICBjb25zdCB7IGdyaWQsIHBhZ2UsIHBhZ2luYXRpb24gfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCByb3dzT25QYWdlID0gcm93c09uUGFnZU9wdGlvbi52YWx1ZTtcbiAgICAgIHRoaXMucHJvcHMuc2V0Um93c09uUGFnZShncmlkLCByb3dzT25QYWdlKTtcbiAgICAgIGlmIChwYWdlID4gTWF0aC5jZWlsKHBhZ2luYXRpb24udG90YWxTaXplIC8gcm93c09uUGFnZSkpIHtcbiAgICAgICAgdGhpcy5nb3RvUGFnZSgxKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmVuZGVyVG90YWxDb3VudCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHsgaW50bCwgcGFnaW5hdGlvbiB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IHsgdG90YWxMaW1pdCwgdG90YWxTaXplIH0gPSBwYWdpbmF0aW9uO1xuICAgICAgbGV0IGxhYmVsO1xuICAgICAgc3dpdGNoICh0b3RhbFNpemUpIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIGxhYmVsID0gaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLlBhZ2luYXRpb24uVG90YWxTaW5ndWxhcicgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgdG90YWxMaW1pdDpcbiAgICAgICAgICBsYWJlbCA9IGludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5QYWdpbmF0aW9uLlRvdGFsT3ZlcicgfSwgeyBuOiB0b3RhbFNpemUgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbGFiZWwgPSBpbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuUGFnaW5hdGlvbi5Ub3RhbFBsdXJhbCcgfSwgeyBuOiB0b3RhbFNpemUgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICByZXR1cm4gPHNwYW4+e2xhYmVsfTwvc3Bhbj47XG4gICAgfTtcblxuICAgIHJlbmRlciA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgY2hpbGRyZW4sXG4gICAgICAgIGdyaWQsXG4gICAgICAgIGludGwsXG4gICAgICAgIGlzQ3JlYXRpbmcsXG4gICAgICAgIGlzRWRpdGluZyxcbiAgICAgICAgcGFnZSxcbiAgICAgICAgcGFnaW5hdGlvbixcbiAgICAgICAgcm93c09uUGFnZSxcbiAgICAgICAgcm93c09uUGFnZU9wdGlvbnMsXG4gICAgICB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IHBhZ2VDb3VudCA9IHBhZ2luYXRpb24gJiYgcGFnaW5hdGlvbi50b3RhbFNpemUgPiAwICYmIHJvd3NPblBhZ2UgPiAwXG4gICAgICAgID8gTWF0aC5jZWlsKHBhZ2luYXRpb24udG90YWxTaXplIC8gcm93c09uUGFnZSlcbiAgICAgICAgOiAxO1xuICAgICAgY29uc3QgcGFnZXMgPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IHBhZ2VDb3VudDsgaSsrKSB7XG4gICAgICAgIHBhZ2VzLnB1c2goaSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcGFnaW5hdGlvbiA/IChcbiAgICAgICAgPFdyYXBwZWRDb21wb25lbnQgey4uLnRoaXMucHJvcHN9IGdyaWQ9e3sgLi4uZ3JpZCwgcGFnaW5hdGlvbjogdHJ1ZSB9fT5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgPFBhZ2luYXRpb24gY2xhc3NOYW1lPVwiZm9vdGVyXCI+XG4gICAgICAgICAgICB7dGhpcy5yZW5kZXJUb3RhbENvdW50KCl9XG4gICAgICAgICAgICA8TGlzdEl0ZW1zXG4gICAgICAgICAgICAgIGRpc2FibGVkPXtpc0NyZWF0aW5nIHx8IGlzRWRpdGluZ31cbiAgICAgICAgICAgICAgZ29Ub0l0ZW09e3RoaXMuZ290b1BhZ2V9XG4gICAgICAgICAgICAgIGlkPVwibGlzdFBhZ2luYXRpb25JdGVtc1wiXG4gICAgICAgICAgICAgIGl0ZW1JZD17cGFnZX1cbiAgICAgICAgICAgICAgaXRlbUlkcz17TGlzdChwYWdlcyl9XG4gICAgICAgICAgICAgIHR5cGVhYmxlXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPFJvd3NPblBhZ2U+XG4gICAgICAgICAgICAgIDxSb3dzT25QYWdlTGFiZWw+XG4gICAgICAgICAgICAgICAge2ludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5QYWdpbmF0aW9uLlJvd3NPblBhZ2UnIH0pfVxuICAgICAgICAgICAgICA8L1Jvd3NPblBhZ2VMYWJlbD5cbiAgICAgICAgICAgICAgPFJvd3NPblBhZ2VTZWxlY3RcbiAgICAgICAgICAgICAgICBpc0NyZWFyYWJsZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgaXNEaXNhYmxlZD17aXNDcmVhdGluZyB8fCBpc0VkaXRpbmd9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlUm93c09uUGFnZUNoYW5nZX1cbiAgICAgICAgICAgICAgICBvcHRpb25zPXtyb3dzT25QYWdlT3B0aW9uc31cbiAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRTZWxlY3RlZFJvd3NPblBhZ2VPcHRpb24oKX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvUm93c09uUGFnZT5cbiAgICAgICAgICA8L1BhZ2luYXRpb24+XG4gICAgICAgIDwvV3JhcHBlZENvbXBvbmVudD5cbiAgICAgICkgOiAoXG4gICAgICAgIDxXcmFwcGVkQ29tcG9uZW50IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgKTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIFBhZ2VyO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcGFnaW5hdGlvbkNvbXBvbmVudDtcbiJdfQ==