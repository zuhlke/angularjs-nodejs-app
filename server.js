'use strict';

var express = require('express'),
  fs = require('fs'),
  path = require('path'),
  glob = require("glob"),
  pjson = require('./package.json'),
  util = require('util'),
  __ = require('underscore'),
  ccolors = require('ccolors'),
  nconf = require('nconf');

//
// Load the configuration file
//
var configPath = 'server/config/config-' + process.env.NODE_ENV + '.json';
nconf.argv().env().file({ file: configPath });
nconf.set('version', pjson.version);

//
// Bootstrap the database connections
//
var mongodb = require('./server/lib/mongodb');

//
// Create and configure the express app
//
var app = require('./server/config/express');

//
// Add our controllers
//
glob.sync('./server/controllers/*.js').forEach(function(file) {
  console.log('Loading ' + file);
  require(file)(app);
});

// Display all the configured routes
console.log();
/*
__.keys(app.routes).forEach(function(method) {
  var method = method.toUpperCase()
  app.routes[method].forEach(function(route) {
    console.log(route);
    //util.log(route.method.toUpperCase().green, route.path);
  });
});
*/
for(var type in app.routes) {
  for(var rts in app.routes[type]) {
    var route = app.routes[type][rts];
    console.log(route.method.toUpperCase().green, route.path);
  }
}
console.log();

//
// Printing some environment variables
//
console.log();
util.log('Version: ' + nconf.get('version'));
util.log('ENV: ' + nconf.get('NODE_ENV'));
util.log('MongoDB: ' + nconf.get('mongodb'));
console.log();

app.listen(nconf.get('port'));

util.log('Listening on: ' + nconf.get('port'));
