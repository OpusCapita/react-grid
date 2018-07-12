'use strict';

exports.__esModule = true;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _isNaN = require('lodash/isNaN');

var _isNaN2 = _interopRequireDefault(_isNaN);

var _util = require('util');

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-nested-ternary */
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

exports.default = {
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
          return val === '' || (0, _isNaN2.default)(val) || val === null || val === undefined;
        };
      case 'float':
        return function (val) {
          return val === '' || (0, _isNaN2.default)(val) || val === null || val === undefined;
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
          if ((0, _moment2.default)(val).isValid()) {
            return (0, _moment2.default)(val).format(dateFormat) === (0, _moment2.default)(filterVal).format(dateFormat);
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

    if ((0, _util.isFunction)(configStorage.load)) {
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
    if (grid.configStorage && (0, _util.isFunction)(grid.configStorage.save)) {
      grid.configStorage.save({ columnWidths: columnWidths });
    } else {
      localStorage.setItem('oc_grid_columnWidths_' + grid.id, JSON.stringify(columnWidths));
    }
    return true;
  },
  saveColumnSettings: function saveColumnSettings(grid, hiddenColumns, columnOrder) {
    if (!hiddenColumns || !columnOrder) return false;
    if (grid.configStorage && (0, _util.isFunction)(grid.configStorage.save)) {
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
  },
  normalizeFilteringData: function normalizeFilteringData(filteringData) {
    var newFilteringData = (0, _immutable.Map)({ isFiltering: false });
    if (!filteringData) return newFilteringData;

    var oldFilteringData = _immutable.Map.isMap(filteringData) ? filteringData : (0, _immutable.fromJS)(filteringData);
    var isFiltering = oldFilteringData.get('isFiltering', false);
    var filterData = oldFilteringData.get('filterData', null);

    if (isFiltering && filterData && _immutable.Map.isMap(filterData)) {
      newFilteringData = newFilteringData.set('isFiltering', true).set('filterData', filterData);
    }

    return newFilteringData;
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC51dGlscy5qcyJdLCJuYW1lcyI6WyJnZXRDb2x1bW5LZXkiLCJjb2wiLCJjb2x1bW5LZXkiLCJ2YWx1ZUtleVBhdGgiLCJqb2luIiwiZ2V0VmlzaWJsZUNvbHVtbnMiLCJjb2xzIiwiaGlkZGVuQ29sdW1ucyIsImNvbHVtbk9yZGVyIiwib3JkZXJlZENvbHVtbkxpc3QiLCJmb3JFYWNoIiwiaSIsImNvbE9yZGVySWR4IiwiaW5kZXhPZiIsImRlZmF1bHRIaWRkZW4iLCJpc0hpZGRlbiIsIm9yZGVyIiwicHVzaCIsInNvcnQiLCJhIiwiYiIsIm1hcCIsIml0ZW0iLCJnZXRDb2x1bW5EZWZhdWx0VmFsdWVzIiwiY29sdW1uRGVmYXVsdFZhbHVlcyIsImRlZmF1bHRWYWx1ZSIsInVuZGVmaW5lZCIsImdldENlbGxTdHlsZUJ5Q29sIiwiYWxpZ24iLCJ0ZXh0QWxpZ24iLCJjb21wb25lbnRUeXBlIiwidmFsdWVUeXBlIiwiaXNTb3J0YWJsZSIsInNvcnRWYWx1ZUdldHRlciIsImRpc2FibGVTb3J0aW5nIiwiZ2V0U29ydENvbXBhcmF0b3IiLCJzb3J0Q29tcGFyYXRvciIsImxvY2FsZUNvbXBhcmUiLCJEYXRlIiwiZ2V0U29ydFZhbHVlR2V0dGVyIiwiZGF0YSIsImdldEluIiwiZ2V0VmFsdWVFbXB0eUNoZWNrZXIiLCJ2YWx1ZUVtcHR5Q2hlY2tlciIsInZhbCIsImdldEZpbHRlck1hdGNoZXIiLCJkYXRlRm9ybWF0IiwiZmlsdGVyTWF0Y2hlciIsImZpbHRlclZhbCIsInBhcnNlSW50IiwicGFyc2VGbG9hdCIsInJlcGxhY2UiLCJpc1ZhbGlkIiwiZm9ybWF0IiwiUmVnRXhwIiwidGVzdCIsImxvYWRTZWxlY3RlZEl0ZW1zIiwiZ3JpZCIsInNlc3Npb25JdGVtIiwic2Vzc2lvblN0b3JhZ2UiLCJnZXRJdGVtIiwiaWQiLCJkaXNhYmxlUmVtZW1iZXJTZWxlY3RlZEl0ZW1zIiwiSlNPTiIsInBhcnNlIiwiZSIsImNvbnNvbGUiLCJlcnJvciIsImxvYWRHcmlkQ29uZmlnIiwiY29uZmlnU3RvcmFnZSIsInNvcnRpbmdEYXRhIiwiZmlsdGVyRGF0YSIsImlzRmlsdGVyaW5nRGF0YSIsImxvY2FsU3RvcmFnZSIsImxvYWRlZENvbmZpZyIsImlzRmlsdGVyaW5nIiwibG9hZCIsImRpc2FibGVSZW1lbWJlcklzRmlsdGVyaW5nIiwiZGVmYXVsdFNob3dGaWx0ZXJpbmdSb3ciLCJoaWRkZW5Db2x1bW5zSnNvbiIsImNvbHVtbk9yZGVySnNvbiIsImNvbmZpZyIsInZpc2libGVDb2x1bW5zIiwiZmlsdGVyaW5nRGF0YSIsImNvbHVtbldpZHRocyIsImRpc2FibGVSZW1lbWJlckNvbHVtbldpZHRocyIsImRpc2FibGVSZW1lbWJlclNvcnREYXRhIiwiZGlzYWJsZVJlbWVtYmVyRmlsdGVEYXRhIiwiZGVmYXVsdFNvcnRDb2x1bW4iLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwiZGVmYXVsdFNvcnRPcmRlciIsInNhdmVTZWxlY3RlZEl0ZW1zIiwic2VsZWN0ZWRJdGVtcyIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJzYXZlQ29sdW1uV2lkdGhzIiwic2F2ZSIsInNhdmVDb2x1bW5TZXR0aW5ncyIsInNhdmVTb3J0RGF0YSIsInNhdmVGaWx0ZXJEYXRhIiwic2F2ZUlzRmlsdGVyaW5nIiwicmVtb3ZlSXRlbSIsImNoZWNrR3JpZFBhcmFtIiwiZ3JpZFBhcmFtIiwiRXJyb3IiLCJpZEtleVBhdGgiLCJjaGVja0NvbHVtbnNQYXJhbSIsImNvbHVtbnNQYXJhbSIsImdldExhbmd1YWdlIiwib2NVc2VyU3RhdGUiLCJsYW5ndWFnZSIsImdldERhdGVGb3JtYXQiLCJ0b1VwcGVyQ2FzZSIsImdldFRob3VzYW5kU2VwYXJhdG9yIiwidGhvdXNhbmRTZXBhcmF0b3IiLCJnZXREZWNpbWFsU2VwYXJhdG9yIiwiZGVjaW1hbFNlcGFyYXRvciIsIm5vcm1hbGl6ZUZpbHRlcmluZ0RhdGEiLCJuZXdGaWx0ZXJpbmdEYXRhIiwib2xk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UDtBQUNELEdBclRZO0FBc1RiNkUsMEJBQXdCLGdDQUFDbkMsYUFBRCxFQUFtQjtBQUN6QyxRQUFJb0MsbUJBQW1CLG9CQUFJLEVBQUU1QyxhQUFhLEtBQWYsRUFBSixDQUF2QjtBQUNBLFFBQUksQ0FBQ1EsYUFBTCxFQUFvQixPQUFPb0MsZ0JBQVA7O0FBRXBCLFFBQU1DLG1CQUFtQkMsZUFBSUMsS0FBSixDQUFVdkMsYUFBVixJQUEyQkEsYUFBM0IsR0FBMkMsdUJBQU9BLGFBQVAsQ0FBcEU7QUFDQSxRQUFNUixjQUFjNkMsaUJBQWlCRyxHQUFqQixDQUFxQixhQUFyQixFQUFvQyxLQUFwQyxDQUFwQjtBQUNBLFFBQU1wRCxhQUFhaUQsaUJBQWlCRyxHQUFqQixDQUFxQixZQUFyQixFQUFtQyxJQUFuQyxDQUFuQjs7QUFFQSxRQUFJaEQsZUFBZUosVUFBZixJQUE2QmtELGVBQUlDLEtBQUosQ0FBVW5ELFVBQVYsQ0FBakMsRUFBd0Q7QUFDdERnRCx5QkFBbUJBLGlCQUNoQkssR0FEZ0IsQ0FDWixhQURZLEVBQ0csSUFESCxFQUVoQkEsR0FGZ0IsQ0FFWixZQUZZLEVBRUVyRCxVQUZGLENBQW5CO0FBR0Q7O0FBRUQsV0FBT2dELGdCQUFQO0FBQ0Q7QUFyVVksQyIsImZpbGUiOiJkYXRhZ3JpZC51dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLW5lc3RlZC10ZXJuYXJ5ICovXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgaXNOYU4gZnJvbSAnbG9kYXNoL2lzTmFOJztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICd1dGlsJztcbmltcG9ydCB7IE1hcCwgZnJvbUpTIH0gZnJvbSAnaW1tdXRhYmxlJztcblxuY29uc3QgZ2V0Q29sdW1uS2V5ID0gY29sID0+IChcbiAgY29sLmNvbHVtbktleSB8fCBjb2wudmFsdWVLZXlQYXRoLmpvaW4oJy8nKVxuKTtcblxuY29uc3QgZ2V0VmlzaWJsZUNvbHVtbnMgPSAoY29scywgaGlkZGVuQ29sdW1ucyA9IFtdLCBjb2x1bW5PcmRlciA9IFtdKSA9PiB7XG4gIGNvbnN0IG9yZGVyZWRDb2x1bW5MaXN0ID0gW107XG4gIGNvbHMuZm9yRWFjaCgoY29sLCBpKSA9PiB7XG4gICAgY29uc3QgY29sdW1uS2V5ID0gZ2V0Q29sdW1uS2V5KGNvbCk7XG4gICAgY29uc3QgY29sT3JkZXJJZHggPSBjb2x1bW5PcmRlci5pbmRleE9mKGNvbHVtbktleSk7XG4gICAgY29uc3QgZGVmYXVsdEhpZGRlbiA9IGNvbC5pc0hpZGRlbiAmJiBjb2xPcmRlcklkeCA9PT0gLTE7XG4gICAgaWYgKGRlZmF1bHRIaWRkZW4gfHwgaGlkZGVuQ29sdW1ucy5pbmRleE9mKGNvbHVtbktleSkgPiAtMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBvcmRlciA9IGNvbE9yZGVySWR4ICE9PSAtMSA/IGNvbE9yZGVySWR4IDogKGkgKyAxKTtcbiAgICBvcmRlcmVkQ29sdW1uTGlzdC5wdXNoKHtcbiAgICAgIGNvbHVtbktleSxcbiAgICAgIG9yZGVyLFxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIG9yZGVyZWRDb2x1bW5MaXN0LnNvcnQoKGEsIGIpID0+IChhLm9yZGVyIC0gYi5vcmRlcikpLm1hcChpdGVtID0+IGl0ZW0uY29sdW1uS2V5KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZ2V0Q29sdW1uS2V5LFxuICBnZXRDb2x1bW5EZWZhdWx0VmFsdWVzOiAoY29scykgPT4ge1xuICAgIGNvbnN0IGNvbHVtbkRlZmF1bHRWYWx1ZXMgPSB7fTtcbiAgICBjb2xzLmZvckVhY2goKGNvbCkgPT4ge1xuICAgICAgaWYgKGNvbC5kZWZhdWx0VmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb2x1bW5EZWZhdWx0VmFsdWVzW2dldENvbHVtbktleShjb2wpXSA9IGNvbC5kZWZhdWx0VmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGNvbHVtbkRlZmF1bHRWYWx1ZXM7XG4gIH0sXG4gIGdldENlbGxTdHlsZUJ5Q29sOiAoY29sKSA9PiB7XG4gICAgaWYgKGNvbC5hbGlnbikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGV4dEFsaWduOiBjb2wuYWxpZ24sXG4gICAgICB9O1xuICAgIH1cbiAgICAvLyBObyBkZWZhdWx0IGFsaWduIGlmIGNvbXBvbmVudCBpcyBzZWxlY3RcbiAgICAvLyBCZWNhdXNlIHJlbmRlcmVkIGRhdGEgaXMgbW9zdCBsaWtlbHkgdGV4dFxuICAgIC8vIEV2ZW4gaWYgdmFsdWVUeXBlIGlzIG51bWJlclxuICAgIGlmIChjb2wuY29tcG9uZW50VHlwZSA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgc3dpdGNoIChjb2wudmFsdWVUeXBlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdGV4dEFsaWduOiAncmlnaHQnLFxuICAgICAgICB9O1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgfSxcbiAgaXNTb3J0YWJsZTogY29sID0+IChcbiAgICBjb2wudmFsdWVUeXBlICYmXG4gICAgKGNvbC5zb3J0VmFsdWVHZXR0ZXIgfHwgY29sLnZhbHVlS2V5UGF0aCkgJiZcbiAgICAhY29sLmRpc2FibGVTb3J0aW5nXG4gICksXG4gIGdldFNvcnRDb21wYXJhdG9yOiAoY29sKSA9PiB7XG4gICAgaWYgKGNvbC5zb3J0Q29tcGFyYXRvcikge1xuICAgICAgcmV0dXJuIGNvbC5zb3J0Q29tcGFyYXRvcjtcbiAgICB9XG4gICAgc3dpdGNoIChjb2wudmFsdWVUeXBlKSB7XG4gICAgICBjYXNlICd0ZXh0JzpcbiAgICAgICAgcmV0dXJuIChhLCBiKSA9PiAoYS5sb2NhbGVDb21wYXJlID8gYS5sb2NhbGVDb21wYXJlKGIpIDogMSk7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICByZXR1cm4gKGEsIGIpID0+IChhIC0gYik7XG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICAgIHJldHVybiAoYSwgYikgPT4gKGEgLSBiKTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICByZXR1cm4gKGEsIGIpID0+IChhID09PSBiID8gMCA6IChhID8gLTEgOiAxKSk7XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgcmV0dXJuIChhLCBiKSA9PiAobmV3IERhdGUoYSkgLSBuZXcgRGF0ZShiKSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gKGEsIGIpID0+IChhLmxvY2FsZUNvbXBhcmUgPyBhLmxvY2FsZUNvbXBhcmUoYikgOiAxKTtcbiAgICB9XG4gIH0sXG4gIGdldFNvcnRWYWx1ZUdldHRlcjogKGNvbCkgPT4ge1xuICAgIGlmIChjb2wuc29ydFZhbHVlR2V0dGVyKSB7XG4gICAgICByZXR1cm4gY29sLnNvcnRWYWx1ZUdldHRlcjtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGEgPT4gZGF0YS5nZXRJbihjb2wudmFsdWVLZXlQYXRoKTtcbiAgfSxcbiAgZ2V0VmFsdWVFbXB0eUNoZWNrZXI6IChjb2wpID0+IHtcbiAgICBpZiAoY29sLnZhbHVlRW1wdHlDaGVja2VyKSB7XG4gICAgICByZXR1cm4gY29sLnZhbHVlRW1wdHlDaGVja2VyO1xuICAgIH1cbiAgICBzd2l0Y2ggKGNvbC52YWx1ZVR5cGUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIHJldHVybiB2YWwgPT4gKFxuICAgICAgICAgIHZhbCA9PT0gJycgfHxcbiAgICAgICAgICBpc05hTih2YWwpIHx8XG4gICAgICAgICAgdmFsID09PSBudWxsIHx8XG4gICAgICAgICAgdmFsID09PSB1bmRlZmluZWRcbiAgICAgICAgKTtcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgICAgcmV0dXJuIHZhbCA9PiAoXG4gICAgICAgICAgdmFsID09PSAnJyB8fFxuICAgICAgICAgIGlzTmFOKHZhbCkgfHxcbiAgICAgICAgICB2YWwgPT09IG51bGwgfHxcbiAgICAgICAgICB2YWwgPT09IHVuZGVmaW5lZFxuICAgICAgICApO1xuICAgICAgY2FzZSAndGV4dCc6XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgY2FzZSAnc2VsZWN0JzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB2YWwgPT4gdmFsID09PSAnJyB8fCB2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQ7XG4gICAgfVxuICB9LFxuICBnZXRGaWx0ZXJNYXRjaGVyOiAoY29sLCBkYXRlRm9ybWF0KSA9PiB7XG4gICAgaWYgKGNvbC5maWx0ZXJNYXRjaGVyKSB7XG4gICAgICByZXR1cm4gY29sLmZpbHRlck1hdGNoZXI7XG4gICAgfVxuICAgIHN3aXRjaCAoY29sLnZhbHVlVHlwZSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgcmV0dXJuICh2YWwsIGZpbHRlclZhbCkgPT4gcGFyc2VJbnQodmFsLCAxMCkgPT09IHBhcnNlSW50KGZpbHRlclZhbCwgMTApO1xuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgICByZXR1cm4gKHZhbCwgZmlsdGVyVmFsKSA9PiBwYXJzZUZsb2F0KGZpbHRlclZhbC5yZXBsYWNlKCcsJywgJy4nKSkgPT09IHZhbDtcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICByZXR1cm4gKHZhbCwgZmlsdGVyVmFsKSA9PiB7XG4gICAgICAgICAgaWYgKG1vbWVudCh2YWwpLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG1vbWVudCh2YWwpLmZvcm1hdChkYXRlRm9ybWF0KSA9PT0gbW9tZW50KGZpbHRlclZhbCkuZm9ybWF0KGRhdGVGb3JtYXQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH07XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIGNhc2UgJ3NlbGVjdCc6XG4gICAgICAgIHJldHVybiAodmFsLCBmaWx0ZXJWYWwpID0+IHZhbCA9PT0gZmlsdGVyVmFsO1xuICAgICAgY2FzZSAndGV4dCc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gKHZhbCwgZmlsdGVyVmFsKSA9PiAobmV3IFJlZ0V4cChmaWx0ZXJWYWwsICdpJykpLnRlc3QodmFsKTtcbiAgICB9XG4gIH0sXG4gIGxvYWRTZWxlY3RlZEl0ZW1zOiAoZ3JpZCkgPT4ge1xuICAgIGNvbnN0IHNlc3Npb25JdGVtID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShgb2NfZ3JpZF9zZWxlY3RlZEl0ZW1zXyR7Z3JpZC5pZH1gKTtcbiAgICBpZiAoc2Vzc2lvbkl0ZW0gJiYgIWdyaWQuZGlzYWJsZVJlbWVtYmVyU2VsZWN0ZWRJdGVtcykge1xuICAgICAgdHJ5IHsgcmV0dXJuIEpTT04ucGFyc2Uoc2Vzc2lvbkl0ZW0pOyB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIHNlbGVjdGVkSXRlbXMgZnJvbSBzZXNzaW9uU3RvcmFnZScsIGUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH0sXG4gIGxvYWRHcmlkQ29uZmlnOiAoZ3JpZCwgY29scykgPT4ge1xuICAgIGNvbnN0IGNvbmZpZ1N0b3JhZ2UgPSBncmlkLmNvbmZpZ1N0b3JhZ2UgfHwge307XG4gICAgY29uc3Qgc29ydGluZ0RhdGEgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX3NvcnRpbmdfJHtncmlkLmlkfWApO1xuICAgIGNvbnN0IGZpbHRlckRhdGEgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX2ZpbHRlcmluZ18ke2dyaWQuaWR9YCk7XG4gICAgY29uc3QgaXNGaWx0ZXJpbmdEYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfaXNGaWx0ZXJpbmdfJHtncmlkLmlkfWApO1xuICAgIGxldCBsb2FkZWRDb25maWcgPSB7fTtcbiAgICBsZXQgaGlkZGVuQ29sdW1ucztcbiAgICBsZXQgY29sdW1uT3JkZXI7XG4gICAgbGV0IGlzRmlsdGVyaW5nID0gZmFsc2U7XG5cbiAgICBpZiAoaXNGdW5jdGlvbihjb25maWdTdG9yYWdlLmxvYWQpKSB7XG4gICAgICBsb2FkZWRDb25maWcgPSBjb25maWdTdG9yYWdlLmxvYWQoKTtcbiAgICB9XG5cbiAgICBpZiAoaXNGaWx0ZXJpbmdEYXRhKSB7XG4gICAgICBpZiAoIWdyaWQuZGlzYWJsZVJlbWVtYmVySXNGaWx0ZXJpbmcpIHtcbiAgICAgICAgdHJ5IHsgaXNGaWx0ZXJpbmcgPSBKU09OLnBhcnNlKGlzRmlsdGVyaW5nRGF0YSk7IH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIGlzRmlsdGVyaW5nRGF0YSBmcm9tIGxvY2FsU3RvcmFnZScsIGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChncmlkLmRlZmF1bHRTaG93RmlsdGVyaW5nUm93KSB7XG4gICAgICBpc0ZpbHRlcmluZyA9IHRydWU7XG4gICAgfVxuICAgIGlmIChsb2FkZWRDb25maWcuaGlkZGVuQ29sdW1ucykge1xuICAgICAgaGlkZGVuQ29sdW1ucyA9IGxvYWRlZENvbmZpZy5oaWRkZW5Db2x1bW5zOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGhpZGRlbkNvbHVtbnNKc29uID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfaGlkZGVuQ29sdW1uc18ke2dyaWQuaWR9YCk7XG4gICAgICBpZiAoaGlkZGVuQ29sdW1uc0pzb24pIHtcbiAgICAgICAgdHJ5IHsgaGlkZGVuQ29sdW1ucyA9IEpTT04ucGFyc2UoaGlkZGVuQ29sdW1uc0pzb24pOyB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhZ3JpZDogZXJyb3IgcGFyc2luZyBoaWRkZW5Db2x1bW5zIGZyb20gbG9jYWxTdG9yYWdlJywgZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGxvYWRlZENvbmZpZy5jb2x1bW5PcmRlcikge1xuICAgICAgY29sdW1uT3JkZXIgPSBsb2FkZWRDb25maWcuY29sdW1uT3JkZXI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgY29sdW1uT3JkZXJKc29uID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfY29sdW1uT3JkZXJfJHtncmlkLmlkfWApO1xuICAgICAgaWYgKGNvbHVtbk9yZGVySnNvbikge1xuICAgICAgICB0cnkgeyBjb2x1bW5PcmRlciA9IEpTT04ucGFyc2UoY29sdW1uT3JkZXJKc29uKTsgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgY29sdW1uT3JkZXIgZnJvbSBsb2NhbFN0b3JhZ2UnLCBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICB2aXNpYmxlQ29sdW1uczogZ2V0VmlzaWJsZUNvbHVtbnMoY29scywgaGlkZGVuQ29sdW1ucywgY29sdW1uT3JkZXIpLFxuICAgICAgZmlsdGVyaW5nRGF0YToge1xuICAgICAgICBpc0ZpbHRlcmluZyxcbiAgICAgIH0sXG4gICAgfTtcbiAgICBpZiAobG9hZGVkQ29uZmlnLmNvbHVtbldpZHRocykge1xuICAgICAgY29uZmlnLmNvbHVtbldpZHRocyA9IGxvYWRlZENvbmZpZy5jb2x1bW5XaWR0aHM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNvbHVtbldpZHRocyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX2NvbHVtbldpZHRoc18ke2dyaWQuaWR9YCk7XG4gICAgICBpZiAoY29sdW1uV2lkdGhzICYmICFncmlkLmRpc2FibGVSZW1lbWJlckNvbHVtbldpZHRocykge1xuICAgICAgICB0cnkgeyBjb25maWcuY29sdW1uV2lkdGhzID0gSlNPTi5wYXJzZShjb2x1bW5XaWR0aHMpOyB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhZ3JpZDogZXJyb3IgcGFyc2luZyBjb2x1bW5XaWR0aHMgZnJvbSBsb2NhbFN0b3JhZ2UnLCBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc29ydGluZ0RhdGEgJiYgIWdyaWQuZGlzYWJsZVJlbWVtYmVyU29ydERhdGEpIHtcbiAgICAgIHRyeSB7IGNvbmZpZy5zb3J0aW5nRGF0YSA9IEpTT04ucGFyc2Uoc29ydGluZ0RhdGEpOyB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIHNvcnRpbmdEYXRhIGZyb20gc2Vzc2lvblN0b3JhZ2UnLCBlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGZpbHRlckRhdGEgJiYgaXNGaWx0ZXJpbmcgJiYgIWdyaWQuZGlzYWJsZVJlbWVtYmVyRmlsdGVEYXRhKSB7XG4gICAgICB0cnkgeyBjb25maWcuZmlsdGVyaW5nRGF0YS5maWx0ZXJEYXRhID0gSlNPTi5wYXJzZShmaWx0ZXJEYXRhKTsgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhZ3JpZDogZXJyb3IgcGFyc2luZyBmaWx0ZXJEYXRhIGZyb20gc2Vzc2lvblN0b3JhZ2UnLCBlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy5zb3J0aW5nRGF0YSAmJiBncmlkLmRlZmF1bHRTb3J0Q29sdW1uKSB7XG4gICAgICBjb25maWcuc29ydGluZ0RhdGEgPSB7XG4gICAgICAgIHNvcnRDb2x1bW46IGdyaWQuZGVmYXVsdFNvcnRDb2x1bW4sXG4gICAgICAgIHNvcnRPcmRlcjogZ3JpZC5kZWZhdWx0U29ydE9yZGVyIHx8ICdhc2MnLFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbmZpZztcbiAgfSxcbiAgc2F2ZVNlbGVjdGVkSXRlbXM6IChncmlkLCBzZWxlY3RlZEl0ZW1zKSA9PiB7XG4gICAgaWYgKGdyaWQuZGlzYWJsZVJlbWVtYmVyU2VsZWN0ZWRJdGVtcykgcmV0dXJuIGZhbHNlO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oYG9jX2dyaWRfc2VsZWN0ZWRJdGVtc18ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoc2VsZWN0ZWRJdGVtcyB8fCBbXSkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBzYXZlQ29sdW1uV2lkdGhzOiAoZ3JpZCwgY29sdW1uV2lkdGhzKSA9PiB7XG4gICAgaWYgKGdyaWQuZGlzYWJsZVJlbWVtYmVyQ29sdW1uV2lkdGhzKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFjb2x1bW5XaWR0aHMpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoZ3JpZC5jb25maWdTdG9yYWdlICYmIGlzRnVuY3Rpb24oZ3JpZC5jb25maWdTdG9yYWdlLnNhdmUpKSB7XG4gICAgICBncmlkLmNvbmZpZ1N0b3JhZ2Uuc2F2ZSh7IGNvbHVtbldpZHRocyB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYG9jX2dyaWRfY29sdW1uV2lkdGhzXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShjb2x1bW5XaWR0aHMpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIHNhdmVDb2x1bW5TZXR0aW5nczogKGdyaWQsIGhpZGRlbkNvbHVtbnMsIGNvbHVtbk9yZGVyKSA9PiB7XG4gICAgaWYgKCFoaWRkZW5Db2x1bW5zIHx8ICFjb2x1bW5PcmRlcikgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChncmlkLmNvbmZpZ1N0b3JhZ2UgJiYgaXNGdW5jdGlvbihncmlkLmNvbmZpZ1N0b3JhZ2Uuc2F2ZSkpIHtcbiAgICAgIGdyaWQuY29uZmlnU3RvcmFnZS5zYXZlKHsgaGlkZGVuQ29sdW1ucywgY29sdW1uT3JkZXIgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX2hpZGRlbkNvbHVtbnNfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KGhpZGRlbkNvbHVtbnMpKTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX2NvbHVtbk9yZGVyXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShjb2x1bW5PcmRlcikpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgc2F2ZVNvcnREYXRhOiAoZ3JpZCwgc29ydGluZ0RhdGEpID0+IHtcbiAgICBpZiAoZ3JpZC5kaXNhYmxlUmVtZW1iZXJTb3J0RGF0YSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghc29ydGluZ0RhdGEpIHJldHVybiBmYWxzZTtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX3NvcnRpbmdfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KHNvcnRpbmdEYXRhKSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIHNhdmVGaWx0ZXJEYXRhOiAoZ3JpZCwgZmlsdGVyRGF0YSkgPT4ge1xuICAgIGlmIChncmlkLmRpc2FibGVSZW1lbWJlckZpbHRlRGF0YSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghZmlsdGVyRGF0YSkgcmV0dXJuIGZhbHNlO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oYG9jX2dyaWRfZmlsdGVyaW5nXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShmaWx0ZXJEYXRhKSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIHNhdmVJc0ZpbHRlcmluZzogKGdyaWQsIGlzRmlsdGVyaW5nKSA9PiB7XG4gICAgaWYgKGdyaWQuZGlzYWJsZVJlbWVtYmVySXNGaWx0ZXJpbmcpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoaXNGaWx0ZXJpbmcgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZhbHNlO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX2lzRmlsdGVyaW5nXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShpc0ZpbHRlcmluZykpO1xuICAgIGlmICghaXNGaWx0ZXJpbmcpIHtcbiAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oYG9jX2dyaWRfZmlsdGVyaW5nXyR7Z3JpZC5pZH1gKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIC8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbiAgY2hlY2tHcmlkUGFyYW06IChncmlkUGFyYW0pID0+IHtcbiAgICBpZiAoZ3JpZFBhcmFtKSB7XG4gICAgICBpZiAoIWdyaWRQYXJhbS5pZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tHcmlkXSBJbnZhbGlkIGBncmlkLmlkYCBwYXJhbWV0ZXIsIHVwZGF0ZSBhY3Rpb24gcGFyYW1ldGVycyB0byBuZXcgZm9ybWF0IScpO1xuICAgICAgfVxuICAgICAgaWYgKCFncmlkUGFyYW0uaWRLZXlQYXRoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignW0dyaWRdIEludmFsaWQgYGdyaWQuaWRLZXlQYXRoYCBwYXJhbWV0ZXIsIHVwZGF0ZSBhY3Rpb24gcGFyYW1ldGVycyB0byBuZXcgZm9ybWF0IScpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tHcmlkXSBJbnZhbGlkIGBncmlkYCBwYXJhbWV0ZXIsIHVwZGF0ZSBhY3Rpb24gcGFyYW1ldGVycyB0byBuZXcgZm9ybWF0IScpO1xuICAgIH1cbiAgfSxcbiAgY2hlY2tDb2x1bW5zUGFyYW06IChjb2x1bW5zUGFyYW0pID0+IHtcbiAgICBpZiAoIWNvbHVtbnNQYXJhbSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdbR3JpZF0gSW52YWxpZCBgY29sdW1uc2AgcGFyYW1ldGVyLCB1cGRhdGUgYWN0aW9uIHBhcmFtZXRlcnMgdG8gbmV3IGZvcm1hdCEnKTtcbiAgICB9XG4gIH0sXG4gIC8vIExvY2FsZSBnZXR0ZXJzLCBzdXBwb3J0IGdyaWQgcGFyYW0gb3IgdXNlciBzdGF0ZSB1c2VkIGluIE9DIGFwcGxpY2F0aW9uc1xuICBnZXRMYW5ndWFnZTogKGdyaWQsIG9jVXNlclN0YXRlKSA9PiB7XG4gICAgaWYgKGdyaWQubGFuZ3VhZ2UgJiYgdHlwZW9mIGdyaWQubGFuZ3VhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZ3JpZC5sYW5ndWFnZTtcbiAgICB9XG4gICAgaWYgKG9jVXNlclN0YXRlKSB7XG4gICAgICByZXR1cm4gb2NVc2VyU3RhdGUuZ2V0SW4oWyd1c2VyJywgJ2xhbmd1YWdlJ10sICdlbicpO1xuICAgIH1cbiAgICByZXR1cm4gJ2VuJztcbiAgfSxcbiAgZ2V0RGF0ZUZvcm1hdDogKGdyaWQsIG9jVXNlclN0YXRlKSA9PiB7XG4gICAgaWYgKGdyaWQuZGF0ZUZvcm1hdCAmJiB0eXBlb2YgZ3JpZC5sYW5ndWFnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBncmlkLmRhdGVGb3JtYXQudG9VcHBlckNhc2UoKTtcbiAgICB9XG4gICAgaWYgKG9jVXNlclN0YXRlKSB7XG4gICAgICByZXR1cm4gb2NVc2VyU3RhdGUuZ2V0SW4oWydsb2NhbGVGb3JtYXQnLCAnZGF0ZUZvcm1hdCddLCAnTCcpO1xuICAgIH1cbiAgICByZXR1cm4gJ0wnO1xuICB9LFxuICBnZXRUaG91c2FuZFNlcGFyYXRvcjogKGdyaWQsIG9jVXNlclN0YXRlKSA9PiB7XG4gICAgaWYgKGdyaWQudGhvdXNhbmRTZXBhcmF0b3IgJiYgdHlwZW9mIGdyaWQubGFuZ3VhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZ3JpZC50aG91c2FuZFNlcGFyYXRvcjtcbiAgICB9XG4gICAgaWYgKG9jVXNlclN0YXRlKSB7XG4gICAgICByZXR1cm4gb2NVc2VyU3RhdGUuZ2V0SW4oWydsb2NhbGVGb3JtYXQnLCAndGhvdXNhbmRTZXBhcmF0b3InXSwgJycpO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH0sXG4gIGdldERlY2ltYWxTZXBhcmF0b3I6IChncmlkLCBvY1VzZXJTdGF0ZSkgPT4ge1xuICAgIGlmIChncmlkLmRlY2ltYWxTZXBhcmF0b3IgJiYgdHlwZW9mIGdyaWQubGFuZ3VhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZ3JpZC5kZWNpbWFsU2VwYXJhdG9yO1xuICAgIH1cbiAgICBpZiAob2NVc2VyU3RhdGUpIHtcbiAgICAgIHJldHVybiBvY1VzZXJTdGF0ZS5nZXRJbihbJ2xvY2FsZUZvcm1hdCcsICdkZWNpbWFsU2VwYXJhdG9yJ10sICcuJyk7XG4gICAgfVxuICAgIHJldHVybiAnLic7XG4gIH0sXG4gIG5vcm1hbGl6ZUZpbHRlcmluZ0RhdGE6IChmaWx0ZXJpbmdEYXRhKSA9PiB7XG4gICAgbGV0IG5ld0ZpbHRlcmluZ0RhdGEgPSBNYXAoeyBpc0ZpbHRlcmluZzogZmFsc2UgfSk7XG4gICAgaWYgKCFmaWx0ZXJpbmdEYXRhKSByZXR1cm4gbmV3RmlsdGVyaW5nRGF0YTtcblxuICAgIGNvbnN0IG9sZEZpbHRlcmluZ0RhdGEgPSBNYXAuaXNNYXAoZmlsdGVyaW5nRGF0YSkgPyBmaWx0ZXJpbmdEYXRhIDogZnJvbUpTKGZpbHRlcmluZ0RhdGEpO1xuICAgIGNvbnN0IGlzRmlsdGVyaW5nID0gb2xkRmlsdGVyaW5nRGF0YS5nZXQoJ2lzRmlsdGVyaW5nJywgZmFsc2UpO1xuICAgIGNvbnN0IGZpbHRlckRhdGEgPSBvbGRGaWx0ZXJpbmdEYXRhLmdldCgnZmlsdGVyRGF0YScsIG51bGwpO1xuXG4gICAgaWYgKGlzRmlsdGVyaW5nICYmIGZpbHRlckRhdGEgJiYgTWFwLmlzTWFwKGZpbHRlckRhdGEpKSB7XG4gICAgICBuZXdGaWx0ZXJpbmdEYXRhID0gbmV3RmlsdGVyaW5nRGF0YVxuICAgICAgICAuc2V0KCdpc0ZpbHRlcmluZycsIHRydWUpXG4gICAgICAgIC5zZXQoJ2ZpbHRlckRhdGEnLCBmaWx0ZXJEYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3RmlsdGVyaW5nRGF0YTtcbiAgfSxcbn07XG4iXX0=