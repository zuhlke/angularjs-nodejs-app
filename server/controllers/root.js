'use strict'

var nconf = require('nconf');

module.exports = function (app) {

  app.get('/', function (req, res) {
    res.render('index', { layout: false, title: nconf.get('title'), version: nconf.get('version')
    });
  });

  app.get('/version.js', function (req, res) {
    res.render('version', { layout: false, version: nconf.get('version') }, function(err, html) {
      res.contentType("text/javascript");
      res.send(html);
    });
  });

};
