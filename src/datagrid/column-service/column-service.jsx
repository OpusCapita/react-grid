import { Map } from 'immutable';
import invariant from 'invariant';
import Utils from '../datagrid.utils';
import {
  DateType,
  SelectType,
  BooleanType,
  CheckboxType,
  CurrencyType,
  PrimitiveType,
  MultiSelectType,
} from './column-types/column-types';

export default {
  baseColumn(col) {
    const baseCol = {
      header: col.header,
      columnKey: Utils.getColumnKey(col),
      width: col.width || col.width === 0 ? col.width : 200,
      minWidth: col.minWidth || col.minWidth === 0 ? col.minWidth : 40,
      maxWidth: col.maxWidth,
      isResizable: !col.disableResizing,
      fixed: !!col.fixed,
      fixedRight: !!col.fixedRight,
      allowCellsRecycling: !!col.allowCellsRecycling,
      disableSorting: !!col.disableSorting,
      isRequired: !!col.isRequired,
      componentType: col.componentType,
      style: Utils.getCellStyleByCol(col),
      virtualized: !!col.virtualized,
    };
    // valueKeyPath
    if (col.valueKeyPath) baseCol.valueKeyPath = col.valueKeyPath;
    // flexGrow
    if (col.flexGrow) baseCol.flexGrow = col.flexGrow;
    // valueType
    if (col.valueType) baseCol.valueType = col.valueType;
    // sortComparator
    if (col.sortComparator) baseCol.sortComparator = col.sortComparator;
    // sortValueGetter
    if (col.sortValueGetter) baseCol.sortValueGetter = col.sortValueGetter;
    // translations
    if (col.translations) baseCol.translations = col.translations;
    return baseCol;
  },

  columnCell(baseColumn, props, col, baseValueRender) {
    const column = baseColumn;
    if (col.cell) {
      column.cell = col.cell;
    } else if (col.valueRender) {
      column.cell = rowIndex => col.valueRender(props.data.get(rowIndex), rowIndex);
    } else {
      const { selectComponentOptions = Map() } = props;
      switch (col.componentType) {
        case 'number': // fall through
        case 'float': {
          column.cell = rowIndex => PrimitiveType.numberValRender(
            col,
            rowIndex,
            props.thousandSeparator,
            props.decimalSeparator,
            baseValueRender,
          );
          break;
        }

        case 'boolean': {
          column.cell = rowIndex => BooleanType.valRender(col, rowIndex, baseValueRender);
          break;
        }

        case 'checkbox': {
          column.cell = rowIndex => CheckboxType.valRender(rowIndex, baseValueRender);
          break;
        }

        case 'multiselect': {
          const selectOptions = col.selectComponentOptions
            || selectComponentOptions.get(column.columnKey);
          invariant(
            selectOptions,
            `No selectComponentOptions provided for column '${column.columnKey}'`,
          );
          column.cell = rowIndex => MultiSelectType.valRender(
            col,
            column,
            rowIndex,
            props.grid.id,
            selectOptions,
            baseValueRender,
          );
          break;
        }

        case 'select': {
          const selectOptions = col.selectComponentOptions
            || selectComponentOptions.get(column.columnKey);
          invariant(
            selectOptions,
            `No selectComponentOptions provided for column '${column.columnKey}'`,
          );
          column.cell = rowIndex => SelectType.valRender(
            rowIndex,
            selectOptions,
            baseValueRender,
          );
          break;
        }

        case 'date': {
          column.cell = rowIndex => DateType.valRender(rowIndex, props.dateFormat, baseValueRender);
          break;
        }
        // change valRenders to just take props --> saves some 'energy'
        case 'currency': {
          column.cell = rowIndex => CurrencyType.valRender(
            col,
            props.data,
            rowIndex,
            props.thousandSeparator,
            props.decimalSeparator,
            baseValueRender,
          );
          break;
        }

        default: {
          column.cell = rowIndex => baseValueRender(rowIndex);
          break;
        }
      }
    }
    // cellEdit render
    if (col.cellEdit) {
      column.cellEdit = col.cellEdit;
    } else if (col.editValueRender) {
      column.cellEdit = (rowIndex, setRef, onKeyDown) => col.editValueRender(
        props.data.get(rowIndex, Map()),
        rowIndex,
        setRef,
        onKeyDown,
      );
    }

    // cellCreate render
    if (col.cellCreate) {
      column.cellCreate = col.cellCreate;
    } else if (col.createValueRender) {
      column.cellCreate = (rowIndex, setRef, onKeyDown) => col.createValueRender(
        props.data.get(rowIndex, Map()),
        rowIndex,
        setRef,
        onKeyDown,
      );
    }

    // cellFilter render
    if (col.cellFilter) {
      column.cellFilter = col.cellFilter;
    } else if (col.filterValueRender) {
      column.cellFilter = rowIndex => col.filterValueRender(props.data.get(rowIndex), rowIndex);
    }
    return column;
  },

  columnComponentType(baseColumn, tabIndex, props, col, functions, getDisabledState) {
    if (!col.componentType) return baseColumn;
    const column = baseColumn;
    const editValueParser = col.editValueParser ? col.editValueParser : val => val;
    // Grid internal functions separated
    const editFunctions = { ...functions.edit };
    const createFunctions = { ...functions.create };
    const filterFunctions = { ...functions.filter };
    const { selectComponentOptions = Map() } = props;

    // Primitive value parser
    let primitiveValParser = editValueParser;
    if (!col.editValueParser && col.componentType === 'float') {
      primitiveValParser = (val) => {
        if (val && val.replace) {
          return val.replace(new RegExp(`[^\\d${props.decimalSeparator}+-]`, 'g'), '');
        }
        return '';
      };
    }

    switch (col.componentType) {
      case 'float':
      case 'number':
      case 'text': {
        const formControlType = col.componentType === 'float' || col.componentType === 'number'
          ? 'text'
          : col.componentType;
        // always use col.editValueParser override if available

        if (props.inlineEdit && !column.cellEdit) {
          column.cellEdit = rowIndex => PrimitiveType.cellEdit(
            col,
            column,
            rowIndex,
            tabIndex,
            props.grid.id,
            primitiveValParser,
            formControlType,
            ...editFunctions,
            getDisabledState,
          );
        }

        if (props.inlineEdit && !column.cellCreate) {
          column.cellCreate = rowIndex => PrimitiveType.cellCreate(
            col,
            column,
            rowIndex,
            tabIndex,
            props.grid.id,
            primitiveValParser,
            formControlType,
            ...createFunctions,
            getDisabledState,
          );
        }

        if (props.filtering && !column.cellFilter) {
          column.cellFilter = () => PrimitiveType.cellFilter(
            col,
            column,
            tabIndex,
            props.grid.id,
            primitiveValParser,
            formControlType,
            ...filterFunctions,
          );
        }
        break;
      }

      case 'checkbox': {
        if (props.inlineEdit && !column.cellEdit) {
          column.cellEdit = rowIndex => CheckboxType.cellEdit(
            col,
            column,
            rowIndex,
            tabIndex,
            props.grid.id,
            ...editFunctions,
          );
        }
        if (props.inlineEdit && !column.cellCreate) {
          column.cellCreate = rowIndex => CheckboxType.cellCreate(
            col,
            column,
            rowIndex,
            tabIndex,
            props.grid.id,
            ...createFunctions,
          );
        }
        if (props.filtering && !column.cellFilter) {
          column.cellFilter = () => CheckboxType.cellFilter(
            col,
            column,
            tabIndex,
            props.grid.id,
            props.intl,
            ...filterFunctions,
          );
        }
        break;
      }

      case 'multiselect': {
        const selectOptions = col.selectComponentOptions
          || selectComponentOptions.get(column.columnKey);
        invariant(
          selectOptions,
          `No selectComponentOptions provided for column '${column.columnKey}'`,
        );
        const selectTranslations = col.selectComponentTranslations || {
          placeholder: props.intl.formatMessage({ id: 'Grid.FloatingSelect.Select' }),
          noResultsText: props.intl.formatMessage({ id: 'Grid.FloatingSelect.NoResults' }),
          // Variable 'n' must be provided in this phase in order to avoid
          // Error: The intl string context variable 'n' was not provided to the string {n}
          // selected
          // Variable n is replaced later, when its value is available
          selected: props.intl.formatMessage({ id: 'Grid.FloatingSelect.Selected' }, { n: '<n>' }),
        };

        if (props.inlineEdit && !column.cellEdit) {
          column.cellEdit = rowIndex => SelectType.cellEdit(
            col,
            column,
            rowIndex,
            tabIndex,
            props.grid.id,
            selectOptions,
            selectTranslations,
            editValueParser,
            ...editFunctions,
            getDisabledState,
          );
        }
        if (props.inlineEdit && !column.cellCreate) {
          column.cellCreate = rowIndex => SelectType.cellCreate(
            col,
            column,
            rowIndex,
            tabIndex,
            props.grid.id,
            selectOptions,
            selectTranslations,
            editValueParser,
            ...createFunctions,
            getDisabledState,
          );
        }
        if (props.filtering && !column.cellFilter) {
          column.cellFilter = () => MultiSelectType.cellFilter(
            col,
            column,
            tabIndex,
            props.grid.id,
            selectOptions,
            selectTranslations,
            editValueParser,
            ...filterFunctions,
          );
        }
        break;
      }

      case 'select': {
        const selectOptions = col.selectComponentOptions
          || selectComponentOptions.get(column.columnKey);
        invariant(
          selectOptions,
          `No selectComponentOptions provided for column '${column.columnKey}'`,
        );
        const selectTranslations = col.selectComponentTranslations || {
          placeholder: props.intl.formatMessage({ id: 'Grid.FloatingSelect.Select' }),
          noResultsText: props.intl.formatMessage({ id: 'Grid.FloatingSelect.NoResults' }),
        };

        if (props.inlineEdit && !column.cellEdit) {
          column.cellEdit = rowIndex => SelectType.cellEdit(
            col,
            column,
            rowIndex,
            tabIndex,
            props.grid.id,
            selectOptions,
            selectTranslations,
            editValueParser,
            ...editFunctions,
            getDisabledState,
          );
        }
        if (props.inlineEdit && !column.cellCreate) {
          column.cellCreate = rowIndex => SelectType.cellCreate(
            col,
            column,
            rowIndex,
            tabIndex,
            props.grid.id,
            selectOptions,
            selectTranslations,
            editValueParser,
            ...createFunctions,
            getDisabledState,
          );
        }
        if (props.filtering && !column.cellFilter) {
          column.cellFilter = () => SelectType.cellFilter(
            col,
            column,
            tabIndex,
            props.grid.id,
            selectOptions,
            selectTranslations,
            editValueParser,
            ...filterFunctions,
          );
        }
        break;
      }

      case 'boolean': {
        const selectOptions = [
          { value: true, label: props.intl.formatMessage({ id: 'Grid.Yes' }) },
          { value: false, label: props.intl.formatMessage({ id: 'Grid.No' }) },
        ];
        const selectTranslations = col.selectComponentTranslations || {
          placeholder: props.intl.formatMessage({ id: 'Grid.FloatingSelect.Select' }),
          noResultsText: props.intl.formatMessage({ id: 'Grid.FloatingSelect.NoResults' }),
        };

        if (props.inlineEdit && !column.cellEdit) {
          column.cellEdit = rowIndex => BooleanType.cellEdit(
            col,
            column,
            rowIndex,
            tabIndex,
            props.grid.id,
            selectOptions,
            selectTranslations,
            editValueParser,
            ...editFunctions,
            getDisabledState,
          );
        }
        if (props.inlineEdit && !column.cellCreate) {
          column.cellCreate = rowIndex => BooleanType.cellCreate(
            col,
            column,
            rowIndex,
            tabIndex,
            props.grid.id,
            selectOptions,
            selectTranslations,
            editValueParser,
            ...createFunctions,
            getDisabledState,
          );
        }
        if (props.filtering && !column.cellFilter) {
          column.cellFilter = () => BooleanType.cellFilter(
            col,
            column,
            tabIndex,
            props.grid.id,
            selectOptions,
            selectTranslations,
            editValueParser,
            ...filterFunctions,
          );
        }
        break;
      }

      case 'date': {
        if (props.inlineEdit && !column.cellEdit) {
          column.cellEdit = rowIndex => DateType.cellEdit(
            col,
            column,
            rowIndex,
            tabIndex,
            props.grid.id,
            props.region,
            props.dateFormat,
            editValueParser,
            ...editFunctions,
            getDisabledState,
          );
        }
        if (props.inlineEdit && !column.cellCreate) {
          column.cellCreate = rowIndex => DateType.cellCreate(
            col,
            column,
            rowIndex,
            tabIndex,
            props.grid.id,
            props.region,
            props.dateFormat,
            editValueParser,
            ...createFunctions,
            getDisabledState,
          );
        }
        if (props.filtering && !column.cellFilter) {
          column.cellFilter = () => DateType.cellFilter(
            col,
            column,
            tabIndex,
            props.grid.id,
            props.region,
            props.dateFormat,
            editValueParser,
            ...filterFunctions,
          );
        }
        break;
      }
      case 'currency': {
        if (props.inlineEdit && !column.cellCreate) {
          column.cellEdit = rowIndex => CurrencyType.cellEdit(
            col,
            column,
            tabIndex,
            rowIndex,
            props.grid.id,
            ...editFunctions,
            editValueParser,
            getDisabledState,
            props.data,
            props.thousandSeparator,
            props.decimalSeparator,
          );
        }
        if (props.inlineEdit && !column.cellCreate) {
          column.cellCreate = rowIndex => CurrencyType.cellCreate(
            col,
            column,
            tabIndex,
            rowIndex,
            props.grid.id,
            ...createFunctions,
            editValueParser,
            getDisabledState,
            props.data,
            props.thousandSeparator,
            props.decimalSeparator,
          );
        }
        if (props.filtering && !column.cellFilter) {
          column.cellFilter = () => PrimitiveType.cellFilter(
            col,
            column,
            tabIndex,
            props.grid.id,
            primitiveValParser,
            'text',
            ...filterFunctions,
          );
        }
        break;
      }
      default:
    }
    return column;
  },
};
