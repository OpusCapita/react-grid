'use strict';

exports.__esModule = true;

var _datagrid = require('../datagrid.utils');

var _datagrid2 = _interopRequireDefault(_datagrid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  getAvailableColumns: function getAvailableColumns(columns) {
    return columns.map(function (col) {
      var value = _datagrid2.default.getColumnKey(col);
      var label = col.header;
      var isLocked = col.isLocked;

      return { isLocked: isLocked, label: label, value: value };
    });
  },
  getSelectedColumns: function getSelectedColumns(columns, visibleColumns) {
    var selectedColumns = [];
    visibleColumns.forEach(function (value) {
      columns.forEach(function (col) {
        if (_datagrid2.default.getColumnKey(col) === value) {
          var label = col.header;
          var isLocked = col.isLocked;

          selectedColumns.push({ isLocked: isLocked, label: label, value: value });
        }
      });
    });
    return selectedColumns;
  },
  getHiddenColumns: function getHiddenColumns(availableColumns, selectedColumns) {
    var hiddenColumns = [];
    availableColumns.forEach(function (col) {
      if (selectedColumns.findIndex(function (i) {
        return i.value === col.value;
      }) === -1) {
        hiddenColumns.push(col.value);
      }
    });
    return hiddenColumns;
  },
  getColumnOrders: function getColumnOrders(selectedColumns) {
    return selectedColumns.map(function (col) {
      return col.value;
    });
  }
};