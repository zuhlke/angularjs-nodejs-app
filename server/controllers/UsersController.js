'use strict'

var log = require('../lib/logger').getLogger(),
  User = require('../models/user');

module.exports = function (app) {

  app.namespace('/api/v1/users', function() {

    /**
     * Simply returns a list of all the users in the system.
     * @params q the username to search for
     * @params start the current page
     * @params items the number of items to bring back
     */
    app.get('/', function (req, res) {
      var results = {};

      var start = req.query.start || 0;
      var items = req.query.items || 10;

      User.findUsersPaginated(start, items, req.query.q).then(function(users) {

          results.data = users.map(function(d) { return d.toObject(); } );

        }).then(function() {

          return User.count().exec();

        }).then(function(count) {

          results.metadata = {
            start: start,
            items: items,
            total_items: count
          };

          res.json(results);

        }).then(null, function(err) {

          return res.send(500);

        });
    });

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
     * Returns the given user.
     */
    app.get('/:username', function (req, res) {
      var username = req.params.username;
      var query = {
        username : username.toLowerCase()
      };

      User.findOne(query).exec().then(function(user) {
        if (!user) {
          throw Error();
        }
        res.json(user.toObject());
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
