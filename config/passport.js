'use strict';

var logger = require('log4js').getLogger();
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var User = mongoose.model('User');
var util = require('util');
var config = require('./config');

module.exports = function(passport) {

  // The most widely used way for websites to authenticate users is via a username and password.
  // Support for this mechanism is provided by the passport-local module.
  passport.use(new LocalStrategy(function(username, password, done) {
      logger.debug(util.format('Authenticating a user with email [%s] and password [%s]', username, password));
      User.findByEmail(username).then(function(user) {
        return user.authenticate(password);
      }).then(function(user) {
        return done(null, user);
      }).then(null, function (err) {
          logger.debug(util.format('Invalid username or password'));
          return done(null, false, { message: 'Invalid username or password' });
      });
    }
  ));
};
