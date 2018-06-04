'use strict';

exports.__esModule = true;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _isNaN = require('lodash/isNaN');

var _isNaN2 = _interopRequireDefault(_isNaN);

var _util = require('util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getColumnKey = function getColumnKey(col) {
  return col.columnKey || col.valueKeyPath.join('/');
}; /* eslint-disable no-nested-ternary */


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
          if ((0, _moment2.default)(val, dateFormat, true).isValid()) {
            return _moment2.default.utc(filterVal, dateFormat).isSame(_moment2.default.utc(val, dateFormat), 'day');
          }
          if ((0, _moment2.default)(val).isValid()) {
            return _moment2.default.utc(filterVal, dateFormat).isSame(val, 'day');
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
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC51dGlscy5qcyJdLCJuYW1lcyI6WyJnZXRDb2x1bW5LZXkiLCJjb2wiLCJjb2x1bW5LZXkiLCJ2YWx1ZUtleVBhdGgiLCJqb2luIiwiZ2V0VmlzaWJsZUNvbHVtbnMiLCJjb2xzIiwiaGlkZGVuQ29sdW1ucyIsImNvbHVtbk9yZGVyIiwib3JkZXJlZENvbHVtbkxpc3QiLCJmb3JFYWNoIiwiaSIsImNvbE9yZGVySWR4IiwiaW5kZXhPZiIsImRlZmF1bHRIaWRkZW4iLCJpc0hpZGRlbiIsIm9yZGVyIiwicHVzaCIsInNvcnQiLCJhIiwiYiIsIm1hcCIsIml0ZW0iLCJnZXRDb2x1bW5EZWZhdWx0VmFsdWVzIiwiY29sdW1uRGVmYXVsdFZhbHVlcyIsImRlZmF1bHRWYWx1ZSIsInVuZGVmaW5lZCIsImdldENlbGxTdHlsZUJ5Q29sIiwiYWxpZ24iLCJ0ZXh0QWxpZ24iLCJjb21wb25lbnRUeXBlIiwidmFsdWVUeXBlIiwiaXNTb3J0YWJsZSIsInNvcnRWYWx1ZUdldHRlciIsImRpc2FibGVTb3J0aW5nIiwiZ2V0U29ydENvbXBhcmF0b3IiLCJzb3J0Q29tcGFyYXRvciIsImxvY2FsZUNvbXBhcmUiLCJEYXRlIiwiZ2V0U29ydFZhbHVlR2V0dGVyIiwiZGF0YSIsImdldEluIiwiZ2V0VmFsdWVFbXB0eUNoZWNrZXIiLCJ2YWx1ZUVtcHR5Q2hlY2tlciIsInZhbCIsImdldEZpbHRlck1hdGNoZXIiLCJkYXRlRm9ybWF0IiwiZmlsdGVyTWF0Y2hlciIsImZpbHRlclZhbCIsInBhcnNlSW50IiwicGFyc2VGbG9hdCIsInJlcGxhY2UiLCJpc1ZhbGlkIiwibW9tZW50IiwidXRjIiwiaXNTYW1lIiwiUmVnRXhwIiwidGVzdCIsImxvYWRTZWxlY3RlZEl0ZW1zIiwiZ3JpZCIsInNlc3Npb25JdGVtIiwic2Vzc2lvblN0b3JhZ2UiLCJnZXRJdGVtIiwiaWQiLCJkaXNhYmxlUmVtZW1iZXJTZWxlY3RlZEl0ZW1zIiwiSlNPTiIsInBhcnNlIiwiZSIsImNvbnNvbGUiLCJlcnJvciIsImxvYWRHcmlkQ29uZmlnIiwiY29uZmlnU3RvcmFnZSIsInNvcnRpbmdEYXRhIiwiZmlsdGVyRGF0YSIsImlzRmlsdGVyaW5nRGF0YSIsImxvY2FsU3RvcmFnZSIsImxvYWRlZENvbmZpZyIsImlzRmlsdGVyaW5nIiwibG9hZCIsImRpc2FibGVSZW1lbWJlcklzRmlsdGVyaW5nIiwiZGVmYXVsdFNob3dGaWx0ZXJpbmdSb3ciLCJoaWRkZW5Db2x1bW5zSnNvbiIsImNvbHVtbk9yZGVySnNvbiIsImNvbmZpZyIsInZpc2libGVDb2x1bW5zIiwiZmlsdGVyaW5nRGF0YSIsImNvbHVtbldpZHRocyIsImRpc2FibGVSZW1lbWJlckNvbHVtbldpZHRocyIsImRpc2FibGVSZW1lbWJlclNvcnREYXRhIiwiZGlzYWJsZVJlbWVtYmVyRmlsdGVEYXRhIiwiZGVmYXVsdFNvcnRDb2x1bW4iLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwiZGVmYXVsdFNvcnRPcmRlciIsInNhdmVTZWxlY3RlZEl0ZW1zIiwic2VsZWN0ZWRJdGVtcyIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJzYXZlQ29sdW1uV2lkdGhzIiwic2F2ZSIsInNhdmVDb2x1bW5TZXR0aW5ncyIsInNhdmVTb3J0RGF0YSIsInNhdmVGaWx0ZXJEYXRhIiwic2F2ZUlzRmlsdGVyaW5nIiwicmVtb3ZlSXRlbSIsImNoZWNrR3JpZFBhcmFtIiwiZ3JpZFBhcmFtIiwiRXJyb3IiLCJpZEtleVBhdGgiLCJjaGVja0NvbHVtbnNQYXJhbSIsImNvbHVtbnNQYXJhbSIsImdldExhbmd1YWdlIiwib2NVc2VyU3RhdGUiLCJsYW5ndWFnZSIsImdldERhdGVGb3JtYXQiLCJ0b1VwcGVyQ2FzZSIsImdldFRob3VzYW5kU2VwYXJhdG9yIiwidGhvdXNhbmRTZXBhcmF0b3IiLCJnZXREZWNpbWFsU2VwYXJhdG9yIiwiZGVjaW1hbFNlcGFyYXRvciJdLCJtYXBwaW5ncyI6Ijs7OztBQUNBOzs7O0FBQ0E7Ozs7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QUNEO0FBQ0QsUUFBSVAsV0FBSixFQUFpQjtBQUNmLGFBQU9BLFlBQVl2RSxLQUFaLENBQWtCLENBQUMsY0FBRCxFQUFpQixrQkFBakIsQ0FBbEIsRUFBd0QsR0FBeEQsQ0FBUDtBQUNEO0FBQ0QsV0FBTyxHQUFQO0FBQ0Q7QUF4VFksQyIsImZpbGUiOiJkYXRhZ3JpZC51dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLW5lc3RlZC10ZXJuYXJ5ICovXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgaXNOYU4gZnJvbSAnbG9kYXNoL2lzTmFOJztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICd1dGlsJztcblxuY29uc3QgZ2V0Q29sdW1uS2V5ID0gY29sID0+IChcbiAgY29sLmNvbHVtbktleSB8fCBjb2wudmFsdWVLZXlQYXRoLmpvaW4oJy8nKVxuKTtcblxuY29uc3QgZ2V0VmlzaWJsZUNvbHVtbnMgPSAoY29scywgaGlkZGVuQ29sdW1ucyA9IFtdLCBjb2x1bW5PcmRlciA9IFtdKSA9PiB7XG4gIGNvbnN0IG9yZGVyZWRDb2x1bW5MaXN0ID0gW107XG4gIGNvbHMuZm9yRWFjaCgoY29sLCBpKSA9PiB7XG4gICAgY29uc3QgY29sdW1uS2V5ID0gZ2V0Q29sdW1uS2V5KGNvbCk7XG4gICAgY29uc3QgY29sT3JkZXJJZHggPSBjb2x1bW5PcmRlci5pbmRleE9mKGNvbHVtbktleSk7XG4gICAgY29uc3QgZGVmYXVsdEhpZGRlbiA9IGNvbC5pc0hpZGRlbiAmJiBjb2xPcmRlcklkeCA9PT0gLTE7XG4gICAgaWYgKGRlZmF1bHRIaWRkZW4gfHwgaGlkZGVuQ29sdW1ucy5pbmRleE9mKGNvbHVtbktleSkgPiAtMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBvcmRlciA9IGNvbE9yZGVySWR4ICE9PSAtMSA/IGNvbE9yZGVySWR4IDogKGkgKyAxKTtcbiAgICBvcmRlcmVkQ29sdW1uTGlzdC5wdXNoKHtcbiAgICAgIGNvbHVtbktleSxcbiAgICAgIG9yZGVyLFxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIG9yZGVyZWRDb2x1bW5MaXN0LnNvcnQoKGEsIGIpID0+IChhLm9yZGVyIC0gYi5vcmRlcikpLm1hcChpdGVtID0+IGl0ZW0uY29sdW1uS2V5KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZ2V0Q29sdW1uS2V5LFxuICBnZXRDb2x1bW5EZWZhdWx0VmFsdWVzOiAoY29scykgPT4ge1xuICAgIGNvbnN0IGNvbHVtbkRlZmF1bHRWYWx1ZXMgPSB7fTtcbiAgICBjb2xzLmZvckVhY2goKGNvbCkgPT4ge1xuICAgICAgaWYgKGNvbC5kZWZhdWx0VmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb2x1bW5EZWZhdWx0VmFsdWVzW2dldENvbHVtbktleShjb2wpXSA9IGNvbC5kZWZhdWx0VmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGNvbHVtbkRlZmF1bHRWYWx1ZXM7XG4gIH0sXG4gIGdldENlbGxTdHlsZUJ5Q29sOiAoY29sKSA9PiB7XG4gICAgaWYgKGNvbC5hbGlnbikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGV4dEFsaWduOiBjb2wuYWxpZ24sXG4gICAgICB9O1xuICAgIH1cbiAgICAvLyBObyBkZWZhdWx0IGFsaWduIGlmIGNvbXBvbmVudCBpcyBzZWxlY3RcbiAgICAvLyBCZWNhdXNlIHJlbmRlcmVkIGRhdGEgaXMgbW9zdCBsaWtlbHkgdGV4dFxuICAgIC8vIEV2ZW4gaWYgdmFsdWVUeXBlIGlzIG51bWJlclxuICAgIGlmIChjb2wuY29tcG9uZW50VHlwZSA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgc3dpdGNoIChjb2wudmFsdWVUeXBlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdGV4dEFsaWduOiAncmlnaHQnLFxuICAgICAgICB9O1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgfSxcbiAgaXNTb3J0YWJsZTogY29sID0+IChcbiAgICBjb2wudmFsdWVUeXBlICYmXG4gICAgKGNvbC5zb3J0VmFsdWVHZXR0ZXIgfHwgY29sLnZhbHVlS2V5UGF0aCkgJiZcbiAgICAhY29sLmRpc2FibGVTb3J0aW5nXG4gICksXG4gIGdldFNvcnRDb21wYXJhdG9yOiAoY29sKSA9PiB7XG4gICAgaWYgKGNvbC5zb3J0Q29tcGFyYXRvcikge1xuICAgICAgcmV0dXJuIGNvbC5zb3J0Q29tcGFyYXRvcjtcbiAgICB9XG4gICAgc3dpdGNoIChjb2wudmFsdWVUeXBlKSB7XG4gICAgICBjYXNlICd0ZXh0JzpcbiAgICAgICAgcmV0dXJuIChhLCBiKSA9PiAoYS5sb2NhbGVDb21wYXJlID8gYS5sb2NhbGVDb21wYXJlKGIpIDogMSk7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICByZXR1cm4gKGEsIGIpID0+IChhIC0gYik7XG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICAgIHJldHVybiAoYSwgYikgPT4gKGEgLSBiKTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICByZXR1cm4gKGEsIGIpID0+IChhID09PSBiID8gMCA6IChhID8gLTEgOiAxKSk7XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgcmV0dXJuIChhLCBiKSA9PiAobmV3IERhdGUoYSkgLSBuZXcgRGF0ZShiKSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gKGEsIGIpID0+IChhLmxvY2FsZUNvbXBhcmUgPyBhLmxvY2FsZUNvbXBhcmUoYikgOiAxKTtcbiAgICB9XG4gIH0sXG4gIGdldFNvcnRWYWx1ZUdldHRlcjogKGNvbCkgPT4ge1xuICAgIGlmIChjb2wuc29ydFZhbHVlR2V0dGVyKSB7XG4gICAgICByZXR1cm4gY29sLnNvcnRWYWx1ZUdldHRlcjtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGEgPT4gZGF0YS5nZXRJbihjb2wudmFsdWVLZXlQYXRoKTtcbiAgfSxcbiAgZ2V0VmFsdWVFbXB0eUNoZWNrZXI6IChjb2wpID0+IHtcbiAgICBpZiAoY29sLnZhbHVlRW1wdHlDaGVja2VyKSB7XG4gICAgICByZXR1cm4gY29sLnZhbHVlRW1wdHlDaGVja2VyO1xuICAgIH1cbiAgICBzd2l0Y2ggKGNvbC52YWx1ZVR5cGUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIHJldHVybiB2YWwgPT4gKFxuICAgICAgICAgIHZhbCA9PT0gJycgfHxcbiAgICAgICAgICBpc05hTih2YWwpIHx8XG4gICAgICAgICAgdmFsID09PSBudWxsIHx8XG4gICAgICAgICAgdmFsID09PSB1bmRlZmluZWRcbiAgICAgICAgKTtcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgICAgcmV0dXJuIHZhbCA9PiAoXG4gICAgICAgICAgdmFsID09PSAnJyB8fFxuICAgICAgICAgIGlzTmFOKHZhbCkgfHxcbiAgICAgICAgICB2YWwgPT09IG51bGwgfHxcbiAgICAgICAgICB2YWwgPT09IHVuZGVmaW5lZFxuICAgICAgICApO1xuICAgICAgY2FzZSAndGV4dCc6XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgY2FzZSAnc2VsZWN0JzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB2YWwgPT4gdmFsID09PSAnJyB8fCB2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQ7XG4gICAgfVxuICB9LFxuICBnZXRGaWx0ZXJNYXRjaGVyOiAoY29sLCBkYXRlRm9ybWF0KSA9PiB7XG4gICAgaWYgKGNvbC5maWx0ZXJNYXRjaGVyKSB7XG4gICAgICByZXR1cm4gY29sLmZpbHRlck1hdGNoZXI7XG4gICAgfVxuICAgIHN3aXRjaCAoY29sLnZhbHVlVHlwZSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgcmV0dXJuICh2YWwsIGZpbHRlclZhbCkgPT4gcGFyc2VJbnQodmFsLCAxMCkgPT09IHBhcnNlSW50KGZpbHRlclZhbCwgMTApO1xuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgICByZXR1cm4gKHZhbCwgZmlsdGVyVmFsKSA9PiBwYXJzZUZsb2F0KGZpbHRlclZhbC5yZXBsYWNlKCcsJywgJy4nKSkgPT09IHZhbDtcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICByZXR1cm4gKHZhbCwgZmlsdGVyVmFsKSA9PiB7XG4gICAgICAgICAgaWYgKG1vbWVudCh2YWwsIGRhdGVGb3JtYXQsIHRydWUpLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG1vbWVudC51dGMoZmlsdGVyVmFsLCBkYXRlRm9ybWF0KS5pc1NhbWUobW9tZW50LnV0Yyh2YWwsIGRhdGVGb3JtYXQpLCAnZGF5Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChtb21lbnQodmFsKS5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBtb21lbnQudXRjKGZpbHRlclZhbCwgZGF0ZUZvcm1hdCkuaXNTYW1lKHZhbCwgJ2RheScpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH07XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIGNhc2UgJ3NlbGVjdCc6XG4gICAgICAgIHJldHVybiAodmFsLCBmaWx0ZXJWYWwpID0+IHZhbCA9PT0gZmlsdGVyVmFsO1xuICAgICAgY2FzZSAndGV4dCc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gKHZhbCwgZmlsdGVyVmFsKSA9PiAobmV3IFJlZ0V4cChmaWx0ZXJWYWwsICdpJykpLnRlc3QodmFsKTtcbiAgICB9XG4gIH0sXG4gIGxvYWRTZWxlY3RlZEl0ZW1zOiAoZ3JpZCkgPT4ge1xuICAgIGNvbnN0IHNlc3Npb25JdGVtID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShgb2NfZ3JpZF9zZWxlY3RlZEl0ZW1zXyR7Z3JpZC5pZH1gKTtcbiAgICBpZiAoc2Vzc2lvbkl0ZW0gJiYgIWdyaWQuZGlzYWJsZVJlbWVtYmVyU2VsZWN0ZWRJdGVtcykge1xuICAgICAgdHJ5IHsgcmV0dXJuIEpTT04ucGFyc2Uoc2Vzc2lvbkl0ZW0pOyB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIHNlbGVjdGVkSXRlbXMgZnJvbSBzZXNzaW9uU3RvcmFnZScsIGUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH0sXG4gIGxvYWRHcmlkQ29uZmlnOiAoZ3JpZCwgY29scykgPT4ge1xuICAgIGNvbnN0IGNvbmZpZ1N0b3JhZ2UgPSBncmlkLmNvbmZpZ1N0b3JhZ2UgfHwge307XG4gICAgY29uc3Qgc29ydGluZ0RhdGEgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX3NvcnRpbmdfJHtncmlkLmlkfWApO1xuICAgIGNvbnN0IGZpbHRlckRhdGEgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX2ZpbHRlcmluZ18ke2dyaWQuaWR9YCk7XG4gICAgY29uc3QgaXNGaWx0ZXJpbmdEYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfaXNGaWx0ZXJpbmdfJHtncmlkLmlkfWApO1xuICAgIGxldCBsb2FkZWRDb25maWcgPSB7fTtcbiAgICBsZXQgaGlkZGVuQ29sdW1ucztcbiAgICBsZXQgY29sdW1uT3JkZXI7XG4gICAgbGV0IGlzRmlsdGVyaW5nID0gZmFsc2U7XG5cbiAgICBpZiAoaXNGdW5jdGlvbihjb25maWdTdG9yYWdlLmxvYWQpKSB7XG4gICAgICBsb2FkZWRDb25maWcgPSBjb25maWdTdG9yYWdlLmxvYWQoKTtcbiAgICB9XG5cbiAgICBpZiAoaXNGaWx0ZXJpbmdEYXRhKSB7XG4gICAgICBpZiAoIWdyaWQuZGlzYWJsZVJlbWVtYmVySXNGaWx0ZXJpbmcpIHtcbiAgICAgICAgdHJ5IHsgaXNGaWx0ZXJpbmcgPSBKU09OLnBhcnNlKGlzRmlsdGVyaW5nRGF0YSk7IH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIGlzRmlsdGVyaW5nRGF0YSBmcm9tIGxvY2FsU3RvcmFnZScsIGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChncmlkLmRlZmF1bHRTaG93RmlsdGVyaW5nUm93KSB7XG4gICAgICBpc0ZpbHRlcmluZyA9IHRydWU7XG4gICAgfVxuICAgIGlmIChsb2FkZWRDb25maWcuaGlkZGVuQ29sdW1ucykge1xuICAgICAgaGlkZGVuQ29sdW1ucyA9IGxvYWRlZENvbmZpZy5oaWRkZW5Db2x1bW5zOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGhpZGRlbkNvbHVtbnNKc29uID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfaGlkZGVuQ29sdW1uc18ke2dyaWQuaWR9YCk7XG4gICAgICBpZiAoaGlkZGVuQ29sdW1uc0pzb24pIHtcbiAgICAgICAgdHJ5IHsgaGlkZGVuQ29sdW1ucyA9IEpTT04ucGFyc2UoaGlkZGVuQ29sdW1uc0pzb24pOyB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhZ3JpZDogZXJyb3IgcGFyc2luZyBoaWRkZW5Db2x1bW5zIGZyb20gbG9jYWxTdG9yYWdlJywgZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGxvYWRlZENvbmZpZy5jb2x1bW5PcmRlcikge1xuICAgICAgY29sdW1uT3JkZXIgPSBsb2FkZWRDb25maWcuY29sdW1uT3JkZXI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgY29sdW1uT3JkZXJKc29uID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfY29sdW1uT3JkZXJfJHtncmlkLmlkfWApO1xuICAgICAgaWYgKGNvbHVtbk9yZGVySnNvbikge1xuICAgICAgICB0cnkgeyBjb2x1bW5PcmRlciA9IEpTT04ucGFyc2UoY29sdW1uT3JkZXJKc29uKTsgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgY29sdW1uT3JkZXIgZnJvbSBsb2NhbFN0b3JhZ2UnLCBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICB2aXNpYmxlQ29sdW1uczogZ2V0VmlzaWJsZUNvbHVtbnMoY29scywgaGlkZGVuQ29sdW1ucywgY29sdW1uT3JkZXIpLFxuICAgICAgZmlsdGVyaW5nRGF0YToge1xuICAgICAgICBpc0ZpbHRlcmluZyxcbiAgICAgIH0sXG4gICAgfTtcbiAgICBpZiAobG9hZGVkQ29uZmlnLmNvbHVtbldpZHRocykge1xuICAgICAgY29uZmlnLmNvbHVtbldpZHRocyA9IGxvYWRlZENvbmZpZy5jb2x1bW5XaWR0aHM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNvbHVtbldpZHRocyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX2NvbHVtbldpZHRoc18ke2dyaWQuaWR9YCk7XG4gICAgICBpZiAoY29sdW1uV2lkdGhzICYmICFncmlkLmRpc2FibGVSZW1lbWJlckNvbHVtbldpZHRocykge1xuICAgICAgICB0cnkgeyBjb25maWcuY29sdW1uV2lkdGhzID0gSlNPTi5wYXJzZShjb2x1bW5XaWR0aHMpOyB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhZ3JpZDogZXJyb3IgcGFyc2luZyBjb2x1bW5XaWR0aHMgZnJvbSBsb2NhbFN0b3JhZ2UnLCBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc29ydGluZ0RhdGEgJiYgIWdyaWQuZGlzYWJsZVJlbWVtYmVyU29ydERhdGEpIHtcbiAgICAgIHRyeSB7IGNvbmZpZy5zb3J0aW5nRGF0YSA9IEpTT04ucGFyc2Uoc29ydGluZ0RhdGEpOyB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIHNvcnRpbmdEYXRhIGZyb20gc2Vzc2lvblN0b3JhZ2UnLCBlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGZpbHRlckRhdGEgJiYgaXNGaWx0ZXJpbmcgJiYgIWdyaWQuZGlzYWJsZVJlbWVtYmVyRmlsdGVEYXRhKSB7XG4gICAgICB0cnkgeyBjb25maWcuZmlsdGVyaW5nRGF0YS5maWx0ZXJEYXRhID0gSlNPTi5wYXJzZShmaWx0ZXJEYXRhKTsgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhZ3JpZDogZXJyb3IgcGFyc2luZyBmaWx0ZXJEYXRhIGZyb20gc2Vzc2lvblN0b3JhZ2UnLCBlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy5zb3J0aW5nRGF0YSAmJiBncmlkLmRlZmF1bHRTb3J0Q29sdW1uKSB7XG4gICAgICBjb25maWcuc29ydGluZ0RhdGEgPSB7XG4gICAgICAgIHNvcnRDb2x1bW46IGdyaWQuZGVmYXVsdFNvcnRDb2x1bW4sXG4gICAgICAgIHNvcnRPcmRlcjogZ3JpZC5kZWZhdWx0U29ydE9yZGVyIHx8ICdhc2MnLFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbmZpZztcbiAgfSxcbiAgc2F2ZVNlbGVjdGVkSXRlbXM6IChncmlkLCBzZWxlY3RlZEl0ZW1zKSA9PiB7XG4gICAgaWYgKGdyaWQuZGlzYWJsZVJlbWVtYmVyU2VsZWN0ZWRJdGVtcykgcmV0dXJuIGZhbHNlO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oYG9jX2dyaWRfc2VsZWN0ZWRJdGVtc18ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoc2VsZWN0ZWRJdGVtcyB8fCBbXSkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBzYXZlQ29sdW1uV2lkdGhzOiAoZ3JpZCwgY29sdW1uV2lkdGhzKSA9PiB7XG4gICAgaWYgKGdyaWQuZGlzYWJsZVJlbWVtYmVyQ29sdW1uV2lkdGhzKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFjb2x1bW5XaWR0aHMpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoZ3JpZC5jb25maWdTdG9yYWdlICYmIGlzRnVuY3Rpb24oZ3JpZC5jb25maWdTdG9yYWdlLnNhdmUpKSB7XG4gICAgICBncmlkLmNvbmZpZ1N0b3JhZ2Uuc2F2ZSh7IGNvbHVtbldpZHRocyB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYG9jX2dyaWRfY29sdW1uV2lkdGhzXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShjb2x1bW5XaWR0aHMpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIHNhdmVDb2x1bW5TZXR0aW5nczogKGdyaWQsIGhpZGRlbkNvbHVtbnMsIGNvbHVtbk9yZGVyKSA9PiB7XG4gICAgaWYgKCFoaWRkZW5Db2x1bW5zIHx8ICFjb2x1bW5PcmRlcikgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChncmlkLmNvbmZpZ1N0b3JhZ2UgJiYgaXNGdW5jdGlvbihncmlkLmNvbmZpZ1N0b3JhZ2Uuc2F2ZSkpIHtcbiAgICAgIGdyaWQuY29uZmlnU3RvcmFnZS5zYXZlKHsgaGlkZGVuQ29sdW1ucywgY29sdW1uT3JkZXIgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX2hpZGRlbkNvbHVtbnNfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KGhpZGRlbkNvbHVtbnMpKTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX2NvbHVtbk9yZGVyXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShjb2x1bW5PcmRlcikpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgc2F2ZVNvcnREYXRhOiAoZ3JpZCwgc29ydGluZ0RhdGEpID0+IHtcbiAgICBpZiAoZ3JpZC5kaXNhYmxlUmVtZW1iZXJTb3J0RGF0YSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghc29ydGluZ0RhdGEpIHJldHVybiBmYWxzZTtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX3NvcnRpbmdfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KHNvcnRpbmdEYXRhKSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIHNhdmVGaWx0ZXJEYXRhOiAoZ3JpZCwgZmlsdGVyRGF0YSkgPT4ge1xuICAgIGlmIChncmlkLmRpc2FibGVSZW1lbWJlckZpbHRlRGF0YSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghZmlsdGVyRGF0YSkgcmV0dXJuIGZhbHNlO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oYG9jX2dyaWRfZmlsdGVyaW5nXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShmaWx0ZXJEYXRhKSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIHNhdmVJc0ZpbHRlcmluZzogKGdyaWQsIGlzRmlsdGVyaW5nKSA9PiB7XG4gICAgaWYgKGdyaWQuZGlzYWJsZVJlbWVtYmVySXNGaWx0ZXJpbmcpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoaXNGaWx0ZXJpbmcgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZhbHNlO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX2lzRmlsdGVyaW5nXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShpc0ZpbHRlcmluZykpO1xuICAgIGlmICghaXNGaWx0ZXJpbmcpIHtcbiAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oYG9jX2dyaWRfZmlsdGVyaW5nXyR7Z3JpZC5pZH1gKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIC8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbiAgY2hlY2tHcmlkUGFyYW06IChncmlkUGFyYW0pID0+IHtcbiAgICBpZiAoZ3JpZFBhcmFtKSB7XG4gICAgICBpZiAoIWdyaWRQYXJhbS5pZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tHcmlkXSBJbnZhbGlkIGBncmlkLmlkYCBwYXJhbWV0ZXIsIHVwZGF0ZSBhY3Rpb24gcGFyYW1ldGVycyB0byBuZXcgZm9ybWF0IScpO1xuICAgICAgfVxuICAgICAgaWYgKCFncmlkUGFyYW0uaWRLZXlQYXRoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignW0dyaWRdIEludmFsaWQgYGdyaWQuaWRLZXlQYXRoYCBwYXJhbWV0ZXIsIHVwZGF0ZSBhY3Rpb24gcGFyYW1ldGVycyB0byBuZXcgZm9ybWF0IScpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tHcmlkXSBJbnZhbGlkIGBncmlkYCBwYXJhbWV0ZXIsIHVwZGF0ZSBhY3Rpb24gcGFyYW1ldGVycyB0byBuZXcgZm9ybWF0IScpO1xuICAgIH1cbiAgfSxcbiAgY2hlY2tDb2x1bW5zUGFyYW06IChjb2x1bW5zUGFyYW0pID0+IHtcbiAgICBpZiAoIWNvbHVtbnNQYXJhbSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdbR3JpZF0gSW52YWxpZCBgY29sdW1uc2AgcGFyYW1ldGVyLCB1cGRhdGUgYWN0aW9uIHBhcmFtZXRlcnMgdG8gbmV3IGZvcm1hdCEnKTtcbiAgICB9XG4gIH0sXG4gIC8vIExvY2FsZSBnZXR0ZXJzLCBzdXBwb3J0IGdyaWQgcGFyYW0gb3IgdXNlciBzdGF0ZSB1c2VkIGluIE9DIGFwcGxpY2F0aW9uc1xuICBnZXRMYW5ndWFnZTogKGdyaWQsIG9jVXNlclN0YXRlKSA9PiB7XG4gICAgaWYgKGdyaWQubGFuZ3VhZ2UgJiYgdHlwZW9mIGdyaWQubGFuZ3VhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZ3JpZC5sYW5ndWFnZTtcbiAgICB9XG4gICAgaWYgKG9jVXNlclN0YXRlKSB7XG4gICAgICByZXR1cm4gb2NVc2VyU3RhdGUuZ2V0SW4oWyd1c2VyJywgJ2xhbmd1YWdlJ10sICdlbicpO1xuICAgIH1cbiAgICByZXR1cm4gJ2VuJztcbiAgfSxcbiAgZ2V0RGF0ZUZvcm1hdDogKGdyaWQsIG9jVXNlclN0YXRlKSA9PiB7XG4gICAgaWYgKGdyaWQuZGF0ZUZvcm1hdCAmJiB0eXBlb2YgZ3JpZC5sYW5ndWFnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBncmlkLmRhdGVGb3JtYXQudG9VcHBlckNhc2UoKTtcbiAgICB9XG4gICAgaWYgKG9jVXNlclN0YXRlKSB7XG4gICAgICByZXR1cm4gb2NVc2VyU3RhdGUuZ2V0SW4oWydsb2NhbGVGb3JtYXQnLCAnZGF0ZUZvcm1hdCddLCAnTCcpO1xuICAgIH1cbiAgICByZXR1cm4gJ0wnO1xuICB9LFxuICBnZXRUaG91c2FuZFNlcGFyYXRvcjogKGdyaWQsIG9jVXNlclN0YXRlKSA9PiB7XG4gICAgaWYgKGdyaWQudGhvdXNhbmRTZXBhcmF0b3IgJiYgdHlwZW9mIGdyaWQubGFuZ3VhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZ3JpZC50aG91c2FuZFNlcGFyYXRvcjtcbiAgICB9XG4gICAgaWYgKG9jVXNlclN0YXRlKSB7XG4gICAgICByZXR1cm4gb2NVc2VyU3RhdGUuZ2V0SW4oWydsb2NhbGVGb3JtYXQnLCAndGhvdXNhbmRTZXBhcmF0b3InXSwgJycpO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH0sXG4gIGdldERlY2ltYWxTZXBhcmF0b3I6IChncmlkLCBvY1VzZXJTdGF0ZSkgPT4ge1xuICAgIGlmIChncmlkLmRlY2ltYWxTZXBhcmF0b3IgJiYgdHlwZW9mIGdyaWQubGFuZ3VhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZ3JpZC5kZWNpbWFsU2VwYXJhdG9yO1xuICAgIH1cbiAgICBpZiAob2NVc2VyU3RhdGUpIHtcbiAgICAgIHJldHVybiBvY1VzZXJTdGF0ZS5nZXRJbihbJ2xvY2FsZUZvcm1hdCcsICdkZWNpbWFsU2VwYXJhdG9yJ10sICcuJyk7XG4gICAgfVxuICAgIHJldHVybiAnLic7XG4gIH0sXG59O1xuIl19