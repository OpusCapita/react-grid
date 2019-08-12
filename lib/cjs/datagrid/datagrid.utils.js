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
      var cellData = data.getIn(col.valueKeyPath); // Deal with select and multiselect componentTypes

      if (col.selectComponentOptions) {
        if (_immutable.List.isList(cellData) || Array.isArray(cellData)) {
          var labels = [];
          cellData.forEach(function (d) {
            var found = col.selectComponentOptions.find(function (o) {
              return o.value === d;
            });
            if (found) labels.push(found.label);
          });
          return labels.join(' ');
        }

        var found = col.selectComponentOptions.find(function (o) {
          return o.value === cellData;
        });
        if (found) return found.label;
      }

      if (cellData && cellData.join) return cellData.join(' ');
      return cellData;
    };
  },
  getValueEmptyChecker: function getValueEmptyChecker(col) {
    if (col.valueEmptyChecker) {
      return col.valueEmptyChecker;
    }

    if (col.componentType === 'multiselect') {
      return function (val) {
        return val === '' || val === null || val === undefined || val.length === 0 || val.size === 0;
      }; // eslint-disable-line
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
        // value can be simple value, immutable List or array
        var value = getVal(row); // session storage content is converted to immutable and multiselect
        // filters is then list otherwise array

        var filters = filterVal && filterVal.toJS ? filterVal.toJS() : filterVal;
        return filters.some(function (filter) {
          if (_immutable.List.isList(value) || Array.isArray(value)) {
            return value.findIndex(function (v) {
              return v === filter.value;
            }) !== -1;
          }

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
          var trimmedVal = filterVal.trim();
          var escapedVal = trimmedVal;
          var specialChars = '[]\\^$.|?*+()'; // If filter val starts with a Regex special character, we must escape it

          if (specialChars.includes(trimmedVal[0])) escapedVal = "\\" + trimmedVal;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC51dGlscy5qcyJdLCJuYW1lcyI6WyJnZXRDb2x1bW5LZXkiLCJjb2wiLCJjb2x1bW5LZXkiLCJ2YWx1ZUtleVBhdGgiLCJqb2luIiwiZ2V0VmlzaWJsZUNvbHVtbnMiLCJjb2xzIiwiaGlkZGVuQ29sdW1ucyIsImNvbHVtbk9yZGVyIiwib3JkZXJlZENvbHVtbkxpc3QiLCJmb3JFYWNoIiwiaSIsImNvbE9yZGVySWR4IiwiaW5kZXhPZiIsImRlZmF1bHRIaWRkZW4iLCJpc0hpZGRlbiIsIm9yZGVyIiwicHVzaCIsInNvcnQiLCJhIiwiYiIsIm1hcCIsIml0ZW0iLCJnZXRDb2x1bW5EZWZhdWx0VmFsdWVzIiwiY29sdW1uRGVmYXVsdFZhbHVlcyIsImRlZmF1bHRWYWx1ZSIsInVuZGVmaW5lZCIsImdldENlbGxTdHlsZUJ5Q29sIiwiYWxpZ24iLCJ0ZXh0QWxpZ24iLCJjb21wb25lbnRUeXBlIiwidmFsdWVUeXBlIiwiaXNTb3J0YWJsZSIsInNvcnRWYWx1ZUdldHRlciIsImRpc2FibGVTb3J0aW5nIiwiZ2V0U29ydENvbXBhcmF0b3IiLCJzb3J0Q29tcGFyYXRvciIsImxvY2FsZUNvbXBhcmUiLCJEYXRlIiwiZ2V0U29ydFZhbHVlR2V0dGVyIiwiZGF0YSIsImNlbGxEYXRhIiwiZ2V0SW4iLCJzZWxlY3RDb21wb25lbnRPcHRpb25zIiwiTGlzdCIsImlzTGlzdCIsIkFycmF5IiwiaXNBcnJheSIsImxhYmVscyIsImQiLCJmb3VuZCIsImZpbmQiLCJvIiwidmFsdWUiLCJsYWJlbCIsImdldFZhbHVlRW1wdHlDaGVja2VyIiwidmFsdWVFbXB0eUNoZWNrZXIiLCJ2YWwiLCJsZW5ndGgiLCJzaXplIiwiZ2V0RmlsdGVyTWF0Y2hlciIsImRhdGVGb3JtYXQiLCJmaWx0ZXJNYXRjaGVyIiwiZ2V0VmFsIiwicm93IiwiZmlsdGVyVmFsIiwiZmlsdGVycyIsInRvSlMiLCJzb21lIiwiZmlsdGVyIiwiZmluZEluZGV4IiwidiIsImZpbHRlclZhbEludCIsInBhcnNlSW50IiwidmFsSW50IiwiU3RyaW5nIiwiaW5jbHVkZXMiLCJmaWx0ZXJWYWxGbG9hdCIsInBhcnNlRmxvYXQiLCJyZXBsYWNlIiwiaXNWYWxpZCIsImZvcm1hdCIsInRyaW1tZWRWYWwiLCJ0cmltIiwiZXNjYXBlZFZhbCIsInNwZWNpYWxDaGFycyIsIlJlZ0V4cCIsInRlc3QiLCJsb2FkU2VsZWN0ZWRJdGVtcyIsImdyaWQiLCJzZXNzaW9uSXRlbSIsInNlc3Npb25TdG9yYWdlIiwiZ2V0SXRlbSIsImlkIiwiZGlzYWJsZVJlbWVtYmVyU2VsZWN0ZWRJdGVtcyIsIkpTT04iLCJwYXJzZSIsImUiLCJjb25zb2xlIiwiZXJyb3IiLCJsb2FkR3JpZENvbmZpZyIsImNvbmZpZ1N0b3JhZ2UiLCJzb3J0aW5nRGF0YSIsImZpbHRlckRhdGEiLCJpc0ZpbHRlcmluZ0RhdGEiLCJsb2NhbFN0b3JhZ2UiLCJwYWdlIiwicm93c09uUGFnZSIsImxvYWRlZENvbmZpZyIsImlzRmlsdGVyaW5nIiwibG9hZCIsImRpc2FibGVSZW1lbWJlcklzRmlsdGVyaW5nIiwiZGVmYXVsdFNob3dGaWx0ZXJpbmdSb3ciLCJoaWRkZW5Db2x1bW5zSnNvbiIsImNvbHVtbk9yZGVySnNvbiIsImNvbmZpZyIsInZpc2libGVDb2x1bW5zIiwiZmlsdGVyaW5nRGF0YSIsImNvbHVtbldpZHRocyIsImRpc2FibGVSZW1lbWJlckNvbHVtbldpZHRocyIsImRpc2FibGVSZW1lbWJlclNvcnREYXRhIiwiZGlzYWJsZVJlbWVtYmVyRmlsdGVyRGF0YSIsImRlZmF1bHRTb3J0Q29sdW1uIiwic29ydENvbHVtbiIsInNvcnRPcmRlciIsImRlZmF1bHRTb3J0T3JkZXIiLCJzYXZlU2VsZWN0ZWRJdGVtcyIsInNlbGVjdGVkSXRlbXMiLCJzZXRJdGVtIiwic3RyaW5naWZ5Iiwic2F2ZUNvbHVtbldpZHRocyIsInNhdmUiLCJzYXZlQ29sdW1uU2V0dGluZ3MiLCJzYXZlU29ydERhdGEiLCJzYXZlRmlsdGVyRGF0YSIsInNhdmVJc0ZpbHRlcmluZyIsInJlbW92ZUl0ZW0iLCJzYXZlUGFnZSIsInNhdmVSb3dzT25QYWdlIiwiY2hlY2tHcmlkUGFyYW0iLCJncmlkUGFyYW0iLCJFcnJvciIsImlkS2V5UGF0aCIsImNoZWNrQ29sdW1uc1BhcmFtIiwiY29sdW1uc1BhcmFtIiwiZ2V0TGFuZ3VhZ2UiLCJvY1VzZXJTdGF0ZSIsImxhbmd1YWdlIiwiZ2V0UmVnaW9uIiwiZGVmYXVsdFJlZ2lvbiIsInJlZ2lvbiIsImdldERhdGVGb3JtYXQiLCJ0b1VwcGVyQ2FzZSIsImdldFRob3VzYW5kU2VwYXJhdG9yIiwidGhvdXNhbmRTZXBhcmF0b3IiLCJnZXREZWNpbWFsU2VwYXJhdG9yIiwiZGVjaW1hbFNlcGFyYXRvciIsIm5vcm1hbGl6ZUZpbHRlcmluZ0RhdGEiLCJuZXdGaWx0ZXJpbmdEYXRhIiwib2xkRmlsdGVyaW5nRGF0YSIsIk1hcCIsImlzTWFwIiwiZ2V0Iiwic2V0Iiwib3JpZ0NvbHVtbnMiLCJmaWx0ZXJlZCIsInNlYXJjaENvbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUpBO0FBTUEsSUFBTUEsWUFBWSxHQUFHLFNBQWZBLFlBQWUsQ0FBQUMsR0FBRztBQUFBLFNBQUlBLEdBQUcsQ0FBQ0MsU0FBSixJQUFpQkQsR0FBRyxDQUFDRSxZQUFKLENBQWlCQyxJQUFqQixDQUFzQixHQUF0QixDQUFyQjtBQUFBLENBQXhCOztBQUVBLElBQU1DLGlCQUFpQixHQUFHLFNBQXBCQSxpQkFBb0IsQ0FBQ0MsSUFBRCxFQUFPQyxhQUFQLEVBQTJCQyxXQUEzQixFQUFnRDtBQUFBLE1BQXpDRCxhQUF5QztBQUF6Q0EsSUFBQUEsYUFBeUMsR0FBekIsRUFBeUI7QUFBQTs7QUFBQSxNQUFyQkMsV0FBcUI7QUFBckJBLElBQUFBLFdBQXFCLEdBQVAsRUFBTztBQUFBOztBQUN4RSxNQUFNQyxpQkFBaUIsR0FBRyxFQUExQjtBQUNBSCxFQUFBQSxJQUFJLENBQUNJLE9BQUws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Z0JBQWdCLENBQUNHLEdBQWpCLENBQXFCLGFBQXJCLEVBQW9DLEtBQXBDLENBQXBCO0FBQ0EsUUFBTTNELFVBQVUsR0FBR3dELGdCQUFnQixDQUFDRyxHQUFqQixDQUFxQixZQUFyQixFQUFtQyxJQUFuQyxDQUFuQjs7QUFFQSxRQUFJckQsV0FBVyxJQUFJTixVQUFmLElBQTZCeUQsZUFBSUMsS0FBSixDQUFVMUQsVUFBVixDQUFqQyxFQUF3RDtBQUN0RHVELE1BQUFBLGdCQUFnQixHQUFHQSxnQkFBZ0IsQ0FBQ0ssR0FBakIsQ0FBcUIsYUFBckIsRUFBb0MsSUFBcEMsRUFBMENBLEdBQTFDLENBQThDLFlBQTlDLEVBQTRENUQsVUFBNUQsQ0FBbkI7QUFDRDs7QUFFRCxXQUFPdUQsZ0JBQVA7QUFDRCxHQW5iWTs7QUFvYmI7Ozs7Ozs7O0FBUUExQyxFQUFBQSxjQUFjLEVBQUUsd0JBQUNnRCxXQUFELEVBQWNoRCxlQUFkLEVBQWlDO0FBQy9DLFFBQUksQ0FBQ0EsZUFBTCxFQUFxQixPQUFPZ0QsV0FBUDs7QUFDckIsUUFBTUMsUUFBUSxHQUFHakQsZUFBYyxDQUFDL0YsR0FBZixFQUNmO0FBQ0EsY0FBQWlKLFNBQVM7QUFBQSxhQUFJRixXQUFXLENBQUNqSCxJQUFaLEVBQ1Q7QUFDRjtBQUNBO0FBQ0EsZ0JBQUFsRCxHQUFHO0FBQUEsZUFBSThGLElBQUksQ0FBQ2tDLFNBQUwsQ0FBZWhJLEdBQUcsQ0FBQ0UsWUFBSixDQUFpQkMsSUFBakIsQ0FBc0IsR0FBdEIsQ0FBZixNQUErQzJGLElBQUksQ0FBQ2tDLFNBQUwsQ0FBZXFDLFNBQWYsQ0FBbkQ7QUFBQSxPQUpRLENBQUo7QUFBQSxLQUZNLENBQWpCOztBQVNBLFdBQU9ELFFBQVEsQ0FBQ2xHLElBQVQsRUFBUDtBQUNEO0FBeGNZLEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1uZXN0ZWQtdGVybmFyeSAqL1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IGlzTmFOIGZyb20gJ2xvZGFzaC9pc05hTic7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAndXRpbCc7XG5pbXBvcnQgeyBNYXAsIGZyb21KUywgTGlzdCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5cbmNvbnN0IGdldENvbHVtbktleSA9IGNvbCA9PiBjb2wuY29sdW1uS2V5IHx8IGNvbC52YWx1ZUtleVBhdGguam9pbignLycpO1xuXG5jb25zdCBnZXRWaXNpYmxlQ29sdW1ucyA9IChjb2xzLCBoaWRkZW5Db2x1bW5zID0gW10sIGNvbHVtbk9yZGVyID0gW10pID0+IHtcbiAgY29uc3Qgb3JkZXJlZENvbHVtbkxpc3QgPSBbXTtcbiAgY29scy5mb3JFYWNoKChjb2wsIGkpID0+IHtcbiAgICBjb25zdCBjb2x1bW5LZXkgPSBnZXRDb2x1bW5LZXkoY29sKTtcbiAgICBjb25zdCBjb2xPcmRlcklkeCA9IGNvbHVtbk9yZGVyLmluZGV4T2YoY29sdW1uS2V5KTtcbiAgICBjb25zdCBkZWZhdWx0SGlkZGVuID0gY29sLmlzSGlkZGVuICYmIGNvbE9yZGVySWR4ID09PSAtMTtcbiAgICBpZiAoZGVmYXVsdEhpZGRlbiB8fCBoaWRkZW5Db2x1bW5zLmluZGV4T2YoY29sdW1uS2V5KSA+IC0xKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG9yZGVyID0gY29sT3JkZXJJZHggIT09IC0xID8gY29sT3JkZXJJZHggOiBpICsgMTtcbiAgICBvcmRlcmVkQ29sdW1uTGlzdC5wdXNoKHtcbiAgICAgIGNvbHVtbktleSxcbiAgICAgIG9yZGVyLFxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIG9yZGVyZWRDb2x1bW5MaXN0LnNvcnQoKGEsIGIpID0+IGEub3JkZXIgLSBiLm9yZGVyKS5tYXAoaXRlbSA9PiBpdGVtLmNvbHVtbktleSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGdldENvbHVtbktleSxcbiAgZ2V0Q29sdW1uRGVmYXVsdFZhbHVlczogKGNvbHMpID0+IHtcbiAgICBjb25zdCBjb2x1bW5EZWZhdWx0VmFsdWVzID0ge307XG4gICAgY29scy5mb3JFYWNoKChjb2wpID0+IHtcbiAgICAgIGlmIChjb2wuZGVmYXVsdFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29sdW1uRGVmYXVsdFZhbHVlc1tnZXRDb2x1bW5LZXkoY29sKV0gPSBjb2wuZGVmYXVsdFZhbHVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBjb2x1bW5EZWZhdWx0VmFsdWVzO1xuICB9LFxuICBnZXRDZWxsU3R5bGVCeUNvbDogKGNvbCkgPT4ge1xuICAgIGlmIChjb2wuYWxpZ24pIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRleHRBbGlnbjogY29sLmFsaWduLFxuICAgICAgfTtcbiAgICB9XG4gICAgLy8gTm8gZGVmYXVsdCBhbGlnbiBpZiBjb21wb25lbnQgaXMgc2VsZWN0XG4gICAgLy8gQmVjYXVzZSByZW5kZXJlZCBkYXRhIGlzIG1vc3QgbGlrZWx5IHRleHRcbiAgICAvLyBFdmVuIGlmIHZhbHVlVHlwZSBpcyBudW1iZXJcbiAgICBpZiAoY29sLmNvbXBvbmVudFR5cGUgPT09ICdzZWxlY3QnIHx8IGNvbC5jb21wb25lbnRUeXBlID09PSAnbXVsdGlzZWxlY3QnKSB7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuICAgIHN3aXRjaCAoY29sLnZhbHVlVHlwZSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRleHRBbGlnbjogJ3JpZ2h0JyxcbiAgICAgICAgfTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gIH0sXG4gIGlzU29ydGFibGU6IGNvbCA9PiBjb2wudmFsdWVUeXBlXG4gICAgJiYgKGNvbC5zb3J0VmFsdWVHZXR0ZXIgfHwgY29sLnZhbHVlS2V5UGF0aClcbiAgICAmJiAhY29sLmRpc2FibGVTb3J0aW5nLFxuICBnZXRTb3J0Q29tcGFyYXRvcjogKGNvbCkgPT4ge1xuICAgIGlmIChjb2wuc29ydENvbXBhcmF0b3IpIHtcbiAgICAgIHJldHVybiBjb2wuc29ydENvbXBhcmF0b3I7XG4gICAgfVxuICAgIHN3aXRjaCAoY29sLnZhbHVlVHlwZSkge1xuICAgICAgY2FzZSAndGV4dCc6XG4gICAgICAgIHJldHVybiAoYSwgYikgPT4gKGEubG9jYWxlQ29tcGFyZSA/IGEubG9jYWxlQ29tcGFyZShiKSA6IDEpO1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgICAgcmV0dXJuIChhLCBiKSA9PiBhIC0gYjtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICByZXR1cm4gKGEsIGIpID0+IChhID09PSBiID8gMCA6IGEgPyAtMSA6IDEpO1xuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgIHJldHVybiAoYSwgYikgPT4gbmV3IERhdGUoYSkgLSBuZXcgRGF0ZShiKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAoYSwgYikgPT4gKGEubG9jYWxlQ29tcGFyZSA/IGEubG9jYWxlQ29tcGFyZShiKSA6IDEpO1xuICAgIH1cbiAgfSxcbiAgZ2V0U29ydFZhbHVlR2V0dGVyOiAoY29sKSA9PiB7XG4gICAgaWYgKGNvbC5zb3J0VmFsdWVHZXR0ZXIpIHtcbiAgICAgIHJldHVybiBjb2wuc29ydFZhbHVlR2V0dGVyO1xuICAgIH1cbiAgICByZXR1cm4gKGRhdGEpID0+IHtcbiAgICAgIGNvbnN0IGNlbGxEYXRhID0gZGF0YS5nZXRJbihjb2wudmFsdWVLZXlQYXRoKTtcbiAgICAgIC8vIERlYWwgd2l0aCBzZWxlY3QgYW5kIG11bHRpc2VsZWN0IGNvbXBvbmVudFR5cGVzXG4gICAgICBpZiAoY29sLnNlbGVjdENvbXBvbmVudE9wdGlvbnMpIHtcbiAgICAgICAgaWYgKExpc3QuaXNMaXN0KGNlbGxEYXRhKSB8fCBBcnJheS5pc0FycmF5KGNlbGxEYXRhKSkge1xuICAgICAgICAgIGNvbnN0IGxhYmVscyA9IFtdO1xuICAgICAgICAgIGNlbGxEYXRhLmZvckVhY2goKGQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZvdW5kID0gY29sLnNlbGVjdENvbXBvbmVudE9wdGlvbnMuZmluZChvID0+IG8udmFsdWUgPT09IGQpO1xuICAgICAgICAgICAgaWYgKGZvdW5kKSBsYWJlbHMucHVzaChmb3VuZC5sYWJlbCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIGxhYmVscy5qb2luKCcgJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZm91bmQgPSBjb2wuc2VsZWN0Q29tcG9uZW50T3B0aW9ucy5maW5kKG8gPT4gby52YWx1ZSA9PT0gY2VsbERhdGEpO1xuICAgICAgICBpZiAoZm91bmQpIHJldHVybiBmb3VuZC5sYWJlbDtcbiAgICAgIH1cbiAgICAgIGlmIChjZWxsRGF0YSAmJiBjZWxsRGF0YS5qb2luKSByZXR1cm4gY2VsbERhdGEuam9pbignICcpO1xuICAgICAgcmV0dXJuIGNlbGxEYXRhO1xuICAgIH07XG4gIH0sXG4gIGdldFZhbHVlRW1wdHlDaGVja2VyOiAoY29sKSA9PiB7XG4gICAgaWYgKGNvbC52YWx1ZUVtcHR5Q2hlY2tlcikge1xuICAgICAgcmV0dXJuIGNvbC52YWx1ZUVtcHR5Q2hlY2tlcjtcbiAgICB9XG4gICAgaWYgKGNvbC5jb21wb25lbnRUeXBlID09PSAnbXVsdGlzZWxlY3QnKSB7XG4gICAgICByZXR1cm4gdmFsID0+IHZhbCA9PT0gJycgfHwgdmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkIHx8IHZhbC5sZW5ndGggPT09IDAgfHwgdmFsLnNpemUgPT09IDA7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGNvbC52YWx1ZVR5cGUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICAgIHJldHVybiB2YWwgPT4gdmFsID09PSAnJyB8fCBpc05hTih2YWwpIHx8IHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZDtcbiAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgIGNhc2UgJ3NlbGVjdCc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdmFsID0+IHZhbCA9PT0gJycgfHwgdmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfSxcbiAgZ2V0RmlsdGVyTWF0Y2hlcjogKGNvbCwgZGF0ZUZvcm1hdCkgPT4ge1xuICAgIGlmIChjb2wuZmlsdGVyTWF0Y2hlcikgcmV0dXJuIGNvbC5maWx0ZXJNYXRjaGVyO1xuICAgIGNvbnN0IGdldFZhbCA9IHJvdyA9PiByb3cuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG5cbiAgICBpZiAoY29sLmNvbXBvbmVudFR5cGUgPT09ICdtdWx0aXNlbGVjdCcpIHtcbiAgICAgIHJldHVybiAocm93LCBmaWx0ZXJWYWwpID0+IHtcbiAgICAgICAgLy8gdmFsdWUgY2FuIGJlIHNpbXBsZSB2YWx1ZSwgaW1tdXRhYmxlIExpc3Qgb3IgYXJyYXlcbiAgICAgICAgY29uc3QgdmFsdWUgPSBnZXRWYWwocm93KTtcbiAgICAgICAgLy8gc2Vzc2lvbiBzdG9yYWdlIGNvbnRlbnQgaXMgY29udmVydGVkIHRvIGltbXV0YWJsZSBhbmQgbXVsdGlzZWxlY3RcbiAgICAgICAgLy8gZmlsdGVycyBpcyB0aGVuIGxpc3Qgb3RoZXJ3aXNlIGFycmF5XG4gICAgICAgIGNvbnN0IGZpbHRlcnMgPSBmaWx0ZXJWYWwgJiYgZmlsdGVyVmFsLnRvSlMgPyBmaWx0ZXJWYWwudG9KUygpIDogZmlsdGVyVmFsO1xuICAgICAgICByZXR1cm4gZmlsdGVycy5zb21lKChmaWx0ZXIpID0+IHtcbiAgICAgICAgICBpZiAoTGlzdC5pc0xpc3QodmFsdWUpIHx8IEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUuZmluZEluZGV4KHYgPT4gdiA9PT0gZmlsdGVyLnZhbHVlKSAhPT0gLTE7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmaWx0ZXIudmFsdWUgPT09IHZhbHVlO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgc3dpdGNoIChjb2wudmFsdWVUeXBlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICByZXR1cm4gKHJvdywgZmlsdGVyVmFsKSA9PiB7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBnZXRWYWwocm93KTtcbiAgICAgICAgICBpZiAodmFsdWUgPT09ICcnIHx8IGlzTmFOKHZhbHVlKSB8fCB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIG1hdGNoIGV4YWN0IG51bWJlciB2YWx1ZVxuICAgICAgICAgIGNvbnN0IGZpbHRlclZhbEludCA9IHBhcnNlSW50KGZpbHRlclZhbCwgMTApO1xuICAgICAgICAgIGNvbnN0IHZhbEludCA9IHBhcnNlSW50KHZhbHVlLCAxMCk7XG4gICAgICAgICAgaWYgKGZpbHRlclZhbEludCA9PT0gdmFsSW50IHx8IGZpbHRlclZhbEludCA9PT0gdmFsSW50ICogLTEpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBtYXRjaCBwYXJ0aWFsXG4gICAgICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSkuaW5jbHVkZXMoZmlsdGVyVmFsKTtcbiAgICAgICAgfTtcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgICAgcmV0dXJuIChyb3csIGZpbHRlclZhbCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gZ2V0VmFsKHJvdyk7XG4gICAgICAgICAgaWYgKHZhbHVlID09PSAnJyB8fCBpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBtYXRjaCBleGFjdCBmbG9hdCB2YWx1ZVxuICAgICAgICAgIGNvbnN0IGZpbHRlclZhbEZsb2F0ID0gcGFyc2VGbG9hdChmaWx0ZXJWYWwucmVwbGFjZSgnLCcsICcuJykpO1xuICAgICAgICAgIGlmIChmaWx0ZXJWYWxGbG9hdCA9PT0gcGFyc2VGbG9hdCh2YWx1ZSkgfHwgZmlsdGVyVmFsRmxvYXQgPT09IHBhcnNlRmxvYXQodmFsdWUpICogLTEpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBtYXRjaCBwYXJ0aWFsXG4gICAgICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSkucmVwbGFjZSgnLCcsICcuJykuaW5jbHVkZXMoZmlsdGVyVmFsLnJlcGxhY2UoJywnLCAnLicpKTtcbiAgICAgICAgfTtcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICByZXR1cm4gKHJvdywgZmlsdGVyVmFsKSA9PiB7XG4gICAgICAgICAgaWYgKG1vbWVudChnZXRWYWwocm93KSkuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gbW9tZW50KGdldFZhbChyb3cpKS5mb3JtYXQoZGF0ZUZvcm1hdCkgPT09IG1vbWVudChmaWx0ZXJWYWwpLmZvcm1hdChkYXRlRm9ybWF0KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9O1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICBjYXNlICd0ZXh0JzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAocm93LCBmaWx0ZXJWYWwpID0+IHtcbiAgICAgICAgICBjb25zdCB0cmltbWVkVmFsID0gZmlsdGVyVmFsLnRyaW0oKTtcbiAgICAgICAgICBsZXQgZXNjYXBlZFZhbCA9IHRyaW1tZWRWYWw7XG4gICAgICAgICAgY29uc3Qgc3BlY2lhbENoYXJzID0gJ1tdXFxcXF4kLnw/KisoKSc7XG5cbiAgICAgICAgICAvLyBJZiBmaWx0ZXIgdmFsIHN0YXJ0cyB3aXRoIGEgUmVnZXggc3BlY2lhbCBjaGFyYWN0ZXIsIHdlIG11c3QgZXNjYXBlIGl0XG4gICAgICAgICAgaWYgKHNwZWNpYWxDaGFycy5pbmNsdWRlcyh0cmltbWVkVmFsWzBdKSkgZXNjYXBlZFZhbCA9IGBcXFxcJHt0cmltbWVkVmFsfWA7XG4gICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoZXNjYXBlZFZhbCwgJ2knKS50ZXN0KGdldFZhbChyb3cpKTtcbiAgICAgICAgfTtcbiAgICB9XG4gIH0sXG4gIGxvYWRTZWxlY3RlZEl0ZW1zOiAoZ3JpZCkgPT4ge1xuICAgIGNvbnN0IHNlc3Npb25JdGVtID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShgb2NfZ3JpZF9zZWxlY3RlZEl0ZW1zXyR7Z3JpZC5pZH1gKTtcbiAgICBpZiAoc2Vzc2lvbkl0ZW0gJiYgIWdyaWQuZGlzYWJsZVJlbWVtYmVyU2VsZWN0ZWRJdGVtcykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uoc2Vzc2lvbkl0ZW0pO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhZ3JpZDogZXJyb3IgcGFyc2luZyBzZWxlY3RlZEl0ZW1zIGZyb20gc2Vzc2lvblN0b3JhZ2UnLCBlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFtdO1xuICB9LFxuICBsb2FkR3JpZENvbmZpZzogKGdyaWQsIGNvbHMpID0+IHtcbiAgICBjb25zdCBjb25maWdTdG9yYWdlID0gZ3JpZC5jb25maWdTdG9yYWdlIHx8IHt9O1xuICAgIGNvbnN0IHNvcnRpbmdEYXRhID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShgb2NfZ3JpZF9zb3J0aW5nXyR7Z3JpZC5pZH1gKTtcbiAgICBjb25zdCBmaWx0ZXJEYXRhID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShgb2NfZ3JpZF9maWx0ZXJpbmdfJHtncmlkLmlkfWApO1xuICAgIGNvbnN0IGlzRmlsdGVyaW5nRGF0YSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX2lzRmlsdGVyaW5nXyR7Z3JpZC5pZH1gKTtcbiAgICBjb25zdCBwYWdlID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShgb2NfZ3JpZF9wYWdlXyR7Z3JpZC5pZH1gKTtcbiAgICBjb25zdCByb3dzT25QYWdlID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShgb2NfZ3JpZF9yb3dzT25QYWdlXyR7Z3JpZC5pZH1gKTtcbiAgICBsZXQgbG9hZGVkQ29uZmlnID0ge307XG4gICAgbGV0IGhpZGRlbkNvbHVtbnM7XG4gICAgbGV0IGNvbHVtbk9yZGVyO1xuICAgIGxldCBpc0ZpbHRlcmluZyA9IGZhbHNlO1xuXG4gICAgaWYgKGlzRnVuY3Rpb24oY29uZmlnU3RvcmFnZS5sb2FkKSkge1xuICAgICAgbG9hZGVkQ29uZmlnID0gY29uZmlnU3RvcmFnZS5sb2FkKCk7XG4gICAgfVxuXG4gICAgaWYgKGlzRmlsdGVyaW5nRGF0YSkge1xuICAgICAgaWYgKCFncmlkLmRpc2FibGVSZW1lbWJlcklzRmlsdGVyaW5nKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaXNGaWx0ZXJpbmcgPSBKU09OLnBhcnNlKGlzRmlsdGVyaW5nRGF0YSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIGlzRmlsdGVyaW5nRGF0YSBmcm9tIGxvY2FsU3RvcmFnZScsIGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChncmlkLmRlZmF1bHRTaG93RmlsdGVyaW5nUm93KSB7XG4gICAgICBpc0ZpbHRlcmluZyA9IHRydWU7XG4gICAgfVxuICAgIGlmIChsb2FkZWRDb25maWcuaGlkZGVuQ29sdW1ucykge1xuICAgICAgaGlkZGVuQ29sdW1ucyA9IGxvYWRlZENvbmZpZy5oaWRkZW5Db2x1bW5zOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGhpZGRlbkNvbHVtbnNKc29uID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfaGlkZGVuQ29sdW1uc18ke2dyaWQuaWR9YCk7XG4gICAgICBpZiAoaGlkZGVuQ29sdW1uc0pzb24pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBoaWRkZW5Db2x1bW5zID0gSlNPTi5wYXJzZShoaWRkZW5Db2x1bW5zSnNvbik7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIGhpZGRlbkNvbHVtbnMgZnJvbSBsb2NhbFN0b3JhZ2UnLCBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAobG9hZGVkQ29uZmlnLmNvbHVtbk9yZGVyKSB7XG4gICAgICBjb2x1bW5PcmRlciA9IGxvYWRlZENvbmZpZy5jb2x1bW5PcmRlcjsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjb2x1bW5PcmRlckpzb24gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgb2NfZ3JpZF9jb2x1bW5PcmRlcl8ke2dyaWQuaWR9YCk7XG4gICAgICBpZiAoY29sdW1uT3JkZXJKc29uKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29sdW1uT3JkZXIgPSBKU09OLnBhcnNlKGNvbHVtbk9yZGVySnNvbik7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIGNvbHVtbk9yZGVyIGZyb20gbG9jYWxTdG9yYWdlJywgZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgdmlzaWJsZUNvbHVtbnM6IGdldFZpc2libGVDb2x1bW5zKGNvbHMsIGhpZGRlbkNvbHVtbnMsIGNvbHVtbk9yZGVyKSxcbiAgICAgIGZpbHRlcmluZ0RhdGE6IHtcbiAgICAgICAgaXNGaWx0ZXJpbmcsXG4gICAgICB9LFxuICAgIH07XG4gICAgaWYgKGxvYWRlZENvbmZpZy5jb2x1bW5XaWR0aHMpIHtcbiAgICAgIGNvbmZpZy5jb2x1bW5XaWR0aHMgPSBsb2FkZWRDb25maWcuY29sdW1uV2lkdGhzO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjb2x1bW5XaWR0aHMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgb2NfZ3JpZF9jb2x1bW5XaWR0aHNfJHtncmlkLmlkfWApO1xuICAgICAgaWYgKGNvbHVtbldpZHRocyAmJiAhZ3JpZC5kaXNhYmxlUmVtZW1iZXJDb2x1bW5XaWR0aHMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25maWcuY29sdW1uV2lkdGhzID0gSlNPTi5wYXJzZShjb2x1bW5XaWR0aHMpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhZ3JpZDogZXJyb3IgcGFyc2luZyBjb2x1bW5XaWR0aHMgZnJvbSBsb2NhbFN0b3JhZ2UnLCBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc29ydGluZ0RhdGEgJiYgIWdyaWQuZGlzYWJsZVJlbWVtYmVyU29ydERhdGEpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbmZpZy5zb3J0aW5nRGF0YSA9IEpTT04ucGFyc2Uoc29ydGluZ0RhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhZ3JpZDogZXJyb3IgcGFyc2luZyBzb3J0aW5nRGF0YSBmcm9tIHNlc3Npb25TdG9yYWdlJywgZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChmaWx0ZXJEYXRhICYmIGlzRmlsdGVyaW5nICYmICFncmlkLmRpc2FibGVSZW1lbWJlckZpbHRlckRhdGEpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbmZpZy5maWx0ZXJpbmdEYXRhLmZpbHRlckRhdGEgPSBKU09OLnBhcnNlKGZpbHRlckRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhZ3JpZDogZXJyb3IgcGFyc2luZyBmaWx0ZXJEYXRhIGZyb20gc2Vzc2lvblN0b3JhZ2UnLCBlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHBhZ2UpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbmZpZy5wYWdlID0gSlNPTi5wYXJzZShwYWdlKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgcGFnaW5hdGlvbiBmcm9tIHNlc3Npb25TdG9yYWdlJywgZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChyb3dzT25QYWdlKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25maWcucm93c09uUGFnZSA9IEpTT04ucGFyc2Uocm93c09uUGFnZSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIHBhZ2luYXRpb24gZnJvbSBzZXNzaW9uU3RvcmFnZScsIGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghY29uZmlnLnNvcnRpbmdEYXRhICYmIGdyaWQuZGVmYXVsdFNvcnRDb2x1bW4pIHtcbiAgICAgIGNvbmZpZy5zb3J0aW5nRGF0YSA9IHtcbiAgICAgICAgc29ydENvbHVtbjogZ3JpZC5kZWZhdWx0U29ydENvbHVtbixcbiAgICAgICAgc29ydE9yZGVyOiBncmlkLmRlZmF1bHRTb3J0T3JkZXIgfHwgJ2FzYycsXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gY29uZmlnO1xuICB9LFxuICBzYXZlU2VsZWN0ZWRJdGVtczogKGdyaWQsIHNlbGVjdGVkSXRlbXMpID0+IHtcbiAgICBpZiAoZ3JpZC5kaXNhYmxlUmVtZW1iZXJTZWxlY3RlZEl0ZW1zKSByZXR1cm4gZmFsc2U7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9zZWxlY3RlZEl0ZW1zXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShzZWxlY3RlZEl0ZW1zIHx8IFtdKSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIHNhdmVDb2x1bW5XaWR0aHM6IChncmlkLCBjb2x1bW5XaWR0aHMpID0+IHtcbiAgICBpZiAoZ3JpZC5kaXNhYmxlUmVtZW1iZXJDb2x1bW5XaWR0aHMpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIWNvbHVtbldpZHRocykgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChncmlkLmNvbmZpZ1N0b3JhZ2UgJiYgaXNGdW5jdGlvbihncmlkLmNvbmZpZ1N0b3JhZ2Uuc2F2ZSkpIHtcbiAgICAgIGdyaWQuY29uZmlnU3RvcmFnZS5zYXZlKHsgY29sdW1uV2lkdGhzIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9jb2x1bW5XaWR0aHNfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KGNvbHVtbldpZHRocykpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgc2F2ZUNvbHVtblNldHRpbmdzOiAoZ3JpZCwgaGlkZGVuQ29sdW1ucywgY29sdW1uT3JkZXIpID0+IHtcbiAgICBpZiAoIWhpZGRlbkNvbHVtbnMgfHwgIWNvbHVtbk9yZGVyKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGdyaWQuY29uZmlnU3RvcmFnZSAmJiBpc0Z1bmN0aW9uKGdyaWQuY29uZmlnU3RvcmFnZS5zYXZlKSkge1xuICAgICAgZ3JpZC5jb25maWdTdG9yYWdlLnNhdmUoeyBoaWRkZW5Db2x1bW5zLCBjb2x1bW5PcmRlciB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYG9jX2dyaWRfaGlkZGVuQ29sdW1uc18ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoaGlkZGVuQ29sdW1ucykpO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYG9jX2dyaWRfY29sdW1uT3JkZXJfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KGNvbHVtbk9yZGVyKSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBzYXZlU29ydERhdGE6IChncmlkLCBzb3J0aW5nRGF0YSkgPT4ge1xuICAgIGlmIChncmlkLmRpc2FibGVSZW1lbWJlclNvcnREYXRhKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFzb3J0aW5nRGF0YSkgcmV0dXJuIGZhbHNlO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oYG9jX2dyaWRfc29ydGluZ18ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoc29ydGluZ0RhdGEpKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgc2F2ZUZpbHRlckRhdGE6IChncmlkLCBmaWx0ZXJEYXRhKSA9PiB7XG4gICAgaWYgKGdyaWQuZGlzYWJsZVJlbWVtYmVyRmlsdGVyRGF0YSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghZmlsdGVyRGF0YSkgcmV0dXJuIGZhbHNlO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oYG9jX2dyaWRfZmlsdGVyaW5nXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShmaWx0ZXJEYXRhKSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIHNhdmVJc0ZpbHRlcmluZzogKGdyaWQsIGlzRmlsdGVyaW5nKSA9PiB7XG4gICAgaWYgKGdyaWQuZGlzYWJsZVJlbWVtYmVySXNGaWx0ZXJpbmcpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoaXNGaWx0ZXJpbmcgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZhbHNlO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX2lzRmlsdGVyaW5nXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShpc0ZpbHRlcmluZykpO1xuICAgIGlmICghaXNGaWx0ZXJpbmcpIHtcbiAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oYG9jX2dyaWRfZmlsdGVyaW5nXyR7Z3JpZC5pZH1gKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIHNhdmVQYWdlOiAoZ3JpZCwgcGFnZSkgPT4ge1xuICAgIGlmICghcGFnZSkgcmV0dXJuIGZhbHNlO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oYG9jX2dyaWRfcGFnZV8ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkocGFnZSkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBzYXZlUm93c09uUGFnZTogKGdyaWQsIHJvd3NPblBhZ2UpID0+IHtcbiAgICBpZiAoIXJvd3NPblBhZ2UpIHJldHVybiBmYWxzZTtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX3Jvd3NPblBhZ2VfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KHJvd3NPblBhZ2UpKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuICBjaGVja0dyaWRQYXJhbTogKGdyaWRQYXJhbSkgPT4ge1xuICAgIGlmIChncmlkUGFyYW0pIHtcbiAgICAgIGlmICghZ3JpZFBhcmFtLmlkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnW0dyaWRdIEludmFsaWQgYGdyaWQuaWRgIHBhcmFtZXRlciwgdXBkYXRlIGFjdGlvbiBwYXJhbWV0ZXJzIHRvIG5ldyBmb3JtYXQhJyxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmICghZ3JpZFBhcmFtLmlkS2V5UGF0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ1tHcmlkXSBJbnZhbGlkIGBncmlkLmlkS2V5UGF0aGAgcGFyYW1ldGVyLCB1cGRhdGUgYWN0aW9uIHBhcmFtZXRlcnMgdG8gbmV3IGZvcm1hdCEnLFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tHcmlkXSBJbnZhbGlkIGBncmlkYCBwYXJhbWV0ZXIsIHVwZGF0ZSBhY3Rpb24gcGFyYW1ldGVycyB0byBuZXcgZm9ybWF0IScpO1xuICAgIH1cbiAgfSxcbiAgY2hlY2tDb2x1bW5zUGFyYW06IChjb2x1bW5zUGFyYW0pID0+IHtcbiAgICBpZiAoIWNvbHVtbnNQYXJhbSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnW0dyaWRdIEludmFsaWQgYGNvbHVtbnNgIHBhcmFtZXRlciwgdXBkYXRlIGFjdGlvbiBwYXJhbWV0ZXJzIHRvIG5ldyBmb3JtYXQhJyxcbiAgICAgICk7XG4gICAgfVxuICB9LFxuICAvLyBMb2NhbGUgZ2V0dGVycywgc3VwcG9ydCBncmlkIHBhcmFtIG9yIHVzZXIgc3RhdGUgdXNlZCBpbiBPQyBhcHBsaWNhdGlvbnNcbiAgZ2V0TGFuZ3VhZ2U6IChncmlkLCBvY1VzZXJTdGF0ZSkgPT4ge1xuICAgIGlmIChncmlkLmxhbmd1YWdlICYmIHR5cGVvZiBncmlkLmxhbmd1YWdlID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGdyaWQubGFuZ3VhZ2U7XG4gICAgfVxuICAgIGlmIChvY1VzZXJTdGF0ZSkge1xuICAgICAgcmV0dXJuIG9jVXNlclN0YXRlLmdldEluKFsndXNlcicsICdsYW5ndWFnZSddLCAnZW4nKTtcbiAgICB9XG4gICAgcmV0dXJuICdlbic7XG4gIH0sXG4gIGdldFJlZ2lvbjogKGdyaWQsIG9jVXNlclN0YXRlKSA9PiB7XG4gICAgY29uc3QgZGVmYXVsdFJlZ2lvbiA9ICdlbl9HQic7XG4gICAgaWYgKGdyaWQucmVnaW9uICYmIHR5cGVvZiBncmlkLnJlZ2lvbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBncmlkLnJlZ2lvbjtcbiAgICB9XG4gICAgaWYgKG9jVXNlclN0YXRlKSB7XG4gICAgICByZXR1cm4gb2NVc2VyU3RhdGUuZ2V0SW4oWyd1c2VyJywgJ3JlZ2lvbiddLCBkZWZhdWx0UmVnaW9uKTtcbiAgICB9XG4gICAgcmV0dXJuIGRlZmF1bHRSZWdpb247XG4gIH0sXG4gIGdldERhdGVGb3JtYXQ6IChncmlkLCBvY1VzZXJTdGF0ZSkgPT4ge1xuICAgIGlmIChncmlkLmRhdGVGb3JtYXQgJiYgdHlwZW9mIGdyaWQuZGF0ZUZvcm1hdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBncmlkLmRhdGVGb3JtYXQudG9VcHBlckNhc2UoKTtcbiAgICB9XG4gICAgaWYgKG9jVXNlclN0YXRlKSB7XG4gICAgICByZXR1cm4gb2NVc2VyU3RhdGUuZ2V0SW4oWydsb2NhbGVGb3JtYXQnLCAnZGF0ZUZvcm1hdCddLCAnTCcpO1xuICAgIH1cbiAgICByZXR1cm4gJ0wnO1xuICB9LFxuICBnZXRUaG91c2FuZFNlcGFyYXRvcjogKGdyaWQsIG9jVXNlclN0YXRlKSA9PiB7XG4gICAgaWYgKGdyaWQudGhvdXNhbmRTZXBhcmF0b3IgJiYgdHlwZW9mIGdyaWQubGFuZ3VhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZ3JpZC50aG91c2FuZFNlcGFyYXRvcjtcbiAgICB9XG4gICAgaWYgKG9jVXNlclN0YXRlKSB7XG4gICAgICByZXR1cm4gb2NVc2VyU3RhdGUuZ2V0SW4oWydsb2NhbGVGb3JtYXQnLCAndGhvdXNhbmRTZXBhcmF0b3InXSwgJycpO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH0sXG4gIGdldERlY2ltYWxTZXBhcmF0b3I6IChncmlkLCBvY1VzZXJTdGF0ZSkgPT4ge1xuICAgIGlmIChncmlkLmRlY2ltYWxTZXBhcmF0b3IgJiYgdHlwZW9mIGdyaWQubGFuZ3VhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZ3JpZC5kZWNpbWFsU2VwYXJhdG9yO1xuICAgIH1cbiAgICBpZiAob2NVc2VyU3RhdGUpIHtcbiAgICAgIHJldHVybiBvY1VzZXJTdGF0ZS5nZXRJbihbJ2xvY2FsZUZvcm1hdCcsICdkZWNpbWFsU2VwYXJhdG9yJ10sICcuJyk7XG4gICAgfVxuICAgIHJldHVybiAnLic7XG4gIH0sXG4gIG5vcm1hbGl6ZUZpbHRlcmluZ0RhdGE6IChmaWx0ZXJpbmdEYXRhKSA9PiB7XG4gICAgbGV0IG5ld0ZpbHRlcmluZ0RhdGEgPSBNYXAoeyBpc0ZpbHRlcmluZzogZmFsc2UgfSk7XG4gICAgaWYgKCFmaWx0ZXJpbmdEYXRhKSByZXR1cm4gbmV3RmlsdGVyaW5nRGF0YTtcblxuICAgIGNvbnN0IG9sZEZpbHRlcmluZ0RhdGEgPSBNYXAuaXNNYXAoZmlsdGVyaW5nRGF0YSkgPyBmaWx0ZXJpbmdEYXRhIDogZnJvbUpTKGZpbHRlcmluZ0RhdGEpO1xuICAgIGNvbnN0IGlzRmlsdGVyaW5nID0gb2xkRmlsdGVyaW5nRGF0YS5nZXQoJ2lzRmlsdGVyaW5nJywgZmFsc2UpO1xuICAgIGNvbnN0IGZpbHRlckRhdGEgPSBvbGRGaWx0ZXJpbmdEYXRhLmdldCgnZmlsdGVyRGF0YScsIG51bGwpO1xuXG4gICAgaWYgKGlzRmlsdGVyaW5nICYmIGZpbHRlckRhdGEgJiYgTWFwLmlzTWFwKGZpbHRlckRhdGEpKSB7XG4gICAgICBuZXdGaWx0ZXJpbmdEYXRhID0gbmV3RmlsdGVyaW5nRGF0YS5zZXQoJ2lzRmlsdGVyaW5nJywgdHJ1ZSkuc2V0KCdmaWx0ZXJEYXRhJywgZmlsdGVyRGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld0ZpbHRlcmluZ0RhdGE7XG4gIH0sXG4gIC8qXG4gICAqIEBmdW5jdGlvbiB2aXNpYmxlQ29sdW1uc1xuICAgKiBAZGVzYyAgUmV0dXJucyBlaXRoZXIgdmlzaWJsZSBjb2x1bW5zIChpZiBzb21lIGNvbHVtbnMgYXJlIGhpZGRlbiApXG4gICAqICAgICAgICBvciBncmlkIGRlZmF1bHQgY29sdW1ucy5cbiAgICogQHBhcmFtIG9yaWdDb2x1bW5zIEFycmF5IG9mIEdyaWQgb3JpZ2luYWwgY29sdW1ucyBvYmplY3RzXG4gICAqIEBwYXJhbSB2aXNpYmxlQ29sdW1ucyBBcnJheSBvZiBHcmlkIHZpc2libGUgY29sdW1ucyB2YWx1ZUtleVBhdGhzXG4gICAqIEByZXR1cm5zIEFycmF5IG9mIGNvbHVtbiBvYmplY3RzIGN1cnJlbnRseSB2aXNpYmxlIGZvciB1c2VyLlxuICAgKi9cbiAgdmlzaWJsZUNvbHVtbnM6IChvcmlnQ29sdW1ucywgdmlzaWJsZUNvbHVtbnMpID0+IHtcbiAgICBpZiAoIXZpc2libGVDb2x1bW5zKSByZXR1cm4gb3JpZ0NvbHVtbnM7XG4gICAgY29uc3QgZmlsdGVyZWQgPSB2aXNpYmxlQ29sdW1ucy5tYXAoXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICBzZWFyY2hDb2wgPT4gb3JpZ0NvbHVtbnMuZmluZChcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgIC8vIHZhbHVlS2V5UGF0aCBpcyBqb2luZWQgaGVyZSBhcyBpdCBjYW4gYmUgYW4gYXJyYXkgbGlrZSBbJ2tleTEnLCAna2V5MiddLlxuICAgICAgICAvLyBzZWFyY2hDb2wgaXMgc2ltaWxhcmx5IGpvaW5lZCBpbiBvbkNlbGxLZXlEb3duIGluIGRhdGFncmlkLmNvbXBvbmVudC5qc3hcbiAgICAgICAgY29sID0+IEpTT04uc3RyaW5naWZ5KGNvbC52YWx1ZUtleVBhdGguam9pbignLycpKSA9PT0gSlNPTi5zdHJpbmdpZnkoc2VhcmNoQ29sKSxcbiAgICAgICksXG4gICAgKTtcbiAgICByZXR1cm4gZmlsdGVyZWQudG9KUygpO1xuICB9LFxufTtcbiJdfQ==