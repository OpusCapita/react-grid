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
    }; // Select component values can be matched exactly


    if (col.componentType === 'select') {
      return function (row, filterVal) {
        return filterVal === getVal(row);
      };
    }

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
        return function (row, filterVal) {
          return !!filterVal === !!getVal(row);
        };

      case 'text':
      default:
        return function (row, filterVal) {
          // Ensure value is trimmed string
          var trimmedVal = filterVal.trim ? filterVal.trim() : String(filterVal); // handle special characters by escaping them

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC51dGlscy5qcyJdLCJuYW1lcyI6WyJnZXRDb2x1bW5LZXkiLCJjb2wiLCJjb2x1bW5LZXkiLCJ2YWx1ZUtleVBhdGgiLCJqb2luIiwiZ2V0VmlzaWJsZUNvbHVtbnMiLCJjb2xzIiwiaGlkZGVuQ29sdW1ucyIsImNvbHVtbk9yZGVyIiwib3JkZXJlZENvbHVtbkxpc3QiLCJmb3JFYWNoIiwiaSIsImNvbE9yZGVySWR4IiwiaW5kZXhPZiIsImRlZmF1bHRIaWRkZW4iLCJpc0hpZGRlbiIsIm9yZGVyIiwicHVzaCIsInNvcnQiLCJhIiwiYiIsIm1hcCIsIml0ZW0iLCJnZXRDb2x1bW5EZWZhdWx0VmFsdWVzIiwiY29sdW1uRGVmYXVsdFZhbHVlcyIsImRlZmF1bHRWYWx1ZSIsInVuZGVmaW5lZCIsImdldENlbGxTdHlsZUJ5Q29sIiwiYWxpZ24iLCJ0ZXh0QWxpZ24iLCJjb21wb25lbnRUeXBlIiwidmFsdWVUeXBlIiwiaXNTb3J0YWJsZSIsInNvcnRWYWx1ZUdldHRlciIsImRpc2FibGVTb3J0aW5nIiwiZ2V0U29ydENvbXBhcmF0b3IiLCJzb3J0Q29tcGFyYXRvciIsImxvY2FsZUNvbXBhcmUiLCJEYXRlIiwiZ2V0U29ydFZhbHVlR2V0dGVyIiwiZGF0YSIsImNlbGxEYXRhIiwiZ2V0SW4iLCJzZWxlY3RDb21wb25lbnRPcHRpb25zIiwiTGlzdCIsImlzTGlzdCIsIkFycmF5IiwiaXNBcnJheSIsImxhYmVscyIsImQiLCJmb3VuZCIsImZpbmQiLCJvIiwidmFsdWUiLCJsYWJlbCIsImdldFZhbHVlRW1wdHlDaGVja2VyIiwidmFsdWVFbXB0eUNoZWNrZXIiLCJ2YWwiLCJsZW5ndGgiLCJzaXplIiwiZ2V0RmlsdGVyTWF0Y2hlciIsImRhdGVGb3JtYXQiLCJmaWx0ZXJNYXRjaGVyIiwiZ2V0VmFsIiwicm93IiwiZmlsdGVyVmFsIiwiZmlsdGVycyIsInRvSlMiLCJzb21lIiwiZmlsdGVyIiwiZmluZEluZGV4IiwidiIsImZpbHRlclZhbEludCIsInBhcnNlSW50IiwidmFsSW50IiwiU3RyaW5nIiwiaW5jbHVkZXMiLCJmaWx0ZXJWYWxGbG9hdCIsInBhcnNlRmxvYXQiLCJyZXBsYWNlIiwiaXNWYWxpZCIsImZvcm1hdCIsInRyaW1tZWRWYWwiLCJ0cmltIiwiZXNjYXBlZFZhbCIsIlJlZ0V4cCIsInRlc3QiLCJsb2FkU2VsZWN0ZWRJdGVtcyIsImdyaWQiLCJzZXNzaW9uSXRlbSIsInNlc3Npb25TdG9yYWdlIiwiZ2V0SXRlbSIsImlkIiwiZGlzYWJsZVJlbWVtYmVyU2VsZWN0ZWRJdGVtcyIsIkpTT04iLCJwYXJzZSIsImUiLCJjb25zb2xlIiwiZXJyb3IiLCJsb2FkR3JpZENvbmZpZyIsImNvbmZpZ1N0b3JhZ2UiLCJzb3J0aW5nRGF0YSIsImZpbHRlckRhdGEiLCJpc0ZpbHRlcmluZ0RhdGEiLCJsb2NhbFN0b3JhZ2UiLCJwYWdlIiwicm93c09uUGFnZSIsImxvYWRlZENvbmZpZyIsImlzRmlsdGVyaW5nIiwibG9hZCIsImRpc2FibGVSZW1lbWJlcklzRmlsdGVyaW5nIiwiZGVmYXVsdFNob3dGaWx0ZXJpbmdSb3ciLCJoaWRkZW5Db2x1bW5zSnNvbiIsImNvbHVtbk9yZGVySnNvbiIsImNvbmZpZyIsInZpc2libGVDb2x1bW5zIiwiZmlsdGVyaW5nRGF0YSIsImNvbHVtbldpZHRocyIsImRpc2FibGVSZW1lbWJlckNvbHVtbldpZHRocyIsImRpc2FibGVSZW1lbWJlclNvcnREYXRhIiwiZGlzYWJsZVJlbWVtYmVyRmlsdGVyRGF0YSIsImRlZmF1bHRTb3J0Q29sdW1uIiwic29ydENvbHVtbiIsInNvcnRPcmRlciIsImRlZmF1bHRTb3J0T3JkZXIiLCJzYXZlU2VsZWN0ZWRJdGVtcyIsInNlbGVjdGVkSXRlbXMiLCJzZXRJdGVtIiwic3RyaW5naWZ5Iiwic2F2ZUNvbHVtbldpZHRocyIsInNhdmUiLCJzYXZlQ29sdW1uU2V0dGluZ3MiLCJzYXZlU29ydERhdGEiLCJzYXZlRmlsdGVyRGF0YSIsInNhdmVJc0ZpbHRlcmluZyIsInJlbW92ZUl0ZW0iLCJzYXZlUGFnZSIsInNhdmVSb3dzT25QYWdlIiwiY2hlY2tHcmlkUGFyYW0iLCJncmlkUGFyYW0iLCJFcnJvciIsImlkS2V5UGF0aCIsImNoZWNrQ29sdW1uc1BhcmFtIiwiY29sdW1uc1BhcmFtIiwiZ2V0TGFuZ3VhZ2UiLCJvY1VzZXJTdGF0ZSIsImxhbmd1YWdlIiwiZ2V0UmVnaW9uIiwiZGVmYXVsdFJlZ2lvbiIsInJlZ2lvbiIsImdldERhdGVGb3JtYXQiLCJ0b1VwcGVyQ2FzZSIsImdldFRob3VzYW5kU2VwYXJhdG9yIiwidGhvdXNhbmRTZXBhcmF0b3IiLCJnZXREZWNpbWFsU2VwYXJhdG9yIiwiZGVjaW1hbFNlcGFyYXRvciIsIm5vcm1hbGl6ZUZpbHRlcmluZ0RhdGEiLCJuZXdGaWx0ZXJpbmdEYXRhIiwib2xkRmlsdGVyaW5nRGF0YSIsIk1hcCIsImlzTWFwIiwiZ2V0Iiwic2V0Iiwib3JpZ0NvbHVtbnMiLCJmaWx0ZXJlZCIsInNlYXJjaENvbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUxBO0FBT0EsSUFBTUEsWUFBWSxHQUFHLFNBQWZBLFlBQWUsQ0FBQUMsR0FBRztBQUFBLFNBQUlBLEdBQUcsQ0FBQ0MsU0FBSixJQUFpQkQsR0FBRyxDQUFDRSxZQUFKLENBQWlCQyxJQUFqQixDQUFzQixHQUF0QixDQUFyQjtBQUFBLENBQXhCOztBQUVBLElBQU1DLGlCQUFpQixHQUFHLFNBQXBCQSxpQkFBb0IsQ0FBQ0MsSUFBRCxFQUFPQyxhQUFQLEVBQTJCQyxXQUEzQixFQUFnRDtBQUFBLE1BQXpDRCxhQUF5QztBQUF6Q0EsSUFBQUEsYUFBeUMsR0FBekIsRUFBeUI7QUFBQTs7QUFBQSxNQUFyQkMsV0FBcUI7QUFBckJBLElBQUFBLFdBQXFCLEdBQVAsRUFBTztBQUFBOztBQUN4RSxNQUFNQyxpQkFBaUIsR0FBRyxFQUExQjtBQUNBSCxFQUFBQSxJQUFJLENBQUNJLE9BQUwsQ0FBYSxVQUFD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cUMsU0FBZixDQUFuRDtBQUFBLE9BSlEsQ0FBSjtBQUFBLEtBRk0sQ0FBakI7O0FBU0EsV0FBT0QsUUFBUSxDQUFDakcsSUFBVCxFQUFQO0FBQ0Q7QUEzY1ksQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLW5lc3RlZC10ZXJuYXJ5ICovXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgaXNOYU4gZnJvbSAnbG9kYXNoL2lzTmFOJztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICd1dGlsJztcbmltcG9ydCB7IE1hcCwgZnJvbUpTLCBMaXN0IH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCB7IGVzY2FwZVNwZWNpYWxDaGFyYWN0ZXJzIH0gZnJvbSAnQG9wdXNjYXBpdGEvZm9ybWF0LXV0aWxzJztcblxuY29uc3QgZ2V0Q29sdW1uS2V5ID0gY29sID0+IGNvbC5jb2x1bW5LZXkgfHwgY29sLnZhbHVlS2V5UGF0aC5qb2luKCcvJyk7XG5cbmNvbnN0IGdldFZpc2libGVDb2x1bW5zID0gKGNvbHMsIGhpZGRlbkNvbHVtbnMgPSBbXSwgY29sdW1uT3JkZXIgPSBbXSkgPT4ge1xuICBjb25zdCBvcmRlcmVkQ29sdW1uTGlzdCA9IFtdO1xuICBjb2xzLmZvckVhY2goKGNvbCwgaSkgPT4ge1xuICAgIGNvbnN0IGNvbHVtbktleSA9IGdldENvbHVtbktleShjb2wpO1xuICAgIGNvbnN0IGNvbE9yZGVySWR4ID0gY29sdW1uT3JkZXIuaW5kZXhPZihjb2x1bW5LZXkpO1xuICAgIGNvbnN0IGRlZmF1bHRIaWRkZW4gPSBjb2wuaXNIaWRkZW4gJiYgY29sT3JkZXJJZHggPT09IC0xO1xuICAgIGlmIChkZWZhdWx0SGlkZGVuIHx8IGhpZGRlbkNvbHVtbnMuaW5kZXhPZihjb2x1bW5LZXkpID4gLTEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgb3JkZXIgPSBjb2xPcmRlcklkeCAhPT0gLTEgPyBjb2xPcmRlcklkeCA6IGkgKyAxO1xuICAgIG9yZGVyZWRDb2x1bW5MaXN0LnB1c2goe1xuICAgICAgY29sdW1uS2V5LFxuICAgICAgb3JkZXIsXG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gb3JkZXJlZENvbHVtbkxpc3Quc29ydCgoYSwgYikgPT4gYS5vcmRlciAtIGIub3JkZXIpLm1hcChpdGVtID0+IGl0ZW0uY29sdW1uS2V5KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZ2V0Q29sdW1uS2V5LFxuICBnZXRDb2x1bW5EZWZhdWx0VmFsdWVzOiAoY29scykgPT4ge1xuICAgIGNvbnN0IGNvbHVtbkRlZmF1bHRWYWx1ZXMgPSB7fTtcbiAgICBjb2xzLmZvckVhY2goKGNvbCkgPT4ge1xuICAgICAgaWYgKGNvbC5kZWZhdWx0VmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb2x1bW5EZWZhdWx0VmFsdWVzW2dldENvbHVtbktleShjb2wpXSA9IGNvbC5kZWZhdWx0VmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGNvbHVtbkRlZmF1bHRWYWx1ZXM7XG4gIH0sXG4gIGdldENlbGxTdHlsZUJ5Q29sOiAoY29sKSA9PiB7XG4gICAgaWYgKGNvbC5hbGlnbikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGV4dEFsaWduOiBjb2wuYWxpZ24sXG4gICAgICB9O1xuICAgIH1cbiAgICAvLyBObyBkZWZhdWx0IGFsaWduIGlmIGNvbXBvbmVudCBpcyBzZWxlY3RcbiAgICAvLyBCZWNhdXNlIHJlbmRlcmVkIGRhdGEgaXMgbW9zdCBsaWtlbHkgdGV4dFxuICAgIC8vIEV2ZW4gaWYgdmFsdWVUeXBlIGlzIG51bWJlclxuICAgIGlmIChjb2wuY29tcG9uZW50VHlwZSA9PT0gJ3NlbGVjdCcgfHwgY29sLmNvbXBvbmVudFR5cGUgPT09ICdtdWx0aXNlbGVjdCcpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgc3dpdGNoIChjb2wudmFsdWVUeXBlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdGV4dEFsaWduOiAncmlnaHQnLFxuICAgICAgICB9O1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgfSxcbiAgaXNTb3J0YWJsZTogY29sID0+IGNvbC52YWx1ZVR5cGVcbiAgICAmJiAoY29sLnNvcnRWYWx1ZUdldHRlciB8fCBjb2wudmFsdWVLZXlQYXRoKVxuICAgICYmICFjb2wuZGlzYWJsZVNvcnRpbmcsXG4gIGdldFNvcnRDb21wYXJhdG9yOiAoY29sKSA9PiB7XG4gICAgaWYgKGNvbC5zb3J0Q29tcGFyYXRvcikge1xuICAgICAgcmV0dXJuIGNvbC5zb3J0Q29tcGFyYXRvcjtcbiAgICB9XG4gICAgc3dpdGNoIChjb2wudmFsdWVUeXBlKSB7XG4gICAgICBjYXNlICd0ZXh0JzpcbiAgICAgICAgcmV0dXJuIChhLCBiKSA9PiAoYS5sb2NhbGVDb21wYXJlID8gYS5sb2NhbGVDb21wYXJlKGIpIDogMSk7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgICByZXR1cm4gKGEsIGIpID0+IGEgLSBiO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIHJldHVybiAoYSwgYikgPT4gKGEgPT09IGIgPyAwIDogYSA/IC0xIDogMSk7XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgcmV0dXJuIChhLCBiKSA9PiBuZXcgRGF0ZShhKSAtIG5ldyBEYXRlKGIpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIChhLCBiKSA9PiAoYS5sb2NhbGVDb21wYXJlID8gYS5sb2NhbGVDb21wYXJlKGIpIDogMSk7XG4gICAgfVxuICB9LFxuICBnZXRTb3J0VmFsdWVHZXR0ZXI6IChjb2wpID0+IHtcbiAgICBpZiAoY29sLnNvcnRWYWx1ZUdldHRlcikge1xuICAgICAgcmV0dXJuIGNvbC5zb3J0VmFsdWVHZXR0ZXI7XG4gICAgfVxuICAgIHJldHVybiAoZGF0YSkgPT4ge1xuICAgICAgY29uc3QgY2VsbERhdGEgPSBkYXRhLmdldEluKGNvbC52YWx1ZUtleVBhdGgpO1xuICAgICAgLy8gRGVhbCB3aXRoIHNlbGVjdCBhbmQgbXVsdGlzZWxlY3QgY29tcG9uZW50VHlwZXNcbiAgICAgIGlmIChjb2wuc2VsZWN0Q29tcG9uZW50T3B0aW9ucykge1xuICAgICAgICBpZiAoTGlzdC5pc0xpc3QoY2VsbERhdGEpIHx8IEFycmF5LmlzQXJyYXkoY2VsbERhdGEpKSB7XG4gICAgICAgICAgY29uc3QgbGFiZWxzID0gW107XG4gICAgICAgICAgY2VsbERhdGEuZm9yRWFjaCgoZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZm91bmQgPSBjb2wuc2VsZWN0Q29tcG9uZW50T3B0aW9ucy5maW5kKG8gPT4gby52YWx1ZSA9PT0gZCk7XG4gICAgICAgICAgICBpZiAoZm91bmQpIGxhYmVscy5wdXNoKGZvdW5kLmxhYmVsKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gbGFiZWxzLmpvaW4oJyAnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmb3VuZCA9IGNvbC5zZWxlY3RDb21wb25lbnRPcHRpb25zLmZpbmQobyA9PiBvLnZhbHVlID09PSBjZWxsRGF0YSk7XG4gICAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kLmxhYmVsO1xuICAgICAgfVxuICAgICAgaWYgKGNlbGxEYXRhICYmIGNlbGxEYXRhLmpvaW4pIHJldHVybiBjZWxsRGF0YS5qb2luKCcgJyk7XG4gICAgICByZXR1cm4gY2VsbERhdGE7XG4gICAgfTtcbiAgfSxcbiAgZ2V0VmFsdWVFbXB0eUNoZWNrZXI6IChjb2wpID0+IHtcbiAgICBpZiAoY29sLnZhbHVlRW1wdHlDaGVja2VyKSB7XG4gICAgICByZXR1cm4gY29sLnZhbHVlRW1wdHlDaGVja2VyO1xuICAgIH1cbiAgICBpZiAoY29sLmNvbXBvbmVudFR5cGUgPT09ICdtdWx0aXNlbGVjdCcpIHtcbiAgICAgIHJldHVybiB2YWwgPT4gdmFsID09PSAnJyB8fCB2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQgfHwgdmFsLmxlbmd0aCA9PT0gMCB8fCB2YWwuc2l6ZSA9PT0gMDsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIH1cblxuICAgIHN3aXRjaCAoY29sLnZhbHVlVHlwZSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgICAgcmV0dXJuIHZhbCA9PiB2YWwgPT09ICcnIHx8IGlzTmFOKHZhbCkgfHwgdmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkO1xuICAgICAgY2FzZSAndGV4dCc6XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgY2FzZSAnc2VsZWN0JzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB2YWwgPT4gdmFsID09PSAnJyB8fCB2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQ7XG4gICAgfVxuICB9LFxuICBnZXRGaWx0ZXJNYXRjaGVyOiAoY29sLCBkYXRlRm9ybWF0KSA9PiB7XG4gICAgaWYgKGNvbC5maWx0ZXJNYXRjaGVyKSByZXR1cm4gY29sLmZpbHRlck1hdGNoZXI7XG4gICAgY29uc3QgZ2V0VmFsID0gcm93ID0+IHJvdy5nZXRJbihjb2wudmFsdWVLZXlQYXRoKTtcblxuICAgIC8vIFNlbGVjdCBjb21wb25lbnQgdmFsdWVzIGNhbiBiZSBtYXRjaGVkIGV4YWN0bHlcbiAgICBpZiAoY29sLmNvbXBvbmVudFR5cGUgPT09ICdzZWxlY3QnKSB7XG4gICAgICByZXR1cm4gKHJvdywgZmlsdGVyVmFsKSA9PiBmaWx0ZXJWYWwgPT09IGdldFZhbChyb3cpO1xuICAgIH1cbiAgICBpZiAoY29sLmNvbXBvbmVudFR5cGUgPT09ICdtdWx0aXNlbGVjdCcpIHtcbiAgICAgIHJldHVybiAocm93LCBmaWx0ZXJWYWwpID0+IHtcbiAgICAgICAgLy8gdmFsdWUgY2FuIGJlIHNpbXBsZSB2YWx1ZSwgaW1tdXRhYmxlIExpc3Qgb3IgYXJyYXlcbiAgICAgICAgY29uc3QgdmFsdWUgPSBnZXRWYWwocm93KTtcbiAgICAgICAgLy8gc2Vzc2lvbiBzdG9yYWdlIGNvbnRlbnQgaXMgY29udmVydGVkIHRvIGltbXV0YWJsZSBhbmQgbXVsdGlzZWxlY3RcbiAgICAgICAgLy8gZmlsdGVycyBpcyB0aGVuIGxpc3Qgb3RoZXJ3aXNlIGFycmF5XG4gICAgICAgIGNvbnN0IGZpbHRlcnMgPSBmaWx0ZXJWYWwgJiYgZmlsdGVyVmFsLnRvSlMgPyBmaWx0ZXJWYWwudG9KUygpIDogZmlsdGVyVmFsO1xuICAgICAgICByZXR1cm4gZmlsdGVycy5zb21lKChmaWx0ZXIpID0+IHtcbiAgICAgICAgICBpZiAoTGlzdC5pc0xpc3QodmFsdWUpIHx8IEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUuZmluZEluZGV4KHYgPT4gdiA9PT0gZmlsdGVyLnZhbHVlKSAhPT0gLTE7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmaWx0ZXIudmFsdWUgPT09IHZhbHVlO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgc3dpdGNoIChjb2wudmFsdWVUeXBlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICByZXR1cm4gKHJvdywgZmlsdGVyVmFsKSA9PiB7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBnZXRWYWwocm93KTtcbiAgICAgICAgICBpZiAodmFsdWUgPT09ICcnIHx8IGlzTmFOKHZhbHVlKSB8fCB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIG1hdGNoIGV4YWN0IG51bWJlciB2YWx1ZVxuICAgICAgICAgIGNvbnN0IGZpbHRlclZhbEludCA9IHBhcnNlSW50KGZpbHRlclZhbCwgMTApO1xuICAgICAgICAgIGNvbnN0IHZhbEludCA9IHBhcnNlSW50KHZhbHVlLCAxMCk7XG4gICAgICAgICAgaWYgKGZpbHRlclZhbEludCA9PT0gdmFsSW50IHx8IGZpbHRlclZhbEludCA9PT0gdmFsSW50ICogLTEpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBtYXRjaCBwYXJ0aWFsXG4gICAgICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSkuaW5jbHVkZXMoZmlsdGVyVmFsKTtcbiAgICAgICAgfTtcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgICAgcmV0dXJuIChyb3csIGZpbHRlclZhbCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gZ2V0VmFsKHJvdyk7XG4gICAgICAgICAgaWYgKHZhbHVlID09PSAnJyB8fCBpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBtYXRjaCBleGFjdCBmbG9hdCB2YWx1ZVxuICAgICAgICAgIGNvbnN0IGZpbHRlclZhbEZsb2F0ID0gcGFyc2VGbG9hdChmaWx0ZXJWYWwucmVwbGFjZSgnLCcsICcuJykpO1xuICAgICAgICAgIGlmIChmaWx0ZXJWYWxGbG9hdCA9PT0gcGFyc2VGbG9hdCh2YWx1ZSkgfHwgZmlsdGVyVmFsRmxvYXQgPT09IHBhcnNlRmxvYXQodmFsdWUpICogLTEpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBtYXRjaCBwYXJ0aWFsXG4gICAgICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSkucmVwbGFjZSgnLCcsICcuJykuaW5jbHVkZXMoZmlsdGVyVmFsLnJlcGxhY2UoJywnLCAnLicpKTtcbiAgICAgICAgfTtcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICByZXR1cm4gKHJvdywgZmlsdGVyVmFsKSA9PiB7XG4gICAgICAgICAgaWYgKG1vbWVudChnZXRWYWwocm93KSkuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gbW9tZW50KGdldFZhbChyb3cpKS5mb3JtYXQoZGF0ZUZvcm1hdCkgPT09IG1vbWVudChmaWx0ZXJWYWwpLmZvcm1hdChkYXRlRm9ybWF0KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9O1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIHJldHVybiAocm93LCBmaWx0ZXJWYWwpID0+ICEhZmlsdGVyVmFsID09PSAhIWdldFZhbChyb3cpO1xuICAgICAgY2FzZSAndGV4dCc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gKHJvdywgZmlsdGVyVmFsKSA9PiB7XG4gICAgICAgICAgLy8gRW5zdXJlIHZhbHVlIGlzIHRyaW1tZWQgc3RyaW5nXG4gICAgICAgICAgY29uc3QgdHJpbW1lZFZhbCA9IGZpbHRlclZhbC50cmltID8gZmlsdGVyVmFsLnRyaW0oKSA6IFN0cmluZyhmaWx0ZXJWYWwpO1xuICAgICAgICAgIC8vIGhhbmRsZSBzcGVjaWFsIGNoYXJhY3RlcnMgYnkgZXNjYXBpbmcgdGhlbVxuICAgICAgICAgIGNvbnN0IGVzY2FwZWRWYWwgPSBlc2NhcGVTcGVjaWFsQ2hhcmFjdGVycyh0cmltbWVkVmFsKTtcbiAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cChlc2NhcGVkVmFsLCAnaScpLnRlc3QoZ2V0VmFsKHJvdykpO1xuICAgICAgICB9O1xuICAgIH1cbiAgfSxcbiAgbG9hZFNlbGVjdGVkSXRlbXM6IChncmlkKSA9PiB7XG4gICAgY29uc3Qgc2Vzc2lvbkl0ZW0gPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX3NlbGVjdGVkSXRlbXNfJHtncmlkLmlkfWApO1xuICAgIGlmIChzZXNzaW9uSXRlbSAmJiAhZ3JpZC5kaXNhYmxlUmVtZW1iZXJTZWxlY3RlZEl0ZW1zKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShzZXNzaW9uSXRlbSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIHNlbGVjdGVkSXRlbXMgZnJvbSBzZXNzaW9uU3RvcmFnZScsIGUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH0sXG4gIGxvYWRHcmlkQ29uZmlnOiAoZ3JpZCwgY29scykgPT4ge1xuICAgIGNvbnN0IGNvbmZpZ1N0b3JhZ2UgPSBncmlkLmNvbmZpZ1N0b3JhZ2UgfHwge307XG4gICAgY29uc3Qgc29ydGluZ0RhdGEgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX3NvcnRpbmdfJHtncmlkLmlkfWApO1xuICAgIGNvbnN0IGZpbHRlckRhdGEgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX2ZpbHRlcmluZ18ke2dyaWQuaWR9YCk7XG4gICAgY29uc3QgaXNGaWx0ZXJpbmdEYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfaXNGaWx0ZXJpbmdfJHtncmlkLmlkfWApO1xuICAgIGNvbnN0IHBhZ2UgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX3BhZ2VfJHtncmlkLmlkfWApO1xuICAgIGNvbnN0IHJvd3NPblBhZ2UgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX3Jvd3NPblBhZ2VfJHtncmlkLmlkfWApO1xuICAgIGxldCBsb2FkZWRDb25maWcgPSB7fTtcbiAgICBsZXQgaGlkZGVuQ29sdW1ucztcbiAgICBsZXQgY29sdW1uT3JkZXI7XG4gICAgbGV0IGlzRmlsdGVyaW5nID0gZmFsc2U7XG5cbiAgICBpZiAoaXNGdW5jdGlvbihjb25maWdTdG9yYWdlLmxvYWQpKSB7XG4gICAgICBsb2FkZWRDb25maWcgPSBjb25maWdTdG9yYWdlLmxvYWQoKTtcbiAgICB9XG5cbiAgICBpZiAoaXNGaWx0ZXJpbmdEYXRhKSB7XG4gICAgICBpZiAoIWdyaWQuZGlzYWJsZVJlbWVtYmVySXNGaWx0ZXJpbmcpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpc0ZpbHRlcmluZyA9IEpTT04ucGFyc2UoaXNGaWx0ZXJpbmdEYXRhKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgaXNGaWx0ZXJpbmdEYXRhIGZyb20gbG9jYWxTdG9yYWdlJywgZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGdyaWQuZGVmYXVsdFNob3dGaWx0ZXJpbmdSb3cpIHtcbiAgICAgIGlzRmlsdGVyaW5nID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGxvYWRlZENvbmZpZy5oaWRkZW5Db2x1bW5zKSB7XG4gICAgICBoaWRkZW5Db2x1bW5zID0gbG9hZGVkQ29uZmlnLmhpZGRlbkNvbHVtbnM7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaGlkZGVuQ29sdW1uc0pzb24gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgb2NfZ3JpZF9oaWRkZW5Db2x1bW5zXyR7Z3JpZC5pZH1gKTtcbiAgICAgIGlmIChoaWRkZW5Db2x1bW5zSnNvbikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGhpZGRlbkNvbHVtbnMgPSBKU09OLnBhcnNlKGhpZGRlbkNvbHVtbnNKc29uKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgaGlkZGVuQ29sdW1ucyBmcm9tIGxvY2FsU3RvcmFnZScsIGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChsb2FkZWRDb25maWcuY29sdW1uT3JkZXIpIHtcbiAgICAgIGNvbHVtbk9yZGVyID0gbG9hZGVkQ29uZmlnLmNvbHVtbk9yZGVyOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNvbHVtbk9yZGVySnNvbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX2NvbHVtbk9yZGVyXyR7Z3JpZC5pZH1gKTtcbiAgICAgIGlmIChjb2x1bW5PcmRlckpzb24pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb2x1bW5PcmRlciA9IEpTT04ucGFyc2UoY29sdW1uT3JkZXJKc29uKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgY29sdW1uT3JkZXIgZnJvbSBsb2NhbFN0b3JhZ2UnLCBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICB2aXNpYmxlQ29sdW1uczogZ2V0VmlzaWJsZUNvbHVtbnMoY29scywgaGlkZGVuQ29sdW1ucywgY29sdW1uT3JkZXIpLFxuICAgICAgZmlsdGVyaW5nRGF0YToge1xuICAgICAgICBpc0ZpbHRlcmluZyxcbiAgICAgIH0sXG4gICAgfTtcbiAgICBpZiAobG9hZGVkQ29uZmlnLmNvbHVtbldpZHRocykge1xuICAgICAgY29uZmlnLmNvbHVtbldpZHRocyA9IGxvYWRlZENvbmZpZy5jb2x1bW5XaWR0aHM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNvbHVtbldpZHRocyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX2NvbHVtbldpZHRoc18ke2dyaWQuaWR9YCk7XG4gICAgICBpZiAoY29sdW1uV2lkdGhzICYmICFncmlkLmRpc2FibGVSZW1lbWJlckNvbHVtbldpZHRocykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbmZpZy5jb2x1bW5XaWR0aHMgPSBKU09OLnBhcnNlKGNvbHVtbldpZHRocyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIGNvbHVtbldpZHRocyBmcm9tIGxvY2FsU3RvcmFnZScsIGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzb3J0aW5nRGF0YSAmJiAhZ3JpZC5kaXNhYmxlUmVtZW1iZXJTb3J0RGF0YSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uZmlnLnNvcnRpbmdEYXRhID0gSlNPTi5wYXJzZShzb3J0aW5nRGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIHNvcnRpbmdEYXRhIGZyb20gc2Vzc2lvblN0b3JhZ2UnLCBlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGZpbHRlckRhdGEgJiYgaXNGaWx0ZXJpbmcgJiYgIWdyaWQuZGlzYWJsZVJlbWVtYmVyRmlsdGVyRGF0YSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uZmlnLmZpbHRlcmluZ0RhdGEuZmlsdGVyRGF0YSA9IEpTT04ucGFyc2UoZmlsdGVyRGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIGZpbHRlckRhdGEgZnJvbSBzZXNzaW9uU3RvcmFnZScsIGUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocGFnZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uZmlnLnBhZ2UgPSBKU09OLnBhcnNlKHBhZ2UpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhZ3JpZDogZXJyb3IgcGFyc2luZyBwYWdpbmF0aW9uIGZyb20gc2Vzc2lvblN0b3JhZ2UnLCBlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHJvd3NPblBhZ2UpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbmZpZy5yb3dzT25QYWdlID0gSlNPTi5wYXJzZShyb3dzT25QYWdlKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgcGFnaW5hdGlvbiBmcm9tIHNlc3Npb25TdG9yYWdlJywgZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuc29ydGluZ0RhdGEgJiYgZ3JpZC5kZWZhdWx0U29ydENvbHVtbikge1xuICAgICAgY29uZmlnLnNvcnRpbmdEYXRhID0ge1xuICAgICAgICBzb3J0Q29sdW1uOiBncmlkLmRlZmF1bHRTb3J0Q29sdW1uLFxuICAgICAgICBzb3J0T3JkZXI6IGdyaWQuZGVmYXVsdFNvcnRPcmRlciB8fCAnYXNjJyxcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBjb25maWc7XG4gIH0sXG4gIHNhdmVTZWxlY3RlZEl0ZW1zOiAoZ3JpZCwgc2VsZWN0ZWRJdGVtcykgPT4ge1xuICAgIGlmIChncmlkLmRpc2FibGVSZW1lbWJlclNlbGVjdGVkSXRlbXMpIHJldHVybiBmYWxzZTtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX3NlbGVjdGVkSXRlbXNfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KHNlbGVjdGVkSXRlbXMgfHwgW10pKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgc2F2ZUNvbHVtbldpZHRoczogKGdyaWQsIGNvbHVtbldpZHRocykgPT4ge1xuICAgIGlmIChncmlkLmRpc2FibGVSZW1lbWJlckNvbHVtbldpZHRocykgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghY29sdW1uV2lkdGhzKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGdyaWQuY29uZmlnU3RvcmFnZSAmJiBpc0Z1bmN0aW9uKGdyaWQuY29uZmlnU3RvcmFnZS5zYXZlKSkge1xuICAgICAgZ3JpZC5jb25maWdTdG9yYWdlLnNhdmUoeyBjb2x1bW5XaWR0aHMgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX2NvbHVtbldpZHRoc18ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoY29sdW1uV2lkdGhzKSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBzYXZlQ29sdW1uU2V0dGluZ3M6IChncmlkLCBoaWRkZW5Db2x1bW5zLCBjb2x1bW5PcmRlcikgPT4ge1xuICAgIGlmICghaGlkZGVuQ29sdW1ucyB8fCAhY29sdW1uT3JkZXIpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoZ3JpZC5jb25maWdTdG9yYWdlICYmIGlzRnVuY3Rpb24oZ3JpZC5jb25maWdTdG9yYWdlLnNhdmUpKSB7XG4gICAgICBncmlkLmNvbmZpZ1N0b3JhZ2Uuc2F2ZSh7IGhpZGRlbkNvbHVtbnMsIGNvbHVtbk9yZGVyIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9oaWRkZW5Db2x1bW5zXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShoaWRkZW5Db2x1bW5zKSk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9jb2x1bW5PcmRlcl8ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoY29sdW1uT3JkZXIpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIHNhdmVTb3J0RGF0YTogKGdyaWQsIHNvcnRpbmdEYXRhKSA9PiB7XG4gICAgaWYgKGdyaWQuZGlzYWJsZVJlbWVtYmVyU29ydERhdGEpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIXNvcnRpbmdEYXRhKSByZXR1cm4gZmFsc2U7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9zb3J0aW5nXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShzb3J0aW5nRGF0YSkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBzYXZlRmlsdGVyRGF0YTogKGdyaWQsIGZpbHRlckRhdGEpID0+IHtcbiAgICBpZiAoZ3JpZC5kaXNhYmxlUmVtZW1iZXJGaWx0ZXJEYXRhKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFmaWx0ZXJEYXRhKSByZXR1cm4gZmFsc2U7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9maWx0ZXJpbmdfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KGZpbHRlckRhdGEpKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgc2F2ZUlzRmlsdGVyaW5nOiAoZ3JpZCwgaXNGaWx0ZXJpbmcpID0+IHtcbiAgICBpZiAoZ3JpZC5kaXNhYmxlUmVtZW1iZXJJc0ZpbHRlcmluZykgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChpc0ZpbHRlcmluZyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZmFsc2U7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYG9jX2dyaWRfaXNGaWx0ZXJpbmdfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KGlzRmlsdGVyaW5nKSk7XG4gICAgaWYgKCFpc0ZpbHRlcmluZykge1xuICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShgb2NfZ3JpZF9maWx0ZXJpbmdfJHtncmlkLmlkfWApO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgc2F2ZVBhZ2U6IChncmlkLCBwYWdlKSA9PiB7XG4gICAgaWYgKCFwYWdlKSByZXR1cm4gZmFsc2U7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9wYWdlXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShwYWdlKSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIHNhdmVSb3dzT25QYWdlOiAoZ3JpZCwgcm93c09uUGFnZSkgPT4ge1xuICAgIGlmICghcm93c09uUGFnZSkgcmV0dXJuIGZhbHNlO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oYG9jX2dyaWRfcm93c09uUGFnZV8ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkocm93c09uUGFnZSkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICAvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG4gIGNoZWNrR3JpZFBhcmFtOiAoZ3JpZFBhcmFtKSA9PiB7XG4gICAgaWYgKGdyaWRQYXJhbSkge1xuICAgICAgaWYgKCFncmlkUGFyYW0uaWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdbR3JpZF0gSW52YWxpZCBgZ3JpZC5pZGAgcGFyYW1ldGVyLCB1cGRhdGUgYWN0aW9uIHBhcmFtZXRlcnMgdG8gbmV3IGZvcm1hdCEnLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKCFncmlkUGFyYW0uaWRLZXlQYXRoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnW0dyaWRdIEludmFsaWQgYGdyaWQuaWRLZXlQYXRoYCBwYXJhbWV0ZXIsIHVwZGF0ZSBhY3Rpb24gcGFyYW1ldGVycyB0byBuZXcgZm9ybWF0IScsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignW0dyaWRdIEludmFsaWQgYGdyaWRgIHBhcmFtZXRlciwgdXBkYXRlIGFjdGlvbiBwYXJhbWV0ZXJzIHRvIG5ldyBmb3JtYXQhJyk7XG4gICAgfVxuICB9LFxuICBjaGVja0NvbHVtbnNQYXJhbTogKGNvbHVtbnNQYXJhbSkgPT4ge1xuICAgIGlmICghY29sdW1uc1BhcmFtKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdbR3JpZF0gSW52YWxpZCBgY29sdW1uc2AgcGFyYW1ldGVyLCB1cGRhdGUgYWN0aW9uIHBhcmFtZXRlcnMgdG8gbmV3IGZvcm1hdCEnLFxuICAgICAgKTtcbiAgICB9XG4gIH0sXG4gIC8vIExvY2FsZSBnZXR0ZXJzLCBzdXBwb3J0IGdyaWQgcGFyYW0gb3IgdXNlciBzdGF0ZSB1c2VkIGluIE9DIGFwcGxpY2F0aW9uc1xuICBnZXRMYW5ndWFnZTogKGdyaWQsIG9jVXNlclN0YXRlKSA9PiB7XG4gICAgaWYgKGdyaWQubGFuZ3VhZ2UgJiYgdHlwZW9mIGdyaWQubGFuZ3VhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZ3JpZC5sYW5ndWFnZTtcbiAgICB9XG4gICAgaWYgKG9jVXNlclN0YXRlKSB7XG4gICAgICByZXR1cm4gb2NVc2VyU3RhdGUuZ2V0SW4oWyd1c2VyJywgJ2xhbmd1YWdlJ10sICdlbicpO1xuICAgIH1cbiAgICByZXR1cm4gJ2VuJztcbiAgfSxcbiAgZ2V0UmVnaW9uOiAoZ3JpZCwgb2NVc2VyU3RhdGUpID0+IHtcbiAgICBjb25zdCBkZWZhdWx0UmVnaW9uID0gJ2VuX0dCJztcbiAgICBpZiAoZ3JpZC5yZWdpb24gJiYgdHlwZW9mIGdyaWQucmVnaW9uID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGdyaWQucmVnaW9uO1xuICAgIH1cbiAgICBpZiAob2NVc2VyU3RhdGUpIHtcbiAgICAgIHJldHVybiBvY1VzZXJTdGF0ZS5nZXRJbihbJ3VzZXInLCAncmVnaW9uJ10sIGRlZmF1bHRSZWdpb24pO1xuICAgIH1cbiAgICByZXR1cm4gZGVmYXVsdFJlZ2lvbjtcbiAgfSxcbiAgZ2V0RGF0ZUZvcm1hdDogKGdyaWQsIG9jVXNlclN0YXRlKSA9PiB7XG4gICAgaWYgKGdyaWQuZGF0ZUZvcm1hdCAmJiB0eXBlb2YgZ3JpZC5kYXRlRm9ybWF0ID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGdyaWQuZGF0ZUZvcm1hdC50b1VwcGVyQ2FzZSgpO1xuICAgIH1cbiAgICBpZiAob2NVc2VyU3RhdGUpIHtcbiAgICAgIHJldHVybiBvY1VzZXJTdGF0ZS5nZXRJbihbJ2xvY2FsZUZvcm1hdCcsICdkYXRlRm9ybWF0J10sICdMJyk7XG4gICAgfVxuICAgIHJldHVybiAnTCc7XG4gIH0sXG4gIGdldFRob3VzYW5kU2VwYXJhdG9yOiAoZ3JpZCwgb2NVc2VyU3RhdGUpID0+IHtcbiAgICBpZiAoZ3JpZC50aG91c2FuZFNlcGFyYXRvciAmJiB0eXBlb2YgZ3JpZC5sYW5ndWFnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBncmlkLnRob3VzYW5kU2VwYXJhdG9yO1xuICAgIH1cbiAgICBpZiAob2NVc2VyU3RhdGUpIHtcbiAgICAgIHJldHVybiBvY1VzZXJTdGF0ZS5nZXRJbihbJ2xvY2FsZUZvcm1hdCcsICd0aG91c2FuZFNlcGFyYXRvciddKSB8fCAnICc7XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfSxcbiAgZ2V0RGVjaW1hbFNlcGFyYXRvcjogKGdyaWQsIG9jVXNlclN0YXRlKSA9PiB7XG4gICAgaWYgKGdyaWQuZGVjaW1hbFNlcGFyYXRvciAmJiB0eXBlb2YgZ3JpZC5sYW5ndWFnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBncmlkLmRlY2ltYWxTZXBhcmF0b3I7XG4gICAgfVxuICAgIGlmIChvY1VzZXJTdGF0ZSkge1xuICAgICAgcmV0dXJuIG9jVXNlclN0YXRlLmdldEluKFsnbG9jYWxlRm9ybWF0JywgJ2RlY2ltYWxTZXBhcmF0b3InXSwgJy4nKTtcbiAgICB9XG4gICAgcmV0dXJuICcuJztcbiAgfSxcbiAgbm9ybWFsaXplRmlsdGVyaW5nRGF0YTogKGZpbHRlcmluZ0RhdGEpID0+IHtcbiAgICBsZXQgbmV3RmlsdGVyaW5nRGF0YSA9IE1hcCh7IGlzRmlsdGVyaW5nOiBmYWxzZSB9KTtcbiAgICBpZiAoIWZpbHRlcmluZ0RhdGEpIHJldHVybiBuZXdGaWx0ZXJpbmdEYXRhO1xuXG4gICAgY29uc3Qgb2xkRmlsdGVyaW5nRGF0YSA9IE1hcC5pc01hcChmaWx0ZXJpbmdEYXRhKSA/IGZpbHRlcmluZ0RhdGEgOiBmcm9tSlMoZmlsdGVyaW5nRGF0YSk7XG4gICAgY29uc3QgaXNGaWx0ZXJpbmcgPSBvbGRGaWx0ZXJpbmdEYXRhLmdldCgnaXNGaWx0ZXJpbmcnLCBmYWxzZSk7XG4gICAgY29uc3QgZmlsdGVyRGF0YSA9IG9sZEZpbHRlcmluZ0RhdGEuZ2V0KCdmaWx0ZXJEYXRhJywgbnVsbCk7XG5cbiAgICBpZiAoaXNGaWx0ZXJpbmcgJiYgZmlsdGVyRGF0YSAmJiBNYXAuaXNNYXAoZmlsdGVyRGF0YSkpIHtcbiAgICAgIG5ld0ZpbHRlcmluZ0RhdGEgPSBuZXdGaWx0ZXJpbmdEYXRhLnNldCgnaXNGaWx0ZXJpbmcnLCB0cnVlKS5zZXQoJ2ZpbHRlckRhdGEnLCBmaWx0ZXJEYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3RmlsdGVyaW5nRGF0YTtcbiAgfSxcbiAgLypcbiAgICogQGZ1bmN0aW9uIHZpc2libGVDb2x1bW5zXG4gICAqIEBkZXNjICBSZXR1cm5zIGVpdGhlciB2aXNpYmxlIGNvbHVtbnMgKGlmIHNvbWUgY29sdW1ucyBhcmUgaGlkZGVuIClcbiAgICogICAgICAgIG9yIGdyaWQgZGVmYXVsdCBjb2x1bW5zLlxuICAgKiBAcGFyYW0gb3JpZ0NvbHVtbnMgQXJyYXkgb2YgR3JpZCBvcmlnaW5hbCBjb2x1bW5zIG9iamVjdHNcbiAgICogQHBhcmFtIHZpc2libGVDb2x1bW5zIEFycmF5IG9mIEdyaWQgdmlzaWJsZSBjb2x1bW5zIHZhbHVlS2V5UGF0aHNcbiAgICogQHJldHVybnMgQXJyYXkgb2YgY29sdW1uIG9iamVjdHMgY3VycmVudGx5IHZpc2libGUgZm9yIHVzZXIuXG4gICAqL1xuICB2aXNpYmxlQ29sdW1uczogKG9yaWdDb2x1bW5zLCB2aXNpYmxlQ29sdW1ucykgPT4ge1xuICAgIGlmICghdmlzaWJsZUNvbHVtbnMpIHJldHVybiBvcmlnQ29sdW1ucztcbiAgICBjb25zdCBmaWx0ZXJlZCA9IHZpc2libGVDb2x1bW5zLm1hcChcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIHNlYXJjaENvbCA9PiBvcmlnQ29sdW1ucy5maW5kKFxuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgLy8gdmFsdWVLZXlQYXRoIGlzIGpvaW5lZCBoZXJlIGFzIGl0IGNhbiBiZSBhbiBhcnJheSBsaWtlIFsna2V5MScsICdrZXkyJ10uXG4gICAgICAgIC8vIHNlYXJjaENvbCBpcyBzaW1pbGFybHkgam9pbmVkIGluIG9uQ2VsbEtleURvd24gaW4gZGF0YWdyaWQuY29tcG9uZW50LmpzeFxuICAgICAgICBjb2wgPT4gSlNPTi5zdHJpbmdpZnkoY29sLnZhbHVlS2V5UGF0aC5qb2luKCcvJykpID09PSBKU09OLnN0cmluZ2lmeShzZWFyY2hDb2wpLFxuICAgICAgKSxcbiAgICApO1xuICAgIHJldHVybiBmaWx0ZXJlZC50b0pTKCk7XG4gIH0sXG59O1xuIl19