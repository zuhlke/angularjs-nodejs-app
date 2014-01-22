'use strict';

var User = require('../models/user'),
  LocalStrategy = require('passport-local').Strategy,
  Q = require('q');

exports.localStrategy = function () {

  return new LocalStrategy(function (username, password, done) {
    User.findOne({username: username}).exec().then(function(user) {
      user.passwordMatches(password, function(err, matches) {
        if (err) { return done(user); }
        if (!matches) { return done(user); }
        return done(null, user);
      });
    });
  });

};

exports.isAuthenticated = function (role) {

  return function (req, res, next) {

    if (!req.isAuthenticated()) {
      res.status(401);
      return;
    }

    //If a role was specified, make sure that the user has it.
    if (role && req.user.role !== role) {
      res.status(401);
      return;
    }

    next();
  };
};

exports.injectUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};
