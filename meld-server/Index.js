const http = require('http')
const App = require('./App')

let server;

const port = normalizePort(process.env.PORT || 2727);

function normalizePort (val) {
  let port = (typeof val === 'string') ? parseInt(val, 10) : val;

  if (isNaN(port)) return val;
  else if (port >= 0) return port;
  else logger.error('Meld', 'Server', `Unable to normalize port ${port}`)
}

function onError (error) {
  if (error.syscall !== 'listen') throw error;

  let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;

  switch(error.code) {
    case 'EACCES':
      logger.error('Meld', 'Server', `${bind} requires elevated privileges`)
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error('Meld', 'Server', `${bind} is already in use`)
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening () {
  let addr = server.address();
  let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;

  logger.debug('Meld', 'Connection Successful', `listening on ${bind}`)
}

function init (l) {
  global.logger = l // best way to handle this logger.
  App.set('port', port);
  server = http.createServer(App);
  server.listen(port, () => {
    logger.debug('Meld', 'Connection Started', 'Starting server...')
  });
  server.on('error', onError);
  server.on('listening', onListening);
  return this;
}

module.exports = init