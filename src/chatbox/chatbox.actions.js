import { SEND_MESSAGE } from './chatbox.constants';

export const doSendMessage = (channel = 'socket', message) => {
  return {
    type: SEND_MESSAGE,
    payload: message,
    meta: {
      socket: channel
    }
  };
};

export const doJoinChannel = (channel = 'socket') => {
  return {
    type: 'JOIN_CHANNEL',
    meta: {
      socket: channel
    }
  };
};
