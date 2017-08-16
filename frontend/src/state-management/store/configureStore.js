import * as prodStore from './configureStore.prod';
import * as devStore from './configureStore.dev';

/* eslint-disable */
if (process.env.NODE_ENV === 'production') {
  module.exports = prodStore;
} else {
  module.exports = devStore;
}
/* eslint-enable */
