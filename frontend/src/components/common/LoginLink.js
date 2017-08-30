import React from 'react';
import { Link } from 'react-router';

const LoginLink = () => (
  <span>
    <Link
      activeClassName="active"
      to="/register"
    >{'Sign Up'}</Link>
    {' | '}
    <Link
      activeClassName="active"
      to="/login"
    >{'Login'}</Link>
  </span>
  );

export default LoginLink;
