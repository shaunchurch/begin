import {
  SEND_SOCKET_MESSAGE,
  REC_SOCKET_MESSAGE,
  SOCKET_CONNECTED,
  SOCKET_DISCONNECTED,
  SOCKET_ERROR
} from './network.constants';

export const doSendSocketMessage = (endpoint, data) => {
  return {
    type: SEND_SOCKET_MESSAGE,
    payload: data,
    meta: {
      socket: endpoint
    }
  };
};

export const didRecSocketMessage = (endpoint, data) => {
  return {
    type: REC_SOCKET_MESSAGE,
    payload: data,
    meta: {
      socket: endpoint
    }
  };
};

export const didSocketConnection = (endpoint, data) => {
  return {
    type: SOCKET_CONNECTED,
    payload: data,
    meta: {
      socket: endpoint
    }
  };
};

export const didSocketDisconnect = (endpoint, data) => {
  return {
    type: SOCKET_DISCONNECTED,
    payload: data,
    meta: {
      socket: endpoint
    }
  };
};

export const didSocketError = (endpoint, err) => {
  return {
    type: SOCKET_ERROR,
    payload: err,
    meta: {
      socket: endpoint
    }
  };
};
