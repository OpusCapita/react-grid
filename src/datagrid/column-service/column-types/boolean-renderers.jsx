import React from 'react';
import { FormattedMessage as M } from 'react-intl';
import { selectRender } from './select-renderers';

export default {
  // booleanValueRender
  valRender(col, rowIndex, valueRender) {
    return valueRender(
      rowIndex,
      v => <M id={v ? 'Grid.Yes' : 'Grid.No'} {...col.renderComponentProps} />,
    );
  },
  // booleanCellEdit
  cellEdit(
    col,
    column,
    rowIndex,
    tabIndex,
    gridId,
    selectOptions,
    selectTranslations,
    valueParser,
    functions,
    getComponentDisabledState,
  ) {
    const cellName = 'edit';
    const booleanProps = {
      name: `ocDatagridEditInput-${gridId}-${column.columnKey}-${rowIndex}`,
      options: selectOptions,
      value: functions.getItemValue(rowIndex, col, selectOptions),
      onChange: functions.onCellValueChange(rowIndex, col, valueParser),
      onBlur: functions.onCellBlur(rowIndex, col),
      onFocus: functions.onCellFocus(cellName, col.componentType, rowIndex, column.columnKey),
      onKeyDown: functions.onCellKeyDown(rowIndex, col),
      isSearchable: false,
      isClearable: !col.isRequired,
      backSpaceRemovesValue: false,
      tabSelectsValue: false,
      openMenuOnFocus: false,
      isDisabled: getComponentDisabledState(rowIndex, col, cellName),
      ref: functions.handleCellRef(rowIndex, col),
      tabIndex,
      ...col.editComponentProps,
      ...selectTranslations,
    };
    return selectRender({ ...booleanProps });
  },
  // booleanCellCreate
  cellCreate(
    col,
    column,
    rowIndex,
    tabIndex,
    gridId,
    selectOptions,
    selectTranslations,
    valueParser,
    functions,
    getComponentDisabledState,
  ) {
    const cellName = 'create';
    // closeOnMenuSelect
    const booleanProps = {
      name: `ocDatagridCreateInput-${gridId}-${column.columnKey}-${rowIndex}`,
      options: selectOptions,
      value: functions.getItemValue(rowIndex, col, selectOptions),
      onChange: functions.onCellValueChange(rowIndex, col, valueParser),
      onBlur: functions.onCellBlur(rowIndex, col),
      onKeyDown: functions.onCellKeyDown(rowIndex, col),
      isSearchable: false,
      isClearable: !col.isRequired,
      backspaceRemovesValue: false,
      tabSelectsValue: false,
      openOnFocus: true,
      ref: functions.handleCellRef(rowIndex, col),
      isDisabled: getComponentDisabledState(rowIndex, col, cellName),
      tabIndex,
      ...col.createComponentProps,
      ...selectTranslations,
    };
    return selectRender({ ...booleanProps });
  },
  // booleanCellFilter
  cellFilter(
    col,
    column,
    tabIndex,
    gridId,
    selectOptions,
    selectTranslations,
    filterValueParser,
    functions,
  ) {
    const booleanProps = {
      name: `ocDatagridFilterInput-${gridId}-${column.columnKey}`,
      options: selectOptions,
      value: functions.getItemValue(col, selectOptions),
      onChange: functions.onCellValueChange(col, filterValueParser),
      isSearchable: false,
      isClearable: true,
      tabSelectsValue: false,
      openMenuOnFocus: false,
      tabIndex,
      ...col.filterComponentProps,
      ...selectTranslations,
    };
    return selectRender({ ...booleanProps });
  },
};
