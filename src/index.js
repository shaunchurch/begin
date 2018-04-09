import React from 'react';
import ReactDOM from 'react-dom';
import throttle from 'lodash.throttle';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './configureStore';
import { Root } from './application';

/**
 * Configure the Redux store and local storage
 */
const LOCAL_STATE = 'LOCAL_STATE';
const configureClient = () => {
  const localState = JSON.parse(localStorage.getItem(LOCAL_STATE));
  const store = configureStore(localState || {});

  // save local state often but not too often
  const saveState = throttle(() => {
    const state = store.getState();
    localStorage.setItem(
      LOCAL_STATE,
      JSON.stringify(selectSavedStateSlice(state))
    );
  }, 2500);

  // saveState when store updates
  store.subscribe(saveState);

  ReactDOM.render(<Root store={store} />, document.getElementById('root'));
};

/**
 * Takes the full app state and returns
 * keys we want to save in localStorage
 *
 * @param {AppState} state
 */
const selectSavedStateSlice = state => {
  return {
    activeChannel: state.activeChannel
  };
};

configureClient();
registerServiceWorker();
