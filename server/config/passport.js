'use strict'

var mongoose = require('mongoose'),
  passport = require('passport'),
  auth = require('../lib/passport-local-strategy'),
  User = require('../models/user');

module.exports = function (app) {

  app.use(passport.initialize());

  app.use(passport.session());

  passport.use(auth.localStrategy());

  app.use(auth.injectUser);

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findOne({_id: id}, function (err, user) {
      done(null, user);
    });
  });

};
