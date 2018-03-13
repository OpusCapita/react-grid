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
      if (_this.props.selectedItems.has(0)) {
        _this.props.remove(_this.props.grid, _this.props.onRemove);
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
        title: React.createElement(M, { id: 'GridShowFilteringRow' }),
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
        title: React.createElement(M, { id: 'GridColumnSettings' }),
        onClick: this.handleColumnSettingsClick
      });
    }
    if (this.props.removing) {
      menuItems.push({
        id: this.props.grid.id + '-menu-item-delete',
        title: React.createElement(M, { id: 'Delete' }),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kcm9wZG93bi1jb250cm9scy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiSW1tdXRhYmxlUHJvcFR5cGVzIiwiRm9ybWF0dGVkTWVzc2FnZSIsIk0iLCJJY29uIiwiRHJvcGRvd25NZW51IiwiZ3JpZFNoYXBlIiwiRHJvcGRvd25Db250cm9scyIsImhhbmRsZVJlbW92ZUNsaWNrIiwicHJvcHMiLCJzZWxlY3RlZEl0ZW1zIiwiaGFzIiwicmVtb3ZlIiwiZ3JpZCIsIm9uUmVtb3ZlIiwiaGFuZGxlVG9nZ2xlRmlsdGVyaW5nQ2xpY2siLCJ0b2dnbGVGaWx0ZXJpbmciLCJoYW5kbGVDb2x1bW5TZXR0aW5nc0NsaWNrIiwib3BlbkNvbHVtblNldHRpbmdzTW9kYWwiLCJyZW5kZXIiLCJkaXNhYmxlZCIsImlzQnVzeSIsImlzQ3JlYXRpbmciLCJpc0VkaXRpbmciLCJkaXNhYmxlQWN0aW9ucyIsIm1lbnVJdGVtcyIsImZpbHRlcmluZyIsInB1c2giLCJpZCIsInRpdGxlIiwiaWNvbiIsImlzRmlsdGVyaW5nIiwidW5kZWZpbmVkIiwib25DbGljayIsImRyb3Bkb3duTWVudUl0ZW1zIiwibGVuZ3RoIiwiY29uY2F0IiwiY29sdW1uU2V0dGluZ3MiLCJyZW1vdmluZyIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLE9BQU9DLGtCQUFQLE1BQStCLDJCQUEvQjtBQUNBLFNBQVNDLG9CQUFvQkMsQ0FBN0IsUUFBc0MsWUFBdEM7QUFDQSxTQUFTQyxJQUFULFFBQXFCLHlCQUFyQjtBQUNBLFNBQVNDLFlBQVQsUUFBNkIsNEJBQTdCOztBQUVBLFNBQVNDLFNBQVQsUUFBMEIsa0JBQTFCOztBQUdBLE9BQU8sb0NBQVA7O0lBRXFCQyxnQjs7Ozs7Ozs7Ozs7O2dLQThCbkJDLGlCLEdBQW9CLFlBQU07QUFDeEIsVUFBSSxNQUFLQyxLQUFMLENBQVdDLGFBQVgsQ0FBeUJDLEdBQXpCLENBQTZCLENBQTdCLENBQUosRUFBcUM7QUFDbkMsY0FBS0YsS0FBTCxDQUFXRyxNQUFYLENBQWtCLE1BQUtILEtBQUwsQ0FBV0ksSUFBN0IsRUFBbUMsTUFBS0osS0FBTCxDQUFXSyxRQUE5QztBQUNEO0FBQ0YsSyxRQUVEQywwQixHQUE2QixZQUFNO0FBQ2pDLFlBQUtOLEtBQUwsQ0FBV08sZUFBWCxDQUEyQixNQUFLUCxLQUFMLENBQVdJLElBQXRDO0FBQ0QsSyxRQUVESSx5QixHQUE0QixZQUFNO0FBQ2hDLFlBQUtSLEtBQUwsQ0FBV1MsdUJBQVgsQ0FBbUMsTUFBS1QsS0FBTCxDQUFXSSxJQUE5QztBQUNELEs7Ozs2QkFFRE0sTSxxQkFBUztBQUNQLFFBQU1DLFdBQVcsS0FBS1gsS0FBTCxDQUFXWSxNQUFYLElBQ0EsS0FBS1osS0FBTCxDQUFXYSxVQURYLElBRUEsS0FBS2IsS0FBTCxDQUFXYyxTQUZYLElBR0EsS0FBS2QsS0FBTCxDQUFXZSxjQUg1QjtBQUlBLFFBQUlDLFlBQVksRUFBaEI7QUFDQSxRQUFJLEtBQUtoQixLQUFMLENBQVdpQixTQUFmLEVBQTBCO0FBQ3hCRCxnQkFBVUUsSUFBVixDQUFlO0FBQ2JDLFlBQU8sS0FBS25CLEtBQUwsQ0FBV0ksSUFBWCxDQUFnQmUsRUFBdkIseUJBRGE7QUFFYkMsZUFBTyxvQkFBQyxDQUFELElBQUcsSUFBRyxzQkFBTixHQUZNO0FBR2JDLGNBQU0sS0FBS3JCLEtBQUwsQ0FBV3NCLFdBQVgsR0FDSixvQkFBQyxJQUFEO0FBQ0UsZ0JBQUssV0FEUDtBQUVFLGdCQUFLLElBRlA7QUFHRSxpQkFBTyxFQUhUO0FBSUUsa0JBQVE7QUFKVixVQURJLEdBTUNDLFNBVE07QUFVYkMsaUJBQVMsS0FBS2xCO0FBVkQsT0FBZjtBQVlEO0FBQ0QsUUFBSSxLQUFLTixLQUFMLENBQVd5QixpQkFBWCxJQUFnQyxLQUFLekIsS0FBTCxDQUFXeUIsaUJBQVgsQ0FBNkJDLE1BQWpFLEVBQXlFO0FBQ3ZFVixrQkFBWUEsVUFBVVcsTUFBVixDQUFpQixLQUFLM0IsS0FBTCxDQUFXeUIsaUJBQTVCLENBQVo7QUFDRDtBQUNELFFBQUksS0FBS3pCLEtBQUwsQ0FBVzRCLGNBQWYsRUFBK0I7QUFDN0JaLGdCQUFVRSxJQUFWLENBQWU7QUFDYkMsWUFBTyxLQUFLbkIsS0FBTCxDQUFXSSxJQUFYLENBQWdCZSxFQUF2QiwrQkFEYTtBQUViQyxlQUFPLG9CQUFDLENBQUQsSUFBRyxJQUFHLG9CQUFOLEdBRk07QUFHYkksaUJBQVMsS0FBS2hCO0FBSEQsT0FBZjtBQUtEO0FBQ0QsUUFBSSxLQUFLUixLQUFMLENBQVc2QixRQUFmLEVBQXlCO0FBQ3ZCYixnQkFBVUUsSUFBVixDQUFlO0FBQ2JDLFlBQU8sS0FBS25CLEtBQUwsQ0FBV0ksSUFBWCxDQUFnQmUsRUFBdkIsc0JBRGE7QUFFYkMsZUFBTyxvQkFBQyxDQUFELElBQUcsSUFBRyxRQUFOLEdBRk07QUFHYlQsa0JBQVUsQ0FBQyxLQUFLWCxLQUFMLENBQVdDLGFBQVgsQ0FBeUJDLEdBQXpCLENBQTZCLENBQTdCLENBSEU7QUFJYnNCLGlCQUFTLEtBQUt6QjtBQUpELE9BQWY7QUFNRDtBQUNELFdBQ0Usb0JBQUMsWUFBRDtBQUNFLFVBQUksS0FBS0MsS0FBTCxDQUFXSSxJQUFYLENBQWdCZSxFQUR0QjtBQUVFLGdCQUFVUixRQUZaO0FBR0UsaUJBQVdLO0FBSGIsTUFERjtBQU9ELEc7OztFQXpGMkMxQixNQUFNd0MsYSxVQXNCM0NDLFksR0FBZTtBQUNwQmQsYUFBVyxLQURTO0FBRXBCWSxZQUFVLEtBRlU7QUFHcEJELGtCQUFnQixLQUhJO0FBSXBCSCxxQkFBbUIsRUFKQztBQUtwQlYsa0JBQWdCO0FBTEksQztTQXRCSGpCLGdCIiwiZmlsZSI6ImRyb3Bkb3duLWNvbnRyb2xzLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L2ZvcmJpZC1wcm9wLXR5cGVzICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlIGFzIE0gfSBmcm9tICdyZWFjdC1pbnRsJztcbmltcG9ydCB7IEljb24gfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1pY29ucyc7XG5pbXBvcnQgeyBEcm9wZG93bk1lbnUgfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1kcm9wZG93bic7XG5cbmltcG9ydCB7IGdyaWRTaGFwZSB9IGZyb20gJy4vZGF0YWdyaWQucHJvcHMnO1xuXG5cbmltcG9ydCAnLi9kcm9wZG93bi1jb250cm9scy5jb21wb25lbnQuc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyb3Bkb3duQ29udHJvbHMgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBncmlkOiBncmlkU2hhcGUuaXNSZXF1aXJlZCxcbiAgICAvLyBhY3Rpb25zXG4gICAgcmVtb3ZlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHRvZ2dsZUZpbHRlcmluZzogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvcGVuQ29sdW1uU2V0dGluZ3NNb2RhbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAvLyBkYXRhXG4gICAgc2VsZWN0ZWRJdGVtczogSW1tdXRhYmxlUHJvcFR5cGVzLmxpc3QuaXNSZXF1aXJlZCxcbiAgICBpc0J1c3k6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgaXNDcmVhdGluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpc0VkaXRpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgaXNGaWx0ZXJpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgLy8gY29uZmlnXG4gICAgb25SZW1vdmU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgZmlsdGVyaW5nOiBQcm9wVHlwZXMuYm9vbCxcbiAgICByZW1vdmluZzogUHJvcFR5cGVzLmJvb2wsXG4gICAgY29sdW1uU2V0dGluZ3M6IFByb3BUeXBlcy5ib29sLFxuICAgIGRyb3Bkb3duTWVudUl0ZW1zOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgZGlzYWJsZUFjdGlvbnM6IFByb3BUeXBlcy5ib29sLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgZmlsdGVyaW5nOiBmYWxzZSxcbiAgICByZW1vdmluZzogZmFsc2UsXG4gICAgY29sdW1uU2V0dGluZ3M6IGZhbHNlLFxuICAgIGRyb3Bkb3duTWVudUl0ZW1zOiBbXSxcbiAgICBkaXNhYmxlQWN0aW9uczogZmFsc2UsXG4gIH07XG5cbiAgaGFuZGxlUmVtb3ZlQ2xpY2sgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5oYXMoMCkpIHtcbiAgICAgIHRoaXMucHJvcHMucmVtb3ZlKHRoaXMucHJvcHMuZ3JpZCwgdGhpcy5wcm9wcy5vblJlbW92ZSk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlVG9nZ2xlRmlsdGVyaW5nQ2xpY2sgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy50b2dnbGVGaWx0ZXJpbmcodGhpcy5wcm9wcy5ncmlkKTtcbiAgfVxuXG4gIGhhbmRsZUNvbHVtblNldHRpbmdzQ2xpY2sgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vcGVuQ29sdW1uU2V0dGluZ3NNb2RhbCh0aGlzLnByb3BzLmdyaWQpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGRpc2FibGVkID0gdGhpcy5wcm9wcy5pc0J1c3lcbiAgICAgICAgICAgICAgICAgIHx8IHRoaXMucHJvcHMuaXNDcmVhdGluZ1xuICAgICAgICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5pc0VkaXRpbmdcbiAgICAgICAgICAgICAgICAgIHx8IHRoaXMucHJvcHMuZGlzYWJsZUFjdGlvbnM7XG4gICAgbGV0IG1lbnVJdGVtcyA9IFtdO1xuICAgIGlmICh0aGlzLnByb3BzLmZpbHRlcmluZykge1xuICAgICAgbWVudUl0ZW1zLnB1c2goe1xuICAgICAgICBpZDogYCR7dGhpcy5wcm9wcy5ncmlkLmlkfS1tZW51LWl0ZW0tZmlsdGVyaW5nYCxcbiAgICAgICAgdGl0bGU6IDxNIGlkPVwiR3JpZFNob3dGaWx0ZXJpbmdSb3dcIiAvPixcbiAgICAgICAgaWNvbjogdGhpcy5wcm9wcy5pc0ZpbHRlcmluZyA/XG4gICAgICAgICAgPEljb25cbiAgICAgICAgICAgIHR5cGU9XCJpbmRpY2F0b3JcIlxuICAgICAgICAgICAgbmFtZT1cIm9rXCJcbiAgICAgICAgICAgIHdpZHRoPXsxOH1cbiAgICAgICAgICAgIGhlaWdodD17MTh9XG4gICAgICAgICAgLz4gOiB1bmRlZmluZWQsXG4gICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlVG9nZ2xlRmlsdGVyaW5nQ2xpY2ssXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuZHJvcGRvd25NZW51SXRlbXMgJiYgdGhpcy5wcm9wcy5kcm9wZG93bk1lbnVJdGVtcy5sZW5ndGgpIHtcbiAgICAgIG1lbnVJdGVtcyA9IG1lbnVJdGVtcy5jb25jYXQodGhpcy5wcm9wcy5kcm9wZG93bk1lbnVJdGVtcyk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLmNvbHVtblNldHRpbmdzKSB7XG4gICAgICBtZW51SXRlbXMucHVzaCh7XG4gICAgICAgIGlkOiBgJHt0aGlzLnByb3BzLmdyaWQuaWR9LW1lbnUtaXRlbS1jb2x1bW4tc2V0dGluZ3NgLFxuICAgICAgICB0aXRsZTogPE0gaWQ9XCJHcmlkQ29sdW1uU2V0dGluZ3NcIiAvPixcbiAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVDb2x1bW5TZXR0aW5nc0NsaWNrLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLnJlbW92aW5nKSB7XG4gICAgICBtZW51SXRlbXMucHVzaCh7XG4gICAgICAgIGlkOiBgJHt0aGlzLnByb3BzLmdyaWQuaWR9LW1lbnUtaXRlbS1kZWxldGVgLFxuICAgICAgICB0aXRsZTogPE0gaWQ9XCJEZWxldGVcIiAvPixcbiAgICAgICAgZGlzYWJsZWQ6ICF0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuaGFzKDApLFxuICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZVJlbW92ZUNsaWNrLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8RHJvcGRvd25NZW51XG4gICAgICAgIGlkPXt0aGlzLnByb3BzLmdyaWQuaWR9XG4gICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgbWVudUl0ZW1zPXttZW51SXRlbXN9XG4gICAgICAvPlxuICAgICk7XG4gIH1cbn1cbiJdfQ==