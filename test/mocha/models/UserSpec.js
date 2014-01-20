'use strict';

var should = require('should');
var mongoose = require('mongoose');
var crypto = require('crypto');
var Q = require('q');
var User = mongoose.model('User');

var user;

describe('UserSchema', function() {

  beforeEach(function(done) {
    user = new User({
        name: 'Firstname Lastname',
        email: 'test@example.com',
        password: 'password'
    });
    done();
  });

  describe('#makeSalt()', function() {

    it('should generate a base64 encoded string', function(done) {
      user.makeSalt().then(function(salt) {
        salt.should.be.type('string');
        done();
      }).fail(function(err) {
        done(err);
      });
    });

    it('should generate 512 random bytes as a base64 encoded string', function(done) {
      user.makeSalt().then(function(salt) {
        salt.should.be.type('string').and.have.lengthOf(684);
        done();
      }).fail(function(err) {
        done(err);
      });
    });
  });

  describe('#encryptPassword()', function() {

    it('should encrypt a plainText password', function(done) {
      user.setPassword('password').then(function(hashedPassword) {
        hashedPassword.should.be.type('string').and.have.lengthOf(88);
        done();
      }).fail(function(err) {
        done(err);
      });
    });

  });

});