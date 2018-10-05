'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _immutable = require('immutable');

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _reactBootstrap = require('react-bootstrap');

var _reactIntl = require('react-intl');

var _reactSelectOrderList = require('@opuscapita/react-select-order-list');

var _reactSelectOrderList2 = _interopRequireDefault(_reactSelectOrderList);

var _datagrid = require('../datagrid.props');

var _columnSettings = require('./column-settings.utils');

var _columnSettings2 = _interopRequireDefault(_columnSettings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ColumnSettings = (_temp = _class = function (_React$PureComponent) {
  _inherits(ColumnSettings, _React$PureComponent);

  function ColumnSettings(props) {
    _classCallCheck(this, ColumnSettings);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _this.handleCancelClick = function () {
      _this.props.closeColumnSettingsModal(_this.props.grid);
    };

    _this.handleOkClick = function () {
      var hiddenColumns = _columnSettings2.default.getHiddenColumns(_this.state.availableColumns, _this.state.selectedColumns);
      var columnOrders = _columnSettings2.default.getColumnOrders(_this.state.selectedColumns);
      _this.props.saveColumnSettings(_this.props.grid, hiddenColumns, columnOrders);
      _this.props.closeColumnSettingsModal(_this.props.grid);
    };

    _this.handleSelectionChange = function (data) {
      _this.setState({ allSelected: data.allSelected, selectedColumns: data.selectedData.toJS() });
    };

    var availableColumns = _columnSettings2.default.getAvailableColumns(props.columns);
    var selectedColumns = _columnSettings2.default.getSelectedColumns(props.columns, props.visibleColumns);
    _this.state = {
      availableColumns: availableColumns,
      selectedColumns: selectedColumns,
      allSelected: availableColumns.length === selectedColumns.length
    };
    return _this;
  }

  ColumnSettings.prototype.render = function render() {
    return _react2.default.createElement(
      _reactBootstrap.Modal,
      {
        bsSize: 'large',
        dialogClassName: 'oc-datagrid-column-settings-modal',
        'aria-labelledby': 'oc-datagrid-column-settings-modal',
        show: true,
        onHide: this.handleCancelClick
      },
      _react2.default.createElement(
        _reactBootstrap.Modal.Header,
        null,
        _react2.default.createElement(
          _reactBootstrap.Modal.Title,
          null,
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Grid.ColumnSettings.Header' })
        )
      ),
      _react2.default.createElement(
        _reactBootstrap.Modal.Body,
        null,
        _react2.default.createElement(_reactSelectOrderList2.default, {
          allSelected: this.state.allSelected,
          availableData: (0, _immutable.List)(this.state.availableColumns),
          id: 'ocDatagridColumnSettings-' + this.props.grid.id,
          onChange: this.handleSelectionChange,
          selectedData: (0, _immutable.List)(this.state.selectedColumns),
          translations: {
            allLabel: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Grid.ColumnSettings.All' }),
            availableListLabel: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Grid.ColumnSettings.AvailableColumns' }),
            selectedListLabel: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Grid.ColumnSettings.SelectedColumns' }),
            searchTooltip: _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Grid.ColumnSettings.SearchTooltip' })
          }
        })
      ),
      _react2.default.createElement(
        _reactBootstrap.Modal.Footer,
        null,
        _react2.default.createElement(
          _reactBootstrap.Button,
          {
            id: 'ocDatagridColumnSettings-' + this.props.grid.id + '-ok-button',
            bsStyle: 'primary',
            onClick: this.handleOkClick
          },
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Grid.Ok' })
        ),
        _react2.default.createElement(
          _reactBootstrap.Button,
          {
            id: 'ocDatagridColumnSettings-' + this.props.grid.id + '-cancel-button',
            onClick: this.handleCancelClick
          },
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'Grid.Cancel' })
        )
      )
    );
  };

  return ColumnSettings;
}(_react2.default.PureComponent), _class.propTypes = {
  grid: _datagrid.gridShape.isRequired,
  columns: _propTypes2.default.arrayOf(_propTypes2.default.shape()).isRequired,
  visibleColumns: _reactImmutableProptypes2.default.list.isRequired,
  closeColumnSettingsModal: _propTypes2.default.func.isRequired,
  saveColumnSettings: _propTypes2.default.func.isRequired
}, _temp);
exports.default = ColumnSettings;