'use strict';

var User = require('mongoose').model('User');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {

  passport.use(new LocalStrategy(User.authenticate()));

};
