function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n  color: ", ";\n  margin: ", ";\n  padding: ", ";\n  transform: rotate(", ");\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteralLoose(strings, raw) { if (!raw) { raw = strings.slice(0); } strings.raw = raw; return strings; }

/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaToggleOn } from 'react-icons/fa';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { FormattedMessage as M } from 'react-intl';
import { DropdownMenu } from '@opuscapita/react-dropdown';
import { gridShape } from './datagrid.props';
import './dropdown-controls.component.scss';
var TOGGLE_ON_COLOR = '#3AA57B';
var TOGGLE_OFF_COLOR = '#67707C';
var TOGGLE_SIZE = 20; // ToggleIconComponent

var Toggle = styled(FaToggleOn)(_templateObject(), function (props) {
  return props.color;
}, function (props) {
  return props.margin || 0;
}, function (props) {
  return props.padding || 0;
}, function (props) {
  return props.rotate ? props.rotate + "deg" : '';
});

var DropdownControls = /*#__PURE__*/function (_React$PureComponent) {
  _inheritsLoose(DropdownControls, _React$PureComponent);

  function DropdownControls() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "handleRemoveClick", function () {
      if (_this.props.selectedItems.size > 0) {
        _this.props.onRemove();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleToggleFilteringClick", function () {
      _this.props.toggleFiltering(_this.props.grid);
    });

    _defineProperty(_assertThisInitialized(_this), "handleColumnSettingsClick", function () {
      _this.props.openColumnSettingsModal(_this.props.grid);
    });

    return _this;
  }

  var _proto = DropdownControls.prototype;

  _proto.render = function render() {
    var disabled = this.props.isBusy || this.props.isCreating || this.props.isEditing || this.props.disableActions;
    var menuItems = [];

    if (this.props.filtering) {
      menuItems.push({
        id: this.props.grid.id + "-menu-item-filtering",
        title: /*#__PURE__*/React.createElement(M, {
          id: "Grid.ShowFilteringRow"
        }),
        icon: this.props.isFiltering ? /*#__PURE__*/React.createElement(Toggle, {
          color: TOGGLE_ON_COLOR,
          size: TOGGLE_SIZE
        }) : /*#__PURE__*/React.createElement(Toggle, {
          rotate: "180",
          color: TOGGLE_OFF_COLOR,
          size: TOGGLE_SIZE
        }),
        onClick: this.handleToggleFilteringClick
      });
    }

    if (this.props.dropdownMenuItems && this.props.dropdownMenuItems.length) {
      menuItems = menuItems.concat(this.props.dropdownMenuItems);
    }

    if (this.props.columnSettings) {
      menuItems.push({
        id: this.props.grid.id + "-menu-item-column-settings",
        title: /*#__PURE__*/React.createElement(M, {
          id: "Grid.ColumnSettings"
        }),
        onClick: this.handleColumnSettingsClick
      });
    }

    if (this.props.removing) {
      menuItems.push({
        id: this.props.grid.id + "-menu-item-delete",
        title: /*#__PURE__*/React.createElement(M, {
          id: "Grid.Delete"
        }),
        disabled: !this.props.selectedItems.has(0),
        onClick: this.handleRemoveClick
      });
    }

    return /*#__PURE__*/React.createElement(DropdownMenu, {
      id: this.props.grid.id,
      disabled: disabled,
      menuItems: menuItems
    });
  };

  return DropdownControls;
}(React.PureComponent);

_defineProperty(DropdownControls, "defaultProps", {
  filtering: false,
  removing: false,
  columnSettings: false,
  dropdownMenuItems: [],
  disableActions: false
});

export { DropdownControls as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kcm9wZG93bi1jb250cm9scy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwic3R5bGVkIiwiRmFUb2dnbGVPbiIsIkltbXV0YWJsZVByb3BUeXBlcyIsIkZvcm1hdHRlZE1lc3NhZ2UiLCJNIiwiRHJvcGRvd25NZW51IiwiZ3JpZFNoYXBlIiwiVE9HR0xFX09OX0NPTE9SIiwiVE9HR0xFX09GRl9DT0xPUiIsIlRPR0dMRV9TSVpFIiwiVG9nZ2xlIiwicHJvcHMiLCJjb2xvciIsIm1hcmdpbiIsInBhZGRpbmciLCJyb3RhdGUiLCJEcm9wZG93bkNvbnRyb2xzIiwic2VsZWN0ZWRJdGVtcyIsInNpemUiLCJvblJlbW92ZSIsInRvZ2dsZUZpbHRlcmluZyIsImdyaWQiLCJvcGVuQ29sdW1uU2V0dGluZ3NNb2RhbCIsInJlbmRlciIsImRpc2FibGVkIiwiaXNCdXN5IiwiaXNDcmVhdGluZyIsImlzRWRpdGluZyIsImRpc2FibGVBY3Rpb25zIiwibWVudUl0ZW1zIiwiZmlsdGVyaW5nIiwicHVzaCIsImlkIiwidGl0bGUiLCJpY29uIiwiaXNGaWx0ZXJpbmciLCJvbkNsaWNrIiwiaGFuZGxlVG9nZ2xlRmlsdGVyaW5nQ2xpY2siLCJkcm9wZG93bk1lbnVJdGVtcyIsImxlbmd0aCIsImNvbmNhdCIsImNvbHVtblNldHRpbmdzIiwiaGFuZGxlQ29sdW1uU2V0dGluZ3NDbGljayIsInJlbW92aW5nIiwiaGFzIiwiaGFuZGxlUmVtb3ZlQ2xpY2siLCJQdXJlQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsT0FBT0MsTUFBUCxNQUFtQixtQkFBbkI7QUFDQSxTQUFTQyxVQUFULFFBQTJCLGdCQUEzQjtBQUNBLE9BQU9DLGtCQUFQLE1BQStCLDJCQUEv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ZUFBRSxvQkFBQyxDQUFEO0FBQUcsVUFBQSxFQUFFLEVBQUM7QUFBTixVQUZNO0FBR2JHLFFBQUFBLE9BQU8sRUFBRSxLQUFLTTtBQUhELE9BQWY7QUFLRDs7QUFDRCxRQUFJLEtBQUsvQixLQUFMLENBQVdnQyxRQUFmLEVBQXlCO0FBQ3ZCZCxNQUFBQSxTQUFTLENBQUNFLElBQVYsQ0FBZTtBQUNiQyxRQUFBQSxFQUFFLEVBQUssS0FBS3JCLEtBQUwsQ0FBV1UsSUFBWCxDQUFnQlcsRUFBckIsc0JBRFc7QUFFYkMsUUFBQUEsS0FBSyxlQUFFLG9CQUFDLENBQUQ7QUFBRyxVQUFBLEVBQUUsRUFBQztBQUFOLFVBRk07QUFHYlQsUUFBQUEsUUFBUSxFQUFFLENBQUMsS0FBS2IsS0FBTCxDQUFXTSxhQUFYLENBQXlCMkIsR0FBekIsQ0FBNkIsQ0FBN0IsQ0FIRTtBQUliUixRQUFBQSxPQUFPLEVBQUUsS0FBS1M7QUFKRCxPQUFmO0FBTUQ7O0FBQ0Qsd0JBQU8sb0JBQUMsWUFBRDtBQUFjLE1BQUEsRUFBRSxFQUFFLEtBQUtsQyxLQUFMLENBQVdVLElBQVgsQ0FBZ0JXLEVBQWxDO0FBQXNDLE1BQUEsUUFBUSxFQUFFUixRQUFoRDtBQUEwRCxNQUFBLFNBQVMsRUFBRUs7QUFBckUsTUFBUDtBQUNELEc7OztFQWhGMkMvQixLQUFLLENBQUNnRCxhOztnQkFBL0I5QixnQixrQkFxQkc7QUFDcEJjLEVBQUFBLFNBQVMsRUFBRSxLQURTO0FBRXBCYSxFQUFBQSxRQUFRLEVBQUUsS0FGVTtBQUdwQkYsRUFBQUEsY0FBYyxFQUFFLEtBSEk7QUFJcEJILEVBQUFBLGlCQUFpQixFQUFFLEVBSkM7QUFLcEJWLEVBQUFBLGNBQWMsRUFBRTtBQUxJLEM7O1NBckJIWixnQiIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L2ZvcmJpZC1wcm9wLXR5cGVzICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgRmFUb2dnbGVPbiB9IGZyb20gJ3JlYWN0LWljb25zL2ZhJztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlIGFzIE0gfSBmcm9tICdyZWFjdC1pbnRsJztcblxuaW1wb3J0IHsgRHJvcGRvd25NZW51IH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtZHJvcGRvd24nO1xuXG5pbXBvcnQgeyBncmlkU2hhcGUgfSBmcm9tICcuL2RhdGFncmlkLnByb3BzJztcblxuaW1wb3J0ICcuL2Ryb3Bkb3duLWNvbnRyb2xzLmNvbXBvbmVudC5zY3NzJztcblxuY29uc3QgVE9HR0xFX09OX0NPTE9SID0gJyMzQUE1N0InO1xuY29uc3QgVE9HR0xFX09GRl9DT0xPUiA9ICcjNjc3MDdDJztcbmNvbnN0IFRPR0dMRV9TSVpFID0gMjA7XG5cbi8vIFRvZ2dsZUljb25Db21wb25lbnRcbmNvbnN0IFRvZ2dsZSA9IHN0eWxlZChGYVRvZ2dsZU9uKWBcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMuY29sb3J9O1xuICBtYXJnaW46ICR7cHJvcHMgPT4gcHJvcHMubWFyZ2luIHx8IDB9O1xuICBwYWRkaW5nOiAke3Byb3BzID0+IHByb3BzLnBhZGRpbmcgfHwgMH07XG4gIHRyYW5zZm9ybTogcm90YXRlKCR7cHJvcHMgPT4gKHByb3BzLnJvdGF0ZSA/IGAke3Byb3BzLnJvdGF0ZX1kZWdgIDogJycpfSk7XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEcm9wZG93bkNvbnRyb2xzIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgZ3JpZDogZ3JpZFNoYXBlLmlzUmVxdWlyZWQsXG4gICAgLy8gYWN0aW9uc1xuICAgIHRvZ2dsZUZpbHRlcmluZzogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvcGVuQ29sdW1uU2V0dGluZ3NNb2RhbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAvLyBkYXRhXG4gICAgc2VsZWN0ZWRJdGVtczogSW1tdXRhYmxlUHJvcFR5cGVzLmxpc3QuaXNSZXF1aXJlZCxcbiAgICBpc0J1c3k6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgaXNDcmVhdGluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpc0VkaXRpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgaXNGaWx0ZXJpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgLy8gY29uZmlnXG4gICAgb25SZW1vdmU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgZmlsdGVyaW5nOiBQcm9wVHlwZXMuYm9vbCxcbiAgICByZW1vdmluZzogUHJvcFR5cGVzLmJvb2wsXG4gICAgY29sdW1uU2V0dGluZ3M6IFByb3BUeXBlcy5ib29sLFxuICAgIGRyb3Bkb3duTWVudUl0ZW1zOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgZGlzYWJsZUFjdGlvbnM6IFByb3BUeXBlcy5ib29sLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgZmlsdGVyaW5nOiBmYWxzZSxcbiAgICByZW1vdmluZzogZmFsc2UsXG4gICAgY29sdW1uU2V0dGluZ3M6IGZhbHNlLFxuICAgIGRyb3Bkb3duTWVudUl0ZW1zOiBbXSxcbiAgICBkaXNhYmxlQWN0aW9uczogZmFsc2UsXG4gIH07XG5cbiAgaGFuZGxlUmVtb3ZlQ2xpY2sgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5zaXplID4gMCkge1xuICAgICAgdGhpcy5wcm9wcy5vblJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVUb2dnbGVGaWx0ZXJpbmdDbGljayA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLnRvZ2dsZUZpbHRlcmluZyh0aGlzLnByb3BzLmdyaWQpO1xuICB9O1xuXG4gIGhhbmRsZUNvbHVtblNldHRpbmdzQ2xpY2sgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vcGVuQ29sdW1uU2V0dGluZ3NNb2RhbCh0aGlzLnByb3BzLmdyaWQpO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBkaXNhYmxlZCA9IHRoaXMucHJvcHMuaXNCdXN5XG4gICAgICB8fCB0aGlzLnByb3BzLmlzQ3JlYXRpbmdcbiAgICAgIHx8IHRoaXMucHJvcHMuaXNFZGl0aW5nXG4gICAgICB8fCB0aGlzLnByb3BzLmRpc2FibGVBY3Rpb25zO1xuICAgIGxldCBtZW51SXRlbXMgPSBbXTtcbiAgICBpZiAodGhpcy5wcm9wcy5maWx0ZXJpbmcpIHtcbiAgICAgIG1lbnVJdGVtcy5wdXNoKHtcbiAgICAgICAgaWQ6IGAke3RoaXMucHJvcHMuZ3JpZC5pZH0tbWVudS1pdGVtLWZpbHRlcmluZ2AsXG4gICAgICAgIHRpdGxlOiA8TSBpZD1cIkdyaWQuU2hvd0ZpbHRlcmluZ1Jvd1wiIC8+LFxuICAgICAgICBpY29uOiB0aGlzLnByb3BzLmlzRmlsdGVyaW5nID8gKFxuICAgICAgICAgIDxUb2dnbGUgY29sb3I9e1RPR0dMRV9PTl9DT0xPUn0gc2l6ZT17VE9HR0xFX1NJWkV9IC8+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPFRvZ2dsZSByb3RhdGU9XCIxODBcIiBjb2xvcj17VE9HR0xFX09GRl9DT0xPUn0gc2l6ZT17VE9HR0xFX1NJWkV9IC8+XG4gICAgICAgICksXG4gICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlVG9nZ2xlRmlsdGVyaW5nQ2xpY2ssXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuZHJvcGRvd25NZW51SXRlbXMgJiYgdGhpcy5wcm9wcy5kcm9wZG93bk1lbnVJdGVtcy5sZW5ndGgpIHtcbiAgICAgIG1lbnVJdGVtcyA9IG1lbnVJdGVtcy5jb25jYXQodGhpcy5wcm9wcy5kcm9wZG93bk1lbnVJdGVtcyk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLmNvbHVtblNldHRpbmdzKSB7XG4gICAgICBtZW51SXRlbXMucHVzaCh7XG4gICAgICAgIGlkOiBgJHt0aGlzLnByb3BzLmdyaWQuaWR9LW1lbnUtaXRlbS1jb2x1bW4tc2V0dGluZ3NgLFxuICAgICAgICB0aXRsZTogPE0gaWQ9XCJHcmlkLkNvbHVtblNldHRpbmdzXCIgLz4sXG4gICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlQ29sdW1uU2V0dGluZ3NDbGljayxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5yZW1vdmluZykge1xuICAgICAgbWVudUl0ZW1zLnB1c2goe1xuICAgICAgICBpZDogYCR7dGhpcy5wcm9wcy5ncmlkLmlkfS1tZW51LWl0ZW0tZGVsZXRlYCxcbiAgICAgICAgdGl0bGU6IDxNIGlkPVwiR3JpZC5EZWxldGVcIiAvPixcbiAgICAgICAgZGlzYWJsZWQ6ICF0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuaGFzKDApLFxuICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZVJlbW92ZUNsaWNrLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiA8RHJvcGRvd25NZW51IGlkPXt0aGlzLnByb3BzLmdyaWQuaWR9IGRpc2FibGVkPXtkaXNhYmxlZH0gbWVudUl0ZW1zPXttZW51SXRlbXN9IC8+O1xuICB9XG59XG4iXX0=