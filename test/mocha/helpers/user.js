
//
// A custom matcher for users
//

var moongose = require('mongoose');

module.exports = function (chai, utils) {
  var Assertion = chai.Assertion;

  //
  // user.should.be.a.userModel
  //
  Assertion.addProperty('userModel', function () {
    new Assertion(this._obj).to.have.property('name');
    new Assertion(this._obj).to.have.property('username');
    new Assertion(this._obj).to.have.property('created');
    new Assertion(this._obj).to.have.property('password');
    new Assertion(this._obj).to.have.property('linkHref');
  });

};