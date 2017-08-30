
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentDelete from 'material-ui/svg-icons/content/remove';
import ContentSettings from 'material-ui/svg-icons/action/settings';
import ContentPermissions from 'material-ui/svg-icons/social/people';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Tooltip from '../../components/Tooltip';
// import '../../assets/commonStyles/index.css';

const tooltipStyles = {
  marginRight: 54,
  paddingLeft: 40,
};

const iconStyles = {
  marginRight: 24,
};


export default class AdminActionCard extends Component {

  render() {
    const {
      id,
    } = this.props;

    return (<div>
      <Tooltip
        label="   Settings"
        style={tooltipStyles}
      >
        <Link
          activeClassName="active"
          to={`/settings/${id}`}
        >
          <FloatingActionButton style={iconStyles}>
            <ContentSettings />
          </FloatingActionButton>
        </Link>
      </Tooltip>
      <Tooltip label="   Permissions">
        <Link
          activeClassName="active"
          to={`/permissions/${id}`}
        >
          <FloatingActionButton style={iconStyles}>
            <ContentPermissions />
          </FloatingActionButton>
        </Link>
      </Tooltip>
      <Tooltip label="   Delete">
        <FloatingActionButton style={iconStyles} >
          <ContentDelete />
        </FloatingActionButton>
      </Tooltip>
    </div>);
  }
}

AdminActionCard.propTypes = {
  id: PropTypes.string,
};
