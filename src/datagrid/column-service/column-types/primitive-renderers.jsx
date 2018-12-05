import React from 'react';
import { FormControl } from 'react-bootstrap';
import { FormattedNumber as N } from 'react-intl';

export const primitiveRender = primitiveProps => (<FormControl {...primitiveProps} />);

export default {
  // primitiveNumberValueRender
  numberValRender(col, rowIndex, valueRender) {
    return valueRender(
      rowIndex,
      v => <N value={v} {...col.renderComponentProps} />,
    );
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
    const primitiveProps = {
      id: `ocDatagridEditInput-${gridId}-${column.columnKey}-${rowIndex}`,
      style: column.style,
      tabIndex,
      type: formControlType,
      value: functions.getItemValue(rowIndex, col),
      onBlur: functions.onCellBlur(rowIndex, col),
      onKeyDown: functions.onCellKeyDown(rowIndex, col),
      inputRef: functions.handleCellRef(rowIndex, col),
      disabled: getComponentDisabledState(rowIndex, col, cellName),
      onChange: functions.onCellValueChange(rowIndex, col, editValueParser),
      onFocus: functions.onCellFocus(cellName, col.componentType, rowIndex, column.columnKey),
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
      id: `ocDatagridCreateInput-${gridId}-${column.columnKey}-${rowIndex}`,
      style: column.style,
      tabIndex,
      type: formControlType || col.componentType,
      value: functions.getItemValue(rowIndex, col),
      onBlur: functions.onCellBlur(rowIndex, col),
      onKeyDown: functions.onCellKeyDown(rowIndex, col, false),
      inputRef: functions.handleCellRef(rowIndex, col),
      disabled: getComponentDisabledState(rowIndex, col, cellName),
      onChange: functions.onCellValueChange(rowIndex, col, createValueParser),
      onFocus: functions.onCellFocus(cellName, col.componentType, rowIndex, column.columnKey),
      ...col.createComponentProps,
    };
    return primitiveRender({ ...primitiveProps });
  },
  // primitiveCellFilter
  cellFilter(
    col,
    column,
    tabIndex,
    gridId,
    filterValueParser,
    formControlType,
    functions,
  ) {
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
