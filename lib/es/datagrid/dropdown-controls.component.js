var _class, _temp2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { FormattedMessage as M } from 'react-intl';
import { Icon } from '@opuscapita/react-icons';
import { DropdownMenu } from '@opuscapita/react-dropdown';

import { gridShape } from './datagrid.props';

import './dropdown-controls.component.scss';

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
        icon: this.props.isFiltering ? React.createElement(Icon, {
          type: 'indicator',
          name: 'ok',
          width: 18,
          height: 18
        }) : undefined,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kcm9wZG93bi1jb250cm9scy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiSW1tdXRhYmxlUHJvcFR5cGVzIiwiRm9ybWF0dGVkTWVzc2FnZSIsIk0iLCJJY29uIiwiRHJvcGRvd25NZW51IiwiZ3JpZFNoYXBlIiwiRHJvcGRvd25Db250cm9scyIsImhhbmRsZVJlbW92ZUNsaWNrIiwicHJvcHMiLCJzZWxlY3RlZEl0ZW1zIiwic2l6ZSIsIm9uUmVtb3ZlIiwiaGFuZGxlVG9nZ2xlRmlsdGVyaW5nQ2xpY2siLCJ0b2dnbGVGaWx0ZXJpbmciLCJncmlkIiwiaGFuZGxlQ29sdW1uU2V0dGluZ3NDbGljayIsIm9wZW5Db2x1bW5TZXR0aW5nc01vZGFsIiwicmVuZGVyIiwiZGlzYWJsZWQiLCJpc0J1c3kiLCJpc0NyZWF0aW5nIiwiaXNFZGl0aW5nIiwiZGlzYWJsZUFjdGlvbnMiLCJtZW51SXRlbXMiLCJmaWx0ZXJpbmciLCJwdXNoIiwiaWQiLCJ0aXRsZSIsImljb24iLCJpc0ZpbHRlcmluZyIsInVuZGVmaW5lZCIsIm9uQ2xpY2siLCJkcm9wZG93bk1lbnVJdGVtcyIsImxlbmd0aCIsImNvbmNhdCIsImNvbHVtblNldHRpbmdzIiwicmVtb3ZpbmciLCJoYXMiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0EsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxPQUFPQyxrQkFBUCxNQUErQiwyQkFBL0I7QUFDQSxTQUFTQyxvQkFBb0JDLENBQTdCLFFBQXNDLFlBQXRDO0FBQ0EsU0FBU0MsSUFBVCxRQUFxQix5QkFBckI7QUFDQSxTQUFTQyxZQUFULFFBQTZCLDRCQUE3Qjs7QUFFQSxTQUFTQyxTQUFULFFBQTBCLGtCQUExQjs7QUFHQSxPQUFPLG9DQUFQOztJQUVxQkMsZ0I7Ozs7Ozs7Ozs7OztnS0E2Qm5CQyxpQixHQUFvQixZQUFNO0FBQ3hCLFVBQUksTUFBS0MsS0FBTCxDQUFXQyxhQUFYLENBQXlCQyxJQUF6QixHQUFnQyxDQUFwQyxFQUF1QztBQUNyQyxjQUFLRixLQUFMLENBQVdHLFFBQVg7QUFDRDtBQUNGLEssUUFFREMsMEIsR0FBNkIsWUFBTTtBQUNqQyxZQUFLSixLQUFMLENBQVdLLGVBQVgsQ0FBMkIsTUFBS0wsS0FBTCxDQUFXTSxJQUF0QztBQUNELEssUUFFREMseUIsR0FBNEIsWUFBTTtBQUNoQyxZQUFLUCxLQUFMLENBQVdRLHVCQUFYLENBQW1DLE1BQUtSLEtBQUwsQ0FBV00sSUFBOUM7QUFDRCxLOzs7NkJBRURHLE0scUJBQVM7QUFDUCxRQUFNQyxXQUFXLEtBQUtWLEtBQUwsQ0FBV1csTUFBWCxJQUNBLEtBQUtYLEtBQUwsQ0FBV1ksVUFEWCxJQUVBLEtBQUtaLEtBQUwsQ0FBV2EsU0FGWCxJQUdBLEtBQUtiLEtBQUwsQ0FBV2MsY0FINUI7QUFJQSxRQUFJQyxZQUFZLEVBQWhCO0FBQ0EsUUFBSSxLQUFLZixLQUFMLENBQVdnQixTQUFmLEVBQTBCO0FBQ3hCRCxnQkFBVUUsSUFBVixDQUFlO0FBQ2JDLFlBQU8sS0FBS2xCLEtBQUwsQ0FBV00sSUFBWCxDQUFnQlksRUFBdkIseUJBRGE7QUFFYkMsZUFBTyxvQkFBQyxDQUFELElBQUcsSUFBRyx1QkFBTixHQUZNO0FBR2JDLGNBQU0sS0FBS3BCLEtBQUwsQ0FBV3FCLFdBQVgsR0FDSixvQkFBQyxJQUFEO0FBQ0UsZ0JBQUssV0FEUDtBQUVFLGdCQUFLLElBRlA7QUFHRSxpQkFBTyxFQUhUO0FBSUUsa0JBQVE7QUFKVixVQURJLEdBTUNDLFNBVE07QUFVYkMsaUJBQVMsS0FBS25CO0FBVkQsT0FBZjtBQVlEO0FBQ0QsUUFBSSxLQUFLSixLQUFMLENBQVd3QixpQkFBWCxJQUFnQyxLQUFLeEIsS0FBTCxDQUFXd0IsaUJBQVgsQ0FBNkJDLE1BQWpFLEVBQXlFO0FBQ3ZFVixrQkFBWUEsVUFBVVcsTUFBVixDQUFpQixLQUFLMUIsS0FBTCxDQUFXd0IsaUJBQTVCLENBQVo7QUFDRDtBQUNELFFBQUksS0FBS3hCLEtBQUwsQ0FBVzJCLGNBQWYsRUFBK0I7QUFDN0JaLGdCQUFVRSxJQUFWLENBQWU7QUFDYkMsWUFBTyxLQUFLbEIsS0FBTCxDQUFXTSxJQUFYLENBQWdCWSxFQUF2QiwrQkFEYTtBQUViQyxlQUFPLG9CQUFDLENBQUQsSUFBRyxJQUFHLHFCQUFOLEdBRk07QUFHYkksaUJBQVMsS0FBS2hCO0FBSEQsT0FBZjtBQUtEO0FBQ0QsUUFBSSxLQUFLUCxLQUFMLENBQVc0QixRQUFmLEVBQXlCO0FBQ3ZCYixnQkFBVUUsSUFBVixDQUFlO0FBQ2JDLFlBQU8sS0FBS2xCLEtBQUwsQ0FBV00sSUFBWCxDQUFnQlksRUFBdkIsc0JBRGE7QUFFYkMsZUFBTyxvQkFBQyxDQUFELElBQUcsSUFBRyxhQUFOLEdBRk07QUFHYlQsa0JBQVUsQ0FBQyxLQUFLVixLQUFMLENBQVdDLGFBQVgsQ0FBeUI0QixHQUF6QixDQUE2QixDQUE3QixDQUhFO0FBSWJOLGlCQUFTLEtBQUt4QjtBQUpELE9BQWY7QUFNRDtBQUNELFdBQ0Usb0JBQUMsWUFBRDtBQUNFLFVBQUksS0FBS0MsS0FBTCxDQUFXTSxJQUFYLENBQWdCWSxFQUR0QjtBQUVFLGdCQUFVUixRQUZaO0FBR0UsaUJBQVdLO0FBSGIsTUFERjtBQU9ELEc7OztFQXhGMkN6QixNQUFNd0MsYSxVQXFCM0NDLFksR0FBZTtBQUNwQmYsYUFBVyxLQURTO0FBRXBCWSxZQUFVLEtBRlU7QUFHcEJELGtCQUFnQixLQUhJO0FBSXBCSCxxQkFBbUIsRUFKQztBQUtwQlYsa0JBQWdCO0FBTEksQztTQXJCSGhCLGdCIiwiZmlsZSI6ImRyb3Bkb3duLWNvbnRyb2xzLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L2ZvcmJpZC1wcm9wLXR5cGVzICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlIGFzIE0gfSBmcm9tICdyZWFjdC1pbnRsJztcbmltcG9ydCB7IEljb24gfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1pY29ucyc7XG5pbXBvcnQgeyBEcm9wZG93bk1lbnUgfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1kcm9wZG93bic7XG5cbmltcG9ydCB7IGdyaWRTaGFwZSB9IGZyb20gJy4vZGF0YWdyaWQucHJvcHMnO1xuXG5cbmltcG9ydCAnLi9kcm9wZG93bi1jb250cm9scy5jb21wb25lbnQuc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyb3Bkb3duQ29udHJvbHMgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBncmlkOiBncmlkU2hhcGUuaXNSZXF1aXJlZCxcbiAgICAvLyBhY3Rpb25zXG4gICAgdG9nZ2xlRmlsdGVyaW5nOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9wZW5Db2x1bW5TZXR0aW5nc01vZGFsOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIC8vIGRhdGFcbiAgICBzZWxlY3RlZEl0ZW1zOiBJbW11dGFibGVQcm9wVHlwZXMubGlzdC5pc1JlcXVpcmVkLFxuICAgIGlzQnVzeTogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpc0NyZWF0aW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGlzRWRpdGluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpc0ZpbHRlcmluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICAvLyBjb25maWdcbiAgICBvblJlbW92ZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBmaWx0ZXJpbmc6IFByb3BUeXBlcy5ib29sLFxuICAgIHJlbW92aW5nOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBjb2x1bW5TZXR0aW5nczogUHJvcFR5cGVzLmJvb2wsXG4gICAgZHJvcGRvd25NZW51SXRlbXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBkaXNhYmxlQWN0aW9uczogUHJvcFR5cGVzLmJvb2wsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBmaWx0ZXJpbmc6IGZhbHNlLFxuICAgIHJlbW92aW5nOiBmYWxzZSxcbiAgICBjb2x1bW5TZXR0aW5nczogZmFsc2UsXG4gICAgZHJvcGRvd25NZW51SXRlbXM6IFtdLFxuICAgIGRpc2FibGVBY3Rpb25zOiBmYWxzZSxcbiAgfTtcblxuICBoYW5kbGVSZW1vdmVDbGljayA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLnNpemUgPiAwKSB7XG4gICAgICB0aGlzLnByb3BzLm9uUmVtb3ZlKCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlVG9nZ2xlRmlsdGVyaW5nQ2xpY2sgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy50b2dnbGVGaWx0ZXJpbmcodGhpcy5wcm9wcy5ncmlkKTtcbiAgfVxuXG4gIGhhbmRsZUNvbHVtblNldHRpbmdzQ2xpY2sgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vcGVuQ29sdW1uU2V0dGluZ3NNb2RhbCh0aGlzLnByb3BzLmdyaWQpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGRpc2FibGVkID0gdGhpcy5wcm9wcy5pc0J1c3lcbiAgICAgICAgICAgICAgICAgIHx8IHRoaXMucHJvcHMuaXNDcmVhdGluZ1xuICAgICAgICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5pc0VkaXRpbmdcbiAgICAgICAgICAgICAgICAgIHx8IHRoaXMucHJvcHMuZGlzYWJsZUFjdGlvbnM7XG4gICAgbGV0IG1lbnVJdGVtcyA9IFtdO1xuICAgIGlmICh0aGlzLnByb3BzLmZpbHRlcmluZykge1xuICAgICAgbWVudUl0ZW1zLnB1c2goe1xuICAgICAgICBpZDogYCR7dGhpcy5wcm9wcy5ncmlkLmlkfS1tZW51LWl0ZW0tZmlsdGVyaW5nYCxcbiAgICAgICAgdGl0bGU6IDxNIGlkPVwiR3JpZC5TaG93RmlsdGVyaW5nUm93XCIgLz4sXG4gICAgICAgIGljb246IHRoaXMucHJvcHMuaXNGaWx0ZXJpbmcgP1xuICAgICAgICAgIDxJY29uXG4gICAgICAgICAgICB0eXBlPVwiaW5kaWNhdG9yXCJcbiAgICAgICAgICAgIG5hbWU9XCJva1wiXG4gICAgICAgICAgICB3aWR0aD17MTh9XG4gICAgICAgICAgICBoZWlnaHQ9ezE4fVxuICAgICAgICAgIC8+IDogdW5kZWZpbmVkLFxuICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZVRvZ2dsZUZpbHRlcmluZ0NsaWNrLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLmRyb3Bkb3duTWVudUl0ZW1zICYmIHRoaXMucHJvcHMuZHJvcGRvd25NZW51SXRlbXMubGVuZ3RoKSB7XG4gICAgICBtZW51SXRlbXMgPSBtZW51SXRlbXMuY29uY2F0KHRoaXMucHJvcHMuZHJvcGRvd25NZW51SXRlbXMpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5jb2x1bW5TZXR0aW5ncykge1xuICAgICAgbWVudUl0ZW1zLnB1c2goe1xuICAgICAgICBpZDogYCR7dGhpcy5wcm9wcy5ncmlkLmlkfS1tZW51LWl0ZW0tY29sdW1uLXNldHRpbmdzYCxcbiAgICAgICAgdGl0bGU6IDxNIGlkPVwiR3JpZC5Db2x1bW5TZXR0aW5nc1wiIC8+LFxuICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZUNvbHVtblNldHRpbmdzQ2xpY2ssXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMucmVtb3ZpbmcpIHtcbiAgICAgIG1lbnVJdGVtcy5wdXNoKHtcbiAgICAgICAgaWQ6IGAke3RoaXMucHJvcHMuZ3JpZC5pZH0tbWVudS1pdGVtLWRlbGV0ZWAsXG4gICAgICAgIHRpdGxlOiA8TSBpZD1cIkdyaWQuRGVsZXRlXCIgLz4sXG4gICAgICAgIGRpc2FibGVkOiAhdGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zLmhhcygwKSxcbiAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVSZW1vdmVDbGljayxcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPERyb3Bkb3duTWVudVxuICAgICAgICBpZD17dGhpcy5wcm9wcy5ncmlkLmlkfVxuICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgIG1lbnVJdGVtcz17bWVudUl0ZW1zfVxuICAgICAgLz5cbiAgICApO1xuICB9XG59XG4iXX0=