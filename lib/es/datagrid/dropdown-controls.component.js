var _class, _temp2;

var _templateObject = _taggedTemplateLiteralLoose(['\n  color: ', ';\n  margin: ', ';\n  padding: ', ';\n  transform: rotate(', ');\n'], ['\n  color: ', ';\n  margin: ', ';\n  padding: ', ';\n  transform: rotate(', ');\n']);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FaToggleOn from 'react-icons/lib/fa/toggle-on';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { FormattedMessage as M } from 'react-intl';

import { DropdownMenu } from '@opuscapita/react-dropdown';

import { gridShape } from './datagrid.props';

import './dropdown-controls.component.scss';

var TOGGLE_ON_COLOR = '#3AA57B';
var TOGGLE_OFF_COLOR = '#67707C';
var TOGGLE_SIZE = 20;

// ToggleIconComponent
var Toggle = styled(FaToggleOn)(_templateObject, function (props) {
  return props.color;
}, function (props) {
  return props.margin || 0;
}, function (props) {
  return props.padding || 0;
}, function (props) {
  return props.rotate ? props.rotate + 'deg' : '';
});

var DropdownControls = (_temp2 = _class = function (_React$PureComponent) {
  _inherits(DropdownControls, _React$PureComponent);

  function DropdownControls() {
    var _temp, _this, _ret;

    _classCallCheck(this, DropdownControls);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.handleRemoveClick = function () {
      if (_this.props.selectedItems.size > 0) {
        _this.props.onRemove();
      }
    }, _this.handleToggleFilteringClick = function () {
      _this.props.toggleFiltering(_this.props.grid);
    }, _this.handleColumnSettingsClick = function () {
      _this.props.openColumnSettingsModal(_this.props.grid);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  DropdownControls.prototype.render = function render() {
    var disabled = this.props.isBusy || this.props.isCreating || this.props.isEditing || this.props.disableActions;
    var menuItems = [];
    if (this.props.filtering) {
      menuItems.push({
        id: this.props.grid.id + '-menu-item-filtering',
        title: React.createElement(M, { id: 'Grid.ShowFilteringRow' }),
        icon: this.props.isFiltering ? React.createElement(Toggle, { color: TOGGLE_ON_COLOR, size: TOGGLE_SIZE }) : React.createElement(Toggle, { rotate: '180', color: TOGGLE_OFF_COLOR, size: TOGGLE_SIZE }),
        onClick: this.handleToggleFilteringClick
      });
    }
    if (this.props.dropdownMenuItems && this.props.dropdownMenuItems.length) {
      menuItems = menuItems.concat(this.props.dropdownMenuItems);
    }
    if (this.props.columnSettings) {
      menuItems.push({
        id: this.props.grid.id + '-menu-item-column-settings',
        title: React.createElement(M, { id: 'Grid.ColumnSettings' }),
        onClick: this.handleColumnSettingsClick
      });
    }
    if (this.props.removing) {
      menuItems.push({
        id: this.props.grid.id + '-menu-item-delete',
        title: React.createElement(M, { id: 'Grid.Delete' }),
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
}(React.PureComponent), _class.defaultProps = {
  filtering: false,
  removing: false,
  columnSettings: false,
  dropdownMenuItems: [],
  disableActions: false
}, _temp2);
export { DropdownControls as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kcm9wZG93bi1jb250cm9scy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwic3R5bGVkIiwiRmFUb2dnbGVPbiIsIkltbXV0YWJsZVByb3BUeXBlcyIsIkZvcm1hdHRlZE1lc3NhZ2UiLCJNIiwiRHJvcGRvd25NZW51IiwiZ3JpZFNoYXBlIiwiVE9HR0xFX09OX0NPTE9SIiwiVE9HR0xFX09GRl9DT0xPUiIsIlRPR0dMRV9TSVpFIiwiVG9nZ2xlIiwicHJvcHMiLCJjb2xvciIsIm1hcmdpbiIsInBhZGRpbmciLCJyb3RhdGUiLCJEcm9wZG93bkNvbnRyb2xzIiwiaGFuZGxlUmVtb3ZlQ2xpY2siLCJzZWxlY3RlZEl0ZW1zIiwic2l6ZSIsIm9uUmVtb3ZlIiwiaGFuZGxlVG9nZ2xlRmlsdGVyaW5nQ2xpY2siLCJ0b2dnbGVGaWx0ZXJpbmciLCJncmlkIiwiaGFuZGxlQ29sdW1uU2V0dGluZ3NDbGljayIsIm9wZW5Db2x1bW5TZXR0aW5nc01vZGFsIiwicmVuZGVyIiwiZGlzYWJsZWQiLCJpc0J1c3kiLCJpc0NyZWF0aW5nIiwiaXNFZGl0aW5nIiwiZGlzYWJsZUFjdGlvbnMiLCJtZW51SXRlbXMiLCJmaWx0ZXJpbmciLCJwdXNoIiwiaWQiLCJ0aXRsZSIsImljb24iLCJpc0ZpbHRlcmluZyIsIm9uQ2xpY2siLCJkcm9wZG93bk1lbnVJdGVtcyIsImxlbmd0aCIsImNvbmNhdCIsImNvbHVtblNldHRpbmdzIiwicmVtb3ZpbmciLCJoYXMiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTtBQUNBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsT0FBT0MsTUFBUCxNQUFtQixtQkFBbkI7QUFDQSxPQUFPQyxVQUFQLE1BQXVCLDhCQUF2QjtBQUNBLE9BQU9DLGtCQUFQLE1BQStCLDJCQUEvQjtBQUNBLFNBQVNDLG9CQUFvQkMsQ0FBN0IsUUFBc0MsWUFBdEM7O0FBRUEsU0FBU0MsWUFBVCxRQUE2Qiw0QkFBN0I7O0FBRUEsU0FBU0MsU0FBVCxRQUEwQixrQkFBMUI7O0FBRUEsT0FBTyxvQ0FBUDs7QUFFQSxJQUFNQyxrQkFBa0IsU0FBeEI7QUFDQSxJQUFNQyxtQkFBbUIsU0FBekI7QUFDQSxJQUFNQyxjQUFjLEVBQXBCOztBQUVBO0FBQ0EsSUFBTUMsU0FBU1YsT0FBT0MsVUFBUCxDQUFULGtCQUNLO0FBQUEsU0FBU1UsTUFBTUMsS0FBZjtBQUFBLENBREwsRUFFTTtBQUFBLFNBQVNELE1BQU1FLE1BQU4sSUFBZ0IsQ0FBekI7QUFBQSxDQUZOLEVBR087QUFBQSxTQUFTRixNQUFNRyxPQUFOLElBQWlCLENBQTFCO0FBQUEsQ0FIUCxFQUlnQjtBQUFBLFNBQVVILE1BQU1JLE1BQU4sR0FBa0JKLE1BQU1JLE1BQXhCLFdBQXNDLEVBQWhEO0FBQUEsQ0FKaEIsQ0FBTjs7SUFPcUJDLGdCOzs7Ozs7Ozs7Ozs7Z0tBNkJuQkMsaUIsR0FBb0IsWUFBTTtBQUN4QixVQUFJLE1BQUtOLEtBQUwsQ0FBV08sYUFBWCxDQUF5QkMsSUFBekIsR0FBZ0MsQ0FBcEMsRUFBdUM7QUFDckMsY0FBS1IsS0FBTCxDQUFXUyxRQUFYO0FBQ0Q7QUFDRixLLFFBRURDLDBCLEdBQTZCLFlBQU07QUFDakMsWUFBS1YsS0FBTCxDQUFXVyxlQUFYLENBQTJCLE1BQUtYLEtBQUwsQ0FBV1ksSUFBdEM7QUFDRCxLLFFBRURDLHlCLEdBQTRCLFlBQU07QUFDaEMsWUFBS2IsS0FBTCxDQUFXYyx1QkFBWCxDQUFtQyxNQUFLZCxLQUFMLENBQVdZLElBQTlDO0FBQ0QsSzs7OzZCQUVERyxNLHFCQUFTO0FBQ1AsUUFBTUMsV0FBVyxLQUFLaEIsS0FBTCxDQUFXaUIsTUFBWCxJQUNBLEtBQUtqQixLQUFMLENBQVdrQixVQURYLElBRUEsS0FBS2xCLEtBQUwsQ0FBV21CLFNBRlgsSUFHQSxLQUFLbkIsS0FBTCxDQUFXb0IsY0FINUI7QUFJQSxRQUFJQyxZQUFZLEVBQWhCO0FBQ0EsUUFBSSxLQUFLckIsS0FBTCxDQUFXc0IsU0FBZixFQUEwQjtBQUN4QkQsZ0JBQVVFLElBQVYsQ0FBZTtBQUNiQyxZQUFPLEtBQUt4QixLQUFMLENBQVdZLElBQVgsQ0FBZ0JZLEVBQXZCLHlCQURhO0FBRWJDLGVBQU8sb0JBQUMsQ0FBRCxJQUFHLElBQUcsdUJBQU4sR0FGTTtBQUdiQyxjQUFNLEtBQUsxQixLQUFMLENBQVcyQixXQUFYLEdBQ0osb0JBQUMsTUFBRCxJQUFRLE9BQU8vQixlQUFmLEVBQWdDLE1BQU1FLFdBQXRDLEdBREksR0FHSixvQkFBQyxNQUFELElBQVEsUUFBTyxLQUFmLEVBQXFCLE9BQU9ELGdCQUE1QixFQUE4QyxNQUFNQyxXQUFwRCxHQU5XO0FBT2I4QixpQkFBUyxLQUFLbEI7QUFQRCxPQUFmO0FBU0Q7QUFDRCxRQUFJLEtBQUtWLEtBQUwsQ0FBVzZCLGlCQUFYLElBQWdDLEtBQUs3QixLQUFMLENBQVc2QixpQkFBWCxDQUE2QkMsTUFBakUsRUFBeUU7QUFDdkVULGtCQUFZQSxVQUFVVSxNQUFWLENBQWlCLEtBQUsvQixLQUFMLENBQVc2QixpQkFBNUIsQ0FBWjtBQUNEO0FBQ0QsUUFBSSxLQUFLN0IsS0FBTCxDQUFXZ0MsY0FBZixFQUErQjtBQUM3QlgsZ0JBQVVFLElBQVYsQ0FBZTtBQUNiQyxZQUFPLEtBQUt4QixLQUFMLENBQVdZLElBQVgsQ0FBZ0JZLEVBQXZCLCtCQURhO0FBRWJDLGVBQU8sb0JBQUMsQ0FBRCxJQUFHLElBQUcscUJBQU4sR0FGTTtBQUdiRyxpQkFBUyxLQUFLZjtBQUhELE9BQWY7QUFLRDtBQUNELFFBQUksS0FBS2IsS0FBTCxDQUFXaUMsUUFBZixFQUF5QjtBQUN2QlosZ0JBQVVFLElBQVYsQ0FBZTtBQUNiQyxZQUFPLEtBQUt4QixLQUFMLENBQVdZLElBQVgsQ0FBZ0JZLEVBQXZCLHNCQURhO0FBRWJDLGVBQU8sb0JBQUMsQ0FBRCxJQUFHLElBQUcsYUFBTixHQUZNO0FBR2JULGtCQUFVLENBQUMsS0FBS2hCLEtBQUwsQ0FBV08sYUFBWCxDQUF5QjJCLEdBQXpCLENBQTZCLENBQTdCLENBSEU7QUFJYk4saUJBQVMsS0FBS3RCO0FBSkQsT0FBZjtBQU1EO0FBQ0QsV0FDRSxvQkFBQyxZQUFEO0FBQ0UsVUFBSSxLQUFLTixLQUFMLENBQVdZLElBQVgsQ0FBZ0JZLEVBRHRCO0FBRUUsZ0JBQVVSLFFBRlo7QUFHRSxpQkFBV0s7QUFIYixNQURGO0FBT0QsRzs7O0VBckYyQ2xDLE1BQU1nRCxhLFVBcUIzQ0MsWSxHQUFlO0FBQ3BCZCxhQUFXLEtBRFM7QUFFcEJXLFlBQVUsS0FGVTtBQUdwQkQsa0JBQWdCLEtBSEk7QUFJcEJILHFCQUFtQixFQUpDO0FBS3BCVCxrQkFBZ0I7QUFMSSxDO1NBckJIZixnQiIsImZpbGUiOiJkcm9wZG93bi1jb250cm9scy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9mb3JiaWQtcHJvcC10eXBlcyAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBGYVRvZ2dsZU9uIGZyb20gJ3JlYWN0LWljb25zL2xpYi9mYS90b2dnbGUtb24nO1xuaW1wb3J0IEltbXV0YWJsZVByb3BUeXBlcyBmcm9tICdyZWFjdC1pbW11dGFibGUtcHJvcHR5cGVzJztcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgYXMgTSB9IGZyb20gJ3JlYWN0LWludGwnO1xuXG5pbXBvcnQgeyBEcm9wZG93bk1lbnUgfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1kcm9wZG93bic7XG5cbmltcG9ydCB7IGdyaWRTaGFwZSB9IGZyb20gJy4vZGF0YWdyaWQucHJvcHMnO1xuXG5pbXBvcnQgJy4vZHJvcGRvd24tY29udHJvbHMuY29tcG9uZW50LnNjc3MnO1xuXG5jb25zdCBUT0dHTEVfT05fQ09MT1IgPSAnIzNBQTU3Qic7XG5jb25zdCBUT0dHTEVfT0ZGX0NPTE9SID0gJyM2NzcwN0MnO1xuY29uc3QgVE9HR0xFX1NJWkUgPSAyMDtcblxuLy8gVG9nZ2xlSWNvbkNvbXBvbmVudFxuY29uc3QgVG9nZ2xlID0gc3R5bGVkKEZhVG9nZ2xlT24pYFxuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy5jb2xvcn07XG4gIG1hcmdpbjogJHtwcm9wcyA9PiBwcm9wcy5tYXJnaW4gfHwgMH07XG4gIHBhZGRpbmc6ICR7cHJvcHMgPT4gcHJvcHMucGFkZGluZyB8fCAwfTtcbiAgdHJhbnNmb3JtOiByb3RhdGUoJHtwcm9wcyA9PiAocHJvcHMucm90YXRlID8gYCR7cHJvcHMucm90YXRlfWRlZ2AgOiAnJyl9KTtcbmA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyb3Bkb3duQ29udHJvbHMgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBncmlkOiBncmlkU2hhcGUuaXNSZXF1aXJlZCxcbiAgICAvLyBhY3Rpb25zXG4gICAgdG9nZ2xlRmlsdGVyaW5nOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9wZW5Db2x1bW5TZXR0aW5nc01vZGFsOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIC8vIGRhdGFcbiAgICBzZWxlY3RlZEl0ZW1zOiBJbW11dGFibGVQcm9wVHlwZXMubGlzdC5pc1JlcXVpcmVkLFxuICAgIGlzQnVzeTogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpc0NyZWF0aW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGlzRWRpdGluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpc0ZpbHRlcmluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICAvLyBjb25maWdcbiAgICBvblJlbW92ZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBmaWx0ZXJpbmc6IFByb3BUeXBlcy5ib29sLFxuICAgIHJlbW92aW5nOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBjb2x1bW5TZXR0aW5nczogUHJvcFR5cGVzLmJvb2wsXG4gICAgZHJvcGRvd25NZW51SXRlbXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBkaXNhYmxlQWN0aW9uczogUHJvcFR5cGVzLmJvb2wsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBmaWx0ZXJpbmc6IGZhbHNlLFxuICAgIHJlbW92aW5nOiBmYWxzZSxcbiAgICBjb2x1bW5TZXR0aW5nczogZmFsc2UsXG4gICAgZHJvcGRvd25NZW51SXRlbXM6IFtdLFxuICAgIGRpc2FibGVBY3Rpb25zOiBmYWxzZSxcbiAgfTtcblxuICBoYW5kbGVSZW1vdmVDbGljayA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLnNpemUgPiAwKSB7XG4gICAgICB0aGlzLnByb3BzLm9uUmVtb3ZlKCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlVG9nZ2xlRmlsdGVyaW5nQ2xpY2sgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy50b2dnbGVGaWx0ZXJpbmcodGhpcy5wcm9wcy5ncmlkKTtcbiAgfVxuXG4gIGhhbmRsZUNvbHVtblNldHRpbmdzQ2xpY2sgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vcGVuQ29sdW1uU2V0dGluZ3NNb2RhbCh0aGlzLnByb3BzLmdyaWQpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGRpc2FibGVkID0gdGhpcy5wcm9wcy5pc0J1c3lcbiAgICAgICAgICAgICAgICAgIHx8IHRoaXMucHJvcHMuaXNDcmVhdGluZ1xuICAgICAgICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5pc0VkaXRpbmdcbiAgICAgICAgICAgICAgICAgIHx8IHRoaXMucHJvcHMuZGlzYWJsZUFjdGlvbnM7XG4gICAgbGV0IG1lbnVJdGVtcyA9IFtdO1xuICAgIGlmICh0aGlzLnByb3BzLmZpbHRlcmluZykge1xuICAgICAgbWVudUl0ZW1zLnB1c2goe1xuICAgICAgICBpZDogYCR7dGhpcy5wcm9wcy5ncmlkLmlkfS1tZW51LWl0ZW0tZmlsdGVyaW5nYCxcbiAgICAgICAgdGl0bGU6IDxNIGlkPVwiR3JpZC5TaG93RmlsdGVyaW5nUm93XCIgLz4sXG4gICAgICAgIGljb246IHRoaXMucHJvcHMuaXNGaWx0ZXJpbmcgP1xuICAgICAgICAgIDxUb2dnbGUgY29sb3I9e1RPR0dMRV9PTl9DT0xPUn0gc2l6ZT17VE9HR0xFX1NJWkV9IC8+XG4gICAgICAgICAgOlxuICAgICAgICAgIDxUb2dnbGUgcm90YXRlPVwiMTgwXCIgY29sb3I9e1RPR0dMRV9PRkZfQ09MT1J9IHNpemU9e1RPR0dMRV9TSVpFfSAvPixcbiAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVUb2dnbGVGaWx0ZXJpbmdDbGljayxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5kcm9wZG93bk1lbnVJdGVtcyAmJiB0aGlzLnByb3BzLmRyb3Bkb3duTWVudUl0ZW1zLmxlbmd0aCkge1xuICAgICAgbWVudUl0ZW1zID0gbWVudUl0ZW1zLmNvbmNhdCh0aGlzLnByb3BzLmRyb3Bkb3duTWVudUl0ZW1zKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuY29sdW1uU2V0dGluZ3MpIHtcbiAgICAgIG1lbnVJdGVtcy5wdXNoKHtcbiAgICAgICAgaWQ6IGAke3RoaXMucHJvcHMuZ3JpZC5pZH0tbWVudS1pdGVtLWNvbHVtbi1zZXR0aW5nc2AsXG4gICAgICAgIHRpdGxlOiA8TSBpZD1cIkdyaWQuQ29sdW1uU2V0dGluZ3NcIiAvPixcbiAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVDb2x1bW5TZXR0aW5nc0NsaWNrLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLnJlbW92aW5nKSB7XG4gICAgICBtZW51SXRlbXMucHVzaCh7XG4gICAgICAgIGlkOiBgJHt0aGlzLnByb3BzLmdyaWQuaWR9LW1lbnUtaXRlbS1kZWxldGVgLFxuICAgICAgICB0aXRsZTogPE0gaWQ9XCJHcmlkLkRlbGV0ZVwiIC8+LFxuICAgICAgICBkaXNhYmxlZDogIXRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5oYXMoMCksXG4gICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlUmVtb3ZlQ2xpY2ssXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxEcm9wZG93bk1lbnVcbiAgICAgICAgaWQ9e3RoaXMucHJvcHMuZ3JpZC5pZH1cbiAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICBtZW51SXRlbXM9e21lbnVJdGVtc31cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxufVxuIl19