'use strict';

var mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  Q = require('q'),
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

  userSchema.pre('save', function (next) {
    var user = this;

    //If the password has not been modified in this save operation, leave it alone (So we don't double hash it)
    if (!user.isModified('password')) {
      next();
      return;
    }

    var DIFFICULTY = (nconf.get('bcrypt') && nconf.get('bcrypt').difficulty) || 8;

    bcrypt.hash(user.password, DIFFICULTY, function(err, res) {
      user.password = res;
      next();

    });

  });

  /**
   * Check whether the given plaintext password matches the currently hashed password.
   * @param plainText password
   * @returns {Promise|Boolean} true if the password matches
   */
  userSchema.methods.passwordMatches = function (plainText, cb) {
    bcrypt.compare(plainText, this.password, cb);
  };

  if (!userSchema.options.toObject) userSchema.options.toObject = {};
  userSchema.options.toObject.transform = function (doc, ret, options) {
    // remove the password of every document before returning the result
    delete ret.password;
  };

  return mongoose.model('User', userSchema);
};

module.exports = new userModel();
