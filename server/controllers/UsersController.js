'use strict'

module.exports = function (db) {

  return {

    /**
     * Simply returns a list of all the users in the system.
     * @params q the username to search for
     * @params start the current page
     * @params items the number of items to bring back
     */
    getUsers: function (req, res) {
      var results = {};

      var start = req.query.start || 0;
      var items = req.query.items || 10;

      db.User.findUsersPaginated(start, items, req.query.q).then(function (users) {

        results.data = users.map(function (d) {
          return d.toObject();
        });

      }).then(function () {

        return db.User.count().exec();

      }).then(function (count) {

        results.metadata = {
          start: start,
          items: items,
          total_items: count
        };

        res.json(results);

      }).then(null, function (err) {

        return res.send(500);

      });
  },

    /**
     * A method for verifying if the given username already exists.
     * @returns 200 if the username exists, 404 otherwise
     */
    userExists: function (req, res) {
      var username = req.params.username;

      var query = {
        username: username.toLowerCase()
      };

      db.User.findOne(query).exec().then(function (user) {
        if (!user) {
          throw Error();
        }
        res.send(200);
      }).then(null, function (err) {
        return res.send(404);
      });
    },

    /**
     * Returns the given user.
     */
    getUser: function (req, res) {
      var username = req.params.username;

      var query = {
        username: username.toLowerCase()
      };

      db.User.findOne(query).exec().then(function (user) {
        if (!user) {
          throw Error();
        }
        res.json(user.toObject());
      }).then(null, function (err) {
        return res.send(404);
      });
    },

    /**
     * Updates a given user.
     */
    updateUser: function () {
      var updatedUser = req.body;

      db.User.findOne({username: req.params.username.toLowerCase()}).exec().then(function (existingUser) {
        existingUser.first_name = updatedUser.first_name;
        existingUser.last_name = updatedUser.last_name;

        if (updatedUser.password) {
          existingUser.password = updatedUser.password;
        }

        existingUser.save(function (err, savedUser) {
          if (err) {
            return res.send(500);
          }
          res.json(savedUser.toObject());
        });

      }).then(null, function (err) {
        return res.send(500);
      });
    },

    /**
     * A method for verifying if the given email already exists.
     * @returns 200 if the email exists, 404 otherwise
     */
    emailExists: function () {
      var query = this._find({});

      if (req.query.email) {
        var email = req.query.email.toLowerCase();
        query = query.where('email').equals(email);
      }

      query = query.skip(0).limit(1);

      query.exec().then(function (users) {
        if (users.length > 0) {
          return res.send(200);
        }
        throw Error();
      }).then(null, function (err) {
        return res.send(404);
      });
    }
  }

};
