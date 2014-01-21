'use strict';

var express = require('express'),
  fs = require('fs'),
  path = require('path'),
  passport = require('passport'),
  helmet = require('helmet'),
  auth = require('./server/lib/auth'),
  nconf = require('nconf');

//
// Load the configuration file
//
var configPath = 'server/config/config-' + process.env.NODE_ENV + '.json';
nconf.argv().env().file({ file: configPath });

//
// Printing some environment variables
//
console.log('ENV: ' + nconf.get('NODE_ENV'));
console.log('MongoDB: ' + nconf.get('mongodb'));
console.log('Redis: ' + nconf.get('redis'));

//
// Bootstrap the database connections
//
var mongodb = require('./server/lib/mongodb');
var redis = require('./server/lib/redis');

//
// Create and configure the express app
//
var app = express();
app.disable('x-powered-by');
app.use(express.cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.favicon("public/favicon.ico"));
passport.use(auth.localStrategy());
if (process.env.NODE_ENV === 'development') {
  app.use(express.compress());
  app.use(express.static('public', {
    maxAge : 86400000 // one day
  }));
  app.use(helmet.xframe());
  app.use(helmet.iexss());
  app.use(helmet.contentTypeOptions());
  app.use(express.logger('dev'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}
app.all('/api/*', helmet.cacheControl());

//
// Request handlers before we configure the routes
//
app.use(passport.initialize());

//server.use(auth.injectUser);

//
// Add our controllers
//
require('./server/controllers/users')(app);
require('./server/controllers/admin')(app);
require('./server/controllers/authenticate')(app);
require('./server/controllers/index')(app);

app.listen(nconf.get('port'));

console.log('Listening on: ' + nconf.get('port'));
