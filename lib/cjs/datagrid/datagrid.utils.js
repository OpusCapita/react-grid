"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _isNaN = _interopRequireDefault(require("lodash/isNaN"));

var _util = require("util");

var _immutable = require("immutable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-nested-ternary */
var getColumnKey = function getColumnKey(col) {
  return col.columnKey || col.valueKeyPath.join('/');
};

var getVisibleColumns = function getVisibleColumns(cols, hiddenColumns, columnOrder) {
  if (hiddenColumns === void 0) {
    hiddenColumns = [];
  }

  if (columnOrder === void 0) {
    columnOrder = [];
  }

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

var _default = {
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
    } // No default align if component is select
    // Because rendered data is most likely text
    // Even if valueType is number


    if (col.componentType === 'select' || col.componentType === 'multiselect') {
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

    if (col.componentType === 'multiselect') {
      return function (val) {
        return val === '' || val === null || val === undefined || val.length === 0;
      };
    }

    switch (col.valueType) {
      case 'number':
      case 'float':
        return function (val) {
          return val === '' || (0, _isNaN["default"])(val) || val === null || val === undefined;
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
        var value = getVal(row); // session storage content is converted to immutable and multiselect
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
          var value = getVal(row);

          if (value === '' || (0, _isNaN["default"])(value) || value === null || value === undefined) {
            return false;
          } // match exact number value


          var filterValInt = parseInt(filterVal, 10);
          var valInt = parseInt(value, 10);

          if (filterValInt === valInt || filterValInt === valInt * -1) {
            return true;
          } // match partial


          return String(value).includes(filterVal);
        };

      case 'float':
        return function (row, filterVal) {
          var value = getVal(row);

          if (value === '' || (0, _isNaN["default"])(value) || value === null || value === undefined) {
            return false;
          } // match exact float value


          var filterValFloat = parseFloat(filterVal.replace(',', '.'));

          if (filterValFloat === parseFloat(value) || filterValFloat === parseFloat(value) * -1) {
            return true;
          } // match partial


          return String(value).replace(',', '.').includes(filterVal.replace(',', '.'));
        };

      case 'date':
        return function (row, filterVal) {
          if ((0, _moment["default"])(getVal(row)).isValid()) {
            return (0, _moment["default"])(getVal(row)).format(dateFormat) === (0, _moment["default"])(filterVal).format(dateFormat);
          }

          return false;
        };

      case 'boolean':
      case 'text':
      default:
        return function (row, filterVal) {
          var escapedVal = filterVal;
          var specialChars = '[]\\^$.|?*+()'; // If filter val starts with a Regex special character, we must escape it

          if (specialChars.includes(filterVal[0])) escapedVal = "\\" + filterVal;
          return new RegExp(escapedVal, 'i').test(getVal(row));
        };
    }
  },
  loadSelectedItems: function loadSelectedItems(grid) {
    var sessionItem = sessionStorage.getItem("oc_grid_selectedItems_" + grid.id);

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
    var sortingData = sessionStorage.getItem("oc_grid_sorting_" + grid.id);
    var filterData = sessionStorage.getItem("oc_grid_filtering_" + grid.id);
    var isFilteringData = localStorage.getItem("oc_grid_isFiltering_" + grid.id);
    var page = sessionStorage.getItem("oc_grid_page_" + grid.id);
    var rowsOnPage = sessionStorage.getItem("oc_grid_rowsOnPage_" + grid.id);
    var loadedConfig = {};
    var hiddenColumns;
    var columnOrder;
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
      var hiddenColumnsJson = localStorage.getItem("oc_grid_hiddenColumns_" + grid.id);

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
      var columnOrderJson = localStorage.getItem("oc_grid_columnOrder_" + grid.id);

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
      var columnWidths = localStorage.getItem("oc_grid_columnWidths_" + grid.id);

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
    sessionStorage.setItem("oc_grid_selectedItems_" + grid.id, JSON.stringify(selectedItems || []));
    return true;
  },
  saveColumnWidths: function saveColumnWidths(grid, columnWidths) {
    if (grid.disableRememberColumnWidths) return false;
    if (!columnWidths) return false;

    if (grid.configStorage && (0, _util.isFunction)(grid.configStorage.save)) {
      grid.configStorage.save({
        columnWidths: columnWidths
      });
    } else {
      localStorage.setItem("oc_grid_columnWidths_" + grid.id, JSON.stringify(columnWidths));
    }

    return true;
  },
  saveColumnSettings: function saveColumnSettings(grid, hiddenColumns, columnOrder) {
    if (!hiddenColumns || !columnOrder) return false;

    if (grid.configStorage && (0, _util.isFunction)(grid.configStorage.save)) {
      grid.configStorage.save({
        hiddenColumns: hiddenColumns,
        columnOrder: columnOrder
      });
    } else {
      localStorage.setItem("oc_grid_hiddenColumns_" + grid.id, JSON.stringify(hiddenColumns));
      localStorage.setItem("oc_grid_columnOrder_" + grid.id, JSON.stringify(columnOrder));
    }

    return true;
  },
  saveSortData: function saveSortData(grid, sortingData) {
    if (grid.disableRememberSortData) return false;
    if (!sortingData) return false;
    sessionStorage.setItem("oc_grid_sorting_" + grid.id, JSON.stringify(sortingData));
    return true;
  },
  saveFilterData: function saveFilterData(grid, filterData) {
    if (grid.disableRememberFilterData) return false;
    if (!filterData) return false;
    sessionStorage.setItem("oc_grid_filtering_" + grid.id, JSON.stringify(filterData));
    return true;
  },
  saveIsFiltering: function saveIsFiltering(grid, isFiltering) {
    if (grid.disableRememberIsFiltering) return false;
    if (isFiltering === undefined) return false;
    localStorage.setItem("oc_grid_isFiltering_" + grid.id, JSON.stringify(isFiltering));

    if (!isFiltering) {
      sessionStorage.removeItem("oc_grid_filtering_" + grid.id);
    }

    return true;
  },
  savePage: function savePage(grid, page) {
    if (!page) return false;
    sessionStorage.setItem("oc_grid_page_" + grid.id, JSON.stringify(page));
    return true;
  },
  saveRowsOnPage: function saveRowsOnPage(grid, rowsOnPage) {
    if (!rowsOnPage) return false;
    sessionStorage.setItem("oc_grid_rowsOnPage_" + grid.id, JSON.stringify(rowsOnPage));
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
    var newFilteringData = (0, _immutable.Map)({
      isFiltering: false
    });
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
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC51dGlscy5qcyJdLCJuYW1lcyI6WyJnZXRDb2x1bW5LZXkiLCJjb2wiLCJjb2x1bW5LZXkiLCJ2YWx1ZUtleVBhdGgiLCJqb2luIiwiZ2V0VmlzaWJsZUNvbHVtbnMiLCJjb2xzIiwiaGlkZGVuQ29sdW1ucyIsImNvbHVtbk9yZGVyIiwib3JkZXJlZENvbHVtbkxpc3QiLCJmb3JFYWNoIiwiaSIsImNvbE9yZGVySWR4IiwiaW5kZXhPZiIsImRlZmF1bHRIaWRkZW4iLCJpc0hpZGRlbiIsIm9yZGVyIiwicHVzaCIsInNvcnQiLCJhIiwiYiIsIm1hcCIsIml0ZW0iLCJnZXRDb2x1bW5EZWZhdWx0VmFsdWVzIiwiY29sdW1uRGVmYXVsdFZhbHVlcyIsImRlZmF1bHRWYWx1ZSIsInVuZGVmaW5lZCIsImdldENlbGxTdHlsZUJ5Q29sIiwiYWxpZ24iLCJ0ZXh0QWxpZ24iLCJjb21wb25lbnRUeXBlIiwidmFsdWVUeXBlIiwiaXNTb3J0YWJsZSIsInNvcnRWYWx1ZUdldHRlciIsImRpc2FibGVTb3J0aW5nIiwiZ2V0U29ydENvbXBhcmF0b3IiLCJzb3J0Q29tcGFyYXRvciIsImxvY2FsZUNvbXBhcmUiLCJEYXRlIiwiZ2V0U29ydFZhbHVlR2V0dGVyIiwiZGF0YSIsImdldEluIiwiZ2V0VmFsdWVFbXB0eUNoZWNrZXIiLCJ2YWx1ZUVtcHR5Q2hlY2tlciIsInZhbCIsImxlbmd0aCIsImdldEZpbHRlck1hdGNoZXIiLCJkYXRlRm9ybWF0IiwiZmlsdGVyTWF0Y2hlciIsImdldFZhbCIsInJvdyIsImZpbHRlclZhbCIsInZhbHVlIiwiZmlsdGVycyIsInRvSlMiLCJzb21lIiwiZmlsdGVyIiwiZmlsdGVyVmFsSW50IiwicGFyc2VJbnQiLCJ2YWxJbnQiLCJTdHJpbmciLCJpbmNsdWRlcyIsImZpbHRlclZhbEZsb2F0IiwicGFyc2VGbG9hdCIsInJlcGxhY2UiLCJpc1ZhbGlkIiwiZm9ybWF0IiwiZXNjYXBlZFZhbCIsInNwZWNpYWxDaGFycyIsIlJlZ0V4cCIsInRlc3QiLCJsb2FkU2VsZWN0ZWRJdGVtcyIsImdyaWQiLCJzZXNzaW9uSXRlbSIsInNlc3Npb25TdG9yYWdlIiwiZ2V0SXRlbSIsImlkIiwiZGlzYWJsZVJlbWVtYmVyU2VsZWN0ZWRJdGVtcyIsIkpTT04iLCJwYXJzZSIsImUiLCJjb25zb2xlIiwiZXJyb3IiLCJsb2FkR3JpZENvbmZpZyIsImNvbmZpZ1N0b3JhZ2UiLCJzb3J0aW5nRGF0YSIsImZpbHRlckRhdGEiLCJpc0ZpbHRlcmluZ0RhdGEiLCJsb2NhbFN0b3JhZ2UiLCJwYWdlIiwicm93c09uUGFnZSIsImxvYWRlZENvbmZpZyIsImlzRmlsdGVyaW5nIiwibG9hZCIsImRpc2FibGVSZW1lbWJlcklzRmlsdGVyaW5nIiwiZGVmYXVsdFNob3dGaWx0ZXJpbmdSb3ciLCJoaWRkZW5Db2x1bW5zSnNvbiIsImNvbHVtbk9yZGVySnNvbiIsImNvbmZpZyIsInZpc2libGVDb2x1bW5zIiwiZmlsdGVyaW5nRGF0YSIsImNvbHVtbldpZHRocyIsImRpc2FibGVSZW1lbWJlckNvbHVtbldpZHRocyIsImRpc2FibGVSZW1lbWJlclNvcnREYXRhIiwiZGlzYWJsZVJlbWVtYmVyRmlsdGVyRGF0YSIsImRlZmF1bHRTb3J0Q29sdW1uIiwic29ydENvbHVtbiIsInNvcnRPcmRlciIsImRlZmF1bHRTb3J0T3JkZXIiLCJzYXZlU2VsZWN0ZWRJdGVtcyIsInNlbGVjdGVkSXRlbXMiLCJzZXRJdGVtIiwic3RyaW5naWZ5Iiwic2F2ZUNvbHVtbldpZHRocyIsInNhdmUiLCJzYXZlQ29sdW1uU2V0dGluZ3MiLCJzYXZlU29ydERhdGEiLCJzYXZlRmlsdGVyRGF0YSIsInNhdmVJc0ZpbHRlcmluZyIsInJlbW92ZUl0ZW0iLCJzYXZlUGFnZSIsInNhdmVSb3dzT25QYWdlIiwiY2hlY2tHcmlkUGFyYW0iLCJncmlkUGFyYW0iLCJFcnJvciIsImlkS2V5UGF0aCIsImNoZWNrQ29sdW1uc1BhcmFtIiwiY29sdW1uc1BhcmFtIiwiZ2V0TGFuZ3VhZ2UiLCJvY1VzZXJTdGF0ZSIsImxhbmd1YWdlIiwiZ2V0UmVnaW9uIiwiZGVmYXVsdFJlZ2lvbiIsInJlZ2lvbiIsImdldERhdGVGb3JtYXQiLCJ0b1VwcGVyQ2FzZSIsImdldFRob3VzYW5kU2VwYXJhdG9yIiwidGhvdXNhbmRTZXBhcmF0b3IiLCJnZXREZWNpbWFsU2VwYXJhdG9yIiwiZGVjaW1hbFNlcGFyYXRvciIsIm5vcm1hbGl6ZUZpbHRlcmluZ0RhdGEiLCJuZXdGaWx0ZXJpbmdEYXRhIiwib2xkRmlsdGVyaW5nRGF0YSIsIk1hcCIsImlzTWFwIiwiZ2V0Iiwic2V0Iiwib3JpZ0NvbHVtbnMiLCJmaWx0ZXJlZCIsInNlYXJjaENvbCIsImZpbmQiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFKQTtBQU1BLElBQU1BLFlBQVksR0FBRyxTQUFmQSxZQUFlLENBQUFDLEdBQUc7QUFBQSxTQUFJQSxHQUFHLENBQUNDLFNBQUosSUFBaUJELEdBQUcsQ0FBQ0UsWUFBSixDQUFpQkMsSUFBakIsQ0FBc0IsR0FBdEIsQ0FBckI7QUFBQSxDQUF4Qjs7QUFFQSxJQUFNQyxpQkFBaUIsR0FBRyxTQUFwQkEsaUJBQW9CLENBQUNDLElBQUQsRUFBT0MsYUFBUCxFQUEyQkMsV0FBM0IsRUFBZ0Q7QUFBQSxNQUF6Q0QsYUFBeUM7QUFBekNBLElBQUFBLGFBQXlDLEdBQXpCLEVBQXlCO0FBQUE7O0FBQUEsTUFBckJDLFdBQXFCO0FBQXJCQSxJQUFBQSxXQUFxQixHQUFQLEVBQU87QUFBQTs7QUFDeEUsTUFBTUMsaUJBQWlCLEdBQUcsRUFBMUI7QUFDQUgsRUFBQUEsSUFBSSxDQUFDSSxPQUFMLENBQWEsVUFBQ1QsR0FBRCxFQUFNVSxDQUFOLEVBQVk7QUFDdkIsUUFBTVQsU0FBUyxHQUFHRixZQUFZLENBQUNDLEdBQUQsQ0FBOUI7QUFDQSxRQUFNVyxXQUFXLEdBQUdKLFdBQVcsQ0FBQ0ssT0FBWixDQUFvQlgsU0FBcEIsQ0FBcEI7QUFDQSxRQUFNWSxh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QUFPdUQsZ0JBQVA7QUFDRCxHQTNaWTs7QUE0WmI7Ozs7Ozs7O0FBUUExQyxFQUFBQSxjQUFjLEVBQUUsd0JBQUNnRCxXQUFELEVBQWNoRCxlQUFkLEVBQWlDO0FBQy9DLFFBQUksQ0FBQ0EsZUFBTCxFQUFxQixPQUFPZ0QsV0FBUDs7QUFDckIsUUFBTUMsUUFBUSxHQUFHakQsZUFBYyxDQUFDOUUsR0FBZixFQUNmO0FBQ0EsY0FBQWdJLFNBQVM7QUFBQSxhQUFJRixXQUFXLENBQUNHLElBQVosRUFDVDtBQUNGO0FBQ0E7QUFDQSxnQkFBQXJKLEdBQUc7QUFBQSxlQUFJNkUsSUFBSSxDQUFDa0MsU0FBTCxDQUFlL0csR0FBRyxDQUFDRSxZQUFKLENBQWlCQyxJQUFqQixDQUFzQixHQUF0QixDQUFmLE1BQStDMEUsSUFBSSxDQUFDa0MsU0FBTCxDQUFlcUMsU0FBZixDQUFuRDtBQUFBLE9BSlEsQ0FBSjtBQUFBLEtBRk0sQ0FBakI7O0FBU0EsV0FBT0QsUUFBUSxDQUFDOUYsSUFBVCxFQUFQO0FBQ0Q7QUFoYlksQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLW5lc3RlZC10ZXJuYXJ5ICovXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgaXNOYU4gZnJvbSAnbG9kYXNoL2lzTmFOJztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICd1dGlsJztcbmltcG9ydCB7IE1hcCwgZnJvbUpTIH0gZnJvbSAnaW1tdXRhYmxlJztcblxuY29uc3QgZ2V0Q29sdW1uS2V5ID0gY29sID0+IGNvbC5jb2x1bW5LZXkgfHwgY29sLnZhbHVlS2V5UGF0aC5qb2luKCcvJyk7XG5cbmNvbnN0IGdldFZpc2libGVDb2x1bW5zID0gKGNvbHMsIGhpZGRlbkNvbHVtbnMgPSBbXSwgY29sdW1uT3JkZXIgPSBbXSkgPT4ge1xuICBjb25zdCBvcmRlcmVkQ29sdW1uTGlzdCA9IFtdO1xuICBjb2xzLmZvckVhY2goKGNvbCwgaSkgPT4ge1xuICAgIGNvbnN0IGNvbHVtbktleSA9IGdldENvbHVtbktleShjb2wpO1xuICAgIGNvbnN0IGNvbE9yZGVySWR4ID0gY29sdW1uT3JkZXIuaW5kZXhPZihjb2x1bW5LZXkpO1xuICAgIGNvbnN0IGRlZmF1bHRIaWRkZW4gPSBjb2wuaXNIaWRkZW4gJiYgY29sT3JkZXJJZHggPT09IC0xO1xuICAgIGlmIChkZWZhdWx0SGlkZGVuIHx8IGhpZGRlbkNvbHVtbnMuaW5kZXhPZihjb2x1bW5LZXkpID4gLTEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgb3JkZXIgPSBjb2xPcmRlcklkeCAhPT0gLTEgPyBjb2xPcmRlcklkeCA6IGkgKyAxO1xuICAgIG9yZGVyZWRDb2x1bW5MaXN0LnB1c2goe1xuICAgICAgY29sdW1uS2V5LFxuICAgICAgb3JkZXIsXG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gb3JkZXJlZENvbHVtbkxpc3Quc29ydCgoYSwgYikgPT4gYS5vcmRlciAtIGIub3JkZXIpLm1hcChpdGVtID0+IGl0ZW0uY29sdW1uS2V5KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZ2V0Q29sdW1uS2V5LFxuICBnZXRDb2x1bW5EZWZhdWx0VmFsdWVzOiAoY29scykgPT4ge1xuICAgIGNvbnN0IGNvbHVtbkRlZmF1bHRWYWx1ZXMgPSB7fTtcbiAgICBjb2xzLmZvckVhY2goKGNvbCkgPT4ge1xuICAgICAgaWYgKGNvbC5kZWZhdWx0VmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb2x1bW5EZWZhdWx0VmFsdWVzW2dldENvbHVtbktleShjb2wpXSA9IGNvbC5kZWZhdWx0VmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGNvbHVtbkRlZmF1bHRWYWx1ZXM7XG4gIH0sXG4gIGdldENlbGxTdHlsZUJ5Q29sOiAoY29sKSA9PiB7XG4gICAgaWYgKGNvbC5hbGlnbikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGV4dEFsaWduOiBjb2wuYWxpZ24sXG4gICAgICB9O1xuICAgIH1cbiAgICAvLyBObyBkZWZhdWx0IGFsaWduIGlmIGNvbXBvbmVudCBpcyBzZWxlY3RcbiAgICAvLyBCZWNhdXNlIHJlbmRlcmVkIGRhdGEgaXMgbW9zdCBsaWtlbHkgdGV4dFxuICAgIC8vIEV2ZW4gaWYgdmFsdWVUeXBlIGlzIG51bWJlclxuICAgIGlmIChjb2wuY29tcG9uZW50VHlwZSA9PT0gJ3NlbGVjdCcgfHwgY29sLmNvbXBvbmVudFR5cGUgPT09ICdtdWx0aXNlbGVjdCcpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgc3dpdGNoIChjb2wudmFsdWVUeXBlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdGV4dEFsaWduOiAncmlnaHQnLFxuICAgICAgICB9O1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgfSxcbiAgaXNTb3J0YWJsZTogY29sID0+IGNvbC52YWx1ZVR5cGVcbiAgICAmJiAoY29sLnNvcnRWYWx1ZUdldHRlciB8fCBjb2wudmFsdWVLZXlQYXRoKVxuICAgICYmICFjb2wuZGlzYWJsZVNvcnRpbmcsXG4gIGdldFNvcnRDb21wYXJhdG9yOiAoY29sKSA9PiB7XG4gICAgaWYgKGNvbC5zb3J0Q29tcGFyYXRvcikge1xuICAgICAgcmV0dXJuIGNvbC5zb3J0Q29tcGFyYXRvcjtcbiAgICB9XG4gICAgc3dpdGNoIChjb2wudmFsdWVUeXBlKSB7XG4gICAgICBjYXNlICd0ZXh0JzpcbiAgICAgICAgcmV0dXJuIChhLCBiKSA9PiAoYS5sb2NhbGVDb21wYXJlID8gYS5sb2NhbGVDb21wYXJlKGIpIDogMSk7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgICByZXR1cm4gKGEsIGIpID0+IGEgLSBiO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIHJldHVybiAoYSwgYikgPT4gKGEgPT09IGIgPyAwIDogYSA/IC0xIDogMSk7XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgcmV0dXJuIChhLCBiKSA9PiBuZXcgRGF0ZShhKSAtIG5ldyBEYXRlKGIpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIChhLCBiKSA9PiAoYS5sb2NhbGVDb21wYXJlID8gYS5sb2NhbGVDb21wYXJlKGIpIDogMSk7XG4gICAgfVxuICB9LFxuICBnZXRTb3J0VmFsdWVHZXR0ZXI6IChjb2wpID0+IHtcbiAgICBpZiAoY29sLnNvcnRWYWx1ZUdldHRlcikge1xuICAgICAgcmV0dXJuIGNvbC5zb3J0VmFsdWVHZXR0ZXI7XG4gICAgfVxuICAgIHJldHVybiBkYXRhID0+IGRhdGEuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG4gIH0sXG4gIGdldFZhbHVlRW1wdHlDaGVja2VyOiAoY29sKSA9PiB7XG4gICAgaWYgKGNvbC52YWx1ZUVtcHR5Q2hlY2tlcikge1xuICAgICAgcmV0dXJuIGNvbC52YWx1ZUVtcHR5Q2hlY2tlcjtcbiAgICB9XG4gICAgaWYgKGNvbC5jb21wb25lbnRUeXBlID09PSAnbXVsdGlzZWxlY3QnKSB7XG4gICAgICByZXR1cm4gdmFsID0+IHZhbCA9PT0gJycgfHwgdmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkIHx8IHZhbC5sZW5ndGggPT09IDA7XG4gICAgfVxuXG4gICAgc3dpdGNoIChjb2wudmFsdWVUeXBlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgICByZXR1cm4gdmFsID0+IHZhbCA9PT0gJycgfHwgaXNOYU4odmFsKSB8fCB2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQ7XG4gICAgICBjYXNlICd0ZXh0JzpcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICBjYXNlICdzZWxlY3QnOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHZhbCA9PiB2YWwgPT09ICcnIHx8IHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZDtcbiAgICB9XG4gIH0sXG4gIGdldEZpbHRlck1hdGNoZXI6IChjb2wsIGRhdGVGb3JtYXQpID0+IHtcbiAgICBpZiAoY29sLmZpbHRlck1hdGNoZXIpIHJldHVybiBjb2wuZmlsdGVyTWF0Y2hlcjtcbiAgICBjb25zdCBnZXRWYWwgPSByb3cgPT4gcm93LmdldEluKGNvbC52YWx1ZUtleVBhdGgpO1xuXG4gICAgaWYgKGNvbC5jb21wb25lbnRUeXBlID09PSAnbXVsdGlzZWxlY3QnKSB7XG4gICAgICByZXR1cm4gKHJvdywgZmlsdGVyVmFsKSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gZ2V0VmFsKHJvdyk7XG4gICAgICAgIC8vIHNlc3Npb24gc3RvcmFnZSBjb250ZW50IGlzIGNvbnZlcnRlZCB0byBpbW11dGFibGUgYW5kIG11bHRpc2VsZWN0XG4gICAgICAgIC8vIGZpbHRlcnMgaXMgdGhlbiBsaXN0IG90aGVyd2lzZSBhcnJheVxuICAgICAgICBjb25zdCBmaWx0ZXJzID0gZmlsdGVyVmFsICYmIGZpbHRlclZhbC50b0pTID8gZmlsdGVyVmFsLnRvSlMoKSA6IGZpbHRlclZhbDtcbiAgICAgICAgcmV0dXJuIGZpbHRlcnMuc29tZShmaWx0ZXIgPT4gZmlsdGVyLnZhbHVlID09PSB2YWx1ZSk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHN3aXRjaCAoY29sLnZhbHVlVHlwZSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgcmV0dXJuIChyb3csIGZpbHRlclZhbCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gZ2V0VmFsKHJvdyk7XG4gICAgICAgICAgaWYgKHZhbHVlID09PSAnJyB8fCBpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBtYXRjaCBleGFjdCBudW1iZXIgdmFsdWVcbiAgICAgICAgICBjb25zdCBmaWx0ZXJWYWxJbnQgPSBwYXJzZUludChmaWx0ZXJWYWwsIDEwKTtcbiAgICAgICAgICBjb25zdCB2YWxJbnQgPSBwYXJzZUludCh2YWx1ZSwgMTApO1xuICAgICAgICAgIGlmIChmaWx0ZXJWYWxJbnQgPT09IHZhbEludCB8fCBmaWx0ZXJWYWxJbnQgPT09IHZhbEludCAqIC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gbWF0Y2ggcGFydGlhbFxuICAgICAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpLmluY2x1ZGVzKGZpbHRlclZhbCk7XG4gICAgICAgIH07XG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICAgIHJldHVybiAocm93LCBmaWx0ZXJWYWwpID0+IHtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IGdldFZhbChyb3cpO1xuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gJycgfHwgaXNOYU4odmFsdWUpIHx8IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gbWF0Y2ggZXhhY3QgZmxvYXQgdmFsdWVcbiAgICAgICAgICBjb25zdCBmaWx0ZXJWYWxGbG9hdCA9IHBhcnNlRmxvYXQoZmlsdGVyVmFsLnJlcGxhY2UoJywnLCAnLicpKTtcbiAgICAgICAgICBpZiAoZmlsdGVyVmFsRmxvYXQgPT09IHBhcnNlRmxvYXQodmFsdWUpIHx8IGZpbHRlclZhbEZsb2F0ID09PSBwYXJzZUZsb2F0KHZhbHVlKSAqIC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gbWF0Y2ggcGFydGlhbFxuICAgICAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpLnJlcGxhY2UoJywnLCAnLicpLmluY2x1ZGVzKGZpbHRlclZhbC5yZXBsYWNlKCcsJywgJy4nKSk7XG4gICAgICAgIH07XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgcmV0dXJuIChyb3csIGZpbHRlclZhbCkgPT4ge1xuICAgICAgICAgIGlmIChtb21lbnQoZ2V0VmFsKHJvdykpLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG1vbWVudChnZXRWYWwocm93KSkuZm9ybWF0KGRhdGVGb3JtYXQpID09PSBtb21lbnQoZmlsdGVyVmFsKS5mb3JtYXQoZGF0ZUZvcm1hdCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgY2FzZSAndGV4dCc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gKHJvdywgZmlsdGVyVmFsKSA9PiB7XG4gICAgICAgICAgbGV0IGVzY2FwZWRWYWwgPSBmaWx0ZXJWYWw7XG4gICAgICAgICAgY29uc3Qgc3BlY2lhbENoYXJzID0gJ1tdXFxcXF4kLnw/KisoKSc7XG5cbiAgICAgICAgICAvLyBJZiBmaWx0ZXIgdmFsIHN0YXJ0cyB3aXRoIGEgUmVnZXggc3BlY2lhbCBjaGFyYWN0ZXIsIHdlIG11c3QgZXNjYXBlIGl0XG4gICAgICAgICAgaWYgKHNwZWNpYWxDaGFycy5pbmNsdWRlcyhmaWx0ZXJWYWxbMF0pKSBlc2NhcGVkVmFsID0gYFxcXFwke2ZpbHRlclZhbH1gO1xuICAgICAgICAgIHJldHVybiBuZXcgUmVnRXhwKGVzY2FwZWRWYWwsICdpJykudGVzdChnZXRWYWwocm93KSk7XG4gICAgICAgIH07XG4gICAgfVxuICB9LFxuICBsb2FkU2VsZWN0ZWRJdGVtczogKGdyaWQpID0+IHtcbiAgICBjb25zdCBzZXNzaW9uSXRlbSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfc2VsZWN0ZWRJdGVtc18ke2dyaWQuaWR9YCk7XG4gICAgaWYgKHNlc3Npb25JdGVtICYmICFncmlkLmRpc2FibGVSZW1lbWJlclNlbGVjdGVkSXRlbXMpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHNlc3Npb25JdGVtKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgc2VsZWN0ZWRJdGVtcyBmcm9tIHNlc3Npb25TdG9yYWdlJywgZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBbXTtcbiAgfSxcbiAgbG9hZEdyaWRDb25maWc6IChncmlkLCBjb2xzKSA9PiB7XG4gICAgY29uc3QgY29uZmlnU3RvcmFnZSA9IGdyaWQuY29uZmlnU3RvcmFnZSB8fCB7fTtcbiAgICBjb25zdCBzb3J0aW5nRGF0YSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfc29ydGluZ18ke2dyaWQuaWR9YCk7XG4gICAgY29uc3QgZmlsdGVyRGF0YSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfZmlsdGVyaW5nXyR7Z3JpZC5pZH1gKTtcbiAgICBjb25zdCBpc0ZpbHRlcmluZ0RhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgb2NfZ3JpZF9pc0ZpbHRlcmluZ18ke2dyaWQuaWR9YCk7XG4gICAgY29uc3QgcGFnZSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfcGFnZV8ke2dyaWQuaWR9YCk7XG4gICAgY29uc3Qgcm93c09uUGFnZSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfcm93c09uUGFnZV8ke2dyaWQuaWR9YCk7XG4gICAgbGV0IGxvYWRlZENvbmZpZyA9IHt9O1xuICAgIGxldCBoaWRkZW5Db2x1bW5zO1xuICAgIGxldCBjb2x1bW5PcmRlcjtcbiAgICBsZXQgaXNGaWx0ZXJpbmcgPSBmYWxzZTtcblxuICAgIGlmIChpc0Z1bmN0aW9uKGNvbmZpZ1N0b3JhZ2UubG9hZCkpIHtcbiAgICAgIGxvYWRlZENvbmZpZyA9IGNvbmZpZ1N0b3JhZ2UubG9hZCgpO1xuICAgIH1cblxuICAgIGlmIChpc0ZpbHRlcmluZ0RhdGEpIHtcbiAgICAgIGlmICghZ3JpZC5kaXNhYmxlUmVtZW1iZXJJc0ZpbHRlcmluZykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlzRmlsdGVyaW5nID0gSlNPTi5wYXJzZShpc0ZpbHRlcmluZ0RhdGEpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhZ3JpZDogZXJyb3IgcGFyc2luZyBpc0ZpbHRlcmluZ0RhdGEgZnJvbSBsb2NhbFN0b3JhZ2UnLCBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZ3JpZC5kZWZhdWx0U2hvd0ZpbHRlcmluZ1Jvdykge1xuICAgICAgaXNGaWx0ZXJpbmcgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAobG9hZGVkQ29uZmlnLmhpZGRlbkNvbHVtbnMpIHtcbiAgICAgIGhpZGRlbkNvbHVtbnMgPSBsb2FkZWRDb25maWcuaGlkZGVuQ29sdW1uczsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBoaWRkZW5Db2x1bW5zSnNvbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX2hpZGRlbkNvbHVtbnNfJHtncmlkLmlkfWApO1xuICAgICAgaWYgKGhpZGRlbkNvbHVtbnNKc29uKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaGlkZGVuQ29sdW1ucyA9IEpTT04ucGFyc2UoaGlkZGVuQ29sdW1uc0pzb24pO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhZ3JpZDogZXJyb3IgcGFyc2luZyBoaWRkZW5Db2x1bW5zIGZyb20gbG9jYWxTdG9yYWdlJywgZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGxvYWRlZENvbmZpZy5jb2x1bW5PcmRlcikge1xuICAgICAgY29sdW1uT3JkZXIgPSBsb2FkZWRDb25maWcuY29sdW1uT3JkZXI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgY29sdW1uT3JkZXJKc29uID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfY29sdW1uT3JkZXJfJHtncmlkLmlkfWApO1xuICAgICAgaWYgKGNvbHVtbk9yZGVySnNvbikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbHVtbk9yZGVyID0gSlNPTi5wYXJzZShjb2x1bW5PcmRlckpzb24pO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhZ3JpZDogZXJyb3IgcGFyc2luZyBjb2x1bW5PcmRlciBmcm9tIGxvY2FsU3RvcmFnZScsIGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGNvbmZpZyA9IHtcbiAgICAgIHZpc2libGVDb2x1bW5zOiBnZXRWaXNpYmxlQ29sdW1ucyhjb2xzLCBoaWRkZW5Db2x1bW5zLCBjb2x1bW5PcmRlciksXG4gICAgICBmaWx0ZXJpbmdEYXRhOiB7XG4gICAgICAgIGlzRmlsdGVyaW5nLFxuICAgICAgfSxcbiAgICB9O1xuICAgIGlmIChsb2FkZWRDb25maWcuY29sdW1uV2lkdGhzKSB7XG4gICAgICBjb25maWcuY29sdW1uV2lkdGhzID0gbG9hZGVkQ29uZmlnLmNvbHVtbldpZHRocztcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgY29sdW1uV2lkdGhzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfY29sdW1uV2lkdGhzXyR7Z3JpZC5pZH1gKTtcbiAgICAgIGlmIChjb2x1bW5XaWR0aHMgJiYgIWdyaWQuZGlzYWJsZVJlbWVtYmVyQ29sdW1uV2lkdGhzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uZmlnLmNvbHVtbldpZHRocyA9IEpTT04ucGFyc2UoY29sdW1uV2lkdGhzKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgY29sdW1uV2lkdGhzIGZyb20gbG9jYWxTdG9yYWdlJywgZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNvcnRpbmdEYXRhICYmICFncmlkLmRpc2FibGVSZW1lbWJlclNvcnREYXRhKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25maWcuc29ydGluZ0RhdGEgPSBKU09OLnBhcnNlKHNvcnRpbmdEYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgc29ydGluZ0RhdGEgZnJvbSBzZXNzaW9uU3RvcmFnZScsIGUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZmlsdGVyRGF0YSAmJiBpc0ZpbHRlcmluZyAmJiAhZ3JpZC5kaXNhYmxlUmVtZW1iZXJGaWx0ZXJEYXRhKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25maWcuZmlsdGVyaW5nRGF0YS5maWx0ZXJEYXRhID0gSlNPTi5wYXJzZShmaWx0ZXJEYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgZmlsdGVyRGF0YSBmcm9tIHNlc3Npb25TdG9yYWdlJywgZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChwYWdlKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25maWcucGFnZSA9IEpTT04ucGFyc2UocGFnZSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIHBhZ2luYXRpb24gZnJvbSBzZXNzaW9uU3RvcmFnZScsIGUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocm93c09uUGFnZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uZmlnLnJvd3NPblBhZ2UgPSBKU09OLnBhcnNlKHJvd3NPblBhZ2UpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhZ3JpZDogZXJyb3IgcGFyc2luZyBwYWdpbmF0aW9uIGZyb20gc2Vzc2lvblN0b3JhZ2UnLCBlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy5zb3J0aW5nRGF0YSAmJiBncmlkLmRlZmF1bHRTb3J0Q29sdW1uKSB7XG4gICAgICBjb25maWcuc29ydGluZ0RhdGEgPSB7XG4gICAgICAgIHNvcnRDb2x1bW46IGdyaWQuZGVmYXVsdFNvcnRDb2x1bW4sXG4gICAgICAgIHNvcnRPcmRlcjogZ3JpZC5kZWZhdWx0U29ydE9yZGVyIHx8ICdhc2MnLFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbmZpZztcbiAgfSxcbiAgc2F2ZVNlbGVjdGVkSXRlbXM6IChncmlkLCBzZWxlY3RlZEl0ZW1zKSA9PiB7XG4gICAgaWYgKGdyaWQuZGlzYWJsZVJlbWVtYmVyU2VsZWN0ZWRJdGVtcykgcmV0dXJuIGZhbHNlO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oYG9jX2dyaWRfc2VsZWN0ZWRJdGVtc18ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoc2VsZWN0ZWRJdGVtcyB8fCBbXSkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBzYXZlQ29sdW1uV2lkdGhzOiAoZ3JpZCwgY29sdW1uV2lkdGhzKSA9PiB7XG4gICAgaWYgKGdyaWQuZGlzYWJsZVJlbWVtYmVyQ29sdW1uV2lkdGhzKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFjb2x1bW5XaWR0aHMpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoZ3JpZC5jb25maWdTdG9yYWdlICYmIGlzRnVuY3Rpb24oZ3JpZC5jb25maWdTdG9yYWdlLnNhdmUpKSB7XG4gICAgICBncmlkLmNvbmZpZ1N0b3JhZ2Uuc2F2ZSh7IGNvbHVtbldpZHRocyB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYG9jX2dyaWRfY29sdW1uV2lkdGhzXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShjb2x1bW5XaWR0aHMpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIHNhdmVDb2x1bW5TZXR0aW5nczogKGdyaWQsIGhpZGRlbkNvbHVtbnMsIGNvbHVtbk9yZGVyKSA9PiB7XG4gICAgaWYgKCFoaWRkZW5Db2x1bW5zIHx8ICFjb2x1bW5PcmRlcikgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChncmlkLmNvbmZpZ1N0b3JhZ2UgJiYgaXNGdW5jdGlvbihncmlkLmNvbmZpZ1N0b3JhZ2Uuc2F2ZSkpIHtcbiAgICAgIGdyaWQuY29uZmlnU3RvcmFnZS5zYXZlKHsgaGlkZGVuQ29sdW1ucywgY29sdW1uT3JkZXIgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX2hpZGRlbkNvbHVtbnNfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KGhpZGRlbkNvbHVtbnMpKTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX2NvbHVtbk9yZGVyXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShjb2x1bW5PcmRlcikpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgc2F2ZVNvcnREYXRhOiAoZ3JpZCwgc29ydGluZ0RhdGEpID0+IHtcbiAgICBpZiAoZ3JpZC5kaXNhYmxlUmVtZW1iZXJTb3J0RGF0YSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghc29ydGluZ0RhdGEpIHJldHVybiBmYWxzZTtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX3NvcnRpbmdfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KHNvcnRpbmdEYXRhKSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIHNhdmVGaWx0ZXJEYXRhOiAoZ3JpZCwgZmlsdGVyRGF0YSkgPT4ge1xuICAgIGlmIChncmlkLmRpc2FibGVSZW1lbWJlckZpbHRlckRhdGEpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIWZpbHRlckRhdGEpIHJldHVybiBmYWxzZTtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX2ZpbHRlcmluZ18ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoZmlsdGVyRGF0YSkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBzYXZlSXNGaWx0ZXJpbmc6IChncmlkLCBpc0ZpbHRlcmluZykgPT4ge1xuICAgIGlmIChncmlkLmRpc2FibGVSZW1lbWJlcklzRmlsdGVyaW5nKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGlzRmlsdGVyaW5nID09PSB1bmRlZmluZWQpIHJldHVybiBmYWxzZTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9pc0ZpbHRlcmluZ18ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoaXNGaWx0ZXJpbmcpKTtcbiAgICBpZiAoIWlzRmlsdGVyaW5nKSB7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKGBvY19ncmlkX2ZpbHRlcmluZ18ke2dyaWQuaWR9YCk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBzYXZlUGFnZTogKGdyaWQsIHBhZ2UpID0+IHtcbiAgICBpZiAoIXBhZ2UpIHJldHVybiBmYWxzZTtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX3BhZ2VfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KHBhZ2UpKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgc2F2ZVJvd3NPblBhZ2U6IChncmlkLCByb3dzT25QYWdlKSA9PiB7XG4gICAgaWYgKCFyb3dzT25QYWdlKSByZXR1cm4gZmFsc2U7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9yb3dzT25QYWdlXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShyb3dzT25QYWdlKSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIC8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbiAgY2hlY2tHcmlkUGFyYW06IChncmlkUGFyYW0pID0+IHtcbiAgICBpZiAoZ3JpZFBhcmFtKSB7XG4gICAgICBpZiAoIWdyaWRQYXJhbS5pZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ1tHcmlkXSBJbnZhbGlkIGBncmlkLmlkYCBwYXJhbWV0ZXIsIHVwZGF0ZSBhY3Rpb24gcGFyYW1ldGVycyB0byBuZXcgZm9ybWF0IScsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAoIWdyaWRQYXJhbS5pZEtleVBhdGgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdbR3JpZF0gSW52YWxpZCBgZ3JpZC5pZEtleVBhdGhgIHBhcmFtZXRlciwgdXBkYXRlIGFjdGlvbiBwYXJhbWV0ZXJzIHRvIG5ldyBmb3JtYXQhJyxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdbR3JpZF0gSW52YWxpZCBgZ3JpZGAgcGFyYW1ldGVyLCB1cGRhdGUgYWN0aW9uIHBhcmFtZXRlcnMgdG8gbmV3IGZvcm1hdCEnKTtcbiAgICB9XG4gIH0sXG4gIGNoZWNrQ29sdW1uc1BhcmFtOiAoY29sdW1uc1BhcmFtKSA9PiB7XG4gICAgaWYgKCFjb2x1bW5zUGFyYW0pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1tHcmlkXSBJbnZhbGlkIGBjb2x1bW5zYCBwYXJhbWV0ZXIsIHVwZGF0ZSBhY3Rpb24gcGFyYW1ldGVycyB0byBuZXcgZm9ybWF0IScsXG4gICAgICApO1xuICAgIH1cbiAgfSxcbiAgLy8gTG9jYWxlIGdldHRlcnMsIHN1cHBvcnQgZ3JpZCBwYXJhbSBvciB1c2VyIHN0YXRlIHVzZWQgaW4gT0MgYXBwbGljYXRpb25zXG4gIGdldExhbmd1YWdlOiAoZ3JpZCwgb2NVc2VyU3RhdGUpID0+IHtcbiAgICBpZiAoZ3JpZC5sYW5ndWFnZSAmJiB0eXBlb2YgZ3JpZC5sYW5ndWFnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBncmlkLmxhbmd1YWdlO1xuICAgIH1cbiAgICBpZiAob2NVc2VyU3RhdGUpIHtcbiAgICAgIHJldHVybiBvY1VzZXJTdGF0ZS5nZXRJbihbJ3VzZXInLCAnbGFuZ3VhZ2UnXSwgJ2VuJyk7XG4gICAgfVxuICAgIHJldHVybiAnZW4nO1xuICB9LFxuICBnZXRSZWdpb246IChncmlkLCBvY1VzZXJTdGF0ZSkgPT4ge1xuICAgIGNvbnN0IGRlZmF1bHRSZWdpb24gPSAnZW5fR0InO1xuICAgIGlmIChncmlkLnJlZ2lvbiAmJiB0eXBlb2YgZ3JpZC5yZWdpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZ3JpZC5yZWdpb247XG4gICAgfVxuICAgIGlmIChvY1VzZXJTdGF0ZSkge1xuICAgICAgcmV0dXJuIG9jVXNlclN0YXRlLmdldEluKFsndXNlcicsICdyZWdpb24nXSwgZGVmYXVsdFJlZ2lvbik7XG4gICAgfVxuICAgIHJldHVybiBkZWZhdWx0UmVnaW9uO1xuICB9LFxuICBnZXREYXRlRm9ybWF0OiAoZ3JpZCwgb2NVc2VyU3RhdGUpID0+IHtcbiAgICBpZiAoZ3JpZC5kYXRlRm9ybWF0ICYmIHR5cGVvZiBncmlkLmRhdGVGb3JtYXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZ3JpZC5kYXRlRm9ybWF0LnRvVXBwZXJDYXNlKCk7XG4gICAgfVxuICAgIGlmIChvY1VzZXJTdGF0ZSkge1xuICAgICAgcmV0dXJuIG9jVXNlclN0YXRlLmdldEluKFsnbG9jYWxlRm9ybWF0JywgJ2RhdGVGb3JtYXQnXSwgJ0wnKTtcbiAgICB9XG4gICAgcmV0dXJuICdMJztcbiAgfSxcbiAgZ2V0VGhvdXNhbmRTZXBhcmF0b3I6IChncmlkLCBvY1VzZXJTdGF0ZSkgPT4ge1xuICAgIGlmIChncmlkLnRob3VzYW5kU2VwYXJhdG9yICYmIHR5cGVvZiBncmlkLmxhbmd1YWdlID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGdyaWQudGhvdXNhbmRTZXBhcmF0b3I7XG4gICAgfVxuICAgIGlmIChvY1VzZXJTdGF0ZSkge1xuICAgICAgcmV0dXJuIG9jVXNlclN0YXRlLmdldEluKFsnbG9jYWxlRm9ybWF0JywgJ3Rob3VzYW5kU2VwYXJhdG9yJ10sICcnKTtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9LFxuICBnZXREZWNpbWFsU2VwYXJhdG9yOiAoZ3JpZCwgb2NVc2VyU3RhdGUpID0+IHtcbiAgICBpZiAoZ3JpZC5kZWNpbWFsU2VwYXJhdG9yICYmIHR5cGVvZiBncmlkLmxhbmd1YWdlID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGdyaWQuZGVjaW1hbFNlcGFyYXRvcjtcbiAgICB9XG4gICAgaWYgKG9jVXNlclN0YXRlKSB7XG4gICAgICByZXR1cm4gb2NVc2VyU3RhdGUuZ2V0SW4oWydsb2NhbGVGb3JtYXQnLCAnZGVjaW1hbFNlcGFyYXRvciddLCAnLicpO1xuICAgIH1cbiAgICByZXR1cm4gJy4nO1xuICB9LFxuICBub3JtYWxpemVGaWx0ZXJpbmdEYXRhOiAoZmlsdGVyaW5nRGF0YSkgPT4ge1xuICAgIGxldCBuZXdGaWx0ZXJpbmdEYXRhID0gTWFwKHsgaXNGaWx0ZXJpbmc6IGZhbHNlIH0pO1xuICAgIGlmICghZmlsdGVyaW5nRGF0YSkgcmV0dXJuIG5ld0ZpbHRlcmluZ0RhdGE7XG5cbiAgICBjb25zdCBvbGRGaWx0ZXJpbmdEYXRhID0gTWFwLmlzTWFwKGZpbHRlcmluZ0RhdGEpID8gZmlsdGVyaW5nRGF0YSA6IGZyb21KUyhmaWx0ZXJpbmdEYXRhKTtcbiAgICBjb25zdCBpc0ZpbHRlcmluZyA9IG9sZEZpbHRlcmluZ0RhdGEuZ2V0KCdpc0ZpbHRlcmluZycsIGZhbHNlKTtcbiAgICBjb25zdCBmaWx0ZXJEYXRhID0gb2xkRmlsdGVyaW5nRGF0YS5nZXQoJ2ZpbHRlckRhdGEnLCBudWxsKTtcblxuICAgIGlmIChpc0ZpbHRlcmluZyAmJiBmaWx0ZXJEYXRhICYmIE1hcC5pc01hcChmaWx0ZXJEYXRhKSkge1xuICAgICAgbmV3RmlsdGVyaW5nRGF0YSA9IG5ld0ZpbHRlcmluZ0RhdGEuc2V0KCdpc0ZpbHRlcmluZycsIHRydWUpLnNldCgnZmlsdGVyRGF0YScsIGZpbHRlckRhdGEpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXdGaWx0ZXJpbmdEYXRhO1xuICB9LFxuICAvKlxuICAgKiBAZnVuY3Rpb24gdmlzaWJsZUNvbHVtbnNcbiAgICogQGRlc2MgIFJldHVybnMgZWl0aGVyIHZpc2libGUgY29sdW1ucyAoaWYgc29tZSBjb2x1bW5zIGFyZSBoaWRkZW4gKVxuICAgKiAgICAgICAgb3IgZ3JpZCBkZWZhdWx0IGNvbHVtbnMuXG4gICAqIEBwYXJhbSBvcmlnQ29sdW1ucyBBcnJheSBvZiBHcmlkIG9yaWdpbmFsIGNvbHVtbnMgb2JqZWN0c1xuICAgKiBAcGFyYW0gdmlzaWJsZUNvbHVtbnMgQXJyYXkgb2YgR3JpZCB2aXNpYmxlIGNvbHVtbnMgdmFsdWVLZXlQYXRoc1xuICAgKiBAcmV0dXJucyBBcnJheSBvZiBjb2x1bW4gb2JqZWN0cyBjdXJyZW50bHkgdmlzaWJsZSBmb3IgdXNlci5cbiAgICovXG4gIHZpc2libGVDb2x1bW5zOiAob3JpZ0NvbHVtbnMsIHZpc2libGVDb2x1bW5zKSA9PiB7XG4gICAgaWYgKCF2aXNpYmxlQ29sdW1ucykgcmV0dXJuIG9yaWdDb2x1bW5zO1xuICAgIGNvbnN0IGZpbHRlcmVkID0gdmlzaWJsZUNvbHVtbnMubWFwKFxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgc2VhcmNoQ29sID0+IG9yaWdDb2x1bW5zLmZpbmQoXG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAvLyB2YWx1ZUtleVBhdGggaXMgam9pbmVkIGhlcmUgYXMgaXQgY2FuIGJlIGFuIGFycmF5IGxpa2UgWydrZXkxJywgJ2tleTInXS5cbiAgICAgICAgLy8gc2VhcmNoQ29sIGlzIHNpbWlsYXJseSBqb2luZWQgaW4gb25DZWxsS2V5RG93biBpbiBkYXRhZ3JpZC5jb21wb25lbnQuanN4XG4gICAgICAgIGNvbCA9PiBKU09OLnN0cmluZ2lmeShjb2wudmFsdWVLZXlQYXRoLmpvaW4oJy8nKSkgPT09IEpTT04uc3RyaW5naWZ5KHNlYXJjaENvbCksXG4gICAgICApLFxuICAgICk7XG4gICAgcmV0dXJuIGZpbHRlcmVkLnRvSlMoKTtcbiAgfSxcbn07XG4iXX0=