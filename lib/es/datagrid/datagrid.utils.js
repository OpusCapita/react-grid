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
    };

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kYXRhZ3JpZC51dGlscy5qcyJdLCJuYW1lcyI6WyJtb21lbnQiLCJpc05hTiIsImlzRnVuY3Rpb24iLCJNYXAiLCJmcm9tSlMiLCJMaXN0IiwiZXNjYXBlU3BlY2lhbENoYXJhY3RlcnMiLCJnZXRDb2x1bW5LZXkiLCJjb2wiLCJjb2x1bW5LZXkiLCJ2YWx1ZUtleVBhdGgiLCJqb2luIiwiZ2V0VmlzaWJsZUNvbHVtbnMiLCJjb2xzIiwiaGlkZGVuQ29sdW1ucyIsImNvbHVtbk9yZGVyIiwib3JkZXJlZENvbHVtbkxpc3QiLCJmb3JFYWNoIiwiaSIsImNvbE9yZGVySWR4IiwiaW5kZXhPZiIsImRlZmF1bHRIaWRkZW4iLCJpc0hpZGRlbiIsIm9yZGVyIiwicHVzaCIsInNvcnQiLCJhIiwiYiIsIm1hcCIsIml0ZW0iLCJnZXRDb2x1bW5EZWZhdWx0VmFsdWVzIiwiY29sdW1uRGVmYXVsdFZhbHVlcyIsImRlZmF1bHRWYWx1ZSIsInVuZGVmaW5lZCIsImdldENlbGxTdHlsZUJ5Q29sIiwiYWxpZ24iLCJ0ZXh0QWxpZ24iLCJjb21wb25lbnRUeXBlIiwidmFsdWVUeXBlIiwiaXNTb3J0YWJsZSIsInNvcnRWYWx1ZUdldHRlciIsImRpc2FibGVTb3J0aW5nIiwiZ2V0U29ydENvbXBhcmF0b3IiLCJzb3J0Q29tcGFyYXRvciIsImxvY2FsZUNvbXBhcmUiLCJEYXRlIiwiZ2V0U29ydFZhbHVlR2V0dGVyIiwiZGF0YSIsImNlbGxEYXRhIiwiZ2V0SW4iLCJzZWxlY3RDb21wb25lbnRPcHRpb25zIiwiaXNMaXN0IiwiQXJyYXkiLCJpc0FycmF5IiwibGFiZWxzIiwiZCIsImZvdW5kIiwiZmluZCIsIm8iLCJ2YWx1ZSIsImxhYmVsIiwiZ2V0VmFsdWVFbXB0eUNoZWNrZXIiLCJ2YWx1ZUVtcHR5Q2hlY2tlciIsInZhbCIsImxlbmd0aCIsInNpemUiLCJnZXRGaWx0ZXJNYXRjaGVyIiwiZGF0ZUZvcm1hdCIsImZpbHRlck1hdGNoZXIiLCJnZXRWYWwiLCJyb3ciLCJmaWx0ZXJWYWwiLCJmaWx0ZXJzIiwidG9KUyIsInNvbWUiLCJmaWx0ZXIiLCJmaW5kSW5kZXgiLCJ2IiwiZmlsdGVyVmFsSW50IiwicGFyc2VJbnQiLCJ2YWxJbnQiLCJTdHJpbmciLCJpbmNsdWRlcyIsImZpbHRlclZhbEZsb2F0IiwicGFyc2VGbG9hdCIsInJlcGxhY2UiLCJpc1ZhbGlkIiwiZm9ybWF0IiwidHJpbW1lZFZhbCIsInRyaW0iLCJlc2NhcGVkVmFsIiwiUmVnRXhwIiwidGVzdCIsImxvYWRTZWxlY3RlZEl0ZW1zIiwiZ3JpZCIsInNlc3Npb25JdGVtIiwic2Vzc2lvblN0b3JhZ2UiLCJnZXRJdGVtIiwiaWQiLCJkaXNhYmxlUmVtZW1iZXJTZWxlY3RlZEl0ZW1zIiwiSlNPTiIsInBhcnNlIiwiZSIsImNvbnNvbGUiLCJlcnJvciIsImxvYWRHcmlkQ29uZmlnIiwiY29uZmlnU3RvcmFnZSIsInNvcnRpbmdEYXRhIiwiZmlsdGVyRGF0YSIsImlzRmlsdGVyaW5nRGF0YSIsImxvY2FsU3RvcmFnZSIsInBhZ2UiLCJyb3dzT25QYWdlIiwibG9hZGVkQ29uZmlnIiwiaXNGaWx0ZXJpbmciLCJsb2FkIiwiZGlzYWJsZVJlbWVtYmVySXNGaWx0ZXJpbmciLCJkZWZhdWx0U2hvd0ZpbHRlcmluZ1JvdyIsImhpZGRlbkNvbHVtbnNKc29uIiwiY29sdW1uT3JkZXJKc29uIiwiY29uZmlnIiwidmlzaWJsZUNvbHVtbnMiLCJmaWx0ZXJpbmdEYXRhIiwiY29sdW1uV2lkdGhzIiwiZGlzYWJsZVJlbWVtYmVyQ29sdW1uV2lkdGhzIiwiZGlzYWJsZVJlbWVtYmVyU29ydERhdGEiLCJkaXNhYmxlUmVtZW1iZXJGaWx0ZXJEYXRhIiwiZGVmYXVsdFNvcnRDb2x1bW4iLCJzb3J0Q29sdW1uIiwic29ydE9yZGVyIiwiZGVmYXVsdFNvcnRPcmRlciIsInNhdmVTZWxlY3RlZEl0ZW1zIiwic2VsZWN0ZWRJdGVtcyIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJzYXZlQ29sdW1uV2lkdGhzIiwic2F2ZSIsInNhdmVDb2x1bW5TZXR0aW5ncyIsInNhdmVTb3J0RGF0YSIsInNhdmVGaWx0ZXJEYXRhIiwic2F2ZUlzRmlsdGVyaW5nIiwicmVtb3ZlSXRlbSIsInNhdmVQYWdlIiwic2F2ZVJvd3NPblBhZ2UiLCJjaGVja0dyaWRQYXJhbSIsImdyaWRQYXJhbSIsIkVycm9yIiwiaWRLZXlQYXRoIiwiY2hlY2tDb2x1bW5zUGFyYW0iLCJjb2x1bW5zUGFyYW0iLCJnZXRMYW5ndWFnZSIsIm9jVXNlclN0YXRlIiwibGFuZ3VhZ2UiLCJnZXRSZWdpb24iLCJkZWZhdWx0UmVnaW9uIiwicmVnaW9uIiwiZ2V0RGF0ZUZvcm1hdCIsInRvVXBwZXJDYXNlIiwiZ2V0VGhvdXNhbmRTZXBhcmF0b3IiLCJ0aG91c2FuZFNlcGFyYXRvciIsImdldERlY2ltYWxTZXBhcmF0b3IiLCJkZWNpbWFsU2VwYXJhdG9yIiwibm9ybWFsaXplRmlsdGVyaW5nRGF0YSIsIm5ld0ZpbHRlcmluZ0RhdGEiLCJvbGRGaWx0ZXJpbmdEYXRhIiwiaXNNYXAiLCJnZXQiLCJzZXQiLCJvcmlnQ29sdW1ucyIsImZpbHRlcmVkIiwic2VhcmNoQ29sIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBLE9BQU9BLE1BQVAsTUFBbUIsUUFBbkI7QUFDQSxPQUFPQyxLQUFQLE1BQWtCLGNBQWxCO0FBQ0EsU0FBU0MsVUFBVCxRQUEyQixNQUEzQjtBQUNBLFNBQVNDLEdBQVQsRUFBY0MsTUFBZCxFQUFzQkMsSUFBdEIsUUFBa0MsV0FBbEM7QUFDQSxTQUFTQyx1QkFBVCxRQUF3QywwQkFBeEM7O0FBRUEsSUFBTUMsWUFBWSxHQUFHLFNBQWZBLFlBQWUsQ0FBQUMsR0FBRztBQUFBLFNBQUlBLEdBQUcsQ0FBQ0MsU0FBSixJQUFpQkQsR0FBRyxDQUFDRSxZQUFKLENBQWlCQyxJQUFqQixDQUFzQixHQUF0QixDQUFyQjtBQUFBLENBQXhCOztBQUVBLElBQU1DLGlCQUFpQixHQUFHLFNBQXBCQSxpQkFBb0IsQ0FBQ0MsSUFBRCxFQUFPQyxhQUFQ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QUFJRixXQUFXLENBQUMvRyxJQUFaLEVBQ1Q7QUFDRjtBQUNBO0FBQ0EsZ0JBQUFqRCxHQUFHO0FBQUEsZUFBSTRGLElBQUksQ0FBQ2tDLFNBQUwsQ0FBZTlILEdBQUcsQ0FBQ0UsWUFBSixDQUFpQkMsSUFBakIsQ0FBc0IsR0FBdEIsQ0FBZixNQUErQ3lGLElBQUksQ0FBQ2tDLFNBQUwsQ0FBZW9DLFNBQWYsQ0FBbkQ7QUFBQSxPQUpRLENBQUo7QUFBQSxLQUZNLENBQWpCOztBQVNBLFdBQU9ELFFBQVEsQ0FBQ2hHLElBQVQsRUFBUDtBQUNEO0FBdmNZLENBQWYiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1uZXN0ZWQtdGVybmFyeSAqL1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IGlzTmFOIGZyb20gJ2xvZGFzaC9pc05hTic7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAndXRpbCc7XG5pbXBvcnQgeyBNYXAsIGZyb21KUywgTGlzdCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgeyBlc2NhcGVTcGVjaWFsQ2hhcmFjdGVycyB9IGZyb20gJ0BvcHVzY2FwaXRhL2Zvcm1hdC11dGlscyc7XG5cbmNvbnN0IGdldENvbHVtbktleSA9IGNvbCA9PiBjb2wuY29sdW1uS2V5IHx8IGNvbC52YWx1ZUtleVBhdGguam9pbignLycpO1xuXG5jb25zdCBnZXRWaXNpYmxlQ29sdW1ucyA9IChjb2xzLCBoaWRkZW5Db2x1bW5zID0gW10sIGNvbHVtbk9yZGVyID0gW10pID0+IHtcbiAgY29uc3Qgb3JkZXJlZENvbHVtbkxpc3QgPSBbXTtcbiAgY29scy5mb3JFYWNoKChjb2wsIGkpID0+IHtcbiAgICBjb25zdCBjb2x1bW5LZXkgPSBnZXRDb2x1bW5LZXkoY29sKTtcbiAgICBjb25zdCBjb2xPcmRlcklkeCA9IGNvbHVtbk9yZGVyLmluZGV4T2YoY29sdW1uS2V5KTtcbiAgICBjb25zdCBkZWZhdWx0SGlkZGVuID0gY29sLmlzSGlkZGVuICYmIGNvbE9yZGVySWR4ID09PSAtMTtcbiAgICBpZiAoZGVmYXVsdEhpZGRlbiB8fCBoaWRkZW5Db2x1bW5zLmluZGV4T2YoY29sdW1uS2V5KSA+IC0xKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG9yZGVyID0gY29sT3JkZXJJZHggIT09IC0xID8gY29sT3JkZXJJZHggOiBpICsgMTtcbiAgICBvcmRlcmVkQ29sdW1uTGlzdC5wdXNoKHtcbiAgICAgIGNvbHVtbktleSxcbiAgICAgIG9yZGVyLFxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIG9yZGVyZWRDb2x1bW5MaXN0LnNvcnQoKGEsIGIpID0+IGEub3JkZXIgLSBiLm9yZGVyKS5tYXAoaXRlbSA9PiBpdGVtLmNvbHVtbktleSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGdldENvbHVtbktleSxcbiAgZ2V0Q29sdW1uRGVmYXVsdFZhbHVlczogKGNvbHMpID0+IHtcbiAgICBjb25zdCBjb2x1bW5EZWZhdWx0VmFsdWVzID0ge307XG4gICAgY29scy5mb3JFYWNoKChjb2wpID0+IHtcbiAgICAgIGlmIChjb2wuZGVmYXVsdFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29sdW1uRGVmYXVsdFZhbHVlc1tnZXRDb2x1bW5LZXkoY29sKV0gPSBjb2wuZGVmYXVsdFZhbHVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBjb2x1bW5EZWZhdWx0VmFsdWVzO1xuICB9LFxuICBnZXRDZWxsU3R5bGVCeUNvbDogKGNvbCkgPT4ge1xuICAgIGlmIChjb2wuYWxpZ24pIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRleHRBbGlnbjogY29sLmFsaWduLFxuICAgICAgfTtcbiAgICB9XG4gICAgLy8gTm8gZGVmYXVsdCBhbGlnbiBpZiBjb21wb25lbnQgaXMgc2VsZWN0XG4gICAgLy8gQmVjYXVzZSByZW5kZXJlZCBkYXRhIGlzIG1vc3QgbGlrZWx5IHRleHRcbiAgICAvLyBFdmVuIGlmIHZhbHVlVHlwZSBpcyBudW1iZXJcbiAgICBpZiAoY29sLmNvbXBvbmVudFR5cGUgPT09ICdzZWxlY3QnIHx8IGNvbC5jb21wb25lbnRUeXBlID09PSAnbXVsdGlzZWxlY3QnKSB7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuICAgIHN3aXRjaCAoY29sLnZhbHVlVHlwZSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRleHRBbGlnbjogJ3JpZ2h0JyxcbiAgICAgICAgfTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gIH0sXG4gIGlzU29ydGFibGU6IGNvbCA9PiBjb2wudmFsdWVUeXBlXG4gICAgJiYgKGNvbC5zb3J0VmFsdWVHZXR0ZXIgfHwgY29sLnZhbHVlS2V5UGF0aClcbiAgICAmJiAhY29sLmRpc2FibGVTb3J0aW5nLFxuICBnZXRTb3J0Q29tcGFyYXRvcjogKGNvbCkgPT4ge1xuICAgIGlmIChjb2wuc29ydENvbXBhcmF0b3IpIHtcbiAgICAgIHJldHVybiBjb2wuc29ydENvbXBhcmF0b3I7XG4gICAgfVxuICAgIHN3aXRjaCAoY29sLnZhbHVlVHlwZSkge1xuICAgICAgY2FzZSAndGV4dCc6XG4gICAgICAgIHJldHVybiAoYSwgYikgPT4gKGEubG9jYWxlQ29tcGFyZSA/IGEubG9jYWxlQ29tcGFyZShiKSA6IDEpO1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgICAgcmV0dXJuIChhLCBiKSA9PiBhIC0gYjtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICByZXR1cm4gKGEsIGIpID0+IChhID09PSBiID8gMCA6IGEgPyAtMSA6IDEpO1xuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgIHJldHVybiAoYSwgYikgPT4gbmV3IERhdGUoYSkgLSBuZXcgRGF0ZShiKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAoYSwgYikgPT4gKGEubG9jYWxlQ29tcGFyZSA/IGEubG9jYWxlQ29tcGFyZShiKSA6IDEpO1xuICAgIH1cbiAgfSxcbiAgZ2V0U29ydFZhbHVlR2V0dGVyOiAoY29sKSA9PiB7XG4gICAgaWYgKGNvbC5zb3J0VmFsdWVHZXR0ZXIpIHtcbiAgICAgIHJldHVybiBjb2wuc29ydFZhbHVlR2V0dGVyO1xuICAgIH1cbiAgICByZXR1cm4gKGRhdGEpID0+IHtcbiAgICAgIGNvbnN0IGNlbGxEYXRhID0gZGF0YS5nZXRJbihjb2wudmFsdWVLZXlQYXRoKTtcbiAgICAgIC8vIERlYWwgd2l0aCBzZWxlY3QgYW5kIG11bHRpc2VsZWN0IGNvbXBvbmVudFR5cGVzXG4gICAgICBpZiAoY29sLnNlbGVjdENvbXBvbmVudE9wdGlvbnMpIHtcbiAgICAgICAgaWYgKExpc3QuaXNMaXN0KGNlbGxEYXRhKSB8fCBBcnJheS5pc0FycmF5KGNlbGxEYXRhKSkge1xuICAgICAgICAgIGNvbnN0IGxhYmVscyA9IFtdO1xuICAgICAgICAgIGNlbGxEYXRhLmZvckVhY2goKGQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZvdW5kID0gY29sLnNlbGVjdENvbXBvbmVudE9wdGlvbnMuZmluZChvID0+IG8udmFsdWUgPT09IGQpO1xuICAgICAgICAgICAgaWYgKGZvdW5kKSBsYWJlbHMucHVzaChmb3VuZC5sYWJlbCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIGxhYmVscy5qb2luKCcgJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZm91bmQgPSBjb2wuc2VsZWN0Q29tcG9uZW50T3B0aW9ucy5maW5kKG8gPT4gby52YWx1ZSA9PT0gY2VsbERhdGEpO1xuICAgICAgICBpZiAoZm91bmQpIHJldHVybiBmb3VuZC5sYWJlbDtcbiAgICAgIH1cbiAgICAgIGlmIChjZWxsRGF0YSAmJiBjZWxsRGF0YS5qb2luKSByZXR1cm4gY2VsbERhdGEuam9pbignICcpO1xuICAgICAgcmV0dXJuIGNlbGxEYXRhO1xuICAgIH07XG4gIH0sXG4gIGdldFZhbHVlRW1wdHlDaGVja2VyOiAoY29sKSA9PiB7XG4gICAgaWYgKGNvbC52YWx1ZUVtcHR5Q2hlY2tlcikge1xuICAgICAgcmV0dXJuIGNvbC52YWx1ZUVtcHR5Q2hlY2tlcjtcbiAgICB9XG4gICAgaWYgKGNvbC5jb21wb25lbnRUeXBlID09PSAnbXVsdGlzZWxlY3QnKSB7XG4gICAgICByZXR1cm4gdmFsID0+IHZhbCA9PT0gJycgfHwgdmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkIHx8IHZhbC5sZW5ndGggPT09IDAgfHwgdmFsLnNpemUgPT09IDA7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGNvbC52YWx1ZVR5cGUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICAgIHJldHVybiB2YWwgPT4gdmFsID09PSAnJyB8fCBpc05hTih2YWwpIHx8IHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZDtcbiAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgIGNhc2UgJ3NlbGVjdCc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdmFsID0+IHZhbCA9PT0gJycgfHwgdmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfSxcbiAgZ2V0RmlsdGVyTWF0Y2hlcjogKGNvbCwgZGF0ZUZvcm1hdCkgPT4ge1xuICAgIGlmIChjb2wuZmlsdGVyTWF0Y2hlcikgcmV0dXJuIGNvbC5maWx0ZXJNYXRjaGVyO1xuICAgIGNvbnN0IGdldFZhbCA9IHJvdyA9PiByb3cuZ2V0SW4oY29sLnZhbHVlS2V5UGF0aCk7XG5cbiAgICBpZiAoY29sLmNvbXBvbmVudFR5cGUgPT09ICdtdWx0aXNlbGVjdCcpIHtcbiAgICAgIHJldHVybiAocm93LCBmaWx0ZXJWYWwpID0+IHtcbiAgICAgICAgLy8gdmFsdWUgY2FuIGJlIHNpbXBsZSB2YWx1ZSwgaW1tdXRhYmxlIExpc3Qgb3IgYXJyYXlcbiAgICAgICAgY29uc3QgdmFsdWUgPSBnZXRWYWwocm93KTtcbiAgICAgICAgLy8gc2Vzc2lvbiBzdG9yYWdlIGNvbnRlbnQgaXMgY29udmVydGVkIHRvIGltbXV0YWJsZSBhbmQgbXVsdGlzZWxlY3RcbiAgICAgICAgLy8gZmlsdGVycyBpcyB0aGVuIGxpc3Qgb3RoZXJ3aXNlIGFycmF5XG4gICAgICAgIGNvbnN0IGZpbHRlcnMgPSBmaWx0ZXJWYWwgJiYgZmlsdGVyVmFsLnRvSlMgPyBmaWx0ZXJWYWwudG9KUygpIDogZmlsdGVyVmFsO1xuICAgICAgICByZXR1cm4gZmlsdGVycy5zb21lKChmaWx0ZXIpID0+IHtcbiAgICAgICAgICBpZiAoTGlzdC5pc0xpc3QodmFsdWUpIHx8IEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUuZmluZEluZGV4KHYgPT4gdiA9PT0gZmlsdGVyLnZhbHVlKSAhPT0gLTE7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmaWx0ZXIudmFsdWUgPT09IHZhbHVlO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgc3dpdGNoIChjb2wudmFsdWVUeXBlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICByZXR1cm4gKHJvdywgZmlsdGVyVmFsKSA9PiB7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBnZXRWYWwocm93KTtcbiAgICAgICAgICBpZiAodmFsdWUgPT09ICcnIHx8IGlzTmFOKHZhbHVlKSB8fCB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIG1hdGNoIGV4YWN0IG51bWJlciB2YWx1ZVxuICAgICAgICAgIGNvbnN0IGZpbHRlclZhbEludCA9IHBhcnNlSW50KGZpbHRlclZhbCwgMTApO1xuICAgICAgICAgIGNvbnN0IHZhbEludCA9IHBhcnNlSW50KHZhbHVlLCAxMCk7XG4gICAgICAgICAgaWYgKGZpbHRlclZhbEludCA9PT0gdmFsSW50IHx8IGZpbHRlclZhbEludCA9PT0gdmFsSW50ICogLTEpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBtYXRjaCBwYXJ0aWFsXG4gICAgICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSkuaW5jbHVkZXMoZmlsdGVyVmFsKTtcbiAgICAgICAgfTtcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgICAgcmV0dXJuIChyb3csIGZpbHRlclZhbCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gZ2V0VmFsKHJvdyk7XG4gICAgICAgICAgaWYgKHZhbHVlID09PSAnJyB8fCBpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBtYXRjaCBleGFjdCBmbG9hdCB2YWx1ZVxuICAgICAgICAgIGNvbnN0IGZpbHRlclZhbEZsb2F0ID0gcGFyc2VGbG9hdChmaWx0ZXJWYWwucmVwbGFjZSgnLCcsICcuJykpO1xuICAgICAgICAgIGlmIChmaWx0ZXJWYWxGbG9hdCA9PT0gcGFyc2VGbG9hdCh2YWx1ZSkgfHwgZmlsdGVyVmFsRmxvYXQgPT09IHBhcnNlRmxvYXQodmFsdWUpICogLTEpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBtYXRjaCBwYXJ0aWFsXG4gICAgICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSkucmVwbGFjZSgnLCcsICcuJykuaW5jbHVkZXMoZmlsdGVyVmFsLnJlcGxhY2UoJywnLCAnLicpKTtcbiAgICAgICAgfTtcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICByZXR1cm4gKHJvdywgZmlsdGVyVmFsKSA9PiB7XG4gICAgICAgICAgaWYgKG1vbWVudChnZXRWYWwocm93KSkuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gbW9tZW50KGdldFZhbChyb3cpKS5mb3JtYXQoZGF0ZUZvcm1hdCkgPT09IG1vbWVudChmaWx0ZXJWYWwpLmZvcm1hdChkYXRlRm9ybWF0KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9O1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIHJldHVybiAocm93LCBmaWx0ZXJWYWwpID0+ICEhZmlsdGVyVmFsID09PSAhIWdldFZhbChyb3cpO1xuICAgICAgY2FzZSAndGV4dCc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gKHJvdywgZmlsdGVyVmFsKSA9PiB7XG4gICAgICAgICAgLy8gRW5zdXJlIHZhbHVlIGlzIHRyaW1tZWQgc3RyaW5nXG4gICAgICAgICAgY29uc3QgdHJpbW1lZFZhbCA9IGZpbHRlclZhbC50cmltID8gZmlsdGVyVmFsLnRyaW0oKSA6IFN0cmluZyhmaWx0ZXJWYWwpO1xuICAgICAgICAgIC8vIGhhbmRsZSBzcGVjaWFsIGNoYXJhY3RlcnMgYnkgZXNjYXBpbmcgdGhlbVxuICAgICAgICAgIGNvbnN0IGVzY2FwZWRWYWwgPSBlc2NhcGVTcGVjaWFsQ2hhcmFjdGVycyh0cmltbWVkVmFsKTtcbiAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cChlc2NhcGVkVmFsLCAnaScpLnRlc3QoZ2V0VmFsKHJvdykpO1xuICAgICAgICB9O1xuICAgIH1cbiAgfSxcbiAgbG9hZFNlbGVjdGVkSXRlbXM6IChncmlkKSA9PiB7XG4gICAgY29uc3Qgc2Vzc2lvbkl0ZW0gPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX3NlbGVjdGVkSXRlbXNfJHtncmlkLmlkfWApO1xuICAgIGlmIChzZXNzaW9uSXRlbSAmJiAhZ3JpZC5kaXNhYmxlUmVtZW1iZXJTZWxlY3RlZEl0ZW1zKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShzZXNzaW9uSXRlbSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIHNlbGVjdGVkSXRlbXMgZnJvbSBzZXNzaW9uU3RvcmFnZScsIGUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH0sXG4gIGxvYWRHcmlkQ29uZmlnOiAoZ3JpZCwgY29scykgPT4ge1xuICAgIGNvbnN0IGNvbmZpZ1N0b3JhZ2UgPSBncmlkLmNvbmZpZ1N0b3JhZ2UgfHwge307XG4gICAgY29uc3Qgc29ydGluZ0RhdGEgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX3NvcnRpbmdfJHtncmlkLmlkfWApO1xuICAgIGNvbnN0IGZpbHRlckRhdGEgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX2ZpbHRlcmluZ18ke2dyaWQuaWR9YCk7XG4gICAgY29uc3QgaXNGaWx0ZXJpbmdEYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYG9jX2dyaWRfaXNGaWx0ZXJpbmdfJHtncmlkLmlkfWApO1xuICAgIGNvbnN0IHBhZ2UgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX3BhZ2VfJHtncmlkLmlkfWApO1xuICAgIGNvbnN0IHJvd3NPblBhZ2UgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX3Jvd3NPblBhZ2VfJHtncmlkLmlkfWApO1xuICAgIGxldCBsb2FkZWRDb25maWcgPSB7fTtcbiAgICBsZXQgaGlkZGVuQ29sdW1ucztcbiAgICBsZXQgY29sdW1uT3JkZXI7XG4gICAgbGV0IGlzRmlsdGVyaW5nID0gZmFsc2U7XG5cbiAgICBpZiAoaXNGdW5jdGlvbihjb25maWdTdG9yYWdlLmxvYWQpKSB7XG4gICAgICBsb2FkZWRDb25maWcgPSBjb25maWdTdG9yYWdlLmxvYWQoKTtcbiAgICB9XG5cbiAgICBpZiAoaXNGaWx0ZXJpbmdEYXRhKSB7XG4gICAgICBpZiAoIWdyaWQuZGlzYWJsZVJlbWVtYmVySXNGaWx0ZXJpbmcpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpc0ZpbHRlcmluZyA9IEpTT04ucGFyc2UoaXNGaWx0ZXJpbmdEYXRhKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgaXNGaWx0ZXJpbmdEYXRhIGZyb20gbG9jYWxTdG9yYWdlJywgZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGdyaWQuZGVmYXVsdFNob3dGaWx0ZXJpbmdSb3cpIHtcbiAgICAgIGlzRmlsdGVyaW5nID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGxvYWRlZENvbmZpZy5oaWRkZW5Db2x1bW5zKSB7XG4gICAgICBoaWRkZW5Db2x1bW5zID0gbG9hZGVkQ29uZmlnLmhpZGRlbkNvbHVtbnM7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaGlkZGVuQ29sdW1uc0pzb24gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgb2NfZ3JpZF9oaWRkZW5Db2x1bW5zXyR7Z3JpZC5pZH1gKTtcbiAgICAgIGlmIChoaWRkZW5Db2x1bW5zSnNvbikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGhpZGRlbkNvbHVtbnMgPSBKU09OLnBhcnNlKGhpZGRlbkNvbHVtbnNKc29uKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgaGlkZGVuQ29sdW1ucyBmcm9tIGxvY2FsU3RvcmFnZScsIGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChsb2FkZWRDb25maWcuY29sdW1uT3JkZXIpIHtcbiAgICAgIGNvbHVtbk9yZGVyID0gbG9hZGVkQ29uZmlnLmNvbHVtbk9yZGVyOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNvbHVtbk9yZGVySnNvbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX2NvbHVtbk9yZGVyXyR7Z3JpZC5pZH1gKTtcbiAgICAgIGlmIChjb2x1bW5PcmRlckpzb24pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb2x1bW5PcmRlciA9IEpTT04ucGFyc2UoY29sdW1uT3JkZXJKc29uKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgY29sdW1uT3JkZXIgZnJvbSBsb2NhbFN0b3JhZ2UnLCBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICB2aXNpYmxlQ29sdW1uczogZ2V0VmlzaWJsZUNvbHVtbnMoY29scywgaGlkZGVuQ29sdW1ucywgY29sdW1uT3JkZXIpLFxuICAgICAgZmlsdGVyaW5nRGF0YToge1xuICAgICAgICBpc0ZpbHRlcmluZyxcbiAgICAgIH0sXG4gICAgfTtcbiAgICBpZiAobG9hZGVkQ29uZmlnLmNvbHVtbldpZHRocykge1xuICAgICAgY29uZmlnLmNvbHVtbldpZHRocyA9IGxvYWRlZENvbmZpZy5jb2x1bW5XaWR0aHM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNvbHVtbldpZHRocyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBvY19ncmlkX2NvbHVtbldpZHRoc18ke2dyaWQuaWR9YCk7XG4gICAgICBpZiAoY29sdW1uV2lkdGhzICYmICFncmlkLmRpc2FibGVSZW1lbWJlckNvbHVtbldpZHRocykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbmZpZy5jb2x1bW5XaWR0aHMgPSBKU09OLnBhcnNlKGNvbHVtbldpZHRocyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIGNvbHVtbldpZHRocyBmcm9tIGxvY2FsU3RvcmFnZScsIGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzb3J0aW5nRGF0YSAmJiAhZ3JpZC5kaXNhYmxlUmVtZW1iZXJTb3J0RGF0YSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uZmlnLnNvcnRpbmdEYXRhID0gSlNPTi5wYXJzZShzb3J0aW5nRGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIHNvcnRpbmdEYXRhIGZyb20gc2Vzc2lvblN0b3JhZ2UnLCBlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGZpbHRlckRhdGEgJiYgaXNGaWx0ZXJpbmcgJiYgIWdyaWQuZGlzYWJsZVJlbWVtYmVyRmlsdGVyRGF0YSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uZmlnLmZpbHRlcmluZ0RhdGEuZmlsdGVyRGF0YSA9IEpTT04ucGFyc2UoZmlsdGVyRGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFncmlkOiBlcnJvciBwYXJzaW5nIGZpbHRlckRhdGEgZnJvbSBzZXNzaW9uU3RvcmFnZScsIGUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocGFnZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uZmlnLnBhZ2UgPSBKU09OLnBhcnNlKHBhZ2UpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhZ3JpZDogZXJyb3IgcGFyc2luZyBwYWdpbmF0aW9uIGZyb20gc2Vzc2lvblN0b3JhZ2UnLCBlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHJvd3NPblBhZ2UpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbmZpZy5yb3dzT25QYWdlID0gSlNPTi5wYXJzZShyb3dzT25QYWdlKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5lcnJvcignRGF0YWdyaWQ6IGVycm9yIHBhcnNpbmcgcGFnaW5hdGlvbiBmcm9tIHNlc3Npb25TdG9yYWdlJywgZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuc29ydGluZ0RhdGEgJiYgZ3JpZC5kZWZhdWx0U29ydENvbHVtbikge1xuICAgICAgY29uZmlnLnNvcnRpbmdEYXRhID0ge1xuICAgICAgICBzb3J0Q29sdW1uOiBncmlkLmRlZmF1bHRTb3J0Q29sdW1uLFxuICAgICAgICBzb3J0T3JkZXI6IGdyaWQuZGVmYXVsdFNvcnRPcmRlciB8fCAnYXNjJyxcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBjb25maWc7XG4gIH0sXG4gIHNhdmVTZWxlY3RlZEl0ZW1zOiAoZ3JpZCwgc2VsZWN0ZWRJdGVtcykgPT4ge1xuICAgIGlmIChncmlkLmRpc2FibGVSZW1lbWJlclNlbGVjdGVkSXRlbXMpIHJldHVybiBmYWxzZTtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX3NlbGVjdGVkSXRlbXNfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KHNlbGVjdGVkSXRlbXMgfHwgW10pKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgc2F2ZUNvbHVtbldpZHRoczogKGdyaWQsIGNvbHVtbldpZHRocykgPT4ge1xuICAgIGlmIChncmlkLmRpc2FibGVSZW1lbWJlckNvbHVtbldpZHRocykgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghY29sdW1uV2lkdGhzKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGdyaWQuY29uZmlnU3RvcmFnZSAmJiBpc0Z1bmN0aW9uKGdyaWQuY29uZmlnU3RvcmFnZS5zYXZlKSkge1xuICAgICAgZ3JpZC5jb25maWdTdG9yYWdlLnNhdmUoeyBjb2x1bW5XaWR0aHMgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGBvY19ncmlkX2NvbHVtbldpZHRoc18ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoY29sdW1uV2lkdGhzKSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBzYXZlQ29sdW1uU2V0dGluZ3M6IChncmlkLCBoaWRkZW5Db2x1bW5zLCBjb2x1bW5PcmRlcikgPT4ge1xuICAgIGlmICghaGlkZGVuQ29sdW1ucyB8fCAhY29sdW1uT3JkZXIpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoZ3JpZC5jb25maWdTdG9yYWdlICYmIGlzRnVuY3Rpb24oZ3JpZC5jb25maWdTdG9yYWdlLnNhdmUpKSB7XG4gICAgICBncmlkLmNvbmZpZ1N0b3JhZ2Uuc2F2ZSh7IGhpZGRlbkNvbHVtbnMsIGNvbHVtbk9yZGVyIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9oaWRkZW5Db2x1bW5zXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShoaWRkZW5Db2x1bW5zKSk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9jb2x1bW5PcmRlcl8ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkoY29sdW1uT3JkZXIpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIHNhdmVTb3J0RGF0YTogKGdyaWQsIHNvcnRpbmdEYXRhKSA9PiB7XG4gICAgaWYgKGdyaWQuZGlzYWJsZVJlbWVtYmVyU29ydERhdGEpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIXNvcnRpbmdEYXRhKSByZXR1cm4gZmFsc2U7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9zb3J0aW5nXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShzb3J0aW5nRGF0YSkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBzYXZlRmlsdGVyRGF0YTogKGdyaWQsIGZpbHRlckRhdGEpID0+IHtcbiAgICBpZiAoZ3JpZC5kaXNhYmxlUmVtZW1iZXJGaWx0ZXJEYXRhKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFmaWx0ZXJEYXRhKSByZXR1cm4gZmFsc2U7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9maWx0ZXJpbmdfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KGZpbHRlckRhdGEpKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgc2F2ZUlzRmlsdGVyaW5nOiAoZ3JpZCwgaXNGaWx0ZXJpbmcpID0+IHtcbiAgICBpZiAoZ3JpZC5kaXNhYmxlUmVtZW1iZXJJc0ZpbHRlcmluZykgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChpc0ZpbHRlcmluZyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZmFsc2U7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYG9jX2dyaWRfaXNGaWx0ZXJpbmdfJHtncmlkLmlkfWAsIEpTT04uc3RyaW5naWZ5KGlzRmlsdGVyaW5nKSk7XG4gICAgaWYgKCFpc0ZpbHRlcmluZykge1xuICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShgb2NfZ3JpZF9maWx0ZXJpbmdfJHtncmlkLmlkfWApO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgc2F2ZVBhZ2U6IChncmlkLCBwYWdlKSA9PiB7XG4gICAgaWYgKCFwYWdlKSByZXR1cm4gZmFsc2U7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShgb2NfZ3JpZF9wYWdlXyR7Z3JpZC5pZH1gLCBKU09OLnN0cmluZ2lmeShwYWdlKSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIHNhdmVSb3dzT25QYWdlOiAoZ3JpZCwgcm93c09uUGFnZSkgPT4ge1xuICAgIGlmICghcm93c09uUGFnZSkgcmV0dXJuIGZhbHNlO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oYG9jX2dyaWRfcm93c09uUGFnZV8ke2dyaWQuaWR9YCwgSlNPTi5zdHJpbmdpZnkocm93c09uUGFnZSkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICAvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG4gIGNoZWNrR3JpZFBhcmFtOiAoZ3JpZFBhcmFtKSA9PiB7XG4gICAgaWYgKGdyaWRQYXJhbSkge1xuICAgICAgaWYgKCFncmlkUGFyYW0uaWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdbR3JpZF0gSW52YWxpZCBgZ3JpZC5pZGAgcGFyYW1ldGVyLCB1cGRhdGUgYWN0aW9uIHBhcmFtZXRlcnMgdG8gbmV3IGZvcm1hdCEnLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKCFncmlkUGFyYW0uaWRLZXlQYXRoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnW0dyaWRdIEludmFsaWQgYGdyaWQuaWRLZXlQYXRoYCBwYXJhbWV0ZXIsIHVwZGF0ZSBhY3Rpb24gcGFyYW1ldGVycyB0byBuZXcgZm9ybWF0IScsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignW0dyaWRdIEludmFsaWQgYGdyaWRgIHBhcmFtZXRlciwgdXBkYXRlIGFjdGlvbiBwYXJhbWV0ZXJzIHRvIG5ldyBmb3JtYXQhJyk7XG4gICAgfVxuICB9LFxuICBjaGVja0NvbHVtbnNQYXJhbTogKGNvbHVtbnNQYXJhbSkgPT4ge1xuICAgIGlmICghY29sdW1uc1BhcmFtKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdbR3JpZF0gSW52YWxpZCBgY29sdW1uc2AgcGFyYW1ldGVyLCB1cGRhdGUgYWN0aW9uIHBhcmFtZXRlcnMgdG8gbmV3IGZvcm1hdCEnLFxuICAgICAgKTtcbiAgICB9XG4gIH0sXG4gIC8vIExvY2FsZSBnZXR0ZXJzLCBzdXBwb3J0IGdyaWQgcGFyYW0gb3IgdXNlciBzdGF0ZSB1c2VkIGluIE9DIGFwcGxpY2F0aW9uc1xuICBnZXRMYW5ndWFnZTogKGdyaWQsIG9jVXNlclN0YXRlKSA9PiB7XG4gICAgaWYgKGdyaWQubGFuZ3VhZ2UgJiYgdHlwZW9mIGdyaWQubGFuZ3VhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZ3JpZC5sYW5ndWFnZTtcbiAgICB9XG4gICAgaWYgKG9jVXNlclN0YXRlKSB7XG4gICAgICByZXR1cm4gb2NVc2VyU3RhdGUuZ2V0SW4oWyd1c2VyJywgJ2xhbmd1YWdlJ10sICdlbicpO1xuICAgIH1cbiAgICByZXR1cm4gJ2VuJztcbiAgfSxcbiAgZ2V0UmVnaW9uOiAoZ3JpZCwgb2NVc2VyU3RhdGUpID0+IHtcbiAgICBjb25zdCBkZWZhdWx0UmVnaW9uID0gJ2VuX0dCJztcbiAgICBpZiAoZ3JpZC5yZWdpb24gJiYgdHlwZW9mIGdyaWQucmVnaW9uID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGdyaWQucmVnaW9uO1xuICAgIH1cbiAgICBpZiAob2NVc2VyU3RhdGUpIHtcbiAgICAgIHJldHVybiBvY1VzZXJTdGF0ZS5nZXRJbihbJ3VzZXInLCAncmVnaW9uJ10sIGRlZmF1bHRSZWdpb24pO1xuICAgIH1cbiAgICByZXR1cm4gZGVmYXVsdFJlZ2lvbjtcbiAgfSxcbiAgZ2V0RGF0ZUZvcm1hdDogKGdyaWQsIG9jVXNlclN0YXRlKSA9PiB7XG4gICAgaWYgKGdyaWQuZGF0ZUZvcm1hdCAmJiB0eXBlb2YgZ3JpZC5kYXRlRm9ybWF0ID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGdyaWQuZGF0ZUZvcm1hdC50b1VwcGVyQ2FzZSgpO1xuICAgIH1cbiAgICBpZiAob2NVc2VyU3RhdGUpIHtcbiAgICAgIHJldHVybiBvY1VzZXJTdGF0ZS5nZXRJbihbJ2xvY2FsZUZvcm1hdCcsICdkYXRlRm9ybWF0J10sICdMJyk7XG4gICAgfVxuICAgIHJldHVybiAnTCc7XG4gIH0sXG4gIGdldFRob3VzYW5kU2VwYXJhdG9yOiAoZ3JpZCwgb2NVc2VyU3RhdGUpID0+IHtcbiAgICBpZiAoZ3JpZC50aG91c2FuZFNlcGFyYXRvciAmJiB0eXBlb2YgZ3JpZC5sYW5ndWFnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBncmlkLnRob3VzYW5kU2VwYXJhdG9yO1xuICAgIH1cbiAgICBpZiAob2NVc2VyU3RhdGUpIHtcbiAgICAgIHJldHVybiBvY1VzZXJTdGF0ZS5nZXRJbihbJ2xvY2FsZUZvcm1hdCcsICd0aG91c2FuZFNlcGFyYXRvciddKSB8fCAnICc7XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfSxcbiAgZ2V0RGVjaW1hbFNlcGFyYXRvcjogKGdyaWQsIG9jVXNlclN0YXRlKSA9PiB7XG4gICAgaWYgKGdyaWQuZGVjaW1hbFNlcGFyYXRvciAmJiB0eXBlb2YgZ3JpZC5sYW5ndWFnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBncmlkLmRlY2ltYWxTZXBhcmF0b3I7XG4gICAgfVxuICAgIGlmIChvY1VzZXJTdGF0ZSkge1xuICAgICAgcmV0dXJuIG9jVXNlclN0YXRlLmdldEluKFsnbG9jYWxlRm9ybWF0JywgJ2RlY2ltYWxTZXBhcmF0b3InXSwgJy4nKTtcbiAgICB9XG4gICAgcmV0dXJuICcuJztcbiAgfSxcbiAgbm9ybWFsaXplRmlsdGVyaW5nRGF0YTogKGZpbHRlcmluZ0RhdGEpID0+IHtcbiAgICBsZXQgbmV3RmlsdGVyaW5nRGF0YSA9IE1hcCh7IGlzRmlsdGVyaW5nOiBmYWxzZSB9KTtcbiAgICBpZiAoIWZpbHRlcmluZ0RhdGEpIHJldHVybiBuZXdGaWx0ZXJpbmdEYXRhO1xuXG4gICAgY29uc3Qgb2xkRmlsdGVyaW5nRGF0YSA9IE1hcC5pc01hcChmaWx0ZXJpbmdEYXRhKSA/IGZpbHRlcmluZ0RhdGEgOiBmcm9tSlMoZmlsdGVyaW5nRGF0YSk7XG4gICAgY29uc3QgaXNGaWx0ZXJpbmcgPSBvbGRGaWx0ZXJpbmdEYXRhLmdldCgnaXNGaWx0ZXJpbmcnLCBmYWxzZSk7XG4gICAgY29uc3QgZmlsdGVyRGF0YSA9IG9sZEZpbHRlcmluZ0RhdGEuZ2V0KCdmaWx0ZXJEYXRhJywgbnVsbCk7XG5cbiAgICBpZiAoaXNGaWx0ZXJpbmcgJiYgZmlsdGVyRGF0YSAmJiBNYXAuaXNNYXAoZmlsdGVyRGF0YSkpIHtcbiAgICAgIG5ld0ZpbHRlcmluZ0RhdGEgPSBuZXdGaWx0ZXJpbmdEYXRhLnNldCgnaXNGaWx0ZXJpbmcnLCB0cnVlKS5zZXQoJ2ZpbHRlckRhdGEnLCBmaWx0ZXJEYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3RmlsdGVyaW5nRGF0YTtcbiAgfSxcbiAgLypcbiAgICogQGZ1bmN0aW9uIHZpc2libGVDb2x1bW5zXG4gICAqIEBkZXNjICBSZXR1cm5zIGVpdGhlciB2aXNpYmxlIGNvbHVtbnMgKGlmIHNvbWUgY29sdW1ucyBhcmUgaGlkZGVuIClcbiAgICogICAgICAgIG9yIGdyaWQgZGVmYXVsdCBjb2x1bW5zLlxuICAgKiBAcGFyYW0gb3JpZ0NvbHVtbnMgQXJyYXkgb2YgR3JpZCBvcmlnaW5hbCBjb2x1bW5zIG9iamVjdHNcbiAgICogQHBhcmFtIHZpc2libGVDb2x1bW5zIEFycmF5IG9mIEdyaWQgdmlzaWJsZSBjb2x1bW5zIHZhbHVlS2V5UGF0aHNcbiAgICogQHJldHVybnMgQXJyYXkgb2YgY29sdW1uIG9iamVjdHMgY3VycmVudGx5IHZpc2libGUgZm9yIHVzZXIuXG4gICAqL1xuICB2aXNpYmxlQ29sdW1uczogKG9yaWdDb2x1bW5zLCB2aXNpYmxlQ29sdW1ucykgPT4ge1xuICAgIGlmICghdmlzaWJsZUNvbHVtbnMpIHJldHVybiBvcmlnQ29sdW1ucztcbiAgICBjb25zdCBmaWx0ZXJlZCA9IHZpc2libGVDb2x1bW5zLm1hcChcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIHNlYXJjaENvbCA9PiBvcmlnQ29sdW1ucy5maW5kKFxuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgLy8gdmFsdWVLZXlQYXRoIGlzIGpvaW5lZCBoZXJlIGFzIGl0IGNhbiBiZSBhbiBhcnJheSBsaWtlIFsna2V5MScsICdrZXkyJ10uXG4gICAgICAgIC8vIHNlYXJjaENvbCBpcyBzaW1pbGFybHkgam9pbmVkIGluIG9uQ2VsbEtleURvd24gaW4gZGF0YWdyaWQuY29tcG9uZW50LmpzeFxuICAgICAgICBjb2wgPT4gSlNPTi5zdHJpbmdpZnkoY29sLnZhbHVlS2V5UGF0aC5qb2luKCcvJykpID09PSBKU09OLnN0cmluZ2lmeShzZWFyY2hDb2wpLFxuICAgICAgKSxcbiAgICApO1xuICAgIHJldHVybiBmaWx0ZXJlZC50b0pTKCk7XG4gIH0sXG59O1xuIl19