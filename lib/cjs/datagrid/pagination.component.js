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

var _datagrid2 = require('./datagrid.props');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9wYWdpbmF0aW9uLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUGFnaW5hdGlvbiIsInN0eWxlZCIsImRpdiIsInBhZ2luYXRpb25Db21wb25lbnQiLCJXcmFwcGVkQ29tcG9uZW50IiwibWFwU3RhdGVUb1Byb3BzIiwic3RhdGUiLCJvd25Qcm9wcyIsIkdSSUQiLCJncmlkIiwicGFnaW5hdGlvblBhZ2UiLCJkYXRhZ3JpZCIsImdldEluIiwiaWQiLCJmaWx0ZXJEYXRhIiwiaXNDcmVhdGluZyIsImlzRWRpdGluZyIsInNvcnRDb2x1bW4iLCJzb3J0T3JkZXIiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJzZXRQYWdpbmF0aW9uUGFnZSIsInBhZ2UiLCJkaXNwYXRjaCIsIlBhZ2VyIiwiY29tcG9uZW50RGlkTW91bnQiLCJwYWdpbmF0aW9uIiwicHJvcHMiLCJyZXF1ZXN0RGF0YSIsImNvbXBvbmVudERpZFVwZGF0ZSIsInByZXZQcm9wcyIsImVxdWFscyIsImdvdG9QYWdlIiwib2Zmc2V0IiwicGFnZVNpemUiLCJnZXREYXRhIiwicmVuZGVyIiwiY2hpbGRyZW4iLCJwYWdlQ291bnQiLCJNYXRoIiwiY2VpbCIsInRvdGFsU2l6ZSIsInBhZ2VzIiwiaSIsInB1c2giLCJSZWFjdCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJ1bmRlZmluZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7OzBGQVRBOzs7QUFXQSxJQUFNQSxhQUFhQywyQkFBT0MsR0FBcEIsaUJBQU47O0FBUUEsSUFBTUMsc0JBQXNCLFNBQXRCQSxtQkFBc0IsQ0FBQ0MsZ0JBQUQsRUFBc0I7QUFBQTs7QUFDaEQsTUFBTUMsa0JBQWtCLFNBQWxCQSxlQUFrQixDQUFDQyxLQUFELEVBQVFDLFFBQVIsRUFBcUI7QUFDM0Ms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QUNFLDBDQUFDLHdCQUFEO0FBQ0Usd0JBQVVyQixjQUFjQyxTQUQxQjtBQUVFLHdCQUFVLE1BQUtlLFFBRmpCO0FBR0Usa0JBQUcscUJBSEw7QUFJRSxzQkFBUXJCLGNBSlY7QUFLRSx1QkFBUyxxQkFBSytCLEtBQUw7QUFMWDtBQURGO0FBRkYsU0FETSxHQWFKLDhCQUFDLGdCQUFELEVBQXNCLE1BQUtmLEtBQTNCLENBYko7QUFlRCxPQXRINkM7QUFBQTs7QUFBQTtBQUFBLElBa0I1QmtCLGdCQUFNQyxhQWxCc0IsV0F1Q3ZDQyxZQXZDdUMsR0F1Q3hCO0FBQ3BCVixjQUFVLElBRFU7QUFFcEIxQixvQkFBZ0IsQ0FGSTtBQUdwQmUsZ0JBQVlzQixTQUhRO0FBSXBCOUIsZ0JBQVk4QixTQUpRO0FBS3BCN0IsZUFBVzZCO0FBTFMsR0F2Q3dCOzs7QUF5SGhELFNBQU94QixLQUFQO0FBQ0QsQ0ExSEQ7O2tCQTRIZXBCLG1CIiwiZmlsZSI6InBhZ2luYXRpb24uY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tcGx1c3BsdXMgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IEltbXV0YWJsZVByb3BUeXBlcyBmcm9tICdyZWFjdC1pbW11dGFibGUtcHJvcHR5cGVzJztcbmltcG9ydCB7IExpc3QsIE1hcCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgTGlzdEl0ZW1zIGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWxpc3QtaXRlbXMnO1xuaW1wb3J0IHsgc2V0UGFnaW5hdGlvblBhZ2UgfSBmcm9tICcuL2RhdGFncmlkLmFjdGlvbnMnO1xuaW1wb3J0IHsgZ3JpZFNoYXBlIH0gZnJvbSAnLi9kYXRhZ3JpZC5wcm9wcyc7XG5cbmNvbnN0IFBhZ2luYXRpb24gPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICBoZWlnaHQ6IDQwcHg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB3aWR0aDogMTAwJTtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG5gO1xuXG5jb25zdCBwYWdpbmF0aW9uQ29tcG9uZW50ID0gKFdyYXBwZWRDb21wb25lbnQpID0+IHtcbiAgY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlLCBvd25Qcm9wcykgPT4ge1xuICAgIGNvbnN0IEdSSUQgPSBvd25Qcm9wcy5ncmlkO1xuICAgIHJldHVybiB7XG4gICAgICBwYWdpbmF0aW9uUGFnZTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAncGFnaW5hdGlvbicsICdwYWdlJ10pLFxuICAgICAgZmlsdGVyRGF0YTogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnZmlsdGVyaW5nRGF0YScsICdmaWx0ZXJEYXRhJ10sIE1hcCgpKSxcbiAgICAgIGlzQ3JlYXRpbmc6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdpc0NyZWF0aW5nJ10sIGZhbHNlKSxcbiAgICAgIGlzRWRpdGluZzogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2lzRWRpdGluZyddLCBmYWxzZSksXG4gICAgICBzb3J0Q29sdW1uOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdzb3J0aW5nRGF0YScsICdzb3J0Q29sdW1uJ10sIG51bGwpLFxuICAgICAgc29ydE9yZGVyOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdzb3J0aW5nRGF0YScsICdzb3J0T3JkZXInXSwgbnVsbCksXG4gICAgfTtcbiAgfTtcblxuICBjb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiAoe1xuICAgIHNldFBhZ2luYXRpb25QYWdlOiAoZ3JpZCwgcGFnZSkgPT4gZGlzcGF0Y2goc2V0UGFnaW5hdGlvblBhZ2UoZ3JpZCwgcGFnZSkpLFxuICB9KTtcblxuICBAY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcylcbiAgY2xhc3MgUGFnZXIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuICAgICAgZ3JpZDogZ3JpZFNoYXBlLmlzUmVxdWlyZWQsXG4gICAgICBzZXRQYWdpbmF0aW9uUGFnZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIGZpbHRlckRhdGE6IEltbXV0YWJsZVByb3BUeXBlcy5tYXAuaXNSZXF1aXJlZCxcbiAgICAgIHBhZ2luYXRpb25QYWdlOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgcGFnaW5hdGlvbjogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgcGFnZVNpemU6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgdG90YWxTaXplOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgIGdldERhdGE6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICB9KSxcbiAgICAgIHNvcnRDb2x1bW46IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgXSksXG4gICAgICBzb3J0T3JkZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBpc0VkaXRpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgICBpc0NyZWF0aW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIH07XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgY2hpbGRyZW46IG51bGwsXG4gICAgICBwYWdpbmF0aW9uUGFnZTogMSxcbiAgICAgIHBhZ2luYXRpb246IHVuZGVmaW5lZCxcbiAgICAgIHNvcnRDb2x1bW46IHVuZGVmaW5lZCxcbiAgICAgIHNvcnRPcmRlcjogdW5kZWZpbmVkLFxuICAgIH07XG5cbiAgICBjb21wb25lbnREaWRNb3VudCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHsgcGFnaW5hdGlvbiB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGlmIChwYWdpbmF0aW9uKSB0aGlzLnJlcXVlc3REYXRhKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlID0gKHByZXZQcm9wcykgPT4ge1xuICAgICAgY29uc3Qge1xuICAgICAgICBmaWx0ZXJEYXRhLFxuICAgICAgICBwYWdpbmF0aW9uLFxuICAgICAgICBwYWdpbmF0aW9uUGFnZSxcbiAgICAgICAgc29ydENvbHVtbixcbiAgICAgICAgc29ydE9yZGVyLFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBpZiAocGFnaW5hdGlvbiAmJiAhZmlsdGVyRGF0YS5lcXVhbHMocHJldlByb3BzLmZpbHRlckRhdGEpICYmIHBhZ2luYXRpb25QYWdlID4gMSkge1xuICAgICAgICB0aGlzLmdvdG9QYWdlKDEpO1xuICAgICAgfSBlbHNlIGlmIChwYWdpbmF0aW9uICYmIChcbiAgICAgICAgIWZpbHRlckRhdGEuZXF1YWxzKHByZXZQcm9wcy5maWx0ZXJEYXRhKSB8fFxuICAgICAgICBwYWdpbmF0aW9uUGFnZSAhPT0gcHJldlByb3BzLnBhZ2luYXRpb25QYWdlIHx8XG4gICAgICAgIHNvcnRDb2x1bW4gIT09IHByZXZQcm9wcy5zb3J0Q29sdW1uIHx8XG4gICAgICAgIHNvcnRPcmRlciAhPT0gcHJldlByb3BzLnNvcnRPcmRlcikpIHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0RGF0YSgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXF1ZXN0RGF0YSA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgZmlsdGVyRGF0YSxcbiAgICAgICAgcGFnaW5hdGlvbixcbiAgICAgICAgcGFnaW5hdGlvblBhZ2UsXG4gICAgICAgIHNvcnRDb2x1bW4sXG4gICAgICAgIHNvcnRPcmRlcixcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3Qgb2Zmc2V0ID0gKChwYWdpbmF0aW9uUGFnZSkgLSAxKSAqIHBhZ2luYXRpb24ucGFnZVNpemU7XG4gICAgICBwYWdpbmF0aW9uLmdldERhdGEob2Zmc2V0LCBwYWdpbmF0aW9uLnBhZ2VTaXplLCBmaWx0ZXJEYXRhLCBzb3J0Q29sdW1uLCBzb3J0T3JkZXIpO1xuICAgIH1cblxuICAgIGdvdG9QYWdlID0gKHBhZ2UpID0+IHtcbiAgICAgIGNvbnN0IHsgZ3JpZCB9ID0gdGhpcy5wcm9wcztcbiAgICAgIHRoaXMucHJvcHMuc2V0UGFnaW5hdGlvblBhZ2UoZ3JpZCwgcGFnZSk7XG4gICAgfVxuXG4gICAgcmVuZGVyID0gKCkgPT4ge1xuICAgICAgY29uc3Qge1xuICAgICAgICBjaGlsZHJlbixcbiAgICAgICAgZ3JpZCxcbiAgICAgICAgaXNDcmVhdGluZyxcbiAgICAgICAgaXNFZGl0aW5nLFxuICAgICAgICBwYWdpbmF0aW9uUGFnZSxcbiAgICAgICAgcGFnaW5hdGlvbixcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3QgcGFnZUNvdW50ID0gcGFnaW5hdGlvblxuICAgICAgICA/IE1hdGguY2VpbChwYWdpbmF0aW9uLnRvdGFsU2l6ZSAvIHBhZ2luYXRpb24ucGFnZVNpemUpIDogMTtcbiAgICAgIGNvbnN0IHBhZ2VzID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBwYWdlQ291bnQ7IGkrKykge1xuICAgICAgICBwYWdlcy5wdXNoKGkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIChwYWdpbmF0aW9uID9cbiAgICAgICAgPFdyYXBwZWRDb21wb25lbnQgey4uLnRoaXMucHJvcHN9IGdyaWQ9e3sgLi4uZ3JpZCwgcGFnaW5hdGlvbjogdHJ1ZSB9fT5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgPFBhZ2luYXRpb24+XG4gICAgICAgICAgICA8TGlzdEl0ZW1zXG4gICAgICAgICAgICAgIGRpc2FibGVkPXtpc0NyZWF0aW5nIHx8IGlzRWRpdGluZ31cbiAgICAgICAgICAgICAgZ29Ub0l0ZW09e3RoaXMuZ290b1BhZ2V9XG4gICAgICAgICAgICAgIGlkPVwibGlzdFBhZ2luYXRpb25JdGVtc1wiXG4gICAgICAgICAgICAgIGl0ZW1JZD17cGFnaW5hdGlvblBhZ2V9XG4gICAgICAgICAgICAgIGl0ZW1JZHM9e0xpc3QocGFnZXMpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L1BhZ2luYXRpb24+XG4gICAgICAgIDwvV3JhcHBlZENvbXBvbmVudD5cbiAgICAgICAgOiA8V3JhcHBlZENvbXBvbmVudCB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIFBhZ2VyO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcGFnaW5hdGlvbkNvbXBvbmVudDtcbiJdfQ==