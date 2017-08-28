// import superagent from 'superagent';
import superagent from 'superagent';
import * as types from './actionTypes';
import { appDataCallStart, appDataCallDone } from './appActions';
import { ytConfig } from '../../config/index.js';
const API_KEY = ytConfig.API_KEY;

export const getVideosSuccess = (data) => ({
  type: types.GET_VIDEOS_SUCCESS,
  data,
});

export const getVideosFailure = (data) => ({
  type: types.GET_VIDEOS_FAILURE,
  data: { err: 'error in fetching videos from API', error: data.error, term: data.term },
});

export const getVideos = (term, user) => (dispatch, /* getState*/) => {
  dispatch(appDataCallStart('get videos starts'));
  /* eslint-disable */
  if(user && user.user && user.user.profileObj){
    superagent.get(`https://www.googleapis.com/youtube/v3/search?q=${term}&part=snippet&key=${API_KEY}&maxResults=50&suggested=true`)
    .set('X-API-Key', 'foobar')
	  .set('Accept', 'application/json')
	  .end((err, data) => {
      if (err) {
        dispatch(getVideosFailure({ term, results: null, error: data.error }));
        dispatch(appDataCallDone('get videos done error '));
      } else {
        // console.log(resp);
        dispatch(getVideosSuccess({ term, results: data }));
        dispatch(appDataCallDone('get videos done success'));
      }
    });
  }
};
