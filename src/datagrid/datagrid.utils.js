/* eslint-disable no-nested-ternary */
import moment from 'moment';
import isNaN from 'lodash/isNaN';
import { isFunction } from 'util';
import { Map, fromJS, List } from 'immutable';
import { escapeSpecialCharacters } from '@opuscapita/format-utils';

const getColumnKey = col => col.columnKey || col.valueKeyPath.join('/');

const getVisibleColumns = (cols, hiddenColumns = [], columnOrder = []) => {
  const orderedColumnList = [];
  cols.forEach((col, i) => {
    const columnKey = getColumnKey(col);
    const colOrderIdx = columnOrder.indexOf(columnKey);
    const defaultHidden = col.isHidden && colOrderIdx === -1;
    if (defaultHidden || hiddenColumns.indexOf(columnKey) > -1) {
      return;
    }
    const order = colOrderIdx !== -1 ? colOrderIdx : i + 1;
    orderedColumnList.push({
      columnKey,
      order,
    });
  });
  return orderedColumnList.sort((a, b) => a.order - b.order).map(item => item.columnKey);
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
    if (col.componentType === 'select' || col.componentType === 'multiselect') {
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
  isSortable: col => col.valueType
    && (col.sortValueGetter || col.valueKeyPath)
    && !col.disableSorting,
  getSortComparator: (col) => {
    if (col.sortComparator) {
      return col.sortComparator;
    }
    switch (col.valueType) {
      case 'text':
        return (a, b) => (a.localeCompare ? a.localeCompare(b) : 1);
      case 'number':
      case 'float':
        return (a, b) => a - b;
      case 'boolean':
        return (a, b) => (a === b ? 0 : a ? -1 : 1);
      case 'date':
        return (a, b) => new Date(a) - new Date(b);
      default:
        return (a, b) => (a.localeCompare ? a.localeCompare(b) : 1);
    }
  },
  getSortValueGetter: (col) => {
    if (col.sortValueGetter) {
      return col.sortValueGetter;
    }
    return (data) => {
      const cellData = data.getIn(col.valueKeyPath);
      // Deal with select and multiselect componentTypes
      if (col.selectComponentOptions) {
        if (List.isList(cellData) || Array.isArray(cellData)) {
          const labels = [];
          cellData.forEach((d) => {
            const found = col.selectComponentOptions.find(o => o.value === d);
            if (found) labels.push(found.label);
          });
          return labels.join(' ');
        }
        const found = col.selectComponentOptions.find(o => o.value === cellData);
        if (found) return found.label;
      }
      if (cellData && cellData.join) return cellData.join(' ');
      return cellData;
    };
  },
  getValueEmptyChecker: (col) => {
    if (col.valueEmptyChecker) {
      return col.valueEmptyChecker;
    }
    if (col.componentType === 'multiselect') {
      return val => val === '' || val === null || val === undefined || val.length === 0 || val.size === 0; // eslint-disable-line
    }

    switch (col.valueType) {
      case 'number':
      case 'float':
        return val => val === '' || isNaN(val) || val === null || val === undefined;
      case 'text':
      case 'boolean':
      case 'date':
      case 'select':
      default:
        return val => val === '' || val === null || val === undefined;
    }
  },
  getFilterMatcher: (col, dateFormat) => {
    if (col.filterMatcher) return col.filterMatcher;
    const getVal = row => row.getIn(col.valueKeyPath);

    // Select component values can be matched exactly
    if (col.componentType === 'select') {
      return (row, filterVal) => filterVal === getVal(row);
    }
    if (col.componentType === 'multiselect') {
      return (row, filterVal) => {
        // value can be simple value, immutable List or array
        const value = getVal(row);
        // session storage content is converted to immutable and multiselect
        // filters is then list otherwise array
        const filters = filterVal && filterVal.toJS ? filterVal.toJS() : filterVal;
        return filters.some((filter) => {
          if (List.isList(value) || Array.isArray(value)) {
            return value.findIndex(v => v === filter.value) !== -1;
          }
          return filter.value === value;
        });
      };
    }

    switch (col.valueType) {
      case 'number':
        return (row, filterVal) => {
          const value = getVal(row);
          if (value === '' || isNaN(value) || value === null || value === undefined) {
            return false;
          }
          // match exact number value
          const filterValInt = parseInt(filterVal, 10);
          const valInt = parseInt(value, 10);
          if (filterValInt === valInt || filterValInt === valInt * -1) {
            return true;
          }
          // match partial
          return String(value).includes(filterVal);
        };
      case 'float':
        return (row, filterVal) => {
          const value = getVal(row);
          if (value === '' || isNaN(value) || value === null || value === undefined) {
            return false;
          }
          // match exact float value
          const filterValFloat = parseFloat(filterVal.replace(',', '.'));
          if (filterValFloat === parseFloat(value) || filterValFloat === parseFloat(value) * -1) {
            return true;
          }
          // match partial
          return String(value).replace(',', '.').includes(filterVal.replace(',', '.'));
        };
      case 'date':
        return (row, filterVal) => {
          if (moment(getVal(row)).isValid()) {
            return moment(getVal(row)).format(dateFormat) === moment(filterVal).format(dateFormat);
          }
          return false;
        };
      case 'boolean':
        return (row, filterVal) => !!filterVal === !!getVal(row);
      case 'text':
      default:
        return (row, filterVal) => {
          // Ensure value is trimmed string
          const trimmedVal = filterVal.trim ? filterVal.trim() : String(filterVal);
          // handle special characters by escaping them
          const escapedVal = escapeSpecialCharacters(trimmedVal);
          return new RegExp(escapedVal, 'i').test(getVal(row));
        };
    }
  },
  loadSelectedItems: (grid) => {
    const sessionItem = sessionStorage.getItem(`oc_grid_selectedItems_${grid.id}`);
    if (sessionItem && !grid.disableRememberSelectedItems) {
      try {
        return JSON.parse(sessionItem);
      } catch (e) {
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
    const page = sessionStorage.getItem(`oc_grid_page_${grid.id}`);
    const rowsOnPage = sessionStorage.getItem(`oc_grid_rowsOnPage_${grid.id}`);
    let loadedConfig = {};
    let hiddenColumns;
    let columnOrder;
    let isFiltering = false;

    if (isFunction(configStorage.load)) {
      loadedConfig = configStorage.load();
    }

    if (isFilteringData) {
      if (!grid.disableRememberIsFiltering) {
        try {
          isFiltering = JSON.parse(isFilteringData);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error('Datagrid: error parsing isFilteringData from localStorage', e);
        }
      }
    } else if (grid.defaultShowFilteringRow) {
      isFiltering = true;
    }
    if (loadedConfig.hiddenColumns) {
      hiddenColumns = loadedConfig.hiddenColumns; // eslint-disable-line
    } else {
      const hiddenColumnsJson = localStorage.getItem(`oc_grid_hiddenColumns_${grid.id}`);
      if (hiddenColumnsJson) {
        try {
          hiddenColumns = JSON.parse(hiddenColumnsJson);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error('Datagrid: error parsing hiddenColumns from localStorage', e);
        }
      }
    }
    if (loadedConfig.columnOrder) {
      columnOrder = loadedConfig.columnOrder; // eslint-disable-line
    } else {
      const columnOrderJson = localStorage.getItem(`oc_grid_columnOrder_${grid.id}`);
      if (columnOrderJson) {
        try {
          columnOrder = JSON.parse(columnOrderJson);
        } catch (e) {
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
        try {
          config.columnWidths = JSON.parse(columnWidths);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error('Datagrid: error parsing columnWidths from localStorage', e);
        }
      }
    }
    if (sortingData && !grid.disableRememberSortData) {
      try {
        config.sortingData = JSON.parse(sortingData);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Datagrid: error parsing sortingData from sessionStorage', e);
      }
    }
    if (filterData && isFiltering && !grid.disableRememberFilterData) {
      try {
        config.filteringData.filterData = JSON.parse(filterData);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Datagrid: error parsing filterData from sessionStorage', e);
      }
    }
    if (page) {
      try {
        config.page = JSON.parse(page);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Datagrid: error parsing pagination from sessionStorage', e);
      }
    }
    if (rowsOnPage) {
      try {
        config.rowsOnPage = JSON.parse(rowsOnPage);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Datagrid: error parsing pagination from sessionStorage', e);
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
    sessionStorage.setItem(`oc_grid_selectedItems_${grid.id}`, JSON.stringify(selectedItems || []));
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
    if (grid.disableRememberFilterData) return false;
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
  savePage: (grid, page) => {
    if (!page) return false;
    sessionStorage.setItem(`oc_grid_page_${grid.id}`, JSON.stringify(page));
    return true;
  },
  saveRowsOnPage: (grid, rowsOnPage) => {
    if (!rowsOnPage) return false;
    sessionStorage.setItem(`oc_grid_rowsOnPage_${grid.id}`, JSON.stringify(rowsOnPage));
    return true;
  },
  /* eslint-disable max-len */
  checkGridParam: (gridParam) => {
    if (gridParam) {
      if (!gridParam.id) {
        throw new Error(
          '[Grid] Invalid `grid.id` parameter, update action parameters to new format!',
        );
      }
      if (!gridParam.idKeyPath) {
        throw new Error(
          '[Grid] Invalid `grid.idKeyPath` parameter, update action parameters to new format!',
        );
      }
    } else {
      throw new Error('[Grid] Invalid `grid` parameter, update action parameters to new format!');
    }
  },
  checkColumnsParam: (columnsParam) => {
    if (!columnsParam) {
      throw new Error(
        '[Grid] Invalid `columns` parameter, update action parameters to new format!',
      );
    }
  },
  // Locale getters, support grid param or user state used in OC applications
  getLanguage: (grid, ocUserState) => {
    if (grid.language && typeof grid.language === 'string') {
      return grid.language;
    }
    if (ocUserState) {
      return ocUserState.getIn(['user', 'language'], 'en');
    }
    return 'en';
  },
  getRegion: (grid, ocUserState) => {
    const defaultRegion = 'en_GB';
    if (grid.region && typeof grid.region === 'string') {
      return grid.region;
    }
    if (ocUserState) {
      return ocUserState.getIn(['user', 'region'], defaultRegion);
    }
    return defaultRegion;
  },
  getDateFormat: (grid, ocUserState) => {
    if (grid.dateFormat && typeof grid.dateFormat === 'string') {
      return grid.dateFormat.toUpperCase();
    }
    if (ocUserState) {
      return ocUserState.getIn(['localeFormat', 'dateFormat'], 'L');
    }
    return 'L';
  },
  getThousandSeparator: (grid, ocUserState) => {
    if (grid.thousandSeparator && typeof grid.language === 'string') {
      return grid.thousandSeparator;
    }
    if (ocUserState) {
      return ocUserState.getIn(['localeFormat', 'thousandSeparator']) || ' ';
    }
    return '';
  },
  getDecimalSeparator: (grid, ocUserState) => {
    if (grid.decimalSeparator && typeof grid.language === 'string') {
      return grid.decimalSeparator;
    }
    if (ocUserState) {
      return ocUserState.getIn(['localeFormat', 'decimalSeparator'], '.');
    }
    return '.';
  },
  normalizeFilteringData: (filteringData) => {
    let newFilteringData = Map({ isFiltering: false });
    if (!filteringData) return newFilteringData;

    const oldFilteringData = Map.isMap(filteringData) ? filteringData : fromJS(filteringData);
    const isFiltering = oldFilteringData.get('isFiltering', false);
    const filterData = oldFilteringData.get('filterData', null);

    if (isFiltering && filterData && Map.isMap(filterData)) {
      newFilteringData = newFilteringData.set('isFiltering', true).set('filterData', filterData);
    }

    return newFilteringData;
  },
  /*
   * @function visibleColumns
   * @desc  Returns either visible columns (if some columns are hidden )
   *        or grid default columns.
   * @param origColumns Array of Grid original columns objects
   * @param visibleColumns Array of Grid visible columns valueKeyPaths
   * @returns Array of column objects currently visible for user.
   */
  visibleColumns: (origColumns, visibleColumns) => {
    if (!visibleColumns) return origColumns;
    const filtered = visibleColumns.map(
      // eslint-disable-line
      searchCol => origColumns.find(
          // eslint-disable-line
        // valueKeyPath is joined here as it can be an array like ['key1', 'key2'].
        // searchCol is similarly joined in onCellKeyDown in datagrid.component.jsx
        col => JSON.stringify(col.valueKeyPath.join('/')) === JSON.stringify(searchCol),
      ),
    );
    return filtered.toJS();
  },
};
