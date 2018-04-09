const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const expressWs = require('express-ws')(app);
const router = express.Router();
const pkg = require('../package.json');
const config = require('../config.json');
const uuid = require('uuid');

const createChannelIndex = require('./createChannelIndex');
const channelIndex = createChannelIndex();

const getRoomFromUrl = url => {
  url = url.split('/');
  return url[1];
};
// logs
app.use(morgan('combined'));

// serve build directory
app.use(express.static(path.join(__dirname, '../build')));

// web socket
app.ws('*', (ws, req) => {
  ws.uuid = uuid.v4();
  console.log(
    'Socket client connected.',
    ws.upgradeReq.originalUrl,
    ws.upgradeReq._remoteAddress,
    ws.uuid
  );

  let channel = getRoomFromUrl(ws.upgradeReq.originalUrl);

  channelIndex.addChannel(channel);
  channelIndex.addUserToChannel(channel, ws.uuid, ws);

  ws.on('open', data => {
    channelIndex.broadcastMessage(channel, ws.uuid, 'You are ' + ws.uuid);
  });

  ws.on('message', data => {
    console.log('Received chat message...', data, 'from', ws.uuid);
    channelIndex.broadcastMessage(channel, ws.uuid, data);
  });
});
// routes
app.get('/get', (req, res) => {
  res.send('hello');
});

// server
app.listen(config.api.port || 3001, () => {
  console.log(
    `${pkg.name} server v${pkg.version} running on port ${config.api.port ||
      3001}…`
  );
});
