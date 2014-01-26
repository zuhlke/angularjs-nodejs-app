'use strict'

var log = require('../lib/logger').getLogger();
var User = require('../models/user');

module.exports = function (app) {

  app.namespace('/api/v1/users', function() {

    /**
     * A method for verifying if the given username already exists.
     * @returns 200 if the username exists, 404 otherwise
     */
    app.head('/:username', function (req, res) {
      var username = req.params.username;
      var query = {
        username : username.toLowerCase()
      };

      User.findOne(query).exec().then(function(user) {
        if (!user) {
          throw Error();
        }
        res.send(200);
      }).then(null, function (err) {
          return res.send(404);
      });
    });

    /**
     * A method for verifying if the given email already exists.
     * @returns 200 if the email exists, 404 otherwise
     */
    app.head('/', function (req, res) {
      var query = User.find({});

      if (req.query.email) {
        var email = req.query.email.toLowerCase();
        query = query.where('email').equals(email);
      }

      query = query.skip(0).limit(1);

      query.exec().then(function(users) {
        if (users.length > 0) {
          return res.send(200);
        }
        throw Error();
      }).then(null, function (err) {
          return res.send(404);
      });
    });

  });

};
