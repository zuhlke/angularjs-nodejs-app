'use strict';

var logger = require('log4js').getLogger();

module.exports = function (app, passport, auth) {

  // Index
  var index = require('../server/controllers/index');
  app.get('/', index.render);

  // Login
  app.post('/api/v1/authenticate', passport.authenticate('local', {session: false}), function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.send(req.user);
  });

  app.get('/api/v1/users', function(req, res) {
    setTimeout(function() {
      res.send([{name: 1}, {name: 2}]);
    }, 3000);
  });

};
