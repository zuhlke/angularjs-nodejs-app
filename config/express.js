'use strict';

var express = require('express');
var helmet = require('helmet');
var config = require('./config');

module.exports = function(app, passport, db) {

  // We do not want to expose that our server in the HTML headers
  app.disable('x-powered-by');

  // For security sake, it's better to disable file upload if your application
  // doesn't need it. To do this, use only the needed middleware, i.e.
  // don't use the bodyParser and multipart() middleware:
  app.use(express.cookieParser());
  app.use(express.json());
  app.use(express.urlencoded());

  if (process.env.NODE_ENV === 'development') {
    // If we're developing we want the Node.js server to serve all of the content such as HTML files, images etc.
    //
    // In production this would be served through nginx which proxies the request through to our Node.js instances.
    // See nginx/conf/nginx.conf for an example configuration.

    // Use gzip compression
    app.use(express.compress());

    // Serve the static content with a cahce header
    app.use(express.static(config.root + '/public', {
      maxAge : 86400000 // one day
    }));

    // Add the following security related HTTP headers.
    // Again in production we would add these as part of the nginx configuration.
    app.use(helmet.xframe());
    app.use(helmet.iexss());
    app.use(helmet.contentTypeOptions());

    // Use the express logger to log the requests
    app.use(express.logger('dev'));

    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  }

  app.use(express.favicon("public/favicon.ico"));

  // Add no-cache headers for all calls to the API
  app.all('/api/*', helmet.cacheControl());

  // Configure our routes
  app.use(app.router);

};
