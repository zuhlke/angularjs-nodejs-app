'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var Q = require('q');

// Defines our user model
var UserSchema = new Schema({

  name: String,

  email: {
    type: String,
    unique: true
  },

  salt: String,

  hashed_password: String,

  created : {
    type : Date,
    default : Date.now
  }

});

// Adds a static method to the schema
UserSchema.statics.findByEmail = function(email) {
  return this.findOne({email: email}).exec();
}

// Instances of Models are documents. Documents have many of their own built-in
// instance methods. We may also define our own custom document instance methods too.
UserSchema.methods = {

  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function(plainText) {
    var deferred = Q.defer();
    this.encryptPassword(plainText).then(function(hashedPassword) {
      if (this.hashed_password === hashedPassword) {
        deferred.resolve(this);
      }
      deferred.reject(this);
    });
    return deferred.promise;
  },

  /**
   * Creates a salt
   *
   * @returns {Promise|salt}
   * @api public
   */
  makeSalt: function() {
    return Q.nfcall(crypto.randomBytes, 512).then(function(buf) {
      return buf.toString('base64');
    }).fail(function(err) {
      throw err;
    });
  },

  /**
   * Encrypt the password
   *
   * @param password
   * @returns {Promise|the encrypted password}
   * @api public
   */
  encryptPassword: function(password) {
    return Q.nfcall(crypto.pbkdf2, password, new Buffer(this.salt, 'base64'), 10000, 64).then(function(derivedKey) {
      return derivedKey.toString('base64');
    }).fail(function(err) {
      throw err;
    });
  },

  /**
   * Sets the password on the user object
   *
   * @param password
   * @returns {Promise|encrypted password}
   * @api public
   */
  setPassword: function(password) {
    var user = this;
    return this.makeSalt().then(function(salt) {
      user.salt = salt;
      return user.encryptPassword(password);
    }).then(function(hashedPassword) {
        user.hashed_password = hashedPassword;
        return hashedPassword;
    }).fail(function(err) {
        throw err;
    });
  },

  /**
   * Makes an AUTH token
   *
   * @returns {Promise|auth token}
   */
  makeAuthToken: function() {
    return Q.nfcall(crypto.randomBytes(1024)).then(function(buf) {
      return buf.toString('base64');
    }).fail(function(err) {
      throw err;
    });
  }
};

mongoose.model('User', UserSchema);
