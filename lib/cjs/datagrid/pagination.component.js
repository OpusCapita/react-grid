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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9wYWdpbmF0aW9uLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUGFnaW5hdGlvbiIsInN0eWxlZCIsImRpdiIsInBhZ2luYXRpb25Db21wb25lbnQiLCJXcmFwcGVkQ29tcG9uZW50IiwibWFwU3RhdGVUb1Byb3BzIiwic3RhdGUiLCJvd25Qcm9wcyIsIkdSSUQiLCJncmlkIiwicGFnaW5hdGlvblBhZ2UiLCJkYXRhZ3JpZCIsImdldEluIiwiaWQiLCJmaWx0ZXJEYXRhIiwiaXNDcmVhdGluZyIsImlzRWRpdGluZyIsInNvcnRDb2x1bW4iLCJzb3J0T3JkZXIiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJzZXRQYWdpbmF0aW9uUGFnZSIsInBhZ2UiLCJkaXNwYXRjaCIsIlBhZ2VyIiwiY29tcG9uZW50RGlkTW91bnQiLCJwYWdpbmF0aW9uIiwicHJvcHMiLCJyZXF1ZXN0RGF0YSIsImNvbXBvbmVudERpZFVwZGF0ZSIsInByZXZQcm9wcyIsImVxdWFscyIsImdvdG9QYWdlIiwib2Zmc2V0IiwicGFnZVNpemUiLCJnZXREYXRhIiwicmVuZGVyIiwiY2hpbGRyZW4iLCJwYWdlQ291bnQiLCJNYXRoIiwiY2VpbCIsInRvdGFsU2l6ZSIsInBhZ2VzIiwiaSIsInB1c2giLCJSZWFjdCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJ1bmRlZmluZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7MEZBVkE7OztBQVlBLElBQU1BLGFBQWFDLDJCQUFPQyxHQUFwQixpQkFBTjs7QUFRQSxJQUFNQyxzQkFBc0IsU0FBdEJBLG1CQUFzQixDQUFDQyxnQkFBRCxFQUFzQjtBQUFBOztBQUNoRCxNQUFNQyxrQkFBa0IsU0FBbEJBLGVBQWtCLENBQUNDLEtBQUQsRUFBUUMsUUFBUixFQUFx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RDtBQUFBO0FBQ0UsMENBQUMsd0JBQUQ7QUFDRSx3QkFBVXJCLGNBQWNDLFNBRDFCO0FBRUUsd0JBQVUsTUFBS2UsUUFGakI7QUFHRSxrQkFBRyxxQkFITDtBQUlFLHNCQUFRckIsY0FKVjtBQUtFLHVCQUFTLHFCQUFLK0IsS0FBTDtBQUxYO0FBREY7QUFGRixTQURNLEdBYUosOEJBQUMsZ0JBQUQsRUFBc0IsTUFBS2YsS0FBM0IsQ0FiSjtBQWVELE9BdEg2QztBQUFBOztBQUFBO0FBQUEsSUFrQjVCa0IsZ0JBQU1DLGFBbEJzQixXQXVDdkNDLFlBdkN1QyxHQXVDeEI7QUFDcEJWLGNBQVUsSUFEVTtBQUVwQjFCLG9CQUFnQixDQUZJO0FBR3BCZSxnQkFBWXNCLFNBSFE7QUFJcEI5QixnQkFBWThCLFNBSlE7QUFLcEI3QixlQUFXNkI7QUFMUyxHQXZDd0I7OztBQXlIaEQsU0FBT3hCLEtBQVA7QUFDRCxDQTFIRDs7a0JBNEhlcEIsbUIiLCJmaWxlIjoicGFnaW5hdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgSW1tdXRhYmxlUHJvcFR5cGVzIGZyb20gJ3JlYWN0LWltbXV0YWJsZS1wcm9wdHlwZXMnO1xuaW1wb3J0IHsgTGlzdCwgTWFwIH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBMaXN0SXRlbXMgZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtbGlzdC1pdGVtcyc7XG5pbXBvcnQgeyBzZXRQYWdpbmF0aW9uUGFnZSB9IGZyb20gJy4vZGF0YWdyaWQuYWN0aW9ucyc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9kYXRhZ3JpZC51dGlscyc7XG5pbXBvcnQgeyBncmlkU2hhcGUgfSBmcm9tICcuL2RhdGFncmlkLnByb3BzJztcblxuY29uc3QgUGFnaW5hdGlvbiA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGhlaWdodDogNDBweDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHdpZHRoOiAxMDAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbmA7XG5cbmNvbnN0IHBhZ2luYXRpb25Db21wb25lbnQgPSAoV3JhcHBlZENvbXBvbmVudCkgPT4ge1xuICBjb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUsIG93blByb3BzKSA9PiB7XG4gICAgY29uc3QgR1JJRCA9IG93blByb3BzLmdyaWQ7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBhZ2luYXRpb25QYWdlOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdwYWdpbmF0aW9uJywgJ3BhZ2UnXSksXG4gICAgICBmaWx0ZXJEYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2ZpbHRlckRhdGEnXSwgTWFwKCkpLFxuICAgICAgaXNDcmVhdGluZzogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2lzQ3JlYXRpbmcnXSwgZmFsc2UpLFxuICAgICAgaXNFZGl0aW5nOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnaXNFZGl0aW5nJ10sIGZhbHNlKSxcbiAgICAgIHNvcnRDb2x1bW46IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ3NvcnRpbmdEYXRhJywgJ3NvcnRDb2x1bW4nXSwgbnVsbCksXG4gICAgICBzb3J0T3JkZXI6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ3NvcnRpbmdEYXRhJywgJ3NvcnRPcmRlciddLCBudWxsKSxcbiAgICB9O1xuICB9O1xuXG4gIGNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+ICh7XG4gICAgc2V0UGFnaW5hdGlvblBhZ2U6IChncmlkLCBwYWdlKSA9PiBkaXNwYXRjaChzZXRQYWdpbmF0aW9uUGFnZShncmlkLCBwYWdlKSksXG4gIH0pO1xuXG4gIEBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKVxuICBjbGFzcyBQYWdlciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gICAgICBncmlkOiBncmlkU2hhcGUuaXNSZXF1aXJlZCxcbiAgICAgIHNldFBhZ2luYXRpb25QYWdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgZmlsdGVyRGF0YTogSW1tdXRhYmxlUHJvcFR5cGVzLm1hcC5pc1JlcXVpcmVkLFxuICAgICAgcGFnaW5hdGlvblBhZ2U6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICBwYWdpbmF0aW9uOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICBwYWdlU2l6ZTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICB0b3RhbFNpemU6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgZ2V0RGF0YTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIH0pLFxuICAgICAgc29ydENvbHVtbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIFByb3BUeXBlcy5udW1iZXIsXG4gICAgICBdKSxcbiAgICAgIHNvcnRPcmRlcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIGlzRWRpdGluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgIGlzQ3JlYXRpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgfTtcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICBjaGlsZHJlbjogbnVsbCxcbiAgICAgIHBhZ2luYXRpb25QYWdlOiAxLFxuICAgICAgcGFnaW5hdGlvbjogdW5kZWZpbmVkLFxuICAgICAgc29ydENvbHVtbjogdW5kZWZpbmVkLFxuICAgICAgc29ydE9yZGVyOiB1bmRlZmluZWQsXG4gICAgfTtcblxuICAgIGNvbXBvbmVudERpZE1vdW50ID0gKCkgPT4ge1xuICAgICAgY29uc3QgeyBwYWdpbmF0aW9uIH0gPSB0aGlzLnByb3BzO1xuICAgICAgaWYgKHBhZ2luYXRpb24pIHRoaXMucmVxdWVzdERhdGEoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUgPSAocHJldlByb3BzKSA9PiB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGZpbHRlckRhdGEsXG4gICAgICAgIHBhZ2luYXRpb24sXG4gICAgICAgIHBhZ2luYXRpb25QYWdlLFxuICAgICAgICBzb3J0Q29sdW1uLFxuICAgICAgICBzb3J0T3JkZXIsXG4gICAgICB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGlmIChwYWdpbmF0aW9uICYmICFmaWx0ZXJEYXRhLmVxdWFscyhwcmV2UHJvcHMuZmlsdGVyRGF0YSkgJiYgcGFnaW5hdGlvblBhZ2UgPiAxKSB7XG4gICAgICAgIHRoaXMuZ290b1BhZ2UoMSk7XG4gICAgICB9IGVsc2UgaWYgKHBhZ2luYXRpb24gJiYgKFxuICAgICAgICAhZmlsdGVyRGF0YS5lcXVhbHMocHJldlByb3BzLmZpbHRlckRhdGEpIHx8XG4gICAgICAgIHBhZ2luYXRpb25QYWdlICE9PSBwcmV2UHJvcHMucGFnaW5hdGlvblBhZ2UgfHxcbiAgICAgICAgc29ydENvbHVtbiAhPT0gcHJldlByb3BzLnNvcnRDb2x1bW4gfHxcbiAgICAgICAgc29ydE9yZGVyICE9PSBwcmV2UHJvcHMuc29ydE9yZGVyKSkge1xuICAgICAgICB0aGlzLnJlcXVlc3REYXRhKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJlcXVlc3REYXRhID0gKCkgPT4ge1xuICAgICAgY29uc3Qge1xuICAgICAgICBmaWx0ZXJEYXRhLFxuICAgICAgICBwYWdpbmF0aW9uLFxuICAgICAgICBwYWdpbmF0aW9uUGFnZSxcbiAgICAgICAgc29ydENvbHVtbixcbiAgICAgICAgc29ydE9yZGVyLFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCBvZmZzZXQgPSAoKHBhZ2luYXRpb25QYWdlKSAtIDEpICogcGFnaW5hdGlvbi5wYWdlU2l6ZTtcbiAgICAgIHBhZ2luYXRpb24uZ2V0RGF0YShvZmZzZXQsIHBhZ2luYXRpb24ucGFnZVNpemUsIGZpbHRlckRhdGEsIHNvcnRDb2x1bW4sIHNvcnRPcmRlcik7XG4gICAgfVxuXG4gICAgZ290b1BhZ2UgPSAocGFnZSkgPT4ge1xuICAgICAgY29uc3QgeyBncmlkIH0gPSB0aGlzLnByb3BzO1xuICAgICAgdGhpcy5wcm9wcy5zZXRQYWdpbmF0aW9uUGFnZShncmlkLCBwYWdlKTtcbiAgICB9XG5cbiAgICByZW5kZXIgPSAoKSA9PiB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGNoaWxkcmVuLFxuICAgICAgICBncmlkLFxuICAgICAgICBpc0NyZWF0aW5nLFxuICAgICAgICBpc0VkaXRpbmcsXG4gICAgICAgIHBhZ2luYXRpb25QYWdlLFxuICAgICAgICBwYWdpbmF0aW9uLFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCBwYWdlQ291bnQgPSBwYWdpbmF0aW9uXG4gICAgICAgID8gTWF0aC5jZWlsKHBhZ2luYXRpb24udG90YWxTaXplIC8gcGFnaW5hdGlvbi5wYWdlU2l6ZSkgOiAxO1xuICAgICAgY29uc3QgcGFnZXMgPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IHBhZ2VDb3VudDsgaSsrKSB7XG4gICAgICAgIHBhZ2VzLnB1c2goaSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gKHBhZ2luYXRpb24gP1xuICAgICAgICA8V3JhcHBlZENvbXBvbmVudCB7Li4udGhpcy5wcm9wc30gZ3JpZD17eyAuLi5ncmlkLCBwYWdpbmF0aW9uOiB0cnVlIH19PlxuICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgICA8UGFnaW5hdGlvbj5cbiAgICAgICAgICAgIDxMaXN0SXRlbXNcbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzQ3JlYXRpbmcgfHwgaXNFZGl0aW5nfVxuICAgICAgICAgICAgICBnb1RvSXRlbT17dGhpcy5nb3RvUGFnZX1cbiAgICAgICAgICAgICAgaWQ9XCJsaXN0UGFnaW5hdGlvbkl0ZW1zXCJcbiAgICAgICAgICAgICAgaXRlbUlkPXtwYWdpbmF0aW9uUGFnZX1cbiAgICAgICAgICAgICAgaXRlbUlkcz17TGlzdChwYWdlcyl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvUGFnaW5hdGlvbj5cbiAgICAgICAgPC9XcmFwcGVkQ29tcG9uZW50PlxuICAgICAgICA6IDxXcmFwcGVkQ29tcG9uZW50IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gUGFnZXI7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBwYWdpbmF0aW9uQ29tcG9uZW50O1xuIl19