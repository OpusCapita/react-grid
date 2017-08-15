import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'react-bootstrap';
import { FormattedMessage as M } from 'react-intl';
import './filtering-controls.component.scss';

export default class FilteringControls extends React.PureComponent {

  static propTypes = {
    id: PropTypes.string.isRequired,
    isBusy: PropTypes.bool.isRequired,
    isCreating: PropTypes.bool.isRequired,
    isEditing: PropTypes.bool.isRequired,
    isFiltering: PropTypes.bool.isRequired,
    toggleFiltering: PropTypes.func,
  };

  static defaultProps = {
    toggleFiltering: () => {},
  };

  toggleFiltering = () => {
    this.props.toggleFiltering(this.props.id);
  }

  render() {
    return (
      <div className="oc-datagrid-filtering-controls">
        <Checkbox
          checked={this.props.isFiltering}
          disabled={this.props.isBusy || this.props.isCreating || this.props.isEditing}
          onClick={this.toggleFiltering}
          inline
        >
          <M id="ShowFilteringRow" />
        </Checkbox>
      </div>
    );
  }
}
