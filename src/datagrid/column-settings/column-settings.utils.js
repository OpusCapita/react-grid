import { arrayMove } from 'react-sortable-hoc';
import Utils from '../datagrid.utils';

const escapeRegExp = /[-\\^$*+?.()|[\]{}]/g;
const escapeKeyword = keyword => keyword.replace(escapeRegExp, '\\$&');

export default {
  getAvailableColumns: (columns, visibleColumns) => (
    columns.map((col, i) => {
      const columnKey = Utils.getColumnKey(col);
      const name = col.header;
      const isLocked = col.isLocked;
      const isSelected = (visibleColumns.indexOf(columnKey) !== -1);
      const sort = i + 1;
      return {
        columnKey,
        name,
        isLocked,
        isSelected,
        sort,
      };
    })
  ),
  getSelectedColumns: (columns, visibleColumns) => {
    const selectedColumns = [];
    visibleColumns.forEach((columnKey, i) => {
      columns.forEach((col) => {
        if (Utils.getColumnKey(col) === columnKey) {
          const name = col.header;
          const isLocked = col.isLocked;
          const isSelected = true;
          const sort = i + 1;
          selectedColumns.push({
            columnKey,
            name,
            isLocked,
            isSelected,
            sort,
          });
        }
      });
    });
    return selectedColumns;
  },
  changeColumnSort: (columns, oldIndex, newIndex) => {
    let changeOverLockedItems = false;
    if (oldIndex + 1 < newIndex) {
      for (let i = oldIndex; i < newIndex; i += 1) {
        if (columns[i] && columns[i].isLocked) {
          changeOverLockedItems = true;
        }
      }
    }
    if (oldIndex > newIndex + 1) {
      for (let i = oldIndex; i > newIndex; i -= 1) {
        if (columns[i] && columns[i].isLocked) {
          changeOverLockedItems = true;
        }
      }
    }
    let sortedColumns = [];
    if (changeOverLockedItems) {
      // Swap items if sorting is done over locked item to keep it in place
      let i;
      i = columns.length;
      while (i > 0) {
        i -= 1;
        sortedColumns[i] = columns[i];
      }
      sortedColumns[oldIndex] = columns[newIndex];
      sortedColumns[newIndex] = columns[oldIndex];
    } else {
      // Normal sorting move all other items up/down
      sortedColumns = arrayMove(columns, oldIndex, newIndex);
    }
    return sortedColumns;
  },
  filterColumns: (columns, keyword) => {
    let filteredColumns;
    if (keyword !== '') {
      const regexp = new RegExp(escapeKeyword(keyword), 'i');
      filteredColumns = columns.filter(c => regexp.test(c.name));
    } else {
      filteredColumns = columns;
    }
    return filteredColumns;
  },
  getHiddenColumns: (availableColumns) => {
    const hiddenColumns = [];
    availableColumns.forEach((col) => {
      if (!col.isSelected) {
        hiddenColumns.push(col.columnKey);
      }
    });
    return hiddenColumns;
  },
  getColumnOrders: selectedColumns => selectedColumns.map(col => col.columnKey),
};
