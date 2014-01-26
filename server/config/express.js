'use strict';

var mongoose = require('mongoose'),
  helmet = require('helmet'),
  express = require('express'),
  nconf = require('nconf'),
  exphbs  = require('express3-handlebars'),
  log4js = require('../lib/logger'),
  RedisStore = require('connect-redis')(express);

require('express-namespace');

var createApp = function () {

  var app = express();

  require('./socketio')(app);

  app.disable('x-powered-by');

  app.use(express.cookieParser());

  app.use(express.json());

  app.use(express.urlencoded());

  app.use(express.favicon("public/favicon.ico"));

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

  require('./passport')(app);

  app.configure(function() {
    app.use(log4js.connectLogger(log4js.getLogger(), { level: 'auto', format: ':method :url' }));
  });

  app.all('/api/*', helmet.cacheControl());

  app.use(express.session({
    secret: nconf.get('cookieStore').secret,
    store: new RedisStore(nconf.get('cookieStore'))
  }));

  require('./toobusy')(app);

  return app;
}

module.exports = createApp();
