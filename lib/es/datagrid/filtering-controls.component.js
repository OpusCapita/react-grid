var _class, _temp2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'react-bootstrap';
import { FormattedMessage as M } from 'react-intl';
import { gridShape } from './datagrid.props';
import './filtering-controls.component.scss';

var FilteringControls = (_temp2 = _class = function (_React$PureComponent) {
  _inherits(FilteringControls, _React$PureComponent);

  function FilteringControls() {
    var _temp, _this, _ret;

    _classCallCheck(this, FilteringControls);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.toggleFiltering = function () {
      _this.props.toggleFiltering(_this.props.grid);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  FilteringControls.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: 'oc-datagrid-filtering-controls' },
      React.createElement(
        Checkbox,
        {
          checked: this.props.isFiltering,
          disabled: this.props.isBusy || this.props.isCreating || this.props.isEditing,
          onChange: this.toggleFiltering,
          inline: true
        },
        React.createElement(M, { id: 'Grid.ShowFilteringRow' })
      )
    );
  };

  return FilteringControls;
}(React.PureComponent), _class.defaultProps = {
  toggleFiltering: function toggleFiltering() {}
}, _temp2);
export { FilteringControls as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9maWx0ZXJpbmctY29udHJvbHMuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsIkNoZWNrYm94IiwiRm9ybWF0dGVkTWVzc2FnZSIsIk0iLCJncmlkU2hhcGUiLCJGaWx0ZXJpbmdDb250cm9scyIsInRvZ2dsZUZpbHRlcmluZyIsInByb3BzIiwiZ3JpZCIsInJlbmRlciIsImlzRmlsdGVyaW5nIiwiaXNCdXN5IiwiaXNDcmVhdGluZyIsImlzRWRpdGluZyIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxTQUFTQyxRQUFULFFBQXlCLGlCQUF6QjtBQUNBLFNBQVNDLG9CQUFvQkMsQ0FBN0IsUUFBc0MsWUFBdEM7QUFDQSxTQUFTQyxTQUFULFFBQTBCLGtCQUExQjtBQUNBLE9BQU8scUNBQVA7O0lBRXFCQyxpQjs7Ozs7Ozs7Ozs7O2dLQWNuQkMsZSxHQUFrQixZQUFNO0FBQ3RCLFlBQUtDLEtBQUwsQ0FBV0QsZUFBWCxDQUEyQixNQUFLQyxLQUFMLENBQVdDLElBQXRDO0FBQ0QsSzs7OzhCQUVEQyxNLHFCQUFTO0FBQ1AsV0FDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLGdDQUFmO0FBQ0U7QUFBQyxnQkFBRDtBQUFBO0FBQ0UsbUJBQVMsS0FBS0YsS0FBTCxDQUFXRyxXQUR0QjtBQUVFLG9CQUFVLEtBQUtILEtBQUwsQ0FBV0ksTUFBWCxJQUFxQixLQUFLSixLQUFMLENBQVdLLFVBQWhDLElBQThDLEtBQUtMLEtBQUwsQ0FBV00sU0FGckU7QUFHRSxvQkFBVSxLQUFLUCxlQUhqQjtBQUlFO0FBSkY7QUFNRSw0QkFBQyxDQUFELElBQUcsSUFBRyx1QkFBTjtBQU5GO0FBREYsS0FERjtBQVlELEc7OztFQS9CNENQLE1BQU1lLGEsVUFVNUNDLFksR0FBZTtBQUNwQlQsbUJBQWlCLDJCQUFNLENBQUU7QUFETCxDO1NBVkhELGlCIiwiZmlsZSI6ImZpbHRlcmluZy1jb250cm9scy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IENoZWNrYm94IH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgYXMgTSB9IGZyb20gJ3JlYWN0LWludGwnO1xuaW1wb3J0IHsgZ3JpZFNoYXBlIH0gZnJvbSAnLi9kYXRhZ3JpZC5wcm9wcyc7XG5pbXBvcnQgJy4vZmlsdGVyaW5nLWNvbnRyb2xzLmNvbXBvbmVudC5zY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmlsdGVyaW5nQ29udHJvbHMgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBncmlkOiBncmlkU2hhcGUuaXNSZXF1aXJlZCxcbiAgICBpc0J1c3k6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgaXNDcmVhdGluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpc0VkaXRpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgaXNGaWx0ZXJpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgdG9nZ2xlRmlsdGVyaW5nOiBQcm9wVHlwZXMuZnVuYyxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIHRvZ2dsZUZpbHRlcmluZzogKCkgPT4ge30sXG4gIH07XG5cbiAgdG9nZ2xlRmlsdGVyaW5nID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMudG9nZ2xlRmlsdGVyaW5nKHRoaXMucHJvcHMuZ3JpZCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtZmlsdGVyaW5nLWNvbnRyb2xzXCI+XG4gICAgICAgIDxDaGVja2JveFxuICAgICAgICAgIGNoZWNrZWQ9e3RoaXMucHJvcHMuaXNGaWx0ZXJpbmd9XG4gICAgICAgICAgZGlzYWJsZWQ9e3RoaXMucHJvcHMuaXNCdXN5IHx8IHRoaXMucHJvcHMuaXNDcmVhdGluZyB8fCB0aGlzLnByb3BzLmlzRWRpdGluZ31cbiAgICAgICAgICBvbkNoYW5nZT17dGhpcy50b2dnbGVGaWx0ZXJpbmd9XG4gICAgICAgICAgaW5saW5lXG4gICAgICAgID5cbiAgICAgICAgICA8TSBpZD1cIkdyaWQuU2hvd0ZpbHRlcmluZ1Jvd1wiIC8+XG4gICAgICAgIDwvQ2hlY2tib3g+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=