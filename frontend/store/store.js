import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {expoLogger} from 'expo-redux-logger';
import {thunk} from 'redux-thunk';
import session from './session';
import errors from './errors';
import entities from './entities';
import ui from './ui';
import chats from './chats';

const rootReducer = combineReducers({
  session,
  errors,
  chats
//   entities,
//   ui
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
//   const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, expoLogger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;