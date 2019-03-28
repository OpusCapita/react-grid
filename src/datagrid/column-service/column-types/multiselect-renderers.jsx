import React from 'react';
import { FloatingSelectPortal } from '@opuscapita/react-floating-select';
import Checkbox from '@opuscapita/react-checkbox';

const MultiValueContainer = label => properties => (
  properties.selectProps.value
  && properties.selectProps.value.findIndex(selectProp =>
    selectProp.value === properties.data.value) === 0
    ? <span>{label.replace('<n>', properties.selectProps.value.length)}</span>
    : null
);

export default {
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
    const opts = col.filterSelectOptionsMod && selectOptions ?
      col.filterSelectOptionsMod(selectOptions.slice(), col) :
      selectOptions;
    const value = functions.getItemValue(col, { selectOptions });
    const options = opts.map(option => (
      value && value.some(o => option.value === o.value)
        ? { ...option, checked: true }
        : option
    ));

    const Option = ({ data: { checked, label }, innerProps }) => (
      <span {...innerProps}>
        <Checkbox onChange={() => {}} label={label} checked={checked} />
      </span>
    );

    const fsProps = {
      ...col.filterComponentProps,
      ...selectTranslations,
      components: { MultiValueContainer: MultiValueContainer(selectTranslations.selected), Option },
      hideSelectedOptions: false,
      isSearchable: selectOptions && (selectOptions.length > 9),
      isClearable: true,
      isMulti: true,
      name: `ocDatagridFilterInput-${gridId}-${column.columnKey}`,
      onChange: functions.onCellValueChange(col, editValueParser),
      options,
      tabSelectsValue: false,
      tabIndex,
      value,
      closeMenuOnSelect: false,
    };

    return <FloatingSelectPortal {...fsProps} />;
  },
};
