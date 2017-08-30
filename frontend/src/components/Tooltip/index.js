import MaterialTooltip from 'material-ui/internal/Tooltip';
import React, { Component, PropTypes } from 'react';

export default class Tooltip extends Component {
  constructor(props) {
    super(props);

    this.state = { showTooltip: false };

    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
  }

  hideTooltip() {
    this.setState({ showTooltip: false });
  }

  showTooltip() {
    this.setState({ showTooltip: true });
  }

  handleBlur() {
    this.hideTooltip();
  }

  handleFocus() {
    this.showTooltip();
  }

  handleMouseLeave() {
    this.hideTooltip();
  }

  handleMouseEnter() {
    this.showTooltip();
  }

  render() {
    const {
      children,
      className,
      horizontalPosition,
      label,
      style,
      touch,
      verticalPosition,
    } = this.props;
    const { showTooltip } = this.state;

    return (
      <span
        style={{ position: 'relative', display: 'inline-block' }}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {children}
        <MaterialTooltip
          className={className}
          horizontalPosition={horizontalPosition}
          label={label}
          show={showTooltip}
          style={style}
          touch={touch}
          verticalPosition={verticalPosition}
        />
      </span>
    );
  }
}

Tooltip.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  horizontalPosition: PropTypes.string,
  label: PropTypes.node.isRequired,
  style: PropTypes.object,
  touch: PropTypes.bool,
  verticalPosition: PropTypes.string,
};
