import * as types from './actionTypes';

export const appDataCallStart = (data) => ({
  type: types.APP_DATA_CALL_START,
  data,
});


export const appDataCallDone = (data) => ({
  type: types.APP_DATA_CALL_DONE,
  data,
});
