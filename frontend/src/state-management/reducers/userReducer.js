import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case types.USER_LOADED_SUCCESS:
      return Object.assign({}, state, { user: action.data.user });
    case types.USER_IS_ADMIN_SUCCESS:
      return Object.assign({}, state, { isAdmin: true });
    case types.AUTH_LOGGED_OUT_SUCCESS:
      return initialState.user;
    case types.DO_USER_LOGIN:
      return Object.assign({}, state, { user: action.response });
    case types.USER_DIALOG_STATUS:
      return Object.assign({}, state, { dialogs: { addUserDialogOpen: action.data.payload } });
    default:
      return state;

  }
}
