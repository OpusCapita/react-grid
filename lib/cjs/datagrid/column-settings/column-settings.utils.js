"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _datagrid = _interopRequireDefault(require("../datagrid.utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  getAvailableColumns: function getAvailableColumns(columns) {
    return columns.map(function (col) {
      var value = _datagrid["default"].getColumnKey(col);

      var label = col.header;
      var isLocked = col.isLocked;
      return {
        isLocked: isLocked,
        label: label,
        value: value
      };
    });
  },
  getSelectedColumns: function getSelectedColumns(columns, visibleColumns) {
    var selectedColumns = [];
    visibleColumns.forEach(function (value) {
      columns.forEach(function (col) {
        if (_datagrid["default"].getColumnKey(col) === value) {
          var label = col.header;
          var isLocked = col.isLocked;
          selectedColumns.push({
            isLocked: isLocked,
            label: label,
            value: value
          });
        }
      });
    });
    return selectedColumns;
  },
  getHiddenColumns: function getHiddenColumns(availableColumns, selectedColumns) {
    var hiddenColumns = [];
    availableColumns.forEach(function (col) {
      if (selectedColumns.findIndex(function (i) {
        return i.value === col.value;
      }) === -1) {
        hiddenColumns.push(col.value);
      }
    });
    return hiddenColumns;
  },
  getColumnOrders: function getColumnOrders(selectedColumns) {
    return selectedColumns.map(function (col) {
      return col.value;
    });
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2V0dGluZ3MvY29sdW1uLXNldHRpbmdzLnV0aWxzLmpzIl0sIm5hbWVzIjpbImdldEF2YWlsYWJsZUNvbHVtbnMiLCJjb2x1bW5zIiwibWFwIiwiY29sIiwidmFsdWUiLCJVdGlscyIsImdldENvbHVtbktleSIsImxhYmVsIiwiaGVhZGVyIiwiaXNMb2NrZWQiLCJnZXRTZWxlY3RlZENvbHVtbnMiLCJ2aXNpYmxlQ29sdW1ucyIsInNlbGVjdGVkQ29sdW1ucyIsImZvckVhY2giLCJwdXNoIiwiZ2V0SGlkZGVuQ29sdW1ucyIsImF2YWlsYWJsZUNvbHVtbnMiLCJoaWRkZW5Db2x1bW5zIiwiZmluZEluZGV4IiwiaSIsImdldENvbHVtbk9yZGVycyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7OztlQUVlO0FBQ2JBLEVBQUFBLG1CQUFtQixFQUFFLDZCQUFBQyxPQUFPO0FBQUEsV0FBSUEsT0FBTyxDQUFDQyxHQUFSLENBQVksVUFBQ0MsR0FBRCxFQUFTO0FBQ25ELFVBQU1DLEtBQUssR0FBR0MscUJBQU1DLFlBQU4sQ0FBbUJILEdBQW5CLENBQWQ7O0FBQ0EsVUFBTUksS0FBSyxHQUFHSixHQUFHLENBQUNLLE1BQWxCO0FBRm1ELFVBRzNDQyxRQUgyQyxHQUc5Qk4sR0FIOEIsQ0FHM0NNLFFBSDJDO0FBSW5ELGFBQU87QUFBRUEsUUFBQUEsUUFBUSxFQUFSQSxRQUFGO0FBQVlGLFFBQUFBLEtBQUssRUFBTEEsS0FBWjtBQUFtQkgsUUFBQUEsS0FBSyxFQUFMQTtBQUFuQixPQUFQO0FBQ0QsS0FMK0IsQ0FBSjtBQUFBLEdBRGY7QUFPYk0sRUFBQUEsa0JBQWtCLEVBQUUsNEJBQUNULE9BQUQsRUFBVVUsY0FBVixFQUE2QjtBQUMvQyxRQUFNQyxlQUFlLEdBQUcsRUFBeEI7QUFDQUQsSUFBQUEsY0FBYyxDQUFDRSxPQUFmLENBQXVCLFVBQUNULEtBQUQsRUFBVztBQUNoQ0gsTUFBQUEsT0FBTyxDQUFDWSxPQUFSLENBQWdCLFVBQUNWLEdBQUQsRUFBUztBQUN2QixZQUFJRSxxQkFBTUMsWUFBTixDQUFtQkgsR0FBbkIsTUFBNEJDLEtBQWhDLEVBQXVDO0FBQ3JDLGNBQU1HLEtBQUssR0FBR0osR0FBRyxDQUFDSyxNQUFsQjtBQURxQyxjQUU3QkMsUUFGNkIsR0FFaEJOLEdBRmdCLENBRTdCTSxRQUY2QjtBQUdyQ0csVUFBQUEsZUFBZSxDQUFDRSxJQUFoQixDQUFxQjtBQUFFTCxZQUFBQSxRQUFRLEVBQVJBLFFBQUY7QUFBWUYsWUFBQUEsS0FBSyxFQUFMQSxLQUFaO0FBQW1CSCxZQUFBQSxLQUFLLEVBQUxBO0FBQW5CLFdBQXJCO0FBQ0Q7QUFDRixPQU5EO0FBT0QsS0FSRDtBQVNBLFdBQU9RLGVBQVA7QUFDRCxHQW5CWTtBQW9CYkcsRUFBQUEsZ0JBQWdCLEVBQUUsMEJBQUNDLGdCQUFELEVBQW1CSixlQUFuQixFQUF1QztBQUN2RCxRQUFNSyxhQUFhLEdBQUcsRUFBdEI7QUFDQUQsSUFBQUEsZ0JBQWdCLENBQUNILE9BQWpCLENBQXlCLFVBQUNWLEdBQUQsRUFBUztBQUNoQyxVQUFJUyxlQUFlLENBQUNNLFNBQWhCLENBQTBCLFVBQUFDLENBQUM7QUFBQSxlQUFJQSxDQUFDLENBQUNmLEtBQUYsS0FBWUQsR0FBRyxDQUFDQyxLQUFwQjtBQUFBLE9BQTNCLE1BQTBELENBQUMsQ0FBL0QsRUFBa0U7QUFDaEVhLFFBQUFBLGFBQWEsQ0FBQ0gsSUFBZCxDQUFtQlgsR0FBRyxDQUFDQyxLQUF2QjtBQUNEO0FBQ0YsS0FKRDtBQUtBLFdBQU9hLGFBQVA7QUFDRCxHQTVCWTtBQTZCYkcsRUFBQUEsZUFBZSxFQUFFLHlCQUFBUixlQUFlO0FBQUEsV0FBSUEsZUFBZSxDQUFDVixHQUFoQixDQUFvQixVQUFBQyxHQUFHO0FBQUEsYUFBSUEsR0FBRyxDQUFDQyxLQUFSO0FBQUEsS0FBdkIsQ0FBSjtBQUFBO0FBN0JuQixDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFV0aWxzIGZyb20gJy4uL2RhdGFncmlkLnV0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBnZXRBdmFpbGFibGVDb2x1bW5zOiBjb2x1bW5zID0+IGNvbHVtbnMubWFwKChjb2wpID0+IHtcbiAgICBjb25zdCB2YWx1ZSA9IFV0aWxzLmdldENvbHVtbktleShjb2wpO1xuICAgIGNvbnN0IGxhYmVsID0gY29sLmhlYWRlcjtcbiAgICBjb25zdCB7IGlzTG9ja2VkIH0gPSBjb2w7XG4gICAgcmV0dXJuIHsgaXNMb2NrZWQsIGxhYmVsLCB2YWx1ZSB9O1xuICB9KSxcbiAgZ2V0U2VsZWN0ZWRDb2x1bW5zOiAoY29sdW1ucywgdmlzaWJsZUNvbHVtbnMpID0+IHtcbiAgICBjb25zdCBzZWxlY3RlZENvbHVtbnMgPSBbXTtcbiAgICB2aXNpYmxlQ29sdW1ucy5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuICAgICAgY29sdW1ucy5mb3JFYWNoKChjb2wpID0+IHtcbiAgICAgICAgaWYgKFV0aWxzLmdldENvbHVtbktleShjb2wpID09PSB2YWx1ZSkge1xuICAgICAgICAgIGNvbnN0IGxhYmVsID0gY29sLmhlYWRlcjtcbiAgICAgICAgICBjb25zdCB7IGlzTG9ja2VkIH0gPSBjb2w7XG4gICAgICAgICAgc2VsZWN0ZWRDb2x1bW5zLnB1c2goeyBpc0xvY2tlZCwgbGFiZWwsIHZhbHVlIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gc2VsZWN0ZWRDb2x1bW5zO1xuICB9LFxuICBnZXRIaWRkZW5Db2x1bW5zOiAoYXZhaWxhYmxlQ29sdW1ucywgc2VsZWN0ZWRDb2x1bW5zKSA9PiB7XG4gICAgY29uc3QgaGlkZGVuQ29sdW1ucyA9IFtdO1xuICAgIGF2YWlsYWJsZUNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICBpZiAoc2VsZWN0ZWRDb2x1bW5zLmZpbmRJbmRleChpID0+IGkudmFsdWUgPT09IGNvbC52YWx1ZSkgPT09IC0xKSB7XG4gICAgICAgIGhpZGRlbkNvbHVtbnMucHVzaChjb2wudmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBoaWRkZW5Db2x1bW5zO1xuICB9LFxuICBnZXRDb2x1bW5PcmRlcnM6IHNlbGVjdGVkQ29sdW1ucyA9PiBzZWxlY3RlZENvbHVtbnMubWFwKGNvbCA9PiBjb2wudmFsdWUpLFxufTtcbiJdfQ==