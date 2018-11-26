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
          height: 18,
          style: { padding: '4px' }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9kcm9wZG93bi1jb250cm9scy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiSW1tdXRhYmxlUHJvcFR5cGVzIiwiRm9ybWF0dGVkTWVzc2FnZSIsIk0iLCJJY29uIiwiRHJvcGRvd25NZW51IiwiZ3JpZFNoYXBlIiwiRHJvcGRvd25Db250cm9scyIsImhhbmRsZVJlbW92ZUNsaWNrIiwicHJvcHMiLCJzZWxlY3RlZEl0ZW1zIiwic2l6ZSIsIm9uUmVtb3ZlIiwiaGFuZGxlVG9nZ2xlRmlsdGVyaW5nQ2xpY2siLCJ0b2dnbGVGaWx0ZXJpbmciLCJncmlkIiwiaGFuZGxlQ29sdW1uU2V0dGluZ3NDbGljayIsIm9wZW5Db2x1bW5TZXR0aW5nc01vZGFsIiwicmVuZGVyIiwiZGlzYWJsZWQiLCJpc0J1c3kiLCJpc0NyZWF0aW5nIiwiaXNFZGl0aW5nIiwiZGlzYWJsZUFjdGlvbnMiLCJtZW51SXRlbXMiLCJmaWx0ZXJpbmciLCJwdXNoIiwiaWQiLCJ0aXRsZSIsImljb24iLCJpc0ZpbHRlcmluZyIsInBhZGRpbmciLCJ1bmRlZmluZWQiLCJvbkNsaWNrIiwiZHJvcGRvd25NZW51SXRlbXMiLCJsZW5ndGgiLCJjb25jYXQiLCJjb2x1bW5TZXR0aW5ncyIsInJlbW92aW5nIiwiaGFzIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsT0FBT0Msa0JBQVAsTUFBK0IsMkJBQS9CO0FBQ0EsU0FBU0Msb0JBQW9CQyxDQUE3QixRQUFzQyxZQUF0QztBQUNBLFNBQVNDLElBQVQsUUFBcUIseUJBQXJCO0FBQ0EsU0FBU0MsWUFBVCxRQUE2Qiw0QkFBN0I7O0FBRUEsU0FBU0MsU0FBVCxRQUEwQixrQkFBMUI7O0FBR0EsT0FBTyxvQ0FBUDs7SUFFcUJDLGdCOzs7Ozs7Ozs7Ozs7Z0tBNkJuQkMsaUIsR0FBb0IsWUFBTTtBQUN4QixVQUFJLE1BQUtDLEtBQUwsQ0FBV0MsYUFBWCxDQUF5QkMsSUFBekIsR0FBZ0MsQ0FBcEMsRUFBdUM7QUFDckMsY0FBS0YsS0FBTCxDQUFXRyxRQUFYO0FBQ0Q7QUFDRixLLFFBRURDLDBCLEdBQTZCLFlBQU07QUFDakMsWUFBS0osS0FBTCxDQUFXSyxlQUFYLENBQTJCLE1BQUtMLEtBQUwsQ0FBV00sSUFBdEM7QUFDRCxLLFFBRURDLHlCLEdBQTRCLFlBQU07QUFDaEMsWUFBS1AsS0FBTCxDQUFXUSx1QkFBWCxDQUFtQyxNQUFLUixLQUFMLENBQVdNLElBQTlDO0FBQ0QsSzs7OzZCQUVERyxNLHFCQUFTO0FBQ1AsUUFBTUMsV0FBVyxLQUFLVixLQUFMLENBQVdXLE1BQVgsSUFDQSxLQUFLWCxLQUFMLENBQVdZLFVBRFgsSUFFQSxLQUFLWixLQUFMLENBQVdhLFNBRlgsSUFHQSxLQUFLYixLQUFMLENBQVdjLGNBSDVCO0FBSUEsUUFBSUMsWUFBWSxFQUFoQjtBQUNBLFFBQUksS0FBS2YsS0FBTCxDQUFXZ0IsU0FBZixFQUEwQjtBQUN4QkQsZ0JBQVVFLElBQVYsQ0FBZTtBQUNiQyxZQUFPLEtBQUtsQixLQUFMLENBQVdNLElBQVgsQ0FBZ0JZLEVBQXZCLHlCQURhO0FBRWJDLGVBQU8sb0JBQUMsQ0FBRCxJQUFHLElBQUcsdUJBQU4sR0FGTTtBQUdiQyxjQUFNLEtBQUtwQixLQUFMLENBQVdxQixXQUFYLEdBQ0osb0JBQUMsSUFBRDtBQUNFLGdCQUFLLFdBRFA7QUFFRSxnQkFBSyxJQUZQO0FBR0UsaUJBQU8sRUFIVDtBQUlFLGtCQUFRLEVBSlY7QUFLRSxpQkFBTyxFQUFFQyxTQUFTLEtBQVg7QUFMVCxVQURJLEdBT0NDLFNBVk07QUFXYkMsaUJBQVMsS0FBS3BCO0FBWEQsT0FBZjtBQWFEO0FBQ0QsUUFBSSxLQUFLSixLQUFMLENBQVd5QixpQkFBWCxJQUFnQyxLQUFLekIsS0FBTCxDQUFXeUIsaUJBQVgsQ0FBNkJDLE1BQWpFLEVBQXlFO0FBQ3ZFWCxrQkFBWUEsVUFBVVksTUFBVixDQUFpQixLQUFLM0IsS0FBTCxDQUFXeUIsaUJBQTVCLENBQVo7QUFDRDtBQUNELFFBQUksS0FBS3pCLEtBQUwsQ0FBVzRCLGNBQWYsRUFBK0I7QUFDN0JiLGdCQUFVRSxJQUFWLENBQWU7QUFDYkMsWUFBTyxLQUFLbEIsS0FBTCxDQUFXTSxJQUFYLENBQWdCWSxFQUF2QiwrQkFEYTtBQUViQyxlQUFPLG9CQUFDLENBQUQsSUFBRyxJQUFHLHFCQUFOLEdBRk07QUFHYkssaUJBQVMsS0FBS2pCO0FBSEQsT0FBZjtBQUtEO0FBQ0QsUUFBSSxLQUFLUCxLQUFMLENBQVc2QixRQUFmLEVBQXlCO0FBQ3ZCZCxnQkFBVUUsSUFBVixDQUFlO0FBQ2JDLFlBQU8sS0FBS2xCLEtBQUwsQ0FBV00sSUFBWCxDQUFnQlksRUFBdkIsc0JBRGE7QUFFYkMsZUFBTyxvQkFBQyxDQUFELElBQUcsSUFBRyxhQUFOLEdBRk07QUFHYlQsa0JBQVUsQ0FBQyxLQUFLVixLQUFMLENBQVdDLGFBQVgsQ0FBeUI2QixHQUF6QixDQUE2QixDQUE3QixDQUhFO0FBSWJOLGlCQUFTLEtBQUt6QjtBQUpELE9BQWY7QUFNRDtBQUNELFdBQ0Usb0JBQUMsWUFBRDtBQUNFLFVBQUksS0FBS0MsS0FBTCxDQUFXTSxJQUFYLENBQWdCWSxFQUR0QjtBQUVFLGdCQUFVUixRQUZaO0FBR0UsaUJBQVdLO0FBSGIsTUFERjtBQU9ELEc7OztFQXpGMkN6QixNQUFNeUMsYSxVQXFCM0NDLFksR0FBZTtBQUNwQmhCLGFBQVcsS0FEUztBQUVwQmEsWUFBVSxLQUZVO0FBR3BCRCxrQkFBZ0IsS0FISTtBQUlwQkgscUJBQW1CLEVBSkM7QUFLcEJYLGtCQUFnQjtBQUxJLEM7U0FyQkhoQixnQiIsImZpbGUiOiJkcm9wZG93bi1jb250cm9scy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9mb3JiaWQtcHJvcC10eXBlcyAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgSW1tdXRhYmxlUHJvcFR5cGVzIGZyb20gJ3JlYWN0LWltbXV0YWJsZS1wcm9wdHlwZXMnO1xuaW1wb3J0IHsgRm9ybWF0dGVkTWVzc2FnZSBhcyBNIH0gZnJvbSAncmVhY3QtaW50bCc7XG5pbXBvcnQgeyBJY29uIH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtaWNvbnMnO1xuaW1wb3J0IHsgRHJvcGRvd25NZW51IH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtZHJvcGRvd24nO1xuXG5pbXBvcnQgeyBncmlkU2hhcGUgfSBmcm9tICcuL2RhdGFncmlkLnByb3BzJztcblxuXG5pbXBvcnQgJy4vZHJvcGRvd24tY29udHJvbHMuY29tcG9uZW50LnNjc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEcm9wZG93bkNvbnRyb2xzIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgZ3JpZDogZ3JpZFNoYXBlLmlzUmVxdWlyZWQsXG4gICAgLy8gYWN0aW9uc1xuICAgIHRvZ2dsZUZpbHRlcmluZzogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvcGVuQ29sdW1uU2V0dGluZ3NNb2RhbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAvLyBkYXRhXG4gICAgc2VsZWN0ZWRJdGVtczogSW1tdXRhYmxlUHJvcFR5cGVzLmxpc3QuaXNSZXF1aXJlZCxcbiAgICBpc0J1c3k6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgaXNDcmVhdGluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpc0VkaXRpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgaXNGaWx0ZXJpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgLy8gY29uZmlnXG4gICAgb25SZW1vdmU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgZmlsdGVyaW5nOiBQcm9wVHlwZXMuYm9vbCxcbiAgICByZW1vdmluZzogUHJvcFR5cGVzLmJvb2wsXG4gICAgY29sdW1uU2V0dGluZ3M6IFByb3BUeXBlcy5ib29sLFxuICAgIGRyb3Bkb3duTWVudUl0ZW1zOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgZGlzYWJsZUFjdGlvbnM6IFByb3BUeXBlcy5ib29sLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgZmlsdGVyaW5nOiBmYWxzZSxcbiAgICByZW1vdmluZzogZmFsc2UsXG4gICAgY29sdW1uU2V0dGluZ3M6IGZhbHNlLFxuICAgIGRyb3Bkb3duTWVudUl0ZW1zOiBbXSxcbiAgICBkaXNhYmxlQWN0aW9uczogZmFsc2UsXG4gIH07XG5cbiAgaGFuZGxlUmVtb3ZlQ2xpY2sgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcy5zaXplID4gMCkge1xuICAgICAgdGhpcy5wcm9wcy5vblJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVRvZ2dsZUZpbHRlcmluZ0NsaWNrID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMudG9nZ2xlRmlsdGVyaW5nKHRoaXMucHJvcHMuZ3JpZCk7XG4gIH1cblxuICBoYW5kbGVDb2x1bW5TZXR0aW5nc0NsaWNrID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMub3BlbkNvbHVtblNldHRpbmdzTW9kYWwodGhpcy5wcm9wcy5ncmlkKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBkaXNhYmxlZCA9IHRoaXMucHJvcHMuaXNCdXN5XG4gICAgICAgICAgICAgICAgICB8fCB0aGlzLnByb3BzLmlzQ3JlYXRpbmdcbiAgICAgICAgICAgICAgICAgIHx8IHRoaXMucHJvcHMuaXNFZGl0aW5nXG4gICAgICAgICAgICAgICAgICB8fCB0aGlzLnByb3BzLmRpc2FibGVBY3Rpb25zO1xuICAgIGxldCBtZW51SXRlbXMgPSBbXTtcbiAgICBpZiAodGhpcy5wcm9wcy5maWx0ZXJpbmcpIHtcbiAgICAgIG1lbnVJdGVtcy5wdXNoKHtcbiAgICAgICAgaWQ6IGAke3RoaXMucHJvcHMuZ3JpZC5pZH0tbWVudS1pdGVtLWZpbHRlcmluZ2AsXG4gICAgICAgIHRpdGxlOiA8TSBpZD1cIkdyaWQuU2hvd0ZpbHRlcmluZ1Jvd1wiIC8+LFxuICAgICAgICBpY29uOiB0aGlzLnByb3BzLmlzRmlsdGVyaW5nID9cbiAgICAgICAgICA8SWNvblxuICAgICAgICAgICAgdHlwZT1cImluZGljYXRvclwiXG4gICAgICAgICAgICBuYW1lPVwib2tcIlxuICAgICAgICAgICAgd2lkdGg9ezE4fVxuICAgICAgICAgICAgaGVpZ2h0PXsxOH1cbiAgICAgICAgICAgIHN0eWxlPXt7IHBhZGRpbmc6ICc0cHgnIH19XG4gICAgICAgICAgLz4gOiB1bmRlZmluZWQsXG4gICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlVG9nZ2xlRmlsdGVyaW5nQ2xpY2ssXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuZHJvcGRvd25NZW51SXRlbXMgJiYgdGhpcy5wcm9wcy5kcm9wZG93bk1lbnVJdGVtcy5sZW5ndGgpIHtcbiAgICAgIG1lbnVJdGVtcyA9IG1lbnVJdGVtcy5jb25jYXQodGhpcy5wcm9wcy5kcm9wZG93bk1lbnVJdGVtcyk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLmNvbHVtblNldHRpbmdzKSB7XG4gICAgICBtZW51SXRlbXMucHVzaCh7XG4gICAgICAgIGlkOiBgJHt0aGlzLnByb3BzLmdyaWQuaWR9LW1lbnUtaXRlbS1jb2x1bW4tc2V0dGluZ3NgLFxuICAgICAgICB0aXRsZTogPE0gaWQ9XCJHcmlkLkNvbHVtblNldHRpbmdzXCIgLz4sXG4gICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlQ29sdW1uU2V0dGluZ3NDbGljayxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5yZW1vdmluZykge1xuICAgICAgbWVudUl0ZW1zLnB1c2goe1xuICAgICAgICBpZDogYCR7dGhpcy5wcm9wcy5ncmlkLmlkfS1tZW51LWl0ZW0tZGVsZXRlYCxcbiAgICAgICAgdGl0bGU6IDxNIGlkPVwiR3JpZC5EZWxldGVcIiAvPixcbiAgICAgICAgZGlzYWJsZWQ6ICF0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMuaGFzKDApLFxuICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZVJlbW92ZUNsaWNrLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8RHJvcGRvd25NZW51XG4gICAgICAgIGlkPXt0aGlzLnByb3BzLmdyaWQuaWR9XG4gICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgbWVudUl0ZW1zPXttZW51SXRlbXN9XG4gICAgICAvPlxuICAgICk7XG4gIH1cbn1cbiJdfQ==