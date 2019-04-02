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
    if (grid.disableRememberFilterData) return false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC51dGlscy5qcyJdLCJuYW1lcyI6WyJnZXRDb2x1bW5LZXkiLCJjb2wiLCJjb2x1bW5LZXkiLCJ2YWx1ZUtleVBhdGgiLCJqb2luIiwiZ2V0VmlzaWJsZUNvbHVtbnMiLCJjb2xzIiwiaGlkZGVuQ29sdW1ucyIsImNvbHVtbk9yZGVyIiwib3JkZXJlZENvbHVtbkxpc3QiLCJmb3JFYWNoIiwiaSIsImNvbE9yZGVySWR4IiwiaW5kZXhPZiIsImRlZmF1bHRIaWRkZW4iLCJpc0hpZGRlbiIsIm9yZGVyIiwicHVzaCIsInNvcnQiLCJhIiwiYiIsIm1hcCIsIml0ZW0iLCJnZXRDb2x1bW5EZWZhdWx0VmFsdWVzIiwiY29sdW1uRGVmYXVsdFZhbHVlcyIsImRlZmF1bHRWYWx1ZSIsInVuZGVmaW5lZCIsImdldENlbGxTdHlsZUJ5Q29sIiwiYWxpZ24iLCJ0ZXh0QWxpZ24iLCJjb21wb25lbnRUeXBlIiwidmFsdWVUeXBlIiwiaXNTb3J0YWJsZSIsInNvcnRWYWx1ZUdldHRlciIsImRpc2FibGVTb3J0aW5nIiwiZ2V0U29ydENvbXBhcmF0b3IiLCJzb3J0Q29tcGFyYXRvciIsImxvY2FsZUNvbXBhcmUiLCJEYXRlIiwiZ2V0U29ydFZhbHVlR2V0dGVyIiwiZGF0YSIsImdldEluIiwiZ2V0VmFsdWVFbXB0eUNoZWNrZXIiLCJ2YWx1ZUVtcHR5Q2hlY2tlciIsInZhbCIsImxlbmd0aCIsImdldEZpbHRlck1hdGNoZXIiLCJkYXRlRm9ybWF0IiwiZmlsdGVyTWF0Y2hlciIsImdldFZhbCIsInJvdyIsImZpbHRlclZhbCIsInZhbHVlIiwiZmlsdGVycyIsInRvSlMiLCJzb21lIiwiZmlsdGVyIiwicGFyc2VJbnQiLCJpbmNsdWRlcyIsImlzVmFsaWQiLCJmb3JtYXQiLCJlc2NhcGVkVmFsIiwic3BlY2lhbENoYXJzIiwiUmVnRXhwIiwidGVzdCIsImxvYWRTZWxlY3RlZEl0ZW1zIiwiZ3JpZCIsInNlc3Npb25JdGVtIiwic2Vzc2lvblN0b3JhZ2UiLCJnZXRJdGVtIiwiaWQiLCJkaXNhYmxlUmVtZW1iZXJTZWxlY3RlZEl0ZW1zIiwiSlNPTiIsInBhcnNlIiwiZSIsImNvbnNvbGUiLCJlcnJvciIsImxvYWRHcmlkQ29uZmlnIiwiY29uZmlnU3RvcmFnZSIsInNvcnRpbmdEYXRhIiwiZmlsdGVyRGF0YSIsImlzRmlsdGVyaW5nRGF0YSIsImxvY2FsU3RvcmFnZSIsInBhZ2UiLCJyb3dzT25QYWdlIiwibG9hZGVkQ29uZmlnIiwiaXNGaWx0ZXJpbmciLCJsb2FkIiwiZGlzYWJsZVJlbWVtYmVySXNGaWx0ZXJpbmciLCJkZWZhdWx0U2hvd0ZpbHRlcmluZ1JvdyIsImhpZGRlbkNvbHVtbnNKc29uIiwiY29sdW1uT3JkZXJKc29uIiwiY29uZmlnIiwidmlzaWJsZUNvbHVtbnMiLCJmaWx0ZXJpbmdEYXRhIiwiY29sdW1uV2lkdGhzIiwiZGlzYWJsZVJlbWVtYmVyQ29sdW1uV2lkdGhzIiwiZGlzYWJsZVJlbWVtYmVyU29ydERhdGEiLCJkaXNhYmxlUmVtZW1iZXJGaWx0ZXJEYXRhIiwiZGVmYXVsdFNvcnRDb2x1bW4iLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwiZGVmYXVsdFNvcnRPcmRlciIsInNhdmVTZWxlY3RlZEl0ZW1zIiwic2VsZWN0ZWRJdGVtcyIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJzYXZlQ29sdW1uV2lkdGhzIiwic2F2ZSIsInNhdmVDb2x1bW5TZXR0aW5ncyIsInNhdmVTb3J0RGF0YSIsInNhdmVGaWx0ZXJEYXRhIiwic2F2ZUlzRmlsdGVyaW5nIiwicmVtb3ZlSXRlbSIsInNhdmVQYWdlIiwic2F2ZVJvd3NPblBhZ2UiLCJjaGVja0dyaWRQYXJhbSIsImdyaWRQYXJhbSIsIkVycm9yIiwiaWRLZXlQYXRoIiwiY2hlY2tDb2x1bW5zUGFyYW0iLCJjb2x1bW5zUGFyYW0iLCJnZXRMYW5ndWFnZSIsIm9jVXNlclN0YXRlIiwibGFuZ3VhZ2UiLCJnZXRSZWdpb24iLCJkZWZhdWx0UmVnaW9uIiwicmVnaW9uIiwiZ2V0RGF0ZUZvcm1hdCIsInRvVXBwZXJDYXNlIiwiZ2V0VGhvdXNhbmRTZXBhcmF0b3IiLCJ0aG91c2FuZFNlcGFyYXRvciIsImdldERlY2ltYWxTZXBhcmF0b3IiLCJkZWNpbWFsU2VwYXJhdG9yIiwibm9ybWFsaXplRmlsdGVyaW5nRGF0YSIsIm5ld0ZpbHRlcmluZ0RhdGEiLCJvbGRGaWx0ZXJpbmdEYXRhIiwiTWFwIiwiaXNNYXAiLCJnZXQiLCJzZXQiLCJvcmlnQ29sdW1ucyIsImZpbHRlcmVkIiwiZmluZCIsInNlYXJjaENvbCJdLCJtYXBwaW5ncyI6Ijs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUpBO0FBTUEsSUFBTUEsZUFBZSxTQUFmQSxZQUFlO0FBQUEsU0FDbkJDLElBQUlDLFNBQUosSUFBaUJELElBQUlFLFlBQUosQ0FBaUJDLElBQWpCLENBQXNCLEdBQXRCLENBREU7QUFBQSxDQUFyQjs7QUFJQSxJQUFNQyxvQkFBb0IsU0FBcEJBLGlCQUFvQixDQUFDQyxJQUFELEVBQWdEO0FBQUEsTUFBekNDLGFBQXlDLHVFQUF6QixFQUF5QjtBQUFBLE1BQXJCQyxXQUFxQix1RUFBUCxFQUFPOztBQUN4RSxNQUFNQyxvQkFBb0IsRUFBMUI7QUFDQUgsT0FBS0ksT0FBTCxDQUFhLFVBQUNULEdBQUQsRUFBTVUsQ0FBTixFQUFZO0FBQ3ZCLFFBQU1ULFlBQVlGLGFBQWFDLEdBQWIsQ0FBbEI7QUFDQSxRQUFNVyxjQUFjSixZQUFZSyxPQUFaLENBQW9CWCxTQUFwQixDQUFwQjtBQUNBLFFBQU1ZLGdCQUFnQmIsSUFBSWMsUUFBSixJQUFnQkgsZ0JBQWdCLENBQUMsQ0FBdkQ7QUFDQSxRQUFJRSxpQkFBaUJQLGNBQWNNLE9BQWQsQ0FBc0JYLFNBQXRCLElBQW1DLENBQUMsQ0FBekQsRUFBNEQ7QUFDMUQ7QUFDRDtBQUNELFFBQU1jLFFBQVFKLGdCQUFnQixDQUFDLENBQWpCLEdBQXFCQSxXQUFyQixHQUFvQ0QsSUFBSSxDQUF0RDtBQUNBRixzQkFBa0JRLElBQWxCLENB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WixFQUFtQjtBQUM5QjtBQUNBO0FBQ0E7QUFBQSxlQUFPdkUsS0FBS2tDLFNBQUwsQ0FBZXpHLElBQUlFLFlBQUosQ0FBaUJDLElBQWpCLENBQXNCLEdBQXRCLENBQWYsTUFBK0NvRSxLQUFLa0MsU0FBTCxDQUFlc0MsU0FBZixDQUF0RDtBQUFBLE9BSFcsQ0FBYjtBQUFBLEtBRGUsQ0FBakI7QUFLQSxXQUFPRixTQUFTeEYsSUFBVCxFQUFQO0FBQ0Q7QUE5WVksQyIsImZpbGUiOiJkYXRhZ3JpZC51dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLW5lc3RlZC10ZXJuYXJ5ICovXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgaXNOYU4gZnJvbSAnbG9kYXNoL2lzTmFOJztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICd1dGlsJztcbmltcG9ydCB7IE1hcCwgZnJvbUpTIH0gZnJvbSAnaW1tdXRhYmxlJztcblxuY29uc3QgZ2V0Q29sdW1uS2V5ID0gY29sID0+IChcbiAgY29sLmNvbHVtbktleSB8fCBjb2wudmFsdWVLZXlQYXRoLmpvaW4oJy8nKVxuKTtcblxuY29uc3QgZ2V0VmlzaWJsZUNvbHVtbnMgPSAoY29scywgaGlkZGVuQ29sdW1ucyA9IFtdLCBjb2x1bW5PcmRlciA9IFtdKSA9PiB7XG4gIGNvbnN0IG9yZGVyZWRDb2x1bW5MaXN0ID0gW107XG4gIGNvbHMuZm9yRWFjaCgoY29sLCBpKSA9PiB7XG4gICAgY29uc3QgY29sdW1uS2V5ID0gZ2V0Q29sdW1uS2V5KGNvbCk7XG4gICAgY29uc3QgY29sT3JkZXJJZHggPSBjb2x1bW5PcmRlci5pbmRleE9mKGNvbHVtbktleSk7XG4gICAgY29uc3QgZGVmYXVsdEhpZGRlbiA9IGNvbC5pc0hpZGRlbiAmJiBjb2xPcmRlcklkeCA9PT0gLTE7XG4gICAgaWYgKGRlZmF1bHRIaWRkZW4gfHwgaGlkZGVuQ29sdW1ucy5pbmRleE9mKGNvbHVtbktleSkgPiAtMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBvcmRlciA9IGNvbE9yZGVySWR4ICE9PSAtMSA/IGNvbE9yZGVySWR4IDogKGkgKyAxKTtcbiAgICBvcmRlcmVkQ29sdW1uTGlzdC5wdXNoKHtcbiAgICAgIGNvbHVtbktleSxcbiAgICAgIG9yZGVyLFxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIG9yZGVyZWRDb2x1bW5MaXN0LnNvcnQoKGEsIGIpID0+IChhLm9yZGVyIC0gYi5vcmRlcikpLm1hcChpdGVtID0+IGl0ZW0uY29sdW1uS2V5KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZ2V0Q29sdW1uS2V5LFxuICBnZXRDb2x1bW5EZWZhdWx0VmFsdWVzOiAoY29scykgPT4ge1xuICAgIGNvbnN0IGNvbHVtbkRlZmF1bHRWYWx1ZXMgPSB7fTtcbiAgICBjb2xzLmZvckVhY2goKGNvbCkgPT4ge1xuICAgICAgaWYgKGNvbC5kZWZhdWx0VmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb2x1bW5EZWZhdWx0VmFsdWVzW2dldENvbHVtbktleShjb2wpXSA9IGNvbC5kZWZhdWx0VmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGNvbHVtbkRlZmF1bHRWYWx1ZXM7XG4gIH0sXG4gIGdldENlbGxTdHlsZUJ5Q29sOiAoY29sKSA9PiB7XG4gICAgaWYgKGNvbC5hbGlnbikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGV4dEFsaWduOiBjb2wuYWxpZ24sXG4gICAgICB9O1xuICAgIH1cbiAgICAvLyBObyBkZWZhdWx0IGFsaWduIGlmIGNvbXBvbmVudCBpcyBzZWxlY3RcbiAgICAvLyBCZWNhdXNlIHJlbmRlcmVkIGRhdGEgaXMgbW9zdCBsaWtlbHkgdGV4dFxuICAgIC8vIEV2ZW4gaWYgdmFsdWVUeXBlIGlzIG51bWJlclxuICAgIGlmIChjb2wuY29tcG9uZW50VHlwZSA9PT0gJ3NlbGVjdCcgfHwgY29sLmNvbXBvbmVudFR5cGUgPT09ICdtdWx0aXNlbGVjdCcpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgc3dpdGNoIChjb2wudmFsdWVUeXBlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgY2FzZSAnY3VycmVuY3knOlxuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdGV4dEFsaWduOiAncmlnaHQnLFxuICAgICAgICB9O1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgfSxcbiAgaXNTb3J0YWJsZTogY29sID0+IChcbiAgICBjb2wudmFsdWVUeXBlXG4gICAgJiYgKGNvbC5zb3J0VmFsdWVHZXR0ZXIgfHwgY29sLnZhbHVlS2V5UGF0aClcbiAgICAmJiAhY29sLmRpc2FibGVTb3J0aW5nXG4gICksXG4gIGdldFNvcnRDb21wYXJhdG9yOiAoY29sKSA9PiB7XG4gICAgaWYgKGNvbC5zb3J0Q29tcGFyYXRvcikge1xuICAgICAgcmV0dXJuIGNvbC5zb3J0Q29tcGFyYXRvcjtcbiAgICB9XG4gICAgc3dpdGNoIChjb2wudmFsdWVUeXBlKSB7XG4gICAgICBjYXNlICd0ZXh0JzpcbiAgICAgICAgcmV0dXJuIChhLCBiKSA9PiAoYS5sb2NhbGVDb21wYXJlID8gYS5sb2NhbGVDb21wYXJlKGIpIDogMSk7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgY2FzZSAnY3VycmVuY3knOlxuICAgICAgICByZXR1cm4gKGEsIGIpID0+IChhIC0gYik7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgcmV0dXJuIChhLCBiKSA9PiAoYSA9PT0gYiA/IDAgOiAoYSA/IC0xIDogMSkpO1xuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgIHJldHVybiAoYSwgYikgPT4gKG5ldyBEYXRlKGEpIC0gbmV3IERhdGUoYikpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIChhLCBiKSA9PiAoYS5sb2NhbGVDb21wYXJlID8gYS5sb2NhbGVDb21wYXJlKGIpIDogMSk7XG4gICAgfVxuICB9LFxuICBnZXRTb3J0VmFsdWVHZXR0ZXI6IChjb2wpID0+IHtcbiAgICBpZiAoY29sLnNvcnRWYWx1ZUdldHRlcikge1xuICAgICAgcmV0dXJuIGNvbC5zb3J0VmFsdWVHZXR0ZXI7XG4gICAgfVxuICAgIHJldHVybiBkYXRhID0+IGRhdGEuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG4gIH0sXG4gIGdldFZhbHVlRW1wdHlDaGVja2VyOiAoY29sKSA9PiB7XG4gICAgaWYgKGNvbC52YWx1ZUVtcHR5Q2hlY2tlcikge1xuICAgICAgcmV0dXJuIGNvbC52YWx1ZUVtcHR5Q2hlY2tlcjtcbiAgICB9XG4gICAgaWYgKGNvbC5jb21wb25lbnRUeXBlID09PSAnbXVsdGlzZWxlY3QnKSB7XG4gICAgICByZXR1cm4gdmFsID0+IHZhbCA9PT0gJycgfHwgdmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkIHx8IHZhbC5sZW5ndGggPT09IDA7XG4gICAgfVxuXG4gICAgc3dpdGNoIChjb2wudmFsdWVUeXBlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgY2FzZSAnY3VycmVuY3knOlxuICAgICAgICByZXR1cm4gdmFsID0+IChcbiAgICAgICAgICB2YWwgPT09ICcnXG4gICAgICAgICAgfHwgaXNOYU4odmFsKVxuICAgICAgICAgIHx8IHZhbCA9PT0gbnVsbFxuICAgICAgICAgIHx8IHZhbCA9PT0gdW5kZWZpbmVkXG4gICAgICAgICk7XG4gICAgICBjYXNlICd0ZXh0JzpcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICBjYXNlICdzZWxlY3QnOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHZhbCA9PiB2YWwgPT09ICcnIHx8IHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZDtcbiAgICB9XG4gIH0sXG4gIGdldEZpbHRlck1hdGNoZXI6IChjb2wsIGRhdGVGb3JtYXQpID0+IHtcbiAgICBpZiAoY29sLmZpbHRlck1hdGNoZXIpIHJldHVybiBjb2wuZmlsdGVyTWF0Y2hlcjtcbiAgICBjb25zdCBnZXRWYWwgPSByb3cgPT4gcm93LmdldEluKGNvbC52YWx1ZUtleVBhdGgpO1xuXG4gICAgaWYgKGNvbC5jb21wb25lbnRUeXBlID09PSAnbXVsdGlzZWxlY3QnKSB7XG4gICAgICByZXR1cm4gKHJvdywgZmlsdGVyVmFsKSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gZ2V0VmFsKHJvdyk7XG4gICAgICAgIC8vIHNlc3Npb24gc3RvcmFnZSBjb250ZW50IGlzIGNvbnZlcnRlZCB0byBpbW11dGFibGUgYW5kIG11bHRpc2VsZWN0XG4gICAgICAgIC8vIGZpbHRlcnMgaXMgdGhlbiBsaXN0IG90aGVyd2lzZSBhcnJheVxuICAgICAgICBjb25zdCBmaWx0ZXJzID0gZmlsdGVyVmFsICYmIGZpbHRlclZhbC50b0pTID8gZmlsdGVyVmFsLnRvSlMoKSA6IGZpbHRlclZhbDtcbiAgICAgICAgcmV0dXJuIGZpbHRlcnMuc29tZShmaWx0ZXIgPT4gZmlsdGVyLnZhbHVlID09PSB2YWx1ZSk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHN3aXRjaCAoY29sLnZhbHVlVHlwZSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgcmV0dXJuIChyb3csIGZpbHRlclZhbCkgPT4gcGFyc2VJbnQoZ2V0VmFsKHJvdyksIDEwKSA9PT0gcGFyc2VJbnQoZmlsdGVyVmFsLCAxMCk7XG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICBjYXNlICdjdXJyZW5jeSc6XG4gICAgICAgIHJldHVybiAocm93LCBmaWx0ZXJWYWwpID0+IHtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IGdldFZhbChyb3cpO1xuICAgICAgICAgIHJldHVybiB2YWx1ZSAmJiB2YWx1ZS5pbmNsdWRlcyhmaWx0ZXJWYWwpO1xuICAgICAgICB9O1xuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgIHJldHVybiAocm93LCBmaWx0ZXJWYWwpID0+IHtcbiAgICAgICAgICBpZiAobW9tZW50KGdldFZhbChyb3cpKS5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBtb21lbnQoZ2V0VmFsKHJvdykpLmZvcm1hdChkYXRlRm9ybWF0KSA9PT0gbW9tZW50KGZpbHRlclZhbCkuZm9ybWF0KGRhdGVGb3JtYXQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH07XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIGNhc2UgJ3NlbGVjdCc6XG4gICAgICAgIC8vIHNlbGVjdCBpcyBjb21wb25lbnRUeXBlIG5vdCB2YWx1ZVR5cGUgLT4gdGhlIGNhc2UgY291bGQgYmUgcmVtb3ZlZFxuICAgICAgICByZXR1cm4gKHJvdywgZmlsdGVyVmFsKSA9PiBnZXRWYWwocm93KSA9PT0gZmlsdGVyVmFsO1xuICAgICAgY2FzZSAndGV4dCc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gKHJvdywgZmlsdGVyVmFsKSA9PiB7XG4gICAgICAgICAgbGV0IGVzY2FwZWRWYWwgPSBmaWx0ZXJWYWw7XG4gICAgICAgICAgY29uc3Qgc3BlY2lhbENoYXJzID0gJ1tdXFxcXF4kLnw/KisoKSc7XG5cbiAgICAgICAgICAvLyBJZiBmaWx0ZXIgdmFsIHN0YXJ0cyB3aXRoIGEgUmVnZXggc3BlY2lhbCBjaGFyYWN0ZXIsIHdlIG11c3QgZXNjYXBlIGl0XG4gICAgICAgICAgaWYgKHNwZWNpYWxDaGFycy5pbmNsdWRlcyhmaWx0ZXJWYWxbMF0pKSBlc2NhcGVkVmFsID0gYFxcXFwke2ZpbHRlclZhbH1gO1xuICAgICAgICAgIHJldHVybiAobmV3IFJlZ0V4cChlc2NhcGVkVmFsLCAnaScpKS50ZXN0KGdldFZhbChyb3cpKTtcbiAgICAgICAgfTtcbiAgICB9XG4gIH0sXG4gIGxvYWRTZWxlY3RlZEl0ZW1zOiAoZ3JpZCkgPT4ge1xuICAgIGNvbnN0IHNlc3Npb25JdGVtID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShgb2NfZ3JpZF9zZWxlY3RlZEl0ZW1zXyR7Z3JpZC5pZH1gKTtcbiAgICBpZiAoc2Vzc2lvbkl0ZW0gJiYgIWdyaWQuZGlzYWJsZVJlbWVtYmVyU2VsZWN0ZWRJdGVtcykge1xuICAgICAgdHJ5IHsgcmV0dXJuIEpTT04ucGFyc2Uoc2Vzc2lvbkl0ZW0pOyB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIHNlbGVjdGVkSXRlbXMgZnJvbSBzZXNzaW9uU3RvcmFnZScsIGUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH0sXG4gIGxvYWRHcmlkQ29uZmlnOiAoZ3JpZCwgY29scykgPT4ge1xuICAgIGNvbnN0IGNvbmZpZ1N0b3JhZ2UgPSBncmlkLmNvbmZpZ1N0b3JhZ2UgfHwge307XG4gICAgY29uc3Qgc29ydGluZ0RhdGEgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX3NvcnRpbmdfJHtncmlkLmlkfWApO1xuICAgIGNvbnN0IGZpbHRlckRhdGEgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX2ZpbHRlcmluZ18ke2dyaWQuaWR9YCk7XG4gICAgY29uc3QgaXNGaWx0ZXJpbmdEYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfaXNGaWx0ZXJpbmdfJHtncmlkLmlkfWApO1xuICAgIGNvbnN0IHBhZ2UgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX3BhZ2VfJHtncmlkLmlkfWApO1xuICAgIGNvbnN0IHJvd3NPblBhZ2UgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX3Jvd3NPblBhZ2VfJHtncmlkLmlkfWApO1xuICAgIGxldCBsb2FkZWRDb25maWcgPSB7fTtcbiAgICBsZXQgaGlkZGVuQ29sdW1ucztcbiAgICBsZXQgY29sdW1uT3JkZXI7XG4gICAgbGV0IGlzRmlsdGVyaW5nID0gZmFsc2U7XG5cbiAgICBpZiAoaXNGdW5jdGlvbihjb25maWdTdG9yYWdlLmxvYWQpKSB7XG4gICAgICBsb2FkZWRDb25maWcgPSBjb25maWdTdG9yYWdlLmxvYWQoKTtcbiAgICB9XG5cbiAgICBpZiAoaXNGaWx0ZXJpbmdEYXRhKSB7XG4gICAgICBpZiAoIWdyaWQuZGlzYWJsZVJlbWVtYmVySXNGaWx0ZXJpbmcpIHtcbiAgICAgICAgdHJ5IHsgaXNGaWx0ZXJpbmcgPSBKU09OLnBhcnNlKGlzRmlsdGVyaW5nRGF0YSk7IH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIGlzRmlsdGVyaW5nRGF0YSBmcm9tIGxvY2FsU3RvcmFnZScsIGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChncmlkLmRlZmF1bHRTaG93RmlsdGVyaW5nUm93KSB7XG4gICAgICBpc0ZpbHRlcmluZyA9IHRydWU7XG4gICAgfVxuICAgIGlmIChsb2FkZWRDb25maWcuaGlkZGVuQ29sdW1ucykge1xuICAgICAgaGlkZGVuQ29sdW1ucyA9IGxvYWRlZENvbmZpZy5oaWRkZW5Db2x1bW5zOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGhpZGRlbkNvbHVtbnNKc29uID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfaGlkZGVuQ29sdW1uc18ke2dyaWQuaWR9YCk7XG4gICAgICBpZiAoaGlkZGVuQ29sdW1uc0pzb24pIHtcbiAgICAgICAgdHJ5IHsgaGlkZGVuQ29sdW1ucyA9IEpTT04ucGFyc2UoaGlkZGVuQ29sdW1uc0pzb24pOyB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhZ3JpZDogZXJyb3IgcGFyc2luZyBoaWRkZW5Db2x1bW5zIGZyb20gbG9jYWxTdG9yYWdlJywgZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGxvYWRlZENvbmZpZy5jb2x1bW5PcmRlcikge1xuICAgICAgY29sdW1uT3JkZXIgPSBsb2FkZWRDb25maWcuY29sdW1uT3JkZXI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgY29sdW1uT3JkZXJKc29uID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfY29sdW1uT3JkZXJfJHtncmlkLmlkfWApO1xuICAgICAgaWYgKGNvbHVtbk9yZGVySnNvbikge1xuICAgICAgICB0cnkgeyBjb2x1bW5PcmRlciA9IEpTT04ucGFyc2UoY29sdW1uT3JkZXJKc29uKTsgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgY29sdW1uT3JkZXIgZnJvbSBsb2NhbFN0b3JhZ2UnLCBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICB2aXNpYmxlQ29sdW1uczogZ2V0VmlzaWJsZUNvbHVtbnMoY29scywgaGlkZGVuQ29sdW1ucywgY29sdW1uT3JkZXIpLFxuICAgICAgZmlsdGVyaW5nRGF0YToge1xuICAgICAgICBpc0ZpbHRlcmluZyxcbiAgICAgIH0sXG4gICAgfTtcbiAgICBpZiAobG9hZGVkQ29uZmlnLmNvbHVtbldpZHRocykge1xuICAgICAgY29uZmlnLmNvbHVtbldpZHRocyA9IGxvYWRlZENvbmZpZy5jb2x1bW5XaWR0aHM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNvbHVtbldpZHRocyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX2NvbHVtbldpZHRoc18ke2dyaWQuaWR9YCk7XG4gICAgICBpZiAoY29sdW1uV2lkdGhzICYmICFncmlkLmRpc2FibGVSZW1lbWJlckNvbHVtbldpZHRocykge1xuICAgICAgICB0cnkgeyBjb25maWcuY29sdW1uV2lkdGhzID0gSlNPTi5wYXJzZShjb2x1bW5XaWR0aHMpOyB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhZ3JpZDogZXJyb3IgcGFyc2luZyBjb2x1bW5XaWR0aHMgZnJvbSBsb2NhbFN0b3JhZ2UnLCBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc29ydGluZ0RhdGEgJiYgIWdyaWQuZGlzYWJsZVJlbWVtYmVyU29ydERhdGEpIHtcbiAgICAgIHRyeSB7IGNvbmZpZy5zb3J0aW5nRGF0YSA9IEpTT04ucGFyc2Uoc29ydGluZ0RhdGEpOyB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIHNvcnRpbmdEYXRhIGZyb20gc2Vzc2lvblN0b3JhZ2UnLCBlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGZpbHRlckRhdGEgJiYgaXNGaWx0ZXJpbmcgJiYgIWdyaWQuZGlzYWJsZVJlbWVtYmVyRmlsdGVyRGF0YSkge1xuICAgICAgdHJ5IHsgY29uZmlnLmZpbHRlcmluZ0RhdGEuZmlsdGVyRGF0YSA9IEpTT04ucGFyc2UoZmlsdGVyRGF0YSk7IH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgZmlsdGVyRGF0YSBmcm9tIHNlc3Npb25TdG9yYWdlJywgZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChwYWdlKSB7XG4gICAgICB0cnkgeyBjb25maWcucGFnZSA9IEpTT04ucGFyc2UocGFnZSk7IH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgcGFnaW5hdGlvbiBmcm9tIHNlc3Npb25TdG9yYWdlJywgZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChyb3dzT25QYWdlKSB7XG4gICAgICB0cnkgeyBjb25maWcucm93c09uUGFnZSA9IEpTT04ucGFyc2Uocm93c09uUGFnZSk7IH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgcGFnaW5hdGlvbiBmcm9tIHNlc3Npb25TdG9yYWdlJywgZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuc29ydGluZ0RhdGEgJiYgZ3JpZC5kZWZhdWx0U29ydENvbHVtbikge1xuICAgICAgY29uZmlnLnNvcnRpbmdEYXRhID0ge1xuICAgICAgICBzb3J0Q29sdW1uOiBncmlkLmRlZmF1bHRTb3J0Q29sdW1uLFxuICAgICAgICBzb3J0T3JkZXI6IGdyaWQuZGVmYXVsdFNvcnRPcmRlciB8fCAnYXNjJyxcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBjb25maWc7XG4gIH0sXG4gIHNhdmVTZWxlY3RlZEl0ZW1zOiAoZ3JpZCwgc2VsZWN0ZWRJdGVtcykgPT4ge1xuICAgIGlmIChncmlkLmRpc2FibGVSZW1lbWJlclNlbGVjdGVkSXRlbXMpIHJldHVybiBmYWxzZTtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX3NlbGVjdGVkSXRlbXNfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KHNlbGVjdGVkSXRlbXMgfHwgW10pKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgc2F2ZUNvbHVtbldpZHRoczogKGdyaWQsIGNvbHVtbldpZHRocykgPT4ge1xuICAgIGlmIChncmlkLmRpc2FibGVSZW1lbWJlckNvbHVtbldpZHRocykgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghY29sdW1uV2lkdGhzKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGdyaWQuY29uZmlnU3RvcmFnZSAmJiBpc0Z1bmN0aW9uKGdyaWQuY29uZmlnU3RvcmFnZS5zYXZlKSkge1xuICAgICAgZ3JpZC5jb25maWdTdG9yYWdlLnNhdmUoeyBjb2x1bW5XaWR0aHMgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX2NvbHVtbldpZHRoc18ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoY29sdW1uV2lkdGhzKSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBzYXZlQ29sdW1uU2V0dGluZ3M6IChncmlkLCBoaWRkZW5Db2x1bW5zLCBjb2x1bW5PcmRlcikgPT4ge1xuICAgIGlmICghaGlkZGVuQ29sdW1ucyB8fCAhY29sdW1uT3JkZXIpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoZ3JpZC5jb25maWdTdG9yYWdlICYmIGlzRnVuY3Rpb24oZ3JpZC5jb25maWdTdG9yYWdlLnNhdmUpKSB7XG4gICAgICBncmlkLmNvbmZpZ1N0b3JhZ2Uuc2F2ZSh7IGhpZGRlbkNvbHVtbnMsIGNvbHVtbk9yZGVyIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9oaWRkZW5Db2x1bW5zXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShoaWRkZW5Db2x1bW5zKSk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9jb2x1bW5PcmRlcl8ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoY29sdW1uT3JkZXIpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIHNhdmVTb3J0RGF0YTogKGdyaWQsIHNvcnRpbmdEYXRhKSA9PiB7XG4gICAgaWYgKGdyaWQuZGlzYWJsZVJlbWVtYmVyU29ydERhdGEpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIXNvcnRpbmdEYXRhKSByZXR1cm4gZmFsc2U7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9zb3J0aW5nXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShzb3J0aW5nRGF0YSkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBzYXZlRmlsdGVyRGF0YTogKGdyaWQsIGZpbHRlckRhdGEpID0+IHtcbiAgICBpZiAoZ3JpZC5kaXNhYmxlUmVtZW1iZXJGaWx0ZXJEYXRhKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFmaWx0ZXJEYXRhKSByZXR1cm4gZmFsc2U7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9maWx0ZXJpbmdfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KGZpbHRlckRhdGEpKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgc2F2ZUlzRmlsdGVyaW5nOiAoZ3JpZCwgaXNGaWx0ZXJpbmcpID0+IHtcbiAgICBpZiAoZ3JpZC5kaXNhYmxlUmVtZW1iZXJJc0ZpbHRlcmluZykgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChpc0ZpbHRlcmluZyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZmFsc2U7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYG9jX2dyaWRfaXNGaWx0ZXJpbmdfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KGlzRmlsdGVyaW5nKSk7XG4gICAgaWYgKCFpc0ZpbHRlcmluZykge1xuICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShgb2NfZ3JpZF9maWx0ZXJpbmdfJHtncmlkLmlkfWApO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgc2F2ZVBhZ2U6IChncmlkLCBwYWdlKSA9PiB7XG4gICAgaWYgKCFwYWdlKSByZXR1cm4gZmFsc2U7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9wYWdlXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShwYWdlKSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIHNhdmVSb3dzT25QYWdlOiAoZ3JpZCwgcm93c09uUGFnZSkgPT4ge1xuICAgIGlmICghcm93c09uUGFnZSkgcmV0dXJuIGZhbHNlO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oYG9jX2dyaWRfcm93c09uUGFnZV8ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkocm93c09uUGFnZSkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICAvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG4gIGNoZWNrR3JpZFBhcmFtOiAoZ3JpZFBhcmFtKSA9PiB7XG4gICAgaWYgKGdyaWRQYXJhbSkge1xuICAgICAgaWYgKCFncmlkUGFyYW0uaWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbR3JpZF0gSW52YWxpZCBgZ3JpZC5pZGAgcGFyYW1ldGVyLCB1cGRhdGUgYWN0aW9uIHBhcmFtZXRlcnMgdG8gbmV3IGZvcm1hdCEnKTtcbiAgICAgIH1cbiAgICAgIGlmICghZ3JpZFBhcmFtLmlkS2V5UGF0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tHcmlkXSBJbnZhbGlkIGBncmlkLmlkS2V5UGF0aGAgcGFyYW1ldGVyLCB1cGRhdGUgYWN0aW9uIHBhcmFtZXRlcnMgdG8gbmV3IGZvcm1hdCEnKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdbR3JpZF0gSW52YWxpZCBgZ3JpZGAgcGFyYW1ldGVyLCB1cGRhdGUgYWN0aW9uIHBhcmFtZXRlcnMgdG8gbmV3IGZvcm1hdCEnKTtcbiAgICB9XG4gIH0sXG4gIGNoZWNrQ29sdW1uc1BhcmFtOiAoY29sdW1uc1BhcmFtKSA9PiB7XG4gICAgaWYgKCFjb2x1bW5zUGFyYW0pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignW0dyaWRdIEludmFsaWQgYGNvbHVtbnNgIHBhcmFtZXRlciwgdXBkYXRlIGFjdGlvbiBwYXJhbWV0ZXJzIHRvIG5ldyBmb3JtYXQhJyk7XG4gICAgfVxuICB9LFxuICAvLyBMb2NhbGUgZ2V0dGVycywgc3VwcG9ydCBncmlkIHBhcmFtIG9yIHVzZXIgc3RhdGUgdXNlZCBpbiBPQyBhcHBsaWNhdGlvbnNcbiAgZ2V0TGFuZ3VhZ2U6IChncmlkLCBvY1VzZXJTdGF0ZSkgPT4ge1xuICAgIGlmIChncmlkLmxhbmd1YWdlICYmIHR5cGVvZiBncmlkLmxhbmd1YWdlID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGdyaWQubGFuZ3VhZ2U7XG4gICAgfVxuICAgIGlmIChvY1VzZXJTdGF0ZSkge1xuICAgICAgcmV0dXJuIG9jVXNlclN0YXRlLmdldEluKFsndXNlcicsICdsYW5ndWFnZSddLCAnZW4nKTtcbiAgICB9XG4gICAgcmV0dXJuICdlbic7XG4gIH0sXG4gIGdldFJlZ2lvbjogKGdyaWQsIG9jVXNlclN0YXRlKSA9PiB7XG4gICAgY29uc3QgZGVmYXVsdFJlZ2lvbiA9ICdlbl9HQic7XG4gICAgaWYgKGdyaWQucmVnaW9uICYmIHR5cGVvZiBncmlkLnJlZ2lvbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBncmlkLnJlZ2lvbjtcbiAgICB9XG4gICAgaWYgKG9jVXNlclN0YXRlKSB7XG4gICAgICByZXR1cm4gb2NVc2VyU3RhdGUuZ2V0SW4oWyd1c2VyJywgJ3JlZ2lvbiddLCBkZWZhdWx0UmVnaW9uKTtcbiAgICB9XG4gICAgcmV0dXJuIGRlZmF1bHRSZWdpb247XG4gIH0sXG4gIGdldERhdGVGb3JtYXQ6IChncmlkLCBvY1VzZXJTdGF0ZSkgPT4ge1xuICAgIGlmIChncmlkLmRhdGVGb3JtYXQgJiYgdHlwZW9mIGdyaWQuZGF0ZUZvcm1hdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBncmlkLmRhdGVGb3JtYXQudG9VcHBlckNhc2UoKTtcbiAgICB9XG4gICAgaWYgKG9jVXNlclN0YXRlKSB7XG4gICAgICByZXR1cm4gb2NVc2VyU3RhdGUuZ2V0SW4oWydsb2NhbGVGb3JtYXQnLCAnZGF0ZUZvcm1hdCddLCAnTCcpO1xuICAgIH1cbiAgICByZXR1cm4gJ0wnO1xuICB9LFxuICBnZXRUaG91c2FuZFNlcGFyYXRvcjogKGdyaWQsIG9jVXNlclN0YXRlKSA9PiB7XG4gICAgaWYgKGdyaWQudGhvdXNhbmRTZXBhcmF0b3IgJiYgdHlwZW9mIGdyaWQubGFuZ3VhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZ3JpZC50aG91c2FuZFNlcGFyYXRvcjtcbiAgICB9XG4gICAgaWYgKG9jVXNlclN0YXRlKSB7XG4gICAgICByZXR1cm4gb2NVc2VyU3RhdGUuZ2V0SW4oWydsb2NhbGVGb3JtYXQnLCAndGhvdXNhbmRTZXBhcmF0b3InXSwgJycpO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH0sXG4gIGdldERlY2ltYWxTZXBhcmF0b3I6IChncmlkLCBvY1VzZXJTdGF0ZSkgPT4ge1xuICAgIGlmIChncmlkLmRlY2ltYWxTZXBhcmF0b3IgJiYgdHlwZW9mIGdyaWQubGFuZ3VhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZ3JpZC5kZWNpbWFsU2VwYXJhdG9yO1xuICAgIH1cbiAgICBpZiAob2NVc2VyU3RhdGUpIHtcbiAgICAgIHJldHVybiBvY1VzZXJTdGF0ZS5nZXRJbihbJ2xvY2FsZUZvcm1hdCcsICdkZWNpbWFsU2VwYXJhdG9yJ10sICcuJyk7XG4gICAgfVxuICAgIHJldHVybiAnLic7XG4gIH0sXG4gIG5vcm1hbGl6ZUZpbHRlcmluZ0RhdGE6IChmaWx0ZXJpbmdEYXRhKSA9PiB7XG4gICAgbGV0IG5ld0ZpbHRlcmluZ0RhdGEgPSBNYXAoeyBpc0ZpbHRlcmluZzogZmFsc2UgfSk7XG4gICAgaWYgKCFmaWx0ZXJpbmdEYXRhKSByZXR1cm4gbmV3RmlsdGVyaW5nRGF0YTtcblxuICAgIGNvbnN0IG9sZEZpbHRlcmluZ0RhdGEgPSBNYXAuaXNNYXAoZmlsdGVyaW5nRGF0YSkgPyBmaWx0ZXJpbmdEYXRhIDogZnJvbUpTKGZpbHRlcmluZ0RhdGEpO1xuICAgIGNvbnN0IGlzRmlsdGVyaW5nID0gb2xkRmlsdGVyaW5nRGF0YS5nZXQoJ2lzRmlsdGVyaW5nJywgZmFsc2UpO1xuICAgIGNvbnN0IGZpbHRlckRhdGEgPSBvbGRGaWx0ZXJpbmdEYXRhLmdldCgnZmlsdGVyRGF0YScsIG51bGwpO1xuXG4gICAgaWYgKGlzRmlsdGVyaW5nICYmIGZpbHRlckRhdGEgJiYgTWFwLmlzTWFwKGZpbHRlckRhdGEpKSB7XG4gICAgICBuZXdGaWx0ZXJpbmdEYXRhID0gbmV3RmlsdGVyaW5nRGF0YVxuICAgICAgICAuc2V0KCdpc0ZpbHRlcmluZycsIHRydWUpXG4gICAgICAgIC5zZXQoJ2ZpbHRlckRhdGEnLCBmaWx0ZXJEYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3RmlsdGVyaW5nRGF0YTtcbiAgfSxcbiAgLypcbiAgICogQGZ1bmN0aW9uIHZpc2libGVDb2x1bW5zXG4gICAqIEBkZXNjICBSZXR1cm5zIGVpdGhlciB2aXNpYmxlIGNvbHVtbnMgKGlmIHNvbWUgY29sdW1ucyBhcmUgaGlkZGVuIClcbiAgICogICAgICAgIG9yIGdyaWQgZGVmYXVsdCBjb2x1bW5zLlxuICAgKiBAcGFyYW0gb3JpZ0NvbHVtbnMgQXJyYXkgb2YgR3JpZCBvcmlnaW5hbCBjb2x1bW5zIG9iamVjdHNcbiAgICogQHBhcmFtIHZpc2libGVDb2x1bW5zIEFycmF5IG9mIEdyaWQgdmlzaWJsZSBjb2x1bW5zIHZhbHVlS2V5UGF0aHNcbiAgICogQHJldHVybnMgQXJyYXkgb2YgY29sdW1uIG9iamVjdHMgY3VycmVudGx5IHZpc2libGUgZm9yIHVzZXIuXG4gICovXG4gIHZpc2libGVDb2x1bW5zOiAob3JpZ0NvbHVtbnMsIHZpc2libGVDb2x1bW5zKSA9PiB7XG4gICAgaWYgKCF2aXNpYmxlQ29sdW1ucykgcmV0dXJuIG9yaWdDb2x1bW5zO1xuICAgIGNvbnN0IGZpbHRlcmVkID0gdmlzaWJsZUNvbHVtbnMubWFwKCAgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgc2VhcmNoQ29sID0+IG9yaWdDb2x1bW5zLmZpbmQoICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgIC8vIHZhbHVlS2V5UGF0aCBpcyBqb2luZWQgaGVyZSBhcyBpdCBjYW4gYmUgYW4gYXJyYXkgbGlrZSBbJ2tleTEnLCAna2V5MiddLlxuICAgICAgICAvLyBzZWFyY2hDb2wgaXMgc2ltaWxhcmx5IGpvaW5lZCBpbiBvbkNlbGxLZXlEb3duIGluIGRhdGFncmlkLmNvbXBvbmVudC5qc3hcbiAgICAgICAgY29sID0+IEpTT04uc3RyaW5naWZ5KGNvbC52YWx1ZUtleVBhdGguam9pbignLycpKSA9PT0gSlNPTi5zdHJpbmdpZnkoc2VhcmNoQ29sKSkpO1xuICAgIHJldHVybiBmaWx0ZXJlZC50b0pTKCk7XG4gIH0sXG59O1xuIl19