import { PropTypes } from 'react';
const NO_ERROR_LENGTH = 0;
const TextInput = ({ name, label, onChange, placeholder, value, error, type }) => {
  const wrapperClass = { name: 'form-group' };

  if (error && error.length > NO_ERROR_LENGTH) {
    wrapperClass.name += 'has-error';
  }

  return (
    <div className={wrapperClass.name}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <input
          className="form-control"
          name={name}
          placeholder={placeholder}
          type={type || 'text'}
          value={value}
          onChange={onChange}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

TextInput.propTypes = {
  error: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default TextInput;
