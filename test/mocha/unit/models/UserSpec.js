'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');

// Global
var user;

describe('A User object', function() {

  beforeEach(function(done) {
    user = new User({
        name: 'Firstname Lastname',
        username: 'username',
        salt: '',
        hashed_password: '',
        email: 'test@example.com'
    });
    done();
  });

  beforeEach(function(done) {
    mongoose.connection.collections.users.drop(function(err) {
      done();
    });
  });

  describe('#setPassword()', function() {

    it('should have a setPassword() function', function() {
      user.setPassword.should.not.be.undefined;
    });

    it('should set a salt on the user', function(done) {
      user.setPassword('password', function(err, user) {
        if (err) { return done(err); }
        user.salt.should.be.a('string').and.have.lengthOf(684);
        done();
      });
    });

    it('should set a hashed password on the user', function(done) {
      user.setPassword('password', function(err, user) {
        if (err) { return done(err); }
        user.hashed_password.should.be.a('string').and.have.lengthOf(684);
        done();
      });
    });

  });

  describe('#authenticate()', function() {

    // password: 'password'
    var existingUser = new User({
      name: 'John Doe',
      username: 'John',
      email: 'test@example.com',
      salt: 'kiyTQ0gAgTLDp5r/lLARzg4KZ7gMpewsKcyyRA5bwPhvfg/qewpv9RjssDU7ezT5OeenPF4d0BLMLjcRXtjCC9EvoVd+RYs3/Rn1u6Pt/7jOJ6pNJ5BmxT8AT7Q1xcDVm+IE4RWS2l7RxldRylLDJspErQxtJaOZwIQt5NkDeFGtaYNOBsjq62QTFx+oYhP8d4wIBoiPaDdzOFUXlSEiQxWZnoUN0Wg4LdNZBcjJbnIXiVQy/LDyePuicGofmpIXc9IfrHmhmlCO4nkq2JSA/B6ylJLQJ6MLVwV5PkC2TUavV4WmxiG8ZvsUiaQyjx7v71DwnOxPJciUfNQ6rCW8Bez6QkXp6vf18qL61jLLq9MaDGxcryOYprydS0lMh4ej2pZBdy5Za3w+OvX0D2Qs32SBs1LHMIUdqAfQXkTkd2A1iTg2Si8xJp4Ze0uUTTXhqi5Tp6LL5va0U/c4RG7+NMxlujXtcGkdaN02JvL3k+W0IyDCaZjFHGMF3fDCm0/loR/CLAtCgsskl1hZPajdxyDxpvzHIljBGno36FIbykSB+Vr7zwIxA+zNeWqKDqWWpnQqglX66TioWQjKN2ZKNEX5fVRnL/PWGusHYkQDZYc22gE4Vsotzv2jkCHksfFMl52ghQf/BJhg+3usyIXvFyu4fLRT7CCujGLNE8kjDSE=',
      hashed_password: 'rFJyCOgzGvgg4S7pCPrYUuVWb6TFigO7aU/z21XPC42Dy7d7j+khgmA4YOqcTjbzHIYyeb8xaVgXq9NYZmq8tYObhWhpmD/j4FrTvuFM8Ajp4qpvIup4HPnTQvHDzgkA9wHka6QjePFZ1AoJDGhcJr/hwEyDUxZ0EAN2WLNd/vGZ1X4r4tx6HX95LUR5c8Ikt++7V+yJUFP2W/EBDK2lPYrVuuwIFCJuM3A5TM6n4+FxJUgOQ58fPHyeTJBvcxdyrrrsG83CHFyHcwgzTxV/I6ActRZeKDfFQxKIVmcjW6kYf86cGtB9R2OH0+vAYaT8QC0w17enBuyerQZylz7sm5sHPoFYXLUSnPDuv+N76hjsb1Ut9fLXN5ihIFZpDHxoOq6twqGMRQeYnV3P/KndOAjrEL5VEd8so8Dpg69liZoQyZhDoKIXesndhSJH/SGWlKgCEM8akTKbrQTaYtCpxC9w5hdqqv1b8U8E5t4bW8MOENH/ukdufAuBpkikMBV41N+yTlwB65Gd8Mp9vo9FbFac71nbggATtwItEqIhcMe2+0Byic/hTq4qTsrXfPOKKR5O4NkjRbhZ/Ue+N7ObbhYOOsW3MT4bDQGhjKmFMQY2CRZRoMc4K0thdU+dl2fSiLgxGXZ5k40e3Ctcwv67pxub3UOPwH9X/OkY1kAxWOA='
    });

    it('should have a setPassword() function', function() {
      existingUser.authenticate.should.not.be.undefined;
    });

    it('should successfully authenticate a user', function(done) {
      existingUser.save(function(err) {
        if (err) { return done(err); }
        existingUser.authenticate('password', function(err, user, message) {
          if (message) {
            return done(message.message);
          }
          done();
        });
      });
    });

  });

});