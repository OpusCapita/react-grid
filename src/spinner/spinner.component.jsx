/* Based on from https://github.com/qimingweng/react-spinjs */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import SpinJS from 'spin.js';

export default class Spinner extends React.PureComponent {
  static propTypes = {
    config: PropTypes.object,
    delay: PropTypes.number.isRequired,
  }

  static defaultProps = {
    config: {
      color: '#FAC51D',
      width: 4,
    },
    delay: 500,
  }

  componentDidMount() {
    window.setTimeout(() => {
      this.spinner = new SpinJS(this.props.config);
      this.spinner.spin(this.container);
    }, this.props.delay);
  }

  componentWillUnmount() {
    if (this.spinner) {
      this.spinner.stop();
    }
  }

  render() {
    return <span ref={(el) => { this.container = el; }} />;
  }
}
