'use strict';

var logger = require('log4js').getLogger();
var User = require('mongoose').model('User');
var util = require('util');
var Q = require('q');

var authenticate = function(user, plainText) {
  var deferred = Q.defer();
  hashPassword(plainText, user.salt).then(function(hashedPassword) {
    if (user.hashed_password === hashedPassword) {
      deferred.resolve(this);
    }
    deferred.reject(this);
  });
  return deferred.promise;
};

var makeSalt = function(options) {
  options = options || {};
  options.saltLength = options.saltLength || 512;
  options.encoding = options.encoding || 'base64';

  return Q.nfcall(crypto.randomBytes, options.saltLength).then(function(buf) {
    return buf.toString(options.encoding);
  }).fail(function(err) {
    throw err;
  });
};

var hashPassword = function(plainText, salt, options) {
  options = options || {};
  options.keyLength = options.keyLength || 512;
  options.encoding = options.encoding || 'base64';
  options.iterations = options.iterations || 10000;

  var rawSalt = new Buffer(salt, options.encoding);

  return Q.nfcall(crypto.pbkdf2, plainText, rawSalt, options.iterations, options.keyLength).then(function(derivedKey) {
    return derivedKey.toString(options.encoding);
  }).fail(function(err) {
    throw err;
  });
};

var login = function(options) {
  var options = options || {};
  options.usernameField = options.usernameField || 'username';
  options.passwordField = options.passwordField || 'password';

  function lookup(obj, field) {
    if (!obj) { return null; }
    var chain = field.split(']').join('').split('[');
    for (var i = 0, len = chain.length; i < len; i++) {
      var prop = obj[chain[i]];
      if (typeof(prop) === 'undefined') { return null; }
      if (typeof(prop) !== 'object') { return prop; }
      obj = prop;
    }
    return null;
  }

  return function(req, res, next) {
    var username = lookup(req.body, options.usernameField);
    var password = lookup(req.body, options.passwordField);

    if (!username || !password) {
      return res.send(401, {error: 'Missing credentials'});
    }

    User.findByEmail(username).then(function(user) {
      return authenticate(user, password);
    }).then(function(user) {
      return makeSalt().then(function(salt) {
        res.user = user;
        res.cookie('AUTH_TOKEN', salt);
        next();
      });
    }).then(null, function(err) {
      return res.send(401, {error: 'Invalid username or password'});
    });
  };
};

var requiresLogin = function(req, res, next) {
  if (!req.cookies.AUTH_TOKEN) {
    return res.send(401);
  }
  next();
}

exports.login = login;
