'use strict';

//
// Module dependencies
//
var express = require('express');
var fs = require('fs');
var passport = require('passport');

//
// Main application entry file.
// Please note that the order of loading is important.
//

// Load configurations
// Set the node enviornment variable if not set before
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Initializing system variables 
var config = require('./config/config');
var auth = require('./config/middlewares/authorization');
var mongoose = require('mongoose');

// Bootstrap db connection
var db = mongoose.connect(config.db);

// Bootstrap models
var models_path = __dirname + '/server/models';
var walk = function (path) {
  fs.readdirSync(path).forEach(function (file) {
    var newPath = path + '/' + file;
    var stat = fs.statSync(newPath);
    if (stat.isFile()) {
      if (/(.*)\.(js$|coffee$)/.test(file)) {
        require(newPath);
      }
    } else if (stat.isDirectory()) {
      walk(newPath);
    }
  });
};
walk(models_path);

// Bootstrap passport config
require('./config/passport')(passport);

var app = express();

// Express settings
require('./config/express')(app, passport, db);

// Bootstrap routes
require('./config/routes')(app, passport, auth);

// Start the server by listening on <port>
var port = process.env.PORT || config.port;
app.listen(port);
console.log('Express server started on port ' + port);

if (process.env.NODE_ENV === 'development') {
  console.log('=== DEVELOPMENT MODE ===');
} else {
  console.log('=== PRODUCTION MODE ===');
}

// Expose server
exports = module.exports = app;
