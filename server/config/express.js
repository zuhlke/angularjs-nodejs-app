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

  app.use('/vendor', express.static(__dirname + '/../../public/vendor', {maxAge: 86400000}));
  app.use('/img', express.static(__dirname + '/../../public/img', {maxAge: 86400000}));
  app.use('/css', express.static(__dirname + '/../../public/css', {maxAge: 1200000}));
  app.use('/js', express.static(__dirname + '/../../public/js', {maxAge: 1200000}));
  app.use('/lib', express.static(__dirname + '/../../public/lib', {maxAge: 1200000}));
  app.use('/template', express.static(__dirname + '/../../public/template', {maxAge: 1200000}));
  app.use('/views', express.static(__dirname + '../../public/views', {maxAge: 1200000}));
  app.use(express.static(__dirname + '/../../public', {maxAge: 86400000}));

  app.use(helmet.xframe());
  app.use(helmet.iexss());
  app.use(helmet.contentTypeOptions());

  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

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
