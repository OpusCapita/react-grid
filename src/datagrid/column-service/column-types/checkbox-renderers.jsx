import React from 'react';
import FaCheck from 'react-icons/lib/fa/check';
import Checkbox from '@opuscapita/react-checkbox';
import { selectRender } from './select-renderers';

export const checkboxRender = checkboxProps => (<Checkbox {...checkboxProps} />);

export default {

  valRender(rowIndex, valueRender) {
    return valueRender(rowIndex, v => (v ? <FaCheck size={20} /> : null));
  },

  cellEdit(col, column, rowIndex, tabIndex, functions) {
    const cellName = 'edit';
    const cbValueParser = rIndx => () => !(functions.getItemValue(rIndx, col) || false);
    const cbEditProps = {
      tabIndex,
      checked: functions.getItemValue(rowIndex, col) || false,
      onChange: functions.onCellValueChange(rowIndex, col, cbValueParser(rowIndex)),
      onBlur: functions.onCellBlur(rowIndex, col),
      onFocus: functions.onCellFocus(cellName, col.componentType, rowIndex, column.columnKey),
      ref: functions.handleCellRef(rowIndex, col),
      ...col.filterComponentProps,
    };
    return checkboxRender({ ...cbEditProps });
  },

  cellCreate(col, rowIndex, tabIndex, functions) {
    const cbValueParser = rIndx => () => !(functions.getItemValue(rIndx, col) || false);
    const cbProps = {
      tabIndex,
      checked: functions.getItemValue(rowIndex, col) || false,
      onChange: functions.onCellValueChange(rowIndex, col, cbValueParser(rowIndex)),
      onBlur: functions.onCellBlur(rowIndex, col),
      inputRef: functions.handleCellRef(rowIndex, col),
      ...col.filterComponentProps,
    };
    return checkboxRender({ ...cbProps });
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
      name: `${col.valueKeyPath.join()}-filter`,
      options: selectOptions,
      value: functions.getItemValue(col, selectOptions),
      onChange: functions.onCellValueChange(col, cbValueParser),
      isSearchable: false,
      isClearable: true,
      tabSelectsValue: false,
      openMenuOnFocus: true,
      inputId: `ocDatagridFilterInput-${gridId}-${column.columnKey}`,
      tabIndex,
      ...col.filterComponentProps,
      ...selectTranslations,
    };
    // checkbox filter is rendered as select - so use selectRender instead
    return selectRender({ ...cbProps });
  },
};
