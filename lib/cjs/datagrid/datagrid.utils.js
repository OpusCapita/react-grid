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
          if ((0, _moment2.default)(getVal(row)).isValid()) {
            return (0, _moment2.default)(getVal(row)).format(dateFormat) === (0, _moment2.default)(filterVal).format(dateFormat);
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
    var pagination = sessionStorage.getItem('oc_grid_pagination_' + grid.id);
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
    if (pagination) {
      try {
        config.pagination = JSON.parse(pagination);
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
  savePaginationPage: function savePaginationPage(grid, pagination) {
    if (!pagination) return false;
    sessionStorage.setItem('oc_grid_pagination_' + grid.id, JSON.stringify(pagination));
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
    var newFilteringData = (0, _immutable.Map)({ isFiltering: false });
    if (!filteringData) return newFilteringData;

    var oldFilteringData = _immutable.Map.isMap(filteringData) ? filteringData : (0, _immutable.fromJS)(filteringData);
    var isFiltering = oldFilteringData.get('isFiltering', false);
    var filterData = oldFilteringData.get('filterData', null);

    if (isFiltering && filterData && _immutable.Map.isMap(filterData)) {
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
      function (col) {
        return JSON.stringify(col.valueKeyPath) === JSON.stringify([searchCol]);
      });
    });
    return filtered.toJS();
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC51dGlscy5qcyJdLCJuYW1lcyI6WyJnZXRDb2x1bW5LZXkiLCJjb2wiLCJjb2x1bW5LZXkiLCJ2YWx1ZUtleVBhdGgiLCJqb2luIiwiZ2V0VmlzaWJsZUNvbHVtbnMiLCJjb2xzIiwiaGlkZGVuQ29sdW1ucyIsImNvbHVtbk9yZGVyIiwib3JkZXJlZENvbHVtbkxpc3QiLCJmb3JFYWNoIiwiaSIsImNvbE9yZGVySWR4IiwiaW5kZXhPZiIsImRlZmF1bHRIaWRkZW4iLCJpc0hpZGRlbiIsIm9yZGVyIiwicHVzaCIsInNvcnQiLCJhIiwiYiIsIm1hcCIsIml0ZW0iLCJnZXRDb2x1bW5EZWZhdWx0VmFsdWVzIiwiY29sdW1uRGVmYXVsdFZhbHVlcyIsImRlZmF1bHRWYWx1ZSIsInVuZGVmaW5lZCIsImdldENlbGxTdHlsZUJ5Q29sIiwiYWxpZ24iLCJ0ZXh0QWxpZ24iLCJjb21wb25lbnRUeXBlIiwidmFsdWVUeXBlIiwiaXNTb3J0YWJsZSIsInNvcnRWYWx1ZUdldHRlciIsImRpc2FibGVTb3J0aW5nIiwiZ2V0U29ydENvbXBhcmF0b3IiLCJzb3J0Q29tcGFyYXRvciIsImxvY2FsZUNvbXBhcmUiLCJEYXRlIiwiZ2V0U29ydFZhbHVlR2V0dGVyIiwiZGF0YSIsImdldEluIiwiZ2V0VmFsdWVFbXB0eUNoZWNrZXIiLCJ2YWx1ZUVtcHR5Q2hlY2tlciIsInZhbCIsImdldEZpbHRlck1hdGNoZXIiLCJkYXRlRm9ybWF0IiwiZmlsdGVyTWF0Y2hlciIsImdldFZhbCIsInJvdyIsImZpbHRlclZhbCIsInBhcnNlSW50IiwicGFyc2VGbG9hdCIsInJlcGxhY2UiLCJpc1ZhbGlkIiwiZm9ybWF0IiwiUmVnRXhwIiwidGVzdCIsImxvYWRTZWxlY3RlZEl0ZW1zIiwiZ3JpZCIsInNlc3Npb25JdGVtIiwic2Vzc2lvblN0b3JhZ2UiLCJnZXRJdGVtIiwiaWQiLCJkaXNhYmxlUmVtZW1iZXJTZWxlY3RlZEl0ZW1zIiwiSlNPTiIsInBhcnNlIiwiZSIsImNvbnNvbGUiLCJlcnJvciIsImxvYWRHcmlkQ29uZmlnIiwiY29uZmlnU3RvcmFnZSIsInNvcnRpbmdEYXRhIiwiZmlsdGVyRGF0YSIsImlzRmlsdGVyaW5nRGF0YSIsImxvY2FsU3RvcmFnZSIsInBhZ2luYXRpb24iLCJsb2FkZWRDb25maWciLCJpc0ZpbHRlcmluZyIsImxvYWQiLCJkaXNhYmxlUmVtZW1iZXJJc0ZpbHRlcmluZyIsImRlZmF1bHRTaG93RmlsdGVyaW5nUm93IiwiaGlkZGVuQ29sdW1uc0pzb24iLCJjb2x1bW5PcmRlckpzb24iLCJjb25maWciLCJ2aXNpYmxlQ29sdW1ucyIsImZpbHRlcmluZ0RhdGEiLCJjb2x1bW5XaWR0aHMiLCJkaXNhYmxlUmVtZW1iZXJDb2x1bW5XaWR0aHMiLCJkaXNhYmxlUmVtZW1iZXJTb3J0RGF0YSIsImRpc2FibGVSZW1lbWJlckZpbHRlRGF0YSIsImRlZmF1bHRTb3J0Q29sdW1uIiwic29ydENvbHVtbiIsInNvcnRPcmRlciIsImRlZmF1bHRTb3J0T3JkZXIiLCJzYXZlU2VsZWN0ZWRJdGVtcyIsInNlbGVjdGVkSXRlbXMiLCJzZXRJdGVtIiwic3RyaW5naWZ5Iiwic2F2ZUNvbHVtbldpZHRocyIsInNhdmUiLCJzYXZlQ29sdW1uU2V0dGluZ3MiLCJzYXZlU29ydERhdGEiLCJzYXZlRmlsdGVyRGF0YSIsInNhdmVJc0ZpbHRlcmluZyIsInJlbW92ZUl0ZW0iLCJzYXZlUGFnaW5hdGlvblBhZ2UiLCJjaGVja0dyaWRQYXJhbSIsImdyaWRQYXJhbSIsIkVycm9yIiwiaWRLZXlQYXRoIiwiY2hlY2tDb2x1bW5zUGFyYW0iLCJjb2x1bW5zUGFyYW0iLCJnZXRMYW5ndWFnZSIsIm9jVXNlclN0YXRlIiwibGFuZ3VhZ2UiLCJnZXRSZWdpb24iLCJkZWZhdWx0UmVnaW9uIiwicmVnaW9uIiwiZ2V0RGF0ZUZvcm1hdCIsInRvVXBwZXJDYXNlIiwiZ2V0VGhvdXNhbmRTZXBhcmF0b3IiLCJ0aG91c2FuZFNlcGFyYXRvciIsImdldERlY2ltYWxTZXBhcmF0b3IiLCJkZWNpbWFsU2VwYXJhdG9yIiwibm9ybWFsaXplRmlsdGVyaW5nRGF0YSIsIm5ld0ZpbHRlcmluZ0RhdGEiLCJvbGRGaWx0ZXJpbmdEYXRhIiwiTWFwIiwiaXNNYXAiLCJnZXQiLCJzZXQiLCJvcmlnQ29sdW1ucyIsImZpbHRlcmVkIiwiZmluZCIsInNlYXJjaENvbCIsInRvSlMiXSwibWFwcGluZ3MiOiI7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFKQTtBQU1BLElBQU1BLGVBQWUsU0FBZkEsWUFBZTtBQUFBLFNBQ25CQyxJQUFJQyxTQUFKLElBQWlCRCxJQUFJRSxZQUFKLENBQWlCQyxJQUFqQixDQUFzQixHQUF0QixDQURFO0FBQUEsQ0FBckI7O0FBSUEsSUFBTUMsb0JBQW9CLFNBQXBCQSxpQkFBb0IsQ0FBQ0MsSUFBRCxFQUFnRDtBQUFBLE1BQXpDQyxhQUF5Qyx1RUFBekIsRUFBeUI7QUFBQSxNQUFyQkMsV0FBcUIsdUVBQVAsRUFBTzs7QUFDeEUsTUFBTUMsb0JBQW9CLEVBQTFCO0FBQ0FILE9BQUtJLE9BQUwsQ0FBYSxVQUFDVCxHQUFELEVBQU1VLENBQU4sRUFBWTtBQUN2QixRQUFNVCxZQUFZRixhQUFhQyxHQUFiLENBQWxCO0FBQ0EsUUFBTVcsY0FBY0osWUFBWUssT0FBWixDQUFvQlgsU0FBcEIsQ0FBcEI7QUFDQSxRQUFNWSxnQkFBZ0JiLElBQUljLFFBQUosSUFBZ0JILGdCQUFnQixDQUFDLENBQXZEO0FBQ0EsUUFBSUUsaUJBQWlCUCxjQUFjTSxPQUFkLENBQXNCWCxTQUF0QixJQUFtQyxDQUFDLENBQXpELEVBQTREO0FBQzFEO0FBQ0Q7QUFDRCxRQUFNYyxRQUFRSixnQkFBZ0IsQ0FBQyxDQUFqQixHQUFxQkEsV0FBckIsR0FBb0NELElBQUksQ0FBdEQ7QUFDQUYsc0JBQWtCUSxJQUFsQixDQUF1QjtBQUNyQmYsMEJBRHFCO0FBRXJCYztBQUZxQixLQUF2QjtBQUlELEdBWkQ7QUFhQSxTQUFPUCxrQkFBa0JTLElBQWxCLENB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Y2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1uZXN0ZWQtdGVybmFyeSAqL1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IGlzTmFOIGZyb20gJ2xvZGFzaC9pc05hTic7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAndXRpbCc7XG5pbXBvcnQgeyBNYXAsIGZyb21KUyB9IGZyb20gJ2ltbXV0YWJsZSc7XG5cbmNvbnN0IGdldENvbHVtbktleSA9IGNvbCA9PiAoXG4gIGNvbC5jb2x1bW5LZXkgfHwgY29sLnZhbHVlS2V5UGF0aC5qb2luKCcvJylcbik7XG5cbmNvbnN0IGdldFZpc2libGVDb2x1bW5zID0gKGNvbHMsIGhpZGRlbkNvbHVtbnMgPSBbXSwgY29sdW1uT3JkZXIgPSBbXSkgPT4ge1xuICBjb25zdCBvcmRlcmVkQ29sdW1uTGlzdCA9IFtdO1xuICBjb2xzLmZvckVhY2goKGNvbCwgaSkgPT4ge1xuICAgIGNvbnN0IGNvbHVtbktleSA9IGdldENvbHVtbktleShjb2wpO1xuICAgIGNvbnN0IGNvbE9yZGVySWR4ID0gY29sdW1uT3JkZXIuaW5kZXhPZihjb2x1bW5LZXkpO1xuICAgIGNvbnN0IGRlZmF1bHRIaWRkZW4gPSBjb2wuaXNIaWRkZW4gJiYgY29sT3JkZXJJZHggPT09IC0xO1xuICAgIGlmIChkZWZhdWx0SGlkZGVuIHx8IGhpZGRlbkNvbHVtbnMuaW5kZXhPZihjb2x1bW5LZXkpID4gLTEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgb3JkZXIgPSBjb2xPcmRlcklkeCAhPT0gLTEgPyBjb2xPcmRlcklkeCA6IChpICsgMSk7XG4gICAgb3JkZXJlZENvbHVtbkxpc3QucHVzaCh7XG4gICAgICBjb2x1bW5LZXksXG4gICAgICBvcmRlcixcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBvcmRlcmVkQ29sdW1uTGlzdC5zb3J0KChhLCBiKSA9PiAoYS5vcmRlciAtIGIub3JkZXIpKS5tYXAoaXRlbSA9PiBpdGVtLmNvbHVtbktleSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGdldENvbHVtbktleSxcbiAgZ2V0Q29sdW1uRGVmYXVsdFZhbHVlczogKGNvbHMpID0+IHtcbiAgICBjb25zdCBjb2x1bW5EZWZhdWx0VmFsdWVzID0ge307XG4gICAgY29scy5mb3JFYWNoKChjb2wpID0+IHtcbiAgICAgIGlmIChjb2wuZGVmYXVsdFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29sdW1uRGVmYXVsdFZhbHVlc1tnZXRDb2x1bW5LZXkoY29sKV0gPSBjb2wuZGVmYXVsdFZhbHVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBjb2x1bW5EZWZhdWx0VmFsdWVzO1xuICB9LFxuICBnZXRDZWxsU3R5bGVCeUNvbDogKGNvbCkgPT4ge1xuICAgIGlmIChjb2wuYWxpZ24pIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRleHRBbGlnbjogY29sLmFsaWduLFxuICAgICAgfTtcbiAgICB9XG4gICAgLy8gTm8gZGVmYXVsdCBhbGlnbiBpZiBjb21wb25lbnQgaXMgc2VsZWN0XG4gICAgLy8gQmVjYXVzZSByZW5kZXJlZCBkYXRhIGlzIG1vc3QgbGlrZWx5IHRleHRcbiAgICAvLyBFdmVuIGlmIHZhbHVlVHlwZSBpcyBudW1iZXJcbiAgICBpZiAoY29sLmNvbXBvbmVudFR5cGUgPT09ICdzZWxlY3QnKSB7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuICAgIHN3aXRjaCAoY29sLnZhbHVlVHlwZSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgIGNhc2UgJ2N1cnJlbmN5JzpcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRleHRBbGlnbjogJ3JpZ2h0JyxcbiAgICAgICAgfTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gIH0sXG4gIGlzU29ydGFibGU6IGNvbCA9PiAoXG4gICAgY29sLnZhbHVlVHlwZVxuICAgICYmIChjb2wuc29ydFZhbHVlR2V0dGVyIHx8IGNvbC52YWx1ZUtleVBhdGgpXG4gICAgJiYgIWNvbC5kaXNhYmxlU29ydGluZ1xuICApLFxuICBnZXRTb3J0Q29tcGFyYXRvcjogKGNvbCkgPT4ge1xuICAgIGlmIChjb2wuc29ydENvbXBhcmF0b3IpIHtcbiAgICAgIHJldHVybiBjb2wuc29ydENvbXBhcmF0b3I7XG4gICAgfVxuICAgIHN3aXRjaCAoY29sLnZhbHVlVHlwZSkge1xuICAgICAgY2FzZSAndGV4dCc6XG4gICAgICAgIHJldHVybiAoYSwgYikgPT4gKGEubG9jYWxlQ29tcGFyZSA/IGEubG9jYWxlQ29tcGFyZShiKSA6IDEpO1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgIGNhc2UgJ2N1cnJlbmN5JzpcbiAgICAgICAgcmV0dXJuIChhLCBiKSA9PiAoYSAtIGIpO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIHJldHVybiAoYSwgYikgPT4gKGEgPT09IGIgPyAwIDogKGEgPyAtMSA6IDEpKTtcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICByZXR1cm4gKGEsIGIpID0+IChuZXcgRGF0ZShhKSAtIG5ldyBEYXRlKGIpKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAoYSwgYikgPT4gKGEubG9jYWxlQ29tcGFyZSA/IGEubG9jYWxlQ29tcGFyZShiKSA6IDEpO1xuICAgIH1cbiAgfSxcbiAgZ2V0U29ydFZhbHVlR2V0dGVyOiAoY29sKSA9PiB7XG4gICAgaWYgKGNvbC5zb3J0VmFsdWVHZXR0ZXIpIHtcbiAgICAgIHJldHVybiBjb2wuc29ydFZhbHVlR2V0dGVyO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YSA9PiBkYXRhLmdldEluKGNvbC52YWx1ZUtleVBhdGgpO1xuICB9LFxuICBnZXRWYWx1ZUVtcHR5Q2hlY2tlcjogKGNvbCkgPT4ge1xuICAgIGlmIChjb2wudmFsdWVFbXB0eUNoZWNrZXIpIHtcbiAgICAgIHJldHVybiBjb2wudmFsdWVFbXB0eUNoZWNrZXI7XG4gICAgfVxuICAgIHN3aXRjaCAoY29sLnZhbHVlVHlwZSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgIGNhc2UgJ2N1cnJlbmN5JzpcbiAgICAgICAgcmV0dXJuIHZhbCA9PiAoXG4gICAgICAgICAgdmFsID09PSAnJ1xuICAgICAgICAgIHx8IGlzTmFOKHZhbClcbiAgICAgICAgICB8fCB2YWwgPT09IG51bGxcbiAgICAgICAgICB8fCB2YWwgPT09IHVuZGVmaW5lZFxuICAgICAgICApO1xuICAgICAgY2FzZSAndGV4dCc6XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgY2FzZSAnc2VsZWN0JzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB2YWwgPT4gdmFsID09PSAnJyB8fCB2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQ7XG4gICAgfVxuICB9LFxuICBnZXRGaWx0ZXJNYXRjaGVyOiAoY29sLCBkYXRlRm9ybWF0KSA9PiB7XG4gICAgaWYgKGNvbC5maWx0ZXJNYXRjaGVyKSByZXR1cm4gY29sLmZpbHRlck1hdGNoZXI7XG4gICAgY29uc3QgZ2V0VmFsID0gcm93ID0+IHJvdy5nZXRJbihjb2wudmFsdWVLZXlQYXRoKTtcblxuICAgIHN3aXRjaCAoY29sLnZhbHVlVHlwZSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgcmV0dXJuIChyb3csIGZpbHRlclZhbCkgPT4gcGFyc2VJbnQoZ2V0VmFsKHJvdyksIDEwKSA9PT0gcGFyc2VJbnQoZmlsdGVyVmFsLCAxMCk7XG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICBjYXNlICdjdXJyZW5jeSc6XG4gICAgICAgIHJldHVybiAocm93LCBmaWx0ZXJWYWwpID0+IHBhcnNlRmxvYXQoZmlsdGVyVmFsLnJlcGxhY2UoJywnLCAnLicpKSA9PT0gZ2V0VmFsKHJvdyk7XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgcmV0dXJuIChyb3csIGZpbHRlclZhbCkgPT4ge1xuICAgICAgICAgIGlmIChtb21lbnQoZ2V0VmFsKHJvdykpLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG1vbWVudChnZXRWYWwocm93KSkuZm9ybWF0KGRhdGVGb3JtYXQpID09PSBtb21lbnQoZmlsdGVyVmFsKS5mb3JtYXQoZGF0ZUZvcm1hdCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgY2FzZSAnc2VsZWN0JzpcbiAgICAgICAgcmV0dXJuIChyb3csIGZpbHRlclZhbCkgPT4gZ2V0VmFsKHJvdykgPT09IGZpbHRlclZhbDtcbiAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIChyb3csIGZpbHRlclZhbCkgPT4gKG5ldyBSZWdFeHAoZmlsdGVyVmFsLCAnaScpKS50ZXN0KGdldFZhbChyb3cpKTtcbiAgICB9XG4gIH0sXG4gIGxvYWRTZWxlY3RlZEl0ZW1zOiAoZ3JpZCkgPT4ge1xuICAgIGNvbnN0IHNlc3Npb25JdGVtID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShgb2NfZ3JpZF9zZWxlY3RlZEl0ZW1zXyR7Z3JpZC5pZH1gKTtcbiAgICBpZiAoc2Vzc2lvbkl0ZW0gJiYgIWdyaWQuZGlzYWJsZVJlbWVtYmVyU2VsZWN0ZWRJdGVtcykge1xuICAgICAgdHJ5IHsgcmV0dXJuIEpTT04ucGFyc2Uoc2Vzc2lvbkl0ZW0pOyB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIHNlbGVjdGVkSXRlbXMgZnJvbSBzZXNzaW9uU3RvcmFnZScsIGUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH0sXG4gIGxvYWRHcmlkQ29uZmlnOiAoZ3JpZCwgY29scykgPT4ge1xuICAgIGNvbnN0IGNvbmZpZ1N0b3JhZ2UgPSBncmlkLmNvbmZpZ1N0b3JhZ2UgfHwge307XG4gICAgY29uc3Qgc29ydGluZ0RhdGEgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX3NvcnRpbmdfJHtncmlkLmlkfWApO1xuICAgIGNvbnN0IGZpbHRlckRhdGEgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX2ZpbHRlcmluZ18ke2dyaWQuaWR9YCk7XG4gICAgY29uc3QgaXNGaWx0ZXJpbmdEYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfaXNGaWx0ZXJpbmdfJHtncmlkLmlkfWApO1xuICAgIGNvbnN0IHBhZ2luYXRpb24gPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX3BhZ2luYXRpb25fJHtncmlkLmlkfWApO1xuICAgIGxldCBsb2FkZWRDb25maWcgPSB7fTtcbiAgICBsZXQgaGlkZGVuQ29sdW1ucztcbiAgICBsZXQgY29sdW1uT3JkZXI7XG4gICAgbGV0IGlzRmlsdGVyaW5nID0gZmFsc2U7XG5cbiAgICBpZiAoaXNGdW5jdGlvbihjb25maWdTdG9yYWdlLmxvYWQpKSB7XG4gICAgICBsb2FkZWRDb25maWcgPSBjb25maWdTdG9yYWdlLmxvYWQoKTtcbiAgICB9XG5cbiAgICBpZiAoaXNGaWx0ZXJpbmdEYXRhKSB7XG4gICAgICBpZiAoIWdyaWQuZGlzYWJsZVJlbWVtYmVySXNGaWx0ZXJpbmcpIHtcbiAgICAgICAgdHJ5IHsgaXNGaWx0ZXJpbmcgPSBKU09OLnBhcnNlKGlzRmlsdGVyaW5nRGF0YSk7IH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIGlzRmlsdGVyaW5nRGF0YSBmcm9tIGxvY2FsU3RvcmFnZScsIGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChncmlkLmRlZmF1bHRTaG93RmlsdGVyaW5nUm93KSB7XG4gICAgICBpc0ZpbHRlcmluZyA9IHRydWU7XG4gICAgfVxuICAgIGlmIChsb2FkZWRDb25maWcuaGlkZGVuQ29sdW1ucykge1xuICAgICAgaGlkZGVuQ29sdW1ucyA9IGxvYWRlZENvbmZpZy5oaWRkZW5Db2x1bW5zOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaGlkZGVuQ29sdW1uc0pzb24gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgb2NfZ3JpZF9oaWRkZW5Db2x1bW5zXyR7Z3JpZC5pZH1gKTtcbiAgICAgIGlmIChoaWRkZW5Db2x1bW5zSnNvbikge1xuICAgICAgICB0cnkgeyBoaWRkZW5Db2x1bW5zID0gSlNPTi5wYXJzZShoaWRkZW5Db2x1bW5zSnNvbik7IH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIGhpZGRlbkNvbHVtbnMgZnJvbSBsb2NhbFN0b3JhZ2UnLCBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAobG9hZGVkQ29uZmlnLmNvbHVtbk9yZGVyKSB7XG4gICAgICBjb2x1bW5PcmRlciA9IGxvYWRlZENvbmZpZy5jb2x1bW5PcmRlcjsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNvbHVtbk9yZGVySnNvbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX2NvbHVtbk9yZGVyXyR7Z3JpZC5pZH1gKTtcbiAgICAgIGlmIChjb2x1bW5PcmRlckpzb24pIHtcbiAgICAgICAgdHJ5IHsgY29sdW1uT3JkZXIgPSBKU09OLnBhcnNlKGNvbHVtbk9yZGVySnNvbik7IH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIGNvbHVtbk9yZGVyIGZyb20gbG9jYWxTdG9yYWdlJywgZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgdmlzaWJsZUNvbHVtbnM6IGdldFZpc2libGVDb2x1bW5zKGNvbHMsIGhpZGRlbkNvbHVtbnMsIGNvbHVtbk9yZGVyKSxcbiAgICAgIGZpbHRlcmluZ0RhdGE6IHtcbiAgICAgICAgaXNGaWx0ZXJpbmcsXG4gICAgICB9LFxuICAgIH07XG4gICAgaWYgKGxvYWRlZENvbmZpZy5jb2x1bW5XaWR0aHMpIHtcbiAgICAgIGNvbmZpZy5jb2x1bW5XaWR0aHMgPSBsb2FkZWRDb25maWcuY29sdW1uV2lkdGhzO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjb2x1bW5XaWR0aHMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgb2NfZ3JpZF9jb2x1bW5XaWR0aHNfJHtncmlkLmlkfWApO1xuICAgICAgaWYgKGNvbHVtbldpZHRocyAmJiAhZ3JpZC5kaXNhYmxlUmVtZW1iZXJDb2x1bW5XaWR0aHMpIHtcbiAgICAgICAgdHJ5IHsgY29uZmlnLmNvbHVtbldpZHRocyA9IEpTT04ucGFyc2UoY29sdW1uV2lkdGhzKTsgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgY29sdW1uV2lkdGhzIGZyb20gbG9jYWxTdG9yYWdlJywgZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNvcnRpbmdEYXRhICYmICFncmlkLmRpc2FibGVSZW1lbWJlclNvcnREYXRhKSB7XG4gICAgICB0cnkgeyBjb25maWcuc29ydGluZ0RhdGEgPSBKU09OLnBhcnNlKHNvcnRpbmdEYXRhKTsgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhZ3JpZDogZXJyb3IgcGFyc2luZyBzb3J0aW5nRGF0YSBmcm9tIHNlc3Npb25TdG9yYWdlJywgZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChmaWx0ZXJEYXRhICYmIGlzRmlsdGVyaW5nICYmICFncmlkLmRpc2FibGVSZW1lbWJlckZpbHRlRGF0YSkge1xuICAgICAgdHJ5IHsgY29uZmlnLmZpbHRlcmluZ0RhdGEuZmlsdGVyRGF0YSA9IEpTT04ucGFyc2UoZmlsdGVyRGF0YSk7IH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgZmlsdGVyRGF0YSBmcm9tIHNlc3Npb25TdG9yYWdlJywgZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChwYWdpbmF0aW9uKSB7XG4gICAgICB0cnkgeyBjb25maWcucGFnaW5hdGlvbiA9IEpTT04ucGFyc2UocGFnaW5hdGlvbik7IH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgcGFnaW5hdGlvbiBmcm9tIHNlc3Npb25TdG9yYWdlJywgZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuc29ydGluZ0RhdGEgJiYgZ3JpZC5kZWZhdWx0U29ydENvbHVtbikge1xuICAgICAgY29uZmlnLnNvcnRpbmdEYXRhID0ge1xuICAgICAgICBzb3J0Q29sdW1uOiBncmlkLmRlZmF1bHRTb3J0Q29sdW1uLFxuICAgICAgICBzb3J0T3JkZXI6IGdyaWQuZGVmYXVsdFNvcnRPcmRlciB8fCAnYXNjJyxcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBjb25maWc7XG4gIH0sXG4gIHNhdmVTZWxlY3RlZEl0ZW1zOiAoZ3JpZCwgc2VsZWN0ZWRJdGVtcykgPT4ge1xuICAgIGlmIChncmlkLmRpc2FibGVSZW1lbWJlclNlbGVjdGVkSXRlbXMpIHJldHVybiBmYWxzZTtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX3NlbGVjdGVkSXRlbXNfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KHNlbGVjdGVkSXRlbXMgfHwgW10pKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgc2F2ZUNvbHVtbldpZHRoczogKGdyaWQsIGNvbHVtbldpZHRocykgPT4ge1xuICAgIGlmIChncmlkLmRpc2FibGVSZW1lbWJlckNvbHVtbldpZHRocykgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghY29sdW1uV2lkdGhzKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGdyaWQuY29uZmlnU3RvcmFnZSAmJiBpc0Z1bmN0aW9uKGdyaWQuY29uZmlnU3RvcmFnZS5zYXZlKSkge1xuICAgICAgZ3JpZC5jb25maWdTdG9yYWdlLnNhdmUoeyBjb2x1bW5XaWR0aHMgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX2NvbHVtbldpZHRoc18ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoY29sdW1uV2lkdGhzKSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBzYXZlQ29sdW1uU2V0dGluZ3M6IChncmlkLCBoaWRkZW5Db2x1bW5zLCBjb2x1bW5PcmRlcikgPT4ge1xuICAgIGlmICghaGlkZGVuQ29sdW1ucyB8fCAhY29sdW1uT3JkZXIpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoZ3JpZC5jb25maWdTdG9yYWdlICYmIGlzRnVuY3Rpb24oZ3JpZC5jb25maWdTdG9yYWdlLnNhdmUpKSB7XG4gICAgICBncmlkLmNvbmZpZ1N0b3JhZ2Uuc2F2ZSh7IGhpZGRlbkNvbHVtbnMsIGNvbHVtbk9yZGVyIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9oaWRkZW5Db2x1bW5zXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShoaWRkZW5Db2x1bW5zKSk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9jb2x1bW5PcmRlcl8ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoY29sdW1uT3JkZXIpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIHNhdmVTb3J0RGF0YTogKGdyaWQsIHNvcnRpbmdEYXRhKSA9PiB7XG4gICAgaWYgKGdyaWQuZGlzYWJsZVJlbWVtYmVyU29ydERhdGEpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIXNvcnRpbmdEYXRhKSByZXR1cm4gZmFsc2U7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9zb3J0aW5nXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShzb3J0aW5nRGF0YSkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBzYXZlRmlsdGVyRGF0YTogKGdyaWQsIGZpbHRlckRhdGEpID0+IHtcbiAgICBpZiAoZ3JpZC5kaXNhYmxlUmVtZW1iZXJGaWx0ZURhdGEpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIWZpbHRlckRhdGEpIHJldHVybiBmYWxzZTtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX2ZpbHRlcmluZ18ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoZmlsdGVyRGF0YSkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBzYXZlSXNGaWx0ZXJpbmc6IChncmlkLCBpc0ZpbHRlcmluZykgPT4ge1xuICAgIGlmIChncmlkLmRpc2FibGVSZW1lbWJlcklzRmlsdGVyaW5nKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGlzRmlsdGVyaW5nID09PSB1bmRlZmluZWQpIHJldHVybiBmYWxzZTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9pc0ZpbHRlcmluZ18ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoaXNGaWx0ZXJpbmcpKTtcbiAgICBpZiAoIWlzRmlsdGVyaW5nKSB7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKGBvY19ncmlkX2ZpbHRlcmluZ18ke2dyaWQuaWR9YCk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBzYXZlUGFnaW5hdGlvblBhZ2U6IChncmlkLCBwYWdpbmF0aW9uKSA9PiB7XG4gICAgaWYgKCFwYWdpbmF0aW9uKSByZXR1cm4gZmFsc2U7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9wYWdpbmF0aW9uXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShwYWdpbmF0aW9uKSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIC8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbiAgY2hlY2tHcmlkUGFyYW06IChncmlkUGFyYW0pID0+IHtcbiAgICBpZiAoZ3JpZFBhcmFtKSB7XG4gICAgICBpZiAoIWdyaWRQYXJhbS5pZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tHcmlkXSBJbnZhbGlkIGBncmlkLmlkYCBwYXJhbWV0ZXIsIHVwZGF0ZSBhY3Rpb24gcGFyYW1ldGVycyB0byBuZXcgZm9ybWF0IScpO1xuICAgICAgfVxuICAgICAgaWYgKCFncmlkUGFyYW0uaWRLZXlQYXRoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignW0dyaWRdIEludmFsaWQgYGdyaWQuaWRLZXlQYXRoYCBwYXJhbWV0ZXIsIHVwZGF0ZSBhY3Rpb24gcGFyYW1ldGVycyB0byBuZXcgZm9ybWF0IScpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tHcmlkXSBJbnZhbGlkIGBncmlkYCBwYXJhbWV0ZXIsIHVwZGF0ZSBhY3Rpb24gcGFyYW1ldGVycyB0byBuZXcgZm9ybWF0IScpO1xuICAgIH1cbiAgfSxcbiAgY2hlY2tDb2x1bW5zUGFyYW06IChjb2x1bW5zUGFyYW0pID0+IHtcbiAgICBpZiAoIWNvbHVtbnNQYXJhbSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdbR3JpZF0gSW52YWxpZCBgY29sdW1uc2AgcGFyYW1ldGVyLCB1cGRhdGUgYWN0aW9uIHBhcmFtZXRlcnMgdG8gbmV3IGZvcm1hdCEnKTtcbiAgICB9XG4gIH0sXG4gIC8vIExvY2FsZSBnZXR0ZXJzLCBzdXBwb3J0IGdyaWQgcGFyYW0gb3IgdXNlciBzdGF0ZSB1c2VkIGluIE9DIGFwcGxpY2F0aW9uc1xuICBnZXRMYW5ndWFnZTogKGdyaWQsIG9jVXNlclN0YXRlKSA9PiB7XG4gICAgaWYgKGdyaWQubGFuZ3VhZ2UgJiYgdHlwZW9mIGdyaWQubGFuZ3VhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZ3JpZC5sYW5ndWFnZTtcbiAgICB9XG4gICAgaWYgKG9jVXNlclN0YXRlKSB7XG4gICAgICByZXR1cm4gb2NVc2VyU3RhdGUuZ2V0SW4oWyd1c2VyJywgJ2xhbmd1YWdlJ10sICdlbicpO1xuICAgIH1cbiAgICByZXR1cm4gJ2VuJztcbiAgfSxcbiAgZ2V0UmVnaW9uOiAoZ3JpZCwgb2NVc2VyU3RhdGUpID0+IHtcbiAgICBjb25zdCBkZWZhdWx0UmVnaW9uID0gJ2VuX0dCJztcbiAgICBpZiAoZ3JpZC5yZWdpb24gJiYgdHlwZW9mIGdyaWQucmVnaW9uID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGdyaWQucmVnaW9uO1xuICAgIH1cbiAgICBpZiAob2NVc2VyU3RhdGUpIHtcbiAgICAgIHJldHVybiBvY1VzZXJTdGF0ZS5nZXRJbihbJ3VzZXInLCAncmVnaW9uJ10sIGRlZmF1bHRSZWdpb24pO1xuICAgIH1cbiAgICByZXR1cm4gZGVmYXVsdFJlZ2lvbjtcbiAgfSxcbiAgZ2V0RGF0ZUZvcm1hdDogKGdyaWQsIG9jVXNlclN0YXRlKSA9PiB7XG4gICAgaWYgKGdyaWQuZGF0ZUZvcm1hdCAmJiB0eXBlb2YgZ3JpZC5kYXRlRm9ybWF0ID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGdyaWQuZGF0ZUZvcm1hdC50b1VwcGVyQ2FzZSgpO1xuICAgIH1cbiAgICBpZiAob2NVc2VyU3RhdGUpIHtcbiAgICAgIHJldHVybiBvY1VzZXJTdGF0ZS5nZXRJbihbJ2xvY2FsZUZvcm1hdCcsICdkYXRlRm9ybWF0J10sICdMJyk7XG4gICAgfVxuICAgIHJldHVybiAnTCc7XG4gIH0sXG4gIGdldFRob3VzYW5kU2VwYXJhdG9yOiAoZ3JpZCwgb2NVc2VyU3RhdGUpID0+IHtcbiAgICBpZiAoZ3JpZC50aG91c2FuZFNlcGFyYXRvciAmJiB0eXBlb2YgZ3JpZC5sYW5ndWFnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBncmlkLnRob3VzYW5kU2VwYXJhdG9yO1xuICAgIH1cbiAgICBpZiAob2NVc2VyU3RhdGUpIHtcbiAgICAgIHJldHVybiBvY1VzZXJTdGF0ZS5nZXRJbihbJ2xvY2FsZUZvcm1hdCcsICd0aG91c2FuZFNlcGFyYXRvciddLCAnJyk7XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfSxcbiAgZ2V0RGVjaW1hbFNlcGFyYXRvcjogKGdyaWQsIG9jVXNlclN0YXRlKSA9PiB7XG4gICAgaWYgKGdyaWQuZGVjaW1hbFNlcGFyYXRvciAmJiB0eXBlb2YgZ3JpZC5sYW5ndWFnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBncmlkLmRlY2ltYWxTZXBhcmF0b3I7XG4gICAgfVxuICAgIGlmIChvY1VzZXJTdGF0ZSkge1xuICAgICAgcmV0dXJuIG9jVXNlclN0YXRlLmdldEluKFsnbG9jYWxlRm9ybWF0JywgJ2RlY2ltYWxTZXBhcmF0b3InXSwgJy4nKTtcbiAgICB9XG4gICAgcmV0dXJuICcuJztcbiAgfSxcbiAgbm9ybWFsaXplRmlsdGVyaW5nRGF0YTogKGZpbHRlcmluZ0RhdGEpID0+IHtcbiAgICBsZXQgbmV3RmlsdGVyaW5nRGF0YSA9IE1hcCh7IGlzRmlsdGVyaW5nOiBmYWxzZSB9KTtcbiAgICBpZiAoIWZpbHRlcmluZ0RhdGEpIHJldHVybiBuZXdGaWx0ZXJpbmdEYXRhO1xuXG4gICAgY29uc3Qgb2xkRmlsdGVyaW5nRGF0YSA9IE1hcC5pc01hcChmaWx0ZXJpbmdEYXRhKSA/IGZpbHRlcmluZ0RhdGEgOiBmcm9tSlMoZmlsdGVyaW5nRGF0YSk7XG4gICAgY29uc3QgaXNGaWx0ZXJpbmcgPSBvbGRGaWx0ZXJpbmdEYXRhLmdldCgnaXNGaWx0ZXJpbmcnLCBmYWxzZSk7XG4gICAgY29uc3QgZmlsdGVyRGF0YSA9IG9sZEZpbHRlcmluZ0RhdGEuZ2V0KCdmaWx0ZXJEYXRhJywgbnVsbCk7XG5cbiAgICBpZiAoaXNGaWx0ZXJpbmcgJiYgZmlsdGVyRGF0YSAmJiBNYXAuaXNNYXAoZmlsdGVyRGF0YSkpIHtcbiAgICAgIG5ld0ZpbHRlcmluZ0RhdGEgPSBuZXdGaWx0ZXJpbmdEYXRhXG4gICAgICAgIC5zZXQoJ2lzRmlsdGVyaW5nJywgdHJ1ZSlcbiAgICAgICAgLnNldCgnZmlsdGVyRGF0YScsIGZpbHRlckRhdGEpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXdGaWx0ZXJpbmdEYXRhO1xuICB9LFxuICAvKlxuICAgKiBAZnVuY3Rpb24gdmlzaWJsZUNvbHVtbnNcbiAgICogQGRlc2MgIFJldHVybnMgZWl0aGVyIHZpc2libGUgY29sdW1ucyAoaWYgc29tZSBjb2x1bW5zIGFyZSBoaWRkZW4gKVxuICAgKiAgICAgICAgb3IgZ3JpZCBkZWZhdWx0IGNvbHVtbnMuXG4gICAqIEBwYXJhbSBvcmlnQ29sdW1ucyBBcnJheSBvZiBHcmlkIG9yaWdpbmFsIGNvbHVtbnMgb2JqZWN0c1xuICAgKiBAcGFyYW0gdmlzaWJsZUNvbHVtbnMgQXJyYXkgb2YgR3JpZCB2aXNpYmxlIGNvbHVtbnMgdmFsdWVLZXlQYXRoc1xuICAgKiBAcmV0dXJucyBBcnJheSBvZiBjb2x1bW4gb2JqZWN0cyBjdXJyZW50bHkgdmlzaWJsZSBmb3IgdXNlci5cbiAgKi9cbiAgdmlzaWJsZUNvbHVtbnM6IChvcmlnQ29sdW1ucywgdmlzaWJsZUNvbHVtbnMpID0+IHtcbiAgICBpZiAoIXZpc2libGVDb2x1bW5zKSByZXR1cm4gb3JpZ0NvbHVtbnM7XG4gICAgY29uc3QgZmlsdGVyZWQgPSB2aXNpYmxlQ29sdW1ucy5tYXAoICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgICAgIHNlYXJjaENvbCA9PiBvcmlnQ29sdW1ucy5maW5kKCAgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgICAgIGNvbCA9PiBKU09OLnN0cmluZ2lmeShjb2wudmFsdWVLZXlQYXRoKSA9PT0gSlNPTi5zdHJpbmdpZnkoW3NlYXJjaENvbF0pKSk7XG4gICAgcmV0dXJuIGZpbHRlcmVkLnRvSlMoKTtcbiAgfSxcbn07XG4iXX0=