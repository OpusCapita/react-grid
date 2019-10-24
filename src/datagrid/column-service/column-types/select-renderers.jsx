import React from 'react';
import {
  FloatingSelectPortal,
  FloatingSelectPortalCreatable,
} from '@opuscapita/react-floating-select';

export const selectRender = selectProps => <FloatingSelectPortal {...selectProps} />;

export const creatableSelectRender = selectProps => (
  <FloatingSelectPortalCreatable {...selectProps} />
);

export default {
  valRender(
    rowIndex,
    selectOptions = [],
    valueRender,
  ) {
    return valueRender(rowIndex, (v) => {
      const option = selectOptions.find(o => o.value === v);
      return option ? option.label : null;
    });
  },
  cellEdit(
    col,
    column,
    rowIndex,
    tabIndex,
    gridId,
    selectOptions,
    selectTranslations,
    editValueParser,
    functions,
    getComponentDisabledState,
  ) {
    const cellName = 'edit';
    const opts = col.editSelectOptionsMod && selectOptions
      ? col.editSelectOptionsMod(selectOptions.slice(), rowIndex, col)
      : selectOptions;
    const fsProps = {
      name: `ocDatagridEditInput-${gridId}-${column.columnKey}-${rowIndex}`,
      options: opts,
      value: functions.getItemValue(rowIndex, col, { selectOptions: opts }),
      onChange: functions.onCellValueChange(rowIndex, col, editValueParser),
      onBlur: functions.onCellBlur(rowIndex, col),
      onFocus: functions.onCellFocus(cellName, col.componentType, rowIndex, column.columnKey),
      onKeyDown: functions.onCellKeyDown(rowIndex, col),
      isSearchable: true,
      isClearable: !col.isRequired,
      backSpaceRemovesValue: false,
      tabSelectsValue: false,
      openMenuOnFocus: false,
      ref: functions.handleCellRef(rowIndex, col),
      isDisabled: getComponentDisabledState(rowIndex, col, cellName),
      tabIndex,
      ...selectTranslations,
      ...col.editComponentProps,
    };

    if (col.isCreatableSelect) return creatableSelectRender({ ...fsProps });
    return selectRender({ ...fsProps });
  },

  cellCreate(
    col,
    column,
    rowIndex,
    tabIndex,
    gridId,
    selectOptions,
    selectTranslations,
    editValueParser,
    functions,
    getComponentDisabledState,
  ) {
    const cellName = 'create';
    const opts = col.createSelectOptionsMod && selectOptions
      ? col.createSelectOptionsMod(selectOptions.slice(), rowIndex, col)
      : selectOptions;
    const fsProps = {
      name: `ocDatagridCreateInput-${gridId}-${column.columnKey}-${rowIndex}`,
      options: opts,
      value: functions.getItemValue(rowIndex, col, { selectOptions: opts }),
      onChange: functions.onCellValueChange(rowIndex, col, editValueParser),
      onBlur: functions.onCellBlur(rowIndex, col),
      onKeyDown: functions.onCellKeyDown(rowIndex, col),
      onFocus: functions.onCellFocus(cellName, col.componentType, rowIndex, column.columnKey),
      isSearchable: true,
      isClearable: !col.isRequired,
      backspaceRemovesValue: false,
      tabSelectsValue: false,
      openMenuOnFocus: false,
      ref: functions.handleCellRef(rowIndex, col),
      isDisabled: getComponentDisabledState(rowIndex, col, cellName),
      tabIndex,
      ...selectTranslations,
      ...col.createComponentProps,
    };

    if (col.isCreatableSelect) return creatableSelectRender({ ...fsProps });
    return selectRender({ ...fsProps });
  },

  cellFilter(
    col,
    column,
    tabIndex,
    gridId,
    selectOptions,
    selectTranslations,
    editValueParser,
    functions,
  ) {
    const opts = col.filterSelectOptionsMod && selectOptions
      ? col.filterSelectOptionsMod(selectOptions.slice(), col)
      : selectOptions;
    const fsProps = {
      name: `ocDatagridFilterInput-${gridId}-${column.columnKey}`,
      options: opts,
      value: functions.getItemValue(col, { selectOptions: opts }),
      onChange: functions.onCellValueChange(col, editValueParser),
      isSearchable: true,
      isClearable: true,
      tabSelectsValue: false,
      tabIndex,
      ...selectTranslations,
      ...col.filterComponentProps,
    };

    return selectRender({ ...fsProps });
  },
};
