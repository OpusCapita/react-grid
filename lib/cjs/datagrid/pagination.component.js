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
    paginationPage: 1,
    pagination: undefined,
    sortColumn: undefined,
    sortOrder: undefined
  }, _temp2)) || _class);


  return Pager;
};

exports.default = paginationComponent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9wYWdpbmF0aW9uLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUGFnaW5hdGlvbiIsInN0eWxlZCIsImRpdiIsInBhZ2luYXRpb25Db21wb25lbnQiLCJXcmFwcGVkQ29tcG9uZW50IiwibWFwU3RhdGVUb1Byb3BzIiwic3RhdGUiLCJvd25Qcm9wcyIsIkdSSUQiLCJncmlkIiwicGFnaW5hdGlvblBhZ2UiLCJkYXRhZ3JpZCIsImdldEluIiwiaWQiLCJmaWx0ZXJEYXRhIiwiaXNDcmVhdGluZyIsImlzRWRpdGluZyIsInNvcnRDb2x1bW4iLCJzb3J0T3JkZXIiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJzZXRQYWdpbmF0aW9uUGFnZSIsInBhZ2UiLCJkaXNwYXRjaCIsIlBhZ2VyIiwiY29tcG9uZW50RGlkTW91bnQiLCJwYWdpbmF0aW9uIiwicHJvcHMiLCJyZXF1ZXN0RGF0YSIsImNvbXBvbmVudERpZFVwZGF0ZSIsInByZXZQcm9wcyIsImVxdWFscyIsImdvdG9QYWdlIiwib2Zmc2V0IiwicGFnZVNpemUiLCJnZXREYXRhIiwiVXRpbHMiLCJzYXZlUGFnaW5hdGlvblBhZ2UiLCJyZW5kZXIiLCJjaGlsZHJlbiIsInBhZ2VDb3VudCIsIk1hdGgiLCJjZWlsIiwidG90YWxTaXplIiwicGFnZXMiLCJpIiwicHVzaCIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OzswRkFUQTs7O0FBV0EsSUFBTUEsYUFBYUMsMkJBQU9DLEdBQXBCLGlCQUFOOztBQVFBLElBQU1DLHNCQUFzQixTQUF0QkEsbUJBQXNCLENBQUNDLGdCQUFELEVBQXNCO0FBQUE7O0FBQ2hELE1BQU1DLGtCQUFrQixTQUFsQkEsZUFBa0IsQ0FBQ0MsS0FBRCxFQUFRQyxRQUFSLEVBQXFCO0FBQzNDLFFBQU1DLE9BQU9ELFNBQVNFLElBQXRCO0FBQ0EsV0FBTztBQUNMQyxzQkFBZ0JKLE1BQU1LLFFBQU4sQ0FBZUMsS0FBZixDQUFxQixDQUFDSixLQUFLSyxFQUFOLEVBQVUsUUFBVixFQUFvQixZQUFwQixFQUFrQyxNQUFsQyxDQUFyQixDQURYO0FBRUxDLGtCQUFZUixNQUFNSyxRQUFOLENBQWVDLEtBQWYsQ0FBcUIsQ0FBQ0osS0FBS0ssRUFBTixFQUFVLFFBQVYsRUFBb0IsZUFBcEIsRUFBcUMsWUFBckMsQ0FBckIsRUFBeUUscUJBQXpFLENBRlA7QUFHTEUsa0JBQVlULE1BQU1LLFFBQU4sQ0FBZUMsS0FBZixDQUFxQixDQUFDSixLQUFLSyxFQUFOLEVBQVUsU0FBVixFQUFxQixZQUFyQixDQUFyQixFQUF5RCxLQUF6RCxDQUhQO0FBSUxHLGlCQUFXVixNQUFNSyxRQUFOLENBQWVDLEtBQWYsQ0FBcUIsQ0FBQ0osS0FBS0ssRUFBTixFQUFVLFNBQVYsRUFBcUIsV0FBckIsQ0FBckIsRUFBd0QsS0FBeEQsQ0FKTjtBQUtMSSxrQkFBWVgsTUFBTUssUUFBTixDQUFlQyxLQUFmLENBQXFCLENBQUNKLEtBQUtLLEVBQU4sRUFBVSxRQUFWLEVBQW9CLGFBQXBCLEVBQW1DLFlBQW5DLENBQXJCLEVBQXVFLElBQXZFLENBTFA7QUFNTEssaUJBQVdaLE1BQU1LLFFBQU4sQ0FBZUMsS0FBZixDQUFxQixDQUFDSixLQUFLSyxFQUFOLEVBQVUsUUFBVixFQUFvQixhQUFwQixFQUFtQyxXQUFuQyxDQUFyQixFQUFzRSxJQUF0RTtBQU5OLEtBQVA7QUFRRCxHQVZEOztBQVlBLE1BQU1NLHFCQUFxQixTQUFyQkEsa0JBQXFCO0FBQUEsV0FBYTtBQUN0Q0MseUJBQW1CLDJCQUFDWCxJQUFELEVBQU9ZLElBQVA7QUFBQSxlQUFnQkMsU0FBUyxpQ0FBa0JiLElBQWxCLEVBQXdCWSxJQUF4QixDQUFULENBQWhCO0FBQUE7QUFEbUIsS0FBYjtBQUFBLEdBQTNCOztBQWJnRCxNQWtCMUNFLEtBbEIwQyxXQWlCL0MseUJBQVFsQixlQUFSLEVBQXlCYyxrQkFBekIsQ0FqQitDO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUEsa0tBeUM5Q0ssaUJBekM4QyxHQXlDMUIsWUFBTTtBQUFBLFlBQ2hCQyxVQURnQixHQUNELE1BQUtDLEtBREosQ0FDaEJELFVBRGdCOztBQUV4QixZQUFJQSxVQUFKLEVBQWdCLE1BQUtFLFdBQUw7QUFDakIsT0E1QzZDLFFBOEM5Q0Msa0JBOUM4QyxHQThDekIsVUFBQ0MsU0FBRCxFQUFlO0FBQUEsMEJBTzlCLE1BQUtILEtBUHlCO0FBQUEsWUFFaENaLFVBRmdDLGVBRWhDQSxVQUZnQztBQUFBLFlBR2hDVyxVQUhnQyxlQUdoQ0EsVUFIZ0M7QUFBQSxZQUloQ2YsY0FKZ0MsZUFJaENBLGNBSmdDO0FBQUEsWUFLaENPLFVBTGdDLGVBS2hDQSxVQUxnQztBQUFBLFlBTWhDQyxTQU5nQyxlQU1oQ0EsU0FOZ0M7O0FBUWxDLFlBQUlPLGNBQWMsQ0FBQ1gsV0FBV2dCLE1BQVgsQ0FBa0JELFVBQVVmLFVBQTVCLENBQWYsSUFBMERKLGlCQUFpQixDQUEvRSxFQUFrRjtBQUNoRixnQkFBS3FCLFFBQUwsQ0FBYyxDQUFkO0FBQ0QsU0FGRCxNQUVPLElBQUlOLGVBQ1QsQ0FBQ1gsV0FBV2dCLE1BQVgsQ0FBa0JELFVBQVVmLFVBQTVCLENBQUQsSUFDQUosbUJBQW1CbUIsVUFBVW5CLGNBRDdCLElBRUFPLGVBQWVZLFVBQVVaLFVBRnpCLElBR0FDLGNBQWNXLFVBQVVYLFNBSmYsQ0FBSixFQUkrQjtBQUNwQyxnQkFBS1MsV0FBTDtBQUNEO0FBQ0YsT0EvRDZDLFFBaUU5Q0EsV0FqRThDLEdBaUVoQyxZQUFNO0FBQUEsMkJBT2QsTUFBS0QsS0FQUztBQUFBLFlBRWhCWixVQUZnQixnQkFFaEJBLFVBRmdCO0FBQUEsWUFHaEJXLFVBSGdCLGdCQUdoQkEsVUFIZ0I7QUFBQSxZQUloQmYsY0FKZ0IsZ0JBSWhCQSxjQUpnQjtBQUFBLFlBS2hCTyxVQUxnQixnQkFLaEJBLFVBTGdCO0FBQUEsWUFNaEJDLFNBTmdCLGdCQU1oQkEsU0FOZ0I7O0FBUWxCLFlBQU1jLFNBQVMsQ0FBRXRCLGNBQUQsR0FBbUIsQ0FBcEIsSUFBeUJlLFdBQVdRLFFBQW5EO0FBQ0FSLG1CQUFXUyxPQUFYLENBQW1CRixNQUFuQixFQUEyQlAsV0FBV1EsUUFBdEMsRUFBZ0RuQixVQUFoRCxFQUE0REcsVUFBNUQsRUFBd0VDLFNBQXhFO0FBQ0QsT0EzRTZDLFFBNkU5Q2EsUUE3RThDLEdBNkVuQyxVQUFDVixJQUFELEVBQVU7QUFBQSxZQUNYWixJQURXLEdBQ0YsTUFBS2lCLEtBREgsQ0FDWGpCLElBRFc7O0FBRW5CLGNBQUtpQixLQUFMLENBQVdOLGlCQUFYLENBQTZCWCxJQUE3QixFQUFtQ1ksSUFBbkM7QUFDQWMsMkJBQU1DLGtCQUFOLENBQXlCM0IsSUFBekIsRUFBK0IsRUFBRVksVUFBRixFQUEvQjtBQUNELE9BakY2QyxRQW1GOUNnQixNQW5GOEMsR0FtRnJDLFlBQU07QUFBQSwyQkFRVCxNQUFLWCxLQVJJO0FBQUEsWUFFWFksUUFGVyxnQkFFWEEsUUFGVztBQUFBLFlBR1g3QixJQUhXLGdCQUdYQSxJQUhXO0FBQUEsWUFJWE0sVUFKVyxnQkFJWEEsVUFKVztBQUFBLFlBS1hDLFNBTFcsZ0JBS1hBLFNBTFc7QUFBQSxZQU1YTixjQU5XLGdCQU1YQSxjQU5XO0FBQUEsWUFPWGUsVUFQVyxnQkFPWEEsVUFQVzs7QUFTYixZQUFNYyxZQUFZZCxhQUNkZSxLQUFLQyxJQUFMLENBQVVoQixXQUFXaUIsU0FBWCxHQUF1QmpCLFdBQVdRLFFBQTVDLENBRGMsR0FDMEMsQ0FENUQ7QUFFQSxZQUFNVSxRQUFRLEVBQWQ7QUFDQSxhQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsS0FBS0wsU0FBckIsRUFBZ0NLLEdBQWhDLEVBQXFDO0FBQ25DRCxnQkFBTUUsSUFBTixDQUFXRCxDQUFYO0FBQ0Q7QUFDRCxlQUFRbkIsYUFDTjtBQUFDLDBCQUFEO0FBQUEsdUJBQXNCLE1BQUtDLEtBQTNCLElBQWtDLG1CQUFXakIsSUFBWCxJQUFpQmdCLFlBQVksSUFBN0IsR0FBbEM7QUFDR2Esa0JBREg7QUFFRTtBQUFDLHNCQUFEO0FBQUE7QUFDRSwwQ0FBQyx3QkFBRDtBQUNFLHdCQUFVdkIsY0FBY0MsU0FEMUI7QUFFRSx3QkFBVSxNQUFLZSxRQUZqQjtBQUdFLGtCQUFHLHFCQUhMO0FBSUUsc0JBQVFyQixjQUpWO0FBS0UsdUJBQVMscUJBQUtpQyxLQUFMO0FBTFg7QUFERjtBQUZGLFNBRE0sR0FhSiw4QkFBQyxnQkFBRCxFQUFzQixNQUFLakIsS0FBM0IsQ0FiSjtBQWVELE9Bakg2QztBQUFBOztBQUFBO0FBQUEsSUFrQjVCb0IsZ0JBQU1DLGFBbEJzQixXQWtDdkNDLFlBbEN1QyxHQWtDeEI7QUFDcEJ0QyxvQkFBZ0IsQ0FESTtBQUVwQmUsZ0JBQVl3QixTQUZRO0FBR3BCaEMsZ0JBQVlnQyxTQUhRO0FBSXBCL0IsZUFBVytCO0FBSlMsR0FsQ3dCOzs7QUFvSGhELFNBQU8xQixLQUFQO0FBQ0QsQ0FySEQ7O2tCQXVIZXBCLG1CIiwiZmlsZSI6InBhZ2luYXRpb24uY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tcGx1c3BsdXMgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IEltbXV0YWJsZVByb3BUeXBlcyBmcm9tICdyZWFjdC1pbW11dGFibGUtcHJvcHR5cGVzJztcbmltcG9ydCB7IExpc3QsIE1hcCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgTGlzdEl0ZW1zIGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWxpc3QtaXRlbXMnO1xuaW1wb3J0IHsgc2V0UGFnaW5hdGlvblBhZ2UgfSBmcm9tICcuL2RhdGFncmlkLmFjdGlvbnMnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4vZGF0YWdyaWQudXRpbHMnO1xuXG5jb25zdCBQYWdpbmF0aW9uID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgaGVpZ2h0OiA0MHB4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgd2lkdGg6IDEwMCU7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuYDtcblxuY29uc3QgcGFnaW5hdGlvbkNvbXBvbmVudCA9IChXcmFwcGVkQ29tcG9uZW50KSA9PiB7XG4gIGNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSwgb3duUHJvcHMpID0+IHtcbiAgICBjb25zdCBHUklEID0gb3duUHJvcHMuZ3JpZDtcbiAgICByZXR1cm4ge1xuICAgICAgcGFnaW5hdGlvblBhZ2U6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ3BhZ2luYXRpb24nLCAncGFnZSddKSxcbiAgICAgIGZpbHRlckRhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnZmlsdGVyRGF0YSddLCBNYXAoKSksXG4gICAgICBpc0NyZWF0aW5nOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnaXNDcmVhdGluZyddLCBmYWxzZSksXG4gICAgICBpc0VkaXRpbmc6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdpc0VkaXRpbmcnXSwgZmFsc2UpLFxuICAgICAgc29ydENvbHVtbjogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnc29ydGluZ0RhdGEnLCAnc29ydENvbHVtbiddLCBudWxsKSxcbiAgICAgIHNvcnRPcmRlcjogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnc29ydGluZ0RhdGEnLCAnc29ydE9yZGVyJ10sIG51bGwpLFxuICAgIH07XG4gIH07XG5cbiAgY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4gKHtcbiAgICBzZXRQYWdpbmF0aW9uUGFnZTogKGdyaWQsIHBhZ2UpID0+IGRpc3BhdGNoKHNldFBhZ2luYXRpb25QYWdlKGdyaWQsIHBhZ2UpKSxcbiAgfSk7XG5cbiAgQGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpXG4gIGNsYXNzIFBhZ2VyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgIGZpbHRlckRhdGE6IEltbXV0YWJsZVByb3BUeXBlcy5tYXAuaXNSZXF1aXJlZCxcbiAgICAgIHBhZ2luYXRpb25QYWdlOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgcGFnaW5hdGlvbjogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgcGFnZVNpemU6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgdG90YWxTaXplOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgIGdldERhdGE6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICB9KSxcbiAgICAgIHNvcnRDb2x1bW46IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgXSksXG4gICAgICBzb3J0T3JkZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgfTtcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICBwYWdpbmF0aW9uUGFnZTogMSxcbiAgICAgIHBhZ2luYXRpb246IHVuZGVmaW5lZCxcbiAgICAgIHNvcnRDb2x1bW46IHVuZGVmaW5lZCxcbiAgICAgIHNvcnRPcmRlcjogdW5kZWZpbmVkLFxuICAgIH07XG5cbiAgICBjb21wb25lbnREaWRNb3VudCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHsgcGFnaW5hdGlvbiB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGlmIChwYWdpbmF0aW9uKSB0aGlzLnJlcXVlc3REYXRhKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlID0gKHByZXZQcm9wcykgPT4ge1xuICAgICAgY29uc3Qge1xuICAgICAgICBmaWx0ZXJEYXRhLFxuICAgICAgICBwYWdpbmF0aW9uLFxuICAgICAgICBwYWdpbmF0aW9uUGFnZSxcbiAgICAgICAgc29ydENvbHVtbixcbiAgICAgICAgc29ydE9yZGVyLFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBpZiAocGFnaW5hdGlvbiAmJiAhZmlsdGVyRGF0YS5lcXVhbHMocHJldlByb3BzLmZpbHRlckRhdGEpICYmIHBhZ2luYXRpb25QYWdlID4gMSkge1xuICAgICAgICB0aGlzLmdvdG9QYWdlKDEpO1xuICAgICAgfSBlbHNlIGlmIChwYWdpbmF0aW9uICYmIChcbiAgICAgICAgIWZpbHRlckRhdGEuZXF1YWxzKHByZXZQcm9wcy5maWx0ZXJEYXRhKSB8fFxuICAgICAgICBwYWdpbmF0aW9uUGFnZSAhPT0gcHJldlByb3BzLnBhZ2luYXRpb25QYWdlIHx8XG4gICAgICAgIHNvcnRDb2x1bW4gIT09IHByZXZQcm9wcy5zb3J0Q29sdW1uIHx8XG4gICAgICAgIHNvcnRPcmRlciAhPT0gcHJldlByb3BzLnNvcnRPcmRlcikpIHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0RGF0YSgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXF1ZXN0RGF0YSA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgZmlsdGVyRGF0YSxcbiAgICAgICAgcGFnaW5hdGlvbixcbiAgICAgICAgcGFnaW5hdGlvblBhZ2UsXG4gICAgICAgIHNvcnRDb2x1bW4sXG4gICAgICAgIHNvcnRPcmRlcixcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3Qgb2Zmc2V0ID0gKChwYWdpbmF0aW9uUGFnZSkgLSAxKSAqIHBhZ2luYXRpb24ucGFnZVNpemU7XG4gICAgICBwYWdpbmF0aW9uLmdldERhdGEob2Zmc2V0LCBwYWdpbmF0aW9uLnBhZ2VTaXplLCBmaWx0ZXJEYXRhLCBzb3J0Q29sdW1uLCBzb3J0T3JkZXIpO1xuICAgIH1cblxuICAgIGdvdG9QYWdlID0gKHBhZ2UpID0+IHtcbiAgICAgIGNvbnN0IHsgZ3JpZCB9ID0gdGhpcy5wcm9wcztcbiAgICAgIHRoaXMucHJvcHMuc2V0UGFnaW5hdGlvblBhZ2UoZ3JpZCwgcGFnZSk7XG4gICAgICBVdGlscy5zYXZlUGFnaW5hdGlvblBhZ2UoZ3JpZCwgeyBwYWdlIH0pO1xuICAgIH1cblxuICAgIHJlbmRlciA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgY2hpbGRyZW4sXG4gICAgICAgIGdyaWQsXG4gICAgICAgIGlzQ3JlYXRpbmcsXG4gICAgICAgIGlzRWRpdGluZyxcbiAgICAgICAgcGFnaW5hdGlvblBhZ2UsXG4gICAgICAgIHBhZ2luYXRpb24sXG4gICAgICB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IHBhZ2VDb3VudCA9IHBhZ2luYXRpb25cbiAgICAgICAgPyBNYXRoLmNlaWwocGFnaW5hdGlvbi50b3RhbFNpemUgLyBwYWdpbmF0aW9uLnBhZ2VTaXplKSA6IDE7XG4gICAgICBjb25zdCBwYWdlcyA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gcGFnZUNvdW50OyBpKyspIHtcbiAgICAgICAgcGFnZXMucHVzaChpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAocGFnaW5hdGlvbiA/XG4gICAgICAgIDxXcmFwcGVkQ29tcG9uZW50IHsuLi50aGlzLnByb3BzfSBncmlkPXt7IC4uLmdyaWQsIHBhZ2luYXRpb246IHRydWUgfX0+XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICAgIDxQYWdpbmF0aW9uPlxuICAgICAgICAgICAgPExpc3RJdGVtc1xuICAgICAgICAgICAgICBkaXNhYmxlZD17aXNDcmVhdGluZyB8fCBpc0VkaXRpbmd9XG4gICAgICAgICAgICAgIGdvVG9JdGVtPXt0aGlzLmdvdG9QYWdlfVxuICAgICAgICAgICAgICBpZD1cImxpc3RQYWdpbmF0aW9uSXRlbXNcIlxuICAgICAgICAgICAgICBpdGVtSWQ9e3BhZ2luYXRpb25QYWdlfVxuICAgICAgICAgICAgICBpdGVtSWRzPXtMaXN0KHBhZ2VzKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9QYWdpbmF0aW9uPlxuICAgICAgICA8L1dyYXBwZWRDb21wb25lbnQ+XG4gICAgICAgIDogPFdyYXBwZWRDb21wb25lbnQgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBQYWdlcjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBhZ2luYXRpb25Db21wb25lbnQ7XG4iXX0=