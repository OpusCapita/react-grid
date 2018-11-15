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
      name: `${col.valueKeyPath.join()}-${cellName}-${rowIndex}`,
      options: selectOptions,
      value: functions.getItemValue(rowIndex, col, selectOptions),
      onChange: functions.onCellValueChange(rowIndex, col, valueParser),
      onBlur: functions.onCellBlur(rowIndex, col),
      onFocus: functions.onCellFocus(cellName, col.componentType, rowIndex, column.columnKey),
      isSearchable: false,
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
      name: `${col.valueKeyPath.join()}-${cellName}-${rowIndex}`,
      options: selectOptions,
      value: functions.getItemValue(rowIndex, col, selectOptions),
      onChange: functions.onCellValueChange(rowIndex, col, valueParser),
      onBlur: functions.onCellBlur(rowIndex, col),
      onKeyDown: functions.onCellKeyDown,
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
    const cellName = 'filter';
    const booleanProps = {
      name: `${col.valueKeyPath.join()}-${cellName}`,
      options: selectOptions,
      value: functions.getItemValue(col, selectOptions),
      onChange: functions.onCellValueChange(col, filterValueParser),
      isSearchable: false,
      isClearable: true,
      tabSelectsValue: false,
      openMenuOnFocus: true,
      inputId: `ocDatagridFilterInput-${gridId}-${column.columnKey}`,
      tabIndex,
      ...col.filterComponentProps,
      ...selectTranslations,
    };
    return selectRender({ ...booleanProps });
  },
};
