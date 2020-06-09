/* eslint-disable no-nested-ternary */
import moment from 'moment';
import isNaN from 'lodash/isNaN';
import { isFunction } from 'util';
import { Map, fromJS, List } from 'immutable';
import { escapeSpecialCharacters } from '@opuscapita/format-utils';

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

export default {
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
        if (List.isList(cellData) || Array.isArray(cellData)) {
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
          return val === '' || isNaN(val) || val === null || val === undefined;
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
          if (List.isList(value) || Array.isArray(value)) {
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

          if (value === '' || isNaN(value) || value === null || value === undefined) {
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

          if (value === '' || isNaN(value) || value === null || value === undefined) {
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
          if (moment(getVal(row)).isValid()) {
            return moment(getVal(row)).format(dateFormat) === moment(filterVal).format(dateFormat);
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

          var escapedVal = escapeSpecialCharacters(trimmedVal);
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

    if (isFunction(configStorage.load)) {
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

    if (grid.configStorage && isFunction(grid.configStorage.save)) {
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

    if (grid.configStorage && isFunction(grid.configStorage.save)) {
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
    var newFilteringData = Map({
      isFiltering: false
    });
    if (!filteringData) return newFilteringData;
    var oldFilteringData = Map.isMap(filteringData) ? filteringData : fromJS(filteringData);
    var isFiltering = oldFilteringData.get('isFiltering', false);
    var filterData = oldFilteringData.get('filterData', null);

    if (isFiltering && filterData && Map.isMap(filterData)) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC51dGlscy5qcyJdLCJuYW1lcyI6WyJtb21lbnQiLCJpc05hTiIsImlzRnVuY3Rpb24iLCJNYXAiLCJmcm9tSlMiLCJMaXN0IiwiZXNjYXBlU3BlY2lhbENoYXJhY3RlcnMiLCJnZXRDb2x1bW5LZXkiLCJjb2wiLCJjb2x1bW5LZXkiLCJ2YWx1ZUtleVBhdGgiLCJqb2luIiwiZ2V0VmlzaWJsZUNvbHVtbnMiLCJjb2xzIiwiaGlkZGVuQ29sdW1ucyIsImNvbHVtbk9yZGVyIiwib3JkZXJlZENvbHVtbkxpc3QiLCJmb3JFYWNoIiwiaSIsImNvbE9yZGVySWR4IiwiaW5kZXhPZiIsImRlZmF1bHRIaWRkZW4iLCJpc0hpZGRlbiIsIm9yZGVyIiwicHVzaCIsInNvcnQiLCJhIiwiYiIsIm1hcCIsIml0ZW0iLCJnZXRDb2x1bW5EZWZhdWx0VmFsdWVzIiwiY29sdW1uRGVmYXVsdFZhbHVlcyIsImRlZmF1bHRWYWx1ZSIsInVuZGVmaW5lZCIsImdldENlbGxTdHlsZUJ5Q29sIiwiYWxpZ24iLCJ0ZXh0QWxpZ24iLCJjb21wb25lbnRUeXBlIiwidmFsdWVUeXBlIiwiaXNTb3J0YWJsZSIsInNvcnRWYWx1ZUdldHRlciIsImRpc2FibGVTb3J0aW5nIiwiZ2V0U29ydENvbXBhcmF0b3IiLCJzb3J0Q29tcGFyYXRvciIsImxvY2FsZUNvbXBhcmUiLCJEYXRlIiwiZ2V0U29ydFZhbHVlR2V0dGVyIiwiZGF0YSIsImNlbGxEYXRhIiwiZ2V0SW4iLCJzZWxlY3RDb21wb25lbnRPcHRpb25zIiwiaXNMaXN0IiwiQXJyYXkiLCJpc0FycmF5IiwibGFiZWxzIiwiZCIsImZvdW5kIiwiZmluZCIsIm8iLCJ2YWx1ZSIsImxhYmVsIiwiZ2V0VmFsdWVFbXB0eUNoZWNrZXIiLCJ2YWx1ZUVtcHR5Q2hlY2tlciIsInZhbCIsImxlbmd0aCIsInNpemUiLCJnZXRGaWx0ZXJNYXRjaGVyIiwiZGF0ZUZvcm1hdCIsImZpbHRlck1hdGNoZXIiLCJnZXRWYWwiLCJyb3ciLCJmaWx0ZXJWYWwiLCJmaWx0ZXJzIiwidG9KUyIsInNvbWUiLCJmaWx0ZXIiLCJmaW5kSW5kZXgiLCJ2IiwiZmlsdGVyVmFsSW50IiwicGFyc2VJbnQiLCJ2YWxJbnQiLCJTdHJpbmciLCJpbmNsdWRlcyIsImZpbHRlclZhbEZsb2F0IiwicGFyc2VGbG9hdCIsInJlcGxhY2UiLCJpc1ZhbGlkIiwiZm9ybWF0IiwidHJpbW1lZFZhbCIsInRyaW0iLCJlc2NhcGVkVmFsIiwiUmVnRXhwIiwidGVzdCIsImxvYWRTZWxlY3RlZEl0ZW1zIiwiZ3JpZCIsInNlc3Npb25JdGVtIiwic2Vzc2lvblN0b3JhZ2UiLCJnZXRJdGVtIiwiaWQiLCJkaXNhYmxlUmVtZW1iZXJTZWxlY3RlZEl0ZW1zIiwiSlNPTiIsInBhcnNlIiwiZSIsImNvbnNvbGUiLCJlcnJvciIsImxvYWRHcmlkQ29uZmlnIiwiY29uZmlnU3RvcmFnZSIsInNvcnRpbmdEYXRhIiwiZmlsdGVyRGF0YSIsImlzRmlsdGVyaW5nRGF0YSIsImxvY2FsU3RvcmFnZSIsInBhZ2UiLCJyb3dzT25QYWdlIiwibG9hZGVkQ29uZmlnIiwiaXNGaWx0ZXJpbmciLCJsb2FkIiwiZGlzYWJsZVJlbWVtYmVySXNGaWx0ZXJpbmciLCJkZWZhdWx0U2hvd0ZpbHRlcmluZ1JvdyIsImhpZGRlbkNvbHVtbnNKc29uIiwiY29sdW1uT3JkZXJKc29uIiwiY29uZmlnIiwidmlzaWJsZUNvbHVtbnMiLCJmaWx0ZXJpbmdEYXRhIiwiY29sdW1uV2lkdGhzIiwiZGlzYWJsZVJlbWVtYmVyQ29sdW1uV2lkdGhzIiwiZGlzYWJsZVJlbWVtYmVyU29ydERhdGEiLCJkaXNhYmxlUmVtZW1iZXJGaWx0ZXJEYXRhIiwiZGVmYXVsdFNvcnRDb2x1bW4iLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwiZGVmYXVsdFNvcnRPcmRlciIsInNhdmVTZWxlY3RlZEl0ZW1zIiwic2VsZWN0ZWRJdGVtcyIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJzYXZlQ29sdW1uV2lkdGhzIiwic2F2ZSIsInNhdmVDb2x1bW5TZXR0aW5ncyIsInNhdmVTb3J0RGF0YSIsInNhdmVGaWx0ZXJEYXRhIiwic2F2ZUlzRmlsdGVyaW5nIiwicmVtb3ZlSXRlbSIsInNhdmVQYWdlIiwic2F2ZVJvd3NPblBhZ2UiLCJjaGVja0dyaWRQYXJhbSIsImdyaWRQYXJhbSIsIkVycm9yIiwiaWRLZXlQYXRoIiwiY2hlY2tDb2x1bW5zUGFyYW0iLCJjb2x1bW5zUGFyYW0iLCJnZXRMYW5ndWFnZSIsIm9jVXNlclN0YXRlIiwibGFuZ3VhZ2UiLCJnZXRSZWdpb24iLCJkZWZhdWx0UmVnaW9uIiwicmVnaW9uIiwiZ2V0RGF0ZUZvcm1hdCIsInRvVXBwZXJDYXNlIiwiZ2V0VGhvdXNhbmRTZXBhcmF0b3IiLCJ0aG91c2FuZFNlcGFyYXRvciIsImdldERlY2ltYWxTZXBhcmF0b3IiLCJkZWNpbWFsU2VwYXJhdG9yIiwibm9ybWFsaXplRmlsdGVyaW5nRGF0YSIsIm5ld0ZpbHRlcmluZ0RhdGEiLCJvbGRGaWx0ZXJpbmdEYXRhIiwiaXNNYXAiLCJnZXQiLCJzZXQiLCJvcmlnQ29sdW1ucyIsImZpbHRlcmVkIiwic2VhcmNoQ29sIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBLE9BQU9BLE1BQVAsTUFBbUIsUUFBbkI7QUFDQSxPQUFPQyxLQUFQLE1BQWtCLGNBQWxCO0FBQ0EsU0FBU0MsVUFBVCxRQUEyQixNQUEzQjtBQUNBLFNBQVNDLEdBQVQsRUFBY0MsTUFBZCxFQUFzQkMsSUFBdEIsUUFBa0MsV0FBbEM7QUFDQSxTQUFTQyx1QkFBVCxRQUF3QywwQkFBeEM7O0FBRUEsSUFBTUMsWUFBWSxHQUFHLFNBQWZBLFlBQWUsQ0FBQUMsR0FBRztBQUFBLFNBQUlBLEdBQUcsQ0FBQ0MsU0FBSixJQUFpQkQsR0FBRyxDQUFDRSxZQUFKLENBQWlCQyxJQUFqQixDQUFzQixHQUF0QixDQUFyQjtBQUFBLENBQXhCOztBQUVBLElBQU1DLGlCQUFpQixHQUFHLFNBQXBCQSxpQkFBb0IsQ0FBQ0MsSUFBRCxFQUFPQyxhQUFQ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QUFBLGNBQWMsRUFBRSx3QkFBQytDLFdBQUQsRUFBYy9DLGVBQWQsRUFBaUM7QUFDL0MsUUFBSSxDQUFDQSxlQUFMLEVBQXFCLE9BQU8rQyxXQUFQOztBQUNyQixRQUFNQyxRQUFRLEdBQUdoRCxlQUFjLENBQUM3RixHQUFmLEVBQ2Y7QUFDQSxjQUFBOEksU0FBUztBQUFBLGFBQUlGLFdBQVcsQ0FBQy9HLElBQVosRUFDVDtBQUNGO0FBQ0E7QUFDQSxnQkFBQWpELEdBQUc7QUFBQSxlQUFJNEYsSUFBSSxDQUFDa0MsU0FBTCxDQUFlOUgsR0FBRyxDQUFDRSxZQUFKLENBQWlCQyxJQUFqQixDQUFzQixHQUF0QixDQUFmLE1BQStDeUYsSUFBSSxDQUFDa0MsU0FBTCxDQUFlb0MsU0FBZixDQUFuRDtBQUFBLE9BSlEsQ0FBSjtBQUFBLEtBRk0sQ0FBakI7O0FBU0EsV0FBT0QsUUFBUSxDQUFDaEcsSUFBVCxFQUFQO0FBQ0Q7QUEzY1ksQ0FBZiIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLW5lc3RlZC10ZXJuYXJ5ICovXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgaXNOYU4gZnJvbSAnbG9kYXNoL2lzTmFOJztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICd1dGlsJztcbmltcG9ydCB7IE1hcCwgZnJvbUpTLCBMaXN0IH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCB7IGVzY2FwZVNwZWNpYWxDaGFyYWN0ZXJzIH0gZnJvbSAnQG9wdXNjYXBpdGEvZm9ybWF0LXV0aWxzJztcblxuY29uc3QgZ2V0Q29sdW1uS2V5ID0gY29sID0+IGNvbC5jb2x1bW5LZXkgfHwgY29sLnZhbHVlS2V5UGF0aC5qb2luKCcvJyk7XG5cbmNvbnN0IGdldFZpc2libGVDb2x1bW5zID0gKGNvbHMsIGhpZGRlbkNvbHVtbnMgPSBbXSwgY29sdW1uT3JkZXIgPSBbXSkgPT4ge1xuICBjb25zdCBvcmRlcmVkQ29sdW1uTGlzdCA9IFtdO1xuICBjb2xzLmZvckVhY2goKGNvbCwgaSkgPT4ge1xuICAgIGNvbnN0IGNvbHVtbktleSA9IGdldENvbHVtbktleShjb2wpO1xuICAgIGNvbnN0IGNvbE9yZGVySWR4ID0gY29sdW1uT3JkZXIuaW5kZXhPZihjb2x1bW5LZXkpO1xuICAgIGNvbnN0IGRlZmF1bHRIaWRkZW4gPSBjb2wuaXNIaWRkZW4gJiYgY29sT3JkZXJJZHggPT09IC0xO1xuICAgIGlmIChkZWZhdWx0SGlkZGVuIHx8IGhpZGRlbkNvbHVtbnMuaW5kZXhPZihjb2x1bW5LZXkpID4gLTEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgb3JkZXIgPSBjb2xPcmRlcklkeCAhPT0gLTEgPyBjb2xPcmRlcklkeCA6IGkgKyAxO1xuICAgIG9yZGVyZWRDb2x1bW5MaXN0LnB1c2goe1xuICAgICAgY29sdW1uS2V5LFxuICAgICAgb3JkZXIsXG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gb3JkZXJlZENvbHVtbkxpc3Quc29ydCgoYSwgYikgPT4gYS5vcmRlciAtIGIub3JkZXIpLm1hcChpdGVtID0+IGl0ZW0uY29sdW1uS2V5KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZ2V0Q29sdW1uS2V5LFxuICBnZXRDb2x1bW5EZWZhdWx0VmFsdWVzOiAoY29scykgPT4ge1xuICAgIGNvbnN0IGNvbHVtbkRlZmF1bHRWYWx1ZXMgPSB7fTtcbiAgICBjb2xzLmZvckVhY2goKGNvbCkgPT4ge1xuICAgICAgaWYgKGNvbC5kZWZhdWx0VmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb2x1bW5EZWZhdWx0VmFsdWVzW2dldENvbHVtbktleShjb2wpXSA9IGNvbC5kZWZhdWx0VmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGNvbHVtbkRlZmF1bHRWYWx1ZXM7XG4gIH0sXG4gIGdldENlbGxTdHlsZUJ5Q29sOiAoY29sKSA9PiB7XG4gICAgaWYgKGNvbC5hbGlnbikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGV4dEFsaWduOiBjb2wuYWxpZ24sXG4gICAgICB9O1xuICAgIH1cbiAgICAvLyBObyBkZWZhdWx0IGFsaWduIGlmIGNvbXBvbmVudCBpcyBzZWxlY3RcbiAgICAvLyBCZWNhdXNlIHJlbmRlcmVkIGRhdGEgaXMgbW9zdCBsaWtlbHkgdGV4dFxuICAgIC8vIEV2ZW4gaWYgdmFsdWVUeXBlIGlzIG51bWJlclxuICAgIGlmIChjb2wuY29tcG9uZW50VHlwZSA9PT0gJ3NlbGVjdCcgfHwgY29sLmNvbXBvbmVudFR5cGUgPT09ICdtdWx0aXNlbGVjdCcpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgc3dpdGNoIChjb2wudmFsdWVUeXBlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdGV4dEFsaWduOiAncmlnaHQnLFxuICAgICAgICB9O1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgfSxcbiAgaXNTb3J0YWJsZTogY29sID0+IGNvbC52YWx1ZVR5cGVcbiAgICAmJiAoY29sLnNvcnRWYWx1ZUdldHRlciB8fCBjb2wudmFsdWVLZXlQYXRoKVxuICAgICYmICFjb2wuZGlzYWJsZVNvcnRpbmcsXG4gIGdldFNvcnRDb21wYXJhdG9yOiAoY29sKSA9PiB7XG4gICAgaWYgKGNvbC5zb3J0Q29tcGFyYXRvcikge1xuICAgICAgcmV0dXJuIGNvbC5zb3J0Q29tcGFyYXRvcjtcbiAgICB9XG4gICAgc3dpdGNoIChjb2wudmFsdWVUeXBlKSB7XG4gICAgICBjYXNlICd0ZXh0JzpcbiAgICAgICAgcmV0dXJuIChhLCBiKSA9PiAoYS5sb2NhbGVDb21wYXJlID8gYS5sb2NhbGVDb21wYXJlKGIpIDogMSk7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgICByZXR1cm4gKGEsIGIpID0+IGEgLSBiO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIHJldHVybiAoYSwgYikgPT4gKGEgPT09IGIgPyAwIDogYSA/IC0xIDogMSk7XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgcmV0dXJuIChhLCBiKSA9PiBuZXcgRGF0ZShhKSAtIG5ldyBEYXRlKGIpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIChhLCBiKSA9PiAoYS5sb2NhbGVDb21wYXJlID8gYS5sb2NhbGVDb21wYXJlKGIpIDogMSk7XG4gICAgfVxuICB9LFxuICBnZXRTb3J0VmFsdWVHZXR0ZXI6IChjb2wpID0+IHtcbiAgICBpZiAoY29sLnNvcnRWYWx1ZUdldHRlcikge1xuICAgICAgcmV0dXJuIGNvbC5zb3J0VmFsdWVHZXR0ZXI7XG4gICAgfVxuICAgIHJldHVybiAoZGF0YSkgPT4ge1xuICAgICAgY29uc3QgY2VsbERhdGEgPSBkYXRhLmdldEluKGNvbC52YWx1ZUtleVBhdGgpO1xuICAgICAgLy8gRGVhbCB3aXRoIHNlbGVjdCBhbmQgbXVsdGlzZWxlY3QgY29tcG9uZW50VHlwZXNcbiAgICAgIGlmIChjb2wuc2VsZWN0Q29tcG9uZW50T3B0aW9ucykge1xuICAgICAgICBpZiAoTGlzdC5pc0xpc3QoY2VsbERhdGEpIHx8IEFycmF5LmlzQXJyYXkoY2VsbERhdGEpKSB7XG4gICAgICAgICAgY29uc3QgbGFiZWxzID0gW107XG4gICAgICAgICAgY2VsbERhdGEuZm9yRWFjaCgoZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZm91bmQgPSBjb2wuc2VsZWN0Q29tcG9uZW50T3B0aW9ucy5maW5kKG8gPT4gby52YWx1ZSA9PT0gZCk7XG4gICAgICAgICAgICBpZiAoZm91bmQpIGxhYmVscy5wdXNoKGZvdW5kLmxhYmVsKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gbGFiZWxzLmpvaW4oJyAnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmb3VuZCA9IGNvbC5zZWxlY3RDb21wb25lbnRPcHRpb25zLmZpbmQobyA9PiBvLnZhbHVlID09PSBjZWxsRGF0YSk7XG4gICAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kLmxhYmVsO1xuICAgICAgfVxuICAgICAgaWYgKGNlbGxEYXRhICYmIGNlbGxEYXRhLmpvaW4pIHJldHVybiBjZWxsRGF0YS5qb2luKCcgJyk7XG4gICAgICByZXR1cm4gY2VsbERhdGE7XG4gICAgfTtcbiAgfSxcbiAgZ2V0VmFsdWVFbXB0eUNoZWNrZXI6IChjb2wpID0+IHtcbiAgICBpZiAoY29sLnZhbHVlRW1wdHlDaGVja2VyKSB7XG4gICAgICByZXR1cm4gY29sLnZhbHVlRW1wdHlDaGVja2VyO1xuICAgIH1cbiAgICBpZiAoY29sLmNvbXBvbmVudFR5cGUgPT09ICdtdWx0aXNlbGVjdCcpIHtcbiAgICAgIHJldHVybiB2YWwgPT4gdmFsID09PSAnJyB8fCB2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQgfHwgdmFsLmxlbmd0aCA9PT0gMCB8fCB2YWwuc2l6ZSA9PT0gMDsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIH1cblxuICAgIHN3aXRjaCAoY29sLnZhbHVlVHlwZSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgICAgcmV0dXJuIHZhbCA9PiB2YWwgPT09ICcnIHx8IGlzTmFOKHZhbCkgfHwgdmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkO1xuICAgICAgY2FzZSAndGV4dCc6XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgY2FzZSAnc2VsZWN0JzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB2YWwgPT4gdmFsID09PSAnJyB8fCB2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQ7XG4gICAgfVxuICB9LFxuICBnZXRGaWx0ZXJNYXRjaGVyOiAoY29sLCBkYXRlRm9ybWF0KSA9PiB7XG4gICAgaWYgKGNvbC5maWx0ZXJNYXRjaGVyKSByZXR1cm4gY29sLmZpbHRlck1hdGNoZXI7XG4gICAgY29uc3QgZ2V0VmFsID0gcm93ID0+IHJvdy5nZXRJbihjb2wudmFsdWVLZXlQYXRoKTtcblxuICAgIC8vIFNlbGVjdCBjb21wb25lbnQgdmFsdWVzIGNhbiBiZSBtYXRjaGVkIGV4YWN0bHlcbiAgICBpZiAoY29sLmNvbXBvbmVudFR5cGUgPT09ICdzZWxlY3QnKSB7XG4gICAgICByZXR1cm4gKHJvdywgZmlsdGVyVmFsKSA9PiBmaWx0ZXJWYWwgPT09IGdldFZhbChyb3cpO1xuICAgIH1cbiAgICBpZiAoY29sLmNvbXBvbmVudFR5cGUgPT09ICdtdWx0aXNlbGVjdCcpIHtcbiAgICAgIHJldHVybiAocm93LCBmaWx0ZXJWYWwpID0+IHtcbiAgICAgICAgLy8gdmFsdWUgY2FuIGJlIHNpbXBsZSB2YWx1ZSwgaW1tdXRhYmxlIExpc3Qgb3IgYXJyYXlcbiAgICAgICAgY29uc3QgdmFsdWUgPSBnZXRWYWwocm93KTtcbiAgICAgICAgLy8gc2Vzc2lvbiBzdG9yYWdlIGNvbnRlbnQgaXMgY29udmVydGVkIHRvIGltbXV0YWJsZSBhbmQgbXVsdGlzZWxlY3RcbiAgICAgICAgLy8gZmlsdGVycyBpcyB0aGVuIGxpc3Qgb3RoZXJ3aXNlIGFycmF5XG4gICAgICAgIGNvbnN0IGZpbHRlcnMgPSBmaWx0ZXJWYWwgJiYgZmlsdGVyVmFsLnRvSlMgPyBmaWx0ZXJWYWwudG9KUygpIDogZmlsdGVyVmFsO1xuICAgICAgICByZXR1cm4gZmlsdGVycy5zb21lKChmaWx0ZXIpID0+IHtcbiAgICAgICAgICBpZiAoTGlzdC5pc0xpc3QodmFsdWUpIHx8IEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUuZmluZEluZGV4KHYgPT4gdiA9PT0gZmlsdGVyLnZhbHVlKSAhPT0gLTE7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmaWx0ZXIudmFsdWUgPT09IHZhbHVlO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgc3dpdGNoIChjb2wudmFsdWVUeXBlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICByZXR1cm4gKHJvdywgZmlsdGVyVmFsKSA9PiB7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBnZXRWYWwocm93KTtcbiAgICAgICAgICBpZiAodmFsdWUgPT09ICcnIHx8IGlzTmFOKHZhbHVlKSB8fCB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIG1hdGNoIGV4YWN0IG51bWJlciB2YWx1ZVxuICAgICAgICAgIGNvbnN0IGZpbHRlclZhbEludCA9IHBhcnNlSW50KGZpbHRlclZhbCwgMTApO1xuICAgICAgICAgIGNvbnN0IHZhbEludCA9IHBhcnNlSW50KHZhbHVlLCAxMCk7XG4gICAgICAgICAgaWYgKGZpbHRlclZhbEludCA9PT0gdmFsSW50IHx8IGZpbHRlclZhbEludCA9PT0gdmFsSW50ICogLTEpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBtYXRjaCBwYXJ0aWFsXG4gICAgICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSkuaW5jbHVkZXMoZmlsdGVyVmFsKTtcbiAgICAgICAgfTtcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgICAgcmV0dXJuIChyb3csIGZpbHRlclZhbCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gZ2V0VmFsKHJvdyk7XG4gICAgICAgICAgaWYgKHZhbHVlID09PSAnJyB8fCBpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBtYXRjaCBleGFjdCBmbG9hdCB2YWx1ZVxuICAgICAgICAgIGNvbnN0IGZpbHRlclZhbEZsb2F0ID0gcGFyc2VGbG9hdChmaWx0ZXJWYWwucmVwbGFjZSgnLCcsICcuJykpO1xuICAgICAgICAgIGlmIChmaWx0ZXJWYWxGbG9hdCA9PT0gcGFyc2VGbG9hdCh2YWx1ZSkgfHwgZmlsdGVyVmFsRmxvYXQgPT09IHBhcnNlRmxvYXQodmFsdWUpICogLTEpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBtYXRjaCBwYXJ0aWFsXG4gICAgICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSkucmVwbGFjZSgnLCcsICcuJykuaW5jbHVkZXMoZmlsdGVyVmFsLnJlcGxhY2UoJywnLCAnLicpKTtcbiAgICAgICAgfTtcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICByZXR1cm4gKHJvdywgZmlsdGVyVmFsKSA9PiB7XG4gICAgICAgICAgaWYgKG1vbWVudChnZXRWYWwocm93KSkuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gbW9tZW50KGdldFZhbChyb3cpKS5mb3JtYXQoZGF0ZUZvcm1hdCkgPT09IG1vbWVudChmaWx0ZXJWYWwpLmZvcm1hdChkYXRlRm9ybWF0KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9O1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIHJldHVybiAocm93LCBmaWx0ZXJWYWwpID0+ICEhZmlsdGVyVmFsID09PSAhIWdldFZhbChyb3cpO1xuICAgICAgY2FzZSAndGV4dCc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gKHJvdywgZmlsdGVyVmFsKSA9PiB7XG4gICAgICAgICAgLy8gRW5zdXJlIHZhbHVlIGlzIHRyaW1tZWQgc3RyaW5nXG4gICAgICAgICAgY29uc3QgdHJpbW1lZFZhbCA9IGZpbHRlclZhbC50cmltID8gZmlsdGVyVmFsLnRyaW0oKSA6IFN0cmluZyhmaWx0ZXJWYWwpO1xuICAgICAgICAgIC8vIGhhbmRsZSBzcGVjaWFsIGNoYXJhY3RlcnMgYnkgZXNjYXBpbmcgdGhlbVxuICAgICAgICAgIGNvbnN0IGVzY2FwZWRWYWwgPSBlc2NhcGVTcGVjaWFsQ2hhcmFjdGVycyh0cmltbWVkVmFsKTtcbiAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cChlc2NhcGVkVmFsLCAnaScpLnRlc3QoZ2V0VmFsKHJvdykpO1xuICAgICAgICB9O1xuICAgIH1cbiAgfSxcbiAgbG9hZFNlbGVjdGVkSXRlbXM6IChncmlkKSA9PiB7XG4gICAgY29uc3Qgc2Vzc2lvbkl0ZW0gPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX3NlbGVjdGVkSXRlbXNfJHtncmlkLmlkfWApO1xuICAgIGlmIChzZXNzaW9uSXRlbSAmJiAhZ3JpZC5kaXNhYmxlUmVtZW1iZXJTZWxlY3RlZEl0ZW1zKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShzZXNzaW9uSXRlbSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIHNlbGVjdGVkSXRlbXMgZnJvbSBzZXNzaW9uU3RvcmFnZScsIGUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH0sXG4gIGxvYWRHcmlkQ29uZmlnOiAoZ3JpZCwgY29scykgPT4ge1xuICAgIGNvbnN0IGNvbmZpZ1N0b3JhZ2UgPSBncmlkLmNvbmZpZ1N0b3JhZ2UgfHwge307XG4gICAgY29uc3Qgc29ydGluZ0RhdGEgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX3NvcnRpbmdfJHtncmlkLmlkfWApO1xuICAgIGNvbnN0IGZpbHRlckRhdGEgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX2ZpbHRlcmluZ18ke2dyaWQuaWR9YCk7XG4gICAgY29uc3QgaXNGaWx0ZXJpbmdEYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfaXNGaWx0ZXJpbmdfJHtncmlkLmlkfWApO1xuICAgIGNvbnN0IHBhZ2UgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX3BhZ2VfJHtncmlkLmlkfWApO1xuICAgIGNvbnN0IHJvd3NPblBhZ2UgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX3Jvd3NPblBhZ2VfJHtncmlkLmlkfWApO1xuICAgIGxldCBsb2FkZWRDb25maWcgPSB7fTtcbiAgICBsZXQgaGlkZGVuQ29sdW1ucztcbiAgICBsZXQgY29sdW1uT3JkZXI7XG4gICAgbGV0IGlzRmlsdGVyaW5nID0gZmFsc2U7XG5cbiAgICBpZiAoaXNGdW5jdGlvbihjb25maWdTdG9yYWdlLmxvYWQpKSB7XG4gICAgICBsb2FkZWRDb25maWcgPSBjb25maWdTdG9yYWdlLmxvYWQoKTtcbiAgICB9XG5cbiAgICBpZiAoaXNGaWx0ZXJpbmdEYXRhKSB7XG4gICAgICBpZiAoIWdyaWQuZGlzYWJsZVJlbWVtYmVySXNGaWx0ZXJpbmcpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpc0ZpbHRlcmluZyA9IEpTT04ucGFyc2UoaXNGaWx0ZXJpbmdEYXRhKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgaXNGaWx0ZXJpbmdEYXRhIGZyb20gbG9jYWxTdG9yYWdlJywgZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGdyaWQuZGVmYXVsdFNob3dGaWx0ZXJpbmdSb3cpIHtcbiAgICAgIGlzRmlsdGVyaW5nID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGxvYWRlZENvbmZpZy5oaWRkZW5Db2x1bW5zKSB7XG4gICAgICBoaWRkZW5Db2x1bW5zID0gbG9hZGVkQ29uZmlnLmhpZGRlbkNvbHVtbnM7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaGlkZGVuQ29sdW1uc0pzb24gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgb2NfZ3JpZF9oaWRkZW5Db2x1bW5zXyR7Z3JpZC5pZH1gKTtcbiAgICAgIGlmIChoaWRkZW5Db2x1bW5zSnNvbikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGhpZGRlbkNvbHVtbnMgPSBKU09OLnBhcnNlKGhpZGRlbkNvbHVtbnNKc29uKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgaGlkZGVuQ29sdW1ucyBmcm9tIGxvY2FsU3RvcmFnZScsIGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChsb2FkZWRDb25maWcuY29sdW1uT3JkZXIpIHtcbiAgICAgIGNvbHVtbk9yZGVyID0gbG9hZGVkQ29uZmlnLmNvbHVtbk9yZGVyOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNvbHVtbk9yZGVySnNvbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX2NvbHVtbk9yZGVyXyR7Z3JpZC5pZH1gKTtcbiAgICAgIGlmIChjb2x1bW5PcmRlckpzb24pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb2x1bW5PcmRlciA9IEpTT04ucGFyc2UoY29sdW1uT3JkZXJKc29uKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgY29sdW1uT3JkZXIgZnJvbSBsb2NhbFN0b3JhZ2UnLCBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICB2aXNpYmxlQ29sdW1uczogZ2V0VmlzaWJsZUNvbHVtbnMoY29scywgaGlkZGVuQ29sdW1ucywgY29sdW1uT3JkZXIpLFxuICAgICAgZmlsdGVyaW5nRGF0YToge1xuICAgICAgICBpc0ZpbHRlcmluZyxcbiAgICAgIH0sXG4gICAgfTtcbiAgICBpZiAobG9hZGVkQ29uZmlnLmNvbHVtbldpZHRocykge1xuICAgICAgY29uZmlnLmNvbHVtbldpZHRocyA9IGxvYWRlZENvbmZpZy5jb2x1bW5XaWR0aHM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNvbHVtbldpZHRocyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX2NvbHVtbldpZHRoc18ke2dyaWQuaWR9YCk7XG4gICAgICBpZiAoY29sdW1uV2lkdGhzICYmICFncmlkLmRpc2FibGVSZW1lbWJlckNvbHVtbldpZHRocykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbmZpZy5jb2x1bW5XaWR0aHMgPSBKU09OLnBhcnNlKGNvbHVtbldpZHRocyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIGNvbHVtbldpZHRocyBmcm9tIGxvY2FsU3RvcmFnZScsIGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzb3J0aW5nRGF0YSAmJiAhZ3JpZC5kaXNhYmxlUmVtZW1iZXJTb3J0RGF0YSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uZmlnLnNvcnRpbmdEYXRhID0gSlNPTi5wYXJzZShzb3J0aW5nRGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIHNvcnRpbmdEYXRhIGZyb20gc2Vzc2lvblN0b3JhZ2UnLCBlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGZpbHRlckRhdGEgJiYgaXNGaWx0ZXJpbmcgJiYgIWdyaWQuZGlzYWJsZVJlbWVtYmVyRmlsdGVyRGF0YSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uZmlnLmZpbHRlcmluZ0RhdGEuZmlsdGVyRGF0YSA9IEpTT04ucGFyc2UoZmlsdGVyRGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIGZpbHRlckRhdGEgZnJvbSBzZXNzaW9uU3RvcmFnZScsIGUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocGFnZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uZmlnLnBhZ2UgPSBKU09OLnBhcnNlKHBhZ2UpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhZ3JpZDogZXJyb3IgcGFyc2luZyBwYWdpbmF0aW9uIGZyb20gc2Vzc2lvblN0b3JhZ2UnLCBlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHJvd3NPblBhZ2UpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbmZpZy5yb3dzT25QYWdlID0gSlNPTi5wYXJzZShyb3dzT25QYWdlKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgcGFnaW5hdGlvbiBmcm9tIHNlc3Npb25TdG9yYWdlJywgZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuc29ydGluZ0RhdGEgJiYgZ3JpZC5kZWZhdWx0U29ydENvbHVtbikge1xuICAgICAgY29uZmlnLnNvcnRpbmdEYXRhID0ge1xuICAgICAgICBzb3J0Q29sdW1uOiBncmlkLmRlZmF1bHRTb3J0Q29sdW1uLFxuICAgICAgICBzb3J0T3JkZXI6IGdyaWQuZGVmYXVsdFNvcnRPcmRlciB8fCAnYXNjJyxcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBjb25maWc7XG4gIH0sXG4gIHNhdmVTZWxlY3RlZEl0ZW1zOiAoZ3JpZCwgc2VsZWN0ZWRJdGVtcykgPT4ge1xuICAgIGlmIChncmlkLmRpc2FibGVSZW1lbWJlclNlbGVjdGVkSXRlbXMpIHJldHVybiBmYWxzZTtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX3NlbGVjdGVkSXRlbXNfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KHNlbGVjdGVkSXRlbXMgfHwgW10pKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgc2F2ZUNvbHVtbldpZHRoczogKGdyaWQsIGNvbHVtbldpZHRocykgPT4ge1xuICAgIGlmIChncmlkLmRpc2FibGVSZW1lbWJlckNvbHVtbldpZHRocykgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghY29sdW1uV2lkdGhzKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGdyaWQuY29uZmlnU3RvcmFnZSAmJiBpc0Z1bmN0aW9uKGdyaWQuY29uZmlnU3RvcmFnZS5zYXZlKSkge1xuICAgICAgZ3JpZC5jb25maWdTdG9yYWdlLnNhdmUoeyBjb2x1bW5XaWR0aHMgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX2NvbHVtbldpZHRoc18ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoY29sdW1uV2lkdGhzKSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBzYXZlQ29sdW1uU2V0dGluZ3M6IChncmlkLCBoaWRkZW5Db2x1bW5zLCBjb2x1bW5PcmRlcikgPT4ge1xuICAgIGlmICghaGlkZGVuQ29sdW1ucyB8fCAhY29sdW1uT3JkZXIpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoZ3JpZC5jb25maWdTdG9yYWdlICYmIGlzRnVuY3Rpb24oZ3JpZC5jb25maWdTdG9yYWdlLnNhdmUpKSB7XG4gICAgICBncmlkLmNvbmZpZ1N0b3JhZ2Uuc2F2ZSh7IGhpZGRlbkNvbHVtbnMsIGNvbHVtbk9yZGVyIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9oaWRkZW5Db2x1bW5zXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShoaWRkZW5Db2x1bW5zKSk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9jb2x1bW5PcmRlcl8ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoY29sdW1uT3JkZXIpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIHNhdmVTb3J0RGF0YTogKGdyaWQsIHNvcnRpbmdEYXRhKSA9PiB7XG4gICAgaWYgKGdyaWQuZGlzYWJsZVJlbWVtYmVyU29ydERhdGEpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIXNvcnRpbmdEYXRhKSByZXR1cm4gZmFsc2U7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9zb3J0aW5nXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShzb3J0aW5nRGF0YSkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBzYXZlRmlsdGVyRGF0YTogKGdyaWQsIGZpbHRlckRhdGEpID0+IHtcbiAgICBpZiAoZ3JpZC5kaXNhYmxlUmVtZW1iZXJGaWx0ZXJEYXRhKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFmaWx0ZXJEYXRhKSByZXR1cm4gZmFsc2U7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9maWx0ZXJpbmdfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KGZpbHRlckRhdGEpKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgc2F2ZUlzRmlsdGVyaW5nOiAoZ3JpZCwgaXNGaWx0ZXJpbmcpID0+IHtcbiAgICBpZiAoZ3JpZC5kaXNhYmxlUmVtZW1iZXJJc0ZpbHRlcmluZykgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChpc0ZpbHRlcmluZyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZmFsc2U7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYG9jX2dyaWRfaXNGaWx0ZXJpbmdfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KGlzRmlsdGVyaW5nKSk7XG4gICAgaWYgKCFpc0ZpbHRlcmluZykge1xuICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShgb2NfZ3JpZF9maWx0ZXJpbmdfJHtncmlkLmlkfWApO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgc2F2ZVBhZ2U6IChncmlkLCBwYWdlKSA9PiB7XG4gICAgaWYgKCFwYWdlKSByZXR1cm4gZmFsc2U7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9wYWdlXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShwYWdlKSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIHNhdmVSb3dzT25QYWdlOiAoZ3JpZCwgcm93c09uUGFnZSkgPT4ge1xuICAgIGlmICghcm93c09uUGFnZSkgcmV0dXJuIGZhbHNlO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oYG9jX2dyaWRfcm93c09uUGFnZV8ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkocm93c09uUGFnZSkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICAvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG4gIGNoZWNrR3JpZFBhcmFtOiAoZ3JpZFBhcmFtKSA9PiB7XG4gICAgaWYgKGdyaWRQYXJhbSkge1xuICAgICAgaWYgKCFncmlkUGFyYW0uaWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdbR3JpZF0gSW52YWxpZCBgZ3JpZC5pZGAgcGFyYW1ldGVyLCB1cGRhdGUgYWN0aW9uIHBhcmFtZXRlcnMgdG8gbmV3IGZvcm1hdCEnLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKCFncmlkUGFyYW0uaWRLZXlQYXRoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnW0dyaWRdIEludmFsaWQgYGdyaWQuaWRLZXlQYXRoYCBwYXJhbWV0ZXIsIHVwZGF0ZSBhY3Rpb24gcGFyYW1ldGVycyB0byBuZXcgZm9ybWF0IScsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignW0dyaWRdIEludmFsaWQgYGdyaWRgIHBhcmFtZXRlciwgdXBkYXRlIGFjdGlvbiBwYXJhbWV0ZXJzIHRvIG5ldyBmb3JtYXQhJyk7XG4gICAgfVxuICB9LFxuICBjaGVja0NvbHVtbnNQYXJhbTogKGNvbHVtbnNQYXJhbSkgPT4ge1xuICAgIGlmICghY29sdW1uc1BhcmFtKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdbR3JpZF0gSW52YWxpZCBgY29sdW1uc2AgcGFyYW1ldGVyLCB1cGRhdGUgYWN0aW9uIHBhcmFtZXRlcnMgdG8gbmV3IGZvcm1hdCEnLFxuICAgICAgKTtcbiAgICB9XG4gIH0sXG4gIC8vIExvY2FsZSBnZXR0ZXJzLCBzdXBwb3J0IGdyaWQgcGFyYW0gb3IgdXNlciBzdGF0ZSB1c2VkIGluIE9DIGFwcGxpY2F0aW9uc1xuICBnZXRMYW5ndWFnZTogKGdyaWQsIG9jVXNlclN0YXRlKSA9PiB7XG4gICAgaWYgKGdyaWQubGFuZ3VhZ2UgJiYgdHlwZW9mIGdyaWQubGFuZ3VhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZ3JpZC5sYW5ndWFnZTtcbiAgICB9XG4gICAgaWYgKG9jVXNlclN0YXRlKSB7XG4gICAgICByZXR1cm4gb2NVc2VyU3RhdGUuZ2V0SW4oWyd1c2VyJywgJ2xhbmd1YWdlJ10sICdlbicpO1xuICAgIH1cbiAgICByZXR1cm4gJ2VuJztcbiAgfSxcbiAgZ2V0UmVnaW9uOiAoZ3JpZCwgb2NVc2VyU3RhdGUpID0+IHtcbiAgICBjb25zdCBkZWZhdWx0UmVnaW9uID0gJ2VuX0dCJztcbiAgICBpZiAoZ3JpZC5yZWdpb24gJiYgdHlwZW9mIGdyaWQucmVnaW9uID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGdyaWQucmVnaW9uO1xuICAgIH1cbiAgICBpZiAob2NVc2VyU3RhdGUpIHtcbiAgICAgIHJldHVybiBvY1VzZXJTdGF0ZS5nZXRJbihbJ3VzZXInLCAncmVnaW9uJ10sIGRlZmF1bHRSZWdpb24pO1xuICAgIH1cbiAgICByZXR1cm4gZGVmYXVsdFJlZ2lvbjtcbiAgfSxcbiAgZ2V0RGF0ZUZvcm1hdDogKGdyaWQsIG9jVXNlclN0YXRlKSA9PiB7XG4gICAgaWYgKGdyaWQuZGF0ZUZvcm1hdCAmJiB0eXBlb2YgZ3JpZC5kYXRlRm9ybWF0ID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGdyaWQuZGF0ZUZvcm1hdC50b1VwcGVyQ2FzZSgpO1xuICAgIH1cbiAgICBpZiAob2NVc2VyU3RhdGUpIHtcbiAgICAgIHJldHVybiBvY1VzZXJTdGF0ZS5nZXRJbihbJ2xvY2FsZUZvcm1hdCcsICdkYXRlRm9ybWF0J10sICdMJyk7XG4gICAgfVxuICAgIHJldHVybiAnTCc7XG4gIH0sXG4gIGdldFRob3VzYW5kU2VwYXJhdG9yOiAoZ3JpZCwgb2NVc2VyU3RhdGUpID0+IHtcbiAgICBpZiAoZ3JpZC50aG91c2FuZFNlcGFyYXRvciAmJiB0eXBlb2YgZ3JpZC5sYW5ndWFnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBncmlkLnRob3VzYW5kU2VwYXJhdG9yO1xuICAgIH1cbiAgICBpZiAob2NVc2VyU3RhdGUpIHtcbiAgICAgIHJldHVybiBvY1VzZXJTdGF0ZS5nZXRJbihbJ2xvY2FsZUZvcm1hdCcsICd0aG91c2FuZFNlcGFyYXRvciddKSB8fCAnICc7XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfSxcbiAgZ2V0RGVjaW1hbFNlcGFyYXRvcjogKGdyaWQsIG9jVXNlclN0YXRlKSA9PiB7XG4gICAgaWYgKGdyaWQuZGVjaW1hbFNlcGFyYXRvciAmJiB0eXBlb2YgZ3JpZC5sYW5ndWFnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBncmlkLmRlY2ltYWxTZXBhcmF0b3I7XG4gICAgfVxuICAgIGlmIChvY1VzZXJTdGF0ZSkge1xuICAgICAgcmV0dXJuIG9jVXNlclN0YXRlLmdldEluKFsnbG9jYWxlRm9ybWF0JywgJ2RlY2ltYWxTZXBhcmF0b3InXSwgJy4nKTtcbiAgICB9XG4gICAgcmV0dXJuICcuJztcbiAgfSxcbiAgbm9ybWFsaXplRmlsdGVyaW5nRGF0YTogKGZpbHRlcmluZ0RhdGEpID0+IHtcbiAgICBsZXQgbmV3RmlsdGVyaW5nRGF0YSA9IE1hcCh7IGlzRmlsdGVyaW5nOiBmYWxzZSB9KTtcbiAgICBpZiAoIWZpbHRlcmluZ0RhdGEpIHJldHVybiBuZXdGaWx0ZXJpbmdEYXRhO1xuXG4gICAgY29uc3Qgb2xkRmlsdGVyaW5nRGF0YSA9IE1hcC5pc01hcChmaWx0ZXJpbmdEYXRhKSA/IGZpbHRlcmluZ0RhdGEgOiBmcm9tSlMoZmlsdGVyaW5nRGF0YSk7XG4gICAgY29uc3QgaXNGaWx0ZXJpbmcgPSBvbGRGaWx0ZXJpbmdEYXRhLmdldCgnaXNGaWx0ZXJpbmcnLCBmYWxzZSk7XG4gICAgY29uc3QgZmlsdGVyRGF0YSA9IG9sZEZpbHRlcmluZ0RhdGEuZ2V0KCdmaWx0ZXJEYXRhJywgbnVsbCk7XG5cbiAgICBpZiAoaXNGaWx0ZXJpbmcgJiYgZmlsdGVyRGF0YSAmJiBNYXAuaXNNYXAoZmlsdGVyRGF0YSkpIHtcbiAgICAgIG5ld0ZpbHRlcmluZ0RhdGEgPSBuZXdGaWx0ZXJpbmdEYXRhLnNldCgnaXNGaWx0ZXJpbmcnLCB0cnVlKS5zZXQoJ2ZpbHRlckRhdGEnLCBmaWx0ZXJEYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3RmlsdGVyaW5nRGF0YTtcbiAgfSxcbiAgLypcbiAgICogQGZ1bmN0aW9uIHZpc2libGVDb2x1bW5zXG4gICAqIEBkZXNjICBSZXR1cm5zIGVpdGhlciB2aXNpYmxlIGNvbHVtbnMgKGlmIHNvbWUgY29sdW1ucyBhcmUgaGlkZGVuIClcbiAgICogICAgICAgIG9yIGdyaWQgZGVmYXVsdCBjb2x1bW5zLlxuICAgKiBAcGFyYW0gb3JpZ0NvbHVtbnMgQXJyYXkgb2YgR3JpZCBvcmlnaW5hbCBjb2x1bW5zIG9iamVjdHNcbiAgICogQHBhcmFtIHZpc2libGVDb2x1bW5zIEFycmF5IG9mIEdyaWQgdmlzaWJsZSBjb2x1bW5zIHZhbHVlS2V5UGF0aHNcbiAgICogQHJldHVybnMgQXJyYXkgb2YgY29sdW1uIG9iamVjdHMgY3VycmVudGx5IHZpc2libGUgZm9yIHVzZXIuXG4gICAqL1xuICB2aXNpYmxlQ29sdW1uczogKG9yaWdDb2x1bW5zLCB2aXNpYmxlQ29sdW1ucykgPT4ge1xuICAgIGlmICghdmlzaWJsZUNvbHVtbnMpIHJldHVybiBvcmlnQ29sdW1ucztcbiAgICBjb25zdCBmaWx0ZXJlZCA9IHZpc2libGVDb2x1bW5zLm1hcChcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIHNlYXJjaENvbCA9PiBvcmlnQ29sdW1ucy5maW5kKFxuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgLy8gdmFsdWVLZXlQYXRoIGlzIGpvaW5lZCBoZXJlIGFzIGl0IGNhbiBiZSBhbiBhcnJheSBsaWtlIFsna2V5MScsICdrZXkyJ10uXG4gICAgICAgIC8vIHNlYXJjaENvbCBpcyBzaW1pbGFybHkgam9pbmVkIGluIG9uQ2VsbEtleURvd24gaW4gZGF0YWdyaWQuY29tcG9uZW50LmpzeFxuICAgICAgICBjb2wgPT4gSlNPTi5zdHJpbmdpZnkoY29sLnZhbHVlS2V5UGF0aC5qb2luKCcvJykpID09PSBKU09OLnN0cmluZ2lmeShzZWFyY2hDb2wpLFxuICAgICAgKSxcbiAgICApO1xuICAgIHJldHVybiBmaWx0ZXJlZC50b0pTKCk7XG4gIH0sXG59O1xuIl19