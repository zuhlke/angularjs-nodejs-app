'use strict'

var auth = require('../lib/passport-local-strategy');

module.exports = function (app) {

  app.get('/api/v1/admin', auth.ensureAuthenticated('admin'), function (req, res, next) {

    console.log(req.user);

  });
};

