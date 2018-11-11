import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages';
import * as serviceWorker from './serviceWorker';
import { compose, combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';

import reducers from './reducers';

const middlewares = [thunkMiddleware];

const composedStore = compose(applyMiddleware(...middlewares.filter(Boolean)));
const storeCreator = composedStore(createStore);
const store = storeCreator(
  combineReducers(reducers),
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
