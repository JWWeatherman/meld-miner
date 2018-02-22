const Router = require('express').Router;

class PingRouter {
  constructor () {
    this.router = Router();
  }

  pong (req, res) {
    logger.debug('Meld', 'Server', 'Call to /ping. Response="PONG"')
    res.json('PONG')
  }

  init () {
    this.router.get('/', this.pong);
  }
}

const pingRouter = new PingRouter();
pingRouter.init();

module.exports = pingRouter.router;