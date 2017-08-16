
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import app from './appReducer';
import auth from './authReducer';
import user from './userReducer';
import videos from './videosReducer';
// debugger;

const rootReducer = combineReducers({
  videos,
  user,
  auth,
  app,
  routing: routerReducer,
});

export default rootReducer;
