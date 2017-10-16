/* eslint-disable no-nested-ternary */
import moment from 'moment';
import isNaN from 'lodash/isNaN';

export default {
  getColumnKey: col => (
    col.columnKey || col.valueKeyPath.join('/')
  ),
  getColumnDefaultValues: (cols) => {
    const columnDefaultValues = {};
    cols.forEach((col) => {
      if (col.defaultValue !== undefined) {
        columnDefaultValues[col.columnKey || col.valueKeyPath.join('/')] = col.defaultValue;
      }
    });
    return columnDefaultValues;
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
          let parsedFilterVal = filterVal;
          if (this.props.decimalSeparator && this.props.decimalSeparator !== '.') {
            parsedFilterVal = parsedFilterVal.replace(this.props.decimalSeparator, '.');
          }
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
  loadGridConfig: (grid) => {
    const columnWidths = localStorage.getItem(`oc_grid_columnWidths_${grid.id}`);
    const sortingData = sessionStorage.getItem(`oc_grid_sorting_${grid.id}`);
    const filterData = sessionStorage.getItem(`oc_grid_filtering_${grid.id}`);
    const isFilteringData = localStorage.getItem(`oc_grid_isFiltering_${grid.id}`);
    let isFiltering = false;
    if (isFilteringData && !grid.disableRememberIsFiltering) {
      try { isFiltering = JSON.parse(isFilteringData); } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Datagrid: error parsing isFilteringData from localStorage', e);
      }
    }
    const config = {
      filteringData: {
        isFiltering,
      },
    };
    if (columnWidths && !grid.disableRememberColumnWidths) {
      try { config.columnWidths = JSON.parse(columnWidths); } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Datagrid: error parsing columnWidths from localStorage', e);
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
    localStorage.setItem(`oc_grid_columnWidths_${grid.id}`, JSON.stringify(columnWidths));
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
};
