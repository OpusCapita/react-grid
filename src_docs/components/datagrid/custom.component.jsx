import React from 'react';
import PropTypes from 'prop-types';


export default class CustomComponent extends React.Component {
  render() {
    return (
      <input
        type="text"
        value="dd"
        onChange={() => {}}
        ref={(node) => { this.props.setRef(node); }}
        onKeyDown={this.props.onKeyDown}
      />
    );
  }
}

CustomComponent.propTypes = {
  setRef: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
};
