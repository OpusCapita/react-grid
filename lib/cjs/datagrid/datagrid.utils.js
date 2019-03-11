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
    if (col.componentType === 'select' || col.componentType === 'multiselect') {
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
    if (col.componentType === 'multiselect') {
      return function (val) {
        return val === '' || val === null || val === undefined || val.length === 0;
      };
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

    if (col.componentType === 'multiselect') {
      return function (row, filterVal) {
        var value = getVal(row);
        // session storage content is converted to immutable and multiselect
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
          return parseInt(getVal(row), 10) === parseInt(filterVal, 10);
        };
      case 'float':
      case 'currency':
        return function (row, filterVal) {
          var value = getVal(row);
          return value && value.includes(filterVal);
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
        // select is componentType not valueType -> the case could be removed
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
    var page = sessionStorage.getItem('oc_grid_page_' + grid.id);
    var rowsOnPage = sessionStorage.getItem('oc_grid_rowsOnPage_' + grid.id);
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
  savePage: function savePage(grid, page) {
    if (!page) return false;
    sessionStorage.setItem('oc_grid_page_' + grid.id, JSON.stringify(page));
    return true;
  },
  saveRowsOnPage: function saveRowsOnPage(grid, rowsOnPage) {
    if (!rowsOnPage) return false;
    sessionStorage.setItem('oc_grid_rowsOnPage_' + grid.id, JSON.stringify(rowsOnPage));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC51dGlscy5qcyJdLCJuYW1lcyI6WyJnZXRDb2x1bW5LZXkiLCJjb2wiLCJjb2x1bW5LZXkiLCJ2YWx1ZUtleVBhdGgiLCJqb2luIiwiZ2V0VmlzaWJsZUNvbHVtbnMiLCJjb2xzIiwiaGlkZGVuQ29sdW1ucyIsImNvbHVtbk9yZGVyIiwib3JkZXJlZENvbHVtbkxpc3QiLCJmb3JFYWNoIiwiaSIsImNvbE9yZGVySWR4IiwiaW5kZXhPZiIsImRlZmF1bHRIaWRkZW4iLCJpc0hpZGRlbiIsIm9yZGVyIiwicHVzaCIsInNvcnQiLCJhIiwiYiIsIm1hcCIsIml0ZW0iLCJnZXRDb2x1bW5EZWZhdWx0VmFsdWVzIiwiY29sdW1uRGVmYXVsdFZhbHVlcyIsImRlZmF1bHRWYWx1ZSIsInVuZGVmaW5lZCIsImdldENlbGxTdHlsZUJ5Q29sIiwiYWxpZ24iLCJ0ZXh0QWxpZ24iLCJjb21wb25lbnRUeXBlIiwidmFsdWVUeXBlIiwiaXNTb3J0YWJsZSIsInNvcnRWYWx1ZUdldHRlciIsImRpc2FibGVTb3J0aW5nIiwiZ2V0U29ydENvbXBhcmF0b3IiLCJzb3J0Q29tcGFyYXRvciIsImxvY2FsZUNvbXBhcmUiLCJEYXRlIiwiZ2V0U29ydFZhbHVlR2V0dGVyIiwiZGF0YSIsImdldEluIiwiZ2V0VmFsdWVFbXB0eUNoZWNrZXIiLCJ2YWx1ZUVtcHR5Q2hlY2tlciIsInZhbCIsImxlbmd0aCIsImdldEZpbHRlck1hdGNoZXIiLCJkYXRlRm9ybWF0IiwiZmlsdGVyTWF0Y2hlciIsImdldFZhbCIsInJvdyIsImZpbHRlclZhbCIsInZhbHVlIiwiZmlsdGVycyIsInRvSlMiLCJzb21lIiwiZmlsdGVyIiwicGFyc2VJbnQiLCJpbmNsdWRlcyIsImlzVmFsaWQiLCJmb3JtYXQiLCJlc2NhcGVkVmFsIiwic3BlY2lhbENoYXJzIiwiUmVnRXhwIiwidGVzdCIsImxvYWRTZWxlY3RlZEl0ZW1zIiwiZ3JpZCIsInNlc3Npb25JdGVtIiwic2Vzc2lvblN0b3JhZ2UiLCJnZXRJdGVtIiwiaWQiLCJkaXNhYmxlUmVtZW1iZXJTZWxlY3RlZEl0ZW1zIiwiSlNPTiIsInBhcnNlIiwiZSIsImNvbnNvbGUiLCJlcnJvciIsImxvYWRHcmlkQ29uZmlnIiwiY29uZmlnU3RvcmFnZSIsInNvcnRpbmdEYXRhIiwiZmlsdGVyRGF0YSIsImlzRmlsdGVyaW5nRGF0YSIsImxvY2FsU3RvcmFnZSIsInBhZ2UiLCJyb3dzT25QYWdlIiwibG9hZGVkQ29uZmlnIiwiaXNGaWx0ZXJpbmciLCJsb2FkIiwiZGlzYWJsZVJlbWVtYmVySXNGaWx0ZXJpbmciLCJkZWZhdWx0U2hvd0ZpbHRlcmluZ1JvdyIsImhpZGRlbkNvbHVtbnNKc29uIiwiY29sdW1uT3JkZXJKc29uIiwiY29uZmlnIiwidmlzaWJsZUNvbHVtbnMiLCJmaWx0ZXJpbmdEYXRhIiwiY29sdW1uV2lkdGhzIiwiZGlzYWJsZVJlbWVtYmVyQ29sdW1uV2lkdGhzIiwiZGlzYWJsZVJlbWVtYmVyU29ydERhdGEiLCJkaXNhYmxlUmVtZW1iZXJGaWx0ZURhdGEiLCJkZWZhdWx0U29ydENvbHVtbiIsInNvcnRDb2x1bW4iLCJzb3J0T3JkZXIiLCJkZWZhdWx0U29ydE9yZGVyIiwic2F2ZVNlbGVjdGVkSXRlbXMiLCJzZWxlY3RlZEl0ZW1zIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsInNhdmVDb2x1bW5XaWR0aHMiLCJzYXZlIiwic2F2ZUNvbHVtblNldHRpbmdzIiwic2F2ZVNvcnREYXRhIiwic2F2ZUZpbHRlckRhdGEiLCJzYXZlSXNGaWx0ZXJpbmciLCJyZW1vdmVJdGVtIiwic2F2ZVBhZ2UiLCJzYXZlUm93c09uUGFnZSIsImNoZWNrR3JpZFBhcmFtIiwiZ3JpZFBhcmFtIiwiRXJyb3IiLCJpZEtleVBhdGgiLCJjaGVja0NvbHVtbnNQYXJhbSIsImNvbHVtbnNQYXJhbSIsImdldExhbmd1YWdlIiwib2NVc2VyU3RhdGUiLCJsYW5ndWFnZSIsImdldFJlZ2lvbiIsImRlZmF1bHRSZWdpb24iLCJyZWdpb24iLCJnZXREYXRlRm9ybWF0IiwidG9VcHBlckNhc2UiLCJnZXRUaG91c2FuZFNlcGFyYXRvciIsInRob3VzYW5kU2VwYXJhdG9yIiwiZ2V0RGVjaW1hbFNlcGFyYXRvciIsImRlY2ltYWxTZXBhcmF0b3IiLCJub3JtYWxpemVGaWx0ZXJpbmdEYXRhIiwibmV3RmlsdGVyaW5nRGF0YSIsIm9sZEZpbHRlcmluZ0RhdGEiLCJNYXAiLCJpc01hcCIsImdldCIsInNldCIsIm9yaWdDb2x1bW5zIiwiZmlsdGVyZWQiLCJmaW5kIiwic2VhcmNoQ29sIl0sIm1hcHBpbmdzIjoiOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBSkE7QUFNQSxJQUFNQSxlQUFlLFNBQWZBLFlBQWU7QUFBQSxTQUNuQkMsSUFBSUMsU0FBSixJQUFpQkQsSUFBSUUsWUFBSixDQUFpQkMsSUFBakIsQ0FBc0IsR0FBdEIsQ0FERTtBQUFBLENBQXJCOztBQUlBLElBQU1DLG9CQUFvQixTQUFwQkEsaUJBQW9CLENBQUNDLElBQUQsRUFBZ0Q7QUFBQSxNQUF6Q0MsYUFBeUMsdUVBQXpCLEVBQXlCO0FBQUEsTUFBckJDLFdBQXFCLHVFQUFQLEVBQU87O0FBQ3hFLE1BQU1DLG9CQUFvQixFQUExQjtBQUNBSCxPQUFLSSxPQUFMLENBQWEsVUFBQ1QsR0FBRCxFQUFNVSxDQUFOLEVBQVk7QUFDdkIsUUFBTVQsWUFBWUYsYUFBYUMsR0FBYixDQUFsQjtBQUNBLFFBQU1XLGNBQWNKLFlBQVlLLE9BQVosQ0FBb0JYLFNBQXBCLENBQXBCO0FBQ0EsUUFBTVksZ0JBQWdCYixJQUFJYyxRQUFKLElBQWdCSCxnQkFBZ0IsQ0FBQyxDQUF2RDtBQUNBLFFBQUlFLGlCQUFpQlAsY0FBY00sT0FBZCxDQUFzQlgsU0FBdEIsSUFBbUMsQ0FBQyxDQUF6RCxFQUE0RDtBQUMxRDtBQUNEO0FBQ0QsUUFBTWMsUUFBUUosZ0JBQWdCLENBQUMsQ0FBakIsR0FBcUJBLFdBQXJCLEdBQW9DRCxJQUFJLENBQXREO0FBQ0FGLHNCQUFrQlEsSUFBbEIsQ0FB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LEVBQW1CO0FBQzlCO0FBQ0E7QUFDQTtBQUFBLGVBQU92RSxLQUFLa0MsU0FBTCxDQUFlekcsSUFBSUUsWUFBSixDQUFpQkMsSUFBakIsQ0FBc0IsR0FBdEIsQ0FBZixNQUErQ29FLEtBQUtrQyxTQUFMLENBQWVzQyxTQUFmLENBQXREO0FBQUEsT0FIVyxDQUFiO0FBQUEsS0FEZSxDQUFqQjtBQUtBLFdBQU9GLFNBQVN4RixJQUFULEVBQVA7QUFDRDtBQTlZWSxDIiwiZmlsZSI6ImRhdGFncmlkLnV0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tbmVzdGVkLXRlcm5hcnkgKi9cbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCBpc05hTiBmcm9tICdsb2Rhc2gvaXNOYU4nO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJ3V0aWwnO1xuaW1wb3J0IHsgTWFwLCBmcm9tSlMgfSBmcm9tICdpbW11dGFibGUnO1xuXG5jb25zdCBnZXRDb2x1bW5LZXkgPSBjb2wgPT4gKFxuICBjb2wuY29sdW1uS2V5IHx8IGNvbC52YWx1ZUtleVBhdGguam9pbignLycpXG4pO1xuXG5jb25zdCBnZXRWaXNpYmxlQ29sdW1ucyA9IChjb2xzLCBoaWRkZW5Db2x1bW5zID0gW10sIGNvbHVtbk9yZGVyID0gW10pID0+IHtcbiAgY29uc3Qgb3JkZXJlZENvbHVtbkxpc3QgPSBbXTtcbiAgY29scy5mb3JFYWNoKChjb2wsIGkpID0+IHtcbiAgICBjb25zdCBjb2x1bW5LZXkgPSBnZXRDb2x1bW5LZXkoY29sKTtcbiAgICBjb25zdCBjb2xPcmRlcklkeCA9IGNvbHVtbk9yZGVyLmluZGV4T2YoY29sdW1uS2V5KTtcbiAgICBjb25zdCBkZWZhdWx0SGlkZGVuID0gY29sLmlzSGlkZGVuICYmIGNvbE9yZGVySWR4ID09PSAtMTtcbiAgICBpZiAoZGVmYXVsdEhpZGRlbiB8fCBoaWRkZW5Db2x1bW5zLmluZGV4T2YoY29sdW1uS2V5KSA+IC0xKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG9yZGVyID0gY29sT3JkZXJJZHggIT09IC0xID8gY29sT3JkZXJJZHggOiAoaSArIDEpO1xuICAgIG9yZGVyZWRDb2x1bW5MaXN0LnB1c2goe1xuICAgICAgY29sdW1uS2V5LFxuICAgICAgb3JkZXIsXG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gb3JkZXJlZENvbHVtbkxpc3Quc29ydCgoYSwgYikgPT4gKGEub3JkZXIgLSBiLm9yZGVyKSkubWFwKGl0ZW0gPT4gaXRlbS5jb2x1bW5LZXkpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBnZXRDb2x1bW5LZXksXG4gIGdldENvbHVtbkRlZmF1bHRWYWx1ZXM6IChjb2xzKSA9PiB7XG4gICAgY29uc3QgY29sdW1uRGVmYXVsdFZhbHVlcyA9IHt9O1xuICAgIGNvbHMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICBpZiAoY29sLmRlZmF1bHRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbHVtbkRlZmF1bHRWYWx1ZXNbZ2V0Q29sdW1uS2V5KGNvbCldID0gY29sLmRlZmF1bHRWYWx1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gY29sdW1uRGVmYXVsdFZhbHVlcztcbiAgfSxcbiAgZ2V0Q2VsbFN0eWxlQnlDb2w6IChjb2wpID0+IHtcbiAgICBpZiAoY29sLmFsaWduKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0ZXh0QWxpZ246IGNvbC5hbGlnbixcbiAgICAgIH07XG4gICAgfVxuICAgIC8vIE5vIGRlZmF1bHQgYWxpZ24gaWYgY29tcG9uZW50IGlzIHNlbGVjdFxuICAgIC8vIEJlY2F1c2UgcmVuZGVyZWQgZGF0YSBpcyBtb3N0IGxpa2VseSB0ZXh0XG4gICAgLy8gRXZlbiBpZiB2YWx1ZVR5cGUgaXMgbnVtYmVyXG4gICAgaWYgKGNvbC5jb21wb25lbnRUeXBlID09PSAnc2VsZWN0JyB8fCBjb2wuY29tcG9uZW50VHlwZSA9PT0gJ211bHRpc2VsZWN0Jykge1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgICBzd2l0Y2ggKGNvbC52YWx1ZVR5cGUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICBjYXNlICdjdXJyZW5jeSc6XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0ZXh0QWxpZ246ICdyaWdodCcsXG4gICAgICAgIH07XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4ge307XG4gICAgfVxuICB9LFxuICBpc1NvcnRhYmxlOiBjb2wgPT4gKFxuICAgIGNvbC52YWx1ZVR5cGVcbiAgICAmJiAoY29sLnNvcnRWYWx1ZUdldHRlciB8fCBjb2wudmFsdWVLZXlQYXRoKVxuICAgICYmICFjb2wuZGlzYWJsZVNvcnRpbmdcbiAgKSxcbiAgZ2V0U29ydENvbXBhcmF0b3I6IChjb2wpID0+IHtcbiAgICBpZiAoY29sLnNvcnRDb21wYXJhdG9yKSB7XG4gICAgICByZXR1cm4gY29sLnNvcnRDb21wYXJhdG9yO1xuICAgIH1cbiAgICBzd2l0Y2ggKGNvbC52YWx1ZVR5cGUpIHtcbiAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgICByZXR1cm4gKGEsIGIpID0+IChhLmxvY2FsZUNvbXBhcmUgPyBhLmxvY2FsZUNvbXBhcmUoYikgOiAxKTtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICBjYXNlICdjdXJyZW5jeSc6XG4gICAgICAgIHJldHVybiAoYSwgYikgPT4gKGEgLSBiKTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICByZXR1cm4gKGEsIGIpID0+IChhID09PSBiID8gMCA6IChhID8gLTEgOiAxKSk7XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgcmV0dXJuIChhLCBiKSA9PiAobmV3IERhdGUoYSkgLSBuZXcgRGF0ZShiKSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gKGEsIGIpID0+IChhLmxvY2FsZUNvbXBhcmUgPyBhLmxvY2FsZUNvbXBhcmUoYikgOiAxKTtcbiAgICB9XG4gIH0sXG4gIGdldFNvcnRWYWx1ZUdldHRlcjogKGNvbCkgPT4ge1xuICAgIGlmIChjb2wuc29ydFZhbHVlR2V0dGVyKSB7XG4gICAgICByZXR1cm4gY29sLnNvcnRWYWx1ZUdldHRlcjtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGEgPT4gZGF0YS5nZXRJbihjb2wudmFsdWVLZXlQYXRoKTtcbiAgfSxcbiAgZ2V0VmFsdWVFbXB0eUNoZWNrZXI6IChjb2wpID0+IHtcbiAgICBpZiAoY29sLnZhbHVlRW1wdHlDaGVja2VyKSB7XG4gICAgICByZXR1cm4gY29sLnZhbHVlRW1wdHlDaGVja2VyO1xuICAgIH1cbiAgICBpZiAoY29sLmNvbXBvbmVudFR5cGUgPT09ICdtdWx0aXNlbGVjdCcpIHtcbiAgICAgIHJldHVybiB2YWwgPT4gdmFsID09PSAnJyB8fCB2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQgfHwgdmFsLmxlbmd0aCA9PT0gMDtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGNvbC52YWx1ZVR5cGUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICBjYXNlICdjdXJyZW5jeSc6XG4gICAgICAgIHJldHVybiB2YWwgPT4gKFxuICAgICAgICAgIHZhbCA9PT0gJydcbiAgICAgICAgICB8fCBpc05hTih2YWwpXG4gICAgICAgICAgfHwgdmFsID09PSBudWxsXG4gICAgICAgICAgfHwgdmFsID09PSB1bmRlZmluZWRcbiAgICAgICAgKTtcbiAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgIGNhc2UgJ3NlbGVjdCc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdmFsID0+IHZhbCA9PT0gJycgfHwgdmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfSxcbiAgZ2V0RmlsdGVyTWF0Y2hlcjogKGNvbCwgZGF0ZUZvcm1hdCkgPT4ge1xuICAgIGlmIChjb2wuZmlsdGVyTWF0Y2hlcikgcmV0dXJuIGNvbC5maWx0ZXJNYXRjaGVyO1xuICAgIGNvbnN0IGdldFZhbCA9IHJvdyA9PiByb3cuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG5cbiAgICBpZiAoY29sLmNvbXBvbmVudFR5cGUgPT09ICdtdWx0aXNlbGVjdCcpIHtcbiAgICAgIHJldHVybiAocm93LCBmaWx0ZXJWYWwpID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBnZXRWYWwocm93KTtcbiAgICAgICAgLy8gc2Vzc2lvbiBzdG9yYWdlIGNvbnRlbnQgaXMgY29udmVydGVkIHRvIGltbXV0YWJsZSBhbmQgbXVsdGlzZWxlY3RcbiAgICAgICAgLy8gZmlsdGVycyBpcyB0aGVuIGxpc3Qgb3RoZXJ3aXNlIGFycmF5XG4gICAgICAgIGNvbnN0IGZpbHRlcnMgPSBmaWx0ZXJWYWwgJiYgZmlsdGVyVmFsLnRvSlMgPyBmaWx0ZXJWYWwudG9KUygpIDogZmlsdGVyVmFsO1xuICAgICAgICByZXR1cm4gZmlsdGVycy5zb21lKGZpbHRlciA9PiBmaWx0ZXIudmFsdWUgPT09IHZhbHVlKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgc3dpdGNoIChjb2wudmFsdWVUeXBlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICByZXR1cm4gKHJvdywgZmlsdGVyVmFsKSA9PiBwYXJzZUludChnZXRWYWwocm93KSwgMTApID09PSBwYXJzZUludChmaWx0ZXJWYWwsIDEwKTtcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgIGNhc2UgJ2N1cnJlbmN5JzpcbiAgICAgICAgcmV0dXJuIChyb3csIGZpbHRlclZhbCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gZ2V0VmFsKHJvdyk7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlICYmIHZhbHVlLmluY2x1ZGVzKGZpbHRlclZhbCk7XG4gICAgICAgIH07XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgcmV0dXJuIChyb3csIGZpbHRlclZhbCkgPT4ge1xuICAgICAgICAgIGlmIChtb21lbnQoZ2V0VmFsKHJvdykpLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG1vbWVudChnZXRWYWwocm93KSkuZm9ybWF0KGRhdGVGb3JtYXQpID09PSBtb21lbnQoZmlsdGVyVmFsKS5mb3JtYXQoZGF0ZUZvcm1hdCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgY2FzZSAnc2VsZWN0JzpcbiAgICAgICAgLy8gc2VsZWN0IGlzIGNvbXBvbmVudFR5cGUgbm90IHZhbHVlVHlwZSAtPiB0aGUgY2FzZSBjb3VsZCBiZSByZW1vdmVkXG4gICAgICAgIHJldHVybiAocm93LCBmaWx0ZXJWYWwpID0+IGdldFZhbChyb3cpID09PSBmaWx0ZXJWYWw7XG4gICAgICBjYXNlICd0ZXh0JzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAocm93LCBmaWx0ZXJWYWwpID0+IHtcbiAgICAgICAgICBsZXQgZXNjYXBlZFZhbCA9IGZpbHRlclZhbDtcbiAgICAgICAgICBjb25zdCBzcGVjaWFsQ2hhcnMgPSAnW11cXFxcXiQufD8qKygpJztcblxuICAgICAgICAgIC8vIElmIGZpbHRlciB2YWwgc3RhcnRzIHdpdGggYSBSZWdleCBzcGVjaWFsIGNoYXJhY3Rlciwgd2UgbXVzdCBlc2NhcGUgaXRcbiAgICAgICAgICBpZiAoc3BlY2lhbENoYXJzLmluY2x1ZGVzKGZpbHRlclZhbFswXSkpIGVzY2FwZWRWYWwgPSBgXFxcXCR7ZmlsdGVyVmFsfWA7XG4gICAgICAgICAgcmV0dXJuIChuZXcgUmVnRXhwKGVzY2FwZWRWYWwsICdpJykpLnRlc3QoZ2V0VmFsKHJvdykpO1xuICAgICAgICB9O1xuICAgIH1cbiAgfSxcbiAgbG9hZFNlbGVjdGVkSXRlbXM6IChncmlkKSA9PiB7XG4gICAgY29uc3Qgc2Vzc2lvbkl0ZW0gPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX3NlbGVjdGVkSXRlbXNfJHtncmlkLmlkfWApO1xuICAgIGlmIChzZXNzaW9uSXRlbSAmJiAhZ3JpZC5kaXNhYmxlUmVtZW1iZXJTZWxlY3RlZEl0ZW1zKSB7XG4gICAgICB0cnkgeyByZXR1cm4gSlNPTi5wYXJzZShzZXNzaW9uSXRlbSk7IH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgc2VsZWN0ZWRJdGVtcyBmcm9tIHNlc3Npb25TdG9yYWdlJywgZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBbXTtcbiAgfSxcbiAgbG9hZEdyaWRDb25maWc6IChncmlkLCBjb2xzKSA9PiB7XG4gICAgY29uc3QgY29uZmlnU3RvcmFnZSA9IGdyaWQuY29uZmlnU3RvcmFnZSB8fCB7fTtcbiAgICBjb25zdCBzb3J0aW5nRGF0YSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfc29ydGluZ18ke2dyaWQuaWR9YCk7XG4gICAgY29uc3QgZmlsdGVyRGF0YSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfZmlsdGVyaW5nXyR7Z3JpZC5pZH1gKTtcbiAgICBjb25zdCBpc0ZpbHRlcmluZ0RhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgb2NfZ3JpZF9pc0ZpbHRlcmluZ18ke2dyaWQuaWR9YCk7XG4gICAgY29uc3QgcGFnZSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfcGFnZV8ke2dyaWQuaWR9YCk7XG4gICAgY29uc3Qgcm93c09uUGFnZSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfcm93c09uUGFnZV8ke2dyaWQuaWR9YCk7XG4gICAgbGV0IGxvYWRlZENvbmZpZyA9IHt9O1xuICAgIGxldCBoaWRkZW5Db2x1bW5zO1xuICAgIGxldCBjb2x1bW5PcmRlcjtcbiAgICBsZXQgaXNGaWx0ZXJpbmcgPSBmYWxzZTtcblxuICAgIGlmIChpc0Z1bmN0aW9uKGNvbmZpZ1N0b3JhZ2UubG9hZCkpIHtcbiAgICAgIGxvYWRlZENvbmZpZyA9IGNvbmZpZ1N0b3JhZ2UubG9hZCgpO1xuICAgIH1cblxuICAgIGlmIChpc0ZpbHRlcmluZ0RhdGEpIHtcbiAgICAgIGlmICghZ3JpZC5kaXNhYmxlUmVtZW1iZXJJc0ZpbHRlcmluZykge1xuICAgICAgICB0cnkgeyBpc0ZpbHRlcmluZyA9IEpTT04ucGFyc2UoaXNGaWx0ZXJpbmdEYXRhKTsgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgaXNGaWx0ZXJpbmdEYXRhIGZyb20gbG9jYWxTdG9yYWdlJywgZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGdyaWQuZGVmYXVsdFNob3dGaWx0ZXJpbmdSb3cpIHtcbiAgICAgIGlzRmlsdGVyaW5nID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGxvYWRlZENvbmZpZy5oaWRkZW5Db2x1bW5zKSB7XG4gICAgICBoaWRkZW5Db2x1bW5zID0gbG9hZGVkQ29uZmlnLmhpZGRlbkNvbHVtbnM7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaGlkZGVuQ29sdW1uc0pzb24gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgb2NfZ3JpZF9oaWRkZW5Db2x1bW5zXyR7Z3JpZC5pZH1gKTtcbiAgICAgIGlmIChoaWRkZW5Db2x1bW5zSnNvbikge1xuICAgICAgICB0cnkgeyBoaWRkZW5Db2x1bW5zID0gSlNPTi5wYXJzZShoaWRkZW5Db2x1bW5zSnNvbik7IH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIGhpZGRlbkNvbHVtbnMgZnJvbSBsb2NhbFN0b3JhZ2UnLCBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAobG9hZGVkQ29uZmlnLmNvbHVtbk9yZGVyKSB7XG4gICAgICBjb2x1bW5PcmRlciA9IGxvYWRlZENvbmZpZy5jb2x1bW5PcmRlcjsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjb2x1bW5PcmRlckpzb24gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgb2NfZ3JpZF9jb2x1bW5PcmRlcl8ke2dyaWQuaWR9YCk7XG4gICAgICBpZiAoY29sdW1uT3JkZXJKc29uKSB7XG4gICAgICAgIHRyeSB7IGNvbHVtbk9yZGVyID0gSlNPTi5wYXJzZShjb2x1bW5PcmRlckpzb24pOyB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhZ3JpZDogZXJyb3IgcGFyc2luZyBjb2x1bW5PcmRlciBmcm9tIGxvY2FsU3RvcmFnZScsIGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGNvbmZpZyA9IHtcbiAgICAgIHZpc2libGVDb2x1bW5zOiBnZXRWaXNpYmxlQ29sdW1ucyhjb2xzLCBoaWRkZW5Db2x1bW5zLCBjb2x1bW5PcmRlciksXG4gICAgICBmaWx0ZXJpbmdEYXRhOiB7XG4gICAgICAgIGlzRmlsdGVyaW5nLFxuICAgICAgfSxcbiAgICB9O1xuICAgIGlmIChsb2FkZWRDb25maWcuY29sdW1uV2lkdGhzKSB7XG4gICAgICBjb25maWcuY29sdW1uV2lkdGhzID0gbG9hZGVkQ29uZmlnLmNvbHVtbldpZHRocztcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgY29sdW1uV2lkdGhzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfY29sdW1uV2lkdGhzXyR7Z3JpZC5pZH1gKTtcbiAgICAgIGlmIChjb2x1bW5XaWR0aHMgJiYgIWdyaWQuZGlzYWJsZVJlbWVtYmVyQ29sdW1uV2lkdGhzKSB7XG4gICAgICAgIHRyeSB7IGNvbmZpZy5jb2x1bW5XaWR0aHMgPSBKU09OLnBhcnNlKGNvbHVtbldpZHRocyk7IH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIGNvbHVtbldpZHRocyBmcm9tIGxvY2FsU3RvcmFnZScsIGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzb3J0aW5nRGF0YSAmJiAhZ3JpZC5kaXNhYmxlUmVtZW1iZXJTb3J0RGF0YSkge1xuICAgICAgdHJ5IHsgY29uZmlnLnNvcnRpbmdEYXRhID0gSlNPTi5wYXJzZShzb3J0aW5nRGF0YSk7IH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgc29ydGluZ0RhdGEgZnJvbSBzZXNzaW9uU3RvcmFnZScsIGUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZmlsdGVyRGF0YSAmJiBpc0ZpbHRlcmluZyAmJiAhZ3JpZC5kaXNhYmxlUmVtZW1iZXJGaWx0ZURhdGEpIHtcbiAgICAgIHRyeSB7IGNvbmZpZy5maWx0ZXJpbmdEYXRhLmZpbHRlckRhdGEgPSBKU09OLnBhcnNlKGZpbHRlckRhdGEpOyB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIGZpbHRlckRhdGEgZnJvbSBzZXNzaW9uU3RvcmFnZScsIGUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocGFnZSkge1xuICAgICAgdHJ5IHsgY29uZmlnLnBhZ2UgPSBKU09OLnBhcnNlKHBhZ2UpOyB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIHBhZ2luYXRpb24gZnJvbSBzZXNzaW9uU3RvcmFnZScsIGUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocm93c09uUGFnZSkge1xuICAgICAgdHJ5IHsgY29uZmlnLnJvd3NPblBhZ2UgPSBKU09OLnBhcnNlKHJvd3NPblBhZ2UpOyB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIHBhZ2luYXRpb24gZnJvbSBzZXNzaW9uU3RvcmFnZScsIGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghY29uZmlnLnNvcnRpbmdEYXRhICYmIGdyaWQuZGVmYXVsdFNvcnRDb2x1bW4pIHtcbiAgICAgIGNvbmZpZy5zb3J0aW5nRGF0YSA9IHtcbiAgICAgICAgc29ydENvbHVtbjogZ3JpZC5kZWZhdWx0U29ydENvbHVtbixcbiAgICAgICAgc29ydE9yZGVyOiBncmlkLmRlZmF1bHRTb3J0T3JkZXIgfHwgJ2FzYycsXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gY29uZmlnO1xuICB9LFxuICBzYXZlU2VsZWN0ZWRJdGVtczogKGdyaWQsIHNlbGVjdGVkSXRlbXMpID0+IHtcbiAgICBpZiAoZ3JpZC5kaXNhYmxlUmVtZW1iZXJTZWxlY3RlZEl0ZW1zKSByZXR1cm4gZmFsc2U7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9zZWxlY3RlZEl0ZW1zXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShzZWxlY3RlZEl0ZW1zIHx8IFtdKSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIHNhdmVDb2x1bW5XaWR0aHM6IChncmlkLCBjb2x1bW5XaWR0aHMpID0+IHtcbiAgICBpZiAoZ3JpZC5kaXNhYmxlUmVtZW1iZXJDb2x1bW5XaWR0aHMpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIWNvbHVtbldpZHRocykgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChncmlkLmNvbmZpZ1N0b3JhZ2UgJiYgaXNGdW5jdGlvbihncmlkLmNvbmZpZ1N0b3JhZ2Uuc2F2ZSkpIHtcbiAgICAgIGdyaWQuY29uZmlnU3RvcmFnZS5zYXZlKHsgY29sdW1uV2lkdGhzIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9jb2x1bW5XaWR0aHNfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KGNvbHVtbldpZHRocykpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgc2F2ZUNvbHVtblNldHRpbmdzOiAoZ3JpZCwgaGlkZGVuQ29sdW1ucywgY29sdW1uT3JkZXIpID0+IHtcbiAgICBpZiAoIWhpZGRlbkNvbHVtbnMgfHwgIWNvbHVtbk9yZGVyKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGdyaWQuY29uZmlnU3RvcmFnZSAmJiBpc0Z1bmN0aW9uKGdyaWQuY29uZmlnU3RvcmFnZS5zYXZlKSkge1xuICAgICAgZ3JpZC5jb25maWdTdG9yYWdlLnNhdmUoeyBoaWRkZW5Db2x1bW5zLCBjb2x1bW5PcmRlciB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYG9jX2dyaWRfaGlkZGVuQ29sdW1uc18ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoaGlkZGVuQ29sdW1ucykpO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYG9jX2dyaWRfY29sdW1uT3JkZXJfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KGNvbHVtbk9yZGVyKSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBzYXZlU29ydERhdGE6IChncmlkLCBzb3J0aW5nRGF0YSkgPT4ge1xuICAgIGlmIChncmlkLmRpc2FibGVSZW1lbWJlclNvcnREYXRhKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFzb3J0aW5nRGF0YSkgcmV0dXJuIGZhbHNlO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oYG9jX2dyaWRfc29ydGluZ18ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoc29ydGluZ0RhdGEpKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgc2F2ZUZpbHRlckRhdGE6IChncmlkLCBmaWx0ZXJEYXRhKSA9PiB7XG4gICAgaWYgKGdyaWQuZGlzYWJsZVJlbWVtYmVyRmlsdGVEYXRhKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFmaWx0ZXJEYXRhKSByZXR1cm4gZmFsc2U7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9maWx0ZXJpbmdfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KGZpbHRlckRhdGEpKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgc2F2ZUlzRmlsdGVyaW5nOiAoZ3JpZCwgaXNGaWx0ZXJpbmcpID0+IHtcbiAgICBpZiAoZ3JpZC5kaXNhYmxlUmVtZW1iZXJJc0ZpbHRlcmluZykgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChpc0ZpbHRlcmluZyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZmFsc2U7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYG9jX2dyaWRfaXNGaWx0ZXJpbmdfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KGlzRmlsdGVyaW5nKSk7XG4gICAgaWYgKCFpc0ZpbHRlcmluZykge1xuICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShgb2NfZ3JpZF9maWx0ZXJpbmdfJHtncmlkLmlkfWApO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgc2F2ZVBhZ2U6IChncmlkLCBwYWdlKSA9PiB7XG4gICAgaWYgKCFwYWdlKSByZXR1cm4gZmFsc2U7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9wYWdlXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShwYWdlKSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIHNhdmVSb3dzT25QYWdlOiAoZ3JpZCwgcm93c09uUGFnZSkgPT4ge1xuICAgIGlmICghcm93c09uUGFnZSkgcmV0dXJuIGZhbHNlO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oYG9jX2dyaWRfcm93c09uUGFnZV8ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkocm93c09uUGFnZSkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICAvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG4gIGNoZWNrR3JpZFBhcmFtOiAoZ3JpZFBhcmFtKSA9PiB7XG4gICAgaWYgKGdyaWRQYXJhbSkge1xuICAgICAgaWYgKCFncmlkUGFyYW0uaWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbR3JpZF0gSW52YWxpZCBgZ3JpZC5pZGAgcGFyYW1ldGVyLCB1cGRhdGUgYWN0aW9uIHBhcmFtZXRlcnMgdG8gbmV3IGZvcm1hdCEnKTtcbiAgICAgIH1cbiAgICAgIGlmICghZ3JpZFBhcmFtLmlkS2V5UGF0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tHcmlkXSBJbnZhbGlkIGBncmlkLmlkS2V5UGF0aGAgcGFyYW1ldGVyLCB1cGRhdGUgYWN0aW9uIHBhcmFtZXRlcnMgdG8gbmV3IGZvcm1hdCEnKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdbR3JpZF0gSW52YWxpZCBgZ3JpZGAgcGFyYW1ldGVyLCB1cGRhdGUgYWN0aW9uIHBhcmFtZXRlcnMgdG8gbmV3IGZvcm1hdCEnKTtcbiAgICB9XG4gIH0sXG4gIGNoZWNrQ29sdW1uc1BhcmFtOiAoY29sdW1uc1BhcmFtKSA9PiB7XG4gICAgaWYgKCFjb2x1bW5zUGFyYW0pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignW0dyaWRdIEludmFsaWQgYGNvbHVtbnNgIHBhcmFtZXRlciwgdXBkYXRlIGFjdGlvbiBwYXJhbWV0ZXJzIHRvIG5ldyBmb3JtYXQhJyk7XG4gICAgfVxuICB9LFxuICAvLyBMb2NhbGUgZ2V0dGVycywgc3VwcG9ydCBncmlkIHBhcmFtIG9yIHVzZXIgc3RhdGUgdXNlZCBpbiBPQyBhcHBsaWNhdGlvbnNcbiAgZ2V0TGFuZ3VhZ2U6IChncmlkLCBvY1VzZXJTdGF0ZSkgPT4ge1xuICAgIGlmIChncmlkLmxhbmd1YWdlICYmIHR5cGVvZiBncmlkLmxhbmd1YWdlID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGdyaWQubGFuZ3VhZ2U7XG4gICAgfVxuICAgIGlmIChvY1VzZXJTdGF0ZSkge1xuICAgICAgcmV0dXJuIG9jVXNlclN0YXRlLmdldEluKFsndXNlcicsICdsYW5ndWFnZSddLCAnZW4nKTtcbiAgICB9XG4gICAgcmV0dXJuICdlbic7XG4gIH0sXG4gIGdldFJlZ2lvbjogKGdyaWQsIG9jVXNlclN0YXRlKSA9PiB7XG4gICAgY29uc3QgZGVmYXVsdFJlZ2lvbiA9ICdlbl9HQic7XG4gICAgaWYgKGdyaWQucmVnaW9uICYmIHR5cGVvZiBncmlkLnJlZ2lvbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBncmlkLnJlZ2lvbjtcbiAgICB9XG4gICAgaWYgKG9jVXNlclN0YXRlKSB7XG4gICAgICByZXR1cm4gb2NVc2VyU3RhdGUuZ2V0SW4oWyd1c2VyJywgJ3JlZ2lvbiddLCBkZWZhdWx0UmVnaW9uKTtcbiAgICB9XG4gICAgcmV0dXJuIGRlZmF1bHRSZWdpb247XG4gIH0sXG4gIGdldERhdGVGb3JtYXQ6IChncmlkLCBvY1VzZXJTdGF0ZSkgPT4ge1xuICAgIGlmIChncmlkLmRhdGVGb3JtYXQgJiYgdHlwZW9mIGdyaWQuZGF0ZUZvcm1hdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBncmlkLmRhdGVGb3JtYXQudG9VcHBlckNhc2UoKTtcbiAgICB9XG4gICAgaWYgKG9jVXNlclN0YXRlKSB7XG4gICAgICByZXR1cm4gb2NVc2VyU3RhdGUuZ2V0SW4oWydsb2NhbGVGb3JtYXQnLCAnZGF0ZUZvcm1hdCddLCAnTCcpO1xuICAgIH1cbiAgICByZXR1cm4gJ0wnO1xuICB9LFxuICBnZXRUaG91c2FuZFNlcGFyYXRvcjogKGdyaWQsIG9jVXNlclN0YXRlKSA9PiB7XG4gICAgaWYgKGdyaWQudGhvdXNhbmRTZXBhcmF0b3IgJiYgdHlwZW9mIGdyaWQubGFuZ3VhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZ3JpZC50aG91c2FuZFNlcGFyYXRvcjtcbiAgICB9XG4gICAgaWYgKG9jVXNlclN0YXRlKSB7XG4gICAgICByZXR1cm4gb2NVc2VyU3RhdGUuZ2V0SW4oWydsb2NhbGVGb3JtYXQnLCAndGhvdXNhbmRTZXBhcmF0b3InXSwgJycpO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH0sXG4gIGdldERlY2ltYWxTZXBhcmF0b3I6IChncmlkLCBvY1VzZXJTdGF0ZSkgPT4ge1xuICAgIGlmIChncmlkLmRlY2ltYWxTZXBhcmF0b3IgJiYgdHlwZW9mIGdyaWQubGFuZ3VhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZ3JpZC5kZWNpbWFsU2VwYXJhdG9yO1xuICAgIH1cbiAgICBpZiAob2NVc2VyU3RhdGUpIHtcbiAgICAgIHJldHVybiBvY1VzZXJTdGF0ZS5nZXRJbihbJ2xvY2FsZUZvcm1hdCcsICdkZWNpbWFsU2VwYXJhdG9yJ10sICcuJyk7XG4gICAgfVxuICAgIHJldHVybiAnLic7XG4gIH0sXG4gIG5vcm1hbGl6ZUZpbHRlcmluZ0RhdGE6IChmaWx0ZXJpbmdEYXRhKSA9PiB7XG4gICAgbGV0IG5ld0ZpbHRlcmluZ0RhdGEgPSBNYXAoeyBpc0ZpbHRlcmluZzogZmFsc2UgfSk7XG4gICAgaWYgKCFmaWx0ZXJpbmdEYXRhKSByZXR1cm4gbmV3RmlsdGVyaW5nRGF0YTtcblxuICAgIGNvbnN0IG9sZEZpbHRlcmluZ0RhdGEgPSBNYXAuaXNNYXAoZmlsdGVyaW5nRGF0YSkgPyBmaWx0ZXJpbmdEYXRhIDogZnJvbUpTKGZpbHRlcmluZ0RhdGEpO1xuICAgIGNvbnN0IGlzRmlsdGVyaW5nID0gb2xkRmlsdGVyaW5nRGF0YS5nZXQoJ2lzRmlsdGVyaW5nJywgZmFsc2UpO1xuICAgIGNvbnN0IGZpbHRlckRhdGEgPSBvbGRGaWx0ZXJpbmdEYXRhLmdldCgnZmlsdGVyRGF0YScsIG51bGwpO1xuXG4gICAgaWYgKGlzRmlsdGVyaW5nICYmIGZpbHRlckRhdGEgJiYgTWFwLmlzTWFwKGZpbHRlckRhdGEpKSB7XG4gICAgICBuZXdGaWx0ZXJpbmdEYXRhID0gbmV3RmlsdGVyaW5nRGF0YVxuICAgICAgICAuc2V0KCdpc0ZpbHRlcmluZycsIHRydWUpXG4gICAgICAgIC5zZXQoJ2ZpbHRlckRhdGEnLCBmaWx0ZXJEYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3RmlsdGVyaW5nRGF0YTtcbiAgfSxcbiAgLypcbiAgICogQGZ1bmN0aW9uIHZpc2libGVDb2x1bW5zXG4gICAqIEBkZXNjICBSZXR1cm5zIGVpdGhlciB2aXNpYmxlIGNvbHVtbnMgKGlmIHNvbWUgY29sdW1ucyBhcmUgaGlkZGVuIClcbiAgICogICAgICAgIG9yIGdyaWQgZGVmYXVsdCBjb2x1bW5zLlxuICAgKiBAcGFyYW0gb3JpZ0NvbHVtbnMgQXJyYXkgb2YgR3JpZCBvcmlnaW5hbCBjb2x1bW5zIG9iamVjdHNcbiAgICogQHBhcmFtIHZpc2libGVDb2x1bW5zIEFycmF5IG9mIEdyaWQgdmlzaWJsZSBjb2x1bW5zIHZhbHVlS2V5UGF0aHNcbiAgICogQHJldHVybnMgQXJyYXkgb2YgY29sdW1uIG9iamVjdHMgY3VycmVudGx5IHZpc2libGUgZm9yIHVzZXIuXG4gICovXG4gIHZpc2libGVDb2x1bW5zOiAob3JpZ0NvbHVtbnMsIHZpc2libGVDb2x1bW5zKSA9PiB7XG4gICAgaWYgKCF2aXNpYmxlQ29sdW1ucykgcmV0dXJuIG9yaWdDb2x1bW5zO1xuICAgIGNvbnN0IGZpbHRlcmVkID0gdmlzaWJsZUNvbHVtbnMubWFwKCAgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgc2VhcmNoQ29sID0+IG9yaWdDb2x1bW5zLmZpbmQoICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgIC8vIHZhbHVlS2V5UGF0aCBpcyBqb2luZWQgaGVyZSBhcyBpdCBjYW4gYmUgYW4gYXJyYXkgbGlrZSBbJ2tleTEnLCAna2V5MiddLlxuICAgICAgICAvLyBzZWFyY2hDb2wgaXMgc2ltaWxhcmx5IGpvaW5lZCBpbiBvbkNlbGxLZXlEb3duIGluIGRhdGFncmlkLmNvbXBvbmVudC5qc3hcbiAgICAgICAgY29sID0+IEpTT04uc3RyaW5naWZ5KGNvbC52YWx1ZUtleVBhdGguam9pbignLycpKSA9PT0gSlNPTi5zdHJpbmdpZnkoc2VhcmNoQ29sKSkpO1xuICAgIHJldHVybiBmaWx0ZXJlZC50b0pTKCk7XG4gIH0sXG59O1xuIl19