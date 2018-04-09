import {
  SOCKET_CONNECTED,
  SOCKET_DISCONNECTED,
  SOCKET_ERROR,
  REC_SOCKET_MESSAGE
} from './network.constants';
import {
  didRecSocketMessage,
  didSocketConnection,
  didSocketDisconnect,
  didSocketError
} from './network.actions';

let URL = null;
if (typeof window !== 'undefined') {
  let host = window.location.host;
  let scheme = 'wss';

  // in dev we run the server separately because we're in create-react-app
  if (process.env.NODE_ENV === 'development') {
    scheme = 'ws';
    host = 'localhost:3001';
  }
  URL = `${scheme}://${host}/`;
}
const ROOT_URL =
  process.env.REACT_APP_ROOT_WS_URL || URL || 'ws://localhost:3001/';

export const createSocketMiddleware = options => {
  // socket endpoint connections
  const connections = {};

  return store => {
    /**
     * Create the socket from the endpoint
     *
     * @param {string} endpoint
     */
    const createSocket = endpoint => {
      const connection = new WebSocket(ROOT_URL + endpoint);

      connections[endpoint] = connection;

      // listeners
      connection.addEventListener('open', data => {
        store.dispatch(didSocketConnection(endpoint, data));
      });

      connection.addEventListener('message', message => {
        const data = JSON.parse(message.data);
        store.dispatch(didRecSocketMessage(endpoint, data));
      });

      connection.addEventListener('close', data => {
        store.dispatch(didSocketDisconnect(endpoint, data));
        setTimeout(() => {
          createSocket(endpoint);
        }, 2000);
      });

      connection.addEventListener('error', err => {
        store.dispatch(didSocketError(endpoint, err));
      });
    };

    if (options.endpoint) {
      createSocket(options.endpoint);
    }

    return next => action => {
      // don't catch it
      next(action);

      // no meta socket? not for us.
      if (!action.meta || !action.meta.socket) {
        return;
      }

      // ignore socket connect/disconnect/error
      if (isSocketAction(action)) {
        return;
      }

      // get the socket endpoint connection, send the payload
      const endpoint = action.meta.socket;

      // if there is no connection
      if (!connections[endpoint]) {
        createSocket(endpoint);
        return;
      }

      const connection = connections[endpoint];
      console.log('Data', action.payload);
      connection.send(action.payload);
    };
  };
};

const isSocketAction = action => {
  switch (action.type) {
    case SOCKET_CONNECTED:
    case SOCKET_DISCONNECTED:
    case SOCKET_ERROR:
    case REC_SOCKET_MESSAGE:
      return true;
    default:
      return false;
  }
};
