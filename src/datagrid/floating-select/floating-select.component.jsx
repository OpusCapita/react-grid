/* eslint-disable react/no-find-dom-node, prefer-rest-params */
import React from 'react';
import Select from 'react-select';
import ReactDOM from 'react-dom';
import TetherComponent from './tether.component';
import './floating-select.component.scss';

// Make react-select to tether over the container component instead of stretching it.
// https://github.com/JedWatson/react-select/issues/810#issuecomment-248546293

export default class FloatingSelect extends Select {
  constructor(props) {
    super(props);

    this.renderOuter = this.renderOuterOverride;
  }

  componentDidMount() {
    super.componentDidMount.call(this);

    this.dropdownFieldNode = ReactDOM.findDOMNode(this);
  }

  renderOuterOverride() {
    const menu = super.renderOuter.apply(this, arguments);

    const options = {
      attachment: 'top left',
      targetAttachment: 'bottom left',
      constraints: [
        {
          to: 'window',
          attachment: 'together',
        },
      ],
    };

    return (
      <TetherComponent
        target={this.dropdownFieldNode}
        options={options}
        matchWidth
      >
        {React.cloneElement(menu, { style: { position: 'static' } })}
      </TetherComponent>
    );
  }
}
