
import { Component, PropTypes } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import IconMenu from 'material-ui/IconMenu';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import { red500, deepOrange500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentHamburger from 'material-ui/svg-icons/navigation/menu';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import Layout from '../views/Layout';
import LoginPage from '../views/Login';
import Clips from '../views/clips';
import { google } from '../config/index';
import { DO_USER_LOGIN } from '../state-management/actions/actionTypes';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

const styles = {
  root: {
    display: 'flex',
    top: '2px',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
  },
};

const iconStyles = {
  marginRight: 24,
};

// If you use React Router, make this component
// render <Router> with your routes. Currently,
// only synchronous routes are hot reloaded, and
// you will see a warning from <Router> on every reload.
// You can ignore this warning. For details, see:
// https://github.com/reactjs/react-router/issues/2182

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      title: 'Dashboard',
    };
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });

  handleRequestChange =(open) => this.setState({ open });

  render() {
    const responseGoogle = (response) => {
      this.props.store.dispatch({
        type: DO_USER_LOGIN,
        response,
      });
        // console.log(response);
    };


    return (
      <Router>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div style={styles.root}>
            <Toolbar style={{ width: '100%' }}>
              <FloatingActionButton
                style={iconStyles}
                onTouchTap={this.handleToggle}
              >
                <ContentHamburger />
              </FloatingActionButton>
              <Drawer
                docked={false}
                open={this.state.open}
                width={200}
                onRequestChange={this.handleRequestChange}
              >
                <MenuItem>{'Dashboard'}</MenuItem>
                <MenuItem>{'Menu'}</MenuItem>
              </Drawer>
              <ToolbarGroup>
                <ToolbarTitle
                  style={{ marginLeft: '0px' }}
                  text={'Dashboard'}
                />
                <FontIcon
                  className="muidocs-icon-action-home"
                  color={red500}
                  style={iconStyles}
                />

                <ToolbarSeparator />
                <GoogleLogin
                  buttonText="Login"
                  clientId={google.LOGIN_CLIENT_ID}
                  onFailure={responseGoogle}
                  onSuccess={responseGoogle}
                />

                <ToolbarSeparator />
                <RaisedButton
                  label="Menu"
                  primary
                  style={{ align: 'right', float: true }}
                />
                <IconMenu
                  iconButtonElement={
                    <IconButton touch>
                      <NavigationExpandMoreIcon />
                    </IconButton>
                    }
                >
                  <MenuItem primaryText="Download" />
                  <MenuItem primaryText="More Info" />
                </IconMenu>
              </ToolbarGroup>
            </Toolbar>
            <div>
              <Route
                component={Clips}
                path="/"
              />
              <Route
                component={Clips}
                path="/clips/:term"
              />
              <Route
                component={LoginPage}
                path="/login"
              />
            </div>
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired,
};
export default App;
