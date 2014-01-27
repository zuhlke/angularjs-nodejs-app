'use strict';

var User = require('../models/user'),
  LocalStrategy = require('passport-local').Strategy;

exports.localStrategy = function () {

  return new LocalStrategy(function (username, password, done) {

    User.findByUsernameOrEmail(username).then(function(users) {
      if (!users || users.length > 1) {
        return done(user);
      }

      var user = users[0];

      user.passwordMatches(password, function(err, matches) {
        if (err) {
          return done(user);
        }

        if (!matches) {
          return done(user);
        }

        return done(null, user);
      });
    }).then(null, function(err) {
      if (err) {
        return done(err);
      }
    });

  });

};

/**
 * A helper method to determine if a user has been authenticated, and if they have the right role.
 * If the user is not known, redirect to the login page. If the role doesn't match, show a 403 page.
 * @param role The role that a user should have to pass authentication.
 */
exports.ensureAuthenticated = function (role) {
  return function (req, res, next) {

    if (!req.isAuthenticated()) {
      res.send(401);
      return;
    }

    if (role && req.user.role !== role) {
      res.send(403);
      return;
    }

    next();
  };
};

/**
 * A helper method to add the user to the response context so we don't have to manually do it.
 * @param req
 * @param res
 * @param next
 */
exports.injectUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};
