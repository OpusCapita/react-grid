import React from 'react';
import PropTypes from 'prop-types';

const Color = ({ value }) => (
  <div style={{ backgroundColor: value, width: '20px', height: '20px' }}>
    &nbsp;
  </div>
);

Color.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Color;
