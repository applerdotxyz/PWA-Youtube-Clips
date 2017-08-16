import { browserHistory } from 'react-router';

import * as types from './actionTypes';
import { authLoggedIn /* authorize*/ } from './authActions';
import * as daoLayer from '../api/firebase';


export const userCreatedSuccess = () => ({
  type: types.USER_CREATED_SUCCESS,
});

export const userLoadedSuccessHandler = (data) => ({
  type: types.USER_LOADED_SUCCESS, data,
});

export const userCreated = (user) => (dispatch) => {
  daoLayer.databaseSet(`/users/${user.uid}`, user).
      then(
        () => {
          dispatch(authLoggedIn(user.uid));
          dispatch(userCreatedSuccess());
        }).
      catch(
        (error) => {
          // @TODO better error handling
          throw (error);
        });
};

export const userLoadedSuccess = (data) => (dispatch, /* getState */) => {
  browserHistory.push('/current/US/classic-box/menu');
  dispatch(userLoadedSuccessHandler({ user: data }));
};
