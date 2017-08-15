import React from 'react';
import ReactSpinner from 'react-spinjs';


export default function Spinner() {
  const spinnerOptions = {
    color: '#FAC51D',
    width: 4,
  };
  return (
    <ReactSpinner config={spinnerOptions} />
  );
}
