'use strict';

//
// Module dependencies
//
var express = require('express');
var fs = require('fs');
var passport = require('passport');

//
// Load configurations
// Set the node enviornment variable if not set before
//
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//
// Initialising system variables
//
var config = require('./config/config');
var mongoose = require('mongoose');
var redis = require('then-redis');

//
// Bootstrap db connection
//
var db = mongoose.connect(config.db);
var redis = redis.createClient(config.redis);

//
// Bootstrap models
//
var passportLocalMongoose = require('./config/middlewares/passport-local-moongose');
require('./server/models/User')(passportLocalMongoose);
var auth = require('./config/middlewares/authorization');

//
// Bootstrap passport config
//
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

// Log which environemt we're running on to the console
if (process.env.NODE_ENV === 'development') {
  console.log('=== DEVELOPMENT MODE ===');
} else if (process.env.NODE_ENV === 'test') {
  console.log('=== TEST MODE ===');
} else if (process.env.NODE_ENV === 'prod') {
  console.log('=== PRODUCTION MODE ===');
}

// Expose server
exports = module.exports = app;
