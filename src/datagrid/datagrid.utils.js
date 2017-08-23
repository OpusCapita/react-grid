/* eslint-disable no-nested-ternary */
import moment from 'moment';
import isNaN from 'lodash/isNaN';

export default {
  getColumnKey: col => (
    col.columnKey || col.valueKeyPath.join('_')
  ),
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
  loadSelectedItems: (id) => {
    const sessionItem = sessionStorage.getItem(`oc_grid_selectedItems_${id}`);
    if (sessionItem) {
      return JSON.parse(sessionItem);
    }
    return [];
  },
  loadGridConfig: (id) => {
    const columnWidths = localStorage.getItem(`oc_grid_filtering_${id}`);
    const sortingData = sessionStorage.getItem(`oc_grid_sorting_${id}`);
    const filterData = sessionStorage.getItem(`oc_grid_filtering_${id}`);
    const isFiltering = localStorage.getItem(`oc_grid_isFiltering_${id}`);
    const config = {
      filteringData: {
        isFiltering: isFiltering ? JSON.parse(isFiltering) : false,
      },
    };
    if (columnWidths) {
      config.columnWidths = JSON.parse(columnWidths);
    }
    if (sortingData) {
      config.sortingData = JSON.parse(sortingData);
    }
    if (filterData) {
      config.filteringData.filterData = JSON.parse(filterData);
    }
    return config;
  },
  saveSelectedItems: (id, selectedItems) => {
    sessionStorage.setItem(`oc_grid_selectedItems_${id}`, JSON.stringify(selectedItems));
  },
  saveColumnWidths: (id, columnWidths) => {
    localStorage.setItem(`oc_grid_columnWidths_${id}`, JSON.stringify(columnWidths));
  },
  saveSortData: (id, sortingData) => {
    sessionStorage.setItem(`oc_grid_sorting_${id}`, JSON.stringify(sortingData));
  },
  saveFilterData: (id, filterData) => {
    sessionStorage.setItem(`oc_grid_filtering_${id}`, JSON.stringify(filterData));
  },
  saveIsFiltering: (id, isFiltering) => {
    localStorage.setItem(`oc_grid_isFiltering_${id}`, JSON.stringify(isFiltering));
  },
};
