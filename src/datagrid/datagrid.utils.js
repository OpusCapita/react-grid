/* eslint-disable no-nested-ternary */
import moment from 'moment';
import isNaN from 'lodash/isNaN';

const getColumnKey = col => (
  col.columnKey || col.valueKeyPath.join('/')
);

const combineColumnConfig = (cols, columnWidths, hiddenColumns, columnOrder) => {
  const conf = {};
  let columnOrdersFound = 0;
  cols.forEach((col, order) => {
    const columnKey = getColumnKey(col);
    conf[columnKey] = {
      width: (columnWidths && columnWidths[columnKey] !== undefined) ?
        columnWidths[columnKey] :
        col.width,
      hidden: hiddenColumns && hiddenColumns.indexOf(columnKey !== -1),
      order,
    };
    if (columnOrder && columnOrder.indexOf(columnKey)) columnOrdersFound += 1;
  });
  if (columnOrdersFound === cols.length) {
    // columnOrder has all columns, config OK!
    columnOrder.forEach((columnKey, order) => {
      conf[columnKey].order = order;
    });
  }
  return conf;
};

export default {
  getColumnKey,
  getColumnDefaultValues: (cols) => {
    const columnDefaultValues = {};
    cols.forEach((col) => {
      if (col.defaultValue !== undefined) {
        columnDefaultValues[getColumnKey(col)] = col.defaultValue;
      }
    });
    return columnDefaultValues;
  },
  getCellStyleByCol: (col) => {
    if (col.align) {
      return {
        textAlign: col.align,
      };
    }
    // No default align if component is select
    // Because rendered data is most likely text
    // Even if valueType is number
    if (col.componentType === 'select') {
      return {};
    }
    switch (col.valueType) {
      case 'number':
      case 'float':
      case 'date':
        return {
          textAlign: 'right',
        };
      default:
        return {};
    }
  },
  isSortable: col => (
    col.valueType &&
    (col.sortValueGetter || col.valueKeyPath) &&
    !col.disableSorting
  ),
  getSortComparator: (col) => {
    if (col.sortComparator) {
      return col.sortComparator;
    }
    switch (col.valueType) {
      case 'text':
        return (a, b) => (a && a.localeCompare ? a.localeCompare(b) : 1);
      case 'number':
        return (a, b) => (a === b ? 0 : (a < b ? -1 : 1));
      case 'float':
        return (a, b) => (a === b ? 0 : (a < b ? -1 : 1));
      case 'boolean':
        return (a, b) => (a === b ? 0 : (a ? -1 : 1));
      case 'date':
        return (a, b) => new Date(b) - new Date(a);
      default:
        return (a, b) => (a && a.localeCompare ? a.localeCompare(b) : 1);
    }
  },
  getSortValueGetter: (col) => {
    if (col.sortValueGetter) {
      return col.sortValueGetter;
    }
    return data => data.getIn(col.valueKeyPath);
  },
  getFilterFunctions: (col) => {
    const filterFunctions = {
      valueEmptyChecker: val => val === '' || val === null || val === undefined,
      filterMatcher: (val, filterVal) => (new RegExp(filterVal, 'i')).test(val),
    };
    switch (col.valueType) {
      case 'text':
        break;
      case 'number':
        filterFunctions.valueEmptyChecker = (
          val => val === '' ||
          isNaN(val) ||
          val === null ||
          val === undefined
        );
        filterFunctions.filterMatcher = (val, filterVal) =>
          parseInt(val, 10) === parseInt(filterVal, 10);
        break;
      case 'float':
        filterFunctions.valueEmptyChecker = val => (
          val === '' ||
          isNaN(val) ||
          val === null ||
          val === undefined
        );
        filterFunctions.filterMatcher = (val, filterVal) => {
          const parsedFilterVal = filterVal.replace(',', '.');
          return parseFloat(parsedFilterVal) === val;
        };
        break;
      case 'boolean':
        filterFunctions.filterMatcher = (val, filterVal) => val === filterVal;
        break;
      case 'date':
        filterFunctions.filterMatcher = (val, filterVal) =>
          moment(filterVal, 'L').isSame(val, 'day');
        break;
      case 'select':
        filterFunctions.filterMatcher = (val, filterVal) => val === filterVal;
        break;
      default:
    }
    if (col.valueEmptyChecker) {
      filterFunctions.valueEmptyChecker = col.valueEmptyChecker;
    }
    if (col.filterMatcher) {
      filterFunctions.filterMatcher = col.filterMatcher;
    }
    return filterFunctions;
  },
  loadSelectedItems: (grid) => {
    const sessionItem = sessionStorage.getItem(`oc_grid_selectedItems_${grid.id}`);
    if (sessionItem && !grid.disableRememberSelectedItems) {
      try { return JSON.parse(sessionItem); } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Datagrid: error parsing selectedItems from sessionStorage', e);
      }
    }
    return [];
  },
  loadGridConfig: (grid, cols) => {
    const columnWidths = localStorage.getItem(`oc_grid_columnWidths_${grid.id}`);
    const hiddenColumns = localStorage.getItem(`oc_grid_hiddenColumns_${grid.id}`);
    const columnOrders = localStorage.getItem(`oc_grid_columnOrders_${grid.id}`);
    const sortingData = sessionStorage.getItem(`oc_grid_sorting_${grid.id}`);
    const filterData = sessionStorage.getItem(`oc_grid_filtering_${grid.id}`);
    const isFilteringData = localStorage.getItem(`oc_grid_isFiltering_${grid.id}`);
    let parsedColWidths;
    let parsedHiddenCols;
    let parsedColOrders;
    let isFiltering = false;
    if (isFilteringData && !grid.disableRememberIsFiltering) {
      try { isFiltering = JSON.parse(isFilteringData); } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Datagrid: error parsing isFilteringData from localStorage', e);
      }
    }
    if (columnWidths && !grid.disableRememberColumnWidths) {
      try { parsedColWidths = JSON.parse(columnWidths); } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Datagrid: error parsing columnWidths from localStorage', e);
      }
    }
    if (hiddenColumns) {
      try { parsedHiddenCols = JSON.parse(hiddenColumns); } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Datagrid: error parsing hiddenColumns from localStorage', e);
      }
    }
    if (columnOrders) {
      try { parsedColOrders = JSON.parse(columnOrders); } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Datagrid: error parsing columnOrders from localStorage', e);
      }
    }
    const config = {
      columns: combineColumnConfig(cols, parsedColWidths, parsedHiddenCols, parsedColOrders),
      filteringData: {
        isFiltering,
      },
    };
    if (sortingData && !grid.disableRememberSortData) {
      try { config.sortingData = JSON.parse(sortingData); } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Datagrid: error parsing sortingData from sessionStorage', e);
      }
    }
    if (filterData && isFiltering && !grid.disableRememberFilteData) {
      try { config.filteringData.filterData = JSON.parse(filterData); } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Datagrid: error parsing filterData from sessionStorage', e);
      }
    }
    return config;
  },
  saveSelectedItems: (grid, selectedItems) => {
    if (grid.disableRememberSelectedItems) return false;
    if (!selectedItems) return false;
    sessionStorage.setItem(`oc_grid_selectedItems_${grid.id}`, JSON.stringify(selectedItems));
    return true;
  },
  saveColumnWidth: (grid, columnKey, columnWidth) => {
    if (grid.disableRememberColumnWidths) return false;
    if (!columnKey || !columnWidth) return false;
    let columnWidths = {};
    const storedColumnWidths = localStorage.getItem(`oc_grid_columnWidths_${grid.id}`);
    if (storedColumnWidths) {
      let parsed;
      try {
        parsed = JSON.parse(storedColumnWidths);
        columnWidths = parsed;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Datagrid: error parsing columnWidths from localStorage', e);
      }
    }
    columnWidths[columnKey] = columnWidth;
    localStorage.setItem(`oc_grid_columnWidths_${grid.id}`, JSON.stringify(columnWidths));
    return true;
  },
  saveHiddenColumns: (grid, hiddenColumns) => {
    if (!hiddenColumns) return false;
    localStorage.setItem(`oc_grid_hiddenColumns_${grid.id}`, JSON.stringify(hiddenColumns));
    return true;
  },
  saveColumnOrders: (grid, columnOrders) => {
    if (!columnOrders) return false;
    localStorage.setItem(`oc_grid_columnWidths_${grid.id}`, JSON.stringify(columnOrders));
    return true;
  },
  saveSortData: (grid, sortingData) => {
    if (grid.disableRememberSortData) return false;
    if (!sortingData) return false;
    sessionStorage.setItem(`oc_grid_sorting_${grid.id}`, JSON.stringify(sortingData));
    return true;
  },
  saveFilterData: (grid, filterData) => {
    if (grid.disableRememberFilteData) return false;
    if (!filterData) return false;
    sessionStorage.setItem(`oc_grid_filtering_${grid.id}`, JSON.stringify(filterData));
    return true;
  },
  saveIsFiltering: (grid, isFiltering) => {
    if (grid.disableRememberIsFiltering) return false;
    if (isFiltering === undefined) return false;
    localStorage.setItem(`oc_grid_isFiltering_${grid.id}`, JSON.stringify(isFiltering));
    if (!isFiltering) {
      sessionStorage.removeItem(`oc_grid_filtering_${grid.id}`);
    }
    return true;
  },
  /* eslint-disable max-len */
  checkGridParam: (gridParam) => {
    if (gridParam) {
      if (!gridParam.id) {
        throw new Error('[Grid] Invalid `grid.id` parameter, update action parameters to new format!');
      }
      if (!gridParam.idKeyPath) {
        throw new Error('[Grid] Invalid `grid.idKeyPath` parameter, update action parameters to new format!');
      }
    } else {
      throw new Error('[Grid] Invalid `grid` parameter, update action parameters to new format!');
    }
  },
  checkColumnsParam: (columnsParam) => {
    if (!columnsParam) {
      throw new Error('[Grid] Invalid `columns` parameter, update action parameters to new format!');
    }
  },
};
