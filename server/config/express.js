'use strict';

var mongoose = require('mongoose'),
  helmet = require('helmet'),
  express = require('express'),
  passport = require('passport'),
  auth = require('../lib/passport-local-strategy'),
  nconf = require('nconf'),
  User = require('../models/user'),
  MongoStore = require('connect-mongo')(express);

var createApp = function () {

  var app = express();

  app.disable('x-powered-by');

  app.use(express.cookieParser());

  app.use(express.json());

  app.use(express.urlencoded());

  app.use(express.favicon("public/favicon.ico"));

  app.use(express.session({
    secret: nconf.get('cookieStore').secret,
    store: new MongoStore(nconf.get('cookieStore'))
  }));

  app.use(passport.initialize());

  app.use(passport.session());

  passport.use(auth.localStrategy());

  app.use(auth.injectUser);

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findOne({_id: id}, function (err, user) {
      done(null, user);
    });
  });

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

  return app;
}

module.exports = createApp();
