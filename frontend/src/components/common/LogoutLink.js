import React from 'react';

const LogoutLink = ({ signOut }) => <a
  href="/logout"
  onClick={signOut}
> {'Logout'}</a>;

LogoutLink.propTypes = {
  signOut: React.PropTypes.func.isRequired,
};

export default LogoutLink;
