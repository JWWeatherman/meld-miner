const path = require('path');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

// Router paths
const PingRouter = require('./PingRouter')

// Creates and configures an ExpressJS web server.
class App {
  // Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this._middleware();
    this._routes();
  }

  // Configure express middleware
  _middleware () {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({extended: false}));
  }

  // Configure API endpoints
  _routes () {
    // let router = express.Router();
    // Add routes here
    this.express.use('/meld/v1/ping', PingRouter);
  }
}

module.exports = new App().express;