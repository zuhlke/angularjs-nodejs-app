'use strict';

var mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  nconf = require('nconf');

var userModel = function () {

  var roles = 'ADMIN USER'.split(' ');

  var userSchema = mongoose.Schema({

    first_name: {
      type: String,
      required: true,
      trim: true
    },

    last_name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      index: true,
      required: true,
      trim: true,
      lowercase: true
    },

    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },

    username_orig: {
      type: String,
      index: true,
      trim: true
    },

    created: {
      type: Date, default: Date.now
    },

    link_href: String,

    password: String,

    role: {
      type: String,
      enum: roles
    }
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
    user.username_orig = user.username;
    user.link_href = user.username.toLowerCase();
    user.username = user.username.toLowerCase();
    next();
  });

  /**
   * Returns an array of users with matching username or email address.
   * @param username or email address
   * @returns {Promise|Array}
   */
  userSchema.statics.findByUsernameOrEmail = function (username) {
    var query = { $or: [{username: username.toLowerCase()}, {email: username.toLowerCase()}] };
    return this.find(query).exec();
  }

  /**
   * Check whether the given plaintext password matches the currently hashed password.
   * @param plainText password
   * @returns {Promise|Boolean} true if the password matches
   */
  userSchema.methods.passwordMatches = function (plainText, cb) {
    bcrypt.compare(plainText, this.password, cb);
  };

  /**
   * Allows you to set the user's role.
   * @param {String} role
   * @returns {User}
   */
  userSchema.methods.setRole = function (role) {
    this.role = role;
    return this;
  }

  if (!userSchema.options.toObject) userSchema.options.toObject = {};
  userSchema.options.toObject.transform = function (doc, ret, options) {
    // remove the password of every document before returning the result
    delete ret.password;
    delete ret._id;
  };

  return mongoose.model('User', userSchema);
};

module.exports = new userModel();
