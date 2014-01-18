'use strict';

/**
 * Module dependencies.
 */
var express = require('express');
var helmet = require('helmet');
var config = require('./config');
var path = require('path');

module.exports = function(app, passport, db) {

  app.disable('x-powered-by');

  if (process.env.NODE_ENV === 'development') {
    app.use(express.compress());
    app.use(express.static(path.join(__dirname, 'public'), {
      maxAge : 86400000 // one day
    }));
    app.use(express.logger('dev'));
  }

  app.use(helmet.xframe());
  app.use(helmet.iexss());
  app.use(helmet.contentTypeOptions());

  app.all('/api/*', helmet.cacheControl());

  app.use(express.json());

  app.use(app.router);

  app.use(express.favicon());

  app.use(express.static(config.root + '/public'));

};