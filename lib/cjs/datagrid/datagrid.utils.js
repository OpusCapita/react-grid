"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _isNaN = _interopRequireDefault(require("lodash/isNaN"));

var _util = require("util");

var _immutable = require("immutable");

var _formatUtils = require("@opuscapita/format-utils");

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
          // in case of select filterVal ei not string
          var trimmedVal = filterVal.trim ? filterVal.trim() : filterVal; // handle special characters by escaping them

          var escapedVal = (0, _formatUtils.escapeSpecialCharacters)(trimmedVal);
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
      return ocUserState.getIn(['localeFormat', 'thousandSeparator']) || ' ';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC51dGlscy5qcyJdLCJuYW1lcyI6WyJnZXRDb2x1bW5LZXkiLCJjb2wiLCJjb2x1bW5LZXkiLCJ2YWx1ZUtleVBhdGgiLCJqb2luIiwiZ2V0VmlzaWJsZUNvbHVtbnMiLCJjb2xzIiwiaGlkZGVuQ29sdW1ucyIsImNvbHVtbk9yZGVyIiwib3JkZXJlZENvbHVtbkxpc3QiLCJmb3JFYWNoIiwiaSIsImNvbE9yZGVySWR4IiwiaW5kZXhPZiIsImRlZmF1bHRIaWRkZW4iLCJpc0hpZGRlbiIsIm9yZGVyIiwicHVzaCIsInNvcnQiLCJhIiwiYiIsIm1hcCIsIml0ZW0iLCJnZXRDb2x1bW5EZWZhdWx0VmFsdWVzIiwiY29sdW1uRGVmYXVsdFZhbHVlcyIsImRlZmF1bHRWYWx1ZSIsInVuZGVmaW5lZCIsImdldENlbGxTdHlsZUJ5Q29sIiwiYWxpZ24iLCJ0ZXh0QWxpZ24iLCJjb21wb25lbnRUeXBlIiwidmFsdWVUeXBlIiwiaXNTb3J0YWJsZSIsInNvcnRWYWx1ZUdldHRlciIsImRpc2FibGVTb3J0aW5nIiwiZ2V0U29ydENvbXBhcmF0b3IiLCJzb3J0Q29tcGFyYXRvciIsImxvY2FsZUNvbXBhcmUiLCJEYXRlIiwiZ2V0U29ydFZhbHVlR2V0dGVyIiwiZGF0YSIsImNlbGxEYXRhIiwiZ2V0SW4iLCJzZWxlY3RDb21wb25lbnRPcHRpb25zIiwiTGlzdCIsImlzTGlzdCIsIkFycmF5IiwiaXNBcnJheSIsImxhYmVscyIsImQiLCJmb3VuZCIsImZpbmQiLCJvIiwidmFsdWUiLCJsYWJlbCIsImdldFZhbHVlRW1wdHlDaGVja2VyIiwidmFsdWVFbXB0eUNoZWNrZXIiLCJ2YWwiLCJsZW5ndGgiLCJzaXplIiwiZ2V0RmlsdGVyTWF0Y2hlciIsImRhdGVGb3JtYXQiLCJmaWx0ZXJNYXRjaGVyIiwiZ2V0VmFsIiwicm93IiwiZmlsdGVyVmFsIiwiZmlsdGVycyIsInRvSlMiLCJzb21lIiwiZmlsdGVyIiwiZmluZEluZGV4IiwidiIsImZpbHRlclZhbEludCIsInBhcnNlSW50IiwidmFsSW50IiwiU3RyaW5nIiwiaW5jbHVkZXMiLCJmaWx0ZXJWYWxGbG9hdCIsInBhcnNlRmxvYXQiLCJyZXBsYWNlIiwiaXNWYWxpZCIsImZvcm1hdCIsInRyaW1tZWRWYWwiLCJ0cmltIiwiZXNjYXBlZFZhbCIsIlJlZ0V4cCIsInRlc3QiLCJsb2FkU2VsZWN0ZWRJdGVtcyIsImdyaWQiLCJzZXNzaW9uSXRlbSIsInNlc3Npb25TdG9yYWdlIiwiZ2V0SXRlbSIsImlkIiwiZGlzYWJsZVJlbWVtYmVyU2VsZWN0ZWRJdGVtcyIsIkpTT04iLCJwYXJzZSIsImUiLCJjb25zb2xlIiwiZXJyb3IiLCJsb2FkR3JpZENvbmZpZyIsImNvbmZpZ1N0b3JhZ2UiLCJzb3J0aW5nRGF0YSIsImZpbHRlckRhdGEiLCJpc0ZpbHRlcmluZ0RhdGEiLCJsb2NhbFN0b3JhZ2UiLCJwYWdlIiwicm93c09uUGFnZSIsImxvYWRlZENvbmZpZyIsImlzRmlsdGVyaW5nIiwibG9hZCIsImRpc2FibGVSZW1lbWJlcklzRmlsdGVyaW5nIiwiZGVmYXVsdFNob3dGaWx0ZXJpbmdSb3ciLCJoaWRkZW5Db2x1bW5zSnNvbiIsImNvbHVtbk9yZGVySnNvbiIsImNvbmZpZyIsInZpc2libGVDb2x1bW5zIiwiZmlsdGVyaW5nRGF0YSIsImNvbHVtbldpZHRocyIsImRpc2FibGVSZW1lbWJlckNvbHVtbldpZHRocyIsImRpc2FibGVSZW1lbWJlclNvcnREYXRhIiwiZGlzYWJsZVJlbWVtYmVyRmlsdGVyRGF0YSIsImRlZmF1bHRTb3J0Q29sdW1uIiwic29ydENvbHVtbiIsInNvcnRPcmRlciIsImRlZmF1bHRTb3J0T3JkZXIiLCJzYXZlU2VsZWN0ZWRJdGVtcyIsInNlbGVjdGVkSXRlbXMiLCJzZXRJdGVtIiwic3RyaW5naWZ5Iiwic2F2ZUNvbHVtbldpZHRocyIsInNhdmUiLCJzYXZlQ29sdW1uU2V0dGluZ3MiLCJzYXZlU29ydERhdGEiLCJzYXZlRmlsdGVyRGF0YSIsInNhdmVJc0ZpbHRlcmluZyIsInJlbW92ZUl0ZW0iLCJzYXZlUGFnZSIsInNhdmVSb3dzT25QYWdlIiwiY2hlY2tHcmlkUGFyYW0iLCJncmlkUGFyYW0iLCJFcnJvciIsImlkS2V5UGF0aCIsImNoZWNrQ29sdW1uc1BhcmFtIiwiY29sdW1uc1BhcmFtIiwiZ2V0TGFuZ3VhZ2UiLCJvY1VzZXJTdGF0ZSIsImxhbmd1YWdlIiwiZ2V0UmVnaW9uIiwiZGVmYXVsdFJlZ2lvbiIsInJlZ2lvbiIsImdldERhdGVGb3JtYXQiLCJ0b1VwcGVyQ2FzZSIsImdldFRob3VzYW5kU2VwYXJhdG9yIiwidGhvdXNhbmRTZXBhcmF0b3IiLCJnZXREZWNpbWFsU2VwYXJhdG9yIiwiZGVjaW1hbFNlcGFyYXRvciIsIm5vcm1hbGl6ZUZpbHRlcmluZ0RhdGEiLCJuZXdGaWx0ZXJpbmdEYXRhIiwib2xkRmlsdGVyaW5nRGF0YSIsIk1hcCIsImlzTWFwIiwiZ2V0Iiwic2V0Iiwib3JpZ0NvbHVtbnMiLCJmaWx0ZXJlZCIsInNlYXJjaENvbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUxBO0FBT0EsSUFBTUEsWUFBWSxHQUFHLFNBQWZBLFlBQWUsQ0FBQUMsR0FBRztBQUFBLFNBQUlBLEdBQUcsQ0FBQ0MsU0FBSixJQUFpQkQsR0FBRyxDQUFDRSxZQUFKLENBQWlCQyxJQUFqQixDQUFzQixHQUF0QixDQUFyQjtBQUFBLENBQXhCOztBQUVBLElBQU1DLGlCQUFpQixHQUFHLFNBQXBCQSxpQkFBb0IsQ0FBQ0MsSUFBRCxFQUFPQyxhQUFQLEVBQTJCQyxXQUEzQixFQUFnRDtBQUFBLE1BQXpDRCxhQUF5QztBQUF6Q0EsSUFBQUEsYUFBeUMsR0FBekIsRUFBeUI7QUFBQTs7QUFBQSxNQUFyQkMsV0FBcUI7QUFBckJBLElBQUFBLFdBQXFCLEdBQVAsRUFBTztBQUFBOztBQUN4RSxNQUFNQyxpQkFBaUIsR0FBRyxFQUExQjtBQUNBSCxFQUFBQSxJQUFJLENBQUNJLE9BQUwsQ0FBYSxVQUFD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QUd3RCxnQkFBZ0IsQ0FBQ0csR0FBakIsQ0FBcUIsWUFBckIsRUFBbUMsSUFBbkMsQ0FBbkI7O0FBRUEsUUFBSXJELFdBQVcsSUFBSU4sVUFBZixJQUE2QnlELGVBQUlDLEtBQUosQ0FBVTFELFVBQVYsQ0FBakMsRUFBd0Q7QUFDdER1RCxNQUFBQSxnQkFBZ0IsR0FBR0EsZ0JBQWdCLENBQUNLLEdBQWpCLENBQXFCLGFBQXJCLEVBQW9DLElBQXBDLEVBQTBDQSxHQUExQyxDQUE4QyxZQUE5QyxFQUE0RDVELFVBQTVELENBQW5CO0FBQ0Q7O0FBRUQsV0FBT3VELGdCQUFQO0FBQ0QsR0FqYlk7O0FBa2JiOzs7Ozs7OztBQVFBMUMsRUFBQUEsY0FBYyxFQUFFLHdCQUFDZ0QsV0FBRCxFQUFjaEQsZUFBZCxFQUFpQztBQUMvQyxRQUFJLENBQUNBLGVBQUwsRUFBcUIsT0FBT2dELFdBQVA7O0FBQ3JCLFFBQU1DLFFBQVEsR0FBR2pELGVBQWMsQ0FBQzlGLEdBQWYsRUFDZjtBQUNBLGNBQUFnSixTQUFTO0FBQUEsYUFBSUYsV0FBVyxDQUFDaEgsSUFBWixFQUNUO0FBQ0Y7QUFDQTtBQUNBLGdCQUFBbEQsR0FBRztBQUFBLGVBQUk2RixJQUFJLENBQUNrQyxTQUFMLENBQWUvSCxHQUFHLENBQUNFLFlBQUosQ0FBaUJDLElBQWpCLENBQXNCLEdBQXRCLENBQWYsTUFBK0MwRixJQUFJLENBQUNrQyxTQUFMLENBQWVxQyxTQUFmLENBQW5EO0FBQUEsT0FKUSxDQUFKO0FBQUEsS0FGTSxDQUFqQjs7QUFTQSxXQUFPRCxRQUFRLENBQUNqRyxJQUFULEVBQVA7QUFDRDtBQXRjWSxDIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tbmVzdGVkLXRlcm5hcnkgKi9cbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCBpc05hTiBmcm9tICdsb2Rhc2gvaXNOYU4nO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJ3V0aWwnO1xuaW1wb3J0IHsgTWFwLCBmcm9tSlMsIExpc3QgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IHsgZXNjYXBlU3BlY2lhbENoYXJhY3RlcnMgfSBmcm9tICdAb3B1c2NhcGl0YS9mb3JtYXQtdXRpbHMnO1xuXG5jb25zdCBnZXRDb2x1bW5LZXkgPSBjb2wgPT4gY29sLmNvbHVtbktleSB8fCBjb2wudmFsdWVLZXlQYXRoLmpvaW4oJy8nKTtcblxuY29uc3QgZ2V0VmlzaWJsZUNvbHVtbnMgPSAoY29scywgaGlkZGVuQ29sdW1ucyA9IFtdLCBjb2x1bW5PcmRlciA9IFtdKSA9PiB7XG4gIGNvbnN0IG9yZGVyZWRDb2x1bW5MaXN0ID0gW107XG4gIGNvbHMuZm9yRWFjaCgoY29sLCBpKSA9PiB7XG4gICAgY29uc3QgY29sdW1uS2V5ID0gZ2V0Q29sdW1uS2V5KGNvbCk7XG4gICAgY29uc3QgY29sT3JkZXJJZHggPSBjb2x1bW5PcmRlci5pbmRleE9mKGNvbHVtbktleSk7XG4gICAgY29uc3QgZGVmYXVsdEhpZGRlbiA9IGNvbC5pc0hpZGRlbiAmJiBjb2xPcmRlcklkeCA9PT0gLTE7XG4gICAgaWYgKGRlZmF1bHRIaWRkZW4gfHwgaGlkZGVuQ29sdW1ucy5pbmRleE9mKGNvbHVtbktleSkgPiAtMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBvcmRlciA9IGNvbE9yZGVySWR4ICE9PSAtMSA/IGNvbE9yZGVySWR4IDogaSArIDE7XG4gICAgb3JkZXJlZENvbHVtbkxpc3QucHVzaCh7XG4gICAgICBjb2x1bW5LZXksXG4gICAgICBvcmRlcixcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBvcmRlcmVkQ29sdW1uTGlzdC5zb3J0KChhLCBiKSA9PiBhLm9yZGVyIC0gYi5vcmRlcikubWFwKGl0ZW0gPT4gaXRlbS5jb2x1bW5LZXkpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBnZXRDb2x1bW5LZXksXG4gIGdldENvbHVtbkRlZmF1bHRWYWx1ZXM6IChjb2xzKSA9PiB7XG4gICAgY29uc3QgY29sdW1uRGVmYXVsdFZhbHVlcyA9IHt9O1xuICAgIGNvbHMuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICBpZiAoY29sLmRlZmF1bHRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbHVtbkRlZmF1bHRWYWx1ZXNbZ2V0Q29sdW1uS2V5KGNvbCldID0gY29sLmRlZmF1bHRWYWx1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gY29sdW1uRGVmYXVsdFZhbHVlcztcbiAgfSxcbiAgZ2V0Q2VsbFN0eWxlQnlDb2w6IChjb2wpID0+IHtcbiAgICBpZiAoY29sLmFsaWduKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0ZXh0QWxpZ246IGNvbC5hbGlnbixcbiAgICAgIH07XG4gICAgfVxuICAgIC8vIE5vIGRlZmF1bHQgYWxpZ24gaWYgY29tcG9uZW50IGlzIHNlbGVjdFxuICAgIC8vIEJlY2F1c2UgcmVuZGVyZWQgZGF0YSBpcyBtb3N0IGxpa2VseSB0ZXh0XG4gICAgLy8gRXZlbiBpZiB2YWx1ZVR5cGUgaXMgbnVtYmVyXG4gICAgaWYgKGNvbC5jb21wb25lbnRUeXBlID09PSAnc2VsZWN0JyB8fCBjb2wuY29tcG9uZW50VHlwZSA9PT0gJ211bHRpc2VsZWN0Jykge1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgICBzd2l0Y2ggKGNvbC52YWx1ZVR5cGUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0ZXh0QWxpZ246ICdyaWdodCcsXG4gICAgICAgIH07XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4ge307XG4gICAgfVxuICB9LFxuICBpc1NvcnRhYmxlOiBjb2wgPT4gY29sLnZhbHVlVHlwZVxuICAgICYmIChjb2wuc29ydFZhbHVlR2V0dGVyIHx8IGNvbC52YWx1ZUtleVBhdGgpXG4gICAgJiYgIWNvbC5kaXNhYmxlU29ydGluZyxcbiAgZ2V0U29ydENvbXBhcmF0b3I6IChjb2wpID0+IHtcbiAgICBpZiAoY29sLnNvcnRDb21wYXJhdG9yKSB7XG4gICAgICByZXR1cm4gY29sLnNvcnRDb21wYXJhdG9yO1xuICAgIH1cbiAgICBzd2l0Y2ggKGNvbC52YWx1ZVR5cGUpIHtcbiAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgICByZXR1cm4gKGEsIGIpID0+IChhLmxvY2FsZUNvbXBhcmUgPyBhLmxvY2FsZUNvbXBhcmUoYikgOiAxKTtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICAgIHJldHVybiAoYSwgYikgPT4gYSAtIGI7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgcmV0dXJuIChhLCBiKSA9PiAoYSA9PT0gYiA/IDAgOiBhID8gLTEgOiAxKTtcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICByZXR1cm4gKGEsIGIpID0+IG5ldyBEYXRlKGEpIC0gbmV3IERhdGUoYik7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gKGEsIGIpID0+IChhLmxvY2FsZUNvbXBhcmUgPyBhLmxvY2FsZUNvbXBhcmUoYikgOiAxKTtcbiAgICB9XG4gIH0sXG4gIGdldFNvcnRWYWx1ZUdldHRlcjogKGNvbCkgPT4ge1xuICAgIGlmIChjb2wuc29ydFZhbHVlR2V0dGVyKSB7XG4gICAgICByZXR1cm4gY29sLnNvcnRWYWx1ZUdldHRlcjtcbiAgICB9XG4gICAgcmV0dXJuIChkYXRhKSA9PiB7XG4gICAgICBjb25zdCBjZWxsRGF0YSA9IGRhdGEuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG4gICAgICAvLyBEZWFsIHdpdGggc2VsZWN0IGFuZCBtdWx0aXNlbGVjdCBjb21wb25lbnRUeXBlc1xuICAgICAgaWYgKGNvbC5zZWxlY3RDb21wb25lbnRPcHRpb25zKSB7XG4gICAgICAgIGlmIChMaXN0LmlzTGlzdChjZWxsRGF0YSkgfHwgQXJyYXkuaXNBcnJheShjZWxsRGF0YSkpIHtcbiAgICAgICAgICBjb25zdCBsYWJlbHMgPSBbXTtcbiAgICAgICAgICBjZWxsRGF0YS5mb3JFYWNoKChkKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmb3VuZCA9IGNvbC5zZWxlY3RDb21wb25lbnRPcHRpb25zLmZpbmQobyA9PiBvLnZhbHVlID09PSBkKTtcbiAgICAgICAgICAgIGlmIChmb3VuZCkgbGFiZWxzLnB1c2goZm91bmQubGFiZWwpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiBsYWJlbHMuam9pbignICcpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZvdW5kID0gY29sLnNlbGVjdENvbXBvbmVudE9wdGlvbnMuZmluZChvID0+IG8udmFsdWUgPT09IGNlbGxEYXRhKTtcbiAgICAgICAgaWYgKGZvdW5kKSByZXR1cm4gZm91bmQubGFiZWw7XG4gICAgICB9XG4gICAgICBpZiAoY2VsbERhdGEgJiYgY2VsbERhdGEuam9pbikgcmV0dXJuIGNlbGxEYXRhLmpvaW4oJyAnKTtcbiAgICAgIHJldHVybiBjZWxsRGF0YTtcbiAgICB9O1xuICB9LFxuICBnZXRWYWx1ZUVtcHR5Q2hlY2tlcjogKGNvbCkgPT4ge1xuICAgIGlmIChjb2wudmFsdWVFbXB0eUNoZWNrZXIpIHtcbiAgICAgIHJldHVybiBjb2wudmFsdWVFbXB0eUNoZWNrZXI7XG4gICAgfVxuICAgIGlmIChjb2wuY29tcG9uZW50VHlwZSA9PT0gJ211bHRpc2VsZWN0Jykge1xuICAgICAgcmV0dXJuIHZhbCA9PiB2YWwgPT09ICcnIHx8IHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCB8fCB2YWwubGVuZ3RoID09PSAwIHx8IHZhbC5zaXplID09PSAwOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgfVxuXG4gICAgc3dpdGNoIChjb2wudmFsdWVUeXBlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgICByZXR1cm4gdmFsID0+IHZhbCA9PT0gJycgfHwgaXNOYU4odmFsKSB8fCB2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQ7XG4gICAgICBjYXNlICd0ZXh0JzpcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICBjYXNlICdzZWxlY3QnOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHZhbCA9PiB2YWwgPT09ICcnIHx8IHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZDtcbiAgICB9XG4gIH0sXG4gIGdldEZpbHRlck1hdGNoZXI6IChjb2wsIGRhdGVGb3JtYXQpID0+IHtcbiAgICBpZiAoY29sLmZpbHRlck1hdGNoZXIpIHJldHVybiBjb2wuZmlsdGVyTWF0Y2hlcjtcbiAgICBjb25zdCBnZXRWYWwgPSByb3cgPT4gcm93LmdldEluKGNvbC52YWx1ZUtleVBhdGgpO1xuXG4gICAgaWYgKGNvbC5jb21wb25lbnRUeXBlID09PSAnbXVsdGlzZWxlY3QnKSB7XG4gICAgICByZXR1cm4gKHJvdywgZmlsdGVyVmFsKSA9PiB7XG4gICAgICAgIC8vIHZhbHVlIGNhbiBiZSBzaW1wbGUgdmFsdWUsIGltbXV0YWJsZSBMaXN0IG9yIGFycmF5XG4gICAgICAgIGNvbnN0IHZhbHVlID0gZ2V0VmFsKHJvdyk7XG4gICAgICAgIC8vIHNlc3Npb24gc3RvcmFnZSBjb250ZW50IGlzIGNvbnZlcnRlZCB0byBpbW11dGFibGUgYW5kIG11bHRpc2VsZWN0XG4gICAgICAgIC8vIGZpbHRlcnMgaXMgdGhlbiBsaXN0IG90aGVyd2lzZSBhcnJheVxuICAgICAgICBjb25zdCBmaWx0ZXJzID0gZmlsdGVyVmFsICYmIGZpbHRlclZhbC50b0pTID8gZmlsdGVyVmFsLnRvSlMoKSA6IGZpbHRlclZhbDtcbiAgICAgICAgcmV0dXJuIGZpbHRlcnMuc29tZSgoZmlsdGVyKSA9PiB7XG4gICAgICAgICAgaWYgKExpc3QuaXNMaXN0KHZhbHVlKSB8fCBBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLmZpbmRJbmRleCh2ID0+IHYgPT09IGZpbHRlci52YWx1ZSkgIT09IC0xO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmlsdGVyLnZhbHVlID09PSB2YWx1ZTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHN3aXRjaCAoY29sLnZhbHVlVHlwZSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgcmV0dXJuIChyb3csIGZpbHRlclZhbCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gZ2V0VmFsKHJvdyk7XG4gICAgICAgICAgaWYgKHZhbHVlID09PSAnJyB8fCBpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBtYXRjaCBleGFjdCBudW1iZXIgdmFsdWVcbiAgICAgICAgICBjb25zdCBmaWx0ZXJWYWxJbnQgPSBwYXJzZUludChmaWx0ZXJWYWwsIDEwKTtcbiAgICAgICAgICBjb25zdCB2YWxJbnQgPSBwYXJzZUludCh2YWx1ZSwgMTApO1xuICAgICAgICAgIGlmIChmaWx0ZXJWYWxJbnQgPT09IHZhbEludCB8fCBmaWx0ZXJWYWxJbnQgPT09IHZhbEludCAqIC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gbWF0Y2ggcGFydGlhbFxuICAgICAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpLmluY2x1ZGVzKGZpbHRlclZhbCk7XG4gICAgICAgIH07XG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICAgIHJldHVybiAocm93LCBmaWx0ZXJWYWwpID0+IHtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IGdldFZhbChyb3cpO1xuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gJycgfHwgaXNOYU4odmFsdWUpIHx8IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gbWF0Y2ggZXhhY3QgZmxvYXQgdmFsdWVcbiAgICAgICAgICBjb25zdCBmaWx0ZXJWYWxGbG9hdCA9IHBhcnNlRmxvYXQoZmlsdGVyVmFsLnJlcGxhY2UoJywnLCAnLicpKTtcbiAgICAgICAgICBpZiAoZmlsdGVyVmFsRmxvYXQgPT09IHBhcnNlRmxvYXQodmFsdWUpIHx8IGZpbHRlclZhbEZsb2F0ID09PSBwYXJzZUZsb2F0KHZhbHVlKSAqIC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gbWF0Y2ggcGFydGlhbFxuICAgICAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpLnJlcGxhY2UoJywnLCAnLicpLmluY2x1ZGVzKGZpbHRlclZhbC5yZXBsYWNlKCcsJywgJy4nKSk7XG4gICAgICAgIH07XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgcmV0dXJuIChyb3csIGZpbHRlclZhbCkgPT4ge1xuICAgICAgICAgIGlmIChtb21lbnQoZ2V0VmFsKHJvdykpLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG1vbWVudChnZXRWYWwocm93KSkuZm9ybWF0KGRhdGVGb3JtYXQpID09PSBtb21lbnQoZmlsdGVyVmFsKS5mb3JtYXQoZGF0ZUZvcm1hdCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgY2FzZSAndGV4dCc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gKHJvdywgZmlsdGVyVmFsKSA9PiB7XG4gICAgICAgICAgLy8gaW4gY2FzZSBvZiBzZWxlY3QgZmlsdGVyVmFsIGVpIG5vdCBzdHJpbmdcbiAgICAgICAgICBjb25zdCB0cmltbWVkVmFsID0gZmlsdGVyVmFsLnRyaW0gPyBmaWx0ZXJWYWwudHJpbSgpIDogZmlsdGVyVmFsO1xuICAgICAgICAgIC8vIGhhbmRsZSBzcGVjaWFsIGNoYXJhY3RlcnMgYnkgZXNjYXBpbmcgdGhlbVxuICAgICAgICAgIGNvbnN0IGVzY2FwZWRWYWwgPSBlc2NhcGVTcGVjaWFsQ2hhcmFjdGVycyh0cmltbWVkVmFsKTtcbiAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cChlc2NhcGVkVmFsLCAnaScpLnRlc3QoZ2V0VmFsKHJvdykpO1xuICAgICAgICB9O1xuICAgIH1cbiAgfSxcbiAgbG9hZFNlbGVjdGVkSXRlbXM6IChncmlkKSA9PiB7XG4gICAgY29uc3Qgc2Vzc2lvbkl0ZW0gPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX3NlbGVjdGVkSXRlbXNfJHtncmlkLmlkfWApO1xuICAgIGlmIChzZXNzaW9uSXRlbSAmJiAhZ3JpZC5kaXNhYmxlUmVtZW1iZXJTZWxlY3RlZEl0ZW1zKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShzZXNzaW9uSXRlbSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIHNlbGVjdGVkSXRlbXMgZnJvbSBzZXNzaW9uU3RvcmFnZScsIGUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH0sXG4gIGxvYWRHcmlkQ29uZmlnOiAoZ3JpZCwgY29scykgPT4ge1xuICAgIGNvbnN0IGNvbmZpZ1N0b3JhZ2UgPSBncmlkLmNvbmZpZ1N0b3JhZ2UgfHwge307XG4gICAgY29uc3Qgc29ydGluZ0RhdGEgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX3NvcnRpbmdfJHtncmlkLmlkfWApO1xuICAgIGNvbnN0IGZpbHRlckRhdGEgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX2ZpbHRlcmluZ18ke2dyaWQuaWR9YCk7XG4gICAgY29uc3QgaXNGaWx0ZXJpbmdEYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfaXNGaWx0ZXJpbmdfJHtncmlkLmlkfWApO1xuICAgIGNvbnN0IHBhZ2UgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX3BhZ2VfJHtncmlkLmlkfWApO1xuICAgIGNvbnN0IHJvd3NPblBhZ2UgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX3Jvd3NPblBhZ2VfJHtncmlkLmlkfWApO1xuICAgIGxldCBsb2FkZWRDb25maWcgPSB7fTtcbiAgICBsZXQgaGlkZGVuQ29sdW1ucztcbiAgICBsZXQgY29sdW1uT3JkZXI7XG4gICAgbGV0IGlzRmlsdGVyaW5nID0gZmFsc2U7XG5cbiAgICBpZiAoaXNGdW5jdGlvbihjb25maWdTdG9yYWdlLmxvYWQpKSB7XG4gICAgICBsb2FkZWRDb25maWcgPSBjb25maWdTdG9yYWdlLmxvYWQoKTtcbiAgICB9XG5cbiAgICBpZiAoaXNGaWx0ZXJpbmdEYXRhKSB7XG4gICAgICBpZiAoIWdyaWQuZGlzYWJsZVJlbWVtYmVySXNGaWx0ZXJpbmcpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpc0ZpbHRlcmluZyA9IEpTT04ucGFyc2UoaXNGaWx0ZXJpbmdEYXRhKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgaXNGaWx0ZXJpbmdEYXRhIGZyb20gbG9jYWxTdG9yYWdlJywgZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGdyaWQuZGVmYXVsdFNob3dGaWx0ZXJpbmdSb3cpIHtcbiAgICAgIGlzRmlsdGVyaW5nID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGxvYWRlZENvbmZpZy5oaWRkZW5Db2x1bW5zKSB7XG4gICAgICBoaWRkZW5Db2x1bW5zID0gbG9hZGVkQ29uZmlnLmhpZGRlbkNvbHVtbnM7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaGlkZGVuQ29sdW1uc0pzb24gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgb2NfZ3JpZF9oaWRkZW5Db2x1bW5zXyR7Z3JpZC5pZH1gKTtcbiAgICAgIGlmIChoaWRkZW5Db2x1bW5zSnNvbikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGhpZGRlbkNvbHVtbnMgPSBKU09OLnBhcnNlKGhpZGRlbkNvbHVtbnNKc29uKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgaGlkZGVuQ29sdW1ucyBmcm9tIGxvY2FsU3RvcmFnZScsIGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChsb2FkZWRDb25maWcuY29sdW1uT3JkZXIpIHtcbiAgICAgIGNvbHVtbk9yZGVyID0gbG9hZGVkQ29uZmlnLmNvbHVtbk9yZGVyOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNvbHVtbk9yZGVySnNvbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX2NvbHVtbk9yZGVyXyR7Z3JpZC5pZH1gKTtcbiAgICAgIGlmIChjb2x1bW5PcmRlckpzb24pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb2x1bW5PcmRlciA9IEpTT04ucGFyc2UoY29sdW1uT3JkZXJKc29uKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgY29sdW1uT3JkZXIgZnJvbSBsb2NhbFN0b3JhZ2UnLCBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICB2aXNpYmxlQ29sdW1uczogZ2V0VmlzaWJsZUNvbHVtbnMoY29scywgaGlkZGVuQ29sdW1ucywgY29sdW1uT3JkZXIpLFxuICAgICAgZmlsdGVyaW5nRGF0YToge1xuICAgICAgICBpc0ZpbHRlcmluZyxcbiAgICAgIH0sXG4gICAgfTtcbiAgICBpZiAobG9hZGVkQ29uZmlnLmNvbHVtbldpZHRocykge1xuICAgICAgY29uZmlnLmNvbHVtbldpZHRocyA9IGxvYWRlZENvbmZpZy5jb2x1bW5XaWR0aHM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNvbHVtbldpZHRocyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX2NvbHVtbldpZHRoc18ke2dyaWQuaWR9YCk7XG4gICAgICBpZiAoY29sdW1uV2lkdGhzICYmICFncmlkLmRpc2FibGVSZW1lbWJlckNvbHVtbldpZHRocykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbmZpZy5jb2x1bW5XaWR0aHMgPSBKU09OLnBhcnNlKGNvbHVtbldpZHRocyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIGNvbHVtbldpZHRocyBmcm9tIGxvY2FsU3RvcmFnZScsIGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzb3J0aW5nRGF0YSAmJiAhZ3JpZC5kaXNhYmxlUmVtZW1iZXJTb3J0RGF0YSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uZmlnLnNvcnRpbmdEYXRhID0gSlNPTi5wYXJzZShzb3J0aW5nRGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIHNvcnRpbmdEYXRhIGZyb20gc2Vzc2lvblN0b3JhZ2UnLCBlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGZpbHRlckRhdGEgJiYgaXNGaWx0ZXJpbmcgJiYgIWdyaWQuZGlzYWJsZVJlbWVtYmVyRmlsdGVyRGF0YSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uZmlnLmZpbHRlcmluZ0RhdGEuZmlsdGVyRGF0YSA9IEpTT04ucGFyc2UoZmlsdGVyRGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIGZpbHRlckRhdGEgZnJvbSBzZXNzaW9uU3RvcmFnZScsIGUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocGFnZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uZmlnLnBhZ2UgPSBKU09OLnBhcnNlKHBhZ2UpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhZ3JpZDogZXJyb3IgcGFyc2luZyBwYWdpbmF0aW9uIGZyb20gc2Vzc2lvblN0b3JhZ2UnLCBlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHJvd3NPblBhZ2UpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbmZpZy5yb3dzT25QYWdlID0gSlNPTi5wYXJzZShyb3dzT25QYWdlKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgcGFnaW5hdGlvbiBmcm9tIHNlc3Npb25TdG9yYWdlJywgZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuc29ydGluZ0RhdGEgJiYgZ3JpZC5kZWZhdWx0U29ydENvbHVtbikge1xuICAgICAgY29uZmlnLnNvcnRpbmdEYXRhID0ge1xuICAgICAgICBzb3J0Q29sdW1uOiBncmlkLmRlZmF1bHRTb3J0Q29sdW1uLFxuICAgICAgICBzb3J0T3JkZXI6IGdyaWQuZGVmYXVsdFNvcnRPcmRlciB8fCAnYXNjJyxcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBjb25maWc7XG4gIH0sXG4gIHNhdmVTZWxlY3RlZEl0ZW1zOiAoZ3JpZCwgc2VsZWN0ZWRJdGVtcykgPT4ge1xuICAgIGlmIChncmlkLmRpc2FibGVSZW1lbWJlclNlbGVjdGVkSXRlbXMpIHJldHVybiBmYWxzZTtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX3NlbGVjdGVkSXRlbXNfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KHNlbGVjdGVkSXRlbXMgfHwgW10pKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgc2F2ZUNvbHVtbldpZHRoczogKGdyaWQsIGNvbHVtbldpZHRocykgPT4ge1xuICAgIGlmIChncmlkLmRpc2FibGVSZW1lbWJlckNvbHVtbldpZHRocykgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghY29sdW1uV2lkdGhzKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGdyaWQuY29uZmlnU3RvcmFnZSAmJiBpc0Z1bmN0aW9uKGdyaWQuY29uZmlnU3RvcmFnZS5zYXZlKSkge1xuICAgICAgZ3JpZC5jb25maWdTdG9yYWdlLnNhdmUoeyBjb2x1bW5XaWR0aHMgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX2NvbHVtbldpZHRoc18ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoY29sdW1uV2lkdGhzKSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBzYXZlQ29sdW1uU2V0dGluZ3M6IChncmlkLCBoaWRkZW5Db2x1bW5zLCBjb2x1bW5PcmRlcikgPT4ge1xuICAgIGlmICghaGlkZGVuQ29sdW1ucyB8fCAhY29sdW1uT3JkZXIpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoZ3JpZC5jb25maWdTdG9yYWdlICYmIGlzRnVuY3Rpb24oZ3JpZC5jb25maWdTdG9yYWdlLnNhdmUpKSB7XG4gICAgICBncmlkLmNvbmZpZ1N0b3JhZ2Uuc2F2ZSh7IGhpZGRlbkNvbHVtbnMsIGNvbHVtbk9yZGVyIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9oaWRkZW5Db2x1bW5zXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShoaWRkZW5Db2x1bW5zKSk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9jb2x1bW5PcmRlcl8ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoY29sdW1uT3JkZXIpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIHNhdmVTb3J0RGF0YTogKGdyaWQsIHNvcnRpbmdEYXRhKSA9PiB7XG4gICAgaWYgKGdyaWQuZGlzYWJsZVJlbWVtYmVyU29ydERhdGEpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIXNvcnRpbmdEYXRhKSByZXR1cm4gZmFsc2U7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9zb3J0aW5nXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShzb3J0aW5nRGF0YSkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBzYXZlRmlsdGVyRGF0YTogKGdyaWQsIGZpbHRlckRhdGEpID0+IHtcbiAgICBpZiAoZ3JpZC5kaXNhYmxlUmVtZW1iZXJGaWx0ZXJEYXRhKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFmaWx0ZXJEYXRhKSByZXR1cm4gZmFsc2U7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9maWx0ZXJpbmdfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KGZpbHRlckRhdGEpKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgc2F2ZUlzRmlsdGVyaW5nOiAoZ3JpZCwgaXNGaWx0ZXJpbmcpID0+IHtcbiAgICBpZiAoZ3JpZC5kaXNhYmxlUmVtZW1iZXJJc0ZpbHRlcmluZykgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChpc0ZpbHRlcmluZyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZmFsc2U7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYG9jX2dyaWRfaXNGaWx0ZXJpbmdfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KGlzRmlsdGVyaW5nKSk7XG4gICAgaWYgKCFpc0ZpbHRlcmluZykge1xuICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShgb2NfZ3JpZF9maWx0ZXJpbmdfJHtncmlkLmlkfWApO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgc2F2ZVBhZ2U6IChncmlkLCBwYWdlKSA9PiB7XG4gICAgaWYgKCFwYWdlKSByZXR1cm4gZmFsc2U7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9wYWdlXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShwYWdlKSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIHNhdmVSb3dzT25QYWdlOiAoZ3JpZCwgcm93c09uUGFnZSkgPT4ge1xuICAgIGlmICghcm93c09uUGFnZSkgcmV0dXJuIGZhbHNlO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oYG9jX2dyaWRfcm93c09uUGFnZV8ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkocm93c09uUGFnZSkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICAvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG4gIGNoZWNrR3JpZFBhcmFtOiAoZ3JpZFBhcmFtKSA9PiB7XG4gICAgaWYgKGdyaWRQYXJhbSkge1xuICAgICAgaWYgKCFncmlkUGFyYW0uaWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdbR3JpZF0gSW52YWxpZCBgZ3JpZC5pZGAgcGFyYW1ldGVyLCB1cGRhdGUgYWN0aW9uIHBhcmFtZXRlcnMgdG8gbmV3IGZvcm1hdCEnLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKCFncmlkUGFyYW0uaWRLZXlQYXRoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnW0dyaWRdIEludmFsaWQgYGdyaWQuaWRLZXlQYXRoYCBwYXJhbWV0ZXIsIHVwZGF0ZSBhY3Rpb24gcGFyYW1ldGVycyB0byBuZXcgZm9ybWF0IScsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignW0dyaWRdIEludmFsaWQgYGdyaWRgIHBhcmFtZXRlciwgdXBkYXRlIGFjdGlvbiBwYXJhbWV0ZXJzIHRvIG5ldyBmb3JtYXQhJyk7XG4gICAgfVxuICB9LFxuICBjaGVja0NvbHVtbnNQYXJhbTogKGNvbHVtbnNQYXJhbSkgPT4ge1xuICAgIGlmICghY29sdW1uc1BhcmFtKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdbR3JpZF0gSW52YWxpZCBgY29sdW1uc2AgcGFyYW1ldGVyLCB1cGRhdGUgYWN0aW9uIHBhcmFtZXRlcnMgdG8gbmV3IGZvcm1hdCEnLFxuICAgICAgKTtcbiAgICB9XG4gIH0sXG4gIC8vIExvY2FsZSBnZXR0ZXJzLCBzdXBwb3J0IGdyaWQgcGFyYW0gb3IgdXNlciBzdGF0ZSB1c2VkIGluIE9DIGFwcGxpY2F0aW9uc1xuICBnZXRMYW5ndWFnZTogKGdyaWQsIG9jVXNlclN0YXRlKSA9PiB7XG4gICAgaWYgKGdyaWQubGFuZ3VhZ2UgJiYgdHlwZW9mIGdyaWQubGFuZ3VhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZ3JpZC5sYW5ndWFnZTtcbiAgICB9XG4gICAgaWYgKG9jVXNlclN0YXRlKSB7XG4gICAgICByZXR1cm4gb2NVc2VyU3RhdGUuZ2V0SW4oWyd1c2VyJywgJ2xhbmd1YWdlJ10sICdlbicpO1xuICAgIH1cbiAgICByZXR1cm4gJ2VuJztcbiAgfSxcbiAgZ2V0UmVnaW9uOiAoZ3JpZCwgb2NVc2VyU3RhdGUpID0+IHtcbiAgICBjb25zdCBkZWZhdWx0UmVnaW9uID0gJ2VuX0dCJztcbiAgICBpZiAoZ3JpZC5yZWdpb24gJiYgdHlwZW9mIGdyaWQucmVnaW9uID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGdyaWQucmVnaW9uO1xuICAgIH1cbiAgICBpZiAob2NVc2VyU3RhdGUpIHtcbiAgICAgIHJldHVybiBvY1VzZXJTdGF0ZS5nZXRJbihbJ3VzZXInLCAncmVnaW9uJ10sIGRlZmF1bHRSZWdpb24pO1xuICAgIH1cbiAgICByZXR1cm4gZGVmYXVsdFJlZ2lvbjtcbiAgfSxcbiAgZ2V0RGF0ZUZvcm1hdDogKGdyaWQsIG9jVXNlclN0YXRlKSA9PiB7XG4gICAgaWYgKGdyaWQuZGF0ZUZvcm1hdCAmJiB0eXBlb2YgZ3JpZC5kYXRlRm9ybWF0ID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGdyaWQuZGF0ZUZvcm1hdC50b1VwcGVyQ2FzZSgpO1xuICAgIH1cbiAgICBpZiAob2NVc2VyU3RhdGUpIHtcbiAgICAgIHJldHVybiBvY1VzZXJTdGF0ZS5nZXRJbihbJ2xvY2FsZUZvcm1hdCcsICdkYXRlRm9ybWF0J10sICdMJyk7XG4gICAgfVxuICAgIHJldHVybiAnTCc7XG4gIH0sXG4gIGdldFRob3VzYW5kU2VwYXJhdG9yOiAoZ3JpZCwgb2NVc2VyU3RhdGUpID0+IHtcbiAgICBpZiAoZ3JpZC50aG91c2FuZFNlcGFyYXRvciAmJiB0eXBlb2YgZ3JpZC5sYW5ndWFnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBncmlkLnRob3VzYW5kU2VwYXJhdG9yO1xuICAgIH1cbiAgICBpZiAob2NVc2VyU3RhdGUpIHtcbiAgICAgIHJldHVybiBvY1VzZXJTdGF0ZS5nZXRJbihbJ2xvY2FsZUZvcm1hdCcsICd0aG91c2FuZFNlcGFyYXRvciddKSB8fCAnICc7XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfSxcbiAgZ2V0RGVjaW1hbFNlcGFyYXRvcjogKGdyaWQsIG9jVXNlclN0YXRlKSA9PiB7XG4gICAgaWYgKGdyaWQuZGVjaW1hbFNlcGFyYXRvciAmJiB0eXBlb2YgZ3JpZC5sYW5ndWFnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBncmlkLmRlY2ltYWxTZXBhcmF0b3I7XG4gICAgfVxuICAgIGlmIChvY1VzZXJTdGF0ZSkge1xuICAgICAgcmV0dXJuIG9jVXNlclN0YXRlLmdldEluKFsnbG9jYWxlRm9ybWF0JywgJ2RlY2ltYWxTZXBhcmF0b3InXSwgJy4nKTtcbiAgICB9XG4gICAgcmV0dXJuICcuJztcbiAgfSxcbiAgbm9ybWFsaXplRmlsdGVyaW5nRGF0YTogKGZpbHRlcmluZ0RhdGEpID0+IHtcbiAgICBsZXQgbmV3RmlsdGVyaW5nRGF0YSA9IE1hcCh7IGlzRmlsdGVyaW5nOiBmYWxzZSB9KTtcbiAgICBpZiAoIWZpbHRlcmluZ0RhdGEpIHJldHVybiBuZXdGaWx0ZXJpbmdEYXRhO1xuXG4gICAgY29uc3Qgb2xkRmlsdGVyaW5nRGF0YSA9IE1hcC5pc01hcChmaWx0ZXJpbmdEYXRhKSA/IGZpbHRlcmluZ0RhdGEgOiBmcm9tSlMoZmlsdGVyaW5nRGF0YSk7XG4gICAgY29uc3QgaXNGaWx0ZXJpbmcgPSBvbGRGaWx0ZXJpbmdEYXRhLmdldCgnaXNGaWx0ZXJpbmcnLCBmYWxzZSk7XG4gICAgY29uc3QgZmlsdGVyRGF0YSA9IG9sZEZpbHRlcmluZ0RhdGEuZ2V0KCdmaWx0ZXJEYXRhJywgbnVsbCk7XG5cbiAgICBpZiAoaXNGaWx0ZXJpbmcgJiYgZmlsdGVyRGF0YSAmJiBNYXAuaXNNYXAoZmlsdGVyRGF0YSkpIHtcbiAgICAgIG5ld0ZpbHRlcmluZ0RhdGEgPSBuZXdGaWx0ZXJpbmdEYXRhLnNldCgnaXNGaWx0ZXJpbmcnLCB0cnVlKS5zZXQoJ2ZpbHRlckRhdGEnLCBmaWx0ZXJEYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3RmlsdGVyaW5nRGF0YTtcbiAgfSxcbiAgLypcbiAgICogQGZ1bmN0aW9uIHZpc2libGVDb2x1bW5zXG4gICAqIEBkZXNjICBSZXR1cm5zIGVpdGhlciB2aXNpYmxlIGNvbHVtbnMgKGlmIHNvbWUgY29sdW1ucyBhcmUgaGlkZGVuIClcbiAgICogICAgICAgIG9yIGdyaWQgZGVmYXVsdCBjb2x1bW5zLlxuICAgKiBAcGFyYW0gb3JpZ0NvbHVtbnMgQXJyYXkgb2YgR3JpZCBvcmlnaW5hbCBjb2x1bW5zIG9iamVjdHNcbiAgICogQHBhcmFtIHZpc2libGVDb2x1bW5zIEFycmF5IG9mIEdyaWQgdmlzaWJsZSBjb2x1bW5zIHZhbHVlS2V5UGF0aHNcbiAgICogQHJldHVybnMgQXJyYXkgb2YgY29sdW1uIG9iamVjdHMgY3VycmVudGx5IHZpc2libGUgZm9yIHVzZXIuXG4gICAqL1xuICB2aXNpYmxlQ29sdW1uczogKG9yaWdDb2x1bW5zLCB2aXNpYmxlQ29sdW1ucykgPT4ge1xuICAgIGlmICghdmlzaWJsZUNvbHVtbnMpIHJldHVybiBvcmlnQ29sdW1ucztcbiAgICBjb25zdCBmaWx0ZXJlZCA9IHZpc2libGVDb2x1bW5zLm1hcChcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIHNlYXJjaENvbCA9PiBvcmlnQ29sdW1ucy5maW5kKFxuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgLy8gdmFsdWVLZXlQYXRoIGlzIGpvaW5lZCBoZXJlIGFzIGl0IGNhbiBiZSBhbiBhcnJheSBsaWtlIFsna2V5MScsICdrZXkyJ10uXG4gICAgICAgIC8vIHNlYXJjaENvbCBpcyBzaW1pbGFybHkgam9pbmVkIGluIG9uQ2VsbEtleURvd24gaW4gZGF0YWdyaWQuY29tcG9uZW50LmpzeFxuICAgICAgICBjb2wgPT4gSlNPTi5zdHJpbmdpZnkoY29sLnZhbHVlS2V5UGF0aC5qb2luKCcvJykpID09PSBKU09OLnN0cmluZ2lmeShzZWFyY2hDb2wpLFxuICAgICAgKSxcbiAgICApO1xuICAgIHJldHVybiBmaWx0ZXJlZC50b0pTKCk7XG4gIH0sXG59O1xuIl19