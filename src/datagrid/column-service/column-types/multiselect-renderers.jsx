import React from 'react';
import { fromJS, List } from 'immutable';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FloatingSelectInfinite, FloatingSelectPortal } from '@opuscapita/react-floating-select';
import Checkbox from '@opuscapita/react-checkbox';

// TODO: cellCreate, cellEdit renderers -> multiselect dropdown as cellFilter has

const MultiValueContainer = (label, optionsCount) => properties => (properties.selectProps.value
  && properties.selectProps.value.findIndex(
    selectProp => selectProp.value === properties.data.value,
  ) === 0 ? (
    <span>{label.replace('<n>', `(${properties.selectProps.value.length}/${optionsCount})`)}</span>
  ) : null);

export default {
  valRender(
    col,
    column,
    rowIndex,
    gridId,
    selectOptions = [],
    valueRender,
  ) {
    return valueRender(rowIndex, (values) => {
      // normalize values as Immutable List
      let vals = values;
      if (Array.isArray(values)) {
        vals = fromJS(values);
      }
      if (!List.isList(vals)) {
        vals = fromJS([values]);
      }
      // No items return empty string
      if (!vals.size) return '';
      // If only one is selected render value normally
      if (vals.size === 1) {
        const option = selectOptions.find(o => o.value === vals.get(0));
        return option ? option.label : null;
      }
      // Multiple values selected, render '3 selected'
      const selectedText = (col.translations && col.translations.itemsSelected) || 'selected';
      const valueText = (
        <span>
          {`${vals.size} ${selectedText}`}
        </span>
      );
      // without tooltip
      if (col.isMultiselectTooltipDisabled) {
        return valueText;
      }
      // with tooltip
      return (
        <OverlayTrigger
          placement="top"
          overlay={(
            <Tooltip id={`ocDatagridMultiselectTooltip-${gridId}-${column.columnKey}-${rowIndex}`}>
              <div style={{ textAlign: 'left' }}>
                {selectOptions.filter(o => vals.includes(o.value)).map(v => (
                  <React.Fragment key={v.value}>
                    <span>
                      {v.label}
                    </span>
                    <br />
                  </React.Fragment>
                ))}
              </div>
            </Tooltip>
          )}
          delay={500}
        >
          {valueText}
        </OverlayTrigger>
      );
    });
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
    const value = functions.getItemMultiValue(col);
    // const handleClick = (e, onClick) => {
    //   if (e.target.className !== 'oc-checkbox') {
    //     // e.stopPropagation();
    //     // e.preventDefault();
    //   }
    //   onClick(e);
    // }
    const Option = ({ data: { checked, label }, innerProps }) => (
      // <span {...innerProps} onClick={e => handleClick(e, innerProps.onClick)}>
      <span {...innerProps}>
        <Checkbox onChange={() => {}} label={label} checked={checked} />
      </span>
    );
    const options = opts.map(
      option => ({ ...option, checked: (value && value.some(o => option.value === o.value)) }),
    );

    const fsProps = {
      ...col.filterComponentProps,
      ...selectTranslations,
      components: {
        MultiValueContainer: MultiValueContainer(selectTranslations.selected,
          (options || []).length),
        Option,
      },
      hideSelectedOptions: false,
      isSearchable: selectOptions && selectOptions.length > 9,
      isClearable: true,
      isMulti: true,
      name: `ocDatagridFilterInput-${gridId}-${column.columnKey}`,
      onChange: functions.onCellMultiValueChange(col, editValueParser),
      onBlur: functions.onCellMultiValueBlur(col),
      options,
      tabSelectsValue: false,
      tabIndex,
      value,
      closeMenuOnSelect: false,
    };
    return column.virtualized
      ? <FloatingSelectInfinite {...fsProps} />
      : <FloatingSelectPortal {...fsProps} />;
  },
};
