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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kcm9wZG93bi1jb250cm9scy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiSW1tdXRhYmxlUHJvcFR5cGVzIiwiRm9ybWF0dGVkTWVzc2FnZSIsIk0iLCJJY29uIiwiRHJvcGRvd25NZW51IiwiZ3JpZFNoYXBlIiwiRHJvcGRvd25Db250cm9scyIsImhhbmRsZVJlbW92ZUNsaWNrIiwicHJvcHMiLCJzZWxlY3RlZEl0ZW1zIiwiaGFzIiwicmVtb3ZlIiwiZ3JpZCIsIm9uUmVtb3ZlIiwiaGFuZGxlVG9nZ2xlRmlsdGVyaW5nQ2xpY2siLCJ0b2dnbGVGaWx0ZXJpbmciLCJoYW5kbGVDb2x1bW5TZXR0aW5nc0NsaWNrIiwib3BlbkNvbHVtblNldHRpbmdzTW9kYWwiLCJyZW5kZXIiLCJkaXNhYmxlZCIsImlzQnVzeSIsImlzQ3JlYXRpbmciLCJpc0VkaXRpbmciLCJkaXNhYmxlQWN0aW9ucyIsIm1lbnVJdGVtcyIsImZpbHRlcmluZyIsInB1c2giLCJpZCIsInRpdGxlIiwiaWNvbiIsImlzRmlsdGVyaW5nIiwidW5kZWZpbmVkIiwib25DbGljayIsImRyb3Bkb3duTWVudUl0ZW1zIiwibGVuZ3RoIiwiY29uY2F0IiwiY29sdW1uU2V0dGluZ3MiLCJyZW1vdmluZyIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLE9BQU9DLGtCQUFQLE1BQStCLDJCQUEvQjtBQUNBLFNBQVNDLG9CQUFvQkMsQ0FBN0IsUUFBc0MsWUFBdEM7QUFDQSxTQUFTQyxJQUFULFFBQXFCLHlCQUFyQjtBQUNBLFNBQVNDLFlBQVQsUUFBNkIsNEJBQTdCOztBQUVBLFNBQVNDLFNBQVQsUUFBMEIsa0JBQTFCOztBQUdBLE9BQU8sb0NBQVA7O0lBRXFCQyxnQjs7Ozs7Ozs7Ozs7O2dLQThCbkJDLGlCLEdBQW9CLFlBQU07QUFDeEIsVUFBSSxNQUFLQyxLQUFMLENBQVdDLGFBQVgsQ0FBeUJDLEdBQXpCLENBQTZCLENBQTdCLENBQUosRUFBcUM7QUFDbkMsY0FBS0YsS0FBTCxDQUFXRyxNQUFYLENBQWtCLE1BQUtILEtBQUwsQ0FBV0ksSUFBN0IsRUFBbUMsTUFBS0osS0FBTCxDQUFXSyxRQUE5QztBQUNEO0FBQ0YsSyxRQUVEQywwQixHQUE2QixZQUFNO0FBQ2pDLFlBQUtOLEtBQUwsQ0FBV08sZUFBWCxDQUEyQixNQUFLUCxLQUFMLENBQVdJLElBQXRDO0FBQ0QsSyxRQUVESSx5QixHQUE0QixZQUFNO0FBQ2hDLFlBQUtSLEtBQUwsQ0FBV1MsdUJBQVgsQ0FBbUMsTUFBS1QsS0FBTCxDQUFXSSxJQUE5QztBQUNELEs7Ozs2QkFFRE0sTSxxQkFBUztBQUNQLFFBQU1DLFdBQVcsS0FBS1gsS0FBTCxDQUFXWSxNQUFYLElBQ0EsS0FBS1osS0FBTCxDQUFXYSxVQURYLElBRUEsS0FBS2IsS0FBTCxDQUFXYyxTQUZYLElBR0EsS0FBS2QsS0FBTCxDQUFXZSxjQUg1QjtBQUlBLFFBQUlDLFlBQVksRUFBaEI7QUFDQSxRQUFJLEtBQUtoQixLQUFMLENBQVdpQixTQUFmLEVBQTBCO0FBQ3hCRCxnQkFBVUUsSUFBVixDQUFlO0FBQ2JDLFlBQU8sS0FBS25CLEtBQUwsQ0FBV0ksSUFBWCxDQUFnQmUsRUFBdkIseUJBRGE7QUFFYkMsZUFBTyxvQkFBQyxDQUFELElBQUcsSUFBRyx1QkFBTixHQUZNO0FBR2JDLGNBQU0sS0FBS3JCLEtBQUwsQ0FBV3NCLFdBQVgsR0FDSixvQkFBQyxJQUFEO0FBQ0UsZ0JBQUssV0FEUDtBQUVFLGdCQUFLLElBRlA7QUFHRSxpQkFBTyxFQUhUO0FBSUUsa0JBQVE7QUFKVixVQURJLEdBTUNDLFNBVE07QUFVYkMsaUJBQVMsS0FBS2xCO0FBVkQsT0FBZjtBQVlEO0FBQ0QsUUFBSSxLQUFLTixLQUFMLENBQVd5QixpQkFBWCxJQUFnQyxLQUFLekIsS0FBTCxDQUFXeUIsaUJBQVgsQ0FBNkJDLE1BQWpFLEVBQXlFO0FBQ3ZFVixrQkFBWUEsVUFBVVcsTUFBVixDQUFpQixLQUFLM0IsS0FBTCxDQUFXeUIsaUJBQTVCLENBQVo7QUFDRDtBQUNELFFBQUksS0FBS3pCLEtBQUwsQ0FBVzRCLGNBQWYsRUFBK0I7QUFDN0JaLGdCQUFVRSxJQUFWLENBQWU7QUFDYkMsWUFBTyxLQUFLbkIsS0FBTCxDQUFXSSxJQUFYLENBQWdCZSxFQUF2QiwrQkFEYTtBQUViQyxlQUFPLG9CQUFDLENBQUQsSUFBRyxJQUFHLHFCQUFOLEdBRk07QUFHYkksaUJBQVMsS0FBS2hCO0FBSEQsT0FBZjtBQUtEO0FBQ0QsUUFBSSxLQUFLUixLQUFMLENBQVc2QixRQUFmLEVBQXlCO0FBQ3ZCYixnQkFBVUUsSUFBVixDQUFlO0FBQ2JDLFlBQU8sS0FBS25CLEtBQUwsQ0FBV0ksSUFBWCxDQUFnQmUsRUFBdkIsc0JBRGE7QUFFYkMsZUFBTyxvQkFBQyxDQUFELElBQUcsSUFBRyxhQUFOLEdBRk07QUFHYlQsa0JBQVUsQ0FBQyxLQUFLWCxLQUFMLENBQVdDLGFBQVgsQ0FBeUJDLEdBQXpCLENBQTZCLENBQTdCLENBSEU7QUFJYnNCLGlCQUFTLEtBQUt6QjtBQUpELE9BQWY7QUFNRDtBQUNELFdBQ0Usb0JBQUMsWUFBRDtBQUNFLFVBQUksS0FBS0MsS0FBTCxDQUFXSSxJQUFYLENBQWdCZSxFQUR0QjtBQUVFLGdCQUFVUixRQUZaO0FBR0UsaUJBQVdLO0FBSGIsTUFERjtBQU9ELEc7OztFQXpGMkMxQixNQUFNd0MsYSxVQXNCM0NDLFksR0FBZTtBQUNwQmQsYUFBVyxLQURTO0FBRXBCWSxZQUFVLEtBRlU7QUFHcEJELGtCQUFnQixLQUhJO0FBSXBCSCxxQkFBbUIsRUFKQztBQUtwQlYsa0JBQWdCO0FBTEksQztTQXRCSGpCLGdCIiwiZmlsZSI6ImRyb3Bkb3duLWNvbnRyb2xzLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L2ZvcmJpZC1wcm9wLXR5cGVzICovXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XHJcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XHJcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgYXMgTSB9IGZyb20gJ3JlYWN0LWludGwnO1xyXG5pbXBvcnQgeyBJY29uIH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtaWNvbnMnO1xyXG5pbXBvcnQgeyBEcm9wZG93bk1lbnUgfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1kcm9wZG93bic7XHJcblxyXG5pbXBvcnQgeyBncmlkU2hhcGUgfSBmcm9tICcuL2RhdGFncmlkLnByb3BzJztcclxuXHJcblxyXG5pbXBvcnQgJy4vZHJvcGRvd24tY29udHJvbHMuY29tcG9uZW50LnNjc3MnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJvcGRvd25Db250cm9scyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xyXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XHJcbiAgICBncmlkOiBncmlkU2hhcGUuaXNSZXF1aXJlZCxcclxuICAgIC8vIGFjdGlvbnNcclxuICAgIHJlbW92ZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgIHRvZ2dsZUZpbHRlcmluZzogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgIG9wZW5Db2x1bW5TZXR0aW5nc01vZGFsOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgLy8gZGF0YVxyXG4gICAgc2VsZWN0ZWRJdGVtczogSW1tdXRhYmxlUHJvcFR5cGVzLmxpc3QuaXNSZXF1aXJlZCxcclxuICAgIGlzQnVzeTogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcclxuICAgIGlzQ3JlYXRpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICBpc0VkaXRpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICBpc0ZpbHRlcmluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcclxuICAgIC8vIGNvbmZpZ1xyXG4gICAgb25SZW1vdmU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICBmaWx0ZXJpbmc6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgcmVtb3Zpbmc6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgY29sdW1uU2V0dGluZ3M6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgZHJvcGRvd25NZW51SXRlbXM6IFByb3BUeXBlcy5hcnJheSxcclxuICAgIGRpc2FibGVBY3Rpb25zOiBQcm9wVHlwZXMuYm9vbCxcclxuICB9O1xyXG5cclxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xyXG4gICAgZmlsdGVyaW5nOiBmYWxzZSxcclxuICAgIHJlbW92aW5nOiBmYWxzZSxcclxuICAgIGNvbHVtblNldHRpbmdzOiBmYWxzZSxcclxuICAgIGRyb3Bkb3duTWVudUl0ZW1zOiBbXSxcclxuICAgIGRpc2FibGVBY3Rpb25zOiBmYWxzZSxcclxuICB9O1xyXG5cclxuICBoYW5kbGVSZW1vdmVDbGljayA9ICgpID0+IHtcclxuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuaGFzKDApKSB7XHJcbiAgICAgIHRoaXMucHJvcHMucmVtb3ZlKHRoaXMucHJvcHMuZ3JpZCwgdGhpcy5wcm9wcy5vblJlbW92ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoYW5kbGVUb2dnbGVGaWx0ZXJpbmdDbGljayA9ICgpID0+IHtcclxuICAgIHRoaXMucHJvcHMudG9nZ2xlRmlsdGVyaW5nKHRoaXMucHJvcHMuZ3JpZCk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVDb2x1bW5TZXR0aW5nc0NsaWNrID0gKCkgPT4ge1xyXG4gICAgdGhpcy5wcm9wcy5vcGVuQ29sdW1uU2V0dGluZ3NNb2RhbCh0aGlzLnByb3BzLmdyaWQpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgZGlzYWJsZWQgPSB0aGlzLnByb3BzLmlzQnVzeVxyXG4gICAgICAgICAgICAgICAgICB8fCB0aGlzLnByb3BzLmlzQ3JlYXRpbmdcclxuICAgICAgICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5pc0VkaXRpbmdcclxuICAgICAgICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5kaXNhYmxlQWN0aW9ucztcclxuICAgIGxldCBtZW51SXRlbXMgPSBbXTtcclxuICAgIGlmICh0aGlzLnByb3BzLmZpbHRlcmluZykge1xyXG4gICAgICBtZW51SXRlbXMucHVzaCh7XHJcbiAgICAgICAgaWQ6IGAke3RoaXMucHJvcHMuZ3JpZC5pZH0tbWVudS1pdGVtLWZpbHRlcmluZ2AsXHJcbiAgICAgICAgdGl0bGU6IDxNIGlkPVwiR3JpZC5TaG93RmlsdGVyaW5nUm93XCIgLz4sXHJcbiAgICAgICAgaWNvbjogdGhpcy5wcm9wcy5pc0ZpbHRlcmluZyA/XHJcbiAgICAgICAgICA8SWNvblxyXG4gICAgICAgICAgICB0eXBlPVwiaW5kaWNhdG9yXCJcclxuICAgICAgICAgICAgbmFtZT1cIm9rXCJcclxuICAgICAgICAgICAgd2lkdGg9ezE4fVxyXG4gICAgICAgICAgICBoZWlnaHQ9ezE4fVxyXG4gICAgICAgICAgLz4gOiB1bmRlZmluZWQsXHJcbiAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVUb2dnbGVGaWx0ZXJpbmdDbGljayxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5wcm9wcy5kcm9wZG93bk1lbnVJdGVtcyAmJiB0aGlzLnByb3BzLmRyb3Bkb3duTWVudUl0ZW1zLmxlbmd0aCkge1xyXG4gICAgICBtZW51SXRlbXMgPSBtZW51SXRlbXMuY29uY2F0KHRoaXMucHJvcHMuZHJvcGRvd25NZW51SXRlbXMpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMucHJvcHMuY29sdW1uU2V0dGluZ3MpIHtcclxuICAgICAgbWVudUl0ZW1zLnB1c2goe1xyXG4gICAgICAgIGlkOiBgJHt0aGlzLnByb3BzLmdyaWQuaWR9LW1lbnUtaXRlbS1jb2x1bW4tc2V0dGluZ3NgLFxyXG4gICAgICAgIHRpdGxlOiA8TSBpZD1cIkdyaWQuQ29sdW1uU2V0dGluZ3NcIiAvPixcclxuICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZUNvbHVtblNldHRpbmdzQ2xpY2ssXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMucHJvcHMucmVtb3ZpbmcpIHtcclxuICAgICAgbWVudUl0ZW1zLnB1c2goe1xyXG4gICAgICAgIGlkOiBgJHt0aGlzLnByb3BzLmdyaWQuaWR9LW1lbnUtaXRlbS1kZWxldGVgLFxyXG4gICAgICAgIHRpdGxlOiA8TSBpZD1cIkdyaWQuRGVsZXRlXCIgLz4sXHJcbiAgICAgICAgZGlzYWJsZWQ6ICF0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuaGFzKDApLFxyXG4gICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlUmVtb3ZlQ2xpY2ssXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPERyb3Bkb3duTWVudVxyXG4gICAgICAgIGlkPXt0aGlzLnByb3BzLmdyaWQuaWR9XHJcbiAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICAgIG1lbnVJdGVtcz17bWVudUl0ZW1zfVxyXG4gICAgICAvPlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl19