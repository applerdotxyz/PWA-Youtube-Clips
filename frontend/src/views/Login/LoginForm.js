import React from 'react';
import TextInput from '../../components/common/TextInput';

const LoginForm = ({ user, onSave, onChange, saving }) => (
  <form>
    <h1>{'Login'}</h1>
    <TextInput
      label="Email"
      name="email"
      value={user.email}
      onChange={onChange}
    />

    <TextInput
      label="Password"
      name="password"
      type="password"
      value={user.password}
      onChange={onChange}
    />

    <input
      className="btn btn-primary"
      disabled={saving}
      type="submit"
      value={saving ? 'Logging in...' : 'Login'}
      onClick={onSave}
    />
  </form>
  );

LoginForm.propTypes = {
  saving: React.PropTypes.bool,
  user: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onSave: React.PropTypes.func.isRequired,
};

export default LoginForm;
