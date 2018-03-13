import Utils from '../datagrid.utils';

export default {
  getAvailableColumns: function getAvailableColumns(columns) {
    return columns.map(function (col) {
      var value = Utils.getColumnKey(col);
      var label = col.header;
      var isLocked = col.isLocked;

      return { isLocked: isLocked, label: label, value: value };
    });
  },
  getSelectedColumns: function getSelectedColumns(columns, visibleColumns) {
    var selectedColumns = [];
    visibleColumns.forEach(function (value) {
      columns.forEach(function (col) {
        if (Utils.getColumnKey(col) === value) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9jb2x1bW4tc2V0dGluZ3MvY29sdW1uLXNldHRpbmdzLnV0aWxzLmpzIl0sIm5hbWVzIjpbIlV0aWxzIiwiZ2V0QXZhaWxhYmxlQ29sdW1ucyIsImNvbHVtbnMiLCJtYXAiLCJjb2wiLCJ2YWx1ZSIsImdldENvbHVtbktleSIsImxhYmVsIiwiaGVhZGVyIiwiaXNMb2NrZWQiLCJnZXRTZWxlY3RlZENvbHVtbnMiLCJ2aXNpYmxlQ29sdW1ucyIsInNlbGVjdGVkQ29sdW1ucyIsImZvckVhY2giLCJwdXNoIiwiZ2V0SGlkZGVuQ29sdW1ucyIsImF2YWlsYWJsZUNvbHVtbnMiLCJoaWRkZW5Db2x1bW5zIiwiZmluZEluZGV4IiwiaSIsImdldENvbHVtbk9yZGVycyJdLCJtYXBwaW5ncyI6IkFBQUEsT0FBT0EsS0FBUCxNQUFrQixtQkFBbEI7O0FBRUEsZUFBZTtBQUNiQyx1QkFBcUI7QUFBQSxXQUNuQkMsUUFBUUMsR0FBUixDQUFZLFVBQUNDLEdBQUQsRUFBUztBQUNuQixVQUFNQyxRQUFRTCxNQUFNTSxZQUFOLENBQW1CRixHQUFuQixDQUFkO0FBQ0EsVUFBTUcsUUFBUUgsSUFBSUksTUFBbEI7QUFGbUIsVUFHWEMsUUFIVyxHQUdFTCxHQUhGLENBR1hLLFFBSFc7O0FBSW5CLGFBQU8sRUFBRUEsa0JBQUYsRUFBWUYsWUFBWixFQUFtQkYsWUFBbkIsRUFBUDtBQUNELEtBTEQsQ0FEbUI7QUFBQSxHQURSO0FBU2JLLHNCQUFvQiw0QkFBQ1IsT0FBRCxFQUFVUyxjQUFWLEVBQTZCO0FBQy9DLFFBQU1DLGtCQUFrQixFQUF4QjtBQUNBRCxtQkFBZUUsT0FBZixDQUF1QixVQUFDUixLQUFELEVBQVc7QUFDaENILGNBQVFXLE9BQVIsQ0FBZ0IsVUFBQ1QsR0FBRCxFQUFTO0FBQ3ZCLFlBQUlKLE1BQU1NLFlBQU4sQ0FBbUJGLEdBQW5CLE1BQTRCQyxLQUFoQyxFQUF1QztBQUNyQyxjQUFNRSxRQUFRSCxJQUFJSSxNQUFsQjtBQURxQyxjQUU3QkMsUUFGNkIsR0FFaEJMLEdBRmdCLENBRTdCSyxRQUY2Qjs7QUFHckNHLDBCQUFnQkUsSUFBaEIsQ0FBcUIsRUFBRUwsa0JBQUYsRUFBWUYsWUFBWixFQUFtQkYsWUFBbkIsRUFBckI7QUFDRDtBQUNGLE9BTkQ7QUFPRCxLQVJEO0FBU0EsV0FBT08sZUFBUDtBQUNELEdBckJZO0FBc0JiRyxvQkFBa0IsMEJBQUNDLGdCQUFELEVBQW1CSixlQUFuQixFQUF1QztBQUN2RCxRQUFNSyxnQkFBZ0IsRUFBdEI7QUFDQUQscUJBQWlCSCxPQUFqQixDQUF5QixVQUFDVCxHQUFELEVBQVM7QUFDaEMsVUFBSVEsZ0JBQWdCTSxTQUFoQixDQUEwQjtBQUFBLGVBQUtDLEVBQUVkLEtBQUYsS0FBWUQsSUFBSUMsS0FBckI7QUFBQSxPQUExQixNQUEwRCxDQUFDLENBQS9ELEVBQWtFO0FBQ2hFWSxzQkFBY0gsSUFBZCxDQUFtQlYsSUFBSUMsS0FBdkI7QUFDRDtBQUNGLEtBSkQ7QUFLQSxXQUFPWSxhQUFQO0FBQ0QsR0E5Qlk7QUErQmJHLG1CQUFpQjtBQUFBLFdBQW1CUixnQkFBZ0JULEdBQWhCLENBQW9CO0FBQUEsYUFBT0MsSUFBSUMsS0FBWDtBQUFBLEtBQXBCLENBQW5CO0FBQUE7QUEvQkosQ0FBZiIsImZpbGUiOiJjb2x1bW4tc2V0dGluZ3MudXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVXRpbHMgZnJvbSAnLi4vZGF0YWdyaWQudXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGdldEF2YWlsYWJsZUNvbHVtbnM6IGNvbHVtbnMgPT4gKFxuICAgIGNvbHVtbnMubWFwKChjb2wpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gVXRpbHMuZ2V0Q29sdW1uS2V5KGNvbCk7XG4gICAgICBjb25zdCBsYWJlbCA9IGNvbC5oZWFkZXI7XG4gICAgICBjb25zdCB7IGlzTG9ja2VkIH0gPSBjb2w7XG4gICAgICByZXR1cm4geyBpc0xvY2tlZCwgbGFiZWwsIHZhbHVlIH07XG4gICAgfSlcbiAgKSxcbiAgZ2V0U2VsZWN0ZWRDb2x1bW5zOiAoY29sdW1ucywgdmlzaWJsZUNvbHVtbnMpID0+IHtcbiAgICBjb25zdCBzZWxlY3RlZENvbHVtbnMgPSBbXTtcbiAgICB2aXNpYmxlQ29sdW1ucy5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuICAgICAgY29sdW1ucy5mb3JFYWNoKChjb2wpID0+IHtcbiAgICAgICAgaWYgKFV0aWxzLmdldENvbHVtbktleShjb2wpID09PSB2YWx1ZSkge1xuICAgICAgICAgIGNvbnN0IGxhYmVsID0gY29sLmhlYWRlcjtcbiAgICAgICAgICBjb25zdCB7IGlzTG9ja2VkIH0gPSBjb2w7XG4gICAgICAgICAgc2VsZWN0ZWRDb2x1bW5zLnB1c2goeyBpc0xvY2tlZCwgbGFiZWwsIHZhbHVlIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gc2VsZWN0ZWRDb2x1bW5zO1xuICB9LFxuICBnZXRIaWRkZW5Db2x1bW5zOiAoYXZhaWxhYmxlQ29sdW1ucywgc2VsZWN0ZWRDb2x1bW5zKSA9PiB7XG4gICAgY29uc3QgaGlkZGVuQ29sdW1ucyA9IFtdO1xuICAgIGF2YWlsYWJsZUNvbHVtbnMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICBpZiAoc2VsZWN0ZWRDb2x1bW5zLmZpbmRJbmRleChpID0+IGkudmFsdWUgPT09IGNvbC52YWx1ZSkgPT09IC0xKSB7XG4gICAgICAgIGhpZGRlbkNvbHVtbnMucHVzaChjb2wudmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBoaWRkZW5Db2x1bW5zO1xuICB9LFxuICBnZXRDb2x1bW5PcmRlcnM6IHNlbGVjdGVkQ29sdW1ucyA9PiBzZWxlY3RlZENvbHVtbnMubWFwKGNvbCA9PiBjb2wudmFsdWUpLFxufTtcbiJdfQ==