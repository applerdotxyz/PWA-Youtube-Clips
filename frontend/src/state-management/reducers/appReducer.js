import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function appReducer(state = initialState.app, action) {
  switch (action.type) {
    case types.APP_DATA_CALL_START:
      return Object.assign({
        data_call_in_progress: true,
      });
    case types.APP_DATA_CALL_DONE:
      return Object.assign({
        data_call_in_progress: false,
      });
    default:
      return state;
  }
}
