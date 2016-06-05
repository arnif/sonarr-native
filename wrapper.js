import React from 'react';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import createLogger from 'redux-logger';
import App from './app/app';
import * as reducers from './app/reducers';
import promiseMiddleware from './app/lib/promiseMiddleware';
// import Icon from 'react-native-vector-icons/FontAwesome';

const middlewares = [promiseMiddleware];
if (process.env.NODE_ENV === 'development') {
  const logger = createLogger();
  middlewares.push(logger);
}
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
const rootReducer = combineReducers({...reducers});
const store = createStoreWithMiddleware(rootReducer);

const wrapper = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default wrapper;
