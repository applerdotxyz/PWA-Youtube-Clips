
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ClipsListSection from './ClipsListSection';
import * as actionsObj from '../../state-management/actions';

import './style.css';

class Clips extends Component {

  render() {
    const { actions, user, videos, params } = this.props;
    const term = { params };
    const body = { section: (
      <div className="layout-column layoutPadding animated fadeInUp">
        <div data-ui-view="pageContent">
          <h2>{'Loading Clips ...'}</h2>
        </div>
      </div>
    ) };

    if (user && user.user && user.user.googleId) {
      body.section = (
        <ClipsListSection
          actions={actions}
          term={term.params.term || 'films'}
          user={user}
          videos={videos}
        />
      );
    }

    return (<span>{body.section}</span>);
  }
}


const mapStateToProps = (state) => {
  const { app, user, videos } = state;


  return {
    app,
    user,
    videos,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: {
    api: bindActionCreators(actionsObj.api, dispatch),
  },
});

export default connect(
 mapStateToProps,
 mapDispatchToProps
)(Clips);


Clips.propTypes = {
  actions: PropTypes.object,
  params: PropTypes.object,
  user: PropTypes.object,
  videos: PropTypes.object,
};
