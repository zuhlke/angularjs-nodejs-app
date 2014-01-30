'use strict'

var passport = require('passport'),
  log = require('../lib/logger').getLogger(),
  User = require('../models/user');

module.exports = function (app) {

  app.namespace('/api/v1', function() {

    app.post('/register', function(req, res) {
      var user = new User(req.body);
      user.username_orig = user.username;
      user.username = user.username.toLowerCase();
      user.setRole('USER').save(function(err, user) {
        if (err) {
          log.error(err);
          return res.send(400);
        }

        req.login(user, function(err) {
          if (err) {
            log.error(err);
            return res.send(400);
          }
          res.json(req.user.toObject());
        });

      });
    }),

    app.post('/login', function(req, res, next) {
      passport.authenticate('local', function(err, user, info) {
        if (err) {
          return next(err);
        }

        if (!user) {
          return next({error: 'User does not exist'});
        }

        req.login(user, function(err) {
          if (err) {
            return res.send({error: err.message});
          }
          return res.json(user);
        });

      })(req, res, next);
    }, function(err, req, res, next) {
      return res.send(401, {error: err.message});
    });

  });

};