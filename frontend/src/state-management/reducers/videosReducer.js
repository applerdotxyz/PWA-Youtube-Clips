import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function videoReducer(state = initialState.videos, action) {
  switch (action.type) {

    case types.GET_VIDEOS_SUCCESS:
      return Object.assign({}, state, {
        loaded: true,
        items: action.data.results,
        term: action.data.term || initialState.videos.term,
      });

    case types.GET_VIDEOS_FAILURE:
      return Object.assign({}, state, {
        error: action.data.error,
        term: action.data.term,
        detail: action.data.error,
      });

    default:
      return state;
  }
}
