import React from 'react';
import { formatCurrencyAmount } from '@opuscapita/format-utils';

export default {
  // currencyValueRender
  valRender(col, gridData, rowIndex, thousandSeparator, decimalSeparator, valueRender) {
    const currencyKeyPath = col.valueOptions && (col.valueOptions.currencyKeyPath || ['currency']);
    return valueRender(rowIndex, v => formatCurrencyAmount(v, {
      currency: gridData.getIn([rowIndex, ...currencyKeyPath]),
      decimals: col.valueOptions && col.valueOptions.decimals,
      thousandSeparator: col.valueOptions && (col.valueOptions.thousandSeparator || thousandSeparator),
      decimalSeparator: col.valueOptions && (col.valueOptions.decimalSeparator || decimalSeparator),
    }));
  },
};
