/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FormattedMessage as M } from 'react-intl';
import classNames from 'classnames';

export default class DatagridTooltip extends React.Component {
  static propTypes = {
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    children: PropTypes.node,
    isEdited: PropTypes.bool,
    isError: PropTypes.bool,
    isWarning: PropTypes.bool,
    infoMessage: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        id: PropTypes.string,
        values: PropTypes.object,
      }),
    ]),
    errorMessage: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        id: PropTypes.string,
        values: PropTypes.object,
      }),
    ]),
    warningMessage: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        id: PropTypes.string,
        values: PropTypes.object,
      }),
    ]),
  };

  static defaultProps = {
    children: null,
    isEdited: false,
    isError: false,
    isWarning: false,
    infoMessage: null,
    errorMessage: null,
    warningMessage: null,
  };

  render() {
    const {
      children,
      id,
      isEdited,
      isError,
      isWarning,
      infoMessage,
      errorMessage,
      warningMessage,
    } = this.props;
    let overlayAttrs = {
      overlay: <Tooltip id={`Tooltip_${id}`} style={{ display: 'none' }} />,
    };
    const message = errorMessage || warningMessage || infoMessage;
    if (message) {
      let tooltipClassName = 'tooltip';
      if (isError) {
        tooltipClassName = 'error tooltip';
      } else if (isWarning) {
        tooltipClassName = 'warning tooltip';
      }
      overlayAttrs = {
        placement: 'top',
        overlay: (
          <Tooltip id={`Tooltip_${id}`} bsClass={tooltipClassName}>
            { message.id ? <M id={message.id} values={message.values} /> : <span>{message}</span> }
          </Tooltip>
        ),
      };
    }
    const wrapperClassName = classNames({
      'oc-datagrid-tooltip': true,
      edited: isEdited,
      error: isError,
      warning: isWarning && !isError,
      info: infoMessage && !isError && !isWarning,
    });
    return (
      <OverlayTrigger {...overlayAttrs}>
        <div
          id={id}
          className={wrapperClassName}
        >
          { children }
        </div>
      </OverlayTrigger>
    );
  }
}
