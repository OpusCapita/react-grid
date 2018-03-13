/* eslint-disable no-nested-ternary */
import moment from 'moment';
import isNaN from 'lodash/isNaN';
import { isFunction } from 'util';

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
        return function (a, b) {
          return a - b;
        };
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
    switch (col.valueType) {
      case 'number':
        return function (val) {
          return val === '' || isNaN(val) || val === null || val === undefined;
        };
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
    if (col.filterMatcher) {
      return col.filterMatcher;
    }
    switch (col.valueType) {
      case 'number':
        return function (val, filterVal) {
          return parseInt(val, 10) === parseInt(filterVal, 10);
        };
      case 'float':
        return function (val, filterVal) {
          return parseFloat(filterVal.replace(',', '.')) === val;
        };
      case 'date':
        return function (val, filterVal) {
          if (moment(val, dateFormat, true).isValid()) {
            return moment.utc(filterVal, dateFormat).isSame(moment.utc(val, dateFormat), 'day');
          }
          if (moment(val).isValid()) {
            return moment.utc(filterVal, dateFormat).isSame(val, 'day');
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
      hiddenColumns = loadedConfig.hiddenColumns;
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
      columnOrder = loadedConfig.columnOrder;
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
    if (!selectedItems) return false;
    sessionStorage.setItem('oc_grid_selectedItems_' + grid.id, JSON.stringify(selectedItems));
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
  getDateFormat: function getDateFormat(grid, ocUserState) {
    if (grid.dateFormat && typeof grid.language === 'string') {
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
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC51dGlscy5qcyJdLCJuYW1lcyI6WyJtb21lbnQiLCJpc05hTiIsImlzRnVuY3Rpb24iLCJnZXRDb2x1bW5LZXkiLCJjb2wiLCJjb2x1bW5LZXkiLCJ2YWx1ZUtleVBhdGgiLCJqb2luIiwiZ2V0VmlzaWJsZUNvbHVtbnMiLCJjb2xzIiwiaGlkZGVuQ29sdW1ucyIsImNvbHVtbk9yZGVyIiwib3JkZXJlZENvbHVtbkxpc3QiLCJmb3JFYWNoIiwiaSIsImNvbE9yZGVySWR4IiwiaW5kZXhPZiIsImRlZmF1bHRIaWRkZW4iLCJpc0hpZGRlbiIsIm9yZGVyIiwicHVzaCIsInNvcnQiLCJhIiwiYiIsIm1hcCIsIml0ZW0iLCJnZXRDb2x1bW5EZWZhdWx0VmFsdWVzIiwiY29sdW1uRGVmYXVsdFZhbHVlcyIsImRlZmF1bHRWYWx1ZSIsInVuZGVmaW5lZCIsImdldENlbGxTdHlsZUJ5Q29sIiwiYWxpZ24iLCJ0ZXh0QWxpZ24iLCJjb21wb25lbnRUeXBlIiwidmFsdWVUeXBlIiwiaXNTb3J0YWJsZSIsInNvcnRWYWx1ZUdldHRlciIsImRpc2FibGVTb3J0aW5nIiwiZ2V0U29ydENvbXBhcmF0b3IiLCJzb3J0Q29tcGFyYXRvciIsImxvY2FsZUNvbXBhcmUiLCJEYXRlIiwiZ2V0U29ydFZhbHVlR2V0dGVyIiwiZGF0YSIsImdldEluIiwiZ2V0VmFsdWVFbXB0eUNoZWNrZXIiLCJ2YWx1ZUVtcHR5Q2hlY2tlciIsInZhbCIsImdldEZpbHRlck1hdGNoZXIiLCJkYXRlRm9ybWF0IiwiZmlsdGVyTWF0Y2hlciIsImZpbHRlclZhbCIsInBhcnNlSW50IiwicGFyc2VGbG9hdCIsInJlcGxhY2UiLCJpc1ZhbGlkIiwidXRjIiwiaXNTYW1lIiwiUmVnRXhwIiwidGVzdCIsImxvYWRTZWxlY3RlZEl0ZW1zIiwiZ3JpZCIsInNlc3Npb25JdGVtIiwic2Vzc2lvblN0b3JhZ2UiLCJnZXRJdGVtIiwiaWQiLCJkaXNhYmxlUmVtZW1iZXJTZWxlY3RlZEl0ZW1zIiwiSlNPTiIsInBhcnNlIiwiZSIsImNvbnNvbGUiLCJlcnJvciIsImxvYWRHcmlkQ29uZmlnIiwiY29uZmlnU3RvcmFnZSIsInNvcnRpbmdEYXRhIiwiZmlsdGVyRGF0YSIsImlzRmlsdGVyaW5nRGF0YSIsImxvY2FsU3RvcmFnZSIsImxvYWRlZENvbmZpZyIsImlzRmlsdGVyaW5nIiwibG9hZCIsImRpc2FibGVSZW1lbWJlcklzRmlsdGVyaW5nIiwiZGVmYXVsdFNob3dGaWx0ZXJpbmdSb3ciLCJoaWRkZW5Db2x1bW5zSnNvbiIsImNvbHVtbk9yZGVySnNvbiIsImNvbmZpZyIsInZpc2libGVDb2x1bW5zIiwiZmlsdGVyaW5nRGF0YSIsImNvbHVtbldpZHRocyIsImRpc2FibGVSZW1lbWJlckNvbHVtbldpZHRocyIsImRpc2FibGVSZW1lbWJlclNvcnREYXRhIiwiZGlzYWJsZVJlbWVtYmVyRmlsdGVEYXRhIiwiZGVmYXVsdFNvcnRDb2x1bW4iLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwiZGVmYXVsdFNvcnRPcmRlciIsInNhdmVTZWxlY3RlZEl0ZW1zIiwic2VsZWN0ZWRJdGVtcyIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJzYXZlQ29sdW1uV2lkdGhzIiwic2F2ZSIsInNhdmVDb2x1bW5TZXR0aW5ncyIsInNhdmVTb3J0RGF0YSIsInNhdmVGaWx0ZXJEYXRhIiwic2F2ZUlzRmlsdGVyaW5nIiwicmVtb3ZlSXRlbSIsImNoZWNrR3JpZFBhcmFtIiwiZ3JpZFBhcmFtIiwiRXJyb3IiLCJpZEtleVBhdGgiLCJjaGVja0NvbHVtbnNQYXJhbSIsImNvbHVtbnNQYXJhbSIsImdldExhbmd1YWdlIiwib2NVc2VyU3RhdGUiLCJsYW5ndWFnZSIsImdldERhdGVGb3JtYXQiLCJ0b1VwcGVyQ2FzZSIsImdldFRob3VzYW5kU2VwYXJhdG9yIiwidGhvdXNhbmRTZXBhcmF0b3IiLCJnZXREZWNpbWFsU2VwYXJhdG9yIiwiZGVjaW1hbFNlcGFyYXRvciJdLCJtYXBwaW5ncyI6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UCxFQUF1QjtBQUMxQyxRQUFJckQsS0FBSzRELGdCQUFMLElBQXlCLE9BQU81RCxLQUFLc0QsUUFBWixLQUF5QixRQUF0RCxFQUFnRTtBQUM5RCxhQUFPdEQsS0FBSzRELGdCQUFaO0FBQ0Q7QUFDRCxRQUFJUCxXQUFKLEVBQWlCO0FBQ2YsYUFBT0EsWUFBWXRFLEtBQVosQ0FBa0IsQ0FBQyxjQUFELEVBQWlCLGtCQUFqQixDQUFsQixFQUF3RCxHQUF4RCxDQUFQO0FBQ0Q7QUFDRCxXQUFPLEdBQVA7QUFDRDtBQXpUWSxDQUFmIiwiZmlsZSI6ImRhdGFncmlkLnV0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tbmVzdGVkLXRlcm5hcnkgKi9cbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCBpc05hTiBmcm9tICdsb2Rhc2gvaXNOYU4nO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJ3V0aWwnO1xuXG5jb25zdCBnZXRDb2x1bW5LZXkgPSBjb2wgPT4gKFxuICBjb2wuY29sdW1uS2V5IHx8IGNvbC52YWx1ZUtleVBhdGguam9pbignLycpXG4pO1xuXG5jb25zdCBnZXRWaXNpYmxlQ29sdW1ucyA9IChjb2xzLCBoaWRkZW5Db2x1bW5zID0gW10sIGNvbHVtbk9yZGVyID0gW10pID0+IHtcbiAgY29uc3Qgb3JkZXJlZENvbHVtbkxpc3QgPSBbXTtcbiAgY29scy5mb3JFYWNoKChjb2wsIGkpID0+IHtcbiAgICBjb25zdCBjb2x1bW5LZXkgPSBnZXRDb2x1bW5LZXkoY29sKTtcbiAgICBjb25zdCBjb2xPcmRlcklkeCA9IGNvbHVtbk9yZGVyLmluZGV4T2YoY29sdW1uS2V5KTtcbiAgICBjb25zdCBkZWZhdWx0SGlkZGVuID0gY29sLmlzSGlkZGVuICYmIGNvbE9yZGVySWR4ID09PSAtMTtcbiAgICBpZiAoZGVmYXVsdEhpZGRlbiB8fCBoaWRkZW5Db2x1bW5zLmluZGV4T2YoY29sdW1uS2V5KSA+IC0xKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG9yZGVyID0gY29sT3JkZXJJZHggIT09IC0xID8gY29sT3JkZXJJZHggOiAoaSArIDEpO1xuICAgIG9yZGVyZWRDb2x1bW5MaXN0LnB1c2goe1xuICAgICAgY29sdW1uS2V5LFxuICAgICAgb3JkZXIsXG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gb3JkZXJlZENvbHVtbkxpc3Quc29ydCgoYSwgYikgPT4gKGEub3JkZXIgLSBiLm9yZGVyKSkubWFwKGl0ZW0gPT4gaXRlbS5jb2x1bW5LZXkpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBnZXRDb2x1bW5LZXksXG4gIGdldENvbHVtbkRlZmF1bHRWYWx1ZXM6IChjb2xzKSA9PiB7XG4gICAgY29uc3QgY29sdW1uRGVmYXVsdFZhbHVlcyA9IHt9O1xuICAgIGNvbHMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICBpZiAoY29sLmRlZmF1bHRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbHVtbkRlZmF1bHRWYWx1ZXNbZ2V0Q29sdW1uS2V5KGNvbCldID0gY29sLmRlZmF1bHRWYWx1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gY29sdW1uRGVmYXVsdFZhbHVlcztcbiAgfSxcbiAgZ2V0Q2VsbFN0eWxlQnlDb2w6IChjb2wpID0+IHtcbiAgICBpZiAoY29sLmFsaWduKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0ZXh0QWxpZ246IGNvbC5hbGlnbixcbiAgICAgIH07XG4gICAgfVxuICAgIC8vIE5vIGRlZmF1bHQgYWxpZ24gaWYgY29tcG9uZW50IGlzIHNlbGVjdFxuICAgIC8vIEJlY2F1c2UgcmVuZGVyZWQgZGF0YSBpcyBtb3N0IGxpa2VseSB0ZXh0XG4gICAgLy8gRXZlbiBpZiB2YWx1ZVR5cGUgaXMgbnVtYmVyXG4gICAgaWYgKGNvbC5jb21wb25lbnRUeXBlID09PSAnc2VsZWN0Jykge1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgICBzd2l0Y2ggKGNvbC52YWx1ZVR5cGUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0ZXh0QWxpZ246ICdyaWdodCcsXG4gICAgICAgIH07XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4ge307XG4gICAgfVxuICB9LFxuICBpc1NvcnRhYmxlOiBjb2wgPT4gKFxuICAgIGNvbC52YWx1ZVR5cGUgJiZcbiAgICAoY29sLnNvcnRWYWx1ZUdldHRlciB8fCBjb2wudmFsdWVLZXlQYXRoKSAmJlxuICAgICFjb2wuZGlzYWJsZVNvcnRpbmdcbiAgKSxcbiAgZ2V0U29ydENvbXBhcmF0b3I6IChjb2wpID0+IHtcbiAgICBpZiAoY29sLnNvcnRDb21wYXJhdG9yKSB7XG4gICAgICByZXR1cm4gY29sLnNvcnRDb21wYXJhdG9yO1xuICAgIH1cbiAgICBzd2l0Y2ggKGNvbC52YWx1ZVR5cGUpIHtcbiAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgICByZXR1cm4gKGEsIGIpID0+IChhLmxvY2FsZUNvbXBhcmUgPyBhLmxvY2FsZUNvbXBhcmUoYikgOiAxKTtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIHJldHVybiAoYSwgYikgPT4gKGEgLSBiKTtcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgICAgcmV0dXJuIChhLCBiKSA9PiAoYSAtIGIpO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIHJldHVybiAoYSwgYikgPT4gKGEgPT09IGIgPyAwIDogKGEgPyAtMSA6IDEpKTtcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICByZXR1cm4gKGEsIGIpID0+IChuZXcgRGF0ZShhKSAtIG5ldyBEYXRlKGIpKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAoYSwgYikgPT4gKGEubG9jYWxlQ29tcGFyZSA/IGEubG9jYWxlQ29tcGFyZShiKSA6IDEpO1xuICAgIH1cbiAgfSxcbiAgZ2V0U29ydFZhbHVlR2V0dGVyOiAoY29sKSA9PiB7XG4gICAgaWYgKGNvbC5zb3J0VmFsdWVHZXR0ZXIpIHtcbiAgICAgIHJldHVybiBjb2wuc29ydFZhbHVlR2V0dGVyO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YSA9PiBkYXRhLmdldEluKGNvbC52YWx1ZUtleVBhdGgpO1xuICB9LFxuICBnZXRWYWx1ZUVtcHR5Q2hlY2tlcjogKGNvbCkgPT4ge1xuICAgIGlmIChjb2wudmFsdWVFbXB0eUNoZWNrZXIpIHtcbiAgICAgIHJldHVybiBjb2wudmFsdWVFbXB0eUNoZWNrZXI7XG4gICAgfVxuICAgIHN3aXRjaCAoY29sLnZhbHVlVHlwZSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgcmV0dXJuIHZhbCA9PiAoXG4gICAgICAgICAgdmFsID09PSAnJyB8fFxuICAgICAgICAgIGlzTmFOKHZhbCkgfHxcbiAgICAgICAgICB2YWwgPT09IG51bGwgfHxcbiAgICAgICAgICB2YWwgPT09IHVuZGVmaW5lZFxuICAgICAgICApO1xuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgICByZXR1cm4gdmFsID0+IChcbiAgICAgICAgICB2YWwgPT09ICcnIHx8XG4gICAgICAgICAgaXNOYU4odmFsKSB8fFxuICAgICAgICAgIHZhbCA9PT0gbnVsbCB8fFxuICAgICAgICAgIHZhbCA9PT0gdW5kZWZpbmVkXG4gICAgICAgICk7XG4gICAgICBjYXNlICd0ZXh0JzpcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICBjYXNlICdzZWxlY3QnOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHZhbCA9PiB2YWwgPT09ICcnIHx8IHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZDtcbiAgICB9XG4gIH0sXG4gIGdldEZpbHRlck1hdGNoZXI6IChjb2wsIGRhdGVGb3JtYXQpID0+IHtcbiAgICBpZiAoY29sLmZpbHRlck1hdGNoZXIpIHtcbiAgICAgIHJldHVybiBjb2wuZmlsdGVyTWF0Y2hlcjtcbiAgICB9XG4gICAgc3dpdGNoIChjb2wudmFsdWVUeXBlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICByZXR1cm4gKHZhbCwgZmlsdGVyVmFsKSA9PiBwYXJzZUludCh2YWwsIDEwKSA9PT0gcGFyc2VJbnQoZmlsdGVyVmFsLCAxMCk7XG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICAgIHJldHVybiAodmFsLCBmaWx0ZXJWYWwpID0+IHBhcnNlRmxvYXQoZmlsdGVyVmFsLnJlcGxhY2UoJywnLCAnLicpKSA9PT0gdmFsO1xuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgIHJldHVybiAodmFsLCBmaWx0ZXJWYWwpID0+IHtcbiAgICAgICAgICBpZiAobW9tZW50KHZhbCwgZGF0ZUZvcm1hdCwgdHJ1ZSkuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gbW9tZW50LnV0YyhmaWx0ZXJWYWwsIGRhdGVGb3JtYXQpLmlzU2FtZShtb21lbnQudXRjKHZhbCwgZGF0ZUZvcm1hdCksICdkYXknKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG1vbWVudCh2YWwpLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG1vbWVudC51dGMoZmlsdGVyVmFsLCBkYXRlRm9ybWF0KS5pc1NhbWUodmFsLCAnZGF5Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgY2FzZSAnc2VsZWN0JzpcbiAgICAgICAgcmV0dXJuICh2YWwsIGZpbHRlclZhbCkgPT4gdmFsID09PSBmaWx0ZXJWYWw7XG4gICAgICBjYXNlICd0ZXh0JzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAodmFsLCBmaWx0ZXJWYWwpID0+IChuZXcgUmVnRXhwKGZpbHRlclZhbCwgJ2knKSkudGVzdCh2YWwpO1xuICAgIH1cbiAgfSxcbiAgbG9hZFNlbGVjdGVkSXRlbXM6IChncmlkKSA9PiB7XG4gICAgY29uc3Qgc2Vzc2lvbkl0ZW0gPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX3NlbGVjdGVkSXRlbXNfJHtncmlkLmlkfWApO1xuICAgIGlmIChzZXNzaW9uSXRlbSAmJiAhZ3JpZC5kaXNhYmxlUmVtZW1iZXJTZWxlY3RlZEl0ZW1zKSB7XG4gICAgICB0cnkgeyByZXR1cm4gSlNPTi5wYXJzZShzZXNzaW9uSXRlbSk7IH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgc2VsZWN0ZWRJdGVtcyBmcm9tIHNlc3Npb25TdG9yYWdlJywgZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBbXTtcbiAgfSxcbiAgbG9hZEdyaWRDb25maWc6IChncmlkLCBjb2xzKSA9PiB7XG4gICAgY29uc3QgY29uZmlnU3RvcmFnZSA9IGdyaWQuY29uZmlnU3RvcmFnZSB8fCB7fTtcbiAgICBjb25zdCBzb3J0aW5nRGF0YSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfc29ydGluZ18ke2dyaWQuaWR9YCk7XG4gICAgY29uc3QgZmlsdGVyRGF0YSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfZmlsdGVyaW5nXyR7Z3JpZC5pZH1gKTtcbiAgICBjb25zdCBpc0ZpbHRlcmluZ0RhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgb2NfZ3JpZF9pc0ZpbHRlcmluZ18ke2dyaWQuaWR9YCk7XG4gICAgbGV0IGxvYWRlZENvbmZpZyA9IHt9O1xuICAgIGxldCBoaWRkZW5Db2x1bW5zO1xuICAgIGxldCBjb2x1bW5PcmRlcjtcbiAgICBsZXQgaXNGaWx0ZXJpbmcgPSBmYWxzZTtcblxuICAgIGlmIChpc0Z1bmN0aW9uKGNvbmZpZ1N0b3JhZ2UubG9hZCkpIHtcbiAgICAgIGxvYWRlZENvbmZpZyA9IGNvbmZpZ1N0b3JhZ2UubG9hZCgpO1xuICAgIH1cblxuICAgIGlmIChpc0ZpbHRlcmluZ0RhdGEpIHtcbiAgICAgIGlmICghZ3JpZC5kaXNhYmxlUmVtZW1iZXJJc0ZpbHRlcmluZykge1xuICAgICAgICB0cnkgeyBpc0ZpbHRlcmluZyA9IEpTT04ucGFyc2UoaXNGaWx0ZXJpbmdEYXRhKTsgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgaXNGaWx0ZXJpbmdEYXRhIGZyb20gbG9jYWxTdG9yYWdlJywgZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGdyaWQuZGVmYXVsdFNob3dGaWx0ZXJpbmdSb3cpIHtcbiAgICAgIGlzRmlsdGVyaW5nID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGxvYWRlZENvbmZpZy5oaWRkZW5Db2x1bW5zKSB7XG4gICAgICBoaWRkZW5Db2x1bW5zID0gbG9hZGVkQ29uZmlnLmhpZGRlbkNvbHVtbnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGhpZGRlbkNvbHVtbnNKc29uID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfaGlkZGVuQ29sdW1uc18ke2dyaWQuaWR9YCk7XG4gICAgICBpZiAoaGlkZGVuQ29sdW1uc0pzb24pIHtcbiAgICAgICAgdHJ5IHsgaGlkZGVuQ29sdW1ucyA9IEpTT04ucGFyc2UoaGlkZGVuQ29sdW1uc0pzb24pOyB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhZ3JpZDogZXJyb3IgcGFyc2luZyBoaWRkZW5Db2x1bW5zIGZyb20gbG9jYWxTdG9yYWdlJywgZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGxvYWRlZENvbmZpZy5jb2x1bW5PcmRlcikge1xuICAgICAgY29sdW1uT3JkZXIgPSBsb2FkZWRDb25maWcuY29sdW1uT3JkZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNvbHVtbk9yZGVySnNvbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX2NvbHVtbk9yZGVyXyR7Z3JpZC5pZH1gKTtcbiAgICAgIGlmIChjb2x1bW5PcmRlckpzb24pIHtcbiAgICAgICAgdHJ5IHsgY29sdW1uT3JkZXIgPSBKU09OLnBhcnNlKGNvbHVtbk9yZGVySnNvbik7IH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIGNvbHVtbk9yZGVyIGZyb20gbG9jYWxTdG9yYWdlJywgZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgdmlzaWJsZUNvbHVtbnM6IGdldFZpc2libGVDb2x1bW5zKGNvbHMsIGhpZGRlbkNvbHVtbnMsIGNvbHVtbk9yZGVyKSxcbiAgICAgIGZpbHRlcmluZ0RhdGE6IHtcbiAgICAgICAgaXNGaWx0ZXJpbmcsXG4gICAgICB9LFxuICAgIH07XG4gICAgaWYgKGxvYWRlZENvbmZpZy5jb2x1bW5XaWR0aHMpIHtcbiAgICAgIGNvbmZpZy5jb2x1bW5XaWR0aHMgPSBsb2FkZWRDb25maWcuY29sdW1uV2lkdGhzO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjb2x1bW5XaWR0aHMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgb2NfZ3JpZF9jb2x1bW5XaWR0aHNfJHtncmlkLmlkfWApO1xuICAgICAgaWYgKGNvbHVtbldpZHRocyAmJiAhZ3JpZC5kaXNhYmxlUmVtZW1iZXJDb2x1bW5XaWR0aHMpIHtcbiAgICAgICAgdHJ5IHsgY29uZmlnLmNvbHVtbldpZHRocyA9IEpTT04ucGFyc2UoY29sdW1uV2lkdGhzKTsgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgY29sdW1uV2lkdGhzIGZyb20gbG9jYWxTdG9yYWdlJywgZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNvcnRpbmdEYXRhICYmICFncmlkLmRpc2FibGVSZW1lbWJlclNvcnREYXRhKSB7XG4gICAgICB0cnkgeyBjb25maWcuc29ydGluZ0RhdGEgPSBKU09OLnBhcnNlKHNvcnRpbmdEYXRhKTsgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhZ3JpZDogZXJyb3IgcGFyc2luZyBzb3J0aW5nRGF0YSBmcm9tIHNlc3Npb25TdG9yYWdlJywgZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChmaWx0ZXJEYXRhICYmIGlzRmlsdGVyaW5nICYmICFncmlkLmRpc2FibGVSZW1lbWJlckZpbHRlRGF0YSkge1xuICAgICAgdHJ5IHsgY29uZmlnLmZpbHRlcmluZ0RhdGEuZmlsdGVyRGF0YSA9IEpTT04ucGFyc2UoZmlsdGVyRGF0YSk7IH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgZmlsdGVyRGF0YSBmcm9tIHNlc3Npb25TdG9yYWdlJywgZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuc29ydGluZ0RhdGEgJiYgZ3JpZC5kZWZhdWx0U29ydENvbHVtbikge1xuICAgICAgY29uZmlnLnNvcnRpbmdEYXRhID0ge1xuICAgICAgICBzb3J0Q29sdW1uOiBncmlkLmRlZmF1bHRTb3J0Q29sdW1uLFxuICAgICAgICBzb3J0T3JkZXI6IGdyaWQuZGVmYXVsdFNvcnRPcmRlciB8fCAnYXNjJyxcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBjb25maWc7XG4gIH0sXG4gIHNhdmVTZWxlY3RlZEl0ZW1zOiAoZ3JpZCwgc2VsZWN0ZWRJdGVtcykgPT4ge1xuICAgIGlmIChncmlkLmRpc2FibGVSZW1lbWJlclNlbGVjdGVkSXRlbXMpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIXNlbGVjdGVkSXRlbXMpIHJldHVybiBmYWxzZTtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX3NlbGVjdGVkSXRlbXNfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KHNlbGVjdGVkSXRlbXMpKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgc2F2ZUNvbHVtbldpZHRoczogKGdyaWQsIGNvbHVtbldpZHRocykgPT4ge1xuICAgIGlmIChncmlkLmRpc2FibGVSZW1lbWJlckNvbHVtbldpZHRocykgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghY29sdW1uV2lkdGhzKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGdyaWQuY29uZmlnU3RvcmFnZSAmJiBpc0Z1bmN0aW9uKGdyaWQuY29uZmlnU3RvcmFnZS5zYXZlKSkge1xuICAgICAgZ3JpZC5jb25maWdTdG9yYWdlLnNhdmUoeyBjb2x1bW5XaWR0aHMgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX2NvbHVtbldpZHRoc18ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoY29sdW1uV2lkdGhzKSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBzYXZlQ29sdW1uU2V0dGluZ3M6IChncmlkLCBoaWRkZW5Db2x1bW5zLCBjb2x1bW5PcmRlcikgPT4ge1xuICAgIGlmICghaGlkZGVuQ29sdW1ucyB8fCAhY29sdW1uT3JkZXIpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoZ3JpZC5jb25maWdTdG9yYWdlICYmIGlzRnVuY3Rpb24oZ3JpZC5jb25maWdTdG9yYWdlLnNhdmUpKSB7XG4gICAgICBncmlkLmNvbmZpZ1N0b3JhZ2Uuc2F2ZSh7IGhpZGRlbkNvbHVtbnMsIGNvbHVtbk9yZGVyIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9oaWRkZW5Db2x1bW5zXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShoaWRkZW5Db2x1bW5zKSk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9jb2x1bW5PcmRlcl8ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoY29sdW1uT3JkZXIpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIHNhdmVTb3J0RGF0YTogKGdyaWQsIHNvcnRpbmdEYXRhKSA9PiB7XG4gICAgaWYgKGdyaWQuZGlzYWJsZVJlbWVtYmVyU29ydERhdGEpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIXNvcnRpbmdEYXRhKSByZXR1cm4gZmFsc2U7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9zb3J0aW5nXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShzb3J0aW5nRGF0YSkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBzYXZlRmlsdGVyRGF0YTogKGdyaWQsIGZpbHRlckRhdGEpID0+IHtcbiAgICBpZiAoZ3JpZC5kaXNhYmxlUmVtZW1iZXJGaWx0ZURhdGEpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIWZpbHRlckRhdGEpIHJldHVybiBmYWxzZTtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX2ZpbHRlcmluZ18ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoZmlsdGVyRGF0YSkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBzYXZlSXNGaWx0ZXJpbmc6IChncmlkLCBpc0ZpbHRlcmluZykgPT4ge1xuICAgIGlmIChncmlkLmRpc2FibGVSZW1lbWJlcklzRmlsdGVyaW5nKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGlzRmlsdGVyaW5nID09PSB1bmRlZmluZWQpIHJldHVybiBmYWxzZTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9pc0ZpbHRlcmluZ18ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoaXNGaWx0ZXJpbmcpKTtcbiAgICBpZiAoIWlzRmlsdGVyaW5nKSB7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKGBvY19ncmlkX2ZpbHRlcmluZ18ke2dyaWQuaWR9YCk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICAvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG4gIGNoZWNrR3JpZFBhcmFtOiAoZ3JpZFBhcmFtKSA9PiB7XG4gICAgaWYgKGdyaWRQYXJhbSkge1xuICAgICAgaWYgKCFncmlkUGFyYW0uaWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbR3JpZF0gSW52YWxpZCBgZ3JpZC5pZGAgcGFyYW1ldGVyLCB1cGRhdGUgYWN0aW9uIHBhcmFtZXRlcnMgdG8gbmV3IGZvcm1hdCEnKTtcbiAgICAgIH1cbiAgICAgIGlmICghZ3JpZFBhcmFtLmlkS2V5UGF0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tHcmlkXSBJbnZhbGlkIGBncmlkLmlkS2V5UGF0aGAgcGFyYW1ldGVyLCB1cGRhdGUgYWN0aW9uIHBhcmFtZXRlcnMgdG8gbmV3IGZvcm1hdCEnKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdbR3JpZF0gSW52YWxpZCBgZ3JpZGAgcGFyYW1ldGVyLCB1cGRhdGUgYWN0aW9uIHBhcmFtZXRlcnMgdG8gbmV3IGZvcm1hdCEnKTtcbiAgICB9XG4gIH0sXG4gIGNoZWNrQ29sdW1uc1BhcmFtOiAoY29sdW1uc1BhcmFtKSA9PiB7XG4gICAgaWYgKCFjb2x1bW5zUGFyYW0pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignW0dyaWRdIEludmFsaWQgYGNvbHVtbnNgIHBhcmFtZXRlciwgdXBkYXRlIGFjdGlvbiBwYXJhbWV0ZXJzIHRvIG5ldyBmb3JtYXQhJyk7XG4gICAgfVxuICB9LFxuICAvLyBMb2NhbGUgZ2V0dGVycywgc3VwcG9ydCBncmlkIHBhcmFtIG9yIHVzZXIgc3RhdGUgdXNlZCBpbiBPQyBhcHBsaWNhdGlvbnNcbiAgZ2V0TGFuZ3VhZ2U6IChncmlkLCBvY1VzZXJTdGF0ZSkgPT4ge1xuICAgIGlmIChncmlkLmxhbmd1YWdlICYmIHR5cGVvZiBncmlkLmxhbmd1YWdlID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGdyaWQubGFuZ3VhZ2U7XG4gICAgfVxuICAgIGlmIChvY1VzZXJTdGF0ZSkge1xuICAgICAgcmV0dXJuIG9jVXNlclN0YXRlLmdldEluKFsndXNlcicsICdsYW5ndWFnZSddLCAnZW4nKTtcbiAgICB9XG4gICAgcmV0dXJuICdlbic7XG4gIH0sXG4gIGdldERhdGVGb3JtYXQ6IChncmlkLCBvY1VzZXJTdGF0ZSkgPT4ge1xuICAgIGlmIChncmlkLmRhdGVGb3JtYXQgJiYgdHlwZW9mIGdyaWQubGFuZ3VhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZ3JpZC5kYXRlRm9ybWF0LnRvVXBwZXJDYXNlKCk7XG4gICAgfVxuICAgIGlmIChvY1VzZXJTdGF0ZSkge1xuICAgICAgcmV0dXJuIG9jVXNlclN0YXRlLmdldEluKFsnbG9jYWxlRm9ybWF0JywgJ2RhdGVGb3JtYXQnXSwgJ0wnKTtcbiAgICB9XG4gICAgcmV0dXJuICdMJztcbiAgfSxcbiAgZ2V0VGhvdXNhbmRTZXBhcmF0b3I6IChncmlkLCBvY1VzZXJTdGF0ZSkgPT4ge1xuICAgIGlmIChncmlkLnRob3VzYW5kU2VwYXJhdG9yICYmIHR5cGVvZiBncmlkLmxhbmd1YWdlID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGdyaWQudGhvdXNhbmRTZXBhcmF0b3I7XG4gICAgfVxuICAgIGlmIChvY1VzZXJTdGF0ZSkge1xuICAgICAgcmV0dXJuIG9jVXNlclN0YXRlLmdldEluKFsnbG9jYWxlRm9ybWF0JywgJ3Rob3VzYW5kU2VwYXJhdG9yJ10sICcnKTtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9LFxuICBnZXREZWNpbWFsU2VwYXJhdG9yOiAoZ3JpZCwgb2NVc2VyU3RhdGUpID0+IHtcbiAgICBpZiAoZ3JpZC5kZWNpbWFsU2VwYXJhdG9yICYmIHR5cGVvZiBncmlkLmxhbmd1YWdlID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGdyaWQuZGVjaW1hbFNlcGFyYXRvcjtcbiAgICB9XG4gICAgaWYgKG9jVXNlclN0YXRlKSB7XG4gICAgICByZXR1cm4gb2NVc2VyU3RhdGUuZ2V0SW4oWydsb2NhbGVGb3JtYXQnLCAnZGVjaW1hbFNlcGFyYXRvciddLCAnLicpO1xuICAgIH1cbiAgICByZXR1cm4gJy4nO1xuICB9LFxufTtcbiJdfQ==