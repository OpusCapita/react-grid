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
    if (col.filterMatcher) return col.filterMatcher;
    var getVal = function getVal(row) {
      return row.getIn(col.valueKeyPath);
    };

    switch (col.valueType) {
      case 'number':
        return function (row, filterVal) {
          return parseInt(getVal(row), 10) === parseInt(filterVal, 10);
        };
      case 'float':
      case 'currency':
        return function (row, filterVal) {
          return parseFloat(filterVal.replace(',', '.')) === getVal(row);
        };
      case 'date':
        return function (row, filterVal) {
          if (moment(getVal(row)).isValid()) {
            return moment(getVal(row)).format(dateFormat) === moment(filterVal).format(dateFormat);
          }
          return false;
        };
      case 'boolean':
      case 'select':
        return function (row, filterVal) {
          return getVal(row) === filterVal;
        };
      case 'text':
      default:
        return function (row, filterVal) {
          return new RegExp(filterVal, 'i').test(getVal(row));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC51dGlscy5qcyJdLCJuYW1lcyI6WyJtb21lbnQiLCJpc05hTiIsImlzRnVuY3Rpb24iLCJNYXAiLCJmcm9tSlMiLCJnZXRDb2x1bW5LZXkiLCJjb2wiLCJjb2x1bW5LZXkiLCJ2YWx1ZUtleVBhdGgiLCJqb2luIiwiZ2V0VmlzaWJsZUNvbHVtbnMiLCJjb2xzIiwiaGlkZGVuQ29sdW1ucyIsImNvbHVtbk9yZGVyIiwib3JkZXJlZENvbHVtbkxpc3QiLCJmb3JFYWNoIiwiaSIsImNvbE9yZGVySWR4IiwiaW5kZXhPZiIsImRlZmF1bHRIaWRkZW4iLCJpc0hpZGRlbiIsIm9yZGVyIiwicHVzaCIsInNvcnQiLCJhIiwiYiIsIm1hcCIsIml0ZW0iLCJnZXRDb2x1bW5EZWZhdWx0VmFsdWVzIiwiY29sdW1uRGVmYXVsdFZhbHVlcyIsImRlZmF1bHRWYWx1ZSIsInVuZGVmaW5lZCIsImdldENlbGxTdHlsZUJ5Q29sIiwiYWxpZ24iLCJ0ZXh0QWxpZ24iLCJjb21wb25lbnRUeXBlIiwidmFsdWVUeXBlIiwiaXNTb3J0YWJsZSIsInNvcnRWYWx1ZUdldHRlciIsImRpc2FibGVTb3J0aW5nIiwiZ2V0U29ydENvbXBhcmF0b3IiLCJzb3J0Q29tcGFyYXRvciIsImxvY2FsZUNvbXBhcmUiLCJEYXRlIiwiZ2V0U29ydFZhbHVlR2V0dGVyIiwiZGF0YSIsImdldEluIiwiZ2V0VmFsdWVFbXB0eUNoZWNrZXIiLCJ2YWx1ZUVtcHR5Q2hlY2tlciIsInZhbCIsImdldEZpbHRlck1hdGNoZXIiLCJkYXRlRm9ybWF0IiwiZmlsdGVyTWF0Y2hlciIsImdldFZhbCIsInJvdyIsImZpbHRlclZhbCIsInBhcnNlSW50IiwicGFyc2VGbG9hdCIsInJlcGxhY2UiLCJpc1ZhbGlkIiwiZm9ybWF0IiwiUmVnRXhwIiwidGVzdCIsImxvYWRTZWxlY3RlZEl0ZW1zIiwiZ3JpZCIsInNlc3Npb25JdGVtIiwic2Vzc2lvblN0b3JhZ2UiLCJnZXRJdGVtIiwiaWQiLCJkaXNhYmxlUmVtZW1iZXJTZWxlY3RlZEl0ZW1zIiwiSlNPTiIsInBhcnNlIiwiZSIsImNvbnNvbGUiLCJlcnJvciIsImxvYWRHcmlkQ29uZmlnIiwiY29uZmlnU3RvcmFnZSIsInNvcnRpbmdEYXRhIiwiZmlsdGVyRGF0YSIsImlzRmlsdGVyaW5nRGF0YSIsImxvY2FsU3RvcmFnZSIsImxvYWRlZENvbmZpZyIsImlzRmlsdGVyaW5nIiwibG9hZCIsImRpc2FibGVSZW1lbWJlcklzRmlsdGVyaW5nIiwiZGVmYXVsdFNob3dGaWx0ZXJpbmdSb3ciLCJoaWRkZW5Db2x1bW5zSnNvbiIsImNvbHVtbk9yZGVySnNvbiIsImNvbmZpZyIsInZpc2libGVDb2x1bW5zIiwiZmlsdGVyaW5nRGF0YSIsImNvbHVtbldpZHRocyIsImRpc2FibGVSZW1lbWJlckNvbHVtbldpZHRocyIsImRpc2FibGVSZW1lbWJlclNvcnREYXRhIiwiZGlzYWJsZVJlbWVtYmVyRmlsdGVEYXRhIiwiZGVmYXVsdFNvcnRDb2x1bW4iLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwiZGVmYXVsdFNvcnRPcmRlciIsInNhdmVTZWxlY3RlZEl0ZW1zIiwic2VsZWN0ZWRJdGVtcyIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJzYXZlQ29sdW1uV2lkdGhzIiwic2F2ZSIsInNhdmVDb2x1bW5TZXR0aW5ncyIsInNhdmVTb3J0RGF0YSIsInNhdmVGaWx0ZXJEYXRhIiwic2F2ZUlzRmlsdGVyaW5nIiwicmVtb3ZlSXRlbSIsImNoZWNrR3JpZFBhcmFtIiwiZ3JpZFBhcmFtIiwiRXJyb3IiLCJpZEtleVBhdGgiLCJjaGVja0NvbHVtbnNQYXJhbSIsImNvbHVtbnNQYXJhbSIsImdldExhbmd1YWdlIiwib2NVc2VyU3RhdGUiLCJsYW5ndWFnZSIsImdldFJlZ2lvbiIsImRlZmF1bHRSZWdpb24iLCJyZWdpb24iLCJnZXREYXRlRm9ybWF0IiwidG9VcHBlckNhc2UiLCJnZXRUaG91c2FuZFNlcGFyYXRvciIsInRob3VzYW5kU2VwYXJhdG9yIiwiZ2V0RGVjaW1hbFNlcGFyYXRvciIsImRlY2ltYWxTZXBhcmF0b3IiLCJub3JtYWxpemVGaWx0ZXJpbmdEYXRhIiwibmV3RmlsdGVyaW5nRGF0YSIsIm9sZEZpbHRlcmluZ0RhdGEiLCJpc01hcCIsImdldCIsInNldCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQSxPQUFPQSxNQUFQLE1BQW1CLFFBQW5CO0FBQ0EsT0FBT0MsS0FBUCxNQUFrQixjQUFsQjtBQUNBLFNBQVNDLFVBQVQsUUFBMkIsTUFBM0I7QUFDQSxTQUFTQyxHQUFULEVBQWNDLE1BQWQsUUFBNEIsV0FBNUI7O0FBRUEsSUFBTUMsZUFBZSxTQUFmQSxZQUFlO0FBQUEsU0FDbkJDLElBQUlDLFNBQUosSUFBaUJELElBQUlFLFlBQUosQ0FBaUJDLElBQWpCLENBQXNCLEdBQXRCLENBREU7QUFBQSxDQUFyQjs7QUFJQSxJQUFNQyxvQkFBb0IsU0FBcEJBLGlCQUFvQixDQUFDQyxJQUFELEVBQWdEO0FBQUEsTUFBekNDLGFBQXlDLHVFQUF6QixFQUF5QjtBQUFBLE1BQXJCQyxXQUFxQix1RUFBUCxFQUFPOztBQUN4RSxNQUFNQyxvQkFBb0IsRUFBMUI7QUFDQUgsT0FBS0ksT0FBTCxDQUFhLFVBQUNULEdBQUQsRUFBTVUsQ0FBTixFQUFZO0FBQ3ZCLFFBQU1ULFlBQVlGLGFBQWFDLEdBQWIsQ0FBbEI7QUFDQSxRQUFNVyxjQUFjSixZQUFZSyxPQUFaLENBQW9CWCxTQUFwQixDQUFwQjtBQUNBLFFBQU1ZLGdCQUFnQmIsSUFBSWMsUUFBSixJQUFnQkgsZ0JBQWdCLENBQUMsQ0FBdkQ7QUFDQSxRQUFJRSxpQkFBaUJQLGNBQWNNLE9BQWQsQ0FBc0JYLFNBQXRCLElBQW1DLENBQUMsQ0FBekQsRUFBNEQ7QUFDMUQ7QUFDRDtBQUNELFFBQU1jLFFBQVFKLGdCQUFnQixDQUFDLENBQWpCLEdBQXFCQSxXQUFyQixHQUFvQ0QsSUFBSSxDQUF0RDtBQUNBRixzQkFBa0JRLElBQWxCLENBQXVCO0FBQ3JCZiwwQkFEcUI7QUFFckJjO0FBRnFC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LFVBQWYsSUFBNkIzRSxJQUFJZ0ksS0FBSixDQUFVckQsVUFBVixDQUFqQyxFQUF3RDtBQUN0RG1ELHlCQUFtQkEsaUJBQ2hCSSxHQURnQixDQUNaLGFBRFksRUFDRyxJQURILEVBRWhCQSxHQUZnQixDQUVaLFlBRlksRUFFRXZELFVBRkYsQ0FBbkI7QUFHRDs7QUFFRCxXQUFPbUQsZ0JBQVA7QUFDRDtBQTVVWSxDQUFmIiwiZmlsZSI6ImRhdGFncmlkLnV0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tbmVzdGVkLXRlcm5hcnkgKi9cbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCBpc05hTiBmcm9tICdsb2Rhc2gvaXNOYU4nO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJ3V0aWwnO1xuaW1wb3J0IHsgTWFwLCBmcm9tSlMgfSBmcm9tICdpbW11dGFibGUnO1xuXG5jb25zdCBnZXRDb2x1bW5LZXkgPSBjb2wgPT4gKFxuICBjb2wuY29sdW1uS2V5IHx8IGNvbC52YWx1ZUtleVBhdGguam9pbignLycpXG4pO1xuXG5jb25zdCBnZXRWaXNpYmxlQ29sdW1ucyA9IChjb2xzLCBoaWRkZW5Db2x1bW5zID0gW10sIGNvbHVtbk9yZGVyID0gW10pID0+IHtcbiAgY29uc3Qgb3JkZXJlZENvbHVtbkxpc3QgPSBbXTtcbiAgY29scy5mb3JFYWNoKChjb2wsIGkpID0+IHtcbiAgICBjb25zdCBjb2x1bW5LZXkgPSBnZXRDb2x1bW5LZXkoY29sKTtcbiAgICBjb25zdCBjb2xPcmRlcklkeCA9IGNvbHVtbk9yZGVyLmluZGV4T2YoY29sdW1uS2V5KTtcbiAgICBjb25zdCBkZWZhdWx0SGlkZGVuID0gY29sLmlzSGlkZGVuICYmIGNvbE9yZGVySWR4ID09PSAtMTtcbiAgICBpZiAoZGVmYXVsdEhpZGRlbiB8fCBoaWRkZW5Db2x1bW5zLmluZGV4T2YoY29sdW1uS2V5KSA+IC0xKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG9yZGVyID0gY29sT3JkZXJJZHggIT09IC0xID8gY29sT3JkZXJJZHggOiAoaSArIDEpO1xuICAgIG9yZGVyZWRDb2x1bW5MaXN0LnB1c2goe1xuICAgICAgY29sdW1uS2V5LFxuICAgICAgb3JkZXIsXG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gb3JkZXJlZENvbHVtbkxpc3Quc29ydCgoYSwgYikgPT4gKGEub3JkZXIgLSBiLm9yZGVyKSkubWFwKGl0ZW0gPT4gaXRlbS5jb2x1bW5LZXkpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBnZXRDb2x1bW5LZXksXG4gIGdldENvbHVtbkRlZmF1bHRWYWx1ZXM6IChjb2xzKSA9PiB7XG4gICAgY29uc3QgY29sdW1uRGVmYXVsdFZhbHVlcyA9IHt9O1xuICAgIGNvbHMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICBpZiAoY29sLmRlZmF1bHRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbHVtbkRlZmF1bHRWYWx1ZXNbZ2V0Q29sdW1uS2V5KGNvbCldID0gY29sLmRlZmF1bHRWYWx1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gY29sdW1uRGVmYXVsdFZhbHVlcztcbiAgfSxcbiAgZ2V0Q2VsbFN0eWxlQnlDb2w6IChjb2wpID0+IHtcbiAgICBpZiAoY29sLmFsaWduKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0ZXh0QWxpZ246IGNvbC5hbGlnbixcbiAgICAgIH07XG4gICAgfVxuICAgIC8vIE5vIGRlZmF1bHQgYWxpZ24gaWYgY29tcG9uZW50IGlzIHNlbGVjdFxuICAgIC8vIEJlY2F1c2UgcmVuZGVyZWQgZGF0YSBpcyBtb3N0IGxpa2VseSB0ZXh0XG4gICAgLy8gRXZlbiBpZiB2YWx1ZVR5cGUgaXMgbnVtYmVyXG4gICAgaWYgKGNvbC5jb21wb25lbnRUeXBlID09PSAnc2VsZWN0Jykge1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgICBzd2l0Y2ggKGNvbC52YWx1ZVR5cGUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICBjYXNlICdjdXJyZW5jeSc6XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0ZXh0QWxpZ246ICdyaWdodCcsXG4gICAgICAgIH07XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4ge307XG4gICAgfVxuICB9LFxuICBpc1NvcnRhYmxlOiBjb2wgPT4gKFxuICAgIGNvbC52YWx1ZVR5cGUgJiZcbiAgICAoY29sLnNvcnRWYWx1ZUdldHRlciB8fCBjb2wudmFsdWVLZXlQYXRoKSAmJlxuICAgICFjb2wuZGlzYWJsZVNvcnRpbmdcbiAgKSxcbiAgZ2V0U29ydENvbXBhcmF0b3I6IChjb2wpID0+IHtcbiAgICBpZiAoY29sLnNvcnRDb21wYXJhdG9yKSB7XG4gICAgICByZXR1cm4gY29sLnNvcnRDb21wYXJhdG9yO1xuICAgIH1cbiAgICBzd2l0Y2ggKGNvbC52YWx1ZVR5cGUpIHtcbiAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgICByZXR1cm4gKGEsIGIpID0+IChhLmxvY2FsZUNvbXBhcmUgPyBhLmxvY2FsZUNvbXBhcmUoYikgOiAxKTtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICBjYXNlICdjdXJyZW5jeSc6XG4gICAgICAgIHJldHVybiAoYSwgYikgPT4gKGEgLSBiKTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICByZXR1cm4gKGEsIGIpID0+IChhID09PSBiID8gMCA6IChhID8gLTEgOiAxKSk7XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgcmV0dXJuIChhLCBiKSA9PiAobmV3IERhdGUoYSkgLSBuZXcgRGF0ZShiKSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gKGEsIGIpID0+IChhLmxvY2FsZUNvbXBhcmUgPyBhLmxvY2FsZUNvbXBhcmUoYikgOiAxKTtcbiAgICB9XG4gIH0sXG4gIGdldFNvcnRWYWx1ZUdldHRlcjogKGNvbCkgPT4ge1xuICAgIGlmIChjb2wuc29ydFZhbHVlR2V0dGVyKSB7XG4gICAgICByZXR1cm4gY29sLnNvcnRWYWx1ZUdldHRlcjtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGEgPT4gZGF0YS5nZXRJbihjb2wudmFsdWVLZXlQYXRoKTtcbiAgfSxcbiAgZ2V0VmFsdWVFbXB0eUNoZWNrZXI6IChjb2wpID0+IHtcbiAgICBpZiAoY29sLnZhbHVlRW1wdHlDaGVja2VyKSB7XG4gICAgICByZXR1cm4gY29sLnZhbHVlRW1wdHlDaGVja2VyO1xuICAgIH1cbiAgICBzd2l0Y2ggKGNvbC52YWx1ZVR5cGUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICBjYXNlICdjdXJyZW5jeSc6XG4gICAgICAgIHJldHVybiB2YWwgPT4gKFxuICAgICAgICAgIHZhbCA9PT0gJycgfHxcbiAgICAgICAgICBpc05hTih2YWwpIHx8XG4gICAgICAgICAgdmFsID09PSBudWxsIHx8XG4gICAgICAgICAgdmFsID09PSB1bmRlZmluZWRcbiAgICAgICAgKTtcbiAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgIGNhc2UgJ3NlbGVjdCc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdmFsID0+IHZhbCA9PT0gJycgfHwgdmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfSxcbiAgZ2V0RmlsdGVyTWF0Y2hlcjogKGNvbCwgZGF0ZUZvcm1hdCkgPT4ge1xuICAgIGlmIChjb2wuZmlsdGVyTWF0Y2hlcikgcmV0dXJuIGNvbC5maWx0ZXJNYXRjaGVyO1xuICAgIGNvbnN0IGdldFZhbCA9IHJvdyA9PiByb3cuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG5cbiAgICBzd2l0Y2ggKGNvbC52YWx1ZVR5cGUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIHJldHVybiAocm93LCBmaWx0ZXJWYWwpID0+IHBhcnNlSW50KGdldFZhbChyb3cpLCAxMCkgPT09IHBhcnNlSW50KGZpbHRlclZhbCwgMTApO1xuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgY2FzZSAnY3VycmVuY3knOlxuICAgICAgICByZXR1cm4gKHJvdywgZmlsdGVyVmFsKSA9PiBwYXJzZUZsb2F0KGZpbHRlclZhbC5yZXBsYWNlKCcsJywgJy4nKSkgPT09IGdldFZhbChyb3cpO1xuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgIHJldHVybiAocm93LCBmaWx0ZXJWYWwpID0+IHtcbiAgICAgICAgICBpZiAobW9tZW50KGdldFZhbChyb3cpKS5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBtb21lbnQoZ2V0VmFsKHJvdykpLmZvcm1hdChkYXRlRm9ybWF0KSA9PT0gbW9tZW50KGZpbHRlclZhbCkuZm9ybWF0KGRhdGVGb3JtYXQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH07XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIGNhc2UgJ3NlbGVjdCc6XG4gICAgICAgIHJldHVybiAocm93LCBmaWx0ZXJWYWwpID0+IGdldFZhbChyb3cpID09PSBmaWx0ZXJWYWw7XG4gICAgICBjYXNlICd0ZXh0JzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAocm93LCBmaWx0ZXJWYWwpID0+IChuZXcgUmVnRXhwKGZpbHRlclZhbCwgJ2knKSkudGVzdChnZXRWYWwocm93KSk7XG4gICAgfVxuICB9LFxuICBsb2FkU2VsZWN0ZWRJdGVtczogKGdyaWQpID0+IHtcbiAgICBjb25zdCBzZXNzaW9uSXRlbSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfc2VsZWN0ZWRJdGVtc18ke2dyaWQuaWR9YCk7XG4gICAgaWYgKHNlc3Npb25JdGVtICYmICFncmlkLmRpc2FibGVSZW1lbWJlclNlbGVjdGVkSXRlbXMpIHtcbiAgICAgIHRyeSB7IHJldHVybiBKU09OLnBhcnNlKHNlc3Npb25JdGVtKTsgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhZ3JpZDogZXJyb3IgcGFyc2luZyBzZWxlY3RlZEl0ZW1zIGZyb20gc2Vzc2lvblN0b3JhZ2UnLCBlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFtdO1xuICB9LFxuICBsb2FkR3JpZENvbmZpZzogKGdyaWQsIGNvbHMpID0+IHtcbiAgICBjb25zdCBjb25maWdTdG9yYWdlID0gZ3JpZC5jb25maWdTdG9yYWdlIHx8IHt9O1xuICAgIGNvbnN0IHNvcnRpbmdEYXRhID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShgb2NfZ3JpZF9zb3J0aW5nXyR7Z3JpZC5pZH1gKTtcbiAgICBjb25zdCBmaWx0ZXJEYXRhID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShgb2NfZ3JpZF9maWx0ZXJpbmdfJHtncmlkLmlkfWApO1xuICAgIGNvbnN0IGlzRmlsdGVyaW5nRGF0YSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX2lzRmlsdGVyaW5nXyR7Z3JpZC5pZH1gKTtcbiAgICBsZXQgbG9hZGVkQ29uZmlnID0ge307XG4gICAgbGV0IGhpZGRlbkNvbHVtbnM7XG4gICAgbGV0IGNvbHVtbk9yZGVyO1xuICAgIGxldCBpc0ZpbHRlcmluZyA9IGZhbHNlO1xuXG4gICAgaWYgKGlzRnVuY3Rpb24oY29uZmlnU3RvcmFnZS5sb2FkKSkge1xuICAgICAgbG9hZGVkQ29uZmlnID0gY29uZmlnU3RvcmFnZS5sb2FkKCk7XG4gICAgfVxuXG4gICAgaWYgKGlzRmlsdGVyaW5nRGF0YSkge1xuICAgICAgaWYgKCFncmlkLmRpc2FibGVSZW1lbWJlcklzRmlsdGVyaW5nKSB7XG4gICAgICAgIHRyeSB7IGlzRmlsdGVyaW5nID0gSlNPTi5wYXJzZShpc0ZpbHRlcmluZ0RhdGEpOyB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhZ3JpZDogZXJyb3IgcGFyc2luZyBpc0ZpbHRlcmluZ0RhdGEgZnJvbSBsb2NhbFN0b3JhZ2UnLCBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZ3JpZC5kZWZhdWx0U2hvd0ZpbHRlcmluZ1Jvdykge1xuICAgICAgaXNGaWx0ZXJpbmcgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAobG9hZGVkQ29uZmlnLmhpZGRlbkNvbHVtbnMpIHtcbiAgICAgIGhpZGRlbkNvbHVtbnMgPSBsb2FkZWRDb25maWcuaGlkZGVuQ29sdW1uczsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBoaWRkZW5Db2x1bW5zSnNvbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX2hpZGRlbkNvbHVtbnNfJHtncmlkLmlkfWApO1xuICAgICAgaWYgKGhpZGRlbkNvbHVtbnNKc29uKSB7XG4gICAgICAgIHRyeSB7IGhpZGRlbkNvbHVtbnMgPSBKU09OLnBhcnNlKGhpZGRlbkNvbHVtbnNKc29uKTsgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgaGlkZGVuQ29sdW1ucyBmcm9tIGxvY2FsU3RvcmFnZScsIGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChsb2FkZWRDb25maWcuY29sdW1uT3JkZXIpIHtcbiAgICAgIGNvbHVtbk9yZGVyID0gbG9hZGVkQ29uZmlnLmNvbHVtbk9yZGVyOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNvbHVtbk9yZGVySnNvbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX2NvbHVtbk9yZGVyXyR7Z3JpZC5pZH1gKTtcbiAgICAgIGlmIChjb2x1bW5PcmRlckpzb24pIHtcbiAgICAgICAgdHJ5IHsgY29sdW1uT3JkZXIgPSBKU09OLnBhcnNlKGNvbHVtbk9yZGVySnNvbik7IH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIGNvbHVtbk9yZGVyIGZyb20gbG9jYWxTdG9yYWdlJywgZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgdmlzaWJsZUNvbHVtbnM6IGdldFZpc2libGVDb2x1bW5zKGNvbHMsIGhpZGRlbkNvbHVtbnMsIGNvbHVtbk9yZGVyKSxcbiAgICAgIGZpbHRlcmluZ0RhdGE6IHtcbiAgICAgICAgaXNGaWx0ZXJpbmcsXG4gICAgICB9LFxuICAgIH07XG4gICAgaWYgKGxvYWRlZENvbmZpZy5jb2x1bW5XaWR0aHMpIHtcbiAgICAgIGNvbmZpZy5jb2x1bW5XaWR0aHMgPSBsb2FkZWRDb25maWcuY29sdW1uV2lkdGhzO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjb2x1bW5XaWR0aHMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgb2NfZ3JpZF9jb2x1bW5XaWR0aHNfJHtncmlkLmlkfWApO1xuICAgICAgaWYgKGNvbHVtbldpZHRocyAmJiAhZ3JpZC5kaXNhYmxlUmVtZW1iZXJDb2x1bW5XaWR0aHMpIHtcbiAgICAgICAgdHJ5IHsgY29uZmlnLmNvbHVtbldpZHRocyA9IEpTT04ucGFyc2UoY29sdW1uV2lkdGhzKTsgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgY29sdW1uV2lkdGhzIGZyb20gbG9jYWxTdG9yYWdlJywgZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNvcnRpbmdEYXRhICYmICFncmlkLmRpc2FibGVSZW1lbWJlclNvcnREYXRhKSB7XG4gICAgICB0cnkgeyBjb25maWcuc29ydGluZ0RhdGEgPSBKU09OLnBhcnNlKHNvcnRpbmdEYXRhKTsgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhZ3JpZDogZXJyb3IgcGFyc2luZyBzb3J0aW5nRGF0YSBmcm9tIHNlc3Npb25TdG9yYWdlJywgZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChmaWx0ZXJEYXRhICYmIGlzRmlsdGVyaW5nICYmICFncmlkLmRpc2FibGVSZW1lbWJlckZpbHRlRGF0YSkge1xuICAgICAgdHJ5IHsgY29uZmlnLmZpbHRlcmluZ0RhdGEuZmlsdGVyRGF0YSA9IEpTT04ucGFyc2UoZmlsdGVyRGF0YSk7IH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgZmlsdGVyRGF0YSBmcm9tIHNlc3Npb25TdG9yYWdlJywgZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuc29ydGluZ0RhdGEgJiYgZ3JpZC5kZWZhdWx0U29ydENvbHVtbikge1xuICAgICAgY29uZmlnLnNvcnRpbmdEYXRhID0ge1xuICAgICAgICBzb3J0Q29sdW1uOiBncmlkLmRlZmF1bHRTb3J0Q29sdW1uLFxuICAgICAgICBzb3J0T3JkZXI6IGdyaWQuZGVmYXVsdFNvcnRPcmRlciB8fCAnYXNjJyxcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBjb25maWc7XG4gIH0sXG4gIHNhdmVTZWxlY3RlZEl0ZW1zOiAoZ3JpZCwgc2VsZWN0ZWRJdGVtcykgPT4ge1xuICAgIGlmIChncmlkLmRpc2FibGVSZW1lbWJlclNlbGVjdGVkSXRlbXMpIHJldHVybiBmYWxzZTtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX3NlbGVjdGVkSXRlbXNfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KHNlbGVjdGVkSXRlbXMgfHwgW10pKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgc2F2ZUNvbHVtbldpZHRoczogKGdyaWQsIGNvbHVtbldpZHRocykgPT4ge1xuICAgIGlmIChncmlkLmRpc2FibGVSZW1lbWJlckNvbHVtbldpZHRocykgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghY29sdW1uV2lkdGhzKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGdyaWQuY29uZmlnU3RvcmFnZSAmJiBpc0Z1bmN0aW9uKGdyaWQuY29uZmlnU3RvcmFnZS5zYXZlKSkge1xuICAgICAgZ3JpZC5jb25maWdTdG9yYWdlLnNhdmUoeyBjb2x1bW5XaWR0aHMgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX2NvbHVtbldpZHRoc18ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoY29sdW1uV2lkdGhzKSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBzYXZlQ29sdW1uU2V0dGluZ3M6IChncmlkLCBoaWRkZW5Db2x1bW5zLCBjb2x1bW5PcmRlcikgPT4ge1xuICAgIGlmICghaGlkZGVuQ29sdW1ucyB8fCAhY29sdW1uT3JkZXIpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoZ3JpZC5jb25maWdTdG9yYWdlICYmIGlzRnVuY3Rpb24oZ3JpZC5jb25maWdTdG9yYWdlLnNhdmUpKSB7XG4gICAgICBncmlkLmNvbmZpZ1N0b3JhZ2Uuc2F2ZSh7IGhpZGRlbkNvbHVtbnMsIGNvbHVtbk9yZGVyIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9oaWRkZW5Db2x1bW5zXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShoaWRkZW5Db2x1bW5zKSk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9jb2x1bW5PcmRlcl8ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoY29sdW1uT3JkZXIpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIHNhdmVTb3J0RGF0YTogKGdyaWQsIHNvcnRpbmdEYXRhKSA9PiB7XG4gICAgaWYgKGdyaWQuZGlzYWJsZVJlbWVtYmVyU29ydERhdGEpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIXNvcnRpbmdEYXRhKSByZXR1cm4gZmFsc2U7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9zb3J0aW5nXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShzb3J0aW5nRGF0YSkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBzYXZlRmlsdGVyRGF0YTogKGdyaWQsIGZpbHRlckRhdGEpID0+IHtcbiAgICBpZiAoZ3JpZC5kaXNhYmxlUmVtZW1iZXJGaWx0ZURhdGEpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIWZpbHRlckRhdGEpIHJldHVybiBmYWxzZTtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX2ZpbHRlcmluZ18ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoZmlsdGVyRGF0YSkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBzYXZlSXNGaWx0ZXJpbmc6IChncmlkLCBpc0ZpbHRlcmluZykgPT4ge1xuICAgIGlmIChncmlkLmRpc2FibGVSZW1lbWJlcklzRmlsdGVyaW5nKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGlzRmlsdGVyaW5nID09PSB1bmRlZmluZWQpIHJldHVybiBmYWxzZTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9pc0ZpbHRlcmluZ18ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoaXNGaWx0ZXJpbmcpKTtcbiAgICBpZiAoIWlzRmlsdGVyaW5nKSB7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKGBvY19ncmlkX2ZpbHRlcmluZ18ke2dyaWQuaWR9YCk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICAvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG4gIGNoZWNrR3JpZFBhcmFtOiAoZ3JpZFBhcmFtKSA9PiB7XG4gICAgaWYgKGdyaWRQYXJhbSkge1xuICAgICAgaWYgKCFncmlkUGFyYW0uaWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbR3JpZF0gSW52YWxpZCBgZ3JpZC5pZGAgcGFyYW1ldGVyLCB1cGRhdGUgYWN0aW9uIHBhcmFtZXRlcnMgdG8gbmV3IGZvcm1hdCEnKTtcbiAgICAgIH1cbiAgICAgIGlmICghZ3JpZFBhcmFtLmlkS2V5UGF0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tHcmlkXSBJbnZhbGlkIGBncmlkLmlkS2V5UGF0aGAgcGFyYW1ldGVyLCB1cGRhdGUgYWN0aW9uIHBhcmFtZXRlcnMgdG8gbmV3IGZvcm1hdCEnKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdbR3JpZF0gSW52YWxpZCBgZ3JpZGAgcGFyYW1ldGVyLCB1cGRhdGUgYWN0aW9uIHBhcmFtZXRlcnMgdG8gbmV3IGZvcm1hdCEnKTtcbiAgICB9XG4gIH0sXG4gIGNoZWNrQ29sdW1uc1BhcmFtOiAoY29sdW1uc1BhcmFtKSA9PiB7XG4gICAgaWYgKCFjb2x1bW5zUGFyYW0pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignW0dyaWRdIEludmFsaWQgYGNvbHVtbnNgIHBhcmFtZXRlciwgdXBkYXRlIGFjdGlvbiBwYXJhbWV0ZXJzIHRvIG5ldyBmb3JtYXQhJyk7XG4gICAgfVxuICB9LFxuICAvLyBMb2NhbGUgZ2V0dGVycywgc3VwcG9ydCBncmlkIHBhcmFtIG9yIHVzZXIgc3RhdGUgdXNlZCBpbiBPQyBhcHBsaWNhdGlvbnNcbiAgZ2V0TGFuZ3VhZ2U6IChncmlkLCBvY1VzZXJTdGF0ZSkgPT4ge1xuICAgIGlmIChncmlkLmxhbmd1YWdlICYmIHR5cGVvZiBncmlkLmxhbmd1YWdlID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGdyaWQubGFuZ3VhZ2U7XG4gICAgfVxuICAgIGlmIChvY1VzZXJTdGF0ZSkge1xuICAgICAgcmV0dXJuIG9jVXNlclN0YXRlLmdldEluKFsndXNlcicsICdsYW5ndWFnZSddLCAnZW4nKTtcbiAgICB9XG4gICAgcmV0dXJuICdlbic7XG4gIH0sXG4gIGdldFJlZ2lvbjogKGdyaWQsIG9jVXNlclN0YXRlKSA9PiB7XG4gICAgY29uc3QgZGVmYXVsdFJlZ2lvbiA9ICdlbl9HQic7XG4gICAgaWYgKGdyaWQucmVnaW9uICYmIHR5cGVvZiBncmlkLnJlZ2lvbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBncmlkLnJlZ2lvbjtcbiAgICB9XG4gICAgaWYgKG9jVXNlclN0YXRlKSB7XG4gICAgICByZXR1cm4gb2NVc2VyU3RhdGUuZ2V0SW4oWyd1c2VyJywgJ3JlZ2lvbiddLCBkZWZhdWx0UmVnaW9uKTtcbiAgICB9XG4gICAgcmV0dXJuIGRlZmF1bHRSZWdpb247XG4gIH0sXG4gIGdldERhdGVGb3JtYXQ6IChncmlkLCBvY1VzZXJTdGF0ZSkgPT4ge1xuICAgIGlmIChncmlkLmRhdGVGb3JtYXQgJiYgdHlwZW9mIGdyaWQuZGF0ZUZvcm1hdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBncmlkLmRhdGVGb3JtYXQudG9VcHBlckNhc2UoKTtcbiAgICB9XG4gICAgaWYgKG9jVXNlclN0YXRlKSB7XG4gICAgICByZXR1cm4gb2NVc2VyU3RhdGUuZ2V0SW4oWydsb2NhbGVGb3JtYXQnLCAnZGF0ZUZvcm1hdCddLCAnTCcpO1xuICAgIH1cbiAgICByZXR1cm4gJ0wnO1xuICB9LFxuICBnZXRUaG91c2FuZFNlcGFyYXRvcjogKGdyaWQsIG9jVXNlclN0YXRlKSA9PiB7XG4gICAgaWYgKGdyaWQudGhvdXNhbmRTZXBhcmF0b3IgJiYgdHlwZW9mIGdyaWQubGFuZ3VhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZ3JpZC50aG91c2FuZFNlcGFyYXRvcjtcbiAgICB9XG4gICAgaWYgKG9jVXNlclN0YXRlKSB7XG4gICAgICByZXR1cm4gb2NVc2VyU3RhdGUuZ2V0SW4oWydsb2NhbGVGb3JtYXQnLCAndGhvdXNhbmRTZXBhcmF0b3InXSwgJycpO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH0sXG4gIGdldERlY2ltYWxTZXBhcmF0b3I6IChncmlkLCBvY1VzZXJTdGF0ZSkgPT4ge1xuICAgIGlmIChncmlkLmRlY2ltYWxTZXBhcmF0b3IgJiYgdHlwZW9mIGdyaWQubGFuZ3VhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZ3JpZC5kZWNpbWFsU2VwYXJhdG9yO1xuICAgIH1cbiAgICBpZiAob2NVc2VyU3RhdGUpIHtcbiAgICAgIHJldHVybiBvY1VzZXJTdGF0ZS5nZXRJbihbJ2xvY2FsZUZvcm1hdCcsICdkZWNpbWFsU2VwYXJhdG9yJ10sICcuJyk7XG4gICAgfVxuICAgIHJldHVybiAnLic7XG4gIH0sXG4gIG5vcm1hbGl6ZUZpbHRlcmluZ0RhdGE6IChmaWx0ZXJpbmdEYXRhKSA9PiB7XG4gICAgbGV0IG5ld0ZpbHRlcmluZ0RhdGEgPSBNYXAoeyBpc0ZpbHRlcmluZzogZmFsc2UgfSk7XG4gICAgaWYgKCFmaWx0ZXJpbmdEYXRhKSByZXR1cm4gbmV3RmlsdGVyaW5nRGF0YTtcblxuICAgIGNvbnN0IG9sZEZpbHRlcmluZ0RhdGEgPSBNYXAuaXNNYXAoZmlsdGVyaW5nRGF0YSkgPyBmaWx0ZXJpbmdEYXRhIDogZnJvbUpTKGZpbHRlcmluZ0RhdGEpO1xuICAgIGNvbnN0IGlzRmlsdGVyaW5nID0gb2xkRmlsdGVyaW5nRGF0YS5nZXQoJ2lzRmlsdGVyaW5nJywgZmFsc2UpO1xuICAgIGNvbnN0IGZpbHRlckRhdGEgPSBvbGRGaWx0ZXJpbmdEYXRhLmdldCgnZmlsdGVyRGF0YScsIG51bGwpO1xuXG4gICAgaWYgKGlzRmlsdGVyaW5nICYmIGZpbHRlckRhdGEgJiYgTWFwLmlzTWFwKGZpbHRlckRhdGEpKSB7XG4gICAgICBuZXdGaWx0ZXJpbmdEYXRhID0gbmV3RmlsdGVyaW5nRGF0YVxuICAgICAgICAuc2V0KCdpc0ZpbHRlcmluZycsIHRydWUpXG4gICAgICAgIC5zZXQoJ2ZpbHRlckRhdGEnLCBmaWx0ZXJEYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3RmlsdGVyaW5nRGF0YTtcbiAgfSxcbn07XG4iXX0=