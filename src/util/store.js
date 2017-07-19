// These are needed to create the store
import { createStore, applyMiddleware } from 'redux';
// Thunk is a type of middleware
import thunk from 'redux-thunk';
// The Root Reducer contains the outline of the store will look like
import rootReducer from './root_reducer';

// How the store configureation looks
const configureStore = (preloadedState = {}) => (
  createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk)
  )
);

// ES6 export
export default configureStore;