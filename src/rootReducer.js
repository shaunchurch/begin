import { combineReducers } from 'redux';
import { app } from './application';
import { activeChannel, channels } from './chatbox';

// import { isNetworkConnected, lastMessage } from './network';

export default combineReducers({
  app,
  activeChannel,
  channels
});
