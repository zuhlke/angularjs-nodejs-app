'use strict';

var mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  nconf = require('nconf');

var userModel = function () {

  var userSchema = mongoose.Schema({
    name: String,

    username: {
      type: String,
      unique: true
    },

    password: String,

    role: String
  });

  /**
   * Helper function that hooks into the 'save' method, and replaces plaintext passwords with a hashed version.
   */
  userSchema.pre('save', function (next) {
    var user = this;

    //If the password has not been modified in this save operation, leave it alone (So we don't double hash it)
    if (!user.isModified('password')) {
      next();
      return;
    }

    var DIFFICULTY = (nconf.get('bcrypt') && nconf.get('bcrypt').difficulty) || 8;

    var hashedPwd = bcrypt.hash(user.password, DIFFICULTY, function(err, res) {

      user.password = hashedPwd;

      next();
    });

  });

  userSchema.methods.passwordMatches = function (plainText, cb) {
    var user = this;
    return bcrypt.compare(plainText, user.password, function(err, res) {
      if (err) { return cb(err); }
      cb();
    });
  };

  return mongoose.model('User', userSchema);
};

module.exports = new userModel();
