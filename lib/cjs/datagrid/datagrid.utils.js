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
          var escapedVal = filterVal;
          var specialChars = '[]\\^$.|?*+()';

          // If filter val starts with a Regex special character, we must escape it
          if (specialChars.includes(filterVal[0])) escapedVal = '\\' + filterVal;
          return new RegExp(escapedVal, 'i').test(getVal(row));
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
      // valueKeyPath is joined here as it can be an array like ['key1', 'key2'].
      // searchCol is similarly joined in onCellKeyDown in datagrid.component.jsx
      function (col) {
        return JSON.stringify(col.valueKeyPath.join('/')) === JSON.stringify(searchCol);
      });
    });
    return filtered.toJS();
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC51dGlscy5qcyJdLCJuYW1lcyI6WyJnZXRDb2x1bW5LZXkiLCJjb2wiLCJjb2x1bW5LZXkiLCJ2YWx1ZUtleVBhdGgiLCJqb2luIiwiZ2V0VmlzaWJsZUNvbHVtbnMiLCJjb2xzIiwiaGlkZGVuQ29sdW1ucyIsImNvbHVtbk9yZGVyIiwib3JkZXJlZENvbHVtbkxpc3QiLCJmb3JFYWNoIiwiaSIsImNvbE9yZGVySWR4IiwiaW5kZXhPZiIsImRlZmF1bHRIaWRkZW4iLCJpc0hpZGRlbiIsIm9yZGVyIiwicHVzaCIsInNvcnQiLCJhIiwiYiIsIm1hcCIsIml0ZW0iLCJnZXRDb2x1bW5EZWZhdWx0VmFsdWVzIiwiY29sdW1uRGVmYXVsdFZhbHVlcyIsImRlZmF1bHRWYWx1ZSIsInVuZGVmaW5lZCIsImdldENlbGxTdHlsZUJ5Q29sIiwiYWxpZ24iLCJ0ZXh0QWxpZ24iLCJjb21wb25lbnRUeXBlIiwidmFsdWVUeXBlIiwiaXNTb3J0YWJsZSIsInNvcnRWYWx1ZUdldHRlciIsImRpc2FibGVTb3J0aW5nIiwiZ2V0U29ydENvbXBhcmF0b3IiLCJzb3J0Q29tcGFyYXRvciIsImxvY2FsZUNvbXBhcmUiLCJEYXRlIiwiZ2V0U29ydFZhbHVlR2V0dGVyIiwiZGF0YSIsImdldEluIiwiZ2V0VmFsdWVFbXB0eUNoZWNrZXIiLCJ2YWx1ZUVtcHR5Q2hlY2tlciIsInZhbCIsImdldEZpbHRlck1hdGNoZXIiLCJkYXRlRm9ybWF0IiwiZmlsdGVyTWF0Y2hlciIsImdldFZhbCIsInJvdyIsImZpbHRlclZhbCIsInBhcnNlSW50IiwicGFyc2VGbG9hdCIsInJlcGxhY2UiLCJpc1ZhbGlkIiwiZm9ybWF0IiwiZXNjYXBlZFZhbCIsInNwZWNpYWxDaGFycyIsImluY2x1ZGVzIiwiUmVnRXhwIiwidGVzdCIsImxvYWRTZWxlY3RlZEl0ZW1zIiwiZ3JpZCIsInNlc3Npb25JdGVtIiwic2Vzc2lvblN0b3JhZ2UiLCJnZXRJdGVtIiwiaWQiLCJkaXNhYmxlUmVtZW1iZXJTZWxlY3RlZEl0ZW1zIiwiSlNPTiIsInBhcnNlIiwiZSIsImNvbnNvbGUiLCJlcnJvciIsImxvYWRHcmlkQ29uZmlnIiwiY29uZmlnU3RvcmFnZSIsInNvcnRpbmdEYXRhIiwiZmlsdGVyRGF0YSIsImlzRmlsdGVyaW5nRGF0YSIsImxvY2FsU3RvcmFnZSIsInBhZ2luYXRpb24iLCJsb2FkZWRDb25maWciLCJpc0ZpbHRlcmluZyIsImxvYWQiLCJkaXNhYmxlUmVtZW1iZXJJc0ZpbHRlcmluZyIsImRlZmF1bHRTaG93RmlsdGVyaW5nUm93IiwiaGlkZGVuQ29sdW1uc0pzb24iLCJjb2x1bW5PcmRlckpzb24iLCJjb25maWciLCJ2aXNpYmxlQ29sdW1ucyIsImZpbHRlcmluZ0RhdGEiLCJjb2x1bW5XaWR0aHMiLCJkaXNhYmxlUmVtZW1iZXJDb2x1bW5XaWR0aHMiLCJkaXNhYmxlUmVtZW1iZXJTb3J0RGF0YSIsImRpc2FibGVSZW1lbWJlckZpbHRlRGF0YSIsImRlZmF1bHRTb3J0Q29sdW1uIiwic29ydENvbHVtbiIsInNvcnRPcmRlciIsImRlZmF1bHRTb3J0T3JkZXIiLCJzYXZlU2VsZWN0ZWRJdGVtcyIsInNlbGVjdGVkSXRlbXMiLCJzZXRJdGVtIiwic3RyaW5naWZ5Iiwic2F2ZUNvbHVtbldpZHRocyIsInNhdmUiLCJzYXZlQ29sdW1uU2V0dGluZ3MiLCJzYXZlU29ydERhdGEiLCJzYXZlRmlsdGVyRGF0YSIsInNhdmVJc0ZpbHRlcmluZyIsInJlbW92ZUl0ZW0iLCJzYXZlUGFnaW5hdGlvblBhZ2UiLCJjaGVja0dyaWRQYXJhbSIsImdyaWRQYXJhbSIsIkVycm9yIiwiaWRLZXlQYXRoIiwiY2hlY2tDb2x1bW5zUGFyYW0iLCJjb2x1bW5zUGFyYW0iLCJnZXRMYW5ndWFnZSIsIm9jVXNlclN0YXRlIiwibGFuZ3VhZ2UiLCJnZXRSZWdpb24iLCJkZWZhdWx0UmVnaW9uIiwicmVnaW9uIiwiZ2V0RGF0ZUZvcm1hdCIsInRvVXBwZXJDYXNlIiwiZ2V0VGhvdXNhbmRTZXBhcmF0b3IiLCJ0aG91c2FuZFNlcGFyYXRvciIsImdldERlY2ltYWxTZXBhcmF0b3IiLCJkZWNpbWFsU2VwYXJhdG9yIiwibm9ybWFsaXplRmlsdGVyaW5nRGF0YSIsIm5ld0ZpbHRlcmluZ0RhdGEiLCJvbGRGaWx0ZXJpbmdEYXRhIiwiTWFwIiwiaXNNYXAiLCJnZXQiLCJzZXQiLCJvcmlnQ29sdW1ucyIsImZpbHRlcmVkIiwiZmluZCIsInNlYXJjaENvbCIsInRvSlMiXSwibWFwcGluZ3MiOiI7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFKQTtBQU1BLElBQU1BLGVBQWUsU0FBZkEsWUFBZTtBQUFBLFNBQ25CQyxJQUFJQyxTQUFKLElBQWlCRCxJQUFJRSxZQUFKLENBQWlCQyxJQUFqQixDQUFzQixHQUF0QixDQURFO0FBQUEsQ0FBckI7O0FBSUEsSUFBTUMsb0JBQW9CLFNBQXBCQSxpQkFBb0IsQ0FBQ0MsSUFBRCxFQUFnRDtBQUFBLE1BQXpDQyxhQUF5Qyx1RUFBekIsRUFBeUI7QUFBQSxNQUFyQkMsV0FBcUIsdUVBQVAsRUFBTzs7QUFDeEUsTUFBTUMsb0JBQW9CLEVBQTFCO0FBQ0FILE9BQUtJLE9BQUwsQ0FBYSxVQUFDVCxHQUFELEVBQU1VLENBQU4sRUFBWTtBQUN2QixRQUFNVCxZQUFZRixhQUFhQyxHQUFiLENBQWxCO0FBQ0EsUUFBTVcsY0FBY0osWUFBWUssT0FBWixDQUFvQlgsU0FBcEIsQ0FBcEI7QUFDQSxRQUFNWSxnQkFBZ0JiLElBQUljLFFBQUosSUFBZ0JILGdCQUFnQixDQUFDLENBQXZEO0FBQ0EsUUFBSUUsaUJBQWlCUCxjQUFjTSxPQUFkLENBQXNCWCxTQUF0QixJQUFtQyxDQUFDLENBQXpELEVBQTREO0FBQzFEO0FBQ0Q7QUFDRCxRQUFNYyxRQUFRSixnQkFBZ0IsQ0FBQyxDQUFqQixHQUFxQkEsV0FBckIsR0FBb0NELElBQUksQ0FBdEQ7QUFDQUYsc0JBQWtCUSxJQUFsQixDQUF1QjtBQUNyQmYsMEJBRHFCO0FBRXJCYztBQUZxQixLQUF2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QUFLaUMsU0FBTCxDQUFlcEcsSUFBSUUsWUFBSixDQUFpQkMsSUFBakIsQ0FBc0IsR0FBdEIsQ0FBZixNQUErQ2dFLEtBQUtpQyxTQUFMLENBQWVxQyxTQUFmLENBQXREO0FBQUEsT0FIVyxDQUFiO0FBQUEsS0FEZSxDQUFqQjtBQUtBLFdBQU9GLFNBQVNHLElBQVQsRUFBUDtBQUNEO0FBaFhZLEMiLCJmaWxlIjoiZGF0YWdyaWQudXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1uZXN0ZWQtdGVybmFyeSAqL1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IGlzTmFOIGZyb20gJ2xvZGFzaC9pc05hTic7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAndXRpbCc7XG5pbXBvcnQgeyBNYXAsIGZyb21KUyB9IGZyb20gJ2ltbXV0YWJsZSc7XG5cbmNvbnN0IGdldENvbHVtbktleSA9IGNvbCA9PiAoXG4gIGNvbC5jb2x1bW5LZXkgfHwgY29sLnZhbHVlS2V5UGF0aC5qb2luKCcvJylcbik7XG5cbmNvbnN0IGdldFZpc2libGVDb2x1bW5zID0gKGNvbHMsIGhpZGRlbkNvbHVtbnMgPSBbXSwgY29sdW1uT3JkZXIgPSBbXSkgPT4ge1xuICBjb25zdCBvcmRlcmVkQ29sdW1uTGlzdCA9IFtdO1xuICBjb2xzLmZvckVhY2goKGNvbCwgaSkgPT4ge1xuICAgIGNvbnN0IGNvbHVtbktleSA9IGdldENvbHVtbktleShjb2wpO1xuICAgIGNvbnN0IGNvbE9yZGVySWR4ID0gY29sdW1uT3JkZXIuaW5kZXhPZihjb2x1bW5LZXkpO1xuICAgIGNvbnN0IGRlZmF1bHRIaWRkZW4gPSBjb2wuaXNIaWRkZW4gJiYgY29sT3JkZXJJZHggPT09IC0xO1xuICAgIGlmIChkZWZhdWx0SGlkZGVuIHx8IGhpZGRlbkNvbHVtbnMuaW5kZXhPZihjb2x1bW5LZXkpID4gLTEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgb3JkZXIgPSBjb2xPcmRlcklkeCAhPT0gLTEgPyBjb2xPcmRlcklkeCA6IChpICsgMSk7XG4gICAgb3JkZXJlZENvbHVtbkxpc3QucHVzaCh7XG4gICAgICBjb2x1bW5LZXksXG4gICAgICBvcmRlcixcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBvcmRlcmVkQ29sdW1uTGlzdC5zb3J0KChhLCBiKSA9PiAoYS5vcmRlciAtIGIub3JkZXIpKS5tYXAoaXRlbSA9PiBpdGVtLmNvbHVtbktleSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGdldENvbHVtbktleSxcbiAgZ2V0Q29sdW1uRGVmYXVsdFZhbHVlczogKGNvbHMpID0+IHtcbiAgICBjb25zdCBjb2x1bW5EZWZhdWx0VmFsdWVzID0ge307XG4gICAgY29scy5mb3JFYWNoKChjb2wpID0+IHtcbiAgICAgIGlmIChjb2wuZGVmYXVsdFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29sdW1uRGVmYXVsdFZhbHVlc1tnZXRDb2x1bW5LZXkoY29sKV0gPSBjb2wuZGVmYXVsdFZhbHVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBjb2x1bW5EZWZhdWx0VmFsdWVzO1xuICB9LFxuICBnZXRDZWxsU3R5bGVCeUNvbDogKGNvbCkgPT4ge1xuICAgIGlmIChjb2wuYWxpZ24pIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRleHRBbGlnbjogY29sLmFsaWduLFxuICAgICAgfTtcbiAgICB9XG4gICAgLy8gTm8gZGVmYXVsdCBhbGlnbiBpZiBjb21wb25lbnQgaXMgc2VsZWN0XG4gICAgLy8gQmVjYXVzZSByZW5kZXJlZCBkYXRhIGlzIG1vc3QgbGlrZWx5IHRleHRcbiAgICAvLyBFdmVuIGlmIHZhbHVlVHlwZSBpcyBudW1iZXJcbiAgICBpZiAoY29sLmNvbXBvbmVudFR5cGUgPT09ICdzZWxlY3QnKSB7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuICAgIHN3aXRjaCAoY29sLnZhbHVlVHlwZSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgIGNhc2UgJ2N1cnJlbmN5JzpcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRleHRBbGlnbjogJ3JpZ2h0JyxcbiAgICAgICAgfTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gIH0sXG4gIGlzU29ydGFibGU6IGNvbCA9PiAoXG4gICAgY29sLnZhbHVlVHlwZVxuICAgICYmIChjb2wuc29ydFZhbHVlR2V0dGVyIHx8IGNvbC52YWx1ZUtleVBhdGgpXG4gICAgJiYgIWNvbC5kaXNhYmxlU29ydGluZ1xuICApLFxuICBnZXRTb3J0Q29tcGFyYXRvcjogKGNvbCkgPT4ge1xuICAgIGlmIChjb2wuc29ydENvbXBhcmF0b3IpIHtcbiAgICAgIHJldHVybiBjb2wuc29ydENvbXBhcmF0b3I7XG4gICAgfVxuICAgIHN3aXRjaCAoY29sLnZhbHVlVHlwZSkge1xuICAgICAgY2FzZSAndGV4dCc6XG4gICAgICAgIHJldHVybiAoYSwgYikgPT4gKGEubG9jYWxlQ29tcGFyZSA/IGEubG9jYWxlQ29tcGFyZShiKSA6IDEpO1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgIGNhc2UgJ2N1cnJlbmN5JzpcbiAgICAgICAgcmV0dXJuIChhLCBiKSA9PiAoYSAtIGIpO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIHJldHVybiAoYSwgYikgPT4gKGEgPT09IGIgPyAwIDogKGEgPyAtMSA6IDEpKTtcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICByZXR1cm4gKGEsIGIpID0+IChuZXcgRGF0ZShhKSAtIG5ldyBEYXRlKGIpKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAoYSwgYikgPT4gKGEubG9jYWxlQ29tcGFyZSA/IGEubG9jYWxlQ29tcGFyZShiKSA6IDEpO1xuICAgIH1cbiAgfSxcbiAgZ2V0U29ydFZhbHVlR2V0dGVyOiAoY29sKSA9PiB7XG4gICAgaWYgKGNvbC5zb3J0VmFsdWVHZXR0ZXIpIHtcbiAgICAgIHJldHVybiBjb2wuc29ydFZhbHVlR2V0dGVyO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YSA9PiBkYXRhLmdldEluKGNvbC52YWx1ZUtleVBhdGgpO1xuICB9LFxuICBnZXRWYWx1ZUVtcHR5Q2hlY2tlcjogKGNvbCkgPT4ge1xuICAgIGlmIChjb2wudmFsdWVFbXB0eUNoZWNrZXIpIHtcbiAgICAgIHJldHVybiBjb2wudmFsdWVFbXB0eUNoZWNrZXI7XG4gICAgfVxuICAgIHN3aXRjaCAoY29sLnZhbHVlVHlwZSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgIGNhc2UgJ2N1cnJlbmN5JzpcbiAgICAgICAgcmV0dXJuIHZhbCA9PiAoXG4gICAgICAgICAgdmFsID09PSAnJ1xuICAgICAgICAgIHx8IGlzTmFOKHZhbClcbiAgICAgICAgICB8fCB2YWwgPT09IG51bGxcbiAgICAgICAgICB8fCB2YWwgPT09IHVuZGVmaW5lZFxuICAgICAgICApO1xuICAgICAgY2FzZSAndGV4dCc6XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgY2FzZSAnc2VsZWN0JzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB2YWwgPT4gdmFsID09PSAnJyB8fCB2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQ7XG4gICAgfVxuICB9LFxuICBnZXRGaWx0ZXJNYXRjaGVyOiAoY29sLCBkYXRlRm9ybWF0KSA9PiB7XG4gICAgaWYgKGNvbC5maWx0ZXJNYXRjaGVyKSByZXR1cm4gY29sLmZpbHRlck1hdGNoZXI7XG4gICAgY29uc3QgZ2V0VmFsID0gcm93ID0+IHJvdy5nZXRJbihjb2wudmFsdWVLZXlQYXRoKTtcblxuICAgIHN3aXRjaCAoY29sLnZhbHVlVHlwZSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgcmV0dXJuIChyb3csIGZpbHRlclZhbCkgPT4gcGFyc2VJbnQoZ2V0VmFsKHJvdyksIDEwKSA9PT0gcGFyc2VJbnQoZmlsdGVyVmFsLCAxMCk7XG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICBjYXNlICdjdXJyZW5jeSc6XG4gICAgICAgIHJldHVybiAocm93LCBmaWx0ZXJWYWwpID0+IHBhcnNlRmxvYXQoZmlsdGVyVmFsLnJlcGxhY2UoJywnLCAnLicpKSA9PT0gZ2V0VmFsKHJvdyk7XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgcmV0dXJuIChyb3csIGZpbHRlclZhbCkgPT4ge1xuICAgICAgICAgIGlmIChtb21lbnQoZ2V0VmFsKHJvdykpLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG1vbWVudChnZXRWYWwocm93KSkuZm9ybWF0KGRhdGVGb3JtYXQpID09PSBtb21lbnQoZmlsdGVyVmFsKS5mb3JtYXQoZGF0ZUZvcm1hdCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgY2FzZSAnc2VsZWN0JzpcbiAgICAgICAgcmV0dXJuIChyb3csIGZpbHRlclZhbCkgPT4gZ2V0VmFsKHJvdykgPT09IGZpbHRlclZhbDtcbiAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIChyb3csIGZpbHRlclZhbCkgPT4ge1xuICAgICAgICAgIGxldCBlc2NhcGVkVmFsID0gZmlsdGVyVmFsO1xuICAgICAgICAgIGNvbnN0IHNwZWNpYWxDaGFycyA9ICdbXVxcXFxeJC58PyorKCknO1xuXG4gICAgICAgICAgLy8gSWYgZmlsdGVyIHZhbCBzdGFydHMgd2l0aCBhIFJlZ2V4IHNwZWNpYWwgY2hhcmFjdGVyLCB3ZSBtdXN0IGVzY2FwZSBpdFxuICAgICAgICAgIGlmIChzcGVjaWFsQ2hhcnMuaW5jbHVkZXMoZmlsdGVyVmFsWzBdKSkgZXNjYXBlZFZhbCA9IGBcXFxcJHtmaWx0ZXJWYWx9YDtcbiAgICAgICAgICByZXR1cm4gKG5ldyBSZWdFeHAoZXNjYXBlZFZhbCwgJ2knKSkudGVzdChnZXRWYWwocm93KSk7XG4gICAgICAgIH07XG4gICAgfVxuICB9LFxuICBsb2FkU2VsZWN0ZWRJdGVtczogKGdyaWQpID0+IHtcbiAgICBjb25zdCBzZXNzaW9uSXRlbSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfc2VsZWN0ZWRJdGVtc18ke2dyaWQuaWR9YCk7XG4gICAgaWYgKHNlc3Npb25JdGVtICYmICFncmlkLmRpc2FibGVSZW1lbWJlclNlbGVjdGVkSXRlbXMpIHtcbiAgICAgIHRyeSB7IHJldHVybiBKU09OLnBhcnNlKHNlc3Npb25JdGVtKTsgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhZ3JpZDogZXJyb3IgcGFyc2luZyBzZWxlY3RlZEl0ZW1zIGZyb20gc2Vzc2lvblN0b3JhZ2UnLCBlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFtdO1xuICB9LFxuICBsb2FkR3JpZENvbmZpZzogKGdyaWQsIGNvbHMpID0+IHtcbiAgICBjb25zdCBjb25maWdTdG9yYWdlID0gZ3JpZC5jb25maWdTdG9yYWdlIHx8IHt9O1xuICAgIGNvbnN0IHNvcnRpbmdEYXRhID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShgb2NfZ3JpZF9zb3J0aW5nXyR7Z3JpZC5pZH1gKTtcbiAgICBjb25zdCBmaWx0ZXJEYXRhID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShgb2NfZ3JpZF9maWx0ZXJpbmdfJHtncmlkLmlkfWApO1xuICAgIGNvbnN0IGlzRmlsdGVyaW5nRGF0YSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX2lzRmlsdGVyaW5nXyR7Z3JpZC5pZH1gKTtcbiAgICBjb25zdCBwYWdpbmF0aW9uID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShgb2NfZ3JpZF9wYWdpbmF0aW9uXyR7Z3JpZC5pZH1gKTtcbiAgICBsZXQgbG9hZGVkQ29uZmlnID0ge307XG4gICAgbGV0IGhpZGRlbkNvbHVtbnM7XG4gICAgbGV0IGNvbHVtbk9yZGVyO1xuICAgIGxldCBpc0ZpbHRlcmluZyA9IGZhbHNlO1xuXG4gICAgaWYgKGlzRnVuY3Rpb24oY29uZmlnU3RvcmFnZS5sb2FkKSkge1xuICAgICAgbG9hZGVkQ29uZmlnID0gY29uZmlnU3RvcmFnZS5sb2FkKCk7XG4gICAgfVxuXG4gICAgaWYgKGlzRmlsdGVyaW5nRGF0YSkge1xuICAgICAgaWYgKCFncmlkLmRpc2FibGVSZW1lbWJlcklzRmlsdGVyaW5nKSB7XG4gICAgICAgIHRyeSB7IGlzRmlsdGVyaW5nID0gSlNPTi5wYXJzZShpc0ZpbHRlcmluZ0RhdGEpOyB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhZ3JpZDogZXJyb3IgcGFyc2luZyBpc0ZpbHRlcmluZ0RhdGEgZnJvbSBsb2NhbFN0b3JhZ2UnLCBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZ3JpZC5kZWZhdWx0U2hvd0ZpbHRlcmluZ1Jvdykge1xuICAgICAgaXNGaWx0ZXJpbmcgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAobG9hZGVkQ29uZmlnLmhpZGRlbkNvbHVtbnMpIHtcbiAgICAgIGhpZGRlbkNvbHVtbnMgPSBsb2FkZWRDb25maWcuaGlkZGVuQ29sdW1uczsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBoaWRkZW5Db2x1bW5zSnNvbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX2hpZGRlbkNvbHVtbnNfJHtncmlkLmlkfWApO1xuICAgICAgaWYgKGhpZGRlbkNvbHVtbnNKc29uKSB7XG4gICAgICAgIHRyeSB7IGhpZGRlbkNvbHVtbnMgPSBKU09OLnBhcnNlKGhpZGRlbkNvbHVtbnNKc29uKTsgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgaGlkZGVuQ29sdW1ucyBmcm9tIGxvY2FsU3RvcmFnZScsIGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChsb2FkZWRDb25maWcuY29sdW1uT3JkZXIpIHtcbiAgICAgIGNvbHVtbk9yZGVyID0gbG9hZGVkQ29uZmlnLmNvbHVtbk9yZGVyOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNvbHVtbk9yZGVySnNvbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX2NvbHVtbk9yZGVyXyR7Z3JpZC5pZH1gKTtcbiAgICAgIGlmIChjb2x1bW5PcmRlckpzb24pIHtcbiAgICAgICAgdHJ5IHsgY29sdW1uT3JkZXIgPSBKU09OLnBhcnNlKGNvbHVtbk9yZGVySnNvbik7IH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIGNvbHVtbk9yZGVyIGZyb20gbG9jYWxTdG9yYWdlJywgZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgdmlzaWJsZUNvbHVtbnM6IGdldFZpc2libGVDb2x1bW5zKGNvbHMsIGhpZGRlbkNvbHVtbnMsIGNvbHVtbk9yZGVyKSxcbiAgICAgIGZpbHRlcmluZ0RhdGE6IHtcbiAgICAgICAgaXNGaWx0ZXJpbmcsXG4gICAgICB9LFxuICAgIH07XG4gICAgaWYgKGxvYWRlZENvbmZpZy5jb2x1bW5XaWR0aHMpIHtcbiAgICAgIGNvbmZpZy5jb2x1bW5XaWR0aHMgPSBsb2FkZWRDb25maWcuY29sdW1uV2lkdGhzO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjb2x1bW5XaWR0aHMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgb2NfZ3JpZF9jb2x1bW5XaWR0aHNfJHtncmlkLmlkfWApO1xuICAgICAgaWYgKGNvbHVtbldpZHRocyAmJiAhZ3JpZC5kaXNhYmxlUmVtZW1iZXJDb2x1bW5XaWR0aHMpIHtcbiAgICAgICAgdHJ5IHsgY29uZmlnLmNvbHVtbldpZHRocyA9IEpTT04ucGFyc2UoY29sdW1uV2lkdGhzKTsgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgY29sdW1uV2lkdGhzIGZyb20gbG9jYWxTdG9yYWdlJywgZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNvcnRpbmdEYXRhICYmICFncmlkLmRpc2FibGVSZW1lbWJlclNvcnREYXRhKSB7XG4gICAgICB0cnkgeyBjb25maWcuc29ydGluZ0RhdGEgPSBKU09OLnBhcnNlKHNvcnRpbmdEYXRhKTsgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhZ3JpZDogZXJyb3IgcGFyc2luZyBzb3J0aW5nRGF0YSBmcm9tIHNlc3Npb25TdG9yYWdlJywgZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChmaWx0ZXJEYXRhICYmIGlzRmlsdGVyaW5nICYmICFncmlkLmRpc2FibGVSZW1lbWJlckZpbHRlRGF0YSkge1xuICAgICAgdHJ5IHsgY29uZmlnLmZpbHRlcmluZ0RhdGEuZmlsdGVyRGF0YSA9IEpTT04ucGFyc2UoZmlsdGVyRGF0YSk7IH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgZmlsdGVyRGF0YSBmcm9tIHNlc3Npb25TdG9yYWdlJywgZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChwYWdpbmF0aW9uKSB7XG4gICAgICB0cnkgeyBjb25maWcucGFnaW5hdGlvbiA9IEpTT04ucGFyc2UocGFnaW5hdGlvbik7IH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgcGFnaW5hdGlvbiBmcm9tIHNlc3Npb25TdG9yYWdlJywgZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuc29ydGluZ0RhdGEgJiYgZ3JpZC5kZWZhdWx0U29ydENvbHVtbikge1xuICAgICAgY29uZmlnLnNvcnRpbmdEYXRhID0ge1xuICAgICAgICBzb3J0Q29sdW1uOiBncmlkLmRlZmF1bHRTb3J0Q29sdW1uLFxuICAgICAgICBzb3J0T3JkZXI6IGdyaWQuZGVmYXVsdFNvcnRPcmRlciB8fCAnYXNjJyxcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBjb25maWc7XG4gIH0sXG4gIHNhdmVTZWxlY3RlZEl0ZW1zOiAoZ3JpZCwgc2VsZWN0ZWRJdGVtcykgPT4ge1xuICAgIGlmIChncmlkLmRpc2FibGVSZW1lbWJlclNlbGVjdGVkSXRlbXMpIHJldHVybiBmYWxzZTtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX3NlbGVjdGVkSXRlbXNfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KHNlbGVjdGVkSXRlbXMgfHwgW10pKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgc2F2ZUNvbHVtbldpZHRoczogKGdyaWQsIGNvbHVtbldpZHRocykgPT4ge1xuICAgIGlmIChncmlkLmRpc2FibGVSZW1lbWJlckNvbHVtbldpZHRocykgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghY29sdW1uV2lkdGhzKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGdyaWQuY29uZmlnU3RvcmFnZSAmJiBpc0Z1bmN0aW9uKGdyaWQuY29uZmlnU3RvcmFnZS5zYXZlKSkge1xuICAgICAgZ3JpZC5jb25maWdTdG9yYWdlLnNhdmUoeyBjb2x1bW5XaWR0aHMgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX2NvbHVtbldpZHRoc18ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoY29sdW1uV2lkdGhzKSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBzYXZlQ29sdW1uU2V0dGluZ3M6IChncmlkLCBoaWRkZW5Db2x1bW5zLCBjb2x1bW5PcmRlcikgPT4ge1xuICAgIGlmICghaGlkZGVuQ29sdW1ucyB8fCAhY29sdW1uT3JkZXIpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoZ3JpZC5jb25maWdTdG9yYWdlICYmIGlzRnVuY3Rpb24oZ3JpZC5jb25maWdTdG9yYWdlLnNhdmUpKSB7XG4gICAgICBncmlkLmNvbmZpZ1N0b3JhZ2Uuc2F2ZSh7IGhpZGRlbkNvbHVtbnMsIGNvbHVtbk9yZGVyIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9oaWRkZW5Db2x1bW5zXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShoaWRkZW5Db2x1bW5zKSk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9jb2x1bW5PcmRlcl8ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoY29sdW1uT3JkZXIpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIHNhdmVTb3J0RGF0YTogKGdyaWQsIHNvcnRpbmdEYXRhKSA9PiB7XG4gICAgaWYgKGdyaWQuZGlzYWJsZVJlbWVtYmVyU29ydERhdGEpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIXNvcnRpbmdEYXRhKSByZXR1cm4gZmFsc2U7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9zb3J0aW5nXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShzb3J0aW5nRGF0YSkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBzYXZlRmlsdGVyRGF0YTogKGdyaWQsIGZpbHRlckRhdGEpID0+IHtcbiAgICBpZiAoZ3JpZC5kaXNhYmxlUmVtZW1iZXJGaWx0ZURhdGEpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIWZpbHRlckRhdGEpIHJldHVybiBmYWxzZTtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX2ZpbHRlcmluZ18ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoZmlsdGVyRGF0YSkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBzYXZlSXNGaWx0ZXJpbmc6IChncmlkLCBpc0ZpbHRlcmluZykgPT4ge1xuICAgIGlmIChncmlkLmRpc2FibGVSZW1lbWJlcklzRmlsdGVyaW5nKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGlzRmlsdGVyaW5nID09PSB1bmRlZmluZWQpIHJldHVybiBmYWxzZTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9pc0ZpbHRlcmluZ18ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoaXNGaWx0ZXJpbmcpKTtcbiAgICBpZiAoIWlzRmlsdGVyaW5nKSB7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKGBvY19ncmlkX2ZpbHRlcmluZ18ke2dyaWQuaWR9YCk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBzYXZlUGFnaW5hdGlvblBhZ2U6IChncmlkLCBwYWdpbmF0aW9uKSA9PiB7XG4gICAgaWYgKCFwYWdpbmF0aW9uKSByZXR1cm4gZmFsc2U7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9wYWdpbmF0aW9uXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShwYWdpbmF0aW9uKSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIC8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbiAgY2hlY2tHcmlkUGFyYW06IChncmlkUGFyYW0pID0+IHtcbiAgICBpZiAoZ3JpZFBhcmFtKSB7XG4gICAgICBpZiAoIWdyaWRQYXJhbS5pZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tHcmlkXSBJbnZhbGlkIGBncmlkLmlkYCBwYXJhbWV0ZXIsIHVwZGF0ZSBhY3Rpb24gcGFyYW1ldGVycyB0byBuZXcgZm9ybWF0IScpO1xuICAgICAgfVxuICAgICAgaWYgKCFncmlkUGFyYW0uaWRLZXlQYXRoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignW0dyaWRdIEludmFsaWQgYGdyaWQuaWRLZXlQYXRoYCBwYXJhbWV0ZXIsIHVwZGF0ZSBhY3Rpb24gcGFyYW1ldGVycyB0byBuZXcgZm9ybWF0IScpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tHcmlkXSBJbnZhbGlkIGBncmlkYCBwYXJhbWV0ZXIsIHVwZGF0ZSBhY3Rpb24gcGFyYW1ldGVycyB0byBuZXcgZm9ybWF0IScpO1xuICAgIH1cbiAgfSxcbiAgY2hlY2tDb2x1bW5zUGFyYW06IChjb2x1bW5zUGFyYW0pID0+IHtcbiAgICBpZiAoIWNvbHVtbnNQYXJhbSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdbR3JpZF0gSW52YWxpZCBgY29sdW1uc2AgcGFyYW1ldGVyLCB1cGRhdGUgYWN0aW9uIHBhcmFtZXRlcnMgdG8gbmV3IGZvcm1hdCEnKTtcbiAgICB9XG4gIH0sXG4gIC8vIExvY2FsZSBnZXR0ZXJzLCBzdXBwb3J0IGdyaWQgcGFyYW0gb3IgdXNlciBzdGF0ZSB1c2VkIGluIE9DIGFwcGxpY2F0aW9uc1xuICBnZXRMYW5ndWFnZTogKGdyaWQsIG9jVXNlclN0YXRlKSA9PiB7XG4gICAgaWYgKGdyaWQubGFuZ3VhZ2UgJiYgdHlwZW9mIGdyaWQubGFuZ3VhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZ3JpZC5sYW5ndWFnZTtcbiAgICB9XG4gICAgaWYgKG9jVXNlclN0YXRlKSB7XG4gICAgICByZXR1cm4gb2NVc2VyU3RhdGUuZ2V0SW4oWyd1c2VyJywgJ2xhbmd1YWdlJ10sICdlbicpO1xuICAgIH1cbiAgICByZXR1cm4gJ2VuJztcbiAgfSxcbiAgZ2V0UmVnaW9uOiAoZ3JpZCwgb2NVc2VyU3RhdGUpID0+IHtcbiAgICBjb25zdCBkZWZhdWx0UmVnaW9uID0gJ2VuX0dCJztcbiAgICBpZiAoZ3JpZC5yZWdpb24gJiYgdHlwZW9mIGdyaWQucmVnaW9uID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGdyaWQucmVnaW9uO1xuICAgIH1cbiAgICBpZiAob2NVc2VyU3RhdGUpIHtcbiAgICAgIHJldHVybiBvY1VzZXJTdGF0ZS5nZXRJbihbJ3VzZXInLCAncmVnaW9uJ10sIGRlZmF1bHRSZWdpb24pO1xuICAgIH1cbiAgICByZXR1cm4gZGVmYXVsdFJlZ2lvbjtcbiAgfSxcbiAgZ2V0RGF0ZUZvcm1hdDogKGdyaWQsIG9jVXNlclN0YXRlKSA9PiB7XG4gICAgaWYgKGdyaWQuZGF0ZUZvcm1hdCAmJiB0eXBlb2YgZ3JpZC5kYXRlRm9ybWF0ID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGdyaWQuZGF0ZUZvcm1hdC50b1VwcGVyQ2FzZSgpO1xuICAgIH1cbiAgICBpZiAob2NVc2VyU3RhdGUpIHtcbiAgICAgIHJldHVybiBvY1VzZXJTdGF0ZS5nZXRJbihbJ2xvY2FsZUZvcm1hdCcsICdkYXRlRm9ybWF0J10sICdMJyk7XG4gICAgfVxuICAgIHJldHVybiAnTCc7XG4gIH0sXG4gIGdldFRob3VzYW5kU2VwYXJhdG9yOiAoZ3JpZCwgb2NVc2VyU3RhdGUpID0+IHtcbiAgICBpZiAoZ3JpZC50aG91c2FuZFNlcGFyYXRvciAmJiB0eXBlb2YgZ3JpZC5sYW5ndWFnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBncmlkLnRob3VzYW5kU2VwYXJhdG9yO1xuICAgIH1cbiAgICBpZiAob2NVc2VyU3RhdGUpIHtcbiAgICAgIHJldHVybiBvY1VzZXJTdGF0ZS5nZXRJbihbJ2xvY2FsZUZvcm1hdCcsICd0aG91c2FuZFNlcGFyYXRvciddLCAnJyk7XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfSxcbiAgZ2V0RGVjaW1hbFNlcGFyYXRvcjogKGdyaWQsIG9jVXNlclN0YXRlKSA9PiB7XG4gICAgaWYgKGdyaWQuZGVjaW1hbFNlcGFyYXRvciAmJiB0eXBlb2YgZ3JpZC5sYW5ndWFnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBncmlkLmRlY2ltYWxTZXBhcmF0b3I7XG4gICAgfVxuICAgIGlmIChvY1VzZXJTdGF0ZSkge1xuICAgICAgcmV0dXJuIG9jVXNlclN0YXRlLmdldEluKFsnbG9jYWxlRm9ybWF0JywgJ2RlY2ltYWxTZXBhcmF0b3InXSwgJy4nKTtcbiAgICB9XG4gICAgcmV0dXJuICcuJztcbiAgfSxcbiAgbm9ybWFsaXplRmlsdGVyaW5nRGF0YTogKGZpbHRlcmluZ0RhdGEpID0+IHtcbiAgICBsZXQgbmV3RmlsdGVyaW5nRGF0YSA9IE1hcCh7IGlzRmlsdGVyaW5nOiBmYWxzZSB9KTtcbiAgICBpZiAoIWZpbHRlcmluZ0RhdGEpIHJldHVybiBuZXdGaWx0ZXJpbmdEYXRhO1xuXG4gICAgY29uc3Qgb2xkRmlsdGVyaW5nRGF0YSA9IE1hcC5pc01hcChmaWx0ZXJpbmdEYXRhKSA/IGZpbHRlcmluZ0RhdGEgOiBmcm9tSlMoZmlsdGVyaW5nRGF0YSk7XG4gICAgY29uc3QgaXNGaWx0ZXJpbmcgPSBvbGRGaWx0ZXJpbmdEYXRhLmdldCgnaXNGaWx0ZXJpbmcnLCBmYWxzZSk7XG4gICAgY29uc3QgZmlsdGVyRGF0YSA9IG9sZEZpbHRlcmluZ0RhdGEuZ2V0KCdmaWx0ZXJEYXRhJywgbnVsbCk7XG5cbiAgICBpZiAoaXNGaWx0ZXJpbmcgJiYgZmlsdGVyRGF0YSAmJiBNYXAuaXNNYXAoZmlsdGVyRGF0YSkpIHtcbiAgICAgIG5ld0ZpbHRlcmluZ0RhdGEgPSBuZXdGaWx0ZXJpbmdEYXRhXG4gICAgICAgIC5zZXQoJ2lzRmlsdGVyaW5nJywgdHJ1ZSlcbiAgICAgICAgLnNldCgnZmlsdGVyRGF0YScsIGZpbHRlckRhdGEpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXdGaWx0ZXJpbmdEYXRhO1xuICB9LFxuICAvKlxuICAgKiBAZnVuY3Rpb24gdmlzaWJsZUNvbHVtbnNcbiAgICogQGRlc2MgIFJldHVybnMgZWl0aGVyIHZpc2libGUgY29sdW1ucyAoaWYgc29tZSBjb2x1bW5zIGFyZSBoaWRkZW4gKVxuICAgKiAgICAgICAgb3IgZ3JpZCBkZWZhdWx0IGNvbHVtbnMuXG4gICAqIEBwYXJhbSBvcmlnQ29sdW1ucyBBcnJheSBvZiBHcmlkIG9yaWdpbmFsIGNvbHVtbnMgb2JqZWN0c1xuICAgKiBAcGFyYW0gdmlzaWJsZUNvbHVtbnMgQXJyYXkgb2YgR3JpZCB2aXNpYmxlIGNvbHVtbnMgdmFsdWVLZXlQYXRoc1xuICAgKiBAcmV0dXJucyBBcnJheSBvZiBjb2x1bW4gb2JqZWN0cyBjdXJyZW50bHkgdmlzaWJsZSBmb3IgdXNlci5cbiAgKi9cbiAgdmlzaWJsZUNvbHVtbnM6IChvcmlnQ29sdW1ucywgdmlzaWJsZUNvbHVtbnMpID0+IHtcbiAgICBpZiAoIXZpc2libGVDb2x1bW5zKSByZXR1cm4gb3JpZ0NvbHVtbnM7XG4gICAgY29uc3QgZmlsdGVyZWQgPSB2aXNpYmxlQ29sdW1ucy5tYXAoICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICBzZWFyY2hDb2wgPT4gb3JpZ0NvbHVtbnMuZmluZCggIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgLy8gdmFsdWVLZXlQYXRoIGlzIGpvaW5lZCBoZXJlIGFzIGl0IGNhbiBiZSBhbiBhcnJheSBsaWtlIFsna2V5MScsICdrZXkyJ10uXG4gICAgICAgIC8vIHNlYXJjaENvbCBpcyBzaW1pbGFybHkgam9pbmVkIGluIG9uQ2VsbEtleURvd24gaW4gZGF0YWdyaWQuY29tcG9uZW50LmpzeFxuICAgICAgICBjb2wgPT4gSlNPTi5zdHJpbmdpZnkoY29sLnZhbHVlS2V5UGF0aC5qb2luKCcvJykpID09PSBKU09OLnN0cmluZ2lmeShzZWFyY2hDb2wpKSk7XG4gICAgcmV0dXJuIGZpbHRlcmVkLnRvSlMoKTtcbiAgfSxcbn07XG4iXX0=