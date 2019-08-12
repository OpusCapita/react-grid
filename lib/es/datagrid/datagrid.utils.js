/* eslint-disable no-nested-ternary */
import moment from 'moment';
import isNaN from 'lodash/isNaN';
import { isFunction } from 'util';
import { Map, fromJS, List } from 'immutable';

var getColumnKey = function getColumnKey(col) {
  return col.columnKey || col.valueKeyPath.join('/');
};

var getVisibleColumns = function getVisibleColumns(cols, hiddenColumns, columnOrder) {
  if (hiddenColumns === void 0) {
    hiddenColumns = [];
  }

  if (columnOrder === void 0) {
    columnOrder = [];
  }

  var orderedColumnList = [];
  cols.forEach(function (col, i) {
    var columnKey = getColumnKey(col);
    var colOrderIdx = columnOrder.indexOf(columnKey);
    var defaultHidden = col.isHidden && colOrderIdx === -1;

    if (defaultHidden || hiddenColumns.indexOf(columnKey) > -1) {
      return;
    }

    var order = colOrderIdx !== -1 ? colOrderIdx : i + 1;
    orderedColumnList.push({
      columnKey: columnKey,
      order: order
    });
  });
  return orderedColumnList.sort(function (a, b) {
    return a.order - b.order;
  }).map(function (item) {
    return item.columnKey;
  });
};

export default {
  getColumnKey: getColumnKey,
  getColumnDefaultValues: function getColumnDefaultValues(cols) {
    var columnDefaultValues = {};
    cols.forEach(function (col) {
      if (col.defaultValue !== undefined) {
        columnDefaultValues[getColumnKey(col)] = col.defaultValue;
      }
    });
    return columnDefaultValues;
  },
  getCellStyleByCol: function getCellStyleByCol(col) {
    if (col.align) {
      return {
        textAlign: col.align
      };
    } // No default align if component is select
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
          textAlign: 'right'
        };

      default:
        return {};
    }
  },
  isSortable: function isSortable(col) {
    return col.valueType && (col.sortValueGetter || col.valueKeyPath) && !col.disableSorting;
  },
  getSortComparator: function getSortComparator(col) {
    if (col.sortComparator) {
      return col.sortComparator;
    }

    switch (col.valueType) {
      case 'text':
        return function (a, b) {
          return a.localeCompare ? a.localeCompare(b) : 1;
        };

      case 'number':
      case 'float':
        return function (a, b) {
          return a - b;
        };

      case 'boolean':
        return function (a, b) {
          return a === b ? 0 : a ? -1 : 1;
        };

      case 'date':
        return function (a, b) {
          return new Date(a) - new Date(b);
        };

      default:
        return function (a, b) {
          return a.localeCompare ? a.localeCompare(b) : 1;
        };
    }
  },
  getSortValueGetter: function getSortValueGetter(col) {
    if (col.sortValueGetter) {
      return col.sortValueGetter;
    }

    return function (data) {
      var cellData = data.getIn(col.valueKeyPath); // Deal with select and multiselect componentTypes

      if (col.selectComponentOptions) {
        if (List.isList(cellData) || Array.isArray(cellData)) {
          var labels = [];
          cellData.forEach(function (d) {
            var found = col.selectComponentOptions.find(function (o) {
              return o.value === d;
            });
            if (found) labels.push(found.label);
          });
          return labels.join(' ');
        }

        var found = col.selectComponentOptions.find(function (o) {
          return o.value === cellData;
        });
        if (found) return found.label;
      }

      if (cellData && cellData.join) return cellData.join(' ');
      return cellData;
    };
  },
  getValueEmptyChecker: function getValueEmptyChecker(col) {
    if (col.valueEmptyChecker) {
      return col.valueEmptyChecker;
    }

    if (col.componentType === 'multiselect') {
      return function (val) {
        return val === '' || val === null || val === undefined || val.length === 0 || val.size === 0;
      }; // eslint-disable-line
    }

    switch (col.valueType) {
      case 'number':
      case 'float':
        return function (val) {
          return val === '' || isNaN(val) || val === null || val === undefined;
        };

      case 'text':
      case 'boolean':
      case 'date':
      case 'select':
      default:
        return function (val) {
          return val === '' || val === null || val === undefined;
        };
    }
  },
  getFilterMatcher: function getFilterMatcher(col, dateFormat) {
    if (col.filterMatcher) return col.filterMatcher;

    var getVal = function getVal(row) {
      return row.getIn(col.valueKeyPath);
    };

    if (col.componentType === 'multiselect') {
      return function (row, filterVal) {
        // value can be simple value, immutable List or array
        var value = getVal(row); // session storage content is converted to immutable and multiselect
        // filters is then list otherwise array

        var filters = filterVal && filterVal.toJS ? filterVal.toJS() : filterVal;
        return filters.some(function (filter) {
          if (List.isList(value) || Array.isArray(value)) {
            return value.findIndex(function (v) {
              return v === filter.value;
            }) !== -1;
          }

          return filter.value === value;
        });
      };
    }

    switch (col.valueType) {
      case 'number':
        return function (row, filterVal) {
          var value = getVal(row);

          if (value === '' || isNaN(value) || value === null || value === undefined) {
            return false;
          } // match exact number value


          var filterValInt = parseInt(filterVal, 10);
          var valInt = parseInt(value, 10);

          if (filterValInt === valInt || filterValInt === valInt * -1) {
            return true;
          } // match partial


          return String(value).includes(filterVal);
        };

      case 'float':
        return function (row, filterVal) {
          var value = getVal(row);

          if (value === '' || isNaN(value) || value === null || value === undefined) {
            return false;
          } // match exact float value


          var filterValFloat = parseFloat(filterVal.replace(',', '.'));

          if (filterValFloat === parseFloat(value) || filterValFloat === parseFloat(value) * -1) {
            return true;
          } // match partial


          return String(value).replace(',', '.').includes(filterVal.replace(',', '.'));
        };

      case 'date':
        return function (row, filterVal) {
          if (moment(getVal(row)).isValid()) {
            return moment(getVal(row)).format(dateFormat) === moment(filterVal).format(dateFormat);
          }

          return false;
        };

      case 'boolean':
      case 'text':
      default:
        return function (row, filterVal) {
          var trimmedVal = filterVal.trim();
          var escapedVal = trimmedVal;
          var specialChars = '[]\\^$.|?*+()'; // If filter val starts with a Regex special character, we must escape it

          if (specialChars.includes(trimmedVal[0])) escapedVal = "\\" + trimmedVal;
          return new RegExp(escapedVal, 'i').test(getVal(row));
        };
    }
  },
  loadSelectedItems: function loadSelectedItems(grid) {
    var sessionItem = sessionStorage.getItem("oc_grid_selectedItems_" + grid.id);

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
  loadGridConfig: function loadGridConfig(grid, cols) {
    var configStorage = grid.configStorage || {};
    var sortingData = sessionStorage.getItem("oc_grid_sorting_" + grid.id);
    var filterData = sessionStorage.getItem("oc_grid_filtering_" + grid.id);
    var isFilteringData = localStorage.getItem("oc_grid_isFiltering_" + grid.id);
    var page = sessionStorage.getItem("oc_grid_page_" + grid.id);
    var rowsOnPage = sessionStorage.getItem("oc_grid_rowsOnPage_" + grid.id);
    var loadedConfig = {};
    var hiddenColumns;
    var columnOrder;
    var isFiltering = false;

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
      var hiddenColumnsJson = localStorage.getItem("oc_grid_hiddenColumns_" + grid.id);

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
      var columnOrderJson = localStorage.getItem("oc_grid_columnOrder_" + grid.id);

      if (columnOrderJson) {
        try {
          columnOrder = JSON.parse(columnOrderJson);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error('Datagrid: error parsing columnOrder from localStorage', e);
        }
      }
    }

    var config = {
      visibleColumns: getVisibleColumns(cols, hiddenColumns, columnOrder),
      filteringData: {
        isFiltering: isFiltering
      }
    };

    if (loadedConfig.columnWidths) {
      config.columnWidths = loadedConfig.columnWidths;
    } else {
      var columnWidths = localStorage.getItem("oc_grid_columnWidths_" + grid.id);

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
        sortOrder: grid.defaultSortOrder || 'asc'
      };
    }

    return config;
  },
  saveSelectedItems: function saveSelectedItems(grid, selectedItems) {
    if (grid.disableRememberSelectedItems) return false;
    sessionStorage.setItem("oc_grid_selectedItems_" + grid.id, JSON.stringify(selectedItems || []));
    return true;
  },
  saveColumnWidths: function saveColumnWidths(grid, columnWidths) {
    if (grid.disableRememberColumnWidths) return false;
    if (!columnWidths) return false;

    if (grid.configStorage && isFunction(grid.configStorage.save)) {
      grid.configStorage.save({
        columnWidths: columnWidths
      });
    } else {
      localStorage.setItem("oc_grid_columnWidths_" + grid.id, JSON.stringify(columnWidths));
    }

    return true;
  },
  saveColumnSettings: function saveColumnSettings(grid, hiddenColumns, columnOrder) {
    if (!hiddenColumns || !columnOrder) return false;

    if (grid.configStorage && isFunction(grid.configStorage.save)) {
      grid.configStorage.save({
        hiddenColumns: hiddenColumns,
        columnOrder: columnOrder
      });
    } else {
      localStorage.setItem("oc_grid_hiddenColumns_" + grid.id, JSON.stringify(hiddenColumns));
      localStorage.setItem("oc_grid_columnOrder_" + grid.id, JSON.stringify(columnOrder));
    }

    return true;
  },
  saveSortData: function saveSortData(grid, sortingData) {
    if (grid.disableRememberSortData) return false;
    if (!sortingData) return false;
    sessionStorage.setItem("oc_grid_sorting_" + grid.id, JSON.stringify(sortingData));
    return true;
  },
  saveFilterData: function saveFilterData(grid, filterData) {
    if (grid.disableRememberFilterData) return false;
    if (!filterData) return false;
    sessionStorage.setItem("oc_grid_filtering_" + grid.id, JSON.stringify(filterData));
    return true;
  },
  saveIsFiltering: function saveIsFiltering(grid, isFiltering) {
    if (grid.disableRememberIsFiltering) return false;
    if (isFiltering === undefined) return false;
    localStorage.setItem("oc_grid_isFiltering_" + grid.id, JSON.stringify(isFiltering));

    if (!isFiltering) {
      sessionStorage.removeItem("oc_grid_filtering_" + grid.id);
    }

    return true;
  },
  savePage: function savePage(grid, page) {
    if (!page) return false;
    sessionStorage.setItem("oc_grid_page_" + grid.id, JSON.stringify(page));
    return true;
  },
  saveRowsOnPage: function saveRowsOnPage(grid, rowsOnPage) {
    if (!rowsOnPage) return false;
    sessionStorage.setItem("oc_grid_rowsOnPage_" + grid.id, JSON.stringify(rowsOnPage));
    return true;
  },

  /* eslint-disable max-len */
  checkGridParam: function checkGridParam(gridParam) {
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
  checkColumnsParam: function checkColumnsParam(columnsParam) {
    if (!columnsParam) {
      throw new Error('[Grid] Invalid `columns` parameter, update action parameters to new format!');
    }
  },
  // Locale getters, support grid param or user state used in OC applications
  getLanguage: function getLanguage(grid, ocUserState) {
    if (grid.language && typeof grid.language === 'string') {
      return grid.language;
    }

    if (ocUserState) {
      return ocUserState.getIn(['user', 'language'], 'en');
    }

    return 'en';
  },
  getRegion: function getRegion(grid, ocUserState) {
    var defaultRegion = 'en_GB';

    if (grid.region && typeof grid.region === 'string') {
      return grid.region;
    }

    if (ocUserState) {
      return ocUserState.getIn(['user', 'region'], defaultRegion);
    }

    return defaultRegion;
  },
  getDateFormat: function getDateFormat(grid, ocUserState) {
    if (grid.dateFormat && typeof grid.dateFormat === 'string') {
      return grid.dateFormat.toUpperCase();
    }

    if (ocUserState) {
      return ocUserState.getIn(['localeFormat', 'dateFormat'], 'L');
    }

    return 'L';
  },
  getThousandSeparator: function getThousandSeparator(grid, ocUserState) {
    if (grid.thousandSeparator && typeof grid.language === 'string') {
      return grid.thousandSeparator;
    }

    if (ocUserState) {
      return ocUserState.getIn(['localeFormat', 'thousandSeparator'], '');
    }

    return '';
  },
  getDecimalSeparator: function getDecimalSeparator(grid, ocUserState) {
    if (grid.decimalSeparator && typeof grid.language === 'string') {
      return grid.decimalSeparator;
    }

    if (ocUserState) {
      return ocUserState.getIn(['localeFormat', 'decimalSeparator'], '.');
    }

    return '.';
  },
  normalizeFilteringData: function normalizeFilteringData(filteringData) {
    var newFilteringData = Map({
      isFiltering: false
    });
    if (!filteringData) return newFilteringData;
    var oldFilteringData = Map.isMap(filteringData) ? filteringData : fromJS(filteringData);
    var isFiltering = oldFilteringData.get('isFiltering', false);
    var filterData = oldFilteringData.get('filterData', null);

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
  visibleColumns: function visibleColumns(origColumns, _visibleColumns) {
    if (!_visibleColumns) return origColumns;

    var filtered = _visibleColumns.map( // eslint-disable-line
    function (searchCol) {
      return origColumns.find( // eslint-disable-line
      // valueKeyPath is joined here as it can be an array like ['key1', 'key2'].
      // searchCol is similarly joined in onCellKeyDown in datagrid.component.jsx
      function (col) {
        return JSON.stringify(col.valueKeyPath.join('/')) === JSON.stringify(searchCol);
      });
    });

    return filtered.toJS();
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC51dGlscy5qcyJdLCJuYW1lcyI6WyJtb21lbnQiLCJpc05hTiIsImlzRnVuY3Rpb24iLCJNYXAiLCJmcm9tSlMiLCJMaXN0IiwiZ2V0Q29sdW1uS2V5IiwiY29sIiwiY29sdW1uS2V5IiwidmFsdWVLZXlQYXRoIiwiam9pbiIsImdldFZpc2libGVDb2x1bW5zIiwiY29scyIsImhpZGRlbkNvbHVtbnMiLCJjb2x1bW5PcmRlciIsIm9yZGVyZWRDb2x1bW5MaXN0IiwiZm9yRWFjaCIsImkiLCJjb2xPcmRlcklkeCIsImluZGV4T2YiLCJkZWZhdWx0SGlkZGVuIiwiaXNIaWRkZW4iLCJvcmRlciIsInB1c2giLCJzb3J0IiwiYSIsImIiLCJtYXAiLCJpdGVtIiwiZ2V0Q29sdW1uRGVmYXVsdFZhbHVlcyIsImNvbHVtbkRlZmF1bHRWYWx1ZXMiLCJkZWZhdWx0VmFsdWUiLCJ1bmRlZmluZWQiLCJnZXRDZWxsU3R5bGVCeUNvbCIsImFsaWduIiwidGV4dEFsaWduIiwiY29tcG9uZW50VHlwZSIsInZhbHVlVHlwZSIsImlzU29ydGFibGUiLCJzb3J0VmFsdWVHZXR0ZXIiLCJkaXNhYmxlU29ydGluZyIsImdldFNvcnRDb21wYXJhdG9yIiwic29ydENvbXBhcmF0b3IiLCJsb2NhbGVDb21wYXJlIiwiRGF0ZSIsImdldFNvcnRWYWx1ZUdldHRlciIsImRhdGEiLCJjZWxsRGF0YSIsImdldEluIiwic2VsZWN0Q29tcG9uZW50T3B0aW9ucyIsImlzTGlzdCIsIkFycmF5IiwiaXNBcnJheSIsImxhYmVscyIsImQiLCJmb3VuZCIsImZpbmQiLCJvIiwidmFsdWUiLCJsYWJlbCIsImdldFZhbHVlRW1wdHlDaGVja2VyIiwidmFsdWVFbXB0eUNoZWNrZXIiLCJ2YWwiLCJsZW5ndGgiLCJzaXplIiwiZ2V0RmlsdGVyTWF0Y2hlciIsImRhdGVGb3JtYXQiLCJmaWx0ZXJNYXRjaGVyIiwiZ2V0VmFsIiwicm93IiwiZmlsdGVyVmFsIiwiZmlsdGVycyIsInRvSlMiLCJzb21lIiwiZmlsdGVyIiwiZmluZEluZGV4IiwidiIsImZpbHRlclZhbEludCIsInBhcnNlSW50IiwidmFsSW50IiwiU3RyaW5nIiwiaW5jbHVkZXMiLCJmaWx0ZXJWYWxGbG9hdCIsInBhcnNlRmxvYXQiLCJyZXBsYWNlIiwiaXNWYWxpZCIsImZvcm1hdCIsInRyaW1tZWRWYWwiLCJ0cmltIiwiZXNjYXBlZFZhbCIsInNwZWNpYWxDaGFycyIsIlJlZ0V4cCIsInRlc3QiLCJsb2FkU2VsZWN0ZWRJdGVtcyIsImdyaWQiLCJzZXNzaW9uSXRlbSIsInNlc3Npb25TdG9yYWdlIiwiZ2V0SXRlbSIsImlkIiwiZGlzYWJsZVJlbWVtYmVyU2VsZWN0ZWRJdGVtcyIsIkpTT04iLCJwYXJzZSIsImUiLCJjb25zb2xlIiwiZXJyb3IiLCJsb2FkR3JpZENvbmZpZyIsImNvbmZpZ1N0b3JhZ2UiLCJzb3J0aW5nRGF0YSIsImZpbHRlckRhdGEiLCJpc0ZpbHRlcmluZ0RhdGEiLCJsb2NhbFN0b3JhZ2UiLCJwYWdlIiwicm93c09uUGFnZSIsImxvYWRlZENvbmZpZyIsImlzRmlsdGVyaW5nIiwibG9hZCIsImRpc2FibGVSZW1lbWJlcklzRmlsdGVyaW5nIiwiZGVmYXVsdFNob3dGaWx0ZXJpbmdSb3ciLCJoaWRkZW5Db2x1bW5zSnNvbiIsImNvbHVtbk9yZGVySnNvbiIsImNvbmZpZyIsInZpc2libGVDb2x1bW5zIiwiZmlsdGVyaW5nRGF0YSIsImNvbHVtbldpZHRocyIsImRpc2FibGVSZW1lbWJlckNvbHVtbldpZHRocyIsImRpc2FibGVSZW1lbWJlclNvcnREYXRhIiwiZGlzYWJsZVJlbWVtYmVyRmlsdGVyRGF0YSIsImRlZmF1bHRTb3J0Q29sdW1uIiwic29ydENvbHVtbiIsInNvcnRPcmRlciIsImRlZmF1bHRTb3J0T3JkZXIiLCJzYXZlU2VsZWN0ZWRJdGVtcyIsInNlbGVjdGVkSXRlbXMiLCJzZXRJdGVtIiwic3RyaW5naWZ5Iiwic2F2ZUNvbHVtbldpZHRocyIsInNhdmUiLCJzYXZlQ29sdW1uU2V0dGluZ3MiLCJzYXZlU29ydERhdGEiLCJzYXZlRmlsdGVyRGF0YSIsInNhdmVJc0ZpbHRlcmluZyIsInJlbW92ZUl0ZW0iLCJzYXZlUGFnZSIsInNhdmVSb3dzT25QYWdlIiwiY2hlY2tHcmlkUGFyYW0iLCJncmlkUGFyYW0iLCJFcnJvciIsImlkS2V5UGF0aCIsImNoZWNrQ29sdW1uc1BhcmFtIiwiY29sdW1uc1BhcmFtIiwiZ2V0TGFuZ3VhZ2UiLCJvY1VzZXJTdGF0ZSIsImxhbmd1YWdlIiwiZ2V0UmVnaW9uIiwiZGVmYXVsdFJlZ2lvbiIsInJlZ2lvbiIsImdldERhdGVGb3JtYXQiLCJ0b1VwcGVyQ2FzZSIsImdldFRob3VzYW5kU2VwYXJhdG9yIiwidGhvdXNhbmRTZXBhcmF0b3IiLCJnZXREZWNpbWFsU2VwYXJhdG9yIiwiZGVjaW1hbFNlcGFyYXRvciIsIm5vcm1hbGl6ZUZpbHRlcmluZ0RhdGEiLCJuZXdGaWx0ZXJpbmdEYXRhIiwib2xkRmlsdGVyaW5nRGF0YSIsImlzTWFwIiwiZ2V0Iiwic2V0Iiwib3JpZ0NvbHVtbnMiLCJmaWx0ZXJlZCIsInNlYXJjaENvbCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQSxPQUFPQSxNQUFQLE1BQW1CLFFBQW5CO0FBQ0EsT0FBT0MsS0FBUCxNQUFrQixjQUFsQjtBQUNBLFNBQVNDLFVBQVQsUUFBMkIsTUFBM0I7QUFDQSxTQUFTQyxHQUFULEVBQWNDLE1BQWQsRUFBc0JDLElBQXRCLFFBQWtDLFdBQWxDOztBQUVBLElBQU1DLFlBQVksR0FBRyxTQUFmQSxZQUFlLENBQUFDLEdBQUc7QUFBQSxTQUFJQSxHQUFHLENBQUNDLFNBQUosSUFBaUJELEdBQUcsQ0FBQ0UsWUFBSixDQUFpQkMsSUFBakIsQ0FBc0IsR0FBdEIsQ0FBckI7QUFBQSxDQUF4Qjs7QUFFQSxJQUFNQyxpQkFBaUIsR0FBRyxTQUFwQkEsaUJBQW9CLENBQUNDLElBQUQsRUFBT0MsYUFBUCxFQUEyQkMsV0FBM0IsRUFBZ0Q7QUFBQSxNQUF6Q0QsYUFBeUM7QUFB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SUFBakIsQ0FBc0IsR0FBdEIsQ0FBZixNQUErQzBGLElBQUksQ0FBQ2tDLFNBQUwsQ0FBZW9DLFNBQWYsQ0FBbkQ7QUFBQSxPQUpRLENBQUo7QUFBQSxLQUZNLENBQWpCOztBQVNBLFdBQU9ELFFBQVEsQ0FBQ2pHLElBQVQsRUFBUDtBQUNEO0FBeGNZLENBQWYiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1uZXN0ZWQtdGVybmFyeSAqL1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IGlzTmFOIGZyb20gJ2xvZGFzaC9pc05hTic7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAndXRpbCc7XG5pbXBvcnQgeyBNYXAsIGZyb21KUywgTGlzdCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5cbmNvbnN0IGdldENvbHVtbktleSA9IGNvbCA9PiBjb2wuY29sdW1uS2V5IHx8IGNvbC52YWx1ZUtleVBhdGguam9pbignLycpO1xuXG5jb25zdCBnZXRWaXNpYmxlQ29sdW1ucyA9IChjb2xzLCBoaWRkZW5Db2x1bW5zID0gW10sIGNvbHVtbk9yZGVyID0gW10pID0+IHtcbiAgY29uc3Qgb3JkZXJlZENvbHVtbkxpc3QgPSBbXTtcbiAgY29scy5mb3JFYWNoKChjb2wsIGkpID0+IHtcbiAgICBjb25zdCBjb2x1bW5LZXkgPSBnZXRDb2x1bW5LZXkoY29sKTtcbiAgICBjb25zdCBjb2xPcmRlcklkeCA9IGNvbHVtbk9yZGVyLmluZGV4T2YoY29sdW1uS2V5KTtcbiAgICBjb25zdCBkZWZhdWx0SGlkZGVuID0gY29sLmlzSGlkZGVuICYmIGNvbE9yZGVySWR4ID09PSAtMTtcbiAgICBpZiAoZGVmYXVsdEhpZGRlbiB8fCBoaWRkZW5Db2x1bW5zLmluZGV4T2YoY29sdW1uS2V5KSA+IC0xKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG9yZGVyID0gY29sT3JkZXJJZHggIT09IC0xID8gY29sT3JkZXJJZHggOiBpICsgMTtcbiAgICBvcmRlcmVkQ29sdW1uTGlzdC5wdXNoKHtcbiAgICAgIGNvbHVtbktleSxcbiAgICAgIG9yZGVyLFxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIG9yZGVyZWRDb2x1bW5MaXN0LnNvcnQoKGEsIGIpID0+IGEub3JkZXIgLSBiLm9yZGVyKS5tYXAoaXRlbSA9PiBpdGVtLmNvbHVtbktleSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGdldENvbHVtbktleSxcbiAgZ2V0Q29sdW1uRGVmYXVsdFZhbHVlczogKGNvbHMpID0+IHtcbiAgICBjb25zdCBjb2x1bW5EZWZhdWx0VmFsdWVzID0ge307XG4gICAgY29scy5mb3JFYWNoKChjb2wpID0+IHtcbiAgICAgIGlmIChjb2wuZGVmYXVsdFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29sdW1uRGVmYXVsdFZhbHVlc1tnZXRDb2x1bW5LZXkoY29sKV0gPSBjb2wuZGVmYXVsdFZhbHVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBjb2x1bW5EZWZhdWx0VmFsdWVzO1xuICB9LFxuICBnZXRDZWxsU3R5bGVCeUNvbDogKGNvbCkgPT4ge1xuICAgIGlmIChjb2wuYWxpZ24pIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRleHRBbGlnbjogY29sLmFsaWduLFxuICAgICAgfTtcbiAgICB9XG4gICAgLy8gTm8gZGVmYXVsdCBhbGlnbiBpZiBjb21wb25lbnQgaXMgc2VsZWN0XG4gICAgLy8gQmVjYXVzZSByZW5kZXJlZCBkYXRhIGlzIG1vc3QgbGlrZWx5IHRleHRcbiAgICAvLyBFdmVuIGlmIHZhbHVlVHlwZSBpcyBudW1iZXJcbiAgICBpZiAoY29sLmNvbXBvbmVudFR5cGUgPT09ICdzZWxlY3QnIHx8IGNvbC5jb21wb25lbnRUeXBlID09PSAnbXVsdGlzZWxlY3QnKSB7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuICAgIHN3aXRjaCAoY29sLnZhbHVlVHlwZSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRleHRBbGlnbjogJ3JpZ2h0JyxcbiAgICAgICAgfTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gIH0sXG4gIGlzU29ydGFibGU6IGNvbCA9PiBjb2wudmFsdWVUeXBlXG4gICAgJiYgKGNvbC5zb3J0VmFsdWVHZXR0ZXIgfHwgY29sLnZhbHVlS2V5UGF0aClcbiAgICAmJiAhY29sLmRpc2FibGVTb3J0aW5nLFxuICBnZXRTb3J0Q29tcGFyYXRvcjogKGNvbCkgPT4ge1xuICAgIGlmIChjb2wuc29ydENvbXBhcmF0b3IpIHtcbiAgICAgIHJldHVybiBjb2wuc29ydENvbXBhcmF0b3I7XG4gICAgfVxuICAgIHN3aXRjaCAoY29sLnZhbHVlVHlwZSkge1xuICAgICAgY2FzZSAndGV4dCc6XG4gICAgICAgIHJldHVybiAoYSwgYikgPT4gKGEubG9jYWxlQ29tcGFyZSA/IGEubG9jYWxlQ29tcGFyZShiKSA6IDEpO1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgICAgcmV0dXJuIChhLCBiKSA9PiBhIC0gYjtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICByZXR1cm4gKGEsIGIpID0+IChhID09PSBiID8gMCA6IGEgPyAtMSA6IDEpO1xuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgIHJldHVybiAoYSwgYikgPT4gbmV3IERhdGUoYSkgLSBuZXcgRGF0ZShiKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAoYSwgYikgPT4gKGEubG9jYWxlQ29tcGFyZSA/IGEubG9jYWxlQ29tcGFyZShiKSA6IDEpO1xuICAgIH1cbiAgfSxcbiAgZ2V0U29ydFZhbHVlR2V0dGVyOiAoY29sKSA9PiB7XG4gICAgaWYgKGNvbC5zb3J0VmFsdWVHZXR0ZXIpIHtcbiAgICAgIHJldHVybiBjb2wuc29ydFZhbHVlR2V0dGVyO1xuICAgIH1cbiAgICByZXR1cm4gKGRhdGEpID0+IHtcbiAgICAgIGNvbnN0IGNlbGxEYXRhID0gZGF0YS5nZXRJbihjb2wudmFsdWVLZXlQYXRoKTtcbiAgICAgIC8vIERlYWwgd2l0aCBzZWxlY3QgYW5kIG11bHRpc2VsZWN0IGNvbXBvbmVudFR5cGVzXG4gICAgICBpZiAoY29sLnNlbGVjdENvbXBvbmVudE9wdGlvbnMpIHtcbiAgICAgICAgaWYgKExpc3QuaXNMaXN0KGNlbGxEYXRhKSB8fCBBcnJheS5pc0FycmF5KGNlbGxEYXRhKSkge1xuICAgICAgICAgIGNvbnN0IGxhYmVscyA9IFtdO1xuICAgICAgICAgIGNlbGxEYXRhLmZvckVhY2goKGQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZvdW5kID0gY29sLnNlbGVjdENvbXBvbmVudE9wdGlvbnMuZmluZChvID0+IG8udmFsdWUgPT09IGQpO1xuICAgICAgICAgICAgaWYgKGZvdW5kKSBsYWJlbHMucHVzaChmb3VuZC5sYWJlbCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIGxhYmVscy5qb2luKCcgJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZm91bmQgPSBjb2wuc2VsZWN0Q29tcG9uZW50T3B0aW9ucy5maW5kKG8gPT4gby52YWx1ZSA9PT0gY2VsbERhdGEpO1xuICAgICAgICBpZiAoZm91bmQpIHJldHVybiBmb3VuZC5sYWJlbDtcbiAgICAgIH1cbiAgICAgIGlmIChjZWxsRGF0YSAmJiBjZWxsRGF0YS5qb2luKSByZXR1cm4gY2VsbERhdGEuam9pbignICcpO1xuICAgICAgcmV0dXJuIGNlbGxEYXRhO1xuICAgIH07XG4gIH0sXG4gIGdldFZhbHVlRW1wdHlDaGVja2VyOiAoY29sKSA9PiB7XG4gICAgaWYgKGNvbC52YWx1ZUVtcHR5Q2hlY2tlcikge1xuICAgICAgcmV0dXJuIGNvbC52YWx1ZUVtcHR5Q2hlY2tlcjtcbiAgICB9XG4gICAgaWYgKGNvbC5jb21wb25lbnRUeXBlID09PSAnbXVsdGlzZWxlY3QnKSB7XG4gICAgICByZXR1cm4gdmFsID0+IHZhbCA9PT0gJycgfHwgdmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkIHx8IHZhbC5sZW5ndGggPT09IDAgfHwgdmFsLnNpemUgPT09IDA7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGNvbC52YWx1ZVR5cGUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICAgIHJldHVybiB2YWwgPT4gdmFsID09PSAnJyB8fCBpc05hTih2YWwpIHx8IHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZDtcbiAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgIGNhc2UgJ3NlbGVjdCc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdmFsID0+IHZhbCA9PT0gJycgfHwgdmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfSxcbiAgZ2V0RmlsdGVyTWF0Y2hlcjogKGNvbCwgZGF0ZUZvcm1hdCkgPT4ge1xuICAgIGlmIChjb2wuZmlsdGVyTWF0Y2hlcikgcmV0dXJuIGNvbC5maWx0ZXJNYXRjaGVyO1xuICAgIGNvbnN0IGdldFZhbCA9IHJvdyA9PiByb3cuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG5cbiAgICBpZiAoY29sLmNvbXBvbmVudFR5cGUgPT09ICdtdWx0aXNlbGVjdCcpIHtcbiAgICAgIHJldHVybiAocm93LCBmaWx0ZXJWYWwpID0+IHtcbiAgICAgICAgLy8gdmFsdWUgY2FuIGJlIHNpbXBsZSB2YWx1ZSwgaW1tdXRhYmxlIExpc3Qgb3IgYXJyYXlcbiAgICAgICAgY29uc3QgdmFsdWUgPSBnZXRWYWwocm93KTtcbiAgICAgICAgLy8gc2Vzc2lvbiBzdG9yYWdlIGNvbnRlbnQgaXMgY29udmVydGVkIHRvIGltbXV0YWJsZSBhbmQgbXVsdGlzZWxlY3RcbiAgICAgICAgLy8gZmlsdGVycyBpcyB0aGVuIGxpc3Qgb3RoZXJ3aXNlIGFycmF5XG4gICAgICAgIGNvbnN0IGZpbHRlcnMgPSBmaWx0ZXJWYWwgJiYgZmlsdGVyVmFsLnRvSlMgPyBmaWx0ZXJWYWwudG9KUygpIDogZmlsdGVyVmFsO1xuICAgICAgICByZXR1cm4gZmlsdGVycy5zb21lKChmaWx0ZXIpID0+IHtcbiAgICAgICAgICBpZiAoTGlzdC5pc0xpc3QodmFsdWUpIHx8IEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUuZmluZEluZGV4KHYgPT4gdiA9PT0gZmlsdGVyLnZhbHVlKSAhPT0gLTE7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmaWx0ZXIudmFsdWUgPT09IHZhbHVlO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgc3dpdGNoIChjb2wudmFsdWVUeXBlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICByZXR1cm4gKHJvdywgZmlsdGVyVmFsKSA9PiB7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBnZXRWYWwocm93KTtcbiAgICAgICAgICBpZiAodmFsdWUgPT09ICcnIHx8IGlzTmFOKHZhbHVlKSB8fCB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIG1hdGNoIGV4YWN0IG51bWJlciB2YWx1ZVxuICAgICAgICAgIGNvbnN0IGZpbHRlclZhbEludCA9IHBhcnNlSW50KGZpbHRlclZhbCwgMTApO1xuICAgICAgICAgIGNvbnN0IHZhbEludCA9IHBhcnNlSW50KHZhbHVlLCAxMCk7XG4gICAgICAgICAgaWYgKGZpbHRlclZhbEludCA9PT0gdmFsSW50IHx8IGZpbHRlclZhbEludCA9PT0gdmFsSW50ICogLTEpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBtYXRjaCBwYXJ0aWFsXG4gICAgICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSkuaW5jbHVkZXMoZmlsdGVyVmFsKTtcbiAgICAgICAgfTtcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgICAgcmV0dXJuIChyb3csIGZpbHRlclZhbCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gZ2V0VmFsKHJvdyk7XG4gICAgICAgICAgaWYgKHZhbHVlID09PSAnJyB8fCBpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBtYXRjaCBleGFjdCBmbG9hdCB2YWx1ZVxuICAgICAgICAgIGNvbnN0IGZpbHRlclZhbEZsb2F0ID0gcGFyc2VGbG9hdChmaWx0ZXJWYWwucmVwbGFjZSgnLCcsICcuJykpO1xuICAgICAgICAgIGlmIChmaWx0ZXJWYWxGbG9hdCA9PT0gcGFyc2VGbG9hdCh2YWx1ZSkgfHwgZmlsdGVyVmFsRmxvYXQgPT09IHBhcnNlRmxvYXQodmFsdWUpICogLTEpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBtYXRjaCBwYXJ0aWFsXG4gICAgICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSkucmVwbGFjZSgnLCcsICcuJykuaW5jbHVkZXMoZmlsdGVyVmFsLnJlcGxhY2UoJywnLCAnLicpKTtcbiAgICAgICAgfTtcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICByZXR1cm4gKHJvdywgZmlsdGVyVmFsKSA9PiB7XG4gICAgICAgICAgaWYgKG1vbWVudChnZXRWYWwocm93KSkuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gbW9tZW50KGdldFZhbChyb3cpKS5mb3JtYXQoZGF0ZUZvcm1hdCkgPT09IG1vbWVudChmaWx0ZXJWYWwpLmZvcm1hdChkYXRlRm9ybWF0KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9O1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICBjYXNlICd0ZXh0JzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAocm93LCBmaWx0ZXJWYWwpID0+IHtcbiAgICAgICAgICBjb25zdCB0cmltbWVkVmFsID0gZmlsdGVyVmFsLnRyaW0oKTtcbiAgICAgICAgICBsZXQgZXNjYXBlZFZhbCA9IHRyaW1tZWRWYWw7XG4gICAgICAgICAgY29uc3Qgc3BlY2lhbENoYXJzID0gJ1tdXFxcXF4kLnw/KisoKSc7XG5cbiAgICAgICAgICAvLyBJZiBmaWx0ZXIgdmFsIHN0YXJ0cyB3aXRoIGEgUmVnZXggc3BlY2lhbCBjaGFyYWN0ZXIsIHdlIG11c3QgZXNjYXBlIGl0XG4gICAgICAgICAgaWYgKHNwZWNpYWxDaGFycy5pbmNsdWRlcyh0cmltbWVkVmFsWzBdKSkgZXNjYXBlZFZhbCA9IGBcXFxcJHt0cmltbWVkVmFsfWA7XG4gICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoZXNjYXBlZFZhbCwgJ2knKS50ZXN0KGdldFZhbChyb3cpKTtcbiAgICAgICAgfTtcbiAgICB9XG4gIH0sXG4gIGxvYWRTZWxlY3RlZEl0ZW1zOiAoZ3JpZCkgPT4ge1xuICAgIGNvbnN0IHNlc3Npb25JdGVtID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShgb2NfZ3JpZF9zZWxlY3RlZEl0ZW1zXyR7Z3JpZC5pZH1gKTtcbiAgICBpZiAoc2Vzc2lvbkl0ZW0gJiYgIWdyaWQuZGlzYWJsZVJlbWVtYmVyU2VsZWN0ZWRJdGVtcykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uoc2Vzc2lvbkl0ZW0pO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhZ3JpZDogZXJyb3IgcGFyc2luZyBzZWxlY3RlZEl0ZW1zIGZyb20gc2Vzc2lvblN0b3JhZ2UnLCBlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFtdO1xuICB9LFxuICBsb2FkR3JpZENvbmZpZzogKGdyaWQsIGNvbHMpID0+IHtcbiAgICBjb25zdCBjb25maWdTdG9yYWdlID0gZ3JpZC5jb25maWdTdG9yYWdlIHx8IHt9O1xuICAgIGNvbnN0IHNvcnRpbmdEYXRhID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShgb2NfZ3JpZF9zb3J0aW5nXyR7Z3JpZC5pZH1gKTtcbiAgICBjb25zdCBmaWx0ZXJEYXRhID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShgb2NfZ3JpZF9maWx0ZXJpbmdfJHtncmlkLmlkfWApO1xuICAgIGNvbnN0IGlzRmlsdGVyaW5nRGF0YSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX2lzRmlsdGVyaW5nXyR7Z3JpZC5pZH1gKTtcbiAgICBjb25zdCBwYWdlID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShgb2NfZ3JpZF9wYWdlXyR7Z3JpZC5pZH1gKTtcbiAgICBjb25zdCByb3dzT25QYWdlID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShgb2NfZ3JpZF9yb3dzT25QYWdlXyR7Z3JpZC5pZH1gKTtcbiAgICBsZXQgbG9hZGVkQ29uZmlnID0ge307XG4gICAgbGV0IGhpZGRlbkNvbHVtbnM7XG4gICAgbGV0IGNvbHVtbk9yZGVyO1xuICAgIGxldCBpc0ZpbHRlcmluZyA9IGZhbHNlO1xuXG4gICAgaWYgKGlzRnVuY3Rpb24oY29uZmlnU3RvcmFnZS5sb2FkKSkge1xuICAgICAgbG9hZGVkQ29uZmlnID0gY29uZmlnU3RvcmFnZS5sb2FkKCk7XG4gICAgfVxuXG4gICAgaWYgKGlzRmlsdGVyaW5nRGF0YSkge1xuICAgICAgaWYgKCFncmlkLmRpc2FibGVSZW1lbWJlcklzRmlsdGVyaW5nKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaXNGaWx0ZXJpbmcgPSBKU09OLnBhcnNlKGlzRmlsdGVyaW5nRGF0YSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIGlzRmlsdGVyaW5nRGF0YSBmcm9tIGxvY2FsU3RvcmFnZScsIGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChncmlkLmRlZmF1bHRTaG93RmlsdGVyaW5nUm93KSB7XG4gICAgICBpc0ZpbHRlcmluZyA9IHRydWU7XG4gICAgfVxuICAgIGlmIChsb2FkZWRDb25maWcuaGlkZGVuQ29sdW1ucykge1xuICAgICAgaGlkZGVuQ29sdW1ucyA9IGxvYWRlZENvbmZpZy5oaWRkZW5Db2x1bW5zOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGhpZGRlbkNvbHVtbnNKc29uID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfaGlkZGVuQ29sdW1uc18ke2dyaWQuaWR9YCk7XG4gICAgICBpZiAoaGlkZGVuQ29sdW1uc0pzb24pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBoaWRkZW5Db2x1bW5zID0gSlNPTi5wYXJzZShoaWRkZW5Db2x1bW5zSnNvbik7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIGhpZGRlbkNvbHVtbnMgZnJvbSBsb2NhbFN0b3JhZ2UnLCBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAobG9hZGVkQ29uZmlnLmNvbHVtbk9yZGVyKSB7XG4gICAgICBjb2x1bW5PcmRlciA9IGxvYWRlZENvbmZpZy5jb2x1bW5PcmRlcjsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjb2x1bW5PcmRlckpzb24gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgb2NfZ3JpZF9jb2x1bW5PcmRlcl8ke2dyaWQuaWR9YCk7XG4gICAgICBpZiAoY29sdW1uT3JkZXJKc29uKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29sdW1uT3JkZXIgPSBKU09OLnBhcnNlKGNvbHVtbk9yZGVySnNvbik7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIGNvbHVtbk9yZGVyIGZyb20gbG9jYWxTdG9yYWdlJywgZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgdmlzaWJsZUNvbHVtbnM6IGdldFZpc2libGVDb2x1bW5zKGNvbHMsIGhpZGRlbkNvbHVtbnMsIGNvbHVtbk9yZGVyKSxcbiAgICAgIGZpbHRlcmluZ0RhdGE6IHtcbiAgICAgICAgaXNGaWx0ZXJpbmcsXG4gICAgICB9LFxuICAgIH07XG4gICAgaWYgKGxvYWRlZENvbmZpZy5jb2x1bW5XaWR0aHMpIHtcbiAgICAgIGNvbmZpZy5jb2x1bW5XaWR0aHMgPSBsb2FkZWRDb25maWcuY29sdW1uV2lkdGhzO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjb2x1bW5XaWR0aHMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgb2NfZ3JpZF9jb2x1bW5XaWR0aHNfJHtncmlkLmlkfWApO1xuICAgICAgaWYgKGNvbHVtbldpZHRocyAmJiAhZ3JpZC5kaXNhYmxlUmVtZW1iZXJDb2x1bW5XaWR0aHMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25maWcuY29sdW1uV2lkdGhzID0gSlNPTi5wYXJzZShjb2x1bW5XaWR0aHMpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhZ3JpZDogZXJyb3IgcGFyc2luZyBjb2x1bW5XaWR0aHMgZnJvbSBsb2NhbFN0b3JhZ2UnLCBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc29ydGluZ0RhdGEgJiYgIWdyaWQuZGlzYWJsZVJlbWVtYmVyU29ydERhdGEpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbmZpZy5zb3J0aW5nRGF0YSA9IEpTT04ucGFyc2Uoc29ydGluZ0RhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhZ3JpZDogZXJyb3IgcGFyc2luZyBzb3J0aW5nRGF0YSBmcm9tIHNlc3Npb25TdG9yYWdlJywgZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChmaWx0ZXJEYXRhICYmIGlzRmlsdGVyaW5nICYmICFncmlkLmRpc2FibGVSZW1lbWJlckZpbHRlckRhdGEpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbmZpZy5maWx0ZXJpbmdEYXRhLmZpbHRlckRhdGEgPSBKU09OLnBhcnNlKGZpbHRlckRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhZ3JpZDogZXJyb3IgcGFyc2luZyBmaWx0ZXJEYXRhIGZyb20gc2Vzc2lvblN0b3JhZ2UnLCBlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHBhZ2UpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbmZpZy5wYWdlID0gSlNPTi5wYXJzZShwYWdlKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgcGFnaW5hdGlvbiBmcm9tIHNlc3Npb25TdG9yYWdlJywgZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChyb3dzT25QYWdlKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25maWcucm93c09uUGFnZSA9IEpTT04ucGFyc2Uocm93c09uUGFnZSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIHBhZ2luYXRpb24gZnJvbSBzZXNzaW9uU3RvcmFnZScsIGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghY29uZmlnLnNvcnRpbmdEYXRhICYmIGdyaWQuZGVmYXVsdFNvcnRDb2x1bW4pIHtcbiAgICAgIGNvbmZpZy5zb3J0aW5nRGF0YSA9IHtcbiAgICAgICAgc29ydENvbHVtbjogZ3JpZC5kZWZhdWx0U29ydENvbHVtbixcbiAgICAgICAgc29ydE9yZGVyOiBncmlkLmRlZmF1bHRTb3J0T3JkZXIgfHwgJ2FzYycsXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gY29uZmlnO1xuICB9LFxuICBzYXZlU2VsZWN0ZWRJdGVtczogKGdyaWQsIHNlbGVjdGVkSXRlbXMpID0+IHtcbiAgICBpZiAoZ3JpZC5kaXNhYmxlUmVtZW1iZXJTZWxlY3RlZEl0ZW1zKSByZXR1cm4gZmFsc2U7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9zZWxlY3RlZEl0ZW1zXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShzZWxlY3RlZEl0ZW1zIHx8IFtdKSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIHNhdmVDb2x1bW5XaWR0aHM6IChncmlkLCBjb2x1bW5XaWR0aHMpID0+IHtcbiAgICBpZiAoZ3JpZC5kaXNhYmxlUmVtZW1iZXJDb2x1bW5XaWR0aHMpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIWNvbHVtbldpZHRocykgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChncmlkLmNvbmZpZ1N0b3JhZ2UgJiYgaXNGdW5jdGlvbihncmlkLmNvbmZpZ1N0b3JhZ2Uuc2F2ZSkpIHtcbiAgICAgIGdyaWQuY29uZmlnU3RvcmFnZS5zYXZlKHsgY29sdW1uV2lkdGhzIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9jb2x1bW5XaWR0aHNfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KGNvbHVtbldpZHRocykpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgc2F2ZUNvbHVtblNldHRpbmdzOiAoZ3JpZCwgaGlkZGVuQ29sdW1ucywgY29sdW1uT3JkZXIpID0+IHtcbiAgICBpZiAoIWhpZGRlbkNvbHVtbnMgfHwgIWNvbHVtbk9yZGVyKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGdyaWQuY29uZmlnU3RvcmFnZSAmJiBpc0Z1bmN0aW9uKGdyaWQuY29uZmlnU3RvcmFnZS5zYXZlKSkge1xuICAgICAgZ3JpZC5jb25maWdTdG9yYWdlLnNhdmUoeyBoaWRkZW5Db2x1bW5zLCBjb2x1bW5PcmRlciB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYG9jX2dyaWRfaGlkZGVuQ29sdW1uc18ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoaGlkZGVuQ29sdW1ucykpO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYG9jX2dyaWRfY29sdW1uT3JkZXJfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KGNvbHVtbk9yZGVyKSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBzYXZlU29ydERhdGE6IChncmlkLCBzb3J0aW5nRGF0YSkgPT4ge1xuICAgIGlmIChncmlkLmRpc2FibGVSZW1lbWJlclNvcnREYXRhKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFzb3J0aW5nRGF0YSkgcmV0dXJuIGZhbHNlO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oYG9jX2dyaWRfc29ydGluZ18ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoc29ydGluZ0RhdGEpKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgc2F2ZUZpbHRlckRhdGE6IChncmlkLCBmaWx0ZXJEYXRhKSA9PiB7XG4gICAgaWYgKGdyaWQuZGlzYWJsZVJlbWVtYmVyRmlsdGVyRGF0YSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghZmlsdGVyRGF0YSkgcmV0dXJuIGZhbHNlO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oYG9jX2dyaWRfZmlsdGVyaW5nXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShmaWx0ZXJEYXRhKSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIHNhdmVJc0ZpbHRlcmluZzogKGdyaWQsIGlzRmlsdGVyaW5nKSA9PiB7XG4gICAgaWYgKGdyaWQuZGlzYWJsZVJlbWVtYmVySXNGaWx0ZXJpbmcpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoaXNGaWx0ZXJpbmcgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZhbHNlO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX2lzRmlsdGVyaW5nXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShpc0ZpbHRlcmluZykpO1xuICAgIGlmICghaXNGaWx0ZXJpbmcpIHtcbiAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oYG9jX2dyaWRfZmlsdGVyaW5nXyR7Z3JpZC5pZH1gKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIHNhdmVQYWdlOiAoZ3JpZCwgcGFnZSkgPT4ge1xuICAgIGlmICghcGFnZSkgcmV0dXJuIGZhbHNlO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oYG9jX2dyaWRfcGFnZV8ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkocGFnZSkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBzYXZlUm93c09uUGFnZTogKGdyaWQsIHJvd3NPblBhZ2UpID0+IHtcbiAgICBpZiAoIXJvd3NPblBhZ2UpIHJldHVybiBmYWxzZTtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX3Jvd3NPblBhZ2VfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KHJvd3NPblBhZ2UpKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuICBjaGVja0dyaWRQYXJhbTogKGdyaWRQYXJhbSkgPT4ge1xuICAgIGlmIChncmlkUGFyYW0pIHtcbiAgICAgIGlmICghZ3JpZFBhcmFtLmlkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnW0dyaWRdIEludmFsaWQgYGdyaWQuaWRgIHBhcmFtZXRlciwgdXBkYXRlIGFjdGlvbiBwYXJhbWV0ZXJzIHRvIG5ldyBmb3JtYXQhJyxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmICghZ3JpZFBhcmFtLmlkS2V5UGF0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ1tHcmlkXSBJbnZhbGlkIGBncmlkLmlkS2V5UGF0aGAgcGFyYW1ldGVyLCB1cGRhdGUgYWN0aW9uIHBhcmFtZXRlcnMgdG8gbmV3IGZvcm1hdCEnLFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tHcmlkXSBJbnZhbGlkIGBncmlkYCBwYXJhbWV0ZXIsIHVwZGF0ZSBhY3Rpb24gcGFyYW1ldGVycyB0byBuZXcgZm9ybWF0IScpO1xuICAgIH1cbiAgfSxcbiAgY2hlY2tDb2x1bW5zUGFyYW06IChjb2x1bW5zUGFyYW0pID0+IHtcbiAgICBpZiAoIWNvbHVtbnNQYXJhbSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnW0dyaWRdIEludmFsaWQgYGNvbHVtbnNgIHBhcmFtZXRlciwgdXBkYXRlIGFjdGlvbiBwYXJhbWV0ZXJzIHRvIG5ldyBmb3JtYXQhJyxcbiAgICAgICk7XG4gICAgfVxuICB9LFxuICAvLyBMb2NhbGUgZ2V0dGVycywgc3VwcG9ydCBncmlkIHBhcmFtIG9yIHVzZXIgc3RhdGUgdXNlZCBpbiBPQyBhcHBsaWNhdGlvbnNcbiAgZ2V0TGFuZ3VhZ2U6IChncmlkLCBvY1VzZXJTdGF0ZSkgPT4ge1xuICAgIGlmIChncmlkLmxhbmd1YWdlICYmIHR5cGVvZiBncmlkLmxhbmd1YWdlID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGdyaWQubGFuZ3VhZ2U7XG4gICAgfVxuICAgIGlmIChvY1VzZXJTdGF0ZSkge1xuICAgICAgcmV0dXJuIG9jVXNlclN0YXRlLmdldEluKFsndXNlcicsICdsYW5ndWFnZSddLCAnZW4nKTtcbiAgICB9XG4gICAgcmV0dXJuICdlbic7XG4gIH0sXG4gIGdldFJlZ2lvbjogKGdyaWQsIG9jVXNlclN0YXRlKSA9PiB7XG4gICAgY29uc3QgZGVmYXVsdFJlZ2lvbiA9ICdlbl9HQic7XG4gICAgaWYgKGdyaWQucmVnaW9uICYmIHR5cGVvZiBncmlkLnJlZ2lvbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBncmlkLnJlZ2lvbjtcbiAgICB9XG4gICAgaWYgKG9jVXNlclN0YXRlKSB7XG4gICAgICByZXR1cm4gb2NVc2VyU3RhdGUuZ2V0SW4oWyd1c2VyJywgJ3JlZ2lvbiddLCBkZWZhdWx0UmVnaW9uKTtcbiAgICB9XG4gICAgcmV0dXJuIGRlZmF1bHRSZWdpb247XG4gIH0sXG4gIGdldERhdGVGb3JtYXQ6IChncmlkLCBvY1VzZXJTdGF0ZSkgPT4ge1xuICAgIGlmIChncmlkLmRhdGVGb3JtYXQgJiYgdHlwZW9mIGdyaWQuZGF0ZUZvcm1hdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBncmlkLmRhdGVGb3JtYXQudG9VcHBlckNhc2UoKTtcbiAgICB9XG4gICAgaWYgKG9jVXNlclN0YXRlKSB7XG4gICAgICByZXR1cm4gb2NVc2VyU3RhdGUuZ2V0SW4oWydsb2NhbGVGb3JtYXQnLCAnZGF0ZUZvcm1hdCddLCAnTCcpO1xuICAgIH1cbiAgICByZXR1cm4gJ0wnO1xuICB9LFxuICBnZXRUaG91c2FuZFNlcGFyYXRvcjogKGdyaWQsIG9jVXNlclN0YXRlKSA9PiB7XG4gICAgaWYgKGdyaWQudGhvdXNhbmRTZXBhcmF0b3IgJiYgdHlwZW9mIGdyaWQubGFuZ3VhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZ3JpZC50aG91c2FuZFNlcGFyYXRvcjtcbiAgICB9XG4gICAgaWYgKG9jVXNlclN0YXRlKSB7XG4gICAgICByZXR1cm4gb2NVc2VyU3RhdGUuZ2V0SW4oWydsb2NhbGVGb3JtYXQnLCAndGhvdXNhbmRTZXBhcmF0b3InXSwgJycpO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH0sXG4gIGdldERlY2ltYWxTZXBhcmF0b3I6IChncmlkLCBvY1VzZXJTdGF0ZSkgPT4ge1xuICAgIGlmIChncmlkLmRlY2ltYWxTZXBhcmF0b3IgJiYgdHlwZW9mIGdyaWQubGFuZ3VhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZ3JpZC5kZWNpbWFsU2VwYXJhdG9yO1xuICAgIH1cbiAgICBpZiAob2NVc2VyU3RhdGUpIHtcbiAgICAgIHJldHVybiBvY1VzZXJTdGF0ZS5nZXRJbihbJ2xvY2FsZUZvcm1hdCcsICdkZWNpbWFsU2VwYXJhdG9yJ10sICcuJyk7XG4gICAgfVxuICAgIHJldHVybiAnLic7XG4gIH0sXG4gIG5vcm1hbGl6ZUZpbHRlcmluZ0RhdGE6IChmaWx0ZXJpbmdEYXRhKSA9PiB7XG4gICAgbGV0IG5ld0ZpbHRlcmluZ0RhdGEgPSBNYXAoeyBpc0ZpbHRlcmluZzogZmFsc2UgfSk7XG4gICAgaWYgKCFmaWx0ZXJpbmdEYXRhKSByZXR1cm4gbmV3RmlsdGVyaW5nRGF0YTtcblxuICAgIGNvbnN0IG9sZEZpbHRlcmluZ0RhdGEgPSBNYXAuaXNNYXAoZmlsdGVyaW5nRGF0YSkgPyBmaWx0ZXJpbmdEYXRhIDogZnJvbUpTKGZpbHRlcmluZ0RhdGEpO1xuICAgIGNvbnN0IGlzRmlsdGVyaW5nID0gb2xkRmlsdGVyaW5nRGF0YS5nZXQoJ2lzRmlsdGVyaW5nJywgZmFsc2UpO1xuICAgIGNvbnN0IGZpbHRlckRhdGEgPSBvbGRGaWx0ZXJpbmdEYXRhLmdldCgnZmlsdGVyRGF0YScsIG51bGwpO1xuXG4gICAgaWYgKGlzRmlsdGVyaW5nICYmIGZpbHRlckRhdGEgJiYgTWFwLmlzTWFwKGZpbHRlckRhdGEpKSB7XG4gICAgICBuZXdGaWx0ZXJpbmdEYXRhID0gbmV3RmlsdGVyaW5nRGF0YS5zZXQoJ2lzRmlsdGVyaW5nJywgdHJ1ZSkuc2V0KCdmaWx0ZXJEYXRhJywgZmlsdGVyRGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld0ZpbHRlcmluZ0RhdGE7XG4gIH0sXG4gIC8qXG4gICAqIEBmdW5jdGlvbiB2aXNpYmxlQ29sdW1uc1xuICAgKiBAZGVzYyAgUmV0dXJucyBlaXRoZXIgdmlzaWJsZSBjb2x1bW5zIChpZiBzb21lIGNvbHVtbnMgYXJlIGhpZGRlbiApXG4gICAqICAgICAgICBvciBncmlkIGRlZmF1bHQgY29sdW1ucy5cbiAgICogQHBhcmFtIG9yaWdDb2x1bW5zIEFycmF5IG9mIEdyaWQgb3JpZ2luYWwgY29sdW1ucyBvYmplY3RzXG4gICAqIEBwYXJhbSB2aXNpYmxlQ29sdW1ucyBBcnJheSBvZiBHcmlkIHZpc2libGUgY29sdW1ucyB2YWx1ZUtleVBhdGhzXG4gICAqIEByZXR1cm5zIEFycmF5IG9mIGNvbHVtbiBvYmplY3RzIGN1cnJlbnRseSB2aXNpYmxlIGZvciB1c2VyLlxuICAgKi9cbiAgdmlzaWJsZUNvbHVtbnM6IChvcmlnQ29sdW1ucywgdmlzaWJsZUNvbHVtbnMpID0+IHtcbiAgICBpZiAoIXZpc2libGVDb2x1bW5zKSByZXR1cm4gb3JpZ0NvbHVtbnM7XG4gICAgY29uc3QgZmlsdGVyZWQgPSB2aXNpYmxlQ29sdW1ucy5tYXAoXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICBzZWFyY2hDb2wgPT4gb3JpZ0NvbHVtbnMuZmluZChcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgIC8vIHZhbHVlS2V5UGF0aCBpcyBqb2luZWQgaGVyZSBhcyBpdCBjYW4gYmUgYW4gYXJyYXkgbGlrZSBbJ2tleTEnLCAna2V5MiddLlxuICAgICAgICAvLyBzZWFyY2hDb2wgaXMgc2ltaWxhcmx5IGpvaW5lZCBpbiBvbkNlbGxLZXlEb3duIGluIGRhdGFncmlkLmNvbXBvbmVudC5qc3hcbiAgICAgICAgY29sID0+IEpTT04uc3RyaW5naWZ5KGNvbC52YWx1ZUtleVBhdGguam9pbignLycpKSA9PT0gSlNPTi5zdHJpbmdpZnkoc2VhcmNoQ29sKSxcbiAgICAgICksXG4gICAgKTtcbiAgICByZXR1cm4gZmlsdGVyZWQudG9KUygpO1xuICB9LFxufTtcbiJdfQ==