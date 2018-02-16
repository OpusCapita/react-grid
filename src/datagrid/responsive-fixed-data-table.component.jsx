/* eslint-disable react/forbid-prop-types, react/no-find-dom-node */
import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { Table } from 'fixed-data-table-2';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';

const initialPixels = 1;

export default class ResponsiveFixedDataTable extends React.Component {
  static propTypes = {
    containerStyle: PropTypes.object,
    refreshRate: PropTypes.number,
  };

  static defaultProps = {
    containerStyle: {},
    refreshRate: 250, // ms
  };

  state = {
    gridWidth: initialPixels,
    gridHeight: initialPixels,
  };

  componentWillMount() {
    const { refreshRate } = this.props;
    this.setDimensionsOnState = debounce(this.setDimensionsOnState, refreshRate);
  }

  componentDidMount() {
    this.isComponentMounted = true;
    this.setDimensionsOnState();
    this.attachResizeEvent();
    window.setTimeout(() => this.setDimensionsOnState(), 500);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState);
  }

  componentWillUnmount() {
    this.isComponentMounted = false;
    window.removeEventListener('resize', this.setDimensionsOnState);
  }

  setDimensionsOnState = () => {
    if (this.isComponentMounted) {
      const { offsetWidth, offsetHeight } = findDOMNode(this);
      this.setState({
        gridWidth: offsetWidth || initialPixels,
        gridHeight: offsetHeight || initialPixels,
      });
    }
  }

  getStyle() {
    return {
      ...this.props.containerStyle,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    };
  }

  attachResizeEvent() {
    if (window.addEventListener) {
      window.addEventListener('resize', this.setDimensionsOnState, false);
    } else if (window.attachEvent) {
      window.attachEvent('resize', this.setDimensionsOnState);
    } else {
      window.onresize = this.setDimensionsOnState;
    }
  }

  render() {
    const { gridWidth, gridHeight } = this.state;

    return (
      <div className="oc-datagrid-main-container" style={this.getStyle()}>
        <Table {...this.props} width={gridWidth} height={gridHeight} />
      </div>
    );
  }
}
