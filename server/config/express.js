'use strict';

var helmet = require('helmet'),
  express = require('express'),
  exphbs  = require('express3-handlebars');

module.exports = function (app, db, logger, nconf) {

  app.use('/vendor', express.static(__dirname + '/../../public/vendor', {maxAge: 86400000}));
  app.use('/img', express.static(__dirname + '/../../public/img', {maxAge: 86400000}));
  app.use('/css', express.static(__dirname + '/../../public/css', {maxAge: 1200000}));
  app.use('/js', express.static(__dirname + '/../../public/js', {maxAge: 1200000}));
  app.use('/lib', express.static(__dirname + '/../../public/lib', {maxAge: 1200000}));
  app.use('/template', express.static(__dirname + '/../../public/template', {maxAge: 1200000}));
  app.use('/views', express.static(__dirname + '../../public/views', {maxAge: 1200000}));
  app.use(express.static(__dirname + '/../../public', {maxAge: 86400000}));
  app.use(express.favicon("public/favicon.ico"));

  app.use(express.cookieParser());

  require('./session-store')(app, nconf);

  var passport = require('./passport')(app, db);

  app.use(logger.connectLogger(logger.getLogger(), { level: 'auto', format: ':status :method :url' }));

  app.use(express.json());
  app.use(express.urlencoded());

  app.set('views', './server/views');
  app.engine('handlebars', exphbs({defaultLayout: 'main'}));
  app.set('view engine', 'handlebars');

  app.disable('x-powered-by');
  app.use(helmet.xframe());
  app.use(helmet.iexss());
  app.use(helmet.contentTypeOptions());
  app.all('/api/*', helmet.cacheControl());

  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

  require('./toobusy')(app);

  return passport;
};
