'use strict';

var express = require('express'),
  fs = require('fs'),
  path = require('path'),
  pjson = require('./package.json'),
  util = require('util'),
  __ = require('underscore'),
  nconf = require('nconf');

//
// Load the configuration file
//
var configPath = 'server/config/config-' + process.env.NODE_ENV + '.json';
nconf.defaults(require('./server/config/config-defaults.json'));
nconf.argv().env().file({ file: configPath });
nconf.set('version', pjson.version);

//
// Instantiate the logger
//
var logger = require('./server/middleware/logger')(nconf);

//
// Bootstrap the database connections
//
var mongodb = require('./server/middleware/mongodb')(nconf);

//
// Load domain model
//
var db = require('./server/models')(nconf);

//
// Create and configure the express app
//
var app = express();
var passport = require('./server/config/express')(app, db, logger, nconf);

//
// Add middleware
//
require('./server/middleware/upload')(app, logger, nconf);

//
// Load our Controllers
//
var ctrl = require('./server/controllers')(db, passport, nconf);

//
// Configure routes
//
require('./server/middleware/routes')(app, ctrl);

//
// Printing some environment variables
//
console.log();
util.log('Version: ' + nconf.get('version'));
util.log('ENV: ' + nconf.get('NODE_ENV'));
util.log('MongoDB: ' + nconf.get('mongodb'));
util.log('Redis: ' + nconf.get('socketIoStore').host + ':' + nconf.get('socketIoStore').port);
console.log();

util.log('Listening on: ' + nconf.get('port'));

app.listen(nconf.get('port'));
