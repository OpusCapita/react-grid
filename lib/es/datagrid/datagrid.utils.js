/* eslint-disable no-nested-ternary */
import moment from 'moment';
import isNaN from 'lodash/isNaN';
import { isFunction } from 'util';
import { Map, fromJS } from 'immutable';

var getColumnKey = function getColumnKey(col) {
  return col.columnKey || col.valueKeyPath.join('/');
};

var getVisibleColumns = function getVisibleColumns(cols) {
  var hiddenColumns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var columnOrder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

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
      case 'currency':
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
      case 'currency':
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
    switch (col.valueType) {
      case 'number':
      case 'float':
      case 'currency':
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
    if (col.filterMatcher) {
      return col.filterMatcher;
    }
    switch (col.valueType) {
      case 'number':
        return function (val, filterVal) {
          return parseInt(val, 10) === parseInt(filterVal, 10);
        };
      case 'float':
      case 'currency':
        return function (val, filterVal) {
          return parseFloat(filterVal.replace(',', '.')) === val;
        };
      case 'date':
        return function (val, filterVal) {
          if (moment(val).isValid()) {
            return moment(val).format(dateFormat) === moment(filterVal).format(dateFormat);
          }
          return false;
        };
      case 'boolean':
      case 'select':
        return function (val, filterVal) {
          return val === filterVal;
        };
      case 'text':
      default:
        return function (val, filterVal) {
          return new RegExp(filterVal, 'i').test(val);
        };
    }
  },
  loadSelectedItems: function loadSelectedItems(grid) {
    var sessionItem = sessionStorage.getItem('oc_grid_selectedItems_' + grid.id);
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
    var sortingData = sessionStorage.getItem('oc_grid_sorting_' + grid.id);
    var filterData = sessionStorage.getItem('oc_grid_filtering_' + grid.id);
    var isFilteringData = localStorage.getItem('oc_grid_isFiltering_' + grid.id);
    var loadedConfig = {};
    var hiddenColumns = void 0;
    var columnOrder = void 0;
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
      var hiddenColumnsJson = localStorage.getItem('oc_grid_hiddenColumns_' + grid.id);
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
      var columnOrderJson = localStorage.getItem('oc_grid_columnOrder_' + grid.id);
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
      var columnWidths = localStorage.getItem('oc_grid_columnWidths_' + grid.id);
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
    if (filterData && isFiltering && !grid.disableRememberFilteData) {
      try {
        config.filteringData.filterData = JSON.parse(filterData);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Datagrid: error parsing filterData from sessionStorage', e);
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
    sessionStorage.setItem('oc_grid_selectedItems_' + grid.id, JSON.stringify(selectedItems || []));
    return true;
  },
  saveColumnWidths: function saveColumnWidths(grid, columnWidths) {
    if (grid.disableRememberColumnWidths) return false;
    if (!columnWidths) return false;
    if (grid.configStorage && isFunction(grid.configStorage.save)) {
      grid.configStorage.save({ columnWidths: columnWidths });
    } else {
      localStorage.setItem('oc_grid_columnWidths_' + grid.id, JSON.stringify(columnWidths));
    }
    return true;
  },
  saveColumnSettings: function saveColumnSettings(grid, hiddenColumns, columnOrder) {
    if (!hiddenColumns || !columnOrder) return false;
    if (grid.configStorage && isFunction(grid.configStorage.save)) {
      grid.configStorage.save({ hiddenColumns: hiddenColumns, columnOrder: columnOrder });
    } else {
      localStorage.setItem('oc_grid_hiddenColumns_' + grid.id, JSON.stringify(hiddenColumns));
      localStorage.setItem('oc_grid_columnOrder_' + grid.id, JSON.stringify(columnOrder));
    }
    return true;
  },
  saveSortData: function saveSortData(grid, sortingData) {
    if (grid.disableRememberSortData) return false;
    if (!sortingData) return false;
    sessionStorage.setItem('oc_grid_sorting_' + grid.id, JSON.stringify(sortingData));
    return true;
  },
  saveFilterData: function saveFilterData(grid, filterData) {
    if (grid.disableRememberFilteData) return false;
    if (!filterData) return false;
    sessionStorage.setItem('oc_grid_filtering_' + grid.id, JSON.stringify(filterData));
    return true;
  },
  saveIsFiltering: function saveIsFiltering(grid, isFiltering) {
    if (grid.disableRememberIsFiltering) return false;
    if (isFiltering === undefined) return false;
    localStorage.setItem('oc_grid_isFiltering_' + grid.id, JSON.stringify(isFiltering));
    if (!isFiltering) {
      sessionStorage.removeItem('oc_grid_filtering_' + grid.id);
    }
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
    var newFilteringData = Map({ isFiltering: false });
    if (!filteringData) return newFilteringData;

    var oldFilteringData = Map.isMap(filteringData) ? filteringData : fromJS(filteringData);
    var isFiltering = oldFilteringData.get('isFiltering', false);
    var filterData = oldFilteringData.get('filterData', null);

    if (isFiltering && filterData && Map.isMap(filterData)) {
      newFilteringData = newFilteringData.set('isFiltering', true).set('filterData', filterData);
    }

    return newFilteringData;
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC51dGlscy5qcyJdLCJuYW1lcyI6WyJtb21lbnQiLCJpc05hTiIsImlzRnVuY3Rpb24iLCJNYXAiLCJmcm9tSlMiLCJnZXRDb2x1bW5LZXkiLCJjb2wiLCJjb2x1bW5LZXkiLCJ2YWx1ZUtleVBhdGgiLCJqb2luIiwiZ2V0VmlzaWJsZUNvbHVtbnMiLCJjb2xzIiwiaGlkZGVuQ29sdW1ucyIsImNvbHVtbk9yZGVyIiwib3JkZXJlZENvbHVtbkxpc3QiLCJmb3JFYWNoIiwiaSIsImNvbE9yZGVySWR4IiwiaW5kZXhPZiIsImRlZmF1bHRIaWRkZW4iLCJpc0hpZGRlbiIsIm9yZGVyIiwicHVzaCIsInNvcnQiLCJhIiwiYiIsIm1hcCIsIml0ZW0iLCJnZXRDb2x1bW5EZWZhdWx0VmFsdWVzIiwiY29sdW1uRGVmYXVsdFZhbHVlcyIsImRlZmF1bHRWYWx1ZSIsInVuZGVmaW5lZCIsImdldENlbGxTdHlsZUJ5Q29sIiwiYWxpZ24iLCJ0ZXh0QWxpZ24iLCJjb21wb25lbnRUeXBlIiwidmFsdWVUeXBlIiwiaXNTb3J0YWJsZSIsInNvcnRWYWx1ZUdldHRlciIsImRpc2FibGVTb3J0aW5nIiwiZ2V0U29ydENvbXBhcmF0b3IiLCJzb3J0Q29tcGFyYXRvciIsImxvY2FsZUNvbXBhcmUiLCJEYXRlIiwiZ2V0U29ydFZhbHVlR2V0dGVyIiwiZGF0YSIsImdldEluIiwiZ2V0VmFsdWVFbXB0eUNoZWNrZXIiLCJ2YWx1ZUVtcHR5Q2hlY2tlciIsInZhbCIsImdldEZpbHRlck1hdGNoZXIiLCJkYXRlRm9ybWF0IiwiZmlsdGVyTWF0Y2hlciIsImZpbHRlclZhbCIsInBhcnNlSW50IiwicGFyc2VGbG9hdCIsInJlcGxhY2UiLCJpc1ZhbGlkIiwiZm9ybWF0IiwiUmVnRXhwIiwidGVzdCIsImxvYWRTZWxlY3RlZEl0ZW1zIiwiZ3JpZCIsInNlc3Npb25JdGVtIiwic2Vzc2lvblN0b3JhZ2UiLCJnZXRJdGVtIiwiaWQiLCJkaXNhYmxlUmVtZW1iZXJTZWxlY3RlZEl0ZW1zIiwiSlNPTiIsInBhcnNlIiwiZSIsImNvbnNvbGUiLCJlcnJvciIsImxvYWRHcmlkQ29uZmlnIiwiY29uZmlnU3RvcmFnZSIsInNvcnRpbmdEYXRhIiwiZmlsdGVyRGF0YSIsImlzRmlsdGVyaW5nRGF0YSIsImxvY2FsU3RvcmFnZSIsImxvYWRlZENvbmZpZyIsImlzRmlsdGVyaW5nIiwibG9hZCIsImRpc2FibGVSZW1lbWJlcklzRmlsdGVyaW5nIiwiZGVmYXVsdFNob3dGaWx0ZXJpbmdSb3ciLCJoaWRkZW5Db2x1bW5zSnNvbiIsImNvbHVtbk9yZGVySnNvbiIsImNvbmZpZyIsInZpc2libGVDb2x1bW5zIiwiZmlsdGVyaW5nRGF0YSIsImNvbHVtbldpZHRocyIsImRpc2FibGVSZW1lbWJlckNvbHVtbldpZHRocyIsImRpc2FibGVSZW1lbWJlclNvcnREYXRhIiwiZGlzYWJsZVJlbWVtYmVyRmlsdGVEYXRhIiwiZGVmYXVsdFNvcnRDb2x1bW4iLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwiZGVmYXVsdFNvcnRPcmRlciIsInNhdmVTZWxlY3RlZEl0ZW1zIiwic2VsZWN0ZWRJdGVtcyIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJzYXZlQ29sdW1uV2lkdGhzIiwic2F2ZSIsInNhdmVDb2x1bW5TZXR0aW5ncyIsInNhdmVTb3J0RGF0YSIsInNhdmVGaWx0ZXJEYXRhIiwic2F2ZUlzRmlsdGVyaW5nIiwicmVtb3ZlSXRlbSIsImNoZWNrR3JpZFBhcmFtIiwiZ3JpZFBhcmFtIiwiRXJyb3IiLCJpZEtleVBhdGgiLCJjaGVja0NvbHVtbnNQYXJhbSIsImNvbHVtbnNQYXJhbSIsImdldExhbmd1YWdlIiwib2NVc2VyU3RhdGUiLCJsYW5ndWFnZSIsImdldFJlZ2lvbiIsImRlZmF1bHRSZWdpb24iLCJyZWdpb24iLCJnZXREYXRlRm9ybWF0IiwidG9VcHBlckNhc2UiLCJnZXRUaG91c2FuZFNlcGFyYXRvciIsInRob3VzYW5kU2VwYXJhdG9yIiwiZ2V0RGVjaW1hbFNlcGFyYXRvciIsImRlY2ltYWxTZXBhcmF0b3IiLCJub3JtYWxpemVGaWx0ZXJpbmdEYXRhIiwibmV3RmlsdGVyaW5nRGF0YSIsIm9sZEZpbHRlcmluZ0RhdGEiLCJpc01hcCIsImdldCIsInNldCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQSxPQUFPQSxNQUFQLE1BQW1CLFFBQW5CO0FBQ0EsT0FBT0MsS0FBUCxNQUFrQixjQUFsQjtBQUNBLFNBQVNDLFVBQVQsUUFBMkIsTUFBM0I7QUFDQSxTQUFTQyxHQUFULEVBQWNDLE1BQWQsUUFBNEIsV0FBNUI7O0FBRUEsSUFBTUMsZUFBZSxTQUFmQSxZQUFlO0FBQUEsU0FDbkJDLElBQUlDLFNBQUosSUFBaUJELElBQUlFLFlBQUosQ0FBaUJDLElBQWpCLENBQXNCLEdBQXRCLENBREU7QUFBQSxDQUFyQjs7QUFJQSxJQUFNQyxvQkFBb0IsU0FBcEJBLGlCQUFvQixDQUFDQyxJQUFELEVBQWdEO0FBQUEsTUFBekNDLGFBQXlDLHVFQUF6QixFQUF5QjtBQUFBLE1BQXJCQyxXQUFxQix1RUFBUCxFQUFPOztBQUN4RSxNQUFNQyxvQkFBb0IsRUFBMUI7QUFDQUgsT0FBS0ksT0FBTCxDQUFhLFVBQUNULEdBQUQsRUFBTVUsQ0FBTixFQUFZO0FBQ3ZCLFFBQU1ULFlBQVlGLGFBQWFDLEdBQWIsQ0FBbEI7QUFDQSxRQUFNVyxjQUFjSixZQUFZSyxPQUFaLENBQW9CWCxTQUFwQixDQUFwQjtBQUNBLFFBQU1ZLGdCQUFnQmIsSUFBSWMsUUFBSixJQUFnQkgsZ0JBQWdCLENBQUMsQ0FBdkQ7QUFDQSxRQUFJRSxpQkFBaUJQLGNBQWNNLE9BQWQsQ0FBc0JYLFNBQXRCLElBQW1DLENBQUMsQ0FBekQsRUFBNEQ7QUFDMUQ7QUFDRDtBQUNELFFBQU1jLFFBQVFKLGdCQUFnQixDQUFDLENBQWpCLEdBQXFCQSxXQUFyQixHQUFvQ0QsSUFBSSxDQUF0RDtBQUNBRixzQkFBa0JRLElBQWxCLENBQXVCO0FBQ3JCZiwwQkFEcUI7QUFFckJjO0FBRnFCLEtBQXZCO0FBSUQsR0Fa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QUFQO0FBQ0Q7QUE1VVksQ0FBZiIsImZpbGUiOiJkYXRhZ3JpZC51dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLW5lc3RlZC10ZXJuYXJ5ICovXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgaXNOYU4gZnJvbSAnbG9kYXNoL2lzTmFOJztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICd1dGlsJztcbmltcG9ydCB7IE1hcCwgZnJvbUpTIH0gZnJvbSAnaW1tdXRhYmxlJztcblxuY29uc3QgZ2V0Q29sdW1uS2V5ID0gY29sID0+IChcbiAgY29sLmNvbHVtbktleSB8fCBjb2wudmFsdWVLZXlQYXRoLmpvaW4oJy8nKVxuKTtcblxuY29uc3QgZ2V0VmlzaWJsZUNvbHVtbnMgPSAoY29scywgaGlkZGVuQ29sdW1ucyA9IFtdLCBjb2x1bW5PcmRlciA9IFtdKSA9PiB7XG4gIGNvbnN0IG9yZGVyZWRDb2x1bW5MaXN0ID0gW107XG4gIGNvbHMuZm9yRWFjaCgoY29sLCBpKSA9PiB7XG4gICAgY29uc3QgY29sdW1uS2V5ID0gZ2V0Q29sdW1uS2V5KGNvbCk7XG4gICAgY29uc3QgY29sT3JkZXJJZHggPSBjb2x1bW5PcmRlci5pbmRleE9mKGNvbHVtbktleSk7XG4gICAgY29uc3QgZGVmYXVsdEhpZGRlbiA9IGNvbC5pc0hpZGRlbiAmJiBjb2xPcmRlcklkeCA9PT0gLTE7XG4gICAgaWYgKGRlZmF1bHRIaWRkZW4gfHwgaGlkZGVuQ29sdW1ucy5pbmRleE9mKGNvbHVtbktleSkgPiAtMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBvcmRlciA9IGNvbE9yZGVySWR4ICE9PSAtMSA/IGNvbE9yZGVySWR4IDogKGkgKyAxKTtcbiAgICBvcmRlcmVkQ29sdW1uTGlzdC5wdXNoKHtcbiAgICAgIGNvbHVtbktleSxcbiAgICAgIG9yZGVyLFxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIG9yZGVyZWRDb2x1bW5MaXN0LnNvcnQoKGEsIGIpID0+IChhLm9yZGVyIC0gYi5vcmRlcikpLm1hcChpdGVtID0+IGl0ZW0uY29sdW1uS2V5KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZ2V0Q29sdW1uS2V5LFxuICBnZXRDb2x1bW5EZWZhdWx0VmFsdWVzOiAoY29scykgPT4ge1xuICAgIGNvbnN0IGNvbHVtbkRlZmF1bHRWYWx1ZXMgPSB7fTtcbiAgICBjb2xzLmZvckVhY2goKGNvbCkgPT4ge1xuICAgICAgaWYgKGNvbC5kZWZhdWx0VmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb2x1bW5EZWZhdWx0VmFsdWVzW2dldENvbHVtbktleShjb2wpXSA9IGNvbC5kZWZhdWx0VmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGNvbHVtbkRlZmF1bHRWYWx1ZXM7XG4gIH0sXG4gIGdldENlbGxTdHlsZUJ5Q29sOiAoY29sKSA9PiB7XG4gICAgaWYgKGNvbC5hbGlnbikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGV4dEFsaWduOiBjb2wuYWxpZ24sXG4gICAgICB9O1xuICAgIH1cbiAgICAvLyBObyBkZWZhdWx0IGFsaWduIGlmIGNvbXBvbmVudCBpcyBzZWxlY3RcbiAgICAvLyBCZWNhdXNlIHJlbmRlcmVkIGRhdGEgaXMgbW9zdCBsaWtlbHkgdGV4dFxuICAgIC8vIEV2ZW4gaWYgdmFsdWVUeXBlIGlzIG51bWJlclxuICAgIGlmIChjb2wuY29tcG9uZW50VHlwZSA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgc3dpdGNoIChjb2wudmFsdWVUeXBlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgY2FzZSAnY3VycmVuY3knOlxuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdGV4dEFsaWduOiAncmlnaHQnLFxuICAgICAgICB9O1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgfSxcbiAgaXNTb3J0YWJsZTogY29sID0+IChcbiAgICBjb2wudmFsdWVUeXBlICYmXG4gICAgKGNvbC5zb3J0VmFsdWVHZXR0ZXIgfHwgY29sLnZhbHVlS2V5UGF0aCkgJiZcbiAgICAhY29sLmRpc2FibGVTb3J0aW5nXG4gICksXG4gIGdldFNvcnRDb21wYXJhdG9yOiAoY29sKSA9PiB7XG4gICAgaWYgKGNvbC5zb3J0Q29tcGFyYXRvcikge1xuICAgICAgcmV0dXJuIGNvbC5zb3J0Q29tcGFyYXRvcjtcbiAgICB9XG4gICAgc3dpdGNoIChjb2wudmFsdWVUeXBlKSB7XG4gICAgICBjYXNlICd0ZXh0JzpcbiAgICAgICAgcmV0dXJuIChhLCBiKSA9PiAoYS5sb2NhbGVDb21wYXJlID8gYS5sb2NhbGVDb21wYXJlKGIpIDogMSk7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgY2FzZSAnY3VycmVuY3knOlxuICAgICAgICByZXR1cm4gKGEsIGIpID0+IChhIC0gYik7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgcmV0dXJuIChhLCBiKSA9PiAoYSA9PT0gYiA/IDAgOiAoYSA/IC0xIDogMSkpO1xuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgIHJldHVybiAoYSwgYikgPT4gKG5ldyBEYXRlKGEpIC0gbmV3IERhdGUoYikpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIChhLCBiKSA9PiAoYS5sb2NhbGVDb21wYXJlID8gYS5sb2NhbGVDb21wYXJlKGIpIDogMSk7XG4gICAgfVxuICB9LFxuICBnZXRTb3J0VmFsdWVHZXR0ZXI6IChjb2wpID0+IHtcbiAgICBpZiAoY29sLnNvcnRWYWx1ZUdldHRlcikge1xuICAgICAgcmV0dXJuIGNvbC5zb3J0VmFsdWVHZXR0ZXI7XG4gICAgfVxuICAgIHJldHVybiBkYXRhID0+IGRhdGEuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG4gIH0sXG4gIGdldFZhbHVlRW1wdHlDaGVja2VyOiAoY29sKSA9PiB7XG4gICAgaWYgKGNvbC52YWx1ZUVtcHR5Q2hlY2tlcikge1xuICAgICAgcmV0dXJuIGNvbC52YWx1ZUVtcHR5Q2hlY2tlcjtcbiAgICB9XG4gICAgc3dpdGNoIChjb2wudmFsdWVUeXBlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgY2FzZSAnY3VycmVuY3knOlxuICAgICAgICByZXR1cm4gdmFsID0+IChcbiAgICAgICAgICB2YWwgPT09ICcnIHx8XG4gICAgICAgICAgaXNOYU4odmFsKSB8fFxuICAgICAgICAgIHZhbCA9PT0gbnVsbCB8fFxuICAgICAgICAgIHZhbCA9PT0gdW5kZWZpbmVkXG4gICAgICAgICk7XG4gICAgICBjYXNlICd0ZXh0JzpcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICBjYXNlICdzZWxlY3QnOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHZhbCA9PiB2YWwgPT09ICcnIHx8IHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZDtcbiAgICB9XG4gIH0sXG4gIGdldEZpbHRlck1hdGNoZXI6IChjb2wsIGRhdGVGb3JtYXQpID0+IHtcbiAgICBpZiAoY29sLmZpbHRlck1hdGNoZXIpIHtcbiAgICAgIHJldHVybiBjb2wuZmlsdGVyTWF0Y2hlcjtcbiAgICB9XG4gICAgc3dpdGNoIChjb2wudmFsdWVUeXBlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICByZXR1cm4gKHZhbCwgZmlsdGVyVmFsKSA9PiBwYXJzZUludCh2YWwsIDEwKSA9PT0gcGFyc2VJbnQoZmlsdGVyVmFsLCAxMCk7XG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICBjYXNlICdjdXJyZW5jeSc6XG4gICAgICAgIHJldHVybiAodmFsLCBmaWx0ZXJWYWwpID0+IHBhcnNlRmxvYXQoZmlsdGVyVmFsLnJlcGxhY2UoJywnLCAnLicpKSA9PT0gdmFsO1xuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgIHJldHVybiAodmFsLCBmaWx0ZXJWYWwpID0+IHtcbiAgICAgICAgICBpZiAobW9tZW50KHZhbCkuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gbW9tZW50KHZhbCkuZm9ybWF0KGRhdGVGb3JtYXQpID09PSBtb21lbnQoZmlsdGVyVmFsKS5mb3JtYXQoZGF0ZUZvcm1hdCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgY2FzZSAnc2VsZWN0JzpcbiAgICAgICAgcmV0dXJuICh2YWwsIGZpbHRlclZhbCkgPT4gdmFsID09PSBmaWx0ZXJWYWw7XG4gICAgICBjYXNlICd0ZXh0JzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAodmFsLCBmaWx0ZXJWYWwpID0+IChuZXcgUmVnRXhwKGZpbHRlclZhbCwgJ2knKSkudGVzdCh2YWwpO1xuICAgIH1cbiAgfSxcbiAgbG9hZFNlbGVjdGVkSXRlbXM6IChncmlkKSA9PiB7XG4gICAgY29uc3Qgc2Vzc2lvbkl0ZW0gPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX3NlbGVjdGVkSXRlbXNfJHtncmlkLmlkfWApO1xuICAgIGlmIChzZXNzaW9uSXRlbSAmJiAhZ3JpZC5kaXNhYmxlUmVtZW1iZXJTZWxlY3RlZEl0ZW1zKSB7XG4gICAgICB0cnkgeyByZXR1cm4gSlNPTi5wYXJzZShzZXNzaW9uSXRlbSk7IH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgc2VsZWN0ZWRJdGVtcyBmcm9tIHNlc3Npb25TdG9yYWdlJywgZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBbXTtcbiAgfSxcbiAgbG9hZEdyaWRDb25maWc6IChncmlkLCBjb2xzKSA9PiB7XG4gICAgY29uc3QgY29uZmlnU3RvcmFnZSA9IGdyaWQuY29uZmlnU3RvcmFnZSB8fCB7fTtcbiAgICBjb25zdCBzb3J0aW5nRGF0YSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfc29ydGluZ18ke2dyaWQuaWR9YCk7XG4gICAgY29uc3QgZmlsdGVyRGF0YSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfZmlsdGVyaW5nXyR7Z3JpZC5pZH1gKTtcbiAgICBjb25zdCBpc0ZpbHRlcmluZ0RhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgb2NfZ3JpZF9pc0ZpbHRlcmluZ18ke2dyaWQuaWR9YCk7XG4gICAgbGV0IGxvYWRlZENvbmZpZyA9IHt9O1xuICAgIGxldCBoaWRkZW5Db2x1bW5zO1xuICAgIGxldCBjb2x1bW5PcmRlcjtcbiAgICBsZXQgaXNGaWx0ZXJpbmcgPSBmYWxzZTtcblxuICAgIGlmIChpc0Z1bmN0aW9uKGNvbmZpZ1N0b3JhZ2UubG9hZCkpIHtcbiAgICAgIGxvYWRlZENvbmZpZyA9IGNvbmZpZ1N0b3JhZ2UubG9hZCgpO1xuICAgIH1cblxuICAgIGlmIChpc0ZpbHRlcmluZ0RhdGEpIHtcbiAgICAgIGlmICghZ3JpZC5kaXNhYmxlUmVtZW1iZXJJc0ZpbHRlcmluZykge1xuICAgICAgICB0cnkgeyBpc0ZpbHRlcmluZyA9IEpTT04ucGFyc2UoaXNGaWx0ZXJpbmdEYXRhKTsgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgaXNGaWx0ZXJpbmdEYXRhIGZyb20gbG9jYWxTdG9yYWdlJywgZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGdyaWQuZGVmYXVsdFNob3dGaWx0ZXJpbmdSb3cpIHtcbiAgICAgIGlzRmlsdGVyaW5nID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGxvYWRlZENvbmZpZy5oaWRkZW5Db2x1bW5zKSB7XG4gICAgICBoaWRkZW5Db2x1bW5zID0gbG9hZGVkQ29uZmlnLmhpZGRlbkNvbHVtbnM7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaGlkZGVuQ29sdW1uc0pzb24gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgb2NfZ3JpZF9oaWRkZW5Db2x1bW5zXyR7Z3JpZC5pZH1gKTtcbiAgICAgIGlmIChoaWRkZW5Db2x1bW5zSnNvbikge1xuICAgICAgICB0cnkgeyBoaWRkZW5Db2x1bW5zID0gSlNPTi5wYXJzZShoaWRkZW5Db2x1bW5zSnNvbik7IH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIGhpZGRlbkNvbHVtbnMgZnJvbSBsb2NhbFN0b3JhZ2UnLCBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAobG9hZGVkQ29uZmlnLmNvbHVtbk9yZGVyKSB7XG4gICAgICBjb2x1bW5PcmRlciA9IGxvYWRlZENvbmZpZy5jb2x1bW5PcmRlcjsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjb2x1bW5PcmRlckpzb24gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgb2NfZ3JpZF9jb2x1bW5PcmRlcl8ke2dyaWQuaWR9YCk7XG4gICAgICBpZiAoY29sdW1uT3JkZXJKc29uKSB7XG4gICAgICAgIHRyeSB7IGNvbHVtbk9yZGVyID0gSlNPTi5wYXJzZShjb2x1bW5PcmRlckpzb24pOyB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhZ3JpZDogZXJyb3IgcGFyc2luZyBjb2x1bW5PcmRlciBmcm9tIGxvY2FsU3RvcmFnZScsIGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGNvbmZpZyA9IHtcbiAgICAgIHZpc2libGVDb2x1bW5zOiBnZXRWaXNpYmxlQ29sdW1ucyhjb2xzLCBoaWRkZW5Db2x1bW5zLCBjb2x1bW5PcmRlciksXG4gICAgICBmaWx0ZXJpbmdEYXRhOiB7XG4gICAgICAgIGlzRmlsdGVyaW5nLFxuICAgICAgfSxcbiAgICB9O1xuICAgIGlmIChsb2FkZWRDb25maWcuY29sdW1uV2lkdGhzKSB7XG4gICAgICBjb25maWcuY29sdW1uV2lkdGhzID0gbG9hZGVkQ29uZmlnLmNvbHVtbldpZHRocztcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgY29sdW1uV2lkdGhzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfY29sdW1uV2lkdGhzXyR7Z3JpZC5pZH1gKTtcbiAgICAgIGlmIChjb2x1bW5XaWR0aHMgJiYgIWdyaWQuZGlzYWJsZVJlbWVtYmVyQ29sdW1uV2lkdGhzKSB7XG4gICAgICAgIHRyeSB7IGNvbmZpZy5jb2x1bW5XaWR0aHMgPSBKU09OLnBhcnNlKGNvbHVtbldpZHRocyk7IH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIGNvbHVtbldpZHRocyBmcm9tIGxvY2FsU3RvcmFnZScsIGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzb3J0aW5nRGF0YSAmJiAhZ3JpZC5kaXNhYmxlUmVtZW1iZXJTb3J0RGF0YSkge1xuICAgICAgdHJ5IHsgY29uZmlnLnNvcnRpbmdEYXRhID0gSlNPTi5wYXJzZShzb3J0aW5nRGF0YSk7IH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgc29ydGluZ0RhdGEgZnJvbSBzZXNzaW9uU3RvcmFnZScsIGUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZmlsdGVyRGF0YSAmJiBpc0ZpbHRlcmluZyAmJiAhZ3JpZC5kaXNhYmxlUmVtZW1iZXJGaWx0ZURhdGEpIHtcbiAgICAgIHRyeSB7IGNvbmZpZy5maWx0ZXJpbmdEYXRhLmZpbHRlckRhdGEgPSBKU09OLnBhcnNlKGZpbHRlckRhdGEpOyB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIGZpbHRlckRhdGEgZnJvbSBzZXNzaW9uU3RvcmFnZScsIGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghY29uZmlnLnNvcnRpbmdEYXRhICYmIGdyaWQuZGVmYXVsdFNvcnRDb2x1bW4pIHtcbiAgICAgIGNvbmZpZy5zb3J0aW5nRGF0YSA9IHtcbiAgICAgICAgc29ydENvbHVtbjogZ3JpZC5kZWZhdWx0U29ydENvbHVtbixcbiAgICAgICAgc29ydE9yZGVyOiBncmlkLmRlZmF1bHRTb3J0T3JkZXIgfHwgJ2FzYycsXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gY29uZmlnO1xuICB9LFxuICBzYXZlU2VsZWN0ZWRJdGVtczogKGdyaWQsIHNlbGVjdGVkSXRlbXMpID0+IHtcbiAgICBpZiAoZ3JpZC5kaXNhYmxlUmVtZW1iZXJTZWxlY3RlZEl0ZW1zKSByZXR1cm4gZmFsc2U7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9zZWxlY3RlZEl0ZW1zXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShzZWxlY3RlZEl0ZW1zIHx8IFtdKSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIHNhdmVDb2x1bW5XaWR0aHM6IChncmlkLCBjb2x1bW5XaWR0aHMpID0+IHtcbiAgICBpZiAoZ3JpZC5kaXNhYmxlUmVtZW1iZXJDb2x1bW5XaWR0aHMpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIWNvbHVtbldpZHRocykgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChncmlkLmNvbmZpZ1N0b3JhZ2UgJiYgaXNGdW5jdGlvbihncmlkLmNvbmZpZ1N0b3JhZ2Uuc2F2ZSkpIHtcbiAgICAgIGdyaWQuY29uZmlnU3RvcmFnZS5zYXZlKHsgY29sdW1uV2lkdGhzIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9jb2x1bW5XaWR0aHNfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KGNvbHVtbldpZHRocykpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgc2F2ZUNvbHVtblNldHRpbmdzOiAoZ3JpZCwgaGlkZGVuQ29sdW1ucywgY29sdW1uT3JkZXIpID0+IHtcbiAgICBpZiAoIWhpZGRlbkNvbHVtbnMgfHwgIWNvbHVtbk9yZGVyKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGdyaWQuY29uZmlnU3RvcmFnZSAmJiBpc0Z1bmN0aW9uKGdyaWQuY29uZmlnU3RvcmFnZS5zYXZlKSkge1xuICAgICAgZ3JpZC5jb25maWdTdG9yYWdlLnNhdmUoeyBoaWRkZW5Db2x1bW5zLCBjb2x1bW5PcmRlciB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYG9jX2dyaWRfaGlkZGVuQ29sdW1uc18ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoaGlkZGVuQ29sdW1ucykpO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYG9jX2dyaWRfY29sdW1uT3JkZXJfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KGNvbHVtbk9yZGVyKSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBzYXZlU29ydERhdGE6IChncmlkLCBzb3J0aW5nRGF0YSkgPT4ge1xuICAgIGlmIChncmlkLmRpc2FibGVSZW1lbWJlclNvcnREYXRhKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFzb3J0aW5nRGF0YSkgcmV0dXJuIGZhbHNlO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oYG9jX2dyaWRfc29ydGluZ18ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoc29ydGluZ0RhdGEpKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgc2F2ZUZpbHRlckRhdGE6IChncmlkLCBmaWx0ZXJEYXRhKSA9PiB7XG4gICAgaWYgKGdyaWQuZGlzYWJsZVJlbWVtYmVyRmlsdGVEYXRhKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFmaWx0ZXJEYXRhKSByZXR1cm4gZmFsc2U7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9maWx0ZXJpbmdfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KGZpbHRlckRhdGEpKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgc2F2ZUlzRmlsdGVyaW5nOiAoZ3JpZCwgaXNGaWx0ZXJpbmcpID0+IHtcbiAgICBpZiAoZ3JpZC5kaXNhYmxlUmVtZW1iZXJJc0ZpbHRlcmluZykgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChpc0ZpbHRlcmluZyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZmFsc2U7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYG9jX2dyaWRfaXNGaWx0ZXJpbmdfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KGlzRmlsdGVyaW5nKSk7XG4gICAgaWYgKCFpc0ZpbHRlcmluZykge1xuICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShgb2NfZ3JpZF9maWx0ZXJpbmdfJHtncmlkLmlkfWApO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuICBjaGVja0dyaWRQYXJhbTogKGdyaWRQYXJhbSkgPT4ge1xuICAgIGlmIChncmlkUGFyYW0pIHtcbiAgICAgIGlmICghZ3JpZFBhcmFtLmlkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignW0dyaWRdIEludmFsaWQgYGdyaWQuaWRgIHBhcmFtZXRlciwgdXBkYXRlIGFjdGlvbiBwYXJhbWV0ZXJzIHRvIG5ldyBmb3JtYXQhJyk7XG4gICAgICB9XG4gICAgICBpZiAoIWdyaWRQYXJhbS5pZEtleVBhdGgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbR3JpZF0gSW52YWxpZCBgZ3JpZC5pZEtleVBhdGhgIHBhcmFtZXRlciwgdXBkYXRlIGFjdGlvbiBwYXJhbWV0ZXJzIHRvIG5ldyBmb3JtYXQhJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignW0dyaWRdIEludmFsaWQgYGdyaWRgIHBhcmFtZXRlciwgdXBkYXRlIGFjdGlvbiBwYXJhbWV0ZXJzIHRvIG5ldyBmb3JtYXQhJyk7XG4gICAgfVxuICB9LFxuICBjaGVja0NvbHVtbnNQYXJhbTogKGNvbHVtbnNQYXJhbSkgPT4ge1xuICAgIGlmICghY29sdW1uc1BhcmFtKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tHcmlkXSBJbnZhbGlkIGBjb2x1bW5zYCBwYXJhbWV0ZXIsIHVwZGF0ZSBhY3Rpb24gcGFyYW1ldGVycyB0byBuZXcgZm9ybWF0IScpO1xuICAgIH1cbiAgfSxcbiAgLy8gTG9jYWxlIGdldHRlcnMsIHN1cHBvcnQgZ3JpZCBwYXJhbSBvciB1c2VyIHN0YXRlIHVzZWQgaW4gT0MgYXBwbGljYXRpb25zXG4gIGdldExhbmd1YWdlOiAoZ3JpZCwgb2NVc2VyU3RhdGUpID0+IHtcbiAgICBpZiAoZ3JpZC5sYW5ndWFnZSAmJiB0eXBlb2YgZ3JpZC5sYW5ndWFnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBncmlkLmxhbmd1YWdlO1xuICAgIH1cbiAgICBpZiAob2NVc2VyU3RhdGUpIHtcbiAgICAgIHJldHVybiBvY1VzZXJTdGF0ZS5nZXRJbihbJ3VzZXInLCAnbGFuZ3VhZ2UnXSwgJ2VuJyk7XG4gICAgfVxuICAgIHJldHVybiAnZW4nO1xuICB9LFxuICBnZXRSZWdpb246IChncmlkLCBvY1VzZXJTdGF0ZSkgPT4ge1xuICAgIGNvbnN0IGRlZmF1bHRSZWdpb24gPSAnZW5fR0InO1xuICAgIGlmIChncmlkLnJlZ2lvbiAmJiB0eXBlb2YgZ3JpZC5yZWdpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZ3JpZC5yZWdpb247XG4gICAgfVxuICAgIGlmIChvY1VzZXJTdGF0ZSkge1xuICAgICAgcmV0dXJuIG9jVXNlclN0YXRlLmdldEluKFsndXNlcicsICdyZWdpb24nXSwgZGVmYXVsdFJlZ2lvbik7XG4gICAgfVxuICAgIHJldHVybiBkZWZhdWx0UmVnaW9uO1xuICB9LFxuICBnZXREYXRlRm9ybWF0OiAoZ3JpZCwgb2NVc2VyU3RhdGUpID0+IHtcbiAgICBpZiAoZ3JpZC5kYXRlRm9ybWF0ICYmIHR5cGVvZiBncmlkLmRhdGVGb3JtYXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZ3JpZC5kYXRlRm9ybWF0LnRvVXBwZXJDYXNlKCk7XG4gICAgfVxuICAgIGlmIChvY1VzZXJTdGF0ZSkge1xuICAgICAgcmV0dXJuIG9jVXNlclN0YXRlLmdldEluKFsnbG9jYWxlRm9ybWF0JywgJ2RhdGVGb3JtYXQnXSwgJ0wnKTtcbiAgICB9XG4gICAgcmV0dXJuICdMJztcbiAgfSxcbiAgZ2V0VGhvdXNhbmRTZXBhcmF0b3I6IChncmlkLCBvY1VzZXJTdGF0ZSkgPT4ge1xuICAgIGlmIChncmlkLnRob3VzYW5kU2VwYXJhdG9yICYmIHR5cGVvZiBncmlkLmxhbmd1YWdlID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGdyaWQudGhvdXNhbmRTZXBhcmF0b3I7XG4gICAgfVxuICAgIGlmIChvY1VzZXJTdGF0ZSkge1xuICAgICAgcmV0dXJuIG9jVXNlclN0YXRlLmdldEluKFsnbG9jYWxlRm9ybWF0JywgJ3Rob3VzYW5kU2VwYXJhdG9yJ10sICcnKTtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9LFxuICBnZXREZWNpbWFsU2VwYXJhdG9yOiAoZ3JpZCwgb2NVc2VyU3RhdGUpID0+IHtcbiAgICBpZiAoZ3JpZC5kZWNpbWFsU2VwYXJhdG9yICYmIHR5cGVvZiBncmlkLmxhbmd1YWdlID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGdyaWQuZGVjaW1hbFNlcGFyYXRvcjtcbiAgICB9XG4gICAgaWYgKG9jVXNlclN0YXRlKSB7XG4gICAgICByZXR1cm4gb2NVc2VyU3RhdGUuZ2V0SW4oWydsb2NhbGVGb3JtYXQnLCAnZGVjaW1hbFNlcGFyYXRvciddLCAnLicpO1xuICAgIH1cbiAgICByZXR1cm4gJy4nO1xuICB9LFxuICBub3JtYWxpemVGaWx0ZXJpbmdEYXRhOiAoZmlsdGVyaW5nRGF0YSkgPT4ge1xuICAgIGxldCBuZXdGaWx0ZXJpbmdEYXRhID0gTWFwKHsgaXNGaWx0ZXJpbmc6IGZhbHNlIH0pO1xuICAgIGlmICghZmlsdGVyaW5nRGF0YSkgcmV0dXJuIG5ld0ZpbHRlcmluZ0RhdGE7XG5cbiAgICBjb25zdCBvbGRGaWx0ZXJpbmdEYXRhID0gTWFwLmlzTWFwKGZpbHRlcmluZ0RhdGEpID8gZmlsdGVyaW5nRGF0YSA6IGZyb21KUyhmaWx0ZXJpbmdEYXRhKTtcbiAgICBjb25zdCBpc0ZpbHRlcmluZyA9IG9sZEZpbHRlcmluZ0RhdGEuZ2V0KCdpc0ZpbHRlcmluZycsIGZhbHNlKTtcbiAgICBjb25zdCBmaWx0ZXJEYXRhID0gb2xkRmlsdGVyaW5nRGF0YS5nZXQoJ2ZpbHRlckRhdGEnLCBudWxsKTtcblxuICAgIGlmIChpc0ZpbHRlcmluZyAmJiBmaWx0ZXJEYXRhICYmIE1hcC5pc01hcChmaWx0ZXJEYXRhKSkge1xuICAgICAgbmV3RmlsdGVyaW5nRGF0YSA9IG5ld0ZpbHRlcmluZ0RhdGFcbiAgICAgICAgLnNldCgnaXNGaWx0ZXJpbmcnLCB0cnVlKVxuICAgICAgICAuc2V0KCdmaWx0ZXJEYXRhJywgZmlsdGVyRGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld0ZpbHRlcmluZ0RhdGE7XG4gIH0sXG59O1xuIl19