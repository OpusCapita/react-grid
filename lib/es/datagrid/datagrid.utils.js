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
          var escapedVal = filterVal;
          var specialChars = '[]\\^$.|?*+()'; // If filter val starts with a Regex special character, we must escape it

          if (specialChars.includes(filterVal[0])) escapedVal = "\\" + filterVal;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC51dGlscy5qcyJdLCJuYW1lcyI6WyJtb21lbnQiLCJpc05hTiIsImlzRnVuY3Rpb24iLCJNYXAiLCJmcm9tSlMiLCJMaXN0IiwiZ2V0Q29sdW1uS2V5IiwiY29sIiwiY29sdW1uS2V5IiwidmFsdWVLZXlQYXRoIiwiam9pbiIsImdldFZpc2libGVDb2x1bW5zIiwiY29scyIsImhpZGRlbkNvbHVtbnMiLCJjb2x1bW5PcmRlciIsIm9yZGVyZWRDb2x1bW5MaXN0IiwiZm9yRWFjaCIsImkiLCJjb2xPcmRlcklkeCIsImluZGV4T2YiLCJkZWZhdWx0SGlkZGVuIiwiaXNIaWRkZW4iLCJvcmRlciIsInB1c2giLCJzb3J0IiwiYSIsImIiLCJtYXAiLCJpdGVtIiwiZ2V0Q29sdW1uRGVmYXVsdFZhbHVlcyIsImNvbHVtbkRlZmF1bHRWYWx1ZXMiLCJkZWZhdWx0VmFsdWUiLCJ1bmRlZmluZWQiLCJnZXRDZWxsU3R5bGVCeUNvbCIsImFsaWduIiwidGV4dEFsaWduIiwiY29tcG9uZW50VHlwZSIsInZhbHVlVHlwZSIsImlzU29ydGFibGUiLCJzb3J0VmFsdWVHZXR0ZXIiLCJkaXNhYmxlU29ydGluZyIsImdldFNvcnRDb21wYXJhdG9yIiwic29ydENvbXBhcmF0b3IiLCJsb2NhbGVDb21wYXJlIiwiRGF0ZSIsImdldFNvcnRWYWx1ZUdldHRlciIsImRhdGEiLCJjZWxsRGF0YSIsImdldEluIiwic2VsZWN0Q29tcG9uZW50T3B0aW9ucyIsImlzTGlzdCIsIkFycmF5IiwiaXNBcnJheSIsImxhYmVscyIsImQiLCJmb3VuZCIsImZpbmQiLCJvIiwidmFsdWUiLCJsYWJlbCIsImdldFZhbHVlRW1wdHlDaGVja2VyIiwidmFsdWVFbXB0eUNoZWNrZXIiLCJ2YWwiLCJsZW5ndGgiLCJzaXplIiwiZ2V0RmlsdGVyTWF0Y2hlciIsImRhdGVGb3JtYXQiLCJmaWx0ZXJNYXRjaGVyIiwiZ2V0VmFsIiwicm93IiwiZmlsdGVyVmFsIiwiZmlsdGVycyIsInRvSlMiLCJzb21lIiwiZmlsdGVyIiwiZmluZEluZGV4IiwidiIsImZpbHRlclZhbEludCIsInBhcnNlSW50IiwidmFsSW50IiwiU3RyaW5nIiwiaW5jbHVkZXMiLCJmaWx0ZXJWYWxGbG9hdCIsInBhcnNlRmxvYXQiLCJyZXBsYWNlIiwiaXNWYWxpZCIsImZvcm1hdCIsImVzY2FwZWRWYWwiLCJzcGVjaWFsQ2hhcnMiLCJSZWdFeHAiLCJ0ZXN0IiwibG9hZFNlbGVjdGVkSXRlbXMiLCJncmlkIiwic2Vzc2lvbkl0ZW0iLCJzZXNzaW9uU3RvcmFnZSIsImdldEl0ZW0iLCJpZCIsImRpc2FibGVSZW1lbWJlclNlbGVjdGVkSXRlbXMiLCJKU09OIiwicGFyc2UiLCJlIiwiY29uc29sZSIsImVycm9yIiwibG9hZEdyaWRDb25maWciLCJjb25maWdTdG9yYWdlIiwic29ydGluZ0RhdGEiLCJmaWx0ZXJEYXRhIiwiaXNGaWx0ZXJpbmdEYXRhIiwibG9jYWxTdG9yYWdlIiwicGFnZSIsInJvd3NPblBhZ2UiLCJsb2FkZWRDb25maWciLCJpc0ZpbHRlcmluZyIsImxvYWQiLCJkaXNhYmxlUmVtZW1iZXJJc0ZpbHRlcmluZyIsImRlZmF1bHRTaG93RmlsdGVyaW5nUm93IiwiaGlkZGVuQ29sdW1uc0pzb24iLCJjb2x1bW5PcmRlckpzb24iLCJjb25maWciLCJ2aXNpYmxlQ29sdW1ucyIsImZpbHRlcmluZ0RhdGEiLCJjb2x1bW5XaWR0aHMiLCJkaXNhYmxlUmVtZW1iZXJDb2x1bW5XaWR0aHMiLCJkaXNhYmxlUmVtZW1iZXJTb3J0RGF0YSIsImRpc2FibGVSZW1lbWJlckZpbHRlckRhdGEiLCJkZWZhdWx0U29ydENvbHVtbiIsInNvcnRDb2x1bW4iLCJzb3J0T3JkZXIiLCJkZWZhdWx0U29ydE9yZGVyIiwic2F2ZVNlbGVjdGVkSXRlbXMiLCJzZWxlY3RlZEl0ZW1zIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsInNhdmVDb2x1bW5XaWR0aHMiLCJzYXZlIiwic2F2ZUNvbHVtblNldHRpbmdzIiwic2F2ZVNvcnREYXRhIiwic2F2ZUZpbHRlckRhdGEiLCJzYXZlSXNGaWx0ZXJpbmciLCJyZW1vdmVJdGVtIiwic2F2ZVBhZ2UiLCJzYXZlUm93c09uUGFnZSIsImNoZWNrR3JpZFBhcmFtIiwiZ3JpZFBhcmFtIiwiRXJyb3IiLCJpZEtleVBhdGgiLCJjaGVja0NvbHVtbnNQYXJhbSIsImNvbHVtbnNQYXJhbSIsImdldExhbmd1YWdlIiwib2NVc2VyU3RhdGUiLCJsYW5ndWFnZSIsImdldFJlZ2lvbiIsImRlZmF1bHRSZWdpb24iLCJyZWdpb24iLCJnZXREYXRlRm9ybWF0IiwidG9VcHBlckNhc2UiLCJnZXRUaG91c2FuZFNlcGFyYXRvciIsInRob3VzYW5kU2VwYXJhdG9yIiwiZ2V0RGVjaW1hbFNlcGFyYXRvciIsImRlY2ltYWxTZXBhcmF0b3IiLCJub3JtYWxpemVGaWx0ZXJpbmdEYXRhIiwibmV3RmlsdGVyaW5nRGF0YSIsIm9sZEZpbHRlcmluZ0RhdGEiLCJpc01hcCIsImdldCIsInNldCIsIm9yaWdDb2x1bW5zIiwiZmlsdGVyZWQiLCJzZWFyY2hDb2wiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0EsT0FBT0EsTUFBUCxNQUFtQixRQUFuQjtBQUNBLE9BQU9DLEtBQVAsTUFBa0IsY0FBbEI7QUFDQSxTQUFTQyxVQUFULFFBQTJCLE1BQTNCO0FBQ0EsU0FBU0MsR0FBVCxFQUFjQyxNQUFkLEVBQXNCQyxJQUF0QixRQUFrQyxXQUFsQzs7QUFFQSxJQUFNQyxZQUFZLEdBQUcsU0FBZkEsWUFBZSxDQUFBQyxHQUFHO0FBQUEsU0FBSUEsR0FBRyxDQUFDQyxTQUFKLElBQWlCRCxHQUFHLENBQUNFLFlBQUosQ0FBaUJDLElBQWpCLENBQXNCLEdBQXRCLENBQXJCO0FBQUEsQ0FBeEI7O0FBRUEsSUFBTUMsaUJBQWlCLEdBQUcsU0FBcEJBLGlCQUFvQixDQUFDQyxJQUFELEVBQU9DLGFBQVAsRUFBMkJDLFdBQTNCLEVBQWdEO0FBQUEsTUFBekNELGFBQXlDO0FBQXpDQSxJQUFBQSxhQUF5QyxHQUF6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QUFuRDtBQUFBLE9BSlEsQ0FBSjtBQUFBLEtBRk0sQ0FBakI7O0FBU0EsV0FBT0QsUUFBUSxDQUFDL0YsSUFBVCxFQUFQO0FBQ0Q7QUF2Y1ksQ0FBZiIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLW5lc3RlZC10ZXJuYXJ5ICovXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgaXNOYU4gZnJvbSAnbG9kYXNoL2lzTmFOJztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICd1dGlsJztcbmltcG9ydCB7IE1hcCwgZnJvbUpTLCBMaXN0IH0gZnJvbSAnaW1tdXRhYmxlJztcblxuY29uc3QgZ2V0Q29sdW1uS2V5ID0gY29sID0+IGNvbC5jb2x1bW5LZXkgfHwgY29sLnZhbHVlS2V5UGF0aC5qb2luKCcvJyk7XG5cbmNvbnN0IGdldFZpc2libGVDb2x1bW5zID0gKGNvbHMsIGhpZGRlbkNvbHVtbnMgPSBbXSwgY29sdW1uT3JkZXIgPSBbXSkgPT4ge1xuICBjb25zdCBvcmRlcmVkQ29sdW1uTGlzdCA9IFtdO1xuICBjb2xzLmZvckVhY2goKGNvbCwgaSkgPT4ge1xuICAgIGNvbnN0IGNvbHVtbktleSA9IGdldENvbHVtbktleShjb2wpO1xuICAgIGNvbnN0IGNvbE9yZGVySWR4ID0gY29sdW1uT3JkZXIuaW5kZXhPZihjb2x1bW5LZXkpO1xuICAgIGNvbnN0IGRlZmF1bHRIaWRkZW4gPSBjb2wuaXNIaWRkZW4gJiYgY29sT3JkZXJJZHggPT09IC0xO1xuICAgIGlmIChkZWZhdWx0SGlkZGVuIHx8IGhpZGRlbkNvbHVtbnMuaW5kZXhPZihjb2x1bW5LZXkpID4gLTEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgb3JkZXIgPSBjb2xPcmRlcklkeCAhPT0gLTEgPyBjb2xPcmRlcklkeCA6IGkgKyAxO1xuICAgIG9yZGVyZWRDb2x1bW5MaXN0LnB1c2goe1xuICAgICAgY29sdW1uS2V5LFxuICAgICAgb3JkZXIsXG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gb3JkZXJlZENvbHVtbkxpc3Quc29ydCgoYSwgYikgPT4gYS5vcmRlciAtIGIub3JkZXIpLm1hcChpdGVtID0+IGl0ZW0uY29sdW1uS2V5KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZ2V0Q29sdW1uS2V5LFxuICBnZXRDb2x1bW5EZWZhdWx0VmFsdWVzOiAoY29scykgPT4ge1xuICAgIGNvbnN0IGNvbHVtbkRlZmF1bHRWYWx1ZXMgPSB7fTtcbiAgICBjb2xzLmZvckVhY2goKGNvbCkgPT4ge1xuICAgICAgaWYgKGNvbC5kZWZhdWx0VmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb2x1bW5EZWZhdWx0VmFsdWVzW2dldENvbHVtbktleShjb2wpXSA9IGNvbC5kZWZhdWx0VmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGNvbHVtbkRlZmF1bHRWYWx1ZXM7XG4gIH0sXG4gIGdldENlbGxTdHlsZUJ5Q29sOiAoY29sKSA9PiB7XG4gICAgaWYgKGNvbC5hbGlnbikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGV4dEFsaWduOiBjb2wuYWxpZ24sXG4gICAgICB9O1xuICAgIH1cbiAgICAvLyBObyBkZWZhdWx0IGFsaWduIGlmIGNvbXBvbmVudCBpcyBzZWxlY3RcbiAgICAvLyBCZWNhdXNlIHJlbmRlcmVkIGRhdGEgaXMgbW9zdCBsaWtlbHkgdGV4dFxuICAgIC8vIEV2ZW4gaWYgdmFsdWVUeXBlIGlzIG51bWJlclxuICAgIGlmIChjb2wuY29tcG9uZW50VHlwZSA9PT0gJ3NlbGVjdCcgfHwgY29sLmNvbXBvbmVudFR5cGUgPT09ICdtdWx0aXNlbGVjdCcpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgc3dpdGNoIChjb2wudmFsdWVUeXBlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdGV4dEFsaWduOiAncmlnaHQnLFxuICAgICAgICB9O1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgfSxcbiAgaXNTb3J0YWJsZTogY29sID0+IGNvbC52YWx1ZVR5cGVcbiAgICAmJiAoY29sLnNvcnRWYWx1ZUdldHRlciB8fCBjb2wudmFsdWVLZXlQYXRoKVxuICAgICYmICFjb2wuZGlzYWJsZVNvcnRpbmcsXG4gIGdldFNvcnRDb21wYXJhdG9yOiAoY29sKSA9PiB7XG4gICAgaWYgKGNvbC5zb3J0Q29tcGFyYXRvcikge1xuICAgICAgcmV0dXJuIGNvbC5zb3J0Q29tcGFyYXRvcjtcbiAgICB9XG4gICAgc3dpdGNoIChjb2wudmFsdWVUeXBlKSB7XG4gICAgICBjYXNlICd0ZXh0JzpcbiAgICAgICAgcmV0dXJuIChhLCBiKSA9PiAoYS5sb2NhbGVDb21wYXJlID8gYS5sb2NhbGVDb21wYXJlKGIpIDogMSk7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgICByZXR1cm4gKGEsIGIpID0+IGEgLSBiO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIHJldHVybiAoYSwgYikgPT4gKGEgPT09IGIgPyAwIDogYSA/IC0xIDogMSk7XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgcmV0dXJuIChhLCBiKSA9PiBuZXcgRGF0ZShhKSAtIG5ldyBEYXRlKGIpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIChhLCBiKSA9PiAoYS5sb2NhbGVDb21wYXJlID8gYS5sb2NhbGVDb21wYXJlKGIpIDogMSk7XG4gICAgfVxuICB9LFxuICBnZXRTb3J0VmFsdWVHZXR0ZXI6IChjb2wpID0+IHtcbiAgICBpZiAoY29sLnNvcnRWYWx1ZUdldHRlcikge1xuICAgICAgcmV0dXJuIGNvbC5zb3J0VmFsdWVHZXR0ZXI7XG4gICAgfVxuICAgIHJldHVybiAoZGF0YSkgPT4ge1xuICAgICAgY29uc3QgY2VsbERhdGEgPSBkYXRhLmdldEluKGNvbC52YWx1ZUtleVBhdGgpO1xuICAgICAgLy8gRGVhbCB3aXRoIHNlbGVjdCBhbmQgbXVsdGlzZWxlY3QgY29tcG9uZW50VHlwZXNcbiAgICAgIGlmIChjb2wuc2VsZWN0Q29tcG9uZW50T3B0aW9ucykge1xuICAgICAgICBpZiAoTGlzdC5pc0xpc3QoY2VsbERhdGEpIHx8IEFycmF5LmlzQXJyYXkoY2VsbERhdGEpKSB7XG4gICAgICAgICAgY29uc3QgbGFiZWxzID0gW107XG4gICAgICAgICAgY2VsbERhdGEuZm9yRWFjaCgoZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZm91bmQgPSBjb2wuc2VsZWN0Q29tcG9uZW50T3B0aW9ucy5maW5kKG8gPT4gby52YWx1ZSA9PT0gZCk7XG4gICAgICAgICAgICBpZiAoZm91bmQpIGxhYmVscy5wdXNoKGZvdW5kLmxhYmVsKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gbGFiZWxzLmpvaW4oJyAnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmb3VuZCA9IGNvbC5zZWxlY3RDb21wb25lbnRPcHRpb25zLmZpbmQobyA9PiBvLnZhbHVlID09PSBjZWxsRGF0YSk7XG4gICAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kLmxhYmVsO1xuICAgICAgfVxuICAgICAgaWYgKGNlbGxEYXRhICYmIGNlbGxEYXRhLmpvaW4pIHJldHVybiBjZWxsRGF0YS5qb2luKCcgJyk7XG4gICAgICByZXR1cm4gY2VsbERhdGE7XG4gICAgfTtcbiAgfSxcbiAgZ2V0VmFsdWVFbXB0eUNoZWNrZXI6IChjb2wpID0+IHtcbiAgICBpZiAoY29sLnZhbHVlRW1wdHlDaGVja2VyKSB7XG4gICAgICByZXR1cm4gY29sLnZhbHVlRW1wdHlDaGVja2VyO1xuICAgIH1cbiAgICBpZiAoY29sLmNvbXBvbmVudFR5cGUgPT09ICdtdWx0aXNlbGVjdCcpIHtcbiAgICAgIHJldHVybiB2YWwgPT4gdmFsID09PSAnJyB8fCB2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQgfHwgdmFsLmxlbmd0aCA9PT0gMCB8fCB2YWwuc2l6ZSA9PT0gMDsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIH1cblxuICAgIHN3aXRjaCAoY29sLnZhbHVlVHlwZSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgICAgcmV0dXJuIHZhbCA9PiB2YWwgPT09ICcnIHx8IGlzTmFOKHZhbCkgfHwgdmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkO1xuICAgICAgY2FzZSAndGV4dCc6XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgY2FzZSAnc2VsZWN0JzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB2YWwgPT4gdmFsID09PSAnJyB8fCB2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQ7XG4gICAgfVxuICB9LFxuICBnZXRGaWx0ZXJNYXRjaGVyOiAoY29sLCBkYXRlRm9ybWF0KSA9PiB7XG4gICAgaWYgKGNvbC5maWx0ZXJNYXRjaGVyKSByZXR1cm4gY29sLmZpbHRlck1hdGNoZXI7XG4gICAgY29uc3QgZ2V0VmFsID0gcm93ID0+IHJvdy5nZXRJbihjb2wudmFsdWVLZXlQYXRoKTtcblxuICAgIGlmIChjb2wuY29tcG9uZW50VHlwZSA9PT0gJ211bHRpc2VsZWN0Jykge1xuICAgICAgcmV0dXJuIChyb3csIGZpbHRlclZhbCkgPT4ge1xuICAgICAgICAvLyB2YWx1ZSBjYW4gYmUgc2ltcGxlIHZhbHVlLCBpbW11dGFibGUgTGlzdCBvciBhcnJheVxuICAgICAgICBjb25zdCB2YWx1ZSA9IGdldFZhbChyb3cpO1xuICAgICAgICAvLyBzZXNzaW9uIHN0b3JhZ2UgY29udGVudCBpcyBjb252ZXJ0ZWQgdG8gaW1tdXRhYmxlIGFuZCBtdWx0aXNlbGVjdFxuICAgICAgICAvLyBmaWx0ZXJzIGlzIHRoZW4gbGlzdCBvdGhlcndpc2UgYXJyYXlcbiAgICAgICAgY29uc3QgZmlsdGVycyA9IGZpbHRlclZhbCAmJiBmaWx0ZXJWYWwudG9KUyA/IGZpbHRlclZhbC50b0pTKCkgOiBmaWx0ZXJWYWw7XG4gICAgICAgIHJldHVybiBmaWx0ZXJzLnNvbWUoKGZpbHRlcikgPT4ge1xuICAgICAgICAgIGlmIChMaXN0LmlzTGlzdCh2YWx1ZSkgfHwgQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5maW5kSW5kZXgodiA9PiB2ID09PSBmaWx0ZXIudmFsdWUpICE9PSAtMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZpbHRlci52YWx1ZSA9PT0gdmFsdWU7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGNvbC52YWx1ZVR5cGUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIHJldHVybiAocm93LCBmaWx0ZXJWYWwpID0+IHtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IGdldFZhbChyb3cpO1xuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gJycgfHwgaXNOYU4odmFsdWUpIHx8IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gbWF0Y2ggZXhhY3QgbnVtYmVyIHZhbHVlXG4gICAgICAgICAgY29uc3QgZmlsdGVyVmFsSW50ID0gcGFyc2VJbnQoZmlsdGVyVmFsLCAxMCk7XG4gICAgICAgICAgY29uc3QgdmFsSW50ID0gcGFyc2VJbnQodmFsdWUsIDEwKTtcbiAgICAgICAgICBpZiAoZmlsdGVyVmFsSW50ID09PSB2YWxJbnQgfHwgZmlsdGVyVmFsSW50ID09PSB2YWxJbnQgKiAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIG1hdGNoIHBhcnRpYWxcbiAgICAgICAgICByZXR1cm4gU3RyaW5nKHZhbHVlKS5pbmNsdWRlcyhmaWx0ZXJWYWwpO1xuICAgICAgICB9O1xuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgICByZXR1cm4gKHJvdywgZmlsdGVyVmFsKSA9PiB7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBnZXRWYWwocm93KTtcbiAgICAgICAgICBpZiAodmFsdWUgPT09ICcnIHx8IGlzTmFOKHZhbHVlKSB8fCB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIG1hdGNoIGV4YWN0IGZsb2F0IHZhbHVlXG4gICAgICAgICAgY29uc3QgZmlsdGVyVmFsRmxvYXQgPSBwYXJzZUZsb2F0KGZpbHRlclZhbC5yZXBsYWNlKCcsJywgJy4nKSk7XG4gICAgICAgICAgaWYgKGZpbHRlclZhbEZsb2F0ID09PSBwYXJzZUZsb2F0KHZhbHVlKSB8fCBmaWx0ZXJWYWxGbG9hdCA9PT0gcGFyc2VGbG9hdCh2YWx1ZSkgKiAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIG1hdGNoIHBhcnRpYWxcbiAgICAgICAgICByZXR1cm4gU3RyaW5nKHZhbHVlKS5yZXBsYWNlKCcsJywgJy4nKS5pbmNsdWRlcyhmaWx0ZXJWYWwucmVwbGFjZSgnLCcsICcuJykpO1xuICAgICAgICB9O1xuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgIHJldHVybiAocm93LCBmaWx0ZXJWYWwpID0+IHtcbiAgICAgICAgICBpZiAobW9tZW50KGdldFZhbChyb3cpKS5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBtb21lbnQoZ2V0VmFsKHJvdykpLmZvcm1hdChkYXRlRm9ybWF0KSA9PT0gbW9tZW50KGZpbHRlclZhbCkuZm9ybWF0KGRhdGVGb3JtYXQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH07XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIChyb3csIGZpbHRlclZhbCkgPT4ge1xuICAgICAgICAgIGxldCBlc2NhcGVkVmFsID0gZmlsdGVyVmFsO1xuICAgICAgICAgIGNvbnN0IHNwZWNpYWxDaGFycyA9ICdbXVxcXFxeJC58PyorKCknO1xuXG4gICAgICAgICAgLy8gSWYgZmlsdGVyIHZhbCBzdGFydHMgd2l0aCBhIFJlZ2V4IHNwZWNpYWwgY2hhcmFjdGVyLCB3ZSBtdXN0IGVzY2FwZSBpdFxuICAgICAgICAgIGlmIChzcGVjaWFsQ2hhcnMuaW5jbHVkZXMoZmlsdGVyVmFsWzBdKSkgZXNjYXBlZFZhbCA9IGBcXFxcJHtmaWx0ZXJWYWx9YDtcbiAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cChlc2NhcGVkVmFsLCAnaScpLnRlc3QoZ2V0VmFsKHJvdykpO1xuICAgICAgICB9O1xuICAgIH1cbiAgfSxcbiAgbG9hZFNlbGVjdGVkSXRlbXM6IChncmlkKSA9PiB7XG4gICAgY29uc3Qgc2Vzc2lvbkl0ZW0gPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX3NlbGVjdGVkSXRlbXNfJHtncmlkLmlkfWApO1xuICAgIGlmIChzZXNzaW9uSXRlbSAmJiAhZ3JpZC5kaXNhYmxlUmVtZW1iZXJTZWxlY3RlZEl0ZW1zKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShzZXNzaW9uSXRlbSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIHNlbGVjdGVkSXRlbXMgZnJvbSBzZXNzaW9uU3RvcmFnZScsIGUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH0sXG4gIGxvYWRHcmlkQ29uZmlnOiAoZ3JpZCwgY29scykgPT4ge1xuICAgIGNvbnN0IGNvbmZpZ1N0b3JhZ2UgPSBncmlkLmNvbmZpZ1N0b3JhZ2UgfHwge307XG4gICAgY29uc3Qgc29ydGluZ0RhdGEgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX3NvcnRpbmdfJHtncmlkLmlkfWApO1xuICAgIGNvbnN0IGZpbHRlckRhdGEgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX2ZpbHRlcmluZ18ke2dyaWQuaWR9YCk7XG4gICAgY29uc3QgaXNGaWx0ZXJpbmdEYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfaXNGaWx0ZXJpbmdfJHtncmlkLmlkfWApO1xuICAgIGNvbnN0IHBhZ2UgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX3BhZ2VfJHtncmlkLmlkfWApO1xuICAgIGNvbnN0IHJvd3NPblBhZ2UgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX3Jvd3NPblBhZ2VfJHtncmlkLmlkfWApO1xuICAgIGxldCBsb2FkZWRDb25maWcgPSB7fTtcbiAgICBsZXQgaGlkZGVuQ29sdW1ucztcbiAgICBsZXQgY29sdW1uT3JkZXI7XG4gICAgbGV0IGlzRmlsdGVyaW5nID0gZmFsc2U7XG5cbiAgICBpZiAoaXNGdW5jdGlvbihjb25maWdTdG9yYWdlLmxvYWQpKSB7XG4gICAgICBsb2FkZWRDb25maWcgPSBjb25maWdTdG9yYWdlLmxvYWQoKTtcbiAgICB9XG5cbiAgICBpZiAoaXNGaWx0ZXJpbmdEYXRhKSB7XG4gICAgICBpZiAoIWdyaWQuZGlzYWJsZVJlbWVtYmVySXNGaWx0ZXJpbmcpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpc0ZpbHRlcmluZyA9IEpTT04ucGFyc2UoaXNGaWx0ZXJpbmdEYXRhKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgaXNGaWx0ZXJpbmdEYXRhIGZyb20gbG9jYWxTdG9yYWdlJywgZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGdyaWQuZGVmYXVsdFNob3dGaWx0ZXJpbmdSb3cpIHtcbiAgICAgIGlzRmlsdGVyaW5nID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGxvYWRlZENvbmZpZy5oaWRkZW5Db2x1bW5zKSB7XG4gICAgICBoaWRkZW5Db2x1bW5zID0gbG9hZGVkQ29uZmlnLmhpZGRlbkNvbHVtbnM7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaGlkZGVuQ29sdW1uc0pzb24gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgb2NfZ3JpZF9oaWRkZW5Db2x1bW5zXyR7Z3JpZC5pZH1gKTtcbiAgICAgIGlmIChoaWRkZW5Db2x1bW5zSnNvbikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGhpZGRlbkNvbHVtbnMgPSBKU09OLnBhcnNlKGhpZGRlbkNvbHVtbnNKc29uKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgaGlkZGVuQ29sdW1ucyBmcm9tIGxvY2FsU3RvcmFnZScsIGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChsb2FkZWRDb25maWcuY29sdW1uT3JkZXIpIHtcbiAgICAgIGNvbHVtbk9yZGVyID0gbG9hZGVkQ29uZmlnLmNvbHVtbk9yZGVyOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNvbHVtbk9yZGVySnNvbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX2NvbHVtbk9yZGVyXyR7Z3JpZC5pZH1gKTtcbiAgICAgIGlmIChjb2x1bW5PcmRlckpzb24pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb2x1bW5PcmRlciA9IEpTT04ucGFyc2UoY29sdW1uT3JkZXJKc29uKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgY29sdW1uT3JkZXIgZnJvbSBsb2NhbFN0b3JhZ2UnLCBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICB2aXNpYmxlQ29sdW1uczogZ2V0VmlzaWJsZUNvbHVtbnMoY29scywgaGlkZGVuQ29sdW1ucywgY29sdW1uT3JkZXIpLFxuICAgICAgZmlsdGVyaW5nRGF0YToge1xuICAgICAgICBpc0ZpbHRlcmluZyxcbiAgICAgIH0sXG4gICAgfTtcbiAgICBpZiAobG9hZGVkQ29uZmlnLmNvbHVtbldpZHRocykge1xuICAgICAgY29uZmlnLmNvbHVtbldpZHRocyA9IGxvYWRlZENvbmZpZy5jb2x1bW5XaWR0aHM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNvbHVtbldpZHRocyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX2NvbHVtbldpZHRoc18ke2dyaWQuaWR9YCk7XG4gICAgICBpZiAoY29sdW1uV2lkdGhzICYmICFncmlkLmRpc2FibGVSZW1lbWJlckNvbHVtbldpZHRocykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbmZpZy5jb2x1bW5XaWR0aHMgPSBKU09OLnBhcnNlKGNvbHVtbldpZHRocyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIGNvbHVtbldpZHRocyBmcm9tIGxvY2FsU3RvcmFnZScsIGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzb3J0aW5nRGF0YSAmJiAhZ3JpZC5kaXNhYmxlUmVtZW1iZXJTb3J0RGF0YSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uZmlnLnNvcnRpbmdEYXRhID0gSlNPTi5wYXJzZShzb3J0aW5nRGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIHNvcnRpbmdEYXRhIGZyb20gc2Vzc2lvblN0b3JhZ2UnLCBlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGZpbHRlckRhdGEgJiYgaXNGaWx0ZXJpbmcgJiYgIWdyaWQuZGlzYWJsZVJlbWVtYmVyRmlsdGVyRGF0YSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uZmlnLmZpbHRlcmluZ0RhdGEuZmlsdGVyRGF0YSA9IEpTT04ucGFyc2UoZmlsdGVyRGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIGZpbHRlckRhdGEgZnJvbSBzZXNzaW9uU3RvcmFnZScsIGUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocGFnZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uZmlnLnBhZ2UgPSBKU09OLnBhcnNlKHBhZ2UpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhZ3JpZDogZXJyb3IgcGFyc2luZyBwYWdpbmF0aW9uIGZyb20gc2Vzc2lvblN0b3JhZ2UnLCBlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHJvd3NPblBhZ2UpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbmZpZy5yb3dzT25QYWdlID0gSlNPTi5wYXJzZShyb3dzT25QYWdlKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgcGFnaW5hdGlvbiBmcm9tIHNlc3Npb25TdG9yYWdlJywgZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuc29ydGluZ0RhdGEgJiYgZ3JpZC5kZWZhdWx0U29ydENvbHVtbikge1xuICAgICAgY29uZmlnLnNvcnRpbmdEYXRhID0ge1xuICAgICAgICBzb3J0Q29sdW1uOiBncmlkLmRlZmF1bHRTb3J0Q29sdW1uLFxuICAgICAgICBzb3J0T3JkZXI6IGdyaWQuZGVmYXVsdFNvcnRPcmRlciB8fCAnYXNjJyxcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBjb25maWc7XG4gIH0sXG4gIHNhdmVTZWxlY3RlZEl0ZW1zOiAoZ3JpZCwgc2VsZWN0ZWRJdGVtcykgPT4ge1xuICAgIGlmIChncmlkLmRpc2FibGVSZW1lbWJlclNlbGVjdGVkSXRlbXMpIHJldHVybiBmYWxzZTtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX3NlbGVjdGVkSXRlbXNfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KHNlbGVjdGVkSXRlbXMgfHwgW10pKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgc2F2ZUNvbHVtbldpZHRoczogKGdyaWQsIGNvbHVtbldpZHRocykgPT4ge1xuICAgIGlmIChncmlkLmRpc2FibGVSZW1lbWJlckNvbHVtbldpZHRocykgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghY29sdW1uV2lkdGhzKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGdyaWQuY29uZmlnU3RvcmFnZSAmJiBpc0Z1bmN0aW9uKGdyaWQuY29uZmlnU3RvcmFnZS5zYXZlKSkge1xuICAgICAgZ3JpZC5jb25maWdTdG9yYWdlLnNhdmUoeyBjb2x1bW5XaWR0aHMgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX2NvbHVtbldpZHRoc18ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoY29sdW1uV2lkdGhzKSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBzYXZlQ29sdW1uU2V0dGluZ3M6IChncmlkLCBoaWRkZW5Db2x1bW5zLCBjb2x1bW5PcmRlcikgPT4ge1xuICAgIGlmICghaGlkZGVuQ29sdW1ucyB8fCAhY29sdW1uT3JkZXIpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoZ3JpZC5jb25maWdTdG9yYWdlICYmIGlzRnVuY3Rpb24oZ3JpZC5jb25maWdTdG9yYWdlLnNhdmUpKSB7XG4gICAgICBncmlkLmNvbmZpZ1N0b3JhZ2Uuc2F2ZSh7IGhpZGRlbkNvbHVtbnMsIGNvbHVtbk9yZGVyIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9oaWRkZW5Db2x1bW5zXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShoaWRkZW5Db2x1bW5zKSk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9jb2x1bW5PcmRlcl8ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoY29sdW1uT3JkZXIpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIHNhdmVTb3J0RGF0YTogKGdyaWQsIHNvcnRpbmdEYXRhKSA9PiB7XG4gICAgaWYgKGdyaWQuZGlzYWJsZVJlbWVtYmVyU29ydERhdGEpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIXNvcnRpbmdEYXRhKSByZXR1cm4gZmFsc2U7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9zb3J0aW5nXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShzb3J0aW5nRGF0YSkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBzYXZlRmlsdGVyRGF0YTogKGdyaWQsIGZpbHRlckRhdGEpID0+IHtcbiAgICBpZiAoZ3JpZC5kaXNhYmxlUmVtZW1iZXJGaWx0ZXJEYXRhKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFmaWx0ZXJEYXRhKSByZXR1cm4gZmFsc2U7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9maWx0ZXJpbmdfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KGZpbHRlckRhdGEpKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgc2F2ZUlzRmlsdGVyaW5nOiAoZ3JpZCwgaXNGaWx0ZXJpbmcpID0+IHtcbiAgICBpZiAoZ3JpZC5kaXNhYmxlUmVtZW1iZXJJc0ZpbHRlcmluZykgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChpc0ZpbHRlcmluZyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZmFsc2U7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYG9jX2dyaWRfaXNGaWx0ZXJpbmdfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KGlzRmlsdGVyaW5nKSk7XG4gICAgaWYgKCFpc0ZpbHRlcmluZykge1xuICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShgb2NfZ3JpZF9maWx0ZXJpbmdfJHtncmlkLmlkfWApO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgc2F2ZVBhZ2U6IChncmlkLCBwYWdlKSA9PiB7XG4gICAgaWYgKCFwYWdlKSByZXR1cm4gZmFsc2U7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9wYWdlXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShwYWdlKSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIHNhdmVSb3dzT25QYWdlOiAoZ3JpZCwgcm93c09uUGFnZSkgPT4ge1xuICAgIGlmICghcm93c09uUGFnZSkgcmV0dXJuIGZhbHNlO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oYG9jX2dyaWRfcm93c09uUGFnZV8ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkocm93c09uUGFnZSkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICAvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG4gIGNoZWNrR3JpZFBhcmFtOiAoZ3JpZFBhcmFtKSA9PiB7XG4gICAgaWYgKGdyaWRQYXJhbSkge1xuICAgICAgaWYgKCFncmlkUGFyYW0uaWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdbR3JpZF0gSW52YWxpZCBgZ3JpZC5pZGAgcGFyYW1ldGVyLCB1cGRhdGUgYWN0aW9uIHBhcmFtZXRlcnMgdG8gbmV3IGZvcm1hdCEnLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKCFncmlkUGFyYW0uaWRLZXlQYXRoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnW0dyaWRdIEludmFsaWQgYGdyaWQuaWRLZXlQYXRoYCBwYXJhbWV0ZXIsIHVwZGF0ZSBhY3Rpb24gcGFyYW1ldGVycyB0byBuZXcgZm9ybWF0IScsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignW0dyaWRdIEludmFsaWQgYGdyaWRgIHBhcmFtZXRlciwgdXBkYXRlIGFjdGlvbiBwYXJhbWV0ZXJzIHRvIG5ldyBmb3JtYXQhJyk7XG4gICAgfVxuICB9LFxuICBjaGVja0NvbHVtbnNQYXJhbTogKGNvbHVtbnNQYXJhbSkgPT4ge1xuICAgIGlmICghY29sdW1uc1BhcmFtKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdbR3JpZF0gSW52YWxpZCBgY29sdW1uc2AgcGFyYW1ldGVyLCB1cGRhdGUgYWN0aW9uIHBhcmFtZXRlcnMgdG8gbmV3IGZvcm1hdCEnLFxuICAgICAgKTtcbiAgICB9XG4gIH0sXG4gIC8vIExvY2FsZSBnZXR0ZXJzLCBzdXBwb3J0IGdyaWQgcGFyYW0gb3IgdXNlciBzdGF0ZSB1c2VkIGluIE9DIGFwcGxpY2F0aW9uc1xuICBnZXRMYW5ndWFnZTogKGdyaWQsIG9jVXNlclN0YXRlKSA9PiB7XG4gICAgaWYgKGdyaWQubGFuZ3VhZ2UgJiYgdHlwZW9mIGdyaWQubGFuZ3VhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZ3JpZC5sYW5ndWFnZTtcbiAgICB9XG4gICAgaWYgKG9jVXNlclN0YXRlKSB7XG4gICAgICByZXR1cm4gb2NVc2VyU3RhdGUuZ2V0SW4oWyd1c2VyJywgJ2xhbmd1YWdlJ10sICdlbicpO1xuICAgIH1cbiAgICByZXR1cm4gJ2VuJztcbiAgfSxcbiAgZ2V0UmVnaW9uOiAoZ3JpZCwgb2NVc2VyU3RhdGUpID0+IHtcbiAgICBjb25zdCBkZWZhdWx0UmVnaW9uID0gJ2VuX0dCJztcbiAgICBpZiAoZ3JpZC5yZWdpb24gJiYgdHlwZW9mIGdyaWQucmVnaW9uID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGdyaWQucmVnaW9uO1xuICAgIH1cbiAgICBpZiAob2NVc2VyU3RhdGUpIHtcbiAgICAgIHJldHVybiBvY1VzZXJTdGF0ZS5nZXRJbihbJ3VzZXInLCAncmVnaW9uJ10sIGRlZmF1bHRSZWdpb24pO1xuICAgIH1cbiAgICByZXR1cm4gZGVmYXVsdFJlZ2lvbjtcbiAgfSxcbiAgZ2V0RGF0ZUZvcm1hdDogKGdyaWQsIG9jVXNlclN0YXRlKSA9PiB7XG4gICAgaWYgKGdyaWQuZGF0ZUZvcm1hdCAmJiB0eXBlb2YgZ3JpZC5kYXRlRm9ybWF0ID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGdyaWQuZGF0ZUZvcm1hdC50b1VwcGVyQ2FzZSgpO1xuICAgIH1cbiAgICBpZiAob2NVc2VyU3RhdGUpIHtcbiAgICAgIHJldHVybiBvY1VzZXJTdGF0ZS5nZXRJbihbJ2xvY2FsZUZvcm1hdCcsICdkYXRlRm9ybWF0J10sICdMJyk7XG4gICAgfVxuICAgIHJldHVybiAnTCc7XG4gIH0sXG4gIGdldFRob3VzYW5kU2VwYXJhdG9yOiAoZ3JpZCwgb2NVc2VyU3RhdGUpID0+IHtcbiAgICBpZiAoZ3JpZC50aG91c2FuZFNlcGFyYXRvciAmJiB0eXBlb2YgZ3JpZC5sYW5ndWFnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBncmlkLnRob3VzYW5kU2VwYXJhdG9yO1xuICAgIH1cbiAgICBpZiAob2NVc2VyU3RhdGUpIHtcbiAgICAgIHJldHVybiBvY1VzZXJTdGF0ZS5nZXRJbihbJ2xvY2FsZUZvcm1hdCcsICd0aG91c2FuZFNlcGFyYXRvciddLCAnJyk7XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfSxcbiAgZ2V0RGVjaW1hbFNlcGFyYXRvcjogKGdyaWQsIG9jVXNlclN0YXRlKSA9PiB7XG4gICAgaWYgKGdyaWQuZGVjaW1hbFNlcGFyYXRvciAmJiB0eXBlb2YgZ3JpZC5sYW5ndWFnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBncmlkLmRlY2ltYWxTZXBhcmF0b3I7XG4gICAgfVxuICAgIGlmIChvY1VzZXJTdGF0ZSkge1xuICAgICAgcmV0dXJuIG9jVXNlclN0YXRlLmdldEluKFsnbG9jYWxlRm9ybWF0JywgJ2RlY2ltYWxTZXBhcmF0b3InXSwgJy4nKTtcbiAgICB9XG4gICAgcmV0dXJuICcuJztcbiAgfSxcbiAgbm9ybWFsaXplRmlsdGVyaW5nRGF0YTogKGZpbHRlcmluZ0RhdGEpID0+IHtcbiAgICBsZXQgbmV3RmlsdGVyaW5nRGF0YSA9IE1hcCh7IGlzRmlsdGVyaW5nOiBmYWxzZSB9KTtcbiAgICBpZiAoIWZpbHRlcmluZ0RhdGEpIHJldHVybiBuZXdGaWx0ZXJpbmdEYXRhO1xuXG4gICAgY29uc3Qgb2xkRmlsdGVyaW5nRGF0YSA9IE1hcC5pc01hcChmaWx0ZXJpbmdEYXRhKSA/IGZpbHRlcmluZ0RhdGEgOiBmcm9tSlMoZmlsdGVyaW5nRGF0YSk7XG4gICAgY29uc3QgaXNGaWx0ZXJpbmcgPSBvbGRGaWx0ZXJpbmdEYXRhLmdldCgnaXNGaWx0ZXJpbmcnLCBmYWxzZSk7XG4gICAgY29uc3QgZmlsdGVyRGF0YSA9IG9sZEZpbHRlcmluZ0RhdGEuZ2V0KCdmaWx0ZXJEYXRhJywgbnVsbCk7XG5cbiAgICBpZiAoaXNGaWx0ZXJpbmcgJiYgZmlsdGVyRGF0YSAmJiBNYXAuaXNNYXAoZmlsdGVyRGF0YSkpIHtcbiAgICAgIG5ld0ZpbHRlcmluZ0RhdGEgPSBuZXdGaWx0ZXJpbmdEYXRhLnNldCgnaXNGaWx0ZXJpbmcnLCB0cnVlKS5zZXQoJ2ZpbHRlckRhdGEnLCBmaWx0ZXJEYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3RmlsdGVyaW5nRGF0YTtcbiAgfSxcbiAgLypcbiAgICogQGZ1bmN0aW9uIHZpc2libGVDb2x1bW5zXG4gICAqIEBkZXNjICBSZXR1cm5zIGVpdGhlciB2aXNpYmxlIGNvbHVtbnMgKGlmIHNvbWUgY29sdW1ucyBhcmUgaGlkZGVuIClcbiAgICogICAgICAgIG9yIGdyaWQgZGVmYXVsdCBjb2x1bW5zLlxuICAgKiBAcGFyYW0gb3JpZ0NvbHVtbnMgQXJyYXkgb2YgR3JpZCBvcmlnaW5hbCBjb2x1bW5zIG9iamVjdHNcbiAgICogQHBhcmFtIHZpc2libGVDb2x1bW5zIEFycmF5IG9mIEdyaWQgdmlzaWJsZSBjb2x1bW5zIHZhbHVlS2V5UGF0aHNcbiAgICogQHJldHVybnMgQXJyYXkgb2YgY29sdW1uIG9iamVjdHMgY3VycmVudGx5IHZpc2libGUgZm9yIHVzZXIuXG4gICAqL1xuICB2aXNpYmxlQ29sdW1uczogKG9yaWdDb2x1bW5zLCB2aXNpYmxlQ29sdW1ucykgPT4ge1xuICAgIGlmICghdmlzaWJsZUNvbHVtbnMpIHJldHVybiBvcmlnQ29sdW1ucztcbiAgICBjb25zdCBmaWx0ZXJlZCA9IHZpc2libGVDb2x1bW5zLm1hcChcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIHNlYXJjaENvbCA9PiBvcmlnQ29sdW1ucy5maW5kKFxuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgLy8gdmFsdWVLZXlQYXRoIGlzIGpvaW5lZCBoZXJlIGFzIGl0IGNhbiBiZSBhbiBhcnJheSBsaWtlIFsna2V5MScsICdrZXkyJ10uXG4gICAgICAgIC8vIHNlYXJjaENvbCBpcyBzaW1pbGFybHkgam9pbmVkIGluIG9uQ2VsbEtleURvd24gaW4gZGF0YWdyaWQuY29tcG9uZW50LmpzeFxuICAgICAgICBjb2wgPT4gSlNPTi5zdHJpbmdpZnkoY29sLnZhbHVlS2V5UGF0aC5qb2luKCcvJykpID09PSBKU09OLnN0cmluZ2lmeShzZWFyY2hDb2wpLFxuICAgICAgKSxcbiAgICApO1xuICAgIHJldHVybiBmaWx0ZXJlZC50b0pTKCk7XG4gIH0sXG59O1xuIl19