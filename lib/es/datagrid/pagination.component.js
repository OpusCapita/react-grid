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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9wYWdpbmF0aW9uLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJJbW11dGFibGVQcm9wVHlwZXMiLCJpbmplY3RJbnRsIiwiaW50bFNoYXBlIiwiTGlzdCIsIk1hcCIsImNvbm5lY3QiLCJzdHlsZWQiLCJGbG9hdGluZ1NlbGVjdFBvcnRhbCIsIkxpc3RJdGVtcyIsInNldFBhZ2UiLCJzZXRSb3dzT25QYWdlIiwic2V0Um93c09uUGFnZUFjdGlvbiIsImdyaWRTaGFwZSIsIlJPV1NfT05fUEFHRV9PUFRJT05TIiwibGFiZWwiLCJ2YWx1ZSIsIlBhZ2luYXRpb24iLCJkaXYiLCJSb3dzT25QYWdlIiwiUm93c09uUGFnZUxhYmVsIiwic3BhbiIsIlJvd3NPblBhZ2VTZWxlY3QiLCJwYWdpbmF0aW9uQ29tcG9uZW50IiwiV3JhcHBlZENvbXBvbmVudCIsIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwib3duUHJvcHMiLCJHUklEIiwiZ3JpZCIsImZpbHRlckRhdGEiLCJkYXRhZ3JpZCIsImdldEluIiwiaWQiLCJpc0NyZWF0aW5nIiwiaXNFZGl0aW5nIiwicGFnZSIsInJvd3NPblBhZ2UiLCJzb3J0Q29sdW1uIiwiZGVmYXVsdFNvcnRDb2x1bW4iLCJzb3J0T3JkZXIiLCJkZWZhdWx0U29ydE9yZGVyIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwiZGlzcGF0Y2giLCJQYWdlciIsInByb3BzIiwicGFnaW5hdGlvbiIsInJvd3NPblBhZ2VPcHRpb25zIiwibGVuZ3RoIiwicGFnZVNpemUiLCJzZWxlY3RlZFJvd3NPblBhZ2UiLCJmaW5kIiwib3B0aW9uIiwicmVxdWVzdERhdGEiLCJwcmV2UHJvcHMiLCJlcXVhbHMiLCJnb3RvUGFnZSIsIm9mZnNldCIsImdldERhdGEiLCJyb3dzT25QYWdlT3B0aW9uIiwiTWF0aCIsImNlaWwiLCJ0b3RhbFNpemUiLCJpbnRsIiwidG90YWxMaW1pdCIsImZvcm1hdE1lc3NhZ2UiLCJuIiwiY2hpbGRyZW4iLCJwYWdlQ291bnQiLCJwYWdlcyIsImkiLCJwdXNoIiwicmVuZGVyVG90YWxDb3VudCIsImhhbmRsZVJvd3NPblBhZ2VDaGFuZ2UiLCJnZXRTZWxlY3RlZFJvd3NPblBhZ2VPcHRpb24iLCJQdXJlQ29tcG9uZW50IiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0EsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxPQUFPQyxrQkFBUCxNQUErQiwyQkFBL0I7QUFDQSxTQUFTQyxVQUFULEVBQXFCQyxTQUFyQixRQUFzQyxZQUF0QztBQUNBLFNBQVNDLElBQVQsRUFBZUMsR0FBZixRQUEwQixXQUExQjtBQUNBLFNBQVNDLE9BQVQsUUFBd0IsYUFBeEI7QUFDQSxPQUFPQyxNQUFQLE1BQW1CLG1CQUFuQjtBQUNBLFNBQVNDLG9CQUFULFFBQXFDLG1DQUFyQztBQUNBLE9BQU9DLFNBQVAsTUFBc0IsOEJBQXRCO0FBQ0EsU0FBU0MsT0FBTyxJQUFQQSxRQUFULEVBQWtCQyxhQUFhLElBQUlDLG1CQUFuQyxRQUE4RCxvQkFBOUQ7QUFDQSxTQUFTQyxTQUFULFFBQTBCLGtCQUExQjtBQUVBLE9BQU8sMkJBQVA7QUFFQSxJQUFNQyxvQkFBb0IsR0FBRyxDQUMzQjtBQUNFQyxFQUFBQSxLQUFLLEVBQUUsSUFEVDtBQUVFQyxFQUFBQSxLQUFLLEVBQUU7QUFGVCxDQUQyQixFQUszQjtBQUNFRCxFQUFBQSxLQUFLLEVBQUUsSUFEVDtBQUVFQyxFQUFBQSxLQUFLLEVBQUU7QUFGVCxDQUwyQixFQVMzQjtBQUNFRCxFQUFBQSxLQUFLLEVBQUUsSUFEVDtBQUVFQyxFQUFBQSxLQUFLLEVBQUU7QUFGVCxDQVQyQixFQWEzQjtBQUNFRCxFQUFBQSxLQUFLLEVBQUUsSUFEVDtBQUVFQyxFQUFBQSxLQUFLLEVBQUU7QUFG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LEtBQUssQ0FBQzRFLGFBOUJzQiw0Q0EyRHhCO0FBQ3BCUixJQUFBQSxRQUFRLEVBQUUsSUFEVTtBQUVwQi9CLElBQUFBLElBQUksRUFBRXdDLFNBRmM7QUFHcEI5QixJQUFBQSxVQUFVLEVBQUU4QixTQUhRO0FBSXBCdkMsSUFBQUEsVUFBVSxFQUFFdUMsU0FKUTtBQUtwQjdCLElBQUFBLGlCQUFpQixFQUFFakMsb0JBTEM7QUFNcEJ3QixJQUFBQSxVQUFVLEVBQUVzQyxTQU5RO0FBT3BCcEMsSUFBQUEsU0FBUyxFQUFFb0M7QUFQUyxHQTNEd0I7QUF1TWhELFNBQU9oQyxLQUFQO0FBQ0QsQ0F4TUQ7O0FBME1BLGVBQWVyQixtQkFBZiIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLXBsdXNwbHVzICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgeyBpbmplY3RJbnRsLCBpbnRsU2hhcGUgfSBmcm9tICdyZWFjdC1pbnRsJztcbmltcG9ydCB7IExpc3QsIE1hcCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgeyBGbG9hdGluZ1NlbGVjdFBvcnRhbCB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWZsb2F0aW5nLXNlbGVjdCc7XG5pbXBvcnQgTGlzdEl0ZW1zIGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWxpc3QtaXRlbXMnO1xuaW1wb3J0IHsgc2V0UGFnZSwgc2V0Um93c09uUGFnZSBhcyBzZXRSb3dzT25QYWdlQWN0aW9uIH0gZnJvbSAnLi9kYXRhZ3JpZC5hY3Rpb25zJztcbmltcG9ydCB7IGdyaWRTaGFwZSB9IGZyb20gJy4vZGF0YWdyaWQucHJvcHMnO1xuXG5pbXBvcnQgJy4vZGF0YWdyaWQudmFyaWFibGVzLnNjc3MnO1xuXG5jb25zdCBST1dTX09OX1BBR0VfT1BUSU9OUyA9IFtcbiAge1xuICAgIGxhYmVsOiAnMTAnLFxuICAgIHZhbHVlOiAxMCxcbiAgfSxcbiAge1xuICAgIGxhYmVsOiAnMjUnLFxuICAgIHZhbHVlOiAyNSxcbiAgfSxcbiAge1xuICAgIGxhYmVsOiAnNTAnLFxuICAgIHZhbHVlOiA1MCxcbiAgfSxcbiAge1xuICAgIGxhYmVsOiAnNzUnLFxuICAgIHZhbHVlOiA3NSxcbiAgfSxcbiAge1xuICAgIGxhYmVsOiAnMTAwJyxcbiAgICB2YWx1ZTogMTAwLFxuICB9LFxuXTtcblxuY29uc3QgUGFnaW5hdGlvbiA9IHN0eWxlZC5kaXZgXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHBhZGRpbmc6IDFyZW07XG4gIGhlaWdodDogYXV0bztcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICB3aWR0aDogMTAwJTtcbiAgZmxleDogMCAwIGF1dG87XG5gO1xuXG5jb25zdCBSb3dzT25QYWdlID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbmA7XG5cbmNvbnN0IFJvd3NPblBhZ2VMYWJlbCA9IHN0eWxlZC5zcGFuYFxuICBwYWRkaW5nOiAwIDFyZW07XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG5gO1xuXG5jb25zdCBSb3dzT25QYWdlU2VsZWN0ID0gc3R5bGVkKEZsb2F0aW5nU2VsZWN0UG9ydGFsKWBcbiAgbWluLXdpZHRoOiA3MHB4O1xuYDtcblxuY29uc3QgcGFnaW5hdGlvbkNvbXBvbmVudCA9IChXcmFwcGVkQ29tcG9uZW50KSA9PiB7XG4gIGNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSwgb3duUHJvcHMpID0+IHtcbiAgICBjb25zdCBHUklEID0gb3duUHJvcHMuZ3JpZDtcbiAgICByZXR1cm4ge1xuICAgICAgZmlsdGVyRGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdmaWx0ZXJEYXRhJ10sIE1hcCgpKSxcbiAgICAgIGlzQ3JlYXRpbmc6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdpc0NyZWF0aW5nJ10sIGZhbHNlKSxcbiAgICAgIGlzRWRpdGluZzogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2lzRWRpdGluZyddLCBmYWxzZSksXG4gICAgICBwYWdlOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdwYWdlJ10pLFxuICAgICAgcm93c09uUGFnZTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAncm93c09uUGFnZSddKSxcbiAgICAgIHNvcnRDb2x1bW46IHN0YXRlLmRhdGFncmlkLmdldEluKFxuICAgICAgICBbR1JJRC5pZCwgJ2NvbmZpZycsICdzb3J0aW5nRGF0YScsICdzb3J0Q29sdW1uJ10sXG4gICAgICAgIEdSSUQuZGVmYXVsdFNvcnRDb2x1bW4sXG4gICAgICApLFxuICAgICAgc29ydE9yZGVyOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihcbiAgICAgICAgW0dSSUQuaWQsICdjb25maWcnLCAnc29ydGluZ0RhdGEnLCAnc29ydE9yZGVyJ10sXG4gICAgICAgIEdSSUQuZGVmYXVsdFNvcnRPcmRlcixcbiAgICAgICksXG4gICAgfTtcbiAgfTtcblxuICBjb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiAoe1xuICAgIHNldFBhZ2U6IChncmlkLCBwYWdlKSA9PiBkaXNwYXRjaChzZXRQYWdlKGdyaWQsIHBhZ2UpKSxcbiAgICBzZXRSb3dzT25QYWdlOiAoZ3JpZCwgcm93c09uUGFnZSkgPT4gZGlzcGF0Y2goc2V0Um93c09uUGFnZUFjdGlvbihncmlkLCByb3dzT25QYWdlKSksXG4gIH0pO1xuXG4gIEBpbmplY3RJbnRsXG4gIEBjb25uZWN0KFxuICAgIG1hcFN0YXRlVG9Qcm9wcyxcbiAgICBtYXBEaXNwYXRjaFRvUHJvcHMsXG4gIClcbiAgY2xhc3MgUGFnZXIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgZ3JpZDogZ3JpZFNoYXBlLmlzUmVxdWlyZWQsXG4gICAgICBmaWx0ZXJEYXRhOiBJbW11dGFibGVQcm9wVHlwZXMubWFwLmlzUmVxdWlyZWQsXG4gICAgICBpbnRsOiBpbnRsU2hhcGUuaXNSZXF1aXJlZCxcbiAgICAgIGlzRWRpdGluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgIGlzQ3JlYXRpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgICBzZXRQYWdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgc2V0Um93c09uUGFnZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcbiAgICAgIHBhZ2U6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICBwYWdpbmF0aW9uOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICBnZXREYXRhOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICBwYWdlU2l6ZTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICB0b3RhbFNpemU6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgdG90YWxMaW1pdDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIH0pLFxuICAgICAgcm93c09uUGFnZTogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIHJvd3NPblBhZ2VPcHRpb25zOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICBsYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmVsZW1lbnQsIFByb3BUeXBlcy5zdHJpbmddKS5pc1JlcXVpcmVkLFxuICAgICAgICAgIHZhbHVlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuYm9vbCwgUHJvcFR5cGVzLm51bWJlciwgUHJvcFR5cGVzLnN0cmluZ10pXG4gICAgICAgICAgICAuaXNSZXF1aXJlZCxcbiAgICAgICAgfSksXG4gICAgICApLFxuICAgICAgc29ydENvbHVtbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm51bWJlcl0pLFxuICAgICAgc29ydE9yZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIH07XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgY2hpbGRyZW46IG51bGwsXG4gICAgICBwYWdlOiB1bmRlZmluZWQsXG4gICAgICBwYWdpbmF0aW9uOiB1bmRlZmluZWQsXG4gICAgICByb3dzT25QYWdlOiB1bmRlZmluZWQsXG4gICAgICByb3dzT25QYWdlT3B0aW9uczogUk9XU19PTl9QQUdFX09QVElPTlMsXG4gICAgICBzb3J0Q29sdW1uOiB1bmRlZmluZWQsXG4gICAgICBzb3J0T3JkZXI6IHVuZGVmaW5lZCxcbiAgICB9O1xuXG4gICAgY29tcG9uZW50RGlkTW91bnQgPSAoKSA9PiB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGdyaWQsIHBhZ2luYXRpb24sIHJvd3NPblBhZ2VPcHRpb25zLCByb3dzT25QYWdlLCBzZXRSb3dzT25QYWdlLFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBpZiAocGFnaW5hdGlvbikge1xuICAgICAgICBpZiAoIXJvd3NPblBhZ2UgJiYgcm93c09uUGFnZU9wdGlvbnMgJiYgcm93c09uUGFnZU9wdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGNvbnN0IHBhZ2VTaXplID0gcm93c09uUGFnZSB8fCBwYWdpbmF0aW9uLnBhZ2VTaXplO1xuICAgICAgICAgIGNvbnN0IHNlbGVjdGVkUm93c09uUGFnZSA9IHJvd3NPblBhZ2VPcHRpb25zLmZpbmQoXG4gICAgICAgICAgICBvcHRpb24gPT4gb3B0aW9uLnZhbHVlID09PSBwYWdlU2l6ZSxcbiAgICAgICAgICApIHx8IHJvd3NPblBhZ2VPcHRpb25zWzBdO1xuICAgICAgICAgIHNldFJvd3NPblBhZ2UoZ3JpZCwgc2VsZWN0ZWRSb3dzT25QYWdlLnZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHRoaXMucmVxdWVzdERhdGEoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlID0gKHByZXZQcm9wcykgPT4ge1xuICAgICAgY29uc3Qge1xuICAgICAgICBmaWx0ZXJEYXRhLCBwYWdpbmF0aW9uLCBwYWdlLCByb3dzT25QYWdlLCBzb3J0Q29sdW1uLCBzb3J0T3JkZXIsXG4gICAgICB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGlmIChwYWdpbmF0aW9uKSB7XG4gICAgICAgIGlmIChwYWdlICE9PSAxICYmIChyb3dzT25QYWdlICE9PSBwcmV2UHJvcHMucm93c09uUGFnZVxuICAgICAgICAgIHx8ICFmaWx0ZXJEYXRhLmVxdWFscyhwcmV2UHJvcHMuZmlsdGVyRGF0YSkpKSB7XG4gICAgICAgICAgdGhpcy5nb3RvUGFnZSgxKTtcbiAgICAgICAgfSBlbHNlIGlmICghZmlsdGVyRGF0YS5lcXVhbHMocHJldlByb3BzLmZpbHRlckRhdGEpXG4gICAgICAgICAgICB8fCBwYWdlICE9PSBwcmV2UHJvcHMucGFnZVxuICAgICAgICAgICAgfHwgcm93c09uUGFnZSAhPT0gcHJldlByb3BzLnJvd3NPblBhZ2VcbiAgICAgICAgICAgIHx8IHNvcnRDb2x1bW4gIT09IHByZXZQcm9wcy5zb3J0Q29sdW1uXG4gICAgICAgICAgICB8fCBzb3J0T3JkZXIgIT09IHByZXZQcm9wcy5zb3J0T3JkZXIpIHtcbiAgICAgICAgICB0aGlzLnJlcXVlc3REYXRhKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZ2V0U2VsZWN0ZWRSb3dzT25QYWdlT3B0aW9uID0gKCkgPT4ge1xuICAgICAgY29uc3QgeyByb3dzT25QYWdlLCByb3dzT25QYWdlT3B0aW9ucyB9ID0gdGhpcy5wcm9wcztcbiAgICAgIHJldHVybiByb3dzT25QYWdlT3B0aW9ucy5maW5kKG9wdGlvbiA9PiBvcHRpb24udmFsdWUgPT09IHJvd3NPblBhZ2UpO1xuICAgIH07XG5cbiAgICByZXF1ZXN0RGF0YSA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgZmlsdGVyRGF0YSwgcGFnaW5hdGlvbiwgcGFnZSwgcm93c09uUGFnZSwgc29ydENvbHVtbiwgc29ydE9yZGVyLFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCBvZmZzZXQgPSAocGFnZSAtIDEpICogcm93c09uUGFnZTtcbiAgICAgIHBhZ2luYXRpb24uZ2V0RGF0YShvZmZzZXQsIHJvd3NPblBhZ2UsIGZpbHRlckRhdGEsIHNvcnRDb2x1bW4sIHNvcnRPcmRlcik7XG4gICAgfTtcblxuICAgIGdvdG9QYWdlID0gKHBhZ2UpID0+IHtcbiAgICAgIGNvbnN0IHsgZ3JpZCB9ID0gdGhpcy5wcm9wcztcbiAgICAgIHRoaXMucHJvcHMuc2V0UGFnZShncmlkLCBwYWdlKTtcbiAgICB9O1xuXG4gICAgaGFuZGxlUm93c09uUGFnZUNoYW5nZSA9IChyb3dzT25QYWdlT3B0aW9uKSA9PiB7XG4gICAgICBjb25zdCB7IGdyaWQsIHBhZ2UsIHBhZ2luYXRpb24gfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCByb3dzT25QYWdlID0gcm93c09uUGFnZU9wdGlvbi52YWx1ZTtcbiAgICAgIHRoaXMucHJvcHMuc2V0Um93c09uUGFnZShncmlkLCByb3dzT25QYWdlKTtcbiAgICAgIGlmIChwYWdlID4gTWF0aC5jZWlsKHBhZ2luYXRpb24udG90YWxTaXplIC8gcm93c09uUGFnZSkpIHtcbiAgICAgICAgdGhpcy5nb3RvUGFnZSgxKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmVuZGVyVG90YWxDb3VudCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHsgaW50bCwgcGFnaW5hdGlvbiB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IHsgdG90YWxMaW1pdCwgdG90YWxTaXplIH0gPSBwYWdpbmF0aW9uO1xuICAgICAgbGV0IGxhYmVsO1xuICAgICAgc3dpdGNoICh0b3RhbFNpemUpIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIGxhYmVsID0gaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLlBhZ2luYXRpb24uVG90YWxTaW5ndWxhcicgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgdG90YWxMaW1pdDpcbiAgICAgICAgICBsYWJlbCA9IGludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5QYWdpbmF0aW9uLlRvdGFsT3ZlcicgfSwgeyBuOiB0b3RhbFNpemUgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbGFiZWwgPSBpbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuUGFnaW5hdGlvbi5Ub3RhbFBsdXJhbCcgfSwgeyBuOiB0b3RhbFNpemUgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICByZXR1cm4gPHNwYW4+e2xhYmVsfTwvc3Bhbj47XG4gICAgfTtcblxuICAgIHJlbmRlciA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgY2hpbGRyZW4sXG4gICAgICAgIGdyaWQsXG4gICAgICAgIGludGwsXG4gICAgICAgIGlzQ3JlYXRpbmcsXG4gICAgICAgIGlzRWRpdGluZyxcbiAgICAgICAgcGFnZSxcbiAgICAgICAgcGFnaW5hdGlvbixcbiAgICAgICAgcm93c09uUGFnZSxcbiAgICAgICAgcm93c09uUGFnZU9wdGlvbnMsXG4gICAgICB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IHBhZ2VDb3VudCA9IHBhZ2luYXRpb24gJiYgcGFnaW5hdGlvbi50b3RhbFNpemUgPiAwICYmIHJvd3NPblBhZ2UgPiAwXG4gICAgICAgID8gTWF0aC5jZWlsKHBhZ2luYXRpb24udG90YWxTaXplIC8gcm93c09uUGFnZSlcbiAgICAgICAgOiAxO1xuICAgICAgY29uc3QgcGFnZXMgPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IHBhZ2VDb3VudDsgaSsrKSB7XG4gICAgICAgIHBhZ2VzLnB1c2goaSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcGFnaW5hdGlvbiA/IChcbiAgICAgICAgPFdyYXBwZWRDb21wb25lbnQgey4uLnRoaXMucHJvcHN9IGdyaWQ9e3sgLi4uZ3JpZCwgcGFnaW5hdGlvbjogdHJ1ZSB9fT5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgPFBhZ2luYXRpb24gY2xhc3NOYW1lPVwiZm9vdGVyXCI+XG4gICAgICAgICAgICB7dGhpcy5yZW5kZXJUb3RhbENvdW50KCl9XG4gICAgICAgICAgICA8TGlzdEl0ZW1zXG4gICAgICAgICAgICAgIGRpc2FibGVkPXtpc0NyZWF0aW5nIHx8IGlzRWRpdGluZ31cbiAgICAgICAgICAgICAgZ29Ub0l0ZW09e3RoaXMuZ290b1BhZ2V9XG4gICAgICAgICAgICAgIGlkPVwibGlzdFBhZ2luYXRpb25JdGVtc1wiXG4gICAgICAgICAgICAgIGl0ZW1JZD17cGFnZX1cbiAgICAgICAgICAgICAgaXRlbUlkcz17TGlzdChwYWdlcyl9XG4gICAgICAgICAgICAgIHR5cGVhYmxlXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPFJvd3NPblBhZ2U+XG4gICAgICAgICAgICAgIDxSb3dzT25QYWdlTGFiZWw+XG4gICAgICAgICAgICAgICAge2ludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5QYWdpbmF0aW9uLlJvd3NPblBhZ2UnIH0pfVxuICAgICAgICAgICAgICA8L1Jvd3NPblBhZ2VMYWJlbD5cbiAgICAgICAgICAgICAgPFJvd3NPblBhZ2VTZWxlY3RcbiAgICAgICAgICAgICAgICBpc0NyZWFyYWJsZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgaXNEaXNhYmxlZD17aXNDcmVhdGluZyB8fCBpc0VkaXRpbmd9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlUm93c09uUGFnZUNoYW5nZX1cbiAgICAgICAgICAgICAgICBvcHRpb25zPXtyb3dzT25QYWdlT3B0aW9uc31cbiAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRTZWxlY3RlZFJvd3NPblBhZ2VPcHRpb24oKX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvUm93c09uUGFnZT5cbiAgICAgICAgICA8L1BhZ2luYXRpb24+XG4gICAgICAgIDwvV3JhcHBlZENvbXBvbmVudD5cbiAgICAgICkgOiAoXG4gICAgICAgIDxXcmFwcGVkQ29tcG9uZW50IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgKTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIFBhZ2VyO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcGFnaW5hdGlvbkNvbXBvbmVudDtcbiJdfQ==