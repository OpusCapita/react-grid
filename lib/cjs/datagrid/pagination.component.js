'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteralLoose(['\n  align-items: center;\n  display: flex;\n  padding: 1rem;\n  height: auto;\n  justify-content: space-between;\n  width: 100%;\n  flex: 0 0 auto;\n'], ['\n  align-items: center;\n  display: flex;\n  padding: 1rem;\n  height: auto;\n  justify-content: space-between;\n  width: 100%;\n  flex: 0 0 auto;\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n  display: flex;\n  align-items: center;\n'], ['\n  display: flex;\n  align-items: center;\n']),
    _templateObject3 = _taggedTemplateLiteralLoose(['\n  padding: 0 1rem;\n'], ['\n  padding: 0 1rem;\n']),
    _templateObject4 = _taggedTemplateLiteralLoose(['\n  min-width: 60px;\n'], ['\n  min-width: 60px;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _reactIntl = require('react-intl');

var _immutable = require('immutable');

var _reactRedux = require('react-redux');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _reactFloatingSelect = require('@opuscapita/react-floating-select');

var _reactListItems = require('@opuscapita/react-list-items');

var _reactListItems2 = _interopRequireDefault(_reactListItems);

var _datagrid = require('./datagrid.actions');

var _datagrid2 = require('./datagrid.props');

require('./datagrid.variables.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; } /* eslint-disable no-plusplus */


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

var Pagination = _styledComponents2.default.div(_templateObject);

var RowsOnPage = _styledComponents2.default.div(_templateObject2);

var RowsOnPageLabel = _styledComponents2.default.span(_templateObject3);

var RowsOnPageSelect = (0, _styledComponents2.default)(_reactFloatingSelect.FloatingSelectPortal)(_templateObject4);

var paginationComponent = function paginationComponent(WrappedComponent) {
  var _dec, _class, _class2, _temp, _initialiseProps;

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

  var Pager = (_dec = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _reactIntl.injectIntl)(_class = _dec(_class = (_temp = _class2 = function (_React$PureComponent) {
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
  }(_react2.default.PureComponent), _class2.defaultProps = {
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
      return _react2.default.createElement(
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
      return pagination ? _react2.default.createElement(
        WrappedComponent,
        _extends({}, _this2.props, { grid: _extends({}, grid, { pagination: true }) }),
        children,
        _react2.default.createElement(
          Pagination,
          { className: 'footer' },
          _this2.renderTotalCount(),
          _react2.default.createElement(_reactListItems2.default, {
            disabled: isCreating || isEditing,
            goToItem: _this2.gotoPage,
            id: 'listPaginationItems',
            itemId: page,
            itemIds: (0, _immutable.List)(pages),
            typeable: true
          }),
          _react2.default.createElement(
            RowsOnPage,
            null,
            _react2.default.createElement(
              RowsOnPageLabel,
              null,
              intl.formatMessage({ id: 'Grid.Pagination.RowsOnPage' })
            ),
            _react2.default.createElement(RowsOnPageSelect, {
              isCrearable: false,
              isDisabled: isCreating || isEditing,
              onChange: _this2.handleRowsOnPageChange,
              options: rowsOnPageOptions,
              value: _this2.getSelectedRowsOnPageOption()
            })
          )
        )
      ) : _react2.default.createElement(WrappedComponent, _this2.props);
    };
  }, _temp)) || _class) || _class);


  return Pager;
};

exports.default = paginationComponent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9wYWdpbmF0aW9uLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUk9XU19PTl9QQUdFX09QVElPTlMiLCJsYWJlbCIsInZhbHVlIiwiUGFnaW5hdGlvbiIsInN0eWxlZCIsImRpdiIsIlJvd3NPblBhZ2UiLCJSb3dzT25QYWdlTGFiZWwiLCJzcGFuIiwiUm93c09uUGFnZVNlbGVjdCIsIkZsb2F0aW5nU2VsZWN0UG9ydGFsIiwicGFnaW5hdGlvbkNvbXBvbmVudCIsIldyYXBwZWRDb21wb25lbnQiLCJtYXBTdGF0ZVRvUHJvcHMiLCJzdGF0ZSIsIm93blByb3BzIiwiR1JJRCIsImdyaWQiLCJmaWx0ZXJEYXRhIiwiZGF0YWdyaWQiLCJnZXRJbiIsImlkIiwiaXNDcmVhdGluZyIsImlzRWRpdGluZyIsInBhZ2UiLCJyb3dzT25QYWdlIiwic29ydENvbHVtbiIsImRlZmF1bHRTb3J0Q29sdW1uIiwic29ydE9yZGVyIiwiZGVmYXVsdFNvcnRPcmRlciIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsInNldFBhZ2UiLCJkaXNwYXRjaCIsInNldFJvd3NPblBhZ2UiLCJQYWdlciIsImluamVjdEludGwiLCJwcm9wcyIsInBhZ2luYXRpb24iLCJyb3dzT25QYWdlT3B0aW9ucyIsImxlbmd0aCIsImRlZmF1bHRSb3dzT25QYWdlIiwiZmluZCIsIm9wdGlvbiIsInBhZ2VTaXplIiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIiwiY2hpbGRyZW4iLCJ1bmRlZmluZWQiLCJjb21wb25lbnREaWRVcGRhdGUiLCJwcmV2UHJvcHMiLCJlcXVhbHMiLCJnb3RvUGFnZSIsInJlcXVlc3REYXRhIiwiZ2V0U2VsZWN0ZWRSb3dzT25QYWdlT3B0aW9uIiwib2Zmc2V0IiwiZ2V0RGF0YSIsImhhbmRsZVJvd3NPblBhZ2VDaGFuZ2UiLCJyb3dzT25QYWdlT3B0aW9uIiwiTWF0aCIsImNlaWwiLCJ0b3RhbFNpemUiLCJyZW5kZXJUb3RhbENvdW50IiwiaW50bCIsInRvdGFsTGltaXQiLCJmb3JtYXRNZXNzYWdlIiwibiIsInJlbmRlciIsInBhZ2VDb3VudCIsInBhZ2VzIiwiaSIsInB1c2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOztBQUVBOzs7Ozs7Ozs7OzBGQWJBOzs7QUFlQSxJQUFNQSx1QkFBdUIsQ0FDM0I7QUFDRUMsU0FBTyxJQURUO0FBRUVDLFNBQU87QUFGVCxDQUQyQixFQUszQjtBQUNFRCxTQUFPLElBRFQ7QUFFRUMsU0FBTztBQUZULENBTDJCLEVBUzNCO0FBQ0VELFNBQU8sSUFEVDtBQUVFQyxTQUFPO0FBRlQsQ0FUMkIsRUFhM0I7QUFDRUQsU0FBTyxJQURUO0FBRUVDLFNBQU87QUFGVCxDQWIyQixFQWlCM0I7QUFDRUQsU0FBTyxLQURUO0FBRUVDLFNBQU87QUFGVCxDQWpCMkIsQ0FBN0I7O0FBdUJBLElBQU1DLGFBQWFDLDJCQUFPQyxHQUFwQixpQkFBTjs7QUFVQSxJQUFNQyxhQUFhRiwyQkFBT0MsR0FBcEIsa0JBQU47O0FBS0EsSUFBTUUsa0JBQWtCSCwyQkFBT0ksSUFBekIsa0JBQU47O0FBSUEsSUFBTUMsbUJBQW1CLGdDQUFPQyx5Q0FBUCxDQUFuQixrQkFBTjs7QUFJQSxJQUFNQyxzQkFBc0IsU0FBdEJBLG1CQUFzQixDQUFDQyxnQkFBRCxFQUFzQjtBQUFBOztBQUNoRCxNQUFNQyxrQkFBa0IsU0FBbEJBLGVBQWtCLENBQUNDLEtBQUQsRUFBUUMsUUFBUixFQUFxQjtBQUMzQyxRQUFNQyxPQUFPRCxTQUFTRSxJQUF0QjtBQUNBLFdBQU87QUFDTEMsa0JBQVlKLE1BQU1LLFFBQU4sQ0FBZUMsS0FBZixDQUFxQixDQUFDSixLQUFLSyxFQUFOLEVBQVUsUUFBVixFQUFvQixlQUFwQixFQUFxQyxZQUFyQyxDQUFyQixFQUF5RSxxQkFBekUsQ0FEUDtBQUVMQyxrQkFB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RUFBZDtBQUNBLFdBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxLQUFLRixTQUFyQixFQUFnQ0UsR0FBaEMsRUFBcUM7QUFDbkNELGNBQU1FLElBQU4sQ0FBV0QsQ0FBWDtBQUNEO0FBQ0QsYUFBUWpDLGFBQ047QUFBQyx3QkFBRDtBQUFBLHFCQUFzQixPQUFLRCxLQUEzQixJQUFrQyxtQkFBV25CLElBQVgsSUFBaUJvQixZQUFZLElBQTdCLEdBQWxDO0FBQ0dVLGdCQURIO0FBRUU7QUFBQyxvQkFBRDtBQUFBLFlBQVksV0FBVSxRQUF0QjtBQUNHLGlCQUFLZSxnQkFBTCxFQURIO0FBRUUsd0NBQUMsd0JBQUQ7QUFDRSxzQkFBVXhDLGNBQWNDLFNBRDFCO0FBRUUsc0JBQVUsT0FBSzZCLFFBRmpCO0FBR0UsZ0JBQUcscUJBSEw7QUFJRSxvQkFBUTVCLElBSlY7QUFLRSxxQkFBUyxxQkFBSzZDLEtBQUwsQ0FMWDtBQU1FO0FBTkYsWUFGRjtBQVVFO0FBQUMsc0JBQUQ7QUFBQTtBQUNFO0FBQUMsNkJBQUQ7QUFBQTtBQUNHTixtQkFBS0UsYUFBTCxDQUFtQixFQUFFNUMsSUFBSSw0QkFBTixFQUFuQjtBQURILGFBREY7QUFJRSwwQ0FBQyxnQkFBRDtBQUNFLDJCQUFhLEtBRGY7QUFFRSwwQkFBWUMsY0FBY0MsU0FGNUI7QUFHRSx3QkFBVSxPQUFLa0Msc0JBSGpCO0FBSUUsdUJBQVNuQixpQkFKWDtBQUtFLHFCQUFPLE9BQUtnQiwyQkFBTDtBQUxUO0FBSkY7QUFWRjtBQUZGLE9BRE0sR0EyQkosOEJBQUMsZ0JBQUQsRUFBc0IsT0FBS2xCLEtBQTNCLENBM0JKO0FBNkJELEtBcE02QztBQUFBOzs7QUF1TWhELFNBQU9GLEtBQVA7QUFDRCxDQXhNRDs7a0JBME1ldkIsbUIiLCJmaWxlIjoicGFnaW5hdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgSW1tdXRhYmxlUHJvcFR5cGVzIGZyb20gJ3JlYWN0LWltbXV0YWJsZS1wcm9wdHlwZXMnO1xuaW1wb3J0IHsgaW5qZWN0SW50bCwgaW50bFNoYXBlIH0gZnJvbSAncmVhY3QtaW50bCc7XG5pbXBvcnQgeyBMaXN0LCBNYXAgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgRmxvYXRpbmdTZWxlY3RQb3J0YWwgfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1mbG9hdGluZy1zZWxlY3QnO1xuaW1wb3J0IExpc3RJdGVtcyBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1saXN0LWl0ZW1zJztcbmltcG9ydCB7IHNldFBhZ2UsIHNldFJvd3NPblBhZ2UgfSBmcm9tICcuL2RhdGFncmlkLmFjdGlvbnMnO1xuaW1wb3J0IHsgZ3JpZFNoYXBlIH0gZnJvbSAnLi9kYXRhZ3JpZC5wcm9wcyc7XG5cbmltcG9ydCAnLi9kYXRhZ3JpZC52YXJpYWJsZXMuc2Nzcyc7XG5cbmNvbnN0IFJPV1NfT05fUEFHRV9PUFRJT05TID0gW1xuICB7XG4gICAgbGFiZWw6ICcxMCcsXG4gICAgdmFsdWU6IDEwLFxuICB9LFxuICB7XG4gICAgbGFiZWw6ICcyNScsXG4gICAgdmFsdWU6IDI1LFxuICB9LFxuICB7XG4gICAgbGFiZWw6ICc1MCcsXG4gICAgdmFsdWU6IDUwLFxuICB9LFxuICB7XG4gICAgbGFiZWw6ICc3NScsXG4gICAgdmFsdWU6IDc1LFxuICB9LFxuICB7XG4gICAgbGFiZWw6ICcxMDAnLFxuICAgIHZhbHVlOiAxMDAsXG4gIH0sXG5dO1xuXG5jb25zdCBQYWdpbmF0aW9uID0gc3R5bGVkLmRpdmBcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZGlzcGxheTogZmxleDtcbiAgcGFkZGluZzogMXJlbTtcbiAgaGVpZ2h0OiBhdXRvO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIHdpZHRoOiAxMDAlO1xuICBmbGV4OiAwIDAgYXV0bztcbmA7XG5cbmNvbnN0IFJvd3NPblBhZ2UgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuYDtcblxuY29uc3QgUm93c09uUGFnZUxhYmVsID0gc3R5bGVkLnNwYW5gXG4gIHBhZGRpbmc6IDAgMXJlbTtcbmA7XG5cbmNvbnN0IFJvd3NPblBhZ2VTZWxlY3QgPSBzdHlsZWQoRmxvYXRpbmdTZWxlY3RQb3J0YWwpYFxuICBtaW4td2lkdGg6IDYwcHg7XG5gO1xuXG5jb25zdCBwYWdpbmF0aW9uQ29tcG9uZW50ID0gKFdyYXBwZWRDb21wb25lbnQpID0+IHtcbiAgY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlLCBvd25Qcm9wcykgPT4ge1xuICAgIGNvbnN0IEdSSUQgPSBvd25Qcm9wcy5ncmlkO1xuICAgIHJldHVybiB7XG4gICAgICBmaWx0ZXJEYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2ZpbHRlckRhdGEnXSwgTWFwKCkpLFxuICAgICAgaXNDcmVhdGluZzogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2lzQ3JlYXRpbmcnXSwgZmFsc2UpLFxuICAgICAgaXNFZGl0aW5nOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnaXNFZGl0aW5nJ10sIGZhbHNlKSxcbiAgICAgIHBhZ2U6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ3BhZ2UnXSksXG4gICAgICByb3dzT25QYWdlOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdyb3dzT25QYWdlJ10pLFxuICAgICAgc29ydENvbHVtbjogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnc29ydGluZ0RhdGEnLCAnc29ydENvbHVtbiddLCBHUklELmRlZmF1bHRTb3J0Q29sdW1uKSxcbiAgICAgIHNvcnRPcmRlcjogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnc29ydGluZ0RhdGEnLCAnc29ydE9yZGVyJ10sIEdSSUQuZGVmYXVsdFNvcnRPcmRlciksXG4gICAgfTtcbiAgfTtcblxuICBjb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiAoe1xuICAgIHNldFBhZ2U6IChncmlkLCBwYWdlKSA9PiBkaXNwYXRjaChzZXRQYWdlKGdyaWQsIHBhZ2UpKSxcbiAgICBzZXRSb3dzT25QYWdlOiAoZ3JpZCwgcm93c09uUGFnZSkgPT4gZGlzcGF0Y2goc2V0Um93c09uUGFnZShncmlkLCByb3dzT25QYWdlKSksXG4gIH0pO1xuXG4gIEBpbmplY3RJbnRsXG4gIEBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKVxuICBjbGFzcyBQYWdlciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICBncmlkOiBncmlkU2hhcGUuaXNSZXF1aXJlZCxcbiAgICAgIGZpbHRlckRhdGE6IEltbXV0YWJsZVByb3BUeXBlcy5tYXAuaXNSZXF1aXJlZCxcbiAgICAgIGludGw6IGludGxTaGFwZS5pc1JlcXVpcmVkLFxuICAgICAgaXNFZGl0aW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgaXNDcmVhdGluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgIHNldFBhZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICBzZXRSb3dzT25QYWdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuICAgICAgcGFnZTogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIHBhZ2luYXRpb246IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIGdldERhdGE6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIHBhZ2VTaXplOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgIHRvdGFsU2l6ZTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICB0b3RhbExpbWl0OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgfSksXG4gICAgICByb3dzT25QYWdlOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgcm93c09uUGFnZU9wdGlvbnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIGxhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuZWxlbWVudCwgUHJvcFR5cGVzLnN0cmluZ10pLmlzUmVxdWlyZWQsXG4gICAgICAgIHZhbHVlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuYm9vbCwgUHJvcFR5cGVzLm51bWJlciwgUHJvcFR5cGVzLnN0cmluZ10pLmlzUmVxdWlyZWQsXG4gICAgICB9KSksXG4gICAgICBzb3J0Q29sdW1uOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIF0pLFxuICAgICAgc29ydE9yZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIH07XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgY2hpbGRyZW46IG51bGwsXG4gICAgICBwYWdlOiAxLFxuICAgICAgcGFnaW5hdGlvbjogdW5kZWZpbmVkLFxuICAgICAgcm93c09uUGFnZTogdW5kZWZpbmVkLFxuICAgICAgcm93c09uUGFnZU9wdGlvbnM6IFJPV1NfT05fUEFHRV9PUFRJT05TLFxuICAgICAgc29ydENvbHVtbjogdW5kZWZpbmVkLFxuICAgICAgc29ydE9yZGVyOiB1bmRlZmluZWQsXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICBzdXBlcihwcm9wcyk7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGdyaWQsXG4gICAgICAgIHBhZ2luYXRpb24sXG4gICAgICAgIHJvd3NPblBhZ2VPcHRpb25zLFxuICAgICAgICByb3dzT25QYWdlLFxuICAgICAgfSA9IHByb3BzO1xuICAgICAgaWYgKHBhZ2luYXRpb24gJiYgcm93c09uUGFnZU9wdGlvbnMgJiYgcm93c09uUGFnZU9wdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBkZWZhdWx0Um93c09uUGFnZSA9XG4gICAgICAgICAgcm93c09uUGFnZU9wdGlvbnMuZmluZChvcHRpb24gPT4gb3B0aW9uLnZhbHVlID09PSBwYWdpbmF0aW9uLnBhZ2VTaXplKVxuICAgICAgICAgIHx8IHJvd3NPblBhZ2VPcHRpb25zWzBdO1xuICAgICAgICBpZiAoZGVmYXVsdFJvd3NPblBhZ2UgJiYgZGVmYXVsdFJvd3NPblBhZ2UudmFsdWUgIT09IHJvd3NPblBhZ2UpIHtcbiAgICAgICAgICBwcm9wcy5zZXRSb3dzT25QYWdlKGdyaWQsIGRlZmF1bHRSb3dzT25QYWdlLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSA9IChwcmV2UHJvcHMpID0+IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgZmlsdGVyRGF0YSxcbiAgICAgICAgcGFnaW5hdGlvbixcbiAgICAgICAgcGFnZSxcbiAgICAgICAgcm93c09uUGFnZSxcbiAgICAgICAgc29ydENvbHVtbixcbiAgICAgICAgc29ydE9yZGVyLFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBpZiAocGFnaW5hdGlvbiAmJiAhZmlsdGVyRGF0YS5lcXVhbHMocHJldlByb3BzLmZpbHRlckRhdGEpICYmIHBhZ2UgPiAxKSB7XG4gICAgICAgIHRoaXMuZ290b1BhZ2UoMSk7XG4gICAgICB9IGVsc2UgaWYgKHBhZ2luYXRpb24gJiYgKFxuICAgICAgICAhZmlsdGVyRGF0YS5lcXVhbHMocHJldlByb3BzLmZpbHRlckRhdGEpIHx8XG4gICAgICAgIHBhZ2UgIT09IHByZXZQcm9wcy5wYWdlIHx8XG4gICAgICAgIHJvd3NPblBhZ2UgIT09IHByZXZQcm9wcy5yb3dzT25QYWdlIHx8XG4gICAgICAgIHNvcnRDb2x1bW4gIT09IHByZXZQcm9wcy5zb3J0Q29sdW1uIHx8XG4gICAgICAgIHNvcnRPcmRlciAhPT0gcHJldlByb3BzLnNvcnRPcmRlcikpIHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0RGF0YSgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBnZXRTZWxlY3RlZFJvd3NPblBhZ2VPcHRpb24gPSAoKSA9PiB7XG4gICAgICBjb25zdCB7IHJvd3NPblBhZ2UsIHJvd3NPblBhZ2VPcHRpb25zIH0gPSB0aGlzLnByb3BzO1xuICAgICAgcmV0dXJuIHJvd3NPblBhZ2VPcHRpb25zLmZpbmQob3B0aW9uID0+IG9wdGlvbi52YWx1ZSA9PT0gcm93c09uUGFnZSk7XG4gICAgfVxuXG4gICAgcmVxdWVzdERhdGEgPSAoKSA9PiB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGZpbHRlckRhdGEsXG4gICAgICAgIHBhZ2luYXRpb24sXG4gICAgICAgIHBhZ2UsXG4gICAgICAgIHJvd3NPblBhZ2UsXG4gICAgICAgIHNvcnRDb2x1bW4sXG4gICAgICAgIHNvcnRPcmRlcixcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3Qgb2Zmc2V0ID0gKChwYWdlKSAtIDEpICogcm93c09uUGFnZTtcbiAgICAgIHBhZ2luYXRpb24uZ2V0RGF0YShvZmZzZXQsIHJvd3NPblBhZ2UsIGZpbHRlckRhdGEsIHNvcnRDb2x1bW4sIHNvcnRPcmRlcik7XG4gICAgfVxuXG4gICAgZ290b1BhZ2UgPSAocGFnZSkgPT4ge1xuICAgICAgY29uc3QgeyBncmlkIH0gPSB0aGlzLnByb3BzO1xuICAgICAgdGhpcy5wcm9wcy5zZXRQYWdlKGdyaWQsIHBhZ2UpO1xuICAgIH1cblxuICAgIGhhbmRsZVJvd3NPblBhZ2VDaGFuZ2UgPSAocm93c09uUGFnZU9wdGlvbikgPT4ge1xuICAgICAgY29uc3QgeyBncmlkLCBwYWdlLCBwYWdpbmF0aW9uIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3Qgcm93c09uUGFnZSA9IHJvd3NPblBhZ2VPcHRpb24udmFsdWU7XG4gICAgICB0aGlzLnByb3BzLnNldFJvd3NPblBhZ2UoZ3JpZCwgcm93c09uUGFnZSk7XG4gICAgICBpZiAocGFnZSA+IE1hdGguY2VpbChwYWdpbmF0aW9uLnRvdGFsU2l6ZSAvIHJvd3NPblBhZ2UpKSB7XG4gICAgICAgIHRoaXMuZ290b1BhZ2UoMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyVG90YWxDb3VudCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHsgaW50bCwgcGFnaW5hdGlvbiB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IHsgdG90YWxMaW1pdCwgdG90YWxTaXplIH0gPSBwYWdpbmF0aW9uO1xuICAgICAgbGV0IGxhYmVsO1xuICAgICAgc3dpdGNoICh0b3RhbFNpemUpIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIGxhYmVsID0gaW50bC5mb3JtYXRNZXNzYWdlKHsgaWQ6ICdHcmlkLlBhZ2luYXRpb24uVG90YWxTaW5ndWxhcicgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgdG90YWxMaW1pdDpcbiAgICAgICAgICBsYWJlbCA9IGludGwuZm9ybWF0TWVzc2FnZSh7IGlkOiAnR3JpZC5QYWdpbmF0aW9uLlRvdGFsT3ZlcicgfSwgeyBuOiB0b3RhbFNpemUgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbGFiZWwgPSBpbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuUGFnaW5hdGlvbi5Ub3RhbFBsdXJhbCcgfSwgeyBuOiB0b3RhbFNpemUgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICByZXR1cm4gPHNwYW4+e2xhYmVsfTwvc3Bhbj47XG4gICAgfVxuXG4gICAgcmVuZGVyID0gKCkgPT4ge1xuICAgICAgY29uc3Qge1xuICAgICAgICBjaGlsZHJlbixcbiAgICAgICAgZ3JpZCxcbiAgICAgICAgaW50bCxcbiAgICAgICAgaXNDcmVhdGluZyxcbiAgICAgICAgaXNFZGl0aW5nLFxuICAgICAgICBwYWdlLFxuICAgICAgICBwYWdpbmF0aW9uLFxuICAgICAgICByb3dzT25QYWdlLFxuICAgICAgICByb3dzT25QYWdlT3B0aW9ucyxcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3QgcGFnZUNvdW50ID0gcGFnaW5hdGlvbiAmJiBwYWdpbmF0aW9uLnRvdGFsU2l6ZSA+IDAgJiYgcm93c09uUGFnZSA+IDBcbiAgICAgICAgPyBNYXRoLmNlaWwocGFnaW5hdGlvbi50b3RhbFNpemUgLyByb3dzT25QYWdlKSA6IDE7XG4gICAgICBjb25zdCBwYWdlcyA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gcGFnZUNvdW50OyBpKyspIHtcbiAgICAgICAgcGFnZXMucHVzaChpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAocGFnaW5hdGlvbiA/XG4gICAgICAgIDxXcmFwcGVkQ29tcG9uZW50IHsuLi50aGlzLnByb3BzfSBncmlkPXt7IC4uLmdyaWQsIHBhZ2luYXRpb246IHRydWUgfX0+XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICAgIDxQYWdpbmF0aW9uIGNsYXNzTmFtZT1cImZvb3RlclwiPlxuICAgICAgICAgICAge3RoaXMucmVuZGVyVG90YWxDb3VudCgpfVxuICAgICAgICAgICAgPExpc3RJdGVtc1xuICAgICAgICAgICAgICBkaXNhYmxlZD17aXNDcmVhdGluZyB8fCBpc0VkaXRpbmd9XG4gICAgICAgICAgICAgIGdvVG9JdGVtPXt0aGlzLmdvdG9QYWdlfVxuICAgICAgICAgICAgICBpZD1cImxpc3RQYWdpbmF0aW9uSXRlbXNcIlxuICAgICAgICAgICAgICBpdGVtSWQ9e3BhZ2V9XG4gICAgICAgICAgICAgIGl0ZW1JZHM9e0xpc3QocGFnZXMpfVxuICAgICAgICAgICAgICB0eXBlYWJsZVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxSb3dzT25QYWdlPlxuICAgICAgICAgICAgICA8Um93c09uUGFnZUxhYmVsPlxuICAgICAgICAgICAgICAgIHtpbnRsLmZvcm1hdE1lc3NhZ2UoeyBpZDogJ0dyaWQuUGFnaW5hdGlvbi5Sb3dzT25QYWdlJyB9KX1cbiAgICAgICAgICAgICAgPC9Sb3dzT25QYWdlTGFiZWw+XG4gICAgICAgICAgICAgIDxSb3dzT25QYWdlU2VsZWN0XG4gICAgICAgICAgICAgICAgaXNDcmVhcmFibGU9e2ZhbHNlfVxuICAgICAgICAgICAgICAgIGlzRGlzYWJsZWQ9e2lzQ3JlYXRpbmcgfHwgaXNFZGl0aW5nfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVJvd3NPblBhZ2VDaGFuZ2V9XG4gICAgICAgICAgICAgICAgb3B0aW9ucz17cm93c09uUGFnZU9wdGlvbnN9XG4gICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0U2VsZWN0ZWRSb3dzT25QYWdlT3B0aW9uKCl9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L1Jvd3NPblBhZ2U+XG4gICAgICAgICAgPC9QYWdpbmF0aW9uPlxuICAgICAgICA8L1dyYXBwZWRDb21wb25lbnQ+XG4gICAgICAgIDogPFdyYXBwZWRDb21wb25lbnQgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBQYWdlcjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBhZ2luYXRpb25Db21wb25lbnQ7XG4iXX0=