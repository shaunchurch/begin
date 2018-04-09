import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';
import { createSocketMiddleware } from './network';

const socketMiddleware = createSocketMiddleware({ endpoint: 'socket' });

// middleware
const middleware = [socketMiddleware];

// redux dev tools extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default preloadedState => {
  return createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(...middleware))
  );
};
