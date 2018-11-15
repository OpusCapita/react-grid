import React from 'react';
import { FloatingSelectPortal } from '@opuscapita/react-floating-select';

export const selectRender = selectProps => (
  <FloatingSelectPortal ref={selectProps.ref} {...selectProps} />
);


export default {

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
    const opts = col.editSelectOptionsMod && selectOptions ?
      col.editSelectOptionsMod(selectOptions.slice(), rowIndex, col) :
      selectOptions;
    const fsProps = {
      name: `${col.valueKeyPath.join()}-${cellName}-${rowIndex}`,
      options: opts,
      value: functions.getItemValue(rowIndex, col),
      onChange: functions.onCellValueChange(rowIndex, col, editValueParser),
      onBlur: functions.onCellBlur(rowIndex, col),
      onFocus: functions.onCellFocus(cellName, col.componentType, rowIndex, column.columnKey),
      isSearchable: selectOptions && (selectOptions.length > 9),
      isClearable: !col.isRequired,
      backSpaceRemovesValue: false,
      tabSelectsValue: false,
      openMenuOnFocus: true,
      ref: functions.handleCellRef(rowIndex, col),
      inputId: `ocDatagridEditInput-${gridId}-${column.columnKey}-${rowIndex}`,
      isDisabled: getComponentDisabledState(rowIndex, col, cellName),
      tabIndex,
      ...col.editComponentProps,
      ...selectTranslations,
    };
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
    const opts = col.createSelectOptionsMod && selectOptions ?
      col.createSelectOptionsMod(selectOptions.slice(), rowIndex, col) :
      selectOptions;

    const fsProps = {
      name: `${col.valueKeyPath.join()}-${cellName}-${rowIndex}`,
      options: opts,
      value: functions.getItemValue(rowIndex, col),
      onChange: functions.onCellValueChange(rowIndex, col, editValueParser),
      onBlur: functions.onCellBlur(rowIndex, col),
      onFocus: functions.onCellFocus(cellName, col.componentType, rowIndex, column.columnKey),
      isSearchable: selectOptions && (selectOptions.length > 9),
      isClearable: !col.isRequired,
      backspaceRemovesValue: false,
      tabSelectsValue: false,
      openMenuOnFocus: true,
      ref: functions.handleCellRef(rowIndex, col),
      inputProps: { id: `ocDatagridCreateInput-${gridId}-${column.columnKey}-${rowIndex}` },
      isDisabled: getComponentDisabledState(rowIndex, col, cellName),
      tabIndex,
      ...col.createComponentProps,
      ...selectTranslations,
    };
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
    const cellName = 'filter';
    const opts = col.filterSelectOptionsMod && selectOptions ?
      col.filterSelectOptionsMod(selectOptions.slice(), col) :
      selectOptions;
    const fsProps = {
      name: `${col.valueKeyPath.join()}-${cellName}`,
      options: opts,
      value: functions.getItemValue(col),
      onChange: functions.onCellValueChange(col, editValueParser),
      isSearchable: selectOptions && (selectOptions.length > 9),
      isClearable: true,
      tabSelectsValue: false,
      openMenuOnFocus: true,
      inputId: `ocDatagridFilterInput-${gridId}-${column.columnKey}`,
      tabIndex,
      ...col.filterComponentProps,
      ...selectTranslations,
    };

    return selectRender({ ...fsProps });
  },

};
