import { formatCurrencyAmount } from '@opuscapita/format-utils';
import { FormattedInputCurrency } from '@opuscapita/react-formatted-input';
import React from 'react';

export const inputRender = formattedInputProps => (
  <FormattedInputCurrency {...formattedInputProps} />
);

const getCurrencyKeyPath = col => (col.valueOptions && col.valueOptions.currencyKeyPath) || ['currency'];

export default {
  // currencyValueRender
  valRender(col, gridData, rowIndex, thousandSeparator, decimalSeparator, valueRender) {
    return valueRender(rowIndex, v => formatCurrencyAmount(v, {
      currency: gridData.getIn([rowIndex, ...getCurrencyKeyPath(col)])
        || (col.valueOptions && col.valueOptions.currency),
      decimals: col.valueOptions && col.valueOptions.decimals,
      thousandSeparator:
        (col.valueOptions && col.valueOptions.thousandSeparator) || thousandSeparator,
      decimalSeparator:
        (col.valueOptions && col.valueOptions.decimalSeparator) || decimalSeparator,
      multiplier:
        (col.valueOptions && col.valueOptions.multiplier),
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
    getComponentDisabledState,
    gridData,
    thousandSeparator,
    decimalSeparator,
  ) {
    const cellName = 'edit';
    const props = {
      className: 'form-control',
      value: functions.getItemValue(rowIndex, col),
      onChange: functions.onCellValueChange(rowIndex, col, val => val),
      inputProps: {
        disabled: getComponentDisabledState(rowIndex, col, cellName),
        id: `ocDatagridEditInput-${gridId}-${column.columnKey}-${rowIndex}`,
        name: `ocDatagridEditInput-${gridId}-${column.columnKey}-${rowIndex}`,
        onFocus: functions.onCellFocus(cellName, col.componentType, rowIndex, column.columnKey),
        onKeyDown: functions.onCellKeyDown(rowIndex, col),
        ref: functions.handleCellRef(rowIndex, col),
        style: column.style,
      },
      currency: gridData.getIn([rowIndex, ...getCurrencyKeyPath(col)])
        || (col.valueOptions && col.valueOptions.currency),
      decimalSeparator: (col.valueOptions && col.valueOptions.decimalSeparator) || decimalSeparator,
      thousandSeparator: (col.valueOptions && col.valueOptions.thousandSeparator)
        || thousandSeparator,
      decimals: col.valueOptions && col.valueOptions.decimals,
      tabIndex,
      onBlur: functions.onCellBlur(rowIndex, col),
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
    getComponentDisabledState,
    gridData,
    thousandSeparator,
    decimalSeparator,
  ) {
    const cellName = 'create';
    const props = {
      className: 'form-control',
      value: functions.getItemValue(rowIndex, col),
      onChange: functions.onCellValueChange(rowIndex, col, val => val),
      inputProps: {
        disabled: getComponentDisabledState(rowIndex, col, cellName),
        id: `ocDatagridCreateInput-${gridId}-${column.columnKey}-${rowIndex}`,
        name: `ocDatagridCreateInput-${gridId}-${column.columnKey}-${rowIndex}`,
        onFocus: functions.onCellFocus(cellName, col.componentType, rowIndex, column.columnKey),
        onKeyDown: functions.onCellKeyDown(rowIndex, col),
        ref: functions.handleCellRef(rowIndex, col),
        style: column.style,
      },
      currency: gridData.getIn([rowIndex, ...getCurrencyKeyPath(col)])
        || (col.valueOptions && col.valueOptions.currency),
      decimalSeparator: (col.valueOptions && col.valueOptions.decimalSeparator) || decimalSeparator,
      thousandSeparator: (col.valueOptions && col.valueOptions.thousandSeparator)
        || thousandSeparator,
      decimals: col.valueOptions && col.valueOptions.decimals,
      tabIndex,
      onBlur: functions.onCellBlur(rowIndex, col),
      ...col.createComponentProps,
    };

    return inputRender({ ...props });
  },
  // Cell filtering is handled by primitive-renderers cellFilter function
  // Check column-service.jsx
};
