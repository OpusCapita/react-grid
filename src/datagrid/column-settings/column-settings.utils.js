import Utils from '../datagrid.utils';

export default {
  getAvailableColumns: columns => (
    columns.map((col) => {
      const value = Utils.getColumnKey(col);
      const label = col.header;
      const { isLocked } = col;
      return { isLocked, label, value };
    })
  ),
  getSelectedColumns: (columns, visibleColumns) => {
    const selectedColumns = [];
    visibleColumns.forEach((value) => {
      columns.forEach((col) => {
        if (Utils.getColumnKey(col) === value) {
          const label = col.header;
          const { isLocked } = col;
          selectedColumns.push({ isLocked, label, value });
        }
      });
    });
    return selectedColumns;
  },
  getHiddenColumns: (availableColumns, selectedColumns) => {
    const hiddenColumns = [];
    availableColumns.forEach((col) => {
      if (selectedColumns.findIndex(i => i.value === col.value) === -1) {
        hiddenColumns.push(col.value);
      }
    });
    return hiddenColumns;
  },
  getColumnOrders: selectedColumns => selectedColumns.map(col => col.value),
};
