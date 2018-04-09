import { JOIN_CHANNEL } from './chatbox.constants';
import { REC_SOCKET_MESSAGE } from '../network';

export const activeChannel = (state = 'socket', action) => {
  switch (action.type) {
    case JOIN_CHANNEL:
      return action.meta.socket;
    default:
      return state;
  }
};

// {
//   [channel]: {
//     messages: [],
//     users: []
//   }
// }
export const channels = (state = {}, action) => {
  switch (action.type) {
    case REC_SOCKET_MESSAGE:
      let channel = state[action.meta.socket] || { messages: [], users: [] };
      const { uuid, message } = action.payload;
      channel.messages.push({
        message,
        uuid
      });
      if (!channel.users.includes(uuid)) {
        channel.users.push(uuid);
      }
      return { ...state, [action.meta.socket]: channel };
    default:
      return state;
  }
};
