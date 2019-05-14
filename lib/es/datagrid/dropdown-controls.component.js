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

var DropdownControls =
/*#__PURE__*/
function (_React$PureComponent) {
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
        title: React.createElement(M, {
          id: "Grid.ShowFilteringRow"
        }),
        icon: this.props.isFiltering ? React.createElement(Toggle, {
          color: TOGGLE_ON_COLOR,
          size: TOGGLE_SIZE
        }) : React.createElement(Toggle, {
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
        title: React.createElement(M, {
          id: "Grid.ColumnSettings"
        }),
        onClick: this.handleColumnSettingsClick
      });
    }

    if (this.props.removing) {
      menuItems.push({
        id: this.props.grid.id + "-menu-item-delete",
        title: React.createElement(M, {
          id: "Grid.Delete"
        }),
        disabled: !this.props.selectedItems.has(0),
        onClick: this.handleRemoveClick
      });
    }

    return React.createElement(DropdownMenu, {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kcm9wZG93bi1jb250cm9scy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwic3R5bGVkIiwiRmFUb2dnbGVPbiIsIkltbXV0YWJsZVByb3BUeXBlcyIsIkZvcm1hdHRlZE1lc3NhZ2UiLCJNIiwiRHJvcGRvd25NZW51IiwiZ3JpZFNoYXBlIiwiVE9HR0xFX09OX0NPTE9SIiwiVE9HR0xFX09GRl9DT0xPUiIsIlRPR0dMRV9TSVpFIiwiVG9nZ2xlIiwicHJvcHMiLCJjb2xvciIsIm1hcmdpbiIsInBhZGRpbmciLCJyb3RhdGUiLCJEcm9wZG93bkNvbnRyb2xzIiwic2VsZWN0ZWRJdGVtcyIsInNpemUiLCJvblJlbW92ZSIsInRvZ2dsZUZpbHRlcmluZyIsImdyaWQiLCJvcGVuQ29sdW1uU2V0dGluZ3NNb2RhbCIsInJlbmRlciIsImRpc2FibGVkIiwiaXNCdXN5IiwiaXNDcmVhdGluZyIsImlzRWRpdGluZyIsImRpc2FibGVBY3Rpb25zIiwibWVudUl0ZW1zIiwiZmlsdGVyaW5nIiwicHVzaCIsImlkIiwidGl0bGUiLCJpY29uIiwiaXNGaWx0ZXJpbmciLCJvbkNsaWNrIiwiaGFuZGxlVG9nZ2xlRmlsdGVyaW5nQ2xpY2siLCJkcm9wZG93bk1lbnVJdGVtcyIsImxlbmd0aCIsImNvbmNhdCIsImNvbHVtblNldHRpbmdzIiwiaGFuZGxlQ29sdW1uU2V0dGluZ3NDbGljayIsInJlbW92aW5nIiwiaGFzIiwiaGFuZGxlUmVtb3ZlQ2xpY2siLCJQdXJlQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsT0FBT0MsTUFBUCxNQUFtQixtQkFBbkI7QUFDQSxTQUFTQyxVQUFULFFBQTJCLGdCQUEzQjtBQUNBLE9BQU9DLGtCQUFQLE1BQStCLDJCQUEv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RUFBRSxvQkFBQyxDQUFEO0FBQUcsVUFBQSxFQUFFLEVBQUM7QUFBTixVQUZNO0FBR2JHLFFBQUFBLE9BQU8sRUFBRSxLQUFLTTtBQUhELE9BQWY7QUFLRDs7QUFDRCxRQUFJLEtBQUsvQixLQUFMLENBQVdnQyxRQUFmLEVBQXlCO0FBQ3ZCZCxNQUFBQSxTQUFTLENBQUNFLElBQVYsQ0FBZTtBQUNiQyxRQUFBQSxFQUFFLEVBQUssS0FBS3JCLEtBQUwsQ0FBV1UsSUFBWCxDQUFnQlcsRUFBckIsc0JBRFc7QUFFYkMsUUFBQUEsS0FBSyxFQUFFLG9CQUFDLENBQUQ7QUFBRyxVQUFBLEVBQUUsRUFBQztBQUFOLFVBRk07QUFHYlQsUUFBQUEsUUFBUSxFQUFFLENBQUMsS0FBS2IsS0FBTCxDQUFXTSxhQUFYLENBQXlCMkIsR0FBekIsQ0FBNkIsQ0FBN0IsQ0FIRTtBQUliUixRQUFBQSxPQUFPLEVBQUUsS0FBS1M7QUFKRCxPQUFmO0FBTUQ7O0FBQ0QsV0FBTyxvQkFBQyxZQUFEO0FBQWMsTUFBQSxFQUFFLEVBQUUsS0FBS2xDLEtBQUwsQ0FBV1UsSUFBWCxDQUFnQlcsRUFBbEM7QUFBc0MsTUFBQSxRQUFRLEVBQUVSLFFBQWhEO0FBQTBELE1BQUEsU0FBUyxFQUFFSztBQUFyRSxNQUFQO0FBQ0QsRzs7O0VBaEYyQy9CLEtBQUssQ0FBQ2dELGE7O2dCQUEvQjlCLGdCLGtCQXFCRztBQUNwQmMsRUFBQUEsU0FBUyxFQUFFLEtBRFM7QUFFcEJhLEVBQUFBLFFBQVEsRUFBRSxLQUZVO0FBR3BCRixFQUFBQSxjQUFjLEVBQUUsS0FISTtBQUlwQkgsRUFBQUEsaUJBQWlCLEVBQUUsRUFKQztBQUtwQlYsRUFBQUEsY0FBYyxFQUFFO0FBTEksQzs7U0FyQkhaLGdCIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3QvZm9yYmlkLXByb3AtdHlwZXMgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgeyBGYVRvZ2dsZU9uIH0gZnJvbSAncmVhY3QtaWNvbnMvZmEnO1xuaW1wb3J0IEltbXV0YWJsZVByb3BUeXBlcyBmcm9tICdyZWFjdC1pbW11dGFibGUtcHJvcHR5cGVzJztcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgYXMgTSB9IGZyb20gJ3JlYWN0LWludGwnO1xuXG5pbXBvcnQgeyBEcm9wZG93bk1lbnUgfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1kcm9wZG93bic7XG5cbmltcG9ydCB7IGdyaWRTaGFwZSB9IGZyb20gJy4vZGF0YWdyaWQucHJvcHMnO1xuXG5pbXBvcnQgJy4vZHJvcGRvd24tY29udHJvbHMuY29tcG9uZW50LnNjc3MnO1xuXG5jb25zdCBUT0dHTEVfT05fQ09MT1IgPSAnIzNBQTU3Qic7XG5jb25zdCBUT0dHTEVfT0ZGX0NPTE9SID0gJyM2NzcwN0MnO1xuY29uc3QgVE9HR0xFX1NJWkUgPSAyMDtcblxuLy8gVG9nZ2xlSWNvbkNvbXBvbmVudFxuY29uc3QgVG9nZ2xlID0gc3R5bGVkKEZhVG9nZ2xlT24pYFxuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy5jb2xvcn07XG4gIG1hcmdpbjogJHtwcm9wcyA9PiBwcm9wcy5tYXJnaW4gfHwgMH07XG4gIHBhZGRpbmc6ICR7cHJvcHMgPT4gcHJvcHMucGFkZGluZyB8fCAwfTtcbiAgdHJhbnNmb3JtOiByb3RhdGUoJHtwcm9wcyA9PiAocHJvcHMucm90YXRlID8gYCR7cHJvcHMucm90YXRlfWRlZ2AgOiAnJyl9KTtcbmA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyb3Bkb3duQ29udHJvbHMgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBncmlkOiBncmlkU2hhcGUuaXNSZXF1aXJlZCxcbiAgICAvLyBhY3Rpb25zXG4gICAgdG9nZ2xlRmlsdGVyaW5nOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9wZW5Db2x1bW5TZXR0aW5nc01vZGFsOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIC8vIGRhdGFcbiAgICBzZWxlY3RlZEl0ZW1zOiBJbW11dGFibGVQcm9wVHlwZXMubGlzdC5pc1JlcXVpcmVkLFxuICAgIGlzQnVzeTogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpc0NyZWF0aW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGlzRWRpdGluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpc0ZpbHRlcmluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICAvLyBjb25maWdcbiAgICBvblJlbW92ZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBmaWx0ZXJpbmc6IFByb3BUeXBlcy5ib29sLFxuICAgIHJlbW92aW5nOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBjb2x1bW5TZXR0aW5nczogUHJvcFR5cGVzLmJvb2wsXG4gICAgZHJvcGRvd25NZW51SXRlbXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBkaXNhYmxlQWN0aW9uczogUHJvcFR5cGVzLmJvb2wsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBmaWx0ZXJpbmc6IGZhbHNlLFxuICAgIHJlbW92aW5nOiBmYWxzZSxcbiAgICBjb2x1bW5TZXR0aW5nczogZmFsc2UsXG4gICAgZHJvcGRvd25NZW51SXRlbXM6IFtdLFxuICAgIGRpc2FibGVBY3Rpb25zOiBmYWxzZSxcbiAgfTtcblxuICBoYW5kbGVSZW1vdmVDbGljayA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLnNpemUgPiAwKSB7XG4gICAgICB0aGlzLnByb3BzLm9uUmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZVRvZ2dsZUZpbHRlcmluZ0NsaWNrID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMudG9nZ2xlRmlsdGVyaW5nKHRoaXMucHJvcHMuZ3JpZCk7XG4gIH07XG5cbiAgaGFuZGxlQ29sdW1uU2V0dGluZ3NDbGljayA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLm9wZW5Db2x1bW5TZXR0aW5nc01vZGFsKHRoaXMucHJvcHMuZ3JpZCk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGRpc2FibGVkID0gdGhpcy5wcm9wcy5pc0J1c3lcbiAgICAgIHx8IHRoaXMucHJvcHMuaXNDcmVhdGluZ1xuICAgICAgfHwgdGhpcy5wcm9wcy5pc0VkaXRpbmdcbiAgICAgIHx8IHRoaXMucHJvcHMuZGlzYWJsZUFjdGlvbnM7XG4gICAgbGV0IG1lbnVJdGVtcyA9IFtdO1xuICAgIGlmICh0aGlzLnByb3BzLmZpbHRlcmluZykge1xuICAgICAgbWVudUl0ZW1zLnB1c2goe1xuICAgICAgICBpZDogYCR7dGhpcy5wcm9wcy5ncmlkLmlkfS1tZW51LWl0ZW0tZmlsdGVyaW5nYCxcbiAgICAgICAgdGl0bGU6IDxNIGlkPVwiR3JpZC5TaG93RmlsdGVyaW5nUm93XCIgLz4sXG4gICAgICAgIGljb246IHRoaXMucHJvcHMuaXNGaWx0ZXJpbmcgPyAoXG4gICAgICAgICAgPFRvZ2dsZSBjb2xvcj17VE9HR0xFX09OX0NPTE9SfSBzaXplPXtUT0dHTEVfU0laRX0gLz5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8VG9nZ2xlIHJvdGF0ZT1cIjE4MFwiIGNvbG9yPXtUT0dHTEVfT0ZGX0NPTE9SfSBzaXplPXtUT0dHTEVfU0laRX0gLz5cbiAgICAgICAgKSxcbiAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVUb2dnbGVGaWx0ZXJpbmdDbGljayxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5kcm9wZG93bk1lbnVJdGVtcyAmJiB0aGlzLnByb3BzLmRyb3Bkb3duTWVudUl0ZW1zLmxlbmd0aCkge1xuICAgICAgbWVudUl0ZW1zID0gbWVudUl0ZW1zLmNvbmNhdCh0aGlzLnByb3BzLmRyb3Bkb3duTWVudUl0ZW1zKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuY29sdW1uU2V0dGluZ3MpIHtcbiAgICAgIG1lbnVJdGVtcy5wdXNoKHtcbiAgICAgICAgaWQ6IGAke3RoaXMucHJvcHMuZ3JpZC5pZH0tbWVudS1pdGVtLWNvbHVtbi1zZXR0aW5nc2AsXG4gICAgICAgIHRpdGxlOiA8TSBpZD1cIkdyaWQuQ29sdW1uU2V0dGluZ3NcIiAvPixcbiAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVDb2x1bW5TZXR0aW5nc0NsaWNrLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLnJlbW92aW5nKSB7XG4gICAgICBtZW51SXRlbXMucHVzaCh7XG4gICAgICAgIGlkOiBgJHt0aGlzLnByb3BzLmdyaWQuaWR9LW1lbnUtaXRlbS1kZWxldGVgLFxuICAgICAgICB0aXRsZTogPE0gaWQ9XCJHcmlkLkRlbGV0ZVwiIC8+LFxuICAgICAgICBkaXNhYmxlZDogIXRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5oYXMoMCksXG4gICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlUmVtb3ZlQ2xpY2ssXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIDxEcm9wZG93bk1lbnUgaWQ9e3RoaXMucHJvcHMuZ3JpZC5pZH0gZGlzYWJsZWQ9e2Rpc2FibGVkfSBtZW51SXRlbXM9e21lbnVJdGVtc30gLz47XG4gIH1cbn1cbiJdfQ==