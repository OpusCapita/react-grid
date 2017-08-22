/* eslint-disable no-nested-ternary */
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
  loadGridConfig: (id) => {
    const localItem = localStorage.getItem(`oc_grid_config_${id}`);
    const sessionItem = sessionStorage.getItem(`oc_grid_config_${id}`);
    const config = {};
    if (localItem) {
      const localData = JSON.parse(localItem);
      if (localData.isFiltering) {
        config.filtering = {
          isFiltering: true,
        };
      }
      if (localData.columnWidths) {
        config.columnWidths = localData.columnWidths;
      }
    }
    if (sessionItem) {
      const sessionData = JSON.parse(sessionItem);
      if (sessionData.filteringData) {
        config.filtering = {
          isFiltering: true,
          filterData: sessionData.filteringData,
        };
      }
      if (sessionData.sortingData) {
        config.sortingData = sessionData.sortingData;
      }
    }
    return config;
  },
  loadSelectedItems: (id) => {
    const sessionItem = sessionStorage.getItem(`oc_grid_selected_items_${id}`);
    if (sessionItem) {
      return JSON.parse(sessionItem);
    }
    return [];
  },
  saveSortData: (id, sortingData) => {
    const sessionItem = sessionStorage.getItem(`oc_grid_config_${id}`);
    let sessionData = {};
    if (sessionItem) {
      sessionData = JSON.parse(sessionItem);
    }
    sessionData.sortingData = sortingData;
    sessionStorage.setItem(`oc_grid_config_${id}`, JSON.stringify(sessionData));
  },
};
