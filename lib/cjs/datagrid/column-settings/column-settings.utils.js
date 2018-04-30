'use strict';

exports.__esModule = true;

var _datagrid = require('../datagrid.utils');

var _datagrid2 = _interopRequireDefault(_datagrid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  getAvailableColumns: function getAvailableColumns(columns) {
    return columns.map(function (col) {
      var value = _datagrid2.default.getColumnKey(col);
      var label = col.header;
      var isLocked = col.isLocked;

      return { isLocked: isLocked, label: label, value: value };
    });
  },
  getSelectedColumns: function getSelectedColumns(columns, visibleColumns) {
    var selectedColumns = [];
    visibleColumns.forEach(function (value) {
      columns.forEach(function (col) {
        if (_datagrid2.default.getColumnKey(col) === value) {
          var label = col.header;
          var isLocked = col.isLocked;

          selectedColumns.push({ isLocked: isLocked, label: label, value: value });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2V0dGluZ3MvY29sdW1uLXNldHRpbmdzLnV0aWxzLmpzIl0sIm5hbWVzIjpbImdldEF2YWlsYWJsZUNvbHVtbnMiLCJjb2x1bW5zIiwibWFwIiwiY29sIiwidmFsdWUiLCJnZXRDb2x1bW5LZXkiLCJsYWJlbCIsImhlYWRlciIsImlzTG9ja2VkIiwiZ2V0U2VsZWN0ZWRDb2x1bW5zIiwidmlzaWJsZUNvbHVtbnMiLCJzZWxlY3RlZENvbHVtbnMiLCJmb3JFYWNoIiwicHVzaCIsImdldEhpZGRlbkNvbHVtbnMiLCJhdmFpbGFibGVDb2x1bW5zIiwiaGlkZGVuQ29sdW1ucyIsImZpbmRJbmRleCIsImkiLCJnZXRDb2x1bW5PcmRlcnMiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7Ozs7O2tCQUVlO0FBQ2JBLHVCQUFxQjtBQUFBLFdBQ25CQyxRQUFRQyxHQUFSLENBQVksVUFBQ0MsR0FBRCxFQUFTO0FBQ25CLFVBQU1DLFFBQVEsbUJBQU1DLFlBQU4sQ0FBbUJGLEdBQW5CLENBQWQ7QUFDQSxVQUFNRyxRQUFRSCxJQUFJSSxNQUFsQjtBQUZtQixVQUdYQyxRQUhXLEdBR0VMLEdBSEYsQ0FHWEssUUFIVzs7QUFJbkIsYUFBTyxFQUFFQSxrQkFBRixFQUFZRixZQUFaLEVBQW1CRixZQUFuQixFQUFQO0FBQ0QsS0FMRCxDQURtQjtBQUFBLEdBRFI7QUFTYkssc0JBQW9CLDRCQUFDUixPQUFELEVBQVVTLGNBQVYsRUFBNkI7QUFDL0MsUUFBTUMsa0JBQWtCLEVBQXhCO0FBQ0FELG1CQUFlRSxPQUFmLENBQXVCLFVBQUNSLEtBQUQsRUFBVztBQUNoQ0gsY0FBUVcsT0FBUixDQUFnQixVQUFDVCxHQUFELEVBQVM7QUFDdkIsWUFBSSxtQkFBTUUsWUFBTixDQUFtQkYsR0FBbkIsTUFBNEJDLEtBQWhDLEVBQXVDO0FBQ3JDLGNBQU1FLFFBQVFILElBQUlJLE1BQWxCO0FBRHFDLGNBRTdCQyxRQUY2QixHQUVoQkwsR0FGZ0IsQ0FFN0JLLFFBRjZCOztBQUdyQ0csMEJBQWdCRSxJQUFoQixDQUFxQixFQUFFTCxrQkFBRixFQUFZRixZQUFaLEVBQW1CRixZQUFuQixFQUFyQjtBQUNEO0FBQ0YsT0FORDtBQU9ELEtBUkQ7QUFTQSxXQUFPTyxlQUFQO0FBQ0QsR0FyQlk7QUFzQmJHLG9CQUFrQiwwQkFBQ0MsZ0JBQUQsRUFBbUJKLGVBQW5CLEVBQXVDO0FBQ3ZELFFBQU1LLGdCQUFnQixFQUF0QjtBQUNBRCxxQkFBaUJILE9BQWpCLENBQXlCLFVBQUNULEdBQUQsRUFBUztBQUNoQyxVQUFJUSxnQkFBZ0JNLFNBQWhCLENBQTBCO0FBQUEsZUFBS0MsRUFBRWQsS0FBRixLQUFZRCxJQUFJQyxLQUFyQjtBQUFBLE9BQTFCLE1BQTBELENBQUMsQ0FBL0QsRUFBa0U7QUFDaEVZLHNCQUFjSCxJQUFkLENBQW1CVixJQUFJQyxLQUF2QjtBQUNEO0FBQ0YsS0FKRDtBQUtBLFdBQU9ZLGFBQVA7QUFDRCxHQTlCWTtBQStCYkcsbUJBQWlCO0FBQUEsV0FBbUJSLGdCQUFnQlQsR0FBaEIsQ0FBb0I7QUFBQSxhQUFPQyxJQUFJQyxLQUFYO0FBQUEsS0FBcEIsQ0FBbkI7QUFBQTtBQS9CSixDIiwiZmlsZSI6ImNvbHVtbi1zZXR0aW5ncy51dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBVdGlscyBmcm9tICcuLi9kYXRhZ3JpZC51dGlscyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgZ2V0QXZhaWxhYmxlQ29sdW1uczogY29sdW1ucyA9PiAoXHJcbiAgICBjb2x1bW5zLm1hcCgoY29sKSA9PiB7XHJcbiAgICAgIGNvbnN0IHZhbHVlID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCk7XHJcbiAgICAgIGNvbnN0IGxhYmVsID0gY29sLmhlYWRlcjtcclxuICAgICAgY29uc3QgeyBpc0xvY2tlZCB9ID0gY29sO1xyXG4gICAgICByZXR1cm4geyBpc0xvY2tlZCwgbGFiZWwsIHZhbHVlIH07XHJcbiAgICB9KVxyXG4gICksXHJcbiAgZ2V0U2VsZWN0ZWRDb2x1bW5zOiAoY29sdW1ucywgdmlzaWJsZUNvbHVtbnMpID0+IHtcclxuICAgIGNvbnN0IHNlbGVjdGVkQ29sdW1ucyA9IFtdO1xyXG4gICAgdmlzaWJsZUNvbHVtbnMuZm9yRWFjaCgodmFsdWUpID0+IHtcclxuICAgICAgY29sdW1ucy5mb3JFYWNoKChjb2wpID0+IHtcclxuICAgICAgICBpZiAoVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCkgPT09IHZhbHVlKSB7XHJcbiAgICAgICAgICBjb25zdCBsYWJlbCA9IGNvbC5oZWFkZXI7XHJcbiAgICAgICAgICBjb25zdCB7IGlzTG9ja2VkIH0gPSBjb2w7XHJcbiAgICAgICAgICBzZWxlY3RlZENvbHVtbnMucHVzaCh7IGlzTG9ja2VkLCBsYWJlbCwgdmFsdWUgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHNlbGVjdGVkQ29sdW1ucztcclxuICB9LFxyXG4gIGdldEhpZGRlbkNvbHVtbnM6IChhdmFpbGFibGVDb2x1bW5zLCBzZWxlY3RlZENvbHVtbnMpID0+IHtcclxuICAgIGNvbnN0IGhpZGRlbkNvbHVtbnMgPSBbXTtcclxuICAgIGF2YWlsYWJsZUNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XHJcbiAgICAgIGlmIChzZWxlY3RlZENvbHVtbnMuZmluZEluZGV4KGkgPT4gaS52YWx1ZSA9PT0gY29sLnZhbHVlKSA9PT0gLTEpIHtcclxuICAgICAgICBoaWRkZW5Db2x1bW5zLnB1c2goY29sLnZhbHVlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gaGlkZGVuQ29sdW1ucztcclxuICB9LFxyXG4gIGdldENvbHVtbk9yZGVyczogc2VsZWN0ZWRDb2x1bW5zID0+IHNlbGVjdGVkQ29sdW1ucy5tYXAoY29sID0+IGNvbC52YWx1ZSksXHJcbn07XHJcbiJdfQ==