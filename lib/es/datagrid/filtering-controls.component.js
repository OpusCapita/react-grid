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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9maWx0ZXJpbmctY29udHJvbHMuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsIkNoZWNrYm94IiwiRm9ybWF0dGVkTWVzc2FnZSIsIk0iLCJncmlkU2hhcGUiLCJGaWx0ZXJpbmdDb250cm9scyIsInRvZ2dsZUZpbHRlcmluZyIsInByb3BzIiwiZ3JpZCIsInJlbmRlciIsImlzRmlsdGVyaW5nIiwiaXNCdXN5IiwiaXNDcmVhdGluZyIsImlzRWRpdGluZyIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxTQUFTQyxRQUFULFFBQXlCLGlCQUF6QjtBQUNBLFNBQVNDLG9CQUFvQkMsQ0FBN0IsUUFBc0MsWUFBdEM7QUFDQSxTQUFTQyxTQUFULFFBQTBCLGtCQUExQjtBQUNBLE9BQU8scUNBQVA7O0lBRXFCQyxpQjs7Ozs7Ozs7Ozs7O2dLQWNuQkMsZSxHQUFrQixZQUFNO0FBQ3RCLFlBQUtDLEtBQUwsQ0FBV0QsZUFBWCxDQUEyQixNQUFLQyxLQUFMLENBQVdDLElBQXRDO0FBQ0QsSzs7OzhCQUVEQyxNLHFCQUFTO0FBQ1AsV0FDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLGdDQUFmO0FBQ0U7QUFBQyxnQkFBRDtBQUFBO0FBQ0UsbUJBQVMsS0FBS0YsS0FBTCxDQUFXRyxXQUR0QjtBQUVFLG9CQUFVLEtBQUtILEtBQUwsQ0FBV0ksTUFBWCxJQUFxQixLQUFLSixLQUFMLENBQVdLLFVBQWhDLElBQThDLEtBQUtMLEtBQUwsQ0FBV00sU0FGckU7QUFHRSxvQkFBVSxLQUFLUCxlQUhqQjtBQUlFO0FBSkY7QUFNRSw0QkFBQyxDQUFELElBQUcsSUFBRyx1QkFBTjtBQU5GO0FBREYsS0FERjtBQVlELEc7OztFQS9CNENQLE1BQU1lLGEsVUFVNUNDLFksR0FBZTtBQUNwQlQsbUJBQWlCLDJCQUFNLENBQUU7QUFETCxDO1NBVkhELGlCIiwiZmlsZSI6ImZpbHRlcmluZy1jb250cm9scy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xyXG5pbXBvcnQgeyBDaGVja2JveCB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XHJcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgYXMgTSB9IGZyb20gJ3JlYWN0LWludGwnO1xyXG5pbXBvcnQgeyBncmlkU2hhcGUgfSBmcm9tICcuL2RhdGFncmlkLnByb3BzJztcclxuaW1wb3J0ICcuL2ZpbHRlcmluZy1jb250cm9scy5jb21wb25lbnQuc2Nzcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaWx0ZXJpbmdDb250cm9scyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xyXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XHJcbiAgICBncmlkOiBncmlkU2hhcGUuaXNSZXF1aXJlZCxcclxuICAgIGlzQnVzeTogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcclxuICAgIGlzQ3JlYXRpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICBpc0VkaXRpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICBpc0ZpbHRlcmluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcclxuICAgIHRvZ2dsZUZpbHRlcmluZzogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcclxuICAgIHRvZ2dsZUZpbHRlcmluZzogKCkgPT4ge30sXHJcbiAgfTtcclxuXHJcbiAgdG9nZ2xlRmlsdGVyaW5nID0gKCkgPT4ge1xyXG4gICAgdGhpcy5wcm9wcy50b2dnbGVGaWx0ZXJpbmcodGhpcy5wcm9wcy5ncmlkKTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtZGF0YWdyaWQtZmlsdGVyaW5nLWNvbnRyb2xzXCI+XHJcbiAgICAgICAgPENoZWNrYm94XHJcbiAgICAgICAgICBjaGVja2VkPXt0aGlzLnByb3BzLmlzRmlsdGVyaW5nfVxyXG4gICAgICAgICAgZGlzYWJsZWQ9e3RoaXMucHJvcHMuaXNCdXN5IHx8IHRoaXMucHJvcHMuaXNDcmVhdGluZyB8fCB0aGlzLnByb3BzLmlzRWRpdGluZ31cclxuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLnRvZ2dsZUZpbHRlcmluZ31cclxuICAgICAgICAgIGlubGluZVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxNIGlkPVwiR3JpZC5TaG93RmlsdGVyaW5nUm93XCIgLz5cclxuICAgICAgICA8L0NoZWNrYm94PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdfQ==