// application entry point here...
// modules
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { saveState } from './state-management/localStorage';

// actions
// import { api } from './state-management/actions';

// components
import App from './views/App';

// Store
import initialState from './state-management/reducers/initialState';
import configureStore from './state-management/store/configureStore.dev'; // eslint-disable-line import/default

// styles
// import './favicon.ico'; // Tell webpack to load favicon.ico
import './assets/commonStyles/index.css';
import './assets/commonStyles/css/paper.css';

// require('react-hot-loader');

injectTapEventPlugin();

// store initialization
const store = configureStore(initialState);

store.subscribe(() => {
  saveState(store.getState());
});

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);
const rootEl = document.getElementById('content');


// debugger;
render(
  <Provider store={store}>
    <App
      history={history}
      store={store}
    />
  </Provider>,
  rootEl
);
