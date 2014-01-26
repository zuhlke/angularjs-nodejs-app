'use strict'

var passport = require('passport');

module.exports = function (app) {

  app.namespace('/api/v1', function() {

    app.post('/authenticate', function(req, res, next) {
      passport.authenticate('local', function(err, user, info) {
        if (err) {
          return next(err);
        }

        if (!user) {
          return next({error: 'User does not exist'});
        }

        req.login(user, function(err) {
          if (err) { return res.send({error: err.message}); }
          return res.json(user);
        });

      })(req, res, next);
    }, function(err, req, res, next) {
      return res.send(401, {error: err.message});
    });

  });

};