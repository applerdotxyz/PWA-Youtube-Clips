import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
// import _ from 'lodash';
import rootReducer from '../reducers';
import { loadState } from '../localStorage';

export default function configureStore(initialState) {
  // console.log('loadState:', loadState());


  return createStore(
    rootReducer,
    // _.extend(initialState, loadState()),
    compose(
      applyMiddleware(thunk, reduxImmutableStateInvariant(), routerMiddleware(browserHistory)),
      window.devToolsExtension ? window.devToolsExtension() : (f) => f
    )
  );
}
