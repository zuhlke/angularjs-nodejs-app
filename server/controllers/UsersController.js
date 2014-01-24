'use strict'

var User = require('../models/user');

module.exports = function (app) {

  app.namespace('/api/v1/users', function() {

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
