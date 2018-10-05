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