import { Route, IndexRoute } from 'react-router';
import Layout from '../views/Layout';
import LoginPage from '../views/Login';
import Clips from '../views/clips';
// import { requireAuth } from '../state-management/actions/authActions';

export default function Routes() {
  // const checkAdmin = (nextState, replace, callback) => {
  //   const state = store.getState();
  //   const auth = state.auth;
  //
  //   if (!auth.isLogged) {
  //     store.dispatch(requireAuth(nextState, replace, callback));
  //   }
  //   callback();
  // };

  return (
    <Route
      component={Layout}
      path="/"
    >
      <IndexRoute
        component={Clips}
      />
      <Route
        component={Layout}
        path="layout"
      />
      <Route
        component={LoginPage}
        path="login"
      />
      <Route
        component={Clips}
        path="/clips/:term"
      />
    </Route>
  );
}
