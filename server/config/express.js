'use strict';

var mongoose = require('mongoose'),
  helmet = require('helmet'),
  express = require('express'),
  passport = require('passport'),
  auth = require('../lib/auth'),
  nconf = require('nconf');

var createApp = function () {

  var app = express();

  app.disable('x-powered-by');

  app.use(express.cookieParser());

  app.use(express.json());

  app.use(express.urlencoded());

  app.use(express.favicon("public/favicon.ico"));

  passport.use(auth.localStrategy());

  if (nconf.get('NODE_ENV') === 'development') {

    app.use(express.compress());

    app.use(express.static('public', {
      maxAge: 86400000 // one day
    }));

    app.use(helmet.xframe());
    app.use(helmet.iexss());
    app.use(helmet.contentTypeOptions());

    app.use(express.logger('dev'));

    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  }

  app.all('/api/*', helmet.cacheControl());

  app.use(passport.initialize());

  return app;
}

module.exports = createApp();
