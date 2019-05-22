import { formatCurrencyAmount } from '@opuscapita/format-utils';
import { FormattedInputCurrency } from '@opuscapita/react-formatted-input/lib/es';
import React from 'react';

export const inputRender = formattedInputProps => (
  <FormattedInputCurrency {...formattedInputProps} />
);

export default {
  // currencyValueRender
  valRender(col, gridData, rowIndex, thousandSeparator, decimalSeparator, valueRender) {
    const currencyKeyPath = col.valueOptions && (col.valueOptions.currencyKeyPath || ['currency']);
    return valueRender(rowIndex, v => formatCurrencyAmount(v, {
      currency: gridData.getIn([rowIndex, ...currencyKeyPath]),
      decimals: col.valueOptions && col.valueOptions.decimals,
      thousandSeparator:
        (col.valueOptions && col.valueOptions.thousandSeparator) || thousandSeparator,
      decimalSeparator:
        (col.valueOptions && col.valueOptions.decimalSeparator) || decimalSeparator,
    }));
  },
  cellEdit(
    col,
    column,
    tabIndex,
    rowIndex,
    gridId,
    functions,
    editValueParser,
  ) {
    const props = {
      value: functions.getItemValue(rowIndex, col),
      onChange: functions.onCellValueChange(rowIndex, col, editValueParser),
      inputProps: {
        name: `ocDatagridCreateInput-${gridId}-${column.columnKey}-${rowIndex}`,
        onKeyDown: functions.onCellKeyDown(rowIndex, col),
        ref: functions.handleCellRef(rowIndex, col),
      },
      currency: col.currency,
      decimalSeparator: col.decimalSeparator,
      thousandSeparator: col.thousandSeparator,
      decimals: col.decimals,
      tabIndex,
      ...col.editComponentProps,
    };

    return inputRender({ ...props });
  },
  cellCreate(
    col,
    column,
    tabIndex,
    rowIndex,
    gridId,
    functions,
    editValueParser,
  ) {
    const props = {
      value: functions.getItemValue(rowIndex, col),
      onChange: functions.onCellValueChange(rowIndex, col, editValueParser),
      currency: col.currency,
      inputProps: {
        name: `ocDatagridCreateInput-${gridId}-${column.columnKey}-${rowIndex}`,
        onKeyDown: functions.onCellKeyDown(rowIndex, col),
        ref: functions.handleCellRef(rowIndex, col),
      },
      decimalSeparator: col.decimalSeparator,
      thousandSeparator: col.thousandSeparator,
      decimals: col.decimals,
      tabIndex,
      ...col.createComponentProps,
    };

    return inputRender({ ...props });
  },
  // Cell filtering is handled by primitive-renderers cellFilter function
  // Check column-service.jsx
};
