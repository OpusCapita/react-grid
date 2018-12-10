import React from 'react';
import FaCheck from 'react-icons/lib/fa/check';
import Checkbox from '@opuscapita/react-checkbox';
import { selectRender } from './select-renderers';

export const checkboxRender = checkboxProps => (<Checkbox {...checkboxProps} />);

export default {

  valRender(rowIndex, valueRender) {
    return valueRender(rowIndex, v => (v ? <FaCheck size={20} /> : null));
  },

  cellEdit(col, column, rowIndex, tabIndex, gridId, functions) {
    const cellName = 'edit';
    const cbValueParser = rIndx => () => !(functions.getItemValue(rIndx, col) || false);
    const cbProps = {
      id: `ocDatagridEditInput-${gridId}-${column.columnKey}-${rowIndex}`,
      tabIndex,
      checked: functions.getItemValue(rowIndex, col) || false,
      onChange: functions.onCellValueChange(rowIndex, col, cbValueParser(rowIndex)),
      onKeyDown: functions.onCellKeyDown(rowIndex, col),
      onBlur: functions.onCellBlur(rowIndex, col),
      onFocus: functions.onCellFocus(cellName, col.componentType, rowIndex, column.columnKey),
      inputRef: functions.handleCellRef(rowIndex, col),
      ...col.editComponentProps,
    };
    return checkboxRender(cbProps);
  },

  cellCreate(col, column, rowIndex, tabIndex, gridId, functions) {
    const cbValueParser = rIndx => () => !(functions.getItemValue(rIndx, col) || false);
    const cbProps = {
      id: `ocDatagridCreateInput-${gridId}-${column.columnKey}-${rowIndex}`,
      tabIndex,
      checked: functions.getItemValue(rowIndex, col) || false,
      onChange: functions.onCellValueChange(rowIndex, col, cbValueParser(rowIndex)),
      onKeyDown: functions.onCellKeyDown(rowIndex, col),
      onBlur: functions.onCellBlur(rowIndex, col),
      inputRef: functions.handleCellRef(rowIndex, col),
      ...col.createComponentProps,
    };
    return checkboxRender(cbProps);
  },

  cellFilter(col, column, tabIndex, gridId, intl, functions) {
    const cbValueParser = val => val;
    const selectOptions = [
      { value: true, label: intl.formatMessage({ id: 'Grid.Checked' }) },
      { value: false, label: intl.formatMessage({ id: 'Grid.UnChecked' }) },
    ];
    const selectTranslations = col.selectComponentTranslations || {
      placeholder: intl.formatMessage({ id: 'Grid.FloatingSelect.Select' }),
      noResultsText: intl.formatMessage({ id: 'Grid.FloatingSelect.NoResults' }),
    };
    const cbProps = {
      name: `ocDatagridFilterInput-${gridId}-${column.columnKey}`,
      options: selectOptions,
      value: functions.getItemValue(col, selectOptions),
      onChange: functions.onCellValueChange(col, cbValueParser),
      isSearchable: false,
      isClearable: true,
      tabSelectsValue: false,
      openMenuOnFocus: true,
      tabIndex,
      ...col.filterComponentProps,
      ...selectTranslations,
    };
    // checkbox filter is rendered as select - so use selectRender instead
    return selectRender({ ...cbProps });
  },
};
