import React from 'react';
import PropTypes from 'prop-types';

export default class CustomInputComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    };
  }

  render() {
    return (
      <input
        type="text"
        value={this.state.value}
        onChange={(e) => {
          this.setState({ value: e.target.value });
        }}
        ref={(node) => {
          this.props.setRef(node);
        }}
        onKeyDown={this.props.onKeyDown}
        style={{ width: '100%' }}
      />
    );
  }
}

CustomInputComponent.propTypes = {
  setRef: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
