const path = require('path');
const express = require('express');
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
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({extended: false}));
    this.express.use(express.static(path.resolve(__dirname + '/public')));
  }

  // Configure API endpoints
  _routes () {
    // let router = express.Router();
    // Add routes here
    this.express.use('/meld/ping', PingRouter);
  }
}

module.exports = new App().express;
