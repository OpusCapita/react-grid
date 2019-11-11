import React from 'react';
// import { FormControl } from 'react-bootstrap';
import FormattedInput from '@opuscapita/react-formatted-input';
import { formatNumber } from '@opuscapita/format-utils';

// export const primitiveRender = primitiveProps => <FormControl {...primitiveProps} />;

export const primitiveRender = formattedInputProps => (
  <FormattedInput {...formattedInputProps} />
);

export default {
  // primitiveNumberValueRender
  numberValRender(col, rowIndex, thousandSeparator, decimalSeparator, valueRender) {
    const decimals = col.componentType === 'number' ? 0 : 2;
    return valueRender(rowIndex, v => formatNumber(v, {
      decimals: (col.valueOptions && col.valueOptions.decimals) || decimals,
      thousandSeparator:
          (col.valueOptions && col.valueOptions.thousandSeparator) || thousandSeparator,
      decimalSeparator:
          (col.valueOptions && col.valueOptions.decimalSeparator) || decimalSeparator,
    }));
  },
  // primitiveCellEdit
  cellEdit(
    col,
    column,
    rowIndex,
    tabIndex,
    gridId,
    editValueParser,
    formControlType,
    functions,
    getComponentDisabledState,
  ) {
    const cellName = 'edit';
    // const primitiveProps = {
    //   id: `ocDatagridEditInput-${gridId}-${column.columnKey}-${rowIndex}`,
    //   style: column.style,
    //   tabIndex,
    //   type: formControlType,
    //   value: functions.getItemValue(rowIndex, col),
    //   onBlur: functions.onCellBlur(rowIndex, col),
    //   onKeyDown: functions.onCellKeyDown(rowIndex, col),
    //   inputRef: functions.handleCellRef(rowIndex, col),
    //   disabled: getComponentDisabledState(rowIndex, col, cellName),
    //   onChange: functions.onCellValueChange(rowIndex, col, editValueParser),
    //   // onChange: functions.onCellValueChange(rowIndex, col, val => val),
    //   onFocus: functions.onCellFocus(cellName, col.componentType, rowIndex, column.columnKey),
    //   ...col.editComponentProps,
    // };

    const primitiveProps = {
      tabIndex,
      className: 'form-control',
      inputProps: {
        disabled: getComponentDisabledState(rowIndex, col, cellName),
        id: `ocDatagridEditInput-${gridId}-${column.columnKey}-${rowIndex}`,
        onFocus: functions.onCellFocus(cellName, col.componentType, rowIndex, column.columnKey),
        onKeyDown: functions.onCellKeyDown(rowIndex, col),
        ref: functions.handleCellRef(rowIndex, col),
        style: column.style,
        type: formControlType,
      },
      value: functions.getItemValue(rowIndex, col),
      // TODO createlle samat
      // onBlur: NaN invalid
      // TODO toimiiko edit & create text/currency/number/float
      // TODO valueOptions: miksei vaikuta kuin edit modessa
      // TODO editData -> dataan. string -> number?
      // TODO jos currencyllä decimaaleja, formatoi silti
      // TODO JOS SYÖTTÄÄ VALMIIKSI TUHATEROTTIMET?
      onBlur: functions.onCellBlur(rowIndex, col),
      onChange: functions.onCellValueChange(rowIndex, col, editValueParser),
      ...col.editComponentProps,
    };

    return primitiveRender({ ...primitiveProps });
  },
  // primitiveCellCreate
  cellCreate(
    col,
    column,
    rowIndex,
    tabIndex,
    gridId,
    createValueParser,
    formControlType,
    functions,
    getComponentDisabledState,
  ) {
    const cellName = 'create';
    const primitiveProps = {
      tabIndex,
      className: 'form-control',
      inputProps: {
        disabled: getComponentDisabledState(rowIndex, col, cellName),
        id: `ocDatagridCreateInput-${gridId}-${column.columnKey}-${rowIndex}`,
        onFocus: functions.onCellFocus(cellName, col.componentType, rowIndex, column.columnKey),
        onKeyDown: functions.onCellKeyDown(rowIndex, col, false),
        ref: functions.handleCellRef(rowIndex, col),
        style: column.style,
        type: formControlType || col.componentType,
      },
      value: functions.getItemValue(rowIndex, col),
      onBlur: functions.onCellBlur(rowIndex, col),
      onChange: functions.onCellValueChange(rowIndex, col, createValueParser),
      ...col.createComponentProps,
    };
    return primitiveRender({ ...primitiveProps });
  },
  // primitiveCellFilter
  cellFilter(col, column, tabIndex, gridId, filterValueParser, formControlType, functions) {
    const primitiveProps = {
      id: `ocDatagridFilterInput-${gridId}-${column.columnKey}`,
      style: column.style,
      tabIndex,
      type: formControlType,
      value: functions.getItemValue(col),
      onChange: functions.onCellValueChange(col, filterValueParser),
      ...col.filterComponentProps,
    };
    return primitiveRender({ ...primitiveProps });
  },
};
