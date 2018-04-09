import React from 'react';
import { Provider } from 'react-redux';
import AppContainer from './AppContainer';

export default ({ store }) => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);
