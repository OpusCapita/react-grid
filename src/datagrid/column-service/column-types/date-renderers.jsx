import React from 'react';
import moment from 'moment';
import { FormattedMessage as M } from 'react-intl';
import { DateInput } from '@opuscapita/react-datetime';

export const dateRender = dateProps => (<DateInput {...dateProps} />);

const dateIsValid = val => moment(val).isValid();

const dateIsValidFormat = (val, dateFormat) => moment(val, dateFormat, true).isValid();

const className = 'oc-data-grid-date';

export default {
  // dateValueRender
  valRender(rowIndex, dateFormat, valueRender) {
    return valueRender(rowIndex, (v) => {
      if (dateIsValidFormat(v, dateFormat)) {
        return moment.utc(v, dateFormat).format(dateFormat);
      }
      if (dateIsValid(v)) {
        return moment.utc(v).format(dateFormat);
      }
      return <M id="Grid.InvalidDate" />;
    });
  },
  // dateCellEdit
  cellEdit(
    col,
    column,
    rowIndex,
    tabIndex,
    gridId,
    region,
    dateFormat,
    valueParser,
    functions,
    getComponentDisabledState,
  ) {
    const cellName = 'edit';
    const dateProps = {
      className,
      dateFormat,
      locale: region,
      value: functions.getItemValue(rowIndex, col),
      onChange: functions.onCellValueChange(rowIndex, col, valueParser),
      inputRef: functions.handleCellRef(rowIndex, col),
      inputProps: {
        tabIndex,
        id: `ocDatagridEditInput-${gridId}-${column.columnKey}-${rowIndex}`,
        onKeyDown: functions.onCellKeyDown(rowIndex, col),
        onBlur: functions.onCellBlur(rowIndex, col),
        onFocus: functions.onCellFocus(cellName, col.componentType, rowIndex, column.columnKey),
        style: column.style,
      },
      disabled: getComponentDisabledState(rowIndex, col, cellName),
      ...col.editComponentProps,
    };
    return dateRender({ ...dateProps });
  },
  // dateCellCreate
  cellCreate(
    col,
    column,
    rowIndex,
    tabIndex,
    gridId,
    region,
    dateFormat,
    valueParser,
    functions,
    getComponentDisabledState,
  ) {
    const cellName = 'create';
    const dateProps = {
      className,
      dateFormat,
      locale: region,
      value: functions.getItemValue(rowIndex, col),
      onChange: functions.onCellValueChange(rowIndex, col, valueParser),
      inputRef: functions.handleCellRef(rowIndex, col),
      inputProps: {
        tabIndex,
        id: `ocDatagridCreateInput-${gridId}-${column.columnKey}-${rowIndex}`,
        onKeyDown: functions.onCellKeyDown(rowIndex, col),
        onBlur: functions.onCellBlur(rowIndex, col),
        onFocus: functions.onCellFocus(cellName, col.componentType, rowIndex, column.columnKey),
        style: column.style,
      },
      disabled: getComponentDisabledState(rowIndex, col, cellName),
      ...col.createComponentProps,
    };
    return dateRender({ ...dateProps });
  },
  // dateFilterCell
  cellFilter(
    col,
    column,
    tabIndex,
    gridId,
    region,
    dateFormat,
    valueParser,
    functions,
  ) {
    const dateProps = {
      className,
      dateFormat,
      value: functions.getItemValue(col),
      onChange: functions.onCellValueChange(col, valueParser),
      locale: region,
      inputProps: {
        tabIndex,
        id: `ocDatagridFilterInput-${gridId}-${column.columnKey}`,
        style: column.style,
      },
      ...col.filterComponentProps,
    };
    return dateRender({ ...dateProps });
  },
};
