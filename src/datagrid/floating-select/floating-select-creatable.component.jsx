/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import FloatingSelect from './floating-select.component';

export default class FloatingSelectCreatable extends React.PureComponent {
  render() {
    return (
      <FloatingSelect.Creatable {...this.props}>
        {creatableProps => (
          <FloatingSelect
            {...creatableProps}
          />
        )}
      </FloatingSelect.Creatable>
    );
  }
}
