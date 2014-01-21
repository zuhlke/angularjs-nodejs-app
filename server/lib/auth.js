'use strict';

var User = require('../models/user'),
  LocalStrategy = require('passport-local').Strategy;

exports.localStrategy = function () {

  return new LocalStrategy(function (username, password, done) {

    console.log(username);
    console.log(password);

    //Retrieve the user from the database by login
    User.findOne({username: username}, function (err, user) {

      //If something weird happens, abort.
      if (err) {
        return done(err);
      }

      //If we couldn't find a matching user, flash a message explaining what happened
      if (!user) {
        return done(null, false, { message: 'Login not found' });
      }

      //Make sure that the provided password matches what's in the DB.
      if (!user.passwordMatches(password)) {
        return done(null, false, { message: 'Incorrect Password' });
      }

      //If everything passes, return the retrieved user object.
      done(null, user);

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