'use strict';

require("mocha-as-promised")();
var chai = require('chai'),
  should = chai.use(require('chai-as-promised')).should(),
  expect = chai.expect,
  Assertion = chai.Assertion,
  userHelper = require('../../helpers/user.js');

chai.use(userHelper);

var mongoose = require('mongoose');
var User = require(__dirname + '/../../../../server/models/user');

// Global
var user;

describe('A User object', function () {

  beforeEach(function () {
    user = new User({
      name: 'Jane',
      username: 'admin@test.com',
      password: 'password',
      role: 'admin'
    });
  });

  beforeEach(function (done) {
    mongoose.connection.collections.users.remove(function (err) {
      done();
    });
  });

  afterEach(function (done) {
    mongoose.connection.collections.users.remove(function (err) {
      done();
    });
  });

  describe('when creating', function () {

    it('should create a new object based on the UserSchema', function(done) {
      user.save(function (err, user) {
        if (err) {
          return done(err);
        }
        user.should.be.a.userModel;
        done();
      });
    })
  });

  describe('when saving', function () {

    it('should hash the plaintext password before saving', function (done) {
      user.save(function (err, user) {
        if (err) {
          return done(err);
        }
        user.password.should.be.a('string').and.have.lengthOf(60);
        done();
      });
    })

    it('should save a linkHref attribute, linking the user to itself', function (done) {
      user.save(function (err, user) {
        if (err) {
          return done(err);
        }
        user.linkHref.should.be.a('string').and.equal('admin@test.com');
        done();
      });
    });

    it('should fail inserting a second user with the same username', function (done) {
      var user2 = new User({
        name: 'John',
        username: 'admin@test.com',
        password: 'password',
        role: 'admin'
      });

      user.save(function (err, user1) {
        user2.save(function (err, user2) {
          if (err) {
            return done();
          }
          done('should have thrown an unique index constraint validation error');
        });
      });

    });
  });

  describe('when comparing passwords', function () {

    it('should match a a previously stored hash', function (done) {
      user.save(function (err, user) {
        if (err) {
          return done(err);
        }
        user.passwordMatches('passowrd', done);
      });
    });

  });

  describe('when transforming', function () {

    it('should not include the password field', function (done) {
      user.save(function (err, user) {
        if (err) {
          return done(err);
        }

        user.toObject().should.not.have.property('password');
        done();
      });
    });

  });

});