function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'react-bootstrap';
import { FormattedMessage as M } from 'react-intl';
import { gridShape } from './datagrid.props';
import './filtering-controls.component.scss';

var FilteringControls = /*#__PURE__*/function (_React$PureComponent) {
  _inheritsLoose(FilteringControls, _React$PureComponent);

  function FilteringControls() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "toggleFiltering", function () {
      _this.props.toggleFiltering(_this.props.grid);
    });

    return _this;
  }

  var _proto = FilteringControls.prototype;

  _proto.render = function render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "oc-datagrid-filtering-controls"
    }, /*#__PURE__*/React.createElement(Checkbox, {
      checked: this.props.isFiltering,
      disabled: this.props.isBusy || this.props.isCreating || this.props.isEditing,
      onChange: this.toggleFiltering,
      inline: true
    }, /*#__PURE__*/React.createElement(M, {
      id: "Grid.ShowFilteringRow"
    })));
  };

  return FilteringControls;
}(React.PureComponent);

_defineProperty(FilteringControls, "defaultProps", {
  toggleFiltering: function toggleFiltering() {}
});

export { FilteringControls as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhZ3JpZC9maWx0ZXJpbmctY29udHJvbHMuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsIkNoZWNrYm94IiwiRm9ybWF0dGVkTWVzc2FnZSIsIk0iLCJncmlkU2hhcGUiLCJGaWx0ZXJpbmdDb250cm9scyIsInByb3BzIiwidG9nZ2xlRmlsdGVyaW5nIiwiZ3JpZCIsInJlbmRlciIsImlzRmlsdGVyaW5nIiwiaXNCdXN5IiwiaXNDcmVhdGluZyIsImlzRWRpdGluZyIsIlB1cmVDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsU0FBU0MsUUFBVCxRQUF5QixpQkFBekI7QUFDQSxTQUFTQyxnQkFBZ0IsSUFBSUMsQ0FBN0IsUUFBc0MsWUFBdEM7QUFDQSxTQUFTQyxTQUFULFFBQTBCLGtCQUExQjtBQUNBLE9BQU8scUNBQVA7O0lBRXFCQyxpQjs7Ozs7Ozs7Ozs7O3NFQWNELFlBQU07QUFDdEIsWUFBS0MsS0FBTCxDQUFXQyxlQUFYLENBQTJCLE1BQUtELEtBQUwsQ0FBV0UsSUFBdEM7QUFDRCxLOzs7Ozs7O1NBRURDLE0sR0FBQSxrQkFBUztBQUNQLHdCQUNFO0FBQUssTUFBQSxTQUFTLEVBQUM7QUFBZixvQkFDRSxvQkFBQyxRQUFEO0FBQ0UsTUFBQSxPQUFPLEVBQUUsS0FBS0gsS0FBTCxDQUFXSSxXQUR0QjtBQUVFLE1BQUEsUUFBUSxFQUFFLEtBQUtKLEtBQUwsQ0FBV0ssTUFBWCxJQUFxQixLQUFLTCxLQUFMLENBQVdNLFVBQWhDLElBQThDLEtBQUtOLEtBQUwsQ0FBV08sU0FGckU7QUFHRSxNQUFBLFFBQVEsRUFBRSxLQUFLTixlQUhqQjtBQUlFLE1BQUEsTUFBTTtBQUpSLG9CQU1FLG9CQUFDLENBQUQ7QUFBRyxNQUFBLEVBQUUsRUFBQztBQUFOLE1BTkYsQ0FERixDQURGO0FBWUQsRzs7O0VBL0I0Q1IsS0FBSyxDQUFDZSxhOztnQkFBaENULGlCLGtCQVVHO0FBQ3BCRSxFQUFBQSxlQUFlLEVBQUUsMkJBQU0sQ0FBRTtBQURMLEM7O1NBVkhGLGlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBDaGVja2JveCB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlIGFzIE0gfSBmcm9tICdyZWFjdC1pbnRsJztcbmltcG9ydCB7IGdyaWRTaGFwZSB9IGZyb20gJy4vZGF0YWdyaWQucHJvcHMnO1xuaW1wb3J0ICcuL2ZpbHRlcmluZy1jb250cm9scy5jb21wb25lbnQuc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpbHRlcmluZ0NvbnRyb2xzIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgZ3JpZDogZ3JpZFNoYXBlLmlzUmVxdWlyZWQsXG4gICAgaXNCdXN5OiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGlzQ3JlYXRpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgaXNFZGl0aW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGlzRmlsdGVyaW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIHRvZ2dsZUZpbHRlcmluZzogUHJvcFR5cGVzLmZ1bmMsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICB0b2dnbGVGaWx0ZXJpbmc6ICgpID0+IHt9LFxuICB9O1xuXG4gIHRvZ2dsZUZpbHRlcmluZyA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLnRvZ2dsZUZpbHRlcmluZyh0aGlzLnByb3BzLmdyaWQpO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1kYXRhZ3JpZC1maWx0ZXJpbmctY29udHJvbHNcIj5cbiAgICAgICAgPENoZWNrYm94XG4gICAgICAgICAgY2hlY2tlZD17dGhpcy5wcm9wcy5pc0ZpbHRlcmluZ31cbiAgICAgICAgICBkaXNhYmxlZD17dGhpcy5wcm9wcy5pc0J1c3kgfHwgdGhpcy5wcm9wcy5pc0NyZWF0aW5nIHx8IHRoaXMucHJvcHMuaXNFZGl0aW5nfVxuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLnRvZ2dsZUZpbHRlcmluZ31cbiAgICAgICAgICBpbmxpbmVcbiAgICAgICAgPlxuICAgICAgICAgIDxNIGlkPVwiR3JpZC5TaG93RmlsdGVyaW5nUm93XCIgLz5cbiAgICAgICAgPC9DaGVja2JveD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==