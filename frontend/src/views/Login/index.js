
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { user, auth } from '../../state-management/actions';
import LoginForm from './LoginForm';

export class RegistrationPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: {
        email: '',
        password: '',
      },
      saving: false,
    };

    this.updateUserState = this.updateUserState.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  handleUpdateUserState(event) {
    const field = event.target.name;
    const userState = this.state.user;

    userState[field] = event.target.value;

    return this.setState({ user: userState });
  }

  handleCreateUser(event) {
    event.preventDefault();

    this.setState({ saving: true });

    /* eslint-disable */
    this.props.actions.auth.signInWithEmailAndPassword(this.state.user).
      then(() => alert('You are logged in')).
      catch((error) => {
        alert(error.message);
        this.setState({ saving: false });
      });
      /* eslint-enable */
  }

  render() {
    return (
      <LoginForm
        saving={this.state.saving}
        user={this.state.user}
        onChange={this.handleUupdateUserState}
        onSave={this.handleCreateUser}
      />
    );
  }
}

RegistrationPage.propTypes = {
  actions: PropTypes.object.isRequired,
};

RegistrationPage.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = (/* state,  ownProps*/) => ({});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    auth: bindActionCreators(auth, dispatch),
    user: bindActionCreators(user, dispatch),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
