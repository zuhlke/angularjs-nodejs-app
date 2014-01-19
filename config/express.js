'use strict';

/**
 * Module dependencies.
 */
var express = require('express');
var helmet = require('helmet');
var config = require('./config');

module.exports = function(app, passport, db) {

  app.disable('x-powered-by');

  if (process.env.NODE_ENV === 'development') {
    // If we're developing we want the Node.js server to serve
    // the content as intended. In production this would be
    // configured through nginx which proxies the request through
    // to our Node.js instances. See nginx/conf/nginx.conf for an
    // example configuration.
    app.use(express.compress());

    app.use(express.static(config.root + '/public', {
      maxAge : 86400000 // one day
    }));

    app.use(helmet.xframe());
    app.use(helmet.iexss());
    app.use(helmet.contentTypeOptions());

    app.use(express.logger('dev'));

  }

  app.all('/api/*', helmet.cacheControl());

  app.use(express.json());

  app.use(app.router);

  app.use(express.favicon());

};