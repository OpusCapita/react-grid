var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteralLoose(['\n  display: flex;\n  height: 40px;\n  justify-content: center;\n  width: 100%;\n  background-color: white;\n'], ['\n  display: flex;\n  height: 40px;\n  justify-content: center;\n  width: 100%;\n  background-color: white;\n']);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

/* eslint-disable no-plusplus */
import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List, Map } from 'immutable';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ListItems from '@opuscapita/react-list-items';
import { setPaginationPage as _setPaginationPage } from './datagrid.actions';
import { gridShape } from './datagrid.props';

var Pagination = styled.div(_templateObject);

var paginationComponent = function paginationComponent(WrappedComponent) {
  var _dec, _class, _class2, _temp2;

  var mapStateToProps = function mapStateToProps(state, ownProps) {
    var GRID = ownProps.grid;
    return {
      paginationPage: state.datagrid.getIn([GRID.id, 'config', 'pagination', 'page']),
      filterData: state.datagrid.getIn([GRID.id, 'config', 'filteringData', 'filterData'], Map()),
      isCreating: state.datagrid.getIn([GRID.id, 'session', 'isCreating'], false),
      isEditing: state.datagrid.getIn([GRID.id, 'session', 'isEditing'], false),
      sortColumn: state.datagrid.getIn([GRID.id, 'config', 'sortingData', 'sortColumn'], null),
      sortOrder: state.datagrid.getIn([GRID.id, 'config', 'sortingData', 'sortOrder'], null)
    };
  };

  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      setPaginationPage: function setPaginationPage(grid, page) {
        return dispatch(_setPaginationPage(grid, page));
      }
    };
  };

  var Pager = (_dec = connect(mapStateToProps, mapDispatchToProps), _dec(_class = (_temp2 = _class2 = function (_React$PureComponent) {
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
        return pagination ? React.createElement(
          WrappedComponent,
          _extends({}, _this.props, { grid: _extends({}, grid, { pagination: true }) }),
          children,
          React.createElement(
            Pagination,
            null,
            React.createElement(ListItems, {
              disabled: isCreating || isEditing,
              goToItem: _this.gotoPage,
              id: 'listPaginationItems',
              itemId: paginationPage,
              itemIds: List(pages)
            })
          )
        ) : React.createElement(WrappedComponent, _this.props);
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return Pager;
  }(React.PureComponent), _class2.defaultProps = {
    children: null,
    paginationPage: 1,
    pagination: undefined,
    sortColumn: undefined,
    sortOrder: undefined
  }, _temp2)) || _class);


  return Pager;
};

export default paginationComponent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9wYWdpbmF0aW9uLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJJbW11dGFibGVQcm9wVHlwZXMiLCJMaXN0IiwiTWFwIiwiY29ubmVjdCIsInN0eWxlZCIsIkxpc3RJdGVtcyIsInNldFBhZ2luYXRpb25QYWdlIiwiZ3JpZFNoYXBlIiwiUGFnaW5hdGlvbiIsImRpdiIsInBhZ2luYXRpb25Db21wb25lbnQiLCJXcmFwcGVkQ29tcG9uZW50IiwibWFwU3RhdGVUb1Byb3BzIiwic3RhdGUiLCJvd25Qcm9wcyIsIkdSSUQiLCJncmlkIiwicGFnaW5hdGlvblBhZ2UiLCJkYXRhZ3JpZCIsImdldEluIiwiaWQiLCJmaWx0ZXJEYXRhIiwiaXNDcmVhdGluZyIsImlzRWRpdGluZyIsInNvcnRDb2x1bW4iLCJzb3J0T3JkZXIiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJwYWdlIiwiZGlzcGF0Y2giLCJQYWdlciIsImNvbXBvbmVudERpZE1vdW50IiwicGFnaW5hdGlvbiIsInByb3BzIiwicmVxdWVzdERhdGEiLCJjb21wb25lbnREaWRVcGRhdGUiLCJwcmV2UHJvcHMiLCJlcXVhbHMiLCJnb3RvUGFnZSIsIm9mZnNldCIsInBhZ2VTaXplIiwiZ2V0RGF0YSIsInJlbmRlciIsImNoaWxkcmVuIiwicGFnZUNvdW50IiwiTWF0aCIsImNlaWwiLCJ0b3RhbFNpemUiLCJwYWdlcyIsImkiLCJwdXNoIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLE9BQU9DLGtCQUFQLE1BQStCLDJCQUEvQjtBQUNBLFNBQVNDLElBQVQsRUFBZUMsR0FBZixRQUEwQixXQUExQjtBQUNBLFNBQVNDLE9BQVQsUUFBd0IsYUFB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dUJmLFdBQVdRLFFBQTVDLENBRGMsR0FDMEMsQ0FENUQ7QUFFQSxZQUFNUSxRQUFRLEVBQWQ7QUFDQSxhQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsS0FBS0wsU0FBckIsRUFBZ0NLLEdBQWhDLEVBQXFDO0FBQ25DRCxnQkFBTUUsSUFBTixDQUFXRCxDQUFYO0FBQ0Q7QUFDRCxlQUFRakIsYUFDTjtBQUFDLDBCQUFEO0FBQUEsdUJBQXNCLE1BQUtDLEtBQTNCLElBQWtDLG1CQUFXaEIsSUFBWCxJQUFpQmUsWUFBWSxJQUE3QixHQUFsQztBQUNHVyxrQkFESDtBQUVFO0FBQUMsc0JBQUQ7QUFBQTtBQUNFLGdDQUFDLFNBQUQ7QUFDRSx3QkFBVXBCLGNBQWNDLFNBRDFCO0FBRUUsd0JBQVUsTUFBS2MsUUFGakI7QUFHRSxrQkFBRyxxQkFITDtBQUlFLHNCQUFRcEIsY0FKVjtBQUtFLHVCQUFTaEIsS0FBSzhDLEtBQUw7QUFMWDtBQURGO0FBRkYsU0FETSxHQWFKLG9CQUFDLGdCQUFELEVBQXNCLE1BQUtmLEtBQTNCLENBYko7QUFlRCxPQXRINkM7QUFBQTs7QUFBQTtBQUFBLElBa0I1QmxDLE1BQU1vRCxhQWxCc0IsV0F1Q3ZDQyxZQXZDdUMsR0F1Q3hCO0FBQ3BCVCxjQUFVLElBRFU7QUFFcEJ6QixvQkFBZ0IsQ0FGSTtBQUdwQmMsZ0JBQVlxQixTQUhRO0FBSXBCNUIsZ0JBQVk0QixTQUpRO0FBS3BCM0IsZUFBVzJCO0FBTFMsR0F2Q3dCOzs7QUF5SGhELFNBQU92QixLQUFQO0FBQ0QsQ0ExSEQ7O0FBNEhBLGVBQWVuQixtQkFBZiIsImZpbGUiOiJwYWdpbmF0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLXBsdXNwbHVzICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgeyBMaXN0LCBNYXAgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IExpc3RJdGVtcyBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1saXN0LWl0ZW1zJztcbmltcG9ydCB7IHNldFBhZ2luYXRpb25QYWdlIH0gZnJvbSAnLi9kYXRhZ3JpZC5hY3Rpb25zJztcbmltcG9ydCB7IGdyaWRTaGFwZSB9IGZyb20gJy4vZGF0YWdyaWQucHJvcHMnO1xuXG5jb25zdCBQYWdpbmF0aW9uID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgaGVpZ2h0OiA0MHB4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgd2lkdGg6IDEwMCU7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuYDtcblxuY29uc3QgcGFnaW5hdGlvbkNvbXBvbmVudCA9IChXcmFwcGVkQ29tcG9uZW50KSA9PiB7XG4gIGNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSwgb3duUHJvcHMpID0+IHtcbiAgICBjb25zdCBHUklEID0gb3duUHJvcHMuZ3JpZDtcbiAgICByZXR1cm4ge1xuICAgICAgcGFnaW5hdGlvblBhZ2U6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ3BhZ2luYXRpb24nLCAncGFnZSddKSxcbiAgICAgIGZpbHRlckRhdGE6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ2ZpbHRlcmluZ0RhdGEnLCAnZmlsdGVyRGF0YSddLCBNYXAoKSksXG4gICAgICBpc0NyZWF0aW5nOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnaXNDcmVhdGluZyddLCBmYWxzZSksXG4gICAgICBpc0VkaXRpbmc6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnc2Vzc2lvbicsICdpc0VkaXRpbmcnXSwgZmFsc2UpLFxuICAgICAgc29ydENvbHVtbjogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnc29ydGluZ0RhdGEnLCAnc29ydENvbHVtbiddLCBudWxsKSxcbiAgICAgIHNvcnRPcmRlcjogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdjb25maWcnLCAnc29ydGluZ0RhdGEnLCAnc29ydE9yZGVyJ10sIG51bGwpLFxuICAgIH07XG4gIH07XG5cbiAgY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4gKHtcbiAgICBzZXRQYWdpbmF0aW9uUGFnZTogKGdyaWQsIHBhZ2UpID0+IGRpc3BhdGNoKHNldFBhZ2luYXRpb25QYWdlKGdyaWQsIHBhZ2UpKSxcbiAgfSk7XG5cbiAgQGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpXG4gIGNsYXNzIFBhZ2VyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcbiAgICAgIGdyaWQ6IGdyaWRTaGFwZS5pc1JlcXVpcmVkLFxuICAgICAgc2V0UGFnaW5hdGlvblBhZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICBmaWx0ZXJEYXRhOiBJbW11dGFibGVQcm9wVHlwZXMubWFwLmlzUmVxdWlyZWQsXG4gICAgICBwYWdpbmF0aW9uUGFnZTogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIHBhZ2luYXRpb246IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIHBhZ2VTaXplOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgIHRvdGFsU2l6ZTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICBnZXREYXRhOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgfSksXG4gICAgICBzb3J0Q29sdW1uOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIF0pLFxuICAgICAgc29ydE9yZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgaXNFZGl0aW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgaXNDcmVhdGluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICB9O1xuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgIGNoaWxkcmVuOiBudWxsLFxuICAgICAgcGFnaW5hdGlvblBhZ2U6IDEsXG4gICAgICBwYWdpbmF0aW9uOiB1bmRlZmluZWQsXG4gICAgICBzb3J0Q29sdW1uOiB1bmRlZmluZWQsXG4gICAgICBzb3J0T3JkZXI6IHVuZGVmaW5lZCxcbiAgICB9O1xuXG4gICAgY29tcG9uZW50RGlkTW91bnQgPSAoKSA9PiB7XG4gICAgICBjb25zdCB7IHBhZ2luYXRpb24gfSA9IHRoaXMucHJvcHM7XG4gICAgICBpZiAocGFnaW5hdGlvbikgdGhpcy5yZXF1ZXN0RGF0YSgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSA9IChwcmV2UHJvcHMpID0+IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgZmlsdGVyRGF0YSxcbiAgICAgICAgcGFnaW5hdGlvbixcbiAgICAgICAgcGFnaW5hdGlvblBhZ2UsXG4gICAgICAgIHNvcnRDb2x1bW4sXG4gICAgICAgIHNvcnRPcmRlcixcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuICAgICAgaWYgKHBhZ2luYXRpb24gJiYgIWZpbHRlckRhdGEuZXF1YWxzKHByZXZQcm9wcy5maWx0ZXJEYXRhKSAmJiBwYWdpbmF0aW9uUGFnZSA+IDEpIHtcbiAgICAgICAgdGhpcy5nb3RvUGFnZSgxKTtcbiAgICAgIH0gZWxzZSBpZiAocGFnaW5hdGlvbiAmJiAoXG4gICAgICAgICFmaWx0ZXJEYXRhLmVxdWFscyhwcmV2UHJvcHMuZmlsdGVyRGF0YSkgfHxcbiAgICAgICAgcGFnaW5hdGlvblBhZ2UgIT09IHByZXZQcm9wcy5wYWdpbmF0aW9uUGFnZSB8fFxuICAgICAgICBzb3J0Q29sdW1uICE9PSBwcmV2UHJvcHMuc29ydENvbHVtbiB8fFxuICAgICAgICBzb3J0T3JkZXIgIT09IHByZXZQcm9wcy5zb3J0T3JkZXIpKSB7XG4gICAgICAgIHRoaXMucmVxdWVzdERhdGEoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmVxdWVzdERhdGEgPSAoKSA9PiB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGZpbHRlckRhdGEsXG4gICAgICAgIHBhZ2luYXRpb24sXG4gICAgICAgIHBhZ2luYXRpb25QYWdlLFxuICAgICAgICBzb3J0Q29sdW1uLFxuICAgICAgICBzb3J0T3JkZXIsXG4gICAgICB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IG9mZnNldCA9ICgocGFnaW5hdGlvblBhZ2UpIC0gMSkgKiBwYWdpbmF0aW9uLnBhZ2VTaXplO1xuICAgICAgcGFnaW5hdGlvbi5nZXREYXRhKG9mZnNldCwgcGFnaW5hdGlvbi5wYWdlU2l6ZSwgZmlsdGVyRGF0YSwgc29ydENvbHVtbiwgc29ydE9yZGVyKTtcbiAgICB9XG5cbiAgICBnb3RvUGFnZSA9IChwYWdlKSA9PiB7XG4gICAgICBjb25zdCB7IGdyaWQgfSA9IHRoaXMucHJvcHM7XG4gICAgICB0aGlzLnByb3BzLnNldFBhZ2luYXRpb25QYWdlKGdyaWQsIHBhZ2UpO1xuICAgIH1cblxuICAgIHJlbmRlciA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgY2hpbGRyZW4sXG4gICAgICAgIGdyaWQsXG4gICAgICAgIGlzQ3JlYXRpbmcsXG4gICAgICAgIGlzRWRpdGluZyxcbiAgICAgICAgcGFnaW5hdGlvblBhZ2UsXG4gICAgICAgIHBhZ2luYXRpb24sXG4gICAgICB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IHBhZ2VDb3VudCA9IHBhZ2luYXRpb25cbiAgICAgICAgPyBNYXRoLmNlaWwocGFnaW5hdGlvbi50b3RhbFNpemUgLyBwYWdpbmF0aW9uLnBhZ2VTaXplKSA6IDE7XG4gICAgICBjb25zdCBwYWdlcyA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gcGFnZUNvdW50OyBpKyspIHtcbiAgICAgICAgcGFnZXMucHVzaChpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAocGFnaW5hdGlvbiA/XG4gICAgICAgIDxXcmFwcGVkQ29tcG9uZW50IHsuLi50aGlzLnByb3BzfSBncmlkPXt7IC4uLmdyaWQsIHBhZ2luYXRpb246IHRydWUgfX0+XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICAgIDxQYWdpbmF0aW9uPlxuICAgICAgICAgICAgPExpc3RJdGVtc1xuICAgICAgICAgICAgICBkaXNhYmxlZD17aXNDcmVhdGluZyB8fCBpc0VkaXRpbmd9XG4gICAgICAgICAgICAgIGdvVG9JdGVtPXt0aGlzLmdvdG9QYWdlfVxuICAgICAgICAgICAgICBpZD1cImxpc3RQYWdpbmF0aW9uSXRlbXNcIlxuICAgICAgICAgICAgICBpdGVtSWQ9e3BhZ2luYXRpb25QYWdlfVxuICAgICAgICAgICAgICBpdGVtSWRzPXtMaXN0KHBhZ2VzKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9QYWdpbmF0aW9uPlxuICAgICAgICA8L1dyYXBwZWRDb21wb25lbnQ+XG4gICAgICAgIDogPFdyYXBwZWRDb21wb25lbnQgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBQYWdlcjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBhZ2luYXRpb25Db21wb25lbnQ7XG4iXX0=