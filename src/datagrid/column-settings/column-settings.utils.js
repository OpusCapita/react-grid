import Utils from '../datagrid.utils';

export default {
  getAvailableColumns: columns => (
    columns.map((col) => {
      const key = Utils.getColumnKey(col);
      const label = col.header;
      const isLocked = col.isLocked;
      return {
        value: key,
        label,
        isLocked,
      };
    })
  ),

  getSelectedColumns: (availableColumns, selectedKeys) => (
    selectedKeys.map((col) => {
      const columnItem = availableColumns.filter(column => column.value === col).get(0);
      return {
        value: columnItem.value,
        label: columnItem.label,
        isLocked: columnItem.isLocked,
      };
    })
  ),

  getHiddenColumns: (availableColumns, selectedColumns) => {
    const hiddenColumns = [];
    availableColumns.forEach((col) => {
      if (selectedColumns.filter(column => column === col.value).size === 0) {
        hiddenColumns.push(col.value);
      }
    });
    return hiddenColumns;
  },

  getColumnOrders: selectedColumns => selectedColumns.map(col => col.value),
};
