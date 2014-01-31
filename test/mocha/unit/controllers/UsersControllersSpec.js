require('express-namespace');
require("mocha-as-promised")();

var express = require('express'),
  request = require('supertest'),
  should = require('chai').use(require('chai-as-promised')).should();

var app = express();
require('../../../../server/controllers/UsersController')(app);

describe('/api/v1/users', function() {

  it('GET / should return a list of users', function(done) {

    app.routes;

  });

});