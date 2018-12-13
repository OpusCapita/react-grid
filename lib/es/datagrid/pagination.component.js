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
import Utils from './datagrid.utils';

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
        Utils.savePaginationPage(grid, { page: page });
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
    paginationPage: 1,
    pagination: undefined,
    sortColumn: undefined,
    sortOrder: undefined
  }, _temp2)) || _class);


  return Pager;
};

export default paginationComponent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9wYWdpbmF0aW9uLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJJbW11dGFibGVQcm9wVHlwZXMiLCJMaXN0IiwiTWFwIiwiY29ubmVjdCIsInN0eWxlZCIsIkxpc3RJdGVtcyIsInNldFBhZ2luYXRpb25QYWdlIiwiVXRpbHMiLCJQYWdpbmF0aW9uIiwiZGl2IiwicGFnaW5hdGlvbkNvbXBvbmVudCIsIldyYXBwZWRDb21wb25lbnQiLCJtYXBTdGF0ZVRvUHJvcHMiLCJzdGF0ZSIsIm93blByb3BzIiwiR1JJRCIsImdyaWQiLCJwYWdpbmF0aW9uUGFnZSIsImRhdGFncmlkIiwiZ2V0SW4iLCJpZCIsImZpbHRlckRhdGEiLCJpc0NyZWF0aW5nIiwiaXNFZGl0aW5nIiwic29ydENvbHVtbiIsInNvcnRPcmRlciIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsInBhZ2UiLCJkaXNwYXRjaCIsIlBhZ2VyIiwiY29tcG9uZW50RGlkTW91bnQiLCJwYWdpbmF0aW9uIiwicHJvcHMiLCJyZXF1ZXN0RGF0YSIsImNvbXBvbmVudERpZFVwZGF0ZSIsInByZXZQcm9wcyIsImVxdWFscyIsImdvdG9QYWdlIiwib2Zmc2V0IiwicGFnZVNpemUiLCJnZXREYXRhIiwic2F2ZVBhZ2luYXRpb25QYWdlIiwicmVuZGVyIiwiY2hpbGRyZW4iLCJwYWdlQ291bnQiLCJNYXRoIiwiY2VpbCIsInRvdGFsU2l6ZSIsInBhZ2VzIiwiaSIsInB1c2giLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTtBQUNBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsT0FBT0Msa0JBQVAsTUFBK0IsMkJBQS9CO0FBQ0EsU0FBU0MsSUFBVCxFQUFlQyxHQUFmLFFBQTBCLFdBQTFCO0FBQ0EsU0FB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YyxVQVBXLGdCQU9YQSxVQVBXOztBQVNiLFlBQU1hLFlBQVliLGFBQ2RjLEtBQUtDLElBQUwsQ0FBVWYsV0FBV2dCLFNBQVgsR0FBdUJoQixXQUFXUSxRQUE1QyxDQURjLEdBQzBDLENBRDVEO0FBRUEsWUFBTVMsUUFBUSxFQUFkO0FBQ0EsYUFBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLEtBQUtMLFNBQXJCLEVBQWdDSyxHQUFoQyxFQUFxQztBQUNuQ0QsZ0JBQU1FLElBQU4sQ0FBV0QsQ0FBWDtBQUNEO0FBQ0QsZUFBUWxCLGFBQ047QUFBQywwQkFBRDtBQUFBLHVCQUFzQixNQUFLQyxLQUEzQixJQUFrQyxtQkFBV2hCLElBQVgsSUFBaUJlLFlBQVksSUFBN0IsR0FBbEM7QUFDR1ksa0JBREg7QUFFRTtBQUFDLHNCQUFEO0FBQUE7QUFDRSxnQ0FBQyxTQUFEO0FBQ0Usd0JBQVVyQixjQUFjQyxTQUQxQjtBQUVFLHdCQUFVLE1BQUtjLFFBRmpCO0FBR0Usa0JBQUcscUJBSEw7QUFJRSxzQkFBUXBCLGNBSlY7QUFLRSx1QkFBU2hCLEtBQUsrQyxLQUFMO0FBTFg7QUFERjtBQUZGLFNBRE0sR0FhSixvQkFBQyxnQkFBRCxFQUFzQixNQUFLaEIsS0FBM0IsQ0FiSjtBQWVELE9Bakg2QztBQUFBOztBQUFBO0FBQUEsSUFrQjVCbEMsTUFBTXFELGFBbEJzQixXQWtDdkNDLFlBbEN1QyxHQWtDeEI7QUFDcEJuQyxvQkFBZ0IsQ0FESTtBQUVwQmMsZ0JBQVlzQixTQUZRO0FBR3BCN0IsZ0JBQVk2QixTQUhRO0FBSXBCNUIsZUFBVzRCO0FBSlMsR0FsQ3dCOzs7QUFvSGhELFNBQU94QixLQUFQO0FBQ0QsQ0FySEQ7O0FBdUhBLGVBQWVuQixtQkFBZiIsImZpbGUiOiJwYWdpbmF0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLXBsdXNwbHVzICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgeyBMaXN0LCBNYXAgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IExpc3RJdGVtcyBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1saXN0LWl0ZW1zJztcbmltcG9ydCB7IHNldFBhZ2luYXRpb25QYWdlIH0gZnJvbSAnLi9kYXRhZ3JpZC5hY3Rpb25zJztcbmltcG9ydCBVdGlscyBmcm9tICcuL2RhdGFncmlkLnV0aWxzJztcblxuY29uc3QgUGFnaW5hdGlvbiA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGhlaWdodDogNDBweDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHdpZHRoOiAxMDAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbmA7XG5cbmNvbnN0IHBhZ2luYXRpb25Db21wb25lbnQgPSAoV3JhcHBlZENvbXBvbmVudCkgPT4ge1xuICBjb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUsIG93blByb3BzKSA9PiB7XG4gICAgY29uc3QgR1JJRCA9IG93blByb3BzLmdyaWQ7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBhZ2luYXRpb25QYWdlOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdwYWdpbmF0aW9uJywgJ3BhZ2UnXSksXG4gICAgICBmaWx0ZXJEYXRhOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ2NvbmZpZycsICdmaWx0ZXJpbmdEYXRhJywgJ2ZpbHRlckRhdGEnXSwgTWFwKCkpLFxuICAgICAgaXNDcmVhdGluZzogc3RhdGUuZGF0YWdyaWQuZ2V0SW4oW0dSSUQuaWQsICdzZXNzaW9uJywgJ2lzQ3JlYXRpbmcnXSwgZmFsc2UpLFxuICAgICAgaXNFZGl0aW5nOiBzdGF0ZS5kYXRhZ3JpZC5nZXRJbihbR1JJRC5pZCwgJ3Nlc3Npb24nLCAnaXNFZGl0aW5nJ10sIGZhbHNlKSxcbiAgICAgIHNvcnRDb2x1bW46IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ3NvcnRpbmdEYXRhJywgJ3NvcnRDb2x1bW4nXSwgbnVsbCksXG4gICAgICBzb3J0T3JkZXI6IHN0YXRlLmRhdGFncmlkLmdldEluKFtHUklELmlkLCAnY29uZmlnJywgJ3NvcnRpbmdEYXRhJywgJ3NvcnRPcmRlciddLCBudWxsKSxcbiAgICB9O1xuICB9O1xuXG4gIGNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+ICh7XG4gICAgc2V0UGFnaW5hdGlvblBhZ2U6IChncmlkLCBwYWdlKSA9PiBkaXNwYXRjaChzZXRQYWdpbmF0aW9uUGFnZShncmlkLCBwYWdlKSksXG4gIH0pO1xuXG4gIEBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKVxuICBjbGFzcyBQYWdlciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICBmaWx0ZXJEYXRhOiBJbW11dGFibGVQcm9wVHlwZXMubWFwLmlzUmVxdWlyZWQsXG4gICAgICBwYWdpbmF0aW9uUGFnZTogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIHBhZ2luYXRpb246IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIHBhZ2VTaXplOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgIHRvdGFsU2l6ZTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICBnZXREYXRhOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgfSksXG4gICAgICBzb3J0Q29sdW1uOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIF0pLFxuICAgICAgc29ydE9yZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIH07XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgcGFnaW5hdGlvblBhZ2U6IDEsXG4gICAgICBwYWdpbmF0aW9uOiB1bmRlZmluZWQsXG4gICAgICBzb3J0Q29sdW1uOiB1bmRlZmluZWQsXG4gICAgICBzb3J0T3JkZXI6IHVuZGVmaW5lZCxcbiAgICB9O1xuXG4gICAgY29tcG9uZW50RGlkTW91bnQgPSAoKSA9PiB7XG4gICAgICBjb25zdCB7IHBhZ2luYXRpb24gfSA9IHRoaXMucHJvcHM7XG4gICAgICBpZiAocGFnaW5hdGlvbikgdGhpcy5yZXF1ZXN0RGF0YSgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSA9IChwcmV2UHJvcHMpID0+IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgZmlsdGVyRGF0YSxcbiAgICAgICAgcGFnaW5hdGlvbixcbiAgICAgICAgcGFnaW5hdGlvblBhZ2UsXG4gICAgICAgIHNvcnRDb2x1bW4sXG4gICAgICAgIHNvcnRPcmRlcixcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuICAgICAgaWYgKHBhZ2luYXRpb24gJiYgIWZpbHRlckRhdGEuZXF1YWxzKHByZXZQcm9wcy5maWx0ZXJEYXRhKSAmJiBwYWdpbmF0aW9uUGFnZSA+IDEpIHtcbiAgICAgICAgdGhpcy5nb3RvUGFnZSgxKTtcbiAgICAgIH0gZWxzZSBpZiAocGFnaW5hdGlvbiAmJiAoXG4gICAgICAgICFmaWx0ZXJEYXRhLmVxdWFscyhwcmV2UHJvcHMuZmlsdGVyRGF0YSkgfHxcbiAgICAgICAgcGFnaW5hdGlvblBhZ2UgIT09IHByZXZQcm9wcy5wYWdpbmF0aW9uUGFnZSB8fFxuICAgICAgICBzb3J0Q29sdW1uICE9PSBwcmV2UHJvcHMuc29ydENvbHVtbiB8fFxuICAgICAgICBzb3J0T3JkZXIgIT09IHByZXZQcm9wcy5zb3J0T3JkZXIpKSB7XG4gICAgICAgIHRoaXMucmVxdWVzdERhdGEoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmVxdWVzdERhdGEgPSAoKSA9PiB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGZpbHRlckRhdGEsXG4gICAgICAgIHBhZ2luYXRpb24sXG4gICAgICAgIHBhZ2luYXRpb25QYWdlLFxuICAgICAgICBzb3J0Q29sdW1uLFxuICAgICAgICBzb3J0T3JkZXIsXG4gICAgICB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IG9mZnNldCA9ICgocGFnaW5hdGlvblBhZ2UpIC0gMSkgKiBwYWdpbmF0aW9uLnBhZ2VTaXplO1xuICAgICAgcGFnaW5hdGlvbi5nZXREYXRhKG9mZnNldCwgcGFnaW5hdGlvbi5wYWdlU2l6ZSwgZmlsdGVyRGF0YSwgc29ydENvbHVtbiwgc29ydE9yZGVyKTtcbiAgICB9XG5cbiAgICBnb3RvUGFnZSA9IChwYWdlKSA9PiB7XG4gICAgICBjb25zdCB7IGdyaWQgfSA9IHRoaXMucHJvcHM7XG4gICAgICB0aGlzLnByb3BzLnNldFBhZ2luYXRpb25QYWdlKGdyaWQsIHBhZ2UpO1xuICAgICAgVXRpbHMuc2F2ZVBhZ2luYXRpb25QYWdlKGdyaWQsIHsgcGFnZSB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIgPSAoKSA9PiB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGNoaWxkcmVuLFxuICAgICAgICBncmlkLFxuICAgICAgICBpc0NyZWF0aW5nLFxuICAgICAgICBpc0VkaXRpbmcsXG4gICAgICAgIHBhZ2luYXRpb25QYWdlLFxuICAgICAgICBwYWdpbmF0aW9uLFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCBwYWdlQ291bnQgPSBwYWdpbmF0aW9uXG4gICAgICAgID8gTWF0aC5jZWlsKHBhZ2luYXRpb24udG90YWxTaXplIC8gcGFnaW5hdGlvbi5wYWdlU2l6ZSkgOiAxO1xuICAgICAgY29uc3QgcGFnZXMgPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IHBhZ2VDb3VudDsgaSsrKSB7XG4gICAgICAgIHBhZ2VzLnB1c2goaSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gKHBhZ2luYXRpb24gP1xuICAgICAgICA8V3JhcHBlZENvbXBvbmVudCB7Li4udGhpcy5wcm9wc30gZ3JpZD17eyAuLi5ncmlkLCBwYWdpbmF0aW9uOiB0cnVlIH19PlxuICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgICA8UGFnaW5hdGlvbj5cbiAgICAgICAgICAgIDxMaXN0SXRlbXNcbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzQ3JlYXRpbmcgfHwgaXNFZGl0aW5nfVxuICAgICAgICAgICAgICBnb1RvSXRlbT17dGhpcy5nb3RvUGFnZX1cbiAgICAgICAgICAgICAgaWQ9XCJsaXN0UGFnaW5hdGlvbkl0ZW1zXCJcbiAgICAgICAgICAgICAgaXRlbUlkPXtwYWdpbmF0aW9uUGFnZX1cbiAgICAgICAgICAgICAgaXRlbUlkcz17TGlzdChwYWdlcyl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvUGFnaW5hdGlvbj5cbiAgICAgICAgPC9XcmFwcGVkQ29tcG9uZW50PlxuICAgICAgICA6IDxXcmFwcGVkQ29tcG9uZW50IHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gUGFnZXI7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBwYWdpbmF0aW9uQ29tcG9uZW50O1xuIl19