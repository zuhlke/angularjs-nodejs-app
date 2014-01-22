'use strict';

var mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  Q = require('q'),
  nconf = require('nconf');

var userModel = function () {

  var userSchema = mongoose.Schema({
    name: {
      type: String,
      required: '{PATH} is required!',
      trim: true
    },

    username: {
      type: String,
      unique: true,
      required: '{PATH} is required!',
      trim: true
    },

    created: {
      type: Date, default: Date.now
    },

    linkHref: String,

    password: String,

    role: String
  });

  userSchema.pre('save', function (next) {
    var user = this;

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

  userSchema.pre('save', function (next) {
    var user = this;
    user.linkHref = user.username;
    next();
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
