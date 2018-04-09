module.exports = () => {
  let channels = {};

  return {
    addChannel: channel => {
      if (!channels[channel]) {
        channels[channel] = [];
        console.log('Adding channel', channel);
      }
    },
    broadcastMessage: (channel = 'socket', uuid, message) => {
      channels[channel].forEach(user => {
        console.log('broadcast to ', user.uuid);
        try {
          if (message !== 'undefined') {
            user.socket.send(JSON.stringify({ message, uuid }));
          }
        } catch (e) {
          console.log('FATAL', e);
        }
      });
    },
    addUserToChannel: (channel, uuid, socket) => {
      channels[channel].push({ uuid, socket: socket });
      console.log(`Add ${uuid} to ${channel}`);
    }
  };
};
