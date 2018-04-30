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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC51dGlscy5qcyJdLCJuYW1lcyI6WyJnZXRDb2x1bW5LZXkiLCJjb2wiLCJjb2x1bW5LZXkiLCJ2YWx1ZUtleVBhdGgiLCJqb2luIiwiZ2V0VmlzaWJsZUNvbHVtbnMiLCJjb2xzIiwiaGlkZGVuQ29sdW1ucyIsImNvbHVtbk9yZGVyIiwib3JkZXJlZENvbHVtbkxpc3QiLCJmb3JFYWNoIiwiaSIsImNvbE9yZGVySWR4IiwiaW5kZXhPZiIsImRlZmF1bHRIaWRkZW4iLCJpc0hpZGRlbiIsIm9yZGVyIiwicHVzaCIsInNvcnQiLCJhIiwiYiIsIm1hcCIsIml0ZW0iLCJnZXRDb2x1bW5EZWZhdWx0VmFsdWVzIiwiY29sdW1uRGVmYXVsdFZhbHVlcyIsImRlZmF1bHRWYWx1ZSIsInVuZGVmaW5lZCIsImdldENlbGxTdHlsZUJ5Q29sIiwiYWxpZ24iLCJ0ZXh0QWxpZ24iLCJjb21wb25lbnRUeXBlIiwidmFsdWVUeXBlIiwiaXNTb3J0YWJsZSIsInNvcnRWYWx1ZUdldHRlciIsImRpc2FibGVTb3J0aW5nIiwiZ2V0U29ydENvbXBhcmF0b3IiLCJzb3J0Q29tcGFyYXRvciIsImxvY2FsZUNvbXBhcmUiLCJEYXRlIiwiZ2V0U29ydFZhbHVlR2V0dGVyIiwiZGF0YSIsImdldEluIiwiZ2V0VmFsdWVFbXB0eUNoZWNrZXIiLCJ2YWx1ZUVtcHR5Q2hlY2tlciIsInZhbCIsImdldEZpbHRlck1hdGNoZXIiLCJkYXRlRm9ybWF0IiwiZmlsdGVyTWF0Y2hlciIsImZpbHRlclZhbCIsInBhcnNlSW50IiwicGFyc2VGbG9hdCIsInJlcGxhY2UiLCJpc1ZhbGlkIiwidXRjIiwiaXNTYW1lIiwiUmVnRXhwIiwidGVzdCIsImxvYWRTZWxlY3RlZEl0ZW1zIiwiZ3JpZCIsInNlc3Npb25JdGVtIiwic2Vzc2lvblN0b3JhZ2UiLCJnZXRJdGVtIiwiaWQiLCJkaXNhYmxlUmVtZW1iZXJTZWxlY3RlZEl0ZW1zIiwiSlNPTiIsInBhcnNlIiwiZSIsImNvbnNvbGUiLCJlcnJvciIsImxvYWRHcmlkQ29uZmlnIiwiY29uZmlnU3RvcmFnZSIsInNvcnRpbmdEYXRhIiwiZmlsdGVyRGF0YSIsImlzRmlsdGVyaW5nRGF0YSIsImxvY2FsU3RvcmFnZSIsImxvYWRlZENvbmZpZyIsImlzRmlsdGVyaW5nIiwibG9hZCIsImRpc2FibGVSZW1lbWJlcklzRmlsdGVyaW5nIiwiZGVmYXVsdFNob3dGaWx0ZXJpbmdSb3ciLCJoaWRkZW5Db2x1bW5zSnNvbiIsImNvbHVtbk9yZGVySnNvbiIsImNvbmZpZyIsInZpc2libGVDb2x1bW5zIiwiZmlsdGVyaW5nRGF0YSIsImNvbHVtbldpZHRocyIsImRpc2FibGVSZW1lbWJlckNvbHVtbldpZHRocyIsImRpc2FibGVSZW1lbWJlclNvcnREYXRhIiwiZGlzYWJsZVJlbWVtYmVyRmlsdGVEYXRhIiwiZGVmYXVsdFNvcnRDb2x1bW4iLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwiZGVmYXVsdFNvcnRPcmRlciIsInNhdmVTZWxlY3RlZEl0ZW1zIiwic2VsZWN0ZWRJdGVtcyIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJzYXZlQ29sdW1uV2lkdGhzIiwic2F2ZSIsInNhdmVDb2x1bW5TZXR0aW5ncyIsInNhdmVTb3J0RGF0YSIsInNhdmVGaWx0ZXJEYXRhIiwic2F2ZUlzRmlsdGVyaW5nIiwicmVtb3ZlSXRlbSIsImNoZWNrR3JpZFBhcmFtIiwiZ3JpZFBhcmFtIiwiRXJyb3IiLCJpZEtleVBhdGgiLCJjaGVja0NvbHVtbnNQYXJhbSIsImNvbHVtbnNQYXJhbSIsImdldExhbmd1YWdlIiwib2NVc2VyU3RhdGUiLCJsYW5ndWFnZSIsImdldERhdGVGb3JtYXQiLCJ0b1VwcGVyQ2FzZSIsImdldFRob3VzYW5kU2VwYXJhdG9yIiwidGhvdXNhbmRTZXBhcmF0b3IiLCJnZXREZWNpbWFsU2VwYXJhdG9yIiwiZGVjaW1hbFNlcGFyYXRvciJdLCJtYXBwaW5ncyI6Ijs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztB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SVAsV0FBSixFQUFpQjtBQUNmLGFBQU9BLFlBQVl0RSxLQUFaLENBQWtCLENBQUMsY0FBRCxFQUFpQixrQkFBakIsQ0FBbEIsRUFBd0QsR0FBeEQsQ0FBUDtBQUNEO0FBQ0QsV0FBTyxHQUFQO0FBQ0Q7QUF4VFksQyIsImZpbGUiOiJkYXRhZ3JpZC51dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLW5lc3RlZC10ZXJuYXJ5ICovXHJcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuaW1wb3J0IGlzTmFOIGZyb20gJ2xvZGFzaC9pc05hTic7XHJcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICd1dGlsJztcclxuXHJcbmNvbnN0IGdldENvbHVtbktleSA9IGNvbCA9PiAoXHJcbiAgY29sLmNvbHVtbktleSB8fCBjb2wudmFsdWVLZXlQYXRoLmpvaW4oJy8nKVxyXG4pO1xyXG5cclxuY29uc3QgZ2V0VmlzaWJsZUNvbHVtbnMgPSAoY29scywgaGlkZGVuQ29sdW1ucyA9IFtdLCBjb2x1bW5PcmRlciA9IFtdKSA9PiB7XHJcbiAgY29uc3Qgb3JkZXJlZENvbHVtbkxpc3QgPSBbXTtcclxuICBjb2xzLmZvckVhY2goKGNvbCwgaSkgPT4ge1xyXG4gICAgY29uc3QgY29sdW1uS2V5ID0gZ2V0Q29sdW1uS2V5KGNvbCk7XHJcbiAgICBjb25zdCBjb2xPcmRlcklkeCA9IGNvbHVtbk9yZGVyLmluZGV4T2YoY29sdW1uS2V5KTtcclxuICAgIGNvbnN0IGRlZmF1bHRIaWRkZW4gPSBjb2wuaXNIaWRkZW4gJiYgY29sT3JkZXJJZHggPT09IC0xO1xyXG4gICAgaWYgKGRlZmF1bHRIaWRkZW4gfHwgaGlkZGVuQ29sdW1ucy5pbmRleE9mKGNvbHVtbktleSkgPiAtMSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBvcmRlciA9IGNvbE9yZGVySWR4ICE9PSAtMSA/IGNvbE9yZGVySWR4IDogKGkgKyAxKTtcclxuICAgIG9yZGVyZWRDb2x1bW5MaXN0LnB1c2goe1xyXG4gICAgICBjb2x1bW5LZXksXHJcbiAgICAgIG9yZGVyLFxyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgcmV0dXJuIG9yZGVyZWRDb2x1bW5MaXN0LnNvcnQoKGEsIGIpID0+IChhLm9yZGVyIC0gYi5vcmRlcikpLm1hcChpdGVtID0+IGl0ZW0uY29sdW1uS2V5KTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBnZXRDb2x1bW5LZXksXHJcbiAgZ2V0Q29sdW1uRGVmYXVsdFZhbHVlczogKGNvbHMpID0+IHtcclxuICAgIGNvbnN0IGNvbHVtbkRlZmF1bHRWYWx1ZXMgPSB7fTtcclxuICAgIGNvbHMuZm9yRWFjaCgoY29sKSA9PiB7XHJcbiAgICAgIGlmIChjb2wuZGVmYXVsdFZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBjb2x1bW5EZWZhdWx0VmFsdWVzW2dldENvbHVtbktleShjb2wpXSA9IGNvbC5kZWZhdWx0VmFsdWU7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGNvbHVtbkRlZmF1bHRWYWx1ZXM7XHJcbiAgfSxcclxuICBnZXRDZWxsU3R5bGVCeUNvbDogKGNvbCkgPT4ge1xyXG4gICAgaWYgKGNvbC5hbGlnbikge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHRleHRBbGlnbjogY29sLmFsaWduLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgLy8gTm8gZGVmYXVsdCBhbGlnbiBpZiBjb21wb25lbnQgaXMgc2VsZWN0XHJcbiAgICAvLyBCZWNhdXNlIHJlbmRlcmVkIGRhdGEgaXMgbW9zdCBsaWtlbHkgdGV4dFxyXG4gICAgLy8gRXZlbiBpZiB2YWx1ZVR5cGUgaXMgbnVtYmVyXHJcbiAgICBpZiAoY29sLmNvbXBvbmVudFR5cGUgPT09ICdzZWxlY3QnKSB7XHJcbiAgICAgIHJldHVybiB7fTtcclxuICAgIH1cclxuICAgIHN3aXRjaCAoY29sLnZhbHVlVHlwZSkge1xyXG4gICAgICBjYXNlICdudW1iZXInOlxyXG4gICAgICBjYXNlICdmbG9hdCc6XHJcbiAgICAgIGNhc2UgJ2RhdGUnOlxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0ZXh0QWxpZ246ICdyaWdodCcsXHJcbiAgICAgICAgfTtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4ge307XHJcbiAgICB9XHJcbiAgfSxcclxuICBpc1NvcnRhYmxlOiBjb2wgPT4gKFxyXG4gICAgY29sLnZhbHVlVHlwZSAmJlxyXG4gICAgKGNvbC5zb3J0VmFsdWVHZXR0ZXIgfHwgY29sLnZhbHVlS2V5UGF0aCkgJiZcclxuICAgICFjb2wuZGlzYWJsZVNvcnRpbmdcclxuICApLFxyXG4gIGdldFNvcnRDb21wYXJhdG9yOiAoY29sKSA9PiB7XHJcbiAgICBpZiAoY29sLnNvcnRDb21wYXJhdG9yKSB7XHJcbiAgICAgIHJldHVybiBjb2wuc29ydENvbXBhcmF0b3I7XHJcbiAgICB9XHJcbiAgICBzd2l0Y2ggKGNvbC52YWx1ZVR5cGUpIHtcclxuICAgICAgY2FzZSAndGV4dCc6XHJcbiAgICAgICAgcmV0dXJuIChhLCBiKSA9PiAoYS5sb2NhbGVDb21wYXJlID8gYS5sb2NhbGVDb21wYXJlKGIpIDogMSk7XHJcbiAgICAgIGNhc2UgJ251bWJlcic6XHJcbiAgICAgICAgcmV0dXJuIChhLCBiKSA9PiAoYSAtIGIpO1xyXG4gICAgICBjYXNlICdmbG9hdCc6XHJcbiAgICAgICAgcmV0dXJuIChhLCBiKSA9PiAoYSAtIGIpO1xyXG4gICAgICBjYXNlICdib29sZWFuJzpcclxuICAgICAgICByZXR1cm4gKGEsIGIpID0+IChhID09PSBiID8gMCA6IChhID8gLTEgOiAxKSk7XHJcbiAgICAgIGNhc2UgJ2RhdGUnOlxyXG4gICAgICAgIHJldHVybiAoYSwgYikgPT4gKG5ldyBEYXRlKGEpIC0gbmV3IERhdGUoYikpO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiAoYSwgYikgPT4gKGEubG9jYWxlQ29tcGFyZSA/IGEubG9jYWxlQ29tcGFyZShiKSA6IDEpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgZ2V0U29ydFZhbHVlR2V0dGVyOiAoY29sKSA9PiB7XHJcbiAgICBpZiAoY29sLnNvcnRWYWx1ZUdldHRlcikge1xyXG4gICAgICByZXR1cm4gY29sLnNvcnRWYWx1ZUdldHRlcjtcclxuICAgIH1cclxuICAgIHJldHVybiBkYXRhID0+IGRhdGEuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XHJcbiAgfSxcclxuICBnZXRWYWx1ZUVtcHR5Q2hlY2tlcjogKGNvbCkgPT4ge1xyXG4gICAgaWYgKGNvbC52YWx1ZUVtcHR5Q2hlY2tlcikge1xyXG4gICAgICByZXR1cm4gY29sLnZhbHVlRW1wdHlDaGVja2VyO1xyXG4gICAgfVxyXG4gICAgc3dpdGNoIChjb2wudmFsdWVUeXBlKSB7XHJcbiAgICAgIGNhc2UgJ251bWJlcic6XHJcbiAgICAgICAgcmV0dXJuIHZhbCA9PiAoXHJcbiAgICAgICAgICB2YWwgPT09ICcnIHx8XHJcbiAgICAgICAgICBpc05hTih2YWwpIHx8XHJcbiAgICAgICAgICB2YWwgPT09IG51bGwgfHxcclxuICAgICAgICAgIHZhbCA9PT0gdW5kZWZpbmVkXHJcbiAgICAgICAgKTtcclxuICAgICAgY2FzZSAnZmxvYXQnOlxyXG4gICAgICAgIHJldHVybiB2YWwgPT4gKFxyXG4gICAgICAgICAgdmFsID09PSAnJyB8fFxyXG4gICAgICAgICAgaXNOYU4odmFsKSB8fFxyXG4gICAgICAgICAgdmFsID09PSBudWxsIHx8XHJcbiAgICAgICAgICB2YWwgPT09IHVuZGVmaW5lZFxyXG4gICAgICAgICk7XHJcbiAgICAgIGNhc2UgJ3RleHQnOlxyXG4gICAgICBjYXNlICdib29sZWFuJzpcclxuICAgICAgY2FzZSAnZGF0ZSc6XHJcbiAgICAgIGNhc2UgJ3NlbGVjdCc6XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIHZhbCA9PiB2YWwgPT09ICcnIHx8IHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICB9LFxyXG4gIGdldEZpbHRlck1hdGNoZXI6IChjb2wsIGRhdGVGb3JtYXQpID0+IHtcclxuICAgIGlmIChjb2wuZmlsdGVyTWF0Y2hlcikge1xyXG4gICAgICByZXR1cm4gY29sLmZpbHRlck1hdGNoZXI7XHJcbiAgICB9XHJcbiAgICBzd2l0Y2ggKGNvbC52YWx1ZVR5cGUpIHtcclxuICAgICAgY2FzZSAnbnVtYmVyJzpcclxuICAgICAgICByZXR1cm4gKHZhbCwgZmlsdGVyVmFsKSA9PiBwYXJzZUludCh2YWwsIDEwKSA9PT0gcGFyc2VJbnQoZmlsdGVyVmFsLCAxMCk7XHJcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcclxuICAgICAgICByZXR1cm4gKHZhbCwgZmlsdGVyVmFsKSA9PiBwYXJzZUZsb2F0KGZpbHRlclZhbC5yZXBsYWNlKCcsJywgJy4nKSkgPT09IHZhbDtcclxuICAgICAgY2FzZSAnZGF0ZSc6XHJcbiAgICAgICAgcmV0dXJuICh2YWwsIGZpbHRlclZhbCkgPT4ge1xyXG4gICAgICAgICAgaWYgKG1vbWVudCh2YWwsIGRhdGVGb3JtYXQsIHRydWUpLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbW9tZW50LnV0YyhmaWx0ZXJWYWwsIGRhdGVGb3JtYXQpLmlzU2FtZShtb21lbnQudXRjKHZhbCwgZGF0ZUZvcm1hdCksICdkYXknKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChtb21lbnQodmFsKS5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1vbWVudC51dGMoZmlsdGVyVmFsLCBkYXRlRm9ybWF0KS5pc1NhbWUodmFsLCAnZGF5Jyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfTtcclxuICAgICAgY2FzZSAnYm9vbGVhbic6XHJcbiAgICAgIGNhc2UgJ3NlbGVjdCc6XHJcbiAgICAgICAgcmV0dXJuICh2YWwsIGZpbHRlclZhbCkgPT4gdmFsID09PSBmaWx0ZXJWYWw7XHJcbiAgICAgIGNhc2UgJ3RleHQnOlxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiAodmFsLCBmaWx0ZXJWYWwpID0+IChuZXcgUmVnRXhwKGZpbHRlclZhbCwgJ2knKSkudGVzdCh2YWwpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgbG9hZFNlbGVjdGVkSXRlbXM6IChncmlkKSA9PiB7XHJcbiAgICBjb25zdCBzZXNzaW9uSXRlbSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfc2VsZWN0ZWRJdGVtc18ke2dyaWQuaWR9YCk7XHJcbiAgICBpZiAoc2Vzc2lvbkl0ZW0gJiYgIWdyaWQuZGlzYWJsZVJlbWVtYmVyU2VsZWN0ZWRJdGVtcykge1xyXG4gICAgICB0cnkgeyByZXR1cm4gSlNPTi5wYXJzZShzZXNzaW9uSXRlbSk7IH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIHNlbGVjdGVkSXRlbXMgZnJvbSBzZXNzaW9uU3RvcmFnZScsIGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gW107XHJcbiAgfSxcclxuICBsb2FkR3JpZENvbmZpZzogKGdyaWQsIGNvbHMpID0+IHtcclxuICAgIGNvbnN0IGNvbmZpZ1N0b3JhZ2UgPSBncmlkLmNvbmZpZ1N0b3JhZ2UgfHwge307XHJcbiAgICBjb25zdCBzb3J0aW5nRGF0YSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfc29ydGluZ18ke2dyaWQuaWR9YCk7XHJcbiAgICBjb25zdCBmaWx0ZXJEYXRhID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShgb2NfZ3JpZF9maWx0ZXJpbmdfJHtncmlkLmlkfWApO1xyXG4gICAgY29uc3QgaXNGaWx0ZXJpbmdEYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfaXNGaWx0ZXJpbmdfJHtncmlkLmlkfWApO1xyXG4gICAgbGV0IGxvYWRlZENvbmZpZyA9IHt9O1xyXG4gICAgbGV0IGhpZGRlbkNvbHVtbnM7XHJcbiAgICBsZXQgY29sdW1uT3JkZXI7XHJcbiAgICBsZXQgaXNGaWx0ZXJpbmcgPSBmYWxzZTtcclxuXHJcbiAgICBpZiAoaXNGdW5jdGlvbihjb25maWdTdG9yYWdlLmxvYWQpKSB7XHJcbiAgICAgIGxvYWRlZENvbmZpZyA9IGNvbmZpZ1N0b3JhZ2UubG9hZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpc0ZpbHRlcmluZ0RhdGEpIHtcclxuICAgICAgaWYgKCFncmlkLmRpc2FibGVSZW1lbWJlcklzRmlsdGVyaW5nKSB7XHJcbiAgICAgICAgdHJ5IHsgaXNGaWx0ZXJpbmcgPSBKU09OLnBhcnNlKGlzRmlsdGVyaW5nRGF0YSk7IH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhZ3JpZDogZXJyb3IgcGFyc2luZyBpc0ZpbHRlcmluZ0RhdGEgZnJvbSBsb2NhbFN0b3JhZ2UnLCBlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZ3JpZC5kZWZhdWx0U2hvd0ZpbHRlcmluZ1Jvdykge1xyXG4gICAgICBpc0ZpbHRlcmluZyA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZiAobG9hZGVkQ29uZmlnLmhpZGRlbkNvbHVtbnMpIHtcclxuICAgICAgaGlkZGVuQ29sdW1ucyA9IGxvYWRlZENvbmZpZy5oaWRkZW5Db2x1bW5zOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBoaWRkZW5Db2x1bW5zSnNvbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX2hpZGRlbkNvbHVtbnNfJHtncmlkLmlkfWApO1xyXG4gICAgICBpZiAoaGlkZGVuQ29sdW1uc0pzb24pIHtcclxuICAgICAgICB0cnkgeyBoaWRkZW5Db2x1bW5zID0gSlNPTi5wYXJzZShoaWRkZW5Db2x1bW5zSnNvbik7IH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhZ3JpZDogZXJyb3IgcGFyc2luZyBoaWRkZW5Db2x1bW5zIGZyb20gbG9jYWxTdG9yYWdlJywgZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAobG9hZGVkQ29uZmlnLmNvbHVtbk9yZGVyKSB7XHJcbiAgICAgIGNvbHVtbk9yZGVyID0gbG9hZGVkQ29uZmlnLmNvbHVtbk9yZGVyOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBjb2x1bW5PcmRlckpzb24gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgb2NfZ3JpZF9jb2x1bW5PcmRlcl8ke2dyaWQuaWR9YCk7XHJcbiAgICAgIGlmIChjb2x1bW5PcmRlckpzb24pIHtcclxuICAgICAgICB0cnkgeyBjb2x1bW5PcmRlciA9IEpTT04ucGFyc2UoY29sdW1uT3JkZXJKc29uKTsgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIGNvbHVtbk9yZGVyIGZyb20gbG9jYWxTdG9yYWdlJywgZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdCBjb25maWcgPSB7XHJcbiAgICAgIHZpc2libGVDb2x1bW5zOiBnZXRWaXNpYmxlQ29sdW1ucyhjb2xzLCBoaWRkZW5Db2x1bW5zLCBjb2x1bW5PcmRlciksXHJcbiAgICAgIGZpbHRlcmluZ0RhdGE6IHtcclxuICAgICAgICBpc0ZpbHRlcmluZyxcclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgICBpZiAobG9hZGVkQ29uZmlnLmNvbHVtbldpZHRocykge1xyXG4gICAgICBjb25maWcuY29sdW1uV2lkdGhzID0gbG9hZGVkQ29uZmlnLmNvbHVtbldpZHRocztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGNvbHVtbldpZHRocyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX2NvbHVtbldpZHRoc18ke2dyaWQuaWR9YCk7XHJcbiAgICAgIGlmIChjb2x1bW5XaWR0aHMgJiYgIWdyaWQuZGlzYWJsZVJlbWVtYmVyQ29sdW1uV2lkdGhzKSB7XHJcbiAgICAgICAgdHJ5IHsgY29uZmlnLmNvbHVtbldpZHRocyA9IEpTT04ucGFyc2UoY29sdW1uV2lkdGhzKTsgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIGNvbHVtbldpZHRocyBmcm9tIGxvY2FsU3RvcmFnZScsIGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHNvcnRpbmdEYXRhICYmICFncmlkLmRpc2FibGVSZW1lbWJlclNvcnREYXRhKSB7XHJcbiAgICAgIHRyeSB7IGNvbmZpZy5zb3J0aW5nRGF0YSA9IEpTT04ucGFyc2Uoc29ydGluZ0RhdGEpOyB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhZ3JpZDogZXJyb3IgcGFyc2luZyBzb3J0aW5nRGF0YSBmcm9tIHNlc3Npb25TdG9yYWdlJywgZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChmaWx0ZXJEYXRhICYmIGlzRmlsdGVyaW5nICYmICFncmlkLmRpc2FibGVSZW1lbWJlckZpbHRlRGF0YSkge1xyXG4gICAgICB0cnkgeyBjb25maWcuZmlsdGVyaW5nRGF0YS5maWx0ZXJEYXRhID0gSlNPTi5wYXJzZShmaWx0ZXJEYXRhKTsgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXHJcbiAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgZmlsdGVyRGF0YSBmcm9tIHNlc3Npb25TdG9yYWdlJywgZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWNvbmZpZy5zb3J0aW5nRGF0YSAmJiBncmlkLmRlZmF1bHRTb3J0Q29sdW1uKSB7XHJcbiAgICAgIGNvbmZpZy5zb3J0aW5nRGF0YSA9IHtcclxuICAgICAgICBzb3J0Q29sdW1uOiBncmlkLmRlZmF1bHRTb3J0Q29sdW1uLFxyXG4gICAgICAgIHNvcnRPcmRlcjogZ3JpZC5kZWZhdWx0U29ydE9yZGVyIHx8ICdhc2MnLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvbmZpZztcclxuICB9LFxyXG4gIHNhdmVTZWxlY3RlZEl0ZW1zOiAoZ3JpZCwgc2VsZWN0ZWRJdGVtcykgPT4ge1xyXG4gICAgaWYgKGdyaWQuZGlzYWJsZVJlbWVtYmVyU2VsZWN0ZWRJdGVtcykgcmV0dXJuIGZhbHNlO1xyXG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9zZWxlY3RlZEl0ZW1zXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShzZWxlY3RlZEl0ZW1zIHx8IFtdKSk7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9LFxyXG4gIHNhdmVDb2x1bW5XaWR0aHM6IChncmlkLCBjb2x1bW5XaWR0aHMpID0+IHtcclxuICAgIGlmIChncmlkLmRpc2FibGVSZW1lbWJlckNvbHVtbldpZHRocykgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKCFjb2x1bW5XaWR0aHMpIHJldHVybiBmYWxzZTtcclxuICAgIGlmIChncmlkLmNvbmZpZ1N0b3JhZ2UgJiYgaXNGdW5jdGlvbihncmlkLmNvbmZpZ1N0b3JhZ2Uuc2F2ZSkpIHtcclxuICAgICAgZ3JpZC5jb25maWdTdG9yYWdlLnNhdmUoeyBjb2x1bW5XaWR0aHMgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9jb2x1bW5XaWR0aHNfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KGNvbHVtbldpZHRocykpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSxcclxuICBzYXZlQ29sdW1uU2V0dGluZ3M6IChncmlkLCBoaWRkZW5Db2x1bW5zLCBjb2x1bW5PcmRlcikgPT4ge1xyXG4gICAgaWYgKCFoaWRkZW5Db2x1bW5zIHx8ICFjb2x1bW5PcmRlcikgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKGdyaWQuY29uZmlnU3RvcmFnZSAmJiBpc0Z1bmN0aW9uKGdyaWQuY29uZmlnU3RvcmFnZS5zYXZlKSkge1xyXG4gICAgICBncmlkLmNvbmZpZ1N0b3JhZ2Uuc2F2ZSh7IGhpZGRlbkNvbHVtbnMsIGNvbHVtbk9yZGVyIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYG9jX2dyaWRfaGlkZGVuQ29sdW1uc18ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoaGlkZGVuQ29sdW1ucykpO1xyXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9jb2x1bW5PcmRlcl8ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoY29sdW1uT3JkZXIpKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0sXHJcbiAgc2F2ZVNvcnREYXRhOiAoZ3JpZCwgc29ydGluZ0RhdGEpID0+IHtcclxuICAgIGlmIChncmlkLmRpc2FibGVSZW1lbWJlclNvcnREYXRhKSByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAoIXNvcnRpbmdEYXRhKSByZXR1cm4gZmFsc2U7XHJcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX3NvcnRpbmdfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KHNvcnRpbmdEYXRhKSk7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9LFxyXG4gIHNhdmVGaWx0ZXJEYXRhOiAoZ3JpZCwgZmlsdGVyRGF0YSkgPT4ge1xyXG4gICAgaWYgKGdyaWQuZGlzYWJsZVJlbWVtYmVyRmlsdGVEYXRhKSByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAoIWZpbHRlckRhdGEpIHJldHVybiBmYWxzZTtcclxuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oYG9jX2dyaWRfZmlsdGVyaW5nXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShmaWx0ZXJEYXRhKSk7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9LFxyXG4gIHNhdmVJc0ZpbHRlcmluZzogKGdyaWQsIGlzRmlsdGVyaW5nKSA9PiB7XHJcbiAgICBpZiAoZ3JpZC5kaXNhYmxlUmVtZW1iZXJJc0ZpbHRlcmluZykgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKGlzRmlsdGVyaW5nID09PSB1bmRlZmluZWQpIHJldHVybiBmYWxzZTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX2lzRmlsdGVyaW5nXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShpc0ZpbHRlcmluZykpO1xyXG4gICAgaWYgKCFpc0ZpbHRlcmluZykge1xyXG4gICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKGBvY19ncmlkX2ZpbHRlcmluZ18ke2dyaWQuaWR9YCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9LFxyXG4gIC8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cclxuICBjaGVja0dyaWRQYXJhbTogKGdyaWRQYXJhbSkgPT4ge1xyXG4gICAgaWYgKGdyaWRQYXJhbSkge1xyXG4gICAgICBpZiAoIWdyaWRQYXJhbS5pZCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignW0dyaWRdIEludmFsaWQgYGdyaWQuaWRgIHBhcmFtZXRlciwgdXBkYXRlIGFjdGlvbiBwYXJhbWV0ZXJzIHRvIG5ldyBmb3JtYXQhJyk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCFncmlkUGFyYW0uaWRLZXlQYXRoKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbR3JpZF0gSW52YWxpZCBgZ3JpZC5pZEtleVBhdGhgIHBhcmFtZXRlciwgdXBkYXRlIGFjdGlvbiBwYXJhbWV0ZXJzIHRvIG5ldyBmb3JtYXQhJyk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignW0dyaWRdIEludmFsaWQgYGdyaWRgIHBhcmFtZXRlciwgdXBkYXRlIGFjdGlvbiBwYXJhbWV0ZXJzIHRvIG5ldyBmb3JtYXQhJyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBjaGVja0NvbHVtbnNQYXJhbTogKGNvbHVtbnNQYXJhbSkgPT4ge1xyXG4gICAgaWYgKCFjb2x1bW5zUGFyYW0pIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdbR3JpZF0gSW52YWxpZCBgY29sdW1uc2AgcGFyYW1ldGVyLCB1cGRhdGUgYWN0aW9uIHBhcmFtZXRlcnMgdG8gbmV3IGZvcm1hdCEnKTtcclxuICAgIH1cclxuICB9LFxyXG4gIC8vIExvY2FsZSBnZXR0ZXJzLCBzdXBwb3J0IGdyaWQgcGFyYW0gb3IgdXNlciBzdGF0ZSB1c2VkIGluIE9DIGFwcGxpY2F0aW9uc1xyXG4gIGdldExhbmd1YWdlOiAoZ3JpZCwgb2NVc2VyU3RhdGUpID0+IHtcclxuICAgIGlmIChncmlkLmxhbmd1YWdlICYmIHR5cGVvZiBncmlkLmxhbmd1YWdlID09PSAnc3RyaW5nJykge1xyXG4gICAgICByZXR1cm4gZ3JpZC5sYW5ndWFnZTtcclxuICAgIH1cclxuICAgIGlmIChvY1VzZXJTdGF0ZSkge1xyXG4gICAgICByZXR1cm4gb2NVc2VyU3RhdGUuZ2V0SW4oWyd1c2VyJywgJ2xhbmd1YWdlJ10sICdlbicpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICdlbic7XHJcbiAgfSxcclxuICBnZXREYXRlRm9ybWF0OiAoZ3JpZCwgb2NVc2VyU3RhdGUpID0+IHtcclxuICAgIGlmIChncmlkLmRhdGVGb3JtYXQgJiYgdHlwZW9mIGdyaWQubGFuZ3VhZ2UgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHJldHVybiBncmlkLmRhdGVGb3JtYXQudG9VcHBlckNhc2UoKTtcclxuICAgIH1cclxuICAgIGlmIChvY1VzZXJTdGF0ZSkge1xyXG4gICAgICByZXR1cm4gb2NVc2VyU3RhdGUuZ2V0SW4oWydsb2NhbGVGb3JtYXQnLCAnZGF0ZUZvcm1hdCddLCAnTCcpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICdMJztcclxuICB9LFxyXG4gIGdldFRob3VzYW5kU2VwYXJhdG9yOiAoZ3JpZCwgb2NVc2VyU3RhdGUpID0+IHtcclxuICAgIGlmIChncmlkLnRob3VzYW5kU2VwYXJhdG9yICYmIHR5cGVvZiBncmlkLmxhbmd1YWdlID09PSAnc3RyaW5nJykge1xyXG4gICAgICByZXR1cm4gZ3JpZC50aG91c2FuZFNlcGFyYXRvcjtcclxuICAgIH1cclxuICAgIGlmIChvY1VzZXJTdGF0ZSkge1xyXG4gICAgICByZXR1cm4gb2NVc2VyU3RhdGUuZ2V0SW4oWydsb2NhbGVGb3JtYXQnLCAndGhvdXNhbmRTZXBhcmF0b3InXSwgJycpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICcnO1xyXG4gIH0sXHJcbiAgZ2V0RGVjaW1hbFNlcGFyYXRvcjogKGdyaWQsIG9jVXNlclN0YXRlKSA9PiB7XHJcbiAgICBpZiAoZ3JpZC5kZWNpbWFsU2VwYXJhdG9yICYmIHR5cGVvZiBncmlkLmxhbmd1YWdlID09PSAnc3RyaW5nJykge1xyXG4gICAgICByZXR1cm4gZ3JpZC5kZWNpbWFsU2VwYXJhdG9yO1xyXG4gICAgfVxyXG4gICAgaWYgKG9jVXNlclN0YXRlKSB7XHJcbiAgICAgIHJldHVybiBvY1VzZXJTdGF0ZS5nZXRJbihbJ2xvY2FsZUZvcm1hdCcsICdkZWNpbWFsU2VwYXJhdG9yJ10sICcuJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gJy4nO1xyXG4gIH0sXHJcbn07XHJcbiJdfQ==