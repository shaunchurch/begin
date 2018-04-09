export const doPingSocket = () => {
  return {
    type: 'PING_SOCKET',
    payload: true,
    meta: {
      socket: 'socket'
    }
  };
};
