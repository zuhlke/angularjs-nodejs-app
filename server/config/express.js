'use strict';

var mongoose = require('mongoose'),
  helmet = require('helmet'),
  express = require('express'),
  passport = require('passport'),
  auth = require('../lib/passport-local-strategy'),
  nconf = require('nconf'),
  User = require('../models/user'),
  exphbs  = require('express3-handlebars'),
  toobusy = require('toobusy'),
  log4js = require('../lib/logger'),
  socketio = require('./socketio'),
  RedisStore = require('connect-redis')(express);

require('express-namespace');

var createApp = function () {

  var app = express();

  app.disable('x-powered-by');

  app.use(express.cookieParser());

  app.use(express.json());

  app.use(express.urlencoded());

  app.use(express.favicon("public/favicon.ico"));

  app.use(express.session({
    secret: nconf.get('cookieStore').secret,
    store: new RedisStore(nconf.get('cookieStore'))
  }));

  socketio(app);

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

  app.use(function(req, res, next) {
    if (toobusy()) {
      res.send(503, "I'm busy right now, sorry.");
    } else {
      next();
    }
  });

  app.set('views', './server/views');
  app.engine('handlebars', exphbs({defaultLayout: 'main'}));
  app.set('view engine', 'handlebars');

  if (nconf.get('NODE_ENV') === 'development') {

    app.use(express.compress());

    app.use(express.static('public', {
      maxAge: 86400000 // one day
    }));

    app.use(helmet.xframe());
    app.use(helmet.iexss());
    app.use(helmet.contentTypeOptions());

    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  }

  app.configure(function() {
    app.use(log4js.connectLogger(log4js.getLogger(), { level: 'auto', format: ':method :url' }));
  });

  app.all('/api/*', helmet.cacheControl());

  return app;
}

module.exports = createApp();
