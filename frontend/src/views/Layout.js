import React, { Component, PropTypes } from 'react';

export default class Layout extends Component {

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}


Layout.propTypes = {
  children: PropTypes.object,
};
