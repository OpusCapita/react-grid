/* eslint-disable no-nested-ternary */
import moment from 'moment';
import isNaN from 'lodash/isNaN';
import { isFunction } from 'util';

const getColumnKey = col => (
  col.columnKey || col.valueKeyPath.join('/')
);

const getVisibleColumns = (cols, hiddenColumns = [], columnOrder = []) => {
  const orderedColumnList = [];
  cols.forEach((col, i) => {
    const columnKey = getColumnKey(col);
    if (hiddenColumns.indexOf(columnKey) === -1) {
      const colOrderIdx = columnOrder.indexOf(columnKey);
      const order = colOrderIdx !== -1 ? colOrderIdx : (i + 1);
      orderedColumnList.push({
        columnKey,
        order,
      });
    }
  });
  return orderedColumnList.sort((a, b) => (a.order - b.order)).map(item => item.columnKey);
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
        return (a, b) => (a.localeCompare ? a.localeCompare(b) : 1);
      case 'number':
        return (a, b) => (a - b);
      case 'float':
        return (a, b) => (a - b);
      case 'boolean':
        return (a, b) => (a === b ? 0 : (a ? -1 : 1));
      case 'date':
        return (a, b) => (new Date(b) - new Date(a));
      default:
        return (a, b) => (a.localeCompare ? a.localeCompare(b) : 1);
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
    const configStorage = grid.configStorage || {};
    const sortingData = sessionStorage.getItem(`oc_grid_sorting_${grid.id}`);
    const filterData = sessionStorage.getItem(`oc_grid_filtering_${grid.id}`);
    const isFilteringData = localStorage.getItem(`oc_grid_isFiltering_${grid.id}`);
    let loadedConfig = {};
    let hiddenColumns;
    let columnOrder;
    let isFiltering = false;

    if (isFunction(configStorage.load)) {
      loadedConfig = configStorage.load();
    }

    if (isFilteringData && !grid.disableRememberIsFiltering) {
      try { isFiltering = JSON.parse(isFilteringData); } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Datagrid: error parsing isFilteringData from localStorage', e);
      }
    }
    if (loadedConfig.hiddenColumns) {
      hiddenColumns = loadedConfig.hiddenColumns;
    } else {
      const hiddenColumnsJson = localStorage.getItem(`oc_grid_hiddenColumns_${grid.id}`);
      if (hiddenColumnsJson) {
        try { hiddenColumns = JSON.parse(hiddenColumnsJson); } catch (e) {
          // eslint-disable-next-line no-console
          console.error('Datagrid: error parsing hiddenColumns from localStorage', e);
        }
      }
    }
    if (loadedConfig.columnOrder) {
      columnOrder = loadedConfig.columnOrder;
    } else {
      const columnOrderJson = localStorage.getItem(`oc_grid_columnOrder_${grid.id}`);
      if (columnOrderJson) {
        try { columnOrder = JSON.parse(columnOrderJson); } catch (e) {
          // eslint-disable-next-line no-console
          console.error('Datagrid: error parsing columnOrder from localStorage', e);
        }
      }
    }
    const config = {
      visibleColumns: getVisibleColumns(cols, hiddenColumns, columnOrder),
      filteringData: {
        isFiltering,
      },
    };
    if (loadedConfig.columnWidths) {
      config.columnWidths = loadedConfig.columnWidths;
    } else {
      const columnWidths = localStorage.getItem(`oc_grid_columnWidths_${grid.id}`);
      if (columnWidths && !grid.disableRememberColumnWidths) {
        try { config.columnWidths = JSON.parse(columnWidths); } catch (e) {
          // eslint-disable-next-line no-console
          console.error('Datagrid: error parsing columnWidths from localStorage', e);
        }
      }
    }
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

    if (!config.sortingData && grid.defaultSortColumn) {
      config.sortingData = {
        sortColumn: grid.defaultSortColumn,
        sortOrder: grid.defaultSortOrder || 'asc',
      };
    }
    return config;
  },
  saveSelectedItems: (grid, selectedItems) => {
    if (grid.disableRememberSelectedItems) return false;
    if (!selectedItems) return false;
    sessionStorage.setItem(`oc_grid_selectedItems_${grid.id}`, JSON.stringify(selectedItems));
    return true;
  },
  saveColumnWidths: (grid, columnWidths) => {
    if (grid.disableRememberColumnWidths) return false;
    if (!columnWidths) return false;
    if (grid.configStorage && isFunction(grid.configStorage.save)) {
      grid.configStorage.save({ columnWidths });
    } else {
      localStorage.setItem(`oc_grid_columnWidths_${grid.id}`, JSON.stringify(columnWidths));
    }
    return true;
  },
  saveColumnSettings: (grid, hiddenColumns, columnOrder) => {
    if (!hiddenColumns || !columnOrder) return false;
    if (grid.configStorage && isFunction(grid.configStorage.save)) {
      grid.configStorage.save({ hiddenColumns, columnOrder });
    } else {
      localStorage.setItem(`oc_grid_hiddenColumns_${grid.id}`, JSON.stringify(hiddenColumns));
      localStorage.setItem(`oc_grid_columnOrder_${grid.id}`, JSON.stringify(columnOrder));
    }
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
