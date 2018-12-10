import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const pagination = (WrappedComponent) => {
  const mapStateToProps = state => ({
  });

  const mapDispatchToProps = dispatch => ({
  });

  class Pager extends React.PureComponent {
    static propTypes = {
    };

    static defaultProps = {
    };

    render = () => (
      <WrappedComponent {...this.props} />
    );
  }

  return connect(mapStateToProps, mapDispatchToProps)(Pager);
};

export default pagination;
