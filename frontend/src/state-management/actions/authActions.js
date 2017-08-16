import toastr from 'toastr';
import * as daoLayer from '../api/firebase';
import * as types from './actionTypes';
import { userLoadedSuccess, userCreated } from './userActions';
//
// const config = {
//   data: {
//     roles: ['admin', 'account', 'user', 'viewer'],
//     products: [],
//   },
// };


const redirect = (replace, pathname, nextPathName, error = false) => {
  replace({
    pathname,
    state: { nextPathname: nextPathName },
  });
  if (error) {
    toastr.error(error);
  }
};


export const authInitializedDone = () => ({
  type: types.AUTH_INITIALIZATION_DONE,
});

export const authLoggedInSuccess = (userUID) => ({
  type: types.AUTH_LOGGED_IN_SUCCESS, userUID,
});


export const authLoggedOutSuccess = () => ({ type: types.AUTH_LOGGED_OUT_SUCCESS });


export const authLoggedIn = (userUID) => (dispatch, /* getState*,  getFirebase */) => {
  dispatch(authLoggedInSuccess(userUID));
  dispatch(userLoadedSuccess({ uid: userUID }));
  // redirect(replace, '/menu', nextState.location.pathname, ' *** ');
};

export const authInitialized = (user) => (dispatch, /* getState*, getFirebase */) => {
  dispatch(authInitializedDone());
  if (user) {
    dispatch(authLoggedIn(user.uid));
  } else {
    dispatch(authLoggedOutSuccess());
  }
};


export const createUserWithEmailAndPassword = (user__) =>
  (dispatch, /* getState*, getFirebase */) => daoLayer.createUserWithEmailAndPassword(user__).
    then((user) => {
      dispatch(userCreated(user));
    }).catch((error) => {
      // @TODO better error handling
      throw (error);
    });

export const signInWithEmailAndPassword = (user__) => (dispatch) => daoLayer.signInWithEmailAndPassword(user__).
  then((user) => {
    dispatch(authLoggedIn(user.uid));
  }).
  catch((error) => {
    // @TODO better error handling
    throw (error);
  });

export const signOut = () => (dispatch, getState, /* getFirebase */) => daoLayer.authSignOut().
      then(() => {
        dispatch(authLoggedOutSuccess());
        if (getState().routesPermissions.requireAuth.
              filter((route) => route === getState().routing.locationBeforeTransitions.pathname).toString()) {
              // dispatch(push(getState().routing.locationBeforeTransitions.pathname));
        }
      }).catch((error) => {
        // @TODO better error handling
        throw (error);
      });

export const requireAuth = (nextState, replace) => (dispatch, getState) => {
  if (!getState().auth.isLogged) {
    redirect(replace, '/login', nextState.location.pathname, 'You need to be logged to access this page');
  } else {
    redirect(replace, '/current/US/classic-box/menu', nextState.location.pathname);
  }
};
