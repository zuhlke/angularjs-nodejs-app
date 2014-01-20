'use strict';

var logger = require('log4js').getLogger();

// This sends the index.html down to the client and starts the AngularJS client application.
exports.render = function(req, res) {
  res.sendfile('public/index.html');
};
