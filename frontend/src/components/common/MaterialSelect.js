import React from 'react';
import { Component, PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import '../../assets/commonStyles/index.css';


export default class MaterialSelect extends Component {

  constructor(props) {
    super(props);
    // this.setState({});
    this.state = { value: '' };
  }

  handleChange(e, context, value) {
    this.props.onChange(e, context, value);
  }

  render() {
    const { name, label, error, options } = this.props;


    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <div className="field">
          {/* Note, value is set here rather than on the option - docs: https://facebook.github.io/react/docs/forms.html */}
          <SelectField
            floatingLabelText={label}
            value={this.state.value}
            onChange={this.handleChange}
          >
            {options}
          </SelectField>
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
      </div>
    );
  }
}

MaterialSelect.propTypes = {
  error: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.string,
  onChange: PropTypes.func,
};
