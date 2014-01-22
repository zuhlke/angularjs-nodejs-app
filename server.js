'use strict';

var express = require('express'),
  fs = require('fs'),
  path = require('path'),
  glob = require("glob"),
  pjson = require('./package.json'),
  nconf = require('nconf');

//
// Load the configuration file
//
var configPath = 'server/config/config-' + process.env.NODE_ENV + '.json';
nconf.argv().env().file({ file: configPath });
nconf.set('version', pjson.version);
//
// Printing some environment variables
//
console.log('Version: ' + nconf.get('version'));
console.log('ENV: ' + nconf.get('NODE_ENV'));
console.log('MongoDB: ' + nconf.get('mongodb'));

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
glob.sync('./server/controllers/*.js', function(err, files) {
  files.forEach(function(file) {
    console.log('Loading ' + file);
    require(file)(app);
  });
});

app.listen(nconf.get('port'));

console.log('Listening on: ' + nconf.get('port'));
