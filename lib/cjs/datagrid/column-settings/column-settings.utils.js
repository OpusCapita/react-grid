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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2V0dGluZ3MvY29sdW1uLXNldHRpbmdzLnV0aWxzLmpzIl0sIm5hbWVzIjpbImdldEF2YWlsYWJsZUNvbHVtbnMiLCJjb2x1bW5zIiwibWFwIiwiY29sIiwidmFsdWUiLCJnZXRDb2x1bW5LZXkiLCJsYWJlbCIsImhlYWRlciIsImlzTG9ja2VkIiwiZ2V0U2VsZWN0ZWRDb2x1bW5zIiwidmlzaWJsZUNvbHVtbnMiLCJzZWxlY3RlZENvbHVtbnMiLCJmb3JFYWNoIiwicHVzaCIsImdldEhpZGRlbkNvbHVtbnMiLCJhdmFpbGFibGVDb2x1bW5zIiwiaGlkZGVuQ29sdW1ucyIsImZpbmRJbmRleCIsImkiLCJnZXRDb2x1bW5PcmRlcnMiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7Ozs7O2tCQUVlO0FBQ2JBLHVCQUFxQjtBQUFBLFdBQ25CQyxRQUFRQyxHQUFSLENBQVksVUFBQ0MsR0FBRCxFQUFTO0FBQ25CLFVBQU1DLFFBQVEsbUJBQU1DLFlBQU4sQ0FBbUJGLEdBQW5CLENBQWQ7QUFDQSxVQUFNRyxRQUFRSCxJQUFJSSxNQUFsQjtBQUNBLFVBQU1DLFdBQVdMLElBQUlLLFFBQXJCO0FBQ0EsYUFBTyxFQUFFQSxrQkFBRixFQUFZRixZQUFaLEVBQW1CRixZQUFuQixFQUFQO0FBQ0QsS0FMRCxDQURtQjtBQUFBLEdBRFI7QUFTYkssc0JBQW9CLDRCQUFDUixPQUFELEVBQVVTLGNBQVYsRUFBNkI7QUFDL0MsUUFBTUMsa0JBQWtCLEVBQXhCO0FBQ0FELG1CQUFlRSxPQUFmLENBQXVCLFVBQUNSLEtBQUQsRUFBVztBQUNoQ0gsY0FBUVcsT0FBUixDQUFnQixVQUFDVCxHQUFELEVBQVM7QUFDdkIsWUFBSSxtQkFBTUUsWUFBTixDQUFtQkYsR0FBbkIsTUFBNEJDLEtBQWhDLEVBQXVDO0FBQ3JDLGNBQU1FLFFBQVFILElBQUlJLE1BQWxCO0FBQ0EsY0FBTUMsV0FBV0wsSUFBSUssUUFBckI7QUFDQUcsMEJBQWdCRSxJQUFoQixDQUFxQixFQUFFTCxrQkFBRixFQUFZRixZQUFaLEVBQW1CRixZQUFuQixFQUFyQjtBQUNEO0FBQ0YsT0FORDtBQU9ELEtBUkQ7QUFTQSxXQUFPTyxlQUFQO0FBQ0QsR0FyQlk7QUFzQmJHLG9CQUFrQiwwQkFBQ0MsZ0JBQUQsRUFBbUJKLGVBQW5CLEVBQXVDO0FBQ3ZELFFBQU1LLGdCQUFnQixFQUF0QjtBQUNBRCxxQkFBaUJILE9BQWpCLENBQXlCLFVBQUNULEdBQUQsRUFBUztBQUNoQyxVQUFJUSxnQkFBZ0JNLFNBQWhCLENBQTBCO0FBQUEsZUFBS0MsRUFBRWQsS0FBRixLQUFZRCxJQUFJQyxLQUFyQjtBQUFBLE9BQTFCLE1BQTBELENBQUMsQ0FBL0QsRUFBa0U7QUFDaEVZLHNCQUFjSCxJQUFkLENBQW1CVixJQUFJQyxLQUF2QjtBQUNEO0FBQ0YsS0FKRDtBQUtBLFdBQU9ZLGFBQVA7QUFDRCxHQTlCWTtBQStCYkcsbUJBQWlCO0FBQUEsV0FBbUJSLGdCQUFnQlQsR0FBaEIsQ0FBb0I7QUFBQSxhQUFPQyxJQUFJQyxLQUFYO0FBQUEsS0FBcEIsQ0FBbkI7QUFBQTtBQS9CSixDIiwiZmlsZSI6ImNvbHVtbi1zZXR0aW5ncy51dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBVdGlscyBmcm9tICcuLi9kYXRhZ3JpZC51dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZ2V0QXZhaWxhYmxlQ29sdW1uczogY29sdW1ucyA9PiAoXG4gICAgY29sdW1ucy5tYXAoKGNvbCkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSBVdGlscy5nZXRDb2x1bW5LZXkoY29sKTtcbiAgICAgIGNvbnN0IGxhYmVsID0gY29sLmhlYWRlcjtcbiAgICAgIGNvbnN0IGlzTG9ja2VkID0gY29sLmlzTG9ja2VkO1xuICAgICAgcmV0dXJuIHsgaXNMb2NrZWQsIGxhYmVsLCB2YWx1ZSB9O1xuICAgIH0pXG4gICksXG4gIGdldFNlbGVjdGVkQ29sdW1uczogKGNvbHVtbnMsIHZpc2libGVDb2x1bW5zKSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0ZWRDb2x1bW5zID0gW107XG4gICAgdmlzaWJsZUNvbHVtbnMuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICAgIGlmIChVdGlscy5nZXRDb2x1bW5LZXkoY29sKSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICBjb25zdCBsYWJlbCA9IGNvbC5oZWFkZXI7XG4gICAgICAgICAgY29uc3QgaXNMb2NrZWQgPSBjb2wuaXNMb2NrZWQ7XG4gICAgICAgICAgc2VsZWN0ZWRDb2x1bW5zLnB1c2goeyBpc0xvY2tlZCwgbGFiZWwsIHZhbHVlIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gc2VsZWN0ZWRDb2x1bW5zO1xuICB9LFxuICBnZXRIaWRkZW5Db2x1bW5zOiAoYXZhaWxhYmxlQ29sdW1ucywgc2VsZWN0ZWRDb2x1bW5zKSA9PiB7XG4gICAgY29uc3QgaGlkZGVuQ29sdW1ucyA9IFtdO1xuICAgIGF2YWlsYWJsZUNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICBpZiAoc2VsZWN0ZWRDb2x1bW5zLmZpbmRJbmRleChpID0+IGkudmFsdWUgPT09IGNvbC52YWx1ZSkgPT09IC0xKSB7XG4gICAgICAgIGhpZGRlbkNvbHVtbnMucHVzaChjb2wudmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBoaWRkZW5Db2x1bW5zO1xuICB9LFxuICBnZXRDb2x1bW5PcmRlcnM6IHNlbGVjdGVkQ29sdW1ucyA9PiBzZWxlY3RlZENvbHVtbnMubWFwKGNvbCA9PiBjb2wudmFsdWUpLFxufTtcbiJdfQ==