'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteralLoose(['\n  display: flex;\n  height: 40px;\n  justify-content: center;\n  width: 100%;\n  background-color: white;\n'], ['\n  display: flex;\n  height: 40px;\n  justify-content: center;\n  width: 100%;\n  background-color: white;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _immutable = require('immutable');

var _reactRedux = require('react-redux');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _reactListItems = require('@opuscapita/react-list-items');

var _reactListItems2 = _interopRequireDefault(_reactListItems);

var _datagrid = require('./datagrid.actions');

var _datagrid2 = require('./datagrid.utils');

var _datagrid3 = _interopRequireDefault(_datagrid2);

var _datagrid4 = require('./datagrid.props');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; } /* eslint-disable no-plusplus */


var Pagination = _styledComponents2.default.div(_templateObject);

var paginationComponent = function paginationComponent(WrappedComponent) {
  var _dec, _class, _class2, _temp2;

  var mapStateToProps = function mapStateToProps(state, ownProps) {
    var GRID = ownProps.grid;
    return {
      paginationPage: state.datagrid.getIn([GRID.id, 'config', 'pagination', 'page']),
      filterData: state.datagrid.getIn([GRID.id, 'config', 'filteringData', 'filterData'], (0, _immutable.Map)()),
      isCreating: state.datagrid.getIn([GRID.id, 'session', 'isCreating'], false),
      isEditing: state.datagrid.getIn([GRID.id, 'session', 'isEditing'], false),
      sortColumn: state.datagrid.getIn([GRID.id, 'config', 'sortingData', 'sortColumn'], null),
      sortOrder: state.datagrid.getIn([GRID.id, 'config', 'sortingData', 'sortOrder'], null)
    };
  };

  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      setPaginationPage: function setPaginationPage(grid, page) {
        return dispatch((0, _datagrid.setPaginationPage)(grid, page));
      }
    };
  };

  var Pager = (_dec = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), _dec(_class = (_temp2 = _class2 = function (_React$PureComponent) {
    _inherits(Pager, _React$PureComponent);

    function Pager() {
      var _temp, _this, _ret;

      _classCallCheck(this, Pager);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.componentDidMount = function () {
        var pagination = _this.props.pagination;

        if (pagination) _this.requestData();
      }, _this.componentDidUpdate = function (prevProps) {
        var _this$props = _this.props,
            filterData = _this$props.filterData,
            pagination = _this$props.pagination,
            paginationPage = _this$props.paginationPage,
            sortColumn = _this$props.sortColumn,
            sortOrder = _this$props.sortOrder;

        if (pagination && !filterData.equals(prevProps.filterData) && paginationPage > 1) {
          _this.gotoPage(1);
        } else if (pagination && (!filterData.equals(prevProps.filterData) || paginationPage !== prevProps.paginationPage || sortColumn !== prevProps.sortColumn || sortOrder !== prevProps.sortOrder)) {
          _this.requestData();
        }
      }, _this.requestData = function () {
        var _this$props2 = _this.props,
            filterData = _this$props2.filterData,
            pagination = _this$props2.pagination,
            paginationPage = _this$props2.paginationPage,
            sortColumn = _this$props2.sortColumn,
            sortOrder = _this$props2.sortOrder;

        var offset = (paginationPage - 1) * pagination.pageSize;
        pagination.getData(offset, pagination.pageSize, filterData, sortColumn, sortOrder);
      }, _this.gotoPage = function (page) {
        var grid = _this.props.grid;

        _this.props.setPaginationPage(grid, page);
        _datagrid3.default.savePaginationPage(grid, { page: page });
      }, _this.render = function () {
        var _this$props3 = _this.props,
            children = _this$props3.children,
            grid = _this$props3.grid,
            isCreating = _this$props3.isCreating,
            isEditing = _this$props3.isEditing,
            paginationPage = _this$props3.paginationPage,
            pagination = _this$props3.pagination;

        var pageCount = pagination ? Math.ceil(pagination.totalSize / pagination.pageSize) : 1;
        var pages = [];
        for (var i = 1; i <= pageCount; i++) {
          pages.push(i);
        }
        return pagination ? _react2.default.createElement(
          WrappedComponent,
          _extends({}, _this.props, { grid: _extends({}, grid, { pagination: true }) }),
          children,
          _react2.default.createElement(
            Pagination,
            null,
            _react2.default.createElement(_reactListItems2.default, {
              disabled: isCreating || isEditing,
              goToItem: _this.gotoPage,
              id: 'listPaginationItems',
              itemId: paginationPage,
              itemIds: (0, _immutable.List)(pages)
            })
          )
        ) : _react2.default.createElement(WrappedComponent, _this.props);
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return Pager;
  }(_react2.default.PureComponent), _class2.defaultProps = {
    children: null,
    paginationPage: 1,
    pagination: undefined,
    sortColumn: undefined,
    sortOrder: undefined
  }, _temp2)) || _class);


  return Pager;
};

exports.default = paginationComponent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9wYWdpbmF0aW9uLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUGFnaW5hdGlvbiIsInN0eWxlZCIsImRpdiIsInBhZ2luYXRpb25Db21wb25lbnQiLCJXcmFwcGVkQ29tcG9uZW50IiwibWFwU3RhdGVUb1Byb3BzIiwic3RhdGUiLCJvd25Qcm9wcyIsIkdSSUQiLCJncmlkIiwicGFnaW5hdGlvblBhZ2UiLCJkYXRhZ3JpZCIsImdldEluIiwiaWQiLCJmaWx0ZXJEYXRhIiwiaXNDcmVhdGluZyIsImlzRWRpdGluZyIsInNvcnRDb2x1bW4iLCJzb3J0T3JkZXIiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJzZXRQYWdpbmF0aW9uUGFnZSIsInBhZ2UiLCJkaXNwYXRjaCIsIlBhZ2VyIiwiY29tcG9uZW50RGlkTW91bnQiLCJwYWdpbmF0aW9uIiwicHJvcHMiLCJyZXF1ZXN0RGF0YSIsImNvbXBvbmVudERpZFVwZGF0ZSIsInByZXZQcm9wcyIsImVxdWFscyIsImdvdG9QYWdlIiwib2Zmc2V0IiwicGFnZVNpemUiLCJnZXREYXRhIiwiVXRpbHMiLCJzYXZlUGFnaW5hdGlvblBhZ2UiLCJyZW5kZXIiLCJjaGlsZHJlbiIsInBhZ2VDb3VudCIsIk1hdGgiLCJjZWlsIiwidG90YWxTaXplIiwicGFnZXMiLCJpIiwicHVzaCIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OzswRkFWQTs7O0FBWUEsSUFBTUEsYUFBYUMsMkJBQU9DLEdBQXBCLGlCQUFOOztBQVFBLElBQU1DLHNCQUFzQixTQUF0QkEsbUJBQXNCLENBQUNDLGdCQUFELEVBQXNCO0FBQUE7O0FBQ2hELE1BQU1DLGtCQUFrQixTQUFsQkEsZUFB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dUJBQXNCLE1BQUtDLEtBQTNCLElBQWtDLG1CQUFXakIsSUFBWCxJQUFpQmdCLFlBQVksSUFBN0IsR0FBbEM7QUFDR2Esa0JBREg7QUFFRTtBQUFDLHNCQUFEO0FBQUE7QUFDRSwwQ0FBQyx3QkFBRDtBQUNFLHdCQUFVdkIsY0FBY0MsU0FEMUI7QUFFRSx3QkFBVSxNQUFLZSxRQUZqQjtBQUdFLGtCQUFHLHFCQUhMO0FBSUUsc0JBQVFyQixjQUpWO0FBS0UsdUJBQVMscUJBQUtpQyxLQUFMO0FBTFg7QUFERjtBQUZGLFNBRE0sR0FhSiw4QkFBQyxnQkFBRCxFQUFzQixNQUFLakIsS0FBM0IsQ0FiSjtBQWVELE9Bdkg2QztBQUFBOztBQUFBO0FBQUEsSUFrQjVCb0IsZ0JBQU1DLGFBbEJzQixXQXVDdkNDLFlBdkN1QyxHQXVDeEI7QUFDcEJWLGNBQVUsSUFEVTtBQUVwQjVCLG9CQUFnQixDQUZJO0FBR3BCZSxnQkFBWXdCLFNBSFE7QUFJcEJoQyxnQkFBWWdDLFNBSlE7QUFLcEIvQixlQUFXK0I7QUFMUyxHQXZDd0I7OztBQTBIaEQsU0FBTzFCLEtBQVA7QUFDRCxDQTNIRDs7a0JBNkhlcEIsbUIiLCJmaWxlIjoicGFnaW5hdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgSW1tdXRhYmxlUHJvcFR5cGVzIGZyb20gJ3JlYWN0LWltbXV0YWJsZS1wcm9wdHlwZXMnO1xuaW1wb3J0IHsgTGlzdCwgTWFwIH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBMaXN0SXRlbXMgZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtbGlzdC1pdGVtcyc7XG5pbXBvcnQgeyBzZXRQYWdpbmF0aW9uUGFnZSB9IGZyb20gJy4vZGF0YWdyaWQuYWN0aW9ucyc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9kYXRhZ3JpZC51dGlscyc7XG5pbXBvcnQgeyBncmlkU2hhcGUgfSBmcm9tICcuL2RhdGFncmlkLnByb3BzJztcblxuY29uc3QgUGFnaW5hdGlvbiA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGhlaWdodDogNDBweDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHdpZHRoOiAxMDAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbmA7XG5cbmNvbnN0IHBhZ2luYXRpb25Db21wb25lbnQgPSAoV3JhcHBlZENvbXBvbmVudCkgPT4ge1xuICBjb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUsIG93blByb3BzKSA9PiB7XG4gICAgY29uc3QgR1JJRCA9IG93blByb3BzLmdyaWQ7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBhZ2luYXRpb25QYWdlOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdwYWdpbmF0aW9uJywgJ3BhZ2UnXSksXG4gICAgICBmaWx0ZXJEYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2ZpbHRlckRhdGEnXSwgTWFwKCkpLFxuICAgICAgaXNDcmVhdGluZzogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2lzQ3JlYXRpbmcnXSwgZmFsc2UpLFxuICAgICAgaXNFZGl0aW5nOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnaXNFZGl0aW5nJ10sIGZhbHNlKSxcbiAgICAgIHNvcnRDb2x1bW46IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ3NvcnRpbmdEYXRhJywgJ3NvcnRDb2x1bW4nXSwgbnVsbCksXG4gICAgICBzb3J0T3JkZXI6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ3NvcnRpbmdEYXRhJywgJ3NvcnRPcmRlciddLCBudWxsKSxcbiAgICB9O1xuICB9O1xuXG4gIGNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+ICh7XG4gICAgc2V0UGFnaW5hdGlvblBhZ2U6IChncmlkLCBwYWdlKSA9PiBkaXNwYXRjaChzZXRQYWdpbmF0aW9uUGFnZShncmlkLCBwYWdlKSksXG4gIH0pO1xuXG4gIEBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKVxuICBjbGFzcyBQYWdlciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgICBncmlkOiBncmlkU2hhcGUuaXNSZXF1aXJlZCxcbiAgICAgIHNldFBhZ2luYXRpb25QYWdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgZmlsdGVyRGF0YTogSW1tdXRhYmxlUHJvcFR5cGVzLm1hcC5pc1JlcXVpcmVkLFxuICAgICAgcGFnaW5hdGlvblBhZ2U6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICBwYWdpbmF0aW9uOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICBwYWdlU2l6ZTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICB0b3RhbFNpemU6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgZ2V0RGF0YTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIH0pLFxuICAgICAgc29ydENvbHVtbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIFByb3BUeXBlcy5udW1iZXIsXG4gICAgICBdKSxcbiAgICAgIHNvcnRPcmRlcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIGlzRWRpdGluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgIGlzQ3JlYXRpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgfTtcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICBjaGlsZHJlbjogbnVsbCxcbiAgICAgIHBhZ2luYXRpb25QYWdlOiAxLFxuICAgICAgcGFnaW5hdGlvbjogdW5kZWZpbmVkLFxuICAgICAgc29ydENvbHVtbjogdW5kZWZpbmVkLFxuICAgICAgc29ydE9yZGVyOiB1bmRlZmluZWQsXG4gICAgfTtcblxuICAgIGNvbXBvbmVudERpZE1vdW50ID0gKCkgPT4ge1xuICAgICAgY29uc3QgeyBwYWdpbmF0aW9uIH0gPSB0aGlzLnByb3BzO1xuICAgICAgaWYgKHBhZ2luYXRpb24pIHRoaXMucmVxdWVzdERhdGEoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUgPSAocHJldlByb3BzKSA9PiB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGZpbHRlckRhdGEsXG4gICAgICAgIHBhZ2luYXRpb24sXG4gICAgICAgIHBhZ2luYXRpb25QYWdlLFxuICAgICAgICBzb3J0Q29sdW1uLFxuICAgICAgICBzb3J0T3JkZXIsXG4gICAgICB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGlmIChwYWdpbmF0aW9uICYmICFmaWx0ZXJEYXRhLmVxdWFscyhwcmV2UHJvcHMuZmlsdGVyRGF0YSkgJiYgcGFnaW5hdGlvblBhZ2UgPiAxKSB7XG4gICAgICAgIHRoaXMuZ290b1BhZ2UoMSk7XG4gICAgICB9IGVsc2UgaWYgKHBhZ2luYXRpb24gJiYgKFxuICAgICAgICAhZmlsdGVyRGF0YS5lcXVhbHMocHJldlByb3BzLmZpbHRlckRhdGEpIHx8XG4gICAgICAgIHBhZ2luYXRpb25QYWdlICE9PSBwcmV2UHJvcHMucGFnaW5hdGlvblBhZ2UgfHxcbiAgICAgICAgc29ydENvbHVtbiAhPT0gcHJldlByb3BzLnNvcnRDb2x1bW4gfHxcbiAgICAgICAgc29ydE9yZGVyICE9PSBwcmV2UHJvcHMuc29ydE9yZGVyKSkge1xuICAgICAgICB0aGlzLnJlcXVlc3REYXRhKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJlcXVlc3REYXRhID0gKCkgPT4ge1xuICAgICAgY29uc3Qge1xuICAgICAgICBmaWx0ZXJEYXRhLFxuICAgICAgICBwYWdpbmF0aW9uLFxuICAgICAgICBwYWdpbmF0aW9uUGFnZSxcbiAgICAgICAgc29ydENvbHVtbixcbiAgICAgICAgc29ydE9yZGVyLFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCBvZmZzZXQgPSAoKHBhZ2luYXRpb25QYWdlKSAtIDEpICogcGFnaW5hdGlvbi5wYWdlU2l6ZTtcbiAgICAgIHBhZ2luYXRpb24uZ2V0RGF0YShvZmZzZXQsIHBhZ2luYXRpb24ucGFnZVNpemUsIGZpbHRlckRhdGEsIHNvcnRDb2x1bW4sIHNvcnRPcmRlcik7XG4gICAgfVxuXG4gICAgZ290b1BhZ2UgPSAocGFnZSkgPT4ge1xuICAgICAgY29uc3QgeyBncmlkIH0gPSB0aGlzLnByb3BzO1xuICAgICAgdGhpcy5wcm9wcy5zZXRQYWdpbmF0aW9uUGFnZShncmlkLCBwYWdlKTtcbiAgICAgIFV0aWxzLnNhdmVQYWdpbmF0aW9uUGFnZShncmlkLCB7IHBhZ2UgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyID0gKCkgPT4ge1xuICAgICAgY29uc3Qge1xuICAgICAgICBjaGlsZHJlbixcbiAgICAgICAgZ3JpZCxcbiAgICAgICAgaXNDcmVhdGluZyxcbiAgICAgICAgaXNFZGl0aW5nLFxuICAgICAgICBwYWdpbmF0aW9uUGFnZSxcbiAgICAgICAgcGFnaW5hdGlvbixcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3QgcGFnZUNvdW50ID0gcGFnaW5hdGlvblxuICAgICAgICA/IE1hdGguY2VpbChwYWdpbmF0aW9uLnRvdGFsU2l6ZSAvIHBhZ2luYXRpb24ucGFnZVNpemUpIDogMTtcbiAgICAgIGNvbnN0IHBhZ2VzID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBwYWdlQ291bnQ7IGkrKykge1xuICAgICAgICBwYWdlcy5wdXNoKGkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIChwYWdpbmF0aW9uID9cbiAgICAgICAgPFdyYXBwZWRDb21wb25lbnQgey4uLnRoaXMucHJvcHN9IGdyaWQ9e3sgLi4uZ3JpZCwgcGFnaW5hdGlvbjogdHJ1ZSB9fT5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgPFBhZ2luYXRpb24+XG4gICAgICAgICAgICA8TGlzdEl0ZW1zXG4gICAgICAgICAgICAgIGRpc2FibGVkPXtpc0NyZWF0aW5nIHx8IGlzRWRpdGluZ31cbiAgICAgICAgICAgICAgZ29Ub0l0ZW09e3RoaXMuZ290b1BhZ2V9XG4gICAgICAgICAgICAgIGlkPVwibGlzdFBhZ2luYXRpb25JdGVtc1wiXG4gICAgICAgICAgICAgIGl0ZW1JZD17cGFnaW5hdGlvblBhZ2V9XG4gICAgICAgICAgICAgIGl0ZW1JZHM9e0xpc3QocGFnZXMpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L1BhZ2luYXRpb24+XG4gICAgICAgIDwvV3JhcHBlZENvbXBvbmVudD5cbiAgICAgICAgOiA8V3JhcHBlZENvbXBvbmVudCB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIFBhZ2VyO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcGFnaW5hdGlvbkNvbXBvbmVudDtcbiJdfQ==