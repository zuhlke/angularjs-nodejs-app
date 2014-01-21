'use strict'

var passport = require('passport');

module.exports = function (app) {

  app.post('/api/v1/authenticate', function (req, res, next) {

    passport.authenticate('local', function (err, user, info) {
      if (err) { return next(err); }

      if (!user) { return res.json(401, info.message); }

      return res.redirect('/');

    })(req, res, next);
  });

};