/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl } from 'react-bootstrap';
import { injectIntl, intlShape } from 'react-intl';
import moment from 'moment';
import DayPicker, { DateUtils } from 'react-day-picker';
import LocaleUtils from 'react-day-picker/moment';
import TetherComponent from 'react-tether';
import 'react-day-picker/lib/style.css';

@injectIntl
export default class DatePicker extends React.Component {
  static propTypes = {
    intl: intlShape.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func,
    language: PropTypes.string.isRequired,
    dateFormat: PropTypes.string,
    inputProps: PropTypes.object,
    inputRef: PropTypes.func,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    value: '',
    dateFormat: 'L',
    onChange() {},
    inputProps: {},
    inputRef() {},
    disabled: false,
  };

  constructor(props) {
    super(props);
    const state = {
      showOverlay: false,
      selectedDay: null,
    };
    if (props.value !== '' && /^\d{1,2}[.\-/]{1}\d{1,2}[.\-/]{1}\d{4}$/.test(props.value)) {
      const momentDay = moment.utc(props.value, props.dateFormat);
      if (momentDay.isValid()) {
        state.selectedDay = momentDay.toDate();
      }
    }
    this.state = state;
    this.localeUtils = Object.assign(
      LocaleUtils,
      { getFirstDayOfWeek: () => moment.localeData().firstDayOfWeek() },
    );
    this.input = null;
    this.daypicker = null;
    this.clickedInside = false;
    this.clickTimeout = null;
  }

  componentWillUnmount() {
    clearTimeout(this.clickTimeout);
  }

  handleContainerMouseDown = () => {
    this.clickedInside = true;
    // The input's onBlur method is called from a queue right after onMouseDown event.
    // setTimeout adds another callback in the queue, but is called later than onBlur event
    this.clickTimeout = setTimeout(() => {
      this.clickedInside = false;
    }, 0);
  }

  handleInputFocus = () => {
    this.setState({
      showOverlay: true,
    });
  }

  handleInputBlur = () => {
    const showOverlay = this.clickedInside;

    this.setState({
      showOverlay,
    });

    // Force input's focus if blur event was caused by clicking on the calendar
    if (showOverlay) {
      this.input.focus();
    }
  }

  handleInputChange = (e) => {
    let { value } = e.target;

    // Remove invisble LRM chars from datestring
    if (value.replace) {
      value = value.replace(/\u200E/g, '');
    }

    if (value === '') {
      this.setState({
        selectedDay: null,
      });
      this.props.onChange(null);
      return;
    }
    this.props.onChange(value);

    const momentDay = moment.utc(value, this.props.dateFormat);
    if (
      /^\d{1,2}[.\-/]{1}\d{1,2}[.\-/]{1}\d{4}$/.test(value) &&
      momentDay.isValid()
    ) {
      this.setState({
        selectedDay: momentDay.toDate(),
      }, () => {
        if (this.daypicker) {
          this.daypicker.showMonth(this.state.selectedDay);
        }
      });
    }
  }


  handleDayClick = (e, day) => {
    this.setState({
      selectedDay: day,
      showOverlay: false,
    });
    // Remove invisble LRM chars from datestring
    this.props.onChange(
      this.props.intl.formatDate(moment.utc(day).format()).replace(/\u200E/g, ''),
    );
    this.input.blur();
  }

  render() {
    /* eslint-disable no-unused-vars */
    const {
      language,
      dateFormat,
      value,
      onChange,
      intl,
      inputProps,
      inputRef,
      disabled,
      ...otherProps } = this.props;
    const overlayStyle = {
      backgroundColor: '#fff',
      boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
    };
    return (
      <TetherComponent
        attachment="top center"
        constraints={[{
          to: 'scrollParent',
          attachment: 'together',
        }]}
      >
        <FormGroup>
          <FormControl
            type="text"
            inputRef={(el) => {
              this.input = el;
              inputRef(el);
            }}
            value={value}
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
            onBlur={this.handleInputBlur}
            disabled={disabled}
            {...inputProps}
          />
        </FormGroup>
        { this.state.showOverlay &&
          <div
            style={overlayStyle}
            onMouseDown={this.handleContainerMouseDown}
            role="presentation"
          >
            <DayPicker
              ref={(el) => {
                this.daypicker = el;
              }}
              onDayClick={this.handleDayClick}
              selectedDays={day => DateUtils.isSameDay(this.state.selectedDay, day)}
              localeUtils={this.localeUtils}
              locale={language}
              {...otherProps}
            />
          </div>
        }
      </TetherComponent>
    );
  }
}
