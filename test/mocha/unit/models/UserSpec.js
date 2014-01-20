'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');

// Global
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

    it('should generate a base64 encoded string', function() {
      return user.makeSalt().should.eventually.be.a('string');


    });

    it('should generate 512 random bytes as a base64 encoded string', function() {
      return user.makeSalt().should.eventually.be.a('string').and.have.lengthOf(684);
    });
  });

  describe('#encryptPassword()', function() {

    it('should encrypt a plainText password', function() {
      return user.setPassword('password').should.eventually.be.a('string').and.have.lengthOf(88);
    });

  });

});