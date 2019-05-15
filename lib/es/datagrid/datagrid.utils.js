/* eslint-disable no-nested-ternary */
import moment from 'moment';
import isNaN from 'lodash/isNaN';
import { isFunction } from 'util';
import { Map, fromJS } from 'immutable';

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
      return data.getIn(col.valueKeyPath);
    };
  },
  getValueEmptyChecker: function getValueEmptyChecker(col) {
    if (col.valueEmptyChecker) {
      return col.valueEmptyChecker;
    }

    if (col.componentType === 'multiselect') {
      return function (val) {
        return val === '' || val === null || val === undefined || val.length === 0;
      };
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
        var value = getVal(row); // session storage content is converted to immutable and multiselect
        // filters is then list otherwise array

        var filters = filterVal && filterVal.toJS ? filterVal.toJS() : filterVal;
        return filters.some(function (filter) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC51dGlscy5qcyJdLCJuYW1lcyI6WyJtb21lbnQiLCJpc05hTiIsImlzRnVuY3Rpb24iLCJNYXAiLCJmcm9tSlMiLCJnZXRDb2x1bW5LZXkiLCJjb2wiLCJjb2x1bW5LZXkiLCJ2YWx1ZUtleVBhdGgiLCJqb2luIiwiZ2V0VmlzaWJsZUNvbHVtbnMiLCJjb2xzIiwiaGlkZGVuQ29sdW1ucyIsImNvbHVtbk9yZGVyIiwib3JkZXJlZENvbHVtbkxpc3QiLCJmb3JFYWNoIiwiaSIsImNvbE9yZGVySWR4IiwiaW5kZXhPZiIsImRlZmF1bHRIaWRkZW4iLCJpc0hpZGRlbiIsIm9yZGVyIiwicHVzaCIsInNvcnQiLCJhIiwiYiIsIm1hcCIsIml0ZW0iLCJnZXRDb2x1bW5EZWZhdWx0VmFsdWVzIiwiY29sdW1uRGVmYXVsdFZhbHVlcyIsImRlZmF1bHRWYWx1ZSIsInVuZGVmaW5lZCIsImdldENlbGxTdHlsZUJ5Q29sIiwiYWxpZ24iLCJ0ZXh0QWxpZ24iLCJjb21wb25lbnRUeXBlIiwidmFsdWVUeXBlIiwiaXNTb3J0YWJsZSIsInNvcnRWYWx1ZUdldHRlciIsImRpc2FibGVTb3J0aW5nIiwiZ2V0U29ydENvbXBhcmF0b3IiLCJzb3J0Q29tcGFyYXRvciIsImxvY2FsZUNvbXBhcmUiLCJEYXRlIiwiZ2V0U29ydFZhbHVlR2V0dGVyIiwiZGF0YSIsImdldEluIiwiZ2V0VmFsdWVFbXB0eUNoZWNrZXIiLCJ2YWx1ZUVtcHR5Q2hlY2tlciIsInZhbCIsImxlbmd0aCIsImdldEZpbHRlck1hdGNoZXIiLCJkYXRlRm9ybWF0IiwiZmlsdGVyTWF0Y2hlciIsImdldFZhbCIsInJvdyIsImZpbHRlclZhbCIsInZhbHVlIiwiZmlsdGVycyIsInRvSlMiLCJzb21lIiwiZmlsdGVyIiwiZmlsdGVyVmFsSW50IiwicGFyc2VJbnQiLCJ2YWxJbnQiLCJTdHJpbmciLCJpbmNsdWRlcyIsImZpbHRlclZhbEZsb2F0IiwicGFyc2VGbG9hdCIsInJlcGxhY2UiLCJpc1ZhbGlkIiwiZm9ybWF0IiwiZXNjYXBlZFZhbCIsInNwZWNpYWxDaGFycyIsIlJlZ0V4cCIsInRlc3QiLCJsb2FkU2VsZWN0ZWRJdGVtcyIsImdyaWQiLCJzZXNzaW9uSXRlbSIsInNlc3Npb25TdG9yYWdlIiwiZ2V0SXRlbSIsImlkIiwiZGlzYWJsZVJlbWVtYmVyU2VsZWN0ZWRJdGVtcyIsIkpTT04iLCJwYXJzZSIsImUiLCJjb25zb2xlIiwiZXJyb3IiLCJsb2FkR3JpZENvbmZpZyIsImNvbmZpZ1N0b3JhZ2UiLCJzb3J0aW5nRGF0YSIsImZpbHRlckRhdGEiLCJpc0ZpbHRlcmluZ0RhdGEiLCJsb2NhbFN0b3JhZ2UiLCJwYWdlIiwicm93c09uUGFnZSIsImxvYWRlZENvbmZpZyIsImlzRmlsdGVyaW5nIiwibG9hZCIsImRpc2FibGVSZW1lbWJlcklzRmlsdGVyaW5nIiwiZGVmYXVsdFNob3dGaWx0ZXJpbmdSb3ciLCJoaWRkZW5Db2x1bW5zSnNvbiIsImNvbHVtbk9yZGVySnNvbiIsImNvbmZpZyIsInZpc2libGVDb2x1bW5zIiwiZmlsdGVyaW5nRGF0YSIsImNvbHVtbldpZHRocyIsImRpc2FibGVSZW1lbWJlckNvbHVtbldpZHRocyIsImRpc2FibGVSZW1lbWJlclNvcnREYXRhIiwiZGlzYWJsZVJlbWVtYmVyRmlsdGVyRGF0YSIsImRlZmF1bHRTb3J0Q29sdW1uIiwic29ydENvbHVtbiIsInNvcnRPcmRlciIsImRlZmF1bHRTb3J0T3JkZXIiLCJzYXZlU2VsZWN0ZWRJdGVtcyIsInNlbGVjdGVkSXRlbXMiLCJzZXRJdGVtIiwic3RyaW5naWZ5Iiwic2F2ZUNvbHVtbldpZHRocyIsInNhdmUiLCJzYXZlQ29sdW1uU2V0dGluZ3MiLCJzYXZlU29ydERhdGEiLCJzYXZlRmlsdGVyRGF0YSIsInNhdmVJc0ZpbHRlcmluZyIsInJlbW92ZUl0ZW0iLCJzYXZlUGFnZSIsInNhdmVSb3dzT25QYWdlIiwiY2hlY2tHcmlkUGFyYW0iLCJncmlkUGFyYW0iLCJFcnJvciIsImlkS2V5UGF0aCIsImNoZWNrQ29sdW1uc1BhcmFtIiwiY29sdW1uc1BhcmFtIiwiZ2V0TGFuZ3VhZ2UiLCJvY1VzZXJTdGF0ZSIsImxhbmd1YWdlIiwiZ2V0UmVnaW9uIiwiZGVmYXVsdFJlZ2lvbiIsInJlZ2lvbiIsImdldERhdGVGb3JtYXQiLCJ0b1VwcGVyQ2FzZSIsImdldFRob3VzYW5kU2VwYXJhdG9yIiwidGhvdXNhbmRTZXBhcmF0b3IiLCJnZXREZWNpbWFsU2VwYXJhdG9yIiwiZGVjaW1hbFNlcGFyYXRvciIsIm5vcm1hbGl6ZUZpbHRlcmluZ0RhdGEiLCJuZXdGaWx0ZXJpbmdEYXRhIiwib2xkRmlsdGVyaW5nRGF0YSIsImlzTWFwIiwiZ2V0Iiwic2V0Iiwib3JpZ0NvbHVtbnMiLCJmaWx0ZXJlZCIsInNlYXJjaENvbCIsImZpbmQiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0EsT0FBT0EsTUFBUCxNQUFtQixRQUFuQjtBQUNBLE9BQU9DLEtBQVAsTUFBa0IsY0FBbEI7QUFDQSxTQUFTQyxVQUFULFFBQTJCLE1BQTNCO0FBQ0EsU0FBU0MsR0FBVCxFQUFjQyxNQUFkLFFBQTRCLFdBQTVCOztBQUVBLElBQU1DLFlBQVksR0FBRyxTQUFmQSxZQUFlLENBQUFDLEdBQUc7QUFBQSxTQUFJQSxHQUFHLENBQUNDLFNBQUosSUFBaUJELEdBQUcsQ0FBQ0UsWUFBSixDQUFpQkMsSUFBakIsQ0FBc0IsR0FBdEIsQ0FBckI7QUFBQSxDQUF4Qjs7QUFFQSxJQUFNQyxpQkFBaUIsR0FBRyxTQUFwQkEsaUJBQW9CLENBQUNDLElBQUQsRUFBT0MsYUFBUCxFQUEyQkMsV0FBM0IsRUFBZ0Q7QUFBQSxNQUF6Q0QsYUFBeUM7QUFBekNBLElBQUFBLGFBQXlDLEdBQXpCLEVBQXlCO0FBQUE7O0FBQUEsTUFBckJDLFdBQXFCO0FBQXJCQSxJQUFBQSxXQUFxQixHQUFQLEVBQU87QUFBQTs7QUFDeEUsTUFBTUMsaUJBQWlCLEdBQUcsRUFBMUI7QUFDQUgsRUFBQUEsSUFBSSxDQUFDSSxPQUFMLENBQWEsVUFBQ1QsR0FB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QUFqQixDQUFxQixZQUFyQixFQUFtQyxJQUFuQyxDQUFuQjs7QUFFQSxRQUFJcEQsV0FBVyxJQUFJTixVQUFmLElBQTZCeEYsR0FBRyxDQUFDaUosS0FBSixDQUFVekQsVUFBVixDQUFqQyxFQUF3RDtBQUN0RHVELE1BQUFBLGdCQUFnQixHQUFHQSxnQkFBZ0IsQ0FBQ0ksR0FBakIsQ0FBcUIsYUFBckIsRUFBb0MsSUFBcEMsRUFBMENBLEdBQTFDLENBQThDLFlBQTlDLEVBQTREM0QsVUFBNUQsQ0FBbkI7QUFDRDs7QUFFRCxXQUFPdUQsZ0JBQVA7QUFDRCxHQTNaWTs7QUE0WmI7Ozs7Ozs7O0FBUUExQyxFQUFBQSxjQUFjLEVBQUUsd0JBQUMrQyxXQUFELEVBQWMvQyxlQUFkLEVBQWlDO0FBQy9DLFFBQUksQ0FBQ0EsZUFBTCxFQUFxQixPQUFPK0MsV0FBUDs7QUFDckIsUUFBTUMsUUFBUSxHQUFHaEQsZUFBYyxDQUFDOUUsR0FBZixFQUNmO0FBQ0EsY0FBQStILFNBQVM7QUFBQSxhQUFJRixXQUFXLENBQUNHLElBQVosRUFDVDtBQUNGO0FBQ0E7QUFDQSxnQkFBQXBKLEdBQUc7QUFBQSxlQUFJNkUsSUFBSSxDQUFDa0MsU0FBTCxDQUFlL0csR0FBRyxDQUFDRSxZQUFKLENBQWlCQyxJQUFqQixDQUFzQixHQUF0QixDQUFmLE1BQStDMEUsSUFBSSxDQUFDa0MsU0FBTCxDQUFlb0MsU0FBZixDQUFuRDtBQUFBLE9BSlEsQ0FBSjtBQUFBLEtBRk0sQ0FBakI7O0FBU0EsV0FBT0QsUUFBUSxDQUFDN0YsSUFBVCxFQUFQO0FBQ0Q7QUFoYlksQ0FBZiIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLW5lc3RlZC10ZXJuYXJ5ICovXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgaXNOYU4gZnJvbSAnbG9kYXNoL2lzTmFOJztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICd1dGlsJztcbmltcG9ydCB7IE1hcCwgZnJvbUpTIH0gZnJvbSAnaW1tdXRhYmxlJztcblxuY29uc3QgZ2V0Q29sdW1uS2V5ID0gY29sID0+IGNvbC5jb2x1bW5LZXkgfHwgY29sLnZhbHVlS2V5UGF0aC5qb2luKCcvJyk7XG5cbmNvbnN0IGdldFZpc2libGVDb2x1bW5zID0gKGNvbHMsIGhpZGRlbkNvbHVtbnMgPSBbXSwgY29sdW1uT3JkZXIgPSBbXSkgPT4ge1xuICBjb25zdCBvcmRlcmVkQ29sdW1uTGlzdCA9IFtdO1xuICBjb2xzLmZvckVhY2goKGNvbCwgaSkgPT4ge1xuICAgIGNvbnN0IGNvbHVtbktleSA9IGdldENvbHVtbktleShjb2wpO1xuICAgIGNvbnN0IGNvbE9yZGVySWR4ID0gY29sdW1uT3JkZXIuaW5kZXhPZihjb2x1bW5LZXkpO1xuICAgIGNvbnN0IGRlZmF1bHRIaWRkZW4gPSBjb2wuaXNIaWRkZW4gJiYgY29sT3JkZXJJZHggPT09IC0xO1xuICAgIGlmIChkZWZhdWx0SGlkZGVuIHx8IGhpZGRlbkNvbHVtbnMuaW5kZXhPZihjb2x1bW5LZXkpID4gLTEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgb3JkZXIgPSBjb2xPcmRlcklkeCAhPT0gLTEgPyBjb2xPcmRlcklkeCA6IGkgKyAxO1xuICAgIG9yZGVyZWRDb2x1bW5MaXN0LnB1c2goe1xuICAgICAgY29sdW1uS2V5LFxuICAgICAgb3JkZXIsXG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gb3JkZXJlZENvbHVtbkxpc3Quc29ydCgoYSwgYikgPT4gYS5vcmRlciAtIGIub3JkZXIpLm1hcChpdGVtID0+IGl0ZW0uY29sdW1uS2V5KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZ2V0Q29sdW1uS2V5LFxuICBnZXRDb2x1bW5EZWZhdWx0VmFsdWVzOiAoY29scykgPT4ge1xuICAgIGNvbnN0IGNvbHVtbkRlZmF1bHRWYWx1ZXMgPSB7fTtcbiAgICBjb2xzLmZvckVhY2goKGNvbCkgPT4ge1xuICAgICAgaWYgKGNvbC5kZWZhdWx0VmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb2x1bW5EZWZhdWx0VmFsdWVzW2dldENvbHVtbktleShjb2wpXSA9IGNvbC5kZWZhdWx0VmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGNvbHVtbkRlZmF1bHRWYWx1ZXM7XG4gIH0sXG4gIGdldENlbGxTdHlsZUJ5Q29sOiAoY29sKSA9PiB7XG4gICAgaWYgKGNvbC5hbGlnbikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGV4dEFsaWduOiBjb2wuYWxpZ24sXG4gICAgICB9O1xuICAgIH1cbiAgICAvLyBObyBkZWZhdWx0IGFsaWduIGlmIGNvbXBvbmVudCBpcyBzZWxlY3RcbiAgICAvLyBCZWNhdXNlIHJlbmRlcmVkIGRhdGEgaXMgbW9zdCBsaWtlbHkgdGV4dFxuICAgIC8vIEV2ZW4gaWYgdmFsdWVUeXBlIGlzIG51bWJlclxuICAgIGlmIChjb2wuY29tcG9uZW50VHlwZSA9PT0gJ3NlbGVjdCcgfHwgY29sLmNvbXBvbmVudFR5cGUgPT09ICdtdWx0aXNlbGVjdCcpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgc3dpdGNoIChjb2wudmFsdWVUeXBlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdGV4dEFsaWduOiAncmlnaHQnLFxuICAgICAgICB9O1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgfSxcbiAgaXNTb3J0YWJsZTogY29sID0+IGNvbC52YWx1ZVR5cGVcbiAgICAmJiAoY29sLnNvcnRWYWx1ZUdldHRlciB8fCBjb2wudmFsdWVLZXlQYXRoKVxuICAgICYmICFjb2wuZGlzYWJsZVNvcnRpbmcsXG4gIGdldFNvcnRDb21wYXJhdG9yOiAoY29sKSA9PiB7XG4gICAgaWYgKGNvbC5zb3J0Q29tcGFyYXRvcikge1xuICAgICAgcmV0dXJuIGNvbC5zb3J0Q29tcGFyYXRvcjtcbiAgICB9XG4gICAgc3dpdGNoIChjb2wudmFsdWVUeXBlKSB7XG4gICAgICBjYXNlICd0ZXh0JzpcbiAgICAgICAgcmV0dXJuIChhLCBiKSA9PiAoYS5sb2NhbGVDb21wYXJlID8gYS5sb2NhbGVDb21wYXJlKGIpIDogMSk7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgICByZXR1cm4gKGEsIGIpID0+IGEgLSBiO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIHJldHVybiAoYSwgYikgPT4gKGEgPT09IGIgPyAwIDogYSA/IC0xIDogMSk7XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgcmV0dXJuIChhLCBiKSA9PiBuZXcgRGF0ZShhKSAtIG5ldyBEYXRlKGIpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIChhLCBiKSA9PiAoYS5sb2NhbGVDb21wYXJlID8gYS5sb2NhbGVDb21wYXJlKGIpIDogMSk7XG4gICAgfVxuICB9LFxuICBnZXRTb3J0VmFsdWVHZXR0ZXI6IChjb2wpID0+IHtcbiAgICBpZiAoY29sLnNvcnRWYWx1ZUdldHRlcikge1xuICAgICAgcmV0dXJuIGNvbC5zb3J0VmFsdWVHZXR0ZXI7XG4gICAgfVxuICAgIHJldHVybiBkYXRhID0+IGRhdGEuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG4gIH0sXG4gIGdldFZhbHVlRW1wdHlDaGVja2VyOiAoY29sKSA9PiB7XG4gICAgaWYgKGNvbC52YWx1ZUVtcHR5Q2hlY2tlcikge1xuICAgICAgcmV0dXJuIGNvbC52YWx1ZUVtcHR5Q2hlY2tlcjtcbiAgICB9XG4gICAgaWYgKGNvbC5jb21wb25lbnRUeXBlID09PSAnbXVsdGlzZWxlY3QnKSB7XG4gICAgICByZXR1cm4gdmFsID0+IHZhbCA9PT0gJycgfHwgdmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkIHx8IHZhbC5sZW5ndGggPT09IDA7XG4gICAgfVxuXG4gICAgc3dpdGNoIChjb2wudmFsdWVUeXBlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgICByZXR1cm4gdmFsID0+IHZhbCA9PT0gJycgfHwgaXNOYU4odmFsKSB8fCB2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQ7XG4gICAgICBjYXNlICd0ZXh0JzpcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICBjYXNlICdzZWxlY3QnOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHZhbCA9PiB2YWwgPT09ICcnIHx8IHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZDtcbiAgICB9XG4gIH0sXG4gIGdldEZpbHRlck1hdGNoZXI6IChjb2wsIGRhdGVGb3JtYXQpID0+IHtcbiAgICBpZiAoY29sLmZpbHRlck1hdGNoZXIpIHJldHVybiBjb2wuZmlsdGVyTWF0Y2hlcjtcbiAgICBjb25zdCBnZXRWYWwgPSByb3cgPT4gcm93LmdldEluKGNvbC52YWx1ZUtleVBhdGgpO1xuXG4gICAgaWYgKGNvbC5jb21wb25lbnRUeXBlID09PSAnbXVsdGlzZWxlY3QnKSB7XG4gICAgICByZXR1cm4gKHJvdywgZmlsdGVyVmFsKSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gZ2V0VmFsKHJvdyk7XG4gICAgICAgIC8vIHNlc3Npb24gc3RvcmFnZSBjb250ZW50IGlzIGNvbnZlcnRlZCB0byBpbW11dGFibGUgYW5kIG11bHRpc2VsZWN0XG4gICAgICAgIC8vIGZpbHRlcnMgaXMgdGhlbiBsaXN0IG90aGVyd2lzZSBhcnJheVxuICAgICAgICBjb25zdCBmaWx0ZXJzID0gZmlsdGVyVmFsICYmIGZpbHRlclZhbC50b0pTID8gZmlsdGVyVmFsLnRvSlMoKSA6IGZpbHRlclZhbDtcbiAgICAgICAgcmV0dXJuIGZpbHRlcnMuc29tZShmaWx0ZXIgPT4gZmlsdGVyLnZhbHVlID09PSB2YWx1ZSk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHN3aXRjaCAoY29sLnZhbHVlVHlwZSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgcmV0dXJuIChyb3csIGZpbHRlclZhbCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gZ2V0VmFsKHJvdyk7XG4gICAgICAgICAgaWYgKHZhbHVlID09PSAnJyB8fCBpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBtYXRjaCBleGFjdCBudW1iZXIgdmFsdWVcbiAgICAgICAgICBjb25zdCBmaWx0ZXJWYWxJbnQgPSBwYXJzZUludChmaWx0ZXJWYWwsIDEwKTtcbiAgICAgICAgICBjb25zdCB2YWxJbnQgPSBwYXJzZUludCh2YWx1ZSwgMTApO1xuICAgICAgICAgIGlmIChmaWx0ZXJWYWxJbnQgPT09IHZhbEludCB8fCBmaWx0ZXJWYWxJbnQgPT09IHZhbEludCAqIC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gbWF0Y2ggcGFydGlhbFxuICAgICAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpLmluY2x1ZGVzKGZpbHRlclZhbCk7XG4gICAgICAgIH07XG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICAgIHJldHVybiAocm93LCBmaWx0ZXJWYWwpID0+IHtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IGdldFZhbChyb3cpO1xuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gJycgfHwgaXNOYU4odmFsdWUpIHx8IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gbWF0Y2ggZXhhY3QgZmxvYXQgdmFsdWVcbiAgICAgICAgICBjb25zdCBmaWx0ZXJWYWxGbG9hdCA9IHBhcnNlRmxvYXQoZmlsdGVyVmFsLnJlcGxhY2UoJywnLCAnLicpKTtcbiAgICAgICAgICBpZiAoZmlsdGVyVmFsRmxvYXQgPT09IHBhcnNlRmxvYXQodmFsdWUpIHx8IGZpbHRlclZhbEZsb2F0ID09PSBwYXJzZUZsb2F0KHZhbHVlKSAqIC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gbWF0Y2ggcGFydGlhbFxuICAgICAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpLnJlcGxhY2UoJywnLCAnLicpLmluY2x1ZGVzKGZpbHRlclZhbC5yZXBsYWNlKCcsJywgJy4nKSk7XG4gICAgICAgIH07XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgcmV0dXJuIChyb3csIGZpbHRlclZhbCkgPT4ge1xuICAgICAgICAgIGlmIChtb21lbnQoZ2V0VmFsKHJvdykpLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG1vbWVudChnZXRWYWwocm93KSkuZm9ybWF0KGRhdGVGb3JtYXQpID09PSBtb21lbnQoZmlsdGVyVmFsKS5mb3JtYXQoZGF0ZUZvcm1hdCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgY2FzZSAndGV4dCc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gKHJvdywgZmlsdGVyVmFsKSA9PiB7XG4gICAgICAgICAgbGV0IGVzY2FwZWRWYWwgPSBmaWx0ZXJWYWw7XG4gICAgICAgICAgY29uc3Qgc3BlY2lhbENoYXJzID0gJ1tdXFxcXF4kLnw/KisoKSc7XG5cbiAgICAgICAgICAvLyBJZiBmaWx0ZXIgdmFsIHN0YXJ0cyB3aXRoIGEgUmVnZXggc3BlY2lhbCBjaGFyYWN0ZXIsIHdlIG11c3QgZXNjYXBlIGl0XG4gICAgICAgICAgaWYgKHNwZWNpYWxDaGFycy5pbmNsdWRlcyhmaWx0ZXJWYWxbMF0pKSBlc2NhcGVkVmFsID0gYFxcXFwke2ZpbHRlclZhbH1gO1xuICAgICAgICAgIHJldHVybiBuZXcgUmVnRXhwKGVzY2FwZWRWYWwsICdpJykudGVzdChnZXRWYWwocm93KSk7XG4gICAgICAgIH07XG4gICAgfVxuICB9LFxuICBsb2FkU2VsZWN0ZWRJdGVtczogKGdyaWQpID0+IHtcbiAgICBjb25zdCBzZXNzaW9uSXRlbSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfc2VsZWN0ZWRJdGVtc18ke2dyaWQuaWR9YCk7XG4gICAgaWYgKHNlc3Npb25JdGVtICYmICFncmlkLmRpc2FibGVSZW1lbWJlclNlbGVjdGVkSXRlbXMpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHNlc3Npb25JdGVtKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgc2VsZWN0ZWRJdGVtcyBmcm9tIHNlc3Npb25TdG9yYWdlJywgZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBbXTtcbiAgfSxcbiAgbG9hZEdyaWRDb25maWc6IChncmlkLCBjb2xzKSA9PiB7XG4gICAgY29uc3QgY29uZmlnU3RvcmFnZSA9IGdyaWQuY29uZmlnU3RvcmFnZSB8fCB7fTtcbiAgICBjb25zdCBzb3J0aW5nRGF0YSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfc29ydGluZ18ke2dyaWQuaWR9YCk7XG4gICAgY29uc3QgZmlsdGVyRGF0YSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfZmlsdGVyaW5nXyR7Z3JpZC5pZH1gKTtcbiAgICBjb25zdCBpc0ZpbHRlcmluZ0RhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgb2NfZ3JpZF9pc0ZpbHRlcmluZ18ke2dyaWQuaWR9YCk7XG4gICAgY29uc3QgcGFnZSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfcGFnZV8ke2dyaWQuaWR9YCk7XG4gICAgY29uc3Qgcm93c09uUGFnZSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfcm93c09uUGFnZV8ke2dyaWQuaWR9YCk7XG4gICAgbGV0IGxvYWRlZENvbmZpZyA9IHt9O1xuICAgIGxldCBoaWRkZW5Db2x1bW5zO1xuICAgIGxldCBjb2x1bW5PcmRlcjtcbiAgICBsZXQgaXNGaWx0ZXJpbmcgPSBmYWxzZTtcblxuICAgIGlmIChpc0Z1bmN0aW9uKGNvbmZpZ1N0b3JhZ2UubG9hZCkpIHtcbiAgICAgIGxvYWRlZENvbmZpZyA9IGNvbmZpZ1N0b3JhZ2UubG9hZCgpO1xuICAgIH1cblxuICAgIGlmIChpc0ZpbHRlcmluZ0RhdGEpIHtcbiAgICAgIGlmICghZ3JpZC5kaXNhYmxlUmVtZW1iZXJJc0ZpbHRlcmluZykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlzRmlsdGVyaW5nID0gSlNPTi5wYXJzZShpc0ZpbHRlcmluZ0RhdGEpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhZ3JpZDogZXJyb3IgcGFyc2luZyBpc0ZpbHRlcmluZ0RhdGEgZnJvbSBsb2NhbFN0b3JhZ2UnLCBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZ3JpZC5kZWZhdWx0U2hvd0ZpbHRlcmluZ1Jvdykge1xuICAgICAgaXNGaWx0ZXJpbmcgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAobG9hZGVkQ29uZmlnLmhpZGRlbkNvbHVtbnMpIHtcbiAgICAgIGhpZGRlbkNvbHVtbnMgPSBsb2FkZWRDb25maWcuaGlkZGVuQ29sdW1uczsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBoaWRkZW5Db2x1bW5zSnNvbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX2hpZGRlbkNvbHVtbnNfJHtncmlkLmlkfWApO1xuICAgICAgaWYgKGhpZGRlbkNvbHVtbnNKc29uKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaGlkZGVuQ29sdW1ucyA9IEpTT04ucGFyc2UoaGlkZGVuQ29sdW1uc0pzb24pO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhZ3JpZDogZXJyb3IgcGFyc2luZyBoaWRkZW5Db2x1bW5zIGZyb20gbG9jYWxTdG9yYWdlJywgZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGxvYWRlZENvbmZpZy5jb2x1bW5PcmRlcikge1xuICAgICAgY29sdW1uT3JkZXIgPSBsb2FkZWRDb25maWcuY29sdW1uT3JkZXI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgY29sdW1uT3JkZXJKc29uID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfY29sdW1uT3JkZXJfJHtncmlkLmlkfWApO1xuICAgICAgaWYgKGNvbHVtbk9yZGVySnNvbikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbHVtbk9yZGVyID0gSlNPTi5wYXJzZShjb2x1bW5PcmRlckpzb24pO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhZ3JpZDogZXJyb3IgcGFyc2luZyBjb2x1bW5PcmRlciBmcm9tIGxvY2FsU3RvcmFnZScsIGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGNvbmZpZyA9IHtcbiAgICAgIHZpc2libGVDb2x1bW5zOiBnZXRWaXNpYmxlQ29sdW1ucyhjb2xzLCBoaWRkZW5Db2x1bW5zLCBjb2x1bW5PcmRlciksXG4gICAgICBmaWx0ZXJpbmdEYXRhOiB7XG4gICAgICAgIGlzRmlsdGVyaW5nLFxuICAgICAgfSxcbiAgICB9O1xuICAgIGlmIChsb2FkZWRDb25maWcuY29sdW1uV2lkdGhzKSB7XG4gICAgICBjb25maWcuY29sdW1uV2lkdGhzID0gbG9hZGVkQ29uZmlnLmNvbHVtbldpZHRocztcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgY29sdW1uV2lkdGhzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfY29sdW1uV2lkdGhzXyR7Z3JpZC5pZH1gKTtcbiAgICAgIGlmIChjb2x1bW5XaWR0aHMgJiYgIWdyaWQuZGlzYWJsZVJlbWVtYmVyQ29sdW1uV2lkdGhzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uZmlnLmNvbHVtbldpZHRocyA9IEpTT04ucGFyc2UoY29sdW1uV2lkdGhzKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgY29sdW1uV2lkdGhzIGZyb20gbG9jYWxTdG9yYWdlJywgZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNvcnRpbmdEYXRhICYmICFncmlkLmRpc2FibGVSZW1lbWJlclNvcnREYXRhKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25maWcuc29ydGluZ0RhdGEgPSBKU09OLnBhcnNlKHNvcnRpbmdEYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgc29ydGluZ0RhdGEgZnJvbSBzZXNzaW9uU3RvcmFnZScsIGUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZmlsdGVyRGF0YSAmJiBpc0ZpbHRlcmluZyAmJiAhZ3JpZC5kaXNhYmxlUmVtZW1iZXJGaWx0ZXJEYXRhKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25maWcuZmlsdGVyaW5nRGF0YS5maWx0ZXJEYXRhID0gSlNPTi5wYXJzZShmaWx0ZXJEYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgZmlsdGVyRGF0YSBmcm9tIHNlc3Npb25TdG9yYWdlJywgZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChwYWdlKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25maWcucGFnZSA9IEpTT04ucGFyc2UocGFnZSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIHBhZ2luYXRpb24gZnJvbSBzZXNzaW9uU3RvcmFnZScsIGUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocm93c09uUGFnZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uZmlnLnJvd3NPblBhZ2UgPSBKU09OLnBhcnNlKHJvd3NPblBhZ2UpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhZ3JpZDogZXJyb3IgcGFyc2luZyBwYWdpbmF0aW9uIGZyb20gc2Vzc2lvblN0b3JhZ2UnLCBlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy5zb3J0aW5nRGF0YSAmJiBncmlkLmRlZmF1bHRTb3J0Q29sdW1uKSB7XG4gICAgICBjb25maWcuc29ydGluZ0RhdGEgPSB7XG4gICAgICAgIHNvcnRDb2x1bW46IGdyaWQuZGVmYXVsdFNvcnRDb2x1bW4sXG4gICAgICAgIHNvcnRPcmRlcjogZ3JpZC5kZWZhdWx0U29ydE9yZGVyIHx8ICdhc2MnLFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbmZpZztcbiAgfSxcbiAgc2F2ZVNlbGVjdGVkSXRlbXM6IChncmlkLCBzZWxlY3RlZEl0ZW1zKSA9PiB7XG4gICAgaWYgKGdyaWQuZGlzYWJsZVJlbWVtYmVyU2VsZWN0ZWRJdGVtcykgcmV0dXJuIGZhbHNlO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oYG9jX2dyaWRfc2VsZWN0ZWRJdGVtc18ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoc2VsZWN0ZWRJdGVtcyB8fCBbXSkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBzYXZlQ29sdW1uV2lkdGhzOiAoZ3JpZCwgY29sdW1uV2lkdGhzKSA9PiB7XG4gICAgaWYgKGdyaWQuZGlzYWJsZVJlbWVtYmVyQ29sdW1uV2lkdGhzKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFjb2x1bW5XaWR0aHMpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoZ3JpZC5jb25maWdTdG9yYWdlICYmIGlzRnVuY3Rpb24oZ3JpZC5jb25maWdTdG9yYWdlLnNhdmUpKSB7XG4gICAgICBncmlkLmNvbmZpZ1N0b3JhZ2Uuc2F2ZSh7IGNvbHVtbldpZHRocyB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYG9jX2dyaWRfY29sdW1uV2lkdGhzXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShjb2x1bW5XaWR0aHMpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIHNhdmVDb2x1bW5TZXR0aW5nczogKGdyaWQsIGhpZGRlbkNvbHVtbnMsIGNvbHVtbk9yZGVyKSA9PiB7XG4gICAgaWYgKCFoaWRkZW5Db2x1bW5zIHx8ICFjb2x1bW5PcmRlcikgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChncmlkLmNvbmZpZ1N0b3JhZ2UgJiYgaXNGdW5jdGlvbihncmlkLmNvbmZpZ1N0b3JhZ2Uuc2F2ZSkpIHtcbiAgICAgIGdyaWQuY29uZmlnU3RvcmFnZS5zYXZlKHsgaGlkZGVuQ29sdW1ucywgY29sdW1uT3JkZXIgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX2hpZGRlbkNvbHVtbnNfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KGhpZGRlbkNvbHVtbnMpKTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX2NvbHVtbk9yZGVyXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShjb2x1bW5PcmRlcikpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgc2F2ZVNvcnREYXRhOiAoZ3JpZCwgc29ydGluZ0RhdGEpID0+IHtcbiAgICBpZiAoZ3JpZC5kaXNhYmxlUmVtZW1iZXJTb3J0RGF0YSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghc29ydGluZ0RhdGEpIHJldHVybiBmYWxzZTtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX3NvcnRpbmdfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KHNvcnRpbmdEYXRhKSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIHNhdmVGaWx0ZXJEYXRhOiAoZ3JpZCwgZmlsdGVyRGF0YSkgPT4ge1xuICAgIGlmIChncmlkLmRpc2FibGVSZW1lbWJlckZpbHRlckRhdGEpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIWZpbHRlckRhdGEpIHJldHVybiBmYWxzZTtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX2ZpbHRlcmluZ18ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoZmlsdGVyRGF0YSkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBzYXZlSXNGaWx0ZXJpbmc6IChncmlkLCBpc0ZpbHRlcmluZykgPT4ge1xuICAgIGlmIChncmlkLmRpc2FibGVSZW1lbWJlcklzRmlsdGVyaW5nKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGlzRmlsdGVyaW5nID09PSB1bmRlZmluZWQpIHJldHVybiBmYWxzZTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9pc0ZpbHRlcmluZ18ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoaXNGaWx0ZXJpbmcpKTtcbiAgICBpZiAoIWlzRmlsdGVyaW5nKSB7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKGBvY19ncmlkX2ZpbHRlcmluZ18ke2dyaWQuaWR9YCk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBzYXZlUGFnZTogKGdyaWQsIHBhZ2UpID0+IHtcbiAgICBpZiAoIXBhZ2UpIHJldHVybiBmYWxzZTtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX3BhZ2VfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KHBhZ2UpKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgc2F2ZVJvd3NPblBhZ2U6IChncmlkLCByb3dzT25QYWdlKSA9PiB7XG4gICAgaWYgKCFyb3dzT25QYWdlKSByZXR1cm4gZmFsc2U7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9yb3dzT25QYWdlXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShyb3dzT25QYWdlKSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIC8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbiAgY2hlY2tHcmlkUGFyYW06IChncmlkUGFyYW0pID0+IHtcbiAgICBpZiAoZ3JpZFBhcmFtKSB7XG4gICAgICBpZiAoIWdyaWRQYXJhbS5pZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ1tHcmlkXSBJbnZhbGlkIGBncmlkLmlkYCBwYXJhbWV0ZXIsIHVwZGF0ZSBhY3Rpb24gcGFyYW1ldGVycyB0byBuZXcgZm9ybWF0IScsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAoIWdyaWRQYXJhbS5pZEtleVBhdGgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdbR3JpZF0gSW52YWxpZCBgZ3JpZC5pZEtleVBhdGhgIHBhcmFtZXRlciwgdXBkYXRlIGFjdGlvbiBwYXJhbWV0ZXJzIHRvIG5ldyBmb3JtYXQhJyxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdbR3JpZF0gSW52YWxpZCBgZ3JpZGAgcGFyYW1ldGVyLCB1cGRhdGUgYWN0aW9uIHBhcmFtZXRlcnMgdG8gbmV3IGZvcm1hdCEnKTtcbiAgICB9XG4gIH0sXG4gIGNoZWNrQ29sdW1uc1BhcmFtOiAoY29sdW1uc1BhcmFtKSA9PiB7XG4gICAgaWYgKCFjb2x1bW5zUGFyYW0pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1tHcmlkXSBJbnZhbGlkIGBjb2x1bW5zYCBwYXJhbWV0ZXIsIHVwZGF0ZSBhY3Rpb24gcGFyYW1ldGVycyB0byBuZXcgZm9ybWF0IScsXG4gICAgICApO1xuICAgIH1cbiAgfSxcbiAgLy8gTG9jYWxlIGdldHRlcnMsIHN1cHBvcnQgZ3JpZCBwYXJhbSBvciB1c2VyIHN0YXRlIHVzZWQgaW4gT0MgYXBwbGljYXRpb25zXG4gIGdldExhbmd1YWdlOiAoZ3JpZCwgb2NVc2VyU3RhdGUpID0+IHtcbiAgICBpZiAoZ3JpZC5sYW5ndWFnZSAmJiB0eXBlb2YgZ3JpZC5sYW5ndWFnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBncmlkLmxhbmd1YWdlO1xuICAgIH1cbiAgICBpZiAob2NVc2VyU3RhdGUpIHtcbiAgICAgIHJldHVybiBvY1VzZXJTdGF0ZS5nZXRJbihbJ3VzZXInLCAnbGFuZ3VhZ2UnXSwgJ2VuJyk7XG4gICAgfVxuICAgIHJldHVybiAnZW4nO1xuICB9LFxuICBnZXRSZWdpb246IChncmlkLCBvY1VzZXJTdGF0ZSkgPT4ge1xuICAgIGNvbnN0IGRlZmF1bHRSZWdpb24gPSAnZW5fR0InO1xuICAgIGlmIChncmlkLnJlZ2lvbiAmJiB0eXBlb2YgZ3JpZC5yZWdpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZ3JpZC5yZWdpb247XG4gICAgfVxuICAgIGlmIChvY1VzZXJTdGF0ZSkge1xuICAgICAgcmV0dXJuIG9jVXNlclN0YXRlLmdldEluKFsndXNlcicsICdyZWdpb24nXSwgZGVmYXVsdFJlZ2lvbik7XG4gICAgfVxuICAgIHJldHVybiBkZWZhdWx0UmVnaW9uO1xuICB9LFxuICBnZXREYXRlRm9ybWF0OiAoZ3JpZCwgb2NVc2VyU3RhdGUpID0+IHtcbiAgICBpZiAoZ3JpZC5kYXRlRm9ybWF0ICYmIHR5cGVvZiBncmlkLmRhdGVGb3JtYXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZ3JpZC5kYXRlRm9ybWF0LnRvVXBwZXJDYXNlKCk7XG4gICAgfVxuICAgIGlmIChvY1VzZXJTdGF0ZSkge1xuICAgICAgcmV0dXJuIG9jVXNlclN0YXRlLmdldEluKFsnbG9jYWxlRm9ybWF0JywgJ2RhdGVGb3JtYXQnXSwgJ0wnKTtcbiAgICB9XG4gICAgcmV0dXJuICdMJztcbiAgfSxcbiAgZ2V0VGhvdXNhbmRTZXBhcmF0b3I6IChncmlkLCBvY1VzZXJTdGF0ZSkgPT4ge1xuICAgIGlmIChncmlkLnRob3VzYW5kU2VwYXJhdG9yICYmIHR5cGVvZiBncmlkLmxhbmd1YWdlID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGdyaWQudGhvdXNhbmRTZXBhcmF0b3I7XG4gICAgfVxuICAgIGlmIChvY1VzZXJTdGF0ZSkge1xuICAgICAgcmV0dXJuIG9jVXNlclN0YXRlLmdldEluKFsnbG9jYWxlRm9ybWF0JywgJ3Rob3VzYW5kU2VwYXJhdG9yJ10sICcnKTtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9LFxuICBnZXREZWNpbWFsU2VwYXJhdG9yOiAoZ3JpZCwgb2NVc2VyU3RhdGUpID0+IHtcbiAgICBpZiAoZ3JpZC5kZWNpbWFsU2VwYXJhdG9yICYmIHR5cGVvZiBncmlkLmxhbmd1YWdlID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGdyaWQuZGVjaW1hbFNlcGFyYXRvcjtcbiAgICB9XG4gICAgaWYgKG9jVXNlclN0YXRlKSB7XG4gICAgICByZXR1cm4gb2NVc2VyU3RhdGUuZ2V0SW4oWydsb2NhbGVGb3JtYXQnLCAnZGVjaW1hbFNlcGFyYXRvciddLCAnLicpO1xuICAgIH1cbiAgICByZXR1cm4gJy4nO1xuICB9LFxuICBub3JtYWxpemVGaWx0ZXJpbmdEYXRhOiAoZmlsdGVyaW5nRGF0YSkgPT4ge1xuICAgIGxldCBuZXdGaWx0ZXJpbmdEYXRhID0gTWFwKHsgaXNGaWx0ZXJpbmc6IGZhbHNlIH0pO1xuICAgIGlmICghZmlsdGVyaW5nRGF0YSkgcmV0dXJuIG5ld0ZpbHRlcmluZ0RhdGE7XG5cbiAgICBjb25zdCBvbGRGaWx0ZXJpbmdEYXRhID0gTWFwLmlzTWFwKGZpbHRlcmluZ0RhdGEpID8gZmlsdGVyaW5nRGF0YSA6IGZyb21KUyhmaWx0ZXJpbmdEYXRhKTtcbiAgICBjb25zdCBpc0ZpbHRlcmluZyA9IG9sZEZpbHRlcmluZ0RhdGEuZ2V0KCdpc0ZpbHRlcmluZycsIGZhbHNlKTtcbiAgICBjb25zdCBmaWx0ZXJEYXRhID0gb2xkRmlsdGVyaW5nRGF0YS5nZXQoJ2ZpbHRlckRhdGEnLCBudWxsKTtcblxuICAgIGlmIChpc0ZpbHRlcmluZyAmJiBmaWx0ZXJEYXRhICYmIE1hcC5pc01hcChmaWx0ZXJEYXRhKSkge1xuICAgICAgbmV3RmlsdGVyaW5nRGF0YSA9IG5ld0ZpbHRlcmluZ0RhdGEuc2V0KCdpc0ZpbHRlcmluZycsIHRydWUpLnNldCgnZmlsdGVyRGF0YScsIGZpbHRlckRhdGEpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXdGaWx0ZXJpbmdEYXRhO1xuICB9LFxuICAvKlxuICAgKiBAZnVuY3Rpb24gdmlzaWJsZUNvbHVtbnNcbiAgICogQGRlc2MgIFJldHVybnMgZWl0aGVyIHZpc2libGUgY29sdW1ucyAoaWYgc29tZSBjb2x1bW5zIGFyZSBoaWRkZW4gKVxuICAgKiAgICAgICAgb3IgZ3JpZCBkZWZhdWx0IGNvbHVtbnMuXG4gICAqIEBwYXJhbSBvcmlnQ29sdW1ucyBBcnJheSBvZiBHcmlkIG9yaWdpbmFsIGNvbHVtbnMgb2JqZWN0c1xuICAgKiBAcGFyYW0gdmlzaWJsZUNvbHVtbnMgQXJyYXkgb2YgR3JpZCB2aXNpYmxlIGNvbHVtbnMgdmFsdWVLZXlQYXRoc1xuICAgKiBAcmV0dXJucyBBcnJheSBvZiBjb2x1bW4gb2JqZWN0cyBjdXJyZW50bHkgdmlzaWJsZSBmb3IgdXNlci5cbiAgICovXG4gIHZpc2libGVDb2x1bW5zOiAob3JpZ0NvbHVtbnMsIHZpc2libGVDb2x1bW5zKSA9PiB7XG4gICAgaWYgKCF2aXNpYmxlQ29sdW1ucykgcmV0dXJuIG9yaWdDb2x1bW5zO1xuICAgIGNvbnN0IGZpbHRlcmVkID0gdmlzaWJsZUNvbHVtbnMubWFwKFxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgc2VhcmNoQ29sID0+IG9yaWdDb2x1bW5zLmZpbmQoXG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAvLyB2YWx1ZUtleVBhdGggaXMgam9pbmVkIGhlcmUgYXMgaXQgY2FuIGJlIGFuIGFycmF5IGxpa2UgWydrZXkxJywgJ2tleTInXS5cbiAgICAgICAgLy8gc2VhcmNoQ29sIGlzIHNpbWlsYXJseSBqb2luZWQgaW4gb25DZWxsS2V5RG93biBpbiBkYXRhZ3JpZC5jb21wb25lbnQuanN4XG4gICAgICAgIGNvbCA9PiBKU09OLnN0cmluZ2lmeShjb2wudmFsdWVLZXlQYXRoLmpvaW4oJy8nKSkgPT09IEpTT04uc3RyaW5naWZ5KHNlYXJjaENvbCksXG4gICAgICApLFxuICAgICk7XG4gICAgcmV0dXJuIGZpbHRlcmVkLnRvSlMoKTtcbiAgfSxcbn07XG4iXX0=